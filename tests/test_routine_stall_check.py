"""tests/test_routine_stall_check.py — routine-stall-check.py 的單元 + 整合測試。

情境對應 reports/fortnight-deep-review-2026-09-05.md §2.4 的兩把尺：
尺一（commit 齡）、尺二（週排程 fire-vs-memory 對賬）。每個 tmp 測試都建一個
真的 git repo（`--allow-empty` commit + `GIT_AUTHOR_DATE` 控制時間），而不是
mock `subprocess`，因為 `git log --since/--until` 的行為本身就是待測邏輯的一部分。
"""

from __future__ import annotations

import importlib.util
import json
import os
import subprocess
import sys
from pathlib import Path

import pytest

REPO_ROOT_REAL = Path(__file__).resolve().parents[1]
MODULE_PATH = REPO_ROOT_REAL / "scripts" / "tools" / "routine-stall-check.py"
SPEC = importlib.util.spec_from_file_location("routine_stall_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


# ---------------------------------------------------------------------------
# fixtures / helpers
# ---------------------------------------------------------------------------


def _run(cmd, cwd, env=None):
    return subprocess.run(
        cmd, cwd=cwd, capture_output=True, text=True, env=env, check=True
    )


def init_git_repo(path: Path) -> None:
    _run(["git", "init", "-q"], cwd=path)
    _run(["git", "config", "user.email", "test@example.com"], cwd=path)
    _run(["git", "config", "user.name", "Test"], cwd=path)


def commit_at(path: Path, subject: str, iso_dt: str) -> None:
    """建一個空 commit，author/committer date 都釘在 iso_dt（如 `2026-08-23T09:19:00+08:00`）。"""
    env = os.environ.copy()
    env["GIT_AUTHOR_DATE"] = iso_dt
    env["GIT_COMMITTER_DATE"] = iso_dt
    _run(["git", "commit", "-q", "--allow-empty", "-m", subject], cwd=path, env=env)


ROUTINE_MD_HEADER = """---
title: 'ROUTINE (test fixture)'
---

# 測試用 ROUTINE

## 核心 routine 排程表

| TaskId | Title | Cron (local +0800) | Skill | Model | Cadence |
| --- | --- | --- | --- | --- | --- |
"""

ROUTINE_MD_FOOTER = """
**⏸️ PAUSED**：暫停中的一律標 ⏸️。

**🪦 已退休**：

| TaskId | 原 slot | 退休日 | 為什麼退 |
| --- | --- | --- | --- |
| `twmd-ghost-weekly` | 每週一 | 2020-01-01 | 這條在退休表，尺二絕對不該檢查它 |
"""


def routine_row(task_id: str, cron: str, paused: bool = False) -> str:
    mark = " ⏸️" if paused else ""
    return f"| `{task_id}` | Title{mark} | `{cron}` | `/twmd-x` | Opus | Cadence{mark} |"


def write_routine_md(path: Path, rows: list[str]) -> None:
    text = ROUTINE_MD_HEADER + "\n".join(rows) + "\n" + ROUTINE_MD_FOOTER
    (path / "docs" / "semiont").mkdir(parents=True, exist_ok=True)
    (path / "docs" / "semiont" / "ROUTINE.md").write_text(text, encoding="utf-8")


def write_memory_files(path: Path, names: list[str]) -> None:
    mem_dir = path / "docs" / "semiont" / "memory"
    mem_dir.mkdir(parents=True, exist_ok=True)
    for name in names:
        (mem_dir / name).write_text("# fixture\n", encoding="utf-8")


def write_live_state(path: Path, tasks: dict[str, bool]) -> None:
    data = {
        "fetched_at": "2026-09-05T06:15:35+08:00",
        "tasks": [{"taskId": k, "enabled": v} for k, v in tasks.items()],
    }
    (path / "docs" / "semiont" / "routine-live-state.json").write_text(
        json.dumps(data, ensure_ascii=False), encoding="utf-8"
    )


@pytest.fixture
def repo(tmp_path, monkeypatch):
    init_git_repo(tmp_path)
    monkeypatch.setattr(MODULE, "REPO_ROOT", tmp_path)
    return tmp_path


# ---------------------------------------------------------------------------
# 綠燈
# ---------------------------------------------------------------------------


def test_green_when_recent_routine_commit_and_all_weekly_covered(repo):
    now = MODULE.parse_now("2026-09-05T16:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: twmd-terminology-trends @ 2026-09-05", "2026-09-05T10:53:00+08:00")

    write_routine_md(
        repo,
        [routine_row("twmd-routine-audit-weekly", "0 21 * * 0")],
    )
    # 上一次應 fire：上週日 21:00（2026-08-30，因為 09-05 是週六）
    write_memory_files(repo, ["2026-08-30-211907-twmd-routine-audit-weekly.md"])
    write_live_state(repo, {"twmd-routine-audit-weekly": True})

    result = MODULE.build_result(now, since_days=14)

    assert result["severity"] == "ok"
    assert result["rule1_flywheel_commit_age"]["status"] == "ok"
    checked = result["rule2_weekly_schedule_miss"]["checked"]
    assert len(checked) == 1
    assert checked[0]["status"] == "ok"
    assert checked[0]["covered_by"] == "2026-08-30-211907-twmd-routine-audit-weekly.md"


# ---------------------------------------------------------------------------
# 尺一 CRITICAL
# ---------------------------------------------------------------------------


def test_rule1_critical_when_last_routine_commit_older_than_30h(repo):
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    # 最後一筆 [routine] commit 是 08-23 09:19 — 距 08-26 12:00 有 74.7 小時
    commit_at(repo, "🧬 [routine] memory: twmd-maintainer-am @ 2026-08-23 09:17", "2026-08-23T09:19:00+08:00")
    # 期間的非 routine commit 不該被當成尺一的痕跡
    commit_at(repo, "🧬 [semiont] memory: 手動 session 收官", "2026-08-25T10:00:00+08:00")

    write_routine_md(repo, [])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=30)

    r1 = result["rule1_flywheel_commit_age"]
    assert r1["status"] == "critical"
    assert r1["age_hours"] == pytest.approx(74.7, abs=0.2)
    assert result["severity"] == "critical"


def test_rule1_semiont_memory_commit_is_not_a_routine_trace(repo):
    """反例守門：`[semiont] memory:` 不算 routine 痕跡，只有字面 `[routine]` 算。"""
    now = MODULE.parse_now("2026-08-24T00:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: twmd-maintainer-am @ 2026-08-23 09:17", "2026-08-23T09:19:00+08:00")
    commit_at(repo, "🧬 [semiont] memory: 一個叫 popup-3 的分頁", "2026-08-23T20:00:00+08:00")

    write_routine_md(repo, [])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=14)

    # 最近一筆「真的」帶 [routine] 的 commit 仍是 08-23 09:19，不是 08-23 20:00 那筆
    assert result["rule1_flywheel_commit_age"]["last_commit"]["at"].startswith("2026-08-23 09:19")


def test_rule1_no_routine_commit_in_window_is_critical(repo):
    now = MODULE.parse_now("2026-09-05T00:00:00+08:00")
    commit_at(repo, "🧬 [semiont] evolve: 沒有 routine 標記", "2026-09-01T00:00:00+08:00")

    write_routine_md(repo, [])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=7)

    assert result["rule1_flywheel_commit_age"]["status"] == "critical"
    assert result["rule1_flywheel_commit_age"]["last_commit"] is None


# ---------------------------------------------------------------------------
# 尺一：同一個讀數的兩種根因（2026-09-13 maintainer-am）
#
# 尺一超標時，「整台排程器死了」跟「排程器在跑但產出推不上 origin」在這支尺上
# 是同一個數字。用「同窗口內最近一筆任何 commit」分開，remediation 才不會指錯。
# 誕生：issue #1711 報 71.4h 停滯並說「全飛輪停轉，先查 Claude app 活著沒」，
# 而飛輪每一班都照跑，卡住的是 200+ 個未推送 commit（OBSERVER-QUEUE #56）。
# ---------------------------------------------------------------------------


def test_rule1_diagnoses_output_not_landing_when_repo_itself_is_alive(repo):
    """routine 落後但 main 有人在推 → 不該說「全飛輪停轉」。"""
    now = MODULE.parse_now("2026-09-13T08:55:00+08:00")
    commit_at(repo, "🧬 [routine] memory: twmd-maintainer-am @ 2026-09-10", "2026-09-10T09:19:00+08:00")
    # 另一台機器仍在推 main：非 routine，但證明 repo 沒死
    commit_at(repo, "🧬 [semiont] memory: 另一台機器的收官", "2026-09-13T01:06:00+08:00")

    write_routine_md(repo, [])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=14)
    r1 = result["rule1_flywheel_commit_age"]

    assert r1["status"] == "critical"
    assert r1["diagnosis"] == "routine-output-not-landing"
    assert r1["last_any_age_hours"] == pytest.approx(7.8, abs=0.2)
    # 收尾建議必須並列兩個候選，且明說本尺看不到未推送的 commit
    report = MODULE.human_report(result)
    assert "整個飛輪停轉" in report and "不是唯一解釋" in report
    assert "push 被擋住" in report
    assert "只看得到 main" in report


def test_rule1_diagnoses_flywheel_silent_when_nothing_is_pushed_at_all(repo):
    """main 上連任何 commit 都停了 → 維持原本「整台可能死了」的判讀。"""
    now = MODULE.parse_now("2026-09-13T08:55:00+08:00")
    commit_at(repo, "🧬 [routine] memory: 很久以前那一班", "2026-09-01T09:00:00+08:00")

    write_routine_md(repo, [])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=14)
    r1 = result["rule1_flywheel_commit_age"]

    assert r1["status"] == "critical"
    assert r1["diagnosis"] == "flywheel-silent"
    # 最近一筆任何 commit 就是那筆 routine 自己，同樣超過門檻
    assert r1["last_any_age_hours"] > MODULE.RULE1_THRESHOLD_HOURS
    assert "全飛輪可能停轉" in MODULE.human_report(result)


def test_rule1_diagnosis_is_ok_while_routine_is_landing(repo):
    """綠燈時 diagnosis 不該謊報任何一種病。"""
    now = MODULE.parse_now("2026-09-13T08:55:00+08:00")
    commit_at(repo, "🧬 [routine] memory: 剛剛那一班", "2026-09-13T08:00:00+08:00")

    write_routine_md(repo, [])
    write_memory_files(repo, [])

    r1 = MODULE.build_result(now, since_days=14)["rule1_flywheel_commit_age"]

    assert r1["status"] == "ok"
    assert r1["diagnosis"] == "ok"


def test_rule1_empty_window_still_reports_a_diagnosis(repo):
    """窗口內一筆 commit 都沒有時，diagnosis 欄位不能缺席（工作流讀得到）。"""
    now = MODULE.parse_now("2026-09-13T08:55:00+08:00")
    commit_at(repo, "🧬 [routine] memory: 窗口外", "2026-08-01T09:00:00+08:00")

    write_routine_md(repo, [])
    write_memory_files(repo, [])

    r1 = MODULE.build_result(now, since_days=3)["rule1_flywheel_commit_age"]

    assert r1["last_commit"] is None
    assert r1["last_any_commit"] is None
    assert r1["diagnosis"] == "flywheel-silent"


# ---------------------------------------------------------------------------
# 尺二：週排程 miss
# ---------------------------------------------------------------------------


def test_rule2_weekly_miss_flagged_when_no_covering_memory_file(repo):
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-26T00:00:00+08:00")

    write_routine_md(
        repo,
        [
            routine_row("twmd-routine-audit-weekly", "0 21 * * 0"),  # 應 fire 08-23 21:00
            routine_row("twmd-supporters-weekly", "0 1 * * 1"),      # 應 fire 08-24 01:00
        ],
    )
    write_memory_files(repo, [])  # 兩條都沒有對應的 memory 檔
    write_live_state(
        repo, {"twmd-routine-audit-weekly": True, "twmd-supporters-weekly": True}
    )

    result = MODULE.build_result(now, since_days=30)

    checked = {c["task_id"]: c for c in result["rule2_weekly_schedule_miss"]["checked"]}
    assert checked["twmd-routine-audit-weekly"]["status"] == "warn"
    assert checked["twmd-supporters-weekly"]["status"] == "warn"
    assert result["severity"] in ("warn", "critical")


def test_rule2_covered_run_is_ok_not_warn(repo):
    now = MODULE.parse_now("2026-08-25T12:00:00+08:00")  # due 08-23 21:00 之後 39h，已過 grace
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-25T00:00:00+08:00")

    write_routine_md(repo, [routine_row("twmd-routine-audit-weekly", "0 21 * * 0")])
    write_memory_files(repo, ["2026-08-23-211907-twmd-routine-audit-weekly.md"])
    write_live_state(repo, {"twmd-routine-audit-weekly": True})

    result = MODULE.build_result(now, since_days=14)

    checked = result["rule2_weekly_schedule_miss"]["checked"]
    assert checked[0]["status"] == "ok"


def test_rule2_within_grace_window_is_not_a_miss(repo):
    """due 之後不到 30 小時，還不能判定為 miss（空場 vs 死掉分不出來）。"""
    now = MODULE.parse_now("2026-08-24T10:00:00+08:00")  # due 08-23 21:00，只過了 13h
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-24T00:00:00+08:00")

    write_routine_md(repo, [routine_row("twmd-routine-audit-weekly", "0 21 * * 0")])
    write_memory_files(repo, [])
    write_live_state(repo, {"twmd-routine-audit-weekly": True})

    result = MODULE.build_result(now, since_days=14)

    checked = result["rule2_weekly_schedule_miss"]["checked"]
    assert checked[0]["status"] == "grace"
    assert result["severity"] == "ok"


def test_rule2_paused_row_in_routine_md_is_excluded(repo):
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-26T00:00:00+08:00")

    write_routine_md(repo, [routine_row("twmd-founder-lens-weekly", "0 22 * * 6", paused=True)])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=14)

    assert result["rule2_weekly_schedule_miss"]["checked"] == []
    assert result["rule2_weekly_schedule_miss"]["skipped"] == []


def test_rule2_retired_table_rows_never_enter_candidates(repo):
    """`🪦 已退休` 表格裡的 `twmd-ghost-weekly` 不該出現在候選名單。"""
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-26T00:00:00+08:00")

    write_routine_md(repo, [routine_row("twmd-routine-audit-weekly", "0 21 * * 0")])
    write_memory_files(repo, [])
    write_live_state(repo, {"twmd-routine-audit-weekly": True})

    result = MODULE.build_result(now, since_days=14)

    task_ids = {c["task_id"] for c in result["rule2_weekly_schedule_miss"]["checked"]}
    assert "twmd-ghost-weekly" not in task_ids
    assert task_ids == {"twmd-routine-audit-weekly"}


def test_rule2_daily_cron_is_not_a_weekly_candidate(repo):
    """尺二只管 day-of-week 排程；`* * *` dow 的日排程不進候選名單。"""
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-26T00:00:00+08:00")

    write_routine_md(repo, [routine_row("twmd-maintainer-daily", "30 8 * * *")])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=14)

    assert result["rule2_weekly_schedule_miss"]["checked"] == []


def test_rule2_monthly_dom_cron_is_not_a_weekly_candidate(repo):
    """月排程（日號欄非 `*`、星期欄是 `*`）也不在尺二範圍內（terminology-trends-monthly 同型）。"""
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-26T00:00:00+08:00")

    write_routine_md(repo, [routine_row("twmd-terminology-trends-monthly", "30 10 5 * *")])
    write_memory_files(repo, [])

    result = MODULE.build_result(now, since_days=14)

    assert result["rule2_weekly_schedule_miss"]["checked"] == []


# ---------------------------------------------------------------------------
# disabled 跳過（live-state 優先，讀不到才退回 ROUTINE.md ⏸️）
# ---------------------------------------------------------------------------


def test_rule2_live_state_disabled_skips_even_if_routine_md_not_paused(repo):
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-26T00:00:00+08:00")

    # ROUTINE.md 沒標 ⏸️，但 live-state 說 disabled — live-state 優先
    write_routine_md(repo, [routine_row("twmd-routine-audit-weekly", "0 21 * * 0")])
    write_memory_files(repo, [])
    write_live_state(repo, {"twmd-routine-audit-weekly": False})

    result = MODULE.build_result(now, since_days=14)

    r2 = result["rule2_weekly_schedule_miss"]
    assert r2["checked"] == []
    assert r2["skipped"] == [{"task_id": "twmd-routine-audit-weekly", "reason": "live-state disabled"}]
    assert result["severity"] == "ok"


def test_rule2_falls_back_to_routine_md_when_live_state_unreadable(repo):
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: keep-rule1-quiet", "2026-08-26T00:00:00+08:00")

    write_routine_md(repo, [routine_row("twmd-routine-audit-weekly", "0 21 * * 0")])
    write_memory_files(repo, [])
    # 故意不寫 routine-live-state.json

    result = MODULE.build_result(now, since_days=14)

    r2 = result["rule2_weekly_schedule_miss"]
    assert r2["live_state_fallback"] is True
    assert r2["skipped"] == []
    assert len(r2["checked"]) == 1  # ROUTINE.md 沒標 ⏸️，退回照樣檢查


# ---------------------------------------------------------------------------
# TASKID_ALIASES 別名解析（單元層級，不跑整條流程）
# ---------------------------------------------------------------------------


def test_memory_covers_resolves_taskid_aliases(monkeypatch):
    monkeypatch.setattr(
        MODULE, "TASKID_ALIASES", {"twmd-maintainer-am": "twmd-maintainer-daily"}
    )
    due = MODULE.date(2026, 8, 23)
    now_date = MODULE.date(2026, 8, 24)
    memory_files = ["2026-08-23-091700-twmd-maintainer-am.md"]

    # 檔名寫的是別名 twmd-maintainer-am，查的是 canonical taskId twmd-maintainer-daily
    covered = MODULE.memory_covers("twmd-maintainer-daily", due, now_date, memory_files)
    assert covered == "2026-08-23-091700-twmd-maintainer-am.md"


def test_memory_covers_future_file_does_not_count_in_backtest():
    """回溯測試時，`now` 之後才出現的檔不該倒過來覆蓋更早的 miss。"""
    due = MODULE.date(2026, 8, 23)
    now_date = MODULE.date(2026, 8, 26)  # 模擬的「現在」在 08-26
    memory_files = ["2026-08-30-211907-twmd-routine-audit-weekly.md"]  # 未來才寫的檔

    covered = MODULE.memory_covers("twmd-routine-audit-weekly", due, now_date, memory_files)
    assert covered is None


# ---------------------------------------------------------------------------
# --now 回溯（完整重現 dogfood 兩個歷史情境）
# ---------------------------------------------------------------------------


def test_now_backtest_reproduces_fortnight_gap_critical_and_two_warns(repo):
    """完整重現 reports/fortnight-deep-review-2026-09-05.md §1.2 的四天空窗。"""
    now = MODULE.parse_now("2026-08-26T12:00:00+08:00")
    commit_at(repo, "🧬 [routine] memory: twmd-maintainer-am @ 2026-08-23 09:17", "2026-08-23T09:19:00+08:00")

    write_routine_md(
        repo,
        [
            routine_row("twmd-news-lens-weekly", "0 1 * * 0"),
            routine_row("twmd-routine-audit-weekly", "0 21 * * 0"),
            routine_row("twmd-supporters-weekly", "0 1 * * 1"),
        ],
    )
    write_memory_files(
        repo,
        [
            "2026-08-23-011013-twmd-news-lens-weekly.md",  # news-lens 有補上
            # routine-audit-weekly、supporters-weekly 都沒有 —— 這是空窗裡真的漏掉的兩條
        ],
    )
    write_live_state(
        repo,
        {
            "twmd-news-lens-weekly": True,
            "twmd-routine-audit-weekly": True,
            "twmd-supporters-weekly": True,
        },
    )

    result = MODULE.build_result(now, since_days=30)

    assert result["severity"] == "critical"  # 尺一先亮
    checked = {c["task_id"]: c["status"] for c in result["rule2_weekly_schedule_miss"]["checked"]}
    assert checked == {
        "twmd-news-lens-weekly": "ok",
        "twmd-routine-audit-weekly": "warn",
        "twmd-supporters-weekly": "warn",
    }


# ---------------------------------------------------------------------------
# fail-loud：讀不到必要輸入不算綠燈
# ---------------------------------------------------------------------------


def test_fail_loud_when_routine_md_missing(tmp_path, monkeypatch):
    init_git_repo(tmp_path)
    monkeypatch.setattr(MODULE, "REPO_ROOT", tmp_path)
    commit_at(tmp_path, "🧬 [routine] memory: x", "2026-09-05T00:00:00+08:00")
    # 故意不建 docs/semiont/ROUTINE.md

    now = MODULE.parse_now("2026-09-05T12:00:00+08:00")
    with pytest.raises(SystemExit) as exc:
        MODULE.build_result(now, since_days=14)
    assert exc.value.code == 3


def test_fail_loud_when_memory_dir_missing(tmp_path, monkeypatch):
    init_git_repo(tmp_path)
    monkeypatch.setattr(MODULE, "REPO_ROOT", tmp_path)
    commit_at(tmp_path, "🧬 [routine] memory: x", "2026-09-05T00:00:00+08:00")
    write_routine_md(tmp_path, [])
    # 故意不建 docs/semiont/memory/

    now = MODULE.parse_now("2026-09-05T12:00:00+08:00")
    with pytest.raises(SystemExit) as exc:
        MODULE.build_result(now, since_days=14)
    assert exc.value.code == 3


def test_fail_loud_on_unparseable_now():
    with pytest.raises(SystemExit) as exc:
        MODULE.parse_now("not-a-date")
    assert exc.value.code == 3


# ---------------------------------------------------------------------------
# CLI smoke test（跑真正的 repo，只驗證 wiring 不崩、輸出可解析）
# ---------------------------------------------------------------------------


def test_cli_json_smoke_against_real_repo():
    r = subprocess.run(
        [sys.executable, str(MODULE_PATH), "--json"],
        cwd=REPO_ROOT_REAL,
        capture_output=True,
        text=True,
        check=False,
    )
    assert r.returncode in (0, 1, 2), r.stderr
    payload = json.loads(r.stdout)
    assert payload["severity"] in ("ok", "warn", "critical")
    assert "rule1_flywheel_commit_age" in payload
    assert "rule2_weekly_schedule_miss" in payload
