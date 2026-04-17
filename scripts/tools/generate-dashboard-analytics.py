#!/usr/bin/env python3
"""
generate-dashboard-analytics.py — Merge sense cache → public/api/dashboard-analytics.json

Reads the three-source cache built by fetch-sense-data.sh:
  ~/.config/taiwan-md/cache/ga4-latest.json
  ~/.config/taiwan-md/cache/search-console-latest.json
  ~/.config/taiwan-md/cache/cloudflare-latest.json

And merges them into the hand-maintained dashboard-analytics.json, preserving
any sections we don't own (cloudflare24h breakdowns, hand-written highlights, etc).

What we write:
  - ga.topPages (20 items, with path + title + views + users)
  - ga.totals (active users / page views / bounce rate / engagement)
  - ga.startDate / endDate / label
  - searchConsole7d (new section — 20 queries + totals + opportunities)

What we DON'T touch:
  - searchConsole24h (legacy, kept for backward compat; will phase out)
  - cloudflare24h (managed separately)
  - sourcesUsed, lastUpdated (bumped here though)

2026-04-11 session α — built to support the "GA top 20 clickable" + "SC 7-day"
dashboard changes.
"""
from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
CACHE = Path.home() / ".config" / "taiwan-md" / "cache"
TARGET = REPO_ROOT / "public" / "api" / "dashboard-analytics.json"


def load_json(path: Path):
    if not path.exists():
        print(f"⚠️  Missing: {path}", file=sys.stderr)
        return None
    try:
        return json.loads(path.read_text())
    except Exception as e:
        print(f"⚠️  Cannot parse {path}: {e}", file=sys.stderr)
        return None


def parse_ga_metric(row, name):
    for m in row.get("metrics", []):
        if m["name"] == name:
            try:
                return float(m["value"])
            except (ValueError, TypeError):
                return 0
    return 0


def normalize_path(path: str) -> str:
    """Normalize a GA page path so /foo and /foo/ collapse to the same key.

    Rules:
      - lowercase (GA is case-sensitive, but our paths are already all-lowercase)
      - strip query string and hash
      - remove trailing slash except for root "/"
      - collapse multiple slashes
    """
    if not path:
        return "/"
    # Drop anything after ? or #
    path = path.split("?", 1)[0].split("#", 1)[0]
    # Collapse //
    while "//" in path:
        path = path.replace("//", "/")
    # Strip trailing slash except when path is just "/"
    if len(path) > 1 and path.endswith("/"):
        path = path.rstrip("/")
    if not path:
        path = "/"
    return path


def clean_title(title: str) -> str:
    return (title or "").replace(" | Taiwan.md", "").strip()


def display_path(norm_path: str) -> str:
    """Convert normalized path → display/href form (restore trailing slash
    for non-root paths, to match how the site serves URLs)."""
    if norm_path == "/":
        return "/"
    return norm_path + "/"


def dedup_pages(rows, title_from="most_views"):
    """Dedup GA rows by normalized path, summing metrics. Returns sorted list.

    title_from:
      - "most_views" → pick the title of the row with highest views (winner's title)
      - "first"      → pick the first-seen title
    """
    buckets = {}
    for row in rows:
        norm = normalize_path(row.get("dim_0", ""))
        title = clean_title(row.get("dim_1", ""))
        views = int(parse_ga_metric(row, "screenPageViews"))
        users = int(parse_ga_metric(row, "activeUsers"))
        events = int(parse_ga_metric(row, "eventCount"))
        if norm not in buckets:
            buckets[norm] = {
                "path": display_path(norm),
                "title": title or display_path(norm),
                "views": 0,
                "users": 0,
                "events": 0,
                "_best_title_views": 0,
            }
        b = buckets[norm]
        b["views"] += views
        b["users"] += users
        b["events"] += events
        if title_from == "most_views" and views > b["_best_title_views"] and title:
            b["title"] = title
            b["_best_title_views"] = views
    out = sorted(buckets.values(), key=lambda x: x["views"], reverse=True)
    for row in out:
        row.pop("_best_title_views", None)
    return out


def build_ga_section(ga_raw):
    if not ga_raw:
        return None
    period = ga_raw.get("period", {})

    # Main top_pages — dedup normalized paths, keep top 20
    top_pages = dedup_pages(ga_raw.get("top_pages", []))[:20]

    # Top articles last 7 days — dedup too (in case /foo/ and /foo collide),
    # already filtered by GA4 dimension filter to article paths only
    top_articles_7d = dedup_pages(ga_raw.get("top_articles_7d", []))[:20]

    overall = ga_raw.get("overall", {})
    totals = {
        "activeUsers": int(overall.get("activeUsers", 0)),
        "newUsers": int(overall.get("newUsers", 0)),
        "avgEngagementSeconds": round(overall.get("averageSessionDuration", 0), 1),
        "events": int(overall.get("eventCount", 0)),
        "screenPageViews": int(overall.get("screenPageViews", 0)),
        "engagementRate": round(overall.get("engagementRate", 0), 4),
        "bounceRate": round(overall.get("bounceRate", 0), 4),
    }

    return {
        "label": f"{period.get('start', '?')} to {period.get('end', '?')}",
        "startDate": period.get("start"),
        "endDate": period.get("end"),
        "days": period.get("days"),
        "totals": totals,
        "topPages": top_pages,
        "topArticles7d": top_articles_7d,
    }


BRAND_QUERY_PATTERNS = [
    r"taiwan\.md",
    r"\btaiwan\s*md\b",
    r"\bmd\s*taiwan\b",
    r"^\s*md\s*$",  # exact "md"
    r"taiwandotmd",
]


def _is_brand_query(q_str):
    """Classify a query as brand (contains 'taiwan.md' / 'taiwan md' / exact 'md' / 'taiwandotmd').

    2026-04-17 δ: SC 7d 總 CTR 8.54% 虛胖 — top queries 'taiwan md' 62% / 'taiwan.md' 71%
    (brand 詞) 撐起整體率。真實 non-brand 搜尋可見度 <3%。拆分揭露分層真相（DNA #24
    第 5 種「加權平均掩蓋分層真相」的儀器化）。
    """
    import re as _re
    if not q_str:
        return False
    lower = q_str.lower().strip()
    for pattern in BRAND_QUERY_PATTERNS:
        if _re.search(pattern, lower):
            return True
    return False


def build_sc_7d_section(sc_raw):
    if not sc_raw:
        return None
    period = sc_raw.get("period", {})
    totals = sc_raw.get("totals", {})
    queries_raw = sc_raw.get("queries", [])[:20]

    top_queries = []
    for q in queries_raw:
        query_str = q.get("keys", [""])[0] if q.get("keys") else q.get("query", "")
        ctr = q.get("ctr", 0)
        position = q.get("position", 0)
        top_queries.append({
            "query": query_str,
            "clicks": int(q.get("clicks", 0)),
            "impressions": int(q.get("impressions", 0)),
            "ctr": round(ctr * 100, 2) if ctr <= 1 else round(ctr, 2),
            "position": round(position, 2),
        })

    # Opportunities: 0-click queries with impressions, sorted by impressions desc
    opportunities_raw = [
        q for q in sc_raw.get("queries", [])
        if q.get("clicks", 0) == 0 and q.get("impressions", 0) > 0
    ]
    opportunities_raw.sort(key=lambda q: q.get("impressions", 0), reverse=True)
    opportunities = []
    for q in opportunities_raw[:10]:
        query_str = q.get("keys", [""])[0] if q.get("keys") else q.get("query", "")
        opportunities.append({
            "query": query_str,
            "clicks": 0,
            "impressions": int(q.get("impressions", 0)),
            "position": round(q.get("position", 0), 2),
        })

    # Word cloud: every query with ≥1 impression, sorted by impressions desc,
    # capped at 150 to prevent runaway render. Compact shape (query + impressions
    # + clicks only) so the JSON stays small.
    all_queries_raw = sorted(
        [q for q in sc_raw.get("queries", []) if q.get("impressions", 0) > 0],
        key=lambda q: q.get("impressions", 0),
        reverse=True,
    )
    word_cloud = []
    for q in all_queries_raw[:150]:
        query_str = q.get("keys", [""])[0] if q.get("keys") else q.get("query", "")
        if not query_str:
            continue
        word_cloud.append({
            "query": query_str,
            "impressions": int(q.get("impressions", 0)),
            "clicks": int(q.get("clicks", 0)),
        })

    ctr_pct = totals.get("ctr", 0)
    if ctr_pct <= 1:
        ctr_pct = round(ctr_pct * 100, 2)

    # Brand vs non-brand breakdown (2026-04-17 δ — DNA #24 第 5 種儀器化)
    brand_clicks = brand_imp = 0
    nonbrand_clicks = nonbrand_imp = 0
    for q in sc_raw.get("queries", []):
        q_str = q.get("keys", [""])[0] if q.get("keys") else q.get("query", "")
        clicks = int(q.get("clicks", 0))
        imp = int(q.get("impressions", 0))
        if _is_brand_query(q_str):
            brand_clicks += clicks
            brand_imp += imp
        else:
            nonbrand_clicks += clicks
            nonbrand_imp += imp

    def _ctr(clicks, imp):
        return round(clicks / imp * 100, 2) if imp else 0

    return {
        "label": f"{period.get('start', '?')} to {period.get('end', '?')} ({period.get('days', '?')}d)",
        "startDate": period.get("start"),
        "endDate": period.get("end"),
        "days": period.get("days"),
        "totals": {
            "clicks": int(totals.get("clicks", 0)),
            "impressions": int(totals.get("impressions", 0)),
            "ctr": ctr_pct,
        },
        "brandBreakdown": {
            "brand": {
                "clicks": brand_clicks,
                "impressions": brand_imp,
                "ctr": _ctr(brand_clicks, brand_imp),
            },
            "nonBrand": {
                "clicks": nonbrand_clicks,
                "impressions": nonbrand_imp,
                "ctr": _ctr(nonbrand_clicks, nonbrand_imp),
            },
            "note": (
                "Brand = queries containing 'taiwan.md' / 'taiwan md' / exact 'md' / "
                "'taiwandotmd'. Total CTR aggregates both; brand CTR is usually 60-80%, "
                "nonBrand CTR reflects true external discoverability."
            ),
        },
        "topQueries": top_queries,
        "opportunities": opportunities,
        "wordCloud": word_cloud,
    }


# ISO 3166 alpha-2 → display name (only the codes we commonly see in CF cache;
# dashboard's countryFlags lookup table uses display names)
COUNTRY_CODE_TO_NAME = {
    "TW": "Taiwan",
    "US": "United States",
    "JP": "Japan",
    "KR": "South Korea",
    "CN": "China",
    "HK": "Hong Kong",
    "SG": "Singapore",
    "MY": "Malaysia",
    "TH": "Thailand",
    "VN": "Vietnam",
    "PH": "Philippines",
    "ID": "Indonesia",
    "IN": "India",
    "AU": "Australia",
    "NZ": "New Zealand",
    "CA": "Canada",
    "GB": "United Kingdom",
    "IE": "Ireland",
    "DE": "Germany",
    "FR": "France",
    "NL": "Netherlands",
    "ES": "Spain",
    "IT": "Italy",
    "PL": "Poland",
    "SE": "Sweden",
    "FI": "Finland",
    "NO": "Norway",
    "DK": "Denmark",
    "PT": "Portugal",
    "RU": "Russia",
    "BR": "Brazil",
    "MX": "Mexico",
    "PE": "Peru",
}


def build_ai_crawlers_dashboard(ai_raw):
    """Convert fetch-cloudflare.py's ai_crawlers cache shape → dashboard JSON
    shape that the template reads under `cloudflare.aiCrawlers`.

    Cache shape:  {period, totals, crawlers: [{name, category, requests, http200}]}
    Dashboard shape: {detectedRequests, http200, allowedRequests, unsuccessfulRequests,
                      topCrawler, crawlers: [{name, requests}, ...]}
    """
    if not ai_raw:
        return None
    totals = ai_raw.get("totals") or {}
    crawlers_raw = ai_raw.get("crawlers") or []
    # Template reads crawlers as [{name, requests}] for the horizontal bars.
    crawlers_simple = [
        {
            "name": c.get("name"),
            "requests": c.get("requests", 0),
            "http200": c.get("http200", 0),
            "category": c.get("category"),
        }
        for c in crawlers_raw
    ]
    top = crawlers_simple[0] if crawlers_simple else None
    return {
        "detectedRequests": int(totals.get("detectedRequests", 0)),
        "http200": int(totals.get("http200", 0)),
        "allowedRequests": int(totals.get("allowedRequests", 0)),
        "unsuccessfulRequests": int(totals.get("unsuccessfulRequests", 0)),
        "topCrawler": top,
        "crawlers": crawlers_simple,
        "period": ai_raw.get("period"),
    }


def build_cloudflare_section(cf_raw, preserve_ai_crawlers=None):
    """Map fetch-cloudflare.py cache (httpRequests1dGroups + ai_crawlers) into
    the dashboard JSON shape. If the cache has fresh ai_crawlers data (from
    httpRequestsAdaptiveGroups userAgent grouping), it takes precedence.
    Otherwise falls back to the preserved stale copy from cloudflare24h.
    """
    if not cf_raw:
        return None
    period = cf_raw.get("period", {})
    summary = cf_raw.get("summary", {}) or {}
    status_raw = cf_raw.get("status_breakdown", {}) or {}
    countries_raw = cf_raw.get("top_countries", {}) or {}

    # Top countries → array of {country, requests} sorted desc
    country_list = sorted(
        [
            {
                "country": COUNTRY_CODE_TO_NAME.get(code, code),
                "code": code,
                "requests": int(info.get("requests", 0)),
            }
            for code, info in countries_raw.items()
        ],
        key=lambda c: c["requests"],
        reverse=True,
    )[:10]

    # Status breakdown → list sorted by count desc
    status_list = sorted(
        [{"status": int(code), "count": int(count)} for code, count in status_raw.items()],
        key=lambda s: s["count"],
        reverse=True,
    )

    # 404 rate for quick diagnostic display
    total_status = sum(status_raw.values()) if status_raw else 0
    not_found = int(status_raw.get("404", 0))
    rate_404 = round(not_found / total_status * 100, 2) if total_status else 0

    days = period.get("days", 0)
    label_bilingual = (
        f"{period.get('start', '?')} to {period.get('end', '?')} ({days}d)"
    )

    out = {
        "label": label_bilingual,
        "startDate": period.get("start"),
        "endDate": period.get("end"),
        "days": days,
        "summary": {
            "requests": int(summary.get("requests", 0)),
            "pageViews": int(summary.get("pageViews", 0)),
            "uniques": int(summary.get("uniques", 0)),
            "cachedRequests": int(summary.get("cachedRequests", 0)),
            "threats": int(summary.get("threats", 0)),
            "bytes": int(summary.get("bytes", 0)),
        },
        "statusBreakdown": status_list,
        "fourOhFourRate": rate_404,
        "traffic": {"topCountries": country_list},
        "dailyBreakdown": cf_raw.get("daily_breakdown", []),
    }

    # AI crawlers: prefer fresh data from cache (httpRequestsAdaptiveGroups
    # userAgent grouping, works on Free tier). If absent (e.g. token lacks
    # permission or the feature was recently enabled), fall back to the
    # preserved stale copy so the section still renders something.
    fresh_ai = build_ai_crawlers_dashboard(cf_raw.get("ai_crawlers"))
    if fresh_ai:
        out["aiCrawlers"] = fresh_ai
        out["aiCrawlersStale"] = False
    elif preserve_ai_crawlers:
        out["aiCrawlers"] = preserve_ai_crawlers
        out["aiCrawlersStale"] = True

    return out


def main():
    ga_raw = load_json(CACHE / "ga4-latest.json")
    sc_raw = load_json(CACHE / "search-console-latest.json")
    cf_raw = load_json(CACHE / "cloudflare-latest.json")

    if not TARGET.exists():
        print(f"⚠️  Target not found: {TARGET} — creating new file", file=sys.stderr)
        existing = {}
    else:
        existing = load_json(TARGET) or {}

    ga_section = build_ga_section(ga_raw)
    sc_7d_section = build_sc_7d_section(sc_raw)

    # Preserve existing aiCrawlers from cloudflare24h (Free tier can't refresh it)
    existing_ai_crawlers = existing.get("cloudflare24h", {}).get("aiCrawlers")
    cf_section = build_cloudflare_section(cf_raw, preserve_ai_crawlers=existing_ai_crawlers)

    if ga_section:
        existing["ga"] = ga_section
        print(f"✅ ga.topPages: {len(ga_section['topPages'])} items "
              f"({ga_section.get('days', '?')}d window, deduped)")
        print(f"✅ ga.topArticles7d: {len(ga_section['topArticles7d'])} items "
              f"(articles only, 7d window)")
    else:
        print("⚠️  Skipping ga — no cache data", file=sys.stderr)

    if sc_7d_section:
        existing["searchConsole7d"] = sc_7d_section
        print(f"✅ searchConsole7d: {len(sc_7d_section['topQueries'])} top queries, "
              f"{len(sc_7d_section['wordCloud'])} word cloud entries")
    else:
        print("⚠️  Skipping searchConsole7d — no cache data", file=sys.stderr)

    if cf_section:
        # Write to a new field so the old cloudflare24h (with fresh aiCrawlers
        # at the time it was hand-curated) stays untouched. The template
        # reads cloudflare7d first and falls back to cloudflare24h.
        existing["cloudflare7d"] = cf_section
        print(
            f"✅ cloudflare7d: {cf_section['summary']['requests']:,} requests, "
            f"{len(cf_section['traffic']['topCountries'])} countries, "
            f"404 rate {cf_section['fourOhFourRate']}% "
            f"({cf_section['days']}d window)"
        )
        ai = cf_section.get("aiCrawlers")
        stale = cf_section.get("aiCrawlersStale")
        if ai:
            print(
                f"✅ cloudflare7d.aiCrawlers: {ai.get('detectedRequests', 0):,} "
                f"detected across {len(ai.get('crawlers', []))} crawlers"
                f"{' (STALE — no fresh cache)' if stale else ''}"
            )
    else:
        print("⚠️  Skipping cloudflare7d — no cache data", file=sys.stderr)

    existing["lastUpdated"] = datetime.now().isoformat()

    # Preserve existing 'sourcesUsed' and add an entry for this run
    sources = existing.get("sourcesUsed", [])
    if "sense-cache" not in sources:
        sources.append("sense-cache")
    existing["sourcesUsed"] = sources

    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(json.dumps(existing, indent=2, ensure_ascii=False) + "\n")
    print(f"✅ Wrote {TARGET}")


if __name__ == "__main__":
    main()
