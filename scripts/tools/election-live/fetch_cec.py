#!/usr/bin/env python3
"""fetch_cec.py - 抓中選會 2026 計票網站（vote.cec.gov.tw）的縣市長得票、投開票所進度、公投第 22 案。

純標準函式庫。用法：
    python3 fetch_cec.py --out /path/to/cec.json
    python3 fetch_cec.py --out cec.json --save-raw /tmp/cec-raw     # 同時存原始 HTML 供事後對欄位
    python3 fetch_cec.py --probe-prior --out /tmp/prior.json         # 開票前驗證路徑規則（抓候選人簡歷）

端點規則（逆向自 index_pc2.js + tree-compiled.2026-*.min.json，詳見
reports/research/2026-11/election-night-cec-endpoints.md）：
    {BASE}/{instance}/zh-TW/{prefix}/{c}{y}{d}{v}{b}.html
    地方 縣市長 候選人得票數  prefix=TC；候選人簡歷 prefix=CC；c=縣市碼 5 碼，y=00 d=000 v=000 b=0000
    公投第 22 案  prefix=F1；全國 c=00000，縣市 c=縣市碼
資料檔是 HTML 片段（不是 JSON），內含 <table class="tablesaw">。

每個端點獨立 try/except；失敗寫進輸出 JSON 的 "errors"，整支永不因單一端點失敗而 exit != 0。
對 vote.cec.gov.tw 請求間隔 >= 0.35 秒。
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from html.parser import HTMLParser

BASE = "https://vote.cec.gov.tw"
UA = "Mozilla/5.0 (compatible; taiwan-md-election-live/1.0)"
MIN_INTERVAL = 0.35
TZ = timezone(timedelta(hours=8))

# (縣市名, 縣市碼) —— 取自 tree-compiled.2026-local.min.json 的 _AREAROOT.next 各節點 serial.c
COUNTIES = [
    ("臺北市", "63000"), ("新北市", "65000"), ("桃園市", "68000"), ("臺中市", "66000"),
    ("臺南市", "67000"), ("高雄市", "64000"), ("新竹縣", "10004"), ("苗栗縣", "10005"),
    ("彰化縣", "10007"), ("南投縣", "10008"), ("雲林縣", "10009"), ("嘉義縣", "10010"),
    ("屏東縣", "10013"), ("宜蘭縣", "10002"), ("花蓮縣", "10015"), ("臺東縣", "10014"),
    ("澎湖縣", "10016"), ("金門縣", "09020"), ("連江縣", "09007"), ("基隆市", "10017"),
    ("新竹市", "10018"), ("嘉義市", "10020"),
]


def serial(c="00000", y="00", d="000", v="000", b="0000"):
    return f"{c}{y}{d}{v}{b}"


def local_url(prefix, c):
    return f"{BASE}/2026-local/zh-TW/{prefix}/{serial(c)}.html"


def ref_url(c="00000"):
    return f"{BASE}/2026-ref/zh-TW/F1/{serial(c)}.html"


_last = [0.0]


def http_get(url, timeout=15):
    wait = MIN_INTERVAL - (time.time() - _last[0])
    if wait > 0:
        time.sleep(wait)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Cache-Control": "no-cache"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode("utf-8", errors="replace")
    finally:
        _last[0] = time.time()


# ---------------------------------------------------------------- HTML 解析
class TableParser(HTMLParser):
    """把 <table> 解析成 {headers:[...], rows:[[...]]}；另收集 header/subtitle/footer 文字。"""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.tables = []
        self._t = None
        self._row = None
        self._cell = None
        self._in_thead = False
        self.title = ""
        self.subtitle = ""
        self.footer = ""
        self._div_stack = []
        self._cap = None  # which div class we are capturing

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "div":
            cls = a.get("class", "")
            self._div_stack.append(cls)
            if "vote-table-header-title" in cls:
                self._cap = "title"
            elif "vote-table-header-subtitle" in cls:
                self._cap = "subtitle"
            elif "vote-table-footer" in cls:
                self._cap = "footer"
        elif tag == "table":
            self._t = {"headers": [], "rows": []}
        elif tag == "thead":
            self._in_thead = True
        elif tag == "tbody":
            self._in_thead = False
        elif tag == "tr" and self._t is not None:
            self._row = []
        elif tag in ("th", "td") and self._t is not None:
            self._cell = []

    def handle_endtag(self, tag):
        if tag == "div":
            if self._div_stack:
                self._div_stack.pop()
            if self._cap == "title" or self._cap == "subtitle":
                self._cap = None
        elif tag in ("th", "td") and self._cell is not None:
            txt = re.sub(r"\s+", " ", "".join(self._cell)).strip()
            if self._row is not None:
                self._row.append(txt)
            self._cell = None
        elif tag == "tr" and self._row is not None and self._t is not None:
            if self._in_thead:
                self._t["headers"].extend(self._row)
            elif self._row:
                self._t["rows"].append(self._row)
            self._row = None
        elif tag == "table" and self._t is not None:
            self.tables.append(self._t)
            self._t = None

    def handle_data(self, data):
        if self._cell is not None:
            self._cell.append(data)
        elif self._cap == "title":
            self.title += data
        elif self._cap == "subtitle":
            self.subtitle += data
        elif self._cap == "footer":
            self.footer += data


def parse_html(html):
    p = TableParser()
    p.feed(html)
    p.title = re.sub(r"\s+", " ", p.title).strip()
    p.subtitle = re.sub(r"\s+", " ", p.subtitle).strip()
    p.footer = re.sub(r"\s+", " ", p.footer).strip()
    return p


def num(s, default=None):
    """'20,003,835' -> 20003835；'12.34%' -> 12.34；空/破折號 -> default。"""
    if s is None:
        return default
    t = str(s).replace(",", "").replace("%", "").replace("\xa0", " ").strip()
    m = re.search(r"-?\d+(?:\.\d+)?", t)
    if not m:
        return default
    v = float(m.group(0))
    return int(v) if v == int(v) and "." not in m.group(0) else v


def kv_pairs(parsed):
    """把所有「一列式」小表（表頭 + 單列）攤平成 {表頭: 值}（公投頁用）。"""
    out = {}
    for t in parsed.tables:
        if t["rows"] and len(t["rows"]) == 1:
            for h, v in zip(t["headers"], t["rows"][0]):
                out[h] = v
    return out


def find_progress(parsed, html):
    """盡力從頁面找「已完成/總投開票所數」。回傳 (reported, total, how)；找不到回 (None, None, None)。

    開票前無法驗證實際欄位；開票後第一件事：存 raw HTML 對欄位，再修這裡。
    """
    # 1) 任何 key/value 表頭含「票所」且不含「人數/率」
    kv = kv_pairs(parsed)
    rep = tot = None
    for h, v in kv.items():
        if "票所" in h and "人數" not in h and "率" not in h:
            if re.search(r"已|完成|送", h) and not re.search(r"未", h):
                rep = num(v)
            elif re.search(r"應|總|全|合計", h):
                tot = num(v)
            # 「12/345」單格寫法
            m = re.search(r"(\d[\d,]*)\s*/\s*(\d[\d,]*)", v or "")
            if m:
                rep, tot = num(m.group(1)), num(m.group(2))
    if rep is not None or tot is not None:
        return rep, tot, "table-header"
    # 2) 候選人表之外的文字（subtitle/footer/全文）正則
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text)
    m = re.search(r"投開票所[^0-9]{0,12}(\d[\d,]*)\s*/\s*(\d[\d,]*)", text) or \
        re.search(r"已(?:完成)?(?:開票|送)[^0-9]{0,12}(\d[\d,]*)[^0-9]{1,12}(?:應送|總計|共|應開)[^0-9]{0,6}(\d[\d,]*)", text)
    if m:
        return num(m.group(1)), num(m.group(2)), "regex"
    return None, None, None


ELECTED_MARKS = ("當選", "V", "v", "✓", "✔", "*", "●", "是", "Y")


def parse_mayor(html):
    p = parse_html(html)
    cand_tbl = None
    for t in p.tables:
        hs = "".join(t["headers"])
        if "姓名" in hs and ("得票" in hs or "票數" in hs):
            cand_tbl = t
            break
    if cand_tbl is None:
        raise ValueError("找不到含「姓名」與「得票」欄的候選人表（欄位可能改版，請存 raw 對欄位）；title=" + p.title)
    hs = cand_tbl["headers"]

    def col(*keys):
        for i, h in enumerate(hs):
            if any(k in h for k in keys):
                return i
        return None

    i_no, i_name = col("號次", "號"), col("姓名")
    i_party = col("政黨")
    i_votes = col("得票數", "票數")
    i_pct = col("得票率", "率")
    i_elect = col("當選", "註記")
    cands = []
    for r in cand_tbl["rows"]:
        def g(i):
            return r[i] if i is not None and i < len(r) else ""
        name = g(i_name)
        if not name or name in ("合計", "總計"):
            continue
        mark = g(i_elect).strip()
        cands.append({
            "number": num(g(i_no)),
            "name": name,
            "party": g(i_party),
            "votes": num(g(i_votes), 0),
            "pct": num(g(i_pct), 0.0),
            "elected": bool(mark) and mark not in ("-", "－", "無", "否", "N", "0") and True,
        })
    rep, tot, how = find_progress(p, html)
    return {
        "reported": rep, "total": tot, "candidates": cands,
        "_progressSource": how, "_dataTime": re.sub(r"^.*?資料時間:?\s*", "", p.footer) if "資料時間" in p.footer else None,
        "_title": p.title,
    }


def parse_ref(html):
    p = parse_html(html)
    kv = kv_pairs(p)

    def pick(*keys):
        for h, v in kv.items():
            if any(k == h or k in h for k in keys):
                return num(v)
        return None

    rep, tot, how = find_progress(p, html)
    return {
        "agree": pick("同意票數"),
        "disagree": pick("不同意票數"),
        "valid": pick("有效票數"),
        "invalid": pick("無效票數"),
        "votes": pick("投票數"),
        "eligible": pick("投票權人總數"),
        "completedEligible": pick("已完成投票所投票權人數"),
        "completedTurnoutPct": next((num(v) for h, v in kv.items() if "已完成投票所投票率" in h), None),
        "reported": rep, "total": tot,
        "_progressSource": how,
        "_dataTime": re.sub(r"^.*?資料時間:?\s*", "", p.footer) if "資料時間" in p.footer else None,
        "_title": p.title,
    }


# ---------------------------------------------------------------- 主流程
def save_raw(d, name, html):
    if d:
        os.makedirs(d, exist_ok=True)
        with open(os.path.join(d, name), "w", encoding="utf-8") as f:
            f.write(html)


def run(args):
    out = {
        "fetchedAt": datetime.now(TZ).isoformat(timespec="seconds"),
        "source": "cec",
        "mayors": {},
        "referendum": {},
        "errors": [],
    }

    def err(url, e):
        out["errors"].append({"url": url, "error": f"{type(e).__name__}: {e}"})

    prefix = "CC" if args.probe_prior else "TC"
    for name, c in COUNTIES:
        url = local_url(prefix, c)
        try:
            st, html = http_get(url)
            save_raw(args.save_raw, f"{prefix}-{c}.html", html)
            if args.probe_prior:
                # 簡歷頁欄位：號次/姓名/性別/推薦之政黨，沒有得票
                p = parse_html(html)
                rows = p.tables[0]["rows"] if p.tables else []
                out["mayors"][name] = {"reported": None, "total": None, "candidates": [
                    {"number": num(r[0]), "name": r[1], "party": r[3] if len(r) > 3 else "",
                     "votes": 0, "pct": 0.0, "elected": False} for r in rows], "_title": p.title}
            else:
                out["mayors"][name] = parse_mayor(html)
        except urllib.error.HTTPError as e:
            err(url, e if e.code != 404 else RuntimeError("HTTP 404（開票前尚未產生，或 16:00 後規則有變）"))
        except Exception as e:  # noqa: BLE001 - 每個端點獨立
            err(url, e)

    # 公投第 22 案：全國 + （不另抓各縣市，省請求；要的話加 --ref-counties）
    targets = [("全國", "00000")]
    if args.ref_counties:
        targets += COUNTIES
    refs = {}
    for name, c in targets:
        url = ref_url(c)
        try:
            st, html = http_get(url)
            save_raw(args.save_raw, f"F1-{c}.html", html)
            refs[name] = parse_ref(html)
        except Exception as e:  # noqa: BLE001
            err(url, e)
    if "全國" in refs:
        r = refs["全國"]
        out["referendum"] = {k: r.get(k) for k in
                             ("agree", "disagree", "valid", "invalid", "eligible", "reported", "total")}
        out["referendum"].update({k: r.get(k) for k in
                                  ("votes", "completedEligible", "completedTurnoutPct", "_progressSource", "_dataTime")})
        if args.ref_counties:
            out["referendum"]["counties"] = {k: v for k, v in refs.items() if k != "全國"}

    # 全國投開票所進度（縣市長）：各縣市加總（僅當每縣市都拿得到）
    reps = [m.get("reported") for m in out["mayors"].values()]
    tots = [m.get("total") for m in out["mayors"].values()]
    if len(out["mayors"]) == len(COUNTIES) and all(x is not None for x in reps + tots):
        out["mayorsProgress"] = {"reported": sum(reps), "total": sum(tots)}

    # 開票前常見：全部 404。給一行易讀原因。
    if not out["mayors"] and out["errors"]:
        out["note"] = "縣市長端點全數失敗（開票前 TC 檔尚未產生屬正常；16:00 後仍失敗就檢查 URL 規則/欄位）"
    return out


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--out", required=True, help="輸出 JSON 路徑")
    ap.add_argument("--save-raw", metavar="DIR", help="另存每個端點的原始 HTML")
    ap.add_argument("--probe-prior", action="store_true",
                    help="開票前驗證：改抓候選人簡歷（CC/）取代得票（TC/）")
    ap.add_argument("--ref-counties", action="store_true", help="公投另抓 22 縣市（多 22 個請求）")
    args = ap.parse_args(argv)
    try:
        data = run(args)
    except Exception as e:  # noqa: BLE001 - 最後防線
        data = {"fetchedAt": datetime.now(TZ).isoformat(timespec="seconds"), "source": "cec",
                "mayors": {}, "referendum": {}, "errors": [{"url": None, "error": f"fatal {type(e).__name__}: {e}"}]}
    tmp = args.out + ".tmp"
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    os.replace(tmp, args.out)
    n_ok = len(data.get("mayors", {}))
    print(f"mayors ok={n_ok}/22 referendum={'ok' if data.get('referendum') else 'none'} "
          f"errors={len(data.get('errors', []))} -> {args.out}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
