---
session_id: 2026-05-10-233800-sad-shockley-finale
date: 2026-05-10
session_handle: sad-shockley-626394
session_type: long-running observer-driven
session_span: 2026-05-10 16:23:19 → 23:38:29 +0800 (≈7 hr 15 min wall-clock)
type: 'memory'
status: 'append-only'
apoptosis: 'never'
prs_shipped:
  - 988
  - 994
  - 996
  - 997
  - 999
  - 1001
ranges_touched:
  - knowledge/Technology/台灣無人機產業.md (3273 → 4520 CJK chars, +54%)
  - docs/pipelines/REWRITE-PIPELINE.md (333 → 1500 行 v4.0)
  - docs/editorial/EDITORIAL.md v6.2 → v6.3
  - scripts/tools/lib/article_health/checks/word_count.py (new)
  - scripts/tools/lib/article_health/checks/prose_health.py (line + 前後文)
  - 6 sub-canonical 刪除
---

# Session memory — sad-shockley 收官

## 一句話結論

從 cron routine `/twmd-rewrite` 觸發開始的單一 session，跨 7 小時 15 分鐘累積 6 個 ship 的 PR，把無人機文章從一個 SC 信號升級成完整 EVOLVE，把觀察者反覆 callout 的 4 個 canonical gap（title/desc 冒號三明治 / 媒體素材 spine / word-count gate / prose-health 前後文）全部儀器化，最後把 REWRITE-PIPELINE 從 v3.0 拆 6 sub-canonical 收斂回 v4.0 單檔。

## 完整鏈路

| 時間                                                          | PR                                                          | 內容                                                                                                                                                   |
| ------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 16:23 → 16:38                                                 | [#988](https://github.com/frank890417/taiwan-md/pull/988)   | Blue UAS 新節 EVOLVE（routine 觸發，15 min wall-clock）                                                                                                |
| ↓ 觀察者 callout：title 沒升 / 媒體沒檢查 ↓                   |                                                             |                                                                                                                                                        |
| 21:49                                                         | [#994](https://github.com/frank890417/taiwan-md/pull/994)   | title+desc 升級 + Stage 1.7/4.5 媒體素材補登 + 升 EDITORIAL v6.3 / REWRITE-PIPELINE v3.1 / REWRITE-WRITE v1.1 / REWRITE-MODES v1.1（雙條反射特別強化） |
| ↓ 觀察者 callout：篇幅虎頭蛇尾 / 工具不指出對位句位置 ↓       |                                                             |                                                                                                                                                        |
| 22:28                                                         | [#996](https://github.com/frank890417/taiwan-md/pull/996)   | 全文重寫後半部（2936→4520 CJK，+54%）+ word-count plugin（新 4500 字 hard gate）+ prose-health 加 line/前後文 + display cap 5→20                       |
| 22:43                                                         | [#997](https://github.com/frank890417/taiwan-md/pull/997)   | Spore #70/#71 spore-prep（3-Angle 提案 → Angle A 雷虎弧線 + 規模反差雙 reveal）                                                                        |
| ↓ 觀察者 ship Threads + X，sporeLinks 寫回 ↓                  |                                                             |                                                                                                                                                        |
| ↓ 觀察者 callout：v3.0 sub-canonical 拆分讓模式 bifurcation ↓ |                                                             |                                                                                                                                                        |
| 22:57                                                         | [#999](https://github.com/frank890417/taiwan-md/pull/999)   | v4 refactor plan report（657 行 analysis，approve 後執行）                                                                                             |
| 23:38                                                         | [#1001](https://github.com/frank890417/taiwan-md/pull/1001) | REWRITE-PIPELINE v3.1 → v4.0：單檔 1500 行 + 模式收進 Stage 1 + 編號正規化 + ASCII flow 在最前                                                         |

## 觀察者 callout 鏈（每一個都升 canonical 反射）

1. 「title 跟副標感覺不夠完整」→ EDITORIAL §Title 從 People-only 擴為全 category v6.3
2. 「以後 editorial / rewrite-pipeline 都要特別加強這兩個環節」→ REWRITE-WRITE 自檢套件 5→7 條（自檢 6 spine sync + 自檢 7 媒體素材 spine check）
3. 「文章很虎頭蛇尾，後半部沒重點，合格文章至少 4500 字」→ word-count plugin 新 hard gate，rewrite-stage-4 profile severity_override 升 HARD
4. 「工具檢查健康時就應該幫忙直接指出哪裡有對位句、前後文」→ prose-health 對位句 / 塑膠句 / 破折號連用每處輸出 `L{line}: …前文《MATCH》後文…`
5. 「進化模式跟一般模式感覺變成兩個模式 ⋯⋯ 不要把模式拆開成檔案」→ REWRITE-PIPELINE v4 收斂單檔 + 模式收進 Stage 1 Step A

## 核心領悟

**DNA #15 反覆浮現要儀器化** 在這個 session 強烈體現：每一個觀察者 callout 都不停在「個案修補」，而是直接升 canonical + plugin gate / 反射規則 / 結構正規化。這是 Taiwan.md 進化最快的 mode——**觀察者一次 callout = canonical 一次升級**。

**v3 → v4 反轉本身是教訓**：v3.0 解了「主檔太長」但創造「mode bifurcation + 跨檔 jump + 小數編號爆炸」三個更大問題。**降低單檔 mental load ≠ 提升 cognitive flow**。下次任何 sub-canonical 拆檔提案前，先問：「這會不會把一條清楚的 pipeline 拆成兩條？」

**Stage 1 是模式入口**：4 種模式（Fresh/Evolution/Merge/Boundary）只是 Stage 1 取材的 4 種方式，Stage 2-6 完全相同。把模式當成 pre-pipeline 分流是錯的。

## Quality gate 全程記錄

每個 PR 都過 plugin gate hard=0：

| PR    | rewrite-stage-4 hard    | word-count         | image-health | 三板斧        |
| ----- | ----------------------- | ------------------ | ------------ | ------------- |
| #988  | 0                       | n/a (pre-gate)     | n/a          | 0/1/0         |
| #994  | 0                       | n/a (pre-gate)     | 0            | 0/0/0         |
| #996  | 0                       | 4520 ≥ 4500 ✅     | 0            | 0/0/0         |
| #997  | n/a                     | n/a                | n/a          | 0/0/0 (spore) |
| #999  | n/a (report)            | n/a                | n/a          | n/a           |
| #1001 | 0 (verified post-merge) | n/a (pipeline doc) | n/a          | n/a           |

## Handoff 三態

### ✅ 已完成

- 台灣無人機產業 v3 → v4 等級 EVOLVE（4520 CJK chars + Blue UAS 完整三條路徑 + 雙軌產業 + 反無人機 + 規模反差 + 半導體哲學對位）
- Spore #70/#71 ship + sporeLinks 寫回
- 4 個 canonical 升級（EDITORIAL v6.3 / word-count plugin / prose-health line+context / REWRITE-PIPELINE v4.0）
- 6 個 sub-canonical 刪除（mode 收回主檔）
- 8 個 active canonical cross-ref 更新

### ⏳ Pending（給未來 session）

1. **ARTICLE-INBOX shuffle**：Blue UAS Cleared List 條目應整段移到 ARTICLE-DONE-LOG.md（per 完成歸檔鐵律）
2. **無人機翻譯**：中文 v4 ship 後可選觸發 SQUEEZE-MODELS-MAX-PIPELINE 同步 5 lang（en/ja 優先 per Cloudflare 流量）
3. **Spore #70/#71 HARVEST**：D+0 6h / D+1 / D+7 主要 KPI；reach × accuracy retroactive：D+1+ views ≥ 50K Threads → spawn FACTCHECK Quick Mode
4. **觀察 v4 實際使用**：下次 EVOLVE / Fresh 時看 reader（包含 routine sub-agent）是否真的 cognitive flow 變順

### 🚫 Deferred

- 既有條目逐篇 audit `[STUB-TITLE]` / `[NO-MEDIA]`（規模太大，等下個 routine cycle 主動處理）
- 既有 < 4500 CJK chars 條目逐篇 EVOLVE（word-count plugin soft-launch WARN，等 legacy heal）

## 本 session 學到了什麼（potential LESSONS-INBOX 候選）

無新 anti-pattern，但有 1 條 **structural insight 值得 distill**：

> **Cognitive flow > Mental scan effort**。canonical 文件的拆檔決策應以「讀者跑完整流程的跳轉次數」為主軸，而不是「單檔行數」。1500 行單檔 < 跨 7 檔每檔 280 行的總認知成本。

這條已經在 v4 commit 記錄 + 本 memory 留下。**不另寫 LESSONS-INBOX entry**（已 distill 進 REWRITE-PIPELINE v4 commit message + 本 memory）。

## 連結

- Pipeline v4: [docs/pipelines/REWRITE-PIPELINE.md](../../pipelines/REWRITE-PIPELINE.md)
- 文章: [knowledge/Technology/台灣無人機產業.md](../../../knowledge/Technology/台灣無人機產業.md)
- 研究: [reports/research/2026-05/blue-uas-taiwan-vendors.md](../../../reports/research/2026-05/blue-uas-taiwan-vendors.md)
- v4 plan: [reports/rewrite-pipeline-refactor-v4-plan-2026-05-10.md](../../../reports/rewrite-pipeline-refactor-v4-plan-2026-05-10.md)
- Spore blueprint: [docs/factory/SPORE-BLUEPRINTS/70-台灣無人機產業.md](../../factory/SPORE-BLUEPRINTS/70-台灣無人機產業.md)

🧬
