# 供應鏈圖研究紀錄：半導體、AI 伺服器、鎢（2026-11-10）

輸出：`data/industry/research/supply-chains.json`（結構見檔內 `chains`、`tungstenFacts`、`articleCrossCheck`、`meta.notes`）。
原始檔：`data/industry/raw/` 底下 `mops/`（48＋1 份公司基本資料 HTML）、`gcis/`（公司登記 JSON）、`annual-excerpts/`（年報段落節錄）、`web/`（官網頁面存檔）、`mofcom-*.html`、`usgs-mcs2026-tungsten-*.pdf/.txt`、`twse-openapi-*.json`、`tpex-openapi-*.json`。

## 方法

每家公司的 role 以「官方登記」或「年報業務範圍」為主要出處，官網為補充，逐字引文。所有引文用程式驗過：把引文與下載到的原始檔都去掉空白後做子字串比對，通過的在 JSON 標 `quoteVerified: true`。唯一沒驗的是 SEC 10-K 四條（見下）。

主要來源與取得方式（皆可重跑）：

1. 公開資訊觀測站「公司基本資料」→「主要經營業務」（任務指定的來源）：
   `curl -s "https://mopsov.twse.com.tw/mops/web/ajax_t05st03" -d "encodeURIComponent=1&step=1&firstin=1&off=1&queryName=co_id&inpuType=co_id&TYPEK=all&co_id=2330" -A "Mozilla/5.0"`
   （新版 `mops.twse.com.tw/mops/web/ajax_t05st03` 會回「因為安全性考量，無法呈現」，用 `mopsov` 網域可取。）
2. 公司年報（股東會年報，業務範圍段落）：先 `curl "https://doc.twse.com.tw/server-java/t57sb01?step=1&colorchg=1&co_id=<代號>&year=115&seamon=&mtype=F&"` 取檔名清單，再 `-d "step=9&kind=F&co_id=<代號>&filename=<檔名>"` 取得 `/pdf/...` 連結下載，`pdftotext -raw` 轉文字。伺服器對連續請求會擋，需間隔數秒。
3. 經濟部商工登記公示資料（GCIS）：`https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?$format=json&$filter=Business_Accounting_NO eq <統編>`。統編取自證交所 `openapi.twse.com.tw/v1/opendata/t187ap03_L` 與櫃買 `www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O`。
4. 公司官網（curl 抓 HTML 後比對）、中國商務部公告頁、USGS MCS 2026 PDF（`pubs.usgs.gov/periodicals/mcs2026/mcs2026-tungsten.pdf`，`pdftotext -layout`）。

## 拿到的

- 半導體 8 環節、AI 伺服器 8 環節，共 50 筆公司紀錄（跨鏈重複的算兩筆），每筆都有 role、登記地址、引文與出處。
- 鎢：聯友金屬（7610，創新板）、京沅鎢鈷資源（非上市櫃）、萬事達切削科技、光洋科（弱證據）。
- 中國出口管制：商务部公告2025年第10号（頁面標題聯署海關總署；發布文號欄：商务部公告2025年第10号；2025-02-04 發布，自發布之日起實施）；商务部公告2026年第1号（2026-01-06，對日本兩用物項，未單獨點名鎢）。
- USGS MCS 2026（2026 年 2 月版）世界礦山產量表原文與程式算出的占比：中國 2024 為 67,000／82,000＝81.7%，2025e 為 67,000／85,000＝78.8%。注意 USGS 的世界總計已四捨五入，各國加總為 81,610 與 85,140，與總計略有差。
- 外國供應者（有出處的）：ASML（EUV「unique to ASML」；全球總部 Veldhoven）、SK hynix 官方新聞稿（HBM3 供 NVIDIA H100，2022-06-08）、NVIDIA／AMD 10-K 的 fabless 與台積電代工、記憶體採購對象。

## 沒拿到的（JSON 內以 null＋reason 或 gap 標示）

- 光阻與特用化學品的供應國：只有市調與媒體的日商占比數字，無政府或公司原始出處，未寫。
- WF6（六氟化鎢）：日本兩廠 2026-07-01 永久停產的官方公告查無（兩家官網新聞頁、搜尋皆無）；台灣有無生產 WF6 的公司，也無官方文件（三福化工、台特化年報無「六氟化鎢」）。
- 台灣無鎢礦的官方明文：未找到。USGS 該頁沒有列台灣。
- 鎢粉、碳化鎢粉在台灣的量產廠商：聯友年報把氧化鎢、鎢粉、碳化鎢粉列為計劃開發；京沅官網寫「規畫生產鎢粉及碳化鎢粉之投資計畫」。無量產證據。
- 硬質合金刀具：只查證一家（萬事達切削），名單非完整。
- Siemens EDA：本次檢視的年報均未提到。
- SEC 10-K 四條引文（NVIDIA 三條、AMD 一條）：SEC 對本機 curl 回 403，這四條是經 WebFetch 讀取後轉述，標 `quoteVerified: false`，發表前請人工對 EDGAR 原文。

## 口徑注意

- hq 取 GCIS 登記地址的縣市。力旺（登記新竹市／MOPS 地址為竹北）、台勝科（登記雲林麥寮／MOPS 地址為台北內湖）、南電（登記台北內湖／MOPS 地址為桃園蘆竹）、台達電（登記桃園龜山／MOPS 地址為台北內湖）兩邊縣市不同，已用 `hqNote` 標出，要顯示哪個由編輯決定。瑞昱、聯詠、世界先進的登記地址寫「新竹科學園區新竹縣…」，與一般以為的新竹市不同，以登記為準。
- 世芯-KY、貿聯-KY 為開曼註冊，GCIS 查無，hq 取 MOPS 的台灣地址。
- role 刻意不收「領導廠商／全球第一／唯一」等自我定位用語；二手報導的「全球第一大再製鎢酸鈉」「台積電、蘋果唯一台灣供應商」在官方文件查無，不採。
- 日月光（3711）官網與年報皆未寫 CoWoS，AI 伺服器鏈中只照來源寫封裝測試，並用 `note` 標明。
- 台積電在 AI 鏈的 role 取自年報「CoWoS 先進封裝服務整合多個系統單晶片（SoC）以及高頻寬記憶體（HBM）」。
- 光洋科（1785）放在鎢靶材環節證據偏弱：年報只在原料表把鎢列為薄膜濺鍍材料原料，未寫鎢靶材產品。
- 聯發科年報為民國 113 年度版（下載時無 114 年度）。
- 鎢文章的對照核對見 JSON `articleCrossCheck`：聯友資本額 4.28 億（現況為實收 5.83 億）與員工 152（年報為 139／157／162）對不上；京沅改制日、聯友年回收產能、京沅年產量未驗證。
- 候選名單調整：「晶圓代工與記憶體」6 家超過上限，拆成兩環節；技嘉未列（年報業務範圍段落未順利取出，非判斷不相關）。

## 未重跑的步驟提醒

MOPS 與 doc.twse.com.tw 都是現況／檔案清單，隔日再跑年報版本可能更新（例如聯發科 114 年度年報上傳後）。
