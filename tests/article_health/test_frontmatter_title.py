"""Tests for frontmatter_title plugin (SSOT Phase 3).

Mirror of `scripts/core/test-frontmatter.mjs::checkTitleFormat` behavior
plus precedence semantics (per-violation severity > profile override).
"""

from pathlib import Path

import pytest

from lib.article_health import registry
from lib.article_health.checks import frontmatter_title
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _make_article(
    tmp_path: Path,
    title: str,
    category: str = "Nature",
    lang_dir: str = "",
    description: str = "desc",
) -> Path:
    if lang_dir:
        d = tmp_path / "knowledge" / lang_dir / category
    else:
        d = tmp_path / "knowledge" / category
    d.mkdir(parents=True, exist_ok=True)
    f = d / "test.md"
    f.write_text(
        f"---\ntitle: '{title}'\ndescription: '{description}'\n---\n\nbody.\n",
        encoding="utf-8",
    )
    return f


def _check(tmp_path: Path, title: str, category: str = "Nature", lang_dir: str = ""):
    f = _make_article(tmp_path, title, category, lang_dir)
    target = load_target(f)
    return list(frontmatter_title.check(target, {}))


# ════════════════════════════════════════════════════════════════════════
# HARD: half-width punct in CJK title
# ════════════════════════════════════════════════════════════════════════


def test_halfwidth_colon_between_cjk_is_hard(tmp_path):
    violations = _check(tmp_path, "黃魚鴞:六公里溪流養一對")
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert len(hard) >= 1
    assert any("：" in (v.fix_suggestion or "") for v in hard)


def test_halfwidth_comma_cjk_to_digit_is_hard(tmp_path):
    """`對,1800` (CJK→digit) — HARD violation."""
    violations = _check(tmp_path, "六公里養一對,1800 公尺")
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert len(hard) >= 1
    assert any("，" in (v.fix_suggestion or "") for v in hard)


def test_intra_number_comma_not_flagged(tmp_path):
    """`1,800` digit-comma-digit not flagged — both sides digits."""
    violations = _check(tmp_path, "海拔 1,800 公尺烏心石")
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert hard == []


def test_english_comma_not_flagged(tmp_path):
    violations = _check(tmp_path, "Sun, Y. H. monograph")
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert hard == []


# ════════════════════════════════════════════════════════════════════════
# WARN: vague adjectives (EDITORIAL §原則 3)
# ════════════════════════════════════════════════════════════════════════


@pytest.mark.parametrize("adj", ["傳奇", "偉大", "優秀", "最強", "國民", "天后"])
def test_vague_adjective_is_warn(tmp_path, adj):
    violations = _check(tmp_path, f"{adj}的故事和台灣味道")
    warns = [v for v in violations if v.severity == Severity.WARN and adj in v.message]
    assert len(warns) == 1


def test_unlisted_word_not_flagged(tmp_path):
    """『神話』『不朽』不在 canonical 清單，不算 vague adjective."""
    violations = _check(tmp_path, "原住民神話之夜歌與祭典", category="Culture")
    vague_warns = [v for v in violations if "空泛形容詞" in v.message]
    assert vague_warns == []


# ════════════════════════════════════════════════════════════════════════
# WARN: People colon-sandwich (EDITORIAL §原則 5)
# ════════════════════════════════════════════════════════════════════════


def test_people_without_colon_warns(tmp_path):
    violations = _check(tmp_path, "周杰倫", category="People")
    warns = [v for v in violations if "冒號三明治" in v.message]
    assert len(warns) == 1


def test_people_with_colon_and_long_subtitle_passes(tmp_path):
    title = "周杰倫：從 4 in Love 隔壁練團室到不能說的祕密的二十五年"
    violations = _check(tmp_path, title, category="People")
    # Should not warn about colon sandwich or short subtitle
    relevant = [
        v for v in violations
        if "冒號三明治" in v.message or "敘述太短" in v.message
    ]
    assert relevant == []


def test_people_short_subtitle_warns(tmp_path):
    """副標 weight < 8 — `太短` warn."""
    violations = _check(tmp_path, "周杰倫：歌手", category="People")
    warns = [v for v in violations if "太短" in v.message]
    assert len(warns) == 1


def test_non_people_without_colon_no_colon_warn(tmp_path):
    """Nature article without colon shouldn't trigger People-only rule."""
    violations = _check(tmp_path, "黃魚鴞", category="Nature")
    warns = [v for v in violations if "冒號三明治" in v.message]
    assert warns == []


# ════════════════════════════════════════════════════════════════════════
# WARN: title length
# ════════════════════════════════════════════════════════════════════════


def test_long_title_warns(tmp_path):
    # > 35 effective chars: each CJK = 1, so 36 CJK chars triggers
    long_title = "黃魚鴞甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥東南西北春夏秋冬山水火木"
    violations = _check(tmp_path, long_title)
    warns = [v for v in violations if "過長" in v.message]
    assert len(warns) == 1, f"len={len(long_title)}, weight should be > 35, got {len(warns)} warns"


def test_normal_title_passes_length(tmp_path):
    violations = _check(tmp_path, "黃魚鴞：六公里溪流養一對的夜行猛禽")
    warns = [v for v in violations if "過長" in v.message]
    assert warns == []


# ════════════════════════════════════════════════════════════════════════
# Lang filter: APPLIES_TO=zh-TW
# ════════════════════════════════════════════════════════════════════════


def test_translation_files_skipped_at_runner_level(tmp_path):
    """Translations don't run this plugin (APPLIES_TO filter at runner)."""
    from lib.article_health import config as cfg_mod
    from lib.article_health.runner import run_checks

    f = _make_article(tmp_path, "Some English Title!", lang_dir="en")
    target = load_target(f)
    cfg = cfg_mod.Config()
    report = run_checks(target, cfg, check_name="frontmatter-title")
    # Plugin not selected for en lang
    assert report.results == []


# ════════════════════════════════════════════════════════════════════════
# Per-violation severity precedence (Phase 3 runner change)
# ════════════════════════════════════════════════════════════════════════


def test_mixed_severities_in_one_check(tmp_path):
    """A title with BOTH halfwidth punct AND vague adjective should yield
    one HARD + one WARN violation."""
    violations = _check(tmp_path, "傳奇:故事與台灣")
    hard = [v for v in violations if v.severity == Severity.HARD]
    warn = [v for v in violations if v.severity == Severity.WARN]
    assert len(hard) >= 1  # halfwidth :
    assert len(warn) >= 1  # 傳奇 vague adj


def test_runner_preserves_per_violation_hard(tmp_path):
    """Even with profile override default→warn, plugin's HARD violations
    stay HARD."""
    from lib.article_health import config as cfg_mod
    from lib.article_health.runner import run_checks

    f = _make_article(tmp_path, "黃魚鴞:六公里")
    target = load_target(f)
    cfg = cfg_mod.Config()
    cfg.profiles["test"] = cfg_mod.ProfileConfig(
        name="test",
        checks=["frontmatter-title"],
        severity_overrides={"frontmatter-title": Severity.WARN},
    )
    report = run_checks(target, cfg, profile_name="test")
    # halfwidth punct violation must STILL be HARD even with profile WARN override
    hard_violations = [v for r in report.results for v in r.violations if v.severity == Severity.HARD]
    assert len(hard_violations) >= 1, "halfwidth punct HARD must survive profile override"


# ════════════════════════════════════════════════════════════════════════
# Plugin metadata
# ════════════════════════════════════════════════════════════════════════


def test_plugin_metadata():
    assert frontmatter_title.CHECK_NAME == "frontmatter-title"
    assert frontmatter_title.DEFAULT_SEVERITY == Severity.WARN
    assert "Title" in frontmatter_title.EDITORIAL_REF
    assert "zh-TW" in frontmatter_title.APPLIES_TO
    assert callable(frontmatter_title.check)


def test_plugin_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "frontmatter-title" in found, list(found.keys())
