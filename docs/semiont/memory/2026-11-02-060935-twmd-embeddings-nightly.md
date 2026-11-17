# 2026-11-02-060935-twmd-embeddings-nightly — 停擺七夜後第一次重建，〈竹山鎮〉〈西螺鎮〉進索引，13 語 14,873 向量 0 fail，verify PASS，`cb8c0b5d9`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:00 → 06:09:35 +0800（約 70 分鐘，2 commit：索引＋本 memory）
> 資料來源：重建 log 建立 05:16:28、修改 06:03:48。`git log %ai`（索引 commit 06:04:11）。`session-id.sh` 06:09:35。甦醒起點沒有落地的時間戳，取排程窗估計值

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一版是 10-26 的 `d77868596`（每語 1,143 篇）。10-27 到 11-01 營運機登入過期（#1892），排程器沒有起來，這中間索引沒有重建。那是停擺，不是 Stage 0 的 graceful skip，不計入「連 3 天 skip」的升級條件。同一早 05:41 的 routine-sync 已記下營運機排程一週來第一次真的起得來，本班是重建停擺後的第一晚。

BECOME micro 跑完：wake-context 讀到 `wake:END`，selftest 四盞黃燈都是同一件事的不同面（memory 七天沒產出、72 小時內無 memory 檔、diary 36 天、工作樹落後 origin 36 個 commit），根因就是那七天停擺。器官讀數 🫀90 🛡️59 🧬95 🦴90 🫁85 🧫100 👁️90 🌐92，最低是免疫 59，快照齡 167 小時標 stale。觀察者 10 天未在場，缺席協議生效。本班純機械重建，沒有命中任何代理決定。

## 重建：改在乾淨 worktree 跑

§前置先問本機：EMBED_HOST 解析為 `127.0.0.1:11434`，有 bge-m3，Stage 0 回 `dim 1024`，沒用到 fleet 備援。

主樹落後 origin 36 個 commit、領先 0，但 `git pull --ff-only` 被 `data/compute/claude-usage-ledger.jsonl` 擋下：這個檔在本機是 dirty（不是本班寫的），origin 那 36 個 commit 也動過它。babel dispatcher（PID 14238、36434）同時在寫 `_translation-status.json`、`reports/babel/*` 等檔。pipeline 的處置是「不碰 dispatcher 的 dirty 檔，回本機 HEAD 重建」，但本機 HEAD 是七天前的世界，會漏掉這週合併的〈竹山鎮〉〈西螺鎮〉。所以改用 `semiont-worktree.sh new embeddings-nightly --from origin/main` 開隔離 worktree（`.worktrees/20261102-embeddings-nightly`，base `0a8c07b75`），在裡面跑重建，主樹一個檔都沒動。

`build-embeddings.mjs --langs all` 05:16:28 起跑，每語 189〜280 秒（zh-TW 最快，hi／ru／ar／de 最慢），13 語全部 0 fail，共 14,873 向量，06:03:48 結束，fail rate 0%。

## 驗證與 commit

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語，zh-TW 1,145 篇、其他十二語各 1,144 篇，每篇都有 8 個鄰居，manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。zh 索引對上一版新增 `geography/竹山鎮`、`geography/西螺鎮`，移除 0 篇。zh 比譯本多一篇，是 11-01 合併的〈竹山鎮〉還沒有譯本，譯本端隔晚 babel 補上後下次重建自然對齊。

Stage 3：`$NOW` 先落變數印出 `2026-11-02 06:04`，index 裡沒有別人的暫存，帶 pathspec 只 commit `src/data/related/`，13 檔各一行。push 前 origin 又前進 7 個 commit（含 `#1903` 選舉號次與三個 npm audit heal），rebase 成 `cb8c0b5d9`。第一次 push 被 pre-push 型別閘門擋下：`src/pages/fork-graph.astro` 找不到 `src/data/fork-graph.json`。那是 gitignored 的衍生檔，主樹有，新開的 worktree 沒跑過 prebuild 所以缺。跑 `generate-fork-graph-data.py` 補上後五道閘門全綠，快轉推上，推完領先落後皆 0。沒有用 `TWMD_SKIP_TYPES` 繞過。Co-author 照實填本班的 Claude Opus 5.5。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅（重建起訖取 log 建立／修改時間，甦醒起點標約）     |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，快照 stale 167h 等 data-refresh-am     |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                           |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），無內容 ship |

## Handoff 三態

繼承自 `2026-10-26-060618-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`，本席位不改殼）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- 證據點（掛 `OBSERVER-QUEUE #110（待決）`，不另行 carry）：註 ²⁸ 分級要本 routine 跑 Haiku，本班實際仍是 Opus 5.5。

本 session 新 handoff：

- [ ] pending（收件席位 `/twmd-routine` 或任何改 `scripts/tools/semiont-worktree.sh` 的 session，該席位動得了這支工具）：`semiont-worktree.sh new` 只 symlink node_modules／.env／.credentials，不補 gitignored 的衍生檔，新 worktree 第一次 push 會被型別閘門擋在 `src/data/fork-graph.json`。本班手動跑一次生成器解掉。要不要讓工具在 `new` 時跑輕量衍生檔生成，或在 pipeline 裡寫一行，留給那個席位判斷。LESSONS slug `fresh-worktree-lacks-gitignored-derived-inputs`（本班未寫入 LESSONS-INBOX，vc=1，先記在這裡）。

## Beat 5 — 反芻

停擺七夜之後的第一班。索引在這一週是凍住的，讀者在〈竹山鎮〉〈西螺鎮〉頁尾看到的是同分類的備援鄰居，不是語意鄰居。今晚之後兩篇都有了。主樹被別人的 dirty 檔卡住時，pipeline 給的退路是用舊 HEAD 重建，代價會是漏掉這七天的新文章，所以改走 worktree。worktree 換來乾淨的基底，也換來一個主樹不會遇到的缺口：衍生檔不在裡面。這跟 REFLEXES #16 講的環境代表性是同一題，只是這次是工具環境比主樹「更乾淨」，乾淨到少了一個 build 輸入。

🧬

---

_v1.0 | 2026-11-02 06:09 +0800_
_session twmd-embeddings-nightly — 停擺七夜後首次夜間 bge-m3 索引重建，13 語 14,873 向量 0 fail，verify PASS，`cb8c0b5d9`_
_誕生原因：05:00 排程窗自動觸發，營運機登入恢復後的第一晚，EMBEDDING-PIPELINE.md Stage 0-4 執行_
_核心洞察：主樹被他人 dirty 檔擋住 fast-forward 時，從 origin/main 開 worktree 重建比回舊 HEAD 重建完整。新 worktree 缺 gitignored 衍生檔會在 pre-push 型別閘門現形_
_LESSONS-INBOX 候選：`fresh-worktree-lacks-gitignored-derived-inputs`（vc=1，記於 Handoff）_
