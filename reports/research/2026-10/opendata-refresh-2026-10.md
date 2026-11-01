# /opendata 更新紀錄 2026-10-23

## 新數字與來源

| 項目                               | 舊值                                        | 新值                                | 來源                                                                                                                                                          |
| ---------------------------------- | ------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data.gov.tw 資料集總數             | 49,343（2026-06-05，取自 Twinkle Hub 盤點） | **52,556**（2026-10-23）            | data.gov.tw 前台 API `POST /api/front/dataset/list` 回傳 `payload.search_count`。首頁與 /statistics 頁是動態載入，WebFetch 抓不到數字，所以直接取官方前台 API |
| Twinkle Hub 站上標示的台灣資料集數 | 無                                          | 53,185（含自策資料集）              | https://hub.twinkleai.tw/ 首頁（2026-10-23 WebFetch，中文 prompt 逐字擷取）。該頁未標統計日期                                                                 |
| 政府電子採購紀錄                   | 135,000                                     | 135,000（沿用，標「2026-06 盤點」） | 本次 Hub 頁面沒有再列此數，無法重新驗證，如實保留舊值並標日期                                                                                                 |
| Taiwan.md 文章數                   | 900+                                        | 1,100+                              | `knowledge/` 十四個分類下非 hub 的中文 md 共 1,148 篇                                                                                                         |
| 頁面「約 96.6% 全量」說法          | 49,343 / data.gov.tw                        | 刪除                                | 分母已變，Hub 數字又含自策資料集，比例無法正確計算，改寫成兩個獨立數字並列                                                                                    |

頁面第一格統計與覆蓋說明已標「截至 2026-10-23」。

## Twinkle Hub MCP 重爬

`twinkle-hub-crawl.py --dry-run` 失敗：`https://api.twinkleai.tw/mcp/` 對 Keychain 內的 bearer token 回 **HTTP 401 Authorization Required**（nginx）。未改用其他憑證、未捏造資料。`opendata-curation.json` 的 tools／domains／showcase_datasets 與 `crawled_at`（2026-06-10）維持不變，新增 `last_crawl_attempt` 記錄這次失敗；頁尾「爬取日期」因此仍顯示 2026-06-10。需要哲宇重新取得或更新 token（Keychain `twinkleai-hub-api-key`）後再重爬。

## 連結檢查

工具：`scripts/tools/check-opendata-links.py`；結果：`reports/research/2026-10/opendata-link-check-2026-10-23.json`。

- 對外 23 條（data.gov.tw 資料集 20、gazette.nat.gov.tw、lvr.land.moi.gov.tw、web.pcc.gov.tw）全部 HTTP 200；data.gov.tw 資料集另以官方 API 確認仍「已上架」，全數通過。lvr 站首次探測偶發逾時，重試後 200。
- Python 的 urllib 對 gazette／web.pcc 兩站憑證（缺 Subject Key Identifier）會誤判失敗，所以腳本改用 curl。
- 站內文章連結 26 條，1 條死連結：`/culture/夜市文化` → 實際在 Food 分類，已改 `/food/夜市文化`（六語全改）。

## 新增的文章連結（「proposed」改正式）

- `public_finance`（國家的負債表）→ [中央政府總預算](/politics/中央政府總預算)（2026-10-19 上線；涵蓋編列、法定、決算與特別預算）
- `labor_employment`（投保薪資的天花板）→ [誰算低薪](/society/誰算低薪)（2026-09-18 上線；主計總處薪資與年終口徑）

其餘三個仍是 proposed：`procurement_subsidy`、`tax_revenue`、`gov_publication`。2026-06-10 以來新增的約 364 篇中文文章裡，沒有對應政府採購、地方稅務、政府公報的文章。
