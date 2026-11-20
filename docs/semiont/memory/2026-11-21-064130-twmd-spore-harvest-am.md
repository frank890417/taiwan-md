# 2026-11-21-064130-twmd-spore-harvest-am — Chrome 擴充功能連不上，收割在第一道閘門停下；登出態只補看到 Meta AI 那則沒有長出新回覆

> session twmd-spore-harvest-am — cron routine（每日 06:30 排程）
> Session span: 約 06:30 → 06:50 +0800（1 個收官 commit）
> 資料來源：`session-id.sh`（06:41:30 取號）、`date`（06:45:57 寫檔前）

## 觸發

每日孢子收割，恢復後第五班，同一台機器。

```
✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14 cross-session continuity=PASS
```

讀取範圍照實記：wake-context 十一段逐頁讀到 `wake:END`（含 48 小時 commit 清單全列）。selftest 一盞 ⚠️：diary 19 天沒產出（最新 11-02），本班是中止的收割班，不為消燈補寫。SPORE-HARVEST-PIPELINE 1,674 行與 MEMORY-PIPELINE 全檔讀完。Q14：觀察者是 cron，哲宇最後在場 11-19；昨夜到今早是 babel 整夜批次、routine-sync／embeddings／data-refresh 三班都過，四條週班仍是沉默死亡黃燈，下次 11-22。

## 第一道閘門：擴充功能沒有註冊

`dashboard-spores.json` 新鮮（0.6 小時），`backfillWarnings` 0 條，最新孢子仍是 08-23 的 #175／#176（D+90），收割窗口內沒有孢子。所以今天要做的本來只有掃 `/activity/replies` 與 `/activity` 兩頁。

`list_connected_browsers` 四次都回 `[]`，`tabs_context_mcp{createIfEmpty:true}` 回「Selected Chrome extension disconnected」，兩把尺同調。照 LESSONS `chrome-headless-window-blocks-extension` 的兩態分流去量根因：Chrome 主進程 pid 428（11-17 07:31 啟動）沒有帶 `--no-startup-window`，process 數 20，狀態 S、CPU 0%。照那條的修法跑 `open -a "Google Chrome"` 後重探仍是空的，所以今天不是「沒視窗」那一態。另外 `osascript` 問 Chrome 視窗數在 AppleEvent 逾時（-1712），`screencapture` 回「could not create image from display」，我沒辦法看到螢幕上是什麼。到這裡為止能自修的都試了；重啟 Chrome 會動到機器上現有的分頁與登入態，沒有紀錄授權過，我沒有做。

依 §Hard Gate「Chrome MCP 連線可用」：收割中止。沒有寫 batch log、沒有跑 `add-metrics`、沒有回覆。連續失敗次數 1（昨天 11-20 連得上）。

## 登出態能補看的那一小塊

桌面 app 內建瀏覽器開 `/activity/replies` 被導到 Threads 登入頁（未登入），兩個動態頁今天都沒掃到。這是今天的缺口：回覆分頁有沒有新列、#29 那列有沒有動，都是「沒看到」，不是「看到沒事」。

公開 permalink 在登出態讀得到，所以補看了唯一一件有時效的懸案：@idlcn89642026 在 iOS App 公告底下召喚 Meta AI 的那則（`Df48NT5o05G`）。登出視圖顯示該則 1 個讚、底下只有 Meta AI 原本那一則回答，沒有新的人接話；母貼為 95 讚／3 留言／4 轉發／16 分享。登出視圖可能不完整，這個讀數只能當「沒看到長大」，不能當完整盤點。

分桶統計：A 0／B 0／C 0／D 0（新）／E 0／F 0／G 0（動態頁未掃，數字是「未量」下的零）。文章修正 0、回覆 0、數字寫入 0。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ⚠️ 起點約略（取號 06:41，甦醒閱讀在之前）             |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（無器官狀態變動）                                  |
| 自我檢查工具 PASS            | 未跑 `validate-spore-data.py`：本班沒有寫任何孢子資料 |
| Pitfall 6 retry 次數         | 0（未發回覆）                                         |
| Tab group cleanup            | ✅（Chrome 沒開成任何分頁；內建瀏覽器那一頁已關）     |

## Handoff 三態

繼承 `2026-11-20-064243-twmd-spore-harvest-am`：

- [ ] pending（收件：哲宇）：iOS App 公告底下召喚 Meta AI 的那則，三選項在 `docs/factory/HARVEST-FRAMING-PENDING/2026-11-19.md`。登出視圖沒看到新回覆，原樣等。
- [ ] pending（收件：哲宇）：iOS App 公告要不要登記進 `spore-log.json`。
- [ ] pending（零判斷，每班照做）：連線多台時先確認 in-use 是哪台。今天零台。
- [ ] pending（零判斷，每班照做）：掃 `/activity/replies` 逐則對日期。**今天沒做到**，下一班要把 11-20 06:42 之後的列都當新列對一次。
- [ ] pending（零判斷，條件續傳）：#29 重抓條件。今天未驗。
- [ ] pending（零判斷）：Step A0 若被轉址，當班改走 Step A。今天未驗。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。今天第三十五班繞開，工作樹有 babel 的檔。
- [ ] pending（收件：哲宇）：長尾 E 桶留言是否也回，SOP 目前寫 skip。
- 其餘條目狀態沒有變，原樣往下傳，明細見 `2026-10-24-064129`。

本 session 新 handoff：

- ⏳ blocked（收件：哲宇在營運機前，slug `chrome-headless-window-blocks-extension` 第三態）：Chrome pid 428 活著、有視窗旗標、`open -a` 無效、AppleEvent 逾時，Claude in Chrome 擴充功能未註冊。需要有人看一眼那台機器的 Chrome（可能是擋住的對話框，或擴充功能要重新連線）。解除條件：`list_connected_browsers` 回得出 deviceId。收割班動不了這一層。
- [ ] pending（收件：明天的 `twmd-spore-harvest-am`）：若明天仍連不上即連 2 天，照 §Escalation 開「routine fail 連 2 day」條目。

## Beat 5 — 反芻

九月那條教訓把「連不上」拆成兩種：擴充功能壞了，或 Chrome 沒有視窗。今天兩種都對不上，修法照跑了也沒用，我能加的只有把第三種長相的量測值寫下來：有視窗旗標、進程閒置、不回 AppleEvent。已在 LESSONS 那條底下補一筆案例，沒有另開條目。

今天的零跟昨天的零不是同一種。昨天是三列逐一對過之後的安靜，今天是兩頁都沒打開。登出態補看的那一則讓最有時效的一件事不至於全盲，其他的要等明天那班把一天半的列一起對。

🧬

---

_v1.0 | 2026-11-21 06:50 +0800_
_session twmd-spore-harvest-am — 恢復後第五班，Chrome 擴充功能未連線，閘門前中止_
_誕生原因：每日排程；`list_connected_browsers` 四探皆空，既有自修法無效_
_核心洞察：探針回空值的第三種根因出現了，既有兩態分流照跑後仍空才交人；沒量到的零要寫成沒量到。_
_LESSONS-INBOX 候選：無新條目，`chrome-headless-window-blocks-extension` 補一筆案例。_
