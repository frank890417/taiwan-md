"""
test_wake_context_silence.py — scripts/tools/wake-context.py 的絕對沉默天數體檢

覆蓋：memory 3 天、diary 14 天兩條邊界（剛好等於閾值仍 ✅、多一天 ⚠️），以及兩種
⚠️ 的處置句不互相串味——diary 的那句不能叫人去查排程器，memory 的那句不能叫人
別補日記（REFLEXES #38 最新變體：結論句的測試同時寫正面與負面斷言）。
"""
import importlib.util
from datetime import date
from pathlib import Path

spec = importlib.util.spec_from_file_location(
    "wake_context", Path(__file__).resolve().parents[1] / "scripts/tools/wake-context.py")
wc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(wc)

TODAY = date(2026, 10, 25)


def test_memory_at_limit_is_green():
    ok, msg = wc.silence_check("memory", "2026-10-22", TODAY)
    assert ok
    assert "3d" in msg


def test_memory_past_limit_points_to_scheduler_not_diary():
    ok, msg = wc.silence_check("memory", "2026-10-21", TODAY)
    assert not ok
    assert "排程器" in msg
    assert "補寫" not in msg


def test_diary_at_limit_is_green():
    ok, _ = wc.silence_check("diary", "2026-10-11", TODAY)
    assert ok


def test_diary_28_days_lights_up_without_asking_for_a_filler_entry():
    # W43 實際讀數：diary 最新 2026-09-27，selftest 原本印 ✅「落差 0d」
    ok, msg = wc.silence_check("diary", "2026-09-27", TODAY)
    assert not ok
    assert "28d" in msg
    assert "不要為了消這盞燈補寫" in msg
    assert "排程器" not in msg
