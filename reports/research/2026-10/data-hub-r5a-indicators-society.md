# 資料中樞 R5a：人口與社會指標（研究分身交付）

> 存取日期 2026-10-23。查證方式：官方統計表／新聞稿原文實際開啟（WebFetch 或直接下載官方檔案後解析），`verbatim` 欄為原文或原表列逐字抄錄（表列以 `|` 分隔儲存格）。
> 信心標示：✅ 已開啟官方頁面／檔案並比對；🔍 只在新聞或搜尋摘要見到，官方頁面未直接顯示該數字；❓ 未驗證。
> 本檔共 34 筆指標，其中 33 筆 ✅、1 筆 🔍（房價所得比）。「加總」者在筆記中另行標明。

```json
[
  {
    "id": "population-total",
    "category": "Society",
    "title_zh": "總人口（戶籍登記）",
    "title_en": "Total registered population",
    "value": 23213251,
    "value_display": "2,321 萬",
    "unit": "人",
    "period": "2026 年 9 月底",
    "compare": {
      "value": 23539816,
      "value_display": "2,354 萬",
      "period": "2016 年底",
      "verbatim": "105年||8,561,383|23,539,816|11,719,270|11,820,546|208,440|108,133|100,307|8.86|172,405|103,144|69,261|7.33|36,035|1.53||147,861||||6.29||53,837||||2.29|964,536|952,829|553,228"
    },
    "series": [
      [2015, 23492074],
      [2016, 23539816],
      [2017, 23571227],
      [2018, 23588932],
      [2019, 23603121],
      [2020, 23561236],
      [2021, 23375314],
      [2022, 23264640],
      [2023, 23420442],
      [2024, 23400220],
      [2025, 23299132]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel（「01. 戶籍人口統計速報」，月份代碼 11509，XLS／ODS；下載為表單 POST，需先取得頁面 CSRF token）",
    "verbatim": "民 國 115 年 9 月 戶 口 統 計 速 報 表 / 年月別|戶 數|人口數 計|男|女 / 9月||9,938,700|23,213,251|11,409,469|11,803,782|7,704|3,965|3,739|4.04|16,712|9,484|7,228|8.76|－ 9,008|–4.72|6,749|6,490|259|78|181|3.54|3,971|3,892|79|16|63|2.08|70,672|73,134|641,332",
    "confidence": "✅",
    "insight_zh": "戶籍人口於 2019 年底達 23,603,121 人的高點，其後起伏下滑，2026 年 9 月底比高點少約 39 萬人。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Geography/用數據看台灣22縣市.md"
    ]
  },
  {
    "id": "births-2025",
    "category": "Society",
    "title_zh": "2025 年出生數",
    "title_en": "Births in 2025",
    "value": 107812,
    "value_display": "10.8 萬",
    "unit": "人",
    "period": "2025 年（登記數）",
    "compare": {
      "value": 213598,
      "value_display": "21.4 萬",
      "period": "2015 年",
      "verbatim": "104年||8,468,978|23,492,074|11,712,047|11,780,027|213,598|111,041|102,557|9.10|163,858|98,580|65,278|6.98|49,740|2.12||154,346||||6.58||53,459||||2.28|1,004,108|995,527|546,698"
    },
    "series": [
      [2015, 213598],
      [2016, 208440],
      [2017, 193844],
      [2018, 181601],
      [2019, 177767],
      [2020, 165249],
      [2021, 153820],
      [2022, 138986],
      [2023, 135571],
      [2024, 134856],
      [2025, 107812]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "同 population-total（戶籍人口統計速報，月份代碼 11509 或 11412）",
    "verbatim": "114年||9,851,532|23,299,132|11,462,401|11,836,731|107,812|55,797|52,015|4.62|200,268|115,151|85,117|8.58|－ 92,456|－ 3.96|104,376|101,071|3,305|1,043|2,262|4.47|52,101|51,203|898|214|684|2.23|1,057,397|1,066,029|629,456（欄位：出生 計107,812／男55,797／女52,015／折合年粗出生率4.62‰）",
    "confidence": "✅",
    "insight_zh": "2025 年出生數 107,812 人，約為 2015 年 213,598 人的一半。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Society/台灣人工生殖.md"
    ]
  },
  {
    "id": "tfr-2025",
    "category": "Society",
    "title_zh": "2025 年總生育率",
    "title_en": "Total fertility rate, 2025",
    "value": 0.695,
    "value_display": "0.695",
    "unit": "人（每名育齡婦女平均生育數）",
    "period": "2025 年",
    "compare": {
      "value": 1.18,
      "value_display": "1.18",
      "period": "2015 年",
      "verbatim": "104|1.18|21.4"
    },
    "series": [
      [2015, 1.18],
      [2016, 1.17],
      [2017, 1.13],
      [2018, 1.06],
      [2019, 1.05],
      [2020, 0.99],
      [2021, 0.98],
      [2022, 0.87],
      [2023, 0.865],
      [2024, 0.885],
      [2025, 0.695]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel（「總生育率及出生數」歷年全國表，下載代碼 y7s7，d5c 留空）",
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "同上（表單 POST：type=ods, m4c=y7s7, d5c 空白）",
    "verbatim": "年別|總生育率(人)|user按登記嬰兒出生數(萬人) / 113|0.885|13.5 / 114|0.695|10.8",
    "confidence": "✅",
    "insight_zh": "戶政司歷年表列出的總生育率，2025 年為 0.695，比 2024 年的 0.885 少 0.19，單年降幅在該表中最大。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Society/台灣人工生殖.md"
    ]
  },
  {
    "id": "deaths-2025",
    "category": "Society",
    "title_zh": "2025 年死亡數",
    "title_en": "Deaths in 2025",
    "value": 200268,
    "value_display": "20.0 萬",
    "unit": "人（登記數）",
    "period": "2025 年",
    "compare": {
      "value": 163858,
      "value_display": "16.4 萬",
      "period": "2015 年",
      "verbatim": "104年||8,468,978|23,492,074|11,712,047|11,780,027|213,598|111,041|102,557|9.10|163,858|98,580|65,278|6.98|49,740|2.12"
    },
    "series": [
      [2015, 163858],
      [2016, 172405],
      [2017, 171242],
      [2018, 172784],
      [2019, 176296],
      [2020, 173156],
      [2021, 183732],
      [2022, 207230],
      [2023, 205368],
      [2024, 202107],
      [2025, 200268]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "同 population-total",
    "verbatim": "114年||…|107,812|55,797|52,015|4.62|200,268|115,151|85,117|8.58|－ 92,456|－ 3.96|…（欄位：死亡 計200,268／男115,151／女85,117／折合年粗死亡率8.58‰）。另：內政統計通報 115 年第 34 週「114年國人死亡人數計19萬9,639人，較113年減少1,674人，其中65歲以上者15萬1,936人，占76.1%」（發生日期統計，口徑不同）",
    "confidence": "✅",
    "insight_zh": "死亡數在 2022 年升至 20 萬人以上後維持高檔，2025 年為 200,268 人（登記數）。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Society/台灣長期照顧制度發展.md"
    ]
  },
  {
    "id": "natural-increase-2025",
    "category": "Society",
    "title_zh": "2025 年人口自然增加（出生減死亡）",
    "title_en": "Natural increase, 2025",
    "value": -92456,
    "value_display": "減少 9.2 萬人",
    "unit": "人",
    "period": "2025 年（自 2020 年起連年為負）",
    "compare": {
      "value": 49740,
      "value_display": "增加 5.0 萬人",
      "period": "2015 年",
      "verbatim": "104年||…|49,740|2.12||154,346|…"
    },
    "series": [
      [2015, 49740],
      [2016, 36035],
      [2017, 22602],
      [2018, 8817],
      [2019, 1471],
      [2020, -7907],
      [2021, -29912],
      [2022, -68244],
      [2023, -69797],
      [2024, -67251],
      [2025, -92456]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "同 population-total",
    "verbatim": "108年||23,603,121|…|177,767|…|176,296|…|1,471|0.06| / 109年||23,561,236|…|165,249|…|173,156|…|–7,907|–0.34| / 114年||…|200,268|…|－ 92,456|－ 3.96|",
    "confidence": "✅",
    "insight_zh": "戶籍登記的出生減死亡在 2019 年為 +1,471 人，2020 年起轉為負值並逐年擴大，2025 年為 −92,456 人。",
    "related_articles": ["knowledge/Society/台灣少子化危機.md"]
  },
  {
    "id": "median-age",
    "category": "Society",
    "title_zh": "全體國民年齡中位數",
    "title_en": "Median age of the population",
    "value": 45.7,
    "value_display": "45.7 歲",
    "unit": "歲",
    "period": "2025 年底",
    "source_agency": "內政部統計處（內政統計通報 115 年第 8 週，資料來源戶政司）",
    "source_url": "https://www.moi.gov.tw/cl.aspx?n=21335",
    "data_download_url": "https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvMC8yMzExMS80MGI5NWZjZC1iNmYwLTRlMzAtOTQ4ZS00MDZlY2Y4MjM1ODQucGRm&n=MTE15bm056ysOOmAseWFp%2baUv%2be1seioiOmAmuWgsV%2fljp%2fkvY%2fmsJHmpoLms4EucGRm&icon=.pdf",
    "verbatim": "原住民年齡中位數為34.9歲，即有一半人口年齡在34.9歲以下，較全體國民之年齡中位數45.7歲，相對年輕。",
    "confidence": "✅",
    "insight_zh": "全體國民年齡中位數 45.7 歲，比原住民族人口的 34.9 歲高 10.8 歲。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Society/台灣長期照顧制度發展.md"
    ]
  },
  {
    "id": "aged-65-plus-share",
    "category": "Society",
    "title_zh": "65 歲以上人口占比",
    "title_en": "Share of population aged 65+",
    "value": 20.7,
    "value_display": "20.7%",
    "unit": "%",
    "period": "2026 年 9 月底（2025 年 12 月底首次超過 20%）",
    "compare": {
      "value": 12.51,
      "value_display": "12.5%",
      "period": "2015 年底",
      "verbatim": "總 計|23,492,074|11,712,047|11,780,027|100.00|3,187,780|1,660,486|1,527,294|13.57|17,365,715|8,690,421|8,675,294|73.92|2,938,579|1,361,140|1,577,439|12.51|10,737,544|5,395,196|5,342,348|45.71|18,804,459|9,270,457|9,534,002|80.05"
    },
    "series": [
      [2015, 12.51],
      [2016, 13.2],
      [2017, 13.86],
      [2018, 14.56],
      [2019, 15.28],
      [2020, 16.07],
      [2021, 16.85],
      [2022, 17.56],
      [2023, 18.35],
      [2024, 19.18],
      [2025, 20.06]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel（「05. 縣市人口年齡結構指標」m0s9，逐年 12 月；2025 另見 y1s8）",
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "同 population-total（m0s9 或 s000 的「年齡結構」工作表）",
    "verbatim": "各 縣 市 人 口 年 齡 結 構 統 計 表 / 中 華 民 國 115 年 9 月 底 / 總　計|23,213,251|11,409,469|11,803,782|100.00|2,605,796|1,348,371|1,257,425|11.23|15,801,402|7,900,187|7,901,215|68.07|4,806,053|2,160,911|2,645,142|20.70|… ／ 民國 114 年 11 月底 總 計 …|4,657,796|2,097,452|2,560,344|19.99 ／ 民國 114 年 12 月底 總 計 …|4,673,155|2,103,696|2,569,459|20.06",
    "confidence": "✅",
    "insight_zh": "65 歲以上占比在 2025 年 11 月底為 19.99%、12 月底為 20.06%，以占比 20% 為門檻計，2025 年 12 月進入超高齡社會；2026 年 9 月為 20.70%。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Society/台灣長期照顧制度發展.md",
      "knowledge/Geography/用數據看台灣22縣市.md"
    ]
  },
  {
    "id": "child-0-14-share",
    "category": "Society",
    "title_zh": "0 至 14 歲人口占比",
    "title_en": "Share of population aged 0-14",
    "value": 11.23,
    "value_display": "11.2%",
    "unit": "%",
    "period": "2026 年 9 月底",
    "compare": {
      "value": 13.57,
      "value_display": "13.6%",
      "period": "2015 年底",
      "verbatim": "總 計|23,492,074|11,712,047|11,780,027|100.00|3,187,780|1,660,486|1,527,294|13.57|17,365,715|…（104 年 12 月底，0～14歲 計3,187,780、占13.57%）"
    },
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "同 population-total（s000 的「年齡結構」工作表）",
    "verbatim": "總　計|23,213,251|11,409,469|11,803,782|100.00|2,605,796|1,348,371|1,257,425|11.23|15,801,402|7,900,187|7,901,215|68.07|4,806,053|2,160,911|2,645,142|20.70（中華民國 115 年 9 月底；0 ～ 14歲 計2,605,796、占11.23%）",
    "confidence": "✅",
    "insight_zh": "0 至 14 歲占比為 11.23%，低於 65 歲以上的 20.70%；2015 年底兩者為 13.57% 與 12.51%。",
    "related_articles": ["knowledge/Society/台灣少子化危機.md"]
  },
  {
    "id": "life-expectancy",
    "category": "Society",
    "title_zh": "平均壽命（零歲平均餘命）",
    "title_en": "Life expectancy at birth",
    "value": 81.27,
    "value_display": "81.27 歲（女 84.75／男 77.93）",
    "unit": "歲",
    "period": "2025 年（114 年簡易生命表）",
    "compare": {
      "value": 80.86,
      "value_display": "80.86 歲",
      "period": "2019 年（疫情前）",
      "verbatim": "已恢復至疫情前108年（80.86歲）水準。"
    },
    "source_agency": "內政部統計處（內政統計通報 115 年第 34 週）",
    "source_url": "https://www.moi.gov.tw/cl.aspx?n=21335",
    "data_download_url": "https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvMC8yMzUwMi9hYTA2YjMyNy1iYWNjLTRkMjctOTJlMS1kMjQ0ODRmNzRhMTUucGRm&n=56ysMTE15bm056ysMzTpgLHlhafmlL%2fntbHoqIjpgJrloLFf55Sf5ZG96KGoLnBkZg%3d%3d&icon=.pdf",
    "verbatim": "114年國人平均壽命為81.27歲，較113年80.77歲增加0.50歲，連續3年上升；已恢復至疫情前108年（80.86歲）水準。／ 114年我國女性平均壽命為84.75歲，男性為77.93歲，兩者相差6.82歲",
    "confidence": "✅",
    "insight_zh": "2025 年平均壽命 81.27 歲，女性比男性長 6.82 歲；縣市間以臺北市 83.98 歲最高、臺東縣 76.49 歲最低。",
    "related_articles": [
      "knowledge/Lifestyle/台灣醫療與全民健保.md",
      "knowledge/Society/台灣長期照顧制度發展.md"
    ]
  },
  {
    "id": "marriages-2025",
    "category": "Society",
    "title_zh": "2025 年結婚登記對數",
    "title_en": "Marriage registrations, 2025",
    "value": 104376,
    "value_display": "10.4 萬對",
    "unit": "對（登記數）",
    "period": "2025 年",
    "compare": {
      "value": 147861,
      "value_display": "14.8 萬對",
      "period": "2016 年",
      "verbatim": "105年 147,861 6.3 20,359 13.8 …（內政統計通報 115 年第 26 週表 1：總結婚登記對數 147,861、粗結婚率 6.3‰）"
    },
    "series": [
      [2015, 154346],
      [2016, 147861],
      [2017, 138034],
      [2018, 135403],
      [2019, 134524],
      [2020, 121702],
      [2021, 114606],
      [2022, 124997],
      [2023, 125192],
      [2024, 123061],
      [2025, 104376]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel（戶籍人口統計速報歷年欄「結婚(對數)合計」）",
    "source_agency": "內政部統計處（內政統計通報 115 年第 26 週）／戶政司",
    "source_url": "https://www.moi.gov.tw/cl.aspx?n=21335",
    "data_download_url": "https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvMC8yMzM4Mi9hOGRjNGFmNC00ODI0LTQwMzItODA1NC1jMmM3OWY4OGEwYWYucGRm&n=MTE15bm056ysMjbpgLHlhafmlL%2fntbHoqIjpgJrloLFf57WQ5ama55m76KiY5qaC5rOBLnBkZg%3d%3d&icon=.pdf",
    "verbatim": "114年結婚對數計10萬4,376對（不同性別10萬1,071對，相同性別3,305對），較113年減少15.2%，其中雙方均為我國籍者有8萬5,042對，占81.5%，一方為外籍與大陸、港澳地區人民者計1萬9,334對，占18.5%。粗結婚率為4.5‰，較113年減少0.8個千分點。",
    "confidence": "✅",
    "insight_zh": "2025 年登記結婚 104,376 對，比 2024 年的 123,061 對減少 15.2%，為該通報近 10 年表列的最低值。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Society/台灣同婚與性別平權.md"
    ]
  },
  {
    "id": "divorces-2025",
    "category": "Society",
    "title_zh": "2025 年離婚／終止結婚對數",
    "title_en": "Divorces and dissolved partnerships, 2025",
    "value": 52140,
    "value_display": "5.2 萬對",
    "unit": "對（按發生日期）",
    "period": "2025 年",
    "compare": {
      "value": 53850,
      "value_display": "5.4 萬對",
      "period": "2016 年",
      "verbatim": "114 年離婚/終止結婚對數計 5 萬 2,140 對，較 113 年減少 1,211 對，較 10 年前（105年）減少 1,710 對"
    },
    "series": [
      [2016, 53850],
      [2017, 54439],
      [2018, 54402],
      [2019, 54346],
      [2020, 51610],
      [2021, 47888],
      [2022, 50803],
      [2023, 53071],
      [2024, 53351],
      [2025, 52140]
    ],
    "series_source_url": "https://www.moi.gov.tw/cl.aspx?n=21335（內政統計通報 115 年第 38 週表 1）",
    "source_agency": "內政部統計處（內政統計通報 115 年第 38 週）",
    "source_url": "https://www.moi.gov.tw/cl.aspx?n=21335",
    "data_download_url": "https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvMC8yMzU5NC85NmI2NmY2NC03ZTk2LTQwNTctOGE2Ny0zYmJjOTlkM2U0OWQucGRm&n=MTE15bm056ysMzjpgLHlhafmlL%2fntbHoqIjpgJrloLFf5ama6b2h57Wx6KiILnBkZg%3d%3d&icon=.pdf",
    "verbatim": "我國 114 年離婚/終止結婚對數（按發生日期統計）計 5 萬 2,140 對（不同性別 5 萬 1,239 對，相同性別1901 對），平均每日 142.8 對。／ 114 年離婚/終止結婚者之婚齡中位數為 8.4 年，逾半數離婚者婚齡未滿 9 年；結婚未滿 5 年者占 33.4％，5~未滿 10 年者占 22.9％。",
    "confidence": "✅",
    "insight_zh": "2025 年離婚／終止結婚 52,140 對，婚齡中位數 8.4 年；婚齡 30 年以上的熟年離婚占 7.2%，高於 2016 年的 5.0%。",
    "related_articles": [
      "knowledge/Society/台灣同婚與性別平權.md",
      "knowledge/Society/台灣少子化危機.md"
    ]
  },
  {
    "id": "same-sex-marriages-cumulative",
    "category": "Society",
    "title_zh": "同性婚姻登記累計對數（2019 年 5 月 24 日起）",
    "title_en": "Cumulative same-sex marriage registrations since 24 May 2019",
    "value": 21647,
    "value_display": "約 2.16 萬對",
    "unit": "對（登記數，逐年相加）",
    "period": "2019 年 5 月 24 日至 2026 年 9 月底",
    "series": [
      [2019, 2939],
      [2020, 2387],
      [2021, 1856],
      [2022, 2477],
      [2023, 3199],
      [2024, 3205],
      [2025, 3305]
    ],
    "series_source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel（戶籍人口統計速報歷年欄「結婚 相同性別」；2026 年 1 至 9 月為 2,279 對）",
    "source_agency": "內政部戶政司",
    "source_url": "https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel",
    "data_download_url": "同 population-total",
    "verbatim": "108年||…|134,524|131,585|2,939|928|2,011|5.70| / 109年…|121,702|119,315|2,387|674|1,713|5.16| / 110年…|114,606|112,750|1,856|535|1,321|4.88| / 111年…|124,997|122,520|2,477|685|1,792|5.36| / 112年…|125,192|121,993|3,199|1,052|2,147|5.36| / 113年…|123,061|119,856|3,205|1,024|2,181|5.26| / 114年…|104,376|101,071|3,305|1,043|2,262|4.47| / 115年1~9月…|68,615|66,336|2,279|723|1,556|3.94|（欄位：結婚合計／不同性別／相同性別／男／女／粗結婚率）",
    "confidence": "✅",
    "insight_zh": "相同性別結婚登記自 2019 年施行以來，每年 1,856 至 3,305 對，其中女性配對各年都多於男性；2019 年首年 2,939 對（含 5 月 24 日起算）。",
    "related_articles": [
      "knowledge/Society/台灣同婚與性別平權.md",
      "knowledge/Society/LGBTQ.md",
      "knowledge/History/跨黨派的好政策.md"
    ]
  },
  {
    "id": "new-residents-spouses",
    "category": "Society",
    "title_zh": "外裔、外籍與大陸（含港澳）配偶人數（新住民配偶）",
    "title_en": "Foreign, Mainland and HK/Macau spouses of ROC nationals",
    "value": 622789,
    "value_display": "62.3 萬人",
    "unit": "人",
    "period": "2026 年 8 月底",
    "compare": {
      "value": 521136,
      "value_display": "52.1 萬人",
      "period": "2016 年 12 月底",
      "verbatim": "總　計|521,136|170,827|18,010|152,817|116,650|1,258|115,392|54,177|16,752|37,425|350,309|23,547|326,762|108,560|8,714"
    },
    "series_source_url": "https://www.immigration.gov.tw/5385/7344/7350/8887/?alias=settledown（逐月 ODS 檔）；已核對 2016 年底 521,136、2022 年底 577,900、2025 年底 615,355",
    "source_agency": "內政部移民署與戶政司",
    "source_url": "https://www.immigration.gov.tw/5385/7344/7350/8887/?alias=settledown",
    "data_download_url": "https://www.immigration.gov.tw/media/121824/外籍配偶人數與大陸-含港澳-配偶人數按證件分11508.ods",
    "verbatim": "各縣市外裔、外籍配偶人數與大陸（含港澳）配偶人數按證件分 76年1月至115年8月底 單位：人 / 總　計|622,789|229,046|32,011|197,035|…|393,743|34,587|359,156|…（總計622,789；外裔、外籍配偶合計229,046；大陸、港澳地區配偶合計393,743）／ 說明：2.本表大陸、港澳地區配偶人數係指向本部移民署申請證件之人數，而非核准人數。",
    "confidence": "✅",
    "insight_zh": "外裔、外籍與大陸（含港澳）配偶合計 62.3 萬人，其中大陸、港澳 39.4 萬人、外裔外籍 22.9 萬人，女性占多數。",
    "related_articles": [
      "knowledge/Culture/族群（閩南客家原住民外省新住民）.md",
      "knowledge/Food/台灣新住民美食融合.md"
    ]
  },
  {
    "id": "migrant-workers",
    "category": "Society",
    "title_zh": "產業及社福移工在臺人數",
    "title_en": "Migrant workers in industry and social-welfare sectors",
    "value": 866275,
    "value_display": "86.6 萬人",
    "unit": "人（含聘僱許可失效者；有效聘僱許可者為 766,212）",
    "period": "2025 年底",
    "compare": {
      "value": 587940,
      "value_display": "58.8 萬人",
      "period": "2015 年底",
      "verbatim": "資料集內 104年底 各國籍、性別「總計（人）」逐列相加＝587,940"
    },
    "series": [
      [2015, 587940],
      [2016, 624768],
      [2017, 676142],
      [2018, 706850],
      [2019, 718058],
      [2020, 709123],
      [2021, 669992],
      [2022, 728081],
      [2023, 753430],
      [2024, 820083],
      [2025, 866275]
    ],
    "series_source_url": "https://data.gov.tw/dataset/146535",
    "source_agency": "勞動部（政府資料開放平臺「引進移工在臺人數—按國籍、性別及年齡分」）",
    "source_url": "https://data.gov.tw/dataset/146535",
    "data_download_url": "https://apiservice.mol.gov.tw/OdService/download/A17000000J-030269-2uV（CSV）／ https://apiservice.mol.gov.tw/OdService/download/A17000000J-030269-ZPk（JSON）",
    "verbatim": "\"項目別\",\"總計（人）\",\"有效聘僱許可移工（人）\",… / \"114年底/ 印尼/ 男\",\"107606\",\"99292\",… / \"114年底/ 印尼/ 女\",\"217923\",\"194294\",… / \"114年底/ 菲律賓/ 男\",\"75595\",… / \"114年底/ 越南/ 男\",\"204034\",\"157915\",… ／ 114 年底各國籍加總：印尼 325,529、越南 295,719、菲律賓 173,784、泰國 71,241、馬來西亞 2＝866,275",
    "confidence": "✅",
    "insight_zh": "年底移工人數由 2015 年的 58.8 萬增至 2025 年的 86.6 萬，成長約 47%，印尼、越南、菲律賓三國占約 91%。",
    "related_articles": [
      "knowledge/Society/移工.md",
      "knowledge/Society/台灣長期照顧制度發展.md"
    ]
  },
  {
    "id": "indigenous-population",
    "category": "Society",
    "title_zh": "原住民族人口與族數",
    "title_en": "Indigenous population and recognized peoples",
    "value": 629456,
    "value_display": "62.9 萬人（占總人口 2.7%）；法定 16 族，連同平埔 10 族共 26 族",
    "unit": "人",
    "period": "2025 年底",
    "compare": {
      "value": 553228,
      "value_display": "55.3 萬人（2.4%）",
      "period": "2016 年底",
      "verbatim": "105年底 553,228 2.4 268,929 284,299 94.6 110,219 403,673 39,336 259,647 293,581 37.0 35.7 34.2 32.8"
    },
    "series": [
      [2016, 553228],
      [2017, 559426],
      [2018, 565561],
      [2019, 571427],
      [2020, 576792],
      [2021, 580758],
      [2022, 584125],
      [2023, 589038],
      [2024, 611674],
      [2025, 629456]
    ],
    "series_source_url": "https://www.moi.gov.tw/cl.aspx?n=21335（內政統計通報 115 年第 8 週表 1）",
    "source_agency": "內政部統計處（內政統計通報 115 年第 8 週，資料來源戶政司）",
    "source_url": "https://www.moi.gov.tw/cl.aspx?n=21335",
    "data_download_url": "https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvNDAwL3JlbGZpbGUvMC8yMzExMS80MGI5NWZjZC1iNmYwLTRlMzAtOTQ4ZS00MDZlY2Y4MjM1ODQucGRm&n=MTE15bm056ysOOmAseWFp%2baUv%2be1seioiOmAmuWgsV%2fljp%2fkvY%2fmsJHmpoLms4EucGRm&icon=.pdf",
    "verbatim": "114年底我國戶籍登記為原住民身分之人口數計62萬9,456人（平地原住民29萬3,986人占46.7％，山地原住民33萬5,470人占53.3％），較113年底增加2.9％，歷年皆呈增加趨勢，人口數占全國人口比率為2.7％，近10年占比逐年上升。／ 我國原住民族計 26 族，114 年底原住民人口數 62.9 萬人 ／ 註：我國原住民族 26 族為法定 16 族與平埔族 10 族，114 年 10 月 23 日公布施行《平埔原住民族群身分法》",
    "confidence": "✅",
    "insight_zh": "2025 年底戶籍登記原住民 62.9 萬人，阿美族 23.5 萬人最多；2024 年底人數單年增加 2.3 萬人，與 2024 年之前的年增幅（約 0.4 至 0.6 萬人）差距明顯。",
    "related_articles": [
      "knowledge/Culture/台灣原住民族16族文化地圖.md",
      "knowledge/Society/台灣原住民族土地正義與傳統領域.md",
      "knowledge/Culture/台灣原住民語言復振運動.md"
    ]
  },
  {
    "id": "household-size",
    "category": "Society",
    "title_zh": "平均每戶人數（家庭收支調查戶內人數）",
    "title_en": "Average household size",
    "value": 2.69,
    "value_display": "2.69 人",
    "unit": "人／戶",
    "period": "2025 年",
    "compare": {
      "value": 3.1,
      "value_display": "3.10 人",
      "period": "2015 年",
      "verbatim": "104年|3.10|1.43|122.5|66.5|14.8|18.3|22.9|96.5|0.8|31.1|2.5|83.7|0.8|26.6|2.5|76.0|0.6|20.5|1.8"
    },
    "series": [
      [2015, 3.1],
      [2016, 3.07],
      [2017, 3.07],
      [2018, 3.05],
      [2019, 3.02],
      [2020, 2.92],
      [2021, 2.89],
      [2022, 2.83],
      [2023, 2.79],
      [2024, 2.78],
      [2025, 2.69]
    ],
    "series_source_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t12-1.ods",
    "source_agency": "行政院主計總處（家庭收支調查，115 年 9 月 14 日國民所得統計評審會新聞稿附表 12）",
    "source_url": "https://www.stat.gov.tw/News_Content.aspx?n=3703&s=236591",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t12-1.ods",
    "verbatim": "表  12   家庭收支重要指標 (1/2) / 年別|戶內人數(人)|就業人數(人)|… / 114年|2.69|1.29|152.9|80.5|16.2|23.1|33.1|121.0|3.9|45.0|7.4|101.8|3.4|36.7|3.2|92.0|3.6|29.0|4.9",
    "confidence": "✅",
    "insight_zh": "家庭收支調查的戶內人數由 1991 年的 4.16 人降到 2025 年的 2.69 人；近十年間減少 0.41 人。",
    "related_articles": [
      "knowledge/Society/台灣少子化危機.md",
      "knowledge/Society/居住正義.md"
    ]
  },
  {
    "id": "higher-ed-institutions-students",
    "category": "Society",
    "title_zh": "大專校院校數與學生數",
    "title_en": "Tertiary institutions and enrolment",
    "value": 1057000,
    "value_display": "139 校、105.7 萬名學生",
    "unit": "學生數（人，教育部以萬人表示）",
    "period": "114 學年（2025-26）",
    "compare": {
      "value": 1203000,
      "value_display": "152 校、120.3 萬名學生",
      "period": "109 學年（2020-21）",
      "verbatim": "109 6,447 2,336 4,111 2,631 36 737 13 513 212 152 126 14 12（大專校院總校數 152）／ 大專校院學生數於 109 學年為 120.3 萬人，其後逐年減少，迄 114 學年降為 105.7 萬人"
    },
    "series": [
      [2015, 1332000],
      [2025, 1057000]
    ],
    "series_source_url": "https://stats.moe.gov.tw/files/analysis/115_st_report.pdf（104 學年 133.2 萬人、114 學年 105.7 萬人，僅兩個端點，不是完整年序列）",
    "source_agency": "教育部統計處",
    "source_url": "https://depart.moe.edu.tw/ED4500/News_Content.aspx?n=672D3725AE71AAC1&s=FE8BECD13CBC912F（114 學年學校基本概況統計結果提要分析）",
    "data_download_url": "https://depart.moe.edu.tw/ED4500/News.aspx?n=8B280379F02A2779&sms=E362574C42FCA1BF（115 年應用統計分析，提要分析 PDF）；https://stats.moe.gov.tw/files/analysis/115_st_report.pdf（學生數預測報告 PDF）",
    "verbatim": "至大專校院總校數為 139 所，較上學年減少 1 所。 / 大專校院          105.7    50.5         -1.8   -1.6     -14.7     -12.2 / 大專校院學生數於 109 學年為 120.3 萬人，其後逐年減少，迄 114 學年降為 105.7 萬人，5 學年間計減 14.7 萬人 / 自 87 學年起，因高教快速擴張及學校大量升格，觀察大專校院學生數，104 學年為 133.2 萬人，惟其後受少子女化影響，學生數減至 114 學年之 105.7 萬人",
    "confidence": "✅",
    "insight_zh": "大專校院學生數由 104 學年的 133.2 萬人降到 114 學年的 105.7 萬人，校數在 109 至 114 學年間由 152 所減為 139 所；教育部預測 130 學年將降至 86.5 萬人。",
    "related_articles": [
      "knowledge/Society/台灣高等教育擴張與退場.md",
      "knowledge/Society/教育制度與升學文化.md"
    ]
  },
  {
    "id": "univ-freshman-source",
    "category": "Society",
    "title_zh": "大學一年級生源：高級中等學校三年級生數",
    "title_en": "High-school seniors feeding university entry",
    "value": 192000,
    "value_display": "19.2 萬人",
    "unit": "人",
    "period": "114 學年（2025-26）",
    "compare": {
      "value": 302000,
      "value_display": "30.2 萬人",
      "period": "104 學年（2015-16）",
      "verbatim": "其中來自高級中等學校之學生生源人數，由 104 學年 30.2 萬人減至 114 學年 19.2 萬人，預測未來 16 學年生源在 13 至 21.5 萬人間震盪。"
    },
    "source_agency": "教育部統計處（各教育階段學生數預測報告 115～130 學年度）",
    "source_url": "https://stats.moe.gov.tw/files/analysis/115_st_report.pdf",
    "data_download_url": "https://stats.moe.gov.tw/files/analysis/115_st_report.pdf",
    "verbatim": "大學 1 年級學生2生源除了上學年高級中等學校 3 年級生及延修生外，尚有五專 3 年級直升 4 年級生、非應屆入學生及境外生。其中，來自高級中等學校之學生生源人數，由 104 學年 30.2 萬人減至 114 學年 19.2 萬人，預測未來 16 學年生源在 13 至 21.5 萬人間震盪。／ 130 學年大學 1 年級學生預測數為 15.1 萬人，較 114 學年減少 5.4 萬人或 26.3%",
    "confidence": "✅",
    "insight_zh": "來自高中端的大學入學生源十年間由 30.2 萬人降為 19.2 萬人；教育部預測 130 學年大學一年級生數為 15.1 萬人。",
    "related_articles": [
      "knowledge/Society/台灣高等教育擴張與退場.md",
      "knowledge/Society/台灣少子化危機.md"
    ]
  },
  {
    "id": "nhi-coverage",
    "category": "Lifestyle",
    "title_zh": "全民健保納保率",
    "title_en": "National Health Insurance coverage rate",
    "value": 99.9,
    "value_display": "99.9%（保險對象 2,396 萬人）",
    "unit": "%",
    "period": "2024 年（衛福部表 8 最新一期）",
    "compare": {
      "value": 99.7,
      "value_display": "99.7%（2,374 萬人）",
      "period": "2015 年",
      "verbatim": "104年|( 2015)|23,737|99.7|14.7|13.9|1,257|59,076|9.5|3,510|24.6"
    },
    "series": [
      [2015, 99.7],
      [2016, 99.7],
      [2017, 99.8],
      [2018, 99.8],
      [2019, 99.8],
      [2020, 99.9],
      [2021, 100.0],
      [2022, 99.9],
      [2023, 99.9],
      [2024, 99.9]
    ],
    "series_source_url": "https://dep.mohw.gov.tw/DOS/cp-5083-55386-113.html",
    "source_agency": "衛生福利部統計處（資料來源：衛福部健保署、勞動部勞工保險局）",
    "source_url": "https://dep.mohw.gov.tw/DOS/lp-5083-113.html",
    "data_download_url": "https://www.mohw.gov.tw/dl-63151-231a725b-918c-4a23-80aa-353eeda749ea.html（表 8 社會保險 ODS）",
    "verbatim": "表8社會保險 / 年別||全民健保||||國民年金 / ||保險對象人數|納保率|就醫指標… / ||||千人|％… / 113年|( 2024)|23,960|99.9|16.4|14.8|1,653|76,423|9.0|2,881|20.7 / 備註 2.納保率＝參與全民健康保險之人數／全國可參與全民健康保險之總人數×100。",
    "confidence": "✅",
    "insight_zh": "全民健保納保率自 2010 年的 99.4% 起維持在 99% 以上，2024 年為 99.9%。",
    "related_articles": [
      "knowledge/Lifestyle/全民健保.md",
      "knowledge/Lifestyle/台灣醫療與全民健保.md"
    ]
  },
  {
    "id": "physicians-per-10k",
    "category": "Lifestyle",
    "title_zh": "每萬人口西醫師數",
    "title_en": "Physicians per 10,000 population",
    "value": 24.2,
    "value_display": "24.2 人（西、中、牙醫師合計 35.0 人）",
    "unit": "人／萬人",
    "period": "2025 年",
    "compare": {
      "value": 18.7,
      "value_display": "18.7 人（合計 27.2 人）",
      "period": "2015 年",
      "verbatim": "104年|( 2015)|280,508|63,806|44,006|33,516|148,223|119.4|27.2|18.7|14.3|63.1"
    },
    "series": [
      [2015, 18.7],
      [2016, 19.1],
      [2017, 19.7],
      [2018, 20.1],
      [2019, 21.0],
      [2020, 21.7],
      [2021, 22.3],
      [2022, 22.8],
      [2023, 23.1],
      [2024, 23.6],
      [2025, 24.2]
    ],
    "series_source_url": "https://dep.mohw.gov.tw/DOS/cp-5083-55382-113.html",
    "source_agency": "衛生福利部統計處",
    "source_url": "https://dep.mohw.gov.tw/DOS/lp-5083-113.html",
    "data_download_url": "https://www.mohw.gov.tw/dl-63139-76c05cc7-7735-4203-8733-b3e5dfcbf652.html（表 4-3 醫療設施—醫事人力 ODS）",
    "verbatim": "表4-3醫療設施－醫事人力 / 年別||執業醫事人員數||||平均每萬人口執業醫事人員數 / 西醫師、中醫師及牙醫師||藥事人員|護理人員 / 114年|( 2025)|377,484|81,607|56,405|37,584|196,047|162.0|35.0|24.2|16.1|84.1（欄位對應：合計／西中牙醫師／西醫師／藥事／護理；每萬人口 西醫師 24.2）",
    "confidence": "✅",
    "insight_zh": "每萬人口西醫師數十年內由 18.7 人增為 24.2 人；護理人員每萬人口 84.1 人。",
    "related_articles": [
      "knowledge/Lifestyle/台灣醫療與全民健保.md",
      "knowledge/Society/醫療法.md"
    ]
  },
  {
    "id": "leading-cause-cancer",
    "category": "Society",
    "title_zh": "十大死因第一名：惡性腫瘤（癌症）",
    "title_en": "Leading cause of death: malignant neoplasms",
    "value": 44,
    "value_display": "已連續 44 年居十大死因首位",
    "unit": "年（連續居首）",
    "period": "2025 年（114 年死因統計）",
    "source_agency": "衛生福利部統計處",
    "source_url": "https://dep.mohw.gov.tw/DOS/np-5068-113.html",
    "data_download_url": "https://www.mohw.gov.tw/dl-100896-73bd5dff-71ba-439d-8ee3-87ebf2789912.html（新聞稿含簡報 PDF）；https://www.mohw.gov.tw/dl-100893-0088a286-5aea-4ed6-a74a-b9eb75feb67a.html（摘要表 ODS）",
    "verbatim": "114年十大癌症死因排名與113年同，癌症已連續44年居首位；肺癌、肝癌、結腸直腸癌連續22年居前3名。／ 依死亡率排序，114 年十大死因依序為(1)惡性腫瘤(癌症)(2)心臟疾病(3)肺炎(4)腦血管疾病(5)糖尿病(6)高血壓性疾病(7)事故傷害(8)腎炎、腎病症候群及腎病變(9)慢性下呼吸道疾病(10)蓄意自我傷害(自殺)。",
    "confidence": "✅",
    "insight_zh": "十大死因依序為癌症、心臟疾病、肺炎、腦血管疾病、糖尿病；癌症已連續 44 年居第一。",
    "related_articles": [
      "knowledge/Lifestyle/台灣醫療與全民健保.md",
      "knowledge/Society/台灣公共衛生與防疫體系.md"
    ]
  },
  {
    "id": "cancer-deaths-2025",
    "category": "Society",
    "title_zh": "2025 年癌症死亡人數",
    "title_en": "Cancer deaths, 2025",
    "value": 54838,
    "value_display": "5.5 萬人（占全部死亡 27.5%）",
    "unit": "人",
    "period": "2025 年",
    "source_agency": "衛生福利部統計處",
    "source_url": "https://dep.mohw.gov.tw/DOS/np-5068-113.html",
    "data_download_url": "https://www.mohw.gov.tw/dl-100893-0088a286-5aea-4ed6-a74a-b9eb75feb67a.html（114年死因統計結果摘要表 ODS）",
    "verbatim": "114 年癌症死亡人數為 5 萬 4,838 人，每十萬人口有 234.9 人因癌症死亡，標準化死亡率為每十萬人口 111.5 人，較 113 年 113.3 人下降。／ 表1 主要死亡原因 民國114年：所有死亡原因|199,576|854.7|395.2|100.0 ／ 1|C00-C97|惡性腫瘤|54,838|234.9|111.5|27.5",
    "confidence": "✅",
    "insight_zh": "2025 年癌症死亡 54,838 人，占全部死亡 27.5%；死因統計的全年死亡數為 199,576 人。",
    "related_articles": ["knowledge/Lifestyle/台灣醫療與全民健保.md"]
  },
  {
    "id": "unemployment-rate-latest",
    "category": "Economy",
    "title_zh": "失業率（最新月）",
    "title_en": "Unemployment rate, latest month",
    "value": 3.36,
    "value_display": "3.36%（失業 40.5 萬人，季調 3.33%）",
    "unit": "%",
    "period": "2026 年 9 月（2026-10-23 發布）",
    "source_agency": "行政院主計總處",
    "source_url": "https://www.stat.gov.tw/News_Content.aspx?n=3703&s=236801",
    "data_download_url": "同 source_url 頁面附表 1 至 22（EXCEL／ODS）",
    "verbatim": "115年9月就業人數為1,164萬人，失業人數為40.5萬人，失業率為3.36%，季調失業率為3.33%，勞動力參與率為59.59% ／ 9月失業率為3.36%，較上月下降0.05個百分點；經季節調整後失業率為3.33%，較上月上升0.01個百分點。",
    "confidence": "✅",
    "insight_zh": "2026 年 9 月失業率 3.36%，勞動力參與率 59.59%。",
    "related_articles": [
      "knowledge/Society/誰算低薪.md",
      "knowledge/Society/台灣青年的生涯迷航.md"
    ]
  },
  {
    "id": "unemployment-rate-2025",
    "category": "Economy",
    "title_zh": "失業率（2025 年平均）",
    "title_en": "Unemployment rate, 2025 annual average",
    "value": 3.35,
    "value_display": "3.35%（失業 40.3 萬人）",
    "unit": "%",
    "period": "2025 年平均",
    "source_agency": "勞動部（勞動統計年報摘要分析，引主計總處人力資源調查）",
    "source_url": "https://statdb.mol.gov.tw/html/year/year14/0-3.114_Summary%20Analysis.pdf",
    "data_download_url": "https://statdb.mol.gov.tw/html/year/year14/0-3.114_Summary%20Analysis.pdf",
    "verbatim": "114 年就業人數平均為 1,162.6 萬人（男性 636.6 萬人，女性 526 萬人），較 113 年增加 0.26%…114 年失業人數平均為 40.3 萬人，失業率 3.35%，分別較 113 年減少 3 千人、0.03 個百分點。／ 資料來源：行政院主計總處「人力資源調查」。",
    "confidence": "✅",
    "insight_zh": "2025 年平均失業率 3.35%，較 2024 年低 0.03 個百分點；勞動部摘要列示 2024 年為 3.38%。",
    "related_articles": ["knowledge/Society/誰算低薪.md"]
  },
  {
    "id": "median-annual-salary",
    "category": "Economy",
    "title_zh": "受僱員工全年總薪資中位數",
    "title_en": "Median annual total earnings of employees",
    "value": 546000,
    "value_display": "54.6 萬元（約每月 4.55 萬）",
    "unit": "新臺幣元",
    "period": "2024 年（主計總處最新一期，2025-11-25 發布；2025 年數字尚未發布）",
    "compare": {
      "value": 525000,
      "value_display": "52.5 萬元",
      "period": "2023 年",
      "verbatim": "112年工業及服務業全體受僱員工（含本國籍、外國籍之全時員工及部分工時員工）全年總薪資（含經常性與獎金等非經常性薪資）中位數為52.5萬元，較上（111）年增加1.22%。"
    },
    "source_agency": "行政院主計總處",
    "source_url": "https://www.stat.gov.tw/News_Content.aspx?n=2716&s=235514",
    "data_download_url": "同 source_url 頁面附表 1 至 7（EXCEL／ODS）",
    "verbatim": "一、113年工業及服務業全體受僱員工（含本國籍、外國籍之全時員工及部分工時員工）全年總薪資（含經常性薪資與獎金等非經常性薪資）中位數為54.6萬元，較上（112）年增加4.03%。二、113年本國籍全時受僱員工全年總薪資中位數為58.5萬元，年增4.52%。三、全體受僱員工按性別觀察113年全年總薪資中位數，女性51.2萬元，男性58.5萬元",
    "confidence": "✅",
    "insight_zh": "2024 年全體受僱員工全年總薪資中位數 54.6 萬元；本國籍全時員工為 58.5 萬元，女性 51.2 萬元、男性 58.5 萬元。",
    "related_articles": ["knowledge/Society/誰算低薪.md"]
  },
  {
    "id": "median-regular-wage-monthly",
    "category": "Economy",
    "title_zh": "本國籍全時員工每月經常性薪資中位數",
    "title_en": "Median monthly regular wage (full-time nationals)",
    "value": 41353,
    "value_display": "41,353 元（平均 52,523 元）",
    "unit": "新臺幣元／月",
    "period": "2026 年 8 月",
    "source_agency": "行政院主計總處",
    "source_url": "https://www.stat.gov.tw/News_Content.aspx?n=3703&s=236785",
    "data_download_url": "同 source_url 頁面附表 1 至 13（EXCEL／ODS）",
    "verbatim": "一、本國籍全時受僱員工8月薪資（一）經常性薪資中位數為41,353元，年增3.46%。（二）經常性薪資平均數為52,523元，年增3.28%；加計獎金、紅利及加班費等非經常性薪資16,997元，總薪資平均數為69,520元，年增6.64%。",
    "confidence": "✅",
    "insight_zh": "2026 年 8 月本國籍全時員工經常性薪資中位數 41,353 元，低於平均數 52,523 元。",
    "related_articles": ["knowledge/Society/誰算低薪.md"]
  },
  {
    "id": "minimum-wage-2026",
    "category": "Economy",
    "title_zh": "2026 年最低工資（原基本工資）",
    "title_en": "Minimum wage, 2026",
    "value": 29500,
    "value_display": "月薪 29,500 元／時薪 196 元（2027 年 1 月起 30,900 元／205 元）",
    "unit": "新臺幣元",
    "period": "2026 年 1 月 1 日起",
    "compare": {
      "value": 20008,
      "value_display": "月薪 20,008 元",
      "period": "2016 年（2015 年 7 月 1 日起適用）",
      "verbatim": "民國103年9月15日發布，自104年7月1日起實施，每月基本工資調整為20,008元，每小時基本工資為120元。"
    },
    "series": [
      [2016, 20008],
      [2017, 21009],
      [2018, 22000],
      [2019, 23100],
      [2020, 23800],
      [2021, 24000],
      [2022, 25250],
      [2023, 26400],
      [2024, 27470],
      [2025, 28590],
      [2026, 29500]
    ],
    "series_source_url": "https://www.mol.gov.tw/1607/28162/28166/28180/28182/28184/29016/；https://www.mol.gov.tw/1607/28162/28166/28180/70460/76761/76833/post（各年 1 月 1 日適用月薪）",
    "source_agency": "勞動部",
    "source_url": "https://www.mol.gov.tw/1607/28162/28166/28180/70460/76761/76833/post",
    "data_download_url": "同 source_url（網頁表列）",
    "verbatim": "民國113年9月19日發布，自114年1月1日起實施，訂定每月最低工資為28,590元，每小時最低工資為190元。／ 民國114年10月21日發布，自115年1月1日起實施，訂定每月最低工資為29,500元，每小時最低工資為196元。／ 民國115年10月16日發布，自116年1月1日起實施，訂定每月最低工資為30,900元，每小時最低工資為205元。／ 114年1月1日起，基本工資由最低工資取代，接續保障勞工工資的最低標準。",
    "confidence": "✅",
    "insight_zh": "2026 年最低工資月薪 29,500 元、時薪 196 元；2026 年 10 月 16 日公布 2027 年調為 30,900 元與 205 元，已連續 11 年調升。",
    "related_articles": [
      "knowledge/Society/誰算低薪.md",
      "knowledge/Society/外送專法.md"
    ]
  },
  {
    "id": "working-hours",
    "category": "Economy",
    "title_zh": "工業及服務業受僱員工每人每月平均工時",
    "title_en": "Average monthly working hours of employees",
    "value": 168.9,
    "value_display": "每月 168.9 小時（其中正常工時 160.1 小時）",
    "unit": "小時／月",
    "period": "2025 年",
    "compare": {
      "value": 169.2,
      "value_display": "169.2 小時",
      "period": "2024 年",
      "verbatim": "113年 8 457 732 024 46 450 169.2 7 478 776 244 49 061 …（主計總處 114 年全年薪資統計表 16，全體受僱員工每人每月平均總工時）"
    },
    "source_agency": "行政院主計總處；勞動部（勞動統計年報摘要分析）",
    "source_url": "https://statdb.mol.gov.tw/html/year/year14/0-3.114_Summary%20Analysis.pdf",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/235863/表16.ods（及 表10.ods 按行業別）",
    "verbatim": "114 年工業及服務業每人每月總薪資平均為 63,383 元，年增 3.9%，其中經常性薪資 47,885 元，年增 3.1%；每人每月平均工時 168.9 小時，年減 0.3 小時，其中正常工時 160.1 小時，年減 0.6 小時。／ 表16 … 114年Ⓟ|8 523|760 632|47 884|168.9|7 499|806 448|50 643|…",
    "confidence": "✅",
    "insight_zh": "工業及服務業員工 2025 年平均每月工時 168.9 小時，工業部門 175.1 小時、服務業低於工業。",
    "related_articles": [
      "knowledge/Society/誰算低薪.md",
      "knowledge/Society/外送專法.md"
    ]
  },
  {
    "id": "mortgage-burden-ratio",
    "category": "Economy",
    "title_zh": "全國房貸負擔率",
    "title_en": "National mortgage burden ratio",
    "value": 43.12,
    "value_display": "43.12%（中位數住宅價格 980 萬元）",
    "unit": "%",
    "period": "2025 年第 2 季（本次可開啟的內政部最新一期，2025-11-28 發布）",
    "source_agency": "內政部地政司",
    "source_url": "https://www.moi.gov.tw/News_Content.aspx?n=4&s=334813",
    "data_download_url": "（內政部不動產資訊平台 https://pip.moi.gov.tw/ 本次連線被重置，未取得下載連結）",
    "verbatim": "內政部今（28）日發布114年第2季全國房貸負擔率為43.12%，較上季下降1.41%。…房貸負擔率是以中位數所得家庭購買住宅為基準，計算其每月房貸支出占可支配所得的比率…本季全國中位數住宅價格較上季下跌2%（由1,000萬元降至980萬元）…同期家戶可支配所得增加約1.51%（由97.67萬元增至99.14萬元）",
    "confidence": "✅",
    "insight_zh": "2025 年第 2 季全國房貸負擔率 43.12%，為連續第 3 季下降；內政部頁面同時列出全國中位數住宅價格 980 萬元。",
    "related_articles": [
      "knowledge/Society/居住正義.md",
      "knowledge/Society/社會住宅與居住正義.md",
      "knowledge/Society/國宅與居住正義.md"
    ]
  },
  {
    "id": "house-price-income-ratio",
    "category": "Economy",
    "title_zh": "全國房價所得比",
    "title_en": "National house price-to-income ratio",
    "value": 9.89,
    "value_display": "9.89 倍",
    "unit": "倍",
    "period": "2025 年第 2 季（官方頁面僅列中位數房價與中位數所得，比值見新聞；與官方兩數相除 980÷99.14＝9.89 相符）",
    "source_agency": "內政部（經濟日報引述 2025-11-28 內政部發布）",
    "source_url": "https://money.udn.com/money/story/5621/9170262",
    "data_download_url": "（待補：內政部不動產資訊平台房價所得比表）",
    "verbatim": "觀察第2季全國房價所得比為9.89倍，意味著一般家庭若不吃不喝，約需將近十年的所得才能購買一戶中位數住宅。",
    "confidence": "🔍",
    "insight_zh": "2025 年第 2 季全國房價所得比 9.89 倍，以中位數房價 980 萬元與家戶可支配所得中位數 99.14 萬元計算相符。",
    "related_articles": [
      "knowledge/Society/居住正義.md",
      "knowledge/Society/社會住宅與居住正義.md",
      "knowledge/Society/台灣的年級生世代.md"
    ]
  },
  {
    "id": "homeownership-rate",
    "category": "Society",
    "title_zh": "自有住宅率（家庭收支調查）",
    "title_en": "Homeownership rate",
    "value": 83.95,
    "value_display": "83.95%",
    "unit": "%（住宅所有權為戶內經常居住成員所擁有的家庭占比）",
    "period": "2025 年",
    "source_agency": "行政院主計總處（家庭收支調查）",
    "source_url": "https://data.gov.tw/dataset/111590",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/461/relfile/11525/232214/078-家庭住宅及主要設備概況依可支配所得按戶數五等分位分.csv",
    "verbatim": "\"年\",\"家庭住宅及主要設備概況\",\"全體家庭%\",\"最低所得組%\",… / \"2025\",\"住宅所有權為自有(戶內經常居住成員所擁有)\",\"83.95\",\"77.17\",\"80.8\",\"83.38\",\"86.93\",\"91.46\" / \"2025\",\"住宅所有權為不住在一起的配偶、父母或子女所擁有\",\"5.61\",\"7.75\",… / \"2025\",\"住宅所有權為租押\",\"7.62\",\"10.46\",…",
    "confidence": "✅",
    "insight_zh": "家庭收支調查中 83.95% 的家庭住在自有住宅；最低所得組 77.17%，最高所得組 91.46%；租押者占 7.62%。",
    "related_articles": [
      "knowledge/Society/國宅與居住正義.md",
      "knowledge/Society/居住正義.md"
    ]
  },
  {
    "id": "low-income-households",
    "category": "Society",
    "title_zh": "低收入戶人數與占比",
    "title_en": "Low-income households and persons",
    "value": 263294,
    "value_display": "26.3 萬人（占總人口 1.1%；141,947 戶）",
    "unit": "人",
    "period": "2024 年底（衛福部統計指標表 9 最新一期；2025 年數字未見於該表）",
    "compare": {
      "value": 342490,
      "value_display": "34.2 萬人（1.5%）",
      "period": "2015 年底",
      "verbatim": "104年|146,379|1.7|342,490|1.5|117,686|1.4|356,185|1.5"
    },
    "series": [
      [2015, 342490],
      [2016, 331776],
      [2017, 317257],
      [2018, 311526],
      [2019, 304470],
      [2020, 300241],
      [2021, 295901],
      [2022, 288703],
      [2023, 277364],
      [2024, 263294]
    ],
    "series_source_url": "https://dep.mohw.gov.tw/DOS/cp-5083-55387-113.html",
    "source_agency": "衛生福利部統計處",
    "source_url": "https://dep.mohw.gov.tw/DOS/lp-5083-113.html",
    "data_download_url": "https://www.mohw.gov.tw/dl-63154-6636f03a-2b46-4482-9ed4-c7545f191a00.html（表 9 社會救助 ODS）",
    "verbatim": "表9社會救助 / 年別|低收入戶||||中低收入戶 / |戶數|占總戶數比|人數|占總人數比|戶數|占總戶數比|人數|占總人數比 / 113年|141,947|1.5|263,294|1.1|102,546|1.1|266,419|1.1 / 備註：100年7月1日起實施新制社會救助法，放寬認定標準，並納入中低收入戶。",
    "confidence": "✅",
    "insight_zh": "低收入戶人數由 2015 年底的 34.2 萬人降至 2024 年底的 26.3 萬人，占總人口比由 1.5% 降到 1.1%；中低收入戶另有 26.6 萬人。",
    "related_articles": [
      "knowledge/Society/誰算低薪.md",
      "knowledge/Society/社會住宅與居住正義.md"
    ]
  },
  {
    "id": "income-quintile-ratio",
    "category": "Economy",
    "title_zh": "家庭可支配所得五等分位差距（每戶）",
    "title_en": "Household disposable income quintile ratio",
    "value": 6.17,
    "value_display": "6.17 倍（吉尼係數 0.341）",
    "unit": "倍",
    "period": "2025 年",
    "compare": {
      "value": 6.06,
      "value_display": "6.06 倍",
      "period": "2015 年",
      "verbatim": "104年|6.06|0.338|3.91|0.279|3.87|0.270"
    },
    "series": [
      [2015, 6.06],
      [2016, 6.08],
      [2017, 6.07],
      [2018, 6.09],
      [2019, 6.1],
      [2020, 6.13],
      [2021, 6.15],
      [2022, 6.15],
      [2023, 6.12],
      [2024, 6.14],
      [2025, 6.17]
    ],
    "series_source_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t12-2.ods",
    "source_agency": "行政院主計總處（家庭收支調查）",
    "source_url": "https://www.stat.gov.tw/News_Content.aspx?n=3703&s=236591",
    "data_download_url": "https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/t12-2.ods",
    "verbatim": "（二）每戶5等分位所得差距6.17倍，較113年增0.03倍；每人5等分位所得差距3.73倍，較113年減0.18倍。／ 114年每戶家庭可支配所得平均數為121.0萬元，較113年增3.9％，中位數為101.8萬元，增3.4％ ／ 表12-2：114年|6.17|0.341|3.73|0.272|3.85|0.266",
    "confidence": "✅",
    "insight_zh": "以每戶計，最高 20% 與最低 20% 家庭的可支配所得差距為 6.17 倍；以每人計（扣除戶量）為 3.73 倍。",
    "related_articles": [
      "knowledge/Society/誰算低薪.md",
      "knowledge/Society/居住正義.md"
    ]
  },
  {
    "id": "health-expenditure-gdp",
    "category": "Lifestyle",
    "title_zh": "國民醫療保健支出占 GDP 比率",
    "title_en": "National health expenditure as share of GDP",
    "value": 7.3,
    "value_display": "7.3%（1 兆 8,897 億元）",
    "unit": "%",
    "period": "2024 年（衛福部表 3 最新一期）",
    "compare": {
      "value": 6.7,
      "value_display": "6.7%",
      "period": "2015 年",
      "verbatim": "104年|( 2015)|6.7|1,145,900|35,910|56.7|48,839|1,531|726,895|22,780"
    },
    "series": [
      [2015, 6.7],
      [2016, 6.9],
      [2017, 7.1],
      [2018, 7.4],
      [2019, 7.5],
      [2020, 7.7],
      [2021, 7.6],
      [2022, 7.8],
      [2023, 7.8],
      [2024, 7.3]
    ],
    "series_source_url": "https://dep.mohw.gov.tw/DOS/cp-5083-55379-113.html",
    "source_agency": "衛生福利部統計處（資料來源：主計總處、衛福部統計處）",
    "source_url": "https://dep.mohw.gov.tw/DOS/lp-5083-113.html",
    "data_download_url": "（由 https://dep.mohw.gov.tw/DOS/cp-5083-55379-113.html 內「表3 國民醫療保健支出.ods」下載）",
    "verbatim": "表3國民醫療保健支出 / 年別||國民醫療保健支出占GDP比|…新臺幣百萬元|百萬美元|公部門醫療保健支出占國民醫療保健支出比 / 113年|( 2024)|7.3|1,889,666|58,850|57.2|80,719|2,514|1,099,390|34,238",
    "confidence": "✅",
    "insight_zh": "國民醫療保健支出 2024 年為 1 兆 8,897 億元，占 GDP 7.3%，公部門約占 57.2%。",
    "related_articles": [
      "knowledge/Lifestyle/全民健保.md",
      "knowledge/Lifestyle/台灣醫療與全民健保.md"
    ]
  }
]
```

## 筆記

### 一、取得方式與可重現性

- 戶政司資料：`https://www.ris.gov.tw/info-popudata/app/awFastDownload/toMain_panel` 是 JS 頁面，下載為 POST（欄位 `type`、`m4c`、`d5c`、`_csrf`），`_csrf` 在頁面 `<meta name="_csrf">`，需同一 session cookie。本次用的代碼：`s000`（戶籍人口統計速報，d5c=11509／11412／10412）、`m0s9`（縣市人口年齡結構指標，逐月）、`y7s7`（總生育率及出生數，d5c 留空取最新）、`y2sa`（育齡婦女生育率）。下載 ODS 後以標準函式庫解析。正式上線前建議把這些檔案落地快取，不要由前端即時抓。
- 主計總處網站憑證鏈不完整，WebFetch 會報 `unable to verify the first certificate`；本次改用 curl 加 `-k` 只讀公開頁面（未送出任何資料）。
- 勞動統計查詢網 `statfy.mol.gov.tw` 在本環境逾時／被拒，導致「移工最新月人數」取不到月度官方值，改用政府資料開放平臺上的勞動部年底資料集。
- WebSearch 額度已用完，後半段沒有再搜尋；以下缺口皆因此留白，不是省略。

### 二、同一概念多個數字：採用哪個、為什麼

| 項目          | 數字          | 口徑                                                                            | 採用               |
| ------------- | ------------- | ------------------------------------------------------------------------------- | ------------------ |
| 2025 死亡數   | 200,268       | 戶政司登記數（速報表，與出生、結婚同口徑）                                      | 本檔 `deaths-2025` |
|               | 199,639       | 內政統計通報（簡易生命表，按發生日期）                                          | 平均壽命條目引用   |
|               | 199,576       | 衛福部死因統計                                                                  | 癌症條目引用       |
| 2025 總生育率 | 0.695         | 戶政司歷年表（y7s7，與新聞引用的內政部數字一致）                                | 本檔 `tfr-2025`    |
|               | 0.685（685‰） | 戶政司 y2sa（按發生日期，並將在臺居留未設戶籍之外籍與大陸配偶納入育齡婦女人數） | 未採用，供對照     |
| 2025 離婚     | 52,140        | 內政統計通報（按發生日期，含相同性別終止 901 對）                               | 本檔               |
|               | 52,101        | 速報表（按登記日期）                                                            | 未採用             |
| 2025 結婚     | 104,376       | 登記數；通報與速報一致                                                          | 本檔               |
| 平均每戶人數  | 2.69          | 家庭收支調查（戶內人數）                                                        | 本檔               |
|               | 約 2.34       | 戶籍人口÷戶數（23,213,251÷9,938,700，我自行相除，未列為指標）                   | 不列               |

### 三、站上明顯缺一篇文章的指標

1. **新住民／外籍配偶**：只有 `Culture/族群（閩南客家原住民外省新住民）.md` 與 `Food/台灣新住民美食融合.md`，沒有專談「新住民人口、跨國婚姻、外配政策」的 Society 文章。
2. **平均壽命與人口老化**：沒有「超高齡社會」專文（`台灣少子化危機.md` 與 `台灣長期照顧制度發展.md` 只各提兩次），也沒有談「平均壽命、縣市壽命落差（臺北 83.98 對臺東 76.49）」的文章。
3. **勞動時間／最低工資／失業**：`誰算低薪.md` 涵蓋最低工資，但沒有「工時與過勞」「失業與就業結構」的文章；Economy 分類沒有勞動市場總覽。
4. **家庭與婚姻變遷**：沒有談結婚對數下滑、離婚與熟年離婚、平均每戶人數縮小的文章（`同婚` 只涵蓋相同性別）。
5. **癌症與十大死因**：沒有死因、癌症篩檢相關文章（`台灣醫療與全民健保.md` 只提一次癌症）。
6. **所得分配與貧窮**：沒有「家庭所得、吉尼係數、低收入戶」專文；`冷氣與能源貧窮議題.md`、`學習貧窮.md` 是議題文，不是全局概況。
7. **移工**：`移工.md` 已有，但本檔的「人數十年成長 47%、三國占 91%」可回饋補強。

### 四、我最沒把握的三個數字

1. **房價所得比 9.89（🔍）**：只在經濟日報引述的新聞見到；內政部頁面只列中位數房價 980 萬與中位數所得 99.14 萬（相除得 9.89），沒有直接寫房價所得比。而且我開得到的最新一期是 2025 年第 3 季之前（2025Q2），2025Q3 以後各季在內政部新聞列表前 4 頁沒找到，可能發布頁標題用詞不同，需補查。
2. **移工 866,275**：這是我把勞動部資料集 114 年底各國籍、性別「總計」逐列相加的結果，同表另有「有效聘僱許可」766,212；與勞動部對外常說的「在臺移工人數」口徑是否完全一致，是靠 2023、2024 年相加結果（753,430、820,083）剛好對上先前搜尋摘要的「75.3 萬」「82 萬」來推定。正式發布前請用勞動統計查詢網核對，並改成最新月份。
3. **同性婚姻累計 21,647 對**：每年數字都直接抄自戶政司速報表，但累計是我逐年相加（2019 至 2025 年加 2026 年 1 至 9 月的 2,279 對），官方沒有直接寫累計值；且 2019 年 2,939 對是從 5 月 24 日起算的登記數。性別平等處指標頁（附件 ODS）可再核對。

### 五、其他提醒

- **低收入戶、健保納保率、國民醫療保健支出**：衛福部統計指標表最新到 2024 年，2025 年數字可能已在別處公布，這裡沒有查到。
- **受僱員工全年總薪資中位數**：最新是 2024 年（2025-11-25 發布）；2025 年的將在 2026 年 11 月下旬發布，上線時可能就要更新。與 2017 年的 47.0 萬不能直接比較（涵蓋範圍後來擴大到含外國籍與部分工時員工），所以只附 2023 年對照。
- **平均壽命十年前對照**未取得，故沒有 `compare`（只對照疫情前 2019 年 80.86 歲）。
- **年齡中位數 45.7、性別比等**只取得 2025 年底單點，未取得十年前值。
- **2026-10-23 當日**主計總處發布 9 月失業率；因颱風公告「發布作業」可能調整，頁面張貼日期為 115-10-23，上線前再開一次確認未被修正。
- **人口自然增加「負成長從哪年開始」**：自然增加 2020 年起為負（−7,907）；總人口則 2019 年底達高點後 2020、2021、2022 連降，2023 回升後 2024、2025 再降，不是單調下滑。
- **原住民人數 2024 年跳增**：2023 年底 589,038、2024 年底 611,674（+22,636），而 2022 至 2023 年僅增約 4,900；通報未說明原因（可能與政策或身分登記變動有關），上線若要寫「逐年增加」需留意。
- **平埔 10 族**：通報註記《平埔原住民族群身分法》於 2025 年 10 月 23 日公布施行，目前 26 族為法定 16 族加平埔 10 族；「26 族」的官方認定狀態屬動態，建議站上用「法定 16 族」為主、26 族為輔。
