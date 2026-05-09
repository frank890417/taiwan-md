#!/usr/bin/env bash
# session-id.sh — 產生 canonical session ID
# Format: YYYY-MM-DD-HHMMSS-{handle}
#
# Usage:
#   bash scripts/tools/session-id.sh                    # auto-detect handle
#   bash scripts/tools/session-id.sh α                  # 顯式希臘字母（cron 場景）
#   bash scripts/tools/session-id.sh babel-batch2       # 顯式 purpose-title
#   SESSION_HANDLE=β bash scripts/tools/session-id.sh   # 透過 env var
#
# Handle detection chain:
#   1. CLI arg ($1)            — 顯式優先（最佳）
#   2. $SESSION_HANDLE env var — cron / scheduler 注入
#   3. Worktree dirname        — 從 pwd `.claude/worktrees/{name}` 推
#                                normalize：strip 任何 leading `YYYYMMDD-`
#                                + trailing `-{hash}`，取中間的 purpose-title
#   4. fallback `manual`       — 不在 worktree 也沒 env 時
#
# 慣例（per reports/session-id-naming-2026-05-04.md
#       + reports/worktree-naming-2026-05-09.md）：
#   - Cron heartbeat → 希臘字母（α/β/γ/δ/...）
#   - Claude Code worktree → `YYYYMMDD-{purpose-title}` directory（**新標準**）
#       e.g. 目錄 `20260509-babel-batch2` → handle = `babel-batch2`
#       Auto-codename worktree（`charming-mclaren`）grandfathered；新建請用日期+題
#   - Observer-triggered manual → 沿用當前 worktree 或 manual-{topic}
#
# 兩種 handle 字符集不重疊，sort lexicographic 自動對齊 chronological。

set -euo pipefail

handle="${1:-${SESSION_HANDLE:-}}"

if [ -z "$handle" ]; then
  pwd_str=$(pwd)
  if [[ "$pwd_str" == *".claude/worktrees/"* ]]; then
    wt=$(echo "$pwd_str" | sed -E 's|.*/\.claude/worktrees/([^/]+).*|\1|')
    # Step 1: 砍掉 trailing hash（e.g. `charming-mclaren-7d79a7` → `charming-mclaren`）
    handle=$(echo "$wt" | sed -E 's|-[0-9a-f]{6,}$||')
    # Step 2: 砍掉 leading YYYYMMDD-（新標準：`20260509-babel-batch2` → `babel-batch2`）
    handle=$(echo "$handle" | sed -E 's|^[0-9]{8}-||')
    # 防呆：剝完是空字串 / 純 8 位數字（worktree 只有日期沒題目），fallback `manual`
    if [ -z "$handle" ] || [[ "$handle" =~ ^[0-9]{8}$ ]]; then
      handle="manual"
    fi
  else
    handle="manual"
  fi
fi

date_str=$(date +%Y-%m-%d-%H%M%S)
echo "${date_str}-${handle}"
