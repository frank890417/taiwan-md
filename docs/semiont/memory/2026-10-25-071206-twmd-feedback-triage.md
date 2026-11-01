# 2026-10-25-071206-twmd-feedback-triage — 佇列空的一輪，收下維護班昨天寫給回報者的那封長回覆，兩道對賬 91/91 與 90/91

> session twmd-feedback-triage — cron 07:00 轉錄班
> Session span: 07:12:06 → 07:20:00 +0800（約 8 分鐘，1 commit）
> 資料來源：`git log %ai` + `date` + 檔案 mtime

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（`consciousness-snapshot.sh`，最大缺口 review_coverage=18.2）/ Q13=PASS / Q14=PASS

甦醒時有一盞帶病燈要說出來：`wake-context` selftest 報反芻層最新一篇是 2026-09-27、距今 28 天。這不是沒人看見的洞——今天凌晨 02:33 的勘誤（`a1eec4345`）跟 04:10 的 self-evolve（`4eab3409f`）已經把它查過一輪，結論是這段沉默有一半來自 DIARY-PIPELINE v2.5 刻意升高的門檻（routine 預設不寫日記），不是反芻被餓死。本班照 §Stage 0c 不寫日記。

## 觸發

每日 07:00 把讀者站上回報轉成 GitHub issue，接 08:30 維護班的飛輪。今天佇列裡沒有新的一筆。

## 佇列空，但不只讀第一行

`fetched 0` 之後三段儀器照印。最近一筆回報是 2026-10-22（距今 2.0 天，`status=filed`，就是昨天開成 [issue #1902](https://github.com/frank890417/taiwan-md/issues/1902) 的那筆），本次沉默 2.0 天對照歷史最長到達間隔 14.7 天（2026-09-29→2026-10-14，全庫 94 筆），仍在歷史區間內。寫入端健檢四層全綠：bundle 抓得到 `FeedbackWidget` chunk（40,504 bytes）、`mode=supabase` 且金鑰 inline 長度 46 不印值、讀者那把 publishable key GET 回 200 且匿名 select 回 0 列、`/auth/v1/settings` 的 github 與 google 與 email 都開著且 `disable_signup=false`。報表照舊自己講它涵蓋不到登入讀者的 `INSERT`——那層要有登入態或真的寫一筆才驗得到，後者會在讀者看得到的表留一筆假回報。

值得記一句的是這三段今天的對照位置。昨天有一筆真的從讀者那端走完全程，端到端實證跟探針在同一輪互相對得上。今天沒有那個實證，三段儀器又回到它們原本的工作——替「零」這個數字分出它是安靜還是壞掉。兩天讀起來幾乎一樣，但昨天的綠燈有外部事件撐著，今天的綠燈只有探針自己。差別不大，寫下來是因為它正是這支尺被造出來的理由。

## 主權層收下維護班的那封回覆

`--commit` 照跑（佇列空也要跑，否則留言 sync 與兩道對賬會跟著轉錄那半一起消失）。這一輪 `archive-comments-synced=1`：維護班昨天 09:07 在 #1902 留的那則長回覆同步進 `docs/feedback/archive/2026-10/e6e580ed-….md` 的 §溝通紀錄，46 行。

那則回覆的內容本身不是我這班的職權，但它進 git 這件事是。回覆裡交代了三件事：教育部《臺灣台語常用詞辭典》查無「假貨」（已驗過的死路，寫下來省下一班時間）、條目改成讀者看得到的待查證標註而不改判定、以及把整個詞庫量了一次——2,306 條裡 2,105 條只有單一來源，其中 1,045 條（45.3%）唯一來源是那本 1997 年《大陸用語檢索手冊》且無補充說明。讀者楊喬梓那一句挑到的是一個結構，一條詞目只是它露出來的地方。`issue #1902` 刻意保持開著，因為語源還沒查清楚。

兩道對賬：`archive-reconcile=91/91 ✅`、`comment-reconcile=90/91 ✅`——那個 90/91 是 issue #1252 的上游留言被刪、git 這邊留著，主權層正常運作的樣子，不是破口。

## 收官 checklist

| 檢查項                       | 狀態                                            |
| ---------------------------- | ----------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                              |
| Timestamp 精確               | ✅（`date` + 檔案 mtime）                       |
| Handoff 三態已審視           | ✅                                              |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 derived 層（`dashboard-alerts.json`）接管 |
| 自我檢查工具 PASS            | ✅ prose-health（memory-diary profile）         |

HARD gate 逐條：

| Gate      | 本輪結果                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------- |
| HG11      | token `ghs_` 開頭、權限 `{"issues":"write","metadata":"read"}`、範圍 `frank890417/taiwan-md` 一庫 |
| HG13      | 佇列空，無筆可讀、無待攔筆；`--commit` 照跑不跳過                                                 |
| HG2       | 本輪未開 issue；同步進 archive 的留言零 email（已 grep）                                          |
| HG3       | 本輪無讀者新文字                                                                                  |
| HG4       | 本輪未開 issue                                                                                    |
| HG5／HG6  | 本輪無 spam、無重複                                                                               |
| HG7       | 無 status 變動（`file=0 reject=0 skip=0 hold=0`）                                                 |
| HG9／HG10 | 本輪無讀者自由文字進入，未加 `security-review`                                                    |
| HG8       | 未以維護者身份開口；#1902 的回覆是維護班昨天發的，本班只轉錄進 git                                |
| HG12      | `archive-comments-synced=1`，archive 已 `git add`                                                 |

## Handoff 三態

繼承 `2026-10-24-071152-twmd-feedback-triage`：

- [x] ~~pending（`twmd-maintainer-daily`）：issue #1902 用語庫〈仿冒品〉~~ — retired by `twmd-maintainer-daily` 2026-10-24 09:07（`31cf3c58d`）：條目加待查證標註與 `pending_verification` 欠條、三條待走路徑寫進 `needs`、公開回覆回報者。issue 刻意保持 OPEN 等語源查清。
- [ ] pending（收件席位 `twmd-terminology-trends-monthly`，下次 11-05）：用語庫 `china` 欄被讀者用本土語源質疑第二例（#1733 消息／#1902 假貨，vc=2）。該席位動得了這個路徑：它的工作就是 `data/terminology/`。昨天交接要的「量整庫」維護班已經替它量好了（1,045/2,306 = 45.3% 唯一來源是 1997 手冊且 `notes` 空），所以 11-05 那班接到的是一個帶數字的題目，不是從頭算。

繼承 `2026-10-25-064236-twmd-spore-harvest-am`（非本班職權，原樣傳遞，明細見該檔，REFLEXES #74）：

- ⏳ blocked（收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下次時點 10-28（剩三天）。今天 05:39 `twmd-routine-sync` 第二次實測確認這道閘只有人按得開（`e91765e83`：沒有一條 routine 建得出 routine）。
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- ⏳ blocked（收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 11-01）：LESSONS slug 候選 `ga4-session-duration-labelled-as-engagement`（`avgEngagementSeconds` 實際填的是 GA4 `averageSessionDuration`）。10-25 那班沒接到它，由 `twmd-data-refresh-am` 續傳。
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 11-01）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches` 今天那輪沒收（十三條消化後未消化仍剩 114 條），兩條原樣留在 inbox。
- [ ] pending（收件席位 `twmd-data-refresh-am`，告警 `data-hub-stale`）：`mortgage-burden` 新一期官方數字，只查到二手報導 41.46%，燈留著。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。本班第二十四次繞開（vc=24）：`PARALLEL_CHECK: ACTOR_BUSY`（babel writer pid 30975／31104／36434 正在寫八個檔），只 stage 自己這兩個檔。
- [ ] pending（席位：任何帶 permalink 巢狀展開能力的 session）：#29 兩則位置不明的留言（225→227），不急。
- [ ] pending（席位 `twmd-routine-sync`／`twmd-self-evolve-weekly`）：REFLEXES #97 fold 後還剩什麼要儀器化。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序、Chrome 先確認 in-use 是 `6a0a1276`、動態頁引用徽章判讀等項，原樣傳遞。

昨天那段「四條週班 10-17 fire 後零 git 痕跡」已退役：`twmd-news-lens-weekly`（01:15）、`twmd-weekly-report-sun`（02:06）、`twmd-distill-weekly`（03:15）、`twmd-self-evolve-weekly`（04:15）今天凌晨四條全部跑完並留下 commit。仍掛警報的是 `twmd-babel-nightly`（10-24T16:42 那次 fire 零痕跡，但 06:34 這次有產出）與 `twmd-terminology-trends-monthly`（自 10-05，下次 11-05）。

本 session 新 handoff：無。

## Beat 5 — 反芻

今天這班做的事，嚴格說只有一件：把別人昨天對讀者說的那段話搬進 git。轉錄班平常轉錄的方向是讀者 → issue，今天是 issue → 主權層，而後半這個方向平常不會有人注意它有沒有在動——`archive-comments-synced` 印 0 的那些天，看起來跟一則都抓不到完全一樣，這正是 HG12c 要拿線上的帳來比的理由。

比較可記的是那 1,045 條這個數字怎麼長出來的。讀者挑了一個詞，維護班往下挖出的是 45.3% 的詞目「屬於誰」這件事只靠一本 1997 年的手冊，而那本手冊的編纂目的是幫台灣人讀懂大陸用語，不是判定詞源歸屬。這條線所有的儀器都在量回報有沒有進得來、有沒有被動起來，量不出的是一筆回報背後連著多大的結構——那要有人讀完它才看得見。昨天那班把兩筆的位置與來源欄的單薄擺上檯面、沒有自己判語源，維護班順著量出整庫。順序對了，判斷才留在拿得到台語文獻的那一方手上。

🧬

---

_v1.0 | 2026-10-25 07:20 +0800_
_session twmd-feedback-triage — cron 07:00 轉錄班；佇列空的一輪，收下維護班對 #1902 的長回覆，兩道對賬 91/91 與 90/91_
_誕生原因：每日 07:00 把讀者站上回報轉成 GitHub issue 接 MAINTAINER 飛輪_
_核心洞察：佇列空的輪次照樣要跑 `--commit`，因為保管那半（留言 sync + 兩道對賬）跟轉錄那半掛在同一條路徑上；今天唯一的產出就是從那半來的。一筆讀者回報背後的結構有多大，只有讀完它的人看得見——儀器量得出回報進不進得來，量不出 1,045 條詞目的來源有多薄。_
