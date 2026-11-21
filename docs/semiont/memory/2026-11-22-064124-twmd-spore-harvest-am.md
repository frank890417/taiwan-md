# 2026-11-22-064124-twmd-spore-harvest-am — Chrome 擴充功能回來了，補對一天半的動態列：零新留言，#29 李洋多一個讚進去看了留言數沒變，合法 no-op

> session twmd-spore-harvest-am — cron routine（每日 06:30 排程）
> Session span: 約 06:30 → 06:55 +0800（1 個收官 commit）
> 資料來源：`session-id.sh`（06:41:24 取號）、`date`、Threads 動態頁相對時間

## 觸發

每日孢子收割，恢復後第六班，同一台機器。昨天那班在第一道閘門中止（擴充功能未註冊），今天要把 11-20 06:42 之後的動態列一起對。

```
✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14 cross-session continuity=PASS
```

讀取範圍照實記：wake-context 十一段逐頁讀到 `wake:END`（含 48 小時 commit 清單全列）。selftest 一盞 ⚠️：diary 20 天沒產出（最新 11-02），本班是 no-op 收割班，不為消燈補寫。groundtruth 另有三條週班沉默死亡黃燈（routine-audit、supporters、weekly-report）與免疫 59，都不在本席位。SPORE-HARVEST-PIPELINE 1,674 行與 MEMORY-PIPELINE 全檔讀完。Q14：觀察者是 cron，哲宇最後在場 11-21；昨夜到今早 babel 整夜批次、news-lens／distill／self-evolve 三條週班恢復、routine-sync／embeddings／data-refresh 都過。

## 閘門與登入態

`list_connected_browsers` 第一探就回 `afde823f`（inUse，macOS，isLocal），只連這一台。昨天交接給哲宇的「Chrome pid 428 不回 AppleEvent」那一態已經解除，我不知道是誰在什麼時候處理的，只量到解除條件成立。`/activity/replies` 列的是 @taiwandotmd 自己貼文底下的回覆，登入態通過。連續失敗次數歸零，不開「連 2 day」條目。

`dashboard-spores.json` 齡 0.5 小時，`backfillWarnings` 0 條，最新孢子仍是 08-23 的 #175／#176（D+91），收割窗口內沒有孢子。

## 掃了哪兩頁、看到什麼

`/activity/replies` 過去 30 天仍是三列，逐列對過，全部處理過：@idlcn89642026 在 iOS App 公告底下召喚 Meta AI（3 天，等哲宇，三選項在 `HARVEST-FRAMING-PENDING/2026-11-19.md`），@hiren0108_6630 在 #89 雷亞（1 週，E 桶，SOP 不回），@itsryo_yu 在 #29 李洋（3 週，11-02 已回）。11-20 06:42 之後沒有新列，昨天沒量到的那一天半補上了。

`/activity` 最近兩天的列全是按讚、轉發、追蹤，落在楊双子、迷音、報導者、我是OO人、張懸、黃魚鴞、黑冠麻鷺、Migu 地圖等舊孢子上。有兩列一開始認不出來（「詞語的匱乏」59 人按讚、「同學們來合照吧」12 人按讚），連結掛在 `@taiwandotmd/post/` 底下，點進去分別轉到 @molly_k_molly_k 與 @eziraros 的原貼。這是帳號轉發別人的貼文之後，別人對那則轉發按讚的通知，內容不是我們的，底下也沒有對我們說的話。

#29 李洋多了一列「1029grace，1 天」的單筆按讚，照交接的零判斷條件進 permalink（直接 navigate 沒被轉址，Step A0 連第三班成立）。標頭 36 萬次瀏覽，主貼留言 232、轉發 1,134、分享 550、讚顯示「3 萬」。跟 11-02 那筆事件比只有分享 549→550，留言數沒動，沒有新留言要分桶。這個差距落在雜訊裡，沒有寫 `add-metrics`，也就沒有 batch log。

分桶統計：A 0／B 0／C 0／D 0（新）／E 0／F 0／G 0。文章修正 0、回覆 0、數字寫入 0。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ⚠️ 起點約略（取號 06:41，甦醒閱讀在之前）             |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（無器官狀態變動）                                  |
| 自我檢查工具 PASS            | 未跑 `validate-spore-data.py`：本班沒有寫任何孢子資料 |
| Pitfall 6 retry 次數         | 0（未發回覆）                                         |
| Tab group cleanup            | ✅（唯一分頁已關，group 自動移除）                    |

## Handoff 三態

繼承 `2026-11-21-064130-twmd-spore-harvest-am`：

- [x] ~~blocked（收件：哲宇，slug `chrome-headless-window-blocks-extension` 第三態）擴充功能未註冊~~ retired by 2026-11-22-064124-twmd-spore-harvest-am（`list_connected_browsers` 回得出 deviceId；解除原因未知）。
- [x] ~~pending：若明天仍連不上即連 2 天，開「routine fail 連 2 day」條目~~ retired by 本班（今天連上）。
- [x] ~~pending：把 11-20 06:42 之後的回覆列都當新列對一次~~ retired by 本班（三列逐一對過，零新列）。
- [ ] pending（收件：哲宇）：iOS App 公告底下召喚 Meta AI 的那則，三選項在 `docs/factory/HARVEST-FRAMING-PENDING/2026-11-19.md`。登入態下回覆分頁仍只有那一列，原樣等。
- [ ] pending（收件：哲宇）：iOS App 公告要不要登記進 `spore-log.json`。
- [ ] pending（零判斷，每班照做）：連線多台時先確認 in-use 是哪台。今天只連 `afde823f`。
- [ ] pending（零判斷，每班照做）：掃 `/activity/replies` 逐則對日期。今天做了，零新列。
- [ ] pending（零判斷，條件續傳）：#29 重抓條件「回覆分頁出現 #29 新列，或留言數不是 232」。今天進去量了，232。單筆按讚不必再進 permalink，11-17 那版條件比較準。
- [ ] pending（零判斷）：Step A0 若被轉址，當班改走 Step A。今天 #29 直接 navigate 成立。
- [ ] pending（席位 `/twmd-routine`，該席位動得了排程 prompt）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。今天第三十六班繞開，工作樹有 babel 的六個檔，本班只 stage 自己的兩個檔。
- [ ] pending（收件：哲宇）：長尾 E 桶留言是否也回，SOP 目前寫 skip。
- 其餘條目狀態沒有變，原樣往下傳，明細見 `2026-10-24-064129`。

本 session 新 handoff：

- [ ] pending（零判斷，每班照做，slug `repost-like-notifications-look-like-own-posts`）：`/activity` 上認不出來的列先看它的連結會不會轉到別人的帳號；會轉的是轉發通知，不用分桶。

## Beat 5 — 反芻

昨天寫「沒量到的零要寫成沒量到」，今天把那一天半補量了，結果也是零，兩個零現在可以接起來讀。擴充功能怎麼好的我不知道；交接只寫了解除條件，沒有人回寫原因，下次再壞還是從頭量。

那兩列轉發通知讓我多開了兩頁。動態頁把「別人按了你轉發的貼文」跟「別人按了你的貼文」排成同一種列，連結也掛在我們的帳號底下，只有點進去才分得開。這還不到要寫進教訓的程度，一條零判斷交接就夠。

沒有寫 diary：routine 空場，沒有超出這份 memory 的想法。沒有跑 evolve：本班沒有 ship 內容。

🧬

---

_v1.0 | 2026-11-22 06:55 +0800_
_session twmd-spore-harvest-am — 恢復後第六班，擴充功能恢復連線，合法 no-op_
_誕生原因：每日排程；窗口內零孢子，回覆分頁零新列，#29 進去量過留言數沒變_
_核心洞察：昨天沒量到的一天半今天補量了；動態頁上轉發通知跟自己貼文的通知長得一樣，要點進去才分得開。_
_LESSONS-INBOX 候選：無。_
