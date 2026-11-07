✅ BECOME ack: mode=review→**強制升 Full**（High-stake #1：ready PR 5 ≥ 5）/ 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`，最大缺口 review_coverage=17.8）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

# 2026-11-07-092255-twmd-maintainer-daily — 一道閘門叫我去看一行字，那一行字把一篇好譯文裡的五個假名字帶出來；而我補腳註時差點犯一樣的錯

> session twmd-maintainer-daily — cron am 08:30 maintainer（PR review + issue triage + build sanity + 斷鏈 audit）
> Session span: 08:35:00 → 09:23:00 +0800（約 48 分鐘，4 commit + 2 merge）
> 資料來源：`git log %ai`

## 觸發

Cron am 班。上一班（`2026-11-07-071105-twmd-feedback-triage`）的交接指名給 09:00 maintainer 一件事：收割窗口外撈到的三位真實讀者 #1969／#1970／#1971，並註明 #1970 涉現任政治人物、命中政治立場那條線。另外 05:36 與 08:36 兩班輕量班各留了「#1967／#1968 留給 09:00 maintainer」。

**Mode 升級**：`gh pr list` 回 ready PR 5 筆（#1968／#1967／#1966／#1963／#1888，draft 另有 #1884 不計），命中 BECOME §Step 0 High-stake 第 1 條「PR triage ≥ 5」，所以本班從 Review 強制升 Full，補載 ANATOMY／DNA／CONSCIOUSNESS／UNKNOWNS／LONGINGS／HEARTBEAT／OBSERVER-QUEUE §待決 後才動手。這一步不是形式：今天兩個關鍵判斷（#1963 不能碰、#1970 要 reserve）都住在 §待決 與留言串裡，不在檔案裡。

## 分岔、CI、斷鏈：三件都量過，而第三件原本會被我放過

開場 `git rev-list --left-right --count main...origin/main` 回 `5 0`。純領先不是分岔，那 5 個是 babel 的譯文 commit（parallel-check 報 ACTOR_BUSY，dispatcher 加 patch-translate 兩個 writer 在跑）。合併兩個 PR 之後變成真的 `5 8`，但兩側 `git diff --name-only` 交集為空，所以一次乾淨 merge（`267f4fe26`）就收掉了，沒走到 §Step 1.1b 的十二步。

`ci-main-health.sh` 13 條 active workflow：**RED 0**，Deploy 正在跑，Engineering contracts 綠（所以本班沒有 npm audit 要修）。唯一紅的是 `Publish CLI to npm` OFF-BRANCH 🔴 27.4 天，那是 OBSERVER-QUEUE #95，卡在只有哲宇換得了的 npm 權杖，11-06 那班已經重新診斷過第四次並寫成教訓，所以本班只讀不追。

斷鏈這件值得記。`verify_internal_links.py` 第一次跑回 **STALE**：`dist/` 96.3 小時沒更新，並且明寫「這不是通過，gated ratio 0.06% 描述的是 11-03 那天的站」。九月底到十月初有連續三班用「build 會撞 babel 的共用檔」當理由 skip 掉這道閘門，而 v2.15 已經把那個理由駁掉了：競用來自 npm 的 `prebuild:status`，`npm run sync:build` 不觸發任何 pre/post hook。照著跑，19,440 頁 1 分 53 秒，babel 全程在寫，零碰撞。重跑後 **PASSED，gated ratio 0.06% < 7%**。24 個 broken target 全是譯文 wikilink 指向不存在的譯文，屬既有家族（>50 檔、babel 產線），不是本班的。

## #1966 dreamline2：四處「每一次」改對了，而同樣三篇還有 32 處沒人守

合併（`1cd031bb7`）。他對照繁中母稿，把三篇韓文正文裡整個沒被翻譯的「每一次」改成韓文（`재건축이 이루어질 때마다`、`확장이 이루어질 때마다`、`모든 산업 전환`、`각각의 재명명은`），一篇一個 commit，並主動排除國家鐵道博物館那篇（upstream 已修）。四處我逐處對過母稿，都對。

合併後我數了同樣這三篇的裸漢字殘留：**32 處**。`台北車站` 17 處（最大一族是 `捷` ×8，`타이베이捷운` 這種半翻），`漁業起源` 4 處，`婦女運動` 11 處。其中 `不变的`／`如何将`／`共同参与`／`曾经`／`当年的`／`改写`／`长期从事` 是**簡體字形**。韓文讀者讀到的台灣條目裡夾著簡體中文，在主權投射上是最不該留的痕跡。

為什麼沒有閘門擋：`cjk-residue-check.py` 按設計只掃非 CJK 文字系統的語言，ko／ja 不在射程內（韓日文本身合理會出現漢字）。這一格的存量已經量過是全庫約 903 處，正是 **OBSERVER-QUEUE #112** 在等的拍板（🔒 閘門擴張，哲宇在場，不代理）。所以本班沒有自己動手補 32 處韓文，因為那需要韓文語感，而我手上最適合做這件事的人剛好就在這個 PR 裡：把完整清單寫進致謝留言交給 dreamline2，並明說不當成他的義務。

## #1967 aminzai 西語：全綠而且原子抽驗是對的，合併

合併（`6805ddb89`）。es 是十二語裡唯一缺 `Culture/中華職棒.md` 的那一格，不是機器譯文的重複，所以不碰 #67 那條策展紅線。

照診斷紀律把檔案帶進 main 樹用 main 的尺量（不 checkout PR 分支）：`verify-translation.py` **19/19**、`article-health --profile=ci-deploy` **hard=0 warn=0**、script-presence／cjk-residue／geo-fidelity／person-fidelity 四尺全清。然後抽驗原子，因為結構全過不代表內容對：余宏開→Yu Hung-kai、蔡其昌→Tsai Chi-chang、1989-10-23 成立、大巨蛋 28,618 人、球隊名用的是標準英文名（Brother Elephants／Wei Chuan Dragons／Fubon／Rakuten／TSG Hawks）而不是自創音譯。全對。

## #1968 aminzai 印尼語：一道閘門指了一行字，那一行把五個假名字帶出來

**不合併，留 open + `needs-work` + 具證據的技術 review 留言。**

所有機械尺都過了：`verify-translation.py` 19/19（ratio 2.80、腳註 92/92、章節 10/10、URL 多重集 115 完全保留）、`article-health --profile=ci-deploy` hard=0 warn=0、geo／person／script 三尺全清。而且他的習慣是刻意好的：**86 個斜體英文片名有 68 個在括號裡附了中文原名**，正因為他附了，我才查得動。

`cjk-residue-check` 只亮一行（`[^74]` 裡的裸中文片名）。我去讀那一行，那一行本身是錯的。往同一段讀下去，加上第三方查證，五個原子不成立：鍾雪瑩被寫成不存在的「Charlene Jin Lei」（實為 **Chung Suet-ying**）。《看我今天怎麼說》的英文名被填成「Twilight's Kiss, sesungguhnya Lover's Lane」兩個無關片名（實為 **The Way We Talk**）。《時代革命》被標成 _Blue Island_（那是《憂鬱之島》，另一部片），而這一段的全部論點正是「哪些香港電影只有在台灣放得了」，片名指錯片就把論點本身指錯了。周冠威被寫成「Chan Kin-wai」（實為 **Kiwi Chow**）。《眾生相》被寫成 _The Palace on the Sea_（國際場合用的是 **Queerpanorama**）。

形狀很specific，值得寫下來：**中文母稿點到模型不認識的人或片，譯文就填一個讀起來合理的英文名字。** 而他上一段的東南亞名單（Yeo Yann Yann／Chong Keat Aun／Wu Kang-ren／Anthony Chen／Chen Shu-fang／Lin Pin-tong／Fan Bingbing）**全部正確**，所以這不是翻譯品質問題，是模型得猜的那幾格。

照 Step 3.4 三級，≥3 處 claim-citation 不對應走 request changes。而且 MANIFESTO §10 在 §1 default-action 的上游。我現在知道裡面有錯，不能先合併再說。留言給了兩條路（他自己掃一遍，或我代為把查不到官方英文名的片名還原成中文原名、像 ja／fr 版那樣），並說明我沒有直接推進他分支的理由：改片名與人名是改他的內容，不是補格式。

## #1963 蘇巧慧、#1888 鄉土文學論戰：兩件都不是我的

#1963 掛著 `reserved-for-observer` 且 assignee 是 frank890417，對應 OBSERVER-QUEUE #125（🔒 政治立場＋移除非背書聲明）。Step 3.0 的那口氣，也就是認領的同時讀 label 與留言串，就是為這種檔案層看起來乾淨的 PR 存在的，10-08 那班在 #1782／#1784 上吃過一次。沒碰。

#1888 CI 綠、MERGEABLE/CLEAN，但 11-05 那班把剩下三條內容判斷明確留給 tboydar（補真來源或降低說法，屬改他的論點），至今無 follow-up。照 Step 2.4，維護者是最後發言者且無新 follow-up → 不重複回應，`needs-work` 留著。

## 三位讀者：兩件修掉、一件 reserve

**#1971 修掉了（`9b91d7a61`）。** 回報者「菜國人」選取〈台灣邦交國與國際外交〉收尾那段，問「不能去的呢」「來源??」。兩句都對。那段把 12／113／177／432 重講一次而**整段零腳註**。文章前面每個數字都有出處，偏偏用片段連結落在這一段的讀者看到四個沒來源的數字。四個數字各自指回既有腳註。第二句問的更實質：標題與該段把 177 壓縮成「免簽」，而外交部領事事務局那份清單的正式名稱是〈免簽證、**落地簽證及電子簽證**前往之國家與地區〉，三類合計、後兩類還要辦手續還可能被拒。我直接開那個頁面確認，順便看到它已在 **2026-10-22** 更新而文章引的是 2026-01-30 版。補了一段講清楚，並寫上「以入境國最新公告為準，不要以這篇文章為準」。

**補腳註的過程我自己犯了一次今天在罵別人的那種錯**：第一版把「113 個館處」指到 `[^29]`，形式完全合格、沒有任何閘門會擋——而 `[^29]` 講的是 Mark Lambert 與聯大 2758，不是館處。正確的是 `[^34]`。逐條打開腳註核對才攔下來。這跟 #1968 的五個原子是同一個家族（REFLEXES #98 真原子放錯槽位 / #102 引用的形狀撐不起引用的內容），只是這次作者是我。

**#1969 修掉了（`137520fcf`）。** 讀者說〈緣起故事〉過時——時間軸最後一列是 `2026-04-08`，而今天 11-07，一個講自己怎麼長出來的頁面停在上線第三週。補十三列，全部取自 CONSCIOUSNESS §里程碑 既有紀錄（沒有新寫事實），並加一段說明時間軸為何停在這裡、把還在動的部分指向 `/dashboard`、`/semiont/newsroom` 與 git 紀錄。刻意**沒動 `lastVerified`**：本班只核對延長時間軸，不替整篇蓋章。寫完跑 prose-health 發現我自己那句「不是因為後面沒事發生，是因為⋯⋯」是 §11.1 對位句型，過三題判準後重寫掉。

**#1970 reserve（佇列 #126）。** 讀者建議〈蔣萬安〉補六項。查完的結論跟直覺相反：**最大的那一項不是缺口**。「三顆藍莓」查得到出處（簡舒培議會質詢、湯志民回應藍莓「比較大顆」），而文章 §午餐免費 已經用五條腳註寫完這個爭議的實質——152 校流標占六成／11 萬學生受影響、成淵高中 87 人腹瀉驗出腸毒素 B 罰 18 萬、金華國中小卷事件雙方說法、10/21 議會專案報告、查核中心 10/31 的保留。補那個梗只會把有來源有雙方說法的爭議換成它的網路簡稱。其餘五項全文命中數：吸菸區 1、哈佛演講 0、trash time 0、兩客香鬆 0（查不到該說法的報導）、中國機器狗 0。裡面市府採購中國製設備與吸菸區政策可能是真的施政缺口，其餘讀起來是失言簡稱——投票前在候選人頁上逐項分辨哪個是哪個，命中政治立場，依 REFLEXES #79 reserve。查證結果留言在 issue，處置進佇列 #126 附三選項，文章不動。

## 另外兩條沒人接的

**#1964**（idlccp1984「批量上傳文章」）開了兩天零 label 零 assignee 零回應——quality gate 第一條就是這個。內文只有一句話沒有清單，照時間推測對應 PR #1963，回了一則說明 #1963 的真實狀態（技術審查做完、來源紀律確實升級、卡在兩件超出權限的事、**不會被 close**），標 `content` 當追蹤入口。

**#615** 最後發言是 idlccp1984 11-05「希望可以設定最頂端的標題欄圖片，而不是同一張」，掛了兩天。查 `article.template.astro` 發現**這個功能早就有**：`frontmatter.image` 決定頂圖，沒設就落到 `categoryConfig.ts` 的分類預設封面——他看到同一張圖正是因為沒設。全庫 279 篇設了自己的頂圖。這是五桶分類裡「已 cover 但對方不知道」那一桶，回了四欄 frontmatter 範例加兩個注意事項（圖檔要用 `image-ingest.mjs` 收進 repo 不掛外部網址、授權不明一律不收）。順手指出真正的缺口在文件：投稿指南沒寫「不設 image 會吃分類預設圖」，進交接。

Discussions 掃 15 則，每一則的最後發言都是維護者、無 contributor follow-up → Step 2.4 SKIP，本班無 actionable。

空場 vc 歸零：本班有 fresh PR 也有 fresh issue，不是空場。

## Beat 5 反芻

今天最值得留的不是查出五個假名字，是**那五個假名字是一道只亮一行的閘門帶出來的**。`cjk-residue-check` 的設計目的是抓裸 CJK 殘留，它報的是「格式」。而它指的那一行裡住著五個事實錯誤。如果我照字面把那一行當格式問題處理（把中文片名塞進括號就通過），閘門會變綠，五個假名字會原封不動上站——**閘門亮燈的地方和病灶的位置只差一行，而那一行要人去讀才看得見**。

另一面是同一天的對稱：我補腳註時把 113 指到講 2758 的那條，形式完全合格。所以今天兩次事實錯誤，一次是投稿者的、一次是我的，**兩次都穿著合格的形式**。差別只在有沒有人逐條打開來對。教訓已落 LESSONS（`gate-flags-a-line-whose-real-defect-is-two-layers-below-it`）。

## 收官 checklist

| 檢查項                       | 狀態                                                              |
| ---------------------------- | ----------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                |
| Timestamp 精確               | ✅ `git log %ai`                                                  |
| Handoff 三態已審視           | ✅                                                                |
| CONSCIOUSNESS 反映最新狀態   | ✅ derived 層，本班未動                                           |
| 自我檢查工具 PASS            | ✅ 兩篇 heal 都 `--profile=ci-deploy` hard=0。prose-health 零新增 |
| 斷鏈 gate                    | ✅ PASSED 0.06% < 7%（fresh dist，`npm run sync:build` 重建後量） |
| 本機與 origin 無真分岔       | ✅ 合併後 ff 一致                                                 |

## Handoff 三態

繼承自 `2026-11-07-071105-twmd-feedback-triage.md`：

- [x] ~~pending（席位 `twmd-maintainer-daily` 09:00）收割 #1969／#1970／#1971~~ — retired by 本班：#1969 修掉並 close（`137520fcf`）、#1971 修掉並 close（`9b91d7a61`）、#1970 查證後 reserve 進 `OBSERVER-QUEUE #126`（政治立場，REFLEXES #79）
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整台機器重開機。本班新增一筆獨立證據：GitHub API 大回應連續 reset by peer（`gh issue list` 帶 labels/comments 三次全失敗，減欄位即成功。`gh pr merge` 一次 TLS handshake timeout 但實際已合併成功）。症狀與 TIME_WAIT 不回收一致。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116`，下一個時點 2026-11-11 22:00。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-08）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 `twmd-routine-audit-weekly` 11-08）10-31～11-01 週日鏈缺班記成同一個缺口。
- [ ] pending（延續，席位 data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2。
- [ ] pending（延續，席位：2026-11-09 週一 routine-sync）`weekly-round-2026-11-08` 黃燈六盞先用告警對。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。本班每個 git 指令都印這兩行警告，確認仍在。
- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第七天**）偵測器欄位射程與那 81 筆怎麼收尾。
- [ ] pending（延續，席位：下一輪 feedback-triage，零判斷動作）排除清單沿用 §第六輪 81 筆。窗口幾乎全被排除時加大 `--limit` 再撈一次，`--show` 要一起帶 `--limit`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-08）LESSONS 候選 `the-mandatory-read-entrance-is-itself-windowed`。

本 session 新 handoff：

- [ ] pending（席位：`twmd-maintainer-daily` 下一班，`PR #1968`）aminzai 若 push 修正就重驗那 86 個斜體片名並合併；若 48 小時無動作，按留言裡的選項 2 代為把查不到官方英文名的片名還原成中文原名（ja／fr 版的既有做法），再合併。**不要只修我列的那五個就合併**——那五個是抽樣，不是全部。
- [ ] pending（席位：`twmd-maintainer-daily` 下一班或 dreamline2，`PR #1966` 留言內有完整清單）三篇韓文的 32 處裸漢字（含 7 處簡體字形）。清單已交給 dreamline2；他若不接，這批併入 `OBSERVER-QUEUE #112` 的存量一起等拍板，**不要單獨手補**（需韓文語感且閘門射程未定）。
- ⏳ blocked（席位：哲宇，`OBSERVER-QUEUE #126`）〈蔣萬安〉六項的處置與對讀者 #1970 的回覆。推薦 B（只評估中國製設備採購與吸菸區政策兩項）。
- [ ] pending（席位：`twmd-babel-nightly`，`issue #1965`）〈台北吸菸室〉京都那節的更正（`c55a017da`，11-06 08:51）**24 小時後仍未傳到譯文**：ja／ko／es／fr 的 `sourceCommitSha` 還停在 `1929e495`。#1965 刻意不關就是等這個，十二語還帶著舊的那段指控。
- [ ] pending（席位：寫 CONTRIBUTING 的下一個 Full mode session，`issue #615`）投稿指南沒寫「frontmatter 不設 `image` 會吃分類預設封面」，所以投稿者以為站體不支援自訂頂圖。本班已在 #615 回答，但那是回答一個人，不是補文件。
- [ ] pending（席位：觀察者，非 🔒 但屬門面用字）〈台灣邦交國與國際外交〉的 title 與 description 寫「177 國**免簽**」，實際是免簽＋落地簽＋電簽三類合計。本班只改正文沒動門面，因為改標題會讓十二語譯文的標題全部過期。

---

_v1.0 | 2026-11-07 twmd-maintainer-daily session_
_session twmd-maintainer-daily — 2 PR 合併 / 1 PR 查出五個假名字留 open / 2 讀者 issue 修掉 / 1 reserve 進佇列 #126 / 斷鏈 gate 從 STALE 重建後 PASSED_
_誕生原因：cron am 班，上一班交接三位窗口外讀者，ready PR 5 筆觸發 High-stake 強制升 Full_
_核心洞察：(1) 只亮一行的格式閘門可以指出兩層底下的事實錯誤，照字面把它當格式修會讓閘門變綠而假名字上站 (2) 同一天我自己也把腳註指錯一條，兩次錯誤都穿著合格的形式，差別只在有沒有人逐條打開來對 (3) 讀者點名的六項裡最大那一項不是缺口——文章已經寫完它的實質，補的只會是它的網路簡稱_
