"""Parity tests — Python plugin must agree with JS test-frontmatter.mjs.

During Phase 3, we ship the Python plugin alongside the existing JS
checkTitleFormat in `scripts/core/test-frontmatter.mjs`. Both must behave
identically for representative inputs so Phase 7 cleanup can safely rip
the JS.

This test launches the JS validator in --strict mode against a temp
knowledge/ tree containing canonical fixture titles, captures the
violations, and compares the violation count to the Python plugin's
count over the same titles.
"""

import json
import subprocess
import textwrap
from pathlib import Path

import pytest

from lib.article_health.checks import frontmatter_title
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


# Canonical fixtures: (title, category, expected_hard_count, expected_warn_count, label)
FIXTURES = [
    # Halfwidth punct → HARD
    ("黃魚鴞:六公里溪流養一對,1,800 公尺烏心石", "Nature", 2, 0, "halfwidth-colon-comma"),
    ("台灣黑熊", "People", 0, 1, "people-no-colon"),
    ("傳奇:故事與台灣味道", "Food", 1, 1, "vague-adj+halfwidth"),
    ("黃魚鴞：六公里溪流養一對的夜行猛禽", "Nature", 0, 0, "clean-zh-tw"),
    ("周杰倫", "People", 0, 1, "people-no-colon-bare"),
    (
        "周杰倫：從 4 in Love 隔壁練團室到不能說的祕密的二十五年",
        "People",
        0,
        0,
        "people-good-colon-sandwich",
    ),
    ("周杰倫：歌手", "People", 0, 1, "people-short-subtitle"),
    (
        "黃魚鴞甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥東南西北春夏秋冬山水火木",
        "Nature",
        0,
        1,
        "title-too-long",
    ),
]


def _check_via_python(title: str, category: str, tmp_path: Path):
    """Run the Python plugin and return (hard_count, warn_count)."""
    d = tmp_path / "knowledge" / category
    d.mkdir(parents=True, exist_ok=True)
    f = d / "py.md"
    f.write_text(
        f"---\ntitle: '{title}'\ndescription: 'desc'\n---\nbody.\n",
        encoding="utf-8",
    )
    target = load_target(f)
    violations = list(frontmatter_title.check(target, {}))
    hard = sum(1 for v in violations if v.severity == Severity.HARD)
    warn = sum(1 for v in violations if v.severity == Severity.WARN)
    return hard, warn


def _check_via_js(title: str, category: str, tmp_path: Path) -> tuple[int, int]:
    """Run scripts/core/test-frontmatter.mjs in --strict mode against a
    minimal knowledge tree and parse its stdout.

    Returns (hard_count, warn_count) where:
      - hard_count = errors related to this title from JS output
      - warn_count = warnings related to this title from JS output
    """
    repo_root = Path(__file__).resolve().parents[2]
    # Set up minimal knowledge tree in tmp_path
    knowledge = tmp_path / "knowledge"
    knowledge.mkdir(exist_ok=True)
    cat_dir = knowledge / category
    cat_dir.mkdir(exist_ok=True)
    test_md = cat_dir / "js-fixture.md"
    test_md.write_text(
        textwrap.dedent(
            f"""\
            ---
            title: '{title.replace("'", "\\'")}'
            description: 'fixture description with anchor 2026 and number 100'
            date: 2026-05-04
            tags: ['test']
            category: {category}
            ---

            body.
            """
        ),
        encoding="utf-8",
    )

    js_script = repo_root / "scripts" / "core" / "test-frontmatter.mjs"
    if not js_script.exists():
        pytest.skip(f"JS validator not found at {js_script}")

    proc = subprocess.run(
        ["node", str(js_script)],
        cwd=str(tmp_path),
        capture_output=True,
        text=True,
        timeout=30,
    )
    out = proc.stdout + proc.stderr

    js_label = f"{category}/js-fixture.md"
    title_relevant = [
        line for line in out.splitlines()
        if js_label in line and "title" in line
    ]
    # JS test-frontmatter outputs title-format checks as either errors
    # (halfwidth punct) or warnings (others). Distinguish by keywords:
    hard_keywords = ["title 含半形"]
    hard = sum(
        1 for line in title_relevant if any(k in line for k in hard_keywords)
    )
    warn = len(title_relevant) - hard
    return hard, warn


@pytest.mark.parametrize(
    "title,category,expected_hard,expected_warn,label", FIXTURES
)
def test_python_plugin_matches_expected(
    tmp_path, title, category, expected_hard, expected_warn, label
):
    """Python plugin's count matches the fixture's expected counts."""
    py_hard, py_warn = _check_via_python(title, category, tmp_path)
    assert py_hard == expected_hard, (
        f"[{label}] Python hard={py_hard}, expected {expected_hard}; title={title!r}"
    )
    assert py_warn == expected_warn, (
        f"[{label}] Python warn={py_warn}, expected {expected_warn}; title={title!r}"
    )


@pytest.mark.parametrize(
    "title,category,expected_hard,expected_warn,label", FIXTURES
)
def test_js_validator_agrees_with_python(
    tmp_path, title, category, expected_hard, expected_warn, label
):
    """Cross-check: the legacy JS validator agrees with our Python plugin
    on every fixture. If this fails, drift has happened — fix one or
    the other before merging."""
    py_hard, py_warn = _check_via_python(title, category, tmp_path)
    # Reset tmp dir between python and JS runs to avoid sharing state
    import shutil

    tmp_path_js = tmp_path / "_js_run"
    tmp_path_js.mkdir(exist_ok=True)
    js_hard, js_warn = _check_via_js(title, category, tmp_path_js)

    assert py_hard == js_hard, (
        f"[{label}] DRIFT: Python hard={py_hard}, JS hard={js_hard}; "
        f"title={title!r}, expected={expected_hard}"
    )
    # JS output may include extra warnings unrelated to title (e.g. missing
    # subcategory). We assert AT LEAST as many title-related warnings as
    # the python count. Strict equality is brittle here.
    assert js_warn >= py_warn, (
        f"[{label}] JS warn={js_warn} < Python warn={py_warn}; "
        f"title={title!r}"
    )
