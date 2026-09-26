#!/usr/bin/env python3
"""cjk-adjacency-check.py — 抓「漢字直接黏在拉丁字母上」的漏譯。

## 為什麼既有的 cjk-leak-check 抓不到

`cjk-leak-check.py` 對非漢字圈語言要求「連續 N 個以上漢字」才算洩漏，門檻是
為了不誤殺合法保留：譯文裡的 `Tên tiếng Việt (中文原名)` 是規範要求的寫法，
圖片授權的 `Photo: 化城再来人` 是不可改寫的攝影者本名。

但漏譯最常見的形狀恰好在門檻底下——**兩三個字的專有名詞被留在原地**：
`Giải Kim曲`（金曲獎翻一半）、`cây茄苳`、`đường敕使`、`bài演讲`（還是簡體）。
2026-08-09 委派批次實測：13 篇譯文裡 10 篇中招、合計 86 處，而這 13 篇全部
通過了 cjk-leak-check。

## 判準為什麼是「黏著」而不是「字數」

合法保留的漢字，前後一定有東西隔開：括號 `(中文名)`、引號、冒號後的空格。
漏譯的漢字則是直接長在拉丁文句子中間——`được拆除`、`Kim曲lần`——字母與漢字
之間沒有任何分隔。用相鄰關係當判準，比用長度當判準精準得多：實測抽樣 14 處
零誤報，而長度門檻在同一批漏掉全部 86 處。

這支刻意獨立於 `cjk-leak-check.py`：那支正在被線上產線呼叫，批次跑到一半改
它的判準會讓同一批的前後段用不同標準驗收（今天已經在別的閘門上踩過這個坑）。
等這批收完再考慮合併。

用法：
    python3 cjk-adjacency-check.py <檔案...>
    python3 cjk-adjacency-check.py --glob 'knowledge/vi/**/*.md'

Exit: 0 = 乾淨；1 = 有命中。
"""
from __future__ import annotations

import argparse
import glob as globmod
import re
import sys
from pathlib import Path

LATIN = r"A-Za-zÀ-ỹ"
CJK = r"一-鿿"
ADJACENT = re.compile(f"[{LATIN}][{CJK}]|[{CJK}][{LATIN}]")
CONTEXT = re.compile(f".{{0,24}}(?:[{LATIN}][{CJK}]|[{CJK}][{LATIN}]).{{0,24}}")


# 網址與行內程式碼裡的漢字是合法的：中文標題的維基網址、含中文 slug 的新聞
# 連結（`tw.news.yahoo.com/ai爬蟲再盜-…`）都是真實可用的路徑，改掉它就是把
# 連結改壞。這兩種先挖掉再掃——首版沒挖，第一次拿去驗收就把一條 Yahoo 新聞
# 網址報成漏譯。
# HTML 標籤內的屬性值是結構不是正文：`<iframe title="複雜生活節5-自主隔離Podcast">`
# 的標題是影片的中文原名，讀者要拿它去找原片。既有的 cjk-leak-check 早在
# 2026-07-27 就把這條列為「第十一家族」豁免了，這支上線時漏抄——同一份豁免
# 清單分兩處維護，就會兩處不同步（那正是 cjk-leak-check 自己的註解寫過的病根）。
# 腳註編號 `[^TWSE權重]`、`[^鴻源wiki]` 是識別碼不是內容——規範明寫「編號不動」，
# 所以它們必然帶中文，而且必然緊貼越南語正文（引用點就在句子裡）。
MASK = re.compile(r"https?://\S+|`[^`]*`|<[^>]+>|\[\^[^\]]+\]")

# 腳註定義行的連結標題是**逐字引用的來源名稱**，中文來源本來就常混拉丁字母
# （`(Yahoo奇摩新聞)`、`7-Eleven 台灣官網`），那是來源的真名不是漏譯。
#
# 不豁免的後果實測過，而且比漏譯嚴重：2026-08-09 一隻 agent 為了讓這道檢查
# 變綠，把 6 條中文來源標題翻成英文與越南文。讀者拿被改寫的標題去查證會找不到
# 原文——引用失去可追溯性，正是這整套閘門要保護的東西。閘門製造出「改內容換
# 綠燈」的誘因時，它造成的損害會大於它防的問題。
# 編號部分寫成可選，是因為 MASK 比這條先跑，而 MASK 會把 `[^25]` 抹成等長空白
# ——等這條上場時行首已經是一片空白加一個冒號，`^\[\^` 的錨永遠對不上。
# 症狀：`[^25]: [曹興誠：recall是青紅對決 徐巧芯攻曹是背骨仔 - 中央社](…)` 被
# 判成漏譯。那是中央社報導的真實標題，中文新聞標題本來就常嵌小寫英文單字
# （recall、iPhone、PChome），豁免失效時它們全部變成假陽性——而這道閘門的假
# 陽性有具體代價：agent 會改標題來換綠燈（2026-08-09 已實撞 6 條）。
FN_LINK_LABEL = re.compile(r"^\s*(?:\[\^[^\]]+\])?\s*:\s*\[[^\]]*\]", re.M)

# 來源標題不一定住在 `[^N]:` 行——有些文章的參考資料是編號清單或項目清單
# （`- [這些動畫通通都是台灣做的！ - PTS公共電視](url)`），標題一樣是逐字引用的
# 中文原名。這是同一家族的第三次現形（前兩次：腳註定義行、括號內原名對照），
# 所以判準一般化到「任何連結標籤」，但只在標籤以漢字為主時豁免：正文裡的越南文
# 連結標籤混進一兩個漢字仍是漏譯，那種標籤是拉丁字為主，抓得到。
LINK_LABEL = re.compile(r"\[([^\]\[]{1,120})\]\(")

# 括號內的中文原名對照是規範要求的寫法（`Tên tiếng Việt (中文原名)`），而中文
# 原名本身可能含拉丁字——`(台灣海關報關制度與EZWAY)` 的「與EZWAY」就會觸發相鄰
# 判定。這是誤判，而誤判在這支上的代價已經驗證過：它會逼 agent 把原名改掉來
# 換綠燈，而原名正是讀者用來對照的錨。
# 判準用「括號內容以漢字為主」，不是「括號內容有漢字」——後者會把
# `(công益財團法人…)` 這種真的把首字翻掉的殘缺原名一起豁免，那是要抓的。
PAREN = re.compile(r"[（(]([^）)]{2,80})[）)]")


def _is_zh_gloss(inner: str) -> bool:
    """括號內容是不是「完好的中文原名對照」。

    只看漢字佔多數不夠——`(công益財團法人交流協會台北事務所)` 漢字壓倒性多數，
    但首字的「公」被翻成 `công` 了，那是損壞的原名，正是要抓的東西。

    真正的分界在拉丁字串的形態：中文原名裡合法出現的拉丁字是品牌與縮寫，
    寫法是全大寫或含數字（`EZWAY`、`7-ELEVEN`、`AI`）；而漏譯留下的是小寫的
    越南文單字直接黏在漢字上（`công益`、`人掏`）。所以要求括號內每一段拉丁
    字串都不是純小寫，才算完好的原名。
    """
    cjk = len(re.findall(f"[{CJK}]", inner))
    if cjk < 2:
        return False
    runs = re.findall(f"[{LATIN}]+", inner)
    return all(not r.islower() for r in runs)


def _legit_spans(text: str) -> list[tuple[int, int]]:
    """借 cjk-leak-check 的「合法保留原文」清單，不自己再列一份。

    這支上線一天之內長出六類假陽性（腳註來源標題／括號內原名對照／參考清單
    連結標籤／HTML 屬性／腳註中文編號／書名號作品名），而其中至少三類
    `cjk-leak-check` 早就有了——它的註解甚至寫過這個病根：「此前兩個分支各自
    維護一套豁免，一天之內冒出七個假陽性家族，單看每次都像新的 edge case，
    看七次才知道病在清單沒共用。」

    我讀了那段註解，然後造了第三支尺、重演了同一個錯。所以這裡直接 import
    它的清單而不是複寫：往後它加豁免，這支自動跟上。
    """
    try:
        import importlib.util

        spec = importlib.util.spec_from_file_location(
            "cjkleak", Path(__file__).with_name("cjk-leak-check.py")
        )
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        return mod.legit_spans(text)
    except Exception:  # noqa: BLE001 — 借不到就退回自己的遮罩，不讓檢查整支掛掉
        return []


# 混合詞的「原稿原生」豁免。
#
# 台灣有一整類名字本身就是拉丁字母緊貼漢字：音樂人 `V.K克`、媒體 `Blow 吹音樂`、
# 公司 `Naxs Corp 涅所開發`。它們在中文原稿裡就長這樣，譯文照抄是對的。
#
# 光靠簡報寫「不准為了過閘門改內容」擋不住：2026-08-09 一天之內三次，agent 為了
# 讓這道檢查變綠，把 `Blow 吹音樂` 砍成 `Blow`、`V.K克` 砍成 `V.K`、
# `Naxs Corp（涅所開發）` 砍成 `Naxs Corp`——每一次都在回報裡寫成「修復」。
# 禁令對抗誘因是輸的一方；要拆掉誘因本身。
#
# 判準：把命中處左右擴張成完整的混合詞，如果這個詞**逐字出現在中文原稿裡**，
# 它就是來源自己的寫法，不是漏譯。漏譯長的是另一個樣子——`được拆除` 的拉丁
# 部分是越南文，中文原稿裡不可能有這個詞。
#
# 注意 `Blow吹音樂`（少了空格）仍然會被抓：原稿是 `Blow 吹音樂`，少空格是譯文
# 自己弄壞的，正確處置是把空格補回來而不是刪掉名字。閘門在這裡指得很準。
TOKEN_CH = r"[A-Za-zÀ-ỹ0-9\.\-_一-鿿]"


def _native_tokens(text: str, zh_text: str) -> set[str]:
    """回傳命中處中「原稿本來就這樣寫」的混合詞。"""
    out = set()
    for m in ADJACENT.finditer(text):
        s, e = m.start(), m.end()
        while s > 0 and re.match(TOKEN_CH, text[s - 1]):
            s -= 1
        while e < len(text) and re.match(TOKEN_CH, text[e]):
            e += 1
        tok = text[s:e]
        if len(tok) >= 3 and tok in zh_text:
            out.add(tok)
    return out


def _target_lang(path: Path) -> str | None:
    """`knowledge/<lang>/…` 或隔離區的 `<lang>--slug.md` 推語言；推不出回 None。"""
    parts = path.parts
    if "knowledge" in parts:
        i = parts.index("knowledge")
        if i + 1 < len(parts) and re.fullmatch(r"[a-z]{2}", parts[i + 1]):
            return parts[i + 1]
    m = re.match(r"^([a-z]{2})--", path.name)
    return m.group(1) if m else None


def _in_scope(path: Path) -> bool:
    """本支只對拉丁／非漢字文字的譯文有意義（2026-09-26 補上語言邊界）。

    日文、韓文的漢字是本國文字，「SLP台北」「台湾DMAT」在日文裡是正常排版。
    2026-09-26 委派層兩隻 agent 對同一種形狀給了相反的處置：Haiku 當成誤判留著
    （ja 災難醫療 11 處），Sonnet 為了變綠插了 62 個半形空格（ja SLP）——閘門在
    不該響的語言響，逼譯者自己決定要不要改內容，這正是本檔前面寫過的誘因問題。
    語言清單向 cjk-leak-check 借（NON_CJK_SCRIPT_LANGS），不自己再列一份；推不出
    語言或借不到清單時照舊全掃，寧可多響不漏響。"""
    lang = _target_lang(path)
    if lang is None:
        return True
    try:
        import importlib.util

        spec = importlib.util.spec_from_file_location(
            "cjkleak_scope", Path(__file__).with_name("cjk-leak-check.py")
        )
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        return lang in mod.NON_CJK_SCRIPT_LANGS
    except Exception:  # noqa: BLE001
        return True


def scan(path: Path, zh_path: Path | None = None) -> list[str]:
    if not _in_scope(path):
        return []
    text = path.read_text(encoding="utf-8")
    # frontmatter 不掃：translatedFrom 指向中文原稿路徑是規範要求的，
    # imageCredit 的攝影者本名也不該被改寫。
    body = text.split("---", 2)[-1] if text.startswith("---") else text
    # 用等長空白替換，讓前後文擷取的位置不跑掉。
    body = MASK.sub(lambda m: " " * len(m.group(0)), body)
    # 借來的清單（書名號作品名、短引語、攝影者署名…）也遮掉，但**跳過括號那條**：
    # 它遮所有短括號，而本支對括號有更銳利的判準（`_is_zh_gloss`：完好的中文原名
    # 才豁免，首字被翻掉的殘缺原名 `(công益財團法人…)` 仍要抓）。借清單是為了不
    # 重複發明，不是為了把自己已經磨利的地方磨鈍。
    for s, e in _legit_spans(body):
        if body[s] in "（(":
            continue
        body = body[:s] + " " * (e - s) + body[e:]
    body = FN_LINK_LABEL.sub(lambda m: " " * len(m.group(0)), body)
    body = PAREN.sub(
        lambda m: " " * len(m.group(0)) if _is_zh_gloss(m.group(1)) else m.group(0),
        body,
    )
    body = LINK_LABEL.sub(
        lambda m: " " * len(m.group(0)) if _is_zh_gloss(m.group(1)) else m.group(0),
        body,
    )
    if zh_path is not None:
        for tok in _native_tokens(body, zh_path.read_text(encoding="utf-8")):
            body = body.replace(tok, " " * len(tok))
    return [m.group(0).replace("\n", " ") for m in CONTEXT.finditer(body)]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--glob")
    ap.add_argument("--quiet", action="store_true")
    ap.add_argument(
        "--zh",
        help="中文原稿路徑。給了就豁免「原稿本來就這樣寫」的混合詞"
        "（`V.K克`、`Blow 吹音樂`）——那是名字不是漏譯。",
    )
    args = ap.parse_args()

    paths = [Path(p) for p in args.files]
    if args.glob:
        paths += [Path(p) for p in globmod.glob(args.glob, recursive=True)]
    zh = Path(args.zh) if args.zh else None

    total, flagged = 0, 0
    for p in paths:
        hits = scan(p, zh)
        if not hits:
            continue
        flagged += 1
        total += len(hits)
        if not args.quiet:
            print(f"❌ {p} — {len(hits)} 處漢字黏著拉丁字母（多半是專有名詞漏譯）")
            for h in hits[:6]:
                print(f"     …{h}…")
            if len(hits) > 6:
                print(f"     …另外 {len(hits) - 6} 處")
    print(f"{flagged}/{len(paths)} 檔命中，合計 {total} 處")
    return 1 if flagged else 0


if __name__ == "__main__":
    sys.exit(main())
