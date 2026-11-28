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


def test_approximate_chinese_numeral_counts_as_a_twin(tmp_path):
    # 「一千多億」＝1,000 億以上；譯成 more than NT$100 billion 是對的，
    # 不該讓另一處「100億」（10 billion）被報成沒換算
    zh = "政府補貼一千多億元，另有利息 100億 元。"
    out = "Subsidies exceeded NT$100 billion, plus NT$10 billion in interest."
    assert run(tmp_path, zh, out, "en") == []


def test_arabic_approximate_figure_is_still_checked(tmp_path):
    hits = run(tmp_path, "累計 1,000多億 元。", "A cumulative 1,000 billion dollars.", "en")
    assert len(hits) == 1


def test_bare_magnitude_idiom_counts_as_a_twin(tmp_path):
    # 「百天破億」正確譯成 100 million，不該讓另一處「100 萬觀看」被報成沒換算
    zh = "影片十天達到 100 萬觀看。標題寫〈網友：百天破億〉。"
    out = "The video reached 1 million views in ten days. Headline: '100 million in 100 days'."
    assert run(tmp_path, zh, out, "en") == []


def test_bare_magnitude_idiom_explains_only_one_occurrence(tmp_path):
    # 慣用語只有一處，譯文兩處 100 million，多出來的那處仍然要報
    zh = "影片十天達到 100 萬觀看。標題寫〈網友：百天破億〉。"
    out = "The video reached 100 million views in ten days. Headline: '100 million in 100 days'."
    hits = run(tmp_path, zh, out, "en")
    assert len(hits) == 1 and "差 100 倍" in hits[0]


def test_without_the_idiom_the_miss_is_still_caught(tmp_path):
    zh = "影片十天達到 100 萬觀看。"
    out = "The video reached 100 million views in ten days."
    assert len(run(tmp_path, zh, out, "en")) == 1


ZH_CHAIN = "總發送量為 47 億 802 萬 4,465 則。"


def test_three_part_chain_that_adds_up_is_rewritten_not_handed_to_a_human(tmp_path):
    # 寫對的鏈以前一律報「更長的鏈」，永遠過不了閘
    out = "Tổng cộng 4 tỷ 708 triệu 24.465 tin nhắn."
    new, fixed, unresolved = MODULE.split_scan(ZH_CHAIN, out, "vi")
    assert unresolved == []
    assert len(fixed) == 1
    assert "4.708.024.465" in new and "tỷ" not in new


def test_three_part_chain_with_a_wrong_middle_reports_the_value_it_adds_up_to(tmp_path):
    # 802 萬被寫成 780 triệu：仍然要擋，而且訊息要看得出算出來是多少
    hits = run(tmp_path, ZH_CHAIN, "Tổng cộng 4 tỷ 780 triệu 24.465 tin nhắn.", "vi")
    assert len(hits) == 1
    assert "4,780,024,465" in hits[0] and "找不到" in hits[0]


def test_chain_with_a_decimal_head_is_still_left_to_a_human(tmp_path):
    hits = run(tmp_path, ZH_CHAIN, "Tổng cộng 4,5 tỷ 708 triệu 24.465 tin nhắn.", "vi")
    assert any("更長的鏈" in h for h in hits)
