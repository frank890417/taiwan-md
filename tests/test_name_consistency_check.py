import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "name-consistency-check.py"
SPEC = importlib.util.spec_from_file_location("name_consistency_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_latin_before_han_takes_the_name_not_the_sentence():
    text = "Two years later, names like Greg Hsu (許光漢) and Liu Kuan-ting (劉冠廷) became household names."
    assert MODULE.gloss_pairs(text) == [("許光漢", "Greg Hsu"), ("劉冠廷", "Liu Kuan-ting")]


def test_multiword_awards_and_troupes_are_kept_whole():
    text = "It won the Golden Bell Awards (金鐘獎) with Cloud Gate Dance Theatre (雲門舞集) on stage."
    assert ("金鐘獎", "Golden Bell Awards") in MODULE.gloss_pairs(text)
    assert ("雲門舞集", "Cloud Gate Dance Theatre") in MODULE.gloss_pairs(text)


def test_leading_function_word_is_dropped():
    assert MODULE.gloss_pairs("Le Xueshan (雪山) est haut.") == [("雪山", "Xueshan")]


def test_han_before_latin_gloss():
    assert MODULE.gloss_pairs("許光漢 (Greg Hsu) 主演") == [("許光漢", "Greg Hsu")]
