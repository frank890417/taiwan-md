"""母稿腳註編號重複的自檢。正控制與負控制都要有：量得到重複，也不把正常文章報成重複。"""
import importlib.util
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts/tools/lang-sync/babel-preflight.py"
SPEC = importlib.util.spec_from_file_location("babel_preflight_fn", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_duplicate_definition_is_reported():
    text = "內文[^1]，又一句[^2]。\n\n[^1]: a\n\n[^2]: b\n\n[^2]: c\n"
    assert MODULE.duplicate_footnote_ids(text) == ["2"]


def test_repeated_inline_reference_is_not_a_duplicate():
    text = "內文[^1]，同一條再引一次[^1]。\n\n[^1]: a\n\n[^2]: b\n"
    assert MODULE.duplicate_footnote_ids(text) == []


def test_indented_or_quoted_definition_like_text_is_ignored():
    text = "說明：`[^1]: 範例` 寫在句中不算定義。\n\n[^1]: a\n"
    assert MODULE.duplicate_footnote_ids(text) == []
