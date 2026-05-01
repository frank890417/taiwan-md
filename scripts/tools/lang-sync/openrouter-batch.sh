#!/usr/bin/env bash
# openrouter-batch.sh — Spawn N parallel openrouter-translate.py workers (one per group)
#
# Usage:
#   bash scripts/tools/lang-sync/openrouter-batch.sh [lang] [model]
#
# Examples:
#   bash scripts/tools/lang-sync/openrouter-batch.sh ja
#   bash scripts/tools/lang-sync/openrouter-batch.sh ja "deepseek/deepseek-chat:free"
#
# Reads .lang-sync-tasks/{lang}/_group-*.json files (created by prepare-batch.py)
# and dispatches one Python worker per group, all running in parallel.
#
# Background workers log to .lang-sync-tasks/{lang}/_worker-{X}.log

set -euo pipefail

LANG_CODE="${1:-ja}"
MODEL="${2:-tencent/hy3-preview:free}"

REPO="$(cd "$(dirname "$0")/../../.." && pwd)"
TASK_DIR="$REPO/.lang-sync-tasks/$LANG_CODE"
LOG_DIR="$TASK_DIR/_logs"
mkdir -p "$LOG_DIR"

GROUPS=("$TASK_DIR"/_group-*.json)
if [ ! -e "${GROUPS[0]}" ]; then
  echo "❌ No group files in $TASK_DIR. Run prepare-batch.py first." >&2
  exit 1
fi

echo "🚀 Dispatching ${#GROUPS[@]} parallel openrouter workers"
echo "   Lang: $LANG_CODE"
echo "   Model: $MODEL"
echo "   Logs: $LOG_DIR/"
echo ""

PIDS=()
for group in "${GROUPS[@]}"; do
  group_letter=$(basename "$group" .json | sed 's/_group-//')
  log="$LOG_DIR/worker-$group_letter.log"
  python3 "$REPO/scripts/tools/lang-sync/openrouter-translate.py" \
    --group "$group" \
    --model "$MODEL" \
    > "$log" 2>&1 &
  pid=$!
  PIDS+=($pid)
  echo "  Worker $group_letter dispatched (PID $pid, log: $log)"
done

echo ""
echo "⏳ Waiting for ${#PIDS[@]} workers to complete..."
wait "${PIDS[@]}"
echo ""
echo "✅ All workers done. Check logs in $LOG_DIR/"
