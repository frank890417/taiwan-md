# 2026-11-04-061109-twmd-embeddings-nightly — 13 語 14,882 向量 3 fail，verify PASS，`e6f67ab1b`；昨晚掉出 ar 索引的〈刈包〉回來了

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:00 → 06:11:09 +0800（約 71 分鐘，2 commit：索引＋本 memory）
> 資料來源：重建 log 建立 05:16:36、修改 06:09:02；`git log %ai`（索引 commit 06:09:24）；`session-id.sh` 06:11:09。甦醒起點沒有落地的時間戳，取排程窗估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一版是昨晚的 `8351a3aa5`。

BECOME micro 跑完：wake-context 讀到 `wake:END` sentinel，selftest 12 項全綠，工作樹與 origin 同步，babel dispatcher 在跑（ACTOR_BUSY，19 個 dirty 檔，index 裡沒有別人的暫存）。器官讀數 🫀90 🛡️59 🧬80 🦴90 🫁85 🧫100 👁️90 🌐92，最低仍是免疫 59，快照齡 23 小時標 stale。觀察者 0 天前在場（memory handle α）。本班純機械重建，沒碰到要代理決定的事。

## 重建與驗證

§前置先問本機：EMBED_HOST 解析為 `127.0.0.1:11434`，有 bge-m3。Stage 0 第一次探針在 20 秒逾時內回了空字串，重打一次 1.5 秒回 `dim 1024`；第一次多半是模型冷載入撞上 babel 正在用同一個 ollama，沒有用到 fleet 備援。本機與 origin 領先落後皆 0，不需要 pull 或 merge-tree 預演。

`build-embeddings.mjs --langs all` 05:16:36 起跑，每語 184〜283 秒，06:09:02 結束，共 14,882 向量。三筆 `fetch failed`：fr〈牯嶺街〉、fr〈猴硐貓村〉、ar〈雷亞遊戲〉，都是對本機 ollama 的單次請求失敗，fail rate 0.02%，遠低於 5% 門檻。

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語，zh-TW 1,147 篇，其他語言 1,143〜1,146 篇，每篇都有 8 個鄰居，manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。跟昨晚比，zh 索引沒有增減；fr 補進〈中華職棒〉〈金馬獎〉兩篇譯文、少了今晚失敗的兩篇；ar 補回昨晚失敗的〈刈包〉、少了〈雷亞遊戲〉。

Stage 3：`$NOW` 先落變數印出 `2026-11-04 06:09`，帶 pathspec 只 commit `src/data/related/`，13 檔各一行，得到 `e6f67ab1b`。pre-push 三道語言與型別閘門全綠，推完領先落後皆 0。Co-author 照實填本班的 Claude Opus 5.5。

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

繼承自 `2026-11-03-061154-twmd-embeddings-nightly.md`：

- [x] ~~`ar/food/gua-bao` 單次 fetch failed，明晚若同篇再敗就要查文摘~~ retired by 本班：今晚重建成功進 ar 索引，昨晚是偶發。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`，本席位不改殼）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- 證據點（掛 `OBSERVER-QUEUE #110（待決）`，不另行帶）：註 ²⁸ 分級要本 routine 跑 Haiku，本班實際仍是 Opus 5.5。
- [ ] pending（延續，收件席位 `/twmd-routine` 或任何改 `scripts/tools/semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`。今晚沒走 worktree，vc 仍是 1；`.worktrees/20261102-embeddings-nightly` 仍屬凌晨 α 班記的孤兒 worktree 那一串，本班不刪。

本 session 新 handoff：

- [ ] pending（收件席位：明晚本 routine）：fr `geography/guling-street`、fr `geography/houtong-cat-village`、ar `technology/rayark-games` 今晚單次 `fetch failed`，頁尾暫時退回同分類鄰居。明晚同一篇若再敗才算訊號；連兩晚失敗的篇目都不同，目前看是本機 ollama 跟 babel 共用時的偶發。

## Beat 5 — 反芻

昨晚交接寫「同一篇再敗才不是偶發」，今晚那篇成功了，換成另外三篇失敗。這種交接的價值在於它事先寫好了判準，今晚只需要對一次就能收掉，不必重新決定什麼叫訊號。Stage 0 的第一次探針逾時也是同一類事：探針失敗不等於節點不可達，重打一次就分得出冷載入跟真的離線，沒有因此走 graceful skip。

🧬

---

_v1.0 | 2026-11-04 06:11 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,882 向量 3 fail，verify PASS，`e6f67ab1b`_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 執行_
_核心洞察：交接先寫好「什麼算訊號」，下一班只需對一次；探針第一次逾時先重打，分開冷載入與離線_
_LESSONS-INBOX 候選：無_
