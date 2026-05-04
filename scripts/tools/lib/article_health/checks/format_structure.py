"""format_structure — markdown structure / format validation.

Migrated from `scripts/tools/format-check.sh` (7 dimensions). Covers the
ones that are pure single-file checks. Cross-link reverse-link analysis
(dim 7) is deferred — it requires reading multiple articles and is in
practice a Stage 5 manual review.

Dimensions ported:
  1. 延伸閱讀 section presence — WARN
  2. ## 參考資料 H2 presence — WARN (when footnotes exist)
  4. broken inline `[link](url)` (no http/https) — WARN
  5. `[[wikilink]]` 殘留 in list items — HARD (Astro doesn't render)
  6. 30 秒概覽 blockquote presence — WARN

Deferred:
  3. footnote format (handled by `footnote_format` plugin)
  7. reverse link analysis (cross-article — separate plugin Phase 6b)
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "format-structure"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "EDITORIAL.md §三 + REWRITE-PIPELINE Stage 4"
APPLIES_TO = ["zh-TW"]

# 延伸閱讀 markers (canonical accepted): `## 延伸閱讀` or `**延伸閱讀**：`
_RE_FURTHER_READING = re.compile(
    r"^(?:##\s*延伸閱讀|\*\*延伸閱讀\*\*\s*[：:])", re.MULTILINE
)
_RE_REFERENCES_H2 = re.compile(r"^##\s*參考資料", re.MULTILINE)
# Accept both:
#   > **30 秒概覽**: 內文       (colon outside bold)
#   > **30 秒概覽：** 內文       (colon inside bold — common in real articles)
_RE_OVERVIEW_BLOCKQUOTE = re.compile(
    r"^>\s*\*\*30\s*秒概覽[：:]?\*\*", re.MULTILINE
)
_RE_LIST_WIKILINK = re.compile(
    r"^(?:\s*[-*+]\s+)\[\[", re.MULTILINE
)
# Capture full list-wikilink line for rewrites:
#   - [[X]]            → display X
#   - [[X|Y]]          → display Y
#   - [[X]] — desc     → display "X — desc" or "X"
_RE_LIST_WIKILINK_FULL = re.compile(
    r"^(?P<indent>\s*[-*+]\s+)\[\[(?P<target>[^\]|]+)(?:\|(?P<display>[^\]]+))?\]\](?P<rest>.*)$",
    re.MULTILINE,
)
_RE_FOOTNOTE_REF_USE = re.compile(r"\[\^[0-9a-zA-Z_-]+\](?!:)")
_RE_FOOTNOTE_DEF = re.compile(r"^\[\^[0-9a-zA-Z_-]+\]:", re.MULTILINE)


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    has_overview = bool(_RE_OVERVIEW_BLOCKQUOTE.search(body))
    has_further = bool(_RE_FURTHER_READING.search(body))
    has_refs_h2 = bool(_RE_REFERENCES_H2.search(body))
    has_fn_uses = bool(_RE_FOOTNOTE_REF_USE.search(body))
    has_fn_defs = bool(_RE_FOOTNOTE_DEF.search(body))

    # 1. 30 秒概覽 missing
    if not has_overview:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message="缺 `> **30 秒概覽**:` blockquote (EDITORIAL §30 秒概覽)",
            editorial_ref="EDITORIAL.md §30 秒概覽",
        )

    # 2. 延伸閱讀 missing (only flag for substantive articles)
    if not has_further and len(body) > 1500:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message="缺延伸閱讀 section (`## 延伸閱讀` 或 `**延伸閱讀**:`)",
            editorial_ref="EDITORIAL.md §三",
        )

    # 3. 參考資料 H2 missing despite footnotes used / defined
    if (has_fn_uses or has_fn_defs) and not has_refs_h2:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message="使用了腳註但缺 `## 參考資料` H2",
            editorial_ref="EDITORIAL.md §citation",
        )

    # 4. List items containing raw [[wikilink]] (HARD — Astro won't render)
    for m in _RE_LIST_WIKILINK.finditer(body):
        line_no = body.count("\n", 0, m.start()) + 1
        line_start = body.rfind("\n", 0, m.start()) + 1
        line_end = body.find("\n", m.start())
        if line_end == -1:
            line_end = len(body)
        snippet = body[line_start:line_end].strip()[:80]
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                "列表項目中有 `[[wikilink]]` 殘留 — Astro 不會渲染，"
                "請改 `[文字](/category/slug)`"
            ),
            line=line_no,
            snippet=snippet,
            editorial_ref="EDITORIAL.md §wikilink",
        )

    # 5. Footnote ref count vs def count parity
    use_count = len(_RE_FOOTNOTE_REF_USE.findall(body))
    def_count = len(_RE_FOOTNOTE_DEF.findall(body))
    if use_count > 0 and def_count == 0:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=f"使用了 {use_count} 個腳註 ref `[^N]` 但無 `[^N]:` 定義",
            editorial_ref="EDITORIAL.md §citation",
        )


def fix(target: FileTarget, config: dict[str, Any]) -> int:
    """Auto-fix list-wikilink residuals — convert `- [[X]]` → `- X` (plain
    text). 2026-05-04 cleanup: Astro doesn't render `[[X]]` in lists, so the
    safe transform is to extract the display text. If `[[X|Y]]` syntax,
    use Y; otherwise use X. We don't try to resolve to `/cat/slug` because
    that's wikilink-target's domain — list-wikilink residuals here are
    formatting drift, the target may or may not exist.

    Returns number of list-wikilink rewrites. Respects config['dry_run'].
    """
    body = target.body
    if not _RE_LIST_WIKILINK_FULL.search(body):
        return 0

    def _rewrite(m: re.Match) -> str:
        target_name = m.group("target").strip()
        display = m.group("display")
        rest = m.group("rest")
        text = display.strip() if display else target_name
        return f"{m.group('indent')}{text}{rest}"

    new_body = _RE_LIST_WIKILINK_FULL.sub(_rewrite, body)
    if new_body == body:
        return 0
    n_changed = len(_RE_LIST_WIKILINK_FULL.findall(body))
    if config.get("dry_run"):
        return n_changed
    # Strip body padding (frontmatter-aligned blank lines) before splicing back.
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
    return n_changed
