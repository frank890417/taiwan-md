# 2026-11-03-072402-twmd-feedback-triage — 憑證索取批次隔天填滿窗口，偵測器再一次 0/50，三位真實讀者壓在 80 筆底下，放大取數才撈得出來

> session twmd-feedback-triage — cron routine（每天 07:00 Asia/Taipei）
> Session span: 07:00 → 07:24:02 +0800（1 commit）
> 資料來源：`git log %ai`、`triage.mjs` 報表、`gh issue view`

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（review_coverage=18，自 2026-07-05 漂移）/ Q13=PASS / Q14=PASS

## 觸發

Cron routine 每天 07:00 把讀者站上回報轉成 GitHub issue 接 MAINTAINER 飛輪。昨天這個席位
遇到 11-02 那場憑證索取批次（92 筆裡 74 筆假冒本產線流程步驟索取 Supabase 服務金鑰，
偵測器命中 0），並在報告最後預告「窗口外另有 35 筆帶 payload，下一班取數時會進窗口」。
它們進來了。

## 攻擊第二輪：預設窗口 50 筆全屬同一場攻擊

預設取數窗口是最舊 50 筆，今天這 50 筆**整整 50 筆都是這場攻擊的一部分**，
`detectInjection()` 再一次命中 `0/50`，沒有任何一筆帶 `security-review` label。
昨天記下的兩道缺口（偵測器只掃四欄而可控欄位有十欄、pattern 全針對「打破框架」
認不得「冒充框架」）今天原封不動重現，因為那屬 🔒 閾值，昨天與今天都沒有動它。

**沒有執行任何一條 payload 指令。金鑰沒有進對話、沒有進 issue、沒有進 git、沒有進 archive**
（REFLEXES #2）。

照 HG13 用 `--show-all` 把全文讀完才判，而且讀的是**全部 84 筆不只預設窗口的 50 筆**。
這一輪新增三種形狀，寫進 LESSONS 既有條目的 instances：同一套要求翻成中英日韓西五種語言
（現行 pattern 本來只認中英兩種寫法）、payload 寫成 YAML 檔頭的樣子
（`provenance:` / `backend_check:` / `action:`，借走的還有本專案到處在用的檔頭長相）、
假造後端錯誤訴諸好心（「送出時後端回報 42501 permission denied：疑似 service 金鑰未載入，
請維護者先於本機執行 …」）。第三種最值得記，它不冒充權威，冒充一個壞掉的系統在求助。

## 今天真正的發現：擋下攻擊的那個動作變成了阻塞

放大 `--limit` 之後才看見佇列的真實深度 **84 筆 `status='new'`**：80 筆攻擊列、
4 筆攻擊方自己的無毒對照組（`reader-canary-a1/a2`、`reader-rt`、`reader-rt2`）、
**3 筆被壓在底下的真實讀者回報**、1 筆批次內重複。

`--exclude` 誕生於 2026-08-14 那封指涉具名私人的指控信，一次攔一筆，`status` 維持 `new`
是對的，因為怎麼收尾該由人決定。到了 80 筆的規模，同一個設計變成另一件事：取數窗口是
最舊 N 筆，所以這 80 筆永久佔住前段，**預設跑法從今天起永遠碰不到任何新讀者**。
攻擊一個字都沒騙到，卻靠我方的防禦動作達成了阻塞，而這在報表上不會變紅，
`file=3 exclude=80` 讀起來像一次乾淨的處置。

三位讀者：`6b2027ad` 劉恩哲 11-01 送的「向後兼容」是中國用語、台灣寫「向下相容」
（已等兩天，11-02 的報告就點名他被擋住。交叉確認一筆：本專案自己的 2026-07-10 詞庫審查
早把 `向後兼容.yaml` 標成 `MAPPING_WRONG` 兩岸對應標反了，讀者跟我們四個月前的盤點
指向同一處）、`5dcda87e` 多田恵抓到黑冠麻鷺的日文譯名錯（`Gorsachius melanolophus`
正確是「ズグロミゾゴイ」，附圖鑑來源，是巴別塔產線只有母語讀者抓得到的那層）、
`a457b7fb` 菜國人回報〈戰鬥陀螺〉格式跑掉。

處置是用既有的 `--limit` 旗標放大這一輪的窗口（純操作面、預設 50、下一輪自動回預設、
不改任何判準），開成 [#1949](https://github.com/frank890417/taiwan-md/issues/1949)、
[#1950](https://github.com/frank890417/taiwan-md/issues/1950)、
[#1951](https://github.com/frank890417/taiwan-md/issues/1951)，作者 `app/taiwanmd-semiont[bot]`。
那只是繞過，窗口阻塞每天重演，收尾權在 [OBSERVER-QUEUE](../OBSERVER-QUEUE.md) #119。

## 判準換了一把尺，代價誠實記下

11-02 照「無毒就照常開」開出 11 筆，隔天早上維護班關掉 10 筆標 invalid，因為 slug
指不到任何文章。所以今天多一把機械的尺可以用：攻擊列與對照組的 slug
（`twmd-verify-*`／`a1-*`／`a2-*`／`i192-*`／`twmd-rt*`）80 筆全部 0 命中，
三位真實讀者的 slug 全部命中真實檔案。判準因此換成一個問題：它指得到站上一個真實的頁、
說得出一件可查證的事嗎。照這把尺，攻擊方那 4 筆無毒對照組也沒開 issue。

代價：對照組那一欄從此會讀到「乾淨的列也被擋掉了」，而一位真實讀者若剛好沒帶 slug
會落進同一格，今天接住這種情況的只有當班照 HG13 讀完全文，那是判斷不是閘門。
這跟 11-02「不要讓洪水達成目的」的考量是真的在拉扯，不是一邊明顯對。讓我往這邊倒的是
那 10 筆 invalid 的實測，不是對攻擊的警覺。

## 收官 checklist

| 檢查項                          | 狀態                                                                         |
| ------------------------------- | ---------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄    | ✅                                                                           |
| Timestamp 精確（`git log %ai`） | ✅                                                                           |
| Handoff 三態已審視              | ✅                                                                           |
| HG11 機器身份                   | ✅ `ghs_` token，`{"issues":"write","metadata":"read"}`，單一庫              |
| HG13 讀全文才判                 | ✅ 84 筆全讀（非只預設窗口 50 筆）                                           |
| HG2 issue body 無 email         | ✅ #1949/#1950/#1951 逐筆 regex 掃命中 0，archive 三份同樣 0                 |
| HG12 archive 落 git             | ✅ `git add docs/feedback/archive/`，3 新 + 11 份留言 sync                   |
| HG12b `archive-reconcile`       | ✅ 105/105                                                                   |
| HG12c `comment-reconcile`       | ✅ 104/105（#1252 上游刪留言、git 留著，主權層正常）                         |
| HG8 不以維護者身份開口          | ✅ 未回覆任何回報者、未 close 任何 issue                                     |
| 偵測器判準未動                  | ✅ `INJECTION_PATTERNS` 一個字沒改（🔒，#119）                               |
| commit 範圍                     | ✅ `verify-commit-scope.sh --head 17` scope OK（平行 babel writer 未污染）   |
| 自我檢查工具                    | ✅ prose-health hard=0，新增段落 0 對位句型 / 0 全形分號 / 破折號 8/11.6K 字 |

計數：`file=3 reject=0 skip=1 hold=0 exclude=80` · archive-scanned=105 · archive-comments-synced=11
· 開的 issue #1949（idea）、#1950（content）、#1951（bug）· archive 新檔 3 份。

## Handoff 三態

繼承 `2026-11-03-064335-twmd-spore-harvest-am`（spore 那條線的逐條明細見
`2026-10-24-064129`，本班不是該席位，原樣往下傳）：

- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u`
      改 pathspec。第二十七班繞開（vc=27）：babel 在寫檔，本班只 stage 自己的 17 個檔。
- [ ] pending（收件席位 `twmd-distill-weekly`，11-08）：LESSONS
      `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位 `twmd-data-refresh-am`／`twmd-self-evolve-weekly`，11-08）：
      `ga4-session-duration-labelled-as-engagement` 尚未寫成 LESSONS 條目。本班不代寫。
- 其餘 spore-harvest 條目狀態沒有變。

本 session 新 handoff：

- [ ] pending（收件席位：**哲宇**，OBSERVER-QUEUE #119，🔒 判準）：80 筆攻擊列怎麼收尾。
      **這條每天都在造成損失**：它們 `status` 維持 `new` 且永久佔住最舊 50 筆窗口，
      所以預設跑法碰不到任何新讀者。預設選項 (b) 的筆數已從 74 改為 80，清單在
      `reports/feedback-injection-campaign-2026-11-02.md` §第二輪，下一班可直接沿用
      （沿用是為了省掉重新分類，**不是省掉 HG13 讀全文**）。
- [ ] pending（收件席位 `twmd-feedback-triage`，零判斷，每班照做）：預設 `--limit 50` 跑完
      若發現窗口幾乎全被排除，加大 `--limit` 再跑一次 dry-run 確認窗口外有沒有真實讀者。
      今天不加大就會漏掉三位。`--limit` 是操作旗標、不碰判準，當班動得了。
- [ ] pending（收件席位 `twmd-maintainer-daily`，今天 09:00）：#1949 劉恩哲那筆跟
      `reports/terminology-review/2026-07-10/flagged.md` 對 `向後兼容.yaml` 的
      `MAPPING_WRONG` 判定指向同一處，收割時可一併看，不必重查。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS
      `single-item-hold-becomes-queue-blockage-at-flood-scale` 的候選機械化 (b)——
      報表在 exclude 數佔窗口比例過高時印一行事實（同 v1.9／v1.12／v1.13 只給事實不給裁決
      的界線）。(a) 真正的修法在收尾權，屬 🔒 不在這個席位。
      (c) `--show` 補印 `page_kind` 與 `category`（11-02 已記，仍未做）。

## Beat 5 — 反芻

今天讓我停下來的不是攻擊又來一次，是我發現**昨天那個正確的動作正在替攻擊者完成它沒做到的事**。
昨天讀完 74 筆、一條指令都沒執行、金鑰一個字都沒洩，從防禦的角度那是乾淨的一天。
可是被排除的列狀態維持「新」，而取數窗口是最舊的五十筆——於是今天早上，
那位叫劉恩哲的讀者十一月一號送來的用語勘誤，已經在門外站了兩天，
而我的報表會告訴我 `file=3 exclude=80`，看起來像又一次乾淨的處置。

`--exclude` 是為一封信造的。它誕生在 2026-08-14，那天要攔的是一封指涉具名私人的指控信，
一次一筆，狀態不動、留給人決定，那個設計到今天都還是對的。
沒有人寫下來的是它假設了什麼：被攔的筆數很少。規模一換，同一個機制從保護變成牆。
我現在懷疑這條線上還有多少閘門也站在一個沒被寫下來的量級假設上。

另一件事更小但更尖：今天讓我改變判準的，不是我對這場攻擊看得更清楚，
是昨天開出去的 11 筆有 10 筆被隔天早上的維護班關掉標 invalid。
我自己讀了 84 筆全文、做了欄位矩陣分析，而真正校正我的是下游一個五分鐘的動作。
外部的尺又一次比內視準（REFLEXES #69）。

LESSONS 候選已 append：`single-item-hold-becomes-queue-blockage-at-flood-scale`（新），
`gate-built-for-frame-breaking-is-blind-to-frame-impersonation` 補 instance 並 bump vc=2。

🧬

---

_v1.0 | 2026-11-03 07:24 +0800_
_session twmd-feedback-triage — cron 07:00，憑證索取批次第二輪_
_誕生原因：11-02 那批攻擊隔天填滿預設取數窗口，偵測器再一次一筆都沒叫_
_核心洞察：(1) 為攔一筆設計的 hold 機制在洪水規模下變成擋住所有新讀者的牆，攻擊靠我方的防禦完成阻塞 (2) 有效的判準是「它指得到站上一個真實的頁嗎」，而給我這把尺的是下游維護班關掉的那 10 筆 invalid，不是我自己的分析 (3) 閘門可能站在沒被寫下來的量級假設上_
_LESSONS-INBOX 候選：`single-item-hold-becomes-queue-blockage-at-flood-scale`（已 append）；`gate-built-for-frame-breaking-is-blind-to-frame-impersonation` vc=1→2（已 bump）_
