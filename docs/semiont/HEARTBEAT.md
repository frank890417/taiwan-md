---
title: 'HEARTBEAT'
description: '四拍半心跳 conceptual canonical (super-thin v3.0) — 結構性判斷 + pipeline pointer，不重複 pipeline 內容'
type: 'cognitive-organ'
status: 'canonical'
apoptosis: 'never'
current_version: 'v3.0'
last_updated: 2026-05-13
last_session: '2026-05-13-210341-manual'
sister_docs:
  - 'MANIFESTO.md'
  - 'ANATOMY.md'
  - 'ROUTINE.md'
  - 'REFLEXES.md'
upstream_canonical:
  - 'MANIFESTO.md'
  - 'ANATOMY.md'
downstream_dependents:
  - '../pipelines/MAINTAINER-PIPELINE.md'
  - '../pipelines/EVOLVE-PIPELINE.md'
  - '../pipelines/DATA-REFRESH-PIPELINE.md'
  - '../pipelines/REWRITE-PIPELINE.md'
  - '../pipelines/DIARY-PIPELINE.md'
  - '../pipelines/MEMORY-PIPELINE.md'
  - '../pipelines/RELEASE-PIPELINE.md'
  - '../pipelines/WEEKLY-REPORT-PIPELINE.md'
related:
  - '../../reports/become-boot-mode-design-2026-05-13.md'
  - '../../reports/heartbeat-pre-thinning-2026-05-13.md'
audience: 'claude-session-startup'
---

# HEARTBEAT — 四拍半心跳（super-thin v3.0）

> v3.0 reframe（2026-05-13）：哲宇觀察「heartbeat 現在我也很少用，routine 取代掉所有機能了」→ HEARTBEAT 從 745 行 SOP 全載降級為 super-thin **結構性判斷 + pipeline pointer**。Beat 細節 / cron SOP / Release 規則全在對應 canonical，本檔不重複。
>
> 完整背景：[reports/heartbeat-pre-thinning-2026-05-13.md](../../reports/heartbeat-pre-thinning-2026-05-13.md)（v2.x 全文 archival）+ [reports/become-boot-mode-design-2026-05-13.md](../../reports/become-boot-mode-design-2026-05-13.md)（Phase D HEARTBEAT super-thin context）。
>
> **本檔不在 BECOME Universal core / Mode-specific 預設載入**。只有 explicit `/heartbeat` 觸發 + Full mode 才載。日常 routine 自轉時不需要本檔。

---

## 核心：四拍半心跳（conceptual framework）

四拍半是 Taiwan.md 自主呼吸的 conceptual sequence — **不是必跑的 SOP**，是描述「一個完整 cycle 從感知到反芻包含哪些 phase」的抽象模型。

```
Beat 0.5: 讀近況（catch-up）— 跨 session 接力，所有 mode 都跑（已在 BECOME §Step 1 Universal core）
       ↓
Beat 1: 診斷 — 看當前器官狀態 + 警報 + 缺口
       ↓
Beat 2: 進化 — 系統性升級（造橋 / 修 pipeline / 補 reflex）
       ↓
Beat 3: 執行 — 內容 ship / PR triage / 翻譯 / 孢子
       ↓
Beat 4: 收官 — commit + memory + handoff
       ↓
Beat 5: 反芻（半拍）— 超越行動的 diary 思考層（不一定每次都寫）
```

**為什麼是「四拍半」**：Beat 5 反芻不是執行動作，是超越動作的反思層，所以是「半拍」— 不算在主呼吸節律裡，但存在。

完整哲學論述（為什麼這五個 phase 是必要的）：[reports/heartbeat-pre-thinning-2026-05-13.md §核心：四拍心跳](../../reports/heartbeat-pre-thinning-2026-05-13.md)。

---

## 結構性判斷：何時手動跑 heartbeat（vs 讓 routine 自轉）

**Default**：日常運作 routine 飛輪自轉清 entropy（per [ROUTINE.md SSOT](ROUTINE.md)，10 條 cron routine 覆蓋 data refresh / maintainer / babel / rewrite / spore harvest / news lens / weekly report / distill / self-evolve）。**多數場景不需要手動 heartbeat**。

### 觸發手動 heartbeat 的場景

| 場景                           | 為什麼 routine 無法接                                                                                                             | 對應動作                                                            |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **跨 routine 議題**            | 單一 routine 只 cover 單一器官；當問題跨多器官（例 dashboard 怪 → 需 DATA-REFRESH + EVOLVE + 多語檢查鏈）→ holistic flow 需要心跳 | Full mode heartbeat                                                 |
| **全器官 audit / 整體 review** | Routine 是 single-organ tend，沒人 review 整個生命體狀態 → 週月度回顧 / strategy 場景                                             | Full mode heartbeat + /retro                                        |
| **新器官 / 新 pipeline 設計**  | 結構性 architectural decision，routine 不該自動 ship                                                                              | High-stake 強制升 Full (per [BECOME §10](../../BECOME_TAIWANMD.md)) |
| **Routine 失敗 / 警報**        | Routine fail escalation 需 observer 介入診斷                                                                                      | 看 routine-status.sh + Full mode heartbeat                          |
| **觀察者觸發**                 | 哲宇 explicit 「heartbeat」「心跳」「跑一輪」「全身檢查」                                                                         | Full mode heartbeat (per `/heartbeat` skill)                        |
| **新 fork / Onboarding**       | 物種繁殖場景，需要展示完整 cycle 給 fork 者                                                                                       | Full mode heartbeat as 教學 demo                                    |

### 不需要手動 heartbeat 的場景

- 1-3 file fix / heal / typo → Micro mode 就好
- PR triage / merge → Review mode + MAINTAINER routine
- 寫單篇文章 / 翻譯 → Write mode + REWRITE/TRANSLATION routine
- 寫孢子 → Write mode + SPORE-PIPELINE
- 跨日 reflective check-in（哪些 routine 跑了 / pending 多少）→ BECOME Universal core L4 queries 已給 signal

---

## Beat 流程 + canonical pointers（不重複 pipeline 內容）

每個 Beat 的具體 SOP 在對應 canonical。本檔只列入口。

### Beat 0.5 — 讀近況

**Canonical**：[BECOME §Step 1 Universal core](../../BECOME_TAIWANMD.md#step-1universal-core-載入所有-mode-必跑--新)（所有 mode 都跑）

**內容**：consciousness-snapshot.sh + routine-status.sh + inbox-signal.sh + git log --since='6h' + handoff grep

### Beat 1 — 診斷

**Canonical**：[DATA-REFRESH-PIPELINE.md](../pipelines/DATA-REFRESH-PIPELINE.md)（git pull + 三源感知 + prebuild + GitHub stats）+ `/api/dashboard-*.json`（即時器官分數）+ [CONSCIOUSNESS.md §警報](CONSCIOUSNESS.md)（cron-refreshed 健康警報）

**Routine 對應**：`twmd-data-refresh-am` / `twmd-data-refresh-pm`（每日 2x）已自動跑

### Beat 2 — 進化

**Canonical**：[EVOLVE-PIPELINE.md](../pipelines/EVOLVE-PIPELINE.md)（Mode 1 data-driven / Mode 2 觀察者觸發 / Mode 3 pipeline self-refactor）

**Routine 對應**：`twmd-self-evolve` 週日跑 Mode 3 候選掃描

### Beat 3 — 執行

**Canonical**：[MAINTAINER-PIPELINE.md](../pipelines/MAINTAINER-PIPELINE.md)（PR / Issue / 社群）+ [REWRITE-PIPELINE.md](../pipelines/REWRITE-PIPELINE.md)（單篇重寫）+ [SPORE-PIPELINE.md](../factory/SPORE-PIPELINE.md)（孢子）+ [TRANSLATION-PIPELINE.md](../pipelines/TRANSLATION-PIPELINE.md) / [SQUEEZE-MODELS-MAX-PIPELINE.md](../pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md)（翻譯）

**反射**：

- [MAINTAINER-PIPELINE §1 Default-action principle](../pipelines/MAINTAINER-PIPELINE.md)（估算偏誤校準 — batch discount / defer cost / Default 是行動）
- [REFLEXES #51](REFLEXES.md#七自動化與安全) 多核心碰撞防護（session-id schema + content collision 手動 resolve）

**Routine 對應**：`twmd-maintainer-am/pm`（每日 2x PR + Issue triage）+ `twmd-rewrite-daily`（每日 1 篇 EVOLVE）+ `twmd-babel-nightly`（多語 batch sync）+ `spore-harvest-am`（孢子留言抓取）

### Beat 4 — 收官

**Canonical**：[MEMORY-PIPELINE.md](../pipelines/MEMORY-PIPELINE.md)（凝練版結構模板 + Stage 0-5 + 自檢工具 + 5 分鐘 reading test）

**Commit 標記規則**：已在 [BECOME §Step 1 Universal core](../../BECOME_TAIWANMD.md) 載入（per Phase A1 + C），不重複此處。

**Routine 對應**：所有 routine 結尾必跑 `/twmd-finale`（per [ROUTINE.md §收官鐵律](ROUTINE.md)）

### Beat 5 — 反芻（半拍）

**Canonical**：[DIARY-PIPELINE.md](../pipelines/DIARY-PIPELINE.md)（紀實散文文體 + Stage 0-5 流程 + 自檢工具）

**結構性判斷：何時寫 diary**（本檔唯一 inline 內容 — 不在 DIARY-PIPELINE 重複）：

| 觸發                                      | 寫不寫                                    | 理由                                                |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------------------- |
| **這次有新觀點 / 跨主題反思**             | ✅ 寫                                     | 超越行動，思考更大問題                              |
| **某反射第 N 次驗證 / 跨日 pattern 浮現** | ✅ 寫                                     | DIARY 是 LESSONS-INBOX append 之前的 thinking layer |
| **完成具體任務但無新觀點**                | ❌ 不寫                                   | 工作結果寫 memory，沒升級到意識層                   |
| **連續 N 天沒寫 diary**                   | 🤔 反問「我有沒有迴避 reflective work？」 | per [DIARY §反覆出現的思考](DIARY.md)               |

**鐵律**：DIARY-PIPELINE 必讀全檔才下筆（per BECOME / HEARTBEAT 既有約束）+ 跑 `article-health.py --check=prose-health` 自檢。

**Routine 對應**：no routine — 反芻不該被 routine 取代，是 superlayer 思考。觀察者觸發或 Beat 5 自發。

---

## 心跳來源 + 自主呼吸節律 → ROUTINE.md SSOT

**Canonical**：[ROUTINE.md](ROUTINE.md)（10 條 TWMD-prefix cron routine 排程 SSOT + 6-stage lifecycle + 失敗 escalation + permission v3 deny-by-design）

本檔不重複 cron 排程細節（per [DNA gene map](DNA.md) §呼吸基因 已 pointer）。

---

## Review 機制 → /retro + WEEKLY-REPORT

**即時 Review**（每次 Beat 4 收官時）：「這次的工作有沒有違反 MANIFESTO？引入了新問題嗎？下次心跳能不能接住？」3 題自檢，per [MEMORY-PIPELINE §collapse rules](../pipelines/MEMORY-PIPELINE.md)。

**週期 Review**：

- 週度 → `/retro` skill + [WEEKLY-REPORT-PIPELINE.md](../pipelines/WEEKLY-REPORT-PIPELINE.md)（`twmd-weekly-report` 週日跑）
- 月度 / 季度 → /retro extended + reports/ archive

---

## Release 原則 → RELEASE-PIPELINE

**Canonical**：[RELEASE-PIPELINE.md](../pipelines/RELEASE-PIPELINE.md)（何時 release / 品質閘 / notes 敘事 / 認知層同步 SOP）

本檔不重複 release 觸發條件 / 硬性 gate / commits 讀完整鐵律（per pipeline canonical）。

---

## 對應認知器官 promotion / apoptosis flow

HEARTBEAT 的 reflex 候選（如自我估算偏誤校準）通過 [ANATOMY §認知層 promotion flow](ANATOMY.md#認知器官的生命週期)：

```
HEARTBEAT prose embedded (本檔結構性判斷)
       ↓ verification ≥ 3 + 跨 task 通用
REFLEXES.md #N catalog
       ↓ promote (跨 task + 影響身份 + 哲宇拍板)
MANIFESTO.md §進化哲學
```

「自我估算偏誤校準」目前 partial-在 MAINTAINER-PIPELINE §1 Default-action principle / partial-在 LESSONS-INBOX β-r3 META-PATTERN，候選下次驗證 ≥ 3 → REFLEXES 新 entry。

---

## v3.0 super-thin refactor footprint

| Section                | v2.x 行數 | v3.0 行數                   | 取代位置                                   |
| ---------------------- | --------- | --------------------------- | ------------------------------------------ |
| §核心四拍              | 18        | 20                          | 保留 conceptual canonical                  |
| §Beat 0.5 catch-up     | 63        | 4 (pointer)                 | BECOME §Step 1                             |
| §Beat 1 診斷           | 128       | 6 (pointer)                 | DATA-REFRESH + dashboard JSON              |
| §Beat 2 進化           | 51        | 5 (pointer)                 | EVOLVE-PIPELINE                            |
| §Beat 3 執行           | 175       | 10 (pointer + 反射 pointer) | MAINTAINER / REWRITE / SPORE / TRANSLATION |
| §Beat 4 收官           | 88        | 6 (pointer)                 | MEMORY-PIPELINE                            |
| §Beat 5 反芻           | 86        | 18（保留反芻判斷標準）      | DIARY-PIPELINE + 本檔 unique               |
| §免疫巡邏              | 14        | merged into Beat 3          | MAINTAINER                                 |
| §心跳來源              | 70        | 3 (pointer)                 | ROUTINE.md                                 |
| §Review 機制           | 25        | 6 (pointer)                 | /retro + WEEKLY-REPORT                     |
| §Release 原則          | 27        | 3 (pointer)                 | RELEASE-PIPELINE                           |
| §結構性判斷（v3.0 新） | 0         | 30                          | 本檔 unique                                |
| §promotion flow        | 0         | 10                          | ANATOMY pointer                            |
| **總計**               | **745**   | **~170**                    | -77%                                       |

---

_v3.0 | 2026-05-13 — Super-thin reframe (哲宇 dialogue「heartbeat 我也很少用 routine 取代了 / 變成超級薄殼指標」)。745→~170 行，pipeline 內容不再 inline。完整 archive: reports/heartbeat-pre-thinning-2026-05-13.md_
_v2.x | 2026-04-17 ~ 2026-05-09 — 745 行 SOP 完整版（routine 飛輪誕生前的全載入時代）_
_v1.x | 2026-04 早期 — 四拍半心跳 conceptual 誕生_

完整 changelog → `git log docs/semiont/HEARTBEAT.md`
