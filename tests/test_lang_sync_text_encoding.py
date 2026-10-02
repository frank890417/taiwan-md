"""lang-sync 的每一次文字讀寫都要自己講明編碼，不要問作業系統。

誕生：2026-09-03 maintainer-am。投稿者 stantheman0128（Windows 11，locale cp950）
回報 issue #1661 — `Path.read_text()` 不帶 encoding 時走系統預設編碼，讀 zh 正文
會 `UnicodeDecodeError`，寫回會把 UTF-8 文章存成 cp950。PR #1662 補齊了翻譯鏈上
的七支，本測試把同一條規則變成閘門，並在同一輪把整個目錄剩下的補完。

為什麼守整個目錄而不是列一份「會碰到中文的檔案」清單：那份清單要有人維護，而
會漂掉的正是它（REFLEXES #83 — 豁免清單各分支各自維護）。這裡的規則沒有例外，
因為對這些檔案來說明講 UTF-8 永遠是對的：JSON、金鑰、`.env`、文章正文都一樣。

在 macOS / Linux 上這條規則看不出差別——那正是它需要機器來守的原因，飛輪跑在
UTF-8 預設的機器上，破了也不會叫。

2026-10-02 補兩個洞：原本只看 `.read_text/.write_text`、只掃第一層，內建 `open()`
跟 `backends/` 子目錄沒人守。`prepare-batch.py`（TRANSLATION-PIPELINE 叫投稿者跑的
那支）讀 `_translation-status.json` 用的就是不帶 encoding 的 `open()`，同病 16 處。
現在連 `open()` 一起量、子目錄一起掃。`mode` 不是字面值時量不出是不是二進位，不算
違規（目前沒有這種寫法）。
"""

import ast
import pathlib


LANG_SYNC = pathlib.Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync"


def _open_mode(node: ast.Call):
    """open() 的 mode 字面值；沒給就是 'r'；不是字面值回 None（量不出來）。"""
    mode = node.args[1] if len(node.args) > 1 else None
    for kw in node.keywords:
        if kw.arg == "mode":
            mode = kw.value
    if mode is None:
        return "r"
    if isinstance(mode, ast.Constant) and isinstance(mode.value, str):
        return mode.value
    return None


def _offenders(source: str, label: str) -> list[str]:
    offenders = []
    for node in ast.walk(ast.parse(source, filename=label)):
        if not isinstance(node, ast.Call):
            continue
        if any(kw.arg == "encoding" for kw in node.keywords):
            continue
        func = node.func
        if isinstance(func, ast.Attribute) and func.attr in ("read_text", "write_text"):
            offenders.append(f"{label}:{node.lineno} .{func.attr}()")
        elif isinstance(func, ast.Name) and func.id == "open":
            mode = _open_mode(node)
            if mode is not None and "b" not in mode:
                offenders.append(f"{label}:{node.lineno} open(mode={mode!r})")
    return offenders


def test_lang_sync_text_io_declares_utf8():
    offenders = []
    for path in sorted(LANG_SYNC.rglob("*.py")):
        offenders += _offenders(path.read_text(encoding="utf-8"),
                                path.relative_to(LANG_SYNC).as_posix())
    assert not offenders, (
        "這些讀寫沒有指定 encoding，在系統預設不是 UTF-8 的機器上（Windows cp950）"
        "讀中文正文會炸、寫回會存成別的編碼：\n  " + "\n  ".join(offenders)
    )


def test_gate_flags_builtin_open_and_read_text():
    """閘門自己要會叫：二進位 open 與已講明 encoding 的放行，其餘抓出來。"""
    sample = (
        "import json, pathlib\n"
        "a = json.load(open('x.json'))\n"
        "b = open('y.bin', 'rb')\n"
        "c = pathlib.Path('z').read_text()\n"
        "d = open('w.json', 'w', encoding='utf-8')\n"
    )
    flagged = [o.split(":")[1].split()[0] for o in _offenders(sample, "sample.py")]
    assert sorted(flagged) == ["2", "4"], flagged
