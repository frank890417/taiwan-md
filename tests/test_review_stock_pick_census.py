"""review-stock-pick.py 讀全站普查：精選 A 級排最前、A-watch 第二。"""
import importlib.util
import json
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "review_stock_pick", Path(__file__).resolve().parents[1] / "scripts/tools/review-stock-pick.py")
rsp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rsp)

EV = {"research": [], "done_log": False, "pre_review": False, "rewrite_commits": 0, "factcheck_commits": 0}


def test_census_groups(tmp_path, monkeypatch):
    rows = [
        {"path": "knowledge/Food/精選A.md", "category": "Food", "curation": None, "featured": True,
         "tiers": {"A": ["A1"]}, "evidence": EV},
        {"path": "knowledge/People/看不見.md", "category": "People", "curation": None, "featured": False,
         "tiers": {}, "evidence": EV},
        {"path": "knowledge/People/走過.md", "category": "People", "curation": None, "featured": False,
         "tiers": {}, "evidence": {**EV, "rewrite_commits": 1}},
        {"path": "knowledge/About/站務.md", "category": "About", "curation": None, "featured": False,
         "tiers": {}, "evidence": EV},
    ]
    f = tmp_path / "latest.json"
    f.write_text(json.dumps({"generated": "2026-11-04", "articles": rows}, ensure_ascii=False), encoding="utf-8")
    monkeypatch.setattr(rsp, "CENSUS", f)
    groups, date = rsp.census_groups()
    assert date == "2026-11-04"
    assert groups == {"knowledge/Food/精選A.md": 0, "knowledge/People/看不見.md": 1}


def test_census_missing(tmp_path, monkeypatch):
    monkeypatch.setattr(rsp, "CENSUS", tmp_path / "nope.json")
    assert rsp.census_groups() == ({}, None)
