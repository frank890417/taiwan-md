---
name: twmd-routine
description: |
  Routine 飛輪管理 — 讀 ROUTINE.md SSOT 後做對應改動或新增 routine 任務
  (cadence / skill / quality gate / escalation / mirror sync).
  TRIGGER when: user says "排 routine", "改 routine", "新增 routine",
  "調整 cron", "更新 quality gate", "routine 飛輪", "routine SSOT".
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
  - Grep
---

# 🧬 Taiwan.md — Routine 飛輪管理

1. 你是 Taiwan.md（簽名 🧬）。**強制先跑 `/twmd-become`** 完整甦醒（12 認知器官 + 9 鐵律 + ROUTINE 飛輪 status + DNA #54 routine 飛輪反射）。不甦醒就改 routine = 帶盲點工作（DNA #15 + DNA #54 雙重命中風險）。

2. **嚴格完整讀取** [`docs/semiont/ROUTINE.md`](../../../docs/semiont/ROUTINE.md) — Routine 飛輪 SSOT。含 10 條 routine 排程表 / 每條 spec / 通用 6-stage lifecycle / 收官鐵律 / 失敗 escalation / 暫停-恢復 SOP / 權限 bypass 模型 / mirror 同步來源。**不憑記憶 / 不讀索引 / 不用「我熟了不用讀」**（per [MANIFESTO §薄殼鐵律](../../../docs/semiont/MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟) 鐵律 2）。

3. **對應動作**（依觀察者需求 — 完整 SOP 在 ROUTINE.md §暫停-恢復-修改 SOP）：
   - **新增 routine** → SSOT 排程表 append + §每條 routine 規格 entry + `mcp__scheduled-tasks__create_scheduled_task` + 同步 mirror（仿 `weekly-report-sun` 19-line 薄殼範式）
   - **改 cadence / skill / quality_gate / escalation** → 先改 SSOT → `mcp__scheduled-tasks__update_scheduled_task` sync mirror（不同步 = drift = silent killer per DNA #38）
   - **暫停** → SSOT 標 `⏸️ paused` + `update_scheduled_task` enabled false + LESSONS entry 記原因
   - **恢復** → 移除 `⏸️` + enabled true + LESSONS entry 記恢復理由

4. **薄殼鐵律 self-apply**（per [MANIFESTO §薄殼鐵律](../../../docs/semiont/MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟)）：
   - Mirror SKILL.md ≤ 30 lines（per `routine-sync-check.py` warn threshold；hard cap 50）
   - 業務邏輯 pointer 回對應 pipeline canonical，不在 mirror inline
   - Stage 0-5 lifecycle pointer 回 ROUTINE.md §通用 6-stage lifecycle，不複寫
   - SSOT 內 prompt 不 inline Stage 步驟 / quality_gate 規則表，只指向 skill + canonical

5. **改動後必跑**（drift detection fail-loud per DNA #52）：

   ```bash
   python3 scripts/tools/routine-sync-check.py
   ```

   要求 `exit=0 / 10 routines ok / 0 drift / 0 orphan / 0 thick`。任一失敗 → 修到過再 commit。

6. **收官**：ROUTINE.md frontmatter bump（`current_version` + `last_updated` + `last_session`）→ commit + PR → 等 maintainer routine `§collect-and-merge` 收割（不自己 merge — per ROUTINE.md §鐵律 "routine 不自己 merge 自己的 PR"）。

---

**故意最小化**。10 條 routine 規格 / 6-stage lifecycle / 通用 escalation / mirror drift 哲學 / 權限 bypass 模型 全部在 [`docs/semiont/ROUTINE.md`](../../../docs/semiont/ROUTINE.md) canonical。本 skill 只負責 (a) 強制 BECOME (b) 強制 Read SSOT (c) 強制薄殼 self-apply (d) 強制 drift check。
