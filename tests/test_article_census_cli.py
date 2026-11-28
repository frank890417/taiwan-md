"""article-census.py CLI 層：URL→文章對應、名單檔格式、health 摘要。

不跑全站（CI 是淺 clone，也太慢）；只測純函式與檔案輸出。
"""
import importlib.util
import sys
from pathlib import Path

_TOOLS = Path(__file__).resolve().parents[1] / "scripts" / "tools"
sys.path.insert(0, str(_TOOLS))
spec = importlib.util.spec_from_file_location("article_census", _TOOLS / "article-census.py")
ac = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ac)

CATS = {"people": "People", "food": "Food"}
TR = {"en/People/hong-xing-fu.md": "People/洪醒夫.md"}


def test_url_to_key_zh_and_translation():
    assert ac._url_to_key("/people/%E6%B4%AA%E9%86%92%E5%A4%AB/", CATS, TR) == ("People/洪醒夫.md", False)
    assert ac._url_to_key("/people/洪醒夫/", CATS, TR) == ("People/洪醒夫.md", False)
    assert ac._url_to_key("https://taiwan.md/en/people/hong-xing-fu/", CATS, TR) == ("People/洪醒夫.md", True)
    assert ac._url_to_key("/terminology/converter/", CATS, TR) is None
    assert ac._url_to_key("/", CATS, TR) is None


def _r(path, tiers, featured=False, hold=None, views=0):
    return {
        "path": path, "tiers": tiers, "featured": featured,
        "evidence": {"hold": hold},
        "traffic": {"ga_views": views, "sc_impressions": 0, "ga_views_translations": 0},
    }


def test_write_tier_file_excludes_hold_and_featured(tmp_path):
    rows = [
        _r("knowledge/People/低流量.md", {"A": ["A1"]}, views=1),
        _r("knowledge/People/高流量.md", {"A": ["A1"]}, views=99),
        _r("knowledge/People/精選.md", {"A": ["A1"]}, featured=True),
        _r("knowledge/People/候選人.md", {"A": ["A1"]}, hold="2026-11-18～2026-11-28 民調禁止期"),
        _r("knowledge/Food/不是A.md", {"C": ["C3"]}),
    ]
    out = tmp_path / "a.txt"
    kept, excluded = ac.write_tier_file(rows, "A", out, "2026-11-04")
    assert (kept, excluded) == (2, 2)
    lines = out.read_text(encoding="utf-8").splitlines()
    body = [l for l in lines if l and not l.startswith("#")]
    assert body == ["knowledge/People/高流量.md", "knowledge/People/低流量.md"]  # 流量高的先
    header = "\n".join(l for l in lines if l.startswith("#"))
    assert "候選人" in header and "精選" in header  # 排除的人看得到，curation-tag.py 會跳過 # 行


def test_health_from_report():
    rep = {"results": [
        {"check": "prose-health", "violations": [
            {"severity": "warn", "message": "prose-health score: 7 — 塑膠句", "fix_suggestion": "7"}]},
        {"check": "footnote-density", "violations": [
            {"severity": "warn", "message": "腳註等級 F", "fix_suggestion": "F"}]},
        {"check": "word-count", "violations": [
            {"severity": "info", "message": "字數統計", "fix_suggestion": None},
            {"severity": "warn", "message": "篇幅不足", "fix_suggestion": "x"}]},
        {"check": "cjk-punct", "violations": [{"severity": "hard", "message": "半形", "fix_suggestion": None}]},
    ]}
    h = ac._health_from_report(rep)
    assert h["hard"] == 1 and h["warn"] == 3
    assert h["prose_score"] == 7 and h["fn_grade"] == "F"
    assert h["warn_by_check"] == {"footnote-density": 1, "prose-health": 1, "word-count": 1}


def _ar(path, reasons, suggested, featured=False):
    return {"path": path, "tiers": {"A": reasons}, "suggested_reason": suggested, "featured": featured,
            "evidence": {"hold": None}, "traffic": {"ga_views": 0, "sc_impressions": 0, "ga_views_translations": 0}}


def test_a_batches_and_exclude(tmp_path):
    rows = [
        _ar("knowledge/History/漏標.md", ["A1 零查證證據：字數 1500 < 2000", "A2 heal 漏標：…"], "unverified"),
        _ar("knowledge/People/少腳註.md", ["A1 零查證證據：腳註 2 < 5"], "unverified"),
        _ar("knowledge/People/只字少.md", ["A1 零查證證據：字數 1500 < 2000"], "thin"),
        _ar("knowledge/People/有人在寫.md", ["A1 零查證證據：字數 1500 < 2000"], "thin"),
        _ar("knowledge/Food/精選.md", ["A1 零查證證據：字數 1500 < 2000"], "thin", featured=True),
    ]
    out = ac.write_a_batches(rows, tmp_path, "2026-11-04", {"knowledge/People/有人在寫.md": "x"})
    body = lambda f: [l for l in f.read_text(encoding="utf-8").splitlines() if not l.startswith("#")]
    assert body(out["A2"][0]) == ["knowledge/History/漏標.md"]  # 同時中 A1 也歸 A2
    assert body(out["A1-unverified"][0]) == ["knowledge/People/少腳註.md"]
    assert body(out["A1-thin"][0]) == ["knowledge/People/只字少.md"]  # 排除與精選都不在
    assert "--reason thin" in out["A1-thin"][0].read_text(encoding="utf-8")


def test_dashboard_payload_shape():
    row = {"path": "knowledge/People/a.md", "title": "a", "category": "People", "curation": None,
           "curationReason": None, "cover": "none",
           "cover_fields": {"credit": True, "license": True, "source": False},
           "metrics": {"cjk": 1, "fn_defs": 0, "images": 3, "images_local": 1, "images_remote": 2,
                       "tw_modules": 4, "tw_data_modules": 3, "iframes": 1},
           "tiers": {"A": ["A1 零查證證據"], "C": ["C3 無封面、正文也沒圖"]}, "featured": False,
           "evidence": {"hold": None}, "traffic": {"ga_views": 0, "sc_impressions": 0, "ga_views_translations": 0}}
    payload = {k: None for k in ("generated", "generator", "head", "scope", "n", "thresholds", "health_profile",
                                 "git_available", "curation_dates_available", "traffic_sources",
                                 "tier_names", "tier_counts")}
    payload |= {"articles": [row], "distribution": {"all": {"n": 1, "cjk": {}, "fn_defs": {}, "media": {}}}}
    d = ac.dashboard_payload(payload)
    assert d["tiers"]["A"][0]["path"] == "knowledge/People/a.md"
    assert d["tier_C_paths"] == ["knowledge/People/a.md"] and d["c_subtypes"] == {"C3": 1}
    assert "articles" not in d  # 輕量版不帶全列
    # 監測頁文章總覽 join 用的每篇媒體讀數；授權三欄缺一欄就不算齊
    assert d["media"]["knowledge/People/a.md"] == {
        "c": "none", "cr": False, "i": 3, "il": 1, "ir": 2, "m": 4, "d": 3, "f": 1}


def test_tw_modules_split_data_from_text_helpers():
    """資訊模組的定義只住 census.py：全部 tw-* 與資料類分開數，code fence 裡的圖不算圖。"""
    from lib.article_health import census

    body = "\n".join([
        "正文一段。", "", "![圖](/article-images/x/a.webp)", "",
        "```tw-timeline", "1990｜事件", "```", "",
        "```tw-bars", "標題", "甲｜10", "```", "",
        "```tw-quote", "一句話", "```", "",
        "```tw-article", "/people/a", "```", "",
        "```python", "![不是圖](http://example.com/x.png)", "```",
    ])
    m = census.body_metrics(body)
    assert m["tw_modules"] == 4 and m["tw_data_modules"] == 2
    assert m["tw_types"] == {"article": 1, "bars": 1, "quote": 1, "timeline": 1}
    assert m["images"] == 1 and m["images_local"] == 1 and m["images_remote"] == 0
    assert {"quote", "note", "source", "article"}.isdisjoint(census.TW_DATA_MODULES)
