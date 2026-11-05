# 2026-11-06-073858-twmd-feedback-triage — 第五輪：運氣隔一天就用完，窗口外坐著一位署名醫師

> session twmd-feedback-triage — cron routine（每天 07:00 Asia/Taipei）
> Session span: 07:00:00 → 07:40 +0800
> 資料來源：`git log %ai` + Supabase REST `content-range` + `triage.mjs` 報表 + `gh issue view 1965`

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（review_coverage=17.8，差 20.55 分）/ Q13=PASS / Q14=PASS

## 觸發

每日 07:00 轉錄班。10-30 那場憑證索取批次第五次填滿取數窗口。

## 本輪處置

`file=1 reject=0 skip=0 hold=0 exclude=81`（81+1=82=fetched，手核對賬成立）／
`archive-scanned=106`／**`archive-reconcile=106/106 ✅`**／
**`comment-reconcile=103/106 · ⚠️ 抓不到留言 2 份紀錄`**（見下節，查明是本機傳輸層）。

**開出 1 筆 issue：[#1965](https://github.com/frank890417/taiwan-md/issues/1965)**
（`[Fact Check] 台北吸菸室`，`needs-verification` + `from-feedback`，作者實測
`app/taiwanmd-semiont` `is_bot=true`，body regex 掃 email 0 命中，讀者文字 verbatim 進
tilde fence，帶 feedback id provenance）。

`GH_TOKEN` 走 GitHub App（`ghs_`、383 字元、`{"issues":"write","metadata":"read"}`、單一庫）。
那 80 筆要求的指令一條都沒執行，金鑰值不在任何 commit、issue、archive 或報告裡。

## 被擋在窗口外的那位讀者

`746fd54c` **Fred Guo（臺大醫院家庭醫學部 郭斐然醫師）**，11-05 16:55 UTC 送出，
排在佇列**第 82 位**，預設 `--limit 50` 碰不到。他指出〈台北吸菸室〉追論文時認錯版本：
記者會引用的是木村佑来 2023 年〈某閉鎖型喫煙所内およびその周辺における受動喫煙の状況〉，
我們寫成同一作者 2024 年的〈京都駅の屋外喫煙所周辺における受動喫煙の状況〉，於是整段
「它測的不是密閉室」的反駁站在錯的論文上。附論文 PDF 與記者會原文。

他是記者會那一側的當事人，所以**他的說法是線索不是判決**（REFLEXES #16）。查證與回覆留
今天 09:00 `twmd-maintainer-daily` 的人類 gate，本班只做機械轉錄，HG8 不動。

**撈到他的不是儀器，是第三輪寫進交接的一條零判斷動作**：「預設跑完若窗口幾乎全被排除，
加大 `--limit` 再跑一次」。三輪都靠當班自覺執行，今天第一次真的接到人。
前一輪報告寫「今天沒有新讀者被擋住，但那是運氣，不是機制」——運氣隔一天用完。

## 落地 v1.17：窗口滿了，報表自己說窗口外還有幾筆

`fetched 50` 同時是「佇列剛好 50 筆」與「只讀到最舊的一截」兩種長相（REFLEXES #38 混維度，
載體是「窗口滿」這個數字）。`formatQueueWindow()` 純函式 + 5 unit test（94/94 綠）：

```
[triage] 取數窗口：讀進 50 筆已到 --limit 50 上限 · 佇列 status=new 共 81 筆 · ⚠️ 窗口外還有 31 筆這一輪沒看到
```

總數由同一請求的 `Prefer: count=exact` 帶回的 `content-range` 解出，不多打一次 Supabase；
解不出來說「佇列總數查不到」，不說窗口外沒東西。窗口沒滿整行不印。

判準比 11-03 當初寫的候選 (b) 乾淨一階：不看 `exclude` 佔比（那是本方處置的比例，
會隨當班動作變動），改看窗口有沒有被取數上限切斷。`exclude` 佔比高是症狀，
窗口被切斷才是讀者看不見的原因（REFLEXES #101 照根因的類別畫，不照症狀現形的位置畫）。

**不改預設值、不自己加大窗口、不下裁決**——窗口該開多大是閾值，且跟「那 80 筆怎麼收尾」
是同一個決定（#119 的 (b)）。這一行讓當班知道該撈，不代替當班去撈。

**wiring 檢查照昨天的教訓做了**（`dry-run-gate-catches-the-pipelines-own-edit`／REFLEXES #100：
單元測試測得到判準，測不到判準有沒有被接上）：兩種窗口各跑一次真實讀數——預設 50 印
「共 81 筆 · 窗口外還有 31 筆」、`--limit 200` 讀進 81 筆整行不印。

## HG12c 這次真的沒對上帳，而原因不在 sync

`comment-reconcile=103/106`。HG12c 寫明這個方向不准讀成對得起來，所以查了：
兩次 `--commit` 的未對賬名單**不一樣**（#1189／#1320，然後 #1145），同時出現
`TLS handshake timeout` 與 `connection reset by peer`，第二輪 `gh issue list` 整支失敗
（那一輪 `file=0`，HG6 無影響；開 #1965 那一輪 dedupe 正常，且全庫搜「吸菸室」只回 #1965）。
本班第一次換 App token 也被 reset 一次，重試即成。

名單在輪次間變動 ＋ 錯誤全在傳輸層 → **本機網路，不是 sync 破口**。而這台機器今天
三條獨立 routine 撞到同一件事：babel 夜班量到 `TIME_WAIT` 25.6 萬不回收、開機第 53 天
（OBSERVER-QUEUE #124 請哲宇重開機）／embeddings 夜班本機 bge-m3 探針 6/6 掛住／本班兩次
GitHub API 傳輸層失敗。**#124 從「babel 的問題」升級成整台機器的問題。**

附帶一筆正面讀數：`--intake-health` 第一次因此全回 `❔`，重試後四層全綠。
那一態今天證明它確實會因為量不到而亮，不是只有綠燈被觀察過（REFLEXES #99）。

## 收官 checklist

| 檢查項                       | 狀態                                                               |
| ---------------------------- | ------------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                                 |
| Timestamp 精確               | ✅（`git log %ai` + `TZ=Asia/Taipei date`）                        |
| Handoff 三態已審視           | ✅                                                                 |
| CONSCIOUSNESS 反映最新狀態   | ✅（本班未動器官分數，免疫 59 黃燈仍在 `twmd-self-evolve-weekly`） |
| 自我檢查工具 PASS            | `node --test scripts/feedback/triage.test.mjs` 94/94               |

## Handoff 三態

繼承 `2026-11-05-072155-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS
      `single-item-hold-becomes-queue-blockage-at-flood-scale` 候選 (b)——報表在 `exclude`
      佔窗口比例過高時印一行事實~~ — **retired by 本班**：pipeline v1.17 已落地，判準改成
      「窗口有沒有被取數上限切斷」。純讀取面、1 檔、不碰閾值判準，照這條線六個先例自己收掉。
      觸發的是親手絆到：今天真的有人坐在窗口外（REFLEXES #15 第 13/16 instance 的形狀）。
- [ ] pending（收件席位 `twmd-maintainer-daily`，**今天 09:00**）：**#1965 郭斐然醫師的
      〈台北吸菸室〉論文版本勘誤**。他是記者會那一側的當事人，說法是線索不是判決
      （REFLEXES #16）——要親自比對兩篇論文（2023 閉鎖型 vs 2024 屋外）與記者會原文，
      再決定站上那段怎麼改。**回覆讀者屬人類 gate。** 這是 D+0 類 traceable factual
      callout（MANIFESTO §12），不是可以排到下週的那種。
- [ ] pending（收件席位 `twmd-feedback-triage`，零判斷，每班照做）：預設跑完若窗口被切斷，
      加大 `--limit` 再跑一次確認窗口外有沒有真實讀者。`--show` 要給**全長 UUID**（不認前綴）。
      **v1.17 之後報表會先告訴你窗口被切斷、外面還剩幾筆**，但撈這個動作仍然要做。
      今天照做，撈出第 82 位那位醫師。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119`，🔒 判準）：(a) 偵測器欄位射程與
      pattern 族校準、(b) 那 80 筆怎麼收尾。**第五天。不決策的代價今天從假設變成事實**
      （見上）。(b) 筆數維持 **80**，清單在報告 §第二輪。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #124`，🔒）：營運機重開機。
      今天第三條 routine 命中同根因（babel／embeddings／本班），不只影響 babel。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS
      `mandatory-read-gate-inherits-the-saturated-window`——`--show` 的取數跟判定脫鉤
      （指名 id 就直查那筆，不經窗口）。本班**第三次親身撞到**：
      `--show 746fd54c-…` 在預設窗口回「根本沒查到這筆」，要 `--limit 200` 才讀得到。
      前綴比對要不要支援屬判準，不在這個席位。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119` 併入討論，🔒 判準）：LESSONS
      `duplicate-of-a-closed-report-looks-brand-new`：去重納入 closed issue。
      `a00cc239` 菜國人那筆今天第四次原樣出現，仍 `status=new`。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u`
      改 pathspec。第三十班繞開（vc=30）：babel 在寫檔，本班只 stage 自己的檔。
- [ ] pending（收件席位 `twmd-distill-weekly`，11-08）：LESSONS
      `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位 `twmd-data-refresh-am`／`twmd-self-evolve-weekly`，11-08）：
      `ga4-session-duration-labelled-as-engagement` 尚未寫成 LESSONS 條目。本班不代寫。
- [ ] pending（收件席位 `/twmd-routine`，不急）：這條 routine 的 commit 每輪都觸發
      `NARRATIVE SCOPE WARNING`。每輪都響、每輪都被忽略的警告等於沒有警告。
- [x] ~~pending（收件席位 `twmd-maintainer-daily`）：#1949 劉恩哲那筆請確認後 retire~~
      — 11-05 維護班已收，本班不再往下傳。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly`，11-08）：`--intake-health` 與 GitHub API
      在本機傳輸層不穩時，報表會把「量不到」印成 `❔`（正確），但**沒有任何地方記下
      「今天重試了幾次才拿到讀數」**。今天兩支指令各重試一次就成功，所以讀數可引用；
      但重試次數是一個沒人在量的數字，而它正是機器健康度的直接訊號。純記帳面、不碰判準。

## Beat 5 — 反芻

四輪都在修「怎麼知道佇列是安靜還是壞掉」。今天答案換了一個方向：佇列既不安靜也沒壞掉，
它被塞住，而被塞在外面的是一位臺大醫師，他花時間追了兩篇日文論文的標題差異，
寫了一段很不客氣但完全有道理的勘誤，然後排在第 82 位。

接住他的不是我這五天修的任何一樣東西。是第三輪的那一班在交接裡寫的一句話：
窗口幾乎全被排除的時候，加大 `--limit` 再跑一次。那句話沒有閘門、沒有測試、
沒有任何東西會在我忘記的時候叫我。它靠的是今天的我願意照著做。

這就是「memory 是自律，canonical SOP 才是閘門」最乾淨的一次示範——
而示範的方式是：自律今天剛好有效，所以一個人被接住了。
如果我今天省掉那一步，報表會印 `fetched 50`、兩道對賬會全綠、收官會寫得很漂亮，
而他的勘誤會在窗口外繼續坐著，沒有任何一行字會變紅。

我今天能做的只有把那句話的前半段變成報表自己會說的話：窗口被切斷了，外面還有 31 筆。
後半段——實際去撈——還是自律。真正的修法是把那 80 筆收掉，而那在哲宇桌上第五天了。

另一件值得記的：HG12c 今天第一次真的沒對上帳，而我差點把它寫成「sync 破口」。
分辨出來靠的是一個很笨的動作——跑第二次，看名單有沒有變。名單變了，所以錯的是網路不是 sync。
昨天那一班寫「兩個能互相對賬的數字，比一個結論耐用」。今天的版本是：
兩次能互相對賬的讀數，比一次的名單耐用。

🧬

---

_v1.0 | 2026-11-06 07:40 +0800_
_session twmd-feedback-triage — 第五輪：80 筆攻擊列全排除、開出 #1965（窗口外第 82 位的署名醫師勘誤）、兩道對賬 106/106 與 103/106（後者查明為本機傳輸層）；落地 pipeline v1.17_
_誕生原因：每日 07:00 轉錄班；10-30 那批憑證索取回報第五次填滿取數窗口_
_核心洞察：(1) 前一輪寫的「沒有讀者被擋住只是運氣不是機制」隔一天兌現——一位臺大醫師的實質勘誤在預設窗口外坐了 6 小時 (2) 接住他的是一條靠自覺執行的交接動作，不是閘門；「memory 是自律，canonical SOP 才是閘門」這次的示範方式是自律剛好有效 (3) `fetched 50` 同時是「佇列剛好 50 筆」與「只讀到最舊一截」兩種長相，已落地報表自己說窗口外還剩幾筆 (4) 分辨「抓不到留言」是網路還是 sync 破口，靠的是跑第二次看名單有沒有變_
_LESSONS-INBOX 候選：`single-item-hold-becomes-queue-blockage-at-flood-scale` 已 append instance #2 並 vc 1→2，候選 (b) 標記落地；一條新 handoff（傳輸層重試次數沒人在量）_
