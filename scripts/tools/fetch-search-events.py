#!/usr/bin/env python3
"""
fetch-search-events.py — 從 GA4 拉 search_query / search_result_click 事件數據

讀取昨天上線（2026-04-13 γ session）的 GA4 自訂事件追蹤：
  - search_query    : { search_term, results_count, search_lang, search_mode }
  - search_result_click : { search_term, click_title, click_url, click_position }

輸出兩個視角：
  1. Top queries — 讀者實際在搜什麼
  2. Zero-result queries — 讀者想要但我們沒有的東西（最高價值）
  3. Top click patterns — 搜索→點擊轉換成功的詞

用法:
    python3 scripts/tools/fetch-search-events.py [--days 7]

輸出:
    ~/.config/taiwan-md/cache/search-events-latest.json
    stdout: human-readable markdown report

TODO 7 天後（4/21）跑這個工具看實際數據。

為什麼分開不放在 fetch-ga4.py：
  search 事件是 funnel 分析的專屬視角，跟 site-wide 流量數據是不同問題。
  分開讓 EVOLVE-PIPELINE 可以針對性消費「讀者想要什麼」的訊號。

來源: 2026-04-14 η session, Tier 1 #3
"""
import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path

CONFIG_DIR = Path.home() / ".config" / "taiwan-md"
CREDENTIALS_DIR = CONFIG_DIR / "credentials"
CACHE_DIR = CONFIG_DIR / "cache"
VENV_DIR = CONFIG_DIR / "venv"

# Try to use venv's python if available
if VENV_DIR.exists() and sys.prefix != str(VENV_DIR):
    venv_python = VENV_DIR / "bin" / "python3"
    if venv_python.exists() and __name__ == "__main__":
        os.execv(str(venv_python), [str(venv_python), __file__, *sys.argv[1:]])


def fail(msg):
    print(f"❌ {msg}", file=sys.stderr)
    sys.exit(1)


def load_property_id():
    env_path = CREDENTIALS_DIR / ".env"
    if not env_path.exists():
        fail(f"No env file at {env_path}")
    for line in env_path.read_text().splitlines():
        if line.startswith("GA4_PROPERTY_ID="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    fail("GA4_PROPERTY_ID not found in env")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--days", type=int, default=7)
    args = parser.parse_args()

    try:
        from google.analytics.data_v1beta import BetaAnalyticsDataClient
        from google.analytics.data_v1beta.types import (
            DateRange,
            Dimension,
            Filter,
            FilterExpression,
            Metric,
            OrderBy,
            RunReportRequest,
        )
        from google.oauth2 import service_account
    except ImportError:
        fail(
            "google-analytics-data not installed. Install via:\n"
            "  ~/.config/taiwan-md/venv/bin/pip install google-analytics-data google-auth"
        )

    creds_path = CREDENTIALS_DIR / "google-service-account.json"
    if not creds_path.exists():
        fail(f"No credentials at {creds_path}")

    credentials = service_account.Credentials.from_service_account_file(
        str(creds_path),
        scopes=["https://www.googleapis.com/auth/analytics.readonly"],
    )
    client = BetaAnalyticsDataClient(credentials=credentials)
    property_id = load_property_id()

    date_range = DateRange(start_date=f"{args.days}daysAgo", end_date="today")

    # Report 1: Top search queries (all)
    queries_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[
            Dimension(name="customEvent:search_term"),
            Dimension(name="customEvent:search_lang"),
        ],
        metrics=[Metric(name="eventCount")],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="eventName",
                string_filter=Filter.StringFilter(value="search_query"),
            )
        ),
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)
        ],
        limit=50,
    )

    # Report 2: Zero-result queries (where results_count == "0")
    zero_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[
            Dimension(name="customEvent:search_term"),
            Dimension(name="customEvent:search_lang"),
        ],
        metrics=[Metric(name="eventCount")],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="customEvent:results_count",
                string_filter=Filter.StringFilter(value="0"),
            )
        ),
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)
        ],
        limit=50,
    )

    # Report 3: Top click patterns (which search led to which click)
    clicks_req = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[date_range],
        dimensions=[
            Dimension(name="customEvent:search_term"),
            Dimension(name="customEvent:click_title"),
        ],
        metrics=[Metric(name="eventCount")],
        dimension_filter=FilterExpression(
            filter=Filter(
                field_name="eventName",
                string_filter=Filter.StringFilter(value="search_result_click"),
            )
        ),
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="eventCount"), desc=True)
        ],
        limit=50,
    )

    print(
        f"🔍 Fetching search events (property {property_id}, {args.days}d)...",
        file=sys.stderr,
    )

    def safe_run(req, label):
        try:
            return client.run_report(req)
        except Exception as e:
            print(f"⚠️  {label} failed: {type(e).__name__}: {e}", file=sys.stderr)
            return None

    queries = safe_run(queries_req, "queries")
    zero = safe_run(zero_req, "zero-result")
    clicks = safe_run(clicks_req, "clicks")

    def rows_to_list(report, dim_count):
        if not report:
            return []
        out = []
        for row in report.rows:
            entry = {f"d{i}": row.dimension_values[i].value for i in range(dim_count)}
            entry["count"] = int(row.metric_values[0].value)
            out.append(entry)
        return out

    data = {
        "fetched_at": datetime.utcnow().isoformat() + "Z",
        "days": args.days,
        "queries": [
            {"term": e["d0"], "lang": e["d1"], "count": e["count"]}
            for e in rows_to_list(queries, 2)
        ],
        "zero_result_queries": [
            {"term": e["d0"], "lang": e["d1"], "count": e["count"]}
            for e in rows_to_list(zero, 2)
        ],
        "clicks": [
            {"term": e["d0"], "click_title": e["d1"], "count": e["count"]}
            for e in rows_to_list(clicks, 2)
        ],
    }

    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    out_path = CACHE_DIR / "search-events-latest.json"
    out_path.write_text(json.dumps(data, ensure_ascii=False, indent=2))
    print(f"✅ Wrote {out_path}", file=sys.stderr)

    # Print human-readable report to stdout
    print(f"\n# Search Events Report — {args.days}d window\n")
    print(f"_Fetched: {data['fetched_at']}_\n")

    if not data["queries"]:
        print("⚠️ **No search events found yet.** Either:")
        print("- Tracking just deployed (wait 24-48h for data to populate)")
        print("- Custom dimensions not registered in GA4 admin")
        print("- 7-day window has no traffic\n")
        print("To register custom dimensions: GA4 Admin → Data display → Custom definitions:")
        print("  - search_term (event scope)")
        print("  - results_count (event scope)")
        print("  - search_lang (event scope)")
        print("  - search_mode (event scope)")
        print("  - click_title (event scope)")
        print("  - click_url (event scope)")
        print("  - click_position (event scope)")
        return

    print(f"## 🔥 Top Queries ({len(data['queries'])})\n")
    print("| # | Query | Lang | Count |")
    print("|---|-------|------|-------|")
    for i, q in enumerate(data["queries"][:20], 1):
        print(f"| {i} | `{q['term']}` | {q['lang']} | {q['count']} |")

    print(f"\n## ⚠️ Zero-Result Queries — Content Gap Signals ({len(data['zero_result_queries'])})\n")
    print("> 讀者搜了但找不到——這是最高價值的內容缺口情報\n")
    if data["zero_result_queries"]:
        print("| # | Query | Lang | Count |")
        print("|---|-------|------|-------|")
        for i, q in enumerate(data["zero_result_queries"][:30], 1):
            print(f"| {i} | `{q['term']}` | {q['lang']} | {q['count']} |")
    else:
        print("✅ No zero-result queries (every search returned matches)")

    print(f"\n## 🎯 Top Click Patterns ({len(data['clicks'])})\n")
    print("> 哪些搜尋詞最終轉換成點擊\n")
    if data["clicks"]:
        print("| # | Query → Article | Count |")
        print("|---|------------------|-------|")
        for i, c in enumerate(data["clicks"][:20], 1):
            print(f"| {i} | `{c['term']}` → {c['click_title']} | {c['count']} |")
    else:
        print("(no click data yet)")


if __name__ == "__main__":
    main()
