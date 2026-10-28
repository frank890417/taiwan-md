"""Tests for heading_format plugin (issue #1882)."""

from pathlib import Path

from lib.article_health.checks import heading_format
from lib.article_health.loader import load_target
from lib.article_health.types import Severity

_FM = "title: テスト\ndescription: d\n"


def _violations(tmp_path: Path, body: str, frontmatter: str = _FM):
    content = f"---\n{frontmatter}---\n{body}" if frontmatter else body
    f = tmp_path / "test.md"
    f.write_text(content, encoding="utf-8")
    target = load_target(f)
    return list(heading_format.check(target, {})), target


def test_missing_space_is_hard(tmp_path):
    violations, _ = _violations(tmp_path, "##延伸阅读\n\n- [a](/b)\n")
    assert len(violations) == 1
    assert violations[0].severity is Severity.HARD
    assert violations[0].check == "heading-format"


def test_reports_original_file_line_number(tmp_path):
    """body 前面補了與 frontmatter 等量的空行，行號要對得上原檔。"""
    violations, _ = _violations(tmp_path, "intro\n\n###延伸阅读\n")
    # frontmatter 佔 1-4 行，body 從第 5 行起：intro=5、空行=6、標題=7
    assert violations[0].line == 7


def test_fix_suggestion_inserts_single_space(tmp_path):
    violations, _ = _violations(tmp_path, "##延伸阅读 (더 읽을 거리)\n")
    assert "`## 延伸阅读 (더 읽을 거리)`" in violations[0].fix_suggestion


def test_correct_heading_is_clean(tmp_path):
    violations, _ = _violations(tmp_path, "## 더 읽을거리\n\n### 각주\n")
    assert violations == []


def test_hangul_digit_and_quote_starts_are_flagged(tmp_path):
    body = "##더 읽을거리\n###澎湖 함락\n##147 Hari Hai Kun\n###《Richard》\n"
    violations, _ = _violations(tmp_path, body)
    assert len(violations) == 4


def test_hashtag_paragraph_is_not_flagged(tmp_path):
    """段落行首的 `#MeToo` 是字面文字，不是壞掉的標題。"""
    violations, _ = _violations(tmp_path, "#MeToo 運動在台灣的發展\n\n##Chapter 這種 ASCII 開頭刻意不抓\n")
    assert violations == []


def test_fenced_code_is_skipped(tmp_path):
    body = "```markdown\n##延伸阅读\n```\n\n~~~\n###延伸阅读\n~~~\n"
    violations, _ = _violations(tmp_path, body)
    assert violations == []


def test_empty_heading_and_closing_hashes_are_clean(tmp_path):
    violations, _ = _violations(tmp_path, "#\n\n## 제목 ##\n")
    assert violations == []


def test_frontmatter_is_not_scanned(tmp_path):
    violations, _ = _violations(tmp_path, "ok\n", frontmatter="title: テスト\n#延伸阅读: x\n")
    assert violations == []
