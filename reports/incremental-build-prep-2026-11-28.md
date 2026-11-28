# 只重建受影響的頁：準備階段（頁面輸入帳）

> 2026-11-28 夜間～11-29 凌晨，worktree 分支 `worktree-agent-a6383fa66b0ac66e9`。
> 範圍只到「準備」：做出記帳機制、驗證它準不準。沒有做跳過建置，沒有碰 `.github/workflows/`、`deploy.yml`，沒有推到 main。
> 每個數字都標「實測」或「估計」。實測＝這次在本機真的建出來、比出來的；估計＝我推算的。

## 一句話結論

- **記帳機制做出來了，而且在兩組真實內容改動上漏報都是 0**（實測）。「漏報」＝實際變了、帳卻沒預測到的頁，這是危險的那種。
- 但「預測受影響的頁」現在偏多：改一篇中文文章加一篇譯文，實際只變 4 頁，帳預測 142 頁。多出來的 123 頁幾乎全部來自**同一個原因：prebuild 產生的 25 支 JSON，同一份原始碼連跑兩次內容也不同**（時間戳、相對時間）。假設這 25 支是決定性的，預測會降到 18 頁（實測，見 §四）。
- 所以離「可以真的拿來跳過建置」還差幾件事，最大的一件不是記帳，是 prebuild 的產物要先變穩定（§七）。

## 一、盤點：頁面在建置時從哪些地方讀資料

分類說明：

- **單檔**：渲染時讀一個明確的檔。
- **整個目錄**：看目錄清單或掃一整批檔（新增、刪除一個檔會影響很多頁）。
- **模組層**：模組載入或第一次呼叫時讀一次、之後所有頁共用。讀取發生時沒有「目前是哪一頁」，是最容易記錯帳的一類。
- **靜態 import**：`import x from '*.json'`、`import.meta.glob`。打包時就進了程式，渲染時沒有任何 fs 呼叫。
- **getStaticPaths**：在算「有哪些頁」時讀、把內容用 props 傳給頁面，渲染時不再讀。

「記帳方式」欄：**明確**＝程式裡呼叫了記帳函式；**fs**＝靠 fs 攔截自動記在目前那一頁；**閉包**＝靠打包時的靜態 import 閉包（路由層級）；**群組**＝模組層快取，建立那段記到具名群組、各頁查表時記群組或逐筆；**未**＝沒處理（§五）。

| 讀取點（檔案:行號）                                                                                                                                                                                                                                                | 讀什麼                                                                                                    | 類別                                    | 記帳方式                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/pages/[category]/[slug].astro:79-84`，`ja/ ru/ pt/ ar/ hi/ de/ ko/ id/ fr/ es/ vi/ en/` 各一份同名檔（第 58-64 行）                                                                                                                                           | `knowledge/**` 每一篇 .md（正文、frontmatter），塞進 props                                                | getStaticPaths                          | 明確：`article.template.astro` 渲染時 `recordDep(自己的 .md)`                                        |
| `src/pages/[category]/[slug].astro:134`                                                                                                                                                                                                                            | `config/article-aliases.json`（別名登記）                                                                 | getStaticPaths                          | 明確：別名頁記 `config/article-aliases.json#[自己那一筆]` 加目標文章檔                               |
| `src/utils/rawArticle.ts:51,76`，`src/pages/*/raw/[category]/[slug].md.ts`                                                                                                                                                                                         | 每篇 .md 原文（`/raw/` 純文字端點，約 4,771 個）                                                          | getStaticPaths ＋渲染時單檔             | fs（端點在 middleware 之內執行，渲染時 `readFile` 被攔到）                                           |
| `src/utils/articles-index.ts:125-132`                                                                                                                                                                                                                              | 每語言所有 .md 的 frontmatter＋腳註數，建成索引                                                           | 模組層、整個目錄                        | 群組 `articles-index:<語言>`（記 `檔#summary`＋目錄清單）；查表時逐筆記                              |
| `src/utils/articles-index.ts:215`                                                                                                                                                                                                                                  | `src/data/related/<語言>.json`（語意鄰居）                                                                | 模組層                                  | 明確：`recordJsonKey(…, "<分類>/<slug>")`，只記這頁自己那一筆                                        |
| `src/utils/articles-index.ts:316`                                                                                                                                                                                                                                  | `src/data/content-dates.json`                                                                             | 模組層                                  | 明確：逐筆（`dates` 下該網址）；`getLatestArticles` 記整檔                                           |
| `src/templates/article.template.astro:46`                                                                                                                                                                                                                          | `src/data/content-dates.json`（`import … from`）                                                          | 靜態 import                             | 明確：逐筆 `#["dates","<網址>"]`，驗證時排除該檔的整檔閉包記號                                       |
| `src/templates/article.template.astro`（約 150-170 行）                                                                                                                                                                                                            | `src/data/git-info.json`（貢獻者、最後修改，prebuild 由 git log 算）                                      | 模組層（`contributors.ts:60` 載入時讀） | 明確：逐筆 `#["files","knowledge/…md"]`                                                              |
| `src/utils/liveStats.ts:22`                                                                                                                                                                                                                                        | `public/api/dashboard-vitals.json` 的 `totalArticles`（每頁的 SEO.astro 都用）                            | 模組層                                  | 明確：逐筆 `#["totalArticles"]`＋群組                                                                |
| `src/utils/getLangSwitchPath.ts:31-48,100,149`                                                                                                                                                                                                                     | 語言切換表 `public/api/lang-switch-map.json`；退路是 `knowledge/_translations.json` 與整個 knowledge 目錄 | 模組層、整個目錄                        | 明確：查表那一刻記 `#["registry",<語言>,"toZh"/"fromZh",<網址>]`；建表那段進群組                     |
| `src/utils/dataConfig.ts:108`                                                                                                                                                                                                                                      | 同上 `lang-switch-map.json`（公司頁文章連結）                                                             | 模組層                                  | 明確：逐筆；建表那段進群組                                                                           |
| `src/utils/staticRoutes.ts:43,66`                                                                                                                                                                                                                                  | `knowledge/` 第一層目錄清單（分類清單）                                                                   | 模組層、整個目錄                        | 明確：`@dir:knowledge`                                                                               |
| `src/utils/staticRoutes.ts:92`                                                                                                                                                                                                                                     | 每語言×分類的 `_<分類> Hub.md` 有沒有                                                                     | 模組層（約 180 個 stat）                | 群組 `hub-presence`                                                                                  |
| `src/utils/staticRoutes.ts:125`                                                                                                                                                                                                                                    | **整個 `src/pages` 目錄樹**（今晚吃虧的那個）                                                             | 模組層、整個目錄                        | 群組 `static-routes`（每頁查表時記）                                                                 |
| `src/lib/newsroom-lookup.ts:16`                                                                                                                                                                                                                                    | `public/api/dashboard-newsroom.json`（編輯台足跡）                                                        | 模組層                                  | 明確：逐筆，記「ship 產物＝這篇」與「slug＝這篇」兩組元素                                            |
| `src/components/SporeFootprint.astro:12`                                                                                                                                                                                                                           | `src/data/spores.json`（孢子成效）                                                                        | 靜態 import                             | 明確：逐筆，記 id 或 url 對得上的那幾筆                                                              |
| `src/pages/semiont/diary/[slug].astro`（418 頁）                                                                                                                                                                                                                   | 自己那篇日記、前後兩篇（導覽）、目錄清單                                                                  | getStaticPaths                          | 明確：props 帶 `__deps`                                                                              |
| `src/components/RelatedDiaries.astro:19`、`src/lib/semiont-diary.ts:284,296`                                                                                                                                                                                       | `docs/semiont/diary/*.md` 全部日記                                                                        | 模組層、整個目錄                        | 明確：找到→記那一篇日記檔；找不到→記目錄清單；建立那段進群組                                         |
| `src/components/SEO.astro:164`、`semiont-diary-entry.template.astro:29`、`semiont-weekly-entry.template.astro:30`                                                                                                                                                  | `public/og-images/…jpg` 有沒有                                                                            | 單檔（existsSync）                      | fs                                                                                                   |
| `src/utils/{names,health,income,housing,industry}/related.ts`                                                                                                                                                                                                      | 對應 `knowledge/<分類>/<slug>.md` 有沒有（existsSync）                                                    | 單檔                                    | fs（housing、industry 有 Map 快取，見 §五）                                                          |
| `src/utils/category-static-paths.ts:98,323,330,369,375`，`[category]/index.astro`（13 語各一）                                                                                                                                                                     | 分類總覽頁：資料夾清單、每篇 .md（整份）、Hub 檔、`content-dates.json`                                    | getStaticPaths                          | 明確：props 帶 `__deps`（群組 `category-hub:<語言>:<分類>`），`category-hub.template.astro` 渲染時記 |
| `src/utils/data-charts.ts:149,157`                                                                                                                                                                                                                                 | 每語言每篇 .md 裡的量化圖表區塊                                                                           | 模組層、整個目錄                        | 群組 `corpus-charts:<語言>`（粗）                                                                    |
| `src/utils/names/page.ts:95`                                                                                                                                                                                                                                       | `public/data/names/readings.json`（字音表）                                                               | 模組層                                  | 明確：整檔（粗）；建表那段進群組                                                                     |
| `src/pages/graph.astro:63-99,243-246`、`en/graph.astro`                                                                                                                                                                                                            | 全部文章與 Hub 的內文（知識圖譜）                                                                         | 整個目錄                                | fs（每個 .md 都記在 graph 頁）                                                                       |
| `src/pages/feed.xml.ts:31-39`、`rss.xml.ts:21-34`                                                                                                                                                                                                                  | 全部文章 frontmatter                                                                                      | 整個目錄                                | fs（帳裡 feed 頁有約 2,400 筆）                                                                      |
| `src/pages/lifetree/index.astro:66,71`                                                                                                                                                                                                                             | 全部人生樹文章                                                                                            | 整個目錄                                | fs                                                                                                   |
| `src/pages/lifetree/[slug].astro:94,99`                                                                                                                                                                                                                            | 該人物的來源 .md                                                                                          | getStaticPaths                          | 明確：props 帶 `__deps`                                                                              |
| `src/pages/terminology/index.astro:44,49`、`converter.astro:100,107`                                                                                                                                                                                               | `data/terminology/*.yaml` 全部                                                                            | 整個目錄                                | fs                                                                                                   |
| `src/pages/terminology/[id].astro:160,191`                                                                                                                                                                                                                         | 自己的 yaml、同分類全部詞條、詞條清單                                                                     | getStaticPaths                          | 明確：props 帶 `__deps`（自己的檔＋群組 `terminology-category:<分類>`＋`@dir:data/terminology`）     |
| `src/pages/semiont/newsroom.astro:18`、`newsroom/[slug].astro:21`、`src/lib/semiont-newsroom.ts:300-481`                                                                                                                                                           | `public/api/dashboard-newsroom.json`、`reports/editorial-room/*`、`reports/article-projection/*`          | 整個目錄＋單檔                          | fs（整份 JSON，粗；`@dir:reports/editorial-room`）                                                   |
| `src/lib/semiont-weekly.ts:230,242`、`src/pages/semiont/weekly/[slug].astro`                                                                                                                                                                                       | `reports/weekly/*.md`                                                                                     | getStaticPaths                          | 明確：props 帶 `__deps`（自己、前後兩份、目錄清單）                                                  |
| `src/lib/semiont-page.ts:110`                                                                                                                                                                                                                                      | `docs/semiont/**` 單檔                                                                                    | 單檔                                    | fs                                                                                                   |
| `src/templates/explore.template.astro:62,85,132,137,227,253`                                                                                                                                                                                                       | `dashboard-vitals.json`、全部文章 frontmatter、analytics JSON                                             | 整個目錄＋單檔                          | fs                                                                                                   |
| `src/components/home/home-data.ts:18,117,480,501`、`hall-data.ts:73,77`                                                                                                                                                                                            | 首頁與展廳用的各 JSON、`data/terminology`、文章 frontmatter                                               | 單檔＋整個目錄                          | fs                                                                                                   |
| `src/components/{TopicsMasonry,CategoryGrid}.astro:38/45`                                                                                                                                                                                                          | `knowledge/<語言>/<分類>` 目錄清單                                                                        | 整個目錄                                | fs（`@dir:`）                                                                                        |
| `src/components/{SupporterGrid,SupporterTimeline,OrganismPreview}.astro`、`dashboard/SectionOpsStatus.astro:53`                                                                                                                                                    | `public/api/*supporters*.json`、`dashboard-organism.json`、ops-status                                     | 單檔                                    | fs                                                                                                   |
| `src/templates/{bench,contribute,budget}.template.astro`                                                                                                                                                                                                           | `bench.json`、`contribute` 資料、`knowledge/…md` 有沒有                                                   | 單檔                                    | fs                                                                                                   |
| `src/pages/404.astro:26-27`                                                                                                                                                                                                                                        | 文章索引 JSON                                                                                             | 單檔                                    | fs                                                                                                   |
| `src/lib/commits.ts:59,150`                                                                                                                                                                                                                                        | `knowledge/…md` 有沒有、commits 快取檔                                                                    | 模組層快取                              | **未**（§五）                                                                                        |
| 約 70 支元件／工具頁（估計）：`src/components/{income,housing,health,industry,brand}/**`、`utils/data-hub.ts:13-25`、`utils/topics/registry.ts:21`、`utils/names/model.ts:7-9`、`utils/mapConfig.ts:3-4`、`i18n/industry/index.ts:21,32`、`data/halls/index.ts:18` | `src/data/**/*.json`（含 `import.meta.glob`）                                                             | 靜態 import                             | 閉包（路由層級，見 §二）                                                                             |
| `astro.config.mjs` 開頭                                                                                                                                                                                                                                            | 掃 `src/content/` 蓋 sitemap 的語言對照、`content-dates.json`、轉址表                                     | 設定層一次讀完                          | **未**（影響 sitemap 與轉址頁，不是個別頁）                                                          |

## 二、機制怎麼運作

**開關**：環境變數 `TWMD_DEPS_OUT`（輸出檔路徑）。沒設時：`src/utils/build-deps.ts` 頂層只做一次 `process.env` 判斷，所有匯出函式第一行就返回；`astro.config.mjs` 不加入記帳整合與 Vite 外掛；`src/middleware.ts` 直接走原本的 `handle()`。

**怎麼知道現在在渲染哪一頁**：`src/middleware.ts` 進入每個請求時用 `AsyncLocalStorage.run({page}, …)` 把**整段**（含後面讀 body 的那一步，因為 Astro 是讀 body 時才真正渲染）包起來，原本的圖示處理一行沒動。每一頁進來就先登記（就算一筆都沒記到），所以帳的頁面清單可以跟 dist 對帳。

**四種記帳來源**：

1. **明確記帳**：`recordDep(檔)`、`recordJsonKey(檔, 鍵…)`（只記 JSON 裡某一筆）、`recordDirDep(目錄)`（記成 `@dir:<目錄>`＝目錄清單）、`recordGroup(名)`。
2. **fs 攔截**：開關打開時才把 `readFile`、`readFileSync`、`existsSync`、`stat`、`readdir` 包一層，自動記在「目前那一頁」。這是兜底：沒人記得的讀取點不會變成靜默漏報。
3. **模組層快取的處理**：快取的建立那一段用 `untracked(群組名, …)` 包起來，裡面讀到的檔記到**群組**而不是第一個觸發的頁；各頁查表那一刻才記「用了哪一筆」（逐筆）或「用了這個群組」（粗）。帳輸出時 `@group:<名>` 會展開成檔案清單。
4. **靜態 import**：`astro.config.mjs` 的 Vite 外掛在打包結束時，對每個路由檔算它靜態 import 到的資料檔（非程式碼、非樣式），存成群組 `@group:static:<路由樣式>`；middleware 用 `context.routePattern` 記下頁面屬於哪個路由。這是**路由層級**的粗粒度：同一個路由的所有頁共用一份清單。已經逐筆記帳的檔（帳裡有 `檔#鍵`）會在驗證時從整檔閉包排除，不然 `content-dates.json` 一變全站文章頁都會被判受影響。

**動態路由補洞**：`[slug]`、`[id]`、`[category]` 這類路由的來源檔是 `getStaticPaths` 讀的，渲染時不再讀，fs 攔截看不到。文章頁在渲染時自己記來源檔；其他路由（日記、週報、人生樹、詞條、分類總覽）用 `depsProp(...)`：getStaticPaths 回傳的 props 多帶一個 `__deps` 欄位，頁面 frontmatter 呼叫 `recordPropDeps(Astro.props)`。沒設 `TWMD_DEPS_OUT` 時 `depsProp()` 回傳 `{}`，props 與原本完全相同。這一段是我用「帳裡每個動態路由的頁，有沒有自己那個來源檔的記號」檢查才發現缺的（第一輪日記、詞條、週報、人生樹、分類總覽頁都沒有，是潛在漏報；兩組驗證的改動沒碰到它們，所以測不出來）。補完後再查：每個路由都有。

**輸出**：每份分片在 `astro:build:done` 寫自己的 `<TWMD_DEPS_OUT>.shard<N>`，`scripts/core/build-sharded.mjs` 在併回 dist 之後合成一份 `TWMD_DEPS_OUT`（頁面路徑各份不重疊，重複就報錯；群組取聯集）。格式是 `{"<頁面路徑>": ["<輸入>", …], "@group:<名>": ["<檔>", …], "@init": {…}}`。`@init` 是「不屬於任何頁、也不在群組裡」的讀取（getStaticPaths 等）的次數，診斷用。

**輸入記號的語法**（驗證工具認得的）：

| 記號                   | 意思                                                                        | 什麼時候算「變了」               |
| ---------------------- | --------------------------------------------------------------------------- | -------------------------------- |
| `knowledge/…md`        | 整個檔                                                                      | 內容雜湊不同                     |
| `檔.json#["a","b"]`    | JSON 裡某一筆；路徑元素可為 `{p,v}`＝陣列裡 `p` 欄位等於 `v` 的元素         | 該筆的值不同                     |
| `檔.md#summary`        | 這篇文章的「卡片欄位」（標題、描述、圖、閱讀時間、標籤、腳註數、curation…） | 欄位指紋不同；只改正文不算       |
| `@dir:<目錄>`          | 目錄清單（直接子項）                                                        | 清單不同（新增／刪除／改名）     |
| `@nonempty-md:<目錄>`  | 這個目錄有沒有至少一篇可用的 .md                                            | 有／無翻轉                       |
| `@group:<名>`          | 群組展開的所有項                                                            | 任一項變了                       |
| `@group:static:<路由>` | 路由靜態 import 的資料檔                                                    | 任一個（未被逐筆記帳取代的）變了 |

「卡片欄位指紋」是 `src/utils/article-summary-core.mjs`，**索引建立（`articles-index.ts`）與驗證工具用同一份程式**，不是各寫一份。

**改了哪些檔**：

| 檔                                                                                                                                                                                                                      | 改什麼                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/utils/build-deps.ts`（新）                                                                                                                                                                                         | 記帳模組本體                                                                                                    |
| `src/utils/article-summary-core.mjs`（新）                                                                                                                                                                              | 卡片欄位的唯一定義；`articles-index.ts` 的建索引改用它（輸出不變，見 §六）                                      |
| `scripts/tools/verify-build-deps.mjs`（新）                                                                                                                                                                             | 驗證工具（快照輸入、雜湊輸出、比對）                                                                            |
| `src/middleware.ts`                                                                                                                                                                                                     | 進頁時包 `AsyncLocalStorage`；原行為保留                                                                        |
| `astro.config.mjs`                                                                                                                                                                                                      | `twmd-deps-ledger` 整合（寫帳）與 `twmd-deps-static-imports` Vite 外掛；兩者都只在 `TWMD_DEPS_OUT` 有設時才加入 |
| `scripts/core/build-sharded.mjs`                                                                                                                                                                                        | 併各份的帳                                                                                                      |
| `src/utils/articles-index.ts`                                                                                                                                                                                           | 建索引改群組＋`#summary`；新增 `getArticleSummary`、`hasArticlesOutside`（只回布林的呼叫端不再要整份索引）      |
| `src/templates/article.template.astro`                                                                                                                                                                                  | 記自己的 .md、`git-info.json` 與 `content-dates.json` 逐筆；兩處「拿整份索引」改成精準查詢（結果相同）          |
| `src/pages/[category]/[slug].astro`                                                                                                                                                                                     | 別名頁記帳                                                                                                      |
| `src/utils/{staticRoutes,liveStats,getLangSwitchPath,dataConfig,data-charts,category-static-paths}.ts`、`src/utils/names/page.ts`、`src/lib/newsroom-lookup.ts`、`src/components/{SporeFootprint,RelatedDiaries}.astro` | 模組層快取包 `untracked`、查表時記帳                                                                            |

**取捨**：

- 沒有照原提案「全部靠手動呼叫 `recordDep`」，而是 fs 攔截打底、明確記帳補精度。理由：fs 攔截不依賴人記得，缺點是粒度粗（記整檔）；明確記帳才能做到「只記 JSON 的某一筆」「只記文章的卡片欄位」。
- getStaticPaths 傳 props 的做法（在 props 上掛來源檔）**沒採用**：Astro 可能複製 props，會悄悄丟掉。改成文章頁在渲染時自己記來源檔，並用「15,497 個 og 圖記帳都屬於自己的 slug」檢查頁面隔離（實測，0 個錯位）。
- 靜態 import 不逐檔改，而是用 Vite 外掛算路由層級的閉包。粗，但不會漏。

## 三、怎麼驗證

工具：`scripts/tools/verify-build-deps.mjs`。流程（每個狀態都一樣）：換 `knowledge/` → `prebuild` → 拍「輸入快照」（整個 repo 約 47,000 個檔的雜湊、所有小於 40MB 的 JSON 副本、文章卡片指紋）→ 帶 `TWMD_DEPS_OUT` 分片建置 → 把 dist 每個檔的雜湊寫成清單（HTML 內 `/_astro/*.css` 檔名先正規化）。

- **實際變了的頁**＝A、B 兩份 dist 內容不同的檔，扣掉**雜訊基準**（狀態 B 連建兩次、**兩次之間都重跑 prebuild**，兩次內容不同的檔）。
- **預測的頁**＝帳裡輸入記號跟「A、B 之間有變的輸入」有交集的頁。「有變的輸入」是比對兩個狀態 prebuild 之後的實際檔案，不是 `git diff`。
- 比對時順手處理三件事：頁面路徑對檔案要不分大小寫（macOS 上 `/economy/pinkoi/` 別名頁與 `/economy/Pinkoi/` 真文章會寫進同一個資料夾，CI 的 Linux 不會撞）；`/404/` 對 `404.html`；房屋工具（`src/utils/housing/uid.ts`）的 `hst-xx7` 流水號正規化（見 §八）。

## 四、結果（全部實測）

### 第一組：`c1fea9526b` → `a6c1c088e0`（57 篇譯文）

| 項目                                     | 數字                                          |
| ---------------------------------------- | --------------------------------------------- |
| A、B 之間有差異的輸入檔                  | 153 個                                        |
| 每次 prebuild 都會變的輸入檔（B1 vs B2） | 27 個                                         |
| 雜訊基準（B1 vs B2 輸出不同的檔）        | 215 個（頁面 197）                            |
| **實際變了**                             | **312 頁**＋11 個非頁面檔（`api/` 下的 JSON） |
| **預測**                                 | **808 頁**（扣掉雜訊頁後 758）                |
| **漏報**                                 | **0**                                         |
| **多報**                                 | **446**（只是浪費，不危險）                   |

其他算法（同一組）：用 A 的帳預測 → 808／0／446，跟 B 的帳一樣（兩份帳只有 14 頁的記號清單不同，都是工業頁的語言切換筆數）。只用逐筆記號、略過所有 `@group`、`@dir` → 預測 598、**漏報 33**、多報 292（證明粗粒度記號是必要的，不是多餘的）。假設 27 個每次 prebuild 都會變的輸入檔不算變動 → 預測 702、漏報 0、多報 360（這組改動本身就動了 57 篇譯文的卡片欄位，所以降幅不大）。

### 第二組：`60780f8804` → `c0bd2a3557`（一篇中文文章＋一篇譯文，只改正文）

| 項目                         | 數字                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| A、B 之間有差異的輸入檔      | 33 個                                                                                            |
| 每次 prebuild 都會變的輸入檔 | 25 個                                                                                            |
| 雜訊基準                     | 161 個（頁面 145）                                                                               |
| **實際變了**                 | **4 頁**＋3 個非頁面檔（`api/dashboard-articles.json`、`api/dashboard-census.json`、`llms.txt`） |
| **預測**                     | **142 頁**（扣掉雜訊頁後 127）                                                                   |
| **漏報**                     | **0**                                                                                            |
| **多報**                     | **123**                                                                                          |

其他算法（同一組）：用 A 的帳 → 142／0／123（一樣）。略過 `@group`、`@dir` → 136／0／117。**假設那 25 個每次 prebuild 都會變的輸入檔不算變動 → 預測 18 頁（扣雜訊頁後 17）、漏報 0、多報 13。**

### 這組的多報從哪來（帶進來最多多報頁的記號）

| 記號                                                                                       | 多報頁數   | 是什麼                                                                        |
| ------------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------------------------- |
| `public/api/dashboard-newsroom.json`（整檔）                                               | 45         | `/semiont/newsroom/<slug>/` 每頁讀整份                                        |
| `src/data/content-dates.json`（整檔）                                                      | 39         | `/explore/`、`/latest/` 等「最新」類頁                                        |
| `public/api/dashboard-vitals.json`（整檔）                                                 | 17         | `/`、`/explore/` 等                                                           |
| `public/api/about-supporters.json`、`dashboard-supporters.json`、`dashboard-organism.json` | 13、13、13 | `/about/`、`/contribute/`、`/`（13 語各一）                                   |
| `knowledge/History/清治時期.md`、`en/…qing-dynasty-rule.md`（整檔）                        | 6、3       | `/data/`、`/explore/` 等直接讀整份 .md 的頁（記整檔，沒辦法只記 frontmatter） |
| 其他                                                                                       | ≤ 4        |                                                                               |

這些記號除了最後兩列，**全都是每次 prebuild 都會變的輸入**。

### 迭代過程（為了誠實：第一版不是這樣）

- 只做 fs 攔截＋文章檔記帳時，第一組漏報 23：`/map/`、`/data/` 這類讀靜態 import 的 JSON 的頁，加上 `hst-qe7`／`hst-qe8` 流水號的假差異。補上「靜態 import 閉包」後漏報 0。
- 第二組第一版（檔案層級記帳）預測 627 頁、實際 4 頁。原因：別篇文章的卡片、相關推薦引用了這篇的檔，而這次只改了正文。引進「卡片欄位指紋」（`#summary`）後降到 140。

### 沒設 `TWMD_DEPS_OUT` 時建置行為沒變（實測）

在最終程式碼上，同一個內容狀態（狀態 B）：建兩次「不設環境變數」的分片建置（N5、N6），再建一次「設 `TWMD_DEPS_OUT`」（N7），比較三份 dist（27,121 個檔）：N5 與 N6 差 135 個檔（＝雜訊基準），N7 與 N5 差 135 個檔，**差異全部落在雜訊基準裡，基準之外 0 個，沒有只存在一邊的檔**。也順帶證明 `articles-index.ts` 改用 `cardFields` 後輸出沒變。
`npm run check:types`：0 errors（實測）。帳模式比沒帳慢約 8%（建置 38.9 秒對 35.0～35.8 秒，估計，機器上有別的工作）。

**沒做**：沒有跑單程序 `astro build`（非分片）的完整建置；middleware 的改動兩種模式共用，我推定行為相同，但沒有實測。

## 五、還沒記到帳的讀取點

1. **模組層快取沒包 `untracked`（讀取會被記到第一個觸發它的頁，其他頁沒有）**：`src/lib/commits.ts`（`existsCache`:53、`feedCache`:208、快取檔:150）、`src/utils/industry/related.ts`（`_exists`、`_cards`:27-28）、`src/utils/housing/related.ts`（`idxCache`:21）、`src/components/home/home-data.ts` 與 `hall-data.ts`（沒有逐一確認有沒有跨頁快取）、`src/lib/semiont-{weekly,newsroom,page}.ts`（同上，沒逐一確認）。**這些是真正的洞**：兩組驗證沒碰到它們，不代表安全。
2. **只靠 fs 攔截、記整檔的粗讀取**：explore、graph、feed／rss、halls、首頁、semiont 各頁。精度不夠（見 §六），但不漏。
3. **設定層的讀取**（`astro.config.mjs` 開頭掃 `src/content/`、`content-dates.json`、轉址表）：影響 sitemap 與 454 個轉址頁，不是個別頁，現在不在帳裡。
4. **靜態 import 只到「路由層級」**：同一個路由的所有頁共用一份，不知道是哪一頁真的用到哪一筆。對工具頁（每路由每語言一頁）夠用，對文章頁靠逐筆記帳補。
5. **「頁面存在與否」**：帳只記存在的頁。新增或刪除文章會改變頁面集合，現在靠 `@dir:` 記號間接反映，沒有「這次多了／少了哪些頁」的輸出。
6. **非頁面輸出**：sitemap（全站）、`404.html`、轉址頁、`public/` 的複製、`api/*.json`（prebuild 產物）不在帳裡。

## 六、粗粒度輸入清單，以及它們讓多報增加多少

下表是帳裡出現的粗粒度記號，與第二組實測的影響。「多報貢獻」＝因該記號而被多預測的頁數，實測；「頁數」＝帳裡有這個記號的頁（實測）。

| 粗粒度記號                                                                                                                                               | 帳裡頁數                                                                 | 它代表什麼                                                                         | 第二組多報貢獻                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| `@group:static:<路由>`                                                                                                                                   | 25,327（每頁）                                                           | 路由靜態 import 的資料檔（共 952 個路由群組）                                      | 約 6 頁（`/about/`、`/semiont/`，各語言版） |
| `@group:articles-index:<語言>`                                                                                                                           | 439 頁（`/budget/`、`/explore/`、`/data/`、`/halls/`、`/elections/` 等） | 該語言所有文章的卡片欄位與目錄清單。**任何文章的卡片欄位變動，這些頁都被判受影響** | 0（第二組只改正文）；第一組是 24 頁／語言   |
| `@group:static-routes`                                                                                                                                   | 17,950                                                                   | 整個 `src/pages` 目錄樹（今晚吃虧的那個）                                          | 0（目錄樹不因內容變）                       |
| `@group:hub-presence`                                                                                                                                    | 19,143                                                                   | 各語言×分類 Hub 檔有沒有                                                           | 0                                           |
| `@dir:knowledge`                                                                                                                                         | 19,144                                                                   | `knowledge/` 第一層（分類清單）                                                    | 0                                           |
| `@dir:reports/editorial-room`、`@dir:docs/semiont/diary`                                                                                                 | 45、29                                                                   | 編輯室、日記資料夾清單                                                             | 0                                           |
| `@group:corpus-charts:<語言>`                                                                                                                            | 少數頁                                                                   | 該語言所有含量化圖表的文章                                                         | 0                                           |
| `@nonempty-md:<目錄>`                                                                                                                                    | 約 201,000 筆（每個文章頁約 10 筆）                                      | 「該分類有沒有至少一篇」布林                                                       | 0（只在有／無翻轉時變）                     |
| 整檔 JSON：`dashboard-newsroom.json`、`content-dates.json`、`dashboard-vitals.json`、`*supporters*.json`、`dashboard-organism.json`、`contributors.json` | 見 §四表                                                                 | 頁面讀的是其中一部分，但記成整檔                                                   | 約 120（這是第二組多報的主體）              |

另外一個副作用：帳檔本身 **約 86MB**（25,325 個頁面、每頁平均十幾筆記號，其中約 20 萬筆是 `@nonempty-md`）。只在分析時用，沒進正式部署；之後可把 `@nonempty-md` 改成每語言一筆。

## 七、離「可以真的拿來跳過建置」還差幾件事

1. **prebuild 產物先變穩定（最大的一件）。** 同一份原始碼連跑兩次 prebuild，有 25～27 支 JSON 內容不同（儀表板、`content-dates.json`、`git-info.json`、`lang-switch-map.json`、`latest.json`…，多半是時間戳）。只要頁面讀到其中一支，整頁每次都會被判受影響。第二組的實測：這 25 支不算變動，預測從 140 降到 16。做法有兩條：讓這些產物決定性（沒有內容變動就位元組相同），或讓頁面只依賴逐筆的、穩定的欄位。
2. **把整檔記號改成逐筆。** 優先序：`dashboard-newsroom.json`（semiont 新聞台頁，45 頁）、`content-dates.json`（「最新」類頁）、`dashboard-vitals.json`、`*supporters*.json`、`dashboard-organism.json`、`contributors.json`、`/explore/` 與 `/halls/` 直接讀整份 .md 的地方（改成 `#summary`）。
3. **補 §五 第 1 點的模組層快取。** 沒補之前，這些頁在對應輸入變動時可能漏報。
4. **程式碼本身的版本。** 帳只記「資料輸入」。`src/**` 的程式碼、樣式、`astro.config.mjs`、`package.json`／依賴版本任何一個變了，必須整站重建。需要一個「程式碼指紋」當前提。
5. **頁面集合的變化。** 新增、刪除、改名文章要輸出「新增哪些頁、移除哪些頁」，並讓舊的產物被清掉；現在只是間接反映在 `@dir:`。
6. **非頁面輸出的處理規則。** sitemap、轉址頁、`404.html`、`api/*.json`、`public/` 複製、`feed.xml`：它們依賴全站，需要各自的「一定重建」或「獨立依賴」規則。
7. **同一份輸入也會不同的頁。** 兩次同源建置有 135～215 個檔不同（隨機 id、相對時間、feed、房屋工具的流水號）。跳過建置後，這些頁在「有重建」與「沒重建」兩種情況下內容不同；要決定可接受，或先把它們決定性化。房屋工具的流水號（`nextUid`，程序內計數器）還有一個副作用：只重建部分頁時，計數會不同於全量建置。
8. **在 Linux CI 重做一次驗證。** 這次在 macOS 跑，別名頁與真文章在不分大小寫的檔案系統上互蓋（7 頁）。
9. **更多種改動的驗證。** 這次只驗了「改譯文（含 frontmatter）」與「改一篇中文＋一篇譯文的正文」。沒驗：新增文章、刪除文章、改檔名、改 frontmatter 的 `image`／`tags`、改 `public/` 或 `src/data/` 的資料檔、改 `git-info.json` 的來源（HEAD 在整個實驗裡沒動，所以 git 算出來的最後修改日、貢獻者沒有變過；帳有逐筆記，但沒有被實測過）。
10. **跳過建置前的保險。** 建議先做一個「影子模式」：照帳算出要重建的頁，但仍然全量建置，比對「沒被選中的頁」有沒有任何一頁內容變了。連續跑幾週、漏報恆為 0，再開始真的跳。

## 八、過程中發現、值得記下來的事

- **`staticRoutes.ts` 的洞現在有帳了**：帳裡 17,950 頁有 `@group:static-routes`，展開是整棵 `src/pages` 目錄樹。今晚那種「沒人記得某處看整個目錄」的事，現在建完就能查：`@init` 與各頁的 `@dir:` 記號會列出來。
- **`src/utils/housing/uid.ts` 的 `nextUid`** 是程序內計數器，同一個內容換個渲染順序，`hst-qe7` 變 `hst-qe8`。這類「跨頁耦合」是增量建置的天敵；`/ar/housing/qingan/` 等 4 頁第一輪被誤判成漏報就是這個。
- **兩個狀態是用 `git checkout <rev> -- knowledge/` 換的**，會留下只存在於另一個 rev 的檔（例如 `knowledge/People/唐新民.md`）。每次換狀態要對照 `git diff --name-status` 清掉。`prebuild` 結束後還要用 `git checkout -- <產生檔>` 還原，已還原。
- **ALS 隔離實測**：16,688 個文章頁、15,497 個 og 圖記帳，沒有一個記到別頁的 slug；沒有任何一個文章頁缺少自己那個 .md 的記號。
- **帳的頁面數 25,325 對 Astro 回報的 20,552 頁**：差額是 4,771 個 `/raw/*.md` 端點（Astro 的頁數不計端點）加 feed／rss。帳裡每個頁面都對得上 dist 的檔（0 個對不上）；dist 有約 454 個 html／md／xml 檔帳裡沒有（絕大多數是轉址頁）（轉址頁不經過 middleware，只依賴設定檔）。

## 九、測量上要注意的事（誠實揭露）

- **帳的兩層來源**：§四 的數字用的是最終程式碼的帳（LA2、LB2、LP2、LQ2），這四份帳是在各自內容狀態下做 `sync.sh`（把 `knowledge/` 同步到 `src/content/`）後直接建置，**沒有再跑完整 prebuild**。輸出與輸入快照則來自各狀態完整 prebuild 之後的建置。帳只決定「頁面讀了哪些輸入」，結構不隨 prebuild 產物內容改變，但這不是嚴格同一批 prebuild 產物。
- **早期帳的狀態不乾淨**：某一輪 B 的帳在換狀態時多帶了一個只存在於別的 commit 的檔（`knowledge/People/唐新民.md`），我發現後移除並重新同步；最終採用的帳都是檢查過頁數（20,552／20,553）與 dist 對得上之後才用的。第二組的 Q1 輸出曾與下一輪 prebuild 重疊執行，已丟棄重做，採用的是乾淨的 Q1 與 Q2。
- **驗證工具的一個假設（`fineGlobal`）**：驗證時，只要帳裡有任何一頁對某個檔有逐筆記號（`檔#鍵`），就把這個檔從**所有**路由的靜態 import 閉包拿掉。這只在「每個靜態 import 該檔的元件都有逐筆記帳」時成立。我查了：`content-dates.json` 只有 `article.template.astro` 靜態 import（有記）、`spores.json` 只有 `SporeFootprint.astro` 靜態 import（有記）；其他逐筆記帳的檔（`git-info.json`、`lang-switch-map.json`、`dashboard-vitals.json`、`dashboard-newsroom.json`、`related/*.json`）都是 fs 讀取，不在靜態閉包裡。以後有新的靜態 import 同一支檔，這個假設會讓漏報悄悄出現，要同步檢查。
- **只用 B 的帳預測有一個盲點**：A→B 若有文章的分類或 id 改變，舊分類／舊成員只存在於 A 的帳。實務上要用「A 的帳與 B 的帳的聯集」預測；這次兩份帳差異很小（pair 1 只有 14 頁記號不同），沒測出差異。
- **多報上限是暫時的**：§四 的「假設 25 個輸入檔不算變動」只用來看精準度上限，不能拿來當預測；它們也可能真的有內容變動。
- **動態路由的新記號沒有被兩組改動實測過**：日記、週報、詞條、人生樹、分類總覽頁的來源檔記號只做了結構檢查（每頁有自己的來源檔），沒有一組「改了那些檔」的驗證。
