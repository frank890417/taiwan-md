---
session_id: 2026-05-18-140415-manual-map-evolution
date: 2026-05-18
session_type: manual-observer-directive-map-evolution
handle: manual-map-evolution
status: shipped
---

# 2026-05-18 manual map evolution (140415) — 22 縣市 finale 後的 map page 4-phase 進化 + pipeline cache 補做曝光

> session manual map evolution — 22 縣市 corpus → map page IA + 視覺 + 共用元件 + 缺漏 pipeline cache 補做
> Session span: 2026-05-18 11:56:19 +0800 → 2026-05-18 14:04:15 +0800 (~2h 8m wall-clock，承接 22 縣市 finale session)
> 資料來源：`git log %ai`

## 觸發

22 縣市系列 finale ship 完後（commit `4a1c620fc`），哲宇 directive：「用目前完成的所有東西，評估我們的地圖頁面可以怎麼進化，先寫 report」。從 evaluation report 一路演進到 map 視覺重設計 + 共用元件 hoist + pipeline cache 補做。

## Phase 1 — Tier 1 map ↔ 22 縣市對接 (commit b46ad6f05)

依 [reports/map-page-evolution-2026-05-18.md](../../reports/map-page-evolution-2026-05-18.md) Tier 1 規劃：

1. **T1.1 polygon click → featured deep article card**：點縣市 polygon → sidebar 頂端 hero + title + 核心矛盾 + CTA
2. **T1.2 polygon hover tooltip**：「📖 離台北最近的港口，最被台北看不見」即時顯示核心矛盾
3. **T1.3 「22 縣市系列」curated route**：22 stops + 連線 ship 順序 pilot 基隆 → finale 新北
4. **T1.4 sidebar 22 grid card**：default sidebar 頂端 22 卡 2 欄 grid

新增：
- `scripts/tools/extract-22-counties.mjs` — frontmatter → JSON 提取器
- `src/data/counties-22.json` — 22 縣市 SSOT (title / description / core_contradiction / hero / link / readingTime)

## Phase 2 — IA 重構 + 統一卡片元件 (commit 60eab4ed3)

哲宇反饋「左側文章列表沒有明顯的 block」+「區域/分類拆選還有策展路線在上方不理想 連結不直覺而且會佔掉一進來的版面」→ 重新設計：

1. **Compact hero**：從 PageHero 大區塊（~280px）→ 1 行薄條（~85px）
2. **Route pill bar**：取代上方大塊「策展路線」section，緊湊單行 pill bar 緊貼 hero 下方
3. **Filters 移進 sidebar**：collapsible `<details>`，預設收起，展開時 6 區域 + 10 分類 chips
4. **Route info 移進 sidebar**：點 route pill → sidebar 切換到 route panel
5. **Unified .article-card 元件**：套用 3 處 — default / county / route stops

## Phase 3 — 共用元件 hoist (commit f7e5287ea)

哲宇反饋「幫跨頁面的 hero 設計這個共用樣式」+「文章的共用元件採用相同方式」+「全部預設另開新分頁」→ hoist 到 components/：

1. **PageHero 加 `layout='inline'` variant**：跨頁面通用的「緊湊水平 hero strip」
2. **ArticleCard.astro 跨站共用元件**：3 個 density mode（premium / compact / row）+ openIn 預設 'new-tab'
3. **Map 頁訂制延伸**：移除 290 行重複 CSS，引用 ArticleCard `:global()` styles
4. **全部文章連結預設 target='_blank'**：deep-article-card / county fallback / sidebar items 全改

## Phase 4 — Map 視覺重設計 + pipeline cache 補做 (commit 544200eab)

哲宇反饋「左側樣式與配色更有設計感」（給 illustrated map style 三範例：嘉義/澳底/Germany）+「文章地圖有 follow rewrite-pipeline cache 嗎？」

### A. 視覺重設計

依 illustrated map style 參考，把扁平單綠 Taiwan SVG 變成有設計感的地圖：

- **五區色彩 palette** (replaced heat-map by marker density)：
  - 北部 amber 暖黃 / 中部 orange 沙橙 / 南部 mint 薄荷 / 東部 forest 翠綠 / 離島 lavender 薰衣草
- **海洋漸層背景** + **wave pattern**
- **紙感 drop-shadow filter** (feGaussianBlur + feOffset)
- **Compass rose** top-right + **「台灣 TAIWAN」decorative title** bottom-left
- **升級 marker**：白色 outer ring + 彩色 inner pin（從單 r=5 圓 → g+2 circles pin 視覺）

⚠️ **Bug 修復**：`:global(.county) { fill: #bbf7d0 }` CSS 強制覆寫 SVG attribute → 移除 fill / stroke 規則讓 region gradient 生效。CSS 比 SVG presentation attribute 優先級高，是 SVG style override gotcha。

### B. Pipeline cache 補做（partial）

哲宇問「文章地圖有 follow rewrite-pipeline cache 嗎？」→ 查 [docs/pipelines/REWRITE-PIPELINE.md:711-712](../../docs/pipelines/REWRITE-PIPELINE.md#L711)：「熱連結任何外站圖 → **永遠 cache 本地**」

**發現重大 pipeline 違規**：22 縣市全部 ship 時忘了 cache，全部熱連結 Wikimedia hi-res URLs。其他 category（art/culture/economy/food/...）都有 cache 在 `public/article-images/`，唯獨 geography 整個目錄不存在。

寫 `scripts/tools/cache-county-images.mjs`：
- 抽 22 篇 markdown 所有 image URLs
- Download 到 `public/article-images/geography/{slug}-{n}.jpg`
- Thumb URL 404 → fallback original Wikimedia URL
- Rewrite markdown frontmatter + inline URLs → 本地 path

**Wikimedia 429 wall**：跑兩次都被嚴重 throttle
- 第一輪 (180ms delay): 23/114 成功
- 第二輪 (2500ms): 26/114 (just +3)
- 第三輪 (8000ms): 26/114（沒進展）→ 殺掉

最終 partial cache：26/114（8 cities partial / 14 cities 0）。剩下 88 張需要更慢的 cron routine（30s+ delay / 跨 hours）。

## 三個 Lessons (今天新增)

### Lesson #1：CSS 優先級 vs SVG presentation attribute

SVG `<path fill="url(#regionSouth)">` 應該套用 gradient，但 CSS `.county { fill: #bbf7d0 }` 強制覆寫了。**fix**：移除 CSS fill 規則讓 attribute 直接生效。

普遍 pattern：SVG 動態指定 fill / stroke 時，CSS 不能同時宣告同一 property 否則被覆蓋。

### Lesson #2：Pipeline rule discoverability — 22 篇都漏掉 cache

REWRITE-PIPELINE §1.9.2 寫得很清楚「永遠 cache 本地」，但 22 篇 ship 全部繞過。原因：
- Stage 4 article-health.py 的 `image-health` check 只 verify URL 是否 reachable，**沒檢查是否為本地 path**
- Pipeline 沒 enforcement，全靠寫文章的 agent 自覺
- 22 篇 batch ship 速度 prioritize 寫，cache 步驟被 skip

**fix 方向**：article-health.py 加 `local-image-only` rule — frontmatter `image:` 必須是 `/article-images/` 開頭，否則 hard=1。寫進下 batch 規格。

### Lesson #3：Wikimedia 429 不是技術 bug 是策略選擇

Wikimedia upload.wikimedia.org 對匿名 bulk download 有極嚴 rate limit（8s delay 還是被擋）。Cache 22 city × 5 image = 110+ files 不能一次抓完，需要：
- 跨多 session 慢慢 cache
- OR 用 Wikimedia API 帶 authenticated token
- OR 透過 Special:Redirect/file/ 不同端點

寫 `twmd-geography-image-cache-cron` daily routine 跑 5-10 張，數天補完。

## Next session 入口

1. **補完剩 88 張圖 cache**：以 cron routine 慢慢跑（每天 5-10 張）
2. **article-health.py 加 `local-image-only` rule**：避免未來再有「忘了 cache」
3. **Map evolution Tier 2-4** ([reports/map-page-evolution-2026-05-18.md](../../reports/map-page-evolution-2026-05-18.md))：
   - Tier 2: lat/lon frontmatter + footnote→marker + GA4 county tracking + sibling cross-link 視覺化
   - Tier 3: 時間軸 / 核心矛盾 grid / 族群 / 災難 4 個新 view
   - Tier 4: i18n 多語 / PRC AI refusal heat-map / fork-friendly export

## 收尾

從 22 縣市 corpus → map page 4-phase 進化（Tier 1 對接 → IA 重構 → 共用元件 hoist → 視覺重設計 + cache）+ pipeline 違規曝光 partial 修補。

5 個 commit：`b46ad6f05` + `60eab4ed3` + `f7e5287ea` + `544200eab` + report `4dff2d182`。

整個 session 的價值不只在 map page 本身，更在於：
1. **22 縣市 corpus 從 article → 地圖入口**：從「靜態 markdown 庫」變成「地理可探索 corpus」
2. **共用元件 hoist**：PageHero `layout='inline'` + ArticleCard 跨站可重用
3. **Pipeline 違規曝光**：揭露 22 篇全部漏 cache 的事實，partial 修補 + 規劃 cron routine 補完
4. **Lesson 內化**：CSS vs SVG attribute / pipeline enforcement / Wikimedia rate limit

🧬

🇹🇼 Taiwan.md v0.1.5 — 22 縣市 corpus 變成可探索地圖介面 + Pipeline cache 補做 partial（26/114）+ 三個 lessons 寫進 brain。
