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

    ctr_pct = totals.get("ctr", 0)
    if ctr_pct <= 1:
        ctr_pct = round(ctr_pct * 100, 2)

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
        "topQueries": top_queries,
        "opportunities": opportunities,
    }


def main():
    ga_raw = load_json(CACHE / "ga4-latest.json")
    sc_raw = load_json(CACHE / "search-console-latest.json")

    if not TARGET.exists():
        print(f"⚠️  Target not found: {TARGET} — creating new file", file=sys.stderr)
        existing = {}
    else:
        existing = load_json(TARGET) or {}

    ga_section = build_ga_section(ga_raw)
    sc_7d_section = build_sc_7d_section(sc_raw)

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
        print(f"✅ searchConsole7d: {len(sc_7d_section['topQueries'])} queries")
    else:
        print("⚠️  Skipping searchConsole7d — no cache data", file=sys.stderr)

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
