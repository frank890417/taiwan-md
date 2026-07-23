"""media_richness — depth article 媒體素材門檻 (image hard gate + iframe soft signal).

Rule (2026-05-26 哲宇 directive 升級從 5/25 v1 雙 hard gate → image-only hard gate):
    Image ≥ 2 是 hard gate (WARN — spore-publish 失格 candidate 進 ARTICLE-INBOX EVOLVE)。
    Iframe ≥ 1 降為 INFO signal (鼓勵但不 throttle — REWRITE-PIPELINE 不 routine 補 iframe
    時 8/9~9/9 fail rate 的結構性 gap 證實 iframe hard gate 過嚴，per LESSONS-INBOX
    2026-05-25 entry vc=2)。立體完整呈現仍以 video + image 雙向為理想 baseline。

Trigger context:
    twmd-spore-publish-daily routine 從 SPORE-INBOX 挑 entry 自動 ship 孢子前，
    需要 quality gate 確保被推廣的文章具備靜態圖片立體呈現 (per EDITORIAL §媒體編織
    baseline)。Iframe 缺少不阻擋 ship，但會在 INFO 提示 suggest 補。

Detected:
    - HTML `<iframe ...>` tags in body (count occurrences, ignoring code blocks)
    - Inline `![alt](path)` images
    - Frontmatter `image:` (1 hero)
    Total iframe + total images counted separately.

Skipped paths:
    Same as word_count / image_health: hub pages / translations / spores /
    memory / diary / reports. Only applies to zh-TW knowledge articles.

Threshold:
    - default: min_iframes=1 (INFO only), min_images=2 (WARN — hard gate)
    - image shortage → WARN (spore-publish hard gate 失格 → ARTICLE-INBOX EVOLVE 補)
    - iframe shortage → INFO (signal 鼓勵 REWRITE-PIPELINE 補但不 throttle ship)

Canonical:
    - EDITORIAL.md §媒體編織 baseline (人物類至少 1 iframe + 2 image — iframe 為 ideal 非 hard)
    - SPORE-PUBLISH-PIPELINE.md §Stage 2.4 (image ≥ 2 hard / iframe info-only)
    - REWRITE-PIPELINE.md Step 4.3.6 媒體素材插入 (iframe 補強仍鼓勵)
    - LESSONS-INBOX 2026-05-25 entry vc=2 → 2026-05-26 instrumented (gate softened)
"""

from __future__ import annotations
import os
import re
from typing import Any, Iterator

from ..langs import TRANSLATION_LANGS
from ..types import FileTarget, Severity, Violation


CHECK_NAME = "media-richness"
DIMENSION = "media-quality"
DEFAULT_SEVERITY = Severity.WARN
EDITORIAL_REF = "EDITORIAL.md §媒體編織 + SPORE-PUBLISH-PIPELINE §Stage 1 Quality Gate"
APPLIES_TO = ["zh-TW"]

DEFAULT_MIN_IFRAMES = 1
# 2026-06-07 哲宇 directive (REWRITE v6.8 媒體完整度低標提升)：static 圖 floor 2→3
# (depth 應 hero + ≥2 inline scene-mid，不只 hero+1)。WARN — spore-publish 失格 → EVOLVE 補。
DEFAULT_MIN_IMAGES = 3

# 2026-06-04 哲宇 directive「圖+影片 > 8 或圖文配比更精妙評估」：length-scaled count
# target (INFO advisory) + multimodal nudge。密度 band (floor/ceiling) 由 paragraph-rhythm
# 主責 (同軸 prose-CJK)；本檔負責 count target (denominator-free) + 多模態 (圖 AND 影片)。
DEFAULT_CJK_PER_MEDIA = 1100  # ~1 媒體/1.1k 字 → 7700 字朝 7、長文朝 ≥8 (per directive)
# 官方影片通常存在的題材 (0 iframe 時 nudge 補影片，per EDITORIAL §媒體編織 baseline)。
VIDEO_RICH_CATEGORIES = {"People", "Music", "Nature"}

# `<iframe` followed by whitespace or `>` — accommodates `<iframe src=...>` and
# `<iframe>` and `<iframe\nsrc=...>`. Case-sensitive (HTML iframe spec lowercase).
_RE_IFRAME = re.compile(r"<iframe[\s>]", re.IGNORECASE)
_RE_INLINE_IMAGE = re.compile(r"!\[([^\]]*)\]\(([^)\n]+)\)")
# Strip fenced code blocks before counting iframes (avoid example snippets in docs).
_RE_CODE_BLOCK = re.compile(r"```.*?```", re.DOTALL)
_RE_CJK = re.compile(r"[一-鿿㐀-䶿]")


def _is_excluded_path(path_str: str) -> bool:
    """Skip hub / translations / spores / memory / diary / reports."""
    p = path_str.replace("\\", "/")
    if not p.endswith(".md"):
        return True
    # 語言清單吃 langs.py SSOT，不寫死（2026-07-24：原本停在出生戰役前的五語）。
    for lang in TRANSLATION_LANGS:
        if f"knowledge/{lang}/" in p:
            return True
    if os.path.basename(p).startswith("_"):
        return True
    if "SPORE-BLUEPRINTS/" in p or "SPORE-HARVESTS/" in p:
        return True
    if "memory/" in p or "diary/" in p:
        return True
    if "reports/" in p:
        return True
    if "knowledge/" not in p:
        return True
    return False


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    if _is_excluded_path(str(target.path)):
        return

    options = config or {}
    min_iframes = int(options.get("min_iframes", DEFAULT_MIN_IFRAMES))
    min_images = int(options.get("min_images", DEFAULT_MIN_IMAGES))

    body = target.body if target.body else target.text
    if not body:
        return

    # Strip fenced code blocks so iframe examples in docs don't false-positive.
    body_clean = _RE_CODE_BLOCK.sub("", body)

    iframe_count = len(_RE_IFRAME.findall(body_clean))

    inline_images = len(_RE_INLINE_IMAGE.findall(body_clean))
    fm_image = target.frontmatter.get("image")
    has_fm_image = isinstance(fm_image, str) and fm_image.strip() != ""
    total_images = inline_images + (1 if has_fm_image else 0)

    # ── INFO stats line (always emit) ────────────────────────────────────────
    yield Violation(
        check=CHECK_NAME,
        severity=Severity.INFO,
        message=(
            f"媒體統計：{iframe_count} iframe + {total_images} image "
            f"(門檻 image ≥ {min_images} hard / iframe ≥ {min_iframes} info-only)"
        ),
        editorial_ref=EDITORIAL_REF,
    )

    # ── Threshold (image=WARN hard gate / iframe=INFO signal-only) ───────────
    # 2026-05-26 哲宇 directive: iframe 不列為 hard gate，避免 REWRITE-PIPELINE
    # 不 routine 補 iframe 造成 spore-publish 過嚴 throttle (LESSONS vc=2 instrumented)
    iframe_short = iframe_count < min_iframes
    image_short = total_images < min_images

    if iframe_short:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.INFO,
            message=(
                f"iframe {iframe_count} < {min_iframes}（缺影片素材，soft signal — "
                "立體呈現理想配 video，但不阻擋 spore-publish ship）"
            ),
            line=None,
            snippet=None,
            editorial_ref=EDITORIAL_REF,
            fix_suggestion=(
                "找 YouTube/Vimeo 影片素材嵌 iframe (REWRITE-PIPELINE Step 4.3.6)"
            ),
        )

    if image_short:
        yield Violation(
            check=CHECK_NAME,
            severity=DEFAULT_SEVERITY,
            message=(
                f"靜態圖片不足：image {total_images} < {min_images}"
                " — hard gate (spore-publish 失格 → ARTICLE-INBOX EVOLVE 補)。"
            ),
            line=1,
            snippet="",
            editorial_ref=EDITORIAL_REF,
            fix_suggestion=(
                "(1) 補 PD/CC 圖庫進 public/article-images/ (REWRITE-PIPELINE Step 1.14)"
                " (2) 走 §媒體編織 baseline (hero + ≥1 inline scene-mid)"
            ),
        )

    # ── Length-scaled count target (INFO) — 2026-06-04 哲宇 directive「圖+影片>8」──
    # depth article (≥ 3000 CJK) 才評估 count target；短文不適用。INFO advisory，
    # 密度 floor (硬一點的訊號) 由 paragraph-rhythm R3-FLOOR 主責。
    total_media = total_images + iframe_count
    cjk = len(_RE_CJK.findall(body_clean))
    if cjk >= 3000:
        count_target = max(3, round(cjk / DEFAULT_CJK_PER_MEDIA))
        if total_media < count_target:
            tail = "；長文 (≥7000 字) 朝 圖+影片 ≥ 8" if cjk >= 7000 else ""
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.INFO,
                message=(
                    f"媒體數量 advisory：圖+影片 {total_media} < {count_target} "
                    f"(depth {cjk} 字，~1 媒體/{DEFAULT_CJK_PER_MEDIA} 字{tail})。"
                    " 富媒體範本：設研院 5 圖 / 陳建年 8 (圖+影片) / 天下 6。"
                ),
                line=None,
                snippet=f"media={total_media} target={count_target} cjk={cjk}",
                editorial_ref=EDITORIAL_REF,
                fix_suggestion="補 scene-mid 圖或官方影片 iframe (REWRITE Step 4.3.1 / 4.3.6)",
            )

    # ── Multimodal 影片 floor (WARN) — 2026-06-07 哲宇 directive (v6.8) INFO→WARN ──
    # People/Music/Nature 題材幾乎一定有官方影片 (黃魚鴞 2 / 陳建年 4 範本)；0 iframe 在
    # 跑過 Step 1.9.0 深掃 (Chrome MCP rendered-DOM + YouTube 官方頻道) 後仍 0 = 真的沒有 →
    # 在 research §6 記 negative finding 即可 (WARN advisory 不擋 pre-commit ship)。
    # 影像偏 image-rich 的題材 (機構/設計/產品，如 設研院) 不在此 set，不會被 video-WARN。
    category = target.frontmatter.get("category") if target.frontmatter else None
    if (
        cjk >= 3000
        and iframe_count == 0
        and isinstance(category, str)
        and category.strip() in VIDEO_RICH_CATEGORIES
    ):
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                f"影片素材不足：{category} 題材通常有官方影片可嵌，目前 0 iframe。"
                " 跑過 Step 1.9.0 深掃 (Chrome MCP + YouTube 官方頻道) 仍 0 → research §6 記 negative。"
                " 黃魚鴞 (2 官方影片) / 陳建年 (4) 是 video-rich 立體呈現範本。"
            ),
            line=None,
            snippet=f"category={category} iframe=0",
            editorial_ref=EDITORIAL_REF,
            fix_suggestion="找官方頻道影片嵌 iframe (oembed 驗證官方：youtube.com/oembed?url=...)",
        )
