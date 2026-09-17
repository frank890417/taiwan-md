"""Tests for subcategory_translation_parity plugin.

譯文的 subcategory 必須跟 `translatedFrom` 指到的 zh 原文同值——分類頁的分群
鍵永遠是 zh 原始值，翻過的值會讓那篇自成一群、只有 1 篇時再掉進「其他」。
"""
from __future__ import annotations

from pathlib import Path

from lib.article_health import registry
from lib.article_health.checks import subcategory_translation_parity as parity
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _write(path: Path, subcategory: str, translated_from: str | None = None) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "---",
        "title: 'T'",
        "description: 'd'",
        f"subcategory: '{subcategory}'",
    ]
    if translated_from is not None:
        lines.append(f"translatedFrom: '{translated_from}'")
    lines += ["---", "", "body.", ""]
    path.write_text("\n".join(lines), encoding="utf-8")
    return path


def _setup(tmp_path: Path, zh_sub: str, tr_sub: str, lang: str = "de") -> Path:
    kn = tmp_path / "knowledge"
    _write(kn / "Food" / "麵包.md", zh_sub)
    return _write(kn / lang / "Food" / "bread.md", tr_sub, translated_from="Food/麵包.md")


def _check(target_path: Path):
    return list(parity.check(load_target(target_path), {}))


def test_matching_subcategory_passes(tmp_path):
    f = _setup(tmp_path, "烘焙與甜點", "烘焙與甜點")
    assert _check(f) == []


def test_translated_subcategory_warns(tmp_path):
    f = _setup(tmp_path, "烘焙與甜點", "Backwaren und Süßspeisen")
    violations = _check(f)
    assert len(violations) == 1
    assert violations[0].severity == Severity.WARN
    assert "烘焙與甜點" in violations[0].message
    assert "Backwaren und Süßspeisen" in violations[0].message


def test_zh_source_itself_is_skipped(tmp_path):
    """zh-TW 原文由 subcategory-valid 管，本條不碰。"""
    kn = tmp_path / "knowledge"
    zh = _write(kn / "Food" / "麵包.md", "烘焙與甜點")
    assert _check(zh) == []


def test_missing_translated_from_is_skipped(tmp_path):
    """缺 translatedFrom 是 frontmatter-format / orphan 檢查的射程。"""
    kn = tmp_path / "knowledge"
    f = _write(kn / "de" / "Food" / "bread.md", "Backwaren")
    assert _check(f) == []


def test_dangling_source_is_skipped(tmp_path):
    """translatedFrom 指到不存在的原文是孤兒問題，不在本條射程。"""
    kn = tmp_path / "knowledge"
    f = _write(kn / "de" / "Food" / "bread.md", "Backwaren", translated_from="Food/不存在.md")
    assert _check(f) == []


def test_source_without_subcategory_is_skipped(tmp_path):
    kn = tmp_path / "knowledge"
    zh = kn / "Food" / "麵包.md"
    zh.parent.mkdir(parents=True, exist_ok=True)
    zh.write_text("---\ntitle: 'T'\ndescription: 'd'\n---\n\nbody.\n", encoding="utf-8")
    f = _write(kn / "de" / "Food" / "bread.md", "Backwaren", translated_from="Food/麵包.md")
    assert _check(f) == []


def test_knowledge_root_comes_from_target_not_plugin_file(tmp_path):
    """根目錄從被檢查的檔往上找，不從 plugin 的 __file__ 推。

    這條擋的是 REFLEXES #82 同型：拿「plugin 住哪」當「文章住哪」的替身，
    worktree / tmp fixture 會靜默量到另一棵樹。上面每一條測試都跑在 tmp_path
    底下，能過就代表根目錄是從 target 推出來的。
    """
    f = _setup(tmp_path, "烘焙與甜點", "Backwaren und Süßspeisen")
    assert parity._knowledge_root(f) == (tmp_path / "knowledge").resolve()


def test_plugin_is_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert parity.CHECK_NAME in found
    assert parity.CHECK_NAME == "subcategory-translation-parity"
    assert parity.DEFAULT_SEVERITY == Severity.WARN
