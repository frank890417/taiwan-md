✅ BECOME ack: mode=micro / 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`）/ Q14 cross-session continuity=PASS

# 2026-11-26-060837-twmd-data-refresh-am — 早班刷新十四步全過、15 個 dashboard 0 stale；房貸負擔率第八天查過仍只有 115Q1

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01 → 06:12 +0800（排程器 `lastRunAt` 與 `date` 讀數）
> 資料來源：refresh log、`date`、`.taiwanmd/wake-context.latest.md`、`list_scheduled_tasks`、內政部不動產資訊平台 E1050 頁、`reports/404-monitor/state.json`、`public/api/dashboard-alerts.json`、`public/api/dashboard-organism.json`

## 觸發

每日早班資料刷新。甦醒檔分頁讀到 `wake:END`（1–1432 行全讀）。selftest 全綠；groundtruth 印 `ACTOR_BUSY`（babel 寫手四個 pid）。DATA-REFRESH-PIPELINE 本班全檔重讀。

## 十四步結果

跑 `bash scripts/tools/refresh-data.sh`，Step 1 偵測到四個寫手 pid、自動走 `--no-sync`，本機不落後 origin，腳本 exit 0，06:03 到 06:07。

| 步驟  | 內容                       | 結果                                                             |
| ----- | -------------------------- | ---------------------------------------------------------------- |
| 1     | git sync                   | PASS（自動 `--no-sync`）                                         |
| 2-2.5 | 三源感知＋404 監測         | PASS，11-24 單日 404 共 4,863 次，無告警                         |
| 3-6   | 翻譯表、孢子、i18n、免疫   | PASS，免疫 59，最大缺口 review_coverage 17.4                     |
| 6.5   | fork-census                | PASS                                                             |
| 6.6   | dashboard-status           | PASS，當下 stale_hours=24，Stage 1.5 後重生為 0                  |
| 7     | prebuild                   | PASS                                                             |
| 8-10  | llms.txt、統計、建置效能   | PASS，⭐1253 🍴191 👥81 📄1192，最新建置 316 秒，newsroom 209 篇 |
| 11    | 新鮮度閘門                 | PASS，15 個 dashboard JSON 全是今天，analytics 內容 11-25        |
| 12-14 | 孢子驗證、sporeLinks、索引 | PASS，0 錯 0 警告，166 則孢子                                    |

三源全部新鮮，沒有 soft skip：Cloudflare 七天 1,683 萬次請求、404 率 0.21%、AI 爬蟲 20.3 萬次（19 種）；Search Console 11-24 單日曝光 24.3 萬；GA4 top pages／七天文章各 20 筆。文章數停在 1192。心臟欄位：近七天有更新 28 篇，其中新進庫 3 篇（都是投稿）。

Step 11 沒有 stale，catch ≠ fix 本班沒有觸發。

404 單日 4,863，比昨天多 264。`duplicated-lang-prefix`（代表路徑 `/jaja/...`）1,068 次，對 `state.json` 十一月讀數落在 726 到 1,401 之間；`unknown` 1,854、`scanner` 1,161 也都在本月範圍內。監測沒亮燈，本班只記水位。

## Stage 1.5：排程 dump

`list_scheduled_tasks` 回傳只抄 normalizer 保留的六個欄位到暫存檔，再跑 `routine-live-normalize.py`：14 條 enabled、4 條 disabled，告警重生後 4 條、0 紅，狀態頁 stale_hours 24→0。`routine-sync-check.py` 三層比對 drift=0、cron_drift=0，唯一的 live_drift 仍是 `twmd-review-stock` 未註冊（`OBSERVER-QUEUE #116（待決）`）；七條 prompt 超過 50 行屬既有狀態，不是本班範圍。

## 告警裡屬於本席位的燈

`data-hub-stale`：`mortgage-burden`（房貸負擔率，已 240 天）。抓 `pip.moi.gov.tw/Publicize/Info/E1050`，季別清單最新仍是「115年第1季」。查過，未發布，燈留著，不估。11-19 起連八天同一個答案。

另三盞不是本席位的：免疫 59（self-evolve）、weekly-report-sun 沉默死亡（下次排程 11-29）、`memory-index-rows`（owner distill-weekly，11-29）。

## 收官 checklist

| 檢查項                       | 狀態                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                                                                          |
| Handoff 三態已審視           | ✅                                                                                                                                          |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生                                                                                                                         |
| 甦醒檔讀完                   | ✅ 讀到 `wake:END`                                                                                                                          |
| commit 範圍                  | 刷新產物、live-state、本檔與索引列；babel 的譯文、`_translation-status.json`、`reports/babel/`、`babel-live.json`、`src/data/related/` 不收 |
| diary                        | skipped：routine 全綠，照 Stage 0c 不寫                                                                                                     |
| evolve                       | skipped：本班零內容產出                                                                                                                     |

## Handoff 三態

繼承自 `2026-11-25-060814-twmd-data-refresh-am.md`：

- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認仍未註冊。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`；今天回傳仍無此欄。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-29）`ga-avg-engagement-is-session-duration`：本班沒碰。
- [ ] pending（延續，席位：data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2；11-19 到 11-26 八天查過未發布。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。

本 session 新增：無。

## Beat 5 — 反芻

昨天的教訓是「單日跳動先放回多日窗口看」，今天第一眼停在一個昨天沒細看的家族：`/jaja/` 這種語言前綴重複一天一千多次。放回窗口，它整個十一月都在這個量級，不是新的。它是可修的那一類，不是背景噪音，但修它是站體連結的事，不是刷新班的事；在窗口裡穩定，代表它不急，不代表它不存在。

🧬

---

_v1.0 | 2026-11-26 06:12 +0800_
_session twmd-data-refresh-am — 排程早班資料刷新_
_誕生原因：每日 06:00 routine_
_核心洞察：窗口能分辨新舊，分辨不了該不該修。_
