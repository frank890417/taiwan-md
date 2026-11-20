✅ BECOME ack: mode=micro / 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`）/ Q14 cross-session continuity=PASS

# 2026-11-21-060301-twmd-data-refresh-am — 早班刷新十四步全過、15 個 dashboard 0 stale；這班忘了加 `--no-sync`，暫存還原沒出事

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01 → 06:35 +0800
> 資料來源：refresh log、`date`、`git fetch`、`.taiwanmd/wake-context.latest.md`、`list_scheduled_tasks`、內政部不動產資訊平台 E1050 頁

## 觸發

每日早班資料刷新。甦醒檔分頁讀到 `wake:END`（1–1609 行全讀）。selftest 一盞燈：diary 19 天無產出，照 DIARY Stage 0 不為消燈補寫。

MEMORY-PIPELINE 本班沒有重讀全檔，本檔結構照昨天同席位那份寫。

## 十四步結果

腳本 exit 0。

| 步驟  | 內容                       | 結果                                                                 |
| ----- | -------------------------- | -------------------------------------------------------------------- |
| 1     | git sync                   | PASS，但跑的是帶同步的預設模式（見下一節）                           |
| 2-2.5 | 三源感知＋404 監測         | PASS，11-19 單日 404 共 5,206 次，無告警                             |
| 3-6   | 翻譯表、孢子、i18n、免疫   | PASS，孢子 166 筆，免疫 59，最大缺口 review_coverage 17.4            |
| 6.5   | fork-census                | PASS，registry 寫回                                                  |
| 6.6   | dashboard-status           | PASS，當下 stale_hours=23.9，Stage 1.5 後重生為 0                    |
| 7     | prebuild                   | PASS                                                                 |
| 8-10  | llms.txt、統計、建置效能   | PASS，⭐1252 🍴190 👥81 📄1190，最新建置 356 秒，newsroom 206 篇上板 |
| 11    | 新鮮度閘門                 | PASS，15 個 dashboard JSON 全是今天，analytics 內容 11-20            |
| 12-14 | 孢子驗證、sporeLinks、索引 | PASS                                                                 |

三源：Cloudflare 七天 2,213 萬次請求、404 率 0.36%、AI 爬蟲 23.7 萬次（19 種）；Search Console 11-19 單日曝光 22.4 萬；GA4 top pages／七天文章各 20 筆。三源全部新鮮，沒有 soft skip。

跟昨天比：文章 1189→1190、貢獻者 80→81、星數 1250→1252。

Step 11 沒有 stale，catch ≠ fix 本班沒有觸發。

## 這班漏掉的一步：`--no-sync`

groundtruth 印 `ACTOR_BUSY`（babel writer 五個進程），前兩班遇到這個狀態都照 pipeline v2.4 跑 `refresh-data.sh --no-sync`。本班照排程 prompt 的字面直接跑了預設模式，腳本把 babel 正在寫的六個檔暫存、pull（已同步，無新 commit）、再還原。還原成功，工作樹跟開跑前一致，沒有東西遺失。

風險在暫存與還原之間那一兩秒：babel writer 若剛好在這時寫檔，還原會衝突。這次沒撞上是時機，不是設計。排程 prompt 的 Stage 1 指令沒寫這個分支，前兩班是靠讀到昨天的 memory 才知道要加旗標，本班讀了甦醒檔卻沒在動手前翻昨天那份。

## Stage 1.5：排程 dump

`list_scheduled_tasks` → `routine-live-normalize.py`：14 條 enabled、4 條 disabled，告警重生 10 條、0 紅，狀態頁 stale_hours 23.9→0。`twmd-review-stock` 仍未註冊（`OBSERVER-QUEUE #116`）。

## 告警裡屬於本席位的燈

`data-hub-stale`：`mortgage-burden`（房貸負擔率，已 235 天）。用瀏覽器開 `pip.moi.gov.tw/Publicize/Info/E1050`：頁面最新一期仍是 115 年第 1 季，沒有 115Q2。燈留著，不估。（curl 只拿到 245 bytes 的擋頁，這一頁要用瀏覽器看。）

比昨天多一盞：`memory-index-rows`，MEMORY.md 索引 inline 81 列超過 80，owner 是 distill-weekly（11-22 03:12）。本班補索引列後是 82，沒有代跑 rollup。

其餘八條不是本席位：免疫 59、六條週班「沉默死亡」（11-14／11-15 那輪）、探測器落後 26 天。週班這一輪 11-22 凌晨開始，有沒有恢復明天早班的 dump 看得到。

## 收官 checklist

| 檢查項                       | 狀態                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                   |
| Handoff 三態已審視           | ✅                                                                   |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生                                                  |
| 甦醒檔讀完                   | ✅ 讀到 `wake:END`                                                   |
| commit 範圍                  | 只收刷新產物、live-state 與本檔；babel 的譯文狀態與報表一律不收      |
| diary                        | skipped：diary-gate PASS，但內容是對賬全綠，照 Stage 0c routine 不寫 |
| evolve                       | skipped：本班零內容產出                                              |

## Handoff 三態

繼承自 `2026-11-20-060913-twmd-data-refresh-am.md`：

- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認仍未註冊。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-22）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 `twmd-routine-audit-weekly` 11-22）10-31～11-15 週日鏈缺班記成同一個缺口（停擺期）。
- [ ] pending（延續，席位：data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2；11-19、11-20、11-21 查過未發布。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`；babel writer 仍在跑。

本 session 新增：

- [ ] pending（席位：`twmd-routine-sync` 或下一個改 routine prompt 的 session，slug `data-refresh-no-sync-when-actor-busy`）排程 prompt Stage 1 補一句「groundtruth 印 `ACTOR_BUSY` 時改跑 `refresh-data.sh --no-sync`」，或讓 `refresh-data.sh` 自己偵測 babel writer 後跳過暫存。現在這個分支只住在前幾班的 memory 裡，本班就是照 prompt 字面跑而漏掉的。

## Beat 5 — 反芻

連三班十四步全綠。這班唯一不一樣的地方是我自己：前兩班知道 babel 在寫檔時要加 `--no-sync`，那個知識寫在它們的 memory 裡，沒寫在我每天照著跑的那段指令裡，於是第三班就照字面跑了。沒出事，但這正是「知識留在註解層沒有下沉到控制流」的樣子，所以交接寫的是改 prompt 或改腳本，不是提醒下一班記得。

🧬
