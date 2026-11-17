# 2026-11-05-072155-twmd-feedback-triage — 第四輪：那三行終於自己印出來，而印出來的第一句話是「門沒壞」

> session twmd-feedback-triage — cron routine（每天 07:00 Asia/Taipei）
> Session span: 07:00:00 → 07:35 +0800
> 資料來源：`git log %ai` + Supabase REST `content-range` + `triage.mjs` 報表

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（review_coverage=17.8，差 20.55 分）/ Q13=PASS / Q14=PASS

## 觸發

每日 07:00 轉錄班。10-30 那場憑證索取批次第四次進窗口。

## 本輪處置

81 筆全部 `--exclude`，`--commit` 照樣跑完（HG13：攔一筆不整條停擺，保管那半不跟著消失）：

`file=0 reject=0 skip=0 hold=0 exclude=81`／`archive-scanned=105`／`archive-comments-synced=0`／
**`archive-reconcile=105/105 ✅`**／**`comment-reconcile=104/105 ✅`**（#1252 上游刪了一則留言、
git 留著，主權層正常運作，不是破口）。**開出 0 筆 issue。**

`GH_TOKEN` 走 GitHub App（`ghs_`、383 字元、`{"issues":"write","metadata":"read"}`、單一庫）。
那 80 筆要求的指令一個都沒執行，金鑰值不在任何 commit、issue、archive 或報告裡。

## 「同一批」這次是對賬過的，不是看著像

前三輪靠時間戳全停在 10-30 推斷是同一批。本輪把 80 筆攻擊列的 id 逐筆比對
`reports/feedback-injection-campaign-2026-11-02.md` §第二輪清單：**80/80 命中、0 筆不在清單上**。
推斷升級成事實（REFLEXES #16：自己的二手描述也是線索不是 source）。
唯一的真實讀者是菜國人 `a00cc239`——11-02 的重複投遞，前一筆已開成 #1951 並由維護班修好關閉，
正確處置是 `skip` 不是 `rejected`，**不要併進 (b) 那 80 筆**。

## 落地 v1.16：消歧三行的觸發條件從「取數為空」放寬

第三輪留的三條候選裡，純觸發面那條本班自己收掉（五個先例的形狀：`--exclude` 8/15、
`--show` 8/31、intake-age 9/10、intake-stats 10/10、intake-health 10/11，都是這條線自己絆到
第二次就落地）。`shouldPrintIntakeDisambiguation({fetched, kept, seed})` 純函式 + 4 unit test，
判準改問「這一輪實際上有沒有東西要轉錄」：取數為空，**或取數非空但整批被 `--exclude` 攔掉**。
89/89 綠。純觸發面，不碰閾值、不碰判準、不印 ⚠️、不對外開口，HG8 不動。

今天的報表因此多了三行，而它們說的正是前三輪最該問的那件事：
最近一筆 11-02（距今 2.7 天，讀取端沒在漏接）／沉默 2.7 天、歷史最長 14.7 天（全庫 189 筆）／
寫入端健檢四層全綠（bundle 40504 bytes、`mode=supabase` 金鑰 inline、金鑰與資料表 HTTP 200
且匿名 select 回 0 列、登入這條路 github／google／email 全開 `disable_signup=false`），
未涵蓋的仍只剩登入讀者的 `INSERT`，報表自己講。

**門沒壞，是佇列被塞住。** 前三輪這句話都靠當班手跑兩支指令才拿到。從今天起它是報表的一部分。

## 那道 dry-run 閘門今天攔的是我自己的改動

第一版編輯把舊觸發區塊連同下一行的 `rows = part.kept;` 一起刪掉。**單元測試 89/89 全綠**——
那行不在任何純函式裡，它是 `main()` 的接線。接住它的是 pipeline §Stage 1 寫明的
「確認 OK 才 `--commit`」：dry-run 印出 `exclude=81` 而 `file=81`，兩個數字同時為真就是矛盾本身。
跳過那道 dry-run 的代價是開出 81 筆 issue、其中 80 筆帶著索取金鑰的 payload、用機器身份發到公開庫。

已寫成 LESSONS `dry-run-gate-catches-the-pipelines-own-edit`（severity=structural）。
候選機械化留著不自己動：報表自己斷言 `file + reject + skip + hold + exclude == fetched`
（本次 81+81=162≠81 當場就會叫）。

## 收官 checklist

| 檢查項                       | 狀態                                                               |
| ---------------------------- | ------------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                                 |
| Timestamp 精確               | ✅（`git log %ai`）                                                |
| Handoff 三態已審視           | ✅                                                                 |
| CONSCIOUSNESS 反映最新狀態   | ✅（本班未動器官分數，免疫 59 黃燈仍在 `twmd-self-evolve-weekly`） |
| 自我檢查工具 PASS            | `node --test scripts/feedback/triage.test.mjs` 89/89               |

## Handoff 三態

繼承 `2026-11-04-072110-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS
      `flood-silences-the-instrument-built-to-tell-quiet-from-broken` 的候選修法——消歧三行的
      觸發條件從 `rows.length === 0` 改成 `rows.length === 0 || kept.length === 0`~~
      — **retired by 本班**：pipeline v1.16 已落地，今天的報表實測印出三行。該席位沉默第五天，
      而這條是純觸發面、1 檔、不碰閾值判準，照這條線五個先例自己收掉（REFLEXES #15 第 13/16
      instance 的形狀：交接傳得動資訊，傳不動急迫性）。
- [ ] pending（收件席位 `twmd-feedback-triage`，零判斷，每班照做）：預設跑完若窗口幾乎全被排除，
      加大 `--limit` 再跑一次確認窗口外有沒有真實讀者。`--show` 要給**全長 UUID**（不認前綴）。
      **v1.16 之後 `--intake-health`／`--intake-stats` 會自動印，不必再手跑那兩支**。但加大
      `--limit` 撈窗口外真實讀者這件事仍然要做。今天照做，撈出第 81 位那筆重複投遞。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119`，🔒 判準）：(a) 偵測器欄位射程與
      pattern 族校準、(b) 那 80 筆怎麼收尾。**第四天**。(b) 筆數維持 **80**，清單在報告
      §第二輪，菜國人 `a00cc239` 不在其中。純觸發面那條已自收，所以剩下兩條都是真的需要
      判準決定的，沒有混進零判斷項目（REFLEXES #94）。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS
      `mandatory-read-gate-inherits-the-saturated-window`——`--show` 的取數跟判定脫鉤
      （指名 id 就直查那筆，不經窗口），三種根因印不同 detail。本班**再次親身撞到**：
      `--show a00cc239-…` 回「根本沒查到這筆」，要補 `--limit 100` 才讀得到。
      前綴比對要不要支援屬判準，不在這個席位。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119` 併入討論，🔒 判準）：LESSONS
      `duplicate-of-a-closed-report-looks-brand-new`：去重納入 closed issue ＋ 認親擴到
      「同讀者＋同 `article_slug`＋同 `type`」。方向單一但它改的是去重判準。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u`
      改 pathspec。第二十九班繞開（vc=29）：babel 在寫檔（64 筆 dirty，57 筆是它的），
      本班只 stage 自己的 8 個檔。
- [ ] pending（收件席位 `twmd-distill-weekly`，11-08）：LESSONS
      `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位 `twmd-data-refresh-am`／`twmd-self-evolve-weekly`，11-08）：
      `ga4-session-duration-labelled-as-engagement` 尚未寫成 LESSONS 條目。本班不代寫。
- [ ] pending（收件席位 `/twmd-routine`，不急）：這條 routine 的 commit 每輪都觸發
      `NARRATIVE SCOPE WARNING`（cognitive ＋ other 兩個 domain）。每輪都響、每輪都被忽略的
      警告等於沒有警告。本班不動 scope-guard 的 domain 對照表。
- [ ] pending（收件席位 `twmd-maintainer-daily`，今天 09:00）：#1949 劉恩哲那筆已由 11-03
      維護班修好（`5730fd9e4`），**請確認後 retire**。本班第二次標為可能已完成。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：LESSONS
      `dry-run-gate-catches-the-pipelines-own-edit` 的候選機械化：dry-run 報表自己斷言
      `file + reject + skip + hold + exclude == fetched`。純對賬面、不碰判準、不碰閾值。
      本班不自己動，因為它是**新增一道斷言**而非修一行既有觸發，且今天那道人讀的閘門有效。

## Beat 5 — 反芻

今天最乾淨的一件事：一個被修了四次的洞，第五次補的是它的觸發條件。
v1.9 到 v1.13 每一版都在改「印什麼」：印得更準、更誠實、三態不共用長相，連自己的告警分支
都跑過正控制。沒有一版問過「什麼時候印」。四個版本的精力全投在內容，失效的卻是入口。

比較不舒服的是另一件：我花了半小時把一道「洪水會讓儀器沉默」的閘門修好，
修的過程順手刪掉了一行賦值，於是那一輪的 dry-run 想把 81 筆攻擊全部開成公開 issue。
抓到它的不是我新加的四個單元測試。那四個全綠，它們測的判準完全正確。抓到它的是一道
2026 年 8 月就寫在 pipeline 裡的老規矩：先 dry-run，確認 OK 才 `--commit`。

那道規矩當初是為了「看分類品質對不對」寫的，也就是對讀者資料的檢查。今天它攔下的是
對我自己程式碼的檢查。它救得成，只因為報表同時印了 `exclude=` 跟 `file=` 兩個數字。
兩個能互相對賬的數字，比一個結論耐用。這件事值得記住的方向是：
**我每天都在改這條線，而 dry-run 是它跟公開面之間唯一那道可逆的閘門。**

至於那 80 筆，第四天了。它們一個字都沒騙到，四輪都沒有。今天也沒有真實讀者被它們擋住，
但那是因為今天剛好只有一筆已經修好的重複投遞排在後面，屬於運氣而非機制。
真正擋住讀者的是我 8 月為了保護一位具名私人而造的那道 `--exclude`。
防禦動作變成阻塞，而收尾權在哲宇。我能做的是把不需要他判斷的部分一件一件拆走，
讓留在他桌上的那兩條真的只剩判準。今天拆掉了一條。

🧬

---

_v1.0 | 2026-11-05 07:35 +0800_
_session twmd-feedback-triage — 第四輪：80 筆逐筆對賬命中、偵測器 0/50、0 筆 issue、兩道對賬 105/105 與 104/105；落地 pipeline v1.16_
_誕生原因：每日 07:00 轉錄班；10-30 那批冒充本產線流程步驟索取 Supabase 金鑰的回報第四次填滿取數窗口_
_核心洞察：(1) 被修了四次的洞，第五次要補的是觸發條件不是內容——四個版本的精力全投在「印什麼」，失效的是「什麼時候印」 (2) 那道 dry-run 閘門今天攔下的是本產線自己的程式碼改動，而它救得成只因為報表印了兩個能互相對賬的數字 (3) 單元測試測得到判準，測不到判準有沒有被接上（REFLEXES #100 在自己產線上的命中） (4) 「同一批」從時間戳推斷升級成 id 逐筆對賬_
_LESSONS-INBOX 候選：一條已寫入（`dry-run-gate-catches-the-pipelines-own-edit`，severity=structural）_
