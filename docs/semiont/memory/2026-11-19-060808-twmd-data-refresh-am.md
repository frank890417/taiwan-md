✅ BECOME ack: mode=micro / 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`）/ Q14 cross-session continuity=PASS

# 2026-11-19-060808-twmd-data-refresh-am — 早班刷新十四步全過、0 stale；排程 dump 寫回後狀態頁自己重生，不用再手動補跑

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01 → 06:20 +0800（refresh 約 06:05 → 06:15）
> 資料來源：refresh log、`date`、`git log`、`.taiwanmd/wake-context.latest.md`、`list_scheduled_tasks`、內政部不動產資訊平台 E1050 頁

## 觸發

每日早班資料刷新，營運機換機器後第二班。甦醒檔這次分頁讀到 `wake:END`（1–1602 行全讀）。selftest 一盞燈：diary 17 天無產出，照 DIARY Stage 0 不為消燈補寫，routine 預設不寫 diary。

groundtruth 印 `ACTOR_BUSY`（babel writer 五個進程），`git fetch` 後本機落後 origin 0，照 pipeline v2.4 跑 `refresh-data.sh --no-sync`。排程 prompt 寫 `git checkout main && git pull`，以 pipeline 為準。

## 十四步結果

腳本 exit 0。

| 步驟  | 內容                       | 結果                                                        |
| ----- | -------------------------- | ----------------------------------------------------------- |
| 1     | git sync                   | PASS（--no-sync，落後 origin 0）                            |
| 2-2.5 | 三源感知＋404 監測         | PASS，404 monitor 無告警（11-17 全站 404 共 6,393 次）      |
| 3-6   | 翻譯表、孢子、i18n、免疫   | PASS，孢子 166 筆 0 警告，免疫 59，最大缺口 review_coverage |
| 6.5   | fork-census                | PASS，registry 寫回，無新子代                               |
| 6.6   | dashboard-status           | PASS，當下讀前一天的 dump（stale_hours=23.9），見下節       |
| 7     | prebuild                   | PASS                                                        |
| 8-10  | llms.txt、統計、建置效能   | PASS，⭐1248 🍴189 👥80 📄1189，最新建置 339 秒             |
| 11    | 新鮮度閘門                 | PASS，15 個 dashboard JSON 全是今天，analytics 內容 11-18   |
| 12-14 | 孢子驗證、sporeLinks、索引 | PASS，0 錯 0 警告，sporeLinks 無需改動，INDEX 791 行        |

三源：Cloudflare 七天 2,625 萬次請求、404 率 0.33%、AI 爬蟲 23.5 萬次（19 種）；Search Console 11-17 單日曝光 22.0 萬；GA4 top pages／七天文章各 20 筆。三源全部新鮮，沒有 soft skip。

Step 11 沒有 stale，catch ≠ fix 本班沒有觸發。

## 接下上一班的交接：狀態頁跟著 dump 重生

上一班寫給本班的 `status-regen-after-live-dump`：`generate-dashboard-status.mjs` 在 Step 6.6 讀 `routine-live-state.json`，而這份檔要到 Stage 1.5 才寫回，所以刷新完的當下狀態頁永遠讀前一天的排程器。`routine-live-normalize.py` 原本就在寫回後重生 alerts，這班把 status 加進同一個迴圈，`--no-alerts` 兩個一起關。

驗證：Step 6.6 印 `stale_hours=23.9`，Stage 1.5 跑完工具自己印 `stale_hours=0`，沒有手動補跑。

Stage 1.5：dump 14 條 enabled、4 條 disabled，告警重生 9 條、0 紅。`routine-sync-check` 的 `live_drift=1` 仍是 `twmd-review-stock` 未註冊（`OBSERVER-QUEUE #116`）。

## 告警裡那條屬於本席位的燈

`data-hub-stale`：`mortgage-burden`（房貸負擔率，季資料到 2026-03-31，已 233 天）。照 pipeline 查出處 `pip.moi.gov.tw/Publicize/Info/E1050`：最新仍是 115 年第 1 季（全國 41.46%），沒有 115Q2。查過，未發布，燈留著，不估。

其餘八條燈都不是本席位：免疫 59、六條週班「沉默死亡」（11-14／11-15 那輪，停擺期，routine-sync 已排 `weekly-round-2026-11-22` 追）、探測器落後 24 天（同一個 news-lens 缺口）。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                         |
| Handoff 三態已審視           | ✅                                                         |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生，快照齡 0h                             |
| 甦醒檔讀完                   | ✅ 讀到 `wake:END`                                         |
| commit 範圍                  | 只收刷新產物、live-state、normalize 工具與本檔；babel 不收 |
| diary                        | skipped：routine 預設不寫（DIARY Stage 0c）                |
| evolve                       | skipped：一行工具修補，不另開進化                          |

## Handoff 三態

繼承自 `2026-11-18-060944-twmd-data-refresh-am.md`：

- [x] ~~`status-regen-after-live-dump`~~ — retired by 本班：`routine-live-normalize.py` 寫回後一併重生 `dashboard-status.json`，已驗 stale_hours 23.9→0。
- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認仍未註冊。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-22）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 `twmd-routine-audit-weekly` 11-22）10-31～11-15 週日鏈缺班記成同一個缺口（停擺期）。
- [ ] pending（延續，席位：data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2；11-19 查過未發布。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`；本班 fetch 仍印 gc.log 警告。

本 session 無新 handoff。

## Beat 5 — 反芻

昨天那班把交接寫成「在哪個檔、跟什麼放同一處、不接的話每班要手動跑哪一行」，今天兌現只花一次編輯。寫得夠具體的交接，下一班不必重新判斷，只需要動手。同一份告警裡六條週班燈的時數每天往上加，內容沒有變；它們已經有 11-22 的追蹤席位，再多抄一遍不會讓那天早點到。

🧬
