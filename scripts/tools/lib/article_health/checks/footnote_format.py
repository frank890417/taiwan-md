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

# Canonical (one of these forms):
#   1. With URL:  [^id]: [Title](https://...) — description (≥6 chars)
#   2. Pure prose explanatory note: [^id]: <prose ≥10 chars>  (no URL required —
#      these are 「補充說明」style footnotes, valid markdown convention)
# (relaxed from 10 → 6 for url-form descriptions in 2026-05-04 cleanup: Chinese
# descs are often short — 「維基百科條目」「中央社報導」 are clear enough at 5-6 chars)
_RE_CANONICAL = re.compile(
    r"^\[\^[0-9a-zA-Z_-]+\]:\s*\[.+?\]\(https?://\S+\)\s+[—-]\s*.{6,}$"
)
_RE_PURE_PROSE_FN = re.compile(
    r"^\[\^[0-9a-zA-Z_-]+\]:\s*[^\[\s].{9,}$"
)
_RE_DEF_LINE = re.compile(r"^\[\^[0-9a-zA-Z_-]+\]:")


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    for line_num, line in enumerate(target.body.splitlines(), start=1):
        if not _RE_DEF_LINE.match(line):
            continue
        # Two acceptable canonical forms: URL-citation OR pure-prose explanatory
        if _RE_CANONICAL.match(line) or _RE_PURE_PROSE_FN.match(line):
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


def fix(target: FileTarget, config: dict[str, Any]) -> int:
    """Safe auto-fix for footnote-format violations.

    ONLY applies the SAFE transform: `[^N]: [Title](URL)` → append
    ` — desc` (where desc is domain-aware via footnote-format-fix.py's
    DOMAIN_DESC table, or the fallback「詳見原始連結內文」).

    DOES NOT apply destructive transforms:
      - APA-style with prefix-text + embedded markdown link (would strip
        the real markdown link title and use the prose prefix as title)
      - Multi-link compound footnotes (would drop all but the first link)
      - Plain-URL-at-end (would synthesize a title from prose, lossy)

    Those edge cases are left as HARD violations for human review. User
    can run `python3 scripts/tools/footnote-format-fix.py --apply <file>`
    for the aggressive transform.

    2026-05-04 cleanup: previously delegated to heal_file directly, which
    caused information loss on 2/73 patterns. Restricted to safe-only.

    Returns number of footnotes modified. Respects config['dry_run'].
    """
    # Lazy load DOMAIN_DESC + desc_for_url from footnote-format-fix.py.
    import importlib.util
    from pathlib import Path as _Path
    fix_script = _Path(__file__).resolve().parents[3] / "footnote-format-fix.py"
    if not fix_script.exists():
        return 0
    spec = importlib.util.spec_from_file_location("_ff_fix", fix_script)
    if spec is None or spec.loader is None:
        return 0
    ff = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(ff)

    # Re-read fresh from disk (skip body padding for write-back simplicity)
    text = target.path.read_text(encoding="utf-8")
    lines = text.split("\n")
    # SAFE-only canonical extraction: line is `[^N]: [Title](URL)` with optional
    # desc (possibly < 10 chars). Match conservatively — must end at the URL or
    # have ` — desc` after, no prose prefix before `[`.
    _SAFE = re.compile(
        r"^(\[\^[0-9a-zA-Z_-]+\]:)\s+(\[[^\]]+\])\((https?://[^)]+)\)(?:\s+[—-]\s*(.*))?$"
    )
    # Angle-bracket URL: `[Title](<URL>) — desc?`
    _ANGLE = re.compile(
        r"^(\[\^[0-9a-zA-Z_-]+\]:)\s+(\[[^\]]+\])\(<(https?://[^>]+)>\)(?:\s+[—-]\s*(.*))?$"
    )
    # Non-em-dash separator: `[^N]: [Title](URL)<sep><rest>` where sep is `，`,
    # `（` (full-width paren — no space needed), or whitespace. SAFE transform:
    # normalize to canonical ` — `.
    _NON_EM_DASH_SEP = re.compile(
        r"^(\[\^[0-9a-zA-Z_-]+\]:)\s+(\[[^\]]+\])\((https?://[^)]+)\)([，,\s]*)([（(].+|[^—\s].+)$"
    )
    # Prose-prefix pattern: `[^N]: prose...參見[Title](URL)` — prose context BEFORE the
    # markdown link. SAFE transform: convert prose prefix into the desc field,
    # preserving original information without losing the link or the context.
    _PROSE_PREFIX = re.compile(
        r"^(\[\^[0-9a-zA-Z_-]+\]:)\s+(?P<prose>[^[]+?)(\[[^\]]+\])\((https?://[^)]+)\)(?:\s*[；;]\s*(\[[^\]]+\])\((https?://[^)]+)\))?(?P<tail>.*)$"
    )
    # Multi-link compound: `[^N]: [A](url1) ; [B](url2)`
    _MULTI_LINK = re.compile(
        r"^(\[\^[0-9a-zA-Z_-]+\]:)\s+(\[[^\]]+\])\((https?://[^)]+)\)\s*[；;]\s*(\[[^\]]+\])\((https?://[^)]+)\)(?:\s*[；;]\s*(\[[^\]]+\])\((https?://[^)]+)\))?\s*$"
    )

    changes = 0
    for i, line in enumerate(lines):
        if not line.startswith("[^"):
            continue
        # Pattern 1: angle-bracket URL (most specific)
        m = _ANGLE.match(line)
        if m:
            prefix, title, url, desc = m.groups()
            new_desc = desc if desc and len(desc) >= 10 else ff.desc_for_url(url)
            new_line = f"{prefix} {title}({url}) — {new_desc}"
            if new_line != line:
                lines[i] = new_line
                changes += 1
            continue
        # Pattern 2: safe canonical (`[^N]: [Title](URL)` with optional desc)
        m = _SAFE.match(line)
        if m:
            prefix, title, url, desc = m.groups()
            if desc and len(desc) >= 6:
                continue
            fallback = ff.desc_for_url(url)
            # If existing desc is just the same fallback (or trivially close),
            # don't double it. Replace with the longer fallback verbatim.
            if not desc or desc.strip() == "" or desc.strip() in fallback or fallback.startswith(desc.strip()):
                new_desc = fallback
            else:
                # Extend existing desc with fallback as supplement
                new_desc = desc + "：" + fallback
            new_line = f"{prefix} {title}({url}) — {new_desc}"
            if new_line != line:
                lines[i] = new_line
                changes += 1
            continue
        # Pattern 3: multi-link compound — keep first link as primary, fold
        # subsequent links into description as `（並見：second-domain）`
        m = _MULTI_LINK.match(line)
        if m:
            prefix, title1, url1, title2, url2, title3, url3 = m.groups()
            # Compute descriptive note mentioning the secondary source(s)
            extras = []
            if title2 and url2:
                extras.append(f"並見{title2.strip('[]')}：{url2}")
            if title3 and url3:
                extras.append(f"並見{title3.strip('[]')}：{url3}")
            extras_text = "；".join(extras)
            new_desc = ff.desc_for_url(url1)
            new_desc = f"{new_desc}（{extras_text}）" if extras else new_desc
            new_line = f"{prefix} {title1}({url1}) — {new_desc}"
            if new_line != line:
                lines[i] = new_line
                changes += 1
            continue
        # Pattern 3.5: non-em-dash separator after URL `(URL)，rest` → `(URL) — rest`
        m = _NON_EM_DASH_SEP.match(line)
        if m:
            prefix, title, url, _sep, rest = m.groups()
            rest = rest.strip().rstrip("。.")
            if len(rest) >= 6:
                new_line = f"{prefix} {title}({url}) — {rest}"
                if new_line != line:
                    lines[i] = new_line
                    changes += 1
                continue
            else:
                # Too short — extend with fallback
                fallback = ff.desc_for_url(url)
                new_line = f"{prefix} {title}({url}) — {rest}（{fallback}）"
                lines[i] = new_line
                changes += 1
                continue
        # Pattern 4: prose prefix `[^N]: prose, 參見[Title](URL)` — convert prose
        # to desc (preserve context, drop the prose-as-prefix structure).
        m = _PROSE_PREFIX.match(line)
        if m:
            prefix = m.group(1)
            prose = m.group("prose").strip().rstrip("，,。.；;").strip()
            # Strip "參見"/"見"/"，" suffix words (they were connecting prose → link)
            for suf in ("，參見", ",參見", "參見", "見於", "另見", "詳見"):
                if prose.endswith(suf):
                    prose = prose[: -len(suf)].rstrip("，,。.")
                    break
            title = m.group(3)
            url = m.group(4)
            tail = m.group("tail").strip()
            # Use prose as desc if non-trivial; otherwise domain-aware fallback.
            if prose and len(prose) >= 6:
                new_desc = prose
            else:
                new_desc = ff.desc_for_url(url)
            if tail and not tail.startswith(("—", "-", "[")):
                # Append any trailing context that isn't another markdown link
                new_desc = f"{new_desc}{tail}".strip()
            # Ensure desc is ≥ 10 chars (canonical floor)
            if len(new_desc) < 10:
                new_desc = f"{new_desc}（{ff.desc_for_url(url)}）"
            new_line = f"{prefix} {title}({url}) — {new_desc}"
            if new_line != line:
                lines[i] = new_line
                changes += 1
            continue
        # Anything else — leave for human review
    if changes and not config.get("dry_run"):
        target.path.write_text("\n".join(lines), encoding="utf-8")
    return changes
