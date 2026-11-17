#!/usr/bin/env python3
"""verify-health-quotes.py — 對 /health 專題「各方立場」的引句做來源對賬。

src/data/health/stances.json 裡 kind 為 quote／phrase 的每一句，都要能在它掛的網址頁面原文裡
逐字找到（忽略空白與全半形括號差異）。paraphrase（報導轉述）不比對文字，只確認網址打得開。
找不到就印出來並以非零結束，讓人回頭看是引錯、頁面改了，還是抓不到（403 會標成 UNREACHABLE，
不算通過也不算引錯）。

用法：python3 scripts/tools/verify-health-quotes.py [--json]
"""
import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "src/data/health/stances.json"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"


def fetch(url: str) -> tuple[int, str]:
    p = subprocess.run(
        ["curl", "-sL", "--max-time", "30", "-A", UA, "-w", "\n%{http_code}", url],
        capture_output=True,
    )
    raw = p.stdout.decode("utf-8", "replace")
    body, _, code = raw.rpartition("\n")
    return (int(code) if code.isdigit() else 0), body


def norm(s: str) -> str:
    s = html.unescape(s)
    s = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)
    s = re.sub(r"<[^>]+>", "", s)
    s = s.replace("（", "(").replace("）", ")").replace("％", "%")
    return re.sub(r"\s+", "", s)


def main() -> int:
    data = json.loads(DATA.read_text())
    cache: dict[str, tuple[int, str]] = {}
    rows = []
    for issue in data["issues"]:
        for g in issue["groups"]:
            for it in g["items"]:
                url = it["url"]
                if url not in cache:
                    cache[url] = fetch(url)
                code, body = cache[url]
                if code != 200 or len(body) < 500:
                    status = "UNREACHABLE"
                elif it["kind"] == "paraphrase":
                    status = "OK(轉述，不比對文字)"
                else:
                    status = "OK" if norm(it["text"]) in norm(body) else "NOT_FOUND"
                rows.append((status, issue["id"], it["who"], it["kind"], code, url, it["text"][:28]))
    bad = [r for r in rows if r[0] in ("NOT_FOUND",)]
    unreach = [r for r in rows if r[0] == "UNREACHABLE"]
    if "--json" in sys.argv:
        print(json.dumps([dict(zip(["status", "issue", "who", "kind", "http", "url", "text"], r)) for r in rows], ensure_ascii=False, indent=1))
    else:
        for r in rows:
            print(f"{r[0]:<22} {r[1]:<10} {r[2]}｜{r[6]}… [{r[4]}] {r[5]}")
        print(f"\n共 {len(rows)} 則：逐字命中 {sum(r[0]=='OK' for r in rows)}、轉述 {sum(r[0].startswith('OK(') for r in rows)}、找不到 {len(bad)}、打不開 {len(unreach)}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
