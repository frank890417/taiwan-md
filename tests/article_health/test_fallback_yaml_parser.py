"""Tests for the minimal YAML frontmatter fallback parser.

背景：`_parse_frontmatter_minimal` 是 article-health.py 在**沒有 PyYAML** 時
走的 fallback 路徑。CI 的 pr-frontmatter-gate.yml 註解寫
「article-health.py 是純 stdlib，不需 pip install」——而 ubuntu 的 python3
確實沒有 PyYAML。也就是說 **CI 一直跑的就是這條 fallback 路徑**。

fallback 一旦跟 PyYAML 的解析結果不一致，症狀不是「工具報錯」，
而是**大批文章被誤判成內容違規**（hard fail），貢獻者看到的是
「frontmatter `tags` 必須是 YAML array，不可為字串」——但他們的 frontmatter
完全正確，紅的是「這台機器沒有 PyYAML」。

每個 case 底下都標著真實檔案形狀與「修之前會壞成什麼」，
避免後人把它當成可有可無的邊界測試刪掉。
"""

import builtins
import textwrap

import pytest

from lib.article_health.loader import _parse_frontmatter_minimal


def _parse_without_pyyaml(yaml_text: str) -> dict:
    """跑出 fallback 路徑的結果（假裝 yaml 模組不存在）。

    loader 的 fallback 是 `try: import yaml / except ImportError: pass`，
    這裡用 import hook 擋掉 yaml，確保測的是 fallback 而不是 PyYAML。
    """
    real_import = builtins.__import__

    def blocked(name, *args, **kwargs):
        if name == "yaml" or name.startswith("yaml."):
            raise ImportError("blocked for test")
        return real_import(name, *args, **kwargs)

    builtins.__import__ = blocked
    try:
        return _parse_frontmatter_minimal(yaml_text)
    finally:
        builtins.__import__ = real_import


# ── (a) 跨行 flow array ───────────────────────────────────────────────
# 全庫 11,085 個 zh-TW 檔的 tags 是這個形狀（prettier 折行後）。
# 修之前：tags → ""（字串）→ frontmatter-format 報「必須是 YAML array」hard fail。


def test_multiline_flow_array_tags_is_list():
    fm = textwrap.dedent(
        """\
        title: 'Mini Taiwan Pulse'
        tags:
          [
            'Technology',
            '公民科技',
            '開放資料',
          ]
        """
    )
    result = _parse_without_pyyaml(fm)
    assert result["tags"] == ["Technology", "公民科技", "開放資料"]


def test_multiline_flow_array_bracket_on_next_line():
    """`tags:` 換行後第一行就是 `[`（另一種 prettier 折行）。"""
    fm = textwrap.dedent(
        """\
        tags:
          [
            'a',
          ]
        """
    )
    assert _parse_without_pyyaml(fm)["tags"] == ["a"]


def test_single_line_flow_array_still_works():
    fm = "tags: ['a', 'b', 'c']\n"
    assert _parse_without_pyyaml(fm)["tags"] == ["a", "b", "c"]


def test_flow_array_with_inline_comment():
    """陣列元素裡的 `#` 不是註解（前面沒有空白）。"""
    fm = "tags: ['c#', 'python#']\n"
    assert _parse_without_pyyaml(fm)["tags"] == ["c#", "python#"]


# ── (b) block sequence ────────────────────────────────────────────────
# relatedDiary / sporeLinks / datasets 等欄位用這個形狀。


def test_block_sequence_scalar_items():
    fm = textwrap.dedent(
        """\
        relatedDiary:
          - 2026-06-19-115522-manual
          - 2026-07-01-093000-manual
        """
    )
    assert _parse_without_pyyaml(fm)["relatedDiary"] == [
        "2026-06-19-115522-manual",
        "2026-07-01-093000-manual",
    ]


def test_block_sequence_quoted_items():
    fm = textwrap.dedent(
        """\
        relatedDiary:
          - '2026-06-19-115522-manual'
        """
    )
    assert _parse_without_pyyaml(fm)["relatedDiary"] == [
        "2026-06-19-115522-manual"
    ]


# ── (c) nested mapping ────────────────────────────────────────────────
# rationale 的四個子鍵有兩種縮排：2 空格，以及**完全頂格**。
# 頂格那種在 knowledge/Lifestyle/戰鬥陀螺.md 之類的檔案裡。
# 修之前（頂格）→ rationale → ""（字串）→ rationale-presence 報
# 「必須是 YAML mapping (nested keys)」hard fail。


def test_nested_mapping_indented_children():
    fm = textwrap.dedent(
        """\
        rationale:
          why_this_hook: '開場畫面'
          whats_excluded: '不寫二手市場'
        """
    )
    result = _parse_without_pyyaml(fm)
    assert result["rationale"] == {
        "why_this_hook": "開場畫面",
        "whats_excluded": "不寫二手市場",
    }


def test_nested_mapping_flush_left_children():
    """頂格子鍵是合法 YAML——子鍵可以跟父鍵同縮排。"""
    fm = textwrap.dedent(
        """\
        rationale:
        why_this_hook: '以清晨排隊的真實畫面開場'
        whats_excluded: '不寫各世代動畫劇情細節'
        """
    )
    result = _parse_without_pyyaml(fm)
    assert result["rationale"] == {
        "why_this_hook": "以清晨排隊的真實畫面開場",
        "whats_excluded": "不寫各世代動畫劇情細節",
    }


def test_nested_mapping_flush_left_does_not_swallow_next_top_level_key():
    """頂格子鍵只認 well-known 的四個——不能把下一個同層 key 吃進來。"""
    fm = textwrap.dedent(
        """\
        rationale:
        why_this_hook: '開場'
        category: 'Culture'
        """
    )
    result = _parse_without_pyyaml(fm)
    assert result["rationale"] == {"why_this_hook": "開場"}
    assert result["category"] == "Culture"


def test_nested_mapping_with_nested_sequence_value():
    fm = textwrap.dedent(
        """\
        rationale:
          whats_excluded:
            - '韓國 hagwon 系統性指派英文名'
            - '星巴克英文名點餐「全民日常」'
        """
    )
    result = _parse_without_pyyaml(fm)
    assert result["rationale"]["whats_excluded"] == [
        "韓國 hagwon 系統性指派英文名",
        "星巴克英文名點餐「全民日常」",
    ]


# ── (d) 行尾註解 ──────────────────────────────────────────────────────
# knowledge/Culture/台灣外來語與語言接觸.md 的 terminology_exempt 寫成
# `terminology_exempt: true # article subject IS cross-strait borrowing/contact terms`
# 修之前 → 值變成 "true # ..."（字串）→ terminology check 誤報中國用語「視頻」。


def test_inline_comment_stripped_from_bool():
    fm = (
        "terminology_exempt: true "
        "# article subject IS cross-strait borrowing/contact terms\n"
    )
    assert _parse_without_pyyaml(fm)["terminology_exempt"] is True


def test_inline_comment_stripped_from_string():
    fm = "author: 'Someone' # 主要作者\n"
    assert _parse_without_pyyaml(fm)["author"] == "Someone"


def test_hash_inside_quoted_string_is_not_a_comment():
    fm = "title: 'C# 與 F# 語言'\n"
    assert _parse_without_pyyaml(fm)["title"] == "C# 與 F# 語言"


def test_hash_without_leading_space_is_not_a_comment():
    fm = "slug: a#b\n"
    assert _parse_without_pyyaml(fm)["slug"] == "a#b"


# ── (e) 回歸：不許把既有行為弄壞 ─────────────────────────────────────


def test_scalar_types_unchanged():
    fm = textwrap.dedent(
        """\
        title: '某篇文章'
        date: 2026-03-21
        featured: false
        readingTime: 12
        """
    )
    result = _parse_without_pyyaml(fm)
    assert result["title"] == "某篇文章"
    assert result["date"] == "2026-03-21"
    assert result["featured"] is False
    assert result["readingTime"] == 12


def test_pyyaml_and_fallback_agree_on_tags_array():
    """關鍵不變式：兩條路徑對 tags 的判斷必須一致。

    這是整個修補的樞紐——fallback 判錯 tags 的型別，
    frontmatter-format 就會把 11,085 個檔案判成 hard fail。
    """
    yaml = pytest.importorskip("yaml")
    fm = textwrap.dedent(
        """\
        title: '測試'
        tags:
          [
            'a',
            'b',
          ]
        """
    )
    ref = yaml.safe_load(fm)
    got = _parse_without_pyyaml(fm)
    assert got["tags"] == ref["tags"]
    assert isinstance(got["tags"], list)


# ── 引號語意：以下五個 case 是 2026-10-21 twmd-maintainer-daily 補的 ──────
#
# 上面那組 case 把「跨行 flow array 認不認得」修好了（tags 型別不再判錯），
# 但同一支 fallback 對**引號**還有三個跟 PyYAML 不一致的地方。
# 這些不一致不會讓任何閘門變紅，所以不會有人來報——它們讓
# 「這台機器有沒有裝 PyYAML」變成 tags 與 title **內容**的隱性變數。
# 一道只關了一半的閘門，讀起來跟關好的一模一樣（REFLEXES #82／#83）。
#
# 落檔時全庫實測：tags 54 檔不一致、title 37 檔不一致 → 補完後兩者都是 0。


def test_single_quote_escape_is_unescaped_in_title():
    """`''` 在 YAML 單引號字串裡是一個 `'`，不是兩個。

    修之前：`title: 'Hla''alua: …'` 在沒有 PyYAML 的機器上留下
    `Hla''alua`，裝了 PyYAML 的機器讀到 `Hla'alua`——同一個檔兩種標題。
    真實檔案：knowledge/en/Culture/hla-alua-people.md（全庫 37 檔同型）。
    """
    yaml = pytest.importorskip("yaml")
    fm = "title: 'Hla''alua: From \"Southern Tsou\" to Their Own Name'\n"
    ref = yaml.safe_load(fm)
    got = _parse_without_pyyaml(fm)
    assert got["title"] == ref["title"]
    assert got["title"].startswith("Hla'alua")
    assert "''" not in got["title"]


def test_flow_array_does_not_split_inside_quoted_scalar():
    """逗號在引號裡面不是分隔符。

    修之前：切逗號的正則看不見引號，
    `['拉阿魯哇族', 'Hla''alua, 聖貝祭, 原住民族, 族語復振']`
    被切成五項，PyYAML 讀到的是兩項（第二項是一個含逗號的字串）。
    真實檔案：knowledge/Culture/拉阿魯哇族.md。
    """
    yaml = pytest.importorskip("yaml")
    fm = "tags: ['拉阿魯哇族', 'Hla''alua, 聖貝祭, 原住民族, 族語復振']\n"
    ref = yaml.safe_load(fm)
    got = _parse_without_pyyaml(fm)
    assert got["tags"] == ref["tags"]
    assert len(got["tags"]) == 2


def test_apostrophe_inside_plain_scalar_is_literal():
    """plain scalar 詞中間的 `'` 是字面值，不開啟 quoted scalar。

    修之前：把 `jeux d'enfance` 的那個撇號當成字串開頭，
    於是整行剩下的內容被吞成一項（六項變一項）。
    真實檔案：knowledge/fr/Lifestyle/wang-a-piau-pog-cards.md（fr 共 9 檔同型）。
    """
    yaml = pytest.importorskip("yaml")
    fm = "tags:\n  [jeux d'enfance, wang-a-piau, culture taïwanaise, jeux]\n"
    ref = yaml.safe_load(fm)
    got = _parse_without_pyyaml(fm)
    assert got["tags"] == ref["tags"]
    assert len(got["tags"]) == 4


def test_double_quoted_item_keeps_apostrophe_and_comma():
    """雙引號項目裡的撇號與逗號都該原樣留著。

    真實檔案：knowledge/fr/Geography/beida-special-district-sanxia.md
    的 `"Boulevard de l'Art"` 跟它後面那一項。
    """
    yaml = pytest.importorskip("yaml")
    fm = "tags: ['Sanxia', \"Boulevard de l'Art\", 'Ligne Sanying']\n"
    ref = yaml.safe_load(fm)
    got = _parse_without_pyyaml(fm)
    assert got["tags"] == ref["tags"]
    assert "Boulevard de l'Art" in got["tags"]


def test_value_wrapped_in_quotes_only_loses_one_pair():
    """只脫一對成對的引號，不是剝掉兩端所有引號字元。

    修之前用 `.strip("'\\"")`，值本身以引號收尾時會被多吃一層。
    """
    yaml = pytest.importorskip("yaml")
    fm = "tags: ['他說「這不是終點」', '引號結尾\"']\n"
    ref = yaml.safe_load(fm)
    got = _parse_without_pyyaml(fm)
    assert got["tags"] == ref["tags"]
