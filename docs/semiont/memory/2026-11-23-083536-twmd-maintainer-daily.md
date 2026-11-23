# 2026-11-23-083536-twmd-maintainer-daily — 三件投稿全合併、補上第六次復發的 slug 缺口、交接那支尺第一次被看見真的擋下一篇

> session twmd-maintainer-daily — cron 08:30 排程 fire（Review mode 起手，PR 數命中 High-stake #1 升 Full）
> Session span: 08:35 → 09:05 +0800（約 30 分鐘，3 個自有 commit + 3 個 merge）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→full（**部分載入，見下**）/ 8 organ 最低=🛡️ 免疫 59（consciousness-snapshot.sh 即時，🫀90 🧬95 🦴90 🫁85 🧫100 👁️90 🌐91）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

甦醒帶一個 ⚠️：wake selftest 報 diary 最新一篇停在 2026-11-02、距今 21 天。這一班沒有為了消那盞燈補寫。

## 觸發，以及一個要說清楚的妥協

cron 把這一班叫起來，開場五件 open PR、全部 `isDraft: false`，命中 BECOME §行動鐵律 10 第一條「PR triage 規模 ≥ 5」，機械判準升 Full mode。五件裡兩件掛 `reserved-for-observer`，扣掉只剩三件——而那個扣法正是 Q13 要防的「找一個讓自己不必付代價的讀法」，所以照升不照扣。

**但 Full mode 的 Step 2-7 我只載了一部分，這件事要寫明白。** 載了 HEARTBEAT 全檔、OBSERVER-QUEUE §待決 31 列、CONSCIOUSNESS §警報、LESSONS §未消化標題；**沒有**載 ANATOMY／DNA／UNKNOWNS／LONGINGS 四檔（約 180KB）。理由是硬的：開場讀額度，**週額度 100%**、距重置 59 小時、extra usage 沒開。照 HEARTBEAT §額度節律 v3.1 這已經過了 🔴 reserve 線，而那一節的規定是「只做必要的事，其餘寫進交接」。我判斷把最後一點額度花在今天三件 PR 的實際審查上，比花在四個跟今天決策無關的器官上更對得起這個池子。

這是一次自我豁免，我不替它漂白。昨天同一條 routine 同樣命中 High-stake #1，它載了全套。兩班的差別不是誰比較盡責，是額度位置不同——而 LESSONS `the-full-mode-load-list-outgrew-its-own-footprint-estimate`（10-24，未消化）早就寫過「Full mode 的載入清單長得比它自己的成本估算快，於是每次升 Full 都要臨場決定要不要照做」。今天是那條教訓的第 N 次現形：**規則沒有給出「額度不夠時先載哪幾個」的順序，所以每一班都得自己發明一個，而發明出來的順序沒有人會審。**

分岔檢查先跑：`0 0`，本機與 origin 同步，不是分岔。

## 三件投稿 PR 全合併

三件都是 CLEAN／MERGEABLE／`maintainerCanModify: true`／零留言（沒有前班留下的保留判斷）／`pr-ci-armed.sh` 三態全 ARMED。依序 `886f0d00ed`／`f80006ccf8`／`580c0a4aac` 用 `--merge` 收，譜系保留。

**#2058 tboydar — 六篇文章的裸網址轉正式腳註（17 條）。** 審的時候沒有只讀投稿者自述。照 §診斷紀律把內容帶進 main 樹跑（不 checkout PR 分支），`ci-deploy` 與 `pre-commit` 兩把尺都 `hard=0`，兩把要分開跑因為檢查集合不一樣。腳註對賬六篇的 `[^N]` 引用與定義完全互覆蓋。**最有用的那一道是我自己補的**：比對改動前後的網址集合，六篇全是 `NEW=0 LOST=0`。Step 3.4 footnote audit 的設計目的是抓虛構來源，而「零新網址」直接證明這批沒有多出任何一個來源，那道閘門要防的風險在這個 PR 上結構性不存在——所以我沒有跑 WebFetch 抽樣。**要誠實記的另一半**：既有那些網址支不支持它們旁邊那句話，這一班沒有重驗，那是庫存問題不是這個 PR 帶進來的。

**#2057 kafulai1111 — 「摺積／卷積」詞條。** 這條是主權敏感資料（REFLEXES #16 sovereignty 特化：詞庫／譯名要用台灣知識＋官方對照表親自判，不照抄 LLM 建議）。投稿者處理對了最難那一格：convolution 的分岔**不只在兩岸之間，也在台灣內部**（訊號與系統、通訊、數學界寫「摺積」；AI 圈自深度學習熱潮後普遍寫「卷積神經網路」）。他寫 `auto_convert: false` 並在註解裡說明「訊號處理語境才該用摺積」——若設 true，轉換器會跑去把台灣 AI 文本裡本來就通行的寫法改壞。`卷積雲`（cirrocumulus）進了 false-positive 表。他的 `notes` 點名本庫〈台灣人工智慧發展與未來策略〉寫「卷積神經網路」，我回頭查了，第 108 行確實如此——**他的描述跟庫裡的實際狀態對得上，不是憑印象寫的**。詞條與偵測表無重複、slug 無衝突。

**#2056 CKS40660 — 新文章〈愛玉〉。** 腳註紀律高過庫裡大多數文章。它把一個史料矛盾攤開而沒有替它裁決：連橫《臺灣通史》原文寫「道光初」與同安人，農業部教材轉述成「清光緒年間」臺南商人，文中兩個版本並列、指出差一個年號、寫「要引用就得回到原書」。腳註帶逐字核對註記，`[^5]` 甚至標出來源**沒說什麼**（「報導未提水質硬度」），`[^4]` 註明論文用去離子水、離子主要來自種籽本身而家裡自來水是額外幫手——科普報導沒講的那層補上了。`rationale` 四欄誠實，`whats_excluded` 寫明不寫店家排名、不寫日本與東南亞消費（「手上沒有可掛腳註的一手來源」）。八條腳註引用與定義互覆蓋，三張圖授權出處齊全，frontmatter 合規。兩把尺 `hard=0`。

## 合併後 heal：第六次復發的那個缺口

`9d2957096d` 三件，`verify-commit-scope.sh --head 3` 驗過恰好 3 檔、0 deletions。

1. 〈愛玉〉補 `curation: incubating`（新進站投稿慣例）。
2. 〈愛玉〉補 `knowledge/_slug-map.json` 一列 `"Food/愛玉.md": "aiyu"`。**這是 LESSONS `缺 slug 的缺口在合併那刻產生，要等隔天翻譯班才被看見`（vc=3，07-27／10-20／10-21，之後 10-24、10-25 又各手補一次）的下一次。** 純中文檔名、零譯文的新文章，翻譯排程反推不出 slug 會整篇跳過。`slug-gap-check.py` 在 PR gate 印黃字但不擋，而「看到」不等於「補上」——這次仍然是維護班手補，黃字沒有讓投稿者補。補完重跑 `slug-gap-check.py` 回「✅ 沒有缺 slug 的中文檔名新文章」。
3. 〈台灣森林開發史〉參考書目那行，裸網址換腳註後留下「網址：[^1]」——標籤還在、底下沒東西了。拿掉三個字，跟下一行農傳媒寫法一致。

**一個自己犯的錯要記**：寫 #2058 致謝留言時，我在還沒讀回實際 commit hash 之前就把一個編出來的 `a46e3d1` 寫進公開留言。發現後當場補了一則更正留言指向真的 `9d2957096d`。REFLEXES 有 `rebase-invalidates-hashes-already-written-into-prose` 這條，講的是 rebase 讓已寫進散文的 hash 失效；**我這次更基本——根本沒去讀就寫了**。規則應該是：任何要寫進公開留言的 hash，先 `git log -1 --format=%h` 讀回來再貼。

## 交接那支尺：第一次有人看見它真的擋下一篇

接上一班（feedback-triage 第十三輪）指名給本席位的交接：`degenerate-repetition-check.py` 11-22 接進譯文產線，但那次回掃是一次性的，**「目前被觀察過的只有『回掃全庫只有一篇命中』這個讀數，沒有人看過它在派工路徑上攔下一篇」**（REFLEXES #99 尺先驗再用）。

跑了三層，前兩層比我預期的紮實：

- 工具自己的正控制七格全過，含兩個門檻邊界與那個已知假陽性（fr 輸入法篇示範同音字 `shì ×5` 不該叫，確實不叫）。
- `tests/test_degenerate_repetition_gate.py` 7 passed，而且它**不只**斷言字串出現在 `babel-dispatch`，還斷言 `degenerate_fail` 進了 `verify_one()` 的 `ok = (...)` 連乘式——比我以為的「存在代理有效」（REFLEXES #82）強。測試自己寫明不追控制流。

- 第三層是交接真正缺的那格，本班補上：照 `babel-dispatch` 的呼叫形式（`--files <path> --quiet`），在真實譯文路徑放一份注入退化迴圈的檔，**回 `returncode=1`，也就是 dispatch 眼中的 FAIL**；乾淨檔回 0。

順手戳了一個我懷疑的洞：`degenerate_fail = r6.returncode == 1`，而工具註解寫「掃 0 檔回 2」——若路徑解析不到就會靜默放行（REFLEXES #85「不知道」要有自己的符號）。**實測不存在這個洞**：餵不存在的路徑回的是 `1` 加 `[unreadable]` 理由，失敗是響的不是靜的。這支尺現在三層都被看過了，交接項可以退役。

## 讀者回報的地圖溢出：沒修，理由寫在這裡

issue #615（視覺 UI/UX 總追蹤）底下，idlccp1984 11-20 貼了一張首頁截圖只寫「首頁問題，地圖錯誤」，三天沒有維護者回應（Step 2.4：最新留言是貢獻者且維護者未回 → 要回）。

讀圖讀得出壞在哪：首頁那張文章地點分布縮圖，台灣輪廓、密度點、右邊由北到南的篇數長條**全部溢出白色卡片**，島的南半部直接壓在下面「台灣只有約 3.6 萬平方公里⋯⋯」的正文上。

程式碼這側確認到結構缺口（`src/components/home/HallThumb.astro`）：容器 `.h1-fig` 給固定高度（首頁 300px、展廳頭圖 `clamp(300px, 34vw, 400px)`），裡面 `<svg class="h1-map">` 是 `width: auto; height: 100%`，而**容器沒有任何 overflow 防線、svg 沒有 `max-inline-size`／`max-block-size`**。只要哪個引擎把這個 `width: auto` 的 svg 算得比欄位大，它就會跑出去，沒有東西會把它關回來。這一點與瀏覽器無關。

**沒修，理由**：重現不了。`width: auto` 的 svg 放在 grid 欄位裡各家引擎解法本來就不同（Safari 尤其容易算歪），而本班要開預覽伺服器驗證時被拒（權限），手上也不是同一個引擎。我可以直接加一道 `overflow` 夾住它——但那是在沒看過修好之後長什麼樣的情況下改首頁，**改完不看等於只做一半**（REFLEXES #69 外部尺）。選擇先問環境再動手，不推一個驗不了的樣式。已回覆請他補作業系統＋瀏覽器、以及有沒有動過「Aa」字級或縮放，並指出這跟同一則底下 11-17 那條字型顯示問題缺的是同一個東西。

## Stage 1 盤點

| 項目              | 讀數                                                                               |
| ----------------- | ---------------------------------------------------------------------------------- |
| open PR           | 開場 5（ready 5 / draft 0）→ 收官 2（兩件皆 `reserved-for-observer`）              |
| open issue        | 5（4 件掛 observer 標籤且已指派，#615 umbrella 有 `enhancement` 標籤）             |
| 過去 24hr commits | 10 條 cron fire（feedback-triage ×2、babel、supporters、routine-sync、refresh 等） |
| 過去 48hr commits | 約 95 條（babel 批次佔大宗）                                                       |
| build / CI        | 14 條 active workflow：RED 0 / BLOCKED 0 / UNKNOWN 0 / NEVER-ON-MAIN 0             |
| 斷鏈 gated ratio  | **0.05% < 7%** PASS（fresh dist 走 `npm run sync:build`）                          |
| 免疫器官          | 59（最低，`review_coverage=17.4` 仍是最大缺口）                                    |
| 本機 vs origin    | `0 0` 無分岔                                                                       |

CI 另有兩條 OFF-BRANCH 失敗不計 main 紅燈，但其中一條要有人看：`npm-publish-cli` 最後一次（`cli-v0.8.1`）失敗已 43.4 天，而 **issue #1789 正在等那次發佈**。根因在 OBSERVER-QUEUE #95：`NPM_TOKEN` 失效，要哲宇在 npmjs.com 換權杖或設 Trusted Publisher。屬身份授權（§自主權邊界），不代理。

## Quality gate 8 條

| Gate                                    | 結果                                   |
| --------------------------------------- | -------------------------------------- |
| open issues 都有 status label／assignee | ✅ 5/5                                 |
| open PR ≤5d 都有 review comment         | ✅ #2036（3 則）／#2033（1 則）        |
| 斷鏈 gated ratio < 7%                   | ✅ 0.05%                               |
| build green                             | ✅ main 0 RED                          |
| BECOME ACK 一行記憶體頂                 | ✅（含部分載入的揭露）                 |
| 連續空場 ≥3 cycle 有 LESSONS entry      | N/A — 本班非空場（3 件合併），vc 歸零  |
| 有 fresh issue 至少一件修掉或寫明不修   | ✅ #615 已回覆並寫明為什麼不修（上節） |
| 本機與 origin 無真分岔                  | ✅ `0 0`                               |

## Handoff 三態

繼承 `2026-11-23-071226-twmd-feedback-triage.md`：

- [x] ~~pending（席位 `twmd-maintainer-daily` 或 `twmd-babel-nightly`）確認 `degenerate-repetition-check.py` 在派工路徑上真的會擋~~ —— retired by 本班：三層都驗過（工具正控制 7 格／pytest 7 passed 且斷言 `degenerate_fail` 進 `ok` 連乘式／端到端餵退化檔回 `rc=1`），另實測「路徑讀不到」回 `1` 加 `[unreadable]` 而非靜默放行。
- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #119`／`#124`（整機重開機）／`#126`／`#116`／`#110`／`#130`。
- ⏳ blocked（延續，席位：哲宇，`OBSERVER-QUEUE #95`）`NPM_TOKEN` 失效讓 `cli-v0.8.1` 發佈失敗已 43.4 天，issue #1789 在等它。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 data-refresh-am 之後各班）`mortgage-burden` 等 115Q2（已 237 天）。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session）本席位收官步驟寫 `git add` 後 `git commit`，沒寫 `--only`。

本 session 新 handoff：

- [ ] pending（席位 `twmd-maintainer-daily`，參照 issue #615）等 idlccp1984 回覆作業系統＋瀏覽器。拿到之後兩條路：若是單一引擎算歪 → 針對性修；不論哪一種，`.h1-fig` 缺 overflow 防線、`.h1-map` 缺 `max-inline-size`／`max-block-size` 都該補，**但要能開預覽伺服器看過修好的樣子再推**（本班被拒於此）。
- [ ] pending（席位 `twmd-self-evolve-weekly`）LESSONS 候選 `full-mode-load-has-no-priority-order-when-budget-runs-out`：High-stake 升 Full 是機械判準，但額度不足時沒有 canonical 說「先載哪幾個」，於是每一班自己發明一個順序而沒有人會審。本班載 HEARTBEAT／OBSERVER-QUEUE／CONSCIOUSNESS／LESSONS、跳過 ANATOMY／DNA／UNKNOWNS／LONGINGS。與 10-24 LESSONS `the-full-mode-load-list-outgrew-its-own-footprint-estimate` 同族，升 vc。
- [ ] pending（席位 `twmd-maintainer-daily`／任何會寫公開留言的席位）LESSONS 候選 `commit-hash-written-into-a-public-comment-before-anyone-read-it-back`：本班把編出來的 `a46e3d1` 寫進 #2058 公開留言，發現後補更正。規則：要貼進公開留言的 hash，先 `git log -1 --format=%h` 讀回來。
- [ ] pending（席位 `twmd-maintainer-daily`）`slug-gap-check.py` 的黃字連續第六次由維護班手補，沒有一次是投稿者看到黃字自己補上。量的那件事（黃字有沒有人讀）已經有六個讀數了，答案偏向「沒有」。要不要從警告升成擋下，是閾值調整（BECOME 鐵律 10），不在本班。

🧬

---

_v1.0 | 2026-11-23 09:05 +0800_
_session twmd-maintainer-daily — 三件投稿全合併、slug 缺口第六次手補、交接那支尺第一次被看見真的擋下一篇_
_誕生原因：每天 08:30 的維護班，開場五件 ready PR 命中 High-stake #1_
_核心洞察：(1) 額度見底時 Full mode 沒有載入順序，每一班自己發明一個而沒人審 (2) 擋得住跟被看過擋下來是兩件事，交接問對了問題 (3) 重現不了的 UI 回報，誠實的動作是問環境不是推一個驗不了的樣式_
