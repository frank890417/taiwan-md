"""Tests for footnote_format + footnote_density plugins (Phase 5)."""

import textwrap
from pathlib import Path

from lib.article_health import registry
from lib.article_health.checks import footnote_density, footnote_format
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _write(tmp_path: Path, body: str, name: str = "x.md") -> Path:
    f = tmp_path / "knowledge" / "Nature" / name
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(
        f"---\ntitle: x\ndescription: y\ndate: 2026-05-04\ntags: [t]\n---\n\n{body}",
        encoding="utf-8",
    )
    return f


# ════════════════════════════════════════════════════════════════════════
# footnote-format
# ════════════════════════════════════════════════════════════════════════


def test_canonical_footnote_no_violation(tmp_path):
    body = "段落[^1]\n\n[^1]: [Source Title](https://example.com) — description text\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_pure_prose_footnote_accepted(tmp_path):
    """2026-05-04 cleanup: explanatory pure-prose footnotes (no URL) ARE
    canonical — `[^N]: <prose ≥10 chars>` is a valid markdown convention
    for explanatory notes, not just citations."""
    body = "段落[^1]\n\n[^1]: 這是一個解釋性註腳，不需要外部連結也算合規。\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_too_short_prose_footnote_flagged(tmp_path):
    """Pure-prose footnote shorter than 10 chars is still flagged (likely a stub)."""
    body = "段落[^1]\n\n[^1]: 太短\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.HARD


def test_short_description_below_six_flagged(tmp_path):
    """URL-form footnote with desc < 6 chars is flagged (relaxed from 10 in
    2026-05-04 since Chinese descs are dense — `維基百科條目` 6 chars passes)."""
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — 五字\n"  # 五字=2 chars
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1


def test_six_char_description_passes(tmp_path):
    """6-char Chinese desc passes (canonical floor relaxed)."""
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — 維基百科條目\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_prettier_autolink_wrap_url_with_parens_accepted(tmp_path):
    """2026-05-08 #884 follow-up: Prettier auto-wraps URLs containing parens
    (e.g. Wikipedia disambiguation) into autolink form `<URL>` to avoid
    markdown ambiguity. The regex must accept both bare URLs and `<URL>` form.
    Without this fix, all `王建民_(棒球運動員)`-style Wiki citations cause CI
    failure after Prettier reformat."""
    body = (
        "段落[^1][^2][^3]\n\n"
        "[^1]: [維基百科：王建民](<https://zh.wikipedia.org/zh-tw/王建民_(棒球運動員)>) — 確認1980年生於台南\n"
        "[^2]: [Wikipedia (EN): Chi Cheng (athlete)](<https://en.wikipedia.org/wiki/Chi_Cheng_(athlete)>) — 紀政英文維基條目\n"
        "[^3]: [維基百科：山丘](<https://zh.wikipedia.org/wiki/山丘_(歌曲)>) — 確認2013年發行\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == [], f"autolink-wrapped URLs should pass: {[v.message for v in violations]}"


def test_bare_url_still_accepted(tmp_path):
    """Regression: making regex accept autolink form must not break bare URLs."""
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — proper desc 7+ chars\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_multiple_violations(tmp_path):
    body = (
        "段落[^1][^2][^3]\n\n"
        "[^1]: [Title](https://example.com) — proper desc enough chars\n"
        "[^2]: 短\n"  # too short prose
        "[^3]: ?\n"  # too short
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 2


def test_format_plugin_metadata():
    assert footnote_format.CHECK_NAME == "footnote-format"
    assert footnote_format.DEFAULT_SEVERITY == Severity.HARD


# ════════════════════════════════════════════════════════════════════════
# footnote-density grading
# ════════════════════════════════════════════════════════════════════════


def test_grade_a_high_density(tmp_path):
    body = textwrap.dedent(
        """\
        短文 內容。

        [^1]: [src](https://e.com) — desc enough chars
        [^2]: [src2](https://e.com) — desc enough chars2
        [^3]: [src3](https://e.com) — desc enough chars3
        """
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    # Grade A → no violation yielded
    assert violations == []


def test_grade_b_few_footnotes(tmp_path):
    body = textwrap.dedent(
        """\
        段落內容比較長，但腳註只有一個。

        [^1]: [src](https://e.com) — desc enough chars
        """
    ) + "\n".join(["延伸"] * 100)  # inflate word count → density > 300
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    # B grade → no violation
    assert violations == []


def test_grade_c_only_inline_urls(tmp_path):
    body = "段落 https://a.com 段落 https://b.com 段落 https://c.com 又一段"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    assert len(violations) == 1
    assert violations[0].fix_suggestion == "C"


def test_grade_d_one_url(tmp_path):
    body = "段落 https://only.com 結束"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    assert len(violations) == 1
    assert violations[0].fix_suggestion == "D"


def test_grade_f_naked(tmp_path):
    body = "純文字段落沒有任何引用 沒有 URL"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    assert len(violations) == 1
    assert violations[0].fix_suggestion == "F"
    assert "引用荒漠" in violations[0].message


def test_density_plugin_metadata():
    assert footnote_density.CHECK_NAME == "footnote-density"
    assert footnote_density.DEFAULT_SEVERITY == Severity.WARN


def test_both_plugins_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "footnote-format" in found
    assert "footnote-density" in found
