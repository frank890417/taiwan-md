"""Tests for chronicle_lead plugin.

Detects chronicle-style H2 subheadings that turn articles into
Wikipedia-style timelines (REWRITE Stage 2 #4 / #11).

Canonical: docs/pipelines/rewrite/REWRITE-WRITE.md §Step 4 + §自檢 3
Plan: reports/rewrite-pipeline-evolution-plan-2026-05-09.md Direction D Wave 1
"""

from pathlib import Path

from lib.article_health.checks import chronicle_lead
from lib.article_health.loader import load_target


def _write_tmp(tmp_path: Path, content: str, name: str = "test.md") -> Path:
    f = tmp_path / name
    f.write_text(content, encoding="utf-8")
    return f


def _check_subheadings(tmp_path: Path, subheadings: list[str], path_hint: str = "knowledge/People/test.md"):
    """Build a synthetic article and return chronicle-lead violations."""
    body = (
        "---\ntitle: 測試\n---\n\n"
        "> **30 秒概覽**：測試。\n\n"
        + "\n\n".join(f"{h}\n\n段落內容。" for h in subheadings)
        + "\n"
    )
    # Use a path under knowledge/People/ to pass _is_excluded_path
    out = tmp_path / "test.md"
    out.write_text(body, encoding="utf-8")
    target = load_target(out)
    # Override target.path attribute to simulate a knowledge/ path for plugin's
    # exclusion logic — chronicle_lead skips files outside knowledge/.
    # tmp_path is allowed by the updated _is_excluded_path (returns False
    # for /tmp/* and similar), so this works as-is.
    return list(chronicle_lead.check(target, {}))


# ════════════════════════════════════════════════════════════════════════
# HARD violations (chronicle subheadings should be detected)
# ════════════════════════════════════════════════════════════════════════


def test_year_month_subheading(tmp_path):
    """## 2016 年 5 月 — chronicle event with month."""
    violations = _check_subheadings(tmp_path, ["## 2016 年 5 月，《作品》發行"])
    assert len(violations) == 1
    assert "編年體小標題" in violations[0].message


def test_year_work_subheading(tmp_path):
    """## 2020 年《作品名》 — year + work title."""
    violations = _check_subheadings(tmp_path, ["## 2020 年《棲居在溪源之上》"])
    assert len(violations) == 1


def test_year_event_subheading(tmp_path):
    """## 2018 年：金曲入圍 / ## 2018 年「金曲入圍」 — year-prefixed event."""
    violations1 = _check_subheadings(tmp_path, ["## 2018 年：金曲入圍"])
    violations2 = _check_subheadings(tmp_path, ["## 2018 年「金曲入圍」"])
    assert len(violations1) == 1
    assert len(violations2) == 1


def test_date_format_subheading(tmp_path):
    """## 2024.5.6 / ## 2024/5/6 / ## 2024-05-06 — date format."""
    for fmt in ["## 2024.5.6", "## 2024/5/6", "## 2024-05-06"]:
        violations = _check_subheadings(tmp_path, [fmt])
        assert len(violations) == 1, f"{fmt} should violate"


def test_multiple_chronicle_subheadings(tmp_path):
    """Multiple chronicle subheadings — all should be detected."""
    violations = _check_subheadings(tmp_path, [
        "## 2011 年：站上世界之巔",
        "## 2015 年：VR 轉型的關鍵決策",
        "## 2024 年：谷底反彈的希望",
    ])
    assert len(violations) == 3


# ════════════════════════════════════════════════════════════════════════
# Allowed patterns (legitimate timeline scope - should NOT trigger)
# ════════════════════════════════════════════════════════════════════════


def test_year_range_allowed(tmp_path):
    """## 1949-1987 戒嚴體制 — year range with description (legitimate historical scope)."""
    violations = _check_subheadings(tmp_path, ["## 1949-1987 戒嚴體制"])
    assert len(violations) == 0
    # Em-dash variants
    violations2 = _check_subheadings(tmp_path, ["## 1949–1987 戒嚴體制", "## 1949 — 1987 戒嚴體制"])
    assert len(violations2) == 0


def test_decade_reference_allowed(tmp_path):
    """## 1990 年代的台灣 — decade reference."""
    violations = _check_subheadings(tmp_path, ["## 1990 年代的台灣"])
    assert len(violations) == 0


def test_minguo_year_allowed(tmp_path):
    """## 民國 X 年 — historical narrative."""
    violations = _check_subheadings(tmp_path, ["## 民國 38 年"])
    assert len(violations) == 0


def test_scene_subheadings_allowed(tmp_path):
    """Scene / object / conflict subheadings — never trigger."""
    legitimate = [
        "## 派對結束了",
        "## 凡凡的狗叫土豆",
        "## 沒被認出的金曲歌后",
        "## 陽明山的草東街",
    ]
    violations = _check_subheadings(tmp_path, legitimate)
    assert len(violations) == 0


# ════════════════════════════════════════════════════════════════════════
# Path exclusions (translations / hubs / spores / memory / diary)
# ════════════════════════════════════════════════════════════════════════


def test_translation_files_excluded(tmp_path):
    """knowledge/en|ja|ko|es|fr/ — non-zh-TW prose, skip."""
    body = "## 2020 年 1 月\n段落\n"
    # Mimic translation path via filename (since loader uses path)
    f = tmp_path / "knowledge_en_test.md"
    f.write_text(body, encoding="utf-8")
    # Direct path check
    assert chronicle_lead._is_excluded_path("/knowledge/en/People/test.md")
    assert chronicle_lead._is_excluded_path("/knowledge/ja/People/test.md")
    assert chronicle_lead._is_excluded_path("/knowledge/ko/People/test.md")
    assert chronicle_lead._is_excluded_path("/knowledge/es/People/test.md")
    assert chronicle_lead._is_excluded_path("/knowledge/fr/People/test.md")


def test_hub_pages_excluded(tmp_path):
    """knowledge/{Category}/_X.md hub pages — index pattern legit."""
    assert chronicle_lead._is_excluded_path("/knowledge/People/_index.md")
    assert chronicle_lead._is_excluded_path("/knowledge/History/_overview.md")


def test_spore_paths_excluded(tmp_path):
    """SPORE blueprints / harvests handled by spore_writing plugin."""
    assert chronicle_lead._is_excluded_path("/docs/factory/SPORE-BLUEPRINTS/01-test.md")
    assert chronicle_lead._is_excluded_path("/docs/factory/SPORE-HARVESTS/batch.md")


def test_memory_diary_excluded(tmp_path):
    """memory/ + diary/ — timeline templates legitimate."""
    assert chronicle_lead._is_excluded_path("/docs/semiont/memory/2026-05-09.md")
    assert chronicle_lead._is_excluded_path("/docs/semiont/diary/2026-05-09.md")


def test_research_reports_excluded(tmp_path):
    """reports/research/ — date-prefixed chronologies legit."""
    assert chronicle_lead._is_excluded_path("/reports/research/2026-05/test.md")


# ════════════════════════════════════════════════════════════════════════
# Severity (soft-launch as WARN)
# ════════════════════════════════════════════════════════════════════════


def test_default_severity_is_warn():
    """Plugin ships as WARN initially (legacy heal'd before HARD promotion)."""
    from lib.article_health.types import Severity
    assert chronicle_lead.DEFAULT_SEVERITY == Severity.WARN


def test_violation_includes_fix_suggestion(tmp_path):
    """Violations should include actionable fix suggestion."""
    violations = _check_subheadings(tmp_path, ["## 2020 年 5 月"])
    assert len(violations) == 1
    assert violations[0].fix_suggestion
    assert "場景" in violations[0].fix_suggestion or "物件" in violations[0].fix_suggestion
