#!/usr/bin/env python3
"""review-stock-pick.py — twmd-review-stock 的選篇儀器（唯讀，不動任何檔案）。

設計 canonical：reports/design-review-stock-2026-09-05.md §五 Step 1
SOP canonical：docs/pipelines/MAINTAINER-PIPELINE.md §1d 審庫存

母體（三條件同時成立）：
  1. T1 分類（TIER_MAP 直接 import 自 generate-dashboard-immune.py，不複寫）
  2. lastHumanReview ≠ true
  3. curation ≠ verified
排序：先分組，再依 GA 視窗內流量由高到低（public/api/dashboard-analytics.json 的
ga.topArticles7d，視窗天數以該檔 ga.days 為準，目前 28 天）；沒進榜的文章視為 0 流量，
依「最後改動日期」（lastVerified 或 date）由舊到新補在後面。
分組（2026-11-04 全站普查 §八 #3 #12，讀 reports/article-census/latest.json；沒有就不分組）：
  0. featured 的 A 級（該標 🌱 卻因為是首頁精選而沒標——先查完再決定精選留不留）
  1. A-watch：零查證證據、但不薄所以沒被標 🌱 的文章——規則看不見、只能靠人眼的區域
  2. 其餘母體
排除：近 N 天（預設 14）已有 preReview 指標的文章（避免重覆選同一批）；
      出現在任一 open PR diff 裡的文章（跟 maintainer 搶同一篇會 merge 衝突；要 gh，
      沒網路時 --skip-pr-check）。
旗標（只標不排）：walked = 走過 REWRITE（rationale / DONE-LOG / research 檔三訊號之一，
      同 FACTCHECK §月度巡邏抽樣母體條件 4）；incubating = 社群投稿待查證。

用法：
  python3 scripts/tools/review-stock-pick.py                 # 前 5 名人讀表
  python3 scripts/tools/review-stock-pick.py --top 2 --json  # routine 用
  python3 scripts/tools/review-stock-pick.py --skip-pr-check # 離線

Exit code：0 有候選；1 母體為空（免疫洞已補完，routine 走 no-op finale）；2 環境壞掉。
"""

from __future__ import annotations

import argparse
import datetime as dt
import glob
import importlib.util
import json
import os
import re
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
KNOWLEDGE = REPO_ROOT / "knowledge"
ANALYTICS = REPO_ROOT / "public" / "api" / "dashboard-analytics.json"
DONE_LOG = REPO_ROOT / "docs" / "semiont" / "ARTICLE-DONE-LOG.md"
CENSUS = REPO_ROOT / "reports" / "article-census" / "latest.json"
IMMUNE_PY = REPO_ROOT / "scripts" / "core" / "generate-dashboard-immune.py"


def load_tier_map() -> dict[str, str]:
    """TIER_MAP 的 SSOT 在免疫產生器；這裡 import 不複寫（MANIFESTO §指標 over 複寫）。"""
    spec = importlib.util.spec_from_file_location("gdi", IMMUNE_PY)
    if spec is None or spec.loader is None:
        sys.exit(f"[review-stock-pick] 讀不到 {IMMUNE_PY}")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return dict(mod.TIER_MAP)


def census_groups() -> tuple[dict[str, int], str | None]:
    """{repo 路徑: 組別}（0 精選 A／1 A-watch），與普查產生日。普查檔不在回 ({}, None)。"""
    if not CENSUS.exists():
        return {}, None
    sys.path.insert(0, str(REPO_ROOT / "scripts" / "tools"))
    from lib.article_health import census as C  # noqa: E402

    data = json.loads(CENSUS.read_text(encoding="utf-8"))
    groups: dict[str, int] = {}
    for r in data.get("articles", []):
        if "A" in r.get("tiers", {}) and r.get("featured"):
            groups[r["path"]] = 0
        elif (r.get("curation") is None and r.get("category") != "About"
              and "A" not in r.get("tiers", {}) and not C.has_deep_evidence(r)):
            groups[r["path"]] = 1
    return groups, data.get("generated")


def fm_value(text: str, key: str) -> str | None:
    m = re.search(rf"^{re.escape(key)}:\s*(.*?)\s*$", text, re.M)
    if not m:
        return None
    return m.group(1).strip().strip("'\"")


def iso_or_none(v: str | None) -> dt.date | None:
    if not v:
        return None
    try:
        return dt.date.fromisoformat(v[:10])
    except ValueError:
        return None


def ga_views() -> tuple[dict[str, int], int]:
    """回 {knowledge-relative path: views}, window_days。沒有 analytics 檔時回空。"""
    if not ANALYTICS.exists():
        return {}, 0
    data = json.loads(ANALYTICS.read_text(encoding="utf-8"))
    ga = data.get("ga") or {}
    cats = {c.name.lower(): c.name for c in KNOWLEDGE.iterdir() if c.is_dir()}
    views: dict[str, int] = {}
    for row in ga.get("topArticles7d") or []:
        m = re.match(r"^/([^/]+)/([^/]+)/$", row.get("path", ""))
        if not m:
            continue
        cat = cats.get(m.group(1))
        if not cat:
            continue
        rel = f"{cat}/{m.group(2)}.md"
        if (KNOWLEDGE / rel).exists():
            views[rel] = int(row.get("views") or 0)
    return views, int(ga.get("days") or 0)


def open_pr_paths() -> set[str] | None:
    """所有 open PR 動到的 knowledge/ 路徑；gh 不可用回 None（呼叫端決定要不要擋）。"""
    try:
        out = subprocess.run(
            ["gh", "pr", "list", "--state", "open", "--limit", "200",
             "--json", "number,files", "--jq", ".[].files[].path"],
            capture_output=True, text=True, timeout=60, cwd=REPO_ROOT,
        )
    except (OSError, subprocess.TimeoutExpired):
        return None
    if out.returncode != 0:
        return None
    return {p.strip() for p in out.stdout.splitlines() if p.strip()}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--top", type=int, default=5, help="輸出前 N 名（預設 5）")
    ap.add_argument("--recent-days", type=int, default=14,
                    help="近 N 天已有 preReview 的文章跳過（預設 14）")
    ap.add_argument("--skip-pr-check", action="store_true", help="不查 open PR diff（離線）")
    ap.add_argument("--json", action="store_true", help="結構化輸出")
    args = ap.parse_args()

    tier_map = load_tier_map()
    t1_cats = {c for c, t in tier_map.items() if t == "T1"}
    views, window_days = ga_views()
    groups, census_date = census_groups()
    done_log = DONE_LOG.read_text(encoding="utf-8") if DONE_LOG.exists() else ""
    today = dt.date.today()

    pr_paths: set[str] | None = None
    pr_check = "skipped"
    if not args.skip_pr_check:
        pr_paths = open_pr_paths()
        pr_check = "ok" if pr_paths is not None else "unavailable"

    rows = []
    skipped = {"recent_prereview": 0, "in_open_pr": 0}
    for cat in sorted(t1_cats):
        for md in sorted((KNOWLEDGE / cat).glob("*.md")):
            if md.name.startswith("_"):
                continue
            head = md.read_text(encoding="utf-8")[:4000]
            if "translatedFrom:" in head:
                continue
            if (fm_value(head, "lastHumanReview") or "").lower() == "true":
                continue
            if fm_value(head, "curation") == "verified":
                continue
            rel = f"{cat}/{md.stem}.md"
            repo_rel = f"knowledge/{rel}"

            pre = fm_value(head, "preReview")
            if pre:
                # 查證單自己的 checkedAt 是日期 SSOT；讀不到才退回路徑裡的 YYYY-MM
                checked = None
                sheet = REPO_ROOT / pre
                if sheet.exists():
                    checked = iso_or_none(fm_value(sheet.read_text(encoding="utf-8")[:2000], "checkedAt"))
                if checked is None:
                    m = re.search(r"/(\d{4}-\d{2})/", pre)
                    checked = iso_or_none(m.group(1) + "-01") if m else None
                if checked and (today - checked).days < args.recent_days:
                    skipped["recent_prereview"] += 1
                    continue
            if pr_paths is not None and repo_rel in pr_paths:
                skipped["in_open_pr"] += 1
                continue

            date = iso_or_none(fm_value(head, "date"))
            verified = iso_or_none(fm_value(head, "lastVerified"))
            last_touch = verified or date or dt.date(1970, 1, 1)
            slug = md.stem
            walked = bool(
                re.search(r"^rationale:", head, re.M)
                or f"/{slug}.md" in done_log
                or glob.glob(str(REPO_ROOT / "reports" / "research" / "*" / f"{slug}.md"))
            )
            rows.append({
                "path": repo_rel,
                "category": cat,
                "views": views.get(rel, 0),
                "last_touch": last_touch.isoformat(),
                "walked_rewrite": walked,
                "curation": fm_value(head, "curation"),
                "has_prereview": bool(pre),
                "census_group": groups.get(repo_rel, 2),
            })

    rows.sort(key=lambda r: (r["census_group"], -r["views"], r["last_touch"], r["path"]))
    picked = rows[: args.top]

    if args.json:
        print(json.dumps({
            "generated": today.isoformat(),
            "ga_window_days": window_days,
            "pr_check": pr_check,
            "census": census_date,
            "population": len(rows),
            "skipped": skipped,
            "picked": picked,
        }, ensure_ascii=False, indent=2))
    else:
        print(f"[review-stock-pick] 母體 {len(rows)} 篇（T1 ∧ 未人審 ∧ 非 verified）；"
              f"GA 視窗 {window_days} 天；open-PR 檢查 {pr_check}；"
              f"跳過 近期已預審 {skipped['recent_prereview']} / 在 open PR {skipped['in_open_pr']}")
        if not rows:
            print("  母體為空——免疫洞已補完，routine 走 no-op finale")
        for i, r in enumerate(picked, 1):
            flags = []
            if r["walked_rewrite"]:
                flags.append("walked")
            if r["curation"]:
                flags.append(r["curation"])
            if r["has_prereview"]:
                flags.append("preReview")
            if r["census_group"] == 0:
                flags.append("featured-A")
            elif r["census_group"] == 1:
                flags.append("A-watch")
            print(f"  {i}. views={r['views']:>4}  touch={r['last_touch']}  {r['path']}"
                  f"{'  [' + ','.join(flags) + ']' if flags else ''}")
    return 0 if rows else 1


if __name__ == "__main__":
    sys.exit(main())
