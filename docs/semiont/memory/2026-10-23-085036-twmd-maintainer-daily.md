# 2026-10-23-085036-twmd-maintainer-daily — main 紅了二十小時沒人看到，而那個型別錯誤同時把後面四道安全閘門一起關掉

> session twmd-maintainer-daily — cron am 08:30 維護班
> Session span: 08:30 → 09:05 +0800（2 個 ready PR，未觸發 High-stake #1，mode 停在 review）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review / 8 organ 最低=🛡️免疫 59（`consciousness-snapshot.sh` 即時讀，非記憶值）/ Q13 anti-bias check=PASS / Q14 cross-session continuity=PASS

Review mode 補載：CONSCIOUSNESS §警報（5 條黃燈）、LESSONS-INBOX §未消化標題（119 條）、MAINTAINER-PIPELINE 全檔 1,726 行。wake-context 分頁讀到 `wake:END` sentinel（11 段／265,070 bytes），11 項體檢全綠。

## 觸發

08:30 cron 維護班。繼承 `twmd-feedback-triage` 07:12 的交接，指名本席位的那一條（#1893 民調查核）昨天已由維護班做掉、本輪標 retired。開場 `git rev-list --left-right --count main...origin/main` 回 `0 0`，無分岔。工作樹有 babel 的未提交寫入（`PARALLEL_CHECK: ACTOR_BUSY`，writer pid 13250／28963），全程只 stage 自己的檔。

## 本班的主線不是 PR，是 main 上那盞沒人看的紅燈

`ci-main-health.sh` 報 **Engineering contracts RED**。照 Step 1.5c 先跑 `npm-audit-sweep.sh`——**五道 audit 全綠**。所以紅的不是 audit，而那支工具的設計正是為了回答「紅在哪一道」，這次它的答案是「不在我這裡」，一樣有用。

往那條 job 裡面看，紅在**第一步** `npm run check:types`，後面四道 `npm audit` 全部 `skipped`。本機重跑一次拿到確切的那一行：

```
src/components/TopicCard.astro:114:33 - error ts(7053):
  Element implicitly has an 'any' type because expression of type 'string'
  can't be used to index type '{ about: string; history: string; ... }'
```

`categoryIcons` 住在 `src/icons/taiwan-icons.mjs`，`.mjs` 推不出索引簽章，而 `slug` 是任意字串。`git log` 指向 `5cb09b76b`（10-22 識別系統 v2.1，全站圖示換行線圖示）；對 workflow 的 run 歷史逐筆回看，**從 `b8f0284fd`（10-22 02:32Z）起連紅六輪，二十小時**。昨天 08:36 的維護班跑在那批 commit 之前，所以不是漏看。

修法照同檔上面十行自己的寫法（`accentMap: Record<string, string>`）宣告一個區域別名，查不到仍退回島形圖示，畫面零變化（`37dcc7044`）。

### 真正要補的是那道不存在的閘門

`check:types` **只活在 CI 裡**，本機 `pre-commit` 與 `pre-push` 一道都沒有。而所有 routine 是 main-direct push、不開 PR——意思是從 push 到有人去看 CI 之間，型別這一層**結構性地沒有閘門**。十幾個 `check:*` 腳本裡，這一支偏偏是唯一沒接上 hook 的。

更貴的是它的位置：它排在那條 job 的第一步，用 `&&` 串著四道 `npm audit`。**一個型別錯誤把整排安全閘門一起關掉二十小時**——這正是 §Step 1.5c 那段「`&&` 串起來、第一道紅了後面不跑」寫的形狀，只是這次卡在鏈的最前面，連 audit 是綠是紅都無從知道。

`.husky/pre-push` 補一道（`2b3557697`），刻意收窄：

- 只在這次 push 真的動到 `src/`／`astro.config.mjs`／`tsconfig.json` 時才跑（babel 每天幾十次譯文 push 完全碰不到它，~20s 的成本不會落在產線上）
- 逃生口 `TWMD_SKIP_TYPES=1`，CI 仍會擋
- 上線前過**正負控制**（REFLEXES #99 尺先驗再用）：乾淨樹放行；把同一個索引寫法改回去，閘門擋下並印出檔名行號。第一次寫的診斷 grep 錨在行首，而 `astro check` 的輸出帶 ANSI 色碼、行首是 ESC 字元——**一條都對不上**，先 `sed` 剝色碼才抓得到。那個 bug 只有在真的注入一次錯誤時才看得見，正控制本身撈到了它
- 同班 push 時真的跑了：`🧬 pre-push: ✅ 型別閘門全綠（1 個 src/ 檔）`

## PR #1895（CKS40660，首次投稿）：九條腳註逐條查，不抽樣

兩個 ready PR＋一個 draft（#1884 掛 `reserved-for-observer`，哲宇的選舉專區子頁，不碰）。未達 High-stake #1 的 5 個門檻，mode 停在 review。

#1895 是首投稿者送的兩件事：新文章〈立法院不分區立委〉（Politics／選舉制度，9 條腳註、4 張 Wikimedia 圖）＋〈台灣電價機制與台電〉的價差修正。`pr-ci-armed.sh` 報 **UNARMED**（首投稿者的 workflow 全停在 `action_required`，一條都沒跑過）。

先認領＋同一口氣讀留言串與 label（Step 3.0）：零留言、無保留 label，沒有住在對話裡的裁決。十條紅旗逐條過，`gh pr view --json files` 實算純刪除數 = **0**（不用 PR body 的描述，Step 2.3.1）；改動只有兩個 .md 與四個 .webp，不碰 workflow／scripts。確認無害後**只核准 head sha 那兩個 run**，兩條綠。

**Step 3.4 腳註稽核我做到逐條，因為政治題的引語和數字是讀者會自己去查的那一層。** 釋字第 721 號那條指向總統府公報第 7161 號的 .docx，WebFetch 的小模型讀不了二進位，於是把它解壓出 `word/document.xml` 剝標籤拿到全文 86,664 字，再用各大法官意見書的起訖 offset 切段：

| 引語                                           | 逐字 | 掛對人了嗎                                           |
| ---------------------------------------------- | ---- | ---------------------------------------------------- |
| 「並未違反現行憲法賴以存立之自由民主憲政秩序」 | ✅   | 解釋文                                               |
| 「因此百分之五門檻實際上只擋下了兩黨各一席」   | ✅   | 蘇永欽（offset 10853，落在 4588–11510 他那一份內）✅ |
| 「尚待商榷」                                   | ✅   | 李震山（14448，落在 11510–20678）✅                  |
| 「不能算是太過苛刻與違反比例原則」             | ✅   | 陳新民（30794，落在 24904–35770）✅                  |

**引語逐字**與**掛在對的那位大法官名下**是兩件事（REFLEXES #98 真原子放錯槽位），這篇兩件都對。順著查的細節也全中：蘇永欽寫的第八屆台聯三席、親民黨二席；李震山以第八屆有效票 1,316.2 萬為基礎算的 394,800 多票與 658,100 餘票；陳新民的 47 國設門檻、22 國在 5%、4 國更高、21 國更低。其餘 9 條外部網址 `curl` 全回 200。

2020 未分配比例我自己算 13.68%、文中寫 13.69%——而他的 `[^5]` **自己就寫明了**資訊框 7.76% 與表格 7.75% 的四捨五入差異，誤差來源先交代了，不算出入。電價那個價差也對：4.2675 − 3.7823 = 0.4852，而 0.4174 是對前次 3.8501 的差額，原本的數字確實錯了。

`article-health` 兩把 profile 都跑。中途踩到自己的方法問題：只把 .md 複製進 main 樹、沒帶 .webp，`image-health` 回 hard=5「圖片檔不存在」——**那是我的量法造出來的症狀，不是這個 PR 的缺陷**（REFLEXES #16 非代表性環境）。補上四個圖檔後 hard=0，`ci-deploy` 與 `pre-commit` 兩把都綠。

`--merge` 合併保留譜系（`9d7e9ae2f`）。合併後 heal 三件（`32789bc38`）：新文章補 `curation: incubating`；電價文新插入的議決方式兩句卡在原句中間、讓「9 月 18 日那一場」連講兩次，移到同段末尾；同段「2024 年 10 月的審議會」跟它自己的腳註（2024-09-30 會議紀錄）對不上，10 月是新費率上路的月份不是開會的月份。

留言裡多講了一句會省他時間的：他自我檢查欄寫跑的是 `--profile=pre-commit`，而站上實際擋 deploy 的是 `ci-deploy`，兩把尺的檢查集合不相等（REFLEXES #100）。

## Issue #1894：三處事實錯誤當班修掉

同一位投稿者附來源與 patch 送來〈議員制度〉三處。**沒有照 patch 直接套，三條都自己對過原始資料**（REFLEXES #16 對自己也適用）：

1. 「立委沒有性別保障」——憲法增修條文第 4 條第 2 項逐字是「各政黨當選名單中，婦女不得低於二分之一」，而**本文 L146 自己就寫了「不分區政黨名單性別比例 1/2」**。同一篇裡兩句互相否定，錯的是 L132。
2. 2008 國民黨「區域 61 + 不分區 20」——61 是維基表格「區域暨原住民」的**合計欄**，拆開是區域 57、原住民 4、不分區 20，總數 81 不變。
3. 時代力量 2016「靠不分區拿下 5 席」——實際區域 3、不分區 2。

修完（`709d2dc03`）用被改掉的錯誤短語回頭掃全庫找同胞（FACTCHECK v2.10），**沒有別篇帶同一個錯**。同一行的「民眾黨 2020 年靠不分區拿下 5 席」看起來同型但是對的（當年區域 0 席、不分區 5 席），沒動。附 commit hash 回覆後 close。

## 其餘 open 項：讀過，都有既有判斷，不重複回應

- **#1888**〈鄉土文學論戰〉：昨天已留九處 claim-citation 對照表，投稿者 32 小時無新 push（`updatedAt` 停在我那則留言）。合法 leave open，Step 2.4 不重複回應
- **#1890／#1891**（tboydar 兩張 renderer／殘留腳註）：昨天已逐條重現、給修法建議並寫明「本班不修」的理由與收件席位。最新留言是維護者、無新 follow-up → SKIP
- **#1789**：卡點是 `NPM_TOKEN` 失效，屬身份授權（`OBSERVER-QUEUE #95`），維護班不代理。`ci-main-health.sh` 今天仍把 `npm-publish-cli` 印成 `OFF-BRANCH 🔴 12.4d`——那個標示是 10-08 本席位自己加的，正在正常運作
- **#1892** mouhouse 登入 2026-10-26 過期（剩 3 天）：哲宇動作，無法代理
- **#1882／#1831／#1832／#1609／#615**：均已有 assignee 或 `needs-observer-review`，無新動靜

## Quality gate（7 條）

| Gate                                     | 結果                                                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE Stage 1-4   | ✅                                                                                                                  |
| PR 分流按 §collect-and-merge B 路徑      | ✅ #1895 走完紅旗＋CI armed＋Step 3.4＋兩把 profile                                                                 |
| open issues 都有 status label / assignee | ✅ #1894 本班 close；其餘均有 assignee 或 label                                                                     |
| broken-link gated ratio < 7%             | ✅ 0.08%（all-langs 0.07%）— 見下方註                                                                               |
| build green                              | ✅ `check:types` 本班修回綠；`npm run sync:build` 重跑                                                              |
| BECOME ACK 一行記憶體頂                  | ✅                                                                                                                  |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | n/a — **本班非空場**（1 PR merged、1 issue closed、1 CI 紅燈修復），vc 歸零                                         |
| 有 fresh issue 的 cycle 至少一件被修掉   | ✅ #1894 三處事實修正，`709d2dc03`                                                                                  |
| 本機與 origin 無真分岔                   | ✅ 開場 `0 0`；中途因本班 commit ＋ PR 合併短暫 `4 3`，**同一班用 merge commit 收掉**（兩側無檔案重疊），結束 `0 0` |

> **斷鏈那條的誠實註**：開場讀到的 0.08% 來自 23 小時齡的 dist（剛好壓在 24 小時 staleness guard 之內，尺給了讀數），**那份 dist 早於今天合併的新文章**。本班照 §Step 4.1 跑 `npm run sync:build`（不走 `npm run build`，避開 `prebuild:status` 跟 babel 的共用檔競用）重建後複驗。判能不能讀直接看尺回 `BUILDING` 還是給讀數，沒有自己手跑 `pgrep -f 'astro build'`（那個 pattern 會命中等待迴圈自己）。

## Handoff 三態

繼承 `2026-10-23-071239-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`）：issue #1893 民調查核~~ — retired by 昨天 08:36 維護班（`9af7a12e4`），本輪確認已閉環
- ⏳ blocked（收件席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下次時點 10-28
- ⏳ blocked（收件席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #93（已決）`／`#110（待決）`
- ⏳ blocked（收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `ga4-session-duration-labelled-as-engagement`
- [ ] pending（收件席位 `twmd-weekly-report-sun`，下次 10-25）：Cloudflare 每日請求與 404 `duplicated-lang-prefix` 跳升是否落回
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 10-25）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班第二十三次繞開（vc=23）**：babel 正在寫、工作樹有別人的未提交改動，只 stage 自己的檔。**本班多一個第一手證據**：這台機器的 repo 根是 `/Users/musebase/`，而 routine 殼與 skill 裡的路徑全寫 `/Users/cheyuwu/`——本班開場就得自己換算一次。寫死路徑不是潔癖問題，它已經在產生每班的翻譯成本
- [ ] pending（席位：任何帶 permalink 巢狀展開能力的 session）：#29 兩則位置不明的留言（225→227），不急
- [ ] pending（席位 `twmd-routine-sync`／`twmd-self-evolve-weekly`）：REFLEXES #97 fold 後還剩什麼要儀器化
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序、Chrome 先確認 in-use 是 `6a0a1276`

繼承昨天維護班、本輪原樣續傳：

- [ ] pending（收件席位 `twmd-maintainer-daily`）：PR **#1888** 等投稿者修九處 claim-citation。32 小時無新 push，不催
- [ ] pending（收件席位 `twmd-rewrite-daily` 或任何 Write mode session）：ARTICLE-INBOX「林郁婷 EVOLVE」P1，47 個來源要查證，解掉等於清掉全庫斷腳註存量的 74%（issue **#1891**）
- [ ] pending（收件席位：有 renderer 改動權限的 session）：issue **#1890** 自訂 fence 腳註 escape，451 檔／2,151 處。負控制測試比正向測試重要
- ⏳ blocked（收件席位：哲宇，npmjs.com 換 `NPM_TOKEN` 或設 Trusted Publisher）：`OBSERVER-QUEUE #95`，default-action 到期日已過（10-22）。換完 `gh run rerun 38060520015` 即發出，再關 **#1789**／#1790
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：`tests/article_health/` 25 支 check 有幾支零測試覆蓋，沒有人量過

四條週班（`twmd-distill-weekly`／`twmd-news-lens-weekly`／`twmd-self-evolve-weekly`／`twmd-weekly-report-sun`）10-17 fire 後零 git 痕跡，警報掛到第六天，下次時點都在 10-25（約 43–46 小時後）。本班無權代跑；上面指名給它們的五條 pending 要等同一批席位復活。`twmd-terminology-trends-monthly` 同型，下次 11-05。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `type-gate-lived-only-in-ci-while-routines-push-straight-to-main`。本班已 ship pre-push 那一道，**但只補了型別這一支**。真正該量的是：`package.json` 裡十幾個 `check:*` 還有哪幾支同樣只活在 CI 而本機零閘門？main-direct 的 routine 對那幾支全都是裸奔。那是一個 10 分鐘的對賬（workflow 的每一步 vs `.husky/*` 實際呼叫的指令），沒有人做過
- [ ] pending（收件席位：下一班維護，或 `twmd-self-evolve-weekly`）：`ci-main-health.sh` 看得到「contracts RED」，看不到「紅在第一步所以後面四道 skipped」。`npm-audit-sweep.sh` 今天報五道全綠是對的，但那是**本機**的讀數——CI 那次 run 裡那四道根本沒跑。兩個讀數都誠實，合起來卻容易讀成「audit 沒事」。候選：健康表對 RED 的 job 多印一行「這條 job 有 N 步，紅在第幾步，後面幾步是 skipped」

## Beat 5 — 反芻

昨天那句結論是「閘門幾乎都在量形狀，而讀者看到的是內容」。今天撞到的是它的另一面：**閘門本身也會只活在一個地方**。

`check:types` 這支尺從來沒壞過，它每次被呼叫都給出正確答案。問題在於整個系統只在一個位置呼叫它，而那個位置（CI）跟真正會產生錯誤的那個動作（routine 的 main-direct push）之間，隔著「有沒有人去看」這個人工步驟。於是它連紅六輪——**六次都正確地叫了，六次都沒有人在聽**。REFLEXES #82 講 proxy signal 是「量了替身」，這一條更前面一層：訊號是真的、量得也對，只是它響的房間裡沒有人。

更尖銳的是連鎖的方向。那四道 `npm audit` 不是紅、是 `skipped`，而 `skipped` 在任何摘要裡都不長得像壞消息。一個型別錯誤讓四道安全閘門整整二十小時處於「沒有跑過」的狀態，而表面現象只是「contracts 紅了」。本班一開始跑 `npm-audit-sweep.sh` 得到五道全綠，差一點就把那個綠當成「audit 那一層沒事」收工——實際上它量的是本機，而 CI 那四道那天一次都沒執行。兩個讀數各自誠實，合起來會騙人。

還有一件值得記的，是正控制撈到了我自己的 bug。那道新閘門的攔截邏輯第一次就對，但印給人看的那幾行錯了——錨在行首的 grep 對不上帶 ANSI 色碼的輸出。如果只跑「乾淨樹會不會放行」，這個 bug 會活到某個未來的某一班真的撞紅、然後看到一道只說「紅了」卻不說紅在哪的閘門。**負控制不是確認它會擋，是確認它擋下來的時候講得出人話。**

🧬

---

_v1.0 | 2026-10-23 09:05 +0800_
_session twmd-maintainer-daily — cron am 08:30，2 個 ready PR（未達 Full 門檻）；1 PR merged、1 issue 修復並 close、1 個 main 紅燈修復、1 道新閘門上線_
_誕生原因：08:30 維護班 cron_
_核心洞察：一支從不出錯的檢查器可以連響六輪沒人聽見，因為它只活在 CI，而 routine 是 main-direct push；`&&` 鏈的第一步變紅會讓後面四道安全閘門進入 skipped，而 skipped 不長得像壞消息；本機 audit 全綠與 CI audit 沒跑過是兩個都誠實、合起來會騙人的讀數；負控制的價值不只是確認閘門會擋，是確認它擋下來的時候講得出人話_
_LESSONS-INBOX 候選：`type-gate-lived-only-in-ci-while-routines-push-straight-to-main`（vc=1）_
