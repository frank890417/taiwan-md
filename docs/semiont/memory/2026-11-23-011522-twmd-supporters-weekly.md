# 2026-11-23-011522-twmd-supporters-weekly — 隔四週補上三筆每月定額，Anton Lee 缺席三個週期後回來

> ✅ BECOME ack: mode=micro / 8 organ 最低=🛡️59（免疫）/ Q14=PASS
> session twmd-supporters-weekly — cron 排程（每週一 01:00，排程器 01:13 起跑）
> Session span: 2026-11-23 01:13 → 01:20 +0800（2 commits：`ed73005823` 贊助資料三檔、本檔＋佇列 #75 補充）
> 資料來源：`date`、`git log %ai`、Gmail search_threads／get_message、`fetch-portaly-supporters.py --summary`

## 觸發

每週一排程，把 Portaly 贊助通知信同步進 supporters SSOT。上一次留下 commit 的是 10-26 那班，之後 11-02、11-09、11-16 三班都沒有痕跡（groundtruth 的黃燈寫「11-15 fire 後 147.8h 零 git 痕跡」，昨晚 routine-audit 查到原因是兩場整機停電）。甦醒檔用 Read 分頁讀到 `wake:END`。selftest 一盞 ⚠️：diary 距今 21 天沒有產出，本班照 finale §Stage 0c 不為消燈補寫。groundtruth 另印 dashboard 快照齡 19 小時，以及 `PARALLEL_CHECK: ACTOR_BUSY`（babel writer 四個進程在跑），所以本班全程用 pathspec 精準 stage，不碰 `knowledge/` 與 `reports/babel/`。

## 三封信，三筆都是每月定額

checkpoint 是 `last_fetched` 2026-10-18T17:15:46Z，往前一天查 `from:portaly.cc after:2026/10/17`，回四串。一封是寄到哲宇個人信箱的 Portaly 資安公告，不是贊助通知，篩掉。其餘三封逐封拉完整內文：11-11 Anton Lee NT$100、11-13 匿名 NT$200、11-15 沈宗杰 NT$200，留言都是「無」。三封的摘要都只寫「贊助支持」，內文才寫「每月定額」，pipeline 那條逐字讀信的規定這次三封全中。

dry-run 回 3 new／0 skip，正式寫入同樣 3 new，SSOT 從 18 筆變 21 筆（6 筆單次、15 筆定額），累積金額 NT$8,800 → NT$9,300。重算兩個衍生視圖後跑隱私檢查：`about-supporters.json` 沒有 `amount`，`dashboard-supporters.json` 沒有 `name`／`message`，兩檔也都沒有 `gmail_message_id`、`subscription_id` 或 email。因為 commit 路徑上有 prettier 會改寫檔案，commit 之後對 `git show HEAD:` 的版本再跑一次，結果相同。三檔進 `ed73005823`，已推上 main。

## 上一班指名的事：十一月誰續扣了

10-26 那班要這一輪看四位定額支持者的十一月週期。沈宗杰與匿名 NT$200 照常續扣（日期各比十月早一天）。Anton Lee 在 08／09／10 三個週期沒有信之後回來了，扣款日從往例的 14 日變成 11 日。匿名 NT$500 往例在 19 日，到今天沒有信，連四個週期缺席。結果已補進 `OBSERVER-QUEUE #75（待決）` 那一列，佇列 lint 通過。缺信的那幾個月是沒扣款還是沒發通知，仍然只有 Portaly 後台分得開。

## 收官 checklist

| 檢查項                       | 狀態                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                           |
| Timestamp 精確               | ✅                                                           |
| Handoff 三態已審視           | ✅                                                           |
| CONSCIOUSNESS 反映最新狀態   | 不適用（本輪無器官狀態變更）                                 |
| 隱私檢查                     | ✅ 寫入前後各一次，兩視圖都過                                |
| diary／evolve                | skipped：routine 預設不寫（DIARY §Stage 0c）；沒有 ship 內容 |
| 寫入範圍                     | 贊助資料三檔一個 commit；本檔、MEMORY 索引、佇列 #75 另一個  |

## Handoff 三態

繼承 `2026-10-26-011623-twmd-supporters-weekly`：

- [x] ~~pending：11 月週期看沈宗杰與匿名 NT$200 有沒有續扣、另兩位是否回來，結果補進 #75~~ retired by 本班：三位續扣、匿名 NT$500 沒來，`OBSERVER-QUEUE #75` 已補。
- ⏳ blocked（席位：哲宇，Portaly 後台，`OBSERVER-QUEUE #75（待決）`）：缺信的月份（四位的 08／09 月、Anton Lee 的 10 月、匿名 NT$500 的 08 月起）是沒扣款還是沒發通知，原樣延續。

本 session 新 handoff：

- [ ] pending（席位：2026-12-21 那班 twmd-supporters-weekly，只需 Gmail 讀取）：十二月週期看三位（往例 11／13／15 日前後）有沒有續扣，匿名 NT$500 有沒有回來，結果補進 `OBSERVER-QUEUE #75（待決）`。中間三班照常跑，沒有指名事項。

## Beat 5 — 反芻

這條 routine 停了三班，補回來只花一輪，因為 checkpoint 住在 SSOT 裡，停幾週都從同一個點接上，`id` 去重讓重疊安全。停電期間漏掉的是「每週看一眼」，資料本身沒有漏。Anton Lee 的回來也提醒一件事：#75 一直把缺信讀成「流失或漏發」二選一，這次出現第三種樣子，中斷三個月後自己恢復、扣款日還換了，比較像支持者換了付款方式或重新訂閱。這只是從信件日期推的，沒有後台可以對。

🧬

---

_v1.0 | 2026-11-23 01:20 +0800_
_session twmd-supporters-weekly — cron 每週同步；3 封候選信、3 new、0 skip，NT$8,800 → NT$9,300_
_誕生原因：每週一 01:00 排程觸發，前三班因整機停電沒有留下痕跡_
_核心洞察：checkpoint 住在 SSOT，停擺幾週都能一輪補齊；四位定額支持者裡三位在扣，匿名 NT$500 連四個週期沒有信_
