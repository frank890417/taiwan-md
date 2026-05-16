"""seo_meta — frontmatter title + description SEO health.

Per TOOL-INVENTORY §🕳️ P0 缺口 "SEO metadata 品質" (2026-05-16 reclassified)。
跟 frontmatter-title plugin 互補：frontmatter-title 是 EDITORIAL §Title 五原則
（敘事品質）；本 plugin 是 SEO 物理長度 + 樣板偵測 gate.

Dimensions:
  1. Title length — Google SERP 截斷在 ~600px (約 55-60 半形 / 28-30 全形 chars)
     - too_short: < 20 chars (太弱抓不到關鍵字)
     - too_long: > 60 chars (SERP 截斷)
  2. Description length — Google snippet 截斷 ~155-160 chars
     - too_short: < 80 chars (snippet 留白 = sharpness 不足)
     - too_long: > 200 chars (截斷後失去結尾語意)
  3. Template description — description 開頭是「Taiwan.md / 開源台灣 / 台灣的」等品牌詞
     = description 浪費在重述 brand，沒用在「為什麼這篇值得點」
  4. Description = title 重複 — frontmatter title 跟 description 字面一致 = 浪費 SERP 空間

Severity: WARN — soft launch (legacy 大量 description 沒 sharpen).
Rewrite-stage-4 profile 升 HARD 對新文章強制達標.

Skip:
  - Hub pages (knowledge/{Category}/_*.md) — 標準不同
  - 非 zh-TW 文章 — 翻譯版的 frontmatter 由 sync layer 處理

Canonical:
  - EDITORIAL.md §Title 五原則（敘事品質）+ §Description 四原則（physical SEO 品質）
  - REWRITE-PIPELINE §Stage 4 Frontmatter 完整性
  - 觸發：reports/immune-score-redesign-2026-05-16.md §2.C Phase 5
  - 對應 LESSONS-INBOX neural circuit "Description ≠ 30 秒概覽複寫 (2026-04-18 ε)"
"""

from __future__ import annotations
import re
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "seo-meta"
DIMENSION = "seo"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "EDITORIAL.md §Description 四原則（長度 120-160 字 canonical）+ TOOL-INVENTORY §🕳️ P0"
APPLIES_TO = ["zh-TW"]

# Thresholds — measured in CJK char count (per EDITORIAL §Description 四原則).
# Astro template adds " | Taiwan.md" suffix to frontmatter title, so the
# frontmatter title itself can be short (topic name like "交工樂隊" = 4 chars).
# Only catch truly malformed titles (< 3 chars = likely empty/placeholder).
TITLE_MIN_CJK = 3
TITLE_MAX_CJK = 35
# Description canonical = 120-160 字; tolerance band 100-180 (避免 over-noise).
DESC_MIN_CJK = 100
DESC_MAX_CJK = 180

# Brand prefix patterns（description 開頭如果是這些就 = 浪費 SERP 開頭）
_BRAND_PREFIX_PATTERNS = [
    r"^Taiwan\.md\s*",
    r"^開源台灣\s*",
    r"^台灣的開源\s*",
    r"^這篇\s*(文章|是)\s*",  # description 不該從 meta 自我描述開始
]


def _is_excluded_path(path: str) -> bool:
    """Hub pages 跟非 zh-TW 文章 skip."""
    if "/_" in path:
        return True
    if path.endswith("_index.md"):
        return True
    if "knowledge/" not in path:
        return True
    # Translation files
    for prefix in ("knowledge/en/", "knowledge/ja/", "knowledge/ko/",
                   "knowledge/es/", "knowledge/fr/"):
        if prefix in path:
            return True
    return False


_RE_CJK_CHAR = re.compile(r"[一-鿿㐀-䶿]")


def _cjk_count(s: str) -> int:
    """Count CJK chars only — aligns with EDITORIAL §Description「字數」canonical
    (120-160 字 per canonical means CJK characters, not mixed-script chars)."""
    return len(_RE_CJK_CHAR.findall(s))


def _looks_like_brand_prefix(desc: str) -> str | None:
    """Return matched brand pattern if desc starts with brand-y filler."""
    for pat in _BRAND_PREFIX_PATTERNS:
        m = re.match(pat, desc)
        if m:
            return m.group(0).strip()
    return None


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    """Detect SEO metadata length + template issues."""
    if _is_excluded_path(str(target.path)):
        return

    fm = target.frontmatter or {}
    title = (fm.get("title") or "").strip()
    description = (fm.get("description") or "").strip()

    # ── INFO stats line（always emit — per word_count plugin pattern） ──────
    t_cjk = _cjk_count(title) if title else 0
    d_cjk = _cjk_count(description) if description else 0
    yield Violation(
        check=CHECK_NAME,
        severity=Severity.INFO,
        message=f"frontmatter SEO: title={t_cjk}字 description={d_cjk}字 (canonical 120-160字)",
        editorial_ref=EDITORIAL_REF,
    )

    # ── Title checks ─────────────────────────────────────────────────────────
    if title:
        if t_cjk < TITLE_MIN_CJK:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"title 過短 — {t_cjk}字，可能是 placeholder 或 frontmatter typo",
                line=1,
                snippet=title[:80],
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "title 至少要能識別主題。檢查 frontmatter 是否有 typo / 漏填。"
                    " Astro template 會自動加 ' | Taiwan.md' suffix，所以 frontmatter title 短主題名（4-10字）是 OK 的。"
                ),
            )
        elif t_cjk > TITLE_MAX_CJK:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"title 太長 — {t_cjk}字，Google SERP 截斷在 ~30 全形",
                line=1,
                snippet=title[:80],
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "Google 顯示 title 約 30 全形 chars。"
                    " 把核心關鍵字 / 矛盾放前 30，後段可截。"
                    " per EDITORIAL §Title 五原則。"
                ),
            )

    # ── Description checks ───────────────────────────────────────────────────
    if description:
        if d_cjk < DESC_MIN_CJK:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"description 太短 — {d_cjk}字 < canonical 下限 {DESC_MIN_CJK}",
                line=1,
                snippet=description[:100],
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "description 是 SERP snippet。太短 = 沒鋪事實 + 沒矛盾 = sharpness 不足。"
                    " EDITORIAL §Description 三段結構：具體 scene ~40字 + 軌跡 ~40字 + 核心矛盾 ending ~40字。"
                ),
            )
        elif d_cjk > DESC_MAX_CJK:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"description 太長 — {d_cjk}字 > canonical 上限 {DESC_MAX_CJK} (canonical 120-160字，容忍至 180)",
                line=1,
                snippet=description[:120] + "…",
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "Google snippet ~160 字截斷後失去結尾語意。"
                    " Description 不是 30 秒概覽複寫 — 30 秒概覽（blockquote）給已點進來的讀者預算 100-200 字鋪事實；"
                    " description 給還沒點的讀者，預算 120-160 字 sharpness。兩者不能互相複寫。"
                    " 對應 LESSONS-INBOX neural circuit 「Description ≠ 30 秒概覽複寫 (2026-04-18 ε)」。"
                ),
            )

        # Brand-prefix waste
        brand_match = _looks_like_brand_prefix(description)
        if brand_match:
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message=f"description 開頭是品牌詞「{brand_match}」— 浪費 SERP 開頭",
                line=1,
                snippet=description[:80],
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "SERP description 開頭是讀者決定要不要點的關鍵。"
                    " 開頭給「具體 scene / 數字 / 矛盾」，不是「Taiwan.md / 這篇文章」這種 meta 詞。"
                ),
            )

        # Title-vs-description duplication
        if title and description and (title in description or description in title):
            yield Violation(
                check=CHECK_NAME,
                severity=DEFAULT_SEVERITY,
                message="description 跟 title 高度重複 — 浪費 SERP 空間",
                line=1,
                snippet=description[:100],
                editorial_ref=EDITORIAL_REF,
                fix_suggestion=(
                    "title 是釣鉤，description 是補完。重複 = 雙倍釣鉤沒補完 = SERP 視覺浪費。"
                    " description 補 title 沒講完的另一面：時間 / 地點 / 數字 / 矛盾 / 軌跡。"
                ),
            )
