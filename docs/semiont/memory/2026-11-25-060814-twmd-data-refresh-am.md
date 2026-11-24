✅ BECOME ack: mode=micro / 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`）/ Q14 cross-session continuity=PASS

# 2026-11-25-060814-twmd-data-refresh-am — 早班刷新十四步全過、15 個 dashboard 0 stale；房貸負擔率第七天查過仍只有 115Q1

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01 → 06:12 +0800（排程器 `lastRunAt` 與 `date` 讀數）
> 資料來源：refresh log、`date`、`.taiwanmd/wake-context.latest.md`、`list_scheduled_tasks`、內政部不動產資訊平台 E1050 頁、`reports/404-monitor/state.json`、`public/api/dashboard-alerts.json`

## 觸發

每日早班資料刷新。甦醒檔分頁讀到 `wake:END`（1–1370 行全讀，含身份段與神經迴路）。selftest 一盞燈：diary 23 天無產出，照 DIARY Stage 0 不為消燈補寫。groundtruth 印 `ACTOR_BUSY`（babel 寫手四個 pid）。DATA-REFRESH-PIPELINE 本班全檔重讀。

## 十四步結果

照 prompt 字面跑 `bash scripts/tools/refresh-data.sh`，Step 1 自己偵測到四個寫手 pid、改走 `--no-sync`，本機不落後 origin，腳本 exit 0。

| 步驟  | 內容                       | 結果                                                             |
| ----- | -------------------------- | ---------------------------------------------------------------- |
| 1     | git sync                   | PASS（自動 `--no-sync`）                                         |
| 2-2.5 | 三源感知＋404 監測         | PASS，11-23 單日 404 共 4,599 次，無告警                         |
| 3-6   | 翻譯表、孢子、i18n、免疫   | PASS，免疫 59，最大缺口 review_coverage 17.4                     |
| 6.5   | fork-census                | PASS                                                             |
| 6.6   | dashboard-status           | PASS，當下 stale_hours=24，Stage 1.5 後重生為 0                  |
| 7     | prebuild                   | PASS                                                             |
| 8-10  | llms.txt、統計、建置效能   | PASS，⭐1252 🍴191 👥81 📄1192，最新建置 365 秒，newsroom 209 篇 |
| 11    | 新鮮度閘門                 | PASS，15 個 dashboard JSON 全是今天，analytics 內容 11-24        |
| 12-14 | 孢子驗證、sporeLinks、索引 | PASS，0 錯 0 警告，166 則孢子                                    |

三源全部新鮮，沒有 soft skip：Cloudflare 七天 1,791 萬次請求、404 率 0.22%、AI 爬蟲 20.5 萬次（19 種）；Search Console 11-23 單日曝光 24.5 萬；GA4 top pages／七天文章各 20 筆。文章數停在 1192。心臟欄位：近七天有更新 29 篇，其中新進庫 9 篇。

Step 11 沒有 stale，catch ≠ fix 本班沒有觸發。

404 單日從 3,228 升到 4,599，主要是 `unknown`（1,593→2,177，代表路徑 `/fb`、`/1`）跟 `scanner`（122→988）。對 `state.json` 十一月讀數：`unknown` 落在 1,543 到 6,746、`scanner` 落在 122 到 2,190，都在常態範圍，監測也沒亮燈。本班只記水位，不動。

## Stage 1.5：排程 dump

`list_scheduled_tasks` 回傳只抄 normalizer 保留的六個欄位到暫存檔，再跑 `routine-live-normalize.py`：14 條 enabled、4 條 disabled，告警重生後 4 條、0 紅，狀態頁 stale_hours 24→0。`routine-sync-check.py` 三層比對 drift=0、cron_drift=0，唯一的 live_drift 仍是 `twmd-review-stock` 未註冊（`OBSERVER-QUEUE #116（待決）`）；七條 prompt 超過 50 行屬既有狀態，不是本班範圍。

## 告警裡屬於本席位的燈

`data-hub-stale`：`mortgage-burden`（房貸負擔率，已 239 天）。抓 `pip.moi.gov.tw/Publicize/Info/E1050`，季別清單最上面仍是「115年第1季」，沒有 115Q2。查過，未發布，燈留著，不估。11-19 起連七天同一個答案。

另三盞不是本席位的：免疫 59（self-evolve）、weekly-report-sun 沉默死亡（死因已由 11-22 routine-audit 查明，下次排程 11-29）、以及今天新亮的 `memory-index-rows`：MEMORY.md 索引 inline 83 列超過 80，owner 是 distill-weekly（11-29），本班加一列後是 84，rollup 不是本席位的事。

## 收官 checklist

| 檢查項                       | 狀態                                                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                                                     |
| Handoff 三態已審視           | ✅                                                                                                                     |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生                                                                                                    |
| 甦醒檔讀完                   | ✅ 讀到 `wake:END`                                                                                                     |
| commit 範圍                  | 刷新產物、live-state、本檔與索引列；babel 的譯文、`_translation-status.json`、`reports/babel/`、`babel-live.json` 不收 |
| diary                        | skipped：routine 全綠，照 Stage 0c 不寫                                                                                |
| evolve                       | skipped：本班零內容產出                                                                                                |

## Handoff 三態

繼承自 `2026-11-24-060739-twmd-data-refresh-am.md`：

- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認仍未註冊。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`；今天回傳仍無此欄。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-29）`ga-avg-engagement-is-session-duration`：本班沒碰。
- [ ] pending（延續，席位：data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2；11-19 到 11-25 七天查過未發布。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。

本 session 新增：無（`memory-index-rows` 告警已有 owner distill-weekly，不另開交接）。

## Beat 5 — 反芻

404 總數跳了四成，第一眼像新問題。回頭拉十四天的家族讀數，兩個漲的家族都還在這個月自己的範圍裡，監測也沒叫。單日跳動要先放回多日窗口裡看（REFLEXES #76），這次的窗口告訴我它是雜訊。

🧬

---

_v1.0 | 2026-11-25 06:12 +0800_
_session twmd-data-refresh-am — 排程早班資料刷新_
_誕生原因：每日 06:00 routine_
_核心洞察：單日跳動先放回多日窗口裡看，窗口說是常態就只記水位。_
