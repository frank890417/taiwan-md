# exports 研究紀錄（2026-11-10）

輸出：`data/industry/research/exports.json`；重跑腳本：`python3 -I data/industry/raw/build_exports_json.py`（從 worktree 根目錄）。

## 主要來源（皆官方）

1. 財政部統計處「統計資料庫」貿易統計（web02.mof.gov.tw/njswww），表單送出 URL 以瀏覽器取得 form 的 openLink 產生，再用 curl 抓 CSV（Big5）：
   - i9101 進出口貿易值－貿易總值（民國60年起）→ totals
   - i9121 出口主要貨品（百萬美元，民國90年起）、i8123 出口主要貨品結構比 → byProduct（占比用 MOF 原值）
   - i9111 洲別／國別貿易值（千美元，民國70年起）→ byMarket（占比自算）
   - 2026 累計：cycle=91、ym=11501–11510，三個表都抓。
   - 原始檔：data/industry/raw/mof*i9101*_、mof*i9121*_、mof*i8123*_、mof*i9111*_（含查詢 URL 於 json）
2. 財政部新聞稿 PDF（service.mof.gov.tw/public/Data/statistic/trade/news/YYYMM/…）：下載 108、109、110、111、112、113、114 年 12 月及 115 年 9、10 月，存 raw/mof_trade_pr/，用來交叉核對統計資料庫（結構、說明、備註原文）。
3. 國發會前身經建會《Taiwan Statistical Data Book 2002》表 11-7 Composition of Exports（p.216）→ longHistory。PDF 取自 taiwan-database.net 鏡像（ndc.gov.tw 回 403）。raw/ndc_databook/。

## 拿到

- totals：2001–2025 逐年（出口總值、出口、復出口），2026 1–10 月累計 7,582.93 億美元（758,293.388 百萬美元）。
- byProduct：12 個指定年份 × 11 類貨品，價值＋MOF 結構比；另附 2026 1–10 月。
- byMarket：同年份，中國大陸＋香港（及分列）、美國、東協十國、日本、歐洲；2026 1–10 月。
- longHistory：1952–1990 共 23 點（1952、55、60、65、70、73–90），金額與占比皆原表值。

## 沒拿到／要注意

- 「資通與視聽產品」「電子零組件」成為 MOF 新聞稿分類名稱的起用年份：未取得可引用原文，不寫。MOF 統計資料庫已把現行分類回溯套用到 2001 起，故 byProduct 同口徑。
- 2025 年版本差：新聞稿 114 年 12 月初值 640,746 百萬美元（6,407.5 億），統計資料庫現值 639,961.977，本檔用資料庫現值；2024 及以前兩者一致。
- 2001 年：Data Book 122,866.3（不含復出口）與 MOF「出口總值」126,608.592 不同；longHistory 不可與 totals 接成同一條線。
- 占比來源不同：byProduct 為 MOF 結構比原值；byMarket 與 byProduct 內的「電子＋資通合計」為自算（value/總計），json 欄名帶 computed。
- 東協十國不含東帝汶；「歐洲」為 MOF 洲別（含俄羅斯、英國、瑞士，土耳其在中東）。
- 2026 全年尚未發布；1–10 月為初步統計。
