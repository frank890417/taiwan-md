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
# 每個家族至少保障進 top_paths 的條數（2026-09-28 maintainer-am 新增）。
# 純全域 top-N 是「最吵的」排序，而下游 generate-redirects.mjs 要的是「修得掉的」：
# 它只認 slug-variant / cross-lang-slug / renamed-or-truncated 三族且 suggest 非空。
# 一支被改名的文章，它的舊網址典型只有 1-2 次命中，於是永遠擠不進全域榜。
# 實測 2026-09-28 latest.json：全域 300 條的切線落在 2 hits，slug-variant 全家 84 hits
# 只有 5 hits／2 條進榜（漏 94%），renamed-or-truncated（12 hits）與 cross-lang-slug
# （1 hit）整族缺席——重導產生器看不到的正好是它唯一能修的那一段尾巴。
# 本值只「加進來」不排擠既有全域榜，下游拿到的是聯集（它自己會再按家族與 suggest 過濾）。
PER_FAMILY_LIMIT = 50
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
    "duplicated-lang-prefix",
}

SCANNER_RE = re.compile(
    r"\.env|\.php|/wp-|phpunit|/vendor/|cgi-bin|admin|backup|\.sql|\.git/|\.aws|\.ssh"
    r"|^/(contact|contact-us|about-us|contactus|index\.php)"
    # 2026-09-21 credential / config-file probing (was 55-66% of `unknown`
    # for four straight days: /.docker/secrets.json, /s3.secret, /.netrc,
    # /credentials.yml, /aws/config/s3.json, /inc/data/database.sdb, /login).
    # Root-level dotfiles are never a real route here; .well-known is a
    # separate family and is excluded explicitly.
    r"|^/\.(?!well-known/)|secret|credential|\.(key|pem|sdb)$|/aws/"
    r"|^/(login|config\.js|constants\.js|app-config\.json|appsettings[^/]*\.json)$"
    # 2026-09-23 framework / infra probing — 09-22 交接的條件（unknown 連兩夜過半
    # 且榜首換成探路檔名）當夜成立：unknown 2,252 佔 57%，榜首 /config.yml。
    # 這族是框架預設路徑與設定檔名（/configs/application.ini、/debug/vars、
    # /actuator/env/...、/v1/graphql、/telescope/requests、/docker-compose.yaml、
    # /id_rsa、/payment_gateways/stripe.yaml），不是任何一條站上路由。
    # 校準：對 public/api/articles.json 的 27,850 條真實路由字串 0 誤判，
    # 且不從其他家族搶件（per REFLEXES #66 用真實產出 dogfood、#99 尺先驗再用）。
    r"|^/(config|configs?/[^/]+|application|docker-compose[^/]*|composer\.(lock|json)"
    r"|package-lock\.json)\.(ya?ml|ini|json|js)$"
    r"|^/(phpinfo|server-info|server-status|debug/vars|id_rsa|node_modules(/.*)?"
    r"|telescope/requests|v1/graphql|graphql)$"
    r"|^/actuator(/|$)|^/api/(config|settings)$|^/configs?/|^/payment_gateways/"
    r"|^/aws-config\.js$|\.(zip|bak|tfvars|sql\.gz|tar\.gz)$|\.config\.js$"
    r"|^/(helm|charts?)/|^/app/etc/|^/ses\.json$|/values\.ya?ml$"
    # 2026-09-28 同一條件第二次成立：unknown 09-25 53%、09-26 50.4%，榜首
    # /rclone.conf。只收當夜有證據的名字（rclone 設定檔、.NET 錯誤頁、
    # Symfony profiler、Nuxt payload、主控台 API）。校準：articles.json
    # 59,922 條路由字串與 dist/ 49,526 條路徑 0 誤判。
    r"|^/(rclone\.conf|elmah\.axd|_profiler(/.*)?|settings/_payload\.json"
    r"|api/console(/.*)?)$",
    re.IGNORECASE,
)
STALE_ASSET_RE = re.compile(r"^/_astro/")
MISSING_ASSET_RE = re.compile(r"^/(assets|images|img|fonts)/")
MD_EXT_RE = re.compile(r"\.md$")
WELLKNOWN_RE = re.compile(r"^/(cdn-cgi|\.well-known)/")
BAD_PCT_RE = re.compile(r"%(?![0-9A-Fa-f]{2})")
_LANG_PREFIXES = "|".join(re.escape(lang) for lang in LANGS)
LANG_PREFIX_RE = re.compile(rf"^/({_LANG_PREFIXES})(/.*)?$")
# 2026-10-11 twmd-maintainer-daily：語言碼自己貼了兩次、中間沒有斜線
# （/enen/society/...、/arar/politics/...）。反向參照 \1 要求兩段literally
# 相同，所以 /enes/ 這種不同語言的相鄰不會命中——那是另一種病，沒有證據
# 說它存在，不先替它開家族。
DUP_LANG_PREFIX_RE = re.compile(rf"^/({_LANG_PREFIXES})\1(/.*)?$")
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
    # 2026-09-22 雙重編碼：UTF-8 位元組被當 Latin-1 讀、再 percent-encode 一次。
    # %C3%A5%C2%8F%C2%B0 decode 乾淨得到 'å\x8f°'，其實是「台」。上面四條都
    # 抓不到，09-20 /nature/ 下十來條各 4–8 筆全落 unknown。指紋：decode 後
    # 出現 Latin-1 補充區字元且 latin-1 → utf-8 回譯成功（單獨一個 é 回譯
    # 會失敗，不誤殺法／西文路徑）。
    decoded = urllib.parse.unquote(raw_path, errors="replace")
    if any(0x80 <= ord(c) <= 0xFF for c in decoded):
        try:
            decoded.encode("latin-1").decode("utf-8")
            return True
        except (UnicodeEncodeError, UnicodeDecodeError):
            pass
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

    # 1b. duplicated-lang-prefix — 語言碼貼了兩次（/enen/society/...）。拿掉
    # 一份就是這個語言自己的真實網址，所以修法是機械的 301，不需要判斷。
    # 排在 2 之前只是順序上的明確：`enen` 本來就不是語言碼，LANG_PREFIX_RE
    # 接不住它，v1 時它整族落在 unknown 裡（2026-10-09 實測 9 條 38 次全部
    # 如此）。suggest 只在「拿掉一份之後真的存在」時才給，不存在就留 None
    # ——家族講的是形狀，可修性是另一件事，混在一起下游會拿到死目標。
    dm = DUP_LANG_PREFIX_RE.match(norm)
    if dm:
        single = f"/{dm.group(1)}{dm.group(2) or ''}" or "/"
        to_zh = (registry.get(dm.group(1)) or {}).get("toZh") or {}
        if single in routes or single in to_zh or f"{single}/" in to_zh:
            return "duplicated-lang-prefix", single
        return "duplicated-lang-prefix", None

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
        # 家族名單從 RESOLVABLE_FAMILIES 現算，不手抄（2026-10-11）：手抄的
        # 那一份在新增家族時不會跟著改，於是警報本身是對的、它的說明文字
        # 卻少列一族——09-18 data-refresh 連兩夜把真警報讀成工具寫反，就是
        # 同一個形狀（儀器對機器誠實、對人撒小謊）。
        alerts.append(
            {
                "id": f"cf-404-resolvable-{date_str}",
                "severity": "yellow",
                "message": (
                    f"{date_str} 可解析 404（"
                    + "+".join(sorted(RESOLVABLE_FAMILIES))
                    + f"）共 {resolvable_total:,} > 3000/day"
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


def select_top_paths(path_agg):
    """把每路徑的聚合結果挑成 top_paths 清單。

    兩份名單取聯集：全域最吵的前 TOP_PATHS_LIMIT 條，加上每個家族自己的前
    PER_FAMILY_LIMIT 條。後者是給下游 generate-redirects.mjs 的保障——理由見
    PER_FAMILY_LIMIT 的註解（全域榜只排「最吵的」，重導要的是「修得掉的」，
    而修得掉的那一族典型每條只有 1-2 次命中，永遠擠不進全域榜）。

    輸出維持 hits 遞減排序（下游與報表都依賴），且路徑不重複。
    """
    ranked = sorted(path_agg.items(), key=lambda kv: kv[1]["hits"], reverse=True)
    selected = {path for path, _ in ranked[:TOP_PATHS_LIMIT]}
    per_family_count = {}
    for path, agg in ranked:  # 已按 hits 遞減，逐族取前 N 條
        fam = agg["family"]
        if per_family_count.get(fam, 0) >= PER_FAMILY_LIMIT:
            continue
        per_family_count[fam] = per_family_count.get(fam, 0) + 1
        selected.add(path)

    out = []
    for path, agg in ranked:
        if path not in selected:
            continue
        ua_counts = agg.get("ua_counts") or {}
        top_ua = max(ua_counts.items(), key=lambda kv: kv[1])[0] if ua_counts else ""
        out.append(
            {
                "path": path,
                "hits": agg["hits"],
                "family": agg["family"],
                "ua": top_ua[:160],
                "suggest": agg["suggest"],
            }
        )
    return out


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

    top_paths = select_top_paths(path_agg)

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


def upsert_state(state, day_result, force=False):
    """寫入一天的 slim 紀錄。回傳 (state, note)；note 非 None = 這天沒被覆蓋。

    2026-10-11 twmd-maintainer-daily：回頭重查舊日子會拿到**比較少**的資料。
    當天實測 2026-10-09 原本 5,505，兩天後重查 3,815，兩次 truncated 都是
    false——不是我們截斷，是 CF 那側對舊資料的保存顆粒變粗。原本這裡
    無條件覆蓋，於是一次重查就在趨勢序列上挖出一個 31% 的假低點，而且
    不留痕跡：下一個讀 60 天序列的人會把它讀成「404 改善了又變糟」。

    規則：既有那天的總數更高且它自己沒被截斷 → 保留既有，印一行說為什麼。
    `--force-requery` 可以明確要求覆蓋（例如確信舊紀錄本身是壞的）。
    """
    slim = {
        "date": day_result["date"],
        "total_404": day_result["total_404"],
        "truncated": day_result["truncated"],
        "families": day_result["families"],
    }
    existing = next(
        (d for d in state.get("days", []) if d.get("date") == slim["date"]), None
    )
    note = None
    if (
        existing
        and not force
        and not existing.get("truncated")
        and existing.get("total_404", 0) > slim["total_404"]
    ):
        note = (
            f"{slim['date']}: 保留既有紀錄 total={existing['total_404']:,}，"
            f"不用本次重查的 {slim['total_404']:,}（重查拿到的比較少 = CF 對舊日"
            "資料顆粒變粗，覆蓋會在趨勢上挖假低點）。要覆蓋請加 --force-requery"
        )
        return state, note

    days = [d for d in state.get("days", []) if d.get("date") != slim["date"]]
    days.append(slim)
    days.sort(key=lambda d: d["date"])
    if len(days) > MAX_STATE_DAYS:
        days = days[-MAX_STATE_DAYS:]
    state["days"] = days
    state["updated"] = datetime.now(timezone.utc).isoformat()
    return state, note


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
    parser.add_argument(
        "--force-requery",
        action="store_true",
        help="允許用本次讀數覆蓋既有那天的紀錄，即使本次拿到的總數比較少"
        "（預設拒絕，見 upsert_state 註解）",
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
        state, note = upsert_state(state, result, force=args.force_requery)
        if note:
            print(f"⚠️  {note}", file=sys.stderr)
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
