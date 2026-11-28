#!/usr/bin/env python3
"""fetch_council.py - 抓中選會 2026 計票網站「直轄市議員／縣市議員」各選舉區候選人得票，輸出單一 JSON。

純標準函式庫。用法：
    python3 fetch_council.py --out /path/to/council.json
    python3 fetch_council.py --out council.json --refresh-districts   # 重新從導覽樹算選舉區清單

端點規則（逆向自 index_pc2.js 的 computeLink + tree-compiled.2026-local.min.json）：
    https://vote.cec.gov.tw/2026-local/zh-TW/{prefix}/{c}{y}{d}{v}{b}.html
    議員 候選人得票數（qbd0|c000）：一般選舉區 prefix=T1、平地原住民 T2、山地原住民 T3
    c = 縣市碼 5 碼；y = 選舉區序號 2 碼；d=000 v=000 b=0000（共 17 碼）
    選舉區清單 = 導覽樹 _AREAROOT 各縣市節點在 qbd0 底下 override 的 next（Y 節點）：
      [3, 序號, "yy", [行政區…]]            一般選舉區
      [4, 序號, "yy", "rbd0"|"sbd0", [...]]  rbd0=平地原住民(T2)、sbd0=山地原住民(T3)
    平地／山地原住民選舉區為全縣市單一選舉區，頁首「已送／總投票所數」是全縣市票所數。
資料檔是 HTML 片段，內含 <table class="tablesaw">。

單一選舉區失敗寫進 errors，不會讓整支掛掉；全部選舉區都失敗才 exit 2。
對 vote.cec.gov.tw：6 條執行緒、每條請求間隔 >= 0.25 秒、timeout 12 秒、失敗重試一次。
"""
import argparse
import json
import os
import re
import sys
import threading
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser

BASE = "https://vote.cec.gov.tw"
SOURCE_URL = BASE + "/2026-local/zh-TW/indexP.html"
TREE_URL = BASE + "/2026-local/assets/def/tree-compiled.2026-local.min.json"
UA = "Mozilla/5.0"
WORKERS = 6
MIN_INTERVAL = 0.25
TIMEOUT = 12
TZ = timezone(timedelta(hours=8))
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, "council_districts.json")
EXPECTED_SEATS = 919
INDIGENOUS = {"rbd0": ("T2", "平地原住民"), "sbd0": ("T3", "山地原住民")}

# 縣市排序（輸出 key 順序）；名稱以導覽樹為準，這裡用「臺」
COUNTY_ORDER = ["臺北市", "新北市", "桃園市", "臺中市", "臺南市", "高雄市", "新竹縣", "苗栗縣",
                "彰化縣", "南投縣", "雲林縣", "嘉義縣", "屏東縣", "宜蘭縣", "花蓮縣", "臺東縣",
                "澎湖縣", "金門縣", "連江縣", "基隆市", "新竹市", "嘉義市"]

# 預期表頭；其餘出現的欄名會被記進 errors（除了已知可忽略的）
KNOWN_HEADERS = ("號次", "姓名", "性別", "得票數", "得票率", "政黨")
MARKS = "◎＊*●○★☆▲△※✓✔√"


def http_get(url, timeout=TIMEOUT):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Cache-Control": "no-cache"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read().decode("utf-8", errors="replace")


# ---------------------------------------------------------------- 選舉區清單
def build_districts():
    tree = json.loads(http_get(TREE_URL, timeout=30))
    out = []
    for cid in tree["_AREAROOT"]["next"]:
        node = tree[cid]
        county = node["zh"]
        c = node["serial"]["c"]
        ov = [o for o in node.get("overrides", [])
              if o.get("conditions", {}).get("ancestors") == ["qbd0"]]
        ys = ov[0]["mutations"]["next"]
        for yid in ys:
            y = tree[yid]
            if y[0] == 3:
                prefix, kind, ycode = "T1", "regular", y[2]
                name = "第%d選舉區" % int(ycode)
            elif y[0] == 4:
                prefix, label = INDIGENOUS[y[3]]
                kind, ycode = "indigenous", y[2]
                name = "第%d選舉區(%s)" % (int(ycode), label)
            else:
                raise ValueError("未知 Y 節點型態 %r (%s)" % (y[0], yid))
            out.append({"county": county, "c": c, "y": ycode, "prefix": prefix, "kind": kind,
                        "code": "%s%s0000000000" % (c, ycode), "name": name})
    return out


def load_districts(refresh=False):
    if not refresh and os.path.exists(CACHE):
        try:
            with open(CACHE, encoding="utf-8") as f:
                d = json.load(f)
            if isinstance(d, list) and d and all("code" in x and "prefix" in x for x in d):
                return d
        except Exception:
            pass
    d = build_districts()
    tmp = CACHE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=0)
    os.replace(tmp, CACHE)
    return d


# ---------------------------------------------------------------- HTML 解析
class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.subtitle = ""
        self.headers = []
        self.rows = []
        self.footer = ""
        self._cap = None
        self._row = None
        self._cell = None
        self._in_thead = False
        self._seen_table = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        cls = a.get("class", "") or ""
        if tag == "div":
            if "vote-table-header-title" in cls:
                self._cap = "title"
            elif "vote-table-header-subtitle" in cls:
                self._cap = "subtitle"
            elif "vote-table-footer" in cls:
                self._cap = "footer"
        elif tag == "table":
            self._seen_table = True
        elif tag == "thead":
            self._in_thead = True
        elif tag == "tbody":
            self._in_thead = False
        elif tag == "tr" and self._seen_table:
            self._row = []
        elif tag in ("th", "td") and self._row is not None:
            self._cell = []
        elif tag == "img" and self._cell is not None:
            alt = (a.get("alt") or "").strip()
            if alt:
                self._cell.append(alt)

    def handle_endtag(self, tag):
        if tag in ("th", "td") and self._cell is not None:
            txt = re.sub(r"\s+", " ", "".join(self._cell).replace("\xa0", " ")).strip()
            if self._row is not None:
                self._row.append(txt)
            self._cell = None
        elif tag == "tr" and self._row is not None:
            if self._in_thead:
                self.headers.extend(self._row)
            elif self._row:
                self.rows.append(self._row)
            self._row = None
        elif tag == "table":
            self._seen_table = False

    def handle_data(self, data):
        if self._cell is not None:
            self._cell.append(data)
        elif self._cap == "title":
            self.title += data
        elif self._cap == "subtitle":
            self.subtitle += data
        elif self._cap == "footer":
            self.footer += data


def num(s):
    if s is None:
        return None
    m = re.search(r"-?\d[\d,]*(?:\.\d+)?", str(s))
    if not m:
        return None
    t = m.group(0).replace(",", "")
    return float(t) if "." in t else int(t)


def norm_party(p):
    p = (p or "").strip()
    if not p or p.startswith("無黨籍"):
        return "無黨籍"
    return p


def parse_page(html, district):
    """回傳 (district_dict, header_warnings)。解析不出候選人表就 raise ValueError。"""
    p = PageParser()
    p.feed(html)
    flat = re.sub(r"\s+", " ", p.subtitle)
    if not p.headers or not p.rows:
        raise ValueError("找不到候選人表（表頭 %r，列數 %d）" % (p.headers, len(p.rows)))
    h = p.headers
    idx = {}
    for i, name in enumerate(h):
        for key, token in (("number", "號次"), ("name", "姓名"), ("votes", "得票數"),
                           ("pct", "得票率"), ("party", "政黨")):
            if token in name and key not in idx:
                idx[key] = i
                break
        else:
            if "當選" in name or "註記" in name:
                idx.setdefault("elected", i)
    missing = [k for k in ("number", "name", "votes", "party") if k not in idx]
    if missing:
        raise ValueError("表頭缺欄位 %s：%r" % (missing, h))
    warns = []
    extra = [n for n in h if not any(k in n for k in KNOWN_HEADERS) and "當選" not in n and "註記" not in n]
    if extra:
        warns.append("表頭出現未知欄位 %r（完整表頭 %r）" % (extra, h))
    if "elected" in idx:
        warns.append("表頭含當選註記欄：%r" % h[idx["elected"]])

    m = re.search(r"應選人數\s*[:：]\s*(\d+)", flat)
    seats = int(m.group(1)) if m else None
    m = re.search(r"已送投票所數\s*/\s*總投票所數\s*[:：]\s*(\d[\d,]*)\s*/\s*(\d[\d,]*)", flat)
    reported = num(m.group(1)) if m else None
    total = num(m.group(2)) if m else None
    if seats is None:
        raise ValueError("讀不到應選人數（subtitle=%r）" % flat[:120])
    m = re.search(r"資料更新時間\s*[:：]\s*(\d+/\d+ \d+:\d+)", re.sub(r"\s+", " ", p.footer))
    updated = m.group(1) if m else None

    cands = []
    for r in p.rows:
        if len(r) <= max(idx.values()):
            continue
        name = r[idx["name"]]
        mark = any(ch in name for ch in MARKS)
        name = re.sub("[" + re.escape(MARKS) + r"]", "", name)
        name = re.sub(r"\s+", "", name)
        elected = mark
        if "elected" in idx:
            ev = r[idx["elected"]].strip()
            if ev and ev not in ("-", "－", "—", "無", "否"):
                elected = True
        votes = num(r[idx["votes"]])
        cands.append({
            "number": num(r[idx["number"]]),
            "name": name,
            "party": norm_party(r[idx["party"]]),
            "votes": int(votes) if votes is not None else 0,
            "pct": num(r[idx["pct"]]) if "pct" in idx else None,
            "elected": elected,
        })
    if not cands:
        raise ValueError("候選人列為空")
    ranked = sorted(cands, key=lambda x: (-x["votes"], x["number"] if x["number"] is not None else 0))
    for i, cd in enumerate(ranked):
        cd["inTop"] = bool(i < seats and cd["votes"] > 0)
    title_name = None
    mt = re.search(r"(第\d+選舉區(?:\([^)]*\))?)", re.sub(r"\s+", "", p.title))
    if mt:
        title_name = mt.group(1)
    d = {
        "code": district["code"],
        "name": title_name or district["name"],
        "seats": seats,
        "reported": reported,
        "total": total,
        "candidates": ranked,
    }
    return d, warns, updated


# ---------------------------------------------------------------- 平行抓取
class Throttle:
    """每條執行緒各自維持 >= MIN_INTERVAL 的請求間隔。"""

    def __init__(self):
        self.local = threading.local()

    def wait(self):
        last = getattr(self.local, "last", 0.0)
        gap = MIN_INTERVAL - (time.time() - last)
        if gap > 0:
            time.sleep(gap)

    def mark(self):
        self.local.last = time.time()


THROTTLE = Throttle()


def fetch_district(dist):
    url = "%s/2026-local/zh-TW/%s/%s.html" % (BASE, dist["prefix"], dist["code"])
    last_err = None
    for attempt in (1, 2):
        THROTTLE.wait()
        try:
            html = http_get(url)
            THROTTLE.mark()
            d, warns, updated = parse_page(html, dist)
            return dist, d, warns, None
        except Exception as e:  # noqa: BLE001 - 單一選舉區失敗不可拖垮整支
            THROTTLE.mark()
            last_err = "%s: %s" % (type(e).__name__, e)
    return dist, None, [], "%s %s %s（已重試一次）：%s" % (dist["county"], dist["name"], url, last_err)


def aggregate(districts, results):
    counties = {}
    for name in COUNTY_ORDER:
        counties[name] = None
    by_county = {}
    for dist, d, _w, _e in results:
        by_county.setdefault(dist["county"], []).append((dist, d))
    order = [c for c in COUNTY_ORDER if c in by_county] + [c for c in by_county if c not in COUNTY_ORDER]
    out = {}
    for county in order:
        items = by_county[county]
        got = [(dist, d) for dist, d in items if d]
        seats = sum(d["seats"] for _, d in got)
        # 平地／山地原住民選舉區是全縣市單一選舉區，其票所數與一般選舉區加總重疊，不計入縣市加總
        reg = [(dist, d) for dist, d in items if dist["kind"] == "regular"]
        if reg and all(d for _, d in reg) and all(d["reported"] is not None and d["total"] is not None for _, d in reg):
            reported = sum(d["reported"] for _, d in reg)
            total = sum(d["total"] for _, d in reg)
        else:
            reported = total = None
        leading, elected = {}, {}
        for _, d in got:
            for cd in d["candidates"]:
                if cd["inTop"]:
                    leading[cd["party"]] = leading.get(cd["party"], 0) + 1
                if cd["elected"]:
                    elected[cd["party"]] = elected.get(cd["party"], 0) + 1
        out[county] = {
            "seats": seats,
            "reported": reported,
            "total": total,
            "leading": dict(sorted(leading.items(), key=lambda kv: -kv[1])),
            "elected": dict(sorted(elected.items(), key=lambda kv: -kv[1])),
            "districts": [d for _, d in got],
        }
    return out


def main():
    ap = argparse.ArgumentParser(description="抓中選會 2026 議員各選舉區即時開票結果")
    ap.add_argument("--out", required=True)
    ap.add_argument("--refresh-districts", action="store_true", help="重新從導覽樹計算選舉區清單")
    args = ap.parse_args()

    errors = []
    try:
        districts = load_districts(args.refresh_districts)
    except Exception as e:  # noqa: BLE001
        print("無法取得選舉區清單：%s" % e, file=sys.stderr)
        return 2

    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        results = list(ex.map(fetch_district, districts))

    seen_warns = set()
    for dist, d, warns, err in results:
        if err:
            errors.append(err)
        for w in warns:
            if w not in seen_warns:
                seen_warns.add(w)
                errors.append("表頭：" + w)
    ok = [r for r in results if r[1]]
    counties = aggregate(districts, results)
    total_seats = sum(c["seats"] for c in counties.values())
    if ok and len(ok) == len(districts) and total_seats != EXPECTED_SEATS:
        errors.append("應選人數加總 %d 不等於預期 %d" % (total_seats, EXPECTED_SEATS))

    doc = {
        "schema": 1,
        "fetchedAt": datetime.now(TZ).replace(microsecond=0).isoformat(),
        "sourceName": "中央選舉委員會計票資訊查詢網站",
        "sourceUrl": SOURCE_URL,
        "totalSeats": EXPECTED_SEATS,
        "counties": counties,
        "errors": errors,
    }
    out_dir = os.path.dirname(os.path.abspath(args.out))
    os.makedirs(out_dir, exist_ok=True)
    tmp = args.out + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, separators=(",", ":"))
    os.replace(tmp, args.out)
    print("選舉區 %d/%d 成功；應選 %d；errors %d；輸出 %s" % (len(ok), len(districts), total_seats, len(errors), args.out),
          file=sys.stderr)
    return 0 if ok else 2


if __name__ == "__main__":
    sys.exit(main())
