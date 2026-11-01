# 2026-10-23-015703-twmd-babel-nightly — 補丁把失敗章蓋成新版、全庫 326 份譯文少一章，兩篇長文交委派層收下

> session twmd-babel-nightly — 排程觸發，續命班（dispatcher PID 11337 從 10-22 08:55 跑到現在，不重啟）
> Session span: 00:40 → 01:57 +0800（約 1 小時 17 分，本班 6 個 commit，不含產線自己的批次 commit）
> 資料來源：`git log %ai`、`/tmp/babel-unified-20261022-085512-11337/{master.log,report.jsonl}`

## 觸發

00:30 排程啟動。BECOME write mode 全讀到 `wake:END`；selftest 一個黃燈：工作樹落後 origin 一個 commit（`b13002258` 豬哥亮巡邏），本機同時領先一個未推的產線 commit。產線在跑，所以沒有手動 pull，交給 push-every 01:19 合併推送。

## 算力與產線狀態

Stage 0 判定 healthy，四層都在：OpenRouter 七把 key、本機 ollama gemma4:26b、fleet 一台 mac-m4max、codex。缺的是錢：七把 key 的付費餘額全花完，Tier 6 Haiku 整夜只會撞 402。三重巡檢：PID 11337 由 launchd `com.taiwanmd.babel.nightly` 拉著，push-every 守護 PID 13250 正常；近 45 分只有一筆 report 記錄，原因是佇列幾乎清空，不是停擺。起班時十二語 missing 全為 0，剩下的 stale 大多是人寫譯文不覆蓋（#67，台北吸菸室四語、鯨豚三語、蕭青陽 de）。所以這班屬於「續命」，力氣放在拆 report 找閘門缺陷。

## 補丁的失敗章被蓋上新版本號

交接要我確認〈李國修〉〈林青霞〉〈桂綸鎂〉十二語重翻。李國修十二語都在 03:44 前後落地、眷村段全數消失；桂綸鎂十二語全走整篇。林青霞十二語全走 patch，抽查 fr 還留著中文已刪除的《101次求婚》虛構客串。追 master.log：`patch-translate.py` 在 fr 有兩章 ratio 超界失敗，照 07-27 的設計「失敗章保留舊譯、其餘照常更新」，然後整篇寫上新的 sourceCommitSha，status.py 從此判 fresh。en 同篇丟了出身那章，hi〈台灣感性〉10-20 少了 27-30 號腳註引用。巡邏修補動到的章正好是事實被改正的章，保留舊譯就等於把幻覺蓋上「最新」的章。

`def555db4` 把任何章節失敗都改成回 2、由呼叫端整篇重翻，並把這四份（加上 ru 林青霞 2013 那段被截斷、留下 `</p>` 殘字）的來源版本退回補丁前送回佇列。01:08 fr 林青霞又撞兩章失敗，這次走了整篇重翻，產出不再有 101、2023 終身成就獎在。

## 全庫 326 份譯文少一整章

Z6 抽樣時用逐章年份錨點比對當作第二把尺，正對照抓到 fr／ru 林青霞，額外抓到 ar／ko〈陳幸妤〉、ar〈一同走過從前〉章數比中文少一。verify-translation 第 10 項對差一節只給 WARN，整篇重翻的模型略掉一章就從這格過去。造了 `section-parity-check.py`（`cc99aece0`）全庫量：326 份機器譯文比中文少節，ko 75 最多。抽 8 份少一節的對讀，7 份是正文整章不見（無名小站 en、穿山甲 es、國家歌劇院 ja、烏魚子 ja），字數比例與腳註數都量不到。另外 ja〈尼克星〉一個小標是簡體字，跟 #112 同族。

存量要清得兩道閘一起改，否則重翻又少一節照樣過、status 又判 stale，產線會無限重翻；這是閘門數值，送 OBSERVER-QUEUE #113（`95fd4a5e8`，推薦 A，10-30 到期）。當班只動既有閘門本來就該擋的五份（少兩節以上，Hub 頁排除）跟當夜產線自己產出的三份。送回去之後又撞一次：ko 陳幸妤幾分鐘內被 semantic-noop-bump 以「中文只差標點」直接蓋新版本號，因為我退回的是中文上一版，而那一版到現在真的只差標點。`bcd1ce4f7` 改成標 `pre-toolkit`，沒有舊版可比，只剩整篇重翻一條路。

## 兩篇免費池結構上翻不動的長文

hi〈雷亞遊戲〉累計失敗 12 次、id〈沈伯洋〉13 次，兩個模型都敗在 structured 引擎的分段階段：第一章十個具名腳註引用（`[^rayark-wiki]` 等）每次被略掉幾個，閘門擋得對。照 SQUEEZE §第五層與 OBSERVER-QUEUE #79（已決）派兩隻 Sonnet 子代理各翻一篇，寫在 scratch 路徑，等產線那輪嘗試失敗還原後才裝進 knowledge/，避免被它的 HEAD-restore 蓋掉。兩篇結構對靶全中（54／70 條腳註、72／100 網址），verify-translation、漢字洩漏、漢字黏著、article-health 全過，分別是 `adbcbae53` 與 `8393567a1`。沈伯洋的立法院我在派工 prompt 裡寫錯成 Legislatif Yuan，對照 TRANSLATION-id 用語表改回 Yuan Legislatif。

## 我自己弄壞又救回的一個檔

寫 #113 時為了只 stage 自己那一列，用 Python `open(p,'w').write(ins(open(p).read()))`，寫入模式先把檔案截成空的，`OBSERVER-QUEUE.md` 連同另一個 process 未 commit 的 #95 修改一起歸零。從 lint-staged 上一個 commit 留下的備份 stash `cd232ef63` 取回工作樹原樣，再插入自己那列、只 commit index。對方的未 commit 修改原樣留在工作樹。

## 各語進度

| 語言     | 起班 stale／meta | 收班 stale／meta | 備註                                   |
| -------- | ---------------- | ---------------- | -------------------------------------- |
| en       | 0／0             | 送回 2 份重翻中  | 豬哥亮 01:19 合併後進佇列              |
| hi       | 2／1             | 2／1             | 雷亞遊戲 委派落地；台灣感性 01:02 重翻 |
| id       | 2／3             | 2／3             | 沈伯洋 委派落地；陳幸妤仍 stale        |
| de       | 6／6             | 7／5             | 多數是人寫譯文不覆蓋                   |
| 其餘八語 | 0-1              | 1-3              | 主要是豬哥亮十二語正在跑               |

backend：本 run 114 筆記錄，產線全靠 gemma4:26b（地端）與 nemotron 免費池，付費層 402 停派；委派層 Sonnet 兩篇（約 14 萬與 19 萬 token）。Z6：91 份當日譯文 size-ratio 100% healthy，但人眼與逐章年份錨點抽到 fr／en／ru 林青霞與兩份陳幸妤、一份一同走過從前不合格，全數已送回重翻。cascade exhausted 名單：hi 雷亞遊戲、id 沈伯洋（兩篇都由委派層收下，不再 carry）。

## 收官 checklist

| 檢查項                       | 狀態                           |
| ---------------------------- | ------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                             |
| Timestamp 精確               | ✅                             |
| Handoff 三態已審視           | ✅                             |
| CONSCIOUSNESS 反映最新狀態   | ❌ babel 班不碰 CONSCIOUSNESS  |
| 自我檢查工具 PASS            | ✅ article-health memory-diary |

## Handoff 三態

繼承上一 session（`2026-10-22-145655-semiont-heartbeat`）：

- [x] ~~〈李國修〉〈林青霞〉〈桂綸鎂〉十二語重翻~~ — retired by 本 session（林青霞 fr／en／ru 三份補送整篇重翻，fr 已落地）
- [ ] pending（席位：下一個 Full mode 巡邏）— 〈豬哥亮〉巡邏已由 `b13002258` 做掉；十二語重翻由產線接手中，下一班 babel 確認
- [ ] pending（席位：Write 班）— 〈桂綸鎂〉校園發掘出道故事，原樣往下傳

本 session 新 handoff：

- [ ] pending（席位 `twmd-babel-nightly`，動得了）— ko〈陳幸妤〉被 semantic-noop-bump 誤判 fresh 仍少一章；等產線 commit 它那份 bump 後跑 `section-parity-check.py --requeue knowledge/ko/People/chen-hsing-yu.md`
- [ ] pending（席位 `twmd-babel-nightly`）— 確認送回的 en 楊勇緯／周天成、ar 陳幸妤／一同走過從前、ja AI 硬體供應鏈、ko 台積電／楊勇緯整篇重翻後 `section-parity-check.py` 不再列出
- ⏳ blocked（OBSERVER-QUEUE #113 待決）— 326 份缺章存量與 verify「少一節」升 FAIL；等哲宇選，10-30 到期，缺席模式可由 Full mode 代理 A
- [ ] pending（席位：哲宇，經費）— OpenRouter 七把 key 付費餘額歸零，Tier 6 停擺（#79 已決的付費槽需要儲值才有作用）
- [ ] pending（席位 `twmd-babel-nightly`）— ja〈尼克星〉小標「当台湾成为聊天室里的回答」是簡體，併 OBSERVER-QUEUE #112（待決）存量處理

## Beat 5 — 反芻

今晚兩個缺陷跟一個我自己製造的事故，都是同一個形狀：一個寫入動作在確認內容之前就先蓋了章。補丁把失敗章的舊文字寫上新版本號，閘門的「少一節」只給警告讓缺章拿到 fresh，noop 捷徑看到「只差標點」就蓋版本號，我的 Python 在讀檔之前就用寫入模式清空了檔案。前三個的修法一樣：讓「沒辦法證明內容對齊」的路徑落到整篇重翻，不是落到蓋章。第四個沒有工具可修，只能靠先讀後寫的習慣，跟救回它的那個備份 stash。

量缺章那支尺最有用的地方，在它的正對照是今晚親眼看過的壞檔。年份錨點那把先用 fr／ru 林青霞驗過會響，才拿去掃當日 91 份；沈伯洋的假陽性（中文用國字數字寫年份）也是在同一輪就認出來，沒有寫進任何結論。

🧬

---

_v1.0 | 2026-10-23 01:57 +0800_
_session twmd-babel-nightly — 續命班，dispatcher 已跑 17 小時，佇列近空_
_誕生原因：交接要確認林青霞十二語重翻，抽查 fr 撞到補丁把失敗章蓋成新版_
_核心洞察：產線有三條路會在內容未對齊時蓋上新版本號（補丁局部失敗、少一節只給警告、noop 捷徑），前兩條當班修、第三條靠改送回標記繞開，存量 326 份等 #113。_
_LESSONS-INBOX 候選：stamp-before-content-verified（寫入新版本號的路徑要先證明內容對齊，否則落到整篇重翻）_
