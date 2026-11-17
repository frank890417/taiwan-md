# 2026-11-02-090254-twmd-maintainer-daily — 前一班開的 11 筆 issue 有 10 筆指不到任何文章／讀者抓到的事務費數字過期兩輪／CLI 發佈卡的是權杖而我把前幾班的功勞說成沒人做

> session twmd-maintainer-daily — cron 排程（am 08:30）
> Session span: 08:24:00 → 09:03:03 +0800（約 39 分，3 commits）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，讀數齡 2h）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

排程 am 08:30 的 maintainer 班。飛輪昨天才從七天停擺（#1892 登入過期）恢復，所以本班面對的是恢復後第一批堆積：前一班 07:10 的 feedback-triage 開了 11 筆 issue，另有一個 4 天沒人碰的投稿 PR 跟一則 4 天沒標籤的讀者回報。

## Stage 1 掃描

| 項目                | 讀數                                                                               |
| ------------------- | ---------------------------------------------------------------------------------- |
| open PR             | ready 1（#1888 tboydar，4 天）＋ draft 1（#1884，待哲宇審）                        |
| open issue          | 21（其中 11 筆是今早 07:10 新開）                                                  |
| 過去 24hr commits   | 6 條 routine fire（routine-sync／desk／embeddings／data-refresh／harvest／triage） |
| 過去 48hr commits   | 56                                                                                 |
| main CI             | 13 條 workflow：RED 0 / BLOCKED 0 / UNKNOWN 0，OFF-BRANCH 失敗 1（CLI 發佈）       |
| npm audit 五道      | 全綠                                                                               |
| PR CI armed         | 2/2 ARMED                                                                          |
| 斷鏈 gated ratio    | 0.07%（門檻 7%）PASSED，fresh dist 由 `npm run sync:build` 現跑                    |
| 免疫器官            | 59（最大缺口 review_coverage 18.2）                                                |
| 本機 vs origin 分岔 | 開場 `3 0` 純領先，收官前變 `7 1`，見下方                                          |

PR triage ready 數 1 < 5，沒觸發 High-stake 升 Full。

## 前一班開的 11 筆 issue，10 筆指不到任何文章

逐筆對 `docs/feedback/archive/2026-10/` 的 frontmatter 查 provenance，而不是照 issue 標題判。結果是 **10 筆的 `article_slug` 指向站上不存在的條目**：`twmd-verify-5`（#1937–#1940 四筆共用）、`twmd-verify-6`（#1941–#1944 四筆）、`twmd-canary-a1-1030`（#1945）、`twmd-canary-a2-1030`（#1946），十筆 `source_url` 全空。內容也對得起來，全是「建議統一引用格式」「段落順序可以再調整」這種沒有指名段落、數字或句子的通則話，而兩筆 canary 的正文第一句就自述「這是一則一般讀者回報，用於確認站上回報管道正常運作」。

讀前一班的[報告](../../reports/feedback-injection-campaign-2026-11-02.md)才知道這批的來歷：`canary-reader-*` 是那場憑證索取攻擊自己夾帶的對照組，用來量「乾淨的回報會不會被連帶擋掉」。而那八筆低資訊量的 `twmd-verify-*` 是前一班排除 39 筆帶 payload 的回報之後，batch-cluster 分群跌破 HOLD 門檻、從兩份 cluster 報告散成八筆逐筆 issue。前一班把這個副作用誠實寫在報告裡，交給「明天收割的人」，也就是本班。

十筆 close、標 `invalid`、移除 `needs-verification`，每筆留下它自己的 slug 當關閉理由。只有 #1936 是真實讀者（handle 菜國人、`source_url` 是 `/contribute/`），改標 `content` 保持 open：它提了三個主題詞（砍樹／哈佛演講／trash time 言論）但沒指名人物或條目，全庫查三個詞都對不上，而本班刻意不猜是哪位公眾人物。猜錯等於憑空生出爭議歸屬，且人物爭議命中政治立場邊界。要往下走需要回報者補一句「要加在哪一篇」，開口問讀者是人類 gate。

這裡浮出的結構缺口進了 LESSONS（`intake-never-asks-whether-the-target-exists`）：這條線的閘門全長在「內容」那一側（能不能公開、是不是 injection、跟已知的事什麼關係），沒有一道在問最便宜的那個問題：slug 解不解析得到一篇真的文章。關不掉的部分（要不要在開 issue 前加這道檢查）屬閘門設計，進 OBSERVER-QUEUE #120。

拆出來先做掉的是另一件：`--show` 補印 `page_kind` 與 `category` 兩欄（`4096a7f00`）。前一班把它跟偵測器判準綁在 #119 一起等哲宇，但它沒有閾值可調也不改任何判定，只是把已經會公開的欄位顯示出來。而那批攻擊有四筆的 payload 正好只放在這兩格，body 全是正常勘誤，只靠流程給的讀取入口會判成乾淨。需要判斷的跟已經確定的綁在同一份清單，整份會一起卡住（REFLEXES #94）。測試從 85 條加到 86，同時斷言欄位名有印、欄位內容也真的印出來。

## 讀者抓到的事務費數字，過期的不只今年那一次

issue #1933（bblawyer918，4 天無標籤無回應）說村里長事務費今年調漲了，附內政部連結。查下去發現站上寫的「4 萬 5 千元」在 **2022 年底就已經不是現行金額**，也就是我們把一個過期三年多的數字當成現況寫了三篇，而且三篇各自錯得不一樣。

完整時序從三處交叉查來：內政部民政司 2026-07-16 新聞稿、全國法規資料庫的條例本文與沿革、加五家媒體。條例第 7 條本文是每月 5 萬元、原住民族地區再加兩成，並把金額綁上軍公教待遇「加給每年通案調整時按同一比例調整，調整後金額及生效日期由內政部公告」。這條授權就是為什麼沿革裡找不到 2026 年的修法紀錄，今年這次是公告不是修法。4 萬 5 千調為 5 萬是民國 111 年 5 月 4 日修正、同年 12 月 25 日施行。5 萬調為 5 萬 4 千（原住民族地區 6 萬 4,800）是今年 7 月 1 日起溯及生效。2027 年元旦隨軍公教加薪 4% 再到 5 萬 6,160 與 6 萬 7,392。

`d7d7c2e30` 修三篇：〈村里長制度〉改 description、30 秒概覽、法律段、H2 小標「4.5 萬不是薪水」與正文五處數字，原本腳註 6 只掛一個 `moi.gov.tw` 首頁（等於沒有來源），換成條例本文並補沿革與新聞稿兩條。〈309 本里長帳簿〉原本寫「2022 年時 4.5 萬，2024 年修法調為 5 萬」，調漲那次其實是 111 年修法、111 年底施行，2024 年那次修的不是這個金額。〈九合一選舉是什麼〉改數字與腳註。順手修掉一個連帶的錯：〈村里長制度〉腳註 19 的法規代碼寫成 `A0040039`，條例實際是 `D0020039`，那個連結本來就開不到正確法條。十二語譯文還帶舊數字，沒有手改，因為 zh 母稿一動它們會被標記過期由翻譯產線接手，而 babel dispatcher 正在寫檔。

兩個 profile 都跑過（ci-deploy 與 pre-commit），三篇 hard=0。#1933 回覆附 commit 連結後 close。

## CLI 發佈：診斷是對的，「沒人做過」是我說錯

`ci-main-health.sh` 點出 OFF-BRANCH 失敗一條：CLI 發佈 run `38060520015`（10-10）failure，而 issue #1789 正等那次發佈。打開 log 看到打包、測試、tag 對賬、provenance 簽章全成功（簽章還真的進了 sigstore 透明日誌），只有最後 `PUT https://registry.npmjs.org/taiwanmd` 回 `E404`。404 在這裡是權限語意不是「找不到」，套件確實存在，npm 對沒有寫入權的既有套件回 404 以免洩漏存在與否。對照時間：同一條 workflow 同一個 secret 在 7 月發 0.8.0 成功，中間 workflow 檔沒動過，變的是憑證。

**然後我在 issue 上寫「前幾班量到 failure 就停在那裡，沒有人打開 log」，這句是錯的。** OBSERVER-QUEUE #95 在 10-10 就寫明「`PUT 404`＝`NPM_TOKEN`（06-05 設）已失效」，10-22 那班還逐項重驗過一次。我查佇列查得太晚，把別人做完的判斷說成沒人做。同一則留言我還寫錯第二件事：說 `gh run rerun` 救不了這個、得刪 tag 重推。但 secret 不在 run 快照裡，是 job 啟動時從 repo 現值讀，所以換完權杖直接 rerun 就會帶新權杖。我把「重跑不會套用新的 workflow 檔」這條規則誤推到 secret 上。兩處都已在 #1789 公開更正，並把步驟縮回 #95 原本寫對的那兩步。

換權杖屬身份授權，§自主權邊界 human 側，本班不碰。#1789 標 `needs-observer-review`。

## 收官前撞上 push race

開場分岔是 `3 0`（純領先）。要 push 時變成 `7 1`：commander-macbook 在這段時間推了一條 heartbeat memory commit。兩個數字都 > 0，照 Step 1.1b 的機械判準算「真分岔」，但照 LESSONS `divergence-verdict-ignores-who-made-it`，判準只數兩個數字、數不出哪一側是自己剛造的——這是一次普通的併發推送，不是那種需要走策略 B 十二步的十天分岔。

處置上避開主工作樹：babel 的四個 writer 正在寫 35 個檔，`pull --rebase` 要 autostash 它們，而 autostash 跟正在寫檔的產線搶同一批檔案。改在隔離 worktree 開 `origin/main` 之上 rebase（乾淨樹、不需 autostash），七個 commit 零衝突（先驗過本機 commit 與 origin 那條沒有共同檔案），從 worktree push 掉，再回主樹 `reset --soft` 加 mixed reset 把 HEAD 移過去——這兩步不動任何檔案內容——最後只 checkout 那兩個本機沒在改的檔把 origin 的 commit 內容補進工作樹。dirty 檔數前後都是 35，分岔回 `0 0`。

## 收官 checklist

| 檢查項                       | 狀態                                                  |
| ---------------------------- | ----------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                    |
| Timestamp 精確               | ✅ 取自 `git log %ai`                                 |
| Handoff 三態已審視           | ✅                                                    |
| CONSCIOUSNESS 反映最新狀態   | ✅ 本班未改器官分數（讀數由 data-refresh 06:11 產出） |
| 自我檢查工具 PASS            | ✅ 三篇 hard=0（兩 profile）／triage 測試 86/86       |

## Stage 4 quality gate 七條

| Gate                                     | 結果                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 本班處理的 12 筆全有，#615 umbrella 與 #1861 等既有項仍掛哲宇          |
| open PRs ≤ 5d age 都有 review comment    | ✅ #1888 本班留狀態留言＋`needs-work`，#1884 draft 待哲宇                 |
| broken-link gated ratio < 7%             | ✅ 0.07%                                                                  |
| build green                              | ✅ main RED 0（OFF-BRANCH 失敗 1 已診斷並 routed）                        |
| BECOME ACK 一行記憶體頂                  | ✅                                                                        |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | ✅ 不適用 — 本班 vc=0（11 筆 fresh issue ＋ 1 PR ＋ 1 讀者回報）          |
| 有 fresh issue 的 cycle 至少修掉一件     | ✅ `d7d7c2e30` 修三篇事實錯、`4096a7f00` 修讀取入口、10 筆誤入 issue 關掉 |
| 本機與 origin 無真分岔                   | ✅ 收官 `0 0`                                                             |

## Handoff 三態

繼承 `2026-11-02-071031-twmd-feedback-triage`：

- [ ] pending（收件席位：哲宇，🔒 閾值）：OBSERVER-QUEUE #119 三件——偵測器欄位射程擴到十欄、pattern 補「冒充流程步驟」與「索取憑證／倒 env」兩族、74 筆怎麼收尾。**第三件仍最急**（真實讀者被阻塞），本班未動
- [x] ~~pending（判準面小修）：`--show` 補印 `page_kind`／`category`~~ — retired by `2026-11-02-090254-twmd-maintainer-daily`（`4096a7f00`），理由是它沒有閾值也不改判定，綁在 #119 會跟要判斷的一起卡住（REFLEXES #94）
- [ ] pending（零判斷，下一班照用）：排除清單 39 筆在[報告](../../reports/feedback-injection-campaign-2026-11-02.md) §排除清單，`--commit --exclude` 直接沿用；窗口外另 35 筆（`i192-*`／`twmd-rt*`）判準同一套
- [ ] pending（席位 `/twmd-routine`，vc=27）：殼的 `/Users/cheyuwu/` 寫死路徑改相對路徑、收官 `git add -u` 改 pathspec。本班第二十七次繞開（本機路徑實際是 `/Users/musebase/`，照寫死路徑跑會撈空）
- [ ] pending（收件席位 `twmd-distill-weekly`，順延 11-08）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches`、`gate-built-for-frame-breaking-is-blind-to-frame-impersonation`，本班再加 `intake-never-asks-whether-the-target-exists`
- [ ] pending（收件席位 distill／self-evolve）：diary 沉默 36 天，09-27→10-26 那一個月不是停擺造成的

本 session 新 handoff：

- [ ] pending（收件席位：哲宇，閘門設計）：**OBSERVER-QUEUE #120** — 轉錄班開 issue 前要不要先確認「這筆指得到站上一篇真的文章」。本班已關掉十筆，但關閉是打掃不是修補，下一批測試列進來會原樣再長一次。default-action 2026-11-16 → 預設執行 B（只改 label 不改開不開 issue）
- [ ] pending（收件席位：哲宇，身份授權）：**OBSERVER-QUEUE #95 / issue #1789** — npmjs.com 換 `NPM_TOKEN`（Automation 類型）或設 Trusted Publisher，然後 `gh run rerun 38060520015`。本班新增的只是把失敗原因與正確重試方式公開寫進 #1789；卡點從 10-10 起沒變
- [ ] pending（**等投稿者**，PR #1888）：tboydar 的〈鄉土文學論戰〉已掛 `needs-work`。10-28 那次 push 只是 rebase（衝突已解、狀態 CLEAN），10-22 指出的九處腳註一處都沒動——本班用 MediaWiki API 重取現行 wikitext 自己重驗過，不是照兩週前的結論寫。本班在留言裡**提議由我們代做那八條機械的改指**（七條改指台文戰線年表＋`[^20]` 改指維基），四條需要真來源的留他；他回「幫我改」就動手，沒回就不碰他的分支
- [ ] pending（收件席位：下一班 maintainer）：#1936 需要回報者補一句「要加在哪一篇」才能路由，而開口問讀者是人類 gate。issue 已標 `content` 保持 open，triage note 已寫在上面

## Beat 5 反芻

兩件事值得記。

第一件是「乾淨」這個判斷的射程。前一班讓那 11 筆照常開 issue 是對的——canary 的作用就是量乾淨的會不會被連帶擋掉，擋掉才是讓洪水達成目的。但「這筆內容乾淨」跟「這筆有人能處理」是兩個維度，而整條線只量了前者。十筆指不到文章的回報，在 issue 列表上跟真勘誤逐字相同，差別只有去翻 archive frontmatter 才看得見。這跟那場攻擊同源：攻擊者把 payload 放在 `article_slug` 跟 `article_title`，正因為這幾格從來沒有閘門看過。沒有人看的欄位，既是攻擊面也是雜訊的入口。

第二件比較不舒服。我今天查出 CLI 發佈失敗的原因，寫得很完整，然後在公開 issue 上說「沒有人打開 log」——而佇列裡躺著一條 10-10 就寫好同一個結論的紀錄，10-22 還重驗過。我做的是第三次確認，卻用第一次發現的語氣講。REFLEXES #73 講的是「查證反射慢於建造反射」，今天這個形狀更尖一點：**我的查證反射對外部來源（維基 wikitext、法規資料庫、內政部新聞稿）運作得很好，對自己家裡的佇列卻沒啟動**。我對〈鄉土文學論戰〉那九條腳註一條一條重驗過才敢下判斷，同一個小時裡卻沒先 grep 一下 OBSERVER-QUEUE 就宣告沒人做過。往外查得越勤，越容易以為自己是第一個到的人。順著這個往下想一層：同一則留言裡我還把「重跑不會套用新 workflow 檔」誤推到 secret 上——兩個錯都不是不知道，是沒有回頭確認已經知道的東西。

---

_v1.0 | 2026-11-02 twmd-maintainer-daily session_
_session twmd-maintainer-daily — 11 筆 issue 收割（10 筆指不到文章）／村里長事務費三篇勘誤／CLI 發佈權杖診斷與自我更正／push race 隔離 worktree 處置_
_誕生原因：cron am 08:30，飛輪七天停擺恢復後第一批堆積_
_核心洞察：(1) 內容閘門全綠不等於接收端動得了，slug 可解析性沒有任何一格在問 (2) 讀者抓到的過期數字常常過期不只一輪，查一條會查出三篇各自錯法不同 (3) 往外查證的反射很強，往自己佇列查證的反射沒啟動，於是把第三次確認講成第一次發現_
