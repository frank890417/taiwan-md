import importlib.util
import unicodedata
from pathlib import Path


LANG_SYNC_DIR = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync"
MODULE_PATH = LANG_SYNC_DIR / "target-language-check.py"
SPEC = importlib.util.spec_from_file_location("target_language_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)

FM = "---\ntitle: t\n---\n"
ID_LINE = "Artikel ini membahas sejarah dan budaya yang ada di Taiwan untuk para pembaca."


def test_hangul_tail_drift_still_fails():
    text = FM + ID_LINE + "\n\n[^1]: 대만 제지 산업의 위기와 국제 경쟁력\n\n[^2]: 쭝싱 제지 공장의 전후 변화와 역사\n"
    verdict, note = MODULE.foreign_script_check(text, "id")
    assert verdict == "fail"
    assert "韓文漂入[ko]" in note


def test_arabic_footnote_drift_in_latin_article_fails():
    # id〈線上社群遷徙〉的腳註描述整段是阿拉伯文（2026-09-26 全庫掃描實例）
    text = FM + ID_LINE + "\n\n[^16]: — نقد أكاديمي للمنصة ومراجعة لتاريخها\n\n[^17]: — في مقالة عن إغلاق الموقع وتأثيره\n"
    verdict, note = MODULE.foreign_script_check(text, "id")
    assert verdict == "fail"
    assert note.startswith("阿拉伯文漂入[ar]")
    assert "L6" in note  # 行號對得回原檔：frontmatter 三行、正文、空行，腳註在第 6 行


def test_single_devanagari_fragment_in_korean_warns():
    # ko〈便利商店文化〉段落之間掉了一截「ीकरण」：ko 以前完全不查
    text = FM + "편의점은 대만 생활의 중심입니다.\n\nीकरण\n\n편의점 문화는 계속 변하고 있습니다.\n"
    verdict, note = MODULE.foreign_script_check(text, "ko")
    assert verdict == "warn"
    assert "天城文漂入[hi]" in note


def test_own_script_is_never_foreign():
    text = FM + "Тайвань — остров в Восточной Азии.\n\nЕго столица — Тайбэй, крупнейший город.\n"
    assert MODULE.foreign_script_check(text, "ru") == ("ok", "")


def test_quoted_and_blockquoted_mentions_are_exempt():
    text = (FM + ID_LINE + "\n\nIstilah 「대만감성」 sering dipakai (लोकप्रिय शब्द) oleh media.\n\n"
            "> Путин сказал это на пресс-конференции\n")
    assert MODULE.foreign_script_check(text, "id") == ("ok", "")


def test_vietnamese_function_words_are_matched_in_nfc_and_nfd():
    body = ("Đây là một bài viết về lịch sử của Đài Loan, được viết cho những người "
            "muốn hiểu về văn hóa và xã hội tại hòn đảo này. ") * 12
    nfc = FM + body
    nfd = FM + unicodedata.normalize("NFD", body)
    s_nfc = MODULE.score(nfc)["vi"]
    s_nfd = MODULE.score(nfd)["vi"]
    assert s_nfc == s_nfd
    # 「của／được／những／tại／về」都要算進去：以前只比對得到三分之一的功能詞
    assert s_nfc > 0.2


def test_vietnamese_article_judged_vietnamese(tmp_path):
    body = ("Đây là một bài viết về lịch sử của Đài Loan, được viết cho những người "
            "muốn hiểu về văn hóa và xã hội tại hòn đảo này. ") * 12
    p = tmp_path / "a.md"
    p.write_text(FM + unicodedata.normalize("NFD", body), encoding="utf-8")
    MODULE.REPO = tmp_path  # judge() 印相對路徑
    r = MODULE.judge(p, "vi")
    assert r["verdict"] == "ok"
    assert r["detected"] == "vi"
