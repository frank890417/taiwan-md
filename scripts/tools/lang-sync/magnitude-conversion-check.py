#!/usr/bin/env python3
"""magnitude-conversion-check.py — 抓「換算了、但換錯一個量級」的譯文數字（只報告，不是閘門）。

為什麼要這支：numeral-magnitude-check.py 的判準是「數字串沒變＝沒換算」，它自己的
docstring 寫明抓不到「換算錯」——換算錯的時候數字串確實變了，指紋對不上。
2026-10-12 babel 夜班手修 hi〈台灣新冠疫情與疫苗〉：那支報 16 處，對照中文逐句讀完
實際錯了五十處以上，多出來的全是這一族——腳註裡 11.7萬 寫成 `1.17 मिलियन`
（大十倍）、`1,303,200` 寫成 `13.032 मिलियन`、四十八億寫成 `48 अरब`、
救濟金一億五千萬寫成 `15,302.5 मिलियन`（大一百倍）。這些全綠過九道閘。

判準（只用數值，不配對段落）：
  譯文裡每個「數字＋量級詞」或五位數以上的完整整數，算出實際數值 T。
  T 不在中文原文的數值集合裡，但 T÷10、T×10、T÷100、T×100 其中一個在
  ——而且那個中文數值本身在譯文裡找不到正確的寫法——就報「疑似差 N 倍」。

  「中文數值在譯文裡找不到」這一條是保險：中文同時有 50萬 和 500萬 時，譯文
  正確寫出兩者不該被報成彼此的十倍。抽不掉的巧合仍會報，所以這支是線索，不是裁決。

  刻意不做：用文字寫出來的數字（「पाँच लाख」「四十八億」的外文字寫法），各語言
  數詞系統各自一套，本支只認阿拉伯數字。那一族目前仍只能對照中文逐句讀。

用法：
  python3 scripts/tools/lang-sync/magnitude-conversion-check.py <zh> <譯文>
  python3 scripts/tools/lang-sync/magnitude-conversion-check.py --lang hi [--top 20]
exit 1 = 有可疑。不接進任何閘門；要不要接，先看全庫抽樣的準確率（REFLEXES #66／#99）。
"""
import argparse
import importlib.util
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("nmc", HERE / "numeral-magnitude-check.py")
nmc = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(nmc)

REPO = nmc.REPO
KNOWLEDGE = nmc.KNOWLEDGE

# 量級詞：numeral-magnitude-check 的兩張表合起來（MAGNITUDE 少了 hi 的 मिलियन／बिलियन，
# 而 hi 腳註正是寫成 मिलियन 的那批錯——兩張表各管一個形狀，這裡要的是全部）。
def scale_words(lang: str) -> dict[str, int]:
    words = dict(nmc.MAGNITUDE.get(lang, {}))
    for w in nmc.SPLIT_WORDS.get(lang, []):
        words.setdefault(w, nmc.SPLIT_SCALE[w])
    return words


def parse_num(raw: str, lang: str) -> float | None:
    """比 nmc._num 多一層判斷：逗號小數的語言裡，譯文常照英文習慣寫小數點
    （es「2.63 millones」、vi「57.6 tỷ」）。nmc._num 把那個點一律當千分位，
    首跑因此把 2.63 百萬讀成 263 百萬、報成大一百倍——es 抽樣八筆假陽性三筆。
    點後面剛好三位數才是千分位；不是三位數就是小數點。"""
    s = raw
    if lang in nmc.DECIMAL_COMMA:
        if "," in s and "." in s:          # 1.234,5 → 千分位點＋小數逗號
            s = s.replace(".", "").replace(",", ".")
        elif "," in s:
            s = s.replace(",", ".") if not re.fullmatch(r"\d{1,3}(,\d{3})+", s) else s.replace(",", "")
        elif "." in s and not re.fullmatch(r"\d{1,3}(\.\d{3})+", s):
            pass                            # 小數點
        else:
            s = s.replace(".", "")
    else:
        s = s.replace(",", "")
    try:
        return float(s)
    except ValueError:
        return None


def out_values(text: str, lang: str):
    """回傳 [(原字串, 數值, 行號)]：數字＋量級詞，或五位數以上的完整整數。"""
    words = scale_words(lang)
    found, taken = [], []
    if words:
        alt = "|".join(re.escape(w) for w in sorted(words, key=len, reverse=True))
        for m in re.finditer(r"(?<![\d.,])(\d[\d.,]*)[\s ]?(" + alt + r")(?![^\W\d_])", text):
            # 「mil millones」這種量級詞後面又接量級詞的，交給原工具的處理，這裡跳過
            nxt = text[m.end():m.end() + 14]
            if re.match(r"\s*(" + alt + r")", nxt):
                continue
            n = parse_num(m.group(1).rstrip(".,"), lang)
            if n is None:
                continue
            found.append((m.group(0), n * 10 ** words[m.group(2)], text.count("\n", 0, m.start()) + 1))
            taken.append((m.start(), m.end()))
    # 完整整數（含印度式 2,07,230 分節）：至少五位數，避開年份與編號
    for m in re.finditer(r"(?<![\d.,])\d{1,3}(?:[,.   ]\d{2,3})+(?![\d])|(?<![\d.,])\d{5,}(?![\d.,])", text):
        if any(a <= m.start() < b for a, b in taken):
            continue
        digits = re.sub(r"\D", "", m.group(0))
        if len(digits) < 5:
            continue
        # 逗號小數語言裡「1.17」這種只有兩節、第二節不是三位的，是小數不是整數
        if re.search(r"[.,]\d{1,2}$", m.group(0)):
            continue
        found.append((m.group(0), float(digits), text.count("\n", 0, m.start()) + 1))
    return found


def _in(v: float, pool: list[float]) -> bool:
    return any(abs(v - p) <= max(1.0, p * 0.002) for p in pool)


def check(zh_path: Path, out_path: Path, lang: str) -> list[str]:
    zh = zh_path.read_text(encoding="utf-8", errors="ignore")
    out = out_path.read_text(encoding="utf-8", errors="ignore")
    zh_pool = list(set(nmc.zh_values(zh)) | {float(x) for x in nmc.zh_integers(zh)})
    zh_pool = [v for v in zh_pool if v >= 1e4]
    if not zh_pool:
        return []
    vals = out_values(out, lang)
    out_pool = [v for _, v, _ in vals]
    hits = []
    for raw, t, ln in vals:
        if t < 1e4 or _in(t, zh_pool):
            continue
        for f, label in ((10, "大 10 倍"), (100, "大 100 倍"), (0.1, "小 10 倍"), (0.01, "小 100 倍")):
            z = t / f
            if _in(z, zh_pool) and not _in(z, out_pool):
                hits.append(f"L{ln}「{raw}」= {t:,.0f}，中文是 {z:,.0f}（{label}）")
                break
    return hits


def zh_path_of(out_path: Path) -> Path | None:
    m = re.search(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", out_path.read_text(encoding="utf-8", errors="ignore"), re.M)
    if not m:
        return None
    p = KNOWLEDGE / m.group(1).strip()
    return p if p.exists() else None


def lang_of(p: Path) -> str:
    try:
        return p.resolve().relative_to(KNOWLEDGE).parts[0]
    except ValueError:
        return ""


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("zh", nargs="?")
    ap.add_argument("out", nargs="?")
    ap.add_argument("--lang")
    ap.add_argument("--top", type=int, default=0, help="只印命中最多的前 N 檔")
    a = ap.parse_args()
    pairs = []
    if a.zh and a.out:
        pairs.append((Path(a.zh), Path(a.out), a.lang or lang_of(Path(a.out))))
    elif a.lang:
        for f in sorted((KNOWLEDGE / a.lang).rglob("*.md")):
            z = zh_path_of(f)
            if z:
                pairs.append((z, f, a.lang))
    else:
        ap.error("給 <zh> <譯文>，或 --lang")
    results = [(o, check(z, o, l)) for z, o, l in pairs]
    results = [(o, h) for o, h in results if h]
    results.sort(key=lambda x: -len(x[1]))
    shown = results[:a.top] if a.top else results
    for o, h in shown:
        print(f"⚠️ {o.resolve().relative_to(REPO) if o.resolve().is_relative_to(REPO) else o}")
        for line in h:
            print(f"      {line}")
    total = sum(len(h) for _, h in results)
    print(f"\n════ {len(pairs)} 檔，{len(results)} 檔 {total} 處疑似換算錯一個量級 ════")
    print("線索不是裁決：中文裡剛好有一個十倍的數字時會巧合命中。逐處對照中文再改。")
    return 1 if results else 0


if __name__ == "__main__":
    sys.exit(main())
