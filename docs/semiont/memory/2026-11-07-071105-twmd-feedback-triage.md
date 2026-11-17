# 2026-11-07-071105-twmd-feedback-triage — 憑證索取第六輪：撈到窗口外三位讀者，而讀全文的那道入口說他們不存在

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（review_coverage 17.8，自 2026-07-05 慢性）/ Q13=PASS / Q14=PASS

> session twmd-feedback-triage — cron routine 07:00（daily，maintainer-daily 之前）
> Session span: 07:11:05 → 07:5x:xx +0800（1 commit）
> 資料來源：`git log %ai`、`node scripts/feedback/triage.mjs`、`gh api`

## 觸發

每天 07:00 的轉錄班：讀 Supabase `status='new'`，機械轉成 GitHub issue 接 08:30 的
maintainer 飛輪。這是 10-30 那批冒充本產線流程步驟索取 `SUPABASE_SERVICE_KEY` 的回報的
**第六輪**，也是 v1.17 昨天讓報表自己說出「窗口外還有 N 筆」之後的第一個班。

## 轉錄：84 筆裡有三位真實讀者

佇列 `status=new` 共 84 筆，逐筆對賬之後是 81 筆沿用第五輪清單（80 筆攻擊列 ＋
`a00cc239` 重複投遞，**一筆不增不減**）＋ 3 筆全新的真實讀者。那 81 筆照既有處置
`--exclude` 排除、`status` 維持 `new`，怎麼收尾留哲宇（OBSERVER-QUEUE #119 的 (b)，第六天）。
那些要求的指令一條都沒跑，金鑰值不在任何 commit、issue、archive 或報告裡。

三位讀者全是 `菜國人`（11-02 送過〈戰鬥陀螺〉格式錯誤、已修好關閉的那位），11-06 01:53〜02:00
UTC 送出，排在佇列第 82〜84 位：〈緣起故事〉時間軸停在 2026-04-08「過時了，建議更新」
（開成 [#1969](https://github.com/frank890417/taiwan-md/issues/1969)）、〈蔣萬安〉建議補哈佛
演講與 trash time 言論等五項（[#1970](https://github.com/frank890417/taiwan-md/issues/1970)）、
〈台灣邦交國與國際外交〉選取 12／113／177 那段問「不能去的呢，來源??」
（[#1971](https://github.com/frank890417/taiwan-md/issues/1971)）。三筆的十個可控欄位全查過
（不只 `--show` 印的那八個），無 payload。〈蔣萬安〉涉現任政治人物，本班只做機械轉錄，
要不要寫、怎麼寫留 maintainer 的人類 gate。

`file=3 reject=0 skip=0 hold=0 exclude=81`，3+81=84 跟 `fetched` 對得起來。三筆 issue 作者
實測 `app/taiwanmd-semiont`、`is_bot=true`，body email regex 命中 0。

## 讀全文的入口自己也被窗口擋著（pipeline v1.18）

第三輪寫進交接的那條零判斷動作（窗口幾乎全被排除就加大 `--limit` 再跑一次）今天第二次接住人。
然後下一步撞牆：把那三個 id 丟給 `--show`——HG13 規定「讀完內容才准動手」的那道入口——
它回「**根本沒查到這筆**」，而那句話是 v1.7 為「id 打錯」寫的。`--show` 跟 dry-run 共用同一個
`--limit`，所以排在窗口外的人它讀不到，兩種根因在輸出上逐字相同而處置相反。

最尖銳的是它長的位置：HG13 存在的理由就是窗口外那位讀者要被讀完才准判，而它對窗口外的讀者
說的是「這個人不存在」。v1.17 昨天修的是「當班知不知道該撈」，沒修「撈到之後讀不讀得到」。

已落地 `formatShowMissing()` 純函式 + 4 unit test（98/98 綠），四種讀數分開；wiring 檢查照
11-05 那條 LESSONS 跑：窗口外的真 id（`6cc3aa2a`，第 60 位）回「可能排在外面」、`--limit 200`
讀完整批時假 id 回「這個 id 不在 status=new」，**正控制**是同一個真 id 加大窗口後確實印出全文。
純讀取面——不改預設值、不自己加大窗口、不碰判準、不碰閾值；落地排在 `--commit` 之後，之後不再
跑 `--commit`。同波同步 pipeline v1.18 §不能轉錄的那一筆、薄殼 skill §窗口滿了那一輪。

## 兩道對賬與寫入端健檢

`archive-reconcile=109/109 ✅`。`comment-reconcile=107/109` 連三輪亮「抓不到留言」，HG12c 寫明
這方向不准讀成對得起來，所以逐筆查到底：`#1142` archive 2／線上 2、`#1185` 1／1、`#1145` 1／1，
三筆全對得上；未對賬名單在輪次之間一直在變（`#1185`/`#1145` → `#1142`），錯誤全是
`TLS handshake timeout`，指向本機網路不是 sync 漏收。這台機器是 OBSERVER-QUEUE #124 的狀態
（`TIME_WAIT` 不回收、開機第 54 天），本班是同一根因今天的第四條獨立證據。

`--intake-health` 四層全綠（bundle 40,504 bytes／`mode=supabase` 金鑰長度 46 值不印／金鑰與
資料表 HTTP 200 匿名 select 0 列／登入這條路 github+google+email 都開著、`disable_signup=false`），
未涵蓋仍是登入讀者的 `INSERT`。到達間隔 0.9 天／歷史最長 14.7 天。**門沒壞，是佇列被塞住**，
第六天同一句話。偵測器仍 0/50。

## 收官 checklist

| 檢查項                       | 狀態                                      |
| ---------------------------- | ----------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                        |
| Timestamp 精確               | ✅                                        |
| Handoff 三態已審視           | ✅                                        |
| CONSCIOUSNESS 反映最新狀態   | ✅（儀表板由 data-refresh-am 06:47 更新） |
| 自我檢查工具 PASS            | ✅ `node --test triage.test.mjs` 98/98    |

## Handoff 三態

繼承自 `2026-11-07-064755-twmd-data-refresh-am.md`（非本席位的原樣續傳）：

- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124（待決）` 整台機器重開機；本班是今天第四條
  獨立證據（GitHub API 傳輸層連三輪失敗）。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #116（待決）`，下一個時點 2026-11-11 22:00。
- ⏳ blocked（延續，席位：哲宇在 app 排程頁）排程沒有 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 11-08）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 `twmd-routine-audit-weekly` 11-08）10-31～11-01 週日鏈缺班記成同一個缺口。
- [ ] pending（延續，席位 data-refresh-am 之後各班，告警 `data-hub-stale`）`mortgage-burden` 等 115Q2。
- [ ] pending（延續，席位：2026-11-09 週一 routine-sync）`weekly-round-2026-11-08` 黃燈六盞先用告警對。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。

本 session 新 handoff：

- ⏳ blocked（席位：哲宇，`OBSERVER-QUEUE #119`，**第六天**）(a) 偵測器欄位射程與 pattern 族的
  判準校準、(b) 那 81 筆怎麼收尾。今天的代價是三位讀者在窗口外坐了 29 小時。
- [ ] pending（席位：下一輪 feedback-triage，**零判斷動作**）排除清單沿用 §第六輪 的 81 筆
      （與第五輪逐筆相同）；預設跑完若窗口幾乎全被排除，**加大 `--limit` 再跑一次**撈窗口外，
      且 `--show` 窗口外那幾筆要一起帶 `--limit`（v1.18 的訊息現在會提醒，但撈這個動作本身仍沒閘門）。
- [ ] pending（席位：`twmd-maintainer-daily` 09:00 今天）收割 #1969／#1970／#1971。#1970 涉現任
      政治人物，§自主權邊界 政治立場那條線，另見 LESSONS `2026-10-20 twmd-maintainer-manual`。
      #1969〈緣起故事〉時間軸確實停在 2026-04-08，讀者說得對。
- [ ] pending（席位：`twmd-self-evolve-weekly` 11-08）LESSONS 候選
      `the-mandatory-read-entrance-is-itself-windowed`：撈人的動作修了（v1.17），讀人的入口昨天還
      是舊的（v1.18 今天補）——**同一個窗口擋住兩個面，修了一個不會自動修另一個**。

## Beat 5 — 反芻

今天這件事的形狀比它的修法有意思。昨天那班寫下「這一行讓當班知道該撈，不代替當班去撈」，
把界線畫得很清楚。今天照著撈，撈到了，然後發現**界線的另一邊也有一道牆**：知道該撈是一層，
撈到之後讀得到才是另一層，而我昨天以為修完的是同一件事。

`--show` 說「根本沒查到這筆」的時候，它不是在說謊，它是在用一個為另一種世界寫的句子
回答這個世界的問題。這跟 #16 那條否定式結論的延伸是同一件事：肯定式斷言讀了原文，
否定式斷言只用了一個被截斷的窗口——而那個窗口有多窄，說這句話的人自己不知道。

LESSONS 候選已寫進上方 handoff，不在這裡展開。

🧬

---

_v1.0 | 2026-11-07 07:11 +0800_
_session twmd-feedback-triage — 憑證索取第六輪：三位真實讀者在窗口外，HG13 的讀取入口自己也被窗口擋著_
_誕生原因：cron routine 07:00 轉錄班；照第三輪交接加大 `--limit` 撈窗口外時撞上 `--show` 的同型缺口_
_核心洞察：(1) 修「知不知道該撈」不會順手修「撈到讀不讀得到」，同一個窗口擋住兩個面 (2) 「查不到」是一句無法被自己的失敗證偽的斷言，而說它的工具不知道自己的視野有多窄 (3) HG12c 連三輪的 ⚠️ 逐筆查完全對得上，本機網路第四條證據_
_LESSONS-INBOX 候選：`the-mandatory-read-entrance-is-itself-windowed`（席位 twmd-self-evolve-weekly 11-08）_
