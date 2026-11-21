"""名字讀起來像唯讀的工具，不給旗標就不准刪檔（REFLEXES #96 第四 instance）。

`terminology-yaml-audit.py` 名字叫 audit，不給旗標就直接刪檔。08-30、11-18、11-19 三個
session 先後把它當唯讀工具跑，各刪掉 10 到 19 個詞條檔，三次都當場救回、三次都只寫進當天
memory，第三班才改成預設只報告。知識留在 memory 層跟留在註解層是同一件事：下一支同型
工具誕生時，沒有東西會叫。這條測試把那句「名字帶 audit 的腳本不一定只是讀」下沉到 CI。

兩條規則，都是確定性檢查：

1. 檔名帶 audit／check／scan／verify／lint／status／report…的 Python 工具，原始碼裡有
   刪檔呼叫時，必須同時有一個要人明確給的旗標（--apply、--purge、--delete…），否則進
   ALLOWLIST 並寫理由（例如只刪自己建的暫存檔）。
2. 那種旗標不可以是 `store_true` 配 `default=True`：給不給都一樣的旗標不是閘門。

射程（誠實記下）：只看 Python、只看檔名訊號、只看旗標「存在」不追控制流；shell 工具與
`git rm`／`subprocess` 刪檔不在內。它擋的是「新工具照舊約定出生」，不證明既有工具安全。
"""

import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SCRIPTS = REPO / "scripts"

READONLY_NAME = re.compile(
    r"(audit|check|scan|verify|lint|status|report|census|health|inspect|stats|drift|probe)",
    re.I,
)
DELETE_CALL = re.compile(r"\.unlink\(|os\.remove\(|os\.unlink\(|shutil\.rmtree\(")
OPT_IN_FLAG = re.compile(
    r"""["']--(apply|fix|write|purge[\w-]*|delete[\w-]*|prune|quarantine|clean[\w-]*|heal)["']"""
)
NOOP_FLAG = re.compile(
    r"""add_argument\(\s*["']--(apply|fix|write|purge[\w-]*|delete[\w-]*|prune|quarantine|clean[\w-]*|heal)["']"""
    r"""[^)]*action\s*=\s*["']store_true["'][^)]*default\s*=\s*True""",
    re.S,
)

# 路徑（相對 repo 根）→ 為什麼它可以沒有旗標就刪。理由要具體到讀的人能回頭驗。
ALLOWLIST = {
    "scripts/tools/lang-sync/verify-agent-batch.py": "只刪自己用 tempfile 建的 manifest，不碰 repo 內容",
}


def candidates():
    for f in sorted(SCRIPTS.rglob("*.py")):
        if "node_modules" in f.parts or not READONLY_NAME.search(f.stem):
            continue
        text = f.read_text(encoding="utf-8", errors="ignore")
        if DELETE_CALL.search(text):
            yield f.relative_to(REPO).as_posix(), text


def test_scan_actually_sees_the_known_cases():
    # 正控制：這把尺要看得到它為之而生的那支工具，否則下面兩條的「零違規」是空的（#99）。
    seen = {rel for rel, _ in candidates()}
    assert "scripts/tools/terminology-yaml-audit.py" in seen
    assert "scripts/tools/lang-sync/verify-batch.py" in seen


def test_readonly_named_tools_need_an_opt_in_flag_to_delete():
    offenders = [
        rel
        for rel, text in candidates()
        if rel not in ALLOWLIST and not OPT_IN_FLAG.search(text)
    ]
    assert not offenders, (
        "檔名讀起來像唯讀、卻沒有明確旗標就會刪檔的工具："
        + ", ".join(offenders)
        + "。照 repo 約定加 --apply（預設只報告），或進 ALLOWLIST 並寫理由。"
    )


def test_destructive_flags_are_not_no_ops():
    offenders = [rel for rel, text in candidates() if NOOP_FLAG.search(text)]
    assert not offenders, (
        "刪檔旗標是 store_true 配 default=True，給不給都一樣："
        + ", ".join(offenders)
        + "。改 argparse.BooleanOptionalAction 或把預設改成不刪。"
    )


def test_allowlist_has_no_stale_entries():
    seen = {rel for rel, _ in candidates()}
    stale = sorted(set(ALLOWLIST) - seen)
    assert not stale, f"ALLOWLIST 裡有已不存在或已不刪檔的項目，拿掉：{stale}"


def test_the_rules_catch_what_they_claim_to_catch():
    # 負控制：把病寫回去，尺要叫。
    bad = 'ap.add_argument("--purge-empty", action="store_true", default=True)'
    assert NOOP_FLAG.search(bad)
    assert not NOOP_FLAG.search('ap.add_argument("--purge", action="store_true")')
    assert not OPT_IN_FLAG.search("yaml_file.unlink()  # audit 順手清一下")
    assert OPT_IN_FLAG.search('APPLY = "--apply" in sys.argv')
