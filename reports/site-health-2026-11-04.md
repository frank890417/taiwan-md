# 網站全面健檢 2026-11-04

> 範圍：站體本身（技術、SEO 基礎建設、效能、無障礙、多語、錯誤頁、部署與 CI、資料 API、安全標頭）。文章內容品質由另一條線處理，本報告不評。
> 量測時間：2026-11-04 07:36–08:20（台灣時間）。線上量的是 https://taiwan.md ，本機量的是 worktree `20261104-site-health` 在 `01f2fc0bd` 上跑 `npm run sync:build` 產出的 `dist/`。
> 分支：`site-health-20261104`（本機，未 push）。

## 一句話結論

站是健康的：抽測 3,633 個網址全部可用、站內斷鏈 0.06%、main 上 CI 沒有紅燈；真正拖累讀者的是重量，一般文章頁在手機上要下載約 6 MB、首頁 11 MB，部署包 1.79 GiB 超過 GitHub Pages 文件寫的 1 GB，這兩件事的根都在「每一頁都帶著所有東西」。本次修了 11 項（多數是 SEO 與多語的寫死值），兩個最大的下載量（首頁 4.4 MB 文章目錄、每頁 0.6–1 MB 搜尋索引）已改成用到才抓。

## 健康總表

| 面向              | 燈號          | 一句話                                                                                                                                                                            |
| ----------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. 可用性與錯誤頁 | 🟢 綠         | 3,633 個抽測網址第一次就 200 的有 3,632 個（1 個 503 重試即好）；Cloudflare 7 天 404 率 0.18%；站內斷鏈 0.06%，全在文章內文                                                       |
| 2. SEO 基礎       | 🟡 黃         | canonical、description、hreflang（頁面 head）全站齊；sitemap 的 hreflang 原本漏中文原文與 x-default、列了 noindex 頁與轉址殼，378 頁標題品牌重複，人物頁宣稱生於 2026。本次都已修 |
| 3. 效能           | 🔴 紅         | Lighthouse 手機分數 55–57；實測節流下 LCP 3.1–3.4 秒、首頁 TBT 4.5 秒；首頁傳輸 11.4 MB。最大兩項已修，字型與第三方 widget 待決定                                                 |
| 4. 無障礙         | 🟡 黃         | Lighthouse 94–100；色彩對比（文章頁 43 處）、標題層級跳級、卡片 aria-label 與可見文字不符。語言鈕已修                                                                             |
| 5. 多語           | 🟢 綠（修後） | 13 語 `<html lang>`、阿拉伯文 `dir=rtl` 全對；語言切換器死連結 0。唯一錯誤是 vi/id/pt/hi 四語聲景頁被標成西班牙文，已修                                                           |
| 6. 部署與 CI      | 🟡 黃         | main 13 條 workflow 0 紅；三天 deploy 77 次：成功 40、被新 push 取消 34、失敗 2（已由 #1935 修好）。部署包 1.79 GiB，超過 1 GB 文件上限                                           |
| 7. 資料 API       | 🟡 黃         | 52 支 `/api/*.json` 全 200；articles.json 的 category 語義、stats.json 的分類與語言數、閱讀時間三處錯，已修（不破壞舊使用者）。GA 四語 0 瀏覽來自取樣上限，追蹤本身沒壞           |
| 8. 安全標頭       | 🔴 紅         | HSTS、CSP、X-Content-Type-Options、X-Frame-Options、Referrer-Policy、Permissions-Policy 一個都沒有                                                                                |

---

## 1. 可用性與錯誤頁

**量測**

```bash
curl -s https://taiwan.md/robots.txt          # 指向 /sitemap-index.xml
curl -s --compressed -o sitemap-0.xml https://taiwan.md/sitemap-0.xml
# 每語隨機 30 篇文章（13 語共 390）＋全部非文章頁 3,243 個，共 3,633 個網址
# 並行 8，curl -L --max-redirs 5 --max-time 30，記狀態碼、轉址次數、TTFB、總時間
```

**數字**

- sitemap：單一檔 `sitemap-0.xml`，18,246 個網址、未壓縮 20 MB（上限 50,000 個／50 MB，還有餘裕）。
- 抽測 3,633 個：390 篇文章、195 個分類頁、3,047 個其他頁全部 200；1 個 `/terminology/young-woman-address/` 回 503，重試 200。0 個需要轉址。
- 回應時間：TTFB 中位數 0.55 秒、p90 0.64 秒、p99 0.87 秒；4 個請求卡 15.6 秒（3 個 terminology、1 個 diary），重試都是 0.6 秒，判斷是源站偶發。
- 最重的頁：`/changelog/` 13 語各 880 KB（壓縮後），解開是 17 MB 的 HTML。
- `http://` 與 `www.` 都 301 到 `https://taiwan.md/`。404 頁正常回 404。
- Cloudflare 7 天（`public/api/dashboard-analytics.json` 的 `cloudflare7d`，10/27–11/03）：1,655 萬請求、404 有 29,833 次（0.18%）、503 185 次、522 20 次、301 有 249,232 次（1.5%）。
- 這份資料沒有逐路徑的 404 欄位，改讀 `reports/404-monitor/latest.json`（11/02，3,783 次 404）：最多的是 `/.well-known/traffic-advice`（38，Chrome 預抓代理）、`/lifestyle/台灣海關報關制度與ezway`（25）、`/technology/nvidia在台灣`（22）。後兩者是大小寫被改小寫的真實文章（原檔 `EZWAY`、`NVIDIA`），目前沒有轉址建議。另有「語言前綴重複」族群 877 次（`/jaja/…`、`/enen/…`），只出現在最早五語，既有的 404 監測已經會產生轉址殼接住。

**站內斷鏈**（照 MAINTAINER-PIPELINE 1510–1535 行：worktree 先補 `fork-graph.json`、`git-info.json`，`npm run sync:build` 後跑）

```bash
python3 scripts/tools/verify_internal_links.py
```

- 19,852 頁、1,433,655 條站內連結，斷 815 條（0.06%），PASS（門檻 7%）。語言切換器斷鏈 0。
- 815 條全部來自 `knowledge/` 文章內文（例如 ja 譯文連到不存在的 `/ja/history/qing-dynasty-era/`、相對路徑寫成 `../../reports/…`）。唯一出現在分類首頁的是 `knowledge/Economy/_Economy Hub.md` 的「綠能科技」連到不存在的 `/economy/台灣能源轉型與綠能產業`。本次不動 `knowledge/`，交給內容那條線。
- 修完重建再量：815 條，數字不變，沒有新增斷鏈。

## 2. SEO 基礎

**量測**：抓線上 5 頁的 `<head>`，再對整個 `dist/`（19,852 個 HTML、其中 1,634 個是轉址殼）掃 `<html lang>`、title、description、canonical、robots、JSON-LD。

**正常的部分**

- 18,217 個真頁面全部有 canonical 與 description；`<html lang>` 只有 4 頁錯（見第 5 節）。
- 頁面 `<head>` 的 hreflang 用 LangMap registry 計算，13 語互指齊全，有 x-default 指向中文原文。
- OG／Twitter 卡齊全，文章有專屬 OG 圖（ar 等新語言退回預設圖）。
- JSON-LD 每頁 4 個區塊（Article／Organization／WebSite／BreadcrumbList），全部能被 JSON 解析。
- `robots.txt` 對 AI 爬蟲全開、指向 sitemap；`llms.txt` 200（`/llms-full.txt` 404）。
- `check-url-contract --strict`：hreflang、canonical、sitemap 三種公告網址，dead 0。

**發現的問題（✅ = 本次已修）**

1. ✅ **sitemap 的 hreflang 漏掉中文原文**：外掛用「去掉語言前綴後路徑相同」配對，譯本之間共用英文 slug，永遠配不到中文檔名。結果 1,155 篇中文文章 0 個 alternate、13,824 筆譯文各列 12 個 alternate（含自己）卻沒有原文，全站沒有 x-default；sitemap 用 `zh-TW`、頁面用 `zh-Hant`。修後 15,001 篇帶 x-default 與中文原文，其中 14,989 篇是 13 語＋x-default 完整 14 個；抽 300 篇比對 sitemap 與頁面 head，298 篇完全一致。
2. ✅ **noindex 頁在 sitemap 裡**：`/search/`、`/assets/` 13 語共 26 頁加 `/feedback-uxtest/`。
3. ✅ **轉址殼在 sitemap 裡**：23 個 meta-refresh 頁（11 語的 `/graph/`、12 語的 `/terminology/`）。sitemap 18,246 → 18,198 個網址。
4. ✅ **同一頁兩個相反的 robots 訊號**：SEO 元件每頁寫死 `index, follow`，noindex 頁同時又有 `noindex`。
5. ✅ **378 頁標題品牌重複**：「歷史 - Taiwan.md | Taiwan.md」，13 語 × 13 個分類首頁都中。修後 0。
6. ✅ **人物頁宣稱生於 2026**：Person JSON-LD 把文章發布日填進 `birthDate`，296 個英文人物頁。
7. ✅ **七語 og:locale 是 zh_TW**；Organization 描述寫死「1156+ 篇、6 種語言」；七語首頁缺 CollectionPage。
8. ✅ **結構化資料網址少結尾斜線**：麵包屑與首頁分類共 14 種網址都是 301。
9. 🟡 **用語詞庫 16 組重複標題**：例如 `/terminology/死機/` 與 `/terminology/當機/` 標題、描述完全相同，屬詞庫資料重複（可用 `terminology-yaml-dedup.py` 處理）。
10. 🟡 `/terminology/`、`/graph/`、`/fork-graph/` 三頁共用預設描述「讓全世界完整認識台灣」。
11. 🟡 文章頁 SEO 分數 92 的原因是 `crawlable-anchors`：腳註卡片的 `<a class="twmd-fn-title">` 沒有 href（由 JS 補）。
12. 🟡 站內連結有 46% 沒有結尾斜線（抽 800 頁、200,444 條 href），主要是頁首導覽、語言下拉、品牌 logo、文章卡片。每點一次就多一次 301；Cloudflare 7 天 301 有 24.9 萬次。`articles.json` 的 `url` 欄也沒有斜線。

## 3. 效能

**量測**

```bash
npx --yes lighthouse@12 <url> [--preset=desktop] --chrome-flags="--headless=new" \
  --only-categories=performance,accessibility,seo,best-practices --output=json
# 另外對三頁用 --throttling-method=devtools 實際節流再跑一次手機版
```

| 頁面                        | 手機分數 | 手機 LCP（模擬） | 手機 LCP／TBT（實際節流） | 桌機分數 | 桌機 LCP | 傳輸量  | 請求數 |
| --------------------------- | -------- | ---------------- | ------------------------- | -------- | -------- | ------- | ------ |
| 首頁 `/`                    | 55       | 24.5 s           | 3.10 s／4,503 ms          | 58       | 4.73 s   | 11.4 MB | 127    |
| 〈二二八事件〉              | 55       | 26.6 s           | 3.43 s／1,768 ms          | 58       | 4.95 s   | 6.1 MB  | 93     |
| `/map/`                     | 55       | 18.8 s           | 未跑                      | 63       | 3.53 s   | 6.0 MB  | 76     |
| `/elections/2026/`          | 55       | 22.2 s           | 未跑                      | 61       | 3.92 s   | 4.7 MB  | 67     |
| `/en/history/228-incident/` | 57       | 13.5 s           | 3.13 s／301 ms            | 77       | 2.50 s   | 2.8 MB  | 46     |

CLS 都低於 0.03，只有英文〈二二八〉實際節流時 0.135。

**模擬值為什麼那麼誇張**：Layout 把整個 `<html>` 設成 `visibility: hidden`，等 `document.fonts.ready` 或 800 ms 逾時才顯示。Lighthouse 預設的模擬節流不懂 setTimeout，會把「顯示之前發出的所有請求」都算成首次繪製的前置條件，所以 FCP 被算成 20 多秒。實際節流下首次繪製約 3.1 秒，這比較接近真實讀者。但這也說明首屏前塞了太多下載。

**傳輸量最大的幾項（每頁都有）**

| 資源                                                          | 大小（壓縮後）                | 出現在             | 狀態                  |
| ------------------------------------------------------------- | ----------------------------- | ------------------ | --------------------- |
| `/api/articles.json`                                          | 4.4 MB                        | 13 語首頁（骰子）  | ✅ 改成按下才抓       |
| `/api/search-minisearch-{lang}.json`                          | 600 KB–1 MB（zh 795 KB）      | 每一頁             | ✅ 改成碰到搜尋框才抓 |
| Google Fonts CSS（Noto Sans TC 7 種粗細＋Noto Serif TC 4 種） | 372 KB 的 CSS，另加多個字型檔 | 每一頁             | 待決定                |
| protico 聊天 widget（web3 套件）                              | 3 支腳本各 320–350 KB 以上    | 首頁               | 待決定                |
| justfont 字型（jf-jinxuanlatte 等）                           | 每支 115–270 KB               | 每一頁，英文頁也載 | 待決定                |
| Google Tag Manager                                            | 177 KB                        | 每一頁             | 保留                  |

修完的預估：首頁少約 5.2 MB（11.4 → 約 6.2 MB），一般文章頁少 0.6–1 MB，首頁主執行緒少掉 14 MB JSON 的解析。本機 `astro preview` 驗證：首頁載入 2.5 秒內 0 個 articles.json 與索引請求；打開搜尋 0.3 秒內打字，3 秒內出結果；`/search/?q=` 照常；骰子照常跳轉；`check-font-gate` 綠。這些改動還沒上線，線上 Lighthouse 要部署後再量。

**快取**：HTML 與 JSON 在 Cloudflare 都是 `cf-cache-status: DYNAMIC`（沒有快取），7 天 1,655 萬請求只有 26.7 萬（1.6%）命中快取，每天 15–22 GB 從 GitHub Pages 出。`/_astro/` 的雜湊檔只有 4 小時快取，可以設一年 immutable。

**HTML 本身很重**：〈二二八事件〉HTML 266 KB（gzip 67 KB），其中約 89 KB 是每頁重複的內嵌腳本（搜尋 19 KB、腳註卡 15 KB、justfont 設定 7 KB…），37 KB 是頁首導覽。全站 HTML 5.0 GB 裡有 1.51 GB（30%）是內嵌腳本。

## 4. 無障礙

Lighthouse 無障礙分數：首頁 95、〈二二八〉95、`/map/` 94、`/elections/2026/` 100、英文〈二二八〉95。

- ✅ 語言切換鈕：畫面顯示「中／EN／AR」，aria-label 只有「語言選擇」（WCAG 2.5.3），每頁都報。已改成「EN Language selection」。
- 🟡 色彩對比：文章頁 43 處。主要是頁尾 meta 字（`#7a8b7e`、`#9aa89e` 配米色底，2.1–3.1）、分類色的強調字（`#c17d5e` 配 `#f5eae1`，2.78）、首頁標籤（`#3b82f6` 配 `#eff6ff`，3.37）、引文 cite（`#94a3b8`，2.47）。需要設計決定色票。
- 🟡 標題層級跳級：文章卡片用 `<h4 class="article-card-title">` 接在 h2 後面；頁尾也有 h4。
- 🟡 文章卡片與首頁分類卡的 aria-label 只放標題，卡片內還有描述與分類，名稱跟可見文字不符。最簡單的做法是拿掉卡片的 aria-label。
- 🟡 `/map/` console 錯誤：`<g> attribute transform: Expected number, "translate(NaN, NaN)"`。
- 🟢 全站 `<html lang>` 正確（除了第 5 節那 4 頁），阿拉伯文 `dir="rtl"`，有跳到主要內容連結。

## 5. 多語

```bash
node scripts/tools/check-ui-language.mjs      # exit 0
node scripts/tools/verify_internal_links.py   # 語言切換器死連結 0
npm run check:tmpl-lang && npm run check:rendered-lang
```

- ✅ **vi/id/pt/hi 的 `/soundscape/` 是西班牙文**：四語出生時從 es 複製，`lang="es"` 沒改，`<html lang="es">`、內容西文、深連結到 `/es/` 文章。已修，並讓聲景的字串表走全站同一條退回鏈（缺譯時 vi/id/hi/ar/ru/de 退英文、pt 退西文），之前 ar/ru/de 聲景頁是外殼該語言、內文中文。
- UI 字串：沒有簡體外洩、沒有整串未譯。工具說 11 語各缺 27 個 key，查證是假警報：那 27 個 `search.*` key 寫在 `src/i18n/search.ts`，工具只掃 `ui.ts`。真正缺的只有 de 的 `nav.exams`。
- `/ar/changelog` 有 127,003 個漢字（更新紀錄本身是中文），是唯一大量漢字的阿拉伯文頁。
- 🟡 11 語的 `/graph/`、`/terminology/` 轉址殼標題是日文「ナレッジグラフへリダイレクト中…」（從 ja 複製），瞬間轉走，影響小。
- 13 語首頁與分類首頁抽測全 200。

## 6. 部署與 CI

```bash
bash scripts/tools/ci-main-health.sh
bash scripts/tools/npm-audit-sweep.sh
gh run list --workflow deploy.yml --limit 200 --created ">=2026-11-01" --json ...
gh api repos/frank890417/taiwan-md/actions/runs/41733365331/artifacts
```

- main 13 條 workflow：RED 0、BLOCKED 0。唯一要人看的是 `Publish CLI to npm` 在 tag `cli-v0.8.1` 失敗，已經 24.4 天（不在 main 上，不計紅燈；#1789 在等這次發佈）。
- npm audit 五道（repo 根、harvest/ui、harvest/backend、workers/mcp、cli）全綠。
- deploy 11/01–11/03 共 77 次：成功 40、取消 34（concurrency 讓新 push 取消舊的，babel 每小時 commit 造成）、失敗 2、執行中 1。兩次失敗都是部署成功後的「字型可見性 live gate」在 ubuntu 26.04 裝不了 Playwright chromium，#1935 已把 runner 釘回 ubuntu-24.04，之後沒再失敗。成功的 deploy 中位數 13.2 分鐘、最長 29 分鐘。
- **Pages 部署包 1,879,573,794 bytes（1.79 GiB）**，跟 11/02 量到的一樣。GitHub 文件寫發佈的網站不得大於 1 GB，目前仍能部署，等於站在沒有預告的上限之上。
- 本機 `dist/` 5.46 GB（25,649 個檔），HTML 佔 5.0 GB。最大的目錄：12 個譯文語言各 330–384 MB、`terminology/` 301 MB（2,239 頁，幾乎都是共用外殼）、`article-images/` 185 MB、`changelog` 13 語各 17 MB。

**瘦身方案（依省下的量排序）**

1. 把每頁重複的內嵌腳本搬成外部檔：Astro 的 `define:vars` 會強制內嵌，改成用 `data-*` 屬性傳值、腳本走打包。全站 HTML 裡 1.51 GB 是內嵌腳本，預估可省 1.0–1.3 GB 未壓縮（部署包約省三到四成），讀者端也能快取。成本約 1–2 天。
2. `/changelog/` 只渲染最近 N 筆，其餘用 JSON 分頁載入：13 × 17 MB ≈ 220 MB。成本半天。
3. 頁首導覽（37 KB／頁）的下拉選單改成共用片段或延後渲染：約 0.7 GB 未壓縮。成本 1 天。
4. `article-images/`（185 MB）與 OG 圖搬到 R2 或其他物件儲存。成本半天，要決定網域。

## 7. 資料 API

```bash
for f in public/api/*.json; do curl -s --compressed -o /dev/null -w "%{http_code} %{size_download} $f\n" https://taiwan.md/api/$(basename $f); done
```

- 主工作樹 `public/api/` 的 52 支 JSON 線上全部 200。`/api/random.json` 404，但 `public/api/README.md` 還把它列成公開端點。`/api/rag/*`、`/api/related/*` 404（只在本機、沒進 git）。`/.well-known/apple-app-site-association` 現在 200（11/02 時是 404，已修好）。
- 附錄 A 逐項：
  - ✅ articles.json 譯文的 `category` 是語言代碼：**仍存在，刻意不改原欄位**。首頁骰子、/explore 隨機鈕、mcp.taiwan.md worker、npm CLI 都靠「category 是語言代碼」判斷譯文，直接改會讓 MCP worker 把一萬多篇譯文當中文原文。本次新增正確的 `lang` 與 `categorySlug` 兩欄（純新增，不破壞），舊欄位怎麼遷移列在決策項。
  - 「8 筆壞標題」：查證後 7 筆是合法的兩字標題（李洋、陳菊、粽子、리양），真正壞的只有 `knowledge/vi/People/hung-hsing-fu.md`（title 與 description 都是「,」、tags `["and"]`），屬內容，交給內容那條線。
  - ✅ stats.json：`totalCategories` 27（把 12 個語言代碼算成分類）、`languageDistribution` 寫死 zh-TW 15,030／en 0。已改成 15 個分類、13 語各自計數。`estimatedContributors` 1,002 是「篇數 ÷ 15」估出來的，本機有 gh 權限時 `update-stats.sh` 會覆寫成真數字，CI 沒權限所以線上是假值，未動。
  - ✅ readingTime：API 用「字元數 ÷ 250」，文章頁用 frontmatter 優先、否則「字元數 ÷ 500」，API 是頁面的將近兩倍（二二八 28 對 16 分鐘、英文版 104 對 55）。已對齊頁面公式。
  - dashboard-analytics 頂層 `totals`／`topPages`／`countries` 舊欄位：**仍存在**，頂層 activeUsers 84,386，`ga.totals` 是 173,480。
  - GA `byLang` 四語 0：**原因是取樣上限**。`scripts/tools/fetch-ga4.py` 的 `by_lang_req` 只取瀏覽數前 500 個路徑，13 語的 `pageCount` 加總正好是 500（zh 412、en 50、ja 24…），pt／hi／ru／de 的頁面擠不進前 500 就變成 0。
- 新增欄位讓 articles.json 未壓縮變大約 0.7 MB（壓縮後約 60 KB），首頁不再預載它之後，這個代價只有按骰子的人付。

## 8. 安全標頭

```bash
curl -sI https://taiwan.md/
```

線上 HTML 回應只有 `server: cloudflare`、`cache-control: max-age=600`、`access-control-allow-origin: *`。下列標頭全部沒有：

| 標頭                                   | 建議值                                     | 備註                                                                     |
| -------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| Strict-Transport-Security              | `max-age=31536000`                         | 確認子網域都有 HTTPS 再加 `includeSubDomains`                            |
| X-Content-Type-Options                 | `nosniff`                                  | 零風險                                                                   |
| Referrer-Policy                        | `strict-origin-when-cross-origin`          | 零風險                                                                   |
| X-Frame-Options／CSP `frame-ancestors` | `SAMEORIGIN`／`'self'`                     | 先確認沒有合作方嵌入整站                                                 |
| Permissions-Policy                     | `camera=(), microphone=(), geolocation=()` | 聲景或地圖若用到定位要開放                                               |
| Content-Security-Policy                | 先上 `Report-Only`                         | 第三方很多：GTM、justfont、protico、jsdelivr（minisearch）、Google Fonts |

GitHub Pages 不能自訂標頭，要在 Cloudflare 用 Transform Rules（Modify Response Header）加。首頁 console 已經有 protico 自己的 CSP 錯誤與第三方 cookie 警告。

---

## 本次已修

分支 `site-health-20261104`（本機，從 `01f2fc0bd` 開出，未 push），11 個 commit：

| commit      | 改了什麼                                                                                                       |
| ----------- | -------------------------------------------------------------------------------------------------------------- |
| `b0f7351a8` | vi/id/pt/hi 聲景頁 `lang` 從 es 改回各自語言；聲景字串表走全站退回鏈（`i18n/utils` 新增 `getFallbackChain()`） |
| `01b25b4a9` | SEO 元件三處六語寫死值：og:locale 補七語、Organization 描述改讀 live 篇數與 13 語、七語首頁補 CollectionPage   |
| `9080edda3` | Person JSON-LD 移除把發布日當出生日的 `birthDate`                                                              |
| `8b5b322ca` | 移除每頁寫死的 robots／googlebot `index, follow`，noindex 頁不再自相矛盾                                       |
| `e6a2585bd` | 麵包屑與首頁分類的結構化資料網址補結尾斜線                                                                     |
| `a7285c111` | 新增 `src/utils/pageTitle.ts`，378 頁標題不再「Taiwan.md \| Taiwan.md」                                        |
| `3f018f057` | 搜尋索引改成碰到搜尋框才下載（/search 結果頁照舊開場就載）                                                     |
| `f207bdb9c` | 首頁骰子改成按下才抓 articles.json；英文首頁副標不再顯示「en」                                                 |
| `f018bec3d` | 語言切換鈕 aria-label 包含畫面上的語言代碼                                                                     |
| `8ce500cd5` | articles.json 新增 `lang`／`categorySlug`；stats.json 分類與語言數改正；閱讀時間對齊文章頁                     |
| `3e6a62e49` | sitemap hreflang 改讀 LangMap registry（補中文原文、x-default、zh-Hant）；排除 noindex 頁與 23 個轉址殼        |

**驗證**

- `npm run sync:build` 成功（19,852 頁）；`check-url-contract --strict` DEAD 0；`verify_internal_links.py` 0.06% PASS（與修前同為 815 條，無新增）。
- `uv run --with pytest --with pyyaml python -m pytest tests -q`：903 passed、9 skipped。
- `npm test`：35 pass、0 fail，frontmatter 15,030／15,030 OK。`npm run test:contracts`：185 pass、0 fail。
- `npm run check:types`：0 errors（中途抓到 sitemap 新函式缺 JSDoc 型別 4 個錯，已補進同一個 commit）。
- `check-font-gate`（本機 preview）綠、`check:tmpl-lang` 綠。
- 本機瀏覽器實測搜尋、/search 結果頁、首頁骰子（中文與英文）。
- 沒有提交任何產出檔（`public/api/*.json` 由 CI prebuild 重產）。

---

## 建議待做（依影響排序）

1. **Cloudflare 快取 HTML 與 JSON**（影響：TTFB、頻寬、源站負載）。快取命中率 1.6%，HTML 中位數 TTFB 0.55 秒，每天 15–22 GB 從 GitHub Pages 出。預設做法：Cache Rule 對 `taiwan.md` 的 HTML 與 `/api/*.json` 設 Edge TTL 10 分鐘（跟現在 `max-age=600` 一樣新鮮度，不需要部署後清快取）；`/_astro/*` 設瀏覽器快取一年。成本 30 分鐘。
2. **部署包瘦身到 1 GB 以下**（影響：部署可靠度，也同時減少每頁 HTML）。預設做法：先做第 6 節方案 1（內嵌腳本外部化），再做方案 2（changelog 分頁）。成本 2–3 天。
3. **查 Cloudflare 流量異常**（影響：頻寬與成本、數據可信度）。7 天 1,655 萬請求、其中 1,548 萬是頁面（HTML）請求，來源台灣 1,519 萬；GA 同期每週約 5 萬瀏覽。11/03 單日 385 萬請求（平常約 160–200 萬），每日不重複訪客只有 2.5–6 萬。像是單一來源大量抓頁面。預設做法：在 Cloudflare 後台看 Security → Bots 與前幾名 ASN／User-Agent，再決定是否限速。成本 30 分鐘。
4. **字型瘦身**（影響：每頁首屏）。Google Fonts 要了 11 種粗細（CSS 本身 372 KB），英文等非 CJK 語言也載 justfont。預設做法：只留實際用到的粗細（先 grep `font-weight` 用量），非 CJK 語言頁不載 justfont。成本半天，要看畫面。
5. **protico widget 延後載入**（影響：首頁 TBT 4.5 秒的可能來源之一、console 錯誤）。預設做法：讀者點聊天按鈕才載入。成本 2 小時。
6. **站內連結補結尾斜線**（影響：46% 的站內點擊多一次 301）。預設做法：`resolveStaticHref()` 與語言下拉的連結統一補斜線；articles.json 的 `url` 補斜線要同時改骰子與 /explore 取分類段的寫法。成本半天。
7. **加安全標頭**（影響：基本防護）。預設做法：先在 Cloudflare Transform Rules 加 HSTS（不含子網域）、nosniff、Referrer-Policy、Permissions-Policy 四個零風險的；CSP 先上 Report-Only 收一週。成本 1 小時。
8. **GA byLang 取樣上限**（影響：四語被誤讀成零讀者）。預設做法：`fetch-ga4.py` 的 `by_lang_req` 的 `limit=500` 改成 `10000`。成本 5 分鐘，需要有憑證的環境實跑一次確認。
9. **無障礙對比與標題層級**（影響：Lighthouse 無障礙 95 → 接近 100）。預設做法：頁尾 meta 字改用 `#5f6f63` 以上的深色、卡片標題改 h3、拿掉卡片 aria-label、腳註卡 `<a>` 給預設 href。成本半天。
10. **dashboard-analytics 頂層舊欄位**：先 grep 有沒有頁面還在讀 `totals`／`topPages`／`countries`，沒有就刪，有就改讀 `ga.*`。成本 1 小時。
11. **macOS 本機 build 的大小寫衝突**：別名 `economy/pinkoi` 等 6 個（Pinkoi、Shopee、Palakaw、Howhow、Joeman、Computex）在不分大小寫的檔案系統會蓋掉真文章，本機 dist 裡這 6 篇變成指向自己的轉址殼。線上（Linux 建置）正常，但本機的斷鏈與契約檢查會讀到假資料。預設做法：產生別名時跳過「跟真網址只差大小寫」的那一條（真網址已經能用）。成本 1 小時。
12. 小項：`public/api/README.md` 移除不存在的 `random.json`；`check-ui-language.mjs` 一併掃 `src/i18n/search.ts`；11 語轉址殼的日文標題改中性英文；de 補 `nav.exams`；`/map/` 的 `translate(NaN, NaN)`；`/lifestyle/…ezway` 這類大小寫變體 404 讓 404 監測建議轉址。
13. 交給內容那條線：`knowledge/` 內 815 條斷鏈、Economy Hub 的綠能科技連結、`vi/People/hung-hsing-fu.md` 壞標題、用語詞庫 16 組重複詞條。

## 要哲宇決定的事（附預設）

1. **articles.json 的 `category` 要不要改成真分類？** 這是破壞性變更，會影響已發佈的 npm CLI 與 mcp.taiwan.md。預設：本次已加 `lang`／`categorySlug`，接著把四個使用者（首頁骰子、/explore、MCP worker、CLI）改讀新欄位，CLI 發新版後兩週再把 `category` 改成真分類，README 先註明。
2. **Cloudflare 要不要快取 HTML？** 預設：要，Edge TTL 10 分鐘、不在部署時清快取（不用把 Cloudflare token 放進 CI）。代價是部署後最多 10 分鐘舊頁，跟現在瀏覽器端的 `max-age=600` 相同。
3. **字型取捨**：Noto 11 種粗細與非中文頁的 justfont 要砍多少？預設：只留用到的粗細、非 CJK 語言不載 justfont。要你看過畫面再上。
4. **protico 聊天 widget 留不留？** 預設：留，改成點了才載入。
5. **CSP 要多嚴？** 預設：四個零風險標頭立刻加，CSP 只做 Report-Only。
6. **部署包超過 1 GB 要先處理哪一塊？** 預設：內嵌腳本外部化（省最多、讀者也受益），changelog 分頁第二。
7. **流量異常要不要限速？** 預設：先看 Cloudflare 後台來源再決定，查到是單一爬蟲就用 Rate Limiting Rule 限它，不全站限。

---

_量測原始檔（本機暫存，不進 repo）：sitemap 分析、3,633 筆探測結果、10＋3 份 Lighthouse JSON、站內斷鏈完整報告。_
