"""被閘門拒收的產出在還原成 HEAD 之前要留底（keep_rejected_sample）。

2026-11-23 誕生：〈水道頭〉重翻九語、兩種模型全敗在 URL count，被拒的譯文當場還原，
沒有一份留下來，分不出是閘門誤判還是模型真的改了網址。
"""
import importlib.util
import sys
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "babel-dispatch.py"
)
SPEC = importlib.util.spec_from_file_location("babel_dispatch", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules["babel_dispatch"] = MODULE
SPEC.loader.exec_module(MODULE)

REL = "knowledge/en/Society/x.md"


def _setup(tmp_path, monkeypatch, content: bytes):
    monkeypatch.setattr(MODULE, "REPO", tmp_path)
    f = tmp_path / REL
    f.parent.mkdir(parents=True)
    f.write_bytes(content)
    return tmp_path / ".babel-quarantine" / "rejected" / "knowledge/en/Society"


def test_rejected_output_is_kept_before_restore(tmp_path, monkeypatch):
    qdir = _setup(tmp_path, monkeypatch, b"rejected output")
    logs = []
    dest = MODULE.keep_rejected_sample(REL, b"head version", logs.append)
    assert dest is not None and dest.read_bytes() == b"rejected output"
    assert dest.parent == qdir
    assert any("留底" in line for line in logs)


def test_nothing_kept_when_worktree_equals_head(tmp_path, monkeypatch):
    qdir = _setup(tmp_path, monkeypatch, b"same")
    assert MODULE.keep_rejected_sample(REL, b"same", lambda _m: None) is None
    assert not qdir.exists()


def test_missing_file_is_not_an_error(tmp_path, monkeypatch):
    monkeypatch.setattr(MODULE, "REPO", tmp_path)
    assert MODULE.keep_rejected_sample(REL, b"head", lambda _m: None) is None


def test_only_latest_samples_survive(tmp_path, monkeypatch):
    qdir = _setup(tmp_path, monkeypatch, b"v0")
    clock = iter(range(1000, 1010))
    monkeypatch.setattr(MODULE.time, "time", lambda: next(clock))
    for i in range(5):
        (tmp_path / REL).write_bytes(f"v{i}".encode())
        MODULE.keep_rejected_sample(REL, b"head", lambda _m: None)
    kept = sorted(qdir.iterdir())
    assert len(kept) == MODULE.REJECTED_SAMPLES_KEPT
    assert [f.read_bytes() for f in kept] == [b"v2", b"v3", b"v4"]
