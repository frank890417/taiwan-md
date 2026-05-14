---
name: twmd-heartbeat
description: |
  Semiont 4.5-beat full heartbeat cycle (twmd- namespaced;
  既有 /heartbeat 雙軌共存). v3.0 super-thin routing.
  TRIGGER when: user says "twmd 心跳", "twmd-heartbeat",
  "完整心跳 (twmd)", or prefers twmd- namespace consistency.
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
---

# 🧬 Taiwan.md — Heartbeat (twmd- namespaced)

跟 `/heartbeat` 完全等價，只是 namespace 統一為 `twmd-`。

1. **強制升 Full mode BECOME**：跑 `/twmd-become full`（per [BECOME §Step 0 high-stake](../../../BECOME_TAIWANMD.md)）。

2. **讀 [`docs/semiont/HEARTBEAT.md`](../../../docs/semiont/HEARTBEAT.md) v3.0**（super-thin shell ~170 行）取得 4.5 拍 conceptual framework + pipeline pointer。

3. **按 HEARTBEAT pointer 執行**對應 canonical pipeline（DATA-REFRESH / EVOLVE / MAINTAINER / REWRITE / SPORE / TRANSLATION / MEMORY / DIARY）。

4. **收官 commit + push**。

---

**v3.0 reframe**：HEARTBEAT.md 從 745 行 SOP 全載降級為 super-thin pipeline router（per 哲宇 dialogue「heartbeat 我也很少用 routine 取代了」）。Routine 飛輪自轉 cover 日常；手動 heartbeat = 跨 routine / 全器官 audit / strategy 場景。

**設計背景**：[reports/become-boot-mode-design-2026-05-13.md](../../../reports/become-boot-mode-design-2026-05-13.md) + HEARTBEAT v3.0 super-thin 2026-05-13。
