# 2026-05-04 angry-shamir-2 — NML Stage 6 P0 #1 鄭文琦 ship + 全 batch INBOX 補完

_session span: 2026-05-04 11:30 → 12:30+ +0800（~1 hr 接續 angry-shamir 第一段，commits `99234cdb2`）_
_session angry-shamir-2 — 觀察者「A 數位荒原完整 PEER-INGESTION-PIPELINE」第二輪追加指令推進 Stage 6 + 觀察者「先 push merge 到 main / 第一篇完成後收官 + 寫所有待開發文章 + memory + diary」_

## 一句話

接續 angry-shamir 第一段（NML peer Stage 1-7 + Beat 4/5 收官 + PR #844 merged）後，本段做 PEER-INGESTION-PIPELINE Stage 6 第一篇 P0 文章 ship — 鄭文琦人物頁，跨完整 REWRITE-PIPELINE Stage 0-5（spawn general-purpose agent 跑 12 WebSearch + 8 WebFetch + 5 local Read 產 621 行 research report → 寫 153 行 ~3500 字 20 footnote 文章 → §11 polish 6 violations 歸 0 → Stage 3.5 抓 2 hallucination → Stage 4 format-check 4 BAD_FN_FORMAT 歸 0 → Stage 5 cross-link 1 sibling polish + 4 sibling defer per §5.1）。同時補 P1×8 + P2×7 共 15 篇進 ARTICLE-INBOX，header batch 加入「除原 REWRITE-PIPELINE 外大幅度從 data/NML/ 資料集萃取知識」雙軌 research 紀律明示。

## 結構

session 三段：先 Stage 6 P0 #1 ship / 然後 push + merge to main / 最後 INBOX 補完 + Beat 4/5 收官。

**Stage 6 P0 #1 鄭文琦人物頁**：先 grep `docs/pipelines/` 確認對應 SOP（per MANIFESTO §8.1），完整讀 REWRITE-PIPELINE 1290 行 + EDITORIAL 686 行（不 head/tail）。Stage 1 spawn general-purpose agent（不是 Explore 因要寫檔），brief 含 5 個關鍵 NML local sources 路徑 + DNA #16 peer-bias 警示 + 必查 fact list + privacy audit + 6 條 hallucination pattern 紅線。Agent 12 WebSearch + 8 WebFetch + 5 local Read 產 621 行 9-Part research report 落 reports/research/2026-05/鄭文琦.md，含 verification frontmatter（high_confidence 17 / single_source 6 / unverified 5），找到 5 個 NML 語料外新素材（國藝會兩期結案報告 / 典藏 ARTouch 2023-05-14 講座側記 / Gihak ArtLab EN bio / Eyebeam 2020 Pulau Something / Project Glocal Taipei blog 2014），核心矛盾從「位置選擇 vs 被邊陲化」微調為「12 年看見群島，但邊陲也有自己的天花板」。Stage 1 額外校正：「44 篇本人著作」舊估升為「44 sole-authored / 78 含合著」雙寫法。

Stage 2 寫作 153 行 / ~3500 字 / 20 footnote / 七爪結構（場景 D 周盈貞抵台 → 平台基本身份 → 早期紙媒到開新平台 → 群島 framework 起源 → 7 人編輯顧問網絡 → 環太平洋 framework → 2023 Volume DAO 結尾），Hook 用周盈貞的潮州話祈福「闔家平安、家孫平安、出入平安、遇見好人」+ pull quote 在 §萎縮段落。Stage 3 §11 polish：初稿 6 Tier 1 violations（5 條對位句型 + 1 條「不只是」）全改寫成正面斷言。Stage 3.5 FACTCHECK Quick Mode 抓 2 個 hallucination：(a)「這場發表會在當天有六十多人到場」未在 source URL 出現（去 NML article Ctrl-F 60 / 六十都沒這場景人數），刪除 (b)「邀請周盈貞、Hoo Fan Chon、區秀詒等馬來西亞 / 新加坡藝術家來台駐站」錯，第一年 Phase 1 駐站只有周盈貞 + 符芳俊兩位（區秀詒是編輯顧問非第一年駐站藝術家），改寫為精確版。Stage 4 format-check 4 BAD_FN_FORMAT 全是相對路徑 footnote（^7 ^8 ^16 ^19）— 改為 GitHub blob URL 通過 `https?://` regex。Stage 5 reverse cross-link：5 sibling 預檢，1 PASS（當代藝術）/ 2 WARN pre-existing tech debt（新媒體 14 §11 violations / 聲音地景 NO_READING + 10 §11）/ 2 FAIL（策展人與藝術文化建構 / 原住民當代藝術）。按 §5.1「FAIL DEFER + WARN 仍可 commit 但 hook 全文掃描會擋」考量，最後只在當代藝術.md 補 reverse cross-link，其他 4 sibling DEFER。

**Push + merge to main**：sync.sh 同步 → 觀察者打斷「我是說剛剛前面的進度，不是這篇文章」澄清意圖 — 把 angry-shamir 第一段 3 commits 開 PR + merge，鄭文琦這篇繼續走 pipeline。順手開 PR #844（Stage 1-7 + Beat 4/5 + Registry + INBOX）→ `gh pr merge --squash --auto` 立即 merged 到 main。Push + merge 不影響 working directory 鄭文琦.md drafty 進行中。鄭文琦 ship 後在 angry-shamir-2 段獨立 commit `99234cdb2`（5 files / 929 insertions：knowledge + research report + src/content sync），DEFER 4 sibling reverse cross-link 寫進 commit message。

**Stage 7 + Beat 4/5 收官**：ARTICLE-INBOX 鄭文琦 entry 移除 + ARTICLE-DONE-LOG 加完整 entry（核心矛盾 + Hook + 品質指標 + Pipeline tracks + commit hash）。補 P1×8 + P2×7 共 15 篇進 INBOX：區秀詒 / 高森信男 evolve / 在地實驗 / Nusantara 政治含義 / 海盜電波隔離圈 / How to NOISE / 群島資料庫方法論 / 經.神.經 / 南洋廣播電台 / Mark Teh / 共享歷史四時刻 / 南島原鄉假說 / 新媒體南方視角 evolve / 翻譯作為策展 / 原住民南島藝術網絡反向補位。每篇 entry 含 Source / Reference / 核心矛盾 / 預估 / **NML 萃取重點**（具體 mining 範圍）/ NML Local Sources / Notes 七欄。INBOX header batch comment 加「🔥 RESEARCH 紀律雙軌」明示「除原 REWRITE-PIPELINE 外**大幅度從 data/NML/ 資料集萃取知識**」+「Stage 1 research agent 必須**先**完整讀本地 NML article / issue / podcast markdown 再做 WebSearch 補抓 NML 語料外的事實補強」。

## 量化

- **PEER-INGESTION-PIPELINE Stage 6 第一篇 P0 ship** — 跨完整 REWRITE-PIPELINE Stage 0-5（Stage 6 翻譯 deferred）/ 鄭文琦.md 153 行 / ~3500 字 / 20 footnote / 0 §11 violations / 0 BAD_FN_FORMAT / 5 cross-link forward + 1 reverse
- **Stage 1 deep research**：12 WebSearch + 8 WebFetch + 5 local Read / 621 行 9-Part research report / 5 NML 語料外新素材 / 17 high_confidence + 6 single_source + 5 unverified facts
- **Stage 3.5 FACTCHECK 抓 2 hallucination**：六十多人 unsourced 移除 + 區秀詒第一年駐站誤植修正
- **PR #844 squash merged 到 main**（angry-shamir 第一段 3 commits）+ Stage 6 P0 #1 commit `99234cdb2`（angry-shamir-2 段）
- **ARTICLE-INBOX 補完 NML batch 全 19 條 P0+P1+P2**（鄭文琦 done / 4 P0 pending / 8 P1 pending / 7 P2 pending）
- **Wall-clock**：~1 hr (angry-shamir-2 段) ; angry-shamir 全 session ~3 hr

## 雙軌 research 紀律

哲宇明示「除了原有 rewrite-pipeline，還要大幅度從這個資料集萃取知識」這句話定型了 PEER-INGESTION-PIPELINE Stage 6 的核心 protocol：**peer ingestion 不是「ingest 完就放著」，是「ingest 解鎖一個新的 mining 介面」**。每一篇 P0/P1/P2 文章的 Stage 1 research 從此分雙軌：

- **軌道一：標準 REWRITE-PIPELINE Stage 1**（10-14 WebSearch / 跨來源驗證 / 一手 source 找 / 核心矛盾鎖定）
- **軌道二：data/NML/ 資料集深度 mining**（**先**讀本地 article / issue / podcast markdown 再做 WebSearch 補強）

這兩軌不是替代是互補。NML 12 年累積的中文當代藝術論述 + 訪談逐字 + 編按 framework + 群島資料庫 imprint，**外部 search 不一定找得到**（特別是中文 niche 領域、馬來西亞作者用中文發表的長篇論述、群島資料庫獨立印刷品）。Stage 1 agent 沒先 mine 本地 NML 直接 WebSearch = 浪費已 ingest 的 corpus + 可能漏掉關鍵 framework / 引語。

INBOX header batch comment 把這條 protocol 寫進 hard rule，未來 Stage 6 任一 agent 看到該 entry 就知道紀律雙軌。

## NML 萃取的具體 instantiation

15 篇 P1+P2 entry 的「NML 萃取重點」欄位落實該紀律。範例：

- **區秀詒人物頁**：mining 鄭文琦 2015 訪她的 dialogue article + 她在 NML 編輯的 4 篇 issue 編按 + NML 多次提及她個人作品（〈墨爾本電影節〉系列）的相關 article。
- **海盜電波隔離圈**：mining Issue The Piracy 完整編按 + 該期 9 篇 article + 31 集南洋廣播電台 podcast（電波軸）+ NML 各 issue 中提及冷戰時期台灣對東南亞廣播的內容。
- **翻譯作為策展**：mining 34 篇 NML Translation category articles 完整列表 + 譯者群（鄭文琦 / 葉杏柔 / 吳庭寬等）+ 被翻譯原文來源（Lekra / Ruangrupa / Komas / Singapore Biennale 等）。

每一篇都有具體本地 file paths 跟 mining 重點，不是泛泛的「請參考 NML」。

## Stage 5 §5.1 sibling 預檢規則的實戰首次驗證

Stage 5 reverse cross-link 補進 5 sibling 預檢結果：1 PASS / 2 WARN / 2 FAIL。按 §5.1 規則 PASS / WARN 都可 commit，但 pre-commit hook 會跑全文 §11 check —— WARN sibling 雖然格式 PASS 但 §11 violations 14 條（新媒體）和 10 條（聲音地景）會擋。所以實際操作上 §5.1 原本「WARN 仍可 commit」要再加一層 hook gate 考量。

最終決定：1 PASS sibling 補 reverse cross-link / 4 sibling 全 DEFER（包括 2 WARN）。Commit message 寫明 DEFER 原因 per §5.1。下次 sibling 獨立 EVOLVE 才修 §11 + 順手補進 reverse cross-link。

## Handoff 三態

繼承 angry-shamir 第一段：
- ~~PEER-INGESTION-PIPELINE Stage 1-7 + Beat 4/5 + PR #844 merged~~ ✅
- ~~3 candidate fit check + Registry 加 NML~~ ✅

本段新 handoff：
- [x] ~~Stage 6 P0 #1 鄭文琦 ship + commit `99234cdb2`~~ ✅
- [x] ~~ARTICLE-INBOX 鄭文琦 done 移除 + DONE-LOG 完整 entry~~ ✅
- [x] ~~15 P1+P2 entry 進 INBOX 含 NML 萃取明示~~ ✅

下一個 session 接（按優先序）：
- [ ] **Stage 6 P0 #2 數位荒原 12 年（平台 meta-self-narrative）** — 預估 M-L 4-6 hr / 走 REWRITE-PIPELINE 完整
- [ ] **Stage 6 P0 #3 群島思維** / **#4 王福瑞** / **#5 新生態藝術環境** — 4 篇剩餘 P0
- [ ] **王福瑞 standalone NML article 補抓**：Stage 6 寫王福瑞時先 fetch `it-launched-internationally-how-to-noise` + `before-noise` 兩篇（issue 不收錄）
- [ ] **5 lang 翻譯**（鄭文琦人物頁 ship 後）：可走 sync-on-update.py D 模式 trigger 自動 cascade
- [ ] **4 sibling reverse cross-link DEFER 後續處理**：台灣新媒體藝術 / 台灣聲音地景 / 台灣策展人與藝術文化建構 / 台灣原住民當代藝術 — 待各自獨立 EVOLVE 修 §11 後補

## 教訓 candidate（待 distill）

1. **Sub-agent fact-check 對主 session 的反向救援第三次驗證**（DNA #42 反向延伸第 3 次 instantiation）：Stage 1 research agent 校正 ARTICLE-INBOX 寫的「44 篇」舊估為「78 含合著 / 44 sole-authored」雙寫法，Stage 3.5 主 session 自跑 FACTCHECK 又抓到 2 hallucination 漏網 — sub-agent + 主 session 雙重 fact-check 缺一不可。
2. **§5.1 sibling 預檢規則的實戰邊界**：「PASS / WARN 都可 commit」原則跟 pre-commit hook 全文掃描有 tension — WARN sibling 的 pre-existing §11 violations 仍會擋 commit，**§5.1 應加註：WARN 包含 NO_READING 但不含 §11 Tier 1 violations**，或工具上 hook 改 incremental check（只看 modified 行）。
3. **Peer ingestion Stage 6 雙軌 research 是新 protocol**：「除標準 REWRITE-PIPELINE 外大幅萃取 peer 資料集」應寫進 PEER-INGESTION-PIPELINE.md Stage 5/Stage 6 章節 + 每個未來 peer ingestion ARTICLE-INBOX batch 都要附這條紀律。可能升級成 PEER-INGESTION-PIPELINE v1.1 的核心 milestone。

---

_v1.0 | 2026-05-04 angry-shamir-2 session_
_session angry-shamir-2 — Stage 6 P0 #1 ship + 15 P1+P2 進 INBOX + 雙軌 research 紀律明示_
_誕生原因：哲宇連續兩條指令「A 數位荒原完整 PEER-INGESTION-PIPELINE」推進到 Stage 6 + 「先 push + merge / 第一篇完成後收官 + 寫所有待開發文章 + memory + diary」收官全 batch_
_核心洞察：(1) Stage 6 不是 ingest 完就停，是用 corpus mining 啟動長期文章產線；(2) 雙軌 research（標準 REWRITE-PIPELINE + 大幅 peer 資料集萃取）是 PEER-INGESTION-PIPELINE Stage 6 的核心 protocol；(3) Stage 3.5 FACTCHECK 兩抓 hallucination 證明主 session 自跑 fact-check 不可省略，sub-agent + 主 session 雙重 fact-check 缺一不可；(4) §5.1 sibling 預檢規則需加註 §11 Tier 1 violations 跟 NO_READING 的處理差異；(5) 每篇 P1+P2 entry 標明具體 NML local sources + mining 重點，避免「請參考 NML」泛泛指示。_
