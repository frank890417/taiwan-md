#!/usr/bin/env bash
# session-id.sh — 產生 canonical session ID
# Format: YYYY-MM-DD-HHMMSS-{handle}
#
# Usage:
#   bash scripts/tools/session-id.sh                    # auto-detect handle
#   bash scripts/tools/session-id.sh α                  # 顯式希臘字母（cron 場景）
#   SESSION_HANDLE=β bash scripts/tools/session-id.sh   # 透過 env var
#
# Handle detection chain:
#   1. CLI arg ($1)            — 顯式優先
#   2. $SESSION_HANDLE env var — cron / scheduler 注入
#   3. Worktree codename       — 從 pwd `.claude/worktrees/{name}-{hash}` 推
#   4. fallback `manual`       — 不在 worktree 也沒 env 時
#
# 慣例（per reports/session-id-naming-2026-05-04.md）：
#   - Cron heartbeat → 希臘字母（α/β/γ/δ/...）
#   - Claude Code worktree → kebab-case codename（charming-mclaren）
#   - Observer-triggered manual → 沿用當前 worktree 或 manual-{topic}
#
# 兩種 handle 字符集不重疊，sort lexicographic 自動對齊 chronological。

set -euo pipefail

handle="${1:-${SESSION_HANDLE:-}}"

if [ -z "$handle" ]; then
  pwd_str=$(pwd)
  if [[ "$pwd_str" == *".claude/worktrees/"* ]]; then
    wt=$(echo "$pwd_str" | sed -E 's|.*/\.claude/worktrees/([^/]+).*|\1|')
    # 砍掉 trailing hash（e.g. `charming-mclaren-7d79a7` → `charming-mclaren`）
    handle=$(echo "$wt" | sed -E 's|-[0-9a-f]{6,}$||')
  else
    handle="manual"
  fi
fi

date_str=$(date +%Y-%m-%d-%H%M%S)
echo "${date_str}-${handle}"
