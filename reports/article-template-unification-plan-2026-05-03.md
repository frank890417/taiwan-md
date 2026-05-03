# Article template unification — 設計與分階執行計畫

> 2026-05-03 sleepy-colden 後段，哲宇問「這個 page 要不要抽象化掉，參考 about / 或其他頁面」
> 對 — 6 個 [slug].astro × 1138~1297 行（總共 ~7400 行）大量重複，是 build perf 與維護成本雙重 bottleneck。
> 但完整 unification 是 3~5 hr 重構需要 verify 6 langs render 正確。本 doc 把計畫寫清楚分階執行，避免一次 ship 撞壞 6950 page 渲染。

## 目標

把 6 個 `src/pages/{lang}/[category]/[slug].astro`（其中 zh 在 `src/pages/[category]/[slug].astro` 沒 lang prefix）抽象成：

```
src/templates/article.template.astro     ← 共用 ~1100 行（HTML body + script context）
src/utils/article-static-paths.ts        ← 共用 getStaticPaths factory
src/pages/{lang}/[category]/[slug].astro ← 6 個各 ~30 行 thin wrapper
```

對照 about / dashboard 已經這樣做了：

```
src/pages/about.astro                    → 5 行: <AboutTemplate />
src/templates/about.template.astro       → 全部邏輯
```

預期收益：

- **行數**：7400 → ~1300（template + util）+ 6×30（wrappers）= ~1480 行（**80% 減少**）
- **per-page perf**：跟 Tier 1.4 articles-index 累加，估 -5~10ms/page（template factor 一次 import vs 6 次 parse）
- **正確性**：消除 PR #758 ship es/fr 帶 JA copy-paste bug 的 class（已在 Tier 1.4 fix related articles 部分；getStaticPaths 內仍有殘留）
- **維護**：1 處改 = 6 lang 同步生效

## 為什麼今天沒做完

完整重構需要：

1. 讀完 6 × 1100~1300 行 ≈ 7400 行 fully
2. 找出 lang-specific divergence（font / lang attr / Perspectives/SporeFootprint/DiaryTeaser 只在 zh / i18n strings）
3. 設計 prop schema 容納所有 divergence
4. 改寫 6 wrappers
5. Build + verify 6 langs × 941 articles 都渲染正確 + ?shot=1 OG 也正常
6. Pre-commit hook + i18n coverage audit 不撞 false-fail

3~5 hr 連續工作 + 不可分批 ship（half-merged 撞 production）。

跟 sleepy-colden 同 session 還要做 perf instrumentation / lang-switch pre-build / Layout split / ReaderSettings overlay，做到一半 ship 風險高。

## 分階執行計畫

### Phase A — 已完成（sleepy-colden 同 session）

- ✅ `src/utils/articles-index.ts` 共用 frontmatter cache（Tier 1.4）
- ✅ 6 [slug].astro 的 relatedArticles + allArticles 改用 `getRelatedArticles` / `getAllArticles`
- ✅ 順便 fix es/fr 的 PR #758 JA copy-paste bug（related articles 顯示日文）

### Phase B — 下個 evolve session（半天工時）

#### B1. 抽 ArticleStaticPathsFactory（1 hr）

```typescript
// src/utils/article-static-paths.ts
import type { Lang } from '../config/languages';

export async function getStaticPathsForLang(
  lang: Lang,
): Promise<Array<{ params: { category: string; slug: string }; props: any }>> {
  // 讀 knowledge/{lang}/{Cat}/ 或 knowledge/{Cat}/（zh），統一邏輯
  // 對 en/ja/ko/es/fr：filter through translations.json 確保有對應翻譯
  // 對 zh：直接列 knowledge/{Cat}/
}
```

風險：低（純 data 抽取，沒 UI 變化）。
驗證：每 lang 新 paths 數量等於原本（diff `astro build` 時 sitemap 路由）。

#### B2. 抽 ArticleScriptContext（1 hr）

把 6 [slug].astro 的 `---` script 區（除 getStaticPaths 外的 frontmatter / marked 處理 / splitMarkers / 計算 categoryInfo / getGitInfo / etc.）合併進一個 `prepareArticleProps(props, lang)` util。

```typescript
// src/utils/article-prepare.ts
export function prepareArticleProps(astroProps, lang: Lang) {
  // marked.parse, splitMarkers, hasSSoDT, splitIndex computation, etc.
  return { processedContent, contentBeforeReading, contentAfterReading, hasSSoDT, ... };
}
```

#### B3. 抽 article.template.astro（2 hr，最大）

把 6 [slug].astro 的 HTML body 整合，受 `lang` prop 控制：

- `<main lang={lang}>`（zh-TW 用 'zh-TW'，其他用 lang 字串）
- font 透過 lang-specific CSS class 切（`font-noto-tc` / `font-inter` / `font-noto-jp` 等）
- 條件 render Perspectives / SporeFootprint / DiaryTeaser（目前只 zh 有，但若統一 = 補齊 en/ja/ko/es/fr 缺失功能 — 順便 fix）
- i18n strings 全部 via `useTranslations(lang)`

驗證：

- `astro build` 全程不 fail
- ?shot=1 OG 模式正常
- pre-commit hook 不撞 i18n coverage false-fail
- 6 lang × 5 article 抽樣（zh 太魯閣 / en taroko / ja 台南 / ko 慶州 / es 太極 / fr 故宮）視覺對比 production 跟 local build

#### B4. 替換 6 wrappers（30 min）

每個 wrapper 變成：

```astro
---
import ArticleTemplate from '../../../templates/article.template.astro';
import { getStaticPathsForLang } from '../../../utils/article-static-paths';
import { prepareArticleProps } from '../../../utils/article-prepare';

export const getStaticPaths = () => getStaticPathsForLang('en');

const props = prepareArticleProps(Astro.props, 'en');
---

<ArticleTemplate lang="en" {...props} />
```

#### B5. Verify + ship

- Local astro build 完整跑（~22 min in current state, hopefully ~16 min after Tier 1+2 ship）
- 跨 6 lang 抽樣 + ?shot=1 OG + dashboard.astro 還是工作
- Commit + push + monitor deploy run

## 預期 perf 影響

| 項目                                      | Before           | After Tier 1 (已 ship) | After Tier 2 unification   |
| ----------------------------------------- | ---------------- | ---------------------- | -------------------------- |
| 6 [slug].astro 總行數                     | ~7400            | ~7000                  | ~1480                      |
| relatedArticles / allArticles fs ops/page | O(N²)            | O(1) cached            | O(1) cached                |
| Layout.astro size                         | 977              | 977                    | 977（後續 Tier 2.6 split） |
| getLangSwitchPath cost/page               | ~150-300ms build | O(1) JSON load         | O(1) JSON load             |
| **per-page render avg**                   | **167ms**        | **~140ms（估）**       | **~125ms（估）**           |
| Total build (6950 pages)                  | 1161s = 19.4min  | ~970s = 16.2min        | ~870s = 14.5min            |

跟 4/30 baseline 128ms / 311s 比：page count 仍 2.9x（無法不 raw routes），per-page 回到 ~125ms。Total build time ~14.5min 是哲宇要的方向。

## 不做的反面

考慮過但 reject 的方向：

1. **Astro content collection 全面遷移** — Astro 6 schema 寫法 + 既有 frontmatter 6 lang × 941 article 驗證成本太高，回報不如 unified template。
2. **保留 6 [slug].astro 但加更多共用 component** — 切細到 `<ArticleHero />` + `<ArticleBody />` + `<RelatedSection />` 等 sub-component。看似漸進但 props passing 跟 import path 仍 6 處重複，達不到 about/dashboard pattern 的乾淨度。
3. **Vite worker thread parallelize render** — Astro 內部限制；非用戶層可控。

## 觸發實作的條件

- 哲宇下次 evolve session 給半天 dedicated 時間
- Tier 1 已 merged stable（不要 stack 太多 in-flight refactor）
- 對 i18n coverage audit baseline 有信心（避免 unification 暴露既存 i18n string 缺失）

## 跟 DNA 的關聯

- **DNA #20 architecture-as-data**：unified template 是「結構導向」最大化應用 — 6 lang 的差異全變 prop / data，不是 6 份程式碼
- **DNA #15 反覆浮現要儀器化**：「6 lang 各自 copy-paste 帶 bug」這個 pattern 已 instantiate 多次（PR #758 es/fr → ja copy-paste）；template unification 是這個 DNA 的工程版固化

## 簽名

🧬 sleepy-colden 後段
誕生原因：哲宇看到 Tier 1.4 改 6 個 [slug].astro 同樣的 pattern，問「這個 page 要不要抽象化掉，參考 about / 或其他頁面」
為什麼今天不直接做：safe ship 需要 verify 6 lang × 941 article × 跨頁面型別 + OG ?shot=1 + dashboard 都還 work，不夠 session 時間做完。Tier 1.4 articles-index 已是 prep work，Phase B 是這個 design 的接力。
