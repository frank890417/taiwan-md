#!/usr/bin/env bash
# refresh-data.sh — 心跳用的單一資料刷新入口
#
# 依序執行：
#   1.   git pull --rebase origin main             (hard abort on conflict)
#   2.   fetch-sense-data.sh                        (CF + GA4 + SC + dashboard-analytics merger)
#   2.5. sync-translations-json.py                  (sync _translations.json from frontmatter SSOT)
#   2.8. generate-dashboard-spores.py               (spore dashboard from SPORE-LOG)
#   2.9. i18n-coverage-audit.sh --json-out          (UI string coverage dashboard) ← 2026-05-02 added
#   3.   npm run prebuild                           (dashboard-vitals/organism/articles/translations)
#   4.   update-stats.sh                            (README + stats.json)
#   5.   verify-dashboard-freshness                 (check all dashboard-*.json mtime today) ← 2026-05-02 added
#
# 失敗策略：
#   - git 層級失敗 → hard abort（需人類介入）
#   - 任何資料源失敗 → soft skip，心跳繼續用昨天的 cache
#
# 呼叫者：
#   - HEARTBEAT.md Beat 1（「執行 資料更新 pipeline」）
#   - ~/.claude/scheduled-tasks/semiont-heartbeat/SKILL.md（每日 09:37）
#   - .claude/skills/heartbeat/SKILL.md（/heartbeat 命令）
#
# 詳見：docs/pipelines/DATA-REFRESH-PIPELINE.md
# 2026-04-11 session ε 建造
# 2026-05-02 γ-late: 加 Step 2.9 i18n-coverage + Step 5 verify (DNA #43 — silent stale risk)

set -o pipefail
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

GRN='\033[0;32m'
YEL='\033[0;33m'
RED='\033[0;31m'
DIM='\033[0;90m'
RST='\033[0m'

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}🧬 資料更新 Pipeline${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"
echo ""

# Step 1 — git sync (HARD ABORT on conflict)
echo -e "${GRN}[1/5]${RST} Git sync..."
if git diff-index --quiet HEAD -- 2>/dev/null; then
  if git pull --rebase origin main 2>&1 | tail -5; then
    echo -e "${DIM}   ✓ up to date with origin/main${RST}"
  else
    echo -e "${RED}❌ git pull failed — aborting pipeline${RST}"
    echo -e "${YEL}   人類介入：檢查 merge conflict / detached HEAD${RST}"
    exit 2
  fi
else
  echo -e "${YEL}⚠️  working tree dirty — skipping git pull${RST}"
  echo -e "${DIM}   心跳繼續，但注意：可能在舊 base 上診斷${RST}"
fi
echo ""

# Step 2 — three-source sense fetch (soft fail)
echo -e "${GRN}[2/5]${RST} 三源感知抓取..."
if bash scripts/tools/fetch-sense-data.sh 2>&1 | grep -E '^\[|^   [✅⚠️❌]|^📁|^[✅⚠️❌]' | tail -20; then
  true
else
  echo -e "${YEL}⚠️  fetch-sense-data 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# Step 2.5 — sync _translations.json from translatedFrom frontmatter (SSOT)
# 為什麼: file-level translatedFrom 是 SSOT，_translations.json 是 derived cache
echo -e "${GRN}[2.5/5]${RST} sync _translations.json from frontmatter..."
if python3 scripts/tools/sync-translations-json.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ _translations.json synced${RST}"
fi
echo ""

# Step 2.8 — generate dashboard-spores.json from SPORE-LOG + SPORE-HARVESTS (2026-04-18 δ-late)
# 為什麼: 繁殖器官的 data-driven 感知；Dashboard 孢子面板的資料源
echo -e "${GRN}[2.8/5]${RST} generate dashboard-spores.json..."
if python3 scripts/tools/generate-dashboard-spores.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ dashboard-spores.json generated${RST}"
else
  echo -e "${YEL}⚠️  generate-dashboard-spores 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# Step 2.9 — generate dashboard-i18n.json from src/i18n/*.ts (2026-05-02 γ-late)
# 為什麼: UI 字串覆蓋率 dashboard 之前 12 小時 stale，原因是這個生成步驟沒進 refresh pipeline
# 觸發: 哲宇看 dashboard 發現 ja 顯示 97% 但實際已經 100%（DNA #43）
echo -e "${GRN}[2.9/5]${RST} generate dashboard-i18n.json (UI string coverage)..."
if bash scripts/tools/i18n-coverage-audit.sh --json-out public/api/dashboard-i18n.json 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ dashboard-i18n.json generated${RST}"
else
  echo -e "${YEL}⚠️  i18n-coverage-audit 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# Step 3 — prebuild dashboard data (soft fail)
echo -e "${GRN}[3/5]${RST} npm run prebuild..."
if npm run prebuild > /tmp/prebuild.log 2>&1; then
  tail -6 /tmp/prebuild.log
  echo -e "${DIM}   ✓ dashboard JSON 已重生${RST}"
else
  echo -e "${YEL}⚠️  prebuild 失敗 — Beat 1 會標記 build-broken (P0)${RST}"
  tail -15 /tmp/prebuild.log
fi
rm -f /tmp/prebuild.log
echo ""

# Step 4 — GitHub stats (soft fail)
echo -e "${GRN}[4/5]${RST} GitHub stats..."
if bash scripts/tools/update-stats.sh > /tmp/stats.log 2>&1; then
  tail -5 /tmp/stats.log
  echo -e "${DIM}   ✓ README/stats 已刷新${RST}"
else
  echo -e "${YEL}⚠️  update-stats 失敗 — 跳過，stats 保持昨天${RST}"
  tail -5 /tmp/stats.log
fi
rm -f /tmp/stats.log
echo ""

# Step 5 — verify dashboard freshness (2026-05-02 γ-late, DNA #43)
# 為什麼: refresh-data.sh 只有 invoke generators，沒驗證每個 dashboard JSON 都有今天的 mtime。
# 結果: 如果某個 generator silent skip / fail / 不在 pipeline 裡，user 看到 12h ago timestamp 才發現。
# 這條 verify 把每個 public/api/dashboard-*.json 的 mtime 跟今天比，列出 stale 的。
echo -e "${GRN}[5/5]${RST} verify dashboard freshness..."
TODAY=$(date +%Y-%m-%d)
STALE_COUNT=0
STALE_LIST=""
for f in public/api/dashboard-*.json; do
  [ -f "$f" ] || continue
  MTIME_DATE=$(stat -f "%Sm" -t "%Y-%m-%d" "$f" 2>/dev/null || stat -c "%y" "$f" 2>/dev/null | cut -d' ' -f1)
  if [ "$MTIME_DATE" != "$TODAY" ]; then
    STALE_COUNT=$((STALE_COUNT + 1))
    STALE_LIST="$STALE_LIST   ❌ $(basename $f) — mtime $MTIME_DATE\n"
  fi
done
if [ "$STALE_COUNT" -eq 0 ]; then
  echo -e "${DIM}   ✓ 全部 $(ls public/api/dashboard-*.json | wc -l | tr -d ' ') 個 dashboard JSON 都是今天 mtime${RST}"
else
  echo -e "${RED}❌ $STALE_COUNT 個 dashboard 不是今天 mtime（generator 漏跑了？）${RST}"
  echo -e "$STALE_LIST"
  echo -e "${YEL}   修復: 把對應的 generator 加進 refresh-data.sh${RST}"
fi
echo ""

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}🧬 資料更新 pipeline 完成${RST}"
echo -e "${DIM}下一步：HEARTBEAT.md Beat 1 診斷${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"
