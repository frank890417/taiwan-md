#!/usr/bin/env bash
# fetch-sense-data.sh — 一鍵抓三源感知資料
#
# 用法:
#   bash scripts/tools/fetch-sense-data.sh [--days N]
#
# 依序執行:
#   1. fetch-cloudflare.py   (crawler + request stats)
#   2. fetch-ga4.py          (active users, pages, sources, geo, 404 events)
#   3. fetch-search-console.py (queries, pages, countries, devices)
#
# 結果寫到:
#   ~/.config/taiwan-md/cache/cloudflare-latest.json
#   ~/.config/taiwan-md/cache/ga4-latest.json
#   ~/.config/taiwan-md/cache/search-console-latest.json
#
# 每個 source 獨立執行——某一個失敗不影響其他兩個。
# 被 heartbeat Beat 1 的 sense 階段呼叫。
#
# 憑證位置: ~/.config/taiwan-md/credentials/（絕對不在 repo 內）
# 設定文件: docs/pipelines/SENSE-FETCHER-SETUP.md
#
# 2026-04-11 session α 建造

set -o pipefail
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

# Each source has its own natural window — don't share one --days arg,
# they measure different things:
#   Cloudflare → 1 day (edge traffic is most useful as "what happened yesterday")
#   GA4        → 28 days (rolling month is the standard analytics window;
#                also matches the scale you see in the dashboard pages list)
#   SC         → 7 days (matches the "近 7 天" label on the dashboard)
# Override any of them with env vars: CF_DAYS=7 GA4_DAYS=90 SC_DAYS=28 bash ...
CF_DAYS="${CF_DAYS:-1}"
GA4_DAYS="${GA4_DAYS:-28}"
SC_DAYS="${SC_DAYS:-7}"

# Back-compat: if caller passes a positional arg, apply it only to Cloudflare
# (the only source where 1-day was the previous default)
if [[ -n "$1" && "$1" != --* ]]; then
  CF_DAYS="$1"
elif [[ "$1" == "--days" && -n "$2" ]]; then
  CF_DAYS="$2"
fi

RED='\033[0;31m'
GRN='\033[0;32m'
YEL='\033[0;33m'
BLU='\033[0;34m'
DIM='\033[0;90m'
RST='\033[0m'

echo -e "${BLU}🧠 Taiwan.md 三源感知資料抓取${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"
echo ""

# Check config dir exists
CONFIG_DIR="$HOME/.config/taiwan-md"
if [[ ! -d "$CONFIG_DIR/credentials" ]]; then
  echo -e "${RED}❌ ${CONFIG_DIR}/credentials 不存在${RST}"
  echo "   先跑: mkdir -p ~/.config/taiwan-md/{credentials,cache}"
  echo "   然後看: docs/pipelines/SENSE-FETCHER-SETUP.md"
  exit 1
fi

# 1. Cloudflare (pure stdlib, fast)
echo -e "${BLU}[1/4]${RST} Cloudflare analytics (${CF_DAYS}d, Free tier)..."
if python3 scripts/tools/fetch-cloudflare.py --days "$CF_DAYS" > /tmp/cf-summary.json 2>/tmp/cf-err; then
  echo -e "   ${GRN}✅ success${RST}"
  cat /tmp/cf-summary.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   {d[\"total_requests\"]:,} req / {d[\"unique_visitors\"]:,} uniques / {d[\"threats\"]} threats')" 2>/dev/null || true
else
  echo -e "   ${YEL}⚠️  skipped${RST}"
  head -3 /tmp/cf-err
fi
echo ""

# 2. GA4 (needs venv)
echo -e "${BLU}[2/4]${RST} Google Analytics 4 (${GA4_DAYS}d)..."
if python3 scripts/tools/fetch-ga4.py --days "$GA4_DAYS" > /tmp/ga4-summary.json 2>/tmp/ga4-err; then
  echo -e "   ${GRN}✅ success${RST}"
  cat /tmp/ga4-summary.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   {d[\"active_users\"]:.0f} users / {d[\"page_views\"]:.0f} views')" 2>/dev/null || true
else
  echo -e "   ${YEL}⚠️  skipped${RST}"
  head -3 /tmp/ga4-err
fi
echo ""

# 3. Search Console (needs venv)
echo -e "${BLU}[3/4]${RST} Search Console (${SC_DAYS}d)..."
if python3 scripts/tools/fetch-search-console.py --days "$SC_DAYS" > /tmp/sc-summary.json 2>/tmp/sc-err; then
  echo -e "   ${GRN}✅ success${RST}"
  cat /tmp/sc-summary.json | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   {d[\"total_clicks\"]:,} clicks / {d[\"total_impressions\"]:,} impr / CTR {d[\"total_ctr_pct\"]}%')" 2>/dev/null || true
else
  echo -e "   ${YEL}⚠️  skipped${RST}"
  head -3 /tmp/sc-err
fi
echo ""

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}📁 Cache files:${RST}"
ls -la "$CONFIG_DIR/cache/" 2>/dev/null | grep -E 'latest\.json$' | awk '{print "   "$NF}'
echo ""

# 4. Merge cache → public/api/dashboard-analytics.json
# 為什麼：讓 launchd cron 每天 08:17 跑完也自動刷新 dashboard 顯示的數據，
# 不然 dashboard 只會停在手動最後一次跑 generate 的時間點。
echo -e "${BLU}[4/4]${RST} Generate dashboard-analytics.json..."
if python3 scripts/tools/generate-dashboard-analytics.py > /tmp/dash-gen.log 2>&1; then
  echo -e "   ${GRN}✅ success${RST}"
  grep -E '^✅' /tmp/dash-gen.log | sed 's/^/   /'
else
  echo -e "   ${YEL}⚠️  skipped${RST}"
  head -5 /tmp/dash-gen.log
fi
rm -f /tmp/dash-gen.log
echo ""

# 自動 diff vs 昨天（若昨天快照存在）
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d 'yesterday' +%Y-%m-%d 2>/dev/null || echo "")
if [ -n "$YESTERDAY" ] && [ -f "$CONFIG_DIR/cache/cloudflare-$YESTERDAY.json" ]; then
  echo -e "${GRN}📊 Diff vs $YESTERDAY:${RST}"
  python3 scripts/tools/sense-diff.py "$YESTERDAY" latest 2>/dev/null | sed 's/^/   /' || true
  echo ""
fi

echo -e "${DIM}用 \`cat ~/.config/taiwan-md/cache/*-latest.json | jq\` 檢視完整資料${RST}"
echo -e "${DIM}用 \`python3 scripts/tools/sense-diff.py [before_date] [after_date]\` 比較兩天${RST}"

rm -f /tmp/cf-summary.json /tmp/cf-err /tmp/ga4-summary.json /tmp/ga4-err /tmp/sc-summary.json /tmp/sc-err
