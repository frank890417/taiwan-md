#!/usr/bin/env python3
"""babel-pulse.py — 巴別塔常駐脈搏儀器（15 分鐘一跳，不依賴 Claude 甦醒）。

哲宇 2026-07-25 directive：「把每 15 分鐘統計一次視覺化回報跟資料紀錄變成
儀器，常態化，不要靠 claude 甦醒」。這是 MANIFESTO §14「高儀器化，必要時
才用 LLM」的直接落地——盤點同步率、算速率、畫看板全部是機械工作，靠一個
會失憶又要花判斷力的東西每小時醒來做，是雙重浪費。

一跳做四件事：
  1. 資料紀錄  progress-snapshot.py（append reports/babel/progress-{月}.jsonl + md）
  2. 機器可讀  public/api/babel-live.json（任何看板可讀：九→N 語覆蓋、節點、
               產線存活、近 1h/24h 速率、ETA）
  3. 視覺回報  reports/babel/live.html（自包含看板，直接開；fleet 戰情室可 iframe）
  4. 落地      整點那一跳 git commit（15 分鐘一 commit 會洗版 git log，
               資料粒度 15 分鐘但落地粒度 1 小時）

用法：
  python3 scripts/tools/lang-sync/babel-pulse.py            # 一跳（自動判斷要不要 commit）
  python3 scripts/tools/lang-sync/babel-pulse.py --no-commit
  python3 scripts/tools/lang-sync/babel-pulse.py --force-commit
  bash scripts/tools/lang-sync/install-babel-pulse.sh       # 裝成 launchd 常駐
"""
from __future__ import annotations

import argparse
import collections
import importlib.util
import json
import os
import re
import statistics
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
OUT_JSON = REPO / "public" / "api" / "babel-live.json"
OUT_HTML = REPO / "reports" / "babel" / "live.html"
GIT_LOCK = Path("/tmp/taiwan-md-git.lock")
RUN_BASE = Path("/tmp")  # babel-dispatch 的 run dir：/tmp/babel-unified-<時間>-<pid>
# 產線驗過的譯文要等批次滿或整輪結束才 commit，慢 worker 一篇就要半小時；
# 比這個舊、又不在活著的產線批次裡的未 commit 譯文，才算孤兒。
ORPHAN_AFTER_MIN = 30
# 一次 add→commit（含 prettier 與閘門）幾分鐘內結束；鎖拿超過這個時間，等鎖的人全都會逾時。
LOCK_STUCK_MIN = 20

sys.path.insert(0, str(Path(__file__).resolve().parent))
import gitlock  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from langs import ALL_TRANSLATION_LANGS  # noqa: E402

DISPLAY = {
    "en": "English", "ja": "日本語", "ko": "한국어", "es": "Español",
    "fr": "Français", "vi": "Tiếng Việt", "id": "Indonesia",
    "pt": "Português", "hi": "हिन्दी", "ar": "العربية", "ru": "Русский",
}


def run(cmd, **kw):
    return subprocess.run(cmd, cwd=REPO, capture_output=True, text=True, **kw)


def progress_rows() -> list:
    """讀時間序列（progress-snapshot 的落檔），最新在最後。"""
    rows = []
    for p in sorted((REPO / "reports" / "babel").glob("progress-*.jsonl")):
        for line in p.read_text(encoding="utf-8").splitlines():
            if line.strip():
                try:
                    rows.append(json.loads(line))
                except Exception:
                    pass
    rows.sort(key=lambda r: r.get("ts", ""))
    return rows


def dispatchers() -> list:
    """產線存活盤點（ps 掃描，不猜）。"""
    out = run(["ps", "-eo", "pid,etime,command"]).stdout.splitlines()
    live = []
    for line in out:
        if "grep" in line:
            continue
        if "babel-dispatch.py" in line and "--worker" in line:
            parts = line.split(None, 2)
            langs = ""
            if "--langs" in line:
                seg = line.split("--langs", 1)[1].strip().split()[0]
                langs = seg
            live.append({"kind": "unified", "pid": parts[0], "uptime": parts[1],
                         "langs": langs,
                         "workers": line.count("--worker")})
        elif "dispatch-node-v3.sh" in line:
            parts = line.split(None, 2)
            tail = parts[2].split("dispatch-node-v3.sh", 1)[1].split()
            live.append({"kind": "fleet", "pid": parts[0], "uptime": parts[1],
                         "node": tail[0] if tail else "?",
                         "langs": ",".join(tail[3:]) if len(tail) > 3 else ""})
    return live


def parse_porcelain(z_out: str) -> list:
    """`git status --porcelain -z` → [(XY, path)]；改名／複製那一筆後面多跟一個舊路徑，跳過。"""
    items, parts, i = [], z_out.split("\0"), 0
    while i < len(parts):
        e = parts[i]
        i += 1
        if len(e) < 4:
            continue
        xy, path = e[:2], e[3:]
        if xy[0] in "RC":
            i += 1
        items.append((xy, path))
    return items


def live_run_outputs(disp: list) -> set:
    """活著的 unified dispatcher 本輪驗過（report.jsonl ok）、還在等 commit 批次的譯文。"""
    pending = set()
    for x in disp:
        if x.get("kind") != "unified":
            continue
        for rep in RUN_BASE.glob(f"babel-unified-*-{x['pid']}/report.jsonl"):
            for line in rep.read_text(encoding="utf-8").splitlines():
                try:
                    r = json.loads(line)
                except ValueError:
                    continue
                if r.get("ok") and r.get("trans"):
                    pending.add(r["trans"])
    return pending


def classify_uncommitted(items: list, pending: set, age_min, threshold: int = ORPHAN_AFTER_MIN) -> dict:
    """未 commit 的譯文 .md 分兩種：活產線批次裡的（或剛寫好的）＝pending；其餘＝孤兒。"""
    orphans, n_pending = [], 0
    for xy, path in items:
        if not path.endswith(".md"):
            continue
        age = age_min(path)
        if path in pending or (age is not None and age < threshold):
            n_pending += 1
        else:
            orphans.append({"path": path, "xy": xy, "age_min": age})
    return {"orphans": orphans, "pending": n_pending}


def uncommitted_translations(disp: list) -> dict:
    """工作樹有、HEAD 沒有（或內容不同）的譯文。

    為什麼要數（2026-09-27 巴別塔渦流第十四輪）：status.py 讀的是工作樹，所以只在工作樹
    的譯文在 gap 裡算 fresh。前一晚 19:13 重啟 dispatcher 時，舊那輪已驗過、還沒輪到 commit
    批次的三篇（ar〈文化內容策進院〉、de〈大龍峒〉〈高雄市〉）就此沒人認領；新一輪看 status 是
    fresh，不會再碰。十二語 gap=0 宣告了兩次，這三對在 origin 上其實一直是 missing，連 commit
    進去的 _translation-status.json 也寫 fresh。孤兒不自動 commit：它們是舊閘門時代驗的，
    今天三篇全卡幣別閘門，要重驗或重譯。
    """
    now = datetime.now().timestamp()
    paths = [f"knowledge/{c}/" for c in ALL_TRANSLATION_LANGS]
    out = run(["git", "status", "--porcelain", "-z", "--untracked-files=all", "--", *paths]).stdout

    def age_min(p):
        try:
            return int((now - (REPO / p).stat().st_mtime) // 60)
        except OSError:
            return None  # 刪除的檔：工作樹沒有了，照孤兒列（HEAD 上還在）

    return classify_uncommitted(parse_porcelain(out), live_run_outputs(disp), age_min)


def leftover_staged() -> list:
    """index 跟 HEAD 不同、工作樹卻跟 HEAD 相同的路徑：有人暫存了一份內容、工作樹又被還原，
    暫存留著沒人要。

    為什麼要看（2026-09-27 渦流第十五輪）：同一天主工作樹兩度出現這種暫存，14:30 是 minified 報表
    與 en〈文章如何誕生〉的 `''` 引號版，16:30 前後是 OBSERVER-QUEUE 表格重排版，內容都跟 HEAD
    相同、各放了一個多小時，查不出是哪個程序留的。它不會進任何人的 pathspec commit，卻會讓
    push-every 合併 origin 時被「local changes would be overwritten」擋下：只要 origin 動到同一個檔，
    推送就停，而推送停住不會出現在缺口讀數裡。拿著共用 git 鎖的人正在 add→commit，那段暫存是進行中的，不算。
    """
    if GIT_LOCK.is_dir():
        return []
    staged = [p for p in run(["git", "diff", "--cached", "--name-only", "-z"]).stdout.split("\0") if p]
    return [p for p in staged if run(["git", "diff", "--quiet", "HEAD", "--", p]).returncode == 0]


TLC_CACHE = REPO / ".taiwanmd" / "target-language-cache.json"


def language_mismatch() -> dict:
    """status 算 fresh、卻不是目標語言的譯文：整篇是別的語言（OBSERVER-QUEUE #53），或尾段漂成
    別的文字（#69）。判準就是 dispatcher 第一道閘門 target-language-check 的 judge()。

    為什麼要數（2026-09-27 渦流第十八輪）：十二語缺口歸零之後，ja〈黃山料〉照樣是整篇英文、hi 三十一篇
    尾段漂成韓文。status 只看版本標記，這些都算 fresh，於是「100%」裡有 83 篇讀者讀不到自己的語言
    （整篇錯語 51、尾段漂移 32，全掃 13,488 篇約 36 秒）。存量怎麼清等哲宇決定，這裡讓它每輪看得到。
    快取以檔案大小＋mtime 為鍵，只重判變過的檔。
    """
    spec = importlib.util.spec_from_file_location(
        "target_language_check", Path(__file__).with_name("target-language-check.py"))
    tlc = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(tlc)
    tlc.REPO = REPO  # judge() 印的路徑跟本支同一個根
    try:
        cache = json.loads(TLC_CACHE.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        cache = {}
    new_cache, counts, by_lang, sample = {}, {"wrong_language": 0, "foreign_script": 0}, {}, []
    for lang in [L for L in ALL_TRANSLATION_LANGS if L in tlc.ALL_LANGS]:
        for p in sorted((REPO / "knowledge" / lang).rglob("*.md")):
            if p.name.startswith("_"):
                continue
            rel = p.relative_to(REPO).as_posix()
            st = p.stat()
            key = f"{st.st_size}:{st.st_mtime_ns}"
            hit = cache.get(rel)
            if hit and hit[0] == key:
                verdict, kind, detected = hit[1], hit[2], hit[3]
            else:
                r = tlc.judge(p, lang)
                verdict, detected = r["verdict"], r["detected"]
                kind = "foreign_script" if "漂入" in (r.get("note") or "") else "wrong_language"
            new_cache[rel] = [key, verdict, kind, detected]
            if verdict == "fail":
                counts[kind] += 1
                by_lang[lang] = by_lang.get(lang, 0) + 1
                if len(sample) < 12:
                    sample.append({"path": rel, "kind": kind, "detected": detected})
    TLC_CACHE.parent.mkdir(exist_ok=True)
    TLC_CACHE.write_text(json.dumps(new_cache, ensure_ascii=False), encoding="utf-8")
    return {**counts, "total": sum(counts.values()), "by_lang": by_lang, "sample": sample}


SRC_RE = re.compile(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", re.M)
H2_RE = re.compile(r"^## ", re.M)


URL_RE = re.compile(r"https?://")
_VERIFY = None


def _verify_module():
    """verify-translation.py 的 extract_urls／parse_fm——網址比對用閘門自己那把尺，不另寫 regex。"""
    global _VERIFY
    if _VERIFY is None:
        spec = importlib.util.spec_from_file_location(
            "verify_translation", Path(__file__).with_name("verify-translation.py"))
        _VERIFY = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(_VERIFY)
    return _VERIFY


_NSC = None


def _name_substitution_module():
    """name-substitution-check.py 的 check——名人頂替用同一張表，不在這裡另列名字。"""
    global _NSC
    if _NSC is None:
        spec = importlib.util.spec_from_file_location(
            "name_substitution_check", Path(__file__).with_name("name-substitution-check.py"))
        _NSC = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(_NSC)
    return _NSC


def content_gaps(min_h2: int = 4, min_urls: int = 5) -> dict:
    """status 算 fresh、內容卻缺一大塊的譯文，三族一次掃：

    截斷：## 章節不到 zh 的六成、篇幅也不到該語言正常比例的七成（2026-09-27 渦流第二十一輪：es〈長榮海運〉
    zh 八個章節只譯到第二個、ja〈楊勇緯〉十五個只有五個，版本標記照樣是新的；verify 的章節數與篇幅比對只是 WARN）。
    無出處：zh 引了 ≥5 個網址、譯文一個都沒有（第二十二輪：fr〈台灣官方網站資源〉zh 53 個網址、法文版 0 個，
    參考資料整段不見；站上的文章靠出處立足，沒有出處的譯文等於少了一半）。
    網址不符：網址組合跟 zh 不一樣——少了、多了或被改了，也就是 verify 第 11 檢查會擋的譯文（第二十五輪：
    es〈滷肉飯〉最後一條腳註斷在 youtube.com/watch、劉山東牛肉麵被連到「上海牛肉麵」的維基頁；全庫 648 篇，少 1,315 個網址、多出或被改的 817 個）。
    這道檢查 07-29 才變成完全比對，之前落地的是存量；之後的新譯文都要過它，所以這個數字只該往下走——
    往上走代表有一條產線繞過了閘門。無出處的篇另外算，不重複計入。
    名人頂替：譯文出現 zh 原稿連別名都沒有的名人或首都（第三十一輪：vi 把台北寫成河內 45 篇、
    es／pt／hi〈蔡健雅〉主角整篇是 Tsai Ing-wen；網址與結構全對，其他檢查都看不見）。
    「正常比例」取該語言全部譯文對 zh 篇幅比的中位數，不寫死每個語言的數字，新語言出生也適用。
    """
    vt = _verify_module()
    nsc = _name_substitution_module()
    subs, subs_by = [], {}
    pairs = collections.defaultdict(list)
    for lang in ALL_TRANSLATION_LANGS:
        for p in (REPO / "knowledge" / lang).rglob("*.md"):
            if p.name.startswith("_"):
                continue
            t = p.read_text(encoding="utf-8", errors="replace")
            m = SRC_RE.search(t)
            zp = REPO / "knowledge" / m.group(1).strip() if m else None
            if not zp or not zp.exists():
                continue
            z = zp.read_text(encoding="utf-8", errors="replace")
            zb, tb = z.split("\n---", 1)[-1], t.split("\n---", 1)[-1]
            zc = collections.Counter(vt.extract_urls(vt.parse_fm(z)[1]))
            tc = collections.Counter(vt.extract_urls(vt.parse_fm(t)[1]))
            hits = nsc.check(lang, z, t)
            if hits:
                subs.append({"path": p.relative_to(REPO).as_posix(), "names": dict(hits)})
                subs_by[lang] = subs_by.get(lang, 0) + 1
            pairs[lang].append((p.relative_to(REPO).as_posix(), len(H2_RE.findall(z)), len(H2_RE.findall(t)),
                                len(tb) / max(1, len(zb)), len(URL_RE.findall(zb)), len(URL_RE.findall(tb)),
                                sum((zc - tc).values()), sum((tc - zc).values())))
    trunc, nosrc, urlx = [], [], []
    trunc_by, nosrc_by, urlx_by = {}, {}, {}
    for lang, rows in pairs.items():
        med = statistics.median(r[3] for r in rows)
        for rel, zh2, tr2, ratio, zu, tu, u_missing, u_extra in rows:
            if zh2 >= min_h2 and tr2 <= 0.6 * zh2 and ratio / med < 0.7:
                trunc.append({"path": rel, "h2": f"{zh2}→{tr2}", "length": round(ratio / med, 2)})
                trunc_by[lang] = trunc_by.get(lang, 0) + 1
            if zu >= min_urls and tu == 0:
                nosrc.append({"path": rel, "zh_urls": zu})
                nosrc_by[lang] = nosrc_by.get(lang, 0) + 1
            elif u_missing or u_extra:
                urlx.append({"path": rel, "missing": u_missing, "extra": u_extra})
                urlx_by[lang] = urlx_by.get(lang, 0) + 1
    return {"truncated": {"count": len(trunc), "by_lang": trunc_by, "sample": trunc[:12]},
            "no_sources": {"count": len(nosrc), "by_lang": nosrc_by, "sample": nosrc[:12]},
            "url_mismatch": {"count": len(urlx), "by_lang": urlx_by,
                             "missing": sum(r["missing"] for r in urlx), "extra": sum(r["extra"] for r in urlx),
                             "sample": urlx[:12]},
            "name_substitution": {"count": len(subs), "by_lang": subs_by,
                                  "sample": sorted(subs, key=lambda r: -sum(r["names"].values()))[:12]}}


def truncated_translations(min_h2: int = 4) -> dict:
    return content_gaps(min_h2)["truncated"]


def rate_window(rows: list, hours: float):
    """近 N 小時的 fresh 淨增（跨全部語言）。找 ≥N 小時前最近的一列當基準。"""
    if len(rows) < 2:
        return None
    now = datetime.fromisoformat(rows[-1]["ts"])
    target = now - timedelta(hours=hours)
    base = None
    for r in rows[:-1]:
        if datetime.fromisoformat(r["ts"]) <= target:
            base = r
    if base is None:
        base = rows[0]
    span_h = (now - datetime.fromisoformat(base["ts"])).total_seconds() / 3600
    if span_h <= 0:
        return None
    f_now = sum(v["fresh"] for v in rows[-1]["langs"].values())
    f_base = sum(v["fresh"] for v in base["langs"].values())
    return {"delta": f_now - f_base, "span_h": round(span_h, 2),
            "per_hour": round((f_now - f_base) / span_h, 1)}


def build_payload(rows: list) -> dict:
    latest = rows[-1]
    total = latest["total_zh"]
    langs = []
    prev = rows[-2] if len(rows) > 1 else None
    for code in ALL_TRANSLATION_LANGS:
        c = latest["langs"].get(code)
        if not c:
            continue
        p = (prev or {}).get("langs", {}).get(code) if prev else None
        langs.append({
            "lang": code, "name": DISPLAY.get(code, code),
            "fresh": c["fresh"], "stale": c["stale"], "missing": c["missing"],
            "coverage_pct": round((total - c["missing"]) / total * 100, 1),
            "fresh_delta": (c["fresh"] - p["fresh"]) if p else None,
        })
    gap = sum(v["stale"] + v["missing"] for v in latest["langs"].values())
    gap_prev = (sum(v["stale"] + v["missing"] for v in prev["langs"].values())
                if prev else None)
    r1 = rate_window(rows, 1)
    r24 = rate_window(rows, 24)
    eta_days = None
    if r1 and r1["per_hour"] > 0:
        eta_days = round(gap / r1["per_hour"] / 24, 1)
    disp = dispatchers()
    return {
        "generated_at": datetime.now().astimezone().isoformat(timespec="seconds"),
        "producer": "scripts/tools/lang-sync/babel-pulse.py (launchd, 15min)",
        "snapshot_ts": latest["ts"],
        "total_zh": total,
        "langs": langs,
        "gap_total": gap,
        "gap_delta": (gap - gap_prev) if gap_prev is not None else None,
        "rate_1h": r1, "rate_24h": r24, "eta_days": eta_days,
        "nodes": latest.get("nodes", {}),
        "dispatchers": disp,
        # gap_total 是工作樹口徑；orphans 是工作樹有、origin 沒有、也沒有產線在管的譯文
        "uncommitted": uncommitted_translations(disp),
        "leftover_staged": leftover_staged(),
        # gap 算 fresh、實際不是目標語言的譯文（整篇錯語／尾段漂移）
        "language_mismatch": language_mismatch(),
        # gap 算 fresh、內容卻缺一大塊的譯文（截斷／無出處），同一次掃描
        **content_gaps(),
        "history": [
            {"ts": r["ts"],
             "fresh_total": sum(v["fresh"] for v in r["langs"].values()),
             "gap_total": sum(v["stale"] + v["missing"] for v in r["langs"].values())}
            for r in rows[-96:]
        ],
    }


def render_html(d: dict) -> str:
    bars = []
    for L in sorted(d["langs"], key=lambda x: -x["coverage_pct"]):
        f = L["fresh"] / d["total_zh"] * 100
        s = L["stale"] / d["total_zh"] * 100
        dd = L["fresh_delta"]
        dtxt = f"+{dd}" if dd and dd > 0 else (str(dd) if dd else "·")
        dcol = "#16a34a" if dd and dd > 0 else "#9ca3af"
        bars.append(
            f'<div class="row"><span class="nm">{L["name"]}</span>'
            f'<div class="track"><i style="width:{f:.2f}%"></i>'
            f'<b style="width:{s:.2f}%"></b></div>'
            f'<span class="pct">{L["coverage_pct"]}%</span>'
            f'<span class="dt" style="color:{dcol}">{dtxt}</span></div>')
    nodes = []
    for name, v in sorted((d.get("nodes") or {}).items()):
        if name.startswith("endpoint:"):
            alive = "🟢" if v.get("alive") else "🔴"
            nodes.append(f'<span class="chip">{alive} {name.split(":",1)[1]}</span>')
        else:
            ok, fail = v.get("ok", 0), v.get("fail", 0)
            tot = ok + fail
            pr = f"{ok/tot*100:.0f}%" if tot else "—"
            nodes.append(f'<span class="chip">{name.split(":",1)[-1]} '
                         f'<b>{ok}</b>/{tot} <i>{pr}</i></span>')
    disp = "".join(
        f'<span class="chip">{x["kind"]}:{x.get("node") or x.get("langs","")} '
        f'pid {x["pid"]} · {x["uptime"]}</span>' for x in d["dispatchers"]
    ) or '<span class="chip warn">無產線在跑</span>'
    hist = d["history"]
    pts = ""
    if len(hist) > 1:
        gmin = min(h["gap_total"] for h in hist)
        gmax = max(h["gap_total"] for h in hist)
        rng = max(gmax - gmin, 1)
        pts = " ".join(
            f'{i/(len(hist)-1)*100:.2f},{(1-(h["gap_total"]-gmin)/rng)*100:.2f}'
            for i, h in enumerate(hist))
    r1 = d.get("rate_1h") or {}
    gd = d.get("gap_delta")
    gdtxt = ("▼" + str(abs(gd)) if gd and gd < 0 else
             ("▲" + str(gd) if gd else "＝0")) if gd is not None else "—"
    gdcol = "#16a34a" if gd and gd < 0 else ("#dc2626" if gd and gd > 0 else "#9ca3af")
    unc = d.get("uncommitted") or {"orphans": [], "pending": 0}
    n_orph = len(unc["orphans"])
    orph_col = "#dc2626" if n_orph else "var(--mut)"
    orph_list = "".join(
        f'<span class="chip warn">{o["xy"].strip() or "?"} {o["path"]} · {o["age_min"]} 分</span>'
        for o in unc["orphans"][:20])
    orph_list += "".join(
        f'<span class="chip warn">殘留暫存 {p}</span>' for p in (d.get("leftover_staged") or [])[:20])
    lm = d.get("language_mismatch") or {"total": 0, "wrong_language": 0, "foreign_script": 0}
    lm_col = "#dc2626" if lm["total"] else "var(--mut)"
    tr_n = (d.get("truncated") or {}).get("count", 0)
    tr_col = "#dc2626" if tr_n else "var(--mut)"
    ns_n = (d.get("no_sources") or {}).get("count", 0)
    ns_col = "#dc2626" if ns_n else "var(--mut)"
    um = d.get("url_mismatch") or {"count": 0, "missing": 0, "extra": 0}
    um_col = "#dc2626" if um["count"] else "var(--mut)"
    nsub = d.get("name_substitution") or {"count": 0, "by_lang": {}}
    nsub_col = "#dc2626" if nsub["count"] else "var(--mut)"
    nsub_top = "、".join(f"{k} {v}" for k, v in sorted(nsub["by_lang"].items(), key=lambda kv: -kv[1])[:3]) or "—"
    return f"""<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>巴別塔脈搏 — Taiwan.md</title>
<style>
:root{{--bg:#faf9f7;--fg:#1a1a19;--mut:#6b7280;--line:#e5e3dd;--card:#fff}}
@media(prefers-color-scheme:dark){{:root{{--bg:#141413;--fg:#f5f5f4;--mut:#9ca3af;--line:#2c2c2a;--card:#1c1c1b}}}}
*{{box-sizing:border-box}}
body{{margin:0;padding:20px;background:var(--bg);color:var(--fg);
font:14px/1.6 -apple-system,"Noto Sans TC",sans-serif}}
h1{{font-size:18px;font-weight:500;margin:0 0 2px}}
.sub{{color:var(--mut);font-size:12px;margin-bottom:16px}}
.kpis{{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:10px;margin-bottom:18px}}
.kpi{{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px}}
.kpi u{{display:block;color:var(--mut);font-size:11px;text-decoration:none;margin-bottom:4px}}
.kpi strong{{font-size:22px;font-weight:500}}
.kpi em{{font-style:normal;font-size:11px;color:var(--mut)}}
.row{{display:flex;align-items:center;gap:8px;margin-bottom:6px}}
.nm{{width:92px;text-align:right;color:var(--mut);font-size:12px;flex:none}}
.track{{flex:1;height:14px;background:var(--line);border-radius:4px;overflow:hidden;display:flex}}
.track i{{background:#2a78d6}} .track b{{background:#a8c9ee}}
.pct{{width:48px;text-align:right;font-size:12px;font-weight:500}}
.dt{{width:34px;text-align:right;font-size:11px}}
.chip{{display:inline-block;background:var(--card);border:1px solid var(--line);
border-radius:999px;padding:3px 10px;margin:0 6px 6px 0;font-size:11px}}
.chip i{{font-style:normal;color:var(--mut)}} .chip.warn{{color:#dc2626}}
h2{{font-size:13px;font-weight:500;color:var(--mut);margin:18px 0 8px}}
svg{{width:100%;height:70px;display:block}}
</style></head><body>
<h1>🗼 巴別塔脈搏</h1>
<div class="sub">{d["generated_at"][:19].replace("T"," ")} ／ 每 15 分鐘自動更新（launchd 常駐儀器，非 session 觸發）</div>
<div class="kpis">
<div class="kpi"><u>總缺口 stale+missing</u><strong>{d["gap_total"]:,}</strong><em style="color:{gdcol}">{gdtxt} vs 上一跳</em></div>
<div class="kpi"><u>近 1 小時淨增</u><strong>+{r1.get("delta","—")}</strong><em>{r1.get("per_hour","—")} 篇／小時</em></div>
<div class="kpi"><u>粗估到 100%</u><strong>{d.get("eta_days") or "—"}</strong><em>天（依當前速率）</em></div>
<div class="kpi"><u>語言數</u><strong>{len(d["langs"])}</strong><em>zh 母本 {d["total_zh"]} 篇</em></div>
<div class="kpi"><u>只在工作樹的譯文（孤兒）</u><strong style="color:{orph_col}">{n_orph}</strong><em>缺口不含這些；另 {unc["pending"]} 篇在產線批次中</em></div>
<div class="kpi"><u>算 fresh 但沒有出處</u><strong style="color:{ns_col}">{ns_n}</strong><em>zh 引了 ≥5 個網址、譯文 0 個</em></div>
<div class="kpi"><u>算 fresh 但只譯了前段</u><strong style="color:{tr_col}">{tr_n}</strong><em>章節不到 zh 六成、篇幅不到七成</em></div>
<div class="kpi"><u>算 fresh 但網址跟 zh 不一樣</u><strong style="color:{um_col}">{um["count"]}</strong><em>verify 網址比對會擋；少 {um["missing"]}、多或改 {um["extra"]}</em></div>
<div class="kpi"><u>名人或首都頂替</u><strong style="color:{nsub_col}">{nsub["count"]}</strong><em>zh 沒提到的蔡英文／河內等；{nsub_top}</em></div>
<div class="kpi"><u>算 fresh 但不是目標語言</u><strong style="color:{lm_col}">{lm["total"]}</strong><em>整篇錯語 {lm["wrong_language"]}／尾段漂移 {lm["foreign_script"]}</em></div>
</div>
{orph_list}
<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline fill="none"
stroke="#2a78d6" stroke-width="0.8" vector-effect="non-scaling-stroke" points="{pts}"/></svg>
<div class="sub" style="margin-top:2px">總缺口趨勢（最近 {len(hist)} 跳，越低越好）</div>
<h2>語言覆蓋（深＝最新 fresh／淺＝可讀 stale；右欄為對上一跳 Δfresh）</h2>
{"".join(bars)}
<h2>產線</h2>{disp}
<h2>節點／worker（ok/總，通過率）</h2>{"".join(nodes)}
</body></html>"""


def snapshot_paths(repo: Path = REPO) -> list:
    """整點快照要落地的儀器產物。進度檔按月分檔，用實際存在的檔名，不寫死月份
    （2026-07 寫死的 progress-2026-07.* 讓八、九月的時間序列從沒被這支 commit 過）。"""
    babel = repo / "reports" / "babel"
    progress = sorted(p.relative_to(repo).as_posix() for pat in ("progress-*.jsonl", "progress-log-*.md")
                      for p in babel.glob(pat))
    return ["reports/babel/live.html", "public/api/babel-live.json", *progress]


def git_commit(log) -> bool:
    gitlock.clear_impostor(log)
    tries = 0
    while True:
        try:
            GIT_LOCK.mkdir()
            break
        except FileExistsError:
            tries += 1
            if tries > 120:
                log("git lock timeout, 跳過本跳 commit")
                return False
            import time
            time.sleep(1)
    try:
        # 快照只有這幾個儀器產物；精確列檔避免把 fail-memo 或平行 writer
        # 放在 reports/babel/ 的其他產物一起掃進 commit。
        mine = snapshot_paths()
        run(["git", "add", "--", *mine])
        if run(["git", "diff", "--cached", "--quiet", "--", *mine]).returncode == 0:
            return True
        msg = "🧬 [semiont] babel: 脈搏儀器整點落地（15 分鐘粒度快照與看板）"
        # 產線運轉時 lint-staged 會 stash 全工作樹；2026-07-28 實撞三條
        # dispatcher 同時在 status refresh 階段退出，脈搏隨即從 3 變 0。
        # 這四檔是剛由本函式生成、且上面已精確 add 的儀器產物，不需要文章
        # gate；跳過 pre-commit 是為了不讓「記錄心跳」反過來中斷心跳。
        # 只 commit 自己的檔（pathspec）：index 裡可能躺著 dispatcher 失敗批次留下的暫存，
        # 不該被脈搏的快照 commit 順手帶走。
        r = run(["git", "commit", "--no-verify", "-m", msg, "--", *mine])
        if r.returncode != 0:
            log("commit 失敗（不影響下一跳）：" + (r.stdout + r.stderr)[-500:])
            # 只退自己的暫存。整個 index reset 會把別人暫存的新譯文退成未追蹤，
            # status 照算 fresh、再也沒人 commit——正是上面 uncommitted_translations 抓的孤兒。
            run(["git", "reset", "-q", "--", *mine])
            return False
        return True
    finally:
        try:
            GIT_LOCK.rmdir()
        except OSError:
            pass


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--no-commit", action="store_true")
    ap.add_argument("--force-commit", action="store_true")
    args = ap.parse_args()
    logf = REPO / ".taiwanmd" / "babel-pulse.log"
    logf.parent.mkdir(exist_ok=True)

    def log(m):
        line = f"[{datetime.now().astimezone().isoformat(timespec='seconds')}] {m}"
        print(line)
        with open(logf, "a", encoding="utf-8") as f:
            f.write(line + "\n")

    r = run(["python3", "scripts/tools/lang-sync/progress-snapshot.py",
             "--note", "（babel-pulse 常駐儀器自動快照）"])
    if r.returncode != 0:
        log("progress-snapshot 失敗：" + (r.stdout + r.stderr)[-400:])
        # 沒有本輪新快照時，繼續拿舊 rows 產生看板會把陳舊 gap 偽裝成成功落地。
        # 呼叫端可自行決定是否容忍 pulse 非零；儀器本身不宣稱假綠。
        return 1

    rows = progress_rows()
    if not rows:
        log("無時間序列資料，跳過")
        return 1
    payload = build_payload(rows)
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
    OUT_HTML.parent.mkdir(parents=True, exist_ok=True)
    OUT_HTML.write_text(render_html(payload), encoding="utf-8")

    r1 = payload.get("rate_1h") or {}
    unc = payload["uncommitted"]
    log(f"pulse gap={payload['gap_total']} Δ={payload.get('gap_delta')} "
        f"rate_1h={r1.get('per_hour')}/h 產線={len(payload['dispatchers'])} "
        f"孤兒={len(unc['orphans'])} 批次中={unc['pending']} 殘留暫存={len(payload['leftover_staged'])} "
        f"語言不符={payload['language_mismatch']['total']}"
        f"（整篇錯語 {payload['language_mismatch']['wrong_language']}／尾段漂移 {payload['language_mismatch']['foreign_script']}）"
        f" 截斷={payload['truncated']['count']} 無出處={payload['no_sources']['count']}"
        f" 網址不符={payload['url_mismatch']['count']}"
        f" 名人頂替={payload['name_substitution']['count']}"
        f" → {OUT_JSON.name} + {OUT_HTML.name}")
    for o in unc["orphans"]:
        log(f"  孤兒 {o['xy'].strip() or '?'} {o['path']}（{o['age_min']} 分鐘未 commit，不在活產線批次）")
    for p in payload["leftover_staged"]:
        log(f"  殘留暫存 {p}（index 跟 HEAD 不同、工作樹跟 HEAD 相同；會擋 push-every 合併 origin）")
    held = gitlock.held_minutes()
    if held is not None and held < 0:
        log(f"  🔴 git 鎖路徑是一般檔案、不是目錄（{-held:.0f} 分鐘），所有等鎖的 commit 與合併都會逾時；下一次拿鎖會自動清掉")
    elif held is not None and held > LOCK_STUCK_MIN:
        log(f"  🔴 git 鎖已被持有 {held:.0f} 分鐘（> {LOCK_STUCK_MIN}），等鎖的 commit 與合併正在逾時；先查誰拿著")

    # 整點那一跳落地（15 分鐘一 commit 會洗版 git log）
    should = args.force_commit or (not args.no_commit and datetime.now().minute < 15)
    if should:
        git_commit(log) and log("整點落地 commit 完成")
    return 0


if __name__ == "__main__":
    sys.exit(main())
