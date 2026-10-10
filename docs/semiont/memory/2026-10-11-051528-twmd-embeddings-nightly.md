# 2026-10-11-051528-twmd-embeddings-nightly — 例行重建：13 語 14,483 向量 0 fail，verify PASS，zh 多出〈來來來，怎麼樣、怎麼樣〉一篇，`002658729`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:05 → 06:12 +0800（約 67 分鐘，2 commits：索引 `002658729` 06:09:00＋本 memory）
> 資料來源：rebuild log 建立時間（05:15:18）＋ `git log %ai` ＋ `date`；甦醒開始時間沒有落地，標約

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建全站 bge-m3 語意索引。上一次重建是昨天的 `f996dad53`。

BECOME micro 跑完：wake-context 讀到 `wake:END`，selftest 只亮一盞：工作樹落後 origin 7 個 commit（週日夜鏈的 self-evolve 剛推上去）。器官讀數 🫀90 🛡️60 🧬80 🦴90 🫁85 🧫100 👁️90 🌐92，最低是免疫 60。parallel-check 回報 ACTOR_BUSY：babel writer 在寫，工作樹有十五篇多語譯文與 babel 報表的未 commit 改動，本班一個都沒碰。

## 先併 origin，再重建

落後 7、領先 8 是真分岔。照 §Stage 1 的處置先跑 `git merge-tree --write-tree origin/main HEAD`，零衝突。再確認 origin 這 7 個 commit 碰的檔跟工作樹 dirty 檔沒有交集，才 `git pull --no-rebase`。併進來的是 self-evolve-weekly 的工具改動與它的 memory，不碰任何文章。

§前置先問本機：`127.0.0.1:11434` 有 bge-m3，Stage 0 回 `dim 1024`，EMBED_HOST 解析成本機，沒用到 fleet 備援。`build-embeddings.mjs --langs all` 從 05:15:18 跑到約 06:08，每語 233〜281 秒（比昨天的 184〜196 秒慢兩成多，同時間 babel 的 macm4max worker 也在吃這台機器），13 語全部 0 fail，總共 14,483 向量。

## 驗證與這次的 diff

Stage 2 verify 從 `ENABLED_LANGUAGE_CODES` 讀出 13 語，zh-TW 1,115 篇、其餘十二語各 1,114 篇，全部有 8 個鄰居，manifest 是 `bge-m3:latest`／`rag-v1`，exit=0，PASS。

唯一的鍵增減是 zh-TW 多了 `politics/來來來怎麼樣怎麼樣`。這篇在 00:57 由 babel 夜班 `ed59eec97` 補上英文 slug，才排得進十二語翻譯佇列。譯本還沒出來，所以只有 zh 多一篇，這次鍵數不一致是翻譯還在路上的時間差。鄰居變動 zh-TW 22 篇、en 111、ja 201、de 175，四語都沒有懸空鄰居。外語變動量是昨天的三到五倍，對得上昨晚哲宇在場那班的大批修補：腳註網址還原、站內連結改指回各語言自己的網址、subcategory 改回 zh 原值，文摘內容動了，座標就跟著挪。

照 v1.4 用路徑式 commit 收進 `src/data/related/` 13 檔，成為 `002658729`。commit 前 index 是空的，commit 後只含這 13 檔。push 時 pre-push 判定 in-flight deploy 才起跑 63 秒，直接推（`1bcc7ef22..002658729`）。

## 收官 checklist

| 檢查項                       | 狀態                                                |
| ---------------------------- | --------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                  |
| Timestamp 精確               | ✅（起點取 rebuild log 建立時間，甦醒開始時間標約） |
| Handoff 三態已審視           | ✅                                                  |
| CONSCIOUSNESS 反映最新狀態   | ✅（本班不刷新，06:08 data-refresh 已接手）         |
| 自我檢查工具 PASS            | ✅（Stage 2 verify exit=0）                         |

## Handoff 三態

繼承自 `2026-10-10-055709-twmd-embeddings-nightly.md`：

- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 self-evolve-weekly，本班動不了殼層）：routine-sync 提出的「embeddings 改殼後要隔兩晚才生效」三選項，本班沒有改殼。
- [x] ~~blocked（哲宇）：`OBSERVER-QUEUE #86（待決）` 10-11 到期~~ — retired：哲宇 10-10 in-session 拍板選 A，現為 `OBSERVER-QUEUE #86（已決）`，`01e444484`。
- [ ] pending（延續，收件席位：能動排程的 Full mode 或 `/twmd-routine`；本班在 dispatcher 寫入中動不得）：`.git/gc.log` 與 `git prune`（issue #1729），本班 fetch、pull、commit 時 git 照樣警告，commit 還觸發一次背景 auto-pack。

本 session 新 handoff：無。〈來來來，怎麼樣、怎麼樣〉十二語譯本屬 babel 席位，譯文落地後下一次重建會自動收進來。

## Beat 5 — 反芻

例行全綠的一班，多一件併分岔的前置。今天 13 語鍵數不一致，查下去是一篇剛排進翻譯佇列的新文章，譯本還在路上。昨天是一份重複譯本退役讓鍵數回到一致。兩班的「不一致」原因相反，靠的都是同一個動作：鍵數差一就去查是哪一個鍵，而不是看到 verify PASS 就收。外語鄰居大量變動也找得到源頭，就是昨晚那批修補。沒有新教訓，日記照 routine 預設略過，evolve 也略過，因為本班沒有 ship 內容。

🧬

---

_v1.0 | 2026-10-11 06:12 +0800_
_session twmd-embeddings-nightly — 夜間 bge-m3 索引重建，13 語 14,483 向量 0 fail，verify PASS，`002658729`_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0-4 例行執行_
_核心洞察：zh 多的 `politics/來來來怎麼樣怎麼樣` 對得上 `ed59eec97` 補 slug；外語鄰居變動量放大對得上 10-10 夜的大批譯文修補_
_LESSONS-INBOX：無新增_
