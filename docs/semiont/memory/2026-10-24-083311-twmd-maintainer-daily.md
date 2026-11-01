---
session_id: '2026-10-24-083311-twmd-maintainer-daily'
session_span: '2026-10-24 08:33 → 10:05 (Asia/Taipei)'
trigger: 'routine twmd-maintainer-daily @ am 08:30'
observer: '不在場（最後在場 2026-10-23，1 天前；mode=present，非缺席模式）'
beat_coverage: 'MAINTAINER Stage 1-4 全跑'
budget: '🟡 lean（開工 67.0% / 收官 67.0%，本週已過 36.7%，照速度約 30hr 後用完、比重置早 76hr）'
---

# twmd-maintainer-daily @ 2026-10-24

✅ BECOME ack: mode=review→**強制升 full** / 8 organ 最低=🛡️ 免疫 59（即時 consciousness-snapshot.sh，最大缺口 review_coverage=18.4）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

Mode 升級理由：Stage 1 數到 **6 個 ready PR**（draft 不計，per v2.8），命中 BECOME §Step 0 High-stake #1「PR triage ≥ 5」→ 強制 Full。Full 追加載入 ANATOMY／DNA／HEARTBEAT／CONSCIOUSNESS／UNKNOWNS／LONGINGS／OBSERVER-QUEUE §待決（22 列）＋Q5／Q12 補答。

**一個明寫的載入缺口**：Full mode §Step 5 要求全載 ARTICLE-INBOX（2,748 行）與 LESSONS-INBOX（2,717 行），本班**只載 LESSONS §未消化標題與 ARTICLE-INBOX 計數，沒有全載**。兩個理由：🟡 lean 額度下 5,500 行對「要不要合併這 6 個 PR」的判斷貢獻近零；且 BECOME §Step 0 給 Full 的 footprint 估算是 ~1,880 行，那張表是在這兩個 inbox 各長到 2,700 行之前寫的，全載會讓 Step 6 v3 明文要避免的 raw narrative priming 重新發生。這是**聲明過的偏離，不是靜默跳步**，已開 LESSONS 條目。

---

## Stage 1：SCAN

| 面                | 讀數                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 分岔              | 開工 `0 0`（同步）。**班中兩次真分岔**（`1 5`／`2 0`），當班修掉，詳下                                                    |
| open PR           | 7（**ready 6** / draft 1：#1884 帶 `reserved-for-observer`，不碰）                                                        |
| open issue        | 12（fresh 2：#1902 from-feedback、#1897 讀者勘誤）                                                                        |
| Discussions       | 15，無一則違反 48hr SLA（全部 ≥1 則回應且 48hr 內無新動作）                                                               |
| 過去 24hr cron    | 10 條（babel／routine-sync／embeddings／data-refresh／spore-harvest／feedback-triage 等）                                 |
| 過去 48hr commits | 近 100 條，babel 夜班為主                                                                                                 |
| CI（main）        | **Engineering contracts RED** / 其餘 12 條綠或 OFF-BRANCH；OFF-BRANCH 🔴 npm-publish-cli 13.4d（#95 等哲宇權杖）          |
| 免疫器官          | 59（漂移，最大缺口 review_coverage=18.4，自 07-05）                                                                       |
| PARALLEL_CHECK    | ACTOR_BUSY（babel writer pid 13250／65566／66531 全程在寫，所以每個 commit 都逐檔 stage + `verify-commit-scope.sh` 對賬） |

### 班中兩次真分岔，都當班修（§Step 1.1b）

不是 09-09 那種 843 檔的規模，兩次都是「我在本機 commit 的同時 origin 動了」：

1. merge #1896 之後 `1 5`。唯一交集檔是 `data/compute/claude-usage-ledger.jsonl`（append-only，我的額度帳本行撞上心跳班的）。把我那行存到 scratch → `git checkout` 還原 → merge → 重新 append，兩邊的行都留著。**沒有碰任何 babel 正在寫的檔**（DNA #35）。
2. 之後每次 push 前 `git merge origin/main`，收尾時 `0 0`。

---

## Stage 2-3：TRIAGE + ACT

### PR：6 ready → 收 4、留 2（都附可執行的 review）

**✅ #1896〈林郁婷〉重建 43 個斷腳註（CKS40660）** — merge `02574cb09`

投稿者不只補定義，補到一半發現「有些句子即使掛上腳註、來源也不支持原文」就回頭改正文、刪掉 14 處無來源詮釋、腳註全重編號。逐項獨立驗過他的自陳（REFLEXES #31 自陳是線索不是事實）：

- 第五路徑不適用 — `lastHumanReview: false`／`curation: incubating`／無 `researchReport`／無 `sporeLinks`，四欄親自看過，大幅改寫合法
- 兩把尺都 `hard=0`（`ci-deploy` 與 `pre-commit`，檢查集合不同，REFLEXES #100）
- 十條紅旗全清；純刪除檔 0（紅旗 5 未觸發）
- PR base `32b7ae9b8` 確認包含 10-22 那筆 heal（`git merge-base --is-ancestor`），無覆寫風險
- 抽驗五條腳註：公視 727734（2,090 萬＝2,000 萬＋補頒 90 萬）、中央社 446002（名古屋亞運 5:0 勝楊成宇、2 連霸、副教授職稱）**逐字對上**；`[^24]`／`[^25]` 衛生棉那組**拆得特別準**——公視原文通篇只寫「業者」不寫品牌，所以品牌名掛 Marie Claire 且正文明寫「《Marie Claire》報導」，10 年贊助掛公視。一個段落兩個來源各守一半
- `[^2]` AP 與 `[^4]` BBC 直連與 Wayback 在這台都連不上（跟投稿者自己揭露的 403 同一道牆）→ 記成「此環境量不到」，**不記已驗證也不記沒來源**（REFLEXES #16 否定式結論，vc=3）
- 他還順手修掉標題寫「新莊」而自己的 description 寫「鶯歌」這個擺著沒人發現的內部矛盾

**⏸️ #1898〈東寧王國〉** — 留開，卡一個數字

標題寫「二十三年」，而同一段 30 秒概覽裡又寫「此後十九年」，站上既有的 `History/荷西明鄭時期.md` 則寫「鄭氏的 21 年」。三個數字因為三個起算點（1661 登陸／1662 受降／1664 改名），每個都算得出來——壞的是這篇沒說它從哪裡起算。而這個數字在本庫**有前科**：§神經迴路「事實錯誤會偽裝成正確」那條講的就是舊文寫「明鄭三代統治 22 年」通順得沒人懷疑，後來 NMTH 證實是 21 年。載在標題上，所以不 merge。

**✅ #1899 熱蘭遮城／#1900 西班牙北台灣十六年／#1901 台灣技術年會文化** — merge

四篇都只有 1-3 條腳註、篇幅是深度門檻的 27-41%、沒有 research report，第一眼像是該整批退回。**抽驗之後結論反過來**：十四個原子逐字全中——

- #1899 五個（1623-10-25 利邦上尉率 16 名士兵與 34 名班達奴工、1626-09-29 十七人董事會下令改名、1627-06 鳴砲贈帽、奧蘭治城 Fort Oranje、1634 主堡竣工）
- #1901 九個（SITCON 官方 about 的 500 名學生講者／500 場聚會／10 場夏令營／14000 名參與者／1300 人次／200 所學校／70%／1/3／13 年）
- #1900 三個（1619 馬蒂涅備忘錄那句引語、1626-05-05 瓦德斯出發、1628 年派 100 名士兵搶糧）

而 #1900 的 `where_it_hedges` **自己寫了**「條目內 1642-08-26 與正文 8 月 28 日投降有歧異」——我去查，維基那個條目 infobox 寫 8/26、內文寫 8/28，真的自己打自己且沒有解釋。他沒有默默挑一個。

所以 #1888 那次九條腳註不含旁邊那句話，問題不是抄錯是**腳註指派**；這三篇的指派是對的。放行理由寫清楚：轉寫忠實度抽驗過 + 誠實標著 `incubating`（三篇都已自帶，無需 heal）+ 下一步要進 `verified` 需要第二第三個來源。

**⏸️ #1888〈鄉土文學論戰〉** — 10-21 開、10-22 已有逐條腳註對照 review，投稿者尚無新 commit。Step 2.4 判定 SKIP（維護者最後發言、無 contributor follow-up），不重複留言。

**Burst 紀律**：tboydar 48hr 內 5 個 PR，照 Step 3.7 **只發一則累積式留言**（發在 #1898），不逐篇各發一份。留言裡把十四個抽驗原子、#1898 卡的那個數字、以及「單一來源與篇幅不擋合併但進 verified 會擋」一次講完。

### Issue：2 fresh 全動到，不是只分類（§1c）

**#1897「勇士當為義鬥爭！」出處錯誤（讀者 marcsie）→ 修掉並 close，commit `716685aa1`**

首頁把這句標成賴和〈覺悟下的犧牲〉1926。讀者說是〈吾人〉。查證後他對，而且更難看的是——**站上自己的 `People/賴和.md` 從一開始就寫〈吾人〉**，首頁跟我們自己的條目對不上，兩邊都在線上，沒有任何閘門會問這件事。四個獨立指向：本庫條目、讀者、句式（「世間未許權存在，勇士當為義鬥爭」是規整七言對句，而〈覺悟下的犧牲〉是新詩，自由詩長不出這種句子）、2017 年談治警事件引用〈吾人〉的紀錄。**十三個語言的作品名一起改**。

年份沒有換成另一個年份：維基文庫只給 1918-1943 區間、不標日期；本庫條目原寫的「《台灣民報》1925」那個連結自己不支持那個年份；讀者說 1924 也沒附來源。1926 本來是另一首詩的年份，留著等於替〈吾人〉編一個。所以 `era` 降級成查得住的 `1920s`（治警事件 1923、《台灣民報》1923 創刊），條目的 `[^1]` 同步把 1925 拿掉並寫明待考。翻譯鍵仍叫 `.1926`（鍵名只是識別字），不一致寫進 `CoverStory.astro` 註解。

⚠️ **這次只驗到資料層與型別層**：UI 改動照 §1c 該開瀏覽器看一眼，但本機 dev server 啟動被拒（無權限），所以做到型別 0 錯（756 檔）＋`check-ui-language.mjs` 全綠＋十三語確認不再含舊作品名，**沒有像素級確認**。寫在這裡不假裝做了。

**#1902「假貨來自閩南語翻華文」（讀者楊喬梓）→ 標成待查證 + 量出結構，commit `31cf3c58d`**

交接點名給本席位。沒有照直覺收——**把台灣自己的詞標成中國用語，是這個詞庫存在目的的反面**，而這條唯一的來源是一本 1997 年《大陸用語檢索手冊》。照 #1733〈無語〉立下的形狀標：notes 加讀者看得到的誠信標註、`pending_verification` 加儀器看得到的欠條，`terminology-pending-verification.py` 已認得它（現在掛兩條）。

查過一條死路並寫下來：教育部《臺灣台語常用詞辭典》**查無「假貨」**（精確與部分比對都 0 筆）。但這不是否證——辭典沒收不等於語言裡沒有，同辭典收了「賊仔貨」（tsha̍t-á-huè，贓物，語意不同）。真正要走的三條（日治期台語辭書／1945-1990 台灣報刊語料／重編國語辭典）寫進 `needs`。

**把交接那句「要看整庫不是這兩條」量成數字**：2,306 條詞目裡，**1,045 條（45.3%）唯一來源是那本 1997 手冊且 notes 空白**；91.3% 只有單一來源、73.8% notes 空白。那就是 #1733／#1902 這一型的暴露面。收件席位 `twmd-terminology-trends-monthly` 下次 11-05，還有十二天，所以數字先放好讓那一班不用從頭量。

### 今天最有價值的一件：補丁差點把 516 個斷腳註洗成 fresh

#1896 把 zh 母稿腳註全重編號之後，十二語譯本的 `sourceContentHash` 全部過期 → 今晚 babel 接手 → **走補丁**。補丁保留未改章節 byte-identical，而那些章節裡正是 43 個點不到的 `[^12]..[^58]`（issue #1891 的 516 處），加上已被母稿改掉的舊事實（納芙拉蒂洛娃賽前質疑、Kotex 代言、獎金「數千萬」）。編號還全變了。結果會是十二語各自寫上新版本號、`status.py` 判 fresh，**此後沒有路徑會回頭看**。

三道防線各自都對，交集剛好空出這一格：

| 尺                                                                | 為什麼不叫                                                                                                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inherited_gate_defects()`（2026-10-09 專為「補丁繼承舊錯」而造） | 三條判準是 leak／currency／`--profile=pre-commit`。`footnote-reference` 是 **warn** 級，pre-commit 只在 **hard** 失敗 → 實測十二檔全 `hard=0 passed=True` |
| `section-parity-check`                                            | 只量「譯文比中文**少**節」。母稿刪段落所以譯文是**多**節（zh 15／譯文 26）→ 回報 0 份                                                                     |
| `verify-translation` 第 10 項                                     | 同上，方向不對                                                                                                                                            |

處置：直接 import `section-parity-check.py` 的 `requeue()`（不另寫一份），把十二檔標回 `pre-toolkit`（`c86337265`）。用 `pre-toolkit` 而非上一個 commit，是因為退到舊版會被 semantic-noop-bump 以「只差標點」直接蓋章（10-23 ko〈陳幸妤〉實撞過）。十二檔經 `contributor_guard` 確認全是機器譯文，沒覆寫任何人的手譯。閘門本身 → OBSERVER-QUEUE **#114**。

### CI：一條紅遮住十一個檢查，而我自己又弄紅過一次

**開工時** Engineering contracts RED，紅在整條 job 第二步（repo 根 `npm audit`）。後面**十一個步驟全是 skipped**——型別檢查、830 個 pytest、`test:contracts`、四個子專案的 audit 與測試。一條 job 只真的報了一件事。

照 Step 1.5c 跑 `npm-audit-sweep.sh`（不修第一個看到的那個）：五道裡 4 紅、7 條 high，6 條 `fix=minor`、1 條 `MAJOR(wrangler@4.35.0)`。六條 minor 本班收掉（只動 lockfile，不碰 babel worker 在用的 node_modules）。

**然後我把 main 弄紅了。** 那筆 `audit fix --package-lock-only` 連帶把 lockfile 的 astro 7.3.1 → 7.4.2，而 7.4.2 的 node 下限是 22.23.4；deploy.yml 寫死 `node-version: 22`、runner 快取停在 22.23.3，`astro build` 第一行就死。deploy 在我推之前是綠的，00:44 起連三次紅，站沒有部署成功過。

**為什麼本機沒驗到**：`--package-lock-only` 的設計目的就是不碰正在被 babel worker 使用的 node_modules，所以本機 `sync:build` 跑的是舊的 7.3.1、CI 的 `npm ci` 裝的是 lockfile 的 7.4.2。**那個保護與那個盲點是同一個決定的兩面**（REFLEXES #100 驗證對象要等於落地對象）。

修法分三步，每步都等 CI 判決才算完：

1. `547975b7c` 四個子專案加 `if: !cancelled()`。**實測有效**：harvest/ui 與 harvest/backend 從 skipped 變 success，而 **cli 那一步 10-08 掛上之後第一次真的在 CI 跑過，綠的**
2. `e96c3d999` 退回 astro 7.3.1（不是因為 7.4.2 有問題，是因為我驗的不是會落地的那個），並把 node 版本收成單一來源——三處寫死 `'22'`（deploy.yml ×2、sticky-viewport-gate）改讀 `.nvmrc`，`.nvmrc` 升 22.23.4。deploy 在 `61cd03f1f` 轉綠
3. `61cd03f1f` 把 `if` 補到另外六步（type／contracts／pytest／fork-graph）。**最新一次 run 十一步全 success**，只剩兩條已知 audit 公告紅

**順手拔掉第四個病根**：sticky-viewport-gate 修好後沒有重跑，因為它的 `push` paths **不含自己的 workflow 檔**（`pull_request` 那半有）——「改這道閘門的定義」在 PR 上驗得到、在 main 上永遠驗不到，紅燈只能留著等下一個碰到 `src/components` 的人去背黑鍋（#1662 的形狀）。補上本檔與 `.nvmrc`（`3f2e8e18a`），**那個 commit 自己就是測試**：只動本檔、成功觸發、跑完 success。

---

## Stage 4：WRAP — quality gate

| Gate                                     | 結果                                                                                                                                                                                                                          |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 本班動到的 3 則（#1891／#1897／#1902）都 `--add-assignee @me`；其餘既有 assignee 或 label                                                                                                                                  |
| open PRs ≤ 5d age 都有 review comment    | ✅ 6 ready 全處置：4 merged 附致謝、2 留開附具體 review                                                                                                                                                                       |
| broken-link gated ratio < 7%             | ✅ **0.07%**（all-langs 0.07%）。dist 開工時 STALE 24.3hr，照 Step 4.1 跑 `npm run sync:build`（**不是** `npm run build`，避開 `prebuild:status` 與 babel 搶 `_translation-status.json`），19,315 頁 2m5s，babel 滿載下零碰撞 |
| build green                              | ✅ Deploy GREEN（`3f2e8e18a`）。Engineering contracts RED = 兩條已知 audit 公告，→ #115                                                                                                                                       |
| BECOME ACK 一行記憶體頂                  | ✅ 本檔第一行                                                                                                                                                                                                                 |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | n/a — **本班非空場，vc 歸零**（4 PR merged／2 issue 修掉／1 讀者勘誤 close）                                                                                                                                                  |
| 有 fresh issue 的 cycle 至少一件被修掉   | ✅ #1897 修掉並 close（commit 附上）；#1902 標成待查證＋量出 1,045 條結構；#1891 推進（516→今晚歸零）                                                                                                                         |
| 本機與 origin 無真分岔                   | ✅ 收官 `0 0`（班中兩次當班修掉）                                                                                                                                                                                             |

**報告格式**

```
🧬 Maintainer cycle report — 2026-10-24 08:33→10:05
✅ open issues: 12（fresh 2 全動到；stale >5d 8 則多為等哲宇的 🔒 項）
✅ open PRs: 7 → ready 6 全處置（merge 4 / 留開 2）＋draft 1 reserved 不碰
✅ broken-link gated ratio: 0.07% (< 7% gate)
✅ build status: deploy green / contracts red（兩條已知 audit → #115）
✅ 連續空場 cycle vc=0（本班非空場）
⚠️ 需觀察者決策：#114 補丁腳註閘門 / #115 兩條 audit 升版 / #95 CLI 權杖（13.5d）
```

---

## Handoff 三態

繼承 `2026-10-24-071152-twmd-feedback-triage`：

- [x] ~~pending（本席位）：issue #1902 用語庫〈仿冒品〉~~ — **本班做掉**：標成待查證（`31cf3c58d`）＋量出 1,045 條同型暴露，已回覆讀者。retired by 本 session。
- [ ] pending（席位 `twmd-terminology-trends-monthly`，11-05）：用語庫 `china` 欄本土語源質疑 vc=2。**本班已把要看的數字量好**：2,306 條裡 1,045 條（45.3%）唯一來源是 1997 手冊且 notes 空白、91.3% 單一來源、73.8% notes 空白。不用從頭量，直接決定處置。

本 session 新 handoff：

- [ ] pending（收件席位 `twmd-maintainer-daily`，明天 08:30）：**對一次 #1891 的數字**。今晚 babel 應把 `lin-yu-ting-boxer` 十二語整篇重翻，516 處斷腳註該歸零。驗法：`for f in knowledge/*/People/lin-yu-ting-boxer.md; do python3 scripts/tools/article-health.py $f --check=footnote-reference; done`。沒歸零 = `requeue()` 的 `pre-toolkit` 標記沒擋住補丁，回頭看 dispatcher log。
- [ ] pending（收件席位 `twmd-maintainer-daily`）：**#1898 等投稿者回那個數字**。他若選「保留二十三年」，連帶要把 `History/荷西明鄭時期.md` 的「鄭氏的 21 年」一起對齊起算點，那是兩檔不是一檔。
- ⏳ blocked（收件席位：哲宇）：**OBSERVER-QUEUE #114**（`footnote-reference` 進補丁資格判斷，推薦 A 加一條同形判準、不動閾值；7 天無回應即 10-31 起 Full mode 可代理）。**下一次母稿重建腳註時不會有人剛好在場**——今天這 516 處是我恰好在 merge 完順手量才看到的。
- ⏳ blocked（收件席位：哲宇）：**OBSERVER-QUEUE #115**（repo 根 astro minor 升級 / workers/mcp wrangler major）。**代理條款寫死了一個條件**：要升 astro 必須先在隔離 worktree 裝好 7.4.x 跑完整 build 再推，不可只改 lockfile——今天就是只改 lockfile 把 deploy 弄紅的。
- [ ] pending（席位 `twmd-self-evolve-weekly`，明天 10-25）：**Full mode 載入清單的 footprint 已經追不上 inbox 的成長**。BECOME §Step 0 給 Full 估 ~1,880 行，而 §Step 5 要求全載的 ARTICLE-INBOX（2,748）＋LESSONS（2,717）兩檔自己就 5,465 行。本班明寫偏離並只載標題層。要決的是：(a) Full 改成載 inbox 的標題／P0-P1 層（跟 Review／Write mode 同口徑），(b) 調整 footprint 估算讓它誠實，(c) 維持全載並接受 Full mode 實際成本是估算的三倍。
- [ ] pending（席位任何 session，零判斷）：`ui-language-gate.yml` 仍寫死 `node-version: '22'`。它目前綠且不跑 astro build 所以本班沒動，但它是今天那個病根的最後一處殘留。
- [ ] pending（席位任何 session）：`.git/gc.log` 存在且 `git gc` 一直沒跑完（每個 git 指令都印兩行 warning，「too many unreachable loose objects」）。不影響正確性，但它吵了一整班。

繼承既有、非本班職權，原樣傳遞（REFLEXES #74 dedup，明細見上游檔）：

- ⏳ blocked（哲宇在營運機 app 排程頁）：`twmd-review-stock` 排程註冊（`OBSERVER-QUEUE #86` 已決），**下次時點 10-28，剩四天**；排程 `model` 欄（#110）。
- ⏳ blocked（哲宇）：#95 CLI 0.8.1 的 npm 權杖——OFF-BRANCH 🔴 已掛 **13.5 天**，`#1789`／`#1790` 的讀者在等。本班在 #95 補了一筆：那格寫「cli 測試已在 CI 真的跑過」在 10-21 是真的、10-23 又是 skipped，已由本班 `if: !cancelled()` 根治（REFLEXES #67 已驗過要帶時間戳的乾淨實例）。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班第二十四次繞開（vc=24）**：babel writer 全程在寫，所以每個 commit 都逐檔 stage。
- [ ] pending（`twmd-self-evolve-weekly` 10-25）：LESSONS `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（`twmd-weekly-report-sun` 10-25）：Cloudflare `duplicated-lang-prefix` 是否落回。
- [ ] pending（`twmd-data-refresh-am`）：`mortgage-burden` 新一期官方數字。
- [ ] pending（`twmd-distill-weekly` 10-25）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches`。
- [ ] pending（哲宇，對外溝通）：《海上的島》合作建議草稿。
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件等項，原樣傳遞。

四條週班（distill／news-lens／self-evolve／weekly-report）10-17 fire 後零 git 痕跡，警報掛到第七天，四條的下次時點都在 10-25（還有 15-18 小時）。本班無權代跑。**本班給它們留了三件指名工作**（self-evolve 的 Full footprint、distill 的兩條 LESSONS、weekly-report 的 CF 落回），若 10-25 又沉默，那三件要再等一週。

---

## 給下一個 session

最該先看的一句：**今天合併的 #1896 讓十二語譯本全部過期，而我手動把它們標回 `pre-toolkit` 才擋住補丁把 516 個斷腳註抄進新版本號。明天 08:30 第一件事是對那個數字。** 歸零就是 `requeue()` 這條路可信；沒歸零就是 `pre-toolkit` 擋不住，那整個「母稿重建腳註」的場景都還是裸的，而 #114 的推薦就不只是補一條判準。
