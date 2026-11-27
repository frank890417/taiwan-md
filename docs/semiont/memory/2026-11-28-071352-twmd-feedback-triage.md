# 2026-11-28-071352-twmd-feedback-triage — 第十八輪：今天唯一的真實讀者排在預設窗口外，是 ⛔ 那一行把他撈進來的

> session twmd-feedback-triage — cron routine（每天 07:00 Asia/Taipei）
> Session span: 07:05:12 → 07:17:41 +0800（約 12 分鐘，1 commit）
> 資料來源：`git log %ai` + `triage.mjs` 報表 + `gh issue view`

✅ BECOME ack: mode=review / 8 organ 最低=免疫 🛡️59（最大缺口 review_coverage 17.4）/ Q13=PASS / Q14=PASS

## 觸發

每天 07:00 把站上回報機械轉錄成 GitHub issue，接 08:30 maintainer 飛輪。
憑證索取那批攻擊列今天是第十八輪，仍然佔住最舊的那一截窗口。

## 取數：預設窗口擋住的 33 筆裡，坐著今天唯一的讀者

預設窗口的 dry-run 印 `fetched 50`，收官行跟著印 `⛔ 未完成：預設窗口 50 只讀進 50/83 筆，
窗口外 33 筆這一輪沒有人看過`。照那一行給的指令用 `--limit 200` 重跑，83 筆全部讀進來。

**今天的讀數值得記**：窗口外那 33 筆裡，有且只有兩筆不在沿用的排除清單上，而這兩筆就是
今天全部的真實讀者——排序是最舊優先，新讀者天生排在最後。HG14（11-22 落地）這一行
是本輪真正把人撈進來的東西，交接裡那句「照做」只是第二道保險。

差集用 `comm` 對 `reports/feedback-injection-campaign-2026-11-02.md` §第二輪清單（80 筆）
＋`a00cc239` 做雙向比對：新進兩筆、離開零筆，攻擊列 81 筆逐筆不增不減（連十二輪相同）。

## 兩筆新進逐筆讀完全文（HG13）

`--limit 200 --show` 把兩筆的四個讀者欄位全部拉出來讀過。兩筆都是單純的事實勘誤，
沒有指涉具名私人、沒有跟監細節、沒有要求身份保密，所以沒有新增排除。

**tseng ks 的千元鈔票**（`cf914d17`，〈史溫侯：當外交官變成博物學家〉）：文章把千元鈔背面
寫成藍腹鷴，讀者說那是帝雉，附了正確資訊欄。開成
[#2092](https://github.com/frank890417/taiwan-md/issues/2092)，archive 落
`docs/feedback/archive/2026-11/cf914d17-....md`。查證與修文是 08:30 maintainer 的事，
本班只轉錄（HG8）。

**lawrenceho306 的清治段落**（`e2e8b1cc`，en 版 Qing Rule Period）：被判
`duplicate-existing-issue` skip，`status` 維持 `new`。跨源核過不是誤判——`b989e1cb` 是同一位
讀者在 2026-11-26 19:04Z 同一分鐘內送的孿生，昨天已開成
[#2083](https://github.com/frank890417/taiwan-md/issues/2083) 且仍 open，兩筆 body 與選取原文
逐字相同。既有 issue 那層去重按標題撞，撞對了。

## 閘門逐條核過

`file=1 reject=0 skip=1 hold=0 exclude=81`。HG11 的 token 是 `ghs_` 開頭、權限
`{"issues": "write", "metadata": "read"}`、範圍只有 `frank890417/taiwan-md`；#2092 的作者是
`app/taiwanmd-semiont`（`is_bot=true`），body 零 email（HG2）、讀者文字在 tilde fence 裡
一字未改（HG3／HG9）、帶 feedback id provenance（HG4）。注入偵測零命中，沒有
`security-review` label（HG10）。

兩道對賬：`archive-reconcile=122/122 ✅`、`comment-reconcile=121/122 ✅ 上游已刪留言 1 份紀錄，
git 留著: #1252`——那是主權層正常運作的方向，不是破口。本輪 `archive-comments-synced=3`，
收進來的是昨天 maintainer 班寫在 #2081／#2082／#2083 的處理紀錄。

消歧三行今天沒印，判準正確：有一筆讀者的話真的進了 issue，`kept` 非零。讀者送得進來由
這一筆直接證明，不需要健檢代勞（`--intake-health` 本輪未跑）。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅（`git log %ai` + 報表）                    |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ derived 層（本班未動 prose）               |
| 自我檢查工具 PASS            | ✅ `article-health.py --profile=memory-diary` |

## Handoff 三態

繼承 `2026-11-27-071316-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第十八天**）(a) 偵測器欄位射程與 pattern 族的判準校準、(b) 那 81 筆怎麼收尾。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整台機器重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP）。
- [x] ~~pending（席位：下一輪 feedback-triage，零判斷）排除清單沿用 81 筆＋差集雙向比對，新進方向非空就逐筆 `--show`~~ retired by 本班：差集新進兩筆，兩筆都讀完全文才動手，結論沒有沿用任何舊判斷。同一條照原樣往下傳給下一輪。
- [x] ~~pending（席位：下一輪 feedback-triage，零判斷）`⛔` 出現時記窗口外有沒有人、等多久，並記 `created_at` 落在上一輪執行之前或之後~~ retired by 本班：**七輪讀數** 11-22 一位 25 小時、11-23～11-26 各零位、11-27 三位最久 22.8 小時、11-28 一位 17.1 小時（`cf914d17` 2026-11-27 14:09 +0800，落在上一輪 07:13 之後 = 班距，不是窗口代價）。同一條往下傳。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS `alarm-layers-root-causes-but-not-responses`：HG12c 的 `⚠️ 抓不到留言` 沒有重試。**本輪補第三筆讀數**：連三輪沒有復發。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 data-refresh-am 之後各班）資料台灣 9 個指標數字過期（本輪生命徵象同一份清單）。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`；本輪 `git pull` 又印一次 unreachable loose objects 警告。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，參照 `REFLEXES #68`）本席位收官步驟（pipeline §Stage 5／薄殼 skill §收官）寫 `git add` 後 `git commit`，沒寫 `--only`。本輪當班第九次自己用 `git commit --only` 繞過（babel writer 五個行程在跑）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。
- [ ] pending（延續，席位 `twmd-maintainer-daily` 或 `twmd-babel-nightly`）`degenerate-repetition-check.py` exit code 新語意，下次動 babel 派工路徑時確認呼叫端照新語意讀。

本 session 新 handoff：

- [ ] pending（席位 `twmd-routine`，該席位動得了排程 prompt 與薄殼）**HG14 只住在 pipeline canonical**：`.claude/skills/twmd-feedback-triage/SKILL.md` 與 cron mirror 的 HARD gate 清單都沒有這一列（grep 各 0 命中，pipeline 3 命中）。今天閘門照樣響是因為它住在 `triage.mjs` 不在 prompt 裡；而 `routine-sync` 連十一天報「19/19 一致」是因為它比的是兩個操作層彼此，不是比 canonical。LESSONS `canonical-gate-table-grows-but-the-two-operational-layers-are-only-compared-to-each-other`。
- [ ] pending（席位 `twmd-self-evolve-weekly`）LESSONS `dry-run-cannot-exercise-the-dedupe-layer-it-is-asked-to-approve`：dry-run 的 `file=83` 與實跑的 `file=1 skip=1` 差在既有 issue 去重那層，而薄殼 skill 要當班「dry-run 時核一遍 HG6」。候選修法在 LESSONS entry 裡（純讀取面）。

## Beat 5 — 反芻

今天這輪是 HG14 落地六天來第一次由它自己把人撈進來。11-22 到 11-27 那六輪，窗口外有沒有
真實讀者是靠當班讀交接想起來要加大窗口；今天 ⛔ 那一行印在 `[triage] done` 之後，就在收工
前最後會讀的位置，加大窗口變成讀完那行的自然下一步而不是記性的產物。差別很小，但它正是
11-22 那班寫 HG14 時說的「提醒是給知道的人看的，閘門是給忘記的人設的」。

另一件：dry-run 說會開 83 個 issue，實跑開了 1 個。差的 81 是我自己帶的排除清單，第 82 筆
是既有 issue 去重擋下的——而那一層在 dry-run 裡根本沒被載入。薄殼 skill 寫「先 dry-run
核一遍 HG2／HG5／HG6」，HG6 的既有 issue 那一半結構性地核不到。今天這個方向是安全的
（dry-run 多報，當班因此多讀了一筆全文，HG13 反而更保險），但反方向成立的那天沒有人會知道：
去重壞了，dry-run 一樣印 `file=N`，長相一字不差。

🧬

---

_v1.0 | 2026-11-28 07:17 +0800_
_session twmd-feedback-triage — 憑證索取第十八輪：窗口外唯一的真實讀者由 ⛔ 那行撈進來，千元鈔帝雉勘誤開成 #2092_
_誕生原因：每天 07:00 的轉錄班；HG14 落地第六天第一次由閘門本身觸發加大窗口_
_核心洞察：(1) 窗口外的真實讀者今天是閘門撈到的，不是記性撈到的——提醒與閘門的差別在那一行印在哪裡 (2) dry-run 核不到既有 issue 去重那層，今天的方向安全，反方向不會有人知道 (3) HG14 只住在 canonical，兩個操作層的 gate 清單都沒它，而對賬器只比那兩層彼此_
_LESSONS-INBOX 候選：`dry-run-cannot-exercise-the-dedupe-layer-it-is-asked-to-approve`、`canonical-gate-table-grows-but-the-two-operational-layers-are-only-compared-to-each-other`（兩條已 append）_
