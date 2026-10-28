"""Tests for hex_escape plugin (issue #1924)."""

from pathlib import Path

from lib.article_health.checks import hex_escape
from lib.article_health.loader import load_target
from lib.article_health.types import Severity

_FM = "title: テスト\ndescription: d\n"


def _violations(tmp_path: Path, body: str):
    f = tmp_path / "test.md"
    f.write_text(f"---\n{_FM}---\n{body}", encoding="utf-8")
    return list(hex_escape.check(load_target(f), {}))


def test_flags_single_escape(tmp_path):
    violations = _violations(tmp_path, "두이진은 201<0xC2>7년 마이크로소프트를 떠났다.\n")
    assert len(violations) == 1
    assert violations[0].severity is Severity.WARN
    assert violations[0].check == "hex-escape"
    assert violations[0].line == 5


def test_counts_all_tokens_across_lines(tmp_path):
    body = "a<0xC2>b\n\nc<0xE2><0x80><0x8A>d\n"
    violations = _violations(tmp_path, body)
    assert len(violations) == 1
    assert "4 個" in violations[0].message
    assert "2 行" in violations[0].message


def test_clean_text_is_silent(tmp_path):
    violations = _violations(tmp_path, "두이진은 2017년 마이크로소프트를 떠났다.\n")
    assert violations == []


def test_lowercase_hex_is_matched(tmp_path):
    violations = _violations(tmp_path, "x<0xc2>y\n")
    assert len(violations) == 1


def test_frontmatter_is_not_scanned(tmp_path):
    f = tmp_path / "test.md"
    f.write_text("---\ntitle: 'x<0xC2>y'\n---\nok\n", encoding="utf-8")
    assert list(hex_escape.check(load_target(f), {})) == []
