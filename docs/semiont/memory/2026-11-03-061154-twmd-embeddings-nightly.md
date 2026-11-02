# 2026-11-03-061154-twmd-embeddings-nightly — 主樹直接重建，〈金馬獎〉〈中華職棒〉進索引，13 語 14,874 向量 1 fail，verify PASS，`8351a3aa5`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:00 → 06:12:15 +0800（約 72 分鐘，2 commit：索引＋本 memory）
> 資料來源：重建 log 建立 05:16:12、修改 06:10:15；`git log %ai`（索引 commit 06:10:35）；`session-id.sh` 06:11:54。甦醒起點沒有落地的時間戳，取排程窗估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一版是昨晚停擺七夜後第一次重建的 `cb8c0b5d9`，本班是登入恢復後的第二晚。

BECOME micro 跑完：wake-context 讀到 `wake:END` sentinel，selftest 只亮一盞黃燈（工作樹落後 origin 2 個 commit），在動手前用 pull 解掉。器官讀數 🫀90 🛡️59 🧬80 🦴90 🫁85 🧫100 👁️90 🌐92，最低仍是免疫 59，快照齡 23 小時標 stale。觀察者 0 天前在場（memory handle α）。本班純機械重建，沒有碰到任何需要代理決定的事。

## 這次主樹就能直接重建

§前置先問本機：EMBED_HOST 解析為 `127.0.0.1:11434`，有 bge-m3，Stage 0 回 `dim 1024`，沒用到 fleet 備援。

主樹領先 origin 13、落後 2，babel dispatcher 仍在寫 43 個 dirty 檔，index 裡沒有別人的暫存。昨晚 `git pull --ff-only` 被 dirty 的算力帳本擋住，只好改開 worktree；今晚先用 `git merge-tree --write-tree` 預演，結果乾淨，origin 那兩個 commit 只動到一份 iOS App 的 memory 檔，跟 dispatcher 的 dirty 檔不重疊。所以照 pipeline 原路在主樹 merge pull，沒有開 worktree，dispatcher 的檔一個也沒碰。

`build-embeddings.mjs --langs all` 05:16:12 起跑，每語 212〜276 秒，06:10:15 結束，共 14,874 向量。唯一一筆失敗是 `ar/food/gua-bao` 回 `fetch failed`，是對本機 ollama 的單次請求失敗，不是內容問題，fail rate 0.007%，遠低於 5% 門檻。

## 驗證與 commit

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語：zh-TW 1,147 篇、ar 1,143 篇（少的就是那篇刈包）、其他十一語各 1,144 篇，每篇都有 8 個鄰居，manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。zh 索引比昨晚多了 `art/金馬獎`、`culture/中華職棒`，移除 0 篇。這兩篇是 11-02 白天上線的，昨晚 05:16 開跑時還不存在，今晚之後頁尾就有語意鄰居了。

Stage 3：`$NOW` 先落變數印出 `2026-11-03 06:10`，帶 pathspec 只 commit `src/data/related/`，13 檔各一行，得到 `8351a3aa5`。push 前再 pull 一次無新進，pre-push 三道語言與型別閘門全綠，推完領先落後皆 0。主樹本來就有 gitignored 衍生檔，昨晚在 worktree 撞到的 `fork-graph.json` 缺檔今晚沒有出現。Co-author 照實填本班的 Claude Opus 5.5。

## 收官 checklist

| 檢查項                       | 狀態                                                   |
| ---------------------------- | ------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                     |
| Timestamp 精確               | ✅（重建起訖取 log 建立／修改時間，甦醒起點標約）      |
| Handoff 三態已審視           | ✅                                                     |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，快照 stale 23h，等 data-refresh-am      |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                            |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線 |

## Handoff 三態

繼承自 `2026-11-02-060935-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`，本席位不改殼）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- 證據點（掛 `OBSERVER-QUEUE #110（待決）`，不另行帶）：註 ²⁸ 分級要本 routine 跑 Haiku，本班實際仍是 Opus 5.5。
- [ ] pending（延續，收件席位 `/twmd-routine` 或任何改 `scripts/tools/semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`。今晚沒走 worktree，沒有新證據，vc 仍是 1。另外昨晚開的 `.worktrees/20261102-embeddings-nightly` 還在，屬於凌晨 α 班記的「孤兒 worktree 四個歸屬未判」那一串；它的工作已經合進 `cb8c0b5d9`，本班不刪，留給清 worktree 的那個席位確認後收掉。

本 session 新 handoff：

- [ ] pending（收件席位：明晚本 routine）：`ar/food/gua-bao` 今晚單次 `fetch failed` 不在 ar 索引裡，頁尾暫時退回同分類鄰居。明晚重建若又是同一篇失敗，就不是偶發，要查那篇的文摘長度或內容。

## Beat 5 — 反芻

昨晚改開 worktree 是因為 pull 被擋；今晚沒有照抄昨晚的做法，先用 merge-tree 量一次，發現原路就走得通。兩晚面對的是同一個「主樹 dirty」的情境，處置不同，差別在 origin 那幾個 commit 有沒有碰到 dispatcher 正在寫的檔。昨晚的 worktree 解法是對的，但它是那一晚的解法，不是這條 routine 的新預設。

🧬

---

_v1.0 | 2026-11-03 06:12 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,874 向量 1 fail，verify PASS，`8351a3aa5`_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 執行_
_核心洞察：主樹 dirty 時先用 merge-tree 預演，不重疊就走原路，用不著開 worktree。〈金馬獎〉〈中華職棒〉兩篇新文進索引_
_LESSONS-INBOX 候選：無_
