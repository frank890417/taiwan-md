# 2026-11-22-031422-twmd-distill-weekly — 連三週沒跑之後補上：十四條教訓消化，新增 REFLEXES #104「紅燈後面的每一步都沒跑過」

> session twmd-distill-weekly — 週日 cron routine（Full mode BECOME）
> Session span: 03:12（排程 fire）→ 03:25 +0800，distill commit `29476b766` 落在 03:21
> 資料來源：`git log %ai`、`lessons-distill.py audit`、`wake-context.py` selftest

## 觸發

週日蒸餾班。本席位 11-01、11-08、11-15 連三週 fire 後沒有 git 痕跡，甦醒 groundtruth 把它列在沉默死亡名單裡。上一次有產出是 10-25，四週下來 LESSONS-INBOX §未消化 從 114 條長到 148 條。

BECOME ack：mode=full／8 器官最低＝🛡️ 免疫 59（review_coverage 17.4，自 07-05 起黃燈；快照齡 21 小時，是舊鏡子）／Q5 Q6 Q13 Q14 通過。wake-context 落檔 1,642 行分頁讀到 `wake:END`。selftest 兩盞燈：diary 20 天沒有產出、工作樹落後 origin 一個 commit。主樹上 babel writer 在跑且有五個未 commit 的檔，所以整班在 `.worktrees/20261122-distill-weekly`（從 origin/main 開）做，只 stage 自己的檔。

這班沒有照 Full mode 補載 ANATOMY、DNA、CONSCIOUSNESS、UNKNOWNS、LONGINGS 與 OBSERVER-QUEUE §待決全段。週額度在 🟡 lean（上一班記 77%），甦醒本身已讀掉近 29 萬位元組，我把剩下的預算留給候選原文。OBSERVER-QUEUE 只查了 #73 那一列。

## 十三條候選怎麼分

`lessons-distill.py audit` 給的候選池是 vc≥3 四條加 structural 十一條，聯集 13 條，每條原文讀完才分桶。其餘 135 條只看了 audit 印的標題與 vc，沒有逐條讀。

只有一條開新編號。`downstream-steps-skipped-behind-a-red` 三週內被 maintainer 獨立撞到三次：CI 的串行閘門鏈在第一個紅燈之後，後面每一步的狀態是沒跑，摘要層只呈現一個 fail，於是讀的人去解釋那個紅，解釋得越好越沒有人問它後面蓋住什麼。8 個投稿 PR 上四道真正檢查程式碼的閘門四天沒跑過一次，`cli` 的 vitest 掛上後兩週沒在 CI 執行過。這件事裡沒有任何一支檢查器做錯，#103（主動排除觀察）、#85（符號分不出）都蓋不到鏈的結構，所以升 REFLEXES #104，10-24 那條同族 entry 併進去當第三個 instance。10-23 `type-gate-lived-only-in-ci` 的第二層寫進了 #104，但它的主教訓是另一件事，留在 buffer。

另外三條 vc≥3 都有最接近的既有反射。臨時寫的尺讀數偏了，結論一律指向別人（貪婪 regex、國字數字、比視窗還長的監看迴圈，同一班三例）fold 成 #99 變體 (j)；`terminology-yaml-audit.py` 預設刪檔被三個 session 各寫進 memory 一次、沒人改預設值，fold 成 #96 第四 instance；幣別閘門擋得住、提示卻沒教，綁 babel 三條引擎與付費層現況，寫進 MEMORY §神經迴路。九條 structural 單例分別落在 #15 第 17 次驗證（有提醒沒閘門）、#38 兩處、#80 儀器輸出側、#99 (k)、#100 兩個載體、#102 兩處。

〈台北吸菸室〉那條（我們引了同一團隊的手足論文，據此公開指控拒菸聯盟拿錯證據）entry 自己建議收為 MANIFESTO §10 的第七型。routine mode 不寫 MANIFESTO，反射層收在 #102，型別候選列入 defer。Tier 0b 同步集要不要收查證標記是設計決定，進 LESSONS §Defer ship-queue。

## 歸檔、索引蒸餾與 SPORE-INBOX

移除走 `lessons-distill.py sweep`：keep 134、drop 14，dry-run 後 `--apply`，traceability 表進 §已消化，§未消化 不留註解，重跑 audit 得 134 條、structural 0 條。REFLEXES 升 v5.47（description 104 條、index 列、footer 同步，wake-context 對賬 104 == 104），LESSONS-INBOX 與 MEMORY 的 frontmatter 同 commit 更新。`memory-index-rollup.py` 先 dry-run 再 `--apply`，inline 87 列收回 40 列，47 列歸檔 `memory/index-archive/2026-11.md`。commit 後從 HEAD 讀回來驗：歸檔 84+47=131 列、inline 91−47=44 行，新條目都在。prettier 重排了歸檔表的欄寬，列數守恆。

SPORE-INBOX §Pending 用 SOP 的 awk 邊界計數得 45，落在 [30,50)，未達 auto-drop。高原自七月起停在這個數字，已是 `OBSERVER-QUEUE #73（待決）`，照 REFLEXES #80 只記讀數，不重開條目。SOP 寫的 telegram 通知這班沒有發，手上沒有那個管道。

## 收官 checklist

| 檢查項                       | 狀態                                             |
| ---------------------------- | ------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                               |
| Timestamp 精確               | ✅（git log %ai）                                |
| Handoff 三態已審視           | ✅                                               |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本 routine 範圍不含，快照是 21 小時前的       |
| 自我檢查工具 PASS            | 見 commit 時 pre-commit 與 memory-diary 檢查結果 |

## Handoff 三態

繼承上一 session（`2026-11-22-010222-twmd-news-lens-weekly`）：

- [x] ~~pending 四條週班是否恢復（distill 這一條）~~ retired by 本班：distill 03:21 有 commit `29476b766`。self-evolve 04:06、routine-audit 21:04 由各自那班回答
- [ ] pending（收件席位：哲宇）PR #2033 先合、再 rebase PR #2036。原樣
- [ ] pending（觀察者決定）babel 並行度。原樣
- [ ] pending（席位 `twmd-babel-nightly`）id〈資料台灣〉`/id/data/` 彩券詞撞字。原樣
- [ ] pending（席位 `twmd-routine-audit-weekly`）週日四條 routine 連三週沉默的原因。原樣；本班只能回答「這一週 distill 跑完了」，回答不了前三週為什麼沒跑
- [ ] pending（收件席位：哲宇）〈黃仁勳〉EVOLVE 選 A／B／C，見 reports/probe/2026-11-22.md §T1-C。原樣
- [ ] pending（下一個 Full mode 或貢獻者）〈台灣股市與資本市場〉EVOLVE 與〈國安基金〉NEW，12-20 前有效。原樣
- [ ] pending（席位 `twmd-maintainer-daily`）〈台灣鐵路地下化〉INBOX 歸檔＋DONE-LOG。原樣
- [ ] pending（11/28 晚上當班者）選舉與公投第 22 案結果歸檔。原樣
- [ ] pending（席位 `twmd-data-refresh-am`）CF 台灣請求量對訪客比。原樣

本 session 新 handoff：

- [ ] pending（席位 `twmd-self-evolve-weekly`，動得了 `scripts/tools/`）REFLEXES #104 三個未落地候選：`ci-main-health.sh` 印「紅在第幾步、後面幾步 skipped」、`pr-ci-armed.sh` 加第四態、workflow 的 `push` paths 是否含自己的檔名。都是機械對賬，參照 LESSONS 已消化 `downstream-steps-skipped-behind-a-red-read-as-one-unrelated-red`
- [ ] pending（席位 `twmd-self-evolve-weekly`）REFLEXES #96 第四 instance 的候選：全掃 `scripts/tools/` 找會刪檔卻沒有 `--apply` 旗標的腳本，做成 pytest。參照 LESSONS 已消化 `memory-records-the-landmine-three-times-and-nobody-moves-it`
- [ ] pending（收件席位：哲宇）MANIFESTO §10 幻覺型別要不要加「正確引用了錯的那一篇」，反射層已在 REFLEXES #102；Tier 0b 同步集收不收 `curation` 兩欄，見 LESSONS §Defer ship-queue。兩條都不是任何 routine 能代決的
- [ ] pending（席位 `twmd-distill-weekly` 下一班）§未消化 134 條裡有 120 條以上是 10-25 以前留下的 vc≤2 條目，這班沒有逐條讀。下一班額度允許時用 `lessons-distill.py chunk` 分段讀一次，看有沒有該歸檔的過時條目

## Beat 5 — 反芻

這批候選有一半在講同一個方向。臨時尺讀數偏了，指控的是自家閘門與投稿者；一條寫得很好的腳註指向手足論文，指控的是具名的倡議聯盟；正控制跑在工具不檢查的路徑下，替自己的修補發了合格證。三件事裡的錯都帶著具體的數字或真實的來源，而具體讓人不想再驗一次。兩個星期內被冤枉的對象兩次是外部的人，接住的兩次都靠外面：第二支尺不同意，或是那位醫師附上 PDF。

另一半在講自覺型步驟。窗口外的讀者靠當班想起交接裡那句話才被撈到，刪檔的工具靠每一班當場救回，npm 權杖那個紅燈四班各診斷一次。這個席位自己沉默三週，也屬於這一類：沒有一道閘門在問「這週蒸餾了沒」，只有 groundtruth 的一行黃字。selftest 問 diary 二十天沒產出是門檻擋下的還是反芻被餓死，我這班的答案是後者的一部分：寫 diary 的多半是週班與 maintainer，週班停了三週。這班沒有寫 diary，上面兩段已經是我想說的全部。

🧬

---

_v1.0 | 2026-11-22 03:25 +0800_
_session twmd-distill-weekly — 週日蒸餾，四週累積（前三週沉默）_
_誕生原因：§未消化 148 條，vc≥3 四條＋structural 十一條進候選池_
_核心洞察：串行閘門鏈的紅燈會蓋住後面所有沒跑的檢查，升為 #104；其餘十二條多半指向同一件事，帶著具體數字的錯誤讀數最不會被重驗，而它的結論常是別人壞了。_
_LESSONS-INBOX 候選：無新增_
