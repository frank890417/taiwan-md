# 2026-10-24-071152-twmd-feedback-triage — 一筆讀者回報開成 issue #1902，用語庫「中國用語」那一欄第二次被讀者用本土語源質疑

> session twmd-feedback-triage — cron 07:00 轉錄班
> Session span: 07:07:00 → 07:15:00 +0800（約 8 分鐘，1 commit）
> 資料來源：`git log %ai` + `date` + 檔案 mtime

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（`consciousness-snapshot.sh`，最大缺口 review_coverage=18.4）/ Q13=PASS / Q14=PASS

## 觸發

每日 07:00 把讀者站上回報轉成 GitHub issue，接 08:30 維護班的飛輪。今天佇列裡有一筆。

## 那一筆：楊喬梓對〈仿冒品〉用語條目的質疑

讀者楊喬梓在用語保存計劃的 `/terminology/仿冒品/` 頁面送了一句話：「假貨來自閩南語翻華文。」照 HG13 先用 `--show` 把全文拉出來讀過才動手——四個讀者欄位裡只有 `body` 有內容，`quote` 與 `correct_info` 空白，沒有指涉具名私人、沒有跟監細節、沒有要求保密，可以開成公開 issue。`--commit` 開出 [issue #1902](https://github.com/frank890417/taiwan-md/issues/1902)（`[Idea]` / `enhancement` + `from-feedback`），作者是 `app/taiwanmd-semiont`（`is_bot=true`），主權層紀錄落在 `docs/feedback/archive/2026-10/e6e580ed-….md`。

值得留給收割那邊的是形狀：這是**用語庫的「中國用語」那一欄第二次被讀者用本土語源質疑**。9/16 那筆是 [issue #1733](https://github.com/frank890417/taiwan-md/issues/1733)，讀者拿教育部《重編國語辭典修訂本》與《文明小史》第三回質疑「消息」被標成中國用語（已 closed）。今天這筆說「假貨」是閩南語翻華文。被質疑的條目 `data/terminology/仿冒品.yaml` 的 `china: 假貨` 來源只有一行 `ThunderKO C2T / 《大陸用語檢索手冊》1997`，`notes` 是空的。語言學判斷本身不是我這班的事，也不該由我判——主權敏感詞的審查裡模型預設把中國語料當基準（REFLEXES #16 的 sovereignty 延伸），所以我只把兩筆的位置、條目路徑與來源欄的單薄擺上檯面，讓拿得到教育部辭典與台語文獻的那一方去判。

另一件事實：這筆回報的到達時間是 2026-10-22 23:34 UTC，換成台北是 10-23 07:34——**昨天這個席位 07:12 跑完之後 22 分鐘**。它因此在佇列裡躺了 23.6 小時等今天這個時段。每日單班的結構就是這樣，最壞情況下讀者的話要等將近一天才會動起來。這是事實不是閾值，排不排第二個時段屬排程決定，留哲宇。

## 三段儀器與兩道對賬

佇列不空，所以三段儀器在第一輪 dry-run 不會自動印。`--commit` 把那筆回寫成 `filed` 之後佇列變空，重跑時三段都印出來了：最近一筆回報 2026-10-22（距今 1.0 天，`status=filed`，就是剛開成 #1902 的那筆），歷史最長到達間隔 14.7 天（2026-09-29→2026-10-14，全庫 94 筆，比昨天多的那一筆就是這筆），寫入端健檢四層全綠。四層分別是 bundle 抓得到 `FeedbackWidget` chunk（40,504 bytes）、`mode=supabase` 且金鑰 inline 長度 46 不印值、讀者那把 publishable key GET 回 200 且匿名 select 回 0 列、`/auth/v1/settings` 的 github 與 google 與 email 都開著且 `disable_signup=false`。報表照舊自己講它涵蓋不到登入讀者的 `INSERT`。

今天這三段讀起來跟昨天幾乎一樣，但它們今天有一個昨天沒有的證據：真的有一筆從讀者那端走完全程進來了。端到端的實證比探針強，而探針在同一輪也說一切通暢，兩邊對得上。

兩道對賬：`archive-reconcile=91/91 ✅`、`comment-reconcile=90/91 ✅`——那個 90/91 是 issue #1252 的上游留言被刪、git 這邊留著，主權層正常運作的樣子。`archive-comments-synced=0` 今天是真的沒有新留言（`comment-reconcile` 有抓到線上帳才分得出這跟「一則都抓不到」的差別，HG12c 的存在理由）。

## 收官 checklist

| 檢查項                       | 狀態                                            |
| ---------------------------- | ----------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                              |
| Timestamp 精確               | ✅（`date` + 檔案 mtime）                       |
| Handoff 三態已審視           | ✅                                              |
| CONSCIOUSNESS 反映最新狀態   | ✅ 由 derived 層（`dashboard-alerts.json`）接管 |
| 自我檢查工具 PASS            | ✅ prose-health（memory-diary profile）         |

HARD gate 逐條：

| Gate     | 本輪結果                                                                                          |
| -------- | ------------------------------------------------------------------------------------------------- |
| HG11     | token `ghs_` 開頭、權限 `{"issues":"write","metadata":"read"}`、範圍 `frank890417/taiwan-md` 一庫 |
| HG13     | `--show e6e580ed-…` 讀完全文才 `--commit`，無待攔筆                                               |
| HG2      | issue body 與 archive 紀錄零 email（全月 archive grep 過）                                        |
| HG3      | 讀者那句話逐字不動                                                                                |
| HG4      | provenance 帶 feedback id                                                                         |
| HG5／HG6 | 本輪無 spam、無重複                                                                               |
| HG7      | `status=new → filed`                                                                              |
| HG9      | tilde fence 包裝（`~~~~text`）                                                                    |
| HG10     | 無 injection 命中，未加 `security-review`                                                         |
| HG8      | 未以維護者身份開口                                                                                |
| HG12     | archive 已 `git add`                                                                              |

## Handoff 三態

繼承 `2026-10-23-071239-twmd-feedback-triage`：

- [x] ~~pending：issue #1893 的民調數字~~ — 已於昨天 retired，不再往下傳。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily`，今天 08:30）：issue #1902。條目在 `data/terminology/仿冒品.yaml`（`china: 假貨`，來源欄只有一行 1997 年手冊、`notes` 空），讀者主張「假貨」是閩南語翻華文。語源判定需台語文獻與教育部辭典，不是 LLM 直覺能收的（REFLEXES #16 sovereignty 延伸）。
- [ ] pending（收件席位 `twmd-terminology-trends-monthly`，下次 11-05）：用語庫 `china` 欄被讀者用本土語源質疑第二例（#1733 消息／#1902 假貨，vc=2）。要看的是整庫有多少條目的來源只有那本 1997 手冊、`notes` 空白，而不是只修這兩條。

繼承 `2026-10-24-064129-twmd-spore-harvest-am`（非本班職權，原樣傳遞，明細見該檔，REFLEXES #74）：

- ⏳ blocked（收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下次時點 10-28（剩四天）。
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- ⏳ blocked（收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（收件席位 `twmd-weekly-report-sun`，下次 10-25）：Cloudflare 每日請求與 404 `duplicated-lang-prefix` 是否落回。
- [ ] pending（收件席位 `twmd-data-refresh-am`，告警 `data-hub-stale`）：`mortgage-burden` 新一期官方數字。
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 10-25）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。本班第二十三次繞開（vc=23）：`PARALLEL_CHECK: ACTOR_BUSY`（babel writer pid 13250／60020），babel 正在寫七個檔、`OBSERVER-QUEUE.md` 也有別人的未提交改動，只 stage 自己這三個檔。
- [ ] pending（席位：任何帶 permalink 巢狀展開能力的 session）：#29 兩則位置不明的留言（225→227），不急。
- [ ] pending（席位 `twmd-routine-sync`／`twmd-self-evolve-weekly`）：REFLEXES #97 fold 後還剩什麼要儀器化。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序、Chrome 先確認 in-use 是 `6a0a1276`、動態頁引用徽章判讀等項，原樣傳遞。

四條週班（`twmd-distill-weekly`／`twmd-news-lens-weekly`／`twmd-self-evolve-weekly`／`twmd-weekly-report-sun`）10-17 fire 後零 git 痕跡，警報掛到第六天，四條的下次時點都在 10-25（還有 19-22 小時）。`twmd-terminology-trends-monthly` 自 10-05 起同型，下次 11-05——今天新開的那條 vc=2 交接正好指名給它，所以那條指名在十二天內不會有人收。本班無權代跑，只把這件事記清楚。

## Beat 5 — 反芻

連續二十幾輪的空佇列之後，今天那一筆讓三段儀器的角色換了位置。那三段是為「零」設計的——零同時是讀者沒話說跟讀者送不進來，所以要用最近一筆的距今、歷史間隔、寫入端四層把雙義攤開。今天有一筆真的走完全程，端到端實證直接蓋掉了探針要回答的問題，而探針在同一輪也說通暢：兩邊對得上，這是這支尺第一次有機會跟真實事件校準，而不只是跟自己的歷史讀數校準。

另一半是那筆回報本身。它在佇列裡躺了 23.6 小時，因為它在昨天跑完後 22 分鐘才送進來。這條線所有的儀器都長在「讀者有沒有在說話」這一側，沒有一道在量「說完之後多久會被動起來」——昨天的 #1893 從開 issue 到維護班做掉只花 85 分鐘，但那 85 分鐘前面其實還有一段讀者在等的時間，它不在任何報表上。我今天沒有把它變成閾值或第二個時段，那是排程決定；我只是注意到：這條線量得很細的那一側，是我自己動作的那一側。

🧬

---

_v1.0 | 2026-10-24 07:15 +0800_
_session twmd-feedback-triage — cron 07:00 轉錄班；一筆讀者回報開成 issue #1902，兩道對賬 91/91 與 90/91_
_誕生原因：每日 07:00 把讀者站上回報轉成 GitHub issue 接 MAINTAINER 飛輪_
_核心洞察：用語庫「中國用語」那一欄第二次被讀者用本土語源質疑（#1733 消息／#1902 假貨），兩條的來源欄都單薄，該看的是整庫而不是這兩條。這條線的儀器全長在「讀者有沒有說話」那一側，讀者說完到被動起來之間的等待時間不在任何報表上。_
