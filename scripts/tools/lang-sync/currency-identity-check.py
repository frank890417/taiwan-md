#!/usr/bin/env python3
"""currency-identity-check.py — 台灣的錢被寫成別人的錢。

兩族：
  (甲) 寫成中國的錢——裸的 yuan／юань／يوان。
  (乙) 寫成譯文語言自己國家的錢——rupiah／рубль／đồng。2026-09-10 新增，
       出生在紙風車 id 篇：「35 萬至 45 萬元」寫成 `350–450 ribu rupiah`。
       這族比 (甲) 更隱形，讀者不會覺得句子怪，只會以為台灣用印尼盾。

2026-09-10 出生：id 的環境正義篇把「新台幣 2 兆元」寫成 `2 triliun yuan`、
「每噸數十元」寫成 `puluhan yuan`。在印尼文／西班牙文／俄文裡，沒有限定詞的
yuan / юань / يوان 就是人民幣。同一個下午已經是第三次撞到這一族——先前還有一次
是反過來的災難：為了修這種錯做字串取代，`يوان` 是 `تايوان`（台灣）的子字串，
把「莊智淵代表台灣」改成了「莊智-美元」。

判準：譯文裡「數字（可帶量級詞）緊接幣別詞」，而前後 45 字內沒有任何限定詞
（Taiwan / NT$ / TWD / Тайвань / تايوان / baru …），且 **zh 來源通篇沒有「人民幣」**。
最後這一條很重要——講中國公司或中國市場的文章（大宇雙劍賣 IP 給中手游、
動畫投資 1 億元人民幣）裡的 yuan 是對的。

三輪校準才收斂（REFLEXES #66）：
  第一版只找幣別詞 → 12,899 處，其中絕大多數是「Legislative Yuan／Executive Yuan」
    （立法院／行政院），根本不是貨幣。
  第二版加數字錨定 → 1,288 處，但 `[0-9,]*` 吃掉逗號讓「2024, Yuan Goang-Ming」
    （袁廣鳴）穿過。
  第三版排除幣別詞後接大寫字的情形（Yuan Ze University、Yuan Goang-Ming）→ 1,180 處。

用法：
    python3 currency-identity-check.py <譯文...>   # exit 1 = 有命中
    python3 currency-identity-check.py --all
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]

MAG = (r"(?:ribu|juta|miliar|triliun|mil|millones|millón|milliards?|millions?|"
       r"thousand|million|billion|тысяч\w*|миллион\w*|миллиард\w*|"
       r"ألف|آلاف|مليون|مليار|हज़ार|लाख|करोड़|अरब|nghìn|triệu|tỷ|"
       r"Tausend|Millionen|Milliarden)")

# 金額數字：千分位／小數點可以在中間，但要收在數字上（尾巴的逗號句號是標點不是金額）
NUM = r"[0-9](?:[0-9.,]*[0-9])?"

CURRENCY = {
    "id": r"yuan", "es": r"yuan(?:es)?", "fr": r"yuans?", "pt": r"yuan(?:es)?",
    "en": r"yuan", "de": r"Yuan", "ru": r"юан\w*", "ar": r"يوان",
    "hi": r"युआन", "vi": r"nhân dân tệ",
}

# 有這些限定詞在附近就不是「裸幣別」
QUALIFIER = re.compile(
    r"(Taiwan|Tai[wv]an|TWD|NT\$|Тайв|تايوان|ताइवान|Đài Loan|baru|Baru)", re.I)
# 幣別詞後面接大寫開頭的字＝專有名詞（Yuan Ze University、Yuan Goang-Ming）
PROPER_NOUN = re.compile(r"^\s*[A-ZА-Я][a-zа-я-]")

# 第二族（2026-09-10 補）：台灣的錢被寫成**譯文語言自己國家**的錢。
# 紙風車 id 篇把「35 萬至 45 萬元」寫成 `350–450 ribu rupiah`、「2.1 億捐款」寫成
# `210 juta rupiah`——三處，十三道閘全綠，因為 gate 13 那時只認得 yuan。
# 這一族比人民幣那族更隱形：讀者不會覺得句子怪，只會以為台灣用印尼盾。
LOCAL_CURRENCY = {
    "id": r"rupiah", "hi": r"रुपये|रुपए|रुपया", "ru": r"рубл\w*",
    # 越南文 đồng 也是一串常用複合詞的首字（đồng thời 同時、đồng ý 同意、đồng bộ 同步…），
    # 2026-09-27 vi〈台灣在國際標準中的標示問題〉的「ISO 3166-1 đồng thời」被當成 1 越南盾。
    "vi": r"đồng(?!\s+(?:thời|ý|bộ|nghĩa|loạt|đều|hành|bằng|minh|tâm|chí|nhất|hương|nghiệp|thuận|dạng|đẳng|cảm|lòng|hồ)\b)",
    "ar": r"ريال|درهم|دينار",
}
# 越南文的 đồng 是「貨幣單位」的通稱不是專有名詞，`đồng Đài Loan` 正是台幣的標準
# 講法；rupiah／рубль／ريال 則是國家專屬詞，後面接 Taiwan 也救不回來（`rupiah
# Taiwan baru` 不是「新台幣」，是不存在的東西）。第一版沒分這一刀，全庫 1,068 處
# 裡有 1,042 處是越南文的誤報——比訊號本身還多（REFLEXES #66／#74）。
GENERIC_UNIT = {"vi": r"(?:Đài Loan|Đài tệ|TWD|NT\$|New Taiwan|New Đài|Tân Đài)"}

# 越南文 đồng 也是「銅」：獎牌清單「vàng, bạc, đồng」（金銀銅）裡的 đồng 是銅牌。
# 2026-10-10 babel-nightly：vi〈台灣教育制度〉每次重譯都被「6 huy chương vàng, 13 bạc,
# 6 đồng」擋成 currency[5]，隔一輪重派一次、一夜十幾次，母稿與模型都沒錯。
# 只在視窗裡有「huy chương」（獎牌）、「N vàng」計數（「2 vàng 5 đồng」沒有銀牌），
# 或金與銀同時出現時豁免——單有 vàng 可能是金價。
MEDAL_CONTEXT = {"vi": re.compile(r"huy chương|\b\d+\s+(?:huy chương\s+)?vàng\b|(?=.*\bvàng\b)(?=.*\bbạc\b)", re.I | re.S)}

# 文章真的在講那個國家的錢時（移工匯款、當地票價）就不是錯的
LOCAL_OK = {
    "id": r"Indonesia|Jakarta", "hi": r"भारत|दिल्ली|मुंबई",
    "ru": r"Росси|Москв|рубл[её]в\w* курс", "vi": r"Việt Nam|Hà Nội",
    "ar": r"السعودي|الإمارات|قطر|الأردن|مصر",
}

SUGGEST = {
    "id": "NT$ / dolar Taiwan", "es": "NT$ / dólares taiwaneses", "fr": "NT$ / dollars taïwanais",
    "pt": "NT$ / dólares taiwaneses", "en": "NT$ / New Taiwan dollars", "de": "NT$ / Neue Taiwan-Dollar",
    "ru": "NT$ / новых тайваньских долларов", "ar": "NT$ / دولار تايواني جديد",
    "hi": "NT$ / नए ताइवानी डॉलर", "vi": "NT$ / Đài tệ",
}


def lang_of(path: Path) -> str | None:
    try:
        parts = path.resolve().relative_to(REPO / "knowledge").parts
    except ValueError:
        return None
    return parts[0] if len(parts) >= 2 and re.fullmatch(r"[a-z]{2}", parts[0]) else None


def zh_source(text: str) -> Path | None:
    m = re.search(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", text, re.M)
    return (REPO / "knowledge" / m.group(1).strip()) if m else None


def scan(path: Path) -> list[str]:
    lang = lang_of(path)
    if lang not in CURRENCY:
        return []
    text = path.read_text(encoding="utf-8")
    zh = zh_source(text)
    if zh is None or not zh.exists():
        return []
    # 文章本身就在講人民幣（中國公司、中國市場）→ 那裡的 yuan 是對的
    if "人民幣" in zh.read_text(encoding="utf-8"):
        return []
    # 數字必須收在數字上：「2010, Yuan began…」的逗號是子句邊界，不是金額的一部分。
    # 2026-11-21 babel-nightly：〈黑冠麻鷺〉en/es/pt 每次重譯都被「Starting in 2010, Yuan
    # （袁孝維）began systematic banding」擋成 currency[1]，跨兩種模型同一理由直到被判
    # cascade exhausted；同族還有「2016, Yuan de Controle」（監察院）、「n.º 1, Yuan-shan」（圓山）。
    pat = re.compile(rf"{NUM}\s?(?:{MAG}\s)?{CURRENCY[lang]}\b", re.I)
    hits = []
    for m in pat.finditer(text):
        if PROPER_NOUN.match(text[m.end():m.end() + 12]):
            continue
        window = text[max(0, m.start() - 45):m.end() + 45]
        if QUALIFIER.search(window):
            continue
        hits.append(f"人民幣：{m.group()}   …{window.strip()[:80]}…".replace("\n", " "))
    # 第二族：譯文語言自己國家的錢。這裡沒有 QUALIFIER 豁免——句子旁邊寫著
    # Taiwan 也不會讓 rupiah 變成正確的幣別，反而正是最典型的錯法。
    loc = LOCAL_CURRENCY.get(lang)
    if loc:
        # 數字前面緊貼字母或連字號是代碼的一部分（ISO 3166-1），不是金額
        lpat = re.compile(rf"(?<![\w\-]){NUM}\s?(?:{MAG}\s)?(?:{loc})\b", re.I)
        ok = re.compile(LOCAL_OK[lang], re.I)
        gen = GENERIC_UNIT.get(lang)
        for m in lpat.finditer(text):
            window = text[max(0, m.start() - 60):m.end() + 60]
            if ok.search(window):
                continue
            medal = MEDAL_CONTEXT.get(lang)
            if medal and medal.search(window):
                continue
            if gen and re.match(rf"\s*{gen}", text[m.end():m.end() + 20], re.I):
                continue
            hits.append(f"在地幣別：{m.group()}   …{window.strip()[:80]}…".replace("\n", " "))
    return hits


def main() -> int:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        return 2
    files = (sorted(p for p in (REPO / "knowledge").rglob("*.md") if lang_of(p) in CURRENCY)
             if args[0] == "--all" else [Path(a) for a in args])

    total = flagged = 0
    for f in files:
        hits = scan(f)
        if not hits:
            continue
        flagged += 1
        total += len(hits)
        lang = lang_of(f)
        print(f"❌ {f.resolve().relative_to(REPO)} — {len(hits)} 處裸幣別（該用 {SUGGEST[lang]}）")
        for h in hits[:5]:
            print(f"     {h}")
        if len(hits) > 5:
            print(f"     …另外 {len(hits) - 5} 處")
    if flagged:
        print(f"\n════ {flagged} 檔，合計 {total} 處 ════")
        print("台灣的錢不是中國的錢，也不是譯文語言自己國家的錢。")
        print("  人民幣族：沒有限定詞的 yuan／юань／يوان 讀者會讀成人民幣。")
        print("  在地幣別族：rupiah／рубль 是國家專屬詞，寫成「rupiah Taiwan baru」"
              "不是「新台幣」而是不存在的東西。")
        print("⚠️ 修的時候不要做裸字串取代——`يوان` 是 `تايوان`（台灣）的子字串，"
              "2026-09-09 有人因此把「莊智淵代表台灣」改成了「莊智-美元」。用數字錨定。")
        return 1
    print(f"✅ {len(files)} 檔，沒有把台幣寫成人民幣或譯文語言自己國家的錢")
    return 0


if __name__ == "__main__":
    sys.exit(main())
