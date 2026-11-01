# 2026-10-24-053952-twmd-routine-sync — 十九份 prompt 全一致，直讀排程器十八條零漂移；審庫存註冊實測被核准閘擋下

> session twmd-routine-sync — cron 每日對賬（05:30 Asia/Taipei，排程器 05:37 起跑）
> Session span: 05:37 → 05:45 +0800（約 8 分鐘，1 commit：本 memory）
> 資料來源：`routine-sync.py`、scheduled-tasks `list_scheduled_tasks` 與 `create_scheduled_task`、`docs/semiont/routine-live-state.json`、`date`
> ✅ BECOME ack: mode=micro / Q14=PASS（wake-context 讀到 `wake:END`，selftest 全綠；PARALLEL_CHECK=ACTOR_BUSY，babel writer 13250／45203 在跑；主樹領先 origin 25 個未推送的 babel 批次）

## 觸發

每日排程。`git pull origin main` 回 Already up to date，主樹沒有落後，只有本機領先的 babel 夜班 commit 等 `babel-push-every` 推。

## 對賬結果

`routine-sync.py` 先 fetch，報「origin 側 routine 層與本機相同」，十九條 prompt 全部 in-sync，exit 0，沒有 ⏰ 或 🔌 漂移。

鏡像齡 23.5 小時，照前幾班的做法直讀排程器：`list_scheduled_tasks` 回十八條，逐條拿 `cronExpression` 與 `enabled` 對 `routine-live-state.json`（10-23 06:07 那份），零差異、鍵集合相同。開著十四條、關著四條（rewrite-daily、founder-lens-weekly、spore-pick-daily、spore-publish-daily），與 SSOT 一致。第 3、4 步無事可修。

## 審庫存：把「需要核准」從推測變成實測

前三班（10-21、10-22、10-23）都以「新建要人在 app 裡按核准」為由不嘗試註冊 `twmd-review-stock`，但沒有一班真的試過，這個理由一直是推測。本班照 routine 第 5 步實際呼叫一次 `create_scheduled_task`（taskId、cron `0 22 * * 3`、prompt 與 description 逐字取自機器上那份 SKILL.md），排程器回：

> needs a person's approval, and nobody has opened this scheduled run

先備份 SKILL.md，呼叫後 `cmp` 確認檔案沒被動到。另一個實測：這支工具沒有模型參數，就算有人核准，建出來的 task 也指定不了 Sonnet，要在 app 排程頁手動設。

所以缺口現在有兩個確定的形狀：無人值守的班建不了，有人值守時建得了但模型要另外設。下一個時點 2026-10-28 22:00，剩四天。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                         |
| Timestamp 精確               | ✅                                                         |
| Handoff 三態已審視           | ✅（審庫存一項更新事實；MEMORY.md 衝突那條已由 10-23 data-refresh 處理，退役） |
| CONSCIOUSNESS 反映最新狀態   | 不適用（本輪無器官狀態變更）                               |
| diary／evolve                | skipped：純對賬全綠（DIARY §Stage 0c），無 ship 內容       |
| 寫入路徑                     | 從 origin/main 開的暫存 worktree commit，主樹 babel 檔不碰 |

## Handoff 三態

- ⏳ blocked（席位：哲宇，營運機 Claude 桌面 app 排程頁）`twmd-review-stock` 排程註冊（`OBSERVER-QUEUE #86（已決）`）：**下一個時點 2026-10-28 22:00，剩四天**。10-24 已實測：無人值守的 `create_scheduled_task` 被核准閘擋下。兩條路：(a) 在 app 排程頁新建，cron `0 22 * * 3`、模型 Sonnet、enabled，prompt 用 `~/.claude/scheduled-tasks/twmd-review-stock/SKILL.md` 本文；(b) 在有人在場的 session 叫本席位重跑第 5 步，按核准後再到排程頁把模型改成 Sonnet（工具沒有模型參數）。
- ~~pending — `14c3ac1b7` 與 origin 索引蒸餾的 MEMORY.md 衝突~~ retired by `2026-10-23-060816-twmd-data-refresh-am`（在鎖下合併，取 origin 插回一列）

## Beat 5 — 反芻

連三班寫「需要人按」，沒有一班按下去看看會不會被擋。推測跟事實在交接文裡長得一樣，本班花一次呼叫把它換成事實，順便量到一個以前沒人知道的細節：就算按了，模型也設不進去。

🧬

---

_v1.0 | 2026-10-24 05:45 +0800_
_session twmd-routine-sync — cron 對賬；prompt 19/19 一致，cron／enabled 直讀 live 十八條零漂移_
_誕生原因：每日排程 05:30 Asia/Taipei 觸發_
_核心洞察：交接裡的「需要核准」要先試一次才算事實_
