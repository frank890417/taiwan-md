#!/usr/bin/env python3
"""
fetch-cloudflare.py — 抓 Cloudflare Analytics 資料（Free tier 友善）

用法:
    python3 scripts/tools/fetch-cloudflare.py [--days 1]

憑證來源（優先序）:
    1. ~/.config/taiwan-md/credentials/.env 裡的 CF_API_TOKEN, CF_ZONE_ID
    2. 環境變數 CF_API_TOKEN, CF_ZONE_ID

Token 需要的權限:
    - Account → Account Analytics → Read
    - Zone → Analytics → Read  （內部名稱 account.zone.analytics.read）
    - Zone Resources: Specific zone = taiwan.md

輸出:
    ~/.config/taiwan-md/cache/cloudflare-latest.json
    ~/.config/taiwan-md/cache/cloudflare-{YYYY-MM-DD}.json

這個版本（v2, 2026-04-11）:
    - 改用 httpRequests1dGroups（Free tier 可用）
    - 不使用 botManagementVerifiedBot filter（Enterprise only）
    - 抓：總請求/獨立訪客/威脅/國家/status/browser 分佈
    - 純 Python stdlib，零依賴

來源: 2026-04-11 session α 建造
"""
import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime, timedelta, timezone
from pathlib import Path


# AI crawler user-agent patterns (substring match, case-insensitive). First
# match wins. Based on the vendors Cloudflare's AI Crawl Control dashboard
# tracks — covers the major crawler families.
AI_CRAWLER_PATTERNS = [
    # (friendly name,          regex,                    vendor)
    ("Amazonbot",              r"Amazonbot",             "Amazon"),
    ("PetalBot",               r"PetalBot",              "Huawei"),
    ("OAI-SearchBot",          r"OAI-SearchBot",         "OpenAI"),
    ("ChatGPT-User",           r"ChatGPT-User",          "OpenAI"),
    ("GPTBot",                 r"GPTBot",                "OpenAI"),
    ("BingBot",                r"bingbot",               "Microsoft"),
    ("PerplexityBot",          r"PerplexityBot",         "Perplexity"),
    ("Perplexity-User",        r"Perplexity-User",       "Perplexity"),
    ("Google-Extended",        r"Google-Extended",       "Google"),
    ("Googlebot",              r"Googlebot",             "Google"),
    ("anthropic-ai",           r"anthropic-ai",          "Anthropic"),
    ("ClaudeBot",              r"ClaudeBot",             "Anthropic"),
    ("Claude-Web",             r"Claude-Web",            "Anthropic"),
    ("Claude-SearchBot",       r"Claude-SearchBot",      "Anthropic"),
    ("Meta-ExternalAgent",     r"meta-externalagent",    "Meta"),
    ("FacebookBot",            r"facebookexternalhit",   "Meta"),
    ("Bytespider",             r"Bytespider",            "ByteDance"),
    ("Applebot-Extended",      r"Applebot-Extended",     "Apple"),
    ("Applebot",               r"Applebot",              "Apple"),
    ("YandexBot",              r"YandexBot",             "Yandex"),
    ("DuckDuckBot",            r"DuckDuckBot",           "DuckDuckGo"),
    ("CCBot",                  r"CCBot",                 "CommonCrawl"),
    ("cohere-ai",              r"cohere-ai",             "Cohere"),
    ("Diffbot",                r"Diffbot",               "Diffbot"),
]

CONFIG_DIR = Path.home() / ".config" / "taiwan-md"
CREDENTIALS_DIR = CONFIG_DIR / "credentials"
CACHE_DIR = CONFIG_DIR / "cache"
ENV_FILE = CREDENTIALS_DIR / ".env"
SETUP_GUIDE = "docs/pipelines/SENSE-FETCHER-SETUP.md"


def load_env():
    """Load env vars from ~/.config/taiwan-md/credentials/.env"""
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


def cf_graphql(token, query, variables=None):
    """Send GraphQL query to Cloudflare Analytics API."""
    url = "https://api.cloudflare.com/client/v4/graphql"
    body = json.dumps({"query": query, "variables": variables or {}}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body_str = e.read().decode("utf-8", errors="replace")
        fail(f"Cloudflare API HTTP {e.code}: {body_str[:400]}")
    except urllib.error.URLError as e:
        fail(f"Cloudflare API unreachable: {e.reason}")

    if data.get("errors"):
        fail(f"Cloudflare GraphQL errors: {json.dumps(data['errors'], ensure_ascii=False)[:500]}")
    return data.get("data", {})


def fetch_daily_traffic(token, zone_tag, days=1):
    """
    Fetch basic daily analytics via httpRequests1dGroups.

    This dataset is available on Free tier and provides:
    - Total requests, page views, threats, bytes
    - Country breakdown
    - Response status breakdown
    - Content type breakdown
    - Browser family breakdown
    - Unique visitors
    """
    end = datetime.now(timezone.utc).date()
    start = end - timedelta(days=days)

    query = """
    query DailyTraffic($zoneTag: String!, $start: String!, $end: String!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            filter: { date_geq: $start, date_leq: $end }
            limit: 31
            orderBy: [date_DESC]
          ) {
            dimensions { date }
            sum {
              requests
              pageViews
              cachedRequests
              threats
              bytes
              countryMap {
                clientCountryName
                requests
                threats
                bytes
              }
              responseStatusMap {
                edgeResponseStatus
                requests
              }
              contentTypeMap {
                edgeResponseContentTypeName
                requests
                bytes
              }
              browserMap {
                uaBrowserFamily
                pageViews
              }
            }
            uniq { uniques }
          }
        }
      }
    }
    """
    variables = {
        "zoneTag": zone_tag,
        "start": start.strftime("%Y-%m-%d"),
        "end": end.strftime("%Y-%m-%d"),
    }
    return cf_graphql(token, query, variables), start, end


def _cf_graphql_soft(token, query, variables):
    """Same as cf_graphql but returns (data, error_msg) instead of calling fail()."""
    url = "https://api.cloudflare.com/client/v4/graphql"
    body = json.dumps({"query": query, "variables": variables}).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        return None, f"HTTP {e.code}: {e.read().decode('utf-8', errors='replace')[:300]}"
    except urllib.error.URLError as e:
        return None, f"unreachable: {e.reason}"
    if data.get("errors"):
        return None, json.dumps(data["errors"], ensure_ascii=False)[:400]
    return data.get("data", {}), None


def fetch_ai_crawlers(token, zone_tag, days=7):
    """Query httpRequestsAdaptiveGroups grouped by (userAgent, edgeResponseStatus)
    to derive AI crawler breakdown. Free tier limits this endpoint to a 1-day
    time window per query, so we loop through each day and aggregate.

    Works on Free tier — the earlier failure was specifically
    `botManagementVerifiedBot` (paid Bot Management) but the `userAgent`
    dimension is available on all plans.

    Returns a dict shaped like the dashboard aiCrawlers section:
        {
            "totals": {detectedRequests, http200, allowedRequests, unsuccessfulRequests, topCrawler},
            "crawlers": [{name, category, requests, http200}, ...],
            "period": {start, end, days}
        }
    """
    now = datetime.now(timezone.utc)

    # No server-side userAgent filter: a `userAgent_like` SQL LIKE misses a
    # lot of crawler UAs (capitalization, custom bot names, etc.). Fetch all
    # request groups for the day and filter client-side via AI_CRAWLER_PATTERNS.
    # taiwan.md scale: ~30k requests/day, ~200-500 unique UAs → well under
    # the 10000 row limit.
    query = """
    query AICrawlersDay($zoneTag: String!, $start: Time!, $end: Time!) {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequestsAdaptiveGroups(
            filter: {
              datetime_geq: $start,
              datetime_leq: $end
            }
            limit: 10000
            orderBy: [count_DESC]
          ) {
            count
            dimensions {
              userAgent
              edgeResponseStatus
            }
          }
        }
      }
    }
    """

    rows = []
    days_fetched = 0
    days_failed = 0
    for offset in range(days):
        day_end = now - timedelta(days=offset)
        day_start = day_end - timedelta(days=1)
        variables = {
            "zoneTag": zone_tag,
            "start": day_start.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "end": day_end.strftime("%Y-%m-%dT%H:%M:%SZ"),
        }
        data, err = _cf_graphql_soft(token, query, variables)
        if err:
            print(
                f"⚠️  AI crawler day {day_start.date()} failed: {err[:200]}",
                file=sys.stderr,
            )
            days_failed += 1
            continue
        zones = data.get("viewer", {}).get("zones", [])
        if zones:
            day_rows = zones[0].get("httpRequestsAdaptiveGroups", []) or []
            rows.extend(day_rows)
            days_fetched += 1

    if not rows:
        return None

    start = now - timedelta(days=days)
    end = now

    # Aggregate per crawler (first matching pattern wins).
    # Also collect UA→requests for paths/samples diagnostic.
    crawler_totals = {}  # name → {requests, http200, category}
    unmatched_bot_requests = 0

    for row in rows:
        dims = row.get("dimensions", {}) or {}
        ua = dims.get("userAgent", "") or ""
        status = dims.get("edgeResponseStatus", 0) or 0
        count = row.get("count", 0) or 0

        matched = False
        for name, pattern, category in AI_CRAWLER_PATTERNS:
            if re.search(pattern, ua, re.IGNORECASE):
                if name not in crawler_totals:
                    crawler_totals[name] = {
                        "requests": 0,
                        "http200": 0,
                        "category": category,
                    }
                crawler_totals[name]["requests"] += count
                if status == 200:
                    crawler_totals[name]["http200"] += count
                matched = True
                break
        if not matched:
            unmatched_bot_requests += count

    # Sort crawlers by requests desc
    crawlers = [
        {
            "name": name,
            "category": info["category"],
            "requests": info["requests"],
            "http200": info["http200"],
        }
        for name, info in sorted(
            crawler_totals.items(), key=lambda x: x[1]["requests"], reverse=True
        )
    ]

    total_req = sum(c["requests"] for c in crawlers)
    total_200 = sum(c["http200"] for c in crawlers)
    totals = {
        "detectedRequests": total_req,
        "http200": total_200,
        "allowedRequests": total_req,  # we don't block any crawler → all allowed
        "unsuccessfulRequests": max(total_req - total_200, 0),
        "topCrawler": crawlers[0] if crawlers else None,
        "unmatchedBotRequests": unmatched_bot_requests,
    }

    return {
        "period": {
            "start": start.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "end": end.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "days": days,
            "daysFetched": days_fetched,
            "daysFailed": days_failed,
        },
        "totals": totals,
        "crawlers": crawlers,
    }


def _build_daily_row(d):
    """Extract per-day metrics including status breakdown (2026-04-17 δ).

    Adds status200 / status4xx / status404 / status5xx so EXP-A style
    回歸實驗可以歸因到具體哪一天 spike。修 LESSONS-INBOX 「CF dailyBreakdown
    缺 per-day 404 count」sensor gap.
    """
    s = d.get("sum") or {}
    uniq = d.get("uniq") or {}
    dims = d.get("dimensions") or {}

    status_map = s.get("responseStatusMap") or []
    s200 = s404 = s4xx = s5xx = 0
    for r in status_map:
        code = r.get("edgeResponseStatus") or 0
        count = r.get("requests") or 0
        if code == 200:
            s200 += count
        elif code == 404:
            s404 += count
            s4xx += count
        elif 400 <= code < 500:
            s4xx += count
        elif 500 <= code < 600:
            s5xx += count

    return {
        "date": dims.get("date"),
        "requests": s.get("requests", 0) or 0,
        "pageViews": s.get("pageViews", 0) or 0,
        "cachedRequests": s.get("cachedRequests", 0) or 0,
        "threats": s.get("threats", 0) or 0,
        "bytes": s.get("bytes", 0) or 0,
        "uniques": uniq.get("uniques", 0) or 0,
        "status200": s200,
        "status404": s404,
        "status4xx": s4xx,
        "status5xx": s5xx,
    }


def aggregate(days_data):
    """Aggregate multi-day data into totals + breakdowns."""
    total = {
        "requests": 0,
        "pageViews": 0,
        "cachedRequests": 0,
        "threats": 0,
        "bytes": 0,
        "uniques": 0,
    }
    countries = {}  # country → {requests, threats}
    statuses = {}  # status → requests
    content_types = {}  # content-type → requests
    browsers = {}  # browser → pageViews

    for day in days_data:
        s = day.get("sum", {})
        total["requests"] += s.get("requests", 0) or 0
        total["pageViews"] += s.get("pageViews", 0) or 0
        total["cachedRequests"] += s.get("cachedRequests", 0) or 0
        total["threats"] += s.get("threats", 0) or 0
        total["bytes"] += s.get("bytes", 0) or 0
        total["uniques"] += day.get("uniq", {}).get("uniques", 0) or 0

        for c in s.get("countryMap", []) or []:
            name = c.get("clientCountryName", "Unknown")
            if name not in countries:
                countries[name] = {"requests": 0, "threats": 0, "bytes": 0}
            countries[name]["requests"] += c.get("requests", 0) or 0
            countries[name]["threats"] += c.get("threats", 0) or 0
            countries[name]["bytes"] += c.get("bytes", 0) or 0

        for r in s.get("responseStatusMap", []) or []:
            code = str(r.get("edgeResponseStatus", "unknown"))
            statuses[code] = statuses.get(code, 0) + (r.get("requests", 0) or 0)

        for ct in s.get("contentTypeMap", []) or []:
            name = ct.get("edgeResponseContentTypeName", "unknown") or "unknown"
            if name not in content_types:
                content_types[name] = {"requests": 0, "bytes": 0}
            content_types[name]["requests"] += ct.get("requests", 0) or 0
            content_types[name]["bytes"] += ct.get("bytes", 0) or 0

        for b in s.get("browserMap", []) or []:
            name = b.get("uaBrowserFamily", "unknown") or "unknown"
            browsers[name] = browsers.get(name, 0) + (b.get("pageViews", 0) or 0)

    # Sort
    top_countries = dict(
        sorted(countries.items(), key=lambda x: x[1]["requests"], reverse=True)[:30]
    )
    top_statuses = dict(sorted(statuses.items(), key=lambda x: x[1], reverse=True))
    top_content = dict(
        sorted(content_types.items(), key=lambda x: x[1]["requests"], reverse=True)[:20]
    )
    top_browsers = dict(sorted(browsers.items(), key=lambda x: x[1], reverse=True)[:20])

    return total, top_countries, top_statuses, top_content, top_browsers


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Fetch Cloudflare analytics (Free tier friendly)")
    parser.add_argument("--days", type=int, default=1, help="How many days back to fetch (default 1)")
    args = parser.parse_args()

    env = load_env()
    token = env.get("CF_API_TOKEN", "").strip()
    zone_tag = env.get("CF_ZONE_ID", "").strip()

    if not token or not zone_tag:
        fail(
            f"CF_API_TOKEN or CF_ZONE_ID not set.\n"
            f"   Expected in {ENV_FILE} or environment.\n"
            f"   See {SETUP_GUIDE} for how to create the token."
        )

    # Guard rail: refuse if env file is inside the repo
    try:
        if ENV_FILE.resolve().is_relative_to(Path.cwd().resolve()):
            fail(
                "SECURITY: credentials .env file is inside the repo! "
                "Move it to ~/.config/taiwan-md/credentials/.env"
            )
    except AttributeError:
        # Python < 3.9 doesn't have is_relative_to
        env_str = str(ENV_FILE.resolve())
        cwd_str = str(Path.cwd().resolve())
        if env_str.startswith(cwd_str):
            fail("SECURITY: .env is inside the repo")

    print(f"📡 Fetching Cloudflare daily analytics ({args.days}d)...", file=sys.stderr)
    data, start, end = fetch_daily_traffic(token, zone_tag, args.days)

    zones = data.get("viewer", {}).get("zones", [])
    if not zones:
        fail("No zone data returned — check CF_ZONE_ID or token permissions")

    days_data = zones[0].get("httpRequests1dGroups", [])
    if not days_data:
        print(
            f"⚠️  No traffic data for {start} → {end}. Cloudflare may need a few hours to aggregate.",
            file=sys.stderr,
        )
        days_data = []

    total, top_countries, top_statuses, top_content, top_browsers = aggregate(days_data)

    # AI crawler breakdown via httpRequestsAdaptiveGroups (userAgent dimension).
    # Isolated try so a transient failure here doesn't nuke the whole fetch.
    print(f"📡 Fetching AI crawler breakdown ({args.days}d)...", file=sys.stderr)
    try:
        ai_crawlers = fetch_ai_crawlers(token, zone_tag, args.days)
        if ai_crawlers and ai_crawlers["crawlers"]:
            top = ai_crawlers["crawlers"][0]
            print(
                f"✅ AI crawlers: {ai_crawlers['totals']['detectedRequests']:,} detected, "
                f"top = {top['name']} ({top['requests']:,})",
                file=sys.stderr,
            )
        else:
            print("⚠️  AI crawler fetch returned no data", file=sys.stderr)
    except SystemExit:
        # cf_graphql fail() propagates as SystemExit; the AI query may fail
        # (e.g. userAgent_like not supported on some plans). Catch and continue.
        print(
            "⚠️  AI crawler query failed (userAgent_like may not be available "
            "on your plan). Daily traffic still succeeded.",
            file=sys.stderr,
        )
        ai_crawlers = None
    except Exception as e:
        print(f"⚠️  AI crawler query error: {type(e).__name__}: {e}", file=sys.stderr)
        ai_crawlers = None

    output = {
        "fetched_at": datetime.now(timezone.utc).isoformat(),
        "zone_id": zone_tag[:8] + "..." + zone_tag[-4:],  # redacted for caching
        "period": {
            "start": start.strftime("%Y-%m-%d"),
            "end": end.strftime("%Y-%m-%d"),
            "days": args.days,
        },
        "ai_crawlers": ai_crawlers,
        "daily_breakdown": [_build_daily_row(d) for d in days_data],
        "summary": total,
        "top_countries": top_countries,
        "status_breakdown": top_statuses,
        "content_types": top_content,
        "browser_families": top_browsers,
        "note": (
            "Traffic analytics via httpRequests1dGroups (Free tier). "
            "AI crawler breakdown via httpRequestsAdaptiveGroups grouping by "
            "userAgent — works on Free tier; the Enterprise-only fields are "
            "botManagement.* (which we don't use)."
        ),
    }

    # Write to cache
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    today = datetime.now().strftime("%Y-%m-%d")
    latest_path = CACHE_DIR / "cloudflare-latest.json"
    dated_path = CACHE_DIR / f"cloudflare-{today}.json"

    latest_path.write_text(json.dumps(output, indent=2, ensure_ascii=False))
    dated_path.write_text(json.dumps(output, indent=2, ensure_ascii=False))

    print(
        f"✅ Cloudflare: {total['requests']:,} requests / {total['uniques']:,} uniques "
        f"/ {total['threats']} threats",
        file=sys.stderr,
    )
    print(f"   → {latest_path}", file=sys.stderr)

    # Print summary JSON to stdout
    print(
        json.dumps(
            {
                "source": "cloudflare",
                "period_days": args.days,
                "total_requests": total["requests"],
                "total_page_views": total["pageViews"],
                "unique_visitors": total["uniques"],
                "threats": total["threats"],
                "top_5_countries": dict(list(top_countries.items())[:5]),
                "top_status_codes": dict(list(top_statuses.items())[:5]),
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
