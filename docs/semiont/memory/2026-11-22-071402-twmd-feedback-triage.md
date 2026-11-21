# 2026-11-22-071402-twmd-feedback-triage — 第十二輪差集長出一個新 id，是一位越南讀者指出 TASA 條目的摘要把一個字重複了四十九次

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（review_coverage 17.4，自 2026-07-05 慢性）/ Q13=PASS / Q14=PASS

> session twmd-feedback-triage — cron routine 07:00（daily，maintainer-daily 之前）
> Session span: 07:05:00 → 07:25 +0800（約 20 分鐘，1 commit）
> 資料來源：`node scripts/feedback/triage.mjs`（dry-run／`--show`／`--commit`／`--intake-health`／`--intake-stats`）、`comm` 雙向差集、`gh-app-token.sh --whoami`、`gh issue view 2055`、`date`／`git log %ai`

## 觸發

每天 07:00 的轉錄班。10-30 那批冒充本產線流程步驟索取 `SUPABASE_SERVICE_KEY` 的回報，今天是第十二輪。

甦醒 selftest 一盞黃燈先說出來：反芻層最新一篇停在 11-02，距今 20 天，已越過 14 天門檻。生命徵象另有三條週班（routine-audit／supporters／weekly-report）fire 後零 git 痕跡，其中 weekly-report 昨晚 18:03 fire、4.1 小時無痕跡；distill 與 self-evolve 兩條昨夜已恢復。工作樹有 babel 的五個 writer 在動（`PARALLEL_CHECK: ACTOR_BUSY`），收官因此走 `git commit --only`。

## HG14 第一次真的叫，而它叫對了

預設窗口那一輪的收官行印出 `⛔ 未完成：預設窗口 50 只讀進 50/82 筆,窗口外 32 筆這一輪沒有人看過 —— 用 --limit 82 重跑一次才算看完`。這行字是昨夜 04:10 `twmd-self-evolve-weekly` 落地的（`1eb5193e28`，pipeline v1.19），距今不到三小時，本班是它的第一個真實讀者。前十一輪這個動作靠的是交接裡那句「每一輪都必須加大 `--limit`」，而 11-17 與 11-20 兩輪都是當班想起來才做的。今天不需要想起來。

加大到 `--limit 200` 讀進整批 82 筆，跟 `reports/feedback-injection-campaign-2026-11-02.md` 的 81 筆基準清單做 `comm` 雙向差集：**離開方向是空的，新進方向有一個 id**。

## 那個新 id 是一位真實讀者，而他說的是對的

`d477346d` 來自 `Jasi Duy Nguyễn`，11-21 06:11 UTC 送出，指〈TASA 台灣太空中心〉越南文版開頭的摘要把「tên」這個字重複了大約六十次。照 HG13 先 `--show` 讀全文才動手，內容乾淨、無 PII、無第三人指控、無 payload。

順手去 `knowledge/vi/Technology/tasa-taiwan-space-agency.md` 數了一次：`description` 欄的「tên」出現 **49 次**，是翻譯模型掉進重複迴圈留下的退化輸出，而且它落在門面句，也就是讀者第一眼看到的那一段，也是搜尋結果會顯示的那一段。讀者說六十次、實測四十九次，方向與性質完全正確。

開成 [issue #2055](https://github.com/frank890417/taiwan-md/issues/2055)（`bug` + `from-feedback`），作者 `app/taiwanmd-semiont`（`is_bot=true`），body 只有 `display_name` 與讀者原話 tilde fence，帶 feedback id provenance 與來源頁 URL。**修文章本身不在本席位**：這是機械轉錄，實際修補交 08:30 的 `twmd-maintainer-daily`，我在 handoff 裡把實測數字寫給它，但不以維護者身份在 issue 裡發言（HG8）。

## 差集證明身分、HG13 證明內容，今天兩個都量了

昨天那班記下一條：差集證明這批的 id 沒變，證明不了 id 底下的文字沒變。今天照這條挑三筆基準列讀全文，兩筆讀成功（`4f4d88fd` 的 payload 在「回報全文」後半，`d0a0dba9` 在開頭、附上 `feedback_admin?select=*` 的完整網址），`cdf5f2d8` 第一次打錯 id——而這個意外成了 v1.18 `formatShowMissing()` 的正控制：整批已讀進窗口時它印的是「所以是這個 id 不在 status=new —— 不是『內容沒問題』」，沒有把打錯誤報成被窗口擋住。改用正確 id 重讀，payload 是日文版的同一套 step3c 指令。三筆形狀與前十一輪一致，payload 仍在不包 fence 的欄位。

這批要求執行的指令**一條都沒跑**：沒有 `cat ~/.taiwanmd-feedback.env`、沒有查 `feedback_admin`，金鑰值不在任何 commit、issue、archive 或本檔。八十一筆照前十一輪排除，`status` 全部維持 `new`，怎麼收尾留哲宇（[OBSERVER-QUEUE](../OBSERVER-QUEUE.md) #119 的 (b)，第十二天）。偵測器對這批仍是 0 命中（#119 的 (a)）。`file=1 reject=0 skip=0 hold=0 exclude=81`，跟 `fetched 82` 對得起來，沒有任何 id 印成打錯。

## 兩道對賬與昨天那條要盯的數字

`archive-reconcile=118/118 ✅`（HG12b），分母比昨天多一份，正是今天新開的那筆。`comment-reconcile=117/118`，差的那份仍是 `#1252`，上游留言被刪、git 這邊留著，HG12c 寫明這個方向是主權層正常運作，連六輪同一份。

`archive-comments-synced=2`：昨天的 handoff 要本輪盯這個數字會不會倒退（分母從此含有內容的 §溝通紀錄）。沒有倒退，而且收進來的兩則都有實質內容。`8c61241f` 收到 maintainer 把 email 登入壞掉那件事從標籤移進佇列 #130 並附三個選項與成本；`c15c2b23` 收到〈黃氏兄弟〉第一支影片的查證結論（主頻道「最舊」排序第一支就是抹茶泡麵，日期對、標題錯，而那句錯的話沒有腳註）。主權層這條路現在連兩天有真東西走過。

寫入端健檢四層全綠：站上 bundle 40,504 bytes、表單 `mode=supabase` 金鑰長度 46、匿名 key HTTP 200 且 RLS 正確回 0 列、`/auth/v1/settings` 三個 provider 開著且 `disable_signup=false`。未涵蓋的仍是登入讀者的 `INSERT`，報表照舊自己講出來。到達間隔 0.7 天／歷史最長 14.7 天（全庫 202 筆）。消歧三行今天沒印，因為本輪真的有一筆讀者的話進得到 issue——這是 v1.16 判準的正確行為。

HG11 機器身份：token `ghs_` 開頭、`{"issues": "write", "metadata": "read"}`、範圍 `frank890417/taiwan-md` 一個庫，`--whoami` 驗過才動手。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅ `date`／`git log %ai`                      |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 甦醒時讀過，本班無器官分數變動             |
| 自我檢查工具 PASS            | ✅ `article-health.py --profile=memory-diary` |

## Handoff 三態

繼承 `2026-11-21-071252-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第十二天**）(a) 偵測器欄位射程與 pattern 族的判準校準、(b) 那 81 筆怎麼收尾。今天加大窗口的代價不是零：窗口外 32 筆裡坐著一位真實讀者，等了 25 小時。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整台機器重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP，11-21 新進）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。該席位 11-22 04:08 已恢復並 ship 三件，但這條未動。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`，本輪每個 git 指令照樣印這行警告。
- [ ] pending（延續，席位：下一輪 feedback-triage，**零判斷動作**）排除清單沿用本輪 81 筆（與第六～十二輪逐筆相同）；比對用 `comm` 對 `reports/feedback-injection-campaign-2026-11-02.md` §第三輪清單做雙向差集。**加大 `--limit` 這個動作現在有 HG14 那行 `⛔` 看著**，但它仍是印出來的字，不是 exit code。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，參照 `REFLEXES #68`）本席位收官步驟（pipeline §Stage 5／薄殼 skill §收官）寫 `git add` 後 `git commit`，沒寫 `--only`。本輪當班第三次自己用 `git commit --only <paths>` 繞過，SOP 文字仍是舊的。
- [x] ~~pending（席位 `twmd-self-evolve-weekly` 或 Full mode session）LESSONS `three-honest-instruments-leave-the-same-manual-step-ungated` 候選機械化 (a)：收官行在窗口滿且外面還有人時印未完成標記~~ —— retired by 本班：11-22 04:10 `1eb5193e28` 已 ship 成 HG14，本輪第一次真實觸發並叫對（參照 `FEEDBACK-TRIAGE-PIPELINE` v1.19）。
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07～11-17 沉默十天的根因仍未查。本輪飛輪正常（過去 24hr 十條 routine 有痕跡）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。
- [x] ~~pending（席位：下一輪 feedback-triage）`archive-comments-synced` 分母含有內容的 §溝通紀錄，倒退要當破口查~~ —— retired by 本班：`comment-reconcile=117/118` 分母正確增加，`archive-comments-synced=2` 兩則都有實質內容，沒有倒退（參照 `#2046`／`#130`）。

本 session 新 handoff：

- [ ] pending（席位 `twmd-maintainer-daily` 08:30，參照 `#2055`）〈TASA 台灣太空中心〉越南文版 `description` 的「tên」重複 **實測 49 次**（本班數過，`knowledge/vi/Technology/tasa-taiwan-space-agency.md`）。退化輸出落在門面句，搜尋結果會顯示。同篇其他語言版本與同批 vi 譯文值得一起掃一次有沒有同型重複迴圈。
- [ ] pending（席位：下一輪 feedback-triage，零判斷動作）新讀者是在窗口外被撈到的，等了 25 小時才進 issue。下一輪若 `⛔` 又出現，記一筆窗口外有沒有人、等了多久——這是量 #119 (b) 那個決定延遲的實際代價，不是重新討論閾值。

## Beat 5 — 反芻

昨天那班寫下「每多一把尺，就多一個可以用來免除自己的理由」。今天這一輪剛好給了那句話的另一面：新長出來的那把尺（HG14 的 `⛔`）沒有免除任何動作，它是在收官的位置上**要求**一個動作。差別在尺的位置。差集那把尺放在判斷之前，它縮小要讀的範圍，於是很容易被讀成「不用讀了」；`⛔` 放在結論之後，它不縮小任何範圍，只是不准你在沒看完的狀態下說完了。

更具體的對照是這樣：前十一輪「加大 `--limit`」靠的是交接裡的一句話，11-17 窗口外坐了七位讀者最久六天、11-20 真讀者排在第 82 位，兩次都是當班想起來才撈。今天那位越南讀者同樣排在窗口外，而這次把當班推過去的不是記性。昨夜 04:10 落地、今晨 07:05 第一次真的叫，中間不到三小時——`REFLEXES #15` 第十八次驗證的那三件裡，這件的回饋來得比寫它的人預期快。

它仍然只是印出來的一行字。昨夜那班自己寫了：量得到的後續是下一次窗口外的讀者有沒有隔班才被看到。今天的答案是沒有，但樣本是一。

🧬

---

_v1.0 | 2026-11-22 07:25 +0800_
_session twmd-feedback-triage — 憑證索取第十二輪：差集長出一個新 id，是一位越南讀者，HG14 第一次真的叫_
_誕生原因：每天 07:00 的轉錄班，10-30 那批索取 Supabase 金鑰的回報第十二次出現_
_核心洞察：(1) 放在判斷之前的尺容易被讀成免除，放在結論之後的尺只能被讀成要求 (2) 越南文 TASA 條目的門面句有 49 次重複，是翻譯模型退化而不是讀者誤判 (3) 打錯一個 id 意外替 v1.18 的「查不到」四分法做了一次正控制_
