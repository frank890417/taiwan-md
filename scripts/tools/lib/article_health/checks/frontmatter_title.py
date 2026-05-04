"""frontmatter_title — title format checks.

Migrated from `scripts/core/test-frontmatter.mjs::checkTitleFormat`
(2026-05-04 SSOT Phase 3).

Canonical: docs/editorial/EDITORIAL.md §Title 五原則 + §半形標點禁用

Yields multiple violations (different severities) from a single check:
  - HARD: half-width punct in CJK title context (silent rendering issue)
  - WARN: vague adjective in title (per EDITORIAL §原則 3)
  - WARN: title length > 35 effective chars (EDITORIAL recommends ≤ 30)
  - WARN (People only): missing colon sandwich (per EDITORIAL §原則 5)
  - WARN (People only): post-colon part < 8 weight (per EDITORIAL §原則 4)

Translations (en/ja/ko/es/fr) follow source-lang conventions — APPLIES_TO=zh-TW.
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "frontmatter-title"
DIMENSION = "frontmatter"
DEFAULT_SEVERITY = Severity.WARN  # most checks are warn; HARD ones override per-violation
EDITORIAL_REF = "EDITORIAL.md §Title 五原則"
APPLIES_TO = ["zh-TW"]

# Per EDITORIAL §原則 3 canonical 禁用清單. 「神話 / 不朽 / 永恆」等
# 沒列在這裡的詞可能是文章本身的 subject (如《原住民神話》、《不朽記憶》).
# 擴充先讀 docs/editorial/EDITORIAL.md §原則 3.
TITLE_VAGUE_ADJECTIVES: list[str] = [
    "傳奇",
    "偉大",
    "優秀",
    "最強",
    "國民",
    "天后",
]

CJK_RE = re.compile(r"[一-鿿㐀-䶿]")

# Half-width punctuation in CJK title context — HARD violations.
# Mirror of `cjk_punct` plugin's title-side patterns. Both sides require CJK
# (or right-side digit for the comma/colon variants) to avoid false positives
# on English citation text.
_HALFWIDTH_PUNCT: list[tuple[re.Pattern, str, str]] = [
    (re.compile(r"(?<=[一-鿿㐀-䶿]),(?=[一-鿿㐀-䶿]|[0-9])"), ",", "，"),
    (re.compile(r"(?<=[一-鿿㐀-䶿]):(?=[一-鿿㐀-䶿]|[0-9])"), ":", "："),
    (re.compile(r"(?<=[一-鿿㐀-䶿]);(?=[一-鿿㐀-䶿])"), ";", "；"),
    (re.compile(r"(?<=[一-鿿㐀-䶿])\?(?=[一-鿿㐀-䶿])"), "?", "？"),
    (re.compile(r"(?<=[一-鿿㐀-䶿])!(?=[一-鿿㐀-䶿])"), "!", "！"),
]


def _effective_length(s: str) -> float:
    """CJK chars count as 1, others as 0.5 (matches the .mjs original)."""
    n = 0.0
    for ch in s:
        n += 1.0 if CJK_RE.match(ch) else 0.5
    return n


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    title = target.frontmatter.get("title")
    if not isinstance(title, str) or not title.strip():
        return

    # 1. Half-width punct in title (HARD — silent rendering issue)
    for pattern, half, full in _HALFWIDTH_PUNCT:
        for m in pattern.finditer(title):
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=(
                    f"title 含半形「{half}」(中文段落應用「{full}」)"
                    f" — 建議跑 `python3 scripts/tools/article-health.py --check=cjk-punct --fix`"
                ),
                snippet=title,
                fix_suggestion=full,
                editorial_ref="EDITORIAL.md §半形標點禁用",
            )

    # 2. Vague adjectives (WARN)
    for adj in TITLE_VAGUE_ADJECTIVES:
        if adj in title:
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.WARN,
                message=(
                    f"title 含空泛形容詞「{adj}」"
                    f" (EDITORIAL §原則 3 禁止「傳奇/偉大/最強/國民」等空泛詞)"
                ),
                snippet=title,
                editorial_ref="EDITORIAL.md §原則 3",
            )

    # 3. People category: colon sandwich (WARN)
    if target.category == "People":
        has_colon = ":" in title or "：" in title
        if not has_colon:
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.WARN,
                message=(
                    "People title 缺冒號三明治結構"
                    " (EDITORIAL §原則 5「人名：代表性弧線」格式必填)"
                ),
                snippet=title,
                editorial_ref="EDITORIAL.md §原則 5",
            )
        else:
            m = re.match(r"^[^:：]+[:：]\s*(.+)$", title)
            if m:
                after = m.group(1).strip()
                weight = _effective_length(after)
                if weight < 8:
                    yield Violation(
                        check=CHECK_NAME,
                        severity=Severity.WARN,
                        message=(
                            f"People title 冒號後敘述太短"
                            f" (\"{after}\", weight {weight:.1f} < 8)"
                            " — 副標應能單獨成立 (EDITORIAL §原則 4)"
                        ),
                        snippet=title,
                        editorial_ref="EDITORIAL.md §原則 4",
                    )

    # 4. Length sanity (WARN) — recommend ≤ 30, hard cap at 35.
    length = _effective_length(title)
    if length > 35:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                f"title 過長 (effective length {length:.1f} > 35)"
                " — EDITORIAL 建議 ≤ 30"
            ),
            snippet=title,
            editorial_ref="EDITORIAL.md §Title 五原則",
        )

    # 5. Subcategory required (HARD) — zh-TW non-About articles must declare
    # subcategory per docs/taxonomy/SUBCATEGORY.md. 2026-05-04 promoted from
    # WARN (test-frontmatter.mjs §β7) to HARD on user request: missing
    # subcategory breaks knowledge-graph clustering and Hub-page navigation,
    # so we want pre-commit to block instead of grandfather.
    # Hub files (_*.md) are excluded by the upstream file filter.
    sub = target.frontmatter.get("subcategory")
    if target.category != "About" and (not isinstance(sub, str) or not sub.strip()):
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"frontmatter 缺 'subcategory' 欄位"
                f" — {target.category} 類文章必須對應 docs/taxonomy/SUBCATEGORY.md 子分類"
            ),
            snippet=str(sub) if sub is not None else "(missing)",
            editorial_ref="docs/taxonomy/SUBCATEGORY.md",
        )
