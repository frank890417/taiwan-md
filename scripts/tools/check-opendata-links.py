#!/usr/bin/env python3
"""
check-opendata-links.py — 檢查 /opendata 頁面所有對外連結與站內文章連結。

來源：src/data/opendata-content.ts（策展連結）+ src/templates/opendata.template.astro
（hub / data.gov.tw / d3 CDN）。

檢查三件事：
  1. 對外 URL：HTTP 狀態與最終網址（redirect 追蹤）。
  2. data.gov.tw/dataset/N：SPA 頁永遠回 200，所以另外打官方 front API
     (/api/front/dataset/detail?nid=N) 確認資料集仍上架，並抓標題與更新日期。
  3. 站內文章 href（/{category}/{slug}）：確認 knowledge/{Category}/{slug}.md 存在；
     單段路徑（/economy）視為分類 hub，確認 knowledge 有對應目錄。

輸出：reports/research/2026-10/opendata-link-check-<YYYY-MM-DD>.json

Usage:
    python3 scripts/tools/check-opendata-links.py [--out PATH]
"""

import argparse
import datetime
import json
import pathlib
import re
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[2]
CONTENT = ROOT / "src" / "data" / "opendata-content.ts"
TEMPLATE = ROOT / "src" / "templates" / "opendata.template.astro"
KNOWLEDGE = ROOT / "knowledge"
UA = "Mozilla/5.0 (compatible; taiwan-md-link-check/1.0; +https://taiwan.md)"


def http_check(url, timeout=25):
    """用 curl（系統信任鏈）；Python 3.13 對部分政府站憑證缺 Subject Key Identifier 會誤判失敗。"""
    try:
        r = subprocess.run(
            ["curl", "-sIL", "-m", str(timeout), "-A", UA, "-o", "/dev/null",
             "-w", "%{http_code}\t%{url_effective}", url],
            capture_output=True, text=True, timeout=timeout + 10,
        )
        code, _, final = r.stdout.partition("\t")
        rec = {"status": int(code) if code.isdigit() and int(code) > 0 else None, "final_url": final or url}
        if rec["status"] is None:
            rec["error"] = (r.stderr or "no response").strip()
        return rec
    except Exception as e:  # noqa: BLE001
        return {"status": None, "final_url": url, "error": repr(e)}


def dataset_api(nid):
    url = f"https://data.gov.tw/api/front/dataset/detail?nid={nid}"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            d = json.loads(r.read().decode())
    except Exception as e:  # noqa: BLE001
        return {"live": None, "error": repr(e)}
    if d.get("code") != 200:
        return {"live": False, "message": d.get("message")}
    p = d["payload"]
    return {
        "live": p.get("dataset_status_name") == "已上架",
        "title": p.get("title"),
        "status": p.get("dataset_status_name"),
        "agency": p.get("agency_name"),
        "changed": (p.get("changed") or {}).get("date"),
    }


def find_knowledge(href):
    """href like /society/國宅與居住正義 → knowledge path or None."""
    parts = [urllib.parse.unquote(p) for p in href.strip("/").split("/") if p]
    if not parts:
        return None
    cats = {p.name.lower(): p for p in KNOWLEDGE.iterdir() if p.is_dir()}
    cat = cats.get(parts[0].lower())
    if cat is None:
        return None
    if len(parts) == 1:
        return str(cat.relative_to(ROOT))
    f = cat / (parts[1] + ".md")
    return str(f.relative_to(ROOT)) if f.exists() else None


def main():
    ap = argparse.ArgumentParser()
    today = datetime.date.today().isoformat()
    ap.add_argument(
        "--out",
        default=str(ROOT / "reports" / "research" / "2026-10" / f"opendata-link-check-{today}.json"),
    )
    args = ap.parse_args()

    src = CONTENT.read_text() + "\n" + TEMPLATE.read_text()
    urls = sorted(set(re.findall(r"https?://[^'\"\s)<>]+", src)))
    urls = [u for u in urls if "w3.org" not in u]
    hrefs = sorted(set(re.findall(r"href:\s*'(/[^']*)'", CONTENT.read_text())))

    external = []
    for u in urls:
        rec = {"url": u}
        rec.update(http_check(u))
        if rec.get("status") is None:  # 政府站偶發連線逾時，重試一次
            time.sleep(2)
            rec.update(http_check(u))
        m = re.match(r"https://data\.gov\.tw/dataset/(\d+)$", u)
        if m:
            rec["api"] = dataset_api(m.group(1))
            time.sleep(0.3)
        rec["ok"] = bool(rec.get("status") and rec["status"] < 400) and rec.get("api", {}).get("live", True) is not False
        external.append(rec)

    internal = []
    for h in hrefs:
        p = find_knowledge(h)
        internal.append({"href": h, "knowledge": p, "ok": p is not None})

    out = {
        "checked_at": datetime.datetime.now().astimezone().isoformat(timespec="seconds"),
        "external_total": len(external),
        "external_bad": [e for e in external if not e["ok"]],
        "internal_total": len(internal),
        "internal_bad": [i for i in internal if not i["ok"]],
        "external": external,
        "internal": internal,
    }
    pathlib.Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    pathlib.Path(args.out).write_text(json.dumps(out, ensure_ascii=False, indent=2))
    print(f"external {len(external)} (bad {len(out['external_bad'])}), internal {len(internal)} (bad {len(out['internal_bad'])}) → {args.out}")
    for b in out["external_bad"]:
        print("  EXT BAD", b["url"], b.get("status"), b.get("api"))
    for b in out["internal_bad"]:
        print("  INT BAD", b["href"])


if __name__ == "__main__":
    main()
