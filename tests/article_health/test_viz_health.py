"""Regression tests for viz-health 規則 A（資料模組必標來源）。

誕生 2026-10-22（twmd-maintainer-daily）：規則 A 自 2026-10-16 起是 100% 假陽性。
那天把來源標籤從寫死的三個中英字串改成從 renderer 解析（正確的方向，避免第二份
語言清單），同一個 commit 給正則加上 `^` 錨點卻沒加 `re.MULTILINE`；而呼叫端是
`_SRC_RE.search(block_content)`，來源列永遠排在標題列後面，於是沒有一個區塊能
命中。當天起全庫 110 篇、332 個資料模組區塊全部被報成「缺來源標註」，而逐檔
比對顯示 332 個區塊其實都有來源列。

它六天沒被發現的原因有三個疊在一起：規則 A 是 WARN 級不會讓任何閘門轉紅、
警告長得像既有的格式債、而 `viz_health` 當時沒有任何測試。本檔補的是第三個。
"""

import re
from pathlib import Path

from lib.article_health.checks import viz_health
from lib.article_health.loader import load_target

_FRONTMATTER = """---
title: '測試'
description: '測試用'
date: 2026-10-22
category: 'Technology'
tags: ['測試']
author: 'Taiwan.md Contributors'
---

"""


def _target(tmp_path: Path, body: str):
    path = tmp_path / "sample.md"
    path.write_text(_FRONTMATTER + body, encoding="utf-8")
    return load_target(path)


def _missing_source(target):
    return [
        v
        for v in viz_health.check(target, {})
        if "缺來源標註" in v.message
    ]


def test_source_row_after_title_counts_as_source(tmp_path):
    """本檔存在的理由：來源列在標題列之後，是所有既有文章的實際寫法。"""
    target = _target(
        tmp_path,
        "```tw-bars\n"
        "全國房價所得比創高\n"
        "全國 2014 | 8.41 倍\n"
        "台北 2024 | 16.60 倍\n"
        "來源：內政部不動產資訊平台，2024\n"
        "```\n",
    )
    assert _missing_source(target) == []


def test_source_row_last_in_a_five_field_dot_block(tmp_path):
    """民調式三值列（點估＋區間）是最長的資料列形狀，不該影響來源偵測。"""
    target = _target(
        tmp_path,
        "```tw-dot\n"
        "兩份民調的差距大於各自的抽樣誤差\n"
        "甲 | 49 | 46.1 | 51.9 | 現任\n"
        "*乙 | 41 | 38.1 | 43.9 | 挑戰者\n"
        "來源：某民調中心，2026-10-08\n"
        "```\n",
    )
    assert _missing_source(target) == []


def test_block_without_source_row_still_warns(tmp_path):
    """負控制：真的缺來源要照報，修假陽性不能把規則 A 關掉。"""
    target = _target(
        tmp_path,
        "```tw-bars\n"
        "沒有來源的圖\n"
        "甲 | 1\n"
        "乙 | 2\n"
        "```\n",
    )
    assert len(_missing_source(target)) == 1


def test_non_source_colon_row_does_not_satisfy_the_rule(tmp_path):
    """「備註：」這類冒號鍵列不是來源列，不能讓區塊蒙混過關。"""
    target = _target(
        tmp_path,
        "```tw-bars\n"
        "標題\n"
        "甲 | 1\n"
        "備註：資料自行整理\n"
        "```\n",
    )
    assert len(_missing_source(target)) == 1


def test_source_label_is_derived_from_the_renderer_not_hardcoded(tmp_path):
    """標籤清單的 SSOT 在 renderer：外語來源列（如葡文 Fonte）也要認得。

    2026-10-16 那次重構的目的就是這個，本測試把它鎖住，避免為了修 MULTILINE
    而退回寫死三個中英標籤。
    """
    labels = viz_health._src_labels()
    assert len(labels) >= 12, labels
    assert "來源" in labels
    target = _target(
        tmp_path,
        "```tw-bars\nTítulo\nA | 1\nFonte: Instituto, 2026\n```\n",
    )
    assert _missing_source(target) == []


def test_matcher_is_multiline():
    """直接盯住那個 flag——它是這整個家族的單點故障。"""
    assert viz_health._src_re().flags & re.MULTILINE
