#!/usr/bin/env python3
"""cover-promote.py — 把正文裡已經在庫的第一張本地圖升格成封面圖（frontmatter image）。

普查 C1 級（reports/article-health-census-2026-11-04.md §二 C 級／§五.3 第 1 條）：沒有
封面，但正文已經放了 `/article-images/...` 的本地圖。這種只要把那張設成 `image:`，
再從該篇 `## 圖片來源` 段把作者／授權／來源頁抄進 `imageCredit／imageLicense／imageSource`。

用法：
  python3 scripts/tools/cover-promote.py knowledge/People/彎彎.md                 # dry-run
  python3 scripts/tools/cover-promote.py --files reports/article-census/2026-11-04-tier-C1.txt
  python3 scripts/tools/cover-promote.py --files list.txt --apply

規則（抄不到就跳過，不猜）：
  - 已有 image → 不動（NOOP）
  - 只升格「檔案真的在 public/ 裡」的本地圖；正文第一張符合的那張
  - 授權出處依序找兩個地方：
    (1) 圖片正下方的圖說行（`_圖片：…_`／`*圖片 1：…*`／`_圖 1｜…_`，全站多數文章這樣寫）
    (2) `## 圖片來源`（或 圖片出處／影像來源）段裡描述最像這張圖的那一條：
        圖說（alt）與條目文字的中文雙字詞重疊＋圖檔英文 slug 與條目網址的字詞重疊
  - 比例超出 0.75–2.5（image-health 內文圖範圍）不升格：卡片會裁掉主體
  - 那一條要抄得到授權，且授權在卡片圖允收清單內：CC BY／CC BY-SA／CC0／公有領域
    （2026-09-05 OBSERVER-QUEUE #42 判例；GFDL-only 不收、合理使用不收、OGDL-Taiwan 等 #50）
  - 抄得到作者（— 後面、授權前面那段）才寫 imageCredit；抄不到整篇跳過
  - 文字級插入，放在 lastHumanReview／researchReport 之後（Stage 4 canonical order），
    單引號 scalar、撇號 '' 跳脫

模板端：正文已有同一張圖時文章頂部讓位（article-render.ts heroImageInBody），所以升格
不會讓同一張圖在頁面上出現兩次；卡片與 hub 改用這張圖。
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.parse
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]

_RE_FENCE = re.compile(r"```.*?```", re.DOTALL)
_RE_LOCAL_IMG = re.compile(r"!\[([^\]]*)\]\(\s*<?(/article-images/[^)\s>]+)>?\s*\)")
_RE_SOURCES_H2 = re.compile(r"(?m)^##\s*(圖片來源|圖片出處|影像來源)\s*$")
_RE_NEXT_H2 = re.compile(r"(?m)^##\s+")
# 連結網址可能帶括號（Commons 檔名常見 `_(cropped).jpg`）或用角括號包起來
_RE_LINK_FULL = re.compile(r"\[([^\]]*)\]\(\s*(?:<([^>]+)>|((?:[^()\s]|\([^()\s]*\))+))\s*\)")


class _LinkRe:
    """findall／finditer 回 (label, url)，相容舊呼叫點。"""

    @staticmethod
    def findall(text: str) -> list[tuple[str, str]]:
        return [(m.group(1), m.group(2) or m.group(3)) for m in _RE_LINK_FULL.finditer(text)]

    @staticmethod
    def finditer(text: str):
        return _RE_LINK_FULL.finditer(text)


_RE_LINK = _LinkRe()
_RE_LICENSE = re.compile(
    r"(CC[\s-]*BY(?:[\s-]*SA)?[\s-]*\d\.\d|CC0(?:\s*1\.0)?|公有領域|公共領域|Public\s+domain|PD-[A-Za-z0-9-]+)",
    re.IGNORECASE,
)
_RE_CJK = re.compile(r"[一-鿿㐀-䶿]")
_RE_BARE_COMMONS = re.compile(r"https?://commons\.wikimedia\.org/wiki/File:[^\s<>\]]+")
# 圖說裡的作者寫法五花八門；依序試，第一個抓到且像人名的就用
_CREDIT_PATTERNS = [
    re.compile(r"(?:照片|圖片)?作者[：:\s]*([^，,；;。（(\[]+)"),
    re.compile(r"(?:攝影者?|拍攝者)[：:\s]*([^，,；;。（(\[]+)"),
    re.compile(r"照片由\s*([^，,；;。]+?)\s*拍攝"),
    re.compile(r"([A-Za-z][A-Za-z0-9 .'-]{1,40}?)\s*拍攝"),
    re.compile(r"([^\[\]（(，,：:|｜；;。]+?)\s*[/／]\s*Wikimedia Commons"),
    re.compile(r"圖片[：:]\s*([^，,；;。／/（(\[]+?)\s*(?=[，,；;。／/]|$)"),
    re.compile(r"Photo(?:graph)?(?:\s+by)?\s*[:：]\s*([^，,；;。（(\[]+)", re.IGNORECASE),
]
_RE_LICENSE_LONG = re.compile(
    r"Creative Commons Attribution(-ShareAlike)?\s*(\d\.\d)", re.IGNORECASE
)
_RE_SLASH_CREDIT = re.compile(r"([^\[\]（(，,：:|｜；;]+?)\s*[/／]\s*Wikimedia Commons")
ASPECT_MIN, ASPECT_MAX = 0.75, 2.5
_RE_WORD = re.compile(r"[a-z]{3,}")


def _bigrams(text: str) -> set[str]:
    chars = "".join(_RE_CJK.findall(text))
    return {chars[i : i + 2] for i in range(len(chars) - 1)}


def _norm_license(raw: str) -> str:
    r = raw.strip()
    up = re.sub(r"[\s-]+", " ", r.upper())
    m = re.match(r"CC BY( SA)? (\d\.\d)", up)
    if m:
        return f"CC BY{'-SA' if m.group(1) else ''} {m.group(2)}"
    if up.startswith("CC0"):
        return "CC0 1.0"
    return "公有領域"


def _sources_items(body: str) -> list[str]:
    m = _RE_SOURCES_H2.search(body)
    if not m:
        return []
    rest = body[m.end():]
    n = _RE_NEXT_H2.search(rest)
    section = rest[: n.start()] if n else rest
    return [ln.strip() for ln in section.splitlines() if ln.strip().startswith(("- ", "* "))]


def _score(item: str, alt: str, slug: str) -> float:
    a, b = _bigrams(alt), _bigrams(item)
    jac = len(a & b) / len(a | b) if a and b else 0.0
    words = set(_RE_WORD.findall(slug.lower()))
    url_text = urllib.parse.unquote(item).lower()
    hits = sum(1 for w in words if w in url_text)
    # 年份是最硬的辨識訊號（同一人物的 2018 與 2022 兩張照）：圖說或檔名的年份出現在條目裡 +0.3
    years = set(re.findall(r"(?:19|20)\d{2}", alt + " " + slug))
    year_hit = any(y in url_text for y in years)
    return jac + 0.15 * hits + (0.3 if year_hit else 0.0)


def _parse_item(item: str) -> dict[str, str | None]:
    links = _RE_LINK.findall(item)
    source = None
    for _label, url in links:
        if "commons.wikimedia.org/wiki/File" in url or "wikimedia.org" in url:
            source = url
            break
    if source is None and links:
        source = links[0][1]
    # 授權與作者在最後一個連結之後（「— 作者，CC BY-SA 3.0」）
    tail = item
    last = list(_RE_LINK.finditer(item))
    if last:
        tail = item[last[-1].end():]
    lic_m = _RE_LICENSE.search(tail) or _RE_LICENSE.search(item)
    license_ = _norm_license(lic_m.group(1)) if lic_m else None
    credit = None
    seg = tail
    if "—" in seg:
        seg = seg.split("—", 1)[1]
    if lic_m and lic_m.group(1) in seg:
        seg = seg.split(lic_m.group(1), 1)[0]
    seg = re.sub(r"^(Photo|攝影|作者)\s*[:：]\s*", "", seg.strip())
    seg = seg.strip(" ，,、:：;；。.()（）")
    if seg and not _RE_LICENSE.search(seg) and len(seg) <= 80:
        credit = seg
    if not credit:
        # 「[阿道 / Wikimedia Commons](url) — CC BY-SA 4.0」：作者寫在連結文字裡
        for label, _url in links:
            m = _RE_SLASH_CREDIT.search(label)
            if m:
                credit = m.group(1).strip()
                break
    return {"source": source, "license": license_, "credit": credit}


def _caption_after(body: str, img_src: str) -> str | None:
    """圖片那行之後兩個非空行內的斜體圖說（_…_ 或 *…*）。"""
    i = body.find(img_src)
    if i < 0:
        return None
    rest = body[body.find("\n", i) + 1 :].split("\n")
    seen = 0
    for ln in rest:
        t = ln.strip()
        if not t:
            continue
        seen += 1
        core = re.sub(r"(\[\^[^\]]+\])+$", "", t)  # 圖說尾巴可能掛腳註
        if (core.startswith("_") and core.endswith("_")) or (core.startswith("*") and core.endswith("*")):
            return t
        if seen >= 2:
            return None
    return None


def _good_credit(c: str | None) -> str | None:
    if not c:
        return None
    c = re.sub(r"^(攝影者?|拍攝者|照片|圖片|作者)\s*", "", c.strip(" ，,、:：;；。.*_")).strip()
    if not c or len(c) > 60 or _RE_LICENSE.search(c) or "Wikimedia" in c or "授權" in c:
        return None
    if re.fullmatch(r"[-\d. ]+|-?SA[\s\d.]*", c):
        return None
    return c


def _license_of(text: str) -> str | None:
    m = _RE_LICENSE.search(text)
    if m:
        return _norm_license(m.group(1))
    m = _RE_LICENSE_LONG.search(text)
    if m:
        return f"CC BY{'-SA' if m.group(1) else ''} {m.group(2)}"
    return None


def _footnote_url(body: str, fid: str) -> str | None:
    m = re.search(rf"(?m)^\[\^{re.escape(fid)}\]:\s*(.*)$", body)
    if not m:
        return None
    for _label, url in _RE_LINK.findall(m.group(1)):
        if "commons.wikimedia.org/wiki/File" in url:
            return url
    return None


def _parse_caption(cap: str, body: str = "") -> dict[str, str | None]:
    plain = re.sub(r"\[\^[^\]]+\]", "", cap)
    plain = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", plain)
    plain = plain.strip("_*")
    src = None
    for _label, url in _RE_LINK.findall(cap):
        if "commons.wikimedia.org/wiki/File" in url:
            src = url
            break
    if src is None:
        m = _RE_BARE_COMMONS.search(cap)
        if m:
            src = m.group(0).rstrip("。，.,*_")
    if src is None:
        for fid in re.findall(r"\[\^([^\]]+)\]", cap):
            src = _footnote_url(body, fid)
            if src:
                break
    credit = None
    for pat in _CREDIT_PATTERNS:
        for m in pat.finditer(plain):
            credit = _good_credit(m.group(1))
            if credit:
                break
        if credit:
            break
    return {"source": src, "license": _license_of(plain), "credit": credit}


def _aspect(path: Path) -> float | None:
    try:
        from PIL import Image  # optional
    except Exception:
        return None
    if path.suffix.lower() == ".svg":
        return None
    try:
        with Image.open(path) as im:
            w, h = im.size
        return w / h if h else None
    except Exception:
        return None


def _q(v: str) -> str:
    return "'" + v.replace("'", "''") + "'"


def plan(path: Path) -> dict:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return {"status": "SKIP", "why": "沒有 frontmatter"}
    end = text.find("\n---", 3)
    fm, body = text[: end + 1], text[end + 1 :]
    if re.search(r"(?m)^image:\s*\S", fm) and not re.search(r"(?m)^image:\s*(''|\"\")\s*$", fm):
        return {"status": "NOOP", "why": "已有封面"}
    body_nf = _RE_FENCE.sub("", body)
    pick = None
    for alt, src in _RE_LOCAL_IMG.findall(body_nf):
        if (REPO / "public" / urllib.parse.unquote(src.lstrip("/"))).is_file():
            pick = (alt, src)
            break
    if pick is None:
        return {"status": "SKIP", "why": "正文沒有檔案在庫的本地圖"}
    alt, src = pick
    ratio = _aspect(REPO / "public" / urllib.parse.unquote(src.lstrip("/")))
    if ratio is not None and not (ASPECT_MIN <= ratio <= ASPECT_MAX):
        return {"status": "SKIP", "why": f"比例 {ratio:.2f} 超出 {ASPECT_MIN}–{ASPECT_MAX}，當卡片會裁掉主體", "image": src}
    cap = _caption_after(body, src)
    items = _sources_items(body)
    if cap:
        info = _parse_caption(cap, body)
        if info["license"] and info["credit"]:
            if not info["source"] and items:
                # 圖說沒附檔案頁 → 借圖片來源段裡對得上的那一條的網址
                slug = Path(src).stem
                sc, it = max(((_score(i, alt, slug), i) for i in items), key=lambda x: x[0])
                if sc >= 0.2:
                    info["source"] = _parse_item(it)["source"]
            return {"status": "OK", "image": src, "alt": alt, "score": "caption",
                    "item": cap[:200], "aspect": ratio and round(ratio, 2), **info}
    if not items:
        why = "圖說抄不到作者或允收授權，也沒有「## 圖片來源」段"
        return {"status": "SKIP", "why": why, "image": src, "item": (cap or "")[:160]}
    slug = Path(src).stem
    scored = sorted(((_score(it, alt, slug), it) for it in items), reverse=True)
    best_score, best = scored[0]
    if best_score < 0.2:
        return {"status": "SKIP", "why": f"圖片來源段找不到對得上的條目（最佳分 {best_score:.2f}）", "image": src}
    info = _parse_item(best)
    if not info["license"]:
        return {"status": "SKIP", "why": "對到的條目抄不到允收授權（CC BY／BY-SA／CC0／公有領域）",
                "image": src, "item": best[:160]}
    if not info["credit"]:
        return {"status": "SKIP", "why": "對到的條目抄不到作者", "image": src, "item": best[:160]}
    return {"status": "OK", "image": src, "alt": alt, "score": round(best_score, 2),
            "item": best[:200], "aspect": ratio and round(ratio, 2), **info}


def apply_plan(path: Path, p: dict) -> None:
    text = path.read_text(encoding="utf-8")
    end = text.find("\n---", 3)
    fm, body = text[: end + 1], text[end + 1 :]
    fm = re.sub(r"(?m)^image:\s*(''|\"\")\s*\n", "", fm)
    block = (
        f"image: {_q(p['image'])}\n"
        f"imageCredit: {_q(p['credit'])}\n"
        f"imageLicense: {_q(p['license'])}\n"
        + (f"imageSource: {_q(p['source'])}\n" if p.get("source") else "")
    )
    lines = fm.split("\n")
    anchor = None
    for i, ln in enumerate(lines):
        if ln.startswith(("lastHumanReview:", "researchReport:")):
            anchor = i
    if anchor is None:
        fm = fm.rstrip("\n") + "\n" + block
    else:
        lines.insert(anchor + 1, block.rstrip("\n"))
        fm = "\n".join(lines)
    path.write_text(fm + body, encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="正文第一張本地圖升格成封面（C1 級），預設 dry-run")
    ap.add_argument("paths", nargs="*")
    ap.add_argument("--files", help="名單檔（每行一個 repo 路徑，# 開頭略過）")
    ap.add_argument("--apply", action="store_true", help="實際寫入（缺省 dry-run）")
    ap.add_argument("--json", action="store_true")
    args = ap.parse_args()
    targets = list(args.paths)
    if args.files:
        targets += [ln.strip() for ln in Path(args.files).read_text(encoding="utf-8").splitlines()
                    if ln.strip() and not ln.strip().startswith("#")]
    if not targets:
        ap.error("no targets")
    results = []
    for t in targets:
        p = REPO / t if not Path(t).is_absolute() else Path(t)
        if not p.is_file():
            results.append({"path": t, "status": "SKIP", "why": "檔案不存在"})
            continue
        r = plan(p)
        r["path"] = t
        if r["status"] == "OK" and args.apply:
            apply_plan(p, r)
        results.append(r)
    if args.json:
        print(json.dumps(results, ensure_ascii=False, indent=1))
    else:
        for r in results:
            if r["status"] == "OK":
                print(f"✅ {r['path']}\n   image={r['image']}  ({r['score']})\n   "
                      f"credit={r['credit']} | license={r['license']} | source={r['source']}")
            else:
                print(f"⏭️  {r['status']} {r['path']} — {r['why']}")
    ok = sum(r["status"] == "OK" for r in results)
    mode = "APPLY" if args.apply else "DRY-RUN"
    out = sys.stderr if args.json else sys.stdout
    print(f"\n[{mode}] ok={ok} skip={sum(r['status'] == 'SKIP' for r in results)} "
          f"noop={sum(r['status'] == 'NOOP' for r in results)} total={len(results)}", file=out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
