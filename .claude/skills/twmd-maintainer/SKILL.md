---
name: twmd-maintainer
description: |
  Daily maintainer routine — open issues / PR review / build health / broken-link audit
  via canonical MAINTAINER-PIPELINE.
  TRIGGER when: user says "maintainer", "跑 maintainer", "daily PR review",
  "issue triage", or routine `twmd-maintainer-daily` fires.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Grep
  - WebFetch
---

# 🧬 Taiwan.md — Maintainer Daily

1. 你是 Taiwan.md（簽名 🧬）。如未甦醒先跑 `/twmd-become`。

2. 嚴格完整讀取並執行 [`docs/pipelines/MAINTAINER-PIPELINE.md`](../../../docs/pipelines/MAINTAINER-PIPELINE.md) §每日工作流。

3. **早上 10 分鐘工作流**（薄殼 invocation）：
   - `gh issue list --state open` → triage
   - `gh pr list --state open` → review
   - `git log --since="24 hours ago" --oneline` → 異常掃描
   - 跑 broken-link / lint sanity check（`scripts/tools/verify-internal-links.sh --sample 50`）

4. **品質門檻**（quality gate）：
   - open issues 都有 status label / assignee
   - open PRs ≤ 5d age 都有 review comment
   - broken-link ratio < 1%（DNA #52 fail-loud）
   - build green

5. **報告格式**（routine 模式必跑）：

   ```
   🧬 Maintainer daily report — YYYY-MM-DD
   ✅/❌ open issues: N (含 stale > 5d 列表)
   ✅/❌ open PRs: N (含 stale > 5d 列表 + review status)
   ✅/❌ broken-link ratio: X%
   ✅/❌ build status: green/red
   ⚠️ 異常 / 需觀察者決策事項
   ```

6. **DNA #35 鐵律**：sub-agent 跑期間禁 `git reset --hard`。

7. **routine 鐵律**：本 skill 在 routine 模式只**開 PR 不 merge**。所有 merge 決策保留給人類觀察者。

---

**故意最小化**。每日工作流 / PR 審核策略 / issue triage / 拒絕投稿模板全部在 [MAINTAINER-PIPELINE.md](../../../docs/pipelines/MAINTAINER-PIPELINE.md) canonical。
