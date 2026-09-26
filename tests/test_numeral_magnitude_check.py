import importlib.util
from pathlib import Path


LANG_SYNC_DIR = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync"
MODULE_PATH = LANG_SYNC_DIR / "numeral-magnitude-check.py"
SPEC = importlib.util.spec_from_file_location("numeral_magnitude_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def run(tmp_path, zh, out, lang):
    zh_path = tmp_path / "zh.md"
    out_path = tmp_path / f"{lang}.md"
    zh_path.write_text(zh, encoding="utf-8")
    out_path.write_text(out, encoding="utf-8")
    return MODULE.check(zh_path, out_path, lang)


def test_unconverted_magnitude_is_still_caught(tmp_path):
    hits = run(tmp_path, "攤位共 23.3萬 攤。", "कुल 23.3 लाख स्टॉल हैं।", "hi")
    assert len(hits) == 1
    assert "差 10 倍" in hits[0]


def test_mil_is_read_as_the_whole_word_millones(tmp_path):
    # 「mil」是「millones」的前綴：`500 millones` 不能被讀成 `500 mil`
    hits = run(tmp_path, "罰款 500萬 元。", "Una multa de 500 millones.", "es")
    assert len(hits) == 1
    assert "500 millones" in hits[0]
    assert "「500 mil」" not in hits[0]


def test_figure_that_converts_another_zh_figure_is_not_flagged(tmp_path):
    # 中文同時有 500萬 與 5億；`500 millones` 是 5億 的正確換算
    zh = "罰款 500萬 元，總預算 5億 元。"
    out = "Multa de 5 millones; presupuesto de 500 millones."
    assert run(tmp_path, zh, out, "es") == []


def test_twin_explains_only_as_many_occurrences_as_zh_has(tmp_path):
    zh = "罰款 500萬 元，總預算 5億 元。"
    out = "Multa de 500 millones; presupuesto de 500 millones."
    assert len(run(tmp_path, zh, out, "es")) == 1


def test_space_grouped_number_tail_is_not_a_separate_figure(tmp_path):
    # NHK 的 5,901 億日圓 → `590 100 millones`，其中的 `100 millones` 不是「100萬」
    zh = "下載目標 100萬 次，NHK 收入 5,901億 日圓。"
    out = "Objetivo de 1 millón de descargas; ingresos de 590 100 millones de yenes."
    assert run(tmp_path, zh, out, "es") == []


def test_year_before_a_figure_is_not_a_digit_group(tmp_path):
    hits = run(tmp_path, "目標 100萬 人。", "En 2025 100 millones de personas.", "es")
    assert len(hits) == 1


def test_ratio_below_one_reports_the_real_factor(tmp_path):
    hits = run(tmp_path, "同時在線 150萬 人。", "Pengguna serentak 150 ribu orang.", "id")
    assert len(hits) == 1
    assert "差 10 倍" in hits[0]


def test_chinese_numeral_twin_explains_the_coincidence(tmp_path):
    # 「五億元」譯成 500 million 是對的；另一處「500萬劑」被它撞到數字串
    zh = "疫苗首批 500萬 劑抵台。童子賢捐五億元。"
    out = "The first 5 million doses arrived. Tung Tzu-hsien donated NT$500 million."
    assert run(tmp_path, zh, out, "en") == []


def test_chinese_numeral_parser():
    assert MODULE._cn_int("五") == 5
    assert MODULE._cn_int("五百") == 500
    assert MODULE._cn_int("兩千") == 2000
    assert MODULE._cn_int("十") == 10
    assert MODULE._cn_int("一百二十") == 120
