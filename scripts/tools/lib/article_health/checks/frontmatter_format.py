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
"""

from __future__ import annotations

import re
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
