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
