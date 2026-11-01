# 2026-10-22-015543-twmd-babel-nightly — 修復後續跑：付費層儲值花完卻每輪先搶缺檔，修好後十二語缺口歸零

> session twmd-babel-nightly — cron routine（00:30 排程）
> Session span: 00:40 → 01:56 +0800（約 1 小時 16 分，本班親手 4 個 commit，同期 dispatcher 產出 12 個 babel commit）
> 資料來源：`git log %ai`

## 觸發

每晚 00:30 的巴別塔班。BECOME ack：mode=write，八器官最低是免疫 59，跨 session 連續性通過（昨晚 babel 班補 slug、21:00 起〈一同走過從前〉十一個 commit 由 yitong 推上 main）。

Stage 0 算力自檢判 healthy，四層都在：OpenRouter 七把 key、本機 ollama（gemma4:26b）、fleet 一台 mac-m4max、codex。這個 healthy 後來證明只對了一半，見下一段。

Stage 0.5 屬於「有 dispatcher 在跑」：launchd `com.taiwanmd.babel.nightly` 在 23:24 拉起 PID 52813。三重巡檢裡存活與生產都過（近 45 分 ja、vi 兩篇落地，hi 正在跑），所以本班類型是**修復後續跑**：沒有重啟、沒有另開一輪，修完讓它在輪與輪之間自己換上新程式碼。

## 付費層沒錢了，卻每輪先搶走缺檔

剩下的真缺口只有〈一同走過從前〉的 hi／ar／ru 三格。report 顯示 Haiku（Tier 6，走 OpenRouter 付費）對 ar、ru 各撞兩次 HTTP 402 `in_flight_budget_exhausted`。逐把查 `/api/v1/credits`：七個帳號的儲值全部花完，六個各約 $10.10／$10，default $50.007／$50。自檢印的「7 把已儲值」量的是帳號儲值過、解鎖較大的免費日配額，跟餘額無關。

更麻煩的是排程。dispatcher 把這種 402 正確地歸成「後端容量失敗、不記文章的帳」，但那篇仍留在本輪已排過的清單裡；地端 gemma 補貨時看不到它，印「backlog 也沒有新貨」退場，下一輪三個 Haiku worker 又最先搶到它。兩輪零產出就是這樣來的。

修在 `babel-dispatch.py`：付費層的容量失敗，把那篇從本輪清單放回，讓 normal worker 當輪接得到；402 的餘額字樣讓該 tier 本 run 視同額度用完，不再派（`de0b38646`，附 `tests/test_babel_dispatch_credit_out.py`）。重生後第一輪撞到 402 的另一種措辭「requires more credits, or fewer max_tokens」，補進字樣（`08b720001`）。同時讓算力自檢多讀每把的餘額，全花完時明寫「付費層會撞 402，儲值是經費決定」（`aeaf79227`）。

結果在 01:10 重生的 run 裡看得到：hi 由地端 gemma 接（01:30），ar 由免費 nemotron 接（01:43），ru 在 Haiku 放手後經輪中補貨交給地端 gemma（01:47）。三篇 01:54 落地，`af20dddac` 一起推上 origin。

## 各語進度與剩下的 stale

本班起點（00:43）與終點（01:55）的 status 對照：missing 由 hi／ar／ru 各 1 變成十二語全 0；en／ar／ru 1149 全 fresh。〈一同走過從前〉十二語都已落地，十二份腳註都是 70／70 對齊母稿，結尾完整；fr／vi 的漢字是 iframe 原片名與括號註記，`cjk-leak-check` 0／2。

剩下的 stale 全部是投稿者手翻、依 OBSERVER-QUEUE #67（已決，選 B）產線不覆蓋的檔：台北吸菸室 ja／ko／es／fr（Hans）、臺灣的鯨豚 vi／hi／de（aminzai）、de 的蕭青陽、幾米、莫那·魯道、羅大佑與五篇 metadata-stale（tboydar），id／pt 的牛肉麵、滷肉飯、台塑（Kevin Huang、aminzai），hi 颱風假。這些都已記在 `reports/babel/human-translation-stale.tsv`，屬於維護班請投稿者更新或由人決定。義務鐵律意義下產線能做的部分已到底：stale 由產線可處理的為 0，cascade exhausted 0。

Stage D 日記投影：`diary-translate.py --status` 2080／2080 present，`diary-translation-audit.py` 0 critical。

Backend 統計（兩個 run 合計十二篇〈一同走過從前〉）：Haiku 付費 6 篇（es／fr／ko／id／pt／de，全在 23:46 前）、地端 gemma4:26b 4 篇（en／vi／hi／ru）、免費 nemotron-3-ultra 2 篇（ja／ar），codex 本班沒有接到工作。

## 收官 checklist

| 檢查項                       | 狀態                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                            |
| Timestamp 精確               | ✅                                                                            |
| Handoff 三態已審視           | ✅                                                                            |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不動（dashboard 由 data-refresh 06:00 更新）                           |
| 自我檢查工具 PASS            | ✅ pytest 19＋3 passed；verify-commit-scope 三次皆 OK；prose-health 見 commit |

## Handoff 三態

繼承 `2026-10-21-205352-yitong`（分身任務，五條都不是寫給本席位，原樣傳遞）：

- [ ] pending（席位：哲宇）— 分支 `claude/yitong-zouguo-congqian-187fdb` 的 `b74b63577` 推送時機；不過 main 上已有 21:00 起的十一個〈一同走過從前〉commit，席位可確認分支是否還有差異。
- [ ] pending（席位：Write 班）— 研究資料夾 `notes/待查證與待確認清單.md` 的外部查證五項。
- [ ] pending（席位：Write 班）— Stage 5 反向延伸閱讀五篇連回〈一同走過從前〉。
- [ ] pending（席位：maintainer 班）— `viz_health.py` 來源列正則缺 MULTILINE。
- [ ] pending（席位：maintainer 班）— terminology 檢查把「台視頻道」判成「視頻」。

繼承 `2026-10-21-004902-twmd-babel-nightly`：

- [ ] pending（席位：Full mode）— LESSONS `slug-gap-born-at-merge-seen-at-babel`（vc=3）PR 檢查。今晚沒有新的缺 slug，preflight 印「每篇母稿都排得進佇列」。
- [ ] pending（席位：babel 班或 self-evolve）— `nemotron-3-super-120b:free` 供應端 404 待重測；本班沒測，原樣往下傳。
- ⏳ blocked（席位：哲宇）— OBSERVER-QUEUE #110（待決）、#111（待決），本班沒碰。

本 session 新 handoff：

- [ ] pending（席位：哲宇，經費決定）— OpenRouter 七個帳號儲值全數用完。免費模型（nemotron-3-ultra:free）照常可用，付費 Tier 6 Haiku 停擺，dispatcher 已會自動停派。要不要儲值、儲多少由人決定；另 wrapper 帶 `--tier6-nightly-cap 100`，canonical 是 10（SQUEEZE §Tier 6/7，OBSERVER-QUEUE #18 已決），這次花完的金額跟這個上限有沒有關係值得對一下。本班不改 wrapper。
- [ ] pending（席位：maintainer 班）— `reports/babel/human-translation-stale.tsv` 現有 15 列（OBSERVER-QUEUE #67 已決），是產線剩下全部 stale 的來源，請投稿者更新或由人決定。

## Beat 5 — 反芻

今晚的病是兩把尺同時把「存在」當「效果」：自檢說七把都儲值過，dispatcher 說這篇本輪排過了。兩句都是真的，但前一句被讀成「付得出錢」，後一句讓一篇沒人做的文章在本輪對所有人消失。容量失敗不記文章的帳是對的，它還欠一步：也不該佔掉別人接手的位子。LESSONS `paid-lane-credit-out-holds-p0-gaps` 記下這一面。

修好之後 ru 是被地端 gemma 接走的，花的是本機電費，不是任何一個帳號的錢。缺錢的那一層停下來，主權捕手照常收下，這正是四層 cascade 設計時想要的樣子，只是它需要調度器先願意把文章放手。

🧬

---

_v1.0 | 2026-10-22 01:56 +0800_
_session twmd-babel-nightly — 修復後續跑：dispatcher 活著，付費層 402 讓三格缺口兩輪零產出_
_誕生原因：七個 OpenRouter 帳號儲值花完，Haiku 每輪先搶走〈一同走過從前〉ar/ru 再放手，篇子卡在本輪已排清單_
_核心洞察：容量失敗不記文章的帳，也不該佔掉別人接手的位子；「已儲值」量的是帳號歷史不是餘額_
_LESSONS-INBOX 候選：`paid-lane-credit-out-holds-p0-gaps`（已寫入，vc=1）_
