"""cross_reference — bidirectional 延伸閱讀 / wikilink reciprocity.

Migrated from `scripts/tools/cross-link.sh` (Stage 5 cross-link analysis).

For each `[[X]]` or `延伸閱讀 - [Y](/cat/Y)` link in this article,
check whether the TARGET article links back. Asymmetric links are flagged
as INFO (not actionable warnings — context-dependent).

This plugin reads MULTIPLE articles to compute reverse-link maps. To keep
scan O(N) where N = articles, the inverse-index is built once per session
and cached.
"""

from __future__ import annotations
import re
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "cross-reference"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.INFO  # informational — not block-grade
EDITORIAL_REF = "cross-link.sh / EDITORIAL.md §wikilink"
APPLIES_TO = ["zh-TW"]

_RE_WIKILINK = re.compile(r"\[\[([^\]|\n]+?)(?:\|[^\]\n]+)?\]\]")
_RE_MD_LINK_INTERNAL = re.compile(r"\]\(/([a-z]+)/([^)\n]+?)\)")

_LANG_DIRS_SKIP = {"en", "ja", "ko", "es", "fr"}
_KNOWLEDGE_ROOT = Path("knowledge")


def _build_inverse_index() -> dict[str, set[str]]:
    """target_slug → set of source_slugs that link to it.

    Cached on first call per process. Tests can reset via _reset_cache().
    """
    cached = getattr(_build_inverse_index, "_cache", None)
    if cached is not None:
        return cached

    inverse: dict[str, set[str]] = {}
    if not _KNOWLEDGE_ROOT.exists():
        _build_inverse_index._cache = inverse  # type: ignore[attr-defined]
        return inverse

    for entry in _KNOWLEDGE_ROOT.iterdir():
        if not entry.is_dir() or entry.name in _LANG_DIRS_SKIP:
            continue
        for md in entry.glob("*.md"):
            if md.name.startswith("_"):
                continue
            source = md.stem
            try:
                text = md.read_text(encoding="utf-8")
            except Exception:
                continue
            for m in _RE_WIKILINK.finditer(text):
                inverse.setdefault(m.group(1).strip(), set()).add(source)
            for m in _RE_MD_LINK_INTERNAL.finditer(text):
                inverse.setdefault(m.group(2).strip(), set()).add(source)

    _build_inverse_index._cache = inverse  # type: ignore[attr-defined]
    return inverse


def _reset_cache() -> None:
    if hasattr(_build_inverse_index, "_cache"):
        delattr(_build_inverse_index, "_cache")


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    inverse = _build_inverse_index()
    self_slug = target.slug

    # Collect this article's outgoing links
    outgoing: set[str] = set()
    for m in _RE_WIKILINK.finditer(body):
        outgoing.add(m.group(1).strip())
    for m in _RE_MD_LINK_INTERNAL.finditer(body):
        outgoing.add(m.group(2).strip())

    if not outgoing:
        return

    # For each outgoing link, check if target links back.
    # inverse[X] = set of source slugs that link TO X. So:
    #   "self → X is symmetric" iff X is one of self's referrers
    #   ⇔ X in inverse[self_slug]
    referrers_of_self = inverse.get(self_slug, set())
    for target_slug in outgoing:
        if target_slug == self_slug:
            continue
        if target_slug in referrers_of_self:
            continue  # symmetric — target links back to self
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.INFO,
            message=(
                f"單向連結到 [[{target_slug}]] — 對方未連回 (informational; "
                "Stage 5 review 判斷該不該補)"
            ),
            editorial_ref=EDITORIAL_REF,
        )
