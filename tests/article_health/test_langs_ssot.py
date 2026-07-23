"""test_langs_ssot — article-health 的語言清單必須跟 registry 同步。

守的是 2026-07-18 vi/id/pt/hi 出生戰役那條神經迴路：「新語言出生時感知系統不會
自動更新」。那次修好了 lang-sync，但 article_health 這層被漏掉；而且 loader 自己
那份 registry reader 算錯路徑（parents[3] 少一層）並被 `except` 吞掉，實際上從來
沒讀到 registry，一路靠寫死的保底清單在跑 —— 保底清單剛好等於當時的九語，所以
看起來會動。這份測試就是不讓「看起來會動」再度成立。
"""

import re
from pathlib import Path

import pytest

from lib.article_health import ALL_LANGS, TRANSLATION_LANGS
from lib.article_health.checks import (
    cross_reference,
    image_health,
    link_target,
    wikilink_target,
)
from lib.article_health import langs as langs_mod
from lib.article_health import loader

REPO_ROOT = Path(__file__).resolve().parents[2]
REGISTRY = REPO_ROOT / "src" / "config" / "languages.mjs"


def _registry_codes() -> list[str]:
    return re.findall(r"code:\s*'([\w-]+)'", REGISTRY.read_text(encoding="utf-8"))


# ─── SSOT 本身 ────────────────────────────────────────────────────────────────


def test_registry_path_actually_resolves():
    """langs.py 指到的 registry 必須真的存在。

    這是本次的病根：路徑算錯 + except 吞掉 → 靜默沿用保底清單。
    """
    assert langs_mod._REGISTRY == REGISTRY
    assert langs_mod._REGISTRY.exists()


def test_translation_langs_matches_registry():
    codes = _registry_codes()
    assert codes, "registry parse 不到任何語言"
    assert set(TRANSLATION_LANGS) == {c for c in codes if c != "zh-TW"}
    assert "zh-TW" not in TRANSLATION_LANGS
    assert ALL_LANGS == TRANSLATION_LANGS | {"zh-TW"}


def test_the_four_newer_languages_are_visible():
    """出生戰役那四個語言必須在清單裡 —— 寫死五語的年代看不到它們。"""
    for lang in ("vi", "id", "pt", "hi"):
        assert lang in TRANSLATION_LANGS


def test_no_check_hardcodes_the_five_language_world():
    """任何 check plugin 都不准再寫死語言清單。

    掃原始碼而不是行為，因為多數 plugin 的 APPLIES_TO 是 ["zh-TW"]，
    寫死的清單今天不會被執行到 —— 靠行為測試抓不到，下一個語言出生時才發作。
    """
    hardcoded = re.compile(r'"en",\s*"ja",\s*"ko",\s*"(?:es|fr)"')
    offenders = []
    for py in sorted((REPO_ROOT / "scripts" / "tools" / "lib" / "article_health")
                     .rglob("*.py")):
        # langs.py 自己持有那份刻意的保底清單，是 SSOT 的一部分，不算違規
        if py.name == "langs.py":
            continue
        # 只看程式碼，註解裡引述舊清單（「原本寫死 …」）不算違規
        code = "\n".join(ln for ln in py.read_text(encoding="utf-8").splitlines()
                         if not ln.lstrip().startswith("#"))
        if hardcoded.search(code):
            offenders.append(py.relative_to(REPO_ROOT).as_posix())
    assert offenders == [], f"還有寫死語言清單的檔案：{offenders}"


# ─── 各 check 的清單來源 ──────────────────────────────────────────────────────


def test_loader_lang_dirs_is_the_ssot():
    assert loader._LANG_DIRS == TRANSLATION_LANGS


def test_link_target_indexes_every_language():
    """`_existing_link_targets()` 必須認得每一個語言的路由前綴。

    寫死五語時，knowledge/{vi,id,pt,hi}/ 會掉進 else 分支被當成 zh-TW 分類目錄，
    那 263 篇一條都沒進索引 → 任何指過去的連結都被判定「目標不存在」。
    """
    assert link_target._TRANSLATION_LANGS == set(TRANSLATION_LANGS)
    assert link_target._LANGS == set(ALL_LANGS)
    for lang in ("vi", "id", "pt", "hi"):
        if not (REPO_ROOT / "knowledge" / lang).is_dir():
            pytest.skip(f"knowledge/{lang}/ 不存在（淺 checkout）")
    link_target._reset_cache()
    import os

    cwd = os.getcwd()
    os.chdir(REPO_ROOT)
    try:
        paths = link_target._existing_link_targets()
    finally:
        os.chdir(cwd)
        link_target._reset_cache()
    for lang in TRANSLATION_LANGS:
        if list((REPO_ROOT / "knowledge" / lang).glob("*/*.md")):
            assert any(p.startswith(f"/{lang}/") for p in paths), \
                f"/{lang}/ 的文章沒有進 link 索引"


def test_link_target_casing_gate_covers_every_language():
    """Phase 1 大小寫 HARD gate 的守備範圍要跟語言清單一致。"""
    for lang in sorted(TRANSLATION_LANGS):
        assert link_target._RE_CASING.search(f"[x](/{lang}/Technology/tsmc)"), \
            f"/{lang}/ 的大寫分類連結擋不到"


def test_lang_dir_skips_are_the_ssot():
    assert wikilink_target._LANG_DIRS_SKIP == set(TRANSLATION_LANGS)
    assert cross_reference._LANG_DIRS_SKIP == set(TRANSLATION_LANGS)


# ─── image_health §3 多語圖片出處小標 ────────────────────────────────────────


@pytest.mark.parametrize(
    "heading",
    [
        "## 圖片來源",              # zh-TW SSOT
        "## 圖片與影片來源",
        "## Image Sources",         # en（語料 ×119）
        "## Image Credits",         # en（語料 ×23）
        "## 画像出典",              # ja（語料 ×138）
        "## 写真出典",
        "## 이미지 출처",           # ko（語料 ×141）
        "## 사진 출처",
        "## Fuentes de imágenes",   # es（語料 ×73）
        "## Fuentes de las imágenes",
        "## Créditos de imágenes",
        "## Sources des images",    # fr（語料 ×130）
        "## Crédits photographiques",
        "## Sources d’images",
    ],
)
def test_image_sources_heading_accepted(heading):
    assert image_health._RE_IMAGE_SOURCES_H2.search(heading + "\n")


@pytest.mark.parametrize(
    "heading",
    [
        "## 參考資料",
        "## References",
        "## Further Reading",
        "## Références",
        "## Pour aller plus loin",
        "## Referencias",
        "## 参考文献",
        "## 참고 자료",
        "## 30-Second Overview",
    ],
)
def test_non_image_heading_rejected(heading):
    assert not image_health._RE_IMAGE_SOURCES_H2.search(heading + "\n")


def test_translations_skip_the_media_count_gate():
    """媒體數量門檻只對 zh-TW SSOT 有意義 —— 譯文不自備圖。"""
    for lang in TRANSLATION_LANGS:
        assert image_health._is_excluded_from_count_gate(
            f"knowledge/{lang}/Technology/tsmc.md"
        ), f"knowledge/{lang}/ 沒有被排除在媒體數量門檻外"
        # Windows contributor 的反斜線路徑也要吃
        assert image_health._is_excluded_from_count_gate(
            f"knowledge\\{lang}\\Technology\\tsmc.md"
        )
    assert not image_health._is_excluded_from_count_gate(
        "knowledge/Technology/台積電.md"
    )
