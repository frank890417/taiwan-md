"""prettier-url-stability — 量「會被寫進 git 的那一份」：commit 時的格式化器會不會改到網址.

lint-staged 在 pre-commit 排在所有檢查器之前跑 `prettier --write`，它有寫入權。
同一份檔案在一次 commit 裡於是有三個版本：檢查器量的、索引裡的、最後進 git 的。
在格式化器之外跑的驗收量到的是還沒被改寫的版本（REFLEXES #100）。

本檢查把這份檔案交給同一把 prettier（同 .prettierrc、同 .prettierignore），
比對格式化前後的網址多重集合（正規化：去反斜線跳脫，兩側同一把），不一致即 HARD，
並印出「原本 → 會變成」。它是 link-url-mangle 的泛化：那支認得已知的兩種形狀
（網址內多了 `*`、斜體圖說裡的 CJK Commons `_NN`），這支不猜形狀，直接問格式化器。

用在哪裡（驗收要在 commit 之前、格式化器之外的那些位置）：
  - 委派 agent／babel verify 交件前：`article-health.py <file> --check=prettier-url-stability`
  - 審沒走過本機 pre-commit 的投稿 PR 檔（squash merge 不跑 lint-staged）
  - 真正的 pre-commit 裡 lint-staged 已先改寫，這支只剩抓「prettier 自己不穩定」
    （格式化兩次結果不同）——09-24 四篇母稿就是這種

速度：常駐一個 node 行程（scripts/tools/lib/prettier-stdio.mjs），每份幾毫秒。
全站掃描的 profile（ci-deploy／dashboard／release-pr）預設不跑：進 git 的檔案都已經
被 lint-staged 格式化過，全站再跑一次只會量到不穩定那一小類，代價是 CI 多一段 node。

node 或 prettier 不在時回一條 WARN「沒量到」，不回綠燈（REFLEXES #85：不知道要有自己的符號）。

誕生：2026-09-27 twmd-self-evolve-weekly。四個載體（08-10 → 09-27）：產生器雙引號被改單引號、
斜體圖說網址 `_` 變 `*`、dispatcher 對譯文跑 prettier 而母稿沒跑、委派交件十四道閘全綠後
commit 時 prettier 把腳註折疊。REFLEXES #100「未落地」第一項。
"""

from __future__ import annotations

import atexit
import json
import re
import shutil
import subprocess
from collections import Counter
from itertools import zip_longest
from pathlib import Path
from typing import Any, Iterator

from ..types import FileTarget, Severity, Violation

CHECK_NAME = "prettier-url-stability"
DIMENSION = "structure"
DEFAULT_SEVERITY = Severity.HARD
EDITORIAL_REF = "REFLEXES #100（驗證對象要等於落地對象）+ link-url-mangle"
APPLIES_TO = ["*"]

_ROOT = Path(__file__).resolve().parents[5]
_HELPER = _ROOT / "scripts/tools/lib/prettier-stdio.mjs"

# 網址：http(s) 起頭，停在空白、角括號、或 markdown 連結收尾的 `)`（容許一層平衡括號）。
# 中文全形標點一定不是網址的一部分（網址裡的 CJK 標點會是 %E3%80%82 這種編碼）。
_CJK_PUNCT = "。，、；：！？「」『』（）《》〈〉【】…—"
_URL = re.compile(r"https?://(?:[^\s<>()\[\]" + _CJK_PUNCT + r"]|\([^\s()" + _CJK_PUNCT + r"]*\))+")

_proc: subprocess.Popen | None = None
_proc_failed: str | None = None


def _normalize(url: str) -> str:
    # 兩側同一把正規化（#100 (b)）：prettier 會加減反斜線跳脫，那不是網址變了。
    # 尾端的 `*`／`_` 是貼在網址後面的強調符號，prettier 在兩種寫法間切換屬正常格式化。
    return url.replace("\\", "").rstrip(".,;:!?'\"*_")


def _urls(text: str) -> Counter:
    return Counter(_normalize(m.group(0)) for m in _URL.finditer(text))


def _close() -> None:
    global _proc
    if _proc and _proc.poll() is None:
        try:
            _proc.stdin.close()
            _proc.wait(timeout=5)
        except Exception:
            _proc.kill()
    _proc = None


def _format(path: Path, text: str) -> tuple[str | None, str | None]:
    """回 (formatted_text, error)。ignored 的檔回原文。"""
    global _proc, _proc_failed
    if _proc_failed:
        return None, _proc_failed
    if _proc is None:
        node = shutil.which("node")
        if not node or not _HELPER.exists():
            _proc_failed = "找不到 node 或 prettier-stdio.mjs"
            return None, _proc_failed
        _proc = subprocess.Popen(
            [node, str(_HELPER)], cwd=str(_ROOT), stdin=subprocess.PIPE,
            stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, encoding="utf-8",
        )
        atexit.register(_close)
    try:
        rel = str(path.resolve().relative_to(_ROOT)) if path.is_absolute() else str(path)
    except ValueError:
        rel = str(path)
    try:
        _proc.stdin.write(json.dumps({"filepath": rel, "text": text}, ensure_ascii=False) + "\n")
        _proc.stdin.flush()
        line = _proc.stdout.readline()
    except (BrokenPipeError, OSError) as e:
        _proc_failed = f"prettier 行程中斷：{e}"
        return None, _proc_failed
    if not line:
        _proc_failed = "prettier 行程沒有回應（node_modules 裡沒有 prettier？）"
        return None, _proc_failed
    reply = json.loads(line)
    if not reply.get("ok"):
        return None, reply.get("error", "prettier 失敗")
    return reply["out"], None


def check(target: FileTarget, config: dict[str, Any]) -> Iterator[Violation]:
    if not (config or {}).get("enabled", True):
        return
    text = target.text
    if not text or "http" not in text:
        return

    # 格式化到不動點（最多三趟）：prettier 對某些強調符號不是冪等的，`*…*` 第一趟被換成
    # `_…_`、第二趟才把網址裡的 `_` 改壞。只比一趟，量到的是「這次 commit」而不是
    # 「下一次有人碰這個檔」；後者才是 09-24 四篇不穩定母稿的形狀。
    out, err = _format(Path(target.path), text)
    for _ in range(2):
        if err or out is None:
            break
        nxt, err = _format(Path(target.path), out)
        if err or nxt == out:
            break
        out = nxt
    if err:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.WARN,
            message=f"沒量到 commit 時格式化器會怎麼改這份檔：{err}",
            line=None,
            snippet="",
            editorial_ref=EDITORIAL_REF,
            fix_suggestion="在 repo 根目錄 `npm ci` 讓 node_modules 有 prettier，或改跑 `npx prettier --check <file>`",
        )
        return
    if out == text:
        return

    before, after = _urls(text), _urls(out)
    lost = before - after
    gained = after - before
    if not lost and not gained:
        return

    lost_list = list(lost.elements())
    gained_list = list(gained.elements())
    pairs = list(zip_longest(lost_list, gained_list, fillvalue=None))
    for url, became in pairs[:10]:
        line_no = next((n for n, l in enumerate(text.split("\n"), 1)
                        if url and url in l.replace("\\", "")), None)
        url = url or "（原本沒有）"
        became = became or "（消失）"
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=(
                f"commit 時 prettier 會把這個網址改掉：…{url[-60:]} → …{became[-60:]}。"
                "檢查器量的是改寫前的版本，進 git 的是改寫後的版本。"
            ),
            line=line_no,
            snippet=url[:90],
            editorial_ref=EDITORIAL_REF,
            fix_suggestion=(
                "改加害者所在的那一層（#100 (d)）：網址在 `_斜體_` 圖說裡就把連結移出斜體、"
                "放到非斜體的 `## 圖片來源`；網址裡有 `*`／`_` 被當成強調就改用 `<網址>` 或把連結移出強調範圍。"
                "改完跑 `npx prettier --check <file>` 確認穩定。"
            ),
        )
    if len(pairs) > 10:
        yield Violation(
            check=CHECK_NAME,
            severity=Severity.HARD,
            message=f"另有 {len(pairs) - 10} 個網址會被改寫（只列前 10 個）",
            line=None,
            snippet="",
            editorial_ref=EDITORIAL_REF,
        )
