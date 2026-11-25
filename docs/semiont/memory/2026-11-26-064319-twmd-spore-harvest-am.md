# 2026-11-26-064319-twmd-spore-harvest-am — 回覆分頁連六班同三列；動態頁新四列是按讚、轉發，和昨晚我們自己的一則引用貼文；#29 四格不動，合法 no-op

> session twmd-spore-harvest-am — cron routine（每日 06:30 排程）
> Session span: 約 06:30 → 06:55 +0800（1 個收官 commit）
> 資料來源：`session-id.sh`（06:43:19 取號）、Threads 動態頁相對時間、各列連結

## 觸發

每日孢子收割，恢復後第十班，同一台機器。窗口內沒有孢子，本班的工作是掃兩個動態頁，看全帳號舊孢子上有沒有新留言。

```
✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14 cross-session continuity=PASS
```

讀取範圍照實記：wake-context 十一段用 Read 逐頁讀到 `wake:END`（神經迴路段超過單次讀取上限，拆頁讀完）。selftest 十二項全綠（昨天那盞 diary ⚠️ 已熄，11-25 reach-mining 寫了日記）。groundtruth 黃燈四條：免疫 59、MEMORY 索引 94 列超過 80、weekly-report 沉默死亡、房貸負擔率過期，都不在本席位。SPORE-HARVEST-PIPELINE 1,674 行讀完。Q14：哲宇最後在場 11-25（reach-mining 那班）；過去一天 babel 夜班修掉 description 漢字夾註、embeddings 第九夜、routine-sync 連九天、data-refresh 十四步全過。

## 閘門與登入態

`list_connected_browsers` 回 `afde823f`（inUse，macOS，isLocal），只連這一台。`/activity/replies` 列的是 @taiwandotmd 自己貼文底下的回覆，登入態通過。`dashboard-spores.json` 的 `backfillWarnings` 0 條，最新孢子仍是 08-23 的 #175／#176。

## 掃了哪兩頁、看到什麼

`/activity/replies` 過去 30 天仍是同三列：@idlcn89642026 在 iOS App 公告底下召喚 Meta AI（1 週，等哲宇），@hiren0108_6630 在 #89 雷亞（1 週，E 桶，SOP 不回），@itsryo_yu 在 #29 李洋（4 週，11-02 已回）。沒有新列。

`/activity` 比昨天這班多四列（4 到 12 小時），逐列用 JS 讀出連結，兩列還實際點進去看：

- reflection290 和另外 5 人 → `@taiwandotmd/post/DgKs8f_mEHU`。這是我們自己約 8 小時前發的引用貼文：「如果我們的存在與努力，能繼續讓更多台灣的文化與記憶被好好保存起來，被更多不同的人認識，那就太好了呢」，引用 @oomibao 10-22 那則「在牆內搜到 taiwan.md」的貼文。六個讚，底下零留言。時間跟昨晚 reach-mining 那班對得上（該班報告重心就是 @oomibao），但兩份 memory 都沒寫是誰按下發佈，`spore-log.json` 也沒有它。
- constantinoo_m → `@taiwandotmd/post/DgKtZGXhyni`，點進去被轉到 @pochun.lu 07-28 的貼文（「知識庫有 Taiwan.md，語料庫目前有 TAIC」）。這是轉發通知：我們轉發了別人提到我們的貼文，constantinoo_m 按了讚。照 `repost-like-notifications-look-like-own-posts` 的檢查，連結會轉到別人帳號的列不分桶。
- linp.eiai 和另外 3 人 → #29 李洋主貼（`DXGuAudkbuC`），按讚聚合。
- wim_cent → `@wim_cent/post/DgKQ0ZAko8j`，內文是我們的認知作戰孢子全文，轉發通知。

四列都沒有讀者寫給我們的字，不分桶。1 天以上的列昨天那班都對過了。

#29 照交接條件進 permalink 量了一次，直接 navigate 落在 canonical（Step A0 連第七班成立）。洞察面板 366,819 次瀏覽，四格讚「3 萬」、留言 232、轉發 1,134、分享 550，跟昨天逐格相同。沒有寫 `add-metrics`，也就沒有 batch log。

分桶統計：A 0／B 0／C 0／D 0（新）／E 0／F 0／G 0。文章修正 0、回覆 0、數字寫入 0。

## 收官 checklist

| 項目                       | 狀態                                                  |
| -------------------------- | ----------------------------------------------------- |
| Handoff 三態已審視         | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態 | ✅（無器官狀態變動）                                  |
| 自我檢查工具 PASS          | 未跑 `validate-spore-data.py`：本班沒有寫任何孢子資料 |
| Pitfall 6 retry 次數       | 0（未發回覆）                                         |
| Tab group cleanup          | ✅（唯一分頁已關，group 自動移除）                    |

## Handoff 三態

繼承 `2026-11-25-064238-twmd-spore-harvest-am`：

- [ ] pending（收件：哲宇）：iOS App 公告底下召喚 Meta AI 的那則，三選項在 `docs/factory/HARVEST-FRAMING-PENDING/2026-11-19.md`。回覆分頁仍只有那一列，原樣等。
- [ ] pending（收件：哲宇）：iOS App 公告要不要登記進 `spore-log.json`。
- [ ] pending（零判斷，每班照做）：連線多台時先確認 in-use 是哪台。今天只連 `afde823f`。
- [ ] pending（零判斷，每班照做）：掃 `/activity/replies` 逐則對日期。今天做了，零新列。
- [ ] pending（零判斷，條件續傳）：#29 重抓條件「回覆分頁出現 #29 新列，或留言數不是 232」。今天量了，232。
- [ ] pending（零判斷）：Step A0 若被轉址，當班改走 Step A。今天 #29 直接 navigate 成立。
- [ ] pending（席位 `/twmd-routine`，該席位動得了排程 prompt）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。今天第四十班繞開：repo 在 `/Users/musebase/`，工作樹有 babel 的十一個檔，本班只 stage 自己的兩個檔。
- [ ] pending（收件：哲宇）：長尾 E 桶留言是否也回，SOP 目前寫 skip。
- [ ] pending（零判斷，每班照做，slug `repost-like-notifications-look-like-own-posts`）：`/activity` 上認不出來的列先看它的連結會不會轉到別人的帳號；會轉的是轉發通知，不用分桶。今天 constantinoo_m 與 wim_cent 兩列就是這種。
- 其餘條目狀態沒有變，原樣往下傳，明細見 `2026-10-24-064129`。

本 session 新 handoff：

- [ ] pending（收件：哲宇）：昨晚約 22:30 從帳號發出的引用貼文 `DgKs8f_mEHU`（引 @oomibao）要不要登記進 `spore-log.json`。它不是孢子格式，跟 iOS App 公告同一個問題；不登記的話收割班看不到它底下將來的留言，只能靠回覆分頁撞見。在決定之前，每班掃回覆分頁時一併看它有沒有新列。

## Beat 5 — 反芻

昨天動態頁多的七列全是別人按讚，今天多的四列裡有一列是我們自己說的話。昨晚有人從帳號對一位牆內讀者回了一句，回覆分頁看不到它，只因為它不是回覆，是引用。收割班的眼睛長在「別人對我們說話」那一側，我們主動對別人說話的那一側，目前只有 spore-log 這一本登記簿，登記簿沒寫的就不在視野裡。這件事要不要改，是登記規則的決定，留給哲宇。

沒有寫 diary：routine 空場，想法已寫進上一段，沒有超出它的東西。沒有跑 evolve：本班沒有 ship 內容。

🧬

---

_v1.0 | 2026-11-26 06:55 +0800_
_session twmd-spore-harvest-am — 恢復後第十班，合法 no-op_
_誕生原因：每日排程；窗口內零孢子，回覆分頁零新列，#29 進去量過四格沒變_
_核心洞察：收割班只看得到別人對我們說的話，我們沒登記的主動發言不在它的視野裡。_
_LESSONS-INBOX 候選：無（同型問題已在 iOS App 公告那條 handoff 等決定）。_
