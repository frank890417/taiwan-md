"""image_health — article image references + frontmatter coherence + count gate.

Migrated from `scripts/tools/article-image-health.sh` (REWRITE-PIPELINE
Stage 4.5f hard gate per DNA #30).

Dimensions:
  1. inline `![alt](path)` references — `path` must exist on disk
  2. frontmatter `image:` — file must exist
  3. external hot-link detection — http/https URLs not under
     `/article-images/` or `https://upload.wikimedia.org/...`
     (canonical CC sources allowed)
  4. ## 圖片來源 section presence (when CC images used)
  5. **image count gate (added 2026-05-11 kind-mirzakhani per 哲宇 callout)** —
     depth article 理想 hero + 1-2 scene-mid = 2-3 張，min_images=3 預設
     soft-launch WARN（legacy heal），rewrite-stage-4 profile severity_override
     升 HARD。觸發：NMTH 文章 ship 後哲宇 callout「為什麼圖片用那麼少」揭露
     Step 4.3.1 三段敘事節奏沒儀器化進 article-health（DNA #15 反覆浮現要儀器化
     第 N 次驗證）。

Severity: HARD for missing files / hot-links, WARN for missing 圖片來源 section,
configurable WARN/HARD for min-count gate via options.
"""

from __future__ import annotations
import os
import re
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation


CHECK_NAME = "image-health"
DIMENSION = "media"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "REWRITE-PIPELINE Stage 1 Step 1.14 + Stage 4 Step 4.3 / DNA #30"
APPLIES_TO = ["*"]

# Defaults — overridable via profile options
DEFAULT_MIN_IMAGES = 3
# Soft-launch WARN for both 0-image and 1-2-image cases (mirrors word-count
# pattern: legacy 文章下不到門檻不 hard-block pre-commit，避免改 typo 也被擋；
# rewrite-stage-4 profile severity_override 升 HARD 對 new article 強制達標)。
DEFAULT_MIN_IMAGES_SEVERITY = "warn"  # rewrite-stage-4 promotes to "hard"
DEFAULT_ZERO_IMAGES_SEVERITY = "warn"  # rewrite-stage-4 promotes to "hard"

# Markdown image syntax: ![alt](src)
_RE_INLINE_IMAGE = re.compile(r"!\[([^\]]*)\]\(([^)\n]+)\)")
_RE_IMAGE_SOURCES_H2 = re.compile(r"^##\s*圖片來源", re.MULTILINE)


def _is_local_path(src: str) -> bool:
    """Local image: starts with / or article-images/ or no scheme."""
    return not src.startswith(("http://", "https://"))


def _is_allowed_external(src: str) -> bool:
    """Allow Wikimedia / commons (canonical CC sources)."""
    allowed_prefixes = (
        "https://upload.wikimedia.org/",
        "https://commons.wikimedia.org/",
    )
    return src.startswith(allowed_prefixes)


def _is_excluded_from_count_gate(path_str: str) -> bool:
    """Skip min-count gate for hub / translations / spores / meta files.

    Mirrors word_count._is_excluded_path. Path patterns use substring match
    so both absolute and repo-relative paths are handled.
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


def _parse_severity(value: Any, fallback: Severity) -> Severity:
    if isinstance(value, Severity):
        return value
    if not value:
        return fallback
    try:
        return Severity(str(value).lower())
    except ValueError:
        return fallback


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    body = target.body
    repo_root = Path.cwd()
    public_root = repo_root / "public"
    options = config or {}

    # ── Pre-compute counts (used for stats INFO + min gate) ──────────────────
    inline_matches = list(_RE_INLINE_IMAGE.finditer(body))
    inline_count = len(inline_matches)
    fm_image = target.frontmatter.get("image")
    has_fm_image = isinstance(fm_image, str) and fm_image.strip() != ""
    total_images = inline_count + (1 if has_fm_image else 0)

    # ── 0. Stats INFO (always emit so users see count) ────────────────────────
    yield Violation(
        check=CHECK_NAME,
        severity=Severity.INFO,
        message=(
            f"圖片統計：{inline_count} inline + "
            f"{1 if has_fm_image else 0} hero (frontmatter) = "
            f"{total_images} 張"
        ),
        editorial_ref=EDITORIAL_REF,
    )

    # ── 1. inline image references — broken-path / hot-link HARD gate ────────
    for m in inline_matches:
        alt, src = m.group(1), m.group(2).strip()
        line_no = body.count("\n", 0, m.start()) + 1
        if not _is_local_path(src):
            if not _is_allowed_external(src):
                yield Violation(
                    check=CHECK_NAME,
                    severity=Severity.HARD,
                    message=(
                        "外部圖片熱連結 — 圖片應 cache 到 public/article-images/"
                        " 並改 src=`/article-images/...`"
                    ),
                    line=line_no,
                    snippet=src[:80],
                    editorial_ref=EDITORIAL_REF,
                )
            continue
        # Local: validate file exists (relative to public/ for absolute paths)
        if src.startswith("/"):
            local = public_root / src.lstrip("/")
        else:
            local = target.path.parent / src
        if not local.exists():
            yield Violation(
                check=CHECK_NAME,
                severity=Severity.HARD,
                message=f"圖片檔不存在: {src}",
                line=line_no,
                snippet=src[:80],
                editorial_ref=EDITORIAL_REF,
            )

    # ── 2. frontmatter image — file existence HARD gate ──────────────────────
    if has_fm_image:
        src = fm_image.strip()
        if _is_local_path(src):
            local = public_root / src.lstrip("/")
            if not local.exists():
                yield Violation(
                    check=CHECK_NAME,
                    severity=Severity.HARD,
                    message=f"frontmatter image 檔不存在: {src}",
                    snippet=src[:80],
                    editorial_ref=EDITORIAL_REF,
                )

    # ── 3. ## 圖片來源 section when CC attribution exists ────────────────────
    has_attribution = (
        target.frontmatter.get("imageCredit")
        or target.frontmatter.get("imageLicense")
        or target.frontmatter.get("imageSource")
    )
    if has_attribution and not _RE_IMAGE_SOURCES_H2.search(body):
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=(
                "frontmatter 有 imageCredit/imageLicense/imageSource 但缺 "
                "`## 圖片來源` section (CC 圖片需 cite 來源)"
            ),
            editorial_ref=EDITORIAL_REF,
        )

    # ── 4. Min image count gate (depth article media rhythm) ──────────────────
    # Per REWRITE-PIPELINE Step 4.3.1 — depth article 理想 hero + 1-2 scene-mid
    # = 2-3 張。default min_images=3, soft-launch WARN, rewrite-stage-4 升 HARD.
    if not _is_excluded_from_count_gate(str(target.path)):
        min_images = int(options.get("min_images", DEFAULT_MIN_IMAGES))
        if total_images < min_images:
            if total_images == 0:
                # 0 images = broken article (always HARD by default)
                sev = _parse_severity(
                    options.get("zero_images_severity"),
                    Severity(DEFAULT_ZERO_IMAGES_SEVERITY),
                )
                msg_detail = (
                    f"0 張圖片 — depth article 應至少 hero + scene-mid 共 "
                    f"{min_images} 張 (per REWRITE-PIPELINE Step 4.3.1 三段敘事節奏)"
                )
            else:
                # 1-2 images = below ideal (configurable WARN/HARD)
                sev = _parse_severity(
                    options.get("min_images_severity"),
                    Severity(DEFAULT_MIN_IMAGES_SEVERITY),
                )
                msg_detail = (
                    f"圖片數量不足：{total_images} 張 < {min_images} 張下限 "
                    f"(depth article 理想 hero + 1-2 scene-mid = 2-3 張，"
                    f"per REWRITE-PIPELINE Step 4.3.1 三段敘事節奏)"
                )
            yield Violation(
                check=CHECK_NAME,
                severity=sev,
                message=msg_detail,
                fix_suggestion=(
                    "走 REWRITE-PIPELINE Stage 1 Step 1.14 媒體素材研究："
                    "(1) PD/CC 圖庫 cache 進 public/article-images/{category}/ "
                    "(2) check-aspect.sh 通過 hero 0.9-2.0 / inline 0.75-2.5 護欄 "
                    "(3) Stage 4 Step 4.3 插入文章 (hero + scene-mid 三段節奏) "
                    "(4) §圖片來源 section 標 CC license + 攝影者。"
                    "找不到 PD/CC → fair use editorial commentary scope "
                    "(per Step 1.14.2 第 8 點)"
                ),
                editorial_ref=EDITORIAL_REF,
            )
