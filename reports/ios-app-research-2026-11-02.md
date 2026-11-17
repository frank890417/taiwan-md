# Taiwan.md iOS App 深度研究報告

> 2026-11-02｜Taiwan.md（iOS 研究子 session）｜範圍：只研究。沒有寫 App 程式碼、沒有改 `knowledge/`、沒有 commit、沒有對外發言。
>
> 量測時間：線上端點 curl 在 2026-11-02 16:08–16:09（CST）；GA4 唯讀查詢在 16:11–16:20（CST）；本機 `public/api/*` 以 2026-11-02 08:35 產生的版本為準；本機 `dist/` 是 2026-09-05 的舊建置，只拿來估量級。
>
> 外部事實都附出處網址。「推論」「未證實」是照字面意思：官方文件沒寫，或我沒有親手驗。

---

## 一、結論

1. 做得成，資料底子也夠：13 語、約 15,000 篇全文都在 repo，網站每天成功部署好幾次。缺的只有一支給 App 用的全文內容包。
2. 內容包建議由建站流程另外產出：每個語言一個 SQLite 檔，裝中繼資料、用網站同一支 `article-render.ts` 渲染好的 HTML、預先切詞的全文索引。中文 xz 壓縮後約 7 MB（估算）。
3. 內容包放 GitHub Releases，不放 Pages。Pages 的部署包今天是 1.88 GB，已經超過 GitHub 寫的 1 GB 上限。
4. 文章本文用 WKWebView 顯示本機 HTML（Wikipedia iOS 也這樣做），其他介面全部用原生 SwiftUI。這也是避開 4.2「網頁包殼」退件的主要論據。
5. 真正的讀者比 GA 總數小很多。28 天 16.8 萬活躍使用者裡，新加坡加中國約 11.6 萬是停留 2–7 秒、Windows 桌機、直接造訪的自動流量。台灣讀者有 37.6% 用 iPhone／iPad，是台灣最大的單一平台。
6. App 的角色是留住會回來的人：台灣讀者 82.6% 從搜尋進來，回訪只有 12.2%。另一個角色是把台灣第一人稱的知識離線存在使用者手機上，網路被過濾也還讀得到。
7. 審查風險依序是：4.2 最低功能（靠原生功能與離線化解）、年齡分級怎麼答（預期 13+）、沒有隱私權政策頁（`taiwan.md/privacy/` 目前 404，送審必備）。
8. 中國大陸 storefront 建議首發就排除。沒有 ICP 備案本來就上不了架，而且有 TaiwanPlus 等台灣主題 App 被下架的先例。港澳先保留，持續觀察。
9. 上架工具鏈大致現成。muse-pocket 的 `tools/testflight.sh` 今天 16:04 已經用 App Store Connect API 金鑰從這台 MacBook Pro 直接上傳成功，Air 的 Transporter 退成備援。
10. MVP 預估 4–5 週可送審（估算）：13 語離線閱讀、離線全文搜尋、收藏與閱讀進度、時間軸、Universal Links、「今日一篇」Widget。

---

## 二、資料出口盤點

### 2.1 線上端點實測

量測指令（2026-11-02 16:08:53 CST）：

```bash
for p in api/articles.json api/article-index.json api/latest.json ... raw/history/二二八事件.md .well-known/apple-app-site-association; do
  curl -s -o /dev/null -w "%{http_code} size=%{size_download} type=%{content_type}\n" --compressed "https://taiwan.md/$p"
done
curl -sI https://taiwan.md/api/article-index.json
```

`size_download` 是壓縮後實際傳輸的位元組；「原始」是本機 `public/api/` 的檔案大小。

| 出口                                      | 狀態                                        | 傳輸                               | 原始                | 內容                                                                                                                   | 全文           | App 怎麼用                                                                          |
| ----------------------------------------- | ------------------------------------------- | ---------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------- |
| `/api/articles.json`                      | 200                                         | 4.50 MB（br）                      | 14.05 MB            | 15,016 筆（12 語各 1,155 筆，加中文），欄位 title／description／category／tags／url／readingTime／featured／date／path | 無             | 全站目錄。譯文的 `category` 欄填的是語言代碼，另有 8 筆標題壞掉（附錄 A）           |
| `/api/article-index.json`                 | 200                                         | 73 KB                              | 244 KB              | 以 `category/slug` 為鍵：zhTitle／enTitle／category／langs                                                             | 無             | 跨語對照                                                                            |
| `/api/lang-switch-map.json`               | 200                                         | 921 KB                             | 3.89 MB             | 12 語的路徑對照                                                                                                        | 無             | 切換語言時找到同一篇                                                                |
| `/api/latest.json`                        | 200                                         | 123 KB                             | 357 KB              | 每語最新 30 篇：title／desc／category／href／date／readingTime／image；`_generated` 2026-11-01T22:07Z                  | 無             | 首頁「最新」、Widget                                                                |
| `/api/random-index-{lang}.json`           | 200                                         | 14 KB（zh）                        | 62 KB（zh）         | 隨機推薦池                                                                                                             | 無             | 「隨機一篇」                                                                        |
| `/api/search-minisearch-{lang}.json`      | 200                                         | 812 KB（zh）／607 KB（en）         | 2.54 MB（zh）       | MiniSearch v2 序列化，線上 1,155 篇；只索引標題、描述、標籤的 bigram                                                   | **無**         | 不建議直接用：是 JS 函式庫的格式，也沒有全文                                        |
| `/api/stats.json`                         | 200                                         | 641 B                              | 3.2 KB              | 總數統計                                                                                                               | –              | 「關於」頁                                                                          |
| `/api/dashboard-*.json`                   | 200                                         | analytics 11.5 KB；articles 374 KB | –                   | 儀表板資料                                                                                                             | –              | App 不需要                                                                          |
| `/raw/{category}/{slug}.md`               | zh、en 200；ar **404**                      | 10.8 KB（〈二二八事件〉）          | –                   | `text/markdown`，帶 4 行出處標頭                                                                                       | 有（markdown） | 只有 zh-TW／en／ja／ko 四語有 raw 路由（`src/pages/{en,ja,ko}/raw`），其他 9 語沒有 |
| `/llms.txt`                               | 200                                         | 6.3 KB                             | –                   | 給 AI 的說明與統計                                                                                                     | –              | 不用。`/llms-full.txt` 是 404                                                       |
| `/rss.xml`、`/feed.xml`                   | 200                                         | 15 KB／14 KB                       | –                   | 最新文章                                                                                                               | 摘要           | 可當更新偵測的備援                                                                  |
| `/api/rag/*`、`/api/related/*`            | **404**                                     | –                                  | 本機 6.2 MB／7.7 MB | 沒進 git、沒部署                                                                                                       | –              | 要做「相關文章」得先正式部署 related                                                |
| `/.well-known/apple-app-site-association` | **404**                                     | –                                  | –                   | 還沒有                                                                                                                 | –              | Universal Links 需要（見 §6.7）                                                     |
| `https://mcp.taiwan.md`（`workers/mcp`）  | 200（tools/list 1.6 KB）                    | –                                  | –                   | 6 支唯讀工具：search／read／rag／cite／organs／stats                                                                   | read 有        | 給 AI agent 用。App 不必走 JSON-RPC                                                 |
| npm `taiwanmd`（`cli/`）                  | npm 上是 0.8.0（2026-07-26），repo 是 0.8.1 | –                                  | –                   | 用 git sparse clone 把 `knowledge/` 抓到 `~/.taiwanmd`                                                                 | 有             | 證明「整包下載、本機查詢」這條路在 CLI 已經跑通                                     |

**沒有公開成 API、但 App 用得到的建站資料**（`src/data/`）：

| 檔案                                                                                                                                              | 大小                    | 內容                                                                                                                   | App 用途                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `map-markers.json`                                                                                                                                | 1.70 MB                 | 2,097 個點：title／lat／lng／category／region／link／lang／desc／city。語言分布不均：zh-TW 1,185、ja 795、ko 83、en 34 | 地圖。要輸出成 API，並用跨語對照補其他語言 |
| `timeline-eras.json`                                                                                                                              | 85 KB                   | 8 個時代、40 個事件，6 語內嵌（zh-TW／en／ja／ko／es／fr），事件連到文章。**事件只有年份，沒有月日**                   | 時間軸頁可以直接用                         |
| `content-dates.json`                                                                                                                              | 2.14 MB                 | 12,213 條路徑的建立與更新時間                                                                                          | 判斷內容包裡哪些篇變了                     |
| `elections-2026*.json`、`ly-budget.json`、`taiex-yearly.json`、`taiwan-cpi.json`、`taiwan-housing.json`、`taiwan-salary.json`、`counties-22.json` | `src/data` 全部約 16 MB | 選舉、預算、資料台灣                                                                                                   | v2 的原生資料頁。MVP 先用 Safari 開網頁    |

**主機與快取**（`curl -sI`，16:09）：

- 前面是 Cloudflare（`server: cloudflare`），後面是 GitHub Pages（`x-github-request-id`，Fastly varnish）。
- `cache-control: max-age=600`。JSON 的 `cf-cache-status: DYNAMIC`，代表 Cloudflare 沒有快取 JSON，請求會直達 GitHub Pages。
- 有 `access-control-allow-origin: *`，也有 `ETag` 和 `Last-Modified`（今天是 06:48 GMT），App 可以發條件式請求（`If-None-Match`），沒變就只回 304。

**更新頻率**：`deploy.yml` 只在 push 到 main 時觸發。`gh run list --workflow deploy.yml --limit 40` 顯示 2026-10-31 到 11-02 共 40 次執行（成功 15、取消 19、失敗 6），所以每天會成功部署好幾次。

**Pages 容量**：`gh api .../actions/runs/41401133223/artifacts` 顯示今天 06:37 那次部署的 `github-pages` artifact 是 **1,877,053,748 bytes（1.88 GB）**。GitHub 的限制寫的是「Published GitHub Pages sites may be no larger than 1 GB」，另有每月 100 GB 的軟性頻寬上限（https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits ）。Cloudflare 7 天流量是 147 GB（`dashboard-analytics.json` 的 `cloudflare7d.summary.bytes`，含機器人）。結論：App 的內容包不要再疊到 Pages 上。

### 2.2 `knowledge/` 的體積（本機實測）

| 語言                               | 檔數        | markdown 原始大小                    |
| ---------------------------------- | ----------- | ------------------------------------ |
| zh-TW（SSOT）                      | 1,172       | 22.9 MB                              |
| en／ja／ko／es／fr／de／vi／id／pt | 1,157–1,168 | 29.1–36.6 MB                         |
| ru／ar                             | 1,156       | 48.0／40.7 MB                        |
| hi                                 | 1,168       | 63.0 MB（天城文 UTF-8 每字 3 bytes） |
| 合計                               | 15,141      | 457.8 MB                             |

壓縮試算：中文 markdown 打成 tar 後 27.3 MB，gzip -9 是 9.9 MB，xz -9 是 6.6 MB。

文章用到的 markdown 功能（1,169 篇中文）：腳註 1,018 篇、策展人筆記 306 篇、表格 299 篇、圖片 387 篇、YouTube iframe 97 篇（共 199 個）、`tw-*` 視覺模組（tw-timeline 103、tw-stat 78、tw-versus 60、tw-figure 48、tw-bars 44 等）。`tw-*` 模組由 `src/utils/article-render.ts`（1,894 行）在建站時轉成純 HTML，再由 `src/styles/article-modules.css` 上樣式，深色模式靠 `data-theme='dark'`。**模組本身不需要前端 JS**，這點對 App 很重要。

### 2.3 判斷：App 要離線讀全文，資料從哪來

| 方案                                 | 做法                                                                                                                 | 好處                                             | 代價                                                                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------------- |
| A. 直接抓 markdown                   | 從 `/raw/` 或 GitHub 一篇篇抓，在 App 裡渲染                                                                         | 端點已存在                                       | 只有 4 語有 raw；`tw-*` 十幾種模組要在 Swift 重寫；1,155 篇要發 1,155 個請求 |
| B. App 內打包 JS 渲染器              | 把 unified／remark／rehype 加 `article-render.ts` 用 esbuild 打包進 App，在 WKWebView 裡把 markdown 轉成 HTML        | 包最小（中文約 6.6 MB xz）；渲染與網站同一份程式 | 要維持一條 Node 到瀏覽器的打包線，渲染器裡用到 Node API 的部分要拆           |
| **C. 建站時另產 App 內容包（建議）** | 新增 `scripts/core/build-app-pack.mjs`，每語輸出一個 SQLite：中繼資料、渲染好的 `<article>` HTML、預先切詞的全文索引 | 渲染零誤差；App 端最單純；搜尋索引下載即可用     | 每次建置多一步；包比 markdown 大                                             |

方案 C 的體積估算（本機 9/5 舊 `dist/` 抽出 `<article>` 內文）：

| 語言  | 篇數（舊建置） | HTML 原始 | gzip    | xz         |
| ----- | -------------- | --------- | ------- | ---------- |
| zh-TW | 1,115          | 55.7 MB   | 14.8 MB | **6.9 MB** |
| en    | 889            | 44.9 MB   | 11.6 MB | 5.7 MB     |
| hi    | 672            | 48.2 MB   | 9.5 MB  | 3.9 MB     |

舊建置的譯文篇數偏少，這張表只用來看量級。Apple 的 Compression framework 支援 LZMA，App 端可以直接解。

內容包的建議格式：

- **SQLite 單檔**，裡面三張表：
  - `articles`：id、lang、path、zhKey（跨語共用鍵）、title、description、category、subcategory、tags、date、lastVerified、readingTime、image、imageCredit、imageLicense、contentHash。
  - `bodies`：articleId、html（網站同一條 remark／rehype 加 `article-render.ts` 的輸出）。
  - `fts`：FTS5 虛擬表，欄位是標題、描述、標籤、全文純文字。中日韓文字在建包時就切成 bigram（網站的 MiniSearch 也是 bigram），用最基本的 `unicode61` tokenizer 存。這樣不依賴 iOS 內建 SQLite 有沒有 trigram tokenizer（版本差異要實機驗，見 https://www.nutrient.io/blog/leveraging-sqlite-full-text-search-on-ios/ ）。
- **一支小指標檔放在 Pages**：`/api/app/v1/index.json`（幾 KB），列出每語內容包的網址、sha256、位元組數、篇數、產生時間、最低 App 版本。
- **內容包本體放 GitHub Releases**：每個檔案上限 2 GiB，官方寫「There is no limit on the total size of a release, nor bandwidth usage」（https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases ）。另一個選項是 Cloudflare R2（流量不收費），但要多管一個帳號資源。
- **更新**：MVP 整包替換（版本變了才下載，預設只在 Wi-Fi）。v1.2 再做差異包，用 `contentHash` 只抓變動的篇。
- **圖片**：站內圖 950 張共 184 MB，另有 383 個 `upload.wikimedia.org` 與 91 個 `commons.wikimedia.org` 外連。MVP 不打包圖片，看過的圖用 `URLCache` 快取。v1.2 再出「含圖包」，學 Kiwix 的 nopic／maxi 分法。
- **YouTube**：離線時顯示佔位卡，加「在 YouTube 開啟」。
- **CSS 與小段 JS 放在 App 本體**，內容包只放 HTML 與文字資料。這樣 2.5.2「不得下載會改變功能的程式碼」的說法最乾淨。

---

## 三、讀者

資料來源：`public/api/dashboard-analytics.json`（只讀）。這個 JSON 沒有裝置欄位，所以裝置、作業系統、國家另外用 `scripts/tools/lib/sense_client.ga_run` 對 GA4 做唯讀查詢（腳本放在 session 暫存區，沒有進 repo）。

### 3.1 總量（GA4，2026-10-05 → 11-02，28 天）

- 活躍使用者 167,935、新使用者 163,657、瀏覽 195,157、平均互動 133.3 秒、跳出率 69.8%。
- 注意：JSON 最上層的 `totals`（84,386 人）、`topPages`、`countries`（只有幾百到兩千次請求）是舊欄位，數字跟 `ga` 區塊對不起來，要讀 `ga.*`。

依語言（`ga.byLang`，瀏覽數）：zh-TW 49,571、en 4,405、ja 2,408、id 602、ar 498、vi 370、ko 210、fr 109、es 62；**pt、hi、ru、de 都是 0**。四個語言完全是 0 不太合理，比較像追蹤缺口（附錄 A）。

### 3.2 先扣掉自動流量

| 國家                     | 活躍使用者      | 裝置               | 每人互動 | 直接造訪 | 新使用者 |
| ------------------------ | --------------- | ------------------ | -------- | -------- | -------- |
| 新加坡                   | 88,525（52.7%） | 94.8% Windows 桌機 | 2 秒     | 98.8%    | 99.8%    |
| 中國                     | 27,424（16.3%） | 95.4% Windows 桌機 | 7 秒     | 87.8%    | 99.0%    |
| 美國（Linux 桌機那一格） | 1,226           | Linux              | 6 秒     | –        | –        |

這三組加起來約 11.7 萬人，幾乎可以確定是爬蟲或自動化瀏覽。扣掉之後，真人讀者大約是：台灣 27,782、日本 5,956、美國約 4,000、其他約 5,000，合計 4–4.5 萬人／28 天（推論）。

Cloudflare 7 天：1,393 萬次請求、25 萬個 unique，其中台灣 1,257 萬次請求（90%）。請求數被非人流量灌大，評估讀者時以 GA 的人數為準。AI 爬蟲 7 天 197,037 次（Bytespider 79,897 最多）。

### 3.3 台灣讀者用什麼看

| 平台                 | 使用者 | 比例  | 每人互動 | 每人頁數 |
| -------------------- | ------ | ----- | -------- | -------- |
| iPhone（iOS mobile） | 9,965  | 35.9% | 71 秒    | 1.33     |
| Windows 桌機         | 8,862  | 31.9% | 139 秒   | 1.82     |
| Android 手機         | 5,980  | 21.5% | 108 秒   | 1.47     |
| Mac                  | 2,373  | 8.5%  | 137 秒   | 2.12     |
| iPad                 | 467    | 1.7%  | 100 秒   | 1.37     |

- 台灣讀者 **iOS 合計 37.6%**，是最大的單一平台。
- 但 iPhone 讀者每人只停 71 秒，是各平台最短。長文在 iPhone Safari 上讀得最淺，App 若把閱讀體驗做好，這裡有空間（推論，App 上線後要驗）。
- 來源：自然搜尋 82.6%、直接造訪 12.0%、推薦連結 4.5%。
- 回訪使用者 3,751 人（12.2%）。
- 日本讀者：iPhone 33.8%、Windows 34.8%；自然搜尋 89.1%；回訪 11.2%。

### 3.4 iOS 讀者的樣貌（28 天，全部國家）

- iOS 活躍使用者 16,767 人。國家：台灣 68.1%、日本 13.6%、美國 6.7%、新加坡 2.1%、越南 2.0%、中國 1.9%、香港 1.9%。
- 裝置語言：中文 61.8%、英文 18.1%、日文 12.3%、越南文 2.4%、德文 1.5%、韓文 1.3%、法文 1.1%、西文 0.8%、阿拉伯文 0.3%。
- iOS 主版本：26 佔 61.5%、27 佔 20.1%、18 佔 14.8%、17 佔 1.7%、16 以下 1.4%。**最低支援 iOS 18 可涵蓋 96.4%**；iOS 17 是 98.1%；iOS 26 只有 81.6%。

### 3.5 熱門內容

- 7 天熱門文章以人物為主：〈許美華〉263 次、〈鐵牛杰哥〉83、〈蕭上農〉81、〈陳樹菊〉81、〈張懸與安溥〉80、〈沈伯洋〉75（英文版另有 54）。英文〈Common Taiwanese Names〉106、〈Night Market Culture〉53；韓文〈밤문화와 KTV 문화〉51。
- 28 天熱門頁面裡工具頁很強：首頁 6,248、`/terminology/converter/` 3,172、`/companies/` 1,813、`/elections/2026/` 1,002（加上時程頁 657、候選人頁 642）、`/taiwan-shape/` 785、`/map/` 513。
- Search Console 7 天（10-25 → 10-31）：點擊 10,781、曝光 110.8 萬、CTR 0.97%。熱門查詢有「data taiwan」184 次點擊、「許美華」84、「蕭上農」57、「大陸用語轉換器」47；越南文「tưởng giới thạch」曝光 3,703。

### 3.6 誰會裝這個 App

| 讀者                                       | 估計比重   | 要什麼                       | App 怎麼回應                                                                 |
| ------------------------------------------ | ---------- | ---------------------------- | ---------------------------------------------------------------------------- |
| 台灣的常客（那 12% 回訪的人，多用 iPhone） | 最大宗     | 有新文章知道、讀得舒服、收藏 | 最新、Widget、收藏與進度、字級與深色模式                                     |
| 日本讀者與海外台灣人                       | 第二       | 母語內容、通勤或飛機上離線讀 | 日文內容包內建、離線                                                         |
| 外國英語讀者                               | 第三       | 入門、旅行前讀               | 英文內容包內建、分類瀏覽、時間軸                                             |
| 老師、研究者、記者                         | 少但價值高 | 查證、引用                   | 腳註預覽、一鍵複製引用（CC BY-SA 格式）                                      |
| AI agent 使用者                            | 很少裝 App | 程式化存取                   | 已有 MCP 與 CLI；App 用 App Intents 開放「搜尋 Taiwan.md」給捷徑與 Siri 就夠 |

量級（推論）：82.6% 的人是搜尋進來讀一篇就走，App 不會是拉新管道。第一年的安裝數合理預期是幾百到幾千。App 的價值在留住常客，以及讓 Taiwan.md 的 13 語知識有一份裝在使用者手機裡、不受網路過濾影響的副本，這和 MANIFESTO 的主權保存視角一致。網站與 GitHub 仍是正本，App 是投影。

---

## 四、同類 App

完整查證在子 agent 回報裡，這裡只留重點。App Store 數字是 2026-11-02 從 `apps.apple.com` 或 iTunes Lookup API 讀到的。

| App                                                                                               | 值得借鏡                                                                                                                                                                                                                                                                      | 該避開                                                                                                                                               | 出處                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Wikipedia iOS**（MIT、iOS 17.6+、9+ 分級）                                                      | 文章本文用 `WKWebView` 加本機 CSS／JS，原生只做外殼，主題與字級用 JS 訊息控制；文章字級與介面的 Dynamic Type 分開管，主題做到 Black；Places 地圖不給定位也能用；Widget 只做「每日一則」型（Picture of the day、On this day、Top read、Random）；Year in Review 完全在裝置端算 | 帳號同步是事故高發區（2026-07 有使用者 1,000 多筆收藏消失，T431140）；導覽架構反覆改版，小團隊負擔不起                                               | https://github.com/wikimedia/wikipedia-ios/blob/main/docs/web_dev.md 、 https://www.mediawiki.org/wiki/Wikimedia_Apps/iOS_FAQ 、 https://phabricator.wikimedia.org/T431140 、 https://apps.apple.com/us/app/wikipedia/id324715238 |
| **Kiwix**（GPLv3、離線百科）                                                                      | 內容分「mini／nopic／maxi」三種，一眼看懂體積；下載前算剩餘空間、可以等 Wi-Fi；全文索引跟內容一起打包                                                                                                                                                                         | 「檔案庫、目錄、下載管理器」的心智模型對一般讀者太技術，有人找不到怎麼刪檔；有使用者回報更新後中文搜尋失靈，**中文與阿拉伯文搜尋一定要有自動化測試** | https://github.com/kiwix/kiwix-apple/blob/main/CHANGELOG.md 、 https://apps.apple.com/us/app/kiwix/id997079563 、 https://download.kiwix.org/zim/wikipedia/                                                                       |
| **Readwise Reader**                                                                               | 長文模式只留進度與外觀設定；字級 14–80px、預設行距 1.4、提供 Atkinson Hyperlegible；阿拉伯文、希伯來文可逐篇切 RTL；朗讀時自動捲動、手動捲動就暫停                                                                                                                            | 朗讀只能連線用；功能膨脹；訂閱制加雲端 AI 的成本結構不適合公益內容                                                                                   | https://docs.readwise.io/reader/docs/faqs/appearance 、 https://docs.readwise.io/reader/docs/faqs/text-to-speech                                                                                                                  |
| **Artifact**（2024-01 宣布關閉）                                                                  | 作者頁讓寫的人被看見；收攤前第一步是先砍掉社交功能                                                                                                                                                                                                                            | 用大眾市場的規模假設配置成本；漂向社群化。創辦人說市場「isn't big enough」                                                                           | https://www.engadget.com/instagrams-founders-are-shutting-down-artifact-their-year-old-news-app-233431390.html 、 https://techcrunch.com/2024/04/02/yahoo-acquiring-instagram-co-founders-ai-powered-news-artifact/               |
| **Apple News**                                                                                    | Widget 只做兩種、點了就進文章；離線下載有條件（Wi-Fi、充電中、省空間選項）                                                                                                                                                                                                    | 離線做成付費功能；而且**台灣不在 Apple News 供應名單**，不能當發行管道                                                                               | https://support.apple.com/guide/iphone/use-news-widgets-iph1e466ebee/ios 、 https://www.apple.com/ios/feature-availability/                                                                                                       |
| **博物館與導覽**（Rijksmuseum、Bloomberg Connects、VoiceMap、Google Arts & Culture）              | 實體編號對應數位內容；讓使用者自己把作品串成路線；離線地圖加離線音檔一起下載；誠實標示 AI 生成內容                                                                                                                                                                            | 背景 GPS 觸發播放很耗電；故宮導覽 App 評論多是「導覽號碼找不到」、閃退（3.8 分，21 則）                                                              | https://apps.apple.com/us/app/rijksmuseum/id621307961 、 https://apps.apple.com/us/app/voicemap-audio-tours-guides/id852027939 、 https://apps.apple.com/tw/app/id1623770384                                                      |
| **報導者**                                                                                        | 官方 FAQ 說人力有限，所以選 Web App、不做原生 App。資源不夠時這是真實可行的備案                                                                                                                                                                                               | –                                                                                                                                                    | https://www.twreporter.org/a/about-us-questions                                                                                                                                                                                   |
| **《海上的島》**（獨立開發者 Wei-lun Su，Education 類，4.9 分，iOS 18.6+，31 MB，只有繁中與英文） | 最接近我們的形態：8 個時代的時間軸、事件地圖、每日一篇、內建朗讀、書籤與搜尋                                                                                                                                                                                                  | 最低 iOS 18.6 會排掉一部分舊裝置                                                                                                                     | https://apps.apple.com/tw/app/id6762364458                                                                                                                                                                                        |
| **《老派散策》**                                                                                  | 資料放遠端，不更新 App 也能長出新點位；用 iCloud 取代自建帳號                                                                                                                                                                                                                 | 描述寫「地點資訊只留在裝置上」，隱私標籤卻列了追蹤與廣告識別碼。標籤與說法不一致最傷信任                                                             | https://apps.apple.com/tw/app/id6801842686                                                                                                                                                                                        |

《海上的島》是最直接的參照。我們跟它的差別在：13 語、1,150 篇長文、每篇有腳註與出處、內容 CC BY-SA、程式 MIT 開源。

**跨案例教訓（給小型策展知識 App）**：

1. 文章用 WKWebView 加本機 CSS 渲染，原生只做外殼，順便解決中日韓與阿拉伯文排版。
2. 離線是基本承諾，搜尋索引要跟內容一起離線，並且一定要測繁中與阿拉伯文。
3. 不要自建帳號與同步後端，收藏用本機，之後要同步就用 iCloud。
4. 閱讀舒適度就是核心產品：字級、行距、主題、長文模式。
5. 地圖要讓使用者選擇給不給定位，也要能濾成「只看我收藏的」。
6. 用小團隊的成本結構來設計。社交功能、留言、推播後端都先不做。
7. 發行地區的風險要先決策，而且內容要能脫離 App 存活。我們的網站與 GitHub 就是這份保險。
8. 用低成本的「每日一則」把人帶回來：Widget、今日一篇、歷史上的今天。

---

## 五、原生體驗清單（價值 × 成本）

成本：S ≤ 2 人日、M 3–7 人日、L > 7 人日（估算，以一個熟 SwiftUI 的開發者計）。

| 功能                                 | 價值                 | 成本 | 版本       | 說明                                                                                                                                                |
| ------------------------------------ | -------------------- | ---- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 離線閱讀與內容包下載管理             | 高                   | M    | MVP        | 內建 zh-TW、en、ja 三個種子包（合計估 20 MB），其他 10 語按需下載；下載前檢查空間；預設只在 Wi-Fi 更新；設定頁顯示每語大小與一鍵刪除                |
| 離線全文搜尋                         | 高                   | M    | MVP        | SQLite FTS5，中日韓 bigram 在建包時切好；阿拉伯文要測去除母音符號；搜尋結果顯示片段                                                                 |
| 文章閱讀器                           | 高                   | M    | MVP        | WKWebView 載入本機 HTML；腳註點了跳出預覽（1,018 篇有腳註）；閱讀進度；目錄跳轉                                                                     |
| 動態字級                             | 高                   | S    | MVP        | 介面跟 Dynamic Type；文章另有字級滑桿，透過 CSS 變數套到 WKWebView                                                                                  |
| 深色模式                             | 高                   | S    | MVP        | 網站 CSS 已有 `data-theme='dark'`，直接切屬性                                                                                                       |
| 收藏與閱讀進度                       | 高                   | S    | MVP        | 本機資料庫；iCloud 同步留到 v1.1                                                                                                                    |
| 多語內容切換（13 語）與阿拉伯文 RTL  | 高                   | M    | MVP        | 文章內切換語言用 `lang-switch-map`；`ar` 文章 `dir="rtl"`。介面文字 MVP 先做 zh-TW、en、ja，其他語言介面先退回英文                                  |
| Universal Links 與深連結             | 高                   | S–M  | MVP        | 要在網站放 AASA（§6.7）；另設 `taiwanmd://` 給 Widget 和截圖自動化用                                                                                |
| 時間軸                               | 中                   | S–M  | MVP        | 直接用 `timeline-eras.json`（8 時代、40 事件、6 語），事件點進文章。這是原生功能的好展示                                                            |
| 「今日一篇」Widget                   | 中                   | S    | MVP        | 從本機內容包挑，不需要網路；App Group 共享資料                                                                                                      |
| 關於與授權頁                         | 高（審查與授權必要） | S    | MVP        | CC BY-SA 4.0、MIT、第三方套件授權、貢獻者連結、隱私說明                                                                                             |
| 分享                                 | 中                   | S    | MVP        | 系統分享表單分享網址；網站已有 OG 圖，連結預覽會帶圖                                                                                                |
| 一鍵複製引用                         | 中                   | S    | MVP        | 依 CC 的 TASL 格式（標題、作者、來源、授權）組字串，研究者用得到                                                                                    |
| VoiceOver                            | 高                   | M    | MVP 驗收項 | `article-render.ts` 已有 aria 標籤；外殼要逐頁測                                                                                                    |
| 地圖（MapKit）                       | 中                   | M    | v1.1       | 2,097 個點，要先輸出成 API 並補足各語言。原生 MapKit 沒有額外費用（Apple DTS 論壇回答，https://developer.apple.com/forums/thread/127493 ）          |
| 歷史上的今天（含 Widget）            | 中高                 | M    | v1.1       | 時間軸沒有月日，要新做資料：中文文章裡有 5,777 處「某年某月某日」，分布在 753 篇，366 天都有，364 天有 3 處以上。需要一次抽取加人工或查核把關的流程 |
| Spotlight 索引                       | 中                   | S    | v1.1       | iOS 18 的 App Intents `IndexedEntity`，至少把收藏與已讀放進 Spotlight                                                                               |
| App Intents／Siri／捷徑              | 低中                 | S–M  | v1.1       | 「在 Taiwan.md 搜尋…」「開今日一篇」                                                                                                                |
| iCloud 同步收藏                      | 中                   | M    | v1.1       | CloudKit 私有資料庫，不經我們的伺服器                                                                                                               |
| 朗讀                                 | 中                   | M    | v1.2       | `AVSpeechSynthesizer`，裝置端、離線可用；zh-TW 與 ar 語音品質要實測                                                                                 |
| 含圖離線包                           | 中                   | M    | v1.2       | 另出含圖版內容包                                                                                                                                    |
| 差異更新                             | 中                   | M    | v1.2       | 以 `contentHash` 只抓變動的篇                                                                                                                       |
| iPad 版面與 Mac（Designed for iPad） | 低中                 | M    | v1.2       | MVP 只做 iPhone                                                                                                                                     |
| 資料台灣、選舉、預算原生頁           | 中                   | L    | v2         | 先用 Safari 開網頁                                                                                                                                  |
| 推播                                 | 低                   | M    | 不做       | 需要 APNs 伺服器端；Widget 和背景更新已經夠用                                                                                                       |
| App 內回饋表單                       | 低                   | M    | 不做       | 會打破「不收集資料」並可能牽動 1.2；改用 mailto 或 GitHub Issues 連結                                                                               |

---

## 六、審查風險與對策

App Store Review Guidelines 最後更新日是 2026-10-16（https://developer.apple.com/app-store/review/guidelines/ ）。以下短引文是 WebFetch 讀到的，送審前請對原頁再看一次。

### 6.1 條款對照

| 條款                                                                                                                  | 風險                                                                                                                                                   | 對策                                                                                                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **4.2 Minimum Functionality**，含 4.2.2（不得主要是「web clippings, content aggregators, or a collection of links」） | **最大**。Apple 的 App Review 頁寫「Websites served in an iOS app … do not make a quality app」（https://developer.apple.com/distribute/app-review/ ） | 絕不在 WKWebView 裡載入 taiwan.md 網站當主介面。WKWebView 只顯示本機內容包的文章 HTML，其他全部原生：離線內容包、離線全文搜尋、時間軸、Widget、收藏與進度、Universal Links。送審備註寫清楚「全部內容離線可用，請開飛航模式測試」 |
| 4.3 Spam                                                                                                              | 低                                                                                                                                                     | 只有一個 bundle ID；不要為每個語言各上一個 App                                                                                                                                                                                   |
| 2.5.2 下載程式碼                                                                                                      | 低                                                                                                                                                     | 內容包只放 HTML 與文字資料，CSS 和互動 JS 打包在 App 本體                                                                                                                                                                        |
| 2.5.19（2026-10 新增，隱藏或未記載的功能）                                                                            | 低                                                                                                                                                     | 送審備註列出所有功能，包含「內容包會從 GitHub Releases 更新」                                                                                                                                                                    |
| 1.1 Objectionable Content，1.1.2（寫實的殺害、傷殘、刑求）                                                            | 中低。條文沒有歷史或紀錄片的例外                                                                                                                       | 228、白色恐怖、戰爭以文字敘述為主；若有寫實屍體或刑求照片，在 App 內預設收合並加內容提示（推論，非官方要求）                                                                                                                     |
| 1.2 User-Generated Content                                                                                            | MVP 不適用                                                                                                                                             | 不做 App 內回饋與留言；回饋用 mailto 或用 Safari 開 GitHub Issues。單向私訊給開發者是否算 UGC，官方沒寫（未證實）                                                                                                                |
| 1.5 Developer Information                                                                                             | 必要                                                                                                                                                   | App 內與商店頁都要有聯絡方式與 Support URL                                                                                                                                                                                       |
| **5.1.1 隱私**                                                                                                        | **必要**。(i)「All apps must include a link to their privacy policy」，App 內也要找得到                                                                | 新增 `taiwan.md/privacy/`（目前 404），同時說明網站（GA4、Cloudflare）與 App（不收集資料）                                                                                                                                       |
| 5.2 Intellectual Property                                                                                             | 中                                                                                                                                                     | 文章圖片多數來自 Wikimedia，授權各異；App 要跟網站一樣顯示 `imageCredit`／`imageLicense`（223 篇有標授權）                                                                                                                       |
| 2.3 Metadata                                                                                                          | 低                                                                                                                                                     | App 名稱 ≤ 30 字；截圖要是真實畫面（2.3.3）；年齡分級要誠實作答（2.3.6）                                                                                                                                                         |
| 5 Legal：遵守上架地的法律                                                                                             | 中國大陸高                                                                                                                                             | 見 §6.4                                                                                                                                                                                                                          |

### 6.2 隱私標籤怎麼填

Apple 的定義：「collect」是把資料送出裝置，而且保留時間超過即時處理請求所需（https://developer.apple.com/app-store/app-privacy-details/ ）。只在裝置上處理的資料不算。伺服器呼叫帶出 IP 但不保留，也不必揭露。Apple 自己收的 crash 與 App Analytics 不用我們揭露。

建議答「**No, we do not collect data from this app**」（App Store Connect 的選項文字，https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy ），前提是同時守住這幾條：

- App 裡不放 GA、Firebase 或任何分析、廣告 SDK。
- 不把 MetricKit 或 crash payload 上傳到自己的伺服器。
- 不做 App 內回饋表單（改用 mailto 或 GitHub 連結）。
- 請求不帶裝置識別碼或自訂 query string。
- 收藏與閱讀紀錄只存在本機或使用者自己的 iCloud。

要確認的一點：GitHub Pages 與 Cloudflare 的存取紀錄是否算「我們或夥伴保留 IP」。我們只看 Cloudflare 的彙總統計，不保留逐筆紀錄，我判斷不構成 collect（推論）。成效改看 App Store Connect 的 App Analytics。

**Privacy Manifest（`PrivacyInfo.xcprivacy`）**：自 2024-05-01 起，用到 required reason API 卻沒寫理由的 App 不會被 App Store Connect 接受（https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api ）。本 App 預計會用到的代碼：

| API            | 代碼   | 用途                          |
| -------------- | ------ | ----------------------------- |
| UserDefaults   | CA92.1 | 只有 App 自己讀寫的設定       |
| UserDefaults   | 1C8F.1 | 與 Widget 透過 App Group 共用 |
| File timestamp | C617.1 | 內容包檔案的時間與大小        |
| Disk space     | E174.1 | 下載內容包前檢查空間          |

### 6.3 年齡分級怎麼答

2025-07-24 起新增 13+、16+、18+（https://developer.apple.com/news/?id=ks775ehf ）。2026-07-09 起問卷多了社群媒體題，新 App 送審必答（https://developer.apple.com/news?id=tlur8uvi ）。

| 題項                                                                                                                 | Infrequent | Frequent | 建議答案                                                |
| -------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | ------------------------------------------------------- |
| Realistic violence                                                                                                   | 13+        | 18+      | Infrequent（228、白色恐怖、戰爭、霧社事件等的文字敘述） |
| Mature or suggestive themes（範例含「war or political strife」「real-world crimes, psychological trauma or abuse」） | 9+         | 16+      | Infrequent                                              |
| Guns or other weapons                                                                                                | 9+         | 13+      | Infrequent                                              |
| Horror／Sexual content／Profanity／Gambling／Medical                                                                 | –          | –        | None（送審前再抽查文章，例如反性侵宣導片相關條目）      |
| Unrestricted Web Access（「navigate to any webpage within the app」）                                                | 16+        | –        | **No**，外部連結一律交給系統 Safari 開，離開 App        |
| UGC／Messaging／Social media                                                                                         | –          | –        | No                                                      |

預期結果是 **13+**。來源：https://developer.apple.com/help/app-store-connect/reference/age-ratings-values-and-definitions 。官方沒有定義 Infrequent 與 Frequent 的門檻。先例是 Wikipedia 9+（Infrequent mature themes 與 weapons），Kiwix 4+。我們有 realistic violence 這一題，所以照實答會是 13+。App Store Connect 填完會即時算出分級，送審前可以比較不同答法的結果。

另外：德州 SB 2420 的年齡驗證自 2026-06-04 起生效，Apple 說開發者「should」接 Declared Age Range API（https://developer.apple.com/news/?id=sg176nne ）。沒帳號、沒付費、沒 UGC 的純閱讀 App 是否有義務，官方沒說（未證實）。

### 6.4 中國大陸與港澳

**事實**：

- Apple 說明 MIIT 要求「some apps」持有 ICP 備案號；沒有備案號的 App 狀態會顯示「ICP Filing Number Missing」，也就是「Your app isn't available in China mainland」（https://developer.apple.com/help/app-store-connect/reference/app-information/ 、 https://developer.apple.com/help/app-store-connect/reference/app-information/app-and-submission-statuses ）。新聞、出版類還要另外的許可。
- 台灣主題 App 有被下架的先例：
  - TaiwanPlus（2022-11）：https://focustaiwan.tw/cross-strait/202211110015
  - Quartz（2019-10）：https://www.cbsnews.com/news/apple-pulls-quartz-news-app-from-its-china-store-after-hong-kong-coverage
  - WhatsApp 與 Threads（2024-04）：https://techcrunch.com/2024/04/19/threads-whatsapp-removed-from-china-app-store/
  - 2020 年 TTP 調查有 16 款台灣相關 App 在大陸 storefront 缺席：https://www.techtransparencyproject.org/articles/apple-censoring-its-app-store-china
  - 台灣國旗 emoji 在港澳 iOS 鍵盤被隱藏：https://blog.emojipedia.org/apple-hides-taiwan-flag-in-hong-kong/
- Apple 2025 透明度報告：因政府要求下架的 App，中國大陸 196 款、香港 1 款、澳門 2 款；被下架的 App 只在要求方的地區消失（https://www.apple.com/legal/app-store/transparency/2025/ ）。

**建議**：首發在 Pricing and Availability 取消勾選中國大陸（https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-for-your-app-on-the-app-store ）。理由有三：

1. 沒有 ICP 本來就不會在大陸上架，排除不損失觸及。
2. 主動排除比被下架乾淨。
3. 在大陸、但用其他地區 Apple ID 的人照樣能下載，而離線內容包對他們最有用。

港澳 2023–2025 找不到政治下架案例，證據不足，先保留並追蹤。

GA 的旁證：中國的 27,424 個使用者裡，95.4% 是 7 秒的 Windows 桌機自動流量，iOS 真人只有 292 人，排除大陸幾乎沒有損失。

### 6.5 出口合規

Info.plist 設 `ITSAppUsesNonExemptEncryption = NO`。只用作業系統內建的加密（`URLSession` 走 HTTPS）屬於豁免，App Store Connect 不需上傳文件（https://developer.apple.com/documentation/security/complying-with-encryption-export-regulations 、 https://developer.apple.com/help/app-store-connect/reference/export-compliance-documentation-for-encryption ）。Apple 同頁提到豁免的 App「might」需要交美國年度自我分類報告；純 HTTPS 的 App 是否需要，官方用「might」（未證實）。muse-pocket 已經這樣設定並過了處理流程。

### 6.6 歐盟 DSA trader 狀態

一定要申報，就算不在歐盟上架也要（https://developer.apple.com/help/app-store-connect/manage-compliance-information/manage-european-union-digital-services-act-trader-requirements ）：

- 免費、沒有內購、沒有廣告、和職業無關的 App，「unlikely to be a trader」。
- 申報 trader 的話，個人帳號的地址、電話、email 會公開在 27 個歐盟國家的商店頁。
- 沒有申報狀態的 App 會從歐盟商店移除。

哲宇是專職數位藝術家，也經營公司；Taiwan.md 不是那份事業的一部分，所以預設申報「非 trader」。這件事建議他本人確認，必要時問律師。

### 6.7 CC BY-SA 4.0 授權在 App 內

- **署名**：每篇文章頁尾放標題、「Taiwan.md 貢獻者」、原文網址、授權連結（https://creativecommons.org/licenses/by-sa/4.0/ ），並註明「App 只改排版，沒改內容」。關於頁照 Wikipedia 的寫法：「Unless otherwise specified, content is available under CC BY-SA」「Source code available under the MIT License」（https://raw.githubusercontent.com/wikimedia/wikipedia-ios/main/Wikipedia/Localizations/en.lproj/Localizable.strings ）。實務清單用 CC 的 TASL（https://wiki.creativecommons.org/wiki/Best_practices_for_attribution ）。
- **技術保護措施條款**：§2(a)(5)(C) 禁止對授權素材施加會限制他人行使權利的技術措施（https://creativecommons.org/licenses/by-sa/4.0/legalcode.en ）。CC 自己 2013 年的討論說 App Store 的 FairPlay「may constitute a violation」，但沒有結論（https://wiki.creativecommons.org/wiki/4.0/Technical_protection_measures ）。緩解做法有四個：
  - FairPlay 的加密記錄在 Mach-O 執行檔的 `LC_ENCRYPTION_INFO`（cryptid）。內容包是 SQLite 資源檔，推論不在加密範圍（https://theapplewiki.com/wiki/Copy_Protection_Overview ）。上架後可以從 App Store 下載的 IPA 檢查驗證。
  - 內容在 taiwan.md 與 GitHub 都能免 DRM 取得，App 內每篇提供「在網站開啟」「在 GitHub 看原始檔」。
  - 內容包本身就是開放下載的 GitHub Release。
  - 這些都只是降低風險，沒有權威法律意見。要明確結論得問律師。
- **程式碼**：MIT 的條件只有附上授權聲明，與 App Store 沒有衝突；GPL 才有 VLC 2011 年被下架的先例（https://opensource.org/license/mit 、 https://www.fsf.org/blogs/licensing/more-about-the-app-store-gpl-enforcement ）。所有依賴套件（例如 GRDB，MIT）都要列在授權頁。

### 6.8 Universal Links 的主機設定

Apple 的要求：檔案放在 `https://taiwan.md/.well-known/apple-app-site-association`，HTTPS、不可轉址；iOS 14 起由 Apple CDN 抓檔，約一週更新一次（https://developer.apple.com/documentation/xcode/supporting-associated-domains 、 https://developer.apple.com/documentation/technotes/tn3155-debugging-universal-links ）。

我們這邊的兩個坑：

1. **`deploy.yml` 會把 `.well-known` 丟掉**。`actions/upload-pages-artifact@v5` 的 `include-hidden-files` 預設是 false（https://github.com/actions/upload-pages-artifact ）。實測 `/.nojekyll`、`/.well-known/security.txt` 都是 404，跟這個行為一致。
2. **Content-Type**：GitHub Pages 對沒有副檔名的檔案回 `application/octet-stream`（實測 `/CNAME`）。現行 Apple 文件沒有規定 Content-Type。子 agent 實測 Apple 自家網站的原始伺服器也回 octet-stream，經 Apple CDN 後變成 `application/json`，所以很可能沒問題，但要用我們自己的網域實測。

預設做法：

- 在 `deploy.yml` 的 upload 步驟加 `include-hidden-files: true`。
- 放 `public/.well-known/apple-app-site-association`。
- 用 `swcutil` 與 `app-site-association.cdn-apple.com/a/v1/taiwan.md` 驗證。

備案：用 Cloudflare Worker route 直接回 JSON（`workers/mcp` 已經有 Wrangler 設定可以參考）。

**路徑規則**：中文文章網址是 `/history/二二八事件/` 這種形式，percent-encoding 容易出錯。建議只用 ASCII 的分類前綴比對，例如 `/history/*`、`/*/history/*`，14 個分類各一條，排除 `/data/`、`/elections/`、`/dashboard/` 等非文章頁（components 格式見 https://developer.apple.com/documentation/bundleresources/applinks/details-swift.dictionary/components-swift.dictionary ）。

AASA 裡的 `appIDs` 是 Team ID 加 bundle ID（`UXN5GBD9Q5.md.taiwan.app`），所以 bundle ID 要在這之前定案。

### 6.9 其他上架要求

- **SDK**：2026-04-28 起必須用 iOS 26 SDK（Xcode 26 以上）建置；2027 年 4 月起改為 iOS 27 SDK（https://developer.apple.com/news/upcoming-requirements/ 、 https://developer.apple.com/news/?id=k1mtkt1k ）。這台的 `/Applications/Xcode.app` 是 27.1，符合。
- **截圖**：只做 iPhone 就不需要 iPad 截圖。介面在各尺寸一致時，只要提供最高解析度那組（https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications ）。子 agent 讀到「至少要一張 Dynamic Island 中尺寸機型」的說法，實際以上傳畫面為準。
- **App 紀錄只能在網頁建**：App Store Connect API 文件寫明「Don't use this API to create new apps」（https://developer.apple.com/documentation/appstoreconnectapi/apps ）。建立 App 需要 Account Holder、Admin 或 App Manager 角色（https://developer.apple.com/help/app-store-connect/create-an-app-record/add-a-new-app/ ）。這一步要哲宇本人在網頁上點。
- **賣家名稱**：個人帳號會顯示法定姓名，無法自訂（https://developer.apple.com/help/account/membership/program-enrollment ）。日後若有法人，可以用 App Transfer 轉過去，bundle ID 與評價保留（https://developer.apple.com/help/app-store-connect/transfer-an-app/overview-of-app-transfer ）。轉移後 Team ID 會變，AASA 要同時列新舊兩組（推論）。

---

## 七、既有工具鏈（muse-pocket）

只讀了結構、README、腳本與 plist。沒有打開任何金鑰、`.p8`、`asc.json` 的內容，只確認檔案存在。

**可以直接沿用的**：

| 項目           | muse-pocket 的做法                                                                                                                                                                                                                                                                                                                                                           | Taiwan.md App 怎麼用                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 開發者帳號     | Apple Developer Program，Individual，Team `UXN5GBD9Q5`（2026-11-02 起付費）                                                                                                                                                                                                                                                                                                  | 同一個 Team                                                             |
| Xcode          | 命令列預設 26.5 傳不了，腳本設 `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer`（27.1）                                                                                                                                                                                                                                                                            | 照抄                                                                    |
| 專案檔         | 手寫 `objectVersion = 77`，用資料夾同步群組，`App/`、`Shared/`、`Widget/` 裡新增 `.swift` 不必改專案檔；`Config/` 放 Info.plist 與 entitlements                                                                                                                                                                                                                              | 照這個骨架開新專案，對 AI 協作與開源 PR 都友善                          |
| 簽章           | `CODE_SIGN_STYLE = Automatic`、`-allowProvisioningUpdates`                                                                                                                                                                                                                                                                                                                   | 同上；第一次 build 會自動註冊 bundle ID                                 |
| 出版腳本       | `tools/testflight.sh`：Release archive → build 號用 `date +%y%m%d%H%M` → `xcodebuild -exportArchive` 搭配 `tools/ExportOptions-testflight.plist`（`method=app-store-connect`、`destination=upload`、teamID、automatic）                                                                                                                                                      | 複製一份改 scheme 與路徑                                                |
| 上傳           | 直接上傳會被回 `providerRequestFailed 'Actor/relationships/providerId'` → 改匯出 ipa → 用 `xcrun altool --upload-app` 搭配 App Store Connect API 金鑰上傳。金鑰描述在 `~/.muse/secrets/asc.json`（`key_id`、`issuer`），私鑰在 `~/.appstoreconnect/private_keys/AuthKey_<KID>.p8`，由他本人用 `tools/install-asc-key.sh` 安裝。這把金鑰是 App 管理權限，能上傳，不能雲端簽章 | 同一把金鑰可以上傳任何 App；簽章照舊用 Xcode 帳號在本機匯出             |
| 備援           | API 金鑰也失敗時，`scp` 到 `macbook-air-black` 桌面並用 Transporter 打開，他在 Air 按「傳送」                                                                                                                                                                                                                                                                                | 保留當備援                                                              |
| 加密宣告       | Info.plist `ITSAppUsesNonExemptEncryption = NO`                                                                                                                                                                                                                                                                                                                              | 照抄                                                                    |
| Widget         | `Widget/TodayWidget.swift` 加 `Shared/SharedSnapshot.swift`，透過 App Group 共用快照                                                                                                                                                                                                                                                                                         | 「今日一篇」照這個模式                                                  |
| 自動化測試入口 | URL scheme `musepocket://…` 與啟動參數 `-MuseTab trip` 直接打開某分頁截圖                                                                                                                                                                                                                                                                                                    | 做 `taiwanmd://article/...`、`-TWTab search`，方便 App Store 截圖自動化 |
| 退件經驗       | App Intent 的說明文字含「Mac」會在處理階段被退（90626）；build 號必須比上一版大                                                                                                                                                                                                                                                                                              | 寫 App Intents 時注意                                                   |

**和任務說明不同的地方**：任務說明寫上傳要靠 Air 的 Transporter。muse-pocket 今天的 commit `e9c7444`（15:38）與 `280f996`（16:08）已改成用 API 金鑰加 altool 從 MacBook Pro 直接上傳，build 2611021604 成功。這台就是「Che的MacBook Pro」，`asc.json` 與一把 `.p8` 都在。Air 現在只是備援。

**Taiwan.md App 要新做的**：

1. 在 App Store Connect 網頁建 App 紀錄（API 不能建）。
2. 註冊 explicit bundle ID `md.taiwan.app`，另有 Widget 的 `md.taiwan.app.widget`，App Group `group.md.taiwan.app`。
3. 開 Associated Domains 能力（`applinks:taiwan.md`）。
4. 隱私權政策網址、Support URL、年齡分級、DSA、銷售地區（排除中國大陸）、截圖、zh-TW／en／ja 商店文案。
5. 這是這個帳號**第一次送公開審查**。muse-pocket 只開 TestFlight 內部測試、從沒送審，所以審查端的經驗要從零累積。
6. 對外公開測試（TestFlight 公開連結）也要先過 Beta App Review。

---

## 八、建議

### 8.1 App 名稱

| 候選          | 商店名稱（≤ 30 字）                 | 副標題（≤ 30 字）                                                                                       | 評估                                                                       |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **A（建議）** | Taiwan.md                           | zh：台灣開源知識庫，離線也能讀／en：Open knowledge of Taiwan, offline／ja：オフラインで読める台湾の知識 | 品牌一致；iTunes Search 在台灣區查不到同名 App；主畫面顯示名也是 Taiwan.md |
| B             | Taiwan.md 台灣知識庫                | 1,150 篇有出處的台灣長文                                                                                | 中文搜尋較好找，名稱較長                                                   |
| C             | Taiwan.md — Taiwan, in 13 languages | –                                                                                                       | 英文市場較清楚，中文讀者較陌生                                             |

類別：主類別 Reference（Wikipedia、Kiwix 都是），副類別 Education。

### 8.2 Bundle ID

- **建議 `md.taiwan.app`**：
  - 是 taiwan.md 網域反過來寫，格式合法（英數、連字號、句點）。
  - Apple 不驗證網域所有權（文件沒寫，推論）。
  - 上傳 build 後就不能改（https://developer.apple.com/documentation/bundleresources/information-property-list/cfbundleidentifier ）。
  - 好處一：用網域命名而不是個人名，日後轉給法人或組織比較中性。
  - 好處二：fork 的人可以照樣用自己的網域，例如 `md.japan.app`。
- 次選 `com.cheyuwu.taiwanmd`：跟 `com.cheyuwu.musepocket` 一致，但會把個人名字永久留在一個公共專案的識別碼裡。
- 連帶：Widget 用 `md.taiwan.app.widget`、App Group 用 `group.md.taiwan.app`、URL scheme 用 `taiwanmd`。

### 8.3 程式碼放哪裡

**建議放 taiwan-md repo 的 `apps/ios/`**：

- 內容包格式（`build-app-pack.mjs`）和 App 會一起演化，同一個 PR 可以同時改兩邊，資料契約不會飄。
- Fork 友好：country-md-starter 的人 fork 後，改一份設定檔就能出自己的 App。把網域、語言清單、品牌色、App 名稱集中在 `apps/ios/Config/Site.json`。
- 單一 issue 與 PR 入口，貢獻者不用找第二個 repo。

**要配套的改動**：

- `deploy.yml` 加 `paths-ignore: ['apps/**']`，改 App 不觸發網站重建。
- 內容包另開 workflow，例如每天一次或 knowledge 有變時，產包並發 GitHub Release。
- `.gitignore` 排除 `apps/ios/build/`、DerivedData、`xcuserdata`。
- repo 裡不放任何簽章檔或金鑰；簽章全靠本機 Xcode 帳號與 API 金鑰，跟 muse-pocket 一樣。

缺點是 repo 已經很大（`knowledge/` 484 MB），只想改 App 的人也要 clone 整包。可以用 sparse checkout 緩解。

### 8.4 MVP

**一句話**：把 Taiwan.md 1,150 篇有出處的策展長文裝進 iPhone，13 語、離線可讀、離線可搜。

**技術骨架**：

- SwiftUI、Swift 6、最低 iOS 18.0（涵蓋 96.4% 的 iOS 讀者），只做 iPhone。
- 依賴只用 GRDB.swift（MIT）讀寫 SQLite 與 FTS5，不用其他第三方 SDK。
- 文章用 WKWebView 載入本機 HTML，CSS（`article-modules.css`、`tokens.css`、`dark-polish.css` 等）與 JS 橋接（腳註預覽、閱讀進度、字級、主題）都打包在 App 內。
- 分頁：今日（最新、今日一篇、14 個分類）、探索（分類、時間軸）、搜尋、收藏、設定（內容語言、內容包管理、字級、關於與授權）。

**功能清單**：

1. 首頁：每語最新 30 篇、今日一篇、14 個分類。
2. 文章閱讀：本機 HTML、腳註預覽、目錄、閱讀進度、字級、深色模式、頁尾授權與出處、在網站開啟、在 GitHub 看原始檔、分享、複製引用。
3. 離線內容包：內建 zh-TW、en、ja；其他 10 語按需下載；背景檢查更新，預設只用 Wi-Fi。
4. 離線全文搜尋（標題、描述、標籤、全文）。
5. 收藏與閱讀進度（本機）。
6. 13 語內容切換、阿拉伯文 RTL；介面先做 zh-TW、en、ja。
7. 時間軸（8 個時代、40 個事件）。
8. Universal Links：taiwan.md 文章連結直接開 App。
9. 「今日一篇」Widget。
10. 關於、授權、隱私說明頁。

MVP 不做：地圖、歷史上的今天、朗讀、iCloud 同步、推播、App 內回饋、資料頁、iPad。

### 8.5 實作順序草案（給下一步的深度實作規劃）

| 週  | 內容                                                                                                                                                                   | 完成的樣子                                         |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | `scripts/core/build-app-pack.mjs`：沿用 Astro 的 markdown 管線與 `article-render.ts`，輸出每語 SQLite；`/api/app/v1/index.json` 指標檔；在本機產出 13 個包並量實際大小 | 13 個 `.sqlite.xz` 與 sha256，中文包體積與估算相符 |
| 1–2 | `apps/ios/` 骨架（照 muse-pocket 的 objectVersion 77 與 Config 結構）、內容包讀取、文章閱讀器                                                                          | 模擬器飛航模式下能讀任一語言的任一篇               |
| 2   | 離線全文搜尋（繁中、日文、阿拉伯文各準備 20 個查詢的自動化測試）、收藏、閱讀進度                                                                                       | 搜尋測試全綠                                       |
| 3   | 時間軸、Widget、設定與內容包管理、關於與授權頁、`PrivacyInfo.xcprivacy`                                                                                                | TestFlight 內部版給哲宇試用                        |
| 3–4 | 網站側：`/privacy/` 頁、AASA 加 `deploy.yml` 的 `include-hidden-files`、內容包 Release workflow；App 側：Universal Links                                               | `swcutil` 驗證通過；點 taiwan.md 連結會開 App      |
| 4–5 | VoiceOver 與動態字級驗收、截圖自動化、商店文案（zh-TW、en、ja）、送審備註、App Store Connect 各項設定                                                                  | 送出審查                                           |

時程是估算，假設主要由 AI 協作開發、哲宇負責試用與做決定。

### 8.6 後續路線

- **v1.1（上架後約 1 個月）**：MapKit 地圖（先把 `map-markers.json` 輸出成 API 並補足各語言）、歷史上的今天（含抽取與查核流程，以及 Widget）、Spotlight 與 App Intents、iCloud 同步收藏、介面多語擴到 13 語。
- **v1.2**：裝置端朗讀、含圖離線包、差異更新、iPad 版面與 Mac（Designed for iPad）。
- **v2**：資料台灣、選舉、預算的原生頁；研究者模式（引用匯出、腳註清單）；把 App 做成 country-md-starter 的一部分，讓 Japan.md 等 fork 改設定就能出自己的 App。

---

## 九、要哲宇決定的事

每條都附預設。他說過不用一直問，所以沒回覆就照預設走。第 3、4、9 條碰到 MANIFESTO §自主權邊界的「政治立場」與「對外溝通」，建議他至少看一眼。

| #   | 決定                      | 預設                                                                                                | 為什麼                                                                  |
| --- | ------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | App 名稱與副標            | 「Taiwan.md」；副標 zh「台灣開源知識庫，離線也能讀」                                                | 品牌一致，台灣區沒有同名 App                                            |
| 2   | Bundle ID（上傳後不能改） | `md.taiwan.app`                                                                                     | 用網域命名，日後轉給組織也中性，fork 可照抄                             |
| 3   | 中國大陸 storefront       | 排除；港澳保留並觀察                                                                                | 沒 ICP 本來就上不了架，且有台灣 App 被下架先例                          |
| 4   | 年齡分級                  | 照實答，預期 13+                                                                                    | 有寫實暴力的文字敘述（228、戰爭）；照實答可避開 2.3.6                   |
| 5   | 歐盟 DSA trader           | 非 trader                                                                                           | 免費、無營利、非職業活動。他本人經營公司，最好自己確認                  |
| 6   | 賣家名稱                  | 先用個人帳號（顯示法定姓名），日後有法人再轉                                                        | 個人帳號無法自訂名稱；轉移保留 bundle ID 與評價                         |
| 7   | 程式碼位置                | taiwan-md repo 的 `apps/ios/`                                                                       | 內容包與 App 一起演化，對 fork 友好                                     |
| 8   | 內容包放哪                | GitHub Releases，指標檔放 Pages                                                                     | Pages 已經 1.88 GB，超過 1 GB 上限；Releases 沒有頻寬上限               |
| 9   | 隱私權政策頁              | 新增 `taiwan.md/privacy/`，涵蓋網站（GA4、Cloudflare）與 App（不收集資料）；文字由他過目            | 送審必備，屬於對外溝通                                                  |
| 10  | 內建哪些語言              | zh-TW、en、ja（合計估 20 MB）                                                                       | 這三語涵蓋 iOS 讀者裝置語言的 92%                                       |
| 11  | 最低 iOS                  | 18.0                                                                                                | 涵蓋 96.4% 的 iOS 讀者                                                  |
| 12  | 裝置                      | 只做 iPhone                                                                                         | iPad 讀者在台灣只有 1.7%                                                |
| 13  | 商店文案語言              | zh-TW、en、ja 先上，其他語言之後                                                                    | 對應目前主要讀者                                                        |
| 14  | 回饋管道                  | 只放 mailto 與 GitHub Issues 連結                                                                   | 保住「不收集資料」，避開 1.2                                            |
| 15  | AASA 怎麼放               | `deploy.yml` 加 `include-hidden-files: true` 加 `public/.well-known/`；不通再改用 Cloudflare Worker | 改動最小                                                                |
| 16  | 測試範圍                  | v1.0 前只開 TestFlight 內部群組「哲宇」；送審通過後才考慮公開測試連結                               | 公開測試要先過 Beta App Review                                          |
| 17  | App 內是否放 GA           | 不放                                                                                                | 放了就不能填「不收集資料」；成效改看 App Store Connect 的 App Analytics |

---

## 附錄 A：順手發現的資料問題（本報告不處理）

1. `public/api/articles.json`：
   - 譯文的 `category` 欄填的是語言代碼（例如 `"category": "vi"`），不是分類。
   - 有 8 筆標題少於 3 個字。第一筆 `vi/People/hung-hsing-fu.md` 的 title 與 description 都是「,」、tags 是 `["and"]`。
   - App 若要用這份當目錄會踩到；建議 App 改讀內容包，這份留給 maintainer 修。
2. `dashboard-analytics.json` 最上層的 `totals`、`topPages`、`countries` 是舊欄位，數字跟 `ga` 區塊對不起來。`ga.byLang` 的 pt、hi、ru、de 四語瀏覽數都是 0，比較像追蹤缺口。
3. `public/api/search-minisearch-*.json` 與 `random-index-*.json` 本機檔案日期停在 2026-09-21。線上是每次建置重產（線上 1,155 篇、本機 1,122 篇），本機副本不能當現況。
4. `public/api/rag/`、`public/api/related/` 只在本機，沒進 git，線上 404。
5. 新加坡加中國每月約 11.6 萬「使用者」是自動流量，會把 GA 總數灌大約 3 倍。評估任何成長時先扣掉。

## 附錄 B：量測指令

```bash
# 線上端點（2026-11-02 16:08 CST）
curl -s -o /dev/null -w "%{http_code} size=%{size_download} type=%{content_type}\n" --compressed https://taiwan.md/api/articles.json
curl -sI https://taiwan.md/api/article-index.json
curl -s -X POST https://mcp.taiwan.md -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# 部署頻率與 Pages artifact 大小
gh run list --workflow deploy.yml --limit 40 --json createdAt,conclusion
gh api repos/frank890417/taiwan-md/actions/runs/41401133223/artifacts

# knowledge 體積與壓縮
find knowledge -maxdepth 2 -name "*.md" -path "knowledge/[A-Z]*" | tar -cf zh.tar -T - && gzip -9 -c zh.tar | wc -c && xz -9 -c zh.tar | wc -c

# GA4（唯讀，用 scripts/tools/lib/sense_client.ga_run；28daysAgo → today）
# 維度：deviceCategory × operatingSystem（依 country 篩選）、sessionDefaultChannelGroup、newVsReturning、
#       language 與 country（篩 operatingSystem=iOS）、operatingSystemVersion（篩 iOS）

# App Store 同名檢查
curl -s "https://itunes.apple.com/search?term=Taiwan.md&country=tw&entity=software&limit=5"
```

_研究方法：本機檔案與線上端點由主 session 親手量；同類 App、Apple 規則、主機與授權三塊由三個子 agent 平行查證，各自附官方網址，主 session 收件後交叉比對本機實測（例如 AASA 的 404、`deploy.yml` 的 hidden files、Pages artifact 大小）。_
