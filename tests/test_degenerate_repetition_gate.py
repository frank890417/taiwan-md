"""模型退化成「同一個詞連印 N 次」時，要有東西會叫（issue #2055）。

讀者 Jasi Duy Nguyễn 2026-11-21 在站上回報〈國家太空中心〉越南文版的開頭摘要
「重複 tên 約 60 次」（實測 49 次）。那一行是 `description`，原樣印在搜尋結果裡，
而且迴圈同時吃掉內容——中文原文寫「沒有名字、沒有火箭、沒有自己的地」三件事，
譯文只剩第一件。

它穿過了翻譯產線當時的每一道閘門：`verify-translation.py` 19/19 全過（腳註數、
章節數、網址 multiset、passthrough 欄位都對），`article-health --profile=pre-commit`
只給 `seo-meta` 的「太長」warn 而不是 hard，ratio 甚至因為變長而更「健康」。
那些尺量的是結構與長度，沒有一支在問「這串字還是人話嗎」。

這份測試把三件事下沉到 CI，免得修法只住在今天的 memory 裡：

1. 檢查器自己的正控制要過（造得出的退化抓得到、正當重複不誤殺）。
2. 真實缺陷的那一版必須被判 fail——用 git 裡那份原始內容當 fixture，不自己編，
   因為自造的測試資料會帶著作者對「壞長什麼樣」的想像（REFLEXES #99）。
3. 它必須真的接在翻譯產線的硬閘門上。病是產線出的（commit 7a750b2eb7，越南語
   首批），所以閘門接在投稿端或 pre-commit 都不會在產出那一刻叫
   （LESSONS `documented-gate-never-wired-to-the-line`）。

射程（誠實記下）：只看 frontmatter 的 title／description 與正文，只抓「同一個詞
連續重複」這一種退化；同義詞繞圈、整段複製、語意空轉都不在內。
"""

import re
import subprocess
import sys
from pathlib import Path

import pytest

REPO = Path(__file__).resolve().parent.parent
CHECKER = REPO / "scripts/tools/lang-sync/degenerate-repetition-check.py"
DISPATCHER = REPO / "scripts/tools/lang-sync/babel-dispatch.py"
DEFECT_PATH = "knowledge/vi/Technology/tasa-taiwan-space-agency.md"


def test_checker_exists():
    assert CHECKER.is_file(), f"缺少檢查器：{CHECKER}"


def test_selftest_passes():
    """檢查器自帶的正控制必須全過（尺先驗再用）。"""
    r = subprocess.run(
        [sys.executable, str(CHECKER), "--selftest"],
        cwd=REPO, capture_output=True, text=True,
    )
    assert r.returncode == 0, f"正控制沒過：\n{r.stdout}\n{r.returncode}"
    assert "❌" not in r.stdout, f"有正控制失敗：\n{r.stdout}"


def test_empty_input_is_not_reported_as_clean():
    """掃到 0 檔要回 2 不回 0——量不到東西時不可以回答「乾淨」（REFLEXES #85）。"""
    r = subprocess.run(
        [sys.executable, str(CHECKER)],
        cwd=REPO, capture_output=True, text=True,
    )
    assert r.returncode == 2, f"掃 0 檔應回 2，實回 {r.returncode}：{r.stdout}"


def _git_show(rev: str, path: str) -> str:
    r = subprocess.run(
        ["git", "show", f"{rev}:{path}"], cwd=REPO, capture_output=True, text=True
    )
    return r.stdout


def test_real_defect_is_rejected(tmp_path):
    """用真實缺陷當 fixture：issue #2055 那一版必須 fail。

    從 git 歷史撈 7a750b2eb7（越南語首批）那一版；撈不到就 skip 並說清楚，
    不靜默當通過。
    """
    content = _git_show("7a750b2eb7", DEFECT_PATH)
    if "tên tên tên tên tên" not in content:
        pytest.skip(
            "git 歷史裡撈不到 issue #2055 原始內容（淺複製？），"
            "本條未驗證——不當成通過"
        )
    f = tmp_path / "defect.md"
    f.write_text(content, encoding="utf-8")
    r = subprocess.run(
        [sys.executable, str(CHECKER), "--files", str(f)],
        cwd=REPO, capture_output=True, text=True,
    )
    assert r.returncode == 1, f"真實缺陷沒被擋下：{r.stdout}"
    assert "tên" in r.stdout


def test_current_version_is_clean():
    """修好的那一版要是乾淨的（否則下面那條全庫掃描永遠紅）。"""
    r = subprocess.run(
        [sys.executable, str(CHECKER), "--files", DEFECT_PATH],
        cwd=REPO, capture_output=True, text=True,
    )
    assert r.returncode == 0, f"現行版本仍有退化重複：{r.stdout}"


def test_gate_is_wired_into_the_translation_line():
    """它必須被 babel-dispatch 的 verify_one() 呼叫，並進入 ok 的連乘式。

    只檢查「有呼叫 + 進判定式」，不追控制流——射程寫在模組 docstring。
    """
    src = DISPATCHER.read_text(encoding="utf-8")
    assert "degenerate-repetition-check.py" in src, (
        "degenerate-repetition-check 沒有接進 babel-dispatch；"
        "病是產線出的，閘門不在產線上等於沒有閘門"
    )
    m = re.search(r"^\s*ok = \((.*?)\)\s*$", src, re.M | re.S)
    assert m, "找不到 verify_one() 的 ok = (...) 判定式"
    assert "degenerate_fail" in m.group(1), (
        "degenerate_fail 沒進 ok 判定式——檢查器會跑但結果不影響放行"
    )


def test_docstring_lists_every_gate_it_runs():
    """verify_one 的 docstring 要列出它實際呼叫的每一道閘門。

    2026-11-22 之前它停在前四道，而 currency 與 magnitude 早就接上來了：
    讀 docstring 的人會少看到兩道正在守的閘門（REFLEXES #56 宣告與實作漂移）。
    """
    src = DISPATCHER.read_text(encoding="utf-8")
    start = src.index("def verify_one(")
    body = src[start : start + 6000]
    doc_end = body.index('"""', body.index('"""') + 3)
    doc = body[:doc_end]
    called = set(re.findall(r'"scripts/tools/(?:lang-sync/)?([a-z0-9-]+\.py)"', body))
    missing = sorted(t for t in called if t not in doc)
    assert not missing, f"docstring 沒列出實際呼叫的閘門：{missing}"
