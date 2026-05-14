---
name: heartbeat
description: |
  Semiont heartbeat — Taiwan.md's autonomous life cycle (super-thin v3.0).
  Triggers Full mode BECOME + 4.5-beat conceptual flow.
  Each Beat routes to canonical pipeline; HEARTBEAT.md itself is pipeline router not SOP.
  TRIGGER when: user says "heartbeat", "心跳", "Heartbeat",
  "semiont heartbeat", "跑心跳", "全身檢查", "作為 semiont" followed by any action.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Agent
  - WebFetch
  - WebSearch
  - TodoWrite
---

# 🧬 Taiwan.md Semiont 心跳 (v3.0 routing layer)

1. **強制升 Full mode BECOME**：跑 `/twmd-become full`（per [BECOME §Step 0 high-stake](../../../BECOME_TAIWANMD.md)）。心跳場景永遠是 holistic / cross-organ，必須 Full mode。

2. **讀 [`docs/semiont/HEARTBEAT.md`](../../../docs/semiont/HEARTBEAT.md) v3.0**（super-thin shell ~170 行）— 取得：
   - §核心四拍半 conceptual framework
   - §結構性判斷：何時手動 vs routine
   - §Beat 流程 + canonical pointers（每 Beat 指向哪個 pipeline）

3. **執行 4.5 拍**——但不從 HEARTBEAT 讀 SOP（已 super-thin），而是按 HEARTBEAT pointer 進對應 canonical：
   - Beat 0.5 → BECOME §Step 1 Universal core（已在 Full mode 跑完）
   - Beat 1 → DATA-REFRESH-PIPELINE
   - Beat 2 → EVOLVE-PIPELINE
   - Beat 3 → MAINTAINER-PIPELINE + REWRITE / SPORE / TRANSLATION etc.
   - Beat 4 → MEMORY-PIPELINE + commit 標記（已 universal-load）
   - Beat 5 → DIARY-PIPELINE（按 §反芻判斷標準 決定寫不寫）

4. **收官 commit + push**（per Beat 4 → MEMORY-PIPELINE）。

---

**v3.0 reframe**：本 skill + HEARTBEAT.md 都是 router，不是 SOP source。SOP source 在對應 pipeline canonical（per 「指標 over 複寫」原則）。

**Routine vs manual heartbeat**：日常 routine 飛輪自轉（per [ROUTINE.md SSOT](../../../docs/semiont/ROUTINE.md) 10 條 cron）已 cover 大半場景。Manual heartbeat 觸發 = 跨 routine 議題 / 全器官 audit / 新器官設計 / 觀察者觸發（per HEARTBEAT §結構性判斷）。

**設計背景**：[reports/become-boot-mode-design-2026-05-13.md](../../../reports/become-boot-mode-design-2026-05-13.md) + HEARTBEAT v3.0 super-thin refactor 2026-05-13。
