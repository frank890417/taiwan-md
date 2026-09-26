import importlib.util
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location(
    "verify_translation",
    ROOT / "scripts/tools/lang-sync/verify-translation.py",
)
VERIFY = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFY)


def test_detect_lang_repo_relative_paths():
    assert VERIFY.detect_lang("knowledge/ar/People/example.md") == "ar"
    assert VERIFY.detect_lang("ja/People/example.md") == "ja"


def test_detect_lang_absolute_path():
    assert (
        VERIFY.detect_lang("/Users/test/taiwan-md/knowledge/pt/Food/example.md")
        == "pt"
    )


def test_detect_lang_run_quarantine_path():
    assert (
        VERIFY.detect_lang("/private/tmp/babel-run/quarantine/ru--example.md")
        == "ru"
    )


def test_detect_lang_legacy_fallback():
    assert VERIFY.detect_lang("/tmp/unknown/example.md") == "en"


def test_extract_urls_ignores_markdown_backslash_escapes():
    zh = "[檔案頁](https://commons.wikimedia.org/wiki/File:Ruisui,_Hualien_County,_Taiwan.jpg)"
    tr = "[File](https://commons.wikimedia.org/wiki/File:Ruisui,\\_Hualien_County,\\_Taiwan.jpg)"
    assert VERIFY.extract_urls(zh) == VERIFY.extract_urls(tr)
    paren = "[獎](https://zh.wikipedia.org/zh-tw/最佳客語專輯獎_\\(金曲獎\\))"
    plain = "[award](https://zh.wikipedia.org/zh-tw/最佳客語專輯獎_(金曲獎))"
    assert VERIFY.extract_urls(paren) == VERIFY.extract_urls(plain)


def test_extract_urls_still_catches_real_url_changes():
    a = VERIFY.extract_urls("https://example.com/a_b/%E7%B8%BD")
    b = VERIFY.extract_urls("https://example.com/a_b/%E7%B8%BA")
    assert a != b



def _tags_check(tmp_path, ja_tags, zh="People/林啟維.md"):
    """zh 側用庫裡真的 People/林啟維.md（tags: 創業／Portaly／PLG／AI／SaaS／創作者經濟），
    verify-translation 會把 zh 參數解析到 knowledge/ 底下，暫存目錄放不了。"""
    import json
    import subprocess
    import sys

    ja = tmp_path / "ja--example.md"
    ja.write_text(
        f"---\ntitle: 'リン・チーウェイ'\ntags: {ja_tags}\n---\n\n本文。\n",
        encoding="utf-8",
    )
    out = subprocess.run(
        [sys.executable, str(ROOT / "scripts/tools/lang-sync/verify-translation.py"),
         zh, str(ja), "--json"],
        capture_output=True, text=True, cwd=ROOT,
    ).stdout
    checks = json.loads(out)["checks"]
    return next(c for c in checks if c["name"] == "tags not identical to zh")["level"]


def test_ja_tags_latin_brand_names_do_not_count_as_untranslated(tmp_path):
    ja = "['起業', 'Portaly', 'PLG', 'AI', 'SaaS', 'クリエイターエコノミー']"
    assert _tags_check(tmp_path, ja) == "PASS"


def test_ja_tags_verbatim_chinese_copy_still_fails(tmp_path):
    ja = "['創業', 'Portaly', 'PLG', 'AI', 'SaaS', '創作者經濟']"
    assert _tags_check(tmp_path, ja) == "FAIL"


def test_ja_tags_shared_kanji_majority_passes_when_rest_translated(tmp_path):
    # 產線隔離樣本原形：新竹米粉／米粉／新竹日文同字，另兩個譯成日文
    ja = "['新竹米粉', '米粉', '新竹', '台湾食文化', '食品表示']"
    assert _tags_check(tmp_path, ja, zh="Food/新竹米粉.md") == "PASS"


def test_ja_tags_whole_array_untouched_still_fails(tmp_path):
    ja = "['新竹米粉', '米粉', '新竹', '台灣飲食', '食品標示']"
    assert _tags_check(tmp_path, ja, zh="Food/新竹米粉.md") == "FAIL"


def test_extract_urls_ignores_italic_underscore_closer():
    # prettier 把 *斜體* 改寫成 _斜體_；母稿星號收尾、譯文底線收尾，網址要一樣
    zh = "*圖片頁：https://commons.wikimedia.org/wiki/File:Port_of_Kaohsiung_map.svg。*"
    tr = "_그림 페이지: https://commons.wikimedia.org/wiki/File:Port_of_Kaohsiung_map.svg._"
    assert VERIFY.extract_urls(zh) == VERIFY.extract_urls(tr)
    assert VERIFY.extract_urls(tr) == ["https://commons.wikimedia.org/wiki/File:Port_of_Kaohsiung_map.svg"]
