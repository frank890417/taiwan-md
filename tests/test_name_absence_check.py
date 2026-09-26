import importlib.util
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "name-absence-check.py"
SPEC = importlib.util.spec_from_file_location("name_absence_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def _pair(tmp_path, monkeypatch, zh, tr):
    k = tmp_path / "knowledge"
    (k / "Society").mkdir(parents=True)
    (k / "en" / "Society").mkdir(parents=True)
    (k / "Society" / "x.md").write_text(zh, encoding="utf-8")
    p = k / "en" / "Society" / "x.md"
    p.write_text("---\ntranslatedFrom: 'Society/x.md'\n---\n" + tr, encoding="utf-8")
    monkeypatch.setattr(MODULE, "KNOWLEDGE", k)
    monkeypatch.setattr(MODULE, "REPO", tmp_path)
    return p


def test_person_absent_from_source_is_reported(tmp_path, monkeypatch):
    forms, pat = MODULE.build_pattern()
    p = _pair(tmp_path, monkeypatch, "童子賢個人捐了 500 萬元。", "Barry Lam donated NT$5 million.")
    forms["Barry Lam"] = "林百里"
    import re
    pat = re.compile(r"(?<![A-Za-z\-‑])(Barry Lam)(?![A-Za-z\-‑])")
    hits = MODULE.scan(p, forms, pat)
    assert [h["person"] for h in hits] == ["林百里"]


def test_alias_in_source_is_not_reported(tmp_path, monkeypatch):
    import re
    p = _pair(tmp_path, monkeypatch, "蔣介石來台。", "Chiang Kai-shek arrived.")
    forms = {"Chiang Kai-shek": "蔣中正"}
    pat = re.compile(r"(?<![A-Za-z\-‑])(Chiang Kai-shek)(?![A-Za-z\-‑])")
    assert MODULE.scan(p, forms, pat) == []


def test_hyphenated_given_name_is_not_a_prefix_match(tmp_path, monkeypatch):
    import re
    p = _pair(tmp_path, monkeypatch, "林亮君與林亭均。", "Lin Liang‑jun and Lin Ting‑jun.")
    forms = {"Lin Liang": "林良"}
    pat = re.compile(r"(?<![A-Za-z\-‑])(Lin Liang)(?![A-Za-z\-‑])")
    assert MODULE.scan(p, forms, pat) == []
