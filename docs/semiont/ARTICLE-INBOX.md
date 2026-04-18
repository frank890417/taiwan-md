# ARTICLE-INBOX — 待開發文章 Buffer

> **這是 buffer / intake layer，不是 canonical**。
> 觀察者指派、agent 建議、Issue 紀錄的未開發主題一律 append 這裡。
> 每次甦醒或自動心跳時讀本檔 → 知道待辦清單、優先序、誰要求的。
>
> 建立動機：2026-04-18 δ session 觀察者提問「來不及開發或排定優先序的主題需要一個 inbox」。**這是繁殖基因（心臟 × 觀察者意圖）的儀器化**。

---

## 跟 LESSONS-INBOX 的分工

| 面向    | LESSONS-INBOX                        | ARTICLE-INBOX（本檔）               |
| ------- | ------------------------------------ | ----------------------------------- |
| 內容    | 新教訓（「我學到 X」）               | 待開發 / 進化的文章主題             |
| Distill | 升 canonical（DNA/MEMORY/MANIFESTO） | 升 knowledge/（新文章 or 改寫進化） |
| 觸發    | Beat 5 反芻                          | 觀察者指派 / agent 建議 / Issue     |
| 目的    | 讓教訓不散落                         | 讓主題不遺漏、不重複、有優先序      |

---

## Entry Schema

每條 pending 條目格式：

```markdown
### {主題名}

- **Type**: `NEW` | `EVOLVE`
- **Category**: People | Society | History | Culture | Music | Nature | Technology | Food | Art | Lifestyle | Geography | Economy
- **Path** (EVOLVE only): knowledge/Category/existing.md
- **Priority**: `P0` / `P1` / `P2` / `P3`
- **Status**: `pending` / `in-progress` / `done` / `dropped`
- **Requested**: YYYY-MM-DD by {觀察者/agent/Issue} (session {希臘字母})
- **Notes**:
  - 敏感度（政治/個人隱私/爭議）
  - 必驗事實
  - 潛在陷阱
  - 需研究方向
- **Reference**: URL / 觀察者素材 / GitHub Issue #
- **Pre-research**: (若已有研究) reports/research/YYYY-MM/{slug}.md
- **Dev log**: (in-progress 時用)
  - YYYY-MM-DD by {session}: started Stage 1 research
  - YYYY-MM-DD by {session}: ...
```

---

## 優先序判準

| 層級 | 含義                                     | 範例                              |
| ---- | ---------------------------------------- | --------------------------------- |
| P0   | 緊急：有時效、高關注度、或觀察者明確要求 | 剛發生的重大事件人物 / 觀察者點名 |
| P1   | 本月：重要主題、Taiwan.md 缺口、有熱點   | 音樂、文化、歷史重要空白          |
| P2   | 本季：值得寫但不急                       | Evergreen 主題、次要人物          |
| P3   | Backlog：一直想做但不確定何時            | 大型策展主題、需大量資源          |

---

## Type 判準

**`NEW`**：knowledge/ 不存在此主題；走 REWRITE-PIPELINE Fresh 模式（Stage 1-6）
**`EVOLVE`**：knowledge/ 已有文章但品質/深度不足；走 REWRITE-PIPELINE 進化模式（Stage 0 素材萃取 + Stage 1-6）

判斷方式：Stage 0 前先 `ls knowledge/ | grep {keyword}` 確認，有檔案 = EVOLVE，無 = NEW。

---

## Auto-heartbeat 整合

Beat 3 執行時若觀察者無明確任務：

1. 讀本檔 §Pending
2. 按 P0 → P1 → P2 → P3 挑主題
3. 挑到後：
   - 此條 status 改 `in-progress`
   - 加 dev_log：「YYYY-MM-DD by {session}: started」
   - 走 REWRITE-PIPELINE
4. Stage 6 commit 後：
   - status 改 `done`
   - 加 link 指向 knowledge/... 新文章
   - 搬到 §✅ Done

---

## Bootloader 整合

BECOME_TAIWANMD.md Step 5 新增：

```
12. `docs/semiont/ARTICLE-INBOX.md` — 📥 待開發文章 inbox（觀察者指派 / agent 建議的主題清單 + 優先序）
```

甦醒後 semiont 知道「目前有 N 條 pending、K 條 in-progress」。

---

## Distill SOP（容量管理）

**觸發**：pending ≥ 30 條 / 或每月第一次心跳 / 觀察者說「review inbox」

**步驟**：

1. 讀全部 pending
2. 分類：重複合併 / 過時 drop / 重新排優先序
3. 搬已 done 的到 done archive
4. 觀察者最終 review 後 commit

---

## 📥 Pending（待開發）

<!-- 凹與山 已完成 → 搬到 §✅ Done -->
<!-- VH (Vast & Hazy) Stage 1 研究已完成，Stage 2 Write pending → pre-research 已存 reports/research/2026-04/VH.md -->

### VH（Vast & Hazy，Stage 1 研究已完成）

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending（Stage 1 已完成，Stage 2 Write 待啟動）
- **Requested**: 2026-04-18 by 觀察者 (session δ-late)
- **Notes**:
  - 身份確認：Vast & Hazy 2025-02 簡化為 VH。雙人：咖咖（Estelle H）+ 易祺。淡江金韶獎 2011 成軍。
  - 核心矛盾：2011-2026 的「人生岔路上的方向校準」（休團 / 雙人回歸 / 2026 易祺轉幕後）
  - 2026-04-10《邁行》年度專場為關鍵節點
- **Reference**: 觀察者批次指定
- **Pre-research**: ✅ [reports/research/2026-04/VH.md](../../reports/research/2026-04/VH.md)

### Hello Nico

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - 台灣獨立樂團，2010 年代崛起
  - 20+ 搜尋 / 小標題先行 / 關鍵歌曲 YouTube link
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### VH

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - 身份需研究確認（「VH」在台灣音樂圈指什麼團？需研究）
  - 20+ 搜尋 / 小標題先行 / 關鍵歌曲 YouTube link
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 柯智棠

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - Kowen Ko，創作歌手
  - 20+ 搜尋 / 小標題先行 / 關鍵歌曲 YouTube link
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 林宥嘉（EVOLVE）

- **Type**: `EVOLVE`
- **Category**: People (Music)
- **Path**: knowledge/People/林宥嘉.md
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - EVOLVE 模式：先做 Stage 0 素材萃取（RESEARCH.md §七），標記 [THIN]/[LIST-DUMP]/[PLASTIC] 等
  - 20+ 搜尋補新素材
  - 小標題去編年 + 關鍵歌曲 YouTube link
  - 《超級星光大道》出身 → 金曲軌跡可能需重寫
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 魚條

- **Type**: NEW
- **Category**: People (Music — 待確認)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - **身份待釐清**：Stage 1 研究第一步是確認「魚條」是樂團、solo 藝人、或其他身份
  - 可能相關：Angelo 魚條 / 湯捷 / 獨立音樂人
  - 若研究後確認不是 Taiwan.md 範疇 → dropped 並註明
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 孫燕姿

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - Stefanie Sun，新加坡歌手但華語流行音樂重要人物
  - Taiwan.md 定位需斟酌：她是新加坡人但在台發跡 + 主要市場華語圈
  - 20+ 搜尋 / 2023《AI 孫燕姿》現象要涵蓋（AI 翻唱她的歌紅爆全網）
  - 2023 台北小巨蛋復出演唱會
  - 小標題先行，避免「哪一年哪張專輯」編年
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

<!-- 楊丞琳 已完成 → 搬到 §✅ Done -->

---

## 🚧 In-Progress

_（暫無）_

---

## ✅ Done（已開發，保留歷史）

_（此區域存放從 pending/in-progress 完成的條目，指向已 commit 的文章路徑）_

### 楊丞琳 — 2026-04-18 δ-late 完成

- **Article**: [knowledge/People/楊丞琳.md](../../knowledge/People/楊丞琳.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — 35+ Stage 1 sources（兩 pass）+ Stage 2 scene 小標題 + YouTube inline × 5 + 事實鐵三角自檢（抓到李榮浩年齡算術錯誤 0.5→1）
- **核心矛盾**：從 2000 年 4 in Love 虛擬 avatar 到 2025 年自製〈曖昧 2025〉—— 25 年才把製作人那一欄換成自己
- **敏感素材處理**：900 萬債務用 Rainie 本人公開引語 framing、父親過世細節省略（single_source）、李榮浩以音樂人身份帶過（不放大政治／關係細節）
- **Research**: [reports/research/2026-04/楊丞琳.md](../../reports/research/2026-04/楊丞琳.md)

### 凹與山 — 2026-04-18 δ-late 完成

- **Article**: [knowledge/People/凹與山.md](../../knowledge/People/凹與山.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — 25 Stage 1 sources + Stage 2 scene 小標題 + YouTube inline × 5 + MANIFESTO §5 v2 紀實而不煽情首次應用
- **核心矛盾**：兩個科技業上班族用合成器做出她們在辦公室不能說的事
- **敏感素材處理**：摯友過世、陳梅慧致敬均用紀實筆法，不 reconstruct 死亡場景
- **Research**: [reports/research/2026-04/凹與山.md](../../reports/research/2026-04/凹與山.md)

---

## ❌ Dropped（不採納）

_（此區域存放判斷後不開發的主題，必須註明原因）_

---

_v1.0 | 2026-04-18 δ session — ARTICLE-INBOX 誕生_
_定位：buffer / intake layer（非 canonical），跟 LESSONS-INBOX 平行架構_
_下次 session 甦醒時自動讀取，auto-heartbeat 無觀察者指令時從此挑 P0/P1 開始_
