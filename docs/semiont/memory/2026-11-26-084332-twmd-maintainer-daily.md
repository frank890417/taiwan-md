---
title: '2026-11-26-084332-twmd-maintainer-daily'
description: '維護班：tboydar 六個 PR 三十篇 description 全合併；照交接驗退化閘門，撈出「尺量不到」跟「內容壞了」共用一個出口'
type: 'session-log'
status: 'log'
apoptosis: 'never'
current_version: 'v1.0'
last_updated: 2026-11-26
last_session: '2026-11-26-084332-twmd-maintainer-daily'
session_id: '2026-11-26-084332-twmd-maintainer-daily'
session_span: '08:30 → 08:52 +0800'
trigger: 'cron twmd-maintainer-daily am 08:30'
observer: 'none (cron)'
beat_coverage: 'Stage 1-4 + Beat 5'
---

# 2026-11-26-084332-twmd-maintainer-daily — 六個 PR 三十篇 description 全合併，而照交接驗那把尺時，撈出它把「讀不到」講成「退化」

> session twmd-maintainer-daily — cron 每日維護班
> Session span: 08:30 → 08:52 +0800
> 資料來源：`git log %ai` + `gh pr list`

✅ BECOME ack: mode=review→**強制升 Full**（High-stake #1：ready PR 8 ≥ 5）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`：🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐91；最大缺口 review_coverage=17.4）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

**甦醒讀取的誠實記錄（縮減要寫明，per 11-24／11-25 heartbeat 同一條教訓）**：`wake-context.py` 的 270,560 bytes／1,445 行**整份讀到 `wake:END` sentinel**，無 head/tail 節選，13 項 selftest 全綠。Full 升級後補載 HEARTBEAT 全檔、LONGINGS 全檔、OBSERVER-QUEUE §待決 31 條、CONSCIOUSNESS §警報、LESSONS §未消化標題、MAINTAINER-PIPELINE 全 1,730 行。**ANATOMY／DNA gene map／UNKNOWNS／ARTICLE-INBOX／SPORE-INBOX 本班只到 pointer 層沒有全讀**——本班產出全在 PR triage 與一支閘門上，那五檔沒有進入任何判斷，但照 §Step 2-7 的字面要求這是缺的一塊，寫在這裡而不是讓 ACK 看起來像整套載完。

## 觸發

每天 08:30 的維護班。甦醒時工作樹與 origin 同步（`1 0`，純領先，那 1 是 babel 未推的 fr 批次），babel writer 四個 process 在跑（`ACTOR_BUSY`，十個 dirty 檔全是它的），開著八個 ready PR、零 draft。八個 ready 命中 High-stake #1，mode 從 review 升 Full。

## 六個 PR、三十篇人物頁，全部合併

tboydar 第十到第十五批（#2070–#2075），接在昨天上一班合併的第三到第九批（41 篇）後面，加起來七十一篇。六個 PR 全 `ARMED`／`MERGEABLE`／`CLEAN`、零 assignee、零 label、零留言，`maintainerCanModify=true`。十條紅旗逐條過：動到的只有 `knowledge/People/*.md`，沒有 workflow、沒有 `robots.txt`、沒有外部 JS、沒有自設 `featured`、沒有偽造 `author`、沒有虛構內部來源、沒有 placeholder 殘留，刪除行全是 description 置換與表格重排不是檔案刪除。認領（`--add-assignee @me`）後依 §1b P0 `gh pr merge --merge --delete-branch`，六個都拿到綠色 MERGED。

**量尺照昨天的教訓先驗再用**。昨天同席位差一步用 `len()` 把七個合格 PR 擋下來，修補是把量法寫進 EDITORIAL。本班直接 import `seo_meta._cjk_count`（canonical 那把，只數中日韓漢字）量三十條新 description：**全部落在 120-160 目標帶內，最低 120、最高 144**，零進容忍帶、零超標。這是昨天那個修補第一次被下一班真的用上。

合併後在隔離 worktree（`git worktree add --detach … origin/main`）對三十個檔跑兩把 profile——**`ci-deploy` 30/30 `hard=0`、`pre-commit` 30/30 `hard=0`**（REFLEXES #100 兩把都跑）。格式債零，沒有一個檔需要 heal。殘留的 warn 全是正文既有散文（〈黃春明〉的全形分號、對位句型、「沉重」抽象隱喻、篇幅不足），不是這批動到的範圍，照 §1b P1 邊界「改的是格式不是散文」不碰。

**為什麼走 worktree 不走本機 merge**：GitHub 合併後本機變 `1 ahead / 12 behind`，兩邊都 > 0，機械上就是 Step 1.1b 的真分岔讀數。但 incoming 與 babel 的 dirty 檔有兩個重疊（`knowledge/_translation-status.json`、`reports/babel/fail-memo.json`），都是 babel 正在寫的——`git merge` 會因本機修改被拒，而 stash／checkout 它們命中 DNA #35／#46（跨 session work 期間不碰別人在用的檔）。所以本班不在主工作樹解這個分岔，改用唯讀 worktree 取 `origin/main` 的完整樹跑閘門（工具與內容同版，Stage 2 診斷紀律的正解）。這個 `1 12` 是本班自己造的在途狀態、由 babel 的 push-every 與下一輪自然收斂，不是 09-09 那種跨日分岔。

回覆照 Step 3.7 burst 紀律走累積式：同一投稿者 48 小時內六個 PR，不逐個發，整批一則留在 #2075（致謝＋技術說明＝§外向留言分層 AI 自主）。留言裡給了量法指令、點名〈謝淑薇〉履歷式開頭改成人話的那個改法，並把 `knowledge/People/` 還有 125 篇短於下限這件事說成庫存事實——政治人物那一族寫成「維護流程把這一族保留下來」，**沒有寫成「等哲宇決定」**（2026-11-17 哲宇 callout：公開留言不准把決定歸給他，除非附得出既有紀錄）。

## 照交接驗那把退化閘門，撈出它把「讀不到」講成「退化」

交接裡有一條指名本席位：`degenerate-repetition-check.py` 11-22 接進譯文產線後，那次回掃是一次性的，「下次有人動這支尺時確認它在派工路徑上真的會擋（尺先驗再用，REFLEXES #99）」。本班動手驗，三件事分開問：

1. **接線在不在** — 在，`babel-dispatch.py:569` 呼叫它，`degenerate_fail` 乘進 `verify_one()` 的 `ok`。
2. **它認不認得退化** — 自帶 selftest 7/7（正控制含 issue #2055 原形 49 次、門檻邊界 5 次與 4 次；負控制含 fr 同音示範、年份表數字重複）。
3. **它在派工的實際呼叫形式下回什麼** — 用 `--files <path> --quiet` 跑三個控制。真退化回 1（擋，對）、乾淨檔回 0（對）、**缺檔／讀不到的檔回 1**。

第三個是缺陷。`babel-dispatch.py` 呼叫處的註解寫的契約是「exit 1 = 有退化；其他非零是尺自己壞了（掃 0 檔回 2），不擋」，而 `check_file()` 把讀檔失敗包成一筆 `("unreadable", "", 0, errno)` 的 finding，跟真退化一起進 `total_hits` → exit 1 → `degenerate_fail=True`。後果在產線路徑上：一次 transient 讀檔失敗（寫入未 flush、與另一個 writer 撞、編碼壞）會讓整篇譯文被當退化丟掉，`fail_reason` 還會把它記進「模型退化」那一格——§神經迴路「確定性缺陷記成模型失敗」的同型，方向是環境問題被記成品質問題。

**最尖銳的是這支工具四天前就認得這個形狀**。同一個 `for` 迴圈裡那段 `relative_to` guard 的註解寫著「2026-11-22 首版就這樣炸過一次，而 crash 的 exit code 剛好也是 1，於是『擋下了』與『自己壞了』長得一樣（REFLEXES #38 混維度）」——而 `unreadable` 分支就在那段註解上方幾行。測試檔也一樣：`test_empty_input_is_not_reported_as_clean` 守著「掃到 0 檔不可以回答乾淨」（REFLEXES #85），只差「檔在清單裡但讀不到」這個 instance。同一條原則、同一個檔案、連續兩次只修症狀現形的位置不修根因的類別（REFLEXES #101）。

**落地**（`scripts/tools/lang-sync/degenerate-repetition-check.py` + `tests/test_degenerate_repetition_gate.py`）：`unreadable` 不計入 `total_hits`，改走 exit 2 並印 `❓ 讀不到，不是退化`（`❓` 是「不知道」自己的符號，不借 `⚠️`）；混合輸入時真退化仍優先回 1，不讓讀不到蓋掉真缺陷。selftest 加兩條控制、pytest 加兩條（`test_unreadable_file_is_not_billed_as_degeneration`／`test_degeneration_still_wins_when_mixed_with_unreadable`），四條都寫正面＋負面斷言（§神經迴路「分類器加新狀態時漏掉結論句」：只斷言對的字在，抓不到錯的處置也在）。四個 exit 狀態在派工的實際呼叫形式下重驗全對。全庫 pytest **996→998 passed、9 skipped、0 failed**。

LESSONS 記 `ruler-cannot-measure-shares-the-exit-with-content-is-broken`，候選機械化（未做）：讓 dispatcher 開機時對它呼叫的每一支閘門驗一次 exit code 語意符合契約，或把契約從呼叫端註解搬成被呼叫端的自述由測試對賬——跨檔案機制設計，不是本班單篇範圍。

## 房貸負擔率：第 240 天，這次去問了出處

`mortgage-burden` 是五盞黃燈之一（`data-hub-check.py --stale`：季資料、期間到 2026-03-31、已 240 天），警報的處置寫「照出處網址找新一期」。連九班的 data-refresh 都回報「仍只有 115Q1」，但**沒有一班說過它去看了出處**。本班去看了：內政部不動產資訊平台 E1050 頁最新一期就是「115 年第 1 季」，全國房貸負擔率 41.46%（與庫存值逐字相同，季增 0.71 個百分點、年減 3.07），**頁面上沒有 115 年第 2 季**。

所以這盞燈是對的，它的處置是不可能執行的——新一期不存在。順帶一個值得記的異常：Q2 期間在 6/30 結束，照季報慣例早該發佈，到 11/26 仍無，不是我們漏更新而是出處延遲或系列變動。這正是 OBSERVER-QUEUE #131 (a) 說的「靠現在的機制不會熄」那一種：警報把「我們沒去更新」與「出處還沒發佈」混在同一盞燈（REFLEXES #38／#85 同型）。**本班不動機制**（加欄位分這兩態屬 threshold／機制調整，且 #131 已在哲宇席位上），只把「查過出處、確認不存在」這個事實落檔，讓下一班不必再盲查一次。

## Stage 1 其他讀數

main CI 十四條 active workflow **RED 0 / BLOCKED 0 / UNKNOWN 0 / NEVER-ON-MAIN 0**（`ci-main-health.sh`：Deploy／Engineering contracts／Python tests／Routine stall alert／Sticky viewport gate／UI language gate 全綠）。兩條非 main 觸發的失敗照舊：`npm-publish-cli` 的 `cli-v0.8.1`（46.4 天，OBSERVER-QUEUE #95 `NPM_TOKEN` 只有哲宇設得到，issue #1789 在等那次發佈）、一條標 temporary/branch-only 的 CI 速度 bench。Engineering contracts 是綠的，所以照 Step 1.5c 沒跑 `npm-audit-sweep.sh`。

`pr-ci-armed.sh` 掃八個 open PR：**UNARMED 0 / NO-WORKFLOW 0**，六個投稿 PR 各 2 條 check、兩個哲宇 PR 各 10-11 條。

Discussions 掃十六筆，contributor 發起的全部有維護者回覆，最新 #2008（idlccp1984「關於主權問句的實驗」，11-18 更新）已在 OBSERVER-QUEUE #129。無 >48hr 零回應的 contributor 貼文。

Issue 面五條全 open 但**零 fresh**（最新 #2011 是 11-16，距今十天）：#2011／#1789／#1609 掛 `reserved-for-observer` 或 `needs-observer-review`（對應 #130／#95／#85），#1861 是 routine-stall 追蹤（87 則留言），#615 是 2026-04 的視覺 umbrella。所以 quality gate 第七條（有 fresh issue 的 cycle 至少修一件）不觸發；本班仍有實修產出（一支產線閘門的 exit code 語意 + 兩條 CI 測試），不是只把東西分類得更整齊。

斷鏈 audit 走 §4.1 的 babel-safe 路徑（`npm run sync:build`，不觸發 `prebuild:status` 共用檔競用），**20,552 頁 build exit 0**，`verify_internal_links.py` 回 **gated 0.05% < 7% PASSED**（all-langs 也 0.05%）。在 babel 四個 worker 滿載時跑，零碰撞，與 2026-10-01 的實測一致。殘餘斷鏈 18 個 unique target，多數是 ko／de 譯文 wikilink 未在地化那一族（§神經迴路「多語言 nav 隱性路由 scope」instance 2 明確記為 >50 檔、屬 babel 產線、本輪不碰）。

`slug-gap-check` N/A：三十個檔全是 modification，`git diff --name-status` 零 `A` 行，沒有新的純中文檔名文章。

本 cycle 非空場（六個 PR merge），**連續空場 vc 歸零**。

## 收官 checklist

| 檢查項                       | 狀態                                                      |
| ---------------------------- | --------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                        |
| Timestamp 精確               | ✅（`git log %ai` + `gh pr list mergedAt`）               |
| Handoff 三態已審視           | ✅                                                        |
| CONSCIOUSNESS 反映最新狀態   | ✅（derived 層，snapshot 即時讀）                         |
| 自我檢查工具 PASS            | ✅ 30 檔 × 兩 profile hard=0 / pytest 998 passed 0 failed |

### Quality gate 七條

| Gate                                     | 結果                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 5/5（3 條 observer-reserved + 1 routine-stall + 1 umbrella）         |
| open PRs ≤ 5d age 都有 review comment    | ✅ 六個合併並留累積式留言；剩兩個是哲宇自己 `reserved-for-observer`     |
| broken-link gated ratio < 7%             | ✅ 0.05%（all-langs 也 0.05%），走 §4.1 babel-safe `npm run sync:build` |
| build green                              | ✅ 20,552 頁 / 1m60s / exit 0；main CI RED 0                            |
| BECOME ACK 一行記憶體頂                  | ✅（含縮減讀取的誠實記錄）                                              |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | ✅ N/A — 本 cycle 非空場，vc 歸零                                       |
| 有 fresh issue 的 cycle 至少修一件       | ✅ N/A — 零 fresh issue；本班仍有實修（退化閘門 exit 語意 + 2 測試）    |
| 本機與 origin 無真分岔                   | ⚠️ 開場 `1 0` 純領先；合併後 `1 12` 是本班造的在途狀態，見上方說明      |

## Handoff 三態

繼承 `2026-11-26-071203-twmd-feedback-triage.md` 與 `2026-11-25-084517-twmd-maintainer-daily.md`：

- [x] ~~retired by 本班 — `degenerate-repetition-check.py` 在派工路徑上會不會真的擋（席位 `twmd-maintainer-daily` 或 `twmd-babel-nightly`，參照 `#2055`）：驗了，接線在、退化擋得住，但撈出 `unreadable` 誤判成退化並已修 + 兩條 CI 測試~~
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #119`（偵測器射程與那 81 筆收尾，**第十七天**）、`#124` 整機重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP）、`#95`（`NPM_TOKEN`，`cli-v0.8.1` 已 46.4 天）。本班未動。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS `comment-reconcile-alarm-has-no-retry-so-a-hiccup-wears-the-breakage-face`／`ga.totals.avgEngagementSeconds` 填錯欄位／`divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`／EDITORIAL 其他只寫數字不寫量法的門檻（title 字數、破折號密度、全形分號上限、腳註密度、4500 字門檻）。本班未動。
- [ ] pending（**本輪新增**，席位 `twmd-self-evolve-weekly`，參照 LESSONS `ruler-cannot-measure-shares-the-exit-with-content-is-broken`）讓 babel-dispatch 對它呼叫的每一支閘門驗一次 exit code 語意符合契約（開機時一次，不是每篇），或把契約從呼叫端註解搬成被呼叫端自述由測試對賬。本班只修了 `degenerate-repetition-check` 這一支，其餘五支（verify-translation／leak／health／currency／magnitude）**沒有驗過它們的非零 exit 是不是也混了「尺壞了」**。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2（**第 240 天**）。**本輪新增讀數**：本班查過出處（pip.moi.gov.tw E1050），最新一期就是 115Q1、41.46%，Q2 **尚未發佈**且已超過季報慣例時程。下一班不必再盲查，改記「出處仍無 Q2」即可；分「我們沒更新」與「出處沒發佈」兩態屬 OBSERVER-QUEUE #131 (a)。
- [ ] pending（**本輪新增**，席位 `twmd-review-stock` 或任何 Write mode session；延續昨天）`knowledge/People/` 125 篇 description 短於 100 字下限。政治人物一族（李登輝 24 字、呂秀蓮 25、陳菊 28、柯文哲 32、韓國瑜 32、賴清德 34）命中 §自主權邊界，不可跟著格式批次自動補。量法一律 `article-health --check=seo-meta`。**本班已把這件事寫進 #2075 的公開留言**，投稿者知道母體在哪。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。
- [ ] pending（延續，席位：下一輪 feedback-triage，零判斷動作）81 筆排除清單沿用／`⛔` 出現時記窗口外有沒有人。非本席位。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，`REFLEXES #68`）收官步驟 SOP（pipeline §Step 4.3／薄殼 skill §收官）寫 `git add` 後 `git commit`，沒寫 `--only`。**本班第八次自己用 `git commit --only <paths>` 繞過**（本班尤其必要：babel 同時有十個 dirty 檔），SOP 文字仍是舊的。
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07～11-17 沉默十天的根因（已定位兩場整機停電，`#124` 重開機仍未做）。

本 session 新 handoff：三條新增（dispatcher 其餘五支閘門的 exit 語意、房貸負擔率的出處讀數、People 125 篇已對外說明），一條 retire（退化閘門派工路徑已驗並修）。

## Beat 5 — 反芻

今天值得記的是：接住缺陷的是一個被寫下來的動作，不是我的判斷力。

交接裡那句「下次有人動這支尺時確認它在派工路徑上真的會擋」，寫的時候前一班並不知道有缺陷——它只是照 REFLEXES #99 留了一個待驗的洞。我照著做，三個控制跑完，第三個回了不該回的數字。如果那句話沒有被寫下來，我今天看到的會是一支四天前剛接上產線、selftest 全綠、`babel-dispatch` 裡有呼叫、測試檔有五條的閘門——每一個表面訊號都說它好了。**我不會去戳缺檔那一格，因為沒有理由戳。**

更尖銳的是作者四天前就把這個形狀寫在註解裡了。那段 `relative_to` guard 的註解把「擋下了」與「自己壞了」共用 exit code 這件事講得比我現在講的還清楚，而 `unreadable` 分支離它只有幾行。測試檔也守著同一條原則的另一個 instance。所以這不是「沒想到」，是**想到了、寫下來了、修了現形的那一處，然後那份理解停在註解層沒有往上抽一層問「還有哪些路徑會走到同一個出口」**。§神經迴路有一條正好是這個：「已經知道會這樣壞，並不減少它壞的機率——知識留在註解層沒有下沉到控制流」（REFLEXES #96）。

所以本班的修補刻意多做一件事：不只修 `unreadable`，還把「這支閘門的四個 exit 狀態」整個釘進 selftest 與 pytest，並在 handoff 裡明寫**另外五支閘門沒驗過**。因為今天真正的發現不是「有一支閘門的 exit code 錯了」，是「我們有六支閘門餵同一個 `ok` 連乘式，而契約只寫在呼叫端的註解裡，沒有任何東西在對賬兩邊」。修一支是修 instance；把另外五支寫成待驗的洞，才是照類別畫。

而這件事今天能發生，是因為昨天那班也做了一樣的動作：他們把「用哪把尺量」寫進 EDITORIAL，所以我今天 import `_cjk_count` 而不是打 `len()`。兩班連起來看，飛輪真正在轉的那一格不是產出量，是**把當班學到的東西放在下一班伸手就會碰到的位置**。

🧬

---

_v1.0 | 2026-11-26 08:52 +0800_
_session twmd-maintainer-daily — 六個 PR 三十篇 description 全合併；照交接驗退化閘門，撈出「尺量不到」跟「內容壞了」共用一個出口_
