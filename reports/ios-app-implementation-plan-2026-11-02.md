# Taiwan.md iOS App 深度實作規劃

> 2026-11-02｜Taiwan.md（📱 iOS App session，`2026-11-02-164611-ios-app`）｜帳本卡 chief-1102-12
>
> 上游：[ios-app-research-2026-11-02.md](ios-app-research-2026-11-02.md)（twmd-desk 研究 session 產出，本檔照它的結論往下做，研究不重做）。
>
> 範圍：架構、資料契約、MVP 切法、測試、發布、上架清單、後續版本。本檔寫完就開工，凡是要哲宇決定的，集中在 §十二，每條附預設。

---

## 一、一句話與成功標準

**把 Taiwan.md 1,150 篇有出處的策展長文裝進 iPhone：13 語、離線可讀、離線可搜，內容每天跟網站同步。**

MVP 驗收（全部達成才進送審前停點）：

1. 飛航模式下，首次安裝就能讀中文、英文、日文任一篇，搜得到內容。
2. 其他 10 語在設定頁下載後同樣離線可讀可搜，阿拉伯文右到左排版正確。
3. 文章顯示與網站同一支渲染器的輸出（`tw-*` 視覺模組、腳註、策展人筆記不跑版）。
4. 點 taiwan.md 文章連結會打開 App 的同一篇（Universal Links，網站 AASA 上線後驗）。
5. 主畫面「今日一篇」Widget 不靠網路也會每天換。
6. 模擬器逐頁截圖全部看過，TestFlight 內部群組裝得起來、手機實機開得了。
7. 隱私標籤可以誠實填「不收集任何資料」。

---

## 二、接手研究 §九 的 17 條預設

研究的 17 條預設，我採用 14 條、修改 3 條。修改的理由寫在右欄。

| #   | 決定                | 研究預設                                              | 本規劃                                                               | 理由                                                                                  |
| --- | ------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1   | App 名稱            | Taiwan.md                                             | 採用                                                                 | –                                                                                     |
| 2   | Bundle ID           | `md.taiwan.app`                                       | 採用，Widget `md.taiwan.app.widget`，App Group `group.md.taiwan.app` | –                                                                                     |
| 3   | 中國大陸 storefront | 排除，港澳保留                                        | 採用                                                                 | 送審前停點由哲宇確認                                                                  |
| 4   | 年齡分級            | 照實答，預期 13+                                      | 採用                                                                 | 同上                                                                                  |
| 5   | DSA                 | 非 trader                                             | 採用                                                                 | 他本人確認                                                                            |
| 6   | 賣家名稱            | 個人帳號                                              | 採用                                                                 | –                                                                                     |
| 7   | 程式碼位置          | taiwan-md 的 `apps/ios/`                              | 採用                                                                 | 內容包產線與 App 同 repo，契約一起演化，fork 可照抄                                   |
| 8   | 內容包放哪          | GitHub Releases，指標檔放 Pages                       | **修改**：內容包與指標檔都放同一個 Release（tag `app-packs`）        | 指標檔也放 Release，內容包產線就完全不碰網站部署，Pages 已超過 1 GB，少一個理由去動它 |
| 9   | 隱私權政策頁        | 新增 `taiwan.md/privacy/`                             | 採用，文字我起草，送審前停點給他看                                   | 屬對外溝通                                                                            |
| 10  | 內建語言            | zh-TW、en、ja                                         | 採用，首次啟動只解壓使用者的內容語言，其他兩包要用時才解             | 首次啟動快                                                                            |
| 11  | 最低 iOS            | 18.0                                                  | 採用                                                                 | –                                                                                     |
| 12  | 裝置                | 只做 iPhone                                           | 採用                                                                 | –                                                                                     |
| 13  | 商店文案語言        | zh-TW、en、ja                                         | 採用                                                                 | –                                                                                     |
| 14  | 回饋管道            | mailto 與 GitHub Issues                               | 採用                                                                 | –                                                                                     |
| 15  | AASA                | `include-hidden-files: true` 加 `public/.well-known/` | 採用（`include-hidden-files` 預設 false 已親手核對 action.yml）      | –                                                                                     |
| 16  | 測試範圍            | 只開內部群組                                          | 採用                                                                 | –                                                                                     |
| 17  | App 內 GA           | 不放                                                  | 採用                                                                 | –                                                                                     |
| –   | 搜尋實作            | SQLite FTS5，中日韓 bigram 在建包時切好               | **修改**：正規化字串比對（`instr`），不用 FTS5                       | 見 §五.4。1,150 篇的量級全掃夠快，而且 13 語一套規則，不用處理斷詞器                  |
| –   | SQLite 套件         | GRDB.swift                                            | **修改**：直接用系統 `SQLite3`，零第三方依賴                         | 內容包是唯讀資料庫，查詢只有十幾種，一百多行包裝就夠，授權頁也少一項                  |

---

## 三、系統架構

```text
taiwan-md repo（同一個 repo）
│
├─ knowledge/**.md（SSOT，13 語）
│     │
│     ▼  scripts/app/build-app-packs.sh（每日排程，或手動）
│  ① render.mjs：gray-matter 讀 frontmatter
│               ＋ src/utils/article-render.ts 的 renderArticleHtml()
│               （網站同一支渲染器，用 jiti 直接載入 .ts）
│               → 每語一份 NDJSON（中繼資料＋HTML＋純文字）
│  ② pack.py：  NDJSON → SQLite（articles / bodies / search / meta）
│               → LZMA 壓縮 → index.json（sha256、篇數、大小）
│     │
│     ▼  gh release upload app-packs --clobber
│  GitHub Release「app-packs」（prerelease，不標 latest）
│     ├─ index.json
│     └─ pack-{lang}.sqlite.lzma × 13
│
├─ apps/ios/（SwiftUI App 原始碼，xcodegen 產專案檔）
│     建置時：tools/seed-packs.sh 把 zh-TW／en／ja 三包放進 App 本體
│
└─ public/.well-known/apple-app-site-association、src/pages/privacy.astro
      （網站側只加這兩樣）

iPhone
  App 啟動 → 讀本機內容包（Application Support/Packs/{lang}.sqlite）
           → 背景抓 index.json（ETag，6 小時一次，預設只用 Wi-Fi）
           → sha256 不同才下載新包 → 驗證 → 原子替換
  文章：WKWebView 顯示本機 HTML（baseURL = https://taiwan.md/，有網路時圖片照常載）
  其餘：原生 SwiftUI（今日、分類、時間軸、搜尋、收藏、設定、Widget）
```

**為什麼這樣切**：

- 渲染只有一份程式碼。網站改了 `article-render.ts`，下一次產包就跟上，App 不用發新版。
- 內容包產線不改網站建置，也不往 Pages 疊東西。網站壞了不影響 App 更新，反過來也一樣。
- App 本體只放 CSS 與少量橋接 JS，內容包只有 HTML 與文字，符合 2.5.2「不下載會改變功能的程式碼」。

---

## 四、資料契約 v1

### 4.1 識別碼

| 名稱               | 規則                                                                                | 例子                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `key`（跨語共用）  | 中文原檔相對 `knowledge/` 的路徑，去掉 `.md`                                        | `History/二二八事件`                                                                |
| 譯文如何找到 `key` | 讀譯文 frontmatter 的 `translatedFrom`                                              | `knowledge/en/History/228-incident.md` 的 `translatedFrom: 'History/二二八事件.md'` |
| `path`（網址路徑） | 跟網站路由一致：中文 `/{category小寫}/{檔名}`，譯文 `/{lang}/{category小寫}/{檔名}` | `/history/二二八事件`、`/en/history/228-incident`                                   |
| 語言代碼           | 跟網站 `src/config/languages` 一致                                                  | `zh-TW en ja ko es fr vi id pt hi ar ru de`                                         |

`key` 是收藏、閱讀進度、跨語切換的共同鍵。使用者切語言，收藏不會散掉。

### 4.2 指標檔 `index.json`（Release 資產）

```json
{
  "schema": 1,
  "generatedAt": "2026-11-02T10:00:00Z",
  "source": { "repo": "frank890417/taiwan-md", "commit": "84ffb97" },
  "minAppSchema": 1,
  "packs": {
    "zh-TW": {
      "file": "pack-zh-TW.sqlite.lzma",
      "bytes": 6900000,
      "rawBytes": 41000000,
      "sha256": "…",
      "articles": 1154,
      "generatedAt": "2026-11-02T10:00:00Z"
    }
  }
}
```

下載網址固定為 `https://github.com/frank890417/taiwan-md/releases/download/app-packs/{file}`。App 只認 `schema` 與 `minAppSchema`，欄位往後只加不改。

### 4.3 內容包 SQLite schema（`schema = 1`）

```sql
CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);
-- schema, lang, generatedAt, commit, articles

CREATE TABLE articles(
  key TEXT PRIMARY KEY,      -- 'History/二二八事件'
  path TEXT NOT NULL,        -- '/en/history/228-incident'
  category TEXT NOT NULL,    -- 'History'（14 個資料夾名）
  subcategory TEXT,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT,                 -- JSON 陣列
  date TEXT,                 -- frontmatter date
  updated TEXT,              -- git 最後修改（content-dates.json），沒有就用 date
  readingTime INTEGER,
  featured INTEGER DEFAULT 0,
  image TEXT, imageCredit TEXT, imageLicense TEXT,
  chars INTEGER,             -- 純文字字數
  hash TEXT                  -- 原始 markdown 的 sha1，差異更新用
);
CREATE INDEX articles_path ON articles(path);
CREATE INDEX articles_category ON articles(category, date);

CREATE TABLE bodies(key TEXT PRIMARY KEY, html TEXT NOT NULL);

CREATE TABLE search(        -- 已正規化，見 §五.4
  key TEXT PRIMARY KEY,
  title TEXT, meta TEXT, body TEXT
);
```

不收的東西：`_` 開頭的 Hub 檔、`About/` 以外的非文章檔、`lastHumanReview` 等內部欄位。

**體積估計**（研究 §2.2 加本規劃的單篇實測）：〈二二八事件〉markdown 21 KB → 渲染後 HTML 10.6 KB。中文全庫 markdown 22.9 MB，推論 HTML 約 25 MB、搜尋欄約 15 MB，SQLite 約 40 MB，LZMA 後約 6–7 MB。產出後以實測取代這段估計。

### 4.4 HTML 後處理

- 用 `renderArticleHtml(title, content, lang)` 的 `fullHtml`，網站樣板外圍的元件（頁首大圖、SSODT 觀點、孢子足跡）不收，首圖由 App 原生畫。
- 相對網址不改寫。WKWebView 用 `baseURL = https://taiwan.md/` 載入，有網路時圖片照常顯示，沒網路時圖片框收起來。
- 站內連結（`/history/…`、`/en/…`、wikilink 轉出的連結）在 App 裡由導覽攔截器查 `articles.path`，查得到就原生開該篇，查不到交給 Safari。
- YouTube iframe 換成佔位卡加「在 YouTube 開啟」連結（離線時 iframe 只會是一塊空白）。

---

## 五、App 架構

### 5.1 技術選擇

| 項目       | 選擇                                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| 語言與框架 | Swift 5 模式（Xcode 27.1 工具鏈）、SwiftUI、`@Observable`                                            |
| 最低版本   | iOS 18.0，只做 iPhone，直式                                                                          |
| 資料庫     | 系統 `SQLite3`（唯讀內容包），收藏與進度用 JSON 檔存在 Application Support                           |
| 文章顯示   | `WKWebView` 包成 `UIViewRepresentable`，本機 `reader.css`＋網站的 `article-modules.css`＋`reader.js` |
| 解壓縮     | `NSData.decompressed(using: .lzma)`（Apple Compression framework）                                   |
| 網路       | `URLSession`，條件式請求（ETag），`NWPathMonitor` 判斷是否昂貴網路                                   |
| 專案檔     | `xcodegen`（`project.yml` 進 git，產出的 `.xcodeproj` 也進 git，clone 下來直接能開）                 |
| 第三方依賴 | 無                                                                                                   |

### 5.2 目錄

```text
apps/ios/
  project.yml                 xcodegen 設定（App、Widget、Tests 三個 target）
  TaiwanMD.xcodeproj/          產出物，進 git
  Config/
    App-Info.plist  Widget-Info.plist
    TaiwanMD.entitlements  Widget.entitlements
    PrivacyInfo.xcprivacy
  App/
    TaiwanMDApp.swift          入口、深連結路由、首次啟動解壓
    RootView.swift             五個分頁
    Model/                     Article、Language、Category、Era
    Data/
      SQLiteDB.swift           系統 SQLite3 的薄包裝（prepare / bind / step）
      PackStore.swift          已安裝內容包的開啟、查詢、切換
      PackUpdater.swift        index.json、下載、驗 sha256、原子替換
      SearchEngine.swift       正規化比對與排序
      TextNormalizer.swift     與 pack.py 同一條規則
      Library.swift            收藏、閱讀進度、最近讀過（JSON 檔）
      WidgetBridge.swift       寫 App Group 快照
    Features/
      Today/  Explore/  Timeline/  Search/  Library/  Settings/  Reader/
    Resources/
      Assets.xcassets（App 圖示、品牌色）
      Localizable.xcstrings（介面：zh-Hant、en、ja）
      Web/ reader.css  article-modules.css  reader.js
      Data/ timeline-eras.json
      Packs/ pack-zh-TW.sqlite.lzma  pack-en.sqlite.lzma  pack-ja.sqlite.lzma（建置前由腳本放入，不進 git）
  Shared/
    WidgetSnapshot.swift       App 與 Widget 共用的資料格式
  Widget/
    TodayArticleWidget.swift
  Tests/
    TextNormalizerTests.swift  SearchEngineTests.swift  PackStoreTests.swift
  tools/
    gen-project.sh  seed-packs.sh  sync-web-assets.sh
    testflight.sh  ExportOptions-testflight.plist  screenshots.sh
```

### 5.3 畫面

| 分頁 | 內容                                                                                                           | 資料來源                                           |
| ---- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| 今日 | 今日一篇（大卡）、最新 20 篇、精選橫列、14 分類捷徑                                                            | 內容包，今日一篇用日期當種子在精選與高字數文章中挑 |
| 探索 | 14 分類格（篇數）、時間軸入口，分類頁依子分類分段                                                              | 內容包，`timeline-eras.json`                       |
| 搜尋 | 打字即時比對標題與描述，按搜尋後掃全文，結果顯示片段                                                           | `search` 表                                        |
| 收藏 | 收藏、最近讀過、讀到一半                                                                                       | `Library`                                          |
| 設定 | 內容語言（13）、字級、外觀（系統／淺／深）、內容包管理（大小、更新、刪除、只用 Wi-Fi）、關於、授權、隱私、回饋 | –                                                  |

文章頁：原生導覽列（收藏、Aa 字級與外觀、語言切換、分享、更多：在網站開啟／在 GitHub 看原始檔／複製引用）。網頁內容：分類與子分類、標題、描述、閱讀時間、首圖與圖片出處、正文、頁尾授權（CC BY-SA 4.0、原文網址、「App 只改排版，沒有改內容」）。閱讀進度每 2 秒回報一次，重開文章回到同一位置。

時間軸：8 個時代直向排列（時代色條、年代、標題、副標），點開看導言與事件，事件有連結的直接開文章。`timeline-eras.json` 內嵌 6 語，其他 7 語退回英文。

### 5.4 搜尋

**正規化**（`TextNormalizer.swift` 與 `pack.py` 必須逐字一致，兩邊各有測試對同一組樣本）：

1. Unicode NFKC（全形英數轉半形、半形片假名轉全形）。
2. 小寫（Unicode 預設規則）。
3. 刪掉阿拉伯文母音符號 U+064B–U+065F、U+0670 與延長符 U+0640。
4. 連續空白壓成一個空白。

**查詢**：使用者輸入照同一規則正規化，以空白切成多個詞，每個詞都要命中（AND）。SQL：

```sql
SELECT key,
  (instr(title, :q) > 0) * 100 + (instr(meta, :q) > 0) * 30 + (instr(body, :q) > 0) * 10 AS score
FROM search
WHERE instr(title, :q) > 0 OR instr(meta, :q) > 0 OR instr(body, :q) > 0
ORDER BY score DESC LIMIT 200;
```

多詞時分數相加、條件改成每個詞都要至少命中一欄。片段從命中文章的純文字取前後 40 字。

**為什麼不用 FTS5**：中文單字查詢（「茶」「廟」）在 bigram 索引裡查不到，要另外退回全掃，印地文的母音符號在 `unicode61` 斷詞器裡會被當成分隔符，阿拉伯文要另外處理。正規化比對對 13 語一視同仁，單字、片假名、阿拉伯文都直接成立。代價是每次全文搜尋要掃約 15 MB 文字，SQLite 的 `instr` 是 C 迴圈，推論在 iPhone 上 100 ms 等級，打字時只比對標題與描述（幾百 KB），按搜尋才掃全文。實測超過 300 ms 再升級 FTS5，資料表與 App 端的介面不用動。

**測試集**：繁中 10 條（含單字、人名、地名、跨字詞「二二八」「珍珠奶茶」）、日文 5 條（含片假名）、英文 5 條、阿拉伯文 3 條，期望值寫死在測試裡。

### 5.5 內容包生命週期

```text
首次啟動
  └ 依系統語言選內容語言（13 語對照，對不到就 zh-TW）
  └ 若內容語言在內建三包裡 → 從 App 本體解壓到 Application Support/Packs/（背景，顯示進度）
  └ 不在內建三包 → 先解壓 zh-TW 讓使用者能讀，同時提示下載該語言
更新檢查（啟動時，距上次超過 6 小時）
  └ GET index.json（If-None-Match）
  └ 已安裝的包 sha256 不同 → 加入下載佇列
  └ 預設只在非昂貴網路下載，設定可關
下載
  └ 先檢查剩餘空間（壓縮後 × 8 的餘裕）
  └ 下載到 tmp → 驗 sha256 → 解壓到 tmp → 開檔驗 meta.schema → rename 取代舊檔
  └ 任何一步失敗：保留舊包，下次再試
```

已開啟的資料庫連線在替換前關閉，閱讀中的文章不受影響（HTML 已經載進 WKWebView）。

### 5.6 深連結

| 入口            | 格式                                                                                            | 處理                                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Universal Links | `https://taiwan.md/{lang?}/{category}/{slug}/`                                                  | 去掉結尾斜線、percent-decode 後查 `articles.path`，網址語言的包沒裝就用目前內容語言的同一個 `key` |
| URL scheme      | `taiwanmd://article/{lang}/{key}`、`taiwanmd://tab/{today\|explore\|search\|library\|settings}` | Widget 與截圖自動化用                                                                             |
| 啟動參數        | `-TWTab search`、`-TWArticle History/二二八事件`、`-TWLang ja`                                  | 截圖腳本用                                                                                        |

AASA（`public/.well-known/apple-app-site-association`）：

```json
{
  "applinks": {
    "details": [
      {
        "appIDs": ["UXN5GBD9Q5.md.taiwan.app"],
        "components": [
          { "/": "/about/*" },
          { "/": "/history/*" },
          { "/": "/geography/*" },
          { "/": "/culture/*" },
          { "/": "/food/*" },
          { "/": "/art/*" },
          { "/": "/music/*" },
          { "/": "/technology/*" },
          { "/": "/nature/*" },
          { "/": "/people/*" },
          { "/": "/politics/*" },
          { "/": "/society/*" },
          { "/": "/economy/*" },
          { "/": "/lifestyle/*" },
          { "/": "/*/history/*" },
          "… 其餘 13 個分類同上"
        ]
      }
    ]
  }
}
```

只比對 ASCII 分類前綴，`/data/`、`/elections/`、`/dashboard/` 等非文章頁不進 App。

### 5.7 Widget

- 小、中兩種尺寸，「今日一篇」：分類色條、標題、描述兩行。
- App 每次啟動與內容包更新後，算好未來 14 天的今日一篇寫進 App Group 的 `widget-snapshot.json`，Widget 不開資料庫。
- 點 Widget → `taiwanmd://article/{lang}/{key}`。

### 5.8 無障礙與排版

- 原生介面全部吃 Dynamic Type，文章字級獨立（80%–160%，CSS 變數）。
- 阿拉伯文：介面語言不是阿拉伯文時，文章仍以 `dir="rtl"` 顯示。
- VoiceOver：卡片合併成一個元素並朗讀「分類、標題、閱讀時間」，文章 WKWebView 本身可讀。
- 深色模式：`data-theme='dark'` 套用網站既有的深色變數，再由 `reader.css` 補 App 專用的底色。

---

## 六、隱私與安全設計

| 項目             | 做法                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 網路請求         | 只打 `github.com` Release（指標檔與內容包）與 `taiwan.md`（圖片），不帶任何識別碼或自訂參數                                     |
| 分析 SDK         | 無                                                                                                                              |
| 本機資料         | 收藏、進度、設定只存在裝置，Widget 快照只有文章標題與描述                                                                       |
| 外部連結         | 一律交給系統 Safari，App 內沒有可以任意瀏覽的網頁畫面（年齡分級「Unrestricted Web Access」答 No）                               |
| Privacy Manifest | `NSPrivacyTracking = false`，required reason API：UserDefaults `CA92.1`、`1C8F.1`，File timestamp `C617.1`，Disk space `E174.1` |
| 加密宣告         | `ITSAppUsesNonExemptEncryption = NO`                                                                                            |
| 隱私標籤         | Data Not Collected                                                                                                              |

---

## 七、MVP 切法（實作順序）

每一步做完都在模擬器親眼看過才進下一步。

| 步  | 內容                                                                                                    | 驗收                                                                          |
| --- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 1   | `scripts/app/` 產包：render.mjs＋pack.py＋build-app-packs.sh，先產 zh-TW 全量與 13 語                   | 13 個包的篇數與網站一致，中文包壓縮後大小落在 5–9 MB，抽 5 篇 HTML 跟網站比對 |
| 2   | `apps/ios/` 骨架：project.yml、五分頁、品牌色、App 圖示（由 `public/brand/taiwanmd-app-icon.svg` 輸出） | 模擬器跑起來                                                                  |
| 3   | PackStore＋首次解壓＋今日／探索／分類列表                                                               | 飛航模式能瀏覽                                                                |
| 4   | 文章頁：WKWebView、CSS、字級、外觀、進度、站內連結攔截、語言切換、分享、引用                            | 抽 10 篇含 `tw-*` 模組、表格、腳註、阿拉伯文                                  |
| 5   | 搜尋＋測試集                                                                                            | 單元測試全綠，全文搜尋耗時寫進報告                                            |
| 6   | 收藏、最近讀過、讀到一半                                                                                | 重開 App 還在                                                                 |
| 7   | 時間軸                                                                                                  | 8 時代、事件連結可開                                                          |
| 8   | 設定：內容語言、內容包管理（下載、刪除、更新）、關於、授權、隱私                                        | 下載一個非內建語言並切過去                                                    |
| 9   | Widget＋深連結                                                                                          | 主畫面加 Widget、點進文章                                                     |
| 10  | 發布 Release `app-packs`，App 端更新流程實測                                                            | 改一篇文章重產包，App 偵測到並更新                                            |
| 11  | TestFlight：testflight.sh、build 號、內部群組                                                           | 哲宇手機裝得起來                                                              |
| 12  | 網站側：`/privacy/` 頁、AASA、`deploy.yml` 的 `include-hidden-files` 與 `paths-ignore: apps/**`         | 隱私頁 200，AASA 經 Apple CDN 抓得到                                          |
| 13  | 商店資料：截圖（6.9 吋）、zh-TW／en／ja 文案、審查備註、分級與隱私問卷                                  | 送審前停點，整包貼給哲宇                                                      |

第 12 步的隱私頁屬對外溝通：文字先給哲宇看，他說可以才上線。AASA 與 `deploy.yml` 是技術設定，跟著第 12 步一起推。

---

## 八、內容包產線的維運

- **頻率**：MVP 由這台 Mac 手動跑 `scripts/app/build-app-packs.sh --publish`，上架後改成 GitHub Actions 每日排程（`workflow_dispatch` 加 `schedule`），用 `GITHUB_TOKEN` 的 `contents: write` 上傳 Release 資產。
- **耗時**：渲染 13 語約 15,000 篇，單篇數毫秒，推論全量 2–3 分鐘。
- **失敗處理**：任何一語產包失敗就不上傳那一語，`index.json` 保留舊值，App 端看到的永遠是一份完整的包。
- **對賬**：產包後比對每語篇數與 `knowledge/{lang}` 實際檔數，差超過 1% 就失敗並印出缺哪些（MANIFESTO §14 能機械化就儀器化）。
- **Release 衛生**：只有一個 tag `app-packs`，標成 prerelease、`--latest=false`，不會蓋掉網站版本的 Release 列表，資產每次 `--clobber` 覆蓋。

---

## 九、測試策略

| 層         | 內容                                                                                                        | 工具                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 產包       | 篇數對賬、schema 版本、隨機 5 篇 HTML 與網站同篇 `<article>` 文字一致度                                     | `pack.py --verify`                                                           |
| 正規化一致 | 同一組 30 個樣本字串，Python 與 Swift 輸出逐字相同                                                          | `tests/fixtures/normalize-cases.json` 兩邊共用                               |
| App 單元   | TextNormalizer、SearchEngine（測試集）、PackStore（用 30 篇的小包）                                         | Swift Testing，`xcodebuild test`                                             |
| 畫面       | 每個分頁、文章頁淺色與深色、阿拉伯文文章、搜尋結果、設定、Widget                                            | `tools/screenshots.sh`（啟動參數切畫面＋`simctl io screenshot`），每張親眼看 |
| 離線       | 模擬器關網路（Network Link Conditioner 或拔掉 Mac 網路不可行時，用 App 內「強制離線」除錯開關）重跑主要路徑 | 手動＋截圖                                                                   |
| 實機       | TestFlight 裝在哲宇手機                                                                                     | 他回報                                                                       |

---

## 十、發布流程

```text
bash apps/ios/tools/testflight.sh
  ① seed-packs.sh：從 Release 抓最新 zh-TW／en／ja 包放進 Resources/Packs（沒有網路就用本機產的）
  ② xcodebuild archive（Release、build 號 = date +%y%m%d%H%M、-allowProvisioningUpdates）
  ③ exportArchive 匯出 ipa（Xcode 帳號本機簽章）
  ④ xcrun altool --upload-app（App Store Connect API 金鑰 T5RUSQ9HDN，只帶路徑與編號）
  ⑤ 失敗才退回 Transporter（Air）
```

- `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer`（27.1），命令列預設的 26.5 不用。
- 第一次 archive 會自動註冊 `md.taiwan.app`、`md.taiwan.app.widget`、App Group 與 Associated Domains 能力。
- **App Store Connect 的 App 紀錄只能在網頁建**（研究 §6.9），所以第一次上傳前要哲宇做一步，見 §十二。
- 版本號：`MARKETING_VERSION = 1.0.0`，build 號用時間，每次都比上一版大。

---

## 十一、上架清單

| 欄位           | 草案（送審前停點給哲宇確認）                                                                                                      |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 名稱           | Taiwan.md                                                                                                                         |
| 副標題         | zh：台灣開源知識庫，離線也能讀／en：Open knowledge of Taiwan, offline／ja：オフラインで読める台湾の知識                           |
| 主類別／副類別 | Reference／Education                                                                                                              |
| 價格           | 免費，無內購                                                                                                                      |
| 銷售地區       | 全部，排除中國大陸                                                                                                                |
| 年齡分級       | 照實答，預期 13+                                                                                                                  |
| 隱私標籤       | Data Not Collected                                                                                                                |
| 隱私權政策網址 | https://taiwan.md/privacy/                                                                                                        |
| 支援網址       | https://github.com/frank890417/taiwan-md/issues（另附 mailto）                                                                    |
| 行銷網址       | https://taiwan.md/                                                                                                                |
| 版權           | 2026 Taiwan.md contributors（內容 CC BY-SA 4.0）                                                                                  |
| 截圖           | 6.9 吋 iPhone 5 張：今日、文章、搜尋、時間軸、13 語切換                                                                           |
| 審查備註       | 全部內容離線可用（請開飛航模式測試），內容包每日由 GitHub Release 更新，只有文字與 HTML、不含程式碼，沒有帳號、沒有 UGC、沒有追蹤 |
| DSA            | 非 trader（哲宇確認）                                                                                                             |

---

## 十二、要哲宇做或決定的事

照「一次一件、附最短步驟」的規矩，依發生順序排。沒回覆就照預設往下做，但 #1 必須他本人動手。

| #   | 時機                | 事情                                                                  | 預設／最短步驟                                                                                                                                                                        |
| --- | ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 第一次 archive 之後 | 在 App Store Connect 建 App 紀錄                                      | 手機 Safari 開 appstoreconnect.apple.com → App → ＋ → 新增 App → 平台 iOS、名稱「Taiwan.md」、主要語言「繁體中文」、套件識別碼選 `md.taiwan.app`、SKU `taiwanmd-ios`、完整存取 → 建立 |
| 2   | TestFlight 上去之後 | 手機試用                                                              | TestFlight 按安裝，有怪的地方截圖丟回來                                                                                                                                               |
| 3   | 送審前停點          | 確認版本、描述、截圖、隱私設定、分級、銷售地區、DSA、隱私權政策頁文字 | 我整包貼給他，他說「送」才送                                                                                                                                                          |

研究 §九 第 3、4、9 條（大陸 storefront、分級、隱私頁）碰到 MANIFESTO §自主權邊界的政治立場與對外溝通，都收在 #3 一起看。

---

## 十三、後續版本

| 版本                   | 內容                                                                                                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v1.1（上架後約一個月） | MapKit 地圖（`map-markers.json` 進內容包並補齊各語言）、歷史上的今天（月日抽取＋查核流程，含 Widget）、Spotlight（`IndexedEntity`）與 App Intents、iCloud 同步收藏、介面語言擴到 13 語、內容包產線改 GitHub Actions 每日排程 |
| v1.2                   | 裝置端朗讀（`AVSpeechSynthesizer`）、含圖離線包、差異更新（`hash` 欄位）、iPad 版面                                                                                                                                          |
| v2                     | 資料台灣、選舉、預算原生頁，研究者模式（引用匯出、腳註清單），`apps/ios/Config/Site.json` 集中網域、語言、品牌，讓 fork 改設定就能出自己的 App                                                                               |

---

## 十四、風險與退路

| 風險                                     | 機率 | 退路                                                                               |
| ---------------------------------------- | ---- | ---------------------------------------------------------------------------------- |
| 4.2 被判網頁包殼                         | 中低 | 審查備註寫明離線與原生功能，被退就補地圖或歷史上的今天再送                         |
| Apple LZMA 解不了 Python 產的 xz         | 低   | 第 1 步就在模擬器驗，不行改 zlib（raw deflate）                                    |
| GitHub Release 下載在部分網路慢          | 中   | 內建三包讓 App 不靠下載也能用，v1.1 評估 Cloudflare R2 鏡像（要哲宇開資源）        |
| 全文搜尋太慢                             | 低   | 升級 FTS5，介面不變                                                                |
| `article-render.ts` 改版後 jiti 載不起來 | 低   | 產包失敗會擋住上傳，App 繼續用舊包，修產包腳本                                     |
| Universal Links 的 AASA Content-Type     | 中低 | 研究判斷大概率沒問題，不行改 Cloudflare Worker 回 JSON（要哲宇的 Cloudflare 權限） |
| 送審被要求補帳號刪除等                   | 低   | 沒有帳號，不適用                                                                   |

---

_v1.0 | 2026-11-02 ios-app session — 接手 twmd-desk 研究報告，定架構、資料契約、MVP 十三步、上架清單，修改研究三條預設（指標檔放 Release、正規化比對取代 FTS5、零第三方依賴）。_
