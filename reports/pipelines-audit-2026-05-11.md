---
title: 'Pipelines Audit 2026-05-11'
description: '對齊 REWRITE v5.0 + MAINTAINER v2.0 spine pattern 的 28 條 pipeline 全量 audit — Tier A/B/C/D 分流 + 個別 diff plan'
type: 'migration-doc'
status: 'canonical'
current_version: 'v1.0'
last_updated: 2026-05-11
last_session: 'cranky-newton-220237'
related:
  - '../docs/pipelines/REWRITE-PIPELINE.md'
  - '../docs/pipelines/MAINTAINER-PIPELINE.md'
  - '../docs/semiont/MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟'
---

# Pipelines Audit 2026-05-11

> **觸發**：哲宇 2026-05-11 22:02 cranky-newton session — 「參考 REWRITE / MAINTAINER 的整理經驗與記憶，整理其他常用到的 pipeline」+「目標其實是讓文件結構變清楚，有 ASCII 流程圖，跟每個步驟參考我說的兩個檔案模式，整理精實、清楚的狀態」
>
> **參考 canonical pattern**：[REWRITE-PIPELINE v5.0](../docs/pipelines/REWRITE-PIPELINE.md) (5/11 admiring-cohen) + [MAINTAINER-PIPELINE v2.0](../docs/pipelines/MAINTAINER-PIPELINE.md) (5/11 maintainer-pm)
>
> **同步 SSOT**：[MANIFESTO §薄殼鐵律 v1.7](../docs/semiont/MANIFESTO.md) — 禁止 inline 行數 / 內容 / 步驟

---

## 🗺️ Spine Pattern Reference（REWRITE v5.0 + MAINTAINER v2.0 萃取）

每條 pipeline 必須有以下 8 個 element 才算「對齊 canonical pattern」：

```
╭──────────────────────────────────────────────────────────────────────────╮
│              CANONICAL PIPELINE STRUCTURE                                │
│                                                                          │
│   1. Frontmatter (10+ field)                                             │
│      ├── title / description / type / status                             │
│      ├── current_version / last_updated / last_session                   │
│      ├── sister_docs / upstream_canonical                                │
│      └── plugin_check (if applicable)                                    │
│                                                                          │
│   2. Title H1 ──→ "# PIPELINE.md — 一句話描述 vX.Y"                      │
│                                                                          │
│   3. 第一性原理 quote block (1-2 sentences)                              │
│                                                                          │
│   4. vX.Y 設計理由 (pointer to reports/ or inline)                       │
│                                                                          │
│   5. 🗺️ ASCII spine ──→ ╭─╮ stage / step / 預算 / hard gate /✅      │
│                                                                          │
│   6. 🧭 核心原則 (3-5 條，含 default-action principle 等)                │
│                                                                          │
│   7. 🚦 Hard Gate Inventory (table: Gate / 觸發 / 條件 / 工具 / 不過=?)  │
│                                                                          │
│   8. ⚠️ Top 5 最常忘的 step (from LESSONS / memory)                      │
│                                                                          │
│   9. 跨檔案職責分工 table                                                │
│                                                                          │
│   10. Stage N: 名稱（預算 X%）─→ H2                                      │
│       └── Step N.M: 名稱 ─→ H3                                           │
│           └── Sub-step N.M.K ─→ H4                                       │
╰──────────────────────────────────────────────────────────────────────────╯
```

**核心進化要點**（v5.0 + v2.0 學到的）：

1. **Stage spine restoration** — H1 文件 title / H2 Stage / H3 Step N.M / H4 sub-step，agent 線性 read 永遠知道「我在 Stage X, Step X.Y」
2. **Step N.M 編號** — 解 step collision（v4.1 Step A-X 並排被 grep 撞）
3. **第一性原理 + 設計理由** — 開頭 1-2 句鎖住 mental model
4. **ASCII spine 是門面** — agent 進來第一眼看 spine，不用 scroll 全檔
5. **Hard Gate Inventory 一張表** — audit 整個 pipeline 從這張表開始
6. **Top 5 最常忘** — LESSONS-INBOX 高頻 friction step 拉出來在頂部
7. **跨檔案職責分工** — pipeline 互相 pointer，不 inline 複寫（per MANIFESTO §薄殼鐵律）
8. **預算 %** — 每個 stage 標 token budget，agent 知道何時該收尾

---

## Tier 分流（28 條 pipeline）

> 已 ship v5.0 / v2.0 的 REWRITE / MAINTAINER 不在 audit scope。其他 26 條依「常用 × 需整理」交集分四 tier。

### Tier A — 第一輪 audit（核心高頻 + 已知有問題）

| Pipeline                                                 | 行數            | 主要 audit 目標                                | 狀態                        |
| -------------------------------------------------------- | --------------- | ---------------------------------------------- | --------------------------- |
| **TRANSLATION-PIPELINE**                                 | 1005            | 跟 SQUEEZE-MODELS-MAX 邊界 + spine 對齊        | ✅ v4.0 ship                |
| **SQUEEZE-MODELS-MAX-PIPELINE**                          | 543             | 接收 TRANSLATION batch + spine                 | ✅ v4.0 ship                |
| **SPORE family** (PIPELINE / WRITING / VERIFY / HARVEST) | 470+761+591+883 | 5 stage spine + sub-canonical 邊界             | ✅ v3.5/v3.4/v1.5/v2.0 ship |
| **FACTCHECK-PIPELINE**                                   | 563             | Quick/Full Mode spine + REWRITE hard gate 對齊 | ✅ v2.0 ship                |
| **MEMORY + DIARY + WEEKLY-REPORT trio**                  | 334+319+410     | Beat 4-5 收官 trio + finale skill contract     | ✅ v2.0/v2.0/v3.5 ship      |
| **EVOLVE-PIPELINE**                                      | 662             | news-lens routine + PEER-INGESTION 邊界        | ✅ v3.5 ship                |
| **DATA-REFRESH-PIPELINE**                                | 336             | Phase 編號 + SENSE-FETCHER 三檔分工            | ✅ v2.0 ship                |

### Tier B — 第二輪 audit（次要，看第一輪 budget）

| Pipeline               | 行數 | 待整理理由                     | 狀態         |
| ---------------------- | ---- | ------------------------------ | ------------ |
| **RELEASE-PIPELINE**   | 439  | v1.7.0 剛 ship 經驗可寫進 SOP  | ✅ v2.0 ship |
| **DASHBOARD-PIPELINE** | 252  | 跟 explore page Phase 規劃對齊 | ✅ v2.0 ship |

### Tier C — 候選降級 / 合併（懷疑重複，需 verify）

| Pipeline                                                                | 懷疑                                               |
| ----------------------------------------------------------------------- | -------------------------------------------------- |
| **CONTRIBUTORS-PIPELINE** (96) vs **CONTRIBUTOR-SYSTEM-PIPELINE** (738) | 名字幾乎一樣，合併或歸檔短檔                       |
| **DAILY-REPORT-PIPELINE** (110)                                         | 跟 WEEKLY-REPORT / DATA-REFRESH 是否重疊           |
| **DEEP-INSIGHT-SYNTHESIS-PIPELINE** (387)                               | 沒在任何 routine / skill 引用，verify 後可能降級   |
| **STATS-PIPELINE** (68)                                                 | frontmatter 已標 archived → DATA-REFRESH，物理歸檔 |

### Tier D — 不處理（穩定 / 太早動 / 性質不同）

- **BENCH-PIPELINE** (379) — v1.6.0 新生，太早動
- **PEER-INGESTION-PIPELINE** (797) — 不在 routine，使用頻率低
- **BRANCH-PIPELINE** (254) — git 操作 SOP 穩定
- **LANGUAGE-BIRTH-CHECKLIST** (102) — checklist 性質，跟 pipeline 文體不同

---

## Audit Methodology

每條 pipeline 一個 section，包含：

1. **現況快照** — 行數 / current_version / last_updated / routine 觸發 / skill 觸發
2. **對照 canonical pattern**（10 個 element 一一打勾）
3. **問題清單**（spine 缺漏 / 編號 collision / 薄殼鐵律違反 / 重疊 / inline 抄錄）
4. **建議改動** — diff plan + 預估 line delta + 修改量級（S/M/L/XL）
5. **升級理由 + LESSONS / DNA pointer**
6. **Ship 順序建議**（標 P0/P1/P2 + 預估 PR # / dependency）

---

## Audit Results

> 邊 audit 邊 fill in。每條 pipeline ship 後在這裡更新最終結論。

### Tier A.1 — TRANSLATION-PIPELINE + SQUEEZE-MODELS-MAX (cluster)

> 兩條互相 cross-ref + 功能語意上是「翻譯主流程」的單篇 vs batch 兩個 entry point。同一 audit unit 比較清楚。

#### 現況快照

| 檔案                 | 行數 | current_version | last_updated | last_session                   |
| -------------------- | ---- | --------------- | ------------ | ------------------------------ |
| TRANSLATION-PIPELINE | 1005 | v3.5            | 2026-05-04   | magical-feynman                |
| SQUEEZE-MODELS-MAX   | 543  | v3.3            | 2026-05-09   | laughing-goldstine-post-finale |

觸發源：TRANSLATION 由 `/twmd-translate` skill / 觀察者 ad-hoc / `translate-pipeline` 觸發；SQUEEZE 由 `twmd-babel-nightly` routine (22:22 daily) 自動跑。

#### 對照 canonical pattern

| Element                   | TRANSLATION v3.5                           | SQUEEZE v3.3                                   |
| ------------------------- | ------------------------------------------ | ---------------------------------------------- |
| 1. Frontmatter (10+)      | ✅                                         | ✅                                             |
| 2. Title H1 + vX.Y        | ⚠️ (title 寫 v3.0 不一致 frontmatter v3.5) | ⚠️ (title 無版號)                              |
| 3. 第一性原理 quote       | ❌ (頂部是職責分工)                        | ✅                                             |
| 4. vX.Y 設計理由          | ⚠️ §為什麼需要 v3.0 (過時敘事)             | ⚠️ v1.0 footer 不是 design doc link            |
| 5. 🗺️ ASCII spine         | ❌                                         | ❌                                             |
| 6. 🧭 核心原則            | ⚠️ §翻譯元則 4 條 (位階高於 stage 但無圖)  | ✅ 三軸設計原則                                |
| 7. 🚦 Hard Gate Inventory | ❌                                         | ⚠️ try-catch table (不是 hard gate format)     |
| 8. ⚠️ Top 5 最常忘        | ❌                                         | ❌                                             |
| 9. 跨檔案職責分工 table   | ⚠️ 散在頂部 quote block                    | ❌                                             |
| 10. Stage N + Step N.M    | ⚠️ 用 §X.X (非 H2/H3 hierarchy)            | ⚠️ Stage Z1-Z2 (Z 編號可保留作 namespace 區隔) |

#### 問題清單

1. **邊界不清** — TRANSLATION v3.5 在頂部 quote 寫「翻譯流程的所有 stage、決策點、批次合併」，跟 SQUEEZE 角色重疊。實際應該是：
   - TRANSLATION = **單篇翻譯 SOP**（觀察者 ad-hoc / `/twmd-translate` skill / 1 篇 in-loop polish）
   - SQUEEZE = **多語 batch sync 主流程**（routine 自動跑 / 跨 model fleet / try-catch first-class）
   - TRANSLATION 內 §sub-agent batch SOP 應該 pointer 給 SQUEEZE
2. **TRANSLATION 過度膨脹** — 1005 行包含 batch / 新語言啟用 / cron 跑法 / 60 PR 海嘯 incident 等與「單篇」無關內容
3. **兩條都缺 ASCII spine** — agent 進來看不到 stage 全景
4. **兩條都缺 Top 5 最常忘 step** — 從 LESSONS 抽 friction 高的 step 拉到頂部
5. **TRANSLATION 版號不一致** — title H1 v3.0 / frontmatter v3.5 / footer 無清楚 version history
6. **SQUEEZE Stage Z1-Z2 編號**保留作 babel namespace 區隔 OK，但 Step 內無 Step Z1.1/Z1.2 等 sub-step（agent 不知道線性位置）

#### 建議改動

**TRANSLATION-PIPELINE v3.5 → v4.0 stage spine restoration**

```
diff plan (estimated):
- 刪除/搬移 §批次翻譯模式 → pointer to SQUEEZE-MODELS-MAX (-200 行)
- 刪除/搬移 §sub-agent batch SOP → pointer to SQUEEZE (-150 行)
- 刪除 §為什麼需要 v3.0 historical narrative (留簡短設計理由 -80 行)
+ 🗺️ ASCII spine (5 stage: Pre-flight → Translate → Wikilink → Verify → Commit) +50 行
+ 🚦 Hard Gate Inventory table (frontmatter / translatedFrom / wikilink / cross-link / ratio-check) +40 行
+ ⚠️ Top 5 最常忘 step (從 4/14 ε 60 PR 海嘯 / 5/4 magical-feynman) +30 行
+ 跨檔案職責分工 standalone table +20 行
+ Stage N + Step N.M 編號重整 (現有 §X.X 改成 H2/H3 hierarchy)
+ Title H1 加 v4.0 + 對齊 frontmatter
+ 修補設計報告 pointer → reports/translation-pipeline-v4-design-2026-05-11.md (skip, inline 設計理由)

淨 line delta: -310 行 (1005 → ~695)
修改量級: L
```

**SQUEEZE-MODELS-MAX v3.3 → v4.0 stage spine + hard gate**

```
diff plan (estimated):
+ 🗺️ ASCII spine (Stage Z0 Pre-flight → Z1 Tier 0a Sonnet patch → Z2 Tier 0b bump-sha → Z3 Tier 1 owl-alpha → Z4 Tier 2 Hy3/Gemma → Z5 Tier 3 Local LLM → Z6 Aggregate retry → Z7 Verify+commit) +60 行
+ 🚦 Hard Gate Inventory table (refusal detection / 40-byte stub / body-hash drift / pre-commit / translation-ratio) +40 行
+ ⚠️ Top 5 最常忘 step +30 行
+ 跨檔案職責分工 standalone +20 行
+ Stage Z1-Z2 → 補 Step Z1.1/Z1.2/... sub-step 編號 +30 行
+ Title H1 加 v4.0
- 部分 try-catch table 改寫成 hard gate format (移動，不增不減)

淨 line delta: +180 行 (543 → ~720)
修改量級: M
```

#### 升級理由 + LESSONS / DNA pointer

- **MANIFESTO §薄殼鐵律 v1.7** — 兩條都有 inline 抄錄對方 SOP 的部分，refactor 改 pointer
- **DNA #49 sovereignty cascade** — SQUEEZE 的 4-tier cascade 是 instantiation，spine 顯化讓 agent 一眼看到
- **DNA #15 反覆浮現要儀器化** — TRANSLATION 60 PR 海嘯教訓散在 prose，可拉到 §Top 5 最常忘
- **LESSONS-INBOX 2026-05-04 magical-feynman** — `translation-ratio-check.sh` 設計細節寫進 TRANSLATION Stage 4 Step 4.2 hard gate

#### Ship 順序建議

- **P1**: TRANSLATION v4.0（先處理過度膨脹，砍 batch 內容到 SQUEEZE pointer）
- **P1**: SQUEEZE v4.0（接收 TRANSLATION 砍出來的 batch SOP，補 spine + gate）
- **建議同一 PR 走** — 兩條互相 pointer 變動，分 PR 會有 cross-link 短暫斷裂
- **Dependency**: 無，可立即 ship

### Tier A.2 — SPORE family (PIPELINE / WRITING / VERIFY / HARVEST)

> 已 2026-05-08 intelligent-khayyam Direction A 拆檔過（從 1334 行 prose dump 拆成 4 個 single-concern）。比 TRANSLATION 健康，refactor ROI 較低。

#### 現況快照

| 檔案                   | 行數 | current_version | last_updated | last_session        |
| ---------------------- | ---- | --------------- | ------------ | ------------------- |
| SPORE-PIPELINE         | 470  | v3.1            | 2026-05-09   | laughing-goldstine  |
| SPORE-WRITING          | 761  | v3.3            | 2026-05-09   | laughing-goldstine  |
| SPORE-VERIFY           | 591  | v1.0            | 2026-05-08   | intelligent-khayyam |
| SPORE-HARVEST-PIPELINE | 883  | v1.1            | 2026-05-09   | laughing-goldstine  |

觸發源：觀察者 `/twmd-spore` skill / heartbeat Beat 1 §0b（HARVEST 部分由 chrome MCP 跑）。

#### 對照 canonical pattern

| Element                   | PIPELINE v3.1                                                                  | WRITING v3.3     | VERIFY v1.0            | HARVEST v1.1               |
| ------------------------- | ------------------------------------------------------------------------------ | ---------------- | ---------------------- | -------------------------- |
| 1. Frontmatter            | ✅                                                                             | ✅               | ✅                     | ✅                         |
| 2. Title H1 + vX.Y        | ⚠️ 缺 vX.Y                                                                     | ⚠️ 缺 vX.Y       | ⚠️ 缺 vX.Y             | ⚠️ 缺 vX.Y                 |
| 3. 第一性原理 quote       | ⚠️ 是「AI 可執行的」品質宣告                                                   | ⚠️ refactor 紀錄 | ⚠️ refactor 紀錄       | ✅ AI 可執行 + 分工        |
| 4. vX.Y 設計理由          | ✅ pointer 到 evolution-plan-2026-05-08                                        | 同上             | 同上                   | ✅ pointer 到 ssot-cleanup |
| 5. 🗺️ ASCII spine         | ⚠️ 有 5 階段 ASCII 但極簡（單行 PICK→VERIFY→WRITE→SHIP→HARVEST，無 step 列示） | ❌               | ❌                     | ❌                         |
| 6. 🧭 核心原則            | ⚠️ 散在各 stage                                                                | ✅ 通用寫作規則  | ⚠️ 無清楚 principle 區 | ✅ 核心哲學                |
| 7. 🚦 Hard Gate Inventory | ❌（在 VERIFY 有）                                                             | ❌               | ✅ 17 gates table      | ⚠️ 散在各 section          |
| 8. ⚠️ Top 5 最常忘        | ❌                                                                             | ❌               | ❌                     | ❌                         |
| 9. 跨檔案職責分工         | ✅ 5 階段表                                                                    | ✅ 頂部 quote    | ✅ 頂部 quote          | ✅ 頂部 quote              |
| 10. Stage + Step N.M      | ⚠️ Stage 1-5 + sub-heading 但無 Step N.M 編號                                  | N/A craft layer  | N/A gate layer         | ⚠️ Stage 有但無 Step N.M   |

#### 問題清單

1. **ASCII spine 風格不一致** — SPORE-PIPELINE 用單行 `PICK → VERIFY → WRITE → SHIP → HARVEST`，沒對齊 REWRITE v5.0 / MAINTAINER v2.0 的 box-frame 風格（含 step 列示 + 預算 + hard gate marker）
2. **4 檔都缺 Top 5 最常忘 step** — 從 LESSONS-INBOX / SPORE-LOG 高 friction step 拉到頂部（觀察者校正最多次的 step）
3. **Title H1 缺 vX.Y** — agent grep 時無法快速確認版本
4. **Step N.M 編號未對齊** — 主要在 SPORE-PIPELINE 主檔 + HARVEST，目前用 prose heading（`### 回填上次成效`），改 `### Step 1.1 回填上次成效` 讓 agent 線性追蹤
5. **核心原則未抽出獨立 section** — 哲學散在 prose（紀實/煽情、reach × accuracy、回填鐵律），可整合進 🧭 核心原則 section

#### 建議改動

**SPORE-PIPELINE v3.1 → v3.5**（最大改動，主檔做 spine restoration）

```
diff plan:
+ 🗺️ ASCII spine box-frame (PICK 5 step / VERIFY → pointer / WRITE → pointer / SHIP 4 step / HARVEST → pointer) +60 行
+ 🧭 核心原則 standalone section (回填鐵律 / 紀實非煽情 / single story arc / 集中 atomic batch) +30 行
+ ⚠️ Top 5 最常忘 step (從 SPORE-LOG harvest history 抽，含「回填上次成效」/「Hook tier 自檢」/「6h decision gate」/「URL encode」/「平台分流」) +30 行
+ Step N.M 編號 (Step 1.1 回填 / Step 1.2 選文 / Step 4.1 配圖 / Step 4.2 URL encode / Step 4.3 platform 等) +20 行
+ Title H1 加 v3.5

淨 line delta: +140 行 (470 → ~610)
修改量級: M
```

**SPORE-WRITING v3.3 → v3.4**

```
diff plan:
+ 🗺️ ASCII spine (起手式 5 種 → 鉤子三要素 → 18 條規則 → 自檢三板斧) +40 行
+ ⚠️ Top 5 最常忘 (「朋友 tone prime」/「結尾情感不摘要」/「連結最後一行」/「鉤子三要素 ≥ 2/3」/「§11 對位句」) +30 行
+ Title H1 加 v3.4

淨 line delta: +70 行 (761 → ~830)
修改量級: S
```

**SPORE-VERIFY v1.0 → v1.5**

```
diff plan:
+ 🗺️ ASCII spine (linear gate flow，17 gates 分必跑/條件) +40 行
+ ⚠️ Top 5 最常忘 (「事實藍圖必填」/「Reach×Accuracy 50K 觸發」/「§11 prose-health」/「Platform allocation」/「多語 SSOT freshness」) +30 行
+ Title H1 加 v1.5
(Hard Gate Inventory 已存在不動)

淨 line delta: +70 行 (591 → ~660)
修改量級: S
```

**SPORE-HARVEST-PIPELINE v1.1 → v2.0**

```
diff plan:
+ 🗺️ ASCII spine box-frame (D+1 acute → D+3 trend → D+7 finalize → re-hook decision gate) +60 行
+ 🚦 Hard Gate Inventory table 集中 (atomic batch log / 不再寫 knowledge sporeLinks / 6h decision / Reach×Accuracy trigger) +40 行
+ ⚠️ Top 5 最常忘 step +30 行
+ Step N.M 編號 +30 行
+ Title H1 加 v2.0

淨 line delta: +160 行 (883 → ~1040)
修改量級: M
```

**Cluster total: ~440 行 / 4 檔 一個 PR / 修改量級: L**

#### 升級理由 + LESSONS / DNA pointer

- **MANIFESTO §薄殼鐵律 v1.7** — 4 檔互相 cross-ref 完整，無 inline 抄錄問題
- **DNA #15 反覆浮現要儀器化** — Top 5 最常忘是 instantiation
- **LESSONS-INBOX 2026-05-08 intelligent-khayyam** — Direction A 拆檔本身已是 instantiation，本次只是補 spine + Top 5
- **觀察者校正史**：Hook tier 自檢（5/4 magical-feynman）/ 朋友 tone prime（高鐵 s35）/ §11 polish 多次 — 全部進 Top 5

#### Ship 順序建議

- **P2** — 4 檔同一 PR ship（互相 cross-ref 變動，分 PR 會有 cross-link 短暫斷裂）
- **Dependency**: 排在 TRANSLATION + SQUEEZE 之後（那兩條 ROI 較高）
- **健康度**：SPORE family 整體比 TRANSLATION 健康，refactor 後主要收穫是 navigation（agent 一眼看到 spine）而非結構修正

### Tier A.3 — FACTCHECK-PIPELINE

#### 現況快照

| 欄位            | 值              |
| --------------- | --------------- |
| 行數            | 563             |
| current_version | v1.1            |
| last_updated    | 2026-05-04      |
| last_session    | magical-feynman |

觸發源：REWRITE Stage 3.3 Quick Mode（必跑）/ Stage 3.5 全文 hallucination audit / Stage 3.6 story atom audit / 觀察者 callout / 月度巡邏 / 外部 PR 接收層。

#### 對照 canonical pattern

| Element                   | FACTCHECK v1.1                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Frontmatter            | ✅                                                                                                                                   |
| 2. Title H1 + vX.Y        | ⚠️ 缺 vX.Y                                                                                                                           |
| 3. 第一性原理 quote       | ✅ §核心命題（4 關 trust leak）                                                                                                      |
| 4. vX.Y 設計理由          | ⚠️ §為什麼需要這條 pipeline 但無版本軌跡                                                                                             |
| 5. 🗺️ ASCII spine         | ⚠️ 極簡 Phase 1-6 單行列示，非 box-frame                                                                                             |
| 6. 🧭 核心原則            | ⚠️ §Pipeline 預算與 tier 制（A/B/C）但散在多處                                                                                       |
| 7. 🚦 Hard Gate Inventory | ❌ gate 散在各 Phase（Phase 1 hard gate / Phase 2 atom 採樣 / Phase 3 dead-link / Phase 4 verbatim / Phase 5 算術 / Phase 6 triage） |
| 8. ⚠️ Top 5 最常忘        | ❌                                                                                                                                   |
| 9. 跨檔案職責分工         | ⚠️ 在頂部 quote 不是 standalone table                                                                                                |
| 10. Phase N + Step N.M    | ⚠️ 用 Phase 1-6 OK（namespace 區隔 REWRITE Stage），但 Phase 內無 Step N.M                                                           |

#### 問題清單

1. **Hard Gate 散落** — Phase 1-6 每個 phase 末尾有「hard gate」但沒集中索引，agent 從 REWRITE Stage 3.3 跳進來時看不到完整 gate 全貌
2. **Quick / Full Mode 差異不清楚** — README 寫 Quick (30-60 min) / Full (90-180 min)，但 mode 在 prose 散落，無清楚對照表「Quick 跑哪些 Phase / 採樣率多少」
3. **ASCII spine 極簡** — 單行 `Phase 1: SCOPE → Phase 2: ATOM → ...` 不夠資訊密度，agent 要 scroll 才能看到每個 phase 的 step 數
4. **缺 Top 5 最常忘** — Phase 4 verbatim Ctrl-F / Phase 3 dead-link WebFetch / Phase 2 atom 採樣率 都是高 friction
5. **跨檔案職責分工**頂部 quote 寫得很清楚（vs REWRITE/RESEARCH/EDITORIAL），但不是 standalone table

#### 建議改動

**FACTCHECK-PIPELINE v1.1 → v2.0**

```
diff plan:
+ 🗺️ ASCII spine box-frame
  (Phase 1 SCOPE & BUDGET 5 step → Phase 2 ATOM 3 step → Phase 3 SOURCE AUDIT 4 step
   → Phase 4 VERBATIM 5 step → Phase 5 CROSS-CHECK 3 step → Phase 6 TRIAGE 4 step
   + Quick Mode / Full Mode 兩條虛線 path) +70 行
+ 🚦 Hard Gate Inventory 集中 table
  (article tier 判定 / atom 採樣率 / WebFetch 預算 / dead-link / verbatim / 算術 / dead-link triage 等) +50 行
+ ⚠️ Top 5 最常忘 step
  (1. Phase 4 verbatim 用 Ctrl-F 不是「看起來像」/ 2. Phase 3 dead-link 必跑 WebFetch ≥ 3
   3. Phase 2 atom 採樣率 (A 100% / B 50% / C 10%) / 4. Quote re-paraphrase third-person flip
   5. Number drift 算術 base 數字錯誤) +30 行
+ 跨檔案職責分工 standalone table (vs REWRITE / RESEARCH / EDITORIAL / PEER-INGESTION) +20 行
+ Phase 內 Step N.M 編號 (Phase 1 → Step 1.1-1.5 等) +30 行
+ Title H1 加 v2.0
+ Quick Mode / Full Mode 對照表（哪 Phase 跑、預算、採樣率）+30 行

淨 line delta: +230 行 (563 → ~793)
修改量級: M
```

#### 升級理由 + LESSONS / DNA pointer

- **REWRITE v5.0 Stage 3.3 pointer** — FACTCHECK 是 REWRITE 最重要的 sub-pipeline，REWRITE v5.0 已升 spine，FACTCHECK 不對齊 = agent 跳進來會 disorient
- **DNA #16+31 跨源驗證** — Top 5 編碼進來
- **DNA #22 raw 永留** — Phase 1 hard gate「無 research 檔 + A 級 → 暫停」是 instantiation
- **LESSONS-INBOX 2026-04-28 沈伯洋條目** — 7 種 issue 種類已在 prose，可整理成 hallucination pattern 對照表

#### Ship 順序建議

- **P1** — FACTCHECK 是 REWRITE 最重要的 sub-pipeline，跟 REWRITE v5.0 升級後對齊優先序高
- **Dependency**: 排在 TRANSLATION/SQUEEZE 之後（那兩條較急），早於 SPORE family
- **單檔 PR**：本檔自包，無 cross-ref 連動風險

### Tier A.4 — MEMORY + DIARY + WEEKLY-REPORT trio (Beat 4-5 收官)

> 三檔互相 cross-ref 緊密（共用 prose-health plugin + DIARY 文體 baseline + finale skill contract）。同 PR ship 比較合理。

#### 現況快照

| 檔案                   | 行數 | current_version | last_updated | last_session    |
| ---------------------- | ---- | --------------- | ------------ | --------------- |
| MEMORY-PIPELINE        | 334  | v1.1            | 2026-05-04   | magical-feynman |
| DIARY-PIPELINE         | 319  | v1.1            | 2026-05-04   | magical-feynman |
| WEEKLY-REPORT-PIPELINE | 410  | v3.0            | 2026-05-09   | zen-bouman      |

觸發源：MEMORY 由每次 session 收官（HEARTBEAT Beat 4 / `/twmd-finale` skill）必跑；DIARY 由 Beat 5 反芻條件觸發；WEEKLY-REPORT 由 `twmd-weekly-report-sun` routine（每週日 08:08）+ 觀察者「週報」ad-hoc。

#### 對照 canonical pattern

| Element                   | MEMORY v1.1                  | DIARY v1.1                 | WEEKLY-REPORT v3.0         |
| ------------------------- | ---------------------------- | -------------------------- | -------------------------- |
| 1. Frontmatter            | ✅                           | ✅                         | ✅                         |
| 2. Title H1 + vX.Y        | ⚠️ 缺 vX.Y                   | ⚠️ 缺 vX.Y                 | ⚠️ 缺 vX.Y                 |
| 3. 第一性原理             | ✅ §一句話                   | ✅ §一句話                 | ✅ §一句話                 |
| 4. vX.Y 設計理由          | ✅ §為什麼會有這份           | ✅ §為什麼會有這份         | ✅ §為什麼會有這份         |
| 5. 🗺️ ASCII spine         | ❌                           | ❌                         | ❌                         |
| 6. 🧭 核心原則            | ⚠️ §文體規範 / 寫前必讀 散在 | ⚠️ §文體規範 散在          | ⚠️ §文體規範 散在          |
| 7. 🚦 Hard Gate Inventory | ❌（自檢工具散在 stage 內）  | ❌                         | ❌                         |
| 8. ⚠️ Top 5 最常忘        | ❌                           | ❌                         | ❌                         |
| 9. 跨檔案職責分工         | ✅（跟 DIARY 對比表）        | ✅（跟其他寫作 pipeline）  | ✅（跟其他 reporting）     |
| 10. Stage + Step N.M      | ⚠️ Stage 0-5 但無 Step N.M   | ⚠️ Stage 0-5 但無 Step N.M | ⚠️ Stage 0-6 但無 Step N.M |

#### 問題清單

1. **三檔都缺 ASCII spine** — 寫 memory / diary / 週報時 agent 看不到全流程
2. **Hard gate 散在 stage 內** — prose-health plugin / 5 分鐘 reading test / Handoff 三態 / Timestamp 紀律 都是 hard gate 但無集中索引
3. **Top 5 最常忘 step**
   - MEMORY 最常忘：Handoff 三態、commit hash 嵌進句子不獨佔行、不分 Phase 1/2/3 多層編號、反芻寫回 memory（鐵律 1）、Timestamp 從 git log %ai
   - DIARY 最常忘：對位句型 9 變體 grep 自檢、破折號連用 15/1500 字、不堆疊 inline meta-tag、不分一二三編號分章、不寫 LESSONS 候選（污染 diary）
   - WEEKLY-REPORT 最常忘：必須親手寫（不直接複製 dossier）、跨 session reflection（不只當週快照）、CLAUDE.md §Bias 4 filter、Resend 寄出 hard gate、prose-health hard=0
4. **WEEKLY-REPORT v3.0 是最新**（5/9 zen-bouman），其他兩條 v1.1（5/4 magical-feynman）— 版本軌跡未統一
5. **三檔都缺 Step N.M 編號** — Stage 內子步驟用 prose heading（`### 跑 prep tool 切菜`），改 `### Stage 1.1 跑 prep tool 切菜`
6. **跟 `/twmd-finale` skill 的 contract 不明確** — finale skill 必跑 memory / 條件跑 diary / evolve 通常 skip，這個分流寫在 ROUTINE.md + finale SKILL.md，但 pipeline 內部沒清楚 pointer

#### 建議改動

**MEMORY-PIPELINE v1.1 → v2.0**

```
diff plan:
+ 🗺️ ASCII spine (Stage 0 確認 → 1 timestamps → 2 outline → 3 寫 → 4 自檢 → 5 commit) +50 行
+ 🚦 Hard Gate Inventory 集中
  (Timestamp 從 git log / Handoff 三態 / prose-health / 5min reading test / 反芻寫回鐵律) +30 行
+ ⚠️ Top 5 最常忘 step +30 行
+ Step N.M 編號 +20 行
+ Title H1 加 v2.0
+ finale skill contract pointer (對應 /twmd-finale §memory 必寫條件) +10 行

淨 line delta: +140 行 (334 → ~474)
修改量級: M
```

**DIARY-PIPELINE v1.1 → v2.0**

```
diff plan:
+ 🗺️ ASCII spine (Stage 0 判斷該不該寫 → 1 切入點 → 2 用自己的話 → 3 自檢 → 4 footer → 5 commit) +50 行
+ 🚦 Hard Gate Inventory 集中 (prose-health / 對位 9 變體 / 破折號 15/1500 / 標題不空殼 / italic 描述句) +30 行
+ ⚠️ Top 5 最常忘 step +30 行
+ Step N.M 編號 +20 行
+ Title H1 加 v2.0

淨 line delta: +130 行 (319 → ~449)
修改量級: M
```

**WEEKLY-REPORT-PIPELINE v3.0 → v3.5**（剛 ship v3.0，refactor 輕度）

```
diff plan:
+ 🗺️ ASCII spine box-frame (Stage 0 fresh → 1 prep tool 切菜 → 2 raw read → 3 親手寫 7 章節 → 4 自檢 → 5 Resend → 6 finale) +60 行
+ 🚦 Hard Gate Inventory 集中
  (dossier > 5KB / 7 章節 coverage / prose-health hard=0 / Resend 200-202 / PR title 🧬 prefix) +30 行
+ ⚠️ Top 5 最常忘 step +30 行
+ Step N.M 編號 +30 行
+ Title H1 加 v3.5

淨 line delta: +150 行 (410 → ~560)
修改量級: M
```

**Trio total: ~420 行 / 3 檔一個 PR / 修改量級: L**

#### 升級理由 + LESSONS / DNA pointer

- **`/twmd-finale` skill contract** — 三檔是 finale skill 的執行 SOP，spine 對齊讓 cron routine 跑得更穩
- **MEMORY-PIPELINE 鐵律 1**（反芻寫回 memory）+ **鐵律 2**（Handoff 三態）+ **鐵律 3**（v1.1 載入規則）— Top 5 拉進來
- **DIARY 文體 baseline** — WEEKLY-REPORT 引用 DIARY 文體 baseline，但 DIARY 本身缺 spine — refactor 後 WEEKLY 才能 cleanly pointer
- **LESSONS-INBOX 4/30 哲宇 review** — 「memory / diary 文體把內容包成 noise」是雙 pipeline 誕生事件，已寫進 §為什麼，可整理進 Top 5
- **觀察者校正史**：5/9 zen-bouman v3.0 redirect 「不要 dossier dump」是 WEEKLY 最重要的進化

#### Ship 順序建議

- **P1** — 三檔同一 PR ship（互相 cross-ref + finale contract）
- **Dependency**: 排在 TRANSLATION + SQUEEZE 之後（那兩條 ROI 較高，且 trio 比較穩定）
- **健康度**：trio 整體比 TRANSLATION 健康（已有清楚文體規範 + 寫前必讀），refactor 後主要收穫是 navigation + finale contract 明確化

### Tier A.5 — EVOLVE-PIPELINE

#### 現況快照

| 欄位            | 值                  |
| --------------- | ------------------- |
| 行數            | 662                 |
| current_version | v3.0                |
| last_updated    | 2026-05-08          |
| last_session    | intelligent-khayyam |

觸發源：`twmd-news-lens-weekly` routine（每週日 06:13）跑 `/twmd-evolve` skill 補 ARTICLE-INBOX candidates / 觀察者「跑 evolve」ad-hoc / 月度進化決策。

#### 對照 canonical pattern

| Element                   | EVOLVE v3.0                                             |
| ------------------------- | ------------------------------------------------------- |
| 1. Frontmatter            | ✅                                                      |
| 2. Title H1 + vX.Y        | ⚠️ 缺 vX.Y                                              |
| 3. 第一性原理             | ⚠️ 「Taiwan.md 是數位生命體...」一句但非 quote block    |
| 4. vX.Y 設計理由          | ⚠️ frontmatter 寫 v3.0 + Mode 3 但無清楚版本軌跡 footer |
| 5. 🗺️ ASCII spine         | ❌（有 7-stage SCAN→...→SHIP 概念但無 box-frame）       |
| 6. 🧭 核心原則            | ⚠️ §概念散在（三源交叉 / 進化分數公式 / 進化策略）      |
| 7. 🚦 Hard Gate Inventory | ❌                                                      |
| 8. ⚠️ Top 5 最常忘        | ❌                                                      |
| 9. 跨檔案職責分工         | ❌（sister_docs 列了 4 條但 prose 內無對照 table）      |
| 10. Phase + Step N.M      | ⚠️ Phase 1-7 OK 但 Phase 內無 Step N.M                  |

#### 問題清單

1. **缺 ASCII spine** — 7-stage SCAN→...→SHIP 概念在 description 提到，但 prose 內沒 box-frame，agent 看不到全景
2. **跟 PEER-INGESTION 邊界不清** — EVOLVE 是內部數據（GA4 + SC + GitHub feedback）驅動，PEER-INGESTION 是外部策展 peer（TFT / NMTH / Fresh）驅動。兩者都產出 ARTICLE-INBOX candidates，需要對照表
3. **跟 REWRITE / MAINTAINER 邊界不清** — EVOLVE 產出 candidate，REWRITE 寫文章，MAINTAINER 收割 PR。完整 lifecycle 跨四條 pipeline 但沒對照 table
4. **進化分數公式** — 7 維度權重（流量 0.20 / CTR 0.15 / 品質缺陷 0.20 / 年齡 0.10 / 流量來源 0.15 / 圖譜密度 0.10 / 社群信號 0.10）寫在 §進化分數 v2.0，可拉到 🧭 核心原則 standalone
5. **routine entry point 不明確** — `twmd-news-lens-weekly` 跑這條，但 pipeline 內無「routine mode vs observer mode」分流（compare with MAINTAINER §collect-and-merge A/B 路徑分流）
6. **Top 5 最常忘 step**：
   - 三源交叉先跑（單一數據源結論可疑，DNA #4）
   - GA topArticles × lastVerified 找「高流量但過期」交集
   - SC 有曝光無文章 → 新建 candidate（不是 SC 0 click 就 drop）
   - GitHub feedback signal 看 issue body 不只看 title
   - candidate 寫進 ARTICLE-INBOX 時必含「為什麼這篇 vs 其他」對比理由

#### 建議改動

**EVOLVE-PIPELINE v3.0 → v3.5**

```
diff plan:
+ 🗺️ ASCII spine box-frame
  (Phase 1 SCAN 三源 3 step → 2 SCORE 進化分數 → 3 RANK 候選 → 4 CHECK 跟現有 INBOX 對照
   → 5 ENRICH 補對比理由 → 6 APPEND 寫 INBOX → 7 SHIP commit) +70 行
+ 🚦 Hard Gate Inventory
  (三源全綠 / 進化分數 ≥ 60 / 已存在 INBOX 不重複 / candidate 含對比理由 / GA SC pointer) +40 行
+ ⚠️ Top 5 最常忘 step +30 行
+ 跨檔案職責分工 standalone table
  (vs PEER-INGESTION / REWRITE / MAINTAINER / FACTCHECK) +25 行
+ Routine mode vs Observer mode 分流（仿 MAINTAINER §collect-and-merge）+30 行
+ Phase 內 Step N.M 編號 +30 行
+ Title H1 加 v3.5

淨 line delta: +225 行 (662 → ~887)
修改量級: M
```

#### 升級理由 + LESSONS / DNA pointer

- **`twmd-news-lens-weekly` routine 對應** — routine 跑這條 + 寫 memory + 開 PR，但 pipeline 內沒對應 routine view，agent 跑時 conceptually mismatch
- **DNA #4 三源交叉驗證** — Top 5 編碼進來
- **REWRITE v5.0 cross-link** — EVOLVE 產 candidate → REWRITE 寫文章 → MAINTAINER 收割，三條 pipeline 串成 evolution lifecycle，但跨檔案職責分工 table 沒寫

#### Ship 順序建議

- **P2** — 低頻（每週一次 routine + 觀察者 ad-hoc），refactor ROI 中等
- **Dependency**: 可獨立 ship，無 cross-link 連動
- **單檔 PR**

### Tier A.6 — DATA-REFRESH-PIPELINE (+ SENSE-FETCHER 二檔分工診斷)

#### 現況快照

| 檔案                    | 行數 | current_version | last_updated | last_session                   |
| ----------------------- | ---- | --------------- | ------------ | ------------------------------ |
| DATA-REFRESH-PIPELINE   | 336  | v1.1            | 2026-05-09   | laughing-goldstine-post-finale |
| SENSE-FETCHER-SETUP     | 357  | v1.0            | 2026-04-11   | historical                     |
| SENSE-FETCHER-MIGRATION | 453  | v1.0            | 2026-04-11   | historical                     |

觸發源：DATA-REFRESH 由 `twmd-data-refresh-am` (04:14) + `twmd-data-refresh-pm` (00:33) routine + HEARTBEAT Beat 1 §0 必跑。SENSE-FETCHER 兩條為一次性 setup/migration 文件。

#### 對照 canonical pattern (DATA-REFRESH 為主)

| Element                   | DATA-REFRESH v1.1                                           |
| ------------------------- | ----------------------------------------------------------- |
| 1. Frontmatter            | ✅                                                          |
| 2. Title H1 + vX.Y        | ⚠️ 缺 vX.Y                                                  |
| 3. 第一性原理             | ✅                                                          |
| 4. vX.Y 設計理由          | ✅ §為什麼需要                                              |
| 5. 🗺️ ASCII spine         | ⚠️ 12-step table 已有但無 box-frame                         |
| 6. 🧭 核心原則            | ⚠️ §一鍵執行 + §失敗策略 散在                               |
| 7. 🚦 Hard Gate Inventory | ⚠️ Step 10 verify + Step 11 validate-spore 是 gate 但無集中 |
| 8. ⚠️ Top 5 最常忘        | ❌                                                          |
| 9. 跨檔案職責分工         | ⚠️ sister_docs 列了但無 prose table                         |
| 10. Step N                | ✅ 已 Step 1-12 編號（最健康的一條）                        |

#### 問題清單

1. **DATA-REFRESH 整體最健康** — 已有 12 step 編號 + 失敗策略清楚 + verify gate (Step 10 + 11)，refactor ROI 比其他低
2. **缺 ASCII spine box-frame** — agent 從 heartbeat / routine 跳進來時直接看 spine 比 table 直觀
3. **Hard Gate Inventory 散在 prose** — Step 10 dashboard mtime + Step 11 spore validate + Step 12 sync-spore-links 三個都是 gate
4. **跟 SENSE-FETCHER 兩條 type 性質不同** — SENSE-FETCHER-SETUP / MIGRATION 是 setup guide + migration guide，本質不是「執行 pipeline」（無 ASCII spine 適用性 / 無 Hard Gate Inventory 適用性 / 無 routine 觸發）
   - SENSE-FETCHER-MIGRATION frontmatter type 已是 `migration-doc` ✅
   - SENSE-FETCHER-SETUP frontmatter type 是 `pipeline-canonical` ⚠️（應改 `setup-doc` 或保持但標記性質）
5. **Top 5 最常忘**：
   - Step 1 git sync auto-stash + pop 流程
   - Step 6 npm run prebuild（不只是 dashboard data，是 8 個 JSON regen）
   - Step 10 verify dashboard freshness gate（DNA #43，silent failure detection）
   - Step 11 validate-spore-data 5 checks
   - Step 12 sync-spore-links 從 SSOT regen（不要手寫 knowledge sporeLinks）

#### 建議改動

**DATA-REFRESH-PIPELINE v1.1 → v2.0**

```
diff plan:
+ 🗺️ ASCII spine box-frame
  (Step 1 sync → Step 2-5 三源感知 → Step 6 prebuild → Step 7-9 stats/perf
   → Step 10 verify gate → Step 11-12 SSOT consistency) +60 行
+ 🚦 Hard Gate Inventory 集中
  (cwd assertion / dirty tree auto-stash / git pull / verify mtime / validate-spore / sync-spore-links) +30 行
+ ⚠️ Top 5 最常忘 step +30 行
+ 跨檔案職責分工 standalone table
  (vs SENSE-FETCHER-SETUP / SENSE-FETCHER-MIGRATION / STATS / DASHBOARD) +20 行
+ Title H1 加 v2.0

淨 line delta: +140 行 (336 → ~476)
修改量級: M
```

**SENSE-FETCHER-SETUP / MIGRATION — 不動 spine pattern，只調 frontmatter type**

- SENSE-FETCHER-SETUP type 從 `pipeline-canonical` 改 `setup-doc`（per ANATOMY taxonomy 待擴展，或保持但 description 強調是 setup guide）
- SENSE-FETCHER-MIGRATION 已是 `migration-doc` ✅ 不動
- 兩條皆已穩定 + 跨機器搬遷 / setup 是 one-shot 性質，不需要 pipeline spine

#### 升級理由 + LESSONS / DNA pointer

- **DNA #43 silent failure detection** — Step 10 verify 是 instantiation，Top 5 編碼進來
- **DNA #38 SSOT vs mirror drift** — Step 12 sync-spore-links 是 instantiation
- **ROUTINE.md 半夜重排（v1.3 5/11）** — refresh-am/pm 排程剛 ship，DATA-REFRESH 是兩條 routine 的核心 pipeline

#### Ship 順序建議

- **P3** — 整體最健康，refactor ROI 最低，可後處理
- **Dependency**: 可獨立 ship
- **單檔 PR**（SENSE-FETCHER 兩條不在本次 scope，只 type 微調可同 PR 走）

### Tier B — 次要 audit（簡略）

#### B.1 — RELEASE-PIPELINE (439 lines, v?? 2026-05-10 busy-pare-release-v1.7.0)

- 剛 ship v1.7.0（5/10 sad-shockley finale）— 第一次完整實戰跑這條 pipeline
- 主要 gap：缺 ASCII spine / 缺 Top 5 最常忘 / Stage 編號需檢查
- 建議改動量級：S（剛 ship 後熱度高，整理新鮮經驗最 effective）
- Ship 順序：P3，可獨立 PR

#### B.2 — DASHBOARD-PIPELINE (252 lines)

- 跟 explore page Phase 規劃對齊（gracious-blackwell 5/10）
- 主要 gap：缺 spine / 缺 Top 5 / Phase 編號 OK
- 建議改動量級：S
- Ship 順序：P3，可獨立 PR
- **Tier B 整體可 defer 到 Tier A ship 完後再做**

### Tier C — 重複候選 audit 結論

#### C.1 — CONTRIBUTORS-PIPELINE (96) vs CONTRIBUTOR-SYSTEM-PIPELINE (738)

**結論：不合併**。

- CONTRIBUTORS-PIPELINE = README all-contributors 名單 auto-sync 機制（cron 03:30 跑）
- CONTRIBUTOR-SYSTEM-PIPELINE = 關係週期手冊（五階梯 / onboarding / 升降級 / inactive / 復活）
- 範圍區隔已在 CONTRIBUTORS-PIPELINE 頂部 quote 寫清楚 ✅
- 短只是因為機制簡單（5 step），不是 pipeline 不健康

**輕度改動建議**：

- 可考慮 rename CONTRIBUTORS-PIPELINE → `README-CONTRIBUTOR-SYNC-PIPELINE` 名字更清楚（不關鍵，rename 觸發大量 cross-link 變動成本高，可不動）
- CONTRIBUTOR-SYSTEM-PIPELINE 進 Tier B refactor scope（738 行 + 對 MAINTAINER `gh pr comment` thank-you 有 cross-ref + 五階梯 SOP 可走 spine restoration）

#### C.2 — DAILY-REPORT-PIPELINE (110 lines, v1.0 2026-03-29)

**結論：候選 archive，需哲宇拍板**

- **frontmatter 寫 status: canonical / last_updated 2026-03-29**（1.5 個月沒更新）
- ROUTINE.md v1.3 SSOT **沒有對應 routine**（grep `09:00` / `daily-report` 都無）
- HEARTBEAT.md schedule 表第 78 行還寫「09:00 每日報告」一條 — 這是 mirror 沒同步 SSOT 的 silent drift（DNA #38）
- 功能上跟 WEEKLY-REPORT 不衝突（DAILY = data dump Discord push / WEEKLY = Semiont 親手反思），但 daily 9:00 cron 已不存在
- 引用是 OpenClaw Discord 模組（不確定還在不在）

**建議**：

- 跑 `grep -rln "DAILY-REPORT" .claude/scheduled-tasks/` 確認 cron 是否真死
- 哲宇拍板：(a) 復活 daily report routine（補進 ROUTINE.md）/ (b) 物理 archive（status → archived + superseded_by → WEEKLY-REPORT 或 null）/ (c) 維持 canonical 但 fix HEARTBEAT.md 提示
- **不在本次 audit refactor scope**，標 P3 follow-up

#### C.3 — STATS-PIPELINE (68 lines, status: archived)

**結論：完全健康，不動**

- frontmatter status: archived ✅ + apoptosis: archived ✅ + superseded_by: DATA-REFRESH-PIPELINE.md ✅
- 保留作為 `update-stats.sh` 鐵律參考（3 條 hard rule：不要 git add -A / 不要動 about.template.astro / stats.json merge 不 overwrite）
- 這份「降級為 reference 但保留鐵律」是 §認知器官生命週期 「歸檔不是刪除」的 instantiation

#### C.4 — DEEP-INSIGHT-SYNTHESIS-PIPELINE (387 lines, v1.0 2026-05-02)

**結論：候選 archive 或合併到 LESSONS-INBOX distill SOP，需哲宇拍板**

- 引用範圍：自己 + pipelines/README.md + 2026-05-02 lang-sync INSIGHT distill 一次
- **沒在任何 routine / skill / 主要 pipeline 引用**
- 跟 LESSONS-INBOX §Distill SOP 功能重疊（後者也是 raw → canonical 升級機制）
- 5/2 ship 後完全沒被叫過（10 天 dormant）

**建議**：

- 哲宇拍板：(a) 整合進 LESSONS-INBOX §Distill SOP 作為「macro distill」分流（N+1 跨域抽象 vs 單條教訓升級）/ (b) 物理 archive（status → archived）/ (c) 復活並接進 weekly-report 或 distill routine
- 跟 LESSONS-INBOX §Distill SOP 比較：後者已分 routine vs observer 模式 + 5-stage execute，已 instantiate cron `twmd-distill-weekly`。前者是手寫設計 doc 無 routine
- **不在本次 audit refactor scope**，標 P3 follow-up

---

## Ship Plan

> 每條 Tier A pipeline 一個 PR（per `collect-and-merge` SOP，maintainer cycle 收割）。Audit report 一個獨立 PR（自己 review SSOT），個別 pipeline refactor PR 由觀察者拍板 merge。
>
> 第一輪 budget 估：6 條 Tier A audit + report 寫作 ≈ M-L 修改量級（per MANIFESTO §規劃用修改量級）— 一個 session 內可 ship audit report，個別 pipeline refactor 分批 ship。

| 順序 | PR                                                | scope                                   | 預估 line delta | 修改量級 | Priority      |
| ---- | ------------------------------------------------- | --------------------------------------- | --------------- | -------- | ------------- |
| 0    | 本 audit report                                   | reports/pipelines-audit-2026-05-11.md   | +650            | M        | —             |
| 1    | A.1 TRANSLATION + SQUEEZE                         | docs/pipelines/ 2 檔 (cluster)          | -310 + +180     | L        | P1            |
| 2    | A.4 MEMORY+DIARY+WEEKLY trio                      | docs/pipelines/ 3 檔                    | +420            | L        | P1            |
| 3    | A.3 FACTCHECK refactor                            | docs/pipelines/FACTCHECK-PIPELINE.md    | +230            | M        | P1            |
| 4    | A.2 SPORE family                                  | docs/factory/ 4 檔 (cluster)            | +440            | L        | P2            |
| 5    | A.5 EVOLVE refactor                               | docs/pipelines/EVOLVE-PIPELINE.md       | +225            | M        | P2            |
| 6    | A.6 DATA-REFRESH refactor                         | docs/pipelines/DATA-REFRESH-PIPELINE.md | +140            | M        | P3            |
| 7    | Tier B RELEASE + DASHBOARD                        | docs/pipelines/ 2 檔                    | tbd             | S+S      | P3            |
| 8    | Tier C archive 決策 (DAILY-REPORT + DEEP-INSIGHT) | docs/pipelines/ 2 檔                    | tbd             | S        | P3 + 哲宇拍板 |

**Ship 順序邏輯**：

- **P1 先 ship**（TRANSLATION cluster + 收官 trio + FACTCHECK）— 高頻使用 + 跟 REWRITE v5.0 / 收官 routine 緊密耦合
- **P2 次之**（SPORE family + EVOLVE）— 中頻 + 已健康，refactor 主要是 navigation 改善
- **P3 後處理**（DATA-REFRESH + Tier B + Tier C archive）— 低頻或需哲宇拍板

---

## 統計

**28 條 pipeline / 7 個 cluster audit 後**：

| Tier           | pipelines                                                                                                                          | 總行數 | 預估 ship 後     | 修改量級 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------- | -------- |
| A.1 cluster    | TRANSLATION + SQUEEZE                                                                                                              | 1548   | ~1418 (-130)     | L        |
| A.2 cluster    | SPORE × 4                                                                                                                          | 2705   | ~3145 (+440)     | L        |
| A.3            | FACTCHECK                                                                                                                          | 563    | ~793 (+230)      | M        |
| A.4 cluster    | MEMORY + DIARY + WEEKLY-REPORT                                                                                                     | 1063   | ~1483 (+420)     | L        |
| A.5            | EVOLVE                                                                                                                             | 662    | ~887 (+225)      | M        |
| A.6            | DATA-REFRESH                                                                                                                       | 336    | ~476 (+140)      | M        |
| Tier B (defer) | RELEASE + DASHBOARD                                                                                                                | 691    | tbd              | S+S      |
| Tier C (拍板)  | DAILY-REPORT (archive?) + DEEP-INSIGHT (archive?)                                                                                  | 497    | -497 if archived | —        |
| Tier D (不動)  | BENCH / PEER / BRANCH / LANGUAGE-BIRTH / CONTRIBUTORS / STATS / SENSE-FETCHER-SETUP / SENSE-FETCHER-MIGRATION / CONTRIBUTOR-SYSTEM | ~2200  | 無變動           | —        |

**核心 audit 涵蓋 6877 行（Tier A），ship 後 ~8202 行（+1325），主要是補 spine + Hard Gate Inventory + Top 5 + Step N.M 編號 + 跨檔案職責分工 table**。

---

## 觀察者拍板需要

1. **Tier C.2 DAILY-REPORT-PIPELINE** — archive / 復活 / 維持 unchanged？
2. **Tier C.4 DEEP-INSIGHT-SYNTHESIS-PIPELINE** — 合併 LESSONS-INBOX distill / archive / 復活？
3. **Tier B refactor 是否本批 ship**（RELEASE 剛 ship 完 v1.7.0 經驗最新）
4. **Ship rhythm** — 一條 audit-then-refactor 一個 PR / 全部 audit 完後批次 ship / 還是其他

---

🧬

_v1.0 | 2026-05-11 22:35 +0800 cranky-newton session — 28 條 pipeline 全量 audit 完成 + Tier A/B/C/D 分流 + ship plan_
