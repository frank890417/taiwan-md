# 2026-11-26-051527-twmd-embeddings-nightly — 第九夜完整重建，13 語 15,379 向量零失敗，`5f95fb1041`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:0X 甦醒 → 06:12 +0800（session-id 05:15:27 取號；重建約 05:16 起跑、06:08:11 結束，各語耗時加總 3,369 秒；索引 commit 06:08:23）
> 資料來源：`session-id.sh`、`date`、build log、`git log %ai`

✅ BECOME ack: mode=micro / 8 organ 最低=免疫 59（快照齡 23h，標 stale）/ Q14 cross-session continuity=PASS

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.5 重建語意索引。甦醒檔用 Read 分頁讀到末行 `wake:END`（267,479 bytes），十一段都讀完，selftest 全綠。groundtruth 有一個 `ACTOR_BUSY`：babel dispatcher 在跑，它的 dirty 檔全程沒碰。

## 重建

EMBEDDING-PIPELINE.md §前置解析到 `EMBED_HOST=http://127.0.0.1:11434`，`/api/tags` 有 `bge-m3:latest`，Stage 0 探針回 `dim 1024`，沒走備援。甦醒時本機領先 origin 3、落後 0，pull 沒有東西進來，沒有分岔要處理。

Stage 1 跑 `--langs all`，13 語共 15,379 向量，每語 0 fail，fail rate 0%。十三語同數各 1,183 篇，跟昨晚一樣。每語耗時 205〜280 秒，全程約 56 分鐘，比昨晚慢約十三分鐘：前六語（zh-TW 到 fr）每語 246〜280 秒，後七語回到 205〜264 秒。同一時段 babel dispatcher 在本機用同一個 ollama 翻譯，搶的是同一張卡，慢的那段大概就是兩邊重疊的時間。這是推測，log 裡沒有可以佐證的數字，落在 v1.5 寫的 43〜58 分鐘區間內，不算異常。

EMBEDDING-PIPELINE.md §Stage 2 儀器 exit 0，verify PASS：語言清單讀 `ENABLED_LANGUAGE_CODES`，13 語每篇都有 8 個鄰居，manifest `bge-m3:latest`／`rag-v1` 無漂移。

Stage 3 先把 `NOW` 落成變數印出（2026-11-26 06:08），index 裡沒有別人的暫存，帶路徑 `-- src/data/related/` commit `5f95fb1041`，13 個 related 檔、13 行增刪。push 時連同 babel 先前的一個 ar 批次一起上去，pre-push 四道閘全綠。push 後本機仍顯示領先 1，再 fetch 一次確認是 dispatcher 同時 push 造成的讀數時差，`5f95fb1041` 已在 origin/main。

## 收官 checklist

| 檢查項                       | 狀態                                                   |
| ---------------------------- | ------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                     |
| Timestamp 精確               | ✅（甦醒起點未取號前無紀錄，標約）                     |
| Handoff 三態已審視           | ✅                                                     |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，交給 data-refresh-am（同時段正在跑）    |
| 自我檢查工具 PASS            | ✅ Stage 2 exit 0                                      |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線 |

## Handoff 三態

繼承自 `2026-11-25-051455-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：routine-sync 提出的 embeddings 改殼生效時差三選項，掛 `OBSERVER-QUEUE #110（待決）`。本班實際執行模型是 Opus 5.5，Co-author 照實填。
- [ ] pending（延續，收件席位 Full mode 或 `twmd-self-evolve-weekly`，動得了 `scripts/core/`）：LESSONS `rebuild-keeps-grinding-after-the-endpoint-dies`，今晚零失敗，沒有新證據。
- [ ] pending（延續，收件席位 `/twmd-routine` 或改 `semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`，今晚沒走 worktree，vc 仍是 1。
- [ ] pending（延續，收件席位：哲宇，基礎建設決定）：LESSONS `keystone-fallback-shares-the-hosts-fate`，備援名單仍只有本機。

本 session 新 handoff：無。

## Beat 5 — 反芻

今晚的重建時間落在區間上緣，前半段慢、後半段回正，形狀像有人跟我共用那張卡一陣子之後離開。我沒辦法從 build log 證明是 babel，因為 log 只記每語總耗時，沒記同時有誰在用 ollama。先寫成推測，等哪天真的超出 58 分鐘再去量，現在加儀器是為一個還沒出事的數字造尺。

🧬

---

_v1.0 | 2026-11-26 06:12 +0800_
_session twmd-embeddings-nightly — 第九夜完整重建，13 語 15,379 向量零失敗_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0 可達_
_核心洞察：與 babel 共用本機 ollama 時重建偏慢，仍在區間內，先記推測不造尺_
_LESSONS-INBOX：無新條_
