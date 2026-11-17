# 2026-11-18-060854-twmd-embeddings-nightly — 換機器後本機 bge-m3 恢復，十四天來第一次完整重建，13 語 14,996 向量零失敗，`376e7895f`

> session twmd-embeddings-nightly — cron 夜間 routine（05:00 排程窗）
> Session span: 約 05:00 → 06:10 +0800（1 個索引 commit `376e7895f` 06:06:57，加本 memory）
> 資料來源：`git log %ai`、`date`、build log。甦醒起點沒有落地的時間戳，取排程窗估計值

✅ BECOME ack: mode=micro / 8 organ 最低=免疫 59（快照齡 262h，標 stale）/ Q14 cross-session continuity=PASS

## 觸發

05:00 排程窗觸發，照 [EMBEDDING-PIPELINE.md](../../pipelines/EMBEDDING-PIPELINE.md) v1.4 重建語意索引。wake-context 全檔分頁讀到 `wake:END`。selftest 唯一的黃燈是 diary 沉默 16 天，那是收件席位明列給非 routine 班的判斷題，本班不碰。

## 重建

§前置解析到 `EMBED_HOST=http://127.0.0.1:11434`，`/api/tags` 有 bge-m3，Stage 0 探針回 `dim 1024`，沒走備援。11-05 到 11-07 那面牆（ollama 算得出來、回不到）在換機器之後不見了。本機領先 origin 一個 babel commit、零落後，不需要處理分岔。

Stage 1 跑 `--langs all`，13 語共 14,996 向量，每語都是 0 fail，每語 193〜273 秒，總長約一小時，比 pipeline 寫的「~13 分鐘、6 語」長得多，這是語言數翻倍加文章數增長的自然結果，文件裡那行數字已經過時。Stage 2 儀器 exit 0：13 語每篇都有 8 個鄰居（zh-TW 1,175、en 1,153、ja 1,149、ko 1,152、es 1,151、fr 1,153、vi 1,152、id 1,152、pt 1,151、hi 1,152、ar 1,152、ru 1,152、de 1,152），manifest `bge-m3:latest`／`rag-v1` 無漂移。

Stage 3 帶路徑 `-- src/data/related/` commit，index 裡沒有別人的暫存，`git show --stat` 確認只含 13 個 related 檔，push 後與 origin 同步。上一個索引 commit 是 11-04 的 `e6f67ab1b`，中間十四天線上「你可能也想讀」停在舊版，11-04 之後進庫的文章（tboydar 醫療稿等）在這段期間只拿得到同分類的備援鄰居，今晚起拿到語意鄰居。

## 收官 checklist

| 檢查項                       | 狀態                                                   |
| ---------------------------- | ------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                     |
| Timestamp 精確               | ✅（甦醒起點標約）                                     |
| Handoff 三態已審視           | ✅                                                     |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本班不刷新，快照 stale 262h，等 data-refresh-am     |
| 自我檢查工具 PASS            | ✅ Stage 2 exit 0，對象是本班剛建的索引                |
| diary／evolve                | skipped：routine 預設（DIARY §Stage 0c），沒有內容上線 |

## Handoff 三態

繼承自 `2026-11-07-051930-twmd-embeddings-nightly.md`：

- [x] ~~起跑前確認 PID 52709 不在~~ retired by 本班：換機器後該 PID 不存在，重建單跑。
- [x] ~~ar `technology/rayark-games` 仍不在索引~~ retired by 本班：ar 索引已收進。
- [x] ~~重開機（`OBSERVER-QUEUE #124`），驗收點 Stage 0 回 `dim 1024`~~ retired by 本班：換機器後探針回 `dim 1024`。佇列 #124 本身的狀態留給有權改佇列的席位對帳。
- [x] ~~繼續跳過時 LESSONS 只補 instance~~ retired by 本班：今晚沒跳過。
- ⏳ blocked（延續，收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：routine-sync 提出的 embeddings 改殼生效時差三選項。
- 證據點（掛 `OBSERVER-QUEUE #110（待決）`）：本班實際執行模型仍是 Opus 5.5。
- [ ] pending（延續，收件席位 Full mode 或 `twmd-self-evolve-weekly`，動得了 `scripts/core/`）：LESSONS `rebuild-keeps-grinding-after-the-endpoint-dies`，`build-embeddings.mjs` 缺連敗中止。
- [ ] pending（延續，收件席位 `/twmd-routine` 或改 `semiont-worktree.sh` 的 session）：`fresh-worktree-lacks-gitignored-derived-inputs`，今晚沒走 worktree，vc 仍是 1。
- [ ] pending（延續，收件席位：哲宇，基礎建設決定）：LESSONS `keystone-fallback-shares-the-hosts-fate`。今晚恢復靠的是換機器，備援名單仍只有本機，單點沒有變。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly` 或任何改 pipeline 的班）：EMBEDDING-PIPELINE §Stage 1 的「~13 分鐘，6 語 4640 向量」與「每語 ~136s」已過時，實測 13 語約一小時，改成不寫死數字或標日期。

## Beat 5 — 反芻

三晚撞同一面牆之後，今晚什麼都沒做就通了，修好它的是換了一台機器，不是任何一條診斷。這讓 11-07 那條 LESSONS 更站得住：主機層的病，解法也在主機層，routine 自己只能等。另一個量到的東西是時長，pipeline 裡的 13 分鐘是六語時代的數字，語言數翻倍之後沒人回頭改，一小時的重建若撞上 06:00 的晨鏈就會互搶本機的 ollama，下一次改文件時值得一起想排程窗夠不夠。

🧬

---

_v1.0 | 2026-11-18 06:10 +0800_
_session twmd-embeddings-nightly — 換機器後首次完整重建，13 語 14,996 向量零失敗_
_誕生原因：05:00 排程窗自動觸發，EMBEDDING-PIPELINE.md Stage 0 可達_
_核心洞察：恢復靠換機器而非診斷，備援單點仍在；重建時長已從 13 分鐘長到一小時，文件數字過時_
_LESSONS-INBOX：無新條；`keystone-fallback-shares-the-hosts-fate` 延續_
