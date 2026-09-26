import importlib.util
import re
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "cjk-adjacency-check.py"
SPEC = importlib.util.spec_from_file_location("cjk_adjacency_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_latin_class_covers_vietnamese_diacritics():
    for ch in "aZàÀđĐảẢỹỸ":
        assert re.fullmatch(f"[{MODULE.LATIN}]", ch), ch


def test_latin_class_excludes_devanagari_cyrillic_arabic():
    # hi 的句號「।」曾被當成拉丁字母，照片署名的漢字接句號就判黏著
    for ch in "।कЖжعα":
        assert not re.fullmatch(f"[{MODULE.LATIN}]", ch), ch


def _scan_text(tmp_path, body):
    path = tmp_path / "example.md"
    path.write_text("---\ntitle: 'x'\n---\n\n" + body + "\n", encoding="utf-8")
    return MODULE.scan(path)


def test_hanzi_credit_before_devanagari_danda_is_not_flagged(tmp_path):
    # hi〈中山北路條通〉的照片署名：保留原文的漢字人名後面直接接句號「।」
    assert _scan_text(tmp_path, "तस्वीर: 玄史生। [CC BY-SA 4.0](https://example.com)") == []
    assert _scan_text(tmp_path, "तस्वीर: 李火增। [सार्वजनिक डोमेन](https://example.com)") == []


def test_hanzi_next_to_cyrillic_or_arabic_punctuation_is_not_flagged(tmp_path):
    assert _scan_text(tmp_path, "Фото: 玄史生، и ещё текст") == []


def test_vietnamese_glued_to_hanzi_is_still_flagged(tmp_path):
    assert _scan_text(tmp_path, "Công trình được拆除 vào năm 2020.")


def test_decomposed_vietnamese_tone_mark_glued_to_hanzi_is_still_flagged(tmp_path):
    # 分解形（NFD）：字尾是組合附加符號 U+0309，緊接漢字
    assert _scan_text(tmp_path, "Người ta trả拆 nó đi.")


def test_mixed_name_written_that_way_in_zh_source_is_exempt_without_zh_flag(tmp_path):
    # 〈雷亞遊戲〉的作曲家名字就叫 VK克；沒給 --zh 也要從 translatedFrom 找到原稿豁免
    path = tmp_path / "ru--rayark.md"
    path.write_text("---\ntitle: 'x'\ntranslatedFrom: 'Technology/雷亞遊戲.md'\n---\n\n"
                    "Музыку написал VK克 для игры.\n", encoding="utf-8")
    assert MODULE.scan(path) == []
