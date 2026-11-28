#!/usr/bin/env python3
"""numeral-magnitude-check.py — 抓「量級詞換了、數字沒換」的譯文。

為什麼要這支：2026-09-09《夜市經濟學》的印地文版每一個數字都錯。譯者把中文的
「萬」「億」直接替換成印度的 लाख／अरब，但那不是一對一——萬是 10⁴ 而 लाख 是 10⁵，
億是 10⁸ 而 अरब 是 10⁹。「4000 億產值」寫成 `4 अरब`（差 100 倍）、「23.3 萬攤」
寫成 `23.3 लाख`（差 10 倍）。九道閘全綠，因為它們量的是結構、語言、連結，
**沒有一道在算術**。印尼文版同病兩處，而且同一篇裡對錯並存。

判準（單一、機械、保守）：
  中文原文出現 `N萬` 或 `N億` 時，正確的換算**一定會改變數字串**
  （23.3萬 → 2.33 लाख；4000億 → 400 अरब；93.9億 → 9.39 अरब）。
  所以「**同一個數字串 N 出現在譯文的量級詞旁邊**」就是這個錯的指紋。

  ⚠️ 這支**只抓「沒換算」，抓不到「換算錯」**——2026-09-10 hi〈台灣選舉與政黨政治〉
  二十二個得票數全錯（817萬寫成 8.17 लाख 小十倍、23萬寫成 23 लाख 大十倍、
  3萬寫成 3 लाख 大一百倍），而且錯的方向不一致，**這支從頭到尾是綠的**：
  因為換算錯的時候數字串確實變了，指紋對不上。負責這篇的 agent 還交了一張
  二十二列的驗算表，每一列都算錯——**詳細的自我驗算不等於正確的自我驗算**。
  要抓「換算錯」需要把 zh 與譯文的數字逐個配對再比大小，那是另一支工具的工作
  （對得起來的前提是雙方段落順序一致，跨語言不一定成立）。2026-10-12 起有一支
  只報告的 `magnitude-conversion-check.py` 用數值集合（不配對段落）抓「剛好差十倍、
  一百倍」的這一族，抽樣準確率約 83%，還沒接進任何閘門（OBSERVER-QUEUE #101）。

  反過來不成立的情況已排除：
  · 年份、編號、百分比、頁碼 —— 它們不接量級詞，不會命中
  · 譯文用「原數字＋原單位」寫法（如保留「萬」字）—— 那是 cjk-leak 的守備範圍
  · 譯文把數字完全展開寫（233,000）—— 數字串不同，不命中

用法：
  python3 scripts/tools/lang-sync/numeral-magnitude-check.py <zh 原文> <譯文>
  python3 scripts/tools/lang-sync/numeral-magnitude-check.py --lang hi   # 掃整個語言
exit 1 = 有可疑的量級。這支是**線索產生器不是裁決者**：命中要人看一眼，
因為譯文可能刻意保留原數字做對照（那種寫法罕見但合法）。
"""
import argparse
import json
import math
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
KNOWLEDGE = REPO / "knowledge"

# 各語言的量級詞。值是 10 的次方，用來在報告裡算出正確數字。
MAGNITUDE = {
    "hi": {"हज़ार": 3, "हजार": 3, "लाख": 5, "करोड़": 7, "अरब": 9, "खरब": 11},
    "id": {"ribu": 3, "juta": 6, "miliar": 9, "triliun": 12},
    "ru": {"тысяч": 3, "миллион": 6, "миллиард": 9, "триллион": 12},
    "ar": {"ألف": 3, "آلاف": 3, "مليون": 6, "مليار": 9, "تريليون": 12},
    "es": {"mil": 3, "millón": 6, "millones": 6, "mil millones": 9},
    "pt": {"mil": 3, "milhão": 6, "milhões": 6, "bilhão": 9, "bilhões": 9},
    "fr": {"mille": 3, "million": 6, "milliard": 9},
    "de": {"tausend": 3, "million": 6, "milliarde": 9},
    "en": {"thousand": 3, "million": 6, "billion": 9, "trillion": 12},
    "vi": {"nghìn": 3, "ngàn": 3, "triệu": 6, "tỷ": 9},
}
# 簡體字形也要收：2026-09-10 在 hi 的蘋果西打篇抓到整篇財務數字寫成 `9亿6274万`、
# `4,043.23万`，這支檢查器一路綠燈——它的量級表只有正體，簡體對它是隱形的。
# 譯文出現簡體本身也是缺陷（PRC 字形進台灣專案），但那歸 cjk-leak 管，這裡先讓
# 量級算得到。
ZH_MAG = {"萬": 4, "万": 4, "億": 8, "亿": 8, "兆": 12, "千": 3}
# 「多／餘」夾在數字與單位中間是約數（「1,000多億」「一千多億」「兩千餘萬」），數值照底數算。
# 2026-09-27：id 與 en〈台灣油價機制與中油〉兩隻 agent 都被「一千多億」卡過——讀不到它，
# 正確換算的「100 billion」就找不到孿生數字，被報成另一處「100億」沒換算。
ZH_NUM = re.compile(r"([0-9][0-9,.]*)\s*[多餘]?\s*([萬万億亿兆])")
# 空白分節的長數字裡，前面那幾節（`590 100` 的 `590 `）。
GROUP_HEAD = re.compile(r"(?:^|[^0-9.,])[0-9]{1,3}(?:[ \u00a0\u2009\u202f][0-9]{3})*[ \u00a0\u2009\u202f]$")


def zh_figures(zh_text: str) -> list[tuple[str, float, str]]:
    """回傳 [(原數字串, 實際數值, 中文單位)]。"""
    out = []
    for m in ZH_NUM.finditer(zh_text):
        raw, unit = m.group(1).rstrip(".,"), m.group(2)
        # 辨識度門檻。第一版沒有它，抽驗五筆全是假陽性：中文某處有「1萬」、
        # 英文別處剛好有「1 million」講完全不同的事，就被判成沒換算。本支只驗
        # 「同一數字串出現在量級詞旁」，驗不了兩者指的是不是同一個量，所以數字
        # 本身必須夠獨特才能當指紋——帶小數點／千分位，或至少三位數。
        # 「1」「2」「10」這種在任何長文裡都會巧合命中（REFLEXES #66 用真實產出校準）。
        if not (("." in raw) or ("," in raw) or len(raw.replace(",", "")) >= 3):
            continue
        try:
            val = float(raw.replace(",", "")) * (10 ** ZH_MAG[unit])
        except ValueError:
            continue
        out.append((raw, val, unit))
    return out


# 國字寫的量級數字（「捐五億元」「兩千萬」）也要算進孿生數字（2026-09-26）：〈台灣新冠疫情
# 與疫苗〉的「五億元」譯成 500 million 是對的，但只認阿拉伯數字的版本看不到它，於是另一處
# 「500萬劑」被報成換算錯，en、fr 兩隻 agent 都得手動查證一次。
ZH_CN_NUM = re.compile(r"([零一二兩三四五六七八九十百千]+)[多餘]?([萬万億亿兆])")
# 不帶數字的量級慣用語（「破億」「上萬」「逾億」）也是一個量，底數當 1 算（2026-11-28
# babel-nightly）：〈木曜4超玩〉一條腳註的新聞標題寫「百天破億」，譯文正確寫成
# `100 million in 100 days`，但孿生數字表裡沒有這個 1 億，於是內文另一處「100 萬觀看」
# 被報成沒換算。en／de／fr／id 四語、兩種模型當天敗了十次，每次都是同一句。照舊用次數
# 對帳：中文有幾處這種慣用語，譯文就最多有幾處能被它解釋。
ZH_BARE_MAG = re.compile(r"[破上過逾近]([萬万億亿兆])")
_CN_DIGIT = {"零": 0, "一": 1, "二": 2, "兩": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9}
_CN_UNIT = {"十": 10, "百": 100, "千": 1000}


def _cn_int(s: str) -> int:
    total, cur = 0, 0
    for ch in s:
        if ch in _CN_DIGIT:
            cur = _CN_DIGIT[ch]
        else:
            total += (cur or 1) * _CN_UNIT[ch]
            cur = 0
    return total + cur


def zh_values(zh_text: str) -> list[float]:
    """中文原文裡每一個量級數字的實際數值，不套辨識度門檻——用來認出巧合。"""
    vals = []
    for m in ZH_NUM.finditer(zh_text):
        try:
            vals.append(float(m.group(1).rstrip(".,").replace(",", "")) * (10 ** ZH_MAG[m.group(2)]))
        except ValueError:
            continue
    for m in ZH_CN_NUM.finditer(zh_text):
        vals.append(float(_cn_int(m.group(1))) * (10 ** ZH_MAG[m.group(2)]))
    for m in ZH_BARE_MAG.finditer(zh_text):
        vals.append(float(10 ** ZH_MAG[m.group(1)]))
    return vals


# ── 拆段數字（2026-10-10 babel-nightly）──────────────────────────────────────
# 另一種量級病：中文「121 萬 4,668 人」被譯成「1.21 million 4,668 people」。
# 譯者把萬前面那段換算對了、萬後面的零頭原樣接在量級詞後面。兩段加起來剛好
# 等於原值，所以上面那支「數字串沒變」的判準永遠是綠的；但讀者讀到的是兩個
# 數字（一百二十一萬，然後四千六百多），印地文、越南文、葡文最多。首次量到時
# 十語 30 檔，其中幾處已經不是加得回去的形狀（`34 juta 1.2998 ribu`、
# `10 tỷ 6.198 triệu 1.295 ngàn`）。
# 處置分兩層：(1) 兩段相加後的整數能在中文原文裡找到 → 機械改寫成完整整數
# （`--fix-split`，產線在閘門前自動跑）；(2) 找不到 → 回報給閘門，要人看。
# 「找得到才改」是唯一的保險：本支不懂語意，只確定中文原文確實有這個數。
SPLIT_WORDS = {
    "en": ["million", "billion"], "hi": ["मिलियन", "बिलियन"], "ar": ["مليون", "مليار"],
    "es": ["millones", "millón"], "pt": ["milhões", "milhão"], "fr": ["millions", "million"],
    "de": ["Millionen", "Million", "Milliarden"], "ru": ["миллиона", "миллионов", "миллион"],
    "id": ["juta", "miliar"], "vi": ["triệu", "tỷ"],
}
SPLIT_SCALE = {"million": 6, "billion": 9, "मिलियन": 6, "बिलियन": 9, "مليون": 6, "مليار": 9,
               "millones": 6, "millón": 6, "milhões": 6, "milhão": 6, "millions": 6,
               "Millionen": 6, "Million": 6, "Milliarden": 9, "миллиона": 6, "миллионов": 6,
               "миллион": 6, "juta": 6, "miliar": 9, "triệu": 6, "tỷ": 9}
# 小數點用哪個字。逗號小數的語言裡「.」是千分位（越南文 `6.198 triệu` 是 6198 百萬）。
DECIMAL_COMMA = {"es", "pt", "fr", "de", "ru", "id", "vi"}
FALLBACK_SEP = {"en": ",", "hi": ",", "ar": ",", "es": ".", "pt": ".", "de": ".",
                "id": ".", "vi": ".", "fr": " ", "ru": " "}


def _split_re(lang: str):
    words = "|".join(re.escape(w) for w in sorted(SPLIT_WORDS[lang], key=len, reverse=True))
    # 頭段：整數或帶一個小數分隔的數；量級詞；空白；零頭：1-3 位起頭的千分位數（至少一組）。
    # 零頭後面若緊接數字或另一個量級詞，屬於更長的鏈（`1 tỷ 6.198 triệu`），不在本形狀內。
    return re.compile(
        r"(?<![0-9.,])(\d{1,4}(?:[.,]\d{1,3})?)[  ]?(" + words + r")[  ]+"
        r"(\d{1,3}(?:[.,   ]\d{3})+)(?![0-9])(?![.,]\d)"
    )


def _num(raw: str, lang: str) -> float | None:
    s = raw
    if lang in DECIMAL_COMMA:
        if s.count(".") and not s.count(","):
            s = s.replace(".", "")  # 千分位
        s = s.replace(",", ".")
    else:
        s = s.replace(",", "")
    try:
        return float(s)
    except ValueError:
        return None


def zh_integers(zh_text: str) -> set[int]:
    """中文原文裡寫得出來的完整整數：`121 萬 4,668`、`1,214,668`、`130.3萬`。"""
    vals = set()
    for m in re.finditer(r"(\d[\d,]*(?:\.\d+)?)\s*[億亿]\s*(?:(\d[\d,]*)\s*[萬万])?\s*(\d[\d,]*)?", zh_text):
        try:
            v = float(m.group(1).replace(",", "")) * 1e8
            if m.group(2):
                v += float(m.group(2).replace(",", "")) * 1e4
            if m.group(3):
                vals.add(round(v + float(m.group(3).replace(",", ""))))
            vals.add(round(v))
        except ValueError:
            pass
    for m in re.finditer(r"(\d[\d,]*(?:\.\d+)?)\s*[萬万]\s*(\d[\d,]*)?", zh_text):
        try:
            v = float(m.group(1).replace(",", "")) * 1e4
            vals.add(round(v))
            if m.group(2):
                vals.add(round(v + float(m.group(2).replace(",", ""))))
        except ValueError:
            pass
    for m in re.finditer(r"(?<![\d.])\d{1,3}(?:,\d{3})+(?![\d])|(?<![\d.,])\d{5,}(?![\d])", zh_text):
        vals.add(int(m.group(0).replace(",", "")))
    # 國字寫的（「一百六十萬劑」），跟 zh_values 同一套換算
    for m in ZH_CN_NUM.finditer(zh_text):
        vals.add(_cn_int(m.group(1)) * 10 ** ZH_MAG[m.group(2)])
    return vals


def _group_sep(out_text: str, lang: str) -> str:
    """跟著這份譯文自己已經在用的千分位寫法走，不強加一套（西文檔裡兩種都見過）。"""
    seps = re.findall(r"(?<![\d.,])\d{1,3}([,.   ])\d{3}\1\d{3}(?![\d])", out_text)
    # 逗號小數的語言裡「1.500」只能是千分位，也算一票——id〈新竹縣〉全文都用點，
    # 只有 description 一處 `1,442,000`，只數兩節以上的數字會被那一處帶走。
    if lang in DECIMAL_COMMA:
        seps += ["."] * len(re.findall(r"(?<![\d.,])\d{1,3}\.\d{3}(?![\d.,])", out_text))
    if seps:
        return max(set(seps), key=seps.count)
    return FALLBACK_SEP.get(lang, ",")


_CHAIN_HEAD = re.compile(r"(?<![0-9.,])(\d{1,4})[ \u00a0]?("
                         + "|".join(sorted(map(re.escape, SPLIT_SCALE), key=len, reverse=True))
                         + r")[ \u00a0]+$")
CHAIN_LEFT = re.compile(r"\d[\d.,]*\s?(?:" + "|".join(sorted(map(re.escape, SPLIT_SCALE), key=len, reverse=True))
                        + r"|अरब|करोड़|लाख|tỷ|miliar|milliard|миллиард|bilhão|bilhões|mil millones)\s*$", re.I)


def split_scan(zh_text: str, out_text: str, lang: str):
    """回傳 (改寫後全文, 已改清單, 對不上原文的清單)。"""
    if lang not in SPLIT_WORDS:
        return out_text, [], []
    zh_ints = zh_integers(zh_text)
    sep = _group_sep(out_text, lang)
    fixed, unresolved, pieces, last = [], [], [], 0
    for m in _split_re(lang).finditer(out_text):
        head, word, rem = m.group(1), m.group(2), m.group(3)
        # 左邊還接著「數字＋量級詞」就是更長的鏈（`1 बिलियन 61 मिलियन 981,295` 是
        # 10億6198萬1295）。只改右半段會變成 `1 बिलियन 61,981,295`，看起來修好了其實
        # 仍錯——上線第一版就這樣改壞一處。鏈一律交給人。
        if CHAIN_LEFT.search(out_text[max(0, m.start() - 40):m.start()]):
            # 三段鏈裡最單純的一種算得出來：左邊恰好是「整數＋更大的量級詞」
            # （`4 tỷ 708 triệu 24.465` = 4,708,024,465）。算出來在中文裡就整條改寫成
            # 一個數；不在就把算出的值印出來。2026-11-29 之前鏈一律報「交給人」，
            # 寫對的鏈也過不了閘，vi〈台灣新冠疫情與疫苗〉因此同一處連敗八次、每次
            # 25 分鐘，而訊息看不出那次其實是 802 萬被寫成 780 triệu。
            # 其餘形狀（左邊帶小數、印度數詞、四段以上）照舊交給人。
            win_start = max(0, m.start() - 40)
            lm = _CHAIN_HEAD.search(out_text[win_start:m.start()])
            a = _num(head, lang)
            rem_digits = re.sub(r"[^\d]", "", rem)
            if lm and a is not None and a == int(a):
                gap = SPLIT_SCALE[lm.group(2)] - SPLIT_SCALE[word]
                if (gap > 0 and int(a) < 10 ** gap
                        and len(rem_digits) <= SPLIT_SCALE[word] and int(rem_digits) > 0):
                    v = (int(lm.group(1)) * 10 ** SPLIT_SCALE[lm.group(2)]
                         + int(a) * 10 ** SPLIT_SCALE[word] + int(rem_digits))
                    chain_start = win_start + lm.start()
                    whole = out_text[chain_start:m.end()]
                    if v in zh_ints and chain_start >= last:
                        pieces.append(out_text[last:chain_start])
                        pieces.append(f"{v:,}".replace(",", sep))
                        last = m.end()
                        fixed.append(f"「{whole}」→「{v:,}」")
                    else:
                        unresolved.append(f"「{whole}」= {v:,}，中文原文找不到這個數")
                    continue
            unresolved.append(f"「{m.group(0)}」左邊還接著量級詞，是更長的鏈")
            continue
        a = _num(head, lang)
        b = int(re.sub(r"[^\d]", "", rem))
        if a is None:
            continue
        base = round(a * 10 ** SPLIT_SCALE[word])
        # 零頭要小於頭段最後一個非零位，否則兩段會重疊（不是同一個數拆開）
        if b == 0 or base % (10 ** len(re.sub(r"[^\d]", "", rem))) != 0:
            unresolved.append(f"「{m.group(0)}」兩段重疊，加不回一個數")
            continue
        v = base + b
        if v in zh_ints:
            pieces.append(out_text[last:m.start()])
            pieces.append(f"{v:,}".replace(",", sep))
            last = m.end()
            fixed.append(f"「{m.group(0)}」→「{v:,}」")
        else:
            unresolved.append(f"「{m.group(0)}」= {v:,}，中文原文找不到這個數")
    pieces.append(out_text[last:])
    return "".join(pieces), fixed, unresolved


def check(zh_path: Path, out_path: Path, lang: str) -> list[str]:
    mags = MAGNITUDE.get(lang)
    if not mags:
        return []
    zh_text = zh_path.read_text(encoding="utf-8", errors="ignore")
    out_text = out_path.read_text(encoding="utf-8", errors="ignore")
    explained = zh_values(zh_text)
    hits, seen = [], set()
    # 拆段數字：可機械改寫的那種不算錯（產線會先跑 --fix-split），只報對不上原文的。
    _, fixable, odd = split_scan(zh_text, out_text, lang)
    hits += [f"數字被拆成兩段：{x}" for x in odd]
    hits += [f"數字被拆成兩段（可 --fix-split）：{x}" for x in fixable]
    for raw, val, unit in zh_figures(zh_text):
        if raw in seen:
            continue
        for word, power in mags.items():
            written = float(raw.replace(",", "")) * (10 ** power)
            if abs(written - val) / max(val, 1) < 0.001:
                continue  # 剛好等值（例如中文「千」對上 thousand），不是錯
            # 倍率合理性。單位沒換算的錯，倍率必然是 10 的小次方（萬↔lakh 差 10、
            # 萬↔million 差 100、億↔billion 差 10）。倍率離譜的是巧合——中文某處的
            # 「100萬」跟譯文別處的「100 billion」講的是不同的事，差 10 萬倍。
            # 本支驗不了兩個數字指的是不是同一個量，只能用倍率把巧合濾掉。
            exp = math.log10(written / val)
            if abs(exp) > 3.01 or abs(exp - round(exp)) > 0.01:
                continue
            # 同一個數字串直接黏在目標語言的量級詞旁邊。
            # **左邊界不可省**：沒有它的話 `3.3 लाख` 裡的子字串 `3 लाख` 會命中，
            # 報出一個根本不存在的錯。這正是 2026-09-09 把檔案改壞的那個 bug——
            # 我第一版把它原封不動寫進了檢查器（同一天第七次子字串陷阱）。
            # 用空白分三位的長數字，前一節也算左邊界（2026-09-26）：NHK 的 5,901 億
            # 日圓在西文裡正確寫成 `590 100 millones`，子字串 `100 millones` 對上了
            # 中文別處的「100萬」。法、西、葡、俄文都這樣分節。只認真正的分節——數字
            # 串剛好三位、前面是一到三位的一節；第一版只看「數字＋空白」，把越南文
            # `năm 2025 2,828 tỷ`（年份後接數字，真的少換算十倍）也放掉了。
            pat = r"(?<![0-9.,])" + re.escape(raw) + r"\s*(" + re.escape(word) + ")"
            grouped = re.fullmatch(r"[0-9]{3}", raw) is not None
            # 量級詞是另一個量級詞的前綴時，要看整個字（2026-09-26）：西、葡文的
            # 「mil」是「millones／milhões」的開頭，`500 millones` 會被讀成 `500 mil`。
            # 同一波委派裡兩隻 agent 為了繞過它，把正確的譯文改成別的寫法。
            longer = [w for w in mags if len(w) > len(word) and w.lower().startswith(word.lower())]
            found = 0
            for m2 in re.finditer(pat, out_text, re.I):
                if grouped and GROUP_HEAD.search(out_text[max(0, m2.start() - 40):m2.start()]):
                    continue
                here = out_text[m2.start(1):m2.start(1) + 30].lower()
                if any(here.startswith(w.lower()) for w in longer):
                    continue
                # 複合量級詞不算。越南文的「nghìn tỷ」是千個 tỷ ＝ 10¹²、西班牙文的
                # 「mil millones」是十億——量級詞後面接著另一個量級詞時，真正的量級是
                # 兩者相乘，本支的單一詞比對判不了。抽驗時 `1.70 nghìn tỷ`（1.7 兆，正確）
                # 被報成錯，就是這個家族。
                tail = out_text[m2.end():m2.end() + 24].lower()
                if any(re.match(r"\s*" + re.escape(w2.lower()), tail) for w2 in mags):
                    continue
                found += 1
            # 譯文的這個量剛好等於中文另一個量級數字時，數字串相同是巧合（2026-09-26）：
            # 中文同時有「500萬」和「5億」，譯文把後者正確寫成 `500 millones`。用次數
            # 對帳而不是見到就放行——中文有幾處等值的量，譯文就最多有幾處能被它解釋；
            # 多出來的才是漏換算（兩處都寫成 `500 millones` 時仍會報）。
            twins = sum(1 for v in explained if abs(written - v) / max(v, 1) < 0.001)
            if found <= twins:
                continue
            correct = val / (10 ** power)
            ratio = written / val
            hits.append(
                f"「{raw}{unit}」= {val:,.0f}，但譯文寫成「{raw} {word}」= {written:,.0f}"
                f"（差 {max(ratio, 1 / ratio):.0f} 倍）→ 應為「{correct:g} {word}」"
            )
            seen.add(raw)
            break
    return hits


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("zh", nargs="?")
    ap.add_argument("out", nargs="?")
    ap.add_argument("--lang")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--fix-split", action="store_true",
                    help="把「1.21 million 4,668」這種拆段數字改寫成完整整數（僅限中文原文找得到該數）")
    a = ap.parse_args()

    pairs = []
    if a.zh and a.out:
        p = Path(a.out).resolve()
        # 語言代碼從路徑裡找，不假設呼叫端給的是相對於 knowledge/ 的絕對路徑
        # （倉庫外的校準樣本也要能驗）
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        from langs import ALL_TRANSLATION_LANGS  # noqa: E402
        seen = next((seg for seg in p.parts if seg in set(ALL_TRANSLATION_LANGS)), None)
        if seen and seen not in MAGNITUDE:
            # ja/ko 原生使用万／億，量級與中文同構，不需換算也就沒有這種錯。
            # 第一版對它們直接 exit 2 報錯——「這個語言不適用」被當成「工具壞了」，
            # 而批次驗證器把非零 exit 一律當失敗，於是每篇 ja/ko 都紅一次。
            print(f"✅ {seen} 原生使用万／億，量級與中文同構，不適用本檢查")
            return 0
        lang = seen
        if not lang:
            print(f"❌ 路徑裡看不出語言：{a.out}", file=sys.stderr)
            return 2
        pairs.append((Path(a.zh), p, lang))
    elif a.lang:
        tj = KNOWLEDGE / "_translations.json"
        idx = json.loads(tj.read_text(encoding="utf-8")) if tj.exists() else {}
        for f in sorted((KNOWLEDGE / a.lang).rglob("*.md")):
            rel = str(f.relative_to(KNOWLEDGE))
            zh = idx.get(rel)
            if zh and (KNOWLEDGE / zh).exists():
                pairs.append((KNOWLEDGE / zh, f, a.lang))
    else:
        ap.error("要給 <zh> <譯文>，或 --lang")

    if a.fix_split:
        n_fixed = 0
        for zh, out, lang in pairs:
            text = out.read_text(encoding="utf-8")
            new, fixed, _ = split_scan(zh.read_text(encoding="utf-8", errors="ignore"), text, lang)
            if fixed and new != text:
                out.write_text(new, encoding="utf-8")
                n_fixed += len(fixed)
                for x in fixed:
                    print(f"🔧 {out.name}: {x}", file=sys.stderr)
        if n_fixed:
            print(f"🔧 拆段數字改寫 {n_fixed} 處", file=sys.stderr)

    report, total = {}, 0
    for zh, out, lang in pairs:
        h = check(zh, out, lang)
        if h:
            try:
                key = str(out.relative_to(REPO))
            except ValueError:
                key = str(out)  # 倉庫外的校準樣本
            report[key] = h
            total += len(h)

    if a.json:
        print(json.dumps({"files": len(pairs), "hits": total, "detail": report},
                         ensure_ascii=False, indent=2))
        return 1 if total else 0
    for fn, hs in report.items():
        print(f"❌ {fn}")
        for x in hs:
            print(f"      {x}")
    if total:
        print(f"\n════ {len(pairs)} 檔，{total} 處量級可疑 ════")
        print("中文的萬(10⁴)／億(10⁸) 跟各語言的 thousand/million/billion 不是一對一。")
        print("換算正確的話數字串一定會變——數字串沒變就是沒換算。逐處人看，這支只給線索。")
        return 1
    print(f"✅ {len(pairs)} 檔，量級無可疑")
    return 0


if __name__ == "__main__":
    sys.exit(main())
