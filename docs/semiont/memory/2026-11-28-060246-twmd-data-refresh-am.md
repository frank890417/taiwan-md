# 2026-11-28-060246-twmd-data-refresh-am — 早班刷新十四步全過、15 個 dashboard 0 stale；九個過期指標逐一查出處，沒有新一期；404 單日連四天上升

> session twmd-data-refresh-am — 排程觸發（am 06:00 資料刷新）
> Session span: 06:02:46 → 06:20 +0800（約 18 分鐘，1 commit）
> 資料來源：refresh log、`list_scheduled_tasks`、`routine-sync-check.py`、`consciousness-snapshot.sh`、`reports/404-monitor/state.json`

## 觸發與甦醒

每日早班資料刷新，Micro mode。甦醒檔 1,408 行分頁讀到末行 `wake:END`，selftest 十三項全綠，本機與 origin/main 同步。器官最低是免疫 59（刷新後重讀仍是 59，缺口在 review_coverage）。groundtruth 印 `ACTOR_BUSY`，babel 寫手五個進程在跑。

## 十四步結果

`bash scripts/tools/refresh-data.sh` exit 0，十四步全過。Step 1 偵測到平行寫手後自己改走 `--no-sync`，沒有 stash 也沒有 pull，工作樹留給 babel。

| 步驟  | 結果                                                                                                                 |
| ----- | -------------------------------------------------------------------------------------------------------------------- |
| 1     | PASS（`--no-sync`，本機不落後 origin）                                                                               |
| 2     | PASS，三源都回來：Search Console 11-26 曝光 278,925；Cloudflare 七天 14,910,968 次、404 率 0.25%；AI 爬蟲 198,870 次 |
| 2.5   | PASS，11-26 單日 404 共 6,505，monitor 未亮燈                                                                        |
| 3-6   | PASS，免疫 59                                                                                                        |
| 7-10  | PASS，⭐1255 🍴191 👥81 📄1192；最新 build 347 秒                                                                    |
| 11    | PASS，15 個 dashboard JSON 全是今天 mtime、analytics 內容日期 11-27，無 stale；catch≠fix 不觸發                      |
| 12-14 | PASS，孢子資料 0 錯 0 警告                                                                                           |

## 404 連四天上升

單日 404 從 11-22 的 3,228 一路到 4,599、4,863、4,953、6,505，四天都在漲。11-26 這一跳多出來的 1,552 筆裡，`unknown` 家族佔 918（其中機器人 703），`stale-asset` 從 20 跳到 501，幾乎都是瀏覽器在要已經換掉雜湊的 `/_astro/*.css`。那天 babel 一整天推了六十幾批，部署次數多，舊頁面要舊資產的機會跟著變多，這是推測，沒有對過部署時間。`duplicated-lang-prefix`（`/frfr/`、`/jaja/`）維持在九百上下，沒有跟著漲。七天 404 率 0.25% 仍低，monitor 的門檻沒被碰到。

## Stage 1.5：排程 dump

`list_scheduled_tasks` 全欄位落暫存檔後跑 `routine-live-normalize.py`：14 enabled、4 disabled，告警重生 4 條 0 紅，狀態頁 stale_hours 從 24 歸 0。`routine-sync-check.py`：drift=0、cron_drift=0、live_drift=1（`twmd-review-stock` 未註冊，OBSERVER-QUEUE #116 待決）。這份 dump 是直讀排程器來的，cron 與 enabled 跟鏡像一致，routine-sync 交接要的那次直讀，資料面已經有了。

## 資料台灣九個過期指標

黃燈從昨天的一個變成九個：八個年資料同一天跨過 697 天的期限。派一個 web-fetch 子代照九個出處網址查新一期，回報都附了網址與原文引句。五個頁面讀得到、確認沒有新一期：房貸負擔率仍是 115Q1（41.46%）；薪資中位數清單最新仍是 113 年那則（清單頁更新日 115-11-27，條目的 insight 寫「11 月底發布」，還沒出現）；溫室氣體最新是 2024（2026 年清冊）；文化部統計表的博物館、ISBN、國片占比三列欄位都停在 2024。三個沒查成：健保納保率與肉類供給量的數字在 PDF 裡，子代讀不出文字；研發經費的 wsts 表格是動態載入。沒查成的三個不算「未發布」，只算這班沒看到。

`indicators.json` 一個字沒動，九盞燈都留著。

## commit 範圍

刷新產物、`routine-live-state.json`、本檔與索引列。不收 babel 寫手的檔：`knowledge/` 各語譯文、`knowledge/_translation-status.json`、`public/api/babel-live.json`、`reports/babel/`、`src/data/related/`。

## 收官 checklist

| 檢查項                       | 狀態                      |
| ---------------------------- | ------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                        |
| Timestamp 精確               | ✅                        |
| Handoff 三態已審視           | ✅                        |
| CONSCIOUSNESS 反映最新狀態   | ✅（dashboard JSON 接管） |
| 自我檢查工具 PASS            | ✅                        |

## Handoff 三態

繼承：

- ⏳ blocked（收件席位：哲宇）`twmd-review-stock` 排程待建，OBSERVER-QUEUE #116（待決）；排程 session 建不了。
- ⏳ blocked（收件席位：哲宇）mouhouse 12-02 前重新登入，issue #2091。
- [ ] pending（收件席位：下一班 twmd-data-refresh，動得了 `indicators.json`）`data-hub-stale` 的 `mortgage-burden` 等 115Q2、`median-earnings` 等 114 年那則新聞稿，各查一次出處頁。
- [ ] pending（收件席位：站體 session，刷新班的 commit 範圍收不下站體連結）`duplicated-lang-prefix` 404 家族每天九百筆上下。

本班新增：

- [ ] pending（收件席位：下一班 twmd-data-refresh）`nhi-coverage`、`meat-per-capita`、`rd-gdp` 三個出處這班沒讀成。前兩個是 PDF，用 Read 開下載檔比派子代可靠；讀到才判斷有沒有新一期。
- [ ] pending（收件席位：下一班 twmd-data-refresh）404 單日數若 11-27 仍高於 6,505，把 `stale-asset` 的時間分佈跟部署時間對一次，再決定要不要寫 LESSONS。
- diary：skipped，routine 全綠、零內容產出。evolve：skipped，同上。

## Beat 5 — 反芻

九個指標查下來，「確認沒發布」與「這班沒讀到」在黃燈上長得一樣，燈都留著。差別只存在這份檔案裡，所以交接把兩種分開寫了，下一班不必把五個已確認的重查一遍。

🧬

---

_v1.0 | 2026-11-28 06:20 +0800_
_session twmd-data-refresh-am — 排程早班資料刷新_
_誕生原因：每日 06:00 routine_
_核心洞察：過期指標九個查完零更新，其中三個是讀不到而不是沒發布；404 單日數連四天上升，主因看起來是部署頻繁後的舊資產請求。_
