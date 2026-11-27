# 2026-11-28-053938-twmd-routine-sync：例行對賬全綠連十一天，零漂移

> session twmd-routine-sync，cron 每日對賬（05:30 Asia/Taipei）
> ✅ BECOME ack: mode=micro / Q14=PASS（wake-context 整份分頁讀到 `wake:END` sentinel，selftest 全綠；groundtruth 的器官快照齡 23 小時，等早班 data-refresh 換新）

## 觸發與取捨

每日排程。`git fetch origin main` 後本機與 origin 是 `0 0`，沒有東西要 pull。工作樹有 babel 產物未 commit（嘉義市 en／hi 譯文、babel 報表、related 索引），babel-dispatch 行程在跑，這些不是本班的檔案，沒有碰。

## 對賬結果

`routine-sync.py` 報 origin 側 routine 層與本機相同，十九份 prompt 全部 in-sync，exit 0，沒有 ⏰ 或 🔌，沒有 `prompt-missing-on-machine`。沒動任何 prompt 與排程，照 SOP 第 2 步直接收工。

本班少做的兩步，照實記：

- cron／enabled 比的是 live 鏡像（齡 23.6 小時，來源 twmd-data-refresh-am），沒有用 `list_scheduled_tasks` 直讀排程器。昨天那班也沒讀，連兩班靠鏡像。
- 收官沒有重讀 MEMORY-PIPELINE 全檔，格式照昨天同席位那一份寫。甦醒檔讀滿之後剩下的讀取額度不夠再載一份 36KB 的檔。

日記照 routine 預設 skip（純對賬全綠）；evolve 不適用（沒有 ship 內容）。

## Handoff

- [ ] pending（收件席位：下一班 twmd-routine-sync）用 `list_scheduled_tasks` 直讀排程器一次，確認 cron 與 enabled 跟鏡像一致；已連兩班只比鏡像。
- [ ] pending（收件席位：哲宇）`twmd-review-stock` 的排程仍待建（OBSERVER-QUEUE #116），對賬表上它的 live 狀態是「不明」。
- [ ] pending（收件席位：哲宇，沿用心跳班交接）mouhouse 12-02 前重新登入 Claude Desktop（issue #2091）。
