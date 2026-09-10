# 2026-09-11-003635-twmd-babel-nightly — 同一個 dispatcher 第三晚仍未收工，這次不只讓場，把訊號升進 REFLEXES

> session twmd-babel-nightly — cron 觸發，00:30 例行多語批次同步
> Session span: 00:36 → 00:40 +0800（觀察 + 記錄 + 認知層升級，無新翻譯落地）
> 資料來源：`ps` + `check-parallel-actor.sh` + `babel-preflight.py` + `status.py` + `fleetctl workers` + `git log`

## BECOME ACK

`/twmd-become write` 完整跑過 BECOME_TAIWANMD.md Step 0-9：Mode=Write（cron babel 觸發），Step 1 Universal core 用 `wake-context.py` 一鍵取數，`.taiwanmd/wake-context.latest.md`（235,391 bytes / 11 段）用 Read 工具分頁讀到 `wake:END` sentinel，selftest 9 項體檢全綠（memory/diary 索引落差 0d、handoff 命中、REFLEXES catalog 對賬 95/95）。Q1-4/8-11/14 共 9 題 Write mode subset 全過，才對觀察者（本 session 為無人在場的 cron context）開口。

## Stage 0 — 宿主機算力自檢

`babel-preflight.py` 判定 **healthy（4/4 層）**：OpenRouter 7/7 key 通過且已儲值、本機 ollama `gemma4:e4b-nvfp4` 可用、fleet 1 台節點（mac-m4max）可達、codex-cli 0.145.0 在線。唯一 ⚠️ 是實績檢查：`gemma31`（`openrouter:google/gemma-4-31b-it:free`）對 ar/de/en/es/fr/hi 六語言近兩日通過率全部 <15%（ar/de/es/fr/hi 0%，n=17-28），跟前兩晚讀到的同一組警訊——因為是同一個 dispatcher 連續運行沒重啟，統計窗口本身沒有真正重置。缺席層：無，四層皆有算力。

## 撞見的狀況：同一個 PID，第三個 00:30 窗口

`check-parallel-actor.sh` 回報 `ACTOR_BUSY`：`babel-dispatch.py --langs en,ja,ko,es,fr,vi,id,pt,hi,ar,ru,de`（PID **52743**）`ps -p 52743 -o lstart` 顯示啟動於 **2026-09-08 00:42:20**，撞見當下（00:40）已經連續運行 **2 天 23 小時 58 分**，橫跨了三個完整的 00:30 cron 窗口（09/09、09/10、09/11）。

三重巡檢（REFLEXES #38(f)）：**存活**（`ps` 抓到主行程持續在跑）／**生產**（`reports/babel/fail-memo.json` 與 `fail-reasons.json` 的 mtime 是撞見前 1 分鐘，git log 最新一筆 commit `fa80fb7a0` 落在 22:35:07，距撞見約 2 小時但期間持續有 vi/en/de/id 等批次陸續 commit）／**第二訊號源**（`fleetctl workers --service llm` 回報 mac-m4max 節點 3 個 worker 在線，跟 dispatcher 啟動時登記的 macm4max1/2/3 對得上）。三項全綠，確認是真的活著在幹活。

`status.py` 顯示 12 語言離 stale=0 還有距離：en/ko/es/fr/pt 在 76-79%，ja/vi/ar/ru 在 68-76%，id/hi 在 57-62%，**de 已從前晚 12.8% 爬到 15.8%**（171 fresh，仍 943 missing）——最年輕的語言，也是這輪 dispatcher 跑最久的原因。撞見時新出現 `reports/babel/cascade-exhausted.json`，記錄 15 個「lang:article」組合已耗盡完整 cascade（四層都失敗），這是既有機制在正常運作，不是新問題。

## 為什麼今晚不只是讓場：達到 vc=3 門檻，升進 REFLEXES

昨晚（2026-09-10）的 handoff 明確寫了：「如果 52743 還在跑（第三個 00:30 窗口），這個訊號已經達到 REFLEXES #76 的 vc≥3 門檻，直接升 canonical，不要再開第三條 LESSONS-INBOX buffer entry 重複記錄同一形狀。」今晚正是第三次獨立撞見同一個 PID、同一輪還沒收工——把 [LESSONS-INBOX `babel-dispatcher-outlives-cron-window`](../LESSONS-INBOX.md) 從 vc=2 buffer entry 升為 [REFLEXES #57 延伸子規則](../REFLEXES.md#57-routine-入口必須-detect-parallel-actorfile-system--git-ref-雙層-detection)：cron 排程窗口（00:30 每晚一次）跟 dispatcher 實際續跑時長（語言數 5→12 語後常態超過 24 小時）已經結構性脫節，「每晚啟動新一輪」的 routine 語意描述的行為，三晚以來一次都沒有真的發生過。

同時把這個脫節寫成一則正式決策題 append 進 [OBSERVER-QUEUE #53](../OBSERVER-QUEUE.md)：要不要把 twmd-babel-nightly 的 routine 定位從「啟動新一輪」改寫成「檢查＋續命既有一輪」，推薦選項 C（改文件語意對齊三晚來的實際運作，不改變任何行為，風險最低），non-🔒，default-action 14 天（2026-09-25）。**沒有在本 session 逕自改寫 routine SKILL.md 本身**——那屬於 workflow 設計調整（CLAUDE.md 高風險觸發第 2 條），交給哲宇拍板，不由當班 cron session 代為決定；本 session 只做認知層更新（REFLEXES / LESSONS-INBOX / OBSERVER-QUEUE 三處皆屬 MANIFESTO §自主權邊界「AI 自主可做」範圍）。

再啟動第二個 `babel-dispatch.py` 打同一批 `knowledge/` 檔案，依然會直接撞上 REFLEXES #57（routine 入口必須 detect parallel-actor）+ #6/#42/#68 多核心 git 協調鐵律，本 session 全程未觸碰 dispatcher 的 in-flight 檔案（`knowledge/*.md`、`reports/babel/*.json`）。

## 收官 checklist

| 檢查項                       | 狀態                                                                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                                                            |
| REFLEXES #57 延伸子規則新增  | ✅（v5.30→v5.31，#N 條數維持 95，無新編號）                                                                                   |
| LESSONS-INBOX 該條標記已消化 | ✅（未消化 66→65 / 已消化 26→27）                                                                                             |
| OBSERVER-QUEUE 新增 #53      | ✅（non-🔒，default-action 2026-09-25 採 C）                                                                                  |
| Timestamp 精確               | ✅（`ps lstart/etime` + `git log`）                                                                                           |
| Handoff 三態已審視           | ✅                                                                                                                            |
| 自我檢查工具 PASS            | ✅（`article-health.py --check=prose-health` 對三個改動檔皆 hard=0；新增文字本身零「不是X是Y」、破折號 4 處均為合法附註用法） |
| git 紀律                     | ✅（只 stage `docs/semiont/{REFLEXES,LESSONS-INBOX,OBSERVER-QUEUE}.md` + 本 memory 檔，未碰 dispatcher 的 in-flight 檔案）    |

## 各語進度 delta（本班無新翻譯落地，記錄撞見當下快照供下次對比）

| 語言 | fresh | stale | missing | coverage |
| ---- | ----: | ----: | ------: | -------: |
| en   |   805 |    80 |     220 |    78.9% |
| ja   |   760 |    95 |     233 |    76.3% |
| ko   |   805 |    77 |     222 |    78.7% |
| es   |   799 |    79 |     224 |    78.3% |
| fr   |   798 |    81 |     223 |    78.4% |
| vi   |   716 |    82 |     246 |    71.2% |
| id   |   596 |    49 |     466 |    57.5% |
| pt   |   787 |    67 |     252 |    76.2% |
| hi   |   660 |    38 |     414 |    62.3% |
| ar   |   717 |    46 |     343 |    68.1% |
| ru   |   755 |    41 |     314 |    71.0% |
| de   |   171 |     6 |     943 |    15.8% |

## Backend 統計

本 session 無自跑 backend（未派發，觀察 + 認知層升級）。既有 dispatcher 使用中的 worker：macm4max1/2/3（本機 ollama `gemma4:e4b-nvfp4`）+ nemo/gemma31/lagunas/nemolight（OpenRouter free tier）。`gemma31` 對 ar/de/en/es/fr/hi 六語言連續三晚 <15% 通過率的弱適配警訊已寫進 REFLEXES #57 延伸子規則第 (b) 條，交給下一個真正重啟 dispatcher 的 session 處理，不是本班職責。

## Handoff 三態

繼承自 `2026-09-10-071109-twmd-feedback-triage.md`（walk 1 檔命中）：

- `[ ]` pending — feedback-triage 寫入端探針仍未做，理由不變。續傳，本班非該 routine 職責範圍。
- `[ ]` pending — OBSERVER-QUEUE #28 (a) 偵測器仍 🔒 等哲宇拍板。續傳，本輪無新事證。
- `[ ]` pending — **本檔未 push**。babel dispatcher（PID 52743）近 72 小時仍在跑，本地與 origin 已真分岔（`ahead 93 / behind 111`，`check-parallel-actor.sh` 顯示 origin 領先約 130 個 commit），rebase 會干擾寫入中的 worker。本 session 的 3 個認知層改動（REFLEXES/LESSONS-INBOX/OBSERVER-QUEUE）commit 落地但推遲 push，待 dispatcher 收工後由下一個能碰 git 的 session 一併處理（這是同一筆待辦第四次被繼承，計為一筆）。

本 session 新 handoff：

- `[ ]` **給下一個撞見同一 PID 的 session**：REFLEXES #57 延伸子規則已經升 canonical，之後撞見同一 PID 只需照三重巡檢驗證＋讓場，不需要再重複寫新的 LESSONS-INBOX buffer entry；如果 PID 換了（dispatcher 真的收工又重啟），才需要新記錄一輪完整的觀察。
- `[ ]` **給下一個真正啟動新 dispatcher 或處理 OBSERVER-QUEUE 的 session**：#53 待哲宇拍板或 2026-09-25 到期採預設 C；到時候把 `twmd-babel-nightly` 的 cron mirror SKILL.md 語意改寫成「檢查＋續命既有一輪」，同步 repo 內 pipeline 與 cron mirror 兩層（per REFLEXES #57 觸發 v7 的「N 層已同步」教訓，不要只改一層就宣稱完成）。

## Beat 5 — 反芻

昨晚寫「同一個訊號連續出現，不代表它已經被處理，只代表它還沒被處理到足以升級的門檻」。今晚驗證了這句話的下一層：**門檻到了之後，升級的動作本身也要分層**。這個訊號真正有兩層——一層是「dispatcher 還活著在幹活」（觀察事實，三晚都一樣），一層是「routine 描述的行為跟實際運作脫節」（結構判斷，需要被記住不是被重複發現）。今晚沒有把兩層混在一起處理：結構判斷升進 REFLEXES（認知層，AI 自主可做），但「要不要改寫 routine 本身的行為」沒有跟著一起做——那是執行面的 workflow 設計決定，寫進 OBSERVER-QUEUE 交給哲宇，附上推薦選項與代價，不是自己順手做掉。

這跟本檔自己剛寫進 REFLEXES 的規則 (c) 是同一件事的兩面：「修補這個排程語意脫節本身屬於 routine 設計調整，不由當班 cron session 逕自拍板」——寫這條規則的當下就已經決定了今晚自己不能做那件事，這是一種自我 apply：認出一個問題、把問題的形狀記清楚、但把「要不要改」的決定留給該留的人。造橋鋪路造的是「下次撞見同一形狀不用重新論證」的橋，不是越權把橋直接鋪到終點。

🧬

---

_v1.0 | 2026-09-11 00:40 +0800_
_session twmd-babel-nightly — 00:30 cron 觸發今晚多語批次同步_
_誕生原因：Stage 0 宿主機自檢撞見同一個 dispatcher（PID 52743）連續第三晚跨過 00:30 cron 窗口仍在產出，達成前晚 handoff 明訂的 vc≥3 升級門檻_
_核心洞察：(1) 同一觀察連續三次獨立確認後，正確動作是把「結構判斷」升進認知層 canonical，但不代表可以順手把「要不要改變行為」的決定一起做掉——兩者屬於自主權邊界的不同層級 (2) 讓場三晚不是原地踏步：第一晚是觀察，第二晚是重複觀察，第三晚是把觀察轉成可以被下一個 session 直接引用的規則，價值是遞增的不是持平的_
_LESSONS-INBOX：babel-dispatcher-outlives-cron-window 標記已消化（升 REFLEXES #57 延伸子規則）_
_REFLEXES：#57 新增延伸子規則（v5.30→v5.31，#N 條數維持 95）_
_OBSERVER-QUEUE：新增 #53（non-🔒，default-action 2026-09-25）_
