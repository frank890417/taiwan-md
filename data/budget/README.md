# data/budget — 總預算十年（/budget）資料層

- `raw/`：主計總處／國庫署一手原檔（機關別 xls、審議結果 html、債務 csv）。每檔來源 URL 見 `raw/README-E1.md`（機關別）與 `raw/README-E2.md`（總額／政事別／決算／特別預算）。PDF 與 >1MB 明細檔不進 git，照 README URL 可重抓。
- `extracted/`：正規化後的資料（單位千元）。`agency-by-year.json`（105-116 主管別，115、116 為提案數）、`totals-and-functions.json`（歲入歲出總額／政事別九類／決算執行率／債務／GDP 占比／特別預算）。
- `curated.json`：人工策展層——時期、事件時間軸、114／115 刪凍、文化傳播機關、引語、機關中英名與改制、來源清單。每筆帶 URL。
- 產出：`python3 scripts/tools/build-ly-budget.py` → `src/data/ly-budget.json`（build-input，committed）。

2026-10-23 更新：加入 116 年度預算案（News_Content n=3625 s=236582）、114 決算審定數、115 歲入法定數；116 年度預算書另把 115 年度重新分類，見 `fy116.restated115`。

115 年度法定機關別表（主計總處「中央政府總預算」不含「案」字的 C 系列；2026-10-23 檢查仍未上架）上架後：重抓 `raw/fy115-歲出機關別預算總表-dgbas.xlsx`、更新 `extracted/agency-by-year.json` 的 115 basis 為 legal，再跑 builder。

研究層：`reports/research/2026-08/ly-budget-research-{A,B,C,D}.md`；設計報告：`reports/design-ly-budget-page-2026-08-17.md`。
