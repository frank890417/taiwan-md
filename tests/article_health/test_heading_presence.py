"""Tests for heading_presence plugin (issue #1951)."""

from pathlib import Path

from lib.article_health.checks import heading_presence
from lib.article_health.loader import load_target
from lib.article_health.types import Severity

_FM = "title: 測試\ndescription: d\n"
_LONG = "一段沒有任何標題的正文。" * 60  # > 400 字元


def _violations(tmp_path: Path, body: str, name: str = "test.md"):
    f = tmp_path / name
    f.write_text(f"---\n{_FM}---\n{body}", encoding="utf-8")
    target = load_target(f)
    return list(heading_presence.check(target, {})), target


def test_zero_heading_zh_is_hard(tmp_path):
    violations, _ = _violations(tmp_path, _LONG)
    assert len(violations) == 1
    assert violations[0].severity is Severity.HARD
    assert violations[0].check == "heading-presence"


def test_one_heading_is_clean(tmp_path):
    violations, _ = _violations(tmp_path, f"## 小標\n\n{_LONG}")
    assert violations == []


def test_short_body_is_not_flagged(tmp_path):
    """短檔不罰——門檻是 400 字元，避免罰到 stub。"""
    violations, _ = _violations(tmp_path, "只有一句話。")
    assert violations == []


def test_heading_inside_code_fence_does_not_count(tmp_path):
    """fence 裡的 `# 字` 是程式碼註解，不是標題。"""
    body = f"```bash\n# 這是註解不是標題\necho hi\n```\n\n{_LONG}"
    violations, _ = _violations(tmp_path, body)
    assert len(violations) == 1
    assert violations[0].severity is Severity.HARD


def test_translation_is_warn_not_hard(tmp_path):
    """譯文忠實帶著母稿的缺陷，會在重翻時換掉，所以只提醒不擋。"""
    ja = tmp_path / "knowledge" / "ja" / "Lifestyle"
    ja.mkdir(parents=True)
    f = ja / "sample.md"
    f.write_text(f"---\n{_FM}---\n{_LONG}", encoding="utf-8")
    target = load_target(f)
    violations = list(heading_presence.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity is Severity.WARN
