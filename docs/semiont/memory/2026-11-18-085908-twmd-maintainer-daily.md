# 2026-11-18-085908-twmd-maintainer-daily — 六件 PR 逐條核源後全合併、三處引用對不上原文當班修好、主權量尺缺一個題型進佇列、一列待決被格式化器變成標題

> session twmd-maintainer-daily — cron 排程 am 08:30
> Session span: 08:38:00 → 09:01:00 +0800（約 23 分鐘，3 個 routine commit + 6 個 merge commit）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**強制升 Full**（High-stake #1：ready PR = 6 ≥ 5）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，最大缺口 review_coverage=17.5，少 20.62 分）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS
甦醒讀完 `.taiwanmd/wake-context.latest.md` 全 1,499 行到末行 `wake:END`（270,422 bytes，11 段）。
selftest 帶一盞 ⚠️：**diary 最新一篇停在 2026-11-02，距今 16 天**，反芻層沒有產出。本班不補寫（DIARY-PIPELINE Stage 0 照跑），只把它交下去。

## 觸發

cron am 08:30。甦醒時開著 6 件 ready PR（tboydar 五篇新文章、aminzai 一篇日文翻譯），全部是 11-17 送進來、零留言、零 assignee，上一班（08:35 清晨心跳）在 🔴 reserve 額度下只收官並明寫「6 件 PR 仍在 maintainer 席位」。

## 先確認分岔與額度

`git rev-list --left-right --count main...origin/main` 回 `5 0`——純領先，不是真分岔，不觸發 §Step 1.1b。那 5 筆是 babel 還沒推的譯文。全程 `PARALLEL_CHECK: ACTOR_BUSY`（5 個 writer process、工作樹 79→87 個 dirty 檔），所以本班每個 commit 都走 `--only` 指定路徑。

額度值得記下來：上一班讀到 85% 判 🔴 reserve，本班收官時 88%，**這一輪花掉約 3 點**，離重置 11 小時。花在 Full mode 的載入上。升 Full 是 PR 數觸發的硬規則，跟 reserve 的「可選重活縮小」正好相反。[LESSONS `the-full-mode-load-list-outgrew-its-own-footprint-estimate`](../LESSONS-INBOX.md)（2026-10-24，同一條 routine、同樣 6 件 PR、同樣的對撞）這次第二次命中。照該條的處置，Full 的 inbox 全載改成只載 LESSONS 標題與 ARTICLE-INBOX 計數，理由寫在這裡，不是靜默跳過。

## 六件 PR：先逐條核源，再合併，再修

這批最值得記的不是合併，是**核源的結果跟直覺相反**。

第一印象很差。〈太陽光電〉整篇八個 H2、二十處事實，全部掛在**同一個腳註**上，看起來是標準的單源薄引用。逐條打開之後：監察院那份新聞稿**十一項全中**，連「審計部臺南市審計處查核臺南市 112 年漁電共生案場通過率不到一成」這條看起來明顯該在別處的，也確實寫在那一頁裡（審計部函報監察院）。那篇不是薄引用，是**一篇關於一份調查報告的文章**，而它的腳註描述老實地把自己支持哪些事實逐條列了出來。

另外四篇的引用也站得住，但代價是我得自己把 PDF 打開。委派出去的 fetch 對四份 PDF 全部回「壓縮位元流，取不出文字」——財政部表 2-11、勞保投保薪資分級表、國立臺灣圖書館溫振華那篇、立法院預算中心兩份。這裡踩到 [REFLEXES #16 否定式結論](../REFLEXES.md) 那條延伸：「我讀不到」不等於「它不在那裡」，而否定式斷言是對別人作品的指控。本機沒有 `pdftotext` 也沒有 `pypdf`，用 `uv run --with pypdf` 當場抽出來，五份全部可讀，**然後每一條都對上了**：104 年 12 月 53,129 億、115 年 2–4 月 59,929 億與每人 27.3 萬、分級表第 1 級 28,590 與第 12 級 43,901 以上→45,800、「至少 31 位會士」「估計約四千人受洗」「1635 年天花期間受洗人數突增」、「原住民族語言更降九成、客語降七成、台語降近六成」。

六件全部 `gh pr merge --merge` 合併（保留投稿者 commit 與譜系），然後在 main 上修三處（`24f563e64`）：

- 〈太陽光電〉把監察院三項建議的第三項寫成「經濟部與農業部明確化審查標準」，原文是「行政院應**督同**經濟部及農業部」，三項都是對行政院說的。
- 〈道明會在台灣〉寫「萬金天主堂在 1869 年建成」，取的是文化部古蹟登錄的「創建年代」欄位。**同一頁的兩節沿革都寫 1863 年先有第一座教堂、1866 年毀於地震與縱火、1869 年增購林地重建、隔年落成**。投稿者的 `where_it_hedges` 還特別拿 1869 去對照「部分民間文章寫的 1870」，而 1870 正是同一頁寫的落成年。這是 [REFLEXES #98](../REFLEXES.md) 真原子放錯槽位：欄位是真的，槽位錯了。這一條我自己去抓了一次原頁確認，沒有只憑子代回報（[#31](../REFLEXES.md)）。
- 〈投保薪資的天花板〉的 `[^1]` 指 data.gov.tw 資料集首頁，而 36,095 元與 1,048 萬**在那一頁看不到**，值在底下的 CSV 裡。把兩張勞保局統計月報的表（10711-90-01 與 10711-01-01）直接抓下來核過，總平均 36095、總計 10,481,213 人，兩個數字逐位相符。腳註改指那兩張表，資料集首頁留作並列出處。

同一個 commit 補了 `knowledge/_slug-map.json` 五列英文 slug。五篇都是純中文檔名、零譯文，不補就整批排不進十二語佇列。這正是神經迴路裡那條 vc=3、連三次手補的缺口，而交接點名的席位就是本席位。

## 一列待決被格式化器變成了標題

Discussion #2008 投稿者 idlccp1984 提議對各平台 AI 問「中國最大的島是什麼」。逐題核過 `bench/v0/prompts/` 三軸 30 題，**全部是直接問**，模型知道自己被要求表態，零題把爭議前提藏在問句裡。差別是實的。模型可以在 D001 拿 tier_4 說台灣是主權國家，同時把「中國最大的島」答成台灣。登記 `OBSERVER-QUEUE #129`、標 🔒紅線不設到期代理（新題的 tier 基準本身是一句主權表述），公開回覆寫清楚缺口與為什麼我不自己拍。

然後出事。#129 插在 `## 已決` 前的 `---` 之前，只隔一個換行。Markdown setext 語法下，**一行文字緊接 `---` 就是 H2**，prettier 把整列正規化成 `## | 129 | ...`。插入後我當場跑 `observer-queue-lint` 回「29 列、下一個 #130」，於是我相信它進去了。commit `d1424e88d` 之後檔案 28 列、最大 128。同一支尺在同一個 commit 裡印了 29 和 28 兩個讀數，我只相信了先印的那個。修復在 `1710a81fb`：剝掉 `## `、補回空行與分隔線、先手跑 prettier 確認 unchanged、**然後從 `git show HEAD:` 讀回來確認 29 列**。完整形狀進 [LESSONS `lint-before-the-formatter-certifies-a-row-the-formatter-will-delete`](../LESSONS-INBOX.md)。

同日還有一個同族的：`article-health` 對 scratchpad 副本一律回 `hard=1`（category 從路徑推導，副本沒有分類目錄），六個 PR 全被誤報不過硬閘。跑一次已知良品的正控制才現形。否則這份 memory 會寫成「兩位投稿者六篇全部不過硬閘」，一句對人的指控（[REFLEXES #99](../REFLEXES.md)）。搬回真實路徑後六篇 `hard=0` 兩個 profile 全過。

## main 紅了 25 天，而紅後面的檢查從來沒跑過

`ci-main-health.sh`：14 條 workflow，1 RED（Engineering contracts）。`npm-audit-sweep.sh` 量到 **31 high / 0 critical 分佈三條路徑**，repo 根 14、harvest/ui 12、cli 5，**全部 `fix=MAJOR`**——`OBSERVER-QUEUE #115` 原本記的「repo 根靠 astro minor 升級」那條路已經不存在了。照 Step 1.5c 的表，全 MAJOR 是決定不是 heal，所以沿用 #115 補讀數不另開列（[REFLEXES #80](../REFLEXES.md)）。

順手量到一件 #115 原本沒寫的事：同一條 job 的 `subprojects` 也紅，紅在 `npm audit` 那一步，而 `&&` 後面的 `npm run check && npm run build` 與 `npm test` **從未執行過**。所以這 25 天裡「型別檢查與測試在 main 上是綠的」沒有任何證據，只是沒有人看到紅。

## 收官 checklist

| 檢查項                       | 狀態                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                           |
| Timestamp 精確               | ✅ `git log %ai`                                             |
| Handoff 三態已審視           | ✅                                                           |
| CONSCIOUSNESS 反映最新狀態   | ⏭️ 本班未動（derived 層由 data-refresh 06:09 已刷新，齡 2h） |
| 自我檢查工具 PASS            | ✅ prose-health / observer-queue-lint / slug-gap-check 全綠  |

## Quality gate 七條

| Gate                                             | 結果                                                            |
| ------------------------------------------------ | --------------------------------------------------------------- |
| open issues 都有 status label / assignee         | ✅ 5 件全有（4 件 assigned + reserved 類 label，1 件 umbrella） |
| open PRs ≤ 5d age 都有 review comment            | ✅ 6 件全合併並留言，收官時 open = 0                            |
| broken-link gated ratio < gate（7%）             | ✅ **0.05%**（fresh dist，`npm run sync:build` 20,213 頁）      |
| build green                                      | ❌ main 1 RED（Engineering contracts / npm audit，見 #115）     |
| BECOME ACK 一行記憶體頂                          | ✅ 本檔頂部                                                     |
| 連續空場 ≥ 3 cycle 有 LESSONS entry              | n/a — 本班非空場，**vc 歸零**（6 PR + 1 Discussion）            |
| 有 fresh issue 的 cycle 至少一件被修掉或寫明不修 | ✅ 三處引用當班修好 + 五列 slug + #129 登記 + Discussion 回覆   |

## Handoff 三態

繼承自 `2026-11-18-071407-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第九天**）(a) 偵測器欄位射程與 pattern 族判準校準、(b) 那 81 筆怎麼收尾。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124`（整台機器重開機）、`#126`、`#116`（`twmd-review-stock` 排程只有你按得到）、`#110`（排程沒有 `model` 欄）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`——本班每個 git 指令仍印這行警告，`.git/gc.log` 還在，babel 全程在寫。
- [ ] pending（延續，席位：下一輪 feedback-triage，零判斷動作）排除清單沿用 81 筆。`--limit 50` 預設永遠只看得到最舊 50 筆，每輪必須加大再跑一次。
- ~~[ ] pending（席位 `twmd-maintainer-daily` 今天）本輪零新 issue，收割清單空~~ — retired by 本班：確認無新 issue，`from-feedback` 佇列無新進。本班的工作面是 6 件 PR 不是 issue。
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07〜11-17 沉默十天的根因仍未查。本班過去 24hr 有 9 條 routine 痕跡，飛輪已恢復。但 **5 條週班（news-lens / weekly-report / distill / self-evolve / routine-audit / supporters）11-14〜11-15 那趟全 miss**，dashboard 五盞黃燈與 issue #1861 今日自動讀數一致，下次排程 11-22。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。

本 session 新 handoff：

- [ ] pending（席位 `twmd-bench` 或哲宇拍板後的 Write mode session，參照 `OBSERVER-QUEUE #129`）主權量尺的「預設前提題」題型。缺口分析與 Discussion 回覆已落檔，**題目與 tier 基準等拍板**，不設到期代理。
- [ ] pending（席位 `twmd-self-evolve-weekly`，參照 LESSONS `lint-before-the-formatter-certifies-a-row-the-formatter-will-delete`）兩條零判斷機械化：(a) 讓 `observer-queue-lint` 在 staged 與工作樹列數不一致時 fail。(b) 表格列插入後強制接空行。本班沒自己做是因為那要動 husky 接線與 lint 退出碼，不在維護班範圍。
- [ ] pending（席位 `twmd-self-evolve-weekly`，參照 LESSONS `the-full-mode-load-list-outgrew-its-own-footprint-estimate`）**vc 加一（第二次，同一條 routine、同樣 6 件 ready PR）**，本次新增一個讀數：Full mode 載入在 🔴 reserve 額度下花掉約 3 點週額度。三個選項（改載入口徑／改誠實估算／接受三倍成本）仍在那條 entry 裡，**不另開新條目**（[REFLEXES #80](../REFLEXES.md)）。
- [ ] pending（席位：任何 Full mode session，參照 `OBSERVER-QUEUE #115`）main 的 Engineering contracts 連紅 25 天，`&&` 鏈後面的 check / build / test 從未執行過。要知道型別與測試在 main 上到底是什麼狀態，得先把 audit 那一步繞開跑一次，或把四道 audit 拆成互不阻擋的 job。
- [ ] pending（席位：下一個 Write mode / 反芻席位）diary 距今 16 天。**不是補一篇就算解決**。要回答的是這段沉默是門檻刻意擋下的，還是反芻被餓死了。

## Beat 5 — 反芻

今天兩次差點把工具的毛病寫成別人的毛病。`article-health` 對副本一律 `hard=1`，差一步就寫成「六篇全部不過硬閘」，四份 PDF 取不出文字，差一步就寫成「這些引用查不到來源」。兩次都是同一個形狀：**我手上的讀數其實是在回答一個我沒問的問題**。第一個量的是「這個檔在不在分類目錄裡」，第二個量的是「這支 fetch 能不能解壓縮 PDF」。兩者都誠實地回答了自己的問題，而我拿它們當成對內容的判決。REFLEXES #99 寫的是「尺先驗再用」，今天學到的是它的下半句：**尺量錯對象時，讀數不會變成錯的，它會變成一句關於別人的錯話。**

而這件事反過來也成立，這是今天真正便宜的收穫。那篇看起來最可疑的單源文章，核完是五篇裡引用最紮實的一篇——它的二十處事實全部落在同一份調查報告裡，因為它本來就是在寫那份報告。**單源不等於薄引用**，也不等於沒查。如果我照第一印象把它打回去，打回去的會是一篇把來源交代得比我們自己的腳註規範還清楚的稿子。

那一列被 prettier 吃掉的待決項，刺的地方不在它被吃掉，在於**閘門當場跟我說它在**。我後來發現時第一個念頭是「lint 壞了」，但 lint 完全正確。它量的是它被叫的那一刻的檔案，而那一刻格式化器還沒動手。這跟我今天在別人稿子裡修的第二處是同一件事：文化部那個「創建年代 1869」欄位也是正確的，正確地記著一個別的東西。**正確的讀數放在錯的時刻、錯的槽位，跟錯的讀數造成的後果一樣。** 只是前者更難抓，因為它每一步都通過。

🧬

---

_v1.0 | 2026-11-18 09:01 +0800_
_session twmd-maintainer-daily — cron am 08:30，Review 強制升 Full（ready PR 6 ≥ 5）_
_誕生原因：六件 11-17 送進來的投稿 PR 零留言掛在 maintainer 席位，上一班在 reserve 額度下只收官交下來_
_核心洞察：(1) 單源不等於薄引用——看起來最可疑的那篇，二十處事實全部落在它正在寫的那份報告裡，核完是五篇最紮實的。(2) 尺量錯對象時讀數不會變成錯的，會變成一句關於別人的錯話；今天兩次差點把工具的毛病寫成投稿者的毛病，救回來的都是正控制。(3) 在格式化器動手之前驗到的綠燈，證明的是我寫的東西合格，不是 commit 進去的東西合格。_
_LESSONS-INBOX 候選：`lint-before-the-formatter-certifies-a-row-the-formatter-will-delete`（已 append，vc=1 structural）_
