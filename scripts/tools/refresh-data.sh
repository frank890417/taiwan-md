#!/usr/bin/env bash
# refresh-data.sh — 心跳用的單一資料刷新入口
#
# 14 個步驟（v2026-05-28 加 Step 6 generate-dashboard-immune.py，per dashboard-immune-wiring-2026-05-28，
# 修補 5/17 → 5/28 11 天 silent stale）：
#    1. Git sync                            (auto-stash + pull, hard abort on failure)
#    2. fetch-sense-data.sh                 (CF + GA4 + SC + dashboard-analytics merge)
#       + monitor-404.py (Step 2.5)         (全流量 404 常駐監測 — resolution-based 分類，
#                                            2026-07-17 加，per 14.99% hreflang 死連結根因追查)
#    3. sync-translations-json.py           (sync _translations.json from frontmatter SSOT)
#    4. generate-spore-records.py           (spores.json 完整記錄層 — 2026-06-10 解耦)
#       + generate-dashboard-spores.py      (spore dashboard from SPORE-HARVESTS body — Phase 6 primary)
#    5. i18n-coverage-audit.sh              (UI string coverage dashboard)
#    6. generate-dashboard-immune.py        (免疫系統 6-dim v2 score — wire 修補 5/17 silent stale)
#    7. npm run prebuild                    (dashboard-vitals/organism/articles/translations)
#    8. refresh-llms-txt.py                 (sync llms.txt content stats)
#    9. update-stats.sh                     (README + stats.json)
#   10. extract-build-perf.mjs              (build perf trend dashboard)
#   11. verify dashboard freshness          (mtime gate, REFLEXES #43)
#   12. validate-spore-data.py              (SSOT consistency check)
#   13. sync-spore-links.py                 (regen knowledge/*.md sporeLinks identity pointer;
#                                            v2 2026-06-10 — metrics 已移居 spores.json，
#                                            文章只在新孢子發布時才有 diff)
#   14. generate-reports-index.py           (regen reports/INDEX.md; per audit Layer 3)
#
# Removed in Phase 6 (2026-05-08):
#   - extract-spore-metrics.py — workaround for narrative→struct gap, no longer needed
#     (SPORE-LOG 成效追蹤 deprecated; SPORE-HARVESTS body is canonical)
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
# 2026-05-02 γ-late: 加 i18n-coverage + verify freshness (REFLEXES #43)
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
echo -e "${GRN}[1/14]${RST} Git sync..."

# --no-sync（2026-10-10 data-refresh-am）：babel 等平行寫手正在改工作樹時，
# auto-stash 會把它寫到一半的檔案收走。10-03／10-08／10-09／10-10 四班都靠手拼
# runner（本檔 1–76 行接 117 行之後）跳過這一步；改成旗標。只在本機不落後
# origin/main 時才准跳，落後就停，免得在舊底座上產儀表板。
if [ "${1:-}" = "--no-sync" ]; then
  git fetch -q origin main 2>/dev/null
  BEHIND=$(git rev-list --count HEAD..origin/main 2>/dev/null || echo "?")
  if [ "$BEHIND" != "0" ]; then
    echo -e "${RED}❌ --no-sync 但本機落後 origin/main ${BEHIND} 個 commit — 拒絕在舊底座上刷新${RST}"
    exit 2
  fi
  echo -e "${DIM}   --no-sync：跳過 stash＋pull（本機與 origin/main 同步，工作樹留給平行寫手）${RST}"
  echo ""
else

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
fi

# ────────────────── Step 2 — three-source sense fetch ──────────────────
# Soft fail: 任何 source 失敗用昨天 cache
echo -e "${GRN}[2/14]${RST} 三源感知抓取..."
if bash scripts/tools/fetch-sense-data.sh 2>&1 | grep -E '^\[|^   [✅⚠️❌]|^📁|^[✅⚠️❌]' | tail -20; then
  true
else
  echo -e "${YEL}⚠️  fetch-sense-data 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 2.5 — 全流量 404 常駐監測 ──────────────────
# 為什麼: 2026-07-17 查明 14.99% CF 404 率根因是站體自己吐的 13,014 條 hreflang
# 死連結（已修，commit f369f3c8e）。既有 analyze-crawler-404.py 只看 10 個
# crawler UA allowlist，人類 404 結構性看不見。monitor-404.py 看全部流量，
# resolution-based 分類（不是猜 regex），輸出 reports/404-monitor/latest.json
# 給 Step 7 之後的 generate-dashboard-alerts.mjs 讀 alerts。單步失敗不擋 pipeline。
echo -e "${GRN}[2.5/14]${RST} 全流量 404 常駐監測 (monitor-404.py)..."
if python3 scripts/tools/monitor-404.py --days 1 2>&1 | tail -20; then
  echo -e "${DIM}   ✓ reports/404-monitor/{state,latest}.json 已更新${RST}"
else
  echo -e "${YEL}⚠️  monitor-404 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 3 — sync _translations.json from translatedFrom frontmatter ──────────────────
# 為什麼: file-level translatedFrom 是 SSOT，_translations.json 是 derived cache
echo -e "${GRN}[3/14]${RST} sync _translations.json from frontmatter..."
if python3 scripts/tools/sync-translations-json.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ _translations.json synced${RST}"
fi
echo ""

# ────────────────── Step 4 — generate spore records + dashboard-spores.json ──────────────────
# 為什麼: 繁殖器官的 data-driven 感知；Dashboard 孢子面板資料源
# Phase 6: SPORE-HARVESTS body table 為 primary (SPORE-LOG 成效追蹤 deprecated)
# 2026-06-10 解耦: spores.json = 孢子完整記錄層（metrics + history），文章 frontmatter
# 只剩 identity pointer — harvest 回填從此只動 spores.json，不再碰 knowledge/*.md
# (reports/spore-data-architecture-2026-06-10.md / REFLEXES #43 新 JSON 進 refresh)
echo -e "${GRN}[4/14]${RST} generate spore records + dashboard-spores.json..."
if python3 scripts/tools/generate-spore-records.py 2>&1 | tail -2; then
  echo -e "${DIM}   ✓ spores.json records generated${RST}"
else
  echo -e "${YEL}⚠️  generate-spore-records 部分失敗 — 心跳繼續${RST}"
fi
if python3 scripts/tools/generate-dashboard-spores.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ dashboard-spores.json generated${RST}"
else
  echo -e "${YEL}⚠️  generate-dashboard-spores 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 5 — generate dashboard-i18n.json ──────────────────
# 為什麼: UI 字串覆蓋率 dashboard 之前 12 小時 stale，原因是這個生成步驟沒進 refresh pipeline
echo -e "${GRN}[5/14]${RST} generate dashboard-i18n.json (UI string coverage)..."
if bash scripts/tools/i18n-coverage-audit.sh --json-out public/api/dashboard-i18n.json 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ dashboard-i18n.json generated${RST}"
else
  echo -e "${YEL}⚠️  i18n-coverage-audit 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 6 — generate dashboard-immune.json ──────────────────
# 為什麼: 免疫系統 6-dim v2 score generator existed since 2026-05-17 but never wired into refresh pipeline.
# Step 11 freshness gate caught 5/17 → 5/28 (11 days) silent stale across 22+ consecutive cycles.
# Wire here between i18n + prebuild so npm prebuild can consume IMMUNE_V2 flag downstream.
echo -e "${GRN}[6/14]${RST} generate dashboard-immune.json (6-dim immune score v2)..."
if python3 scripts/core/generate-dashboard-immune.py 2>&1 | tail -5; then
  echo -e "${DIM}   ✓ dashboard-immune.json generated${RST}"
else
  echo -e "${YEL}⚠️  generate-dashboard-immune 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 6.5 — fork-census radar (繁殖感知層) ──────────────────
# 為什麼: GA 漏水雷達偵測野外活著的 fork → registry.json；隨後 Step 7 prebuild 的
# generate-dashboard-forks.py 投影成公開 dashboard-forks.json。riding data-refresh
# flywheel 不另開 cron (per FORK-CENSUS-PIPELINE.md)。新子代印 🆕 → escalate OBSERVER-QUEUE。
echo -e "${GRN}[6.5/14]${RST} fork-census radar (子代普查)..."
if python3 scripts/tools/fork-census.py 2>&1 | tail -4; then
  echo -e "${DIM}   ✓ registry.json 更新（🆕 NEW sightings = 新子代 → OBSERVER-QUEUE）${RST}"
else
  echo -e "${YEL}⚠️  fork-census 失敗（GA 掛?）— 心跳繼續，registry 留舊值${RST}"
fi
echo ""

# ────────────────── Step 6.6 — dashboard-status.json (🩺 營運狀態 board) ──────────────────
# 為什麼: /dashboard 新 section「🩺 營運狀態」讀 routine-live-state.json ×
# docs/semiont/memory/ fire 痕跡 + babel progress jsonl + alerts + gh run list，
# 投影成 status.claude.com 式狀態板。跟 Step 6 immune 同款：先在這裡跑一次讓
# 資料在 Step 7 之前就新鮮（也已掛進 prebuild:dashboard chain，Step 7 會再跑一次，
# 冪等無害）。per reports/design-dashboard-status-section-2026-07-24.md §六。
echo -e "${GRN}[6.6/14]${RST} generate dashboard-status.json (routine + babel 營運狀態)..."
if node scripts/core/generate-dashboard-status.mjs 2>&1 | tail -5; then
  echo -e "${DIM}   ✓ dashboard-status.json generated${RST}"
else
  echo -e "${YEL}⚠️  generate-dashboard-status 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 7 — prebuild dashboard data ──────────────────
echo -e "${GRN}[7/14]${RST} npm run prebuild..."
if npm run prebuild > /tmp/prebuild.log 2>&1; then
  tail -6 /tmp/prebuild.log
  echo -e "${DIM}   ✓ dashboard JSON 已重生${RST}"
else
  echo -e "${YEL}⚠️  prebuild 失敗 — Beat 1 會標記 build-broken (P0)${RST}"
  tail -15 /tmp/prebuild.log
  # OG 圖只在本機 public/og-images（gitignored），但 run-p 會在它失敗時停掉所有平行兄弟，
  # 連帶 vitals/organism/translations 與後面的 search/latest/redirects 都沒跑（2026-11-06 早班）。
  # 這裡只救儀表板：清單從 package.json 取，不複寫。npm run build 的 OG 閘門不變。
  if grep -q 'ERROR: "prebuild:og" exited' /tmp/prebuild.log; then
    echo -e "${YEL}   ↻ 失敗的是 prebuild:og，跳過它重跑其餘 prebuild（OG 圖今天未更新）${RST}"
    REST_CMD=$(node -e "const m=require('./package.json').scripts.prebuild.match(/run-p ([^&]+?) &&(.*)\$/);console.log('npx run-p '+m[1].split(/\s+/).filter(x=>x&&x!=='prebuild:og').join(' ')+' &&'+m[2])")
    if bash -c "$REST_CMD" > /tmp/prebuild-rest.log 2>&1; then
      echo -e "${DIM}   ✓ 其餘 prebuild 完成，dashboard JSON 已重生${RST}"
    else
      echo -e "${YEL}⚠️  略過 OG 後 prebuild 仍失敗${RST}"
      tail -15 /tmp/prebuild-rest.log
    fi
    rm -f /tmp/prebuild-rest.log
  fi
fi
rm -f /tmp/prebuild.log
echo ""

# ────────────────── Step 8 — refresh public/llms.txt content stats ──────────────────
# 為什麼: llms.txt 是 LLM training pipeline 的 robots.txt-equivalent，必須跟 dashboard-vitals 同步
echo -e "${GRN}[8/14]${RST} refresh public/llms.txt content stats..."
if python3 scripts/tools/refresh-llms-txt.py 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ llms.txt 已同步 dashboard-vitals${RST}"
else
  echo -e "${YEL}⚠️  refresh-llms-txt 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 9 — GitHub stats ──────────────────
echo -e "${GRN}[9/14]${RST} GitHub stats..."
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
echo -e "${GRN}[10/14]${RST} extract build perf trend..."
if node scripts/core/extract-build-perf.mjs --runs 30 2>&1 | tail -5; then
  echo -e "${DIM}   ✓ dashboard-build-perf.json updated${RST}"
else
  echo -e "${YEL}⚠️  extract-build-perf 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 10b — newsroom 編輯台看板 ──────────────────
# 為什麼: /semiont/newsroom 公開編輯台（2026-07-16 誕生）從階段產物 derive per-article 進度；
# 漏跑 = 看板凍結在舊現況（Step 11 freshness gate 會抓）
echo -e "${GRN}[10b/14]${RST} generate newsroom board..."
if python3 scripts/core/generate-newsroom-data.py --quiet 2>&1 | tail -2; then
  echo -e "${DIM}   ✓ dashboard-newsroom.json updated${RST}"
else
  echo -e "${YEL}⚠️  generate-newsroom-data 失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 11 — verify dashboard freshness ──────────────────
# REFLEXES #43: 每個 public/api/dashboard-*.json 都必須有今天的 mtime，否則 generator 漏跑了。
# dashboard-analytics 另驗 lastUpdated；mtime 只能證明檔案被碰過，不能證明 fresh
# sense cache 最終留在檔內。若 prebuild / parallel actor 把內容覆回舊快照，當場重生。
# lastUpdated 是 UTC 時戳，這裡用「齡 ≤ 24h」判斷而不是跟本機日期字串比對：
# 台北 00:00-08:00 之間 UTC 還是前一天，日期字串永遠不等，data-refresh-am 06:13
# 每輪都會撞假警報（2026-09-08 / 09-09 / 09-18 三次確認後改尺）。
echo -e "${GRN}[11/14]${RST} verify dashboard freshness..."
TODAY=$(date +%Y-%m-%d)
# lastUpdated 由 generate-dashboard-analytics.py 寫成 UTC ISO timestamp（+00:00）；
# 拿它跟本地 $TODAY 比較會在 UTC/本地跨日窗口（本地清晨、UTC 仍是前一天）誤報 stale。
# 2026-09-08 / 2026-09-09 / 2026-09-10 連三個 cycle 撞見同一假警報（vc=3），
# 依 pipeline 自身「catch ≠ fix」鐵律，本次改用 UTC 日期比較根治，不再只現查繞開。
TODAY_UTC=$(date -u +%Y-%m-%d)
STALE_COUNT=0
STALE_LIST=""

ANALYTICS_FILE="public/api/dashboard-analytics.json"
# 印出 lastUpdated 的日期供訊息用；齡判斷另由 analytics_age_ok 做
analytics_date() {
  python3 -c 'import json,sys; print((json.load(open(sys.argv[1])).get("lastUpdated") or "")[:10])' "$1" 2>/dev/null || true
}
# exit 0 = lastUpdated 距現在 ≤ 24h（含時區換算）；缺欄位 / 解析失敗 = exit 1
analytics_age_ok() {
  python3 - "$1" <<'PY'
import json, sys
from datetime import datetime, timezone
try:
    raw = json.load(open(sys.argv[1])).get("lastUpdated") or ""
    ts = datetime.fromisoformat(raw.replace("Z", "+00:00"))
    if ts.tzinfo is None:
        ts = ts.replace(tzinfo=timezone.utc)
    age_h = (datetime.now(timezone.utc) - ts).total_seconds() / 3600
    sys.exit(0 if 0 <= age_h <= 24 else 1)
except Exception:
    sys.exit(1)
PY
}
ANALYTICS_DATE=$(analytics_date "$ANALYTICS_FILE")
if ! analytics_age_ok "$ANALYTICS_FILE"; then
  echo -e "${YEL}⚠️  dashboard-analytics content stale (lastUpdated ${ANALYTICS_DATE:-missing}，齡 > 24h) — rerun sense-cache merge${RST}"
  python3 scripts/tools/generate-dashboard-analytics.py >/tmp/dashboard-analytics-step11.log 2>&1 || true
  ANALYTICS_DATE=$(analytics_date "$ANALYTICS_FILE")
  if ! analytics_age_ok "$ANALYTICS_FILE"; then
    STALE_COUNT=$((STALE_COUNT + 1))
    STALE_LIST="$STALE_LIST   ❌ dashboard-analytics.json — lastUpdated ${ANALYTICS_DATE:-missing} (UTC today=$TODAY_UTC)\n"
  else
    echo -e "${DIM}   ✓ dashboard-analytics 已從 fresh sense cache 重生${RST}"
  fi
  rm -f /tmp/dashboard-analytics-step11.log
fi

# dashboard-build-perf 同理：mtime 是今天、內容卻可能是 GitHub API 回的幾週前舊頁
# （2026-08-21／09-02／09-18／09-19／09-30 五次都以 status:ok 過關）。generator 自驗
# 最新 run 的年齡後寫 status，這裡讀它。
BUILDPERF_STATUS=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1])).get("status",""))' public/api/dashboard-build-perf.json 2>/dev/null || echo "unreadable")
if [ "$BUILDPERF_STATUS" != "ok" ]; then
  STALE_COUNT=$((STALE_COUNT + 1))
  STALE_LIST="$STALE_LIST   ❌ dashboard-build-perf.json — status=${BUILDPERF_STATUS:-missing}（內容不是最新 deploy run）\n"
fi

for f in public/api/dashboard-*.json; do
  [ -f "$f" ] || continue
  MTIME_DATE=$(stat -f "%Sm" -t "%Y-%m-%d" "$f" 2>/dev/null || stat -c "%y" "$f" 2>/dev/null | cut -d' ' -f1)
  if [ "$MTIME_DATE" != "$TODAY" ]; then
    STALE_COUNT=$((STALE_COUNT + 1))
    STALE_LIST="$STALE_LIST   ❌ $(basename $f) — mtime $MTIME_DATE\n"
  fi
done
if [ "$STALE_COUNT" -eq 0 ]; then
  echo -e "${DIM}   ✓ 全部 $(ls public/api/dashboard-*.json | wc -l | tr -d ' ') 個 dashboard JSON 都是今天 mtime；analytics content=$ANALYTICS_DATE${RST}"
else
  echo -e "${RED}❌ $STALE_COUNT 個 dashboard 不是今天 mtime（generator 漏跑了？）${RST}"
  echo -e "$STALE_LIST"
  echo -e "${YEL}   修復: 把對應的 generator 加進 refresh-data.sh${RST}"
fi
echo ""

# ────────────────── Step 12 — spore data SSOT validation ──────────────────
# 為什麼: dashboard freshness 只看 mtime，不檢查 spore 解析正確性
# 過去 generator parser bug (K suffix) silent fail → views_latest=null but mtime fresh
echo -e "${GRN}[12/14]${RST} spore data SSOT validation..."
if python3 scripts/tools/validate-spore-data.py 2>&1 | tail -4 | head -3; then
  echo -e "${DIM}   ✓ spore data validation passed${RST}"
else
  echo -e "${RED}⚠️  spore data validation reported issues — see above${RST}"
fi
echo ""

# ────────────────── Step 13 — sync sporeLinks (v2 identity-only) ──────────────────
# 為什麼: knowledge/*.md sporeLinks 過去人類手寫，drift from SPORE-LOG (identity SSOT)。
# Phase 3 之後是 derived view；v2 (2026-06-10) 之後只剩 identity pointer（id/platform/
# date/url），metrics 住 spores.json — 本步驟平日應為 no-op，只在新孢子發布日有 diff。
echo -e "${GRN}[13/14]${RST} sync sporeLinks identity pointers (regen from spore-log.json)..."
if python3 scripts/tools/sync-spore-links.py --apply 2>&1 | tail -3; then
  echo -e "${DIM}   ✓ sporeLinks synced${RST}"
else
  echo -e "${YEL}⚠️  sync-spore-links 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# ────────────────── Step 13 — regen reports/INDEX.md ──────────────────
# 為什麼: reports/ 頂層 *.md 散落 113+ files / 沒分類沒索引（per audit Layer 3 高 leverage
# 解 grep noise 90%）。每日 regen 讓 INDEX 始終新鮮，不搬家不破壞 239 既有 reference。
# Script 為 idempotent — 沒改變則 INDEX content 一樣。
echo -e "${GRN}[14/14]${RST} regen reports/INDEX.md..."
if python3 scripts/tools/generate-reports-index.py 2>&1 | tail -2; then
  echo -e "${DIM}   ✓ reports/INDEX.md 更新（per audit Layer 3）${RST}"
else
  echo -e "${YEL}⚠️  reports/INDEX.md regen 失敗 — 心跳繼續${RST}"
fi
echo ""

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}🧬 資料更新 pipeline 完成${RST}"
echo -e "${DIM}下一步：HEARTBEAT.md Beat 1 診斷${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"
