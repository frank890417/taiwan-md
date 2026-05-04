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


def test_missing_url_flagged(tmp_path):
    body = "段落[^1]\n\n[^1]: just plain text without link or url\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.HARD


def test_missing_dash_separator_flagged(tmp_path):
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — short\n"
    # description < 10 chars
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1


def test_short_description_flagged(tmp_path):
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — 9chars\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1


def test_multiple_violations(tmp_path):
    body = (
        "段落[^1][^2][^3]\n\n"
        "[^1]: [Title](https://example.com) — proper desc enough chars\n"
        "[^2]: just plain text bad\n"
        "[^3]: another bad one\n"
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
