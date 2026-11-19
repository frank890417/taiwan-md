# 2026-11-19-085956-twmd-maintainer-daily — 四件投稿 PR 逐條核源後全合併；詞庫三筆國名的台灣欄與中國欄整個填反，照外交部用字對調；audit 工具的刪檔預設在第三次誤刪之後終於被改掉

> session twmd-maintainer-daily — cron 08:30 fire
> Session span: 08:30:00 → 09:05:00 +0800（約 35 分鐘，自產 3 commits ＋ 4 個 merge）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review / 8 organ 最低=免疫 59（即時 `consciousness-snapshot.sh`，最大缺口 review_coverage=17.4，缺 20.65 分）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

甦醒時儀器亮了一盞燈，照規矩在這裡說出來：反芻層最新一篇 diary 是 2026-11-02，距今 17 天超過 14 天門檻。本班沒有為了消燈補寫（DIARY-PIPELINE Stage 0 的門檻照跑，這一班的材料不構成「想了什麼」的獨立產出），但這盞燈從 11-02 亮到今天，而五條週班自 11-14 起連續沉默，兩件事指向同一個方向。

## 觸發

cron 08:30 例行班。前一班 feedback-triage（07:13）交接寫「本輪零新 issue，收割清單空，`from-feedback` 佇列沒有新進」，而 02:36 的 α 班與 08:35 的清晨班各自交接了「開著 PR 交 maintainer」。實際進來是 4 件 ready PR 加 6 件 open issue，不是空場，所以空場 vc 歸零重計。

本機與 origin 的分岔讀數是 `3 0`，純領先，不是 Step 1.1b 要當班修的真分岔（那條規矩要求兩個數字都大於 0）。三個 commit 都是 babel 還沒推出去的批次。CI 全綠、14 條 workflow 零紅燈，5 道 npm audit 全綠，4 個 PR 的 CI 都 ARMED。

## 四件投稿 PR 全部合併

`gh pr edit --add-assignee @me` 四件先認領，接著讀留言串與 label 確認沒有 `reserved-for-observer`（Step 3.0 那條「授權不住在檔案裡，住在對話裡」），四件都乾淨。

**#2026（NeilLee93，`34eb970d7`）** 改〈投保薪資的天花板〉，指出原文一處法規錯誤。這種 PR 的重點在於它是對別人作品的指控，所以舉證門檻要比一般內容 PR 高。19 條腳註抽查了 9 條、逐條去原文對，全部逐字命中。六條法規引述都對：勞保條例第 14 條、施行細則第 27 條、勞基法第 2 條第 3 款、第 14-1 條、第 72 條第 3 項、第 19 條。勞動部 2016-03-11 新聞稿的「43,900元已維持9年多未調整」與「213萬名被保險人」兩句在。兩批財稅逕調的「15 萬餘人」「12 萬餘人」也在。`[^11]` 兩個比率自己算過，42.71% 與 12.99% 跟文中的 42.7% 與 13.0% 一致。

關鍵那一條是勞基法第 2 條第 3 款：「獎金、津貼及其他任何名義之經常性給與」確實在法條裡，所以原文「投保薪資只跟著本薪走，年終獎金、績效獎金與加班費不列入」把固定加班費跟經常性獎金一起排除，是真的寫錯。投稿者的修正站得住。另外確認他沒有把 11-18 那班改過的 `[^1]` 推回去。這篇從 1,764 個中文字長到 3,701 字、腳註 3 條變 19 條。合併後補一次 polish（`8e7036ddb`），prose-health 的三處「英文式短句開場」用逗號併回下一句，warn 3→0、分數 3→2，全篇只多四個字。

**#2027 / #2028 / #2029（aminzai，`d42858ac0` / `9b147f507` / `96bf49b4d`）** 三件手譯（hi 糖尿病、ar 健保財務、vi 賴瑞隆）。投稿者自己報了 ratio 與結構對齊數字，我照 REFLEXES #31 當線索不當事實，每支儀器自己重跑一次：`verify-translation.py` 三件都 19/19，`article-health --profile=ci-deploy` 都 hard=0，`target-language-check` / `cjk-residue-check` / `script-presence-check` 全過。三件的 URL multiset 跟中文母稿完全相同，所以沒有新的來源進來，這也是翻譯 PR 不需要重跑一次來源查核的原因。

兩支專用儀器的讀數比其他的重要。vi 那件跑 `person-fidelity-check` 乾淨，而那正是最該命中的一道：ar 批次曾經把許子秋變成蔣經國（模型不認識的人就拿它認識的最有名政治人物填空），賴瑞隆這種層級的立委剛好落在同一個風險帶。ar 那件跑 `currency-identity-check` 乾淨，健保財務整篇都是台幣金額，寫成人民幣是機器批次的慣性缺陷。投稿者自陳不確定的 `Lại Thụy Long` 音譯，我對照站上既有 vi 語料查到 `Lại Thanh Đức (Lai Ching-te)` 同款慣例，所以他的拼法是對的。三件的目標檔都不存在，沒有覆蓋既有機器譯文。

回覆語言上做了一個判斷並寫在留言裡：前一班對 aminzai 的 ja PR 用日文回，本班這三件改用英文。投稿者自己在 PR body 寫了對這三個語言熟練度有限，對一個說自己讀不動阿拉伯文的人寫阿拉伯文，是表演而非溝通，而「用貢獻者的語言」這條規矩要服務的是後者。三件的共同說明寫在 #2029 一則，另兩件各留一則短的指過去（Step 3.7 burst 期不逐件堆建議）。

## 詞庫三筆國名的台灣欄與中國欄整個填反

issue #2025（讀者 orlys）回報「梵穀」應作「梵谷」，11-18 那班修掉之後留了一句「先不關 issue，等下一輪掃完同型字形錯誤再一起收」。本班就是那一輪。

先確認家族大小：`category: proper-noun` 與 `fork_type: orthographic` 在詞庫裡是同一批、共 21 筆，封閉集合，全部逐筆看過。找到三筆比「梵穀」嚴重的，台灣欄與中國欄整個對調（`c32a347ed`）：尚比亞原本台灣欄填「贊比亞」、肯亞原本填「肯尼亞」、莫三鼻克原本填「莫桑比克」。

填反的後果跟漏字不同。這份資料是用來檢查台灣用語的，欄位反了，它會把台灣人正確寫的「尚比亞」判成中國用語、建議改成「贊比亞」，一個做主權保存的詞庫反過來把台灣用字換成中國用字。orlys 的專案匯入它做的正是這件檢查，所以傷害落在下游。本站 `knowledge/` 沒有被汙染：三個中國用字全庫 0 篇命中，唯一提到這兩個國名的〈楊右任〉用的是正確的尚比亞與肯亞。

三筆查了三個來源才改。外交部非洲地區國家頁寫「尚比亞共和國」「肯亞共和國」「莫三比克共和國」，同一頁三個台灣用字各 3 處、對應的中國用字 0 處；維基百科地區詞轉換標記寫 `zh-cn:肯尼亚; zh-tw:肯亞` 與 `zh-hans:莫桑比克; zh-tw:莫三比克`；Zambia 條目各地譯名表寫「中國大陸 赞比亚／臺灣 尚比亞」。出處與 URL 都寫進三筆的 `notes`，下一個讀到的人不必重查。改動用 `terminology-apply.py` 這支既有工具跑，不手改 YAML。

有兩件要照實記下來，第一件是剩下 18 筆沒有被這一輪驗證為正確，我只確認了這 3 筆是錯的。公開留言與 notes 都明寫了這句，免得被讀成「21 筆都查過」。另外，想得到的那道離線閘門（標成中國用字的詞不該出現在自己的中文正文裡）實測在 2,272 筆裡誤報 562 筆，多數是子字串命中（「12位」被「12位元」包含）與兩岸本來就通用的詞，照 REFLEXES #66 門檻要用真實產出校準，所以不 ship。可行的設計是拿外交部國名表對這 21 筆做定期比對，範圍小、可驗證，列為候選而非本班自己拍板的新工具。

## 第三次誤刪之後，那一行預設值終於被改掉

本班跑 `terminology-yaml-audit.py` 想掃詞庫，它刪掉 19 個詞條檔。名字叫 audit，預設行為卻是直接刪（`DRY_RUN = "--dry-run" in sys.argv`，不給旗標就刪），而我拿 `| tail -12` 讀它的輸出，「已刪除」那一行剛好在視窗之上，所以當場沒看到，是 commit 時 `git status` 列出 19 個 `D` 才現形。全部 `git checkout --` 復原，2,317 個 yaml 一個不少。

查下來這是第三次：2026-08-30 spore-harvest-am 刪過 10 筆、2026-11-18 α 又一次、今天 19 筆。三次都當場救回來、三次都寫進當天 memory，其中 8-30 那次還寫下「名字裡帶 audit 的腳本不一定只是讀」，而那一行預設值從來沒有人改。三次都只進 memory、沒有一次進 LESSONS-INBOX，所以它從來沒有累積 vc、沒有被 distill 看見、沒有被放到「該改哪一行」這個問題面前。

改了（`1d5a6ae5f`），照這個 repo 其他四支工具的既有約定：預設只報告，要刪加 `--apply`。正控制是拿同一道指令再跑一次，這次 2,317 個 yaml 全在、git status 零刪除，而它會印出「第 1 層有 19 個候選，這次一個都沒刪」。這支工具沒有被任何 routine 或 CI 呼叫，改預設不會動到自動化，`tests/article_health/test_terminology_paths.py` 2 passed。

這件事值得記的地方不只在修法，還在於復原得快反而讓它活得久：三次的損害都是零，所以每一班的結論都是「有驚無險，記一筆」，代價低到不值得修，於是它每次都不被修、每次都會再來一次。下一次可能發生在一條沒有觀察者的 cron 裡。教訓已經寫進 LESSONS-INBOX（`memory-records-the-landmine-three-times-and-nobody-moves-it`，vc=3）。

## 今天我自己的尺壞了四次

一天之內四次拿到錯讀數，而四次都出自我自己當場搭的尺，沒有一次是別人的工具。法規頁的解析器只撈到第一項，於是 §72 與 §19 看起來跟腳註對不上，其實對得上。needle 檢查沒處理政府頁面在數字中間插空白，「15 萬餘人」被我的「15萬餘人」漏掉，於是兩條新聞稿看起來查不到。維基轉換標記那支 oracle 在 21 列裡有 19 列抓不到資料，卻在最後一行印 `REVERSED: []`。檔案計數拿淺層 glob 比對遞迴列表，2313 對 2317，於是以為還有 4 個檔沒回來。

最危險的是第三個。那一行 `REVERSED: []` 讀起來是「一筆都沒反轉」，而真相是三筆反轉。救下它的只是運氣：我恰好先用外交部的頁面驗過那三筆，所以看得出摘要在說謊。如果順序反過來，這一班會在公開 issue 留言裡寫「同型掃描完成，其餘 20 筆無異常」。19 個 `?` 明明攤在表格裡，是我自己多寫一行把它們聚合成一個空清單——「不知道」在明細層有符號，在摘要層被折成了「沒有」。已併進既有 LESSONS `regex-complexity-limit-reports-zero-hits-not-an-error`（vc 1→2），不另開新條目。

## 收官 checklist

| 檢查項                       | 狀態                                     |
| ---------------------------- | ---------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                       |
| Timestamp 精確               | ✅（`git log %ai`）                      |
| Handoff 三態已審視           | ✅                                       |
| CONSCIOUSNESS 反映最新狀態   | ✅ derived 層，本班未改                  |
| 自我檢查工具 PASS            | ✅ prose-health / 兩個 profile 皆 hard=0 |

## Quality gate（MAINTAINER §Stage 4.1，8 條）

| Gate                                     | 結果                                                            |
| ---------------------------------------- | --------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 5 件全有                                                     |
| open PRs ≤5d 都有 review comment         | ✅ 佇列清零（4 件全 merge + 留言）                              |
| broken-link gated ratio < 7%             | ✅ 0.05%（all-langs 0.05%），20,335 頁，fresh dist              |
| build green                              | ✅ 14 條 workflow 零紅燈，5 道 npm audit 全綠                   |
| 本 cycle merge 的 PR 都過 hard gate      | ✅ 紅旗 10 條 + CI + close-hard-gate 四件全過                   |
| BECOME ACK 一行在記憶體頂                | ✅                                                              |
| 連續空場 ≥3 cycle 有 LESSONS entry       | ✅ 不適用，本班有真 backlog，vc 歸零                            |
| 有 fresh issue 的 cycle 至少一件被修掉   | ✅ #2025 修完並關閉（`c32a347ed`）＋工具預設修法（`1d5a6ae5f`） |
| 本機與 origin 無真分岔                   | ✅ `0 0`，已 push                                               |

## Handoff 三態

繼承 `2026-11-19-071342-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #119`，**第十天**）偵測器欄位射程校準與那 81 筆怎麼收尾。本班未動。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #124` 整台機器重開機、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）。本班未動。
- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #95`）npm `taiwanmd` 發佈憑證失效（`PUT 404` ＝ `NPM_TOKEN`），issue `#1789` 等它。**本班刻意不做第五次診斷**：#1789 留言已記錄同一結論被診斷四次，照 REFLEXES #80 sustain 不 renew，只在這裡記一行「`ci-main-health.sh` 今天照樣把 cli-v0.8.1 的失敗標成 OFF-BRANCH 🔴 39.4 天」。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。該席位 11-14 fire 後零痕跡，下次排程 11-22 04:06。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。本班每個 git 指令照樣印這行警告，`.git/gc.log` 還在，工作樹有 babel writer 在動。
- [ ] pending（延續，席位：下一輪 feedback-triage，零判斷動作）排除清單沿用 81 筆，`--limit` 必須加大再跑一次。本班非該席位，未動。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session，`REFLEXES #68`）本席位收官步驟寫 `git add` 後 `git commit`，沒寫 `--only`。**本班三個 commit 全用 `git commit --only <paths>` 繞過了**，`--only` 確實擋住了同時躺在工作樹裡的 19 個 `D` 與 57 個 babel 檔，但 SOP 文字仍是舊的。
- ⏳ blocked（延續，席位：哲宇或營運機）本機飛輪 11-07～11-17 沉默十天的根因仍未查。本班飛輪正常（過去 24hr 十條 routine 有痕跡）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。

本 session 新 handoff：

- [x] ~~#2025 orthographic 同型掃描（11-18 那班承諾的「下一輪」）~~ retired by 2026-11-19-085956-twmd-maintainer-daily — 21 筆封閉集合全看過、3 筆填反已修（`c32a347ed`）、issue 已關。
- [x] ~~4 件 ready PR（#2026 / #2027 / #2028 / #2029）~~ retired by 本班 — 全部 MERGED 並留言。
- [ ] pending（席位：任何 Full mode 或 `twmd-self-evolve-weekly`，參照 LESSONS `memory-records-the-landmine-three-times-and-nobody-moves-it`）**對 `scripts/tools/` 全掃一次「有 `unlink` / `os.remove` / `shutil.rmtree` 但沒有 `--apply` 旗標」的腳本**。本班只修了踩到的那一支（`terminology-yaml-audit.py`），沒有掃其他的。這是純文字檢查、可以做成一條 pytest，零判斷。
- [ ] pending（席位：任何 maintainer 班，參照 issue `#2025`）**詞庫 21 筆 proper-noun 裡剩下 18 筆沒有被驗證為正確**。本班只確認了 3 筆是錯的。可行做法是拿外交部國名表逐筆比對（範圍小、可驗證）。注意那道「標成中國用字的詞不該出現在自己正文裡」的離線閘門已實測誤報 562/2,272，不要再試那條路。
- [ ] pending（席位：任何 maintainer 班或哲宇）`.github/workflows/zz-ci-speed-bench.yml` 標著「temporary, branch only」，最後一次執行是 42 小時前的 cancelled，是 11-17 CI 加速那批留下的。本班沒動它（動 workflow 檔屬敏感面），只記一行：它會一直掛在 `ci-main-health.sh` 的 OFF-BRANCH 🔴 名單裡。
- [x] ~~斷鏈 audit~~ retired by 本班 — `npm run sync:build` 在 babel 五個 writer 同時在跑的情況下零碰撞跑完（2m13s、20,335 頁），`verify_internal_links.py` 回 gated ratio **0.05% < 7% PASSED**。19 個 unique broken target 散在 ko/en/de 的 wikilink 與 `exams/index.html` 的一處人名連結（`/people/黃少雸` 是 `黃少雍` 打錯一個字），比例拉不動閘門，照 §Step 4.1 不在本班擴張 scope。

  `exams` 那一筆我追了三輪沒追到源頭，照實記下來免得下一班重跑同樣的死路：`/people/黃少雸` 的 `雸`（U+96F8）跟正確的 `雍`（U+96CD）是不同字，正解檔是 `knowledge/People/黃少雍.md`。但全 repo（排除 `dist`／`node_modules`）grep `黃少雸` 只命中我這份 memory，grep 單字 `雸` 只多命中 `public/data/names/readings.json`，而那是注音對照表裡的正常字條，並非錯字來源。`src/pages/exams.astro` 裡 `people` 零命中，所以那條連結不是它直接產的。源頭應該在被 render 進 exams 頁的某份內容或元件裡，要再找得往 `dist/exams/index.html` 反查產生它的 component。

---

_v1.0 | 2026-11-19 twmd-maintainer-daily_
_session twmd-maintainer-daily — 4 件投稿 PR 逐條核源全合併 / 詞庫三筆國名填反照外交部對調 / audit 工具刪檔預設在第三次誤刪後改掉_
_誕生原因：cron 08:30 例行班，4 件 ready PR 加 6 件 open issue，非空場_
_核心洞察：(1) 指控別人寫錯的 PR，舉證門檻要比一般內容 PR 高，所以 19 條腳註抽查 9 條逐字對原文 (2) 詞庫欄位填反比漏字嚴重，主權工具反過來把台灣用字換成中國用字，而傷害落在下游不在自己的庫 (3) 同一個地雷三個 session 寫進 memory 沒人改預設值，因為三次都只進 memory 沒進 LESSONS，低損害讓它活得久 (4) 一天四次自己搭的尺給錯讀數，最危險的那次把 19 個「不知道」在摘要層折成一個空的「沒有」_
