#!/usr/bin/env python3
"""
monitor-404.py — 全流量 404 常駐監測儀器（resolution-based 分類，不是 regex 猜測）

背景：2026-07-17 查明全站 CF 404 率 14.99% 的根因是站體自己在 hreflang 吐了
13,014 條死連結（已修，commit f369f3c8e）。既有工具
`scripts/tools/analyze-crawler-404.py` 只看 10 個 crawler UA allowlist，人類
404 結構性看不見；GA4 page_404 事件死了三個月剛復活。本工具看「全部流量」，
按根因分類（不是猜 regex pattern），常駐監測避免下一次結構性 404 又要等
「有人發現」才查。

分類邏輯是 resolution-based：先建 (a) route 表（knowledge/*.md 掃出來的真實
存在頁面）+ (b) registry（public/api/lang-switch-map.json 的語言切換對照），
再依序判定每個 404 path 屬於哪個 family：

    1. phantom              — CF 說 404 但 route 表裡有這個頁面（異常，需要單獨查）
    2. slug-variant         — 有語言前綴：(2a) rest 本身就是 zh URL（死 hreflang
                               最大宗形狀，如 /en/history/台灣眷村歷史），fromZh
                               直接給該語言真實 URL；(2b) 換一個語言前綴能在
                               registry 命中同一篇文章（如 ja 李珠珢 舊 bug）
    3. cross-lang-slug      — 沒語言前綴但套上語言前綴能在 registry 命中
    4. untranslated-demand  — 同 category/slug 在其他語言的 route 表裡存在
                               （翻譯需求訊號，餵優先序用）
    5. renamed-or-truncated — 同語言同 category 下有高度重疊（≥60%）的 slug
    6. scanner              — 惡意掃描特徵路徑（.env / wp- / phpunit / ...）
    7. stale-asset / missing-asset / md-extension / bad-encoding
    8. probe-wellknown      — /cdn-cgi/ 或 /.well-known/
    9. unknown              — 以上都不是，需要人看

用法：
    python3 scripts/tools/monitor-404.py              # 預設 1 天（free tier 逐日查）
    python3 scripts/tools/monitor-404.py --days 3

輸出：
    reports/404-monitor/state.json   — rolling 日誌，保留最近 60 天
    reports/404-monitor/latest.json  — 本次最新一天的完整明細（top_paths + alerts）

憑證：沿用 fetch-cloudflare.py 的 ~/.config/taiwan-md/credentials/.env
（CF_API_TOKEN / CF_ZONE_ID）。
"""

from pathlib import Path
import argparse
import hashlib
import json
import re
import sys
import unicodedata
import urllib.parse
from collections import defaultdict
from datetime import datetime, timedelta, timezone

# Reuse fetch-cloudflare.py primitives (same import pattern as analyze-crawler-404.py)
sys.path.insert(0, str(Path(__file__).parent))
from importlib import import_module

fc = import_module("fetch-cloudflare")

REPO = Path(__file__).resolve().parent.parent.parent
sys.path.insert(0, str(REPO / "scripts/tools/lang-sync"))
from langs import ENABLED_TRANSLATION_LANGS  # noqa: E402

KNOWLEDGE_DIR = REPO / "knowledge"
LANG_SWITCH_MAP_PATH = REPO / "public/api/lang-switch-map.json"
STATE_DIR = REPO / "reports/404-monitor"
STATE_PATH = STATE_DIR / "state.json"
LATEST_PATH = STATE_DIR / "latest.json"

MAX_STATE_DAYS = 60
TOP_PATHS_LIMIT = 300
CF_ROW_LIMIT = 10000

LANGS = list(ENABLED_TRANSLATION_LANGS)

# 抄自 scripts/core/generate-lang-switch-map.mjs 的 CATEGORY_FOLDER_TO_SLUG
# （同一份對照表，不可跟原檔 drift）。
CATEGORY_FOLDER_TO_SLUG = {
    "History": "history",
    "Geography": "geography",
    "Culture": "culture",
    "Food": "food",
    "Art": "art",
    "Music": "music",
    "Technology": "technology",
    "Nature": "nature",
    "People": "people",
    "Politics": "politics",
    "Society": "society",
    "Economy": "economy",
    "Lifestyle": "lifestyle",
    "About": "about",
    "Resources": "resources",
}

RESOLVABLE_FAMILIES = {
    "slug-variant",
    "cross-lang-slug",
    "untranslated-demand",
    "renamed-or-truncated",
}

SCANNER_RE = re.compile(
    r"\.env|\.php|/wp-|phpunit|/vendor/|cgi-bin|admin|backup|\.sql|\.git/|\.aws|\.ssh"
    r"|^/(contact|contact-us|about-us|contactus|index\.php)",
    re.IGNORECASE,
)
STALE_ASSET_RE = re.compile(r"^/_astro/")
MISSING_ASSET_RE = re.compile(r"^/(assets|images|img|fonts)/")
MD_EXT_RE = re.compile(r"\.md$")
WELLKNOWN_RE = re.compile(r"^/(cdn-cgi|\.well-known)/")
BAD_PCT_RE = re.compile(r"%(?![0-9A-Fa-f]{2})")
_LANG_PREFIXES = "|".join(re.escape(lang) for lang in LANGS)
LANG_PREFIX_RE = re.compile(rf"^/({_LANG_PREFIXES})(/.*)?$")
BOT_UA_RE = re.compile(
    r"bot|crawl|spider|curl|python|scan|go-http|java|okhttp", re.IGNORECASE
)


# ────────────────── path normalization ──────────────────


def normalize_path(path):
    """Strip trailing slash (keep leading), collapse falsy → '/'."""
    if not path:
        return "/"
    p = path if path.startswith("/") else f"/{path}"
    if len(p) > 1 and p.endswith("/"):
        p = p[:-1]
    return p


def unquote_path(raw_path):
    """Percent-decode + NFC-normalize a CF clientRequestPath.

    errors='replace' never raises — invalid UTF-8 byte sequences become
    U+FFFD, which is how we detect bad-encoding downstream.
    """
    decoded = urllib.parse.unquote(raw_path, errors="replace")
    return unicodedata.normalize("NFC", decoded)


def is_bad_encoding(raw_path):
    """CF's placeholder for a client that sent an invalid percent-encoded
    path — not our bug. Detect via: malformed %XX escapes, raw control
    chars, or a decode that produces the U+FFFD replacement character."""
    if BAD_PCT_RE.search(raw_path):
        return True
    if any(ord(c) < 32 for c in raw_path):
        return True
    if "�" in urllib.parse.unquote(raw_path, errors="replace"):
        return True
    # CF 對壞編碼請求的字面正規化佔位符（2026-07-17 root-cause 平反：這不是
    # 站上模板 bug，是儀器自己的佔位符）。它是合法 percent-encoding、decode
    # 乾淨，所以上面三條都抓不到，三個月來每天以 unknown 家族黃燈誤報。
    if "<strange-chars>" in urllib.parse.unquote(raw_path, errors="replace"):
        return True
    return False


def classify_ua(ua):
    if not ua:
        return "empty"
    if BOT_UA_RE.search(ua):
        return "bot"
    return "browser"


# ────────────────── route table (a) + registry (b) ──────────────────


def build_route_table():
    """Scan knowledge/{Category}/*.md (zh) + knowledge/{lang}/{Category}/*.md
    for every enabled language. Returns:
        routes            — set of normalized route strings that really exist
        lang_cat_slugs    — {(lang, catSlug): {slug, ...}}  (lang='zh' for zh)
        cat_slug_langs    — {(catSlug, slug): {lang, ...}}  (lang='zh' for zh)
    """
    routes = set()
    lang_cat_slugs = defaultdict(set)
    cat_slug_langs = defaultdict(set)

    def scan_dir(base_dir, lang, cat_slug):
        try:
            entries = sorted(base_dir.iterdir())
        except FileNotFoundError:
            return
        for f in entries:
            if not f.is_file():
                continue
            if not f.name.endswith(".md") or f.name.startswith("_"):
                continue
            slug = unicodedata.normalize("NFC", f.name[:-3])
            route = f"/{cat_slug}/{slug}" if lang == "zh" else f"/{lang}/{cat_slug}/{slug}"
            routes.add(normalize_path(route))
            lang_cat_slugs[(lang, cat_slug)].add(slug)
            cat_slug_langs[(cat_slug, slug)].add(lang)

    for folder, cat_slug in CATEGORY_FOLDER_TO_SLUG.items():
        scan_dir(KNOWLEDGE_DIR / folder, "zh", cat_slug)
        for lang in LANGS:
            scan_dir(KNOWLEDGE_DIR / lang / folder, lang, cat_slug)

    return routes, lang_cat_slugs, cat_slug_langs


def load_registry():
    """public/api/lang-switch-map.json → {lang: {toZh, fromZh}}.
    Missing/unparseable file → {} (all registry-dependent suggests become
    None downstream — never crash)."""
    if not LANG_SWITCH_MAP_PATH.exists():
        return {}
    try:
        data = json.loads(LANG_SWITCH_MAP_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}
    return data.get("registry", {}) or {}


# ────────────────── classification ──────────────────


def classify(raw_path, routes, lang_cat_slugs, cat_slug_langs, registry):
    """Returns (family, suggest)."""
    bad_enc = is_bad_encoding(raw_path)
    norm = normalize_path(unquote_path(raw_path))

    # 1. phantom — CF says 404 but the route table says this page exists
    if norm in routes:
        return "phantom", None

    m = LANG_PREFIX_RE.match(norm)
    req_lang = m.group(1) if m else None
    rest = None

    if req_lang:
        rest = norm[len(f"/{req_lang}"):] or "/"
        from_zh = (registry.get(req_lang) or {}).get("fromZh") or {}

        # 2a. zh-slug under a lang prefix — rest IS the zh URL. This is the
        # single biggest dead class the old hreflang bug published
        # (/en/history/台灣眷村歷史); fromZh gives this lang's real URL.
        real_url = from_zh.get(rest)
        if real_url:
            return "slug-variant", real_url
        # rest is a real zh route but this lang has no translation → the
        # reader asked for a language that doesn't exist yet.
        if rest in routes:
            has_langs = ["zh"] + sorted(
                l
                for l in LANGS
                if l != req_lang
                and ((registry.get(l) or {}).get("fromZh") or {}).get(rest)
            )
            return "untranslated-demand", has_langs

        # 2b. slug-variant — a different lang's toZh resolves this same
        # rest-path to a zh article; look up what THIS lang's real URL
        # for that zh article is via fromZh (already fetched above).
        for other in LANGS:
            if other == req_lang:
                continue
            to_zh = (registry.get(other) or {}).get("toZh") or {}
            zh_url = to_zh.get(f"/{other}{rest}")
            if zh_url:
                real_url = from_zh.get(zh_url)
                if real_url:
                    return "slug-variant", real_url
    else:
        # 3. cross-lang-slug — no lang prefix, but prefixing one resolves
        # via registry (reader/bot dropped the /en/ etc. prefix)
        for other in LANGS:
            to_zh = (registry.get(other) or {}).get("toZh") or {}
            zh_url = to_zh.get(f"/{other}{norm}")
            if zh_url:
                return "cross-lang-slug", zh_url

    path_for_parts = rest if req_lang else norm
    parts = path_for_parts.strip("/").split("/")
    this_lang = req_lang or "zh"

    if len(parts) == 2:
        cat_slug, slug = parts

        # 4. untranslated-demand — same (catSlug, slug) literally exists as
        # a real route under other language(s) → translation-priority signal
        other_langs = sorted(
            l for l in cat_slug_langs.get((cat_slug, slug), set()) if l != this_lang
        )
        if other_langs:
            return "untranslated-demand", other_langs

        # 5. renamed-or-truncated — high-overlap slug exists in same
        # lang+category (avoid false positives on short strings: overlap
        # ratio ≥ 60% AND shorter side ≥ 3 chars)
        best, best_ratio = None, 0.0
        for cand in lang_cat_slugs.get((this_lang, cat_slug), set()):
            if cand == slug:
                continue
            if cand.startswith(slug) or slug.startswith(cand):
                shorter, longer = sorted((len(cand), len(slug)))
                if longer == 0 or shorter < 3:
                    continue
                ratio = shorter / longer
                if ratio >= 0.6 and ratio > best_ratio:
                    best_ratio, best = ratio, cand
        if best:
            suggest = (
                f"/{cat_slug}/{best}"
                if this_lang == "zh"
                else f"/{this_lang}/{cat_slug}/{best}"
            )
            return "renamed-or-truncated", suggest

    # 6. scanner — malicious probe fingerprints
    if SCANNER_RE.search(norm):
        return "scanner", None

    # 7. asset / extension / encoding buckets
    if STALE_ASSET_RE.match(norm):
        return "stale-asset", None
    if MISSING_ASSET_RE.match(norm):
        return "missing-asset", None
    if MD_EXT_RE.search(norm):
        return "md-extension", None
    if bad_enc:
        return "bad-encoding", None

    # 8. well-known probes
    if WELLKNOWN_RE.match(norm):
        return "probe-wellknown", None

    # 9. unknown — needs a human
    return "unknown", None


# ────────────────── CF query (free tier: 1-day window per query) ──────────────────


def query_404_day(token, zone_tag, day_start, day_end):
    query = """
    query FourOhFourDay($zoneTag: String!, $start: Time!, $end: Time!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequestsAdaptiveGroups(
            filter: {
              datetime_geq: $start,
              datetime_leq: $end,
              edgeResponseStatus: 404
            }
            limit: 10000
            orderBy: [count_DESC]
          ) {
            count
            dimensions {
              clientRequestPath
              userAgent
            }
          }
        }
      }
    }
    """
    variables = {
        "zoneTag": zone_tag,
        "start": day_start.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "end": day_end.strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    data, err = fc._cf_graphql_soft(token, query, variables)
    if err:
        return None, err
    zones = data.get("viewer", {}).get("zones", []) or []
    rows = zones[0].get("httpRequestsAdaptiveGroups", []) if zones else []
    return rows, None


def fetch_days(token, zone_tag, days):
    """Loop N daily 1-day-window queries (free tier limit).
    Returns list of (date_str, rows, truncated) ordered most-recent-first."""
    now = datetime.now(timezone.utc)
    out = []
    for offset in range(days):
        day_end = now - timedelta(days=offset)
        day_start = day_end - timedelta(days=1)
        date_str = day_start.date().isoformat()
        rows, err = query_404_day(token, zone_tag, day_start, day_end)
        if err:
            print(f"⚠️  {date_str}: CF query failed — {err[:200]}", file=sys.stderr)
            out.append((date_str, [], False))
            continue
        truncated = len(rows) >= CF_ROW_LIMIT
        out.append((date_str, rows, truncated))
    return out


# ────────────────── per-day processing ──────────────────


def compute_alerts(date_str, families, top_paths):
    """黃燈哲學：WARN 不 HARD。"""
    alerts = []

    resolvable_total = sum(
        families.get(f, {}).get("count", 0) for f in RESOLVABLE_FAMILIES
    )
    if resolvable_total > 3000:
        alerts.append(
            {
                "id": f"cf-404-resolvable-{date_str}",
                "severity": "yellow",
                "message": (
                    f"{date_str} 可解析 404（slug-variant+cross-lang-slug+"
                    f"untranslated-demand+renamed-or-truncated）共 {resolvable_total:,} "
                    "> 3000/day"
                ),
            }
        )

    for p in top_paths:
        if p["family"] == "unknown" and p["hits"] > 100:
            h = hashlib.md5(p["path"].encode("utf-8")).hexdigest()[:8]
            alerts.append(
                {
                    "id": f"cf-404-unknown-path-{date_str}-{h}",
                    "severity": "yellow",
                    "message": (
                        f"{date_str} unknown family 單一路徑 {p['path']!r} "
                        f"命中 {p['hits']:,} > 100/day"
                    ),
                }
            )

    phantom_count = families.get("phantom", {}).get("count", 0)
    if phantom_count > 50:
        alerts.append(
            {
                "id": f"cf-404-phantom-{date_str}",
                "severity": "yellow",
                "message": (
                    f"{date_str} phantom（CF 說 404 但 route 表裡頁面存在）"
                    f"{phantom_count:,} > 50/day — 異常，需要單獨查"
                ),
            }
        )

    return alerts


def process_day(date_str, rows, truncated, routes, lang_cat_slugs, cat_slug_langs, registry):
    families = defaultdict(lambda: {"count": 0, "bot": 0, "browser": 0, "empty": 0})
    path_agg = {}
    total_404 = 0

    for row in rows:
        dims = row.get("dimensions", {}) or {}
        path = dims.get("clientRequestPath", "") or ""
        ua = dims.get("userAgent", "") or ""
        count = int(row.get("count", 0) or 0)
        total_404 += count

        family, suggest = classify(path, routes, lang_cat_slugs, cat_slug_langs, registry)
        ua_class = classify_ua(ua)

        fam = families[family]
        fam["count"] += count
        fam[ua_class] += count

        agg = path_agg.setdefault(
            path, {"hits": 0, "family": family, "suggest": suggest, "ua_counts": {}}
        )
        agg["hits"] += count
        agg["ua_counts"][ua] = agg["ua_counts"].get(ua, 0) + count

    top_paths = []
    for path, agg in sorted(
        path_agg.items(), key=lambda kv: kv[1]["hits"], reverse=True
    )[:TOP_PATHS_LIMIT]:
        top_ua = (
            max(agg["ua_counts"].items(), key=lambda kv: kv[1])[0]
            if agg["ua_counts"]
            else ""
        )
        top_paths.append(
            {
                "path": path,
                "hits": agg["hits"],
                "family": agg["family"],
                "ua": top_ua[:160],
                "suggest": agg["suggest"],
            }
        )

    families_out = {name: dict(v) for name, v in families.items()}
    alerts = compute_alerts(date_str, families_out, top_paths)

    return {
        "date": date_str,
        "total_404": total_404,
        "truncated": truncated,
        "families": families_out,
        "top_paths": top_paths,
        "alerts": alerts,
    }


# ────────────────── state.json (rolling) ──────────────────


def load_state():
    if STATE_PATH.exists():
        try:
            data = json.loads(STATE_PATH.read_text(encoding="utf-8"))
            if isinstance(data, dict) and isinstance(data.get("days"), list):
                return data
        except (json.JSONDecodeError, OSError):
            pass
    return {"days": [], "updated": None}


def upsert_state(state, day_result):
    slim = {
        "date": day_result["date"],
        "total_404": day_result["total_404"],
        "truncated": day_result["truncated"],
        "families": day_result["families"],
    }
    days = [d for d in state.get("days", []) if d.get("date") != slim["date"]]
    days.append(slim)
    days.sort(key=lambda d: d["date"])
    if len(days) > MAX_STATE_DAYS:
        days = days[-MAX_STATE_DAYS:]
    state["days"] = days
    state["updated"] = datetime.now(timezone.utc).isoformat()
    return state


# ────────────────── stdout summary ──────────────────


def print_summary(day_results):
    for day in day_results:
        print(f"\n{'=' * 78}")
        trunc_flag = " ⚠️  TRUNCATED (10000-row CF cap hit)" if day["truncated"] else ""
        print(f"📅 {day['date']} — total 404: {day['total_404']:,}{trunc_flag}")
        print(f"{'=' * 78}")

        fam_sorted = sorted(
            day["families"].items(), key=lambda kv: kv[1]["count"], reverse=True
        )
        if not fam_sorted:
            print("  (no 404 rows this day)")
            continue

        rep_by_family = {}
        for p in day["top_paths"]:
            rep_by_family.setdefault(p["family"], p["path"])

        print(
            f"  {'family':<22}{'count':>9}{'bot':>9}{'browser':>9}{'empty':>9}  representative path"
        )
        print("  " + "-" * 96)
        for name, stats in fam_sorted:
            rep = rep_by_family.get(name, "")
            rep_disp = rep if len(rep) <= 40 else rep[:37] + "..."
            print(
                f"  {name:<22}{stats['count']:>9,}{stats['bot']:>9,}"
                f"{stats['browser']:>9,}{stats['empty']:>9,}  {rep_disp}"
            )

        if day["alerts"]:
            print("\n  🚨 alerts:")
            for a in day["alerts"]:
                print(f"    [{a['severity']}] {a['message']}")
        else:
            print("\n  ✅ no alerts")


# ────────────────── main ──────────────────


def main():
    parser = argparse.ArgumentParser(
        description="全流量 404 常駐監測（resolution-based 分類）"
    )
    parser.add_argument(
        "--days", type=int, default=1, help="回看天數，free tier 逐日查（預設 1）"
    )
    args = parser.parse_args()

    env = fc.load_env()
    token = env.get("CF_API_TOKEN", "").strip()
    zone_tag = env.get("CF_ZONE_ID", "").strip()
    if not token or not zone_tag:
        fc.fail("CF_API_TOKEN or CF_ZONE_ID missing")

    print("🧭 building route table from knowledge/...", file=sys.stderr)
    routes, lang_cat_slugs, cat_slug_langs = build_route_table()
    print(f"   {len(routes):,} routes indexed", file=sys.stderr)

    registry = load_registry()
    if not registry:
        print(
            "⚠️  lang-switch-map.json missing/unreadable — "
            "slug-variant/cross-lang-slug suggests 全部 null",
            file=sys.stderr,
        )

    print(f"📡 querying CF 404s ({args.days}d, one query per day)...", file=sys.stderr)
    day_batches = fetch_days(token, zone_tag, args.days)

    state = load_state()
    day_results = []
    for date_str, rows, truncated in day_batches:
        print(f"   {date_str}: {len(rows):,} (path, UA) rows", file=sys.stderr)
        result = process_day(
            date_str, rows, truncated, routes, lang_cat_slugs, cat_slug_langs, registry
        )
        day_results.append(result)
        state = upsert_state(state, result)
        if truncated:
            print(
                f"⚠️  {date_str}: hit CF's 10000-row cap — truncated=true "
                "(long tail dropped by API, not by us)",
                file=sys.stderr,
            )

    STATE_DIR.mkdir(parents=True, exist_ok=True)
    STATE_PATH.write_text(
        json.dumps(state, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    latest = (
        day_results[0]
        if day_results
        else {
            "date": datetime.now(timezone.utc).date().isoformat(),
            "total_404": 0,
            "truncated": False,
            "families": {},
            "top_paths": [],
            "alerts": [],
        }
    )
    LATEST_PATH.write_text(
        json.dumps(latest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    print_summary(day_results)

    print(f"\n✅ → {STATE_PATH}", file=sys.stderr)
    print(f"✅ → {LATEST_PATH}", file=sys.stderr)


if __name__ == "__main__":
    main()
