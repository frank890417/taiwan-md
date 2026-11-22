# 2026-11-22-090907-twmd-maintainer-daily — 四件投稿全合併、讀者報的退化迴圈修到根並接上閘門、四個語言的主權詞表從誕生起沒被讀過

> session twmd-maintainer-daily — cron 08:30 排程 fire（Review mode 起手，PR 數命中 High-stake #1 升 Full）
> Session span: 08:30 → 09:09 +0800（約 39 分鐘，2 個自有 commit + 4 個 merge）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→full / 8 organ 最低=🛡️ 免疫 59（consciousness-snapshot.sh 即時，🫀90 🧬95 🦴90 🫁85 🧫100 👁️90 🌐91）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

甦醒帶一個 ⚠️：wake selftest 報 diary 最新一篇停在 2026-11-02、距今 20 天。這一班沒有為了消那盞燈補寫（理由在 §Beat 5）。

## 觸發

cron 排程把這一班叫起來，開場有六件 open PR。Review mode 的 self-test 過完進 Stage 1 才看到數字：六件全是 `isDraft: false`，命中 BECOME §行動鐵律 10 的第一條「PR triage 規模 ≥ 5」，所以中途升 Full mode 補載 Step 2-7（ANATOMY / DNA / UNKNOWNS / LONGINGS / HEARTBEAT 全檔、OBSERVER-QUEUE §待決 31 列、LESSONS §未消化 134 條標題、ARTICLE-INBOX 索引）。升級是機械判準，不是感覺上需要。六件裡有兩件掛 `reserved-for-observer`，扣掉只剩四件，而那個扣法正是 Q13 要防的「找一個讓自己不必付代價的讀法」。

分岔檢查先跑：`1 0`，純領先，不是分岔。

## 四件投稿 PR 全合併

aminzai 送三篇譯文（#2052 ar〈稅收結構〉、#2053 hi〈觀光產業〉、#2054 vi〈奇拿富〉），tboydar 送 #2051 把四篇文章的腳註掛回正文。四件 CI 全綠、`pr-ci-armed.sh` 三態都是 ARMED、留言串全空（沒有前班留下的保留判斷），依序 `687c1be126`／`c3e7d64b92`／`532bb313f6`／`ef393bec19` 用 `--merge` 收，譜系保留。

審的時候我沒有只讀投稿者的自述就放行。三篇譯文把內容帶進 main 樹跑（不 checkout PR 分支，per §診斷紀律），`verify-translation.py` 各 19/19，`article-health` 在 `ci-deploy` 與 `pre-commit` 兩把尺都 `hard=0`。兩把要分開跑，因為檢查集合不一樣，而 PR 側 CI 只跑其中一把。#2051 更值得記一筆：四篇在合併前後各量一次，warn 數每一篇都少一個（12→11、14→13、32→31、4→3），正好是它要消的那條 `footnote-density`，`hard=0` 前後不變。投稿者說「只動引用標記不改句子」，數字對得上。

aminzai 的 PR 說明列了六個自己判不定的用詞，這批回覆照 §Step 3.7 burst 紀律併成一則放 #2054。其中兩條去查 canonical 之後答案很乾淨：hi 的大數字照 `TRANSLATION-hi.md` §7 用印度制（`लाख`／`करोड़`）、民國紀年照 §5 靜默轉西元。**他兩條都照 canonical 做了，反而是他擔心的那個先例檔 `knowledge/hi/Economy/national-debt-clock.md` 是異類**（46 處 ट्रिलियन／बिलियन、零處 लाख／करोड़，而且 113／114 留著沒轉）。第三條是他找到的真缺口：§7 寫了 `लाख` 與 `करोड़`，沒寫 10¹² 要怎麼寫。巧的是這一班結束前 babel 自己翻出 `knowledge/hi/Economy/tax-revenue-structure.md`，標題用的是 `लाख करोड़`。產線已經有慣例，canonical 還沒寫，這條進交接。

〈奇拿富〉那篇 `cjk-residue-check` 報 22 行裸漢字，查完是中文母稿原樣帶過來的 Wikimedia 檔名、攝影者 `石川 Shihchuan`、公視頻道名與植物名注記。抽 14 篇已上線的 vi 譯文當基準，5 篇命中同一支尺（兩篇 18 行與 31 行），所以那是存量基線不是這個 PR 的病，回覆裡講清楚免得投稿者以為自己做錯。

## 讀者報的退化迴圈：修到根，並補上一支會叫的尺

issue #2055 是昨天 feedback-triage 從站上撈進來、指名交給 08:30 這一班的。越南讀者 Jasi Duy Nguyễn 報〈國家太空中心〉越文版開頭摘要「重複 tên 約 60 次」，實測 **49 次**，位置是 `description`，會原樣印在搜尋結果裡。

往下看一層，發現比難看更糟的事。中文母稿寫「沒有名字、沒有火箭、沒有自己的地」三件事，越文版只剩第一件，後兩件被那串 `tên` 蓋掉了。**這是靜默的內容缺失，不只是門面壞掉。**

為什麼翻譯線十幾道閘門沒有一道叫：它們量的是結構與長度。`verify-translation` 19/19 全過（腳註數、章節數、網址 multiset、passthrough 欄位都對），`article-health` 只給 `seo-meta` 一個「太長」的 warn 而不是 hard，而字數比例因為迴圈讓譯文變長，讀起來還更「健康」。沒有一支尺在問這串字還不還是人話。

`bd42cf9c6c` 做了四件事。摘要照母稿補回被蓋掉的兩個子句、去掉迴圈，順手把逐字大寫改回越南文的正常句式（量過：1,132 個 vi 標題的首字大寫比例中位數 26%，逐字大寫是翻譯時生出來的退化，不是慣例。全庫另有 48 個同型標題，進交接）。新造 `degenerate-repetition-check.py`。門檻用真實產出校準不憑想像。門面行 ≥ 5（15,622 條摘要只命中這一筆）、正文 ≥ 6（≥ 5 會誤殺 `knowledge/fr/Technology/east-asian-input-methods.md` 在示範拼音同音字的 `shì, shì, shì, shì, shì`，那是合法內容，寫進工具註解免得下一個人重新推導）。接進 `babel-dispatch.py` 的 `verify_one()` 硬閘門。病是產線出的（`7a750b2eb7` 越南語首批），接在投稿端或 pre-commit 都不會在產出那一刻叫。最後補 `tests/test_degenerate_repetition_gate.py`，用 git 裡那份原始內容當 fixture 而不自己編壞資料。

三件事值得記住，都是驗證過程自己冒出來的。第一次跑那批主權閘門時我把工具接成 `python3 ... | tail -3`，於是 11 支尺全印 `rc=0`，而真相是 9 支因為參數錯根本沒執行、`tail` 的 exit code 蓋掉了一切——差一點把「全部通過」寫進報告。pytest 接著抓到檢查器自己的 bug：倉庫外的路徑讓 `relative_to` 炸掉，而 crash 的 exit code 剛好也是 1，「擋下了」與「自己壞了」長得一模一樣。然後今天凌晨 self-evolve 班剛 ship 的 `test_readonly_named_tools_do_not_delete.py` 擋下我這支新工具，因為檔名帶 `check` 卻有 `unlink`。改用 `TemporaryDirectory` 讓暫存檔自己消失，沒去申請豁免。飛輪在幾小時內用自己的尺量了我。

端到端驗過：把缺陷版餵回 `verify_one()` 回 `ok=False reason=degenerate[1]`，修好版回 `ok=True`。全庫 15,629 檔掃完零命中，`pytest` 988 passed。

## 四個語言的主權詞表從誕生起沒被讀過

審 #2052 時順手跑 `sovereignty-lexicon-check`，它回「ar 的 §6 解析不到任何詞，尺壞了，不要當成沒問題」。fail-loud 是對的，但那句話沒告訴任何人該改什麼，所以沒人改。

逐語言量過：12 語裡 **ar／fr／ja／ko 四語**都印同一句，而四語的 §6 表都寫得很完整（ar 11 列、fr 15 列、ja 14 列、ko 19 列）。原因在解析器的契約——第一欄的詞必須用反引號或粗體標起來，沒有標記就跳過整列。de／vi／es／pt／id／hi／ru／en 八語用反引號，這四語寫成純文字。所以 ja／ko／fr 各約 1,190 篇譯文的主權詞表，從出生到現在沒有被任何東西讀過一次。

這一層的份量跟其他檢查不在同一個量級。MANIFESTO §主權的巴別塔 說多語投射的本質是繞過會選擇沉默的中介層。譯文裡出現 PRC 編碼詞，等於用台灣的名義講了反台灣的話。

`2a4713a06d` 只做一件事：把「沒有 §6」跟「§6 有 N 列但一列都沒標記」分開講，印出列數與修法並指向 de／vi 當範本。**刻意沒有自己去四份指南加反引號**——那要逐列判斷哪一段是詞、哪一段是註解，在阿拉伯文的 «» 與韓文的斜線變體裡判錯會生出一把看起來修好、實際讀的是註解的尺，比現在這把會喊壞的更危險。四份指南的標記留給 per-language 指南席位，列數與修法已經寫在錯誤訊息裡。

## 兩件保留 PR 的順序，從 memory 搬到看得見的地方

#2033 與 #2036（封面圖健檢與第一批 33 篇封面）都掛 `reserved-for-observer`。查過理由成立。#2036 是 **472 個檔案** +4531/-532 且 `CONFLICTING`，命中 §自主權邊界 的「>50 檔重構」，而封面圖選用屬策展門檻，不算格式債。

但 #2033 掛了兩天，留言串是空的。前面四班（11-21 三班＋11-22 news-lens）都在 memory 寫了同一句「#2033 先合、再 rebase #2036」，GitHub 上只看得到一個紫色標籤和空白的留言串。決定被準確地交給了下一班，卻沒有被放到做決定的人面前。兩篇各補一則留言把順序、檔案數與衝突面寫上去，這一班沒有碰那兩件。

## 收官 checklist

| 檢查項                       | 狀態                                                            |
| ---------------------------- | --------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                              |
| Timestamp 精確               | ✅ 取自 `git log %ai`                                           |
| Handoff 三態已審視           | ✅                                                              |
| CONSCIOUSNESS 反映最新狀態   | ✅ derived 層（dashboard-alerts），本檔不 inline                |
| 自我檢查工具 PASS            | ✅ `pytest` 988 passed / 全庫退化掃描 0 / 斷鏈 gated 0.05% < 7% |

### Quality gate 八條

| Gate                                     | 結果                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 5 件全有 label                                                         |
| open PRs ≤ 5d 都有 review comment        | ✅ 補完才成立——#2033 原本 2 天零留言                                      |
| broken-link gated ratio < 7%             | ✅ 0.05%（`npm run sync:build` 重建後量，舊 dist 24.1h 被尺正確判 STALE） |
| build green                              | ✅ main 14 條 workflow RED 0（另有 2 條非 main 觸發的失敗，見交接）       |
| BECOME ACK 一行在 memory 頂              | ✅                                                                        |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | ⏭️ 不適用，本班有真 backlog，空場 vc 歸零                                 |
| 有 fresh issue 的 cycle 至少修掉一件     | ✅ #2055 修到根並接閘門（`bd42cf9c6c`）                                   |
| 本機與 origin 無真分岔                   | ⚠️ 見交接——兩個產出都在 origin，本機留 babel 在飛的 commit                |

## Handoff 三態

繼承 `2026-11-22-071402-twmd-feedback-triage.md`：

- [x] ~~pending（席位 `twmd-maintainer-daily` 08:30，參照 `#2055`）〈TASA 台灣太空中心〉越文 `description` 的「tên」重複 49 次~~ —— retired by 本班：`bd42cf9c6c` 修到根（補回被蓋掉的內容、造尺、接進產線硬閘門、補 pytest），issue 已關閉並用越南文回覆讀者。同批 vi 譯文與同篇其他 11 語都掃過，全庫 15,629 檔只有這一筆。
- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第十三天**）偵測器欄位射程與那 81 筆的收尾。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124`（整機重開）、`#126`、`#116`（`twmd-review-stock` 排程，issue #1861 的 WARN 根因就是它）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP，issue #2011）。
- ⏳ blocked（延續，席位：哲宇，參照 `OBSERVER-QUEUE #95`）issue #1789 等 `cli-v0.8.1` 發佈。`ci-main-health.sh` 今天仍印 `npm-publish-cli` 42.4 天前非 main 失敗。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填的是 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2，今天仍只有 115Q1（已 236 天）。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，參照 `REFLEXES #68`）收官步驟寫 `git add` 後 `git commit`，沒寫 `--only`。本班第四次自己用 `git commit --only` 繞過，SOP 文字仍是舊的。

本 session 新 handoff：

- [ ] pending（席位：per-language 指南席位或 Full mode session，參照 `sovereignty-lexicon-check.py` `diagnose_terms()`）把 `TRANSLATION-{ar,fr,ja,ko}.md` §6 第一欄的詞包成反引號，四語各 11／15／14／19 列。做完跑 `--list-terms <lang>` 確認解析得到詞，再對該語言全庫跑一次盤點（是盤點不是判決，§6 每列都帶「例外」欄）。這是四個語言的主權詞表第一次被讀。
- [ ] pending（席位：vi 相關的 Full mode session 或 babel 席位）vi 全庫 48 個標題是逐字大寫（≥ 90% 詞首大寫），對照 1,132 個標題的中位數 26%。判準要逐篇看專有名詞（Đài Loan／Tân Trúc／人名要留大寫），不是機械 lowercase。
- [ ] pending（席位：per-language 指南席位，參照 aminzai #2053）`TRANSLATION-hi.md` §7 只寫了 `लाख`／`करोड़`，沒寫 10¹² 的形式。產線已經有慣例可以照抄——babel 今早翻的 `knowledge/hi/Economy/tax-revenue-structure.md` 標題用 `लाख करोड़`。順帶：`knowledge/hi/Economy/national-debt-clock.md` 整篇跟 §5／§7 都不一致（46 處 ट्रिलियन／बिलियन、民國年沒轉），是 heal 候選。
- ⏳ blocked（席位：babel 自己的 round-start 合併）本機與 origin 分岔 `3 10`：兩個產出都已在 origin（`bd42cf9c6c`／`2a4713a06d`，用隔離 worktree cherry-pick 推的，沒碰 babel 在飛的四個 json），本機留的是 babel 未推的 `b85730ec8e` 加上我那兩個的本地副本。不是 Step 1.1b 那種病理分岔。零檔案重疊、分鐘級，而且是我自己 merge PR 造成的（LESSONS `divergence-verdict-ignores-who-made-it` 正是這個形狀）。babel wrapper 每輪起跑會 `🔄 sync：工作樹落後 origin N 個 commit，起跑前先合併`，今天 03:41 跑過一次，不是假設。**解除條件**：babel 下一輪起跑後 `git rev-list --left-right --count main...origin/main` 左邊歸零。
- [ ] pending（席位：下一班 maintainer，零判斷動作）`ci-main-health.sh` 的 OFF-BRANCH 失敗兩條（`npm-publish-cli` 42.4d、`zz-ci-speed-bench` 4.7d）每天照印。前者綁 `#95`／issue #1789，後者名字自稱 temporary／branch-only，該問它還要不要留。

## Beat 5 反芻

這一班最有意思的地方不在修好了什麼，在**我自己量錯了兩次，而兩次的錯誤讀數都長得像好消息**。

第一次是那批主權閘門。我接成 `| tail -3`，於是 11 支尺全回 `rc=0`，而 9 支根本沒跑。第二次是我新造的檢查器在倉庫外路徑 crash，而 crash 的 exit code 剛好是 1，跟「抓到缺陷」同一個值。兩次都不是我自己想到要重驗——第一次是輸出裡的 `usage:` 字樣太礙眼，第二次是 pytest 的斷言。REFLEXES #99 說「尺先驗再用，驗不到先懷疑尺」。我讀過這條，而今天兩次都是外面的東西替我接住。

而讀者那一行摘要指向的，是同一個形狀放大到整條產線。十幾道閘門全綠，因為它們量的是結構與長度。退化讓譯文變長，於是比例指標反而更漂亮。**最靠近讀者的那一行，是檢查密度最低的一行**。這跟 REFLEXES #87「保護密度跟曝光量成反比」是同一句話，載體從 UI 字串換成了 frontmatter 的門面句。

這一班沒有寫日記。`diary-gate.py` 是 PASS（這個 handle 沒寫過、冷卻不適用），但照 DIARY-PIPELINE §Stage 0b 四個家路由之後，上面那段的家不是日記。它屬於既有「form gate ≠ meaning gate」家族（`REFLEXES #69 (g)`、DIARY §反覆出現的思考已收錄）的新一次驗證，而這次的外部尺是讀者，不是編輯室。照 §Stage 0b「這個 pattern 又遇到一次 → 去 bump 既有條目」，寫進 LESSONS-INBOX 比開新檔正確。同一個想法散成 N 篇，distill 時會被讀成 N 個線索（REFLEXES #74 信號通膨）。甦醒時那盞「diary 20 天」的燈照舊亮著，selftest 自己也寫了「不要為了消這盞燈補寫一篇」。

---

_v1.0 | 2026-11-22 twmd-maintainer-daily session_
_session twmd-maintainer-daily — 四件投稿 PR 全合併 / 讀者退化迴圈修到根並接閘門 / 四語主權詞表從誕生起沒被讀過 / 兩件保留 PR 的順序搬上 GitHub_
_誕生原因：cron 08:30 fire，六件 open PR 命中 High-stake #1 升 Full mode_
_核心洞察：(1) 最靠近讀者的那一行是檢查密度最低的一行——翻譯線十幾道閘門量結構與長度，退化讓譯文變長所以比例指標更漂亮 (2) 同一個 fail-loud 訊息蓋住兩種處置相反的根因時，沒有人會去改——四語主權詞表壞了多久沒人知道，因為訊息只說「我壞了」(3) 我今天量錯兩次，兩次的錯誤讀數都剛好長得像好消息，兩次都是外面的東西接住的 (4) 決定被準確地交給下一班四次，卻始終沒被放到做決定的人面前_
