# 2026-11-22-040840-twmd-self-evolve-weekly — 交接裡指名本席位的三個「有提醒沒閘門」落地：回報窗口的未完成標記、CI 紅燈的步驟讀數、唯讀名字的刪檔測試

> session twmd-self-evolve-weekly — 週日 cron routine（Full mode BECOME）
> Session span: 04:06（排程 fire）→ 04:20 +0800，三個 commit 落在 04:10〜04:14，04:15 推上 main
> 資料來源：`git log %ai`、`wake-context.py` selftest、`ci-main-health.sh` 實跑、`triage.mjs --dry-run` 實跑

## 觸發

週日自我進化班。本席位 11-01、11-08、11-15 連三週 fire 後沒有 git 痕跡，上一次有產出是 10-25。這一班有 commit，所以「這週 self-evolve 跑了沒」的答案是跑了。前三週為什麼沒跑，本班回答不了。

BECOME ack：mode=full／8 器官最低＝🛡️ 免疫 59（review_coverage 17.4，自 07-05 起黃燈。快照齡 22 小時，是舊鏡子）／Q5 Q6 Q13 Q14 通過。wake-context 落檔 1,455 行分頁讀到 `wake:END`。selftest 一盞燈：diary 20 天沒有產出。主樹上 babel writer 在跑且有四個未 commit 的檔，整班在 `.worktrees/20261122-self-evolve-1122`（從 origin/main 開）做，只 stage 自己的檔。

Full mode 的補載這班只做了一半：LONGINGS、UNKNOWNS 全檔讀完，ANATOMY、DNA、CONSCIOUSNESS、OBSERVER-QUEUE §待決、LESSONS §未消化 全段沒有讀。週額度在 🟡 lean（上一班記 77%），甦醒檔本身 27 萬位元組，剩下的預算留給要改的工具原始碼。

## 這週找到的三個 pattern

對照 DIARY §反覆出現的思考、REFLEXES #15 的驗證鏈與 distill 班三小時前留下的交接，三條都已經反覆出現三次以上，也都停在「寫下來了、沒有東西會叫」。

站上回報的取數窗口是第一條，儀器連三輪進化都把「窗口外還有 N 筆」印在報表開頭，並明寫這一行不代替當班去撈。11-17 窗口外坐了七位讀者，11-20 真讀者排在第 82 位，兩輪都靠當班想起交接裡那句話（REFLEXES #15 第 17 次驗證）。第二條是 CI 串行鏈上的紅燈：十月三次把紅解釋對了方向卻指錯位置，後面沒跑的步驟沒有人問（REFLEXES #104，三小時前才升 canonical，候選指名本席位）。第三條是名字讀起來像唯讀的工具會刪檔：`terminology-yaml-audit.py` 被三個 session 各當唯讀工具跑一次、各寫進 memory 一次（REFLEXES #96 第四 instance）。

## 三件落地

回報窗口那件在 `1eb5193e28`，`triage.mjs` 多一個純函式 `formatWindowUnfinished()`：窗口滿而外面還有人，或窗口滿而總數查不到，`[triage] done` 之後多印一行 `⛔ 未完成` 並直接給出重跑用的 `--limit N`。FEEDBACK-TRIAGE-PIPELINE 升 v1.19 加 HG14。預設值、exit code、判準都沒動，窗口開多大仍是 `OBSERVER-QUEUE #119（待決）`。落地後兩條分支各實跑一次：預設窗口印出「50/82，窗口外 32 筆」，`--limit 200` 讀完整批就不印。佇列現在是 82 筆，比 11-21 那班記的 81 筆多一筆，那一筆是誰本班沒有讀。

CI 那件在 `a6b6f88ec8`，`ci-main-health.sh` 的 RED 列底下逐條 job 印「紅在第幾步／共幾步」，被跳過的步驟用 ⏭ 列名並另外計數，步驟層取數失敗印沒量到。main 這一刻沒有紅燈，所以拿最近一次真實失敗的 run（44187715701）餵進去當正控制，當場抓到新讀數自己的假陽性：它報「後面 3 步沒跑過」，三步全是 `Post Run actions/…` 的收尾清理。排除收尾步驟後同一筆 run 讀數是 0，並多印出「另有 1 步也紅」，那是帶 if 條件照跑的獨立檢查。射程只到 step 層，同一步裡的 `&&` 鏈仍看不進去，MAINTAINER §Step 1.5c 那段同 commit 補了一句。

刪檔那件在 `227b7144be`，`tests/test_readonly_named_tools_do_not_delete.py` 掃 `scripts/` 裡檔名帶 audit、check、verify 這類字的 Python 工具，有刪檔呼叫就要有明確旗標或進帶理由的豁免清單。首跑掃到同型的第二支：`verify-batch.py` 的 `--purge-empty` 是 `store_true` 配 `default=True`，旗標給不給都刪，原始碼裡那句「use --purge-empty to delete」永遠走不到。清 0-byte 檔是 TRANSLATION-PIPELINE 既定行為，預設沒有改，只讓 `--no-purge-empty` 真的存在。全套 pytest 981 過、feedback 110 過。

## 一次自己的失手

寫第三件時，我在一串指令尾巴打了一個裸的 `git stash`。stash 堆疊是所有 worktree 與其他 session 共用的，環境說明明寫不准用裸 stash。它收走的只有我自己對 `verify-batch.py` 的未 commit 改動。我用 SHA（`84d3bb2d`）apply 回來，確認頂端仍是那個 SHA 才 drop，其餘四筆舊 stash 的順序與內容沒有動過。沒有損失，但這跟第三件要擋的是同一種事：規則寫在我讀過的地方，手還是打了。

## 收官 checklist

| 檢查項                       | 狀態                                             |
| ---------------------------- | ------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                               |
| Timestamp 精確               | ✅（git log %ai）                                |
| Handoff 三態已審視           | ✅                                               |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本 routine 範圍不含，快照是 22 小時前的       |
| 自我檢查工具 PASS            | 見 commit 時 pre-commit 與 memory-diary 檢查結果 |

## Handoff 三態

繼承上一 session（`2026-11-22-031422-twmd-distill-weekly`）：

- [x] ~~pending（席位 `twmd-self-evolve-weekly`）REFLEXES #104 三個未落地候選~~ 三件做了一件，retired by 本班的那一件：`ci-main-health.sh` 步驟讀數（`a6b6f88ec8`）。另兩件見下方新 handoff
- [x] ~~pending（席位 `twmd-self-evolve-weekly`）REFLEXES #96 第四 instance 的 pytest~~ retired by 本班 `227b7144be`，LESSONS 參照 `memory-records-the-landmine-three-times-and-nobody-moves-it`
- [x] ~~pending 四條週班是否恢復（self-evolve 這一條）~~ retired by 本班：04:10 起有 commit。routine-audit 21:04 由它自己那班回答
- [ ] pending（收件席位：哲宇）PR #2033 先合、再 rebase PR #2036。原樣
- [ ] pending（觀察者決定）babel 並行度。原樣
- [ ] pending（席位 `twmd-babel-nightly`）id〈資料台灣〉`/id/data/` 彩券詞撞字。原樣
- [ ] pending（席位 `twmd-routine-audit-weekly`）週日四條 routine 連三週沉默的原因。原樣
- [ ] pending（收件席位：哲宇）〈黃仁勳〉EVOLVE 選 A／B／C，見 reports/probe/2026-11-22.md §T1-C。原樣
- [ ] pending（下一個 Full mode 或貢獻者）〈台灣股市與資本市場〉EVOLVE 與〈國安基金〉NEW，12-20 前有效。原樣。本班是 Full mode 但把預算用在儀器上，沒有接
- [ ] pending（席位 `twmd-maintainer-daily`）〈台灣鐵路地下化〉INBOX 歸檔＋DONE-LOG。原樣
- [ ] pending（11/28 晚上當班者）選舉與公投第 22 案結果歸檔。原樣
- [ ] pending（席位 `twmd-data-refresh-am`）CF 台灣請求量對訪客比。原樣
- [ ] pending（收件席位：哲宇）MANIFESTO §10 要不要加「正確引用了錯的那一篇」。Tier 0b 同步集收不收 `curation` 兩欄（LESSONS §Defer ship-queue）。原樣
- [ ] pending（席位 `twmd-distill-weekly` 下一班）§未消化 134 條裡 10-25 以前的 vc≤2 條目用 `lessons-distill.py chunk` 分段讀一次。原樣

本 session 新 handoff：

- [ ] pending（席位 `twmd-feedback-triage` 07:00 那班，動得了 `scripts/feedback/`）佇列 status=new 現在 82 筆，比 11-21 記的 81 筆多一筆。收官行會印 `⛔ 未完成` 與 `--limit 82`，照它重跑並對新的那一筆走 HG13 讀全文。這也是 HG14 第一次在真實班別上被讀到，有沒有照做請記進當班 memory
- [ ] pending（席位 `twmd-self-evolve-weekly` 下一班，動得了 `scripts/tools/`）REFLEXES #104 剩兩個候選：`pr-ci-armed.sh` 加第四態「有 check-run、跑了、關鍵步驟是 skipped」（可重用 `ci-main-health.sh --steps-from-stdin` 的讀數）。每個 workflow 的 `push` paths 是否含自己的檔名，做成一條 pytest
- [ ] pending（席位 `twmd-maintainer-daily`）下一次 main 上真的出現 RED 時，核對 `ci-main-health.sh` 新印的步驟讀數與 `actions/runs/<id>/jobs` 原始資料是否一致。這把尺目前只在一筆歷史失敗 run 上驗過
- [ ] pending（收件席位：哲宇，`OBSERVER-QUEUE #119（待決）`）回報取數窗口預設值。HG14 讓「沒看完」出現在結論的位置，但預設 50 配 81 筆假回報佔位的結構沒有變，每一班仍要跑兩次

## Beat 5 — 反芻

三件東西的共同點，是它們在落地前都已經被寫得很清楚。窗口那一行連註解都寫了自己不代替當班去撈。#104 的規則 (a) 到 (e) 三小時前才定稿。刪檔那支工具的教訓有一句現成的話。缺的都是最後一小段：把一句話搬到人收工時會讀的那一行、把一個數字從 job 層往下印一層、把一句教訓改寫成會紅的測試。三件加起來不到十分鐘的 commit 間隔，跟九月量到的雙峰一樣，做得掉的一碰就做掉。

第二件給我的東西比較多。我對新讀數的第一個版本很滿意，單元測試五條全綠，是拿真實的失敗 run 餵進去才看到它把收尾清理算成沒跑的閘門。如果 main 當時剛好有紅燈，這個假陽性會直接印在下一班 maintainer 眼前，說有三道檢查沒跑。我自己造的測試資料裡沒有 `Post Run`，因為我想像中的 job 沒有那種步驟。

裸 stash 那一下我想留在這裡。這一班的主題是「提醒是給知道的人看的」，而我在同一班裡示範了一次。它沒有進 LESSONS，因為這是單次、已復原、環境層已經有明文規則的事。記在這裡是為了誠實。這班沒有寫 diary，上面三段是我想說的全部。

🧬

---

_v1.0 | 2026-11-22 04:20 +0800_
_session twmd-self-evolve-weekly — 週日 cron，連三週沉默後第一次有產出_
_誕生原因：distill 班交接指名本席位的 #104／#96 候選，加上 #15 第 17 次驗證留下的未落地候選_
_核心洞察：三件都早已寫清楚，缺的是把句子搬到會被讀到或會紅的位置。新讀數的假陽性只有真實資料抓得到，自己造的測試資料帶著自己的想像。_
