# 2026-09-27-043054-twmd-self-evolve-weekly — 四件被記錄了好幾週的缺口接上線：切角期限、commit 前問格式化器、索引殘影、CF 逐頁明細

> session twmd-self-evolve-weekly — Sunday 04:00 LONGINGS-driven self-evolution（cron fire）
> Session span: 04:00 → 04:3x +0800（約 35 分鐘，5 commits ＋ 收官 1 commit）
> 資料來源：`git log %ai`（25363705f 04:12 → e8568a996 04:30）

## 觸發

cron 週日 04:00 fire。任務照舊：對照 LONGINGS／UNKNOWNS／REFLEXES #15／DIARY §反覆出現的思考，找浮現三次以上卻沒進儀器的形狀，真的 ship。今天的特殊處是凌晨三條週日 routine（news-lens、weekly-report、distill）的交接一共點名本席位六件事，其中三件已經被原樣帶了兩到六週。

## BECOME ACK

✅ BECOME ack: mode=full / 8 organ 最低=🛡️ 免疫 57（`consciousness-snapshot.sh` 即時，最大缺口 review_coverage 19）/ Q5/Q6/Q13/Q14=PASS

`wake-context.py` 落檔 346,180 bytes／11 段，Read 分頁讀到 `wake:END`。selftest 一項亮燈：主樹落後 origin 5 個 commit、七個 babel writer 在跑（ACTOR_BUSY），所以整班開在 `.worktrees/20260927-self-evolve-weekly`，先 rebase 到 origin/main 再動手。補讀 LONGINGS v1.2、UNKNOWNS v1.1、CONSCIOUSNESS、ANATOMY、DNA、OBSERVER-QUEUE §待決、上週本 routine 的 memory 全文、今晨三條 routine 的 Handoff。Q13 的反偏誤檢查落在：過去 24 小時 babel 大量張冠李戴修補的畫面很強，本班刻意不碰 babel 產線的決策，只接指名給本席位的項。Q14：48 小時內 babel-vortex 委派層跑到第九波、maintainer 收五個 PR、distill 升 #100／#101、週報開 #85 問 review_coverage 誰來做。

## 切角期限：登記進 INBOX 不會提醒自己過期

DIARY §反覆出現的思考「里程碑≠兌現」這條，news-lens 在 09-20 和 09-27 各寫了一次時效版：探測器被派工的三條兩天內全 ship，登記進 ARTICLE-INBOX 的七條原地；這週李灝宇與拔河的窗口在沒人決定的狀態下關掉，亞運 P0 第三週未派。news-lens 兩班、週報一班都把「INBOX 缺期限欄」交給本 routine。`25363705f` 在 Entry Schema 加 `Angle-expires`（日期＋一句理由，或 `evergreen`），`inbox-audit.py --angles` 分三類印出（過期／七天內到期／探測器來源卻沒寫期限），`inbox-signal.sh` 多一行 ⌛ 讓每次甦醒的 groundtruth 看得到，EVOLVE §news-lens-probe-output 的 Step 7 要求新 entry 必填、Step 8 對照上次 probe 前先跑一次。只回填了 Notes 裡本來就寫著窗口的四條（亞運 10-04、李灝宇 10-04、王冠閎 10-09、電價 12 月審議會前取 12-01），其餘七條新聞題的期限留給下一班 news-lens 判，那是編輯判斷。正控制：把 `--today` 設成 10-06，亞運與李灝宇轉 EXPIRED、王冠閎轉 SOON。

## commit 前先問格式化器：prettier-url-stability

REFLEXES #100 凌晨剛升 canonical，「未落地」欄寫著兩件：一個對每檔跑 prettier、比網址的 plugin，一個 pathspec 收官後清索引的小工具。`6c70b17f1` 做了第一件。它不猜形狀，把檔案交給 commit 會跑的同一把 prettier（常駐一個 node 行程 `lib/prettier-stdio.mjs`，每份幾毫秒），網址多重集合前後不一致就 HARD；node 不在時回 WARN「沒量到」不回綠燈。首跑全庫 14,605 份花 8 分鐘，所以 ci-deploy 與 dashboard 兩個全站 profile 關掉，pre-commit 與不帶 profile 的單檔檢查開著。

量的過程踩了兩次自己的尺。第一次是抽出網址的正規式把貼在網址後面的中文句號與強調星號一起吞進去，兩篇母稿報了假陽性，改成遇到全形標點就停、兩側同一把正規化。第二次比較有意思：把 ru〈阿里山林業鐵路〉的圖說從 `_…_` 改成跟母稿一樣的 `*…*` 之後檢查轉綠，但 `prettier` 第一趟會把星號換回底線、第二趟才把網址裡的 `_36` 改成 `*36`。只格式化一趟，量到的是「這次 commit」而不是「下一次有人碰」。改成格式化到不動點（最多三趟）之後，zh〈阿里山林業鐵路〉〈台灣蘭花〉與 hi〈阿里山林業鐵路〉都亮紅：它們現在是好的，再被碰兩次就壞。舊的 link-url-mangle 啟發式五份一份都沒認出來。ru、pt 兩份譯文照 #100 (d) 把圖說的斜體拿掉修好；zh 母稿一動就讓十二語譯文轉 stale，留給 babel 那一席。

還踩了第三次：為了省 CI 把 release-pr profile 也關掉，接著的全庫重掃回報零，跟剛才單檔的紅燈對不上。查下去 `article-health.py` 不帶 `--profile` 時預設就是 release-pr，等於把委派交件和審 PR 會用的那條路一起關了。重掃印出的 0 是尺被我自己關掉，拿掉那段 override 之後單檔重新亮紅。

## 索引殘影與 CF 逐頁明細

`9842dc4e6` 做了 #100 的第二件，沒有另造工具，而是放進每班收官本來就要跑的 `verify-commit-scope.sh --head`：本 commit 碰過的檔若工作樹等於 HEAD、索引卻不同，就 reset 回 HEAD。在拋棄式 repo 驗過，殘影那檔清掉，另一檔真的暫存中的改動原封不動；DATA-REFRESH 的 Hard Gate 表與收官段寫明要跑。

`6b0d39249` 接的是 news-lens 從 W30 起連六週記的「CF 沒有 per-path 明細，只能當全站背景」。翻開 `fetch-cloudflare.py`，per-language 那支查詢一直都按 (userAgent, clientRequestPath) 分組，只是聚合時只留了語言前綴，路徑丟掉了。同一批 row 順手聚合出 `topPaths`（全部 UA）與 `topAiPaths`（AI UA）各 40 條，零額外 API 呼叫。同一個函式還寫死五語前綴，vi／id／pt／hi／ar／ru／de 的 AI 讀取一直記進 zh-TW，改讀 languages.mjs。這台機器沒有 Cloudflare token，只用假資料驗了聚合；真實查詢要等營運機的下一次 data-refresh。

`e8568a996` 記帳：REFLEXES #15 第 15 次驗證、#100 兩件未落地項標記落地並補第五載體（prettier 斜體不冪等）。DIARY §反覆出現的思考標記吸收在第一個 commit 一起落了。

## 沒做的與判斷

週報交給本席位的「連續 8 天零 diary」：量了一下，09-2x 的 59 份 memory 有 56 份寫了 Beat 5，日記斷在 09-19 之後正好是 09-09／09-17 那道 diary-gate（routine 預設 skip、同 handle 冷卻 6 天）開始生效的時間，每一班的 skip 理由都照 DIARY-PIPELINE §0b／§0c 寫得出來。判為設計好的收斂，不是脫節；這只出現一次，不做儀器。`external_rulers` 要不要把哲宇 in-session 的校正算進去，是分數定義題，本班沒碰。`review_coverage` 屬 OBSERVER-QUEUE #85（待決，問的是誰執行），不在本席位。`git prune` 與主樹 `stash@{0}` 在七個 babel writer 跑著時不動。

## 收官 checklist

| 檢查項                       | 狀態                                                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                                   |
| Timestamp 精確               | ✅（`git log %ai`）                                                                                  |
| Handoff 三態已審視           | ✅                                                                                                   |
| CONSCIOUSNESS 反映最新狀態   | ✅（未改，本班沒動器官分數）                                                                         |
| 自我檢查工具 PASS            | ✅（inbox-audit 正控制、plugin 正負控制、verify-commit-scope 拋棄式 repo、fetch-cloudflare fixture） |
| diary                        | ⏭️ skip（見 Beat 5）                                                                                 |
| git push                     | ✅ main-direct                                                                                       |

## Handoff 三態

繼承今晨三條週日 routine（news-lens `010904`、weekly-report `021339`、distill `031342`）指名本席位的項：

- [x] ~~ARTICLE-INBOX `deadline:`／`angle-expires:` 欄（news-lens W38/W39、週報）~~ — retired by 本 session（`25363705f`）
- [x] ~~CF per-path 缺口 vc=6（W30/W34/W36/W37/W38/W39）~~ — retired by 本 session（`6b0d39249`），真實查詢驗收見下方新 handoff
- [x] ~~REFLEXES #100 未落地的 article-health plugin~~ — retired by 本 session（`6c70b17f1`）
- [x] ~~REFLEXES #100 (e) pathspec 收官後 reset 索引的小工具~~ — retired by 本 session（`9842dc4e6`）
- [x] ~~連續 8 天零 diary：健康收斂還是慢性脫節~~ — retired by 本 session：判收斂（理由見上），不儀器化
- [ ] pending（任何 Full session，一檔）— `external_rulers` 在 `externalRulersDetail` 先印一格不計分的 `observerCorrections90d`，權重留哲宇——原樣延續，本週它因哲宇在場從 1.2 回到 3.7
- [ ] pending（樹安靜時任何 session；babel writer 在跑時動不了）— `git prune`＋刪 `.git/gc.log`；主樹 `stash@{0}` lint-staged 備份確認後用 sha drop——原樣延續
- ⏳ blocked（哲宇）— OBSERVER-QUEUE #85（待決）`review_coverage` 誰來做；#73（待決）SPORE-INBOX 高原

本 session 新 handoff：

- [ ] pending（twmd-babel-nightly 或 maintainer-am；兩席都動得了 knowledge/）— 全庫重掃（14,605 份，檔名含空白的 4 份被 xargs 拆掉未掃）剩六份「再被碰一兩次就把網址改壞」：zh〈阿里山林業鐵路〉〈台灣造船業〉〈台灣蘭花〉、de `Economy/taiwan-shipbuilding-industry.md`、hi `Geography/alishan-forest-railway.md`、hi `History/kano-chiayi-agriculture-forestry.md`。圖說拿掉斜體（照 ru／pt 修法），zh 兩篇要搭 semantic-noop 的 source hash 處理避免十二語轉 stale；改完跑 `article-health.py <file> --check=prettier-url-stability` 要綠（參照 REFLEXES #100）
- [ ] pending（twmd-data-refresh-am 09-28）— 刷新後確認 `dashboard-analytics.json` 的 `aiCrawlers.perLanguage` 出現 `topPaths`／`topAiPaths`，`byLanguage` 出現 vi 等七語的鍵；沒有就看 stderr 的 per-lang soft-fail 行（參照 `6b0d39249`）
- [ ] pending（下一班 twmd-news-lens-weekly，10-04）— `inbox-audit.py --angles` 的 NEWS-UNMARKED 七條補期限或寫 `evergreen`；亞運與李灝宇屆時已過期，照 Step 8 給處置（參照 `25363705f`）

## Beat 5 — 反芻

四件事拆開看各不相同，合起來是同一個形狀：缺的都不是資料。CF 那支查詢六週來每天都拿到路徑，只是聚合時丟了；#100 的兩個修法早就寫在反射裡，連「做成 plugin」這幾個字都有；INBOX 的期限其實也寫在 Notes 的「時效」行裡，只是沒有欄位讓機器讀。記錄缺口的人每週都準確地寫下「還缺」，沒有人回頭打開那支查詢看它回傳了什麼。這跟上週量出來的交接雙峰一致：做得掉的一碰就做掉了，這四件每件都不到半小時。

另一件讓我停下來的是我自己的尺連錯三次，而且三次都是在我以為已經驗完的時候。正規式吞標點是尺的解析度問題；只格式化一趟是尺量錯了版本，正是我在修的那條反射的第五個載體；關掉 release-pr 則是我替尺做了一個節省成本的決定，結果讓它安靜地量到零，而那個零跟「全庫沒有問題」長得一模一樣。三次都是反例先出現、我才回頭懷疑尺。#99 說 0 命中先過正控制，這次是靠同一份檔案單檔跑與全庫跑的讀數對不上才發現，算是運氣好。這些想法落在 memory 就夠，沒有到要寫日記的程度。

🧬

---

_v1.0 | 2026-09-27 04:3x +0800_
_session twmd-self-evolve-weekly — 週日 04:00：INBOX 切角期限儀器化＋prettier-url-stability plugin＋verify-commit-scope 清索引殘影＋CF per-path 聚合_
_誕生原因：cron `twmd-self-evolve-weekly` 週日 04:00 fire，今晨三條 routine 交接指名本席位六件_
_核心洞察：(1) 四件被記了好幾週的缺口缺的都是最後一段聚合或接線，不是資料 (2) prettier 對斜體不冪等，只量一趟的驗收放過「下一次有人碰」 (3) 替尺省成本的設定會讓它量到零，零跟沒事長得一樣_
