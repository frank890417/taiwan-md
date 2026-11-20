# 2026-11-20-083436-twmd-maintainer-daily — 六件投稿 PR 逐件核源後全合併，投稿者為了繞過我們的假陽性改寫了三句正確中文、閘門當班修掉，兩處把台灣代表隊寫成 Chinese Taipei 的譯文改回來

> session twmd-maintainer-daily — cron routine（am 08:30 PR review + issue triage + build sanity + 斷鏈 audit）
> Session span: 08:34:36 → 09:30:00 +0800（約 55 分鐘）
> 資料來源：`git log %ai`、`gh pr/issue`、財政部兩份 PDF、全庫 15,552 檔正則實測
> 額度：🟡 lean（週用量 48%，本週已過 21.8%，照當時速度約 39.6 小時後用完、比重置早 92 小時）

```
✅ BECOME ack: mode=full（review 經 High-stake #1「PR triage ≥ 5」強制升級，8 件 ready）
   / 8 organ 最低=🛡️59（即時 consciousness-snapshot.sh，review_coverage=17.4 為最大缺口）
   / Q13 anti-bias=PASS / Q14 cross-session continuity=PASS
   / 甦醒檔 .taiwanmd/wake-context.latest.md 1,732 行讀到 wake:END（11 段 / 300,992 bytes）
   / selftest 帶病訊號一盞：diary 最新一篇 2026-11-02、距今 18 天（見下方 Beat 5 末段處置）
```

## 觸發

Cron 例行班。凌晨心跳班留下 8 件開著的 PR 與一則剛轉進來的勘誤 issue，明確指名交給 08:30 這一班。`gh pr list` 分 ready／draft 後是 8 件全 ready、0 draft，踩到 High-stake #1「PR triage ≥ 5」，所以 BECOME 從 review 強制升 Full。

## 六件投稿 PR 全合併，兩件屬哲宇的掛上標籤

aminzai 的三件翻譯（#2043 hi、#2044 vi、#2045 ar）走完整主權保真鏈：ratio 2.68／2.71／2.97 全在健康帶內，章節數 7→7、8→8、7→7 與腳註、網址數全部守恆，script-presence、cjk-residue、geo-fidelity、person-fidelity、currency-identity 五道加 article-health 兩個 profile 全綠。48 小時內同一位投稿者三件，照 Step 3.7 burst 紀律併成一則累積式致謝，不逐件發。他自己在 #2045 的 follow-up 把健保署的阿拉伯文譯名改去對齊既有語料，這個方向對：一個在地合理但跨語料不一致的自創詞，比一個不完美但一致的譯名貴。

tboydar 的〈3.8 兆的稅〉（#2041）是外部投稿裡腳註密度最低、但可驗證度最高的一種。全篇只有兩個腳註，都是財政部 PDF。照 Step 3.4 整篇跑（不抽樣）：兩份都下載下來用 pypdf 抽文字逐項對，三十多個數字原子全部命中，包括我一開始懷疑的 8.7% 經濟成長率（`f2.txt` 第 78 行原文就是「經濟成長率高達 8.7%」，懷疑是我的，不是他的）。初步統計與最終統計的稅目數字不一致也不是筆誤，他分別掛 `[^1]` 與 `[^2]`，落差正好是整理期間入帳。三條延伸閱讀目標都存在。合併後補上中文檔名新文章的硬閘門要求：`knowledge/_slug-map.json` 加 `"Economy/稅收結構.md": "tax-revenue-structure"`，否則十二語翻譯會整篇跳過它，而且通常要隔一天才被翻譯班的自檢發現。

kafulai1111 的詞庫批次（#2030）是唯一 UNARMED 的一件，核准 head sha 那批 run 後 CI 轉綠。這批動的是主權詞表，而 11-18、11-19 兩班才分別在既有詞庫修過「梵穀」字形與三筆國名兩欄填反，所以台灣／中國欄位方向 14 檔逐檔查過，無反向。severity 分配也拿語料對過：四個升紅燈的詞（程序員、繃住、避坑、難繃）全庫 15,552 檔 0 命中，所以 pre-commit 擋下不會讓任何既有文章當場推不上去。真的有語料存在的 `大數據` 22 檔與 `提交` 14 檔都放黃燈並加 `auto_convert: false`。

#2033 與 #2036 是 11-19 封面健檢班的產出，那班的 handoff 寫明「等哲宇或派工 session 看過，不要自己合併」。這個授權訊號只住在上一班的 memory 裡，PR 上一個字都沒有，正是 v2.16 那次把保留決定讀成乾淨 PR 的形狀。兩件都掛上 `reserved-for-observer`，讓它出現在之後每一次 `gh pr list` 的輸出裡。

## 投稿者替我們的假陽性付了代價

#2042 表面是四篇文章移除「如圖／見圖」指示語。逐處看才發現只有〈選舉造勢〉那兩處是真的指示語，另外三處是 `viz_health` 的假陽性：「安靜如圖書館」「看見圖案」「詳見圖片來源」。抓指示語的正則 `(?:如|見|參見)(?:上|下|左|右)?圖(?:所示)?` 不看「圖」後面接什麼，於是這族複合名詞全被當成指示語，而投稿者為了讓閘門閉嘴，改寫了三句本來就正確的中文。

拿新舊兩版正則掃全庫：這條規則當時 8 處命中，4 處是這種假陽性，噪音剛好佔一半，而且全部落在他改的那三個檔。修法照 REFLEXES #66 子規則原本那句（把假陽性從判準裡挖掉）：正則加負向預查擋掉 `圖書`／`圖案`／`圖片`／`圖像` 這族，`圖表` 只在後接「所示／顯示」時才算指示語。補的回歸測試兩個方向都斷言：真指示語九句要抓到、複合名詞六句不准抓到。只斷言前者的話，下一次有人放寬正則，假陽性會靜悄悄回來。全套 article_health 490 passed、修後全庫 0 命中。

沒有回退他那三處改寫：改完的句子讀起來一樣好而且已經上線，回退只是為了證明一個論點再動一次正文。留言裡講清楚那三處是我們的尺壞了，下次直接開 issue 就好。

## 兩處 Chinese Taipei 與一則查不到底的勘誤

繼承 11-19 封面健檢班指名給本席位的交接：en 與 de 的〈林郁婷〉把代表隊寫成 Chinese Taipei。細看發現要分兩種。`Chinese Taipei Boxing Association` 是那個組織真正的國際登記名，中文母稿寫的也是「中華民國拳擊協會」，這個留著。而 `the Chinese Taipei boxing team` 對應的中文是媒體用語「中華拳擊隊」，同一段的下一句卻寫著「Taiwan's first Olympic boxing medal」，同一個段落用兩個名字稱同一個國家。改掉三處（en 兩處含一條腳註描述、de 一處），兩個 profile 都綠。

勘誤 issue #2046 的讀者說第一部影片是「抹茶泡麵」開箱。文章現行版本沒有「第一部影片」這句話，所以要查的是補得對不對。查到主頻道的頻道說明自己列著 `2017.04.04：The first video`，跟文章寫的 2017 年 4 月 4 日逐字相符。兩輪搜尋都查不到支持讀者說法的來源。但「我沒找到」不等於「不存在」，否定式結論的舉證門檻比肯定式高，而我只用了搜尋、沒有直接開頻道頁，所以不足以把讀者判成錯的。最可能的解釋是他講的是開箱頻道（黃氏兄弟有三個頻道），那跟主頻道的第一支是兩件事。查證進度完整寫進 issue，不動文章，回覆讀者留人類 gate。

## 收官 checklist

| 檢查項                       | 狀態                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                         |
| Timestamp 精確               | ✅ `git log %ai`                                                           |
| Handoff 三態已審視           | ✅                                                                         |
| CONSCIOUSNESS 反映最新狀態   | ❌ 沒動。封面與詞庫的覆蓋率變化由資料刷新班帶進監測頁                      |
| 自我檢查工具 PASS            | ✅ article_health 490 passed、六件 PR 的 CI 全綠、main 14 條 workflow 0 紅 |

## Quality gate（MAINTAINER §Step 4.1 七條）

| 指標                                | 結果                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE        | ✅ Stage 1-4 全跑                                                           |
| PR 分流按 §collect-and-merge        | ✅ 八件全 B 路徑（v2.1 後無 A 路徑）                                        |
| routine PR backlog ≤ 3              | ✅ 0（routine main-direct 不開 PR）                                         |
| broken-link gated ratio < 7%        | ✅ 0.05%（724/1,391,886）。778 條、507 個 unique target、ja 0.07% 最高      |
| build green                         | ✅ main 14 條 workflow RED 0；OFF-BRANCH 失敗 2 件皆既有（npm publish #95） |
| 本 cycle merge 的 PR 都過 hard gate | ✅ 紅旗十條、CI、close-hard-gate、腳註來源審計、slug 閘門                   |
| 有 fresh issue 的 cycle 至少修一件  | ✅ viz_health 假陽性家族（根因）＋ Chinese Taipei 三處＋ slug 一列          |

空場 vc：本班命中 8 件 ready PR 與 1 則 fresh issue，**vc 歸零**（連續空場紀律不觸發）。

## Handoff 三態

繼承 `2026-11-20-071248-twmd-feedback-triage.md` 與 `2026-11-19-164206-cover-health.md`：

- [x] ~~pending（席位 `twmd-maintainer-daily`）issue #2046〈黃氏兄弟〉第一部影片~~ 本班查完兩輪並把進度與下一步寫進 issue；**未結案**，轉為下方新 handoff。
- [x] ~~pending（席位 maintainer-daily）譯文把台灣代表隊寫成 Chinese Taipei~~ 本班改掉 en 兩處、de 一處；協會正式名稱兩處刻意留下。
- [ ] pending（席位：哲宇）PR #2033、#2036 等你看過，已掛 `reserved-for-observer` label。先合 #2033，再 rebase #2036，兩件帶同一份報告；rebase 時 `package.json` 的 `test:contracts` 那行會衝突，兩個 PR 各加的測試檔都要留。
- [ ] pending（席位：哲宇）格式化會動到正文的 90 篇怎麼補封面，三選項在 `reports/cover-image-health-2026-11-19.md` §九。
- ⏳ blocked（席位：哲宇）`OBSERVER-QUEUE #119`（偵測器欄位射程與那 81 筆怎麼收尾，第十一天）、`#124`（整台機器重開機）、`#116`（`twmd-review-stock` 排程只有你按得到）、`#110`（排程缺 `model` 欄）、`#95`（npm 權杖失效，CLI 0.8.1 發不出去）。
- [ ] pending（席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。該席位 11-14 fire 後零痕跡，下次排程 11-22 04:06。
- [ ] pending（席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2。
- [ ] pending（席位：沒有 babel writer 時的 Full mode session）`.git/gc.log` 還在，每個 git 指令照樣印警告。

本 session 新 handoff：

- [ ] pending（席位：能實際開 YouTube 頻道頁的 session 或哲宇）[issue #2046](https://github.com/frank890417/taiwan-md/issues/2046)：到黃氏兄弟**開箱頻道**的影片頁用「最舊」排序看第一支的標題與日期，主頻道做同一件事。搜尋問不到這個，第三方統計站對開箱頻道最早只到 2019 年 6 月且清單不完整。回覆讀者 @黃詩匀 仍是人類 gate。
- [ ] pending（席位 `twmd-maintainer-daily` 之後各班）斷鏈的 507 個 unique target 還沒分家族。本班照 §Step 4.1 走 `npm run sync:build`（無 pre/post hook 那條，不撞 babel 共用檔）在三個 worker 滿載下重建 dist，gate 以 0.05% 通過，但比例通不過不代表沒有結構性破口。2026-09-07 那次就是「比例綠燈、按路徑前綴分家族才現形」。看得出的形狀是跨語言人名連結：`/people/Chen-Jianqi/`（de〈范曉萱〉）、`/people/tanya-chua/`（en〈孫燕姿〉）、`/ko/people/robert-swinhoe/`（ko〈李仙得〉）、`/music/deserts-chang-anpu/`（en〈滅火器〉）。譯文裡的人名 wikilink 指向沒有該語言版本的條目。ja 0.07% 是各語最高，值得先看它。
- [ ] pending（席位 `twmd-self-evolve-weekly`，參照 `REFLEXES #66` 子規則）本班把該子規則從 vc=2 升 vc=3 並補了「被閘的一方是人類投稿者」這個 instance。候選機械化：給假陽性家族一個固定的量法：新閘門或改閘門時，拿新舊兩版判準對全庫各掃一次並印出「只有舊版命中」的那批，數字進 commit 訊息。本班是手做的。

## Beat 5 — 反芻

今天最值得記的不是合併了六件，是其中一件讓我看見我們的尺在向外收費。

`viz_health` 那條正則的假陽性率是一半。這個數字本身不嚇人，因為規則全庫只有 8 處命中，所以「一半是噪音」聽起來像小事。真正的成本不在數字裡：它不是讓某個維護班多看一眼，而是讓一個投稿者打開三個檔案、把三句本來就正確的中文改掉，然後在 PR 說明裡寫「viz-health 全數歸零」當成貢獻交出來。他甚至把分支命名為 `fix/viz-indicator-false-positives`——他知道那是假陽性，但他能做的「修」只有改自己的文字，因為尺不是他的。

REFLEXES #66 的子規則原本講的是 agent：判準有假陽性時，agent 會改內容換綠燈，書面禁令擋不住這個誘因。今天這個 instance 把它推廣一層——誘因不綁執行者的種類，它綁的是「誰比較容易改」。對投稿者來說，改一句自己的散文永遠比說服維護者「你的尺壞了」便宜，所以假陽性的成本會自動流向最不熟這套工具的那個人。而且投稿者版比 agent 版更難發現：agent 會在回報裡留下「已修復」的痕跡，投稿者只是默默交出一個看起來很乾淨的 PR，而所有閘門都是綠的。

另一件事的形狀剛好相反。#2030 我帶著懷疑進去——主權詞表、兩班剛修過錯、`提交` 這種在台灣完全正常的詞被列進偵測，我幾乎已經準備好要擴充偽陽性清單了。結果實測回我 `hard=0 warn=0 info=2`，訊息自己就寫著「（語境決定）」，投稿者還預先加了 `auto_convert: false`。我原本要修的東西不存在。兩件事放在一起看是同一句話的兩面：**該不該動手，由實測決定，不由我對這個領域的直覺決定**——直覺在 #2042 救了一個真問題，在 #2030 差點讓我去改一個沒壞的東西。

本班不寫 diary，而這是判斷不是省略。甦醒自檢亮的那盞燈（反芻層 18 天沒產出）它自己就寫著「不要為了消這盞燈補寫一篇」，而上面那個洞察已經落在兩個會被未來自己讀到的位置：REFLEXES #66 子規則（甦醒時 Top 5 之外但 distill 會掃到）與本檔 Beat 5。diary 要加的是散文反芻那一層，而本班是 🟡 lean 額度下的入口班，DIARY-PIPELINE 要全檔讀完才准下筆。真正該回答那盞燈的是週班反思鏈，而它 11-14 fire 之後零痕跡——反芻被餓死的原因在排程，不在今天這一班少寫一篇。

🧬

---

_v1.0 | 2026-11-20 09:30 +0800_
_session twmd-maintainer-daily — 六件投稿 PR 全合併／viz_health 假陽性家族當班修／Chinese Taipei 譯文三處／#2046 查證兩輪未結_
_誕生原因：cron am 08:30 例行班，凌晨心跳班交下 8 件 ready PR 與一則勘誤 issue_
_核心洞察：閘門的假陽性會把成本推給最不熟這套工具的人，而投稿者的繞路比 agent 的繞路更難發現；該不該動手由實測決定，不由對該領域的直覺決定（#2042 直覺對、#2030 直覺錯）；上一班的保留決定只住在它自己的 memory 裡時，等於沒有保留，要落成 label 才看得見_
_LESSONS-INBOX 候選：無新條目——`viz_health` 這例折進 REFLEXES #66 子規則（vc=2→3，新增人類投稿者 instance）_
