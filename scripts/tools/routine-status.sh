#!/usr/bin/env bash
# routine-status.sh — 過去 24hr cron routine 跑況 (cross-session continuity signal)
#
# Phase A2 (per reports/become-boot-mode-design-2026-05-13.md §5.3)
# 取代 BECOME §Step 3 ROUTINE.md 全檔 (649 行) 載入需求
#
# 用途：BECOME §Step 6 L4 always-load query 接這個 script
# 輸出：~3-5 行 markdown summary (過去 24h 跑了哪些 routine + 時間)
#
# 設計原則 (per D7 boundary rule):
# ✅ Cron 替我做了什麼 (cross-session continuity)
# ❌ 不含 work artifact inspection (PR/issue list → MAINTAINER Stage 1)

set -euo pipefail

MEMORY_DIR="${MEMORY_DIR:-docs/semiont/memory}"

if [[ ! -d "$MEMORY_DIR" ]]; then
  echo "⚠️ routine-status: $MEMORY_DIR 不存在"
  exit 0
fi

TODAY=$(date +%Y-%m-%d)
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d 'yesterday' +%Y-%m-%d)

# 列出過去 24hr 內的 routine memory files (filename schema: YYYY-MM-DD-HHMMSS-{handle}.md)
# Handle 部分是 routine name (e.g. twmd-data-refresh-am / twmd-maintainer-pm / spore-harvest-am)

ROUTINE_FIRES=$(
  ls "$MEMORY_DIR"/"$TODAY"-*.md "$MEMORY_DIR"/"$YESTERDAY"-*.md 2>/dev/null \
    | awk -F'/' '{print $NF}' \
    | awk -F'-' '
      {
        date = $1"-"$2"-"$3
        time = substr($4, 1, 2)":"substr($4, 3, 2)
        handle = ""
        for (i=5; i<=NF; i++) handle = handle (i>5?"-":"") $i
        sub(/\.md$/, "", handle)
        # 只取 routine-fire 類 (排除 manual / interactive session)
        if (handle ~ /^(twmd-|spore-|prebuild-)/) {
          print date" "time"  "handle
        }
      }
    ' \
    | sort -u
)

if [[ -z "$ROUTINE_FIRES" ]]; then
  echo "📋 routine | 過去 24hr 無 cron fire (檢查 ~/.claude/scheduled-tasks/ 是否運作)"
  exit 0
fi

echo "📋 routine | 過去 24hr cron fires:"
echo "$ROUTINE_FIRES" | tail -10 | sed 's/^/  /'
