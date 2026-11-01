# data-hub R5b：用數字看台灣，經濟、科技、能源環境、地理自然指標

> 存取日期：2026-10-23。負責分類：Economy / Technology / Nature / Geography（含 Society 的觀光人次）。
> 查證方式：中文官網一律用 curl 抓原始檔（政府站台常有 WebFetch 憑證問題）再用 pdftotext / openpyxl 讀出原文；`verbatim` 皆為實際讀到的原句或表格列。
> 紀律：沒有用記憶或推算補數字。「推算值」一律在 insight 或筆記中明講，並以 `derived` 標示。

```json
[
  {
    "id": "gdp-nominal-2025",
    "category": "Economy",
    "title_zh": "國內生產毛額（名目 GDP）",
    "title_en": "Nominal GDP",
    "value": 922454,
    "value_display": "約 9,225 億美元（新臺幣 28.7 兆元）",
    "unit": "百萬美元（新臺幣 28,715,120 百萬元）",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 534474,
      "value_display": "約 5,345 億美元（新臺幣 17.06 兆元）",
      "period": "2015 年（民國 104 年）",
      "verbatim": "104年 17,055,080 534,474 17,494,741 548,253"
    },
    "series": [
      [2013, 512957],
      [2014, 535332],
      [2015, 534474],
      [2016, 543002],
      [2017, 591734],
      [2018, 610744],
      [2019, 613453],
      [2020, 676935],
      [2021, 777062],
      [2022, 765529],
      [2023, 757328],
      [2024, 801529],
      [2025, 922454]
    ],
    "series_source_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/news11508.pdf",
    "source_agency": "行政院主計總處",
    "source_url": "https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=236591",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t1-1.xlsx",
    "verbatim": "114年 28,715,120 922,454 29,528,798 948,378（重要經濟指標表(2/2)，名目GDP，新臺幣百萬元／百萬美元；115年8月14日新聞稿）",
    "confidence": "✅",
    "insight_zh": "2025 年名目 GDP 以美元計首度逼近 9,225 億美元，比 2024 年多約 1,209 億美元；序列為主計總處 2026 年 8 月最新修正值，早先 2 月概估值已被取代。",
    "related_articles": [
      "knowledge/Economy/經濟奇蹟.md",
      "knowledge/Economy/台灣產業轉型升級.md",
      "knowledge/Geography/用數據看台灣22縣市.md"
    ]
  },
  {
    "id": "gdp-growth-2025",
    "category": "Economy",
    "title_zh": "經濟成長率",
    "title_en": "Real GDP growth",
    "value": 8.76,
    "value_display": "8.76%",
    "unit": "%",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 1.47,
      "value_display": "1.47%",
      "period": "2015 年（民國 104 年）",
      "verbatim": "104年 1.47 － － 726,895 22,780 745,634 23,367 -0.31"
    },
    "series": [
      [2013, 2.48],
      [2014, 4.72],
      [2015, 1.47],
      [2016, 2.17],
      [2017, 3.66],
      [2018, 2.91],
      [2019, 3.06],
      [2020, 3.42],
      [2021, 6.72],
      [2022, 2.68],
      [2023, 1.08],
      [2024, 5.27],
      [2025, 8.76]
    ],
    "series_source_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/news11508.pdf",
    "source_agency": "行政院主計總處",
    "source_url": "https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=236591",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t1-1.xlsx",
    "verbatim": "114年 8.76 － － 1,230,035 39,515 1,264,890 40,626 1.66（重要經濟指標表(1/2)，第一欄為經濟成長率 yoy）",
    "confidence": "✅",
    "insight_zh": "8.76% 是這張 2013 至 2025 年序列裡的最高值，比第二高的 2021 年 6.72% 多出 2.04 個百分點。",
    "related_articles": [
      "knowledge/Economy/經濟奇蹟.md",
      "knowledge/Economy/台灣產業轉型升級.md",
      "knowledge/Technology/AI硬體供應鏈.md"
    ]
  },
  {
    "id": "gdp-growth-2026-forecast",
    "category": "Economy",
    "title_zh": "2026 年經濟成長率預測",
    "title_en": "Real GDP growth forecast for 2026",
    "value": 11.05,
    "value_display": "11.05%",
    "unit": "%",
    "period": "2026 年（民國 115 年，主計總處 2026-08-14 預測）",
    "compare": {
      "value": 9.64,
      "value_display": "9.64%",
      "period": "2026 年（115 年 5 月預測數）",
      "verbatim": "全年經濟成長率11.05％，較115年5月預測數9.64％上修1.41個百分點"
    },
    "source_agency": "行政院主計總處",
    "source_url": "https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=236591",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t1-1.xlsx",
    "verbatim": "預測115年第3、4季經濟成長率(yoy)分別為11.42％及5.37％，併計第1、2季，全年經濟成長率11.05％，較115年5月預測數9.64％上修1.41個百分點，每人GDP 4萬5,332美元，CPI上漲2.07％。預測116年經濟成長6.04％，每人GDP 4萬9,874美元，CPI上漲1.90％。",
    "confidence": "✅",
    "insight_zh": "2026 年上半年實質 GDP 成長 14.15%，主計總處因此把全年預測從 5 月的 9.64% 上修到 11.05%，2027 年預測為 6.04%。",
    "related_articles": [
      "knowledge/Economy/經濟奇蹟.md",
      "knowledge/Technology/AI人工智慧產業.md"
    ]
  },
  {
    "id": "gdp-per-capita-2025",
    "category": "Economy",
    "title_zh": "平均每人 GDP",
    "title_en": "GDP per capita",
    "value": 39515,
    "value_display": "39,515 美元",
    "unit": "美元",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 22780,
      "value_display": "22,780 美元",
      "period": "2015 年（民國 104 年）",
      "verbatim": "104年 1.47 － － 726,895 22,780 745,634 23,367 -0.31"
    },
    "series": [
      [2013, 21973],
      [2014, 22874],
      [2015, 22780],
      [2016, 23091],
      [2017, 25121],
      [2018, 25901],
      [2019, 25998],
      [2020, 28705],
      [2021, 33111],
      [2022, 32827],
      [2023, 32444],
      [2024, 34238],
      [2025, 39515]
    ],
    "series_source_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/news11508.pdf",
    "source_agency": "行政院主計總處",
    "source_url": "https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=236591",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t1-1.xlsx",
    "verbatim": "114年 8.76 － － 1,230,035 39,515 1,264,890 40,626 1.66（每人GDP：新臺幣 1,230,035 元、39,515 美元）；115年(f) 11.05 － － 1,449,925 45,332 1,492,300 46,659 2.07",
    "confidence": "✅",
    "insight_zh": "2025 年每人 GDP 比十年前多 16,735 美元；主計總處預測 2026 年為 45,332 美元。",
    "related_articles": [
      "knowledge/Economy/經濟奇蹟.md",
      "knowledge/Economy/新台幣.md",
      "knowledge/Geography/用數據看台灣22縣市.md"
    ]
  },
  {
    "id": "cpi-inflation-2025",
    "category": "Economy",
    "title_zh": "消費者物價年增率（CPI）",
    "title_en": "CPI inflation",
    "value": 1.66,
    "value_display": "1.66%",
    "unit": "%",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": -0.31,
      "value_display": "-0.31%",
      "period": "2015 年（民國 104 年）",
      "verbatim": "104年 1.47 － － 726,895 22,780 745,634 23,367 -0.31"
    },
    "series": [
      [2013, 0.8],
      [2014, 1.2],
      [2015, -0.31],
      [2016, 1.4],
      [2017, 0.62],
      [2018, 1.36],
      [2019, 0.55],
      [2020, -0.23],
      [2021, 1.97],
      [2022, 2.95],
      [2023, 2.49],
      [2024, 2.18],
      [2025, 1.66]
    ],
    "series_source_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/news11508.pdf",
    "source_agency": "行政院主計總處",
    "source_url": "https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=236591",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t1-1.xlsx",
    "verbatim": "114年 8.76 － － 1,230,035 39,515 1,264,890 40,626 1.66（表末欄為消費者物價上升率％）",
    "confidence": "✅",
    "insight_zh": "2022 年的 2.95% 是這段序列的高點，2025 年回到 1.66%，同期經濟成長率卻是序列最高的 8.76%。",
    "related_articles": [
      "knowledge/Economy/新台幣.md",
      "knowledge/Economy/經濟奇蹟.md"
    ]
  },
  {
    "id": "exports-total-2025",
    "category": "Economy",
    "title_zh": "出口總額",
    "title_en": "Total exports",
    "value": 6407.5,
    "value_display": "6,407.5 億美元，年增 34.9%",
    "unit": "億美元",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 4749.3,
      "value_display": "較上年增 1,658.2 億美元（+34.9%），即 2024 年約 4,749.3 億美元（derived：6,407.5 減 1,658.2）",
      "period": "2024 年",
      "verbatim": "114 年出口 6,407.5 億美元，較上年增 34.9%(按新臺幣計算增 30.7%)"
    },
    "series": [
      [2016, 232.6],
      [2017, 262.9],
      [2018, 278.3],
      [2019, 274.3],
      [2020, 287.6],
      [2021, 372.0],
      [2022, 399.5],
      [2023, 360.3],
      [2024, 395.8],
      [2025, 534.0]
    ],
    "series_source_url": "https://service.mof.gov.tw/public/Data/statistic/trade/news/11412/11412_%E4%B8%AD%E6%96%87%E6%96%B0%E8%81%9E%E7%A8%BF(%E4%B8%8A%E7%B6%B2).pdf",
    "source_agency": "財政部統計處（海關進出口貿易統計）",
    "source_url": "https://service.mof.gov.tw/public/Data/statistic/trade/news/11412/11412_%E4%B8%AD%E6%96%87%E6%96%B0%E8%81%9E%E7%A8%BF(%E4%B8%8A%E7%B6%B2).pdf",
    "data_download_url": "https://web02.mof.gov.tw/njswww/WebProxy.aspx?sys=100&funid=defjspf2",
    "verbatim": "114 年出口 6,407.5 億美元，較上年增 34.9%(按新臺幣計算增 30.7%)；114 年進口 4,836.1 億美元，較上年增 22.6%(按新臺幣計算增 19.0%)。",
    "confidence": "✅",
    "insight_zh": "series 欄是財政部圖 2「歷年平均每月出口值」逐年抄錄（單位：億美元／月，非年總額）；2025 年月均 534.0 億美元，為 2016 年 232.6 億美元的 2.3 倍（derived）。",
    "related_articles": [
      "knowledge/Economy/台灣外貿與全球供應鏈.md",
      "knowledge/Economy/台灣國際貿易政策.md",
      "knowledge/Technology/AI硬體供應鏈.md"
    ]
  },
  {
    "id": "exports-ict-av-2025",
    "category": "Technology",
    "title_zh": "資通與視聽產品出口",
    "title_en": "ICT and audio-visual product exports",
    "value": 2511.5,
    "value_display": "2,511.5 億美元，年增 89.5%（歷年新高）",
    "unit": "億美元",
    "period": "2025 年（民國 114 年）",
    "source_agency": "財政部統計處（海關進出口貿易統計）",
    "source_url": "https://service.mof.gov.tw/public/Data/statistic/trade/news/11412/11412_%E4%B8%AD%E6%96%87%E6%96%B0%E8%81%9E%E7%A8%BF(%E4%B8%8A%E7%B6%B2).pdf",
    "data_download_url": "https://web02.mof.gov.tw/njswww/WebProxy.aspx?sys=100&funid=defjspf2",
    "verbatim": "資通與視聽產品出口 2,511.5 億美元(歷年新高)，較上年增 1,186.5 億美元(+89.5%)，其中電腦及其附屬單元增 986.5 億美元(+1.2 倍)、電腦之零附件增 151.0 億美元(+1.1 倍)、交換器及路由器增 25.5 億美元(+30.7%)。",
    "confidence": "✅",
    "insight_zh": "占總出口的比重財政部新聞稿未單列，自行以 251,154 除以 640,750 百萬美元約為 39.2%（derived）；官方明列的是與電子零組件合計占總出口 7 成 4。",
    "related_articles": [
      "knowledge/Technology/AI硬體供應鏈.md",
      "knowledge/Technology/NVIDIA在台灣.md",
      "knowledge/Economy/台灣外貿與全球供應鏈.md"
    ]
  },
  {
    "id": "exports-ict-electronics-share-2025",
    "category": "Technology",
    "title_zh": "資通與視聽產品加電子零組件占總出口比重",
    "title_en": "ICT/AV plus electronic components share of exports",
    "value": 74,
    "value_display": "約 7 成 4",
    "unit": "%",
    "period": "2025 年（民國 114 年）",
    "source_agency": "財政部統計處（海關進出口貿易統計）",
    "source_url": "https://service.mof.gov.tw/public/Data/statistic/trade/news/11412/11412_%E4%B8%AD%E6%96%87%E6%96%B0%E8%81%9E%E7%A8%BF(%E4%B8%8A%E7%B6%B2).pdf",
    "data_download_url": "https://web02.mof.gov.tw/njswww/WebProxy.aspx?sys=100&funid=defjspf2",
    "verbatim": "114 年資通與視聽產品、電子零組件出口值雙創新高，併計成長 53.0%，合占總出口比重達 7 成 4。（表 2：電子及資通產品 474,026 百萬美元，增 53.0%）",
    "confidence": "✅",
    "insight_zh": "兩大類合計 4,740.3 億美元，占出口七成四；新聞稿將 AI、高效能運算與雲端服務需求列為拉貨主因。",
    "related_articles": [
      "knowledge/Technology/AI硬體供應鏈.md",
      "knowledge/Technology/半導體產業.md",
      "knowledge/Economy/台灣外貿與全球供應鏈.md"
    ]
  },
  {
    "id": "export-market-us-vs-china-hk-2025",
    "category": "Economy",
    "title_zh": "最大出口市場：美國首度超過中國大陸與香港",
    "title_en": "Largest export market: US overtakes China plus Hong Kong",
    "value": 30.9,
    "value_display": "對美出口占 30.9%（1,982.7 億美元），高於對中港的 26.6%（1,704.8 億美元）",
    "unit": "% 占總出口",
    "period": "2025 年（民國 114 年）",
    "source_agency": "財政部統計處（海關進出口貿易統計）",
    "source_url": "https://service.mof.gov.tw/public/Data/statistic/trade/news/11412/11412_%E4%B8%AD%E6%96%87%E6%96%B0%E8%81%9E%E7%A8%BF(%E4%B8%8A%E7%B6%B2).pdf",
    "data_download_url": "https://web02.mof.gov.tw/njswww/WebProxy.aspx?sys=100&funid=defjspf2",
    "verbatim": "114 年對美國出口 1,982.7 億美元，較上年增 869.1 億美元(+78.0%)，對中國大陸與香港出口 1,704.8 億美元，增 198.9 億美元(+13.2%)，對東協出口 1,189.8 億美元，增 312.5 億美元(+35.6%)……影響所及，對美出口比重提升至 30.9%，高於對陸港占比(26.6%)，為 26 年來首見。",
    "confidence": "✅",
    "insight_zh": "美國取代中國大陸與香港成為最大出口市場，財政部稱為 26 年來首見；對東協出口 1,189.8 億美元，居第三。",
    "related_articles": [
      "knowledge/Economy/台灣外貿與全球供應鏈.md",
      "knowledge/Economy/台灣國際貿易政策.md",
      "knowledge/Technology/NVIDIA在台灣.md"
    ]
  },
  {
    "id": "trade-surplus-2025",
    "category": "Economy",
    "title_zh": "貿易順差（出超）",
    "title_en": "Trade surplus",
    "value": 1571.4,
    "value_display": "1,571.4 億美元（歷年新高）",
    "unit": "億美元",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 805.8,
      "value_display": "較上年增 765.6 億美元，即 2024 年約 805.8 億美元（derived：1,571.4 減 765.6）",
      "period": "2024 年",
      "verbatim": "114 年出超 1,571.4 億美元，較上年增 765.6 億美元。"
    },
    "source_agency": "財政部統計處（海關進出口貿易統計）",
    "source_url": "https://service.mof.gov.tw/public/Data/statistic/trade/news/11412/11412_%E4%B8%AD%E6%96%87%E6%96%B0%E8%81%9E%E7%A8%BF(%E4%B8%8A%E7%B6%B2).pdf",
    "data_download_url": "https://web02.mof.gov.tw/njswww/WebProxy.aspx?sys=100&funid=defjspf2",
    "verbatim": "綜計 114 年出口 6,407.5 億美元、進口 4,836.1 億美元，同登歷年最高，各年增 34.9%、22.6%，出超 1,571.4 億美元亦刷新紀錄。",
    "confidence": "✅",
    "insight_zh": "出超較上年增加 95.0%，進口也同步創高，其中資本設備進口 1,050.3 億美元、半導體設備進口增 69.3%。",
    "related_articles": [
      "knowledge/Economy/台灣外貿與全球供應鏈.md",
      "knowledge/Economy/新台幣.md"
    ]
  },
  {
    "id": "fx-reserves-2026-09",
    "category": "Economy",
    "title_zh": "外匯存底",
    "title_en": "Foreign exchange reserves",
    "value": 6007.45,
    "value_display": "6,007.45 億美元",
    "unit": "億美元",
    "period": "2026 年 9 月底（民國 115 年）",
    "compare": {
      "value": 4995.98,
      "value_display": "4,995.98 億美元",
      "period": "2020 年 9 月底（民國 109 年）",
      "verbatim": "109年9月底，我國外匯存底金額為4,995.98億美元，較上月底增加14.29億美元。"
    },
    "source_agency": "中央銀行",
    "source_url": "https://www.cbc.gov.tw/tw/cp-302-192976-352ee-1.html",
    "data_download_url": "",
    "verbatim": "115年9月底我國外匯存底金額為6,007.45億美元，較上月底減少11.59億美元。註：115年9月底，外資持有國內股票及債券按當日市價計算，連同其新臺幣存款餘額共折計19,272億美元，約當外匯存底321%。",
    "confidence": "✅",
    "insight_zh": "央行同一則新聞稿註明，外資持有的國內股債與新臺幣存款折計 19,272 億美元，約當外匯存底的 321%。",
    "related_articles": [
      "knowledge/Economy/新台幣.md",
      "knowledge/Economy/台灣股市與資本市場.md"
    ]
  },
  {
    "id": "twse-market-cap-2026-09",
    "category": "Economy",
    "title_zh": "台股上市公司總市值",
    "title_en": "TWSE total market capitalization",
    "value": 156.81,
    "value_display": "156.81 兆元",
    "unit": "兆新臺幣",
    "period": "2026 年 9 月底（民國 115 年）",
    "compare": {
      "value": 94.36,
      "value_display": "94.36 兆元",
      "period": "2025 年 12 月底",
      "verbatim": "12 月底上市公司總市值 94.36 兆元，較上月底增加 4.41 兆元，較去年底增加 20.46 兆元。"
    },
    "source_agency": "臺灣證券交易所（集中市場月訊）",
    "source_url": "https://www.twse.com.tw/rwd/staticFiles/product/publication/0005000115.pdf",
    "data_download_url": "https://openapi.twse.com.tw/v1/swagger.json",
    "verbatim": "9 月底上市公司總市值 156.81 兆元，較上月底增加 6.02 兆元，較去年底增加 62.45 兆元。",
    "confidence": "✅",
    "insight_zh": "2026 年前九個月市值比 2025 年底多 62.45 兆元，已是 2025 年底 94.36 兆元的 1.66 倍（derived）。",
    "related_articles": [
      "knowledge/Economy/台灣股市與資本市場.md",
      "knowledge/Economy/台灣企業：台積電.md"
    ]
  },
  {
    "id": "tsmc-market-cap-share-2026-09",
    "category": "Economy",
    "title_zh": "台積電市值占台股總市值",
    "title_en": "TSMC share of TWSE market cap",
    "value": 41.0,
    "value_display": "約 41.0%（台積電發行市值 64.31 兆元）",
    "unit": "%",
    "period": "2026 年 9 月底（derived）",
    "compare": {
      "value": 42.6,
      "value_display": "約 42.6%（台積電 40.20 兆元 ÷ 94.36 兆元，derived）",
      "period": "2025 年 12 月底",
      "verbatim": "1 2330 台積電 401,954（12 月底上市公司發行市值排名前十名，單位：億元）"
    },
    "source_agency": "臺灣證券交易所（集中市場月訊）；占比為本站以兩個官方數字相除（derived）",
    "source_url": "https://www.twse.com.tw/rwd/staticFiles/product/publication/0005000115.pdf",
    "data_download_url": "",
    "verbatim": "9 月底上市公司發行市值排名前十名：1 2330 台積電 643,123（億元）；2 2454 聯發科 78,964；3 2308 台達電 49,094；4 2317 鴻海 35,282；總市值 156.81 兆元。",
    "confidence": "✅",
    "insight_zh": "證交所月訊只公布台積電發行市值與總市值，占比 643,123 億除以 1,568,100 億為本站計算；2025 年底同法約 42.6%（401,954 億除以 943,600 億）。",
    "related_articles": [
      "knowledge/Economy/台灣企業：台積電.md",
      "knowledge/Economy/台灣股市與資本市場.md",
      "knowledge/Technology/半導體產業.md"
    ]
  },
  {
    "id": "taiex-close-2025",
    "category": "Economy",
    "title_zh": "加權指數年底收盤",
    "title_en": "TAIEX year-end close",
    "value": 28963.6,
    "value_display": "28,963.60 點",
    "unit": "點",
    "period": "2025 年 12 月 31 日",
    "compare": {
      "value": 8338.06,
      "value_display": "8,338.06 點",
      "period": "2015 年 12 月 31 日",
      "verbatim": "[\"104/12/31\",\"2,499,013,694\",\"48,209,622,555\",\"494,056\",\"8,338.06\",\"58.07\"]"
    },
    "series": [
      [2015, 8338.06],
      [2016, 9253.5],
      [2017, 10642.86],
      [2018, 9727.41],
      [2019, 11997.14],
      [2020, 14732.53],
      [2021, 18218.84],
      [2022, 14137.69],
      [2023, 17930.81],
      [2024, 23035.1],
      [2025, 28963.6]
    ],
    "series_source_url": "https://www.twse.com.tw/rwd/zh/afterTrading/FMTQIK?date=20251201&response=json",
    "source_agency": "臺灣證券交易所",
    "source_url": "https://www.twse.com.tw/rwd/zh/afterTrading/FMTQIK?date=20251201&response=json",
    "data_download_url": "https://openapi.twse.com.tw/v1/exchangeReport/FMTQIK",
    "verbatim": "[\"114/12/31\",\"9,768,832,777\",\"548,425,314,258\",\"3,825,873\",\"28,963.60\",\"256.47\"]（欄位：日期、成交股數、成交金額、成交筆數、發行量加權股價指數、漲跌點數）；月訊：12 月份……以 28,963.6 點作收，漲幅為 4.84%。",
    "confidence": "✅",
    "insight_zh": "2025 年底收盤是 2015 年底的 3.5 倍（derived）；2026 年 9 月底收在 47,940.13 點（證交所月訊）。series 為各年 12 月最後一個交易日收盤，逐年取自證交所 FMTQIK。",
    "related_articles": [
      "knowledge/Economy/台灣股市與資本市場.md",
      "knowledge/Economy/台灣企業：台積電.md"
    ]
  },
  {
    "id": "semiconductor-output-2025",
    "category": "Technology",
    "title_zh": "臺灣 IC 產業（半導體）產值",
    "title_en": "Taiwan IC industry output value",
    "value": 65225,
    "value_display": "新臺幣 6.52 兆元，年增 22.7%（工研院產科國際所預估）",
    "unit": "億新臺幣",
    "period": "2025 年（業界估計，2026 年 2 月版）",
    "source_agency": "工研院產科國際所（IEK）——業界估計，非政府統計",
    "source_url": "https://ieknet.iek.org.tw/iekrpt/rpt_more.aspx?actiontype=rpt&indu_idno=0&domain=95&rpt_idno=453795114",
    "data_download_url": "",
    "verbatim": "工研院產科國際所預估2025年臺灣IC產業產值達新臺幣65,225億元(USD$209.1B)，較2024年成長22.7%。其中IC設計業產值為新臺幣14,245億元(USD$45.7B)，較2024年成長12.0%；IC製造業為新臺幣43,869億元(USD$140.6B)，較2024年成長28.3%",
    "confidence": "✅",
    "insight_zh": "這是估計值：IEK 對 2025 年的預估從年初約 6.18 兆元一路上修到 6.52 兆元，引用時應標「工研院估計」；IC 製造業約占整體三分之二（43,869 除以 65,225，derived）。",
    "related_articles": [
      "knowledge/Technology/半導體產業.md",
      "knowledge/Economy/台灣企業：台積電.md",
      "knowledge/Technology/台灣的電力與半導體.md"
    ]
  },
  {
    "id": "tsmc-foundry-share-2q26",
    "category": "Technology",
    "title_zh": "台積電全球晶圓代工市占率",
    "title_en": "TSMC global foundry market share",
    "value": 72.5,
    "value_display": "72.5%",
    "unit": "% 營收市占（前十大晶圓代工合計）",
    "period": "2026 年第 2 季（業界估計）",
    "compare": {
      "value": 70.4,
      "value_display": "70.4%",
      "period": "2025 年第 4 季",
      "verbatim": "allowed TSMC to maintain its leading position with a 70.4% market share."
    },
    "source_agency": "TrendForce（業界估計，公開新聞稿）",
    "source_url": "https://www.trendforce.com/presscenter/news/20260909-13225.html",
    "data_download_url": "",
    "verbatim": "TSMC maintained its lead with 2Q26 revenue nearing $40.2 billion, a 12.1% increase QoQ, capturing a 72.5% market share.（同稿：the combined revenue of the world's top 10 foundries rose 11.5% QoQ to nearly US$53.49 billion in 2Q26）",
    "confidence": "✅",
    "insight_zh": "市占以前十大晶圓代工廠營收為分母，不含 IDM 自家產能；TrendForce 另指 2025 年前十大合計營收約 1,695 億美元，年增 26.3%。",
    "related_articles": [
      "knowledge/Economy/台灣企業：台積電.md",
      "knowledge/Technology/半導體產業.md",
      "knowledge/Technology/AI硬體供應鏈.md"
    ]
  },
  {
    "id": "rd-expenditure-gdp-ratio-2024",
    "category": "Technology",
    "title_zh": "全國研發經費占 GDP 比率",
    "title_en": "National R&D expenditure as % of GDP",
    "value": 4.1,
    "value_display": "4.10%（研發經費 10,493 億元，首度破兆）",
    "unit": "%",
    "period": "2024 年（民國 113 年；2025 年度調查 114 年 10 月公布，目前最新）",
    "compare": {
      "value": 3.59,
      "value_display": "3.59%",
      "period": "2020 年（民國 109 年）",
      "verbatim": "圖 1：全國研發經費與占 GDP 比率（109 年 7,188 億元、3.59%；110 年 3.77%；111 年 3.93%；112 年 3.97%；113 年 4.10%）"
    },
    "source_agency": "國家科學及技術委員會（全國科技動態調查）",
    "source_url": "https://www.nstc.gov.tw/folksonomy/detail/96a29f2b-a5da-4784-ac8e-9ffbe33159e7?l=CH",
    "data_download_url": "https://wsts.nstc.gov.tw/stsweb/technology/TechnologyDataIndex.aspx?language=C",
    "verbatim": "113 年全國研發經費及研發人力仍維持雙成長，其中全國研發經費首次突破兆元，達 10,493 億元，較 112 年成長 11.9%，高於近 5 年平均成長率(9.7%)。而研發經費占 GDP 比率達 4.10%，較 112 年增加 0.13 個百分點，亦創新高。",
    "confidence": "✅",
    "insight_zh": "民間部門出資 9,004 億元，占整體 85.8%，政府出資 1,489 億元；114 年（2025）調查結果預計 2026 年 10 月底公布，截至 10 月 23 日尚未見到。",
    "related_articles": [
      "knowledge/Technology/科技園區發展.md",
      "knowledge/Technology/半導體產業.md",
      "knowledge/Economy/台灣產業轉型升級.md"
    ]
  },
  {
    "id": "power-mix-gas-2025",
    "category": "Nature",
    "title_zh": "發電結構：燃氣占比",
    "title_en": "Power generation mix: natural gas share",
    "value": 47.7,
    "value_display": "47.7%",
    "unit": "% 占總發電量",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 31.5,
      "value_display": "31.5%",
      "period": "2016 年（民國 105 年）",
      "verbatim": "燃氣占比由民國105年為31.5%，至民國114年增加為47.7%"
    },
    "source_agency": "經濟部能源署",
    "source_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "data_download_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "verbatim": "近年來我國發電量變化，總發電量由民國105年為2,641億度，至民國114年增加為2,897億度。以發電結構來看，燃煤占比由民國105年為45.9%，至民國114年減少為35.3%；燃氣占比由民國105年為31.5%，至民國114年增加為47.7%；核能占比由民國105年為12.0%，至民國114年減少為1.1%；再生能源占比由民國105年為4.8%，至民國114年增加為13.3%。",
    "confidence": "✅",
    "insight_zh": "燃氣已取代燃煤成為最大電源，2025 年總發電量 2,897 億度；環境部能源資訊平台引用的總量為 2,889 億度，兩者差 8 億度。",
    "related_articles": [
      "knowledge/Economy/台灣電價機制與台電.md",
      "knowledge/Technology/台灣的電力與半導體.md",
      "knowledge/Nature/台灣氣候危機與淨零轉型.md"
    ]
  },
  {
    "id": "power-mix-coal-2025",
    "category": "Nature",
    "title_zh": "發電結構：燃煤占比",
    "title_en": "Power generation mix: coal share",
    "value": 35.3,
    "value_display": "35.3%",
    "unit": "% 占總發電量",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 45.9,
      "value_display": "45.9%",
      "period": "2016 年（民國 105 年）",
      "verbatim": "燃煤占比由民國105年為45.9%，至民國114年減少為35.3%"
    },
    "source_agency": "經濟部能源署",
    "source_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "data_download_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "verbatim": "燃煤占比由民國105年為45.9%，至民國114年減少為35.3%",
    "confidence": "✅",
    "insight_zh": "燃煤占比十年下降 10.6 個百分點（derived：45.9 減 35.3），仍高於再生能源與核能合計。",
    "related_articles": [
      "knowledge/Economy/台灣電價機制與台電.md",
      "knowledge/Nature/台灣氣候危機與淨零轉型.md"
    ]
  },
  {
    "id": "power-mix-renewable-2025",
    "category": "Nature",
    "title_zh": "發電結構：再生能源占比",
    "title_en": "Power generation mix: renewable share",
    "value": 13.3,
    "value_display": "13.3%（再生能源發電量 386 億度）",
    "unit": "% 占總發電量",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 4.8,
      "value_display": "4.8%（發電量 127 億度）",
      "period": "2016 年（民國 105 年）",
      "verbatim": "再生能源占比由民國105年為4.8%，至民國114年增加為13.3%。其中，再生能源發電量變化，再生能源總發電量由民國105年為127億度，至民國114年增加為386億度。"
    },
    "source_agency": "經濟部能源署",
    "source_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "data_download_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "verbatim": "再生能源總發電量由民國105年為127億度，至民國114年增加為386億度。以再生能源發電結構來看，慣常水力占比由民國105年為51.5%，至民國114年減少為14.3%；生質能及廢棄物占比由民國105年為28.3%，至民國114年減少為10.7%；太陽光電占比由民國105年為8.7%，至民國114年增加為43.4%；風力占比由民國105年為11.4%，至113年增加為31.6%。",
    "confidence": "✅",
    "insight_zh": "再生能源占比十年從 4.8% 升到 13.3%，內部結構由水力為主轉為太陽光電 43.4%、風力 31.6%（風力為 113 年數字）。",
    "related_articles": [
      "knowledge/Economy/台灣離岸風電.md",
      "knowledge/Nature/台灣氣候危機與淨零轉型.md",
      "knowledge/Technology/台灣的電力與半導體.md"
    ]
  },
  {
    "id": "power-mix-nuclear-2025",
    "category": "Nature",
    "title_zh": "發電結構：核能占比",
    "title_en": "Power generation mix: nuclear share",
    "value": 1.1,
    "value_display": "1.1%（全年值，非 0）",
    "unit": "% 占總發電量",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 12.0,
      "value_display": "12.0%",
      "period": "2016 年（民國 105 年）",
      "verbatim": "核能占比由民國105年為12.0%，至民國114年減少為1.1%"
    },
    "source_agency": "經濟部能源署",
    "source_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "data_download_url": "https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437",
    "verbatim": "核能占比由民國105年為12.0%，至民國114年減少為1.1%",
    "confidence": "✅",
    "insight_zh": "能源署 2025 年全年核能占比為 1.1% 而非 0，因為核三廠 2025 年上半年仍有發電；2026 年起全年核能占比預期才會歸零（停機日期見筆記，屬新聞轉述）。",
    "related_articles": [
      "knowledge/Society/台灣與核能的討論.md",
      "knowledge/History/蘭嶼核廢料.md",
      "knowledge/Nature/台灣氣候危機與淨零轉型.md"
    ]
  },
  {
    "id": "ghg-emissions-2024",
    "category": "Nature",
    "title_zh": "溫室氣體排放總量（國家清冊）",
    "title_en": "National greenhouse gas emissions",
    "value": 273.161,
    "value_display": "273.161 百萬公噸 CO2e（淨排放 251.404 百萬公噸）",
    "unit": "百萬公噸 CO2e",
    "period": "2024 年（環境部 2026 年版國家清冊，2026-06 公布）",
    "compare": {
      "value": 278.63,
      "value_display": "278.63 百萬公噸 CO2e（2025 年版清冊）",
      "period": "2023 年",
      "verbatim": "我國2023年總溫室氣體排放量為278.63百萬公噸CO₂e，較基準年（2005年）減少4.48%，扣除碳匯21.73百萬公噸CO₂e，淨排放量為256.90百萬公噸CO₂e"
    },
    "source_agency": "環境部氣候變遷署",
    "source_url": "https://www.cca.gov.tw/climatetalks/emission-and-reduction/national/1867.html",
    "data_download_url": "https://www.cca.gov.tw/information-service/publications/national-ghg-inventory-report/34874.html",
    "verbatim": "我國西元 2024 年總溫室氣體總排放量約為273.161百萬公噸二氧化碳當量(MtCO2e)，扣除碳匯21.757 MtCO2e後，淨排放量為251.404 MtCO2e。在整體的溫室氣體排放中，製造部門排放占比最高，約占總體排放量50.88%。",
    "confidence": "✅",
    "insight_zh": "2024 年淨排放量較基準年 2005 年減少 6.59%、較 2023 年減少 1.92%，連續 3 年下降；compare 取自上一版清冊，清冊每年會回溯修正，跨版本比較僅供參考。",
    "related_articles": [
      "knowledge/Nature/台灣氣候危機與淨零轉型.md",
      "knowledge/Economy/台灣電價機制與台電.md"
    ]
  },
  {
    "id": "land-area",
    "category": "Geography",
    "title_zh": "有效管轄土地面積",
    "title_en": "Land area under effective jurisdiction",
    "value": 36197.3371,
    "value_display": "36,197.3371 平方公里（約 3.6 萬平方公里）",
    "unit": "平方公里",
    "period": "現行官方國情簡介",
    "source_agency": "行政院（國情簡介，外交部提供）",
    "source_url": "https://www.ey.gov.tw/state/235266A41238ECCE",
    "data_download_url": "",
    "verbatim": "中華民國創建於西元1912年，是亞洲第一個民主共和國。民國38年12月7日，中華民國政府播遷來臺，轄有臺灣本島及其附屬島嶼、澎湖群島、金門群島、馬祖列島、東沙群島、中沙群島、南沙群島等地，有效管轄土地面積3萬6,197.3371平方公里。",
    "confidence": "✅",
    "insight_zh": "這個面積包含臺灣本島與澎湖、金門、馬祖及東沙等外離島；台灣島本身的面積需另引內政部國土測繪中心資料（本次未查到）。",
    "related_articles": [
      "knowledge/Geography/台灣島嶼地理特色與形成.md",
      "knowledge/Geography/台灣行政區劃.md",
      "knowledge/Geography/用數據看台灣22縣市.md"
    ]
  },
  {
    "id": "yushan-elevation",
    "category": "Geography",
    "title_zh": "玉山主峰海拔",
    "title_en": "Yushan main peak elevation",
    "value": 3952,
    "value_display": "3,952 公尺",
    "unit": "公尺",
    "period": "官方現行公告值",
    "source_agency": "行政院（國情簡介，外交部提供）",
    "source_url": "https://www.ey.gov.tw/state/4447F4A951A1EC45/52515c49-bcc0-45f5-bd5f-78c22c9d3f45",
    "data_download_url": "",
    "verbatim": "玉山山脈主峰高3,952公尺，為東亞第一高峰，冬天白雪皚皚。",
    "confidence": "✅",
    "insight_zh": "站上玉山條目引用國土測繪中心 3,952.430 公尺的測量值；官方公告維持整數 3,952 公尺，兩者差在測量精度。",
    "related_articles": [
      "knowledge/Geography/玉山.md",
      "knowledge/Nature/台灣山岳與登山文化.md",
      "knowledge/Geography/台灣五大地形與地理結構.md"
    ]
  },
  {
    "id": "forest-cover",
    "category": "Nature",
    "title_zh": "森林覆蓋率",
    "title_en": "Forest cover rate",
    "value": 60.71,
    "value_display": "60.71%（森林面積 2,197,090 公頃）",
    "unit": "%",
    "period": "第四次森林資源調查（農業部林業及自然保育署，現行最新成果）",
    "source_agency": "農業部林業及自然保育署",
    "source_url": "https://www.forest.gov.tw/0002393",
    "data_download_url": "https://www.forest.gov.tw/file/66716",
    "verbatim": "本次調查統計結果，臺灣地區(含金門、連江縣)總森林面積為2,197,090 公頃，森林覆蓋度為 60.71%，其中屬森林法定義之林地，其森林覆蓋面積為 1,781,660 公頃；林地以外之其他土地，森林覆蓋面積為415,430 公頃。",
    "confidence": "✅",
    "insight_zh": "報告以內政部 104 年（2015）人口數計算，人均森林面積為 0.092 公頃；森林覆蓋面積中有 415,430 公頃位於林地以外。",
    "related_articles": [
      "knowledge/Nature/台灣森林生態系.md",
      "knowledge/Nature/台灣國家公園.md",
      "knowledge/Nature/生態多樣性.md"
    ]
  },
  {
    "id": "annual-rainfall",
    "category": "Geography",
    "title_zh": "年平均降雨量",
    "title_en": "Mean annual precipitation",
    "value": 2500,
    "value_display": "約 2,500 毫米（為世界平均 982 毫米的 2.54 倍）",
    "unit": "毫米",
    "period": "氣象署氣候小百科（長期平均）",
    "source_agency": "交通部中央氣象署",
    "source_url": "https://climate.cwa.gov.tw/ClimatePedia/detail_page/7",
    "data_download_url": "",
    "verbatim": "臺灣的平均年降水量高達 2,500 毫米，在世界先進經濟體中居首，是世界平均（982 毫米）的 2.54 倍。",
    "confidence": "✅",
    "insight_zh": "行政院國情簡介同題寫「全年的降雨量平均約為 2,200 毫米」，兩份官方文件口徑不同，網站建議採氣象署 2,500 毫米並標明「長期平均」。",
    "related_articles": [
      "knowledge/Geography/氣候.md",
      "knowledge/Nature/梅雨.md",
      "knowledge/Geography/台灣水庫與水資源管理.md"
    ]
  },
  {
    "id": "typhoon-landfalls-per-year",
    "category": "Nature",
    "title_zh": "颱風平均每年侵臺個數",
    "title_en": "Typhoons affecting Taiwan per year",
    "value": 3.5,
    "value_display": "平均每年 3 至 4 個（1911 至 2025 年共 382 個）",
    "unit": "個／年",
    "period": "1911 至 2025 年",
    "source_agency": "交通部中央氣象署（颱風百問）",
    "source_url": "https://www.cwa.gov.tw/V8/C/K/Encyclopedia/typhoon/index.html",
    "data_download_url": "https://www.cwa.gov.tw/V8/C/K/Encyclopedia/typhoon/typhoon.pdf",
    "verbatim": "根據西元 1911 年至 2025 年的統計資料顯示，這段期間一共有 382 個颱風侵襲臺灣地區（註：颱風中心在臺灣登陸；或雖未登陸，僅在臺灣近海經過，但陸上有災情者），每年約有 3 至 4 個颱風侵襲。",
    "confidence": "✅",
    "insight_zh": "value 欄 3.5 只是「3 至 4 個」的中點，顯示時請用官方原句；侵臺颱風以 8 月最多（109 個），7 至 9 月合占 301 個（derived）。",
    "related_articles": [
      "knowledge/Nature/颱風.md",
      "knowledge/Geography/氣候.md",
      "knowledge/Nature/梅雨.md"
    ]
  },
  {
    "id": "species-count-taicol",
    "category": "Nature",
    "title_zh": "臺灣已記錄物種數（TaiCOL 接受名物種）",
    "title_en": "Species recorded in Taiwan (TaiCOL accepted species)",
    "value": 66470,
    "value_display": "66,470 種（其中特有種 9,881 種）",
    "unit": "種",
    "period": "2026-10-23 查詢當下（資料庫持續更新）",
    "source_agency": "臺灣物種名錄 TaiCOL（中研院生物多樣性研究中心／特有生物研究保育中心等維運）",
    "source_url": "https://api.taicol.tw/v2/taxon?rank=Species&is_in_taiwan=true&limit=1",
    "data_download_url": "https://api.taicol.tw/v2/taxon?rank=Species&is_in_taiwan=true&is_endemic=true&limit=1",
    "verbatim": "{\"status\": {\"code\": 200, \"message\": \"Success\"}, \"info\": {\"total\": 66470, \"limit\": 1, \"offset\": 0}}（rank=Species&is_in_taiwan=true）；is_endemic=true 加上 is_in_taiwan=true 查詢回傳 \"total\": 9881",
    "confidence": "✅",
    "insight_zh": "特有種占已記錄物種約 14.9%（9,881 除以 66,470，derived）；這是 API 即時計數，含外來種，定義為「分類群階層 Species、is_in_taiwan 為真」，不等於官方宣告的固定數字，上線前請決定是否釘住查詢日期。",
    "related_articles": [
      "knowledge/Nature/生態多樣性.md",
      "knowledge/Nature/特有種.md",
      "knowledge/Nature/台灣島嶼博物學.md"
    ]
  },
  {
    "id": "inbound-visitors-2025",
    "category": "Society",
    "title_zh": "來臺旅客人次",
    "title_en": "International visitor arrivals",
    "value": 8574547,
    "value_display": "857 萬 4,547 人次，年增 9.12%",
    "unit": "人次",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 7857686,
      "value_display": "785 萬 7,686 人次",
      "period": "2024 年",
      "verbatim": "總計 Grand Total 8574547.0 1854949.0 6719598.0 7857686.0 1697369.0 6160317.0 9.123054802648012"
    },
    "source_agency": "交通部觀光署（資料來源：內政部移民署）",
    "source_url": "https://admin.taiwan.net.tw/BusinessInfo/News?a=119&id=35219",
    "data_download_url": "https://admin.taiwan.net.tw/fapi/AttFile?type=NewsAttFile&id=39994",
    "verbatim": "表1-2 114年1至12月來臺旅客人次及成長率－按居住地分：總計 Grand Total 8,574,547（華僑旅客 1,854,949；外籍旅客 6,719,598），113年1至12月 7,857,686，成長 9.12%。註2: 資料來源：內政部移民署。",
    "confidence": "✅",
    "insight_zh": "日本以 1,483,176 人次居各居住地之首；大陸旅客 637,060 人次，較 2024 年增 45.4%。",
    "related_articles": [
      "knowledge/Lifestyle/桃園機場.md",
      "knowledge/Lifestyle/中華民國台灣護照.md",
      "knowledge/Geography/台灣行政區劃.md"
    ]
  },
  {
    "id": "outbound-travelers-2025",
    "category": "Society",
    "title_zh": "國人出國人次",
    "title_en": "Outbound departures of nationals",
    "value": 18944436,
    "value_display": "1,894 萬 4,436 人次，年增 12.43%",
    "unit": "人次",
    "period": "2025 年（民國 114 年）",
    "compare": {
      "value": 16849683,
      "value_display": "1,684 萬 9,683 人次",
      "period": "2024 年",
      "verbatim": "總計 Grand Total 1564197.0 1326383.0 17.929512064011675 18944436.0 16849683.0 12.4320024299567"
    },
    "source_agency": "交通部觀光署（資料來源：內政部移民署）",
    "source_url": "https://admin.taiwan.net.tw/BusinessInfo/News?a=119&id=35219",
    "data_download_url": "https://admin.taiwan.net.tw/fapi/AttFile?type=NewsAttFile&id=40004",
    "verbatim": "表2-2 114年12月及1至12月中華民國國民出國人次及成長率－按目的地分：總計 Grand Total，114年1-12月 18,944,436，113年1-12月 16,849,683，成長率 12.43%。資料來源：內政部移民署。",
    "confidence": "✅",
    "insight_zh": "出國人次是來臺旅客人次的 2.2 倍（derived：18,944,436 除以 8,574,547）；統計以首站抵達地計，各國實際接待人數請以目的地國公布為準。",
    "related_articles": [
      "knowledge/Lifestyle/桃園機場.md",
      "knowledge/Lifestyle/中華民國台灣護照.md"
    ]
  }
]
```

## 人讀筆記

### 查證方法與可重現性

- 政府站多數 WebFetch 會遇到憑證錯誤，改用 curl -k 取檔後本機解析（pdftotext、openpyxl）。每個 `verbatim` 都是從解析後的原文複製。
- 主計總處 2026-08-14 新聞稿：`news11508.pdf`（含「重要經濟指標表」2013 至 2027 年），同頁有 16 張 xlsx 附表。表內 2025 年數字為修正後的最新值（2 月概估成長率曾為 8.68%，媒體另有 8.63%、8.7% 的版本，皆已被取代）。
- 財政部：2026-01-09 新聞稿 PDF（114 年 12 月海關進出口統計）。2025 年全年數字後續是否再有微調，未追蹤。
- 證交所：`FMTQIK` 為官方 JSON；月訊 PDF 編號規律（0005000106 為 2025 年 12 月、0005000115 為 2026 年 9 月）。
- 本次後段 WebSearch 配額用完，所以氣象署地震統計、海岸線、三千公尺山峰、水庫等沒有做到交叉搜尋。

### 最沒把握的三個數字（請優先複核）

1. **半導體產業產值 6.52 兆元**：來源是工研院 IEK 的預估（2026 年 2 月版），非政府統計，且歷次版本從約 6.18 兆元上修到 6.52 兆元；TSIA 2026 年 5 月曾引用「6.5 兆元」的基期。建議頁面標「工研院估計」並寫明版本月份。
2. **物種數 66,470／特有種 9,881**：是 TaiCOL API 的即時計數（含外來種，過濾條件為 Species、is_in_taiwan、is_endemic），不是機構公告的固定數字，隨資料庫更新會變動。站上現有條目寫的是 2009 年「5 萬種」，口徑不同。若要保守，可改為在頁面標明「TaiCOL 2026-10-23 查詢」。
3. **年平均降雨量 2,500 毫米**：氣象署氣候小百科寫 2,500 毫米，行政院國情簡介寫約 2,200 毫米，兩份官方文件並存；選前者是因為出處是氣象署且附對照基準，但沒有查到 1991–2020 氣候平均值的原始表。

次要提醒：能源署（2,897 億度、再生 13.3%）與環境部能源資訊平台（2,889 億度）、媒體轉述的 13.1% 並不一致，已採能源署頁面；台電「歷年淨發購電量」表因網站擋爬取，沒有讀到。

### 沒查到的指標（標 ❓，不補數字）

- **2025 年有感地震次數**：氣象署地震測報中心網站的查詢是 POST 動態查詢，被 WAF 擋下（我沒有繞過）。可用的線索：2026 年編號制顯著有感地震，10 月 13 日已到第 069 號（頁面內容），代表編號每年重置，2025 年全年編號最大值需到查詢頁取。站上 `地形與地質.md` 寫「有感地震約 1,000 次」未標年份與出處。
- **海岸線長度**：沒有找到內政部／國土測繪中心的正式公告頁。
- **三千公尺以上山峰數／百岳**：站上 `台灣山岳與登山文化.md` 寫 268 座，引自維基與山友資料，沒有官方（內政部、林業署）一手來源，本次未驗證。
- **水庫數／總有效容量**：水利署 API 回 503，頁面為 JS 動態載入，未取得。
- **已知物種數的「官方宣告固定數字」**：僅有 TaiCOL 即時計數（見上）。

### 其他發現

- **核三廠問題的答案**：能源署 2025 年全年核能占比是 1.1%，不是 0。核三廠 2025 年 5 月停機（新聞轉述為 5 月 17 日；此日期只在搜尋摘要看到，屬 🔍，未打開原始公告），所以 2025 年仍有前四個多月的發電量；全年歸零要到 2026 年。
- **美國是否超過中港**：財政部新聞稿原文確認，對美出口占 30.9%、對中港占 26.6%，「為 26 年來首見」。這是「中國大陸與香港」合併口徑；單算中國大陸，更不用比。
- **台積電市值占比**：證交所月訊沒有直接公布占比，頁面上的 41.0%（2026-09）與 42.6%（2025-12）是兩個官方數字相除，標 derived。
- **出口序列**：財政部圖 2 只提供「月均出口值」，沒有年總額序列；若要年序列，需從財政部統計資料庫（`data_download_url`）另行下載。
- **補充可上架指標**：2026 年上半年成長 14.15%（主計總處）、2025 年家庭可支配所得平均 121.0 萬元（同一份新聞稿，屬 Society 組）、2025 年資本設備進口 1,050.3 億美元（半導體設備進口增 69.3%）、TSMC 前十大晶圓代工 2025 年合計營收約 1,695 億美元（TrendForce）。

### 站上明顯缺少的文章

1. **台灣觀光與入出境統計**：沒有以觀光產業、來臺旅客、出國人次為主題的條目（只有桃園機場、護照、全齡共融旅遊）。
2. **台灣能源轉型與電力結構總覽**：有電價、離岸風電、核能討論，但缺一篇講發電結構十年演變（燃煤、燃氣、再生、核能退場）的總覽；`台灣的電力與半導體.md` 偏半導體用電。
3. **台灣研發與科技政策（全國研發經費、科技預算）**：沒有對應條目。
4. **台灣外匯存底與央行**：`新台幣.md` 只涵蓋匯率面，沒有央行與外匯存底專文。
5. **台灣地震統計**：`Society/地震.md`、`Geography/台灣板塊運動與地震活動.md` 有，但缺年度統計口徑說明。
6. **台灣水庫總覽數據**：`台灣水庫與水資源管理.md` 有敘事，缺水利署數據來源與水庫總數。
7. **台灣海岸線與離島面積數據**：`台灣海岸地形與海洋地景.md` 沒有海岸線長度。

### 檔案與來源清單

- 主計總處：`https://www.dgbas.gov.tw/News_Content.aspx?n=3602&s=236591`（新聞稿頁），PDF 與 xlsx 皆在 `https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/`
- 財政部：`https://service.mof.gov.tw/public/Data/statistic/trade/news/11412/11412_中文新聞稿(上網).pdf`
- 央行：`https://www.cbc.gov.tw/tw/cp-302-192976-352ee-1.html`（2026-09）、`https://www.cbc.gov.tw/tw/cp-302-122543-401e1-1.html`（2020-09 對照）
- 證交所：`https://www.twse.com.tw/rwd/staticFiles/product/publication/0005000106.pdf`、`0005000115.pdf`；`https://www.twse.com.tw/rwd/zh/afterTrading/FMTQIK?date=YYYYMMDD&response=json`
- 工研院 IEK：`https://ieknet.iek.org.tw/iekrpt/rpt_more.aspx?actiontype=rpt&indu_idno=0&domain=95&rpt_idno=453795114`
- TrendForce：`https://www.trendforce.com/presscenter/news/20260909-13225.html`、`.../20260312-12965.html`
- 國科會：`https://www.nstc.gov.tw/folksonomy/detail/96a29f2b-a5da-4784-ac8e-9ffbe33159e7?l=CH`（新聞稿 PDF 內有 6 頁圖表）
- 能源署：`https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14437`
- 環境部氣候變遷署：`https://www.cca.gov.tw/climatetalks/emission-and-reduction/national/1867.html`、`https://www.cca.gov.tw/climatetalks/news/1656.html`
- 行政院國情簡介：`https://www.ey.gov.tw/state/235266A41238ECCE`
- 林業及自然保育署：`https://www.forest.gov.tw/0002393`（PDF `file/66716`）
- 氣象署：`https://climate.cwa.gov.tw/ClimatePedia/detail_page/7`、`https://www.cwa.gov.tw/V8/C/K/Encyclopedia/typhoon/typhoon.pdf`
- TaiCOL：`https://api.taicol.tw/v2/taxon`
- 觀光署：`https://admin.taiwan.net.tw/BusinessInfo/News?a=119&id=35219`（附件 xlsx：39994 來臺、40004 出國）
