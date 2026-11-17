#!/usr/bin/env python3
"""把研究檔（data/industry/research/*.json）整理成頁面用的數列檔 src/data/industry/series.json。

頁面（/industry）只讀 series.json；研究檔保留每個數字的原文片段供查證。
每個數列帶 unit、source（url／title／publisher／period／accessed）。研究檔裡是 null 的點照樣是 null，
這支腳本不補值、不內插。缺的研究檔會讓對應數列整組缺席並印出警告（頁面會顯示「沒有資料」）。

用法：python3 scripts/tools/build-industry-data.py
"""
import json, pathlib, datetime, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
RES = ROOT / 'data/industry/research'
OUT = ROOT / 'src/data/industry/series.json'
warn = []


def load(name):
    p = RES / f'{name}.json'
    if not p.exists():
        warn.append(f'缺研究檔 {name}.json')
        return None
    return json.loads(p.read_text())


def src(s, **over):
    if not s:
        return None
    o = {k: s.get(k) for k in ('url', 'title', 'publisher', 'period', 'accessed') if s.get(k)}
    o.update(over)
    return o


out = {'generated': datetime.date.today().isoformat()}

# ── 出口（財政部） ─────────────────────────────────────────────────
ex = load('exports')
if ex:
    PROD = [
        ('ec', '電子零組件'), ('ict', '資通與視聽產品'), ('metal', '基本金屬及其製品'),
        ('machinery', '機械'), ('plastics', '塑膠、橡膠及其製品'), ('chem', '化學品'),
        ('mineral', '礦產品'), ('textile', '紡織品'), ('optics', '光學及精密儀器（光學器材）'),
        ('transport', '運輸工具'), ('electrical', '電機產品'),
    ]
    by = ex['byProduct']['byYear']
    years = sorted(int(y) for y in by)
    out['exportProducts'] = {
        'unit': '占出口總值 %',
        'years': years,
        'rows': [{'id': i, 'zh': zh, 'values': [by[str(y)].get(zh, {}).get('sharePct') if isinstance(by[str(y)].get(zh), dict) else None for y in years]} for i, zh in PROD],
        'source': src(ex['byProduct']['source'], url=ex['byProduct']['source'].get('shareUrl') or ex['byProduct']['source']['url']),
    }
    MK = [('cnhk', '中國大陸與香港'), ('us', '美國'), ('asean', '東協十國'), ('jp', '日本'), ('eu', '歐洲')]
    bm = ex['byMarket']['byYear']
    myears = sorted(int(y) for y in bm)
    out['exportMarkets'] = {
        'unit': '占出口總值 %（依財政部國別出口值自算）',
        'years': myears,
        'rows': [{'id': i, 'zh': zh, 'values': [bm[str(y)][zh]['sharePct_computed'] for y in myears]} for i, zh in MK],
        'source': src(ex['byMarket']['source']),
    }
    tb = ex['totals']['byYear']
    out['exportTotals'] = {
        'unit': '億美元（出口＋復出口）',
        'years': sorted(int(y) for y in tb),
        'values': [tb[y]['exportTotalUsd100M'] for y in sorted(tb)],
        'ytd2026': {'period': ex['totals']['ytd2026']['period'], 'value': ex['totals']['ytd2026']['exportTotalUsd100M']},
        'source': src(ex['totals']['source']),
    }
    lh = ex['longHistory']['byYear']
    lyears = sorted(int(y) for y in lh)
    out['exportLongHistory'] = {
        'unit': '占出口 %',
        'years': lyears,
        'rows': [
            {'id': 'agri', 'zh': '農產品', 'values': [lh[str(y)]['agriculturalPct'] for y in lyears]},
            {'id': 'proc', 'zh': '農產加工品', 'values': [lh[str(y)]['processedAgriculturalPct'] for y in lyears]},
            {'id': 'ind', 'zh': '工業產品', 'values': [lh[str(y)]['industrialPct'] for y in lyears]},
        ],
        'source': src(ex['longHistory']['source']),
    }

# ── GDP 結構（主計總處） ───────────────────────────────────────────
gd = load('gdp-structure')
if gd:
    t = gd['threeSectors']
    ys = sorted(int(y) for y in t if y.isdigit())
    first_src = next((t[str(y)].get('source') for y in ys if t[str(y)].get('source')), None)
    out['gdpSectors'] = {
        'unit': '占名目 GDP（生產面）%',
        'years': ys,
        'rows': [{'id': k, 'values': [t[str(y)].get(k) for y in ys]} for k in ('agriculture', 'industry', 'services')],
        'manufacturing': [t[str(y)].get('manufacturing') for y in ys],
        'source': src(first_src, title='國民所得統計常用資料：國內各業生產毛額（名目）') or {'url': 'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/生產帳_季_對外發布版(060a).xlsx', 'title': '國民所得統計常用資料：生產帳', 'publisher': '行政院主計總處', 'accessed': gd.get('accessed')},
    }
    e = gd['electronics']
    eys = sorted(int(y) for y in e if y.isdigit() and e[y])
    esrc = next((e[str(y)].get('source') for y in eys if e[str(y)].get('source')), None)
    out['gdpElectronics'] = {
        'unit': '占名目 GDP（生產面）%',
        'years': eys,
        'rows': [
            {'id': 'components', 'zh': '電子零組件製造業', 'values': [e[str(y)]['electronic_components_CR_pct'] for y in eys]},
            {'id': 'computers', 'zh': '電腦、電子產品及光學製品製造業', 'values': [e[str(y)]['computer_electronics_optical_CS_pct'] for y in eys]},
        ],
        'missing': {'2025': e.get('_null_reason_2025')},
        'source': src(esrc, title='國民所得統計：國內各業生產毛額（年資料，按行業細分）') or {'url': 'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/生產帳_年_對外發布版(056).xlsx', 'title': '國民所得統計：生產帳（年，按行業細分）', 'publisher': '行政院主計總處', 'accessed': gd.get('accessed')},
    }
    a = gd['gdpLevel']['annual']
    gys = sorted(int(y) for y in a)
    f = gd['gdpLevel']['forecast_2026']
    out['gdpLevel'] = {
        'years': gys,
        'nominalTwd100M': [a[str(y)]['nominal_gdp_100m_twd'] for y in gys],
        'perCapitaUsd': [a[str(y)]['gdp_per_capita_usd'] for y in gys],
        'realGrowthPct': [a[str(y)]['real_growth_pct'] for y in gys],
        'forecast2026': {'realGrowthPct': f['real_growth_pct'], 'perCapitaUsd': f['gdp_per_capita_usd'], 'released': f['release_date'], 'source': src(f['source'])},
        'source': src(a[str(gys[-1])]['source']),
    }
    em = gd['employment']
    emy = sorted(int(y) for y in em if y.isdigit() and isinstance(em[y], dict) and em[y].get('agriculture_pct') is not None)
    out['employment'] = {
        'unit': '占就業人口 %',
        'years': emy,
        'rows': [{'id': k, 'values': [em[str(y)].get(f'{k}_pct') for y in emy]} for k in ('agriculture', 'industry', 'services')],
        'sources': {str(y): src(em[str(y)].get('source')) for y in emy},
    }

# ── 科學園區與縣市（國科會、經濟部統計處） ─────────────────────────
pk = load('parks-counties')
if pk:
    allrows = [r for r in pk['parksRevenue']['series'] if r.get('total') is not None]
    # 只畫全年；半年數（period_note 不是 1 月到 12 月）另放 partial，圖上不畫
    full = lambda r: '1月' in (r.get('period_note') or '') and '12月' in (r.get('period_note') or '')
    s = [r for r in allrows if full(r)]
    partial = [r for r in allrows if not full(r)]
    out['parksRevenue'] = {
        'unit': '新臺幣億元',
        'years': [r['year'] for r in s],
        'rows': [{'id': k, 'values': [r[k] for r in s]} for k in ('hsinchu', 'central', 'southern')],
        'total': [r['total'] for r in s],
        'employees': {'years': [e['year'] for e in pk['parksRevenue']['employees']], 'values': [e['total'] for e in pk['parksRevenue']['employees']], 'months': [e['month'] for e in pk['parksRevenue']['employees']]},
        'partial': [{'year': r['year'], 'period': (r.get('period_note') or '').strip(), 'total': r['total']} for r in partial],
        'source': src(s[-1]['source']),
        'crossCheck': [src(c) for c in pk['parksRevenue'].get('crossCheck', [])],
    }
    f = pk['factoriesByCounty']
    out['factoriesByCounty'] = {
        'dataYear': 2024,
        'national': f['nationalTotalPublished'],
        'rows': [{'county': r['county'], 'factories': r['operatingFactories'], 'revenue100M': r['revenue100M'], 'employees': r['employeesYearEnd']} for r in f['rows']],
        'source': src(f['source']),
    }
    out['parksBases'] = [{'park': b['park'], 'name': b['name'], 'county': b['county'], 'year': b['yearApprovedOrOpened'], 'industry': b['industry'], 'url': (b.get('source') or {}).get('url')} for b in pk['parksBases']['bases']]
    out['techParks'] = [{'name': p['name'], 'county': p['county'], 'year': p['yearEstablished'] if p.get('yearSourceOfficial') else None, 'url': (p.get('source') or {}).get('url')} for p in pk['techIndustrialParks']['parks']]

# ── 市值快照（沿用 /companies 的快照中間檔，口徑：收盤價 × 已發行普通股數） ──
SNAP = ROOT / 'reports/research/2026-10/companies-snapshot-20261022.json'
sn = json.loads(SNAP.read_text())
d8 = sn['trading_dates'][0].split(':')[1]
out['marketSnapshot'] = {
    'date': f'{int(d8[:3]) + 1911}-{d8[3:5]}-{d8[5:]}',
    'twseTotal100M': sn['twse_total_100m'],
    'tpexTotal100M': sn['tpex_total_100m'],
    'listedTotal100M': sn['twse_total_100m'] + sn['tpex_total_100m'],
    'top50Total100M': sn['top50_total_100m'],
    'tsmcShareOfTwsePct': sn['tsmc_share_of_twse_pct'],
    'top10ShareOfTwsePct': round(sn['top10_share_of_twse_pct'], 1),
    'method': sn['method'],
    'sources': [
        {'url': sn['sources']['twse_day'], 'title': '上市個股日收盤價（STOCK_DAY_ALL）與公司基本資料（t187ap03_L）', 'publisher': '臺灣證券交易所 OpenAPI', 'period': '2026-10-22 收盤', 'accessed': sn['generated'][:10]},
        {'url': sn['sources']['tpex_day'], 'title': '上櫃個股日收盤行情與公司基本資料', 'publisher': '證券櫃檯買賣中心 OpenAPI', 'period': '2026-10-22 收盤', 'accessed': sn['generated'][:10]},
    ],
}

# ── 半導體（TSIA、台積電） ─────────────────────────────────────────
sc = load('semiconductor-output')
if sc:
    yrs = [r for r in sc['icOutput']['years'] if not r.get('is_estimate')]
    last_src = sc['sources'][yrs[-1]['source']]
    est = sc['icOutput']['estimate_2026'][0]
    out['icOutput'] = {
        'unit': '新臺幣億元',
        'definition': sc['icOutput']['definition'],
        'years': [r['year'] for r in yrs],
        'rows': [{'id': k, 'values': [r[k] for r in yrs]} for k in ('design', 'foundry', 'memory_and_other', 'packaging', 'testing')],
        'total': [r['total'] for r in yrs],
        'yoyPct': [r['yoy_pct'] for r in yrs],
        'estimate2026': {'total': est['total'], 'yoyPct': est['yoy_pct'], 'vintage': est['vintage'], 'source': src(sc['sources'][est['source']])},
        'source': src(last_src, title='台灣 IC 產業營運成果（各年新聞稿）'),
        'sourcesByYear': {str(r['year']): sc['sources'][r['source']]['url'] for r in yrs},
    }
    t = sc['tsmc']
    ty = [r for r in t['years']]
    out['tsmc'] = {
        'years': [r['year'] for r in ty],
        'revenueTwd100M': [round(r['revenue_ntd_100m']) if r.get('revenue_ntd_100m') else None for r in ty],
        'capexUsdMillion': [r.get('capex_usd_million') for r in ty],
        'advanced7nmPct': [r.get('advanced_7nm_and_below_pct_of_wafer_revenue') for r in ty],
        'employees': [r.get('employees_year_end') for r in ty],
        'platform2025': {k: t['platform_share_2025'][k] for k in ('HPC', 'smartphone', 'IoT', 'automotive', 'DCE', 'others')},
    }

# ── 市值歷史（證交所） ─────────────────────────────────────────────
mh = load('marketcap-history')
if mh:
    ty = mh['top10ByYear']['years']
    PICK = ['2005', '2010', '2015', '2020', '2025']
    allyears = sorted(y for y, v in ty.items() if isinstance(v, dict) and v.get('top10'))
    tw = [r for r in mh['tsmcWeight']['byYear'] if r.get('shareOfOfficialTotalPct') is not None]
    out['marketHistory'] = {
        'basis': '各年最後一個交易日；市值＝當日收盤價 × 當日已發行股數（證交所 MI_QFIIS 的發行股數），只含上市（集中市場）',
        'depth': 10,
        'pick': PICK,
        'years': [{
            'label': y, 'date': f"{ty[y]['date'][:4]}-{ty[y]['date'][4:6]}-{ty[y]['date'][6:]}",
            'top': [{'code': x['code'], 'name': x['name'], 'cap100M': x['marketCapTwd100M']} for x in ty[y]['top10']],
            'top10SharePct': ty[y]['top10ShareOfOfficialTotalPct'],
            'tsmcSharePct': ty[y]['tsmcShareOfOfficialTotalPct'],
            'listedTotal100M': ty[y]['totalListedMarketCapOfficialTwd100M'],
        } for y in allyears],
        'tsmcShare': {'unit': '占上市總市值 %（年底）', 'years': [r['year'] for r in tw], 'values': [r['shareOfOfficialTotalPct'] for r in tw]},
        'missing': mh['top10ByYear'].get('nullYears'),
        'verification': mh['top10ByYear'].get('verification'),
        'source': {'url': 'https://www.twse.com.tw/zh/trading/foreign/mi-qfiis.html', 'title': '外資及陸資投資持股統計（發行股數）與每日收盤行情，逐年年底', 'publisher': '臺灣證券交易所', 'period': '2004–2025 各年底', 'accessed': mh.get('accessed')},
        'verificationSource': [src(v) for v in mh['top10ByYear'].get('verificationSource', [])],
        'foreignHolding': [{'year': r['year'], 'pct': r['pct'], 'url': r['source']['url']} for r in mh['investors']['foreignHoldingShareOfMarketCap']['official']],
    }

OUT.parent.mkdir(parents=True, exist_ok=True)
EXTRA = ROOT / 'data/industry/series-extra.json'  # 半導體與市值兩組由人工審過後整理（結構不固定）
if EXTRA.exists():
    out.update(json.loads(EXTRA.read_text()))
out.pop('_semiconductorRaw', None)
OUT.write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n')
print('wrote', OUT.relative_to(ROOT), 'keys:', [k for k in out if k != 'generated'])
for w in warn:
    print('⚠️', w, file=sys.stderr)
