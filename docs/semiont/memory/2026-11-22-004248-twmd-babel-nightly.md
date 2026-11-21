# 2026-11-22-004248-twmd-babel-nightly — 續命班：「沒有輸出」裡藏著一個模型配一個語言的固定失敗，腳註批次改成一路切到單條

> session twmd-babel-nightly — cron 00:30 觸發（續命型：11-20 03:56 起的 dispatcher 還活著）
> Session span: 約 00:42 → 01:20 +0800（1 個工具 commit、1 個收官 commit）
> 資料來源：`git log %ad`、`/tmp/babel-unified-20261120-035646-47089/report.jsonl` 與 `master.log`、`babel-preflight.py`、`status.py`、`babel-pulse.py`

## 觸發

每晚的巴別塔班。BECOME ACK：mode=write，8 器官最低＝免疫 59（快照齡 18 小時，標 stale），Q14 跨 session 連續性 PASS：11-21 整天 babel 產線每一兩小時推一批十二語 commit，maintainer 合四件投稿並修掉幣別閘門的越南文誤判，心跳四班都是額度 lean 沒做事，babel 的額度嫌疑連降三級；四條週班 11-14／15 沉默死亡，今天起看是否恢復（news-lens 01:02 已有 memory 列）。甦醒檔用 Read 分頁讀到 `wake:END`。selftest 亮一盞燈：diary 沉默 20 天。Write mode 的 LONGINGS、ARTICLE-INBOX 本班沒讀；SQUEEZE 沒讀，BABEL-VORTEX 讀 §Prompt contract 到 §自動進化，MEMORY-PIPELINE 沒有重讀，格式照昨晚同席位的 memory。

## 算力與產線狀態

`babel-preflight.py` 判 healthy（3/4 層）。缺席層：codex 登入過期（身份授權，留哲宇）。付費層七把 key 餘額仍是零。地端 `gemma4:26b` 生成探測 3.5 秒收尾，fleet 只核發 mac-m4max；名單外的 `gemma4:e4b-nvfp4` 還裝在本機但沒被核發。slug 登記全數到位，近兩日 597 筆沒有弱適配組合。

Stage 0.5 第一種：續命。存活（dispatcher 47089 跑了 45 小時、推送迴圈 57192 在，兩者都由 launchd 拉著，git 鎖不存在）、生產（pulse rate 1.9 篇／小時；近 45 分鐘 report 1 筆失敗，近三小時 20 筆裡 4 筆成功，當下有一篇越南文分段翻譯在跑）、第二訊號源（fleet 核發與 preflight 一致）。沒有重啟，沒有另開一輪。速率比昨晚的 8.3 低，佇列只剩難篇；生產這一項是勉強過，不是寬裕地過。

## 「no output written」拆開之後

近 24 小時 53 筆失敗的理由欄都是同一句 `no output written by translate.py (exit=1)`，是最大的一族，也是唯一看不出原因的一族。回 `master.log` 逐筆對，裡面至少有五種不同的事：正文分塊重試後仍失敗（37 次）、nemotron 在腳註階段回空內容（15 次）、腳註批次長度對不上（4 次）、標籤長度對不上（2 次），以及腳註批次形狀不對（9 次）。

最後這一種有固定形狀。九次裡八次是本機 `gemma4:26b` 翻印地語的重腳註文章：〈台灣新冠疫情與疫苗〉三次（1,039／1,044／1,123 秒，停在同一個位置）、〈中央研究院〉三次、〈台灣醫療與全民健保〉兩次。模型對多條腳註的批次只回尾端一筆 object；`structured-translate.py` 九月加的補救是對半切一次，半批（7、8 條）還是回單筆，就整篇結束。這幾篇每次輪到 gemma 都必然失敗，累計八次後被記成 cascade exhausted。

修法（`b844cbf5a`）：對半切改成遞迴，一路切到單條。單條批次的裸 object 九月起就被認定是完整答案，所以遞迴有底；每一層照樣過形狀與長度檢查，收件判準沒有動，backend error 與逾時照舊不在這裡擴張。補兩條測試，一條守新路徑，一條守「單條但 ID 對不上仍拒收」。新測試拿舊版程式碼跑會失敗，確認它量得到這個差別。

實跑驗證：〈中央研究院〉印地語用同一個模型輸出到暫存路徑，腳註階段 57 條通過（706 秒），呼叫紀錄裡有切到第三層的批次，整篇 1,274 秒完成。那份譯文沒有落地：它沒過 dispatcher 的整套閘門，而且活著的產線隨時可能動同一個路徑；翻譯腳本是每篇另起子行程，產線下一次輪到這幾篇就會用新版，不必重啟。

中途一個自己的失誤：做「新測試在舊版上會失敗」的對照時，在暫存目錄建了指回 repo 的符號連結，再把 HEAD 版本寫進那個路徑，寫入穿過連結蓋掉了剛改好的檔案。內容是 HEAD 版，沒有別的損失，重套一次修改後測試與 diff 都對。對照實驗的檔案要用複製，不用連結。

## 查過但判定不是閘門缺陷的幾族

- 〈Joeman〉阿拉伯文量級（nemotron 三次都是 `magnitude[1]`）：現行譯文跑同一道閘門也中，「100萬」寫成 100 ألف（十萬）。真錯，模型每次重犯。
- 〈Joeman〉〈奇拿富〉標籤含中文（gemma 每次都中）：模型把 zh 標籤原樣留下，閘門判對。
- 〈新台幣〉越南文幣別（三次 22〜28 處）：譯文通篇用裸 đồng。越南讀者會不會把一篇講新台幣的文章裡的 đồng 讀成越南盾，是越南文用語政策，屬閘門規則調整，本班不動。
- 〈台灣新冠疫情與疫苗〉葡文有一次停在「腳註 31 標題含 markdown」，全 log 只出現一次，不成族。

〈沈伯洋〉〈蔣萬安〉〈陳致中〉的 stale 仍在 `config/babel-hold.tsv` 的民調禁止期凍結內（到 11-28 16:00），本班不碰。

## 各語進度

本班沒有直接落地譯文，起訖讀數相同（產線這四十分鐘沒有新成功）：

| 語言 | fresh | stale | metaStale | missing |
| ---- | ----- | ----- | --------- | ------- |
| en   | 1189  | 3     | 1         | 0       |
| ja   | 1187  | 4     | 2         | 0       |
| ko   | 1185  | 5     | 3         | 0       |
| es   | 1185  | 6     | 2         | 0       |
| fr   | 1184  | 6     | 3         | 0       |
| vi   | 1179  | 12    | 1         | 1       |
| id   | 1185  | 5     | 3         | 0       |
| pt   | 1188  | 4     | 1         | 0       |
| hi   | 1177  | 12    | 2         | 2       |
| ar   | 1186  | 3     | 3         | 1       |
| ru   | 1190  | 3     | 0         | 0       |
| de   | 1162  | 23    | 8         | 0       |

對昨晚收官：fresh 合計多 56，missing 12 → 4，pulse gap 153 → 119。backend（本 run 45 小時）：gemma4:26b 156 成功／144 失敗、nemotron 104／133、Haiku 0／3。昨晚收官後新增的 cascade exhausted 九對：vi〈台灣新冠疫情與疫苗〉〈鱔魚意麵〉〈新台幣〉、hi〈Threads在台灣〉〈台灣與核能的討論〉、fr〈嘉義農林〉、de〈台灣醫療與全民健保〉、ar〈Joeman〉、ru〈鱔魚意麵〉。pulse 存量三族：截斷 24、網址不符 167、名人頂替 171。Stage D 日記：`diary-translation-audit.py` 0 critical，11-02 之後沒有新日記要翻。

## 收官 checklist

| 檢查項                       | 狀態                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                         |
| Timestamp 精確               | ✅（訖點約略）                                                             |
| Handoff 三態已審視           | ✅                                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不碰                                                                |
| 甦醒讀滿                     | ✅ 讀到 `wake:END`；LONGINGS、ARTICLE-INBOX、SQUEEZE、MEMORY-PIPELINE 沒讀 |
| diary                        | ➖ 不寫（selftest 那盞燈照實留著）                                         |
| evolve                       | ➖ 修補已在本班當場落地                                                    |

## Handoff 三態

繼承 `2026-11-21-004258-twmd-babel-nightly`：

- [ ] pending（收件席位：哲宇，經費決定）：付費層七把 key 餘額用完，原樣續傳
- [ ] pending（收件席位：哲宇，身份授權）：這台機器 codex 登入過期，原樣續傳
- [ ] pending（收件席位：設計席位，LESSONS `metadata-stale-bump-assumes-frontmatter-unchanged`）：原樣續傳
- [ ] pending（收件席位：下一班 babel）：`babel-pulse` 常駐沒掛、名人頂替存量 171、fleet 三台 GPU 節點是否刻意關機、量級差十倍的機械改寫、隔離區重放子指令，五條原樣續傳，本班都沒動
- ~~pending：額度嫌疑指向 babel~~ retired by `2026-11-21-203616-semiont-heartbeat`：連三班幾乎沒漲，嫌疑降級，決定仍在哲宇

本 session 新 handoff：

- [ ] pending（收件席位：下一班 babel）：看 hi〈台灣新冠疫情與疫苗〉〈中央研究院〉〈台灣醫療與全民健保〉在 gemma 那條 lane 上有沒有走過腳註階段。走過了但敗在別處，是下一層問題；仍停在 `JSON shape fail` 就是修法沒涵蓋到的形狀
- [ ] pending（收件席位：下一班 babel，動得了 `scripts/tools/lang-sync/`）：`fail_reason` 的 `no output written` 一句話蓋住五種原因。structured 引擎中止時的最後一行（Phase 與理由）應該進 report，這班是靠讀 log 才拆開的
- [ ] pending（收件席位：哲宇或語言指南席位，閘門規則）：越南文裡講台灣金額的裸 đồng 算不算在地幣別誤用。現行閘門一律擋，〈新台幣〉越南文因此三次全敗；要嘛閘門對這類文章給出路，要嘛在越南文提示詞裡寫死用 Đài tệ

## Beat 5 — 反芻

昨晚修的是閘門把對的譯文擋下，今晚修的是引擎在模型答得出來的情況下自己放棄。兩件事在 report 裡都長成一個看不出原因的理由欄：昨晚是 `currency[1]`，今晚是 `no output written`。差別在昨晚那一欄至少指著一道閘門，今晚這一欄是五種原因共用的一句話，佔了一天失敗的一半，所以連續幾班都把它讀成「模型不行」。固定失敗的線索其實在秒數裡：同一篇三次都停在一千零四十秒上下。

🧬

---

_v1.0 | 2026-11-22 01:20 +0800_
_session twmd-babel-nightly — 續命班，腳註批次遞迴對半，實跑驗過，沒有落地譯文_
_誕生原因：cron 00:30 每晚巴別塔班_
_核心洞察：一句通用的失敗理由佔到一半時，先回 log 把它拆開；同一篇每次停在同一個秒數，是固定失敗不是模型運氣_
_LESSONS-INBOX 候選：`one-fail-reason-string-covers-five-causes`（`no output written` 混五種根因，REFLEXES #38 的又一例）_
