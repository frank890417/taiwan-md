✅ BECOME ack: mode=micro / 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`）/ Q14 cross-session continuity=PASS

# 2026-11-23-060253-twmd-data-refresh-am — 早班刷新十四步全過、15 個 dashboard 0 stale；腳本自己偵測 babel 寫手的分支第一次實跑，走對了

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:02 → 06:12 +0800（`date` 讀數）
> 資料來源：refresh log、`date`、`git fetch`、`.taiwanmd/wake-context.latest.md`、`list_scheduled_tasks`、內政部不動產資訊平台 E1050 頁

## 觸發

每日早班資料刷新。甦醒檔分頁讀到 `wake:END`（1–1398 行全讀，含身份段）。selftest 一盞燈：diary 21 天無產出，照 DIARY Stage 0 不為消燈補寫。額度帳本昨晚到凌晨都在 🔴 reserve（週用量 97%），本班只做 prompt 指定的事。DATA-REFRESH-PIPELINE 與 MEMORY-PIPELINE 本班全檔重讀。

## 十四步結果

照 prompt 字面跑 `bash scripts/tools/refresh-data.sh`，不加旗標。Step 1 印出「偵測到平行寫手（pid 48551 56371 56706 57192 57277），自動改走 --no-sync」，接著「本機與 origin/main 同步，工作樹留給平行寫手」。昨天搬進腳本的自動分支在真正的刷新裡第一次跑，行為跟設計一致，腳本 exit 0。

| 步驟  | 內容                       | 結果                                                             |
| ----- | -------------------------- | ---------------------------------------------------------------- |
| 1     | git sync                   | PASS（自動 `--no-sync`，本機不落後 origin）                      |
| 2-2.5 | 三源感知＋404 監測         | PASS，11-21 單日 404 共 3,840 次，無告警                         |
| 3-6   | 翻譯表、孢子、i18n、免疫   | PASS，免疫 59，最大缺口 review_coverage 17.4                     |
| 6.5   | fork-census                | PASS                                                             |
| 6.6   | dashboard-status           | PASS，當下 stale_hours=24，Stage 1.5 後重生為 0                  |
| 7     | prebuild                   | PASS                                                             |
| 8-10  | llms.txt、統計、建置效能   | PASS，⭐1252 🍴191 👥81 📄1191，最新建置 342 秒，newsroom 209 篇 |
| 11    | 新鮮度閘門                 | PASS，15 個 dashboard JSON 全是今天，analytics 內容 11-22        |
| 12-14 | 孢子驗證、sporeLinks、索引 | PASS，0 錯 0 警告，166 則孢子                                    |

三源全部新鮮，沒有 soft skip：Cloudflare 七天 2,072 萬次請求、404 率 0.31%、AI 爬蟲 21.3 萬次（19 種）；Search Console 11-21 單日曝光 18.1 萬；GA4 top pages／七天文章各 20 筆。跟昨天比，文章與貢獻者持平，fork 多一個。心臟欄位：近七天有更新 43 篇，其中新進庫 10 篇。

Step 11 沒有 stale，catch ≠ fix 本班沒有觸發。

## Stage 1.5：排程 dump

`list_scheduled_tasks` → `routine-live-normalize.py`：14 條 enabled、4 條 disabled，告警重生後剩 3 條、0 紅，狀態頁 stale_hours 24→0。`twmd-review-stock` 仍未註冊（`OBSERVER-QUEUE #116（待決）`）。

昨天掛著的 routine-audit 與 supporters 兩盞「沉默死亡」在新 dump 下消了，兩條昨晚與今天凌晨都留了 commit。剩 weekly-report-sun 一盞（11-22 02:03 起跑後無痕跡），死因昨晚 routine-audit 已查明並改掛 `weekly-report-safeguards-2026-11-22`，本班不重複往下傳。

## 告警裡屬於本席位的燈

`data-hub-stale`：`mortgage-burden`（房貸負擔率，已 237 天）。開 `pip.moi.gov.tw/Publicize/Info/E1050`：檔案清單最上面一筆仍是「115 年第 1 季」（全國 41.46%），沒有 115Q2。查過，未發布，燈留著，不估。

## 沒接的那條交接

昨天把 `ga-avg-engagement-is-session-duration` 的收件人改寬到本席位，寫的是「一個欄位的改動」。本班實際去看：`avgEngagementSeconds` 這個名字由 `generate-dashboard-analytics.py` 兩處產生，被 `src/scripts/dashboard/analytics.js`、`weekly-checkup.sh`、`weekly-report-prep.py` 三處讀。修法有兩條路，改名（四處一起動）或換成真正的 engagement 指標（歷史讀數從那天起斷層、週報的週對週比較失準），選哪一條是決定，不是機械修補。加上額度在保留線，本班沒動，交接裡把範圍照實改寫。

## 收官 checklist

| 檢查項                       | 狀態                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                        |
| Handoff 三態已審視           | ✅                                                                                        |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生                                                                       |
| 甦醒檔讀完                   | ✅ 讀到 `wake:END`                                                                        |
| commit 範圍                  | 刷新產物、live-state、本檔與索引列；babel 的譯文、狀態表、報表與 `src/data/related/` 不收 |
| diary                        | skipped：routine 全綠，照 Stage 0c 不寫                                                   |
| evolve                       | skipped：本班零內容產出                                                                   |

## Handoff 三態

繼承自 `2026-11-22-060305-twmd-data-refresh-am.md`：

- [x] ~~`refresh-auto-no-sync-first-live-run`：照 prompt 字面跑，看 Step 1 有沒有印自動改走 --no-sync~~ retired by 2026-11-23-060253-twmd-data-refresh-am（印了，五個寫手 pid，exit 0）。
- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁；本席位只讀得到排程器）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認仍未註冊。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（延續，範圍改寫；席位 `twmd-self-evolve-weekly` 11-29，動得了這些路徑）`ga-avg-engagement-is-session-duration`：欄位名實不符牽涉一個產生端加三個讀取端，先在「改名」與「換指標」之間選一條，換指標要同時處理歷史讀數斷層。不是一個欄位的事，本席位昨天估小了。
- [x] ~~10-31～11-15 週日鏈缺班與 `weekly-report-2026-11-22-no-trace`~~ retired by `2026-11-22-210739-twmd-routine-audit-weekly`（兩場整機停電；週報改掛 `weekly-report-safeguards-2026-11-22`）。
- [ ] pending（延續，席位：data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2；11-19 到 11-23 五天查過未發布。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session；本席位每天都撞上寫手，動不了）`git-gc-log-blocks-auto-cleanup`。

本 session 新增：無。

## Beat 5 — 反芻

昨天寫「明天早班照字面跑就是它的第一次實測」，今天照字面跑，它印出了該印的那一行。這條交接從寫下到收掉剛好一班，因為它要的動作就是這個席位每天本來會做的事。

另一條就沒這麼順。我昨天把 GA 欄位那條的收件人改寬，理由是「一個欄位，本席位收得下」，今天打開來數是四個檔、兩種修法。昨天那句話是沒看程式碼就下的估計，寫進交接之後讀起來像量過的。改寬收件人之前該先 grep 一次，這次是自己接到自己估小的交接才發現。

🧬

---

_v1.0 | 2026-11-23 06:12 +0800_
_session twmd-data-refresh-am — 排程早班資料刷新_
_誕生原因：每日 06:00 routine_
_核心洞察：交接裡的工作量估計如果沒有先看過程式碼，寫下來之後跟量過的數字長得一樣。_
