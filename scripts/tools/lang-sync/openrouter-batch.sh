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

# 2026-05-01 γ-late3: switched from array glob (`GROUPS=(... /_group-*.json)`)
# to find-based iteration. Bash 3.2 on macOS, when invoked via certain tool
# wrappers (e.g. zsh-spawned bash with custom BASH_ENV), corrupted array
# elements during glob expansion. find approach is portable + transparent.
GROUP_FILES=$(find "$TASK_DIR" -maxdepth 1 -name "_group-*.json" | sort)
if [ -z "$GROUP_FILES" ]; then
  echo "❌ No group files in $TASK_DIR. Run prepare-batch.py first." >&2
  exit 1
fi
GROUP_COUNT=$(echo "$GROUP_FILES" | wc -l | tr -d ' ')

echo "🚀 Dispatching $GROUP_COUNT parallel openrouter workers"
echo "   Lang: $LANG_CODE"
echo "   Model: $MODEL"
echo "   Logs: $LOG_DIR/"
echo ""

PIDS=""
while IFS= read -r group; do
  [ -z "$group" ] && continue
  group_letter=$(basename "$group" .json | sed 's/_group-//')
  log="$LOG_DIR/worker-$group_letter.log"
  python3 "$REPO/scripts/tools/lang-sync/openrouter-translate.py" \
    --group "$group" \
    --model "$MODEL" \
    > "$log" 2>&1 &
  pid=$!
  PIDS="$PIDS $pid"
  echo "  Worker $group_letter dispatched (PID $pid, log: $log)"
done <<EOF
$GROUP_FILES
EOF

echo ""
echo "⏳ Waiting for $GROUP_COUNT workers to complete..."
# shellcheck disable=SC2086 -- intentional word splitting on PIDS string
wait $PIDS
echo ""
echo "✅ All workers done. Check logs in $LOG_DIR/"
