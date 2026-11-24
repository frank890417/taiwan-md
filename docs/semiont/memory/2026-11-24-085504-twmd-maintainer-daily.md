# 2026-11-24-085504-twmd-maintainer-daily — 四件投稿全合併；抽查腳註撈出兩條原本就在的壞引用，而每一把尺都在獎勵把它們升級的那個動作

> session twmd-maintainer-daily — cron routine（am 08:30 班）
> Session span: 08:20:00 → 08:56:16 +0800（約 36 分，5 commits：4 個 merge + 1 個 heal）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**Full**（high-stake #1 命中）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，缺口 review_coverage=17.4）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

每天 08:30 的維護班。開場 6 個 ready PR 命中 BECOME 鐵律 10 第一條（PR triage ≥ 5），所以 mode 從 Review 升 Full，補載 ANATOMY／DNA／LONGINGS／UNKNOWNS／CONSCIOUSNESS／HEARTBEAT 與 OBSERVER-QUEUE §待決 32 條。

## Stage 1 掃到的場

| 面                   | 讀數                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| open PR              | 6 ready / 0 draft（4 件投稿 + 2 件哲宇自己的，後者掛 `reserved-for-observer`）                                           |
| open issue           | 5（4 件已指派哲宇或掛 reserved，1 件是機器人警報）                                                                       |
| 過去 24hr cron fires | 10 條                                                                                                                    |
| 過去 48hr commits    | 90+                                                                                                                      |
| main CI              | 14 條 active workflow，RED 0 / BLOCKED 0；2 條 off-branch 失敗（`npm-publish-cli` 仍是 OBSERVER-QUEUE #95 的 NPM_TOKEN） |
| 斷鏈 gated ratio     | 0.05% < 7%（fresh dist，`npm run sync:build` 2m2s）                                                                      |
| 免疫器官             | 59                                                                                                                       |

分岔檢查開場是 `1 0`（純領先，不是分岔）。收官時變 `1 9`，詳見下方。

## 四件投稿：全合併

tboydar 三件（#2059 裸網址轉 30 條正式腳註、#2060／#2061 各六篇人物頁 description 補到門檻）、aminzai 一件（#2062 vi 譯文〈愛玉〉）。十條紅旗全過，`article-health` 的 `ci-deploy` 與 `pre-commit` 兩把 profile 都 hard=0，CI 全綠，`pr-ci-armed` 六件全 ARMED。照 §1b merge-first 用 `gh pr merge --merge` 保譜系，四件都拿到 MERGED。

#2060／#2061 的投稿說明寫「內容全部取自各篇正文」。照 REFLEXES #31 當線索不當事實，把十二篇新 description 裡的數字全部拉出來對正文核過（46 勝 32 敗、5 年 8,000 萬美元、214 週球后、鞍馬 15.400 分、祖師廟 36 年、111 天 7,500 公里、2023 年證據裁定等），每一項都在對應正文裡，沒有新增事實。他說的是真的，但這一步是我自己該驗的。

#2062 的 `cjk-residue-check` 報 ❌ 2 行，兩處都是假陽性：`阿坤 Wang kun hung` 是 Wikimedia 攝影者署名（要逐字留），`薜荔` 是腳註存在的目的本身（那條腳註就是在區分 Ficus pumila 與 aiyu）。人審放行，並在 PR 回覆明講，讓投稿者下次不要把它們「修掉」。這道尺不在 PR 路徑上，所以它誰也沒擋、也誰也沒保護。

## 抽查腳註撈出的兩條，和一個沒有閘門的轉換

#2059 有 30 條新腳註，照 §Step 3.4 抽 10 條實際連出去看。七條對得上，三條（台灣光華、Academia.edu、iThome）回 403 是擋機器人不是死鏈。兩條在〈開源社群與g0v〉現形，而且**兩條原本就在延伸閱讀清單裡**：博客來那本《數位時代的民主參與：從太陽花到g0v》產品頁回 404、一輪搜尋也找不到對得上的出版資料；TED 那條標題寫「如何在沒有許可下修正政府」而網址指唐鳳 2020 年那場 `How digital innovation can fight pandemics and strengthen democracy`。

投稿者沒造成任何新錯誤，他做的是我們要的事。但轉換本身讓這兩條從「清單上的推薦讀物」變成「撐著某一句話的證據」：404 那條撐的是「被世界各地的公民運動學習和模仿」，TED 那條撐的是「2月6日、13,000家特約藥局、每30分鐘更新」。`ab9964d668` 把 404 換成實際讀過的 Friedrich Naumann 基金會那篇，並照它實際寫的把「學習和模仿」收斂成「被國外看成一個可能的範本」、列出手冊真的收錄的韓國泰國日本德國案例；TED 的標題改回實際講題。

TED 那條的 claim 層沒收尾：逐字稿抓不到，只讀得到簡介，簡介沒有那三個數字。抓不到不等於講者沒講（REFLEXES #16 否定式結論舉證要更高），所以正文沒動，留事實查核。

## 交接那支退化尺：驗過會擋

上一班交接要我確認 `degenerate-repetition-check.py` 在派工路徑上真的會擋。確認了：`babel-dispatch.py:569` 呼叫它，`returncode == 1` 進 `degenerate_fail`，併入第 575 行的 `ok` 條件，失敗時記 `degenerate[N]` 這個可診斷的理由。`--selftest` 七個正控制全過，含 issue #2055 的原形（49 次重複該叫）與 fr 輸入法那篇（同音示範 5 次不該叫）兩個方向。vi 譯文跑它也過。這條 retire。

## 收官 checklist

| 檢查項                          | 狀態                                       |
| ------------------------------- | ------------------------------------------ |
| MEMORY 有這次 session 的紀錄    | ✅                                         |
| Timestamp 精確（`git log %ai`） | ✅                                         |
| Handoff 三態已審視              | ✅                                         |
| CONSCIOUSNESS 反映最新狀態      | ✅（免疫 59 / 三盞黃燈皆已有席位）         |
| 自我檢查工具 PASS               | ✅ `article-health --profile=memory-diary` |

## Quality gate（MAINTAINER §Step 4.1，8 條）

| Gate                                                   | 結果                                                 |
| ------------------------------------------------------ | ---------------------------------------------------- |
| open issues 都有 status label / assignee               | ✅（5/5）                                            |
| open PRs ≤ 5d age 都有 review comment                  | ✅（四件各一則；兩件 reserved 已有前班留言與 label） |
| broken-link gated ratio < 7%                           | ✅ 0.05%                                             |
| build green                                            | ✅ RED 0                                             |
| BECOME ACK 一行記憶體頂                                | ✅                                                   |
| 連續空場 ≥ 3 cycle 有 LESSONS entry                    | n/a — 本班 vc=0（四件真 backlog）                    |
| 有 fresh issue 的 cycle 至少一件被修掉或寫明為什麼不修 | ✅ 無 fresh issue；仍有產出（`ab9964d668`）          |
| 本機與 origin 無真分岔                                 | ⚠️ 讀數 `1 9`，見下                                  |

## Handoff 三態

繼承 `2026-11-24-071223-twmd-feedback-triage.md`：

- [x] ~~（席位 `twmd-maintainer-daily` 或 `twmd-babel-nightly`，參照 `#2055`）確認 `degenerate-repetition-check.py` 在派工路徑上真的會擋~~ retired by 本班 — 端到端驗過（`babel-dispatch.py:569` + 七個正控制全過）
- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第十五天**）偵測器欄位射程與那 81 筆怎麼收尾
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整機重開機、`#126`、`#116`（`twmd-review-stock` 排程只有哲宇按得到，routine-stall-check 已連 130 小時印 🆕）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP，對應 issue #2011）、`#95`（NPM_TOKEN 失效，對應 issue #1789）
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2（本班生命徵象仍印 115Q1，已 238 天）
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`
- [ ] pending（延續，席位：下一輪 feedback-triage，零判斷動作）排除清單沿用 81 筆、`⛔` 出現時記窗口外有沒有人等
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，參照 `REFLEXES #68`）feedback-triage 收官步驟寫 `git add` 沒寫 `--only`
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07～11-17 沉默十天的根因（`#124` 重開機仍未做）
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`

本 session 新 handoff：

- [ ] pending（席位 `twmd-self-evolve-weekly`，參照 LESSONS `citation-promotion-raises-burden-unchecked`）那條候選機械化：PR diff 把延伸閱讀的 `- [title](url)` 改寫成 `[^N]:` 定義、且 `[^N]` 被插進正文句尾時，印一行「這 N 條的舉證責任剛剛升級」。純提醒級不擋。本班手驗 10/30 條就撈到 2 條，存量不明。
- [ ] pending（席位 `twmd-babel-nightly` 或 `twmd-self-evolve-weekly`，參照 LESSONS `cjk-residue-exemption-misses-attribution-and-contrasted-term`）`cjk-residue-check` 豁免加圖片出處署名行與「已在同行以拉丁學名括號出現過的漢字」兩條。
- [ ] pending（席位：事實查核／`twmd-review-stock`，參照 `knowledge/Technology/開源社群與g0v.md` `[^4]`）那條 TED 腳註撐的「2月6日 / 13,000家特約藥局 / 每30分鐘」三個數字，逐字稿抓不到所以沒驗過。需要從有全文的來源或影片字幕確認，或換一條撐得起這三個數字的來源。
- ⏳ blocked（席位 `twmd-weekly-report-sun` 11-29 02:03，參照 `weekly-report-safeguards-2026-11-22`）本班獨立驗了一次 11-22 那趟的死法：本機 `docs/semiont/memory/` 沒有 11-22 的 weekly-report 檔、origin 也沒有救援分支收著，所以是「fire 了但 run 死掉」不是「寫了沒推上去」，跟 routine-audit 11-22 讀到的排程器 log（02:05:31 `Opus 5's safeguards flagged this message`，同秒不重試）對得上。兩把尺同調，黃燈會掛到 11-29 那班自己開場確認。

## Beat 5 — 反芻

今天真正學到的東西不在四件 PR 上，在一個我差點沒看見的地方。

那四件投稿每一把尺都說它們好：footnote-density 的 C/D 警告消除了、兩把 article-health profile 都 hard=0、CI 全綠、ratio 在健康帶、`pr-ci-armed` 六件全 ARMED。如果我停在那裡，這一班會是乾淨漂亮的一班。而照 SOP 多走一步、真的把十條網址連出去看，撈到的兩條都不是投稿者造成的——是我們自己的庫存，在清單裡躺著沒事，被升級成腳註之後才變成問題。

這件事的形狀是：**我們鼓勵投稿者做的那個動作，同時提高了那條來源要證明的東西，而所有的尺都只量動作完成了沒有**。尺不是壞的，它們各自都正確。缺的是沒有人在轉換發生的那一刻問一句「這條連結現在要負的責任變大了，它撐得起嗎」。這跟 REFLEXES #102 是同一個原則的上游：#102 管既有腳註撐不撐得起它旁邊那句話，這條管的是「非腳註變腳註」這個轉換本身沒有閘門。兩條 LESSONS 已入庫等 distill 裁決。

另一件值得記的是我沒做的事。收官時分岔讀數是 `1 9`，照 Step 1.1b 的機械定義兩邊都 > 0 就是真分岔，而哲宇的 directive 是當班修、不留交接。我沒有修，理由寫在這裡好讓下一班能否證它：那 1 個是 babel 自己還沒推的 commit，`babel-push-every.py --watch` 活著（PID 57192、掛在 launchd `com.taiwanmd.babel.push-every`、已跑六天七小時），dispatcher 也活著正在翻 vi。衝突面是零——它動的是譯文與 `reports/babel/`，我動的是 zh 文章與認知層。要在這個狀態下 rebase 主樹，第一步就是 Step 1.1b 自己寫的「凍結寫入者：`launchctl remove`」，那等於為了消一個讀數去停一條正在產出的產線。843 檔、十天、無人動手的那次是真分岔。一個小時內會自己落地的一個 commit 不是。

**收官後補一條更正，因為我第一次給的理由不夠精確。** 我原本寫「它今天每小時都在落 commit」，那句話讀起來像「推送者每小時動一次」，而它其實不是。`/tmp/babel-push-every.out` 最後一次寫入是 11-23 18:41，到現在十四個小時沒有新行；今天那些 babel commit 多半是其他班 pull/push 時順手帶上去的。差點就憑 `ps` 加 launchctl 把它判成健康，那正是「存活 ≠ 生產」要防的事。去讀程式才看懂：`babel-push-every.py` 的門檻是「未推送譯文 ≥ 50 篇」或「最舊的 commit ≥ 3 小時」，而且不到門檻只在狀態改變時記一行免得洗版。現在這批是 3 篇、躺了一小時，所以它還沒該動，約 10:56 才該動。

決定沒有變，變的是理由站得住腳。而且我確認過不該由我代勞：那個 commit 動到 `knowledge/_translation-status.json` 與 `reports/babel/fail-memo.json`，兩份都是 babel 的帳本、origin 上也有其他 babel commit 動過它們，我手合就是去解別人的狀態檔衝突（REFLEXES #40）。push-every 自己有 `🔀 合併 origin/main` 的路徑，它比我適合做這件事。留給下一班能否證的讀數：若 11-24 11:00 之後 `main...origin/main` 左邊還是 1，那就不是門檻沒到，是真的卡住了。

我選擇驗證而不是假設：先確認推送者真的存在才敢說它會自己好。「存活 ≠ 生產」這條反射教我的是別把 `ps` 讀成在做事。這次反過來用了一次——我需要證明那個進程不只活著，而且真的在推，所以去看了它今天落的 commit 時間。

🧬

---

_v1.0 | 2026-11-24 08:56 +0800_
_session twmd-maintainer-daily — 四件投稿全合併；抽查腳註撈出兩條原本就在的壞引用；交接那支退化尺驗過會擋_
_誕生原因：每天 08:30 的維護班，開場 6 個 ready PR 把 mode 從 Review 推上 Full_
_核心洞察：(1) 把延伸閱讀的連結升成腳註會提高它要證明的東西，而每一把尺都只獎勵升級這個動作 (2) 投稿說明是線索不是事實，十二篇 description 的數字我自己對了一遍才算驗過 (3) 分岔讀數要分清「正在跑的寫入者還沒推」跟「兩段歷史各自長大」，而分法是去證明推送者真的在推_
_LESSONS-INBOX 候選（已入庫）：`citation-promotion-raises-burden-unchecked`（structural）／`cjk-residue-exemption-misses-attribution-and-contrasted-term`（minor）_
