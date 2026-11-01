"""Tests for footnote_reference plugin.

背景：2026-10-20 全庫掃描發現 708 處斷腳註（正文引用 `[^N]`，文章裡沒有
`[^N]:` 定義），分佈在 116 個檔。這一支是那個洞的儀器化。

2026-10-21 改寫：判準全部改成跟 `src/utils/article-render.ts` 的
`processFootnotes()` **逐字對齊**。理由：2026-08-28「徹底處理那一輪」用
Python 重寫 renderer 的規則去估算影響範圍，得到「零風險」的錯答案——
兩邊 regex 長得一樣，量出的卻是完全不同的行為（見
`docs/semiont/memory/2026-08-28-005518-footnote-cards.md`）。

對齊的四件事（詳見 check 模組的 docstring）：
1. label 字符集是 `[^\\]]+`（任何非 `]` 字元），不是 `[0-9a-zA-Z_-]+`
2. 引用掃描不看後面有沒有冒號（舊版這裡有 `(?!:)`，是 907 檔斷腳註的根因）
3. **不跳** code fence（renderer 不跳）
4. 純空白的定義等於沒定義（renderer 是 `definitions[label].trim()` 後用
   `if (!definitions[label])` 判斷）

`tests/article-footnote.test.mjs` 直接 import 真的 `renderArticleHtml()` 跑
真實渲染結果驗同一組邊界；這裡的 Python 常數是它的鏡像。
"""

from pathlib import Path

from lib.article_health import registry
from lib.article_health.checks import footnote_reference
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


def _labels(violations) -> list[str]:
    """Extract the dangling labels from the violation message.

    The message also contains the fix hint `[^N]:` — the negative lookahead
    excludes it, since it is followed by a colon (i.e. it is a definition
    template, not a reported label).
    """
    import re

    out = []
    for v in violations:
        out.extend(re.findall(r"\[\^([^\]]+)\](?!:)", v.message))
    return out


# ════════════════════════════════════════════════════════════════════════
# 基本行為
# ════════════════════════════════════════════════════════════════════════


def test_matched_ref_and_def_no_violation(tmp_path):
    body = "段落[^1]。\n\n[^1]: [Title](https://example.com) — desc enough chars\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_dangling_ref_flagged(tmp_path):
    """正文引用 [^2] 但只有 [^1] 的定義 → [^2] 落空。"""
    body = (
        "段落[^1][^2]。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert violations[0].severity == Severity.WARN
    assert _labels(violations) == ["2"]


def test_multiple_dangling_refs_counted_once_each(tmp_path):
    body = (
        "段落[^1][^2][^3][^2]。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert sorted(_labels(violations)) == ["2", "3"]


def test_no_defs_at_all(tmp_path):
    """全文沒有定義行 → 所有引用落空。

    這跟 renderer 的 `if (Object.keys(definitions).length === 0) return md;`
    一致：沒有任何定義時 renderer 原封不動回傳，所有引用都是殘留。
    """
    body = "段落[^1][^2]。\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert sorted(_labels(violations)) == ["1", "2"]


def test_no_footnotes_at_all_no_violation(tmp_path):
    body = "純文字段落，沒有任何腳註。\n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


# ════════════════════════════════════════════════════════════════════════
# 2026-10-21 修掉的那個缺陷：行中 `[^N]:` 必須算引用
# ════════════════════════════════════════════════════════════════════════


def test_midline_ref_with_ascii_colon_is_a_reference(tmp_path):
    """行中 `[^1]:`（ASCII 冒號）是**真的引用**，不是定義行。

    這是被 `(?!:)` lookahead 排除掉的形狀，也是 907 檔斷腳註的根因。
    譯本被 LLM 轉成 ASCII 冒號 → 撞上 lookahead → 讀者看到孤兒字面。
    """
    body = (
        "台積電的先進製程是產業命脈[^1]: 2024 年全球市佔近九成。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == [], f"行中 [^1]: 必須算引用: {violations}"


def test_midline_ref_with_fullwidth_colon_is_a_reference(tmp_path):
    """全形冒號 `[^1]：` 是 zh-TW 母稿的形狀，一直都正常。"""
    body = (
        "台積電的先進製程是產業命脈[^1]：2024 年全球市佔近九成。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_midline_ref_with_colon_and_no_def_is_dangling(tmp_path):
    """行中 `[^2]:` 沒有對應定義 → 照報（reader 看得到字面殘留）。"""
    body = (
        "台積電的先進製程是產業命脈[^2]: 2024 年全球市佔近九成。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert _labels(violations) == ["2"]


# ════════════════════════════════════════════════════════════════════════
# 跟 renderer 對齊的邊界（2026-10-21）
# ════════════════════════════════════════════════════════════════════════


def test_non_ascii_label_supported(tmp_path):
    """renderer 的 label 字符集是 `[^\\]]+`——任何非 `]` 字元。

    舊版這裡用 `[0-9a-zA-Z_-]+`，比 renderer 窄 → 漏報 143 處。
    """
    body = (
        "段落[^台灣][^剩食-新聞市場]。\n\n"
        "[^台灣]: [Title](https://example.com) — desc enough chars\n"
        "[^剩食-新聞市場]: [Other](https://example.org) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_non_ascii_label_dangling_flagged(tmp_path):
    body = (
        "段落[^台灣]。\n\n"
        "[^剩食-新聞市場]: [Other](https://example.org) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert _labels(violations) == ["台灣"]


def test_ref_inside_code_fence_is_flagged(tmp_path):
    """code fence 裡的 `[^2]` **要報**——renderer 不跳 fence。

    舊版這裡跳 fence → 兩邊對不上。實測全庫有 451 檔的 fence 裡有 `[^N]`，
    其中 13 檔的 label 沒有定義（fence 裡的 `[^N]` 在站上同樣是字面殘留）。
    """
    body = (
        "段落[^1]。\n\n"
        "```markdown\n"
        "正文[^2] 是壞的引用。\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n"
        "```\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert _labels(violations) == ["2"]


def test_blank_definition_counts_as_undefined(tmp_path):
    """純空白的定義等於沒定義。

    renderer 是 `definitions[label] = content.trim()` 再用
    `if (!definitions[label])` 判斷 → 空白 = falsy = 未定義。
    """
    body = "段落[^1]。\n\n[^1]:   \n"
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert _labels(violations) == ["1"]


def test_indented_definition_is_not_a_definition(tmp_path):
    """定義行必須在**行首**——縮排 4 空格的 `[^1]:` 不算定義。"""
    body = (
        "段落[^1]。\n\n"
        "    [^1]: [Title](https://example.com) — desc enough chars\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    assert _labels(violations) == ["1"]


def test_multiline_definition_counts_as_defined(tmp_path):
    """多行定義（內容延續到下一段）仍然算有定義。

    renderer 的 def regex 是 `(.+?)(?=\\n\\[\\^|\\n\\n|\\n#|\\n---|\\s*$)`。
    """
    body = (
        "段落[^1]。\n\n"
        "[^1]: [Title](https://example.com)\n"
        "    這是定義的第二行，說明文字。\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert violations == []


def test_unclosed_bracket_label_spans_lines(tmp_path):
    """忘了收尾的 `[^` typo → label 橫跨多行，掃描要能抓到。

    renderer 的 label 字符集 `[^\\]]+` 會連換行一起吃，所以這種 typo 的
    label 是「從 `[^` 到下一個 `]` 為止」的一整段。逐行掃會把它誤拆成
    好幾個短 label → 抓不到真正的問題。
    """
    body = (
        "文字[^壞掉的\n\n下一段沒有結尾。\n\n"
        "[^1]: [Title](https://example.com) — desc enough chars\n\n"
        "後面有]這個字\n"
    )
    target = load_target(_write(tmp_path, body))
    violations = list(footnote_reference.check(target, {}))
    assert len(violations) == 1
    labels = _labels(violations)
    assert len(labels) == 1
    assert "\n" in labels[0], f"label 應該橫跨多行: {labels[0]!r}"


# ════════════════════════════════════════════════════════════════════════
# plugin metadata
# ════════════════════════════════════════════════════════════════════════


def test_plugin_metadata():
    assert footnote_reference.CHECK_NAME == "footnote-reference"
    assert footnote_reference.DEFAULT_SEVERITY == Severity.WARN


def test_plugin_registered():
    registry.reset_registry()
    found = registry.discover_checks()
    assert "footnote-reference" in found
