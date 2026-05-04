"""Tests for Phase 6 plugins: wikilink_target / format_structure / image_health."""

import textwrap
from pathlib import Path

from lib.article_health import registry
from lib.article_health.checks import (
    format_structure,
    image_health,
    wikilink_target,
)
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _write_article(tmp_path: Path, body: str, frontmatter_extra: str = "") -> Path:
    f = tmp_path / "knowledge" / "Nature" / "test.md"
    f.parent.mkdir(parents=True, exist_ok=True)
    fm = (
        "title: x\ndescription: y\ndate: 2026-05-04\ntags: [t]\ncategory: Nature\n"
        + frontmatter_extra
    )
    f.write_text(f"---\n{fm}---\n\n{body}\n", encoding="utf-8")
    return f


# ════════════════════════════════════════════════════════════════════════
# wikilink_target
# ════════════════════════════════════════════════════════════════════════


def test_wikilink_resolves(tmp_path, monkeypatch):
    """[[X]] → if 'knowledge/<cat>/X.md' exists, no violation."""
    monkeypatch.chdir(tmp_path)
    # Create the target article
    target_md = tmp_path / "knowledge" / "Nature" / "黃魚鴞.md"
    target_md.parent.mkdir(parents=True)
    target_md.write_text("---\ntitle: t\n---\nbody\n", encoding="utf-8")
    # Reset slug cache so it picks up the test file
    wikilink_target._reset_cache()
    body = "段落引用 [[黃魚鴞]] 結束"
    src = _write_article(tmp_path, body)
    target = load_target(src)
    violations = list(wikilink_target.check(target, {}))
    assert violations == []


def test_wikilink_target_missing_flagged(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    wikilink_target._reset_cache()
    body = "段落 [[不存在的目標]] 後面"
    src = _write_article(tmp_path, body)
    target = load_target(src)
    violations = list(wikilink_target.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.HARD
    assert "不存在" in violations[0].message


def test_wikilink_with_alias(tmp_path, monkeypatch):
    """[[X|顯示文字]] — target X must resolve."""
    monkeypatch.chdir(tmp_path)
    target_md = tmp_path / "knowledge" / "Nature" / "黑熊.md"
    target_md.parent.mkdir(parents=True)
    target_md.write_text("---\ntitle: t\n---\nbody\n", encoding="utf-8")
    wikilink_target._reset_cache()
    body = "段落 [[黑熊|台灣黑熊]] 引用"
    src = _write_article(tmp_path, body)
    target = load_target(src)
    violations = list(wikilink_target.check(target, {}))
    assert violations == []


# ════════════════════════════════════════════════════════════════════════
# format_structure
# ════════════════════════════════════════════════════════════════════════


def test_overview_blockquote_missing_warn(tmp_path):
    body = textwrap.dedent(
        """\
        ## 開頭段落

        正文
        """
    )
    target = load_target(_write_article(tmp_path, body))
    violations = list(format_structure.check(target, {}))
    assert any("30 秒概覽" in v.message for v in violations)


def test_overview_blockquote_present_passes(tmp_path):
    body = textwrap.dedent(
        """\
        > **30 秒概覽**: 文章主旨

        ## 開頭

        正文
        """
    )
    target = load_target(_write_article(tmp_path, body))
    violations = list(format_structure.check(target, {}))
    overview_warns = [v for v in violations if "30 秒概覽" in v.message]
    assert overview_warns == []


def test_list_wikilink_residual_hard(tmp_path):
    body = textwrap.dedent(
        """\
        > **30 秒概覽**: x

        ## 段落

        - [[殘留 wikilink]]
        - 正常 bullet
        """
    )
    target = load_target(_write_article(tmp_path, body))
    violations = list(format_structure.check(target, {}))
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert any("[[wikilink]]" in v.message for v in hard)


def test_footnote_use_without_def_hard(tmp_path):
    body = textwrap.dedent(
        """\
        > **30 秒概覽**: x

        段落使用[^1]但沒定義。
        """
    )
    target = load_target(_write_article(tmp_path, body))
    violations = list(format_structure.check(target, {}))
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert any("無 `[^N]:` 定義" in v.message for v in hard)


def test_references_h2_required_when_footnotes_used(tmp_path):
    body = textwrap.dedent(
        """\
        > **30 秒概覽**: x

        正文[^1]。

        [^1]: [Source](https://e.com) — desc enough chars
        """
    )
    target = load_target(_write_article(tmp_path, body))
    violations = list(format_structure.check(target, {}))
    refs_warns = [v for v in violations if "參考資料" in v.message]
    assert len(refs_warns) == 1


def test_complete_structure_passes(tmp_path):
    body = textwrap.dedent(
        """\
        > **30 秒概覽**: 文章主旨

        ## 段落

        正文[^1]。

        ## 延伸閱讀

        - [文章 A](/cat/a)

        ## 參考資料

        [^1]: [src](https://e.com) — desc enough chars
        """
    ) + "\n".join(["延伸"] * 50)
    target = load_target(_write_article(tmp_path, body))
    violations = list(format_structure.check(target, {}))
    # No structural issues expected
    assert violations == [], [v.message for v in violations]


# ════════════════════════════════════════════════════════════════════════
# image_health
# ════════════════════════════════════════════════════════════════════════


def test_inline_image_missing_file_hard(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    body = "![alt](/article-images/nature/missing.jpg) 段落"
    target = load_target(_write_article(tmp_path, body))
    violations = list(image_health.check(target, {}))
    assert any("不存在" in v.message for v in violations)


def test_inline_image_existing_file_passes(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    img = tmp_path / "public" / "article-images" / "nature" / "owl.jpg"
    img.parent.mkdir(parents=True)
    img.write_bytes(b"fake")
    body = "![alt](/article-images/nature/owl.jpg) 段落"
    target = load_target(_write_article(tmp_path, body))
    violations = list(image_health.check(target, {}))
    assert violations == []


def test_external_hotlink_flagged(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    body = "![alt](https://example.com/external.jpg) 段落"
    target = load_target(_write_article(tmp_path, body))
    violations = list(image_health.check(target, {}))
    assert any("熱連結" in v.message for v in violations)


def test_wikimedia_external_allowed(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    body = "![alt](https://upload.wikimedia.org/file.jpg) 段落"
    target = load_target(_write_article(tmp_path, body))
    violations = list(image_health.check(target, {}))
    # Allowed canonical CC source — no hot-link violation
    hot_warns = [v for v in violations if "熱連結" in v.message]
    assert hot_warns == []


def test_frontmatter_image_missing_hard(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    body = "段落"
    target = load_target(
        _write_article(
            tmp_path, body, frontmatter_extra="image: '/article-images/missing.jpg'\n"
        )
    )
    violations = list(image_health.check(target, {}))
    assert any("frontmatter image" in v.message for v in violations)


def test_attribution_without_section_warn(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    img = tmp_path / "public" / "article-images" / "owl.jpg"
    img.parent.mkdir(parents=True)
    img.write_bytes(b"fake")
    body = "段落"
    target = load_target(
        _write_article(
            tmp_path,
            body,
            frontmatter_extra=(
                "image: '/article-images/owl.jpg'\n"
                "imageCredit: 'gailhampshire'\n"
                "imageLicense: 'CC BY 2.0'\n"
            ),
        )
    )
    violations = list(image_health.check(target, {}))
    assert any("圖片來源" in v.message for v in violations)


# ════════════════════════════════════════════════════════════════════════
# Plugin registration
# ════════════════════════════════════════════════════════════════════════


def test_phase6_plugins_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "wikilink-target" in found
    assert "format-structure" in found
    assert "image-health" in found
