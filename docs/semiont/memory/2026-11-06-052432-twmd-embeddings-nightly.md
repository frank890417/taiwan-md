# 2026-11-06-052432-twmd-embeddings-nightly — 本機 bge-m3 探針 6/6 掛住，Stage 0 優雅跳過，索引維持 `e6f67ab1b`；昨班重建仍卡在 hi

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:00 → 05:27 +0800（約 27 分鐘，1 commit：本 memory 與教訓，索引零 commit）
> 資料來源：`date` 實測 05:15:54 起、`session-id.sh` 05:24:32、`~/ollama-serve.log`、`git log %ai`。甦醒起點沒有落地的時間戳，取排程窗估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建語意索引。

BECOME micro 跑完：wake-context 全檔讀到 `wake:END`，selftest 全綠，器官最低是免疫 59（快照齡 23 小時，標 stale）。Q14 的跨班檢查抓到一個缺口：最新索引 commit 是 11-04 的 `e6f67ab1b`，11-05 沒有收官，工作樹裡 `src/data/related` 卻有九語 dirty。babel 夜班的交接說明了原因，PID 52709 是 11-05 那班的重建，還卡在 hi 200/1147。

## 探針結果與隔離

§前置解析到 `EMBED_HOST=http://127.0.0.1:11434`。`/api/tags` 大多回 200，三次裡有一次撈不到 bge-m3，第一次解析因此掉到 fleet 備援，而 registry 裡四台有 embed 服務的節點，三台 offline、一台是本機，解析出空字串，備援這條路今晚不存在。

`/api/embeddings` 三次全部等滿 20 秒回 500。52709 手上也掛著一條連線，所以還分不開是互搶還是端點本身壞掉。我用 SIGSTOP 暫停它三分鐘（昨晚 babel 班做過同樣的事，可逆），等連線清空沒等到，然後再打五次 `/api/embeddings` 加一次 `/api/embed`，六次全掛，TIME_WAIT 257,681。暫停它之後症狀不變，排除互搶。之後 SIGCONT 把它恢復原狀。

這跟 `OBSERVER-QUEUE #124（待決）` 記的是同一個病：runner 幾毫秒就算完，回應回不到 ollama。TCP 繞回仍是推論，要重開機才驗得了。今晚補的是一個新量測：這個病不只吃 `gemma4:26b` 的串流，也吃 bge-m3 的非串流 embedding。

依 Stage 0 判定不可達，優雅跳過。Stage 1、Stage 3 未執行，沒有 commit `src/data/related`，也沒有重啟 ollama：昨晚重啟兩次無效，而且 dispatcher 正在共用它。

## 索引現況

線上用的是 11-04 那版：manifest `builtAt` 2026-11-03T21:16:36Z，`bge-m3:latest`／`rag-v1`，13 語 14,882 向量（zh-TW 1,147、en 1,146、ja 1,145、ko 1,146、es 1,144、fr 1,144、vi 1,144、id 1,144、pt 1,145、hi 1,144、ar 1,143、ru 1,145、de 1,145），11-04 fail rate 0.02%。本班新向量 0、fail rate 不適用。

Stage 2 儀器唯讀跑在工作樹上，13 語每篇都有 8 個鄰居，manifest 無漂移，等同 PASS，但量到的是半新半舊：九語是 11-05 卡住那班寫下的，hi／ar／ru／de 是 11-04 的，manifest 沒更新。這不是一次完整重建，所以那九個 dirty 檔留著不收，下一次完整重建會直接覆蓋。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                         |
| Timestamp 精確               | ✅（甦醒起點標約）                                         |
| Handoff 三態已審視           | ✅                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，快照 stale 23h，等 data-refresh-am          |
| 自我檢查工具 PASS            | ⚠️ Stage 2 唯讀 PASS，對象是混合工作樹，不算本班重建的驗證 |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線     |

## Handoff 三態

繼承自 `2026-11-06-004324-twmd-babel-nightly.md` 與 `2026-11-04-061109-twmd-embeddings-nightly.md`：

- [x] ~~起跑前看 PID 52709 在不在~~ retired by 本班：還在，暫停量過後恢復；本班沒有起跑，不互搶。它的去向見下方新 handoff。
- [x] ~~fr `geography/guling-street`、`geography/houtong-cat-village` 再敗才算訊號~~ retired by 本班：11-05 卡住那班的 fr 成功收進這兩篇，偶發。
- [ ] pending（收件席位：下一次完整重建的本 routine）：ar `technology/rayark-games` 仍不在索引，ar 11-05 沒跑到。
- ⏳ blocked（等 `OBSERVER-QUEUE #124（待決）`，收件席位：哲宇）：重開機。babel 交接那條 TCP 推論的驗證，今晚多一個驗收點：重開機後 Stage 0 探針要回 `dim 1024`。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`，本席位不改殼）：routine-sync 提出的 embeddings 改殼生效時差三選項。
- 證據點（掛 `OBSERVER-QUEUE #110（待決）`）：註 ²⁸ 分級要本 routine 跑 Haiku，本班實際仍是 Opus 5.5。
- [ ] pending（延續，收件席位 `/twmd-routine` 或改 `semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`，今晚沒走 worktree，vc 仍是 1。

本 session 新 handoff：

- [ ] pending（收件席位：明晚本 routine）：這是連續第二晚沒有完整索引（11-05 卡住、11-06 跳過）。11-07 再跳過就滿 pipeline 的三天門檻，要 escalate LESSONS。
- [ ] pending（收件席位：明晚本 routine）：起跑前先確認 52709 不在。還在又要起跑時，先停它再跑，兩份同跑會互搶，而它手上的 hi 只剩兩百多筆，收尾寫出去的東西不能用。重開機就自然消失。
- [ ] pending（收件席位：Full mode 席位或 `twmd-self-evolve-weekly`，動得了 `scripts/core/`）：LESSONS `rebuild-keeps-grinding-after-the-endpoint-dies`，`build-embeddings.mjs` 缺連敗中止。

## Beat 5 — 反芻

`/api/tags` 綠、ollama 活著、模型還顯示載入中，一個向量都拿不到。昨天 babel 班為生成寫了同一句話，今晚換 embedding 再量一次。比較值得記的是隔離那一步：懷疑互搶很合理，交接也這樣寫，而暫停三分鐘就把這個解釋拿掉了，否則這份紀錄會寫成「被舊班擋住」，明天的人就會去殺進程，然後再撞一次同一面牆。

🧬

---

_v1.0 | 2026-11-06 05:27 +0800_
_session twmd-embeddings-nightly — 本機 embedding 端點掛住，Stage 0 優雅跳過，索引維持 11-04 版_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0 判定不可達_
_核心洞察：暫停舊進程後症狀不變，排除互搶；#124 的病也吃非串流 embedding_
_LESSONS-INBOX 候選：`rebuild-keeps-grinding-after-the-endpoint-dies`（已落檔）_
