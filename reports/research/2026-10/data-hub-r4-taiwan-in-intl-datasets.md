# 研究 R4：台灣在國際資料庫裡被怎麼處理

> 存取日期：2026-10-23　研究分身：data-hub R4
> 範圍：26 個國際資料庫／指數（另加 UN Comtrade 作補充）。只陳述可驗證事實，不做政治評論。
> 信心標記：✅ 已實際打開（API 回應、下載檔、頁面原文）確認／🔍 只在搜尋摘要或二手頁看到／❓ 未驗證。
> 規則：原始標籤字串逐字照抄（含逗號、大小寫）。未驗證的一律標 ❓，不用記憶補空。

---

## 1. 總覽

**一句話結論**：台灣在國際資料庫裡沒有統一的處理方式——同樣是「有資料」，名稱就至少分成四種寫法（Taiwan／Taiwan, Province of China／Taiwan, China／Chinese Taipei），而聯合國體系與世界銀行有一大半根本沒有台灣的資料列；本次沒有查到任何一個「把台灣數字直接加進中國數字」的資料庫，反而有明文寫「中國的資料不含台灣」的（World Bank）。

**分類統計（26 個資料庫／指數，依「台灣那一列的名稱」歸類）**

| 類別                                  | 數量 | 資料庫                                                                                                                                                                                             |
| ------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 獨立列出，名稱為「Taiwan」            | 9    | Penn World Table、Our World in Data、Google Data Commons、Statista、V-Dem、Freedom House、RSF、Transparency International CPI、EIU Democracy Index（EIU 為 🔍）                                    |
| 獨立列出，名稱帶「Province of China」 | 6    | IMF、UN WPP、ITU、Maddison Project、World Happiness Report、ISO 3166-1                                                                                                                             |
| 獨立列出，名稱為「Taiwan, China」     | 1    | ILOSTAT（只確認代碼表標籤，未確認實際資料）                                                                                                                                                        |
| 使用「Chinese Taipei」                | 4    | WTO、OECD（代碼表）、PISA（OECD 🔍）、IMD（寫成「Taiwan (Chinese Taipei)」）                                                                                                                       |
| 缺席（沒有台灣資料列／不在主榜）      | 6    | World Bank（WDI、Data360）、UNDP HDR、WHO GHO、UNESCO UIS、WIPO GII（國家主榜缺席，但 cluster 排名有）、UN M49（不在清單；SDG 資料庫把代碼 158 標成「Other non-specified areas in Eastern Asia」） |
| 台灣數字被併入中國數字（已驗證）      | 0    | 本次未查到；World Bank 反而明文寫中國資料不含「Taiwan, China」                                                                                                                                     |

補充：UN Comtrade 的 partner 列表有「Taiwan, Province of China」，但 reporter 列表沒有台灣（✅）。計入此項則「Province of China」類為 7。

**對 Taiwan.md 的意義**：做國際比較時，「該用哪個資料庫」要先問「它有沒有台灣這一列」，其次才是「它叫台灣什麼」。同一個指標（例如 GDP）在 IMF 有、在 World Bank 沒有；同一個指數（HDI、GII、GGI）在發布機構沒有，台灣由主計總處依其公式自行編算（第 4 節）。

---

## 2. 總表

| 資料庫                         | 主辦單位                                | 台灣是否出現               | 原始標籤字串                                                                                                       | 資料來源（官方／自行估算）                | 證據網址                                                                                                                         | 信心                                                         |
| ------------------------------ | --------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| World Bank WDI／國家列表       | World Bank                              | 否                         | （無；國家列表 296 筆無 TWN）                                                                                      | —                                         | https://api.worldbank.org/v2/country/all?format=json&per_page=400                                                                | ✅                                                           |
| World Bank Data360             | World Bank                              | 否                         | （REF_AREA=TWN 回傳 count 0；CHN 為 66）                                                                           | —                                         | https://data360api.worldbank.org/data360/data?DATABASE_ID=WB_WDI&REF_AREA=TWN&limit=2                                            | ✅                                                           |
| IMF WEO／DataMapper            | IMF                                     | 是                         | `Taiwan Province of China`（代碼 TWN）                                                                             | 未驗證（API 不註明）                      | https://www.imf.org/external/datamapper/api/v1/countries                                                                         | ✅ 標籤；❓ 來源                                             |
| UN M49（UNSD）                 | UN Statistics Division                  | 否                         | （M49 頁面全文 0 次出現 Taiwan）                                                                                   | —                                         | https://unstats.un.org/unsd/methodology/m49/overview/                                                                            | ✅                                                           |
| UN SDG 全球資料庫（區域代碼）  | UNSD                                    | 僅以代碼出現               | `Other non-specified areas in Eastern Asia`（geoAreaCode 158）                                                     | 無資料（series／indicator 查詢 0 筆）     | https://unstats.un.org/sdgs/UNSDGAPIV5/v1/sdg/GeoArea/List                                                                       | ✅                                                           |
| UN World Population Prospects  | UN DESA                                 | 是（地點列表）             | `China, Taiwan Province of China`（id 158，iso3 TWN）                                                              | 未驗證（資料端點需 token，無法取數）      | https://population.un.org/dataportalapi/api/v1/locations/158                                                                     | ✅ 標籤；❓ 數據來源                                         |
| UNDP 人類發展報告（HDI 表）    | UNDP                                    | 否                         | （2025 HDR 時間序列 CSV 共 206 列，無 TWN）                                                                        | —                                         | https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv                               | ✅                                                           |
| WHO Global Health Observatory  | WHO                                     | 否                         | （COUNTRY 維度 234 筆，無 TWN；以 TWN 查 WHOSIS_000001 回傳空）                                                    | —                                         | https://ghoapi.azureedge.net/api/DIMENSION/COUNTRY/DimensionValues                                                               | ✅                                                           |
| UNESCO UIS                     | UNESCO                                  | 否                         | `The geoUnit could not be found, TWN`（462 個 geoUnit 無台灣）                                                     | —                                         | https://api.uis.unesco.org/api/public/data/indicators?indicator=CR.1&geoUnit=TWN&start=2015&end=2020&version=20260507-91260335   | ✅                                                           |
| ILOSTAT                        | ILO                                     | 是（代碼表）               | `Taiwan, China`（TWN）                                                                                             | ❓（未取到實際資料列）                    | https://sdmx.ilo.org/rest/codelist/ILO/CL_AREA/latest                                                                            | ✅ 標籤；❓ 數據                                             |
| ITU DataHub                    | ITU                                     | 是                         | `Taiwan, Province of China`                                                                                        | 頁面僅標「Source: ITU」，原始提供者未驗證 | https://datahub.itu.int/data/?e=TWN&c=&i=11624                                                                                   | ✅                                                           |
| WTO（貿易概況／會員頁）        | WTO                                     | 是                         | `Chinese Taipei`（會員頁標題為 `Separate Customs Territory of Taiwan, Penghu, Kinmen and Matsu (Chinese Taipei)`） | 未驗證                                    | https://www.wto.org/english/res_e/statis_e/daily_update_e/trade_profiles/TW_e.pdf                                                | ✅                                                           |
| OECD（SDMX 代碼表／MSTI）      | OECD                                    | 是（非會員，部分資料集有） | `Chinese Taipei`（CL_AREA v1.12，TWN）                                                                             | 未驗證                                    | https://sdmx.oecd.org/public/rest/codelist/OECD/CL_AREA/latest                                                                   | ✅                                                           |
| PISA 2022                      | OECD                                    | 是                         | `Chinese Taipei`                                                                                                   | OECD 施測                                 | https://www.oecd.org/en/publications/pisa-2022-results-volume-i-and-ii-country-notes_ed6fbcc5-en/chinese-taipei_ebda1f30-en.html | 🔍（頁面對我方被 Cloudflare 擋，僅見搜尋結果標題）           |
| Penn World Table 11.0          | Groningen Growth and Development Centre | 是                         | `Taiwan`（TWN；貨幣 `New Taiwan Dollar`）                                                                          | 未驗證                                    | https://dataverse.nl/api/access/datafile/554105                                                                                  | ✅                                                           |
| Maddison Project 2023          | Groningen／Maddison Project             | 是                         | `Taiwan, Province of China`（TWN）                                                                                 | 未驗證                                    | https://dataverse.nl/api/access/datafile/421302                                                                                  | ✅                                                           |
| Our World in Data              | OWID                                    | 是（部分圖表）             | `Taiwan`（TWN）                                                                                                    | 依圖表而定；詳第 3 節                     | https://ourworldindata.org/grapher/life-expectancy.csv?v=1&csvType=full                                                          | ✅                                                           |
| Google Data Commons            | Google                                  | 是                         | `Taiwan`（country/TWN）                                                                                            | 人口來自 wikidata.org                     | https://datacommons.org/place/country/TWN                                                                                        | ✅                                                           |
| Statista                       | Statista                                | 是                         | `Taiwan`（頁面標題 `Taiwan - statistics & facts \| Statista`）                                                     | 未驗證（多為付費資料）                    | https://www.statista.com/topics/2311/taiwan                                                                                      | ✅ 標題                                                      |
| V-Dem v16                      | V-Dem Institute                         | 是                         | `Taiwan (48)`（國家編碼單位文件）；OWID 轉載的 V-Dem 序列用 `Taiwan`                                               | V-Dem 專家編碼                            | https://v-dem.net/documents/72/countryunit_v16.pdf                                                                               | ✅                                                           |
| Freedom House                  | Freedom House                           | 是                         | `Taiwan: Freedom in the World 2026 Country Report`                                                                 | FH 自評                                   | https://freedomhouse.org/country/taiwan/freedom-world/2026                                                                       | ✅                                                           |
| EIU Democracy Index            | EIU                                     | 是                         | `Taiwan`（二手報導）                                                                                               | EIU 自評                                  | https://www.taiwannews.com.tw/en/news/6047471                                                                                    | 🔍（eiu.com 無法開啟）                                       |
| RSF 新聞自由指數               | Reporters Without Borders               | 是                         | `Taiwan`（頁面標題 `Taiwan \| RSF`）                                                                               | RSF 自評                                  | https://rsf.org/en/country/taiwan                                                                                                | ✅                                                           |
| Transparency International CPI | TI                                      | 是                         | `Taiwan`（CPI 2025 xlsx）；章節名 `TI Chinese Taipei`                                                              | TI 彙整                                   | https://images.transparencycdn.org/images/CPI2025_Results.xlsx                                                                   | ✅                                                           |
| IMD 世界競爭力                 | IMD                                     | 是                         | `Taiwan (Chinese Taipei)`                                                                                          | IMD 自行調查＋統計                        | https://www.imd.org/?p=56211                                                                                                     | ✅                                                           |
| WIPO 全球創新指數 2025         | WIPO                                    | 國家主榜缺席；cluster 榜有 | `TW* = Taiwan Province of China`（cluster 榜）；另有一處 `TW* = Taiwan, Province of China`                         | WIPO                                      | https://www.wipo.int/documents/d/global-innovation-index/docs-en-2025-gii-2025-clusters-top100-ranking.pdf                       | ✅                                                           |
| World Happiness Report 2026    | Wellbeing Research Centre／Gallup 等    | 是                         | `Taiwan Province of China`                                                                                         | 未驗證                                    | https://files.worldhappiness.report/WHR26_Data_Figure_2.1.xlsx                                                                   | ✅                                                           |
| ISO 3166-1                     | ISO                                     | 是                         | `Taiwan, Province of China`（alpha-2 TW，alpha-3 TWN，numeric 158）                                                | —                                         | https://salsa.debian.org/iso-codes-team/iso-codes/-/raw/main/data/iso_3166-1.json                                                | ✅（ISO 資料的 Debian 轉載，ISO OBP 官方頁面為 JS 未能渲染） |
| UN Comtrade（補充）            | UN Statistics Division                  | 僅 partner                 | `Taiwan, Province of China`（partner 158）；reporter 列表無 158                                                    | —                                         | https://comtradeapi.un.org/files/v1/app/reference/partnerAreas.json                                                              | ✅                                                           |

---

## 3. 各資料庫細節

### 3.1 World Bank（缺席）

- 國家列表 API 回傳 296 筆（`total":296`），逐筆比對名稱與代碼，無 Taiwan／Taipei／TWN／TW。
- `https://api.worldbank.org/v2/country/TWN?format=json` 回傳：`The provided parameter value is not valid`（錯誤碼 120）。
- `.../country/TWN/indicator/NY.GDP.MKTP.CD` 回傳 `total":0`；同一指標 CHN 有 66 筆，最新 2025 年 19,498,039,388,042.6（lastupdated 2026-10-08）。
- Data360：`DATABASE_ID=WB_WDI&REF_AREA=TWN` count 0；`REF_AREA=CHN` count 66。
- **WDI 中國欄的特別說明**（World Bank 來源 2 的 metadata API，`SpecialNotes` 欄）：`Unless otherwise noted, data for China do not include data for Hong Kong SAR, China; Macao SAR, China; or Taiwan, China.`
  - 網址：https://api.worldbank.org/v2/sources/2/country/CHN/series/SP.POP.TOTL/metadata?format=json ✅
  - 意義：WB 在文字層使用「Taiwan, China」稱呼，但不提供其資料列。
- 未查：WGI 等其他 WB 資料集（API 以 TWN 查詢同樣回 120 錯誤，故 API 層面一律無法查台灣）；Doing Business 等已停更報告是否曾列「Taiwan, China」❓。

### 3.2 IMF（獨立列出，Province of China）

- DataMapper 國家表：`TWN → {"label":"Taiwan Province of China"}`；同表 `CHN → China, People's Republic of`、`HKG → Hong Kong SAR`、`MAC → Macao SAR`。
- 指標資料（WEO October 2026，last-modified 2026-10-08）：
  - NGDPD（名目 GDP，十億美元）：2023＝757.387、2024＝801.495、2025＝920.585
  - NGDPDPC（人均名目 GDP，美元）：2024＝34,251.621、2025＝39,511.561
  - PPPPC（人均 PPP GDP，國際元）：2024＝80,512.037、2025＝90,256.241
  - NGDP_RPCH（實質成長率，%）：2024＝5.3、2025＝8.8（2026 欄位 API 回 10.7，屬預測值，引用前請對照 WEO 原始表）
- 網址：https://www.imf.org/external/datamapper/api/v1/NGDPD/TWN ✅

### 3.3 UN 體系

- **UN M49**（https://unstats.un.org/unsd/methodology/m49/overview/）：下載 HTML 1,721,575 bytes，`grep -c taiwan` 為 0；列有 `China`（156）、`China, Hong Kong Special Administrative Region`（344）。✅
- **UN SDG 全球資料庫**：`GeoArea/List` 共 460 筆，`158` 的名稱為 `Other non-specified areas in Eastern Asia`（`156`＝China、`344`＝China, Hong Kong Special Administrative Region）。以 areaCode=158 查 `SP_POP_TOTL`、indicator 3.1.1 皆 `totalElements":0`。✅
- **UN WPP**：地點列表（open）有 `{"id":158,"name":"China, Taiwan Province of China","iso3":"TWN","iso2":"TW"}`；同表 156＝`China`、344＝`China, Hong Kong SAR`、446＝`China, Macao SAR`。資料端點 `/data/indicators/49/locations/158/...` 回 HTTP 401（`www-authenticate: Bearer`），所以**實際數值未能取得** ❓。
- **UN Comtrade**（參考檔）：partnerAreas 有 `{"PartnerCode":158,"PartnerDesc":"Taiwan, Province of China","PartnerCodeIsoAlpha3":"TWN"}`；Reporters 列表只有 156 與 490（`Other Asia, nes`），無 158。本次未驗證台灣貿易資料是否被歸入 490 ❓。

### 3.4 UNDP 人類發展報告（缺席）

- 2025 HDR「All composite indices and components time series (1990-2023)」CSV，2,001,263 bytes，206 列 ISO3；無 TWN。同檔 `CHN`＝China，hdi_2023＝0.797；`HKG`＝`Hong Kong, China (SAR)`，hdi_2023＝0.955。
- 網址：https://hdr.undp.org/sites/default/files/2025_HDR/HDR25_Composite_indices_complete_time_series.csv ✅
- OWID 的 `human-development-index` 序列也無 Taiwan（grep 0 筆）✅。

### 3.5 WHO GHO（缺席）

- `DIMENSION/COUNTRY/DimensionValues` 234 筆：`CHN`＝`China`（區域 WPR）、`HKG`＝`China, Hong Kong Special Administrative Region`；無 TWN。
- `WHOSIS_000001?$filter=SpatialDim eq 'TWN'` 回傳 `"value":[]`。✅

### 3.6 UNESCO UIS（缺席）

- 版本 `20260507-91260335` 的 `definitions/geounits` 共 462 筆，比對 Taiwan／Taipei／TWN 皆無。
- 查詢 `geoUnit=TWN` 回傳 `{"hints":[{"code":"UIS::HINT::003","message":"The geoUnit could not be found, TWN"}],"records":[]...}`。✅

### 3.7 ILOSTAT（有標籤，資料未驗）

- SDMX CL_AREA（335 筆）：`TWN｜Taiwan, China`、`CHN｜China`、`HKG｜Hong Kong, China`、`MAC｜Macau, China`。
- ILO 的 rplumber 資料 API 本次回傳空內容，無法確認台灣實際資料列 ❓。

### 3.8 ITU DataHub（有，Province of China）

- 網址 `https://datahub.itu.int/data/?e=TWN&c=&i=11624`（Browser 實際渲染）：`Focus economy: Taiwan, Province of China`；Individuals using the Internet＝97.3%（2025）；世界＝73.6%（2025）。
- 同頁「All Economies」另列 `China` 91.8%（2025）。✅

### 3.9 WTO（Chinese Taipei）

- 貿易概況 PDF（2 頁）標題 `Chinese Taipei`；列示 `GDP (million current US$, 2022)` 761 691、人均 GDP（2020–2022）31 459、貿易佔 GDP 58.0%。
- 會員頁（經 WebFetch 讀取）標題：`Separate Customs Territory of Taiwan, Penghu, Kinmen and Matsu (Chinese Taipei) and the WTO`，加入日 2002-01-01。
- WTO Stats API 需訂閱金鑰（HTTP 401），stats.wto.org 為 JS 載入，未取得資料庫內的報告經濟體清單 ❓。

### 3.10 OECD（非會員，部分資料集有 Chinese Taipei）

- SDMX `CL_AREA` v1.12：`TWN｜Chinese Taipei`、`CHN｜China (People's Republic of)`、`HKG｜Hong Kong (China)`。✅
- MSTI（主要科技指標）資料集全表查詢（lastNObservations=1）含 146 筆 TWN 列，如 `OECD.STI.STP:DSD_MSTI@DF_MSTI(1.3),TWN,A,H_TT,FTE,_Z,GY,2024,0.752954958`。✅
- 一個國民所得資料集（NAD）以我方組的鍵查詢回 `NoResultsFound`，原因可能是鍵值錯誤，**不能據此說 NAD 沒有台灣** ❓。
- 另：行政院性別平等處文件稱 OECD 的 SIGI 於 2023 年「首次公布我國成績」（見 4.3），是二手 🔍。
- PISA：OECD 出版品標題為 `PISA 2022 Results (Volume I and II) - Country Notes: Chinese Taipei` 🔍；內文把 `Chinese Taipei` 與 `Hong Kong (China)`、`Macao (China)`、Japan、Korea、Singapore 並列為數學表現最高的六個教育體系 🔍。

### 3.11 Penn World Table 11.0（Taiwan）

- xlsx「Data」頁 186 個國家／經濟體；`TWN｜Taiwan｜New Taiwan Dollar`；`CHN｜China`；`HKG｜China, Hong Kong SAR`。
- 2023：rgdpe＝1,517,366.75、rgdpo＝1,445,884.375（百萬 2021 年美元，PPP）；pop＝23.342541（百萬）；emp＝11.696（百萬）。
- 附註：FRED 轉載 PWT 序列時，名稱改寫成 `Taiwan Province of China`（例：RGDPOSTWA666NRUG），是**轉載者的改名**，不是 PWT 原檔標籤 ✅。

### 3.12 Maddison Project 2023（Province of China）

- `mpd2023_web.xlsx`「Full data」：`TWN｜Taiwan, Province of China｜East Asia`，776 列，最後一筆 2022：gdppc＝53,142.98（2011 年國際元）、pop＝23,481.45（千人）。同檔 `CHN｜China`、`HKG｜China, Hong Kong SAR`。✅

### 3.13 Our World in Data（Taiwan，但依圖表有無）

- 有 Taiwan：`life-expectancy`（2023＝80.5588，標題含 UN WPP 等長期合成）、`population`（2023＝23,317,145）、`gdp-per-capita-maddison-project-database`（2022＝53,142.984）、`gdp-per-capita-penn-world-table`（2023＝61,942.03）、`electoral-democracy-index`（V-Dem，2025＝0.801）。
- 沒有 Taiwan：`gdp-per-capita-worldbank`（0 筆）、`human-development-index`（0 筆）。
- EIU 的 `democracy-index-eiu` 圖表為「non-redistributable」，不能下載 CSV（HTTP 403 訊息），元資料顯示來源 `Economist Intelligence Unit (2006-2024)`，無法在此驗證台灣列。
- 結論：OWID 本身用 `Taiwan`，台灣有沒有，取決於它採用的上游（Maddison、PWT、WPP、V-Dem 有；World Bank、UNDP 沒有）。

### 3.14 Google Data Commons（Taiwan）

- `https://datacommons.org/place/country/TWN`（Browser 渲染）：標題 `Taiwan`，`Country in Asia, World`；人口 `23,412,899 (Jun 2024)`，來源標示 `www.wikidata.org`；下轄地點列出 `Taiwan Province`、`New Taipei`、`Taichung`、`Kaohsiung`、`Taipei` 等，並同時列 `Fujian Province`。
- 亞洲國家比較圖中，`Taiwan`、`Hong Kong`、`Macau` 與 `China` 並列。
- 注意：台灣人口這一格的來源是 Wikidata，不是官方統計機關資料庫；電力資料顯示來源 `unstats.un.org`，但頁面數值（顯示為 `28.2T Kilowatt-hours`）單位明顯異常，不採用。✅

### 3.15 Statista（Taiwan）

- 頁面標題：`Taiwan - statistics & facts | Statista`、`Statistics about Economy & Politics in Taiwan | Statista`。多數明細為付費內容，未驗證來源 🔍（標題 ✅）。

### 3.16 治理／自由度指數

- **V-Dem v16**（2026 年 3 月）：`Country Coding Units` 文件目錄 `4.3.7 Taiwan (48)`，Coded: 1900–。文件原文：`V-Dem does not take a position on whether Taiwan is part of China, whether the Western Sahara belongs to Morocco, or whether Somaliland should be recognized as an independent state.` 並說明 China 條目 `Does not include Taiwan, Hong Kong, and Macau (coded separately)`。✅
- **Freedom House**：頁面標題 `Taiwan: Freedom in the World 2026 Country Report | Freedom House`；Free，93/100（政治權利 38/40、公民自由 55/60；前一年 94）。數字經 WebFetch 讀取。✅（標題）
- **RSF**：頁面標題 `Taiwan | RSF`；2026：28/180，75.44（2025：24/180，77.04）。數字經 WebFetch 讀取。✅（標題）
- **TI CPI**：`CPI2025_Results.xlsx` 共用字串表含 `Taiwan`（同表亦含 `Hong Kong`）；國家頁標題 `Taiwan - Transparency.org`，章節 `TI Chinese Taipei`，2025：68/100、182 國中第 24。✅（標籤）；分數經 WebFetch。
- **EIU**：eiu.com 無法開啟。二手報導（Taiwan News）稱 2024 年資料 Taiwan 8.78 分、167 國第 12、Full democracy 🔍。
- **World Happiness Report 2026**：xlsx 欄位 `Country name` 列 `Taiwan Province of China`，2025 年榜 26 名、score 6.714；同表 `China` 65 名 6.074。✅

### 3.17 競爭力／創新

- **IMD 2026**（2026-06-18 新聞稿，imd.org/?p=56211）：`Taiwan (Chinese Taipei) rises two places to fourth, continuing a strong upward trajectory from eighth in 2024 and sixth in 2025.` ✅
- **WIPO GII 2025**：國家主榜 139 個經濟體，Hong Kong, China 第 15；Taiwan 在執行摘要排名表無任何出現（全文 grep 僅有 `Taipei–Hsinchu` 一處 cluster 列）✅。Top 100 cluster 排名中 `Taipei–Hsinchu` 第 41（economy 欄 `TW*`），註解 `TW* = Taiwan Province of China`（另一處 appendix 寫 `Taiwan, Province of China`）；cluster 表另列 MediaTek、National Taiwan University 為申請人／機構。✅ 國家主榜缺席的原因，文件未說明。

### 3.18 ISO 3166-1

- Debian iso-codes（ISO 資料轉載）：`{"alpha_2":"TW","alpha_3":"TWN","common_name":"Taiwan","name":"Taiwan, Province of China","numeric":"158","official_name":"Taiwan, Province of China"}`；同檔 CN `China`／HK `Hong Kong`。✅（轉載；官方 OBP 頁面為 JS，未能渲染，❓）

---

## 4. 台灣官方自算的國際對照指標

### 4.1 HDI（人類發展指數）

- 主辦：行政院主計總處（DGBAS），開放資料集「人類發展指數（HDI）」，data.gov.tw 資料集 25711。
- 資料說明（逐字）：「因我國非聯合國會員且國際處境特殊，該指數係由本總處依UNDP公式，將我國資料帶入計算而得。」
- 欄位：舊版、2010年版、2014年版三種公式的數值與排名。
- 最新列（2014 年版公式）：**2023 年 0.934，排名 21**；2022 年 0.925（24）；2021 年 0.926（19）；2020 年 0.923（19）。
- 對照：同年 UNDP 2025 HDR 的 China hdi_2023＝0.797、`Hong Kong, China (SAR)`＝0.955；Taiwan 不在 UNDP 表內。
- 網址：
  - 說明頁 https://data.gov.tw/dataset/25711 ✅（詮釋資料更新時間 2024-10-29，上架 2016-03-16）
  - CSV https://ws.dgbas.gov.tw/001/Upload/461/relfile/11525/231207/human_development_index.csv ✅（該主機憑證鏈在本機無法驗證，需以 `curl -k` 下載；這是純資料檔，僅讀取）
- 注意：CSV 更新頻率為「不定期更新」，且說明稱綜合指數及排名公布後不回溯修正。

### 4.2 GII（性別不平等指數）

- 行政院性別平等處《性別圖像》（2025 版）原文：「將我國資料依據 GII 編算方式計算，2022 年我國 GII 值為 0.041（2021 年為 0.036），在 167 個國家中位居第 10 名（前次第 7 名）。」
  - 網址（法務部檢察署轉載 PDF）：https://www.tps.moj.gov.tw/media/390036/%E8%A1%8C%E6%94%BF%E9%99%A22025%E6%80%A7%E5%88%A5%E5%9C%96%E5%83%8F.pdf?mediaDL=true ✅
- 較新版（PDF 檔建立於 2025-12-16，國際比較章節）：「2023 年我國 GII 值為 0.040（2022 年為 0.041），在 173 個國家中位居第 13 名（前次第 10 名）。」
  - 網址：https://gec.ey.gov.tw/File/8256A11B0CBE8C67 ✅
- 排名插入規則（兩份文件註記）：「我國加入評比後，分數與我國相同或居我國之後者均較原報告退後 1 名。」
- 方法與資料年度：孕產婦死亡率用 2020 年，其餘四項用 2022 年（2025 版註）。
- 主計總處編算簡報（2020）：https://www.dgbas.gov.tw/public/data/dgbas04/bc6/109ebas/%E7%B0%A1%E5%A0%B1%E6%AA%94/1-2%20%E6%88%91%E5%9C%8B%E6%80%A7%E5%88%A5%E4%B8%8D%E5%B9%B3%E7%AD%89%E6%8C%87%E6%95%B8%EF%BC%88GII%EF%BC%89%E4%B9%8B%E7%B7%A8%E7%AE%97.pdf 🔍（只見於搜尋結果）。
- 性別平等處國際指標頁（GII 節點）：https://www.gender.ey.gov.tw/gecdb/Stat_International_Node0.aspx?s=F3FDhlObyRpCfF%24GNWBwHA%40%40 ✅，寫「我國GII係依據UNDP編算公式進行計算」；頁面本身不含「非聯合國會員」字樣。

### 4.3 其他性別指數（同一份 2025-12 文件）

- **GGI（WEF 性別落差指數）**：「將我國資料依據 GGI 編算方式計算，2025 年我國 GGI 值為 0.766（2024 年為 0.774），在 148 個國家中位居第 35 名（前次第 29 名）」。
- **SIGI（OECD）**：「2023 年我國首次獲 OECD 公布成績，綜合平均值為 9.2 分……在 179 個國家中位居第 6 名，亞洲名列第 1 名」——這一項是 OECD 公布，不是自算（二手轉述，OECD 原頁面未開）🔍。
- **GEI（歐盟性別平等指數）**：同文件也依 EIGE 方法自行編算，另有分項表（細節未取）。
- 網址同上：https://gec.ey.gov.tw/File/8256A11B0CBE8C67 ✅

### 4.4 其他

- 性別平等處「國際性別平權綜合指數」專區列有 HDI、GII、GEI、GGI、SIGI 五個節點，HDI 節點指向中華民國統計資訊網（https://www.stat.gov.tw/ct.asp?xItem=33332&CtNode=6020&mp=4；該網址對本次自動讀取回傳 Cloudflare 驗證頁，❓ 未讀到內容）。
- 本次**未查到**：主計總處自算 SDG 指標對照、PPP 人均 GDP 的官方國際比較表、與 IMF 對照的官方版本。要補需直接進中華民國統計資訊網人工確認。

---

## 5. 給 Taiwan.md 的資料來源建議

以下只陳述選項與取捨，由哲宇決定採用哪一種。

### 5.1 依指標類別的來源選項

| 指標類別                   | 有台灣列的國際來源（原始標籤）                                                                                                                                | 缺席的來源                                | 台灣官方來源                       | 取捨                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| 經濟規模／人均 GDP／PPP    | IMF DataMapper（`Taiwan Province of China`）；PWT 11（`Taiwan`，到 2023）；Maddison（`Taiwan, Province of China`，到 2022）；WTO 貿易概況（`Chinese Taipei`） | World Bank WDI／Data360                   | 主計總處（國民所得）               | 國際來源讓「同一方法跨國可比」，官方來源是第一手但各國口徑不同；IMF 能覆蓋最新年與預測，標籤是 IMF 的命名 |
| 人口／人口結構             | UN WPP（`China, Taiwan Province of China`，資料端點需 token）；OWID 序列（`Taiwan`）                                                                          | WHO、UNDP                                 | 內政部、國發會                     | 跨國比較用 WPP 方法一致；本國官方數字較新                                                                 |
| 健康（預期壽命等）         | OWID `life-expectancy`（`Taiwan`，合成序列）                                                                                                                  | WHO GHO、UNDP HDR                         | 衛福部                             | 國際健康資料庫的主力（WHO）沒有台灣，需在說明中標清楚是官方數字加自行並列                                 |
| 教育                       | PISA（OECD，`Chinese Taipei`）🔍                                                                                                                              | UNESCO UIS                                | 教育部                             | 跨國學習表現可用 PISA；入學率、經費等 UIS 型指標只能用官方並列                                            |
| 勞動                       | ILOSTAT（`Taiwan, China`，資料列未驗）                                                                                                                        | —                                         | 主計總處、勞動部                   | 用前要先實際查 ILOSTAT 台灣資料列的覆蓋範圍                                                               |
| 網路／電信                 | ITU DataHub（`Taiwan, Province of China`，2025＝97.3%）                                                                                                       | —                                         | 國家通訊傳播委員會（本次未查）     | ITU 可直接引用                                                                                            |
| 貿易                       | WTO（`Chinese Taipei`）；UN Comtrade partner（`Taiwan, Province of China`）                                                                                   | Comtrade reporter                         | 財政部關務署                       | 貿易有雙邊鏡像資料，但 Comtrade 無台灣作為申報方                                                          |
| 民主／自由／廉潔／新聞自由 | V-Dem（`Taiwan`）、Freedom House（`Taiwan`）、RSF（`Taiwan`）、TI CPI（`Taiwan`）、EIU（`Taiwan` 🔍）                                                         | —                                         | —                                  | 這一類是目前最乾淨可直接引用的組別；全為機構自評，不是台灣官方數字                                        |
| 幸福感                     | WHR（`Taiwan Province of China`）                                                                                                                             | —                                         | —                                  | 名稱帶後綴，取數與標註需分開處理                                                                          |
| 競爭力                     | IMD（`Taiwan (Chinese Taipei)`）                                                                                                                              | WIPO GII 國家主榜                         | 國發會                             | IMD 名稱已含雙標；GII 只有 cluster 榜可引                                                                 |
| HDI／GII／GGI／SIGI        | SIGI（OECD，二手 🔍）                                                                                                                                         | UNDP HDR（HDI、GII）、WEF GGI（本次未驗） | 主計總處與性平處「依公式自行編算」 | 這是第 4 節的自算指標，不是原機構的正式排名                                                               |

### 5.2 標註方式的選項

1. **「顯示名稱」與「來源原始標籤」分開存**：資料表保留 `source_label` 欄（逐字照抄，如 `Taiwan Province of China`），頁面顯示用 Taiwan.md 自己的名稱。好處是既準確又不替來源命名背書，也讓讀者能追溯；代價是每筆多一欄。
2. **在圖表 footnote 用固定句型**，例如：「資料來源：IMF WEO（2026 年 10 月）。IMF 資料庫中本經濟體標示為 "Taiwan Province of China"。」或「World Bank 未提供本經濟體資料，數值取自主計總處。」
3. **自算指標必須標明**：「依 UNDP 公式由行政院主計總處編算，非 UNDP 正式公布」，並保留排名插入規則（加入後分數相同或較差者退後 1 名），讀者才不會把它當成 UNDP 榜單。
4. **缺席要明講而不是補零或留白**：用「該資料庫無此經濟體」並附查證日期，避免被讀成「台灣無此數字」。
5. **混用來源時不要拼成一條時間序列**：例如 IMF 與主計總處的 GDP 口徑、匯率、修訂時間不同，建議分別畫線或只選一個來源。
6. **查證日期與檢查方法寫進資料卡**：這類名稱會隨資料庫改版而變（例如 WHR、IMD 的寫法），建議每年一次以第 3 節的 API／檔案檢查重驗。

### 5.3 選項的取捨摘要

- 只用國際來源：跨國可比、可批量引用，但 World Bank、WHO、UNESCO、UNDP 這幾個最常被引用的資料庫是缺席的，會漏掉大量指標。
- 只用台灣官方來源：名稱由我方決定，可靠度高，但各國口徑不一，國際比較需要自己對照方法。
- 混合：以官方數字為主、以 IMF／PWT／V-Dem 等有台灣列的來源作國際對照，缺席的指標明講缺席。這是工作量最大但資訊最完整的做法。

---

## 6. 未完成或受限事項（供後續補查）

- ❓ EIU 原站無法開啟（工具限制），台灣分數僅有二手報導。
- ❓ UN WPP 資料端點需 token，實際台灣數值未取得。
- ❓ WTO Stats 資料庫、ILOSTAT 資料 API 本次無法取得實際資料列。
- ❓ OECD 國民所得（NAD）等其他資料集是否含台灣；PISA 官方頁面被 Cloudflare 擋，僅見搜尋結果標題。
- ❓ 台灣各項數據的原始提供者（IMF、PWT、Maddison、WHR、ITU 等）多數未能由資料庫頁面確認。
- ❓ 中華民國統計資訊網（stat.gov.tw）頁面被 Cloudflare 擋；主計總處 SDG／PPP 國際比較表未取得。
- ❓ ISO 3166 官方 OBP 頁面為 JS 未渲染，名稱取自 Debian iso-codes 轉載。
- 本次下載到暫存區的檔案（PWT、Maddison、CPI、WHR、HDR、DGBAS CSV、數個 PDF）僅作讀取，未執行；DGBAS CSV 因憑證鏈問題以不驗證 TLS 的方式讀取純資料。

— 完 —
