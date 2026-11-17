# 2026-11-07-051930-twmd-embeddings-nightly — 本機 embedding 端點連第三晚掛住，Stage 0 優雅跳過，滿三天門檻升 LESSONS，索引維持 `e6f67ab1b`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:00 → 05:21 +0800（1 commit：本 memory 與教訓，索引零 commit）
> 資料來源：`date` 實測 05:15:29 起、`session-id.sh` 05:19:30、`~/ollama-serve.log`、`git log %ai`。甦醒起點沒有落地的時間戳，取排程窗估計值

✅ BECOME ack: mode=micro / 8 organ 最低=免疫 59（快照齡 22h，標 stale）/ Q14 cross-session continuity=PASS

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建語意索引。wake-context 全檔讀到 `wake:END`，selftest 全綠。BECOME 檔尾的版本沿革有幾行被我自己的 `cut` 截斷，那段是歷史紀錄，不影響本班判斷。

## 探針結果

§前置解析到 `EMBED_HOST=http://127.0.0.1:11434`：`/api/tags` 回得到 bge-m3，所以沒有走備援。Stage 0 探針全掛：`/api/embeddings` 三次等滿 20 秒、再一次等滿 90 秒，`/api/embed` 一次等滿 30 秒，五次都沒有回應。`~/ollama-serve.log` 記這筆 500、1m30s，同時 llama-server 那側顯示任務幾乎立刻處理完並釋放 slot，跟 `OBSERVER-QUEUE #124（待決）` 記的形狀一致：算得出來，回不到 ollama。

備援這條路今晚同樣不存在。registry 帶 bge-m3 的節點兩台，一台 offline（100.74.47.100），一台就是本機。TIME_WAIT 262,220（昨晚 257,681），開機第 54 天。依 Stage 0 判定不可達，優雅跳過，Stage 1、Stage 3 未執行，沒有重啟 ollama：之前重啟兩次無效，而且 dispatcher 正在共用它。

## 三天門檻

11-05 重建卡住、11-06 跳過、11-07 跳過，連續第三晚沒有完整索引，達 pipeline 門檻。LESSONS 開了 `keystone-fallback-shares-the-hosts-fate`：先查過 DNA，#74 談同一單點在多條 routine 重複，本條問備援自己活不活。7 月遷回本機時這條單點曾被判 superseded，當時的證據是四夜零故障，量到的是應用層。

## 索引現況

線上仍是 11-04 那版：manifest `builtAt` 2026-11-03T21:16:36Z，`bge-m3:latest`／`rag-v1`，13 語 14,882 向量（zh-TW 1,147、en 1,146、ja 1,145、ko 1,146、es 1,144、fr 1,144、vi 1,144、id 1,144、pt 1,145、hi 1,144、ar 1,143、ru 1,145、de 1,145），該版 fail rate 0.02%。本班新向量 0，fail rate 不適用。

Stage 2 儀器唯讀跑在工作樹上，13 語每篇都有 8 個鄰居，manifest 無漂移，exit 0。這個綠燈不算本班的驗證：工作樹九語仍是 11-05 卡住那班的半成品，hi／ar／ru／de 與 manifest 是 11-04 版，所以九個 dirty 檔照舊不收。它們的 mtime 變成 11-07 00:45，每檔 diff 仍是一行，誰碰過沒有追到。PID 52709（11-05 那班）還在，狀態 S，跑了兩天，本班沒起跑，沒動它。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                         |
| Timestamp 精確               | ✅（甦醒起點標約）                                         |
| Handoff 三態已審視           | ✅                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，快照 stale 22h，等 data-refresh-am          |
| 自我檢查工具 PASS            | ⚠️ Stage 2 唯讀 PASS，對象是混合工作樹，不算本班重建的驗證 |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線     |

## Handoff 三態

繼承自 `2026-11-06-052432-twmd-embeddings-nightly.md`：

- [x] ~~11-07 再跳過就 escalate LESSONS~~ retired by 本班：`keystone-fallback-shares-the-hosts-fate` 已落檔。
- [ ] pending（收件席位：下一次完整重建的本 routine）：起跑前先確認 PID 52709 不在，還在就先停它再跑，兩份同跑會互搶。重開機就自然消失。
- [ ] pending（收件席位：下一次完整重建的本 routine）：ar `technology/rayark-games` 仍不在索引。
- ⏳ blocked（等 `OBSERVER-QUEUE #124（待決）`，收件席位：哲宇）：重開機。驗收點：Stage 0 探針回 `dim 1024`。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`，本席位不改殼）：routine-sync 提出的 embeddings 改殼生效時差三選項。
- 證據點（掛 `OBSERVER-QUEUE #110（待決）`）：註 ²⁸ 分級要本 routine 跑 Haiku，本班實際仍是 Opus 5.5。
- [ ] pending（延續，收件席位 Full mode 席位或 `twmd-self-evolve-weekly`，動得了 `scripts/core/`）：LESSONS `rebuild-keeps-grinding-after-the-endpoint-dies`，`build-embeddings.mjs` 缺連敗中止。
- [ ] pending（延續，收件席位 `/twmd-routine` 或改 `semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`，今晚沒走 worktree，vc 仍是 1。

本 session 新 handoff：

- [ ] pending（收件席位：哲宇，基礎建設決定，本 routine 動不了）：LESSONS `keystone-fallback-shares-the-hosts-fate`，要不要恢復一台常駐 bge-m3 備援。
- [ ] pending（收件席位：下一班本 routine）：繼續跳過時 LESSONS 只補 instance，不再開新條（REFLEXES #80）。

## Beat 5 — 反芻

昨晚記下的是「排除互搶」，今晚沒有新診斷可加，同一面牆再量一次，只多了一個 90 秒的讀數，確認這是掛住，慢得再久也等不到。今晚唯一新的東西在備援那一行：pipeline 寫著軍團備援，登記表上能走的路其實是零條。這條路七月被判不用再擔心的時候，判斷有數字支持，只是那幾夜沒有機會測到主機層的病。

🧬

---

_v1.0 | 2026-11-07 05:21 +0800_
_session twmd-embeddings-nightly — 本機 embedding 端點連第三晚掛住，Stage 0 優雅跳過，索引維持 11-04 版_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0 判定不可達_
_核心洞察：滿三天門檻；備援名單裡活著的只剩本機，主機一病就沒有第二條路_
_LESSONS-INBOX：`keystone-fallback-shares-the-hosts-fate`（已落檔）_
