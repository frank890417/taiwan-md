#!/usr/bin/env bash
# consciousness-snapshot.sh — instant CONSCIOUSNESS snapshot from dashboard JSON
#
# Phase A1.2 (per reports/become-boot-mode-design-2026-05-13.md §4.2)
# 取代 CONSCIOUSNESS.md L34-160 靜態快照（dashboard JSON ground truth）
#
# 用途：BECOME §Step 6 L4 always-load query 接這個 script
# 輸出：~12-15 行 markdown summary (vitals + 8 organs + alerts hint)

set -euo pipefail

VITALS="${VITALS:-public/api/dashboard-vitals.json}"
ORGANISM="${ORGANISM:-public/api/dashboard-organism.json}"

if [[ ! -f "$VITALS" || ! -f "$ORGANISM" ]]; then
  echo "⚠️ consciousness-snapshot: dashboard JSON 不存在"
  echo "   嘗試：bash scripts/core/refresh-data.sh"
  exit 0
fi

# Vitals — basic physiology
jq -r '
  "📊 vitals  | articles=\(.totalArticles) / contributors=\(.contributors) / 7d=+\(.articlesLast7Days) / 30d=+\(.articlesLast30Days) / human-reviewed=\(.humanReviewedPercent)%",
  "🌐 i18n    | en=\(.languageCoverage.en) ja=\(.languageCoverage["ja"]) ko=\(.languageCoverage.ko) es=\(.languageCoverage.es) fr=\(.languageCoverage.fr)"
' "$VITALS"

# Organs — 8 organ scores + trend
jq -r '
  "🫀 organs  | " + (
    [.organs[] | "\(.emoji)\(.score)\(if .trend == "up" then "↑" elif .trend == "down" then "↓" else "→" end)"] | join(" ")
  )
' "$ORGANISM"

# Last update freshness
jq -r '
  "🕐 updated | \(.lastUpdated)"
' "$VITALS"

# Alerts hint — pointer to CONSCIOUSNESS §警報 (canonical until dashboard-alerts.json exists)
echo "⚠️ alerts  | 詳見 docs/semiont/CONSCIOUSNESS.md §警報 (cron-refreshed)"
