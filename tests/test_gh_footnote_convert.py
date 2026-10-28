"""gh-footnote-convert.py — 譯本裡的 GitHub 錨點變形（2026-10-28）。

背景：`gh-footnote-leak` 與轉換器原本都只認 `[1](#user-content-fn-1)` 這一種寫法。
掃全庫時發現譯本還有三種變形，全部躲過兩支工具：

  `[^1](#user-content-fn-1)`     譯者改了 label、destination 沒換（fr/Culture/taiwan-prime-time-drama 14 處）
  `[3]( de #user-content-fn-3)`  destination 前夾了機翻殘字（es/Society/betel-nut）
  `[1](<U+200A>#user-content-fn-1)` destination 前夾隱形字元（en/Society/betel-nut）

這三種在 GitHub 預覽上看起來都正常，Astro 站上點下去都不會動；而 check 回報 0，
所以沒有任何儀器叫過。修法：兩支工具的正則都放寬到「destination 裡只要有
`#user-content-fn-<id>` 就認」，雜訊隨連結一起丟掉。
"""

import importlib.util
import sys
import types
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LIB = ROOT / "scripts" / "tools" / "lib"

# `tests/article_health/` 這個目錄跟 `scripts/tools/lib/article_health/` 同名，整包
# 跑 pytest 時 `import article_health` 會先撞到測試目錄。這裡用私有套件名掛載真正的
# 那一個，讓 check 的 `from ..types import …` 解得對，也不污染 sys.modules["article_health"]。
_PKG = "_ah_under_test"
for name, path in ((_PKG, LIB / "article_health"), (f"{_PKG}.checks", LIB / "article_health" / "checks")):
    module = types.ModuleType(name)
    module.__path__ = [str(path)]
    sys.modules[name] = module

_spec = importlib.util.spec_from_file_location(
    f"{_PKG}.checks.gh_footnote_leak", LIB / "article_health" / "checks" / "gh_footnote_leak.py"
)
CHECK = importlib.util.module_from_spec(_spec)
assert _spec and _spec.loader
sys.modules[_spec.name] = CHECK
_spec.loader.exec_module(CHECK)

SPEC = importlib.util.spec_from_file_location(
    "gh_footnote_convert", ROOT / "scripts" / "tools" / "gh-footnote-convert.py"
)
CONVERT = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(CONVERT)


def _convert(text: str) -> str:
    out, _, _ = CONVERT.convert(text)
    return out


def test_canonical_ref_converts():
    assert _convert("正文。[1](#user-content-fn-1)\n") == "正文。[^1]\n"


def test_hybrid_label_ref_converts():
    """label 已經是 `[^1]`，destination 還是 GitHub 錨點。"""
    assert _convert("正文。[^1](#user-content-fn-1)\n") == "正文。[^1]\n"


def test_ref_with_leading_junk_converts():
    """destination 前夾了機翻殘字 ` de `。"""
    assert _convert("正文。[3]( de #user-content-fn-3)\n") == "正文。[^3]\n"


def test_ref_with_invisible_char_converts():
    """destination 前夾 HAIR SPACE（U+200A）。"""
    assert _convert("正文。[1](\u200a#user-content-fn-1)\n") == "正文。[^1]\n"


def test_definition_line_with_junk_backref_converts():
    line = "1. 來源敘述 [↩]( de #user-content-fnref-1)\n"
    out = _convert(line)
    assert out.startswith("[^1]: ")
    assert "#user-content" not in out


def test_backref_is_not_read_as_ref():
    """`#user-content-fnref-` 不能誤吃成 `#user-content-fn-`。"""
    out = _convert("1. 來源敘述 [↩](#user-content-fnref-1)\n")
    assert out.startswith("[^1]: ")
    assert "#user-content" not in out


def test_definition_id_follows_body_refs_not_backref_suffix():
    """第一個回跳箭頭壞掉時，定義編號要跟著正文的 `[^2]`，不是 `fnref-2-2`。"""
    src = (
        "正文引用兩次[2](#user-content-fn-2)。\n\n"
        "1. 來源敘述 [↩](#user-int-fnref-2) [↩2](#user-content-fnref-2-2)\n"
    )
    out = _convert(src)
    assert "[^2]" in out
    assert "[^2-2]" not in out
    assert out.count("[^2]:") == 1
    assert "#user-" not in out


def test_definition_id_strips_occurrence_suffix():
    """只剩 `fnref-2-2` 可用時，也要回推成 `[^2]`。"""
    src = "正文[2](#user-content-fn-2)。\n\n1. 來源敘述 [↩2](#user-content-fnref-2-2)\n"
    out = _convert(src)
    assert "[^2]: " in out
    assert "[^2-2]" not in out


def test_definition_id_not_stripped_without_body_evidence():
    """正文沒有可對照的 id 時，原樣保留——不憑後綴長相亂削。"""
    src = "正文[1-2](#user-content-fn-1-2)。\n\n1. 來源敘述 [↩](#user-content-fnref-1-2)\n"
    out = _convert(src)
    assert "[^1-2]" in out


def test_check_flags_all_variants():
    variants = [
        "[1](#user-content-fn-1)",
        "[^2](#user-content-fn-2)",
        "[3]( de #user-content-fn-3)",
        "[4](\u200a#user-content-fn-4)",
        "[↩](#user-content-fnref-5)",
        "[↩](#user-int-fnref-6)",
    ]
    for v in variants:
        assert CHECK._REF.search(v) or CHECK._BACKREF.search(v), v


def test_check_ignores_plain_footnote_syntax():
    assert not CHECK._REF.search("正文。[^1] 腳註")
    assert not CHECK._BACKREF.search("[^1]: 來源 — 說明")
