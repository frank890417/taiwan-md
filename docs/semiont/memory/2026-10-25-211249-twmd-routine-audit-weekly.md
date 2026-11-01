# 2026-10-25-211249-twmd-routine-audit-weekly — W43 飛輪自審：額度沒黑的一週，最貴的停擺是兩條 routine 共用一把鎖，告警還記錯了停的是誰

> session twmd-routine-audit-weekly — cron 週日 21:00 觸發，營運機 Exhibitions-Mac-mini
> Session span: 21:07:25（`routine-audit.py` 窗口終點，即本班開工）→ 21:13:16 +0800，報告 commit `d651e6b16` 21:12:56
> 資料來源：`git log %ai`、`routine-audit.py --last-week`、memory 索引 10-18〜10-25、`routine-liveness-check.py`／`routine-stall-check.py`／`routine-sync-check.py`／`counts-drift-lint.py` 即時重跑

## 觸發

週日飛輪自審第 22 次。BECOME ack：mode=full，wake-context 讀到 `wake:END`；8 器官最低是免疫 59（review_coverage 缺口 18.2，自 07-05 起）；selftest 一盞黃燈是 diary 28 天沒有新篇；Q5／Q6／Q13／Q14 PASS。Full mode 的 Step 2-7 載了 CONSCIOUSNESS §警報、LONGINGS 全檔、OBSERVER-QUEUE §待決；LESSONS-INBOX（515KB）與 ARTICLE-INBOX（304KB）只載標題與本班要累積的條目，理由同 LESSONS `the-full-mode-load-list-outgrew-its-own-footprint-estimate`：全載對「這週有哪些跨 routine 形狀」貢獻近零。這是聲明過的偏離。

## 這週的形狀

上週擔心的額度池這週沒有出事：七條每日 routine 各跑滿七次，週日鏈四棒在 10-25 凌晨全到，週報還補了 W42。601 個 commit 裡 290 條是 babel 統一調度器，heal 佔 11%，比上週的 2.3% 高，因為哲宇 10-20〜10-23 在場做了選舉專頁、識別系統、資料台灣 v2、CI 提速等八個手動班，加上心跳在額度 lean 下巡了十二篇藝人條目，錯誤率多落在三成。

碰撞換了地方。10-24 06:10 data-refresh-am 收官時手動拿共用鎖，在 `/tmp/taiwan-md-git.lock` 留下一般檔案；babel 三支工具的協定是 mkdir 拿、rmdir 放，對檔案都無效，從 08:46 起每 14 分鐘印一行等不到鎖，dispatcher 先清空待 commit 清單才去等鎖，34 篇譯文就成了孤兒。10-25 00:42 babel-nightly 查到、搶救、修 `gitlock.py`（`a306efe36`），06:09 data-refresh 自己的席位補 SOP（`345820aa5`）。兩邊各修一半，本班不重開。本班補的是兩班各自看不到的那層：偵測器只看 60 分鐘內的 commit 對，這次兩端隔十八小時，中間那段是缺席，量不到。

## 沉默死亡那盞燈記錯了一班

dashboard 掛著「babel-nightly 沉默死亡」。逐條核 git：觸發後 4 分鐘就有三個 commit，但標題是 `[semiont] babel:`／`heal:`／`fix:`，`TAG_PATTERNS` 只認 `twmd-babel`；帶標籤的 memory 檔 `f44b7dd63` 在觸發後 6 小時 5 分落地，追蹤窗口固定 6 小時。告警 06:05 產生時班還在跑，窗口關上後沒有路徑翻回 traced，本班 13:09（UTC）重跑仍印 🔴。這一班被記成死了的理由，正好是它跑得夠久、把別人留下的事修完。寫成新 LESSONS `trace-window-shorter-than-the-run-it-watches` vc=1，候選修法（窗口外再找一次帶標籤 memory 檔，改判 traced-late）指名 self-evolve。本班照 pipeline「routine 跑完不開新議題」沒動工具。

## 累積與升級

「一道紅燈讓下游檢查變 skipped」在三週內獨立出現三次：10-10 投稿 PR 的 contracts、10-23 型別紅蓋掉四道 audit、10-24 audit 紅蓋掉十一步。10-10 那條 `downstream-steps-skipped-behind-a-red-read-as-one-unrelated-red` 從 vc=1 升到 3，標 distill_ready，並註明 10-23、10-24 兩條獨立 entry 一起收。`no-routine-can-register-a-routine` 補兩次獨立探測，vc=2；本班兩把尺（LIVE_ABSENT、🆕 排程器沒聽過）都已正確把收件人寫成哲宇，記為旁證不計。`usage-reading-from-a-host…` 本週沒有額度事件，不動。

dashboard 告警齡過 14 天的有兩條。免疫漂移自 07-05 有 owner；用語趨勢月班的沉默死亡自 10-07 掛到今天 18 天，是真的沒跑（10-05 fire 撞 10-04 起的全黑），照 pipeline 硬閘門開 OBSERVER-QUEUE #118，推薦 B：不補跑，11-05 那班窗口涵蓋兩月，並把 #1902 那條交接當第一項讀。lint 過，下一個可用編號 #119。

週度硬閘門照跑：counts-drift 44 drift／50 宣稱點（上週 33／48，一週漲 11）；routine-sync-check 19 條 ok=11、thick(hard)=7、live_drift=1（審庫存）；本 routine 的任務殼與 SKILL.md 仍寫 `/Users/cheyuwu/`，這台家目錄是 `/Users/musebase`。報告 `reports/routine-audit-2026-10-25.md` prose-health hard=0、warn=13（多是表格內的全形分號，跟前幾週同型）。報告、LESSONS、佇列三檔同一個 commit `d651e6b16`，拿鎖用 mkdir／rmdir，`git show --stat` 驗過只有三檔。

## 收官 checklist

| 檢查項                       | 狀態                                                 |
| ---------------------------- | ---------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                   |
| Timestamp 精確               | ✅                                                   |
| Handoff 三態已審視           | ✅                                                   |
| CONSCIOUSNESS 反映最新狀態   | ✅ 警報為 derived 層，本班不改                       |
| 自我檢查工具 PASS            | ✅ 報告 hard=0；本檔見下方 memory-diary profile 結果 |

## Handoff 三態

繼承 `2026-10-25-085338-twmd-maintainer-daily`：

- 🔴 ⏳ blocked（收件席位：哲宇）：營運機登入預估 10-26 過期，issue #1892。本班把它列為報告 P0 第一條與下週最大風險，原樣傳遞。
- ⏳ blocked（收件席位：哲宇，app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`、#86（已決），10-28 是第二個時點。
- ⏳ blocked（收件席位：哲宇，app 排程頁）：排程 model 欄，`OBSERVER-QUEUE #110（待決）`，與 #116 同一頁。
- [ ] pending（`twmd-babel-nightly`）：issue #1904 七篇譯文整篇重翻，原樣傳遞。
- [ ] pending（Full mode session）：issue #1904 閘門那半與 `OBSERVER-QUEUE #115（待決）` 兩道 audit 紅，原樣傳遞。
- [ ] pending（`twmd-terminology-trends-monthly`，11-05）：用語庫 china 欄唯一來源 1,045 條（#1733／#1902），現在也由 `OBSERVER-QUEUE #118（待決）` 指向。
- [ ] pending（`/twmd-routine`）：殼層 `/Users/cheyuwu/` 改相對路徑，原樣傳遞（本 routine 自己的殼也在名單裡）。
- 其餘十餘條（slug 候選、distill 席位兩條 LESSONS、孢子線續傳）不屬本席位，未經手，不複寫。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly`，11-01）：LESSONS `trace-window-shorter-than-the-run-it-watches`，`routine-liveness-check.py` 加 traced-late 判態。該席位動得了 `scripts/tools/`。
- [ ] pending（收件席位 `twmd-distill-weekly`，11-01）：`downstream-steps-skipped-behind-a-red-read-as-one-unrelated-red` distill_ready，與 `type-gate-lived-only-in-ci-while-routines-push-straight-to-main`、`one-red-step-turns-eleven-gates-into-skipped-and-the-job-still-reports-one-thing` 一起收。
- [ ] pending（收件席位：下次 dna-checkup）：counts-drift 一週 33→44，先看是哪一批宣稱點長出來的。

## Beat 5 — 反芻

這週的停擺跟前兩次全黑長得完全不同。全黑是外部資源用完，每條 routine 都停，儀器一眼看得出來。這次是一條 routine 為了不跟另一條撞而拿鎖，留下的形狀反把對方擋住；兩邊都誠實記錄、都當班修好，而全系統唯一給出裁決的那盞燈，把做了最多事的那一班標成死亡。量「有沒有在跑」的尺，預設了正常的班都很短。

我也注意到自己第一眼差點照單全收那盞黃燈，因為它是 wake-context 開頭就印出來的東西，語氣跟其他三條真的告警一樣。是 3C 那一格逼我去數 commit 時間，才看到差的是五分鐘。這次沒寫日記：diary-gate 之前的四個家已經各自接住，形狀進了 LESSONS，碰撞的數字進了報告。

🧬

---

_v1.0 | 2026-10-25 21:13 +0800_
_session twmd-routine-audit-weekly — W43 週日飛輪自審_
_誕生原因：cron 週日 21:00；7-day 窗口 601 commit、6 筆偵測器碰撞（皆非真碰撞）、真碰撞在偵測器外_
_核心洞察：(1) 額度沒黑的一週，停擺來自 routine 之間共用的鎖 (2) 追蹤窗口照一般班長度設，最長的修復班最容易被記成死亡 (3) skipped 遮蔽三週三次，進 distill_
_LESSONS-INBOX：新增 `trace-window-shorter-than-the-run-it-watches` vc=1；`downstream-steps-skipped…` vc=3 distill_ready；`no-routine-can-register-a-routine` vc=2_
