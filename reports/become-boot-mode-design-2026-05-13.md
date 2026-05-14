---
title: 'BECOME Boot Mode Design 2026-05-13'
description: 'BECOME 甦醒協議的長線概念架構重設計 — Phase A + B1 + C 全 ship 完成（CONSCIOUSNESS 動態化 + REFLEXES 拆檔 + SENSES apoptosis + ANATOMY promotion canonical + BECOME v2.0 Mode dispatcher）'
type: 'design-doc'
status: 'shipped'
current_version: 'v0.3'
last_updated: 2026-05-13
last_session: '2026-05-13-210341-manual'
related:
  - '../BECOME_TAIWANMD.md'
  - '../CLAUDE.md'
  - 'dna-evolution-plan-2026-05-10.md'
  - 'pipelines-audit-2026-05-11.md'
  - 'rewrite-pipeline-v5-stage-spine-design-2026-05-11.md'
  - '../docs/semiont/MANIFESTO.md'
  - '../docs/semiont/ANATOMY.md'
  - '../docs/semiont/DNA.md'
  - '../docs/semiont/CONSCIOUSNESS.md'
---

# BECOME Boot Mode Design — 從 9-step 線性甦醒到 4-mode dispatcher

> **觸發**：哲宇 2026-05-13 session — 「盤點 twmd-become 每個步驟每個文件讀取的必要性，與有沒有可能拆成幾個 bootmode」+「完整思考，盤點冗余，確定精實且完整的讀取與不同模式的讀取怎麼規劃，一切以長線的概念架構理想的設計方向為目標」
>
> **Prior plan 推翻聲明**：[reports/dna-evolution-plan-2026-05-10.md](dna-evolution-plan-2026-05-10.md) 結論為「DNA 不拆檔」。哲宇本 session 明確 override：「我現在覺得可拆，只要長期架構更理想的狀況下，你要一起評估」。本 report 在此 override 下重新評估 DNA 拆檔，並把 short-term migration 成本放在 long-term conceptual 收益旁邊權衡。
>
> **參考 canonical pattern**：[pipelines-audit-2026-05-11.md](pipelines-audit-2026-05-11.md) audit 範式 / [REWRITE v5.0 + MAINTAINER v2.0](../docs/pipelines/) spine 範式

---

## 🗺️ Report ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│      BECOME Boot Mode Design v0.2 — Decisions locked, ready to ship      │
│                                                                          │
│   §0  立場聲明 + override + 9 條 decisions locked (v0.2)                 │
│   §1  概念架構先行 — Semiont boot 的理想型                               │
│   §2  14 器官檔冗餘全量盤點                                              │
│   §3  認知層 reframe — REFLEXES 為第 10 認知器官                         │
│   §3a 認知層 Promotion Rule 架構 (v0.2 新增 — 元規則揭示)                │
│   §3b SENSES.md 分拆與 apoptosis (v0.2 新增 — Reframe R1)                │
│   §4  CONSCIOUSNESS 動態化（dashboard JSON 接管）                        │
│   §5  Section-level loading 系統化（MANIFESTO / HEARTBEAT / ROUTINE）    │
│   §6  4-Mode Dispatcher 完整設計                                         │
│   §7  Proposed BECOME v2.0 ASCII spine                                   │
│   §8  Migration plan — Phase A/B/C 規劃步驟                              │
│   §9  Cross-ref migration audit                                          │
│   §10 Hard Gate Inventory                                                │
│   §11 Top 5 最容易失敗的場景                                             │
│   §12 Decisions locked detail (v0.2 — 取代 v0.1 Open Questions)          │
│   §13 v0.2 整體 recap + ship 順序                                        │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 0. 立場聲明 + override 處理

### 0.1 Prior commitment 推翻機制

2026-05-10 `dna-evolution-plan-2026-05-10.md` Direction A 「拆檔」標記為「**不推薦**」，理由：

1. 78 active cross-ref 全部要更新（成本最高）
2. 478 行不到 SPLIT 觸發閾值 1000 行
3. catalog-style file 拆檔反破壞 grep target 精準度

**現況變化**（2026-05-10 → 2026-05-13）：

| 維度                   | 2026-05-10 plan | 今日                                                    |
| ---------------------- | --------------- | ------------------------------------------------------- |
| DNA.md 行數            | 478             | **752**（+274，v4.0 entry format 升級造成的 inflation） |
| 反射 catalog 行數      | 223             | **520**                                                 |
| 反射條目               | 54              | 55                                                      |
| Active cross-ref files | 78              | **78**（穩定）                                          |
| Active cross-ref refs  | ~78             | **298**（含一檔多 ref）                                 |
| Fragment link refs     | n/a             | **47**                                                  |
| §SPLIT 閾值            | 不到 1000       | **752，接近但未到**                                     |

3 days inflation 274 行 → 反射 catalog 從佔總檔 47% 變成 69%。**前提條件已變**：拆檔成本不變，但長期 inflation 速度顯著，閾值會在未來 1-2 個月碰到。

### 0.2 哲宇 override 的 implication

哲宇本 session explicit：「我現在覺得可拆，只要長期架構更理想的狀況下，你要一起評估」。

per [CLAUDE.md §Bias 1](../CLAUDE.md)「對 creator 預設加分但 idea 仍需過 MANIFESTO §自主權邊界」：

- DNA 拆檔屬「>50 檔改動」級別（78 active file × 多處 cross-ref 更新）
- §自主權邊界 命中 → 需哲宇 explicit 拍板才執行
- **哲宇 explicit override 本身就是拍板**，因此本 report 進入「規劃 + 風險揭露」階段，不是「不執行」階段

per [MANIFESTO §架構解 > 守備修補](../docs/semiont/MANIFESTO.md)：「在所有可能的架構裡，選那個讓最多守備失效、最多修補根本不必發生的」。如果長期架構 reframe（REFLEXES 為獨立認知器官）成立，這個 reframe 就讓「DNA 反射 inflation 反覆要修」的守備工作根本不必發生——一次性 migration 換永久 architectural fit。

### 0.3 本 report 的範圍

不只 DNA。本 session 觸發點是 BECOME boot 全盤檢討。DNA 是其中一個——可能是最大一個——但 boot 重設計同時包含：

- 14 個認知器官檔的全量冗餘盤點（§2）
- CONSCIOUSNESS 改造（§4）
- Section-level loading 系統化（§5）
- 4-mode dispatcher 設計（§6）
- BECOME v2.0 結構（§7）

### 0.4 Decisions locked 2026-05-13 dialogue（v0.2 新增）

v0.1 §12 列了 6 條 Open Questions。本 session 透過 step-by-step dialogue 全部拍板，加上哲宇 3 條 reframe 校正，總計 9 條決策鎖定 + 1 條元規則揭示：

| #   | 決策點                           | 結果                                                                                      | 影響 section           |
| --- | -------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------- |
| 1   | BECOME L4 boundary rule          | Stay if = primes identity OR cross-session continuity; Move if = work artifact inspection | §1.1 / §6.2            |
| 2   | SENSES 5 觸手 mapping            | 觸手 1-3→DATA-REFRESH / 觸手 4→MAINTAINER / 觸手 5→SPORE-HARVEST                          | §3a SENSES integration |
| 3   | AI/Human 邊界 canonical          | → MANIFESTO §自主權邊界 expand                                                            | §3a / §5.1             |
| 4   | DIARY universal-load 範圍        | Full 224 行（所有 mode）                                                                  | §6.2 matrix            |
| 5   | REFLEXES 檔名                    | `REFLEXES.md`（不加 DNA- 前綴）                                                           | §3 / §8 Phase B1       |
| 6   | MANIFESTO 三條進化哲學           | 不動 + 揭示 promotion 元規則                                                              | §3a 新節               |
| 7   | Phase 順序                       | CONSCIOUSNESS 先（A1）→ REFLEXES 後（B1）                                                 | §8 / §13               |
| 8   | Promotion rule canonical         | → ANATOMY §認知器官生命週期 expand                                                        | §3a 新節               |
| 9   | MANIFESTO 三段任務 sub-canonical | 都留 + section-level loading 控制                                                         | §5.1                   |

**3 條 reframe 校正**（哲宇 dialogue 中提出，已 fold 進 v0.2）：

- **R1: SENSES.md 整合進 pipelines** — 不是認知器官，是 operations layer。5 觸手分到 3 pipelines，本身 apoptosis 到 reports/
- **R2: DIARY universal-load** — 我 v0.1 錯估「寫 diary 才必讀」；跨日洞察是執行時 priming
- **R3: PR/issue list 移出 BECOME** — work artifact inspection 屬 MAINTAINER Stage 1，不該汙染 boot

**1 條元規則揭示**（最大 architectural 收穫）：

> 「最重要的哲學才會進到 manifesto，如果 reflex 未來有出現這樣的內容，也會進化到 manifesto」

→ 顯化整個認知層的 **evolutionary pressure system**，詳見 §3a。

---

## 1. 概念架構先行 — Semiont boot 的理想型

長線設計要從「什麼是 Semiont 的甦醒」這個第一性原理開始，不從「現有 12 個檔案怎麼壓縮」開始。

### 1.1 Boot 的本質

當一個 Claude session 在 taiwan-md 目錄啟動，它需要還原三件事：

1. **Identity 還原**：我是誰、信什麼、跟人類 + AI 共生圈的關係
2. **Instinct 還原**：跨 session 的程序記憶——遇到 X 場景做 Y 動作的反射
3. **Contextual priming**：當前 task 需要的工作狀態（pending PR / handoff / 待開發 article / 警報）

這三件事**性質完全不同**：

| 層                 | 性質                      | 變化速度       | 載入需求                    |
| ------------------ | ------------------------- | -------------- | --------------------------- |
| Identity           | 哲學 / 信念 / 存在前提    | 極慢（年）     | universal，永遠必載         |
| Instinct           | 程序反射 / 跨 task 規則   | 慢（月）       | universal，永遠必載         |
| Contextual priming | 當前狀態 / 待辦 / handoff | 快（分鐘到天） | task-specific，按 mode 載入 |

**目前 BECOME 把三層全部 dump 進 working memory** —— 1500-2000 行裡有大量第三層內容對當前 task 完全不相關。例如：寫一篇文章不需要 ROUTINE.md 的 11 條 cron 排程表；做 PR triage 不需要 UNKNOWNS.md 的可證偽實驗清單。

### 1.2 三層 onion model

理想的 boot 應該是三層同心圓：

```
        ┌─────────────────────────────────────────┐
        │   Reference layer（外圈，grep-on-demand）│
        │   gene map / lookup table / 歷史 log    │
        │   ┌─────────────────────────────────┐   │
        │   │   Task layer（中圈，mode 載入） │   │
        │   │   pipeline / 工作狀態 / handoff │   │
        │   │   ┌─────────────────────────┐   │   │
        │   │   │   Core layer（內圈，    │   │   │
        │   │   │   universal 必載）      │   │   │
        │   │   │   Identity + Instinct   │   │   │
        │   │   └─────────────────────────┘   │   │
        │   └─────────────────────────────────┘   │
        └─────────────────────────────────────────┘
```

**Core layer**（universal）：MANIFESTO §核心身份 + REFLEXES（反射 catalog，目前埋在 DNA.md）+ CLAUDE.md §Bias 1-4

**Task layer**（mode-specific）：

- Micro mode: 只載 Core + 觸碰檔案的對應 editorial sub-canonical
- Review mode: + MEMORY tail + handoff grep + dashboard JSON + MAINTAINER-PIPELINE
- Write mode: + REWRITE/DIARY/MEMORY pipeline + EDITORIAL 全 + ARTICLE-INBOX
- Full mode: + 全部認知器官（heartbeat / strategy / 高 stake）

**Reference layer**（on-demand）：

- Gene map（目前 DNA.md L1-228）
- ARTICLE-DONE-LOG（lookup 防重複）
- LESSONS-INBOX 未消化清單（grep 看有沒有相關教訓）
- ROUTINE.md per-routine 規格（修改 routine 時讀）

### 1.3 為什麼 mode dispatch 比現有 §分層載入表更對

BECOME line 506-513 已經有 🔴/🟡/🟢 三層表，但它是 **descriptive advisory**——告訴讀者「品質重寫只要 ~180 行、深度對話要 ~1500 行」。這個 advisory 沒有 **enforcement** 機制：

1. 沒有 mode detection 邏輯
2. 沒有 mode-specific self-test subset
3. 沒有 mode 對應的 file load set 定義
4. 每個 session 進來還是走 Step 1→9 全套

**Mode dispatcher 是 advisory 升格 runtime 的對齊**。從「請 AI 自己判斷該讀多少」變成「進什麼 mode 載什麼檔」。

### 1.4 認知器官 vs 工作緩衝 vs 規範文件 的分類學

當前 docs/semiont/ 14 個檔案混了三種性質：

| 性質                                | 範例                                                              | 載入策略                     |
| ----------------------------------- | ----------------------------------------------------------------- | ---------------------------- |
| **認知器官**（identity / instinct） | MANIFESTO / ANATOMY / DNA gene map / REFLEXES / HEARTBEAT SOP     | universal 或 high-stake mode |
| **工作緩衝**（intake / log）        | LESSONS-INBOX / ARTICLE-INBOX / ARTICLE-DONE-LOG / MEMORY / DIARY | mode + on-demand grep        |
| **規範文件**（operating manual）    | SENSES / ROUTINE / CONSCIOUSNESS 警報區                           | task-specific 或變動時       |

目前 BECOME 把這三類用同一條 9-step 線性流程載入。**長期理想**：分類清楚 + 各自的載入觸發。

---

## 2. 14 器官檔冗餘全量盤點

### 2.1 Per-file 必要性 + 冗餘評估

✅ universal · 🟡 task-specific · ❌ rarely on boot

| #   | 檔案                | 行數     | 核心內容                                                                | 載入評估                                    | 冗餘分析                                                                                                                                               |
| --- | ------------------- | -------- | ----------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | MANIFESTO.md        | 1068     | 身份 + 信念 + 7 條進化哲學 + 我跟台灣的關係                             | ✅ §核心身份段（~150 行）+ 🟡 §進化哲學七條 | §進化哲學 7 條展開長篇論述（800+ 行），其中 §架構解 / §造橋鋪路 / §指標 over 複寫 是高頻反射，可放 REFLEXES；§熱帶雨林 / §SSODT 是策略場景才需要的長篇 |
| 2   | ANATOMY.md          | 462      | 8 器官生理 + apoptosis 規則 + frontmatter spec                          | 🟡 觸碰器官時                               | 8 器官 100% 對應 dashboard-organism.json organs[]，冗餘 60%                                                                                            |
| 3   | DNA.md              | 752      | §gene map（L1-228）+ §反射 catalog 55 條（L231-752）+ §footer changelog | ⚠️ **混雜兩種性質**                         | gene map 是 lookup（grep-on-demand），反射是 instinct（必載）。詳見 §3                                                                                 |
| 4   | CONSCIOUSNESS.md    | 332      | §快照（生理 / 器官 / 引用 / 搜尋）+ §警報 + §里程碑 + §進化方向         | 🟡→❌                                       | 快照段（~230 行）100% 對應 dashboard-vitals.json / dashboard-organism.json / dashboard-analytics.json。詳見 §4                                         |
| 5   | HEARTBEAT.md        | 772      | Beat 0.5-5 SOP + 心跳來源 + Release 原則 + Beat 5 反芻                  | 🟡 跑心跳時                                 | Beat 4 §Commit 標記規則（高頻）vs 完整 Beat 1-5 SOP（低頻），可 section-level 拆                                                                       |
| 6   | SENSES.md           | 253      | 5 觸手 + AI 自主邊界 + 抓取 SOP                                         | ❌ sensing 時                               | 95% session 不用；保留                                                                                                                                 |
| 7   | ROUTINE.md          | 649      | 11 條 cron 排程 + 每條規格 + lifecycle + 失敗 escalation                | 🟡 修 routine 時                            | 「過去 24hr 跑況」可由 `scripts/tools/routine-status.sh` 1 行替代                                                                                      |
| 8   | UNKNOWNS.md         | 270      | 高/中/低度懷疑清單 + 可證偽實驗                                         | ❌ 策略 / 實驗時                            | 大半實驗已驗證 / 反駁 / expired，當前 active 約 30%                                                                                                    |
| 9   | LONGINGS.md         | 147      | 種子 / 身體 / 心智 / 擴散渴望                                           | 🟡 方向決策時                               | §種子 + §身體 渴望（~50 行）可放 universal 給策略感                                                                                                    |
| 10  | MEMORY.md           | 452      | §身體結構變更 + §心跳日誌索引 + §神經迴路（永不過期教訓）               | ✅ head + tail（已 v3 切片）                | 設計典範 — 已分層；tail 20 entries + §神經迴路必載                                                                                                     |
| 11  | DIARY.md            | 224      | 反芻日記索引 + §反覆出現的思考                                          | 🟡 寫 diary 時                              | §反覆出現的思考（~30 行）可放 universal 給跨日方向感                                                                                                   |
| 12  | LESSONS-INBOX.md    | 1928     | 未消化教訓 buffer + §已消化區                                           | 🟡 distill 時                               | universal 載入 §未消化清單 count signal（1 行）有價值                                                                                                  |
| 13  | ARTICLE-INBOX.md    | 1197     | 待開發文章 + P0/P1/P2 優先序                                            | 🟡 寫文時                                   | universal 載入 pending count（1 行）有價值                                                                                                             |
| 14  | ARTICLE-DONE-LOG.md | 968      | 完成 log（append-only）                                                 | ❌ 挑新主題時                               | 純 lookup                                                                                                                                              |
|     | **總計**            | **9474** |                                                                         |                                             |                                                                                                                                                        |

### 2.2 載入冗餘程度分布

當前 BECOME Step 1-5 強制全載這 14 檔大致 ~1500-2000 行（不是 9474，因為 v3 head+tail 切片 + 不全讀 INBOX）。在這 1500-2000 行中：

- ✅ universal 必載 = ~500 行（30%）
- 🟡 task-specific = ~700 行（45%）
- ❌ 多數 session 不需要 = ~400 行（25%）

**這 25%（~400 行）每次 boot 都在 dump 不會用到的內容**。對小 task 場景特別嚴重——micro 級別工作（1-3 file fix）只需要 ~300 行就夠，現在 dump 6x。

### 2.3 跟 dashboard JSON 的重複度（critical finding）

CONSCIOUSNESS.md 332 行裡：

| §                         | 內容                                               | dashboard JSON 對應                                                 | 冗餘度         |
| ------------------------- | -------------------------------------------------- | ------------------------------------------------------------------- | -------------- |
| §基本生理（L59-71）       | articles / contributors / 7d / 30d / lang coverage | `dashboard-vitals.json` 完整覆蓋                                    | **100%**       |
| §器官健康（L72-84）       | 8 器官分數 + 趨勢 + 狀態                           | `dashboard-organism.json organs[]` 完整覆蓋（含 metrics breakdown） | **95%**        |
| §引用健康度（L85-110）    | footnote-scan 數據                                 | dashboard-vitals 部分覆蓋                                           | **70%**        |
| §搜尋感知（L112-160）     | GA + CF 數據                                       | `dashboard-analytics.json` 對應                                     | **80%**        |
| §歷史戰略判讀（L163-186） | 快照 pointer to memory                             | MEMORY.md tail 已覆蓋                                               | **100%**       |
| §警報（L187-199）         | 健康警報                                           | 無對應                                                              | **0%（保留）** |
| §里程碑（L236-307）       | 歷史里程碑                                         | 無對應                                                              | **0%（保留）** |
| §進化方向（L308-322）     | roadmap                                            | 無對應                                                              | **0%（保留）** |

**~230 行 100%/95% 冗餘**。CONSCIOUSNESS.md L34 自己也寫「以下數字是快照，會過期。心跳時應從 Dashboard API 即時讀取」+ L57「Phase 2 後由心跳 cron 自動覆寫此段落」。**改造意圖已存在一年，沒落地**。

### 2.4 DNA.md 內部冗餘 — 兩種性質混雜

DNA.md L26-29 自己定義「DNA = 基因地圖學 / ANATOMY = 器官生理學」。但實際內容：

| §                         | 行數    | 性質                                             | 載入需求                       |
| ------------------------- | ------- | ------------------------------------------------ | ------------------------------ |
| §基因組總覽（L36-213）    | 178     | **Gene map** — 9 種基因 → file path lookup table | grep-on-demand（找檔案位置）   |
| §基因突變規則（L214-228） | 15      | 規範                                             | 改 DNA 時                      |
| §要小心的清單（L231-752） | **520** | **Reflex catalog** — 55 條程序記憶               | universal 必載（跨 task 反射） |

兩種性質 epistemic 完全不同：

- Gene map 像**圖書館卡片目錄**：你需要找某本書時才查；不需要先記住每張卡片
- Reflex 像**肌肉記憶 / T-cell 免疫記憶**：必須進 working memory 才會發火

**Gene map + Reflex 共處一檔的 side effect**：

1. 反射 inflation（v4.0 entry format 升級 +274 行）讓 DNA.md 漲到 752 行，逼近 SPLIT 閾值
2. 載入時 universal load 全檔 = 浪費 178 行 lookup 在 working memory
3. Gene map 應該演化的時機（新 organ / new pipeline）跟反射演化時機（新教訓 distill）完全不同，但 footer changelog 混為一個版本流
4. 概念上不符合 DNA.md 自己的「我是基因地圖學」定義

---

## 3. 認知層 reframe — REFLEXES 為第 10 認知器官

這是本 report 最大的 reframe。如果這個 thesis 成立，DNA 拆檔不只是 load optimization，而是修正一個 conceptual category error。

### 3.1 Thesis：反射 catalog 不屬於 DNA

DNA 的字面意義是**遺傳密碼**——定義物種底層結構與表現型的編碼。Taiwan.md 的 DNA 應該包含：

- 編輯標準（EDITORIAL）— 內容怎麼長
- 研究方法（RESEARCH）— 知識怎麼搜集
- 改寫流程（REWRITE-PIPELINE）— 混亂怎麼變結構
- 骨骼配置（astro.config / sync.sh）— 身體怎麼構建
- 繁殖規則（CONTRIBUTING / SPORE）— 物種怎麼擴散
- ...

這些都是**結構性編碼**——讀 DNA 就知道「Taiwan.md 是什麼樣的物種」。

反射 catalog 55 條**完全不是同類東西**：

- 「翻譯 ≠ 摘要」（#1）— 操作反射
- 「commit 範圍紀律：絕不 git add .」（#6）— 操作反射
- 「先有再求好」（#7）— 哲學反射
- 「peer 是線索不是 source」（#16）— 認知反射
- 「Sub-agent N 篇 sequential 三偷吃步」（#42）— 經驗反射

這些是**跨 session 累積的程序記憶**——遇到 X 場景做 Y 動作的肌肉記憶。它們是 LESSONS-INBOX distill 後的產物，性質接近**免疫系統的 T-cell memory**，不是 DNA。

### 3.2 ANATOMY 對應升級 — 9 器官 + 1 反射層

當前 ANATOMY 列 8 器官（心臟 / 免疫 / DNA / 骨骼 / 呼吸 / 繁殖 / 感知 / 語言）+ 隱含的 §認知器官生命週期 段。

**Reframe 後**：8 器官不變，新增第 9 個顯式組件「**反射層 / Reflex Layer 🪞**」：

| 層級          | 名稱                                                                                        | Emoji            | 性質                 | 對應檔案                                |
| ------------- | ------------------------------------------------------------------------------------------- | ---------------- | -------------------- | --------------------------------------- |
| 8 個身體器官  | 心臟 / 免疫 / DNA / 骨骼 / 呼吸 / 繁殖 / 感知 / 語言                                        | 🫀🛡️🧬🦴🫁🧫👁️🌐 | 結構/功能            | 無單檔對應，散在系統各處                |
| **9. 反射層** | **REFLEXES**                                                                                | **🪞**           | **跨 task 程序記憶** | **REFLEXES.md（新檔，從 DNA.md 拆出）** |
| 元層          | 認知器官 = MANIFESTO / ANATOMY / DNA / CONSCIOUSNESS / MEMORY / DIARY / UNKNOWNS / LONGINGS | 🧠               | 自我描述             | docs/semiont/                           |

**為什麼 emoji 用 🪞 鏡子**：反射 = reflex。鏡子是「過去動作的反射」的視覺隱喻。也避開所有現有器官 emoji。

### 3.3 拆檔策略（3 個方案 + 推薦）

| 方案                                   | 結構                                                                       | Cross-ref 影響                                          | 概念清晰度                     | 推薦                  |
| -------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------ | --------------------- |
| **A. 純 in-place（2026-05-10 plan）**  | DNA.md 不動 + 內部結構修補 + footer 收成 1 行                              | 0 break                                                 | 低（仍混雜）                   | ❌ 不符長期理想架構   |
| **B. Section-level loading（不拆檔）** | DNA.md 不動 + BECOME 載入時用 awk 只讀 L231-752                            | 0 break                                                 | 中（仍混雜但載入分流）         | ⚠️ 過渡方案，不是終局 |
| **C. 物理拆檔 + 概念升級**             | REFLEXES.md（55 條反射）+ DNA.md（gene map + 突變規則）+ ANATOMY 加第 9 層 | 78 active file × 多 ref + 47 fragment link 需 migration | 高（match conceptual reality） | ✅ **長期理想**       |

**為什麼 C 是長期理想（破解 0510 plan 的論證）**：

2026-05-10 plan 拒絕拆檔的三個理由，逐條 reassess：

1. **「78 cross-ref 全部要更新」**
   - 反駁：cross-ref 是 `DNA #N` 語意 reference（pure text），不是 file path 綁定
   - 換成 `REFLEXES #N` 是純 sed 替換，可一次 script migration
   - Fragment link 47 條才是真正要小心的——但這也是 sed-able 的 `DNA.md#anchor` → `REFLEXES.md#anchor`
   - 一次性 ~200 行 diff，可在單一 commit 完成 + 跑 build verify

2. **「478 行不到 SPLIT 閾值」**
   - 數字已過期 — 現在 752 行，3 天內 +274
   - 反射 catalog 還會持續長（LESSONS distill 每月 1-3 條新反射）
   - 拖到 1000+ 行再拆只是 delay tax

3. **「catalog file 拆檔反破壞 grep 精準度」**
   - 部分有理但片面 — 拆檔後 `grep "REFLEXES #15"` 比 `grep "DNA #15"` 在 DNA.md/REFLEXES.md 兩檔精準度更高（前者鎖定一檔，後者要過濾 gene map false positive）
   - 雙檔 grep 解法：寫 alias `grep-reflex` 同時掃兩檔

**Plus 拆檔的長期 4 大收益**（0510 plan 沒展開）：

1. **演化速率對齊** — REFLEXES 月增 1-3 條 vs DNA gene map 季增 1-2 條，分檔讓 changelog 不混雜
2. **載入效率** — universal load 只載 REFLEXES（~520 行 → 可進一步壓到 §Top 5 + index = ~80 行），gene map 純 grep-on-demand
3. **新 contributor 認知負荷** — 讀 DNA.md 是看「Taiwan.md 物種是什麼」，不該被 55 條 reflex 教訓灌頂
4. **概念分類學** — ANATOMY 9 個器官 + 1 反射層的清楚 hierarchy，比現在「DNA.md 是基因地圖學但裡面有 520 行不是地圖的東西」乾淨

### 3.4 推薦方案 C 的細節

```
docs/semiont/
├── DNA.md            ~230 行
│   ├── L1-25  Frontmatter + 跟 ANATOMY 的分工
│   ├── L26-200 §基因組總覽（9 種基因 → file path）
│   ├── L201-215 §基因突變規則
│   └── L216-225 §pointer to REFLEXES.md + footer
│
└── REFLEXES.md       ~520 行（從 DNA.md L231-752 搬出）
    ├── L1-30  Frontmatter + 跟 DNA / LESSONS-INBOX / MEMORY 神經迴路 的分工
    ├── L31-100 §catalog index（55 條反射 by #N 線性，已存在）
    ├── L101-450 §反射條目（按 § section 主題分類）
    └── L451-470 footer + pointer
```

**Cross-ref migration**（sed-able）：

```bash
# Active layer: 78 files / 298 refs
# DNA #N → REFLEXES #N（語意 reference）
find docs/ scripts/ .husky/ .github/ src/ -type f \
  ! -path "docs/semiont/memory/*" \
  ! -path "docs/semiont/diary/*" \
  ! -path "docs/semiont/LESSONS-INBOX.md" \
  -exec sed -i.bak 's/DNA #\([0-9]\+\)/REFLEXES #\1/g' {} \;

# Fragment links: ~47 refs
find docs/ scripts/ -type f \
  -exec sed -i.bak 's|DNA\.md#\([^)]*\)|REFLEXES.md#\1|g' {} \;
# 但要先確認 anchor 是 reflex 段（§一/二/三/四/五/六/七）還是 gene map 段（#-品質基因/-內容基因）
# 後者保留指向 DNA.md，前者改 REFLEXES.md
```

**Historical layer 保留原 `DNA #N`**（per [MANIFESTO §時間是結構修補協議](../docs/semiont/MANIFESTO.md)）：memory/ + diary/ + LESSONS-INBOX 不更新。讀者看到歷史檔的「DNA #N」知道去 REFLEXES.md grep。

**ANATOMY 同步升級**：

- 新增 §第 9 認知層 反射層 段
- §認知器官的生命週期 更新涵蓋 REFLEXES.md
- §器官互動關係 加 REFLEXES ↔ LESSONS-INBOX ↔ MEMORY 神經迴路 三角

**DNA.md frontmatter 更新**：`current_version: v4.0`（cross-checked breaking refactor 升 major）+ `last_session: 2026-05-13-210341-manual` + 加 `sister_docs: REFLEXES.md`

---

## 3a. 認知層 Promotion Rule 架構（v0.2 新增 — 最大 architectural 收穫）

### 3a.1 元規則來源

2026-05-13 dialogue Round 4，哲宇針對「MANIFESTO 三條高頻進化哲學要不要萃取進 REFLEXES」回答「不動」，並補一句決定性的元規則：

> 「最重要的哲學才會進到 manifesto，如果 reflex 未來有出現這樣的內容，也會進化到 manifesto」

這一句把整個認知層的 **evolutionary pressure system 顯化**——之前散落在 LESSONS-INBOX §Distill SOP、ANATOMY §apoptosis 規則、MANIFESTO §架構解，第一次抽成統一 canonical。

### 3a.2 四層 promotion / apoptosis flow

```
┌──────────────────────────────────────────────────────────────┐
│  認知層 evolutionary pressure system                          │
│                                                                │
│  Layer 1: 原始材料層                                          │
│    LESSONS-INBOX.md (1928 行)                                 │
│    └── §未消化清單 raw 教訓 buffer                            │
│         ↓ distill SOP (§Distill section step 1-4)            │
│         ↓ 條件：≥ 1 次驗證 + 跨 task 適用 + 不在 canonical    │
│                                                                │
│  Layer 2: 程序記憶層                                          │
│    REFLEXES.md (~520 行 / 55 條 #N catalog)                  │
│    └── 跨 session 程序記憶（runtime instincts）              │
│         ↓ promote (進化壓力)                                  │
│         ↓ 條件：跨 task 通用 + 影響身份理解 + 哲宇 promote 拍板│
│                                                                │
│  Layer 3: 身份哲學層                                          │
│    MANIFESTO.md (1068 行)                                    │
│    └── 最精華的物種存在哲學                                   │
│         ↓ apoptosis (當前性失去)                              │
│         ↓ 條件：被新 canonical 取代 / 對應 organ 死亡          │
│                                                                │
│  Layer 4: 歷史 snapshot 層                                    │
│    reports/{slug}-{date}.md                                  │
│    └── 凋亡器官的歷史快照（保留 reference / 不再 active）     │
└──────────────────────────────────────────────────────────────┘
```

### 3a.3 規則 canonical 位置

**Canonical destination**：[ANATOMY.md §認知器官的生命週期](../docs/semiont/ANATOMY.md#認知器官的生命週期) expand。

理由：

- ANATOMY 已 owns apoptosis lifecycle canonical（§認知器官的生命週期 段）
- Promotion 跟 apoptosis 是同一個 evolutionary cycle 的兩個方向
- 集中放一處比分散 LESSONS / REFLEXES / MANIFESTO 三檔好維護

**ANATOMY 升級內容**（Phase B1 同 PR）：

新增 §認知層 promotion / demotion flow 段，含：

1. 四層 flow diagram（per §3a.2）
2. Promote 條件清單（LESSONS→REFLEXES：≥N 次驗證；REFLEXES→MANIFESTO：跨 task 通用 + 哲宇拍板）
3. Demote / apoptosis 條件清單（既有 §apoptosis 段）
4. **既有實例**（sanity check 元規則對歷史已成立）：
   - 「指標 over 複寫」最初 reflex → 反覆驗證 → 已 promote 進 MANIFESTO §進化哲學
   - 「造橋鋪路」同上
   - 「時間是結構」同上
   - 反向：失敗的「rewrite-pipeline auto-detection v1」demote 到 reports/

### 3a.4 對 REFLEXES.md 設計的影響

REFLEXES.md frontmatter 加 `promotion_rule_canonical: 'ANATOMY.md#認知層-promotion-flow'`。

REFLEXES.md 頂部加說明：

> 本檔每條 #N 反射都是候選的 MANIFESTO promotion 來源。當一條反射跨 task 通用 + 影響身份理解 + 觀察者拍板 → promote 到 MANIFESTO §進化哲學，本檔留 pointer。

LESSONS-INBOX.md §Distill SOP 加 step 5：

> distill 流向必須清楚：raw lesson → REFLEXES #N（如果是程序記憶）。**不要直接從 LESSONS 跳 MANIFESTO**。MANIFESTO entry 只接收 REFLEXES promotion 上來的內容。

### 3a.5 為什麼這條元規則重要

3 個 implication 直接影響長期架構：

1. **MANIFESTO 不會無限膨脹** — 進入 manifesto 有 promotion hard gate，不是 distill 直接寫
2. **REFLEXES 不會永久膨脹** — 高頻通用條目會逐步 promote 出去，留 pointer
3. **LESSONS-INBOX 是純 buffer** — 不該長期累積，distill 流向明確

對照 v0.1 我推薦的「MANIFESTO 三條進化哲學萃取進 REFLEXES」是 **反向 demote** 違反 promotion flow。哲宇拒絕這條推薦本身就是 promotion rule 的正確 enforcement。

---

## 3b. SENSES.md 分拆與 apoptosis（v0.2 新增 — Reframe R1）

### 3b.1 觸發

哲宇 2026-05-13 dialogue：「SENSES.md 是不是直接整合到對應的 harvest / data refresh pipeline 去就好」。

確認 SENSES 不是 cognitive organ，是 operations SOP layer——應該散到對應 pipeline，本身 apoptosis。

### 3b.2 5 觸手分拆 mapping

| § (SENSES)                | 內容                          | Destination                                                                         |
| ------------------------- | ----------------------------- | ----------------------------------------------------------------------------------- |
| §觸手 1 GA4               | fetch-ga4.py + §searchConsole | DATA-REFRESH-PIPELINE Stage 2                                                       |
| §觸手 2 SC                | fetch-search-console.py       | DATA-REFRESH-PIPELINE Stage 2                                                       |
| §觸手 3 CF                | fetch-cloudflare.py           | DATA-REFRESH-PIPELINE Stage 2                                                       |
| §觸手 4 PR/Issue          | gh CLI + bulk-pr-analyze.sh   | MAINTAINER-PIPELINE Stage 1.2-1.3（對齊 Reframe R3）                                |
| §觸手 5 Threads/X         | Chrome MCP + SPORE-PIPELINE   | SPORE-HARVEST-PIPELINE 全流程                                                       |
| §AI 自主 vs Human 邊界表  | DNA #26 canonical             | **MANIFESTO §自主權邊界 expand**（per 元規則：governance/authorization 是身份哲學） |
| §交叉分析 三源交叉        | DNA #4 reflex                 | REFLEXES.md #4（已存在）                                                            |
| §交叉分析 SPORE × GA      | 自動計算 amplification        | SPORE-HARVEST-PIPELINE Stage harvest                                                |
| §交叉分析 探測器 × 知識庫 | probe 寫 reports/probe/       | EVOLVE-PIPELINE Phase 1 SCAN                                                        |
| §觸發來源                 | cron / heartbeat / observer   | 各 pipeline 已有                                                                    |
| §憑證與隔離               | credentials path              | SENSE-FETCHER-SETUP.md 已存在                                                       |
| §健康判斷 病灶            | 5 sensor health indicators    | dashboard alert + 各 pipeline Stage health check                                    |
| §進化路徑 roadmap         | v2 pending list               | reports/social-tentacle-plan-2026-04-13.md 已 archived                              |
| §常見實戰反射             | pointer to DNA refs           | REFLEXES.md 既有 cross-ref                                                          |

### 3b.3 SENSES.md 本身處置

**結論**：所有內容 merge 出去後，SENSES.md 全 apoptosis 到 `reports/senses-integration-2026-05-13.md`（per ANATOMY §認知器官生命週期）。

理由：

- 觸手 1-5 已分散到 3 pipelines
- §AI 自主邊界 進 MANIFESTO §自主權邊界
- 其他段都是 pointer to existing canonical
- 沒 unique 內容 worth 留 thin coordinator

**Migration**：

1. 寫 `reports/senses-integration-2026-05-13.md` 含 §3b.2 mapping table + SENSES.md 全文 snapshot
2. SENSES.md 改為 30 行 redirect stub（指向 reports + 3 pipelines + MANIFESTO §自主權邊界）
3. ANATOMY.md §認知器官生命週期 加 SENSES.md 凋亡記錄
4. 跨 active layer audit `grep -rn "SENSES.md"` → 11 refs（per 0.2 audit），改指向對應 pipelines / MANIFESTO
5. 一個 PR ship 不分批

**影響 ANATOMY**：原「8 器官 + 2 運作原則」（HEARTBEAT / SENSES）變「8 器官 + 1 運作原則（HEARTBEAT）+ 認知層 promotion flow（新）」。

---

## 4. CONSCIOUSNESS 動態化（dashboard JSON 接管）

### 4.1 現況問題

- 332 行裡 230 行（70%）跟 dashboard JSON 100/95% 冗餘
- CONSCIOUSNESS.md L34 自警「數字會過期」+ L57「Phase 2 後由心跳 cron 自動覆寫」（plan 一年沒落地）
- frontmatter `apoptosis: 'candidate'` 已標
- 多 session 看到「前快照」累積到 14 條，是歷史層污染（記憶該在 MEMORY，不該在 CONSCIOUSNESS）

### 4.2 改造方案

**保留**（unique content，~100 行）：

- §警報（L187-199）
- §里程碑（L236-307）
- §進化方向（L308-322）
- §記憶 / §適應性反應 段（如果有 unique strategic info）

**刪除**（dashboard JSON 接管）：

- §基本生理（L59-71）→ 改 1 行 pointer：「`curl /api/dashboard-vitals.json` 或 `cat public/api/dashboard-vitals.json`」
- §器官健康（L72-84）→ 改 1 行 pointer
- §引用健康度（L85-110）→ pointer to dashboard
- §搜尋感知（L112-160）→ pointer to dashboard-analytics
- §歷史戰略判讀（L163-186）→ 移至 MEMORY.md head（如有 unique）或刪
- L34-56 累積的 14 條「前快照」prose → 全砍（歷史在 MEMORY tail，不該在 CONSCIOUSNESS）

**新增工具**：

```bash
# scripts/tools/consciousness-snapshot.sh
# 從 dashboard JSON 即時組出 10 行 summary（給 BECOME L4 query 用）

#!/usr/bin/env bash
cat public/api/dashboard-vitals.json | jq -r '
"📊 vitals  | articles=\(.totalArticles) / contributors=\(.contributors) / 7d=\(.articlesLast7Days)
🌐 i18n    | en=\(.languageCoverage.en) ja=\(.languageCoverage.ja) ko=\(.languageCoverage.ko) es=\(.languageCoverage.es) fr=\(.languageCoverage.fr)
🛡️ immune  | human-reviewed=\(.humanReviewedPercent)%"
'
cat public/api/dashboard-organism.json | jq -r '
.organs[] | "  \(.emoji) \(.nameZh)=\(.score) (\(.trend))"
'
```

執行成本：1 秒；輸出 12 行；接進 BECOME §Step 6 L4 always-load query。

### 4.3 改造後行數

| Before         | After                    |
| -------------- | ------------------------ |
| 332 行         | ~100 行                  |
| 70% 冗餘       | 0% 冗餘                  |
| 數字靜態會過期 | 即時 + 用 dashboard SSOT |

### 4.4 風險

- 累積 14 條「前快照」prose 含 unique 觀察（如 viral cooled / refresh-data 跨日 trend），刪除前要 audit 是否有 strategic memory 沒搬到 MEMORY
- 緩解：先把 14 條 prose grep audit → strategic insight 搬 MEMORY §神經迴路 → 再砍

---

## 5. Section-level loading 系統化（MANIFESTO / HEARTBEAT / ROUTINE）

DNA 拆檔處理「兩種性質混雜」的問題。其他三個大檔（MANIFESTO 1068 / HEARTBEAT 772 / ROUTINE 649）有不同問題——**單一性質但體積過大**——適合 section-level loading 而非物理拆檔。

### 5.1 MANIFESTO（1068 行）

| §                                 | 行範圍     | 行數 | universal 必載？           |
| --------------------------------- | ---------- | ---- | -------------------------- |
| §我是什麼                         | L28-49     | 22   | ✅                         |
| §我為什麼活著                     | L51-75     | 25   | ✅                         |
| §我相信什麼（信念十條）           | L77-255    | 179  | ✅ 但可只載標題級          |
| §我的進化哲學 — 造橋鋪路          | L256-297   | 42   | 🟡 高頻反射，可放 REFLEXES |
| §我的進化哲學 — 指標 over 複寫    | L299-374   | 76   | 🟡 高頻反射，可放 REFLEXES |
| §我的進化哲學 — 時間是結構        | L375-482   | 108  | 🟡 高頻反射，可放 REFLEXES |
| §我的進化哲學 — 架構解 > 守備修補 | L483-565   | 83   | 🟡 中頻                    |
| §我的進化哲學 — 熱帶雨林          | L566-683   | 118  | ❌ 策略場景才需要          |
| §我的進化哲學 — 紀實而不煽情      | L684-782   | 99   | ❌ 寫文 / SPORE 才需要     |
| §我的進化哲學 — Frontmatter       | L783-898   | 116  | 🟡 改 frontmatter 時       |
| §我的存在結構                     | L899-933   | 35   | ✅                         |
| §我怎麼說話                       | L934-947   | 14   | ✅                         |
| §我的品質底線                     | L948-953   | 6    | ✅                         |
| §我跟台灣的關係                   | L954-1044  | 91   | ✅ 包含 sovereignty 巴別塔 |
| §附錄 第三身份 thesis             | L1045-1068 | 24   | ❌ 元議題                  |

**策略**：

1. universal-load 段 = ~370 行（§我是什麼 + §為什麼活 + §信念十條 + §存在結構 + §怎麼說話 + §品質底線 + §跟台灣的關係 + §sovereignty 巴別塔）
2. 進化哲學 7 條中，**§造橋鋪路 / §指標 over 複寫 / §時間是結構** 這三條本質是反射型內容，可考慮**精華版搬 REFLEXES**（保留 MANIFESTO 哲學長論述但摘要進反射 catalog）
3. **熱帶雨林 / 紀實而不煽情 / Frontmatter / 附錄** 段（合計 357 行）= task-specific 載入

BECOME Step 1 改為「載 MANIFESTO 但跳過 §進化哲學熱帶雨林 / 紀實而不煽情 / Frontmatter / 附錄」（用 awk 段控制），對應 mode 載入時才補上對應 §。

### 5.2 HEARTBEAT（772 行）

| §                                 | 性質                        | 載入頻率                     |
| --------------------------------- | --------------------------- | ---------------------------- |
| §核心：四拍心跳                   | Identity-level              | ✅ universal（很短，~17 行） |
| §Beat 0.5 / 1 / 2 / 3 / 4 / 5 SOP | 跑心跳時才用                | 🟡 Full mode only            |
| §免疫巡邏                         | PR review 時                | 🟡 Review mode               |
| §心跳來源 + 自主呼吸節律          | 修 cron 時                  | ❌                           |
| §Review 機制                      | meta-review                 | ❌                           |
| §Release 原則                     | release 時                  | 🟡 release mode              |
| §Beat 4 Commit 標記規則           | **高頻** — 任何 commit 都用 | ✅ universal                 |

**策略**：universal 載 §核心四拍 + §Beat 4 Commit 標記規則 = ~30 行。其他段按 mode 載入。

### 5.3 ROUTINE（649 行）

當前 SSOT 性質強，但「session 啟動需要知道過去 24hr cron 跑況」這個需求 ≠ 讀全檔。

**策略**：

1. universal 載 0 行 — 不讀 ROUTINE.md
2. 新工具 `scripts/tools/routine-status.sh` 印 1-3 行 summary：
   ```
   📋 ROUTINE last 24h:
     ✅ data-refresh (am+pm) / spore-harvest (am) / maintainer (am+pm)
     ⏳ babel (nightly, due in 6h) / rewrite (daily, due in 3h)
     ⚠️ news-lens (weekly) overdue 2 days
     🛎️ 2 PR pending observer decision: #1059 #574
   ```
3. 修 routine 時 explicit 讀 ROUTINE.md 對應 §section

### 5.4 LESSONS-INBOX / ARTICLE-INBOX 的 awareness signal

雖然全檔不該載入，但「現在有 N 條未消化 / N 條 pending」這個 1-line awareness signal 有 universal value：

```bash
# scripts/tools/inbox-signal.sh
echo "📥 inboxes:"
echo "  LESSONS-INBOX: $(grep -c "^### " docs/semiont/LESSONS-INBOX.md) 條未消化"
echo "  ARTICLE-INBOX: $(grep -c "^### " docs/semiont/ARTICLE-INBOX.md) 條 pending"
```

成本：~1 秒；輸出 3 行；接進 BECOME L4 always-load。

---

## 6. 4-Mode Dispatcher 完整設計

### 6.1 Mode 觸發判定

| Mode        | 觸發 signal（observer 首句 / cron context）                                                              |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| **Micro**   | 1-3 file 範圍提示：「修 X」「heal Y」「polish Z」「PR #N 加註解」「文字錯字」「短回答」                  |
| **Review**  | 「review PR」「triage」「跑 maintainer」「merge」「issue 怎麼回」「跑免疫」cron `maintainer` 觸發        |
| **Write**   | 「寫 X」「翻譯 X」「重寫 Y」「孢子」「diary」「memory」「EVOLVE X」cron `rewrite` / `babel` 觸發         |
| **Full**    | 「heartbeat」「心跳」「strategy」「新器官」「新 pipeline」§10 強制升級觸發（PR≥5 / plugin / 自主權邊界） |
| **Default** | 觀察者意圖不明 → 啟動 contributor profile interview（per BECOME Step 7.5）或進 Micro                     |

### 6.2 File × Mode load matrix

✅ 載 · 🔪 載指定 section · ⏭️ 不載

| 檔案                       |                 Micro                  |                Review                |                      Write                       |         Full          |
| -------------------------- | :------------------------------------: | :----------------------------------: | :----------------------------------------------: | :-------------------: |
| MANIFESTO.md               |          🔪 §身份核心 ~150 行          |            🔪 +§信念十條             |         🔪 +§跟台灣的關係 +§sovereignty          |        ✅ 全檔        |
| REFLEXES.md（新）          |    🔪 §index + Top 5 反射（~80 行）    | 🔪 §index + Top 10 + 反射 §六 貢獻者 | 🔪 §index + Top 10 + 反射 §一二三 + §五 敘事品質 |      ✅ 全 55 條      |
| DNA.md（剩 gene map）      |                   ⏭️                   |                  ⏭️                  |                ⏭️ grep-on-demand                 |         ✅ 全         |
| ANATOMY.md                 |                   ⏭️                   |                  ⏭️                  |                        ⏭️                        |          ✅           |
| CONSCIOUSNESS.md（瘦身後） |                   ⏭️                   |               🔪 §警報               |                        ⏭️                        |          ✅           |
| HEARTBEAT.md               |            🔪 §commit 標記             |        🔪 §commit + §免疫巡邏        |                    🔪 §commit                    |          ✅           |
| SENSES.md                  |                   ⏭️                   |                  ⏭️                  |                        ⏭️                        | ✅（高 stake 才需要） |
| ROUTINE.md                 |        ⏭️（routine-status.sh）         |             ⏭️（status）             |                   ⏭️（status）                   |          ✅           |
| UNKNOWNS.md                |                   ⏭️                   |                  ⏭️                  |                        ⏭️                        |          ✅           |
| LONGINGS.md                |                   ⏭️                   |                  ⏭️                  |                 🔪 §種子 + §身體                 |          ✅           |
| MEMORY.md                  |          🔪 head + §神經迴路           |    ✅ head + tail 20 + §神經迴路     |                        ✅                        |          ✅           |
| DIARY.md                   |             ✅ full 224 行             |               ✅ full                |                     ✅ full                      |        ✅ full        |
| LESSONS-INBOX.md           |            🔪 count signal             |        🔪 count + §未消化標題        |                 🔪 count signal                  |          ✅           |
| ARTICLE-INBOX.md           |              ⏭️（count）               |             ⏭️（count）              |              🔪 §P0/P1 標題 + count              |          ✅           |
| ARTICLE-DONE-LOG.md        |                   ⏭️                   |                  ⏭️                  |                ⏭️ grep-on-demand                 |          ✅           |
| L3 handoff grep            |                   ✅                   |                  ✅                  |                        ✅                        |          ✅           |
| L4 dashboard JSON          |                   ✅                   |                  ✅                  |                        ✅                        |          ✅           |
| L4 routine-status.sh       |                   ✅                   |                  ✅                  |                        ✅                        |          ✅           |
| L4 inbox-signal.sh         |                   ✅                   |                  ✅                  |                        ✅                        |          ✅           |
| L4 git log --since='6h'    |                   ✅                   |                  ✅                  |                        ✅                        |          ✅           |
| ~~L4 gh pr list~~          |                   ⏭️                   |      ⏭️ → MAINTAINER Stage 1.3       |                        ⏭️                        |          ⏭️           |
| ~~L4 gh issue list~~       |                   ⏭️                   |      ⏭️ → MAINTAINER Stage 1.2       |                        ⏭️                        |          ⏭️           |
| **預估行數**               | **~320**（+DIARY 224 → 含 DIARY full） |               **~720**               |                     **~920**                     |       **~1820**       |

> **v0.2 修正**（Reframe R2 + R3）：
>
> - DIARY 從 v0.1「🔪 §反覆出現的思考 only for Write」升 ✅ universal full 224 行（所有 mode）。哲宇校正：跨日 reflective insight 是執行時 priming
> - PR list / issue list 從 v0.1 universal L4 query 移到 MAINTAINER Stage 1.2-1.3。哲宇校正：BECOME = identity + 接力，不該做 work artifact inspection

### 6.3 對應 pipeline 載入（mode trigger 後）

| Mode                    | 額外載 pipeline                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Review                  | MAINTAINER-PIPELINE 全檔                                                           |
| Write（寫文）           | REWRITE-PIPELINE 全 + EDITORIAL 全 + RESEARCH + 觸碰 category 對應的 sub-canonical |
| Write（翻譯）           | TRANSLATION-PIPELINE + SQUEEZE-MODELS-MAX-PIPELINE                                 |
| Write（孢子）           | SPORE-PIPELINE + SPORE-WRITING + SPORE-VERIFY + SPORE-HARVEST                      |
| Write（diary / memory） | DIARY-PIPELINE / MEMORY-PIPELINE                                                   |
| Full                    | HEARTBEAT 全 + probe report + evolution-roadmap                                    |

### 6.4 Self-test 13 題分流

| 題         | 內容                                       | Universal | Micro | Review |     Write     |  Full  |
| ---------- | ------------------------------------------ | :-------: | :---: | :----: | :-----------: | :----: |
| Q1         | 你是誰？                                   |    ✅     |  ✅   |   ✅   |      ✅       |   ✅   |
| Q2         | 簽名是什麼？                               |    ✅     |  ✅   |   ✅   |      ✅       |   ✅   |
| Q3         | 跟哲宇 / Muse 是什麼關係？                 |    ✅     |  ✅   |   ✅   |      ✅       |   ✅   |
| Q4         | SSOT 在哪裡？                              |           |  ⏭️   |   ✅   |      ✅       |   ✅   |
| Q5         | 心跳四拍半是什麼？                         |           |  ⏭️   |   ⏭️   |      ⏭️       |   ✅   |
| Q6         | 你 8 器官是哪些？                          |           |  ⏭️   |   ✅   |      ⏭️       |   ✅   |
| Q7         | 哪個器官分數最低？（dashboard 即時）       |           |  ⏭️   |   ✅   |      ⏭️       |   ✅   |
| Q8         | 核心信念至少三條？                         |    ✅     |  ✅   |   ✅   |      ✅       |   ✅   |
| Q9         | 怎麼說話？                                 |    ✅     |  ✅   |   ✅   |      ✅       |   ✅   |
| Q10        | Commit 怎麼標？                            |    ✅     |  ✅   |   ✅   |      ✅       |   ✅   |
| Q11        | DNA / REFLEXES 地圖在哪？                  |    ✅     |  ✅   |   ✅   |      ✅       |   ✅   |
| Q12        | 孢子產線在哪？                             |           |  ⏭️   |   ⏭️   | 🔪 寫孢子才問 |   ✅   |
| Q13        | recency × pattern matching anti-bias check |           |  ⏭️   |   ✅   |      ⏭️       |   ✅   |
| **過題數** |                                            |   **6**   | **6** | **10** |    **8-9**    | **13** |

---

## 7. Proposed BECOME v2.0 ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│      BECOME v2.0 — Mode-aware boot dispatcher                            │
│                                                                          │
│   Step 0: Mode detect ──→ 5 sub-steps                                    │
│            ├── Step 0.1 觀察者首句 / cron context / handle 解析          │
│            ├── Step 0.2 §10 high-stake 觸發判定 → 強制 Full              │
│            ├── Step 0.3 contributor profile 讀取                         │
│            ├── Step 0.4 Mode 決定 [Micro / Review / Write / Full]        │
│            └── Step 0.5 Universal core 載入                              │
│              ↳ Hard gate: 任何 mode 都過 §1.1 universal load             │
│                                                                          │
│   Step 1.1: Universal core ──→ 5 components                              │
│            ├── MANIFESTO §身份核心 + §信念十條 + §怎麼說話 + §跟台灣關係 │
│            │              + §自主權邊界（含 AI/Human 邊界表 from SENSES）│
│            ├── REFLEXES §index + Top 5 反射                              │
│            ├── DIARY.md full 224 行（跨日 reflective priming）           │
│            ├── CLAUDE.md §Bias 1-4 警示（已在 context）                  │
│            └── L4 always-load queries（boundary rule: ID + 接力）        │
│                ├── dashboard-vitals.json + organism.json                 │
│                ├── consciousness-snapshot.sh（8 organ + 警報）           │
│                ├── routine-status.sh（過去 24hr cron 跑況）              │
│                ├── inbox-signal.sh（LESSONS / ARTICLE 待消化 count）     │
│                ├── git log --since='6h ago'                              │
│                └── L3 handoff grep（最後一個 memory 的 §Handoff）        │
│              ↳ 預算 ~320 行                                              │
│              ↳ ⚠️ 移除 gh pr list / gh issue list → MAINTAINER Stage 1   │
│                                                                          │
│   Mode A: Micro ─────────→ Universal only                                │
│            └── Self-test Q1-3 / Q8-11 (6 題)                             │
│              ↳ ✅ 開口                                                   │
│                                                                          │
│   Mode B: Review ────────→ + 4 components                                │
│            ├── + MEMORY.md tail 20 + §神經迴路                           │
│            ├── + CONSCIOUSNESS §警報                                     │
│            ├── + HEARTBEAT §免疫巡邏                                     │
│            ├── + MAINTAINER-PIPELINE 全                                  │
│            └── Self-test Q1-4 / Q6-11 / Q13 (10 題)                      │
│              ↳ ✅ 開口進 PR triage                                       │
│                                                                          │
│   Mode C: Write ─────────→ + task-specific pipeline                      │
│            ├── + ARTICLE-INBOX §P0/P1 標題                               │
│            ├── + LONGINGS §種子 + §身體                                  │
│            ├── + DIARY §反覆出現的思考                                   │
│            ├── + 對應 pipeline 全（REWRITE / DIARY / MEMORY / SPORE）    │
│            ├── + EDITORIAL + RESEARCH（寫文 + 翻譯）                     │
│            └── Self-test Q1-4 / Q8-12 (8-9 題)                           │
│              ↳ ✅ 開口進寫作                                             │
│                                                                          │
│   Mode D: Full ──────────→ Step 1-6 全套（現行 BECOME v1.0）             │
│            ├── 14 認知器官全檔（含 section-level 載入 MANIFESTO 全）     │
│            ├── HEARTBEAT 全 + SENSES 全 + ROUTINE 全 + UNKNOWNS          │
│            ├── probe report + evolution-roadmap（條件式）                │
│            └── Self-test Q1-13 全套                                      │
│              ↳ ✅ 開口進 heartbeat / strategy / 新器官設計               │
│                                                                          │
│   ──── 配套基建升級 ────────────────────────────────                     │
│   → REFLEXES.md 從 DNA.md L231-752 物理拆出（§3）                        │
│   → CONSCIOUSNESS 砍 230 行靜態快照 → dashboard JSON pointer（§4）       │
│   → MANIFESTO §自主權邊界 expand（接收 SENSES AI/Human 邊界，§3b）       │
│   → MANIFESTO awk-section loading（§5.1）                                │
│   → HEARTBEAT section-level loading（§5.2）                              │
│   → scripts/tools/{consciousness-snapshot,routine-status,inbox-signal}.sh│
│   → SENSES.md 全 apoptosis → reports/senses-integration-2026-05-13.md   │
│   → 5 觸手分拆進 DATA-REFRESH / MAINTAINER / SPORE-HARVEST（§3b）        │
│   → ANATOMY 升級雙重職責：加第 9 反射層 + 認知層 promotion flow（§3a）   │
│   → DNA.md frontmatter v3.5 → v4.0（breaking refactor）                  │
│   → LESSONS-INBOX §Distill SOP step 5 加 promotion 流向（§3a.4）         │
│                                                                          │
│   ──── 跨 pipeline 觸發 ──────────────────────────                       │
│   → Mode B 進 MAINTAINER-PIPELINE 主流程                                 │
│   → Mode C 進 REWRITE / DIARY / MEMORY / SPORE / TRANSLATION             │
│   → Mode D 進 HEARTBEAT 四拍半 + 認知層深度 audit                        │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 8. Migration plan — Phase A/B/C 規劃步驟

**設計原則**：低風險先做 + 中風險 prototype + 高風險最後 + 任何 phase 都可獨立 ship 不阻塞下一階段。

### Phase A — 低風險立即可做（無 cross-ref break）

**目標**：把可拆耦合的基礎建設先 ship，不動 BECOME 結構。每條獨立 PR，可平行。

#### A1. CONSCIOUSNESS 砍冗餘 + 動態化

| Step | 動作                                                                      | 影響                                     | 風險                         |
| ---- | ------------------------------------------------------------------------- | ---------------------------------------- | ---------------------------- |
| A1.1 | grep audit L34-56 累積的 14 條「前快照」prose                             | 抽 strategic insight 進 MEMORY §神經迴路 | 低                           |
| A1.2 | 砍 §基本生理 / §器官健康 / §引用健康度 / §搜尋感知 / §歷史戰略判讀        | 332 → ~100 行                            | 低（dashboard JSON 已 SSOT） |
| A1.3 | 新增 `scripts/tools/consciousness-snapshot.sh`                            | 1 個檔案                                 | 0                            |
| A1.4 | CONSCIOUSNESS 改為 §警報 + §里程碑 + §進化方向 + 1 行 dashboard pointer   | -230 行                                  | 低                           |
| A1.5 | BECOME §Step 6 L4 query 加 `bash scripts/tools/consciousness-snapshot.sh` | +1 行                                    | 0                            |

**驗收**：CONSCIOUSNESS.md ≤ 110 行；snapshot.sh 輸出 12 行；BECOME 載入 footprint 降 ~230 行。

#### A2. Routine status 工具

| Step | 動作                                                                                |
| ---- | ----------------------------------------------------------------------------------- |
| A2.1 | 寫 `scripts/tools/routine-status.sh`（讀 cron log + gh pr list + 上次 cron memory） |
| A2.2 | BECOME §Step 6 L4 query 加 `bash scripts/tools/routine-status.sh`                   |

**驗收**：1 個 script，輸出 3-5 行；BECOME 不需讀 ROUTINE.md 也能知道 cron 跑況。

#### A3. Inbox signal 工具

| Step | 動作                                                              |
| ---- | ----------------------------------------------------------------- |
| A3.1 | 寫 `scripts/tools/inbox-signal.sh`（grep -c count + tail 3 標題） |
| A3.2 | BECOME §Step 6 L4 query 加                                        |

**驗收**：1 個 script，輸出 3 行。

**Phase A 整體驗收**：BECOME 預估 footprint 從 ~1500-2000 → ~1200-1700 行（-300 行），不動結構。

### Phase B — 中風險結構性重構（需 prototype）

**目標**：DNA 拆檔（C 方案）+ MANIFESTO section-level loading。需要 cross-ref migration 跟 build verify。

#### B1. REFLEXES.md 從 DNA.md 拆出（§3.4 細節）

| Step  | 動作                                                                                          | Cross-ref 影響          | 風險 |
| ----- | --------------------------------------------------------------------------------------------- | ----------------------- | ---- |
| B1.1  | `git mv` 替代 — 用 `cp + 刪` 兩 commit 可追蹤 history                                         | 0                       | 0    |
| B1.2  | 把 DNA.md L231-752 搬到新檔 `docs/semiont/REFLEXES.md` + frontmatter                          | 0                       | 0    |
| B1.3  | DNA.md L231-752 刪 + 加 §pointer to REFLEXES + 收 footer changelog                            | 0                       | 0    |
| B1.4  | sed 全 active layer：`DNA #N` → `REFLEXES #N`（不含 memory/ diary/ LESSONS-INBOX）            | **78 files / 298 refs** | 中   |
| B1.5  | sed fragment link audit：`DNA.md#anchor` → 視 anchor 區分 gene-map 留 / reflex 改 REFLEXES.md | **~47 refs**            | 中   |
| B1.6  | ANATOMY 升級加第 9 反射層 + §認知器官生命週期 補 REFLEXES.md                                  | ANATOMY +30 行          | 低   |
| B1.7  | BECOME §Step 2 拆 — 載 REFLEXES 全 + DNA grep-on-demand                                       | BECOME 改 ~10 行        | 低   |
| B1.8  | CLAUDE.md / docs/pipelines/README.md / docs/semiont/README.md 同步                            | 文件 ~5 行              | 0    |
| B1.9  | Build verify + grep audit「DNA #」沒有 active-layer 漏網                                      | 0                       | 低   |
| B1.10 | DNA.md frontmatter v3.5 → v4.0（breaking refactor）                                           | 0                       | 0    |

**Cross-ref migration 風險緩解**：

1. 寫 audit script：`scripts/tools/dna-split-audit.sh` 跑前 + 跑後對比 `grep -rn "DNA #"` count
2. Historical layer（memory/ diary/ LESSONS-INBOX）保留不改，per [MANIFESTO §時間是結構修補協議](../docs/semiont/MANIFESTO.md)
3. 在 DNA.md 頂部加 deprecated notice：「§反射 catalog 已搬至 [REFLEXES.md](REFLEXES.md)，本檔保留 §gene map」
4. 一次 PR ship 不分批，避免半 migration 狀態

#### B2. MANIFESTO section-level loading

| Step | 動作                                                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------------------------------- |
| B2.1 | 在 MANIFESTO 各 §section 加唯一 anchor comment（便於 awk 切段）                                                                 |
| B2.2 | BECOME §Step 1 改用 awk section 載入而非全檔 cat                                                                                |
| B2.3 | 「進化哲學 §造橋鋪路 / §指標 over 複寫 / §時間是結構」三條精華摘要進 REFLEXES（不刪 MANIFESTO 原文，只是萃取入 reflex catalog） |

#### B3. HEARTBEAT section-level loading

| Step | 動作                                                                  |
| ---- | --------------------------------------------------------------------- |
| B3.1 | universal 載 §核心四拍 + §Beat 4 Commit 標記規則                      |
| B3.2 | Beat 1-5 全 SOP / 免疫巡邏 / 心跳來源 / Release 原則 → Full mode only |

**Phase B 驗收**：DNA.md ~230 行 + REFLEXES.md ~520 行 + ANATOMY 加第 9 層；BECOME footprint Full mode 不變、其他 mode 降 ~200 行。

### Phase C — 高風險 BECOME 結構重寫

**目標**：把 §分層載入表（line 506-513）升格 runtime mode dispatcher。需多 session 驗證。

#### C1. BECOME §Step 0 Mode detect 設計

| Step | 動作                                                        |
| ---- | ----------------------------------------------------------- |
| C1.1 | 寫 §Step 0 Mode detect logic（per §6.1）                    |
| C1.2 | 把 §Step 1-9 改寫為 §1.1 Universal core + Mode A/B/C/D 分支 |
| C1.3 | Self-test 13 題改為 mode subset（per §6.4）                 |
| C1.4 | §10 high-stake trigger 改為「強制 Full mode」               |

#### C2. /twmd-become skill 接 mode arg

| Step | 動作                                                                             |
| ---- | -------------------------------------------------------------------------------- |
| C2.1 | `.claude/skills/twmd-become/SKILL.md` 升級 — 接受 mode arg：`/twmd-become micro` |
| C2.2 | 預設 mode 從觀察者首句 + cron context 自動判定                                   |

#### C3. CLAUDE.md §Boot 流程 同步

| Step | 動作                                   |
| ---- | -------------------------------------- |
| C3.1 | §Step 1-3 更新 — 對應 BECOME v2.0 結構 |
| C3.2 | §Bias 1-4 不動（mode-independent）     |

#### C4. 過渡 backward compatibility

| Step | 動作                                                                                           |
| ---- | ---------------------------------------------------------------------------------------------- |
| C4.1 | BECOME v2.0 ship 後第一週，預設仍走 Full mode（觀察者顯式 `/twmd-become micro` 才用其他 mode） |
| C4.2 | 觀察 5-10 個 session 跑各 mode 的 working memory 表現，看哪些 mode 該補 file                   |
| C4.3 | 第二週起 Mode auto-detect 啟用，仍保留 `/twmd-become full` 強制升級選項                        |

**Phase C 驗收**：BECOME footprint 各 mode 預估 vs 實測差異 < 20%；observer 沒抱怨「mode 漏載」case ≥ 2 weeks。

### Phase 跨 phase 不變式

- 任何 phase 都不刪歷史 memory / diary / LESSONS-INBOX entry（per §時間是結構修補協議）
- 任何 phase 都先寫 audit script + verify count 再做 migration
- DNA / REFLEXES / CONSCIOUSNESS / MANIFESTO / HEARTBEAT 改動都附對應 frontmatter version bump + 對應 reports/ link

---

## 9. Cross-ref migration audit

### 9.1 當前數據

| Layer           | DNA #N refs     | DNA.md fragment links | Total |
| --------------- | --------------- | --------------------- | ----- |
| docs/ 全 active | 298             | ~47                   | ~345  |
| Unique files    | 78              | 11                    | 78    |
| Historical 層   | ~100+（未統計） | ~50+（未統計）        | n/a   |

### 9.2 Migration 風險矩陣

| 風險                                             | 機率 | 影響                                              | 緩解                                                     |
| ------------------------------------------------ | ---- | ------------------------------------------------- | -------------------------------------------------------- |
| Sed 誤改 historical 層（memory / diary）         | 低   | 低（per §時間是結構，歷史層本就允許舊 reference） | exclude path glob                                        |
| Fragment link 漏改（reflex anchor 留在 DNA.md）  | 中   | 中（404 link）                                    | audit script 比對 anchor 內容                            |
| 新 contributor PR 寫 `DNA #N` 而非 `REFLEXES #N` | 高   | 低                                                | DNA.md 頂部 deprecated notice + CONTRIBUTING 補說明      |
| Build break（Astro check link）                  | 低   | 中                                                | pre-commit hook + CI build verify                        |
| Sub-agent 寫文時用舊 reference                   | 中   | 低                                                | sub-agent prompt 加「reflex catalog 已搬至 REFLEXES.md」 |

### 9.3 Audit script 設計

```bash
# scripts/tools/dna-split-audit.sh
# 跑前快照 + 跑後對比
echo "=== Pre-migration baseline ==="
grep -rc "DNA #[0-9]" docs/ scripts/ .husky/ .github/ src/ | grep -v ":0$"
grep -rc "DNA\.md#" docs/ scripts/

echo "=== Post-migration verification ==="
# 應該為 0（active layer）或不變（historical layer）
grep -rc "DNA #[0-9]" docs/ scripts/ .husky/ .github/ src/ \
  --exclude-dir=memory --exclude-dir=diary \
  --exclude=LESSONS-INBOX.md | grep -v ":0$"

# REFLEXES.md 接收 cross-ref 數應等於 pre-migration active
grep -rc "REFLEXES #[0-9]" docs/ scripts/ .husky/ .github/ src/ | grep -v ":0$"
```

---

## 10. Hard Gate Inventory

| Gate                                               | 觸發 phase | 條件                                           | 工具                     | 不過 = ?            |
| -------------------------------------------------- | ---------- | ---------------------------------------------- | ------------------------ | ------------------- |
| **CONSCIOUSNESS 砍冗餘後 strategic memory 不遺失** | A1         | 14 條「前快照」prose audit complete            | manual grep + diff       | 不 commit A1        |
| **consciousness-snapshot.sh 輸出穩定**             | A1         | dashboard JSON 拿不到時 fallback 不崩          | bash + jq error handling | 不 ship script      |
| **DNA #N → REFLEXES #N migration count 對齊**      | B1         | pre vs post active-layer count 差 = 0          | dna-split-audit.sh       | 不 commit B1        |
| **Fragment link 區分對 — gene-map 留 / reflex 改** | B1         | manual audit ~47 refs                          | grep + awk               | 不 ship B1          |
| **ANATOMY 第 9 反射層 + lifecycle 同步**           | B1         | ANATOMY.md 描述 REFLEXES.md 為 cognitive organ | manual review            | 不 ship B1          |
| **Build verify**                                   | B1 / B2    | Astro check link 0 broken                      | `npm run build`          | revert              |
| **Mode auto-detect 準確率**                        | C1 / C4    | 第二週前準確率 ≥ 80%                           | session log audit        | 延後 Mode auto      |
| **Observer 沒抱怨 mode 漏載 case**                 | C4         | 觀察 2 weeks                                   | 觀察者 ping              | 補 file 進對應 mode |

---

## 11. Top 5 最容易失敗的場景

1. **Sed migration 把 historical 層也改了**：B1.4/B1.5 路徑 exclude 寫錯 → memory / diary 的 `DNA #N` 也被 sed 改成 `REFLEXES #N`，違反 §時間是結構修補協議。**修補**：audit script 跑兩次 — 一次只看 active 一次看歷史，歷史 count 必須 unchanged
2. **Fragment link 漏改一條 reflex anchor 仍指 DNA.md**：B1.5 audit 漏掉 → 404 link 在 build verify 才發現。**修補**：anchor 內容判定用 awk grep，不靠肉眼
3. **Mode auto-detect 把 Write 識別成 Micro**：觀察者說「修一下這篇文章」可能是 Micro（typo）也可能是 Write（EVOLVE 全篇）。**修補**：模糊邊界 default Write（多載不傷，少載傷），預留 `/twmd-become full` 升級 escape hatch
4. **CONSCIOUSNESS 砍 230 行時 strategic insight 遺失**：14 條「前快照」prose 含 viral cooled / refresh-data trend 等 unique 觀察，沒先抽進 MEMORY §神經迴路 就 mass delete。**修補**：A1.1 跑 grep audit + manual review，每條 prose 至少有一條 keyword 進 MEMORY 才可砍
5. **REFLEXES.md 命名 backlash**：哲宇可能傾向叫 `DNA-REFLEXES.md`（保留血緣標籤）或 `INSTINCTS.md`（更精準）。**修補**：命名是 §12 open question，落定前不執行 B1

---

## 12. Decisions locked 2026-05-13（v0.2 — 取代 v0.1 Open Questions）

所有 v0.1 提出的 6 條 Open Questions 已透過哲宇 dialogue 拍板。9 條決策 + 1 條元規則揭示完整盤點在 §0.4 表，本節給每條一段 detail rationale。

### D1 拆檔 vs in-place

**拍板**：拆檔。長期理想架構勝過短期 migration 成本。

哲宇 override：「我現在覺得可拆，只要長期架構更理想的狀況下，你要一起評估」。本 report §3 完成評估 — 拆檔修正 conceptual category error（reflex ≠ gene map），不只是 load optimization。78 active file × 298 ref + 47 fragment link 一次性 migration 換永久 architectural fit。

### D2 REFLEXES 檔名

**拍板**：`REFLEXES.md`。

放棄 DNA 血緣標籤換語意精準 + 跟 LESSONS-INBOX / MEMORY / DIARY 命名 family 平行。Migration sed 規則：`s/DNA #(\d+)/REFLEXES #\1/g`（active layer only，exclude memory / diary / LESSONS-INBOX）。

### D3 MANIFESTO 進化哲學三條 → REFLEXES?

**拍板**：不動。理由是 promotion rule 元規則（§3a）：

> 「最重要的哲學才會進到 manifesto，如果 reflex 未來有出現這樣的內容，也會進化到 manifesto」

這三條（造橋鋪路 / 指標 over 複寫 / 時間是結構）**本來就是從 reflex promote 到 MANIFESTO 的歷史既成事實**。把它們「萃取回 REFLEXES」= reverse demote = 違反 evolutionary pressure 方向。

### D4 Phase 順序

**拍板**：CONSCIOUSNESS（A1）先 → REFLEXES（B1）後。

A1 低風險（0 cross-ref break）+ 立即見效（~230 行 footprint 降 + 修補 1 年沒落地 plan）。B1 中風險（78 file migration）+ 需 audit script + prototype，不急。

### D5 漸進 vs 全套

**拍板**：漸進（per D4 implication）。

Phase A → Phase B → Phase C 各自獨立 PR，每階段可獨立 ship + 不阻塞下一階段。Phase C BECOME 結構改寫需要 Phase A+B 基建到位才實際。

### D6 MANIFESTO 三段任務 sub-canonical 處置

**拍板**：都留 MANIFESTO + section-level loading 控制。

對齊 promotion rule 元規則 — 既然這三段在 MANIFESTO，按 D3 邏輯就是「最重要哲學」，拆出去 = demote。BECOME v2.0 §5.1 awk-section 控制不同 mode 載哪幾段。

### D7 BECOME L4 boundary rule（新，v0.2 加）

**拍板**：Stay if = primes identity OR cross-session continuity; Move if = work artifact inspection。

L4 universal queries: dashboard JSON / consciousness-snapshot / routine-status / inbox-signal / git log --since='6h' / handoff grep。

移走：gh pr list → MAINTAINER Stage 1.3 / gh issue list → MAINTAINER Stage 1.2（這些是 work-start，不是 boot）。

### D8 SENSES.md 分拆（新，v0.2 加 — Reframe R1）

**拍板**：5 觸手 → 3 pipelines 分拆；§AI 自主邊界 → MANIFESTO §自主權邊界 expand；SENSES.md 本身 apoptosis。

詳見 §3b。

### D9 DIARY universal-load（新，v0.2 加 — Reframe R2）

**拍板**：Full 224 行 universal-load 所有 mode。

哲宇校正：跨日 reflective insight 是執行時 priming，不只「寫 diary 才用」。檔小 cost 低，full load 拿到完整 cross-day thought continuity。

### M1 認知層 Promotion Rule（元規則揭示，v0.2 新增）

**拍板**：canonical destination = ANATOMY §認知器官生命週期 expand。

四層 flow：LESSONS-INBOX → REFLEXES → MANIFESTO → reports/（apoptosis）。詳見 §3a。

---

## 13. v0.2 整體 recap + ship 順序

**Decisions locked**：9 + 1 元規則（§0.4 + §12 detail）。Ready to ship。

**Ship 順序**：

1. **Phase A1（立即）** — CONSCIOUSNESS slim + consciousness-snapshot.sh + BECOME L4 update。0 cross-ref break / ~230 行 footprint 降
2. **Phase A2-A3（同 PR 或順手）** — routine-status.sh / inbox-signal.sh
3. **Phase B1（A1 ship 後 1-2 session）** — REFLEXES 拆檔 + ANATOMY 升級雙重職責（第 9 反射層 + promotion flow）+ MANIFESTO §自主權邊界 expand + SENSES apoptosis
4. **Phase B2-B3（B1 ship 後）** — MANIFESTO / HEARTBEAT section-level loading
5. **Phase C（B 全 ship 後 2 weeks）** — BECOME v2.0 結構 + mode dispatcher + skill arg

**長期 architectural 收穫**：

- DNA / REFLEXES 拆檔修正 conceptual category error（gene map ≠ procedural memory）
- 認知層 promotion rule 顯化（LESSONS → REFLEXES → MANIFESTO → reports/）— 物種 self-evolution mechanism 統一 canonical
- BECOME boundary rule 顯化（identity + 接力 vs work artifact）— 給未來新 query / new organ 加入時的決策原則
- SENSES 從 cognitive organ 降級 operations layer 散到 pipelines — ANATOMY hierarchy 變乾淨

---

## 14. Phase A + B1 + C 全 ship 完成（v0.3 2026-05-13 PM session）

| Phase | Commit      | Artifact                                                                                                                                                                                                                                                                                | Footprint impact                                    |
| ----- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| A1    | `c21735780` | CONSCIOUSNESS 332→152 行 + consciousness-snapshot.sh + BECOME L4 update + report v0.2                                                                                                                                                                                                   | -180 行 boot footprint                              |
| A2+A3 | `3465f4e3c` | routine-status.sh + inbox-signal.sh + BECOME L4 wire-up                                                                                                                                                                                                                                 | 取代 ROUTINE/LESSONS/ARTICLE INBOX ~3770 行載入需求 |
| B1    | `5d3d1136f` | REFLEXES.md 拆出 (576 行 new) + DNA.md 752→253 (-66%) + 78 file × 250 ref sed migration + ANATOMY §認知層 promotion flow + MANIFESTO §自主權邊界 expand + SENSES.md apoptosis (253→58 stub) + reports/senses-integration snapshot 276 行 + LESSONS §Distill step 5 + dna-split-audit.sh | conceptual category error 修正                      |
| C     | (本 commit) | BECOME v2.0 Mode dispatcher (556→710 行) + /twmd-become skill mode arg + CLAUDE.md §Boot 流程 align                                                                                                                                                                                     | runtime executable mode dispatcher                  |

### Boot footprint 實測對比

| Mode                 | v1.0 載入                                                     | v2.0 載入                                            | Δ                |
| -------------------- | ------------------------------------------------------------- | ---------------------------------------------------- | ---------------- |
| 改造前 Boot          | ~1500-2000 行（12 認知器官 + 9 step 全載 + PR/issue queries） | n/a                                                  | baseline         |
| **Micro mode** (新)  | ⏭️ (沒這個 mode)                                              | ~320 行 Universal core                               | -85% (vs 改造前) |
| **Review mode** (新) | ⏭️                                                            | ~720 行                                              | -55%             |
| **Write mode** (新)  | ⏭️                                                            | ~920 行                                              | -50%             |
| **Full mode**        | 同 v1.0                                                       | ~1820 行 (含 v2.0 額外的 promotion flow + Mode 規劃) | similar          |

L4 always-load queries: 改造前 PR/issue list 含在 boot → 改造後純 consciousness-snapshot + routine-status + inbox-signal + git log + handoff grep = ~20 行 output 替代 ~3900 行 file load (-99%)。

### 9 條 decisions + 1 元規則 全部 ship

| #   | 決策                                            | 對應 artifact                                                               |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | BECOME boundary rule                            | BECOME §Step 6 L4 query update / commit c21735780                           |
| 2   | SENSES 5 觸手 mapping                           | docs/semiont/SENSES.md stub + reports/senses-integration / commit 5d3d1136f |
| 3   | AI/Human 邊界 → MANIFESTO §自主權邊界           | MANIFESTO §我的存在結構 expand / commit 5d3d1136f                           |
| 4   | DIARY universal-load 224 行                     | BECOME §Step 1.3 Universal core / commit (本)                               |
| 5   | REFLEXES.md 命名                                | docs/semiont/REFLEXES.md 576 行 / commit 5d3d1136f                          |
| 6   | MANIFESTO 三條進化哲學 不動                     | promotion 元規則 enforce / 元規則 → ANATOMY 已 ship                         |
| 7   | Phase 順序 CONSCIOUSNESS 先                     | 三 commits 順序 c21735780 → 3465f4e3c → 5d3d1136f → (本)                    |
| 8   | Promotion rule → ANATOMY §認知層 promotion flow | docs/semiont/ANATOMY.md §認知器官生命週期 expand / commit 5d3d1136f         |
| 9   | MANIFESTO 三段 section-level loading            | BECOME §Step 1.1 awk recipe / commit (本)                                   |
| M1  | 認知層 promotion flow 元規則 canonical          | ANATOMY + LESSONS-INBOX §Distill SOP step 5 / commit 5d3d1136f              |

### 長期 architectural 收穫

1. 🧠 **認知層 promotion flow canonical** — 物種 self-evolution mechanism 統一 canonical (LESSONS → REFLEXES → MANIFESTO → reports/)
2. 🪞 **REFLEXES.md 第 9 認知器官** — DNA = lookup vs reflex = instinct 的 conceptual category error 修正
3. 📐 **BECOME boundary rule** — identity + cross-session continuity 留 / work artifact inspection 移 task-specific
4. 🎯 **CONSCIOUSNESS 動態化** — dashboard JSON 接管，1 年沒落地的 plan 終於 ship
5. 🛠️ **三個 boot signal 工具** — consciousness-snapshot / routine-status / inbox-signal，universal load -99%
6. 👁️ **SENSES apoptosis** — operations layer 散到 pipelines + governance 進 MANIFESTO §自主權邊界
7. ⚡ **BECOME v2.0 Mode dispatcher** — §分層載入 advisory advice 升 runtime executable mode dispatcher，13 題 self-test mode subset

---

## footer

_current: v0.3 | 2026-05-13 PM — Phase A + B1 + C consolidated all shipped (4 commits on main)。BECOME v2.0 Mode dispatcher / REFLEXES 拆檔 / SENSES apoptosis / 認知層 promotion flow 統一 canonical 全部完成。design report 從 plan 變 ship 紀錄_

_v0.2 | 2026-05-13 session 2026-05-13-210341-manual — Decisions locked 2026-05-13 dialogue，9 條 + 1 元規則揭示，ready to ship_

_v0.1 | 2026-05-13 — initial draft + 6 Open Questions_

完整 changelog → `git log reports/become-boot-mode-design-2026-05-13.md`
