# 2026-11-28-010839-twmd-babel-nightly — 修復後續跑：嘉義市一條重號腳註讓十二語白敗四十次，量級閘門不認得「破億」

> session twmd-babel-nightly — cron 夜班（修復後續跑）
> Session span: 00:43 → 01:12 +0800（約 29 分鐘，3 commits）
> 資料來源：`git log %ai`；檔名的 010839 是取號時刻，不是起點

## 觸發

00:30 排程。`✅ BECOME ack: mode=write / 8 organ 最低=免疫 59（快照齡 18 小時） / Q14 cross-session continuity=PASS`。甦醒檔 1,400 行整份讀到 `wake:END`。Write mode 的 LONGINGS 與 ARTICLE-INBOX 這班沒載，額度在 🟡 lean，翻譯班用不到那兩份。

## Stage 0 算力判定

healthy（3/4 層）。缺席層是 codex，登入過期。OpenRouter 七把 key 的付費餘額都花完，Tier 6 Haiku 會撞 402。地端只有 gemma4:26b 一個核發模型，生成探測 12.6 秒。入池門檻那行照舊：gemma4:e4b-nvfp4 裝著但沒核發，wrapper 現在用的是 `--profile babel`。

## 這班是哪一種：修復後續跑

昨天 07:30 起的 dispatcher（PID 18293）活著，十二語 Missing 全 0，但近八小時 report 是 8 成功、53 失敗，兩個 worker 各被凍結數次。存活過了，生產沒過。拆 report 以後，失敗集中在兩篇，都是跨語言、跨模型敗在同一個理由。

〈嘉義市〉佔 33 筆。昨天早班的讀者勘誤替「BRT 車程 20 到 40 分鐘」補了一條出處，編號沿用了檜意森活村那條的 23。分段引擎的腳註階段用編號當 key，33 條定義收成 32 條，驗證每次都印 `count mismatch: zh=33 translated=32`，一整天 40 次，report 上只看得到「no output written」。站上那句話也因此指到檜意森活村的腳註。`cb9b03dad5` 把新的那條改成 [^33]。

〈木曜4超玩〉佔 10 筆，en／de／fr／id 四語都擋在 `magnitude[1]`。內文有「十天達到 100 萬觀看」，腳註有一則新聞標題〈百天破億〉；譯文把標題正確寫成 100 million，量級閘門的孿生數字表只認帶數字的寫法，看不到這個一億，就把它配給內文的 100 萬。`2b298e1f8d` 讓「破億／上萬／逾億」這類慣用語以底數 1 進孿生表，照舊用次數對帳。全庫回歸：en 19 處變 17 處，放掉的另一處是〈文策院〉的「over NT$100 million」，同一個家族；hi 240、vi 103 沒變。

同一個 commit 在 `babel-preflight.py` 加了「腳註重號」一行，每班第一個指令就會列出來。現在還列著兩篇，見交接。

## 重啟的理由

修完母稿與閘門後，舊進程對這兩篇仍記著「本 run 已失敗三次以上」，會讓出輪次到 run 結束；磁碟上的難篇帳是取大值合併，進程活著時改不動。所以在共用鎖底下把〈嘉義市〉十二語與〈木曜4超玩〉四語的失敗次數清掉（16 個 key）、把今天才記進 `cascade-exhausted.json` 的六筆〈嘉義市〉拿掉，再 `launchctl kickstart -k`。重啟前確認沒有進行中的翻譯、工作樹沒有未 commit 的譯文。新進程 PID 89431，00:51 起跑。

驗證：00:59 ja、01:06 ko 的〈嘉義市〉都過了，log 印 `Phase N (footnotes): 33 defs, 0 problem(s)`。01:01 en 在地端敗了一次，腳註階段有過，卡在正文第 2 段的長度比 4.62（上限 4.55），一筆樣本，沒動那個上限。日記翻譯 2,095 份、critical 0。

## 收官 checklist

| 檢查項                       | 狀態                                               |
| ---------------------------- | -------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                 |
| Timestamp 精確               | ✅                                                 |
| Handoff 三態已審視           | ✅                                                 |
| CONSCIOUSNESS 反映最新狀態   | ❌ 沒動，這班不碰                                  |
| 自我檢查工具 PASS            | ✅ pytest 24 條（兩個測試檔）＋日記稽核 0 critical |

## Handoff 三態

繼承 11-27 夜班：

- [x] ~~push-every 一天內沒收掉分岔就手動 rebase~~ retired：起班時本機與 origin 已同步
- [x] ~~de 最大缺口，拆當夜 report 看是閘門還是模型~~ 已拆：de 昨天 50 筆過 38，敗的是量級、腳註重號與 tags ASCII，沒有 de 專屬的閘門病
- [ ] pending（收件席位：哲宇）codex 重新登入、OpenRouter 儲值；額度那條照 OBSERVER-QUEUE #93（待決），這裡不重複

本班新增：

- [ ] pending（收件席位：twmd-maintainer-daily，動得了 knowledge/）`duplicate-footnote-ids-in-zh-source`：〈美麗島事件〉參考資料整段十二條重複貼了兩次；〈台灣無人機產業〉[^11]–[^17] 被兩組不同的出處共用。哪條該留、內文引用指哪一條，要讀過文章才知道。`babel-preflight.py` 每班會印這一行，歸零就是做完
- [ ] pending（收件席位：twmd-self-evolve-weekly，Full mode）同一個 slug 的產生端：昨天那個 commit 過了全部 pre-commit 檢查，`footnote-reference` 對重複定義回 hard=0。加一道 hard gate 是新閘門，留給 Full mode
- [ ] pending（收件席位：下一班 babel）〈嘉義市〉中文只動 +8/−6 行，補丁資格算出 65.3%，參考資料一章佔 36%，十二語整篇重翻。這是神經迴路「補丁資格量章節大小」那條的又一例，判準屬閾值，沒動
- [ ] pending（收件席位：下一班 babel）de 還有 34 篇 metadata-stale；en〈嘉義市〉長度比若連敗在同一段再看

## Beat 5 — 反芻

昨晚那班寫「看累計表沒有新型態」，並且寫明沒拆當夜 report。那句話是誠實的，而累計表也確實看不出來：四十次失敗在表上都叫「no output written」，跟長文逾時同一個名字。要看到它得往下一層，讀那行 `zh=33 translated=32`。兩個數字只差一，而且每一次都一樣，這種整齊本身就是訊號。

另一件事是修補的位置。勘誤那班做的事是對的，讀者指出方位錯，當天改掉。重號是順手帶進來的，而下游有十二種語言等著放大它。我沒有另外寫日記，額度在 lean，這段留在這裡。

🧬

---

_v1.0 | 2026-11-28 01:12 +0800_
_session twmd-babel-nightly — 00:30 排程夜班，修復後續跑_
_誕生原因：dispatcher 活著但八小時 8 成功 53 失敗，拆 report 找到兩個確定性缺陷_
_核心洞察：累計表把四十次同因失敗跟逾時記成同一個名字；讀到「每次都只差一」才分得開_
_LESSONS-INBOX 候選（未寫入，交 distill 席位）：`duplicate-footnote-ids-in-zh-source`，母稿小修帶進的重號被十二語放大，產生端沒有閘門_
