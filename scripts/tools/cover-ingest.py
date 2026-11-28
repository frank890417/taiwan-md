#!/usr/bin/env python3
"""cover-ingest.py — 照清單把 Wikimedia Commons 的圖收進庫、設成文章封面（frontmatter image 四欄）。

cover-promote.py 處理「正文已經有本地圖」的文章（普查 C1）；這支處理「圖還在 Commons」的
（C2 正文熱連結、C3 從頭找圖）。清單由人挑（哪一張能代表這篇是判斷），本工具只做可以機械
做的事：落地前對 Commons API 再核一次授權與作者、檢查比例與尺寸、呼叫 image-ingest.mjs
下載轉檔、用 cover-promote 的同一支函式寫 frontmatter、印出 PR 用的出處表。

健檢與優先順序：reports/cover-image-health-2026-11-19.md

用法：
  python3 scripts/tools/cover-ingest.py --manifest reports/cover-image-health/batch-01.json           # dry-run
  python3 scripts/tools/cover-ingest.py --manifest reports/cover-image-health/batch-01.json --apply
  python3 scripts/tools/cover-ingest.py --manifest … --apply --only knowledge/Food/擂茶.md

清單（JSON 陣列）每筆：
  {"article": "knowledge/Food/擂茶.md",      # 中文母稿路徑
   "file": "客家擂茶.jpg",                    # Commons 檔名（不含 File:）
   "name": "hakka-lei-cha-zhongli",           # 存檔用的英文檔名（不含副檔名）
   "credit": "氏子",                          # 選填：覆寫作者寫法（API 回的作者欄常帶雜訊）
   "note": "…"}                               # 選填：為什麼挑這張，只給人看

規則（任何一條不過就跳過那一篇，不猜、不放寬）：
  - 文章已有 image → 不動
  - 授權以 Commons API extmetadata 的 LicenseShortName 為準，只收卡片圖允收清單：
    CC BY／CC BY-SA（各版本）、CC0、Public domain、OGDL-Taiwan-1.0（OBSERVER-QUEUE #42、#50）。
    只有 GFDL、Attribution 自訂模板、合理使用一律不收
  - 比例 0.75–2.5（同 cover-promote：超出當卡片會裁掉主體）、原圖寬度 ≥ 800
  - 作者欄空白且清單沒給 credit → 跳過
  - 每張之間停 --sleep 秒（預設 6）。Wikimedia 連續下載會回 429，本工具自己下載、退避最長四分鐘，
    下載好的本地檔才交給 image-ingest 轉檔

只改 frontmatter，不動正文：譯本因此只會落到 metadata-stale，用
`lang-sync/bump-source-sha.py --apply --zh-list <清單>` 把四欄抄過去，不必重翻。
"""

from __future__ import annotations

import argparse
import html
import importlib.util
import json
import re
import subprocess
import sys
import tempfile
import time
import urllib.parse
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
UA = "Taiwan.md cover-ingest/1.0 (https://taiwan.md)"
ASPECT_MIN, ASPECT_MAX, MIN_WIDTH = 0.75, 2.5, 800
_RE_OK_LICENSE = re.compile(
    r"^(CC BY(-SA)? \d\.\d( [a-z]{2})?|CC0( 1\.0)?|Public domain|OGDL-Taiwan-1\.0)$", re.IGNORECASE
)

_spec = importlib.util.spec_from_file_location("cover_promote", REPO / "scripts/tools/cover-promote.py")
_cp = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_cp)


def _strip(s: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s or ""))).strip()


def license_ok(short_name: str) -> bool:
    return bool(_RE_OK_LICENSE.match(short_name or ""))


def commons_info(files: list[str]) -> dict[str, dict]:
    """一次最多 40 個檔名查 Commons：授權、作者、尺寸、檔案頁。查不到的檔名不會出現在回傳裡。"""
    out: dict[str, dict] = {}
    for i in range(0, len(files), 40):
        chunk = files[i : i + 40]
        q = urllib.parse.urlencode({
            "action": "query", "format": "json", "prop": "imageinfo", "redirects": "1",
            "iiprop": "extmetadata|size|mime|url",
            "iiextmetadatafilter": "LicenseShortName|Artist|Credit",
            "titles": "|".join("File:" + f for f in chunk),
        })
        req = urllib.request.Request("https://commons.wikimedia.org/w/api.php?" + q, headers={"User-Agent": UA})
        data = None
        for attempt in range(5):
            try:
                with urllib.request.urlopen(req, timeout=40) as fh:
                    data = json.load(fh)
                break
            except Exception as e:  # noqa: BLE001 — 429／逾時都退避重試
                print(f"  ⏳ Commons API 重試 {attempt + 1}：{e}", file=sys.stderr)
                time.sleep(15 * (attempt + 1))
        if data is None:
            continue
        query = data.get("query", {})
        fwd = {m["from"]: m["to"] for k in ("normalized", "redirects") for m in query.get(k, [])}
        pages = {p["title"]: p for p in query.get("pages", {}).values()}
        for f in chunk:
            title = "File:" + f
            for _ in range(3):
                title = fwd.get(title, title)
            p = pages.get(title)
            if not p or "imageinfo" not in p:
                continue
            ii = p["imageinfo"][0]
            em = ii.get("extmetadata", {})
            out[f] = {
                "license": _strip((em.get("LicenseShortName") or {}).get("value", "")),
                "artist": _strip((em.get("Artist") or {}).get("value", "")),
                "w": ii.get("width") or 0, "h": ii.get("height") or 0,
                "mime": ii.get("mime"), "page": ii.get("descriptionurl"), "url": ii.get("url"),
            }
        time.sleep(1.5)
    return out


# Wikimedia 對原檔與 Special:FilePath 的程式下載回 429，只放行標準寬度的縮圖
# （2026-11-19 實測：原檔 429、2400px 回 400、960／1280／1920／3840px 回 200）。
# 所以一律抓「不超過原圖寬度的最大標準寬度」；封面 1920 已經夠，image-ingest 的 hero 上限是 2400。
STANDARD_THUMB_WIDTHS = (1920, 1280, 960)
_RE_UPLOAD = re.compile(r"^(https://upload\.wikimedia\.org/wikipedia/[a-z]+)/([0-9a-f]/[0-9a-f]{2})/([^/]+)$")


def download_url(original_url: str, width: int) -> str:
    """原檔網址 → 標準寬度縮圖網址；原圖比最小標準寬度還窄時只能回原檔（可能被限流）。"""
    original_url = (original_url or "").split("?")[0]  # API 回的網址帶 utm 參數
    m = _RE_UPLOAD.match(original_url)
    if not m:
        return original_url
    for w in STANDARD_THUMB_WIDTHS:
        if width >= w:
            return f"{m.group(1)}/thumb/{m.group(2)}/{m.group(3)}/{w}px-{m.group(3)}"
    return original_url


def fetch_image(url: str, dest: Path) -> str | None:
    """自己下載再把本地檔交給 image-ingest：429 時等久一點（30→60→120→240 秒）。
    image-ingest 內建的退避最長 48 秒、總共不到三分鐘，2026-11-19 實測不夠，連續兩張就卡死。
    回 None 表示成功，否則回錯誤字串。"""
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "image/*"})
    last = ""
    for wait in (30, 60, 120, 240, 0):
        try:
            with urllib.request.urlopen(req, timeout=60) as fh:
                dest.write_bytes(fh.read())
            return None
        except Exception as e:  # noqa: BLE001
            last = str(e)
            if "429" not in last and "50" not in last[:14]:
                return last
            if wait:
                print(f"     ⏳ {last}，等 {wait} 秒再試", flush=True)
                time.sleep(wait)
    return last


def has_cover(text: str) -> bool:
    fm = text[: text.find("\n---", 3)]
    return bool(re.search(r"(?m)^image:\s*['\"]?[^'\"\s]", fm))


def check(entry: dict, info: dict | None, repo: Path = REPO) -> tuple[str | None, dict]:
    """回 (跳過原因 or None, 要寫的欄位)。"""
    art = repo / entry["article"]
    if not art.is_file():
        return "找不到文章檔", {}
    if has_cover(art.read_text(encoding="utf-8")):
        return "已有封面", {}
    if not info:
        return "Commons 查無此檔（可能已下架或檔名不對）", {}
    if not license_ok(info["license"]):
        return f"授權不在允收清單：{info['license'] or '（空）'}", {}
    if info["mime"] not in ("image/jpeg", "image/png", "image/webp", "image/tiff"):
        return f"格式不收：{info['mime']}", {}
    ratio = info["w"] / info["h"] if info["h"] else 0
    if not (ASPECT_MIN <= ratio <= ASPECT_MAX):
        return f"比例 {ratio:.2f} 超出 {ASPECT_MIN}–{ASPECT_MAX}", {}
    if info["w"] < MIN_WIDTH:
        return f"原圖寬 {info['w']} 不到 {MIN_WIDTH}", {}
    author = entry.get("credit") or info["artist"]
    if not author:
        return "作者欄空白，清單也沒給 credit", {}
    cat = entry["article"].split("/")[1]
    return None, {
        "image": f"/article-images/{cat.lower()}/{entry['name']}.webp",
        "credit": f"{author} / Wikimedia Commons",
        "license": "CC0 1.0" if info["license"].upper() == "CC0" else info["license"],
        "source": info["page"],
        "download": download_url(info.get("url") or "", info["w"]),
        "cat": cat, "ratio": ratio, "w": info["w"], "h": info["h"],
    }


def main() -> int:
    ap = argparse.ArgumentParser(description="照清單把 Commons 的圖收進庫設成封面。預設 dry-run。")
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--only", nargs="*", default=[], help="只處理這幾篇（文章路徑）")
    ap.add_argument("--sleep", type=float, default=6.0, help="每張下載之間停幾秒")
    ap.add_argument("--table-out", help="把出處表（Markdown）寫到這個檔")
    args = ap.parse_args()

    entries = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    if args.only:
        entries = [e for e in entries if e["article"] in set(args.only)]
    infos = commons_info([e["file"].replace("_", " ") for e in entries])
    done, skipped, rows = 0, 0, []
    for e in entries:
        why, p = check(e, infos.get(e["file"].replace("_", " ")))
        if why:
            skipped += 1
            print(f"⏭️  SKIP {e['article']} — {why}")
            continue
        dest = REPO / "public" / p["image"].lstrip("/")
        print(f"{'✅' if args.apply else '🔎'} {e['article']}\n     {p['image']}  {p['w']}×{p['h']}（{p['ratio']:.2f}）\n"
              f"     {p['credit']} · {p['license']} · {p['source']}")
        if args.apply:
            if not dest.is_file():
                tmp = Path(tempfile.gettempdir()) / f"cover-ingest-{e['name']}{Path(p['download']).suffix.lower() or '.jpg'}"
                err = fetch_image(p["download"], tmp)
                if err:
                    skipped += 1
                    print(f"     ✗ 下載失敗：{err}", flush=True)
                    continue
                r = subprocess.run(
                    ["node", "scripts/tools/image-ingest.mjs", "ingest", "--src", str(tmp), "--cat", p["cat"],
                     "--name", e["name"], "--role", "hero", "--credit", p["credit"], "--license", p["license"],
                     "--source-url", p["source"]],
                    cwd=REPO, capture_output=True, text=True,
                )
                tmp.unlink(missing_ok=True)
                if r.returncode != 0 or not dest.is_file():
                    skipped += 1
                    print(f"     ✗ image-ingest 失敗：{(r.stderr or r.stdout).strip()[-300:]}")
                    continue
                time.sleep(args.sleep)
            _cp.apply_plan(REPO / e["article"], p)
        done += 1
        rows.append(f"| {e['article'][len('knowledge/'):-3]} | `{p['image']}` | {p['source']} | {p['license']} | "
                    f"{p['credit'].replace(' / Wikimedia Commons', '')} |")
    print(f"\n[{'APPLY' if args.apply else 'DRY-RUN'}] ok={done} skip={skipped} total={len(entries)}")
    if args.table_out and rows:
        head = "| 文章 | 圖 | 來源網址 | 授權 | 作者 |\n| --- | --- | --- | --- | --- |\n"
        Path(args.table_out).write_text(head + "\n".join(rows) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
