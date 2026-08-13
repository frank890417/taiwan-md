"""Tests for link_target plugin (Phase 1 casing + Phase 2 existence).

Trigger: 2026-05-04 jovial-feistel session — CI run 25325225046 failed with
649 broken `](/lang/UpperCase/...)` links across 209 files. Plugin catches
these at source-layer (before build), counterpart of post-build
verify-internal-links.sh.

Phase 2 (existence) added during same session per cheyu push: source-level
crosscheck against `knowledge/{lang}/{Category}/*.md` actual filesystem.
"""

from pathlib import Path

import pytest

from lib.article_health.checks import link_target
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _write_tmp(tmp_path: Path, body: str, frontmatter: str = "") -> Path:
    content = f"---\n{frontmatter}---\n{body}" if frontmatter else body
    f = tmp_path / "test.md"
    f.write_text(content, encoding="utf-8")
    return f


def _check(tmp_path: Path, body: str, frontmatter: str = ""):
    f = _write_tmp(tmp_path, body, frontmatter)
    target = load_target(f)
    return list(link_target.check(target, {})), target


@pytest.fixture
def fake_knowledge(tmp_path, monkeypatch):
    """Stand up a tiny `knowledge/` tree and point the plugin at it."""
    root = tmp_path / "knowledge"
    (root / "History").mkdir(parents=True)
    (root / "History" / "qing-dynasty.md").write_text("---\ntitle: x\n---\n")
    (root / "History" / "japanese-era.md").write_text("---\ntitle: x\n---\n")
    (root / "Music").mkdir()
    (root / "Music" / "fire-ex.md").write_text("---\ntitle: x\n---\n")
    (root / "en" / "history").mkdir(parents=True)
    (root / "en" / "history" / "qing-dynasty.md").write_text("---\ntitle: x\n---\n")
    (root / "en" / "music").mkdir(parents=True)
    (root / "en" / "music" / "fire-ex.md").write_text("---\ntitle: x\n---\n")
    monkeypatch.setattr(link_target, "_KNOWLEDGE_ROOT", root)
    link_target._reset_cache()
    yield root
    link_target._reset_cache()


# ─── Phase 1: casing ────────────────────────────────────────────────────


def test_capitalized_category_violates(tmp_path, fake_knowledge):
    body = "See [Qing Dynasty](/en/History/qing-dynasty/) for context.\n"
    violations, _ = _check(tmp_path, body)
    casing = [v for v in violations if "category" in v.message]
    assert len(casing) == 1
    assert "/History/" in casing[0].message
    assert "/history/" in casing[0].message


def test_lowercase_category_passes(tmp_path, fake_knowledge):
    body = "See [Qing Dynasty](/en/history/qing-dynasty/) for context.\n"
    violations, _ = _check(tmp_path, body)
    assert violations == []


def test_external_url_ignored(tmp_path, fake_knowledge):
    body = "See [GitHub](https://github.com/X/Y) and [API](/api/x).\n"
    violations, _ = _check(tmp_path, body)
    assert violations == []


def test_multiple_langs_caught(tmp_path, fake_knowledge):
    body = (
        "[A](/ja/People/x/)\n"
        "[B](/ko/Music/y/)\n"
        "[C](/fr/History/z/)\n"
    )
    violations, _ = _check(tmp_path, body)
    casing = [v for v in violations if "category" in v.message]
    assert len(casing) == 3


# ─── Phase 2: existence ─────────────────────────────────────────────────


def test_nonexistent_slug_violates_as_warn(tmp_path, fake_knowledge):
    body = "See [missing](/en/history/no-such-slug/) here.\n"
    violations, _ = _check(tmp_path, body)
    existence = [v for v in violations if "目標不存在" in v.message]
    assert len(existence) == 1
    assert "/en/history/no-such-slug" in existence[0].message
    # Phase 2 = WARN so pre-commit doesn't block parallel agent work.
    assert existence[0].severity == Severity.WARN


def test_capitalized_category_violates_as_hard(tmp_path, fake_knowledge):
    body = "See [Qing](/en/History/qing-dynasty/) here.\n"
    violations, _ = _check(tmp_path, body)
    casing = [v for v in violations if "category 必須小寫" in v.message]
    assert len(casing) == 1
    assert casing[0].severity == Severity.HARD


def test_existing_slug_passes(tmp_path, fake_knowledge):
    body = "See [Fire EX.](/en/music/fire-ex/) here.\n"
    violations, _ = _check(tmp_path, body)
    assert violations == []


def test_zh_tw_no_prefix_existing(tmp_path, fake_knowledge):
    body = "See [Qing](/history/qing-dynasty/) — no lang prefix.\n"
    violations, _ = _check(tmp_path, body)
    assert violations == []


def test_zh_tw_explicit_prefix_existing(tmp_path, fake_knowledge):
    body = "See [Qing](/zh-TW/history/qing-dynasty/) — explicit zh-TW.\n"
    violations, _ = _check(tmp_path, body)
    assert violations == []


def test_static_page_skipped(tmp_path, fake_knowledge):
    """Single-segment paths (`/about/`, `/dashboard/`) aren't article-shaped."""
    body = "See [About](/about/) and [Dashboard](/dashboard/).\n"
    violations, _ = _check(tmp_path, body)
    assert violations == []


def test_anchor_and_query_stripped(tmp_path, fake_knowledge):
    body = (
        "[A](/en/history/qing-dynasty/#section)\n"
        "[B](/en/history/qing-dynasty/?utm=1)\n"
    )
    violations, _ = _check(tmp_path, body)
    assert violations == []  # both resolve to /en/history/qing-dynasty


def test_casing_dedups_with_existence(tmp_path, fake_knowledge):
    """A casing violation shouldn't ALSO get an existence violation."""
    body = "See [Qing](/en/History/qing-dynasty/) — uppercase.\n"
    violations, _ = _check(tmp_path, body)
    # Only Phase 1 should fire; Phase 2 skipped at same position.
    assert len(violations) == 1
    assert "category" in violations[0].message


def test_casing_AND_existence_both_violate(tmp_path, fake_knowledge):
    """When BOTH casing wrong AND target doesn't exist, only Phase 1 fires.

    After human runs --fix (Phase 1), the lowercase version will then trip
    Phase 2 if the slug truly doesn't exist. Two-pass is intentional —
    keeps each violation actionable.
    """
    body = "See [Bad](/en/History/no-such-slug/) — both wrong.\n"
    violations, _ = _check(tmp_path, body)
    assert len(violations) == 1
    assert "category" in violations[0].message


# ─── fix() — only Phase 1 ───────────────────────────────────────────────


def test_fix_lowercases_category(tmp_path, fake_knowledge):
    body = "See [Qing](/en/History/qing-dynasty/) and [Fire](/en/Music/fire-ex/).\n"
    f = _write_tmp(tmp_path, body)
    target = load_target(f)
    changes = link_target.fix(target, {})
    assert changes == 2
    new_text = f.read_text(encoding="utf-8")
    assert "/en/history/qing-dynasty/" in new_text
    assert "/en/music/fire-ex/" in new_text
    assert "/en/History/" not in new_text


def test_fix_does_not_touch_existence(tmp_path, fake_knowledge):
    """Phase 2 violations are NOT auto-fixed — file unchanged."""
    body = "See [missing](/en/history/no-such-slug/).\n"
    f = _write_tmp(tmp_path, body)
    target = load_target(f)
    changes = link_target.fix(target, {})
    assert changes == 0  # casing was already lowercase, nothing to fix


def test_frontmatter_preserved_after_fix(tmp_path, fake_knowledge):
    fm = "title: Test\nauthor: X\n"
    body = "[Link](/en/History/qing-dynasty/)\n"
    f = _write_tmp(tmp_path, body, fm)
    target = load_target(f)
    link_target.fix(target, {})
    new_text = f.read_text(encoding="utf-8")
    assert new_text.startswith("---\ntitle: Test\nauthor: X\n---\n")
    assert "/en/history/qing-dynasty/" in new_text
