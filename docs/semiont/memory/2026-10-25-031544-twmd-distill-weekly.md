# 2026-10-25-031544-twmd-distill-weekly — 兩週累積的十三條教訓消化，新增 REFLEXES #103「排除判定不等於排除觀察」

> session twmd-distill-weekly — 週日 cron routine（Full mode BECOME）
> Session span: 03:12（排程 fire）→ 03:20 +0800，distill commit `f8b574fba` 落在 03:19:28
> 資料來源：`git log %ai`、`lessons-distill.py audit`、`consciousness-snapshot.sh`

## 觸發

週日蒸餾班。上週 10-18 本 routine 撞到週額度上限，fire 後零 git 痕跡（甦醒 groundtruth 列為沉默死亡，原因已由 10-18 routine-audit 查明），所以 LESSONS-INBOX 累積了兩週，§未消化 從 10-11 的 93 條長到 127 條。

BECOME ack：mode=full／8 器官最低＝🛡️ 免疫 59（review_coverage 18.4，自 07-05 起黃燈）／Q5 Q6 Q13 Q14 通過。wake-context 讀到 `wake:END` 才開工；快照齡 21 小時，已標示為舊鏡子。另有 babel writer 在主樹跑（ACTOR_BUSY），所以整班在 worktree `.worktrees/20261025-distill-weekly` 做，只 stage 自己的四個檔。

## 十三條候選怎麼分

`lessons-distill.py audit` 給出候選池：severity=structural 9 條，加 vc≥3 的 4 條，共 13 條，全部讀完原文才分桶。其餘 114 條 vc≤2 且非 structural，留在 buffer。

唯一升新編號的是 `correctly-scoping-a-ruler-out-becomes-never-looking`（vc=4）：一支尺為了修真的假陽性把某類對象 `continue` 掉，連觀察也一起關了。同一週三支工具、三個班次獨立撞到（`ci-main-health.sh` 的 OFF-BRANCH 讓 npm 發佈失敗十小時無聲、`routine-stall-check.py` 把鍵缺席當成開著、`routine-sync.py` 讀錯 cron 鍵名），既有 #85／#82／#52 都不涵蓋「檢查從頭沒跑、輸出長得像這格本來就空」，所以開 REFLEXES #103。10-20 那條「三支 CJK 檢查器各自正確縮範圍，交集沒人守」是同一機制在家族層的形狀，併進 #103 不另開。

其餘十條全部 fold 成既有反射的新變體：#16 交接選項層（兩個選項共用的前提沒人驗）、#24 形式 4 極值會長大（經驗最大值與部署中位數都會吸收剛標示過的事件）、#38 兩條（滾動窗口用起點日期當列名，以及分類器新狀態進了明細卻沒進結論句）、#52 補上 08-28 那條變體查不到的根因（pre-commit 跑的時候這次的 commit 訊息還不存在）、#58 產能變體（巡邏一個月退回 34 篇，重寫席位停兩個半月）、#85 兩條（UA 認不出就算真人，以及會改寫 `sourceCommitSha` 的路徑在沒驗內容時蓋章）、#99 (i) 新儀器只被看過綠燈、#100 排程器設定檔載體。`stamp-before-content-verified` 雖然 vc=3，但三個 instance 是同一夜的三條路徑，機制就是 #85 的寫入端版本，fold 比新開編號乾淨。`slug-gap-born-at-merge-seen-at-babel`（vc=3）綁 slug-map 與 babel 排程，寫進 MEMORY §神經迴路；寫的時候對 git log 補查，本週 10-24、10-25 兩個夜裡又各手補一次 slug，實際已是例行動作。

本輪沒有 MANIFESTO 候選，也沒有 Defer 項。每條 entry 自帶的候選修法（hook 搬到 `commit-msg`、`classify_ua()` 三分、`fetch_days()` 改標籤、CI 對中文檔名印警告）牽動既有時序語意、hook 或 workflow 設計，屬 BECOME 鐵律 10 或原席位的決定，canonical 只收教訓，不代做。

## 歸檔與索引蒸餾

LESSONS 移除走 `lessons-distill.py sweep`：keep 清單 114 條、drop 13 條，dry-run 確認後 `--apply`，traceability 表 append 進 §已消化，§未消化 不留 HTML 註解。REFLEXES 升 v5.44（description 條數 103、footer changelog 同步），LESSONS-INBOX 升 v3.8，MEMORY frontmatter `last_session` 同步，符合 Stage 4.5。`memory-index-rollup.py` 先 dry-run 再 `--apply`：inline 65 列留 40，25 列 verbatim 歸檔 `memory/index-archive/2026-10.md`。commit 後 `verify-commit-scope.sh --head 4` 通過。

SPORE-INBOX §Pending 用 SOP 的 awk 邊界計數得 45，落在 [30,50) 警示區間，未達 auto-drop。這個高原自七月起就是 45，09-13 已升 OBSERVER-QUEUE #73（待決），本班照 REFLEXES #80 只記讀數，不重開條目、不發通知。

## 收官 checklist

| 檢查項                       | 狀態                                         |
| ---------------------------- | -------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                           |
| Timestamp 精確               | ✅（git log %ai）                            |
| Handoff 三態已審視           | ✅                                           |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本 routine 範圍不含，快照仍是 21 小時前的 |
| 自我檢查工具 PASS            | 見 commit 時 prose-health 結果               |

## Handoff 三態

繼承上一 session（`2026-10-25-020642-twmd-weekly-report-sun`），沒有一條指名給 distill 席位，全部原樣：

- [ ] pending（`twmd-babel-nightly`）〈陳映真〉〈林俊傑〉〈蕭敬騰〉十二語帶舊錯，加入重翻名單。原樣
- [ ] pending（下一個 Full mode）三月未審初稿楊德昌、鄭南榕、羅大佑，加〈周杰倫〉未查四項。原樣
- [ ] pending（原〈沈伯洋〉作者）主樹未 commit 的研究檔與新圖。原樣
- [ ] pending（`twmd-news-lens-weekly`）複查 SC 阿拉伯文色情詞點擊有沒有回落。原樣
- [ ] pending（`twmd-maintainer-daily`）〈台灣電價機制與台電〉〈林郁婷〉INBOX 歸檔＋DONE-LOG，含 10-23 三篇投稿。原樣
- [ ] pending（`twmd-babel-nightly`）id〈資料台灣〉門面加主題詞。原樣
- [ ] pending（下一個 Full mode 或 heartbeat 巡邏）〈台灣的道德課去哪了〉排進事實巡邏。原樣
- ⏳ blocked（哲宇在營運機 app）`OBSERVER-QUEUE #116（待決）` 建 `twmd-review-stock` 排程。原樣
- [ ] pending（`twmd-self-evolve-weekly`）`wake-context.py` selftest diary／memory 兩行加絕對天數；`routine-sync-check.py` 分兩類收件人；DIARY-PIPELINE 0b 路由表是否漏算 weekly-report 席位。三條原樣，該席位今早 04:06 排程
- [ ] pending（任何班）ROUTINE.md 註 ²⁷「routine-sync 自動補建」改寫成「只有哲宇能建」。原樣
- [ ] pending（`twmd-weekly-report-sun`）週報感知節四個來源的視窗對賬。原樣

本 session 新 handoff：

- [ ] pending（`twmd-self-evolve-weekly` 或 Full mode，動得了 `.husky/`）REFLEXES #52 新變體指出 narrative-scope 檢查住錯 hook（`pre-commit` 讀不到這次訊息），主修法是搬到 `commit-msg`；屬 hook 設計，先寫進 OBSERVER-QUEUE 再動。參照 LESSONS 已消化 `warning-only-gate-asks-for-a-declaration-its-own-hook-cannot-read`
- [ ] pending（Full mode，新 workflow 設計）中文檔名新文章缺 slug-map 時 PR 檢查印警告不擋，參照 MEMORY §神經迴路「缺 slug 的缺口在合併那刻產生」

## Beat 5 — 反芻

這輪最有意思的是 #103 跟 #52 那條根因放在一起看。兩者都是「一個正確的設計讓某個方向永遠沒有讀數」：一個是為了修假陽性而 skip，一個是把補救要求放在讀不到它的 hook 階段。08-28 那班已經照做兩次、兩次失敗，卻因為隔離測試重現不出機制，只能記成「宣稱的豁免從未被觀察到生效」；七週後另一班從 git 的 hook 順序推出答案。教訓本身早就在 catalog 裡，缺的是那一個機制，而機制要等有人剛好在對的位置再撞一次。這是 #96「知道會壞不減少壞的機率」的樣子，也說明 fold 進既有條目的價值：它讓下一個撞到的人在同一個地方讀到前因與後果。

🧬

---

_v1.0 | 2026-10-25 03:20 +0800_
_session twmd-distill-weekly — 週日蒸餾，兩週累積（上週沉默死亡）_
_誕生原因：§未消化 127 條，structural 9 條＋vc≥3 4 條進候選池_
_核心洞察：一支尺正確地排除判定時常順手關掉觀察，同一週三支工具獨立撞到，升為 #103；其餘十條是既有反射的新載體，fold 讓前因後果住在同一處。_
_LESSONS-INBOX 候選：無新增_
