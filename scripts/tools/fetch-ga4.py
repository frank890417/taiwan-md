#!/usr/bin/env python3
"""
fetch-ga4.py — 抓 Google Analytics 4 (taiwan.md) 的關鍵指標

用法:
    python3 scripts/tools/fetch-ga4.py [--days 1]

憑證來源（優先序）:
    1. ~/.config/taiwan-md/credentials/google-service-account.json
    2. 環境變數 GOOGLE_APPLICATION_CREDENTIALS

屬性 ID 來源:
    ~/.config/taiwan-md/credentials/.env 裡的 GA4_PROPERTY_ID

輸出:
    ~/.config/taiwan-md/cache/ga4-latest.json
    ~/.config/taiwan-md/cache/ga4-{YYYY-MM-DD}.json

依賴:
    google-analytics-data
    google-auth

    推薦安裝到 ~/.config/taiwan-md/venv/:
        python3 -m venv ~/.config/taiwan-md/venv
        ~/.config/taiwan-md/venv/bin/pip install google-analytics-data google-auth

    script 會自動偵測這個 venv 並使用。

來源: 2026-04-11 session α
"""
import json
import os
import sys
from datetime import datetime, timedelta
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
    """If a venv exists at ~/.config/taiwan-md/venv, re-exec this script with its python.

    Note: venv python is typically a symlink to the system python, so we can't compare
    executable paths (.resolve() would collapse both sides). Instead use sys.prefix vs
    sys.base_prefix — Python's built-in venv detection.
    """
    venv_python = VENV_DIR / "bin" / "python3"
    if not venv_python.exists():
        return  # no venv, proceed with system python

    # Already in a venv AND that venv is the one we want?
    in_venv = sys.prefix != sys.base_prefix
    if in_venv and Path(sys.prefix).resolve() == VENV_DIR.resolve():
        return  # already in the right venv

    # Re-exec
    os.execv(str(venv_python), [str(venv_python), *sys.argv])


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Fetch GA4 data")
    parser.add_argument("--days", type=int, default=1, help="How many days back (end today)")
    args = parser.parse_args()

    # Re-exec in venv if available (must happen before google imports)
    reexec_in_venv()

    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange,
            Dimension,
            Filter,
            FilterExpression,
            Metric,
            RunReportRequest,
            OrderBy,
        )
        from google.oauth2 import service_account
    except ImportError as e:
        fail(
            f"Missing Python library: {e.name}\n"
            f"   Install with:\n"
            f"     python3 -m venv {VENV_DIR}\n"
            f"     {VENV_DIR}/bin/pip install google-analytics-data google-auth\n"
            f"   Or pip install google-analytics-data google-auth --user\n"
            f"   See {SETUP_GUIDE}"
        )

    env = load_env()
    property_id = env.get("GA4_PROPERTY_ID", "").strip()
    if not property_id:
        fail(f"GA4_PROPERTY_ID not set in {ENV_FILE}")

    # Credential file
    cred_path = env.get("GOOGLE_APPLICATION_CREDENTIALS", "").strip()
    if cred_path:
        cred_path = Path(cred_path).expanduser()
    elif SERVICE_ACCOUNT_FILE.exists():
        cred_path = SERVICE_ACCOUNT_FILE
    else:
        fail(
            f"Google service account key not found at {SERVICE_ACCOUNT_FILE}\n"
            f"   Set GOOGLE_APPLICATION_CREDENTIALS or put the JSON key at that path."
        )

    # Guard rail
    if cred_path.resolve().is_relative_to(Path.cwd().resolve()):
        fail(f"SECURITY: service account key {cred_path} is inside the repo!")

    credentials = service_account.Credentials.from_service_account_file(str(cred_path))
    client = BetaAnalyticsDataClient(credentials=credentials)

    end_date = datetime.now().strftime("%Y-%m-%d")
    start_date = (datetime.now() - timedelta(days=args.days)).strftime("%Y-%m-%d")
    date_range = DateRange(start_date=start_date, end_date=end_date)

    # Report 1: Overall metrics
    overall_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        metrics=[
            Metric(name="activeUsers"),
            Metric(name="newUsers"),
            Metric(name="screenPageViews"),
            Metric(name="eventCount"),
            Metric(name="averageSessionDuration"),
            Metric(name="engagementRate"),
            Metric(name="bounceRate"),
        ],
    )

    # Report 2: Top pages (include pagePath so dashboard rows can be clickable)
    pages_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="pagePath"), Dimension(name="pageTitle")],
        metrics=[
            Metric(name="screenPageViews"),
            Metric(name="activeUsers"),
            Metric(name="eventCount"),
        ],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True)],
        limit=50,
    )

    # Report 2b: Top *articles* in last 7 days (dimension-filtered to
    # content-article paths only — excludes /, /about, /graph, /map, /dashboard,
    # category hubs (/food/, /history/), etc).
    # Article path shape: /[lang/]?{category}/{slug}/?
    # Categories come from src/content/zh-TW/ top-level dirs.
    ARTICLE_CATEGORIES = (
        "food|culture|history|society|nature|technology|"
        "economy|lifestyle|people|geography|art|music"
    )
    article_regex = rf"^/(en/|ja/|ko/)?({ARTICLE_CATEGORIES})/[^/]+/?$"
    articles_7d_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
        dimensions=[Dimension(name="pagePath"), Dimension(name="pageTitle")],
        metrics=[
            Metric(name="screenPageViews"),
            Metric(name="activeUsers"),
            Metric(name="eventCount"),
        ],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="pagePath",
                string_filter=Filter.StringFilter(
                    match_type=Filter.StringFilter.MatchType.FULL_REGEXP,
                    value=article_regex,
                ),
            )
        ),
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="screenPageViews"), desc=True)],
        limit=50,
    )

    # Report 3: Traffic sources
    source_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="sessionSourceMedium")],
        metrics=[Metric(name="sessions"), Metric(name="activeUsers")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)],
        limit=25,
    )

    # Report 4: Countries / cities
    geo_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[Dimension(name="country"), Dimension(name="city")],
        metrics=[Metric(name="activeUsers")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="activeUsers"), desc=True)],
        limit=50,
    )

    # Report 5: 404 events (if instrumented)
    event_404_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[
            Dimension(name="eventName"),
            Dimension(name="customEvent:failed_path"),
        ],
        metrics=[Metric(name="eventCount")],
        order_bys=[OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)],
        limit=30,
    )

    print(f"📊 Fetching GA4 reports (property {property_id}, {args.days}d)...", file=sys.stderr)

    try:
        overall = client.run_report(overall_req)
        pages = client.run_report(pages_req)
        sources = client.run_report(source_req)
        geo = client.run_report(geo_req)
    except Exception as e:
        fail(f"GA4 API error: {type(e).__name__}: {e}")

    # Try articles 7d — isolated try so a regex/filter issue doesn't kill the
    # whole fetch. Leaves empty list if filter isn't supported or returns nothing.
    try:
        articles_7d = client.run_report(articles_7d_req)
        articles_7d_ok = True
    except Exception as e:
        print(f"⚠️  articles_7d report failed: {type(e).__name__}: {e}", file=sys.stderr)
        articles_7d = None
        articles_7d_ok = False

    # Try 404 events — might fail if custom dimension not registered yet
    try:
        event_404 = client.run_report(event_404_req)
        events_404 = [
            {
                "event_name": row.dimension_values[0].value,
                "failed_path": row.dimension_values[1].value,
                "count": int(row.metric_values[0].value),
            }
            for row in event_404.rows
            if row.dimension_values[0].value == "page_404"
        ]
    except Exception as e:
        events_404 = {"error": f"404 custom dimension not available: {e}"}

    def parse_rows(report, dim_count):
        return [
            {
                **{f"dim_{i}": row.dimension_values[i].value for i in range(dim_count)},
                "metrics": [
                    {"name": report.metric_headers[i].name, "value": mv.value}
                    for i, mv in enumerate(row.metric_values)
                ],
            }
            for row in report.rows
        ]

    output = {
        "fetched_at": datetime.now().isoformat(),
        "property_id": property_id,
        "period": {"start": start_date, "end": end_date, "days": args.days},
        "overall": {
            m.name: float(overall.rows[0].metric_values[i].value) if overall.rows else 0
            for i, m in enumerate(overall.metric_headers)
        } if overall.rows else {},
        "top_pages": parse_rows(pages, 2),
        "top_articles_7d": parse_rows(articles_7d, 2) if articles_7d_ok else [],
        "traffic_sources": parse_rows(sources, 1),
        "geo": parse_rows(geo, 2),
        "events_404": events_404,
    }

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    latest_path = CACHE_DIR / "ga4-latest.json"
    dated_path = CACHE_DIR / f"ga4-{datetime.now().strftime('%Y-%m-%d')}.json"
    latest_path.write_text(json.dumps(output, indent=2, ensure_ascii=False))
    dated_path.write_text(json.dumps(output, indent=2, ensure_ascii=False))

    users = output["overall"].get("activeUsers", 0)
    views = output["overall"].get("screenPageViews", 0)
    print(f"✅ GA4: {users:.0f} active users / {views:.0f} views", file=sys.stderr)
    print(f"   → {latest_path}", file=sys.stderr)

    print(json.dumps({
        "source": "ga4",
        "period_days": args.days,
        "active_users": users,
        "page_views": views,
        "top_5_pages": [
            {"path": p["dim_0"], "title": p["dim_1"], "views": float(p["metrics"][0]["value"])}
            for p in output["top_pages"][:5]
        ],
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
