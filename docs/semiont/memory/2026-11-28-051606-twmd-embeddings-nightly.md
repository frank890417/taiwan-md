# 2026-11-28-051606-twmd-embeddings-nightly — 完整重建 13 語 15,379 向量零失敗，`be57a33359`；昨晚那班有索引 commit 卻沒有 memory

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:0X 甦醒 → 06:14 +0800（session-id 05:16:06 取號；重建 05:16:06 起跑、06:09:50 結束，各語耗時加總 3,225 秒；索引 commit 06:10:09）
> 資料來源：`session-id.sh`、`date`、build log、`git log %ai`

✅ BECOME ack: mode=micro / 8 organ 最低=免疫 59（快照齡 23h，標 stale）/ Q14 cross-session continuity=PASS

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.5 重建語意索引。甦醒檔用 Read 分頁讀到末行 `wake:END`（285,417 bytes），十一段都讀完。selftest 亮一個警訊：工作樹落後 origin 1 個 commit（凌晨心跳班的 memory），同時 `ACTOR_BUSY`，babel dispatcher 在本機寫譯文。

## 重建

EMBEDDING-PIPELINE.md §前置解析到 `EMBED_HOST=http://127.0.0.1:11434`，`/api/tags` 有 `bge-m3:latest`，Stage 0 探針回 `dim 1024`，沒走備援。

起跑前本機領先 origin 9、落後 1。先跑 `git merge-tree --write-tree origin/main HEAD` 確認零衝突，再用 merge 把那一個 commit 併進來（三個檔：用量帳、MEMORY.md、心跳 memory），dispatcher 的十個 dirty 檔沒碰。併完才起跑，所以今晚的索引是對著 origin 最新內容算的。

Stage 1 跑 `--langs all`，13 語共 15,379 向量，每語 0 fail，fail rate 0%。十三語各 1,183 篇，跟 11-26 那班同數。每語耗時 204〜277 秒，全程 53 分 44 秒，落在 v1.5 寫的 43〜58 分鐘區間內。

EMBEDDING-PIPELINE.md §Stage 2 儀器 exit 0，verify PASS：語言清單讀 `ENABLED_LANGUAGE_CODES`，13 語每篇都有 8 個鄰居，manifest `bge-m3:latest`／`rag-v1` 無漂移。

Stage 3 先把 `NOW` 落成變數印出（2026-11-28 06:10），index 裡沒有別人的暫存，帶路徑 `-- src/data/related/` commit `be57a33359`，13 個 related 檔、13 行增刪。push 時 pre-push 四道閘全綠，push 後 fetch 對賬領先 0、落後 0。Co-author 照實填本班執行模型 Fable 5.2。

## 昨晚那班沒有留下 memory

盤點前例時發現 `memory/` 裡沒有 11-27 的 embeddings 檔，MEMORY.md 也沒有那一列，而 `25fb1a56a0`（11-27 06:03，Co-author Sonnet 5.5）確實把索引 commit 上去了，動了 de／es／hi／vi 四個檔。也就是 Stage 3 做完、Stage 4 沒做。那班的向量數、fail rate、verify 結果、Handoff 審視都沒有紀錄，所以本班的 Handoff 只能從 11-26 那份繼承，中間一班的狀態未知。原因沒查到：可能是 session 在收官前中斷，也可能是收官被跳過，build log 在 scratchpad 裡已不可得。

## 收官 checklist

| 檢查項                       | 狀態                                                   |
| ---------------------------- | ------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                     |
| Timestamp 精確               | ✅（甦醒起點未取號前無紀錄，標約）                     |
| Handoff 三態已審視           | ✅（繼承自 11-26，11-27 無檔）                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，交給 data-refresh-am                    |
| 自我檢查工具 PASS            | ✅ Stage 2 exit 0                                      |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線 |

## Handoff 三態

繼承自 `2026-11-26-051527-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：routine-sync 提出的 embeddings 改殼生效時差三選項，掛 `OBSERVER-QUEUE #110（待決）`。
- [ ] pending（延續，收件席位 Full mode 或 `twmd-self-evolve-weekly`，動得了 `scripts/core/`）：LESSONS `rebuild-keeps-grinding-after-the-endpoint-dies`，今晚零失敗，沒有新證據。
- [ ] pending（延續，收件席位 `/twmd-routine` 或改 `semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`，今晚沒走 worktree，vc 仍是 1。
- [ ] pending（延續，收件席位：哲宇，基礎建設決定）：LESSONS `keystone-fallback-shares-the-hosts-fate`，備援名單仍只有本機。

本 session 新 handoff：

- [ ] pending（收件席位：`twmd-routine-audit-weekly`，讀得到排程器執行紀錄）：11-27 embeddings 班 `25fb1a56a0` 有索引 commit、沒有 memory 檔也沒有索引列。請從排程器的 run 紀錄看那班是中斷還是跳過收官；若再出現一次，再開 LESSONS 條目。本班沒有補寫那一晚的 memory，因為手上沒有它的數字。

## Beat 5 — 反芻

存活檢查看的是「fire 之後有沒有 commit」，昨晚那班過得了這把尺：索引 commit 在，時間也對。少的是 memory，而少了 memory 不會讓任何燈亮，只有下一班回頭找前例時才看得到那個空位。這跟「轉錄加保管雙職責，一半停手另一半跟著消失」是同一個形狀的反面：這次是產物那半做完了，紀錄那半沒做，而儀器只量產物。一次還不足以立條目，先交給看得到排程紀錄的席位。

🧬

---

_v1.0 | 2026-11-28 06:14 +0800_
_session twmd-embeddings-nightly — 完整重建，13 語 15,379 向量零失敗；發現 11-27 那班缺 memory_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0 可達_
_核心洞察：有 commit 的班過得了存活檢查，缺的 memory 只有下一班找前例時才會現形_
_LESSONS-INBOX：無新條（vc=1，先交接）_
