#!/usr/bin/env bash
# inbox-signal.sh — 待消化 / 待開發 backlog awareness signal (cross-session continuity)
#
# Phase A3 (per reports/become-boot-mode-design-2026-05-13.md §5.4)
# 取代 BECOME §Step 5 LESSONS-INBOX (1928 行) + ARTICLE-INBOX (1197 行) 全載
#
# 用途：BECOME §Step 6 L4 always-load query 接這個 script
# 輸出：~3 行 markdown summary (LESSONS 未消化 / ARTICLE pending / in-progress count)
#
# 設計原則 (per D7 boundary rule):
# ✅ Backlog awareness signal (cross-session continuity)
# ❌ 不載入 full INBOX entries (那是 distill / 寫文時 explicit Read)

set -euo pipefail

LESSONS="${LESSONS:-docs/semiont/LESSONS-INBOX.md}"
ARTICLE="${ARTICLE:-docs/semiont/ARTICLE-INBOX.md}"
SPORE="${SPORE:-docs/factory/SPORE-INBOX.md}"

# LESSONS-INBOX §未消化清單 count
if [[ -f "$LESSONS" ]]; then
  # awk range covers both §未消化 sections (line ~261 no-emoji + ~2434 emoji-prefixed); end at ✅ or ❌ H2
  LESSONS_UNDIGESTED=$(awk '/^## .*未消化清單/,/^## [✅❌]/' "$LESSONS" | grep -cE "^### " || echo 0)
  LESSONS_DIGESTED=$(awk '/^## ✅ 已消化/,EOF' "$LESSONS" | grep -cE "^### " || echo 0)
  echo "📥 lessons | 未消化 $LESSONS_UNDIGESTED 條 / 已消化 $LESSONS_DIGESTED 條（distill 時讀 §未消化清單）"
fi

# ARTICLE-INBOX §Pending + §In-Progress count
if [[ -f "$ARTICLE" ]]; then
  ARTICLE_PENDING=$(awk '/^## 📥 Pending/,/^## 🚧 In-Progress/' "$ARTICLE" | grep -cE "^### " || echo 0)
  ARTICLE_INPROG=$(awk '/^## 🚧 In-Progress/,EOF' "$ARTICLE" | grep -cE "^### " || echo 0)
  echo "📝 articles | pending $ARTICLE_PENDING 條 / in-progress $ARTICLE_INPROG 條（寫文 / auto-heartbeat 時讀 §P0/P1）"
  # 👻 ghost early-warning：§Pending 裡 status=done/dropped 卻沒搬走的幽靈（完成歸檔鐵律漂移）
  # 深查 + 安全清除：scripts/tools/inbox-audit.py（誕生 2026-06-19-inbox-distill）
  ARTICLE_GHOST=$(awk '/^## 📥 Pending/{p=1} p && /^[[:space:]]*-[[:space:]]*\*\*Status\*\*/ && /done|dropped|已完成|✅/ && !/pending/{c++} END{print c+0}' "$ARTICLE")
  if [[ "${ARTICLE_GHOST:-0}" -gt 0 ]]; then
    echo "👻 inbox ghost | ${ARTICLE_GHOST} 條 status=done 卻沒搬走 — 跑 scripts/tools/inbox-audit.py --apply-safe 清"
  fi
  # ⌛ 切角時效（2026-09-27 self-evolve-weekly）：Angle-expires 欄過期／7 天內到期／時效題沒寫期限。
  # 誕生：探測器的建議登記進 INBOX 後原地過期連三週，P0 沒有期限維度，過期切角跟常青題躺同一層。
  # graceful degrade 同 spore 那段：工具失敗就不印這行。
  ANGLE_ESU=$(python3 scripts/tools/inbox-audit.py --angles --json 2>/dev/null | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
    print(len(d["expired"]), len(d["soon"]), len(d["news_unmarked"]))
except Exception:
    print("0 0 0")
' 2>/dev/null) || ANGLE_ESU="0 0 0"
  read -r ANGLE_EXP ANGLE_SOON ANGLE_UNM <<< "${ANGLE_ESU:-0 0 0}"
  if [[ "${ANGLE_EXP:-0}" -gt 0 || "${ANGLE_SOON:-0}" -gt 0 || "${ANGLE_UNM:-0}" -gt 0 ]]; then
    echo "⌛ angles  | 切角過期 ${ANGLE_EXP:-0} / 7 天內到期 ${ANGLE_SOON:-0} / 時效題沒寫期限 ${ANGLE_UNM:-0}（跑 scripts/tools/inbox-audit.py --angles）"
  fi
fi

# SPORE-INBOX §Pending count (2026-05-21 新增 — intake layer for 繁殖系統)
if [[ -f "$SPORE" ]]; then
  SPORE_PENDING=$(awk '/^## 📥 Pending/,/^## 📜 已發歷史/' "$SPORE" | grep -cE "^### " || echo 0)
  echo "🧫 spores  | pending $SPORE_PENDING 條（Stage 1 PICK 第一順位 / 觀察者 directive 累積）"
  # 👻 spore ghost/dup early-warning：SPORE-INBOX 對地真相健檢（誕生 2026-07-16 inbox-audit
  # session — 手工盤點發現幽靈 entry 沒刪 / 同篇兩條 entry，ARTICLE-INBOX 儀器管不到）。
  # graceful degrade：inbox-audit.py --spore 若失敗（python 環境跑掉 / repo 路徑不對）
  # 整段吞掉不讓 signal 掛掉，退回「不顯示這行」= 原本沒有這行時的行為。
  SPORE_GD=$(python3 scripts/tools/inbox-audit.py --spore --json 2>/dev/null | python3 -c '
import json, sys
try:
    d = json.load(sys.stdin)
    print(len(d.get("ghost", [])), len(d.get("dup", [])))
except Exception:
    print("0 0")
' 2>/dev/null) || SPORE_GD="0 0"
  read -r SPORE_GHOST SPORE_DUP <<< "${SPORE_GD:-0 0}"
  if [[ "${SPORE_GHOST:-0}" -gt 0 || "${SPORE_DUP:-0}" -gt 0 ]]; then
    echo "👻 spore-ghost=${SPORE_GHOST:-0} dup=${SPORE_DUP:-0}（跑 scripts/tools/inbox-audit.py --spore 看細節）"
  fi
fi
