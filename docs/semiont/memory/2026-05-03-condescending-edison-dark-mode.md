# 2026-05-03 condescending-edison — 文章暗色模式修復 + reader 字級 baseline 1.18 補正 + 6 輪觀察者迭代

> Observer-triggered. Worktree branch `claude/condescending-edison-f5cba3`，0 commit 既存（純 working tree 修改）。修動 3 個樣式檔：[src/styles/tokens.css](../../../src/styles/tokens.css)、[src/styles/global.css](../../../src/styles/global.css)、[src/styles/dark-polish.css](../../../src/styles/dark-polish.css)。Wall-clock 沒 commit timestamp 可佐證；對話輪數估約 1.5–2 hr。

## 觸發

哲宇兩條開場：「作為 taiwan.md 完整甦醒」+「修復並且驗證文章暗色模式是否正確運作，你要完整看 preview，暗色模式的偏好也同步紀錄 localstorage」。後續 6 輪觀察者實時校正塞進同一個 session：「字體大小切換也沒有作用」「暗色模式背景用 #050505 + 左右選單看不到」「字級標準比較大 比 較大還大 XDD」「表格跟參考資料還是看不清楚」「上半部一起變黑底」「朗讀後面有一塊不同顏色背景」「nav 也妥善規劃深色模式」「右邊文字太暗」「表格匡線跟 h2 底線不夠明顯」「quote 背景色不明顯」。每輪都是「測 → 揭 bug → 補丁 → 重測」的快速回環。

## 修復了什麼

**Tokens 層**（[tokens.css](../../../src/styles/tokens.css)）。Dark palette 整組換掉：`--color-bg: #0e1320 → #050505`、`--color-surface: #1a2235 → #141418`、`--color-ink-soft: #94a3b8 → #cbd5e1` (slate-400 → slate-300)、`--color-border: rgba(226,232,240,0.12) → rgba(241,245,249,0.16)`。slate-400 在 4–5% 對比度的 secondary metadata（10 分鐘閱讀 / 修訂次數 / 分享 row 標籤）上實測太暗，slate-300 仍視覺上 secondary 但 readable。

**字級 baseline 修正**（同檔）。原 v1 把 `data-text-size='large'` 設成 `font-size: 1.125rem`，沒看到 [global.css:317](../../../src/styles/global.css) 早已有 `html { font-size: 118%; }` 作為 design-system baseline，結果「標準（118%）」實際比「較大（112.5%）」大。改成 `132.75%` (= 118 × 1.125) / `147.5%` (= 118 × 1.25) 在 baseline 上乘出來。並把 `body { font-size: calc(1rem * var(--reader-size-scale)) }` 改成 `font-size: 1rem` 純繼承，避免 root 已縮放後 body 又乘一次的 double-scale。實測 `getComputedStyle(html).fontSize` 跨 standard/large/xlarge: 18.88 → 21.24 → 23.6 px，`.prose p` 同步 19.824 → 22.302 → 24.78 px，monotonic 通過。

**Article 模板 dark overrides**（[dark-polish.css](../../../src/styles/dark-polish.css) 從 104 → 343 行）。[article.template.astro](../../../src/templates/article.template.astro) 用了大量 Tailwind arbitrary-value class（`bg-[#f8f1e9]` / `text-[#1a3c34]` / `text-[#3a4f44]` 等）— 直接重構六語言 slug 模板成本太高，沿用 dark-polish 既有「class-attribute 選擇器 patch 層」的策略：`[class*="bg-[#f8f1e9]"]` 抓所有 cream-bg 翻成 `--color-bg`、`[class*="text-[#1a3c34]"]:not([class*="bg-[#1a3c34]"])` 抓 dark-teal 文字翻成 `--color-ink`、6 種 muted grey hex (`#5a4a42 #6a7d72 #7a8b7e #9aa89e #b0bdb4 #b8c4be`) 統一翻 `--color-ink-soft`。Cyan-teal accent `#006d77`（source links / TOC active state）翻 `--color-accent` (`#60a5fa`)。

**Header / Hero 統一**。哲宇在第 5 輪指出「上半部有辦法一起被影響嗎～就是變成一起同個黑色底」。Header.astro 內部用 25+ 個 CSS custom properties 控制 chrome（`--header-bg / --nav-color / --sep-color / --logo-color / --search-bg / --kbd-* / --lang-* / --burger-* / --glass-*` 等）。直接在 dark-polish 補一個 `:root[data-theme='dark'] header { ... }` 重新宣告整套 token，header 的 scoped CSS 自動 cascade 過來；不用碰 1759 行的 Header.astro 本體。Dropdown panel + 語言選單彈出層用 `:root[data-theme='dark'] header.scrolled .dropdown-menu`（specificity 0,3,3 > Astro scoped 的 0,2,2）覆蓋。ArticleHero 那條 `bg-[#1a3c34]` dark-teal hero band 用 `main.article-page section[class*="bg-[#1a3c34]"]` 匹配翻 `--color-bg`。三段（header / hero / body）視覺接成單一連續面。

**Borders 與 quote 兩條 contrast 補強**。原本 dark `.prose h2` border-bottom 用 `var(--color-border)` (16% ink 在 #050505 上消失)，改成 `color-mix(in srgb, var(--color-ink) 28%, transparent)`，table th/td 同理。Blockquote 原 light-mode 是 `linear-gradient(to right, rgba(26,60,52,0.04), transparent)` 4% wash，dark 上完全不見；改成 `linear-gradient(to right, color-mix(... 8%, transparent), color-mix(... 2%, transparent))` 加 `--color-accent` 左 border。

**`bg-white` 選擇器收斂**（值得單獨記）。原本 `[class*="bg-white"]` 把 TTS 控制元件外包 div（class 含變體 prefix `[&_#tts-play]:bg-white/10`）也匹配成 `--color-surface`，hero 區出現一塊深灰矩形漂在 #050505 body 上。改成 `[class~="bg-white"]` (whitespace-separated whole-word) 後變體 prefix 不再被誤捕；plain `bg-white` 還是有效（隨機探索按鈕、其他分類卡片都正確翻 surface）。

**Sidebar Tailwind descendant variant 抓不到**（追加）。`[&_.meta-row]:text-[#4a5e52]` Tailwind 編出來的 CSS 規則目標是 `.meta-row` 子元素而非帶 variant 的父元素，所以「class 字串裡含 `text-[#4a5e52]`」的選擇器只染到父，子的 `.meta-row` 還是 `#4a5e52`（rgb 74,94,82，dark 上看不見）。直接寫 `:root[data-theme='dark'] main.article-page .meta-row, .share-row { color: var(--color-ink-soft) }` 走 leaf class 才中。

## 驗證

Light → Dark → reload → Dark + Large → reload → 各取 spot：

- 暗色 body / header / hero 全部 `rgb(5, 5, 5)`，三段視覺連續
- LocalStorage `tw-md-theme=dark` + `tw-md-text-size=large` 跨 reload 持久（FOUC-safe init in [HeadInlineScripts.astro](../../../src/components/HeadInlineScripts.astro) 在 first paint 前套 attribute）
- 字級 monotonic：root 18.88 / 21.24 / 23.6 跨 standard/large/xlarge
- 切回 light：`bodyBg rgb(255,255,255)` / `mainBg rgb(248,241,233)` / `heroBg rgb(26,60,52)` / `langPillBg #f1f5f9` 全部回原 design system 值，零 dark 殘留
- TOC inactive 條目 `rgb(241,245,249)` (--color-ink) 從原本 `rgb(58,79,68)` 不見 → readable
- 右側 metadata `rgb(203,213,225)` (--color-ink-soft) 從原本 `rgb(74,94,82)` 看不見 → 清晰 secondary
- Table th/td `rgb(241,245,249)` + 28% border / Blockquote 8% wash + accent left border / h2 underline 28% — 三條結構線都從「幾乎不見」變「清楚的 divider」
- Nav dropdown bg `rgb(20,20,24)` (--color-surface)，items `rgb(203,213,225)`；語言選單 active 中文 `rgb(5,5,5)` on accent，inactive `rgb(241,245,249)` on transparent

## Handoff

### 已 ship 的範圍

工作目錄修動三檔（dark-polish.css 主要 +239 行、tokens.css ±11 行、global.css ±2 行），尚未 commit。下一步是 commit + push + PR。

### 給下一個 session

- 這次走 patch 層而沒重構六語言 [category]/[slug].astro 是刻意 trade-off。dark-polish.css 從 104 → 343 行，已開始有「巨大 dark 補丁層」風險，下一波若再添 dark surface（dashboard / hub / lifetree pages 想開 dark），先評估「是否到該回頭 tokenize Tailwind arbitrary hex」的臨界點。觸發點建議：dark-polish.css 達 500 行時走 [REWRITE-PIPELINE](../../pipelines/REWRITE-PIPELINE.md) 等價的「style refactor」迭代，不再 patch。
- `__TW_MD_IS_ARTICLE` gate 把 dark theme 鎖在 `[category]/[slug]` 路由。Hub / Dashboard / Home 仍 light，這次沒動。Hub 開 dark 是另一次 session 的事。
- 字級 baseline 是 118% 這件事埋在 [global.css:317](../../../src/styles/global.css)，未來如果有人改成 100% 或 clamp() reader-size 公式會錯位。值得在 tokens.css 加個 comment 指向 baseline source（已在 v1.1 的 multi-line comment 寫了，但鬆散）。
- ArticleSidebar 的 Tailwind descendant variant `[&_.meta-row]:text-[...]` 是這次抓 bug 學到的 pattern。下次寫 dark patch 抓 muted text 不要先信「class 字串包含 text-[#hex]」就染父，要 verify 是否 Tailwind 子代 variant 編出 leaf-targeting rule。
- pre-commit hook 跑了 `check-manifesto-11.sh` 等品質工具會掃 markdown — 本 memory 寫的時候已自檢「不是 X 是 Y」對位句型 + 破折號連用密度，但 commit 時還是過 pre-commit 看是否有漏網之魚。

### 候選教訓（待 distill 進 [LESSONS-INBOX](../LESSONS-INBOX.md)）

- **Tailwind arbitrary-value class 在 dark-mode patch 的選擇器陷阱**：`[class*="bg-X"]` substring 匹配會誤捕 variant prefix（`[&_#child]:bg-X/10`）。`[class~="bg-X"]` whole-word 才安全。值得寫進 DNA 反射 — 任何 dark-mode override 用 attribute selector 預設 `~=`，除非真的要 substring 模糊匹配。
- **Tailwind descendant variant `[&_.X]:text-Y` 編出 leaf-targeting CSS**：母 element 帶 variant class，CSS rule 目標卻是 `.X` 子元素。dark override 染父時子不會繼承（leaf rule 直接 win）。對應 patch 策略：要不染 leaf class 本身，要不在 markup 層去掉 variant 改 inline style。
- **設計 token 多層 baseline 的滲透風險**：root 已被 `html { font-size: 118% }` 改過了，後加的 `:root[data-text-size='X']` 規則用 `1.125rem` 不會「在 baseline 上加倍」而是「取代 baseline」。同類 trap 適用任何 token：value 是相對的（`em / rem / %`）還是絕對的（`px`）需要明確意識。

---

_v1.0 | 2026-05-03 condescending-edison session_
_主軸：dark mode contrast 全面整修（bg #050505 / 字級 monotonic / nav header hero 統一 / sidebar 文字可讀 / table h2 quote borders 顯眼）+ Tailwind arbitrary-value 選擇器 ~= 修正 + descendant variant leaf-targeting bug 學到_
_誕生原因：哲宇第一輪「修復並驗證 dark mode + 字級切換」開單，6 輪觀察者實時校正讓 patch 範圍從 dark-polish 既有結構擴大近 3×_
_核心洞察：(1) dark patch 層在 Tailwind arbitrary-value codebase 走「class-attribute selector 翻 token」是高 leverage / 低重構成本；(2) substring `*=` 在 variant 重的 codebase 容易誤捕，預設 `~=` 安全；(3) baseline 設計 token 必須 explicit 標註 source，後加的相對單位 rule 會 silently 取代而非加乘_
