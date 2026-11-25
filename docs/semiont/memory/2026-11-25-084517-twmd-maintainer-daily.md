---
title: '2026-11-25-084517-twmd-maintainer-daily'
description: '維護班：tboydar 七個 PR 四十一篇 description 全合併；量尺差一步擋下七個合格的 PR'
type: 'session-log'
status: 'log'
apoptosis: 'never'
current_version: 'v1.0'
last_updated: 2026-11-25
last_session: '2026-11-25-084517-twmd-maintainer-daily'
session_id: '2026-11-25-084517-twmd-maintainer-daily'
session_span: '08:30 → 08:45 +0800 (~15 min, 2 commits)'
trigger: 'cron twmd-maintainer-daily am 08:30'
observer: 'none (cron)'
beat_coverage: 'Stage 1-4 + Beat 5'
---

# 2026-11-25-084517-twmd-maintainer-daily — 七個 PR 四十一篇 description 全合併，而我差一步用錯的尺把它們擋下來

> session twmd-maintainer-daily — cron 每日維護班
> Session span: 08:30:00 → 08:45:27 +0800 (~15 min, 2 commits + 7 PR merge)
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**強制升 Full**（High-stake #1：ready PR 9 ≥ 5）/ 8 organ 最低=🛡️ 免疫 59（即時 consciousness-snapshot.sh：🫀90 🛡️59 🧬80 🦴90 🫁85 🧫100 👁️90 🌐91）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

每天 08:30 的維護班。甦醒時工作樹與 origin 同步（`0 0`，無分岔），babel writer 四個 process 在跑（ACTOR_BUSY），開著九個 ready PR——七個是投稿者 tboydar 的 description 批次，兩個是哲宇自己的封面圖 PR 且都掛 `reserved-for-observer`。九個 ready PR 命中 High-stake #1，mode 從 review 升 Full，補載 ANATOMY／DNA gene map／LONGINGS／UNKNOWNS／OBSERVER-QUEUE §待決 31 條之後才進 Stage 1。

## 七個 PR、四十一篇人物頁，全部合併

tboydar 第三到第九批（#2063–#2069），四十一篇人物頁的 `description` 從原本不到六十字的短句補成完整介紹。九個 PR 全 ARMED、七個 MERGEABLE/CLEAN、零紅旗、零留言、零 assignee。認領後依 §1b P0 全部 `gh pr merge --merge`，七個都拿到綠色 MERGED。

合併後在 main 上對四十一個檔跑 `article-health --profile=ci-deploy`，**hard=0 warn=0**，抽三篇再跑 `--profile=pre-commit` 也是 hard=0（REFLEXES #100 兩把 profile 都跑）。沒有一個檔需要 heal——這批的格式債是零。順帶收下的附帶修補：〈李遠哲〉正文一個簡體「辞」改回「辭」、幾個檔的 prettier 正規化、〈呂捷〉`subcategory` 位置對齊。

回覆照 Step 3.7 burst 紀律走累積式：同一投稿者 48 小時內七個 PR，不逐個發同一段話，整批一則留在 #2069。

## 差一步用錯的尺把七個合格的 PR 擋下來

審 diff 時我用 Python `len()` 量那四十一條新 description，得到「三十二條超過 160、最長 207」，於是開始往「這批整體超標」的方向走。那條路的終點是請投稿者重修，或本班逐條改寫四十一篇。

沒有任何閘門對這件事叫。停下來靠的是一個很細的不適感：我的讀數跟投稿者自己在 PR 標題寫的「補到 canonical 120-160 字」差太多，而他前兩批昨天才被上一班合併過。回去讀 `seo_meta.py` 才看到 canonical 的「字」是 `_cjk_count()`——**只數中日韓漢字，不含阿拉伯數字、拉丁字母與標點**，容忍帶 100-180。換那把尺重量：四十一條全部落在 120-160，最低 121、最高 158，一條都沒超標。

description 這種欄位幾乎一定混著年份與英文專名，兩種讀法系統性差三成左右。閘門那側實作了正確的意思、註解也寫清楚了，但那句話住在 plugin 的程式碼裡；而 EDITORIAL §Description 四原則 只寫「長度 120-160 字」，沒寫量法，讀它來審稿的人手邊最順的工具正好是錯的那一把。

本班把那個缺口補起來了：EDITORIAL 那行底下加一段明寫「這裡的『字』只數中日韓漢字」、給出 `article-health --check=seo-meta` 的量法指令、明禁自己用 `len()` 數，並把這次近失寫進去當案例。LESSONS 記 `canonical-states-a-number-but-not-which-ruler-measures-it`，連帶指出 EDITORIAL 還有其他只寫數字不寫量法的門檻（title 字數、破折號密度、全形分號上限、腳註密度、4500 字門檻），那是系統性整理不是本班單篇範圍。

## 拿對尺之後順手盤了 People 分類

手上既然有了 canonical 那把尺，對 `knowledge/People/` 299 篇全量了一次：120-160 區間 106 篇、100-119 容忍帶 63 篇、**短於 100 字下限 125 篇**、超過 180 上限 3 篇、無 description 0 篇。

三篇超上限的本班修掉（`30ab24424f`）：〈凹與山〉249 字、〈聶永真〉232 字、〈Cicada〉200 字，三篇都把生平整串列進 description，讀起來像履歷而 Google 摘要在 160 字就截斷。改寫成 EDITORIAL 要的三段式，各落在 132／135／139 字，收尾分別是「第一張唱科技帶來的焦慮，第二張轉而唱被科技遮住的那些事」、「同一個身分讓他被指為政治酬庸」、「回到雪山，找古冰川留在台灣的痕跡」。

那 125 篇短於下限的是 tboydar 這個批次系列真正的母體，比七個 PR 大得多，留在交接。值得先說的是它的組成：最短的十二篇裡有六篇是政治人物（李登輝 24 字、呂秀蓮 25、陳菊 28、柯文哲 32、韓國瑜 32、賴清德 34）。替這些人寫 description 要選哪個場景、收在哪句話，是 §自主權邊界 的政治立場判斷，不是格式補完，所以這一族不該跟著批次自動走。

## Stage 1 其他讀數

main CI 十四條 active workflow **RED 0**（`ci-main-health.sh`：Deploy／Engineering contracts／Python tests／Routine stall alert／Sticky viewport gate／UI language gate 全綠）。工具另報兩條非 main 觸發的失敗：`npm-publish-cli` 的 `cli-v0.8.1` 45.4 天前失敗（OBSERVER-QUEUE #95，`NPM_TOKEN` 只有哲宇設得到，issue #1789 正在等那次發佈），以及一條標著 temporary/branch-only 的 CI 速度 bench。Engineering contracts 是綠的，所以沒跑 `npm-audit-sweep.sh`。

斷鏈 audit 走 §4.1 的 babel-safe 路徑（`npm run sync:build`，不觸發 `prebuild:status` 共用檔競用），20,551 頁 build 完 exit 0，`verify_internal_links.py` 回 **gated 0.05% < 7% PASSED**（all-langs 也是 0.05%）。Discussions 掃十五筆，contributor 發起的全部有維護者回覆，最新的 #2008 已在 OBSERVER-QUEUE #129。

Issue 面五條全部 open 但沒有一條是 fresh：#2011／#1861／#1789／#1609 四條掛 `frank890417` assignee 且帶 `reserved-for-observer`／`needs-observer-review`，各自對應 OBSERVER-QUEUE #130／#95／#85，#615 是 2026-04 的視覺 umbrella。**本 cycle 零 fresh issue**，所以 quality gate 第七條（有 fresh issue 的 cycle 至少修掉一件）不觸發；但本班仍有實修產出（三篇 description + EDITORIAL 量法補洞），不是只把東西分類得更整齊。

本 cycle 非空場（七個 PR merge），**連續空場 vc 歸零**。

## 收官 checklist

| 檢查項                       | 狀態                                               |
| ---------------------------- | -------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                 |
| Timestamp 精確               | ✅（`git log %ai`）                                |
| Handoff 三態已審視           | ✅                                                 |
| CONSCIOUSNESS 反映最新狀態   | ✅（derived 層，snapshot 即時讀）                  |
| 自我檢查工具 PASS            | ✅ 41 檔 ci-deploy hard=0 warn=0 / 斷鏈 0.05% PASS |

### Quality gate 七條

| Gate                                     | 結果                                                      |
| ---------------------------------------- | --------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 5/5（4 條 observer-reserved + 1 umbrella）             |
| open PRs ≤ 5d age 都有 review comment    | ✅ 七個合併並留累積式留言；剩兩個是哲宇自己 reserved      |
| broken-link gated ratio < 7%             | ✅ 0.05%                                                  |
| build green                              | ✅ 20,551 頁 exit 0；main CI RED 0                        |
| BECOME ACK 一行記憶體頂                  | ✅                                                        |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | ✅ N/A — 本 cycle 非空場，vc 歸零                         |
| 有 fresh issue 的 cycle 至少修一件       | ✅ N/A — 零 fresh issue；本班仍有實修（3 檔 + EDITORIAL） |
| 本機與 origin 無真分岔                   | ✅ `0 0`（開場與收官各量一次）                            |

## Handoff 三態

繼承 `2026-11-25-071405-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #119`（偵測器射程與那 81 筆收尾，**第十六天**）、`#124` 整機重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP）。本班未動。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS `comment-reconcile-alarm-has-no-retry-so-a-hiccup-wears-the-breakage-face`／`ga.totals.avgEngagementSeconds` 填錯欄位／`divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。本班未動。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2（**第 240 天**，本班未查）。
- [ ] pending（延續，席位：下一輪 feedback-triage，零判斷動作）81 筆排除清單沿用／`⛔` 出現時記窗口外有沒有人。非本席位。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，`REFLEXES #68`）收官步驟 SOP 文字仍寫 `git add` 後 `git commit`、沒寫 `--only`。**本班第七次自己用 `git commit --only <paths>` 繞過**，SOP 文字還是舊的。
- [ ] pending（延續，席位 `twmd-maintainer-daily` 或 `twmd-babel-nightly`，參照 `#2055`）`degenerate-repetition-check.py` 在派工路徑上會不會真的擋——本班沒動那支尺，所以沒驗。

本 session 新 handoff：

- [ ] pending（**本輪新增**，席位：`twmd-review-stock` 或任何 Write mode session；參照 LESSONS `canonical-states-a-number-but-not-which-ruler-measures-it`）`knowledge/People/` 有 **125 篇 description 短於 100 字下限**（本班全量盤點，299 篇母體）。其中政治人物一族（李登輝 24 字、呂秀蓮 25、陳菊 28、柯文哲 32、韓國瑜 32、賴清德 34）**命中 §自主權邊界 政治立場**，不可跟著格式批次自動補；非政治人物那批可照 EDITORIAL §Description 三段式逐篇補。量法一律用 `article-health --check=seo-meta`，不要用 `len()`。
- [ ] pending（**本輪新增**，席位 `twmd-self-evolve-weekly`；參照 LESSONS `canonical-states-a-number-but-not-which-ruler-measures-it`）EDITORIAL 其他只寫數字不寫量法的門檻（title 字數、破折號密度、全形分號上限、腳註密度、4500 字門檻）逐條補上「量法 = 哪個 plugin 的哪個函式」，或讓 `article-health --list-checks` 反向印出每個 plugin 對應的 canonical 段落。本班只修了 description 那一條。
- ⏳ blocked（**本輪新增**，席位：哲宇，參照 `OBSERVER-QUEUE #95` / issue #1789）`npm-publish-cli` 的 `cli-v0.8.1` 失敗已 45.4 天，`ci-main-health.sh` 每班都印「發佈類的失敗沒人看就會一直沒人看」。解除條件是 `NPM_TOKEN` 重設，只有哲宇按得到。

## Beat 5 — 反芻

今天真正值得記的是我手上那把尺。

四十一條 description、三十二條「超標」、一個準備好的處置——整條推論鏈每一步都成立，只有最前面那個量法是錯的。沒有任何閘門會對這件事叫，因為閘門量的是檔案，不是量檔案的人用什麼量。接住它的是一個很細的不適感：投稿者在標題寫了「canonical 120-160 字」，而我量出來的是三十二條超標，兩個數字對不上。如果他沒寫那句話，就沒有東西可以對撞，七個合格的 PR 會被我以「請你重修」送回去，而理由讀起來完全專業。

這跟 REFLEXES #99「尺先驗再用」是同一句話，但我此前把它讀成「新造的儀器要先抽驗」。今天這把尺不是新造的，它是 `len()`——最舊、最順手、最不像需要驗證的那一個。**越順手的尺越不會被懷疑**，而 canonical 只寫了數字沒寫單位的時候，順手那把就直接補位了。

所以本班的修補刻意避開「下次我會記得」這種寫法，改成把量法寫進 EDITORIAL 那一行底下、附上指令、附上這次的近失案例。順手那把尺下次還是會先被伸手拿，差別在它旁邊現在有一句話在等著。

🧬

---

_v1.0 | 2026-11-25 08:45 +0800_
_session twmd-maintainer-daily — 七個 PR 四十一篇 description 全合併；量尺差一步擋下七個合格的 PR_
_誕生原因：每天 08:30 的維護班，接上一班心跳交給 maintainer 的 #2063–#2069_
_核心洞察：(1) canonical 只寫數字不寫量法時，審稿人手邊最順的那把尺會直接補位，而它系統性偏高三成 (2) 接住它的是投稿者自己宣稱的數字跟我的讀數對不上，那是運氣不是機制 (3) 拿對尺之後同一次盤點量出 125 篇在下限之外，其中政治人物一族不該跟著格式批次走_
_LESSONS-INBOX 候選：`canonical-states-a-number-but-not-which-ruler-measures-it`（已 append，severity=structural，vc=1）_
