"""footnote_density — citation density grading (A-F).

Migrated from `scripts/tools/footnote-scan.sh` grade calculation.

Grade rules (matches shell):
  A: ≥3 footnotes AND density ≤300 (1 fn per ≤300 words)
  B: ≥1 footnote (lower density / count)
  C: ≥3 URLs (no formal footnotes but has external sources)
  D: ≥1 URL  (minimal sourcing)
  F: zero footnotes, zero URLs (citation desert)

Severity: WARN (informational health metric, not block-grade).
For PR-level enforcement use prose_health's citation-desert check.
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "footnote-density"
DIMENSION = "citation"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "footnote-scan.sh A-F grading"
APPLIES_TO = ["*"]

_RE_DEF = re.compile(r"^\[\^[0-9a-zA-Z_-]+\]:", re.MULTILINE)


def _word_count(body: str) -> int:
    return len(body.split())


def _grade(fn_count: int, url_count: int, density: int | None) -> str:
    if fn_count >= 3 and density is not None and density <= 300:
        return "A"
    if fn_count >= 1:
        return "B"
    if url_count >= 3:
        return "C"
    if url_count >= 1:
        return "D"
    return "F"


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    fn_count = len(_RE_DEF.findall(body))
    url_count = body.count("http")
    words = _word_count(body)
    density = words // fn_count if fn_count > 0 else None
    grade = _grade(fn_count, url_count, density)

    if grade in ("A", "B"):
        return  # healthy — no violation

    if grade == "C":
        msg = f"腳註等級 C：無正式腳註但有 {url_count} 個 inline URL"
    elif grade == "D":
        msg = f"腳註等級 D：僅 {url_count} 個 URL，無正式腳註"
    else:  # F
        msg = "腳註等級 F：引用荒漠（零腳註、零 URL）"

    yield Violation(
        check=CHECK_NAME,
        severity=DEFAULT_SEVERITY,
        message=msg,
        editorial_ref=EDITORIAL_REF,
        fix_suggestion=grade,  # surfaces grade letter for dashboard JSON
    )
