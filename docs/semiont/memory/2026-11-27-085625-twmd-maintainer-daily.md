---
title: '2026-11-27-085625-twmd-maintainer-daily'
description: '維護班：四批 description 合併、政治人物那批保留進佇列；嘉義市六處方位與交通勘誤；11-19 那班追不到的死連結，追到了'
type: 'session-log'
status: 'log'
apoptosis: 'never'
current_version: 'v1.0'
last_updated: 2026-11-27
last_session: '2026-11-27-085625-twmd-maintainer-daily'
session_id: '2026-11-27-085625-twmd-maintainer-daily'
session_span: '08:30 → 09:05 +0800'
trigger: 'cron twmd-maintainer-daily am 08:30'
observer: 'none (cron)'
beat_coverage: 'Stage 1-4'
---

# 2026-11-27-085625-twmd-maintainer-daily — 四批合併、一批保留，而前一班寫下的死路讓我一次就追到源頭

> session twmd-maintainer-daily — cron 每日維護班
> Session span: 08:30 → 09:05 +0800
> 資料來源：`git log %ai` + `gh pr list` + `verify_internal_links.py`

✅ BECOME ack: mode=review→**強制升 Full**（High-stake #1：ready PR 7 ≥ 5）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`：🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐91；最大缺口 review_coverage=17.4）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

**甦醒讀取的誠實記錄**：`wake-context.py` 的 267,917 bytes／1,419 行**整份讀到 `wake:END` sentinel**，無 head/tail 節選，13 項 selftest 全綠。Full 升級後補載 HEARTBEAT 全檔（237 行）、LONGINGS 全檔、OBSERVER-QUEUE §待決 31 條、CONSCIOUSNESS §警報（已 derived 化，只剩 pointer）、LESSONS §未消化標題、MAINTAINER-PIPELINE 全 1,730 行、CORRECTION-PIPELINE 前 215 行。**ANATOMY／DNA gene map／UNKNOWNS／ARTICLE-INBOX／SPORE-INBOX 只到標題層沒有全讀**——本班產出落在 PR triage、一篇文章勘誤與一條死連結上，那五檔沒有進入任何判斷，但照 §Step 2-7 字面要求這是缺的一塊，寫在這裡而不是讓 ACK 看起來像整套載完（延續 11-26 同席位的寫法）。

## 觸發

每天 08:30 的維護班。開場工作樹與 origin 同步（`0 0`），babel dispatcher 活著（ar／ru 兩篇在翻，87 個 dirty 檔全是它的），七個 ready PR、零 draft。七個 ready 命中 High-stake #1，mode 從 review 升 Full。班中 origin 多出一個心跳 commit（`7bc4555fdf`），讀數變 `0 1` 純落後，不是分岔。

## tboydar 第十六到二十批：四批合併，第十八批保留

五個 PR（#2076-#2080）、二十五篇人物頁 description，全 `ARMED`／`maintainerCanModify=true`／零 label／零留言。十條紅旗機械面逐條過：零 pure-delete、零非 `knowledge/` 路徑、零 workflow／robots／scripts 改動、`author` 偽造與 `featured: true` 與 placeholder 殘留與虛構內部來源全零命中。

**四批合併**（#2076 `eb3e480537`／#2077 `fca2ac82b6`／#2079 `7da6c14627`／#2080 `9d2a1a62af`），二十篇。量尺照 canonical 那把（`_cjk_count`）：二十條新 description 全落在 120-160 帶內（121-140），舊值 82-95 全在 100 字下限以下，是真缺口。合併後在隔離 worktree 對二十個檔跑兩把 profile，**20/20 hard=0**，格式債零、不需 heal。

**#2078 保留**，掛 `reserved-for-observer`，進 [OBSERVER-QUEUE](../OBSERVER-QUEUE.md) #132。那批是呂秀蓮、李登輝、蔣經國、孫運璿、鄭成功，機械面同樣乾淨（120-137 字、兩把 profile hard=0、紅旗零命中），爭點不在品質：**11-26 同席位在 #2075 的留言裡已經公開寫明政治人物這一族「不是格式補完而是編輯立場判斷，維護流程把這一族保留下來、不跟著格式批次走」，點名清單含李登輝與呂秀蓮**——這批前兩篇正在上面。那則留言寫在 2026-11-26T00:40Z，#2078 建立於 10:22Z，**晚 9.7 小時**，標題自註「嚴格中立」，看得出投稿者讀到了那則留言並試著回應它。

但中立不解除保留：[MANIFESTO §信念 1](../MANIFESTO.md) 寫的是「維基百科追求中立，我追求真實。中立和真實不是同一件事」。最清楚的是〈蔣經國〉，原本 description 是「既是戒嚴體制的掌舵者，也是晚年啟動解嚴與政治開放的人；理解這個矛盾，才能看見台灣民主不是誰恩賜的終點」，新版換成任內年表，美麗島事件與江南案寫成「任內⋯⋯歷經」。兩個版本事實都對，選哪一個是這個站怎麼講威權時期的問題。

**這次補上了 label。** 11-26 那班的判定只寫在散文裡、沒掛 label——那正是 v2.16 立 `reserved-for-observer` 要防的失效方式（LESSONS `every-mechanical-gate-green-while-the-ruling-lived-in-the-comment-thread`，10-08 那次就是這樣合併掉 #1782／#1784）。本班如果只跑機械閘門，二十五篇會一起合併進去，而五條 gate 全部會是綠的。接住它的不是任何閘門，是 Step 3.0「認領的同一口氣讀留言串」。

回覆照 Step 3.7 burst 紀律走累積式：四批合併寫一則留在 #2080（致謝＋技術說明＋量尺讀數），#2078 單獨一則說明保留與兩條現在就能走的路（〈孫運璿〉〈鄭成功〉不在當代黨派光譜上，拆獨立 PR 可照非政治批次審；非政治庫存約 125 篇仍開放）。兩則都沒有把決定歸給哲宇、沒有給時程（2026-11-17 哲宇 callout）。

## 嘉義市：讀者點八處，六處確認並修（`248b97a9e5`）

issue #2082，讀者 J.H. Wang（在地、做地方創生）。走 CORRECTION-PIPELINE，先 falsify callout 再修：

- **方位錯三個**（最嚴重，而且是收尾那段的修辭骨架）。原文「從圓環往北看是嘉義火車站／往東看是菸酒公賣局與美術館／往南看是文化路夜市／往西看是阿里山林業鐵路」。查證：嘉義市立美術館（前菸酒公賣局嘉義分局）地址**西區廣寧街 101 號**、離車站步行三到五分鐘，所以車站與美術館**都在西邊**；北門驛地址**東區共和路 428 號**，在東／東北。只有「往南是文化路夜市」是對的（夜市範圍民權路中央廣場以南至垂楊路文化公園以北，約 500 公尺）。整段改寫成沿街走的方向。這是 §神經迴路「場景推導錯」的方向家族（龜山島同型）：四個方位是為了湊「四個方向，四段歷史」的結構生出來的。
- **本文自己早就前後不一致**：第 129 行寫美術館在「中央噴水池東南方」，第 158 行寫「往東看」，兩個都跟地址對不上。讀者沒點名，連帶修掉（CORRECTION §清單外連帶修）。
- 車站到噴水池原寫「出站走一百公尺」→ 改「沿中山路往東走十來分鐘」（讀者說約 900 公尺，但查無可引用的精確公尺數，所以不寫數字）。
- 高鐵接駁原寫「約 15 分鐘」→ 改「BRT 車程約 20 到 40 分鐘」並補腳註 `[^23]`。
- 圓環出口原文斷言「（四個）」，讀者說五處 → 查無可引用來源，照「無法溯源不寫」把數字拿掉。

三處是補充不是勘誤（木業軸帶房舍窄長型、府展報導日期 1938-10-20、林玉山出生地今址），一處待查證（嘉農原校址今為嘉義高商），全部寫進 issue 留言與交接。

## 火雞肉飯：評估後沒改，但查出兩件事（issue #2081）

讀者說嘉義是把全雞**泡熟**後才分切，所以肉不柴、不存在「柴才掛得住醬汁」。本文第 89-93 行確實就是那個框架。兩個發現：(a) 支撐它的 `[^7]` 是**飲料品牌部落格**（麒麟樂飲誌），腳註描述還寫得很泛，拿它撐一個具體烹調技術 claim 權威性不足；(b) **本文第 62 行自己就有對不上的資料**——林聰明「溫體現宰、烹煮至少 12 小時」，長時間低溫烹煮跟讀者的描述同向、跟「偏柴」反向，而這個不一致在讀者點名前就存在。

**沒翻案的理由寫清楚**：讀者舉證是「我本人，家裡有人從事雞肉飯販賣」，是在地從業者一手知識、正是 REFLEXES #16 說讀者抓得到那一層，可信度高；但同一條反射也說讀者是線索不是來源，把一篇文章的核心解釋從 A 翻成 B 要跨三個獨立來源，不能用單一口述換掉單一部落格。本輪沒跑完三源，所以不動它比寫一個同樣沒查證的新版本好。交接寫了要查的三件事與修的範圍（第 89-93 整段因果加 `[^7]` 換源）。

## 清治英文版：讀者問得對，但不在本席位 heal 範圍（issue #2083）

讀者 lawrenceho306 問英文版那句 `providing the foundation for the formation of Taiwan's later society and culture`——清治前中期行政極薄、沒有國家級公共教育，「奠下基礎」是透過什麼？問題站得住。但兩個結構理由讓它不在維護班：zh 是 SSOT（只改英文下次同步被蓋掉，而且同一 claim 活在十三語），而且這是 claim 改寫不是勘誤（§1c 寫明改 zh SSOT 實質走 REWRITE）。**已實際落 [ARTICLE-INBOX](../ARTICLE-INBOX.md) EVOLVE 條目**（P1，含建議切角與必驗事實），不是只在留言裡說要落——留言說了就要做，否則是「登記不是進度」的反面版。

## 11-19 那班追不到的死連結，追到了（`1dad1f36ce`）

斷鏈 audit 殘留的 18 個 unique target 裡有一條 `/people/黃少雸`（`雸` U+96F8，正解 `黃少雍` U+96CD，文章一直都在）。11-19 那班追了三輪沒追到，**並把死路誠實記進 memory**：全 repo grep `黃少雸` 只命中它自己那份 memory、grep 單字 `雸` 只多命中注音對照表的正常字條、`exams.astro` 裡 `people` 零命中，並留下下一步「從 `dist/exams/index.html` 反查產生它的元件」。

本班照那一步走，一次到位：源頭在 `src/templates/gsat.template.astro` 四處，而那個檔**把 href 存成 `'/people/%E9%BB%83%E5%B0%91%E9%9B%B8'`——整串裡沒有一個 CJK 字元**，所以搜任何中文字都不可能命中。四處一起改完。

那三輪不是偷懶，每一步都合理；失敗是因為搜尋空間被「它會以中文字存在」這個前提縮掉了，而這個前提在 `knowledge/` 幾乎永遠成立、在 `src/` 的連結欄位幾乎永遠不成立。**同一個 repo 的兩個區域對同一個字串有兩種慣例，而搜尋的人只帶了一種。** LESSONS 記 `the-string-i-searched-for-has-two-spellings-in-one-repo`。這條能一次落地的直接原因是前一班把死路寫下來了——誠實記下沒追到什麼，比記下追到什麼一樣有用。

## Stage 1 其他讀數

main CI 十四條 active workflow **RED 0 / BLOCKED 0 / UNKNOWN 0 / NEVER-ON-MAIN 0**。Engineering contracts GREEN，所以照 Step 1.5c 沒跑 `npm-audit-sweep.sh`。兩條非 main 觸發的失敗照舊：`npm-publish-cli` 的 `cli-v0.8.1`（47.4 天，OBSERVER-QUEUE #95 `NPM_TOKEN` 只有哲宇設得到，issue #1789 在等）、一條標 branch-only 的 CI 速度 bench。

`pr-ci-armed.sh` 掃七個 open PR：**UNARMED 0 / NO-WORKFLOW 0**。

Discussions 掃十六筆，contributor 發起的全部有維護者回覆，無 >48hr 零回應。#2008（idlccp1984）已在 OBSERVER-QUEUE #129。

Issue 面：**三條 fresh**（#2081-#2083，今晨 07:13 由 feedback-triage 開），所以 quality gate 第七條觸發且已滿足（一件修掉並附 commit、兩件寫明判斷與下一步）。其餘 #2011／#1789／#1609 掛 observer-reserved、#1861 是 routine-stall 追蹤、#615 是視覺 umbrella。

斷鏈 audit 走 §4.1 babel-safe 路徑（隔離 worktree 補 `fork-graph.json`／`git-info.json` 兩個 gitignored 衍生檔後 `npm run sync:build`），**20,552 頁 exit 0 / 2m08s**，`verify_internal_links.py` 回 **gated 0.05% < 7% PASSED**（all-langs 也 0.05%）。在 babel 滿載時跑，零碰撞。

`slug-gap-check` N/A：二十個檔全是 modification，零 `A` 行。

**量尺自己先驗過**（REFLEXES #99）：第一次跑 article-health 批次時用 `grep -oE 'hard=[0-9]+' | head -1` 取讀數，正控制（故意寫壞的 stub）也回 hard=0 —— 那個 grep 取到的是**第一個 per-check 行**不是 `Summary:` 行。改讀 `Summary:` 後正控制回 `hard=10 passed=False`，真實二十檔才敢引用。另外第一次收集檔案清單用 `git show --name-only` 對 merge commit，回 1 筆（merge commit 預設不列檔），那一輪的「0/20 全綠」是**量在空集合上**——跟 §神經迴路「掃到 0 檔不可以回答乾淨」同型，改 `git diff --name-only <base> <head>` 才拿到 20 筆。本班兩次在同一支工具上踩到「讀數看起來合理但來源錯」，都在引用前攔下。

本 cycle 非空場，**連續空場 vc 歸零**。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅（`git log %ai` + `gh pr view mergedAt`）           |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（derived 層，snapshot 即時讀）                     |
| 自我檢查工具 PASS            | ✅ 20 檔 × 兩 profile hard=0；嘉義市兩 profile hard=0 |

### Quality gate 八條

| Gate                                     | 結果                                                                         |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 8/8（三條 fresh 本班認領＋3 observer-reserved＋routine-stall＋umbrella）  |
| open PRs ≤ 5d age 都有 review comment    | ✅ 四個合併並留累積式留言；#2078 留保留說明；#2033／#2036 是哲宇自己的       |
| broken-link gated ratio < 7%             | ✅ 0.05%（all-langs 也 0.05%），走 §4.1 babel-safe `npm run sync:build`      |
| build green                              | ✅ 20,552 頁 / 2m08s / exit 0；main CI RED 0                                 |
| BECOME ACK 一行記憶體頂                  | ✅（含縮減讀取的誠實記錄）                                                   |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | ✅ N/A — 本 cycle 非空場，vc 歸零                                            |
| 有 fresh issue 的 cycle 至少修一件       | ✅ 三條 fresh：#2082 修掉六處（`248b97a9e5`），#2081／#2083 寫明判斷與下一步 |
| 本機與 origin 無真分岔                   | ✅ 開場 `0 0`；班中 `0 1` 純落後（別班的心跳 commit），非分岔                |

## Handoff 三態

繼承 `2026-11-27-071316-twmd-feedback-triage.md` 與 `2026-11-26-084332-twmd-maintainer-daily.md`：

- [x] ~~retired by 本班 — 斷鏈 audit 殘留的 `/people/黃少雸`（11-19 那班追三輪未果並留下死路與下一步）：照它留的下一步從 `dist/exams/index.html` 反查，源頭在 `gsat.template.astro` 四處 percent-encoded href，已修 `1dad1f36ce`~~
- ⏳ blocked（延續，席位：哲宇）**`OBSERVER-QUEUE #132`（本輪新增）** 政治人物 description 要不要收、「嚴格中立」算不算答案（#2078 掛 `reserved-for-observer` 等這一格）。另 `#119`（**第十八天**）、`#124` 整機重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`、`#130`、`#95`（`NPM_TOKEN`，`cli-v0.8.1` 已 47.4 天）。本班未動。
- [ ] pending（**本輪新增**，席位 `twmd-review-stock` 或任何 Write mode session，參照 issue #2081）嘉義火雞肉飯第 89-93 行的因果解釋要走 FACTCHECK Quick Mode：查 (a) 嘉義業者處理全雞的主流工法（泡熟／蒸煮／水煮）(b)「原湯化原食」把泡雞高湯兌成淋醬與湯底 (c) 現行「粗纖維吸汁／土雞掛不住醬汁」在可靠來源站不站得住。**本班已查到的兩條起點**：`[^7]` 是飲料品牌部落格、權威性不足；本文第 62 行林聰明「烹煮至少 12 小時」跟「偏柴」框架對不上。修的範圍是整段因果加換源，不是改形容詞。
- [ ] pending（**本輪新增**，席位：任何 Write mode session，參照 issue #2082）嘉義市剩四件：三處補充（木業軸帶房舍窄長型、府展報導日期 1938-10-20 需可引用來源、林玉山出生地今址成仁街與民樂街口）＋一處待查證（嘉農原校址今為嘉義高商、訓練球場今為市立棒球場，本文第 108 行寫的是「原校址旁的棒球場現在是 KANO 園區」，機構沿革與校地今址是兩件事）。
- [ ] pending（**本輪新增**，席位 `twmd-rewrite-daily` 或 Write mode，已落 ARTICLE-INBOX，參照 issue #2083）清治英文版「奠下基礎」的 claim 改寫，從 zh 動再讓 babel 帶下去。修完回頭 close #2083，並由真人對回報者發出回覆。
- [ ] pending（**本輪新增**，席位 `twmd-self-evolve-weekly`，參照 LESSONS `the-string-i-searched-for-has-two-spellings-in-one-repo`）`verify_internal_links.py` 的 broken target 目前只印 decoded 中文路徑，而可以 grep 到的是 encoded 那串。同時印兩種寫法即可讓下一個人複製得到命中的那一串。報表面輸出格式，不碰判準與閾值。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）讓 babel-dispatch 開機時對它呼叫的每一支閘門驗一次 exit code 語意符合契約。11-26 只修了 `degenerate-repetition-check` 一支，其餘五支（verify-translation／leak／health／currency／magnitude）**仍未驗過它們的非零 exit 是不是也混了「尺壞了」**。本班未動。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS `comment-reconcile-alarm-has-no-retry...`／`ga.totals.avgEngagementSeconds` 填錯欄位／`divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`／`window-delay-reading-measures-cadence-not-window-cost`／EDITORIAL 其他只寫數字不寫量法的門檻。本班未動。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2（**第 241 天**）。11-26 那班已查過出處（pip.moi.gov.tw E1050），最新一期就是 115Q1、41.46%，Q2 尚未發佈。下一班不必再盲查，記「出處仍無 Q2」即可。另資料台灣 9 個指標過期（`data-hub-check.py --stale`）。
- [ ] pending（延續，席位 `twmd-review-stock` 或任何 Write mode session）`knowledge/People/` 125 篇 description 短於 100 字下限。**本輪縮減**：非政治人物那批今天又收掉二十篇。政治人物一族（含陳菊、柯文哲、韓國瑜、賴清德）現在綁在 `OBSERVER-QUEUE #132` 上，不可跟著格式批次自動補。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，`REFLEXES #68`）收官步驟 SOP（pipeline §Step 4.3／薄殼 skill §收官）寫 `git add` 後 `git commit`，沒寫 `--only`。**本班第九次自己用 `git commit --only <paths>` 繞過**（babel 同時握著 87 個 dirty 檔，不用 `--only` 會把它的工作一起帶走），SOP 文字仍是舊的。
- [ ] pending（延續，席位：下一輪 feedback-triage，零判斷動作）81 筆排除清單沿用／`⛔` 出現時記窗口外有沒有人並記 `created_at` 落在上一輪之前或之後。非本席位。
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07～11-17 沉默十天的根因（已定位兩場整機停電，`#124` 重開機仍未做）。
- [ ] pending（延續，席位：下一輪任何讀 divergence 的班，零判斷動作）先跑 `git merge-tree` 再決定要不要啟動 12 步，不要憑 `A B` 兩個數字直接進分岔修復。**本班讀數**：開場 `0 0`、班中 `0 1` 純落後，未觸發。

本 session 新 handoff：五條新增（火雞肉飯三源查證、嘉義市剩四件、清治 claim 改寫、死連結報告印兩種拼法、OBSERVER-QUEUE #132），一條 retire（黃少雍死連結源頭已追到並修）。
