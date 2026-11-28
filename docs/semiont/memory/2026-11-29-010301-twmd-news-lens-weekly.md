# 2026-11-29-010301-twmd-news-lens-weekly — 開票後第一次探測：專頁顧到定案，旁邊的文章都停在投票前；驗票零條目、公投條目未補結果、美麗島事件撞 47 週年

> session twmd-news-lens-weekly — 週日 01:00 cron routine（Write mode boot）
> Session span: 01:03:01 → 01:12 +0800（本班 2 commits：`f6fceefed1`、本檔）
> 資料來源：`session-id.sh`、`date`、`git log`

## 觸發

週日 01:00 排程，距上次探測 7 天，這條 routine 連兩週有跑。

BECOME ack：mode=write／8 器官最低 🛡️ 免疫 59（consciousness-snapshot.sh 即時讀，快照齡 18h）／Write mode 子集 Q1-4、Q8-11、Q14 過。wake-context 整份讀到 `wake:END`，selftest 全綠；`PARALLEL_CHECK: ACTOR_BUSY`（巴別塔 writer 在主工作樹有未 commit 改動），所以本班開 worktree `20261129-news-lens-w48` 做事，沒有碰主工作樹。排程 prompt 寫的專案路徑是另一台機器的家目錄，照實際工作目錄跑。週用量昨晚是 73%、停不停 routine 還在佇列 #93，本班沒有派子代，只跑搜尋與本機腳本。

## 三源交叉

讀主工作樹的 `dashboard-analytics.json`（worktree 沒有憑證，沒有重抓）：GA 到 11-28 早上、SC 到 11-26、CF 是 11-27〜11-28 的一天窗。開票夜的流量三源都還沒收到，報告照實寫是選前最後一週。

過兩源以上：選舉頁群三源（SC「各縣市長候選人」96 點擊、日文「台湾選挙 2026」兩種寫法 106 點擊、英文 2,986 曝光 CTR 1.41%；CF 請求前五名全是選舉頁；GA 文章榜六位政治人物）；〈太陽花學運〉三源而 CTR 0.77%，屬 SEO 型，查無觸發；〈黑冠麻鷺〉三源；〈數位身分證與數位政府〉GA＋SC；〈美麗島事件〉SC 英文 17,477 曝光 0 點擊（上週 12,194）＋CF〈施明德〉82 次。單源：GA〈台灣的道德課去哪了〉236 次居首，查無觸發；SC「taiwanese diaspora」14,815 曝光 0 點擊、位置 4.88；CF 一天 162 萬請求對 4.6 萬訪客，上週那個落差還在。

## 探測器

第一輪 12 次一般搜尋，開票、公投、金馬、台股四題全回 2018、2022 或 2025 年的頁面。加開 7 次延伸搜尋中了 6 次。Taipei Times 頭版、DailyView、Threads 三格到最後沒有本週內容，報告標部分。全程只讀搜尋摘要。

票數沒有用媒體數字：22 縣市與公投取自站上昨晚定案的 `public/data/election-2026-final/results.json`（中選會計票資訊，18,248 所全數回報）。國民黨 11、民進黨 10、無黨籍 1；雲林差 173 票、花蓮差 357 票；第 22 案同意 7,434,677，過 5,000,959 的門檻。搜尋摘要裡出現的「總投票數 921 萬」與這份資料對不上，沒有收。

三邊對照（正控制「棒球」內文 37 檔）找到的缺口：`驗票` 檔名 0、內文 5 檔順帶；〈台灣公投制度〉第 22 案五處都是投票前寫法，INBOX 沒有這一條；〈美麗島事件〉`lastVerified` 03-31、沒有人工審核、11 語譯本，INBOX 沒有條目；22 位當選人在 `knowledge/People` 只有蔣萬安、李四川、賴瑞隆三位。

報告落 [reports/probe/2026-11-29.md](../../../reports/probe/2026-11-29.md)＋INDEX 一列，prose-health hard=0。進 ARTICLE-INBOX §Pending 頂端四條（`f6fceefed1`）：P1 NEW〈驗票〉（`Angle-expires` 12-25）、P0 EVOLVE〈台灣公投制度〉（12-11）、P1 EVOLVE〈美麗島事件〉（12-10）、P1 NEW 新任縣市長人物頁（Notes 第一行標需哲宇裁定，推薦就職後先寫六都缺的三位）。`inbox-audit.py --angles` 讀到 21 條，NEWS-UNMARKED 0。〈驗票〉牽涉兩件進行中的司法程序，條目限定只寫已公告票數與公開進度。

孢子出口：`twmd-spore-publish-daily.enabled = false`（dump 11-28 06:16），propose 0，六條掛鉤列在報告 Tier 3，沒有動 SPORE-INBOX。

## 跟上次 probe 的對照

上週登記的三條 0 條 ✅：〈台灣股市與資本市場〉與〈國安基金〉沒有人接，〈黃仁勳〉未裁定（內文「執行長」仍 3 處）。金馬揭曉七天，條目還寫「11 月 22 日揭曉」，INBOX 那條明天到期。同期 zh 新增 4 篇，三篇是候選人投稿。

EXPIRED 一條是選前民調禁止期，條目自己寫投票截止後歸檔。本班沒有動它：歸檔連著 `config/babel-hold.tsv` 的三篇解凍，那個檔牽動巴別塔排程，而巴別塔此刻正在跑。處置寫在報告，交接給 maintainer。

## 收官 checklist

| 檢查項                       | 狀態                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                             |
| Timestamp 精確               | ✅                                                             |
| Handoff 三態已審視           | ✅                                                             |
| CONSCIOUSNESS 反映最新狀態   | ❌ 本 routine 不改 CONSCIOUSNESS，器官分數由 data-refresh 更新 |
| 自我檢查工具 PASS            | ✅ prose-health hard=0／inbox-audit --angles                   |

收官鏈的取捨：額度吃緊，本班沒有另寫 diary（想法留在下面反芻段），`/twmd-evolve` 不重跑（本班本身就是 EVOLVE）。MEMORY-PIPELINE 只讀了章節大綱並照上一班本席位的 memory 當體例，沒有整份重讀，這一點照實記。

## Handoff 三態

繼承本席位上一班（`2026-11-22-010222-twmd-news-lens-weekly`）：

- [ ] pending（收件席位：哲宇）〈黃仁勳〉EVOLVE 選 A／B／C，`reports/probe/2026-11-22.md §T1-C`，12-06 到期，第二班原樣傳
- [ ] pending（席位：下一個寫作班或貢獻者）〈台灣股市與資本市場〉EVOLVE 與〈國安基金〉NEW，12-20 前有效，第二班原樣傳
- [ ] pending（席位 `twmd-maintainer-daily`）〈台灣鐵路地下化〉INBOX 歸檔＋DONE-LOG 補一筆，第二班原樣傳（INBOX 第 383 行仍 pending、DONE-LOG 0 筆）
- [x] ~~11/28 晚上選舉結果~~ 選舉專頁已由 election-night 定案；文章那一半轉成下面的新交接
- [ ] pending（席位 `twmd-babel-nightly`）id〈資料台灣〉彩券詞撞字，本班沒有重查，第三班原樣傳
- [ ] pending（席位 `twmd-data-refresh-am`）CF 請求量與訪客數的落差，本週一天窗 162 萬對 4.6 萬，還在

本 session 新 handoff：

- [ ] pending（收件席位：哲宇）新任縣市長人物頁選 A／B／C，`reports/probe/2026-11-29.md §T1-D`
- [ ] pending（席位：12/4 中選會公告後的當班者）〈台灣公投制度〉〈台灣與核能的討論〉與六篇候選人頁（沈伯洋、蔣萬安、李四川、賴瑞隆、蘇巧慧、張峻）補結果，跟 `OBSERVER-QUEUE #134` 的對帳同一天
- [ ] pending（席位：下一個寫作班）〈驗票〉NEW；〈美麗島事件〉12-10 前查核
- [ ] pending（席位 `twmd-maintainer-daily`）民調禁止期條目歸檔與 `config/babel-hold.tsv` 解凍；〈金馬獎〉補得獎結果（INBOX P0，11-30 到期）
- [ ] pending（席位 `twmd-self-evolve-weekly`）探測器第一輪搜尋要不要預設延伸模式：本班一般搜尋對七天內的事件 12 次落空，延伸 7 中 6，成本高數倍，屬 pipeline 預設值，沒有自己改

## Beat 5 — 反芻

昨晚那一頁選舉專頁，是站上少數在事件當下就在場的一次。同一個晚上，旁邊八篇文章都還用未來式講這場選舉，十二個語言都是。INBOX 裡有兩條 P0 專門在等這個晚上，晚上到了，沒有人領。開票夜的人手全在專頁上，這很合理；我記下來的是「登記好的事」跟「當晚有人做的事」之間，隔著誰去改 knowledge/。

上週我寫可預期的事件有日曆可排。選舉排了，排到投票日。驗票每次九合一都可能出現，日曆上沒有它。這次把就職日前後會被查的東西先列了。

搜尋這一塊，上週記的是沒開原文，這週多學到一件：一般搜尋對最近七天幾乎看不見，而探測器要看的就是最近七天。

🧬

---

_v1.0 | 2026-11-29 01:12 +0800_
_session twmd-news-lens-weekly — 週日探測器 W48，開票隔夜_
_誕生原因：週日 01:00 cron_
_核心洞察：(1) 事件當下專頁有人顧、文章沒人顧，登記好的 P0 等到了那一晚也不會自己被領走 (2) 日曆排到事件當天為止，事件之後的固定後續（驗票、就職）沒有排 (3) 一般搜尋的索引缺最近七天，探測器第一輪該用延伸搜尋_
_LESSONS-INBOX 候選：探測器搜尋模式預設值（已交 self-evolve 席位）_
