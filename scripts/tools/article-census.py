#!/usr/bin/env python3
"""article-census.py — 全站中文文章普查＋四級分級（應標🌱／可轉正／缺封面／內文簡陋）。

設計與校準：reports/article-health-census-2026-11-04.md
規則與門檻 SSOT：scripts/tools/lib/article_health/census.py（THRESHOLDS）
同一套 A 級規則也是 article-health 的 `curation-gap` check（WARN）。

量什麼（每篇一列）：CJK 字數、腳註（不重複定義數／被引用數）、H2（全部／正文）、正文圖、
iframe、tw-* 模組、散文段落數與中位字數、封面圖狀態、lastVerified、lastHumanReview、
curation、featured、frontmatter author、git 首次提交者（跟著改名往回接，mailmap 生效）、
走過哪些流程（rewrite／FACTCHECK commit、research 報告、DONE-LOG、preReview、
ARTICLE-INBOX 未完成條目）、article-health ci-deploy 的 warn 分類計數、流量。

範圍：knowledge/{Category}/*.md（不含 knowledge/{lang}/ 譯文、不含 _ 開頭 hub）。

速度：全站 1,156 篇約 25 秒——git 史一次 bulk log（不逐篇 fork），article-health
在同一個行程內跑（不另開 1,156 個子行程）。

用法：
  python3 scripts/tools/article-census.py                       # 全站普查 → reports/article-census/{今天}.json + 摘要
  python3 scripts/tools/article-census.py --tier A              # 另寫 A 級名單檔（每行一個 repo 路徑）
  python3 scripts/tools/article-census.py --tier A --tier B --tier C --tier D
  python3 scripts/tools/article-census.py --tier A --tier-out /tmp/a.txt
  python3 scripts/tools/curation-tag.py --set incubating --files reports/article-census/2026-11-04-tier-A.txt   # dry-run
  python3 scripts/tools/article-census.py --no-health           # 不跑 article-health（快，warn 欄位留空）
  python3 scripts/tools/article-census.py --health-in scripts/tools/.health-sweep.json   # 吃 prebuild:dashboard 的 sweep
  python3 scripts/tools/article-census.py --distribution        # 只印校準用分位數
  python3 scripts/tools/article-census.py --files knowledge/People/洪醒夫.md --print-rows   # 看單篇怎麼被判

流量來源（讀得到什麼用什麼，JSON 的 traffic_sources 會寫明用了哪個、窗口幾天）：
  1. ~/.config/taiwan-md/cache/ga4-latest.json 的 by_lang_pages（GA 28 天，約 500 條路徑）
  2. 沒有本機快取時退回 public/api/dashboard-analytics.json 的 ga.topArticles7d（只有前 20 名）
  3. ~/.config/taiwan-md/cache/search-console-latest.json 的 pages（SC 7 天曝光，輔助排序）
  --no-local-traffic 強制只用 repo 內的資料（CI／其他機器可重現）。

本工具唯讀：不改任何 knowledge/ 文章。套用名單是 curation-tag.py 的事，且要人決定。
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.parse
from collections import Counter
from datetime import date, timedelta
from pathlib import Path

if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")

_TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(_TOOLS))

from lib.article_health import load_config, load_target, run_checks  # noqa: E402
from lib.article_health import census as C  # noqa: E402

REPO = C.REPO_ROOT
CACHE = Path.home() / ".config" / "taiwan-md" / "cache"
TIER_NAMES = {
    "A": "應標 🌱 進化中（目前沒標）",
    "B": "已標 🌱 但可能已夠好（人審轉正候選，本次不動）",
    "C": "沒有可用封面圖",
    "D": "內文簡陋（該進 REWRITE），依流量排序",
}


# ── 流量 ────────────────────────────────────────────────────────────────────


def _url_to_key(url_path: str, cats: dict[str, str], translations: dict[str, str]) -> tuple[str, bool] | None:
    """'/people/洪醒夫/' → ('People/洪醒夫.md', False)；'/en/people/x/' → (zh key, True)。"""
    p = urllib.parse.urlparse(url_path).path if url_path.startswith("http") else url_path
    parts = [urllib.parse.unquote(x) for x in p.strip("/").split("/") if x]
    if len(parts) == 2 and parts[0] in cats:
        return f"{cats[parts[0]]}/{parts[1]}.md", False
    if len(parts) == 3 and parts[1] in cats:
        zh = translations.get(f"{parts[0]}/{cats[parts[1]]}/{parts[2]}.md")
        if zh:
            return zh, True
    return None


def load_traffic(cats: dict[str, str], translations: dict[str, str], use_local: bool) -> tuple[dict, dict]:
    views: Counter = Counter()
    views_tr: Counter = Counter()
    sc_imp: Counter = Counter()
    sources: dict = {}
    ga_cache = CACHE / "ga4-latest.json"
    if use_local and ga_cache.is_file():
        d = json.loads(ga_cache.read_text(encoding="utf-8"))
        rows = d.get("by_lang_pages") or []
        for r in rows:
            k = _url_to_key(r.get("dim_0", ""), cats, translations)
            if not k:
                continue
            v = int(float((r.get("metrics") or [{}])[0].get("value") or 0))
            (views_tr if k[1] else views)[k[0]] += v
        per = d.get("period") or {}
        sources["ga"] = {
            "file": "~/.config/taiwan-md/cache/ga4-latest.json:by_lang_pages",
            "start": per.get("start"), "end": per.get("end"), "days": per.get("days"),
            "rows": len(rows), "metric": "screenPageViews",
        }
    else:
        f = REPO / "public" / "api" / "dashboard-analytics.json"
        if f.is_file():
            ga = json.loads(f.read_text(encoding="utf-8")).get("ga") or {}
            rows = ga.get("topArticles7d") or []
            for r in rows:
                k = _url_to_key(r.get("path", ""), cats, translations)
                if k:
                    (views_tr if k[1] else views)[k[0]] += int(r.get("views") or 0)
            sources["ga"] = {
                "file": "public/api/dashboard-analytics.json:ga.topArticles7d",
                "start": ga.get("startDate"), "end": ga.get("endDate"), "days": ga.get("days"),
                "rows": len(rows), "metric": "views",
                "note": "欄名叫 7d，實際窗口以 days 為準；只有前 20 名，其餘文章視為 0",
            }
    sc_cache = CACHE / "search-console-latest.json"
    if use_local and sc_cache.is_file():
        d = json.loads(sc_cache.read_text(encoding="utf-8"))
        rows = d.get("pages") or []
        for r in rows:
            k = _url_to_key((r.get("keys") or [""])[0], cats, translations)
            if k and not k[1]:
                sc_imp[k[0]] += int(r.get("impressions") or 0)
        per = d.get("period") or {}
        sources["search_console"] = {
            "file": "~/.config/taiwan-md/cache/search-console-latest.json:pages",
            "start": per.get("start"), "end": per.get("end"), "days": per.get("days"),
            "rows": len(rows), "metric": "impressions",
        }
    return {"views": views, "views_tr": views_tr, "sc_imp": sc_imp}, sources


# ── article-health ──────────────────────────────────────────────────────────


def _health_from_report(rep: dict) -> dict:
    warn_by = Counter()
    hard = 0
    prose_score = 0
    fn_grade = "A/B"
    for res in rep.get("results", []):
        for v in res.get("violations", []):
            sev = v.get("severity")
            if sev == "warn":
                warn_by[res["check"]] += 1
            elif sev == "hard":
                hard += 1
            msg = v.get("message") or ""
            if res["check"] == "prose-health" and msg.startswith("prose-health score:"):
                try:
                    prose_score = int(msg.split(":")[1].strip().split()[0])
                except (IndexError, ValueError):
                    pass
            if res["check"] == "footnote-density" and v.get("fix_suggestion") in ("C", "D", "F"):
                fn_grade = v["fix_suggestion"]
    return {
        "hard": hard,
        "warn": sum(warn_by.values()),
        "warn_by_check": dict(sorted(warn_by.items())),
        "prose_score": prose_score,
        "fn_grade": fn_grade,
    }


def run_health(paths: list[str], profile: str) -> dict[str, dict]:
    config = load_config(REPO / "scripts" / "tools" / "article-health.config.toml")
    out = {}
    for p in paths:
        rep = run_checks(load_target(Path(p)), config, profile_name=profile)
        d = rep.as_dict()
        d["results"] = [r for r in d["results"] if r["check"] != "curation-gap"]  # 不讓自己的 check 回饋進普查
        out[p] = _health_from_report(d)
    return out


def load_health_json(path: Path) -> dict[str, dict]:
    d = json.loads(path.read_text(encoding="utf-8"))
    out = {}
    for rep in d.get("reports", []):
        f = rep.get("file", "").replace("\\", "/")
        i = f.find("knowledge/")
        if i >= 0:
            out[f[i:]] = _health_from_report(rep)
    return out


# ── 主流程 ──────────────────────────────────────────────────────────────────


def _head_sha() -> str | None:
    try:
        return subprocess.run(
            ["git", "rev-parse", "--short=9", "HEAD"], cwd=REPO, capture_output=True, text=True, check=True
        ).stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        return None


def build(args) -> dict:
    os.chdir(REPO)  # article-health 有幾個 plugin 用 repo 相對路徑
    if args.files:
        files = [Path(f) for f in args.files]
    else:
        files = [p.relative_to(REPO) for p in C.list_zh_articles()]
    rels = [p.as_posix() for p in files]

    ev = C.RepoEvidence.load(REPO)
    hists = C.git_histories(REPO)
    cur_dates = C.git_curation_dates(REPO)
    tr_map_raw = json.loads((REPO / "knowledge" / "_translations.json").read_text(encoding="utf-8"))
    tr_count = Counter(tr_map_raw.values())
    cats = {c.lower(): c for c in C.zh_category_dirs()}
    traffic, sources = load_traffic(cats, tr_map_raw, not args.no_local_traffic)

    if args.no_health:
        health, health_profile = {}, None
    elif args.health_in:
        health, health_profile = load_health_json(Path(args.health_in)), f"file:{args.health_in}"
    else:
        health, health_profile = run_health(rels, args.profile), args.profile

    rows = []
    for rel in rels:
        target = load_target(Path(rel))
        key = rel.split("/", 1)[1]
        row = C.build_row(rel, target.frontmatter, target.body, ev, hists.get(rel), cur_dates.get(rel))
        row["translations"] = tr_count.get(key, 0)
        row["traffic"] = {
            "ga_views": traffic["views"].get(key, 0),
            "ga_views_translations": traffic["views_tr"].get(key, 0),
            "sc_impressions": traffic["sc_imp"].get(key, 0),
        }
        row["health"] = health.get(rel)
        row["tiers"] = C.classify(row)
        rows.append(row)
    return {
        "rows": rows, "sources": sources, "health_profile": health_profile,
        "git_available": bool(hists), "n_research_files": sum(len(v) for v in ev.research_by_stem.values()),
    }


def _traffic_key(r):
    t = r["traffic"]
    return (-t["ga_views"], -t["sc_impressions"], -t["ga_views_translations"], r["path"])


def distribution(rows: list[dict]) -> dict:
    today = date.today()
    recent_cut = (today - timedelta(days=45)).isoformat()
    body = [r for r in rows if r["category"] != "About"]
    cohorts = {
        "all": body,
        "walked_rewrite": [r for r in body if r["evidence"]["rewrite_modern"] or r["evidence"]["research"]],
        "no_evidence": [r for r in body if not C.has_deep_evidence(r)],
        "incubating": [r for r in body if r["curation"] == "incubating"],
        "recent_45d": [r for r in body if (r["date"] or "") >= recent_cut],
    }
    out = {}
    for name, rs in cohorts.items():
        out[name] = {
            "n": len(rs),
            "cjk": C.quantiles(r["metrics"]["cjk"] for r in rs),
            "fn_defs": C.quantiles(r["metrics"]["fn_defs"] for r in rs),
            "h2_content": C.quantiles(r["metrics"]["h2_content"] for r in rs),
            "media": C.quantiles(
                r["metrics"]["images"] + r["metrics"]["iframes"] + r["metrics"]["tw_modules"] for r in rs
            ),
            "para_median_cjk": C.quantiles(r["metrics"]["para_median_cjk"] for r in rs),
        }
    return out


def tier_paths(rows: list[dict], tier: str) -> list[dict]:
    rs = [r for r in rows if tier in r["tiers"]]
    if tier == "C":
        # 先放便宜的（C1 正文已有本地圖、升格就好），同一型內流量高的先
        rs.sort(key=lambda r: (r["tiers"]["C"][0][:2], _traffic_key(r)))
    elif tier in ("A", "D"):
        rs.sort(key=_traffic_key)
    else:
        rs.sort(key=lambda r: r["path"])
    return rs


def write_tier_file(rows: list[dict], tier: str, out: Path, today: str) -> tuple[int, int]:
    rs = tier_paths(rows, tier)
    held = [r for r in rs if r["evidence"]["hold"]]
    # A 級套用時 curation-tag.py 會把 featured: true 改 false（互斥），等於動首頁策展；
    # 首頁是哲宇的展覽設計，精選文不進預設名單，另列給人決定。
    feat = [r for r in rs if tier == "A" and r["featured"] and not r["evidence"]["hold"]]
    keep = [r for r in rs if not r["evidence"]["hold"] and r not in feat]
    lines = [
        f"# article-census {today} — {tier} 級：{TIER_NAMES[tier]}",
        f"# 產生：python3 scripts/tools/article-census.py --tier {tier}（規則見 lib/article_health/census.py）",
        f"# {len(keep)} 篇；排序＝流量高到低" if tier != "B" else f"# {len(keep)} 篇",
    ]
    if tier == "A":
        shown = out.relative_to(REPO).as_posix() if out.is_relative_to(REPO) else out.as_posix()
        lines.append("# 套用（先 dry-run）：python3 scripts/tools/curation-tag.py --set incubating --files " + shown)
    if held:
        lines.append(f"# 排除 {len(held)} 篇凍結中（config/babel-hold.tsv）：" + "、".join(r["path"] for r in held))
    if feat:
        lines.append(f"# 排除 {len(feat)} 篇 featured（標了會失去精選＝動首頁，等哲宇決定）：")
        lines += [f"#   {r['path']}" for r in feat]
    lines += [r["path"] for r in keep]
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return len(keep), len(held) + len(feat)


def dump_payload(payload: dict) -> str:
    """表頭縮排好讀；articles 每篇一行（名副其實「每篇一列」，週跑 diff 只動有變的那幾行）。"""
    head = {k: v for k, v in payload.items() if k != "articles"}
    head_txt = json.dumps(head, ensure_ascii=False, indent=1)
    assert head_txt.endswith("\n}")
    lines = [json.dumps(r, ensure_ascii=False, separators=(",", ":")) for r in payload["articles"]]
    return head_txt[:-2] + ',\n "articles": [\n  ' + ",\n  ".join(lines) + "\n ]\n}\n"


def summary_md(data: dict, rows: list[dict], today: str) -> str:
    n = len(rows)
    cur = Counter(r["curation"] or "（無）" for r in rows)
    lhr = sum(1 for r in rows if r["lastHumanReview"])
    deep = sum(1 for r in rows if C.has_deep_evidence(r))
    tiers = {t: [r for r in rows if t in r["tiers"]] for t in "ABCD"}
    lines = [
        f"## article-census {today}（{n} 篇中文）",
        "",
        f"- curation：incubating {cur.get('incubating', 0)}／verified {cur.get('verified', 0)}／無 {cur.get('（無）', 0)}",
        f"- lastHumanReview: true {lhr}（{lhr / n:.1%}）；有任一查證流程證據 {deep}（{deep / n:.1%}）",
        f"- 封面：local {sum(r['cover'] == 'local' for r in rows)}／無 {sum(r['cover'] == 'none' for r in rows)}"
        f"／外站 {sum(r['cover'] == 'remote' for r in rows)}／本地檔不見 {sum(r['cover'] == 'local-missing' for r in rows)}",
        "",
        "| 級 | 篇數 | 意思 |",
        "| --- | ---: | --- |",
    ]
    for t in "ABCD":
        lines.append(f"| {t} | {len(tiers[t])} | {TIER_NAMES[t]} |")
    sub = Counter(r["tiers"]["A"][0][:2] for r in tiers["A"]) if tiers["A"] else {}
    if sub:
        lines += ["", "A 級理由：" + "、".join(f"{k} {v}" for k, v in sorted(sub.items()))]
    csub = Counter(r["tiers"]["C"][0][:2] for r in tiers["C"])
    if csub:
        lines += ["C 級細分：" + "、".join(f"{k} {v}" for k, v in sorted(csub.items()))]
    ga = data["sources"].get("ga") or {}
    lines += ["", f"流量：{ga.get('file')}（{ga.get('start')}～{ga.get('end')}，{ga.get('days')} 天）"]
    top = tier_paths(rows, "D")[:10]
    if top:
        lines += ["", "D 級流量前十："]
        for r in top:
            lines.append(
                f"- {r['path']} — GA {r['traffic']['ga_views']}／SC 曝光 {r['traffic']['sc_impressions']}"
                f" — {r['tiers']['D'][0]}"
            )
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(
        description="全站中文文章普查＋四級分級（A 應標🌱／B 可轉正／C 缺封面／D 內文簡陋）。唯讀。",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__.split("用法：", 1)[1] if "用法：" in __doc__ else None,
    )
    ap.add_argument("--date", default=date.today().isoformat(), help="報告日期（預設今天），決定輸出檔名")
    ap.add_argument("--out", help="JSON 輸出路徑（預設 reports/article-census/{date}.json）")
    ap.add_argument("--no-json", action="store_true", help="不寫 JSON（只印摘要／名單）")
    ap.add_argument("--tier", action="append", choices=list("ABCD"), default=[], help="另寫該級名單檔，可重複")
    ap.add_argument("--tier-out", help="名單檔路徑（只給一個 --tier 時可用；預設 reports/article-census/{date}-tier-X.txt）")
    ap.add_argument("--profile", default="ci-deploy", help="article-health profile（預設 ci-deploy）")
    ap.add_argument("--health-in", help="改讀既有 article-health --output=json 結果，不重跑")
    ap.add_argument("--no-health", action="store_true", help="不跑 article-health")
    ap.add_argument("--no-local-traffic", action="store_true", help="不讀 ~/.config/taiwan-md/cache，只用 repo 內流量")
    ap.add_argument("--files", nargs="+", help="只普查這些檔（repo 相對路徑）")
    ap.add_argument("--print-rows", action="store_true", help="把每列 JSON 印到 stdout（配 --files 看單篇）")
    ap.add_argument("--distribution", action="store_true", help="只印校準用分位數")
    ap.add_argument("--quiet", action="store_true", help="不印摘要")
    args = ap.parse_args()
    if args.tier_out and len(args.tier) != 1:
        ap.error("--tier-out 只能配一個 --tier")

    data = build(args)
    rows = data["rows"]
    dist = distribution(rows)
    if args.distribution:
        print(json.dumps(dist, ensure_ascii=False, indent=1))
        return 0
    if args.print_rows:
        for r in rows:
            print(json.dumps(r, ensure_ascii=False, indent=1))

    today = args.date
    out_dir = REPO / "reports" / "article-census"
    tier_counts = {t: sum(1 for r in rows if t in r["tiers"]) for t in "ABCD"}
    tier_files = {}
    for t in args.tier:
        out = Path(args.tier_out) if args.tier_out else out_dir / f"{today}-tier-{t}.txt"
        if not out.is_absolute():
            out = REPO / out
        kept, held = write_tier_file(rows, t, out, today)
        tier_files[t] = out.relative_to(REPO).as_posix() if out.is_relative_to(REPO) else str(out)
        print(f"📝 {t} 級名單 {kept} 篇 → {tier_files[t]}" + (f"（另 {held} 篇凍結中或精選，已排除、列在檔頭註解）" if held else ""))

    summ = summary_md(data, rows, today)
    if not args.no_json and not args.files:
        out = Path(args.out) if args.out else out_dir / f"{today}.json"
        if not out.is_absolute():
            out = REPO / out
        payload = {
            "generated": today,
            "generator": "scripts/tools/article-census.py",
            "head": _head_sha(),
            "scope": "knowledge/{Category}/*.md（中文 SSOT；不含 knowledge/{lang}/ 譯文與 _ hub）",
            "n": len(rows),
            "thresholds": C.THRESHOLDS,
            "health_profile": data["health_profile"],
            "git_available": data["git_available"],
            "traffic_sources": data["sources"],
            "tier_names": TIER_NAMES,
            "tier_counts": tier_counts,
            "tier_files": tier_files,
            "distribution": dist,
            "summary_md": summ,
            "articles": rows,
        }
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(dump_payload(payload), encoding="utf-8")
        print(f"📦 {len(rows)} 列 → {out.relative_to(REPO).as_posix() if out.is_relative_to(REPO) else out}")
    if not args.quiet:
        print()
        print(summ)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
