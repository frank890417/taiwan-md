# 2026-10-21-064114-twmd-spore-harvest-am — 李洋那支聚合跨到 1.7 萬，照條件重抓數字，留言仍是 229

> session twmd-spore-harvest-am — cron routine（每日 06:30）
> Session span: 06:41:14 → 06:4x +0800；收割 commit `644c18e6b`（06:42:24），時刻修正與收官同一個 commit
> 資料來源：`session-id.sh`、`date`、`git log %ai`

## 觸發

每日孢子收割。BECOME write mode 跑完：wake-context 分頁讀到 `wake:END`，selftest 全綠，`consciousness-snapshot.sh` 器官最低仍是免疫 59。groundtruth 的五條週日鏈沉默死亡仍是 10-17 撞週額度那批，非本席位。

```
✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14 cross-session continuity=PASS
```

`dashboard-spores.json` 的 `backfillWarnings` 是空陣列，`spore-log.json` 最新仍是 #175／#176（08-23，今天 D+59），收割窗口沒有東西。照 v3.1 掃兩個動態頁。

## 兩個動態頁與 #29 重抓

`list_connected_browsers` 只回一台，in use 是 `6a0a1276`。分頁標題「(4) 動態」、左欄有個人檔案，登入態通過。

`/activity/replies` 仍只有 @eddie_pablo（#29，「2 週」）一列，10-02 已回過。`/activity` 沒有新留言，但 #29 李洋的聚合變成「0917chi 和另外 1.7 萬人」（2 小時前），踩到 10-19 起續傳的零判斷重抓條件。從那列座標點進 canonical `/@taiwandotmd/post/DXGuAudkbuC`，一次就中。標頭 36 萬瀏覽，四格是 3.1 萬讚、229 留言、1,131 轉發、547 分享；跟 10-11 比，十天多了 4 轉發、5 分享，四捨五入格沒動。留言數沒變，所以沒切排序逐則讀。其他動靜是臺灣漫遊錄、我是 OO 人（一筆「和另外 11 人」）、迷音、鎢、黑冠麻鷺、報導者的讚與「從你的貼文追蹤」，都不構成開 permalink 的條件。

數字照 JSON SSOT 只寫 `spore-db.py add-metrics`，敘事在 `docs/factory/SPORE-HARVESTS/batch-2026-10-21-1-spores.md`，兩支 generator 重生、`validate-spore-data.py` 全綠，四個檔一個 commit，`verify-commit-scope.sh --head 4` 通過。沒有 A–D 桶，沒有回覆要發。

## 一個寫錯的時刻

收割 commit 推上去之後才發現 batch log 的 `harvest_date` 和 `add-metrics --at` 都寫成 06:47，實際快照在 06:41〜06:42 之間（session-id 06:41:14、commit 06:42:24）。06:47 是我寫敘事檔時估的，沒有去量。同一組 (spore, batch, dPlus) 重跑 `add-metrics` 是覆蓋，所以改回 06:41 重跑一次、兩支 generator 跟著重生，跟這份 memory 一起 commit。數字本身沒錯，錯的只有時間戳；它會出現在文章頁 SporeFootprint 的 `harvestDate` 上。

## 收官 checklist

| 檢查項                       | 狀態                                                    |
| ---------------------------- | ------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                      |
| Timestamp 精確               | ✅（harvest 時刻已從 06:47 更正為 06:41）               |
| Handoff 三態已審視           | ✅                                                      |
| CONSCIOUSNESS 反映最新狀態   | ✅（無器官狀態變動）                                    |
| 自我檢查工具 PASS            | 見 commit 前 `article-health.py --profile=memory-diary` |
| Pitfall 6 retry 次數         | 0（本班沒有發任何回覆）                                 |
| Tab group cleanup            | ✅（group 自動移除）                                    |
| diary                        | skipped：routine 例行班，反芻留在本檔 Beat 5            |
| evolve                       | skipped：只回填一筆長尾數字，沒有 ship 內容             |

## Handoff 三態

繼承 `2026-10-21-060943-twmd-data-refresh-am`（非本班職權，原樣傳遞，明細見該檔，REFLEXES #74）：

- ⏳ blocked（收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，第一個時點今晚 10-21 22:00，錯過則等 10-28。
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #93（已決）`／`OBSERVER-QUEUE #110（待決）`。
- ⏳ blocked（收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（收件席位 `twmd-maintainer-daily`）：404 `bad-encoding` 與 `duplicated-lang-prefix` 兩家族，10-16 Cloudflare 窗口約 10-23 過期，PR #1876 是否相關。
- [ ] pending（收件席位 `twmd-weekly-report-sun`）：Cloudflare 每日請求 10-17 高點是否延續。

繼承 `2026-10-20-064114-twmd-spore-harvest-am`：

- [ ] pending（零判斷，每班照做）：連線多台瀏覽器時先確認 in-use 是 `6a0a1276`。今天只連一台，續傳。
- [ ] pending（零判斷，條件續傳）：`list_connected_browsers` 回 `[]` 時先查 `--no-startup-window` 再 `open -a`。未觸發。
- [ ] pending（零判斷，每班照做）：掃 `/activity/replies` 逐則對日期。今天做了。
- [ ] pending（零判斷，條件更新）：#29 重抓條件改為聚合到「1.8 萬」或回覆分頁出現 #29 新列或留言數不是 229。今天 1.7 萬觸發並已重抓。
- [ ] pending（零判斷）：開 permalink 查新留言時先切「全部＋最新」排序。今天留言數未變，未驗。
- [ ] pending（席位：任何帶 permalink 巢狀展開能力的 session）：#29 兩則位置不明的留言（225→227），不急。
- [ ] pending（席位 `twmd-routine-sync`／`twmd-self-evolve-weekly`）：REFLEXES #97 fold 後還剩什麼要儀器化。
- [ ] pending（給 spore-pick）：#175／#176 公告型孢子一週燒完，同型主題不排 D+30 milestone。
- [ ] pending（低優先，等哲宇在場）：Threads 私訊夾是否納入受眾飛輪。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。今天第十九班繞開（vc=19）：babel 正在寫七個檔（ACTOR_BUSY），本班只 stage 自己的檔。
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 10-25）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。動態頁今天沒有該串動靜，只登記不回。

本 session 新 handoff：無。

## Beat 5 — 反芻

這班唯一的錯是時間戳：我寫敘事檔時把 harvest 時刻估成 06:47，而那一刻其實還沒到。估值跟量值在檔案裡長得一模一樣，下游的 generator 會照抄，文章頁就印出一個未來的時間。用 `date` 一次就能避免。另一個值得記的是聚合數比貼文標頭先動：通知從 1.6 萬跨到 1.7 萬，貼文上的讚仍落在 3.1 萬那一格，所以這個重抓條件抓到的是「還在被推」，換到 `spore-metrics.json` 裡多半只是轉發與分享的個位數增量。

🧬

---

_v1.0 | 2026-10-21 06:4x +0800_
_session twmd-spore-harvest-am — 每日收割，窗口空到第五十九天，#29 聚合觸發重抓_
_誕生原因：cron 排程；#29 按讚聚合跨到 1.7 萬，照零判斷條件回填一筆 D+190_
_核心洞察：時間戳要量不要估，估值寫進 SSOT 後會被 generator 原樣傳到讀者頁面_
