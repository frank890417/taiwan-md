"""整篇引擎 URL 裝甲的邊界要跟閘門的 URL 尺一致。

2026-09-25：`knowledge/Culture/台灣棒球文化.md` 腳註 4 是裸網址
`https://kamatiam.org/棒球如何成為國球從紅葉的故事說起/`。舊裝甲 regex 把漢字排除在
外，只藏到 `https://kamatiam.org/`，模型看見中文路徑就翻；verify-translation 的
URL_PATTERN 卻把漢字算進網址，於是十二語、四種模型的譯文全部被判網址改寫。
"""
import importlib.util
import re
import sys
from pathlib import Path

LANG_SYNC = Path(__file__).resolve().parents[1] / "scripts" / "tools" / "lang-sync"
sys.path.insert(0, str(LANG_SYNC))
SPEC = importlib.util.spec_from_file_location("translate_mod", LANG_SYNC / "translate.py")
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)
verify = MODULE._verify_mod


def _roundtrip(body: str) -> tuple[str, list[str]]:
    tokenized, urls = MODULE.tokenize_urls(body)
    restored = tokenized
    for i, url in enumerate(urls, 1):
        restored = restored.replace(f"⟦U{i}⟧", url)
    assert restored == body
    return tokenized, urls


def test_bare_url_with_han_path_is_armored_whole():
    body = "[^4]: 〈棒球如何成為國球？〉，歷史學柑仔店，https://kamatiam.org/棒球如何成為國球從紅葉的故事說起/\n"
    tokenized, urls = _roundtrip(body)
    assert urls == ["https://kamatiam.org/棒球如何成為國球從紅葉的故事說起/"]
    assert "kamatiam" not in tokenized
    assert "紅葉的故事" not in tokenized


def test_bare_url_still_stops_at_fullwidth_punctuation():
    body = "見 https://zh.wikipedia.org/wiki/陳映真（出生地竹南）。\n"
    tokenized, urls = _roundtrip(body)
    assert urls == ["https://zh.wikipedia.org/wiki/陳映真"]
    assert "（出生地竹南）" in tokenized


def test_armor_spans_equal_gate_urls():
    body = (
        "[^1]: [維基](https://zh.wikipedia.org/wiki/江蕙) — 條目\n"
        "[^2]: 大紀元，https://epochtimes.com.tw/n445585/調查-8成勞工曾颱風天到班-五大行業好辛勞\n"
        "[^3]: Apple Podcasts，https://podcasts.apple.com/tw/podcast/救-知道dmat/id1725130786\n"
    )
    _, urls = _roundtrip(body)
    gate = verify.extract_urls(body)
    assert sorted(u.rstrip(".,;:!?*\\") for u in urls) == sorted(gate)
    assert all(re.search(r"[一-鿿]", u) for u in urls)


def test_bare_url_with_balanced_parens_is_armored_whole():
    """2026-11-24：〈水道頭〉圖說的裸網址 `…_(Taiwan).jpg`。舊尺在 `)` 截斷，裝甲只藏到
    `(Taiwan`，`).jpg` 露在散文裡被模型丟掉；七語兩種模型 15 份被拒譯文全是 `(Taiwan.jpg`。"""
    url = "https://commons.wikimedia.org/wiki/File:Beigang_Water_Tower_(Taiwan).jpg"
    body = f"_北港自來水廠八角水塔。原始檔案頁：{url}。圖片由 Taiwan.md 快取。_\n"
    tokenized, urls = _roundtrip(body)
    assert urls == [url]
    assert ").jpg" not in tokenized
    assert verify.extract_urls(body) == [url]


def test_paren_outside_url_still_closes_it():
    body = "(見 https://example.org/a) 與 https://example.org/b(c 結尾\n"
    _, urls = _roundtrip(body)
    assert urls == ["https://example.org/a", "https://example.org/b(c"]
