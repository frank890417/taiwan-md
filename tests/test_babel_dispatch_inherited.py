"""patch 前的繼承缺陷預檢（inherited_gate_defects）。

2026-10-09 babel-nightly：〈台灣美食總覽〉vi/id/hi/ar 的 patch 連續十次被幣別閘門擋下。
中文只改了一章，裸幣別在其餘十一章；patch 原樣保留未改章節，所以換哪個模型都必然
被擋，fail_count 卻把它記成模型失敗。預檢讓這種任務直接走整篇重翻。

檢查器本身（幣別／漏譯／量級）只認 repo 內 knowledge/ 底下的檔案，所以這裡把
subprocess 換成假的，測的是預檢怎麼讀各工具的 exit code、量級怎麼對著舊來源量。
"""
import importlib.util
import subprocess
import sys
from pathlib import Path
from types import SimpleNamespace


MODULE_PATH = (
    Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "babel-dispatch.py"
)
SPEC = importlib.util.spec_from_file_location("babel_dispatch_inherited", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules["babel_dispatch_inherited"] = MODULE   # @dataclass 解析 annotation 時要在 sys.modules 找得到
SPEC.loader.exec_module(MODULE)


def _translation(tmp_path: Path, sha: str | None = "abc1234") -> Path:
    p = tmp_path / "t.md"
    fm = f"sourceCommitSha: '{sha}'\n" if sha else ""
    p.write_text(f"---\ntitle: 'x'\n{fm}---\n\nbody\n", encoding="utf-8")
    return p


def _fake_run(results: dict, seen: list):
    """results: 工具檔名 → (returncode, stdout)。git show 一律回舊版 zh。"""
    def run(cmd, **kw):
        seen.append(cmd)
        if cmd[0] == "git":
            return SimpleNamespace(returncode=0, stdout="舊版中文 500億\n", stderr="")
        tool = Path(cmd[1]).name
        if "--check=footnote-reference" in cmd:
            tool += "#footnote"   # 同一支 article-health，兩種呼叫分開給答案
        rc, out = results.get(tool, (0, ""))
        return SimpleNamespace(returncode=rc, stdout=out, stderr="")
    return run


def test_each_gate_maps_to_its_name(tmp_path, monkeypatch):
    seen = []
    monkeypatch.setattr(MODULE.subprocess, "run", _fake_run({
        "cjk-leak-check.py": (1, "1/1 files flagged"),
        "currency-identity-check.py": (1, "9 處裸幣別"),
        "article-health.py": (1, "Summary: hard=1 passed=False"),
        "article-health.py#footnote": (1, "Summary: hard=0 warn=1 passed=False"),
        "numeral-magnitude-check.py": (1, "1 檔，2 處量級可疑"),
    }, seen))
    found = MODULE.inherited_gate_defects("Food/x.md", str(_translation(tmp_path)))
    assert found == ["leak", "currency", "health", "footnote", "magnitude"]


def test_broken_footnote_alone_routes_to_full_retranslation(tmp_path, monkeypatch):
    # OBSERVER-QUEUE #114：footnote-reference 是 warn 級，pre-commit 那條 health 不會擋它，
    # 補丁會把斷腳註原樣繼承並標成 fresh。只有它壞時也要回報。
    monkeypatch.setattr(MODULE.subprocess, "run", _fake_run({
        "article-health.py": (0, "Summary: hard=0 passed=True"),
        "article-health.py#footnote": (1, "Summary: hard=0 warn=1 passed=False"),
    }, []))
    assert MODULE.inherited_gate_defects("Food/x.md", str(_translation(tmp_path))) == ["footnote"]


def test_clean_translation_is_not_flagged(tmp_path, monkeypatch):
    monkeypatch.setattr(MODULE.subprocess, "run", _fake_run({
        "article-health.py": (0, "Summary: hard=0 passed=True"),
    }, []))
    assert MODULE.inherited_gate_defects("Food/x.md", str(_translation(tmp_path))) == []


def test_broken_tool_does_not_block_patch(tmp_path, monkeypatch):
    # 非約定 exit（工具自己壞了）不算缺陷——量級只認 exit 1 加「處量級可疑」字樣
    monkeypatch.setattr(MODULE.subprocess, "run", _fake_run({
        "cjk-leak-check.py": (2, "Traceback"),
        "currency-identity-check.py": (2, "Traceback"),
        "article-health.py#footnote": (2, "Traceback"),
        "numeral-magnitude-check.py": (1, "FileNotFoundError"),
    }, []))
    assert MODULE.inherited_gate_defects("Food/x.md", str(_translation(tmp_path))) == []


def test_magnitude_measured_against_the_source_version_it_was_translated_from(tmp_path, monkeypatch):
    seen = []
    monkeypatch.setattr(MODULE.subprocess, "run", _fake_run({}, seen))
    MODULE.inherited_gate_defects("Food/x.md", str(_translation(tmp_path, sha="deadbeef")))
    git_calls = [c for c in seen if c[0] == "git"]
    assert git_calls == [["git", "show", "deadbeef:knowledge/Food/x.md"]]
    mag = next(c for c in seen if c[0] == "python3" and c[1].endswith("numeral-magnitude-check.py"))
    assert not mag[2].startswith("knowledge/")   # 量的是舊版暫存檔，不是新 zh


def test_no_source_sha_skips_magnitude(tmp_path, monkeypatch):
    seen = []
    monkeypatch.setattr(MODULE.subprocess, "run", _fake_run({}, seen))
    MODULE.inherited_gate_defects("Food/x.md", str(_translation(tmp_path, sha=None)))
    assert not any(c[0] == "git" for c in seen)


def test_missing_file_returns_empty(tmp_path):
    assert MODULE.inherited_gate_defects("Food/x.md", str(tmp_path / "nope.md")) == []
