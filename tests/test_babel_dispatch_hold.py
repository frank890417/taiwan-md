"""有起訖時間的翻譯凍結（load_holds）：只在 [from, until) 內生效，格式錯的列略過不擋整份。

2026-11-02 誕生：選罷法第 53 條民調禁止期內，〈沈伯洋〉〈蔣萬安〉的民調表凍結不改，
babel 若在期間把它們重翻成新語言，等於在禁止期內首次發布民調。
"""
import importlib.util
import sys
from datetime import datetime
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync" / "babel-dispatch.py"
)
SPEC = importlib.util.spec_from_file_location("babel_dispatch", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
sys.modules["babel_dispatch"] = MODULE
SPEC.loader.exec_module(MODULE)


def _holds(tmp_path, monkeypatch, body: str, at: str) -> set:
    f = tmp_path / "babel-hold.tsv"
    f.write_text(body, encoding="utf-8")
    monkeypatch.setattr(MODULE, "HOLD_FILE", f)
    logs = []
    return MODULE.load_holds(logs.append, datetime.fromisoformat(at)), logs


ROW = "*\tPeople/沈伯洋.md\t2026-11-18T00:00:00+08:00\t2026-11-28T16:00:00+08:00\t禁止期\n"


def test_window_is_half_open(tmp_path, monkeypatch):
    assert _holds(tmp_path, monkeypatch, ROW, "2026-11-17T23:59:59+08:00")[0] == set()
    assert _holds(tmp_path, monkeypatch, ROW, "2026-11-18T00:00:00+08:00")[0] == {("*", "People/沈伯洋.md")}
    assert _holds(tmp_path, monkeypatch, ROW, "2026-11-28T15:59:59+08:00")[0] == {("*", "People/沈伯洋.md")}
    assert _holds(tmp_path, monkeypatch, ROW, "2026-11-28T16:00:00+08:00")[0] == set()


def test_bad_row_is_skipped_not_fatal(tmp_path, monkeypatch):
    body = "# 註解\n\nen\tPeople/蔣萬安.md\tnot-a-date\t2026-11-28T16:00:00+08:00\n" + ROW
    rows, logs = _holds(tmp_path, monkeypatch, body, "2026-11-20T12:00:00+08:00")
    assert rows == {("*", "People/沈伯洋.md")}
    assert len(logs) == 1 and "格式不對" in logs[0]


def test_missing_file_means_no_hold(tmp_path, monkeypatch):
    monkeypatch.setattr(MODULE, "HOLD_FILE", tmp_path / "nope.tsv")
    assert MODULE.load_holds(print) == set()


def test_exclusion_cache_without_exclude_file_still_honours_holds(tmp_path, monkeypatch):
    f = tmp_path / "babel-hold.tsv"
    f.write_text("*\tPeople/陳致中.md\t2000-01-01T00:00:00+00:00\t2999-01-01T00:00:00+00:00\t測\n", encoding="utf-8")
    monkeypatch.setattr(MODULE, "HOLD_FILE", f)
    cache = MODULE.ExclusionCache(None, lambda *_: None)
    assert cache.excluded("en", "People/陳致中.md")
    assert not cache.excluded("en", "People/沈伯洋.md")
