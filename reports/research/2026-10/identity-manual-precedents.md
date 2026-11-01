# 完整識別手冊的先例研究（給 Taiwan.md）

> 研究日期：2026-10-22。範圍：A 知識與公共機構、B 台灣案例、C 開源專案、D 生成式識別、E 圖示規範。
> 讀法：每個案例都標「來源」。我直接開頁讀過的標「已讀」；網站擋機器人（403 或 Cloudflare）、只看到搜尋摘要的標「搜尋摘要，未開頁」；查不到就寫「查不到」，不補猜測。
> 這份是研究底稿，不是決策。哪些要採用，由哲宇決定。

---

## 0. 先講結論裡最重要的三件事

1. **台灣的識別案例，公開到「能拿來學」的很少。** 我挑了 8 個查得出來的台灣案例（觀光署、公視+、台電與中油、勤美術館、嘉義市立美術館、南科考古館、台北卡、台南市城市識別）。其中只有公視+ 把「識別使用指南」整份公開成 PDF，我逐頁讀過。其餘多半只有新聞稿與設計師訪談，沒有可下載的規範。
2. **國外成熟的開源與公共機構，手冊的重點不在標誌長什麼樣，而在「誰可以怎麼用」。** Wikimedia、Python、Rust、Mozilla、Linux Foundation、Creative Commons 全都把「不用問就能用／要問／不能用」寫成三段清單。這正是 Taiwan.md 被 fork 時最需要的東西。
3. **圖示規範寫得最硬的是 Lucide。** 它用「必須／應該／可以」三級語氣，把格線、線寬、圓角、間距、命名、無障礙全部寫成可檢查的句子。Taiwan.md 既有的圖示庫（`src/icons/taiwan-icons.mjs`，24 單位格線、1.5 線寬）可以直接對照補規範。

---

## A. 知識與公共機構

### A1. Wikipedia 與 Wikimedia

**誰做的、什麼時候**

- 拼圖球：2003 年徵件，Paul Stansifer 的未完成拼圖球勝出；David Friedland（用戶名 Nohat）改成每塊拼圖放一個字元；英文維基 2003-09-26 採用。2010 年 5 月重繪：2009 年底啟動，原因是縮小後效果差、字母變形；補了 3D 模型、修正字元，字標從 Hoefler Text 換成開源字體 Linux Libertine。2014-10-24 基金會以 CC BY-SA 3.0 釋出標誌。來源（已讀）：[Wikipedia logo](https://en.wikipedia.org/wiki/Wikipedia_logo)。
- 基金會標誌（圓形符號加字標）：2005 年由 Neolux 設計，字標用開源字體 Montserrat。來源（已讀）：[Meta Brand/logo](https://meta.wikimedia.org/wiki/Brand/logo)。
- 2020-01-23 基金會宣布請 Snøhetta 重做整體視覺識別，過程公開、請志工社群逐步參與，進度放在 brandingwikipedia.org。Snøhetta 自己列的專案期間是 2019 至 2022。來源（已讀）：[It's Nice That](https://itsnicethat.com/news/snohetta-wikipedia-rebrand-graphic-design-230120)、[Snøhetta 專案頁](https://old.snohetta.com/projects/488-new-visual-identity-for-the-wikipedia-movement)。這個案子最後交付的完整手冊內容，我沒找到單一文件，查不到。
- 2025 至 2026 年的 Wikipedia 25 週年工具包：識別建在拼圖塊上，提供給各社群自己用。來源（已讀）：[Wikipedia 25 Celebration toolkit](https://meta.wikimedia.org/wiki/Wikipedia_25/Celebration_toolkit)。

**核心概念（一句話）**：一個分散的志工運動，靠「共同的視覺結構」讓外人認得出來，而不是靠一個不能動的標誌。Meta 品牌入口頁自己說，目的是讓去中心化的志工運動保持可辨識。來源（已讀）：[Meta Brand](https://meta.wikimedia.org/wiki/Brand)。

**手冊章節結構**

- 品牌入口頁（傳播部門維護）：標誌、字體、色彩、圖像、製作（標誌／社群貼文／簡報的範本）、署名、資源。來源（已讀）：[Meta Brand](https://meta.wikimedia.org/wiki/Brand)。
- 標誌頁：基金會標誌（橫式、直式、黑白）、社群標誌系統（分會與用戶組標誌）、Wikipedia 與 Wikimedia 的關係、標誌國際化、favicon、音效標誌；最後一章是與外部夥伴聯名。來源（已讀）：[Brand/logo](https://meta.wikimedia.org/wiki/Brand/logo)。
- 字體：主字體 Montserrat，長文用 Source Serif 4，非拉丁文字預設用 Noto；規定盡量只用 Regular 與 Bold，字級與字重越少越好。來源（已讀）：[Brand/Typography](https://meta.wikimedia.org/wiki/Brand/Typography)。
- 商標政策：先一段白話摘要，再分七節（範圍、怎麼用、可自由使用、需許可、禁止、通報濫用、修訂與翻譯）。來源（已讀）：[Trademark policy](https://foundation.wikimedia.org/wiki/Policy:Trademark_policy)。

**具體規則（已讀）**

- 標誌最小寬度 12 公釐（36 像素）；淨空是符號裡小圓圈高度的 1 倍；偏好放左上或左下。右至左的語言要把標誌順序翻轉，但符號本身不鏡射。
- 社群標誌（Community logo）可以讓用戶組自由使用與改作；想做「基金會風格加自己名字」的分會標誌要經基金會核准。
- 「自己做標誌」一節的規則是結構性的：符號與字的關係固定、符號與字之間的距離等於行距、國家或組織名稱不得比 WIKIMEDIA 這個字更寬。錯誤示範（壓扁、換圖、換色、反轉、換字體）以「這樣會壞掉品牌」的口吻寫，並說明這節採輕鬆路線。來源（已讀）：[Brand/Marks](https://meta.wikimedia.org/wiki/Brand/Marks)。
- 三色代碼用來標分類：綠 #339966、藍 #0063BF、紅 #990000。同上頁。
- 商標政策的三段：不用問（在維基網站上隨意改作標誌、社群活動與推廣、評論與諷刺、自己用的 T 恤或蛋糕但不賣）；要問（快速授權給攝影比賽與 GLAM 專案、一般授權給活動與出版與商品、含 Wikimedia 字樣的網域）；禁止（仿造維基網站的外觀、用標誌導向非維基網站、冒稱背書）。來源（已讀）：[Trademark policy](https://foundation.wikimedia.org/wiki/Policy:Trademark_policy)。
- Wikipedia 25 工具包：拼圖塊簡化成可進格線、照片遮罩、圖示的單元；裁切時至少留一個凸榫與一個缺口；附「Puzzle Brush」這類讓社群自己生圖示的工具；共 22 節，從標誌、色彩、字體、社群貼文版型、圖示、動畫到商品。來源（已讀）：[同上](https://meta.wikimedia.org/wiki/Wikipedia_25/Celebration_toolkit)。

**最值得借的一招**：把「社群自己改」寫成一等公民。Wikimedia 不是禁止改，而是規定「改的時候哪些關係不能動」，並把自由使用、快速授權、一般授權分成三層。Wikipedia 25 工具包再往前一步，直接給社群生圖示的工具。

**不適合 Taiwan.md 的地方**

- 商標政策是基金會法務文件，需要法人、商標註冊與專人審核。Taiwan.md 沒有這些，照抄會變成沒人執行的條文。
- 拼圖球靠的是「每塊一個字元」的多語系意象，Taiwan.md 的核心物（台灣、島、等高線）不一樣，借結構、不借圖。
- Wikimedia 的標誌頁沒有寫最小尺寸與淨空以外的光學規則（例如小尺寸簡化版），它自己標示為輕鬆路線；Taiwan.md 的 favicon 與 16 像素尺寸要自己補。

### A2. GOV.UK 識別與 GOV.UK Design System

**誰做的、什麼時候**

- Design System：英國政府數位服務局（GDS）2018-06-22 宣布可用，把原本散在 Service Manual、GOV.UK Elements、Prototype Kit、Template、Frontend Toolkit 的樣式、元件、模式收攏；由跨部門工作小組審核社群提案，三個月核可了六個新項目。來源（已讀）：[GDS blog](https://gds.blog.gov.uk/2018/06/22/introducing-the-gov-uk-design-system/)。
- 品牌更新：2025 年 6 月起。logo 加入色彩（藍底、青綠色的點、點抬離基線）。報導說成本約 53.2 萬英鎊，M&C Saatchi 持有兩份合約，合計上限 75 萬英鎊。來源（已讀）：[PublicTechnology](https://www.publictechnology.net/2025/06/30/society-and-welfare/gds-unveils-colourful-500k-refresh-of-gov-uk/)。設計界也有質疑：部長拒絕公開研究（標題與摘要，搜尋摘要，未開頁）：[Design Week](https://www.designweek.co.uk/ministers-wont-release-research-behind-gov-uk-brand-refresh/)。
- 字體 GDS Transport：以 1960 年代 Jock Kinneir 與 Margaret Calvert 的公路標誌字為底，GDS 2012 年改為數位用，只有 Light 與 Bold 兩個字重。來源（已讀）：[brand 字體頁](https://brand.design-system.service.gov.uk/typography)。

**核心概念**：政府網站的識別是「讓人找得到、看得懂、信得過」，並且分成「一致」與「連貫」兩件事。一致是核心元素每處都用同一種方式；連貫是這些元素可以隨情境調整而不失身分。來源（已讀）：[Brand in use](https://brand.design-system.service.gov.uk/brand-in-use)。

**手冊章節結構（已讀）**

- 品牌指南站七節：介紹、圖形裝置（那顆點）、標誌系統、色彩、字體、資料（圖表、儀表板、地圖）、使用中的品牌（網頁、App、社群）。資產放在 GitHub 的 `govuk-brand-assets` 倉庫，內容採 Open Government Licence v3.0。來源：[Brand guidelines 首頁](https://brand.design-system.service.gov.uk/)。
- 標誌系統：字標是主要識別，皇冠是支援元素「必須在場、靠近字標」，兩者組成鎖定版（lock-up）。來源：[Logo system](https://brand.design-system.service.gov.uk/logo-system)。
- 色彩四層：主色（藍為核心）、淡色（加白）、深色（加黑）、強調色；明講對比合規的責任在使用的團隊，不是色票本身。來源：[Colour](https://brand.design-system.service.gov.uk/colour)。
- Design System 本身：開始用、樣式、元件、模式、社群、無障礙六節。來源（已讀）：[design-system.service.gov.uk](https://design-system.service.gov.uk/)。

**「外面的服務」怎麼處理（已讀）**：服務在 gov.uk 網域下就必須長得像 GOV.UK；不在 gov.uk 網域的服務，仍可用模式與前端程式碼，但不得自稱是 GOV.UK 的一部分，不得在頁首用皇冠或 GOV.UK 字標，不得用 GDS Transport 字體與品牌色，要用自己機構的標誌與字體。來源：[Making your service look like GOV.UK](https://www.gov.uk/service-manual/design/making-your-service-look-like-govuk)。

**最值得借的一招**：把「可共用的系統」與「不可共用的身分」切開。模式、元件、版型人人可用；名稱、皇冠、字體、品牌色只屬於本體。再配上「一致 vs 連貫」這組定義，剛好回答 fork 的疑問：Japan.md 該跟 Taiwan.md 一致什麼、可以自己連貫什麼。

**不適合 Taiwan.md 的地方**

- 皇冠代表國家權威與信任。Taiwan.md 不是政府單位，識別裡不能有任何「官方」暗示。
- 預算與合約規模（數十萬英鎊、專案團隊、研究）不能類比。
- 該站規定的是「政府團隊如何在官方頻道用」，沒有處理外部社群改作的授權，這一塊要去 Wikimedia 與 Python 找答案。

### A3. Internet Archive

- 誰做的、什麼時候：標誌是一座希臘神殿式的柱廊建築意象；我只在二手報導摘錄看到創辦人說總部房子與標誌相符（搜尋摘要，未開頁）：[pxlnv 轉述 New Yorker](https://pxlnv.com/linklog/what-the-web-said-yesterday)。設計者與年份查不到。
- 手冊：**查不到官方的識別手冊或標誌使用規範。** 搜尋只找到第三方聚合站提供嵌入式標誌 API（搜尋摘要，未開頁）：[logo.dev](https://www.logo.dev/search/brands/archive.org)。
- 最值得借的一招：沒有。這個案例的用處是反例，一個極度被引用的知識機構，若沒有官方資產頁，外界就會由第三方來定義它的標誌怎麼取得。
- 不適合：不能當範式，只能當警示。

### A4. Smithsonian（美國史密森尼學會）

**誰做的、什麼時候**：紐約的 Chermayeff & Geismar 重新設計日芒標誌與字標，取代各博物館與研究單位各自的 logo；Office of Public Affairs 與 Ivan Chermayeff 合作出了《Smithsonian Design Guidelines》。這段來自學會檔案館的檔案說明（搜尋摘要，未開頁）：[SIA finding aid](https://siarchives.si.edu/findingaids/FA07-147.htm)。年份我沒在官方頁面確認，查不到。現行的品牌站是 logo.si.edu，網頁品牌指南 v1.1 日期為 2022-10-01（已讀 PDF）：[si_brandguide_WEB.pdf](https://logo.si.edu/wp-content/uploads/2023/05/si_brandguide_WEB.pdf)。

**核心概念**：一個母體標誌統領一百多個子單位，子單位用「品牌列」（brand bar）標示自己屬於母體，但可以保留自己的色票與標誌。

**章節結構（已讀 PDF，網頁品牌篇）**：網頁品牌標準（必須標明單位與隸屬、必須連回 si.edu、隱私與使用條款連結、網域用 si.edu、贊助商標示）→ 網頁設計準則（桌面與手機的品牌列、色彩變化與 WCAG 對比、響應式 logo 拆解、favicon 選項）。首頁寫明「識別指南永遠是進行中的作品」。

**具體規則（已讀）**

- 品牌列預設史密森尼黑（#101820）配白色 logo，或改成配合單位色票；logo 要連到 si.edu；手機版為省空間可以把品牌放進導覽。
- favicon 三個選項：A 是只留給母站的配色；B 可用白日芒配黑底；C 用單位自己的符號。
- 單位網站色彩要自己確認符合 WCAG 對比。

**最值得借的一招**：品牌列。一條固定的細條，標明「這站是誰的分支」，連回母體，單位自己的配色與標誌不用動。對 Taiwan.md 的 fork（Japan.md 等）來說，這比「全套搬過去」現實，也讓 Taiwan.md 的譜系可見（CLAUDE.md 也提到 fork 要讓譜系可見，否則對母體是隱形的）。

**不適合 Taiwan.md 的地方**

- 要求所有單位用母體網域與由資訊長辦公室管理網域，是中央集權作法，開源社群不可能這樣管。
- 官方標誌頁目前會回 403 或暫時無法使用（2026-10-22 測），有些章節我只能從 PDF 與搜尋摘要拼出。

### A5. 國家文化記憶庫（台灣）與國家圖書館

- 誰做、什麼時候：文化部 2017 年啟動、2020 年入口網站開通、2021 年起由國立臺灣歷史博物館接手；2022 年推出 2.0 網站；2025-12-31 起統一以「國家文化記憶庫」名稱對外服務。來源（已讀）：[簡介](https://tcmb.culture.tw/zh-tw/introduction)。
- 識別：簡介頁沒有描述標誌或視覺識別，**標誌設計理念、設計者、規範手冊都查不到**。內容端強調「清楚的授權標示」，並另有資料授權規範頁（沒讀到全文）。
- 國家圖書館的識別：**查不到**（我沒找到可信的一手資料）。
- 值得借的一點：它把「授權標示」放在資料層，每筆資料有清楚的授權說明。這和識別手冊無關，但對 Taiwan.md 的圖像授權欄位（README 說所有圖片來自 Wikimedia Commons 並附授權）是同一類做法。
- 不適合：沒有可學的識別規範。

### A6. Europeana（歐洲數位文化遺產入口）

這一項的官方頁面對機器人回 403 或 Cloudflare 擋牆，下面都來自搜尋摘要，未開頁，請當作線索：

- 品牌指南頁說，logo 是唯一用來標示「屬於或受 Europeana 倡議支持」的視覺識別，不得更動，有黑與白兩色，依背景對比挑選；橫式為主，另有直式，各自有最小邊距：[pro.europeana.eu 品牌指南](https://pro.europeana.eu/page/brand-guidelines)。
- 視覺設計放在一個 Confluence 活文件空間：包含倡議本體、共同歐洲文化遺產資料空間的視覺品牌指南、UX 與 UI 指南、部落格。主標誌（夥伴與活動可用）與產品標誌（只給自家平台）分開，品牌架構圖標示為 2024 年 3 月：[Europeana Confluence](https://europeana.atlassian.net/wiki/spaces/DB/overview)、[Logo 頁](https://europeana.atlassian.net/wiki/spaces/DB/pages/2195324929)。
- 該空間的說明指出，合作夥伴專案不應取得完整品牌指南，有標誌問題時指向標誌頁。這是「分層開放」的做法。
- 2020 年的品牌策略建議文章標題找得到，但內文建議沒讀到，**查不到**：[Strategy 2020 brand recommendations](https://leuven2012.europeana.eu/post/europeana-strategy-2020-brand-recommendations)。

最值得借的一招：主標誌與產品標誌分開，夥伴只拿標誌頁不拿全手冊。不適合：它是多國夥伴聯盟，品牌架構的複雜度遠超 Taiwan.md。

---

## B. 台灣的識別案例

我找到並讀過的有 8 個。以下標示每個案例的資料完整度。

### B1. 交通部觀光署「TAIWAN – Waves of Wonder」（觀光品牌 3.0）

- 誰做、什麼時候：觀光署 2024-05-06 發表。署長談話提到 1.0 是 Touch Your Heart，2.0 是 Heart of Asia，這次是 3.0；3.0 取代用了 13 年的 Heart of Asia。行政院網站把它列為「臺灣觀光品牌3.0」。來源（已讀）：[TTG Asia 2024-05-15](https://www.ttgasia.com/?p=99215)、[行政院觀光施政重點](https://www.ey.gov.tw/state/F5581D43B76205AA/6e0df370-3a0d-4e55-b81f-c16e23898dc8)；5 月 6 日這個日期來自 PRNewswire 轉載（搜尋摘要，未開頁）：[jotup.co](https://jotup.co/ko/node/2852344)。
- 核心概念：山、海、蜿蜒的道路與鐵道組成波浪形輪廓，日出般的橘色，呼應前一版的溫暖。配套有動畫短片與主題曲（侯志堅作曲）。來源（已讀）：TTG Asia 同上。
- 設計者：搜尋結果列出 dentsu Taiwan 的專案頁，但我開不了該頁（404），**設計團隊細節查不到**；另有說法提到合作方 Bito，我在兩篇原文都沒找到，不採用。
- 品牌手冊與業者可用素材下載：**查不到。**
- 最值得借：品牌用「版本號」命名（1.0、2.0、3.0），讓演進軌跡一目了然。
- 不適合：以旅遊行銷與海外推廣為目的，口號導向；沒看到公開的規範。

### B2. 公視+ 識別使用指南（公開版 V.1，2023-08-02）

這是我唯一逐頁讀過的台灣識別手冊。來源（已讀）：[PTS+ guide PDF](https://info-material.pts.org.tw/download/PTS+guide.pdf)。注意這是公視+ 串流平台的識別，不是整個公視。設計者文件中沒寫，查不到。

- 核心概念：標誌由「圖像」與「文字」組成；圖像是方塊拼成的 P 形，色塊在藍與桃紅之間；文字是「公視」字標右上帶一個加號。文件說明，因應公視+ 提供多元影視故事、觀點紀錄、議題討論的方向，以這些公眾性格的基本單元作為品牌意象。
- 章節結構（目錄頁）：
  - Part A 標誌組合與基本規範：完整標誌、純圖像與淨空範圍、純文字與淨空範圍、完整直式組合、完整橫式組合、版位放置示範、Logo 排列示範、識別用字體、錯誤使用、系列產品標誌組合。
  - Part B-1 色彩與延伸應用 Dual 款：色彩計劃、使用時機、使用時機二。
- 值得注意的規格寫法（都是頁面上的數字）：
  - 淨空以標誌寬度 X 為單位：純圖像四周至少 1/3 X；app icon 用 1/6 X；純文字上與右 3X、下與左 2X。
  - 最小尺寸印刷與數位雙寫：直式 25 公釐與 60 像素；橫式 L 型 45 公釐與 100 像素；橫式 S 型 20 公釐與 50 像素。
  - 「Logo 排列示範」頁把公視+ 標誌與有閑（JollyBuy）、今日新聞、酷瞧並排，說明並列時間距不得小於各自的淨空，這是夥伴共同露出的示範。
  - PDF 元資料顯示用了 Quatro 與 Taipei Sans TC Beta 兩套字體（從檔案資訊讀出，不是頁面文字）。
- 最值得借的一招：「公開版」的概念加上版本與日期（V.1、2023-08-02）；所有規格都用 X 單位與雙單位最小尺寸；並列 logo 的示範。
- 不適合：沒有授權條款，只回答「怎麼擺」，沒回答「誰可以用」。這是品牌資產手冊，對外部重製沒有設計。

### B3. 台電與中油的標誌優化案（2026 年 5 月的爭議）

這是新近的案例，價值在反面教材。

- 事實：台電「識別系統優化設計」案 2024-01-03 決標、01-15 公告、2025 年 1 月結案，金額 96 萬 8940 元，由永真急制設計工作室（聶永真）得標。來源（已讀）：[ETtoday 2026-05-11](https://www.ettoday.net/news/20260511/3164161.htm)。中油另有一件標誌優化案，金額約 98 萬元，董事長在 5 月 11 日表示暫緩（搜尋摘要，未開頁）：[ETtoday 財經](https://finance.ettoday.net/news/3164814)。
- 台電的說明：新標誌主要用在數位場景（App、名片、印刷品先換），招牌、人孔蓋、車輛維持現狀。來源（已讀）：[聯合報 2026-05-11](https://udn.com/news/story/7238/9495427)。
- 手冊是否公開：報導沒有提及，**查不到**。
- 學到什麼：識別更新沒有公開說明用途、範圍與過渡期，結案一年多後才被翻出來，變成「浪費公帑」的論戰。更新識別的最大成本不是設計費，是沒寫清楚「哪些換、哪些不換、為什麼」。
- 不適合：台電是公營事業，案子受採購法約束；Taiwan.md 不會碰到這類流程。可借的是「範圍與過渡期寫在最前面」。

### B4. 台中勤美術館（2024）

- 誰做、什麼時候：2024-11-14 公開、12-13 開館。品牌識別由兩個八月（設計總監莊瑞豪、盧袗雲），公共家具由生活起物，制服由甫月。來源（已讀）：[Shopping Design](https://www.shoppingdesign.com.tw/post/view/11193)。
- 核心概念：標誌取自館名字體輪廓，中段以高比例留白製造轉折，筆畫尾端變成延伸的圖像；觀者要自己從留白猜出字與圖的關係。
- 手冊：**查不到。**
- 最值得借：識別延伸到制服與家具，由不同團隊執行同一套視覺語言。對應 Taiwan.md 的是「同一套語彙可以分給不同貢獻者」。
- 不適合：靠留白與猜謎的標誌需要大尺寸才成立，小圖示與 favicon 不適合。

### B5. 嘉義市立美術館（2020）

- 誰做、什麼時候：莊濟寰（角白設計），文章發布於 2020-12-07，館剛落成。來源（已讀）：[Shopping Design](https://www.shoppingdesign.com.tw/post/view/6138)。
- 核心概念：「+1」與「嘉義」諧音，「+」代表參與、「1」代表市民；巧合的是建築俯瞰的外形也像「+1」。客製黑體與標誌用同一套幾何邏輯；完成後另外發展完整的 VI 使用準則；指標字體另選文鼎 UD 晶熙黑體，理由是大字面、遠看不糊。
- 最值得借：概念同時綁定「諧音（可說出口）」與「建築外形（可驗證）」兩個錨，不是只靠形容詞。導視字體另外選，不硬用標準字，因為目的不同。
- 不適合：靠中文諧音，無法直接移到多語版本。

### B6. 國立臺灣史前文化博物館南科考古館

- 來源（已讀）：[國立臺灣史前文化博物館館訊](https://beta.nmp.gov.tw/enews/no391/page_01.html)。
- 概念：南科考古館是史前館的分館，館徽同時要滿足三件事：考古元素、與本館的連結、建築語彙。核心是五間厝遺址出土的鹿角刀柄人面紋，搭配本館的楷書字體、方形外框，與傾斜 19 度的黃色方塊，黑與黃為主輔色。
- 最值得借：子品牌如何連回母體。分館沿用母館的字體與外框，自己加新元素。這和 fork 想做的事一樣，是母體與分支的視覺關係。
- 不適合：館徽是單一標誌，沒有談授權與外部使用。

### B7. 台北卡（2020）

- 來源（已讀）：[城市學 2020-08-20](https://city.gvm.com.tw/article/74135)。
- 優視覺（溝通設計總監王德明）與台北市城市品牌小組顧問蕭伶伃推動。識別以「北」字為主，依身分換意象：長者卡用老花眼鏡、學生卡用學士帽。改版範圍是整個使用者介面體驗，不只卡面。
- 台北市整體城市識別手冊：**查不到。** 台北市市徽另有一套設計，與台北卡不同（搜尋摘要，未開頁）。
- 最值得借：同一個核心字，依對象換小意象，這是「系統」的最小形式。
- 不適合：沒看到規範與授權說明。

### B8. 台南市城市品牌識別（2026）

- 來源（已讀）：[聯合報](https://udn.com/news/story/7326/9667398)；補充說明（搜尋摘要，未開頁）：[自由時報](https://news.ltn.com.tw/news/Tainan/breakingnews/5521166)。
- 事實：規劃案 2024 年編列，市府投入 250 萬元，2026 年正式亮相；市府說這是「城市識別系統」，不是新市徽，兩者並行，不是取代。報導指出該識別以「N」字為主（搜尋摘要）。設計者、手冊是否公開，報導沒寫，**查不到**。
- 最值得借：公開講清楚「它不取代市徽，兩者並行」。
- 不適合：同樣停在新聞層，沒看到可下載規範。

### B9. 我查不到或只能部分確認的台灣案例（照實列出）

| 案例                               | 我能確認的                                                                                                                                                                                                                                                                           | 查不到                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| 台灣設計研究院（TDRI）             | 2020 年成立，前身是 2003 年成立的台灣設計中心（官網關於頁，已讀：[tdri.org.tw](https://www.tdri.org.tw/en/about/about-tdri)）                                                                                                                                                        | 標誌設計者、設計理念、是否有公開手冊 |
| 國立臺灣博物館、國立臺灣歷史博物館 | 無                                                                                                                                                                                                                                                                                   | 新識別發表資料全部查不到             |
| 文化部                             | 無                                                                                                                                                                                                                                                                                   | 識別系統與手冊查不到                 |
| 故宮新識別（2022 前後）            | 我沒找到 2022 年的新識別資料。只找到 2025 年百年院慶的 Logo 設計競賽簡章，主題含「100」與「+」（搜尋摘要，未開頁）：[簡章 PDF](https://cdd.stust.edu.tw/Sysid/cdd/files/attachfile/guid/s_29814_e7cb65c2-528c-45e6-b207-9617eedbdacb/「國立故宮博物院100⁺院慶Logo設計競賽」簡章.pdf) | 2022 年新識別是否存在、設計者        |
| 報導者 The Reporter                | 搜尋只找到其開源前端倉庫與 npm 套件（搜尋摘要）                                                                                                                                                                                                                                      | 品牌識別、標誌設計、設計系統文件     |
| 天下雜誌                           | 無（只找到內容改版，不是標誌）                                                                                                                                                                                                                                                       | 標誌與識別資料                       |

**給哲宇：** 上表那幾個我連官方頁都沒讀到，請不要把「查不到」當成「沒有」。若要補，建議直接寫信給各單位，或請有人脈的朋友問。報導者與天下特別值得補問，因為它們是台灣媒體，與 Taiwan.md 的處境最接近。

### B 區小結：台灣案例共同的缺口

1. 八個案例裡，只有公視+ 把規範公開成檔案。其餘多半只有新聞稿。
2. 沒有任何一個台灣案例寫「外部社群可以怎麼改作」。公視+ 的「Logo 排列」只處理夥伴並列，不是授權。
3. 觀光署與台電的案例，都靠一句口號或一個設計師名字承載，缺少「使用範圍與過渡期」。

---

## C. 開源專案：怎麼讓社群合法重製、怎麼寫「可以／不可以」

### C1. Mozilla 與 Firefox

- 誰做、什麼時候：Johnson Banks 擔任設計；重塑從 2016 年 6 月開始，2017-01-18 揭曉；過程公開，用部落格收集意見與公開評論。最後的標誌「Protocol 2.0」用 URL 裡的 `://` 拼成 moz://a；是七個初始方向中四個決選的 Protocol，結合另一個叫 Burst 的方向。來源（已讀）：[Dezeen](https://www.dezeen.com/2017/01/18/mozilla-logo-open-design-process-graphics-johnson-banks-news/)、搜尋摘要（未開頁）：[Mozilla Open Design 部落格](https://blog.mozilla.org/opendesign/?p=562)。
- 字體 Zilla Slab 由 Typotheque（Peter Biľak 與 Nikola Djurek）2017 年為 Mozilla 製作，採 SIL 開放字體授權（搜尋摘要，未開頁）：[Zilla Slab 維基](https://en.wikipedia.org/wiki/Zilla_Slab)。Dezeen 說圖像庫計畫採 Creative Commons 開放貢獻，但沒有說標誌本身是否開放使用。
- Protocol 設計系統：給 Mozilla 與 Firefox 網站用，結構是基礎（設計原則、品牌主題、字體、色彩、設計代幣）、使用、貢獻，元件含標誌、字標、Zap；目前版本 22.0.0，2025-10-03 建置。來源（已讀）：[protocol.mozilla.org](https://protocol.mozilla.org/)。
- 商標政策（已讀）：[Mozilla Trademark Policy](https://www.mozilla.org/en-US/foundation/trademarks/policy/)。結構：介紹、需不需許可、一般準則（做與不做）、補充準則（軟體散布、標誌用法、附加元件、社群帳號、開源專案、雲端服務、社群許可）、聯絡。不用問：在文字中準確指稱未修改的 Mozilla 產品、說你的軟體是基於或相容於 Mozilla。要書面許可：其他所有用法，含網域。不可：放進商業或產品名稱、近似的名稱與設計、暗示背書、比自己的名字更突出、印在販售商品上、修改或組合商標。
- 品牌站：brand.mozilla.com，我能讀到的只有標題，章節與標誌授權條款**查不到**（內容靠 JavaScript 載入）。
- 最值得借的一招：「公開設計過程」與「設計系統開源」。但要注意，Mozilla 的商標政策本身並不寬鬆：標誌不可修改、不可印在販售商品上。社群重製的合法空間主要來自「可以說你基於它」，不是「可以改它的標誌」。
- 不適合：2016 至 2017 的公開設計過程有專業工作室與大量資源；Taiwan.md 可借「過程公開」，不必借「四個方向票選」。

### C2. Ubuntu（Canonical）

- 來源（已讀）：[Canonical IP policy](https://canonical.com/legal/intellectual-property-policy)、[design.ubuntu.com/brand](https://design.ubuntu.com/brand)。
- 政策結構：前言（範圍與 CC-BY-SA）、1 摘要、2 與其他授權的關係、3 你對 Ubuntu 的使用、4 你對商標的使用、5 著作權專利與外觀材料、6 標誌使用準則、7 Ubuntu 社群的使用、8 聯絡、9 變更。
- 規則：非商業的討論、開發、倡議可以用；批評、評論、諷刺可以；寫關於 Ubuntu 的文章可以，但要清楚說明不代表 Canonical；用在網域、商品、軟體名稱需要許可；改過的版本要重散布須經核准。
- 品牌站導覽：品牌、字體、Vanilla（前端框架）、無障礙、資源、貢獻；列出四個品牌價值（自由、可靠、精準、協作）。品牌站沒有談 Circle of Friends 標誌，也沒有講社群使用規則，**查不到**。
- 最值得借：「第 7 條：Ubuntu 社群的使用」，把社群當一個獨立章節處理，而不是附註。
- 不適合：Canonical 是商業公司，商標用來保護商業利益，邏輯和 Taiwan.md 不同。

### C3. Python（Python Software Foundation）

- 來源（已讀）：[PSF 商標政策](https://www.python.org/psf/trademarks/)、[標誌頁](https://www.python.org/community/logos/)。
- 政策章節：介紹、一般目標、「不需核准的用法」、「一定需核准的用法」、如何使用、範例（字、未改動標誌、衍生標誌）、備註、協助、授權。政策文字本身以 CC0 釋出，所以可以直接改編。
- 規則：說明軟體以 Python 寫成或相容，用字或未改動標誌都不用核准；商業上用在產品名或公司名要核准；衍生標誌必須與官方標誌明顯不同，只改色或字體也要許可；非商業、以 Python 為中心的使用者群與研討會可以用衍生標誌；通報濫用走商標委員會，不要自己去對質。
- 標誌頁提供 PNG、SVG、PSD、主圖檔，以及「Python Powered」寬與高兩版各四種尺寸；標誌字體 Flux Regular 歸 PSF 所有，不對外散布。
- 最值得借的一招：「衍生標誌」三條線。哪些衍生是自由的（檔案圖示、免費模組、非商業社群）、哪些要許可（商業或專有）、哪些不行（與其他標誌纏繞、混淆）。以及「Powered by」型小徽章，讓第三方有現成可用的合法標誌。
- 不適合：Python 的商標政策預設了商業使用的威脅（公司想把 Python 放進公司名），Taiwan.md 的威脅比較是「誤導與冒稱」，不是商業搶註。

### C4. Rust（Rust Foundation）

- 來源（已讀）：[Rust 商標政策](https://rustfoundation.org/policy/rust-trademark-policy/)、[標誌政策與媒體指南](http://rustfoundation.org/policies/logo-policy-and-media-guide/)。
- 政策結構：關於、藝術授權、Rust 商標、使用商標（含「不要看起來像官方、附屬或背書」、基本用法、官方原始碼來源、不需明確核准、需要明確核准）、協助。
- 關鍵設計：標誌與 Cargo 標誌以 CC-BY 4.0 釋出，允許修改與再散布，但商標規則另外管；也就是授權與商標是兩層，分開寫。
- 規則：個人或小團體自用商品可以，但不能賣；免費小型非營利活動（聚會、教學）可以；販售商品、放進另一個商標、使用 RustCon 一類名稱要書面核准；不可用「official」「original」「only」這類字眼暗示背書。
- 最值得借的一招：「藝術授權」與「商標」分成兩節。CC-BY 讓人合法改圖，商標規則再界定「改完能不能叫 Rust」。
- 不適合：基金會的政策已有法務架構。

### C5. Linux Foundation

- 來源（已讀）：[商標使用政策](https://www.linuxfoundation.org/legal/trademark-usage)、[品牌指南](https://www.linuxfoundation.org/brand-guidelines)。
- 商標政策八節：範圍與定義、Linux 商標、LF 商標、使用準則、一般商標規則與合理使用、LF 專屬規則、聯絡、免責與授權（CC-BY-4.0）。
- 品牌指南：主要標誌（直式）與次要（橫式）；變體有深色鏤空與白色；淨空以字標裡 X 的高度計；你自己的名稱要比 LF 更突出；教育材料要附「非附屬」聲明；書籍封面通常不得使用標誌；可以寫「某某是 LF 成員」；第三方商品一般不得。
- 最值得借：「成員」的說法有固定句型，可以事實陳述，不需許可。這等於替 fork 準備好一句話：「某某站基於 Taiwan.md」。
- 不適合：對商業成員與認證有大量條文，Taiwan.md 不需要。

### C6. Creative Commons

- 來源（已讀）：[CC 商標與標誌政策](https://creativecommons.org/policies/)。
- 規則：授權與公共領域標誌只用來描述適用的授權，並連到授權摘要頁；可以改標誌顏色與背景，只要兩色對比至少 3:1；修改授權文字後不可再稱 CC 授權，也不可用 CC 品牌；加上限制授權範圍的條款後不可用 CC 商標；商業推廣、活動名、周邊要許可；含 CC 名稱的網域要許可；CC 保留隨時撤銷商標許可的權利。
- 最值得借的一招：「換色合法，但對比要 3:1」，把一條美學規則寫成可驗證的數字，又給社群重製空間。
- 不適合：CC 標誌的功能是標示授權，不是代表一個站台。

### C 區小結：社群重製的三種做法

| 做法                             | 例子                                                                     | 怎麼運作                             |
| -------------------------------- | ------------------------------------------------------------------------ | ------------------------------------ |
| 標誌本身用開放授權，商標規則另寫 | Wikimedia（CC BY-SA 3.0 加商標政策）、Rust（CC-BY 加商標政策）           | 人人可改圖，改完能不能掛原名另有規則 |
| 政策文字本身開放，讓別人直接抄   | Python（CC0）、Linux Foundation（CC-BY-4.0）、Canonical（CC-BY-SA 前言） | 後來的專案可以直接改編政策           |
| 不開放標誌，只開放說法           | Mozilla                                                                  | 可說「基於」或「相容」，標誌不能改   |

---

## D. 生成式或資料驅動的識別

### D1. MIT Media Lab（2011 與其後的 Pentagram 版）

- 2011 版：TheGreenEyl、E Roon Kang、Richard The，2010 年受託為 Media Lab 25 週年而做；用 Processing 程式產生約 4 萬個標誌，12 種配色，合計約 48 萬個；由三種形狀組成，每個形狀代表一個人加入實驗室，合起來的形狀代表實驗室持續的工作。網頁介面讓每個人挑一個標誌放名片，標誌是預先產生好的，不是即時渲染。來源（已讀）：[CreativeApplications](https://www.creativeapplications.net/project/mit-media-lab-identity-processing/)、[It's Nice That](https://www.itsnicethat.com/articles/thegreeneyl-mit-media-lab-identity)。格線大小各來源說法不一（4×4 或 7×7），我不判定。
- 後續 Pentagram 版（Michael Bierut 為合夥人）：用同一個 7×7 格線做出 ML 字母組合，並把格線延伸到 23 個研究小組各自的符號，並改回 Helvetica。來源（已讀）：[Pentagram](https://www.pentagram.com/work/mit-media-lab/story)。頁面沒寫年份，你提到的 2014 我沒能在這一頁確認，請以「年份待查」處理。
- 最值得借：「一個人一個標誌」，標誌同時是組織識別與個人識別；以及「預先產生、人挑選」而不是即時隨機。這對 Taiwan.md 的貢獻者身分（每個貢獻者一個可重製的符號）有直接的啟發。
- 不適合：標誌的主體是一個沒有任何語意的抽象形狀，Taiwan.md 需要的識別有台灣的在地語意。

### D2. Casa da Música（波爾圖）

- 設計：Stefan Sagmeister 擔任創意總監，Matthias Ernstberger、Ralph Ammer、Quentin Walesch 設計。來源（已讀）：[Sagmeister 專案頁](https://sagmeister.com/work/casa-da-musica/)。Cooper Hewitt 館藏目錄記為 2007 年，2011 年入藏，並描述識別套件：從建築體積旋轉的影片導出六個有 17 個平面的建築輪廓，配色工具可從任一張圖（例如一幅畫）取出 17 個顏色填進這些平面（搜尋摘要，未開頁）：[Cooper Hewitt](https://www-4.collection.cooperhewitt.org/objects/18794271)。
- 核心概念：建築本身就是標誌，系統讓建築形狀隨音樂類型改變。
- 最值得借：「標誌是一個物件的不同視角」，系統由一個真實的、可驗證的物（建築）導出，不是任意生成。
- 不適合：它靠一棟獨特的建築。Taiwan.md 沒有對應的單一物件，島形可能是候選。

### D3. 墨爾本市（2009）

- Landor 為墨爾本市政府設計的 M 標誌，取代用了約 15 年的葉子標誌；稽核認為葉子過時、不易理解、與其他城市品牌相比較弱，而且各部門的標誌愈來愈多，城市形象破碎。目標含更好辨識城市服務、品牌更有影響力與彈性、市府內部設計與品牌管理更省時省錢。費用設計約 147,906 澳幣加前期研究 91,652 澳幣。來源（已讀）：[designboom 2009-07](https://www.designboom.com/design/landor-rebrand-melbourne/)。
- 該報導沒說明 M 如何變化與規範內容，**變化規則查不到**。
- 最值得借：「用一個母標誌收攏各部門各自的標誌」，與 Smithsonian 是同一種動機。
- 不適合：沒查到系統細節，不能當生成式範例，只能當「彈性統一標誌」範例。

### D4. Visit Nordkyn（挪威芬馬克）

- 2011 年 D&AD 木鉛筆獎。標誌以雪花為形，口號「Where nature rules」；串接挪威氣象局的即時氣象資料，依風向與氣溫改變標誌；有產生器讓 Visit Nordkyn 下載符合當下天氣的標誌。設計工作室名稱頁面沒寫，**查不到**。來源（已讀）：[D&AD](https://www.dandad.org/work/d-ad-awards-archive/where-nature-rules)。
- 最值得借：資料源是外部、可信、持續更新的（氣象局），生成規則一句話說得清。
- 不適合：標誌每一刻都不同，不利於需要穩定辨識的場合（favicon、簽名、印刷）；要有靜態備援。

### D5. Google Arts & Culture（反例）

- 這不是生成式識別，是產品圖示的更換：Google 2022 年為一個 ampersand 圖形申請商標，2023-01 隨 Android 9.5 版推出，取代原本的博物館立面圖示；2023-07 的更新把四色圖示改成白色放黑底。來源（搜尋摘要，未開頁）：[9to5Google](https://9to5google.com/2023/01/11/google-arts-culture-new-icon/)、[9to5Google 2022](https://9to5google.com/2022/08/25/google-arts-culture-rebrand-ampersand/)。我沒找到它自己的識別手冊，**查不到**。
- 為什麼放進來：它說明「跟著母公司系統走」的識別會隨母公司更新而消失原有的辨識物（博物館意象）。Taiwan.md 的 fork 若完全跟著母體走，同樣會失去自己的辨識。

### D 區小結

把「標誌是系統」寫成手冊，要多寫四件事：生成規則（一句話）、可重製性（同一輸入得到同一輸出）、靜態備援（小尺寸與印刷）、與誰共享（個人化版本的歸屬）。MIT 預先產生，Nordkyn 提供下載生成器，Casa da Música 提供配色工具，三種都是「給使用者一個工具」而不是「給一張圖」。

---

## E. 圖示系統規範

| 系統             | 格線與尺寸                                                                                                      | 線寬與形狀                                                                                                                                       | 命名                                                                                                   | 無障礙                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Material Symbols | 光學尺寸軸 20 至 48 dp，自動調整筆畫粗細（已讀）                                                                | 軸：Fill 0 至 1、Weight 100 至 700、Grade、Optical size；Material 3 設計頁列出格線、關鍵線形狀、筆畫、圓角、光學尺寸、留白六個主題，細節我沒讀到 | snake_case 連字名，如 `arrow_forward`，可用 `icon_names` 參數只載入需要的圖示                          | 該頁沒談                                                                                                       |
| Lucide           | 24×24 畫布，筆畫距邊至少 1 像素（已讀）                                                                         | 2 像素筆畫、圓角線頭與圓角接合、筆畫置中；90 度轉角：8 像素以上用 2 像素圓角、以下用 1 像素；分離元素間距至少 2 像素                             | 小寫連字號、美式英文、依「畫了什麼」命名而不是用途（例：用 `floppy-disk` 而不是 `save`）               | 預設 `aria-hidden="true"`；只有圖示單獨承載意義才加 `aria-label`；圖示在按鈕裡時，標籤加在按鈕，不加在圖示     |
| Phosphor         | 設計在 16×16 像素（已讀）                                                                                       | 六種字重：Thin、Light、Regular、Bold、Fill、Duotone                                                                                              | `<weight>/<kebab-name>-<weight>.svg`；目錄資料含名稱、舊名稱別名、碼位、分類、標籤、首發版本與更新版本 | 該倉庫文件沒談                                                                                                 |
| IBM Carbon       | 預設 16 像素，可用 20、24、32；與 IBM Plex 14 或 16 像素文字搭配（已讀）                                        | 單色實心；與文字顏色一致；與文字之間置中對齊，不用基線對齊                                                                                       | 該頁沒談                                                                                               | 對比 4.5:1（比 WCAG 對非文字的 3:1 嚴）；可點擊圖示觸控範圍至少 44 像素（例：22 像素圖示放在 48 像素的目標裡） |
| GOV.UK           | **查不到**官方圖示規範；Design System 無障礙頁只說樣式與元件以 WCAG 2.2 AA 為目標，使用系統不等於服務自動無障礙 | —                                                                                                                                                | —                                                                                                      | —                                                                                                              |

來源（已讀）：[Material Symbols 字體說明](https://developers.google.com/fonts/docs/material_symbols)、[Material 3 圖示頁（只列主題）](https://m3.material.io/styles/icons/designing-icons)、[Lucide 設計原則](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/design-principles.md)、[Lucide 規格](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/specification.md)、[Lucide 命名](https://github.com/lucide-icons/lucide/blob/main/docs/contribute/icons/naming-conventions.md)、[Lucide 無障礙](https://github.com/lucide-icons/lucide/blob/main/docs/guide/lucide/advanced/accessibility.md)、[Phosphor core](https://github.com/phosphor-icons/core)、[Phosphor 貢獻指南](https://github.com/phosphor-icons/core/blob/main/CONTRIBUTING.md)、[Carbon 圖示用法](https://carbondesignsystem.com/elements/icons/usage/)。
GOV.UK 無障礙宣告（搜尋摘要，未開頁）：[Design System 無障礙](https://design-system.service.gov.uk/accessibility)。蘇格蘭政府設計系統（不是 GOV.UK）用 Material 圖示做成 SVG，裝飾性圖示加 `aria-hidden`，並要求有實證的使用需求才加圖示（搜尋摘要，未開頁）：[designsystem.gov.scot 圖示](https://designsystem.gov.scot/styles/icons)。

**補充觀察**

- Lucide 的規格頁用「必須、應該、可以」分三級，並明講「像素對齊不得優先於圖示的視覺品質」。這句話把規則與判斷的關係寫清楚，是整份圖示規範裡最值得抄的寫法。
- Phosphor 的目錄資料（舊名稱別名、碼位、分類、標籤、首發版本）說明一件事：圖示庫的「命名穩定」靠機器可讀的清單維持，不靠文件。Phosphor 的貢獻指南也明講：因為是創作性質，通常不接受外部貢獻圖示，圖示請求走另一個倉庫。
- Taiwan.md 現況（只查了程式碼檔頭）：`src/icons/taiwan-icons.mjs` 檔頭寫明是原創的 24 單位編輯圖示，線寬 1.5 單位，開放路徑呼應等高線、偏移圓呼應海岸與島嶼關係，路徑不含使用者資料；`src/components/Icon.astro` 已有 `label` 屬性。也就是設計語言已經有了，缺的是「寫成規則」：命名、最小尺寸、什麼時候要 aria-label、跟文字的對齊方式。這是觀察，不是審查結果。

---

## F. 給 Taiwan.md 的結論

### F1. 一份好的識別手冊該有哪些章節（建議排序）

排序的理由：先前的先例多半把「怎麼用」放在標誌與色彩之後、授權放在最後。但 Taiwan.md 的處境是被 fork、被外部社群重製，**「誰可以怎麼用」是第一個會被問的問題**，所以提前。Python 把「不需核准的用法」放在政策最前面，是同一個邏輯。

| 順序 | 章節                     | 要回答的問題                                                                             | 先例對照                                                                                     |
| ---- | ------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| 0    | 版本、日期、狀態         | 這是第幾版、什麼時候更新、哪些部分還在改                                                 | 公視+ 的 V.1 與日期；Smithsonian 的「永遠是進行中」                                          |
| 1    | 這份識別是什麼、不是什麼 | 一句話的核心概念；母體與分支的關係；不暗示官方                                           | GOV.UK 的一致 vs 連貫；Wikimedia 的目的聲明                                                  |
| 2    | 誰可以怎麼用（三層）     | 不用問、署名即可、需要申請；各是什麼                                                     | Wikimedia 商標政策；Python；Rust                                                             |
| 3    | 標誌系統                 | 符號、字標、橫直組合、單色與反白、最小尺寸（印刷與數位雙寫）、淨空（用 X 單位）、favicon | 公視+ 第 4 至 13 頁；Wikimedia 標誌頁                                                        |
| 4    | 錯誤用法                 | 每條錯誤附一句理由；不只寫「不要變形」                                                   | 公視+；Wikimedia 錯誤示範                                                                    |
| 5    | 色彩                     | 色票加對比組合表（哪兩色可以搭、比值多少）；換色規則                                     | GOV.UK 四層；CC 的 3:1                                                                       |
| 6    | 字體                     | 開源字體；繁中與非拉丁備援；字級字重上限                                                 | Wikimedia 字體頁；Mozilla Zilla Slab                                                         |
| 7    | 圖示                     | 格線、線寬、圓角、間距、命名、aria 規則、與文字對齊                                      | Lucide；Carbon                                                                               |
| 8    | 資料視覺與圖像           | 圖表、地圖、照片的處理原則                                                               | GOV.UK 的「資料」章                                                                          |
| 9    | 使用情境                 | 網站、社群、簡報、文章內嵌的實例                                                         | GOV.UK 的網頁、App、社群；Smithsonian 品牌列                                                 |
| 10   | 分支與合作者             | 品牌列範本、「基於 Taiwan.md」的標準寫法、自己做標誌的結構規則、並列 logo 範例           | Smithsonian 品牌列；Wikimedia「自己做標誌」；公視+ 的 Logo 排列；Linux Foundation 的成員句型 |
| 11   | 資產與機器可讀清單       | 檔案在哪、版本、授權、舊名稱別名                                                         | govuk-brand-assets 倉庫；Phosphor 目錄資料                                                   |
| 12   | 變更紀錄與已知缺口       | 改了什麼、什麼還沒決定                                                                   | Smithsonian 的版本號；公視+ 的 V.1                                                           |

### F2. 最值得借的三招

**第一招：把社群改作寫成一等公民。** 結合 Wikimedia 的「自己做標誌」（固定結構，不固定外觀）、Python 的衍生標誌三條線、Rust 的「藝術授權與商標分兩層」。對 Taiwan.md 的具體意思是：識別的素材可以用開放授權釋出，讓 Japan.md 或任何站合法重製；另外一條規則說「重製以後能不能叫 Taiwan.md」。這同時回答兩件事，不互相打架。（觀察：README 的授權段目前只寫內容 CC BY-SA 4.0、程式碼 MIT，我只查了 README，沒看到標誌與名稱使用規則。）

**第二招：把「系統」與「身分」切開，並給 fork 一條品牌列。** GOV.UK 把可共用的模式、元件、版型和不可共用的皇冠、字體、品牌色分開；Smithsonian 用品牌列讓子單位自己保留配色。合起來：Taiwan.md 的版型、圖示語言、圖表樣式可以共用；母體名稱與標誌不共用；每個分支站頂有一條「基於 Taiwan.md」的細條，連回母體。這讓譜系可見，也不要求分支放棄自己的外觀。

**第三招：所有規則寫成可檢查的句子，而且資產可以被機器讀。** 公視+ 用 X 單位與雙單位最小尺寸，CC 把換色寫成「對比至少 3:1」，Lucide 用必須、應該、可以三級語氣，Phosphor 用清單資料維持命名穩定，GOV.UK 把資產放 GitHub 倉庫。對 Taiwan.md 來說這意味著：規則要能被 CI 或腳本檢查（最小尺寸、對比比值、圖示命名），不是只給人看。

### F3. AI 常見的空洞做法，要避開

1. **用形容詞當規範。** 「溫暖、專業、有活力」不能被檢查。先例的規則都有數字或「不可」清單。
2. **把一半篇幅花在品牌故事，規格卻是空的。** 先例相反：公視+ 的第 4 至 13 頁全是規格。
3. **標誌「理念」附會。** 台灣案例常見山、海、波浪、茶這類元素堆疊的說法（觀光署的波浪是由四種元素合成）。可以借，但要能驗證：嘉美館的「+1」同時綁了諧音與建築外形，是可驗證的錨。
4. **只給 HEX 色票，不給可搭配的組合與比值。** GOV.UK 明說對比責任在使用者，所以手冊裡該放一張「可以搭的組合表」。
5. **錯誤用法只畫「不要壓扁」。** Wikimedia 自己也承認這種寫法偏輕，沒有說明「為什麼會壞」。每條錯誤用法要附一句理由，並且挑 Taiwan.md 真的會發生的錯。
6. **授權與使用規則混在一起。** Rust、Wikimedia、CC 都把「素材授權」與「名稱與標誌使用」分開寫。混在一起的結果是人們不知道自己能改什麼。
7. **沒寫範圍與過渡期。** 台電的爭議不在設計，而在沒說哪些換、哪些不換。手冊要寫「新舊並行到什麼時候」。
8. **照抄大機構的格式。** GOV.UK 的皇冠、Smithsonian 的中央網域管理，都建立在 Taiwan.md 沒有的權威與組織上。只借結構，不借權威。
9. **生成式標誌沒有靜態備援。** Nordkyn 與 MIT 的系統都有一個「選定的那一個」可以用在小尺寸與印刷。要寫清楚哪個是 favicon 與簽名用的固定版本。
10. **圖示規範只寫風格，不寫格線與命名，也不寫 aria 的位置。** 要寫清楚：裝飾性圖示預設隱藏，單獨承載意義才加標籤，按鈕裡的圖示由按鈕承載標籤（Lucide 的做法）。
11. **捏造來源與案例。** 這份研究有大量「查不到」，這是正常的。手冊裡的先例要標來源與是否親眼讀過。

### F4. 還沒回答的問題（交給哲宇或後續研究）

- 台灣媒體（報導者、天下）、文化機構（文化部、故宮、國立臺灣博物館、臺史博）的識別系統，我都沒查到一手資料，建議直接聯絡。
- 觀光署 3.0 的品牌素材是否對業者開放、怎麼申請，沒查到，值得寫信問，因為這和 Taiwan.md 的「分支怎麼用」是同一類問題。
- Wikimedia 與 Snøhetta 2019 至 2022 的最終交付物，我只讀到 2020 年的宣布與專案頁，沒讀到最後交出了什麼。
- Europeana、Smithsonian 的官方品牌頁對機器人擋牆，部分內容來自搜尋摘要或 PDF，建議由有瀏覽器的人補讀。

---

## 附錄：來源完整度索引

**已逐頁或逐段讀過**：公視+ 識別使用指南（18 頁中前 10 頁加目錄）、Smithsonian 網頁品牌指南 PDF、GOV.UK 品牌站（首頁、標誌系統、色彩、圖形裝置、使用中的品牌）、GOV.UK 服務手冊「讓你的服務看起來像 GOV.UK」、Meta 品牌三頁（Brand、Marks、logo、Typography）、Wikimedia 商標政策（前 10 萬字）、Wikipedia 25 工具包、Wikipedia 標誌歷史、Python 商標政策與標誌頁、Rust 商標政策與標誌政策、Mozilla 商標政策、Mozilla Protocol、Linux Foundation 兩份、Canonical 政策、Creative Commons 政策、Lucide 四份文件、Phosphor 兩份、Carbon 圖示用法、Material Symbols 字體說明、Sagmeister 專案頁、Pentagram 專案頁、D&AD Nordkyn、designboom 墨爾本、CreativeApplications 與 It's Nice That 的 MIT 案、PublicTechnology、TTG Asia、行政院觀光施政、勤美術館與嘉美館兩篇 Shopping Design、城市學台北卡、聯合報台南識別、ETtoday 台電、聯合報台電、史前館館訊、TDRI 關於頁、國家文化記憶庫簡介。

**只有搜尋摘要、未能開頁**：Europeana 品牌指南與 Confluence、Internet Archive 相關、Smithsonian 檔案館說明與 logo.si.edu 本站、Design Week 的 GOV.UK 報導、PRNewswire 版觀光署發表、Mozilla 開放設計部落格、Zilla Slab 維基、故宮百年院慶 Logo 簡章、Cooper Hewitt 的 Casa da Música 條目、Google Arts & Culture 報導、台南市識別的自由時報補充、台電中油的 ETtoday 財經與新聞台報導、蘇格蘭政府設計系統圖示頁。

**明確查不到**：國家圖書館識別、台灣設計研究院標誌設計者、國立臺灣博物館與臺史博新識別、文化部識別、2022 年故宮新識別、報導者與天下的識別、台北市整體城市識別手冊、觀光署 3.0 的手冊與設計團隊細節、Internet Archive 官方標誌規範、Mozilla 品牌站標誌授權條款、GOV.UK 圖示規範、Material 3 圖示頁各主題的具體數值、Wikimedia 與 Snøhetta 最終交付物。
