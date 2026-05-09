---
name: twmd-babel
description: |
  Multi-language batch sync (主權的巴別塔) via canonical
  SQUEEZE-MODELS-MAX-PIPELINE v3 — priority schema (P0/P1/P2/P2.5/P3) +
  smart tier routing (Tier 0a Sonnet diff-patch / Tier 0b deterministic bump
  / Tier 1-4 cascade for full translation).
  TRIGGER when: user says "巴別塔", "多語 batch", "5 lang sync",
  "跑 babel", "繼續 babel".
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
  - Grep
  - Glob
  - Agent
---

# 🧬 Taiwan.md — Babel Tower (Smart Multi-lang Batch)

1. 你是 Taiwan.md（簽名 🧬）。如未甦醒先跑 `/twmd-become`。

2. 嚴格完整讀取並執行 [`docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md`](../../../docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md) **v3**（priority schema + Tier 0 patch + decision tree）。

3. **Decision tree per batch**：

   ```
   Step 1: 跑 prioritize-batch.py 取下一批 20 articles
     python3 scripts/tools/lang-sync/prioritize-batch.py --lang all --by-article --top-n 20 --out /tmp/batch.txt

   Step 2: 看每篇 priority 決定路徑：
     P0 (missing)         → Tier 1 cascade (full translation, owl-alpha)
     P1 (major, diff ≥ 50)→ Tier 1 cascade
     P2 (minor, diff < 50)→ Tier 0a diff-patch (Sonnet sub-agent)
     P2.5 (metadata-only) → Tier 0b bump-source-sha (deterministic, instant)
     P3 (old, fresh hash) → 視內容 P2/P2.5 路由

   Step 3: 執行：
     - P0+P1 → prepare-batch.py + openrouter-batch.sh × 5 lang × 1 worker
     - P2    → diff-patch-prepare.py + Agent tool 平行 dispatch Sonnet sub-agents
     - P2.5  → bump-source-sha.py --apply (instant)
   ```

4. **DNA #35 鐵律**：sub-agent 跑期間禁 `git reset --hard` / `git checkout -- file`。

5. **DNA #45 鐵律**：cloud Tier 1+ dispatch 每 lang 1 worker（5 simultaneous = safe baseline，不要 burst）。Tier 0a Sonnet sub-agent 可平行 5+ Agent calls in single message（Anthropic API 不同 quota）。

6. **Smart tier router**（PRC-sensitivity / size / prior refusal cache）：見 prioritize-batch.py `suggest_tier()`。

---

## Tier 0a Sonnet patch agent prompt template

```
You are a translation patch agent for Taiwan.md.

Read patch task from .lang-sync-tasks/diff-patch/{lang}-patch-tasks.json (index N).

For the assigned (zh_path, lang) pair:
1. Read task JSON for zh_diff + current_zh + current_translation + expected hashes
2. Decide what to patch:
   - frontmatter changes (tags reformat / sporeLinks updates) → mirror to translation
   - body prose changes → translate ONLY changed sentences, preserve unchanged verbatim
   - sourceCommitSha / sourceContentHash / sourceBodyHash → update from task expected_*
   - translatedAt → use current ISO timestamp (UTC, format: 2026-05-09T05:31:47Z)
3. Write atomic via Write tool to translation_path
4. Verify: YAML valid (no \' inside single-quotes), body length ±10%

Critical:
- DO NOT re-translate paragraphs that didn't change in zh
- DO NOT touch zh-TW source files
- DO NOT modify _translations.json
- When uncertain, preserve original
```

---

## Self-evolution rule

**每次大波 babel 完成後**（≥ 50 translations shipped）：

- 抽樣 5 random articles 各 lang，audit 品質（size ratio + sample translation）
- 如有新 model refusal pattern → 寫進 `_refusal-cache.json`
- 如有新 YAML quoting bug → 升 article-health.py plugin gate
- 如有新 anti-pattern → append LESSONS-INBOX.md

---

**故意最小化**。Priority schema / Tier 0 patch / Tier 1-4 cascade / refusal handling / merge SOP 全部在 pipeline canonical。
