"""Phase 9 tests: terminology / footnote_url / cross_reference plugins."""

from pathlib import Path

import pytest

from lib.article_health import registry
from lib.article_health.checks import (
    cross_reference,
    footnote_url,
    terminology,
)
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _write_article(tmp_path: Path, body: str, name: str = "x.md") -> Path:
    f = tmp_path / "knowledge" / "Nature" / name
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(
        f"---\ntitle: x\ndescription: y\ndate: 2026-05-04\ntags: [t]\n---\n\n{body}",
        encoding="utf-8",
    )
    return f


# ════════════════════════════════════════════════════════════════════════
# terminology plugin
# ════════════════════════════════════════════════════════════════════════


def test_terminology_no_tsv_skips(tmp_path, monkeypatch):
    """Without TSV files, plugin yields nothing (graceful)."""
    monkeypatch.chdir(tmp_path)
    target = load_target(_write_article(tmp_path, "視頻 段落"))
    violations = list(terminology.check(target, {}))
    assert violations == []


def test_terminology_severity_a_hard(tmp_path, monkeypatch):
    """A-severity term yields HARD violation."""
    monkeypatch.chdir(tmp_path)
    tsv = tmp_path / "data" / "terminology" / ".china-terms.detection.tsv"
    tsv.parent.mkdir(parents=True)
    tsv.write_text(
        "# header\n視頻\tA\t影片\tlexical\n", encoding="utf-8"
    )
    target = load_target(_write_article(tmp_path, "他在視頻中說了一些話"))
    violations = list(terminology.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.HARD
    assert violations[0].fix_suggestion == "影片"


def test_terminology_severity_b_info(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    tsv = tmp_path / "data" / "terminology" / ".china-terms.detection.tsv"
    tsv.parent.mkdir(parents=True)
    tsv.write_text("人設\tB\t形象\tlexical\n", encoding="utf-8")
    target = load_target(_write_article(tmp_path, "他的人設是這樣的"))
    violations = list(terminology.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.INFO


def test_terminology_false_positive_subtracts(tmp_path, monkeypatch):
    """False-positive pattern subtracts from count."""
    monkeypatch.chdir(tmp_path)
    tsv_dir = tmp_path / "data" / "terminology"
    tsv_dir.mkdir(parents=True)
    (tsv_dir / ".china-terms.detection.tsv").write_text(
        "博客\tA\t部落格\tlexical\n", encoding="utf-8"
    )
    (tsv_dir / ".china-terms.false-positives.tsv").write_text(
        "博客\t博客來\n", encoding="utf-8"
    )
    # Article has 「博客來」 (FP) once and standalone 「博客」 zero times
    body = "在博客來書店買了一本書"
    target = load_target(_write_article(tmp_path, body))
    violations = list(terminology.check(target, {}))
    # 1 「博客」 (in 博客來) - 1 FP = 0 → no violation
    assert violations == []


# ════════════════════════════════════════════════════════════════════════
# footnote-url plugin
# ════════════════════════════════════════════════════════════════════════


def test_footnote_url_default_skipped(tmp_path):
    """Network-bound check skipped by default."""
    body = "段落[^1]\n\n[^1]: [src](https://example.com) — desc enough chars"
    target = load_target(_write_article(tmp_path, body))
    violations = list(footnote_url.check(target, {}))
    assert violations == []


def test_footnote_url_enabled_via_config(tmp_path, monkeypatch):
    """When config enables network, plugin attempts HEAD."""
    body = "段落[^1]\n\n[^1]: [src](https://this-domain-does-not-exist-12345.invalid) — desc"
    target = load_target(_write_article(tmp_path, body))
    violations = list(footnote_url.check(target, {"network": True}))
    # Invalid domain should yield a warning
    assert len(violations) >= 1
    assert violations[0].severity == Severity.WARN


def test_footnote_url_env_var_enables(tmp_path, monkeypatch):
    monkeypatch.setenv("ARTICLE_HEALTH_NETWORK", "1")
    body = "段落[^1]\n\n[^1]: [src](https://this-bad-12345.invalid) — desc enough"
    target = load_target(_write_article(tmp_path, body))
    violations = list(footnote_url.check(target, {}))
    assert len(violations) >= 1


# ════════════════════════════════════════════════════════════════════════
# cross-reference plugin
# ════════════════════════════════════════════════════════════════════════


def test_cross_ref_symmetric_passes(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    cross_reference._reset_cache()
    # A links to B, B links to A — symmetric
    a = tmp_path / "knowledge" / "Nature" / "A.md"
    a.parent.mkdir(parents=True)
    a.write_text(
        "---\ntitle: A\n---\n參考 [[B]] 結尾", encoding="utf-8"
    )
    b = tmp_path / "knowledge" / "Nature" / "B.md"
    b.write_text(
        "---\ntitle: B\n---\n參考 [[A]] 結尾", encoding="utf-8"
    )
    target = load_target(a)
    violations = list(cross_reference.check(target, {}))
    assert violations == []


def test_cross_ref_asymmetric_info(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    cross_reference._reset_cache()
    # A links to B, B doesn't link back
    a = tmp_path / "knowledge" / "Nature" / "A.md"
    a.parent.mkdir(parents=True)
    a.write_text(
        "---\ntitle: A\n---\n參考 [[B]] 結尾", encoding="utf-8"
    )
    b = tmp_path / "knowledge" / "Nature" / "B.md"
    b.write_text("---\ntitle: B\n---\n沒有連回", encoding="utf-8")
    target = load_target(a)
    violations = list(cross_reference.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.INFO
    assert "[[B]]" in violations[0].message


# ════════════════════════════════════════════════════════════════════════
# Plugin registration
# ════════════════════════════════════════════════════════════════════════


def test_phase9_plugins_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "terminology" in found
    assert "footnote-url" in found
    assert "cross-reference" in found
