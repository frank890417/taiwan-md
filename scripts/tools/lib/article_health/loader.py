"""article_health.loader — file → FileTarget conversion.

Single canonical place for:
  - YAML frontmatter parsing
  - body extraction
  - protected-region detection (code / URL / HTML attr)
  - lang / category / slug derivation from path

Plugins should never re-parse the file — they consume FileTarget.
"""

from __future__ import annotations
import re
from pathlib import Path
from typing import Any

from .types import FileTarget


# Path patterns: knowledge/{Category}/{slug}.md (zh-TW) or
#               knowledge/{lang}/{Category}/{slug}.md (translations)
_LANG_DIRS = {"en", "ja", "ko", "es", "fr"}

# Protected region patterns
_RE_FENCED_CODE = re.compile(r"```[\s\S]*?```", re.MULTILINE)
_RE_INLINE_CODE = re.compile(r"`[^`\n]+`")
# Link URL: `](...)` — exclude `)` AND newlines so a malformed link with
# fullwidth `）` instead of `)` doesn't eat across lines into the next link.
# 2026-05-04 黃魚鴞 incident showed `[^)]+` was running until the FAR-AWAY
# next halfwidth `)`, swallowing 5 lines and corrupting protected_regions.
_RE_MD_LINK_URL = re.compile(r"\]\([^)\n]+\)")
_RE_HTML_TAG = re.compile(r"<[^>\n]+>")
# Frontmatter delimiter
_RE_FRONTMATTER = re.compile(
    r"^---\s*\n(?P<yaml>.*?)\n---\s*\n(?P<body>.*)\Z",
    re.DOTALL,
)


def _parse_frontmatter_minimal(yaml_text: str) -> dict[str, Any]:
    """Lightweight YAML frontmatter parser — handles the subset Taiwan.md uses.

    Not a full YAML parser. Falls back to PyYAML if installed, else uses
    a simple key: value parser for top-level scalar / list-on-one-line cases.
    Caller can pass already-parsed dict via FileTarget directly if richer
    parsing is needed.

    Supported:
      key: 'string'          → str
      key: "string"          → str
      key: bare-string       → str
      key: 2026-05-04        → str (date)
      key: true/false        → bool
      key: 12                → int
      key: ['a', 'b']        → list[str] (only single-line lists)
      key: [a, b, c]         → list[str]

    Caller-side note: for our use cases (title/category/lang/slug/tags),
    this minimal parser is sufficient. Tests guard the surface area.
    """
    try:
        import yaml  # type: ignore[import-untyped]

        return yaml.safe_load(yaml_text) or {}
    except ImportError:
        pass

    out: dict[str, Any] = {}
    for raw_line in yaml_text.splitlines():
        line = raw_line.rstrip()
        if not line or line.startswith("#"):
            continue
        m = re.match(r"^([A-Za-z][\w-]*):\s*(.*)$", line)
        if not m:
            continue
        key, val = m.group(1), m.group(2).strip()
        if not val:
            out[key] = ""
            continue
        # List: [a, b, c] or ['a', 'b']
        if val.startswith("[") and val.endswith("]"):
            inner = val[1:-1].strip()
            if not inner:
                out[key] = []
            else:
                items = [
                    s.strip().strip("'\"")
                    for s in re.split(r",(?![^\[\]]*\])", inner)
                ]
                out[key] = [s for s in items if s]
            continue
        # Quoted string
        if (val.startswith("'") and val.endswith("'")) or (
            val.startswith('"') and val.endswith('"')
        ):
            out[key] = val[1:-1]
            continue
        # Bool
        if val == "true":
            out[key] = True
            continue
        if val == "false":
            out[key] = False
            continue
        # Int
        if val.isdigit():
            out[key] = int(val)
            continue
        # Bare string (date, plain text)
        out[key] = val
    return out


def _detect_protected_regions(body: str) -> list[tuple[int, int, str]]:
    """Find regions where punctuation/text rules should NOT apply.

    Order matters — fenced code first (greedy multi-line), then inline patterns.
    Returns sorted, non-overlapping list of (start, end, kind).
    """
    regions: list[tuple[int, int, str]] = []
    masked = list(body)
    placeholder = "\x00"  # avoid re-matching inside

    def _add_and_mask(pattern: re.Pattern, kind: str) -> None:
        for m in pattern.finditer("".join(masked)):
            regions.append((m.start(), m.end(), kind))
            for i in range(m.start(), m.end()):
                if i < len(masked):
                    masked[i] = placeholder

    # Fenced code blocks: greedy ```...```
    _add_and_mask(_RE_FENCED_CODE, "fenced-code")
    # Inline code spans: `...` (single line)
    _add_and_mask(_RE_INLINE_CODE, "inline-code")
    # Markdown link URLs: ](url) — protects URL only, not anchor text
    _add_and_mask(_RE_MD_LINK_URL, "link-url")
    # HTML tags: <...> (single line)
    _add_and_mask(_RE_HTML_TAG, "html-tag")

    return sorted(regions, key=lambda r: r[0])


def _detect_sections(body: str) -> dict[str, tuple[int, int]]:
    """Detect canonical section boundaries: 延伸閱讀 / 參考資料 / 圖片來源.

    Returns name → (start, end) byte offsets in body coords. Used by plugins
    that need to treat these regions specially (per 2026-05-04 黃魚鴞 lesson:
    these sections contain markdown link URLs that must stay half-width
    even in zh-TW context).

    Section boundaries:
      - Start: first occurrence of `**延伸閱讀**` or `## 延伸閱讀` etc.
      - End: next h2/h3 header OR end-of-file.
    """
    section_starts = [
        ("further-reading", re.compile(r"^(?:##\s*延伸閱讀|\*\*延伸閱讀\*\*[：:])", re.MULTILINE)),
        ("references", re.compile(r"^##\s*參考資料", re.MULTILINE)),
        ("image-sources", re.compile(r"^##\s*圖片來源", re.MULTILINE)),
    ]
    # Find all candidate section start positions
    starts: list[tuple[int, str]] = []
    for name, pattern in section_starts:
        m = pattern.search(body)
        if m:
            starts.append((m.start(), name))
    # Also find ALL h2 positions to use as section boundaries
    h2_positions = [m.start() for m in re.finditer(r"^##\s", body, re.MULTILINE)]
    sections: dict[str, tuple[int, int]] = {}
    for start, name in starts:
        # Find next boundary: next h2 after this start, or end of body
        next_h2 = next((p for p in h2_positions if p > start), len(body))
        sections[name] = (start, next_h2)
    return sections


def _derive_meta_from_path(path: Path) -> tuple[str, str, str]:
    """Returns (lang, category, slug) from knowledge/... path."""
    parts = path.parts
    try:
        idx = parts.index("knowledge")
    except ValueError:
        return ("zh-TW", "", path.stem)
    rest = parts[idx + 1 :]
    if not rest:
        return ("zh-TW", "", path.stem)
    if rest[0] in _LANG_DIRS:
        lang = rest[0]
        category = rest[1] if len(rest) >= 2 else ""
    else:
        lang = "zh-TW"
        category = rest[0]
    slug = path.stem
    return (lang, category, slug)


def load_target(path: Path | str) -> FileTarget:
    """Read file, parse frontmatter, prep protected regions, return FileTarget.

    `body` is padded with leading blank lines equal to the frontmatter line
    count, so any line number computed from `body` matches the original file's
    line number. This keeps every plugin's reported line numbers correct
    without each plugin needing to track a frontmatter offset.
    """
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    fm: dict[str, Any] = {}
    body = text
    body_text_offset = 0
    pad_lines = 0
    m = _RE_FRONTMATTER.match(text)
    if m:
        fm = _parse_frontmatter_minimal(m.group("yaml"))
        body_text_offset = m.start("body")
        # Count newlines in the frontmatter section (including the two ---
        # delimiter lines) so body's first content line aligns with the
        # original file line number.
        frontmatter_span = text[:body_text_offset]
        pad_lines = frontmatter_span.count("\n")
        body = ("\n" * pad_lines) + m.group("body")
    lang, category, slug = _derive_meta_from_path(p)
    regions = _detect_protected_regions(body)
    sections = _detect_sections(body)
    return FileTarget(
        path=p,
        text=text,
        frontmatter=fm,
        body=body,
        body_text_offset=body_text_offset,
        body_pad_lines=pad_lines,
        lang=lang,
        category=category,
        slug=slug,
        protected_regions=regions,
        sections=sections,
    )
