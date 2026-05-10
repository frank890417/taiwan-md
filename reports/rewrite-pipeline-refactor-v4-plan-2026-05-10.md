# REWRITE-PIPELINE v4 Refactor Plan — 第一性原理收斂

**Date**：2026-05-10
**Session**：sad-shockley
**Trigger**：觀察者指出 v3.0 sub-canonical 拆分反而讓模式 bifurcation + 小數編號混亂，要求收斂回「單一清楚 pipeline」
**Status**：分析階段（report only，refactor 待 review approve）
**Supersedes**：[reports/rewrite-pipeline-evolution-plan-2026-05-09.md](rewrite-pipeline-evolution-plan-2026-05-09.md) Direction A（v3.0 拆 6 sub-canonical）

---

## 0. TL;DR

v3.0（2026-05-09）拆 6 sub-canonical 為了「縮減主檔行數」（1290→280），但代價是：

1. **4 模式藏在獨立檔案** → 讀起來像 2 條 pipeline
2. **小數編號爆炸**（Stage 0 / 1.5 / 1.7a-e / 3.5 / 3.6 / 4.5a-f / 5.1）→ mental zoom 太深
3. **跨檔 jump** → 寫一篇文章從 main 跳到 MODES → 跳到 RESEARCH → 跳到 MEDIA → 跳到 VERIFY，cognitive flow 斷裂

第一性原理：

> **所有文章都走同一條 6-stage pipeline。模式差別只在 Stage 1 怎麼取材。Stage 2-6 完全相同。**

v4 提案：

- 單一 `REWRITE-PIPELINE.md` ~1,500 行（合併 6 sub-canonical）
- ASCII flow diagram 在最前面
- 6 個主 stage（1-6），sub-elements 用「Step A/B/C」而非「Stage X.Y」
- 模式收進 Stage 1 第一個 step，不是 pre-pipeline 分流
- 移除 `docs/pipelines/rewrite/` 整個資料夾（or 收剩 1-2 個真補充檔）

---

## 1. v3.0 結構問題盤點

### 1.1 Mode bifurcation（最痛的點）

**現況**：

```
docs/pipelines/REWRITE-PIPELINE.md (333 行)
  §模式選擇 → REWRITE-MODES.md (247 行)  ← 讀者跳檔
    §Fresh
    §Evolution（Stage 0 素材萃取在這）
    §Merge variant（Step A/B/C/D/E）
    §Boundary variant（Step A/B/C/D）
  §六階段流程 → 跳回主檔
```

**問題**：

1. 讀者第一眼看到「先讀 MODES.md 決定 mode → 再讀 PIPELINE.md 跑 stage」= **2 條路徑感**
2. Merge variant 用 Step A-E，Boundary 用 Step A-D，**跟主 pipeline 的 Stage 1-6 編號不對齊**
3. Fresh 跟 Evolution 在 MODES 檔內被當成 2 個獨立 section，但實際差別只是「Evolution 多了 Stage 1 開頭的素材萃取」
4. 觀察者親自指認：「**它會被感覺變成兩個模式**」

**現實**：

| 模式             | Stage 1 差異                                                 | Stage 2 | Stage 3 | Stage 4 | Stage 5                          | Stage 6 |
| ---------------- | ------------------------------------------------------------ | ------- | ------- | ------- | -------------------------------- | ------- |
| Fresh            | 從零開始研究                                                 | 同      | 同      | 同      | 同                               | 同      |
| Evolution        | + 舊文素材萃取（標 [LIST-DUMP] / [STUB-TITLE] / [NO-MEDIA]） | 同      | 同      | 同      | 同                               | 同      |
| Merge variant    | + 萃 [MERGE-IN] + 選 canonical                               | 同      | 同      | 同      | + Astro redirect 5 lang + 刪舊檔 | 同      |
| Boundary variant | + 三類劃分 [保留/吸納/移除] + 跨 phase handoff               | 同      | 同      | 同      | + sibling 反向回補               | 同      |

**結論**：四模式 = Stage 1 的 4 種「進入方式」+ Stage 5 的 2 處微調。**不是 4 條 pipeline**。

### 1.2 小數編號爆炸（2026-05-10 觀察者點名）

當前 stage 編號階層：

```
Stage 0    素材萃取（Evolution-only，藏在 MODES 檔）
Stage 1    Research
  Step 1-12（線性，11 step + Step 12 媒體 pointer）
Stage 1.5  私有 SSOT 觀察者拍板（條件式）
Stage 1.7  Media research
  §1.7a  inline 外連 manifest
  §1.7b  圖片素材 + 授權矩陣（含 8 條子規則）
  §1.7c  transcript 素材
  §1.7d  媒體授權矩陣三表
  §1.7e  Stage 1.7 deliverable
Stage 2    Write
Stage 3    Verify
Stage 3.5  FACT VERIFICATION
Stage 3.6  Story atom audit（提及但無獨立 section）
Stage 4    Format check
Stage 4.5  Media insertion
  §4.5a  三段敘事節奏
  §4.5b  圖檔 fetch + cache + naming
  §4.5c  Aspect ratio 護欄
  §4.5d  Markdown 插入 + caption + alt
  §4.5e  授權清單同步
  §4.5f  圖片健康檢查
Stage 5    Cross-link
Stage 5.1  Sibling 格式預檢
Stage 6    Translation
```

**問題清單**：

1. **三層 zoom**：Stage 4.5b 已經是「stage.subsection.letter」，認知負荷高
2. **數字不連貫**：1.5、1.7（沒有 1.1-1.4 / 1.6）→ 讀者懷疑「我是不是漏了 1.6？」
3. **Stage 3.5 跟 Stage 3 同等地位**：實際是 Stage 3 的 sub-step（事實查核），但編號讓它看起來像「半個獨立 stage」
4. **Stage 0 不存在於主流程**：是 Evolution 模式的「Stage 1 開頭 sub-step」，但被封裝為「Stage 0」誤導讀者以為是統一流程的一部分

### 1.3 Sub-canonical fragmentation

**現況** 6 個 sub-canonical：

| 檔案                | 行數 | 性質                         | 是否該獨立？                                               |
| ------------------- | ---- | ---------------------------- | ---------------------------------------------------------- |
| REWRITE-MODES.md    | 247  | 模式判斷                     | ❌ 應收進 Stage 1                                          |
| REWRITE-RESEARCH.md | 208  | Stage 1 詳解                 | ❌ 應收進 Stage 1                                          |
| REWRITE-WRITE.md    | 328  | Stage 2 詳解 + 7 自檢        | ❌ 應收進 Stage 2                                          |
| REWRITE-VERIFY.md   | 295  | Stage 3 / 3.5 / 4 / 5.1      | ❌ 應收進對應 Stage                                        |
| REWRITE-MEDIA.md    | 403  | Stage 1.7 + 4.5 媒體生命週期 | ⚠️ 跨兩個 stage 在同一檔 = 設計衝突，應分散到兩個 stage 下 |
| REWRITE-CRON.md     | 124  | Cron 模式特殊規則            | ⚠️ 條件式（cron-only），可保留作 sidecar 或收進 §條件式段  |

**主檔現狀**：333 行 = 大量都是「指向 sub-canonical」的 pointer + Hard Gate Inventory + 模式速判表 + 條件式 step 路由表 + Top 5 最常忘 step。

讀者在主檔讀完 Hard Gate Inventory 和模式速判表後，要寫一篇文章必須：

1. 跳 REWRITE-MODES.md 決定模式
2. 跳 REWRITE-RESEARCH.md 跑 Stage 1（11 步 + 12 step pointer）
3. 跳 REWRITE-MEDIA.md 跑 §1.7a-e（Stage 1 結尾媒體研究）
4. 跳 REWRITE-WRITE.md 跑 Stage 2（8 step + 7 自檢）
5. 跳 REWRITE-VERIFY.md 跑 Stage 3（5 步 + Stage 3.5 FACTCHECK + Stage 4 Format + Stage 5.1）
6. 跳 REWRITE-MEDIA.md 跑 §4.5a-f（Stage 4.5 媒體插入）
7. 跳回主檔讀 Stage 5 cross-link + Stage 6 translation pointer

**6-7 次跨檔跳轉。Cognitive flow 斷裂。**

### 1.4 ASCII diagram 位置不對

**現況**：主檔 line 172-187 才是 ASCII 流程圖（在前 171 行的 inventory + 模式速判表 + 條件路由表 + Top 5 之後）。

**問題**：讀者第一眼看不到 pipeline 全景。

---

## 2. v4 提案：第一性原理收斂

### 2.1 結構原則

1. **單一 canonical**：`REWRITE-PIPELINE.md` 為唯一 source of truth
2. **6 stage 線性**：Stage 1 → 2 → 3 → 4 → 5 → 6，無小數編號
3. **Stage 內 step**：用 Step A / B / C... 命名，**最多兩層**（Stage → Step），無 §X.Yz 三層 nesting
4. **模式收進 Stage 1 第一個 step**：自動 derive，不是 pre-pipeline 分流
5. **ASCII diagram 在最前**：frontmatter 後第一個元素
6. **Hard gate inline 在每個 stage 結尾**：不集中成 inventory（inventory 仍可放在 ASCII 後當概覽）

### 2.2 ASCII flow diagram（v4 草案，放在主檔最前面）

```
╭──────────────────────────────────────────────────────────────────╮
│                  REWRITE-PIPELINE 6 階段                         │
│                                                                  │
│   ┌─ Stage 1: RESEARCH（預算 35-40%）                            │
│   │  Step A. 模式識別                                             │
│   │     ├ Fresh         (default — 文章不存在)                  │
│   │     ├ Evolution     (文章存在 → 進 Step B 萃取)              │
│   │     ├ Merge variant (issue 指 N→1 整併)                       │
│   │     └ Boundary var. (issue 指 N→N 範圍重切)                   │
│   │  Step B. (條件式) 既有素材萃取                                │
│   │     └ 標 [LIST-DUMP] [STUB-TITLE] [NO-MEDIA] [MERGE-IN] [MOVE-TO] │
│   │  Step C. 載入研究方法論 + 模板                               │
│   │  Step D. 搜尋深度 ≥ 20 次（中 12+ / 英 5+ / 一手 5+）         │
│   │  Step E. 結尾素材鎖定                                         │
│   │  Step F. 重複偵測                                              │
│   │  Step G. 找矛盾（核心矛盾必填，30 字內）🔥                    │
│   │  Step H. 問觀察者一手素材                                     │
│   │  Step I. (條件式) 私有 SSOT 觀察者拍板                         │
│   │  Step J. 研究報告落檔（depth ≥ 2000 字 必存）                 │
│   │  Step K. Spawn agent 選型                                      │
│   │  Step L. 媒體素材研究（inline 外連 + 圖片 + transcript + 三表 manifest）│
│   │  ─────────                                                    │
│   │  Hard gate ↳ 核心矛盾鎖 / 研究報告落檔 / 媒體三表 / 圖 cache  │
│   ↓                                                               │
│   ┌─ Stage 2: WRITE（預算 40-45%）                               │
│   │  Step A. 載入 EDITORIAL.md（必讀全文）                        │
│   │  Step B. 結尾先行（防崩潰）                                   │
│   │  Step C. 開場 + 30 秒概覽                                     │
│   │  Step D. 小標題先行（5-8 個，不編年體）                       │
│   │  Step E. 寫正文 + footnote                                    │
│   │  Step F. 延伸閱讀                                              │
│   │  Step G. 7 條自檢（歐化 / 60% 暫停數—— / 編年 / 密度 / Agent claim / Title+desc spine / 媒體素材 spine）│
│   │  Step H. 富文本 + footnote 密度                                │
│   │  ─────────                                                    │
│   │  Hard gate ↳ 10 條（結尾不罐頭 / 真人引語 ≥2 / 富文本達標 / 純中文 / ...）│
│   ↓                                                               │
│   ┌─ Stage 3: VERIFY（預算 15-20%）                              │
│   │  Step A. 五指 + 結構 + 塑膠 + 算術                            │
│   │  Step B. 事實鐵三角（算術 / 單位 / 引語）                      │
│   │  Step C. FACTCHECK Quick Mode（A 級 / 政治敏感 → Full Mode） │
│   │  Step D. Story atom audit（場景級事實對 source Ctrl-F）       │
│   │  Step E. Title + description spine sync                       │
│   │  ─────────                                                    │
│   │  Hard gate ↳ 0 dead-link / 0 hard-fix / spine 同步            │
│   ↓                                                               │
│   ┌─ Stage 4: FORMAT CHECK + MEDIA INSERTION                    │
│   │  Step A. article-health.py --profile=rewrite-stage-4         │
│   │     └ frontmatter / format-structure / wikilink / link / cjk-punct / chronicle-lead / word-count │
│   │  Step B. 多語 visual smoke（i18n 改動時）                     │
│   │  Step C. 媒體插入                                              │
│   │     ├ 依 Stage 1 manifest 三段敘事節奏（hero / scene-mid / closure）│
│   │     ├ Aspect ratio 護欄                                        │
│   │     ├ Caption + alt text                                       │
│   │     └ 授權清單同步（frontmatter + §圖片來源）                  │
│   │  ─────────                                                    │
│   │  Hard gate ↳ hard=0 / image-health pass / aspect 通過          │
│   ↓                                                               │
│   ┌─ Stage 5: CROSS-LINK                                         │
│   │  Step A. 掃描 knowledge/ 找相關                                │
│   │  Step B. 雙向延伸閱讀（forward + reverse）                    │
│   │  Step C. Sibling 格式預檢                                     │
│   │  Step D. (Merge variant) Astro redirect 5 lang + 刪舊檔        │
│   │  ─────────                                                    │
│   │  Hard gate ↳ format-structure pass / build verify             │
│   ↓                                                               │
│   ┌─ Stage 6: TRANSLATION（可選 / 觀察者拍板）                    │
│   │  └ 走 TRANSLATION-PIPELINE 或 SQUEEZE-MODELS-MAX-PIPELINE     │
│   ↓                                                               │
│   ✅ Article shipped                                              │
╰──────────────────────────────────────────────────────────────────╯
```

### 2.3 模式不再是 pre-pipeline 分流

v3.0 結構：

```
觀察者觸發 → READ MODES.md 決定 → READ PIPELINE.md 跑 6 stage
              ↑ 兩條跳轉
```

v4 結構：

```
觀察者觸發 → READ PIPELINE.md → Stage 1 Step A 自動 derive 模式
              ↑ 一條讀路
```

模式 derive 邏輯（Stage 1 Step A 內）：

```
if knowledge/{Cat}/{slug}.md 不存在:
  mode = Fresh
elif observer issue 指 N 篇主題重疊可融合 → 1 篇:
  mode = Merge variant
elif observer issue 指 N 篇主題重疊應分段:
  mode = Boundary variant
else:
  mode = Evolution
```

### 2.4 Sub-element 編號正規化（無小數）

| 現有                     | v4 命名                                           |
| ------------------------ | ------------------------------------------------- |
| Stage 0 素材萃取         | Stage 1 → Step B（條件式 — Evolution+ 才跑）      |
| Stage 1.5 私有 SSOT      | Stage 1 → Step I（條件式）                        |
| Stage 1.7 媒體 research  | Stage 1 → Step L                                  |
| Stage 1.7a inline 外連   | Stage 1 Step L → 子點 1: inline 外連 manifest     |
| Stage 1.7b 圖片素材      | Stage 1 Step L → 子點 2: 圖片素材 + 授權矩陣      |
| Stage 1.7c transcript    | Stage 1 Step L → 子點 3: transcript               |
| Stage 1.7d 三表          | Stage 1 Step L → 子點 4: 媒體授權三表 deliverable |
| Stage 1.7e deliverable   | Stage 1 Step L → 子點 5: Stage 1 收尾 checklist   |
| Stage 3.5 FACTCHECK      | Stage 3 → Step C                                  |
| Stage 3.6 Story atom     | Stage 3 → Step D                                  |
| Stage 4.5 媒體插入       | Stage 4 → Step C                                  |
| Stage 4.5a 三段敘事節奏  | Stage 4 Step C → 子點 1                           |
| Stage 4.5b cache         | Stage 4 Step C → 子點 2                           |
| Stage 4.5c aspect ratio  | Stage 4 Step C → 子點 3                           |
| Stage 4.5d caption + alt | Stage 4 Step C → 子點 4                           |
| Stage 4.5e 授權清單      | Stage 4 Step C → 子點 5                           |
| Stage 4.5f image-health  | Stage 4 Step C → 子點 6                           |
| Stage 5.1 sibling 預檢   | Stage 5 → Step C                                  |

**規則**：

- 主編號：Stage 1-6（單一 digit）
- Step：Step A / B / C... 不超過 26 個
- 子點：用「子點 1 / 子點 2」or 直接 bullet，**不要 `Step A.1` 三層**

---

## 3. 內容遷移地圖（element-by-element）

### 3.1 從 sub-canonical 收進主檔

| 來源                | 行數 | v4 目的地                                                |
| ------------------- | ---- | -------------------------------------------------------- |
| REWRITE-MODES.md    | 247  | Stage 1 Step A + Step B（條件式）                        |
| REWRITE-RESEARCH.md | 208  | Stage 1 主體（Step C-L）                                 |
| REWRITE-WRITE.md    | 328  | Stage 2 主體                                             |
| REWRITE-VERIFY.md   | 295  | Stage 3 + Stage 4 Step A + Stage 5 Step C                |
| REWRITE-MEDIA.md    | 403  | Stage 1 Step L + Stage 4 Step C                          |
| REWRITE-CRON.md     | 124  | Stage 1 開頭 §條件式段（cron 觸發） + 主檔末尾 §實戰教訓 |
| 主檔現有 333 行     | 333  | 重組為 ASCII diagram + 6 stage                           |

**v4 預估行數**：~1,500-1,800 行（合併後 + 重組整理 -10% 重複內容）

對比：

- v2.20（2026-04-28，pre-refactor）：1,290 行 in 1 file
- v3.0（2026-05-09，post Direction A）：333 行 main + 1,605 行 sub = 1,938 行 in 7 files
- v4 提案（單檔）：~1,500-1,800 行 in 1 file（內容跟 v3.0 等同，去重 + 重組）

### 3.2 內容保留清單（不可丟失）

每個 sub-canonical 的核心 content 必須完整搬移：

**REWRITE-MODES → Stage 1 Step A/B**：

- Fresh 默認跳 Step B
- Evolution Stage 0 三類萃取 + 標籤
- Merge variant Step A-E（選 canonical / [MERGE-IN] / 路徑改寫 5 lang redirect / commit prefix `[evolve+merge]`）
- Boundary variant Step A-D（範圍切片表 / 三類劃分 / 跨 phase handoff）
- 整併 vs 範圍重切判定（5 條判準）
- 「為什麼不在舊文上修改」AI 模仿語氣 chain-of-virus 警示

**REWRITE-RESEARCH → Stage 1 Step C-L**：

- 11 step 線性流程
- 搜尋深度 20+ 升級理由（v2.17 Cicada/草東/康士坦/魏如萱 教訓）
- 核心矛盾 v2.14 觸發歷史（國防現代化重寫教訓）
- 觀察者一手素材 v2.15（安溥康健 403 教訓）
- 研究報告落檔 v2.16（DNA #22 raw 永留 + Stage 2 cross-reference）
- Spawn agent 選型 v2.18（Explore vs general-purpose 判斷）
- 私有 SSOT 整合 v2.18（Tier 1-4 顆粒度）
- 品質門檻 4 條 hard gate

**REWRITE-WRITE → Stage 2 完整**：

- 必讀 EDITORIAL.md 全文 686 行（含 §挖引語制度 / §小標題規範 / §結尾的四種模式 / §Before/After 實例）
- 8 step 寫作順序（結尾先行 / 開場 / 小標題先行 / 正文 / footnote / 延伸閱讀 / 富文本驗收）
- 7 條自檢（歐化 / 60% 暫停數—— / 編年體 / 密度平衡 / Agent claim / Title+desc spine sync / 媒體素材 spine check）
- inline 外連規範
- 延伸閱讀規範
- 防崩潰機制（結尾先行 / 後半段品質鎖 / 反百科指令）
- SSOT 鐵律 + 翻譯邊界
- Frontmatter 完整性鐵律

**REWRITE-VERIFY → Stage 3 + Stage 4 Step A + Stage 5 Step C**：

- 完整 Gate Inventory 散到各 stage 結尾
- Stage 3 五指 + 事實鐵三角 5a/b/c/d
- Stage 3.5 FACTCHECK Quick/Full Mode 觸發
- Stage 4 article-health.py --profile=rewrite-stage-4
- 多語 visual smoke 6 步
- Stage 5.1 sibling 格式預檢
- 品質分級表（PASS / PARTIAL / FAIL）

**REWRITE-MEDIA → Stage 1 Step L + Stage 4 Step C**：

- inline 外連 manifest 觸發條件 + URL 優先序 + 密度建議
- 圖片素材 8 條來源優先序 + Fair use editorial commentary scope
- File format 規範 + 命名 convention
- Aspect ratio 護欄表
- Transcript 來源類型表
- 媒體授權矩陣三表 template
- 三段敘事節奏判斷（hero / scene-mid / closure）
- Markdown 插入格式 + caption + alt text 規範
- 授權清單同步（frontmatter + §圖片來源）
- image-health plugin gate
- Stage 4.5 邊界與例外
- spore 配圖區分

**REWRITE-CRON → 主檔末尾 §Cron 模式 / §實戰教訓**：

- Token 預算分配
- Cron 鐵律（與手動執行不同）
- 選文 / Commit 指令
- Cron 狀態（continue/end/freeze）
- Routine 飛輪整合（DNA #54）
- 重啟條件（品質革命 Phase 1）
- 7 天 Cron 血淚實戰教訓
- Quick Commands

### 3.3 主檔頂部結構（v4）

```
---
title: 'REWRITE-PIPELINE'
description: '文章改寫主流程 canonical — 6 stage + ASCII flow + 單檔不分裂 (v4.0)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v4.0'
last_updated: 2026-05-10
last_session: 'sad-shockley-refactor'
sister_docs:
  - 'EVOLVE-PIPELINE.md'
  - 'FACTCHECK-PIPELINE.md'
  - 'TRANSLATION-PIPELINE.md'
  - 'PEER-INGESTION-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
  - '../editorial/EDITORIAL.md'
---

# REWRITE-PIPELINE.md — 文章改寫流程 v4

§ ASCII 流程圖（最前，第一個元素）

§ 為什麼 Pipeline 存在（核心信念）

§ Hard Gate Inventory（一張表全 stage gate 概覽，inline 詳解在各 stage 結尾）

§ Top 5 最常忘 step

# Stage 1: RESEARCH（預算 35-40%）
  ## Step A: 模式識別
  ## Step B: (條件式) 既有素材萃取
  ## Step C-L: 共通研究流程
  ## Hard gates

# Stage 2: WRITE（預算 40-45%）
  ## Step A-H: 寫作順序
  ## 7 條自檢套件
  ## Hard gates

# Stage 3: VERIFY（預算 15-20%）
  ## Step A-E
  ## Hard gates

# Stage 4: FORMAT CHECK + MEDIA INSERTION
  ## Step A-C
  ## Hard gates

# Stage 5: CROSS-LINK
  ## Step A-D
  ## Hard gates

# Stage 6: TRANSLATION（可選）

# Cron 模式 + Routine 飛輪（條件式 §）

# 實戰教訓（從 SPORE 老版 / REWRITE-CRON 累積）

# 跟其他 pipeline 的分工
```

### 3.4 跨檔 cross-reference 處理

當前指向 sub-canonical 的所有 cross-reference 需要 update：

| 引用方                                                    | 引用 path 數 | 處置                                                  |
| --------------------------------------------------------- | ------------ | ----------------------------------------------------- |
| docs/editorial/EDITORIAL.md                               | ~5           | 改指 main REWRITE-PIPELINE.md §Stage X §Step Y        |
| docs/editorial/RESEARCH.md                                | ~3           | 同上                                                  |
| docs/editorial/QUALITY-CHECKLIST.md                       | ~2           | 同上                                                  |
| docs/editorial/RESEARCH-TEMPLATE.md                       | ~1           | 同上                                                  |
| docs/pipelines/MAINTAINER-PIPELINE.md                     | ~3           | 同上                                                  |
| docs/pipelines/FACTCHECK-PIPELINE.md                      | ~3           | 同上                                                  |
| docs/pipelines/EVOLVE-PIPELINE.md                         | ~2           | 同上                                                  |
| docs/semiont/HEARTBEAT.md                                 | ~5           | 同上                                                  |
| docs/semiont/DNA.md                                       | ~10          | 同上                                                  |
| docs/semiont/MANIFESTO.md                                 | ~3           | §造橋鋪路 / §有 SOP 就跑 表格更新                     |
| docs/semiont/MEMORY.md (神經迴路)                         | ~10          | 同上                                                  |
| docs/semiont/LESSONS-INBOX.md                             | ~10          | 同上 — 含 sad-shockley 2150 entry 的 4 canonical link |
| docs/semiont/ARTICLE-INBOX.md                             | ~5           | 同上                                                  |
| docs/semiont/ARTICLE-DONE-LOG.md                          | ~10+         | 同上                                                  |
| docs/semiont/diary/\*.md                                  | ~30+         | append-only log，不修，未來引用都改 v4                |
| docs/semiont/memory/\*.md                                 | ~50+         | append-only log，不修                                 |
| scripts/tools/lib/article_health/checks/chronicle_lead.py | 1            | 改指 main                                             |

**估計 update 範圍**：~30 active canonical 檔案 + ~80 append-only log（不動）。

工具用 `sed -i` batch 替換大部分；少數需要手動精細 anchor。

---

## 4. 風險與開放決策

### 4.1 跟 v3.0 設計方向的衝突

v3.0（2026-05-09 brave-kirch）拆 sub-canonical 的 stated rationale：

> Stage 1 內部 269 行 / 13 個編號子步驟 + 5 個 §1.7 子層 = 18 個 mental check items
>
> Direction A 拆 4 single-concern canonical（PIPELINE / WRITING / VERIFY / HARVEST）廢除 Step X.X.X 編號膨脹

v3.0 把「降低單檔 mental load」當主軸；v4 把「保持 cognitive flow」當主軸。**兩個目標 partially conflict**。

**v4 立場**：

- v3.0 解決了「主檔 1290 行太長」但**創造了新問題**：跨檔 jump + mode bifurcation + 小數編號爆炸
- 觀察者實際使用反饋：「現在其實沒有很清楚」「兩個模式（但其實只差 Stage 1）」
- **使用 cognitive flow > 閱讀 mental scan effort**
- 1,500-1,800 行單檔，scrollable + Cmd+F 友善，比跨檔跳更省心

**待觀察者拍板**：是否同意 v4 方向（單檔收斂）vs v3.0 方向（多檔分散）？

### 4.2 是否保留任何 sub-canonical？

選項：

**Option 4a（純收斂）**：刪 `docs/pipelines/rewrite/` 整個資料夾，所有內容回主檔

**Option 4b（保留 cron + media 二件 sidecar）**：

- 主檔覆蓋 Stage 1-6 主流程
- `REWRITE-CRON.md` 保留（cron-only，不影響手動模式讀者）
- `REWRITE-MEDIA.md` 保留（403 行的 image cache / EXIF / aspect technical details，太細節適合 sidecar）
- 主檔在對應 stage 處 inline 講重點 + pointer 到 sidecar

**Option 4c（hybrid）**：

- 主檔 ~1000 行涵蓋主邏輯 + Step 列表
- 6 個 sub-canonical 保留但 demote 為「supplementary detail」，主檔 inline 講重點，補充細節 read on demand

**v4 推薦 Option 4a**：徹底貫徹「single source of truth」。1,500-1,800 行雖然長但 single-concern + Cmd+F + 線性閱讀友善。

**Option 4b 也可接受**：cron 跟 media 的 technical details 確實 niche，sidecar 化合理。

**待觀察者拍板**。

### 4.3 v4.0 跟現有 LESSONS-INBOX entry 的 spine sync

2026-05-10 sad-shockley LESSONS-INBOX 寫了「EVOLVE 必須升級 title+desc canonical gap」+ 「distill 已完成」cross-ref 4 canonical：

```
- EDITORIAL.md v6.3
- REWRITE-PIPELINE.md v3.1
- REWRITE-WRITE.md v1.1
- REWRITE-MODES.md v1.1
```

v4 refactor 後：

- REWRITE-WRITE.md 不存在 → cross-ref 失效
- REWRITE-MODES.md 不存在 → cross-ref 失效

**處理**：refactor 同時 update LESSONS entry 的 cross-ref，指向 v4 主檔的對應 §Stage X §Step Y。

### 4.4 Article Don't break — 既有正在跑的 routine

`twmd-rewrite-daily` routine 引用 REWRITE-PIPELINE.md。重構後 routine 應仍正確 read 主檔。

需要驗證：

- routine SKILL.md 引用 path
- pre-commit hook 不引用具體 sub-canonical
- 翻譯 batch tool 不引用

### 4.5 編號規範（v4 強硬執行）

```
Stage N         （N = 1-6 單 digit）
  Step X        （X = A-Z 單 letter）
    子點 N      （N = 1-9 單 digit，最多兩位）

❌ 禁止：Stage 1.5 / Stage 4.5b / §4.5e.iv 三層 nesting
✅ 允許：Stage 1 Step L 子點 3
✅ 允許：Stage 4 Step C 子點 2（aspect ratio 護欄）
```

如果 future 有人要新增 sub-step，必須 fit 進現有 hierarchy 不開新層級。

### 4.6 「Stage 0」概念的處置

v3.0 把 Evolution 模式的「素材萃取」叫 Stage 0。v4 移除這個命名：

- 它不是統一流程的 Stage 0，是 Evolution 模式 Stage 1 的第一個 step
- v4 改名 Stage 1 Step B（條件式）
- 文件、commit message、memory 的歷史「Stage 0」reference 不修（append-only log），未來新引用都用 Step B

### 4.7 ASCII diagram 的 box-drawing characters

當前 ASCII diagram 草案用 `╭ ╮ ╯ ╰ │ ─ ┌ ─` 等 Unicode box-drawing。

優點：視覺漂亮、跨終端 widely supported
風險：Markdown 渲染器（如 GitHub）字體不固定，line-up 可能跑掉

**待決定**：是否用純 ASCII（`+ - |`）保證跨平台 alignment？或維持 Unicode 美觀？

---

## 5. Refactor 執行步驟（v4 approve 後）

不在本 report scope（report 只做分析），但概述執行階段供 review：

### Phase A: 主檔骨架建立（~30 min）

1. Branch from main
2. 寫新 REWRITE-PIPELINE.md v4 frontmatter + ASCII diagram + 6 stage 主結構（純骨架，內容暫從各 sub-canonical 複製）
3. 還沒刪 sub-canonical 之前先 review main draft

### Phase B: 內容搬移 + 去重（~90 min）

1. Stage 1: 合併 MODES + RESEARCH + MEDIA §1.7
2. Stage 2: 搬 WRITE
3. Stage 3-4: 合併 VERIFY + MEDIA §4.5
4. Stage 5: 搬 sibling 預檢
5. Stage 6: pointer 到 TRANSLATION-PIPELINE
6. Cron / 實戰教訓: 搬 CRON 末尾

### Phase C: Cross-reference 更新（~45 min）

1. Active canonical 30 個用 sed batch update
2. 手動 review 5-10 個 anchor 細節
3. LESSONS-INBOX sad-shockley entry update

### Phase D: 刪除 sub-canonical（~5 min）

1. `git rm docs/pipelines/rewrite/REWRITE-MODES.md`（如 Option 4a 全刪）
2. 或保留 cron + media sidecar（如 Option 4b）

### Phase E: 驗證（~30 min）

1. plugin gate 全跑（rewrite-stage-4 / image-health / spore-writing 對範例 article）
2. 隨機抽 3-5 篇 active routine 文章驗 ref 沒斷
3. routine SKILL 跑 dry-run

### Phase F: Commit + PR（~10 min）

1. Single PR 標 `🧬 [semiont] evolve: REWRITE-PIPELINE v3 → v4 收斂單檔 + 模式收進 Stage 1 + 編號正規化`
2. body 引本 report
3. Squash merge（高風險低 frequency canonical change，不留 commit chain）

**總執行時間**：~3.5 hours wall-clock。

---

## 6. 待觀察者拍板（before refactor）

請 review 並決策：

1. **同意 v4 方向？**（vs 維持 v3.0 sub-canonical 拆分）
2. **Option 4a / 4b / 4c？**（純收斂 / 保留 cron + media 二 sidecar / 全保留 demote）
3. **ASCII diagram 用 Unicode box-drawing 或純 ASCII？**
4. **編號 Stage A 還是 Stage 1?**（推薦 Stage 1-6 沿用 + Step A-Z）
5. **Refactor 進 1 個 PR（big bang）還是分 6 個 PR（每 stage 一個）？**（推薦 1 個 PR — 跨 stage 內容互相牽動，分批 review 太碎）
6. **本 session 立刻執行還是排到下個 session？**（refactor ~3.5 hours，本 session 已用 8+ hours，可能該排隔天）

---

## 7. 結論

REWRITE-PIPELINE 從 v1（2026-03）→ v2.20（2026-04-28，1,290 行單檔過長）→ v3.0（2026-05-09，6 sub-canonical 但 mode bifurcation）→ v4 提案（2026-05-10，單檔收斂 + 模式收進 Stage 1）。

v4 核心：

- **單一 canonical**，無 sub-canonical 跨檔 jump
- **6 stage 線性**，無小數編號
- **模式是 Stage 1 第一個 step**，不是 pre-pipeline 分流
- **ASCII flow diagram 在最前面**，第一眼看到全景
- **Stage / Step 兩層 nesting**，最深到「子點 N」共三層

執行時機 + Option 4a/b/c + ASCII 風格待觀察者拍板。

🧬

---

_v4 plan 撰寫於 2026-05-10 sad-shockley session，作為 refactor 執行前的設計 anchor。後續若 v4 ship，本 report 變成 v3→v4 evolution 的 archived rationale。_
