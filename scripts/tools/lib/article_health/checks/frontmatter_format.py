"""frontmatter_format — canonical frontmatter formatter checks.

Complements `frontmatter-title`: this plugin checks YAML/frontmatter
structure and formatting, not title prose quality.

Rules mirror REWRITE-PIPELINE Stage 4:
  - zh-TW articles need complete core fields
  - core fields should appear in canonical relative order
  - string scalar fields use single quotes
  - tags use Prettier-stable flow style: `tags: ['a', 'b']`, which may wrap
    into bracketed multiline YAML when the array is long

Severity model:
  - HARD: missing frontmatter, missing required field, invalid field type
  - WARN: formatter style/order issues. `rewrite-stage-4` promotes these
    WARNs to HARD via config so pipeline runs block on bad formatting without
    making every legacy touch in pre-commit impossible.

Auto-fix (--fix):
  Safe HARD violations that can be fixed deterministically:
  - Missing `category` → inferred from file path folder name
  - Missing `featured` → false
  - Missing `author` → 'Taiwan.md'
  - Missing `lastVerified` → copies `date` field value
  - Missing `lastHumanReview` → false
  - `lastHumanReview` not boolean:
      date string (YYYY-MM-DD) → true  (a date implies prior human review)
      empty string / other → false
  - `category` value mismatch with path → corrected to path's folder name
  - `date` not YYYY-MM-DD → attempts to reformat common variants
"""

from __future__ import annotations

import re
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "frontmatter-format"
DIMENSION = "frontmatter"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "REWRITE-PIPELINE.md Stage 4 Frontmatter 完整性"
APPLIES_TO = ["zh-TW"]

REQUIRED_FIELDS = [
    "title",
    "description",
    "date",
    "category",
    "tags",
    "subcategory",
    "author",
    "featured",
    "lastVerified",
    "lastHumanReview",
]

CANONICAL_ORDER = REQUIRED_FIELDS + [
    "researchReport",
    "image",
    "imageAlt",
    "imageCredit",
    "imageLicense",
    "imageSource",
]

SINGLE_QUOTED_SCALARS = {
    "title",
    "description",
    "category",
    "subcategory",
    "author",
}

DATE_FIELDS = {"date", "lastVerified"}
BOOL_FIELDS = {"featured", "lastHumanReview"}


def _line_for_key(lines: list[str], key: str) -> tuple[int, str] | None:
    pattern = re.compile(rf"^{re.escape(key)}\s*:")
    for idx, line in enumerate(lines, start=2):  # line 1 is opening ---
        if pattern.match(line):
            return idx, line
    return None


def _top_level_key(line: str) -> str | None:
    m = re.match(r"^([A-Za-z][\w-]*):", line)
    return m.group(1) if m else None


def _field_value(line: str) -> str:
    return line.split(":", 1)[1].strip()


def _is_single_quoted(value: str) -> bool:
    return len(value) >= 2 and value.startswith("'") and value.endswith("'")


def _is_iso_date(value: str) -> bool:
    return re.fullmatch(r"\d{4}-\d{2}-\d{2}", value) is not None


def _line_snippet(lines: list[str], line_no: int | None) -> str | None:
    if line_no is None:
        return None
    idx = line_no - 2
    if 0 <= idx < len(lines):
        return lines[idx]
    return None


def _tags_uses_flow_array(lines: list[str], tags_line_idx: int, raw: str) -> bool:
    value = _field_value(raw)
    if value.startswith("["):
        return True

    if value:
        return False

    for next_line in lines[tags_line_idx:]:
        stripped = next_line.strip()
        if not stripped:
            continue
        return stripped.startswith("[")
    return False


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    if target.category == "About":
        return

    if not target.frontmatter_raw.strip():
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message="缺 frontmatter 區塊（檔案開頭需以 --- YAML --- 包住 metadata）",
            line=1,
            editorial_ref=EDITORIAL_REF,
        )
        return

    lines = target.frontmatter_raw.splitlines()
    key_lines: dict[str, tuple[int, str]] = {}
    duplicate_keys: dict[str, list[int]] = {}
    ordered_keys: list[tuple[str, int]] = []

    for idx, line in enumerate(lines, start=2):
        key = _top_level_key(line)
        if not key:
            continue
        ordered_keys.append((key, idx))
        if key in key_lines:
            duplicate_keys.setdefault(key, [key_lines[key][0]]).append(idx)
        else:
            key_lines[key] = (idx, line)

    # Required completeness + type checks
    for key in REQUIRED_FIELDS:
        if key not in target.frontmatter:
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=f"frontmatter 缺必要欄位 `{key}`",
                line=1,
                fix_suggestion=f"依 Stage 4 canonical order 補上 `{key}`",
                editorial_ref=EDITORIAL_REF,
            )

    for key, line_numbers in duplicate_keys.items():
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=f"frontmatter 欄位 `{key}` 重複出現",
            line=line_numbers[1],
            snippet=", ".join(str(n) for n in line_numbers),
            fix_suggestion="保留一個 canonical 欄位，移除重複項",
            editorial_ref=EDITORIAL_REF,
        )

    if "tags" in target.frontmatter and not all(
        isinstance(item, str) for item in target.frontmatter.get("tags", [])
    ):
        line = _line_for_key(lines, "tags")
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message="frontmatter `tags` 必須是字串陣列",
            line=line[0] if line else None,
            snippet=line[1] if line else None,
            fix_suggestion="使用 `tags: ['標籤一', '標籤二']`",
            editorial_ref=EDITORIAL_REF,
        )
    elif "tags" in target.frontmatter and not isinstance(
        target.frontmatter.get("tags"), list
    ):
        line = _line_for_key(lines, "tags")
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message="frontmatter `tags` 必須是 YAML array，不可為字串",
            line=line[0] if line else None,
            snippet=line[1] if line else None,
            fix_suggestion="使用 `tags: ['標籤一', '標籤二']`",
            editorial_ref=EDITORIAL_REF,
        )

    for key in BOOL_FIELDS:
        value = target.frontmatter.get(key)
        if key in target.frontmatter and not isinstance(value, bool):
            line = _line_for_key(lines, key)
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=f"frontmatter `{key}` 必須是 boolean true/false",
                line=line[0] if line else None,
                snippet=line[1] if line else None,
                editorial_ref=EDITORIAL_REF,
            )

    category_value = target.frontmatter.get("category")
    if isinstance(category_value, str) and category_value != target.category:
        line = _line_for_key(lines, "category")
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"frontmatter `category` ({category_value}) 必須符合路徑分類"
                f" `{target.category}`"
            ),
            line=line[0] if line else None,
            snippet=line[1] if line else None,
            fix_suggestion=f"category: '{target.category}'",
            editorial_ref=EDITORIAL_REF,
        )

    # Canonical relative order. Unknown/optional fields are allowed, but the
    # canonical fields that do appear must keep REWRITE-PIPELINE order.
    canonical_positions = {key: i for i, key in enumerate(CANONICAL_ORDER)}
    filtered = [
        (key, line_no, canonical_positions[key])
        for key, line_no in ordered_keys
        if key in canonical_positions
    ]
    last_pos = -1
    last_key = ""
    for key, line_no, pos in filtered:
        if pos < last_pos:
            expected = " / ".join(CANONICAL_ORDER)
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=(
                    f"frontmatter 欄位順序錯：`{key}` 出現在 `{last_key}` 之後"
                    "（不符合 Stage 4 canonical order）"
                ),
                line=line_no,
                snippet=_line_snippet(lines, line_no),
                fix_suggestion=f"核心欄位順序應為：{expected}",
                editorial_ref=EDITORIAL_REF,
            )
            break
        last_pos = pos
        last_key = key

    # Style checks: quote scalar strings, keep date/bool/path values unquoted,
    # and force tags into Prettier-stable flow array style.
    for key in SINGLE_QUOTED_SCALARS:
        line = _line_for_key(lines, key)
        if not line:
            continue
        line_no, raw = line
        value = _field_value(raw)
        if not _is_single_quoted(value):
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"frontmatter `{key}` 應使用單引號 scalar",
                line=line_no,
                snippet=raw,
                fix_suggestion=f"{key}: '<value>'",
                editorial_ref=EDITORIAL_REF,
            )

    for key in DATE_FIELDS:
        line = _line_for_key(lines, key)
        if not line:
            continue
        line_no, raw = line
        value = _field_value(raw).strip("'\"")
        if not _is_iso_date(value):
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=f"frontmatter `{key}` 必須是 YYYY-MM-DD",
                line=line_no,
                snippet=raw,
                editorial_ref=EDITORIAL_REF,
            )
        elif _field_value(raw).startswith(("'", '"')):
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"frontmatter `{key}` 日期不需加引號",
                line=line_no,
                snippet=raw,
                fix_suggestion=f"{key}: {value}",
                editorial_ref=EDITORIAL_REF,
            )

    for key in BOOL_FIELDS:
        line = _line_for_key(lines, key)
        if not line:
            continue
        line_no, raw = line
        value = _field_value(raw)
        if value not in {"true", "false"}:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"frontmatter `{key}` 應使用未加引號的 true/false",
                line=line_no,
                snippet=raw,
                fix_suggestion=f"{key}: false",
                editorial_ref=EDITORIAL_REF,
            )

    tags_line = _line_for_key(lines, "tags")
    if tags_line:
        line_no, raw = tags_line
        if not _tags_uses_flow_array(lines, line_no - 1, raw):
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message="frontmatter `tags` 應使用 flow array（可由 Prettier 換行）",
                line=line_no,
                snippet=raw,
                fix_suggestion="tags: ['標籤一', '標籤二']",
                editorial_ref=EDITORIAL_REF,
            )
        elif re.search(r"[\[\],]\s*[^'\]\s,][^,\]]*", raw):
            # Best-effort style check: tags should be quoted strings in flow
            # arrays. YAML parser already handles correctness; this catches
            # unquoted tag style.
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message="frontmatter `tags` 內每個 tag 建議使用單引號",
                line=line_no,
                snippet=raw,
                fix_suggestion="tags: ['標籤一', '標籤二']",
                editorial_ref=EDITORIAL_REF,
            )


# ── Auto-fix helpers ──────────────────────────────────────────────────────────


def _insert_after_key(fm_text: str, anchor_key: str, new_line: str) -> str:
    """Insert `new_line` after the line that contains `anchor_key: ...`.

    If anchor_key is not found, appends to end of frontmatter text.
    Handles multiline YAML flow arrays on the anchor key line.
    Ensures the line before the insertion point ends with newline so the
    inserted line starts on its own line even when the anchor is the last
    line of the frontmatter block (which has no trailing newline per the
    regex capture in loader.py).
    """
    lines = fm_text.splitlines(keepends=True)
    insert_idx = len(lines)  # default: append at end
    i = 0
    while i < len(lines):
        if re.match(rf"^{re.escape(anchor_key)}\s*:", lines[i]):
            # Skip multiline flow arrays (tags: [\n  ...\n])
            j = i
            if "[" in lines[j] and "]" not in lines[j]:
                while j < len(lines) - 1 and "]" not in lines[j]:
                    j += 1
            insert_idx = j + 1
            break
        i += 1
    # Ensure the line before insertion ends with \n so the new line starts
    # on its own line (the last line of frontmatter_raw has no \n per loader).
    if insert_idx > 0 and not lines[insert_idx - 1].endswith("\n"):
        lines[insert_idx - 1] = lines[insert_idx - 1] + "\n"
    lines.insert(insert_idx, new_line if new_line.endswith("\n") else new_line + "\n")
    return "".join(lines)


def _replace_field_value(fm_text: str, key: str, new_value: str) -> str:
    """Replace `key: <anything>` with `key: new_value` (single-line fields only)."""
    return re.sub(
        rf"^({re.escape(key)}\s*:).*$",
        rf"\1 {new_value}",
        fm_text,
        flags=re.MULTILINE,
    )


def _reformat_date(raw_value: str) -> str | None:
    """Try common date variants → YYYY-MM-DD. Returns None if unrecognisable.

    Also handles datetime objects (from PyYAML parsing) and ISO 8601 datetimes
    like `2026-03-24 23:00:00+00:00` or `2026-03-24T23:00:00Z`.
    """
    # PyYAML may parse a YAML timestamp into a datetime object
    if hasattr(raw_value, "strftime"):
        return raw_value.strftime("%Y-%m-%d")  # type: ignore[union-attr]
    v = str(raw_value).strip().strip("'\"")
    if re.fullmatch(r"\d{4}-\d{2}-\d{2}", v):
        return v
    # YYYY-MM-DD HH:MM:SS... (datetime with optional timezone)
    m = re.match(r"(\d{4}-\d{2}-\d{2})[\sT]\d{2}:\d{2}", v)
    if m:
        return m.group(1)
    # YYYY/MM/DD
    m = re.fullmatch(r"(\d{4})/(\d{2})/(\d{2})", v)
    if m:
        return f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
    # MM/DD/YYYY
    m = re.fullmatch(r"(\d{1,2})/(\d{1,2})/(\d{4})", v)
    if m:
        return f"{m.group(3)}-{m.group(1).zfill(2)}-{m.group(2).zfill(2)}"
    return None


def fix(target: FileTarget, config: dict[str, Any]) -> int:
    """Auto-fix safe HARD violations in frontmatter.

    Returns the number of changes applied (0 = nothing changed).
    Writes the corrected file in place (unless config['dry_run'] is True).
    """
    if target.lang != "zh-TW":
        return 0
    if target.category == "About":
        return 0
    if not target.frontmatter_raw.strip():
        return 0  # missing frontmatter entirely — not safe to auto-create

    fm = target.frontmatter
    fm_text = target.frontmatter_raw  # mutable working copy (str)
    changes = 0
    dry_run = bool(config.get("dry_run", False))

    # ── 1. Fix `date` format ──────────────────────────────────────────────────
    # Check the RAW text value (not PyYAML-parsed), because PyYAML turns
    # "2026-03-24T23:00:00Z" into a datetime object whose .strftime gives
    # "2026-03-24" (looks fine) while the actual file still says "T23:00:00Z".
    raw_date = fm.get("date")
    if raw_date is not None:
        lines_fm = fm_text.splitlines()
        date_line = _line_for_key(lines_fm, "date")
        raw_text_val = _field_value(date_line[1]).strip("'\"") if date_line else ""
        if not _is_iso_date(raw_text_val):
            fixed = _reformat_date(raw_date)  # type: ignore[arg-type]
            if fixed:
                fm_text = _replace_field_value(fm_text, "date", fixed)
                fm = {**fm, "date": fixed}
                changes += 1

    # ── 2. Fix `category` value mismatch with path ───────────────────────────
    path_category = target.category  # derived from folder name (authoritative)
    current_category = fm.get("category")
    if (
        isinstance(current_category, str)
        and current_category != path_category
        and path_category
    ):
        fm_text = _replace_field_value(fm_text, "category", f"'{path_category}'")
        fm = {**fm, "category": path_category}
        changes += 1

    # ── 3. Fix bool fields not boolean ───────────────────────────────────────
    lhr = fm.get("lastHumanReview")
    if "lastHumanReview" in fm and not isinstance(lhr, bool):
        # Date string → true (a date means someone reviewed it)
        lhr_str = str(lhr).strip().strip("'\"")
        new_bool = "true" if _is_iso_date(lhr_str) and lhr_str else "false"
        fm_text = _replace_field_value(fm_text, "lastHumanReview", new_bool)
        fm = {**fm, "lastHumanReview": new_bool == "true"}
        changes += 1

    feat = fm.get("featured")
    if "featured" in fm and not isinstance(feat, bool):
        # Typo correction: "fales"→false, "treu"→true, unrecognised→false
        feat_str = str(feat).strip().lower().strip("'\"")
        new_bool = "true" if feat_str.startswith("t") else "false"
        fm_text = _replace_field_value(fm_text, "featured", new_bool)
        fm = {**fm, "featured": new_bool == "true"}
        changes += 1

    # ── 4. Add missing required fields ───────────────────────────────────────
    # Insertion order respects canonical order where possible.

    if "category" not in fm and path_category:
        # Insert after `date` (or before `tags` if date absent)
        anchor = "date" if "date" in fm else "title"
        fm_text = _insert_after_key(fm_text, anchor, f"category: '{path_category}'")
        fm = {**fm, "category": path_category}
        changes += 1

    if "author" not in fm:
        anchor = "subcategory" if "subcategory" in fm else (
            "category" if "category" in fm else "tags"
        )
        fm_text = _insert_after_key(fm_text, anchor, "author: 'Taiwan.md'")
        fm = {**fm, "author": "Taiwan.md"}
        changes += 1

    if "featured" not in fm:
        anchor = "author" if "author" in fm else "subcategory"
        fm_text = _insert_after_key(fm_text, anchor, "featured: false")
        fm = {**fm, "featured": False}
        changes += 1

    if "lastVerified" not in fm:
        date_val = fm.get("date", "")
        if date_val:
            val = _reformat_date(date_val) or str(date_val).strip().strip("'\"")
        else:
            val = "2026-01-01"
        anchor = "featured" if "featured" in fm else "author"
        fm_text = _insert_after_key(fm_text, anchor, f"lastVerified: {val}")
        fm = {**fm, "lastVerified": val}
        changes += 1

    if "lastHumanReview" not in fm:
        anchor = "lastVerified" if "lastVerified" in fm else "featured"
        fm_text = _insert_after_key(fm_text, anchor, "lastHumanReview: false")
        fm = {**fm, "lastHumanReview": False}
        changes += 1

    if not changes:
        return 0

    if dry_run:
        return changes

    # Reconstruct full file: --- + fixed frontmatter + --- + body
    new_text = "---\n" + fm_text + "\n---\n" + target.text[target.body_text_offset:]
    Path(target.path).write_text(new_text, encoding="utf-8")
    return changes
