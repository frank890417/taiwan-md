"""Tests for footnote_format + footnote_density plugins (Phase 5)."""

import textwrap
from pathlib import Path

from lib.article_health import registry
from lib.article_health.checks import footnote_density, footnote_format
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


def _write(tmp_path: Path, body: str, name: str = "x.md") -> Path:
    f = tmp_path / "knowledge" / "Nature" / name
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(
        f"---\ntitle: x\ndescription: y\ndate: 2026-05-04\ntags: [t]\n---\n\n{body}",
        encoding="utf-8",
    )
    return f


# ════════════════════════════════════════════════════════════════════════
# footnote-format
# ════════════════════════════════════════════════════════════════════════


def test_canonical_footnote_no_violation(tmp_path):
    body = "段落[^1]\n\n[^1]: [Source Title](https://example.com) — description text\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_pure_prose_footnote_accepted(tmp_path):
    """2026-05-04 cleanup: explanatory pure-prose footnotes (no URL) ARE
    canonical — `[^N]: <prose ≥10 chars>` is a valid markdown convention
    for explanatory notes, not just citations."""
    body = "段落[^1]\n\n[^1]: 這是一個解釋性註腳，不需要外部連結也算合規。\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_back_reference_first_prose_footnote_accepted(tmp_path):
    """ja/ko 的「同前註」語序是參照在前（`[^14]に同じ`／`[^8]과 같음`），
    以 `[^` 開頭是腳註參照不是 markdown 連結，應與中文「同 [^14]」同等放行。"""
    body = (
        "段落[^14][^15]\n\n[^14]: [報導者](https://example.com) — 2019 年訪談報導\n\n"
        "[^15]: [^14]に同じ：NME 2019 年の報道を引用した部分。\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_link_without_description_still_flagged(tmp_path):
    """放行 `[^` 開頭不能順便放過「[Title](URL) 缺描述」的連結型腳註。"""
    body = "段落[^1]\n\n[^1]: [Source Title](https://example.com)\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1


def test_too_short_prose_footnote_flagged(tmp_path):
    """Pure-prose footnote shorter than 10 chars is still flagged (likely a stub)."""
    body = "段落[^1]\n\n[^1]: 太短\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.HARD


def test_short_description_below_six_flagged(tmp_path):
    """URL-form footnote with desc < 6 chars is flagged (relaxed from 10 in
    2026-05-04 since Chinese descs are dense — `維基百科條目` 6 chars passes)."""
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — 五字\n"  # 五字=2 chars
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 1


def test_six_char_description_passes(tmp_path):
    """6-char Chinese desc passes (canonical floor relaxed)."""
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — 維基百科條目\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_prettier_autolink_wrap_url_with_parens_accepted(tmp_path):
    """2026-05-08 #884 follow-up: Prettier auto-wraps URLs containing parens
    (e.g. Wikipedia disambiguation) into autolink form `<URL>` to avoid
    markdown ambiguity. The regex must accept both bare URLs and `<URL>` form.
    Without this fix, all `王建民_(棒球運動員)`-style Wiki citations cause CI
    failure after Prettier reformat."""
    body = (
        "段落[^1][^2][^3]\n\n"
        "[^1]: [維基百科：王建民](<https://zh.wikipedia.org/zh-tw/王建民_(棒球運動員)>) — 確認1980年生於台南\n"
        "[^2]: [Wikipedia (EN): Chi Cheng (athlete)](<https://en.wikipedia.org/wiki/Chi_Cheng_(athlete)>) — 紀政英文維基條目\n"
        "[^3]: [維基百科：山丘](<https://zh.wikipedia.org/wiki/山丘_(歌曲)>) — 確認2013年發行\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == [], f"autolink-wrapped URLs should pass: {[v.message for v in violations]}"


def test_bare_url_still_accepted(tmp_path):
    """Regression: making regex accept autolink form must not break bare URLs."""
    body = "段落[^1]\n\n[^1]: [Title](https://example.com) — proper desc 7+ chars\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert violations == []


def test_multiple_violations(tmp_path):
    body = (
        "段落[^1][^2][^3]\n\n"
        "[^1]: [Title](https://example.com) — proper desc enough chars\n"
        "[^2]: 短\n"  # too short prose
        "[^3]: ?\n"  # too short
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_format.check(target, {}))
    assert len(violations) == 2


def test_format_plugin_metadata():
    assert footnote_format.CHECK_NAME == "footnote-format"
    assert footnote_format.DEFAULT_SEVERITY == Severity.HARD


# ════════════════════════════════════════════════════════════════════════
# footnote-density grading
# ════════════════════════════════════════════════════════════════════════


def test_grade_a_high_density(tmp_path):
    body = textwrap.dedent(
        """\
        短文 內容[^1]，再一句[^2]，第三句[^3]。

        [^1]: [src](https://e.com) — desc enough chars
        [^2]: [src2](https://e.com) — desc enough chars2
        [^3]: [src3](https://e.com) — desc enough chars3
        """
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    # Grade A → no violation yielded
    assert violations == []


def test_reference_list_never_cited_downgrades_to_c(tmp_path):
    """2026-09-20: defs exist but the body never points at them — that is a
    reading list, not citation. Two Geography drafts graded B this way."""
    body = textwrap.dedent(
        """\
        正文從頭到尾沒有任何引用標記。

        [^1]: [src](https://e.com) — desc enough chars
        [^2]: [src2](https://e.com) — desc enough chars2
        [^3]: [src3](https://e.com) — desc enough chars3
        """
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.WARN
    assert violations[0].fix_suggestion == "C"
    assert "零" in violations[0].message


def test_partially_unreferenced_defs_are_info(tmp_path):
    body = textwrap.dedent(
        """\
        只有第一條被引用[^1]。

        [^1]: [src](https://e.com) — desc enough chars
        [^2]: [src2](https://e.com) — desc enough chars2
        [^3]: [src3](https://e.com) — desc enough chars3
        [^4]: [src4](https://e.com) — desc enough chars4
        """
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    infos = [v for v in violations if v.severity == Severity.INFO]
    assert len(infos) == 1
    assert "3/4" in infos[0].message
    assert all(v.severity != Severity.WARN for v in violations)


def test_grade_b_few_footnotes(tmp_path):
    body = textwrap.dedent(
        """\
        段落內容比較長，但腳註只有一個[^1]。

        [^1]: [src](https://e.com) — desc enough chars
        """
    ) + "\n".join(["延伸"] * 100)  # inflate word count → density > 300
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    # B grade → no violation
    assert violations == []


def test_grade_c_only_inline_urls(tmp_path):
    body = "段落 https://a.com 段落 https://b.com 段落 https://c.com 又一段"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    assert len(violations) == 1
    assert violations[0].fix_suggestion == "C"


def test_grade_d_one_url(tmp_path):
    body = "段落 https://only.com 結束"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    assert len(violations) == 1
    assert violations[0].fix_suggestion == "D"


def test_grade_f_naked(tmp_path):
    body = "純文字段落沒有任何引用 沒有 URL"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_density.check(target, {}))
    assert len(violations) == 1
    assert violations[0].fix_suggestion == "F"
    assert "引用荒漠" in violations[0].message


def test_density_plugin_metadata():
    assert footnote_density.CHECK_NAME == "footnote-density"
    assert footnote_density.DEFAULT_SEVERITY == Severity.WARN


def test_both_plugins_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "footnote-format" in found
    assert "footnote-density" in found


def test_fix_prose_prefix_keeps_every_source_link(tmp_path):
    # 2026-09-25：Pattern 4 抓到第二個連結卻沒寫回去，patch 引擎組回譯文後跑
    # fixer，多來源腳註的第二個出處被刪（網址 47→44，五語卡住）。
    two = ("[^33]: 2025 年 LINE 台灣月活約 2200 萬。[Korea Herald 分析](https://www.koreaherald.com/)"
           "；[DataReportal Digital 2025 Taiwan](https://datareportal.com/reports/digital-2025-taiwan)。")
    one = "[^34]: 2005 年無名小站成立公司，進入商業化階段。[數位時代報導](https://www.bnext.com.tw/)。"
    body = f"段落[^33][^34]\n\n{two}\n{one}\n"
    path = _write(tmp_path, body)
    footnote_format.fix(load_target(path), {})
    text = path.read_text(encoding="utf-8")
    assert two in text  # 多來源：原樣保留
    assert "datareportal.com/reports/digital-2025-taiwan" in text
    assert "[^34]: [數位時代報導](https://www.bnext.com.tw/) — " in text  # 單來源：照舊改成 canonical


# ════════════════════════════════════════════════════════════════════════
# 譯文不補中文（2026-09-26）：fixer 在 babel-dispatch／patch-translate 熱路徑上
# 跑每一篇譯文，舊版一律補中文 domain 描述，十二語累積 270 處「詳見原始連結內文
# 資料補充」。
# ════════════════════════════════════════════════════════════════════════

import importlib.util as _ilu
import re as _re

_FF_PATH = Path(__file__).resolve().parents[2] / "scripts" / "tools" / "footnote-format-fix.py"
_spec = _ilu.spec_from_file_location("_ff_for_tests", _FF_PATH)
ff = _ilu.module_from_spec(_spec)
_spec.loader.exec_module(ff)
_HAN = _re.compile(r"[一-鿿]")


def _write_lang(tmp_path: Path, lang: str, body: str) -> Path:
    f = tmp_path / "knowledge" / lang / "Nature" / "x.md"
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(
        f"---\ntitle: x\ndescription: y\ndate: 2026-05-04\ntags: [t]\n---\n\n{body}",
        encoding="utf-8",
    )
    return f


def test_every_translation_language_has_a_fallback_description():
    # 新語言出生時這裡會紅：不補表，fixer 就會在那個語言 KeyError（寧可失敗也不補中文）
    for lang in ff.translation_langs():
        desc = ff.FALLBACK_DESC_BY_LANG[lang]
        assert len(desc) >= 10, lang
        assert " — " not in desc, lang  # 會跟腳註的描述分隔符混淆
        assert lang in ff.SEE_ALSO_BY_LANG, lang
        if lang != "ja":
            assert not _HAN.search(desc), lang


def test_fix_translation_missing_desc_uses_target_language(tmp_path):
    body = "Absatz[^1]\n\n[^1]: [Quelle](https://zh.wikipedia.org/wiki/X)\n"
    path = _write_lang(tmp_path, "de", body)
    assert footnote_format.fix(load_target(path), {}) == 1
    line = [l for l in path.read_text(encoding="utf-8").splitlines() if l.startswith("[^1]:")][0]
    assert line.endswith("— " + ff.FALLBACK_DESC_BY_LANG["de"])
    assert not _HAN.search(line)


def test_fix_translation_multi_link_folds_without_chinese(tmp_path):
    body = "Text[^2]\n\n[^2]: [A](https://a.example.com/x) ; [B](https://b.example.com/y)\n"
    path = _write_lang(tmp_path, "en", body)
    footnote_format.fix(load_target(path), {})
    line = [l for l in path.read_text(encoding="utf-8").splitlines() if l.startswith("[^2]:")][0]
    assert "see also B: https://b.example.com/y" in line
    assert not _HAN.search(line)
    assert "（" not in line and "；" not in line


def test_fix_original_still_uses_domain_table(tmp_path):
    body = "段落[^1]\n\n[^1]: [來源](https://zh.wikipedia.org/wiki/X)\n"
    path = _write(tmp_path, body)
    footnote_format.fix(load_target(path), {})
    assert "— 維基百科條目" in path.read_text(encoding="utf-8")


def test_standalone_fixer_keeps_translation_headings_and_descs(tmp_path):
    body = "Text\n\n## Footnotes\n\n1. [Source](https://www.cna.com.tw/news/1)\n"
    path = _write_lang(tmp_path, "en", body)
    changes, _ = ff.heal_file(path, apply=True)
    out = path.read_text(encoding="utf-8")
    assert changes >= 1
    assert "參考資料" not in out
    assert "[^1]: [Source](https://www.cna.com.tw/news/1) — " + ff.FALLBACK_DESC_BY_LANG["en"] in out


def test_standalone_fixer_all_mode_skips_every_translation_dir(tmp_path, monkeypatch):
    for d in ["History"] + sorted(ff.translation_langs()):
        (tmp_path / "knowledge" / d).mkdir(parents=True)
        (tmp_path / "knowledge" / d / "a.md").write_text("x", encoding="utf-8")
    monkeypatch.chdir(tmp_path)

    class A:
        all, stdin, files = True, False, []

    got = ff.collect_files(A())
    assert [p.parts[1] for p in got] == ["History"]
