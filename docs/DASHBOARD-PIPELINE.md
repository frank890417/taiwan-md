# Dashboard Update Pipeline

> Taiwan.md 數位生命體監測面板的完整更新流程

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

public/api/dashboard-analytics.json   ← 手動/cron 從 GA4 API 拉取（見下方）

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

### Layer 2: GA4 Analytics（手動/Cron）

GA4 數據不在 build-time 產生（需要 API credentials），而是：

```bash
# 從本地拉取 GA4 數據
cd ~/clawd/skills/ga4-analytics-search-indexing-skill/scripts
GA4_PROPERTY_ID=528789281 npx tsx ga4-taiwan-fetch.ts

# 複製到 repo
cp /tmp/ga4-clean.json ~/taiwan-md/public/api/dashboard-analytics.json
```

**GA4 Property:** `528789281` (Measurement ID: `G-JGC5W00N7T`)
**Service Account:** `muse-ga4@muse-analytics-487002.iam.gserviceaccount.com`

📌 **未來計畫：** GitHub Actions cron 每天 UTC 06:00 自動拉取 + commit

### Layer 3: Template Rendering（Client-Side）

Dashboard 頁面載入後，client JS fetch 5 個 JSON 並渲染 11 個 section：

```
fetch → dashboard-articles.json ──┐
fetch → dashboard-vitals.json ────┤
fetch → dashboard-organism.json ──┤ Promise.all()
fetch → dashboard-translations.json ┤
fetch → dashboard-analytics.json ──┘ (.catch → null, GA4 可選)
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
renderAnalytics()           → #analytics (GA4 totals + sources + pages + countries)
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

| Organ          | ID          | 計算方式                     |
| -------------- | ----------- | ---------------------------- |
| 🫀 Heart       | heart       | 近 7 天新增文章數            |
| 🛡️ Immune      | immune      | humanReviewed / total \* 100 |
| 🧬 DNA         | dna         | EDITORIAL.md 最後修改天數    |
| 🦴 Skeleton    | skeleton    | 固定 90（Astro 架構穩定）    |
| 🫁 Breath      | breath      | .github/workflows/ yml 數量  |
| 🧫 Reproduce   | reproduce   | 近 30 天 contributors 數     |
| 👁️ Senses      | senses      | GA4 + Issue templates 存在   |
| 🌐 Translation | translation | en 翻譯覆蓋率                |

### Organ → GitHub File 映射

| Organ       | 對應檔案                  |
| ----------- | ------------------------- |
| heart       | `knowledge/`              |
| immune      | `EDITORIAL.md`            |
| dna         | `EDITORIAL.md`            |
| skeleton    | `astro.config.mjs`        |
| breath      | `.github/workflows/`      |
| reproduce   | `CONTRIBUTING.md`         |
| senses      | `.github/ISSUE_TEMPLATE/` |
| translation | `src/content/`            |

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
