---
title: '2026-11-05-090413-twmd-maintainer-daily'
description: '三個投稿 PR 全收並 heal；#1888 卡兩週的八條腳註當班做掉，順便更正我們兩次誤判投稿者「查無來源」；CI 健康表把網路失敗印成「從沒跑過」已修'
type: 'cognitive-log'
status: 'log'
current_version: 'v1.0'
last_updated: 2026-11-05
last_session: '2026-11-05-090413-twmd-maintainer-daily'
---

# 2026-11-05-090413-twmd-maintainer-daily — 三個 PR 全收、#1888 的八條腳註當班接手、而我自己的尺今天錯了兩次都錯向別人

✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，dashboard 齡 2h）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

> session twmd-maintainer-daily — cron am 08:30 fire
> Session span: 08:34:12 → 09:14:56 +0800（約 41 分，4 個 commit + 3 個 PR merge + 1 次推進投稿者分支）
> 資料來源：`git log %ai`

## 觸發

排程 08:30 fire。Stage 1 掃到 4 個 ready PR（低於 High-stake #1 的 5，所以留在 review mode）＋ 9 個 open issue。分岔檢查 `1 0` 是純領先，babel 在飛、83 個檔 dirty，全程只 stage 自己的檔。

## 三個投稿 PR：收下來，然後補它們自己報錯的那兩個數字

tboydar 的 #1960〈中華職棒〉補封王戰、#1961〈台灣平均餘命〉新文章、#1962〈外送平台〉補公平會禁止併購，三篇 `article-health --profile=ci-deploy` 都 hard=0，十條紅旗零命中，`curation: incubating` 自己標好了。新腳註我逐條打開對過原文：公平會四大理由那篇的 `13.1`／`3.9`／`迴避`／`附加負擔`／`第13條`／`2018`／`辛志中` 全部逐詞命中，封王戰那篇的 `6比0`、`3萬8178`、`梅賽鍶`、`張政禹`、`勝騎士`、`蔣少宏` 也都在。

有三個原子第一輪回 0 命中（`38,178`／`6:0`／`4勝2敗`），我先查變體才下結論。來源寫的是 `3萬8178`、`6比0`、`3勝2敗`（加上第六戰那勝＝4勝2敗），全部對得上。**0 命中先懷疑自己的尺，這次是對的，而同一班我在別的地方沒做到。**

三篇 P0 merge 之後在隔離 worktree 裡 heal 兩件（`04eecf4c4`）：〈外送平台〉這次補了一整節、正文到 5,599 個中文字，`readingTime` 還留著 8 分鐘；〈台灣平均餘命〉反過來，2,077 字標 12 分鐘。兩個都照人審過的 147 篇推出來的慣例（中位數約每分鐘 311 字）改成 18 與 7。〈台灣平均餘命〉是純中文檔名新文章，`slug-gap-check.py` 叫了，同批補上 `taiwan-life-expectancy`。沒有這列的話，十二語翻譯會安靜地整篇跳過。另外〈外送平台〉的「參考資料」是 `###` 而全文段落標題都是 `##`，站上目錄把它當前一節的子段落，一併改掉（`d0d78ae50`）。

順手量了全庫還有 35 篇同樣的 H3 參考資料，**但沒有批次改**：十檔 dry-run 當場看出它不是一個家族：六篇同時有 H3 跟 H2 兩個參考資料（sed 過去會變成兩個一樣的段落）、四篇全文都用 H3 當段落標題（檔案內部其實一致）、一篇是「### 參考資料 / Sources」加「## 資料來源」的第三種寫法。十檔 dry-run 這條老規矩今天賺回它的成本。

回覆照 burst 紀律走（48 小時內同一人 3 個 PR）：共同的部分一次寫在 #1961，另兩個只講各自的事。

## #1888：八條機械的當班做掉，而我們欠投稿者一句更正

〈鄉土文學論戰〉10-21 送進來，兩週卡在「33 條腳註裡有幾句話，它指的維基條目裡沒有」。11-02 那班已經分好類、問投稿者「要不要我直接做掉那八條機械的」，三天沒有回音。照 §1b 與 LESSONS `reopened-channel-still-needs-someone-to-walk-down-it`，等不是辦法，我做了。

做之前兩邊來源都自己重抓一次（不信舊結論，REFLEXES #67）：維基 wikitext 13,733 bytes、宋澤萊執筆的台文戰線年表。七條改指年表、一條 `[^20]` 反過來改指維基，每一條都先確認新來源裡有那句話的逐字，「也許只是一隻小山鹿呢」「政府不是不辦，祇是時候未到」「葉石濤在《夏潮》發表〈台灣鄉土文學史導論〉」都在年表裡，而「鄉土之愛擴大了就是國家之愛」只有維基有。順手補了第 97 行那個沒有先行詞的「他」（前一段講的是龍族詩社成員，指的是余光中）。推進投稿者分支 `41f650625`。

**然後是今天最該記的一件事**：我把 10-22 與 11-02 兩班列為「維基查無」的 `[^13]` 也重驗了，那句話在條目裡，寫成國字「**五十八**篇」，還附了書目（楊碧川《臺灣歷史辭典》1997，頁 335）。兩班都在搜阿拉伯數字「58」，兩次都告訴投稿者他的腳註沒有來源，掛在公開 PR 上兩週。已在 #1888 公開更正並道歉，`[^13]` 原樣不動。剩下三條（`[^23]`／`[^29]`／`[^30]`）是真的要來源或要降低說法，而降低說法是在改他的論點不是改格式，所以不代他決定，`needs-work` 留著。

## CI 健康表把「問不到」印成「從沒跑過」

Stage 1.5 那張表把 `Engineering contracts` 標成 NEVER-ON-MAIN ⚠️，而它前一晚十一點多才剛在 main 上綠過。直接問那個 endpoint：帶 branch 那口回 50 筆非 PR 的 main run，真正壞掉的是不帶 branch 的那口，100 筆的大回應在這條網路上連三次都被 `connection reset by peer` 打掉（我自己這班撞了四次同樣的重置）。兩個取數口都包在 `2>/dev/null` 裡，所以「抓不到」跟「沒有跑過」落在同一個分支。

這支尺本來就有 UNKNOWN 狀態，只是這條路徑沒用它。改成兩口都失敗時印 `UNKNOWN(取數失敗)` 並說明沒量到（`ff0757c3f`）。刻意沒動 `--strict`，因為它目前只看 RED，而「沒量到要不要讓閘門轉紅」是閾值決定，照本檔既有慣例留哲宇。兩個控制都跑過：runs 取數全失敗 → UNKNOWN 1 / NEVER-ON-MAIN 0；取數成功但回空陣列 → 仍正確印 NEVER-ON-MAIN 1。

## 四則 issue 的判斷

`#1891`（殘留腳註標籤）用官方那把尺（`--check=footnote-reference`）抽驗三個熱點檔，`puma-shen`／`beitou`／`eurasian-otter` 都還在。11-04 班已把存量分成兩桶、三句話交接清楚，兩桶都要帶著中文母稿對照跑，收件席位是巴別塔班不是維護班，本班不搶。

`#1789`（CLI 沒發佈）我從 CI 表那行追下去，抓了 run 38060520015 的 log，判定是 `npm error 404 PUT .../taiwanmd` ＝權杖權限失效而非程式問題。**然後才發現 OBSERVER-QUEUE #95 在 10-10 就寫了同一句，10-22 一班重驗過，11-01 前後又一班重驗並公開更正，本班是第四次。** 沒有再發第四則留言。缺的動作是換一個 secret，只有哲宇能做。

`#1861`（週排程 memory 檔沒出現）按日數了 commit：**10-29 與 10-30 兩天 origin/main 零 commit**，10-31 有 28 筆但 `[routine]` 0 筆，日班 11-02 才恢復。六條週班最後一次成功全停在 10-25／10-26，也就是空窗前那輪。所以那六條 WARN 是一段已經結束的停電的殘影，不是現在進行式。而它們不可能歸零，因為錯過的 fire 補不回 memory 檔，要一路警告到 11-08。前幾班的交接把它寫成「仍是登入過期同根因」，語氣是現在式，我一開始也照著讀。

`#1936`／`#1902` 兩則 from-feedback、`#1832`／`#1831`／`#1789`／`#1609` 掛 `reserved-for-observer` 或 `needs-observer-review`、`#615` 是 umbrella，本班都不動。

## 收官 checklist

| 檢查項                       | 狀態                                                          |
| ---------------------------- | ------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                            |
| Timestamp 精確               | ✅（`git log %ai`）                                           |
| Handoff 三態已審視           | ✅                                                            |
| CONSCIOUSNESS 反映最新狀態   | ✅ derived 層，本班未動                                       |
| 自我檢查工具 PASS            | ✅ article-health 兩個 profile／verify-commit-scope 逐 commit |

### Quality gate 八條

| Gate                                    | 結果                                                         |
| --------------------------------------- | ------------------------------------------------------------ |
| open issues 都有 status label／assignee | ✅ 9/9                                                       |
| open PR ≤5d 都有 review comment         | ✅ 三個新 PR 當班回覆，#1888 第四則留言                      |
| broken-link gated ratio < 7%            | ✅ **0.06%**（`npm run sync:build` + verify_internal_links） |
| build green                             | ✅ main RED 0（13 條 active workflow）                       |
| BECOME ACK 一行在記憶體頂               | ✅                                                           |
| 連續空場 ≥3 cycle 有 LESSONS entry      | ⏭️ 不適用，本班 vc=0（4 ready PR + 9 issue 真 backlog）      |
| 有 fresh issue 的 cycle 至少修掉一件    | ✅ 三個 PR merge+heal、#1888 八條腳註、CI 尺修好             |
| 本機與 origin 無真分岔                  | ✅ `1 0` 純領先                                              |

## Handoff 三態

繼承 `2026-11-05-072155-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`，今天 09:00）：#1949 劉恩哲那筆已由 11-03 維護班修好（`5730fd9e4`），請確認後 retire~~ — **retired by 本班**：issue #1949 已於 11-03 01:02 CLOSED，`data/terminology/向後兼容.yaml` 台灣欄實測是「向後相容 / 向下相容 / 回溯相容」，修正與說明都在檔內。兩次標「可能已完成」到此結案。
- [ ] pending（收件席位 `twmd-feedback-triage`，零判斷，每班照做）：預設跑完若窗口幾乎全被排除，加大 `--limit` 再跑一次。本班不碰那條產線。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119`，🔒 判準）：偵測器欄位射程校準、那 80 筆怎麼收尾。**第五天。**
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS `mandatory-read-gate-inherits-the-saturated-window`、`dry-run-gate-catches-the-pipelines-own-edit`。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119` 併入，🔒 判準）：LESSONS `duplicate-of-a-closed-report-looks-brand-new`。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**第三十班繞開（vc=30）**，本班同樣只 stage 自己的檔。
- [ ] pending（收件席位 `twmd-distill-weekly`，11-08）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位 `twmd-data-refresh-am`／`twmd-self-evolve-weekly`，11-08）：`ga4-session-duration-labelled-as-engagement` 尚未寫成 LESSONS 條目。

本 session 新 handoff：

- [ ] pending（收件席位：**投稿者 tboydar**，`PR #1888`）：剩三條腳註（`[^23]` 在台灣的中國文學／`[^29]` 吳晟評價／`[^30]` 美麗島因果）要真來源或降低說法。八條機械的已推進他分支，`needs-work` 留著標示卡在哪格。**若 11-12 前仍無回應，下一班可考慮代為降級說法後合併**，但那是改他的論點，所以要在留言裡講明再做。
- [ ] pending（收件席位 `twmd-babel-nightly`，`issue #1891`）：桶 A-2（`beitou-hot-spring-street` 67 處字面 `[^\d]`、`taiwan-traditional-markets` 1 處）用 `relink-dead-by-zh-position.py` 對母稿位置接回號碼並抽驗；桶 B 的 `es/People/puma-shen.md` 66 處走整篇重翻。本班抽驗三個熱點檔確認都還在。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS `daily-alert-invites-rediagnosis-of-what-is-already-blocked-on-the-observer` 的候選機械化：一張 workflow→佇列條目對照（如 `npm-publish-cli.yml: OBSERVER-QUEUE#95`），讓 `ci-main-health.sh` 印到那條時帶出編號。純多印一個字串、不碰閾值也不碰 `--strict`。本班沒自己動，因為它要新增一個設定檔與讀取面，不是修一行既有邏輯。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，11-08）：LESSONS `missed-trip-warning-cannot-self-clear-so-it-warns-for-a-whole-cycle` — `routine-stall-check.py` 尺二把「上一趟已錯過（過去式、補不回）」與「這一趟該跑而沒跑」分成兩種字樣；`issue #1861` 每天長一則同文留言，同一趟的 miss 應更新同一則而非追加。
- [ ] pending（收件席位 `twmd-maintainer-daily` 或 `/twmd-rewrite`）：全庫 35 篇 `### 參考資料` 分三種形狀（6 篇 H2/H3 並存、4 篇全文 H3、1 篇第三種命名），分類已寫進 `d0d78ae50` 的 commit 訊息，動手前照那個分類逐型處理，**不要批次 sed**。
- ⏳ blocked（等哲宇，`OBSERVER-QUEUE #95`）：`NPM_TOKEN` 換發 + `gh run rerun 38060520015`，`issue #1789` 等這一步。本班是第四次診斷出同一個結論，不再重複診斷。

## Beat 5 — 反芻

今天最值得留下的一件事，是我自己兩次量錯，而兩次都錯向別人。三個 PR 與那八條腳註只是當班的工作量。

第一次是用貪婪量詞加 DOTALL 讀 frontmatter，把 description 量成 801 字元（真值 188），於是認定站上那道 SEO 閘門其實從沒守過 description 長度，差一步就要寫進 LESSONS 跟佇列。第二次是翻出前兩班告訴投稿者「58 篇查無來源」，而那句話就在條目裡，寫成國字。兩個技術病根完全不同，失敗的方向卻一致：臨時寫的尺讀偏之後，結論都長成「別人壞了」——一次指控自家閘門失職，一次指控投稿者的腳註沒來源。沒有一次偏成「我可能錯了」。

攔下第一次的是另一把尺：我接著跑的第二支腳本回報全庫最長只有 473 字元，跟我手上那三個「801 以上」正面矛盾。自省沒有參與。REFLEXES #69 說每層自評都需要外部尺，今天兩次轉向都是靠「第二把尺不同意」，不是靠想到要懷疑自己。而維護班一整天的工作就是拿尺量別人的產出，所以這條偏誤的方向性比它的發生率更值得記。三條教訓已落 LESSONS-INBOX（`ad-hoc-ruler-reads-high-and-the-accusation-points-outward` vc=2）。

第二件事：`#1789` 被第四次診斷出同一個結論，而每一班的 memory 都會寫「本班診斷出 npm 權杖失效」，讀起來像四次進展。儀器那行催促當班去看，卻不告訴它已經有人看過——催促與去重是同一行輸出要同時承擔的兩件事，而它只做了一半。

🧬

---

_v1.0 | 2026-11-05 09:14 +0800_
_session twmd-maintainer-daily — cron am 08:30，review mode（4 ready PR < 5，未升 Full）_
_誕生原因：排程 fire；三個投稿 PR 進來、#1888 卡兩週、CI 表亮一個假的 NEVER-ON-MAIN_
_核心洞察：當班臨時寫的尺讀數偏離真值時，結論的方向有系統性偏誤——偏向指控被量的對象，而不是懷疑尺；同一班兩個獨立 instance，兩次都靠第二把尺不同意才轉向。_
_LESSONS-INBOX 候選（已落檔 3 條）：`ad-hoc-ruler-reads-high-and-the-accusation-points-outward`（vc=2）／`daily-alert-invites-rediagnosis-of-what-is-already-blocked-on-the-observer`／`missed-trip-warning-cannot-self-clear-so-it-warns-for-a-whole-cycle`_
