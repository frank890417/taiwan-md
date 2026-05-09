#!/usr/bin/env bash
# session-id.sh — 產生 canonical session ID
# Format: YYYY-MM-DD-HHMMSS-{handle}
#
# Usage:
#   bash scripts/tools/session-id.sh                    # auto-detect handle / interactive prompt
#   bash scripts/tools/session-id.sh α                  # 顯式希臘字母（cron 場景）
#   bash scripts/tools/session-id.sh BABEL-BATCH        # 顯式 AAAAA-BBBBB title
#   SESSION_HANDLE=β bash scripts/tools/session-id.sh   # 透過 env var
#
# Handle detection chain:
#   1. CLI arg ($1)              — 顯式優先（最佳）
#   2. $SESSION_HANDLE env var   — cron / scheduler 注入
#   3. Worktree dirname          — 從 pwd `.claude/worktrees/{name}` 推
#                                  normalize：strip 任何 leading `YYYYMMDD-`
#                                  + trailing `-{hash}`，取中間的 purpose-title
#   4. Interactive TTY prompt    — 問 AAAAA-BBBBB 大寫 2-3 keyword title（v3 新增）
#   5. fallback `manual`         — cron 非 TTY 時 fallback
#
# 慣例（per reports/session-id-naming-2026-05-04.md
#       + reports/worktree-naming-2026-05-09.md
#       + 2026-05-09 brave-kirch-editorial 升級為 AAAAA-BBBBB 大寫）：
#   - Cron heartbeat → 希臘字母（α/β/γ/δ/...）
#   - Claude Code worktree → `YYYYMMDD-{purpose-title}` directory
#       e.g. 目錄 `20260509-babel-batch2` → handle = `babel-batch2`
#       Auto-codename worktree（`charming-mclaren`）grandfathered；新建請用日期+題
#   - Interactive new session → AAAAA-BBBBB（2-3 大寫英文關鍵字 dash 連接）
#       e.g. `EDITORIAL-REWRITE` / `BABEL-BATCH-3` / `ROUTINE-FLYWHEEL`
#       為什麼大寫：`ls` lex sort 時跟 lowercase worktree handle 自然分群
#       為什麼 dash 連接：跟 worktree 命名一致、grep-friendly
#       歷史檔案不重命名（per §時間是結構修補協議）
#   - Observer-triggered manual → 沿用當前 worktree 或 manual-{topic}
#
# 三種 handle 字符集互不重疊（希臘 / lowercase-kebab / UPPERCASE-KEBAB），
# sort lexicographic 自動對齊 chronological + 物種分群。

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
    # 防呆：剝完是空字串 / 純 8 位數字（worktree 只有日期沒題目）→ 進 prompt
    if [ -z "$handle" ] || [[ "$handle" =~ ^[0-9]{8}$ ]]; then
      handle=""
    fi
  fi
fi

# Interactive prompt — 只在 TTY 可用且還沒拿到 handle 時觸發
# Cron / Claude bash subshell / pipe redirect 全部會 skip（沒 TTY）
if [ -z "$handle" ] && [ -t 2 ] && [ -r /dev/tty ]; then
  {
    echo ""
    echo "🧬 Session handle 未設定。請輸入這個 session 的 title。"
    echo "   格式：AAAAA-BBBBB（2-3 個大寫英文關鍵字 dash 連接）"
    echo "   範例：EDITORIAL-REWRITE / BABEL-BATCH-3 / ROUTINE-FLYWHEEL / TYPHOON-CULTURE"
    echo ""
    printf "   Title: "
  } >&2
  raw=""
  read -r raw </dev/tty || raw=""
  # Normalize: 空白 → dash、轉大寫、剝非 [A-Z0-9-]、squash dash、trim 兩端 dash
  raw=$(echo "$raw" \
    | tr '[:space:]' '-' \
    | tr '[:lower:]' '[:upper:]' \
    | sed -E 's/[^A-Z0-9-]+//g; s/-+/-/g; s/^-+|-+$//g')
  if [ -n "$raw" ]; then
    handle="$raw"
  fi
fi

# 最終 fallback：非 TTY 環境（cron / Claude subshell）也沒任何訊號
if [ -z "$handle" ]; then
  handle="manual"
fi

date_str=$(date +%Y-%m-%d-%H%M%S)
echo "${date_str}-${handle}"
