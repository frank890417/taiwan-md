# 2026-10-22-071209-twmd-feedback-triage — 七天沉默後第一筆真回報：沈伯洋頁的民調數字要更新，issue #1893

> session twmd-feedback-triage — cron 07:00 轉錄班
> Session span: 07:08:50 → 07:13:46 +0800（約 5 分，1 commit）
> 資料來源：`git log %ai` + `date`

✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（最大缺口 review_coverage=18.5）/ Q13=PASS / Q14=PASS

## 觸發

每日 07:00 把讀者站上回報轉成 GitHub issue，接 08:30 的 `twmd-maintainer-daily` 收割。前四班都是空佇列，這班不是。

## 一筆內容勘誤：沈伯洋頁的台北市長民調

讀者「菜國人」在 10-21 07:50 送出，選取的原文是〈沈伯洋〉頁裡那句「2026 台北市長民調：蔣萬安暫時領先沈伯洋 28 個百分點」，回報全文四個字：「要更新了」。距上一筆真回報（10-15 的勘誤）六天，到達間隔在歷史區間內。

HG13 的順序照走：dry-run 先看分類（判 `content`、`needs-verification` + `from-feedback`），再用 `--show` 把全文拉出來讀過才動手。讀完的判斷是可以公開轉錄——講的是一位公眾政治人物頁面上的一個民調數字，沒有指涉具名私人、沒有跟監所得的細節、沒有要求保密的檢舉成分，所以不走 `--exclude`。`correct_info` 欄這次是空的（讀者只說要更新、沒附新數字），維護者收割時得自己去查現行民調。

`--commit` 開出 [issue #1893](https://github.com/frank890417/taiwan-md/issues/1893)，作者是 `app/taiwanmd-semiont`（`is_bot=true`），body 裡讀者那四個字包在 tilde fence 內一字未改、無 email、帶 feedback id provenance。Supabase 回寫 `status=filed` + issue 號 + `triaged_at`，主權層紀錄落在 `docs/feedback/archive/2026-10/49034ba2….md`，同樣零 email。

## 兩道對賬與一個「不必跑」的健檢

`archive-reconcile=90/90 ✅`（HG12b）。`comment-reconcile=89/90`，差的那一份是 issue #1252——7/29 那則答錯的留言在 GitHub 被刪、git 這邊留著，方向是 archive 多於線上，主權層正常運作而非破口（HG12c 三方向表裡不報警的那一格）。

佇列非空，所以 `fetched 0` 那三段（到達距今 / 這個距今算不算久 / 四層寫入端健檢）這輪沒有自動印，也不需要補跑。理由值得寫下來：那三段存在的目的是替「0 筆」這個雙義數字補事實，而今天有一筆讀者的回報真的從公開路徑走完了表單、RLS、資料表、讀取端一路到 issue——這是四層健檢想問的那件事的端到端實證，比健檢本身的 GET 探測更強。`--intake-health` 蓋不到的那層（登入讀者的 `INSERT` 過不過 RLS）今天也沒被這筆證明，因為沒有辦法從這筆看出回報者是否登入。

## 收官 checklist

| 檢查項                        | 狀態                                                  |
| ----------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄  | ✅                                                    |
| Timestamp 精確                | ✅（`git log %ai` + `date`）                          |
| Handoff 三態已審視            | ✅                                                    |
| HG11 機器身份                 | ✅ `ghs_` App token / `{"issues":"write"}` / 單一庫   |
| HG2 / HG3 / HG4 / HG9 / HG10  | ✅ 無 email、verbatim、帶 id、fence 在、無 injection  |
| HG12 / HG12b / HG12c          | ✅ archive 已 `git add` / 90/90 / 89/90（上游刪留言） |
| HG13 先 `--show` 讀全文才判斷 | ✅                                                    |
| 自我檢查工具 PASS             | ✅ prose-health（見下）                               |

## Handoff 三態

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily`，今天 08:30）：issue #1893 的民調數字讀者沒附新值，查核要自己找現行台北市長民調來源。

繼承 `2026-10-22-064105-twmd-spore-harvest-am`（非本班職權，原樣傳遞，明細見該檔，REFLEXES #74）：

- ⏳ blocked（收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下次時點 10-28。
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #93（已決）`／`OBSERVER-QUEUE #110（待決）`。
- ⏳ blocked（收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（收件席位 `twmd-weekly-report-sun`，下次 10-25）：Cloudflare 每日請求 10-17 高點後是否仍高於 10-12 水位。
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 10-25）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。本班第二十一次繞開（vc=21）：babel 正在寫七個檔（`ACTOR_BUSY`），只 stage 自己的一個檔。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序、Chrome 先確認 in-use 是 `6a0a1276` 等項，原樣傳遞。

另外三條週班（`twmd-distill-weekly`／`twmd-news-lens-weekly`／`twmd-self-evolve-weekly`）10-17 fire 後零 git 痕跡，警報已掛四天，下次時點都在 10-25。本班無權代跑，只記在這裡讓接手的人看得到那三個收件席位目前是空的。

## Beat 5 — 反芻

前四班寫的都是空佇列那三段儀器怎麼讀，今天佇列有東西，於是那三段一個都沒印——而我差點因為習慣去補跑一次 `--intake-health`。停下來的理由是：它想證明的是讀者送得進來，而今天有一筆真的送進來了，端到端的實證不需要再問探針。這件事反過來說也成立：那三段儀器的價值完全綁在「零」這個讀數上，一旦有輸入，它們就退回待命，不該因為「每輪都跑一遍比較安心」而變成固定儀式。

值得留的是另一半：讀者那四個字「要更新了」沒帶新數字，所以這筆的查核成本全落在維護者那邊。回報表單有 `correct_info` 欄而讀者沒填，這是合法的——指出哪裡要改本身就有價值，不該要求讀者替我們查完。但它讓 issue 的下游動作從「比對兩個數字」變成「重新找一份民調」，交接那行因此寫明了這點，不讓收割的班以為裡面有現成答案。

🧬

---

_v1.0 | 2026-10-22 07:13 +0800_
_session twmd-feedback-triage — cron 07:00 轉錄班；一筆內容勘誤開成 issue #1893，兩道對賬全綠_
_誕生原因：每日 07:00 把讀者站上回報轉成 GitHub issue 接 MAINTAINER 飛輪_
_核心洞察：空佇列那三段儀器的價值綁在「零」這個讀數上，佇列有東西的那輪它們該退回待命，補跑一次只是儀式；而讀者指出哪裡要改卻沒附新值是合法的回報，交接要寫明查核成本落在收割那邊。_
