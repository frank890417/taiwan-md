"""Tests for fence_prose plugin — 規則 1（正文被包進 fence）與 issue #1904 的兩條新規則。"""

from pathlib import Path

from lib.article_health.checks import fence_prose
from lib.article_health.loader import load_target
from lib.article_health.types import Severity

_FM = "title: テスト\ndescription: d\n"


def _violations(tmp_path: Path, body: str):
    f = tmp_path / "test.md"
    f.write_text(f"---\n{_FM}---\n{body}", encoding="utf-8")
    return list(fence_prose.check(load_target(f), {}))


# ── 規則 1：正文被包進 fence ─────────────────────────────────────────────


def test_prose_wrapped_in_fence(tmp_path):
    body = "````\n> **30 秒概覽：** 馬祖\n```tw-figure\nx\n```\n````\n"
    violations = _violations(tmp_path, body)
    prose = [v for v in violations if "正文包進去了" in v.message]
    assert len(prose) == 1
    assert prose[0].severity is Severity.HARD
    assert prose[0].line == 5


def test_module_fence_is_not_prose(tmp_path):
    body = "```tw-figure\n> 引言\n```\n"
    violations = [v for v in _violations(tmp_path, body) if "包進去" in v.message]
    assert violations == []


# ── 規則 2：四撇以上的 fence（issue #1904 形狀 A / B）──────────────────


def test_four_backtick_opening_is_flagged(tmp_path):
    body = "````tw-timeline\n2019 | a\n2019 | b\n````\n"
    violations = _violations(tmp_path, body)
    long_fence = [v for v in violations if "四個以上" in v.message]
    assert len(long_fence) == 2  # 開場與收尾各一行
    assert long_fence[0].line == 5
    assert long_fence[0].severity is Severity.HARD


def test_three_open_four_close_is_flagged(tmp_path):
    body = "```tw-figure\n31.5万 → 19.9万人\n````\n"
    violations = [v for v in _violations(tmp_path, body) if "四個以上" in v.message]
    assert len(violations) == 1
    assert violations[0].line == 7


def test_three_backtick_module_is_clean(tmp_path):
    body = "```tw-timeline\n2019 | a\n```\n"
    assert _violations(tmp_path, body) == []


def test_tilde_outer_fence_is_allowed(tmp_path):
    body = "~~~\n```tw-figure\nx\n```\n~~~\n"
    assert _violations(tmp_path, body) == []


# ── 規則 3：遺失開頭的殘行 ───────────────────────────────────────────────


def test_lost_opening_line_is_flagged(tmp_path):
    body = "-heatmap\n地区別 | 年份 | 医療\n台北 | 6 | 9\n"
    violations = _violations(tmp_path, body)
    assert len(violations) == 1
    assert violations[0].line == 5
    assert "```tw-heatmap" in violations[0].fix_suggestion


def test_ordinary_bullet_is_not_flagged(tmp_path):
    body = "- line\n- note\n- 一般的項目\n"
    assert _violations(tmp_path, body) == []


def test_unknown_module_name_is_not_flagged(tmp_path):
    body = "-somethingelse\n"
    assert _violations(tmp_path, body) == []


# ── 規則 4：fence 沒有收尾 ───────────────────────────────────────────────


def test_unclosed_fence_is_flagged(tmp_path):
    body = "```tw-figure\n31.5万\n\n## 次の節\n"
    violations = [v for v in _violations(tmp_path, body) if "沒有收尾" in v.message]
    assert len(violations) == 1
    assert violations[0].line == 5
    assert violations[0].severity is Severity.HARD


def test_orphan_closing_fence_is_flagged(tmp_path):
    """zh 母稿 History/蘭嶼核廢料.md 的實際形狀：文末多一行孤立的三撇。"""
    body = "[^1]: 來源\n\n```\n"
    violations = [v for v in _violations(tmp_path, body) if "沒有收尾" in v.message]
    assert len(violations) == 1
    assert violations[0].line == 7


def test_paired_fences_are_clean(tmp_path):
    body = "```tw-figure\na\n```\n\n```tw-note\nb\n```\n"
    assert _violations(tmp_path, body) == []
