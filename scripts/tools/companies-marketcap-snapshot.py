#!/usr/bin/env python3
"""企業版圖市值快照（可重現）。

市值 = 最近交易日收盤價 × 已發行普通股數（不含特別股）。
資料源（皆為官方 OpenAPI）：
  上市收盤價   https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL
  上市基本資料 https://openapi.twse.com.tw/v1/opendata/t187ap03_L   （已發行普通股數或TDR原股發行股數）
  上櫃收盤價   https://www.tpex.org.tw/openapi/v1/tpex_mainboard_daily_close_quotes
  上櫃基本資料 https://www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O （IssueShares）
不含興櫃。ETF 不在基本資料表內，自然排除。

用法：python3 scripts/tools/companies-marketcap-snapshot.py [--out PATH] [--top 80]
輸出單位：億 TWD（與 dataConfig.ts 一致）。
"""
import argparse, json, ssl, urllib.request, datetime, sys

URLS = {
    'twse_day': 'https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL',
    'twse_basic': 'https://openapi.twse.com.tw/v1/opendata/t187ap03_L',
    'tpex_day': 'https://www.tpex.org.tw/openapi/v1/tpex_mainboard_daily_close_quotes',
    'tpex_basic': 'https://www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O',
}

def fetch(url):
    for _ in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'taiwan-md-snapshot', 'Accept': 'application/json'})
            with urllib.request.urlopen(req, timeout=120, context=ssl.create_default_context()) as r:
                return json.loads(r.read().decode('utf-8'))
        except Exception as e:  # retry (TPEx 偶爾回傳被截斷的 JSON)
            err = e
    raise SystemExit(f'fetch failed {url}: {err}')

def num(s):
    try:
        return float(str(s).replace(',', ''))
    except ValueError:
        return None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', default=None)
    ap.add_argument('--top', type=int, default=80)
    a = ap.parse_args()
    d = {k: fetch(u) for k, u in URLS.items()}

    rows, dates = {}, set()
    for r in d['twse_day']:
        p = num(r['ClosingPrice'])
        if p:
            rows[r['Code']] = {'code': r['Code'], 'price': p, 'date': r['Date'], 'market': 'TWSE'}
            dates.add(('TWSE', r['Date']))
    for r in d['tpex_day']:
        p = num(r['Close'])
        if p and r['SecuritiesCompanyCode'] not in rows:
            rows[r['SecuritiesCompanyCode']] = {'code': r['SecuritiesCompanyCode'], 'price': p, 'date': r['Date'], 'market': 'TPEx'}
            dates.add(('TPEx', r['Date']))

    out = []
    for r in d['twse_basic']:
        c = r['公司代號']; x = rows.get(c)
        sh = num(r['已發行普通股數或TDR原股發行股數'])
        if x and sh:
            out.append({**x, 'name': r['公司簡稱'], 'full_name': r['公司名稱'], 'shares': int(sh), 'industry_code': r['產業別'], 'founded': r['成立日期']})
    for r in d['tpex_basic']:
        c = r['SecuritiesCompanyCode']; x = rows.get(c)
        sh = num(r['IssueShares'])
        if x and x['market'] == 'TPEx' and sh:
            out.append({**x, 'name': r['CompanyAbbreviation'], 'full_name': r['CompanyName'], 'shares': int(sh), 'industry_code': r['SecuritiesIndustryCode'], 'founded': r['DateOfIncorporation']})
    for o in out:
        o['market_cap_100m'] = round(o['price'] * o['shares'] / 1e8)
    out.sort(key=lambda o: -o['market_cap_100m'])
    for i, o in enumerate(out, 1):
        o['rank'] = i
    twse_total = sum(o['market_cap_100m'] for o in out if o['market'] == 'TWSE')
    tpex_total = sum(o['market_cap_100m'] for o in out if o['market'] == 'TPEx')
    top50 = sum(o['market_cap_100m'] for o in out[:50])
    res = {
        'generated': datetime.datetime.now().isoformat(timespec='seconds'),
        'trading_dates': sorted(f'{m}:{x}' for m, x in dates),
        'method': 'close * issued common shares; unit 100M TWD; TWSE+TPEx listed common stocks (no emerging board, no ETF)',
        'sources': URLS,
        'twse_total_100m': twse_total, 'tpex_total_100m': tpex_total,
        'top50_total_100m': top50,
        'top50_share_of_listed_pct': round(top50 / (twse_total + tpex_total) * 100, 2),  # 上市+上櫃
        'top10_share_of_twse_pct': round(sum(o['market_cap_100m'] for o in out[:10]) / twse_total * 100, 2),
        'top10_all_twse': all(o['market'] == 'TWSE' for o in out[:10]),
        'tsmc_share_of_twse_pct': round(next(o for o in out if o['code'] == '2330')['market_cap_100m'] / twse_total * 100, 2),
        'top': out[:a.top],
    }
    s = json.dumps(res, ensure_ascii=False, indent=1)
    if a.out:
        open(a.out, 'w', encoding='utf-8').write(s)
    for o in out[:a.top]:
        print(o['rank'], o['code'], o['name'], o['market'], o['price'], o['market_cap_100m'])
    print({k: v for k, v in res.items() if k != 'top'}, file=sys.stderr)

if __name__ == '__main__':
    main()
