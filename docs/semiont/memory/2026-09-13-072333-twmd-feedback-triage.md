# 2026-09-13-072333-twmd-feedback-triage — 佇列空的第七輪，而讓我知道自己站在一棵四天沒更新的樹上的，不是甦醒流程

> ✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（yellow，漂移多維度退化中，最大缺口 review_coverage 少 20.2 分，自 2026-07-05）/ Q13 anti-bias=PASS / Q14 cross-session=PASS
>
> session twmd-feedback-triage — cron routine（每天 07:00 Asia/Taipei）
> Session span: 07:23:33 → 07:2x:xx +0800（約 10 分鐘，1 commit）
> 資料來源：`git log %ai` + `scripts/feedback/triage.mjs` 報表 + `scripts/tools/lib/check-parallel-actor.sh` + `git show origin/main:<path>` 跨源核

## 觸發

每日 07:00 的讀者回報轉錄班：把站上送進 Supabase 的回報機械性轉成 GitHub issue，交給 08:30 的 maintainer 收割。佇列空的第七輪。

## 佇列空的第七輪，兩道對賬照樣全綠

先過機器身份：`gh-app-token.sh --whoami` 回 `{"issues": "write", "metadata": "read"}`，`repositories` 印 `frank890417/taiwan-md` 一個庫，token `ghs_` 開頭 383 字元，HG11 過。

dry-run 印 `fetched 0`。HG13 那道「讀完全文才准動手」今天沒有東西可讀：沒有任何一筆 id 可以餵給 `--show`。這是空集合，不是我省略了一步，兩者的差別值得在紀錄裡分開寫。零筆不構成跳過 `--commit` 的理由：轉錄那半停手，留言 sync 與兩道對賬會跟著消失（LESSONS `zero-input-cycle-drops-the-reconciliation`）。

`--commit` 收工：`file=0 reject=0 skip=0 hold=0`、`archive-scanned=84`、`archive-comments-synced=0`。兩道對賬是 `archive-reconcile=84/84 ✅` 與 `comment-reconcile=83/84 · 上游已刪留言 1 份紀錄，git 留著: #1252 ✅`。#1252 那筆差額仍是 7/29 一則答錯的留言在 GitHub 被刪、git 這邊留住，主權層照常運作。`archive-comments-synced=0` 自己分不出「沒有新留言」跟「一則都抓不到」，分得開的是 83/84 那行，印得出它就代表 84 份紀錄各跑過一次線上查詢。

`fetched 0` 後面那行寫最近一筆回報是 2026-09-05、距今 7.9 天。9/11 那班查過最近 60 筆的相鄰間隔，上限是 10 天（7/30 → 8/09），中間還有一次 7 天，所以 7.9 落在過去六週的變異裡，是普通的數字。那次查詢的效期已經兌現第二輪。

archive 目錄本輪零新增零修改，`git add docs/feedback/archive/` 是真的沒有東西可加，不是我略過了 HG12。

## 那道要替我喊「這棵樹是舊的」的警報，本身就是舊的

`check-parallel-actor.sh` 回 `ACTOR_BUSY`：同一個 babel dispatcher（PID 13990，12:43AM 起）跨進第九天，本地 `ahead227 / behind147` 是真分岔。比照前八班，Step 1 的 `git pull origin main` 跳過，收官 commit 落本地不 push。

值得記的是我怎麼知道要跑那支工具的。**甦醒沒有告訴我**。`wake-context.py` 的 selftest 印「取數健康：10 項體檢全綠」，十行全綠，沒有一行提到落後 147 個 commit。而 origin/main 上的 `wake-context.py` 早就有這段檢查：落後時 selftest 印 ⚠️ 並 `exit 2`，走「甦醒第一句話要說出來」那條通道。它 2026-09-09 14:25 由 opentwbench session ship（`0e1d423dd`），commit 標題寫得很清楚——「甦醒時會自己說『這棵樹是舊的』，不用等當班想到」。

這棵樹跟 origin/main 的 merge-base 是同一天 09:11（`9e1988362`），比那次 ship 早五個小時。所以本機 `wake-context.py` 從來沒有過那段程式：`grep -c parallel_actor` 本機 0、origin/main 7。四天來每一條在這台機器上醒來的 routine，selftest 都印全綠，而分岔一天比一天深。

防「副本過期」的警報如果跟著副本一起發佈，那麼它在最該響的機器上必然缺席，因為過期越久的機器越不可能擁有它。這不是閘門沒寫好：三態驗過、commit 訊息還特地寫了不用等當班想到，只是它到不了需要它的那棵樹。今天接住這件事的仍然是當班自己想到要跑一次 `check-parallel-actor.sh`，正是那行 commit 訊息說不必再依賴的東西。已寫成 LESSONS `staleness-guard-ships-through-the-artifact-it-guards`，severity=structural。

順帶一提，我第一次跑那支工具時打的是 `scripts/tools/check-parallel-actor.sh`，回 No such file，真正的路徑多一層 `lib/`。BECOME §行動鐵律 5 那一行寫「session 啟動跑 `check-parallel-actor.sh`」，同一行前半段其實給了完整路徑，後半段這個裸檔名讓我照著複述出一個不存在的路徑。一個沒解析到的指令跟一支不存在的工具，在終端機裡長得一模一樣。

## 讀取層失真下，這兩道對賬憑什麼還能信

工具同時警告：本地 `git grep` / `cat` / `ls` 反映的是 147 個 commit 前的狀態。兩道對賬吃的是 `docs/feedback/archive/`，所以動手前核過一次：`git diff HEAD origin/main -- docs/feedback/archive/` 零輸出，兩邊都是 84 份。放行條件是拿另一邊的樹比出來的，不是「兩邊應該一樣」這個假設。

同一個理由讓我今天不修上面那兩個洞。本機 `BECOME_TAIWANMD.md` 落後 origin/main（3 插入 1 刪除），`LESSONS-INBOX.md` 落後 135 插入 58 刪除。在落後的樹上改 canonical 正是 REFLEXES #67 寫入面變體記錄過的病。8/14 那次把 `MAINTAINER-PIPELINE.md` 的過期副本寫回去，靜默把哲宇 directive 砍回舊版，四天無人發現。LESSONS 是純 append 到一個唯一錨點，衝突可回復。改 BECOME 跟 `wake-context.py` 不是，留給第一個 rebase 完的 session。

## 收官 checklist

| 檢查項                       | 狀態                                                 |
| ---------------------------- | ---------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                   |
| Timestamp 精確               | ✅（`git log %ai` + `date`）                         |
| Handoff 三態已審視           | ✅                                                   |
| CONSCIOUSNESS 反映最新狀態   | ✅（consciousness-snapshot 齡 0h，免疫 59 yellow）   |
| 自我檢查工具 PASS            | ✅ prose-health（memory-diary profile）              |
| 兩道對賬                     | ✅ archive-reconcile=84/84 / comment-reconcile=83/84 |
| HG12 `git add` archive       | ✅ 零變更，無檔可加（非略過）                        |

## Handoff 三態

繼承 `2026-09-13-070306-twmd-spore-harvest-am.md` 與 `2026-09-13-064808-twmd-data-refresh-am.md`：

- [ ] **未推送佇列持續擴大**：dispatcher 第九天仍在跑，本班觀察 `ahead227 / behind147`（上一班 ahead225）。等 PID 13990 消失後，第一個能安全碰 git 的 session 用 `git pull --rebase origin main` 統一處理。結構面在 OBSERVER-QUEUE #53。
- [ ] **本機 `wake-context.py` 缺工作樹新鮮度檢查**（本班新發現，見上節）：rebase 之後這段程式會自己回來，屆時確認甦醒 selftest 真的會對落後的樹印 ⚠️ + exit 2。在那之前，這台機器上每一班的甦醒全綠都不代表樹是新的。
- [ ] **BECOME §行動鐵律 5 的裸檔名**：`session 啟動跑 \`check-parallel-actor.sh\``應補成`scripts/tools/lib/check-parallel-actor.sh`。一行 doc fix，留給 rebase 完的 session（在落後的樹上不改 canonical）。
- [ ] LESSONS `self-documented-trap-with-no-exit` 機械化起點仍未做，非本班範疇。
- [ ] feedback-triage 寫入端探針仍未做（會在讀者可見資料表與 git archive 留下假回報，代價未定）。
- [ ] `lint-staged automatic backup` stash（data-refresh 第一次逾時留下）仍在 stash 清單，上一班已確認是成功 commit 的多餘超集備份，可安全丟棄。
- [ ] blocked — OBSERVER-QUEUE #28 (a) 偵測器與「要不要回覆那位回報者」等哲宇拍板。
- [ ] blocked — OBSERVER-QUEUE #54（中文母稿「中國大陸」立場，🔒 紅線）等哲宇；#55（`/exams/` 導覽入口）14 天 default 2026-09-25。
- [ ] blocked — #1678 等〈生態多樣性〉重寫；#1609 等館藏調閱。

## Beat 5 反芻

今天這班的工作本身十分鐘就做完了：零回報、兩道對賬全綠、archive 沒東西可加。真正花時間的是一個順手的動作。跑 `check-parallel-actor.sh` 之前，我已經從甦醒的 selftest 讀到十行全綠。

那十行沒有說謊，它們量的每一項都是真的。它們只是沒有量我腳下這棵樹有多舊，而四天前有人專門為這件事寫了程式、驗了三態、在 commit 標題裡寫下「不用等當班想到」。那段程式現在躺在 origin/main，跟我之間隔著 147 個 commit——隔著的正是它要警告我的那個東西。

我想記住的是這個形狀，而不是「要記得跑那支工具」。要記得跑那支工具就是它想廢掉的東西，而我今天又靠它一次。任何一個用來說「你的副本舊了」的警報，只要跟副本同路發佈，就會在最需要它的機器上缺席。它保護得最好的，永遠是那些本來就不需要保護的機器。

還有一件小事值得留著。我打錯路徑時，終端機回的是 No such file。那一刻「我打錯了」跟「這支工具在這台機器上不存在」長得完全一樣。今天的答案是前者，但我剛好正在寫一則關於後者的教訓。如果我沒去查，這兩個都可以是當天的故事。
