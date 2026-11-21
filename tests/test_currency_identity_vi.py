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


def test_dong_bac_is_a_silver_dollar_not_vnd(tmp_path):
    # 2026-11-21：投稿 PR #2048 的 vi〈道明會在台灣〉把母稿「以龍銀六十二圓購置土地」
    # 譯成「62 đồng bạc rồng」（龍銀），被判成裸幣別；同族存量 vi〈艋舺〉的
    # 「25.000 đồng bạc」出自母稿「募款 25,000 銀元」。兩處都是十九世紀的銀元，
    # 不可能寫成 NT$，譯者沒錯，是尺讀錯了。
    assert _scan(tmp_path, "Tháng 12 cùng năm, họ dùng 62 đồng bạc rồng mua đất.") == []
    assert _scan(tmp_path, "Dân An Tích tự tài trợ 25.000 đồng bạc để trùng tu.") == []
    # 負面斷言：排除的是「đồng bạc」這個複合詞，不是它前面的數字——裸 đồng 照樣要擋
    assert len(_scan(tmp_path, "Họ dùng 62 đồng mua đất ở ven biển.")) == 1


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
