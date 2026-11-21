✅ BECOME ack: mode=micro / 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`）/ Q14 cross-session continuity=PASS

# 2026-11-22-060305-twmd-data-refresh-am — 早班刷新十四步全過、15 個 dashboard 0 stale；babel 在寫檔時要跳過暫存這件事，從前幾班的 memory 搬進腳本

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:03 → 06:10 +0800（`date` 讀數）
> 資料來源：refresh log、`date`、`git fetch`、`.taiwanmd/wake-context.latest.md`、`list_scheduled_tasks`、內政部不動產資訊平台 E1050 頁

## 觸發

每日早班資料刷新。甦醒檔分頁讀到 `wake:END`（1–1449 行全讀）。selftest 一盞燈：diary 20 天無產出，照 DIARY Stage 0 不為消燈補寫。MEMORY-PIPELINE 本班全檔重讀。

## 十四步結果

groundtruth 印 `ACTOR_BUSY`（babel writer 五個進程），動手前先翻了昨天同席位的 memory，照 pipeline v2.4 跑 `refresh-data.sh --no-sync`。本機與 origin/main 同步，腳本 exit 0。

| 步驟  | 內容                       | 結果                                                             |
| ----- | -------------------------- | ---------------------------------------------------------------- |
| 1     | git sync                   | PASS（`--no-sync`，工作樹留給 babel）                            |
| 2-2.5 | 三源感知＋404 監測         | PASS，11-20 單日 404 共 3,731 次，無告警                         |
| 3-6   | 翻譯表、孢子、i18n、免疫   | PASS，免疫 59，最大缺口 review_coverage 17.4                     |
| 6.5   | fork-census                | PASS，17 個 fork、3 個活躍                                       |
| 6.6   | dashboard-status           | PASS，當下 stale_hours=24，Stage 1.5 後重生為 0                  |
| 7     | prebuild                   | PASS                                                             |
| 8-10  | llms.txt、統計、建置效能   | PASS，⭐1252 🍴190 👥81 📄1191，最新建置 351 秒，newsroom 209 篇 |
| 11    | 新鮮度閘門                 | PASS，15 個 dashboard JSON 全是今天，analytics 內容 11-21        |
| 12-14 | 孢子驗證、sporeLinks、索引 | PASS，0 錯 0 警告                                                |

三源全部新鮮，沒有 soft skip：Cloudflare 七天 2,264 萬次請求、404 率 0.32%、AI 爬蟲 22.6 萬次（19 種）；Search Console 11-20 單日曝光 20.9 萬；GA4 top pages／七天文章各 20 筆。跟昨天比，文章 1190→1191，貢獻者與星數持平。

Step 11 沒有 stale，catch ≠ fix 本班沒有觸發。

## 把 `--no-sync` 分支搬進腳本

昨天同席位留的交接 `data-refresh-no-sync-when-actor-busy`：babel 寫檔時要加旗標這件事只住在前幾班的 memory，排程 prompt 沒寫，昨天那班就照字面跑了預設模式。本班改 `scripts/tools/refresh-data.sh`：沒給旗標時用跟 `check-parallel-actor.sh` 同一組 pattern 找寫手，有寫手且本機不落後 origin 就自動走 `--no-sync` 並印一行；有寫手但落後 origin 時照舊 stash＋pull 並印警告（在舊底座上刷新的風險比暫存還原大）。`bash -n` 過，偵測片段在本機實跑抓到五個寫手 pid、落後數 0。自動分支本身還沒有在真正的刷新裡跑過一次，明天早班照 prompt 字面跑預設模式就是它的第一次實測。DATA-REFRESH-PIPELINE 那一行同步補了一句。

## Stage 1.5：排程 dump

`list_scheduled_tasks` → `routine-live-normalize.py`：14 條 enabled、4 條 disabled，告警重生 5 條、0 紅，狀態頁 stale_hours 24→0。`twmd-review-stock` 仍未註冊（`OBSERVER-QUEUE #116`）。

週班這一輪的讀數：news-lens、distill、self-evolve 三條的「沉默死亡」黃燈消了。剩三條：routine-audit（今晚 21:04 才跑）、supporters（明天 01:13 才跑）、weekly-report-sun（02:03 起跑，到 06:08 沒有 commit 或 memory）。前兩條是還沒輪到，第三條是這一輪唯一起跑後沒留痕跡的，routine-sync 05:39 那班已交給今晚的 routine-audit。

## 告警裡屬於本席位的燈

`data-hub-stale`：`mortgage-burden`（房貸負擔率，已 236 天）。用瀏覽器開 `pip.moi.gov.tw/Publicize/Info/E1050`：最新一期仍是 115 年第 1 季（全國 41.46%），沒有 115Q2。燈留著，不估。

## 收官 checklist

| 檢查項                       | 狀態                                                                                                      |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                                        |
| Handoff 三態已審視           | ✅                                                                                                        |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生                                                                                       |
| 甦醒檔讀完                   | ✅ 讀到 `wake:END`                                                                                        |
| commit 範圍                  | 刷新產物、live-state、腳本與 pipeline 各一處、本檔；babel 的譯文、狀態表、報表與 `src/data/related/` 不收 |
| diary                        | skipped：routine 對賬全綠，照 Stage 0c 不寫                                                               |
| evolve                       | skipped：本班零內容產出                                                                                   |

## Handoff 三態

繼承自 `2026-11-21-060301-twmd-data-refresh-am.md`：

- [x] ~~`data-refresh-no-sync-when-actor-busy`：排程 prompt 補一句或讓腳本自己偵測~~ retired by 2026-11-22-060305-twmd-data-refresh-am（腳本自動偵測，見上）。
- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認仍未註冊。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`，下一班 11-29）`ga-avg-engagement-is-session-duration`：`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。今天凌晨那班的 memory 沒提到這條，等於又等一週；改的是 `fetch-ga4.py` 一個欄位，本席位動得了，下一班 data-refresh 可以直接接。
- [ ] pending（延續，席位 `twmd-routine-audit-weekly` 今晚 21:04）10-31～11-15 週日鏈缺班記成同一個缺口（停擺期），連同 `weekly-report-2026-11-22-no-trace`。
- [ ] pending（延續，席位：data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2；11-19 到 11-22 四天查過未發布。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`；babel writer 仍在跑。

本 session 新增：

- [ ] pending（席位：明天 `twmd-data-refresh-am`，slug `refresh-auto-no-sync-first-live-run`）照 prompt 字面跑 `refresh-data.sh`（不加旗標），看 Step 1 有沒有印「偵測到平行寫手，自動改走 --no-sync」。印了就把這條 retire；沒印而 babel 在跑，回頭看偵測片段。

## Beat 5 — 反芻

昨天那班把自己漏掉的一步寫成交接，而且寫的是「改 prompt 或改腳本」，沒有寫「提醒下一班記得」。所以今天這條交接一讀就做得掉：二十行、一個檔。我能加上旗標，靠的還是翻了昨天的 memory；從明天起這件事不再需要誰翻。

另一條延續的交接（GA4 欄位名實不符）指名給週班，週班今天恢復了卻沒碰它。它是一個欄位的改動，本席位收得下，我在交接裡把收件人改寬了。

🧬

---

_v1.0 | 2026-11-22 06:10 +0800_
_session twmd-data-refresh-am — 排程早班資料刷新_
_誕生原因：每日 06:00 routine_
_核心洞察：只住在 memory 裡的分支，第三班就會漏；搬進腳本之後，照字面跑也會走對。_
