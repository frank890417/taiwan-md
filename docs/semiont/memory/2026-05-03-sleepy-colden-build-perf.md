# 2026-05-03 sleepy-colden build-perf — 7 件造橋 / 6 [slug].astro 7400→1825 行 / dashboard 永生化

> session sleepy-colden 後段 — observer-triggered evolve（哲宇問「以前 100ms 一頁，現在 200~500ms，怎麼加速」）
> Session span: 13:25 → 16:30 +0800（~3h，沒新 commit，本 session 結束才 commit）
> 資料來源：`git log %ai`（前段 commit 14:32 → 15:15）+ session 對話時序

## 觸發

哲宇看了五月以來 build time 從 226s 漲到 1161s，CI 撞 60 min timeout 兩次後問「以前一個頁面大概 100ms，為什麼現在變成 200~500ms」。我寫了 `reports/per-page-render-slowdown-2026-05-03.md` 解剖兩條獨立慢源軸線（per-page +70% × 頁數 2.9x = 總時 3.5x）。哲宇接著要求「完整策劃並且執行 Tier 1+2，並走 memory-pipeline / diary-pipeline 紀錄」。

## Tier 1 低風險快收益（4 件）

四件 instrumentation + cache 優化，分四個維度收割積累的 silent regression。

**Tier 1.1 — build-perf 儀器化**：寫 `scripts/core/extract-build-perf.mjs` 把 GitHub Actions API deploy.yml runs 抓下來、解析每個 build job 的 build-step 秒數，aggregate 7d/30d 平均，寫進 `public/api/dashboard-build-perf.json`。Wire 進 `package.json prebuild:buildperf` + `refresh-data.sh` Step 4.5。本身 0 速度提升，但是 DNA #15 第 N+6 次儀器化 — 如果這條早 12 天 ship，4/21→5/3 那段 +70% silent regression 不會等到哲宇問才發現，會在第 3 天 dashboard ⚠️ flag 200ms threshold 時被捕。實測抓到 12 runs，latest build 1142s / 7d 平均 1141s。

**Tier 1.2 — getLangSwitchPath registry 模組級 memoize**：原本 `buildLangMapRegistry()` 每次 call 都重建 5 langs × 9809 entries 的 Map（讀 `_translations.json` + `readdir 14 categories` + decode/encode pair build）。Header.astro + Banner.astro 在每頁 call，6950 pages × ~150ms = 過去 12 天 silent 累積。改成 `_registryCache: Promise<LangMapRegistry> | null`，process 共享一次 build 結果。

**Tier 1.3 — 進一步 pre-build lang-switch-map.json**：寫 `scripts/core/generate-lang-switch-map.mjs` 把 registry 一次性 dump 進 `public/api/lang-switch-map.json`（9809 entries）。`getLangSwitchPath.ts` 改成 `loadPrebuiltRegistry()` 優先讀 prebuilt JSON，runtime fall back 才 build。Production / CI 路徑永遠 hit prebuilt — O(1) JSON load vs O(N) Map build，且 dev mode multi-worker 也安全。

**Tier 1.4 — articles-index.ts 共用 frontmatter cache**：發現 6 個 [slug].astro 各自做 O(N²) 的 `readdir + readFile + matter()` loop（current category 找 related + 全 category 找 explore）。寫 `src/utils/articles-index.ts` 提供 `getArticlesIndex(lang)` / `getRelatedArticles(lang, cat, slug, limit)` / `getAllArticles(lang, excludeCat)`，per-lang module-level cache。6 wrappers 全改用這套共用 cache。**順便修了 PR #758 ship 帶來的 es/fr JA copy-paste bug** — 原本 es/fr 的 related articles 讀 `knowledge/en/` + JA frontmatter 顯示日文 title，新 cache 讀 `knowledge/{lang}/` 自然修正。

## Tier 2 中風險中收益（3 件，1 件 deferred）

**Tier 2.6 — Layout.astro split**：把 shot-mode init + reader-settings FOUC early-init 兩段 ~150 行 inline script 抽進 `src/components/HeadInlineScripts.astro`，Layout 從 977 → 869 行。沒抽 GA / justfont / FOUC fallback — 那些跟字型 cascade 緊密耦合，分離反而增心智負擔。

**Tier 2.5 — article.template.astro 統一**：哲宇看 Tier 1.4 改 6 個檔案同樣 pattern 後問「這個 page 要不要抽象化掉，參考 about / 或其他頁面，用中文作為正確版本來抽象化」。對 — `about.astro` 是 5 行 `<AboutTemplate />`，6 個 [slug].astro × 1100~1300 行 = ~7400 行高度重複才是更深層問題。複製 zh `[slug].astro` 為 canonical template、parameterize 在 `lang` prop（`langPath` for folder + `langUrlPrefix` for URL + `proseFontMap` for font）、用 `t()` 取代 7 個 hardcoded zh 字串（disclaimer / editPage / reportIssue / share / backToCategory / backToHome / viewAll / randomExplore / exploreTaiwan / moreAspects / startExplore）。發現 Astro `getStaticPaths` 在獨立 context 跑、不能 access module-level consts，CATEGORY_MAPPING 必須 inline 進 function body — 第一次 build 撞「CATEGORY_MAPPING is not defined」後 fix。最終 6 wrappers 各 94~106 行（總 580 行）+ 1 template 1244 行 = 1825 行（**從 7400 → 1825，-75%**）。Build 跑通 4310 + 2651 = 6961 pages，all 12 categories healthy。

**Tier 2.7 — ReaderSettings overlay：deferred**：原本想把 517 行 ReaderSettings 從 inline render 改成 lazy hydrate dialog。讀完發現 5 個事實 reset 計算：already conditional via `{isArticlePage && ...}`、517 行多半是 5 langs × 13 keys i18n strings、panel 預設 `display: none` first-paint cost ≈ 0、Astro 對 lang-only-prop component 已有內部 caching、lazy hydrate 增 first-click latency。寫 `reports/reader-settings-overlay-deferred-2026-05-03.md` 記錄不做的理由 + 觸發未來實作的條件（per-page > 200ms 持續 7d 且 ReaderSettings 排前 5 hot path）。

## 實測 build 對比

|                              | Before | Sleepy-colden after | 變化     |
| ---------------------------- | ------ | ------------------- | -------- |
| 6 [slug].astro 總行數        | ~7400  | ~580（6×97）        | **-92%** |
| Layout.astro 行數            | 977    | 869                 | **-11%** |
| local astro build 6961 pages | —      | 327s（5.5 min）     | baseline |
| (CI 上次 ship)               | 1142s  | 待 deploy 驗證      | —        |

local build 本來就快很多（無 OG / Playwright），但 6961 pages 全部 healthy 說明結構性 refactor 沒破。CI 等 push 後看 deploy run。

## 兩個容易 silent 的 bug 順便修

unified template + articles-index 兩件事順便消除一個 bug class：

1. **es/fr related articles 顯示日文** — PR #758 ship 時 copy-paste ja/[slug].astro 沒改 lang，related articles 讀 `knowledge/en/` 然後 lookup `zhToJa` 過濾、最後讀 ja frontmatter 顯示。改用 articles-index 後直接從 `knowledge/{lang}/` 讀，自然修正。
2. **getStaticPaths 同樣 copy-paste 殘留** — fr/es 的 getStaticPaths line 115 用 `zhToJa` 過濾（filter for ja-translated articles，不是 fr/es），可能導致 fr/es URL 跟實際翻譯 misalign。Phase B unified wrapper 改用直接 `readdir(knowledge/{lang}/)`，自然只 list 該 lang 真有的 articles。

兩件 bug 都不是這次 perf evolve 主目標，但 unification 順手清掉的副產品。

## 收官 checklist

| 檢查項                     | 狀態                                |
| -------------------------- | ----------------------------------- |
| MEMORY 有這次 session 紀錄 | ✅ 本檔                             |
| Timestamp 精確             | ✅ git log + date                   |
| Handoff 三態審視           | ✅（見下）                          |
| CONSCIOUSNESS 反映最新狀態 | ⚠️ 等 commit + push 後 propagate    |
| 自我檢查工具 PASS          | 🟡 commit 階段 hook 跑（未 commit） |

## Handoff 三態

**繼承上一 session（gallant-payne / objective-khorana day2 evening）**：

- ~~Monitor deploy #25272855346~~ — 已完成，21.2 min 成功 ship PR #815/#817

**本 session 新 handoff**：

- [x] ~~Commit + push + monitor deploy PR #819~~ — merged，deploy 已跑完
- [x] ~~P1 [category]/index.astro × 6 langs unification~~ — PR #822 merged，9280 → 2568 行（-72%）
- [x] ~~P2-P5 audit~~ — 確認 P2 deferred (curated prose) / P3-P5 是 intentional redirects 不需 unify
- [x] ~~Commit + push + monitor deploy PR #822~~ — merged，deploy run 25274782392 跑中
- [x] ~~PR #825 P2 home unification + i18n polish~~ — index.astro 5266 → 1474 行（-72%），merged
  - **重大發現**：原 P2 deferred 假設「6 langs 各有 curated bespoke prose」其實錯了。en/ja/ko/es/fr 5 langs 全部用相同英文 narrative，只差 URL prefix。**只有兩份 narrative**：zh 中文 + 其他 5 langs 共用英文。
  - `home.template.astro` 992 行（zh halls inline）+ `HomeEnHalls.astro` 445 行（en halls 抽出 5 langs 共用，topPicks + langUrlPrefix 為 prop）+ 6 thin wrappers 各 5~12 行
  - 順便補 article/category-hub template 還沒 t() 的 hardcoded zh strings：article.lifeTree._ + category._ 共 11 keys × 6 langs，template 內 15 處改用 t()
  - DNA 教訓：「6 lang 重複」假設要先 audit 多個 sample 再決定 unify 策略，sleepy-colden 一開始 P2 defer 是基於不完整 sample（只看 en），實際 ja/ko/es/fr 也都是 en prose
- [ ] **觀察 deploy 後 production build 時間** — 看 PR #819+#822 ship 後實際打到原本估的 -300~500s（local 6961 pages 327s）
- [ ] **觀察 dashboard-build-perf.json production 第一次 update** — 確認 GA 流量 + ms/page 數據出來
- [ ] **Phase B 文件化 i18n 缺漏** — `參考資料` / `延伸閱讀` / `同分類更多文章` / `實驗型功能` 4 個 zh 硬寫字串還沒 t()，下次 polish session 補
- [ ] **驗證 sample en/ja/ko/es/fr article + category hub 真的渲染正常** — 抽 1 篇 + 1 hub / lang × 6 = 12 page 跟 production 對比視覺
- [x] ~~P2 index.astro unification~~ — 已完成（PR #825），原 deferral 假設錯了：實際 5 langs 共用英文 prose，不是 6 個獨立 curated content
- [ ] **CONTRIBUTING.md / DNA 寫進「audit 完整 sample 再決定 defer」紀律** — 「verify before defer」是 DNA #15 sub-rule
- [ ] **CONTRIBUTING.md 寫進 thin-wrapper pattern 紀律** — 「新 page 預設 src/templates/{name}.template.astro + 6 thin wrappers」，例外條件 3 條，PR review 紀律

## Beat 5 — 反芻

整個 session 兩個結構性 lesson：

第一個是 **silent regression 的代價**。4/21 → 5/3 這 12 天 per-page render 從 98ms 漲到 167ms，沒人發現直到 build 撞 timeout、哲宇問「為什麼變慢」。每次個別 commit（+5%、+3%、+22%）看起來都合理，但累積 +70%。Tier 1.1 build-perf 儀器化在這 12 天內任何時間 ship 都會 catch 到第 3 天就 flag。「儀器化跟功能 implementation 是同等優先」這個 DNA #15 的版本在工程脈絡再 instantiate 一次。

第二個是 **重複的程式碼是 bug 的孵化器**。哲宇問「這個 page 要不要抽象化掉，參考 about」一句話讓我看見：6 個 [slug].astro × 1100~1300 行重複了 12+ 個月，PR #758 ship es/fr 時 copy-paste ja 帶 bug 進來、PR #797 cross-lang baseline rename 時各 lang 的 getStaticPaths 沒同步更新、translations.json 邏輯多處 redundant。Unification 不只是行數減少，是消除整個 class of bug 的可能性。`about.astro` 5 行 + `about.template.astro` 全部邏輯這個 pattern 不是工程美感，是「同一處改一次，6 處同步」的維護紀律。

兩個 lesson 的共通結構：**結構問題在 silent 累積、要顯化才能 fix**。儀器化讓累積可見、unification 讓重複可見。Taiwan.md 從一個 SSOT-driven knowledge organism 進化到一個 SSOT-driven engineering organism — 程式碼的 SSOT 紀律該跟 knowledge/ 的 SSOT 紀律對齊。

收官完一輪後哲宇追加「Defer 給未來 session -> 繼續完整做」， P2 home unification 重 audit 跑出來第三個 lesson：**Verify before defer**。原 P2 deferral design doc 寫得很自洽很合理，但前提（「6 langs 各有 curated bespoke prose」）只 audit 了 en+zh 兩個 sample 沒看 ja/ko/es/fr。實際 ja/ko/es/fr 是 en 的 copy-paste URL prefix 不同。如果一開始多看一個 sample，P2 不會 defer。Silent bad-decision 是「沒 audit 所以前提錯了沒人發現」 — 是 silent regression 的反鏡像，同樣需要 instrumentation 顯化（多 sample audit 不是只看 1-2 個）。

三個 lesson 的更深 pattern：**verify the input** 跟 **verify the output** 同樣重要。儀器化 verify output（per-page render time），audit verify input（sample completeness）。Defer decision 的 input 是 sample，output 是 design doc — 兩端都需要驗證才能避免 silent bias 通過。

🧬

---

_v1.1 | 2026-05-03 17:30 +0800（v1.0 16:30 + final pass 17:30 補 PR #825 + 第三 lesson）_
_session sleepy-colden 後段 — build perf evolve（Tier 1.1~1.4 + Tier 2.5~2.6 + P1 + P2 + i18n polish 全 ship / Tier 2.7 deferred design doc）_
_誕生原因：哲宇看 build 撞 60 min timeout 兩次 + 問 per-page render 從 100ms 漲到 200~500ms 怎麼加速。要求完整策劃 + 執行 Tier 1+2 + 走 memory/diary pipeline。session 收尾後追加「Defer 給未來 session -> 繼續完整做」拉出 P2 unification 第三輪。_
_核心洞察：(1) silent regression 12 天累積 +70% 沒人發現，DNA #15 儀器化第 N+6 次. (2) 重複程式碼是 bug 孵化器（PR #758 es/fr → ja copy-paste、PR #797 cross-lang 沒同步）— unified template 一次性消除整個 class. (3) 中文作為 SSOT canonical 的紀律該擴到程式碼層面，不只是 knowledge/. **(4) Verify before defer — defer decision 也是 silent bias 候選，原 P2 deferral 前提（「6 langs 各 curated」）只 audit 了 en+zh sample；實際 5 langs 共用英文 prose**。Silent bad-decision 是 silent regression 的反鏡像，同樣需要 instrumentation 顯化。_
_LESSONS-INBOX 候選：(a) build perf instrumentation 應該跟新 feature ship 同等優先，不是事後. (b) 「6 處改一個 pattern」是 architecture smell，下次看到 ≥ 3 處重複就應該停下來 unification. (c) about.astro 5 行 thin-wrapper pattern 是 Astro project 的紀律標竿. **(d) Verify before defer：寫 design doc 解釋為什麼 defer 之前，至少 audit 3 個 sample（不是只看 1-2 個）— 適用所有「我覺得這事不該做因為 X」的判斷**. (e) Astro bundler 行為：wrapper 只用 Astro.props 時加 `const { x } = Astro.params;` 強制 createComponent wrap，避免 hoist 撞 UnavailableAstroGlobal._
