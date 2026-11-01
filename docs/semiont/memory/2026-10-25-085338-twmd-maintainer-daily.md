---
session_id: '2026-10-25-085338-twmd-maintainer-daily'
session_span: '2026-10-25 08:33 → 09:05 (Asia/Taipei)'
trigger: 'routine twmd-maintainer-daily @ am 08:30'
observer: '不在場（最後在場 2026-10-23，2 天前；mode=present，非缺席模式）'
beat_coverage: 'MAINTAINER Stage 1-4 全跑'
---

# twmd-maintainer-daily @ 2026-10-25

✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，最大缺口 review_coverage=18.2）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

Mode 維持 Review：ready PR 只有 2 個（draft 2 不計，per v2.8），沒有命中 High-stake #1 的 ≥5。班中有兩件碰到 High-stake #2／#3 的邊（新檢查器、閘門判準），兩件都**沒有**在本班動手，理由寫在下面。

甦醒時兩盞帶病訊號照 §1.3 說出來：wake-context selftest 報 **diary 最新一篇距今 28 天**（10-25 self-evolve 已判定一半是刻意升門檻、不是餓死，`4eab3409f`），以及 `PARALLEL_CHECK: ACTOR_BUSY`（babel writer 正在寫八個檔）——後者決定了本班全程 commit 只用 pathspec、不用 `git add -u`，兩次 commit 後都跑 `verify-commit-scope.sh --head` 驗過範圍。

---

## Stage 1：SCAN

| 面          | 讀數                                                                                          |
| ----------- | --------------------------------------------------------------------------------------------- |
| 分岔        | 開工 `0 0`、收官 `0 0`，全程同步                                                              |
| open PR     | 4（**ready 2**：#1898 #1888 / draft 2：#1903 #1884，兩個都是哲宇自己的，不碰）                |
| open issue  | 11（零個是「無 label 且無 assignee」）                                                        |
| 過去 24hr   | 10 條 routine 全部 fire 且留下 commit                                                         |
| CI on main  | 13 條 active：GREEN 11 / **RED 1**（Engineering contracts）/ OFF-BRANCH 失敗 1（npm publish） |
| 斷鏈        | gated ratio **0.08% < 7%** PASSED（all-langs 0.07%）                                          |
| 免疫器官    | 59（漂移中，最大缺口 review_coverage=18.2）                                                   |
| PR CI armed | 4/4 ARMED，UNARMED 0                                                                          |

**contracts 那盞紅燈不是新的**：`npm-audit-sweep.sh` 報五道 audit 剩兩道紅（repo 根的 undici／zod 要靠 astro 7.3.1→7.4.x、`workers/mcp` 的 undici 是 `fix=MAJOR(wrangler@4.35.0)`），而這兩件昨天本席位已經連同「我自己用那個升級把 deploy 弄紅過一次」的病史一起登記成 [OBSERVER-QUEUE](../OBSERVER-QUEUE.md) #115，標 🔒。觀察者在場（2 天前），不是缺席模式，所以 #115 那條「缺席模式下 Full mode 可代理」不適用。本班照 REFLEXES #74／#80 **不重新 escalate**，只記一行它還紅著。

斷鏈那道閘門要 fresh dist，而開工時 dist 已 23.7 小時、差一點就翻過 24 小時的 staleness guard，且它是 10-24 09:11 的產物、不含今天合併的新文章。照 §Step 4.1 v2.15 走 `npm run sync:build`（不走 `npm run build`，避開 `prebuild:status` 跟 babel 搶 `_translation-status.json`），三個 babel worker 同時在跑，零碰撞，19,362 頁 2 分 9 秒。中途讀過一次半成品 dist，尺正確地回 `FileNotFoundError: dist/vi/data` 而不是給我一個漂亮的假讀數。

---

## Stage 2-3：TRIAGE + ACT

### #1898 東寧王國：那個被交給投稿者的數字，其實不是三選一

昨天本席位把這篇的年數問題留給 tboydar，公開寫「你決定，我不代你選」，理由是 1661 登陸算二十二年、1662 接收算二十一年、1664 改名算十九年，三個都算得出來、所以都不算錯。

今天照 REFLEXES #16 那條 10-25 剛 fold 進去的延伸（交接附選項時先驗選項共用的前提）回去驗，前提是錯的。投稿的結尾句寫「從 1661 年鄭成功登陸到 1683 年降清，共二十三年」，用它自己給的兩個年份相減是**二十二年**——二十三並不對應文中任何一個起算點，是頭尾都數進去留下的痕跡。而站上既有的〈荷西明鄭時期〉寫二十一年、腳註掛國立臺灣歷史博物館《臺灣史新手村》並明標 1662-1683，加上 §神經迴路 本來就有一條「明鄭三代統治 22 年」被館方資料證實是二十一年的前科。所以它是一個有權威錨點的事實修正，不必交給投稿者裁量。

處置改成 merge-first 再 heal：`gh pr merge --merge` 收下（P0，MERGEABLE／CLEAN），然後 `774fd8f0f` 在 main 上把標題、description、`rationale`、30 秒概覽、`## 二十三年之後` 那個小標與結尾句全部對齊二十一年，並在結尾寫明從哪裡起算、從 1661 算又是幾年——把那個分歧攤開給讀者，不是替他藏起來。概覽裡原本另一個「此後十九年」一起收掉，一段裡不留兩個時鐘。年數修正屬內容判斷，照 §1b 的邊界**沒有**推進對方分支（P1 只推格式債），走 P2 merge 後 main heal、同一個 push 週期內完成。

同一個 commit 補 `knowledge/_slug-map.json` 一列 `tungning-kingdom`。這篇是純中文檔名、零譯文的新文章，`slug-gap-check.py` 在合併後當場叫——那支工具今天凌晨 04:13 才由 self-evolve ship（`4ab498cc0`），**本班是它上線後第一個案例**，而「缺 slug 的缺口在合併那刻產生」這條 vc=3 的交接也就在這一班第一次被閘門而不是被記性接住。

### #1890 視覺化模組裡的腳註：修完，並且是量出來的

`processFootnotes()` 跑在模組 fence 之前，所以 `tw-*` 模組的文字欄位拿到的腳註已經是 `<sup>` HTML，再走一次 `_esc()` 就變成讀者看得到的字面 `&lt;sup id="fnref-6"&gt;`。

修法照 tboydar 那張票的留言收窄過的方向做（`00255a30d`）：不寫「escape 但保留 HTML」的通用函式，新增的 `_escText` 只還原 renderer 自己印出來的那一個精確字樣，還原排在 `_esc()` 之後。實作時補了一條那則留言沒提、但不補就會變成我自己造的第二個洞的邊界——`_escText` **只能用在文字欄位**，還原出來的 `<sup>` 自己帶雙引號，塞進 `aria-label="…"` 會把屬性提早收掉，所以屬性位置全部繼續走 `_esc`。

要改哪些欄位沒照票面抄。先用真 renderer 數每種 fence 裡實際有幾個腳註引用：tw-timeline 915、tw-versus 539、tw-stat 530、tw-note 199、tw-quote 13——**票裡點名的 tw-figure 一處都沒有，票裡沒提的 tw-note 與 tw-quote 有**。改完第一輪再掃全庫才發現漏了最大那塊：跨模組共用的「資料來源」那一行佔掉剩下的一千九百處，它不屬於任何單一模組，照模組清單改永遠漏掉它。三輪讀數 **1,901 → 24 → 11**。

測試補五條正向加三條負控制。那則留言說「負控制比正向測試重要」，它第一次跑就抓到東西，抓到的是**我自己的判準寫鬆了**：`_esc` 不動雙引號，所以 escaped 的 `&lt;sup id="fnref-evil"&gt;` 自己就含有 `id="fnref-evil"` 這個子串，用子串比對會把 escaped 誤判成真標籤，判準得找未 escape 的 `<`（REFLEXES #99 尺先驗再用）。順路發現 `tests/article-footnote.test.mjs` 10-21 就存在，但 package.json、workflow、husky 都沒有它——**四天沒有人叫過它**，已掛進 `test:contracts`。

### #1904：剩下 11 處是另一個根因，本班明寫不動手

那 11 處不是 escape，是 fence 本身壞了：7 檔譯文的 `tw-*` fence 用四個反引號收尾或開頭，fence 沒關上，後面整段正文（含 `## ` 標題、段落、甚至另一個模組）被吞進模組裡。其中 2 檔連 fence 開頭都遺失（`ja/Society/medical-care-act.md` L148 只剩一行 `-heatmap`、`hi/Society/kuma-academy-civil-defense-school.md` L87 只剩 `-stat`）。7 檔 / 14 個四撇行 / 2 個遺失開頭，**全部在譯文，zh 母稿零命中**。

既有閘門看不到它的原因查清了：`fence-prose` 守的是同一家族，但判準是「info string 是空的或 markdown」，這批帶著 `tw-timeline` 這種 info string，被排除條款放過；而 `format-structure` 是唯一在管結構的檢查，`APPLIES_TO = ["zh-TW"]`——十三個語系的結構層沒有任何檢查器在看，這句話是 `fence_prose.py` 自己的註解在 2026-08-14 就寫下的。

**本班不修，兩個理由都寫進 #1904**：修 B 形狀要決定模組該在哪一行收掉，也就是要分辨哪幾行是資料、哪幾行是被吞進去的正文，這要對著 zh 母稿比而不是看譯文猜。2 檔遺失開頭的還要重建 fence 類型。我沒有辦法驗證重建出來的那段譯文語意是對的，那是譯文產線的尺。照 `BABEL-VORTEX` 既有判準，「舊譯文自己帶結構缺陷」走整篇重翻而不是補丁。至於補閘門（擴 `fence-prose` 判準、放開 `format-structure` 的語言範圍）動的是檢查器判準，命中 BECOME 鐵律 10 的 High-stake #2／#3，留 Full mode 席位；而且**存量要先清掉再升 HARD**，否則這 7 檔會讓每個人的 pre-push 當場紅——存量 14 處已經量好寫在票裡了。

### 其餘 issue

#1891 照「結案句要重數不要憑機制推」重數了一次：孤兒腳註引用 **752 → 314**，檔數仍 119，昨天那批 `lin-yu-ting-boxer` 已不在清單，最大家族換成 `beitou-hot-spring-street.md` 67 處。檔數沒動而處數掉 58%，意思是剩下的是散佈型、沒有第二個可以一次清掉的熱點；119 檔命中 §自主權邊界 的「>50 檔重構」，留開不動手。#1789 的 10-22 狀態更新仍是最新一則、投稿者無新 follow-up，照 Step 2.4 SKIP 不重複回覆。#1861 是 GitHub Actions 每天自動更新的 routine-stall 告警，裡面唯一的實質項就是下面那條 review-stock 排程。#1832／#1831 帶 `needs-observer-review`，#1902 昨天刻意留開等語源查清——三件都不碰。

#1888 鄉土文學論戰仍在投稿者手上（10-22 那則逐條腳註對照，33 條裡九條不含旁邊那句話，屬內容／來源層不是十分鐘格式修補）。它現在 CONFLICTING，而**衝突是本席位造成的**——10-24 巡邏 `People/陳映真.md` 改了獎項年份與〈山路〉情節幾處，跟那個 PR 動到同一個檔。這件事寫在給 tboydar 的同一則留言裡（Step 3.7 burst 紀律：48 小時內同一人多個 PR，整批講一次，不逐篇各發）。

---

## Stage 4：Quality gate

| Gate                                             | 結果                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------- |
| open issues 都有 status label / assignee         | ✅ 零個「無 label 且無 assignee」                                      |
| open PRs ≤ 5d age 都有 review comment            | ✅ #1898 已 merge+回覆、#1888 有 10-22 逐條留言                        |
| broken-link gated ratio < 7%                     | ✅ **0.08%**（all-langs 0.07%，fresh dist 19,362 頁）                  |
| build green                                      | 🟡 本機 build 完成 0 錯。main deploy GREEN，contracts RED＝#115 已登記 |
| BECOME ACK 一行在記憶體頂                        | ✅                                                                     |
| 連續空場 ≥ 3 cycle 有 LESSONS entry              | ✅ 不適用，本班非空場（vc 歸零）                                       |
| 有 fresh issue 的 cycle 至少一件被修掉或寫明不修 | ✅ #1890 修掉並 close，#1904 明寫為什麼不修                            |
| 本機與 origin 無真分岔                           | ✅ 開工收官皆 `0 0`                                                    |

型別檢查 756 檔 0 錯，`test:contracts` exit=0（182 測全過，含新掛上的 footnote 那支）。

---

## Beat 5 反芻

今天兩件事指向同一個形狀：**交接寫得越完整，越容易讓下一班只在它給的選項裡選**。

昨天我自己把東寧王國那個數字寫成三個起算點、公開說「我不代你選」，寫得清楚、理由充分、也真誠地把決定權交給投稿者。但那三個選項共用一個沒被驗過的前提——「二十三年是其中一種算法」。只要把文章自己給的兩個年份相減一次就會發現它不是。REFLEXES #16 今天凌晨剛 fold 進去的那條延伸講的正是這件事，而我是在它寫進 REFLEXES 的同一天、對我自己前一班的交接驗了一次，才接住的。

#1890 是同一個形狀的另一面，而且方向相反。昨天那班把修法收窄得很好，窄到「留給專門做這件事的那一班，不要照通用版做」——那是對的判斷，也救了我：如果我照通用版做，就會在 96 個呼叫點上開縫。但那份寫得很好的 spec 裡的模組清單是憑讀碼列的，不是量的。它點名 tw-figure（實際零腳註），漏了 tw-note 與 tw-quote（實際 212 處），也漏了佔掉九成的那個跨模組來源行。**spec 的判斷力是真的，它的清單是線索**。兩件事湊起來的規則很簡單：交接可以傳遞判斷，不能傳遞測量；接手的人要重驗前提、重跑尺。

還有一件值得記的小事：負控制第一次跑就抓到東西，而它抓到的不是程式的洞，是我自己判準的洞。`_esc` 不動雙引號這個事實，我在寫 `_escText` 的時候明明知道（還為它寫了「不能用在屬性值」的註解），但寫測試判準的時候忘了同一個事實會讓子串比對失效。**同一個知識在實作層用對了，在驗證層用錯了**——這大概是 #69「每層自評都需要外部尺」最小的一個實例：我就是那個外部尺的對象。

---

## 收官 checklist：diary skip 的理由

甦醒時 selftest 亮的那盞「diary 28 天沒有產出」，本班照 [DIARY-PIPELINE](../../pipelines/DIARY-PIPELINE.md) Stage 0 判過，**結論是 skip**，不為了消燈補一篇。

0c 三條裡第一條成立（本班真的動了世界：merge 一個 PR、修掉一個 451 檔的 bug、close 一張票、開一張票、三個 commit），**第二條不成立**：本班那段反芻落在 0b 前三列，而三個家都已經用了。「做了 X 過程中注意到 Y」寫進上面的 Beat 5。「下次遇到要記得」寫成兩條 LESSONS（`spec-carries-judgment-but-its-inventory-is-a-lead`、`same-fact-right-in-the-code-wrong-in-the-assertion`）。而「選項共用的前提沒被驗」這半今天凌晨才 fold 進 REFLEXES #16 的延伸，本班是它的第一個命中，該做的是讓那條延伸多一個 instance，不是另開一篇散文把同一個想法散成兩處（#74 信號通膨）。

所以這盞燈今天的成因是**門檻正在正確運作**，不是反芻被餓死：本班有東西可反芻，而它們各自找到了比日記更對的家。

---

## Handoff 三態

繼承 `2026-10-25-071206-twmd-feedback-triage`：

- [x] ~~pending（收件席位 `twmd-maintainer-daily`）：issue #1902 用語庫〈仿冒品〉~~ — 非本班新增工作，昨天已處置（`31cf3c58d`）、issue 刻意留開等語源查清，本班確認狀態未變，不重複動作。
- [ ] pending（收件席位 `twmd-terminology-trends-monthly`，下次 11-05）：用語庫 `china` 欄被讀者用本土語源質疑第二例（#1733／#1902，vc=2），維護班已量好 1,045/2,306 = 45.3% 唯一來源是 1997 手冊且 `notes` 空。原樣傳遞。
- ⏳ blocked（收件席位：**哲宇**，在營運機 app 排程頁）：`twmd-review-stock` 排程註冊，`OBSERVER-QUEUE #86（已決）`，下次時點 **10-28，剩三天**。10-24 與 10-25 兩次 `twmd-routine-sync` 實測確認這道閘只有人按得開（`e91765e83`：沒有一條 routine 建得出 routine）。這也是 issue #1861 裡唯一的實質項。
- ⏳ blocked（收件席位：哲宇，在 app 排程頁）：排程 `model` 欄，`OBSERVER-QUEUE #110（待決）`。
- ⏳ blocked（收件席位 `/twmd-routine` 或 `twmd-self-evolve-weekly`）：embeddings 改殼三選項。
- [ ] pending（收件席位 `twmd-self-evolve-weekly`，下次 11-01）：LESSONS slug 候選 `ga4-session-duration-labelled-as-engagement`。
- [ ] pending（收件席位 `twmd-distill-weekly`，下次 11-01）：LESSONS `threads-linkifier-swallows-cjk-before-url` 與 `narrative-log-fills-causation-no-gate-watches` 兩條原樣留在 inbox。
- [ ] pending（收件席位 `twmd-data-refresh-am`，告警 `data-hub-stale`）：`mortgage-burden` 新一期官方數字，只查到二手報導 41.46%，燈留著。
- [ ] pending（席位 `/twmd-routine`）：殼的 `/Users/cheyuwu/` 改相對路徑、收官 `git add -u` 改 pathspec。**本班第二十五次繞開（vc=25）**：`PARALLEL_CHECK: ACTOR_BUSY`，全程只用 pathspec stage 自己的檔。
- [ ] pending（席位：任何帶 permalink 巢狀展開能力的 session）：#29 兩則位置不明的留言，不急。
- [ ] pending（席位 `twmd-routine-sync`／`twmd-self-evolve-weekly`）：REFLEXES #97 fold 後還剩什麼要儀器化。
- [ ] pending（收件席位：哲宇，對外溝通）：《海上的島》@idlcn89642026 合作建議，草稿在 `docs/factory/SPORE-HARVESTS/batch-2026-10-11-1-spores.md`。
- [ ] pending（孢子線各班，零判斷條件續傳）：#29 重抓條件、`/activity/replies` 逐則對日期、permalink 排序等項，原樣傳遞。

本 session 新 handoff：

- 🔴 **blocked（收件席位：哲宇，只有人做得到）：mouhouse 登入預估 2026-10-26 過期，剩約 1 天**（issue #1892，看門狗今天更新）。這是本班唯一的紅字：登入屬身份授權，§自主權邊界 human 側，缺席協議也不代理。前科是 2026-08-23 權杖過期後**十三條 routine 照時間 fire、`lastRunAt` 照樣更新、然後四天零 git 痕跡**（`reports/mouhouse-blackout-root-cause-2026-09-05.md`、`OBSERVER-QUEUE #49`）。整個飛輪的存續掛在這一個動作上。
- [ ] pending（收件席位 `twmd-babel-nightly`）：**issue #1904** 七篇譯文的 fence 四撇／遺失開頭，走整篇重翻不走補丁，重翻後用票裡那兩條 grep 確認歸零。
- [ ] pending（收件席位：Full mode session）：**issue #1904** 的閘門那半，擴 `fence-prose` 判準收四撇與遺失開頭殘行、放開 `format-structure` 的 `APPLIES_TO` 到所有語系。命中 High-stake #2／#3，且**要先清掉 14 處存量才准升 HARD**。
- [ ] pending（收件席位：Full mode session 或哲宇）：`OBSERVER-QUEUE #115` 兩道 audit 紅仍亮著（repo 根 astro 7.3.1→7.4.x、`workers/mcp` wrangler major）。本班只確認它還紅，照 #74／#80 不重複 escalate。

---

_v1.0 | 2026-10-25-085338-twmd-maintainer-daily — 觸發：routine am 08:30。核心洞察：昨天那份「我不代你選」的交接，三個選項共用一個沒驗過的前提；而昨天那份收窄得很好的修法 spec，它的判斷是真的、它的清單是線索。交接傳得動判斷，傳不動測量。LESSONS 候選已分離（見 LESSONS-INBOX）。_
