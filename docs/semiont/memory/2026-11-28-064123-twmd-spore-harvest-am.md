# 2026-11-28-064123-twmd-spore-harvest-am — Chrome 恢復連線，補掃兩個動態頁；#53 黑冠麻鷺被引用，重抓到 11 萬次瀏覽；沒有需要回的留言

> session twmd-spore-harvest-am — cron routine（每日 06:30 排程）
> Session span: 約 06:30 → 07:00 +0800（1 個收官 commit）
> 資料來源：`session-id.sh`（06:41:23 取號）、Threads 動態頁相對時間、各列連結的 pathname

## 觸發

每日孢子收割。昨天那班 `list_connected_browsers` 回空陣列，閘門 abort，交接的第一件事是今天先看連線，有裝置就補掃。

```
✅ BECOME ack: mode=write / 8 organ 最低=免疫 59 / Q14 cross-session continuity=PASS
```

讀取範圍照實記：BECOME 全檔讀完。wake-context 十一段用 Read 分頁讀到 `wake:END`（266,738 bytes；神經迴路段超過單次上限，拆三頁）。selftest 全綠。groundtruth 黃燈四條（免疫 59、MEMORY 索引 116 列、weekly-report 沉默死亡、資料台灣九個過期指標）都不在本席位。SPORE-HARVEST-PIPELINE 1,674 行讀完。LONGINGS 只讀 §種子與 §身體。少讀的兩樣：ARTICLE-INBOX §P0/P1 標題沒載（本班不寫文章）；MEMORY-PIPELINE 沒有重讀全檔，只對了 Hard Gate 表與索引列 150 字那條，本檔格式照前兩班收割 memory 寫。Q14：哲宇最後在場 11-25（reach-mining）；過去一天 babel 夜班修了嘉義市重號腳註、embeddings 完整重建、routine-sync 連十一天零漂移、data-refresh 十四步全過；babel dispatcher 在跑，工作樹上有它的九個檔。

## 閘門與登入態

`list_connected_browsers` 回 `afde823f`（in use，macOS，isLocal），只連這一台。連線失敗停在一天，升級階梯沒有往上走。兩個動態頁列的都是 @taiwandotmd 自己貼文的動態，登入態通過。`backfillWarnings` 0 條，窗口內沒有孢子（最新 #175／#176 已 D+97）。

## 掃了哪兩頁、看到什麼

`/activity/replies` 過去 30 天剩兩列，逐則對過日期：@idlcn89642026 在 iOS App 公告底下召喚 Meta AI（11-18，等哲宇）、@hiren0108_6630 在 #89 雷亞（11-12，已記）。@itsryo_yu 在 #29 那列滿 30 天，從清單上消失。沒有新列。

`/activity` 今天三列都落在 #53 黑冠麻鷺：一個讚、一個新追蹤、一則引用貼文。引用的人是 @hyporhamphus\_，發在他自己的頁面（`DgQsu7cE3Ym`），寫的是「原來我每天看到的鳥如此稀有❤️」。E 桶，D+212，照 §Decision Gate 不回；而且它不在我們的留言串裡，pipeline 的回覆流程沒有涵蓋去別人貼文底下留言。過去 7 天的列是按讚與轉發通知，昨天沒掃到的那一天也在裡面，逐列看過，沒有讀者寫給我們的字。

#53 進 permalink 重抓：標頭 11 萬次瀏覽，讚 3,131、留言 116、轉發 215、分享 388。上一筆是 05-08 D+8 的 6.5 萬。寫了一筆 `add-metrics`（D+212），batch log 是 `batch-2026-11-28-1-spores.md`。留言數跟五月相同，沒有逐則重讀留言串，這一點沒驗。

#29 照條件量了：留言 232，四格跟 11-26 相同，沒寫入。

分桶統計：A 0／B 0／C 0／D 0（新）／E 1（引用貼文，不回）／F 0／G 0。文章修正 0、回覆 0、數字寫入 1 筆。

## 收官 checklist

| 項目                 | 狀態                                                             |
| -------------------- | ---------------------------------------------------------------- |
| Handoff 三態已審視   | ✅                                                               |
| 自我檢查工具         | `validate-spore-data.py` ALL GREEN（0 errors / 0 warnings）      |
| 衍生層               | `generate-spore-records.py`、`generate-dashboard-spores.py` 已跑 |
| Pitfall 6 retry 次數 | 0（未發回覆）                                                    |
| Tab group cleanup    | ✅（唯一分頁已關，group 自動移除）                               |
| 工作樹               | babel 的九個檔不是本班的，未 stage                               |

## Handoff 三態

昨天那班的兩條：

- ~~blocked：Chrome 擴充功能未連線~~ retired by 本班：今天連上，沒有連兩天，不寫 LESSONS。
- ~~pending：明天第一動作 `list_connected_browsers`，有裝置就補掃~~ retired by 本班：已補掃，回覆分頁逐則對了日期。

繼承 `2026-11-26-064319-twmd-spore-harvest-am`，原樣往下傳：

- [ ] pending（收件：哲宇）：iOS App 公告底下召喚 Meta AI 的那則，三選項在 `docs/factory/HARVEST-FRAMING-PENDING/2026-11-19.md`。
- [ ] pending（收件：哲宇）：iOS App 公告與 11-25 引用貼文 `DgKs8f_mEHU` 要不要登記進 `spore-log.json`。
- [ ] pending（收件：哲宇）：長尾 E 桶留言是否也回，SOP 目前寫 skip。今天多一例（@hyporhamphus\_ 的引用貼文），另帶一個 SOP 沒寫的子問題：讀者發在自己頁面的引用貼文，我們去不去留言。
- [ ] pending（零判斷，每班照做）：連線多台時先確認 in-use 是哪台；掃 `/activity/replies` 逐則對日期；`/activity` 上認不出來的列先看連結會不會轉到別人的帳號（slug `repost-like-notifications-look-like-own-posts`）。
- [ ] pending（零判斷，條件續傳）：#29 重抓條件「回覆分頁出現 #29 新列，或留言數不是 232」。今天 232。
- [ ] pending（零判斷）：Step A0 若被轉址，當班改走 Step A。今天 #53、#29 直接 navigate 都成立。
- [ ] pending（席位 `/twmd-routine`，該席位動得了排程 prompt）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。今天又繞開一次：repo 在 `/Users/musebase/`，本班只 stage 自己的檔。

本班新增：

- [ ] pending（零判斷，下一班收割）：讀動態頁先用 `get_page_text`，要連結再用只輸出 `URL.pathname` 的 JS。今天直接用 JS 回傳整列文字被工具層擋了三次（`BLOCKED: Cookie/query string data`）。再遇到一次就寫進 pipeline §Chrome MCP harvest pattern。
- [ ] pending（收件：下一次 FACTCHECK 巡邏席位）：#53 黑冠麻鷺已到 11 萬次瀏覽。50K 門檻五月就過了，當時有沒有跑過 Quick Mode，這班沒有去查。

## Beat 5 — 反芻

#53 的上一筆數字停在 D+8。中間兩百天，它從 6.5 萬長到 11 萬，這件事是因為今天早上剛好有人引用它、動態頁最上面三列都是它，我才進去量的。現在的重抓條件是「動態頁有動靜」，動靜只回溯幾週；一支孢子若是安靜地、每天多幾百次地長，條件永遠不會成立。一百六十幾支舊孢子裡還有幾支是這樣，這班不知道。

沒有寫 diary、沒有跑 evolve：本班沒有內容產出，上面那段是一個還沒量過的疑問，還不到教訓。

🧬

---

_v1.0 | 2026-11-28 07:00 +0800_
_session twmd-spore-harvest-am — 補掃兩頁，#53 一筆數字，零回覆_
