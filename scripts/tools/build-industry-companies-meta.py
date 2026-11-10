#!/usr/bin/env python3
"""/companies 排行頁的補充欄位（可重現）。

讀兩份官方基本資料表（執行當日版，檔案留在 data/industry/raw/）：
  上市 https://openapi.twse.com.tw/v1/opendata/t187ap03_L        （住址、產業別、上市日期）
  上櫃 https://www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O      （Address、SecuritiesIndustryCode、DateOfListing）
加上 dataConfig.ts 的前 50 名單（10/22 快照）與上一版名單（git 歷史，2026/06 快照），產出
  src/data/industry/companies-meta.json：每家 {county, market, industryCode, industry, listed, prevRank, prevCap}

縣市取自公司登記住址的開頭（上櫃表是英文地址，用城市名對照）。產業別是證交所／櫃買的官方分類代碼。
用法：python3 scripts/tools/build-industry-companies-meta.py [--fetch]
"""
import json, re, subprocess, sys, datetime, urllib.request, ssl, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
RAW = ROOT / 'data/industry/raw'
URLS = {
    'twse': 'https://openapi.twse.com.tw/v1/opendata/t187ap03_L',
    'tpex': 'https://www.tpex.org.tw/openapi/v1/mopsfin_t187ap03_O',
}
PREV_COMMIT = 'e64316b23^'  # 2026/06 快照那一版的 dataConfig.ts
PREV_DATE = '2026-06'

# 證交所／櫃買產業別代碼（公開資訊觀測站「產業別」欄）
INDUSTRY = {
    '01': '水泥工業', '02': '食品工業', '03': '塑膠工業', '04': '紡織纖維', '05': '電機機械',
    '06': '電器電纜', '08': '玻璃陶瓷', '09': '造紙工業', '10': '鋼鐵工業', '11': '橡膠工業',
    '12': '汽車工業', '14': '建材營造', '15': '航運業', '16': '觀光餐旅', '17': '金融保險',
    '18': '貿易百貨', '19': '綜合', '20': '其他', '21': '化學工業', '22': '生技醫療',
    '23': '油電燃氣', '24': '半導體業', '25': '電腦及週邊設備業', '26': '光電業',
    '27': '通信網路業', '28': '電子零組件業', '29': '電子通路業', '30': '資訊服務業',
    '31': '其他電子業', '32': '文化創意業', '33': '農業科技業', '34': '電子商務',
    '35': '綠能環保', '36': '數位雲端', '37': '運動休閒', '38': '居家生活',
}
COUNTIES = ['臺北市', '新北市', '桃園市', '臺中市', '臺南市', '高雄市', '基隆市', '新竹市', '嘉義市',
            '新竹縣', '苗栗縣', '彰化縣', '南投縣', '雲林縣', '嘉義縣', '屏東縣', '宜蘭縣', '花蓮縣',
            '臺東縣', '澎湖縣', '金門縣', '連江縣']
EN = {'Taipei City': '臺北市', 'New Taipei City': '新北市', 'Taoyuan City': '桃園市',
      'Taichung City': '臺中市', 'Tainan City': '臺南市', 'Kaohsiung City': '高雄市',
      'Hsinchu City': '新竹市', 'Hsinchu County': '新竹縣', 'Miaoli County': '苗栗縣',
      'Changhua County': '彰化縣', 'Yunlin County': '雲林縣', 'Keelung City': '基隆市'}


def county_of(addr: str):
    a = addr.replace('台', '臺').replace('巿', '市').replace(' ', '')
    for c in COUNTIES:
        if c in a[:12]:
            return c
    # 科學園區地址常省略縣市：新竹科學園區跨新竹市與新竹縣，無法從字面判定 → 交給人工表
    low = addr.lower()
    for k, v in EN.items():
        if k.lower() in low:
            return v
    return None


def load(name, fetch):
    today = datetime.date.today().strftime('%Y%m%d')
    files = sorted(RAW.glob(f'{name}-*.json'))
    if fetch or not files:
        req = urllib.request.Request(URLS[name], headers={'User-Agent': 'taiwan-md-snapshot'})
        with urllib.request.urlopen(req, timeout=120, context=ssl.create_default_context()) as r:
            data = r.read()
        stem = 'twse-t187ap03_L' if name == 'twse' else 'tpex-mopsfin_t187ap03_O'
        p = RAW / f'{stem}-{today}.json'
        p.write_bytes(data)
        files = [p]
    stem = 'twse-t187ap03_L' if name == 'twse' else 'tpex-mopsfin_t187ap03_O'
    files = sorted(RAW.glob(f'{stem}-*.json'))
    return json.loads(files[-1].read_text()), files[-1].name


def tickers_in(ts: str):
    """依出現順序回傳 [(ticker, marketCap)]（只取 getCompanyConfigs 區塊）。"""
    body = ts.split('export const getCompanyConfigs', 1)[1].split('\n];', 1)[0]
    out = []
    for blk in body.split('\n  {')[1:]:
        t = re.search(r"ticker: '(\w+)'", blk)
        m = re.search(r'marketCap: (\d+)', blk)
        if t and m:
            out.append((t.group(1), int(m.group(1))))
    return out


def fell_off(ts: str):
    body = ts.split('export const getFellOffCompanies', 1)[1]
    return re.findall(r"ticker: '(\w+)'", body)


def main():
    fetch = '--fetch' in sys.argv
    twse, f1 = load('twse', fetch)
    tpex, f2 = load('tpex', fetch)
    basic = {}
    for r in twse:
        basic[r['公司代號']] = dict(market='TWSE', addr=r['住址'], code=r['產業別'].strip(),
                                 listed=r['上市日期'], asof=r['出表日期'])
    for r in tpex:
        basic.setdefault(r['SecuritiesCompanyCode'], dict(
            market='TPEx', addr=r['Address'], code=r['SecuritiesIndustryCode'].strip(),
            listed=r['DateOfListing'], asof=r['Date']))
    cur_ts = (ROOT / 'src/utils/dataConfig.ts').read_text()
    prev_ts = subprocess.run(['git', '-C', str(ROOT), 'show', f'{PREV_COMMIT}:src/utils/dataConfig.ts'],
                             capture_output=True, text=True, check=True).stdout
    cur = tickers_in(cur_ts)
    prev = {t: (i + 1, cap) for i, (t, cap) in enumerate(tickers_in(prev_ts))}
    manual = json.loads((ROOT / 'data/industry/companies-county-manual.json').read_text())
    manual = {k: v for k, v in manual.items() if not k.startswith('_')}
    out, missing = {}, []
    cur_set = {x for x, _ in cur}
    for t in [x for x, _ in cur] + fell_off(cur_ts):
        b = basic.get(t)
        if not b:
            missing.append(t)
            continue
        county = manual.get(t, {}).get('county') or county_of(b['addr'])
        if not county:
            missing.append(f'{t}(county:{b["addr"]})')
        p = prev.get(t)
        out[t] = dict(inTop50=t in cur_set, county=county, market=b['market'], industryCode=b['code'],
                      industry=INDUSTRY.get(b['code']), listed=f"{b['listed'][:4]}-{b['listed'][4:6]}-{b['listed'][6:]}",
                      prevRank=p[0] if p else None, prevCap=p[1] if p else None)
    asof = twse[0]['出表日期']
    meta = dict(
        generated=datetime.date.today().isoformat(),
        basicDataAsOf=f'{int(asof[:3]) + 1911}-{asof[3:5]}-{asof[5:]}',
        prevSnapshot=PREV_DATE,
        sources=[dict(title='上市公司基本資料', publisher='臺灣證券交易所', url=URLS['twse'], file=f1),
                 dict(title='上櫃公司基本資料', publisher='證券櫃檯買賣中心', url=URLS['tpex'], file=f2)],
        companies=out)
    (ROOT / 'src/data/industry/companies-meta.json').write_text(
        json.dumps(meta, ensure_ascii=False, indent=2) + '\n')
    print('companies', len(out), 'missing', missing)


if __name__ == '__main__':
    main()
