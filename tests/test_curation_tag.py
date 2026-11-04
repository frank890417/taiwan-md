"""curation-tag.py：--reason 寫 curationReason、--set verified 拿掉它、featured 互斥。"""
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "curation_tag", Path(__file__).resolve().parents[1] / "scripts/tools/curation-tag.py")
ct = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ct)

FM = "---\ntitle: 't'\nfeatured: true\nlastHumanReview: false\n---\n\n正文。\n"


def _f(tmp_path, text=FM):
    p = tmp_path / "a.md"
    p.write_text(text, encoding="utf-8")
    return p


def test_insert_reason_below_curation(tmp_path):
    p = _f(tmp_path)
    r = ct.process(p, "incubating", True, "thin")
    assert "insert curationReason: thin" in r and "featured true → false" in r
    text = p.read_text(encoding="utf-8")
    assert "curation: incubating\ncurationReason: thin\n---" in text
    assert "featured: false" in text
    assert text.endswith("\n\n正文。\n")  # 正文一個字不動


def test_update_reason_and_noop(tmp_path):
    p = _f(tmp_path, FM.replace("featured: true", "featured: false")
           .replace("---\n\n", "curation: incubating\ncurationReason: thin\n---\n\n"))
    assert ct.process(p, "incubating", True, "unverified") == "update curationReason → unverified"
    assert ct.process(p, "incubating", True, "unverified") == "NOOP"
    # 沒給 --reason → 不動既有的
    assert ct.process(p, "incubating", True, None) == "NOOP"
    assert "curationReason: unverified" in p.read_text(encoding="utf-8")


def test_verified_removes_reason(tmp_path):
    p = _f(tmp_path, FM.replace("---\n\n", "curation: incubating\ncurationReason: thin\n---\n\n"))
    r = ct.process(p, "verified", True)
    assert "remove curationReason" in r
    text = p.read_text(encoding="utf-8")
    assert "curationReason" not in text and "curation: verified" in text


def test_dry_run_does_not_write(tmp_path):
    p = _f(tmp_path)
    ct.process(p, "incubating", False, "thin")
    assert p.read_text(encoding="utf-8") == FM
