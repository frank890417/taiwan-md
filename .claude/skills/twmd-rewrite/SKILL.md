---
name: twmd-rewrite
description: |
  Write or rewrite a Taiwan.md article via canonical REWRITE-PIPELINE.
  TRIGGER when: user says "寫 X", "重寫 X", "EVOLVE X", "走 rewrite",
  "rewrite-pipeline", or asks to write/improve any knowledge/ article.
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - WebFetch
  - WebSearch
  - Agent
---

# 🧬 Taiwan.md — Rewrite

1. 你是 Taiwan.md（簽名 🧬）。如未甦醒先跑 `/twmd-become`。

2. **HARD GATE — 完整讀取 REWRITE-PIPELINE 才能開始**：

   ```bash
   wc -l docs/pipelines/REWRITE-PIPELINE.md   # 確認檔案大小
   ```

   接著用 **Read tool 一次讀完整個檔案**（沒有 `limit` / `offset` 參數）。**禁止**：
   - ❌ 只讀 `head` / `tail` 取樣
   - ❌ 只讀 §summary 或 §六階段流程 圖
   - ❌ 只讀 stage 標題就跳 stage 細節
   - ❌ 只讀「跟我這次相關的 stage」(Stage 0-6 全是必須)
   - ❌ 跳過 Stage 3.5 FACT VERIFICATION（HARD GATE，所有 claim 必須 ✅/降級/刪）
   - ❌ 跳過 §進化模式 vs 全新模式 判準
   - ❌ 跳過 §品質分級 / §Cron 特殊規則 / §實戰教訓

   讀完後，在開始 Stage 1 前**口頭確認**：「已讀完 REWRITE-PIPELINE.md 全 1282 行（或當前實際行數），含 Stage 0-6 + Stage 3.5/4.5 hard gates + 進化判準 + Cron 特殊規則 + 實戰教訓。」

3. **完整執行 6 階段（不跳階）**：

   ```
   Stage 1: RESEARCH       (35-40% budget) → RESEARCH.md + RESEARCH-TEMPLATE.md 必讀
                            研究筆記落檔 reports/research/YYYY-MM/{slug}.md
                            ↓ 品質門檻 ✓ 才進下一步
   Stage 2: WRITE          (40-45% budget) → 中文全文，frontmatter complete
                            ↓ 品質門檻 ✓ 才進下一步
   Stage 3: VERIFY         (15-20% budget) → 品質 / 塑膠句 / 破折號 / 歐化自檢
                            ↓ 品質門檻 ✓ 才進下一步
   Stage 3.5: FACT VERIFY  HARD GATE       → /twmd-factcheck 觸發；atom 抽取 + source
                                            逐字驗證 + triage 修補，所有 claim ✅/降級/刪
                            ↓ 100% atom verified 才進下一步
   Stage 4: FORMAT CHECK   格式範本逐項驗證 → article-health.py {file} 必 hard=0 warn=0
   Stage 4.5: MEDIA        媒體插入        → image / hero / inline references
   Stage 5: CROSS-LINK     雙向延伸閱讀    → 跟既有 articles + ARTICLE-DONE-LOG cross-ref
   Stage 6: TRANSLATION    (可選)         → 詢問操作者：要不要產英文版？
   ```

4. **收官（per pipeline §Stage 6 / §6 收官）**：
   - ARTICLE-DONE-LOG entry append（最新在頂）
   - ARTICLE-INBOX 對應 entry 移除
   - commit message 含 quality gate 報告 ✅/❌ per stage

5. **DNA 鐵律提醒**（不重複 pipeline，pipeline 細節是真的細節）：
   - **DNA #16 三源驗證**：每個 fact ≥ 3 independent sources
   - **DNA #18 research-handle**：research agent 必落檔，主 session verify 檔案存在
   - **DNA #5 pre-commit hook**：絕不 `--no-verify`
   - **DNA #46 sub-agent worktree clean**：派 sub-agent 前 git status 確認
   - **MANIFESTO §11 書寫節制**：破折號連用 / 對位句型雙紀律自檢

6. **不准的 shortcut**：
   - ❌ 「我熟了不用讀 pipeline」— DNA #15 第 N 次驗證
   - ❌ 「Stage X 我上次做過跳過」— 每次 article 不同，stage 不能 skip
   - ❌ 「Stage 3.5 atom 太多用 sample」— FACTCHECK 是 HARD GATE 不抽樣
   - ❌ 「先 commit 再修腳註」— pre-commit hook 必過 + DNA #5
   - ❌ 「中英文一起寫節省時間」— Stage 6 詢問操作者，不主動開英文

---

**故意最小化但 hard gate 明示**。Stage 0-6 + 3.5/4.5 hard gate + 6 budget + 自檢工具 + 鐵律全部在 [pipeline canonical](../../../docs/pipelines/REWRITE-PIPELINE.md)，本 skill 只是入口 + 強制 read gate。
