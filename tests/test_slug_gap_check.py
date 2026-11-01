"""
test_slug_gap_check.py — scripts/tools/slug-gap-check.py

正控制（REFLEXES #99：0 命中先過正控制）：在 tmp_path 假 repo 放一篇純中文檔名、
零譯文、沒登記的母稿，經 babel-preflight 真正的判準要被抓到；登記進 _slug-map 或
已有譯文的不能被抓；PR 過濾只回 PR 改到的那幾篇。
"""
import importlib.util
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def _load(name, rel):
    spec = importlib.util.spec_from_file_location(name, ROOT / rel)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


sgc = _load("slug_gap_check", "scripts/tools/slug-gap-check.py")
pre = _load("babel_preflight_t", "scripts/tools/lang-sync/babel-preflight.py")


def _fake_repo(tmp_path):
    kn = tmp_path / "knowledge"
    (kn / "History").mkdir(parents=True)
    for name in ("熱蘭遮城.md", "已登記.md", "已有譯文.md", "zeelandia-ascii.md"):
        (kn / "History" / name).write_text("---\ntitle: x\n---\n", encoding="utf-8")
    (kn / "_slug-map.json").write_text(json.dumps({"History/已登記.md": "registered"}),
                                       encoding="utf-8")
    (kn / "_translations.json").write_text(json.dumps({"en/History/has-en.md": "History/已有譯文.md"}),
                                           encoding="utf-8")
    return tmp_path


def test_positive_control_through_real_preflight_rule(tmp_path, monkeypatch):
    monkeypatch.setattr(pre, "REPO", _fake_repo(tmp_path))
    res = pre.check_slug_registration()
    assert res["available"]
    assert res["unslugged"] == ["History/熱蘭遮城.md"]


def test_pr_filter_returns_only_changed_files():
    unslugged = ["History/熱蘭遮城.md", "Culture/別篇.md"]
    assert sgc.find_gaps(unslugged, ["knowledge/History/熱蘭遮城.md"]) == ["History/熱蘭遮城.md"]
    assert sgc.find_gaps(unslugged, ["knowledge/History/zeelandia.md"]) == []
    assert sgc.find_gaps(unslugged, None) == unslugged


def test_report_names_the_fix_and_says_it_does_not_block():
    out = "\n".join(sgc.report_lines(["History/熱蘭遮城.md"]))
    assert "knowledge/History/熱蘭遮城.md" in out
    assert "_slug-map.json" in out
    assert "不擋合併" in out
    assert "✅" not in out
    assert "✅" in sgc.report_lines([])[0]
