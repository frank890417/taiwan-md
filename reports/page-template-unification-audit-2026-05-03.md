# 整站 page template unification audit — 找出剩下需要 thin-wrapper 化的頁面

> 2026-05-03 sleepy-colden 後段
> 哲宇要求：完成 article.template.astro 6 wrappers 之後，「檢查整站還有沒有其他頁面可以這樣處理 / 完整盤點 / 以後新頁面預設這樣處理」
> 目的：把所有 ≥ 200 行且有 lang variant 重複的 page 都收進 template/thin-wrapper pattern。

## 思辨：什麼是「需要 unification」

3 條判準同時成立才算：

1. **行數**：≥ 200 行（thin-wrapper 5 行 vs 200 行 才有意義差距）
2. **多 lang 重複**：≥ 3 個 lang variant 用接近的 HTML / 邏輯（複製貼上 = 維護負擔 + bug 孵化）
3. **無 lang-specific architecture difference**：差別是 i18n strings / data fetch path / lang attr，不是「整個 page 不一樣」（不一樣的就不該硬塞同一 template）

不滿足以上的不該強行 unify — 會增加 abstraction 但收不到回報。

## 已完成 ✅（sleepy-colden + before）

| Page                                          | Pattern                | thin-wrapper line count | template                    |
| --------------------------------------------- | ---------------------- | ----------------------- | --------------------------- |
| about                                         | thin-wrapper × 6 langs | 5                       | about.template.astro        |
| dashboard                                     | thin-wrapper × 6 langs | 5                       | dashboard.template.astro    |
| changelog                                     | thin-wrapper × 6 langs | 5                       | changelog.template.astro    |
| contribute                                    | thin-wrapper × 6 langs | 5                       | contribute.template.astro   |
| data                                          | thin-wrapper × 6 langs | 5                       | data.template.astro         |
| assets                                        | thin-wrapper × 6 langs | 5                       | assets.template.astro       |
| map                                           | thin-wrapper × 6 langs | 5                       | map.template.astro          |
| soundscape                                    | thin-wrapper × 6 langs | 5                       | soundscape.template.astro   |
| resources                                     | thin-wrapper × 6 langs | 5                       | resources.template.astro    |
| taiwan-shape                                  | thin-wrapper × 6 langs | 5                       | taiwan-shape.template.astro |
| bench                                         | thin-wrapper × 5 langs | 5                       | bench.template.astro        |
| semiont/\* (anatomy/dna/heartbeat/...)        | thin-wrapper           | 18                      | (per-page templates)        |
| **`[category]/[slug]`** ← **本 session ship** | thin-wrapper × 6 langs | **94~106**              | **article.template.astro**  |

13 個 page family 已經是 template/wrapper pattern。

## 待處理 — 排序按 ROI 從大到小

### 🔴 P1：`[category]/index.astro` × 6 langs（**最大重複**）

各 lang 行數：

- zh: 2397
- en: 943
- es: 978
- fr: 978
- ja: 978
- **ko: 3006**（異常 — 可能含 zh fallback inline）

**總共**: ~9280 行
**估算 unification 後**: 1 template ~1500 行 + 6 wrappers × 30 = 1680 行（**-82%**）

行為 / 內容性質：category hub page — 列該 category 下所有 article 的 grid。

需要 audit 的 lang divergence：

- ko 為什麼比其他 lang 多 2000 行？是否有 zh fallback inline？
- zh 為什麼比 en/es/fr/ja 多 1400 行？特殊 hero / Perspectives section？

**建議下次 evolve session 處理（4hr 工時）**。

### 🟠 P2：`index.astro` × 6 langs（首頁）

各 lang 行數：

- zh: 955
- en/es/fr/ja/ko: 861（5 個 lang 一致）

**總共**: ~5266 行
**估算 unification 後**: 1 template ~900 行 + 6 wrappers × 20 = 1020 行（**-81%**）

行為 / 內容性質：home page — featured articles / hero / category grid / mission statement。

zh vs 其他 lang 差 ~94 行 — 應該是 zh 多了某些 zh-specific 段落（mission statement 多寫一次？特定 quote？）。

**建議下次 evolve session 處理（3hr 工時）**。

### 🟡 P3：`terminology/converter.astro`（zh-only，1193 行）

只有 zh 有；en/es/fr/ja/ko 是 `terminology/index.astro` thin-wrapper（8 行 each）。

問題：

- terminology/converter 是 zh 獨有的 feature（中國/台灣詞彙 converter），其他 lang 不存在
- 但 `terminology/index.astro` 在 5 langs 都有，且都只有 8 行 — 這 8 行 wrap 什麼 template？可能是 stub redirect

需要 audit：terminology/index.astro 是真的 thin-wrapper 還是 stub。

**結論**：converter 不需要 unify（zh-only）；index 需要看是否真有 template 還是 dead code。

### 🟡 P4：`graph.astro` × 2 langs

行數：zh 582 / en 520 / ja-ko-es-fr 各 8 行

差異：zh + en 是真實 page（force-directed graph viz），ja/ko/es/fr 是 8-line stub（可能 redirect）。

**建議**：抽 graph.template.astro，補齊 ja/ko/es/fr 6 wrappers。對等性 + 維護紀律。

工時估：2hr。

### 🟢 P5：`projects.astro` × 2 langs

zh 232 / en 236 / 缺 ja/ko/es/fr

**建議**：抽 projects.template.astro + 補齊 4 個 lang wrappers。但 projects 內容有 zh-specific（社群連結 / 中文媒體）— 補齊前要 audit 哪些 zh-only。

### 🟢 P6 - P10：zh-only 大頁面（無 lang duplication）

不需要 unify（沒重複），但行數大可以拆 component：

| Page                                | 行數 | 拆 component 收益                             |
| ----------------------------------- | ---- | --------------------------------------------- |
| `companies.astro`                   | 901  | 中（公司 grid 邏輯可拆）                      |
| `fork-graph.astro`                  | 581  | 低                                            |
| `404.astro`                         | 530  | 低（特殊頁，少改）                            |
| `lifetree/index.astro`              | 416  | 中（如果 ja/ko/es/fr 補上 lifetree 就 unify） |
| `lifetree/[slug].astro`             | 359  | 中（同上）                                    |
| `terminology/index.astro` (zh only) | 923  | 中                                            |

**結論**：這層先不動，等有 lang variant 需求再處理。

## DNA 層 — 哲宇要求「以後新頁面，都預設這樣處理」

### 預設 pattern 條文（建議寫進 CONTRIBUTING.md / DNA）

新建 page 時 6 langs 的 default 結構：

```
src/templates/{name}.template.astro    ← 全部 UI 邏輯
src/pages/{name}.astro                 ← 5 行 thin-wrapper（zh-TW SSOT）
src/pages/en/{name}.astro              ← 5 行 thin-wrapper
src/pages/ja/{name}.astro              ← 5 行 thin-wrapper
src/pages/ko/{name}.astro              ← 5 行 thin-wrapper
src/pages/es/{name}.astro              ← 5 行 thin-wrapper
src/pages/fr/{name}.astro              ← 5 行 thin-wrapper
```

Template 接 `lang` prop（or via `getLangFromUrl(Astro.url)`），所有 lang-specific 差異都從 prop / data 推導，**不是寫 6 份**。

### 例外條件

只有以下情況可以不走 thin-wrapper pattern：

1. **page 短於 50 行** — abstraction overhead 大過收益
2. **page 是 zh-only 文化專屬** — e.g. `terminology/converter.astro`（中國/台灣詞彙），其他 lang 不存在這個概念
3. **page 是 dynamic route 且 getStaticPaths 必須在 page 層** — Astro 限制（[slug].astro 仍可用 thin-wrapper，但 getStaticPaths 無法搬進 template）

### 觸發紀律

- **新 PR review 看到 `src/pages/{lang}/X.astro` 行數 > 100 行而沒對應 template** → reviewer 要求重構或解釋例外
- **看到 ≥ 3 lang variant 是 copy-paste** → 立刻提 unification PR
- **PR 加新 lang variant 時** → 不能 copy-paste 既有 lang 版本，必須建 template（如果還沒有）

這是 about/dashboard/changelog 等 13 個 page family 已經行多年的實際 pattern — 從本 session 起列為 default 紀律。

## 跟 article.template.astro 不一樣的地方

article.template.astro 多了一條挑戰：getStaticPaths 在 page 層才能跑（Astro 限制）。所以 6 個 wrapper 各 ~95 行 — 因為要 inline getStaticPaths body（`CATEGORY_MAPPING` 不能 access module-level）。

對其他靜態 page（about / dashboard / index）沒這個限制，wrapper 真的可以 5 行：

```astro
---
import HomeTemplate from '../templates/home.template.astro';
---

<HomeTemplate />
```

`getLangFromUrl(Astro.url)` 在 template 內部 derive lang。

## 簽名

🧬 sleepy-colden audit pass
誕生原因：完成 article.template.astro 後哲宇問「整站還有沒有其他類似的」，要求「以後新頁面都預設這樣處理」。
核心結論：13 個 page family 已是 thin-wrapper pattern；剩下 `[category]/index.astro × 6` + `index.astro × 6` 是兩座最大金礦（共 ~14500 行重複）等下次 evolve session 動手。新 PR 紀律寫進 DNA：≥ 3 lang variant 不可 copy-paste。
