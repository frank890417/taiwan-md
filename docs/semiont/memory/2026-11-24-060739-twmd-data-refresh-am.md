✅ BECOME ack: mode=micro / 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`）/ Q14 cross-session continuity=PASS

# 2026-11-24-060739-twmd-data-refresh-am — 早班刷新十四步全過、15 個 dashboard 0 stale；房貸負擔率第六天查過仍未發布

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:01:45 → 06:12 +0800（排程器 `lastRunAt` 與 `date` 讀數，收官前零 commit）
> 資料來源：refresh log、`date`、`.taiwanmd/wake-context.latest.md`、`list_scheduled_tasks`、內政部不動產資訊平台 E1050 頁、`reports/404-monitor/state.json`

## 觸發

每日早班資料刷新。甦醒檔分頁讀到 `wake:END`（1–1374 行全讀，含身份段）。selftest 一盞燈：diary 22 天無產出，照 DIARY Stage 0 不為消燈補寫。groundtruth 印 `ACTOR_BUSY`（babel 寫手四個 pid），額度昨晚已回 🟢 normal。DATA-REFRESH-PIPELINE 與 MEMORY-PIPELINE 本班全檔重讀。

## 十四步結果

照 prompt 字面跑 `bash scripts/tools/refresh-data.sh`，Step 1 自己偵測到五個寫手 pid、改走 `--no-sync`，本機不落後 origin，腳本 exit 0。這條分支連兩天在真實刷新裡走對。

| 步驟  | 內容                       | 結果                                                             |
| ----- | -------------------------- | ---------------------------------------------------------------- |
| 1     | git sync                   | PASS（自動 `--no-sync`）                                         |
| 2-2.5 | 三源感知＋404 監測         | PASS，11-22 單日 404 共 3,228 次，無告警                         |
| 3-6   | 翻譯表、孢子、i18n、免疫   | PASS，免疫 59，最大缺口 review_coverage 17.4                     |
| 6.5   | fork-census                | PASS                                                             |
| 6.6   | dashboard-status           | PASS，當下 stale_hours=23.9，Stage 1.5 後重生為 0                |
| 7     | prebuild                   | PASS                                                             |
| 8-10  | llms.txt、統計、建置效能   | PASS，⭐1252 🍴191 👥81 📄1192，最新建置 347 秒，newsroom 209 篇 |
| 11    | 新鮮度閘門                 | PASS，15 個 dashboard JSON 全是今天，analytics 內容 11-23        |
| 12-14 | 孢子驗證、sporeLinks、索引 | PASS，0 錯 0 警告，166 則孢子                                    |

三源全部新鮮，沒有 soft skip：Cloudflare 七天 2,002 萬次請求、404 率 0.25%、AI 爬蟲 20.3 萬次（19 種）；Search Console 11-22 單日曝光 23.1 萬；GA4 top pages／七天文章各 20 筆。文章從 1191 變 1192，是昨天合併的〈愛玉〉，`config/article-aliases.json` 跟著多一條 `food/aiyu`，三個 i18n 檔的頁數字樣同步。心臟欄位：近七天有更新 45 篇，其中新進庫 11 篇。

Step 11 沒有 stale，catch ≠ fix 本班沒有觸發。

404 帳本裡 `duplicated-lang-prefix`（`/jaja/music/...` 這類重複語言前綴）11-22 有 880 次、786 次來自瀏覽器，看起來大，回頭對 `state.json` 十一月每日讀數都在 597 到 1,401 之間，是常態水位不是新跳升，監測本身也沒亮燈。本班只記水位，不動。

## Stage 1.5：排程 dump

`list_scheduled_tasks` 回傳原樣存到暫存檔（只留 normalizer 讀的六個欄位，逐字抄回應），再跑 `routine-live-normalize.py`：14 條 enabled、4 條 disabled，告警重生後 3 條、0 紅，狀態頁 stale_hours 23.9→0。`routine-sync-check.py` 三層比對 drift=0、cron_drift=0，唯一的 live_drift 是 `twmd-review-stock` 仍未註冊（`OBSERVER-QUEUE #116（待決）`）；七條 prompt 超過 50 行屬既有狀態，不是本班範圍。

剩下的「沉默死亡」燈仍是 weekly-report-sun（11-22 02:03 起跑後無痕跡，現在 52 小時），死因已由 11-22 routine-audit 查明並改掛 `weekly-report-safeguards-2026-11-22`，下次排程 11-29，本班不重複往下傳。

## 告警裡屬於本席位的燈

`data-hub-stale`：`mortgage-burden`（房貸負擔率，已 238 天）。開 `pip.moi.gov.tw/Publicize/Info/E1050`：檔案清單最上面仍是「115 年第 1 季」（全國 41.46%），沒有 115Q2。查過，未發布，燈留著，不估。11-19 起連六天同一個答案。

## 收官 checklist

| 檢查項                       | 狀態                                                                                               |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                                 |
| Handoff 三態已審視           | ✅                                                                                                 |
| CONSCIOUSNESS 反映最新狀態   | ✅ dashboard 已重生                                                                                |
| 甦醒檔讀完                   | ✅ 讀到 `wake:END`                                                                                 |
| commit 範圍                  | 刷新產物、live-state、本檔與索引列；babel 的譯文、狀態表、`reports/babel/`、`babel-live.json` 不收 |
| diary                        | skipped：routine 全綠，照 Stage 0c 不寫                                                            |
| evolve                       | skipped：本班零內容產出                                                                            |

## Handoff 三態

繼承自 `2026-11-23-060253-twmd-data-refresh-am.md`：

- ⏳ blocked（延續，席位：哲宇在營運機 app 排程頁；本席位只讀得到排程器）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`；本班 dump 確認仍未註冊。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`；今天回傳仍無此欄。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-29，動得了這些路徑）`ga-avg-engagement-is-session-duration`：一個產生端加三個讀取端，先在「改名」與「換指標」之間選一條。本班沒碰。
- [ ] pending（延續，席位：data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2；11-19 到 11-24 六天查過未發布。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session；本席位每天都撞上寫手，動不了）`git-gc-log-blocks-auto-cleanup`。

本 session 新增：無。

## Beat 5 — 反芻

今天沒有東西壞。值得記的只有一個小動作：排程器的回應要轉成檔案給 normalizer 讀，這一步只能手抄，REFLEXES #93 講的正是手抄自動代換值會把打字錯誤帶回來。先看 normalizer 實際保留哪六個欄位，只抄那六個、逐字照回應，抄的面積小，抄錯的機會跟著小。三層比對 drift 為零，算是這份抄本的外部驗證。

〈愛玉〉讓頁數從 1191 走到 1192，這個數字在 README、三個 i18n 檔、llms.txt、stats.json 同時變，是同一個事實在六個地方被重新轉錄。今天它們一致，因為都是同一支腳本在同一輪寫的。

🧬

---

_v1.0 | 2026-11-24 06:12 +0800_
_session twmd-data-refresh-am — 排程早班資料刷新_
_誕生原因：每日 06:00 routine_
_核心洞察：手抄無法避免時，先縮小要抄的範圍，再找一把尺驗抄本。_
