import importlib.util
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "currency-identity-check.py"
SPEC = importlib.util.spec_from_file_location("currency_identity_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def _scan(tmp_path, text):
    # scan() 只看有 zh 原稿（translatedFrom）的譯文，語言從 REPO/knowledge 之下的路徑推
    MODULE.REPO = tmp_path.resolve()
    k = MODULE.REPO / "knowledge"
    (k / "Society").mkdir(parents=True, exist_ok=True)
    (k / "Society" / "x.md").write_text("---\ntitle: t\n---\n門票 350 元。\n", encoding="utf-8")
    p = k / "vi" / "Society" / "x.md"
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text("---\ntitle: t\ntranslatedFrom: 'Society/x.md'\n---\n" + text, encoding="utf-8")
    return MODULE.scan(p)


def test_dong_thoi_after_iso_code_is_not_currency(tmp_path):
    assert _scan(tmp_path, "ISO 3166-1 đồng thời cấp cho Đài Loan mã TW.") == []


def test_dong_compound_after_plain_number_is_not_currency(tmp_path):
    assert _scan(tmp_path, "Có 3 đồng thời xuất hiện trong báo cáo.") == []


def test_real_vnd_amount_is_still_caught(tmp_path):
    assert len(_scan(tmp_path, "Vé vào cửa giá 350 đồng mỗi người.")) == 1


def _scan_lang(tmp_path, lang, text):
    MODULE.REPO = tmp_path.resolve()
    k = MODULE.REPO / "knowledge"
    (k / "Nature").mkdir(parents=True, exist_ok=True)
    (k / "Nature" / "y.md").write_text("---\ntitle: t\n---\n袁孝維自 2010 年起繫放。\n", encoding="utf-8")
    p = k / lang / "Nature" / "y.md"
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text("---\ntitle: t\ntranslatedFrom: 'Nature/y.md'\n---\n" + text, encoding="utf-8")
    return MODULE.scan(p)


def test_year_comma_surname_yuan_is_not_currency(tmp_path):
    # 2026-11-21：〈黑冠麻鷺〉en/es/pt 被這一句擋到 cascade exhausted
    assert _scan_lang(tmp_path, "en", "Starting in 2010, Yuan began systematic banding of the herons.") == []
    assert _scan_lang(tmp_path, "es", "Desde 2010, Yuan inició anillamientos sistemáticos.") == []


def test_bare_yuan_amount_is_still_caught(tmp_path):
    assert len(_scan_lang(tmp_path, "en", "The ticket costs 2,000 yuan per person.")) == 1
    assert len(_scan_lang(tmp_path, "es", "Costó 1.5 millones yuanes en total.")) == 1
