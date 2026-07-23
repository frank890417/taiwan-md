"""langs.py — article-health 這一層的語言清單 SSOT bridge。

病根同 `scripts/tools/lang-sync/langs.py`（2026-07-18 vi/id/pt/hi 出生戰役）：
語言清單散落各處硬編碼，新語言出生時感知系統不會自動更新。那次 sweep 修好了
`scripts/tools/lang-sync/*`，但沒掃到 `scripts/tools/lib/article_health/*` ——
八個 check plugin 各自寫死 `("en", "ja", "ko", "es", "fr")`，停在出生戰役之前的
五語世界。本模組把 registry 接進來，讓 article-health 跟 lang-sync 吃同一份 SSOT。

`loader.py` 原本自己有一份 `_load_lang_dirs()`，但它算錯了 registry 的相對位置
（`parents[3]` 指到 `scripts/src/config/`，該路徑不存在），於是每次都靜默掉進
`except` 分支沿用寫死的保底清單 —— 看起來會動，只是因為保底清單剛好是當時的
九語。第十個語言出生時它一樣看不到。本模組把路徑修正並補上 fail-loud selftest。

用法：

    from .langs import TRANSLATION_LANGS, is_translation_path

    if entry.name in TRANSLATION_LANGS: ...
    if is_translation_path(str(target.path)): ...
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

#: langs.py 在 scripts/tools/lib/article_health/ 底下 → repo root 要往上四層。
#: parents[0]=article_health  [1]=lib  [2]=tools  [3]=scripts  [4]=<repo root>
REPO = Path(__file__).resolve().parents[4]
_REGISTRY = REPO / "src" / "config" / "languages.mjs"

#: registry 讀不到時的保底清單（2026-07-18 出生戰役當下的既知語言）。
#: 只有在 checkout 不完整之類的情況才會用到，且會 warn 一次，不靜默。
_FALLBACK = ("en", "ja", "ko", "es", "fr", "vi", "id", "pt", "hi")

#: registry 讀得到卻 parse 出比這更少 → 格式改了，當場叫，不靜默沿用舊清單
#: （對齊 lang-sync/langs.py 的 fail-loud selftest，REFLEXES #65 儀器自身要 cross-verify）。
_MIN_EXPECTED = len(_FALLBACK) + 1  # +1 = zh-TW


def _load() -> tuple[str, ...]:
    if not _REGISTRY.exists():
        print(
            f"⚠️  article_health.langs: 找不到 {_REGISTRY} — 改用保底語言清單 "
            f"{_FALLBACK}。新語言不會被感知，請確認 checkout 完整。",
            file=sys.stderr,
        )
        return _FALLBACK
    codes = re.findall(r"code:\s*'([\w-]+)'", _REGISTRY.read_text(encoding="utf-8"))
    if len(codes) < _MIN_EXPECTED:
        raise RuntimeError(
            f"article_health.langs selftest FAIL: 只從 {_REGISTRY} parse 到 "
            f"{len(codes)} 個語言（基線 ≥ {_MIN_EXPECTED}）。languages.mjs 格式可能改了，"
            f"修 langs.py 的 parser 而不是靜默沿用舊清單。"
        )
    if codes[0] != "zh-TW":
        raise RuntimeError(
            "article_health.langs selftest FAIL: registry 第一個 entry 不是 zh-TW default"
        )
    return tuple(c for c in codes if c != "zh-TW")


#: 所有翻譯語言（不含 zh-TW default），順序即 registry 權威順序。
TRANSLATION_LANGS: frozenset[str] = frozenset(_load())

#: 含 zh-TW 的完整語言集合。link 路由前綴之類的地方用這個。
ALL_LANGS: frozenset[str] = TRANSLATION_LANGS | {"zh-TW"}


def is_translation_path(path: str) -> bool:
    """`knowledge/{lang}/...` 判定 —— 吃正反斜線皆可（Windows contributor）。"""
    p = path.replace("\\", "/")
    return any(f"knowledge/{lang}/" in p for lang in TRANSLATION_LANGS)


if __name__ == "__main__":
    print("TRANSLATION_LANGS =", sorted(TRANSLATION_LANGS))
    print("ALL_LANGS         =", sorted(ALL_LANGS))
