"""
test_routine_sync_check_recipients.py — routine-sync-check.py 的收件人分流

覆蓋：排程器沒註冊（只有哲宇按得到）與 enabled／cron 漂移（session 修得動）印在
不同的表，各自帶各自的處置句；queue_refs 只讀 §待決，不把 §已決 的舊列算進來。
"""
import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "routine_sync_check",
    Path(__file__).resolve().parents[1] / "scripts/tools/routine-sync-check.py")
rsc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(rsc)

QUEUE = """# OBSERVER-QUEUE

## 待決

| #   | 進佇列日 | 決策 |
| --- | -------- | ---- |
| 116 | 2026-10-25 | **`twmd-review-stock` 的排程註冊只有你按得到** |

## 已決

| 86 | 2026-09-30 | twmd-review-stock 舊決定 |
"""


def test_queue_refs_reads_pending_only(tmp_path):
    q = tmp_path / "OBSERVER-QUEUE.md"
    q.write_text(QUEUE, encoding="utf-8")
    assert rsc.queue_refs("twmd-review-stock", q) == [116]
    assert rsc.queue_refs("twmd-other", q) == []


def _results(rows):
    return {
        "ok": [], "thick": [], "missing": [], "orphan": [], "drift": [], "cron_drift": [],
        "live_enabled_drift": rows, "live_cron_drift": [], "live_orphan": [],
        "live_desc_time_drift": [], "live_dump": {"status": "ok"},
    }


def test_absent_routine_goes_to_observer_table(capsys):
    rsc.print_human(_results([
        {"task_id": "twmd-review-stock", "ssot": "週三 22:00", "live": "<no live task>",
         "fixer": "observer", "queue": [116]},
    ]), 1)
    out = capsys.readouterr().out
    assert "LIVE_ABSENT (1)" in out
    assert "已在 OBSERVER-QUEUE #116" in out
    assert "不要寫成任何 routine 席位的交接" in out
    assert "LIVE_ENABLED_DRIFT" not in out
    assert "session 修得動" not in out


def test_absent_routine_without_queue_row_says_so(capsys):
    rsc.print_human(_results([
        {"task_id": "twmd-new", "ssot": "每日", "live": "<no live task>",
         "fixer": "observer", "queue": []},
    ]), 1)
    assert "還沒進 OBSERVER-QUEUE" in capsys.readouterr().out


def test_enabled_drift_stays_session_fixable(capsys):
    rsc.print_human(_results([
        {"task_id": "twmd-x", "ssot": "每日", "live": "enabled=False"},
    ]), 1)
    out = capsys.readouterr().out
    assert "LIVE_ENABLED_DRIFT" in out
    assert "session 修得動" in out
    assert "LIVE_ABSENT" not in out
