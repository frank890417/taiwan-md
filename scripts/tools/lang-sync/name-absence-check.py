#!/usr/bin/env python3
"""name-absence-check.py — 譯文點名了一個 zh 原文裡根本沒有的人。

為什麼要這支（2026-09-26 巴別塔渦流第九輪）：一個晚上照出一整族張冠李戴，全部閘門都綠——
  · en〈台灣企業：宏碁〉把創辦人施振榮寫成 Shih Ming-de 63 處（那是施明德），接班的王振堂寫成 Terry Gou
  · en〈報導者〉把捐款人童子賢寫成 Barry Lam（林百里）
  · en〈拼板舟〉把夏曼・藍波安寫成 Hsiao Bi-khim（蕭美琴）；es〈閃靈〉把何韻詩寫成 Teresa Teng
  · en〈中壢事件〉description 自己寫著「note: source says Hsu Hsin-liang」，前面仍是 Hsiao Bi-khim
name-consistency-check 的規則 B 刻意只比人物頁標題（它的 docstring 記了全文比對第一版 277 處多半誤報），
所以正文裡的張冠李戴結構上看不到。這支換一個判準：譯文用了名字表裡某人的拼寫，而那個人的漢字
**根本不在 zh 原文裡**——原文沒提到的人，譯文不該點名。

為什麼只做報告不當閘門：判準有三族已知誤報，要人對 zh 逐筆核——
  1. 同一人不同稱呼：表的鍵是蔣中正，原文寫蔣介石或中正紀念堂（ALIAS 收了已知的幾組，收不完）
  2. 同音不同人：「Lin Chi-wei」在表上是林啟維，拿來寫林其蔚也拼成一樣
  3. 譯者補充語境：原文寫「總統」，譯文補上 Tsai Ing-wen——多半正確，但原文確實沒寫
校準（2026-09-26 全庫七個拉丁語系 7,943 篇）：原始判準 474 處／448 篇，蔣中正一族就佔 216；
加上連字號邊界（Lin Liang 不再吃進 Lin Liang-chun）與 ALIAS 之後 160 處／152 篇，抽樣裡真錯
佔多數。存量處置見 OBSERVER-QUEUE #84。

用法：
  python3 name-absence-check.py                 # 全庫盤點（en es fr pt id vi de）
  python3 name-absence-check.py <譯文...>        # 指定檔案
  python3 name-absence-check.py --json
輸出只列候選，exit 0；核對要回 zh 原文看那一句在講誰。
"""
from __future__ import annotations

import collections
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
KNOWLEDGE = REPO / "knowledge"
TABLE = Path(__file__).with_name("name-variants.json")
LATIN_LANGS = ["en", "es", "fr", "pt", "id", "vi", "de"]

# 表鍵 → 原文裡可能出現的其他稱呼。有任何一個在 zh 裡，就不算「原文沒提到」。
ALIAS = {
    "蔣中正": ["蔣介石", "中正"],
    "史溫侯": ["斯文豪", "郇和"],
    "莫那·魯道": ["莫那魯道", "莫那"],
    "館長陳之漢": ["陳之漢", "館長"],
    "蔡英文": ["小英", "蔡總統"],
    "柯文哲": ["柯P", "柯Ｐ"],
    "曾博恩": ["博恩"],
}
# 表鍵本身是日常用語或 slug 已知錯置，比對起來全是雜訊
SKIP = {"這群人", "簡立峰"}
SRC = re.compile(r"^translatedFrom:\s*['\"]?([^'\"\n]+)", re.M)


def _usable(form: str) -> bool:
    return len(form) >= 6 and len(form.split()) >= 2


def build_pattern():
    tbl = json.loads(TABLE.read_text(encoding="utf-8"))
    owners: dict[str, set[str]] = collections.defaultdict(set)
    for han, v in tbl.items():
        if han in SKIP:
            continue
        for f in list(v["forms"]) + ([v["zh_given"]] if v.get("zh_given") else []):
            if _usable(f):
                owners[f].add(han)
    # 同一個拼寫掛在兩個人名下的，無從判斷在講誰，不用
    forms = {f: next(iter(o)) for f, o in owners.items() if len(o) == 1}
    alt = "|".join(sorted(map(re.escape, forms), key=len, reverse=True))
    # 邊界連字號含 U+2011（不斷行連字號）：es 有一篇 Lin Liang‑jun 用的就是它
    return forms, re.compile(r"(?<![A-Za-z\-‑])(" + alt + r")(?![A-Za-z\-‑])")


def scan(path: Path, forms: dict, pat: re.Pattern) -> list[dict]:
    text = path.read_text(encoding="utf-8")
    m = SRC.search(text)
    if not m:
        return []
    zh_path = KNOWLEDGE / m.group(1).strip()
    if not zh_path.exists():
        return []
    zh = zh_path.read_text(encoding="utf-8")
    out, seen = [], set()
    for mm in pat.finditer(text):
        form = mm.group(1)
        han = forms[form]
        if han in seen or han in zh or any(a in zh for a in ALIAS.get(han, [])):
            continue
        seen.add(han)
        out.append({
            "path": str(path.relative_to(REPO)),
            "line": text.count("\n", 0, mm.start()) + 1,
            "form": form,
            "person": han,
            "context": text[max(0, mm.start() - 60): mm.end() + 40].replace("\n", " "),
        })
    return out


def main() -> int:
    args = [a for a in sys.argv[1:] if a != "--json"]
    forms, pat = build_pattern()
    if args:
        files = [Path(a) if Path(a).is_absolute() else REPO / a for a in args]
    else:
        files = [p for L in LATIN_LANGS for p in sorted((KNOWLEDGE / L).rglob("*.md"))]
    hits = [h for f in files if f.is_file() for h in scan(f, forms, pat)]
    if "--json" in sys.argv:
        print(json.dumps(hits, ensure_ascii=False, indent=1))
        return 0
    for h in hits:
        print(f"⚠️ {h['path']}:{h['line']} 「{h['form']}」是{h['person']}，zh 原文沒有這個人\n   …{h['context']}…")
    print(f"\n{len(hits)} 處／{len({h['path'] for h in hits})} 篇候選（報告不是閘門：回 zh 核那一句在講誰）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
