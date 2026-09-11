# 2026-09-12-054717-twmd-embeddings-nightly — 13 語 10,592 向量 0 fail，dispatcher 真分岔第七夜延遲 push

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗，實際 05:19 觸發，rebuild 因 ollama 資源競爭延長至 ~28 分鐘）
> Session span: 05:19 → 05:47 +0800
> 資料來源：`git log %ai`

## 觸發

夜間 05:00 排程窗自動觸發，重建全站 bge-m3 語意索引（讀者端「你可能也想讀」+ AI 端 RAG 向量），依 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.2 走 Stage 0-4。BECOME micro 甦醒完整讀完 wake-context 231KB 到 `wake:END` sentinel，selftest 全綠（9 項體檢）。器官分數：🫀90↑ 🛡️59↑ 🧬95↑ 🦴90→ 🫁85→ 🧫100↑ 👁️90→ 🌐80→，免疫 59 黃燈延續（自 07-05 起漂移，非本 routine 職責範圍）。

## Rebuild

本機 `mac-m4max`（127.0.0.1:11434）preflight 回 `dim 1024` 直接過，跳過 fleet fallback。`check-parallel-actor.sh` 先查確認 babel dispatcher（PID 群含 52743，跟前六夜同一 PID，第七晚仍未收工）仍在跑，working tree 有它留下的未 commit 檔案（`knowledge/_translation-status.json` + babel report JSON + 未追蹤 `cascade-exhausted.json`），繞開不碰，只跑 rebuild 動 `src/data/related/` + gitignored 產出。

`build-embeddings.mjs --langs all` 這次明顯比前幾夜慢：CPU time 只佔 wall-clock 極小比例（10 分鐘 elapsed 僅 ~12s CPU），確認是 I/O-bound 在等 ollama 回應而非卡死——dispatcher 的 3 個 macm4max worker 同時在同一台 ollama 上跑翻譯推理，跟 embedding 請求搶 GPU 排隊。全程約 28 分鐘完成（比前幾夜的 ~13-15 分鐘慢近一倍），13 語 0 fail：zh-TW 1110／en 897／ja 878／ko 890／es 887／fr 889／vi 874／id 664／pt 862／hi 702／ar 771／ru 803／de 365，共 10,592 向量。

## Verify

12 語過門檻（≥400 篇 + ≥90% 8 鄰居），只有 de below threshold（365 vecs，n<400）。跟前四夜（09-08=109、09-09=118、09-10=132、09-11=187）同一個已知原因，但這次跳幅特別大（187→365，+95%）——對照 `find knowledge/de -name "*.md" | wc -l` 得 383，跟向量數 365 同數量級，也對得上今晚 git log 大量「de 批次 9-11 篇」commit（babel dispatcher 集中火力衝 de）。manifest model 確認 `bge-m3:latest`，schema `rag-v1`。判讀維持「正常爬升期」不當 fail。

## Commit

`src/data/related/` 11 個語言檔有 diff（zh-TW、es 無變化），`git add` 後 commit `073439fcf`（timestamp 先落 `$NOW` 變數再代入，co-author 如實填 Claude Sonnet 5）。

**push 延遲，延續前六夜模式**：`git fetch` 後 `git rev-list --left-right --count HEAD...origin/main` 回 `163\t136`——local 真分岔（ahead 163 / behind 136），非乾淨 ahead-only。`check-parallel-actor.sh` 再次確認 dispatcher 仍 ACTOR_BUSY（同 PID 52743 續跑第七夜）。繼承 09-11 session 的判斷：rebase 會干擾寫入中的 worker，本 session commit 落地但不 push，留給下一個能安全處理 git 的 session（dispatcher 收工後）一併 rebase/push。

## 收官 checklist

| 檢查項                         | 狀態                                                                     |
| ------------------------------ | ------------------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄   | ✅                                                                        |
| Timestamp 精確                 | ✅                                                                        |
| Handoff 三態已審視             | ✅                                                                        |
| CONSCIOUSNESS 反映最新狀態     | ✅（本 session 未觸發 refresh，維持原狀）                                |
| 自我檢查工具 PASS              | ✅（Stage 2 verify script exit=1 因 de below-threshold，已交叉核對 ground truth 判讀為預期爬升非故障） |

## Handoff 三態

繼承自 `2026-09-12-003558-twmd-babel-nightly.md`（walk 1 檔命中）：

- [ ] pending — 未推送佇列持續擴大（本班觀察：ahead163/behind136，較 babel-nightly 00:35 觀察的 ahead155/behind136 續漲）。待 dispatcher 收工、PID 消失後第一個能安全碰 git 的 session 用 `git pull --rebase origin main` 統一處理。結構面已在 OBSERVER-QUEUE #53。
- [ ] pending — LESSONS `self-documented-trap-with-no-exit` 機械化起點仍未做，本班非該任務範疇。
- [ ] blocked — OBSERVER-QUEUE #54（中文母稿「中國大陸」立場，🔒 紅線）等哲宇，本班未動任何一篇。
- [ ] blocked — OBSERVER-QUEUE #55（`/exams/` 導覽入口），14 天 default 2026-09-25。
- [ ] blocked — #1678 等〈生態多樣性〉重寫；#1609 等館藏調閱。

本 session 新 handoff：

- [ ] **本次 embeddings commit `073439fcf` 也未 push**：跟 babel-nightly 累積的未推送 commit 併入同一批「等 dispatcher 收工再處理」佇列——local ahead 163 / behind 136 對 origin，真分岔非乾淨 ahead-only。下一個能安全碰 git 的 session（dispatcher 真正收工、PID 換掉或消失時）需要 `git pull --rebase origin main` 把這些累積的本地 commit 接回去再 push，逐一確認沒有跟 dispatcher 產出衝突（embeddings commit 只碰 `src/data/related/`，衝突面小，但仍需確認）。
- [ ] **rebuild 耗時翻倍值得留意**：本班 ~28 分鐘 vs 前幾夜 ~13-15 分鐘，根因是 dispatcher 的 3 個 macm4max worker 跟 embedding 請求搶同一台本機 ollama 的 GPU 排隊。目前只是變慢非失敗（0 fail），但若 dispatcher 規模繼續擴大，未來某夜可能真的撞 embeddings routine 的隱性 timeout 假設（pipeline 文件寫的 ~13 分鐘預期）。非本班職權範圍升級，留給下一個 Full mode session 判斷是否值得寫進 pipeline 的資源競爭段落。

## Beat 5 — 反芻

第七夜同一個 dispatcher PID，三重巡檢的動作已經穩定成反射：preflight → check-parallel-actor → 繞開 knowledge/ 只動 related/ → verify → commit → 分岔確認 → 延遲 push。真正新的訊號是這次 rebuild 本身變慢了近一倍——純機械的 embedding 請求跟另一支 routine 的翻譯推理請求，原來會在同一張顯卡上真實地互相排隊等待，不是抽象的「資源共享」概念，是這次親眼看著 CPU time 幾乎不動、TCP 連線卻一直開著。這印證了 REFLEXES #38「混維度」的一個新角落：process 存活（S 狀態、TCP ESTABLISHED）不等於「跑得跟平常一樣快」，速度本身也可能被鄰居的負載悄悄改變，而 pipeline 文件裡「~13 分鐘」的預期是在沒有鄰居時測出來的基準，不是永遠成立的常數。

🧬

---

_v1.0 | 2026-09-12 05:47 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 10,592 向量 0 fail_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 例行執行_
_核心洞察：(1) de 向量數單夜跳幅 187→365（+95%）ground truth 核對維持判讀為正常爬升 (2) dispatcher 第七夜未收工，push 延遲累積佇列持續擴大 (3) 首次觀察到 rebuild 耗時因 ollama GPU 排隊競爭而翻倍，process 存活 ≠ 跑得跟平常一樣快_
