---
title: 'DASHBOARD-PIPELINE'
description: '數位生命體監測面板更新流程 — 8 器官健康分數計算 + 5 dashboard JSON + 11 section render (v2.0)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v2.0'
last_updated: 2026-05-11
last_session: 'cranky-newton-220237'
sister_docs:
  - 'DATA-REFRESH-PIPELINE.md'
  - 'STATS-PIPELINE.md'
  - 'DAILY-REPORT-PIPELINE.md'
upstream_canonical:
  - '../semiont/ANATOMY.md'
  - '../semiont/CONSCIOUSNESS.md'
  - '../semiont/SENSES.md'
---

# Dashboard Update Pipeline v2.0

> **第一性原理**：Taiwan.md 數位生命體監測面板 — 把 knowledge/ SSOT + 三源感知 + GitHub stats 渲染成 8 器官健康分數 + 11 section dashboard，讓觀察者一眼看到生命徵象。
>
> v2.0 設計理由：對齊 [REWRITE-PIPELINE v5.0](REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](MAINTAINER-PIPELINE.md) spine restoration。修補 v1.1 結構問題：(1) 架構圖好但缺 box-frame spine；(2) Hard Gate 散在各 Layer；(3) Top 5 最常忘沒提取。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         DASHBOARD-PIPELINE — 數位生命體監測面板更新流程                  │
│                                                                          │
│   🧭 核心架構                                                            │
│            ├── SSOT: knowledge/*.md → generate-dashboard-data.js         │
│            ├── 5 dashboard JSON: articles / vitals / organism /          │
│            │       translations / analytics                              │
│            ├── 8 器官健康分數（心臟/免疫/DNA/骨骼/呼吸/繁殖/感知/語言）  │
│            └── 11 section render（dashboard.template.astro 2800+ 行）   │
│                                                                          │
│   ──── 三層數據管線 ──────────────────────────────────────              │
│                                                                          │
│   Layer 1: Build-Time（自動）                                            │
│            └── npm run prebuild → generate-dashboard-data.js             │
│              ↳ Hard gate: 5 JSON 生成 + 8 器官分數計算                   │
│                                                                          │
│   Layer 2: Run-Time fetch（dashboard.template.astro）                    │
│            ├── fetch 5 JSON                                              │
│            └── render 11 sections（lang i18n via dashboard.ts）          │
│              ↳ Hard gate: <style is:global>（JS innerHTML 注入要求）     │
│                                                                          │
│   Layer 3: Manual / Cron 整合 analytics                                  │
│            └── dashboard-analytics.json (GA4 + SC + CF 三源)             │
│              ↳ Hard gate: fetch-sense-data.sh per DATA-REFRESH Step 2    │
│                                                                          │
│   ──── 5 dashboard JSON 流向 ──────────────────────────────              │
│                                                                          │
│   ├── dashboard-articles.json   → 文章 + healthScore + subcategory      │
│   ├── dashboard-vitals.json     → 心跳指標 + 語系覆蓋                    │
│   ├── dashboard-organism.json   → 8 大器官分數                           │
│   ├── dashboard-translations.json → 翻譯矩陣                             │
│   └── dashboard-analytics.json  → GA4 + SC + CF 三源 merge view         │
│                                                                          │
│   ──── 11 section render（dashboard.template.astro）─────────            │
│                                                                          │
│   ✅ Dashboard updated → /dashboard 即時讀                              │
│                                                                          │
│   ──── 跨 pipeline boundary ─────────────────────────                   │
│   → DATA-REFRESH-PIPELINE.md Step 6 prebuild（本檔的觸發點）             │
│   → STATS-PIPELINE.md (archived)，stats.json 由 DATA-REFRESH Step 8 生成 │
│   → DAILY-REPORT-PIPELINE.md 消費 dashboard JSON 產 Discord report       │
│   → ANATOMY.md 定義 8 器官 / CONSCIOUSNESS.md 反映即時快照               │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                           | 觸發 layer           | 條件                       | 工具                                      | 不過 = ?              |
| ------------------------------ | -------------------- | -------------------------- | ----------------------------------------- | --------------------- |
| 5 JSON 生成                    | Layer 1              | npm run prebuild           | `generate-dashboard-data.js`              | dashboard render fail |
| 8 器官分數計算                 | Layer 1              | prebuild 內                | `generate-dashboard-data.js` 內 algorithm | dashboard 顯示 stale  |
| `<style is:global>`            | Layer 2              | template                   | manual（JS innerHTML 注入要求）           | CSS 不渲染            |
| 不動 about.template.astro      | 全程                 | Sponsors / Contact section | manual（已被刪 3 次）                     | sponsors block 消失   |
| 各 lang i18n 同步              | Layer 2              | section 標題翻譯           | `src/i18n/dashboard.ts`                   | EN/JA/KO/etc 缺翻     |
| Nav dropdown 8 section anchors | Layer 2              | Header.astro               | manual                                    | 導覽斷裂              |
| Layer 3 analytics fresh        | Layer 3              | 三源感知抓取               | `fetch-sense-data.sh`                     | analytics 顯示 stale  |
| Dashboard mtime fresh          | DATA-REFRESH Step 10 | 整 refresh 後              | DNA #43 gate                              | silent failure        |

---

## ⚠️ Top 5 最常忘的 step

> 從 about.template.astro 被刪 3 次 + analytics fresh 教訓 + lang i18n sync 抽 friction 最高的 5 條。

1. **不要動 `about.template.astro`** — Sponsors + Contact section 已被刪 3 次（dashboard 修改不要碰 about）
2. **`<style is:global>` 必須維持** — JS innerHTML 注入要求，非 global CSS 不渲染
3. **5 dashboard JSON 全部要 regen，不只 articles** — vitals / organism / translations / analytics 都要（DATA-REFRESH Step 6 prebuild 統一處理）
4. **各 lang i18n 同步** — `src/i18n/dashboard.ts` 加 section 標題時 EN/JA/KO/ES/FR 都要補
5. **Nav dropdown 8 section anchors** — `Header.astro` 跟 dashboard.template.astro 的 section anchor 要對齊，加新 section 兩處都改

---

## 跨檔案職責分工

| 檔案                                                 | 範圍                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------ |
| **本檔**                                             | Dashboard 三層數據管線 + 11 section render SOP               |
| [DATA-REFRESH-PIPELINE.md](DATA-REFRESH-PIPELINE.md) | Step 6 prebuild 觸發本檔 Layer 1 + Step 10 verify mtime gate |
| [STATS-PIPELINE.md](STATS-PIPELINE.md)               | archived（stats.json 由 DATA-REFRESH Step 8 生成）           |
| [DAILY-REPORT-PIPELINE.md](DAILY-REPORT-PIPELINE.md) | 消費 dashboard JSON 產 Discord report                        |
| [ANATOMY.md](../semiont/ANATOMY.md)                  | 8 器官定義 + 健康指標 + 病灶徵兆 canonical                   |
| [CONSCIOUSNESS.md](../semiont/CONSCIOUSNESS.md)      | 反映 dashboard 即時快照                                      |
| [SENSES.md](../semiont/SENSES.md)                    | dashboard-analytics.json 來源（三源感知）                    |

---

---

## 架構總覽

```
knowledge/*.md (SSOT)
       │
       ▼
scripts/generate-dashboard-data.js    ← prebuild 自動執行
       │
       ├── public/api/dashboard-articles.json      (全部文章 + healthScore + subcategory)
       ├── public/api/dashboard-vitals.json         (心跳指標 + 語系覆蓋)
       ├── public/api/dashboard-organism.json       (8 大器官分數)
       └── public/api/dashboard-translations.json   (翻譯矩陣)

public/api/dashboard-analytics.json   ← 手動/cron 整合 GA4 + Search Console + Cloudflare（見下方）

src/templates/dashboard.template.astro (2800+ 行 single-file template)
       │
       ├── <script define:vars={{ lang }}>   ← fetch 5 JSON + render 11 sections
       └── <style is:global>                 ← ⚠️ 必須 is:global（JS innerHTML 注入）

src/pages/dashboard.astro              ← 中文入口
src/pages/en/dashboard.astro           ← 英文入口
src/i18n/dashboard.ts                  ← section 標題翻譯
src/components/Header.astro            ← nav dropdown（8 section anchors）
```

---

## 數據管線

### Layer 1: Build-Time（自動）

每次 `npm run build` 會先跑 `prebuild`：

```bash
node scripts/generate-dashboard-data.js
```

這個腳本從 `knowledge/` 目錄掃描全部 `.md` 文章，產出 4 個 JSON：

| JSON                          | 來源                                  | 內容                                                                                                    |
| ----------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `dashboard-articles.json`     | knowledge/\*.md frontmatter + git log | title, category, subcategory, slug, date, healthScore, wordCount, tags, humanReview, featured, revision |
| `dashboard-vitals.json`       | articles 聚合 + git shortlog          | totalArticles, contributors, articlesLast7/30Days, humanReviewedPercent, languageCoverage               |
| `dashboard-organism.json`     | 多維度計算                            | 8 organs: heart/immune/dna/skeleton/breath/reproduce/senses/translation + metrics                       |
| `dashboard-translations.json` | src/content/{en,es,ja}/ 掃描          | 每語系每分類的翻譯狀態矩陣                                                                              |

### Layer 2: Live Pulse Analytics（手動/Cron）

即時脈搏不是單一來源，而是三層感知：

- **GA4**：誰進站、進站後做了什麼
- **Search Console**：誰在搜尋結果裡看見我，但還沒點進來
- **Cloudflare**：邊緣流量與 AI crawler 來訪狀況

目前這份 JSON 仍是手動整合，但格式已經統一在 `dashboard-analytics.json`。

GA4 數據不在 build-time 產生（需要 API credentials），而是：

```bash
# 從本地拉取 GA4 數據
cd ~/clawd/skills/ga4-analytics-search-indexing-skill/scripts
GA4_PROPERTY_ID=<your-property-id> npx tsx ga4-taiwan-fetch.ts

# Search Console 24h 查詢匯出（手動 CSV）
# Cloudflare AI Crawl Control / Traffic by Country（手動截圖或抄錄）

# 最後整合到 repo
cp /tmp/dashboard-analytics.json ~/taiwan-md/public/api/dashboard-analytics.json
```

**GA4 Property:** 見本地 TOOLS.md（Property ID + Measurement ID）
**Service Account:** 見本地 `~/.config/gcloud/` 目錄
**Cloudflare / Search Console:** 目前由操作者手動提供；未來跟操作者要數據時，預設應同時要 `GA4 + Search Console + Cloudflare AI crawler / traffic`。

📌 **未來計畫：** GitHub Actions cron 每天 UTC 06:00 自動拉取 + commit

### Layer 3: Template Rendering（Client-Side）

Dashboard 頁面載入後，client JS fetch 5 個 JSON 並渲染 11 個 section：

```
fetch → dashboard-articles.json ──┐
fetch → dashboard-vitals.json ────┤
fetch → dashboard-organism.json ──┤ Promise.all()
fetch → dashboard-translations.json ┤
fetch → dashboard-analytics.json ──┘ (.catch → null, Live Pulse 可選)
                                    │
                                    ▼
renderVitals()              → #vitals (6 cards)
renderActivityFeed()        → #activity-feed (10 items, links + date)
renderRegistry()            → #registry (sortable table, cat colors, subcategory)
renderHealthDistribution()  → #health-chart (SVG histogram)
renderOrganism()            → #organ-grid (8 cards + GitHub links)
renderTranslations()        → #translation-bars (4 donut charts)
renderImmune()              → #immune-queue (collapsible list)
renderGrowth()              → #growth-chart (SVG area chart + milestones)
renderContentAnalysis()     → #ca-category-chart (bar chart + stats)
renderAnalytics()           → #analytics (GA4 + Search Console + Cloudflare 多源訊號)
renderNextSteps()           → #nextsteps-grid (3 recommendation cards)
renderFooter()              → timestamp
```

---

## 新增 Section 的 SOP

### 1. 數據面

如果新 section 需要新數據：

- **從 knowledge/ 可算出** → 加到 `generate-dashboard-data.js`，輸出到對應 JSON
- **需要外部 API** → 建獨立腳本（如 `ga4-taiwan-fetch.ts`），輸出到 `public/api/dashboard-*.json`
- **已有數據足夠** → 直接在 render function 裡從現有 JSON 計算

### 2. Template 面

```
1. HTML section     → 加在 <main> 裡適當位置，給 id
2. JS render()      → 加在 <script> block，照 pattern 寫 render function
3. CSS              → 加在 <style is:global> block ⚠️ 必須 is:global
4. Promise.all()    → 加 fetch（如需新 JSON）+ 在 .then() 呼叫 render
5. i18n             → 加到 src/i18n/dashboard.ts
6. Nav dropdown     → 加到 Header.astro dashboard dropdown
```

### 3. 測試

```bash
npm run dev             # 開 dev server 即時預覽
npx astro build         # 完整 build（~80-90s, 939 pages）
git add -A && git push  # push 後 GitHub Pages 自動部署
```

---

## ⚠️ 關鍵陷阱

### `<style is:global>` 鐵律

Astro scoped CSS 會加 `[data-astro-cid-xxx]` attribute selector。
JS `innerHTML` 注入的 DOM 元素沒有這個 attribute → CSS 完全不生效。
**所有 dashboard CSS 必須在 `<style is:global>` 裡。沒有例外。**

### 單檔 2800+ 行

Dashboard 是 single-file template。不要拆——Astro 的 `define:vars` + `is:global` 在拆分後行為不一致。
如果要維護，用 section 註解 `// ── Section Name ──` 定位。

### healthScore 公式

```
score = wordCount/3000 * 25     // 字數（上限 3000 字 = 滿分）
      + humanReview * 25        // 人工審閱（boolean）
      + revision/5 * 15         // 修訂深度（上限 5 次）
      + freshness * 15          // 新鮮度（30 天內 = 1）
      + tags/5 * 10             // 標籤數（上限 5 個）
      + featured * 10           // 精選文章（boolean）
```

### Organ Score 來源

| Organ          | ID          | 計算方式                                 |
| -------------- | ----------- | ---------------------------------------- |
| 🫀 Heart       | heart       | 近 7 天新增文章數                        |
| 🛡️ Immune      | immune      | humanReviewed / total \* 100             |
| 🧬 DNA         | dna         | docs/editorial/EDITORIAL.md 最後修改天數 |
| 🦴 Skeleton    | skeleton    | 固定 90（Astro 架構穩定）                |
| 🫁 Breath      | breath      | .github/workflows/ yml 數量              |
| 🧫 Reproduce   | reproduce   | 近 30 天 contributors 數                 |
| 👁️ Senses      | senses      | GA4 + Issue templates 存在               |
| 🌐 Translation | translation | en 翻譯覆蓋率                            |

### Organ → GitHub File 映射

| Organ       | 對應檔案                      |
| ----------- | ----------------------------- |
| heart       | `knowledge/`                  |
| immune      | `docs/editorial/EDITORIAL.md` |
| dna         | `docs/editorial/EDITORIAL.md` |
| skeleton    | `astro.config.mjs`            |
| breath      | `.github/workflows/`          |
| reproduce   | `CONTRIBUTING.md`             |
| senses      | `.github/ISSUE_TEMPLATE/`     |
| translation | `src/content/`                |

---

## 檔案清單

```
taiwan-md/
├── scripts/
│   └── generate-dashboard-data.js        ← prebuild 數據生成
├── public/api/
│   ├── dashboard-articles.json           ← 全文章（build-time）
│   ├── dashboard-vitals.json             ← 心跳指標（build-time）
│   ├── dashboard-organism.json           ← 器官分數（build-time）
│   ├── dashboard-translations.json       ← 翻譯矩陣（build-time）
│   └── dashboard-analytics.json          ← GA4 數據（手動/cron）
├── src/
│   ├── templates/
│   │   └── dashboard.template.astro      ← 主模板（2800+ 行）
│   ├── pages/
│   │   ├── dashboard.astro               ← 中文入口
│   │   └── en/dashboard.astro            ← 英文入口
│   ├── i18n/
│   │   └── dashboard.ts                  ← 翻譯 key
│   └── components/
│       └── Header.astro                  ← nav dropdown
└── docs/
    └── DASHBOARD-PIPELINE.md             ← 本文件
```

---

## 進化路線（from Dashboard 進化策略 v2）

- [x] Phase 1: 數據骨架 + 品質可視化（V2.1-V2.6）
- [x] Phase 1.5: GA4 基礎整合（靜態 JSON）
- [ ] Phase 2: GA4 Actions cron 自動化
- [ ] Phase 2: 文章旁 7 天 sparkline
- [ ] Phase 3: Contributor Wall（GitHub API）
- [ ] Phase 3: Canvas 遷移（>1000 nodes 時）

---

_Created: 2026-03-28 | Based on Dashboard V2 build experience_

_v2.0 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（三層數據管線 + 5 JSON 流向 + 跨 pipeline boundary）+ Hard Gate Inventory 集中 table（8 gates 含 about.template.astro 不動 + 5 JSON regen + lang i18n sync）+ Top 5 最常忘 step（about.template.astro 被刪 3 次教訓 + style is:global + lang i18n + nav dropdown）+ 跨檔案職責分工 standalone table。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier B.2 audit。架構總覽 + 數據管線詳述不動（已健康）。_
