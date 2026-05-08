# DATA-REFRESH-PIPELINE — 資料更新 Pipeline

> 每次心跳開始前的唯一資料刷新點。把四個散落的更新步驟 hoist 成一條 pipeline，這樣 HEARTBEAT 裡只要寫一行「執行 **資料更新 pipeline**」就好。
>
> 2026-04-11 session ε 建立，源自哲宇觀察：scheduled-tasks / /heartbeat / HEARTBEAT.md 三處各自重複抄寫相同的資料抓取步驟，容易 drift。現在集中到這一份文件。

---

## 為什麼需要這條 pipeline

之前的狀況：

- `~/.claude/scheduled-tasks/semiont-heartbeat/SKILL.md` 在 Step 0 自己跑 `git pull` + `npm run prebuild`
- `.claude/skills/heartbeat/SKILL.md` 在 Step 1 提到 `cat dashboard-vitals.json` 但沒說怎麼重生
- `docs/semiont/HEARTBEAT.md` Beat 1 §1b 提到跑 `fetch-sense-data.sh`
- `docs/pipelines/STATS-PIPELINE.md` 另外定義 `update-stats.sh`
- `docs/pipelines/DASHBOARD-PIPELINE.md` 定義 prebuild 子流程

四處有四個版本的「資料更新步驟」，每次修一個忘記同步另外三個。

**這條 pipeline 取代全部四個散落的定義**。

---

## 一鍵執行

```bash
bash scripts/tools/refresh-data.sh
```

這個 wrapper 依序跑下面 **12 個步驟**（Phase 0 SSOT cleanup 後 2026-05-08 整數化編號）。

**失敗策略**：

- cwd 不在 git toplevel → auto cd（防 worktree vs main repo 混淆）
- working tree dirty → auto-stash + pop（不再 silent skip pull）
- git pull 真失敗 → hard abort（人類介入）
- 任何資料源失敗 → soft skip，心跳繼續用昨天的 cache

**Step 11（verify dashboard freshness）** 是 2026-05-02 γ-late 加的閘門 — 跑完後檢查每個 `public/api/dashboard-*.json` 都有今天的 mtime。任何 stale 表示有 generator 漏跑（DNA #43）。

| Step   | 內容                                                                | Output                                                       |
| ------ | ------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1      | git sync (auto-stash + rebase pull)                                 | (sync)                                                       |
| 2      | fetch-sense-data.sh                                                 | dashboard-analytics.json                                     |
| 3      | sync-translations-json.py                                           | knowledge/\_translations.json                                |
| 4      | generate-dashboard-spores.py (Phase 6: SPORE-HARVESTS body primary) | dashboard-spores.json                                        |
| 5      | i18n-coverage-audit.sh                                              | dashboard-i18n.json                                          |
| 6      | npm run prebuild                                                    | dashboard-articles/translations/vitals/organism + supporters |
| 7      | refresh-llms-txt.py                                                 | public/llms.txt                                              |
| 8      | update-stats.sh                                                     | README + stats.json                                          |
| 9      | extract-build-perf.mjs                                              | dashboard-build-perf.json                                    |
| **10** | **verify dashboard freshness** (DNA #43 gate)                       | (mtime gate)                                                 |
| **11** | **validate-spore-data.py** (5 checks)                               | (SSOT consistency gate)                                      |
| **12** | **sync-spore-links.py**                                             | (regen knowledge/\*.md sporeLinks from SSOT)                 |

**Removed in Phase 6 (2026-05-08)**: Old Step 4 `extract-spore-metrics.py` — narrative→struct workaround for SPORE-LOG 成效追蹤 (which itself is now demolished). 47 historical D+N data points migrated to `batch-historical-2026-05-08-migration.md` as canonical SSOT.

---

## 步驟詳解

### Step 1 — Git 同步（sync with origin）

```bash
# auto cwd assertion (Phase 0)
cd "$(git rev-parse --show-toplevel)"

# auto-stash if dirty
[ -n "$(git status --porcelain)" ] && git stash push -m "refresh-data-auto-$(date +%s)" --include-untracked

# always attempt pull
git pull --rebase origin main

# auto-pop stash
git stash pop  # if stashed
```

**為什麼**：心跳必須在最新 main 上跑，否則會把舊狀態誤診成「今天的 baseline」。另外，scheduled-tasks 在使用者睡覺時跑，此時可能有別的 session 已經 push 過東西。

**Phase 0 改動（2026-05-08 laughing-goldstine）**：

- **cwd assertion**：過去從 main repo 路徑跑 worktree pipeline 會寫 stale dashboard，現在強制 cd 到 git toplevel。
- **改 auto-stash**：過去 `git diff-index --quiet HEAD --` 在 clean worktree 仍會回非零（filemode bits / submodule / index lock），導致 silent skip pull。現在 dirty 也跑 stash + pull + pop，pull 失敗才 hard abort。

**如果失敗**：merge conflict / detached HEAD / network 失敗 → hard abort 並標記「需要人類介入」。stash pop conflict → 警告但繼續，local changes 留在 `git stash list` 等手動處理。

---

### Step 2 — 三源感知抓取（sense fetcher）

```bash
bash scripts/tools/fetch-sense-data.sh
```

這個 wrapper 本身會跑四件事（已經內建的 consolidation）：

1. **`fetch-cloudflare.py --days $CF_DAYS`**（預設 7 天）
   - 拉 edge traffic：`httpRequests1dGroups`（requests, uniques, threats, countries, 404 rate）
   - 拉 AI crawler breakdown：`httpRequestsAdaptiveGroups` 用 userAgent 維度逐日 loop 過去 7 天
   - 寫 `~/.config/taiwan-md/cache/cloudflare-latest.json`
2. **`fetch-ga4.py --days $GA4_DAYS`**（預設 28 天）
   - Google Analytics Data API：active users / page views / top pages / traffic sources / countries / 404 events
   - Uses venv at `~/.config/taiwan-md/venv/` (stdlib can't auth GA4)
   - 寫 `~/.config/taiwan-md/cache/ga4-latest.json`
3. **`fetch-search-console.py --days $SC_DAYS`**（預設 7 天）
   - Search Console API：queries / pages / countries / devices（帶 CTR / avg position）
   - 同樣用 venv
   - 寫 `~/.config/taiwan-md/cache/search-console-latest.json`
4. **`generate-dashboard-analytics.py`**
   - Merge 三份 cache → `public/api/dashboard-analytics.json`
   - Dedup GA top pages by normalized path
   - Export SC word cloud 前 150 個 queries
   - Export CF 7d traffic totals + AI crawler breakdown
   - Export GA topArticles7d (regex filter 只留文章路徑)

**如果任何一個 source 失敗**：wrapper 繼續跑其他 source。在 Beat 1 診斷時會標記「CF/GA4/SC 其中一個是昨天的 stale 資料」。

**憑證位置**：`~/.config/taiwan-md/credentials/`（repo 外，物理上無法 commit）。
**憑證設定**：見 [SENSE-FETCHER-SETUP.md](./SENSE-FETCHER-SETUP.md)。
**遷移到新電腦**：見 [SENSE-FETCHER-MIGRATION.md](./SENSE-FETCHER-MIGRATION.md)。

---

### Step 3 — Prebuild dashboard 數據（rebuild static JSON）

```bash
npm run prebuild
```

展開來：

```
node scripts/core/generate-api.js             # articles.json, article-index.json, categories
node scripts/core/generate-map-markers.js     # map-markers.json
node scripts/core/build-search-index.mjs      # search index (lunr)
node scripts/core/generate-dashboard-data.js  # dashboard-articles/vitals/organism/translations
node scripts/core/generate-changelog-data.js  # changelog-feed.json
```

**為什麼**：Step 2 只刷新「三源感知」（分析數據），Step 3 刷新「內容派生數據」（從 knowledge/\*.md 產生的 JSON）。兩者是正交的，都要跑。

**產出的檔案**：

| 檔案                                 | 誰讀它              | 心跳需要它做什麼                       |
| ------------------------------------ | ------------------- | -------------------------------------- |
| `public/api/dashboard-vitals.json`   | HEARTBEAT Beat 1    | 8 器官分數 + 文章數 + contributor 數   |
| `public/api/dashboard-organism.json` | HEARTBEAT Beat 1    | 各器官子分數（詳細診斷）               |
| `public/api/dashboard-articles.json` | HEARTBEAT Beat 1/2  | 全部文章 + healthScore（找最差的重寫） |
| `public/api/articles.json`           | 前端 + 部分 scripts | 文章索引                               |
| `public/api/article-index.json`      | Smart 404 + search  | 搜尋入口                               |

**如果失敗**：`tail -20` 錯誤訊息，標記 build-broken，其他步驟照跑（dashboard 會是 stale 但心跳還能診斷其他東西）。

---

### Step 4 — GitHub 統計更新（contributor / star counts）

```bash
bash scripts/tools/update-stats.sh
```

這個腳本做：

1. 從 GitHub API 抓 stars / forks
2. 從 `.all-contributorsrc` 讀貢獻者數（比 `gh api /contributors` 更準，不受 pagination 影響）
3. 算 zh / en 頁面數
4. 更新 `README.md` 統計表格 + `src/i18n/about.ts` + `public/api/stats.json`

**⚠️ 注意**：這個腳本 **絕對不能** 動 `about.template.astro`（歷史事故：曾經破壞 Sponsors + Contact 區塊三次）。貢獻者 grid 是分開管理的。

**如果失敗**：通常是 `gh api` rate limit 或 offline。stderr 警告，跳過，stats 保持昨天的數字。

---

## 成功判準

pipeline 跑完之後，以下檔案應該都有「今天」的 mtime：

```bash
ls -l \
  ~/.config/taiwan-md/cache/cloudflare-latest.json \
  ~/.config/taiwan-md/cache/ga4-latest.json \
  ~/.config/taiwan-md/cache/search-console-latest.json \
  public/api/dashboard-analytics.json \
  public/api/dashboard-vitals.json \
  public/api/dashboard-organism.json \
  public/api/stats.json
```

有任何一個檔案 mtime 不是今天 = 那個 source 失敗了。心跳在 Beat 1 開始前應該檢查這個。

---

## Failure 策略（soft-fail by default）

| 步驟         | 失敗會怎樣                     | 心跳該怎麼處理                                           |
| ------------ | ------------------------------ | -------------------------------------------------------- |
| git pull     | conflict / detached HEAD       | **Hard abort** — 標記「需要人類介入」，不繼續心跳        |
| CF fetch     | token expired / rate limit     | Soft skip — 用昨天的 cloudflare cache，Beat 1 標記 stale |
| GA4 fetch    | service account perms / quota  | Soft skip — 用昨天 cache                                 |
| SC fetch     | API 變動 / cache 讀不到        | Soft skip — 用昨天 cache                                 |
| prebuild     | knowledge/ 有 frontmatter 壞掉 | Soft skip + 在報告裡標記 build-broken（這會變成 P0）     |
| update-stats | GitHub API rate limit          | Soft skip — 最不重要，stats 可以下次再更新               |

**規則**：只有 git 層級的失敗會 hard abort。所有的資料源失敗都是 soft skip，因為心跳的價值不是「全部資料都新鮮」，是「盡可能看到最新狀態，然後誠實標記哪些是 stale」。

---

## scripts/tools/refresh-data.sh（wrapper 本體）

完整實作見 [`scripts/tools/refresh-data.sh`](../../scripts/tools/refresh-data.sh)（避免文件 vs 程式碼 drift）。

舊版（Phase 0 前，2026-04-11 → 2026-05-08）參考：

```bash
#!/usr/bin/env bash
# DEPRECATED — see scripts/tools/refresh-data.sh for current 12-step pipeline
# 此 snippet 只保留歷史參照（git-dirty silent skip bug 的 footprint）

set -o pipefail
cd "$(git rev-parse --show-toplevel 2>/dev/null || pwd)"

GRN='\033[0;32m'; YEL='\033[0;33m'; RED='\033[0;31m'; DIM='\033[0;90m'; RST='\033[0m'

echo -e "${DIM}═══════════════════════════════════${RST}"
echo -e "${GRN}🧬 資料更新 Pipeline${RST}"
echo -e "${DIM}═══════════════════════════════════${RST}"

# Step 1 — git sync (HARD ABORT on conflict)
# ⚠️ Phase 0 修掉的 bug: git diff-index --quiet HEAD -- 在 clean worktree 仍會回非零
# → silent skip pull → stale dashboard data
echo -e "${GRN}[1/4]${RST} Git sync..."
if git diff-index --quiet HEAD -- 2>/dev/null; then
  git pull --rebase origin main 2>&1 | tail -5
  PULL_EXIT=${PIPESTATUS[0]}
  if [ "$PULL_EXIT" != "0" ]; then
    echo -e "${RED}❌ git pull failed — aborting pipeline${RST}"
    echo -e "${YEL}   人類介入：檢查 merge conflict 或 detached HEAD${RST}"
    exit 2
  fi
else
  echo -e "${YEL}⚠️  working tree dirty — skipping git pull${RST}"
  echo -e "${DIM}   心跳繼續，但注意：可能在舊 base 上診斷${RST}"
fi
echo ""

# Step 2 — three-source sense fetch (soft fail)
echo -e "${GRN}[2/4]${RST} 三源感知抓取..."
if bash scripts/tools/fetch-sense-data.sh 2>&1 | grep -E '^(\[|✅|⚠️|❌|📡|📁)' | tail -15; then
  true
else
  echo -e "${YEL}⚠️  fetch-sense-data 部分失敗 — 心跳繼續${RST}"
fi
echo ""

# Step 3 — prebuild dashboard data (soft fail)
echo -e "${GRN}[3/4]${RST} npm run prebuild..."
if npm run prebuild 2>&1 | tail -10; then
  echo -e "${GRN}   ✅ dashboard JSON 已重生${RST}"
else
  echo -e "${YEL}⚠️  prebuild 失敗 — Beat 1 會標記 build-broken (P0)${RST}"
fi
echo ""

# Step 4 — GitHub stats (soft fail)
echo -e "${GRN}[4/4]${RST} GitHub stats..."
if bash scripts/tools/update-stats.sh 2>&1 | tail -5; then
  echo -e "${GRN}   ✅ README/stats 已刷新${RST}"
else
  echo -e "${YEL}⚠️  update-stats 失敗 — 跳過，stats 保持昨天${RST}"
fi
echo ""

echo -e "${GRN}🧬 資料更新 pipeline 完成${RST}"
echo -e "${DIM}下一步：HEARTBEAT.md Beat 1 診斷${RST}"
```

---

## 這條 pipeline 取代了什麼

| 之前散落的地方                                                | 之前寫的步驟                                      | 取代後                                    |
| ------------------------------------------------------------- | ------------------------------------------------- | ----------------------------------------- |
| `~/.claude/scheduled-tasks/semiont-heartbeat/SKILL.md` Step 0 | `git pull` + `npm run prebuild`                   | 呼叫這條 pipeline                         |
| `.claude/skills/heartbeat/SKILL.md` Step 0/1                  | 手動 cat dashboard JSON（但沒說怎麼重生）         | 呼叫這條 pipeline                         |
| `docs/semiont/HEARTBEAT.md` Beat 1 §1b                        | `bash scripts/tools/fetch-sense-data.sh --days 1` | 改成「執行 資料更新 pipeline」            |
| `docs/pipelines/STATS-PIPELINE.md`                            | 完整流程（88 行）                                 | 縮成一句「被 DATA-REFRESH-PIPELINE 取代」 |

---

## 每日 cron schedule

這條 pipeline **本身不是 cron**。它是被呼叫的。

- **每日 08:17**：`fetch-sense-data.sh` 透過 launchd agent 自動跑（只跑 sense fetch，不跑全 pipeline，因為早上不需要 commit）
- **每日 09:37**：`~/.claude/scheduled-tasks/semiont-heartbeat/` 觸發 Claude session，讀 HEARTBEAT.md，Beat 1 第一步呼叫這條 pipeline
- **手動 `/heartbeat`**：使用者叫喚醒時，走同一條路

三個入口，共用同一條 pipeline。

---

_v1.0 | 2026-04-11 session ε | 建立原因：哲宇觀察到 heartbeat 三處重複定義資料抓取步驟_
_v1.1 | 2026-05-02 γ-late | 加 Step 2.9 (i18n-coverage) + Step 5 (verify freshness)。觸發：哲宇看 dashboard 顯示「資料更新 12 小時前」+ ja UI 還是 97%（其實已 100%），原因是 i18n-coverage-audit 沒在 refresh-data.sh 裡。canonical: DNA #43 silent stale risk._
_v1.2 | 2026-05-08 laughing-goldstine | Phase 0 SSOT cleanup — cwd assertion + auto-stash 取代 silent skip pull + 步驟編號 1-12 整數化。觸發：/twmd-refresh 從 main repo 路徑跑 worktree pipeline 寫 stale dashboard，加上 git-dirty false positive 雙 bug。canonical: reports/spore-ssot-pipeline-cleanup-2026-05-08.md Phase 0._
_v1.3 | 2026-05-08 laughing-goldstine | Phase 6 SSOT cleanup (Q1 翻牌：demolish 雙寫) — drop Step 4 (extract-spore-metrics.py)，generator 改吃 SPORE-HARVESTS body table 為 primary。SPORE-LOG 成效追蹤 deprecated/demolished。47 歷史 D+N 數據已 migrate 到 batch-historical-{date}-migration.md。Step total 13 → 12。Validator checks 8 → 5。_

## 新 dashboard JSON 加入 pipeline 的 SOP（DNA #43 反射）

每次新增 `public/api/dashboard-*.json` 時必須同步：

1. 寫一個 generator script（python / node / bash 都行）
2. **加進 refresh-data.sh** — 找一個適當的 step 號碼（2.x 子階段或 3 後）
3. 加進 [DATA-REFRESH-PIPELINE.md §一鍵執行](#一鍵執行) 表格
4. Step 5 verify 會自動偵測 — 如果忘記加 generator，下次跑 pipeline 會看到 stale 警告

**反模式**: 寫了 generator 但只在 commit 之前手動跑一次。下次 generator 就被遺忘了。所有 dashboard JSON 必須有自動 refresh path。
