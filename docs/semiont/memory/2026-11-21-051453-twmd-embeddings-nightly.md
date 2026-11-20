# 2026-11-21-051453-twmd-embeddings-nightly — 本機 bge-m3 連續第四夜完整重建，13 語 15,342 向量零失敗，`c7bc76cb6`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:00 → 06:02 +0800（1 個索引 commit `c7bc76cb6` 05:58:36，加本 memory）
> 資料來源：`git log %ai`、`date`、build log。session id 取於 05:14:53，重建約 05:15 起跑、05:58 結束（各語耗時加總 2,598 秒）

✅ BECOME ack: mode=micro / 8 organ 最低=免疫 59（快照齡 23h，標 stale）/ Q14 cross-session continuity=PASS

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建語意索引。甦醒檔這一班分頁讀到末行 `wake:END`（287,736 bytes）。selftest 兩盞黃燈照實帶著：diary 沉默 19 天，五條週班沉默死亡（凌晨班已交接「11-22 起看是否恢復」，本班不重複處理）。

## 重建

EMBEDDING-PIPELINE.md §前置解析到 `EMBED_HOST=http://127.0.0.1:11434`，`/api/tags` 有 bge-m3，Stage 0 探針回 `dim 1024`，沒走備援。本機與 origin 零分岔，`git pull` 是空動作。babel dispatcher 仍在跑（parallel-check `ACTOR_BUSY`），兩者共用本機 ollama。

Stage 1 跑 `--langs all`，13 語共 15,342 向量，每語 0 fail，比昨晚多 83 個。各語向量數：zh-TW 1,181、en 1,181、ja 1,181、ko 1,181、es 1,181、fr 1,180、vi 1,178、id 1,181、pt 1,181、hi 1,176、ar 1,179、ru 1,181、de 1,181。每語耗時 186〜207 秒，全程約 43 分鐘，比前三夜的 239〜276 秒快了兩成多；同一時段 babel 的 commit 只剩 nemo 一個 worker 在出，本機那顆沒在跟索引搶 ollama，這是最可能的原因，沒有另外驗證。

EMBEDDING-PIPELINE.md §Stage 2 儀器 exit 0，verify PASS：語言清單讀 `ENABLED_LANGUAGE_CODES`，13 語每篇都有 8 個鄰居，manifest `bge-m3:latest`／`rag-v1` 無漂移。

Stage 3 先把 `NOW` 落成變數印出（2026-11-21 05:58），index 裡沒有別人的暫存，帶路徑 `-- src/data/related/` commit，`git show --stat` 確認只含 13 個 related 檔。push 一次成功（`5f9b030fdf..c7bc76cb6a`），pre-push 四道閘全綠，fetch 後本機與 origin 零分岔。昨晚的 ref-lock 拒絕今晚沒有重現。

## 收官 checklist

| 檢查項                       | 狀態                                                   |
| ---------------------------- | ------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                     |
| Timestamp 精確               | ✅（甦醒與重建起點標約）                               |
| Handoff 三態已審視           | ✅                                                     |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，交 data-refresh-am 06:00                |
| 自我檢查工具 PASS            | ✅ Stage 2 exit 0                                      |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線 |

## Handoff 三態

繼承自 `2026-11-20-061226-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：routine-sync 提出的 embeddings 改殼生效時差三選項，掛 `OBSERVER-QUEUE #110（待決）`。本班實際執行模型是 Fable 5.2，commit 的 Co-author 照實填。
- [ ] pending（延續，收件席位 Full mode 或 `twmd-self-evolve-weekly`，動得了 `scripts/core/`）：LESSONS `rebuild-keeps-grinding-after-the-endpoint-dies`，今晚零失敗，沒有新證據。
- [ ] pending（延續，收件席位 `/twmd-routine` 或改 `semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`，今晚沒走 worktree，vc 仍是 1。
- [ ] pending（延續，收件席位：哲宇，基礎建設決定）：LESSONS `keystone-fallback-shares-the-hosts-fate`，備援名單仍只有本機。
- [ ] pending（延續第四班，收件席位 `twmd-self-evolve-weekly` 或任何改 pipeline 的班；本 routine 只 commit `src/data/related/`，動不了文件）：EMBEDDING-PIPELINE §Stage 1 的「~13 分鐘，6 語 4640 向量」「每語 ~136s」已過時，四夜實測 13 語 43〜56 分鐘、每語 186〜276 秒。週班 11-22 若恢復，這條才有人收。

本 session 新 handoff：無。

## Beat 5 — 反芻

連續第四夜照文件走就過了。今晚多出來的一個讀數是耗時：同樣的 13 語，從 56 分鐘降到 43 分鐘，而 babel 那邊剛好只剩遠端 worker 在產出。如果這個對應成立，索引重建的時間就是一把順便量得到本機 ollama 忙不忙的尺；目前只有一夜的對照，先記下來，不下結論。昨晚記的「push 被拒先 fetch 比 hash」今晚沒有用上，仍是單例。

🧬

---

_v1.0 | 2026-11-21 06:02 +0800_
_session twmd-embeddings-nightly — 恢復後第四夜完整重建，13 語 15,342 向量零失敗_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0 可達_
_核心洞察：每語耗時比前三夜快兩成多，與本機 babel worker 沒在出稿同時發生，單夜對照先不下結論_
_LESSONS-INBOX：無新條_
