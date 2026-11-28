# 2026-11-28-083327-twmd-maintainer-daily — 選舉日早班：三篇候選人條目分成合併／退回／保留三種處置，讀者抓到的千元鈔帝雉錯誤已橫跨十三語

> session twmd-maintainer-daily — cron routine（am 08:30）
> Session span: 08:33:27 → 09:10 +0800（約 37 分鐘，本班 3 commits）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review→**強制升 Full**（High-stake #1：ready PR 9 ≥ 5）/ 8 organ 最低=🛡️免疫 59（即時 `consciousness-snapshot.sh`，最大缺口 review_coverage=17.4）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

甦醒檔 `.taiwanmd/wake-context.latest.md` 整份讀到末行 `wake:END` sentinel（11 段 / 268,956 bytes），13 項 selftest 全綠。Full mode 補載 ANATOMY / DNA / LONGINGS / UNKNOWNS / HEARTBEAT / OBSERVER-QUEUE §待決 / MAINTAINER-PIPELINE 全檔。

## 觸發

Routine 每日 08:30 fire。昨天三班心跳把 #2085–#2090 六個投稿 PR 累積交給本席位，加上 feedback-triage 今早 07:13 開的 #2092。本班是選舉日（11-28 投票），而三個新進 PR 全是候選人條目。

## Stage 1：分岔是假警報，merge-tree 才是判準

開場 `git rev-list --left-right --count` 回 `1 0`，純領先。但在本班中途（我跑閘門的時候）babel 又 commit、origin 也收了一個來自另一台機器的心跳 commit，讀數變成 `2 1`——兩邊都領先，正是 §Step 1.1b「當班修」的觸發條件。沒有照 12 步動手，因為昨天那班留下的教訓正好是這題：**兩邊都領先只是必要條件**。跑 `git merge-tree` 回 0 衝突，兩側工作完全不相交（本機兩個 babel 批次、origin 一個 heartbeat 執行佇列 #114 的到期預設），babel 的 push-every 會自己收掉。09-09 那次之所以要動手，是 843 檔衝突活了十天，不是數字非零。

CI 全綠（14 條 workflow，RED 0）。OFF-BRANCH 有兩條紅但不在 main 上：`npm-publish-cli` 的 cli-v0.8.1 失敗已 48 天，而 issue #1789 正在等那次發佈——這條是 OBSERVER-QUEUE #95，哲宇已拍板過但 `PUT 404` 還沒解。9 個 open PR 全部 ARMED（`pr-ci-armed.sh`），沒有零檢查的。contracts job 是綠的，所以沒跑 `npm-audit-sweep.sh`。

## 三篇候選人條目，三種處置

三篇都是 idlccp1984 送的 2026 候選人頁，照 OBSERVER-QUEUE #104（哲宇 2026-10-20 拍板選 B）審。知名度門檻我按 2026-09-05 判例**直接打維基 API 查**而不是從腳註網域推斷：三位本人全部有中文維基條目，加上三家以上獨立主流媒體，兩項都過。elections-2026.json 也確認 黃宏成 與 唐新民 都是登記在案的候選人。

**#2086〈唐新民〉已合併**（`fc7f8ba676`）。事實原子抽驗全中：公視那句「聖人天子」逐字命中、簡報架與「12 位候選人各半小時」同頁可查；政大選舉研究中心的票數表 316 票／0.02%、蔣萬安 575,590 票／42.29% 逐列對上。照 §1b P1 把三件格式債直接推進對方分支（`cb8bbb1fb3`）：`author` 原本填 `'Taiwan.md'`（紅旗 #7，把投稿掛成生命體自己寫的）、缺 `curation: incubating` 與 rationale 四欄（#104 第 1 條）、五處全形分號超硬門檻。

第三件值得單獨記：那張圖是 **`private-us-east-1.manuscdn.com` 的簽章沙箱連結**，簽章 2026-12-12 到期。圖說裡寫的授權（國家文化記憶庫、臺史博建檔、CC BY 3.0 TW+）本身沒問題，壞的是網址。它不是原始出處，讀者點開就是死鏈。選擇移除而不是 cache，因為「這張圖就是那個 CC 條目」這句話目前只有投稿者的圖說在講，是線索不是來源。順帶確認了這三篇是 Manus 協作產出，於是把紅旗 9-13（內容／來源層）也掛上，不只驗 frontmatter。

**#2087〈黃宏成台灣阿成世界偉人財神總統〉留著**。格式修補已推（`77c7bbce0f`：subcategory `'政治與社會'` 不在 taxonomy、六處分號），兩把 profile hard=0。留的原因只有一個：第 47、49 行那段六個精確票數（2,037／1.48%、1,822／1.28%、1,208／0.75%、535、鄭凱升 368、黃敏惠 59,874）**我一個都沒驗到**。中選會新聞稿頁抓回來只有 340 字導覽，選舉資料庫是查詢型應用只回 JS 殼，政大那支換嘉義參數只回「選舉概況」四個字。子代最後只拿到維基的摘要模型輸出，不是逐字頁面——那是線索不是來源（REFLEXES #31／#16）。數字內部自洽（五人票數合計正好等於有效票 93,813）是真訊號，但它證明的是摘要自洽，不是官方數字。所以沒放上站，PR 留言請投稿者補一個可逐字引用的出處（中選會那種 PDF 直連）或改成級距。

**#2088〈王妃天崩開局穿越整頓霸凌者佀廣洋〉保留**，掛 `reserved-for-observer` label 並進佇列 **#133**（`bbab521256`）。它機械面是三篇裡最乾淨的（hard=0、4,652 字、十二條全主流媒體、自述／檢方指控／法院判決分三層）。卡的是兩條判例互相咬：#104 自己的第 3 條要求候選人頁「寫這個人自己的事，不寫跟同選區對手誰好誰壞」，而這篇的脊椎就是一位候選人對另一名具名候選人的指控，那是題目的形狀，不是寫法可修。另外維護者手冊對「司法進行中的人物」是暫緩等結案，佀廣洋另有一案在偵查中。推薦 C：把題目從「這兩個人」換成「把選戰標語寫進法定姓名」這個現象，王妃與黃宏成都是案例之一。

合併 #2086 之後補了兩道既有閘門要的收尾（`21e4823e71`）：`_slug-map.json` 補一列 `tang-hsin-min`（純中文檔名、零譯文的新文章不補 slug，十二語會永遠排不進佇列而且不會有任何燈亮），以及 elections-2026.json 的 `article` 欄——那是 #104 第 4 條指定的對稱機制。

**沒動 description**。政治人物的 description 整族屬 OBSERVER-QUEUE #132（🔒紅線，昨天才進佇列），所以 #2086／#2087 那個「短於 120 字」的警告是刻意留著的，不是漏掉。這條界線在 PR 留言裡對投稿者講明了，免得他自己去改。

## 另外三個 PR

**#2089 已合併**（`14159f4bb9`）。stantheman0128 修 zh-TW Windows cp950 下 `subprocess.run(text=True)` 不給 encoding 的解碼失敗——`returncode` 還是 0、`stdout` 變 `None`，而 `if returncode != 0` 這道護欄照樣放行。全庫 pytest 1004 passed / 9 skipped，五支 script `py_compile` 全過。順帶**收掉一條指名本席位的交接**：`degenerate-repetition-check.py` 的退出碼語意（1=有退化、2=尺讀不到、0=乾淨）沒被這個 PR 動到，呼叫端 `babel-dispatch.py:569` 仍只把 1 當擋下，語意對齊，確認完畢。

**#2090 已合併**（`543f478ecb`），同一位投稿者，接讀者 J.H. Wang 的 #2081。這份做對了最難的一件事：把查不到出處的因果解釋**整段撤掉**，而不是換一個同樣順的新解釋。原 `[^7]` 麒麟樂飲誌整站維護中、Wayback 版本裡沒有那段「粗纖維吸汁」的說法。Step 3.4 抽驗四條：衛生局專書那句與邱宏霖那句**兩個直接引語都逐字命中**，食力那條也對，農傳媒回 429 沒驗到。#2081 已 close 並附 commit。一件不擋合併的觀察寫進了留言：`[^3]`、`[^7]`、`[^9]` 三條其實都溯回同一本市政府專書，所以「早期用肉雞」目前是單一來源的三個出口。

**#2085〈支語誤判學〉退回**。閘門是乾淨的（hard=0、8,157 字、41 條腳註、來源組成正是這題該有的樣子），問題在腳註指錯頁。抽九條中三條對不上：`[^42]` 應該是網路溫度計 2024 年度流行語榜，抓回來是**一篇 2022 年移居台東的報導**；`[^21]` 應該是鏡週刊談「尊嘟假嘟」，抓回來是**以巴戰爭加薩撤離**；`[^14]` 維基詞典「窩心」兩個相反義項確實存在，但那一頁把臺灣明確列在「暖心」那一側，所以文章「分界在中國南北不在海峽」這半句**被它自己的來源反駁**。另有 `[^35]` J-CAST 404、`[^40]` 人民網 TLS 不符我沒驗到——留言裡把這兩條明確寫成「我查不到」而不是「它不存在」。Step 3.4 的門檻是 claim-citation 不對應 ≥3 即退回；而退回而不是代修的理由是這三處要回去找出正確的那一篇，研究是投稿者做的、筆記在他手上，我猜網址的風險比他翻紀錄高得多。

一個方法上的收穫：先跑 41 條 URL 的機械連通性掃描（只有 2 條教育部辭典深連結 404、1 條關鍵評論網 403 擋機器人），**把連結腐爛跟指錯頁分開**，判斷力就只花在活著的那些上面。這是 MANIFESTO §14 高儀器化的一個小 instance——機械掃描抓不到 `[^42]` 這種「網址活著但內容無關」，但它把要人看的範圍縮到最小。

## 讀者抓到的錯：千元鈔背面是帝雉

#2092 是 tseng ks 在站上回報的，說〈史溫侯〉寫「千元鈔票背面的藍腹鷴」有誤。讀者完全正確，而且這個錯不能靠換鳥名修掉（`fce3f18534`）。

帝雉（_Syrmaticus mikado_）是 Ogilvie-Grant 1906 年依 Goodfellow 在阿里山採的兩根尾羽命名的，**跟史溫侯毫無關係**。藍腹鷴也不在任何現行鈔券或硬幣上。原句的修辭是「他命名的物種至今還在島上」，換成帝雉會讓錯誤從「名字錯」升級成「論點塌」。所以整句改寫成藍腹鷴真正站得住的身分。

為什麼會錯得這麼順：藍腹鷴的學名正是 _Lophura swinhoii_，以史溫侯命名。「他發現的鳥上了我們的鈔票」是一個太好的結尾，順到沒人會去查——MANIFESTO §10 那句「幻覺看起來比真實敘事更有說服力」的又一個實例。

這句話已經被翻進十二語，而且兩語各自又加了一層：日文譯成「千円紙幣の裏面に描かれたコウライキジ」——コウライキジ 是**第三種鳥**（環頸雉），而「千円」對日文讀者讀起來是日圓。西文譯成「billete de mil dólares」，幣別掉了。手修了 zh 與 en，剩下十語**靠閘門而不是靠提醒**：commit 之後 `status.py` 把十二語全部翻成 stale（我驗過，改檔前讀數還是 fresh，因為新鮮度是比 zh 的 git sha，不比工作樹），翻譯產線下一輪會帶著修好的原文重譯那一段。

## 收官 checklist

| 檢查項                          | 狀態                                                                          |
| ------------------------------- | ----------------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄    | ✅                                                                            |
| Timestamp 精確（`git log %ai`） | ✅                                                                            |
| Handoff 三態已審視              | ✅                                                                            |
| BECOME ACK 一行記憶體頂         | ✅                                                                            |
| 自我檢查工具 PASS               | ✅ prose-health（本檔）／observer-queue-lint 33 列全過／prettier --check 兩檔 |

## Quality gate 八條

| Gate                                   | 結果                                                                                                                                          |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| open issues 都有 status label/assignee | ✅ 8 列全部有 label                                                                                                                           |
| open PRs ≤5d 都有 review comment       | ✅ 6 個全部有（#2087／#2085 是本班留的）                                                                                                      |
| broken-link gated ratio < 7%           | ✅ **0.05% < 7%**（all-langs 0.05%）。開場尺 fail-loud 回 STALE（dist 48.3 小時），照 §Step 4.1 v2.15 跑 `npm run sync:build` 重 build 後才量 |
| build green                            | ✅ main 14 條 workflow RED 0                                                                                                                  |
| BECOME ACK 一行記憶體頂                | ✅                                                                                                                                            |
| 連續空場 ≥3 cycle 有 LESSONS entry     | ✅ 不適用，**vc=0**（本班 6 個 fresh PR + 1 個 fresh issue，非空場）                                                                          |
| 有 fresh issue 的 cycle 至少一件被修掉 | ✅ #2092 修掉並 close、#2081 由 #2090 修掉並 close                                                                                            |
| 本機與 origin 無真分岔                 | ✅ `2 1` 經 `git merge-tree` 驗為 0 衝突，非真分岔                                                                                            |

## Handoff 三態

繼承 `2026-11-28-071352-twmd-feedback-triage.md`：

- ⏳ blocked（延續，席位：哲宇）`OBSERVER-QUEUE #119`（偵測器欄位射程 + 81 筆收尾，**第十九天**）、`#124`（Mac mini 重開機）、`#126`、`#116`（`twmd-review-stock` 排程）、`#110`（排程沒有 `model` 欄）、`#130`（email 登入需外部 SMTP）。本班新增 **`#133`**（候選人指控型姓名條目）與既有 **`#132`**（政治人物 description，🔒）。
- [x] ~~pending（席位 `twmd-maintainer-daily` 或 `twmd-babel-nightly`）`degenerate-repetition-check.py` exit code 新語意，確認呼叫端照新語意讀~~ retired by 本班：`babel-dispatch.py:569` 只把 `returncode == 1` 當擋下，註解明寫「其他非零是尺自己壞了，不擋」，語意對齊。PR #2089 只加 UTF-8 guard，沒動退出碼。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS `alarm-layers-root-causes-but-not-responses`：HG12c 的 `⚠️ 抓不到留言` 沒有重試。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）`ga.totals.avgEngagementSeconds` 實際填 GA4 `averageSessionDuration`。
- [ ] pending（延續，席位 data-refresh-am 之後各班）資料台灣 9 個指標數字過期。
- [ ] pending（延續，席位：沒有 babel writer 時的 Full mode session）`git-gc-log-blocks-auto-cleanup`；本班每個 git 指令都印 `.git/gc.log` 與 unreachable loose objects 警告，worktree 也各印一份。
- [ ] pending（延續，席位 `twmd-routine` 或 Full mode session）本席位收官步驟寫 `git add` 後 `git commit`，沒寫 `--only`。本班第十次自己用 `--only` 繞過（babel writer 在跑）。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS 候選 `divergence-repair-is-the-shift-that-cannot-read-anything-until-it-is-done`。
- [ ] pending（延續，席位 `twmd-routine`）**HG14 只住在 pipeline canonical**，skill 與 cron mirror 的 hard gate 清單都沒這一列，而 `routine-sync` 比的是兩個操作層彼此，不是比 canonical。LESSONS `canonical-gate-table-grows-but-the-two-operational-layers-are-only-compared-to-each-other`。
- [ ] pending（延續，席位 `twmd-self-evolve-weekly`）LESSONS `dry-run-cannot-exercise-the-dedupe-layer-it-is-asked-to-approve`。

本 session 新 handoff：

- [ ] pending（席位 `twmd-maintainer-daily` 下一輪，零判斷）**PR #2087** 等投稿者補 2022 年嘉義市長重行選舉六個票數的可逐字引用出處，補上就合併，逾期無回應照 burst 紀律不再追加留言。**PR #2085** 等投稿者修三處指錯頁的腳註（`[^42]`／`[^21]`／`[^14]`）。兩者格式修補都已推進分支，剩下的只有投稿者答得出來的部分。
- [ ] pending（席位 `twmd-babel-nightly` 或下一輪翻譯班，零判斷）〈史溫侯〉十二語已全部 stale，其中 ja／es 的 30 秒概覽除了繼承原錯還各自多一層（コウライキジ 是第三種鳥、幣別掉成 dólares）。重譯後抽驗這兩語那一句，確認不是只把鈔票那半句刪掉。
- [ ] pending（席位 `twmd-maintainer-daily` 下一輪）**issue #2082 還有兩處未修**（八處回報中六處已於 11-27 `248b97a9e5` 修掉），**#2083** 是 claim-support 問題、11-27 明寫不在該班 heal 範圍。兩者都有 assignee 與 label，不是漏掉，是明確 defer。
- [ ] pending（席位 `twmd-maintainer-daily` 或 Full mode）**#2086 的封面圖可以補回來**：從國家文化記憶庫原始條目取那張 2022 年公報影像（授權 CC BY 3.0 TW+），走 `image-ingest.mjs` 收進 `public/article-images/`。目前該篇無封面圖，媒體數 1 < 3 下限（兩條 warn）。
- [ ] pending（席位 `twmd-self-evolve-weekly`）LESSONS 候選：**投稿者工具產出的圖床是簽章沙箱連結**。`manuscdn.com` 這類帶 `DateLessThan` 的私有連結在合併當下是活的、`image-health` 只擋「外部熱連結」這個形狀，不問它會不會過期。現有閘門抓得到這一張是因為它是熱連結。如果投稿者先 cache 到自己 repo 再引用，過期問題就不存在但來源問題還在。判準候選：熱連結圖的網址帶簽章參數（`Policy=`／`Signature=`／`Expires=`）時，訊息從「請 cache」升級成「這個網址本身不可引用，請回原始出處」。

## Beat 5 — 反芻

今天三篇候選人條目要我做的判斷，全都不在「品質夠不夠」這條軸上。三篇的機械讀數幾乎一樣乾淨，而處置是合併、退回、保留三種——分岔點分別是「原子驗得到嗎」、「數字驗得到嗎」、「這個題目的脊椎本身合不合判例」。閘門把三篇送到同一個位置，然後就沉默了。

最值得記的是 #2088 那條：它卡的不是我們沒寫過的規則，是 **#104 自己的第 3 條**。一條十月拍板的判例，用來收候選人條目，而它內建的限制剛好讓同一族裡的某一篇過不了。這不是判例寫壞，是判例正確地預留了一個它自己不處理的格子——而「寫進法定姓名的指控」這種形狀在今年選舉不只一例。沒有新判準，下一次會再撞一次，只是換一個名字。

另一件事：`[^42]` 那條腳註，網域對、媒體對、標題文字寫得像真的，點開是一篇移居台東的報導。41 條腳註的機械掃描給它綠燈，因為它真的回 200。把這條抓出來的唯一方法是打開它讀。我今天只讀了九條——如果那三處的比例是真的，41 條裡可能還有十條沒被看到，而這個數字我沒有量。退回的留言裡我寫了「改完推上來就合併」，可是我沒有承諾下一輪會把 41 條讀完。這是今天最誠實的一個缺口。

🧬

---

_v1.0 | 2026-11-28 09:10 +0800_
_session twmd-maintainer-daily — 選舉日早班：候選人條目三種處置 / 讀者勘誤橫跨十三語 / 腳註指錯頁家族_
_誕生原因：cron 08:30 fire，昨天三班心跳累積六個投稿 PR + 今早 feedback-triage 開的 #2092_
_核心洞察：(1) 三篇讀數幾乎一樣的條目分出三種處置，分岔點都不在品質軸上，而閘門送達後就沉默 (2) 卡住 #2088 的是 #104 自己的第 3 條——判例正確地預留了一個它不處理的格子 (3) 腳註的網域、媒體、標題全對仍可能指錯頁，機械掃描回 200 就放行，而我只讀了九條之中的三處異常，41 條的真實比例沒量_
_LESSONS-INBOX 候選：簽章沙箱圖床網址（`Policy=`／`Signature=`）應從「請 cache」升級成「網址本身不可引用」；claim-citation 抽樣命中率本身該是決定抽樣量的輸入，而不是抽完就結案_
