#!/usr/bin/env python3
"""retranslation-drift-check.py — 重譯把「中文沒改的章節」裡對的東西換掉了沒有（只報告，不修）。

為什麼要這支（2026-10-03 babel-nightly，同型第二夜）：事實巡邏每修一篇中文，十二個
語言就跟著 stale。補丁資格（patch-translate.py `CHAPTER_SIZE_RATIO_LIMIT`）量的是被碰
章節的大小，散在好幾節的小修一律退回整篇重翻，交給名單外的免費模型。10-02 那夜 72 份
重譯閘門全綠，逐篇對讀才抓到四篇是**重譯本身帶進來的新錯**，而且全落在中文根本沒改的
地方：fr 鄰長寫成鄉長、en 把舊版正確的 National Education 改成 Compulsory Education、
ja 臭豆腐寫成「臭豆腸」、ko 釋字寫成大法院判決。那夜的原子檢查只證明「新事實到了」，
證明不了「舊的對的東西還在」；72 份讀了十幾份，其餘沒讀。

這支量的是後者。對每份譯文：
  1. zh 舊版 = 譯文舊版 frontmatter 的 sourceCommitSha 那一版；zh 新版 = 工作樹
  2. 兩版 zh 按 `## ` 切章，逐章比對，字面相同的章叫「沒改的章」
  3. 譯文舊版（--base 那個 rev）跟新版同樣切章、按序對齊（章數不同就不對齊，整篇報
     「結構變了」交人看）
  4. 在「沒改的章」裡比兩版譯文的錨點：數字、拉丁字母專有名詞（大寫開頭的詞組）、
     ja 的漢字詞（≥2 字且不在 zh 原文裡出現——「臭豆腸」這種）。新版多出來的錨點就是候選

只報告，因為模型重寫一句話時合法地換掉專有名詞也常見（全名↔簡稱、補上英文名）。
判準刻意只抓「錨點」不比措辭：措辭重譯本來就會整段不同，那不是錯。報出來的要人讀。

用法：
  python3 retranslation-drift-check.py --base <rev> <譯文...>
  python3 retranslation-drift-check.py --base <rev> --zh Food/台灣手搖飲文化.md   # 該篇全部語言
  exit 1 = 有候選；exit 0 = 沒改的章裡錨點全數守住（或沒有可比的章）
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(REPO / "scripts" / "tools" / "lang-sync"))
from langs import ALL_TRANSLATION_LANGS  # noqa: E402

FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.S)
SHA_RE = re.compile(r"^sourceCommitSha:\s*['\"]?([0-9a-f]{6,40})", re.M)
FROM_RE = re.compile(r"^translatedFrom:\s*['\"]?(.+?)['\"]?\s*$", re.M)
FN_DEF_RE = re.compile(r"^\[\^[^\]]+\]:.*$", re.M)
URL_RE = re.compile(r"https?://\S+|\]\([^)]*\)")
NUM_RE = re.compile(r"\d[\d,.]*\d|\d")
# 大寫開頭、可連成詞組的拉丁專有名詞（Compulsory Education、National Education）。
# 第一版（2026-10-03）不限位置，拿 10-02 那夜的兩篇 24 份重譯試跑，22 份報警：句首字、
# 標題字、德文每個名詞都大寫，全是噪音。收斂成「句中」——前面緊接小寫字母或逗號加一個
# 空白——再排除德文（名詞一律大寫，這條尺對它沒有鑑別力，只留數字錨點）。
# 詞組只用半形空白連接，`\s` 會跨過換行把兩行的字黏成一組。
PROPER_RE = re.compile(r"(?<=[a-zà-ÿ,] )[A-Z][\w'’-]*(?: [A-Z][\w'’-]*)*")
NO_PROPER_LANGS = {"de"}
KANJI_RE = re.compile(r"[一-鿿]{2,}")


def git_show(rev: str, path: str) -> str | None:
    r = subprocess.run(["git", "show", f"{rev}:{path}"], cwd=REPO, capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def body_of(text: str) -> str:
    m = FM_RE.match(text)
    body = text[m.end():] if m else text
    # 腳註定義與網址不比：來源標題本來就可能保留原文、網址是 byte-identical 另有閘門
    body = FN_DEF_RE.sub("", body)
    return URL_RE.sub(" ", body)


def chapters(body: str) -> list[str]:
    parts = re.split(r"(?m)^(?=## )", body)
    return [p.strip() for p in parts]


def norm_num(s: str) -> str:
    return s.replace(",", "").replace(".", "")


def near_zh_term(k: str, zh_text: str) -> bool:
    """k 跟 zh 裡某個等長片段只差一個字（臭豆腐→臭豆腸）。第一版收「zh 沒有的漢字詞」
    全部，日文本來就有大量 zh 字面沒有的漢字詞，一篇報幾十個；收斂到「只差一字」這個
    錯字形狀。"""
    n = len(k)
    for i in range(len(zh_text) - n + 1):
        seg = zh_text[i:i + n]
        if sum(a != b for a, b in zip(seg, k)) == 1 and KANJI_RE.fullmatch(seg):
            return True
    return False


def anchors(chap: str, lang: str, zh_text: str) -> set[str]:
    out = {f"#{norm_num(n)}" for n in NUM_RE.findall(chap) if len(norm_num(n)) >= 2}
    if lang not in NO_PROPER_LANGS:
        # 標題行不收：pt／es 的譯文把標題寫成每字大寫，句中規則對它無效
        prose = "\n".join(l for l in chap.splitlines() if not l.lstrip().startswith("#"))
        out |= {f"@{p}" for p in PROPER_RE.findall(prose) if len(p) >= 3}
    if lang == "ja":
        out |= {f"漢{k}" for k in KANJI_RE.findall(chap)
                if len(k) >= 3 and k not in zh_text and near_zh_term(k, zh_text)}
    return out


def check(trans_rel: str, base: str, new_rev: str | None = None) -> tuple[str, list[str]]:
    # new_rev：拿某個 commit 的版本當「新版」（回頭稽核已落地的重譯、或保住修過之前的正控制組）
    new = git_show(new_rev, trans_rel) if new_rev else (REPO / trans_rel).read_text(encoding="utf-8")
    if new is None:
        return "skip", [f"{new_rev} 沒有這份譯文"]
    old = git_show(base, trans_rel)
    if old is None:
        return "skip", ["base 沒有這份譯文（新檔，無從比較）"]
    if old == new:
        return "same", []
    lang = trans_rel.split("/")[1]
    fm_old = FM_RE.match(old)
    sha = SHA_RE.search(fm_old.group(1)) if fm_old else None
    zh_rel = FROM_RE.search(new)
    if not sha or not zh_rel:
        return "skip", ["舊譯文缺 sourceCommitSha 或新譯文缺 translatedFrom"]
    zh_path = f"knowledge/{zh_rel.group(1).strip()}"
    zh_old = git_show(sha.group(1), zh_path)
    zh_new = git_show(new_rev, zh_path) if new_rev else (REPO / zh_path).read_text(encoding="utf-8")
    if zh_old is None:
        return "skip", [f"zh 舊版 {sha.group(1)} 讀不到"]
    zc_old, zc_new = chapters(body_of(zh_old)), chapters(body_of(zh_new))
    old_body = body_of(old)
    tc_old, tc_new = chapters(old_body), chapters(body_of(new))
    # 對齊單位：zh 舊版與譯文舊版章數相同、zh 新版與譯文新版章數相同即可。中文插入或刪掉
    # 一章（巡邏常補「延伸閱讀」）不妨礙其他章對齊——沒改的章用內容在兩版 zh 裡找到彼此
    # 的位置，再各自取同位置的譯文章。第一版要求四者章數全等，10-02 社區篇補了一章，
    # 十二語全數報「無法對齊」，等於什麼都沒量。
    if len(zc_old) != len(tc_old) or len(zc_new) != len(tc_new):
        return "struct", [f"譯文章數跟 zh 對不上（zh {len(zc_old)}→{len(zc_new)}，譯文 {len(tc_old)}→{len(tc_new)}），整篇要人讀"]
    old_pos = {}
    for i, z in enumerate(zc_old):
        old_pos.setdefault(z, i)
    findings = []
    unchanged = 0
    severe = False
    intro_chapters: dict[str, int] = {}
    for j, zb in enumerate(zc_new):
        i = old_pos.get(zb)
        if i is None:
            continue
        unchanged += 1
        a_old = anchors(tc_old[i], lang, zb)
        a_new = anchors(tc_new[j], lang, zb)
        # 新出現的錨點要「整份舊譯文都沒有」才算：重譯常把同一個名詞挪到隔壁章，那不是換錯
        intro = sorted(a for a in a_new - a_old if a[1:] not in old_body)
        lost = sorted(a for a in a_old - a_new if a.startswith("#"))
        for a in intro:
            intro_chapters[a] = intro_chapters.get(a, 0) + 1
        head = tc_new[j].splitlines()[0][:50] if tc_new[j] else "(開頭)"
        if intro or lost:
            # 漢字錯字形狀只列 🔎：日文正規寫法本來就常跟 zh 差一字（人才→人材、
            # 腸內→腸内），一夜 48 份試跑報出的漢字候選大多是這種，當不了先讀的依據
            if lost or any(x.startswith("#") for x in intro):
                severe = True
            bits = []
            if intro:
                bits.append("新出現 " + "、".join(x[1:] for x in intro[:8]))
            if lost:
                bits.append("數字消失 " + "、".join(x[1:] for x in lost[:6]))
            findings.append(f"第 {j} 章「{head}」：" + "；".join(bits))
    if not unchanged:
        return "nochap", ["zh 每一章都有改動，沒有可比的章"]
    # 整篇換詞：同一個新錨點出現在 ≥3 個沒改的章——10-02 日文社區篇把「社區」98 處寫成
    # 「社協」、09-27 ko 棒球寫成「총구」70 處（OBSERVER-QUEUE #78）都是這個形狀。單章的
    # 新錨點多半是合法改寫，跨章一致換掉同一個詞才是模型認錯了主詞。
    systematic = sorted(k for k, n in intro_chapters.items() if n >= 3)
    if systematic:
        severe = True
        findings.insert(0, "整篇換詞（≥3 章同一個新詞）：" + "、".join(x[1:] for x in systematic[:8]))
    if not findings:
        return "ok", []
    # 數字或日文錯字形狀有動 = 先讀；只有專有名詞換寫法 = 可能是合法改寫，次之
    return ("drift" if severe else "names"), findings


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--base", required=True, help="舊譯文所在的 rev（重譯落地之前的 commit）")
    ap.add_argument("--new-rev", help="新版取自這個 rev（預設工作樹）")
    ap.add_argument("--zh", action="append", default=[], help="zh 路徑（相對 knowledge/），查它的全部語言")
    ap.add_argument("paths", nargs="*")
    args = ap.parse_args()
    targets = list(args.paths)
    for z in args.zh:
        for lang in ALL_TRANSLATION_LANGS:
            # -z：hub 檔名有空格（_Art Hub.md），用空白切會把路徑切斷
            r = subprocess.run(["git", "grep", "-lz", f"translatedFrom: '{z}'", "--", f"knowledge/{lang}/"],
                               cwd=REPO, capture_output=True, text=True, encoding="utf-8")
            targets += [p for p in r.stdout.split("\0") if p]
    if not targets:
        ap.error("沒有要檢查的譯文")
    flagged = named = 0
    for t in targets:
        rel = str(Path(t).resolve().relative_to(REPO)) if Path(t).is_absolute() else t
        kind, notes = check(rel, args.base, args.new_rev)
        mark = {"ok": "✅", "same": "·", "drift": "⚠️", "names": "🔎", "struct": "⚠️",
                "skip": "…", "nochap": "…"}[kind]
        print(f"{mark} {rel}" + ("（未重譯）" if kind == "same" else ""))
        for n in notes:
            print(f"     {n}")
        flagged += kind in ("drift", "struct")
        named += kind == "names"
    print(f"\n⚠️ {flagged} 份先讀（數字／錯字形狀／結構）· 🔎 {named} 份只有專有名詞換寫法 / 共 {len(targets)} 份")
    return 1 if flagged else 0


if __name__ == "__main__":
    sys.exit(main())
