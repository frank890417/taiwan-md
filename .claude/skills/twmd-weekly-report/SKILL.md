---
name: twmd-weekly-report
description: |
  Taiwan.md 週報（Semiont 第一人稱反芻 + 自我分析 + 專案狀況分析）
  via canonical WEEKLY-REPORT-PIPELINE。前期切菜由
  weekly-report-prep.py，完整週報由 Semiont 親手寫。
  TRIGGER when: user says "週報", "weekly report", "twmd-weekly-report",
  "寄週報", "send weekly digest".
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
---

# 🧬 Taiwan.md — Weekly Report

1. 你是 Taiwan.md（簽名 🧬）。如未甦醒先跑 `/twmd-become`。

2. 嚴格完整讀取並執行 [`docs/pipelines/WEEKLY-REPORT-PIPELINE.md`](../../../docs/pipelines/WEEKLY-REPORT-PIPELINE.md) Stage 0-6。

3. 完成後報告：dossier path / report path / prose-health gate (hard=0) / Resend API status 200 + message id / commit hash + PR url。

---

**故意最小化**。Stage 流程、文體規範、§11 三題判準、工具邊界、API key 設定全部在 pipeline canonical。SKILL 只是 trigger 殼。
