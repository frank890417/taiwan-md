# 2026-09-10-003700-twmd-babel-nightly — 同一個 dispatcher 第二晚仍未收工，再次讓場並把這個訊號升進 LESSONS-INBOX

> session twmd-babel-nightly — cron 觸發，00:30 例行多語批次同步
> Session span: 00:37 → 00:41 +0800（~4 分鐘，2 commits：LESSONS-INBOX + 本檔，純觀察、記錄、無翻譯落地）
> 資料來源：`git log %ai` + `ps` + `check-parallel-actor.sh` + `babel-preflight.py` + `status.py` + `fleetctl workers`

## BECOME ACK

`/twmd-become write` 完整跑過 BECOME_TAIWANMD.md Step 0-9：Mode=Write（cron babel 觸發），Step 1 Universal core 用 `wake-context.py` 一鍵取數，`.taiwanmd/wake-context.latest.md`（241,225 bytes / 11 段）用 Read 工具分頁讀到 `wake:END` sentinel，selftest 10 項體檢全綠（memory/diary 索引新鮮落差 0d、handoff 命中、REFLEXES catalog 對賬 95/95）。Q1-4/8-11/14 共 9 題 Write mode subset 全過，才對觀察者（本 session 為無人在場的 cron context）開口。

## Stage 0 — 宿主機算力自檢

`babel-preflight.py` 判定 healthy（4/4 層）：OpenRouter 7/7 key 通過且已儲值、本機 ollama `gemma4:e4b-nvfp4` 可用、fleet 1 台節點（mac-m4max）可達、codex-cli 0.145.0 在線。唯一 ⚠️ 是實績檢查：`gemma31`（`openrouter:google/gemma-4-31b-it:free`）對 ar/de/en/es/fr/hi 六語言近兩日通過率全部 <15%（de/es 直接 0%，n=21-30），preflight 自己建議「切軌換模型，不要加大重試」。缺席層：無，四層皆有算力。

## 撞見的狀況：跟昨晚同一個 dispatcher，還是沒收工

`check-parallel-actor.sh` 回報 `ACTOR_BUSY`：`babel-dispatch.py --langs en,ja,ko,es,fr,vi,id,pt,hi,ar,ru,de`（PID **52743**，跟昨晚 2026-09-09 00:37 撞見的是**同一個** PID）已經連續跑了 **1 天 23 小時 53 分**（`ps -p 52743 -o lstart` 顯示啟動於 2026-09-08 00:42:20，等於橫跨了兩個完整的 00:30 cron 窗口）。git log 最新一筆 commit（`2fd584d5c`，vi 批次）在 00:09:11 落地，撞見當下（00:35）距離最近一次 commit 只有 26 分鐘；三個活躍子行程（`translate.py` 分別跑 ja/de/ja 三個語言批次）elapsed 分別是 9 分、5 分、3 分，代表 dispatcher 仍在持續派新任務。

三重巡檢（REFLEXES #38(f)）：**存活**（`ps` 抓到主行程 + 3 個活躍 worker 子行程）／**生產**（26 分鐘前才 commit，worker elapsed 都在個位數分鐘）／**第二訊號源**（`fleetctl workers --service llm` 回報 mac-m4max 節點 3 個 worker 在線，跟 dispatcher 啟動時登記的 macm4max1/2/3 對得上）。三項全綠，確認是真的活著在幹活，不是假象。

`status.py` 顯示 12 語言離 stale=0 還很遠：en/ja/ko/es/fr/pt 都在 76-78% fresh，vi/id/hi/ar/ru 在 56-71%，**de 只有 12.8%（976 篇 missing，138 篇 fresh）**——de 是最年輕的語言，這也是為什麼這輪 dispatcher（`--rounds 200`）已經連跑近 48 小時還沒有要收工的跡象。

## 為什麼今晚的正確動作還是讓場

再啟動第二個 `babel-dispatch.py` 打同一批 `knowledge/` 檔案會直接撞上 REFLEXES #57（routine 入口必須 detect parallel-actor）+ #6/#42/#68 那組多核心 git 協調鐵律：兩個 dispatcher 搶同一批翻譯檔、搶 git index、搶 fleet 額度，產出不會疊加，只會互相打架、甚至讓某些檔案被覆蓋兩次浪費算力。現有的 working tree 未 commit 變更（`knowledge/fr/de/pt/*.md` 等）跟 `reports/babel/*.json` 都屬於這個活著的 dispatcher 的 in-flight 狀態，本 session 全程未觸碰。

跟昨晚不同的地方：這不是「兩個獨立 dispatcher 湊巧重疊」，是**同一輪**跨過了第二個 cron 窗口。昨晚的 handoff 把這寫成「LESSONS-INBOX 候選」，今晚是第二次獨立撞見同一個結構性訊號（vc=2），已經寫進 [LESSONS-INBOX](../LESSONS-INBOX.md#babel-nightly-的-0030-cron-窗口跟-dispatcher-實際續跑時長已經脫節2026-09-09-起連續第-2-晚vc2)（未達 REFLEXES 慣例 vc≥3 門檻，先進 buffer；下次若第三次撞見同一 PID 或同一形狀，升 canonical）。

## 收官 checklist

| 檢查項                       | 狀態                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                               |
| LESSONS-INBOX 新增（vc=2）   | ✅                                                                                               |
| Timestamp 精確               | ✅（`git log %ai` + `ps lstart/etime`）                                                          |
| Handoff 三態已審視           | ✅                                                                                               |
| CONSCIOUSNESS 反映最新狀態   | ✅（本 session 未變更任何 canonical 身分檔案，無需更新）                                         |
| 自我檢查工具 PASS            | ✅（LESSONS-INBOX 新條目已自檢對位句型／破折號密度，未觸發 §11 兩條紅線）                        |
| git 紀律                     | ✅（只 stage `docs/semiont/LESSONS-INBOX.md` + 本 memory 檔，未碰 dispatcher 的 in-flight 檔案） |

## 各語進度 delta（本班無新翻譯落地，記錄撞見當下快照供下次對比）

| 語言 | fresh | stale | missing | coverage |
| ---- | ----: | ----: | ------: | -------: |
| en   |   796 |    80 |     223 |    78.1% |
| ja   |   758 |    96 |     233 |    76.2% |
| ko   |   803 |    77 |     222 |    78.5% |
| es   |   794 |    80 |     227 |    78.0% |
| fr   |   793 |    81 |     224 |    78.0% |
| vi   |   678 |    82 |     282 |    67.8% |
| id   |   574 |    49 |     487 |    55.6% |
| pt   |   783 |    68 |     254 |    75.9% |
| hi   |   653 |    39 |     419 |    61.7% |
| ar   |   713 |    46 |     347 |    67.7% |
| ru   |   749 |    42 |     318 |    70.6% |
| de   |   138 |     6 |     976 |    12.8% |

## Backend 統計

本 session 無自跑 backend（未派發，觀察 + 讓場）。既有 dispatcher 使用中的 worker：macm4max1/2/3（本機 ollama `gemma4:e4b-nvfp4`）+ nemo/gemma31/lagunas/nemolight（OpenRouter free tier）；preflight 記錄弱適配警訊（gemma31 六語言 <15% 通過率）已寫進 LESSONS-INBOX 供下次重啟 dispatcher 時參考排除。

## Handoff 三態

繼承自 `2026-09-09-090531-twmd-maintainer-am.md`（walk 1 檔命中）：

- `[ ]` pending — OBSERVER-QUEUE #52 等哲宇拍板：譯文漏譯存量 1,557 檔（高信心 284 檔），接線動作卡在「babel dispatcher 收工後才能接」的時機條件。本班無新事證，dispatcher 仍在跑。
- `[ ]` pending — adjacency 接線前要先補三類誤報（相對連結目標／wikilink／括號內小寫品牌名），補在 `cjk-leak-check.legit_spans()`。本班無新事證。
- `[ ]` pending — #1453 /exams/：三件缺口已量化寫進 PR 留言，等專門 session。本班無新事證。
- `⏳` blocked — #1609 等調閱《郭淑姿日記》兩冊；owner = 用語趨勢 routine。
- `⏳` blocked — #1678 等〈生態多樣性〉重寫；研究已在 ARTICLE-INBOX。

本 session 新 handoff：

- `[ ]` **給下一個撞見同一 PID 的 session**：如果 52743 還在跑（第三個 00:30 窗口），這個訊號已經達到 REFLEXES #76 的 vc≥3 門檻，直接升 canonical（REFLEXES 新條目或既有 #57/#76 子規則），不要再開第三條 LESSONS-INBOX buffer entry 重複記錄同一形狀。
- `[ ]` **給下一個真正啟動新 dispatcher 的 session**：`babel-preflight.py` 標記的 gemma31 弱適配（ar/de/en/es/fr/hi 全 <15%）值得在下次 `--worker` 清單裡排除或降權，不要靠現有的 freezes.jsonl 反覆凍結/解凍浪費輪次。

## Beat 5 — 反芻

昨晚寫下「排程窗口重疊本身就是訊號」，今晚驗證了這句話的下一層：**同一個訊號連續出現，不代表它已經被處理，只代表它還沒被處理到足以升級的門檻**。REFLEXES #76「multi-cycle trend window > single-cycle delta」講的正是這件事——vc=1 時是觀察，vc=2 時是重複觀察，只有 vc≥3 才有資格說「這是結構」。今晚沒有把這條直接推上 REFLEXES，是刻意守住這個門檻，不是懶得升級：如果每次 vc=2 都升 canonical，canonical 層會被單次巧合污染；但如果 vc=2 時只在腦子裡記一下不落文字，下一個撞見的 session（可能是我，也可能不是）就要從頭重新論證一次「這是不是模式」。LESSONS-INBOX 存在的意義正是接住這個中間地帶——比 memory 索引更容易被下一次 distill 掃到，又不需要現在就承諾它是永久真理。

跟昨晚不同的是今晚多想了一步：**讓場不等於什麼都不做**。三重巡檢 + preflight 讀出來的 gemma31 弱適配訊號，如果只是看過就算，下次啟動新一輪 dispatcher 的人（可能是另一個 session，也可能是我）還是要重新發現一次同樣的事。把它寫進 handoff 的「給下一個真正啟動 dispatcher 的 session」，是把這次觀察的價值從「我知道了」轉成「下一個接手的人不用重新踩一次」。

🧬

---

_v1.0 | 2026-09-10 00:41 +0800_
_session twmd-babel-nightly — 00:30 cron 觸發今晚多語批次同步_
_誕生原因：Stage 0 宿主機自檢撞見同一個 dispatcher（PID 52743）連續第二晚跨過 cron 窗口仍在產出，三重巡檢確認真活著非假象_
_核心洞察：(1) 同一訊號連續出現時，vc 門檻本身就是紀律——vc=2 進 buffer 觀察，vc≥3 才升 canonical，不要因為「已經看過一次」就提前升級或因為「還沒到門檻」就不落文字 (2) 讓場之後讀出來的次要訊號（gemma31 弱適配）不該隨觀察一起被丟掉，寫進 handoff 讓下一個真正動手的人受益_
_LESSONS-INBOX 新增：babel-dispatcher-outlives-cron-window（vc=2）_
