import importlib.util
import re
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1]
    / "scripts" / "tools" / "lang-sync" / "patch-translate.py"
)
SPEC = importlib.util.spec_from_file_location("patch_translate", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_chapter_urls_are_armored_and_restored(tmp_path):
    """章節級 patch 跟分段式引擎共用 st._validate_chunk()，也就共用「正文連結
    網址對不上」這個失敗家族；2026-09-23 兩條引擎同時改走 @@LINKn@@ 裝甲，
    原始網址不再進 prompt（成因結構一樣就一起修，不等它在這邊也長出統計）。"""
    seen = []

    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            seen.append(user)
            return re.sub(r"[一-鿿，。]+", "translated prose ", user)

    zh_chapter = (
        "## 章節\n\n這是[台灣的頁面](/society/%E5%8F%B0%E7%81%A3)與"
        "[參考來源](https://example.org/a_(b))的說明文字，長度要夠過比值下限。" * 3
    )

    out, issues = MODULE.translate_regular_chapter(
        zh_chapter, "en", Backend(), [], None, None, {}, tmp_path)

    assert "@@LINK0@@" in seen[0]
    assert "/society/%E5%8F%B0%E7%81%A3" not in seen[0], "原始 URL 不該進 prompt"
    assert "/society/%E5%8F%B0%E7%81%A3" in out
    assert "https://example.org/a_(b)" in out
    assert issues == []


def test_frontmatter_debt_flags_tags_collapsed_into_one_string():
    # 2026-09-27：ar 438 篇、ja 14 篇的 tags 是一個字串包著整張清單（整篇引擎只切 ASCII 逗號）；
    # patch 碰到時要改走 LLM 重翻 frontmatter，不沿用那一格
    zh = {"tags": ["泰雅族", "紋面", "染織", "gaga", "文化復興"]}
    collapsed = {"tags": ["タイヤル族、紋面、染織、gaga、文化復興"]}
    assert MODULE.frontmatter_debt(zh, collapsed) == ["tags 擠成 1 個字串（zh 有 5 個）"]
    fine = {"tags": ["Atayal", "facial tattoo", "weaving", "gaga", "cultural revival"]}
    assert MODULE.frontmatter_debt(zh, fine) == []
    # zh 本來就只有一個標籤：譯文一個標籤是正常的
    assert MODULE.frontmatter_debt({"tags": ["泰雅族"]}, {"tags": ["タイヤル族"]}) == []


def test_frontmatter_debt_flags_cjk_in_title_or_description_outside_ja_ko():
    # 2026-10-14：〈幾米〉pt 的舊 description 帶「(廖福彬)」，沿用舊值必被
    # validate_frontmatter_block 擋下；patch 要先判成債改走 LLM 重翻 frontmatter
    glossed = {"title": "Jimmy Liao", "description": "Liao Fu-pin (廖福彬) desenhava."}
    assert MODULE.frontmatter_debt({}, glossed, "pt") == ["description 含漢字（validate_frontmatter_block 會擋）"]
    assert MODULE.frontmatter_debt({}, {"title": "幾米", "description": "x"}, "ar") == ["title 含漢字（validate_frontmatter_block 會擋）"]
    # ja／ko 的標題本來就可能有漢字，驗證不查，這裡也不判
    assert MODULE.frontmatter_debt({}, {"title": "幾米", "description": "廖福彬"}, "ja") == []
    # 乾淨的譯文、以及沒給語言的舊呼叫方式，都不產生債
    assert MODULE.frontmatter_debt({}, {"title": "Jimmy Liao", "description": "clean"}, "pt") == []
    assert MODULE.frontmatter_debt({}, glossed) == []


def test_chapter_prompt_carries_bare_yuan_money_rule(tmp_path):
    """2026-10-03：「裸的元＝新台幣」只寫進整篇引擎，patch 章節提示沒有；hi〈台灣
    石虎保育〉走 patch，兩個互不相干的模型都把「兩萬元」寫成 युआन。規則住在
    st.money_rule()，每條送正文給模型的路都要帶到。"""
    systems = []

    class Backend:
        name = "stub"

        def translate(self, system, user, **_kwargs):
            systems.append(system)
            return re.sub(r"[一-鿿，。]+", "translated prose ", user)

    zh_chapter = "## 補助\n\n每公頃最高兩萬元的補助，拍到石虎再加一萬元，長度要夠過比值下限。" * 3
    MODULE.translate_regular_chapter(zh_chapter, "hi", Backend(), [], None, None, {}, tmp_path)

    assert systems and "New Taiwan dollars" in systems[0]
    assert "युआन" in systems[0]


def test_footnote_chapter_prompt_carries_bare_yuan_money_rule(tmp_path):
    """patch 的腳註章（參考資料區）提示也要帶 money_rule（2026-10-14）。"""
    systems = []

    class Backend:
        name = "stub"

        def translate(self, system, user, **_kwargs):
            systems.append(system)
            return user

    zh_chapter = "## 參考資料\n\n[^1]: [立法院：預算審查](https://example.org) — 預算從 150 億元增至 1,400 億元\n"
    try:
        MODULE.translate_footnote_chapter(zh_chapter, "id", Backend(), {}, tmp_path)
    except Exception:
        pass

    assert systems and "New Taiwan dollars" in systems[0]


def test_footnote_defs_living_in_a_different_chapter_are_carried_or_refused():
    # 2026-11-04：〈台灣電影〉zh 把 72 條定義放在結語後、譯文全放在檔尾延伸閱讀後；
    # zh 只動延伸閱讀，重翻那章就把定義一起換掉，四語兩模型都被 footnote count 擋
    zh = ["## 結語", "正文[^1]", "", "[^1]: [來源](https://a.example) — 說明", "",
          "## 延伸閱讀", "- [甲](/art/甲)"]
    tr = ["## Conclusion", "body[^1]", "", "## Further reading", "- [A](/en/art/a)", "",
          "[^1]: [Source](https://a.example) — note"]
    zc, tc = MODULE.split_chapters(zh), MODULE.split_chapters(tr)

    carry, why = MODULE.plan_footnote_carry(zh, zc, tr, tc, {1})
    assert why == ""
    assert carry == {1: ["[^1]: [Source](https://a.example) — note"]}

    # zh 的定義章被碰、譯文定義不在那章 → 只能整篇重翻
    carry, why = MODULE.plan_footnote_carry(zh, zc, tr, tc, {0})
    assert carry is None and "錯位" in why

    # 尾段夾了非定義行 → 不冒險
    tr_mixed = tr + ["", "stray paragraph"]
    carry, why = MODULE.plan_footnote_carry(zh, zc, tr_mixed, MODULE.split_chapters(tr_mixed), {1})
    assert carry is None and "非定義行" in why
