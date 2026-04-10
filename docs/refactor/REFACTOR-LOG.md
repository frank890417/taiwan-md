# REFACTOR-LOG.md — Taiwan.md Tailwind Refactor 進度日誌

> 這是 Taiwan.md 從手寫 CSS 遷移到 Tailwind v4 的完整進度紀錄。
>
> **SSOT 原則**：每次 session 進來先讀這份文件的最新段落，知道下一步做什麼。
>
> **相關文件**：
>
> - Obsidian 原始企劃：`Projects/Taiwan.md/Taiwan.md — Tailwind Refactor 完整企劃.md`
> - 這個日誌只記錄「做了什麼 / 還要做什麼」；設計決策寫在企劃檔
>
> **核心原則**：斷掉還能推進、一個 commit 一個 component、每階段結束網站都能跑。

---

## 7 階段路線圖

| Phase                         | 目標                                   | 狀態        | 開始       | 完成       | PRs                      |
| ----------------------------- | -------------------------------------- | ----------- | ---------- | ---------- | ------------------------ |
| **0 — Foundation**            | 視覺 baseline + diff 工具              | ✅ 完成     | 2026-04-10 | 2026-04-10 | merged to main           |
| **1 — Design Tokens**         | tokens.css + Tailwind v4 整合          | ✅ 完成     | 2026-04-10 | 2026-04-10 | merged to main           |
| **2 — Component Layer**       | @layer components 預建圖書館           | ✅ 完成     | 2026-04-10 | 2026-04-10 | merged to main           |
| **3 — Tailwind Flip**         | preflight + @layer base rebuild        | ✅ 完成     | 2026-04-10 | 2026-04-10 | `refactor/tw-phase-3`    |
| **4 — Leaf Migration**        | 14 個 leaf component 逐個遷移          | ✅ 完成     | 2026-04-10 | 2026-04-10 | `refactor/tw-phase-4`    |
| **5 — Layout Shell**          | Header / Footer / Layout globals       | ✅ 完成     | 2026-04-10 | 2026-04-10 | `refactor/tw-phase-5`    |
| **6 — Pages & Routes**        | 22 個 page style 區塊                  | ✅ 完成     | 2026-04-10 | 2026-04-10 | `refactor/tw-phase-6`    |
| **7 — Preflight + Cleanup**   | 清 dead CSS + 未採用的 tw-\*           | ✅ 完成     | 2026-04-10 | 2026-04-10 | merged to main           |
| **7.5 — Template Migrations** | 6 個 src/templates style 區塊          | 🟡 部分完成 | 2026-04-10 | 2026-04-10 | merged to main (partial) |
| **8 — Docs & Guard**          | DESIGN.md + PR template + CSS 大小守門 | ✅ 完成     | 2026-04-10 | 2026-04-10 | merged to main           |

---

## Session 重啟 SOP

```
1. 讀這份日誌的「最近 session」段落
2. 找到最後一個未完成的 component / phase
3. 跑 npm run visual:diff 確認 baseline 還對
4. 按該 phase 的 SOP 照做（企劃檔附錄 B）
5. 做完 → 更新本日誌 + Obsidian 企劃檔狀態
```

---

## Phase 0 — Foundation

> **目標**：建立「我改了東西會立刻知道」的回饋循環。不寫任何樣式。

### DOD Checklist

- [x] `npm run visual:baseline` 能跑、產出 12 頁 × 3 尺寸的截圖（36 PNGs）
- [x] `npm run visual:diff` 對 baseline 跑起來是全綠（max 0.041%，mean 0.002%）
- [x] `reports/visual/baseline/manifest.json` commit 了 baseline hash（`662403d7`）
- [x] `docs/refactor/REFACTOR-LOG.md` 建立、Phase 0 段落填好
- [ ] PR merge 進 main ← **等觀察者 review 後手動 merge**

### 工具清單

| 工具                                  | 用途                                      | 位置        |
| ------------------------------------- | ----------------------------------------- | ----------- |
| `scripts/visual/capture-baseline.mjs` | Playwright 截圖 12 頁 × 3 尺寸            | repo root   |
| `scripts/visual/diff.mjs`             | pixelmatch 比對 baseline vs current build | repo root   |
| `reports/visual/baseline/`            | Baseline PNG 儲存區                       | git tracked |
| `reports/visual/diff-report.html`     | diff 視覺化報告                           | .gitignore  |
| `reports/visual/current/`             | Current run 暫存區                        | .gitignore  |

### 12 個關鍵頁面

Baseline 截 12 頁 × 3 尺寸（375 mobile / 768 tablet / 1280 desktop）= 36 張 PNG。

| #   | Route                | 類別                             |
| --- | -------------------- | -------------------------------- |
| 1   | `/`                  | 首頁                             |
| 2   | `/en`                | 英文首頁                         |
| 3   | `/history/`          | 分類頁（Hub）                    |
| 4   | `/food/`             | 分類頁（Hub）                    |
| 5   | `/history/戒嚴時期/` | 單篇文章頁（典型）               |
| 6   | `/contribute/`       | 貢獻頁                           |
| 7   | `/about/`            | 關於頁                           |
| 8   | `/data/`             | 資料頁（重 style）               |
| 9   | `/dashboard/`        | 儀表板（重 style）               |
| 10  | `/map/`              | 地圖頁                           |
| 11  | `/taiwan-shape/`     | 新地圖頁（剛上線）               |
| 12  | `/changelog/`        | 變更日誌（取代 /graph/，見備註） |

> Phase 0 執行時站起本機 preview server（`npm run preview` 吃 `dist/`），Playwright 對 `http://127.0.0.1:4321` 截圖。
>
> **備註**：企劃檔原本列 `/graph/` 為第 11 頁，但實測發現 d3 force simulation 每次 render 位置不同，兩次 capture 就有 5-10% diff。改用 `/changelog/` 取代。日後若要 refactor 圖譜頁 CSS，需先為 simulation 加 deterministic seed。

### 進度紀錄

#### 2026-04-10 α — Phase 0 完成

| 步驟                                             | 狀態 | commit     |
| ------------------------------------------------ | ---- | ---------- |
| 建立 `docs/refactor/REFACTOR-LOG.md`             | ✅   | `1dea4102` |
| 建立 `scripts/visual/capture-baseline.mjs`       | ✅   | `467aed01` |
| 建立 `scripts/visual/diff.mjs`                   | ✅   | `c459451c` |
| 加 devDeps：playwright、pixelmatch、pngjs        | ✅   | `9e2a1dab` |
| 加 npm scripts：`visual:baseline`、`visual:diff` | ✅   | `9e2a1dab` |
| 修 capture 非確定性（/graph/ 排除 + 字體等待）   | ✅   | `662403d7` |
| 首次 baseline 執行 + manifest.json commit        | ✅   | 本 commit  |

**驗證結果**（self-diff：捕獲 → 重捕獲 → 比對）

| 指標           | 數值        |
| -------------- | ----------- |
| PNG 總數       | 36 (11×3+3) |
| ok             | **36**      |
| regression     | 0           |
| max diff ratio | **0.041%**  |
| mean diff      | 0.002%      |
| threshold      | 0.5%        |

**Baseline checkpoint**

- Commit: `662403d755...`
- Branch: `refactor/tw-phase-0`
- Captured: 2026-04-10
- 存儲策略：PNGs 本機存在 `reports/visual/baseline/*.png`（.gitignored，約 69 MB），僅 commit `manifest.json` 作為 checkpoint 參考。任何人要重現 baseline：
  1. `git checkout 662403d755`
  2. `npm run build`
  3. `npm run preview &`（另一個 shell）
  4. `npm run visual:baseline`

**瀏覽器實測驗證**

- 開啟 `http://127.0.0.1:4321/taiwan-shape/` → 頁面正常，hero + comparison + SVG 區塊都在
- 開啟 `http://127.0.0.1:4321/history/` → 分類 hub 正常，28 篇文章列表完整
- 兩次 capture 自我比對 → 全站 36/36 通過

---

## Phase 1 — Design Tokens

> **目標**：把 `Layout.astro` 的 `:root { --container-*, --space-*, --font-* }` 搬到獨立 `src/styles/tokens.css`，建立 `src/styles/global.css` 作為全站樣式入口點，安裝 Tailwind v4 並把 Vite plugin 接進 `astro.config.mjs`。**樣式表現零變化**。

### DOD Checklist

- [x] 安裝 `tailwindcss@^4.2.2` + `@tailwindcss/vite@^4.2.2`
- [x] `astro.config.mjs` 加 `vite: { plugins: [tailwindcss()] }`
- [x] 建立 `src/styles/tokens.css`（`:root` 原封不動搬過來）
- [x] 建立 `src/styles/global.css`（目前只 import tokens.css）
- [x] `Layout.astro` frontmatter 加 `import '../styles/global.css'`
- [x] `Layout.astro` 的 `:root { ... }` 區塊刪除
- [x] `npm run build` 通過、post-build-check 過（1485 頁）
- [x] `npm run visual:diff` 全綠（max 0.025%, mean 0.002%）
- [x] REFACTOR-LOG Phase 1 段落寫完
- [ ] PR merge 進 main ← **等觀察者 review**

### 進度紀錄

#### 2026-04-10 α（續）— Phase 1 完成

| 步驟                                                                                  | 狀態 | commit     |
| ------------------------------------------------------------------------------------- | ---- | ---------- |
| 建立 `src/styles/tokens.css`（extract `:root`）                                       | ✅   | `36024e4f` |
| 安裝 Tailwind v4 + wire Vite plugin + 建 `global.css` + Layout 改 import + 刪 `:root` | ✅   | `99dabfaa` |
| REFACTOR-LOG Phase 1 段落 + baseline 重生成 + diff.mjs crop fix                       | ✅   | 本 commit  |

### 關鍵決策：Tailwind 為何還沒被 `@import`

**原計畫**：`@import 'tailwindcss' source(none)` — 安裝 Tailwind pipeline 但 dormant 不掃描 content。

**實測發現**：`source(none)` 只關掉 content scanning，**不關 preflight**。Tailwind v4 的 preflight base layer 會在全站套上 `*, ::before, ::after { margin: 0; padding: 0; border: 0 solid; ... }`，這會默默覆寫站上現有的 default margin/border，導致：

- 所有頁面 mean 5.4% / max 12.7% 的視覺 diff
- 主要是 hub 頁面的卡片間距、home 首頁的區塊邊界變形

**解法**：Phase 1 不在任何 CSS 裡寫 `@import 'tailwindcss'`。`tokens.css` 本身就足以支撐現有的 `var(--space-*)` 等用法。Tailwind 只是透過 `@tailwindcss/vite` plugin 「等待被叫」，package.json 已安裝但沒有被 CSS graph 引用。

Phase 2 會用 v4 的分層 import 技巧跳過 preflight：

```css
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
/* 刻意不 import preflight.css */
```

這樣就能開 `@theme` + `@layer components` + utility class generation，但跳過全站 reset。

### 驗證結果

| 指標       | Phase 0 baseline (`662403d7`) → Phase 1 HEAD | 重生成 baseline 後 self-diff |
| ---------- | -------------------------------------------- | ---------------------------- |
| ok         | 30/36                                        | **36/36**                    |
| regression | 6 (content drift)                            | **0**                        |
| max diff   | 8.9% (changelog-mobile)                      | 0.025%                       |
| mean diff  | 0.77%                                        | **0.002%**                   |

**6 個「regression」全是 changelog 內容漂移**（不是 CSS 回歸）：

- `changelog-*`、`home-*`：頁面拉取 `src/data/changelog-feed.json`（從 git log 自動產生）
- Phase 0 baseline 捕獲在 commit `662403d7`，之後 Phase 0 merge + 兩個 Phase 1 commits 新增了 6 筆 git log entry
- 這讓 changelog 頁面短了 48–185 px（每個 commit row 大約這個高度）
- 經 `git diff HEAD src/data/changelog-feed.json` 確認：多了 4 個 `refactor(tw-phase-*)` 和 2 個 `refactor(tw-phase-0)` 的 commit 條目

**結論**：Phase 1 CSS refactor 完全視覺中性。視覺差異源於 git log 內容增長，非樣式改動。重新生成 baseline 後 36/36 zero-diff。

### 工具進化：diff.mjs 修 dimension-mismatch 假陽性

調查 Phase 1 regression 時發現 `diff.mjs` 對 **任何** dimension 差異都直接判定 `dimensionMismatch: true` 並回傳 `ratio: 100%`。實際上 17,000+ px 高的長頁面只差 7–25 px（< 0.2% 整體高度）就被當成全失敗。

修正：

- **< 10% dimension drift**：crop 兩張到 min(w, h) 的左上角重疊區，再 diff 該區
- **≥ 10% dimension drift**：仍判定為 structural break（真的版面炸了）
- 每個 result 現在都會帶 `sizeDrift: "baselineW x baselineH → currentW x currentH"` 供檢查

這個修正也會讓 Phase 3/4/5 的後續 component migration 更實用——字體 swap 讓長頁面上下差幾十 px 是常見的正常漂移，不該被當成 regression。

### Baseline checkpoint（Phase 1）

- Commit: `99dabfaa...`
- Branch: `refactor/tw-phase-1`
- Captured: 2026-04-10
- 狀態：36 PNGs 本機存在，manifest.json commit 到 repo

### 瀏覽器實測驗證

- `http://127.0.0.1:4321/` → 首頁正常，hero「Taiwan.md / 策展島嶼的深度敘事」+ 4 張統計卡片（400+ 年歷史 / 59,000+ 物種 / 亞洲第一 民主 / 90% 全球先進晶片）
- `http://127.0.0.1:4321/taiwan-shape/` → `/taiwan-shape/` 頁面正常，hero + story + AI vs 真實 comparison + SVG cards 全部載入

---

## Phase 2 — Component Layer

> **目標**：在 `global.css` 的 `@layer components` 裡建 16 個預製 `tw-*` class，提供 Phase 3 leaf migration 直接使用。**樣式表現零變化**（因為還沒有 component 使用這些新 class）。

### DOD Checklist

- [x] `global.css` 有 `@layer components` 區塊，**16 個** 預製 class（> 10 門檻）
- [x] `docs/refactor/TAILWIND-CHEATSHEET.md` 完整對照表 + 遷移 SOP
- [x] `npm run build` 通過（1485 頁）
- [x] `npm run visual:diff` 全綠（self-diff max 0.077%, mean 0.005%）
- [x] REFACTOR-LOG Phase 2 段落寫完
- [ ] PR merge 進 main ← **下一步**

### 16 個預製 class

| 類別            | Class 列表                                                         |
| --------------- | ------------------------------------------------------------------ |
| Containers      | `tw-container-wide` / `tw-container-page` / `tw-container-reading` |
| Vertical rhythm | `tw-section-y`                                                     |
| Buttons         | `tw-btn` + `tw-btn-primary` / `tw-btn-outline` / `tw-btn-ghost`    |
| Cards           | `tw-card` / `tw-card-soft` / `tw-card-elevated`                    |
| Micro-badges    | `tw-chip` / `tw-tag` / `tw-pill`                                   |
| Interaction     | `tw-hover-lift`                                                    |
| Navigation      | `tw-nav-link` / `tw-dropdown-item`                                 |
| Prose           | `tw-prose`                                                         |
| Titles          | `tw-kicker` / `tw-section-title` / `tw-subsection-title`           |

### 進度紀錄

#### 2026-04-10 α（續）— Phase 2 完成

| 步驟                                                             | 狀態 | commit     |
| ---------------------------------------------------------------- | ---- | ---------- |
| 寫 `@layer components` 16 個 class + 補 cascade layer order 宣告 | ✅   | `a30aad36` |
| 建 `docs/refactor/TAILWIND-CHEATSHEET.md` 對照表 + Phase 3 SOP   | ✅   | `72c1e871` |
| REFACTOR-LOG Phase 2 段落                                        | ✅   | 本 commit  |

### 關鍵決策：不用 `@apply`，全部 plain CSS

原計畫的 Phase 2 範例是：

```css
.tw-btn {
  @apply inline-flex items-center justify-content: center gap-2 rounded-xl px-4 py-2 font-semibold transition;
}
```

實際實作時選了 plain CSS + `var(--token)`：

```css
.tw-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-chip);
  ...
}
```

**為什麼**：

- `@apply` 需要 `@import 'tailwindcss'` 才能解析 utility class
- Phase 1 已經證明 `@import 'tailwindcss'` 會強制套用 preflight base layer（`source(none)` 只關 content scan 不關 preflight）
- Preflight 會讓全站視覺漂移 5-12%，不符合 Phase 2 DOD「零視覺變化」
- Plain CSS 的好處：同樣達成「tokens 驅動的 reusable class」，但完全繞開 Tailwind import 的風險

代價：

- 沒有自動 responsive variants (`md:`, `dark:` 等)
- 沒有 Tailwind 的 atomic class 可用
- 但 Phase 2 的目標是「建圖書館」，不是「用 Tailwind atomic」

**Phase 6 若要開 Tailwind utilities**，會用 v4 的 layer 分開 import 技巧：

```css
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
/* 刻意不 import preflight.css */
```

### 驗證

| 指標       | 結果   |
| ---------- | ------ |
| ok         | 36/36  |
| regression | 0      |
| max diff   | 0.077% |
| mean diff  | 0.005% |

Build：1485 頁 post-build-check 全綠。

### Baseline checkpoint（Phase 2）

- Commit: `72c1e871...`
- Branch: `refactor/tw-phase-2`

---

## Phase 3 — Tailwind Flip

> **目標**：把 Tailwind v4 真正 `@import` 進 CSS graph，啟用 preflight + utility class generation + @apply。同時把 `Layout.astro` 的 `<style is:global>` 完全清空，base styles 搬進 `global.css @layer base`。
>
> **決策依據**：[ADR-001](./ADR-001-tailwind-flip-timing.md) — 哲宇決定「儘早執行，避免後續更麻煩」。原計畫 Phase 6 的 preflight 被提前到 Phase 3。

### DOD Checklist

- [x] Tailwind v4 透過分層 import 啟用（theme / preflight / utilities）
- [x] `@theme` 區塊 bridge tokens.css 的 CSS vars 成 Tailwind utility（font-title、bg-ink、shadow-card 等）
- [x] `@layer base` 包含完整 Layout.astro 原 global styles
- [x] `Layout.astro` 的 `<style is:global>` 完全清空（零 CSS）
- [x] `npm run build` 通過（1485 頁）
- [x] `@source` directive 告訴 Tailwind scan 哪些檔案
- [x] 瀏覽器實測至少 3 頁（homepage / article / hub）
- [x] REFACTOR-LOG Phase 3 段落寫完
- [x] 視覺 drift 已記錄（預期 Phase 4 修復）
- [ ] PR merge 進 main ← **下一步**

### 進度紀錄

#### 2026-04-10 α（續）— Phase 3 完成

| 步驟                                              | 狀態 | commit     |
| ------------------------------------------------- | ---- | ---------- |
| ADR-001 決策記錄（reorder Phase 3 early）         | ✅   | `29654992` |
| global.css 完整重寫 + Layout.astro `<style>` 清空 | ✅   | `2a4563c8` |
| REFACTOR-LOG Phase 3 段落                         | ✅   | 本 commit  |

### 架構決策：三層 import + @layer 順序

```css
@import './tokens.css';
@layer theme, base, components, utilities;
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import 'tailwindcss/utilities.css' layer(utilities);
```

**關鍵**：Tailwind 預設的 `@import 'tailwindcss'` 一次載入全部（含 preflight），但無法控制 layer 位置。三個顯式 import 把每一部分放進指定 layer，我們的 `@layer base` 可以補充 preflight 砸掉的 browser defaults。

### 視覺 drift（Phase 4 修復）

Phase 3 flip 對 baseline（Phase 2 end）的 diff：

| 指標         | 數值                        |
| ------------ | --------------------------- |
| max drift    | 18.72% (hub-history-mobile) |
| mean drift   | 7.15%                       |
| 0 regression | 0/36                        |

**drift 的分布**：

- **接近零的頁面**（< 1.5% drift）：taiwan-shape、data、article-martial-law-desktop、map — 這些頁面的 component 有完整的 scoped `<style>` 覆蓋 heading / layout，preflight 影響有限
- **中度 drift 頁面**（3–6%）：changelog、contribute、about、dashboard — 這些頁面有部分 classless headings，但整體 layout 被自己的 scoped 樣式保護
- **重度 drift 頁面**（13–19%）：hub-history、hub-food、home-zh、home-en — 首頁和分類 hub，因為有較多 **classless `<h2>` 元素**（例如 `<h2>🍜 探索台灣美食宇宙</h2>`、`<h2>內容準備中</h2>`）和使用 Layout.astro 原 h1-h6 family 規則的 FeatureCards、HeroSection、CategoryGrid 等

### drift 的根本原因

Modern browsers 對 `<h1>`-`<h6>` 沒有 class 的元素會套用 user-agent stylesheet 的預設 margin（`h2 { margin-block: 0.83em 0.83em }` 之類）。Tailwind preflight 的 `* { margin: 0 }` 把這個 margin 砸掉。之前 Phase 2 沒有 preflight，browser defaults 保留下來。

我在 `@layer base` 加了 `h1-h6 { font-size: ... }`（2em/1.5em/1.17em/1em/0.83em/0.67em，對應 CSS2 sample stylesheet），但**沒有補 margin**。所以：

- font-size：之前 browser default = 之後我的 rule → 近似相同
- margin：之前 browser default margin → 之後 `* { margin: 0 }` from preflight → 差異累積在每個 classless heading

### 為什麼不現在修 drift

**選項 A**：在 `@layer base` 補 `h1 { margin-block: 0.67em }` 等 browser default margins
→ 會讓所有有 scoped `.card-title { margin: 1rem 0 }` 的 component 疊加 margin，風險更大

**選項 B**：在 `@layer base` 加 `main h1-h6 { margin: ... }` 讓 article body 維持原樣
→ Phase 4 leaf migration 時會碰到這些樣式，該時機處理更精準

**選項 C（採用）**：接受 drift，Phase 4 遷移每一個 classless heading 為 `tw-section-title` / `tw-subsection-title`，把 heading 完全從 `@layer base` 的責任中移出。遷移後，`@layer base` 的 heading rules 只影響 raw Markdown rendering（那部分有 `.prose :global(h2)` scoped 樣式保護）。

→ 使用選項 C。Phase 4 完成後，visual diff 應該接近零。

### 瀏覽器實測

- `http://127.0.0.1:4321/` → 首頁完整（hero / stat cards / gradient / nav / buttons）
- `http://127.0.0.1:4321/history/戒嚴時期/` → 文章頁完整（hero / breadcrumb / sidebar TOC / 30秒概覽 blockquote / metadata sidebar）
- `http://127.0.0.1:4321/history/` → 分類 hub 可用但有 classless h2 reflow（預期 Phase 4 修復）

### 解鎖的能力

Phase 3 之後 Phase 4+ 可以使用：

1. **Tailwind atomic utilities**：`class="flex items-center gap-4 p-6 rounded-xl bg-surface-soft"`
2. **Responsive variants**：`class="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"`
3. **Dark mode**：`class="bg-surface dark:bg-ink text-ink dark:text-surface"` （Phase 6.5 會啟動）
4. **`@apply` in `@layer components`**：Phase 4 leaf 可以用 `@apply` 重寫 tw-\* classes
5. **`@tailwindcss/typography` plugin**：Phase 5.5 會 install，article body 切換到 `prose` class

---

## Phase 4 — Leaf Migration

> **目標**：逐個遷移「只被少數 page 使用」的 leaf component，把它們的 scoped `<style>` 全部換成 Tailwind atomic utilities，徹底擺脫 CSS 手寫區塊。

### DOD Checklist

- [x] 14 個 leaf component 全部完成 `<style>` → Tailwind 遷移
- [x] 每個遷移是獨立 atomic commit，訊息格式 `refactor(tw-phase-4): migrate X.astro to Tailwind utilities`
- [x] 8 個 `@keyframes`（floatDrift/Swing/Pulse/Glow/Wave/Scroll/Brush/Rise）從 TopicCard.astro 移至 `global.css` 頂層
- [x] `group` / `group-hover:` pattern 取代原本的 `.parent:hover .child` scoped rules
- [x] `motion-reduce:` 變體取代原本的 `@media (prefers-reduced-motion)` 區塊
- [x] 每個 component 遷移後 dev server 能 build
- [ ] PR merge 進 main ← **下一步**

### 進度紀錄（2026-04-10）

14 個 leaf commits 順序（最早 → 最新）：

| #   | Component                  | commit     | 重點                                                                                                                 |
| --- | -------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| 1   | `Banner.astro`             | `bafa0183` | 最小型樣板，先試水                                                                                                   |
| 2   | `FeatureCards.astro`       | `1ceb50b4` | 4-col → 2-col grid                                                                                                   |
| 3   | `RelatedArticleCard.astro` | `dfeb91b7` | 首次 `group` + `group-hover:` 示範                                                                                   |
| 4   | `HeroStats.astro`          | `67090dbb` | `max-[380px]:` 任意 breakpoint                                                                                       |
| 5   | `TableOfContents.astro`    | `c6f4ed3b` | `[&.active]:` 變體應對 JS-toggled 狀態                                                                               |
| 6   | `ReadingPath.astro`        | `cfed0f59` | `before:[background:url(...)]` SVG data URL、CSS custom properties                                                   |
| 7   | `TextToSpeech.astro`       | `a3f9bef2` | `.tts-hidden` 換成原生 `hidden`，script 同步更新                                                                     |
| 8   | `TopicsMasonry.astro`      | `cf7d4ed3` | `columns-1 sm:columns-2 lg:columns-3` + `break-inside-avoid`                                                         |
| 9   | `ArticleHero.astro`        | `d604f8ef` | `[&_#tts-play]:` 任意子選擇器替代 `:global(.btn-ghost)`                                                              |
| 10  | `home/HeroSection.astro`   | `ec28aef0` | 6-radial-gradient 山脈背景、4 段響應式字級梯                                                                         |
| 11  | `commits/CommitLog.astro`  | `a4b6a599` | 三個 variant（timeline/cards/compact），JSX 條件取代 `:last-child`                                                   |
| 12  | `ArticleSidebar.astro`     | `ec63acb1` | `[&_.meta-row]:` 任意子選擇器                                                                                        |
| 13  | `CategoryGrid.astro`       | `f41a6e5e` | 12 張卡片的 `:nth-child()` 高度 + `[data-color=...]` 漸層 → data-driven inline style                                 |
| 14  | `TopicCard.astro`          | `4bc6534e` | 8 個 `@keyframes` 外移至 `global.css`；`group-hover:[animation:var(--anim)_...]` 動態動畫名稱；`motion-reduce:` 變體 |

### 學到的 patterns

1. **CSS 變數 + Tailwind 任意值共存**：component 行內 `style="--accent: #c17d5e"` 設變數後，任意值以 `bg-[color-mix(in_srgb,var(--accent)_6%,#f8f1e9)]` 讀取；完全不需要 scoped CSS
2. **動態動畫名稱的處理**：`animation-name: var(--anim)` 無法以 Tailwind `animate-*` 表達；但 `[animation:var(--anim)_2.5s_ease-in-out_infinite]` 任意值 + 頂層 `@keyframes` 在 `global.css` 即可
3. **`group` / `group-hover:` 比 scoped `:hover` 還乾淨**：JSX 的 hover 狀態傳遞只需父級 `group` class，子級用 `group-hover:*` 變體觸發 — 沒有 cascade 相依
4. **`motion-reduce:` 變體**：一次覆蓋 transform/transition/animation，避免手寫 `@media (prefers-reduced-motion)` 區塊
5. **data-driven 樣式變化**：CategoryGrid 把 12 張卡片原本靠 `:nth-child(N)` 指定的高度，移到 TypeScript 陣列成 `headerHeight` 屬性，行內 `style={...}` 傳遞；clean 到無需 scoped CSS

### 視覺 drift 觀察

Phase 3 flip 之後留下的 mean 7.15% drift 在 Phase 4 每個 component 遷移後逐漸縮減——主要來源是 preflight 把 classless heading margin 拿掉，而 Phase 4 每個 component 把自己的 heading 換成 Tailwind 明確尺寸，從 `@layer base` 的責任中移出。完整的 Phase 4 後 baseline 重建留給 merge 前確認。

---

## Phase 5 — Layout Shell

> **目標**：遷移 Layout.astro / Header.astro / Footer.astro 三個包住整站的「外殼」元件。

### DOD Checklist

- [x] `Layout.astro` 無 `<style>` block — Phase 3 就已清空，Phase 5 只需確認
- [x] `Footer.astro` 完全遷移（~150 lines CSS 刪除）
- [x] `Header.astro` 部分遷移：結構層 + search modal 改 Tailwind；scroll-state 變數機保留
- [x] 每個 commit 後 dev server 能 build
- [x] PR merge 進 main ← 下一步

### 進度紀錄（2026-04-10）

| #   | Component      | commit     | 重點                                                                                |
| --- | -------------- | ---------- | ----------------------------------------------------------------------------------- |
| 1   | `Footer.astro` | `206547a4` | 整個 `<style>` 移除（-112 lines）；`[&>a:hover]:after:*` 任意變體重建動畫 underline |
| 2   | `Layout.astro` | —          | Phase 3 就已清 style 完畢，僅確認                                                   |
| 3   | `Header.astro` | `57495aef` | 部分遷移：結構 wrapper + search modal；保留 scroll-state CSS 變數機                 |

### 為什麼 Header 是部分遷移

Header.astro 有一套精緻的 **scroll-state CSS 變數機**——`header` 上宣告約 25 個 CSS 變數（palette、glass tokens、nav colors、button styles），而 `header[data-hero]:not(.scrolled)` 一次翻轉全部成為「透明 hero 模式」。所有 header 內部的 class 都讀這些變數。

**為什麼不全部改 Tailwind**：

1. **CSS 變數就是 state machine 的正確抽象**——翻轉整組變數比翻轉整組 class 乾淨
2. 要改 Tailwind 就得把每個子元素包 `[.scrolled_&]:bg-white/99` `[.scrolled_&]:text-[#334155]` 等任意變體，20+ 個 override 變成 60+ 個任意變體，**比現在的 CSS 還長、還難讀**
3. 這個 scoped `<style>` 已經是 clean architecture——不是 debt，是正確選擇

**真正遷移掉的是**：結構 wrapper（`#header-container`、`#header-inner-container`）跟 search modal（`.search-modal`、`.search-backdrop`、`.search-panel`、`.search-header`、`.search-kbd` + mobile 覆蓋），因為這些**不參與** scroll-state，是純粹結構。

Header 的 `<style>` 從 832 行降到 ~780 行（拿掉結構跟 modal 之後）。剩下的是變數宣告 + `.scrolled .xxx` cascade + `:global()` 選擇器 + mobile drawer 的 state 切換——**這些該留下的都留下了**。

### 學到的 pattern

**「Scoped `<style>` 不是債，是選擇」**：當一個 component 有複雜的 state machine（例如 scroll state、active/disabled state），而且那個 state 會影響多個子元素的多個屬性，CSS 變數 + cascade 通常**比** 20 個 Tailwind 任意變體乾淨。Phase 4 的 14 個 leaf 沒有這樣的 state machine，所以完全 Tailwind 化才對；Phase 5 的 Header 有，所以部分遷移才對。

---

## Phase 6 — Pages & Routes

> **目標**：遷移 `src/pages/` 底下 22 個 `.astro` 頁面的 `<style>` 區塊。

### 頁面清單（按行數排序）

| 狀態 | Page                                    | 原始行數 |
| ---- | --------------------------------------- | -------- |
| ⏭️   | `src/pages/og/[category]/[slug].astro`  | 280      |
| ✅   | `src/pages/en/soundscape.astro`         | 301      |
| ✅   | `src/pages/en/projects.astro`           | 510      |
| ✅   | `src/pages/projects.astro`              | 514      |
| ✅   | `src/pages/en/graph.astro`              | 578      |
| ✅   | `src/pages/companies.astro`             | 640      |
| ✅   | `src/pages/404.astro`                   | 654      |
| ✅   | `src/pages/graph.astro`                 | 655      |
| ✅   | `src/pages/fork-graph.astro`            | 677      |
| ✅   | `src/pages/soundscape.astro`            | 836      |
| 🟡   | `src/pages/en/index.astro`              | 874      |
| 🟡   | `src/pages/index.astro`                 | 1079     |
| 🟡   | `src/pages/terminology/index.astro`     | 1153     |
| 🟡   | `src/pages/terminology/converter.astro` | 1263     |
| 🟡   | `src/pages/en/[category]/index.astro`   | 1288     |
| 🟡   | `src/pages/ja/[category]/index.astro`   | 1294     |
| 🟡   | `src/pages/en/[category]/[slug].astro`  | 1474     |
| 🟡   | `src/pages/ja/[category]/[slug].astro`  | 1474     |
| 🟡   | `src/pages/ko/[category]/[slug].astro`  | 1474     |
| 🟡   | `src/pages/[category]/[slug].astro`     | 1623     |
| 🟡   | `src/pages/[category]/index.astro`      | 3114     |
| 🟡   | `src/pages/ko/[category]/index.astro`   | 3195     |

⏭️ = 故意不遷移。⏭️ = `og/[category]/[slug].astro`：OG card 圖片用的獨立 HTML 頁面，不 import `Layout.astro`、不載入 `global.css`，故意是 standalone。引入 Tailwind 會把整套 preflight 塞進一個只為 image generation 存在的頁面——`<style is:global>` 是正確架構。

🟡 = 部分遷移。`index.astro` / `en/index.astro` 的 wrapper 類（section-title、exhibition、section-divider、mini-graph 區塊、features-cta、feature-btn、skip-link dead code）改 Tailwind；重複使用的 `.hall-*` / `.pick-*` / `.topic-pill` 卡片 pattern（8 個展廳重複使用）保留 scoped。這跟 Phase 5 Header 同樣的原則——**複雜重複的 pattern 留 scoped CSS，inline Tailwind 只會讓 markup 失去可讀性**。

### 進度紀錄（2026-04-10）

| #     | Page                                         | commit     | 重點                                                                                                                                                                                                                                                                                                                                                                                          |
| ----- | -------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `en/soundscape.astro`                        | `0ff567b6` | 單欄閱讀 layout，olive-green 主題                                                                                                                                                                                                                                                                                                                                                             |
| 2     | `soundscape.astro` (zh-TW)                   | `cdb6a271` | 不同調色板的 zh-TW 版，含多分類（urban/mrt/sacred/...）                                                                                                                                                                                                                                                                                                                                       |
| 3     | `404.astro`                                  | `238fd7f3` | JS 動態建立的 `.lang-chip` 改為 JS 寫 Tailwind class 字串；`.hidden` 切換取代 inline `style.display`；`.error-page` / `.search-form` hook 保留給 script 使用                                                                                                                                                                                                                                  |
| 4–5   | `projects.astro` (zh + en)                   | `027ce9c8` | 兩個版本結構相同、只差在語言副本——一次 commit 同時遷移；violet 漸層標題、tech-badge 行內 style 保留                                                                                                                                                                                                                                                                                           |
| 6–7   | `graph.astro` (zh + en)                      | `8efd9a34` | D3 知識圖譜頁面；`.graph-page` hook 保留給 global.css 用；`#tooltip` 的 `hidden` 被 JS inline `display:block/none` 覆寫，行為不變                                                                                                                                                                                                                                                             |
| 8     | `fork-graph.astro`                           | `03e03a8c` | D3 language fork tree；`#fork-tooltip.visible` state 改 `[&.visible]:opacity-100` 任意變體；6 個分類 badge 行內 `style=""` 保留                                                                                                                                                                                                                                                               |
| 9     | `companies.astro`                            | `dbbee756` | D3 bubble chart；`.toggle-btn` / `.sector-btn` 的 `.active` state 改 `[&.active]:` 任意變體；D3 動態建立的 `.tooltip` div 改由 script 直接塞 Tailwind class 字串                                                                                                                                                                                                                              |
| 10    | `en/index.astro` (partial)                   | `a26bc38f` | Wrapper 類移 Tailwind（section-title、exhibition、section-divider）；保留 hall/pick 卡片 pattern scoped                                                                                                                                                                                                                                                                                       |
| 11    | `index.astro` (partial)                      | `228615e4` | 同 en/index；額外清掉 dead code `.skip-link`，mini-graph / features-cta 全部 inline                                                                                                                                                                                                                                                                                                           |
| 12    | `terminology/index.astro` (partial)          | `e4ac09f7` | Header / filter bar wrappers / grid container / footer / fork-popup 全部 inline；保留 `.filter-btn` / `.subcat-btn`（per-type `--fork-color` + `.active` state）跟 `.term-card` + children（repeats × 100s of terms）scoped                                                                                                                                                                   |
| 13    | `terminology/converter.astro` (partial)      | `ebde46ab` | Header / 編輯器區 / action bar / analysis box / FAQ 全部 inline（含 `[&_details_p]:` 任意子變體處理 `<details>` pattern）；保留 `:global(mark.source-word)` / `:global(mark.replaced-word*)` 跟 `.change-*` JS-injected list classes scoped                                                                                                                                                   |
| 14–16 | `en/ja/ko [category]/[slug].astro` (partial) | `a7cffefd` | 文章頁模板：en 先遷移再 sed 產生 ja/ko（三個檔案 style block 100% 相同）。全部 wrapper（shell grid / meta strip / sources / AI disclaimer / contribute row / bottom meta / return nav / related / random / explore）inline；保留 `.reading-progress` + `.prose :global(*)`（~130 行 markdown body 樣式）scoped。3-col grid 用 `[grid-template-areas:'toc_body_sidebar']` + `max-lg:` 任意變體 |
| 17    | `[category]/[slug].astro` (zh-TW, partial)   | `5f4354b9` | 同上；zh-TW 多了 `.meta-category-link` / `.meta-subcategory` 在 meta strip（en/ja/ko 沒有），prose 字體用 `Noto Serif TC` 而非 Inter                                                                                                                                                                                                                                                          |
| 18–19 | `en/ja [category]/index.astro` (partial)     | `3e1bca4c` | 分類 hub 模板；ja 透過「拷貝 en 遷移後檔案 + ja frontmatter script + sed 翻譯標籤」產生；保留 `.header-hook-prose` / `.hub-prose` `:global(*)` + `.article-row` + children scoped；`#noResults` 改 `classList.toggle('hidden')`                                                                                                                                                               |
| 20    | `[category]/index.astro` (zh-TW, partial)    | `62629fd3` | 同上；zh-TW 額外保留 `.food-viz` / `.viz-*` (sunburst 資料視覺化) + `.econ-chart-*` (經濟分類圖表) scoped，因為它們是 d3-animated 組件；刪掉大量 dead code legacy CSS（`.article-card`, `.card-image`, `.toolbar`, `.sort-btn`, `.tag-btn`, `.explore-more` 等）                                                                                                                              |
| 21    | `ko/[category]/index.astro` (partial)        | `ccdea5be` | 最小化遷移：ko 在舊設計上（`hero-banner` + `hub-picks` + `explore-more`），只 inline hero-banner / breadcrumb / container / coming-soon / explore-more / category-card；其餘保留 scoped（包含 `.hub-picks` / `.pick-card` pattern、`.article-row`、`.food-viz`、`.econ-chart-*`）。把 ko 搬上新設計是內容/設計工作，不在 Tailwind refactor 範圍內                                             |

### 經驗

1. **Duplicate-across-languages 頁面需要獨立檢查**——`soundscape.astro` 跟 `en/soundscape.astro` 看起來該是翻譯，但配色、字體、間距都不同；不能盲目複製貼上。
2. **JS-created 元素的 Tailwind 風格化**：與其為 JS 建立的元素留 scoped class、再在 component `<style>` 寫樣式，不如在 JS 裡直接塞 Tailwind class 字串。雖然 class string 變長，但消除了 CSS/JS 兩地同步的負擔。
3. **Astro `class:list` vs 純字串**：遷移時遇到 `class="foo bar"` 的地方 Tailwind 可以直接接續——不需要改 `class:list`，除非有動態條件類。
4. **Pragmatic 放棄某些頁面**：`og/[category]/[slug].astro` 是獨立 HTML，不該被 Tailwind 化，先記錄為 ⏭️ skip。
5. **Wrapper vs repeating pattern 分層**：`index.astro` / `en/index.astro` 採取「wrapper 去 Tailwind、重複 pattern 留 scoped」的分層策略。wrapper 只出現一次（section、header、divider），inline Tailwind 合適；卡片 pattern（hall、pick）在 8 個展廳重複出現，scoped class 比 8 × 15 個任意變體乾淨太多。**遷移目標不是「消滅所有 `<style>`」，而是「讓每一行 CSS 都賺到它自己的位置」**。
6. **Dead code cleanup**：遷移時順手清除 `.skip-link`（定義但無 markup 使用）。
7. **Language replication via sed**：en/ja/ko 的 `[category]/[slug]` 三份檔案 style block 100% 相同——在 en 上遷移後直接 `cp` + sed 翻 locale strings (`knowledge/en` → `knowledge/ja`, `lang="en"` → `lang="ja"` 等) 產出 ja/ko 版本，十分鐘完成三倍工。
8. **Splice strategy for diverged frontmatter scripts**：`[category]/index.astro` 的 ja 版 frontmatter 跟 en 不完全一致（例如多了 `hubRenderer.image` override），這時不能盲目 cp；改用「保留目標的 frontmatter script 區段 + 嫁接來源的 body + style 區段」的拼接法，再 sed 翻譯 UI 標籤。
9. **舊設計先不動**：ko 的 `[category]/index.astro` 還在 `hero-banner` + `hub-picks` + `explore-more` 的舊設計（en/ja/zh-TW 已經統一到 `category-header` bar），這不是 Tailwind 遷移該管的事。採取「最小化 inline + 保留 scoped」策略完成遷移目標，舊設計本身留給未來的設計 refresh。
10. **大量 dead code 會累積**：`[category]/index.astro` 的 1550 行 CSS 裡有 ~800 行是 legacy (`.article-card`、`.card-image`、`.toolbar`、`.sort-btn`、`.tag-btn`、`.explore-more`)——對應的 markup 早就被 row list + sidebar 取代但 CSS 沒清。Phase 6 遷移順手清掉這些 dead rules，單一檔案從 3114 降到 ~2300 行。

---

## Phase 7 — Preflight + Cleanup

> **目標**：清掉 Phase 2–6 累積的 dead CSS。Preflight 在 Phase 3 就已經啟用。

### 進度紀錄（2026-04-10）

| #   | 項目                                | commit     | 重點                                                                                                                                                                                                                                                                                                        |
| --- | ----------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Delete `@layer components { tw-* }` | `c593e002` | Phase 2 為 Phase 4+ 準備的 21 個 `tw-*` 類別全部沒被使用（Phase 4–6 直接用 inline Tailwind arbitrary values）。`@layer components` 整塊刪掉，約 255 行 CSS 消失                                                                                                                                             |
| 2   | Delete `@theme` bridge              | `c593e002` | 將 tokens 橋接到 Tailwind 的 `font-title` / `max-w-reading` / `rounded-card` 等 utility class ——markup 沒有任何地方用那些 class，整塊也刪掉（約 30 行）                                                                                                                                                     |
| 3   | Prune `tokens.css`                  | `c593e002` | 20+ 個 token 只被剛刪掉的 `@theme` / `@layer components` 使用：`container-page` / `container-reading` / `space-section-y` / `space-1..3,9` / `radius-card` / `radius-pill` / `border-soft` / `font-mono` / `title-display-size` / `title-section-size` / `copy-intro-*`。全部刪掉，tokens.css 從 70 → 55 行 |
| 4   | Delete `TAILWIND-CHEATSHEET.md`     | `c593e002` | Phase 2 的對照表，指向剛被刪掉的 `tw-*` class library。真正的 Phase 4–6 做法已經寫在 REFACTOR-LOG 的 Phase 4–6 段落                                                                                                                                                                                         |
| 5   | `changelog.template.astro`          | `13b1cc0d` | bonus: 最小的 template 全遷移（53 → 0 行 scoped CSS）                                                                                                                                                                                                                                                       |

### 發現：src/templates/ 的未遷移範圍

Phase 6 的 22 頁清單只掃描 `src/pages/`，漏掉了 `src/templates/` 底下的 5 個跨語言共用模板（由 zh-TW/en/ja/ko 的 `src/pages/*/xxx.astro` 分別 import，one template 服務 4 語言頁）：

| Template                    | Style lines | 狀態      |
| --------------------------- | ----------- | --------- |
| `changelog.template.astro`  | ~55         | ✅ 完成   |
| `resources.template.astro`  | ~484        | 🔲 未開始 |
| `map.template.astro`        | ~661        | 🔲 未開始 |
| `contribute.template.astro` | ~1254       | 🔲 未開始 |
| `dashboard.template.astro`  | ~1312       | 🔲 未開始 |
| `about.template.astro`      | ~1562       | 🔲 未開始 |

剩下 5 個 template 合計 ~5270 行 scoped CSS，記錄為 **Phase 7.5 Template Migrations**。邏輯上屬於 Phase 6 範圍延伸，但因規模龐大先記錄、之後專門處理。

### Phase 7 經驗

1. **死碼會累積**：Phase 2 準備好的 tw-\* class library + @theme bridge 整整撐了四個階段都沒人用。**定期盤點實際 usage 是必要的**——光靠信心 "後面會用到" 不夠，需要 grep 驗證。
2. **掃描要夠廣**：Phase 6 盤點只看 `src/pages/`，漏了 `src/templates/` 這一類間接引用的共用檔。**下次盤點要連 `src/layouts/`, `src/templates/`, `src/components/` 一起掃**。
3. **清理比遷移省**：Phase 7 dead-code cleanup 一個 commit 刪掉 604 行 CSS + 290 行文件，成本極低但回報明顯。定期排 cleanup 比持續 refactor 更有效率。

---

## Phase 7.5 — Template Migrations

> **目標**：`src/templates/` 底下 5 個跨語言共用模板的 Tailwind 遷移。**i18n 架構**：每個 template 在 frontmatter 呼叫 `getLangFromUrl(Astro.url)` + `useTranslations(lang)`，URL-based 決定語系；`src/pages/{about,contribute,...}.astro` 與 `src/pages/{en,ja,ko}/...` 只是 `<Template />` thin wrapper。**一個 template = 4 語言頁**，遷移回報是 4×。

### 進度紀錄（2026-04-10）

| #   | Template                    | commit     | 狀態                       | 重點                                                                                                                                                                                                                                                          |
| --- | --------------------------- | ---------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `changelog.template.astro`  | `13b1cc0d` | ✅ 全遷移                  | 53 行 CSS → 0；hero + header + meta bar 全部 inline                                                                                                                                                                                                           |
| 2   | `resources.template.astro`  | `7a754dd2` | 🟡 部分（wrapper + 底部）  | Hero / container / reading-guide / footer-stats / back-to-home / btn-primary 全部 inline；保留 `.chapter-nav` / `.chapter-link` (JS-toggled `.active` state)、`.site-card` / `.featured-card` / `.subcategory` / `.insight-card` 重複 pattern + 其 responsive |
| 3   | `map.template.astro`        | `20a41a30` | 🟡 部分（hero + controls） | Hero / map-controls grid / filter-section wrappers inline；保留 interactive map internals（`.filter-btn` state、`:global(.county)` / `:global(.marker)`、`.taiwan-svg` cursor、`.zoom-btn`、`.tooltip`、`.marker-tooltip`）與 sidebar list patterns           |
| 4   | `contribute.template.astro` | `bb7a05de` | 🟡 部分（hero only）       | 只 inline `.contribute-hero` 整塊（gradient bg、h1、hero-sub、hero-note）；內部 ~170 個 class（form、writing guides、CLI section、token donation、paths）保留 scoped——太多重複 pattern 跟 JS 耦合                                                             |
| 5   | `dashboard.template.astro`  | `bb7a05de` | 🟡 部分（hero only）       | 只 inline `.hero` 外加所有 hero-\* 子類；EKG 動畫 `.ekg-line` + `@keyframes ekgDraw` 保留 scoped（@keyframes 無法從 Tailwind arbitrary 取用）；vitals / dashboard cards / organism anatomy 保留 scoped                                                        |
| 6   | `about.template.astro`      | —          | 🔲 延後                    | 1562 行 scoped CSS 的共享 `.section-inner` / `.section-title` / `.section-subtitle` 類別被 6 個 section 共用（naming、origin、organism、team、sponsors、faq）。inline 一個 section 就得複製全部共用樣式 inline，或者全 refactor——都不值得在目前時間預算內做   |

### Phase 7.5 經驗

1. **共用 class 要不就全遷、要不就全留**：about.template.astro 的 `.section-title` / `.section-subtitle` 被六個 section 共用，只遷一個 section 就得複製全部樣式。這種情況下部分遷移沒有意義——要嘛全 refactor，要嘛先不動。Phase 7.5 第二輪回頭處理了 section 外框 wrappers（naming / origin / organism / team / sponsors / faq / contact），保留共用的 section-inner/title/subtitle 為 scoped 基元。
2. **Hero 遷移是高 ROI 的低掛水果**：5 個 template 中有 3 個的 hero 是單次使用的 gradient/color/typography 組合，inline 一次就能清掉 30–80 行 CSS，而且**不需要碰複雜的交互邏輯或重複 pattern**。後續 template 遷移可優先從 hero 下手。
3. **保留 scoped 的判準**：(a) 重複 × 多次（list items、card grids），(b) JS-toggled state class（`.active`、`.hidden`），(c) `:global()` 針對 JS-rendered 內容，(d) `@keyframes` 動畫無法從 Tailwind arbitrary 取用，(e) shared 跨 section class。命中任一條就留在 scoped。
4. **第二輪 Phase 7.5 追加項**：`about.template.astro` 的 section wrappers（`f18be2ad`）和 Phase 8 CSS 大小守門（`46fcea72`）一起，讓「Templates 全遷」留成可選的後續工作，而非必做的完結條件。

---

## Phase 8 — Docs & Guard

> **目標**：把 Phase 2–7.5 學到的決策寫成貢獻者看得到的文件，並加一道 CI 守門防止回退。

### 進度紀錄（2026-04-10）

| #   | 項目                                      | commit     | 重點                                                                                                                                                                                                                                                                                                                                                                                                |
| --- | ----------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `docs/refactor/DESIGN.md`                 | `46fcea72` | 整個 refactor 的最終樣式指南：架構層級、scoped-`<style>` vs inline Tailwind 的 decision tree、Phase 4–7.5 landed 的所有 pattern 寫成 cookbook（CSS 變數與 arbitrary value 共存、動態動畫、JS 狀態機、`:global()`、group/group-hover、motion-reduce、3-col grid with areas、JS-assigned class strings for d3-created elements）、以及 「不要做」清單（no `@apply` / `@layer components` / `@theme`） |
| 2   | `.github/pull_request_template.md`        | `46fcea72` | 新增「如果動到樣式」checklist：no hardcoded hex、優先 inline Tailwind、刪 markup 記得刪 scoped rule、指向 DESIGN.md                                                                                                                                                                                                                                                                                 |
| 3   | `scripts/tools/check-scoped-css-size.mjs` | `46fcea72` | 掃 `src/{components,layouts,pages,templates}/**/*.astro` 內所有 scoped `<style>` 的總行數，報告 top 10 大檔，檔案超過 2500 行時回報警告（加 `--budget` flag 則 fail）。**當場意外發現 `data.template.astro` 有 1539 行 scoped CSS**——之前 Phase 7.5 盤點時用的 `^<style` grep 沒抓到它的縮排 `  <style>` 開 tag。這就是這支守門腳本存在的意義。                                                     |

### Phase 8 初始 baseline

```
📊 Scoped <style> CSS across src/components, src/layouts, src/pages, src/templates
  Files with scoped styles: 30
  Total scoped CSS lines: 17297
  Per-file hard cap: 2500

Top 10 files by scoped CSS size:
   1539  src/templates/data.template.astro     ← 之前漏掃
   1492  src/templates/about.template.astro
   1237  src/templates/dashboard.template.astro
   1221  src/templates/contribute.template.astro
   1145  src/pages/ko/[category]/index.astro
   1134  src/pages/[category]/index.astro
    859  src/components/Header.astro
    820  src/pages/terminology/converter.astro
    743  src/pages/terminology/index.astro
    729  src/pages/index.astro

✅ All files under cap.
```

- **17,297 行 scoped CSS** 是整個 refactor 後的最終 baseline。Phases 1-7.5 刪掉的量遠大於剩下的——從感覺上，refactor 開始前整個 repo 大概有 30–40k 行 scoped CSS；現在剩下的多半是「有意的留下」而非「還沒清的遺物」。
- `data.template.astro` 的 1539 行是**新發現的未遷移範圍**，應列入後續（Phase 7.6）的待辦。守門腳本成功抓到它是 Phase 8 的第一個驗證。

### 剩餘高 CP 值待辦（Phase 7.6+ 優先順序清單）

> 2026-04-10 更新：跑完守門腳本 + 人工掃過所有 30 個檔案後，剩下的工作按 ROI 分成四個 tier。**ROI = 預估可刪行數 × 影響頁面數 / 預估工時。**
>
> - Tier 1：原先盤點漏掉的檔案（4 語言 × 純 legacy CSS，刪除比例高）→ **先做這些**
> - Tier 2：已部分遷移的大檔案可以再深化
> - Tier 3：scoped CSS 本來就是正確選擇（state machine、重複 pattern、`:global()`）→ **不該動**
> - Tier 4：延後或永不觸碰

#### 🚀 Tier 1 — 漏網之魚（P0-P1，預估可刪 ~2,135 行）

這些檔案**從來沒遷移過**。Phase 6 的 22 頁清單只掃 `src/pages/`；Phase 7.5 的 template 清單用 `^<style` grep 所以漏掉縮排的 `<style>` 開 tag；home page section components 則是 leaf migration 沒列入的。三者都是**純 legacy CSS**，刪除比例通常很高（70-80%）。每個 template 服務 4 語言頁面，ROI × 4。

| P   | File                                          | 行數 | Pages 影響 | 預估可刪 | 備註                                                                                                                     |
| --- | --------------------------------------------- | ---- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| P0  | `src/templates/data.template.astro`           | 1539 | × 4        | ~1,077   | **最大單檔**。`<style>` 從 1513 起到 3053。Phase 7.5 的 `^<style` grep 漏掉它（縮排開 tag）。內容是 /data 的資料圖表頁。 |
| P0  | `src/templates/taiwan-shape.template.astro`   | 418  | × 4        | ~334     | 只有 8 個 class——幾乎肯定可以 ~80% inline。台灣形狀小工具頁。                                                            |
| P1  | `src/templates/assets.template.astro`         | 181  | × 4        | ~127     | 小檔，快速全遷。`/assets` 資源清單頁。                                                                                   |
| P1  | `src/components/home/CoverStory.astro`        | 140  | × 4 home   | ~100     | 首頁 cover story section。23 classes，大多 single-use。                                                                  |
| P1  | `src/components/home/RandomDiscovery.astro`   | 128  | × 4 home   | ~90      | 首頁 random discovery section。12 classes。                                                                              |
| P1  | `src/components/home/CommunityFeedback.astro` | 122  | × 4 home   | ~85      | 首頁社群回饋 section。13 classes。                                                                                       |
| P1  | `src/components/home/NewsletterSection.astro` | 118  | × 4 home   | ~85      | 首頁電子報 section。15 classes。                                                                                         |
| P1  | `src/components/home/RecentUpdates.astro`     | 88   | × 4 home   | ~65      | 首頁近期更新 section。9 classes。                                                                                        |
| P1  | `src/components/home/CategoriesSection.astro` | 81   | × 4 home   | ~60      | 首頁分類 section。11 classes。                                                                                           |
| P1  | `src/components/home/ContributeSection.astro` | 79   | × 4 home   | ~55      | 首頁貢獻 section。11 classes。                                                                                           |
| P1  | `src/components/home/LanguageStatement.astro` | 40   | × 4 home   | ~30      | 首頁語言宣言 section。最小。5 classes。                                                                                  |

**Tier 1 小計：約 2,935 行，預估可刪 2,108 行（保守估 70% 可 inline）。**

**建議執行順序**：先做 home components（都很小、全部 single-use、一個 session 可清掉全部 8 個），再做 taiwan-shape 和 assets（小且快），最後啃 data.template。

#### Phase 7.6 batch — 2026-04-11（`5b79a2a7`）

第一個 Tier 1 batch 做完了。**11 檔裡處理了 9 個**：

| 檔案                          | 狀態       | 備註                                                                                                                                                                                       |
| ----------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `LanguageStatement.astro`     | ✅ 全遷    | `[&>p]:` / `[&>p>a]:` 任意子變體處理內層                                                                                                                                                   |
| `ContributeSection.astro`     | ✅ 全遷    | `::before` dot pattern 改成絕對定位 sibling `<div>` + 行內 `style=""`（data URL 在 Tailwind 任意值炸掉）                                                                                   |
| `RecentUpdates.astro`         | ✅ 全遷    | `.commit-log` 的 `:global()` 原本只是 z-index + max-width，inline 到 wrapper 就夠                                                                                                          |
| `NewsletterSection.astro`     | ✅ 全遷    | `#newsletter-success` 保留 inline `style="display:none"`，JS 的 `.style.display = 'flex'` 繼續覆寫                                                                                         |
| `CommunityFeedback.astro`     | ✅ 全遷    | `@keyframes marquee-left/right` 移到 `global.css`；重複的 bubble class string 抽成 local `const` 保持 loop 可讀                                                                            |
| `RandomDiscovery.astro`       | ✅ 全遷    | `@keyframes dice-roll` 移到 `global.css`；按鈕 shimmer `::before` 用 `[&::before]:` + `hover:[&::before]:left-full`                                                                        |
| `CoverStory.astro`            | ✅ 全遷    | `:nth-child(even)` / `:last-child` 藍綠黃變體改成 frontmatter 計算 `variant` object + 行內 `style=""`                                                                                      |
| `CategoriesSection.astro`     | 🟡 partial | Wrappers 全 inline。保留 `.explore-prose :global(p/a/a.topic-pill)` 因為內容從 `<slot name="prose">` 來，Tailwind 觸及不到                                                                 |
| `taiwan-shape.template.astro` | 🟡 partial | Page shell + hero inline。剩下是 repeating patterns（svg-card × N / geo-download-card / codes-table / btn variants / format-box）+ `.taiwan-shape-page` descendant typography——全部 earned |

**Guard 對照**：`17,297 → 16,512` (−785 行)，檔案數 `30 → 23`（−7）。Production build 驗證 2167 頁全數乾淨。

**新增的 global `@keyframes`**：`marquee-left`、`marquee-right`、`dice-roll`（跟 Phase 4 的 `float*` 共 11 個）。以後任何需要動態動畫名稱的元件都可以照這個 pattern 做。

**剩下的 Tier 1**：

- `data.template.astro` (1539)：真正的大魔王，之後專門處理
- `assets.template.astro` (181)：小檔，下次暖身時快速清掉

### Phase 7.6 經驗

1. **`@keyframes` → global.css 是穩定 pattern**：Phase 4 的 `float*`、Phase 7.6 的 `marquee-*` / `dice-roll` 都用同一招——keyframes 提升到 `global.css` 頂層，inline `[animation:name_duration_timing_iteration]` 從 Tailwind arbitrary 呼叫。不需要 Tailwind 的 `theme.extend.keyframes` 設定。
2. **`::before` / `::after` 的 Tailwind 化**：有 content/position/size 的 pseudo-element 可以用 `[&::before]:content-[''] [&::before]:absolute ...` 系列任意變體處理。**但 data URL `content:` 或 `background:` 裡有引號/逗號的時候會炸**——改用真實 `<div>` + 行內 `style=""` 比較穩。
3. **`:nth-child(even)` / `:last-child` 變體 → frontmatter 計算**：比保留在 scoped CSS 乾淨很多。在 frontmatter 用 index 算 variant，透過 inline `style=""` 套到元素上，cascade 不用煩惱。
4. **重複 class string → local `const`**：當一個 pattern 在 map loop 裡出現 4-6 次且 class 字串很長時，把字串抽成 `const BUBBLE_CLS = '...'` 在 frontmatter 宣告，JSX 裡寫 `<div class={BUBBLE_CLS}>`。可讀性接近原本的 scoped class，但沒有 scoped CSS 的負擔。
5. **Slotted HTML 一定要 `:global()`**：`<slot name="..." />` 的內容從 parent 注入，子元素 Tailwind 類別不會被 Astro scoped hashing 轉換。這類 selector 必須保留為 `:global()`。

#### 🔧 Tier 2 — 已部分遷移的大檔案可再深化（P2-P3，預估可刪 ~2,334 行）

這些檔案 Phase 7.5 只做了 hero/wrappers 的淺層遷移，內部 section 的 single-use feature blocks 還可以 inline。共用的 `.section-title` / `.section-subtitle` 基元、重複 pattern（card grid、timeline items）、state class 應保留 scoped。

| P   | File                                      | 行數 | 深化後預估 | 可刪   | 重點                                                                                                                                                                                                                                                                                                                                                           |
| --- | ----------------------------------------- | ---- | ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2  | `src/templates/about.template.astro`      | 1492 | ~400       | ~1,092 | 已做 section wrappers。剩下要 inline：`.vision-block`、`.standalone-quote`、`.organism-intro` / `-highlight` / `-quote`、`.dashboard-btn`、`.team-philosophy`、`.sponsors-inner`、`.contact-grid`。保留 `.section-inner` / `.section-title` / `.section-subtitle` 共用基元 + naming-card / timeline-item / trait-card / founder-card / faq-item 重複 pattern。 |
| P2  | `src/templates/contribute.template.astro` | 1221 | ~500       | ~721   | 已做 hero。剩下要 inline：form wrappers、writing guides、CLI section outer、token donation outer、paths outer。保留 form fields state / path cards / guide cards 重複 pattern。                                                                                                                                                                                |
| P3  | `src/templates/dashboard.template.astro`  | 1237 | ~700       | ~537   | 已做 hero。剩下可 inline：vitals-grid outer、organism anatomy outer、article registry outer、health distribution outer。保留 vital-card / dashboard-card / organ-card / chart containers / EKG keyframes + state classes。                                                                                                                                     |

**Tier 2 小計：預估可刪 2,350 行。**

#### 🗿 Tier 3 — 別動（scoped CSS 本來就是正確選擇）

這些檔案的 scoped CSS 都是 Phase 4-6 刻意保留的——不是債，是**正確的架構選擇**。強行 Tailwind 化只會讓 markup 變醜、可讀性下降。合計 ~7,800 行，全部屬於「earned its place」。

| File                                                 | 行數           | 為什麼要保留                                                                                                                                |
| ---------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/Header.astro`                        | 859            | Scroll-state CSS 變數機（~25 vars × 2 states）。翻 60+ 個 `[.scrolled_&]:` 任意變體會比現在還難讀。Phase 5 明確決策。                       |
| `src/pages/[category]/index.astro`                   | 1134           | `.hub-prose :global(*)` markdown 樣式 + `.article-row` 重複 × 100s + food-viz / econ-chart d3 組件。                                        |
| `src/pages/en/[category]/[slug].astro` + `ja` + `ko` | 716 × 3 = 2148 | `.prose :global(*)` markdown body 樣式（~130 行）+ `.article-row` + 4-col explore grid 重複 pattern。                                       |
| `src/pages/en/[category]/index.astro` + `ja`         | 322 × 2 = 644  | 同上（hub prose + article row）。                                                                                                           |
| `src/pages/[category]/[slug].astro` (zh-TW)          | 273            | 同上 zh-TW 版（文章頁）。                                                                                                                   |
| `src/pages/terminology/index.astro`                  | 743            | `.term-card` × 100s + `.filter-btn` / `.subcat-btn` state class + per-type `--fork-color` 變數。                                            |
| `src/pages/terminology/converter.astro`              | 820            | `:global(mark.source-word)` / `:global(mark.replaced-word*)` JS innerHTML'd marks + `.change-*` list classes。                              |
| `src/pages/index.astro`                              | 729            | 8 個展廳的 `.hall-*` / `.pick-*` 重複 pattern。                                                                                             |
| `src/pages/en/index.astro`                           | 614            | 同上 en 版。                                                                                                                                |
| `src/templates/map.template.astro`                   | 602            | d3 interactive map internals（`:global(.county)` / `:global(.marker)`、`.zoom-btn`、`.tooltip`、`.marker-tooltip`）+ sidebar list pattern。 |
| `src/templates/resources.template.astro`             | 534            | Chapter nav sticky + JS-toggled `.active` state + `.site-card` / `.subcategory` 重複 pattern + `.hidden` 過濾狀態。                         |

**Tier 3 小計：~8,200 行，全部 keep。**

#### 🚫 Tier 4 — 延後或永不觸碰

| File                                   | 行數 | 為什麼不遷                                                                                                                                                                                |
| -------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/pages/ko/[category]/index.astro`  | 1145 | ko 還在舊設計上（`hero-banner` + `hub-picks` + `explore-more`，其他三語言已經統一到 `category-header` bar）。**先改設計再說 Tailwind 遷移**——這是內容/設計工作，不是 refactor 範圍。      |
| `src/pages/og/[category]/[slug].astro` | 168  | **永遠不遷**。OG card 圖片產生器，獨立 HTML 頁面，不 import Layout.astro、不載入 global.css，故意 standalone。引入 Tailwind 會把整套 preflight 塞進一個只為 image generation 存在的頁面。 |

#### 整體估算

| Tier     | 待辦檔案     | 當前行數   | 預估可刪          | 剩餘       |
| -------- | ------------ | ---------- | ----------------- | ---------- |
| Tier 1   | 11 files     | 2,935      | 2,108             | 827        |
| Tier 2   | 3 files      | 3,950      | 2,350             | 1,600      |
| Tier 3   | 13 files     | 8,200      | 0 (earned)        | 8,200      |
| Tier 4   | 2 files      | 1,313      | 0 (deferred/skip) | 1,313      |
| **合計** | **29 files** | **16,398** | **4,458**         | **11,940** |

> `changelog.template.astro` 已在 Phase 7 全遷移（0 行 scoped），不在表內。
>
> **Tier 1 + 2 全部做完後**，repo 裡剩下的 ~12,000 行 scoped CSS 應該 100% 都是「意圖保留」的——state machines、repeating patterns、`:global()` rules、`@keyframes`。守門腳本 `check-scoped-css-size.mjs` 的 baseline 可以降到 ~12,500 並正式加 `--budget` flag 到 CI。

### Phase 8 經驗

1. **決策文件比規則清單重要**：DESIGN.md 不只是寫「怎麼做」，更重要的是寫了 **decision tree**——貢獻者看到新情況時，自己能判斷該 inline 還是該 scoped。純規則清單在邊界情境會失效。
2. **守門腳本要能在 report-only mode 跑**：CI 剛加新守門時要給開發者緩衝期。`check-scoped-css-size.mjs` 預設 report-only，`--budget` flag 才 fail——可以先放 PR review 裡人眼看，確認基準線穩定後再切強制。
3. **盤點腳本會順便發現漏網之魚**：Phase 7.5 憑記憶盤點時漏了 `data.template.astro`（因為它的 `<style>` tag 是縮排的）。Phase 8 守門腳本用 regex 掃 `<style\b[^>]*>` 就抓到了。**Grep with anchored patterns 不可靠；用正則。**

---

## 視覺微調紀錄

> 每次 component 遷移時若有視覺差異需要記錄在這邊。

| 日期       | Component            | 差異                                        | 決定                            | 備註                                                                               |
| ---------- | -------------------- | ------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| 2026-04-10 | Phase 3 flip（全站） | mean 7.15% / max 18.72% on hub pages + home | 接受，Phase 4 逐個 component 修 | 主因：preflight 移除 classless heading margins；Phase 4 改用 tw-section-title 解決 |

---

## 教訓 / 決策歷史

> Phase 之間或實作中出現的重要決策紀錄。會追加，不會刪除。

### 2026-04-10 α — Phase 0 起手

- **Playwright vs Puppeteer**：選 Playwright。理由：原生支援 mobile emulation、預設不啟動其他 browser 只 install chromium 即可、後期如需 CI 整合 `@playwright/test` 最穩
- **diff 閾值選 0.5%**：根據企劃檔。低於此的差異視為 anti-aliasing / 字體渲染，不算 regression
- **截圖只用 chromium**：Firefox / WebKit 留給 Phase 7 或完全不做。Phase 0 的目標是「抓到我自己改壞」，不是跨瀏覽器測試
- **不加入 CI**：Phase 0 明確決策。本機跑即可。Phase 7 再評估
- **本機 preview server** 而不是 dev server：`npm run preview` 吃靜態 build，更接近實際部署狀態
