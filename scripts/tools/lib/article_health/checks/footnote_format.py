"""footnote_format — canonical footnote definition format.

Migrated from `scripts/tools/footnote-format-fix.py` + the inline regex
in `.husky/pre-commit:78-95`.

Canonical: `[^N]: [Title](URL) — desc{10+ chars}`

Hard error: definitions that don't match canonical format. Fix supported
via `--fix` (best-effort transformation of common malformed shapes).

Editorial reference: pre-commit footnote format gate (originally added
2026-04-14 η session, lifted to SSOT 2026-05-04).
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "footnote-format"
DIMENSION = "citation"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = ".husky/pre-commit footnote format gate"
APPLIES_TO = ["*"]  # all langs

# Canonical: [^id]: [Title](https://...) — description (≥10 chars)
_RE_CANONICAL = re.compile(
    r"^\[\^[0-9a-zA-Z_-]+\]:\s*\[.+?\]\(https?://\S+\)\s+[—-]\s*.{10,}$"
)
_RE_DEF_LINE = re.compile(r"^\[\^[0-9a-zA-Z_-]+\]:")


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    for line_num, line in enumerate(target.body.splitlines(), start=1):
        if not _RE_DEF_LINE.match(line):
            continue
        if _RE_CANONICAL.match(line):
            continue
        yield Violation(
            check=CHECK_NAME,
            severity=DEFAULT_SEVERITY,
            message=(
                "腳註格式不合規範：應為 `[^N]: [Title](URL) — description (≥10 chars)`"
            ),
            line=line_num,
            snippet=line[:100],
            editorial_ref=EDITORIAL_REF,
        )
