import importlib.util
import sys
from pathlib import Path

import pytest


LANG_SYNC_DIR = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync"
MODULE_PATH = LANG_SYNC_DIR / "cjk-leak-check.py"
SPEC = importlib.util.spec_from_file_location("cjk_leak_check", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)

# translate.py 的 `backends` 是相對於 lang-sync 目錄的 local package，只有在
# 該目錄進了 sys.path 才 import 得到（正常執行 `python3 .../translate.py` 時
# Python 會自動把腳本所在目錄加進 sys.path[0]；用 spec_from_file_location 從
# tests/ 載入則不會，要手動補）。
sys.path.insert(0, str(LANG_SYNC_DIR))
TRANSLATE_MODULE_PATH = LANG_SYNC_DIR / "translate.py"
_TRANSLATE_SPEC = importlib.util.spec_from_file_location("translate", TRANSLATE_MODULE_PATH)
TRANSLATE_MODULE = importlib.util.module_from_spec(_TRANSLATE_SPEC)
assert _TRANSLATE_SPEC and _TRANSLATE_SPEC.loader
_TRANSLATE_SPEC.loader.exec_module(TRANSLATE_MODULE)


def test_ja_ignores_zh_markers_in_passthrough_frontmatter(tmp_path):
    path = tmp_path / "ja--example.md"
    path.write_text(
        "---\n"
        "title: '日本語の題名'\n"
        "rationale: '這個中文欄位是編輯資料'\n"
        "researchReport: 'reports/研究/那個人.md'\n"
        "---\n\n"
        "これは完全に日本語の本文です。\n",
        encoding="utf-8",
    )

    assert MODULE.scan_file(path, lang="ja") == []


def test_ja_still_flags_zh_marker_in_body(tmp_path):
    path = tmp_path / "ja--example.md"
    path.write_text(
        "---\n"
        "title: '日本語の題名'\n"
        "rationale: '這個中文欄位是編輯資料'\n"
        "---\n\n"
        "これは日本語ですが，那個段落は翻訳されていない。\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="ja")

    assert any("'那個'" in hit for hit in hits)


# ═══════════════ 書目區豁免（OBSERVER-QUEUE #23 選 A，2026-09-05）═══════════
#
# 背景：babel-nightly 620 筆裡 251 筆敗在同一處——參考資料區沒翻的中文來源
# 標題（`深度訪談`、`天下換日線`），其中含簡體來源（`维基百科`、
# `国家文化记忆库`）是另一回事。哲宇拍板選 A：書目區的正體來源標題放行，
# 簡體仍擋。以下 6 案例對應任務清單的最低要求（正文 leak 仍擋／腳註定義行
# 繁體標題放行／參考資料區繁體標題放行／參考資料區簡體擋／簡體出現在正文
# 擋／無 CJK 全綠），另加 2 案例驗證 translate.py 實際呼叫的生產閘門
# （detect_cjk_leak）跟 cjk-leak-check.py 的判準同步。


def test_body_leak_still_blocked_for_non_cjk_lang(tmp_path):
    """案例 1：正文中間夾雜未譯中文，跟書目無關——維持原本行為，仍擋。"""
    path = tmp_path / "en--example.md"
    path.write_text(
        "---\ntitle: 'Example'\n---\n\n"
        "TSMC built its fabs over decades, and 台灣半導體產業的發展歷程相當複雜"
        " remains untranslated in the middle of this sentence.\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="en")

    assert any("正文 CJK leak" in h for h in hits)


def test_footnote_def_line_traditional_title_allowed(tmp_path):
    """案例 2：單行腳註定義裡的正體來源標題（`[^n]: [標題](url) — 說明`）
    ——這是最常見的引用格式，本來就該放行（既有行為，非本次新增，但要跟新
    判準一起回歸測試，避免書目區重構把這條路弄壞）。"""
    path = tmp_path / "en--example.md"
    path.write_text(
        "---\ntitle: 'Example'\n---\n\n"
        "Little Tigers debuted in 1988[^1].\n\n"
        "## References\n\n"
        "[^1]: [小虎隊 - 維基百科](https://zh.wikipedia.org/zh-tw/小虎隊)"
        " — Wikipedia entry on the group's formation and breakup timeline.\n",
        encoding="utf-8",
    )

    assert MODULE.scan_file(path, lang="en") == []


def test_bibliography_section_traditional_title_allowed(tmp_path):
    """案例 3：參考資料區的正體來源標題放行——即使沒有走 `[^n]:` 腳註語法
    （舊式純文字條列），只要落在 References/參考資料 標題之後到檔尾，就算
    書目區。這是 #23 選 A 要解的最大宗失敗（620 筆裡 251 筆），修前會被
    CJK_RUN_RE 判成正文洩漏整篇擋下。"""
    path = tmp_path / "en--example.md"
    path.write_text(
        "---\ntitle: 'Example'\n---\n\n"
        "Overseas Taiwanese cannot vote by mail; they must return in person"
        " to cast a ballot[^1].\n\n"
        "## References\n\n"
        "- 台灣的不在籍投票爭議 — Crossing"
        " (https://crossing.cw.com.tw/article/12817):"
        " Current state of overseas voting rights.\n\n"
        "[^1]: 台灣的不在籍投票爭議 — Crossing"
        " (https://crossing.cw.com.tw/article/12817):"
        " Current state of overseas voting rights.\n",
        encoding="utf-8",
    )

    assert MODULE.scan_file(path, lang="en") == []


def test_bibliography_section_simplified_still_blocked(tmp_path):
    """案例 4：參考資料區出現簡體來源標題（`维基百科`）——即使落在書目區、
    即使整條腳註定義都在同一行（原本會被 strip_legit_zones 整行抹掉、完全
    偵測不到），仍要判 leak。這是修好「繁體放行」後最容易連帶放水的洞：
    書目區豁免只放寬正文/書目分區線，不放寬簡繁判準。"""
    path = tmp_path / "id--example.md"
    path.write_text(
        "---\ntitle: 'Example'\n---\n\n"
        "Larangan menyeberang ke Taiwan pernah diberlakukan secara ketat"
        " pada era kolonial[^1].\n\n"
        "## Referensi\n\n"
        "[^1]: [维基百科：台湾荷兰统治时期]"
        "(https://zh.wikipedia.org/zh-tw/%E8%87%BA%E7%81%A3%E8%8D%B7%E8%98%AD"
        "%E7%B5%B1%E6%B2%BB%E6%99%82%E6%9C%9F)"
        " — Entri Wikipedia tentang masa pemerintahan Belanda di Taiwan.\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="id")

    assert any("書目區簡體殘留" in h for h in hits)
    assert any("'维'" in h for h in hits)


def test_simplified_in_body_still_blocked(tmp_path):
    """案例 5：簡體字出現在正文（跟書目無關）——簡體字本身也是連續 4+ 漢字，
    既有的 CJK_RUN_RE 正文判準本來就會擋下，不需要靠 detect_simplified_residue
    (那支只管書目區)。這裡驗證書目區重構沒有意外把正文的判準也放寬。"""
    path = tmp_path / "en--example.md"
    path.write_text(
        "---\ntitle: 'Example'\n---\n\n"
        "The National Cultural Memory Bank documents this era, though"
        " 国家文化记忆库 remains untranslated here in the middle of the body.\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="en")

    assert any("正文 CJK leak" in h for h in hits)


def test_clean_file_no_cjk_passes(tmp_path):
    """案例 6：全文無 CJK、書目區也是正常單行正體腳註——全綠，沒有誤判。"""
    path = tmp_path / "ru--example.md"
    path.write_text(
        "---\ntitle: 'Golden Melody'\n---\n\n"
        "Golden Melody Award is Taiwan's most prestigious music award[^1].\n\n"
        "## Ссылки\n\n"
        "[^1]: [Golden Melody Award - Википедия]"
        "(https://zh.wikipedia.org/zh-tw/金曲獎)"
        " — Wikipedia entry on the award's history and structure.\n",
        encoding="utf-8",
    )

    assert MODULE.scan_file(path, lang="ru") == []


def test_bibliography_zone_ja_simplified_still_blocked(tmp_path):
    """加碼案例：ja/ko 分支用 marker 掃描正文，跟非 CJK 分支邏輯不同，但書目
    區簡體殘留檢查是兩分支共用的同一把尺——驗證 ja 也有這條保護。"""
    path = tmp_path / "ja--example.md"
    path.write_text(
        "---\ntitle: '例'\n---\n\n"
        "これは完全に日本語の本文です。\n\n"
        "## 参考資料\n\n"
        "[^1]: [维基百科：交工樂隊]"
        "(https://zh.wikipedia.org/zh-tw/交工樂隊) — 楽団の結成から解散までの記録。\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="ja")

    assert any("書目區簡體殘留" in h for h in hits)


def test_translate_detect_cjk_leak_matches_bibliography_policy(tmp_path):
    """驗證實際生產閘門 translate.py 的 detect_cjk_leak（babel-nightly 真正
    呼叫的那支）跟 cjk-leak-check.py 的書目區判準同步——不是兩套各自維護。"""
    text = (
        "---\ntitle: 'Example'\n---\n\n"
        "Overseas Taiwanese cannot vote by mail[^1].\n\n"
        "## References\n\n"
        "[^1]: 台灣的不在籍投票爭議 — Crossing"
        " (https://crossing.cw.com.tw/article/12817):"
        " Current state of overseas voting rights.\n"
    )

    assert TRANSLATE_MODULE.detect_cjk_leak(text, "en") is None


def test_translate_detect_cjk_leak_blocks_simplified_bibliography():
    text = (
        "---\ntitle: 'Example'\n---\n\n"
        "Larangan menyeberang ke Taiwan pernah diberlakukan secara ketat[^1].\n\n"
        "## Referensi\n\n"
        "[^1]: [维基百科：台湾荷兰统治时期]"
        "(https://zh.wikipedia.org/zh-tw/%E8%87%BA%E7%81%A3%E8%8D%B7%E8%98%AD"
        "%E7%B5%B1%E6%B2%BB%E6%99%82%E6%9C%9F)"
        " — Entri Wikipedia tentang masa pemerintahan Belanda di Taiwan.\n"
    )

    result = TRANSLATE_MODULE.detect_cjk_leak(text, "id")

    assert result is not None
    assert "書目區簡體殘留" in result


# ═══════════════ [text](target) target 合法性判準（任務一，2026-09-05）═══════════
#
# 補這四條的背景：任務一把第 6 條 LINK_LIKE_RES 規則從「命中即整段抹除」改成
# `_md_link_sub()` 視 target 合法性決定，實例是 knowledge/ru、knowledge/ar 的
# encyclopedia-of-taiwan.md（`[Википедия](维基百科)` 這種連結文字是譯文、
# target 卻是壞掉簡體字的假連結）。上面 6 條既有案例都在測書目區分界，沒有
# 一條直接測 `_md_link_sub` 本身的合法／不合法兩側，也沒測 de 這個
# 2026-09-05 才收進 NON_CJK_SCRIPT_LANGS 的新語言會不會漏接。


def test_md_link_simplified_target_flagged_in_body(tmp_path):
    """[text](target) 的 target 含簡體專用字（非 http/相對路徑前綴）——正文中
    間出現，跟書目無關——必須被判正文 CJK leak，不能被舊版「命中即抹除」的
    規則連本體一起沖進豁免（ru/ar encyclopedia-of-taiwan.md 本尊）。"""
    path = tmp_path / "ru--example.md"
    path.write_text(
        "---\ntitle: 'Example'\n---\n\n"
        "Министерство культуры возглавляло этот проект"
        " - [Википедия](维基百科) — одно из протокольных Web 2.0 энциклопедий"
        " в основном тексте статьи.\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="ru")

    assert any("正文 CJK leak" in h and "维基百科" in h for h in hits)


def test_md_link_legit_targets_all_allowed(tmp_path):
    """`_md_link_sub()` 不能因為修 ru/ar 假連結而連帶誤傷全庫既有的合法連結
    形式——正體裸標題站內互連（zh 原文 knowledge/Society/臺灣大百科全書.md
    第 82/84 行本尊的 `[維基百科](維基百科)` 寫法）、外部 https 連結、站內
    相對路徑、圖片語法、wikilink，五種都要維持全綠。"""
    path = tmp_path / "en--example.md"
    path.write_text(
        "---\ntitle: 'Example'\n---\n\n"
        "See [維基百科](維基百科) for the Chinese-language encyclopedia,"
        " the official site at [MOC](https://www.moc.gov.tw/), the sister"
        " article at [Wikipedia entry](/technology/維基百科), the photo"
        " ![Taipei skyline](taipei.webp), and the internal note"
        " [[wikilink]] for cross-reference.\n",
        encoding="utf-8",
    )

    assert MODULE.scan_file(path, lang="en") == []


def test_de_body_leak_flagged(tmp_path):
    """de 2026-09-05 才收進 NON_CJK_SCRIPT_LANGS——驗證新語言真的走 4+ 連續
    漢字分支，不會因為漏收而落入 ja/ko 的 zh-only marker 分支，讓真洩漏被
    靜默放行（docstring 68-70 行描述的缺口）。"""
    path = tmp_path / "de--example.md"
    path.write_text(
        "---\ntitle: 'Beispiel'\n---\n\n"
        "TSMC baute seine Fabriken über Jahrzehnte auf, und"
        " 台灣半導體產業的發展歷程相當複雜 bleibt hier mitten im Satz"
        " unübersetzt.\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="de")

    assert any("正文 CJK leak" in h for h in hits)


# ═══════════ de 圖片出處標題家族（#1731 follow-up，2026-09-16）═══════════
#
# #1731 把 de 的 Bildnachweise／Bildquellen 收進 BIBLIOGRAPHY_HEADINGS，讓
# 照片授權行裡的正體中文攝影者署名（迷惘的人生）不再被誤報成正文 leak。
# Copilot review 指出兩點：（1）既有 de 譯文還用了連字號複合詞 Bild-Quelle/
# Bild-Quellen 與 Bilderquelle/Fotonachweis——image_health.py 的 de 家族收
# bild|bilder|foto|fotos|video|medien 前綴且用 [- ]? 承接，原 regex 只收無
# 連字號的寫法，這些標題下的署名仍會誤報；（2）該豁免沒有回歸測試，未來
# 改動可能把這條路弄壞而整套仍然全綠。以下參數化案例同時鎖住兩者：heading
# 變體全收（署名豁免），外加一個 body 案例確認豁免沒無限放大。


@pytest.mark.parametrize(
    "heading",
    [
        "## Bildquelle",
        "## Bildquellen",
        "## Bild-Quelle",
        "## Bild-Quellen",
        "## Bildnachweis",
        "## Bildnachweise",
        "## Bilderquelle",
        "## Bilderquellen",
        "## Fotonachweis",
        "## Fotonachweise",
    ],
)
def test_de_credit_heading_exempts_photographer_name(tmp_path, heading):
    """每個 de 圖片出處標題變體：標題下的正體中文攝影者署名（暨 Wikimedia
    URL）必須落在書目區、不被當成正文 leak。"""
    path = tmp_path / "de--credit.md"
    path.write_text(
        f"---\ntitle: 'Beispiel'\n---\n\n"
        f"Jimmy Liao ist vor allem als Bilderbuch-Autor bekannt.\n\n"
        f"{heading}\n\n"
        "- Hero: Porträt von Jimmy Liao, Fotografin 迷惘的人生, CC BY-SA 2.0,"
        " [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:X.jpg)\n",
        encoding="utf-8",
    )

    assert MODULE.scan_file(path, lang="de") == []


def test_de_body_photographer_name_still_leaks_without_credit_heading(tmp_path):
    """沒有圖片出處標題時，正體中文署名出現在正文行中間——豁免不能無限放大，
    仍要判 leak（與 test_de_body_leak_flagged 同方向，但用署名當語料）。"""
    path = tmp_path / "de--credit.md"
    path.write_text(
        "---\ntitle: 'Beispiel'\n---\n\n"
        "Das Porträt wurde von 迷惘的人生 aufgenommen und unter CC BY-SA"
        " 2.0 über Wikimedia Commons veröffentlicht.\n",
        encoding="utf-8",
    )

    hits = MODULE.scan_file(path, lang="de")

    assert any("正文 CJK leak" in h for h in hits)


def test_translate_detect_cjk_leak_flags_simplified_link_target_in_body():
    """translate.py 的 detect_cjk_leak()（babel-nightly 實際呼叫的生產閘門）
    對正文（非書目區）裡的假連結也要擋——它跟 cjk-leak-check.py 共用同一支
    strip_legit_zones()／_md_link_sub()，兩邊判準不能分岔。"""
    text = (
        "---\ntitle: 'Example'\n---\n\n"
        "Министерство культуры возглавляло этот проект"
        " - [Википедия](维基百科) — одно из протокольных Web 2.0 энциклопедий"
        " в основном тексте статьи.\n"
    )

    result = TRANSLATE_MODULE.detect_cjk_leak(text, "ru")

    assert result is not None
    assert "正文 CJK leak" in result
    assert "维基百科" in result


def test_work_title_in_target_language_quotes_is_not_a_leak(tmp_path):
    """《》「」已在豁免內，但譯者會把它們換成目標語言的引號排版（fr/ru/ar 用
    « »、de 用 „ “、en/es/pt 用 “ ”）——2026-09-23 之前這層沒收，於是 Phase B
    的 prompt 叫模型「作品名可以留原文」，照做的譯文反被閘門擋下（run 98122
    近 20 小時 62 個 leak 命中裡 15 個是這一家族）。"""
    for lang, text in [
        ("es", "Las canciones de Lu Da You «鹿港小鎮» marcaron una época."),
        ("de", "Das Album „舌燦蓮花“ erschien 2002 und wurde ein Klassiker."),
        ("en", "The album “舌燦蓮花” came out in 2002 and became a classic."),
    ]:
        path = tmp_path / f"{lang}--quotes.md"
        path.write_text(f"---\ntitle: 'X'\n---\n\n{text}\n", encoding="utf-8")
        assert MODULE.scan_file(path, lang=lang) == [], lang


def test_long_span_inside_target_quotes_still_leaks(tmp_path):
    """引號豁免的 30 字上限跟《》「」同一條——整段漏翻不會剛好躲在一對引號裡，
    豁免不能變成逃生通道。"""
    path = tmp_path / "fr--longquote.md"
    path.write_text(
        "---\ntitle: 'X'\n---\n\nLe texte dit «這整段完全沒有翻譯的長中文句子"
        "超過三十個字所以不應該被豁免掉因為它不是作品名».\n",
        encoding="utf-8",
    )

    assert any("正文 CJK leak" in h for h in MODULE.scan_file(path, lang="fr"))


def test_tw_article_module_path_is_not_a_leak_but_its_description_is(tmp_path):
    """```tw-article``` 第一欄是渲染器用來定位站上文章的 `分類/中文檔名`，跟
    wikilink 同性質，翻掉就指不到任何東西；`|` 後面的說明是給讀者看的，照掃。"""
    path = tmp_path / "id--module.md"
    path.write_text(
        "---\ntitle: 'X'\n---\n\nTeks pembuka.\n\n```tw-article\n"
        "history/台灣島史觀 | Artikel lengkap tentang pandangan sejarah ini.\n"
        "```\n\nLanjutan paragraf.\n",
        encoding="utf-8",
    )
    assert MODULE.scan_file(path, lang="id") == []

    path.write_text(
        "---\ntitle: 'X'\n---\n\n```tw-article\n"
        "history/台灣島史觀 | 這個史觀在站上有完整的一篇文章可以讀\n```\n",
        encoding="utf-8",
    )
    assert any("正文 CJK leak" in h for h in MODULE.scan_file(path, lang="id"))


def test_named_link_rules_keep_their_identity_in_the_list():
    """具名 regex 必須就是清單裡的那一顆（2026-09-23 去序號別名）：此前別處用
    `LINK_LIKE_RES[5]` 取 MD_LINK_RE，清單中間插一條規則會讓所有別名整組錯位
    而不報錯——strip_legit_zones() 的 `_md_link_sub` 會套到 wikilink 規則上。"""
    assert MODULE.MD_LINK_RE in MODULE.LINK_LIKE_RES
    assert MODULE.LINK_LIKE_RES[0] is MODULE.FOOTNOTE_DEF_LINE_RE
    for rx in (MODULE.TW_MODULE_PATH_RE, MODULE.PHOTO_ATTRIBUTION_RE,
               MODULE.HTML_TAG_RE, MODULE.FOOTNOTE_REF_RE,
               MODULE.WIKILINK_RE, MODULE.BARE_URL_RE):
        assert rx in MODULE.LINK_LIKE_RES


def test_proper_noun_containing_zh_marker_is_not_a_leak():
    """2026-09-26：樂團名「草東沒有派對」含 zh-only 虛詞「沒有」，ja 譯文照原名寫是
    正確的，不該被 marker 表判成漏譯（ja〈金曲獎〉重譯被擋 ×5 的病根）。"""
    import importlib.util, sys
    from pathlib import Path
    p = Path(__file__).resolve().parents[1] / "scripts/tools/lang-sync/cjk-leak-check.py"
    spec = importlib.util.spec_from_file_location("clc_pn", p)
    m = importlib.util.module_from_spec(spec); sys.modules["clc_pn"] = m; spec.loader.exec_module(m)
    text = "過去の受賞者である草東沒有派對は、ネット世代の代表だ。"
    spans = m.legit_spans(text)
    start = text.index("草東沒有派對")
    assert any(a <= start and start + len("草東沒有派對") <= b for a, b in spans)
