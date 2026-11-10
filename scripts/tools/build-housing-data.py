#!/usr/bin/env python3
"""build-housing-data.py — /housing/ 房地產專題：研究檔 markdown → src/data/housing/*.json

用法：
  python3 scripts/tools/build-housing-data.py          # 重算並寫檔
  python3 scripts/tools/build-housing-data.py --check  # 重算後與現有檔比對，不一致 exit 1

原則（這些數字會影響讀者的金錢決定）：
  - 只搬運研究檔 markdown 裡有官方來源網址的數字；不估、不內插、不補。
  - 腳本裡不放任何數值，只放「哪一節的哪張表 → 哪個序列 id／標籤／單位／來源編號」的對應。
  - 研究檔標「本檔加總／本檔計算」的欄位一律 derived=true（腳本會自己檢查，漏標就報錯）。
  - 標「搜尋摘要／未在原頁核對／轉述」的儲存格一律不收（寧可缺）。
  - 來源編號（來源n／Sn）解析成 {agency,title,url}，取自研究檔檔末的來源清單。
  - 時間鍵一律西元：季 2002Q4、半年 2020H1、月 2008-03、年 2025、事件日 2024-09-20。
"""
import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
RESEARCH = ROOT / "reports" / "research" / "2026-11"
OUT = ROOT / "src" / "data" / "housing"
STAT = "housing-statistics.md"
CBC = "housing-cbc-credit-rates.md"
RETRIEVED = "2026-11-10"

WARNINGS = []  # 研究檔內部對不上的地方（不擋建置，但要回報）
MISSING = []  # 規格要求但研究檔沒有／解析不出的序列


# --------------------------------------------------------------------------
# 研究檔 markdown 解析
# --------------------------------------------------------------------------
HEAD_RE = re.compile(r"^(#{1,6})\s+(.*)$")
BAD_RE = re.compile(r"搜尋摘要|未在原頁|未在原文頁|轉述")  # 不收的儲存格
DERIVED_RE = re.compile(r"本檔(自行)?(加總|計算)")
NUM_RE = re.compile(r"^-?\d[\d,]*(?:\.\d+)?")
ISO_RE = re.compile(r"\d{4}-\d{2}(?:-\d{2})?")


def clean(c):
    return c.replace("**", "").replace("\\*", "*").replace("\\", "").strip()


class Table:
    def __init__(self, header, rows, heading, caption):
        self.header = header
        self.rows = rows  # list of Row
        self.heading = heading
        self.caption = caption

    def col(self, spec):
        """spec: int | str（先精確、再唯一子字串）| (int, 必含子字串)"""
        if isinstance(spec, tuple):
            i, sub = spec
            if sub not in self.header[i]:
                raise ValueError(f"欄 {i} 表頭 {self.header[i]!r} 不含 {sub!r}")
            return i
        if isinstance(spec, int):
            return spec
        exact = [i for i, h in enumerate(self.header) if h == spec]
        if len(exact) == 1:
            return exact[0]
        sub = [i for i, h in enumerate(self.header) if spec in h]
        if len(sub) == 1:
            return sub[0]
        raise ValueError(f"表頭 {spec!r} 對不到唯一欄：{self.header}")


class Row:
    def __init__(self, cells, lineno):
        self.cells = cells
        self.lineno = lineno


class Doc:
    def __init__(self, name):
        self.name = name
        self.lines = (RESEARCH / name).read_text(encoding="utf-8").split("\n")
        self.heads = []
        for i, line in enumerate(self.lines):
            m = HEAD_RE.match(line)
            if m:
                self.heads.append((i, len(m.group(1)), m.group(2)))

    def span(self, sub):
        hits = [k for k, h in enumerate(self.heads) if sub in h[2]]
        if len(hits) != 1:
            raise ValueError(f"{self.name}: 標題子字串 {sub!r} 命中 {len(hits)} 個")
        k = hits[0]
        start = self.heads[k][0] + 1
        end = self.heads[k + 1][0] if k + 1 < len(self.heads) else len(self.lines)
        return self.heads[k][2], start, end

    def tables(self, sub):
        heading, start, end = self.span(sub)
        out = []
        i = start
        while i < end:
            if self.lines[i].lstrip().startswith("|"):
                j = i
                while j < end and self.lines[j].lstrip().startswith("|"):
                    j += 1
                block = self.lines[i:j]
                caption = ""
                k = i - 1
                while k >= start and not self.lines[k].strip():
                    k -= 1
                if k >= start:
                    caption = self.lines[k]
                header = [clean(c) for c in block[0].strip().strip("|").split("|")]
                rows = []
                for off, line in enumerate(block[2:], start=2):
                    cells = [c.strip() for c in line.strip().strip("|").split("|")]
                    if len(cells) != len(header):
                        raise ValueError(
                            f"{self.name}:{i + off + 1} 欄數 {len(cells)} != 表頭 {len(header)}"
                        )
                    rows.append(Row(cells, i + off + 1))
                out.append(Table(header, rows, heading, caption))
                i = j
            else:
                i += 1
        return out

    def pick(self, h, cap=None, nth=0):
        ts = self.tables(h)
        if cap:
            ts = [t for t in ts if cap in t.caption]
        if len(ts) <= nth:
            raise ValueError(f"{self.name}: {h!r} cap={cap!r} 找不到第 {nth} 張表")
        return ts[nth]

    def find_line(self, regex):
        hits = [(i + 1, l) for i, l in enumerate(self.lines) if re.search(regex, l)]
        if len(hits) != 1:
            raise ValueError(f"{self.name}: 正規式 {regex!r} 命中 {len(hits)} 行")
        return hits[0]

    def first_para(self, h):
        _, start, end = self.span(h)
        for i in range(start, end):
            if self.lines[i].strip():
                return self.lines[i].strip()
        return ""


def num(cell):
    """儲存格 → (數值|None, 數字後面的剩餘文字)"""
    c = clean(cell)
    if BAD_RE.search(c):
        return None, c
    m = NUM_RE.match(c)
    if not m:
        return None, c
    s = m.group(0).replace(",", "")
    v = float(s) if "." in s else int(s)
    return v, c[m.end():].strip()


# --------------------------------------------------------------------------
# 來源清單
# --------------------------------------------------------------------------
def parse_sources(doc, prefix, default_agency):
    out = {}
    base_press = base_rule = None
    pat = re.compile(rf"^({prefix})(\d+):\s*(.*)$")
    for line in doc.lines:
        m = pat.match(line)
        if not m:
            continue
        sid = f"{m.group(1)}{m.group(2)}"
        body = m.group(3)
        segs = [s.strip() for s in re.split(r"\s*—\s*", body)]
        url_idx = next((i for i, s in enumerate(segs) if "http" in s), None)
        if url_idx is None:
            out[sid] = {"agency": None, "title": segs[0], "url": None}
            continue
        um = re.search(r"https?://[^\s）（，、；]+", segs[url_idx])
        url = um.group(0)
        title = segs[0]
        agency = segs[1] if url_idx >= 2 else default_agency
        if title.startswith("同"):
            rest = title[1:]
            if rest.startswith("規定"):
                title = base_rule + rest[2:]
            else:
                title = base_press + rest
        elif "新聞稿" in title:
            base_press = title.split("（")[0]
        elif "規定" in title:
            base_rule = title.split("（")[0]
        out[sid] = {"agency": agency, "title": title, "url": url}
    return out


# --------------------------------------------------------------------------
# 時間鍵
# --------------------------------------------------------------------------
def parse_t(kind, raw):
    c = clean(raw)
    if kind == "q":
        m = re.match(r"^(\d{4})Q([1-4])", c) or re.match(
            r"^(\d{4})（民國 \d+）Q([1-4])", c
        )
        return f"{m.group(1)}Q{m.group(2)}" if m else None
    if kind == "q_or_y4":
        m = re.match(r"^(\d{4})Q([1-4])", c)
        if m:
            return f"{m.group(1)}Q{m.group(2)}"
        m = re.match(r"^(\d{4})（", c)
        return f"{m.group(1)}Q4" if m else None
    if kind == "y":
        m = re.match(r"^(\d{4})", c)
        return m.group(1) if m else None
    if kind == "rocq":
        m = re.search(r"(\d+)年第([1-4])季", c)
        return f"{int(m.group(1)) + 1911}Q{m.group(2)}" if m else None
    if kind == "rocm":
        m = re.match(r"^(\d+)年(\d+)月", c)
        return f"{int(m.group(1)) + 1911}-{int(m.group(2)):02d}" if m else None
    if kind == "iso":
        m = re.match(r"^(\d{4}-\d{2}(?:-\d{2})?)", c)
        return m.group(1) if m else None
    if kind == "lowuse":
        m = re.match(r"^(\d{4}) 上半年", c)
        if m:
            return f"{m.group(1)}H1"
        m = re.match(r"^(\d{4}) 下半年", c)
        if m:
            return f"{m.group(1)}H2"
        m = re.match(r"^(\d{4})（", c)
        return m.group(1) if m else None
    raise ValueError(kind)


def expected_periods(first, last, cadence):
    if cadence == "quarterly":
        y, q = int(first[:4]), int(first[5])
        ey, eq = int(last[:4]), int(last[5])
        out = []
        while (y, q) <= (ey, eq):
            out.append(f"{y}Q{q}")
            q += 1
            if q == 5:
                y, q = y + 1, 1
        return out
    if cadence == "monthly":
        y, m = int(first[:4]), int(first[5:7])
        ey, em = int(last[:4]), int(last[5:7])
        out = []
        while (y, m) <= (ey, em):
            out.append(f"{y}-{m:02d}")
            m += 1
            if m == 13:
                y, m = y + 1, 1
        return out
    if cadence == "annual":
        return [str(y) for y in range(int(first), int(last) + 1)]
    return None


# --------------------------------------------------------------------------
# 縣市英文名
# --------------------------------------------------------------------------
COUNTY_EN = {
    "全國": "Nation",
    "臺北市": "Taipei City",
    "新北市": "New Taipei City",
    "桃園市": "Taoyuan City",
    "臺中市": "Taichung City",
    "臺南市": "Tainan City",
    "高雄市": "Kaohsiung City",
    "基隆市": "Keelung City",
    "新竹市": "Hsinchu City",
    "嘉義市": "Chiayi City",
    "新竹縣": "Hsinchu County",
    "苗栗縣": "Miaoli County",
    "彰化縣": "Changhua County",
    "南投縣": "Nantou County",
    "雲林縣": "Yunlin County",
    "嘉義縣": "Chiayi County",
    "屏東縣": "Pingtung County",
    "宜蘭縣": "Yilan County",
    "花蓮縣": "Hualien County",
    "臺東縣": "Taitung County",
    "澎湖縣": "Penghu County",
    "金門縣": "Kinmen County",
    "連江縣": "Lienchiang County",
}


def county(zh):
    zh = zh.replace("台", "臺")
    return {"zh": zh, "en": COUNTY_EN[zh]}


# --------------------------------------------------------------------------
# 規格 helper
# --------------------------------------------------------------------------
def T(h, cap=None, nth=0):
    return {"h": h, "cap": cap, "nth": nth}


def S(id, zh, en, unit, cadence, src, table, col, tp, **kw):
    d = dict(
        id=id, zh=zh, en=en, unit=unit, cadence=cadence, src=src, table=table,
        col=col, tp=tp,
    )
    d.update(kw)
    return d


class Ctx:
    def __init__(self):
        self.docs = {STAT: Doc(STAT), CBC: Doc(CBC)}
        self.src = {}
        self.src.update(parse_sources(self.docs[STAT], "來源", "內政部不動產資訊平台"))
        self.src.update(parse_sources(self.docs[CBC], "S", "中央銀行"))
        self.used_docs = set()

    def source(self, sid):
        s = self.src.get(sid)
        if not s or not s.get("url") or not s["url"].startswith("https://"):
            raise ValueError(f"來源 {sid} 沒有 https 網址：{s}")
        return {"agency": s["agency"], "title": s["title"], "url": s["url"]}

    def doc(self, name):
        self.used_docs.add(name)
        return self.docs[name]


# --------------------------------------------------------------------------
# 通用：序列
# --------------------------------------------------------------------------
def build_series(ctx, doc_name, s):
    doc = ctx.doc(doc_name)
    specs = s["table"] if isinstance(s["table"], list) else [s["table"]]
    pts = []
    for ts in specs:
        tb = doc.pick(**ts)
        ci = tb.col(s["col"])
        ti = tb.col(s.get("tcol", 0))
        reqs = [tb.col(r) for r in s.get("reqnum", [])]
        rowneed = None
        if s.get("rowneed"):
            rowneed = (tb.col(s["rowneed"][0]), re.compile(s["rowneed"][1]))
        if not s.get("derived"):
            blob = " ".join([tb.heading, tb.caption, tb.header[ci]])
            if DERIVED_RE.search(blob):
                raise ValueError(f"{s['id']} 來自「本檔加總／計算」欄位但沒標 derived=True")
        for r in tb.rows:
            t = parse_t(s["tp"], r.cells[ti])
            if t is None:
                continue
            if s.get("tre") and not re.search(s["tre"], t):
                continue
            if any(num(r.cells[k])[0] is None for k in reqs):
                continue
            if rowneed and not rowneed[1].search(clean(r.cells[rowneed[0]])):
                continue
            v, rest = num(r.cells[ci])
            if v is None:
                continue
            if s.get("need") and not re.search(s["need"], rest):
                continue
            if s.get("norest") and rest:
                continue
            pts.append({"t": t, "v": v})
    return finish_series(ctx, s, pts)


def finish_series(ctx, s, pts):
    pts.sort(key=lambda p: p["t"])
    ts = [p["t"] for p in pts]
    if len(set(ts)) != len(ts):
        dup = sorted({t for t in ts if ts.count(t) > 1})
        raise ValueError(f"{s['id']} 時間鍵重複：{dup}")
    if not pts:
        MISSING.append(f"{s['id']}：{s.get('missing_note', '研究檔沒有數值')}")
        return None
    gaps = s.get("gaps", [])
    exp = expected_periods(ts[0], ts[-1], s["cadence"])
    if exp is not None:
        miss = [p for p in exp if p not in set(ts)]
        if miss != gaps:
            raise ValueError(f"{s['id']} 缺期 {miss} 與宣告的 gaps {gaps} 不符")
    out = {
        "id": s["id"],
        "label": {"zh": s["zh"], "en": s["en"]},
        "unit": s["unit"],
        "cadence": s["cadence"],
        "asOf": ts[-1],
        "derived": bool(s.get("derived", False)),
        "source": ctx.source(s["src"]),
    }
    if s.get("note"):
        out["note"] = s["note"]
    if gaps:
        out["gaps"] = gaps
    if s.get("bounds"):
        out["bounds"] = s["bounds"]
    out["points"] = pts
    return out


# --------------------------------------------------------------------------
# 通用：縣市／分項表
# --------------------------------------------------------------------------
def build_table(ctx, doc_name, t):
    doc = ctx.doc(doc_name)
    tb = doc.pick(**t["table"])
    if t.get("period_roc") and t["period_roc"] not in tb.heading:
        raise ValueError(f"{t['id']} 標題不含 {t['period_roc']}：{tb.heading}")
    cols = [(key, tb.col(hdr), hdr) for key, hdr, *_ in t["cols"]]
    rows = []
    for r in tb.rows:
        raw = clean(r.cells[t.get("keycol", 0)])
        star = raw.endswith("*")
        name = raw.rstrip("*").strip()
        row = {"key": name, "name": t["name_fn"](name)}
        notes = {}
        for key, ci, _ in cols:
            v, rest = num(r.cells[ci])
            row[key] = v
            if rest and t.get("cell_notes"):
                notes[key] = rest
        if t.get("star_flag"):
            row["smallSample"] = star
        if notes:
            row["notes"] = notes
        rows.append(row)
    out = {
        "id": t["id"],
        "label": {"zh": t["zh"], "en": t["en"]},
        "period": t["period"],
        "columns": [k for k, _, _ in cols],
        "columnLabels": {k: {"zh": hdr} for k, _, hdr in cols},
        "columnUnits": {c[0]: c[2] for c in t["cols"]},
        "source": ctx.source(t["src"]),
    }
    if t.get("note"):
        out["note"] = t["note"]
    out["rows"] = rows
    return out


# --------------------------------------------------------------------------
# 各檔規格
# --------------------------------------------------------------------------
CITIES = [
    ("taipei", "臺北", "臺北市", "Taipei City"),
    ("new-taipei", "新北", "新北市", "New Taipei City"),
    ("taoyuan", "桃園", "桃園市", "Taoyuan City"),
    ("taichung", "臺中", "臺中市", "Taichung City"),
    ("tainan", "臺南", "臺南市", "Tainan City"),
    ("kaohsiung", "高雄", "高雄市", "Kaohsiung City"),
]

PTI_BREAK_NOTE = (
    "房價資料 101Q2 以前取自金融聯合徵信中心房貸擔保品鑑估價格，101Q3 起改用實價登錄住宅類交易價格，"
    "序列在 101Q2/Q3 有資料源斷點，跨斷點比較要加註"
)
BURDEN_FIX_NOTE = (
    "官方查詢端點的貸款負擔率在 110Q4、111Q1、111Q2（全部縣市）回傳值為正常值的 100 倍，"
    "研究檔已除以 100 還原並以各季 PDF 抽驗；114 年前後名稱由「貸款負擔率」改為「房貸負擔率」，同一指標"
)
T11 = T("1(a) 全國歷年序列", cap="表 1-1")
T12 = T("1(a) 全國歷年序列", cap="表 1-2")

AFFORD_SERIES = [
    S("price-to-income-national", "房價所得比（全國）", "Price-to-income ratio (national)",
      "倍", "quarterly", "來源3", T12, "房價所得比", "q", note=PTI_BREAK_NOTE),
    S("mortgage-burden-national", "房貸負擔率（全國）", "Mortgage burden ratio (national)",
      "%", "quarterly", "來源3", T12, "貸款負擔率", "q", bounds=[0, 100],
      note=BURDEN_FIX_NOTE + "；" + PTI_BREAK_NOTE),
]
for slug, short, zh, en in CITIES:
    AFFORD_SERIES.append(
        S(f"price-to-income-{slug}", f"房價所得比（{zh}）", f"Price-to-income ratio ({en})",
          "倍", "irregular", "來源3", T11, f"{short} 倍", "q_or_y4",
          note="研究檔只列每年第 4 季，最後一點為 115Q1（2026Q1）；" + PTI_BREAK_NOTE)
    )
    AFFORD_SERIES.append(
        S(f"mortgage-burden-{slug}", f"房貸負擔率（{zh}）", f"Mortgage burden ratio ({en})",
          "%", "irregular", "來源3", T11, f"{short} %", "q_or_y4", bounds=[0, 100],
          note="研究檔只列每年第 4 季，最後一點為 115Q1（2026Q1）；" + BURDEN_FIX_NOTE)
    )

AFFORD_TABLES = [
    dict(
        id="affordability-by-county-2026Q1", zh="各縣市房價負擔能力（115 年第 1 季）",
        en="Housing affordability by county (2026Q1)", period="2026Q1", period_roc="115Q1",
        table=T("1(b) 最新一季"), src="來源2", star_flag=True, name_fn=county,
        note="澎湖縣、金門縣（smallSample=true）＝不動產實價登錄資料樣本數少於 100 筆（原文備註）；官方表缺連江縣",
        cols=[
            ("burdenPct", "房貸負擔率（%）", "%"),
            ("burdenQoQPp", "負擔率季變動（百分點）", "百分點"),
            ("burdenYoYPp", "負擔率年變動（百分點）", "百分點"),
            ("priceToIncome", "房價所得比（倍）", "倍"),
            ("priceToIncomeQoQ", "房價所得比季變動（倍）", "倍"),
            ("priceToIncomeYoY", "房價所得比年變動（倍）", "倍"),
        ],
    )
]


def afford_extra(ctx):
    doc = ctx.doc(STAT)
    # 分級門檻（只針對房貸負擔率）：111Q4 發布內容備註 1 原文
    ln, text = doc.find_line(r"^> 房貸負擔率以 50%\(含\)以上表示")
    text = clean(text)
    levels = []
    m = re.search(r"(\d+)%\(含\)以上表示房價負擔能力(\S+?)，", text)
    levels.append(("過低", int(m.group(1)), None, True, False, m.group(2)))
    for m in re.finditer(r"(\d+)%\(含\)~(\d+)%\(不含\)表示房價負擔能力(\S+?)[，、]", text):
        levels.append((m.group(3), int(m.group(1)), int(m.group(2)), True, False, m.group(3)))
    m = re.search(r"(\d+)%\(不含\)以下表示(\S+?)。", text)
    levels.append((m.group(2), None, int(m.group(1)), False, False, m.group(2)))
    if len(levels) != 4:
        raise ValueError("分級門檻應有四級")
    en = {"過低": ("very-low", "Very low affordability"),
          "偏低": ("low", "Low affordability"),
          "略低": ("slightly-low", "Slightly low affordability"),
          "可合理負擔": ("affordable", "Reasonably affordable")}
    out = []
    for name, lo, hi, loinc, _, _ in levels:
        lid, len_ = en[name]
        out.append({
            "id": lid, "label": {"zh": name, "en": len_},
            "min": lo, "max": hi,
            "minInclusive": bool(lo is not None), "maxInclusive": False,
        })
    return {
        "bands": {
            "metric": "mortgage-burden",
            "unit": "%",
            "definition": "房貸負擔率分級（官方只對房貸負擔率分級，房價所得比沒有官方分級）；"
                          "min 含（minInclusive）、max 不含",
            "levels": out,
            "source": ctx.source("來源4"),
            "corroboratedBy": ctx.source("來源5"),
        }
    }


# 價格指數 ---------------------------------------------------------------
HPI_T = T("2(a) 內政部住宅價格指數")
CATHAY_T = T("2(b) 民間指數")
HPI_COLS = [
    ("national", "全國", "National", "全國"),
    ("new-taipei", "新北市", "New Taipei City", "新北市"),
    ("taipei", "臺北市", "Taipei City", "臺北市"),
    ("taoyuan", "桃園市", "Taoyuan City", "桃園市"),
    ("taichung", "臺中市", "Taichung City", "臺中市"),
    ("tainan", "臺南市", "Tainan City", "臺南市"),
    ("kaohsiung", "高雄市", "Kaohsiung City", "高雄市"),
]
CATHAY_COLS = [
    ("national", "全國", "National"),
    ("taipei", "臺北市", "Taipei City"),
    ("new-taipei", "新北市", "New Taipei City"),
    ("taoyuan-hsinchu", "桃竹地區", "Taoyuan–Hsinchu area"),
    ("taoyuan", "桃園市", "Taoyuan City"),
    ("hsinchu", "新竹縣市", "Hsinchu City and County"),
    ("taichung", "臺中市", "Taichung City"),
    ("tainan", "臺南市", "Tainan City"),
    ("kaohsiung", "高雄市", "Kaohsiung City"),
]
PRICE_SERIES = []
for slug, zh, en, col in HPI_COLS:
    PRICE_SERIES.append(
        S(f"hpi-{slug}", f"內政部住宅價格指數（{zh}）", f"MOI Residential Price Index ({en})",
          "指數（2016=100）", "quarterly", "來源8", HPI_T, col, "q",
          note="官方指數；基期 105 年（2016）全年＝100；季別自 2012Q3（101Q3）起")
    )
for slug, zh, en in CATHAY_COLS:
    PRICE_SERIES.append(
        S(f"cathay-index-{slug}", f"國泰房地產指數（{zh}）", f"Cathay Real Estate Index ({en})",
          "指數（2021=100）", "quarterly", "來源9", CATHAY_T, zh, "q",
          note="民間指數：國泰建設與政大台灣房地產研究中心「可能成交價指數」，內政部平台轉載；基期 110 年（2021）全年＝100",
          missing_note="研究檔該欄全為「---」（來源無資料）")
    )

# 利率 -------------------------------------------------------------------
RATE_NOTE = "央行貼放利率表，生效日為該利率開始適用日；最早一列為 2000-12-29"
RATES_SERIES = [
    S("cbc-rediscount-rate", "央行重貼現率（歷次調整）", "CBC rediscount rate (each change)",
      "%", "event", "S58", T("三之一、重貼現率歷次調整", nth=0), "重貼現率(%)", "iso", note=RATE_NOTE),
    S("cbc-secured-loan-rate", "央行擔保放款融通利率（歷次調整）", "CBC collateralized lending rate (each change)",
      "%", "event", "S58", T("三之一、重貼現率歷次調整", nth=0), "擔保放款融通利率(%)", "iso", note=RATE_NOTE),
    S("cbc-short-term-lending-rate", "央行短期融通利率（歷次調整）", "CBC short-term lending rate (each change)",
      "%", "event", "S58", T("三之一、重貼現率歷次調整", nth=0), "短期融通利率(%)", "iso", note=RATE_NOTE),
    S("five-bank-mortgage-rate", "五大銀行新承做購屋貸款加權平均利率（月）",
      "Five major banks: new home-purchase loan rate (monthly)",
      "%", "monthly", "S61", T("四之二、月度序列"), "購屋貸款新承做加權平均利率(%)", "iso",
      note="臺銀、合庫、土銀、華銀、一銀（97 年 10 月前為臺銀、合庫、一銀、華銀、彰銀）；央行表格自 1994-07 起，研究檔只收 2008-01 起"),
    S("five-bank-mortgage-rate-yearend", "五大銀行新承做購屋貸款利率（各年 12 月）",
      "Five major banks: new home-purchase loan rate (December of each year)",
      "%", "annual", "S61", T("四之一、年度摘要"), "年底(12月)利率(%)", "y",
      note="2000–2007 年只有這張年度摘要；2026 年欄位為「(至9月)」未收"),
    S("five-bank-mortgage-rate-annual-weighted", "五大銀行新承做購屋貸款利率（全年依金額加權）",
      "Five major banks: new home-purchase loan rate (full-year, amount-weighted)",
      "%", "annual", "S61", T("四之一、年度摘要"), "加權平均利率(%)", "y", derived=True,
      rowneed=("涵蓋月數", r"^12$"),
      note="本檔依當年 12 個月新承做金額加權自行計算，非央行公布值；2026 年只有 9 個月，不收"),
    S("post-office-2y-floating-rate", "郵局定期儲金 2 年期機動利率（未達 500 萬元，歷次調整）",
      "Post office 2-year floating savings rate (under NT$5M, each change)",
      "%", "event", "S68", T("七之一、郵政儲金利率"), "機動利率", "iso",
      note="青安貸款與部分指數型房貸的指標利率；頁面歷史自 1985 年起，研究檔只收 1999 年以來"),
]

# 貸款 -------------------------------------------------------------------
BAL_T = T("五之一、全體銀行購置住宅貸款")
BAL_NOTE = "全體銀行；研究檔只列各年 12 月底與最新月（2026-09），並非每月序列"
LENDING_SERIES = [
    S("home-purchase-loan-balance", "全體銀行購置住宅貸款餘額", "Home-purchase loan balance (all banks)",
      "百萬元", "irregular", "S62", BAL_T, "購置住宅貸款餘額", "iso", note=BAL_NOTE),
    S("construction-loan-balance", "全體銀行建築貸款餘額", "Construction loan balance (all banks)",
      "百萬元", "irregular", "S62", BAL_T, "建築貸款餘額", "iso", note=BAL_NOTE),
    S("home-purchase-loan-yoy", "購置住宅貸款年增率", "Home-purchase loan balance, YoY",
      "%", "irregular", "S62", BAL_T, "購置住宅貸款年增率", "iso", derived=True,
      note="本檔依央行餘額表自行計算，非官方公布值；" + BAL_NOTE),
    S("construction-loan-yoy", "建築貸款年增率", "Construction loan balance, YoY",
      "%", "irregular", "S62", BAL_T, "建築貸款年增率", "iso", derived=True,
      note="本檔依央行餘額表自行計算，非官方公布值；" + BAL_NOTE),
    S("five-bank-mortgage-new-amount", "五大銀行新承做購屋貸款金額（月）",
      "Five major banks: new home-purchase loan amount (monthly)",
      "百萬元", "monthly", "S61", T("四之二、月度序列"), "新承做購屋貸款金額(百萬元)", "iso"),
]
LENDING_TABLES = [
    dict(
        id="restricted-loan-average-ltv", zh="受限貸款類別平均貸款成數（本國銀行）",
        en="Average loan-to-value of restricted loan categories (domestic banks)",
        period="2026-02", table=T("六、貸款成數、年限、寬限期"), src="S31", cell_notes=True,
        name_fn=lambda n: {"zh": n, "en": {
            "公司法人購置住宅貸款": "Corporate home-purchase loans",
            "自然人第 1 戶（名下有房屋者）": "Individuals, 1st home (already owns a house)",
            "自然人第 2 戶": "Individuals, 2nd home",
            "自然人第 3 戶以上": "Individuals, 3rd home or more",
            "自然人高價住宅": "Individuals, high-priced homes",
            "購地貸款": "Land purchase loans",
            "餘屋貸款": "Unsold new-home loans",
        }[n]},
        note="央行公布的受限貸款類別平均成數；「規範前」多為 2020-01~09 座談銀行資料，其餘為 39 家本國銀行當月新撥款資料；"
             "新承做房貸整體平均成數、年限、寬限期占比，央行沒有公布",
        cols=[
            ("preControlPct", "規範前銀行成數(%)", "%"),
            ("aug2024Pct", "113/8（第7度前1個月）(%)", "%"),
            ("feb2026Pct", "115/2(%)", "%"),
            ("capPct", "央行表列規範成數上限（113/9/20 起）(%)", "%"),
        ],
    )
]

# 交易 -------------------------------------------------------------------
T81 = T("8. 交易量", cap="表 8-1")
T82 = T("8. 交易量", cap="表 8-2")
TX_SERIES = [
    S("building-transfers-annual-moi", "建物買賣移轉棟數（年，內政部平台季加總）",
      "Building sale transfers per year (MOI platform, sum of quarters)",
      "棟", "annual", "來源16", T81, "內政部平台 CSV", "y", derived=True, need=r"4 季加總",
      note="本檔把內政部平台 CSV 的四個季值相加，非官方年值；2026 年只有 2 季，不收"),
    S("building-transfers-annual-mof", "建物買賣移轉棟數（年，財政部月加總）",
      "Building sale transfers per year (MOF, sum of months)",
      "棟", "annual", "來源21", T81, "財政部彙整", "y", derived=True, need=r"12 月加總",
      note="本檔把財政部彙整的 12 個月值相加，非官方年值；2016、2022 年與內政部平台加總不同，研究檔並列；2026 年只有 8 個月，不收"),
    S("building-transfers-monthly-mof", "建物買賣移轉棟數（月，財政部彙整）",
      "Building sale transfers per month (MOF)",
      "棟", "monthly", "來源21", T82, "建物買賣移轉棟數", "rocm",
      note="研究檔只收 2026 年（115 年）已公布各月；2026 年 9 月該欄尚無值"),
]

# 空屋 -------------------------------------------------------------------
CENSUS_T = T("5(a) 主計總處人口及住宅普查")
LOWUSE_T = T("5(b) 低度使用", cap="表 5-1")
CENSUS_NOTE = "主計總處人口及住宅普查，標準時點為各十年底（1966 為民國 55 年底）"
VACANCY_SERIES = [
    S("census-housing-units", "普查住宅數", "Census: housing units", "宅", "irregular", "來源13",
      CENSUS_T, "住宅數（宅）", "y", note=CENSUS_NOTE),
    S("census-occupied-units", "普查有人經常居住住宅", "Census: occupied housing units", "宅", "irregular",
      "來源13", CENSUS_T, "有人經常居住（宅）", "y", note=CENSUS_NOTE),
    S("census-non-residential-use-units", "普查無人經常居住：自住以外使用", "Census: unoccupied, used for other purposes",
      "宅", "irregular", "來源13", CENSUS_T, "無人經常居住：自住以外使用（宅）", "y", norest=True,
      note=CENSUS_NOTE + "；1966 年「自住以外使用」與空閒合併列示，不收"),
    S("census-vacant-units", "普查空閒住宅", "Census: vacant housing units", "宅", "irregular", "來源13",
      CENSUS_T, "無人經常居住：空閒住宅（宅）", "y",
      note=CENSUS_NOTE + "；定義：無人經常居住但包括於假日或偶爾自住，以及因其他原因目前未使用；1966 年與自住以外使用合併列示，不收"),
    S("census-vacancy-rate", "普查空閒住宅率", "Census: vacant housing rate", "%", "irregular", "來源13",
      CENSUS_T, "空閒住宅率（%）", "y", bounds=[0, 100], reqnum=["無人經常居住：空閒住宅（宅）"],
      note=CENSUS_NOTE + "；1966 年空閒與自住以外使用合併列示，研究檔表列 1.0，口徑不同，不收"),
    S("low-use-ratio-annual", "低度使用（用電）住宅比率（年）", "Low-use (electricity) housing ratio (annual)",
      "%", "annual", "來源14", LOWUSE_T, "低度使用住宅比率（%）", "lowuse", tre=r"^\d{4}$", bounds=[0, 100],
      note="以台電用電資料判斷，兩個月平均每月用電 60 度以下；分母為房屋稅籍住宅類數量；內政部明說是「空屋的替代統計方式」，"
           "與普查空閒住宅定義不同；98–107 年以比率推估法推估，108、109 年以精進地址比對重算"),
    S("low-use-ratio-semiannual", "低度使用（用電）住宅比率（半年）", "Low-use (electricity) housing ratio (half-yearly)",
      "%", "semiannual", "來源14", LOWUSE_T, "低度使用住宅比率（%）", "lowuse", tre=r"H[12]$", bounds=[0, 100],
      note="109 年起每半年一筆；定義與換算見年度序列說明；114 年上半年 10.43% 為統計以來次高"),
    S("unsold-new-homes-national", "全國待售新成屋", "Unsold new homes (national)", "宅", "quarterly", "來源14",
      T("5(c) 待售新成屋", nth=0), "全國待售新成屋（宅）", "q",
      note="原「新建餘屋(待售)住宅」，111 年第 3 季更名"),
]
VACANCY_TABLES = [
    dict(
        id="low-use-by-county-2025H2", zh="各縣市低度使用（用電）住宅（114 年下半年）",
        en="Low-use (electricity) housing by county (2025 H2)", period="2025H2",
        table=T("5(b) 低度使用", cap="表 5-2"), src="來源14", name_fn=county,
        cols=[
            ("taxedHousingUnits", "房屋稅籍住宅類數量（宅）", "宅"),
            ("lowUseUnits", "低度使用（用電）住宅（宅）", "宅"),
            ("lowUseRatioPct", "比率（%）", "%"),
        ],
    ),
    dict(
        id="unsold-new-homes-by-county-2025Q4", zh="各縣市待售新成屋（114 年第 4 季）",
        en="Unsold new homes by county (2025Q4)", period="2025Q4",
        table=T("5(c) 待售新成屋", cap="表 5-3"), src="來源14", name_fn=county,
        note="「-」＝無統計（連江縣）",
        cols=[("units", "宅數", "宅")],
    ),
]

# 社宅 -------------------------------------------------------------------
SOCIAL_SERIES = [
    S("rent-subsidy-households", "租金補貼戶數（111 年 Q4 起核撥）", "Rent subsidy households (disbursed since 2022Q4)",
      "戶", "quarterly", "來源16", T("9(e) 300 億元"), "租金補貼戶數", "q",
      note="官方欄位名稱「租金補貼戶數(111年Q4起核撥)」，原檔沒有說明是當季核撥戶數或當季在撥戶數，沿用原欄名；只到 114Q4"),
]

# 所得 -------------------------------------------------------------------
FIES_T = T("3. 家庭所得")
FIES_NOTE = "主計總處家庭收支調查；研究檔所列歷年為 1991、1996、2001、2006 年及 2007 年起逐年"
INCOME_SERIES = [
    S("fies-household-size", "家庭收支調查戶內人數", "FIES household size", "人", "irregular", "來源10",
      FIES_T, (1, "戶內人數"), "y", note=FIES_NOTE),
    S("disposable-income-mean-household", "平均每戶可支配所得", "Mean disposable income per household",
      "萬元", "irregular", "來源10", FIES_T, (2, "平均每戶可支配所得"), "y", note=FIES_NOTE),
    S("disposable-income-mean-household-yoy", "平均每戶可支配所得年增率", "Mean disposable income per household, YoY",
      "%", "irregular", "來源10", FIES_T, (3, "年增率"), "y",
      note=FIES_NOTE + "；官方年增率欄位，相鄰兩點在 2006 年以前相隔五年"),
    S("disposable-income-mean-per-capita", "每人可支配所得平均數", "Mean disposable income per person",
      "萬元", "irregular", "來源10", FIES_T, (4, "每人可支配所得平均數"), "y", note=FIES_NOTE),
    S("disposable-income-median-household", "每戶可支配所得中位數", "Median disposable income per household",
      "萬元", "irregular", "來源10", FIES_T, (6, "每戶可支配所得中位數"), "y", note=FIES_NOTE),
    S("disposable-income-median-household-yoy", "每戶可支配所得中位數年增率", "Median disposable income per household, YoY",
      "%", "irregular", "來源10", FIES_T, (7, "年增率"), "y",
      note=FIES_NOTE + "；官方年增率欄位，相鄰兩點在 2006 年以前相隔五年"),
    S("income-quintile-ratio-household", "每戶五等分位所得差距", "Income quintile ratio (per household)",
      "倍", "irregular", "來源10", FIES_T, (8, "五等分位差距"), "y",
      note=FIES_NOTE + "；最高 20% 組／最低 20% 組"),
    S("gini-household", "吉尼係數（每戶）", "Gini coefficient (per household)", "係數", "irregular", "來源10",
      FIES_T, (9, "吉尼係數"), "y", note=FIES_NOTE),
]
W4A = T("4(a) 歷年名目經常性薪資")
W4B = T("4(b) 實質經常性薪資")
W_NOTE = "工業及服務業受僱員工每人每月經常性薪資；114 年為初步值"
INCOME_SERIES += [
    S("regular-wage-nominal-total", "名目經常性薪資（總計）", "Nominal regular monthly earnings (all employees)",
      "元", "annual", "來源12", W4A, "總計（元）", "y", note=W_NOTE + "；主計總處年報表 19，與 4(b) 的 2025 年平均差 1 元為四捨五入來源差異"),
    S("regular-wage-nominal-male", "名目經常性薪資（男性）", "Nominal regular monthly earnings (male)",
      "元", "annual", "來源12", W4A, "男性（元）", "y", note=W_NOTE),
    S("regular-wage-nominal-female", "名目經常性薪資（女性）", "Nominal regular monthly earnings (female)",
      "元", "annual", "來源12", W4A, "女性（元）", "y", note=W_NOTE),
]
REAL_NOTE = "物價平減，消費者物價指數 110 年＝100；新聞稿只列最近 6 年（2020–2025）；114 年為初步值"
for sid, zh, en, hdr, unit in [
    ("regular-wage-all-nominal-mean", "名目經常性薪資平均（全體受僱員工）", "Nominal regular earnings, mean (all employees)", "全體受僱員工 名目平均（元）", "元"),
    ("regular-wage-all-real-mean", "實質經常性薪資平均（全體受僱員工）", "Real regular earnings, mean (all employees)", "全體 實質平均（元）", "元"),
    ("regular-wage-all-real-mean-yoy", "實質經常性薪資平均年增（全體受僱員工）", "Real regular earnings, mean, YoY (all employees)", "全體 實質平均年增（%）", "%"),
    ("regular-wage-all-nominal-median", "名目經常性薪資中位數（全體受僱員工）", "Nominal regular earnings, median (all employees)", "全體 名目中位數（元）", "元"),
    ("regular-wage-all-real-median", "實質經常性薪資中位數（全體受僱員工）", "Real regular earnings, median (all employees)", "全體 實質中位數（元）", "元"),
    ("regular-wage-fulltime-domestic-nominal-mean", "名目經常性薪資平均（本國籍全時員工）", "Nominal regular earnings, mean (domestic full-time)", "本國籍全時 名目平均（元）", "元"),
    ("regular-wage-fulltime-domestic-real-mean", "實質經常性薪資平均（本國籍全時員工）", "Real regular earnings, mean (domestic full-time)", "本國籍全時 實質平均（元）", "元"),
]:
    INCOME_SERIES.append(S(sid, zh, en, unit, "annual", "來源11", W4B, hdr, "y", note=REAL_NOTE))

# 存量 -------------------------------------------------------------------
ST_T = T("6(a) 住宅存量", nth=0)
ST_EARLY = T("6(a) 住宅存量", cap="普通家戶數更早年份")
ST_NOTE = "內政部不動產資訊平台統計資訊整合項目 CSV；研究檔只列各年第 4 季與最新期，並非逐季序列"
STOCK_SERIES = [
    S("housing-stock", "住宅存量", "Housing stock", "宅", "irregular", "來源16", ST_T, "住宅存量（宅）", "q",
      note=ST_NOTE + "（住宅存量自 098Q1 起）"),
    S("taxed-housing-units", "房屋稅籍住宅類數量", "Taxed residential units", "宅", "irregular", "來源16",
      ST_T, "房屋稅籍住宅類數量（宅）", "q", note=ST_NOTE),
    S("households", "普通家戶數", "Ordinary households", "戶", "irregular", "來源16",
      [ST_EARLY, ST_T], "普通家戶數（戶）", "q",
      note=ST_NOTE + "；2000Q4–2008Q4 取自同一份 CSV 的更早年份表；"
           "113Q4 值 9,487,480 與前後期（112Q4 8,319,326、114Q4 8,875,258）落差大，研究檔原樣搬運，使用前請回平台核對"),
    S("household-size", "戶量", "Persons per household", "人／戶", "irregular", "來源16", ST_T, "戶量", "q",
      note=ST_NOTE + "；戶籍資料，111Q4–112Q4 來源檔缺"),
    S("population", "總人口", "Total population", "人", "irregular", "來源16", ST_T, "總人口", "q", note=ST_NOTE),
    S("births-annual", "出生數（年，季加總）", "Births per year (sum of quarters)", "人", "annual", "來源16",
      T("10. 人口與家戶", cap="出生數歷年季值"), "出生數", "y", derived=True, rowneed=("季數", r"^4$"),
      gaps=["2022", "2023"],
      note="本檔把內政部平台 CSV 的四個季值相加，非官方年值；111Q4–112Q4 來源檔缺，2022、2023 年無法加總，2026 年只有 2 季，均不收"),
]
OWN_T = T("6(b) 住宅自有率與租屋家戶", nth=0)
STOCK_TABLES = [
    dict(
        id="homeownership-by-income-quintile-2025", zh="住宅所有權（依可支配所得五等分位，2025 年）",
        en="Housing tenure by disposable-income quintile (2025)", period="2025", table=OWN_T,
        src="來源17", keycol=0,
        name_fn=lambda n: {"zh": n, "en": {
            "自有（戶內經常居住成員所擁有）": "Owned by household members living in it",
            "不住在一起的配偶、父母或子女所擁有": "Owned by spouse, parents or children living elsewhere",
            "租押": "Rented",
            "其他（含配住及借用）": "Other (incl. provided or borrowed)",
        }[n]},
        note="家庭收支調查，臺灣地區（不含金門、連江）；戶數百分比",
        cols=[
            ("all", "全體家庭", "%"), ("q1", "最低所得組", "%"), ("q2", "次低", "%"),
            ("q3", "中間", "%"), ("q4", "次高", "%"), ("q5", "最高所得組", "%"),
        ],
    )
]


def stock_extra_series(ctx):
    """普查住宅自有率：研究檔以一段文字列示，依固定句型解析。"""
    doc = ctx.doc(STAT)
    ln, text = doc.find_line(r"^住宅自有率（普查，同表，％）：")
    text = clean(text)
    own, rel = [], []
    for m in re.finditer(r"(1966|1980|1990|2000) 年 ([\d.]+)", text):
        own.append({"t": m.group(1), "v": float(m.group(2))})
    for m in re.finditer(r"(2010|2020) 年\s*(?:「[^」]*」)?\s*([\d.]+)\s*(?:、「[^」]*」|與)\s*([\d.]+)", text):
        own.append({"t": m.group(1), "v": float(m.group(2))})
        rel.append({"t": m.group(1), "v": float(m.group(3))})
    if len(own) != 6 or len(rel) != 2:
        raise ValueError(f"普查自有率句型解析失敗：{own} {rel}")
    base = "主計總處人口及住宅普查，標準時點為各十年底（1966 為民國 55 年底）"
    return [
        finish_series(ctx, dict(
            id="homeownership-census-occupant-owned", zh="普查住宅自有率（戶內經常居住成員所有）",
            en="Census homeownership rate (owned by resident household members)", unit="%",
            cadence="irregular", src="來源13", bounds=[0, 100],
            note=base + "；2010 年起摘要表分列兩項，此序列取「為戶內經常居住成員所有」，之前年份為研究檔表列的住宅自有率"), own),
        finish_series(ctx, dict(
            id="homeownership-census-relative-owned", zh="普查住宅「為不住在一起的配偶、父母或子女所有」比率",
            en="Census share owned by spouse, parents or children living elsewhere", unit="%",
            cadence="irregular", src="來源13", bounds=[0, 100],
            note=base + "；摘要表自 99 年起才分列此項，未列合計"), rel),
    ]


# 稅 ---------------------------------------------------------------------
LVT_T = T("11(a) 土地增值稅")
HT_T = T("11(b) 房屋稅")
TQ_T = T("11(c) 房地合一稅", nth=0)
TQ_SUM = T("11(c) 房地合一稅", cap="房地合一稅年度加總")
TAX_NOTE_Q = "財政部彙整，單位千元；房地合一稅自 105 年 1 月 1 日起徵（資料自 105Q1）"
TAX_SERIES = [
    S("land-value-tax-annual", "土地增值稅實徵淨額（年）", "Land value increment tax, net collected (annual)",
      "千元", "annual", "來源19", LVT_T, "實徵淨額（千元）", "y",
      note="財政部圖表資料檔數值單位為千元；114 年另有 68,302,561 千元與近年賦稅收入概況 683.02652 億元的些微差，研究檔並列"),
    S("land-value-tax-transfers", "土地增值稅移轉筆數（年）", "Land value increment tax, number of transfers (annual)",
      "筆", "annual", "來源19", LVT_T, "移轉筆數（筆）", "y"),
    S("house-tax-annual", "房屋稅實徵淨額（年）", "House tax, net collected (annual)",
      "千元", "annual", "來源18", HT_T, "實徵淨額（千元）", "y"),
    S("house-tax-yoy", "房屋稅實徵淨額年增率", "House tax, net collected, YoY",
      "%", "annual", "來源18", HT_T, "年增率（%）", "y"),
    S("land-and-house-combined-tax-quarterly", "房地合一稅（季）", "Land and housing transaction income tax (quarterly)",
      "千元", "quarterly", "來源21", TQ_T, "房地合一稅（千元）", "rocq", note=TAX_NOTE_Q),
    S("land-value-tax-quarterly", "土地增值稅（季，財政部彙整）", "Land value increment tax (quarterly, MOF compilation)",
      "千元", "quarterly", "來源21", TQ_T, "土地增值稅（千元）", "rocq", note=TAX_NOTE_Q),
    S("deed-tax-quarterly", "契稅（季）", "Deed tax (quarterly)",
      "千元", "quarterly", "來源21", TQ_T, "契稅（千元）", "rocq", note=TAX_NOTE_Q),
    S("land-and-house-combined-tax-annual", "房地合一稅（年，季加總）", "Land and housing transaction income tax (annual, sum of quarters)",
      "千元", "annual", "來源21", TQ_SUM, "房地合一稅（千元）", "y", derived=True, rowneed=("加總季數", r"^4"),
      note="本檔把財政部季值相加，非官方年值；2026 年只有 3 季，不收"),
]


# --------------------------------------------------------------------------
# 其他自訂解析
# --------------------------------------------------------------------------
def tx_quarterly(ctx, by_id):
    doc = ctx.doc(STAT)
    ln, text = doc.find_line(r"^\*\*2026 年季值（內政部平台 CSV，棟）\*\*")
    m1 = re.search(r"115Q1 = ([\d,]+)；115Q2 = ([\d,]+)", text)
    m2 = re.search(r"114Q1–114Q4 分別為 ([\d,]+)、([\d,]+)、([\d,]+)、([\d,]+)", text)
    if not (m1 and m2):
        raise ValueError("建物買賣移轉季值句型解析失敗")
    iv = lambda x: int(x.replace(",", ""))
    pts = [{"t": f"2025Q{i + 1}", "v": iv(m2.group(i + 1))} for i in range(4)]
    pts += [{"t": "2026Q1", "v": iv(m1.group(1))}, {"t": "2026Q2", "v": iv(m1.group(2))}]
    ann = {p["t"]: p["v"] for p in by_id["building-transfers-annual-moi"]["points"]}
    if sum(p["v"] for p in pts[:4]) != ann["2025"]:
        WARNINGS.append("2025 四季值加總與年加總不符")
    m3 = re.search(r"2026（民國 115）\s*\|\s*([\d,]+)（2 季加總）", "\n".join(doc.lines))
    if m3 and iv(m3.group(1)) != pts[4]["v"] + pts[5]["v"]:
        WARNINGS.append("2026 兩季值加總與表 8-1 的 2 季加總不符")
    return finish_series(ctx, dict(
        id="building-transfers-quarterly-moi", zh="建物買賣移轉棟數（季，內政部平台）",
        en="Building sale transfers per quarter (MOI platform)", unit="棟", cadence="quarterly",
        src="來源16", note="內政部地政司登記資料經不動產資訊平台彙整；研究檔只列 114Q1–115Q2"), pts)


def social_progress_table(ctx):
    doc = ctx.doc(STAT)
    tb = doc.pick("9(a) 社會住宅興辦進度")
    m = re.search(r"資料日期 (\d{4}-\d{2}-\d{2})", tb.heading)
    para = doc.first_para("9(a) 社會住宅興辦進度")
    para = re.sub(r"\s*來源 \[來源\d+\]。?$", "", clean(para))
    body_en = {"中央": "Central government", "地方": "Local governments", "小計": "Subtotal"}
    keys = [("existing", "既有"), ("newlyCompleted", "新完工"), ("underConstruction", "興建中"),
            ("achieved", "達成數小計"), ("planned", "規劃中"), ("total", "總計")]
    idx = {k: tb.col(h) for k, h in keys}
    rows = []
    for r in tb.rows:
        region, body = clean(r.cells[0]), clean(r.cells[1])
        reg = {"zh": region, "en": "National total"} if region == "全國合計" else county(region)
        row = {
            "key": f"{region}／{body}", "region": reg["zh"], "body": body,
            "name": {"zh": f"{region}（{body}）", "en": f"{reg['en']} ({body_en[body]})"},
        }
        for k, _ in keys:
            row[k] = num(r.cells[idx[k]])[0]
        rows.append(row)
        if row["existing"] + row["newlyCompleted"] + row["underConstruction"] != row["achieved"]:
            WARNINGS.append(f"社宅進度 {row['key']}：既有＋新完工＋興建中 != 達成數小計")
        if row["achieved"] + row["planned"] != row["total"]:
            WARNINGS.append(f"社宅進度 {row['key']}：達成數＋規劃中 != 總計")
    return {
        "id": "social-housing-progress", "label": {"zh": "全國社會住宅興辦進度", "en": "Social housing progress"},
        "period": m.group(1),
        "columns": [k for k, _ in keys],
        "columnLabels": {k: {"zh": h} for k, h in keys},
        "columnUnits": {k: "戶" for k, _ in keys},
        "source": ctx.source("來源22"),
        "note": para + "；研究檔只列全國合計與六都，其餘縣市逐縣市數字見來源頁",
        "rows": rows,
    }


def rental_table(ctx):
    doc = ctx.doc(STAT)
    ln, text = doc.find_line(r"合計累計媒合 [\d,]+ 戶")
    iv = lambda x: int(x.replace(",", ""))
    mt = re.search(r"合計累計媒合 ([\d,]+) 戶（有效契約數 ([\d,]+) 戶）", text)
    rows = []
    m1 = re.search(r"第 1 期 ([\d,]+)（不分地方／中央）", text)
    rows.append(("1", None, None, iv(m1.group(1))))
    for m in re.finditer(r"第 (\d) 期(?:（[^）]*）)?：地方 ([\d,]+)、中央 ([\d,]+)（合計 ([\d,]+)）", text):
        rows.append((m.group(1), iv(m.group(2)), iv(m.group(3)), iv(m.group(4))))
    rows.sort(key=lambda r: int(r[0]))
    if [r[0] for r in rows] != ["1", "2", "3", "4", "5"]:
        raise ValueError(f"包租代管期數解析失敗：{rows}")
    if sum(r[3] for r in rows) != iv(mt.group(1)):
        WARNINGS.append("包租代管各期合計與累計媒合戶數不符")
    out_rows = [{
        "key": f"phase-{p}", "name": {"zh": f"第 {p} 期", "en": f"Phase {p}"},
        "local": lo, "central": ce, "matched": tot, "effectiveContracts": None,
    } for p, lo, ce, tot in rows]
    out_rows.append({
        "key": "cumulative", "name": {"zh": "累計", "en": "Cumulative"},
        "local": None, "central": None, "matched": iv(mt.group(1)), "effectiveContracts": iv(mt.group(2)),
    })
    return {
        "id": "rental-management-matches", "label": {"zh": "包租代管累計媒合戶數", "en": "Rental management scheme: cumulative matched households"},
        "period": "2026-10-31",
        "columns": ["local", "central", "matched", "effectiveContracts"],
        "columnLabels": {"local": {"zh": "地方"}, "central": {"zh": "中央"},
                         "matched": {"zh": "媒合戶數（合計）"}, "effectiveContracts": {"zh": "有效契約數"}},
        "columnUnits": {"local": "戶", "central": "戶", "matched": "戶", "effectiveContracts": "戶"},
        "source": ctx.source("來源22"),
        "note": "第 5 期為中央版 114-10-01 起（地方版各縣市開辦日不同）；第 1 期不分地方／中央；"
                "第 1 至 4 期媒合期間已截止，數據不再更新；有效契約數指租賃契約仍有效戶數，與累計媒合不可混加",
        "rows": out_rows,
    }


def plan_targets_table(ctx):
    doc = ctx.doc(STAT)
    ln, text = doc.find_line(r"^目標（原文）：依行政院")
    m1 = re.search(r"第一階段 (\d+) 年達成政府直接興建 (\d+) 萬戶及包租代管 (\d+) 萬戶，合計 (\d+) 萬戶", text)
    m2 = re.search(r"第二階段 (\d+) 年達成政府直接興建 (\d+) 萬戶（含容積獎勵補充）及包租代管 (\d+) 萬戶，合計 (\d+) 萬戶", text)
    if not (m1 and m2):
        raise ValueError("社宅目標句型解析失敗")
    rows = []
    for n, m in (("1", m1), ("2", m2)):
        rows.append({
            "key": f"stage-{n}", "name": {"zh": f"第{'一' if n == '1' else '二'}階段", "en": f"Stage {n}"},
            "targetYear": int(m.group(1)) + 1911, "directBuild": int(m.group(2)),
            "rentalManagement": int(m.group(3)), "total": int(m.group(4)),
        })
    return {
        "id": "social-housing-plan-targets", "label": {"zh": "社會住宅興辦計畫目標（106–113 年）", "en": "Social housing plan targets (2017–2024)"},
        "period": "2017-2024",
        "columns": ["targetYear", "directBuild", "rentalManagement", "total"],
        "columnLabels": {"targetYear": {"zh": "達成年度"}, "directBuild": {"zh": "政府直接興建"},
                         "rentalManagement": {"zh": "包租代管"}, "total": {"zh": "合計"}},
        "columnUnits": {"targetYear": "年", "directBuild": "萬戶", "rentalManagement": "萬戶", "total": "萬戶"},
        "source": ctx.source("來源23"),
        "note": "依行政院 106 年 3 月 6 日核定之「社會住宅興辦計畫」；第二階段政府直接興建含容積獎勵補充；"
                "目標與達成口徑不同（興建中尚未供住、媒合累計不等於有效契約），不可直接加總成「達成 20 萬戶」",
        "rows": rows,
    }


def concentration_series(ctx):
    doc = ctx.doc(CBC)
    tb = doc.pick("五之二、不動產貸款集中度")
    ci, ni = tb.col("集中度(%)"), tb.col("備註")
    pts = []
    for r in tb.rows:
        label = clean(r.cells[0])
        note_col = clean(r.cells[ni])
        if "舊口徑" in note_col or "/" in label:
            continue  # 舊口徑（2010 年）與現行口徑不同，不混進同一序列
        t = parse_t("iso", label)
        v, rest = num(r.cells[ci])
        if t is None or v is None:
            continue
        pt = {"t": t, "v": v}
        notes = [x for x in [rest.strip("（）"), note_col] if x]
        if notes:
            pt["note"] = "；".join(notes)
        pts.append(pt)
    return finish_series(ctx, dict(
        id="real-estate-credit-concentration", zh="不動產貸款集中度（全體銀行）",
        en="Real-estate credit concentration (all banks)", unit="%", cadence="irregular", src="S32",
        bounds=[0, 100],
        note="（購置住宅貸款＋房屋修繕貸款＋建築貸款）／總放款；央行無單一連續序列檔，這裡只收新聞稿與簡報公布的時點值；"
             "各時點出處見研究檔五之二表（點的 note 欄）；2010 年舊口徑時點值與現行口徑不同，未收",
    ), pts)


def credit_tables(ctx):
    doc = ctx.doc(CBC)
    ids = lambda s: re.findall(r"\[(S\d+)\]", s)

    def srcs(refs):
        return [dict(ref=r, **ctx.source(r)) for r in refs]

    rows = []

    def first_date(s):
        m = ISO_RE.search(s)
        return m.group(0) if m else None

    # 第一輪
    for r in doc.pick("一之一、第一輪").rows:
        meeting, eff, content, sc = [clean(c) for c in r.cells]
        eff_d = eff if ISO_RE.fullmatch(eff) else None
        rows.append({
            "date": eff_d or first_date(meeting), "effectiveDate": eff_d, "meeting": meeting,
            "round": 1, "kind": "rule", "wave": None, "scheduled": False,
            "summary": {"zh": content}, "refs": ids(sc),
        })
    # 第二輪
    for r in doc.pick("一之二、第二輪").rows:
        wave, meeting, eff, content, sc = [clean(c) for c in r.cells]
        eff_d = eff if ISO_RE.fullmatch(eff) else None
        rows.append({
            "date": eff_d or first_date(meeting), "effectiveDate": eff_d, "meeting": meeting,
            "round": 2, "kind": "rule", "wave": wave if wave.startswith("第") else None,
            "scheduled": False, "summary": {"zh": content}, "refs": ids(sc),
        })
    # 非條文類措施與各季決議
    for r in doc.pick("一之三、非條文類措施").rows:
        date, event, sc = [clean(c) for c in r.cells]
        rows.append({
            "date": first_date(date), "effectiveDate": None, "meeting": date,
            "round": None, "kind": "event", "wave": None, "scheduled": "預定" in date,
            "summary": {"zh": event}, "refs": ids(sc),
        })
    rows = sorted(enumerate(rows), key=lambda p: (p[1]["date"], p[0]))
    rows = [r for _, r in rows]
    seen = {}
    for r in rows:
        k = f"{r['date']}-{r['kind']}"
        seen[k] = seen.get(k, 0) + 1
        r["key"] = k if seen[k] == 1 else f"{k}-{seen[k]}"
        r["sources"] = srcs(r["refs"])
        if not r["sources"] or not r["date"]:
            raise ValueError(f"時間線列缺日期或來源：{r}")
    timeline = {
        "id": "selective-credit-controls-timeline",
        "label": {"zh": "央行不動產選擇性信用管制時間線（2009–2026）", "en": "CBC selective credit controls on real estate: timeline"},
        "period": "2009-10/2026-09",
        "columns": ["date", "effectiveDate", "meeting", "round", "kind", "wave", "scheduled", "summary", "refs"],
        "source": ctx.source("S2"),
        "note": "round=1 為 2009 年底至 2016 年（央行稱「針對性審慎措施」）；round=2 為 2020-12 起（央行稱「選擇性信用管制」）；"
                "wave 為央行自己的「第 N 度」稱法，央行未標的不編號；kind=event 為非條文類措施與各季理監事會決議；"
                "scheduled=true 為預定日期（晚於 2026-11-10）",
        "rows": rows,
    }

    # 現行規定表
    tb = doc.pick("二、現行規定表")
    m = re.search(r"截至 (\d{4}-\d{2}-\d{2})", tb.heading)
    m2 = re.search(r"規定自 (\d{4}-\d{2}-\d{2}) 生效", tb.heading)
    rrows = []
    for r in tb.rows:
        item, rule, cite = [clean(c) for c in r.cells]
        indent = item.startswith("─")
        refs = ids(cite)
        rrows.append({
            "key": item.lstrip("─").strip(), "level": 1 if indent else 0,
            "rule": {"zh": rule}, "cite": re.sub(r"\s*\[S\d+\]", "", cite).strip(),
            "refs": refs, "sources": srcs(refs),
        })
    current = {
        "id": "current-credit-control-rules", "label": {"zh": "現行不動產抵押貸款業務規定", "en": "Current CBC real-estate mortgage rules"},
        "period": m.group(1), "effectiveDate": m2.group(1),
        "columns": ["level", "rule", "cite", "refs"],
        "source": ctx.source("S11"),
        "note": "period 為研究檔截止日；規定自 effectiveDate 生效；標【推讀】處為研究檔自行讀出，原文沒有逐字寫；下次理監事會預定 2026-12-17",
        "rows": rrows,
    }

    # 條件矩陣
    tb = doc.pick("一之四、各版規定的條件矩陣")
    keys = ["corporate", "highPrice", "firstHome", "secondHome", "thirdHomePlus", "landLoan", "unsoldLoan", "industrialLand"]
    labels = tb.header[1:9]
    mrows = []
    for r in tb.rows:
        cells = [clean(c) for c in r.cells]
        d = first_date(cells[0])
        refs = ids(cells[9])
        row = {"key": d, "date": d, "current": "現行" in cells[0]}
        for k, c in zip(keys, cells[1:9]):
            row[k] = c
        row["refs"] = refs
        row["sources"] = srcs(refs)
        mrows.append(row)
    matrix = {
        "id": "ltv-conditions-by-effective-date", "label": {"zh": "各版規定的條件矩陣", "en": "Rule conditions by effective date"},
        "period": "2020-12-08/2026-09-18",
        "columns": keys, "columnLabels": {k: {"zh": h} for k, h in zip(keys, labels)},
        "source": ctx.source("S2"),
        "note": "成數＝貸款額度占「鑑價或買賣金額較低者」之上限；購地為「取得成本與鑑價較低者」；餘屋與工業區為「鑑價金額」；"
                "文字格內容照研究檔，未再拆數字",
        "rows": mrows,
    }
    return [timeline, current, matrix]


# --------------------------------------------------------------------------
# 組裝
# --------------------------------------------------------------------------
def compact(x):
    return json.dumps(x, ensure_ascii=False, separators=(", ", ": "))


COMPACT_KEYS = {"points", "rows", "levels"}


def fmt(o, lvl=0, key=None):
    pad = "  " * lvl
    if isinstance(o, dict):
        if not o:
            return "{}"
        items = [f'{pad}  {json.dumps(k, ensure_ascii=False)}: {fmt(v, lvl + 1, k)}' for k, v in o.items()]
        return "{\n" + ",\n".join(items) + f"\n{pad}}}"
    if isinstance(o, list):
        if not o:
            return "[]"
        if all(not isinstance(x, (dict, list)) for x in o):
            return compact(o)
        if key in COMPACT_KEYS:
            return "[\n" + ",\n".join(pad + "  " + compact(x) for x in o) + f"\n{pad}]"
        return "[\n" + ",\n".join(pad + "  " + fmt(x, lvl + 1) for x in o) + f"\n{pad}]"
    return json.dumps(o, ensure_ascii=False)


def build_all():
    ctx = Ctx()
    files = {}

    def series_list(doc_name, specs):
        out = []
        for s in specs:
            r = build_series(ctx, doc_name, s)
            if r:
                out.append(r)
        return out

    def tables_list(doc_name, specs):
        return [build_table(ctx, doc_name, t) for t in specs]

    def pack(name, series, tables, docs, extra=None):
        d = {
            "$comment": "由 scripts/tools/build-housing-data.py 從 "
                        + "、".join(f"reports/research/2026-11/{x}" for x in docs)
                        + " 產生，勿手改",
            "retrieved": RETRIEVED,
            "series": [s for s in series if s],
            "tables": tables,
        }
        if extra:
            d.update(extra)
        files[name] = d

    # affordability
    aff = series_list(STAT, AFFORD_SERIES)
    # 交叉檢查：表 1-1 的全國 Q4 必須等於表 1-2 的全國季序列
    t11 = ctx.doc(STAT).pick(**T11)
    q4 = {p["t"]: p["v"] for p in aff[0]["points"]}
    ci = t11.col("全國 房價所得比（倍）")
    for r in t11.rows:
        t = parse_t("q_or_y4", r.cells[0])
        if t in q4 and num(r.cells[ci])[0] != q4[t]:
            WARNINGS.append(f"表 1-1 與 1-2 的全國房價所得比在 {t} 不一致")
    pack("affordability.json", aff, tables_list(STAT, AFFORD_TABLES), [STAT], afford_extra(ctx))
    # price-index
    pack("price-index.json", series_list(STAT, PRICE_SERIES), [], [STAT])
    # rates
    pack("rates.json", series_list(CBC, RATES_SERIES), [], [CBC])
    # credit-controls
    pack("credit-controls.json", [], credit_tables(ctx), [CBC])
    # lending
    ls = series_list(CBC, LENDING_SERIES)
    ls.append(concentration_series(ctx))
    pack("lending.json", ls, tables_list(CBC, LENDING_TABLES), [CBC])
    # transactions
    ts = series_list(STAT, TX_SERIES)
    by_id = {s["id"]: s for s in ts}
    ts.insert(2, tx_quarterly(ctx, by_id))
    pack("transactions.json", ts, [], [STAT])
    # vacancy
    pack("vacancy.json", series_list(STAT, VACANCY_SERIES), tables_list(STAT, VACANCY_TABLES), [STAT])
    # social-housing
    pack("social-housing.json", series_list(STAT, SOCIAL_SERIES),
         [social_progress_table(ctx), rental_table(ctx), plan_targets_table(ctx)], [STAT])
    # income
    pack("income.json", series_list(STAT, INCOME_SERIES), [], [STAT])
    # stock
    ss = series_list(STAT, STOCK_SERIES) + stock_extra_series(ctx)
    pack("stock.json", ss, tables_list(STAT, STOCK_TABLES), [STAT])
    # tax
    pack("tax.json", series_list(STAT, TAX_SERIES), [], [STAT])

    # 組內容：把 docs 依實際用到的順序固定（STAT 在前）
    return {name: fmt(d) + "\n" for name, d in files.items()}, files


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="重算後與現有檔比對，不一致 exit 1")
    args = ap.parse_args()
    texts, files = build_all()
    for w in WARNINGS:
        print(f"WARN {w}", file=sys.stderr)
    for m in MISSING:
        print(f"MISSING {m}", file=sys.stderr)
    if args.check:
        bad = []
        for name, text in texts.items():
            p = OUT / name
            # 比內容不比位元組：pre-commit 的 prettier 會重排 JSON 版面
            if not p.exists() or json.loads(p.read_text(encoding="utf-8")) != json.loads(text):
                bad.append(name)
        if bad:
            print(f"housing data 與研究檔不一致或缺檔：{', '.join(bad)}", file=sys.stderr)
            sys.exit(1)
        print("housing data 與研究檔一致")
        return
    OUT.mkdir(parents=True, exist_ok=True)
    for name, text in texts.items():
        (OUT / name).write_text(text, encoding="utf-8")
        d = files[name]
        npts = sum(len(s["points"]) for s in d["series"])
        nrows = sum(len(t["rows"]) for t in d["tables"])
        print(f"{name}: {len(d['series'])} series / {npts} points, {len(d['tables'])} tables / {nrows} rows")


if __name__ == "__main__":
    main()
