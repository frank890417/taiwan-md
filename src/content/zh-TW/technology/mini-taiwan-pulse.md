---
title: 'Mini Taiwan Pulse：一個資料分析師如何把台灣的交通脈動畫成會呼吸的 3D 光軌'
category: Technology
subcategory: '公民科技'
tags: [Technology, 公民科技, 開放資料, 資料視覺化, 開源專案, TDX, Three.js]
date: 2026-04-19
description: '2026 年 2 月 24 日，一個叫 Migu Cheng 的資料分析師開了 mini-taiwan-pulse 這個 repo，六週後 193 個 commits、241 顆 star：他一個人把 FlightRadar24、TDX、SEGIS、CWA 的開放資料串起來，用 Three.js 把台灣畫成會呼吸的 3D 光軌。台灣的開放資料基礎建設是亞洲前段班，卻很少人看得見那片資料海。公民科技從 g0v 集體黑客松延伸到個人週末專案，視覺化本身就是一種參與。'
lastVerified: 2026-04-19
lastHumanReview: true
readingTime: 12
featured: false
---

# Mini Taiwan Pulse：一個資料分析師如何把台灣的交通脈動畫成會呼吸的 3D 光軌

> **30 秒概覽：** 2026 年 2 月 24 日，一個 GitHub 帳號叫 `ianlkl11234s`、bio 寫著「Senior Data Analyst, Exploring AI automation in daily work」的開發者 Migu Cheng[^1]，開了一個名叫 mini-taiwan-pulse 的 repo。六週後，這個 repo 有 193 個 commits、241 顆 star[^2]，把 FlightRadar24 航班、AIS 船舶、TDX 鐵道時刻、SEGIS 村里人口、CWA 氣象格點這些散落在不同政府平台的開放資料，用 Three.js 的光球、光軌、3D 光柱串成 23 個可獨立切換的圖層。它不是政府專案、不是補助金產物、也不是黑客松週末的原型，是一個人的業餘時間把台灣的資料海變成可以看的風景。

## 一個人的 repo，一座島的脈搏

2026 年 2 月 24 日的 GitHub commit history 上，`ianlkl11234s/mini-taiwan-pulse` 的第一個 commit 進來了。README 的開頭寫著：

> 用開放資料，感受台灣的脈動。天空中的航班劃出弧線、海面上的船舶穿梭往返、軌道上的列車準時奔馳——這座島嶼每一刻都在呼吸。[^3]

到 4 月 9 日最後一次 push 為止，這個 repo 已經累積 193 個 commits、241 顆 star、12 個 fork[^2]。作者 Migu Cheng 在 profile 上只留了一行：「Senior Data Analyst. Exploring AI automation in daily work.」沒有公司、沒有部落格、沒有 Twitter[^1]。

這個 repo 做的事並不簡單。它把下列資料源，全部接進同一張 3D 地圖：

| 資料層             | 來源                                      | 規模                               |
| ------------------ | ----------------------------------------- | ---------------------------------- |
| 航班即時位置       | FlightRadar24 API[^4]                     | 全台 14 座機場、1,500+ 航班        |
| 船舶 AIS 定位      | 國際 AIS 自動識別系統                     | 台灣周邊海域，30 分鐘遞延拖尾      |
| 鐵道時刻           | 公開時刻表 + OSM Overpass[^5]             | 台鐵/高鐵/四個都會捷運，333 列火車 |
| 公共運輸站點       | TDX 運輸資料流通服務[^6]                  | 公車、客運、YouBike、自行車道      |
| 村里人口統計       | 內政部 SEGIS[^7]                          | 7,748 村里、H3 六角格 res7+res8    |
| 氣象格點           | 中央氣象署開放資料[^8]                    | 0.03° 解析度、120×67 格網          |
| 災害示警           | NCDR CAP feed[^9]                         | 颱風、地震、淹水                   |
| 新聞事件地標       | 中央通訊社 RSS + Gemini API 地理編碼[^10] | 每日主要/次要新聞                  |
| 機場/港口/車站邊界 | OSM Overpass API[^5]                      | 14 機場、535 站                    |

然後用 Three.js r172 在 Mapbox GL JS v3 的底圖上疊六個獨立的 `CustomLayer`：飛機是一顆發光的球體，拖著彗尾狀的漸層光軌；船舶用 `InstancedMesh` 做批次渲染，30 分鐘拖尾是 per-vertex color gradient；台鐵 265 條 OD 軌道、333 列火車依車種分 6 種顏色；36 座燈塔各有一束 3D 旋轉的錐形光束[^3]。

這些光軌用 additive blending 疊加，多條航線重疊的區域自然變亮，資料的繁忙程度不需要統計圖表，你看光就看得出來。

## 台灣的資料海，為什麼很少人看得見

台灣的開放資料基礎建設在亞洲前段班。政府資料開放平臺（data.gov.tw）從 2013 年上線，累積十萬筆以上資料集[^11]；交通部的 TDX 運輸資料流通服務在 2022 年整合公路、鐵道、航空、航運、自行車五大平臺，提供全國尺度的公共運輸動靜態資料 API[^6]；內政部的 SEGIS 提供到村里級別的人口統計空間圖層[^7]；中央氣象署、國家災害防救科技中心、經濟部能源局、臺灣海域船舶即時資訊系統都各自開了 API[^8][^9]。

資料是有的。問題是**這些資料分散在不同平台、用不同的 API 格式、不同的空間粒度、不同的時間頻率**。一個想看「台灣現在怎麼樣」的人，得自己寫爬蟲、處理 OData、處理 CAP XML、處理 GeoJSON、處理 H3 hexagon，然後才能開始「視覺化」這件事。

> **📝 策展人筆記**
> 開放資料運動有兩個容易被混淆的指標：**資料有多少**（政府開了多少 API），和**資料被看見多少**（有多少視覺化、應用、故事）。台灣在第一個指標上是模範生，在第二個指標上卻長期靠 g0v 社群和少數商業新聞媒體的零星努力在撐。這個斷層是 Mini Taiwan Pulse 最有意義的位置：它填補的不是資料，是可見性。

2012 年，g0v 零時政府在一場中研院的黑客松起家，口號是「寫程式改造社會」。從第一個把政府總預算視覺化的黑客松開始，到 2020 年吳展瑋在 72 小時內串起 6,000 家健保藥局的即時口罩地圖、串起台灣「鍵盤救國」的國際聲名[^12]，g0v 累積了 59+ 次黑客松、7,200+ 參加人次、950+ 提案專案[^13]。

但 g0v 的敘事是集體的，它是一個社群，一個週六早上大家拿著筆電擠進場地的文化。Mini Taiwan Pulse 展示的是公民科技的另一種樣態：**一個人的週末，一個人的 git log**。Migu Cheng 在 README 最下方放了自己的 GitHub link，沒有團隊介紹、沒有 Discord、沒有贊助商。193 個 commits 裡有 refactor、有 perf fix、有 2026-04-09 IO 爆表的事件紀錄[^14]，這個 repo 的 commit history 讀起來像一本工程日記。

## 三層脈動：天空、海洋、大地

Mini Taiwan Pulse 把移動的物件分成三層：

### 天空：航班光軌

14 座台灣機場、同時間約 1,500 架航班。每架飛機是一顆多層發光的球體，還有紅色防撞閃爍燈的呼吸動畫。飛機身後的彗尾狀漸層光軌，暗色主題依高度著色（暖橘漸冷藍），亮色主題隨機配色[^3]。資料來自 FlightRadar24 的公開 API，這是一個用 ADS-B 接收器組成的全球航班追蹤網路[^4]，台灣周邊空域的涵蓋密度非常高。

### 海洋：船舶拖尾

船舶用的是 AIS（Automatic Identification System）資料，這是國際海事組織強制大型商船裝設的即時位置廣播系統。Mini Taiwan Pulse 用青藍色的 InstancedMesh 光球標示船位，加上 30 分鐘的拖尾軌跡；系統會自動過濾 GPS 跳躍異常點和無效 MMSI，確保你看到的光點是真實的船[^3]。

### 大地：六大軌道

這可能是整個專案最硬的部分。台鐵、高鐵、台北捷運、高雄捷運、高雄輕軌、台中捷運，六個軌道系統同步運行，每列火車是一顆依車種染色的光球，台鐵和高鐵還有 3 分鐘遞延的拖尾軌跡。

台鐵的處理特別複雜：OD（Origin-Destination）軌道匹配、golden track 推論、彰化三角線這種分歧路線，都需要專門的引擎處理，README 直接點名「台鐵專用引擎」[^3]。這不是簡單把時刻表畫在地圖上，是把時刻表的文字資料反推回列車真實在軌道上的位置。

> **📝 策展人筆記**
> 台鐵的「三角線」（如彰化、台中、南港）是鐵道迷才會注意的細節：列車可以從多個方向進出，不是單純的 A→B 路線。大部分鐵道視覺化會把這種路段簡化掉，Mini Taiwan Pulse 專門寫了引擎處理。這是「策展深度」的訊號，作者不只串資料，也尊重資料原本的複雜度。

除了三層移動物件，專案還疊加了 23 個可切換的靜態與分析圖層：535 座車站的 3D 光柱（高度等於每日停靠次數的正規化值）、36 座燈塔的 3D 旋轉錐形光束、國道（紅）/ 省道（橘）/ 自行車道（綠）的 zoom 自適應路網、人流模擬的 H3 六角格熱力圖（日夜切換，Plasma / Viridis 色階）、9 項人口指標面板（數量/結構/負擔）、CWA 格點溫度的 3D 波浪曲面、國道壅塞的色彩編碼、NCDR 災害示警的 severity 色階、CNA 新聞事件的地理標記[^3]。

總計 10 個分類、23 個圖層、6 種 Mapbox 底圖樣式、日期導航 + 時間軸 30× 到 3600× 加速播放。所有這些都塞進一個人的 GitHub repo 裡。

## 技術策展：讓資料「即時」有多難

寫一個地圖視覺化網站不難，Mapbox 的 hello world 十五分鐘就能跑起來。難的是讓它**即時、流暢、能支撐全台七千多個村里的 56K hexagon cells**。

Mini Taiwan Pulse 在架構上有三個值得看的決定：

### 1. Overlay Registry 模式

所有 Mapbox GL 靜態圖層（機場、車站、港口、燈塔、道路、風場）都用**配置驅動**的 `overlayRegistry.ts` 統一管理：一個 config 陣列（`sourceUrl` + `paint` 函式），一個 `overlayManager.ts` 做 CRUD，一個 `useEffect` 控制所有 overlay 的可見性和主題切換。新增一個 overlay 只要改三個檔案[^3]。

這是典型的「資料驅動 UI」架構，不特別炫，但對一個 23 圖層的系統來說，是能不能維護下去的關鍵。

### 2. Three.js CustomLayer 嵌入

Mapbox GL 本身不擅長畫 3D 物件。Mini Taiwan Pulse 用 Mapbox 的 `CustomLayer` 介面，把 Three.js 的 scene 塞進同一個 WebGL context，六個獨立的 `CustomLayer` 分別管理航班、船舶、鐵道、燈塔、車站光柱、溫度 3D 波浪，共享相機矩陣，各自控制渲染開關[^3]。

這是 Mapbox + Three.js 整合的標準做法（threebox、three-geo 等第三方庫都是這個路子[^15]）。Mini Taiwan Pulse 直接手寫 CustomLayer 而非依賴 threebox，代價是要自己處理投影矩陣和光源設定，好處是完全控制渲染流程。

### 3. Supabase pg_cron 預聚合模式

這是整個專案最工程師向的決定。Supabase 的 pooler 對 API 呼叫有 **2 分鐘的 statement_timeout 硬性限制**[^16]，意思是如果你的 SQL 查詢跑超過 2 分鐘，連線會被切斷。對於每天要撈船舶軌跡、航班軌跡、國道壅塞的系統來說，直接查原始 table 會撞上這道牆。

Mini Taiwan Pulse 的解法是：**普通 table + per-day refresh function + pg_cron 定時刷新 + 薄 SELECT RPC**。每個高頻時序查詢都有對應的預聚合 table，用 Supabase 內建的 `pg_cron`[^17] 每 10-30 分鐘刷新一次，前端讀取時只是從預聚合表拉結果，穩定落在百毫秒級：

| RPC                          | 之前     | 之後  |
| ---------------------------- | -------- | ----- |
| `get_ship_trails`            | timeout  | 123ms |
| `get_flight_trails`          | timeout  | 126ms |
| `get_freeway_congestion_day` | 60s 邊緣 | 302ms |
| `get_disaster_alerts_day`    | 13.2s    | 110ms |
| `get_temperature_frames`     | 551ms    | 107ms |

這個表格直接寫在 README 裡[^3]，還附上盤點報告的連結。對熟悉 Postgres + realtime 架構的讀者來說，這幾行字比截圖更有說服力：它告訴你作者遇過真正的 production bottleneck，而且選的是正確的解法。

> **📝 策展人筆記**
> Mini Taiwan Pulse 的技術選擇幾乎都是「正確的無聊解」：Mapbox + Three.js 的 CustomLayer、Uber 開源的 H3 六角格[^18]、感知均勻的色階（Plasma / Viridis / Inferno）、log1p + gamma 正規化處理重尾分布、Supabase pg_cron 預聚合。沒有自創的視覺化技法、沒有跟風的最新 framework，每個決定都查得到 prior art。這種「沒有驚喜」的穩定工程感，是獨立專案最稀缺的品質。

## 公民科技的定義，正在被重新拉伸

「公民科技」這個詞在台灣最常被聯想到的是 g0v，一個「以資訊透明、開放成果、開放協作為核心，透過群眾草根力量關心公共事務」的社群[^19]。這個定義的重點在**群眾**：黑客松、協作、共筆、PR reviews、獎助金評審。

但 Mini Taiwan Pulse 展示的是公民科技的另一個當代樣態：**一個人、一個週末迴圈、一份 MIT 授權**。

從 2012 年 g0v 第一次黑客松的總預算視覺化，到 2020 年吳展瑋的口罩地圖，到 2026 年 Migu Cheng 的 mini-taiwan-pulse。這條光譜的一端是集體協作的現場文化，另一端是個人 commits 的慢速積累。兩端之間，有各種程度的混合：小團隊的多年維護、學生專題、政府標案的外包開源、開放文化基金會（OCF）的 g0v 公民科技創新獎助金[^20]。

這些專案共享同一個前提：**政府把資料開出來了，後面交給我們**。政府的角色是 TDX、data.gov.tw、SEGIS、CWA 這類資料基礎建設的建造者，而公民社群的角色是讓這些資料「被看見」，透過視覺化、透過 API wrapper、透過教學文章、透過應用服務、透過質詢問政 dashboard。

Mini Taiwan Pulse 在這條光譜上的位置很清楚：它不是服務型專案（沒有要解決特定問題）、不是工具型專案（沒有要讓別人重用某個 library），它是**示範型專案**。看見這個 repo 的人會想：「原來開放資料串起來可以長這樣」、「原來 TDX + Three.js + Supabase 可以做到這種程度」、「原來一個人可以做完這麼多事」。

> **📝 策展人筆記**
> 台灣開放資料生態系最稀缺的不是 API、也不是工程師，是**用好看、好理解的方式把資料展示給一般人看的示範**。Mini Taiwan Pulse 選了最高難度的題目（全國尺度 + 多資料源 + 即時更新 + 3D 視覺化），用一個獨立開發者的力量把它做到能分享出去。241 顆 star 的數字，重要性不在於絕對數字，而在於它證明了這條路徑可行。

## 可以做得更多的事

Mini Taiwan Pulse 目前是示範性作品，不是產品：

- **沒有發布 release**：193 個 commits 但 0 個 release tag，部署是 Docker + Nginx 自架[^3]
- **部分資料源需要自己申請 API key**：FlightRadar24 商業 API、CWA 開放資料平台 API key、TDX 會員認證（OIDC Client Credentials flow）都要讀者自行設定[^6]
- **公開 demo 網址尚未揭露**：README 沒有放 live demo link，目前要看效果只能 clone 下來自己跑
- **只有 1 個 open issue、0 個 PR**：社群協作還沒起來，這是示範性專案的典型階段

但這些都是可以改變的事。一個 repo 有 241 顆 star，就表示有 241 個人按下了「我想追蹤」。如果 Migu Cheng 決定把它推成公共服務，或者把核心元件拆成可重用 library，或者上架到 `grants.g0v.tw` 申請獎助金[^20]，這個專案的下一階段會長什麼樣，是一個值得觀察的開放問題。

## 為什麼值得被策展

Taiwan.md 選擇把 Mini Taiwan Pulse 從[資源清單](/resources/mini-taiwan-pulse)升級為科技分類下的深度文章，有三個理由：

1. **它不是新聞事件，是代表性樣本**。台灣開放資料圈的 2026 年一定有很多 commits、很多 star，但 Mini Taiwan Pulse 在「一個人做多遠」這個維度上是少見的參考點。
2. **它把抽象的「公民科技」長出具體的形狀**。大多數人談公民科技會講 g0v、講 Audrey Tang、講口罩地圖；但 2026 年的公民科技可以是一個資料分析師週末寫 TypeScript 的樣子。這不是替代 g0v 的敘事，是擴充它。
3. **它讓讀者看到政府開放資料的真實潛力**。如果你讀完 [數位身分證與數位政府](/technology/數位身分證與數位政府) 或 [開源社群與g0v](/technology/開源社群與g0v) 還覺得開放資料是抽象概念，Mini Taiwan Pulse 就是那個「你看，這就是資料變成風景的樣子」的註腳。

一個資料分析師，六週，193 個 commits，23 個圖層，一張會呼吸的台灣島。

這就是 2026 年公民科技的其中一種樣子。

---

## 延伸閱讀

- [開源社群與g0v](/technology/開源社群與g0v) — 從 2012 年 fork 政府到 2020 年口罩地圖的十年軌跡
- [台灣開源精神](/technology/台灣開源精神) — 台灣開源社群的文化脈絡與貢獻模式
- [數位身分證與數位政府](/technology/數位身分證與數位政府) — 政府數位基礎建設的政策層
- [PTT批踢踢](/technology/PTT批踢踢) — 台灣網路協作文化的另一條根源
- [吳哲宇](/people/吳哲宇) — 另一種公民科技樣貌：一個新媒體藝術家用 Markdown 和 GitHub 為台灣知識主權搭建 SSOT

---

## 專案連結

- **GitHub repo**：[ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **授權**：MIT License
- **主要語言**：TypeScript 86.1% / Python 12.9%
- **相關資料平台**：[TDX 運輸資料流通服務](https://tdx.transportdata.tw/) · [政府資料開放平臺](https://data.gov.tw/) · [SEGIS 社會經濟資料服務平台](https://segis.moi.gov.tw/) · [中央氣象署開放資料](https://opendata.cwa.gov.tw/)
- **公民科技社群**：[g0v 台灣零時政府](https://g0v.tw/) · [g0v 公民科技創新獎助金](https://grants.g0v.tw/)

---

## 參考資料

- [mini-taiwan-pulse GitHub repo](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- [TDX 運輸資料流通服務](https://tdx.transportdata.tw/)
- [政府資料開放平臺 data.gov.tw](https://data.gov.tw/)
- [SEGIS 社會經濟資料服務平台](https://segis.moi.gov.tw/)
- [中央氣象署開放資料平臺](https://opendata.cwa.gov.tw/)
- [NCDR 災防中心資料服務平台](https://datahub.ncdr.nat.gov.tw/)
- [g0v 台灣零時政府](https://g0v.tw/)
- [g0v 公民科技創新獎助金](https://grants.g0v.tw/)
- [g0v 黑客松揪松網](https://jothon.g0v.tw/)
- [Supabase pg_cron 文件](https://supabase.com/docs/guides/database/extensions/pg_cron)
- [Uber H3 六角格索引](https://h3geo.org/)
- [OpenStreetMap Taiwan 開放街圖台灣](https://osm.tw/)
- [threebox：Mapbox + Three.js plugin](https://github.com/jscastro76/threebox)
- [一手打造口罩地圖，揭露「鍵盤救國」的幕後團隊（TechNews 2020）](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/)

---

[^1]: [Migu Cheng (ianlkl11234s) · GitHub](https://github.com/ianlkl11234s) — 開發者 profile，bio 為「Senior Data Analyst. Exploring AI automation in daily work.」，帳號創建於 2020-03-07

[^2]: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse) — 專案 repo，數據取自 2026-04-19 GitHub API：193 commits、241 stars、12 forks、1 open issue

[^3]: [mini-taiwan-pulse README](https://github.com/ianlkl11234s/mini-taiwan-pulse/blob/main/README.md) — 專案完整技術文檔，含圖層列表、技術棧、Overlay Registry / CustomLayer / Supabase pg_cron 架構說明

[^4]: [Flightradar24 | Flight Tracker](https://www.flightradar24.com/) — 全球航班即時追蹤服務，由 ADS-B 接收器組成的追蹤網路

[^5]: [OpenStreetMap Taiwan 開放街圖台灣](https://osm.tw/) — 台灣 OSM 社群入口，Overpass API 可查詢軌道、站點、機場邊界等 OSM 標籤資料

[^6]: [TDX 運輸資料流通服務](https://tdx.transportdata.tw/) — 交通部 2022 年整合五大平臺的運輸開放資料單一入口，提供公路、鐵道、航空、航運、自行車的 OData 標準 API

[^7]: [SEGIS 社會經濟資料服務平台](https://segis.moi.gov.tw/) — 內政部建置的社會經濟資料 GIS 平臺，提供到村里級別的人口統計空間圖層

[^8]: [中央氣象署開放資料平臺](https://opendata.cwa.gov.tw/) — CWA 的 Open API，提供觀測、預報、格點、雷達、衛星等資料集

[^9]: [NCDR 災防中心資料服務平台](https://datahub.ncdr.nat.gov.tw/) — 國家災害防救科技中心的 CAP 示警 feed 與災害事件 API

[^10]: [RSS服務 | 中央社 CNA](https://www.cna.com.tw/about/rss.aspx) — 中央通訊社公開 RSS 訂閱，提供標題、前言、連結、特色圖片

[^11]: [政府資料開放平臺 data.gov.tw](https://data.gov.tw/) — 國家發展委員會營運的政府開放資料單一入口，2013 年上線

[^12]: [一手打造口罩地圖，揭露「鍵盤救國」的幕後團隊 | TechNews 科技新報](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/) — 吳展瑋與好想工作室在 72 小時內串起全國 6,000+ 家健保藥局口罩庫存的過程

[^13]: [關於揪松團 - g0v 黑客松](https://jothon.g0v.tw/about/) — g0v 黑客松累積 59+ 次、7,200+ 參加人次、950+ 提案的統計數字

[^14]: [mini-taiwan-pulse docs/known-issues.md](https://github.com/ianlkl11234s/mini-taiwan-pulse/commits/main) — commit `docs: known-issues 補 2026-04-09 IO 爆表事件紀錄` 等工程日誌

[^15]: [threebox - A three.js plugin for Mapbox GL JS](https://github.com/jscastro76/threebox) — Mapbox + Three.js 整合的代表性第三方 library

[^16]: [Supabase Docs | Timeouts](https://supabase.com/docs/guides/database/postgres/timeouts) — Supabase pooler 的 statement_timeout 預設為 2 分鐘，超時連線會被切斷

[^17]: [pg_cron: Schedule Recurring Jobs in Postgres | Supabase Docs](https://supabase.com/docs/guides/database/extensions/pg_cron) — Supabase 內建的 cron 排程機制，用於資料庫內的定時 job

[^18]: [Uber H3: Hexagonal Hierarchical Spatial Index](https://h3geo.org/) — Uber 開源的六角形地理網格系統，Apache 2 授權

[^19]: [g0v 台灣零時政府](https://g0v.tw/) — 2012 年起的公民科技社群，以資訊透明、開放成果、開放協作為核心

[^20]: [g0v 公民科技創新獎助金](https://grants.g0v.tw/) — 由開放文化基金會（OCF）執行的公民科技專案獎助金

---

_最後驗證：2026-04-19_
