# 2026-11-07-004919-twmd-babel-nightly — 續命班：推送卡了九小時，兩行帳本擋住 131 篇譯文

> session twmd-babel-nightly — cron 00:30 觸發（續命型，dispatcher 已在跑，未重啟）
> Session span: 約 00:40 → 01:00 +0800
> 資料來源：`.taiwanmd/babel-push.log`、`/private/tmp/babel-unified-20261103-202134-82396/report.jsonl`、`babel-preflight.py`、`status.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（讀數齡 18 小時，標 stale），Q14 跨 session 連續性靠 memory-rows 與 handoff 段答出。

**甦醒沒有讀完**，如實記下：讀了 MANIFESTO 身份核心、memory-rows、handoff、selftest 到 `wake:END`；反射段、memory-head、神經迴路、diary 段、groundtruth 段因單輪讀取上限未讀。LONGINGS、ARTICLE-INBOX 未讀，SQUEEZE-MODELS-MAX-PIPELINE 全檔未讀，BABEL-VORTEX 只讀 §三重巡檢。selftest 亮的唯一一盞燈是工作樹落後 2 個 commit，追下去正是本班的主題。

## 算力與巡檢

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期；付費層七把 key 餘額全空，實質缺席；地端雖列可用，`gemma4:26b` 生成探測 60 秒無回應，`TIME_WAIT` 261,298 個（開機第 54 天，昨晚 256,717），#124 重開機仍待哲宇。

存活：dispatcher PID 82396（11-03 20:21 起，第四晚）、`babel-push-every` PID 36434 都在，主樹在 main。生產：近 45 分鐘 9 筆 kept，雲端 nemo 8、地端 1。pulse 讀數 12.4 篇／小時。三項都過，所以不重啟不另開。第二訊號源：fleet 核發 mac-m4max 三條 lane，與 preflight 一致。

## 推送停了九小時

`git pull` 失敗讓我看到 main 領先 48、落後 2。`babel-push.log` 自 11-06 15:52 起連續 263 次「合併 origin/main 失敗」，原因都是 `data/compute/claude-usage-ledger.jsonl` 有本機改動。這段時間 128 篇譯文只存在這台機器。

那份改動是工作樹比 HEAD 少兩行，兩行都屬 `2026-11-06-083553-manual`（MacBook 上的上午輕量班），同班的 memory 檔也在工作樹被刪。內容全在 commit `afb6c9a8b` 裡，工作樹沒有多出任何東西。確認 diff 只有刪除後，在共用鎖底下（`mkdir`／`rmdir`）把這兩條路徑 `git restore` 回 HEAD，跑一次 `babel-push-every.py --once`：合併 2 個 commit，00:48 推送完成 131 篇，ahead 0／behind 0。

**根因沒有找到**。誰把工作樹退回去的不知道：ledger 的 mtime 只留下合併失敗當下的時間，reflog 也沒有線索。同型失敗從 9 月至今累計 907 次，這支工具的設計是記 log 等人看，而 pulse 那行讀數不會把它帶出來。11-03 同一班已撞過同一份帳本，LESSONS 當時提議的 pulse 🔴 行還沒做，本班把該條 bump 到 vc=2。那次工作樹多出獨有紀錄，不能直接還原；這次只少不多才能 restore，下次要先看 diff。

## 閘門與〈台北吸菸室〉

近 24 小時保留 306 筆（nemo 292、macm4max 14），其中 236 筆是補丁。失敗最多的是 `no output written by translate.py`（地端 38、nemo 12），與地端掛住的情況一致。沒有任何一篇跨三種以上模型敗在同一理由，今晚沒有閘門缺陷要修，工具也沒動。

〈台北吸菸室〉是 #1965 欠郭醫師的那段：十二語只有 en、de 跟上，其餘十語 stale，仍帶對拒菸聯盟的舊指控。vi、ru、hi 三語都是 nemo 跑滿約 900 秒後無輸出，pt 被 section count 擋下。這篇對單一免費模型偏長，可能要交委派層，本班沒有手接。

## 各語進度

母稿 1,162 篇。收工時 stale 21〜33、metaStale 12〜35、missing 4〜6，覆蓋率十二語都在 99.5% 以上。對照前一晚 stale 30〜39、metaStale 28〜49。pulse gap 602，較前次少 297。

本班只有一項變動：工作樹兩條路徑還原，加上推送。沒有手接譯文，沒有改工具。Stage D 日記 babel 本班沒查。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅（起點約略）                            |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰，babel 產線不寫 CONSCIOUSNESS |
| 甦醒讀滿                     | ❌ 見 §觸發                               |

## Handoff 三態

繼承 `2026-11-06-090848-twmd-maintainer-daily`，其 pending 全部原樣續傳，本班未動；繼承 `2026-11-06-004324-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，OBSERVER-QUEUE #124，🔒）：Mac mini 重開機。TIME_WAIT 又多四千多個，地端與 embeddings 都卡在這裡
- [ ] pending（收件席位：重開機後第一班 babel）：驗 TIME_WAIT 是否回到幾百、`gemma4:26b` 串流能否收尾

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-babel-nightly`／委派層，OBSERVER-QUEUE #79 同路）：〈台北吸菸室〉其餘十語。nemo 跑滿 900 秒無輸出，評估交委派層。完成後回 #1965 告訴郭醫師，由 `twmd-maintainer-daily` 關單
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，11-08）：照 LESSONS `push-loop-blocked-by-dirty-shared-file-waits-for-nobody` 讓 `babel-pulse` 印出推送連續失敗次數與擋路檔；四天內第二次，這次靠 `git pull` 失敗才撞見
- [ ] pending（收件席位：下一班 babel）：查工作樹為什麼會退回已 commit 的內容。兩次都是 `budget-pace.py --log` 寫的這份帳本，今晚只修了現象，再犯就比對失敗起點前後哪個程序碰過它
- [ ] pending（收件席位：下一班 babel）：本班未查 Stage D 日記譯文

## Beat 5 — 反芻

推送停九小時，產線每個讀數都正常：存活、生產、pulse、preflight。三重巡檢問的是譯文有沒有產出，沒問譯文有沒有離開這台機器。昨晚學到模型在清單上不等於請求收得了尾，今晚是同一件事的下游：commit 了也不等於上站。

---

_v1.0 | 2026-11-07 twmd-babel-nightly 續命班_
_誕生原因：推送迴圈被工作樹漂移擋住九小時，修復並留下根因未明的紀錄_
_LESSONS：`push-loop-blocked-by-dirty-shared-file-waits-for-nobody` vc=2（11-03 已有此條）_
