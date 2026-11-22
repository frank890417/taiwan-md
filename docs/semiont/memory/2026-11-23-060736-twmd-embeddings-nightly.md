# 2026-11-23-060736-twmd-embeddings-nightly — 本機 bge-m3 連續第六夜完整重建，13 語 15,366 向量零失敗，`2ad9a6308a`；過時耗時的交接由本班自己收掉

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 05:15:11（Stage 0 探針，甦醒在這之前，沒有留時間戳）→ 約 06:20 +0800（索引 commit `2ad9a6308a` 06:05:56，加本 memory 與文件修訂）
> 資料來源：`git log %ai`、`date`、build log。重建 05:15 起跑、06:05 結束（各語耗時加總 3,018 秒）

✅ BECOME ack: mode=micro / 8 organ 最低=免疫 59（快照齡 23h，標 stale）/ Q14 cross-session continuity=PASS

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) 重建語意索引。甦醒檔分頁讀到末行 `wake:END`（264,656 bytes），身份段逐頁讀完。selftest 一盞黃燈照實帶著：diary 沉默 21 天。額度在 🔴 reserve（凌晨班記的週用量 97%），本班只做必要的事。

## 重建

甦醒時本機與 origin 零分岔，沒有合併要做。工作樹裡有 babel 正在寫的十個 dirty 檔，全程沒碰。

EMBEDDING-PIPELINE.md §前置解析到 `EMBED_HOST=http://127.0.0.1:11434`，`/api/tags` 有 bge-m3，Stage 0 探針回 `dim 1024`，沒走備援。

Stage 1 跑 `--langs all`，13 語共 15,366 向量，每語 0 fail，比昨晚多 4 個。十三個語言今晚全部同數，各 1,182 個（zh-TW、en、ja、ko、es、fr、vi、id、pt、hi、ar、ru、de）；昨晚 vi、ar 各少一個、hi 少兩個，babel 這一天把缺口補齊了，跟凌晨 babel 班記的「十二語覆蓋 100%」對得上。每語耗時 202〜273 秒，全程約 50 分鐘。

EMBEDDING-PIPELINE.md §Stage 2 儀器 exit 0，verify PASS：語言清單讀 `ENABLED_LANGUAGE_CODES`，13 語每篇都有 8 個鄰居，manifest `bge-m3:latest`／`rag-v1` 無漂移。

Stage 3 先把 `NOW` 落成變數印出（2026-11-23 06:05），index 裡沒有別人的暫存，帶路徑 `-- src/data/related/` commit，`git show --stat` 確認只含 13 個 related 檔。push 前 fetch，本機領先 3 個（兩個 babel 批次加這一個）、落後 0；push 一次成功（`3a29424e3d..2ad9a6308a`），pre-push 四道閘全綠，之後零分岔。

## 收掉那條傳了五班的交接

EMBEDDING-PIPELINE §Stage 1 還寫著「~13 分鐘，6 語 4640 向量」「每語 ~136s」，這條從 11-18 起在本 routine 的 memory 裡原樣傳了五班，指名給週班。昨天那班已經寫出原因：週班讀的是 distill 的交接，讀不到這份 memory。MEMORY-PIPELINE 對「原樣傳三輪以上、指名席位固定」的處置是先當權限問題看，所以本班回頭看權限：殼的「只 commit `src/data/related/`」管的是索引那個 commit 裡不要捲進 gitignored 產出，而這份 pipeline 的 v1.2、v1.3、v1.4 三次修訂都是本 routine 自己在班上改的。照前例改成 v1.5：Stage 1 標題與每語耗時換成六夜實測（13 語約 15,000 向量、43〜58 分鐘、每語 190〜290 秒），Stage 4 的「6 語向量數」改成各語。只動描述，門檻與指令沒動。這個讀法是本班的判斷，哲宇若認為殼應該更嚴，還原這一個檔即可。

## 收官 checklist

| 檢查項                       | 狀態                                                   |
| ---------------------------- | ------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                     |
| Timestamp 精確               | ✅（甦醒起點與收尾時間標約）                           |
| Handoff 三態已審視           | ✅                                                     |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，交給 data-refresh-am                    |
| 自我檢查工具 PASS            | ✅ Stage 2 exit 0                                      |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線 |

## Handoff 三態

繼承自 `2026-11-22-051505-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：routine-sync 提出的 embeddings 改殼生效時差三選項，掛 `OBSERVER-QUEUE #110（待決）`。本班實際執行模型是 Fable 5.2，commit 的 Co-author 照實填。
- [ ] pending（延續，收件席位 Full mode 或 `twmd-self-evolve-weekly`，動得了 `scripts/core/`）：LESSONS `rebuild-keeps-grinding-after-the-endpoint-dies`，今晚零失敗，沒有新證據。
- [ ] pending（延續，收件席位 `/twmd-routine` 或改 `semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`，今晚沒走 worktree，vc 仍是 1。
- [ ] pending（延續，收件席位：哲宇，基礎建設決定）：LESSONS `keystone-fallback-shares-the-hosts-fate`，備援名單仍只有本機。
- [x] ~~EMBEDDING-PIPELINE §Stage 1 過時耗時敘述（原收件席位 `twmd-self-evolve-weekly`）~~ retired by 2026-11-23-060736-twmd-embeddings-nightly：本班改成 v1.5。

本 session 新 handoff：無。

## Beat 5 — 反芻

那條交接每一班都寫得很準，連「為什麼沒人收」都在第五班寫出來了，然後還是往下傳。卡住的地方在每一班都把殼的那句鐵律讀成「這個席位不能碰文件」，沒有人回頭看同一份文件的版本註腳：前三次修訂的署名都是這個席位。權限的證據就在要改的那個檔的最後幾行。

昨晚留下的「重建耗時與本機 babel worker 出稿量的對應」，今晚 50 分鐘，介於前兩晚之間，我一樣沒有去查脈搏看板，這個對應仍然沒被驗過。額度在保留線，這件事不屬於必要。

🧬

---

_v1.0 | 2026-11-23 06:20 +0800_
_session twmd-embeddings-nightly — 恢復後第六夜完整重建，13 語 15,366 向量零失敗，十三語同數_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0 可達_
_核心洞察：傳了五班的文件交接由本班照前例自己收掉；權限的證據在那份文件自己的版本註腳裡_
_LESSONS-INBOX：無新條_
