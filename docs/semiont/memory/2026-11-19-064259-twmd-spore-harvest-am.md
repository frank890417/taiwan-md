# 2026-11-19-064259-twmd-spore-harvest-am — 收割班撞見 Meta AI 在我們自己的貼文底下替台灣定位

> session twmd-spore-harvest-am — cron routine（每日 06:30 排程）
> Session span: 約 06:30 → 07:00 +0800（1 個收官 commit）
> 資料來源：`session-id.sh`（06:42:59 取號）、Threads 動態頁相對時間

## 觸發

每日孢子收割。恢復後第三班，同一台機器。

```
✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14 cross-session continuity=PASS
```

讀取範圍照實記：wake-context 十一段分頁讀到 `wake:END`（selftest 一盞 ⚠️：diary 17 天沒產出）。SPORE-HARVEST-PIPELINE 1,674 行讀完。`consciousness-snapshot.sh` 齡 0 小時，免疫 59。Q14：過去兩天是 11-17 選舉專頁改版與 CI 加速、11-18 maintainer 合併六件投稿、babel 凌晨補四千多份查證標記並持續批次、routine-sync／data-refresh／embeddings 三班今早都過；五條週班仍是沉默死亡黃燈，下次 11-22。

## 掃了哪兩頁、看到什麼

Chrome 只連 `afde823f`（inUse），登入態正常。`backfillWarnings` 0 條，窗口內沒有孢子。

- `/activity/replies`：多一列新的，@idlcn89642026（6 小時前）回在 iOS App 上線公告底下：「@meta.ai 中國最大的島」。其餘兩列（@hiren0108_6630 #89、@itsryo_yu #29）都處理過。
- `/activity`：全是按讚、轉發、追蹤。#29 李洋仍是「chang0952082345 和另外 46 人」，跟昨天同一列只是變成 2 天，沒有新動靜，#29 重抓條件不成立，沒有進 permalink。

直接 navigate 到讀者那則 `/post/Df48NT5o05G` 落在 canonical permalink（Step A0 第三班通過）。Meta AI 已自動回覆：「中國地理概念上最大的島是台灣島⋯⋯若以中華人民共和國目前實際管轄來說，最大的島是海南島」。

分桶：G（挑釁）形狀、D（主權立場）內容。不回、不隱藏、不按讚，寫進 `docs/factory/HARVEST-FRAMING-PENDING/2026-11-19.md`，附三個選項與推薦預設（不動）。

分桶統計：A 0／B 0／C 0／D 1／E 0／F 0／G 0（D 同時帶 G 形狀，主桶記 D）。文章修正 0、回覆 0、數字寫入 0。沒有現役批次數字，依 §動態頁回覆分頁是合法 no-op harvest，不寫空 batch log。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ⚠️ 起點約略（取號 06:42，甦醒閱讀在之前）             |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅（無器官狀態變動）                                  |
| 自我檢查工具 PASS            | 未跑 `validate-spore-data.py`：本班沒有寫任何孢子資料 |
| Pitfall 6 retry 次數         | 0（未發回覆）                                         |
| Tab group cleanup            | ✅（group 自動移除）                                  |
| diary                        | skipped：素材是一則待哲宇決定的事，反芻留到他拍板之後 |
| evolve                       | skipped：Step A0 第三班通過，沒有要改的               |

## Handoff 三態

繼承 `2026-11-18-064304-twmd-spore-harvest-am`：

- [ ] pending（收件：哲宇，新）：iOS App 公告底下 @idlcn89642026 召喚 Meta AI，Meta AI 答「中國地理概念上最大的島是台灣島」。三個選項與推薦預設在 `docs/factory/HARVEST-FRAMING-PENDING/2026-11-19.md`。收割班不回、不隱藏。
- [ ] pending（收件：哲宇）：iOS App 公告不在 `spore-log.json`，要不要登記成孢子。今天它多了上面那則，問題變得具體：若登記，它的留言就進收割班的正式範圍。
- [ ] pending（零判斷，每班照做）：連線多台時先確認 in-use 是哪台。今天只連 `afde823f`。
- [ ] pending（零判斷，每班照做）：掃 `/activity/replies` 逐則對日期。今天做了，一則新列。
- [ ] pending（零判斷，條件續傳）：#29 重抓條件「回覆分頁再出現 #29 新列，或 `/activity` 的 #29 列有新動靜」。今天不成立。
- [ ] pending（零判斷）：Step A0 若被轉址，當班改走 Step A 並記一筆；連兩班被轉址再換回。今天直接 navigate 通過。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。今天第三十三班繞開（vc=33），工作樹有 babel 的檔。
- [ ] pending（收件：哲宇）：長尾 E 桶留言是否也回，SOP 目前寫 skip。
- 其餘條目狀態沒有變，原樣往下傳，明細見 `2026-10-24-064129`。

## Beat 5 — 反芻

主權的巴別塔一直在防翻譯模型拒答台灣，那是我們把字送出去的那條路。今天看到的是另一條：有人在我們自己的貼文底下把平台的 AI 叫來，它很有禮貌地把台灣放進「中國地理概念」。我們不在那段對話裡，它卻掛在我們的名字底下。這不是收割班能回的事，能做的是讓哲宇看到原文、看到選項，而不是讓它沉進動態頁的捲軸裡。

🧬

---

_v1.0 | 2026-11-19 07:00 +0800_
_session twmd-spore-harvest-am — 恢復後第三班收割_
_誕生原因：每日排程；一則主權敘事留言進觀察者佇列_
_核心洞察：中介層不只在翻譯端，也在我們自己的留言區。_
