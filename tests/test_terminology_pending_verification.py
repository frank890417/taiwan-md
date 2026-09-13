"""tests/test_terminology_pending_verification.py — 詞庫查證欠條清單的單元測試。

重點不在「欄位讀得出來」，在**不從散文推論**：`⚠️ 查證分歧誠信標註` 那串字在詞庫裡
多數代表查證已完成，所以帶那串字但沒有 `pending_verification` 欄位的條目絕對不能被
撈出來（2026-09-13 實測 7 命中只有 1 條真的還欠著）。
"""

from __future__ import annotations

import importlib.util
from datetime import date
from pathlib import Path

import pytest

REPO_ROOT_REAL = Path(__file__).resolve().parents[1]
MODULE_PATH = REPO_ROOT_REAL / "scripts" / "tools" / "terminology-pending-verification.py"
SPEC = importlib.util.spec_from_file_location("terminology_pending_verification", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)

TODAY = date(2026, 9, 13)

RESOLVED_ENTRY = """id: resolved-one
display:
  taiwan: 具體
  china: 具體
notes: |
  ⚠️ 查證分歧誠信標註：詞是台灣本有，爭的是口語修飾用法。
  查證結論：教育部辭典有據，判定維持。
status: stable
"""

PENDING_ENTRY = """id: speechless
display:
  taiwan: 無言
  china: 無語
notes: |
  ⚠️ 查證分歧誠信標註（待查證）：讀者以一手史料挑戰斷代主張。
pending_verification:
  question: 本有用法還是反輸入？
  needs: 調閱《郭淑姿日記》第一、二冊
  issue: 'https://github.com/frank890417/taiwan-md/issues/1609'
  opened: '2026-08-28'
status: stable
"""


def write(term_dir: Path, name: str, body: str) -> None:
    term_dir.mkdir(parents=True, exist_ok=True)
    (term_dir / name).write_text(body, encoding="utf-8")


def test_prose_annotation_alone_is_not_a_pending_item(tmp_path):
    """帶誠信標註散文但查證已完成的條目，不該出現在欠條清單裡。"""
    write(tmp_path, "具體.yaml", RESOLVED_ENTRY)

    assert MODULE.collect(tmp_path, TODAY) == []


def test_structured_field_is_collected_with_age_and_issue(tmp_path):
    write(tmp_path, "無語.yaml", PENDING_ENTRY)

    items = MODULE.collect(tmp_path, TODAY)

    assert len(items) == 1
    assert items[0]["id"] == "speechless"
    assert items[0]["days_open"] == 16  # 2026-08-28 → 2026-09-13
    assert items[0]["issue"].endswith("/1609")
    assert items[0]["display_taiwan"] == "無言"


def test_mixed_dir_only_returns_the_one_that_still_owes(tmp_path):
    """六條已結案 + 一條真欠著 → 只回那一條（這就是本工具存在的理由）。"""
    for n in ("具體", "挺", "硫酸紙", "肯定", "腦子", "行吧"):
        write(tmp_path, f"{n}.yaml", RESOLVED_ENTRY.replace("resolved-one", n))
    write(tmp_path, "無語.yaml", PENDING_ENTRY)

    items = MODULE.collect(tmp_path, TODAY)

    assert [i["id"] for i in items] == ["speechless"]


def test_oldest_first_and_missing_opened_goes_last(tmp_path):
    write(tmp_path, "a.yaml", PENDING_ENTRY.replace("speechless", "newer").replace("2026-08-28", "2026-09-10"))
    write(tmp_path, "b.yaml", PENDING_ENTRY.replace("speechless", "older").replace("2026-08-28", "2026-07-01"))
    no_date = PENDING_ENTRY.replace("speechless", "undated").replace("  opened: '2026-08-28'\n", "")
    write(tmp_path, "c.yaml", no_date)

    items = MODULE.collect(tmp_path, TODAY)

    assert [i["id"] for i in items] == ["older", "newer", "undated"]
    # 沒寫 opened 的仍然列出來，不被靜默丟掉
    assert items[-1]["days_open"] is None


def test_missing_dir_is_fail_loud_not_green(tmp_path):
    """讀不到目錄是工具壞了（exit 3），不是「沒有欠條」。"""
    with pytest.raises(SystemExit) as exc:
        MODULE.collect(tmp_path / "does-not-exist", TODAY)
    assert exc.value.code == 3


def test_broken_yaml_is_fail_loud(tmp_path):
    write(tmp_path, "bad.yaml", "id: x\n  : : broken\n   - [\n")
    with pytest.raises(SystemExit) as exc:
        MODULE.collect(tmp_path, TODAY)
    assert exc.value.code == 3


def test_non_mapping_field_is_fail_loud(tmp_path):
    write(tmp_path, "weird.yaml", "id: w\npending_verification: 'just a string'\nstatus: stable\n")
    with pytest.raises(SystemExit) as exc:
        MODULE.collect(tmp_path, TODAY)
    assert exc.value.code == 3


def test_real_repo_has_the_1609_debt_registered(tmp_path):
    """回歸守門：#1609 的欠條必須留在真的詞庫裡，不能被後人順手刪掉而沒人發現。"""
    items = MODULE.collect(MODULE.TERM_DIR, TODAY)
    ids = [i["id"] for i in items]
    assert "speechless" in ids, "無語 的 pending_verification 不見了（issue #1609 仍未查證）"
