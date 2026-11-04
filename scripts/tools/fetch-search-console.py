#!/usr/bin/env python3
"""
fetch-search-console.py — 抓 Google Search Console 資料

用法:
    python3 scripts/tools/fetch-search-console.py [--days 28]

憑證:
    跟 fetch-ga4.py 共用 ~/.config/taiwan-md/credentials/google-service-account.json
    需要把 service account email 加到 Search Console 的使用者權限（Restricted 即可）

Site URL:
    ~/.config/taiwan-md/credentials/.env 裡的 SC_SITE_URL
    格式: 'sc-domain:taiwan.md' (Domain property)
    或    'https://taiwan.md/' (URL prefix property)

輸出:
    ~/.config/taiwan-md/cache/search-console-latest.json
    ~/.config/taiwan-md/cache/search-console-{YYYY-MM-DD}.json

    queries / pages 用 startRow 分頁抓到底（--max-query-rows / --max-page-rows 上限）；
    pages 不含 #錨點網址，錨點按原頁面加總在 pages_anchor_rollup、佔比在
    pages_anchor_stats；last_day 是最後一天的總數與查詢（給 dashboard 24h 區塊）。

依賴:
    google-api-python-client
    google-auth
    (跟 fetch-ga4.py 共用 venv)

來源: 2026-04-11 session α
"""
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

CONFIG_DIR = Path.home() / ".config" / "taiwan-md"
CREDENTIALS_DIR = CONFIG_DIR / "credentials"
CACHE_DIR = CONFIG_DIR / "cache"
VENV_DIR = CONFIG_DIR / "venv"
ENV_FILE = CREDENTIALS_DIR / ".env"
SERVICE_ACCOUNT_FILE = CREDENTIALS_DIR / "google-service-account.json"
SETUP_GUIDE = "docs/pipelines/SENSE-FETCHER-SETUP.md"


def load_env():
    env = dict(os.environ)
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                k, _, v = line.partition("=")
                env[k.strip()] = v.strip().strip("'\"")
    return env


def fail(msg, code=1):
    print(f"❌ {msg}", file=sys.stderr)
    print(f"   Setup guide: {SETUP_GUIDE}", file=sys.stderr)
    sys.exit(code)


def reexec_in_venv():
    """Re-exec into the venv if available. See fetch-ga4.py for rationale."""
    venv_python = VENV_DIR / "bin" / "python3"
    if not venv_python.exists():
        return
    in_venv = sys.prefix != sys.base_prefix
    if in_venv and Path(sys.prefix).resolve() == VENV_DIR.resolve():
        return
    os.execv(str(venv_python), [str(venv_python), *sys.argv])


def query_sc(service, site_url, dimensions, start_date, end_date, row_limit=500, start_row=0):
    """Query Search Console Search Analytics API.

    dataState="all" includes fresh (not-yet-finalized) data so we match what
    the GSC UI displays. Without it, zero-click high-impression queries from
    the last 1-2 days silently drop out of the result set. (2026-04-20 fix —
    dashboard showed 2,458 imp while GSC UI showed 2,747 for the same 7-day
    window, and high-impression queries like 鄧麗君 / taipei population were
    missing from the cache.)
    """
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": dimensions,
        "rowLimit": row_limit,
        "dataState": "all",
    }
    if start_row:
        body["startRow"] = start_row
    return (
        service.searchanalytics()
        .query(siteUrl=site_url, body=body)
        .execute()
    )


# Search Analytics API 一次最多回 25,000 列；要更多就用 startRow 往下翻。
SC_PAGE_SIZE = 25000


def paginate_rows(fetch_page, max_rows, page_size=SC_PAGE_SIZE):
    """Collect rows across startRow pages until the API runs out or max_rows is hit.

    fetch_page(start_row, row_limit) -> list of row dicts. max_rows <= 0 means
    no cap. Returns (rows, truncated): truncated is True when we stopped
    because of max_rows while the API still had a full page to give.

    2026-11-04 evolve: queries used to be a single rowLimit=2000 call, so the
    cache only ever saw the clicked head of the list (query-dim coverage 18.1%
    vs 47.4% with every page fetched). Pages had the same ceiling at 1000.
    """
    rows = []
    start = 0
    while True:
        limit = page_size
        if max_rows > 0:
            limit = min(page_size, max_rows - len(rows))
            if limit <= 0:
                return rows, True
        batch = fetch_page(start, limit) or []
        rows.extend(batch)
        if len(batch) < limit:
            return rows, False
        if max_rows > 0 and len(rows) >= max_rows:
            return rows, True
        start += len(batch)


def split_anchor_pages(rows):
    """Separate #fragment URLs from real pages.

    Google reports every jump link it shows under a result ("…/雪山隧道/#某節")
    as its own page row. Counting them next to the page double-counts one SERP
    result's impressions and drags its CTR down (雪山隧道: 12,078 imp / 1.03%
    alone, 44,690 / 0.28% with its anchors). On 2026-11-04 anchors were 11.1%
    of page impressions across 2,659 URLs.

    Returns (pages, anchor_rollup, anchor_stats):
      pages          rows whose URL has no '#', order preserved
      anchor_rollup  one row per base URL: anchor URL count + summed clicks /
                     impressions + impression-weighted position, by impressions
      anchor_stats   totals for the anchor share
    """
    pages, groups = [], {}
    for r in rows:
        url = (r.get("keys") or [""])[0]
        if "#" not in url:
            pages.append(r)
            continue
        base = url.split("#", 1)[0]
        g = groups.setdefault(base, {"page": base, "anchor_urls": 0, "clicks": 0,
                                     "impressions": 0, "_pos_weight": 0.0})
        imp = r.get("impressions", 0) or 0
        g["anchor_urls"] += 1
        g["clicks"] += r.get("clicks", 0) or 0
        g["impressions"] += imp
        g["_pos_weight"] += (r.get("position", 0) or 0) * imp
    rollup = []
    for g in groups.values():
        weight = g.pop("_pos_weight")
        g["position"] = round(weight / g["impressions"], 2) if g["impressions"] else 0
        rollup.append(g)
    rollup.sort(key=lambda g: (-g["impressions"], g["page"]))
    anchor_imp = sum(g["impressions"] for g in rollup)
    all_imp = anchor_imp + sum((r.get("impressions", 0) or 0) for r in pages)
    stats = {
        "anchor_urls": sum(g["anchor_urls"] for g in rollup),
        "anchor_pages": len(rollup),
        "anchor_clicks": sum(g["clicks"] for g in rollup),
        "anchor_impressions": anchor_imp,
        "anchor_share_pct": round(anchor_imp / all_imp * 100, 1) if all_imp else 0,
    }
    return pages, rollup, stats


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Fetch Search Console data")
    parser.add_argument("--days", type=int, default=28, help="How many days back (end today - 3 to account for SC lag)")
    parser.add_argument("--max-query-rows", type=int, default=100000,
                        help="Cap on query rows fetched across startRow pages (0 = no cap)")
    parser.add_argument("--max-page-rows", type=int, default=50000,
                        help="Cap on page rows fetched across startRow pages (0 = no cap)")
    args = parser.parse_args()

    reexec_in_venv()

    try:
        from googleapiclient.discovery import build
        from google.oauth2 import service_account
    except ImportError as e:
        fail(
            f"Missing Python library: {e.name}\n"
            f"   Install with:\n"
            f"     python3 -m venv {VENV_DIR}\n"
            f"     {VENV_DIR}/bin/pip install google-api-python-client google-auth\n"
            f"   See {SETUP_GUIDE}"
        )

    env = load_env()
    site_url = env.get("SC_SITE_URL", "").strip()
    if not site_url:
        fail(
            f"SC_SITE_URL not set in {ENV_FILE}\n"
            f"   Example: SC_SITE_URL='sc-domain:taiwan.md'\n"
            f"   or: SC_SITE_URL='https://taiwan.md/'"
        )

    cred_path = env.get("GOOGLE_APPLICATION_CREDENTIALS", "").strip()
    if cred_path:
        cred_path = Path(cred_path).expanduser()
    elif SERVICE_ACCOUNT_FILE.exists():
        cred_path = SERVICE_ACCOUNT_FILE
    else:
        fail(f"Google service account key not found at {SERVICE_ACCOUNT_FILE}")

    if cred_path.resolve().is_relative_to(Path.cwd().resolve()):
        fail(f"SECURITY: service account key {cred_path} is inside the repo!")

    credentials = service_account.Credentials.from_service_account_file(
        str(cred_path),
        scopes=["https://www.googleapis.com/auth/webmasters.readonly"],
    )

    service = build("searchconsole", "v1", credentials=credentials, cache_discovery=False)

    # GSC UI typically publishes data with a 2-day lag, so end on "today - 2
    # days". Previously the lag was 3 days, which made the dashboard window
    # trail GSC's own chart by a full day and skipped the freshest data point.
    # args.days is the window size (7 = one week inclusive), so start = end -
    # (N-1) gives exactly N calendar days inclusive.
    end_date = (datetime.now() - timedelta(days=2)).strftime("%Y-%m-%d")
    start_date = (datetime.now() - timedelta(days=args.days + 1)).strftime("%Y-%m-%d")

    print(f"🔎 Fetching Search Console ({site_url}, {start_date} → {end_date})...", file=sys.stderr)

    try:
        # Site totals — queried without dimensions. SC's privacy filters drop
        # anonymized queries from query-dimensioned rows, so summing the
        # queries list under-reports site totals by ~90% (observed 2,747 vs
        # real 38,080 for 7d, 2026-04-20). Only a dimension-less query gives
        # the numbers you see in the GSC UI header.
        totals_raw = query_sc(service, site_url, [], start_date, end_date, row_limit=1)
        countries = query_sc(service, site_url, ["country"], start_date, end_date, row_limit=100)
        # SC API sorts rows by clicks DESC, then impressions — so zero-click
        # but high-impression queries (e.g. 鄧麗君 478 imp / 0 clicks) land
        # after ALL clicked rows. A single call caps at 25,000 rows, so page
        # through with startRow until the API runs dry (or the --max-*-rows
        # cap). 2026-11-04: the old fixed rowLimit=2000 / 1000 hid most of
        # the tail.
        def pager(dims):
            return lambda start, limit: query_sc(
                service, site_url, dims, start_date, end_date,
                row_limit=limit, start_row=start,
            ).get("rows", [])

        query_rows, queries_truncated = paginate_rows(pager(["query"]), args.max_query_rows)
        page_rows, pages_truncated = paginate_rows(pager(["page"]), args.max_page_rows)
        queries = {"rows": query_rows}
        pages = {"rows": page_rows}
        devices = query_sc(service, site_url, ["device"], start_date, end_date, row_limit=10)
        # Latest single day (= end_date). Feeds dashboard searchConsole24h,
        # which had no producer after 2026-04-11 and kept a hand-written
        # "2026-04-09 (24h)" label for seven months.
        last_day_totals = query_sc(service, site_url, [], end_date, end_date, row_limit=1)
        last_day_queries = query_sc(service, site_url, ["query"], end_date, end_date, row_limit=1000)
    except Exception as e:
        fail(f"Search Console API error: {type(e).__name__}: {e}")

    def simplify(rows):
        return [
            {
                "keys": r.get("keys", []),
                "clicks": r.get("clicks", 0),
                "impressions": r.get("impressions", 0),
                "ctr": round(r.get("ctr", 0), 4),
                "position": round(r.get("position", 0), 2),
            }
            for r in rows.get("rows", [])
        ]

    totals_row = (totals_raw.get("rows") or [{}])[0]
    total_clicks = totals_row.get("clicks", 0)
    total_impressions = totals_row.get("impressions", 0)
    total_position = totals_row.get("position", 0)
    # Kept for debugging the query-dim vs site-total gap.
    query_sum_clicks = sum(r.get("clicks", 0) for r in queries.get("rows", []))
    query_sum_impressions = sum(r.get("impressions", 0) for r in queries.get("rows", []))

    output = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "site_url": site_url,
        "period": {"start": start_date, "end": end_date, "days": args.days},
        "totals": {
            "clicks": total_clicks,
            "impressions": total_impressions,
            "ctr": round(total_clicks / total_impressions, 4) if total_impressions else 0,
            "position": round(total_position, 2),
            # How much of the site totals is covered by the named queries we
            # can see (the rest is anonymized by SC privacy filters).
            "query_dim_clicks": query_sum_clicks,
            "query_dim_impressions": query_sum_impressions,
            "query_dim_coverage_pct": (
                round(query_sum_impressions / total_impressions * 100, 1)
                if total_impressions else 0
            ),
        },
        "countries": simplify(countries),
        "queries": simplify(queries),
        "pages": [],  # filled below: #anchor URLs split out
        "devices": simplify(devices),
        "fetch_limits": {
            "query_rows": len(query_rows),
            "query_rows_truncated": queries_truncated,
            "max_query_rows": args.max_query_rows,
            "page_rows": len(page_rows),
            "page_rows_truncated": pages_truncated,
            "max_page_rows": args.max_page_rows,
        },
    }

    # 2026-11-04 evolve：#錨點網址（Google 在結果下方秀的 H2 跳轉連結）不算獨立頁面。
    # pages 只留真頁面；錨點另存一份按原頁面加總的彙總，佔比寫進 anchor_stats。
    real_pages, anchor_rollup, anchor_stats = split_anchor_pages(simplify(pages))
    output["pages"] = real_pages
    output["pages_anchor_rollup"] = anchor_rollup
    output["pages_anchor_stats"] = anchor_stats

    ld_row = (last_day_totals.get("rows") or [{}])[0]
    ld_clicks = ld_row.get("clicks", 0)
    ld_imp = ld_row.get("impressions", 0)
    output["last_day"] = {
        "date": end_date,
        "totals": {
            "clicks": ld_clicks,
            "impressions": ld_imp,
            "ctr": round(ld_clicks / ld_imp, 4) if ld_imp else 0,
            "position": round(ld_row.get("position", 0), 2),
        },
        "queries": simplify(last_day_queries),
    }

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    # 2026-04-24 β3: 404 偵測常態化
    # 抽 SC pages 對照 dist/sitemap-0.xml URL set，找出可能是 404 的 URL
    # （Google 嘗試 crawl 但 site 已不存在的頁面仍會在 SC pages dim 中出現）
    site_url_set = set()
    sitemap_path = Path.cwd() / "dist" / "sitemap-0.xml"
    if sitemap_path.exists():
        try:
            sitemap_xml = sitemap_path.read_text()
            # 抽所有 <loc>...</loc> 內的 URL
            import re
            loc_urls = re.findall(r"<loc>(https://taiwan\.md[^<]+)</loc>", sitemap_xml)
            for u in loc_urls:
                # Normalize: strip query string, trailing punctuation
                clean = u.split("?")[0].rstrip("/")
                site_url_set.add(clean)
                site_url_set.add(clean + "/")
            # 抽 hreflang alternate URLs（這些也是 site claims to have）
            href_urls = re.findall(
                r'<xhtml:link[^>]+href="(https://taiwan\.md[^"]+)"', sitemap_xml
            )
            for u in href_urls:
                clean = u.split("?")[0].rstrip("/")
                site_url_set.add(clean)
                site_url_set.add(clean + "/")
        except Exception as e:
            print(f"⚠️  Sitemap 解析失敗: {e}", file=sys.stderr)

    potential_404 = []
    if site_url_set:
        for p in output["pages"]:
            page_url = p["keys"][0]
            clean = page_url.split("?")[0].rstrip("/")
            if clean not in site_url_set and clean + "/" not in site_url_set:
                potential_404.append({
                    "url": page_url,
                    "impressions": p["impressions"],
                    "clicks": p["clicks"],
                    "position": p["position"],
                })
        # Sort by impressions desc — biggest 404 leak first
        potential_404.sort(key=lambda x: -x["impressions"])

    # 統計各語言 404 分佈（從 URL prefix 推 lang）
    lang_404_count = {}
    for p in potential_404:
        url = p["url"]
        if "/en/" in url:
            lang = "en"
        elif "/ja/" in url:
            lang = "ja"
        elif "/ko/" in url:
            lang = "ko"
        elif "/fr/" in url:
            lang = "fr"
        elif "/es/" in url:
            lang = "es"
        else:
            lang = "zh-TW"
        lang_404_count[lang] = lang_404_count.get(lang, 0) + 1

    output["potential_404"] = {
        "total": len(potential_404),
        "by_lang": lang_404_count,
        "top_50": potential_404[:50],
        "_note": (
            "URLs 出現在 SC impressions 但不在 sitemap 內 = "
            "Google 仍嘗試 crawl 已不存在的頁面。修法：加 redirect 或讓 sitemap 重新 indexable。"
        ),
    }

    latest_path = CACHE_DIR / "search-console-latest.json"
    dated_path = CACHE_DIR / f"search-console-{datetime.now().strftime('%Y-%m-%d')}.json"
    latest_path.write_text(json.dumps(output, indent=2, ensure_ascii=False))
    dated_path.write_text(json.dumps(output, indent=2, ensure_ascii=False))

    print(f"✅ SC: {total_clicks:,} clicks / {total_impressions:,} impressions ({args.days}d)", file=sys.stderr)
    print(
        f"   rows: {len(query_rows):,} queries{' (capped)' if queries_truncated else ''}, "
        f"{len(real_pages):,} pages + {anchor_stats['anchor_urls']:,} #anchor URLs "
        f"({anchor_stats['anchor_share_pct']}% of page impressions, rolled up separately)",
        file=sys.stderr,
    )
    if site_url_set:
        print(
            f"🔍 SC 404 偵測: {len(potential_404)} 個 SC URLs 不在 sitemap "
            f"({sum(p['impressions'] for p in potential_404):,} impressions 流失)",
            file=sys.stderr,
        )
        if lang_404_count:
            for lang, cnt in sorted(lang_404_count.items(), key=lambda x: -x[1]):
                print(f"   {lang}: {cnt}", file=sys.stderr)
    else:
        print(f"⚠️  Sitemap 不存在或解析失敗，跳過 404 偵測", file=sys.stderr)
    print(f"   → {latest_path}", file=sys.stderr)

    # Find high-impression, low-CTR opportunities (Bamboo Drum metric)
    opportunities = [
        p
        for p in output["pages"]
        if p["impressions"] >= 20 and p["clicks"] == 0 and p["position"] <= 10
    ][:10]

    print(json.dumps({
        "source": "search-console",
        "period_days": args.days,
        "total_clicks": total_clicks,
        "total_impressions": total_impressions,
        "total_ctr_pct": round(total_clicks / total_impressions * 100, 2) if total_impressions else 0,
        "top_5_countries": [
            {
                "country": c["keys"][0],
                "clicks": c["clicks"],
                "impressions": c["impressions"],
                "ctr": round(c["ctr"] * 100, 2),
            }
            for c in output["countries"][:5]
        ],
        "high_impr_zero_click_opportunities": [
            {"page": p["keys"][0], "impressions": p["impressions"], "rank": p["position"]}
            for p in opportunities
        ],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
