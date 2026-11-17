"""cover-promote.py：正文本地圖升格封面，授權從圖說或圖片來源段抄，抄不到就跳過。"""
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "cover_promote", Path(__file__).resolve().parents[1] / "scripts/tools/cover-promote.py")
cp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cp)

HEAD = "---\ntitle: 't'\ndescription: 'd'\nlastHumanReview: false\nreadingTime: 3\n---\n\n"


def _setup(tmp_path, monkeypatch, body, img="/article-images/people/a.webp"):
    monkeypatch.setattr(cp, "REPO", tmp_path)
    f = tmp_path / "public" / img.lstrip("/")
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_bytes(b"not-really-an-image")  # PIL 讀不了 → 比例不判
    md = tmp_path / "knowledge" / "People" / "x.md"
    md.parent.mkdir(parents=True, exist_ok=True)
    md.write_text(HEAD + body, encoding="utf-8")
    return md


def test_caption_with_paren_url(tmp_path, monkeypatch):
    md = _setup(tmp_path, monkeypatch,
                "![議會正面](/article-images/people/a.webp)\n\n"
                "*圖片：Solomon203，2020 年 10 月 31 日拍攝，取自 [Wikimedia Commons]"
                "(https://commons.wikimedia.org/wiki/File:Hall_20201031_(cropped).jpg)，CC BY-SA 4.0。*\n")
    p = cp.plan(md)
    assert p["status"] == "OK"
    assert p["credit"] == "Solomon203" and p["license"] == "CC BY-SA 4.0"
    assert p["source"].endswith("Hall_20201031_(cropped).jpg")
    cp.apply_plan(md, p)
    text = md.read_text(encoding="utf-8")
    fm = text.split("\n---", 1)[0]
    # 插在 lastHumanReview 之後（canonical order），單引號 scalar
    assert "lastHumanReview: false\nimage: '/article-images/people/a.webp'\nimageCredit: 'Solomon203'" in fm
    assert "imageLicense: 'CC BY-SA 4.0'" in fm


def test_sources_section_year_disambiguates(tmp_path, monkeypatch):
    md = _setup(tmp_path, monkeypatch,
                "![周天成在 2018 年公開賽救球](/article-images/people/chou-2018.webp)\n\n## 正文\n\n文字。\n\n"
                "## 圖片來源\n\n"
                "- [Chartlin / Wikimedia Commons](<https://commons.wikimedia.org/wiki/File:Chou_(TPE)_2018.jpg>) — CC BY-SA 4.0\n"
                "- [體育局 / Wikimedia Commons](<https://commons.wikimedia.org/wiki/File:Chou_2022_Taipei_Open.jpg>) — 政府開放資料\n",
                img="/article-images/people/chou-2018.webp")
    p = cp.plan(md)
    assert p["status"] == "OK" and p["credit"] == "Chartlin" and "2018" in p["source"]


def test_skip_when_license_not_allowed(tmp_path, monkeypatch):
    md = _setup(tmp_path, monkeypatch,
                "![x](/article-images/people/a.webp)\n\n_圖：PDIS 提供，Creative Commons 姓名標示授權。_\n")
    p = cp.plan(md)
    assert p["status"] == "SKIP"


def test_noop_when_cover_exists(tmp_path, monkeypatch):
    md = _setup(tmp_path, monkeypatch, "![x](/article-images/people/a.webp)\n")
    md.write_text(md.read_text(encoding="utf-8").replace("readingTime: 3", "image: '/article-images/people/a.webp'"),
                  encoding="utf-8")
    assert cp.plan(md)["status"] == "NOOP"
