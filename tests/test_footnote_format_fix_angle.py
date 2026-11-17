"""footnote-format-fix 的 angle-bracket URL 回歸測試。

2026-10-28：`八點檔.md` 的 `[^14]` 在轉換後變成
`[意難忘(2004年電視劇）…](<https://zh.wikipedia.org/…_(2004年電視劇) — 維基百科條目`
——收尾的 `>)` 被吃掉，這條連結永遠不會被 markdown 解析。

病根：`normalize_footnote` 的第 2 分支（angle-bracket URL）只認 em dash 分隔，
`- 來源` 這種 ASCII hyphen 寫法掉進第 4 分支；第 4 分支用 `([^)]+)` 抓 destination，
會在 URL 自己內部的 `)` 就收手，把 URL 截斷、`>` 留在原地。

這兩條測試釘住「含括號的 angle-bracket URL 不得被截斷」與「認不出來就不要改」。
"""

import importlib.util
import sys
from pathlib import Path

MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "footnote-format-fix.py"
SPEC = importlib.util.spec_from_file_location("footnote_format_fix", MODULE_PATH)
assert SPEC and SPEC.loader
MODULE = importlib.util.module_from_spec(SPEC)
sys.modules["footnote_format_fix"] = MODULE
SPEC.loader.exec_module(MODULE)

WIKI_URL = "https://zh.wikipedia.org/zh-hant/%E6%84%8F%E9%9B%A3%E5%BF%98_(2004%E5%B9%B4%E9%9B%BB%E8%A6%96%E5%8A%87)"


def test_angle_url_with_parens_and_ascii_hyphen_keeps_url_intact():
    line = f"[^14]: [意難忘(2004年電視劇） - 越南難忘初戀紀錄](<{WIKI_URL}>) - Wikipedia"
    out = MODULE.normalize_footnote(line)

    assert out is not None
    # 完整 URL 必須原樣保留，收尾的 `>` 不可以被吃進 URL 裡
    assert f"]({WIKI_URL})" in out
    assert "<" not in out and ">" not in out


def test_angle_url_with_parens_and_em_dash_unchanged_behaviour():
    line = f"[^1]: [T](<{WIKI_URL}>) — 這是一段夠長的說明文字"
    out = MODULE.normalize_footnote(line)

    assert out is not None
    assert f"]({WIKI_URL}) — 這是一段夠長的說明文字" in out
    assert "<" not in out and ">" not in out


def test_unparseable_angle_line_is_left_alone():
    """第 2 分支認不出來時不可以硬改——寧可留給 footnote-format 去報。"""
    line = "[^2]: [T](<https://example.com/a_(b)>) 後面還有預期外的殘段"
    assert MODULE.normalize_footnote(line) is None


def test_plain_canonical_line_with_short_desc_still_extends():
    """既有行為：description 不足 10 字要補長（不是本次改動，但不能壞）。"""
    line = "[^3]: [小北百貨 - 維基百科](https://zh.wikipedia.org/zh-hant/x) — 維基百科"
    out = MODULE.normalize_footnote(line)

    assert out is not None
    assert out.startswith("[^3]: [小北百貨 - 維基百科](https://zh.wikipedia.org/zh-hant/x) — ")
