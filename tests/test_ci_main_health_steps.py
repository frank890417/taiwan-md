"""ci-main-health.sh 的步驟層讀數（REFLEXES #104 紅燈後面的每一步都沒跑過）。

離線測：把 jobs JSON 從 stdin 餵給 `--steps-from-stdin`，不打 GitHub API。
正控制與負控制都要有——只斷言「有印 ⏭」的測試，在工具永遠印 ⏭ 時也會綠（#99）。
"""

import json
import subprocess
from pathlib import Path

TOOL = Path(__file__).resolve().parent.parent / "scripts" / "tools" / "ci-main-health.sh"


def run(doc) -> str:
    raw = doc if isinstance(doc, str) else json.dumps(doc)
    r = subprocess.run(
        ["bash", str(TOOL), "--steps-from-stdin"],
        input=raw,
        capture_output=True,
        text=True,
        timeout=30,
    )
    assert r.returncode == 0, r.stderr
    return r.stdout


def step(name, conclusion):
    return {"name": name, "conclusion": conclusion}


def test_red_in_the_middle_reports_position_and_skipped_tail():
    # 10-06 那四天的形狀：紅在第五步，排第六步的 harvest/ui 與後面的閘門從沒輪到。
    out = run(
        {
            "jobs": [
                {
                    "name": "contracts",
                    "conclusion": "failure",
                    "steps": [
                        step("Set up job", "success"),
                        step("checkout", "success"),
                        step("setup-node", "success"),
                        step("npm ci", "success"),
                        step("audit root", "failure"),
                        step("audit harvest/ui", "skipped"),
                        step("test:contracts", "skipped"),
                        step("pytest", "skipped"),
                        step("Post checkout", "success"),
                    ],
                }
            ]
        }
    )
    assert "紅在第 5/9 步「audit root」" in out
    assert "⏭ 它後面 3 步沒跑過" in out
    assert "test:contracts" in out and "pytest" in out
    assert "SKIPPED_TOTAL=3" in out


def test_red_on_last_step_prints_no_skipped_line():
    out = run(
        {
            "jobs": [
                {
                    "name": "build",
                    "conclusion": "failure",
                    "steps": [step("a", "success"), step("b", "failure")],
                }
            ]
        }
    )
    assert "紅在第 2/2 步「b」" in out
    assert "⏭" not in out
    assert "SKIPPED_TOTAL=0" in out


def test_green_jobs_are_not_reported_and_steps_with_if_always_do_not_count():
    # 帶 `if: !cancelled()` 的步驟在紅之後照跑，conclusion 是 success／failure，不是 skipped。
    out = run(
        {
            "jobs": [
                {"name": "lint", "conclusion": "success", "steps": [step("x", "success")]},
                {
                    "name": "gates",
                    "conclusion": "failure",
                    "steps": [
                        step("types", "failure"),
                        step("audit", "success"),
                        step("vitest", "success"),
                    ],
                },
            ]
        }
    )
    assert "lint" not in out
    assert "紅在第 1/3 步「types」" in out
    assert "⏭" not in out
    assert "SKIPPED_TOTAL=0" in out


def test_job_red_without_a_failed_step_says_so():
    out = run(
        {
            "jobs": [
                {
                    "name": "deploy",
                    "conclusion": "cancelled",
                    "steps": [step("a", "success"), step("b", "skipped")],
                }
            ]
        }
    )
    assert "沒有一步標成失敗" in out


def test_unparseable_input_prints_nothing_so_caller_reports_not_measured():
    # 取數失敗時呼叫端靠「空輸出」印 ❔ 沒量到；這裡不能印出 SKIPPED_TOTAL=0 假裝量過（#85）。
    assert run("") == ""
    assert run("connection reset by peer") == ""
    assert run('{"message": "Not Found"}') == ""


def test_post_run_cleanup_steps_are_not_counted_as_gates_that_did_not_run():
    # 真實 run 44187715701 的形狀：紅之後被跳過的只有 action 的收尾清理，
    # 而獨立檢查帶 if 條件照跑、其中一步也紅。
    out = run(
        {
            "jobs": [
                {
                    "name": "subprojects",
                    "conclusion": "failure",
                    "steps": [
                        step("Set up job", "success"),
                        step("audit cli", "failure"),
                        step("audit harvest", "success"),
                        step("build workers", "failure"),
                        step("Post Run actions/setup-node@v5", "skipped"),
                        step("Complete job", "success"),
                    ],
                }
            ]
        }
    )
    assert "紅在第 2/6 步「audit cli」" in out
    assert "另有 1 步也紅" in out and "build workers" in out
    assert "⏭" not in out
    assert "SKIPPED_TOTAL=0" in out
