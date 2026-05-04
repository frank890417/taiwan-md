"""Tests for prose_health plugin (Phase 4 — quality-scan + manifesto-11 consolidation)."""

import textwrap
from pathlib import Path

import pytest

from lib.article_health import registry
from lib.article_health.checks import prose_health
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _make_article(
    tmp_path: Path,
    body: str,
    title: str = "測試文章",
    category: str = "Nature",
    last_human_review: bool = True,
    extra_frontmatter: str = "",
) -> Path:
    fm = (
        f"title: '{title}'\n"
        f"description: '描述 2026 anchor 1000'\n"
        f"date: 2026-05-04\n"
        f"tags: ['test']\n"
        f"category: {category}\n"
        f"lastHumanReview: {'true' if last_human_review else 'false'}\n"
    ) + extra_frontmatter
    d = tmp_path / "knowledge" / category
    d.mkdir(parents=True, exist_ok=True)
    f = d / "test.md"
    f.write_text(f"---\n{fm}---\n\n{body}\n", encoding="utf-8")
    return f


def _check(tmp_path: Path, body: str, **kwargs) -> list:
    f = _make_article(tmp_path, body, **kwargs)
    target = load_target(f)
    return list(prose_health.check(target, {}))


def _score(violations) -> int:
    """Extract numeric score from the score-summary violation."""
    for v in violations:
        if v.fix_suggestion and v.fix_suggestion.isdigit():
            return int(v.fix_suggestion)
    return 0


# ════════════════════════════════════════════════════════════════════════
# Skip cases
# ════════════════════════════════════════════════════════════════════════


def test_short_file_skipped(tmp_path):
    """File < 20 lines is skipped (matches quality-scan.sh early-exit)."""
    f = tmp_path / "knowledge" / "Nature" / "stub.md"
    f.parent.mkdir(parents=True)
    f.write_text("---\ntitle: x\n---\n\nshort content\n", encoding="utf-8")
    target = load_target(f)
    violations = list(prose_health.check(target, {}))
    assert violations == []


def test_no_frontmatter_skipped(tmp_path):
    f = tmp_path / "knowledge" / "Nature" / "x.md"
    f.parent.mkdir(parents=True)
    f.write_text("\n".join(["plain text"] * 30), encoding="utf-8")
    target = load_target(f)
    violations = list(prose_health.check(target, {}))
    assert violations == []


# ════════════════════════════════════════════════════════════════════════
# Quality-scan dimension parity
# ════════════════════════════════════════════════════════════════════════


def test_year_count_low_scores_3(tmp_path):
    body = "\n".join(["這是一段散文，沒有任何年份提及"] * 22)
    score = _score(_check(tmp_path, body))
    assert score >= 3  # 缺乏年份 = +3


def test_year_count_normal_low_score(tmp_path):
    body = textwrap.dedent(
        """\
        這篇文章在 1916 年出版，記錄了 1994 年的事件。
        2026 年我們重新看 1995 年的紀錄[^1]。
        2024 年開始有更新研究。

        ## H2

        散文段落一段
        散文段落二段
        散文段落三段
        散文段落四段

        ## H3

        散文1
        散文2
        散文3
        散文4
        散文5

        [^1]: [來源](https://example.com) — desc 足夠長
        """
    )
    score = _score(_check(tmp_path, body))
    # 4+ years → no year penalty; URL=1 → +1; fn=1 → no citation desert
    assert score < 3


def test_no_url_scores_3(tmp_path):
    body = "\n".join(["這是純散文段落 1916 年沒有任何 URL"] * 25)
    score = _score(_check(tmp_path, body))
    assert score >= 3  # 無URL = +3


def test_hollow_words_high_count(tmp_path):
    # ≥ 20 lines required (else early-exit). Need plenty of hollow density.
    body = (
        "這個產業蓬勃發展，逐步形成顯著的影響力，"
        "持續日益成長，全面深入大力推動。"
    )
    body_multi = "\n".join([body] * 25)  # 25 lines, ~75 hollow word hits
    body_multi += "\n\n散文 1916 年提及，1994 年確認[^1]。"
    body_multi += "\n\n[^1]: [src](https://e.com) — desc enough length"
    violations = _check(tmp_path, body_multi)
    score = _score(violations)
    # 75 hollow words is > 15 threshold → +3 score
    assert score >= 1, f"hollow words should trigger score, got {score}"


def test_plastic_phrase_detection(tmp_path):
    body = textwrap.dedent(
        """\
        台灣不僅是亞洲最重要的，更是全球科技中心。
        這展現了民主的精神，也體現了制度的決心。
        從南到北，從東到西，這座島嶼承載著無數的故事。
        台積電扮演著重要的角色，發揮著關鍵的作用。

        參考 https://example.com 提及 1986 年成立[^1]。

        ## H2 段落
        正文1
        正文2
        正文3
        正文4
        正文5

        [^1]: [Source](https://example.com) — long-enough description here
        """
    )
    body = body * 2
    violations = _check(tmp_path, body)
    score = _score(violations)
    # 4 plastic phrases × 2 = 8 → score +3 (3-4 range)
    assert score >= 2


def test_emdash_overuse(tmp_path):
    body = "這段——文字——有很多——破折號——濫用了——又一次——\n" * 5
    body += "\n".join(["正常一段散文 1916 年內容"] * 20)
    body += "\n\n[^1]: [src](https://e.com) — desc enough characters"
    score = _score(_check(tmp_path, body))
    # 6×5 = 30 em-dashes → +3 dash penalty
    assert score >= 3


def test_textbook_opening_scores_2(tmp_path):
    body = "台灣的半導體產業是亞洲重要的支柱。\n"
    body += "\n".join(["延伸內容 1916 年起步"] * 25)
    body += "\n\n[^1]: [src](https://e.com) — desc enough characters"
    score = _score(_check(tmp_path, body))
    assert score >= 2  # textbook opening = +2


def test_formulaic_ending_scores_2(tmp_path):
    body = "\n".join(["主文段落 1916 年內容"] * 22)
    body += "\n\n總之，這是一個值得我們深思的議題。"
    body += "\n\n[^1]: [src](https://e.com) — desc"
    score = _score(_check(tmp_path, body))
    assert score >= 2


def test_template_h2_count(tmp_path):
    body = textwrap.dedent(
        """\
        散文段落 1916 年起步引言

        ## 歷史背景

        段落

        ## 現況

        段落

        ## 未來展望

        段落

        ## 挑戰與展望

        段落
        """
    )
    body += "\n".join(["延伸 2024 年內容"] * 12)
    body += "\n\n[^1]: [src](https://e.com) — desc"
    score = _score(_check(tmp_path, body))
    assert score >= 3  # 4 template H2s = +3


def test_citation_desert_long_no_footnote(tmp_path):
    body = "\n".join(["長段散文 1916 年起點 2024 年現況"] * 50)
    score = _score(_check(tmp_path, body))
    # word count > 500, fn = 0, urls = 0 → +4 (extreme citation desert)
    assert score >= 4


def test_last_human_review_false_scores_1(tmp_path):
    body = textwrap.dedent(
        """\
        正常散文 1916 年內容 2024 年[^1]。

        ## 段落

        正文1
        正文2
        正文3

        [^1]: [Source](https://example.com) — desc enough chars
        """
    )
    body += "\n".join(["延伸"] * 15)
    score_with_review = _score(_check(tmp_path, body, last_human_review=True))
    score_without = _score(_check(tmp_path, body, last_human_review=False))
    assert score_without >= score_with_review + 1


# ════════════════════════════════════════════════════════════════════════
# Manifesto §11 tier checks
# ════════════════════════════════════════════════════════════════════════


def test_tier1_dual_pattern_detected(tmp_path):
    body = "這不是科技問題，而是制度問題。\n" * 5
    body += "\n".join(["延伸 1916 年"] * 20)
    body += "\n\n[^1]: [src](https://e.com) — desc"
    violations = _check(tmp_path, body)
    tier1 = [v for v in violations if "Tier 1" in (v.editorial_ref or "")]
    assert len(tier1) >= 5


def test_tier2_metaphor_density(tmp_path):
    body = "這篇文章的軌跡承載著 DNA，鏡子般的張力，光譜的縮影。\n"
    body += "\n".join(["散文 1916 年"] * 22)
    body += "\n\n[^1]: [src](https://e.com) — desc"
    violations = _check(tmp_path, body)
    tier2 = [v for v in violations if "Tier 2" in (v.editorial_ref or "")]
    assert len(tier2) == 1
    # Should be ≥ 5 metaphor occurrences (test phrase has 軌跡 / 承載著 / DNA /
    # 鏡子 / 張力 / 光譜 / 縮影 = 7 distinct words)
    import re
    m = re.search(r"累計 (\d+) 處", tier2[0].message)
    assert m and int(m.group(1)) >= 5, tier2[0].message


def test_tier3_ritual_phrases(tmp_path):
    body = "在這個意義上，這個議題不容忽視，值得我們深思。\n"
    body += "\n".join(["散文 1916 年"] * 22)
    body += "\n\n[^1]: [src](https://e.com) — desc"
    violations = _check(tmp_path, body)
    tier3 = [v for v in violations if "Tier 3" in (v.editorial_ref or "")]
    assert len(tier3) == 1


# ════════════════════════════════════════════════════════════════════════
# Score budget
# ════════════════════════════════════════════════════════════════════════


def test_clean_article_passes_budget(tmp_path):
    body = textwrap.dedent(
        """\
        1994 年的某一天，研究員在花蓮太魯閣的溪畔找到了一個巢[^1]。
        2026 年 4 月，研究團隊在武陵的烏心石老樹洞裡找到全台最高巢位[^2]。
        2024 年最新統計顯示族群在易危等級之間波動[^3]。

        ## 砂卡礑那年

        三十年前的研究是現在所有後續定位的起點。
        孫元勳教授團隊持續追蹤了 91 個領域。
        每對黃魚鴞需要 6.2 公里溪流維持領域。
        天然林比例 44.6% 是維持族群的關鍵變數。

        ## 武陵的新發現

        最新的紀錄改寫了高度上限。
        1,800 公尺的烏心石樹洞是台灣最高巢位。
        雪霸國家公園推出 24 小時育雛直播。

        [^1]: [Sun et al. 1997](https://example.com) — 砂卡礑首次定位巢位完整紀錄
        [^2]: [公視 2026](https://example.com) — 武陵最高巢位記錄
        [^3]: [紅皮書 2024](https://example.com) — 易危等級評估報告
        """
    )
    score = _score(_check(tmp_path, body))
    # Clean article should be ≤ 3 (canonical pass threshold)
    assert score <= 3, f"clean article scored {score}, should be ≤ 3"


# ════════════════════════════════════════════════════════════════════════
# Plugin metadata
# ════════════════════════════════════════════════════════════════════════


def test_plugin_metadata():
    assert prose_health.CHECK_NAME == "prose-health"
    assert prose_health.DEFAULT_SEVERITY == Severity.WARN
    assert "MANIFESTO" in prose_health.EDITORIAL_REF
    assert "zh-TW" in prose_health.APPLIES_TO
    assert callable(prose_health.check)


def test_plugin_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "prose-health" in found, list(found.keys())
