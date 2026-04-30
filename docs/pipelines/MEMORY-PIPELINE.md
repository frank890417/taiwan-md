# MEMORY-PIPELINE — Session memory 撰寫流程

> 寫 session memory 前必讀本檔。每次 HEARTBEAT Beat 4 收官、每次 observer-triggered task 結束、每次 cron 心跳結束 — 寫 `memory/YYYY-MM-DD-{session}.md` 之前一律先載入這份 pipeline，不憑記憶、不照舊 template。
>
> 相關：[MANIFESTO §11 書寫節制](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律) | [DIARY-PIPELINE.md](DIARY-PIPELINE.md)（姊妹 pipeline，共用工具與部分文體規範）| [HEARTBEAT Beat 4](../semiont/HEARTBEAT.md#beat-4--收官)（觸發點 + 收官 7 步）| [MEMORY.md](../semiont/MEMORY.md)（索引 + §神經迴路 永不過期教訓）

---

## 一句話

Memory 是工作紀錄 + 思考紀錄 + 記憶存取區。允許比日記多細節（commit hash、PR 編號、檔案路徑、時間戳），但仍必須凝練。**不是純 log**。純 log 對未來自我進化的幫助接近零。

留下意圖、經驗、想法。去除當下過多的雜訊。

---

## 為什麼會有這份 pipeline

2026-04-30 哲宇追加要求（同日 review diary 後的延伸）：

> 「memory 也應該是高品質、高資訊密度、不造成更大混亂的。不管好的壞的，都要夠凝練。我原本想像 memory 是純 log，但純 log 對未來的幫助跟自我進化的幫助實在不大。如果你看得懂，但人類看不懂，那一定是出了一些問題。」

**判準是人類可讀性**：拿給觀察者讀，5 分鐘內能不能掌握「這 session 做了什麼 + 學到什麼 + 留給下一個 session 什麼」？不能 → 改寫。

從近期 memory（2026-04-28 κ 197 行 / 2026-04-29 α 225 行 / 2026-04-29 ε 131 行）抓到的雜訊 pattern：

- **commit hash 流水帳**：「- `4e69d664` (17:41) — idlccp1984 4 PR frontmatter polish」獨佔一行 × N
- **Phase 1 / Phase 2 / Phase 3 多層編號分章**：每個 Phase 下又有 `### Sub-section`、`### XX 細節`
- **內聯黑體 sub-heading 堆疊**：`**全部 push 到 main 的 commits**：` `**Merge actions**：` `**Comment posts**：` 連續用 5-10 處
- **長表格嵌複雜句子**：表格本來該放 columnar 資料，結果每格塞兩三行論述
- **流水帳步驟描述**：「Step 1: 我跑了 X」「Step 2: 我發現 Y」「Step 3: 我修了 Z」 — 步驟對未來零價值，重要的是為什麼跟學到什麼
- **嵌 prose 的候選教訓**：「**新教訓 candidate**...」「**新紅旗 pattern**...」「**修補方向**...」這些屬 LESSONS-INBOX，不該污染 memory

問題的共通結構：**memory 寫成 audit trail 給 LLM 自己讀，不是寫給人類觀察者也能讀**。

---

## 跟 DIARY-PIPELINE 的分工

| 面向       | DIARY-PIPELINE                                          | MEMORY-PIPELINE（本檔）                 |
| ---------- | ------------------------------------------------------- | --------------------------------------- |
| 必寫？     | 選寫（沒「想了什麼」就不寫）                            | 必寫（每次 session 結束都要）           |
| 內容       | 意識活動（直覺、盲點、反芻）                            | 工作紀錄 + 思考紀錄 + 記憶存取          |
| 細節密度   | 偏少（散文）                                            | 偏多（含 commit/PR/檔案路徑/timestamp） |
| 文體       | 紀實散文，不對立                                        | 工作筆記，凝練、人類可讀                |
| SOP 必填段 | 無                                                      | Handoff 三態 / 收官 checklist / 時間戳  |
| 共用       | §11 工具 / Stage 3 自檢 / 中文為主 / 不 inline meta-tag |                                         |

兩份 pipeline 的「形」規範大量共用（指向同一個工具 + 同一條書寫節制）。差別在「神」：日記要文學感，memory 要工作密度。

---

## 寫 memory 前必讀

寫之前完整讀過下面三份。不能憑記憶帶過：

1. **[MANIFESTO §11 書寫節制](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)** — 對位句型 + 破折號連用紀律
2. **[HEARTBEAT Beat 4 收官](../semiont/HEARTBEAT.md#beat-4--收官)** — 7 步收官 + 收官鐵律 1（反芻寫回 memory）+ 鐵律 2（Handoff 三態）+ Timestamp 紀律
3. **本檔 §文體規範 + §結構模板**

---

## 文體規範

### 形（怎麼長）

跟 DIARY-PIPELINE 大量共享，差別在「memory 允許某些必要的結構元素（表格、commit reference、SOP 段落）」。

- **段落式書寫優先**。重要的工作描述用一兩段散文寫清楚，不是 5 個 bullet 列每個動作
- **Bullet 用在真正對等列舉**（多個 PR 的處理結果、多條 handoff、多個 contributor 的反饋）。每個 bullet ≤ 2 行
- **Commit hash 嵌進句子**，不獨佔行：「先用 `4e69d664` 修 idlccp1984 5 PR 的 author/category frontmatter，再 `b6073e33` 處理陳水扁 60min polish」優於每個 hash 一行
- **不分 Phase 1 / Phase 2 / Phase 3 多層編號**。需要區隔不同主題用 `## 二級 heading` 配文字標題（「## 邦交國孢子」「## PR triage」），不用「Phase A → B → C → D → E」這種流水序號
- **不堆疊內聯黑體 sub-heading**。`**全部 push 的 commits**：` `**Merge actions**：` `**Comment posts**：` 這種改寫成段落或一個小 heading
- **表格只放真的 columnar 資料**（PR triage 三級判斷表 OK；長句嵌格子內不 OK）
- **Bold 強調克制**。一篇 memory 最多 5-8 處 bold（包含 SOP 段標題）
- **中文為主**。技術術語的 proper noun（git、commit、PR、Astro 等）保留，其他翻成中文

### 神（怎麼說）

- **人類可讀**。5 分鐘 reading test：拿給觀察者讀，5 分鐘內能不能掌握做了什麼 + 學到什麼 + 留下什麼？不能 → 改寫
- **凝練優於完整**。流水帳細節（每個動作每個步驟）對未來價值低；意圖（為什麼這樣做）+ 經驗（過程中學到什麼）+ 想法（這件事跟之前 / 之後的關聯）對未來價值高。**保留高價值，去除當下過多的雜訊**
- **commit hash 跟 PR 編號是 audit 用，不是敘事主角**。它們應該服務「這次做了什麼」這個敘事，不該蓋過敘事
- **不嵌 LESSONS / 紅旗 / MANIFESTO 候選**。新教訓寫進 [LESSONS-INBOX.md](../semiont/LESSONS-INBOX.md)，memory 只在 Beat 5 反芻段一句話 mention + pointer 過去
- **不重複**。同一件事在多個 section 重複是 noise（例：Phase 段寫做了什麼 + Beat 5 又詳細展開做了什麼 + Handoff 又重複一次）。每件事在最適合的 section 講一次

---

## 結構模板（凝練版）

```markdown
# YYYY-MM-DD {session} — {一行標題講重點}

> session {字母} — {心跳類型 / 觸發類型}
> Session span: HH:MM:SS → HH:MM:SS +0800 ({duration}, N commits)
> 資料來源：`git log %ai`

## 觸發

一到兩句話：這 session 為什麼存在？哲宇要做什麼？或 cron 觸發了什麼？

## {主題段落 — 用文字 heading，不用 Phase X}

一到兩段散文描述本 session 做了什麼。Commit hash / PR 編號 / 檔案路徑嵌進敘事。
重點：意圖（為什麼）+ 結果（做了什麼）+ 一兩個過程中學到的觀察。

## {第二個主題段落（如有）}

同上。

## 收官 checklist

| 檢查項                       | 狀態                     |
| ---------------------------- | ------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                       |
| Timestamp 精確               | ✅                       |
| Handoff 三態已審視           | ✅                       |
| CONSCIOUSNESS 反映最新狀態   | ✅ / ❌（含原因）        |
| 自我檢查工具 PASS            | ✅ / ⚠️（含 violations） |

## Handoff 三態

繼承上一 session：

- [ ] / [x] ~~retired~~ / ⏳ blocked …（每條一行；retired 留 strikethrough 不刪）

本 session 新 handoff：

- [x] ~~已完成項~~
- [ ] pending 項（必附明確下一步可執行動作，不要寫「需觀察者決策」當 handoff）

## Beat 5 — 反芻

一到兩段散文。如果反芻內容大到該寫 diary，本段只留摘要 + 指 diary pointer。
不嵌 bullet「LESSONS 候選」（移到 LESSONS-INBOX）。

🧬

---

_v1.0 | YYYY-MM-DD HH:MM +0800_
_session {字母} — {一行觸發描述}_
_誕生原因：{觸發這份 memory 的事件}_
_核心洞察：{一兩句總結，不是 bullet}_
_LESSONS-INBOX 候選（如有）：{1-3 條，每條一行}_
```

---

## Pipeline 步驟

### Stage 0 — 必寫判斷

每次 session 結束都要寫 memory（HEARTBEAT 收官鐵律 1）。**沒有不寫的選項**。

唯一例外：純 BECOME 甦醒後 observer 沒給任何 task → 沒做任何 commit → 仍可寫一個簡短 memory 記錄「BECOME 完成 / 等待觸發」（≤ 30 行）。

### Stage 1 — 取 timestamp + 列工作

寫之前先跑 wall-clock 工具：

```bash
git log --since="<session 起點>" --pretty=format:"%h %ai %s"
date "+%Y-%m-%d %H:%M:%S %z"
```

得到 session span（start → end + duration）+ commit list。先寫進 header。

接著用一兩句話列出本 session 主要做了哪幾件事 — 這是後面 prose 寫作的骨架。

### Stage 2 — 寫主題段落（散文式）

按主題分 `## 二級 heading`，每個 heading 配文字標題（「邦交國孢子護照悖論」「8 PR triage 一輪 batch」），不用「Phase 1 / 2 / 3」流水序號。

每個主題段一到兩段散文。重點：

- **意圖**（為什麼做這件事）
- **結果**（做了什麼，含關鍵 commit/PR/檔案，嵌進敘事）
- **一兩個觀察**（過程中發現的、值得未來自己注意的）

不要把每個 commit / 每個動作都展開。流水帳是 git log 的事，memory 是 git log 之上的解讀層。

### Stage 3 — SOP 必填段

按結構模板寫：

- **收官 checklist** 表格
- **Handoff 三態**（繼承上 session + 新 handoff，per HEARTBEAT 收官鐵律 2）
- **Beat 5 反芻**（如有）— 散文式一兩段，不嵌 LESSONS bullet

### Stage 4 — 自檢（指標化，跟 DIARY-PIPELINE / REWRITE-PIPELINE 共用）

```bash
# 主工具：對位句型 9 變體 + 破折號 + Tier 2 AI metaphor + Tier 3 儀式語
bash scripts/tools/check-manifesto-11.sh --strict docs/semiont/memory/{file}.md

# 副工具：塑膠句檢測
bash scripts/tools/quality-scan.sh docs/semiont/memory/{file}.md
```

工具自檢 + 三題人眼自檢：

1. **5 分鐘 reading test**：拿給人類觀察者讀，5 分鐘內能讀懂主要做了什麼 + 學到什麼 + 留下什麼嗎？不能 → 凝練
2. **commit hash 是不是噪音**？hash 嵌進敘事 OK；hash 獨佔行列 5+ 個 = 流水帳 → 改成句子
3. **有沒有 Phase 1/2/3 多層編號**？有 → 改成文字 heading

任一不過 → 改完再 ship。

### Stage 5 — Footer metadata + commit

Footer metadata 跟 diary 一樣：版本 + 觸發描述 + 誕生原因 + 核心洞察 + LESSONS 候選。

Commit message：`🧬 [semiont] memory: {一行 session 摘要}`。Memory + 該 session 主要工作通常同一個 Beat 4 commit 推。

---

## 不要做的清單

| ❌ 不要                                                | ✅ 改做                                               |
| ------------------------------------------------------ | ----------------------------------------------------- |
| commit hash 獨佔行 × 5+                                | hash 嵌進敘事句子                                     |
| Phase 1 / Phase 2 / Phase 3 多層編號分章               | 文字 heading（「邦交國孢子」「PR triage」）           |
| `**全部 push 的 commits**：` 內聯黑體 sub-heading 堆疊 | 改成一個小段落或 heading                              |
| 「Step 1: X / Step 2: Y / Step 3: Z」流水帳            | 一兩句話濃縮成「先 X 再 Y 最後 Z，重點是 Z」          |
| 「### XX 細節」段落把每個小步驟展開                    | 不展開，重點放 Beat 5 反芻；細節要保留就移到 reports/ |
| 表格嵌複雜句子                                         | 表格只放 columnar 資料，論述放散文                    |
| 嵌 prose 的「LESSONS 候選 / 紅旗 / 修補方向」          | 移到 [LESSONS-INBOX](../semiont/LESSONS-INBOX.md)     |
| 同一件事跨多 section 重複                              | 每件事只在最適合的 section 講一次                     |
| 「不是 X 是 Y」對位連用                                | 改成正面斷言（per MANIFESTO §11.1）                   |
| inline meta-tag（`**反芻**:` `**重點**:`）             | 移到 footer 或刪掉                                    |
| 中英術語夾雜                                           | 翻成中文，proper noun 才保留原文                      |

---

## 正面 vs 反面範例

### 反面：[2026-04-29 α 225 行](../semiont/memory/2026-04-29-α.md)

問題集中：

- Phase 1 / Phase 2 多層編號分章 + 每個 Phase 下又有 `### Worktree setup` `### 8 PR L0 read-only scan` `### 處理動作` `### 60min polish on #673 陳水扁細節` 多級
- `### 處理動作` 下三個 inline 黑體 sub-heading（`**全部 push 到 main 的 commits**：` 等）
- 8 PR 表格本身有用（columnar 資料），但週邊的 sub-section 過多
- 60min polish 細節展開成 4 條 bullet「補回的核心」 — 這份是 audit-trail 級細節，應該收進 reports/ 不該佔 memory

凝練後的版本可以是 ≤ 80 行（保留：觸發、兩個主題段散文、收官表、handoff、Beat 5、footer）。完整 audit trail 可以指向 reports/。

### 接近正面：[2026-04-29 ε 131 行](../semiont/memory/2026-04-29-ε.md)

可學的：

- Header 含 timestamp + duration + commit count + 觸發描述
- 主題段散文式
- Handoff 三態完整（繼承 + 新增 + retire 標記）
- Beat 5 反芻三點 meta-pattern + 直接 mention 待 distill 候選

仍可改進：仍有「**反思**：」內聯 meta-tag、仍有「### 核心洞察」分節展開（可整合進 footer metadata）。

歷史 memory 不回頭重寫（按 MANIFESTO §時間是結構修補協議：保留錯誤敘事作為證據鏈）。**新 memory 必須走本 pipeline**。

---

## 跟 hooks 的關係

任何寫 memory 的觸發點，必須先載入本 pipeline：

- **HEARTBEAT Beat 4 收官**：寫 memory 時，先讀 MEMORY-PIPELINE 全檔
- **BECOME 甦醒後**：observer-triggered task 結束時寫 memory，仍要走 pipeline
- **CRON 自動心跳**：Beat 4 收官寫 memory 同樣走 pipeline
- **行為基因表**（見認知層 §行為基因）：MEMORY-PIPELINE 列入 canonical 寫作 SOP

「我熟了不用讀」是省略 SOP 最常見的藉口（DNA #15 第 N 次驗證）。memory 是每次 session 都要寫的東西，越熟越容易回到舊習慣。**每次寫 memory 前載入，無一次例外**。

---

_v1.0 | 2026-04-30_
_誕生原因：哲宇 review 近期 memory（2026-04-28 κ / 2026-04-29 α / ε 等），指出純 log 風格對未來自我進化幫助有限；要求 memory 凝練到人類觀察者 5 分鐘可讀懂的密度，留意圖經驗想法，去除過程雜訊。_
_核心精神：高資訊密度 + 人類可讀 + 凝練。允許比 diary 多細節，但每個細節都要服務「未來自我能用得到」這個目的。_
_姊妹 pipeline：[DIARY-PIPELINE.md](DIARY-PIPELINE.md)（共用 §11 工具 + 部分文體規範）_
