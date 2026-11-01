"""共用 git 鎖被一般檔案佔住、以及等不到鎖時的批次去向。

2026-10-24 06:10 起 /tmp/taiwan-md-git.lock 是一個 0 bytes 的一般檔案（手動拿鎖用錯方式），
mkdir 協定下三支工具全部等滿逾時十九小時；dispatcher 的 do_commit 先清空待 commit 清單
再等鎖，逾時後那批已驗過的譯文就沒有任何路徑會再 commit 它，34 篇變成孤兒。
"""
import importlib.util
import sys
from pathlib import Path

LANG_SYNC_DIR = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync"
sys.path.insert(0, str(LANG_SYNC_DIR))
import gitlock  # noqa: E402

SPEC = importlib.util.spec_from_file_location("babel_dispatch", LANG_SYNC_DIR / "babel-dispatch.py")
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules["babel_dispatch"] = MODULE
SPEC.loader.exec_module(MODULE)


def test_plain_file_at_lock_path_is_cleared_loudly(tmp_path, monkeypatch):
    lock = tmp_path / "taiwan-md-git.lock"
    lock.write_text("")
    monkeypatch.setattr(gitlock, "GIT_LOCK", lock)
    msgs = []
    assert gitlock.held_minutes() < 0          # 一般檔案回負值＝壞鎖
    assert gitlock.clear_impostor(msgs.append) is True
    assert not lock.exists() and "🔴" in msgs[0]


def test_real_directory_lock_is_left_alone(tmp_path, monkeypatch):
    lock = tmp_path / "taiwan-md-git.lock"
    lock.mkdir()
    monkeypatch.setattr(gitlock, "GIT_LOCK", lock)
    assert gitlock.clear_impostor(lambda m: None) is False
    assert lock.is_dir() and gitlock.held_minutes() >= 0


def _isolate(monkeypatch, tmp_path):
    # do_commit 會寫難篇記憶並把它加進 commit 清單；指到暫存目錄，不碰 repo 裡的真檔
    monkeypatch.setattr(MODULE, "REPO", tmp_path)
    monkeypatch.setattr(MODULE, "FAIL_MEMO", tmp_path / "fail-memo.json")
    monkeypatch.setattr(MODULE, "HUMAN_STALE_PROPOSALS", tmp_path / "human-stale.tsv")
    monkeypatch.setattr(MODULE.subprocess, "run", lambda *a, **k: None)


def test_lock_timeout_puts_batch_back_in_pending(monkeypatch, tmp_path):
    state = MODULE.RunState()
    state.pending_ok["ja"] = 2
    state.pending_workers["ja"] = {"nemo"}
    state.pending_files["ja"] = ["knowledge/ja/People/a.md", "knowledge/ja/People/b.md"]
    _isolate(monkeypatch, tmp_path)
    monkeypatch.setattr(MODULE, "git_lock_commit", lambda *a, **k: None)
    MODULE.do_commit("ja", state, False, lambda m: None)
    assert state.pending_ok["ja"] == 2
    assert state.pending_files["ja"] == ["knowledge/ja/People/a.md", "knowledge/ja/People/b.md"]
    assert "ja" in state.pending_since


def test_commit_failure_does_not_requeue(monkeypatch, tmp_path):
    state = MODULE.RunState()
    state.pending_ok["ja"] = 1
    state.pending_files["ja"] = ["knowledge/ja/People/a.md"]
    _isolate(monkeypatch, tmp_path)
    monkeypatch.setattr(MODULE, "git_lock_commit", lambda *a, **k: False)
    MODULE.do_commit("ja", state, False, lambda m: None)
    assert state.pending_ok["ja"] == 0 and state.pending_files["ja"] == []
