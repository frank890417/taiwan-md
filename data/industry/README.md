# data/industry：「台灣產業與上市公司」專題的資料層

頁面：`/industry/`、`/industry/supply-chains/`、`/companies/`（排行表的補充欄位）。
設計報告：`reports/design-industry-topic-2026-11-10.md`。

## 檔案

| 路徑                                          | 是什麼                                                                                 | 誰產生                                     |
| --------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------ |
| `research/*.json`                             | 研究檔：每個數字帶來源網址、資料期間、擷取日、原文逐字片段。null 表示拿不到，附 reason | 研究子代（2026-11-10），主 session 抽驗    |
| `research/_AGENT-RULES.md`                    | 研究子代的共用規矩                                                                     | 人工                                       |
| `raw/`                                        | 一手原檔（PDF、xlsx、HTML）。不進 git，只留可重跑的小腳本                              |                                            |
| `companies-county-manual.json`                | 基本資料表住址沒寫縣市時的人工對照（附公司官網網址）                                   | 人工                                       |
| `i18n/{lang}.json`                            | zh-TW、en 以外語言的 UI 與內容譯文；缺的鍵回退 en                                      | 翻譯子代                                   |
| `../../src/data/industry/series.json`         | 頁面讀的數列檔                                                                         | `scripts/tools/build-industry-data.py`     |
| `../../src/data/industry/companies-meta.json` | 前 50 大＋掉榜者的總部縣市、證交所產業別、上市日、上一版名次                           | `scripts/tools/industry-companies-meta.py` |
| `../../src/data/industry/content/*.json`      | 時間軸、立場、聚落、供應鏈、展望。文字是 `{zh, en}`，日期與網址在同一筆                | 人工，依研究檔整理                         |

## 更新步驟

**換市值快照時**（跟 `/companies/` 一起）：

1. `python3 scripts/tools/companies-marketcap-snapshot.py --out reports/research/YYYY-MM/companies-snapshot-YYYYMMDD.json`
2. 手改 `src/utils/dataConfig.ts` 的榜單與 `COMPANIES_SNAPSHOT_DATE`，以及 13 語文案裡的數字。
3. 改 `scripts/tools/industry-companies-meta.py` 的 `PREV_COMMIT`（指到換快照前那個 commit）與 `PREV_DATE`，然後
   `python3 scripts/tools/industry-companies-meta.py --fetch`。有公司查不到縣市時，補進 `companies-county-manual.json`。
4. 改 `scripts/tools/build-industry-data.py` 的 `SNAP` 路徑，重跑它。
5. `node --experimental-strip-types --test tests/companies-rank.test.mjs tests/industry-data.test.mjs`。
6. 檢查 `src/i18n/industry/zh.ts`、`en.ts` 裡寫死的數字（`toc.*.take`、`meta.description`、各節 `p1`／`p2`）。

**每年統計更新時**（財政部 1 月、主計總處與 TSIA 2 月、國科會 3 月、經濟部工廠調查年底）：
改對應的 `research/*.json`（保留來源物件），重跑 `build-industry-data.py`，再照第 5、6 步。

## 規矩

- 官方原始來源優先；新聞只當線索。
- 拿不到就是 null，頁面寫「沒有資料」。不估、不內插。
- 個股只引用事實（市值、營收、產業別、所在地），不評價、不預測。
