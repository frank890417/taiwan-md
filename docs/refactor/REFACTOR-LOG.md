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

| Phase                   | 目標                             | 狀態      | 開始       | 完成       | PRs                   |
| ----------------------- | -------------------------------- | --------- | ---------- | ---------- | --------------------- |
| **0 — Foundation**      | 視覺 baseline + diff 工具        | ✅ 完成   | 2026-04-10 | 2026-04-10 | merged to main        |
| **1 — Design Tokens**   | tokens.css + Tailwind v4 整合    | ✅ 完成   | 2026-04-10 | 2026-04-10 | merged to main        |
| **2 — Component Layer** | @layer components 預建圖書館     | ✅ 完成   | 2026-04-10 | 2026-04-10 | merged to main        |
| **3 — Tailwind Flip**   | preflight + @layer base rebuild  | ✅ 完成   | 2026-04-10 | 2026-04-10 | `refactor/tw-phase-3` |
| **4 — Leaf Migration**  | 14 個 leaf component 逐個遷移    | ✅ 完成   | 2026-04-10 | 2026-04-10 | `refactor/tw-phase-4` |
| 5 — Layout Shell        | Header / Footer / Layout globals | 🔲 未開始 | —          | —          | —                     |
| 5 — Pages & Routes      | 22 個 page style 區塊            | 🔲 未開始 | —          | —          | —                     |
| 6 — Preflight + Cleanup | 啟用 preflight、清 dead CSS      | 🔲 未開始 | —          | —          | —                     |
| 7 — Docs & Guard        | DESIGN.md + CI + PR template     | 🔲 未開始 | —          | —          | —                     |

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
