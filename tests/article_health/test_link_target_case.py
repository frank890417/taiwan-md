"""link-target：只差大小寫的站內連結（2026-10-02）。

GitHub Pages 跑在分大小寫的 Linux 上，macOS 本機不分。`/Society/颱風假`、
`/technology/ai人工智慧產業` 在維護者本機點得到、部署上去是 404。以前分類大小寫
先被轉小寫才比對（中文連結沒有語言前綴，Phase 1 正則管不到），一律判 ok。
"""

import textwrap
from pathlib import Path

import pytest

from lib.article_health.checks import link_target
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


@pytest.fixture
def corpus(tmp_path, monkeypatch):
    """最小 knowledge/：兩篇 zh、一篇 en 譯文。"""
    k = tmp_path / "knowledge"
    (k / "Society").mkdir(parents=True)
    (k / "Technology").mkdir(parents=True)
    (k / "en" / "Technology").mkdir(parents=True)
    (k / "Society" / "颱風假.md").write_text("---\ntitle: x\n---\n", encoding="utf-8")
    (k / "Technology" / "AI人工智慧產業.md").write_text("---\ntitle: x\n---\n", encoding="utf-8")
    (k / "en" / "Technology" / "threads-in-taiwan.md").write_text("---\ntitle: x\n---\n", encoding="utf-8")
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(link_target, "_KNOWLEDGE_ROOT", Path("knowledge"))
    link_target._reset_cache()
    yield tmp_path
    link_target._reset_cache()


def _article(root: Path, body: str) -> Path:
    f = root / "knowledge" / "Society" / "測試.md"
    f.write_text(
        "---\ntitle: '測試'\ncategory: Society\n---\n\n" + textwrap.dedent(body),
        encoding="utf-8",
    )
    return f


def _violations(path: Path):
    return list(link_target.check(load_target(path), {}))


def test_zh_link_with_capitalized_category_is_flagged(corpus):
    f = _article(corpus, "見 [颱風假](/Society/颱風假)。\n")
    vs = _violations(f)
    assert len(vs) == 1
    assert vs[0].severity == Severity.WARN
    assert vs[0].fix_suggestion == "/society/颱風假"


def test_slug_case_mismatch_is_flagged(corpus):
    f = _article(corpus, "見 [AI](/technology/ai人工智慧產業) 與 [T](/en/technology/Threads-in-Taiwan)。\n")
    fixes = sorted(v.fix_suggestion for v in _violations(f))
    assert fixes == ["/en/technology/threads-in-taiwan", "/technology/AI人工智慧產業"]


def test_exact_case_links_pass(corpus):
    f = _article(corpus, "見 [颱風假](/society/颱風假) 與 [AI](/technology/AI人工智慧產業)。\n")
    assert _violations(f) == []


def test_fix_rewrites_only_the_case(corpus):
    f = _article(
        corpus,
        "見 [颱風假](/Society/颱風假)、[AI](/technology/ai人工智慧產業) 與 [ok](/society/颱風假)。\n",
    )
    n = link_target.fix(load_target(f), {})
    assert n == 2
    text = f.read_text(encoding="utf-8")
    assert "(/society/颱風假)" in text
    assert "(/technology/AI人工智慧產業)" in text
    assert "/Society/" not in text and "ai人工智慧產業" not in text
    assert _violations(f) == []


def test_ambiguous_case_is_not_guessed(corpus):
    # 兩個真實路徑只差大小寫時，不替作者選
    (corpus / "knowledge" / "Technology" / "ai人工智慧產業.md").write_text("---\ntitle: x\n---\n", encoding="utf-8")
    link_target._reset_cache()
    f = _article(corpus, "見 [AI](/technology/Ai人工智慧產業)。\n")
    assert all("大小寫" not in v.message for v in _violations(f))
