"""wikilink_target — verify [[X]] / [[X|Y]] targets resolve to real articles.

Migrated from `scripts/tools/wikilink-validate.sh` (HARD pre-commit gate
since 2026-04-04).

Resolution rule: target name must equal the basename (without .md) of an
existing zh-TW article under `knowledge/{Category}/`.
"""

from __future__ import annotations
import os
import re
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "wikilink-target"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "wikilink-validate.sh"
APPLIES_TO = ["*"]

_RE_WIKILINK = re.compile(r"\[\[([^\]|\n]+?)(?:\|[^\]\n]+)?\]\]")

# Directories to scan for valid article slugs (zh-TW only — translations
# share the source slug, not target).
_LANG_DIRS_SKIP = {"en", "ja", "ko", "es", "fr"}
_KNOWLEDGE_ROOT = Path("knowledge")


def _existing_slugs() -> set[str]:
    """Cache: scan knowledge/ once per process for valid zh-TW article slugs."""
    cached = getattr(_existing_slugs, "_cache", None)
    if cached is not None:
        return cached
    slugs: set[str] = set()
    if _KNOWLEDGE_ROOT.exists():
        for entry in _KNOWLEDGE_ROOT.iterdir():
            if not entry.is_dir() or entry.name in _LANG_DIRS_SKIP:
                continue
            for md in entry.glob("*.md"):
                if md.name.startswith("_"):
                    continue
                slugs.add(md.stem)
    _existing_slugs._cache = slugs  # type: ignore[attr-defined]
    return slugs


def _reset_cache() -> None:
    """Test helper — invalidate the slug cache."""
    if hasattr(_existing_slugs, "_cache"):
        delattr(_existing_slugs, "_cache")


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    slugs = _existing_slugs()
    seen_at: dict[str, int] = {}  # dedup per (target, line) so re-uses count once
    for m in _RE_WIKILINK.finditer(body):
        link = m.group(1).strip()
        if not link:
            continue
        if link in slugs:
            continue
        # Compute line number
        line = body.count("\n", 0, m.start()) + 1
        key = f"{link}@{line}"
        if key in seen_at:
            continue
        seen_at[key] = 1
        yield Violation(
            check=CHECK_NAME,
            severity=DEFAULT_SEVERITY,
            message=f"wikilink 目標不存在：[[{link}]]",
            line=line,
            snippet=m.group(0)[:80],
            editorial_ref=EDITORIAL_REF,
        )
