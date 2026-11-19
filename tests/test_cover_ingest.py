"""cover-ingest.py：授權允收清單、下載網址、已有封面的判斷（不連網）。"""
from __future__ import annotations

import importlib.util
from pathlib import Path

_TOOLS = Path(__file__).resolve().parents[1] / "scripts" / "tools"
spec = importlib.util.spec_from_file_location("cover_ingest", _TOOLS / "cover-ingest.py")
ci = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ci)

INFO = {"license": "CC BY-SA 4.0", "artist": "某人", "w": 3000, "h": 2000, "mime": "image/jpeg",
        "page": "https://commons.wikimedia.org/wiki/File:A.jpg",
        "url": "https://upload.wikimedia.org/wikipedia/commons/a/ab/A.jpg?utm_source=x"}


def _article(tmp_path: Path, fm_extra: str = "") -> dict:
    d = tmp_path / "knowledge" / "Food"
    d.mkdir(parents=True)
    (d / "甲.md").write_text(f"---\ntitle: '甲'\nlastHumanReview: false\n{fm_extra}---\n\n正文\n", encoding="utf-8")
    return {"article": "knowledge/Food/甲.md", "file": "A.jpg", "name": "a-photo"}


def test_license_allowlist():
    for ok in ("CC BY 2.0", "CC BY-SA 4.0", "CC BY-SA 3.0 tw", "CC0", "Public domain", "OGDL-Taiwan-1.0"):
        assert ci.license_ok(ok), ok
    for bad in ("GFDL", "Attribution", "CC BY-NC 2.0", "CC BY-ND 4.0", "Fair use", ""):
        assert not ci.license_ok(bad), bad


def test_download_url_picks_largest_standard_width_not_above_original():
    u = "https://upload.wikimedia.org/wikipedia/commons/a/ab/A_%28b%29.jpg?utm_source=x"
    assert ci.download_url(u, 3000).endswith("/thumb/a/ab/A_%28b%29.jpg/1920px-A_%28b%29.jpg")
    assert ci.download_url(u, 1400).endswith("/1280px-A_%28b%29.jpg")
    assert ci.download_url(u, 960).endswith("/960px-A_%28b%29.jpg")
    # 比最小標準寬度還窄：只能回原檔，utm 參數要去掉
    assert ci.download_url(u, 900) == "https://upload.wikimedia.org/wikipedia/commons/a/ab/A_%28b%29.jpg"


def test_check_writes_four_fields(tmp_path):
    why, p = ci.check(_article(tmp_path), INFO, repo=tmp_path)
    assert why is None
    assert p["image"] == "/article-images/food/a-photo.webp"
    assert p["credit"] == "某人 / Wikimedia Commons" and p["license"] == "CC BY-SA 4.0"
    assert p["source"] == INFO["page"] and "1920px-A.jpg" in p["download"]


def test_check_skips_instead_of_guessing(tmp_path):
    e = _article(tmp_path)
    assert "授權不在允收清單" in ci.check(e, INFO | {"license": "GFDL"}, repo=tmp_path)[0]
    assert "比例" in ci.check(e, INFO | {"w": 1000, "h": 1600}, repo=tmp_path)[0]
    assert "不到" in ci.check(e, INFO | {"w": 640, "h": 480}, repo=tmp_path)[0]
    assert "作者欄空白" in ci.check(e, INFO | {"artist": ""}, repo=tmp_path)[0]
    assert "查無此檔" in ci.check(e, None, repo=tmp_path)[0]


def test_existing_cover_is_left_alone(tmp_path):
    e = _article(tmp_path, "image: '/article-images/food/old.webp'\n")
    assert ci.check(e, INFO, repo=tmp_path)[0] == "已有封面"
    assert not ci.has_cover("---\ntitle: 'x'\nimage: ''\n---\n")
    assert not ci.has_cover("---\ntitle: 'x'\nimageNote: '待補'\n---\n")
