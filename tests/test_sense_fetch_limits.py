"""
test_sense_fetch_limits.py — 感知抓取的列數上限與 #錨點（2026-11-04 evolve）

報告 reports/evolve-2026-11-04.md「五、資料異常」第 1、4、5、6 點：
1. fetch-search-console.py 的 pages 沒濾掉 #錨點網址（佔頁面曝光 11.1%）。
4. fetch-ga4.py 分語言查詢只取前 500 條路徑，小語種的長尾被截掉。
5. fetch-search-console.py 只抓前 2,000 條查詢（覆蓋率 18.1%，全分頁 47.4%）。
6. dashboard searchConsole24h 的 label 七個月停在「2026-04-09 (24h)」。

全部用假的 API 回應驗，不連線、不碰 ~/.config/taiwan-md/cache（快取寫到 tmp_path）。
"""
import importlib.util
import json
import sys
import types
from pathlib import Path
from types import SimpleNamespace

ROOT = Path(__file__).resolve().parents[1]


def _load(name, rel):
    spec = importlib.util.spec_from_file_location(name, ROOT / rel)
    mod = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(mod)
    return mod


SC = _load("fetch_search_console", "scripts/tools/fetch-search-console.py")
GA = _load("fetch_ga4", "scripts/tools/fetch-ga4.py")
GEN = _load("generate_dashboard_analytics", "scripts/tools/generate-dashboard-analytics.py")


# ── Search Console：startRow 分頁 ───────────────────────────────────────────
def _fake_pages(total):
    calls = []

    def fetch(start, limit):
        calls.append((start, limit))
        return [{"keys": [f"q{i}"]} for i in range(start, min(start + limit, total))]

    return fetch, calls


def test_paginate_rows_reads_past_the_old_2000_cap():
    fetch, calls = _fake_pages(5230)
    rows, truncated = SC.paginate_rows(fetch, max_rows=0, page_size=2000)
    assert len(rows) == 5230 and not truncated
    assert [c[0] for c in calls] == [0, 2000, 4000]
    assert rows[-1]["keys"] == ["q5229"]


def test_paginate_rows_exact_multiple_stops_on_empty_page():
    fetch, calls = _fake_pages(4000)
    rows, truncated = SC.paginate_rows(fetch, max_rows=0, page_size=2000)
    assert len(rows) == 4000 and not truncated
    assert [c[0] for c in calls] == [0, 2000, 4000]


def test_paginate_rows_respects_cap_and_reports_truncation():
    fetch, calls = _fake_pages(10_000)
    rows, truncated = SC.paginate_rows(fetch, max_rows=4500, page_size=2000)
    assert len(rows) == 4500 and truncated
    assert calls == [(0, 2000), (2000, 2000), (4000, 500)]


# ── Search Console：#錨點拆出來 ─────────────────────────────────────────────
def test_split_anchor_pages_keeps_real_pages_and_rolls_up_anchors():
    base = "https://taiwan.md/technology/雪山隧道/"
    rows = [
        {"keys": [base], "clicks": 124, "impressions": 12078, "ctr": 0.0103, "position": 5.0},
        {"keys": [base + "#通車那天"], "clicks": 0, "impressions": 20000, "ctr": 0, "position": 4.0},
        {"keys": [base + "#工程"], "clicks": 1, "impressions": 12612, "ctr": 0, "position": 6.0},
        {"keys": ["https://taiwan.md/people/林青霞/"], "clicks": 7, "impressions": 2000, "ctr": 0, "position": 6.1},
    ]
    pages, rollup, stats = SC.split_anchor_pages(rows)
    assert [p["keys"][0] for p in pages] == [base, "https://taiwan.md/people/林青霞/"]
    assert all("#" not in p["keys"][0] for p in pages)
    assert len(rollup) == 1
    r = rollup[0]
    assert r["page"] == base and r["anchor_urls"] == 2
    assert r["clicks"] == 1 and r["impressions"] == 32612
    # 曝光加權平均排名：(4*20000 + 6*12612) / 32612
    assert r["position"] == round((4 * 20000 + 6 * 12612) / 32612, 2)
    assert stats["anchor_urls"] == 2 and stats["anchor_pages"] == 1
    assert stats["anchor_impressions"] == 32612
    assert stats["anchor_share_pct"] == round(32612 / (32612 + 12078 + 2000) * 100, 1)


def test_split_anchor_pages_without_anchors_is_identity():
    rows = [{"keys": ["https://taiwan.md/a/"], "clicks": 1, "impressions": 10, "position": 3}]
    pages, rollup, stats = SC.split_anchor_pages(rows)
    assert pages == rows and rollup == []
    assert stats["anchor_share_pct"] == 0


# ── Search Console：main() 乾跑（假 API，快取寫 tmp）──────────────────────
class _FakeSC:
    """searchanalytics().query(siteUrl, body).execute() with startRow paging."""

    def __init__(self, n_queries, n_pages):
        self.n_queries, self.n_pages = n_queries, n_pages
        self.bodies = []

    def searchanalytics(self):
        return self

    def query(self, siteUrl, body):
        self.bodies.append(body)
        self._body = body
        return self

    def execute(self):
        b = self._body
        dims = b["dimensions"]
        start, limit = b.get("startRow", 0), b["rowLimit"]
        if not dims:
            return {"rows": [{"clicks": 50, "impressions": 9000, "position": 7.1}]}
        if dims == ["query"]:
            total = self.n_queries if b["startDate"] != b["endDate"] else 30
            mk = lambda i: {"keys": [f"query {i}"], "clicks": 1 if i < 100 else 0,
                            "impressions": 5, "ctr": 0.2, "position": 6.0}
        elif dims == ["page"]:
            total = self.n_pages
            mk = lambda i: {"keys": [f"https://taiwan.md/p/{i // 2}/" + ("#h2" if i % 2 else "")],
                            "clicks": 0, "impressions": 3, "ctr": 0, "position": 5.0}
        else:
            return {"rows": [{"keys": ["x"], "clicks": 1, "impressions": 2, "ctr": 0.5, "position": 1}]}
        return {"rows": [mk(i) for i in range(start, min(start + limit, total))]}


def _install_fake_google(monkeypatch, modules):
    for name, attrs in modules.items():
        mod = types.ModuleType(name)
        for k, v in attrs.items():
            setattr(mod, k, v)
        monkeypatch.setitem(sys.modules, name, mod)
    # parents point at children so `from a.b import c` resolves either way
    for name in modules:
        if "." in name:
            parent, child = name.rsplit(".", 1)
            if parent in sys.modules:
                monkeypatch.setattr(sys.modules[parent], child, sys.modules[name], raising=False)


def _isolate(monkeypatch, mod, tmp_path, argv):
    repo = tmp_path / "repo"
    repo.mkdir()
    creds = tmp_path / "creds"
    creds.mkdir()
    key = creds / "key.json"
    key.write_text("{}")
    monkeypatch.chdir(repo)
    monkeypatch.setattr(mod, "ENV_FILE", tmp_path / "no.env")
    monkeypatch.setattr(mod, "CACHE_DIR", tmp_path / "cache")
    monkeypatch.setattr(mod, "reexec_in_venv", lambda: None)
    monkeypatch.setenv("GOOGLE_APPLICATION_CREDENTIALS", str(key))
    monkeypatch.setattr(sys, "argv", argv)


def test_search_console_main_dry_run(monkeypatch, tmp_path, capsys):
    fake = _FakeSC(n_queries=60_000, n_pages=3_000)
    creds_cls = SimpleNamespace(from_service_account_file=lambda *a, **k: object())
    _install_fake_google(monkeypatch, {
        "googleapiclient": {},
        "googleapiclient.discovery": {"build": lambda *a, **k: fake},
        "google": {},
        "google.oauth2": {},
        "google.oauth2.service_account": {"Credentials": creds_cls},
    })
    _isolate(monkeypatch, SC, tmp_path, ["fetch-search-console.py", "--days", "7"])
    monkeypatch.setenv("SC_SITE_URL", "sc-domain:taiwan.md")
    SC.main()

    out = json.loads((tmp_path / "cache" / "search-console-latest.json").read_text())
    # queries 走完三頁（25,000 × 2 + 10,000），不再停在 2,000
    assert len(out["queries"]) == 60_000
    starts = [b.get("startRow", 0) for b in fake.bodies if b["dimensions"] == ["query"] and b["startDate"] != b["endDate"]]
    assert starts == [0, 25_000, 50_000]
    assert out["fetch_limits"]["query_rows_truncated"] is False
    # pages 不含 #，錨點另存彙總
    assert len(out["pages"]) == 1_500
    assert all("#" not in p["keys"][0] for p in out["pages"])
    assert out["pages_anchor_stats"]["anchor_urls"] == 1_500
    assert out["pages_anchor_stats"]["anchor_share_pct"] == 50.0
    assert len(out["pages_anchor_rollup"]) == 1_500
    # 覆蓋率用的是全部查詢：60,000 × 5 / 9,000
    assert out["totals"]["query_dim_impressions"] == 300_000
    # 最後一天（給 dashboard 24h）
    assert out["last_day"]["date"] == out["period"]["end"]
    assert len(out["last_day"]["queries"]) == 30

    # 產生器把 last_day 接成 searchConsole24h，label 是最後一天
    sec = GEN.build_sc_24h_section(out)
    assert sec["label"] == f"{out['period']['end']} (24h)"
    assert sec["startDate"] == sec["endDate"] == out["period"]["end"] and sec["days"] == 1
    assert sec["totals"]["impressions"] == 9000
    assert len(sec["topQueries"]) == 20


# ── dashboard：searchConsole24h ─────────────────────────────────────────────
def test_sc_24h_section_absent_without_last_day():
    assert GEN.build_sc_24h_section(None) is None
    assert GEN.build_sc_24h_section({"queries": []}) is None
    assert GEN.build_sc_24h_section({"error": "x", "last_day": {"date": "2026-11-02"}}) is None


def test_sc_24h_section_brand_split_and_opportunities():
    sc_raw = {
        "last_day": {
            "date": "2026-11-02",
            "totals": {"clicks": 12, "impressions": 400, "ctr": 0.03, "position": 7.0},
            "queries": [
                {"keys": ["taiwan.md"], "clicks": 10, "impressions": 15, "ctr": 0.6667, "position": 1.0},
                {"keys": ["吃瓜"], "clicks": 2, "impressions": 300, "ctr": 0.0067, "position": 7.9},
                {"keys": ["選舉抽號碼時間"], "clicks": 0, "impressions": 85, "ctr": 0, "position": 5.8},
            ],
        }
    }
    sec = GEN.build_sc_24h_section(sc_raw)
    assert sec["label"] == "2026-11-02 (24h)"
    assert sec["totals"]["ctr"] == 3.0
    assert sec["totals"]["brandClicks"] == 10 and sec["totals"]["brandImpressions"] == 15
    assert sec["totals"]["nonBrandImpressions"] == 385
    assert [o["query"] for o in sec["opportunities"]] == ["選舉抽號碼時間"]
    assert sec["topQueries"][0] == {
        "query": "taiwan.md", "clicks": 10, "impressions": 15, "ctr": 66.67, "position": 1.0,
    }


# ── GA4：分語言查詢不再停在 500 列 ─────────────────────────────────────────
def test_collect_report_rows_pages_with_offset():
    total = 1234
    calls = []

    def run_page(offset, limit):
        calls.append((offset, limit))
        return list(range(offset, min(offset + limit, total))), total, ["h"]

    rows, headers, truncated = GA.collect_report_rows(run_page, page_size=500)
    assert len(rows) == total and headers == ["h"] and not truncated
    assert calls == [(0, 500), (500, 500), (1000, 500)]

    calls.clear()
    rows, _, truncated = GA.collect_report_rows(run_page, max_rows=700, page_size=500)
    assert len(rows) == 700 and truncated
    assert calls == [(0, 500), (500, 200)]


def test_collect_report_rows_empty_report():
    rows, headers, truncated = GA.collect_report_rows(lambda o, l: ([], 0, ["h"]))
    assert rows == [] and headers == ["h"] and not truncated


class _Msg:
    def __init__(self, **kw):
        self.__dict__.update(kw)


class _OrderBy(_Msg):
    MetricOrderBy = _Msg


class _StringFilter(_Msg):
    MatchType = SimpleNamespace(FULL_REGEXP="FULL_REGEXP")


class _Filter(_Msg):
    StringFilter = _StringFilter


def _ga_row(path, views):
    return SimpleNamespace(
        dimension_values=[SimpleNamespace(value=path)],
        metric_values=[SimpleNamespace(value=str(v)) for v in (views, 1, 1, 30.0)],
    )


class _FakeGAClient:
    """run_report(req): only the pagePath-only report (by_lang) has rows."""

    def __init__(self, lang_rows):
        self.lang_rows = lang_rows
        self.lang_calls = []

    def run_report(self, req):
        dims = [d.name for d in req.dimensions] if hasattr(req, "dimensions") else []
        metrics = [SimpleNamespace(name=m.name) for m in getattr(req, "metrics", [])]
        if dims == ["pagePath"] and len(metrics) == 4:
            off, lim = getattr(req, "offset", 0), getattr(req, "limit", None)
            assert lim, "by_lang 每一頁都要帶 limit"
            self.lang_calls.append((off, lim))
            return SimpleNamespace(rows=self.lang_rows[off:off + lim],
                                   row_count=len(self.lang_rows), metric_headers=metrics)
        return SimpleNamespace(rows=[], row_count=0, metric_headers=metrics)


def test_ga4_main_dry_run_keeps_small_language_tail(monkeypatch, tmp_path, capsys):
    # 600 條 zh 熱門路徑排在前面，pt / de 的路徑全在第 500 名之後（舊上限會整段截掉）
    lang_rows = [_ga_row(f"/people/p{i}/", 1000 - i) for i in range(600)]
    lang_rows += [_ga_row(f"/pt/people/x{i}/", 2) for i in range(40)]
    lang_rows += [_ga_row(f"/de/food/y{i}/", 3) for i in range(30)]
    client = _FakeGAClient(lang_rows)
    creds_cls = SimpleNamespace(from_service_account_file=lambda *a, **k: object())
    types_attrs = {n: _Msg for n in ("DateRange", "Dimension", "FilterExpression", "Metric", "RunReportRequest")}
    types_attrs.update(Filter=_Filter, OrderBy=_OrderBy)
    _install_fake_google(monkeypatch, {
        "google": {},
        "google.analytics": {},
        "google.analytics.data_v1beta": {"BetaAnalyticsDataClient": lambda **k: client},
        "google.analytics.data_v1beta.types": types_attrs,
        "google.oauth2": {},
        "google.oauth2.service_account": {"Credentials": creds_cls},
    })
    _isolate(monkeypatch, GA, tmp_path, ["fetch-ga4.py", "--days", "28"])
    monkeypatch.setenv("GA4_PROPERTY_ID", "123")
    GA.main()

    out = json.loads((tmp_path / "cache" / "ga4-latest.json").read_text())
    assert len(out["by_lang_pages"]) == 670
    assert out["by_lang_pages_truncated"] is False
    assert client.lang_calls == [(0, GA.GA4_PAGE_SIZE)]
    by_lang = GEN.aggregate_by_lang(out["by_lang_pages"])
    assert by_lang["pt"]["views"] == 80 and by_lang["pt"]["pageCount"] == 40
    assert by_lang["de"]["views"] == 90
