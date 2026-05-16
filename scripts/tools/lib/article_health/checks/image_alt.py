"""image_alt — inline image alt-text quality.

Per TOOL-INVENTORY §🕳️ P0 缺口 "圖片 alt 文字品質" (2026-05-16 reclassified)。
跟 image-health plugin 互補：image-health 是 count gate + file existence；
本 plugin 是 alt text **品質** gate.

Dimensions:
  1. Empty alt — `![](src)` 完全沒 alt
  2. Generic alt — alt 是 "image" / "圖片" / "photo" / "圖" 等空洞詞
  3. Filename alt — alt 直接是 filename（如 `taipei-101.jpg`）= 沒用心寫

Severity: WARN — soft launch (legacy 文章大量缺好 alt，hard 會擋住 typo PR).
Rewrite-stage-4 profile 可以升 HARD 對新文章強制達標.

Skip:
  - Hub pages (knowledge/{Category}/_*.md)
  - 圖片來源 / 延伸閱讀 / 參考資料 sections（alt 在這些段是補充說明，標準不同）

Canonical:
  - EDITORIAL.md §圖片 alt 規範（待 ship — 暫時 inline 在本 plugin）
  - REWRITE-PIPELINE §Stage 4.3 媒體插入 — 補 alt 品質 sub-gate
  - 觸發：reports/immune-score-redesign-2026-05-16.md §2.C Phase 4
"""

from __future__ import annotations
import os
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "image-alt"
DIMENSION = "media-quality"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "TOOL-INVENTORY §🕳️ P0 + REWRITE-PIPELINE §Stage 4.3 媒體插入（alt 品質補丁）"
APPLIES_TO = ["zh-TW"]

_RE_IMAGE = re.compile(r"!\[([^\]]*)\]\(([^)\n]+)\)")

# Generic / low-signal alt patterns（lowercase 化後比對）
_GENERIC_ALT_PATTERNS = {
    "image", "圖片", "圖", "photo", "picture", "img", "screenshot",
    "封面", "封面圖", "示意圖", "示意",
}

# Filename patterns: ends with image extension
_RE_FILENAME_ALT = re.compile(
    r".+\.(jpg|jpeg|png|gif|webp|svg|avif|heic)$",
    re.IGNORECASE,
)


def _is_excluded_path(path: str) -> bool:
    """Hub pages don't need alt quality gate."""
    if "/_" in path or path.endswith("_index.md"):
        return True
    if "knowledge/" not in path:
        return True
    return False


def _is_in_image_sources_section(body: str, image_pos: int) -> bool:
    """Skip alt check inside `## 圖片來源` section (alt 是描述性 captions)."""
    section_start = body.rfind("## 圖片來源", 0, image_pos)
    if section_start < 0:
        return False
    # Find next ## after the 圖片來源 section
    next_h2 = body.find("\n## ", section_start + 1)
    if next_h2 < 0:
        next_h2 = len(body)
    return section_start < image_pos < next_h2


def _classify_alt(alt: str) -> str | None:
    """Return classification or None if alt looks OK.

    Categories:
      - "empty" — alt is blank
      - "generic" — alt is a low-signal generic term
      - "filename" — alt is just a filename
    """
    alt_stripped = alt.strip()
    if not alt_stripped:
        return "empty"

    alt_lower = alt_stripped.lower()
    if alt_lower in _GENERIC_ALT_PATTERNS:
        return "generic"

    if _RE_FILENAME_ALT.match(alt_stripped):
        return "filename"

    # Very short alt (< 4 chars after stripping punctuation) — likely uninformative
    cleaned = re.sub(r"[、，。.,\s]", "", alt_stripped)
    if len(cleaned) < 4:
        return "generic"

    return None


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Detect inline image alt-text quality issues."""
    if _is_excluded_path(str(target.path)):
        return

    body = target.body or target.text
    if not body:
        return

    issues = {"empty": 0, "generic": 0, "filename": 0}
    samples = {"empty": [], "generic": [], "filename": []}

    for match in _RE_IMAGE.finditer(body):
        # Skip if inside 圖片來源 section
        if _is_in_image_sources_section(body, match.start()):
            continue

        alt = match.group(1)
        src = match.group(2)

        # Skip external icons / very tiny embedded (heuristic: skip if src looks
        # like an inline svg or data URI which often don't need alt)
        if src.startswith(("data:", "javascript:")):
            continue

        kind = _classify_alt(alt)
        if kind:
            issues[kind] += 1
            if len(samples[kind]) < 3:
                line_no = body.count("\n", 0, match.start()) + 1 + target.body_pad_lines
                snippet = match.group(0)[:80]
                samples[kind].append((line_no, snippet))

    total = sum(issues.values())
    if total == 0:
        return

    detail_parts = []
    if issues["empty"]:
        detail_parts.append(f"empty alt {issues['empty']}")
    if issues["generic"]:
        detail_parts.append(f"generic alt {issues['generic']}（'圖片' / 'image' 等空洞詞）")
    if issues["filename"]:
        detail_parts.append(f"filename alt {issues['filename']}（alt 直接抄 filename）")

    # Emit per-kind violations with samples
    for kind, count in issues.items():
        if count == 0:
            continue
        for line_no, snippet in samples[kind]:
            kind_msg = {
                "empty": "圖片缺 alt — `![](...)` 對 screen reader / SEO 不友善",
                "generic": "alt 太空洞 — '圖片' / 'image' 等通用詞沒語意",
                "filename": "alt 直接抄 filename — 描述圖片內容，不是檔名",
            }[kind]
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=kind_msg,
                line=line_no,
                snippet=snippet,
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "alt 寫一句描述圖片內容的話：人物 + 場景 + 動作 或 物件 + 特徵。"
                    " 範例：`![黑冠麻鷺站在校園草地上低頭覓食](...)`"
                    " 不要：`![圖片](...)` / `![bird.jpg](...)`"
                ),
            )
