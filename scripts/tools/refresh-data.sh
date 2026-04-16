#!/usr/bin/env bash
# refresh-data.sh — 心跳用的單一資料刷新入口
#
# 依序執行：
#   1. git pull --rebase origin main      (hard abort on conflict)
#   2. bash scripts/tools/fetch-sense-data.sh    (CF + GA4 + SC + dashboard-analytics merger)
#   3. npm run prebuild                   (dashboard-vitals/organism/articles/translations JSONs)
#   4. bash scripts/tools/update-stats.sh (README + stats.json)
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
echo -e "${GRN}[1/4]${RST} Git sync..."
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
echo -e "${GRN}[2/4]${RST} 三源感知抓取..."
if bash scripts/tools/fetch-sense-data.sh 2>&1 | grep -E '^\[|^   [✅⚠️❌]|^📁|^[✅⚠️❌]' | tail -20; then
  true
else
  echo -e "${YEL}⚠️  fetch-sense-data 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# Step 2.5 — sync _translations.json from translatedFrom frontmatter (SSOT)
# 為什麼: file-level translatedFrom 是 SSOT，_translations.json 是 derived cache
echo -e "${GRN}[2.5/4]${RST} sync _translations.json from frontmatter..."
if python3 scripts/tools/sync-translations-json.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ _translations.json synced${RST}"
fi
echo ""

# Step 3 — prebuild dashboard data (soft fail)
echo -e "${GRN}[3/4]${RST} npm run prebuild..."
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
echo -e "${GRN}[4/4]${RST} GitHub stats..."
if bash scripts/tools/update-stats.sh > /tmp/stats.log 2>&1; then
  tail -5 /tmp/stats.log
  echo -e "${DIM}   ✓ README/stats 已刷新${RST}"
else
  echo -e "${YEL}⚠️  update-stats 失敗 — 跳過，stats 保持昨天${RST}"
  tail -5 /tmp/stats.log
fi
rm -f /tmp/stats.log
echo ""

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}🧬 資料更新 pipeline 完成${RST}"
echo -e "${DIM}下一步：HEARTBEAT.md Beat 1 診斷${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"
