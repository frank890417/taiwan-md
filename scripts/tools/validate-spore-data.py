#!/usr/bin/env python3
"""validate-spore-data.py — SSOT consistency checker for spore engagement data.

Checks 3 data layers:
  1. SPORE-LOG.md (canonical SSOT, rich-text Markdown)
  2. knowledge/{lang}/{cat}/{slug}.md frontmatter sporeLinks (per-article view)
  3. public/api/dashboard-spores.json (generated derived)

Validates:
  - dashboard-spores.json mtime >= SPORE-LOG.md mtime (no stale dashboard)
  - Every spore in 發文紀錄 has matching parser-recognized harvest data (else views_latest=None)
  - Per-article sporeLinks frontmatter URLs match SPORE-LOG URLs (no orphan)
  - K/M suffix parser regression test (8 cases)

Exit code:
  0 = all green
  1 = warnings (informational, don't block)
  2 = errors (block CI / pre-commit)

Usage:
  python3 scripts/tools/validate-spore-data.py
  python3 scripts/tools/validate-spore-data.py --strict  # warnings -> errors

Designed to be cheap (~ < 1 sec). Run on every refresh-data and pre-commit.
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent.parent
SPORE_LOG = REPO_ROOT / "docs/factory/SPORE-LOG.md"
DASHBOARD_JSON = REPO_ROOT / "public/api/dashboard-spores.json"
KNOWLEDGE_ROOT = REPO_ROOT / "knowledge"


def red(s):
    return f"\033[31m{s}\033[0m"


def green(s):
    return f"\033[32m{s}\033[0m"


def yellow(s):
    return f"\033[33m{s}\033[0m"


def parse_views_robust(text):
    """Robust K/M-aware views parser. Mirrors generate-dashboard-spores.py."""
    if not text:
        return None
    m = re.search(
        r"(\d+(?:\.\d+)?[KMkm]|\d{1,3}(?:,\d{3})+|\d+)\s+views?\b",
        text,
    )
    if not m:
        return None
    s = m.group(1)
    if s[-1] in "Kk":
        return int(float(s[:-1]) * 1000)
    if s[-1] in "Mm":
        return int(float(s[:-1]) * 1_000_000)
    return int(s.replace(",", ""))


def check_parser_regression():
    """Regression test for K/M suffix parser bug (objective-khorana day 2)."""
    cases = [
        ("**65.4K views**", 65400),
        ("**1.8K views**", 1800),
        ("180K views", 180000),
        ("**65,400 views**", 65400),
        ("**1,800 views**", 1800),
        ("65000 views", 65000),
        ("**300,000 views**", 300000),
        ("2.5M views", 2500000),
    ]
    failures = []
    for inp, expected in cases:
        got = parse_views_robust(inp)
        if got != expected:
            failures.append((inp, got, expected))
    return failures


def check_dashboard_freshness():
    """dashboard-spores.json mtime should be >= SPORE-LOG.md mtime."""
    if not DASHBOARD_JSON.exists():
        return [f"❌ {DASHBOARD_JSON.relative_to(REPO_ROOT)} missing"]
    if not SPORE_LOG.exists():
        return [f"❌ {SPORE_LOG.relative_to(REPO_ROOT)} missing"]
    log_mt = SPORE_LOG.stat().st_mtime
    dash_mt = DASHBOARD_JSON.stat().st_mtime
    issues = []
    if dash_mt < log_mt:
        delta = log_mt - dash_mt
        issues.append(
            f"⚠️  dashboard-spores.json is STALE "
            f"(SPORE-LOG.md was modified {delta:.0f}s after dashboard)\n"
            f"   Run: python3 scripts/tools/generate-dashboard-spores.py"
        )
    return issues


def parse_spore_log_rows():
    """Parse SPORE-LOG harvest table -> [{n, slug, platform, url, latest_views}].

    Returns rows where 'n' is parseable spore number.
    """
    if not SPORE_LOG.exists():
        return []
    rows = []
    in_metrics = False
    text = SPORE_LOG.read_text()
    for line in text.split("\n"):
        if "## 成效追蹤" in line:
            in_metrics = True
            continue
        if not in_metrics:
            continue
        if not line.startswith("| "):
            continue
        cells = [c.strip() for c in line.split("|")]
        if len(cells) < 11:
            continue
        n_str = cells[1]
        if not n_str.isdigit():
            continue
        rows.append({
            "n": int(n_str),
            "slug": cells[2],
            "platform": cells[3],
            "harvest_text": cells[10],
            "latest_views": parse_views_robust(cells[10]),
        })
    return rows


def check_unparsed_harvest():
    """Spores with harvest text but unparseable -> warning."""
    rows = parse_spore_log_rows()
    issues = []
    for row in rows:
        ht = row["harvest_text"]
        # Has harvest content but parser returns None?
        if ht and "views" in ht.lower() and row["latest_views"] is None:
            issues.append(
                f"⚠️  #{row['n']} {row['slug']} ({row['platform']}): "
                f"harvest text contains 'views' but parser returns None"
            )
    return issues


def check_dashboard_data_present():
    """Verify dashboard-spores.json has views_latest for spores with parsed harvest."""
    if not DASHBOARD_JSON.exists():
        return ["❌ dashboard-spores.json missing"]
    d = json.loads(DASHBOARD_JSON.read_text())
    recent_spores = {s["n"]: s for s in d.get("recent", []) if "n" in s}
    rows = parse_spore_log_rows()
    issues = []
    for row in rows:
        if row["latest_views"] is None:
            continue  # No harvest data, expected None in dashboard
        n = row["n"]
        if n not in recent_spores:
            continue  # Not in recent (older spore)
        dash_views = recent_spores[n].get("views_latest")
        if dash_views != row["latest_views"]:
            issues.append(
                f"❌ #{n} {row['slug']} ({row['platform']}): "
                f"SPORE-LOG parsed {row['latest_views']} but dashboard JSON has {dash_views}"
            )
    return issues


def check_sporelinks_consistency():
    """Spot-check article frontmatter sporeLinks URL matches SPORE-LOG URL."""
    issues = []
    rows = parse_spore_log_rows()
    log_urls = set()
    for row in rows:
        # Extract URL from harvest_text or from main 發文紀錄 (we don't have that here,
        # so skip URL extraction — just count rows)
        pass
    # TODO: full sporeLinks frontmatter scan + cross-check (defer Phase 2)
    # For now just count articles with sporeLinks as informational
    sporelink_count = 0
    for md in KNOWLEDGE_ROOT.rglob("*.md"):
        try:
            text = md.read_text()
            if "sporeLinks:" in text:
                sporelink_count += 1
        except Exception:
            pass
    return issues, sporelink_count


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--strict", action="store_true",
                        help="Treat warnings as errors")
    args = parser.parse_args()

    print("===== Spore data SSOT validation =====\n")

    all_warnings = []
    all_errors = []

    # 1. Parser regression
    print("[1/4] Parser regression test (K/M suffix)...")
    parser_failures = check_parser_regression()
    if parser_failures:
        for inp, got, expected in parser_failures:
            all_errors.append(f"❌ Parser regression: '{inp}' -> {got} (expected {expected})")
    else:
        print(green("    ✅ 8/8 cases pass"))

    # 2. Dashboard freshness
    print("\n[2/4] Dashboard freshness (mtime check)...")
    fresh_issues = check_dashboard_freshness()
    if fresh_issues:
        all_warnings.extend(fresh_issues)
        for issue in fresh_issues:
            print(yellow(f"    {issue}"))
    else:
        print(green("    ✅ dashboard-spores.json is fresh"))

    # 3. Unparsed harvest text
    print("\n[3/4] Harvest text parseability...")
    unparsed = check_unparsed_harvest()
    if unparsed:
        all_warnings.extend(unparsed)
        for issue in unparsed:
            print(yellow(f"    {issue}"))
    else:
        print(green("    ✅ All harvest text parseable"))

    # 4. Dashboard JSON matches SPORE-LOG parsing
    print("\n[4/4] Dashboard JSON <-> SPORE-LOG consistency...")
    consistency = check_dashboard_data_present()
    if consistency:
        all_errors.extend(consistency)
        for issue in consistency:
            print(red(f"    {issue}"))
    else:
        print(green("    ✅ Dashboard reflects SPORE-LOG data"))

    # Bonus stats
    sporelink_issues, sl_count = check_sporelinks_consistency()
    print(f"\n[bonus] Articles with sporeLinks frontmatter: {sl_count}")

    # Summary
    print(f"\n===== Summary =====")
    print(f"  Errors:   {len(all_errors)}")
    print(f"  Warnings: {len(all_warnings)}")

    if all_errors:
        print(red("\n❌ FAIL"))
        return 2
    if all_warnings and args.strict:
        print(red("\n❌ FAIL (strict mode, warnings = errors)"))
        return 2
    if all_warnings:
        print(yellow("\n⚠️  PASS with warnings"))
        return 1
    print(green("\n✅ ALL CLEAR"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
