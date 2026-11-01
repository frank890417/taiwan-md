# Data Hub 研究 R3：國際一流「國家／主題資料策展」案例與設計模式

> 存取日期：2026-10-23　研究者：Taiwan.md 研究分身（R3）
> 範圍：OWID、USAFacts、Gapminder、The Pudding、Visual Capitalist、Statista、各國統計機構公眾版、聚合型平台、新聞圖表、工具層。
> 信心標記：✅ 本次實際 WebFetch 到頁面並直接讀到該內容；🔍 來自 WebSearch 摘要或二手來源，或只讀到部分；❓ 沒能查證（站台擋存取、JS 渲染抓不到、或我讀不到該功能）。
> 方法限制（重要）：WebFetch 回傳的是「轉成文字後由小模型回答」的內容，所以 **互動 UI（分頁按鈕、滑桿、嵌入面板）常常讀不到**。凡 UI 層細節讀不到的，一律標 ❓，不拿記憶補。以下「被擋或失敗」的站：ft.com、economist.com、reuters.com（工具直接拒絕）；visual.ons.gov.uk（DNS 失敗）；statcan.gc.ca（503）；Visual Capitalist about（403）；OECD（403）；SCMP multimedia（抓到亂碼）；Gapminder Tools（空頁）；IMF DataMapper、Data Commons 首頁（只拿到標題或模板佔位）。

---

## 0. 一頁結論（先看這個）

1. **OWID 的核心不是圖表，是「一個穩定、可引用的物件模型」**：每張圖有永久網址（`/grapher/{slug}`），同一網址加副檔名就變 CSV／metadata JSON／ZIP；每頁都有「如何引用」、資料來源（含取得日期）、CC BY 授權。這讓維基、新聞、論文、LLM 都能「放心引用」。（✅ 見 §1）
2. **OWID 已經有 Taiwan（entity=Taiwan, code=TWN）**，而且有專屬的「台灣健康國家檔案」（問題式 H2，例如「What is Taiwan's life expectancy at birth?」）。對 Taiwan.md 同時是機會（可對齊它的 slug 與命名）也是缺口（它只覆蓋 OWID 有的指標，沒有台灣在地的細節）。（✅）
3. **最值得抄的三個機制**：(a) 問題式標題＋一句答案＋圖（OWID 國家檔案、CBS「35 個問題」）；(b) 指標卡「數值＋期間＋更新日＋看資料表」（ABS、SingStat、e-Stat）；(c) 信任層「資料取得日＋下次更新日」（OWID Data sources、Eurostat Statistics Explained 的 "Data extracted / Planned article update"）。
4. **主權命名是 Taiwan.md 獨有的設計約束**：世界銀行 WDI 不單列台灣；IMF 歷史上標「Taiwan Province of China」；Statista 頁面 Region 欄寫「Taiwan, Province of China」。OWID 與 Data Commons 則有獨立的 Taiwan／TWN 頁。Taiwan.md 的資料中樞要把「用台灣自己的官方來源、用 Taiwan 這個名字」做成明確賣點，而不是附帶。（✅／🔍，見 §3）
5. **反例教訓**：Statista 把下載擋在 Starter 年約 US$2,388（✅ 頁面價格為搜尋摘要 🔍）；FiveThirtyEight 2025-03-05 被母公司關閉，公共資料庫跟著停更（🔍 多來源）。資料中樞的最大風險是「單一機構養不起」與「資料被鎖」，不是設計不夠美。

---

## 1. Our World in Data（深挖）

### 1.1 規模與定位（✅ 除非另標）

- 首頁寫 **13,838 張圖、126 個主題頁、26 個 Data Explorer、507 篇文章**；十大主題分類，部分主題跨類別重複。https://ourworldindata.org/ ✅
- 非營利、「All free: open access and openly licensed」。同上 ✅
- 營運：Global Change Data Lab（英國註冊慈善機構）擁有並維護；內容團隊在牛津大學，隸屬 Oxford Martin Programme on Global Development；創辦人 Max Roser。https://ourworldindata.org/about ✅；成立 2011 起、2013 年 5 月上線、2021 年 89M 獨立訪客、2023 年超過 4,000 名捐款人：https://en.wikipedia.org/wiki/Our_World_in_Data ✅（二手百科，數字以其為準）
- 自述流量與引用：「over 4 million page views every month」、「在 CO₂ emissions、population growth、global poverty 等查詢排在 Google 前幾名」、「2025 學術引用約每天 12 次」。https://ourworldindata.org/jobs ✅（均為自述，非第三方稽核）。注意：一則搜尋摘要寫「5 million visitors a month」，與頁面本身的「4 million page views」不一致，**以頁面原文為準**。
- 觀眾調查（樣本偏向電子報讀者，作者自己註明）：只有約 **1.6% 的 session 含 CSV 下載或 GitHub 造訪**；約 16% 的使用者與視覺化互動；約 1% 使用圖內分享分頁或 PNG／SVG 下載；多數流量來自 Google；桌機使用者停留是手機的約三倍。https://ourworldindata.org/audience-survey-results ✅

### 1.2 頁面物件模型（Taiwan.md 最該抄的部分）

| 物件          | 網址形式                                        | 內容                                                                                                                                                                                                                                                                   | 證據                                                                                                                               |
| ------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| 主題頁        | `/life-expectancy`                              | 開頭數字＋Related Topics → 「Key Insights」（5 個論點，每個＝一段敘事＋一張圖＋「What you should know about this data」）→ Research & Writing → Key Charts（含 "Chart 1 of 43"）→ Endnotes（15 則）→ **Cite this work（純文字＋BibTeX）** → **Reuse this work freely** | ✅ https://ourworldindata.org/life-expectancy                                                                                      |
| 單張圖        | `/grapher/life-expectancy`                      | 有「Download」區（Quick download：ZIP＝CSV＋metadata JSON＋README；可選「下載全部」或「只下載畫面上顯示的」）、「Data API」區（給 CSV 與 metadata 的 URL）、「Data sources」（每個來源附 retrieved 日期）、「How to cite this page／this data」、頁面 "Last updated"   | ✅ https://ourworldindata.org/grapher/life-expectancy?tab=table                                                                    |
| 圖表 API      | `/grapher/{slug}.csv`、`.metadata.json`、`.zip` | `csvType=full                                                                                                                                                                                                                                                          | filtered`、`useColumnShortNames`、`country=USA`或`~` 多選；授權 CC BY 4.0；**部分資料因第三方限制會回 403（non-redistributable）** | ✅ https://docs.owid.io/projects/etl/api/chart-api/ |
| 國家檔案      | `/profile/health/taiwan`                        | H1＝主題（Child health、Life expectancy、Causes of death、Risk factors…），**H2 全是問句**，一兩句具體數字後接圖；有 "Cite this page" 與 BibTeX；寫明資料落後現在兩三年                                                                                                | ✅ https://ourworldindata.org/profile/health/taiwan 與 https://ourworldindata.org/profile/health/japan                             |
| Data Explorer | `/explorers`                                    | 26 個，如 Population & Demography、Poverty、Global Health                                                                                                                                                                                                              | ✅ https://ourworldindata.org/explorers                                                                                            |
| 嵌入          | 圖底部 Share → Embed                            | 兩種 iframe：「Chart with data updates」（跟資料更新）與「Archived chart without data updates」（凍結）；iframe 網址會跟著使用者的選擇（年份範圍、國家、地圖視圖）變；**禁止加上強迫同意 cookie 之類會讓部分人看不到的修改**                                           | ✅ https://ourworldindata.org/faqs                                                                                                 |
| 授權          | CC BY                                           | 圖與 OWID 自製資料可免申請重用，需標示；第三方資料依原授權；Grapher 程式碼公開但再利用需書面許可                                                                                                                                                                       | ✅ 同上                                                                                                                            |

### 1.3 圖表分頁（chart／map／table／sources／download）

- 我能證實的：URL 有 `tab=table` 參數、頁面含 Download 與 Data API 區塊、Data sources 區塊。❗ 我**無法**從抓到的文字確認「Chart／Map／Table／Sources」按鈕的實際名稱與順序，也看不到時間滑桿。標 ❓。要確認需實機打開。
- 另外：頁面檢視到的 citation 有時間邏輯疑點（retrieval 日期晚於 archive 日期），顯示即使是標竿，引用字串也有 bug。✅

### 1.4 OWID 怎麼標示與取得台灣資料

- `https://ourworldindata.org/grapher/life-expectancy.csv?v=1&csvType=filtered&useColumnShortNames=true&country=~TWN` 回傳 `entity=Taiwan, code=TWN`，1950–2023 每年一列（1950: 56.5867）。✅ 直接可用 `country=~TWN` 抓單國。
- 有 `https://ourworldindata.org/country/taiwan` 與 `https://ourworldindata.org/profile/health/taiwan`；前者我抓到的是搜尋頁殼（無內容），**內容 ❓**，後者 ✅ 內容完整：2023 年預期壽命 80.6（女 83.6、男 77.6）來自搜尋摘要 🔍，頁面本身示範了 "What is Taiwan's life expectancy at birth?"。
- 歸納：OWID 對台灣是「獨立實體 Taiwan／TWN」，國家檔案模板直接套用，與日本檔案同構（日本頁含「What is Japan's life expectancy at birth?」等 20+ 問句）。✅ 這也意味 **國家檔案是模板化產出**（頁面未明說，但結構一致），Taiwan.md 可以用同樣方式批次產生「縣市檔案」。

### 1.5 為什麼 OWID 變成首選（證據導向）

1. **Google 排名**：自述在多個核心查詢排前幾名（✅ 自述）。內容是「問題＋可信資料＋永久網址」，剛好吃到長尾搜尋。
2. **被引用的設計**：每頁預先寫好引用字串＋BibTeX，降低引用成本；每年學術引用約 4,000+ 次（12/日×365，估算，🔍）。
3. **網址一致**：主題用英文單詞 slug，圖用 `/grapher/{indicator}`，副檔名切換格式。
4. **廣度＋深度**：126 主題 × 13,838 圖（廣度），但每個主題頁有 Key Insights 敘事、Endnotes（深度）。
5. **更新節奏透明**：首頁列出「資料更新」並對應 WHO、OECD、World Bank 等來源釋出（✅ 首頁）；來源取得日期在每張圖上。
6. **社群／電子報**：OWID Brief（每月兩次）＋Data Insights email（每幾天）；觀眾調查顯示約 80% 受訪者說會分享（✅，樣本偏頭）。
7. **注意**：OWID 自己的調查顯示「下載資料」不是大眾行為（1.6%），**多數價值來自搜尋進來的閱讀者與少量高影響力引用者**。Taiwan.md 不要為了功能完整而過度投資在 API，敘事＋可引用才是主力。

---

## 2. 其他案例逐一筆記

### 2.1 USAFacts（✅ https://www.usafacts.org/）

- 首頁：Hero「Free unbiased public data for everyone」＋主題捷徑（housing、jobs…）；Featured；影片（"Just the facts"、"Crash course"）；週報電子報；**Fast facts：每卡＝一個數字＋時間（如 FY 2025）＋「See the data」**；文章依主題篩選；可信度區：90,000+ 政府單位、70+ 來源、3,000+ 郡。
- 問題式：Fast facts 連到以問句命名的頁（inflation、jobs、crime、tariffs）。
- 弱點：抓到的內容未揭露資金來源（頁面本身沒寫，❓是否有別頁）；單頁問答的細部結構（我試圖開 answers 頁 404）❓。

### 2.2 Gapminder

- https://www.gapminder.org/ ✅：獨立教育非營利（瑞典基金會）；Worldview Upgrader（誤解測驗，17 個「You are probably wrong about」主題）、Animating Data、Dollar Street；工具與教材「永遠免費」，未指名授權。
- 資料頁 https://www.gapminder.org/data/ ✅：三個 GitHub 倉庫（Systema Globalis、Fast Track、WDI）＋單一指標 CSV／XLSX 下載；授權文字「Data can be reused freely but please attribute the original data source」，範例標示「FREE DATA FROM WORLD BANK VIA GAPMINDER.ORG, CC-BY LICENSE」；有每指標文件頁與方法概述。
- Dollar Street https://www.gapminder.org/dollar-street ✅：「468 families in 67 countries, 46070 photos and 8586 videos」，用「依月收入從 Poor 到 Rich」的軸組織；CC BY 4.0 標誌。**是否收錄台灣：❓（頁面未顯示）**。
- Gapminder Tools（氣泡圖＋時間滑桿）：頁面空白，❓ 未查證。

### 2.3 The Pudding（✅ https://pudding.cool/about/）

- 「visual essays」解釋文化辯論的議題；2017 起；無廣告、無付費牆；主要收入來自姊妹工作室 Polygraph（品牌代製）＋偶爾贊助＋Patreon（US$2/月）；團隊每人自選題、全流程自己做；獲獎含 Peabody（2017）。
- 模式價值：**「資料＋敘事＋當代文化」是社群分享動力**；缺點是不是「查資料」的場所（沒有永久資料物件）。GitHub 開源資料：頁面未提，❓。

### 2.4 Visual Capitalist（🔍 官網被擋）

- 自述（二手搜尋摘要）：每月 800 萬訪問（press center）、職缺頁寫 1,000 萬＋，Semrush 模型估約 1,596 萬；Voronoi app 2023 底上線、免費、徵稿每則 US$500。https://www.visualcapitalist.com/press-center 🔍
- 模式價值：**單圖長圖＝社群與贊助的貨幣**；贊助商買「earned media」。不是資料庫，沒有可引用的資料物件（我沒能驗證 VC 圖是否附資料下載，❓）。

### 2.5 Statista（SEO 與付費牆）

- 規模（✅ https://www.statista.com/aboutus/）：1M+ statistics、7.5M+ 註冊使用者、50,000+ 來源、200+ 國家地區；商業模式＝data-as-a-service（訂閱＋Statista Connect API＋Statista+ 顧問）。
- 單頁解剖（✅ https://www.statista.com/statistics/995107/ 與 https://www.statista.com/statistics/319793/taiwan-population/）：標題是**完整描述句**（"Total population of Taiwan from 1990 to 2025 with forecasts until 2030 (in millions)"）；有 "Last update"、"Region"、"Survey time period"、"Source" 四欄 metadata；**一段人類可讀的摘要文字（含 2025 約 23.3M、65+ 占 19.2%）**；頁面內有 "Ask AI"、"Log in"、"Contact sales"、"Plans & access"、REPORT_DATA_PROBLEM 與 COPYRIGHT_INFRINGEMENT 連結。**注意：台灣頁面的 Region 寫 "Taiwan, Province of China"。**
- SEO 為什麼有效：每個統計＝一個獨立 URL＋題目式標題＝直接命中「X statistics」查詢；摘要文字讓 Google 能放進摘要。這套是我們可以合法學的部分（用 Taiwan 的官方來源）。
- 付費牆（🔍 搜尋摘要，價格會變）：Basic 免費（含免費統計、Research AI，**不含 xls／png／pdf／ppt 下載與 premium 統計**）；Starter 約 US$199／月、年約（約 US$2,388／年）；Personal US$649；Professional 洽業務。https://statista.com/accounts/individuals 🔍
- 反例訊號：圖與下載被擋 → 大量引用變成「截圖別人付費後的圖」或轉去用 OWID／官方免費來源；OWID 的 CC BY 正好是對位策略。

### 2.6 國家統計機構的公眾版

**荷蘭 CBS「The Netherlands in Numbers」（重點）**

- 2024 版：**35 個問題＝35 張資訊圖**，每個問題有獨立頁，資訊圖旁有 QR code 連到網頁版（更多文字、圖、表）；有 PDF 下載、分享鈕、Colophon、符號說明、About CBS；底層資料指向 StatLine。https://longreads.cbs.nl/the-netherlands-in-numbers-2024 ✅（問題清單範例：第 8 題 "How many girls are suspected of crimes?"）
- 2025 版（第六版，2025-12-12 發布）：主題含貧窮、住宅、再生能源、插電車、住宅總數；一節「在家說的語言」（Limburgish 在 Limburg 48%、Frisian 在 Friesland 42%）；導向 SDG dashboard 取得更細資料；StatLine 顯示新增住宅超過 8.2 萬戶。https://www.cbs.nl/en-gb/corporate/2025/48/the-netherlands-in-numbers-2025-key-issues-facing-our-society-today ✅
- 我沒能確認：問題是否按主題分組（頁面說未命名主題）、單題頁的細部版型（❓）。
- 為什麼有效：**年度、固定數量、問題式、印刷與網頁雙形態、QR 橋接**；有「年度節奏」可被媒體報導（搜尋可見 iamexpat 等報導 🔍）。

**英國 ONS**

- visual.ons.gov.uk：DNS 失敗，❓。
- Census maps（https://www.ons.gov.uk/releases/censusmaps ✅）：Census 2021 互動地圖，下到 local authority 與 neighbourhood 層級，隨資料釋出持續擴充。細部功能（選變數、比較、下載）頁面未寫 ❓。
- 「How well do you know your area?」測驗（https://www.ons.gov.uk/releases/census2021quizhowwelldoyouknowyourarea ✅）：2022-12-02 發布，測「你對所在地方人口的認知」；後續於 2022-12-16 與 2023-04-03 加題（🔍 搜尋摘要）；另有 2023-01-17 的「自訂地區檔案」工具（🔍）。
- 模式價值：**把「猜猜看」放在資料前面**，先讓人有立場，再給答案。

**加拿大 StatCan**：StatsCAN Plus 首頁（✅ https://www.statcan.gc.ca/o1/en）是新聞式 hub：每日文章、主題標籤、Eh Sayers podcast、Maps、"My StatCan" 主題通知、RSS。（頁面沒有 "Canada at a glance" 或資訊圖，❓。）另一網址 503。

**澳洲 ABS**（✅ https://www.abs.gov.au/）：首頁五個關鍵指標卡（人口 27,921,150 @ 2026-03-31、CPI 4.0%、GDP 季增 0.4%、平均週薪 $2,083.70、失業率 4.7%），每卡連到 release；選單有「Latest and future releases」、「Data by region」、「Data explorer」、「Microdata and TableBuilder」。首頁沒有 API 字樣（❓）。

**日本**

- e-Stat 英文版（✅ https://www.e-stat.go.jp/en）：依領域搜尋、**Statistics Dashboard（Graph、Time Series Tables）\*\*、GIS 地圖、Region「Compare Regions」、API、Release Schedule、Ranking。
- Statistics Dashboard（✅ https://dashboard.e-stat.go.jp/en/）：自述「provides the main statistical data … in graphs」；首頁指標卡含**最新值、參考期間、更新日**；16 個領域；區域雷達圖與排名；氣泡圖；有 API 與範例程式碼；嵌入未提及 ❓。
- 《日本の統計》：抓到的是搬家公告頁，無法描述章節 ❓。
- nippon.com Japan Data（https://www.nippon.com/en/japan-data/h02500/ ✅ 單篇）：標題「Japan's Minimum Wages Rise Again」＋一句摘要＋兩張圖＋約 450 字＋「Data Sources」連結到厚生勞動省；**八種語言（含繁體中文）**。索引頁沒抓到 ❓。

**韓國 KOSIS**（✅ https://kosis.kr/eng/）：選單＝Statistical Database／Visualization／Bulletin Board／About；28 個主題分類；「Popular Statistics」輪播最新值與參照期間；視覺化六件：Homo Statisticus、Business Cycle Clock、Korea in the World、Time Travel with Statistics、Economic Dashboard、Closer Look at National Life；Open API 首頁無說明（只有 Q&A 貼文）。歷史節點（Korea in the World 2015、e-Regional Indicators 2018、Dynamic Chart Video 2022）來自 🔍 搜尋。主管機關已改為 Ministry of Data and Statistics（頁尾 ✅）。

**新加坡 SingStat**（✅ https://www.singstat.gov.sg/）：Find Data 依 Economy & Prices、Industry、Trade & Investment、Population、Households、Society 分；**指標卡「Adv GDP in 3Q 2026 (YoY) 5.4%」、「Total Population as at Jun 2026 6.21 m」，每卡有「Find out more」與「View data table」**；Table Builder（約 2,800 個可客製資料集、70 個公部門機構）；Developer API 有 OpenAPI 規格；**「SingStat Model Context Protocol (MCP)」讓 AI 工具查官方資料**；「Let Us Explain」短解釋 PDF（人口估計、CPI、shrinkflation）。Singapore in Figures：舊版是年度 PDF，2020-07-30 轉為互動線上出版、六個主題（🔍 搜尋摘要，當前網址 404，❓）。

**Eurostat**

- Statistics Explained（✅ https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Main_Page）：Latest articles、**Top 10 most visited**、九大主題、Glossary、英文＋25 種機器翻譯。
- 單篇解剖（✅ …title=Population_and_population_change_statistics）：Highlights 數字框 → 目錄 → 圖（Figure 1–3）與表（Table 1–3）→ 「Source data for tables and graphs」（Excel）→ Data sources（定義與方法註記）→ Context → Explore further；表下有 "Source: Eurostat (demo_gind)" 連到資料庫；**頁首「Data extracted: 6 July 2026」與「Planned article update: July 2027」**；永久連結帶 oldid。未見明確授權聲明。
- Key figures on Europe：第 8 版 2025，三章（人與社會、經濟與商業、環境與自然資源），PDF 為 CC BY 4.0（🔍 https://www.efta.int/…KS-01-25-003-EN-N.pdf）；互動版網址導向登入頁（可能是爬蟲誤判，❓）。

### 2.7 聚合型

- **Google Data Commons**（✅ 文件 https://docs.datacommons.org/；首頁空）：知識圖譜；Timeline／Scatter／Map 工具、Statistical Variable Explorer、REST／Python／Pandas／SQL（BigQuery）、**MCP server 讓 LLM agent 查詢**、Google Sheets 外掛、可嵌入 web components、CSV 下載、"Build your own Data Commons"。頁面未說明資料授權（連到 Google 條款）。**有 Taiwan 頁**（https://datacommons.org/place/country/TWN 標題為「Taiwan - Data Commons」），內容與來源標示未能讀到 ❓。
- **World Bank Data360**（✅ https://data.worldbank.org/）：Open Data 正併入 Data360；五大主題 People／Prosperity／Planet／Infrastructure／Digital；DataBank、Microdata Library、Data Catalog；語言含中文。**台灣**：官方說明「Taiwan, China is not listed as a separate country for World Development Indicators」，引導去看台灣官方網站。https://datahelpdesk.worldbank.org/knowledgebase/articles/114933-where-are-your-data-on-taiwan ✅
- **IMF DataMapper**：頁面讀到模板佔位，❓。搜尋顯示 WEO 與 DataMapper 區域清單長期使用「Taiwan Province of China」，並於 2020 年引發台灣外交部抗議（🔍 https://www.imf.org/external/datamapper/region.htm 與 Taiwan News）；現況未驗證。
- **OECD Data Explorer**：403，❓。

### 2.8 新聞圖表標竿（多數無法驗證，如實標示）

- FT Visual Vocabulary：ft.com 被工具擋；GitHub 倉庫 Financial-Times/chart-doctor 存在，有 `visual-vocabulary` 資料夾，程式 MIT，但 FT 內容版權保留。✅ https://github.com/Financial-Times/chart-doctor。頁面分類（deviation、ranking…）❓ 未驗證。
- The Economist Graphic detail：站被擋；**GitHub 倉庫 TheEconomist/graphic-detail-data 公開每期部分資料（資料夾以日期＋主題命名，README 表格連回文章），資料 CC BY 4.0、程式 MIT，並註明「不是每期都能分享」**。✅ https://github.com/TheEconomist/graphic-detail-data。（倉庫表中只列 14 筆，2018–2020，看起來久未更新。）
- NYT Upshot：只確認 2014 年「rent vs buy」計算機受好評、用 D3、且被付費牆擋（🔍 awards.journalists.org、Product Hunt）。其他代表作 ❓ 未驗證。
- Reuters Graphics、SCMP Graphics：站被擋或亂碼，❓。**本報告不對這兩者作任何功能斷言。**
- FiveThirtyEight：**已關閉**（🔍 Nieman Lab：https://www.niemanlab.org/2025/03/fivethirtyeight-is-shutting-down-as-part-of-broader-cuts-at-abc-and-disney/ ；Disney 於 2025-03-05 關閉，約 15 人；前編輯 G. Elliott Morris 說所有計畫中的民調資料更新無限期取消；Wikipedia 稱 2026-05-15 起舊文章被轉址到政治版而無法存取，僅單一來源 🔍）。

### 2.9 工具與分享層

- **Datawrapper**（✅ https://www.datawrapper.de/charts）：23 種圖型、responsive、accessible；River 與嵌入細節未抓到（兩個連結 404／被轉址 ❓）。
- **Flourish**（✅ https://flourish.studio/）：無程式模板、可嵌入網站／簡報／社群、SDK、API、PowerPoint 整合；公開預設、匯出格式未見 ❓。
- **Observable**：文件頁被 429 擋，❓。
- **Google Dataset Search／結構化資料**（✅ https://developers.google.com/search/docs/appearance/structured-data/dataset）：Dataset 必要屬性只有 `name`、`description`（50–5,000 字）；建議 `license`（版本化 URL）、`creator`、`distribution`（DataDownload＋contentUrl＋encodingFormat）、`temporalCoverage`（ISO 8601）、`spatialCoverage`、`variableMeasured`、`sameAs`。OWID 頁面 JSON-LD 內含 CC BY 4.0 授權（✅，搜尋抓取時可見），其餘屬性未逐項驗證 ❓。

### 2.10 台灣本地對照（為 §5 鋪路）

- 政府資料開放平臺 https://data.gov.tw/（✅）：數位發展部營運；以「生命事件」分 18 類（生育保健、求學及進修、求職及就業、婚姻、就醫、退休…）；進階搜尋（名稱、描述、關鍵字、格式、徽章、服務分類，AND／OR）；「高應用價值主題專區」「每日異動資料集」「熱門資料集」「預計下架資料集」「歷史資料專區」「資料故事館」；API 服務資料集、**M2M 專區**；Beta 小幫手查詢服務，介接 TAIDE；有英文版。資料集總數頁面未顯示 ❓。授權條款只見連結 ❓。
- 主計總處 stat.gov.tw：憑證驗證失敗，❓。
- 啟示：**台灣官方已經有「目錄」與「API」層，缺的是「問題式、敘事式、可引用的公眾層」**，正是 OWID／CBS／ABS 模式補上的那層。

---

## 3. 設計模式（共 24 條）

> 格式：名稱／一句話／案例（網址＋信心）／為什麼有效／Taiwan.md 注意事項。

**P1 問題式入口**

- 把導覽與標題改寫成人會問的句子。
- 案例：OWID 國家檔案 H2（✅ https://ourworldindata.org/profile/health/taiwan）；CBS 35 問（✅ https://longreads.cbs.nl/the-netherlands-in-numbers-2024）；USAFacts fast facts 連到問句頁（✅ https://www.usafacts.org/）。
- 有效：對應搜尋行為與 LLM 提問；標題本身即答案摘要。
- 注意：問題要用台灣人的說法（參 TERMINOLOGY）；每題第一句必須是答案句，不是目錄。

**P2 國家／地區檔案模板**

- 一個固定模板、換 entity 就產一頁。
- 案例：OWID profile Taiwan／Japan 結構一致（✅ 如上）。
- 有效：規模化＋可預測，使用者看過一頁就會看其他頁。
- 注意：Taiwan.md 可改成「縣市檔案」（22 縣市）；缺值時要明寫「資料缺」，OWID 自己也有 Maternal health 空節的情況（✅ Taiwan 檔案）。

**P3 指標卡構造（值＋期間＋更新日＋下一步）**

- 一張卡＝數值、單位、參考期間、更新日、趨勢、「看資料表」、來源。
- 案例：ABS 首頁五卡（✅ https://www.abs.gov.au/）；SingStat「Adv GDP in 3Q 2026 (YoY)」＋「View data table」（✅ https://www.singstat.gov.sg/）；e-Stat Dashboard 最新值＋期間＋更新日（✅ https://dashboard.e-stat.go.jp/en/）；KOSIS Popular Statistics（✅ https://kosis.kr/eng/）。
- 有效：一眼可讀、可截圖、可被引用；期間欄防止「過期數字被當現況」。
- 注意：趨勢（上升／下降）與「同比／環比」用詞要定義；單位與基期寫在卡內，不要藏在 tooltip。

**P4 信任層（方法、更新日、原始資料連結）**

- 每個數字旁都可追溯到來源與取得日。
- 案例：OWID Data sources 列來源與 retrieved 日期（✅ https://ourworldindata.org/grapher/life-expectancy?tab=table）；Eurostat 圖表下 "Source: Eurostat (demo_gind)"、頁首 Data extracted／Planned article update（✅）；Statista 四欄 metadata（✅）。
- 有效：記者與研究者願意引用；搜尋引擎與 LLM 能把來源讀成 grounding。
- 注意：台灣官方來源常是 Excel／PDF／網頁表，取得日與原始連結要比 OWID 更勤；同時記「Taiwan.md 做了什麼處理」。

**P5 每張圖一個永久網址**

- 圖是頭等公民，有 slug、不隨改版改變。
- 案例：OWID `/grapher/{slug}`（✅）；Eurostat oldid（✅）。
- 有效：外部連結累積權重；引用不斷鏈。
- 注意：slug 設計要穩（英文、描述性、不含年份）；改名要 301，並保留舊版 archive（OWID 的 archived embed 概念）。

**P6 可嵌入（含凍結版）**

- 提供「跟著更新」與「凍結」兩種嵌入。
- 案例：OWID FAQ（✅ https://ourworldindata.org/faqs）；Data Commons web components（✅ https://docs.datacommons.org/）；Datawrapper／Flourish 以嵌入為核心（✅ 產品頁，嵌入細節 ❓）。
- 有效：每個嵌入＝一條帶出處的反向連結。
- 注意：iframe 需響應式、無強制 cookie；要有可見的來源／連回頁尾；嵌入不得依賴 JS 大包。

**P7 表格當後備（與圖並存）**

- 每張圖旁邊一定能看到數字表。
- 案例：OWID `tab=table`（URL 線索 ✅，按鈕 ❓）；SingStat「View data table」（✅）；Eurostat 圖＋表並列（✅）。
- 有效：無障礙、SEO（文字可索引）、LLM 可讀、手機免互動。
- 注意：表格預設輸出為語意 `<table>` 而非圖片；大表分頁但保留完整 CSV。

**P8 同網址的 CSV／JSON／API 後綴**

- 圖網址加副檔名即資料。
- 案例：OWID `.csv`、`.metadata.json`、`.zip`（✅ https://docs.owid.io/projects/etl/api/chart-api/）；Gapminder 單指標 CSV／XLSX＋GitHub（✅ https://www.gapminder.org/data/）；e-Stat API（✅）；SingStat Table Builder API＋OpenAPI（✅）；Data Commons REST／Python／Pandas（✅）。
- 有效：開發者與分析者零學習成本。
- 注意：metadata JSON 要包含 license、source、updated；對第三方不可再散布的資料要明示 403 邏輯（OWID 實際有）。

**P9 授權清楚（CC BY 與例外）**

- 一句話：我們自己的處理結果 CC BY，第三方依原授權。
- 案例：OWID（✅）；Economist 資料 CC BY 4.0（✅ https://github.com/TheEconomist/graphic-detail-data）；Eurostat Key figures PDF CC BY 4.0（🔍）；Gapminder「attribute original source」（✅）。
- 有效：媒體與維基敢用。
- 注意：Taiwan 政府資料開放授權條款與 CC BY 4.0 的相容性需法務層面再確認（本研究未驗證 data.gov.tw 授權細節 ❓）。

**P10 結構化資料（schema.org/Dataset）與 Dataset Search**

- 每個指標頁輸出 JSON-LD Dataset。
- 案例：Google 文件（✅ https://developers.google.com/search/docs/appearance/structured-data/dataset）；OWID 頁含 JSON-LD 與 CC BY 4.0 連結（✅）。
- 有效：進 Google Dataset Search；`distribution` 讓機器找到 CSV。
- 注意：`license` 要填版本化 URL；`spatialCoverage` 用 Taiwan 的 Wikidata／GeoShape；不要為了結構化資料而捏造 creator。

**P11 LLM 讀得懂：語意 HTML＋機器介面**

- 結論句、定義、表格都用語意元素；另提供 MCP／API。
- 案例：SingStat MCP（✅ https://www.singstat.gov.sg/）；Data Commons MCP server（✅ https://docs.datacommons.org/）；data.gov.tw 小幫手與 TAIDE 介接（✅ https://data.gov.tw/）；Statista 把摘要寫成可讀的段落（✅）。OWID 的 `llms.txt` 不存在（404 ✅），robots.txt 只有 sitemap（✅），代表 OWID 的 LLM 友善來自內容結構而非特殊檔案。
- 有效：LLM 取數字時不用解析圖片。
- 注意：Taiwan.md 已有 taiwanmd MCP 工具族，資料中樞應把「指標」加入同一介面；答案句要含單位與年份，避免模型把舊年份當現況。

**P12 敘事與資料互相連結**

- 文章裡的每個數字連到指標頁；指標頁列出用到它的文章。
- 案例：OWID 主題頁 Key Insights＝敘事段＋圖＋「What you should know about this data」＋深度文章卡（✅ https://ourworldindata.org/life-expectancy）；Statistics Explained 的 Explore further（✅）。
- 有效：站內循環，提升停留與可信度。
- 注意：Taiwan.md 的 `knowledge/*.md` 目前是敘事主體；需要「指標 ID」作為文章 frontmatter 或內嵌語法的一等欄位（這點屬實作，本研究只提示）。

**P13 同儕國家比較**

- 預設用鄰近或相似國家對照。
- 案例：OWID Taiwan 檔案常把台灣與鄰國或區域平均並置（✅ 頁面描述）；e-Stat「Compare Regions」與雷達圖（✅）；KOSIS「Korea in the World」（✅）。
- 有效：單一數字沒有意義，比較才有。
- 注意：**同儕選擇本身是編輯立場**。預設組合（日本、韓國、新加坡、OECD 平均）要在頁面明示，並能切換；台灣常缺席於 WB／IMF 的國家清單，需用自己的資料補。

**P14 地區地圖／縣市下鑽**

- 案例：ONS Census maps（✅ https://www.ons.gov.uk/releases/censusmaps）；e-Stat GIS（✅）；ABS Data by region（✅）。
- 有效：人會先找「我家那一區」。
- 注意：台灣行政區邊界與代碼（鄉鎮市區、合併升格）有歷史變動，需版本化。

**P15 時間滑桿與動態**

- 案例：KOSIS Time Travel with Statistics、Dynamic Chart Video（✅／🔍）；e-Stat 氣泡圖（✅）；Gapminder Tools（❓ 未能驗證）。
- 有效：增加探索與傳播性。
- 注意：這是「展示層」，不能取代靜態圖與表；OWID 調查顯示多數使用者是被動閱讀。

**P16 不確定性與預測標示**

- 標題明寫「with forecasts」；寫明資料落後。
- 案例：Statista 標題「with forecasts until 2030」（✅），但頁面沒有正式免責（✅，這是缺口）；OWID 「latest data is two or three years behind」（✅）。
- 有效：避免被誤用，記者引用更安心。
- 注意：台灣人口推估（國發會）、選舉民調、經濟預測要用視覺區分（虛線＋標註），並寫來源版本。

**P17 名詞與方法頁**

- 案例：Eurostat Glossary、ESMS 方法檔（✅）；SingStat Let Us Explain（✅）；Gapminder 每指標文件（✅）。
- 有效：減少誤用（例如「失業率」「平均所得」）。
- 注意：台灣特有名詞（例如「勞動力參與率」與「廣義失業」、民國紀年）要有專頁，並交叉連到 TERMINOLOGY 的口語詞。

**P18 更新日曆與變更紀錄**

- 案例：e-Stat Release Schedule（✅）；ABS Latest and future releases（✅）；OWID 首頁「資料更新」對應來源釋出（✅）；Eurostat Planned article update（✅）。
- 有效：建立「來這裡看最新」的習慣，也是回訪理由。
- 注意：Taiwan.md 的 routine 飛輪可以自動產出「本週更新了什麼」；變更紀錄要寫數字被修正的原因。

**P19 多語**

- 案例：nippon.com Japan Data 八語（含繁中）（✅ 單篇）；Eurostat 機器翻譯 25 語並標明（✅）；World Bank 五語（✅）。
- 有效：擴大長尾搜尋。
- 注意：Taiwan.md 是 13 語；機器翻譯要標示；**主權敏感用語需 Tier 3 本地模型**（參 CLAUDE.md 主權視角），資料頁的詞彙表也要同步。

**P20 年度數位出版品＋QR 橋接**

- 案例：CBS The Netherlands in Numbers（✅）；SingStat Singapore in Figures 轉互動（🔍）；Eurostat Key figures（🔍）。
- 有效：形成年度新聞點；實體與網頁互導。
- 注意：「數字台灣 2026」可由 routine 年度自動出版，固定題數（例如 35 或 50）是品牌。

**P21 單圖短文（Data Insight）**

- 案例：OWID Data Insights（✅ 首頁）；nippon.com 約 450 字＋兩圖＋Data Sources（✅）；USAFacts fast facts（✅）。
- 有效：低成本、高頻、可分享。
- 注意：每則仍要附資料來源與取得日；不要變成沒有出處的 Visual Capitalist 式長圖（見 §4 反例）。

**P22 互動測驗／猜猜看（先立場後答案）**

- 案例：Gapminder Worldview Upgrader（✅）；ONS Census quiz（✅）；NYT rent vs buy（🔍）。
- 有效：參與度與分享度高，打破誤解。
- 注意：測驗要產生「你猜 X、實際 Y」的可分享結果，且題目不得有政治立場偏向（Taiwan.md 自主權邊界）。

**P23 公開實驗資料／倉庫**

- 案例：Economist graphic-detail-data（CC BY 4.0，✅）；Gapminder GitHub（✅）；FT chart-doctor 範例檔（✅）。
- 有效：同行信任與社群貢獻。
- 注意：Taiwan.md 已 open-source，資料 pipeline 與每個指標的處理腳本應公開，並註明版本。

**P24 命名中立與主權（Taiwan.md 專屬）**

- 不要把台灣塞進「Taiwan Province of China」或併入中國。
- 對照：World Bank 不單列（✅）；IMF 歷史標示 Province（🔍）；Statista Region 欄「Taiwan, Province of China」（✅）；OWID 與 Data Commons 有獨立 Taiwan／TWN（✅ OWID CSV；Data Commons 僅標題 ✅，內容 ❓）。
- 有效：這是台灣人找資料時最在意的信任點之一，也是 Taiwan.md 與全球平台的差異化。
- 注意：實務上要同時維護「對外映射」：ISO（TWN）、Wikidata（Q865）等代碼（代碼本身此處未逐一驗證，請實作時查證 ❓），讓機器能 join OWID／Data Commons 資料。

---

## 4. 為什麼會變成大家的首選（與反例）

### 4.1 共同成因

| 因素                                       | 證據                                                                                  | 信心        |
| ------------------------------------------ | ------------------------------------------------------------------------------------- | ----------- |
| 搜尋策略：每個「物件」一個 URL＋問題式標題 | OWID 自述排名；Statista 標題為完整描述句                                              | ✅ 自述／✅ |
| 引用習慣：預寫引用字串、永久網址、CC BY    | OWID 2025 年約 12 次學術引用／日（自述）；COVID 資料被 WHO、UN、白宮使用（Wikipedia） | ✅          |
| 網址分類一致                               | OWID 主題與圖兩層固定；Statistics Explained 九大主題                                  | ✅          |
| 廣度 vs 深度                               | OWID 126 主題＋Key Insights＋Endnotes；Statista 1M+ 統計，單頁淺                      | ✅          |
| 更新節奏與透明                             | OWID 首頁列更新；e-Stat 發布日曆；Eurostat 下次更新日                                 | ✅          |
| 社群                                       | OWID 電子報兩條、4,000+ 捐款人；Pudding Patreon；VC Voronoi 創作者計畫 US$500／件     | ✅／🔍      |
| 資金模式                                   | OWID：補助＋贊助＋捐款；Pudding：Polygraph 品牌工作；VC：贊助；Statista：訂閱         | ✅／🔍      |

流量級距（皆為自述或模型估計，不可當事實引用）：OWID 約 400 萬 page views／月（自述）；2021 年 89M 獨立訪客（Wikipedia）；VC 800 萬至 1,000 萬訪問／月（自述）、Semrush 估約 1,596 萬（模型）；Statista 7.5M 註冊使用者（自述）。

### 4.2 反例與風險

1. **付費牆擋掉的 Statista**：免費方案不含下載；Starter 約 US$199／月、年約（🔍）。頁面雖有 SEO 摘要，但真正的圖與資料要錢，導致學術與新聞更常轉向 OWID／官方來源（推論，非量測 ❓）。教訓：SEO 可以靠摘要，信任與引用靠開放。
2. **FiveThirtyEight 關閉（2025-03-05）**：母公司裁撤，民調資料更新停止；Nate Silver 稱其公開資料庫曾是 NYT 等媒體 2024 選舉的重要來源（🔍）。教訓：**資料中樞不能依附單一商業母體**；Taiwan.md 應把資料輸出與 pipeline 都開源可 fork（已符合 fork 友好層）。
3. **「做得漂亮但沒人用」**：本次沒有取得可信的流量證據可以點名某個政府儀表板「無人使用」，**不編造**。可以確定的結構性風險：KOSIS 同時維護六個視覺化產品（✅）、e-Stat 有 Dashboard／GIS／Compare 多入口（✅），但首頁指標與搜尋仍是主要入口；OWID 自家調查也顯示只有約 16% 使用者與視覺化互動（✅）。推論：高互動工具不是主要價值來源（❓ 推論）。
4. **品牌頁面但無資料物件的 Visual Capitalist**：圖多、分享強，但沒看到可驗證的資料下載與永久網址（官網被擋，❓）。
5. **標竿也有 bug**：OWID 的 citation 字串日期邏輯矛盾（✅），代表「自動化引用」必須測試。
6. **機構稱呼爭議**：IMF 的「Taiwan Province of China」被台灣外交部抗議（🔍 2020）。

---

## 5. 建議：Taiwan.md「台灣資料策展中樞」資訊架構

### 5.1 設計原則（由上面模式推導）

1. **物件優先**：指標（Indicator）是頭等公民，永久網址＋Dataset JSON-LD＋CSV／JSON（P5, P8, P10）。
2. **問題式敘事層蓋在物件層上**（P1, P12）。
3. **每個數字可追溯**（P4）：來源、取得日、下次更新日、Taiwan.md 處理說明。
4. **台灣官方來源優先、Taiwan 命名**（P24）；對外映射到 OWID／Data Commons 的代碼以便 join。
5. **機器可讀優先於功能齊全**（P11；OWID 自己的調查支持這點）。

### 5.2 頁面層級

```
/data/                              ← 中樞首頁
  ├─ 搜尋（問題式提示：「台灣的生育率是多少？」）
  ├─ 「今日台灣的數字」指標卡條（P3）：人口、GDP、CPI、失業率、出生數…
  ├─ 十大主題入口（對應 Taiwan.md 的歷史／地理／文化／美食／社會／經濟／政治／科技…）
  ├─ 熱門問題、最近更新、本週變更
  └─ 年度「數字台灣」入口（P20）

/data/{topic}/                      ← 主題頁（敘事＋Key Insights＋Key Charts＋Endnotes＋Cite＋Reuse）（P12, P4）
/data/q/{question-slug}/            ← 問題頁：答案句→指標卡→圖→表→比較→方法→下載→相關文章（P1, P7, P13）
/data/indicator/{id}/               ← 指標頁（永久網址）：.csv／.json／.metadata.json／嵌入／引用／Dataset JSON-LD（P5, P6, P8, P10）
/data/place/{縣市}/                 ← 縣市檔案（模板化，P2, P14）；/data/place/taiwan/ 為國家檔案
/data/compare/                      ← 同儕比較（預設組合可切換，P13）
/data/catalog/                      ← 資料集目錄：串 data.gov.tw、主計總處、各部會；每筆標示授權與取得方式
/data/taiwan-in-numbers/{year}/     ← 年度數位出版品（問題數固定，P20）
/data/methods/                      ← 名詞、方法、資料品質、命名政策（P17, P24）
/data/updates/                      ← 更新日曆＋變更紀錄（P18）
/data/api/                          ← CSV／JSON 說明＋MCP／LLM 使用指引（P8, P11）
/data/license/                      ← 授權與引用規範（P9）
```

### 5.3 主要模組

- **指標卡（Indicator Card）**：值／單位／期間／更新日／趨勢／來源／下載／看資料表。
- **圖＋表一體元件**：輸出語意表格與 SVG；`?tab=table` 式網址狀態可直連。
- **引用盒**：純文字＋BibTeX＋永久網址＋取得日（避免 OWID 日期矛盾 bug）。
- **來源卡**：機構、資料集、授權、取得日、處理說明。
- **問題入口與搜尋**：問句為單位，搜尋結果同時顯示答案句。
- **敘事橋**：文章內嵌指標，指標頁反向列出文章。
- **更新儀**：由 routine 觸發，產生「本週更新」與變更紀錄。
- **LLM 介面**：Dataset JSON-LD、語意表格、MCP 工具（沿用既有 taiwanmd MCP 家族）。

### 5.4 分期建議

1. **Phase 1**：20–30 個核心指標＋指標卡＋永久網址＋CSV＋引用盒＋方法頁（人口、經濟、健康、教育、能源）。
2. **Phase 2**：問題頁＋縣市檔案模板＋比較頁＋Dataset JSON-LD。
3. **Phase 3**：年度「數字台灣」、更新日曆、MCP／API、多語（先 en／ja／繁中）。

### 5.5 尚待查證（本報告未能確認，建議後續補）

- OWID Grapher 的實際分頁名稱與嵌入面板（需實機操作）。
- Data Commons 台灣頁的來源標示與命名。
- IMF DataMapper 與 OECD 當前對台灣的標示。
- data.gov.tw 授權與 CC BY 相容性。
- Reuters／SCMP／NYT Upshot／FT／Economist 的代表作與功能。
- ONS visual.ons.gov.uk、StatCan 視覺化產品、Eurostat Key figures 互動版。
- Flourish／Observable 的公開預設與下載慣例。
- 各站真實流量（目前只有自述與模型估計）。

---

## 6. 主要來源網址清單（存取日 2026-10-23）

- https://ourworldindata.org/ 、/about 、/jobs 、/faqs 、/explorers 、/audience-survey-results 、/life-expectancy 、/grapher/life-expectancy?tab=table 、/profile/health/taiwan 、/profile/health/japan ✅
- https://docs.owid.io/projects/etl/api/chart-api/ ✅
- https://en.wikipedia.org/wiki/Our_World_in_Data ✅
- https://www.usafacts.org/ ✅　https://www.gapminder.org/ 、/data/ 、/dollar-street ✅
- https://pudding.cool/about/ ✅　https://www.statista.com/aboutus/ 、/statistics/995107/ 、/statistics/319793/taiwan-population/ ✅
- https://longreads.cbs.nl/the-netherlands-in-numbers-2024 ✅　https://www.cbs.nl/en-gb/corporate/2025/48/the-netherlands-in-numbers-2025-key-issues-facing-our-society-today ✅
- https://www.ons.gov.uk/releases/censusmaps 、/census2021quizhowwelldoyouknowyourarea ✅
- https://www.statcan.gc.ca/o1/en ✅　https://www.abs.gov.au/ ✅
- https://www.e-stat.go.jp/en ✅　https://dashboard.e-stat.go.jp/en/ ✅　https://www.nippon.com/en/japan-data/h02500/ ✅
- https://kosis.kr/eng/ ✅　https://www.singstat.gov.sg/ ✅
- https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Main_Page ✅ 與 …title=Population_and_population_change_statistics ✅
- https://docs.datacommons.org/ ✅　https://data.worldbank.org/ ✅　https://datahelpdesk.worldbank.org/knowledgebase/articles/114933-where-are-your-data-on-taiwan ✅
- https://developers.google.com/search/docs/appearance/structured-data/dataset ✅
- https://github.com/TheEconomist/graphic-detail-data ✅　https://github.com/Financial-Times/chart-doctor ✅
- https://www.datawrapper.de/charts ✅　https://flourish.studio/ ✅　https://data.gov.tw/ ✅
- https://www.niemanlab.org/2025/03/fivethirtyeight-is-shutting-down-as-part-of-broader-cuts-at-abc-and-disney/ 🔍
