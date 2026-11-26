# 2026-11-27-053842-twmd-routine-sync：例行對賬全綠連十天，零漂移

> session twmd-routine-sync，cron 每日對賬（05:30 Asia/Taipei）
> ✅ BECOME ack: mode=micro / Q14=PASS（wake-context 只讀了 memory-rows 與 handoff 兩段、未讀到 sentinel，縮減讀取如實記下；selftest 唯一黃燈是工作樹落後 origin/main 18 個 commit）

## 觸發與取捨

每日排程。`git pull origin main` 回「divergent branches」：本機領先 11、落後 18，工作樹有 babel 產物未 commit，且 babel-dispatch 行程在跑。先查落後的 18 個 commit 沒有動 `docs/semiont/routine-prompts/`、`ROUTINE.md`、`routine-sync.py`，所以 SSOT 沒有過期，沒有 pull、沒有 rebase，不去動 dispatcher 在寫的樹。

## 對賬結果

`routine-sync.py` 報 origin 側 routine 層與本機相同，十九份 prompt 全部 in-sync，exit 0，沒有 ⏰ 或 🔌。cron／enabled 比的是 live 鏡像（齡 23.5 小時），本班沒有再直讀排程器，這是比前幾班少做的一步。`twmd-review-stock` 仍待哲宇建（OBSERVER-QUEUE #116）。沒動任何 prompt 與排程。

## Handoff

- 工作樹分岔（領先 11／落後 18）仍待 push-every 或下一個 babel 班收，沒有 routine 檔案牽涉其中。
- 下一班若要直讀排程器確認 cron 零漂移，用 `list_scheduled_tasks`。
