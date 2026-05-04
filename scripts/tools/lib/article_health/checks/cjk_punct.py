"""cjk_punct — half-width punctuation detection in CJK paragraphs.

Migrates `scripts/tools/check-cjk-punct.py` into the SSOT plugin system.

Canonical: docs/editorial/EDITORIAL.md §半形標點禁用 (v5.5, 2026-05-04)

Critical regression guard (2026-05-04 黃魚鴞 incident):
  Markdown link URLs `](url)` MUST stay half-width even in CJK contexts.
  This plugin uses FileTarget.protected_regions which auto-excludes:
    - fenced code blocks
    - inline code
    - markdown link URL `](...)`
    - HTML attribute values

  See test_cjk_punct.py::test_wikilink_url_preserved for the regression test.
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "cjk-punct"
DIMENSION = "punctuation"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "EDITORIAL.md §半形標點禁用"
APPLIES_TO = ["zh-TW"]  # translations follow source-lang punct conventions

CJK = r"[一-鿿㐀-䶿]"

# Pattern entry: (regex, sub_template, fix_char, kind, message)
#   sub_template — used at --fix time by re.sub
#   fix_char     — single fullwidth char for the violation report
PATTERNS: list[tuple[re.Pattern, str, str, str, str]] = [
    # ── Right-side CJK (universal) ──
    (re.compile(rf",(?={CJK})"), "，", "，", "comma", "半形 ',' 應為 '，'"),
    (re.compile(rf":(?={CJK})"), "：", "：", "colon", "半形 ':' 應為 '：'"),
    (re.compile(rf";(?={CJK})"), "；", "；", "semi", "半形 ';' 應為 '；'"),
    (re.compile(rf"\?(?={CJK})"), "？", "？", "qmark", "半形 '?' 應為 '？'"),
    (re.compile(rf"!(?={CJK})"), "！", "！", "bang", "半形 '!' 應為 '！'"),
    # ── Left-side CJK + digit (number-formatting boundary) ──
    (
        re.compile(rf"(?<={CJK}),(?=[0-9])"),
        "，",
        "，",
        "comma",
        "半形 ',' 應為 '，' (CJK→數字)",
    ),
    (
        re.compile(rf"(?<={CJK}):(?=[0-9])"),
        "：",
        "：",
        "colon",
        "半形 ':' 應為 '：' (CJK→數字)",
    ),
    # ── ] (footnote close) + halfwidth + digit ──
    (
        re.compile(rf"(\]),(?=[0-9])"),
        r"\1，",
        "，",
        "fn-comma",
        "footnote 後半形 ',' 應為 '，'",
    ),
    (
        re.compile(rf"(\]);(?=[0-9])"),
        r"\1；",
        "；",
        "fn-semi",
        "footnote 後半形 ';' 應為 '；'",
    ),
    # ── Bold marker boundaries ──
    (
        re.compile(rf"(\*\*):(?={CJK}|\s|$)", re.MULTILINE),
        r"\1：",
        "：",
        "bold-colon",
        "粗體後半形 ':' 應為 '：'",
    ),
    (
        re.compile(rf"(?<={CJK}):(?=\*\*)"),
        "：",
        "：",
        "colon-bold",
        "粗體前半形 ':' 應為 '：'",
    ),
    # ── Parens between CJK ──
    (
        re.compile(rf"(?<={CJK})\((?={CJK})"),
        "（",
        "（",
        "lparen",
        "半形 '(' 應為 '（'",
    ),
    (
        re.compile(rf"(?<={CJK})\)(?={CJK}|[，。：；！？\s])"),
        "）",
        "）",
        "rparen",
        "半形 ')' 應為 '）'",
    ),
]


def _line_col(text: str, pos: int) -> tuple[int, int]:
    """Convert byte offset to 1-indexed (line, col)."""
    line = text.count("\n", 0, pos) + 1
    line_start = text.rfind("\n", 0, pos) + 1
    col = pos - line_start + 1
    return line, col


def _is_protected(target: FileTarget, body_pos: int) -> bool:
    for start, end, _ in target.protected_regions:
        if start <= body_pos < end:
            return True
    return False


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Yield violations for half-width punct in CJK paragraphs.

    config keys (optional):
      - max_per_kind: int — cap on violations reported per pattern kind
                            (default unlimited; pre-commit might cap to 20)
    """
    body = target.body
    # frontmatter title is in target.frontmatter, but title-format check is
    # a separate plugin (`frontmatter_title`). cjk_punct only handles BODY.
    max_per_kind = config.get("max_per_kind", None) if config else None

    counts: dict[str, int] = {}
    for pattern, _sub_template, fix_char, kind, message in PATTERNS:
        for m in pattern.finditer(body):
            if _is_protected(target, m.start()):
                continue
            n = counts.get(kind, 0)
            if max_per_kind is not None and n >= max_per_kind:
                continue
            counts[kind] = n + 1
            line, col = _line_col(body, m.start())
            line_start = body.rfind("\n", 0, m.start()) + 1
            line_end = body.find("\n", m.end())
            if line_end == -1:
                line_end = len(body)
            snippet = body[line_start:line_end].strip()[:80]
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=message,
                line=line,
                col=col,
                snippet=snippet,
                fix_suggestion=fix_char,
                editorial_ref=EDITORIAL_REF,
            )


def fix(target: FileTarget, config: dict[str, Any]) -> bool:
    """Apply all conversions to target.body, write back to disk if changed.

    Preserves protected regions. Returns True if file was modified (or would
    be in dry-run). Uses target.body_text_offset (set by loader) to splice
    fixed body back into the original text without disturbing frontmatter
    or the line-number padding the loader added.
    """
    body = target.body
    new_body = _fix_body(body, target.protected_regions)
    if new_body == body:
        return False
    if config.get("dry_run"):
        return True
    # Strip the leading blank-line pad the loader added for line alignment;
    # those lines don't exist in the original file.
    if target.body_pad_lines:
        new_body_unpadded = (
            new_body[target.body_pad_lines:]
            if new_body.startswith("\n" * target.body_pad_lines)
            else new_body
        )
    else:
        new_body_unpadded = new_body
    new_text = target.text[: target.body_text_offset] + new_body_unpadded
    target.path.write_text(new_text, encoding="utf-8")
    return True


def _fix_body(body: str, protected_regions: list[tuple[int, int, str]]) -> str:
    """Apply all PATTERNS to body, skipping protected regions."""
    if not protected_regions:
        return _apply_patterns(body)
    # Walk through body in segments alternating between protected and free
    out_parts: list[str] = []
    cursor = 0
    for start, end, _kind in sorted(protected_regions):
        if start > cursor:
            out_parts.append(_apply_patterns(body[cursor:start]))
        out_parts.append(body[start:end])  # protected, copy as-is
        cursor = end
    if cursor < len(body):
        out_parts.append(_apply_patterns(body[cursor:]))
    return "".join(out_parts)


def _apply_patterns(text: str) -> str:
    s = text
    for pattern, sub_template, _fix_char, _kind, _msg in PATTERNS:
        s = pattern.sub(sub_template, s)
    return s
