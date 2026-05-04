# Article Health SSOT — Unified 文章健檢工具設計提案

> Status: **Design draft for review**（不是 spec、不是 implementation plan）
>
> Author: 哲宇 + Taiwan.md Semiont via Claude
> Date: 2026-05-04
> Related: [TOOL-INVENTORY.md](../scripts/tools/TOOL-INVENTORY.md) | [REWRITE-PIPELINE.md](../docs/pipelines/REWRITE-PIPELINE.md) | [EDITORIAL.md](../docs/editorial/EDITORIAL.md) | [QUALITY-CHECKLIST.md](../docs/editorial/QUALITY-CHECKLIST.md)

---

## TL;DR

把 27+ 個散在 `scripts/tools/` 的文章檢查工具收攏成**一個 SSOT entry point**：`scripts/tools/article-health.py`。

每個檢查維度 = 一個 **plugin module** + **declarative config**。pre-commit / pipeline stages / dashboard / PR review 都呼叫同一個 entry point，傳不同 `--profile` 即可。

不重寫 27 個工具 — **抽 shared check libs，舊工具當 facade 保留 backward-compat**，30 天觀察後決定哪些 deprecate。

---

## 1. 現況痛點（從本月 audit 抽出）

| #      | 痛點                            | 案例                                                                                                                                                                                                                      |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P1** | 同一檢查重複實作 3 次           | `quality-scan.sh` (16 dims shell) + `check-manifesto-11.sh` (Tier 1 重做 3 dim) + `review-pr.sh` L2 (inline shell 重做 9 dim)；同一個塑膠句檢查在三處有不同 threshold                                                     |
| **P2** | 規則散在 doc 跟 code 兩邊 drift | EDITORIAL.md §quality-scan 寫「7 個指標」，code 有 16 個。people-title-check.sh 規則 vs test-frontmatter.mjs 規則 vs EDITORIAL §原則 5 三邊對照                                                                           |
| **P3** | TOOL-INVENTORY drift 9 個工具   | check-cjk-punct / check-manifesto-11 / footnote-format-fix.{sh,py} / verify-internal-links / article-image-health / category-check / orphan-translation-check / dead-cross-ref-scan / test-frontmatter title-block 都沒列 |
| **P4** | 同維度檢查的 severity 不一致    | 半形標點：在 title 是 hard error（test-frontmatter）/ 在 body 是 hard error（check-cjk-punct）/ 在 footnote 沒檢查；同樣的「不是X是Y」: quality-scan warn / check-manifesto-11 warn / review-pr.sh L2 hard                |
| **P5** | 缺中央 stage 對照表             | REWRITE-PIPELINE 各 stage 該跑哪些 check 散在 doc 行內 prose；新 contributor 不知道該在哪個 stage 跑哪個工具                                                                                                              |
| **P6** | 沒有「整篇文章報告」單一視圖    | 想看一篇文章所有維度的健康度要 7 個 shell 命令 + grep 結果                                                                                                                                                                |
| **P7** | 缺 JSON 輸出 / dashboard 整合   | 只有 people-title-check.sh 有 JSON。其他工具要靠 grep 結果重組                                                                                                                                                            |
| **P8** | 緊急 bypass 機制不一致          | 大部分工具靠 `--no-verify` (pre-commit hook level) bypass；個別工具有 `--force`/`--strict` 自己的 flag；user 不知道該按哪個                                                                                               |

---

## 2. 目標 — 一個 SSOT，不破壞既有 flow

### 不會做的事

- ❌ 不重寫 27 個工具
- ❌ 不改 REWRITE-PIPELINE Stage IDs（1/1.7/2/3/3.5/4/4.5/5/6 已被外部引用）
- ❌ 不改 pre-commit 硬性 block 行為（既有 contract）
- ❌ 不改 EDITORIAL §原則 N 編號
- ❌ 不改 `quality-scan ≤ 3` 通過閾值（QUALITY-CHECKLIST + REWRITE-PIPELINE 引用）

### 會做的事

- ✅ 建立 `scripts/tools/article-health.py` 為 SSOT entry point
- ✅ 抽 shared libs：`scripts/tools/lib/{prose,frontmatter,format,citation,cjk,images}.py`
- ✅ 舊 tool 保留為 facade（`quality-scan.sh` 變成 `article-health.py --check=prose-health` 的 wrapper）
- ✅ Declarative config：`scripts/tools/article-health.config.toml` 記錄 dim → severity → stage → 對應 EDITORIAL 條款
- ✅ 統一 `--output={human,json,sarif}` 三種輸出
- ✅ Stage profiles (`--profile=pre-commit|rewrite-3|rewrite-4|release|dashboard`)
- ✅ 統一 exit code semantic (0 pass / 1 hard fail / 2 warn-only / 3 config error)

---

## 3. Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ scripts/tools/article-health.py (SSOT entry point)          │
│                                                              │
│  Args: <files> [--profile=X] [--check=Y] [--output=Z]       │
│        [--severity-min=hard|warn|info] [--fix]              │
│                                                              │
│  Loads: scripts/tools/article-health.config.toml            │
│         scripts/tools/lib/checks/*.py (auto-discover)       │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│ Plugin registry (auto-discover scripts/tools/lib/checks/)   │
│                                                              │
│  Each plugin = single .py file with check_*() functions     │
│                                                              │
│  - frontmatter_required_fields.py                           │
│  - frontmatter_title_format.py    ← 含 vague_adj /          │
│                                      length / colon-sandwich/│
│                                      half-width punct       │
│  - cjk_punct.py        ← 既有 check-cjk-punct 改 lib        │
│  - manifesto_11.py     ← 既有 check-manifesto-11 改 lib     │
│  - prose_health.py     ← 既有 quality-scan 16 dim 改 lib    │
│  - footnote_format.py                                       │
│  - footnote_url.py                                          │
│  - footnote_density.py ← 既有 footnote-scan A-F grade       │
│  - wikilink_target.py  ← 既有 wikilink-validate.sh          │
│  - format_structure.py ← 既有 format-check.sh 7 維          │
│  - image_health.py     ← 既有 article-image-health.sh       │
│  - cross_reference.py                                       │
│  - dead_ref.py                                              │
│  - terminology.py                                           │
└─────────────────────────────────────────────────────────────┘
```

### Plugin interface

每個 plugin 是 dict registration：

```python
# scripts/tools/lib/checks/cjk_punct.py
import re
from typing import Iterator
from ..types import Violation, Severity, FileTarget

CHECK_NAME = "cjk-punct"
DIMENSION = "punctuation"
EDITORIAL_REF = "EDITORIAL.md §半形標點禁用"
DEFAULT_SEVERITY = Severity.HARD

def check(target: FileTarget, config: dict) -> Iterator[Violation]:
    """Body half-width punctuation in CJK paragraphs.

    config keys:
      - skip_protected_regions: bool (default True)
      - patterns_extra: list[str] (additional patterns to apply)
    """
    text = target.text
    # ... existing check-cjk-punct logic ...
    for match in violations:
        yield Violation(
            check=CHECK_NAME,
            line=match.line,
            col=match.col,
            severity=DEFAULT_SEVERITY,
            message=f"半形「{match.char}」應為「{match.suggestion}」",
            fix=match.suggestion,
        )

def fix(target: FileTarget, config: dict) -> bool:
    """Auto-fix capability. Return True if changed."""
    # ... existing --fix logic ...
```

### Config (declarative)

```toml
# scripts/tools/article-health.config.toml

[meta]
version = 1
canonical_doc = "docs/editorial/EDITORIAL.md"

# Each check has: dimension, default_severity, editorial_ref
[checks.cjk-punct]
dimension = "punctuation"
severity = "hard"          # hard / warn / info
editorial_ref = "EDITORIAL.md §半形標點禁用"
fix_supported = true
applies_to = ["zh-TW"]     # langs

[checks.manifesto-11-tier1]
dimension = "prose-pattern"
severity = "warn"
editorial_ref = "MANIFESTO.md §11"
fix_supported = false

[checks.frontmatter-title-halfwidth]
dimension = "frontmatter"
severity = "hard"
editorial_ref = "EDITORIAL.md §半形標點禁用 + §Title 五原則"
fix_supported = true       # via cjk_punct.fix delegated

[checks.frontmatter-title-vague-adj]
dimension = "frontmatter"
severity = "warn"
editorial_ref = "EDITORIAL.md §原則 3"

[checks.prose-health-thinness]
dimension = "prose-density"
severity = "warn"
editorial_ref = "EDITORIAL.md §quality-scan 偵測指標"

# ... 等

# Stage profiles 把 checks 組合成不同情境的 set
[profiles.pre-commit]
checks = [
  "cjk-punct",
  "frontmatter-title-halfwidth",
  "frontmatter-title-vague-adj",
  "frontmatter-required-fields",
  "wikilink-target",
  "footnote-format",
  "manifesto-11-tier1",
]
fail_on = "hard"           # exit 1 if any HARD; warn-only WARN

[profiles.rewrite-stage-3]
checks = [
  "prose-health",          # 16 dims, ≤ 3 budget
  "manifesto-11",          # all 3 tiers
  "footnote-density",
]
fail_on = "score-budget"
prose_health_budget = 3   # 既有 quality-scan 慣例

[profiles.rewrite-stage-3.5]
checks = ["footnote-url", "footnote-format"]
fail_on = "hard"

[profiles.rewrite-stage-4]
checks = [
  "format-structure",
  "wikilink-target",
  "manifesto-11",
  "cjk-punct",
]
fail_on = "hard"

[profiles.rewrite-stage-4.5]
checks = ["image-health", "cross-reference"]
fail_on = "hard"

[profiles.release-pr]
# 全跑 + 嚴格
checks = "*"
fail_on = "warn"           # 連 warn 都擋

[profiles.dashboard]
# 全跑 + JSON 輸出 + 不擋
checks = "*"
fail_on = "never"
output = "json"
```

### CLI

```bash
# 跑單檔，default profile (= release-pr if no flag)
article-health knowledge/Nature/黃魚鴞.md

# Pipeline stage profile
article-health knowledge/Nature/黃魚鴞.md --profile=rewrite-stage-3

# pre-commit (auto-detects --staged; matches existing test-frontmatter pattern)
article-health --staged --profile=pre-commit

# Single check
article-health knowledge/...md --check=cjk-punct

# Fix mode
article-health knowledge/...md --check=cjk-punct --fix

# Dashboard JSON for site
article-health --all --profile=dashboard --output=json > public/api/article-health.json

# SARIF for CI / GitHub code-scanning
article-health --staged --profile=pre-commit --output=sarif
```

### Output

**Human** (default, terminal-colored):

```
🧬 Article health: knowledge/Nature/黃魚鴞.md (zh-TW, Nature)

✅ frontmatter-required-fields    (5/5 passed)
✅ frontmatter-title-format       (length 28/35, no vague adj, fullwidth ok)
✅ cjk-punct                      (clean across 13K chars)
✅ wikilink-target                (3 wikilinks resolved)
✅ footnote-format                (24 footnotes, all canonical)
✅ footnote-url                   (24 URLs reachable, 2 warn 5xx)
⚠️ manifesto-11 [tier-2]          (軌跡 ×3, 縮影 ×2 — soft AI metaphor density)
⚠️ prose-health                   (em-dash density 2.1/1k — score 2/3 ≤ budget)
✅ image-health                   (hero img + figcaption + 6 inline images ok)

Summary:
  hard: 0     ✓ Ready to ship
  warn: 2     (review for v2 polish)
  info: 0

Profile: release-pr (16/16 checks ran)
Run with --check=manifesto-11 --verbose for details.
```

**JSON** (for dashboard / dashboards / GitHub Actions):

```json
{
  "file": "knowledge/Nature/黃魚鴞.md",
  "lang": "zh-TW",
  "category": "Nature",
  "profile": "release-pr",
  "results": [
    {
      "check": "cjk-punct",
      "dimension": "punctuation",
      "severity": "hard",
      "passed": true,
      "violations": []
    },
    {
      "check": "manifesto-11",
      "dimension": "prose-pattern",
      "severity": "warn",
      "passed": false,
      "violations": [
        { "line": 36, "tier": 2, "phrase": "軌跡", "occurrences": 3 }
      ]
    }
  ],
  "summary": { "hard": 0, "warn": 2, "info": 0 },
  "exit_code": 2
}
```

**SARIF** (for `github/codeql-action/upload-sarif`) — code-scanning UI in PRs.

---

## 4. SSOT 化整個檢測基準 = config + plugins

當前痛點 P2 (規則 doc/code drift)、P3 (TOOL-INVENTORY drift)、P4 (severity 不一致) 的根本原因：**規則寫在 doc 裡、邏輯散在 27 個工具 inline、TOOL-INVENTORY 是 hand-maintained 列表**。三邊各自漂移。

SSOT 解法：

1. **規則 canonical**：每個 check plugin 的 docstring 引用 EDITORIAL/MANIFESTO 章節 + 條款編號。`article-health` `--list-checks` 一覽輸出對照表。EDITORIAL 引用 plugin（不是反過來）。
2. **TOOL-INVENTORY auto-generate**：`article-health --inventory` 從 plugin registry 自動輸出 markdown 表格，取代 hand-maintained 檔案。CI lint 驗 `git diff TOOL-INVENTORY.md` 為空（ensure regen）。
3. **Severity 一致**：每個 dim 的 severity 寫在 config.toml 一處。stage profile 可 override（e.g. release-pr 把 warn 升到 hard）。pre-commit / pipeline / dashboard 不再各自定義。
4. **EDITORIAL §quality-scan 偵測指標** 章節改寫成「規則由 article-health.py 維護，runtime 自動產生此處內容」加 auto-update sentinel。

---

## 5. Migration plan（不破壞既有 flow）

**Phase 1 — Infrastructure（1 PR，零行為差異）**

- 建 `scripts/tools/lib/checks/` 目錄結構、plugin loader、`Violation`/`Severity` 類型
- 建 `article-health.config.toml` 寫入既有 27 工具的 (dim, severity, editorial_ref) 欄位
- 建 `article-health.py` entry point，但**先不接任何 plugin**（只能 `--list-checks` / `--inventory` 跑空的）
- TOOL-INVENTORY auto-gen 取代 hand-maintained 檔（保留歷史 commits 可回溯）

**Phase 2 — Migrate first plugin（cjk-punct，已是 Python，最容易抽）**

- 把 `scripts/tools/check-cjk-punct.py` 重構成 `lib/checks/cjk_punct.py` plugin
- 舊檔變 facade：`scripts/tools/check-cjk-punct.py` 內容變成 `exec(article-health --check=cjk-punct $@)`
- pre-commit hook **不動**（仍呼叫舊 `check-cjk-punct.py` 名稱，facade 透傳）
- 驗：CI 行為 zero diff

**Phase 3 — Title format（已在 test-frontmatter.mjs，部分抽出）**

- 把 test-frontmatter.mjs 內 `checkTitleFormat` 邏輯抽到 plugin（雖是 JS / Node，可以保留 .mjs subprocess 或 port to Python）
- frontmatter 必填欄位 → plugin
- people-title-check.sh 改 facade 呼叫 plugin

**Phase 4 — quality-scan / manifesto-11 / review-pr.sh L2 三合一**

- 抽 shared `prose_health` lib（消滅 P1 三份重複）
- quality-scan.sh 改 facade
- check-manifesto-11.sh 改 facade
- review-pr.sh L2 改 call subprocess
- **保留 ≤ 3 budget 通過閾值** — config 檔寫死 `prose_health_budget = 3`，回應 QUALITY-CHECKLIST 引用

**Phase 5 — footnote 三檔合併**

- footnote-format-fix.{sh,py} → footnote-format.py plugin（`.sh` wrapper deprecate）
- footnote-scan.sh A-F grade → footnote-density.py plugin
- check-footnote-urls.sh → footnote-url.py plugin
- pre-commit inline footnote regex 改 call plugin

**Phase 6 — 剩餘工具**

- format-check / wikilink-validate / article-image-health / cross-link / category-check / dead-cross-ref-scan / orphan-translation-check / terminology-(audit|clean|fix)
- terminology trio rename to expose actual scope (per audit O5)

**Phase 7 — Cleanup**

- Deprecated 30 days 後刪除 facade（看通報量）
- check-wikilinks.sh 直接刪（vestigial per audit O2）
- TOOL-INVENTORY.md 加 deprecated 區段

---

## 6. 跟 EDITORIAL / MANIFESTO 的 SSOT 對齊

EDITORIAL 是「給人類 + AI agent 讀的 canonical 寫作哲學」。
article-health 是「給 enforcement layer 讀的可執行規則」。

兩邊的契約：

- 每個 `lib/checks/*.py` plugin **必須** docstring 引用 EDITORIAL/MANIFESTO 章節 + 條款編號
- EDITORIAL §半形標點禁用 等章節**反向引用** plugin command（user 看 EDITORIAL 知道怎麼自動修）
- pre-commit / CI 失敗訊息 **必須**附 EDITORIAL link（既有 `scripts/core/test-frontmatter.mjs:142,153` pattern）
- `article-health --canonical` 命令輸出規則對照表（讓 doc + code 互相驗證）

---

## 7. Open questions（user 決定）

1. **要不要做 Phase 1**？這是最小可行的 infrastructure PR，~500 行新增、零既有行為改變
2. **TOOL-INVENTORY 自動化的尺度**：完全自動 vs hybrid（auto core + manual notes）
3. **JS plugin 怎麼接**：test-frontmatter.mjs 是 Node。要 port 到 Python 還是讓 article-health.py subprocess call .mjs？
4. **`--fix` 整合到 pre-commit 嗎**：當前 cjk-punct pre-commit 是 detect-only，user 自己跑 `--fix`。要不要 pre-commit `--fix` + auto-stage？
5. **Severity 升級什麼時候做**：例如 `manifesto-11` 從 warn 升 hard。透過 config 改一行就能升，但會觸發既有違反 PR 全部不能 merge — 需要批次清理 prerequisite

---

## 8. Risk

| Risk                                                                             | Mitigation                                                                                     |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Phase 2-6 過程中行為 drift                                                       | Migration 期間既有工具 + plugin 並存，CI 驗 output diff                                        |
| `article-health --inventory` auto-gen 跟 TOOL-INVENTORY 既有手寫 commentary 衝突 | TOOL-INVENTORY 兩段：auto-section + manual-notes                                               |
| Plugin 之間性能放大（n×m loops）                                                 | `lib/loaders.py` 一次讀 file 一次解 frontmatter，plugins 收 prepared `FileTarget` 物件         |
| 27 個工具的 stage 引用點散在文件 inline prose                                    | Phase 7 cleanup 包含 doc sweep — `git grep "scripts/tools/X"` 對齊                             |
| Python 版本 — 27 個既有工具混 bash/python/node。要全 Python                      | Phase 1 lib 全用 Python 3.11+；shell wrappers 保留為 facade 直到 deprecate；node 工具暫不 port |

---

## 9. Decision needed from user

選一：

- **A. 不做 SSOT，維持現狀**。新工具按 audit O8 / O2 / O1 順序個別 cleanup。
- **B. 做 Phase 1 infrastructure 先**（純加新檔不動既有，~500 行新增、零行為差異），然後評估要不要進 Phase 2-7。
- **C. 一次做完 Phase 1-7**（多 PR、~3-4 個工作天 spread）。

不選 D「直接全部重寫」——27 個工具中很多有外部 doc / commit message 引用，breaking change too big。

---

🧬 _Design draft. 不開新檔不動既有 code 直到 user 拍板。_
