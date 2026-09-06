# 2026-09-06-085745-twmd-maintainer-am — 讀者說我們漏了一件事，站上其實寫得很完整，只是沒有一條路通到那裡

> session twmd-maintainer-am — cron routine，每日 08:30 maintainer cycle
> Session span: 08:57:45 → 09:2x +0800（9 PR merged + 2 自有 commit + 3 則對外留言）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**full**（Stage 1 ready PR 10 命中 High-stake #1「PR triage ≥ 5」，依 §1b v2.8 只計 `isDraft:false` 計得 10、draft 0，**這次是真的到門檻**）/ 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，黃燈自 2026-07-05 未解）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

每日 maintainer cycle。上一輪 `twmd-feedback-triage` 07:09 的 handoff 只寫一句：issue #1678 交給 08:30 收割。實際到手的比那句話多——昨天 aminzai 送了九篇翻譯進來。

**今天不是空場**，連續空場 vc 歸零重計。

## Stage 1 表

| 項目             | 數字                                       | 備註                                                           |
| ---------------- | ------------------------------------------ | -------------------------------------------------------------- |
| open PR          | **10 ready / 0 draft**                     | 9 篇 aminzai 翻譯 + #1453 學測專題（哲宇已拍板走獨立 session） |
| open issue       | 4                                          | #1678 新進、#1609 等讀者補出處、#1440、#615 umbrella           |
| discussions      | 11                                         | 無 >48hr 未回應者                                              |
| past 24hr commit | 10 條 routine fire                         | 晨鏈全綠                                                       |
| build / CI       | **6 條 workflow 全 success on main**       | 用 group-by 全表問，不點名（2026-09-03 補的那條）              |
| PR CI armed      | **10/10 ARMED**，UNARMED 0 / NO-WORKFLOW 0 | `pr-ci-armed.sh`                                               |
| broken-link      | **gated 0.29% < 7%**（all-langs 0.26%）    | PASS                                                           |
| 免疫器官         | 🛡️ 59 黃燈                                 | 漂移中，owner = self-evolve-weekly                             |

## 九篇翻譯：ratio 對賬全過，兩個警告是中文原文自己的洞

aminzai（Kang-Min Wang，2009 年帳號、34 篇 merged）九篇一批：de ×3、id ×3、hi ×2、ru ×1。

紅旗掃描時三篇亮燈——`ah-po-iron-eggs` 的 `author: 'Taiwan.md'`（紅旗 #7 偽造）、`bunun-pasibutbut` 的 `featured: true` + `lastHumanReview: true`（紅旗 #6 投稿者自設）、`national-cultural-memory-bank` 的 `author: 'idlccp1984'`。**三個都不是紅旗**：逐篇對中文 SSOT，三個值都是原文就有的，翻譯忠實鏡射而已。全站 de/hi/id/ru 2182 篇裡 389 篇帶 `featured: true`，鏡射就是慣例。紅旗 #6/#7 抓的是投稿者「自己設」，不是翻譯「照抄 SSOT」——差別在這裡，掃 diff 的 grep 分不出來。

結構對賬九篇全過（章節／腳註／URL 數對原文一個沒少，字元比 2.51–3.44 落在健康帶），`article-health --profile=ci-deploy` 九篇 hard=0。

兩篇亮 warn：`pork-heart-vermicelli` 腳註等級 C、`taiwan-sauces-and-seasonings` 腳註等級 F（引用荒漠）。**去對中文原文，一模一樣的警告**——`豬心冬粉` C、`台灣醬料與調味` F。TRANSLATION 上游檢查第一條就是這個：原文沒腳註不是翻譯者的錯，治原文優先。照樣 merge。（`台灣醬料與調味` 本來就在 ARTICLE-INBOX 的 0 腳註三月清單上。）

診斷全程用 `git show refs/twmd/prN:path` 把內容帶進 main 樹跑，沒 checkout 任何 PR 分支（Stage 2 診斷紀律）。還原時九個檔全是 `??` 未追蹤才 `rm`——先確認過不是 main 既有檔（LESSONS `cleanup-step-assumes-the-file-is-new` 那條的反向）。

九篇 `gh pr merge --merge` 全部 MERGED，譜系保留。Step 3.7 burst 期規則：九篇一則累積留言，不逐 PR 洗通知。

## #1440：修好了十天，沒有人回去關

哲宇 9/5 拍板採納選單「數據」→「資料」，`a3f3288e0` 同日就 ship 了——四個區段品牌字串改掉、兩處真的在指數值的用法正確保留、而且加了 `check-ui-terminology.py` 接進 `UI language gate`，往後 TERMINOLOGY tier B 的詞出現在介面會在 CI 被擋。

**沒有人回去貼 commit、關 issue**。最後一則留言停在「改好落地時在這裡貼 commit 再關」。

這是 §神經迴路那條「stale issue = 對外失聯」的又一個 instance：對自己失憶是沒寫 memory，對外界失聯是沒關 issue。回報者程乙路等了三輪，東西早就在他每天看的那個選單上了。

去正式站確認過（nav「資料 📊」、footer「資料台灣」），貼 commit 表 + 說明那道新閘門，close。

## #1678：讀者是對的，而我們早就寫了

讀者蕭宇哲說〈生態多樣性〉該補遊蕩犬貓與犬小病毒的威脅，附了窩窩的石虎專題。

**判斷**：跨源查證，成立，而且力道比回報寫的更強——陳貞志（屏科大）2015–16 路殺石虎 13 隻中 11 隻驗出犬小病毒；另一組 17 隻 82.4% 陽性、四型病毒基因序列跟家犬家貓身上一致；**「感染小病毒的石虎，路殺機會高於未感染個體的 25 倍」**。收容所遊蕩動物約九成陽性。犬殺記錄在石虎、穿山甲、山羌，壽山山羌銳減九成。四源交叉：窩窩、環境資訊中心、報導者、公視。

**追上游**——這則的價值全在這一步。站上不是沒寫，是寫得很完整：`台灣石虎保育.md` 第三節標題就叫〈犬殺：最被低估的威脅〉，腳註引的**正是讀者自己附的那個窩窩專題**。

那讀者為什麼會覺得沒寫？因為他讀的〈生態多樣性〉是 2026-03-21 的概覽舊文，`body-internal-links` 量出來 **正文站內連結 0 個**，整篇一條路都沒有。他在那裡讀到石虎，那段只講路殺跟棲地破碎化，然後就斷了。

**缺的不是知識，是通往知識的路。**

**執行**（`d8646a2a9`）：石虎段補一條內文連結指向〈台灣石虎保育〉，補上整篇缺席的 `## 延伸閱讀`（七條深度條目）。正文站內連結 0 → 1，`link-target` 七個目標全部存在，`article-health --profile=ci-deploy` hard=0。

**明確寫出沒做什麼**：外來種段仍然只有小花蔓澤蘭／福壽螺／紅火蟻，遊蕩犬貓一個字都沒有；石虎段仍把路殺全歸因於棲地破碎化。那是正文實質改寫（要動敘事骨架 + 整套腳註，該篇目前零腳註、2091 字），**走 REWRITE 不在 maintainer heal 範圍**——這是邊界，不是省略。查好的四源與 25 倍那個關鍵因果全部寫進 ARTICLE-INBOX P1 entry，接手的人不用重查。issue 保持 open 等 EVOLVE ship。

## 這輪撞到的結構問題

`body-internal-links` plugin 9/5 才上線，全站量出 **958 篇（85.5%）正文零連結**，工單 `internal-links-top50-2026-09-05.md` 依 GA4 流量取前 50 篇。

**〈生態多樣性〉不在那 50 篇裡**，流量在切線以下。工單 9/5 產出，9/6 就出現一個落在切線外的真實讀者。

量測層是對的（958 篇都量到了，還印「零連結——讀者在正文裡點不到任何相關文章」）。選錯代理的是**修補佇列的排序鍵**：pageviews 是「哪裡缺鏈」的好代理，是「哪裡的缺鏈真的讓讀者撞牆」的差代理。高流量頁的讀者多半拿一個答案就走；願意填回報表單的，本來就是少數頁上的少數人。

第二層：這支 plugin 是 **INFO 級**，不擋任何東西。958 篇零連結完全依賴有人主動去讀工單並照做——量出來了但沒有閘門，執行時機就交給下一個剛好有空的人。

`0aa8b248e` 寫進 LESSONS，pattern `fix-queue-ranked-by-traffic-misses-where-readers-actually-trip`，vc=1，severity=structural。跟 REFLEXES #82 同祖先但差一層（既有變體都在講偵測層選錯要量的東西，這條的偵測層是對的），**不自己 fold，留給 distill 判**。

## Quality gate 7 條

| Gate                                                 | 結果                                                                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| open issues 都有 status label / assignee             | ✅ #1678 needs-verification+from-feedback+content／#1609／#615                                               |
| open PRs ≤ 5d age 都有 review comment                | ✅ 唯一 open 的 #1453（18d）有完整 review 串，哲宇 9/5 拍板留給獨立 session                                  |
| broken-link gated ratio < 7%                         | ✅ **0.29%**（all-langs 0.26%）                                                                              |
| build green                                          | ✅ 6 條 workflow 全 success on main                                                                          |
| BECOME ACK 一行記憶體頂                              | ✅ 本檔第一行                                                                                                |
| 連續空場 ≥ 3 cycle 有 LESSONS entry                  | N/A — **本輪非空場，vc 歸零重計**                                                                            |
| 有 fresh issue 的 cycle 至少一件被修掉或寫明為何不修 | ✅ #1440 close（`a3f3288e0` 已 ship 十天沒人關）＋ #1678 補鏈 `d8646a2a9`，正文改寫部分寫明走 REWRITE 的理由 |

## Handoff 三態

繼承上一 session（`2026-09-06-070919-twmd-feedback-triage`）：台鐵鳴日號卡片圖重抓 / Muse 報告轉交 / 三篇 EVOLVE 投稿角度 / 審庫存實作 / 薄殼進化其餘 16 條 / 句構型別實作 / 陳映真、金城武、錫蘭三條 SC 高倍數成長基準值 / `lastHumanReview: true` 連續第三週同數字 / 新上線 🟠 unregistered 橘燈觀察 / babel-nightly live 漂移 / 哲宇端 #48 身份 Phase 1 兩項 / 五條暫停 routine 到期日 2026-10-06——本輪 scope 外，原樣延續。免疫 59 黃燈由 `twmd-self-evolve-weekly` 追蹤。

- [x] ~~issue #1678 交給 08:30 maintainer-am 收割~~ retired by 本 session：補鏈已 ship（`d8646a2a9`），正文改寫登記 ARTICLE-INBOX P1，issue 留 open 等 EVOLVE
- [x] ~~內鏈補前 50 篇~~ **狀態更新，不算 retired**：工單仍在，本輪額外做掉一篇**不在工單上**的〈生態多樣性〉

**本 session 新 handoff**：

- [ ] pending — **〈生態多樣性〉EVOLVE**（ARTICLE-INBOX P1，研究已備齊）：補遊蕩犬貓威脅段、石虎段路殺因果改寫、全篇 0 腳註補起來、2091 字補到 depth 門檻、description 28 字補長。接 REWRITE-PIPELINE，ship 後回 issue #1678 並 close
- [ ] pending — **`body-internal-links` 從 INFO 升 warn 的閾值評估**：958 篇零連結的量體下 warn 會不會變背景噪音，要用真實產出 dogfood 校準（REFLEXES #66），不要憑想像設
- [ ] pending — **補鏈工單排序鍵複合化**：pageviews 之外加「曾有讀者回報」與「被其他文章提及卻不回連」兩維（LESSONS 候選修法 a）
- ⏳ blocked — **#1609 無語詞條斷代**：等讀者提供《郭淑姿日記》具體冊次／日期，或調閱國家人權博物館出版的兩冊核對。解除條件：讀者回覆或有人調閱到書。已 blocked 2 cycle
- ⏳ blocked — **#1453 學測專題**：哲宇 9/5 拍板由獨立 feature session 處理（十二語 page、UI 字串、URL 契約、參照換一手來源、七張人物卡補第三方報導）。maintainer 不動，PR 保持開著

## 一句話

追上游的價值今天很具體：讀者說「你們漏了」，正確答案是「我們寫了，但你走不到」——**如果照著症狀逐則補，我會在概覽文裡重寫一段石虎深度條目已經寫得更好的內容**，而真正的洞（整篇零連結）會原封不動留在那裡等下一個讀者。

🧬
