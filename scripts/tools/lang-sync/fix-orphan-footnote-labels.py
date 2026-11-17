#!/usr/bin/env python3
r"""fix-orphan-footnote-labels.py — 把譯文裡「標籤寫壞、但定義其實在」的腳註引用接回去（issue #1891）。

## 為什麼要這支

`article-health.py --check=footnote-reference` 量得出「正文引用了、文末沒有對應定義」
的腳註標籤（11-17 讀數：230 個標籤、101 個檔，全在 knowledge/<lang>/ 譯本）。
讀者看到的是點不到的方括號。大半不是缺定義，是翻譯模型把標籤寫壞了：

    [^١٠]   阿拉伯—印度數字        [^^23]   多一個脫字符
    [^\13]  多一個反斜線           [^\*^1]  反斜線＋星號＋脫字符
    [^ 5]   前面多一格空白         [^_12]   前面多一個底線
    [^1le]  [^로]  [^1 3]  [^2<0xC2>7]  [^\d] ……  數字本身被吃掉或換掉

前一排「數字還在」，後一排「數字已經壞了」。`[^1<0xA0>]` 看起來像 `[^1]` 後面
多一個空白，對照中文母稿同一個位置才知道原本是 `[^17]`——「去掉雜訊後剛好對上
既有定義」對後一排**不夠**，必須有第二個證據。

## 兩條規則（任何一條不成立就不動）

**規則 A：無損正規化**（數字沒壞，只多了前綴雜訊）
  - 阿拉伯—印度數字 `٠-٩`／波斯數字 `۰-۹` 轉 ASCII
  - 去掉開頭的 `^` `\` `*` `_`（可連續），去掉頭尾空白與零寬字元
  - 正規化後的標籤必須**正好**是檔內既有、內容非空的定義

**規則 B：對照中文母稿同一個位置**（數字壞了，靠母稿找回來）
  - 母稿取 frontmatter `translatedFrom` 在 `sourceCommitSha` 那一版（譯文就是從那版翻的）
  - 譯文與母稿的引用序列**長度相等**，且每一個不是孤兒的位置**標籤都相同**
  - 兩邊都有定義的標籤，網址必須相同（確認兩邊編號是同一套）
  - 同一個孤兒標籤出現好幾次時，每次對到的母稿標籤必須是同一個
  - 對到的母稿標籤必須是譯文檔內既有的定義
  - 規則 A 也能修的，兩條規則的答案必須一致，否則不動

規則 B 的序列對不上（譯文多一條、少一條）就整檔不用 B——順序一錯，來源會接到
另一句話上，比點不到更糟（讀者不會發現）。

## 改完的自我檢查（不過就整檔不寫）

  1. 孤兒集合必須嚴格變小，而且不准出現原本沒有的孤兒
  2. 把新舊兩版的 `[^…]` 標記全部拿掉，剩下的文字必須一模一樣——證明只動了標籤

孤兒的判準一律用 `footnote_reference.dangling_refs()`，跟官方 check 同一支函式，
不另寫一份（兩套判準會分歧，REFLEXES #99）。

## 不處理（印出來留給人）

  - 缺定義（母稿有、譯文沒搬過來）：要照母稿翻定義，不是改標籤
  - 未收尾的 `[^`（把一整段正文吞成標籤）：關上括號會露出被吞掉的那條引用，要人看
  - 序列對不上、母稿也救不回來的

## 用法

    python3 scripts/tools/lang-sync/fix-orphan-footnote-labels.py <檔...>       # dry-run
    python3 scripts/tools/lang-sync/fix-orphan-footnote-labels.py --all          # 全部譯本 dry-run
    python3 scripts/tools/lang-sync/fix-orphan-footnote-labels.py --apply <檔...>
    python3 scripts/tools/lang-sync/fix-orphan-footnote-labels.py --all --apply
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
sys.path.insert(0, str(REPO / "scripts" / "tools" / "lib"))

from article_health.loader import load_target  # noqa: E402
from article_health.checks.footnote_reference import (  # noqa: E402
    _RE_DEF_BLOCK,
    _RE_REF,
    dangling_refs,
)

_ARABIC_DIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹", "01234567890123456789")
_LEAD_JUNK = "^\\*_"
_ZERO_WIDTH = "​‌‍⁠﻿"
_RE_FM = re.compile(r"\A---\r?\n(?P<yaml>.*?)\r?\n---\r?\n?", re.DOTALL)
_RE_ANY_REF = re.compile(r"\[\^[^\]]+\]")


# ── 解析 ────────────────────────────────────────────────────────────────

def _fm_value(yaml: str, key: str) -> str | None:
    m = re.search(rf"^{key}:\s*['\"]?([^'\"\n]+?)['\"]?\s*$", yaml, re.M)
    return m.group(1).strip() if m else None


def _split(text: str) -> tuple[str, str, int]:
    """(frontmatter yaml, body, body offset in text)."""
    m = _RE_FM.match(text)
    if not m:
        return "", text, 0
    return m.group("yaml"), text[m.end():], m.end()


def _definitions(body: str) -> dict[str, str]:
    """label → 定義內容（只收內容非空的，跟 renderer 一致）。"""
    out = {}
    for m in _RE_DEF_BLOCK.finditer(body):
        if m.group(2).strip():
            out[m.group(1)] = m.group(2)
    return out


def _url(content: str) -> str | None:
    m = re.search(r"\]\((https?://[^)\s]+)", content) or re.search(r"(https?://[^\s)>\]]+)", content)
    return m.group(1) if m else None


def _references(body: str) -> list[tuple[int, int, str]]:
    """(start, end, label) in body coords，跟 renderer 一樣：先移除定義區塊再掃。

    移除之後剩下的片段各自對回原文位置；橫跨被移除區塊的引用（極少見）不回報，
    因為它在原文裡不是連續的一段，沒辦法安全替換。
    """
    segments = []  # (orig_start, orig_end)
    pos = 0
    for m in _RE_DEF_BLOCK.finditer(body):
        segments.append((pos, m.start()))
        pos = m.end()
    segments.append((pos, len(body)))
    remaining = "".join(body[a:b] for a, b in segments)
    # remaining offset → original offset
    starts = []
    acc = 0
    for a, b in segments:
        starts.append((acc, a, b - a))
        acc += b - a

    def to_orig(off: int) -> tuple[int, int]:
        for r0, o0, ln in starts:
            if r0 <= off < r0 + ln or (off == r0 + ln and ln == 0):
                return o0 + (off - r0), r0 + ln
        return -1, -1

    out = []
    for m in _RE_REF.finditer(remaining):
        s, seg_end = to_orig(m.start())
        if s < 0 or m.end() > seg_end:
            out.append((-1, -1, m.group(1)))  # 不能安全替換，但要佔位，序列才對得齊
            continue
        out.append((s, s + (m.end() - m.start()), m.group(1)))
    return out


def _zh_source(yaml: str) -> tuple[str | None, str]:
    """母稿在 sourceCommitSha 那一版的全文；拿不到就退回目前版本。回傳 (text, 版本說明)。"""
    src = _fm_value(yaml, "translatedFrom")
    if not src:
        return None, "no translatedFrom"
    rel = f"knowledge/{src}"
    sha = _fm_value(yaml, "sourceCommitSha")
    if sha:
        r = subprocess.run(["git", "-C", str(REPO), "show", f"{sha}:{rel}"],
                           capture_output=True, text=True)
        if r.returncode == 0:
            return r.stdout, f"{src}@{sha}"
    p = REPO / rel
    if p.exists():
        return p.read_text(encoding="utf-8"), f"{src}@HEAD"
    return None, f"{src} not found"


# ── 兩條規則 ─────────────────────────────────────────────────────────────

def normalize(label: str) -> str:
    s = label.translate(_ARABIC_DIGITS)
    s = s.strip().strip(_ZERO_WIDTH).strip()
    s = s.lstrip(_LEAD_JUNK).strip()
    return s


def rule_a(orphans: set[str], defined: set[str]) -> dict[str, str]:
    out = {}
    for o in orphans:
        n = normalize(o)
        if n and n != o and n in defined:
            out[o] = n
    return out


def rule_b(refs: list[str], orphans: set[str], defs: dict[str, str],
           zh_text: str | None) -> tuple[dict[str, str], str]:
    if zh_text is None:
        return {}, "沒有母稿"
    _, zbody, _ = _split(zh_text)
    zdefs = _definitions(zbody)
    zrefs = [lab for _, _, lab in _references(zbody)]
    if len(zrefs) != len(refs):
        return {}, f"引用數不等（譯 {len(refs)} / 母 {len(zrefs)}）"
    for a, b in zip(refs, zrefs):
        if a not in orphans and a != b:
            return {}, "非孤兒位置標籤不同"
    common = set(defs) & set(zdefs)
    bad = [c for c in common if _url(defs[c]) != _url(zdefs[c])]
    if bad:
        return {}, f"兩邊同編號定義網址不同（{len(bad)}/{len(common)}）"
    seen: dict[str, set[str]] = {}
    for a, b in zip(refs, zrefs):
        if a in orphans:
            seen.setdefault(a, set()).add(b)
    out = {}
    for o, targets in seen.items():
        if len(targets) == 1:
            (t,) = targets
            if t in defs and t != o:
                out[o] = t
    return out, "對齊"


# ── 主流程 ───────────────────────────────────────────────────────────────

def plan_file(path: Path, zh_override: Path | None = None) -> dict:
    t = load_target(path)
    text, off, yaml = t.text, t.body_text_offset, t.frontmatter_raw
    body = text[off:]  # 跟官方 check 同一個切點，只是沒有補前導空行
    orphans = set(dangling_refs(t.body))
    res = {"path": str(path), "orphans": orphans, "map": {}, "notes": [], "new_text": None}
    if not orphans:
        return res
    defs = _definitions(body)
    refs = _references(body)
    a = rule_a(orphans, set(defs))
    zh_text, zh_ver = (zh_override.read_text(encoding="utf-8"), str(zh_override)) if zh_override else _zh_source(yaml)
    b, why = rule_b([lab for _, _, lab in refs], orphans, defs, zh_text)
    res["notes"].append(f"母稿 {zh_ver}；規則 B：{why}")
    mapping = {}
    for o in orphans:
        ra, rb = a.get(o), b.get(o)
        if ra and rb and ra != rb:
            res["notes"].append(f"[^{o}] 規則 A→{ra} 與規則 B→{rb} 不一致，不動")
            continue
        if ra or rb:
            mapping[o] = (ra or rb, "A+B" if ra and rb else ("A" if ra else "B"))
    if not mapping:
        return res

    # 替換（從後往前，位置不會跑掉）
    new_body = body
    n_occ = 0
    for s, e, lab in sorted(refs, reverse=True):
        if lab in mapping and s >= 0:
            new_body = new_body[:s] + f"[^{mapping[lab][0]}]" + new_body[e:]
            n_occ += 1
    new_text = text[:off] + new_body

    # 自我檢查 1：孤兒嚴格變小、不准出現新的
    tmp_orphans = set(dangling_refs(new_body))
    if not (tmp_orphans < orphans):
        res["notes"].append(f"自我檢查失敗：修後孤兒 {sorted(tmp_orphans)} 不是修前的真子集，不寫")
        return res
    # 自我檢查 2：拿掉所有 [^…] 之後全文不變
    if _RE_ANY_REF.sub("", text) != _RE_ANY_REF.sub("", new_text):
        res["notes"].append("自我檢查失敗：標籤以外的文字有變動，不寫")
        return res
    res["map"] = mapping
    res["occurrences"] = n_occ
    res["after"] = tmp_orphans
    res["new_text"] = new_text
    return res


def translation_files() -> list[Path]:
    r = subprocess.run(["git", "-C", str(REPO), "ls-files", "knowledge/*/*/*.md"],
                       capture_output=True, text=True, check=True)
    out = []
    for line in r.stdout.splitlines():
        parts = line.split("/")
        if len(parts) == 4 and not parts[3].startswith("_") and "/_" not in line:
            out.append(REPO / line)
    return out


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("files", nargs="*")
    ap.add_argument("--all", action="store_true", help="掃 knowledge/<lang>/ 全部譯本")
    ap.add_argument("--apply", action="store_true", help="真的寫回（預設 dry-run）")
    ap.add_argument("--zh-override", type=Path, help="測試用：指定母稿檔，不從 frontmatter 找")
    ap.add_argument("--quiet", action="store_true", help="只印有改動的檔")
    args = ap.parse_args()

    files = [Path(f) for f in args.files]
    if args.all:
        files += translation_files()
    if not files:
        ap.error("給檔案或 --all")

    tot_files = tot_labels = tot_occ = 0
    for f in files:
        f = f if f.is_absolute() else (Path.cwd() / f)
        try:
            res = plan_file(f, args.zh_override)
        except Exception as exc:  # 一檔壞掉不拖垮整批
            print(f"!! {f}: {exc}")
            continue
        if not res["orphans"]:
            continue
        rel = f.relative_to(REPO) if f.is_relative_to(REPO) else f
        if res["map"]:
            tot_files += 1
            tot_labels += len(res["map"])
            tot_occ += res["occurrences"]
            print(f"== {rel}  孤兒 {len(res['orphans'])} → {len(res['after'])}（{res['occurrences']} 處）")
            for o, (n, rule) in sorted(res["map"].items()):
                print(f"     [^{o!s:.40}] → [^{n}]   規則 {rule}")
            if args.apply:
                f.write_text(res["new_text"], encoding="utf-8")
        elif not args.quiet:
            print(f"-- {rel}  孤兒 {len(res['orphans'])}，本工具不動")
        if not args.quiet or res["map"]:
            for n in res["notes"]:
                print(f"     · {n}")
    verb = "已改" if args.apply else "將改（dry-run）"
    print(f"\n{verb}：{tot_files} 檔、{tot_labels} 個標籤、{tot_occ} 處引用")
    return 0


if __name__ == "__main__":
    sys.exit(main())
