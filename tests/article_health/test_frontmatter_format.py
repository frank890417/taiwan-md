"""Tests for frontmatter_format plugin.

This is the formatter counterpart to `frontmatter-title`: it checks the
REWRITE-PIPELINE Stage 4 YAML shape, field order, and Prettier-stable style.
"""

from pathlib import Path

from lib.article_health import registry
from lib.article_health.checks import frontmatter_format
from lib.article_health.config import Config, ProfileConfig
from lib.article_health.loader import load_target
from lib.article_health.runner import run_checks
from lib.article_health.types import Severity


GOOD_FRONTMATTER = """\
title: '泛科學：從科學新聞黑洞到演算法裡的知識工業'
description: 'desc'
date: 2026-05-07
category: 'Society'
tags: ['媒體', '科學傳播']
subcategory: '媒體與言論'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-05-07
lastHumanReview: false
researchReport: reports/research/2026-05/泛科學.md
"""


def _write_article(tmp_path: Path, frontmatter: str) -> Path:
    f = tmp_path / "knowledge" / "Society" / "test.md"
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(f"---\n{frontmatter}---\n\nbody.\n", encoding="utf-8")
    return f


def _violations(tmp_path: Path, frontmatter: str):
    target = load_target(_write_article(tmp_path, frontmatter))
    return list(frontmatter_format.check(target, {}))


def test_good_frontmatter_passes(tmp_path):
    assert _violations(tmp_path, GOOD_FRONTMATTER) == []


def test_missing_required_field_is_hard(tmp_path):
    fm = GOOD_FRONTMATTER.replace("featured: false\n", "")
    violations = _violations(tmp_path, fm)
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert any("featured" in v.message for v in hard)


def test_required_field_order_warns_by_default(tmp_path):
    fm = GOOD_FRONTMATTER.replace(
        "category: 'Society'\ntags: ['媒體', '科學傳播']\n",
        "tags: ['媒體', '科學傳播']\ncategory: 'Society'\n",
    )
    violations = _violations(tmp_path, fm)
    assert any("欄位順序錯" in v.message for v in violations)
    assert all(v.severity != Severity.HARD for v in violations)


def test_stage4_promotes_formatter_warns_to_hard(tmp_path):
    fm = GOOD_FRONTMATTER.replace(
        "category: 'Society'\ntags: ['媒體', '科學傳播']\n",
        "tags: ['媒體', '科學傳播']\ncategory: 'Society'\n",
    )
    target = load_target(_write_article(tmp_path, fm))
    cfg = Config()
    cfg.profiles["rewrite-stage-4"] = ProfileConfig(
        name="rewrite-stage-4",
        checks=["frontmatter-format"],
        severity_overrides={"frontmatter-format": Severity.HARD},
    )
    report = run_checks(target, cfg, profile_name="rewrite-stage-4")
    hard = [v for v in report.all_violations if v.severity == Severity.HARD]
    assert any("欄位順序錯" in v.message for v in hard)


def test_prettier_wrapped_flow_tags_passes(tmp_path):
    fm = GOOD_FRONTMATTER.replace(
        "tags: ['媒體', '科學傳播']\n",
        "tags:\n  [\n    '媒體',\n    '科學傳播',\n  ]\n",
    )
    assert _violations(tmp_path, fm) == []


def test_hyphen_tags_warns_for_flow_array_style(tmp_path):
    fm = GOOD_FRONTMATTER.replace(
        "tags: ['媒體', '科學傳播']\n",
        "tags:\n  - 媒體\n  - 科學傳播\n",
    )
    violations = _violations(tmp_path, fm)
    assert any("flow array" in v.message for v in violations)


def test_unquoted_string_scalar_warns(tmp_path):
    fm = GOOD_FRONTMATTER.replace("category: 'Society'\n", "category: Society\n")
    violations = _violations(tmp_path, fm)
    assert any("category" in v.message and "單引號" in v.message for v in violations)


def test_quoted_date_warns(tmp_path):
    fm = GOOD_FRONTMATTER.replace("date: 2026-05-07\n", "date: '2026-05-07'\n")
    violations = _violations(tmp_path, fm)
    assert any("日期不需加引號" in v.message for v in violations)


def test_string_tags_are_hard(tmp_path):
    fm = GOOD_FRONTMATTER.replace(
        "tags: ['媒體', '科學傳播']\n",
        "tags: '媒體, 科學傳播'\n",
    )
    violations = _violations(tmp_path, fm)
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert any("tags" in v.message and "array" in v.message for v in hard)


def test_category_must_match_path(tmp_path):
    fm = GOOD_FRONTMATTER.replace("category: 'Society'\n", "category: 'Culture'\n")
    violations = _violations(tmp_path, fm)
    hard = [v for v in violations if v.severity == Severity.HARD]
    assert any("必須符合路徑分類" in v.message for v in hard)


def test_no_frontmatter_is_hard(tmp_path):
    f = tmp_path / "knowledge" / "Society" / "test.md"
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text("body only\n", encoding="utf-8")
    violations = list(frontmatter_format.check(load_target(f), {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.HARD
    assert "缺 frontmatter" in violations[0].message


def test_translation_files_skipped_at_runner_level(tmp_path):
    f = tmp_path / "knowledge" / "en" / "Society" / "test.md"
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(f"---\n{GOOD_FRONTMATTER}---\n\nbody.\n", encoding="utf-8")
    cfg = Config()
    report = run_checks(load_target(f), cfg, check_name="frontmatter-format")
    assert report.results == []


def test_plugin_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "frontmatter-format" in found, list(found.keys())
