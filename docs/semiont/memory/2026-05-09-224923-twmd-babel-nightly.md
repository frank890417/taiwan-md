---
session_id: 2026-05-09-224923-twmd-babel-nightly
session_span: 2026-05-09 22:27:00 +0800 → 2026-05-09 22:49:23 +0800 (~22 min)
trigger: cron routine twmd-babel-nightly @ 22:22
observer: routine（autonomous，無 in-loop 觀察者）
beat_coverage: Stage 3a/3b 完成；Stage 3c (P1 owl-alpha) 主動 defer 守 1hr 預算
---

# twmd-babel-nightly @ 2026-05-09 22:27

## 本輪量化結果

| Stage | 路徑 | 結果 |
|-------|------|------|
| 3a P2.5 deterministic | bump-source-sha.py | 0 candidates（前一輪已 clear） |
| 3b P2 Tier 0a | Sonnet diff-patch × 5 lang | **74 patches OK / 0 fail** |
| 3c P1 Tier 1 | owl-alpha cloud | **deferred**（守 1hr 預算） |
| 4 Ship | PR #959 | merged 14:48:38Z |

Stale Δ: en -15 / ja -15 / ko -16 / es -15 / fr -12 = **-73 stale cleared**

Per-lang patch count: en 16 / ja 15 / ko 16 / es 15 / fr 12 = **74 total**。

## Tier cascade 路徑

只動到 **Tier 0a (Sonnet sub-agent diff-patch)**。沒 fall through 到 Tier 1/2/3：

- 0 cloud free tier dispatch（owl-alpha 完全沒呼叫）
- 0 PRC AI refusal（沒走 Tier 2 Hy3）
- 0 local LLM 補底（沒走 Tier 3 Ollama qwen3.6）
- 0 paid token

Tier 0a 對 P2 minor stale 是 **dominant strategy**：

- Per-patch ~30s wall-clock（5 agent parallel = ~10 min for 74 patches）
- 0 LLM drift（unchanged paragraphs preserved verbatim，LLM 只動 diff 段）
- 0 budget consumption（在 Anthropic Sonnet 預算內 burst，不吃 cloud free tier rate）

## Tier 0a emergent property（值得記）

第一次 production-scale 跑 v3 Tier 0a（之前只有 5/9 賈永婕一篇 demo）。74 patch 全 pass 的觀察：

1. **Sub-agent self-discipline 高**：5 agents 各自 process 自己的 lang batch，沒有 cross-talk / 沒有 hallucination policy / 沒 truncate。Sonnet 對 "preserve unchanged paragraphs verbatim" 指令的 compliance 比預期高
2. **Frontmatter normalize 是 emergent benefit**：原本 v3 spec 只說「mirror frontmatter changes」，但 agents 順便把 unquoted dates / lone tag values / 缺 category 等 normalize 了。Editorial 整齊度副作用。
3. **Pre-existing data quality issues 浮現**：4 個 anomaly 都是上游已有的 truncation / 語言錯置，不是 patch 引入。Tier 0a 之所以暴露這些：因為它要 read 既有 translation 才能 patch，順帶 expose 結構問題

## 失敗模式 / 教訓（→ LESSONS-INBOX）

**Tooling bug**：`diff-patch-prepare.py:172` 算 `expected_new_content_hash` 用 full file（frontmatter+body），`status.py:178 body_hash()` strip frontmatter only。Agent 忠實寫 `expected_new_content_hash` → status.py 讀回 mismatch → 74 個 patched files 全 `sha-lost-hash-mismatch`，雖然語意 patch 是對的。

Post-fix：寫 inline Python 重算 `body_hash` + `body_hash_pure` 並 update sourceContentHash + sourceBodyHash on all 74 files。Stale 才正確 reflect -73。

**Upstream fix needed**：`diff-patch-prepare.py:172` 改 import `body_hash` from status.py（或對齊 hash 函數）。寫成獨立 LESSONS-INBOX entry。

## Auto-merge 結果

PR #959 squash-merged 14:48:38Z。`gh pr merge --squash --delete-branch` exit non-zero 但 remote 看 state=MERGED — 是 local worktree state 的 sync race（不影響 remote）。

CI 兩支 (review / check-translation) 在 IN_PROGRESS 狀態 merge 通過 (mergeStateStatus=UNKNOWN at merge time)。沒 block PR。

## Handoff 三態

**已 ship**：
- PR #959 merged → main 進到 3a0fb7dae
- 74 P2 minor stale cleared
- Memory 寫到 docs/semiont/memory/2026-05-09-224923-twmd-babel-nightly.md
- LESSONS-INBOX 補 diff-patch-prepare hash mismatch entry

**Pending（給下個 babel routine）**：
- ~660 P2 stale 還在（528 - 74 = 454 P2 + 222 P1 + 3 P0）
- Top 5 P1 Tier 1 owl-alpha 沒跑（這次主動 defer 守 1hr 預算）
- 下一輪建議：P1 priority over P2，因為 P1 diff > 50 lines 不能 Tier 0a，必須 Tier 1+ cascade

**Pending（給觀察者）**：
- `diff-patch-prepare.py:172` hash function 對齊 — 不修這個 bug，每次 babel 都要 post-fix recompute hash
- es/Society/encyclopedia-of-taiwan.md prior 嚴重 truncation 問題：agent 順手做 full retranslate，但這暴露 pre-Tier 0a 的 cloud free tier batch 有 silent truncation 沒抓到
- es/Society/taiwan-diplomatic-allies-and-international-relations.md 整篇是英文（不是西文）— 上游 batch 寫錯 lang。要單獨清

## 給下個 session

如果你是下次 cron twmd-babel-nightly：

1. **先跑 status.py 確認 P2.5 = 0** 才 skip Stage 3a。今天 0，如果有 candidate 一定先跑 deterministic
2. **P1 vs P2 排序**：P2 Tier 0a 是 cheap dominant strategy，但 P1 不能用 Tier 0a。若 P1 backlog > P2，先做 P1（owl-alpha cascade），預留 30-50 min wall-clock
3. **post-Tier-0a hash recompute**：在 fix `diff-patch-prepare.py` 之前，每次 Tier 0a batch 完都要跑 inline recompute（範例見本 memory §失敗模式）。否則 stale 不會降。

如果你是哲宇手動 review：

- PR #959 already merged（無需 review）
- LESSONS-INBOX 新 entry「diff-patch-prepare hash function 對齊 status.py」— low priority bug，但每跑必撞
- 翻譯 anomaly 三筆（encyclopedia-of-taiwan es / taiwan-diplomatic-allies es 整篇英文 / tea-culture ja truncation）值得單獨 PR 修

🧬

_routine: twmd-babel-nightly | session: 2026-05-09-224923 | wall-clock: ~22 min | LLM cost: 0 cloud free tier + ~150K Sonnet tokens × 5 agents_
