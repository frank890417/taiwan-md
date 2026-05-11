"""word_count — 合格 depth article 最低 CJK 字數 gate.

Rule（觀察者 mandate 2026-05-10 sad-shockley）：合格 depth article ≥ 4500 CJK chars。
低於門檻 = 虎頭蛇尾風險，後半部沒重點 = 不合格 depth article。

Detected:
    Body text 的 CJK 字元計數（排除 frontmatter / fenced code / inline code /
    image markdown / footnote definitions / footnote references / HTML tags）。

Skipped paths:
    - Hub pages (knowledge/{Category}/_*.md)
    - Translation files (knowledge/{en,ja,ko,es,fr}/)
    - Spore artifacts (docs/factory/SPORE-BLUEPRINTS|HARVESTS/)
    - Memory / diary / research reports

Threshold:
    - default: 4500 CJK chars
    - WARN initially（soft-launch — many legacy articles 不到 4500 字）
    - rewrite-stage-4 profile 經 severity_override 升 HARD（new articles 強制達標）

Canonical:
    - REWRITE-PIPELINE.md §Hard Gate Inventory (Stage 3 / 4)
    - REWRITE-PIPELINE.md §Stage 2 Step E 寫正文（按敘事弧線）
    - 觸發脈絡：2026-05-10 sad-shockley session 觀察者指出
      [knowledge/Technology/台灣無人機產業.md](../../../../../knowledge/Technology/台灣無人機產業.md)
      EVOLVE 後仍 3273 字 = 虎頭蛇尾、後半部沒重點 → 升 canonical 反射為 plugin gate。
"""

from __future__ import annotations
import os
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "word-count"
DIMENSION = "depth"
# Soft-launch: WARN initially. Existing articles below 4500 chars are legacy
# (estimated 100+ files). Promote to HARD via rewrite-stage-4 severity_override
# (per chronicle-lead pattern) — new articles 強制達標，legacy 慢慢 heal。
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "REWRITE-PIPELINE.md §Stage 2 Step E 寫正文 + REWRITE-PIPELINE Hard Gate (depth ≥ 4500 字)"
APPLIES_TO = ["zh-TW"]

DEFAULT_MIN_CHARS = 4500


# ── Body text scrubbing ──────────────────────────────────────────────────────

_RE_CODE_BLOCK = re.compile(r"```.*?```", re.DOTALL)
_RE_INLINE_CODE = re.compile(r"`[^`]*`")
_RE_IMAGE = re.compile(r"!\[[^\]]*\]\([^\)]+\)")
# Footnote reference [^N] — keep but don't count
_RE_FOOTNOTE_REF = re.compile(r"\[\^[^\]]+\]")
# Footnote definition lines [^N]: ... (whole line)
_RE_FOOTNOTE_DEF_LINE = re.compile(r"^\[\^[^\]]+\]:.*$", re.MULTILINE)
_RE_HTML_TAG = re.compile(r"<[^>]+>")
# CJK Unified Ideographs (BMP + Extension A); excludes punctuation
_RE_CJK = re.compile(r"[一-鿿㐀-䶿]")


def _count_cjk_in_body(body: str) -> int:
    """Count CJK chars in body, scrubbing structural / metadata regions."""
    text = body
    text = _RE_CODE_BLOCK.sub("", text)
    text = _RE_INLINE_CODE.sub("", text)
    text = _RE_IMAGE.sub("", text)
    text = _RE_FOOTNOTE_DEF_LINE.sub("", text)
    text = _RE_FOOTNOTE_REF.sub("", text)
    text = _RE_HTML_TAG.sub("", text)
    return len(_RE_CJK.findall(text))


def _is_excluded_path(path_str: str) -> bool:
    """Skip hub pages / translations / spores / memory / diary / reports.

    Path patterns use substring match (not anchored to leading /) so both
    absolute paths and repo-relative paths (e.g. `knowledge/Technology/X.md`)
    are handled consistently.
    """
    p = path_str.replace("\\", "/")
    if not p.endswith(".md"):
        return True
    # Translation files (knowledge/en|ja|ko|es|fr/...)
    for lang in ("en", "ja", "ko", "es", "fr"):
        if f"knowledge/{lang}/" in p:
            return True
    # Hub pages — knowledge/{Category}/_X.md
    if os.path.basename(p).startswith("_"):
        return True
    # Spore artifacts
    if "SPORE-BLUEPRINTS/" in p or "SPORE-HARVESTS/" in p:
        return True
    # Memory / diary / reports / research
    if "memory/" in p or "diary/" in p:
        return True
    if "reports/" in p:
        return True
    # Only apply to zh-TW knowledge articles
    if "knowledge/" not in p:
        return True
    return False


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Detect short articles failing depth threshold.

    Always emits 1 INFO line with the CJK count (so users see stats even when
    the article passes the threshold; 哲宇 mandate 2026-05-11 kind-mirzakhani
    — 基礎指標每次都要顯示，不只 fail 才知道字數). Below threshold yields a
    WARN/HARD violation per profile severity.
    """
    if _is_excluded_path(str(target.path)):
        return

    min_chars = int((config or {}).get("min_chars", DEFAULT_MIN_CHARS))

    # Use FileTarget.body if loader split frontmatter; fallback to manual split
    body = target.body if target.body else target.text
    if not body and target.text and target.text.startswith("---"):
        end = target.text.find("---", 3)
        if end > 0:
            body = target.text[end + 3:]
        else:
            body = target.text

    if not body:
        return

    cjk = _count_cjk_in_body(body)

    # ── INFO stats line (always emit, regardless of pass/fail) ────────────────
    # 哲宇 mandate 2026-05-11: 檢查時要輸出基礎文章狀態分析（字數等）
    pct = (cjk / min_chars) * 100 if min_chars > 0 else 0
    yield Violation(
        check=CHECK_NAME,
        severity=Severity.INFO,
        message=f"字數統計：{cjk} CJK chars ({pct:.0f}% of {min_chars} 門檻)",
        editorial_ref=EDITORIAL_REF,
    )

    if cjk >= min_chars:
        return

    deficit = min_chars - cjk
    yield Violation(
        check=CHECK_NAME,
        severity=DEFAULT_SEVERITY,
        message=(
            f"文章篇幅不足 (depth threshold)：{cjk} CJK chars < {min_chars} 門檻"
            f"（缺 {deficit} 字 = {deficit / min_chars * 100:.0f}%）"
            " — 虎頭蛇尾風險，後半部可能沒重點"
        ),
        line=1,
        snippet="",
        editorial_ref=EDITORIAL_REF,
        fix_suggestion=(
            f"目前 {cjk} 字，需補 {deficit} 字達 {min_chars}。檢查："
            " (1) §產業鏈 / §結構性段落是否流於名單列舉而非場景敘事；"
            " (2) 後半部是否充分反差 + 引語 + 數字 + 交叉視角；"
            " (3) 結尾是否罐頭收（per EDITORIAL §結尾的四種模式）；"
            " (4) 走 REWRITE-PIPELINE Evolution 模式 全文重寫，舊文當素材庫不當骨架。"
        ),
    )
