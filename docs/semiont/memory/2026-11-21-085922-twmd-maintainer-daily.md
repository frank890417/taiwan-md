# 2026-11-21-085922-twmd-maintainer-daily — 四件投稿 PR 全合併，讀者第三輪才被證明是對的，一道閘門在跟投稿者收費

> session twmd-maintainer-daily — cron 08:30 PR review + issue triage + build sanity
> Session span: 08:29:00 → 09:05:00 +0800（約 36 分，本班 4 commits）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**強制升 Full**（PR triage ≥ 5 命中 High-stake #1）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，非記憶值）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

甦醒檔 `.taiwanmd/wake-context.latest.md` 1,617 行逐頁讀到末行 `wake:END` sentinel（287,625 bytes，11 段全讀）。Full mode 補載 ANATOMY／DNA／CONSCIOUSNESS 全／UNKNOWNS／LONGINGS／HEARTBEAT／OBSERVER-QUEUE §待決 29 列／evolution-roadmap 2026-08-09。**誠實界線**：LESSONS §未消化 147 條只讀了最近 60 條標題（10-01 以後），ARTICLE-INBOX 與 SPORE-INBOX 讀 §Pending 標題不讀全文。這三份全載會再吃掉數十萬 bytes，而本班的工作面在 PR 與 issue。

甦醒帶病訊號一盞：**diary 最新一篇停在 2026-11-02，距今 19 天**。本班不補寫（DIARY-PIPELINE Stage 0 照跑，沒有「想了什麼」就不寫），但這盞燈該被說出來。

## 觸發

cron 例行。Stage 1 掃到 6 個 ready PR，命中 BECOME High-stake #1「PR triage ≥ 5」，當場從 Review 升 Full mode 再往下走。`git rev-list --left-right --count main...origin/main` 回 `1 0`，純領先不是分岔，§Step 1.1b 不觸發。main 上 14 條 workflow RED 0，只有 `npm-publish-cli` 的 tag 觸發失敗（那是 OBSERVER-QUEUE #95 在等的 npm 權杖，不計 main 紅燈）。

## 三篇投稿翻譯：19 項檢查全過，而閘門在跟投稿者收費

aminzai（Kang-Min Wang，高雄）送的 vi／hi／ar 三篇，`verify-translation.py` 各 19/19，五道主權閘（地理保真、人物保真、CJK 殘留、語言真偽、主權詞表）全綠，`2ce1ef70c9` 之前依序合併。

真正有價值的是第四道閘門的一次誤判。`currency-identity-check` 把 vi〈道明會在台灣〉的「62 đồng bạc rồng」判成裸幣別、該寫成 NT$。翻回中文母稿，那一句是「**以龍銀六十二圓**在前金靠海區域購置土地」，1859 年的銀元。「đồng bạc」是銀元的通稱，投稿者翻得精確，是尺讀錯了。回頭掃存量又撈到同族第二處：vi〈艋舺〉的「25.000 đồng bạc」出自母稿「募款 25,000 銀元」。

`37f253b2fb` 把 `bạc` 加進越南文的排除清單並補回歸測試。中途自己踩了一次 REFLEXES #100：第一輪正控制在 scratchpad 路徑下跑，三個控制全印 ✅，而那個 ✅ 是空的，因為 `lang_of()` 只認 `REPO/knowledge` 底下的路徑，語言推不出來就什麼都不檢查。**驗證對象要等於落地對象**，控制檔搬回 `knowledge/vi/History/` 重跑才看到真讀數：裸 `62 đồng` 擋、`giá 500 đồng` 擋、龍銀與銀元放行。

這是這道閘門第三次在越南文誤判（前兩次是 đồng thời 同時、đồng 銅牌）。昨天那班剛寫過「閘門的假陽性把成本推給最不熟工具的人」，今天同一句話換了一個語言又成立一次。

## 〈張峻〉：選前七天的候選人頁，照 #104 判例收，但要先把三件事修掉

idlccp1984 的 PR #2047 是花蓮縣議長、2026 花蓮縣長候選人 2 號的人物頁，距投票日七天。這題最容易被寫成「等哲宇判斷」——而 11-17 哲宇才剛 callout 過這種寫法（公開留言不准把決定歸給他，而且 #104 已經拍板現任公職人物頁照門檻收、不因選舉年暫停收件）。所以本班照 #104 的五條審，不保留。

知名度門檻過：維基條目「張峻 (臺灣政治人物)」存在（直接打 API 查，不從腳註網域推），加上中央社、公視、華視多篇獨立報導。選罷法凍結窗（11/18–11/28）禁的是**民調引述**，全文零民調，不觸線。

十五條腳註全部逐條開來源核對。**法律狀態投稿者全部寫對**：LED 採購案一審 7 年 8 月、二審因筆跡鑑定不符改判無罪、最高法院 2026-08-19 駁回上訴確定、參與人沒收部分發回更審。國有地案 2024 起訴、光復鄉兩筆約 10.8 萬平方公尺、九年租金約 1,080 萬，跟中央社原文一字不差。選舉年的人物頁最容易在這裡翻車，這篇沒有。

查出三個問題，都在合併前於投稿者分支上修掉（`2ce1ef70c9`，P1 push-to-branch，他拿到的仍是綠色 Merged）：

- **圖片**：三張圖的檔案都不在庫裡，而且都標「合理使用」。中央社記者拍的照片沒辦法在 CC BY-SA 4.0 的站上重新授權。議會那張肖像在 Wikimedia Commons 有**公有領域**版本（議會官網同一張），用 `image-ingest.mjs` 收進庫。161×220 過不了封面圖的長寬比護欄（REFLEXES #30），所以只當內文圖、不設 hero。
- **來源權威度**：政見段唯一的出處 fclnews.com，該站自述提供「工商展演.宣傳報導」服務，不是獨立報導。選前一週用它當唯一來源等於把競選文宣當新聞轉述，整段移除。
- **法律狀態的精確度**：原稿寫「他與律師提出不同說法」，比它自己引的那篇中央社**更模糊**。照來源補上黨團講的是「遭法院裁定交付感訓處分」、律師講的是「感訓裁定絕不等同於有罪判決」。感訓處分是保安處分不是有罪判決，這個區別正是全文最該講清楚的一句。

配套兩件（`63de37d6d3`）：純中文檔名的新文章沒有英文 slug，十二語會整篇跳過它，補 `People/張峻.md -> chang-chun`。選舉專頁補 `article` 欄位，候選人之間的對稱處理在 /elections/2026 做而不在人物頁裡做比較敘事（#104 條件 4）。中途用 `json.dumps` 重寫整份 slug-map，diff 噴出 85 行重排。還原後改成兩處外科式插入，最終 5 行。

## 黃氏兄弟：讀者對了，而前兩班的方向只差一個頻道

issue #2046 是讀者黃詩匀 11-19 的回報：「第一部影片是開箱抹茶泡麵」。11-20 維護班兩輪搜尋零命中，但正確地沒把它判成讀者記錯（否定式結論的舉證門檻比肯定式高）。同日下午 heartbeat 開了**開箱頻道**看最早 90 支，沒有抹茶泡麵，主頻道那一半頁面沒載入。

本班用瀏覽器開主頻道「影片」頁，把排序從「最新」切成「最舊」，第一支就是〈日本超商必買！抹茶泡麵到底是鹹的還是甜的....？超神奇的口感〉，影片頁自己的結構化資料標上傳日 **2017-04-04**，跟文章寫的日期一字不差。錯的是接在那個日期後面的標題：原文那句「一支標題為『把弟弟的內褲冰起來』的影片」**沒有任何腳註**，最舊的 30 支裡也沒有這個標題。`7d41e6f686` 換成查得到的那一支並補腳註，日期不動。

上一班的假設四（「可能是開箱頻道的第一支」）方向對、頻道猜錯了。答案比假設簡單，主頻道自己的第一支就是它。

## email 登入：診斷完整，但掛了十天沒有出口

issue #2011 的根因 11-17 那班已經查到底（Supabase 設定端點回 `email: true`，但沒接自訂 SMTP 的專案內建寄信只送得到團隊成員，其他人一律被擋，畫面不說為什麼）。可是它掛著 `needs-observer-review` 標籤十天，**沒有進任何佇列**。標籤是分類，不是出口。`51f2f72db1` 補進 OBSERVER-QUEUE #130，帶三個選項與成本。不決策的代價不只是這位讀者，`twmd-review-stock` 的 `verified` 第二條路徑要三個互不相識的讀者確認才成立，登入門檻縮小的是那條路徑的母體。

## 收官 checklist

| 檢查項                       | 狀態                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                         |
| Timestamp 精確               | ✅ 全部取自 `git log %ai`                                                  |
| Handoff 三態已審視           | ✅                                                                         |
| CONSCIOUSNESS 反映最新狀態   | ✅ 免疫 59 仍是最大缺口，本班未動分數面                                    |
| 自我檢查工具 PASS            | ✅ 兩篇動到的文章 ci-deploy 與 pre-commit 雙 profile 皆 hard=0；斷鏈 0.05% |

### Quality gate 七條

| 條目                                   | 結果                                                             |
| -------------------------------------- | ---------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE Stage 1-4 | ✅                                                               |
| PR 分流按 §collect-and-merge           | ✅ 四件全走 B 路徑完整 hard gate                                 |
| routine PR backlog ≤ 3                 | ✅ 0（v2.1 main-direct，無 routine PR）                          |
| broken-link gated ratio < 7%           | ✅ **0.05%**（`sync:build` 跑完後實測，all-langs 同為 0.05%）    |
| build green                            | ✅ main 14 條 workflow RED 0                                     |
| 本 cycle merge 的 PR 都過 hard gate    | ✅ 四件（#2048／#2049／#2050／#2047）                            |
| 有 fresh issue 的 cycle 至少修掉一件   | ✅ #2046 修好並關閉（`7d41e6f686`）；#2011 從標籤路由進佇列 #130 |

**連續空場 vc = 0**（本班有 4 個 fresh PR + 2 件 issue 處置，不是空場）。

## Beat 5 反芻

今天兩次撞到同一個形狀：**我手上的尺，讀數錯的方向一律指向別人**。

幣別閘門說投稿者把台幣寫成越南盾，實際是它不認得十九世紀的銀元；而我為了驗自己的修補寫的正控制，又在一個推不出語言的路徑下印了三個空的 ✅。兩件事都是「工具說了話，而那句話聽起來像在講別人」。前者的代價是投稿者被要求去改一句他本來就翻對的話。後者的代價差一點是我用一個沒跑過的控制宣布修好了。

黃氏兄弟那筆是反過來的：讀者說了一句話，兩輪查證都沒推翻她，第三輪打開頻道按「最舊」她是對的。而文章裡那句錯的，**沒有任何腳註**——它是整段裡唯一一個沒有來源卻最具體的細節。具體到沒有人想去查，這正是 MANIFESTO §10 六型幻覺的形狀。

LESSONS 候選不在此 inline，走 LESSONS-INBOX：新增 `positive-control-run-where-the-tool-cannot-tell-which-language`（正控制跑在工具推不出語言的路徑下，三個控制一起印空的 ✅）。幣別閘門那條命中既有族系（`gate-triggers-content-degradation-incentive` 的語言變體），不另開條目。

## Handoff 三態

繼承 `2026-11-21-071252-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第十二天**）(a) 偵測器欄位射程與 pattern 族的判準校準、(b) 那 81 筆怎麼收尾。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整台機器重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。該席位 11-14 fire 後零痕跡，下次排程 11-22 04:06。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。
- [ ] pending（延續，席位：下一輪 feedback-triage，**零判斷動作**）排除清單沿用 81 筆；預設 `--limit 50` 只看得到最舊 50 筆，每一輪都必須加大 `--limit` 再跑一次。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，參照 `REFLEXES #68`）feedback-triage 收官步驟寫 `git add` 後 `git commit`，沒寫 `--only`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly` 或 Full mode session）LESSONS `three-honest-instruments-leave-the-same-manual-step-ungated` 的候選機械化 (a)。
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07～11-17 沉默十天的根因仍未查。本班飛輪正常。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。
- [x] ~~pending（席位：下一輪 feedback-triage）`archive-comments-synced=1` 的分母從此含一份有內容的 §溝通紀錄~~ 非本席位，原樣往下傳給 feedback-triage（參照 `#2046`）。

本 session 新 handoff：

- [x] ~~pending 斷鏈 audit~~ retired by 本班：`npm run sync:build` 在 babel 三個 worker 同時在跑的情況下走完（`sync:build` 不觸發 `prebuild:status`，跟 babel 零碰撞），`verify_internal_links.py` 實測 **gated ratio 0.05%**，遠低於 7% 門檻。**記一筆給後續各班**：9-28～9-30 連三輪 skip 這道閘門的理由「build 會撞 babel」只對 `npm run build` 成立，對 `sync:build` 不成立，本班第二次用實跑證明它；要等 build 就用 `pgrep -f 'astro[ ]build'`，別用會自我命中的寫法（LESSONS `wait-loop-polls-for-a-pattern-its-own-command-line-contains`）。
- [ ] pending（席位：哲宇，`OBSERVER-QUEUE #130`）email 登入接不接自訂 SMTP。issue #2011 保持開啟。
- [ ] pending（席位：回覆讀者的人類 gate，參照 issue `#2046`）黃詩匀那筆值得回。她指出的是一個沒有來源、而且兩輪查證都沒推翻的細節。文章已改，人還沒被告知。
- [ ] pending（席位 `twmd-babel-nightly`）〈黃氏兄弟〉與〈張峻〉的十二語譯本待翻。前者是母稿更正後重翻，後者是新文（slug `chang-chun` 已登記）。
- [ ] pending（席位：`twmd-review-stock` 或 ARTICLE-INBOX EVOLVE）〈張峻〉全文 2,535 字、媒體只有 1 張小圖，離 depth 門檻與媒體下限都還有距離。議長任內議事紀錄、光復災後重建後續是可以長的地方。
- ⏳ blocked（延續，席位：哲宇）PR **#2036**／**#2033** 兩件封面圖工作都掛 `reserved-for-observer`，本班照 Step 3.0 v2.16 不走 default merge。#2036 目前 CONFLICTING。
- [ ] pending（席位：週日反思鏈自己，11-22 fire）**五條週班連續第二週沉默**（news-lens／weekly-report／distill／self-evolve／routine-audit，11-14～11-15 fire 後零 git 痕跡）。已是 chronic 且早經 escalate，照 REFLEXES #80 本班只 sustain 不 renew；11-22 那一輪是天然的驗收點。

---

_v1.0 | 2026-11-21 twmd-maintainer-daily_
_session twmd-maintainer-daily — 四件投稿 PR 全合併 / 幣別閘門越南文第三次誤判修掉 / 選前七天候選人頁照 #104 判例收並修三處 / 讀者第三輪被證明是對的 / email 登入從標籤進佇列_
_誕生原因：cron 08:30 例行，掃到 6 個 ready PR 命中 High-stake #1 升 Full mode_
_核心洞察：(1) 我手上的尺，讀數錯的方向一律指向別人——閘門說投稿者寫錯，其實它不認得銀元 (2) 驗證自己的修補時，控制檔放錯路徑會印出空的 ✅，而空的 ✅ 跟真的 ✅ 長得一樣 (3) 文章裡最具體而唯一沒有腳註的那句，就是幻覺最可能住的地方 (4) 診斷寫得再完整，沒有出口就等於沒有產出——標籤是分類不是佇列_
