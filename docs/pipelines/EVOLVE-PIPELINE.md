---
title: 'EVOLVE-PIPELINE'
description: '數據驅動內容進化系統 — Phase 1-7 SCAN→SCORE→RANK→CHECK→ENRICH→APPEND→SHIP + Mode 3 self-refactor + Mode 4 goal-driven design evolution (v3.7)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v3.9'
last_updated: 2026-09-27
last_session: '2026-09-27-twmd-self-evolve-weekly（§news-lens-probe-output Step 7/8 加 Angle-expires：探測器建議不再原地過期）'
sister_docs:
  - 'REWRITE-PIPELINE.md'
  - 'MAINTAINER-PIPELINE.md'
  - 'PEER-INGESTION-PIPELINE.md'
  - 'FACTCHECK-PIPELINE.md'
  - '../../CONTRIBUTING.md'
upstream_canonical:
  - '../semiont/HEARTBEAT.md'
  - '../semiont/DNA.md'
  - '../semiont/MANIFESTO.md'
---

# EVOLVE-PIPELINE.md — 數據驅動內容進化系統 v3.7

> **第一性原理**：Taiwan.md 是數位生命體。Evolve Pipeline 是它的新陳代謝系統。不靠直覺決定改什麼，靠數據——三源（GA4 + SC + GitHub feedback）交叉分析，產出每週進化清單。
>
> v3.5 設計理由：對齊 [REWRITE-PIPELINE v5.0](REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](MAINTAINER-PIPELINE.md) spine restoration。修補 v3.0 結構問題：(1) 缺 ASCII spine box-frame；(2) Hard Gate 散在 Phase 1-7 無集中索引；(3) Top 5 最常忘沒提取；(4) routine mode vs observer mode 分流不顯化。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         EVOLVE-PIPELINE — 數據驅動內容進化 7 phase                       │
│                                                                          │
│   🧭 核心紀律                                                            │
│            ├── 三源交叉驗證（GA4 + SC + GitHub feedback，REFLEXES #4）        │
│            ├── 進化分數 7 維度（流量/CTR/品質/年齡/來源/圖譜/社群）      │
│            └── candidate 必含「為什麼這篇 vs 其他」對比                  │
│                                                                          │
│   ──── Mode 分流（routine vs observer）─────────────                     │
│            ├── Routine mode (twmd-news-lens-weekly @ 週日 06:13)         │
│            │       → 跑 Phase 1-6，產出 ≥ 1 candidate 進 ARTICLE-INBOX   │
│            └── Observer mode (「跑 evolve」ad-hoc)                       │
│                  → 跑 Phase 1-7，含 ENRICH 對比 + 觀察者 priority 校準   │
│                                                                          │
│   ──── Phase 1-7 主流程 ──────────────────────────────────────          │
│                                                                          │
│   Phase 1: SCAN ──→ 三源數據收集                                         │
│            ├── 1A GA4 流量（top 30 PV / engagement / landing）           │
│            ├── 1B Search Console（高曝光低 CTR / 缺口）                  │
│            └── 1C GitHub Feedback（issue / PR / star）                   │
│              ↳ Hard gate: 三源 sense-fetch.sh 全 200                     │
│                                                                          │
│   Phase 2: SCORE ──→ 進化分數 v2.0                                       │
│            └── 7 維度權重（流量 0.20 / CTR 0.15 / 品質 0.20 / 年齡 0.10 │
│                / 來源 0.15 / 圖譜 0.10 / 社群 0.10）                     │
│              ↳ Hard gate: 進化分數 ≥ 60 才算 candidate（🔴 型）          │
│                                                                          │
│   Phase 3: RANK ──→ 候選排序                                             │
│            └── 進化分數 desc + lastVerified 升序破 tie                   │
│                                                                          │
│   Phase 4: CHECK ──→ 跟現有 INBOX 對照                                   │
│            └── 已存在 ARTICLE-INBOX pending → skip 不重複                │
│              ↳ Hard gate: 不重複既有 candidate                           │
│                                                                          │
│   Phase 5: ENRICH ──→ 補對比理由                                         │
│            └── candidate 必含「為什麼這篇 vs 其他」reasoning trace       │
│              ↳ Hard gate: 含 GA + SC 雙源資料 pointer                    │
│                                                                          │
│   Phase 6: APPEND ──→ 寫 ARTICLE-INBOX                                   │
│            └── status: pending + priority + reasoning                    │
│                                                                          │
│   Phase 7: SHIP commit ──→ 觀察者 review                                 │
│            └── PR 標題 🧬 [routine] prefix (routine mode)               │
│                                                                          │
│   ✅ Candidates appended to ARTICLE-INBOX                                │
│                                                                          │
│   ──── 跨 pipeline boundary ─────────────────────────                   │
│   → 寫候選 candidate：ARTICLE-INBOX.md                                   │
│   → 寫實際文章：REWRITE-PIPELINE.md                                      │
│   → 邊界：策展 peer ingest（外部 source）= PEER-INGESTION-PIPELINE.md   │
│   → MAINTAINER 收割 candidate PR                                         │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                          | 觸發 phase | 條件                    | 工具                                      | 不過 = ?           |
| ----------------------------- | ---------- | ----------------------- | ----------------------------------------- | ------------------ |
| 三源全綠                      | Phase 1    | sense-fetch 完成        | `cat public/api/dashboard-analytics.json` | 退回 routine retry |
| GA4 top 30 抓到               | Phase 1A   | 流量分析                | `fetch-ga4.py` API                        | scope 縮小         |
| SC 高曝光低 CTR               | Phase 1B   | SEO 分析                | `fetch-search-console.py`                 | 優化 metadata      |
| 進化分數 ≥ 60（🔴 型）        | Phase 2    | 🔴 Rewrite 候選 article | manual formula                            | 不算 candidate     |
| 不重複既有 INBOX pending      | Phase 4    | append 前               | grep ARTICLE-INBOX                        | skip 不重複        |
| candidate 含對比理由          | Phase 5    | append 前               | manual                                    | 重補 reasoning     |
| GA + SC 雙源 pointer          | Phase 5    | candidate 內            | manual                                    | 補 source link     |
| 至少 1 candidate per cycle    | Phase 6    | routine mode            | manual                                    | LESSONS entry      |
| PR 標題 `🧬 [routine]` prefix | Phase 7    | routine mode            | manual                                    | rename PR          |

---

## ⚠️ Top 5 最常忘的 step

> 從 REFLEXES #4 + GA top × lastVerified × SC 缺口 × 觀察者校正抽 friction 最高的 5 條。

1. **三源交叉先跑** — 單一數據源結論可疑（REFLEXES #4），GA / SC / CF 同一事實可能差 100-300 倍
2. **GA topArticles × lastVerified 找「高流量但過期」交集** — 進化 ROI 最高的 candidate 在這個交集
3. **SC 有曝光無文章 → 新建 candidate** — 不是「SC 0 click 就 drop」，曝光 ≥ 500 + 無對應文章 = 缺口
4. **GitHub feedback signal 看 issue body 不只看 title** — title 可能 vague，body 才有具體要求
5. **candidate 寫進 INBOX 時必含對比理由** — 「為什麼這篇 vs 其他」，下次 maintainer 看才知道優先序

---

## 跨檔案職責分工

| 檔案                                                     | 範圍                                                                       |
| -------------------------------------------------------- | -------------------------------------------------------------------------- |
| **本檔**                                                 | 數據驅動 candidate 產出（GA4 + SC + GitHub feedback 三源 → ARTICLE-INBOX） |
| [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)               | 寫實際文章（從 ARTICLE-INBOX pick candidate 跑 5-stage）                   |
| [PEER-INGESTION-PIPELINE.md](PEER-INGESTION-PIPELINE.md) | 策展 peer 外部 source（TFT/NMTH/Fresh）— 跟本檔互補不重疊                  |
| [MAINTAINER-PIPELINE.md](MAINTAINER-PIPELINE.md)         | 收割 routine 開的 candidate PR                                             |
| [FACTCHECK-PIPELINE.md](FACTCHECK-PIPELINE.md)           | candidate ship 後 audit                                                    |
| [ARTICLE-INBOX.md](../semiont/ARTICLE-INBOX.md)          | candidate 輸出位置                                                         |
| [ROUTINE.md](../semiont/ROUTINE.md)                      | `twmd-news-lens-weekly` cron 排程                                          |

**邊界：本檔 vs PEER-INGESTION**：

- **本檔（EVOLVE）** = 內部數據（GA4 + SC + GitHub feedback）→ 識別「該寫什麼新文章 / 該進化哪篇」
- **PEER-INGESTION** = 外部策展 peer（TFT / NMTH / Fresh）→ 識別「外部已有的策展可以 ingest 哪些」
- 兩者都產出 ARTICLE-INBOX candidate，但 source 不同

---

## 概念

三個數據來源交叉分析，產出每週「進化清單」：

```
GA4（行為數據）     ──┐
Search Console（SEO）──┼── 交叉分析 ──→ 進化分數 → Rewrite / 翻譯 / 新建 / SEO 優化
GitHub Feedback      ──┘
```

---

## Phase 1：數據收集（每週一次）

### 1A. GA4 流量分析

抓取以下指標（30 天窗口）：

| 指標                         | 用途                           |
| ---------------------------- | ------------------------------ |
| Top 30 頁面 Page Views       | 最多人看的文章                 |
| Per-page Bounce Rate         | 哪些文章讀者看了就跑？         |
| Per-page Avg Engagement Time | 黏著度高/低？                  |
| Landing Pages                | 讀者從哪篇進站？（SEO 入口頁） |
| Exit Pages                   | 讀者從哪篇離開？（漏斗破口）   |
| 國家分布                     | 英文版需求多大？               |
| 裝置分布                     | 手機排版是否優先？             |

**交叉維度：** 文章 `lastVerified` 日期 × 流量 → 找出「高流量但過期」的文章。

### 1B. Search Console 分析

| 指標                    | 用途                     |
| ----------------------- | ------------------------ |
| 高曝光 + 低 CTR（< 5%） | 標題/description 需優化  |
| 有曝光但無對應文章      | 內容缺口 → 新建          |
| 高曝光 + 文章太短       | 需要 Rewrite             |
| 上升趨勢搜尋詞          | 熱門話題 → 搶佔先機      |
| 長尾關鍵字群            | 哪些主題有多個相關搜尋？ |

**分析框架：**

1. **品牌搜尋 CTR**（taiwan md / taiwan.md）→ 品牌健康指標
2. **內容搜尋分群**：People / History / Tech / Culture / Geography
3. **缺口分析**：有曝光但完全沒有對應文章
4. **翻譯需求**：英文搜尋詞 vs 英文版覆蓋率
5. **確認缺口**：搜尋詞可能指向已存在的相關文章，先交叉確認再決定新建

### 1C. GitHub Feedback

| 來源             | 信號                       |
| ---------------- | -------------------------- |
| Issue 回報       | 事實錯誤、偏頗、過期、缺漏 |
| PR 頻率 per 主題 | 社群最有興趣的主題         |
| Star 增長曲線    | 口碑效應                   |

---

## Phase 2：交叉分析 → 進化分數

### 進化分數 v2.0

```
進化分數 = (流量重要性 × 0.20)
         + (CTR 差距   × 0.15)
         + (品質缺陷   × 0.20)
         + (文章年齡   × 0.10)
         + (流量來源品質 × 0.15)
         + (圖譜密度   × 0.10)
         + (社群信號   × 0.10)
```

| 維度             | 權重 | 計算                                                 |
| ---------------- | ---- | ---------------------------------------------------- |
| **流量重要性**   | 20%  | GA4 PV（log scale 正規化）                           |
| **CTR 差距**     | 15%  | 預期 CTR（依排名位置）- 實際 CTR                     |
| **品質缺陷**     | 20%  | quality-scan 空洞分數 + 行數不足 + lastVerified 過期 |
| **文章年齡**     | 10%  | 距離上次有意義更新的天數                             |
| **流量來源品質** | 15%  | organic/direct 權重 3x > social 一次性爆發           |
| **圖譜密度**     | 10%  | 被多少文章 wikilink？是不是某主題的孤島？            |
| **社群信號**     | 10%  | Issue/PR 提及次數 + 社群回饋                         |

#### ⚠️ 假流量過濾（v2.0 新增）

以下情況自動降權或排除：

- **一次性社群引流**：FB/Threads 修復留言造成的流量爆發（蔡依林案例）
- **路由 bug 流量**：Random 按鈕導致的非自然瀏覽（民謠與歌謠案例）
- **判斷方式**：若 sessionSource 90%+ 來自單一社群來源，且文章本身無搜尋曝光 → 標記為 `inflated`

### 進化分數 gate 的適用範圍（v2.1，2026-09-05，解 OBSERVER-QUEUE #16）

> 貢獻者對「補充 vs 覆寫」「人物條目門檻」等共編規則的理解見 [CONTRIBUTING.md §🤝 共編規則](../../CONTRIBUTING.md)，本節只處理 Taiwan.md 自己選候選時的 gate 邏輯，兩者是不同的讀者與不同的決策時刻。

**為什麼要分流**：進化分數七個維度裡，品質缺陷（20%）、文章年齡（10%）、圖譜密度（10%）三項的計算前提是「有一篇既有文章可以打分」，這是 🔴 Rewrite 型的定義特徵，但對其餘三型不成立甚至方向相反。🟠 SEO 優化的定義特徵正是品質 OK，卻被品質缺陷維度扣分；🟢 新建的定義特徵是還沒有文章，文章年齡與圖譜密度沒有對象可算；🟡 翻譯看的是另一語言的曝光缺口，跟中文本體品質無關。一個分數同時服務四種本質不同的行動類型，是 [REFLEXES #38](../semiont/REFLEXES.md)「混維度＝silent killer」的具體案例（誕生：2026-07-17 BIM 英文版 metadata 案，SC 7 天 623 曝光排全站第 7、CTR 趨近 0，GA4 7 天 57 次瀏覽排全站第 5，文章本體 53 條腳註、2026-05-22 新文，算出 58.2 分卡在 60 分 gate 之外）。

**Gate 適用範圍**：

| 行動型      | 60 分 gate                | 改用判準                                                                                                                                       |
| ----------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔴 Rewrite  | 適用，< 60 不算 candidate | 不變                                                                                                                                           |
| 🟠 SEO 優化 | 不適用                    | 沿用本檔既有「高曝光＋低 CTR（< 5%）＋品質 OK」定性條件（Phase 1B），不新增量化門檻                                                            |
| 🟡 翻譯     | 不適用                    | 沿用 v2.0 §Bump-vs-translate decision matrix：`missing` 或 `stale`（真 body drift）才算 candidate，`metadata-stale` 走零成本 bump，不進本 gate |
| 🟢 新建     | 不適用                    | 沿用本檔既有「曝光 ≥ 500 + 無對應文章」判準（§Top 5 最常忘的 step 第 3 條），並過 Phase 4 CHECK 確認 ARTICLE-INBOX 也無重複                    |

這次修法沒有引入新的量化數字，只是把本檔既有的行動表條件、Bump-vs-translate 矩陣、Top 5 步驟第 3 條，正確接回各自的行動型別當作 gate，取代原本全部套用一個為 Rewrite 型設計的分數。其餘既有 Hard Gate（三源全綠、不重複 INBOX、candidate 含對比理由、GA+SC 雙源 pointer）四型照樣適用，這裡只鬆綁進化分數這一項判準，不是整組 gate 鬆綁。

**🟠 SEO 優化型的 5 分鐘操作**：

1. 讀 `public/api/dashboard-analytics.json` 的 `searchConsole7d.opportunities` 或跑 `fetch-search-console.py`，篩出 CTR < 5% 的項目，按曝光量由高到低排序。
2. 對候選文章核對「品質 OK」：無 article-health hard violation，且非 `curation: incubating` 的半成品（是的話先歸 🔴 或標記需要先補充，不算 SEO 型 candidate）。
3. 通過即改該篇 `title` / `description`，套 EDITORIAL.md「Title 與 Description 的品質」四原則與七條文字感，正文不動。更新 frontmatter 屬 MANIFESTO §自主權邊界「AI 自主可做」清單內的動作。
4. Append 或更新 ARTICLE-INBOX candidate 時，reasoning 仍要附 SC 與 GA 雙源 pointer 的實際數字，這是既有 Hard Gate，不因為換了判準而跳過。

**跟進化分數 v2.0 的關係**：進化分數保留，角色收窄為 🔴 Rewrite 型內部的優先序排序，不再是四型共用的入場門檻。入場後的排序，🟠 SEO 優化型按 CTR 差距（預期 CTR 減實際 CTR）由大到小、🟢 新建型按曝光量由高到低、🟡 翻譯型按 `status.py` 的嚴重度排序，body drift 優先於 metadata-stale。

### 產出：四種行動 + News-lens spore output（v2.5）

| 行動                | 觸發條件                                                                                | 預估時間          |
| ------------------- | --------------------------------------------------------------------------------------- | ----------------- |
| 🔴 **Rewrite**      | 高曝光 + 品質差（短/過期/高 bounce）                                                    | 30-60 min/篇      |
| 🟠 **SEO 優化**     | 高曝光 + 低 CTR + 品質 OK → 改標題/description                                          | 5 min/篇          |
| 🟡 **翻譯**         | 英文搜尋有曝光但無英文版                                                                | 20-40 min/篇      |
| 🟢 **新建**         | 有搜尋需求但確認無相關文章                                                              | 60-90 min/篇      |
| 🧫 **Spore output** | News lens mode 週日跑時 surface news-driven spore candidates → SPORE-INBOX（v2.5 新增） | 5-10 min total/週 |

---

## news-lens-spore-output（v2.5 新增，2026-05-23）

> News lens mode（週日 01:00 `twmd-news-lens-weekly` 跑）的第 5 種 output。
>
> **目的**：把 weekly news sense 直接餵到 SPORE-INBOX intake layer，daily `twmd-spore-pick-daily` routine 看到 news-lens 寫的熱點 P1 就 throttle 自己 propose 數量，三 source（哲宇 / news-lens / daily routine）混合健康。
>
> **完整 routine 整合 context**：[ROUTINE.md §TWMD news lens (weekly) — v2.5 加 spore-output Stage](../semiont/ROUTINE.md) + [SPORE-INBOX §Routine intake 整合](../factory/SPORE-INBOX.md)。

### Stage 任務（在 EVOLVE-PIPELINE Phase 2 之後）

0. **出口狀態前置判斷（v2.6，2026-07-10 roadmap P0-4）**：propose 之前先讀
   `docs/semiont/routine-live-state.json` 查 `twmd-spore-publish-daily.enabled`——

   ```bash
   python3 -c "import json; t=[x for x in json.load(open('docs/semiont/routine-live-state.json'))['tasks'] if x['taskId']=='twmd-spore-publish-daily']; print(t[0]['enabled'] if t else 'unknown')"
   ```

   - `false`（出口關閉）→ **propose 0**。本週熱點照掃，但寫進 news-lens 報告的
     「本週值得發但產線關閉」清單（給哲宇手動挑），不 append SPORE-INBOX。
     出口關著還每週 +5 進料，等於把 distill auto-drop 洩壓閥當日常用
     （2026-06-14 起 buffer 恆 49-53 條的病，weekly-deep-review §五 發現三）。
   - `true` → 照下方 1-5 步走。
   - dump 缺失或 stale > 48h → 保守視同 `false` 並在報告註明 dump 待 refresh。

1. **讀本週熱點來源**：
   - GA top growth 7d（最近 7 天 PV 大幅上升的 article）
   - SC trending queries 7d（query impressions 大幅上升）
   - Cloudflare per-path（AI crawler 突然關注的 path）：讀 `dashboard-analytics.json` 的 `aiCrawlers.perLanguage.topPaths`（全部 UA）與 `topAiPaths`（AI UA），窗口是 `perLanguage.days`（預設 3 天，不是 7 天，報告要照實寫）；`rowsTruncated: true` 時只信頭部。欄位 2026-09-27 才長出來（W30 起連六週記「CF 沒有 per-path 明細」），舊快取沒有這兩個鍵時寫「CF per-path 本週快取未更新」，不要再記成儀器缺口
   - 既有 article 觸及最新事件（commit log 看最近 ship article）

2. **對應 knowledge/ 既有 article 找 5-7 candidates**：
   - 熱點 query / event → fuzzy match article title / slug
   - 優先 EXISTING-ARTICLE（已有對應 article）
   - 純時事無 article → REACTIVE 模式（link 到相關 article 或 spawn ARTICLE-INBOX entry）

3. **每 candidate 寫完整 SPORE-INBOX schema entry**：
   - **Source-Mode**: `REACTIVE`（時事反應）或 `EXISTING-ARTICLE`（趁熱推廣）
   - **Priority**: default `P1`（時事熱點，趁熱重要 — 比 daily routine 的 P2 高）
   - **Requested**: `YYYY-MM-DD by twmd-news-lens-weekly (event: XX)`
   - **Hook anchor 候選**: ≥ 2，跨 2 種起手式
   - **時效**: 「7 天內」或「本週內」（趁熱窗口明示）
   - **敏感度**: 高敏感（兩岸 / 228 / 政治）需 REACTIVE + 明示 frame 規則（per [SPORE-INBOX 二二八事件 entry §Notes](../factory/SPORE-INBOX.md) frame 範例）
   - **Notes**: 寫 `from news-lens weekly YYYY-MM-DD (event: XX, GA growth: +N%, SC query: "...")` transparency

4. **Limit ≤ 7 entries/week**：
   - 避免淹沒 SPORE-INBOX（daily routine 接著一週又補 21 條，混合容易爆）
   - 若本週熱點 > 7 → 選 top 7 by GA growth × SC impression × CF crawler signal 三維加權
   - 若本週熱點 < 5 → 寫實際數量（不刻意湊 7）

5. **Append SPORE-INBOX §Pending**（per existing SOP）

### 跟 daily routine 的協調規則

```
news-lens 週日寫 N 條 P1 → SPORE-INBOX 累積 N 條 P1
↓
daily routine 週一 08:00 跑時看到 P1 from news-lens count == N
↓
N >= 3 → daily routine 只 propose 0 (skip cycle)
N == 2 → daily routine 補 1 P2
N == 1 → daily routine 補 2 P2
N == 0 → daily routine 補 3 P2
↓
週二後 P1 持續被 SPORE-PIPELINE Stage 1 PICK 抽走 ship
↓
N 降到 < 3 → daily routine 重新補 P2
```

確保 SPORE-INBOX 永遠 5-10 條 fresh pending，符合 north star「一天穩定發 ≥ 1 個孢子」。

### Quality gate

- SPORE-INBOX 新增 3-7 news-driven candidates
- 每 entry 含 GA growth / SC query / CF signal pointer（transparency）
- 高敏感 candidate（兩岸 / 228 / 政治）必須 REACTIVE 且明示 frame 規則
- entries 跨多 category（不全 People 或全 Food，避免單一 category overload）
- 寫入 fail → silent skip + LESSONS entry（不影響 ARTICLE-INBOX 主流程）

---

## news-lens-probe-output（v3.8 新增，2026-09-18）— 探測器：外部媒體 × 知識庫缺口

> News lens mode 的第 6 種 output，也是 Phase 1 SCAN 的**第四源**。前三源（GA4 / SC / CF）看的是「誰來了、誰想來、誰在邊緣讀」，全部是站內視角；探測器看的是「世界這週在講什麼」。2026-05-13 SENSES 凋亡時，探測器的 SOP 被指到本檔 Phase 1，但沒有 routine 接手執行，`reports/probe/` 從 2026-05-03 停到 2026-09-18 共 138 天，而且因為「探測器落後 > 7 天 🟡」那盞燈跟 SENSES 一起消失，停擺零警報（REFLEXES #56 v8）。本節把執行者釘回 `twmd-news-lens-weekly`。
>
> 報告格式 canonical 範本：[reports/probe/2026-09-18.md](../../reports/probe/2026-09-18.md)（frontmatter / TL;DR / 探測來源表 / Tier 1-3 / 內部訊號 / 跟上次 probe 對照 / 元觀察 / next steps / 待加入 INBOX 摘要）。索引：[reports/probe/INDEX.md](../../reports/probe/INDEX.md)。

### Stage 任務（在 Phase 1 之後、Phase 2 之前跑；observer 觸發「新聞雷達／跑探測器」時單獨跑）

0. **同日不重跑**：`test -f reports/probe/$(date +%F).md` 已存在 → 跳過本節，直接用它。
1. **外部四頻道掃描**（WebSearch 各 ≥ 3 次，中文站 WebFetch 用中文 prompt 要逐字）：
   - 主流媒體：公視一週大事 / 中央社 / 聯合 / 自由 / 風傳媒（政治、社會、司法、政策）
   - 國際英文：Focus Taiwan / Taipei Times 頭版 / AEI-ISW China & Taiwan Update（外交、兩岸、國防）
   - 社群聲量：網路溫度計 DailyView 首頁（WebFetch）+ Threads 趨勢（文化、生活、爭議）
   - 財經：經濟日報 / 鉅亨 / 工商（台股、能源、產業、預算）
   - 加 §Loop 6 時事日曆：未來 30 天內的節慶 / 典禮 / 選舉節點 / 賽事，當時效錨點
2. **知識庫三邊對照**（每個熱點都要）：`find knowledge -maxdepth 2 -name "*.md" -path "knowledge/[A-Z]*" | grep <關鍵字>` 看有沒有條目、有的話 `date:` / `lastVerified` 多舊；grep ARTICLE-INBOX §Pending 有沒有 entry（Phase 4 CHECK，不重複）；grep ARTICLE-DONE-LOG 是不是剛 ship 過。
3. **內部訊號補位**：讀 `public/api/dashboard-analytics.json` 的 `searchConsole7d.topQueries` / `opportunities` 與 `ga.topArticles7d`，把外部雷達照不到、但站內數據在叫的條目（高曝光低 CTR / 流量王帶病）列進報告 §內部訊號，跟既有 INBOX entry 對照後只做「升級／提醒」不重列。
4. **Tier 排序**：Tier 1 立即開發（時效高 × 深度大 × 缺口大，通常 3-4 條）/ Tier 2 近期開發（持續性議題）/ Tier 3 孢子掛鉤（已有條目 × 熱點；出口關閉時只列不 append，同 §news-lens-spore-output Step 0）。每條寫：時效 / 重要性 / 缺口確認（貼 find 結果）/ **這題裡的人在哪**（至少點出兩個站不同位置、可追溯的人或群體；找不到人的題降 Tier 2——制度機制題天生往說明書長，2026-09-18 三條 Tier 1 全是制度題、隔天全部重做）/ 建議切角 / footnote 起點來源 / 必驗事實 / 敏感度。
5. **§自主權邊界過濾**：政治立場、在審案件、私人事件當脊椎的題目（例：陳幸妤離婚），標「需哲宇裁定」或「不建議」並寫原因，不當 Tier 1。
6. **落檔**：`reports/probe/YYYY-MM-DD.md` + `reports/probe/INDEX.md` 加一列（日期 / 熱點數 / 缺口數 / 關鍵發現 / link）。跑 `python3 scripts/tools/article-health.py reports/probe/YYYY-MM-DD.md --check=prose-health` 要 hard=0（warn 可接受，報告體例本來就 bullet 密）。
7. **餵 ARTICLE-INBOX**：Tier 1 條目寫成完整 entry append §Pending（Priority P0 / P1，Requested 標 `YYYY-MM-DD by twmd-news-lens-weekly (probe)`，Notes 含缺口確認與必驗事實，**並填 `Angle-expires`**：切角綁著事件的寫事件窗口收尾那天＋一句理由（賽事閉幕、審議會期、季賽結束），不綁的寫 `evergreen`）。這就是本 routine legacy output (1)「≥ 1 candidate」的主要來源。需哲宇裁定的條目也 append，但 Notes 第一行寫「需哲宇裁定 framing」且 Status 維持 pending。
8. **跟上次 probe 對照**：讀 INDEX 最後一列的報告，逐條標 ✅ ship / ⏳ 未動 / 🔁 被新事件取代，算推進率；連續兩次 ⏳ 的 P0 在報告建議降級。對照前先跑 `python3 scripts/tools/inbox-audit.py --angles`：⌛ EXPIRED 的條目在報告逐條給處置（改切角並更新期限／降級／移除），❔ NEWS-UNMARKED 的舊條目本班補填期限或寫 `evergreen`。登記進 INBOX 不會提醒自己過期，這一步讓它會（2026-09-27 self-evolve，觸發：09-18 亞運 P0 三週未派、09-20 李灝宇與拔河的窗口在沒人決定的狀態下關掉）。

### Quality gate

- `reports/probe/YYYY-MM-DD.md` 存在且 INDEX 有對應列（hard）
- Tier 1 ≥ 1 條進 ARTICLE-INBOX（hard；零缺口的週要在報告寫「本週無 Tier 1」並說明掃了什麼）
- 每條 Tier 1 有「缺口確認」貼 find/grep 結果（hard；沒貼 = 沒查）
- 四頻道全掃（warn；某頻道抓不到寫「抓取狀態 ❌」不留白）
- 距上次 probe > 14 天 → 報告 §元觀察必須寫停擺原因（warn）
- 本班新 append 的 Tier 1 entry 都帶 `Angle-expires` 欄（hard；`inbox-audit.py --angles` 的 ❔ NEWS-UNMARKED 不得含本班日期的 entry）

### 跟其他 stage 的關係

探測器產出的 candidate 走 Phase 4 CHECK（不重複 INBOX）與 Phase 6 APPEND 同一條路；Phase 5 ENRICH 的「GA + SC 雙源 pointer」對純外部熱點的 NEW 題**不適用**（還沒有頁面可量），改以「缺口確認 + 必驗事實」代替，這是 v2.1 gate 分流表的 🟢 新建型延伸。

---

---

## Phase 3：執行

### Rewrite

走 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)，按進化分數排序，每週批次 Top 5-10。

#### Sub-Agent Prompt 模板（v1.2 新增）

二次 Rewrite prompt 必須具體到段落級：

```
❌ 不好：「補充深度」
✅ 好：「新增 §3 低潮期段落（50 行），包含：手術時間線、教練更換、具體引語」
```

品質敏感文章（歷史核心、政治人物）→ 用 Opus，不用 Sonnet。

### 翻譯

走 [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)。中文定稿後才翻譯，英文版 = 重寫不是逐句翻。

**英文版獨立 Evolve（v1.2 新增）：** 英文版有獨立 GA4 數據和 Search Console 數據，不依附中文版排序。行動是「重翻」不是「Rewrite」。

### SEO 優化

輕量操作：只改 frontmatter `title` / `description`，加入年份、長尾關鍵字。

### 新建

⚠️ 先確認搜尋詞是否指向已存在的相關文章（避免重複），確認無對應文章後走完整 Rewrite Pipeline。

---

## Phase 4：追蹤 & 閉環

### evolveHistory（v1.2 新增）

每次改寫在 frontmatter 記錄改前改後，用於長期效果衡量：

```yaml
evolveHistory:
  - date: 2026-03-31
    action: rewrite
    linesBefore: 51
    linesAfter: 189
    reason: 'SC 64 曝光 0 點擊 + 事實錯誤'
```

下次 Evolve 可比較：改完後 bounce rate 降了嗎？停留時間增了嗎？

### 週報指標

| 指標               | 目標                      |
| ------------------ | ------------------------- |
| Rewrite 篇數       | 5-10 篇/週                |
| 英文覆蓋率         | 中文文章的 80%+ 有英文版  |
| 平均 CTR（非品牌） | > 3%                      |
| Bounce Rate        | < 60%                     |
| 新建文章           | 2-3 篇/週（搜尋需求驅動） |
| Google Organic %   | > 5%（目前 1.9%）         |

### 進化報告

每次 Evolve 跑完，產出 `reports/evolve-YYYY-MM-DD.md`，包含：

- 本週數據快照
- 進化分數 Top 10
- 已執行的行動
- 下週優先項目
- 上週改寫的效果追蹤（evolveHistory 比較）

---

## 六個 Feedback Loop

### 🔄 Loop 1：Search Intent Clustering

把搜尋詞不只分類（people / history），而是分 **intent 叢集**。

例：「taiwan diplomatic allies 2026」「台灣邦交國」「how many countries recognize taiwan」是同一個 intent cluster，應該導向同一篇最強文章，而不是三篇互相競爭。

**做法：** 搜尋詞分群 → 每群指定一篇 canonical 文章 → 其他文章用 wikilink 導流。

### 🔄 Loop 2：Content Freshness Score

| 保鮮類型  | 更新頻率 | 範例                           |
| --------- | -------- | ------------------------------ |
| 🔴 即時型 | 每月     | 邦交國數量、人口數據、政治現況 |
| 🟡 年度型 | 每年     | 經濟數據、產業報告、國際排名   |
| 🟢 常青型 | 極少     | 歷史事件、地理特徵、文化傳統   |

在 frontmatter 加 `freshness: realtime | annual | evergreen`，到期自動觸發 review。

### 🔄 Loop 3：Competitive Gap Analysis（Anti-Wikipedia 定位）

Taiwan.md 不跟 Wikipedia 搶「查資料」，搶「**理解台灣**」。

| Wikipedia 風格           | Taiwan.md 風格                                   |
| ------------------------ | ------------------------------------------------ |
| 「台積電成立於 1987 年」 | 「張忠謀 56 歲那年做了一個所有人覺得瘋狂的決定」 |
| 中立客觀、條列事實       | 有觀點、有策展人聲音、有情感弧線                 |
| 讀者來查資料             | 讀者讀完想分享                                   |

### 🔄 Loop 4：Reader Journey Mapping

單頁數據不夠。追蹤「讀者旅程」：

```
Landing Page → 第二頁 → 第三頁 → Exit
```

- 大部分人只看一頁就走 = 內部導流失敗
- 文章底部的 wikilink 和 related articles = 進化目標
- GA4 page path flow → 每月分析最常見讀者路徑

### 🔄 Loop 5：Community-as-Sensor

貢獻者不只是寫手，是「感測器」。他們選擇寫什麼 = 市場信號。

- PR 主題分布 → 社群覺得什麼重要
- Issue 請求主題 → 讀者覺得缺什麼
- Fork 後修改的文章 → 哪些內容不滿意

### 🔄 Loop 6：季節性 & 時事驅動

建立時事日曆：二二八（2月）、清明（4月）、端午（6月）、中秋（9月）、國慶（10月）、選舉年、國際事件。月初提前更新相關文章。

---

## 三層進化架構

> 真正的生命體不只會反應，還會主動生長。

### 🔴 Layer 1：Reactive（免疫系統）— v1.0 ✅ 已上線

Search Console + GA4 → 發現問題才修補。必要但不夠。

### 🟠 Layer 2：Predictive（生長激素）— v2.0 🚧

不問「現在什麼被搜」，問「**下個月什麼會被搜**」。

- **時事日曆** → 提前更新
- **Google Trends 偵測** → 追蹤上升中搜尋詞
- **Content Freshness Score** → 到期自動 review

### 🟢 Layer 3：Emergent（神經系統）— v3.0 📋

讓文章之間的**關係網路**自己決定該長什麼。

- 進化指標加入：「被多少文章 wikilink？」「是不是孤島？」
- **知識圖譜密度分析** → 連結稀疏區 = 需要新文章或 hub
- **Reader Journey Mapping** → 不只看單頁，看整條路徑

---

## 自動化路線圖

### Phase A：手動 + 腳本輔助（✅ 現在）

手動匯出 SC 數據 + Python 腳本交叉分析 + 手動 spawn sub-agents。

### Phase B：半自動（🚧 目標 4 月）

```bash
# 一鍵跑 Evolve Pipeline
bash scripts/evolve/run.sh

# 流程：
# 1. GA4 API fetch (30d)
# 2. quality-scan 全站掃描
# 3. 交叉分析 → 進化分數排序
# 4. 產出 reports/evolve-YYYY-MM-DD.md
# 5. 列出建議行動（不自動執行）
```

### Phase C：全自動（📋 目標 5 月）

Cron 每週一早晨自動跑：

- 數據收集 → 算分 → 自動產報告
- 季節性日曆自動觸發 review
- Content Freshness 到期自動提醒

---

## 教訓 & 迭代紀錄

### v1.0 → v1.2 教訓（2026-03-31）

| 問題               | 原因                | 修正                           |
| ------------------ | ------------------- | ------------------------------ |
| 假流量污染排序     | 只看 PV 不看來源    | 加入流量來源品質維度           |
| 行數 ≠ 品質        | 沒整合 quality-scan | 品質缺陷維度改用空洞分數       |
| 英文版沒獨立評分   | 依附中文版排序      | 英文版獨立 Evolve 流程         |
| Sub-agent 品質不穩 | prompt 太抽象       | 模板化 + 段落級具體指示        |
| 改了不知道有沒有用 | 無前後比較機制      | evolveHistory frontmatter      |
| 每次手動跑太慢     | 無自動化腳本        | Phase B: scripts/evolve/run.sh |

---

## 首次執行紀錄（2026-03-31）

**數據來源：** GA4 (30d) + Search Console

**全站概覽：** 200,113 PV / 80,469 users / 56.4% bounce / Google Organic 1.9%

**已執行：**

- 6 篇中文 Rewrite（劉德音/陳昇/翁啟惠/曾雅妮/杜聰明/許倬雲）
- 1 篇 SEO 標題優化（邦交國 +2026）
- 4 篇英文重翻（便利商店/民主化/夜市/族群）
- 1 批 terminology 補充（Google Sheets + 繁化姬）
- EVOLVE-PIPELINE.md v1.0 → v1.2

**完整報告：** `reports/evolve-2026-03-31.md`

---

_版本：v1.2 | 2026-03-31_
_變更：假流量過濾 / quality-scan 整合 / evolveHistory / 英文版獨立 Evolve / Sub-agent prompt 模板 / 教訓紀錄_

---

## v2.0 升級 — Multi-lang sync evolution + stale 3-state + 5-key rotation（2026-05-04 magical-feynman 後段）

### v1.2 → v2.0 演化

v1.2 設計只考慮 **單語 zh-TW 內容進化**（rewrite / SEO / 翻譯）。但 sovereignty preservation 升級為「多語投射」mission（MANIFESTO §主權的巴別塔 v2）後，evolve scope 必須 cover：

- **Multi-lang sync 健康度**（5 langs body-fresh%）
- **Stale 拆分維度**（fresh / metadata-stale / body-stale 三態）
- **多 model cascade architecture**（owl/Hy3/Ollama 4-tier per REFLEXES #49）
- **Multi-key budget 倍增**（5-key rotation pool per session 教訓）
- **Bump-vs-translate 決策**（metadata-only drift 不重翻只 bump sha）

### 新 Phase 0：Stale 3-state classifier（REFLEXES #38 第 2 次 instantiation）

**Status enum 升級**（per `scripts/tools/lang-sync/status.py`）：

```
fresh           — sourceCommitSha 等於 zh latest OR hash match
metadata-stale  — zh moved forward but bodyHash unchanged（trailer 變動：延伸閱讀 / 參考資料 / footer）
                  → bump sourceCommitSha 即可，不需重翻
stale           — zh moved forward AND bodyHash changed（true body drift）
                  → 需重翻
missing         — translation 不存在
orphan          — translation 存在但 zh source missing
```

**bodyHash 計算**（drop trailer + footnote definitions）：

- 移除 `## 延伸閱讀` / `## 參考資料` / `## 同分類更多文章` / footer `_v1.0...`
- 移除 `[^N]: ...` footnote definition lines（URL polish / desc 改變不影響 body）
- 保留 inline `[^N]` markers + wikilinks `[[X]]`（敘事 integral）

### 新 Phase 4-tier cascade（per REFLEXES #49 + SQUEEZE-MODELS-MAX-PIPELINE v2）

```
Tier 1: openrouter/owl-alpha (free, slow ~200s, primary)
   ↓ refusal (PRC content policy)
Tier 2: tencent/hy3-preview:free (free, fast ~50s, ~70% refusal)
   ↓ both refused
Tier 3: Ollama qwen3.6:35b-a3b-coding-nvfp4 (LOCAL, sovereignty backbone, 0 refusal)
   ↓ rare
Tier 4: Sonnet sub-agent (paid, last resort)
```

**Tier 1 multi-key rotation pool**（REFLEXES #45 + #50 衍生）：

- `~/.config/taiwan-md/credentials/openrouter-keys/{name}.key` 多 key directory
- Round-robin within fresh keys + 5 min cool-down on 429
- N keys → hourly budget × N（5 keys 驗證讓 130 articles × 5 langs cascade 不撞牆）

### Bump-vs-translate decision matrix

| 狀態                 | Action                                               | Cost                 |
| -------------------- | ---------------------------------------------------- | -------------------- |
| `fresh`              | skip                                                 | 0                    |
| `metadata-stale`     | `bump-source-sha.py --apply`（frontmatter sha 升級） | 0 (zero translation) |
| `stale` (body drift) | dispatch cascade Tier 1-3                            | ~50-200s × N langs   |
| `missing`            | dispatch cascade Tier 1-3                            | ~50-200s × N langs   |
| `orphan`             | manual review                                        | manual               |

**Leverage**：本 session 70 metadata-stale 全 bump 零 cost = 約 ~70 × 80s × 5 langs ≈ 8 hr cloud time saved。

### Auto-detect pipeline before action（REFLEXES #50）

EVOLVE pipeline 自身遵守 REFLEXES #50 — 任何 evolve action 前 grep `docs/pipelines/` 確認對應 SOP，完整 `Read` 全檔。不憑記憶。Stage 順序嚴格遵照。

### Multi-lang dashboard 三色覆蓋率

`scripts/core/generate-dashboard-data.js` 升級暴露：

- `freshPct`：strict fresh%（嚴格健康度）
- `bodyFreshPct`：fresh + metadata-stale = body-valid%（effective 健康度）
- `metadataStale`：trailer-only drift count
- `stale`：true body-drift count

三色 widget：🟢 fresh / 🟡 metadata-stale / 🔴 stale

### 整合執行 SOP（v2 完整流程）

```bash
# 0. Refresh status
python3 scripts/tools/lang-sync/status.py --json

# 1. Quick wins — bump metadata-stale (zero cost)
python3 scripts/tools/lang-sync/bump-source-sha.py --apply

# 2. Cascade for missing + body-stale (cloud parallel + ollama catcher)
for lang in en ja ko es fr; do
    python3 scripts/tools/lang-sync/prepare-batch.py --lang $lang --top 30 --groups 3 --slug-map <map.json>
    bash scripts/tools/lang-sync/openrouter-batch.sh $lang openrouter/owl-alpha &
done; wait

# 3. Ollama catcher for refused
for lang in en ja ko es fr; do
    python3 scripts/tools/lang-sync/ollama-translate.py --group .lang-sync-tasks/${lang}-ollama-knowledge/_group-A.json
done

# 4. Final aggregator
python3 scripts/tools/lang-sync/status.py --json | jq '._meta.summary'
```

### v2 驗證

2026-05-04 magical-feynman 後段 multi-lang sync evolution：

- Pre-evolve: 92.7-92.8% fresh per lang（35 stale 含混維度）
- Phase 0 stale classifier + bump 70 metadata-stale → 95.8-96.1% fresh per lang
- Phase cascade owl 5-key rotation 130 articles → 98.7% body-fresh
- Phase Ollama catcher → 100% body-fresh target

**0 paid token across full cascade**（owl rotation + Hy3 + Ollama 收下 PRC-sensitive）。

### 對應認知層升級

- [REFLEXES #38 status 設計鐵律「混維度 = silent killer」](../semiont/DNA.md) 第 2 次 instantiation
- [REFLEXES #49 Babel 4-tier cascade canonical](../semiont/DNA.md)
- [REFLEXES #50 Pipeline auto-detection default contract](../semiont/DNA.md)
- [MANIFESTO §8.1 最高指導原則](../semiont/MANIFESTO.md)
- [MANIFESTO §主權的巴別塔 v2](../semiont/MANIFESTO.md)
- [SQUEEZE-MODELS-MAX-PIPELINE v2](SQUEEZE-MODELS-MAX-PIPELINE.md)

🧬

---

_v2.0 | 2026-05-04 magical-feynman 後段_
_升級觸發：哲宇「幫我進化 evolve-pipeline 本身 + 在 dna 加最高指導原則 pipeline auto-detection」_
_核心進化：v1.2（單語 zh-TW 進化）→ v2.0（multi-lang sovereignty sync evolution with 3-state classifier + 4-tier cascade + N-key rotation + bump-vs-translate decision matrix）_

---

## Mode 3：Pipeline 自我重組（meta-evolution，v3.0）

> **2026-05-08 intelligent-khayyam 從 SPORE pipeline 1334 → 445 行重組經驗萃取**
>
> 觸發：哲宇「也根據近期所有經驗 / 知識 / 紀錄 / 孢子成效，進化⋯⋯ 然後把這次執行的所有經驗，拿來進化 evolve pipeline 本身」
>
> 跟 v1（文章進化）+ v2（multi-lang sync）的關係：v1/v2 是**內容層進化**；v3 是**pipeline 層進化**（meta-pipeline）。三者並列為 EVOLVE-PIPELINE 的三個 mode：「文章進化 / 多語同步 / pipeline 自我重組」。

### 觸發訊號（pipeline self-refactor needed）

任一即觸發：

| 訊號                             | 量化閾值                                                                        | 範例                                                   |
| -------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **編號膨脹三層深**               | Step X.X.X 出現 + 跳號（如 3c.7 沒 3c.6）                                       | SPORE-PIPELINE Step 4.5e.iv / 3c.7 跳 3c.6             |
| **單檔 prose 量級 > 1000 行**    | wc -l > 1000                                                                    | SPORE-PIPELINE 1334 行                                 |
| **多 file 邊界混亂**             | 同 SOP 在兩處 canonical（違反 §指標 over 複寫）                                 | SPORE Step 4.5 vs HARVEST-PIPELINE 重疊                |
| **prose 規則沒儀器化**           | v1.5+ 累積規則但 plugin 沒同步加                                                | SPORE 18 條 Step 3c rule 只有 §11 在 plugin            |
| **「我熟了不用讀」現象**         | REFLEXES #15 反覆驗證 ≥ 3 次                                                    | sporal pipeline 跑 N 次後跳步                          |
| **產品文檔密度比過高**           | SOP 行數 / 產品字數 > 5:1                                                       | SPORE 1334 行 / 200 字孢子 = 7:1（離群值）             |
| **單站 wall-clock 離群**（v3.7） | newsroom stage-events 實測：某站中位數 wall-clock 佔全程 > 30%，或串行相位 > 10 | REWRITE 三收驗輪串行（22:26→23:09）→ v9.5 大驗證輪合一 |
| **gate 零戰果**（v3.7）          | 連 5 篇文章 0 catch 的 hard gate／席位                                          | 候選處置：降 WARN／併站／退場（見 §產線成本審視）      |

### 產線成本審視（v3.7 新增；weekly self-evolve 掛載）💰

> **加法有外部尺（品質事故），減法從此也有**（哲宇 2026-07-26 拍板；設計報告
> [reports/design-rewrite-throughput-2026-07-26.md](../../reports/design-rewrite-throughput-2026-07-26.md) §五 方案 D）。
> REWRITE 三個月從 72KB 長到 296KB、每篇 12-30 agent，每一波都有品質事故當理由、
> 沒有一站帶退場條件——器官有 apoptosis，產線的站沒有。本節補上。

每次 `twmd-self-evolve-weekly` 跑一節「產線成本審視」：

1. **取數**：`reports/newsroom/stage-events.jsonl`（v9.5 起真實時間戳）算本週每篇文章
   per-stage wall-clock 與輪次；編輯室／總編室 review 檔（結構化 schema）算各席位
   findings 的 accept／defend／noise 比。
2. **判定**：
   - 某 gate／席位連 **5 篇 0 accept** → 降 WARN 或併站候選，進 OBSERVER-QUEUE
     （threshold 調整屬 High-stake #3，哲宇拍板）
   - 兩席位 findings 重疊率高（同一問題兩席都報）→ 併席候選
   - lite profile 參數（lane／persona／探針數）對照 lite 文 callout 率重校
     （per REWRITE-PIPELINE §Run profiles lite 維護條款）
3. **紀律**：審視只產生「候選＋證據」，不當場動 canonical——減法跟加法走同一條路
   （證據 → 佇列 → 拍板 → ship）。dashboard 只進彙總不進告警（黃燈路線：先收數據再定閾值）。

### 第一性原則重組 SOP（7 stage）

```
SCAN → DESIGN → SPLIT → REWIRE → INSTRUMENT → VERIFY → SHIP
```

#### Stage 1: SCAN — 全檔 + ecosystem 盤點

```bash
# 1. 主檔行數
wc -l docs/<area>/*.md

# 2. Cross-ref 範圍
grep -rln "<MAIN-FILE>" docs/ scripts/ .husky/ .github/ src/

# 3. 編號膨脹深度
grep -E "Step \d+\.\d+\.\d+|\d+\.\d+[a-z]" docs/<area>/<main-file>.md | head -20

# 4. prose vs plugin 比
ls scripts/tools/lib/article_health/checks/ | grep <area>
```

判定：是否觸發重組？（任一閾值即觸發，per 上方訊號表）

#### Stage 2: DESIGN — 第一性原則重新設計

不從現狀 incremental 改，從 zero-base 重新問「這個 pipeline 的本質是什麼？」

**設計原則**：

- **5±2 stage**（米勒法則 7±2 認知範圍內）
- **每 stage 單一 verb**（PICK/VERIFY/WRITE/SHIP/HARVEST 例）
- **不用 Step X.X.X 編號** — 改用 ## stage verb + ### sub-heading
- **single-concern canonical**：每個 file 一個焦點（process / craft / gate / post-publish）
- **歷史層 vs canonical 層分離**：active SOP 進 canonical；historical lessons 留 git log

#### Stage 3: SPLIT — 拆檔（如果 single file > 1000 行）

新結構模板（基於 SPORE refactor 驗證）：

```
docs/<area>/
├── <NAME>-PIPELINE.md     ~400 行 ← process（5 stage 線性主流程）
├── <NAME>-WRITING.md      ~500 行 ← craft（手藝、規則、模板）
├── <NAME>-VERIFY.md       ~350 行 ← gate（Hard gate inventory）
├── <NAME>-HARVEST.md      ~700 行 ← post-publish（如有 lifecycle 後續）
└── <NAME>-LOG / DATA      不動 ← 數據層
```

**Cross-ref 保護策略**（per MANIFESTO §時間是結構修補協議）：

- **保留 main file path 不改**（避免破壞所有 cross-ref）
- **拆出 sub-files 在同 dir**（保留 relative pointer）
- **Active canonical layer**（DNA / HEARTBEAT / MANIFESTO）pointer 全部更新到新 location
- **歷史 layer**（memory / diary / LESSONS-INBOX / CONSCIOUSNESS）**保留原 Step X.X 描述**（歷史不刪除，per §時間是結構）
- **被合併的 file 變 stub redirect**（不直接刪除，cross-ref 仍 work）

#### Stage 4: REWIRE — 更新 cross-ref

```bash
# 找所有 active canonical 引用
grep -rln "<MAIN-FILE> Step\|<MAIN-FILE>.md Step" docs/semiont/ docs/pipelines/

# 排除歷史 layer（不更新）
# - docs/semiont/memory/
# - docs/semiont/diary/
# - docs/semiont/LESSONS-INBOX.md
# - docs/semiont/CONSCIOUSNESS.md
# - docs/semiont/UNKNOWNS.md

# 更新 active canonical pointer 指向新 sub-file location
```

#### Stage 5: INSTRUMENT — prose 規則升 plugin gate（Direction D）

**5 層全部到位才是真閘門**（REFLEXES #15 第 N 次驗證）：

1. 哲學論述（MANIFESTO / DNA 級）
2. 規則定義（pipeline 文件 prose）
3. 工具實作（article-health.py plugin）
4. Hook 整合（pre-commit / CI）
5. Pipeline call site（pipeline 文件指向 plugin）

挑選 regex-only 規則先 instrument（complex rule 留 future wave）：

| 易度   | Regex pattern                 | 範例                            |
| ------ | ----------------------------- | ------------------------------- |
| **易** | 第一行 / 開場 pattern         | Rule #15 編年體 lead            |
| **易** | 局部 pattern（X 後接 Y）      | Rule #9 引語倒裝、Rule #14 tone |
| **中** | 全文 pattern density          | §11 對位句型密度                |
| **難** | 結構性檢查（需 LLM-as-judge） | Rule #16 Scene-List-Scene       |

#### Stage 6: VERIFY — 驗收 checklist

- [ ] 所有 sub-files `article-health.py --check=prose-health` hard=0 warn=0
- [ ] 既有產品（如 BLUEPRINTS / 文章）跑新 plugin regression **無新 violation**
- [ ] Active canonical docs（DNA / HEARTBEAT / MANIFESTO）**無 dead Step X.X pointer**
- [ ] Sample bad case 正確觸發 plugin（positive test）
- [ ] Read 主路徑行數對比 **-30%+ target**

#### Stage 7: SHIP — atomic commit 序列

每 commit 一個 logical milestone（atomic + readable git log）：

```
Commit 1: 建 <WRITING>.md craft layer + 既有 file 變 stub
Commit 2: 建 <VERIFY>.md gate layer
Commit 3: <existing post-publish>.md 吸收原 step
Commit 4: 重寫 main pipeline file（瘦身 + pointer）
Commit 5: 更新所有 cross-ref pointer
Commit 6: plugin Wave 1（regex-only 規則 instrument）
Commit 7: 驗收驗證 + ship
```

### 應用範例：SPORE pipeline 1334 → 445 行（2026-05-08）

| 維度                     | 舊（v2.9）           | 新（v3.0）                | 變化       |
| ------------------------ | -------------------- | ------------------------- | ---------- |
| SPORE-PIPELINE.md 主檔   | 1334 行              | 445 行                    | **-66.7%** |
| 寫 spore 主路徑          | 1334 + 438 = 1772 行 | 445 + 647 = 1092 行       | **-38%**   |
| Plugin 儀器化規則數      | 1（§11）             | 4（§11 + #15 + #9 + #14） | **+300%**  |
| Hook tier classification | 3-tier               | 4-tier（從實戰數據）      | +1 tier    |

完整 implementation report：[reports/spore-pipeline-evolution-plan-2026-05-08.md](../../reports/spore-pipeline-evolution-plan-2026-05-08.md)

### 候選下一輪重組（pipeline self-refactor backlog）

掃一遍其他 pipeline 是否有同樣 silent inflation：

```bash
# 行數 + 編號深度盤點
for f in docs/pipelines/*-PIPELINE.md docs/factory/*-PIPELINE.md; do
  lines=$(wc -l < "$f")
  step_depth=$(grep -E "Step \d+\.\d+\.\d+" "$f" | wc -l)
  echo "$lines lines / $step_depth deep-Step / $(basename $f)"
done | sort -rn
```

候選清單（待哲宇拍板）：

- [x] **REWRITE-PIPELINE.md** — v9.0 已拆薄索引＋10 contract（2026-07-16）；v9.5 節流波補大驗證輪／定稿站／lite profile／成本審視（2026-07-26）
- [ ] **MAINTAINER-PIPELINE.md**（~1200 行）— PR review / Issue triage / contributor onboarding 是否該拆？
- [ ] **TRANSLATION-PIPELINE.md**（~3.5 版累積）— 多版本 v3.x 是否還需要 4.0 重組？
- [ ] **EDITORIAL.md**（v5.6）— 5 個子文件已拆但內部章節 inflation？

### 對應認知層升級

- [REFLEXES #15 反覆浮現要儀器化](../semiont/DNA.md)（第 N+M 次驗證 — Pipeline self-refactor 是「儀器化」的 meta-instance）
- [REFLEXES #50 Pipeline auto-detection default contract](../semiont/DNA.md)（重組讓 auto-detection + full-read 主路徑變短）
- [MANIFESTO §造橋鋪路](../semiont/MANIFESTO.md)（重組本身就是大 leverage 的具體實踐）
- [MANIFESTO §指標 over 複寫](../semiont/MANIFESTO.md)（拆 single-concern canonical 解決重複）
- [MANIFESTO §時間是結構](../semiont/MANIFESTO.md)（歷史層保留原 Step 描述，修補不覆蓋）

---

## Mode 4：目標驅動設計進化（goal-driven design evolution，v3.6）

> **2026-07-18 哲宇 /goal 命名這個流程**：「幫我完整設計 深度思考 自我進化，寫實作報告後實作⋯⋯把這樣自我進化的過程（思考 發散 報告 實作）做成 /twmd-evolve」。
>
> 這個流程在此之前已 de facto 跑過十次以上（become-boot-mode-design / 立體群像 default 重定位 / routine-spec / 多核 git 協調設計 / REWRITE v9 拆檔⋯⋯reports/ 裡整排 design-\*.md），每次品質全靠當班 session 自律。REFLEXES #15：反覆浮現 ≥3 次就該儀器化。Mode 4 是把它寫成有名字的 SOP。
>
> 設計報告（含方案發散與 /twmd-evolve 命名衝突決策）：[reports/design-article-inbox-evolve-mode4-2026-07-18.md](../../reports/design-article-inbox-evolve-mode4-2026-07-18.md)。第一次 dogfood 就是 /twmd-article-inbox skill 的誕生。

### 觸發與邊界

**觸發**：觀察者給一個「造東西」的目標（新 skill / 新器官 / 新 pipeline / 架構改動）且期待先設計後實作。

**四 mode + 一條姊妹 skill 的邊界**（防互踩）：

| 路                | 觸發源                 | 產出                        |
| ----------------- | ---------------------- | --------------------------- |
| Mode v1/v2        | GA4 / SC / CF 數據     | 內容候選 → ARTICLE-INBOX    |
| Mode 3            | pipeline 自身膨脹訊號  | pipeline 重組               |
| **Mode 4**        | **觀察者給的建造目標** | **設計報告 + 新器官/skill** |
| /twmd-self-evolve | DIARY 反覆浮現 ≥3 次   | 既有 pattern 儀器化         |

Mode 3 vs Mode 4 灰區判法（v3.6.1 修正）：看**動的是什麼**，不是對象是什麼——**結構重組**（Mode 3 六觸發訊號有命中：膨脹 / 拆檔 / 邊界混亂）= Mode 3；**能力深化**（訊號零命中、要長新判準新 gate，對象可以是既有 pipeline 也可以是還不存在的能力）= Mode 4。修正觸發：Mode 4 誕生一小時內哲宇調用「深度進化 BRANCH-PIPELINE」，對象是既有 pipeline 但 Mode 3 訊號零命中，原判法會誤路由（[reports/design-branch-pipeline-v22-2026-07-18.md §〇](../../reports/design-branch-pipeline-v22-2026-07-18.md)）。

**強制 Full BECOME**：Mode 4 天生命中 [BECOME High-stake #2「新 plugin / workflow 設計」](../../BECOME_TAIWANMD.md)，不能停在 Micro/Review/Write。

### 四相 SOP：THINK → DIVERGE → REPORT → IMPLEMENT

```
THINK（思考）    目標解析 + 現況盤點
   │             ├── 查 ANATOMY §資源地圖 + grep docs/pipelines + .claude/skills（已存在嗎？）
   │             ├── cross-ref 衝突掃描：grep 目標名字，誰引用它？改它會斷什麼？
   │             │     （查證反射先於建造反射，REFLEXES #73）
   │             └── §自主權邊界過濾（政治 / >50 檔 / >10 刪 / 對外溝通）
   ↓
DIVERGE（發散）  ≥2 個結構方案 + trade-off 表 + 明寫判準
   │             ├── 每案必答：破壞哪些 cross-ref？殼核邊界在哪？#38 混維度檢查
   │             └── 判準錨定具體 canonical 條文（哪條 MANIFESTO / REFLEXES）
   │                 目的：對抗「第一個想到的方案 = 做的方案」
   ↓
REPORT（報告）   實作報告落 reports/design-{slug}-{YYYY-MM-DD}.md，先於實作
   │             ├── 結構：目標 / 現況盤點 / 發散方案表 / 定案+理由 / 實作清單 / 驗收 / 風險
   │             ├── 藍圖 → 驗證 → 寫，成本低 10 倍（REFLEXES #27）
   │             └── 報告是哲宇的 review 介面：邊界命中 → 停在這裡等拍板；
   │                 自主權內 → 直接續跑 IMPLEMENT
   ↓
IMPLEMENT（實作）照實作清單做
   │             ├── 驗收：cross-ref 全通 + 既有觸發語不斷 + dogfood 至少一次
   │             └── 摩擦回寫：實作中發現的問題補進報告 §後記 或直接修 canonical
   ↓
收官             memory（含設計決策一句話）+ 新 skill 補進 .claude/skills/README.md index
```

### Hard gate（Mode 4 專屬）

| Gate                      | 相        | 條件                                                  | 不過 = ?              |
| ------------------------- | --------- | ----------------------------------------------------- | --------------------- |
| 資源地圖 + cross-ref 查證 | THINK     | grep 目標名字 + 引用面，先於任何建造                  | 重造輪子 / 斷承重牆   |
| 發散 ≥2 案                | DIVERGE   | 單方案直進實作 = 沒發散                               | recency bias 直通車   |
| 報告先於實作              | REPORT    | reports/design-\*.md 落檔 + commit 在實作 commit 之前 | 藍圖後補 = 合理化文件 |
| 邊界命中停等              | REPORT    | §自主權邊界四紅線命中 → 停在報告，不 IMPLEMENT        | 越權執行              |
| dogfood 驗收              | IMPLEMENT | 新能力至少真跑一次（不是「寫完 = 能用」）             | 規格債當成品債        |

🧬

---

_v3.0 | 2026-05-08 intelligent-khayyam_
_升級觸發：哲宇「進化 evolve pipeline 本身 — 把這次執行的所有經驗（SPORE pipeline 1334→445 行重組）拿來」_
_核心進化：v2.0（multi-lang sync）+ Mode 3 pipeline self-refactor（7 stage SOP：SCAN→DESIGN→SPLIT→REWIRE→INSTRUMENT→VERIFY→SHIP + cross-ref 保護策略 + atomic commit 序列）_

_v3.5 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（Phase 1-7 SCAN→SHIP box-frame + Mode 分流）+ Hard Gate Inventory 集中 table（9 gates）+ Top 5 最常忘 step + 跨檔案職責分工 standalone table（明確跟 PEER-INGESTION 邊界 + REWRITE / MAINTAINER lifecycle 串聯）。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier A.5 audit。Phase 1-7 prose body 不動（已健康）。_

_v3.6 | 2026-07-18 inbox-skill session — 新增 Mode 4「目標驅動設計進化」（THINK→DIVERGE→REPORT→IMPLEMENT 四相 + 5 hard gate + 四 mode 邊界表）。觸發：哲宇 /goal「把這樣自我進化的過程（思考 發散 報告 實作）做成 /twmd-evolve」。命名衝突決策：/twmd-evolve 是 twmd-finale 第三棒與 news-lens-weekly cron 的承重牆，語意擴展不取代——殼內 mode 分流，既有引用一條不斷。設計報告：[reports/design-article-inbox-evolve-mode4-2026-07-18.md](../../reports/design-article-inbox-evolve-mode4-2026-07-18.md)。_

_v3.7 | 2026-09-05 fortnight-review — 新增「進化分數 gate 的適用範圍（v2.1）」：60 分 gate 收窄為只管 🔴 Rewrite 型，🟠 SEO 優化／🟡 翻譯／🟢 新建三型改用行動表既有的定性判準（Phase 1B「高曝光＋低 CTR（< 5%）」／Bump-vs-translate matrix／Top 5 第 3 條「曝光 ≥ 500」），不引入新量化門檻。同步在 ASCII spine 與 Hard Gate Inventory 的「進化分數 ≥ 60」補「（🔴 型）」限定，並在 sister_docs 加 CONTRIBUTING.md 互指。解 [OBSERVER-QUEUE #16](../semiont/OBSERVER-QUEUE.md)：BIM 英文版 metadata 案（58.2 分卡在 60 分 gate、但 100% 命中 🟠 SEO 型定性條件）是誕生案例。設計報告：[reports/design-co-editing-rules-2026-09-05.md](../../reports/design-co-editing-rules-2026-09-05.md)。_

_v3.9 | 2026-09-27 twmd-self-evolve-weekly — §news-lens-spore-output Step 1 的 CF 源指到新的 `topPaths`／`topAiPaths`（fetch-cloudflare 同一支查詢零額外呼叫聚合出來，解 W30 起連六週的 per-path 缺口）；§news-lens-probe-output Step 7 寫 entry 必填 `Angle-expires`、Step 8 對照前先跑 `inbox-audit.py --angles` 處置過期切角、quality gate 加一條 hard。觸發：探測器建議登記進 INBOX 後原地過期連三週（DIARY「里程碑≠兌現」vc=3），INBOX 只有優先序沒有期限。_
_v3.8 | 2026-09-18 news-radar — 新增 §news-lens-probe-output：探測器（外部媒體四頻道 × 知識庫三邊對照 × Tier 1-3 × 報告落 reports/probe/）接回 `twmd-news-lens-weekly` 當 Phase 1 第四源。觸發：哲宇「幫我執行新聞雷達」後發現 reports/probe/ 自 2026-05-03 停擺 138 天——SENSES 凋亡去向表遷了 SOP 沒遷執行者（REFLEXES #56 v8）。報告格式以 2026-09-18 版為範本；Tier 1 直接餵 ARTICLE-INBOX 成為 legacy output (1) 的主要來源。_
