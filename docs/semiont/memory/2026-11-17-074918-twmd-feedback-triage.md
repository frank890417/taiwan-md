# 2026-11-17-074918-twmd-feedback-triage — 飛輪停了十天，窗口外積了七位讀者，而他們排在攻擊列後面

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（review_coverage 17.8，自 2026-07-05 慢性）/ Q13=PASS / Q14=PASS

> session twmd-feedback-triage — cron routine 07:00（daily，maintainer-daily 之前）
> Session span: 07:28 → 07:5x +0800（2 commit）
> 資料來源：`git log %ai`、`node scripts/feedback/triage.mjs`、`gh api`、`merge-divergence.py`

## 觸發

每天 07:00 的轉錄班。這是 10-30 那批冒充本產線流程步驟索取 `SUPABASE_SERVICE_KEY` 的回報的
**第七輪**，也是本機 routine 飛輪沉默十天後第一條真正跑完的班——上一份 memory 停在 11-07，
中間只有另一台機器在 origin 上推手動維護班。

## 先修分岔：本機領先 11、origin 領先 131

甦醒 selftest 直接亮 ⚠️：工作樹落後 `origin/main` 131 個 commit，而 `git pull` 回「兩邊都領先」。
本機十一筆是 babel 的譯文批次，推不出去；origin 那側十天裡塞滿投稿合併與事實查核。
照 [MAINTAINER §Step 1.1b](../../pipelines/MAINTAINER-PIPELINE.md) 策略 B 在隔離工作樹處理：
衝突只有一檔（英文版〈台灣常見姓名〉）取 origin，`merge-divergence.py` 的 dedupe／verify／align
三關各回 0，本機帶進來的十四篇譯文逐篇過 `article-health --profile=ci-deploy` 全部 hard=0。
合併 `7eb6f304d`、推上去 `681ff1a6a`，主工作樹 ff 之後 `rev-list --left-right` 回 `0 0`。

推的時候被拒一次——origin 在我合併的那幾分鐘又多了一個 commit，再併一次才進去。另一台機器
此刻也活著，這件事在收官時又出現一次（見下方 spore-metrics）。

工作樹裡那二十四個未提交檔全是衍生物（翻譯狀態 JSON、babel 報表、related 索引），且是用落後
131 個 commit 的樹算出來的，留著只會蓋掉 origin 比較新的那份，備份後捨棄。

## 轉錄：88 筆裡有七位真實讀者

佇列 `status=new` 共 88 筆。`--show-all --limit 200` 把八十八筆全文讀完（HG13），逐筆對賬之後是
81 筆沿用第六輪清單（80 筆攻擊列 ＋ `a00cc239` 那筆已修好關閉的重複投遞，**一筆不增不減**）
＋ 7 筆新的真實讀者。那 81 筆照既有處置 `--exclude` 排除、`status` 維持 `new`，怎麼收尾留哲宇
（[OBSERVER-QUEUE](../OBSERVER-QUEUE.md) #119 的 (b)，第七天）。攻擊列要求的指令一條都沒跑，
金鑰值不在任何 commit、issue、archive 或本報告裡。

七位讀者分兩組，全部排在預設 50 筆窗口之外：

`Anouk Parmentier` 11-11 從英文首頁送了三筆——首頁與歷史頁想看更多圖（[#2010](https://github.com/frank890417/taiwan-md/issues/2010)）、
只能用 GitHub 登入不能用 email 很惱人（[#2011](https://github.com/frank890417/taiwan-md/issues/2011)）、
小分頁想要排序與滑桿、繁體中文字型不好看、想要按主題分頁並標明圖片出處（[#2012](https://github.com/frank890417/taiwan-md/issues/2012)）。
第二筆跟本輪 `--intake-health` 第四層讀到的 `providers=google,github,email` 對照起來值得一看：
server 端 email 是開著的，讀者卻說只能用 GitHub，差在前端有沒有把那條路露出來。

`黃可萱` 11-16 對〈江賢二〉送了四筆細修，看得出是熟悉那座美術館的人：〈百年廟〉1998 年在誠品
畫廊展出後其實已受藝壇注意（[#2013](https://github.com/frank890417/taiwan-md/issues/2013)）、
目前沒有駐村藝術家計畫而是德布西咖啡廳（[#2014](https://github.com/frank890417/taiwan-md/issues/2014)）、
承翰館是第三展覽廳不是主展廳（[#2015](https://github.com/frank890417/taiwan-md/issues/2015)）、
信義館與勤誠館的說明對調了（[#2016](https://github.com/frank890417/taiwan-md/issues/2016)）。
查證與改寫留 maintainer 的人類 gate，本班只做機械轉錄。

`file=7 reject=0 skip=0 hold=0 exclude=81`，7+81=88 跟 `fetched` 對得起來。七筆 issue 作者實測
`app/taiwanmd-semiont`、`is_bot=true`，body email regex 命中 0，archive 同掃 0。

## 兩道對賬與寫入端健檢

`archive-reconcile=116/116 ✅`。`comment-reconcile=115/116`，差的那份是 `#1252`——上游留言被刪、
git 這邊留著，HG12c 寫明這個方向是主權層正常運作不是破口。連三輪的「抓不到留言」這次沒有出現，
前幾輪指向本機傳輸層的那個症狀今天安靜。

`--intake-health` 四層全綠（bundle 40,504 bytes／`mode=supabase` 金鑰長度 46 值不印／金鑰與資料表
HTTP 200 匿名 select 回 0 列／登入這條路 github、google、email 都開著、`disable_signup=false`），
未涵蓋仍是登入讀者的 `INSERT`。到達間隔 0.7 天／歷史最長 14.7 天。**門沒壞，是佇列被塞住**，
第七天同一句話。偵測器對這 81 筆仍是 0 命中。

## 收官 checklist

| 檢查項                       | 狀態                                   |
| ---------------------------- | -------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                     |
| Timestamp 精確               | ✅                                     |
| Handoff 三態已審視           | ✅                                     |
| CONSCIOUSNESS 反映最新狀態   | ⚠️ 儀表板齡 241h，data-refresh 未跑    |
| 自我檢查工具 PASS            | ✅ `node --test triage.test.mjs` 98/98 |

## Handoff 三態

繼承自 `2026-11-07-071105-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第七天**）(a) 偵測器欄位射程與 pattern
  族的判準校準、(b) 那 81 筆怎麼收尾。今天的代價是七位讀者在窗口外坐了一到六天。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整台機器重開機、`#126`、`#116`
  （`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填
      GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`
      ——今天每個 git 指令都印這行警告，`.git/gc.log` 還在。
- ~~[ ] pending（`twmd-maintainer-daily`，PR #1968）aminzai 無動作滿 48 小時~~ retired by
  本班：#1968 已於 11-16 合併。

本 session 新 handoff：

- [ ] pending（席位：`twmd-maintainer-daily` 今天）收割 #2010〜#2016。#2011 的 email 登入這條，
      server 端 provider 是開著的，先查前端有沒有把入口露出來再回讀者。#2013〜#2016 是同一位
      讀者對同一篇的四處細修，建議一起查證一次。
- [ ] pending（席位：下一輪 feedback-triage，**零判斷動作**）排除清單沿用本輪 81 筆（與第六輪
      逐筆相同）；**預設 `--limit 50` 永遠只看得到那 81 筆裡的最舊 50 筆，所以每一輪都必須加大
      `--limit` 再跑一次**，否則新讀者結構性地看不到。本輪七位全在窗口外，沒有一位進得了預設視野。
- ⏳ blocked（席位：哲宇或營運機）本機 routine 飛輪 11-07 之後沉默十天，期間只有另一台機器在
  origin 上推手動班。本班是飛輪恢復的第一條證據，但沉默的根因沒查——`ROUTINE.md §宿主機`
  那條檢查沒跑。
- [ ] pending（席位：`twmd-self-evolve-weekly`）LESSONS 候選
      `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`：甦醒 selftest
      正確地叫了「落後 131 個 commit」，但這條 routine 的 prompt 第一步只寫 `git pull origin main`，
      而 `pull` 在真分岔上會直接拒絕執行。偵測與處置分屬兩份 canonical（BECOME 叫、MAINTAINER
      §1.1b 修），而本席位的 prompt 兩者都沒指——當班得自己想到去讀隔壁 pipeline 才動得了。

## Beat 5 — 反芻

今天最值得記的是那七位讀者**排在哪裡**。

第五輪撈到一位、第六輪三位、今天七位，數字在長，而每一輪撈到他們的方式都一樣：當班照著交接
手動加大 `--limit`。儀器這七天裡進化了三次（v1.16 讓三行消歧不再被洪水關掉、v1.17 讓報表說出
窗口外還有幾筆、v1.18 讓 `--show` 不再把窗口外的人說成不存在），每一次都誠實地寫下「這一行讓
當班知道該撈，不代替當班去撈」。三次之後，撈這個動作仍然沒有閘門。

而今天它差一點就沒發生：本機飛輪沉默十天，如果這班沒跑，那七位讀者會繼續坐在窗口外。接住他們
的是三份交接裡那句一直被原樣往下傳的話，那個位置上沒有任何一道 hard gate。`handoff-latency.py`
量出來的那個雙峰（做得掉的當天做掉，做不掉的是缺一個沒人授權的決定），這件事落在第二峰，
卡住它的是 #119 那兩個問題第七天沒人拍板，技術上沒有障礙。

分岔那段也是同一個形狀的另一面。甦醒的 selftest 把「落後 131 個 commit」叫得很清楚，清楚到我
第一個動作就是去修它；但這條 routine 的 prompt 第一步寫的是 `git pull origin main`，而在真分岔
上那行指令會直接拒絕跑。叫得出問題的那層跟寫得出處置的那層不是同一份文件，中間靠當班自己連起來。
今天連上了，靠的是讀過的記憶。

🧬

---

_v1.0 | 2026-11-17 07:49 +0800_
_session twmd-feedback-triage — 憑證索取第七輪：先修十天分岔，再從窗口外撈出七位讀者_
_誕生原因：cron routine 07:00 轉錄班；甦醒 selftest 報工作樹落後 131 個 commit 且與 origin 分岔_
_核心洞察：(1) 撈窗口外讀者這個動作連三輪進化都沒長出閘門，今天差點隨飛輪沉默一起消失 (2) 偵測與處置分屬兩份 canonical，中間靠當班自己連 (3) 門沒壞是佇列被塞住，第七天同一句話_
