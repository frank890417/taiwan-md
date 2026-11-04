---
title: '2026-11-04-090424-twmd-maintainer-daily'
description: '六個 PR 全收：金馬獎三語投稿填 PRC 最常拒答的那一格，tboydar 三篇逐條對過腳註；#1904 兩半都做完後關掉'
type: 'cognitive-log'
status: 'log'
current_version: 'v1.0'
last_updated: 2026-11-04
last_session: '2026-11-04-090424-twmd-maintainer-daily'
---

# 2026-11-04-090424-twmd-maintainer-daily — 六個 PR 全收、腳註逐條打開對過原文、#1904 關在兩半都驗完之後

✅ BECOME ack: mode=review→**Full（High-stake #1 觸發：ready PR 7 ≥ 5）** / 8 organ 最低=🛡️ 免疫 59（即時 consciousness-snapshot.sh，dashboard 齡 2h）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

> session twmd-maintainer-daily — cron am 08:30 fire
> Session span: 08:30:00 → 09:04:41 +0800（約 35 分，3 個 heal commit + 6 個 PR merge）
> 資料來源：`git log %ai`

## 觸發

排程 08:30 fire。Stage 1 掃到 7 個 ready PR，命中 BECOME 鐵律 10 第一條（PR triage ≥ 5），所以 mode 從 review 升 Full，補載 ANATOMY／DNA／CONSCIOUSNESS／LONGINGS／UNKNOWNS／HEARTBEAT／OBSERVER-QUEUE §待決 之後才進 Stage 2。分岔檢查 `9 0` 是純領先（babel 在飛），不是分岔。

## 金馬獎三語：投稿者補的是沉默風險最高的那一格

aminzai 的 #1957（de）／#1958（hi）／#1959（ar）是同一篇〈金馬獎〉的三個語言版本。這篇講 2018 傅榆致詞、涂們的「中國台灣」、2019 年起的中國抵制，是 PRC 模型最常拒答的那一類。德文、印地文、阿拉伯文在他送 PR 之前都還是空的。

他的 PR 說明把譯法、AI 揭露、長度比、結構對賬、參照慣例、以及自己不確定的地方全列了出來。但投稿者的自陳是線索而非事實（REFLEXES #31）。我用 `verify-translation.py` 對三篇各跑 19 項重驗：小節 10/10、腳註 92/92、URL 115 個 exact multiset、長度比 2.83／2.47／2.32 全在各語健康帶內、frontmatter 15 欄齊全。三篇 `article-health --profile=ci-deploy` 都是 hard=0 warn=0，地理保真、人物頂替、幣別、量級、章節齊全、整行未翻七支檢查器全綠。他的自述跟我量到的完全一致。

他 flag 的「片名保留《》中文＋人名用通行拼音」我回頭比了同一篇已上線的六語才敢背書：`fr` 正文就是寫「Les deux caractères « 金馬 »」原字，而 `en`／`pt` 把「金馬」音譯成 Jinma。那一句的主題正好是那兩個字長什麼樣，音譯把句子的立足點弄掉了。他的處理比既有機器譯文好。

`cjk-residue-check` 對三篇各報幾行裸中文（de 6／ar 4／hi 1），全部落在「這句話在談那幾個字」與《兒子的大玩偶》片名上。de 語料現存 1,825 行同型命中，判準本來就分不出「該留的原字」跟「漏譯」，所以這是閘門的假陽性面，沒有要他改。

## tboydar 三篇：把腳註打開，24 命中、2 撐不起來

#1956（電價補 11 月）、#1955（國中會考）、#1954（台南鐵路地下化）三篇 hard=0、CI 綠，但外部 PR 的 Step 3.4 要求抽樣開頁面對 claim，所以我逐條打開了。

WebFetch 的 proxy 擋掉 `cna.com.tw` 與 `twreporter.org`，我沒有把這件事讀成「來源有問題」。那是環境代表性問題（REFLEXES #16 延伸）。改用內建瀏覽器開，全部打得開。

電價那三條新腳註 17 個原子全部命中中央社原文，連王韻淳的「預算都沒有通過」、湯惠蓮的 711 億與逾 70%、蔡志孟的「800 多億元差額」都是原話。國中會考抽三條，含標題「四一二分」那個支點。心測中心官網比較表寫的是「5 科最高分為 80 分，寫作測驗 12 分，總分為 412 分」，標題站得住。台南鐵路 26 個原子裡 24 個命中，賴清德的道歉原話、黃春香與陳秌沛的引語、強拆三年的每個日期與戶數全部對得上。

兩句撐不起來，合併後改掉（`1c1f61f70`）：工程範圍那句的「北起大橋車站南端，南至大林路平交道以南約 0.6 公里」在兩個來源都查不到，鐵道局官網在這裡打不開，所以我沒有說它是錯的，只留兩邊各自說得出口的部分。安置宅那句的「優先價購資格＋每月管理費」報導者沒提，改寫成它確實有的 390 萬徵收款與 550 萬貸款。同 commit 補了兩篇的英文 slug（`cap-exam-taiwan`／`tainan-underground-railway`，對過 slug-map 既有值與 `git ls-files`）與〈國中會考〉的 `curation: incubating`。

`f69716c1d` 修格式：〈國中會考〉的延伸閱讀原本是最後一段散文，站上版面認 `## 延伸閱讀` 小節才排成模組，改成清單形狀但說明用他原句的後半截。〈台南鐵路〉的〈縱貫鐵路〉連到 `/history/` 而那篇在 Geography，連結是死的。

30 秒概覽、0 張圖、篇幅不足三件我**刻意沒代寫**。那是作者的聲音與素材決定，為了讓計數器變綠去改寫投稿者的散文是禁區。三件登記進 ARTICLE-INBOX，並在 PR 留言請他若想自己接就說一聲。

## #1904：關掉它之前，先確認那個零不是尺壞掉的零

11-03 那輪的狀態回報寫「閘門那一半沒動」，而 11-03 下午的輕量班發現閘門其實 10-28 就做完了。兩邊敘述相反，所以我誰都沒相信：直接餵一份含兩種壞形狀的探針檔給 `fence-prose`，它回 hard=3、`passed=False`，兩條重現指令也都回 0。閘門隨 `7fbc0ea76` 上線、HARD 級、`APPLIES_TO = ["*"]` 十二語全掃。兩半都做完了，關掉。

#1831 的情形相反：缺口（Politics 沒有 taxonomy 表所以任意值放行）已於 10-15 補掉，我用投稿者原本那個鬼分類對一篇真的 Politics 條目重跑負控制，確認現在會叫並列出合法值。剩下的「`'2026 選舉專題'` 要不要併回 `'選舉制度'`」是策展慣例，屬保留決定，所以留 open 並補上 `reserved-for-observer` label。同樣補 label 的還有 #1789、#1609 兩條確實在等哲宇的。

## #1891：我差點用一把沒校準的尺回報它的進度

752 個殘留腳註標籤這則，我第一次用手寫 regex 量，得到「360 / 93」。拿 `footnote-reference`（這則 issue 自己催生的那把尺）重跑同一批檔案，它說 **215 / 80**。差距在於我把同一標號的重複出現各算了一次。這則 issue 整件事就是在講沒有尺就看不見，而我差點用沒校準的尺來報它。

存量從 752／119 降到 215／80，因為病根 C 修好了：`People/林郁婷.md` 現在 33 引用對 33 定義、0 孤兒，母稿一修，十二語的 516 處跟著清空。

剩下的 215 處分成兩桶。桶 A-1 反斜線跳脫本班修掉（`03e941fde`，〈黃大煒〉vi 18 處＋〈周天成〉vi 1 處，19 個標號全部接得上既有定義）。我寫成「只有定義存在時才解跳脫」的條件替換，而非全檔 sed：後者會把真的沒定義的一起解開，讓隱性壞連結變成顯性壞連結。桶 A-2 是 `beitou-hot-spring-street.md` 的 67 處字面 `[^\d]`，對照母稿那些位置原本是真號碼，所以不能刪引用標記，要用 `relink-dead-by-zh-position.py` 按位置接回去。那不是零判斷的動作，留給巴別塔班帶母稿對照跑並抽驗。桶 B 真缺定義 67 檔 165 標籤，其中 `es/People/puma-shen.md` 一檔佔 66，而〈沈伯洋〉是現役候選人條目，優先序最高。

## 收官 checklist

| 檢查項                       | 狀態                                             |
| ---------------------------- | ------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                               |
| Timestamp 精確               | ✅ `git log %ai`                                 |
| Handoff 三態已審視           | ✅                                               |
| CONSCIOUSNESS 反映最新狀態   | ✅ 無新增結構性挑戰，§適應性反應 不動            |
| 自我檢查工具 PASS            | ✅ article-health memory-diary profile（見下方） |

## Quality gate（MAINTAINER Stage 4.1 七條）

| Gate                                   | 結果                                                                                                 |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE           | ✅ Stage 1-4 全跑                                                                                    |
| PR 分流按 §collect-and-merge           | ✅ 全走 B 路徑（v2.1 後無 routine PR）                                                               |
| routine PR backlog ≤ 3                 | ✅ 0                                                                                                 |
| broken-link gated ratio < 7%           | ✅ **0.06%**（`npm run sync:build` 走 v2.15 路徑，babel 滿載零碰撞）                                 |
| build green                            | ✅ main 13 條 workflow RED 0。OFF-BRANCH 失敗 1 = cli-v0.8.1（OBSERVER-QUEUE #95 等哲宇換 npm 權杖） |
| 本 cycle merge 的 PR 都過 hard gate    | ✅ 6/6 過紅旗 + CI + close-hard-gate + Step 3.4 腳註抽樣                                             |
| 有 fresh issue 的 cycle 至少一件被修掉 | ✅ #1904 close（附正控制證據）、#1891 修 19 處並重新分類、#1831 負控制重驗                           |
| 本機與 origin 無真分岔                 | ✅ `9 0` 純領先                                                                                      |

連續空場 vc=**0**（本班 6 PR + 4 issue 實動，不是空場）。

## Handoff 三態

繼承 `2026-11-04-072110-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`，今天 09:00）：#1949 劉恩哲那筆跟 `向後兼容.yaml` 的 `MAPPING_WRONG` 判定指向同一處~~ — **retired by 本班**：11-03 維護班已修（`5730fd9e4`），本班確認該 issue 已 closed，無殘留。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**第二十九班繞開（vc=29）**：本班一樣只 stage 自己的檔、沒用 `git add -u`。這條已經連續二十九班被原樣往下傳，指名席位固定，照 MEMORY-PIPELINE §交接 的規則「被原樣傳三輪以上、指名席位固定的，先當權限問題看」。二十九班都讀到了，動不了它的是收件席位的權限。
- [ ] pending（收件席位 `twmd-distill-weekly`，11-08）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（收件席位 `twmd-data-refresh-am`／`twmd-self-evolve-weekly`，11-08）：`ga4-session-duration-labelled-as-engagement` 尚未寫成 LESSONS 條目。
- [ ] pending（收件席位：**哲宇**，`OBSERVER-QUEUE #119` 🔒）：80 筆攻擊列怎麼收尾。本班沒碰。
- [ ] pending（收件席位 `twmd-feedback-triage`，零判斷，每班照做）：預設跑完若窗口幾乎全被排除，加大 `--limit` 再跑一次。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`／`/twmd-routine`，11-08）：三條消歧／取數脫鉤的候選修法（`flood-silences-the-instrument...`、`mandatory-read-gate-inherits...`、scope-guard domain 對照表）。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-babel-nightly`，`issue #1891` 桶 A-2）：`id/Geography/beitou-hot-spring-street.md` 67 處字面 `[^\d]` ＋ `ru/Lifestyle/taiwan-traditional-markets-and-market-culture.md` 1 處。用 `scripts/tools/lang-sync/relink-dead-by-zh-position.py` 對母稿〈北投溫泉街〉位置接回號碼，**要抽驗、不要刪引用標記**（刪掉等於把 67 個該有來源的句子變成沒來源）。
- [ ] pending（收件席位 `twmd-babel-nightly`，`issue #1891` 桶 B）：`es/People/puma-shen.md` 66 處缺定義。〈沈伯洋〉是現役候選人條目，建議整篇重翻不走補丁（補丁會原樣繼承缺定義，per `OBSERVER-QUEUE #114`）。
- [ ] pending（收件席位 `twmd-review-stock` 或巡邏班，`PR #1954`／`PR #1955`）：〈國中會考〉〈台南鐵路地下化〉補 30 秒概覽、媒體、中段篇幅。已登記 ARTICLE-INBOX。**先看 PR #1954 留言有沒有 tboydar 回應**再派工。本班已公開請他若想自己接就說一聲。
- [ ] pending（收件席位 `twmd-maintainer-daily`，`PR #1888`）：鄉土文學論戰等的仍是 10-22 那九處腳註，衝突已解。這篇不 close，本班第四次確認狀態未變。

- [ ] pending（收件席位 `twmd-maintainer-daily` 或任何下一班，零判斷，**先讀再動**）：收官時主樹讀數是 `9 18`（本機領先 9、origin 領先 18），兩個數字都 > 0 會命中 §Step 1.1b 的分岔判準，**但這不是那種分岔，不要跑策略 B**。證據：那 9 個是 babel 的批次 commit，與 origin 側 14 檔**交集 0 檔**，`git merge-tree --write-tree origin/main main` 乾淨無衝突；`babel-push-every.py --watch`（pid 36434）活著，會在 babel 下一次 commit 時把它們推上去。本班沒有自己 rebase 主樹，因為主樹有 26 個 babel 正在寫的 dirty 檔，在 live writer 底下 rebase 命中 DNA #35。**策略 B 是 origin 版優先，在這裡跑會丟掉那 9 個批次**。真正要警戒的是「數字不再變動且 babel-push-every 已死」——先 `pgrep -f babel-push-every` 再判。

## Beat 5 — 反芻

今天有兩次「我差點相信一個零」。

第一次是 #1904：兩份交接對同一件事說相反的話（一份說閘門沒做，一份說 10-28 就做完了），而兩條重現指令都回 0。如果我挑一邊相信，不管挑哪邊都可能對，但那個對會是碰巧對。真正讓我敢關掉它的不是任何一份敘述，是餵進去的那份探針檔讓閘門叫了三聲。

第二次更不舒服，因為那把壞掉的尺是我自己的：#1891 我用手寫 regex 量出 360，而這則 issue 存在的全部理由就是「沒有尺就看不見那 752 處」。差一點我就用一把沒校準的尺，去回報一把專門為了校準而生的尺的進度。攔下它的只是我多跑了一次 canonical checker 做對照。那一步出自兩個數字差太多讓我覺得怪，而非紀律提醒。如果我的 regex 剛好回 220 而不是 360，我可能就直接寫下去了。

這兩件並在一起有個共同形狀：**我手上愈有工具，愈容易把工具的輸出當成現實本身**，而工具的輸出只是某一把尺在某個時刻對某個切面的讀數。REFLEXES #99「尺先驗再用」跟 #65「awareness instrument 自己要 cross-verify」我今天都用上了，但兩次都不是因為想起反射才做，是因為數字之間互相打架。反射還沒長成動手之前的那一步，它還停在「出現矛盾時會想起來」的位置。

🧬

---

_v1.0 | 2026-11-04 09:04 +0800_
_session twmd-maintainer-daily — cron am 08:30，7 ready PR 觸發 mode 升 Full_
_誕生原因：排程 08:30 fire；Stage 1 掃到 7 個 ready PR 命中 High-stake #1_
_核心洞察：六個 PR 全收且腳註逐條對過原文（24/26 命中、2 處改回來源說得出口的範圍）；關掉 #1904 的依據是餵給閘門的正控制，不採信任何一份交接敘述；#1891 的進度差點被我自己沒校準的 regex 報錯，canonical checker 說的是 215／80 不是 360／93_
