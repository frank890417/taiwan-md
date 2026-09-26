---
title: 'DATA-REFRESH-PIPELINE'
description: '資料更新 pipeline — git pull + 三源感知 + prebuild + GitHub stats，Heartbeat Beat 1 前置 (v2.2)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v2.2'
last_updated: 2026-09-27
last_session: '2026-09-27-twmd-self-evolve-weekly（收官必跑 verify-commit-scope --head，自動清 pathspec commit 的索引殘影）'
sister_docs:
  - 'STATS-PIPELINE.md'
  - 'DASHBOARD-PIPELINE.md'
  - 'SENSE-FETCHER-SETUP.md'
  - 'SENSE-FETCHER-MIGRATION.md'
upstream_canonical:
  - '../semiont/HEARTBEAT.md'
  - '../semiont/SENSES.md'
  - '../semiont/ROUTINE.md'
---

# DATA-REFRESH-PIPELINE — 資料更新 Pipeline v2.0

> **第一性原理**：每次心跳開始前的唯一資料刷新點。把四個散落的更新步驟 hoist 成一條 pipeline，HEARTBEAT 裡只要寫一行「執行資料更新 pipeline」。
>
> v2.0 設計理由：對齊 [REWRITE-PIPELINE v5.0](REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](MAINTAINER-PIPELINE.md) spine restoration。修補 v1.1 結構問題：(1) 缺 ASCII spine box-frame；(2) Hard Gate（Step 10/11/12 是 gate）散在 prose；(3) Top 5 最常忘沒提取。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         DATA-REFRESH-PIPELINE — 資料更新 14 step                         │
│                                                                          │
│   🧭 失敗策略                                                            │
│            ├── cwd 不在 git toplevel → auto cd                           │
│            ├── working tree dirty → auto-stash + pop                     │
│            ├── git pull 真失敗 → hard abort（人類介入）                  │
│            └── 任何資料源失敗 → soft skip（用昨天 cache）                │
│                                                                          │
│   📍 一鍵入口: bash scripts/tools/refresh-data.sh                        │
│                                                                          │
│   ──── 14 step 主流程 ──────────────────────────────────────             │
│                                                                          │
│   Step 1: git sync ──→ auto-stash + rebase pull                          │
│              ↳ Hard gate: cwd assertion + dirty tree auto-stash          │
│                                                                          │
│   Step 2-6: 三源感知 ──→ fetch + sync + spores + i18n + immune          │
│            ├── Step 2 fetch-sense-data → dashboard-analytics.json        │
│            ├── Step 3 sync-translations-json → _translations.json        │
│            ├── Step 4 generate-dashboard-spores → dashboard-spores.json  │
│            ├── Step 5 i18n-coverage-audit → dashboard-i18n.json          │
│            └── Step 6 generate-dashboard-immune → dashboard-immune.json  │
│                       (v2 6-dim score; wired 2026-05-28 修補 11d stale)  │
│                                                                          │
│   Step 7: npm run prebuild ──→ sync.sh + 12 prebuild:* parallel          │
│            ├── prebuild:sync (NEW 2026-05-12): scripts/core/sync.sh       │
│            │   knowledge/ → src/content/{lang}/ projection (gitignored)   │
│            └── prebuild:* parallel: 12 dashboard JSON / search / OG regen │
│                                                                          │
│   Step 8-10: stats + perf                                                │
│            ├── Step 8 refresh-llms-txt → public/llms.txt                 │
│            ├── Step 9 update-stats → README + stats.json                 │
│            └── Step 10 extract-build-perf → dashboard-build-perf.json    │
│                                                                          │
│   Step 11: verify dashboard freshness ──→ REFLEXES #43 gate              │
│            └── 每個 public/api/dashboard-*.json 有今天的 mtime           │
│              ↳ Hard gate: stale = generator 漏跑（silent failure）       │
│                                                                          │
│   Step 12: validate-spore-data ──→ 5 SSOT consistency check              │
│              ↳ Hard gate: SSOT 不一致 → 阻 ship                          │
│                                                                          │
│   Step 13: sync-spore-links ──→ 從 SSOT regen knowledge sporeLinks       │
│              ↳ Hard gate: 不要手寫 knowledge sporeLinks（會被覆蓋）      │
│                                                                          │
│   Step 14: generate-reports-index ──→ regen reports/INDEX.md             │
│            └── 9 type bucket × 月份 雙軸索引 (per audit Layer 3)         │
│              ↳ Soft fail OK (心跳繼續)                                   │
│                                                                          │
│   ✅ Data refreshed → HEARTBEAT Beat 1 可開始                            │
│                                                                          │
│   ──── 跨 pipeline boundary ─────────────────────────                   │
│   → SENSE-FETCHER-SETUP.md（一次性憑證設定，非執行流程）                │
│   → SENSE-FETCHER-MIGRATION.md（跨機器搬遷指南）                        │
│   → STATS-PIPELINE.md（archived，本檔 Step 9 取代）                     │
│   → DASHBOARD-PIPELINE.md（Step 7 prebuild 結果消費）                   │
│   → SPORE-HARVEST-PIPELINE.md（Step 4 + 12 + 13 從 SSOT 重生）          │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                        | 觸發 step  | 條件                       | 工具                                  | 不過 = ?                     |
| --------------------------- | ---------- | -------------------------- | ------------------------------------- | ---------------------------- |
| cwd assertion               | Step 1     | 每次 refresh               | `cd $(git rev-parse --show-toplevel)` | refresh-data.sh wrapper 內建 |
| Dirty tree auto-stash       | Step 1     | working tree dirty         | `git stash push --include-untracked`  | auto handle                  |
| git pull rebase 成功        | Step 1     | sync 階段                  | `git pull --rebase origin main`       | hard abort（人類介入）       |
| 三源 sense-fetch 200        | Step 2     | fetch GA/SC/CF             | per-source HTTP check                 | soft skip + LESSONS entry    |
| immune v2 6-dim regen       | Step 6     | every refresh              | `generate-dashboard-immune.py`        | Step 11 freshness gate catch |
| Dashboard fresh             | Step 11    | 整個 refresh 後            | mtime + analytics `lastUpdated` check | REFLEXES #43 silent failure  |
| validate-spore-data 5 check | Step 12    | SSOT consistency           | `validate-spore-data.py`              | 阻 ship + 修補               |
| sync-spore-links 從 SSOT    | Step 13    | knowledge sporeLinks regen | `sync-spore-links.py`                 | drift = manual override      |
| 不手寫 knowledge sporeLinks | 全程       | knowledge/\*.md            | manual                                | 會被 Step 12 覆蓋            |
| pre-commit hook             | git commit | refresh result commit      | `.husky/pre-commit`                   | 修補後重 commit              |
| commit 範圍＋索引殘影       | commit 後  | 每次收官（尤其 pathspec）  | `lib/verify-commit-scope.sh --head N` | 範圍錯＝停；殘影自動 reset   |

---

## ⚠️ Top 5 最常忘的 step

> 從 REFLEXES #43 silent failure + REFLEXES #38 SSOT drift + 5/8 Phase 0/5/6 cleanup + ROUTINE refresh-am/pm 半夜重排抽 friction 最高的 5 條。

1. **Step 1 git sync auto-stash + pop 流程** — 不是「dirty 就 skip pull」，而是 stash + pull + pop（避免 silent stale base）
2. **Step 6 generate-dashboard-immune.py** — 2026-05-28 wire 修補 5/17 silent stale 11 天；任何新 `public/api/dashboard-*.json` generator 都要在這層 wire（rule of thumb：新 generator 沒進 refresh-data.sh = Step 11 gate 馬上 catch，但 catch ≠ fix）
3. **Step 7 npm run prebuild 含 8 個 JSON regen** — 不只是 dashboard data，articles / translations / vitals / organism / supporters 全部 regen
4. **Step 11 verify dashboard freshness gate** — REFLEXES #43 silent failure detection，每個 dashboard-\*.json 必須今天的 mtime，analytics 另驗內容日期；Step 11 catch 之後 routine 不准只 spawn chip，必須當 cycle wire 進來
5. **Step 12 validate-spore-data 5 checks** — SSOT consistency gate，不過不准 ship
6. **Step 13 sync-spore-links 從 SSOT regen** — 不要手寫 knowledge sporeLinks，會被覆蓋（REFLEXES #38 SSOT drift）

---

## 跨檔案職責分工

| 檔案                                                              | 範圍                                                                                          |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **本檔**                                                          | refresh-data.sh 14 step 主流程（每次心跳 / routine refresh-am+pm 必跑）                       |
| [SENSE-FETCHER-SETUP.md](SENSE-FETCHER-SETUP.md)                  | 一次性憑證設定（GA4 + SC + CF 三源），不是執行流程                                            |
| [SENSE-FETCHER-MIGRATION.md](SENSE-FETCHER-MIGRATION.md)          | 跨機器搬遷指南（A → B），不是執行流程                                                         |
| [STATS-PIPELINE.md](STATS-PIPELINE.md)                            | archived（本檔 Step 9 update-stats.sh 取代）— 只保留 3 條 update-stats.sh 鐵律參考            |
| [DASHBOARD-PIPELINE.md](DASHBOARD-PIPELINE.md)                    | Step 7 prebuild 結果的消費端（dashboard.template.astro）                                      |
| [SPORE-HARVEST-PIPELINE.md](../factory/SPORE-HARVEST-PIPELINE.md) | Step 4 + 12 + 13 從 SPORE-HARVESTS SSOT 重生                                                  |
| [ROUTINE.md](../semiont/ROUTINE.md)                               | `twmd-data-refresh-am` / `-pm` cron 排程（cadence 見 ROUTINE.md §排程表，本檔不落 cron 數字） |
| [HEARTBEAT.md Beat 1 §0](../semiont/HEARTBEAT.md#beat-1--診斷)    | 觸發點（每次心跳開始前）                                                                      |

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

這個 wrapper 依序跑下面 **14 個步驟**（編號以 `refresh-data.sh` 頭註為準；6.5 是 fork-census rider step）。

**失敗策略**：

- cwd 不在 git toplevel → auto cd（防 worktree vs main repo 混淆）
- working tree dirty → auto-stash + pop（不再 silent skip pull）
- git pull 真失敗 → hard abort（人類介入）
- 任何資料源失敗 → soft skip，心跳繼續用昨天的 cache

**Step 11（verify dashboard freshness）** 是 2026-05-02 γ-late 加的閘門 — 跑完後檢查每個 `public/api/dashboard-*.json` 都有今天的 mtime；`dashboard-analytics.json` 另驗 `lastUpdated` 的齡（≤ 24h，含時區換算；2026-09-18 起不再跟本機日期字串比對——`lastUpdated` 是 UTC，台北 00:00–08:00 跑的每一輪都會撞「昨天」的假警報，09-08／09-09／09-18 三次確認後改尺），若內容被後段流程覆回舊快照就從 fresh sense cache 當場重生。mtime 只能證明檔案被碰過，不能單獨證明內容新鮮。任何 stale 表示有 generator 漏跑或後段覆寫（REFLEXES #43）。

**catch ≠ fix 鐵律**（2026-05-28 誕生；2026-07-05 從 twmd-refresh skill 殼收編 canonical，per dna-audit §S5 業務規則不長殼層）：freshness gate **第 2 次連續 catch 同一個 stale dashboard JSON，必須當 cycle wire fix**——識別 generator → 確認/補 wire 進 refresh-data.sh → commit heal——不准再 spawn chip 推給下個 session。背景：dashboard-immune.json 5/17→5/28 共 11 天 silent stale、22+ cycle 連續 catch 沒 fix，是「Micro mode 不擴張 scope」推 chip 過頭的教訓。

**Scheduler live-state dump（session 層 rider，2026-07-05 dna-audit §S1 根治第一塊磚）**：refresh session（skill 層）每日呼叫 `mcp__scheduled-tasks__list_scheduled_tasks` → `routine-live-normalize.py` 落 `docs/semiont/routine-live-state.json` 進 git。這步**不在 refresh-data.sh**（bash 進不了 MCP server store），是 twmd-refresh skill 的 session 步驟。下游：`routine-sync-check.py` v3 用它做 SSOT ↔ mirror ↔ live 三層比對（enabled / cron / description-時間字樣），dump 超過 48h 未更新自動標 stale——spore-pick/publish disabled 21 天而 SSOT 還列實驗中的 v2.9 重演，從此有每日黃燈。

| Step   | 內容                                                                                   | Output                                                       |
| ------ | -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1      | git sync (auto-stash + rebase pull)                                                    | (sync)                                                       |
| 2      | fetch-sense-data.sh                                                                    | dashboard-analytics.json                                     |
| 3      | sync-translations-json.py                                                              | knowledge/\_translations.json                                |
| 4      | generate-spore-records.py + generate-dashboard-spores.py (SPORE-HARVESTS body primary) | spores.json + dashboard-spores.json                          |
| 5      | i18n-coverage-audit.sh                                                                 | dashboard-i18n.json                                          |
| 6      | generate-dashboard-immune.py (6-dim immune score v2)                                   | dashboard-immune.json                                        |
| 6.5    | fork-census.py radar（子代普查，riding flywheel per FORK-CENSUS-PIPELINE）             | reports/fork-census/registry.json                            |
| 7      | npm run prebuild                                                                       | dashboard-articles/translations/vitals/organism + supporters |
| 8      | refresh-llms-txt.py                                                                    | public/llms.txt                                              |
| 9      | update-stats.sh                                                                        | README + stats.json                                          |
| 10     | extract-build-perf.mjs                                                                 | dashboard-build-perf.json                                    |
| **11** | **verify dashboard freshness** (REFLEXES #43 gate)                                     | (mtime + analytics content gate)                             |
| **12** | **validate-spore-data.py** (5 checks)                                                  | (SSOT consistency gate)                                      |
| **13** | **sync-spore-links.py**                                                                | (regen knowledge/\*.md sporeLinks from SSOT)                 |
| 14     | generate-reports-index.py                                                              | reports/INDEX.md                                             |

**Removed in Phase 6 (2026-05-08)**: Old Step 4 `extract-spore-metrics.py` — narrative→struct workaround for SPORE-LOG 成效追蹤 (which itself is now demolished). 47 historical D+N data points migrated to `batch-historical-2026-05-08-migration.md` as canonical SSOT.

---

## 步驟詳解

> （以下細節解說對應 script 步驟，編號以 `refresh-data.sh` 為準；本段是背景說明非執行入口——執行入口只有 §一鍵執行 的 wrapper。）

### Git 同步（script Step 1 — sync with origin）

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

### 三源感知抓取（script Step 2 — sense fetcher）

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

### 404 監測記帳（script Step 2.5 — monitor-404，2026-07-17 新增）

```bash
python3 scripts/tools/monitor-404.py --days 1
```

緊接三源感知之後跑（soft fail，同其他步驟）。對 CF 前一日全部 404 做 resolution-based 分家族（slug-variant / cross-lang-slug / untranslated-demand / renamed / scanner / stale-asset / …），寫 `reports/404-monitor/{state,latest}.json`（committed 記帳），alerts 由 `generate-dashboard-alerts.mjs` 讀入。**看訊號時的鐵律**：可解析家族（前四類）是我們能修的債；scanner / probe 是背景噪音，混在同一個總率裡讀 = 混維度（REFLEXES #38）。`untranslated-demand` 是讀者用 404 投票的翻譯需求排行，babel 排優先序時應參考。誕生背景：[reports/404-root-cause-2026-07-17.md](../../reports/404-root-cause-2026-07-17.md)。

---

### Prebuild dashboard 數據（script Step 7 — rebuild static JSON）

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

**為什麼**：Step 2 只刷新「三源感知」（分析數據），prebuild（script Step 7）刷新「內容派生數據」（從 knowledge/\*.md 產生的 JSON）。兩者是正交的，都要跑。

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

### GitHub 統計更新（script Step 9 — contributor / star counts）

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

- **Routine 排程**：`twmd-data-refresh-am` / `-pm` 兩個 routine 自動呼叫全 pipeline（cadence 見 [ROUTINE.md §排程表](../semiont/ROUTINE.md)，本檔不落 cron 數字）
- **Heartbeat**：`/heartbeat`（手動或排程觸發）Beat 1 第一步呼叫這條 pipeline

多個入口，共用同一條 pipeline。

---

_v1.0 | 2026-04-11 session ε | 建立原因：哲宇觀察到 heartbeat 三處重複定義資料抓取步驟_
_v1.1 | 2026-05-02 γ-late | 加 Step 2.9 (i18n-coverage) + Step 5 (verify freshness)。觸發：哲宇看 dashboard 顯示「資料更新 12 小時前」+ ja UI 還是 97%（其實已 100%），原因是 i18n-coverage-audit 沒在 refresh-data.sh 裡。canonical: REFLEXES #43 silent stale risk._
_v1.2 | 2026-05-08 laughing-goldstine | Phase 0 SSOT cleanup — cwd assertion + auto-stash 取代 silent skip pull + 步驟編號 1-12 整數化。觸發：/twmd-refresh 從 main repo 路徑跑 worktree pipeline 寫 stale dashboard，加上 git-dirty false positive 雙 bug。canonical: reports/spore-ssot-pipeline-cleanup-2026-05-08.md Phase 0._
_v1.3 | 2026-05-08 laughing-goldstine | Phase 6 SSOT cleanup (Q1 翻牌：demolish 雙寫) — drop Step 4 (extract-spore-metrics.py)，generator 改吃 SPORE-HARVESTS body table 為 primary。SPORE-LOG 成效追蹤 deprecated/demolished。47 歷史 D+N 數據已 migrate 到 batch-historical-{date}-migration.md。Step total 13 → 12。Validator checks 8 → 5。_

_v2.0 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（12 step box-frame + 失敗策略 + 跨 pipeline boundary）+ Hard Gate Inventory 集中 table（9 gates）+ Top 5 最常忘 step（Step 1 stash + pop / Step 6 prebuild 含 8 JSON / Step 10-12 gate trio）+ 跨檔案職責分工 standalone table（明確跟 SENSE-FETCHER 兩條 setup/migration doc 性質不同）。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier A.6 audit。12 step 詳述 prose body 不動（已是最健康的 pipeline，refactor ROI 主要在 navigation）。_

_v2.1 | 2026-07-05 2026-07-05-120817-dna-audit — 步數統一 14（script 實體 14 步為準；spine 標題 13、職責分工表與 §一鍵執行「12」全數對齊）+ §一鍵執行表補齊 14 列（immune / fork-census 6.5 rider / reports-index 三步入表，verify freshness 對回 Step 11）+ §步驟詳解 加「編號以 refresh-data.sh 為準、本段是背景說明」擋頭並把四個舊 Step 1-4 標題改 script 實際編號（prebuild=7 / stats=9）+ cron 數字全撤（04:14 / 00:33 / 08:17 / 09:37 → cadence 一律指 ROUTINE.md §排程表，本檔不落 cron 數字）+ refresh-data.sh echo [N/13] 殘留統一 [N/14]。觸發：reports/dna-pipeline-evolution-audit-2026-07-05.md §4.4。_

## 新 dashboard JSON 加入 pipeline 的 SOP（REFLEXES #43 反射）

每次新增 `public/api/dashboard-*.json` 時必須同步：

1. 寫一個 generator script（python / node / bash 都行）
2. **加進 refresh-data.sh** — 找一個適當的 step 號碼（對照 refresh-data.sh 現行 14 步編號）
3. 加進 [DATA-REFRESH-PIPELINE.md §一鍵執行](#一鍵執行) 表格
4. Step 11 verify freshness gate 會自動偵測 — 如果忘記加 generator，下次跑 pipeline 會看到 stale 警告

**收官後必跑 `bash scripts/tools/lib/verify-commit-scope.sh --head <預期檔數>`**（2026-09-27 self-evolve-weekly）：用 `git commit -- <paths>` 收官能避開平行 babel 把自己的檔掃走，代價是 lint-staged 在暫存索引上改完 prettier 後，原索引留著格式化前的 blob（`git status` 呈 `MM`），下一個不帶 pathspec 的 commit 會把它帶進 git。`--head` 現在會把「工作樹 == HEAD 而索引 != HEAD」的本 commit 檔 reset 回 HEAD，工作樹不動。09-24 本 routine 與 embeddings 同一早各留一次、09-25 再一次（REFLEXES #100 (e)）。

**反模式**: 寫了 generator 但只在 commit 之前手動跑一次。下次 generator 就被遺忘了。所有 dashboard JSON 必須有自動 refresh path。
