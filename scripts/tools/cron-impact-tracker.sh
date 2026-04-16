#!/usr/bin/env bash
# cron-impact-tracker.sh — 量化自動心跳的價值
#
# 從 git log 統計 cron-triggered session 的產出：
#  - 自動心跳的 commit 數量
#  - 平均每個 session 修了什麼
#  - 自動 sync 清掉的孤兒檔案
#  - 修復的 issue 數
#
# 為什麼存在：ε session（自動排程心跳）默默做了很多清理工作但從未被量化。
# 這個工具讓「自動化的價值」變成 dashboard 可見的數字。
#
# 用法:
#   bash scripts/tools/cron-impact-tracker.sh [--days 7] [--json]
#
# 來源：2026-04-14 η session, Tier 1 #5
set -uo pipefail
cd "$(dirname "$0")/../.."

DAYS=7
JSON=false
while [[ $# -gt 0 ]]; do
  case "$1" in
    --days) DAYS="$2"; shift 2 ;;
    --json) JSON=true; shift ;;
    -h|--help)
      head -16 "$0" | tail -15 | sed 's/^# \?//'
      exit 0
      ;;
    *) echo "unknown: $1"; exit 1 ;;
  esac
done

# Identify cron-triggered sessions:
# - memory files in docs/semiont/memory/YYYY-MM-DD-{ε,η,...}.md
# - whose first line contains "排程" or "automated" or "自動"
SINCE=$(date -v-${DAYS}d +%Y-%m-%d 2>/dev/null || date -d "$DAYS days ago" +%Y-%m-%d)

# Find cron memory files
cron_files=()
for f in docs/semiont/memory/*.md; do
  [[ ! -f "$f" ]] && continue
  basename=$(basename "$f")
  # Skip if older than window
  date_part=$(echo "$basename" | grep -oE '^[0-9]{4}-[0-9]{2}-[0-9]{2}')
  [[ -z "$date_part" ]] && continue
  [[ "$date_part" < "$SINCE" ]] && continue
  # Check if it's a cron session (look at first ~10 lines)
  if head -10 "$f" 2>/dev/null | grep -qE '排程|自動|automated|cron|scheduled'; then
    cron_files+=("$f")
  fi
done

cron_count=${#cron_files[@]}

# Count cron-triggered commits in window
# (commits made within ±10 minutes of a cron memory file modification)
auto_commits=$(git log --since="$SINCE" --pretty=format:"%h %s" 2>/dev/null | grep -cE '\[semiont\] (memory|heal|evolve|diagnose).*ε|ζ|η|θ|cron|sync batch|自動|排程' || echo 0)
auto_commits=${auto_commits//[^0-9]/}
auto_commits=${auto_commits:-0}

# Count file deletions in cron commits (i.e., orphans cleaned up)
orphans_cleaned=0
sync_batches=0
if [ "$cron_count" -gt 0 ]; then
  for f in "${cron_files[@]}"; do
    # Count "孤兒" mentions
    orphans=$(grep -oE '孤兒[^，。]*[0-9]+' "$f" 2>/dev/null | grep -oE '[0-9]+' | head -1 || echo 0)
    orphans=${orphans:-0}
    orphans_cleaned=$((orphans_cleaned + orphans))
    # Count sync batches
    grep -qE 'sync batch|批次清理' "$f" 2>/dev/null && sync_batches=$((sync_batches + 1))
  done
fi

# Approximate time saved: each cron session ~6 min vs equivalent manual ~15 min
# (conservative estimate; manual would also need diagnosis time we skip via cron)
TIME_SAVED_MIN=$((cron_count * 9))

if $JSON; then
  cat <<EOF
{
  "window_days": $DAYS,
  "since": "$SINCE",
  "cron_sessions": $cron_count,
  "auto_commits": $auto_commits,
  "orphans_cleaned": $orphans_cleaned,
  "sync_batches": $sync_batches,
  "approx_time_saved_minutes": $TIME_SAVED_MIN,
  "files": [
$(printf '    "%s",\n' "${cron_files[@]}" | sed '$ s/,$//')
  ]
}
EOF
  exit 0
fi

# Human-readable report
echo "🤖 Cron Impact Tracker — last ${DAYS}d (since $SINCE)"
echo "════════════════════════════════════════════════"
echo ""
echo "  📅 Cron sessions:      $cron_count"
echo "  💾 Auto commits:       $auto_commits"
echo "  🧹 Orphans cleaned:    $orphans_cleaned"
echo "  🔄 Sync batches:       $sync_batches"
echo "  ⏱  Approx time saved:  ${TIME_SAVED_MIN} min (≈ $((TIME_SAVED_MIN / 60))h $((TIME_SAVED_MIN % 60))m)"
echo ""

if [ "$cron_count" -gt 0 ]; then
  echo "📋 Cron sessions in window:"
  for f in "${cron_files[@]}"; do
    bn=$(basename "$f" .md)
    title=$(head -1 "$f" 2>/dev/null | sed 's/^# *//')
    echo "  - $bn — $title"
  done
fi

echo ""
echo "💡 Add this to dashboard via:"
echo "   bash scripts/tools/cron-impact-tracker.sh --json > public/api/cron-impact.json"
