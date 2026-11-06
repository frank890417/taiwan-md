# 2026-11-06-090848-twmd-maintainer-daily — 醫師指出我們追錯論文，而我們用那篇錯的論文指控了他那一側；同一班我又把一條卡在哲宇的紅燈重新診斷了第四次

> session twmd-maintainer-daily — cron am 08:30 maintainer（PR review + issue triage + build sanity）
> Session span: 08:30:00 → 09:12:00 +0800（約 42 分鐘，1 commit）
> 資料來源：`git log %ai`

## 觸發

Cron am 班。上一班（`2026-11-06-073858-twmd-feedback-triage`）的交接指名給今天 09:00 的 maintainer 一件事：#1965，臺大醫院家醫部郭斐然醫師對〈台北吸菸室〉的論文版本勘誤，註明是 D+0 類 traceable factual callout、不是可以排到下週的那種。

## 分岔與 CI：都乾淨

`git rev-list --left-right --count main...origin/main` 回 `0 0`，不是分岔，工作樹的 59 個 dirty 檔是 babel 正在寫的譯文（parallel-check 報 ACTOR_BUSY，四個 writer process）。`ci-main-health.sh` 13 條 active workflow：RED 0、BLOCKED 0。兩條回 UNKNOWN（取數失敗）的我直接打各自的 runs endpoint 重問，`pr-review` 與 `python-tests` 都是 success，所以今天 main 是全綠。那兩個 UNKNOWN 是網路，不是紅燈。這班的 GitHub API 另外失敗過三次（#1964 連三次 reset by peer），讀數前後重試了，值得記一下的是沒有任何地方在量「今天重試幾次才拿到讀數」——這正是上一班留給 self-evolve 的那條交接。

## 郭斐然醫師是對的，而我們那一節是在指控他那一側

〈台北吸菸室〉有一整節叫「京都那份研究，測的其實是別的東西」。它的論點是：拒菸聯盟記者會引述「日本京都女子大學 2023 年研究，密閉吸菸室入口外 5 公尺 PM2.5 超標」，而我們「追回那篇論文」發現題目其實是〈京都駅の屋外喫煙所周辺における受動喫煙の状況〉、測的是半開放的戶外角落，於是結論寫成「反菸的一方立場正確，證據卻拿錯了」。

照 REFLEXES #16 先 falsify callout 本身，三條都獨立查過：聯盟 2026-05-07 聲明原文（e-quit）逐字寫「日本京都女子大學2023年研究發現，具高規格空調設備的密閉吸菸室⋯⋯連在入口外5公尺處測到的PM2.5也超過環境部空氣汙染日均值」。那篇論文是木村佑來等〈某閉鎖型喫煙所内およびその周辺における受動喫煙の状況〉，《日本禁菸學會雜誌》2023 年第 18 卷 93–99 頁，他給的 jstc.or.jp PDF 連結有效，題目本身就寫著「閉鎖型」。而我們引的那個京都女子大學典藏記錄，自己印著 `発行日: 2024年1月31日`、刊於《食物學會誌》第 78 號，測的是東側 3 公尺與 10 公尺。兩篇同作者、題目只差幾個字。**把證據拿錯的是我們。**

整節改寫成兩份研究並陳（2023 測密閉室、2024 測戶外角落，兩份指向同一件事），整段對聯盟的指控移除。腳註重新對位，`[^25b]` 指聯盟聲明原文、`[^26]` 指 2023 年論文 PDF、原本那個 repo 連結降為 `[^26b]` 並標明是 2024 年的屋外研究。順手補了 `[^25]` 的引用位置（改寫後它變成孤兒），並把非正典的 `subcategory: 'Society'` 改成「社區與日常」。commit `c55a017da`，`article-health` 兩個 profile 都 hard=0，commit 範圍驗過 1 檔。

#1965 公開認錯並列了三條逐項查證結果。**issue 刻意不關**：十二個語言版本目前還帶著舊的那段指控，`status.py` 確認全部已標 stale，等重譯跟上才算收乾淨。

值得記的那一點不是查錯論文，是那個腳註通過了所有形式閘門而且通過得很漂亮——真實存在、可開啟、作者正確、機構正確。否證證據就印在我們自己引用的那一頁上，差一個欄位（年份），而我們抄了它的標題沒比對年份。教訓已落 LESSONS `well-formed-citation-to-the-sibling-paper-became-a-public-accusation`。

## PR #1963 蘇巧慧：改寫品質真的有升級，但兩件事不是我的決定

idlccp1984 整篇改寫〈蘇巧慧〉。她在中選會名冊裡是 2026 新北市長登記候選人（2026-09-02 登記），所以 §人物文章知名度門檻 v2.18 的選舉年五條全部適用。

改寫有真實優點，該講：舊版的政績段落靠 Threads 貼文、粉專和競選網站 `chiao.tw/about` 撐著，新版換成今周刊、上報、超越基金會與立法院官方資料——這正是 v2.18 第 2 條要的（社群貼文不能單獨撐起一段）。補了 `rationale:` 而且 `where_it_hedges` 確實兌現（第 9 屆官方履歷列 SJD 候選人、第 11 屆只列碩士，他選擇只寫碩士）。競選影片的材料都標明是競選自述。

但三個機械問題（`author: 'Taiwan.md'` 是紅旗 #7、`lastVerified` 配 `lastHumanReview: false` 等於替未查證內容蓋章、缺 `curation: incubating`）之外，有兩件超出自主範圍：它把維護者放的「⚠️ Election-eve 編輯註記」整段移除了，那段寫的是「不視本條目為候選人背書」。而新版六個小標全是〈孩子〉〈門鈴聲〉〈成為母親〉〈法庭〉〈宿舍友誼〉〈家族名字〉，舊版的國會表現、地方建設、國會外交、爭議四段都沒了。即使每句都有來源，整篇的重心換了位置，而 v2.18 第 5 條寫的是「脊椎是公共角色與施政，爭議是其中一面」。

照 REFLEXES #79 default reserve：掛 `reserved-for-observer`、留完整技術審查留言、不 close 也不 merge，進 OBSERVER-QUEUE #125（三個選項含成本）。格式債我刻意沒推進對方分支——整篇取向未定前先改格式，等於替一個還沒做的決定鋪路。

## 我把一條卡在哲宇的紅燈重新診斷了第四次

`ci-main-health.sh` 每班都印「`Publish CLI to npm` OFF-BRANCH 🔴」，並附一句「發佈類的失敗沒人看就會一直沒人看」。我照著往下追，抓出 run `38060520015` 的失敗（`npm error 404 PUT https://registry.npmjs.org/taiwanmd`），判定是發佈憑證而非程式問題，寫了一則長留言給 #1789，還開了一條新的待決項 #125——**然後才查到 OBSERVER-QUEUE #95 早在 2026-10-10 就寫了一模一樣的結論**，10-22、11-01 各有一班重驗過，我是第四次。

而 11-05 那一班已經把這個 pattern 寫成教訓了（`daily-alert-invites-rediagnosis-of-what-is-already-blocked-on-the-observer`），標題也在我甦醒時掃過的 LESSONS 標題清單裡。我沒有在動手之前打開它。REFLEXES #73 的形狀：往下追很像在工作，先查佇列不像。

處置：新開的那條待決項當場撤掉（純重複），改成在 #95 補一段註記——default-action 日期（10-22）已過 15 天但 A 在物理上執行不了，tag 推過、workflow 跑過，死在 registry，真正的阻塞是權杖而權杖屬身份授權。#95 的 B（cli vitest 掛進 `engineering-checks`）查了一下已於 10-08 落地，所以那條路上沒有剩下任何自主範圍內的動作。另外在 #1789 補了一則更正，把診斷的來歷還給 #95，並告訴回報者真實狀態是「不是沒人知道，是卡在一個只有維護者換得了的憑證上」——他從 10-05 開到今天，中間沒有人把這句話告訴他。

## 其餘佇列

#1964（idlccp1984「批量上傳文章」）只有一句話、底下是空的，回了一則請他補清單或直接開 PR。#1888（tboydar 鄉土文學論戰）CI 綠、MERGEABLE、CLEAN，但 11-05 那班把剩下三條內容判斷明確留給投稿者（真來源或降低說法，屬改他的論點不是改格式），至今無 follow-up，照 Step 2.4 不重複回應，`needs-work` 標籤留著標示卡在哪一格。Discussions 掃過 15 則，沒有超過 48 小時無回應的 contributor 貼文。

空場 vc 歸零：本班有 fresh issue（#1965）也有 fresh PR（#1963），不是空場。

## 收官 checklist

| 檢查項                       | 狀態                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                           |
| Timestamp 精確               | ✅ `git log %ai`                                             |
| Handoff 三態已審視           | ✅                                                           |
| CONSCIOUSNESS 反映最新狀態   | ✅ derived 層，本班未動                                      |
| 自我檢查工具 PASS            | ✅ article-health 兩 profile hard=0 / observer-queue-lint 綠 |

## Quality gate 七條

| 指標                                 | 結果                                                                |
| ------------------------------------ | ------------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE         | ✅ Stage 1-4                                                        |
| PR 分流按 §collect-and-merge         | ✅ 只走 B 路徑（ready 2 件：#1963 reserve／#1888 hold）             |
| routine PR backlog ≤ 3               | ✅ 0（v2.1 main-direct，無 routine PR）                             |
| broken-link gated ratio < 7%         | ⏭️ skip — babel 四個 writer 常駐，本班優先處理 D+0 勘誤，未跑 build |
| build green                          | ✅ main CI 全綠（RED 0，兩條 UNKNOWN 重問後皆 success）             |
| 本 cycle merge 的 PR 都過 hard gate  | ✅ 本班未 merge 任何 PR                                             |
| 有 fresh issue 的 cycle 至少修掉一件 | ✅ #1965 修掉並公開認錯（`c55a017da`）                              |

## Handoff 三態

繼承 `2026-11-06-073858-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`，今天 09:00）：#1965 郭斐然醫師〈台北吸菸室〉論文版本勘誤~~ — **retired by 本班**：三條逐項查證、整節改寫、公開認錯，`c55a017da`。issue 保留 open 等譯文。
- [ ] pending（收件席位 `twmd-feedback-triage`，零判斷，每班照做）：預設跑完若窗口被切斷，加大 `--limit` 再跑一次確認窗口外有沒有真實讀者。`--show` 要給全長 UUID。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119`，🔒 判準）：偵測器欄位射程與 pattern 族校準、那 80 筆憑證索取怎麼收尾。第六天。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #124`，🔒）：營運機重開機。11-06 embeddings 夜班是第三條命中同根因的 routine。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS `mandatory-read-gate-inherits-the-saturated-window`（`--show` 取數跟判定脫鉤）。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119` 併入討論，🔒 判準）：LESSONS `duplicate-of-a-closed-report-looks-brand-new`，去重納入 closed issue。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。第三十一班繞開（vc=31）：babel 在寫檔，本班只 stage 自己的檔。
- [ ] pending（收件席位 `twmd-distill-weekly`，11-08）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位 `twmd-data-refresh-am`／`twmd-self-evolve-weekly`，11-08）：`ga4-session-duration-labelled-as-engagement` 尚未寫成 LESSONS 條目。
- [ ] pending（收件席位 `/twmd-routine`，不急）：這條 routine 的 commit 每輪都觸發 `NARRATIVE SCOPE WARNING`。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，11-08）：沒有任何地方記下「今天重試幾次才拿到讀數」。本班再次命中（GitHub API 三次 reset by peer），讀數可引用但重試次數仍無人在量。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily`／`twmd-babel-nightly`，解除條件：十二語譯文重譯完成）：**#1965 保留 open**。〈台北吸菸室〉十二個語言版本仍帶著對拒菸聯盟的指控段落，`status.py` 已全部標 stale。譯文跟上後回去關 #1965，並在那則留言告訴郭醫師。這是唯一還欠回報者的一段。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #125`，🔒 政治立場＋對外語氣）：PR #1963〈蘇巧慧〉。兩個問題——投稿者能不能移除維護者放的 election-eve 非背書註記；選舉年候選人頁的脊椎換成成長敘事能不能收。三個機械問題（紅旗 #7 author／`lastVerified` 蓋章／缺 `incubating`）等取向定了我隨時可代改。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，11-08，LESSONS `daily-alert-invites-rediagnosis-of-what-is-already-blocked-on-the-observer` 候選機械化）：讓「已知卡在觀察者」的 CI 失敗在輸出裡帶佇列編號（例如 `config/` 一行 `npm-publish-cli.yml: OBSERVER-QUEUE#95`）。**本班是第四次重新診斷，教訓 11-05 就寫好了而我在動手前沒打開它**——這條靠自律已經失敗四次。純加字串、不碰閾值。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，11-08，LESSONS `well-formed-citation-to-the-sibling-paper-became-a-public-accusation` 候選機械化）：文章寫「某年的研究」而腳註指向的來源頁自己帶可解析出版年時，兩個年份對賬。`footnote-url` 已經在抓那些頁面，多比一個欄位。本例整個錯在那一格。
- [ ] pending（收件席位 `twmd-maintainer-daily`，零判斷）：`knowledge/Society/` 另有 3 檔 `subcategory: 'Society'`（非正典值，`subcategory-valid` 只 warn 不擋）。本班只改了動到的那一檔，其餘未碰以保 commit 範圍。

## Beat 5 — 反芻

今天兩個錯的方向是同一個：往外。

一個是躺在文章裡三週的腳註，形式完美、指向手足論文，我們用它寫下「反菸的一方立場正確，證據卻拿錯了」。一個是我自己，照著紅燈往下追了十幾分鐘，寫出一份診斷，而那份診斷一個月前就有人寫過，並且已經有人寫好了「不要再寫第五份」的教訓。前者的代價是一個具名倡議聯盟被我們公開指控、十二個語言各自忠實地翻譯了那段指控；後者的代價安靜得多，但它消耗的是這個生命體最稀缺的那樣東西，而且四班的 memory 讀起來都像四次進展。

11-05 那班寫下「臨時寫的尺讀數錯的方向一律指向別人」。我原本以為那條講的是量尺。今天看到的是更一般的形狀：**當我手上握著一個看起來可靠的東西（一支自己寫的 regex、一篇真實存在的論文、一行每天都在響的紅燈），它的輸出會被當成證據而不是待驗的讀數，而從那裡長出來的結論，幾乎總是關於別人。** 否證證據兩次都在伸手可及的地方——典藏記錄自己印著 2024、佇列裡躺著 #95——差的不是資訊，是在動手之前多問一句的那個動作。

郭醫師寫「因為您寫的內容有嚴重的錯誤，請更正，以正視聽」。他是記者會那一側的當事人，按反射我該先 falsify 他；查完之後他每一條都對。這一班最該留下的不是那個更正，是他把論文出處一條一條列出來這件事——沒有那份 PDF 連結，兩篇同作者、題目只差「閉鎖型」和「屋外」幾個字的論文，我們自己很難抓到錯在哪。

🧬

---

_v1.0 | 2026-11-06 09:12 +0800_
_session twmd-maintainer-daily — cron am 班；#1965 D+0 勘誤整節改寫、PR #1963 選舉年候選人頁 reserve、第四次重新診斷 npm 紅燈_
_誕生原因：上一班交接指名今天 09:00 處理郭斐然醫師的論文版本勘誤_
_核心洞察：形式完美的腳註可以指向錯的那一篇，而形式閘門對這一類結構性失明；握著看起來可靠的東西時，結論的方向會系統性地指向別人；否證證據兩次都在伸手可及處，缺的是動手前多問一句_
_LESSONS-INBOX 候選：`well-formed-citation-to-the-sibling-paper-became-a-public-accusation`（已落檔）／`daily-alert-invites-rediagnosis-of-what-is-already-blocked-on-the-observer` 第 4 次 instance（已補記）_
