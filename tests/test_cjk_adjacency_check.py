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
