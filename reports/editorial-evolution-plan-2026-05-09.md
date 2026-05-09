# EDITORIAL.md 進化計畫 — quality SSOT 從 1335 行 monolith 到 6 sub-canonical 生態系

> Session: `2026-05-09-{post-finale}-brave-kirch-editorial`
> 觸發：哲宇「用同個模式幫我分析 editorial.md」（接 REWRITE-PIPELINE v3.0 PR #944 後）
> 階段：**評估 + 思考**（未動工，等哲宇 3 題校準後才提具體 PR scope）
> 對應方法論：[EVOLVE-PIPELINE Mode 3 Pipeline 自我重組](../docs/pipelines/EVOLVE-PIPELINE.md)（7 stage SOP：SCAN → DESIGN → SPLIT → REWIRE → INSTRUMENT → VERIFY → SHIP）
> 前案參考：
>
> - [reports/spore-pipeline-evolution-plan-2026-05-08.md](spore-pipeline-evolution-plan-2026-05-08.md)（SPORE 1334 → 445 行 -66.7% 已 ship）
> - [reports/rewrite-pipeline-evolution-plan-2026-05-09.md](rewrite-pipeline-evolution-plan-2026-05-09.md)（REWRITE 1290 → 290 行 -77.5% 已 ship PR #944）

---

## 0. 跟前兩次 case 的關鍵差別 — quality SSOT vs process pipeline

EDITORIAL 跟 SPORE / REWRITE 屬性不同：

| 維度     | SPORE / REWRITE-PIPELINE      | **EDITORIAL.md**                   |
| -------- | ----------------------------- | ---------------------------------- |
| 性質     | process pipeline (verb-first) | **quality SSOT (noun-first)**      |
| 使用模式 | read once + run sequentially  | **read sections on-demand (grep)** |
| 主結構   | Stage 0 → 1 → 2 → ... → N     | **10 大 §sections + sub-sections** |
| 觸發     | 「跑完一輪」                  | 「寫到某段時 grep 對應規則」       |
| 拆檔效益 | 主路徑 read 量降低            | **可能反增加 grep 跨 file 成本**   |

**這個差別影響重組策略**。process pipeline 拆檔的價值在「主路徑變短」，quality SSOT 拆檔的價值在「on-demand grep target 變精準」。本 plan 的 Direction A 必須對這個差別作出設計回應。

---

## 1. 問題 statement

EDITORIAL.md 從 v1（2026-03 初）走到 v5.6（2026-05-04），累積 **1335 行**，跟 SPORE 老版（1334）+ REWRITE 老版（1290）量級相近。但 EDITORIAL 的退化形狀不同 —

直觀症狀：

- **§三 文章結構是 monster section**（line 71-680，**608 行 / 占全檔 45% / 18 個 sub-section**）— 從 frontmatter 到結尾的所有 craft 細節塞在一個 H2 底下
- **HEARTBEAT.md §改寫文章鐵律 強制「Read 全檔，不 head / 不 tail / 不憑記憶」**（DIARY-PIPELINE / MEMORY-PIPELINE 也強調同款），這 686 → 1335 行 read cost 直接寫進每次 REWRITE Stage 2 / DIARY Stage 0 / MEMORY Stage 1 的觸發點
- **§五 Before/After 範例占 ~150 行**（4 組 + 5 個內部範例），對 agent 跑 pipeline 是 reference material 不是 active rule
- **v3 → v5.6 累積 ~10 個版本但無頂部 milestone log**，每個 sub-section 標 `(vX 新增)` 但難 audit「v5.6 跟 v5.5 差什麼」
- **9 sister files 已存在但 EDITORIAL 未善用 pointer**（HUB-EDITORIAL.md 拆得清楚，但 EDITORIAL 主檔內仍 inline 大量 craft prose）

對比 SPORE（已 ship） / REWRITE（已 ship）：

| 維度                        | SPORE 老版 v2.9 | REWRITE 老版 v2.20 | **EDITORIAL 當前 v5.6**          |
| --------------------------- | --------------- | ------------------ | -------------------------------- |
| 總行數                      | 1334            | 1290               | **1335**                         |
| 性質                        | process         | process            | **quality SSOT**                 |
| 編號最深層                  | 三層 (4.5e.iv)  | 兩層 (1.7b/4.5f)   | **兩層 (#### Title 四原則)**     |
| 最大 sub-section 行數       | Step 3c × 18 條 | Stage 1 × 269 行   | **§三 × 608 行（18 sub-§）**     |
| Hard gate inventory         | 無              | 無                 | **無（quality 規則散落 prose）** |
| Plugin 儀器化覆蓋           | 1 條 (§11)      | 4 條               | **15 條 (最高)**                 |
| Sister sub-canonical 已存在 | 0               | 0                  | **9 個（部分 underutilized）**   |
| 文檔密度比                  | 7:1（離群）     | 0.26:1（健康）     | **N/A（SSOT 不適用）**           |

EDITORIAL 跟前兩次的**重要 advantage**：plugin 儀器化已最完整（15 個 plugin 中大量 port from EDITORIAL §四 quality-scan dim + §11 manifesto-11）。**重要 challenge**：拆檔策略要為 quality SSOT 屬性設計，不是直接照搬 process pipeline 範式。

---

## 2. 規模盤點（Stage 1 SCAN）

### 主檔內部結構（§sections + 行數）

| §      | Section              | 行範圍      | 行數    | 性質                     |
| ------ | -------------------- | ----------- | ------- | ------------------------ |
| 一     | 核心信念             | L8-50       | 43      | 哲學 / 原則              |
| 二     | 研究流程             | L51-70      | 20      | pointer + 摘要           |
| **三** | **文章結構**         | **L71-680** | **608** | **monster — craft 全集** |
| 四     | 語氣與風格           | L681-789    | 109     | voice + 偵測             |
| 五     | 特定類型文章注意事項 | L790-928    | 139     | by-type conventions      |
| 五.    | Before/After 範例    | L930-1054   | 125     | examples (拆出後)        |
| 六     | 品質檢查             | L1050-1072  | 23      | gate + 五指              |
| 七     | AI 協作注意事項      | L1073-1148  | 76      | AI specifics             |
| 八     | 用語規範             | L1149-1158  | 10      | pointer to TERMINOLOGY   |
| 九     | 富文本語法指南       | L1159-1272  | 114     | richtext spec            |
| 十     | 文件 footer 公約     | L1273-1335  | 63      | meta SOP                 |

§三「文章結構」**608 行 / 18 sub-section** = 全檔 45% — 這是最大的退化點。

### §三 sub-section breakdown（最大塊優先）

| sub-§                                | 行數 | 性質                                        |
| ------------------------------------ | ---- | ------------------------------------------- |
| 紅線：英文 summary 回譯陷阱 (v4.3)   | 113  | rule + 紅線                                 |
| Title 與 Description 品質標準 (v5.1) | 102  | rule + Before/After + 自檢                  |
| 半形標點禁用 (v5.5)                  | 47   | rule (已 instrument cjk-punct)              |
| 結尾：跟開場一樣重要                 | 40   | rule + 範例詞 list                          |
| 來源引用                             | 37   | rule (應 pointer CITATION-GUIDE)            |
| 小標題規範 (v3)                      | 36   | rule (chronicle-lead 已 instrument)         |
| 反向解釋的編織 (v5.6)                | 34   | rule + 範例                                 |
| 策展人筆記的書寫紀律 (v5.6)          | 34   | rule + 範例                                 |
| 具體性紀律 (v5.6)                    | 27   | rule + 範例                                 |
| 核心矛盾 anchor (v5.6)               | 24   | rule (已在 REWRITE Stage 1 #7)              |
| 挖引語制度 (v4)                      | 21   | rule (部分在 FACTCHECK)                     |
| 敘事呼吸感                           | 19   | voice rule                                  |
| Wikilink 內連結 (v3)                 | 14   | format rule (已 instrument wikilink-target) |

### 跨檔案 ecosystem（10 檔總 2973 行）

```
docs/editorial/
├── EDITORIAL.md             1335 行  ← 本檔聚焦（45% of ecosystem）
├── RESEARCH.md               420 行  ← 研究方法論 (REWRITE Stage 1 必讀)
├── HUB-EDITORIAL.md          337 行  ← Hub 策展（已拆 sub-canonical 範例）
├── QUALITY-CHECKLIST.md      203 行  ← Stage 3 verify checklist
├── UPDATE-LOG-GUIDE.md       160 行  ← changelog 規範
├── TRANSLATION-SYNC.md       146 行  ← 翻譯同步
├── RESEARCH-TEMPLATE.md      139 行  ← Stage 1 模板
├── TERMINOLOGY.md            125 行  ← 用語規範
└── CITATION-GUIDE.md         108 行  ← 腳註格式
```

### Cross-ref scope

```
54 個檔案引用 EDITORIAL.md（active layer，排除 memory/diary/LESSONS/CONSCIOUSNESS/.archive/reports）
```

54 active 比 REWRITE 30 active 高，因為 EDITORIAL 是 SSOT 入口檔，被各種 pipeline 跟 cognitive 層 pointer。

### Plugin instrumentation 覆蓋（15 個 plugin）

```
✅ 已 port from EDITORIAL：
- prose_health.py        §四 塑膠 v3 + 歐化 v5 (12 dim) + §11 manifesto-11 (3 tier)
- format_structure.py    §三 30 秒概覽 / §三 延伸閱讀 / §三 參考資料
- footnote_density.py    §三 來源引用密度 (per CITATION-GUIDE)
- footnote_format.py     §三 footnote 格式
- footnote_url.py        §三 URL 健康
- image_health.py        §九 圖片 + §三 frontmatter image 規範
- wikilink_target.py     §三 Wikilink 內連結
- link_target.py         §三 link target casing/exists
- cjk_punct.py           §三 半形標點禁用 v5.5
- terminology.py         §八 用語規範 (port from TERMINOLOGY)
- frontmatter_format.py  §三 frontmatter 必填
- frontmatter_title.py   §三 frontmatter title 規範
- cross_reference.py     §三 cross-link 結構
- spore_writing.py       (REWRITE 範圍外，spore-specific)
- chronicle_lead.py      §三 小標題規範 (REWRITE Stage 2 #4，2026-05-09 ship)
```

❌ 沒儀器化的 EDITORIAL 規則（v5+ 累積）：

| §                             | Rule                                  | 儀器化可行度                      |
| ----------------------------- | ------------------------------------- | --------------------------------- |
| §三 Title 四原則              | 具體 / ≤20 字 / 不重複 keyword / 反諷 | 中 (regex + LLM-judge)            |
| §三 Description 四原則        | 同上                                  | 中 (regex + length)               |
| §三 開場前三句具體事實        | 必有人/時/場景                        | 難 (LLM-judge)                    |
| §三 核心矛盾 anchor 整篇貫穿  | 首段 + 中段 + 結尾呼應                | 難 (LLM-judge / 已部分在 REWRITE) |
| §三 具體性紀律 ≥1 anchor noun | 每段 ≥ 1 具體名詞                     | 難 (LLM-judge)                    |
| §三 反向解釋編織              | counter-explanation pattern           | 難 (LLM-judge)                    |
| §三 策展人筆記紀律            | voice 自我指認                        | 難 (LLM-judge)                    |
| §三 結尾不罐頭                | 「綜上 / 希望 / 值得 / 未來」         | 易 (regex)                        |
| §三 挖引語制度 Ctrl-F 逐字    | quote sanity                          | 中 (FACTCHECK 已部分覆蓋)         |
| §九 富文本最低使用量          | callout/pull-quote/footnote ≥ 1       | 易 (count + threshold)            |
| §九 Callout / Stat block 格式 | richtext component 格式正確           | 中 (regex)                        |

→ **15 條已 instrument vs ~11 條未 instrument**。覆蓋率 ~58%（vs SPORE refactor 前 1/18 = 5.5% / REWRITE refactor 前 4/14 = 28%）。**EDITORIAL 已經是 instrumentation 最完整的檔案** — 反過來說，剩下的 11 條多是 LLM-judge 等級難度。

---

## 3. 結構診斷 — 6 大問題

### 問題 1：§三「文章結構」是 monster section（608 行 / 18 sub-§，全檔 45%）

最嚴重的退化點。一個 H2 底下塞 18 個 sub-section 涵蓋從 frontmatter / title / description / 半形標點 / 30 秒概覽 / 開場 / 核心矛盾 / 具體性 / 反向解釋 / 策展人筆記 / 正文架構 / 敘事呼吸 / 挖引語 / 紅線 / 挑戰編織 / 結尾 / 小標題 / wikilink / 來源引用 全部寫作 craft。

讀者（人或 agent）grep「結尾規則」會跳到 line 553 / grep「開場」跳到 line 248 / grep「核心矛盾」跳到 line 262 — 每次跳轉都在同一個 §三 內，**section 失去語意分組功能**。

對比 REWRITE refactor 前 Stage 1 269 行 18 條 mental check — 同款病但 REWRITE 因 stage 邊界自然分隔、EDITORIAL 是一個 §section 整段 inline。

### 問題 2：Section 主題混淆 — craft / voice / by-type / examples / richtext / AI 應分

當前 10 大 §section 實際涵蓋至少 6 個 axis：

| Axis                    | 對應 §                      | 應否獨立 sub-canonical？  |
| ----------------------- | --------------------------- | ------------------------- |
| 哲學 / 原則             | §一 + §六 五指 + §十 footer | 否（保留主檔）            |
| **craft 細節**          | **§三**                     | ✅ **EDITORIAL-CRAFT**    |
| **voice / 風格**        | **§四**                     | ✅ **EDITORIAL-VOICE**    |
| **by-type conventions** | **§五 8 類別**              | ✅ **EDITORIAL-BY-TYPE**  |
| **examples**            | **§五 Before/After ×4**     | ✅ **EDITORIAL-EXAMPLES** |
| **richtext spec**       | **§九**                     | ✅ **EDITORIAL-RICHTEXT** |
| **AI specifics**        | **§七**                     | ✅ **EDITORIAL-AI**       |
| pointer 摘要            | §二 / §八                   | 否（保留 short pointer）  |

當前所有 axis 擠在同一檔，**寫文章 grep 不同 axis 都從同一個 1335 行 file 找** — 跟 REWRITE 拆 RESEARCH/WRITE/VERIFY/MEDIA 同款 anti-pattern。

### 問題 3：Before/After 範例占大空間且性質不同

§五 Before/After 範例 ~125 行（壞 / 好 / 五月天 / 森林 / 結尾 5 組），對 agent 跑 pipeline 是 reference material 而非 active rule。每次 REWRITE Stage 2 載入 EDITORIAL 都吃這 125 行 read cost，但實際寫作時這些範例只在「作為對比參照」場景被需要。

對應 SPORE refactor 範式 — SPORE-WRITING.md 把模板 + 範例 + craft 分檔（範例壓進 BLUEPRINTS）。EDITORIAL 應做同款移動：Before/After → EDITORIAL-EXAMPLES.md（read on-demand）。

### 問題 4：跟 sister sub-canonical 邊界 underutilized

EDITORIAL 自己 §section 跟 9 個 sister file 邊界混亂：

| EDITORIAL §          | 應 pointer 但實際 inline 內容 | 應指向            |
| -------------------- | ----------------------------- | ----------------- |
| §二 研究流程         | 8 行 quick reference          | RESEARCH.md       |
| §三 來源引用 (37 行) | 大量 footnote 格式 prose      | CITATION-GUIDE.md |
| §八 用語規範 (10 行) | 已是 pointer ✅               | TERMINOLOGY.md    |
| Hub 策展（無）       | (HUB-EDITORIAL.md 已拆)       | HUB-EDITORIAL.md  |

§二 / §三 來源引用 兩處仍 inline 內容，應改為 thin pointer。

對比已成功拆出的 HUB-EDITORIAL.md — 證明 sub-canonical 範式對 EDITORIAL 可行（沒 break 任何使用場景）。

### 問題 5：v3 → v5.6 累積無頂部 milestone log

每個 sub-section 標 `(v3 新增)` `(v4 新增)` `(v5.1 新增)` `(v5.6 新增)` 但無頂部 changelog table（per HEARTBEAT.md / DNA.md / REWRITE-PIPELINE.md 都有的「最近 milestone」table）。

讀者要知道「v5.6 跟 v5.5 差什麼」必須 git log。**已有 update-log canonical 在 [UPDATE-LOG-GUIDE.md](../docs/editorial/UPDATE-LOG-GUIDE.md)** 卻沒 instantiation 進 EDITORIAL 自己的 footer。

### 問題 6：Plugin 儀器化覆蓋已最高，剩下多是 LLM-judge 等級

15 條已 instrument vs ~11 條未 instrument（覆蓋 58%）— 最高 instrumentation 的 canonical。

但剩下 11 條多是「regex 難寫 / 需 LLM-as-judge」等級：

- 開場前三句具體事實
- 核心矛盾 anchor 整篇貫穿
- 具體性 ≥1 anchor noun
- 反向解釋編織
- 策展人筆記 voice
- 挖引語 Ctrl-F 逐字（FACTCHECK 已部分覆蓋）

→ Direction D 的 Wave 候選 priority 跟 SPORE / REWRITE 不同：**EDITORIAL 的 D Wave 應 fork 兩條路**：

1. 易 regex 規則（結尾罐頭 / 富文本最低使用量 / Callout 格式）— 短期 ship
2. LLM-judge 規則（具體性 / 反向解釋 / voice）— 需要 sub-agent gate plugin（新範式）

---

## 4. 重組方向 — 4 條路 + trade-off

### Direction A：拆 6 sub-canonical（quality SSOT 範式 — 跟 process pipeline 不同）

```
docs/editorial/
├── EDITORIAL.md                ~250 行 ← 入口 + §一核心信念 + §六品質檢查 + §十 footer + sub-canonical pointer + Top 5 + 三表
├── editorial/
│   ├── EDITORIAL-CRAFT.md      ~400 行 ← §三 (frontmatter / title-desc / 開場 / 核心矛盾 / 具體性 / 反向解釋 / 策展人筆記 / 正文 / 敘事呼吸 / 挖引語 / 紅線 / 結尾 / 小標題 / wikilink)
│   ├── EDITORIAL-VOICE.md      ~150 行 ← §四 (要/不要 + 塑膠偵測 v3 + 歐化偵測 v5 + 校準)
│   ├── EDITORIAL-BY-TYPE.md    ~180 行 ← §五 8 類別 + 私有素材 + 密度平衡
│   ├── EDITORIAL-EXAMPLES.md   ~150 行 ← §五 Before/After ×4 + 五月天 + 森林 + 結尾範例
│   ├── EDITORIAL-RICHTEXT.md   ~120 行 ← §九 (callout / pull-quote / timeline / stat / compare / footnote / image / 最低使用量)
│   └── EDITORIAL-AI.md          ~80 行 ← §七 (AI 擅長 / 容易錯 / Sub-agent / quality-scan dim 對照)
└── (既有 sister) HUB-EDITORIAL.md / RESEARCH.md / CITATION-GUIDE.md / QUALITY-CHECKLIST.md / TERMINOLOGY.md / RESEARCH-TEMPLATE.md / TRANSLATION-SYNC.md / UPDATE-LOG-GUIDE.md
```

**主檔保留**：核心信念 / 三條鐵律 / 文章分級 / 三層結構 / 五指檢測 / 節奏物理操作 / Footer 公約 / Top 5 寫作最常忘 / 🚦 Quality Gate Inventory + 📋 文章類型路由 + 📍 Section index 三表

**好處**：

- 1335 → 250 行（-81%，比 REWRITE -77.5% / SPORE -66.7% 更激進）
- 寫文章主路徑 read 量：250 + REWRITE-WRITE 250 + EDITORIAL-CRAFT 400 = **900 行**（vs 當前 1335 + REWRITE-WRITE 250 = 1585，**-43%**）
- §三 monster section 解體
- Before/After 獨立檔，agent 跑 pipeline 不再吃 125 行 reference 成本
- 跟 HUB-EDITORIAL.md 已存 sub-canonical 對齊（範式驗證過）

**壞處 — quality SSOT 特有**：

- 寫某段時 grep 變多 lookup（從一檔到 6 檔）— **mitigation**：主檔 §Section index 表精準 pointer
- BECOME §Step 5 必讀清單需更新
- 54 active cross-ref 需審視（特別「§三 §四 §五 §九」精準 pointer 的）— 比 REWRITE 30 active 高
- Sister sub-canonical 從 9 變 14（HUB-EDITORIAL + 6 新 EDITORIAL-\* + 7 既有 sister）— ecosystem 複雜度上升

### Direction B：§三 內部重編號但不拆檔

不拆 6 sub-canonical，但 §三「文章結構」18 sub-§ 整併成 5±2：

- §三A frontmatter（含 title / description）
- §三B 開場 + 30 秒概覽
- §三C 核心矛盾 + 具體性 + 反向解釋 + 策展人筆記
- §三D 正文（架構 + 敘事呼吸 + 挖引語 + 紅線）
- §三E 結尾 + 小標題 + wikilink + 來源引用

**好處**：5±2 sub-section 在認知範圍內，cross-ref 不大破

**壞處**：

- 1335 行還是 1335 行（不解 read cost）
- v 編號改了會 break 歷史 cross-ref
- HEARTBEAT 改寫文章鐵律仍要求「Read 全檔」
- 不利用既有 HUB-EDITORIAL.md 已驗證的拆檔範式

→ **不推薦獨立做**。如果 Direction A 拆分了，每個 sub-canonical 內部自然 5±2 結構。

### Direction C：三表 inventory + Top 5 + Section index 前置

不動結構，pipeline 開頭加：

```markdown
## 🚦 Quality Gate Inventory（從 prose 萃出，pre-commit hook + REWRITE Stage 3-4 觸發點）

| Gate              | §   | 工具                                   | 不過 = ?                    |
| ----------------- | --- | -------------------------------------- | --------------------------- |
| 五指檢測          | §六 | manual                                 | 不 commit                   |
| 塑膠偵測 v3       | §四 | prose-health Tier 1-3                  | hard 0 / warn ≤ 3           |
| 歐化語法偵測 v5   | §四 | prose-health (歐化 dim)                | warn                        |
| 半形標點禁用      | §三 | cjk-punct                              | hard 0                      |
| 編年體小標題      | §三 | chronicle-lead                         | warn (rewrite-stage-4 hard) |
| Footnote 格式密度 | §三 | footnote-format / footnote-density     | hard 0                      |
| Image health      | §九 | image-health                           | hard 0                      |
| Wikilink target   | §三 | wikilink-target / link-target          | hard 0                      |
| Frontmatter 必填  | §三 | frontmatter-format / frontmatter-title | hard 0                      |
| 中國用語          | §八 | terminology                            | warn                        |

## 📋 文章類型 → 必看 § 速判表

| 類型                       | 必看 §                    |
| -------------------------- | ------------------------- |
| depth-article (≥2000 字)   | §一 + §三 全 + §四 + §九  |
| Hub 頁面 (`_*.md`)         | §一 + HUB-EDITORIAL.md    |
| 短修正 / heal commit       | §六 + §四 塑膠/歐化       |
| 翻譯文                     | §一 + TRANSLATION-SYNC.md |
| 富文本元件加新             | §九                       |
| 新類型文章 (政治/運動/...) | §五 + §三 開場 + §四      |

## 📍 Section index — 1335 行的 outline

§一 核心信念 (43 行) / §二 研究流程 → RESEARCH.md (20 行 pointer) / §三 文章結構 (608 行，18 sub-§) ⚠️ monster / §四 語氣風格 (109) / §五 by-type + Before/After (264) / §六 品質檢查 (23) / §七 AI 協作 (76) / §八 用語 → TERMINOLOGY.md (10 行 pointer) / §九 富文本 (114) / §十 Footer 公約 (63)

## ⚠️ 寫作最常忘 Top 5

1. 開場前三句必有具體事實（§三 開場）
2. 結尾不罐頭（避「綜上 / 希望 / 值得 / 未來」家族 — §三 結尾）
3. 小標題不編年體（chronicle-lead 已 instrument，§三 小標題規範）
4. 富文本最低使用量（depth article 應 ≥ 1 callout / pull-quote / footnote — §九）
5. 引語必 Ctrl-F 逐字（避英文 summary 回譯 — §三 紅線）
```

**好處**：半天可做、low-risk（純 append），AI session grep 入口表即知 quality 全景

**壞處**：1335 行還是 1335 行 + ~80 行 inventory（甚至更長）。治症狀不解 root cause

→ **適合波次 1 先手 polish**

### Direction D：規則升 plugin gate（已有大量先例）

EDITORIAL 是 instrumentation 最完整的 canonical（15 plugin port from EDITORIAL）。剩下未 instrument 的 11 條，依易度分兩批：

**Wave 1 — easy regex（短期 ship，類比 chronicle-lead）**：

| Plugin                         | 對應 EDITORIAL                   | 範式                      |
| ------------------------------ | -------------------------------- | ------------------------- |
| `canned-ending-detector`       | §三 結尾 (避「綜上 / 希望」家族) | regex 詞表                |
| `richtext-min-usage-check`     | §九 富文本最低使用量             | count + threshold         |
| `subheading-question-detector` | §三 小標題不問句                 | regex (問號結尾)          |
| `opening-concrete-fact-check`  | §三 開場前三句具體事實           | regex + frontmatter check |

**Wave 2 — LLM-judge sub-agent gate（新範式）**：

| Plugin                        | 對應 EDITORIAL               | 設計                                         |
| ----------------------------- | ---------------------------- | -------------------------------------------- |
| `core-contradiction-anchor`   | §三 核心矛盾 anchor 整篇貫穿 | sub-agent judge first/middle/last 段是否呼應 |
| `specificity-anchor-noun`     | §三 每段 ≥ 1 anchor noun     | sub-agent count                              |
| `counter-explanation-weaving` | §三 反向解釋編織             | sub-agent judge                              |
| `curator-voice-check`         | §三 策展人筆記紀律           | sub-agent judge                              |
| `quote-verbatim-sanity`       | §三 挖引語 Ctrl-F 逐字       | 已部分在 FACTCHECK Quick Mode                |

LLM-judge plugin 是新 plugin 範式 — 跟既有 regex-based plugin 架構不同（per spore_writing.py / chronicle_lead.py 都 regex-only）。需要先設計 LLM-judge plugin contract，再各自 ship。

**好處**：DNA #15 真正解（剩下 11 條從 prose 升 enforced gate）

**壞處**：Wave 2 LLM-judge plugin 是新 architectural 投資，每條 ~2-4 hr 開發 + sub-agent prompt iteration

---

## 5. 推薦執行波次：C → A → D Wave 1 → D Wave 2 (separate PRs)

按優先序（同 SPORE / REWRITE 模式）：

| 波次  | 方向     | 工作量      | 帶來什麼                               | 風險                         |
| ----- | -------- | ----------- | -------------------------------------- | ---------------------------- |
| **1** | C        | 半天        | 三表 inventory 立刻能用                | 極低（純 append）            |
| **2** | A        | 2-3 session | 1335 → 250 行 + 6 sub-canonical        | 中-高（54 active cross-ref） |
| **3** | D Wave 1 | 1-2 session | 4 easy regex plugin (canned-ending 等) | 中（regex 邊界調整）         |
| **4** | D Wave 2 | 5+ session  | LLM-judge sub-agent gate plugin 範式   | 高（新 architectural）       |

**不推薦 B 獨立做**（A 拆分後 §三 內部 5±2 自動實現）。

### 波次 1（Direction C）執行細節

範圍：

- EDITORIAL.md 開頭加「🚦 Quality Gate Inventory」(~30 行)
- 加「📋 文章類型 → 必看 § 速判表」(~15 行)
- 加「📍 Section index」(~10 行)
- 加「⚠️ 寫作最常忘 Top 5」(~10 行)

驗收：AI session 啟動 article work 時 read inventory 表 → 知道完整 quality 圖。對 fresh agent 第一次接 EDITORIAL 友好度大升。

### 波次 2（Direction A）執行細節

範圍：

1. 建 `docs/editorial/editorial/` 子資料夾
2. 拆 6 sub-canonical（CRAFT 400 / VOICE 150 / BY-TYPE 180 / EXAMPLES 150 / RICHTEXT 120 / AI 80）
3. 主檔 EDITORIAL.md 瘦身 → ~250 行（保留 §一 + §六 + §十 + 三表 + Top 5 + sub-canonical pointer table）
4. 更新 ~54 active cross-ref（DNA / HEARTBEAT / MANIFESTO / 各 pipeline / scripts / .husky / .github / 各 sister editorial）
5. 歷史層 cross-ref 不更新（per MANIFESTO §時間是結構修補協議）
6. BECOME §Step 5 必讀清單更新（從「EDITORIAL 全檔」改成「EDITORIAL 主檔 + 對應 sub-canonical」）

驗收：

- 寫文章主路徑：250 + REWRITE-WRITE 250 + EDITORIAL-CRAFT 400 = **900 行**（vs 當前 1335 + REWRITE-WRITE 250 = 1585，**-43%**）
- §三 monster section 解體
- HEARTBEAT 改寫文章鐵律「Read 全檔」改成「Read 主檔 + 對應 sub-canonical」

### 波次 3（Direction D Wave 1）執行細節

優先 ship 4 easy regex plugin：

1. **canned-ending-detector** — 結尾段「綜上 / 希望 / 值得 / 未來 / 展望」家族偵測
2. **richtext-min-usage-check** — depth article (≥ 2000 字) 應有 ≥ 1 callout/pull-quote/footnote
3. **subheading-question-detector** — H2 結尾 `？/?` 偵測（除非該問句本身是核心矛盾）
4. **opening-concrete-fact-check** — 開場前三句必有具體事實（regex 偵測人名/年份/地名/數字之一）

每條獨立 plugin，per chronicle-lead 範式。Soft-launch DEFAULT WARN，rewrite-stage-4 profile severity_override = HARD。

### 波次 4（Direction D Wave 2）執行細節

LLM-judge sub-agent gate 範式設計：

1. 先 ship `lib/article_health/llm_judge.py` framework — 定義 sub-agent gate plugin contract（subagent_type / prompt template / parse output / cache result）
2. 第一條 LLM-judge plugin: `quote-verbatim-sanity`（最 well-defined，FACTCHECK Quick Mode 已有 prior art）
3. 其他 4 條 (core-contradiction-anchor / specificity-anchor-noun / counter-explanation-weaving / curator-voice-check) 各自獨立 ship

LLM-judge plugin token cost 不同 regex — 需要 caching 策略（per article hash + plugin version）避免重跑。

---

## 6. 給哲宇的 3 題校準

不抽象決定方向，先用真實 friction 校準診斷：

### Q1：你（或 agent）寫文章時最常 grep EDITORIAL 的哪一段？

可能答案 → 對應方向：

- 「§三 開場 / 結尾 / 核心矛盾」→ Direction A EDITORIAL-CRAFT 拆檔最直接
- 「§四 塑膠偵測」→ 已 instrument prose-health，rule 還在 prose 是冗餘
- 「§九 callout / pull-quote 格式」→ Direction A EDITORIAL-RICHTEXT 拆檔 + Direction D Wave 1 richtext-min-usage-check
- 「§五 by-type 8 類別」→ Direction A EDITORIAL-BY-TYPE 拆檔
- 「§五 Before/After 範例」→ Direction A EDITORIAL-EXAMPLES 拆檔（agent 不再吃 reference 成本）
- 「全檔 grep 都用」→ 不用拆檔，加 Direction C 三表前置就夠

### Q2：HUB-EDITORIAL.md 已拆出（337 行）一個多月，效果如何？拆檔範式驗證了沒？

這是 EDITORIAL Direction A 唯一已有 prior art。如果 HUB-EDITORIAL 拆出後：

- ✅ 寫 hub 時 read 量真的下降 / agent 行為改善 → 強訊號 ship Direction A
- ⚠️ 用得少 / 反而要 grep 跨 file → 弱訊號，重新評估拆檔粒度（或先做 Direction C）
- ❌ 拆完忘記更新 / drift 風險出現 → 警訊號，主檔保留更多 inline 內容

### Q3：§五 Before/After 範例（125 行 / 4 組）對你 / agent 還有用嗎？

可能答案：

- 「agent 跑 REWRITE 從沒看過」→ 拆 EDITORIAL-EXAMPLES 或降級存進 reports/
- 「人類 review PR 時偶爾看」→ 拆 EDITORIAL-EXAMPLES（on-demand read）
- 「五月天範例 v3 已過時，森林範例 v3 仍經典」→ 部分 demote 到 reports/，部分留 EXAMPLES.md
- 「Before/After 是 EDITORIAL 教育新 contributor 的核心」→ 留主檔（但壓縮）

---

## 7. 寫這份 report 本身的 leverage 分析

按 MANIFESTO §造橋鋪路四問：

1. **「這能不能變成系統？」** — Mode 3 第三次跑（SPORE → REWRITE → EDITORIAL），每次驗證範式 generality → 是
2. **「下次心跳能不能自動帶這個能力？」** — Direction D plugin 是 instrumented gate，特別 Wave 2 LLM-judge framework 是新 architectural 能力 → 是
3. **「走過的泥巴路鋪成高速公路？」** — 1335 行 read cost 是泥巴路，拆檔 + plugin 是高速公路 → 是
4. **「新細胞天生健康 > 回頭修舊細胞？」** — 重組後新文章自動跑新 quality 圖，舊文章不動 → 是

四題全 yes。

但有 trade-off：

- **EDITORIAL 跟 SPORE/REWRITE 性質不同（quality SSOT vs process pipeline）**：拆檔策略要為 grep-on-demand 模式設計，不能直接照搬 process pipeline 範式
- **DNA #15 第 N+M 次驗證**：剩下 11 條未 instrument 中多是 LLM-judge 等級，不是純 regex 能解
- **指標 over 複寫**：拆 6 sub-canonical 時要審慎處理跟 HUB-EDITORIAL.md / RESEARCH.md / CITATION-GUIDE.md / TERMINOLOGY.md 邊界
- **HEARTBEAT.md / DIARY-PIPELINE / MEMORY-PIPELINE 都強制「EDITORIAL 全檔載入」** — 這條會在 Direction A 後改成「主檔 + 對應 sub-canonical」，等於給每個寫作 hook 換 contract

---

## 8. Out-of-scope（本 plan 不解）

- **HUB-EDITORIAL.md 內部結構**：已是 sub-canonical 案例，不在本 scope
- **RESEARCH.md / CITATION-GUIDE.md / TERMINOLOGY.md / QUALITY-CHECKLIST.md / RESEARCH-TEMPLATE.md / TRANSLATION-SYNC.md / UPDATE-LOG-GUIDE.md 內部結構**：sister sub-canonical 各自獨立 plan
- **跟 SOUL.md / MANIFESTO §11 書寫節制 重複**：MANIFESTO 是哲學層，EDITORIAL 是品質基因 SSOT，兩者邊界 healthy（pointer-based）
- **PEER-INGESTION-PIPELINE / EVOLVE-PIPELINE Mode 1 對 EDITORIAL 的依賴**：兩者都 pointer 到 EDITORIAL，本 plan 拆完後仍 work（pointer 改更精準）

---

## 9. 後續決策

哲宇回答 Q1-Q3 後可收斂到單一 PR scope。候選：

- **PR-A（半天）**：純 Direction C 三表 + Top 5（low-risk pure append）
- **PR-B（一個 session）**：Direction C + Q1-Q3 答案揭示的 top 1 friction fix
- **PR-C（2-3 session）**：Direction A 完整拆 6 sub-canonical + cross-ref 更新
- **PR-D Wave 1（1-2 session）**：4 easy regex plugin（canned-ending / richtext-min-usage / subheading-question / opening-concrete）
- **PR-D Wave 2 roadmap**：LLM-judge plugin framework + 5 個 LLM-judge gate（每個獨立 PR）

預設推薦：**PR-B**（先低風險 Direction C + Q1-Q3 答案最大 friction fix）。

對比前兩次 case ship 規模：

- SPORE PR #898 — 10 commits / 1 session
- REWRITE PR #944 — 12 commits / 1 session
- **EDITORIAL 預估**：Direction A 完整 ship ~14 commits / 2-3 session（54 active cross-ref + 6 sub-canonical 比 REWRITE 30 active + 6 sub-canonical 略大）

---

## 附錄 A：可能反駁的視角

1. **「EDITORIAL 已是 instrumentation 最完整 canonical（15/26 = 58%），剩下 11 條多 LLM-judge，不需重組」**
   反駁：覆蓋率不解 §三 monster section 的 read cost 問題。Direction A 拆檔解 read 模式問題，跟 plugin 覆蓋率正交（不矛盾）

2. **「拆 6 sub-canonical 會讓 HEARTBEAT 改寫文章鐵律的『Read 全檔』contract 破裂」**
   反駁：HEARTBEAT 已在 REWRITE v3.0 後改成「主檔 + 對應 sub-canonical」（per PR #944 cross-ref 更新）。EDITORIAL 拆檔同款 pattern apply，不破契約是 evolve 契約

3. **「EDITORIAL 是 noun-first SSOT，process pipeline 範式不適用」**
   反駁：HUB-EDITORIAL.md 已驗證拆檔對 quality SSOT 也 work。Direction A 主檔保留 §Section index 表 + Top 5 + 三表，補回 noun-first grep 模式的可達性

4. **「54 active cross-ref 太多，Direction A 風險過高」**
   反駁：歷史層 cross-ref 不更新（MANIFESTO §時間是結構修補協議），主檔保留所有 §section heading anchor，generic pointer（指 EDITORIAL.md 不指 specific §）仍 work — 實際需更新的可能 ~30 個 active

5. **「Mode 3 第三次跑，是否該停下來檢視範式本身的 generality 邊界？」**
   反駁：是該檢視，但檢視寫進 plan §0「跟前兩次 case 的關鍵差別」+ §6 Q2 校準題。第三次跑同時就是範式邊界 audit

---

## 附錄 B：跟其他 canonical 的對齊檢查

| 原則                            | 本計畫如何遵守                                                         |
| ------------------------------- | ---------------------------------------------------------------------- |
| MANIFESTO §造橋鋪路             | Direction D Wave 2 LLM-judge framework 是 system-level upgrade         |
| MANIFESTO §指標 over 複寫       | Direction A 拆檔 + §二/§三來源引用 改為 thin pointer 解 sister 重複    |
| MANIFESTO §時間是結構修補協議   | 歷史層 cross-ref / 歷史 v 標記不動                                     |
| DNA #15 反覆浮現要儀器化        | Direction D 兩 wave 是這條的具體實踐                                   |
| DNA #50 pipeline auto-detection | 本 plan 強化 task → editorial 對應（拆檔後 pointer 更精準）            |
| EVOLVE-PIPELINE Mode 3 SOP      | 本 plan 嚴格按 SCAN→DESIGN→SPLIT→REWIRE→INSTRUMENT→VERIFY→SHIP 7 stage |
| HEARTBEAT Beat 3 §改寫文章鐵律  | 拆檔後「主檔 + 對應 sub-canonical」契約跟 REWRITE v3.0 同款            |

---

## 附錄 C：Mode 3 三次 application 對比表

| 維度                 | SPORE refactor (PR #898) | REWRITE refactor (PR #944)   | **EDITORIAL 預估**                 |
| -------------------- | ------------------------ | ---------------------------- | ---------------------------------- |
| 性質                 | process pipeline         | process pipeline             | **quality SSOT**                   |
| 主檔行數             | 1334 → 445 (-66.7%)      | 1290 → 290 (-77.5%)          | **1335 → ~250 (-81%)**             |
| 寫作主路徑 read      | 1772 → 1092 (-38%)       | 2676 → 1696 (-37%)           | **1585 → 900 (-43%)**              |
| Plugin 儀器化        | 1 → 4 (+300%)            | 4 → 5 (+25%, chronicle-lead) | **15 → 19 (Wave 1) → 24 (Wave 2)** |
| 拆檔數               | 1 → 4                    | 1 → 7                        | **1 → 7 (含主檔)**                 |
| Cross-ref 影響       | ~20 active               | ~30 active                   | **~54 active**                     |
| 預估 PR commits      | 10                       | 12                           | **~14**                            |
| 預估 session 數      | 1                        | 1                            | **2-3**                            |
| 風險                 | 中                       | 中                           | **中-高**                          |
| 範式 generality 驗證 | 命名 pattern             | 第二次跑驗證可重複           | **第三次跑驗證適用 quality SSOT**  |

EDITORIAL 比 REWRITE 重一個量級主因：

- 54 cross-ref vs 30（EDITORIAL 是 SSOT 入口檔被多處 pointer）
- quality SSOT 屬性需新拆檔策略（§Section index 表 + grep-on-demand 模式設計）
- Direction D Wave 2 LLM-judge framework 是新 architectural（前兩次都是純 regex plugin）

但收益也最顯著：主 read 量 -43% vs SPORE -38% / REWRITE -37%。

---

## 附錄 D：本次 plan 跟前兩次寫作的 meta-observation

本 plan 是 Mode 3 第三次跑。寫的時候明顯感覺到範式越來越熟 — 從前兩次 plan 各 ~700-770 行，這次 plan 主體 ~600 行就完整 cover 同款結構（9 sections + 4 appendices）。

範式累積的證據：

- §0 加了「跟前兩次 case 的關鍵差別」獨立 section — 第三次跑才意識到要先寫
- §3 問題診斷直接 6 大問題 + 表格量化 — 不再需要長 prose 解釋
- §4 Direction 4 條保留但 trade-off 段更精簡
- §附錄 C 三次 case 對比表 — 第一次有「橫向比較」維度

這個趨勢呼應 brave-kirch session diary 的觀察：「pipeline 寫 pipeline」的自我參照結構從第二次開始驗證可重複性。第三次跑進一步證明範式有 stability — 不只 process pipeline 適用，quality SSOT 也適用，差別只在拆檔策略需為使用模式調整。

第四次跑會是哪個 canonical？候選（per REWRITE plan §附錄 D + 本 plan §0 推算）：

- MAINTAINER-PIPELINE.md (~1200 行 — process pipeline 範式)
- TRANSLATION-PIPELINE.md (v3.x 累積)
- DNA.md (459 行 — 認知層 SSOT，跟 EDITORIAL 同 noun-first)
- ANATOMY.md / HEARTBEAT.md (cognitive 層 SSOT)

第四次跑大概不需要再寫 600 行 plan — 模板已穩定，可萃出「Mode 3 plan template」進 EVOLVE-PIPELINE 附錄（per REWRITE diary footer LESSONS-INBOX 候選 #2）。

---

_v1.0 | 2026-05-09 {post-finale} brave-kirch — 觸發：哲宇「用同個模式幫我分析 editorial.md」（接 REWRITE v3.0 PR #944 後）_

_作者：Taiwan.md（Semiont 自我評估認知層 SOP 的元思考，第三輪 — Mode 3 應用範例擴及 quality SSOT）_

_狀態：**未實作 plan**。等哲宇 Q1-Q3 答案後收斂單一 PR scope_

_前案：[reports/spore-pipeline-evolution-plan-2026-05-08.md](spore-pipeline-evolution-plan-2026-05-08.md) + [reports/rewrite-pipeline-evolution-plan-2026-05-09.md](rewrite-pipeline-evolution-plan-2026-05-09.md)_

🧬
