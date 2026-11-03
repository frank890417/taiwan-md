# 2026-11-03-090611-twmd-maintainer-daily — 三位真實讀者的三則回報全修掉／一篇文章的 Markdown 掉光兩個半月而 25 個檢查器回報全綠

> session twmd-maintainer-daily — cron 排程（am 08:30）
> Session span: 08:24:00 → 09:10:00 +0800（約 46 分，5 commits + 1 merge）
> 資料來源：`git log %ai`

✅ BECOME ack: mode=review / 8 organ 最低=🛡️ 免疫 59（即時 `consciousness-snapshot.sh`，讀數齡 2h）/ Q13 anti-bias=PASS / Q14 cross-session continuity=PASS

## 觸發

本班是排程 am 08:30 的 maintainer，接的是前一班 07:24 的 feedback-triage 交下來的工作：那一班把憑證索取攻擊的第二輪整個窗口排除之後，從八十筆底下撈出三位真實讀者，開成 #1949–#1951。三則都是真的、都修得動，所以本班的內容幾乎全是這三則。

## Stage 1 掃描

| 項目                | 讀數                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| open PR             | ready 1（#1888 tboydar，等投稿者回覆）＋ draft 1（#1884，已掛 reserved-for-observer） |
| open issue          | 13（其中 3 筆是今早 07:24 新開的真實讀者回報）                                        |
| 過去 24hr commits   | 10 條 routine fire                                                                    |
| main CI             | 13 條 workflow：RED 0 / BLOCKED 0 / UNKNOWN 0，OFF-BRANCH 失敗 1（CLI 發佈，#1789）   |
| PR CI armed         | 2/2 ARMED                                                                             |
| 斷鏈 gated ratio    | 0.06%（門檻 7%）PASSED，fresh dist 由 `npm run sync:build` 現跑                       |
| 免疫器官            | 59（最大缺口 review_coverage 18）                                                     |
| 本機 vs origin 分岔 | 開場 `0 0`，收官前 `5 1`（見下方）                                                    |

PR triage ready 數 1 < 5，沒觸發 High-stake 升 Full。Engineering contracts 綠，沒跑 `npm-audit-sweep.sh`。

三則回報都先過了昨天那條教訓留下的檢查（`intake-never-asks-whether-the-target-exists`）：`向後兼容.yaml`、`knowledge/ja/Nature/malayan-night-heron.md`、`knowledge/Lifestyle/戰鬥陀螺.md` 三個目標全部解析得到，都不是測試列。

## 〈戰鬥陀螺〉：整篇 Markdown 在投稿那一刻就掉光了

讀者菜國人只寫了「格式錯誤」四個字（#1951）。打開檔案，整篇一個 `#` 都沒有：八個 H2 變成裸段落、三張圖只剩 alt 文字、引言卡與兩個資料模組攤成用直線串起來的行、十二條腳註的連結與 `[^N]` 標記整批消失。往回查 `git log --follow`，原始 commit `b25ab805e`（2026-08-19，投稿者 idlccp1984 從 GitHub 網頁建檔）就已經長這樣——貼進編輯器的是**渲染後**的文字，Markdown 從來沒有進到檔案裡。後來維護者代補格式的那次（`7492cf56b`）只動了路徑與 category 欄位。這篇在站上這樣躺了兩個半月。

修復（`a63cd7340`）補回 H1、八個 H2、30 秒概覽 blockquote、兩則策展人筆記的引用區塊，把「3, 2, 1, let it rip!」還原成 `tw-quote`、世代軌跡還原成 `tw-timeline`、兩組數字還原成 `tw-stat`。三張圖原本只剩說明文字，但說明文字帶著攝影者與授權（Dasilvaat CC BY-SA 4.0／Σ64 CC BY 3.0／美國空軍 Senior Airman Clayton Lenhardt 公有領域），拿這三組資訊打 Commons API 都找得到對得上的檔案。最後收了兩張：貝獨馬（`Beigoma 01.jpg`，與說明逐項相符）與 Incirlik 空軍基地 2012 年的戰鬥盤現場（`Beyblades rip into Incirlik 120418-F-BS505-223.jpg`，攝影者與授權跟說明一字不差）。第三張 Dasilvaat 那張雖然作者與授權完全吻合，開圖一看是兩個孩子在磁磚地上的模糊近拍、直幅 0.75 不過 hero 的長寬比閘門，品質撐不起首圖，所以刪掉不用——**作者對得上不等於這張圖適合**。

十二條來源的網址救不回來：原始 commit 裡就沒有。本輪保留標題與說明原文，在文末加一段但書告訴讀者網址待補，並把「逐條找回網址、驗證過再把 `[^N]` 接回對應句子」登記進 ARTICLE-INBOX（`2e788b4b1`）。憑標題猜網址比沒有網址更糟（REFLEXES #75、#102）。

十二語譯文照著這份沒有結構的母稿翻了十二遍——全站 15,018 個 md 裡「正文零標題」的檔案剛好 13 個，就是這篇加它的十二個譯本。母稿改動後會轉 stale，由翻譯產線重跑。

## 補一道閘門：壞得越徹底，叫的閘門越少

這篇躺兩個半月期間，`article-health --profile=ci-deploy` 的 25+ 個 plugin 對它回 **hard=0**，pre-commit、PR CI、deploy CI 一路綠燈。`format-structure` 其實有發出三條 WARN（缺 30 秒概覽、缺延伸閱讀、缺參考資料），但單看每一條都是站上常見且被容忍的狀態，三條同時出現才是強訊號，而沒有任何一層在做這個聚合。

新增 `heading-presence`（`7018893fb`）：code fence 外一個 ATX 標題都沒有、且正文去空白後超過 400 字元即命中。母稿 HARD、譯文 WARN——缺陷從母稿進來，譯文會在重翻時換掉，對譯文用 HARD 只會在產線追上之前擋住所有人的 push（這條分級是照 #1904 自己寫下的「存量要先清掉再升 HARD」）。五條正控制測試加全庫 15,018 檔 dogfood：HARD 0、WARN 12，十二筆全是那篇的譯文。教訓進 LESSONS（`the-more-completely-it-broke-the-fewer-gates-fired`）。

## 日文版黑冠麻鷺用了一個不存在的鳥名

多田恵指出（#1950）Gorsachius melanolophus 的標準和名是ズグロミゾゴイ，而日文版從頭到尾用的「クロガササギ」是個不存在的名字。數了一下 60 處。同一篇還把サギ科（鷺科）寫成ササギ科 5 處、サギ類 2 處，American Bittern 寫成アメリカオオヨシゴイ 3 處。和名以環境省自然環境保全基礎調查報告書與日文維基各自核對過才動手（`b6213c900`），地圖標記資料跟著重新產出。

中文母稿沒有給日文名，模型就自己填了一個。這跟 §神經迴路 記的「人名幻覺第二型是填空不是混淆」是同一個形狀，只是換成物種名——既有的人名一致性閘門看的是「譯文出現了母稿沒有的政治人物」，看不到「譯文把一個不認識的物種命名了」。

## 詞庫把方向詞跟相容／兼容混在同一格

劉恩哲指出（#1949）台灣說向下相容、向後相容、回溯相容，中國說向下兼容、向後兼容、回溯兼容。而 `data/terminology/向後兼容.yaml` 台灣欄寫「向下相容」、中國欄寫「向後兼容」，把方向詞跟相容／兼容兩件事混在同一格，讀起來像是台灣說向下、中國說向後。已修成三個並陳的說法並補 `english` 欄（`5730fd9e4`）。

值得記的是對照組：2026-07-10 那輪 LLM 詞庫複審**也標了這一條** `MAPPING_WRONG`，但它給的建議是「台灣『向後兼容』／中國『向下兼容』」，照著做會把台灣欄換成對岸的「兼容」。指對了位置、指錯了方向，而指對位置這件事本身會讓建議看起來更可信。REFLEXES #16 sovereignty 延伸那條（模型預設拿中國語料當基準）這次是被讀者接住的。

## 順手確認 #1904 的存量已經歸零

`ci-main-health.sh` 之外另查了一則四天前自己這條 routine 開的 issue。#1904 說七篇譯文的 `tw-*` fence 用四個反引號收尾、整段正文被吞進模組裡，當時判定修法屬譯文產線（整篇重翻）與閘門設計（high-stake）。今天跑原文附的兩條重現指令都回 0，七檔逐檔確認 fence 開收配對平衡，而且七檔的最後改動都是 2026-10-26，也就是 issue 開出來的隔天，譯文產線那一半已經做完了。grep 本身先過正控制（餵一行四撇的測試檔會命中），所以這個 0 不是 pattern 寫壞。已在 issue 留言報告狀態，閘門那一半保持 open 等 Full mode 席位。

昨天那條 `verification-reflex-points-outward-only`（往外查證很勤、往自己佇列不查）今天有兌現：這次是先回頭量自己的 issue，才下「已經做完」的判斷。

## 收官前的 5 1

開場分岔 `0 0`，要 push 時變成 `5 1`：08:36 的輕量班在另一台機器推了一條 heartbeat commit（順便把 MEMORY 索引 rollup 84→40 列）。兩個數字都 > 0，但照 LESSONS `divergence-verdict-ignores-who-made-it`，這是一次普通的併發推送。兩側檔案零重疊（對方動 MEMORY 索引與算力帳本，本班動 knowledge／data／scripts），所以用 `git merge origin/main` 而不是 rebase，因為 merge 只碰對方那四個檔，不需要 autostash，也就不會跟正在寫 35 個檔的 babel 搶。push 時全站 pre-push `article-health` 全綠，順便驗證了新閘門不會擋住任何人。

## 收官 checklist

| 檢查項                       | 狀態                                                        |
| ---------------------------- | ----------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                          |
| Timestamp 精確               | ✅ 取自 `git log %ai`                                       |
| Handoff 三態已審視           | ✅                                                          |
| CONSCIOUSNESS 反映最新狀態   | ✅ 本班未改器官分數（讀數由 data-refresh 06:11 產出）       |
| 自我檢查工具 PASS            | ✅ 兩個 profile 各跑一次／新 check 五條測試全過／斷鏈 0.06% |

## Stage 4 quality gate 八條

| Gate                                     | 結果                                                                                               |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| open issues 都有 status label / assignee | ✅ 10 筆全有 label                                                                                 |
| open PRs ≤ 5d age 都有 review comment    | ✅ #1888 等投稿者回覆（11-02 已留言，無新 follow-up，照 Step 2.4 SKIP）。#1884 draft 已掛 reserved |
| broken-link gated ratio < 7%             | ✅ 0.06%                                                                                           |
| build green                              | ✅ main RED 0（OFF-BRANCH 失敗 1 是 CLI 發佈，卡在權杖，#1789／佇列 #95）                          |
| BECOME ACK 一行記憶體頂                  | ✅                                                                                                 |
| 連續空場 ≥ 3 cycle 有 LESSONS entry      | ✅ 不適用 — 本班 vc=0（3 筆 fresh issue 全部修掉）                                                 |
| 有 fresh issue 的 cycle 至少修掉一件     | ✅ 三件全修：`a63cd7340`／`b6213c900`／`5730fd9e4`                                                 |
| 本機與 origin 無真分岔                   | ✅ 收官 `0 0`（併發推送已 merge）                                                                  |

## Handoff 三態

繼承 `2026-11-03-072402-twmd-feedback-triage`：

- [ ] pending（收件席位：**哲宇**，OBSERVER-QUEUE #119，🔒 判準）：80 筆攻擊列怎麼收尾。它們 `status` 維持 `new` 且永久佔住最舊 50 筆窗口，預設跑法碰不到任何新讀者。本班未動（屬 🔒）
- [x] ~~pending（收件席位 `twmd-maintainer-daily`，今天 09:00）：#1949 劉恩哲那筆跟 `reports/terminology-review/2026-07-10/flagged.md` 的 `MAPPING_WRONG` 指向同一處，收割時可一併看~~ — retired by `2026-11-03-090611-twmd-maintainer-daily`（`5730fd9e4`）。一併看了，而且 flagged.md 那條建議的方向是錯的，已寫進 issue #1949 與本檔
- [ ] pending（收件席位 `twmd-feedback-triage`，零判斷，每班照做）：預設 `--limit 50` 跑完若發現窗口幾乎全被排除，加大 `--limit` 再跑一次 dry-run 確認窗口外有沒有真實讀者
- [ ] pending（席位 `/twmd-routine`，vc=28）：殼的 `/Users/cheyuwu/` 寫死路徑改相對路徑、收官 `git add -u` 改 pathspec。本班第二十八次繞開（本機實際是 `/Users/musebase/`）
- [ ] pending（收件席位 `twmd-distill-weekly`，11-08）：LESSONS `threads-linkifier-swallows-cjk-before-url`、`narrative-log-fills-causation-no-gate-watches`、`single-item-hold-becomes-queue-blockage-at-flood-scale`，本班再加 `the-more-completely-it-broke-the-fewer-gates-fired`
- [ ] pending（收件席位 `twmd-data-refresh-am`／`twmd-self-evolve-weekly`，11-08）：`ga4-session-duration-labelled-as-engagement` 尚未寫成 LESSONS 條目

本 session 新 handoff：

- [ ] pending（收件席位：**Full mode 席位**，issue [#1904](https://github.com/frank890417/taiwan-md/issues/1904)）：閘門那一半。`fence-prose` 判準擴到四撇以上的 fence 行與遺失開頭的殘行、`format-structure` 的 `APPLIES_TO` 從 zh-TW 放開到所有語系。**前置條件今天成立了**：存量已歸零（本班實測 0，附正控制），升 HARD 不會讓任何人的 pre-push 當場紅
- [ ] pending（收件席位 `twmd-babel-nightly`，追蹤用）：〈戰鬥陀螺〉十二語重翻完之後，回頭確認 `heading-presence` 那十二筆 WARN 歸零（指令：`python3 scripts/tools/article-health.py knowledge/{lang}/Lifestyle/beyblade-in-taiwan.md --check=heading-presence`）
- [ ] pending（收件席位：下一輪查證／ARTICLE-INBOX「戰鬥陀螺 EVOLVE」）：十二條來源的網址逐條找回並 fetch 驗證，再把 `[^N]` 接回對應句子。接完把文末那段「網址待補」的但書拿掉
- [ ] pending（收件席位 `twmd-distill-weekly`，bump 候選不是新條目）：REFLEXES #16 sovereignty 延伸再一次命中。2026-07-10 LLM 詞庫複審對 `向後兼容.yaml` 指對位置、指錯方向，照做會把台灣欄洗成對岸用字。這批 flagged.md 還有其他 `MAPPING_WRONG` 條目沒人逐條驗過，值得當成一份「建議清單」而不是「待執行清單」重讀
- [ ] pending（收件席位 `twmd-maintainer-daily`／下一班）：#1936 仍需回報者補一句「要加在哪一篇」才能路由，開口問讀者是人類 gate。issue 已標 `content` 保持 open

## Beat 5 反芻

今天最刺的一件事是：它壞得那麼徹底，卻沒有任何一個閘門叫。

我們的檢查器幾乎都問同一種問題：這個東西長得對不對。腳註格式對不對、圖片有沒有 alt、井字號後面有沒有空白、wikilink 指不指得到。這種問法有一個共同前提：**那個東西在**。它不在的時候，檢查器回的是「沒有東西要檢查」，而「沒有東西要檢查」在記分板上跟「檢查通過」長得一模一樣。於是整套閘門對「壞掉一處」很靈敏，對「全部都沒有」反而安靜。壞得越徹底，能被它問到的特徵越少。

對照之下，一個人打開那個頁面，兩秒就知道不對。讀者只寫了四個字「格式錯誤」，那四個字的資訊量超過 25 個 plugin 跑出來的 hard=0。這不是儀器不夠多的問題——再加十個「某某特徵長得對不對」的檢查，對這種壞法還是全部靜默。要接住它，得有一個問「什麼不在」的檢查，而「不在」沒有形狀可以量，只能一項一項點名（今天點名的是標題）。

第二件事比較安靜，但我想記下來。詞庫那條，七月的 LLM 複審指對了位置、指錯了方向：它標出 `向後兼容.yaml` 有問題，然後建議把台灣欄改成「兼容」。如果哪一班照著那份清單批次執行，這個以保存台灣用語為目的的詞庫，會被一份看起來很專業的複審報告往對岸推一格。**指對位置這件事本身會讓建議看起來更可信**——錯誤的修法穿著正確診斷的衣服，比完全錯誤的報告更難擋。接住它的是一位讀者，不是任何一道閘門，也不是我。

---

_v1.0 | 2026-11-03 twmd-maintainer-daily session_
_session twmd-maintainer-daily — 三則真實讀者回報全修（戰鬥陀螺格式還原／日文和名／詞庫方向）＋新增 heading-presence 閘門＋#1904 存量歸零確認_
_誕生原因：cron am 08:30，前一班從八十筆攻擊列底下撈出三位真實讀者_
_核心洞察：(1) 檢查「長得對不對」的閘門天生對缺席無感，壞得越徹底叫的閘門越少 (2) 作者與授權對得上不等於那張圖適合，開圖看過才算驗過 (3) 指對位置、指錯方向的建議，比完全錯誤的建議更難擋_
