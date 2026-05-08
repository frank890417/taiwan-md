#!/usr/bin/env bash
# refresh-data.sh — 心跳用的單一資料刷新入口
#
# 12 個步驟（Phase 0 SSOT cleanup 後 2026-05-08 重整）：
#    1. Git sync                            (auto-stash + pull, hard abort on failure)
#    2. fetch-sense-data.sh                 (CF + GA4 + SC + dashboard-analytics merge)
#    3. sync-translations-json.py           (sync _translations.json from frontmatter SSOT)
#    4. extract-spore-metrics.py            (narrative → struct columns; Phase 4 移除候選)
#    5. generate-dashboard-spores.py        (spore dashboard from SPORE-LOG)
#    6. i18n-coverage-audit.sh              (UI string coverage dashboard)
#    7. npm run prebuild                    (dashboard-vitals/organism/articles/translations)
#    8. refresh-llms-txt.py                 (sync llms.txt content stats)
#    9. update-stats.sh                     (README + stats.json)
#   10. extract-build-perf.mjs              (build perf trend dashboard)
#   11. verify dashboard freshness          (mtime gate, DNA #43)
#   12. validate-spore-data.py              (SSOT consistency check)
#
# 失敗策略：
#   - cwd 不在 git toplevel  → auto cd
#   - working tree dirty    → auto stash + pop（不再 skip pull）
#   - git pull 真失敗       → hard abort（需人類介入）
#   - 任何資料源失敗         → soft skip，心跳繼續用昨天的 cache
#
# 呼叫者：
#   - HEARTBEAT.md Beat 1（「執行 資料更新 pipeline」）
#   - ~/.claude/scheduled-tasks/semiont-heartbeat/SKILL.md（每日 09:37）
#   - .claude/skills/heartbeat/SKILL.md（/heartbeat 命令）
#   - .claude/skills/twmd-refresh/SKILL.md（/twmd-refresh 命令）
#
# 詳見：docs/pipelines/DATA-REFRESH-PIPELINE.md
# 2026-04-11 session ε 建造
# 2026-05-02 γ-late: 加 i18n-coverage + verify freshness (DNA #43)
# 2026-05-08 laughing-goldstine: Phase 0 SSOT cleanup
#   - cwd assertion（防 main repo 跑 worktree 跑混淆）
#   - git-dirty 改 auto-stash（不再 silent skip pull）
#   - 步驟編號 1-12 整數化（移除 2.5/2.7/2.8/2.9/3.5/4.5/5.5 decimals）

set -o pipefail

# ────────────────── cwd assertion (Phase 0) ──────────────────
# 過去 bug: 從 main repo 路徑跑 pipeline 時 worktree 落後 N 個 commit
# → 寫 stale dashboard JSON → 報錯 OVERDUE 數字
TOPLEVEL="$(git rev-parse --show-toplevel 2>/dev/null)"
if [ -z "$TOPLEVEL" ]; then
  echo "❌ Not in a git repo — refresh-data.sh requires git toplevel" >&2
  exit 2
fi
if [ "$(pwd)" != "$TOPLEVEL" ]; then
  cd "$TOPLEVEL"
  echo "ℹ️ cd → $TOPLEVEL"
fi

GRN='\033[0;32m'
YEL='\033[0;33m'
RED='\033[0;31m'
DIM='\033[0;90m'
RST='\033[0m'

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}🧬 資料更新 Pipeline${RST}"
echo -e "${DIM}   $(git rev-parse --abbrev-ref HEAD) @ $(git rev-parse --short HEAD)${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"
echo ""

# ────────────────── Step 1 — Git sync ──────────────────
# Phase 0 重寫: 不再 silent skip pull on dirty
# - working tree dirty → auto-stash + pop
# - git pull 真失敗     → hard abort
echo -e "${GRN}[1/12]${RST} Git sync..."

DIRTY=0
if [ -n "$(git status --porcelain)" ]; then
  DIRTY=1
  STASH_LABEL="refresh-data-auto-$(date +%s)"
  if git stash push -m "$STASH_LABEL" --include-untracked >/dev/null 2>&1; then
    echo -e "${DIM}   stashed local changes ($STASH_LABEL)${RST}"
  else
    echo -e "${RED}❌ stash failed — aborting pipeline${RST}"
    exit 2
  fi
fi

PULL_OK=1
if ! git pull --rebase origin main 2>&1 | tail -5; then
  PULL_OK=0
fi

if [ "$DIRTY" = "1" ]; then
  if git stash pop >/dev/null 2>&1; then
    echo -e "${DIM}   restored stashed changes${RST}"
  else
    echo -e "${YEL}⚠️ stash pop conflict — local changes still in 'git stash list' (label: $STASH_LABEL)${RST}"
    echo -e "${YEL}   manual fix: git stash pop / git stash drop${RST}"
  fi
fi

if [ "$PULL_OK" = "0" ]; then
  echo -e "${RED}❌ git pull failed — aborting pipeline${RST}"
  echo -e "${YEL}   人類介入：檢查 merge conflict / detached HEAD / network${RST}"
  exit 2
fi
echo -e "${DIM}   ✓ HEAD now $(git rev-parse --short HEAD)${RST}"
echo ""

# ────────────────── Step 2 — three-source sense fetch ──────────────────
# Soft fail: 任何 source 失敗用昨天 cache
echo -e "${GRN}[2/12]${RST} 三源感知抓取..."
if bash scripts/tools/fetch-sense-data.sh 2>&1 | grep -E '^\[|^   [✅⚠️❌]|^📁|^[✅⚠️❌]' | tail -20; then
  true
else
  echo -e "${YEL}⚠️  fetch-sense-data 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 3 — sync _translations.json from translatedFrom frontmatter ──────────────────
# 為什麼: file-level translatedFrom 是 SSOT，_translations.json 是 derived cache
echo -e "${GRN}[3/12]${RST} sync _translations.json from frontmatter..."
if python3 scripts/tools/sync-translations-json.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ _translations.json synced${RST}"
fi
echo ""

# ────────────────── Step 4 — extract structured spore metrics ──────────────────
# 為什麼: 「最後 harvest」column 是 narrative SSOT，「7d 觸及」等 structured columns
# 沒 auto-derive → dashboard generator 看 structured 列為主，narrative 寫對了仍判 OVERDUE。
# DNA #15「反覆浮現要儀器化」第 N+5 instantiation。
# Phase 4 候選: 等 Spore SSOT 重構完成後此 step + extract-spore-metrics.py 一起移除
echo -e "${GRN}[4/12]${RST} extract structured spore metrics from narrative..."
if python3 scripts/tools/extract-spore-metrics.py --apply 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ structured metrics derived${RST}"
else
  echo -e "${YEL}⚠️  extract-spore-metrics 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 5 — generate dashboard-spores.json ──────────────────
# 為什麼: 繁殖器官的 data-driven 感知；Dashboard 孢子面板資料源
echo -e "${GRN}[5/12]${RST} generate dashboard-spores.json..."
if python3 scripts/tools/generate-dashboard-spores.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ dashboard-spores.json generated${RST}"
else
  echo -e "${YEL}⚠️  generate-dashboard-spores 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 6 — generate dashboard-i18n.json ──────────────────
# 為什麼: UI 字串覆蓋率 dashboard 之前 12 小時 stale，原因是這個生成步驟沒進 refresh pipeline
echo -e "${GRN}[6/12]${RST} generate dashboard-i18n.json (UI string coverage)..."
if bash scripts/tools/i18n-coverage-audit.sh --json-out public/api/dashboard-i18n.json 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ dashboard-i18n.json generated${RST}"
else
  echo -e "${YEL}⚠️  i18n-coverage-audit 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 7 — prebuild dashboard data ──────────────────
echo -e "${GRN}[7/12]${RST} npm run prebuild..."
if npm run prebuild > /tmp/prebuild.log 2>&1; then
  tail -6 /tmp/prebuild.log
  echo -e "${DIM}   ✓ dashboard JSON 已重生${RST}"
else
  echo -e "${YEL}⚠️  prebuild 失敗 — Beat 1 會標記 build-broken (P0)${RST}"
  tail -15 /tmp/prebuild.log
fi
rm -f /tmp/prebuild.log
echo ""

# ────────────────── Step 8 — refresh public/llms.txt content stats ──────────────────
# 為什麼: llms.txt 是 LLM training pipeline 的 robots.txt-equivalent，必須跟 dashboard-vitals 同步
echo -e "${GRN}[8/12]${RST} refresh public/llms.txt content stats..."
if python3 scripts/tools/refresh-llms-txt.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ llms.txt 已同步 dashboard-vitals${RST}"
else
  echo -e "${YEL}⚠️  refresh-llms-txt 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 9 — GitHub stats ──────────────────
echo -e "${GRN}[9/12]${RST} GitHub stats..."
if bash scripts/tools/update-stats.sh > /tmp/stats.log 2>&1; then
  tail -5 /tmp/stats.log
  echo -e "${DIM}   ✓ README/stats 已刷新${RST}"
else
  echo -e "${YEL}⚠️  update-stats 失敗 — 跳過，stats 保持昨天${RST}"
  tail -5 /tmp/stats.log
fi
rm -f /tmp/stats.log
echo ""

# ────────────────── Step 10 — extract build perf trend ──────────────────
# 為什麼: 12 天內 per-page render time 漲 70%（98ms → 167ms）沒人發現，因為 build 效能不在 dashboard freshness check 範圍
echo -e "${GRN}[10/12]${RST} extract build perf trend..."
if node scripts/core/extract-build-perf.mjs --runs 30 2>&1 | tail -5; then
  echo -e "${DIM}   ✓ dashboard-build-perf.json updated${RST}"
else
  echo -e "${YEL}⚠️  extract-build-perf 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 11 — verify dashboard freshness ──────────────────
# DNA #43: 每個 public/api/dashboard-*.json 都必須有今天的 mtime，否則 generator 漏跑了
echo -e "${GRN}[11/12]${RST} verify dashboard freshness..."
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

# ────────────────── Step 12 — spore data SSOT validation ──────────────────
# 為什麼: dashboard freshness 只看 mtime，不檢查 spore 解析正確性
# 過去 generator parser bug (K suffix) silent fail → views_latest=null but mtime fresh
echo -e "${GRN}[12/12]${RST} spore data SSOT validation..."
if python3 scripts/tools/validate-spore-data.py 2>&1 | tail -4 | head -3; then
  echo -e "${DIM}   ✓ spore data validation passed${RST}"
else
  echo -e "${RED}⚠️  spore data validation reported issues — see above${RST}"
fi
echo ""

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}🧬 資料更新 pipeline 完成${RST}"
echo -e "${DIM}下一步：HEARTBEAT.md Beat 1 診斷${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"
