---
title: 'BABEL-VORTEX-LOOP'
description: '巴別塔渦流循環 canonical — 每次 schedule wakeup 必讀；固定 benchmark 面板 + 五動作 + 三重巡檢 + 自動進化硬條款 (v1.55)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v1.60'
last_updated: 2026-09-26
last_session: '2026-09-26-100333-babel-vortex（翻譯率 100% 模式：推送常駐、付費 Haiku、閘門家族、委派 worktree 路徑陷阱與核准視窗）'
sister_docs:
  - 'SQUEEZE-MODELS-MAX-PIPELINE.md'
  - '../semiont/ROUTINE-PROMPT-CONTRACT.md'
---

# BABEL-VORTEX-LOOP — 巴別塔渦流循環 canonical v1.55

> **這份檔案是渦流的 SSOT**。每次 schedule wakeup 的第一動作是完整讀本檔再動工，
> wake prompt 本身只准是薄殼（見 §Prompt contract）。誕生：2026-07-27 哲宇 directive
> ——wake prompt 逐輪手寫導致報告 badge 每輪長不同、benchmark 不可比、資訊重複；
> 固定下來之後迴圈可交接給任何模型執行（Loop Engineering）。

## Prompt contract（薄殼鐵律）

ScheduleWakeup 的 prompt 固定為三部分，**禁止複寫本檔內容**：

```
巴別塔渦流循環：完整讀 docs/pipelines/BABEL-VORTEX-LOOP.md 後照它執行。
【本輪動態】<產線 PID 清單／未完成事項／上輪遺留，3 行內>
【觀察者臨時指示】<有才寫>
```

複寫 = 漂移的起點（本檔誕生前 wake prompt 每輪手寫，badge 定義漂了三天）。
動態區只放「這一輪才知道的事」，規則類內容一律改進本檔並 commit。

## 每輪五動作（順序固定）

1. **檢查**：三重巡檢（見下節）＋ CI ＋ babel-pulse
2. **進化**（硬條款，見 §自動進化）
3. **報告**：固定 benchmark 面板（見 §報告模板）
4. **修復**：本輪發現的問題當場修，修不完記入下輪動態區
5. **收尾**：快照 commit + push（衝突 SOP 見下）→ ScheduleWakeup（薄殼）

## 三重巡檢（存活 ≠ 生產，缺一不可）

1. **存活**：`ps` 受管產線 PID（fleet／cloud；fleet 無核發額度時為一）
   ＋ `git status -sb` 確認在 main 分支
2. **生產**：各 worker 近 45 分實際 report.jsonl 記錄數——零記錄的 worker 去 curl 它的 endpoint（慢 worker 如 laguna 300s+/篇屬正常，先查再判）
3. **第二訊號源**：fleet registry 的機器狀態交叉比對（讀壞先重讀一次；自癒層在 fleetlib）

死掉的產線看 log 尾：`🛑 空轉自動收工` → 直接重啟；崩潰 → 查根因再重啟。
重啟指令在各 `/tmp/babel-*.log` 開頭；產線編組現況與原則見
[SQUEEZE §編組原則](SQUEEZE-MODELS-MAX-PIPELINE.md)。

## 報告模板（benchmark 固定，逐輪可比）

`show_widget` 每輪必出，結構與指標定義**固定**：

**固定面板（四格，定義不准改）**：
| 格 | 指標 | 資料來源 |
| --- | --- | --- |
| 1 | 總缺口 ＋ 24h Δ | babel-live.json `gap_total`；Δ 對照 progress jsonl 24h 前值 |
| 2 | 本小時完成篇數 | report.jsonl 近 60 分 ok 數 |
| 3 | 速率（篇/hr）＋通過率 | babel-live `rate_1h`；ok/(ok+fail) 近 60 分 |
| 4 | 產線 N/2 ＋ fleet 接案節點 N/核發節點 | ps 計數；`fleetctl workers --format json`（已套控制面） |

**覆蓋率圈圈**（哲宇指定視覺）：十一語 donut grid，SVG circle
`stroke-dasharray` 按覆蓋率，圈內寫百分比、圈下寫語名＋fresh 數。

**單一明細列**：每語一行「bar ＋ inline 數字 f/s/m」，**不再放獨立表格**
（bar 與表格重複是本檔誕生的直接原因之一）。

**本輪重點**：唯一自由書寫區，2-4 條，含本輪進化發現。

## 自動進化（硬條款——這是渦流跟 cron 的差別）

每輪**至少執行一項**並在報告「本輪重點」記錄結果（含明確的「本輪無發現」）：

- **隔離樣本覆盤**：quarantine 新樣本抽掃，找新的誤判家族或模型行為
- **主動結構掃描**：問「最近修的病，成因結構還存在於哪裡」——grep 同構不 grep 症狀
- **實績檢查**：`babel-preflight.py` 弱適配清單有無新組合 → 有就切軌
- **記憶觀察**：fail-memo（repo 版控 `reports/babel/fail-memo.json`）條數與分層；fail≥4 難篇 ≥15 篇 → 開最強本地模型專攻軌

進化發現若改變規則 → **直接修本檔或 SQUEEZE 對應節並 commit**（版控就是漂移防護），
不寫在 wake prompt 動態區。

### 儀器化與重用（2026-07-27 哲宇 directive）

「能重用的東西都要儀器化跟妥善紀錄／註解。」三條操作規則：

1. **動手前先查既有工具**——`ls scripts/tools/lang-sync/` 加關鍵字 grep。同日
   實例：手動跑了三步批次驗證（洩漏／health／verify），事後才發現
   `verify-batch.py` 早就把八個步驟串好了。重複實作不只浪費時間，還會讓兩套
   判準分歧（今天修過的同型病）。
2. **同一件事做第二次就該儀器化**——判準是次數不是難度。今日候選：懸空譯文
   搶救（做過兩次：出門前、回來後）。
3. **註解寫「為什麼」不寫「做什麼」**——做什麼讀程式碼就知道，為什麼只有當時
   的人知道。特別是判準的邊界（為何是 30 字、為何保守到寧可不動），那是未來
   有人想放寬時唯一的煞車。

**既有工具也要驗它的判準涵蓋範圍**：`verify-batch.py` 的第 5 項名為
「cross-article link integrity」，實際 regex 只掃有語言前綴的連結，而最常見的
壞連結恰恰沒有前綴——13,155 筆因此靜默出貨。**工具存在不等於問題被檢查**。

### 派 sub agent 的鐵律（2026-07-27，同日四例）

spawn prompt 必含：「**前景串行執行，禁止 run_in_background 後結束回合等通知**
——你的環境裡背景指令完成不會通知你自己，那等於停擺。要等就用 until 迴圈
輪詢 process 或輸出檔。」

同日四個子代獨立踩同一個坑（UI bundle／結構化 pilot／patch 修復 ×2），每次
浪費一輪喚醒。母 session 收到的「完成通知」其實只是「子代停了」，跟「做完了」
無法區分——**驗收永遠要獨立查證**（git log 有沒有 commit、檔案有沒有動、
process 在不在），不能只讀它的回報。

**變體：子代自己再往下派一層（2026-09-09）**。一隻 vi 委派 agent 的最終回報
是「子代理正在執行翻譯。我會等待完成通知後回報結果。」——它沒有用
`run_in_background`，它是**再 spawn 了一個 agent**，然後等一個同樣不會來的通知。
檔案從來沒被寫出來，而回報讀起來像進行順利。原本的禁令只寫了「禁止
`run_in_background` 後結束回合」，沒堵住「往下再派一層」這條路；同一個結構
（等一個在你的環境裡不會到達的通知）換了個載體就穿過去了。

spawn prompt 因此要寫兩句而不是一句：「**全部自己前景做完，不 spawn 子代理、
不 `run_in_background`**」。並且驗收一律查檔案在不在——今天這隻靠 `ls` 一秒
就現形，靠讀回報則完全看不出來。

**變體：越界指令卡在核准視窗（2026-09-26）**。一隻 en 委派 agent 為了比對
prettier 前後，把備份寫到打錯的 `/tmp_before…`（worktree 外），再下 `rm -f`
清掉它。這個越界刪除跳出人工核准視窗，從 12:07 等到 18:52 才有人按。**卡住的
不只那一隻**：視窗等人的這 6 小時 45 分，主 session 的常駐排程一輪都沒觸發
（13:23 到 18:23 共六輪），免費產線照跑，委派層、巡檢、推送檢查全停。前兩個
變體在等一個不會來的通知，這個在等一個不在場的人，結構相同：子代理的某個動作
需要主 session 以外的東西才能繼續。防法寫進派工單（`write-agent-brief.py`
hard_rules，不靠 prompt）：只在 worktree 裡讀寫、暫存檔放派工單資料夾、
不 `rm` worktree 外的路徑，prettier 前後差多少用 `git diff` 看。收件時看耗時：
同批其他隻三十分鐘、它七小時，這個落差本身就是訊號。

## 鐵律集（違反任一 = 本輪不合格）

1. 每回合結束前必 ScheduleWakeup（薄殼格式）——喚醒鏈是單點，斷一次監測就盲一輪
2. 報告含固定面板＋圈圈＋明細列，指標定義不變
3. git 紀律：精確路徑 add；並行 session 的檔案（含苯駢芘類寫作中檔案）不碰；
   merge 衝突：`fail-memo.json` 逐鍵取 max、`MEMORY.md`/`*.jsonl`/progress-log 用
   union（兩邊都留）、儀器產物 json 用 theirs；被未 commit 檔擋住 → 儀器產物可
   checkout 還原，knowledge 譯文一概不動
4. 詞彙：MANIFESTO §11.5（覆盤／追查／檢驗、隔離樣本；不用法醫詞）
5. 模型入池門檻與編組：[SQUEEZE 四節](SQUEEZE-MODELS-MAX-PIPELINE.md)
   （§模型×語言適配／§入池門檻／§排序原則／§編組原則）
6. context 深度稀釋 → 先 /twmd-memory 存檔再續；壓縮後醒來先讀最新
   memory 的 handoff

## Stale 時代的路線圖（2026-07-27 起，missing 清完後的主戰場）

老五語的 missing 已近歸零，缺口重心轉向 stale（全語 651 篇）。實測抽樣：
stale 的改動比例**中位 2.8%**（7 行／204 行），78% 改動 <10%——整篇重翻等於
為 3% 的改動燒掉 100% 的算力。演化路線：

0. **語意無關判定**（最大單一節省，2026-07-27 實測）：抽樣顯示 **52% 的 stale
   只是中文的標點／空白修正**——譯文用的是自己語言的標點規範，這類改動對譯文
   零影響，只需 bump 來源版本標記，不呼叫任何模型。判定必須保守：正規化（移除
   所有標點與空白）後兩邊完全相同才算，且 diff 碰到 frontmatter 一律不判。
   順序上排在 diff-patch 之前——最便宜的路徑先試。
1. **章節級 diff-patch**（已上線 `patch-translate.py`）：只重翻被碰過的 H2 章節，
   未動章節保持 byte-identical。對齊單位選章節不選行——章節邊界清楚且譯文與 zh
   一一對應，行級映射跨語言不可靠。章節數不等或改動 >50% 時 fallback 全文重翻。
   **實測 64.6% 的 stale 可 patch，但節省隨「被碰章節數」而非改動比例**（每章是
   獨立的模型往返）：1 章節省 95%，4 章節打平。所以 §0 的無呼叫路徑價值更高。
2. **順稿層**（待設計）：patch 後的銜接處可能生硬（新譯章節與舊譯章節的語氣、
   術語選擇未必一致）。候選做法是給模型「前後章節各 200 字語境」讓它自己對齊，
   若不足再考慮全文順稿 pass（但那又回到整篇成本，須實測值不值得）。
3. **metadata-only stale**（P2.5）：只有 frontmatter 變動的，機械 bump 不呼叫模型
   （bump-source-sha.py 已存在，確認有無接進 dispatcher）。

### 老五語的 stale 是品質債不是格式債（2026-07-27 追查）

stale 清償實測：老五語（en/ja/ko/es/fr）的語意無關 bump **全軍覆沒 0/46**，
全部敗在 verify 的「URL 數量不符」。原本期待這是系統性可機械對帳的漂移，
抽樣追查後**推翻**——它是兩種原因混在一起：

1. **檢查器的 URL regex 誤判**：`https://zh.wikipedia.org/zh-tw/雪山_(臺灣)`
   這類含括號的網址被截斷，zh 與譯文各算一次卻算出不同結果（少數）
2. **舊譯文的真實 URL 遺失與幻覺**（主因）：ja/經濟奇蹟 zh 有 18 個網址、
   譯文只剩 9 個，而且譯文裡出現 `books.com.tw/products/0010123456` 這種
   假 ID、`epza.gov.tw/` 被截成根網址——是早期批次的模型幻覺留下的債

**結論**：老五語的 stale **不是格式債是品質債**，第一層 bump 與第二層 patch
都不適用（patch 只碰改動章節，救不了其他章節的舊幻覺網址），需要整篇重翻。
這也解釋了為何它們的 stale 消化得最慢。不要再對老五語試 bump——那 46 次
嘗試全是注定失敗的算力。

## 重啟有成本——修完不要立刻重啟（2026-07-27 自我觀察）

同一場渦流連改八個修復、每改完就 `restart-vortex.sh` 讓它生效，結果重啟
**六次**。每次 pkill 都砍掉四軌正在翻的文章，而單篇要 200-600 秒——一次
重啟丟掉約四篇進行中的工作，六次就是二十幾篇。最後一段 20 分鐘的統計是
**0 成功**，因為每批都還沒翻完就被下一次重啟砍掉。

**修復是為了提升通過率，但交付方式把收益吃掉了**。這不是修錯，是節奏錯。

**規則**：

- 一輪渦流內累積修復，**收尾時重啟一次**，不要改一個重啟一次
- 熱路徑的修復（translate.py / patch-translate.py）下一輪自然生效——
  dispatcher 每篇都重新 spawn 子程序，不需要重啟就會讀到新代碼；
  **只有 babel-dispatch.py 自身的修改才真的需要重啟**
- 真要立刻驗證，用單篇手動跑，不要重啟整個產線

## 收官條件

十一語 stale=0 missing=0 且 QA gate 全綠 → 跑 /twmd-finale 宣告巴別塔 100%。

### 第十三家族是檢查器的病，不是譯文的病（2026-07-27 追查）

撇號 passthrough 誤判追到底：`verify-translation.py` 的 frontmatter 解析器
只剝外層引號，沒還原 YAML 規範的雙單引號轉義，於是 zh 的 `'No Man''s Land'`
與譯文的 `"No Man's Land"` 被判成 drift——**解析後兩邊完全相同**。

跟同日 heal-passthrough-fields 的病同構（比字串而非比語意），但那次只修了
heal，這條解析路徑沒一起收斂。**同型病要 grep 全部呼叫端**，這是本檔
§儀器化第 1 條「兩套判準會分歧」的第二次驗證（第一次是 cjk-leak 的
兩個掃描分支各跑內聯 regex）。

前十二個家族都是「譯文裡的中文其實合法」，第十三個反過來——**譯文沒問題，
是尺歪了**。碰到高置信度的譯文被擋，先驗尺再驗譯文。

### 裝甲層是當前失敗主因（2026-07-27 21:00 診斷，待修）

通過率從 58% 掉到 **16%**，追查結果：`no output written (exit=1)` 佔全部失敗
34%，而它的**唯一**成因是 `❌ armor: N URL token(s) missing/duplicated`
（9/9），跨 vi/pt/ko/ru/ja/id/hi/fr 八語、本地與雲端模型都中，單篇最多丟
84 個 token。

裝甲層（URL tokenize 成 `⟦U1⟧`）是同日為了根治「URL 原樣保留」而加的，
設計沒錯——**但它把「模型沒保住 token」變成整篇 exit=1**，等於用最嚴的
處置對付最常見的模型行為。防護本身成了產能的主要殺手。

**待修方案（下輪執行，勿在 context 邊緣改核心路徑）**：armor 還原失敗
不該是終局，應 fallback 到非裝甲路徑重試一次。URL 正確性仍由既有 verify
的 URL 數量檢查把關，所以品質底線不降。改的是 `translate.py:620` 呼叫端的
處置，不是 `restore_urls()` 的判準——判準嚴格是對的，終局處置太重才是問題。

**教訓**：新增防護要同時想「它失敗時的處置」。判準嚴格＋處置也最重 ＝
防護的成功率直接變成產線的通過率。

**修完後的複驗推翻了上半段的歸因（21:15）**：armor 重試上線後觸發 **0 次**，
但 `exit=1` 仍佔失敗 34%（12/35）——證明**新產線的 exit=1 跟 armor 無關**，
上面那段 9/9 是重啟前舊 log 的樣本。真因是 patch 引擎：

```
engine=patch  ❌ 1 chapter(s) failed after retries — aborting, no write
   ✗ [7] ## 參考資料: footnote count mismatch: zh=12 out=NoneType
                      cjk leak: CJK run '參考資料'
```

**同一個結構病的第四次現形**：一個章節沒過 → 整篇不寫。而失敗集中在
「## 參考資料」——腳註定義區，中文書目密集、模型最容易翻壞的章節，卻讓
它一票否決其餘七章已翻好的內容。

**已修（21:20）**：章節失敗時該章保留舊譯片段（複用「未改動章節」既有切片），
其餘照常更新；只有全部章節都失敗才中止。實測觸發後不再 abort，往下走完組裝。

**但預留的風險當場成真——腳註定義章節不適用部分保留**：首次觸發的
`1/8 章失敗` 敗在「## 參考資料」，那正是腳註**定義**所在的章節。保留它的
舊譯、其餘章節更新了腳註**引用**，於是引用與定義對不上，被 verify 的
`footnote count` 擋下 HEAD-restore。

**下一步判準**：失敗章節若含腳註定義（`[^x]:` 行）或是參考資料／註釋類，
部分保留會破壞全篇一致性 → 這種章節失敗仍該整篇 fallback 全文重翻；
其餘章節才適用部分保留。**章節之間不是獨立的**，腳註是跨章節耦合。

**armor 重試實測是負面結果（21:25，已觸發 4 次）**：重試不但沒救回來，
**遺失量還變多**——2→56、28→22、2→3。加的警告訊息（「⟦U1⟧ 不是要翻譯的
內容」）沒讓模型保住標記，反而像是干擾了輸出。假設「模型看到提醒會照做」
被證偽：對這些模型，佔位標記本身就是它想「處理掉」的異物，講得越明白
反而越去動它。

**下一步改真 fallback**：armor 還原失敗 → 走**非裝甲路徑**重譯一次（URL
原樣送進去，不 tokenize），URL 正確性交回既有 verify 的數量檢查把關。
重試同一條路是沒用的，要換路。實作時把現在那段警告重試整段換掉，別疊加。

**方法論教訓（比 bug 本身重要）**：修完要複驗歸因，不能用「修了 A 之後
數字變好」反推「A 就是原因」。這次通過率 16%→20% 看似修復生效，實際上
armor 一次都沒觸發——**改善另有來源，而真正的主因還在**。歸因要看機制
證據（重試觸發次數），不是相關性。

## Changelog（進化紀錄——新發現往這裡沉澱）

- v1.60（2026-09-26 晚間第五輪）：**修好一把尺之後回頭掃隔離區**。(a) 日文標籤閘門的 60% 門檻把地名與
  日文同形名詞當未翻，ja 缺稿一整群小篇各敗六、七次；改成只擋整組照抄（`a00555f27`）後，用
  dispatcher 自己的 `verify_one` 重驗該家族的隔離樣本，救回 9 篇（`56c222c9b`）。同一招第二次用在
  付費產線：腳註交叉引用「見 [^88]」被 Haiku 寫成 `@@LINK88@@`、還原不了而整篇退件（重啟後 20 篇
  敗 8），修還原規則（`07d8ecbed`）後隔離樣本 8/8 救回，含 106KB 的〈台灣新冠疫情與疫苗〉五語
  （`f51fdbc73`）。**規則**：修掉一個誤判家族的當輪，就按 `fail_reason` 撈該家族的隔離樣本重驗；
  付費譯文尤其該救，重跑一次就是再花一次錢。做了兩次，下一輪儀器化成工具。(b) 委派 agent 重譯時
  會比對兄弟語言，順手照出已上線譯文的錯（〈蓬萊米〉en/de 把稻熱病寫成飛蝨、pt 把磯永吉寫成
  Ishikawa；en 楊傳廣人物頁全篇 Chuan-hsiung；ko 七篇把「教父」寫成教會的 교부）。回報裡的
  「兄弟語言也錯」當輪就修，量小、確定、不必等。(c) `--names-for` 加上同語言語料的「拉丁名 (漢字)」
  括號對照（`d632abf74`），名字表只收有人物頁的人，演員編劇學者從此有既有寫法可查。

- v1.59（2026-09-26 晚間，同一場渦流）：**核准視窗讓排程停了六輪、量級檢查的三個假陽性**。
  (a) 一隻委派 agent 的越界 `rm` 卡在人工核准視窗 6 小時 45 分，期間常駐排程一輪都沒觸發；
  防法寫進派工單 hard_rules（見 §派 sub agent 的鐵律 第三個變體）。(b) `numeral-magnitude-check`
  同一波三隻 agent 撞上、兩隻為了過閘把正確的西文改寫法：西、葡文 `mil` 是 `millones／milhões`
  的前綴；譯文的量剛好等於中文另一個量級數字（中文同時有 500萬 與 5億）；空白分節長數字的尾段
  （`590 100 millones`）。修法是整字比對、按次數對帳的「孿生數字」放行、只認真正三位一節的分節
  （年份後接數字仍會報，越南文 `năm 2025 2,828 tỷ` 真的少換算十倍），全庫十語 1297 → 1024、
  新增 0（`5e6127ebc`）。(c) babel-pulse 的 launchd 常駐不在了，`babel-live.json` 停在 08-22，
  報告第 1、3 格的資料源因此是舊的；渦流每輪先手動跑一跳 `babel-pulse.py --no-commit` 再讀。

- v1.58（2026-09-26 哲宇「翻譯率 100% 模式」渦流）：**推送、付費產線、五個閘門家族、委派 worktree 的
  路徑陷阱**。(a) 固定間隔的 `/loop` 用 CronCreate 常駐排程（`23 * * * *`），prompt 固定成薄殼，
  「本輪動態」改住 session 脈絡與 memory handoff；鐵律 1 的「每回合結束前 ScheduleWakeup」由常駐
  排程取代，喚醒鏈不再是單點。(b) 推送從 routine 拆出來：`babel-push-every.py` launchd 常駐，未推
  譯文滿 50 篇就在共用鎖底下合併 origin 再推（登入過期讓 routine 停擺的那 25 小時，71 個 commit
  沒上站、main 分岔）。(c) 付費 Haiku 4.5 走 OpenRouter 儲值帳戶掛進 Tier 6 受限槽，設定住 repo 外
  `~/.config/taiwan-md/babel-extra-workers`（wrapper 讀取），刪檔即回純免費產線；Pro 方案下大量
  委派會吃掉 routine 共用的週額度，所以大宗缺稿走付費產線、Claude 子代理接 stale 與難篇。(d) 付費
  產線頭十次 2 過，追出整篇引擎三個跨模型家族：散文註句中夾 autolink（52 條／17 篇）、譯文沒跳脫的
  引號打斷 JSON（09-20 起 68 次）、腳註標題的方括號（131／154 次 Phase N 驗證失敗）；修後同一產線
  10／13。付費的失敗會有人去看原始回應，於是照亮了免費產線默默吞掉的缺陷。(e) 兩把尺的語言邊界：
  漏譯閘門把樂團名「草東沒有派對」的「沒有」當漏譯（站上三篇日文因此永遠過不了），漢字黏著檢查
  對日文照掃（「SLP台北」是正常排版）；前者加逐名專有名詞例外，後者只管非漢字文字的語言。
  (f) **委派 worktree 的路徑陷阱**：子代理的 Write 工具吃絕對路徑，若 spawn 時主 session 的工作
  目錄是主樹，agent 會把譯文寫進主樹、gate 的 `--apply` 卻改到 worktree（或反過來），兩棵樹各有
  半份。派工 prompt 一律給**絕對目標路徑**並寫明「所有指令與寫檔都在 worktree」；收件前用
  `sourceCommitSha` 對照派工單佔位值，確認新譯文實際落在哪棵樹。

- v1.57（2026-09-18 晚間心跳）：**整篇多數票看不到尾段換語言**。handoff 留了一條
  「ar 馬英九 30 秒概覽混了一個韓文『한쪽』」的單檔小修，照 REFLEXES #24「單例不代表
  集群」掃全庫：hi 370／ar 314／ru 265 篇非韓文譯文裡有韓文，2026-09 還在新增。
  兩種形狀：(a) **尾段整段韓文**——媒體授權說明、「## 참고 자료」、腳註描述整段是
  韓文而正文是天城文（本機模型長輸出翻到尾巴語言漂掉），hi 39 篇、ar 1 篇；
  (b) **單字級融合殘留**（「कार्बन उत्सर्जन 추진 कर रहा है」），約 900 篇，是 #52
  的韓文版。閘門為什麼全綠：`target-language-check` 是整篇字符占比多數票，尾段 25 行
  韓文佔不到多數；`cjk-leak-check` 只看漢字四連且腳註行豁免，韓文對它不存在；
  `cjk-residue-check` 看得見 Hangul 但從沒接上產線。修法：`target-language-check`
  加第二把**逐行**尺 `foreign_script_check`——剝掉連結文字／引號／括號／網址／
  blockquote 後，一行韓文 ≥ 4 字且不少於目標語言字母數即「外來文字行」，≥ 2 行或
  單行 ≥ 20 字零目標字母 → fail，恰一行 warn；`babel-dispatch.verify_one` 把它記成
  `foreign-script[ko]`（跟 `wrong-language` 分開，report.jsonl 才分得出「翻錯語言」
  與「翻到一半換語言」）。校準：拉丁七語 0 誤殺（〈台灣感性〉的 대만감성、統一發票
  的韓文來源標題都在豁免位置）；同一把尺量假名會在九語系各誤殺莫那·魯道的日文
  遺言引句，所以只量韓文。存量 40 篇 → OBSERVER-QUEUE #69（<50 檔，#68 合併後可
  自主降級 stale）；(b) 900 篇併 #52 處置。
- v1.56（2026-09-09 觀察者驅動渦流）：**一輪裡浮出四個缺口，其中一個是隊伍本身**。
  (a) **212 篇文章十二個語言都排不進隊**：檔名是純中文、又還沒有任何語言翻過的
  文章，`build_slug_map()` 反推不出 slug，`collect_and_filter_groups()` 直接
  `skip`——而跳過不留痕跡，於是每一輪都跳過同一批。212 × 12 = 2,544 個任務，
  佔全部缺口 59%。`knowledge/_slug-map.json` 這個補位機制 2026-07-27 就建好了，
  當時缺口 7 篇、之後沒人補，長到 212 篇（REFLEXES #91 建造與登記不同步）。補齊
  207 條後全庫零篇查不到 slug，重啟後 fleet 軌 Round 1 的 skip 訊息歸零。新工具
  `sibling-slug-map.py` 把「slug 先從兄弟語言反查」這個手工步驟儀器化。
  (b) **沒有一道閘在問「這是不是目標語言」**：委派 agent 交回英文寫進
  `knowledge/de/`，結構對靶 55/55、verify 17 pass、leak 0、adjacency 0、
  health hard=0 —— 全綠。閘門量的都是形式，一篇英文文章滿足這些的程度跟德文
  一樣。新造 `target-language-check.py`（非拉丁看字符集、拉丁看功能詞佔比，
  刻意不引入 langdetect），接進 `verify_one()` 第一關；全庫掃出 65 篇同型存量
  （ja 22／ko 17／es 13／fr 9），屬 >50 檔紅線 → OBSERVER-QUEUE #53。
  (c) **大文章該離開免費池**：cloud 軌 52 分鐘只嘗試 1 篇、0 通過，每篇都耗在
  40-90KB 的深度文上直到腳註階段逾時。排序「由新到舊」是對的，副作用是最新的
  文章往往也最大，產線一開機就撞最硬的那批。分派表新增「原稿 >40KB 或腳註 >50
  → 委派」，判準用篇幅不用失敗次數（後者是事後才知道的）。
  (d) **委派契約與主權詞表搬進派工單**（`write-agent-brief.py`）：prompt 版的
  同一條 tags/subcategory 規則連兩隻 agent 讀錯，改寫進派工單後的批次全部正確。
  派工單是 agent 必讀的檔案，所以仍滿足 §Z2.0 內嵌要求，而且不必每派一隻重打
  一次（重打就會漂）。
  同輪三次驗證 REFLEXES #31：九篇裡兩篇 agent 自報「檢查器誤判」實測是真問題
  （tags 整排沒翻、URL multiset 真的不符），一篇把 `tw-*` 視覺化模組整塊中文
  判成「資料表格是已知誤判」也不是。**agent 對誤判的判斷本身要被判斷。**

- v1.55（2026-08-09 vi 委派兩批 200 篇）：**委派層長出自己的 SOP**，canonical 在
  [SQUEEZE §委派層 SOP](SQUEEZE-MODELS-MAX-PIPELINE.md)。vi 是十一語裡唯一
  fail-closed 的（合格模型全撤池），覆蓋率 43.2% → 57%+ 全靠這一層。
  三支新儀器（`enrich-batch-targets` 結構靶子與分次寫入清單／`restore-footnote-urls`
  三層出處還原／`cjk-adjacency-check` 短片段漏譯）＋四支既有工具被修好
  （比例閘門的 PASS 分支因 ANSI 色碼永遠到不了、worktree 回收器對自家 worktree
  從沒能開火、超過 26 組的批次因 `chr(65+i)` 撞小寫靜默吃掉優先度最高的前 26 篇、
  章節級 patch 漏掉 wikilink 預轉）。
  三條沉澱進 canonical 的元規則：(a) 閘門製造出「改內容換綠燈」的誘因時，
  它造成的損害大於它防的問題（實撞：新閘門逼 agent 把 6 條中文來源標題翻掉，
  引用失去可追溯性）(b) 新尺一律 import 既有豁免清單不複寫——這支一天長出六類
  假陽性，至少三類 `cjk-leak-check` 早有，而它的註解一字不差寫過這個病根，
  **讀到教訓跟受教訓的約束是兩件事** (c) 指令具體度是階梯不是連續：形容詞 →
  數字 → 策略 → 機制 → 可直接除的數字，停在任何一階都會在下一個規模失效
  （同一條「要完整翻譯」在三個規模上失效三次）。

- v1.54（2026-08-01 19:40 執行）：**v1.53 診斷的修法已落地**。`babel-dispatch.py`
  新增 `patch_reject_count()`（讀既有 `fail-reasons.json` 側錄，不新增狀態）＋
  `PATCH_REJECT_ESCALATE = 5`：某篇 patch-reject 累計 ≥5 次時，`process_task()`
  在進入 patch engine 前直接跳過，`proc` 保持 `None` 落入既有的「whole 引擎」
  分支，強制整篇重翻。驗證：`ja:Geography/金瓜石.md` 實測 7 次、`es:同篇` 8 次，
  兩者都會在下次排到時觸發 escalate；`ko:同篇` 4 次維持原路徑不變（低於門檻的
  文章行為不受影響）。刻意選擇讀 fail-reasons 既有側錄而非新開計數器：v1.53
  當輪已經量過這支側錄存在且可信，重造第二把尺是多餘成本。
- v1.53（2026-08-01 06:41 巡檢，診斷）：**ja/金瓜石 patch reject 是結構性死鎖，
  不是準確率問題**。fail-memo 累計 13 次同型失敗（7 patch reject + 6 leak），
  追到最新一次跟昨夜 §四完全同一個 hit——`'如果' x1`，同一句「地元鉱夫が肺と
  引き換えて金を得た如果说」——證明模型對這篇第 [9] 章有穩定失敗模式，每次
  重試都在同一位置漏翻。
  真因：`patch-translate.py` 章節翻譯本身過關（`chapters: 0 failed`），是最終
  verify trio 因洩漏擋下 → exit=1。而 v1.11 刻意讓 exit=1 **不** fallback 全文
  （避免同一輪對同一篇燒兩次算力，且防止「還原的舊檔冒充本次產物」污染歸因，
  見 `babel-dispatch.py:893` 註解）——這是修過的行為不是疏漏。後果：沒有累計
  次數升級機制，這篇會永遠卡在同一個章節重試迴圈，13 次都選中同一句。
  **待修（下輪執行，不在本輪 context 邊緣動 dispatcher 核心路徑）**：讀
  fail-memo，某篇 patch reject 累計 ≥5 次時該篇改走 `--engine=whole` 強制全文
  重翻一次（跳過 patch 引擎），换一次生成大概率避開同一個 chunk 邊界。

- v1.52（2026-08-01 04:34 巡檢）：**desktop-3090 三個模型全數低於入池門檻，但控制面是觀察者手動開的——不自行覆蓋**。
  近 3hr 實績 1/15 = 6.7%，**05:37 複驗惡化為 0/17（完全零產出）**（n≥8，低於
  15% 撤池線），端點正常、模型都在，
  所以是模型本身不行；反覆觸發「連三次硬失敗凍 30 分」，fleet 軌實質只剩
  mac 一台，本小時吞吐掉到 7 次嘗試、0 通過。
  該節點三個模型的處境：`gemma4:26b` 現 6.7%、`qwen3:32b` 2026-07-29 因長文
  3/3 撞 900s 撤過、`gpt-oss:20b` 2026-07-31 真實文章 0/10 撤過——**無合格模型可用**。
  照 §入池門檻本該切軌或撤池，但 `fleetctl control` 顯示 2026-07-31 22:41 由
  `remote:mouhouse`（觀察者本人從儀表板）把全軍打開。依 v1.9「同一輪指示衝突時
  以觀察者最新明確指示為準」，**不自行關閉**。三個選項待拍板：(a) 關掉該節點的
  babel 批次 (b) 拉一個新模型上去（需先過 sovereignty + 完整工作量吞吐兩關）
  (c) 維持現狀——凍結機制已在限縮它的損害。
  **05:37 補充：換模型這條路已確認走不通**，不是還沒試——`gemma4:31b`
  2026-07-31 拉上去後長文撞 900s、`gpt-oss:20b` 同日真實文章 0/10、
  `qwen3.6:35b-a3b` 的 manifest 僅支援 macOS（v1.29 實測）。24GB 卡上
  沒有既通過 sovereignty 校準又扛得住完整文章的模型。同時段對照：
  mac 18.2%、雲端 nemo3 42.9%，證明佇列本身不是問題。

- v1.51（2026-08-01 02:28 巡檢）：**新閘門誤擋存量債，一小時後才現形**。
  §14b「frontmatter 欄位未遺漏」上線後把 `es/鄭愁予` 的 semantic-noop-bump
  （零成本版本標記更新）擋下，理由是全站 1,802 檔的存量債——後果是最便宜的
  路徑被打回整篇重翻，閘門反過來燒算力。修法跟死鏈閘門同源：拿受檢物自己的
  git HEAD 當基線，存量債 WARN、本次新弄掉的才 FAIL。修後通過率 12%→19%，
  noop-bump 恢復生效（`ko/taiwan-online-community-migration → d968559a`）。
  教訓已升 [REFLEXES #66 (e)](../semiont/REFLEXES.md)：**校準語料要涵蓋閘門
  將跑過的全部族群**，不是只有促使它誕生的那批（那批往往最乾淨，因為問題剛
  被你修過）；ship 前至少對 20 個隨機既有檔跑一次看誤擋率。

  同輪量化出一筆有世代特徵的債：**186 檔非漢字圈譯文的標籤仍是中文**
  （en 111/262 = 42%、es 40/151 = 27%、fr 33/137 = 24%，而 ar/id/ru/vi
  全部 0%）。新語言用現行 pipeline 翻（強制翻標籤），舊語言早於它——
  這是讀者可見的品質債不是中繼資料。>50 檔屬 §自主權邊界，待哲宇拍板。

- v1.50（2026-07-31 深夜）：vi 車道候選重驗，**維持 fail-closed**。免費池 14 個
  模型扣掉 too-small／specialized／PRC-origin 後，vi 的可用候選只剩兩個，今夜
  各打一次真實請求：`gemma-4-31b`（7/24 校準主權＋sanity 都 PASS，只因容量被撤）
  仍回 HTTP 429，容量沒恢復；`laguna-s-2.1` 回空輸出。nemotron 對 vi 歷史 2-6%
  早已排除，`ling-3.0-flash` 是 PRC-origin，用它翻台灣主題與巴別塔的存在目的
  相反（[MANIFESTO §主權的巴別塔](../semiont/MANIFESTO.md)）。**結論：vi 的
  526 missing 不是待辦事項，是沒有合格算力可派**——下一輪不必重測，等新模型
  進池或 gemma-4-31b 容量恢復再議。同輪確認環境失敗判準零誤觸發。

- v1.49（2026-07-31）：兩個新模型組合同輪裁決撤回。(1) laptop-4090 ×
  gpt-oss:20b 真實文章 0/10 撤池——小規模 probe 四段 marker 協議完美，
  整篇 prompt 讀完只回 48-95 字一句話（診斷儀器帶回 thinking 168-306 字、
  9-10 秒即回），「短 prompt 可回不代表能在 SLA 內完成文章」（v1.29）的
  16GB 卡版本；4090 回到 embed／generic 服務。(2) desktop-3090 ×
  gemma4:31b 三筆全部 ≥900s 撞牆（900 timeout／1715／1790）revert 26b
  ——20GB dense 加 KV cache 超出 24GB 溢到 CPU，跟 v1.29 qwen3:32b
  同病。同輪正面成果：tags 基線豁免讓 ja 從 8% 回到 40%（判留 nemotron，
  歸因乾淨）；#1273 重排 116 檔機械補完（gap -103 零模型呼叫）；
  empty/tiny 與缺 marker 兩把診斷儀器讓失敗自帶機轉證據。教訓沉澱：
  模型入池要三關——校準（品質樣本）、裝得下（VRAM fit guard）、
  **完整工作量吞吐**（真實文章 n≥8）；前兩關過了第三關仍會全滅。

- v1.48（2026-07-30）：tags 檢查補「已接受基線」豁免。48h 內 ja 50 次
  `tags not identical to zh` 全是同一假陽性家族：動物園、山岳這類文章的
  tags 是專有名詞（台北動物園／嘉明湖／六福村），正確的日文本來就跟中文
  同形，60% 重疊門檻把每一次重譯永久誤殺。新規則：候選 tags ≥60% 同 zh
  時，查 git HEAD 已接受版本——基線本來就 ≥60% 同形（專有名詞常態）才
  豁免；新譯文（無基線）與基線本有翻譯的檔案（2026-07-24 整包照抄 bug
  的形狀）維持嚴格。ja 是否移出 nemotron 軌（8%，n=88，已過切軌線）
  延後一輪：先讓本修復流過再複驗歸因，避免兩個變因疊加無法歸因。
  同輪 fleet 進化：desktop-3090 開拉 gemma4:31b（允許清單第一偏好，
  20GB 裝得下 24GB×0.9），對老五語 0-28% 通過率的正面攻堅；muse-bot
  fleetlib 新增 VRAM fit guard（模型裝不下的卡不核發，laptop-4090 16GB
  vs 26b 18GB 實例）。
- v1.47（2026-07-30）：修正乾淨整合 worktree 用系統 Python 3.9 執行脈搏時，
  `progress-snapshot.py` 的 `dict | None` 型別註記在載入期崩潰，`babel-pulse.py`
  卻沿用舊 rows 仍印出「整點落地 commit 完成」的假綠。快照模組加 postponed
  annotations 相容 3.9；快照非零時 pulse 現在也非零停止，不再以陳舊 gap 冒充
  本輪讀數。產線呼叫端仍可容忍 pulse 非零，不會因此殺 dispatcher。

- v1.46（2026-07-30）：Phase N 的 shape retry 改成同尺寸重播失敗後一次有界
  二分。v1.45 上線一小時內兩篇都正確觸發第二次重試，但 0/2 救回，兩次仍是
  `dict keys=['n', 'title', 'desc']`；證明 15 筆批次對當前 reasoning 輸出會
  重複截斷。現在只有兩次嘗試的最後錯誤仍為明確 `JSON shape fail` 時，才把
  該批拆半各跑一次既有雙嘗試；backend error、timeout、內容驗證與其他 QA
  失敗不會觸發。兩半各自仍須通過 shape／長度，合併後再走原 ID 與 Phase N
  hard gate，沒有放寬品質。
- v1.45（2026-07-30）：讓 `call_json` 把「JSON 可解析」與「批次形狀完整」
  一起納入 retry。v1.44 的 keys 診斷在一小時內抓到兩次 Phase N 回傳
  `dict keys=['n', 'title', 'desc']`：reasoning 輸出截斷後，寬鬆 parser 從
  不完整 array 尾端撈出最後一筆合法 object，誤標成功，原本的第二次重試因此
  沒發生。Phase N 現把單筆腳註 object 視為 shape fail 並使用剩餘 retry；
  array、ID mapping 與單鍵 wrapper 仍合法，最終長度／ID hard gate 不變。
  Phase F 同步要求 object 根節點，避免同一 parser 病在 frontmatter 重現。
- v1.44（2026-07-30）：Structured Phase N 的 ID mapping 有時再包一層單鍵
  object（例如 `{"footnotes": {"1": {...}}}`）；v1.43 只接受直接 mapping，
  新實績仍在相同 `got dict` gate 失敗。現在單層 wrapper 內的 key 集合也必須
  精確等於本批預期 ID、每個 value 必須是 object、內部 `n` 必須相符才可解包；
  缺項、多項、ID 衝突、多鍵或多層 wrapper 照舊 hard fail。錯誤訊息同步列出
  top-level keys，下一種模型形狀不再只有模糊的 `got dict`。
- v1.43（2026-07-30）：Structured Phase N 接受可無損證明順序的腳註 ID
  mapping。近一小時 8 次失敗中 7 次是 no-output，至少 4 次已完成 frontmatter
  翻譯，卻因模型把 15 筆腳註回成 `{"1": {...}, "2": {...}}` 而被現有
  single-list wrapper 解包器判成 `got dict`。新 normalizer 只在 top-level key
  集合精確等於預期腳註 ID、每個 value 都是 object、value 內 ID 不衝突時按
  原批順序還原 array；缺項、多項、非 object 或 ID 衝突仍交給原 hard gate
  拒收。三組回歸測試涵蓋安全接受、拒絕與既有 wrapper 相容。
- v1.42（2026-07-30）：收斂 `cjk-leak-check` 的 ja／ko 與非 CJK 分支：
  leak gate 一律只掃正文、排除 frontmatter。舊版只有非 CJK 分支排除
  frontmatter，日／韓譯文的 `rationale`、`lifeTree`、研究路徑等合法保留欄位
  若含「這個／那個」就會被當正文中文洩漏隔離；title／description／imageAlt／
  tags 仍由 `verify-translation` 專責把關，沒有放寬 metadata 品質閘門。
  新增 frontmatter 合法與正文真洩漏兩側回歸測試。
- v1.41（2026-07-30）：`ai-residue` 新增「整篇正文被 Markdown fence 包住」
  hard gate。俄文 COMPUTEX 已由 verify／leak／article-health 三閘收下，但模型
  在 frontmatter 後加 ` ```markdown `、全文末尾再加 closing fence；loader
  合理保護 code block 的行為反而讓所有正文檢查跳過整篇，pre-push 與 CI 都
  假綠。新規則只在 `markdown`／`md` fence 覆蓋整個非空 body 時擋下，內嵌
  Markdown 教學範例與其他語言的完整 code sample 均維持合法；三組回歸測試
  鎖住邊界，gate 門檻未放寬。
- v1.40（2026-07-30）：修正 `verify-translation.py` 的目標語言辨識只接受
  repo-relative path。渦流覆盤傳入 `/absolute/.../knowledge/{lang}/...` 或
  `/tmp/babel-*/quarantine/{lang}--{slug}.md` 時，舊版會靜默 fallback 成英文，
  把正常的阿文／日文 metadata 套進錯誤的 CJK-leftover 規則而假紅燈。現在
  同時辨識相對路徑、絕對 knowledge 路徑與 run quarantine basename；未知形狀
  才保留 legacy English fallback，四組路徑回歸測試鎖住行為，gate 門檻不變。
- v1.39（2026-07-30）：把 `link-url-mangle` 的 safe healer 接進 dispatcher。
  同一篇蛋撻葡／阿譯文均已完整產出，卻在 Prettier 把斜體 caption 裡
  percent-encoded Commons URL 的多個 `_` 改成 `*` 後，被 health gate 隔離。
  新 fixer 只處理已 mangled 的 Wiki URL 或斜體 caption 內既有 checker 判定的
  at-risk Commons URL：`*` 還原 `_`；若在 caption，保留純文字署名並把完全
  相同的可點連結移到緊接的非斜體段落，非 caption 則只還原 URL。URL multiset
  不變，且同時支援 `_…_` 與歷史 `*…*` caption，十一語標題不用猜，
  verify／leak／health 三閘亦不放寬；兩篇當輪隔離樣本作真實回歸驗收。
- v1.38（2026-07-30）：多語 image-health 的圖片出處標題補上 ru／ar。
  本輪兩篇新俄文都已有 `## Источники изображений` 與完整 attribution，checker
  卻因既有多語 regex 漏列俄文而同報「缺圖片來源」；這是 QA 觀測假黃燈，不是
  文章缺資料。新增俄文「來源／credit × 圖片／照片／影片」與阿文
  `مصادر/حقوق × الصور/صورة/الفيديو` 樣式及回歸測試，其餘語言與 severity 不變。
- v1.37（2026-07-30）：Structured Phase N 補齊兩種原文非單一連結腳註：
  `[來源一](URL1) + [來源二](URL2)` 現以第一來源作 canonical 主連結、其餘
  留在受 URL armor 保護的 description；歷史 `[Title. 取自 [](URL))` 形狀也
  改由專用 parser 無損取出 title／URL。舊版兩者都退到 lossy fallback，把
  `](` 殘片再包進 `[title](url)`，本輪 id／ar 各一篇因此死於
  `footnote-format`。Phase N 同時拒收含 Markdown／換行的模型 title，且驗證
  不過立即不落盤，不再白跑 body 後交給下游隔離。v1.36 的段落二分已在
  `ru/Geography/changhua-county` 真實成功，另在 ar 樣本完成引擎、但被上述
  Phase N 缺陷擋下，證明 fallback 機制有效。Gemma 4 31B vi pilot 跨兩個
  30 分鐘冷卻窗 6/6 都是 provider capacity 429、品質樣本為 0；空轉車道撤下，
  vi 回到 fail-closed，M4 與 fleet 接案邊界不變。
- v1.36（2026-07-30）：Structured fallback 的 body chunk 三次失敗後，新增一次
  有界的段落二分救援。近一小時 4 篇都已完成 Phase F/N，只因 1 個 body chunk
  失敗便整篇歸零；新路徑只在至少有兩段時沿最接近中點的段落邊界切成兩半，
  每半各追加 1 次呼叫，仍逐半驗 footnote／URL／CJK leak，合併後再驗原 chunk，
  任一不合格仍不落盤。同期 vi 由已撤池的 Laguna 改成符合級別門檻、已通過
  sovereignty 校準的 Gemma 4 31B 單 worker pilot；取得 n≥8 真實文章後再按
  15% 門檻決定留撤。M4 仍禁跑，地端接案規則不變。
- v1.35（2026-07-30）：撤下 Laguna 越南語專軌。2026-07-26 的歷史校準曾有
  43-71%，但近兩日真實完整文章已累積 0/44，本輪 0/9；主要失敗是單次請求
  撞 600 秒 hard deadline，另有一篇 armor fallback 兩次合計 983 秒仍零產物。
  這已遠超 n≥8 且通過率 <15% 的撤池線，不能讓舊 benchmark 永久凌駕新實績。
  `restart-vortex.sh` 現只啟動 cloud 與可選 fleet 軌；vi 在重新取得合格模型前
  fail-closed，不以小模型或繞過 fleet 的 M4 補洞。QA gate 與其他語言編組不變。
- v1.34（2026-07-29）：把 canonical CJK leak gate 前移到 `translate.py`
  落盤前，命中時用同一次整篇流程的第二次有限重試修復。舊的段落級 partial
  gate 只抓「80 字以上且中文過半」，本輪 Nemotron 33 篇中 19 篇是短中文片段
  混在已翻譯段落，全部避開前置閘、落盤後才被 dispatcher 隔離。新閘直接
  import `cjk-leak-check.py` 的合法區、CJK run 與 ja/ko marker SSOT，不另寫
  判準；第二次仍漏就不落盤，dispatcher 下游 gate 繼續保留作獨立防線。
- v1.33（2026-07-29）：OpenRouter timeout 改成真正的 wall-clock deadline。
  v1.32 已阻止逾時跨 key 重播，但 urllib 的 `timeout=` 只限制單次 socket
  operation；Laguna 只要持續滴流，一次 API call 仍可跑 1,205 秒，兩次全文
  嘗試實測鎖住 worker 2,404 秒。本版用 Unix `SIGALRM` 包住 connect＋完整
  response read，讓 `timeout=600` 真正代表整次呼叫最多 600 秒；非主執行緒／
  非 Unix 環境保留 socket timeout fallback。QA gate、重試次數與 key 規則不變。
- v1.32（2026-07-29）：OpenRouter 的單次 600 秒逾時不再輪換所有 API key。
  key 輪換只對 429 這類額度／帳號狀態有意義；provider/model 已經接住請求卻
  逾時，換一把授權 key 只會重播同一個長請求。舊路徑把 `TimeoutError` 當一般
  例外，每把 key 各等 600 秒，七把已儲值 key 讓一篇 Laguna 長文最壞佔住
  worker 70 分鐘而沒有 report。本輪三個 vi worker 同時超過 23 分鐘零產出，
  process 存活與 registry 正常，才把這個放大器浮出來。現在第一次逾時立即記
  `BackendTimeout`，dispatcher 照原 hard gate、失敗記憶與下一篇機制前進；
  429 仍照舊輪 key，品質門檻與單次模型逾時均未調低。
- v1.31（2026-07-29）：弱適配儀器新增「同 worker/backend 跨語總體」聚合。
  原本只等 `worker × lang` 各格 n≥8；四語 lane 已整體 0/8 時，每格仍只有
  2 筆，最慢要浪費 32 次才會警示。新總體列當場抓出
  `desktop3090[ollama:qwen3.5:35b] × all = 0%`，逐語表仍保留供切軌。
  該模型後續達 0/9，雖然單篇 235–530 秒不再逾時，仍全數敗於 URL identity、
  CJK leak 或 footnote-format；fleet Babel profile 因此撤下 qwen3.5:35b
  與先前長文 3/3 timeout 的 qwen3:32b，並透過 fleetctl 補
  `gemma4:26b`，沒有合格模型時維持 fail-closed。原拉模 API 使用
  `stream:false`，17 分鐘沒有任何控制面訊號；fleet 現改讀 JSONL 串流事件並
  每 5% 回報，重連可接續已下載 blob，長任務不再把下載冒充卡死。
- v1.30（2026-07-29）：同一篇 `Society/外送專法.md` 驗出 count-only URL
  gate 的假綠：模型把 Yahoo percent-encoding 改一碼、把 apostrophe 改成
  `%27`，只要總數相同舊 gate 就會放行；同時舊規則還容忍 ±2 個 URL。
  `verify-translation.py` 改驗 URL multiset 完全相同，少／多／改任何一條
  都 hard fail。這篇另補回模型截斷的兩則多來源腳註、修掉兩段簡中洩漏，
  再經 verify／leak／article-health 三閘回收。
- v1.29（2026-07-29）：模型「品質入池」再補「完整工作量吞吐資格」。把 3090
  收斂為單 worker 後，dense `qwen3:32b` 仍在同一篇長文連續 3/3 撞 900 秒，
  證偽 v1.27 的純並行歸因；短 prompt 27 秒可回不代表能在 SLA 內完成文章。
  fleet 改優先核發節點已有的 MoE `qwen3.5:35b`（抽象層實測 142.7 tok/s），
  再重啟產線用真實文章驗收。嘗試拉 `qwen3.6:35b-a3b-coding-nvfp4` 時，遠端
  Ollama 回覆該 manifest 僅支援 macOS；fleet HTTP 包裝現保留遠端錯誤本文，
  診斷不再需要 consumer 繞過抽象層直打節點。
- v1.28（2026-07-29）：report 實績補上實際 backend／模型歸因，preflight
  的弱適配表改按 `worker[backend] × lang` 聚合。同一個 fleet label 會隨
  workload profile 從 `gemma4:12b` 換到 `qwen3:32b`；舊版只記 label，
  兩個模型的通過率會永久混在一起，讓換模型後的校準無法判讀。舊報表沒有
  backend 欄時保留原 key，新樣本開始可獨立收斂。
- v1.27（2026-07-29）：fleet 的 workload profile 從「只管模型品質」補成
  「同時管單機並行」。上一輪把不合格的 `gemma4:12b` 換成 `qwen3:32b` 後，
  抽象層仍依全機 batch 額度核發三個 worker 給同一張 24GB 3090，首小時
  9/9 全在 900 秒 timeout；同模型經 `fleetctl run` 單請求 27 秒正常，
  證明是單 GPU 排隊放大而非模型或端點死亡。`babel` profile 現每台最多核發
  1 worker；全機控制面與其他 workload 不變，consumer 仍只宣告 profile。
- v1.26（2026-07-29）：補 launchd 子程序環境邊界。v1.24 讓 dispatcher
  跨 exec cell 常駐後，dispatcher 本身雖由 Homebrew Python 啟動，內部大量
  `subprocess(["python3", ...])` 卻依 launchd 精簡 PATH 落到 `/usr/bin/python3`，
  因缺 PyYAML 讓 translate／patch／structured 全部 0 秒失敗並凍結 workers。
  重啟器現在以 `/usr/bin/env` 明確注入已通過 preflight 的 PATH 與 HOME，
  整棵 process tree 使用同一工具鏈；launchd 仍持有生命週期，不改 fleet
  抽象層或模型配置。
- v1.25（2026-07-29）：補 v1.23 fallback policy 的呼叫端回歸。重構時移除了
  `backend_unavailable` 初始化，卻漏掉下游 fail-reason 分支仍讀該名稱；三軌
  第一件 no-output 因 `NameError` 整個 dispatcher exit。現在由同一份
  `primary_output` 初始化該診斷旗標，並以不可達假 endpoint 前景跑完整單篇
  路徑：`Available: []` → skip structured → HEAD restore → report → final status
  全程 exit 0。這次也證明 py_compile＋純 policy unit 不足以覆蓋呼叫端，核心
  分支修改後必須至少跑一個 end-to-end no-output smoke。
- v1.24（2026-07-29）：修正受管重啟在 Codex automation 內的假存活。
  `restart-vortex.sh` 用 nohup/disown 起三軌，3 秒自檢會顯示成功；但 exec cell
  結束時宿主回收整個 process group，三軌在 queue 完成後同步消失且無 Python
  traceback。現在 macOS 由固定 launchd labels 持有 fleet／cloud／vi 三軌，
  重啟器先 remove 舊服務再沿 process tree 清場，仍是唯一控制入口；非 macOS
  才 fallback nohup。stdout／stderr 分流且 `--check` 同時顯示非空 stderr，
  啟動失敗不再靜默。
- v1.23（2026-07-29）：以本 run 81 次實績收斂 structured fallback eligibility。
  零產物後換 structured 共只救回 5 次；desktop Ollama 0/29、Laguna 0/14，
  後者累積約 20 worker-hours 仍 0 成功，救援路徑已成確定性長尾。Nemotron
  尚有 5/38，故只保留它的 structured 路徑；primary 翻譯、下一輪重試與
  verify trio 均不變。同時把 primary 已明示 `Available: []`、全 key rate-limit
  或 provider error 的容量故障視為 terminal：structured 仍打同一 backend，
  不再複製一次已知失敗。report 新增 skip reason，後續可區分 backend-capacity
  與 backend-adaptation；hard gate 不變。
- v1.22（2026-07-29）：把 manifest 已解析成功的 `[[wikilink]]` 路由從模型手上
  收回工具端。近一小時 en／ko 隔離樣本雖拿到正確 `wikilink_targets`，模型仍把
  `[[台灣企業：台積電]]` 翻成不存在的 `[[Taiwanese Enterprise: TSMC]]`，
  link-target healer 無法安全猜回目標，只能整篇擋下。現在送模型前先機械化為
  `[來源錨字](目標語路由)`，路由隨即進既有 URL token 裝甲；模型只翻錨字，
  URL 與路由 byte-preserved。只處理 manifest 明確解析成 `/...` 的 target，
  zh-only／缺映射仍保守留給既有 prompt 與 hard gate，沒有放寬 QA。
- v1.21（2026-07-29）：safe-only footnote healer 收編完整 link 被多包一層
  方括號的無損形狀：`[^N]: [[Title](URL)] — desc`。本輪唐鳳隔離樣本兩行
  title／URL／description 全都存在，只有外層 `[...]` 多餘；舊 healer 不動，
  因而整篇死於 footnote-format。新規則只匹配腳註定義整行且 desc ≥6 字，
  僅移除冗餘外括號；title 內的 `[^1]` 引用、URL 與描述 byte-preserved，
  hard gate 不變。
- v1.20（2026-07-29）：把 v1.19 的含括號 URL 修復收斂到 structured
  fallback 的獨立 Phase N/B parser。v1.19 上線後仍有 id／vi 三個腳註變成
  `[[Title](<](<URL%3E>))`；追查不是 whole translator 回歸，而是
  `structured-translate.py` 的 `FN_CANON_RE` 同樣在 angle-wrapped URL 內
  第一個 `)` 截斷，退入 lossy fallback parser。現在 footnote 主 URL、
  description 內嵌連結與 body URL multiset validator 共用同一個
  `MD_TARGET_PATTERN`，優先整段接受 `<...>` target；URL 與編號重新回到
  Phase N 宣稱的工具端 byte-preserved 不變量，hard gate 不變。
- v1.19（2026-07-29）：修正 URL 裝甲主動造壞含括號 Wikipedia target。
  CommonMark 以 `<https://..._(Japan)>` 包住含括號 URL，但 tokenizer 的
  markdown-target regex 在第一個 `)` 截斷；印尼文國定假日因此從正確來源
  變成 `[[Title](<](<URL>))`，最後死於 footnote-format。angle-wrapped target
  現在優先整段 token 化並原樣還原。同期 safe-only footnote healer 接受
  `[^N]: [Title](URL).` 這個 URL-only＋尾端標點的無損形狀，移除句點後補
  domain-aware description；兩項均維持原 hard gate。
- v1.18（2026-07-29）：讓隔離 leak 覆盤與產線使用同一個語言判準。v1.15
  已讓 `cjk-leak-check.py` 能顯示 repo 外的 `/tmp/.../quarantine` 路徑，
  但語言仍只從 `knowledge/<lang>/...` 推導；`pt--slug.md` 等隔離檔因此全被
  當成 unknown，誤走 ja/ko 的 marker 分支，non-CJK 語言的 4+ 漢字洩漏在
  覆盤時大量消失。現在辨識 dispatcher canonical `<lang>--<slug>.md` 命名；
  產線 gate 判準不變，修的是診斷儀器，避免把 13 件真 leak 誤看成 3 件。
- v1.17（2026-07-29）：保住 URL-token fallback 的站內受管圖片。近一小時
  5 個 `image-health` 隔離樣本全都先發生一般 URL token 遺失，改走非裝甲
  重譯後，模型再把來源正確的 `/article-images/...` 改成外站、壞掉的 Commons
  URL 或不存在的站內網址。fallback 仍維持「一般連結與裸 URL 原樣送模型」的
  真正換路，不重啟曾造成更高 token 遺失的整套 URL 裝甲；只把狹義 markdown
  圖片 target `/article-images/...` 留在機械 token／恰好一次 hard gate 內。
  圖片是已下載並受 image-health 管理的資產，不是可翻譯內容。
- v1.16（2026-07-29）：把「機器可達」與「模型服務可用」收斂回 fleet
  抽象層。probe 原本已正確區分 `idle/busy`（Ollama serving）與 `online`
  （SSH 可達但 Ollama 未服務），但 `batch_workers(service="llm")` 只排除
  `offline`，因此 laptop-4090 連續三小時被核發、每小時 18 次模型呼叫全敗。
  fleetlib 現在對 llm/embed/translate fail-closed：只有 `idle/busy` 節點能被
  核發；generic SSH 工作不受影響。實跑核發清單由 6 workers 收斂成 3 個真正
  serving 的 desktop3090 workers，Babel 不再自行探測或繞過 fleet。
- v1.15（2026-07-29）：修正隔離樣本 leak 覆盤的路徑崩潰。
  `cjk-leak-check.py` 的 CLI 接受任意 positional path，但有命中時固定呼叫
  `p.relative_to(REPO)`；傳入 `/tmp/babel-*/quarantine/*.md` 會在印第一筆
  結果前直接 `ValueError`，讓最需要檢驗的隔離樣本反而不可分析。現在 repo
  內仍顯示相對路徑，repo 外顯示絕對路徑；掃描與 leak 判準完全未改。
- v1.14（2026-07-29）：停止對明確不可用的同一端點做 structured fallback。
  v1.13 修正產物歸因後，4090 瞬斷會正確顯示 `Available: []` 並走 structured；
  但 structured 仍使用同一個不可達 endpoint，本輪 18 次失敗全都在首段約
  10 秒後再白等約 150 秒，成功 0。現在只有「backend 可用但沒產物」才換
  structured 路徑；明確無 backend 時直接記 `no backend available` 並進
  worker freeze 計數，下一輪再試。QA gate 與正常 fallback 條件均未放寬。
- v1.13（2026-07-29）：修正全文引擎的產物歸因。stale 任務本來就有舊譯文，
  4090 endpoint 瞬斷時 `translate.py` 顯示 `Available: []`、模型呼叫 0 次、
  exit=1，dispatcher 卻只用「target 路徑存在」判定本次有產物，再拿舊檔跑
  gate；一小時內 40 次連線失敗因此冒充 `verify=4`，structured fallback
  也完全沒觸發。現在保存執行前 bytes，只有新增或內容真正改變才算 backend
  產物；全文零產物會換 structured 路徑，仍零產物則記 no-output 並進 worker
  freeze 計數，不再檢驗或隔離舊的 stale 基線。patch exit=1 仍維持 v1.11
  的直接歸因，不改成全文 fallback。同輪把受管重啟的清場從不完整的廣域
  `pkill` 改為沿 dispatcher process tree 遞迴終止；patch／structured 子代
  不再於父程序退出後被 PID 1 收養、跨輪繼續寫工作樹。
- v1.12（2026-07-29）：新增狹義攝影者中文署名豁免。pt 李宗盛／羅大佑
  隔離樣本的 4 個 CJK 命中全是 Wikimedia 授權鏈中的
  `Foto: 化城再来人`；作者名不可刪除或為通過 gate 而改寫。checker 現只
  剝除 `Photo/Foto:` 後緊接的 1–30 個漢字，逗號後正文與其他中文仍照掃；
  沒有放寬一般 ASCII 引號／括號，因此俄語同篇的真漏譯仍會被擋。同輪撞出
  歷史回收器把 `--help` 當正式執行、末尾又因清單 parent 不存在而崩潰；
  現補標準 argparse 與自動建目錄，查說明不再產生工作樹寫入；另加只接受
  明確 basename、回填後強制跑 canonical verify trio 的 run-quarantine
  回收模式，checker 修正可當輪救回好譯文而不整包放行。孤兒回收器另修
  `--quarantine-failed` 把 tracked stale 基線誤搬走的缺陷：未過 gate 的
  tracked 候選現在精確還原 HEAD，只有 untracked 衍生檔才移入 `/tmp`。
- v1.11（2026-07-29）：修正 patch exit=1 的失敗歸因。patch 引擎已把候選
  擋下並還原舊譯文，dispatcher 卻又拿還原後的 stale HEAD 跑一次外層 gate，
  讓舊文既存 leak／health 問題冒充本次模型失敗；本輪表面 21 個 leak 至少
  多筆屬此型。現在直接記為 `patch candidate rejected by verify trio`，不再
  heal／隔離／重驗不是本次產物的舊檔；exit=2 的全文 fallback 邏輯不變。
- v1.10（2026-07-29）：三條 dispatcher 由 `restart-vortex.sh` 同分鐘啟動時，
  舊的 minute-only run dir 讓它們共用 `report.jsonl`／`master.log`／
  `slug-map.json`／tasks，process-local lock 無法保護跨程序競寫，實績也無法
  乾淨歸因。run dir 改為秒＋PID，另加碰撞 suffix；pulse／preflight 的 wildcard
  discovery 不需改動。現存合併 report 保留為事故證據，下一次受管重啟起各軌
  獨立落檔。
- v1.9（2026-07-29）：M4 接案權限不再寫死於 wake prompt 或腳本，由
  `muse-bot/fleet` control plane 動態決定；同一輪指示衝突時，以觀察者最新
  明確指示為準。首輪受管驗收三併發 7 件、0 通過，平均耗時 10–25 分鐘，
  主因是 leak、frontmatter／腳註 gate 與 structured fallback 無輸出；沒有
  任何產物越過 QA。為保留觀察者授權又避免單一 Ollama 實例互塞，控制面降為
  1 worker 後重啟，後續用同一份 report.jsonl 實績決定保留或退場。
- v1.8（2026-07-29）：修正 v1.7 report instrumentation 的致命分支缺陷：
  `structured_fallback` 初始化誤放在 semantic-noop helper，造成「已有輸出但
  QA fail」寫報表時拋 `UnboundLocalError`，連帶殺死整個 fleet/cloud
  dispatcher。欄位現於 `process_task()` 入口初始化，單篇 QA fail 只隔離單篇，
  不再讓產線退出。當輪另確認 Laguna no-output 的主因為上游 429/502 與大文
  腳註全失，不是 M4 或 fleet 越權；當輪 M4 依當時控制面禁跑。
- v1.7（2026-07-28）：v1.6 實績至少 1 篇救回；4 篇 Phase N 因模型把正確
  array 包成單鍵 dict 被 parser 拒收，另 2 篇是真正 body chunk 失敗。parser
  現只解包「dict 內恰好一個 list」的高信心形狀，後續長度／ID／欄位 gate
  不變；dispatcher 同步把 fallback、engine 與 exit code 寫進 report 供逐輪歸因。
- v1.6（2026-07-28）：dispatcher 的第一條翻譯路徑完全沒落檔時，自動用同一
  worker/backend 改走 structured engine 一次，產物仍須通過原三重 gate。近一
  小時 40 個 fail 中 10 個是 no-output；先只救零產物，不同時擴張到已有輸出的
  gate fail，讓實績可歸因。
- v1.5（2026-07-28）：脈搏快照改為精確 add 四個儀器產物，並用
  `git commit --no-verify` 避免 lint-staged stash 全工作樹。實撞證據是重啟後
  3 軌都活著，`babel-pulse --force-commit` 執行期間卻同時退出、快照記成 0；
  快照 commit 不再為了記錄心跳而打斷產線。
- v1.4（2026-07-28）：把 `footnote-format` 的 safe-only fixer 接進 dispatcher
  gate 前。最新隔離樣本 8 個中完整救回 1 個、部分修復但仍被 gate 擋下 2 個、
  不動 5 個；fixer 不碰 APA／多連結等有資訊損失風險的格式，品質門檻不放寬。
- v1.3（2026-07-28）：修正 `restart-vortex.sh --check` 的語意漏洞。舊版雖在操作
  提示中宣稱它是巡檢入口，卻未解析該參數，實際會清場並重啟三軌；現在
  `--check` 是嚴格唯讀，列出 fleet 核發、dispatcher、lane log 與本機 M4
  Ollama 空載狀態後立即退出。
- v1.2（2026-07-28）：隔離樣本 17/17 個 `health [link-target]` 都是內部連結
  category 大小寫漂移；把既有 `article-health --check=link-target --fix` 接進
  dispatcher 三重 gate 前，機械格式不再浪費整篇譯文，hard gate 本身不放寬。
- v1.1（2026-07-28）：M4 退出 Babel 批次；地端 worker 改由 fleet 控制面動態核發，
  渦流固定面板同步為三軌。
- v1.0（2026-07-27）：初版。收斂三天渦流的全部教訓：三重巡檢（存活≠生產五面貌）、
  優先序佇列＋repo 版控難篇記憶、模型×語言適配切軌、固定 benchmark 面板。
