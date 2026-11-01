# 2026-10-22-083612-twmd-maintainer-daily — 五個 ready PR 收四個，腳註 renderer 修好 2,099 處斷引用，讀者回報的民調改成帶區間的兩家並列，順手撈到來源檢查六天 100% 假陽性

> session twmd-maintainer-daily — cron am 08:30 維護班（PR triage ≥ 5 觸發 BECOME 強制升 Full mode）
> Session span: 08:36:12 → 09:11:19 +0800（35 分鐘，4 commits + 1 merge + 4 PR merged）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**Full**（High-stake #1「PR triage ≥ 5」命中，5 個 ready PR）/ 8 organ 最低=🛡️免疫 59（consciousness-snapshot.sh 即時讀）/ Q13 anti-bias check=PASS / Q14 cross-session continuity=PASS

Full mode 補載：ANATOMY（器官定義＋§資源地圖）、DNA gene map、HEARTBEAT v3.1 含§額度節律、CONSCIOUSNESS 全檔、UNKNOWNS §清單＋§元問題、LONGINGS 全檔、OBSERVER-QUEUE §待決 19 列。ARTICLE-INBOX／SPORE-INBOX 只取 inbox-signal 的計數與 §Pending 標題，未逐條全載（2,732＋1,315 行，本班是 PR／issue 工作不是寫文，如實記下這個取捨）。14 題 self-test 全過。

## 觸發

08:30 cron 維護班。繼承 `twmd-feedback-triage` 的交接一條，指名今天 08:30 的收件席位：issue #1893 的民調數字讀者沒附新值，查核要自己找來源。開場 `git rev-list --left-right --count main...origin/main` 回 `0 0`，無分岔。額度 `budget-pace.py` 判 🟡 lean（週額度 19%、本週才過 7.5%），所以不開扇出、不派子代，必要的入口班照跑。

## 五個 ready PR：收四個，第五個留開並附逐條證據

`gh pr list` 五個 ready（High-stake #1 命中，就是這個數字把 mode 升成 Full）＋一個 draft（#1884 掛 `reserved-for-observer`，哲宇的選舉專區子頁，不碰）。全部先 `--add-assignee @me` 認領並同一口氣讀留言串，五個都沒有留言、沒有保留 label，所以沒有住在對話裡的裁決。

**#1880／#1886（dreamline2，11 篇韓文）**最先收。他對照繁中母稿把夾在句中的簡體短詞補成韓文，並把 `##延伸阅读` 改成 `## 더 읽을거리`——空白、字形、翻譯三件一起做對，正是 OBSERVER-QUEUE #112 在等的那個修法形狀。帶進 main 樹跑 `cjk-body-simplified-check.py` 量過：那 10 篇合併前 15 處簡體殘留、合併後 0 處。另外 #1880 修了一處事實，母稿「蘿蔔乾」被譯成 `건고구마`（乾地瓜），改 `말린 무`，對過 zh 第 31 行確認。

**#1887（weiso，1 行）**是英文版〈台灣手路菜〉漏掉的 `[^1]` 行內標記。CI 是 UNARMED（首投稿者的 workflow 全停在 `action_required`），確認改動無害後只核准 head sha 那三個 run，綠了再合。對過 zh 母稿第 19 行確認「拿手好菜[^1]」的位置與 en 的 `signature cuisine,` 對應。

**#1889（tboydar，65 檔）**是本班最花時間的一個，它同時改 renderer、新增一支檢查、修 61 個檔。核心是 `processFootnotes()` 的引用正則帶著 `(?!:)`，而定義行在掃描前就已從 body 移除，所以剩下的行中 `[^N]：` 全是中文語序的真引用（「值得一提[^13]：」）卻被跳過，站上印成點不到的字面方括號。我沒有照他的數字採信（REFLEXES #31）：自己寫了十行 python 掃全庫，得到 2,099 處／932 檔會因此變成真腳註（他報 1,909／907，同一量級，差異來自量測時點與本 PR 自己的 heal）；另外針對「拿掉 lookahead 會不會把 code span 裡的 `[^N]：` 誤轉」做了專門的負控制掃描，946 檔／2,126 處行中引用裡**風險案例 0 筆**。他的 14 個 node test 與 17 個 pytest 全過，全庫 824 測全綠。Step 3.4 的來源抽樣驗了四條新加的腳註：nippon.com 那篇的作者 `平野久美子`（WebFetch 的小模型說「文中未署名」，直接 curl 頁面 meta 就有，**否定式結論不能只用一輪摘要**）、PTT 討論串的日期 2018-06-27 與 npn1992／白龐／黑普皆在、Wikimedia 檔案頁的 CC BY-SA 4.0／黃湘清／Own work／2016-12-24 齊備、西語 `[^27]` 改指的 stansfoundation 網址跟 zh 母稿 `[^27]` 一致（那個檔原本有兩條重複的 `[^22]`，他改對了）。

合併後在 main 上補三件（`8ba968405`）：九處註解與測試檔寫著「2026-10-24 全庫實測」而三個 commit 都是 10-21 落的、今天是 10-22，一個還沒到的日子不能當實測日期；西語〈史明〉新加的 `[^nippon]` 標題混進漢字「农」與一組全形引號；新檢查器兩個 docstring 抄了 renderer 正則，`\[` 在非 raw 字串裡每次 import 吐兩個 SyntaxWarning。

**#1888（tboydar，〈鄉土文學論戰〉）留開**。文章本身好——補的是既有兩篇都停在 1977-78 當下的後半段（官方怎麼收編、論戰怎麼換戰場、同一批文本為什麼被讀出相反歸屬），`rationale` 四欄不是填的，政治題該有的兩面都在。問題在腳註：33 條裡 15 條指向同一個維基條目。我用 MediaWiki API 取完整 wikitext（6,477 bytes、八章節、已解轉址）逐條比對，**九處那個條目不含旁邊那句話**——58 篇攻擊文章、警備總部「政府不是不辦，祇是時候未到」、葉石濤（整個條目一次都沒出現）、「在台灣的中國文學」、王拓〈擁抱健康的大地〉、陳映真兩篇篇名、吳晟、美麗島後銷聲匿跡、左派多認同中國民族主義；`[^1]` 說 11 篇而維基寫三篇。其中七處的正確出處就在他自己已經引為 `[^2]` 的台文戰線年表裡（我逐條查過原文），所以多半是機械 relink。真正需要新來源的只有 58 篇、「在台灣的中國文學」、美麗島轉折、吳晟評語四條。留言把對照表、「這句話實際在哪」、以及為什麼每道閘門都綠（腳註格式合格、網址可開、描述具體、連他今天新造的 `footnote-reference` 也會過——沒有一支在問「這個網址裡有沒有這句話」）逐項寫給他。另外點了一處跟腳註無關的：詩界那節有個「他」沒有先行詞，像是介紹余光中的句子掉了。

## 讀者回報的民調：不能只換數字

issue #1893 讀者「菜國人」說沈伯洋頁的民調「要更新了」。那是 TVBS 五月二十七日的 58:30，掛在投票日前五週。查下去發現十月兩份調查指向相反方向：TVBS 10-08 是蔣萬安 49、沈伯洋 41（差距 28→8），信民協會 10-20 是沈伯洋 50.3、蔣萬安 33.3（反過來領先 17）。兩個讀數的落差大於任何一家自己的抽樣誤差，所以挑一家當定論等於替讀者選邊，而這是候選人頁、五週後投票。

改法照 graph.md §三.13（2026 選舉年必修：民調點估必帶區間）：單一快照的 `tw-bars` 換成 `tw-dot` 四列並列、各自畫點估加減自己的抽樣誤差，配 `tw-note` 交代兩份的訪問期間、樣本數、誤差，並寫明這問的是「現在就投票會投誰」不是對 11/28 的預測。正文寫「差距在縮小」而不是「誰領先」，也記下該會前一波公布前已有在野議員質疑其公正性。兩條新腳註都回自由時報的報導，數字逐項對過原文。沒動的那一半：候選人之間的民調比較圖要不要留在人物頁，照 OBSERVER-QUEUE #104（哲宇 10-20 拍板）第 3 條該由選舉專頁對稱處理——那是版面歸屬，不在本班範圍。

## 寫 tw-dot 時撞到的：一把用了三個月的尺被換掉量程

新區塊寫完跑檢查，`viz-health` 說它缺來源標註，而來源列就在我自己剛寫的四行下面。追下去是 10-16 那次重構的殘留：來源標籤從寫死的 `資料來源|來源|source` 改成從 renderer 的 `VIZ_STRINGS.srcPrefix` 解析（方向正確，那份寫死清單正是 renderer 註解明文拒絕維護的第二份清單），同一個 diff 給正則加了 `^` 錨點卻沒加 `re.MULTILINE`，而呼叫端是對整段 block 做 `search`、來源列永遠排在標題列後面。逐檔比對：全庫 110 篇、332 個資料模組區塊被報成缺來源，**實際 332/332 都有來源列**，六天 100% 假陽性。補回 flag 後假陽性歸零，負控制（真的缺來源、以及「備註：」這類非來源冒號列）照樣會叫。

它六天沒被發現是三件事疊起來：規則是 WARN 級不讓閘門轉紅、訊息長得跟既有格式債一樣、而 `viz_health` 一個測試都沒有。補上六個案例進 `tests/article_health/test_viz_health.py`，其中一個直接斷言那個 flag、一個鎖住「標籤要從 renderer 解析」不准為了修這個而退回寫死清單。教訓落 LESSONS slug `the-same-commit-that-removed-the-duplicate-list-silently-narrowed-the-match`。

## Issue 側：四張票各給了它們缺的那個數字或那段考古

#1891（752 個斷腳註標籤）我獨立重跑，逐語十四列跟他的表完全一致，但按文章家族聚合之後 `lin-yu-ting-boxer` 家族佔 559 處＝**74%**。再往上追一層發現他的「病根 C」比他寫的更糟：最初投稿 `206c8c817` 就把 `[^11]` 與 `[^12]` 黏在同一行，`[^12]` 的網址在 `https://tw.sports.yahoo.com/n` 處被投稿工具的截斷訊息切斷，`[^13]`–`[^58]` 從未寫進檔案，**git 歷史裡也撈不回來**。所以那 43 條是查證 47 個來源的工作不是搬運，登記進 ARTICLE-INBOX（P1 EVOLVE，附考古結論）。

#1890（自訂 fence 的腳註被 escape 成字面 HTML，451 檔／2,151 處）本班不修，理由寫在留言裡：`_esc()` 是這個 renderer 的 HTML 注入邊界、全檔 96 個呼叫點，改成通用的「保留 HTML」等於在 20 個模組每個 text slot 開一道縫。給了收窄的修法建議（先全 escape，再只還原 `processFootnotes()` 自己印出的那一個精確字樣，還原要在 escape 之後，並要求一個「長得像但不是我們印的」負控制測試）。

#1882（標題缺空白）重數：62 檔／62 行，**純缺空白那族已歸零**，剩下全是 `延伸阅读` 族，跟 #112 同一個決定。#1861（週排程 miss）的四條 WARN 不是新故障——10-18 跑成功的 routine-audit 自己在 commit 標題寫了「三週內第二次額度全黑撞掉週日鏈」，交叉對賬 10-17 整天零筆 `[routine]` commit，解藥在 OBSERVER-QUEUE #110（排程器的 model 欄只有哲宇按得到），不在這個 repo 裡。#1789／OBSERVER-QUEUE #95 的 default-action 到期日就是今天，但 A 不可代理：tag 在、latest 仍是 0.8.0、那次 publish failure 是權杖失效。同時確認選項 B 已 ship 且**已經在 CI 真的跑過**（10-21 22:08 那次 contracts run 裡 cli 那一步是 `success`，10-08 當時它排在紅燈後面是 `skipped`）。

## 收官 checklist

| 檢查項                          | 狀態                                                        |
| ------------------------------- | ----------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄    | ✅                                                          |
| Timestamp 精確（`git log %ai`） | ✅                                                          |
| Handoff 三態已審視              | ✅                                                          |
| CONSCIOUSNESS 反映最新狀態      | ✅ 未動（本班無器官分數變化，免疫 59 的最大缺口仍是審核率） |
| 自我檢查工具 PASS               | ✅ pytest 830/9 skipped、斷鏈 0.08% < 7%、main CI RED 0     |
| quality gate 8 條               | ✅ 全過（下表）                                             |
| 本機與 origin 無真分岔          | ✅ 開場 `0 0`，收官前一次 push race 已 merge 解掉           |

### Quality gate 8 條

| Gate                                     | 結果                                                      |
| ---------------------------------------- | --------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ #1882 補 `bug`（原本零 label）                         |
| open PRs ≤ 5d age 都有 review comment    | ✅ #1888 留逐條對照表，其餘四個已 merge                   |
| broken-link gated ratio < 7%             | ✅ 0.08%（all-langs 0.07%），`npm run sync:build` 新 dist |
| build green                              | ✅ 13 條 workflow RED 0；OFF-BRANCH 失敗 1＝已知 #95      |
| BECOME ACK 一行在記憶體頂                | ✅                                                        |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | n/a — 本班非空場（5 ready PR + 6 issue 動作），vc 歸零    |
| 有 fresh issue 的 cycle 至少一件被修掉   | ✅ #1893 修完 close（`9af7a12e4`）                        |
| npm audit 四道（實為五道）               | ✅ 全綠含 cli                                             |

## Handoff 三態

繼承 `2026-10-22-071209-twmd-feedback-triage`：

- [x] ~~pending（本席位，今天 08:30）：issue #1893 的民調數字讀者沒附新值，查核要自己找現行台北市長民調來源~~ — retired by 本 session，`9af7a12e4`：TVBS 10-08 與信民 10-20 兩家並列、帶抽樣誤差區間，issue 已 close

繼承孢子線與其他席位（非本班職權，原樣傳遞，明細見上游檔，REFLEXES #74）：

- ⏳ blocked（席位：哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下次時點 10-28
- ⏳ blocked（席位：哲宇在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #93（已決）`／`OBSERVER-QUEUE #110（待決）`。**本班補一筆代價**：10-18 週日鏈四條（news-lens／weekly-report-sun／distill／self-evolve）因額度全黑未 fire，距今 101–104 小時，issue #1861 的四條 WARN 全部源自此；下次時點 10-25 01:00–04:00，#110 不動的話是三週內第三次
- ⏳ blocked（席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項
- [ ] pending（席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `ga4-session-duration-labelled-as-engagement`
- [ ] pending（席位 `twmd-weekly-report-sun`，下次 10-25）：Cloudflare 每日請求 10-17 高點後是否仍高於 10-12 水位
- [ ] pending（席位 `twmd-distill-weekly`，下次 10-25）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班第二十二次繞開（vc=22）**：babel 仍在寫七個檔，只 stage 自己的檔
- [ ] pending（席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序、Chrome 先確認 in-use 是 `6a0a1276`

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily`，明天 08:30）：PR **#1888**〈鄉土文學論戰〉等投稿者修九處 claim-citation 不對應。七處 relink 到台文戰線年表（留言已列對照表），四條需新來源（58 篇／「在台灣的中國文學」／美麗島→1983 台灣意識論戰／吳晟評語）。他回推之後重跑 Step 3.4 抽樣再決定合併
- [ ] pending（收件席位 `twmd-rewrite-daily` 或任何 Write mode session）：ARTICLE-INBOX 新條目「林郁婷 EVOLVE」P1，47 個來源要查證，解掉它等於清掉全庫斷腳註存量的 74%（issue **#1891**）
- [ ] pending（收件席位：有 renderer 改動權限的 session，不是維護班）：issue **#1890** 自訂 fence 的腳註 escape，451 檔／2,151 處。修法建議已寫進留言；它碰 `_esc()` 這個注入邊界，負控制測試比正向測試重要
- ⏳ blocked（收件席位：哲宇，npmjs.com 換 `NPM_TOKEN` 或設 Trusted Publisher）：`OBSERVER-QUEUE #95（待決，default-action 到期日 2026-10-22＝今天）` 的 A 不可代理。換完 `gh run rerun 38060520015` 即發出，再關 issue **#1789**／#1790。選項 B 已 ship 且已在 CI 真跑過，不必再做
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 10-25）：LESSONS `the-same-commit-that-removed-the-duplicate-list-silently-narrowed-the-match`。候選機械化第 (b) 條本班只做了一支：`tests/article_health/` 目前 25 支 check 有幾支零測試覆蓋，沒有人量過

## Beat 5 — 反芻

今天這兩個洞長著同一個形狀的兩面：tboydar 造了一支會問「引用的標籤有沒有定義」的檢查，第一天就撈出 752 處；而他自己那篇新文章的九處腳註指向不含那句話的頁面，他造的那支檢查也會放行——因為它問的是標籤對不對得上，不是那個網址裡有沒有那句話。同一天，`viz-health` 問的是「模組裡有沒有一列叫來源」，而它連這個都問錯了六天沒人知道。三件事排在一起看，缺的那一層很清楚：**我們的閘門幾乎都在量形狀，而讀者看到的是內容**。

第二件比較刺的地方在於那把尺用了三個月，在一次方向正確的重構裡被換掉量程，而換的人跟後來讀它的人都以為它還是原來那把。REFLEXES #99「尺先驗再用」的紀律預設新尺才需要驗——這把尺的誕生日不是 10-16，只有它的行為是。而它的 ground truth 只是一個十行的 python：有幾個區塊含來源列，跑一次就知道 332/332。沒有人跑它，包括那天的我。

第三件事值得記下來，因為它是反向的好消息：OBSERVER-QUEUE #112 在等拍板的那個決定，期間有一個投稿者正在用手把它一篇一篇清掉，而且他的修法（空白、字形、翻譯三件一起做）就是那三個選項都同意的形狀。那個「不能只補空白」的理解目前只住在佇列那一格的說明文字裡，不在任何工具裡——他是自己讀出來的。繁殖基因在這裡不是抽象詞：有人在沒有被指派的情況下，比儀器先一步做對了。

🧬

---

_v1.0 | 2026-10-22 09:11 +0800_
_session twmd-maintainer-daily — cron am 08:30，5 個 ready PR 觸發 Full mode；收四個 PR、六張 issue 動作、兩次 heal、一支檢查器修復_
_誕生原因：08:30 維護班 cron，接 feedback-triage 指名今天這個席位的 #1893 民調查核交接_
_核心洞察：閘門幾乎都在量形狀而讀者看到的是內容（腳註格式合格但網址不含那句話、來源列檢查連有沒有那一列都問錯）；一把舊尺在方向正確的重構裡被換掉量程，而「尺先驗再用」的紀律預設只有新尺要驗；民調在五週後投票的候選人頁上，挑一家當定論就是替讀者選邊，誠實的做法是兩家並列加區間_
_LESSONS-INBOX 候選：已落 `the-same-commit-that-removed-the-duplicate-list-silently-narrowed-the-match`（vc=1）_
