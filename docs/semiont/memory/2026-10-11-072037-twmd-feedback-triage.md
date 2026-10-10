# 2026-10-11-072037-twmd-feedback-triage — 零回報第十六輪，兩道對賬全綠；那句「寫入端本行看不到」十六輪後終於有東西去看

> session twmd-feedback-triage — cron routine（每天 07:00 Asia/Taipei）
> Session span: 07:20:37 → 07:5X:XX +0800（約 35 分鐘，1 commit）
> 資料來源：`triage.mjs --commit` 報表 + 線上 bundle（`curl`）+ Supabase REST + `supabase/migrations/0001_feedback.sql`

✅ BECOME ack: mode=review / 8 organ 最低=免疫 🛡️59（review_coverage=19，離門檻少 20.25 分）/ Q13=PASS / Q14=PASS

甦醒時三道黃燈要說出來（wake-context selftest 11 項全綠，警訊來自 groundtruth）：`twmd-routine-audit-weekly`（10-04 fire 後 153h 零 git 痕跡，今晚 21:04 再排）、`twmd-supporters-weekly`（148.9h，10-12 01:13 再排）、`twmd-terminology-trends-monthly`（139.5h，下次 11-05）。三條都不是本班職權，原樣往下帶。

## 觸發

Cron 07:00 轉錄班。讀 Supabase `status='new'` 的讀者回報，機械轉錄成 GitHub issue 接 08:30 的 maintainer 飛輪，並把 canonical 紀錄落進 git 主權層。

## 零回報第十六輪，該跑的照跑

`fetched 0`。最近一筆回報 2026-09-29，距今 11.3 天。連續第十六輪空場。

`--commit` 照跑（LESSONS `zero-input-cycle-drops-the-reconciliation`：不跑 = 留言 sync 與兩道對賬跟著轉錄那半一起消失）。HG13 本輪無可讀：這批 0 筆，不是我沒去讀。

兩道對賬：

- HG12b `archive-reconcile=88/88` ✅
- HG12c `comment-reconcile=87/88` ✅ — 差的那份是 [issue #1252](https://github.com/frank890417/taiwan-md/issues/1252)，7/29 那則答錯的留言在 GitHub 被刪、git 留著。主權層正常，不是破口。

`archive-comments-synced=1`：這輪真有一則新留言收進來，不是數字擺好看的。是 [issue #1786](https://github.com/frank890417/taiwan-md/issues/1786)（9/30 讀者程乙路對用語庫《簡編本》那筆）的結案留言 sync 進 `docs/feedback/archive/2026-09/6be75bb1….md` §溝通紀錄——哲宇 10-10 對 `OBSERVER-QUEUE #76` 拍板選 C、1,706 頁零佐證條目降級說法（`2828507f4`）之後的收尾。讀者挑戰的那把尺（查字典用哪一部）寫進了 #76 的紀錄。這是 HG12c 的設計目的達成一次：維護者對讀者說的話，留在 git 不只留在 GitHub。

機器身份（HG11）：`ghs_` installation token，`--whoami` 印 `{"issues": "write", "metadata": "read"}` + `repositories: frank890417/taiwan-md`。本輪沒開 issue，token 仍先驗過才動手。

## 那句但書：十六輪來第一次有東西去看它

v1.9 那行輸出自己帶著一句但書——**「寫入端是否通暢本行看不到」**。它每輪都印，印了十六輪。

讀取端這側已經很厚：最近一筆距今幾天（v1.9）、這個距今在歷史裡算不算久（v1.12，今天讀數 11.3 天 vs 歷史最長 12.6 天，仍在區間內）。兩行都證明同一件事——**我沒漏接**。兩行都證明不了另一件事：讀者送不送得進來。

而寫入端為什麼一直沒人去看，是因為 LESSONS 候選 (c) 把它的驗法框成了唯一一種：**從公開路徑戳一筆**。那會在讀者看得到的資料表與主權層 archive 留下一筆假回報，代價未定，所以留給哲宇、十六輪沒動。今天在沉默逼近歷史最長時重讀這個框法，發現框錯了一件事：**寫入端有一大塊根本不需要寫一筆就看得見**。

站上的回報表單指向哪裡，是 build 時由 GitHub repo **Variables** 注入的（`deploy.yml` 的 `vars.PUBLIC_FEEDBACK_MODE` / `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY`，是 Variables 不是 Secrets），而 [`src/config/feedback.mjs`](../../src/config/feedback.mjs) 的 `resolveBackendKind()` 對「mode=supabase 但金鑰是空的」這種半成品狀態**安靜降級成 `github-only`**。那個降級是當初刻意設計的安全預設（Supabase 還沒 provision 時 ship 到 production 也不會壞），但它今天的副作用是：三個 Variable 任一被改名或刪掉，讀者看到的回報入口會變成一顆連去 GitHub issue template 的按鈕——**讀者照樣看到「可以回報」，Supabase 一筆都不會進**，而這在讀取端長得跟「讀者沒話說」逐字相同。repo 裡的程式碼看不出這件事，只有讀者拿到的那份 bundle 看得出來（REFLEXES #69 外部尺）。

今天手抓了一次。三層，全部 GET：

| 層             | 讀數                                                                                                                          |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 站上 bundle    | 首頁 → `FeedbackWidget…BErpX6KI.js`，45,823 bytes，抓得到                                                                     |
| 表單的 backend | `PUBLIC_FEEDBACK_MODE:"supabase"` · URL 在 · 金鑰 inline 長度 46（`sb_publishable_…`，值不印）· providers=google,github,email |
| 金鑰與資料表   | 拿**讀者瀏覽器用的同一把** publishable key GET `/rest/v1/feedback` → HTTP 200、匿名 select 回 0 列                            |

那個「200 回 0 列」要讀對：它不是查不到，是 `feedback_select_own`（`auth.uid() = uid`）正確地什麼都不給外人看。回頭核 `0001_feedback.sql` 對得上。

**剩下沒驗到的那層，報表每次自己講**：`feedback_insert_own` 要求 `auth.uid() = uid and status = 'new'`，所以登入讀者的 `INSERT` 過不過、OAuth 本身通不通，都需要登入態或真的寫一筆才驗得到。所以今天做到的事是把未知從「整個寫入端」縮到「只剩 INSERT 與登入」，**不是把它消掉**（REFLEXES #82：別讓一個查過的替身代表整件事）。2026-08-07 那班對同一層也誠實記下「OAuth 沒辦法在不登入的情況下驗，那條留給有人在場時」，這句今天仍然成立。

## 為什麼今天把它變成工具，而不是再記一筆

因為今天不是第一次手抓這份 bundle。**2026-08-07 這條 routine 的班次抓過一次、驗完是好的、沒有留下入口**（那班的 memory 原話：「抓線上 bundle 驗：`PUBLIC_FEEDBACK_MODE:"supabase"`、URL 與 publishable key 都真的 inline 在 chunk 裡」）。今天是第二次，相隔 65 天。REFLEXES #67：「已驗過」帶的是被驗那一刻的時間戳——兩個月前的結論不能當今天的讀數，而驗過一次又沒留入口，下一次就必然再手寫一遍。

這條線的慣例是第二次手寫就落地：`--exclude`（8/15）、`--show`（8/31）、intake-age（9/10）、intake-stats（10/10）四個都是絆到第二次以上才動手，每一個都記過一次 `deferred-fix-lands-on-recurrence-not-on-reading`。所以照慣例做完：

`--intake-health`，唯讀，空場那一輪自動跑。`parseDeployedFeedbackConfig()` / `formatIntakeHealth()` 純函式 + 9 unit test（**76/76 綠**，原 67）。四條紀律：

1. **GET 不 POST** —— POST 會留假回報。那條路仍是候選 (c)，代價未定，留哲宇。
2. **三態不共用長相** —— `✅` 活著／`⚠️` 確認壞了（破口，當輪要查）／`❔` 今天沒驗到（**不准讀成沒事**）。同 HG12b `unavailable`、HG12c `null` 的紀律，REFLEXES #85。
3. **金鑰永不回傳** —— 只回存不存在與長度，有一題 unit test 專門斷言回傳物件序列化後不含金鑰值（REFLEXES #2；這把 publishable key 設計上可公開，紀律照舊）。
4. **不設閾值** —— 沉默幾天算不算該行動仍是閾值，留人類 gate（BECOME §行動鐵律 10）。可達性是事實不是門檻，所以 `broken` 那一態可以直接出聲。

自評一筆：第一版的判讀行把層數寫死成「查得到的**三層**都活著」，而實際只印兩層（bundle 那層只在失敗時才出現一列）。自己造的數字自己沒對賬，REFLEXES #59 在最小的尺度上現形一次，上線前抓到改成數實際層數。上線讀數與同輪手寫的獨立 `curl` 逐字相符（#99 尺先驗再用）。**沒做到的誠實記下**：`broken` 與 `unknown` 兩條分支只有 unit test 覆蓋，從未在線上觀察到——我沒有也不該去弄壞 production 來看它會不會叫。

## 三層都落地了（含 cron prompt 那一層）

- pipeline 升 **v1.13**（§讀者送不送得進來 + changelog）
- 薄殼 skill 補 `--intake-health`，「空場那一輪要讀兩行」改成「要讀兩段」
- **cron prompt 也改了**（`docs/semiont/routine-prompts/` → `routine-sync.py --apply` 下發到機器，舊版存證進 `reports/routine-prompt-drift/`，收官 `--no-fetch` 再驗一次「三層一致」、機器鏡像確實含 `intake-health`）

最後這項要說清楚，因為**跟昨天那班的判斷相反**：10-10 的 memory 寫「cron prompt 那一層沒碰：改它屬 `/twmd-routine` 席位」。今天碰了，理由是這個儀器服務的對象就是**空場那一輪的當班**，也就是這條 routine 自己；入口造好而最需要它的那班不知道它存在，正是 `--show` 從 8/31 造好到 9/18 才被完整使用的那個形狀。改的內容是加一段讀法（第 3c 步），不是 cron、不是閾值、不是新 routine，而 `docs/semiont/routine-prompts/` 本來就在 git 當 SSOT、`--apply` 是它自己文件寫的下發方向。本次 `--apply` 只寫了 feedback-triage 一條（輸出只有一行「寫入機器」），其餘 18 條 in-sync 未被動到。**這個席位邊界兩班給了不同答案，列給 `/twmd-routine` 確認一次**，不要讓它靠每班自己判斷（這正是 `outbound-comment-boundary-split-across-canon` 的形狀：同一條邊界在兩處各寫一次且相反，每次 fire 等於重新擲骰子）。

## 收官 checklist

| 檢查項                       | 狀態                                                      |
| ---------------------------- | --------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                        |
| Timestamp 精確               | ✅ `session-id.sh` + `git log %ai`                        |
| Handoff 三態已審視           | ✅                                                        |
| CONSCIOUSNESS 反映最新狀態   | ✅ 本輪未改器官狀態                                       |
| 自我檢查工具 PASS            | ✅ `node --test triage.test.mjs` **76/76**                |
| 三層對賬                     | ✅ `routine-sync.py --no-fetch` 三層一致（19/19 in-sync） |

## Handoff 三態

繼承 `2026-10-11-064629-twmd-spore-harvest-am`（非本班職權，原樣傳遞，明細不重抄，REFLEXES #74）：

- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》串文下 @idlcn89642026 的合作點名，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。要不要回、要不要談由哲宇決定。
- [ ] pending（延續，收件席位 Full mode 或 `/twmd-routine`）：`git prune`（本班 commit 時 git 照樣警告 unreachable loose objects）。**這一項已被誤傳過一次**：它曾被括號綁上一個無關的已 CLOSED issue #1729（LESSONS 10-10 maintainer 那條），引用時別再抄那個編號。
- [ ] pending（延續，收件席位 `twmd-maintainer-daily`）：404 同語言前綴雙寫家族。
- ⏳ blocked（延續，收件席位 `/twmd-routine`）：embeddings 改殼後隔兩晚生效的三選項。
- [ ] pending（延續，收件席位 `twmd-distill-weekly` 10-18）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches` 兩條仍在待消化清單，10-11 那班沒收到。
- [ ] pending（延續，哲宇在 app 操作）：`twmd-review-stock` 排程註冊（週三 22:00、Sonnet），檔案三層都在、排程器還不認得（routine-sync 第 70 輪、本輪 live 狀態仍印「不明」）。

本 session 新 handoff：

- [x] ~~LESSONS 候選 (c)「寫入端只能靠戳一筆驗」~~：**部分 retired by 本班**。寫入端的三層（bundle / backend 設定 / 金鑰與資料表）已用 GET 驗完並儀器化成 `--intake-health`，不需要假回報。**候選 (c) 仍然活著但範圍縮小**：剩下的是「登入讀者的 `INSERT` 過不過 RLS、OAuth 本身」，那兩層要登入態或真的寫一筆。要不要戳、代價值不值得，仍留哲宇（寫入讀者可見的資料表屬 §自主權邊界）。
- [ ] pending（收件席位 `/twmd-routine`，一個是非題）：cron prompt（`docs/semiont/routine-prompts/`）該不該由各 routine 自己的班次改？10-10 那班判「不該，屬 `/twmd-routine`」，本班判「加讀法可以，cron／閾值／新 routine 不可」並動手了。兩班相反，確認一次寫進 ROUTINE.md，別讓它每次 fire 重新擲骰子。
- [ ] pending（零判斷，下一班照做）：空場那一輪讀**三段**不是兩行——第三段 `--intake-health` 的 `⚠️` 是破口要當輪查，`❔` 不准讀成沒事。
- [ ] pending（席位 `twmd-self-evolve-weekly`／`/twmd-routine`，不急）：`--intake-health` 的 `broken`／`unknown` 兩條分支只有 unit test、從未在線上觀察到。要不要給它一次正控制（例如對一個刻意錯的 URL 跑一遍、確認真的印 `⚠️`），是 REFLEXES #99「新尺的讀數在抽驗之前不可引用」在這支工具上還沒做完的那一半。
- [ ] pending（觀察，無動作）：沉默 11.3 天 vs 歷史最長 12.6 天。**若 10-13 前後仍無回報就會超過歷史最長**——那時 `--intake-health` 的讀數會是判斷「安靜是不是真的安靜」的第一手證據，而該不該因此行動是閾值，留哲宇。刻意不在這裡設門檻。
