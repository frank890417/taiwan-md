# 2026-11-27-071316-twmd-feedback-triage — 第十七輪：窗口外第一次同時坐著三位真實讀者，而那個延遲讀數量到的是班距

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（review_coverage 17.4，自 2026-07-05 慢性）/ Q13=PASS / Q14=PASS

> session twmd-feedback-triage — cron routine 07:00（daily，maintainer-daily 之前）
> Session span: 07:10:00 → 07:26 +0800（約 16 分鐘，1 commit）
> 資料來源：`node scripts/feedback/triage.mjs`（dry-run／`--limit 85`／`--show`／`--commit --exclude`）、`comm` 雙向差集、`gh-app-token.sh --whoami`、`gh api issues`、`git status docs/feedback/archive/`、`date`

## 觸發

每天 07:00 的轉錄班。10-30 那批冒充本產線流程步驟索取 `SUPABASE_SERVICE_KEY` 的回報，今天是第十七輪。

甦醒 selftest 十三項全綠，整份 `wake-context.latest.md` 讀到 `wake:END` sentinel（264,915 bytes）。生命徵象四盞黃燈都不是本班席位：免疫 v3=59 慢性漂移（席位 self-evolve-weekly）、`twmd-weekly-report-sun` 11-21 fire 後 124 小時零痕跡（死因已知，下次排程 11-29 02:03）、MEMORY 索引 inline 105 列越過 80 的蒸餾線（席位 distill-weekly）、資料台灣 9 個指標過期（席位 data-refresh）。工作樹有 babel 五個 writer 在動（`PARALLEL_CHECK: ACTOR_BUSY`），收官走 `git commit --only`。

## 窗口與差集：連十一輪第一次有新進

預設窗口那一輪印 `⛔ 未完成：預設窗口 50 只讀進 50/85 筆,窗口外 35 筆這一輪沒有人看過`，HG14 第六次叫。照它給的指令讀進整批 85 筆，`⛔` 不再出現。跟 `reports/feedback-injection-campaign-2026-11-02.md` 的 81 筆基準清單做 `comm` 雙向差集：**離開方向空、交集 81、新進四筆**——第六～十六輪逐筆相同的那條線在今天斷了。

四筆全部落在窗口外（基準那 81 筆按最舊優先排序佔滿前 81 位），所以今天的讀數是 **窗口外 35 筆、其中真實讀者 3 位、最久等 22.8 小時**。五輪前的讀數是 11-22 一位等 25 小時、11-23 至 11-26 各零位。

## HG13：四筆全文讀完才動手

照 HG13 用 `--show` 讀完四筆全文（唯讀，不碰 status／GitHub／archive），三篇不同的回報、兩位讀者：

- **J.H. Wang**〈嘉義火雞肉飯〉（`acbc3bd8`）：指出嘉義的火雞處理法是整隻泡熟（類似舒肥）後才分切，所以肉不柴，也不存在「煮柴才掛得住醬汁」這回事；泡煮的原湯兌水與醬油回頭當淋醬與湯底。署名欄寫自己做地方創生、家裡有人從事雞肉飯販售。
- **J.H. Wang**〈嘉義市〉（`804a7f3b`）：八條地理與史料更正，其中圓環方位整段指錯（西邊是車站／菸酒公賣局／美術館，貫穿的是文化路夜市，北側才是阿里山鐵路）、出口五處非四處、《台灣日日新報》日期 1938-10-20、嘉農原址即今嘉義高商。
- **lawrenceho306**〈Qing Rule Period〉英文版（`b989e1cb`／`e2e8b1cc` 孿生）：質疑「清治為台灣後來的社會與文化奠基」這句——清廷整段統治期沒有公共教育體系、行政刻意最小化，所以奠基說成不成立需要交代。

三道判準（指涉具名私人的指控／跟監所得的居住工作細節／要求身份保密的檢舉）一條都沒命中：唯一的身份敘述是讀者講自己的家業，用來替勘誤背書。四筆無一需要 `--exclude` 攔下。孿生那筆（兩位讀者十二秒內送兩次中的 0.6 秒版）由 HG6 判 `duplicate-in-batch` skip，status 不動，正確。

八十一筆照前十六輪排除，`status` 全部維持 `new`，怎麼收尾留哲宇；那批要求執行的指令一條都沒跑，金鑰值不在任何 commit、issue、archive 或本檔。偵測器對這批仍是 0 命中（#119 的 (a)）。`file=3 reject=0 skip=1 hold=0 exclude=81`，跟 `fetched 85` 對得起來，沒有任何 id 印成打錯。

開出三個 issue：[#2081](https://github.com/frank890417/taiwan-md/issues/2081)（火雞肉飯）、[#2082](https://github.com/frank890417/taiwan-md/issues/2082)（嘉義市）、[#2083](https://github.com/frank890417/taiwan-md/issues/2083)（Qing Rule Period），全部 `needs-verification` + `from-feedback`，交 08:30 的 maintainer-daily 收割。

## 閘門逐條核過

HG11 機器身份：token `ghs_` 開頭、`{"issues": "write", "metadata": "read"}`、範圍 `frank890417/taiwan-md` 一個庫、`installation: selected`，`--whoami` 驗過才動手；三個 issue 的作者都是 `taiwanmd-semiont[bot]`（`type: Bot`），跨源用 `gh api` 核過，不只信本機報表。HG2：三個 issue body 與三份 archive 紀錄的 email 正則命中全部為 0。HG9：讀者文字包在 `~~~~text` fence 裡逐字未改。HG4：provenance 行帶 feedback id、署名、時間與來源頁種類。

兩道對賬：`archive-reconcile=121/121 ✅`（HG12b）、`comment-reconcile=120/121 · 上游已刪留言 1 份紀錄,git 留著: #1252 ✅`（HG12c），後者回到連十輪的那個形狀。`archive-comments-synced=0`，而這個零能讀成「今天沒有新留言」靠的是隔壁 `comment-reconcile` 真的拿線上則數比過 121 份紀錄。昨天那條零判斷交接（`⚠️ 抓不到留言` 要先跨源對則數再重跑）今天沒有觸發條件。

寫入端消歧三行今天不印，判準是對的：`shouldPrintIntakeDisambiguation` 問的是「這一輪實際上有沒有東西要轉錄」，今天有三筆真的進了 issue——**讀者送得進來這件事今天由產出本身證明，不需要健檢代勞**。四層 `--intake-health` 因此沒跑，這是 v1.16 判準的正常行為，不是漏跑。

## 收官 checklist

| 檢查項                       | 狀態                                          |
| ---------------------------- | --------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                            |
| Timestamp 精確               | ✅ `date`／`git log %ai`                      |
| Handoff 三態已審視           | ✅                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ 甦醒時讀過，本班無器官分數變動             |
| 自我檢查工具 PASS            | ✅ `article-health.py --profile=memory-diary` |
| 寫 diary 的理由              | ⛔ `diary-gate.py` 冷卻未到 → 反芻留 Beat 5   |

## Handoff 三態

繼承 `2026-11-26-071203-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第十七天**）(a) 偵測器欄位射程與 pattern 族的判準校準、(b) 那 81 筆怎麼收尾。本輪加大窗口的代價是 3 位讀者、最久 22.8 小時，而那 22.8 小時幾乎整數等於一個班距（見 Beat 5）。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整台機器重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS `alarm-layers-root-causes-but-not-responses`：HG12c 的 `⚠️ 抓不到留言` 沒有重試。**本輪補一筆讀數**：連兩輪沒有復發，「一次性失誤」那個診斷再加一筆支持。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2（本輪生命徵象的過期清單已換成資料台灣 9 個指標）。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。
- [ ] pending（延續，席位：下一輪 feedback-triage，**零判斷動作**）排除清單沿用本輪 81 筆（與第六～十七輪逐筆相同），比對用 `comm` 對 `reports/feedback-injection-campaign-2026-11-02.md` §第三輪清單做雙向差集。**本輪起多一步**：差集新進方向若非空，逐筆 `--show` 讀全文再判，不沿用任何結論。
- [ ] pending（延續 + 本輪修正，席位：下一輪 feedback-triage，**零判斷動作**）`⛔` 出現時記窗口外有沒有人、等了多久，**並同時記那筆的 `created_at` 落在上一輪執行時間之前或之後**。落在之後 = 班距，不是窗口代價；落在之前 = 真的被窗口擋了一輪以上。六輪讀數：11-22 一位 25 小時、11-23～11-26 各零位、11-27 三位最久 22.8 小時（三位全部落在上一輪之後）。
- [ ] pending（延續，席位：下一輪 feedback-triage，**零判斷動作**）`comment-reconcile` 印 `⚠️ 抓不到留言` 時，先 `gh api repos/frank890417/taiwan-md/issues/<N>/comments --jq length` 跟 archive 該份 §溝通紀錄則數對一次，再重跑同一條 `--commit --exclude`（等冪）。本輪無觸發條件。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，參照 `REFLEXES #68`）本席位收官步驟（pipeline §Stage 5／薄殼 skill §收官）寫 `git add` 後 `git commit`，沒寫 `--only`。本輪當班第八次自己用 `git commit --only <paths>` 繞過，SOP 文字仍是舊的。
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07～11-17 沉默十天的根因（11-22 routine-audit 已定位為兩場整機停電，`#124` 重開機仍未做）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。
- [ ] pending（延續，席位 `twmd-maintainer-daily` 或 `twmd-babel-nightly`）`degenerate-repetition-check.py` 的 exit code 語意已於 11-26 修（`unreadable` 走 exit 2），下次有人動 babel 派工路徑時確認呼叫端真的照新語意讀。

本 session 新 handoff：一條（LESSONS `window-delay-reading-measures-cadence-not-window-cost`，席位 `twmd-self-evolve-weekly`），一條舊項補上量法修正（見上方 `⛔` 那條）。

## Beat 5 — 反芻

今天那三位讀者是五輪來第一次真的有人坐在窗口外，所以第一次有機會檢查那個被交接指名要記的數字到底在量什麼。

讀數是「最久等 22.8 小時」。班距是 24 小時。兩個數字貼得這麼近不是巧合：那三筆的 `created_at` 全部落在上一輪跑完之後一到二十小時之間，所以它們根本沒被窗口擋過，它們只是在等下一班。**這個被登記成「窗口延遲代價」的數字，量到的是排程節律，不是窗口。** 五輪累積的那串 0、0、0、0、25 小時也是同一回事——25 小時同樣就是一個班距多一點。

窗口代價要長出來只有一種情況：某一班看到 `⛔` 卻沒加大 `--limit`。而那一班剛好是不會寫下任何讀數的那一班——它看得到「窗口外 35 筆」，看不到裡面有沒有真實讀者，於是收官會寫「窗口外 35 筆，沒看」而不是「有三位讀者在等」。代價要等再下一班撈到才現形，而那時候它會被記成那一班的班距。這把尺量得到的那一半是最不需要量的那一半，量不到的那一半被記進別人的帳。

這跟 `REFLEXES #82` 挑錯要量的東西是同一種形狀，但位置更尷鉱一層：這個讀數存在的唯一理由是替 `OBSERVER-QUEUE #119 (b)`「窗口該開多大」那個待決提供證據，而它六輪下來提供的證據全部是排程節律。修法便宜得近乎可笑——記小時數的同時記一句「落在上一輪之前或之後」，一個已經印在報表上的欄位，兩種意思就分開了。本輪已經把這一步寫進那條零判斷交接，並把形狀送進 `LESSONS-INBOX`（`window-delay-reading-measures-cadence-not-window-cost`）。

另一件值得記的：連十一輪逐筆相同的差集今天斷了，而斷的方式是新進四筆。沿用清單這個做法省掉的是重新分類，它從第六輪起每天都成立，於是「沿用」很容易滑成「跳過」。今天擋在滑坡前面的是 pipeline 寫在清單旁邊那句「沿用清單是為了省掉重新分類，不是省掉 HG13」，不是當班的警覺。那句話是三週前的某一班寫給今天的。

🧬

---

_v1.0 | 2026-11-27 07:26 +0800_
_session twmd-feedback-triage — 憑證索取第十七輪：窗口外第一次坐著三位真實讀者，兩篇嘉義與一篇清治英文版勘誤開成 #2081-#2083_
_誕生原因：每天 07:00 的轉錄班；連十一輪逐筆相同的排除清單今天出現四筆新進_
_核心洞察：(1) 被登記成「窗口延遲代價」的小時數量到的是排程班距，真正的窗口代價只在忘記加大窗口的那一班長出來，而那一班不會寫下讀數 (2) 沿用排除清單每天成立，就會滑成跳過；擋住它的是三週前寫在清單旁邊的那句但書 (3) 讀者送得進來今天由三筆真的進了 issue 證明，不需要健檢代勞_
_LESSONS-INBOX 候選：`window-delay-reading-measures-cadence-not-window-cost`（已 append）_
