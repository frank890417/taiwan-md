#!/usr/bin/env python3
"""Build data/industry/research/exports.json from MOF CSV downloads in data/industry/raw/.
Run: python3 -I data/industry/raw/build_exports_json.py   (from worktree root)
All numbers are read from the CSVs (Big5) or the NDC Data Book txt; shares marked 'computed'
are value / total from the same table (pure arithmetic, 2-decimal rounding only).
"""
import csv, json, re, os
ROOT = '/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7'
RAW = ROOT + '/data/industry/raw/'
ACC = '2026-11-10'
YEARS = [2001, 2005, 2010, 2015, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]


def rd(fn):
    return list(csv.reader(open(RAW + fn, encoding='big5', errors='strict')))


def roc(y):
    return f'{y-1911}年'


def table(fn, hdr_row=1):
    r = rd(fn)
    h = [re.sub(r'</?b>', '', x) for x in r[hdr_row]]
    d = {}
    for row in r[hdr_row + 1:]:
        if row and row[0].endswith(('年',)) or (row and '月' in row[0] and row[0].startswith('115')):
            d[row[0]] = dict(zip(h, row))
    return h, d, r


def num(x):
    return None if x in ('－', '-', '', None) else float(x)


# ---------- totals ----------
h, tot, raw = table('mof_i9101_trade_totals_annual_20261110.csv')
totals = {'unit': '億美元（= 百萬美元 / 100；valueUsdMillion 為 MOF 原表單位）',
          'definition': '出口總值 = 出口 + 復出口（MOF 統計資料庫「進出口貿易值」表口徑）', 'byYear': {}}
for y in range(2001, 2026):
    d = tot[roc(y)]
    totals['byYear'][str(y)] = {
        'exportTotalUsdMillion': num(d['出口總值']), 'exportTotalUsd100M': round(num(d['出口總值']) / 100, 2),
        'exportExclReexportUsdMillion': num(d['出口']), 'reexportUsdMillion': num(d['復出口'])}
ytd = rd('mof_i9101_trade_totals_ytd2026_20261110.csv')[2]
totals['ytd2026'] = {'period': '2026年1月至10月（民國115年1-10月累計）', 'exportTotalUsdMillion': num(ytd[2]),
                     'exportTotalUsd100M': round(num(ytd[2]) / 100, 2), 'exportExclReexportUsdMillion': num(ytd[3]),
                     'reexportUsdMillion': num(ytd[4])}
totals['source'] = {
    'url': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=210&funid=i9101',
    'queryCsvUrl': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=220&ym=6000&ymt=11400&kind=21&type=0&funid=i9101&cycle=4&outmode=2&compmode=00&outkind=1&fld0=1&codspc0=0,8,',
    'title': '財政部統計資料庫 進出口貿易值－貿易總值（年，按美元計算，百萬美元）',
    'publisher': '財政部統計處', 'period': '民國60年-114年（年）；115年1-10月累計', 'accessed': ACC,
    'quote': '"114年",1125072.224,639961.977,593426.362,46535.615,485110.247,484345.447,764.800,154851.730（欄位：貿易總值,出口總值,出口,復出口,進口總值,進口,復進口,出(入)超）',
    'rawFile': 'data/industry/raw/mof_i9101_trade_totals_annual_20261110.csv ; mof_i9101_trade_totals_ytd2026_20261110.csv'}

# ---------- byProduct ----------
h, prod, _ = table('mof_i9121_export_by_product_annual_20261110.csv')
# share csv has no unit row: header is row 0
r = rd('mof_i8123_export_product_share_annual_20261110.csv')
hs = [re.sub(r'</?b>', '', x) for x in r[0]]
shr = {row[0]: dict(zip(hs, row)) for row in r[1:] if row and row[0].endswith('年')}
CATS = {  # display name -> MOF column name
    '電子零組件': '(1)電子零組件', '資通與視聽產品': '(4)資通與視聽產品',
    '基本金屬及其製品': '15.基本金屬及其製品', '機械': '(2)機械', '塑膠、橡膠及其製品': '7.塑膠、橡膠及其製品',
    '化學品': '6.化學品', '礦產品': '5.礦產品', '紡織品': '11.紡織品', '光學及精密儀器（光學器材）': '(1)光學及精密儀器',
    '運輸工具': '17.運輸工具', '電機產品': '(3)電機產品'}
byProduct = {'unit': 'valueUsdMillion = 百萬美元（MOF 原表）；valueUsd100M = 億美元（= /100）；sharePct = 占出口總值 %（MOF 統計資料庫「結構比」表原值，非自算）',
             'byYear': {}}
for y in YEARS:
    p = prod[roc(y)]
    tk = [k for k in p if k.endswith('總計')][0]
    sk = [k for k in shr[roc(y)] if k.endswith('總計')][0]
    ent = {'exportTotalUsdMillion': num(p[tk])}
    for name, col in CATS.items():
        v = num(p[col])
        s = num(shr[roc(y)][col])
        ent[name] = ({'valueUsdMillion': v, 'valueUsd100M': round(v / 100, 2), 'sharePct': s, 'mofColumn': col}
                     if v is not None else {'valueUsdMillion': None, 'sharePct': None, 'reason': 'MOF 表該年無此欄值'})
    ent['電子零組件＋資通與視聽產品合計'] = {
        'valueUsdMillion': round(num(p[CATS['電子零組件']]) + num(p[CATS['資通與視聽產品']]), 3),
        'sharePct_computed': round((num(p[CATS['電子零組件']]) + num(p[CATS['資通與視聽產品']])) / num(p[tk]) * 100, 2),
        'note': '兩欄相加，占比為自算（value/總計），MOF 單獨表欄無此合計'}
    byProduct['byYear'][str(y)] = ent
ytdp = rd('mof_i9121_export_by_product_ytd2026_20261110.csv')
hp = [re.sub(r'</?b>', '', x) for x in ytdp[1]]
dp = dict(zip(hp, ytdp[2]))
ytds = rd('mof_i8123_export_product_share_ytd2026_20261110.csv')
hs2 = [re.sub(r'</?b>', '', x) for x in ytds[0]]
ds = dict(zip(hs2, ytds[1]))
y26 = {'period': '2026年1月至10月累計', 'exportTotalUsdMillion': num(dp['總計'])}
for name, col in CATS.items():
    v = num(dp[col])
    y26[name] = {'valueUsdMillion': v, 'valueUsd100M': round(v / 100, 2), 'sharePct': num(ds[col])}
byProduct['ytd2026'] = y26
byProduct['source'] = {
    'url': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=210&funid=i9121',
    'queryCsvUrl': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=220&ym=9000&ymt=11400&kind=21&type=0&funid=i9121&cycle=4&outmode=2&compmode=00&outkind=1&fld0=1&codspc0=0,42,',
    'shareUrl': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=210&funid=i8123',
    'shareCsvUrl': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=220&ym=9000&ymt=11400&kind=21&type=0&funid=i8123&cycle=4&outmode=2&compmode=00&outkind=1&fldspc=0,42,',
    'title': '財政部統計資料庫 貨品別貿易值－按主要貨品別－出口（百萬美元）；貨品別貿易值結構比－按主要貨品別－出口',
    'publisher': '財政部統計處', 'period': '民國90年-114年（年）；115年1-10月累計', 'accessed': ACC,
    'quote': '"114年",639961.977,...,"(1)電子零組件" 222164.405,"(4)資通與視聽產品" 251149.029,"(2)機械" 25749.150,"(3)電機產品" 15081.471（MOF CSV 114年列）',
    'rawFile': 'data/industry/raw/mof_i9121_export_by_product_annual_20261110.csv ; mof_i8123_export_product_share_annual_20261110.csv'}

# ---------- byMarket ----------
r = rd('mof_i9111_export_by_country_annual_20261110.csv')
hm = r[1]
mk = {row[0]: dict(zip(hm, row)) for row in r[2:] if row and row[0].endswith('年')}
ASEAN = ['新加坡', '馬來西亞', '印尼', '越南', '泰國', '菲律賓', '柬埔寨', '緬甸', '汶萊', '寮國']


def mv(d, c):
    return num(d.get(c + '_出口'))


def market(d):
    T = mv(d, '總計')
    def blk(v, parts, note=None):
        return {'valueUsdThousand': v, 'valueUsd100M': round(v / 1e5, 2) if v is not None else None,
                'sharePct_computed': round(v / T * 100, 2) if v is not None else None,
                **({'note': note} if note else {})}
    cn, hk = mv(d, '中國大陸'), mv(d, '香港')
    asean = [mv(d, c) for c in ASEAN]
    out = {'exportTotalUsdThousand': T,
           '中國大陸與香港': blk((cn or 0) + (hk or 0), None),
           '其中中國大陸': blk(cn, None, 'MOF 欄「中國大陸」，不含香港' if cn is not None else None),
           '其中香港': blk(hk, None),
           '美國': blk(mv(d, '美國'), None),
           '東協十國': blk(sum(a or 0 for a in asean), None, '新加坡+馬來西亞+印尼+越南+泰國+菲律賓+柬埔寨+緬甸+汶萊+寮國；東帝汶(2025年10月入會)未計'),
           '日本': blk(mv(d, '日本'), None),
           '歐洲': blk(mv(d, '歐洲'), None, 'MOF「歐洲」洲別合計（MOF 國別清單中歐洲含德、荷、英、法、俄羅斯、瑞士等，土耳其列在中東），非僅歐盟')}
    out['東協_missing_countries'] = [c for c in ASEAN if mv(d, c) is None]
    return out


byMarket = {'unit': 'valueUsdThousand = 千美元（MOF 原表）；valueUsd100M = 億美元；sharePct_computed = 該市場出口 / 同表「總計_出口」× 100，自算，四捨五入至 2 位',
            'byYear': {str(y): market(mk[roc(y)]) for y in YEARS}}
r2 = rd('mof_i9111_export_by_country_ytd2026_20261110.csv')
byMarket['ytd2026'] = {'period': '2026年1月至10月累計', **market(dict(zip(r2[1], r2[2])))}
byMarket['source'] = {
    'url': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=210&funid=i9111',
    'queryCsvUrl': 'https://web02.mof.gov.tw/njswww/webMain.aspx?sys=220&ym=7000&ymt=11400&kind=21&type=0&funid=i9111&cycle=4&outmode=2&compmode=00&outkind=1&fld0=1&codspc0=0,1,2,10,17,1,19,1,21,1,24,1,51,1,94,1,&cod10=1',
    'title': '財政部統計資料庫 洲別／國別貿易值（出口，按美元計算，千美元）', 'publisher': '財政部統計處',
    'period': '民國70年-114年（年）；115年1-10月累計', 'accessed': ACC,
    'quote': '"114年" 列，欄：總計_出口,中國大陸_出口,香港_出口,日本_出口,…,歐洲_出口,美國_出口（MOF CSV）；另「注意事項：部分國家/地區因貿易管理或往來時間不同,致資料起始年月略有差異(如中國大陸、越南等)。」',
    'rawFile': 'data/industry/raw/mof_i9111_export_by_country_annual_20261110.csv ; mof_i9111_export_by_country_ytd2026_20261110.csv'}

# ---------- longHistory ----------
txt = open(RAW + 'ndc_databook/TSDB_2002.txt', encoding='utf-8').read().splitlines()
start = [i for i, l in enumerate(txt) if '11-7. Composition of Exports' in l][1]
lh = {}
end = [i for i, l in enumerate(txt) if '11-8. Composition of Imports' in l and i > start][0]
for l in txt[start:end]:
    m = re.match(r'\s*(19[5-9]\d)\s+([\d,\.]+)\s+([\d,\.]+)\s+([\d,\.]+)\s+([\d,\.]+)\s+100\.0\s+([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)\s*$', l)
    if m and int(m.group(1)) <= 1990:
        g = [x.replace(',', '') for x in m.groups()]
        lh[g[0]] = {'totalUsdMillion': float(g[1]), 'agriculturalUsdMillion': float(g[2]), 'processedAgriculturalUsdMillion': float(g[3]),
                    'industrialUsdMillion': float(g[4]), 'agriculturalPct': float(g[5]), 'processedAgriculturalPct': float(g[6]), 'industrialPct': float(g[7])}
longHistory = {'unit': '金額：百萬美元；占比：% （皆為原表值，非自算）', 'byYear': lh,
               'source': {'url': 'https://www.taiwan-database.net/PDFs/Taiwan_Statistical_Data_Book_2002.pdf',
                          'title': 'Taiwan Statistical Data Book 2002, Table 11-7 Composition of Exports（p.216）',
                          'publisher': 'Council for Economic Planning and Development, R.O.C.（國發會前身經建會）；PDF 取自 taiwan-database.net 鏡像',
                          'period': '1952-2001（本欄取 1952-1990，原表 1952、1955、1960、1965、1970、1973-2001 逐年）', 'accessed': ACC,
                          'quote': '1952   116.5   25.7   81.3   9.5   100.0   22.1   69.8   8.1',
                          'rawFile': 'data/industry/raw/ndc_databook/TSDB_2002.pdf'}}

notes = {
  'reexport': '「出口總值」= 出口 + 復出口（MOF i9101）。byProduct 各年 總計 與 totals.exportTotal 一致（例如 2001 為 126,608.592 百萬美元）。2025 年復出口 46,535.615 百萬美元、占出口總值約 7.3%（自算）。',
  'vintage_revision_2025': '財政部 115年1月9日新聞稿「114年出口 6,407.5 億美元」（表2 合計 640,746 百萬美元）與統計資料庫 2026-11-10 擷取值 639,961.977 百萬美元不同，差 784 百萬美元，判斷為初步統計後修正；本檔以統計資料庫（較新）為準，新聞稿初值保留在此供比對。2024 及以前兩者一致（113年 474,925）。',
  'vintage_longhistory_2001': 'Data Book 2002 表11-7 的 2001 年出口總額為 122,866.3 百萬美元（不含復出口），與 MOF 統計資料庫 2001 年「出口」122,685.692、「出口總值」126,608.592 皆不同（資料版本與口徑不同）。longHistory 不可與 totals 直接拼接；1990 年 Data Book 為 67,214.4 百萬美元。',
  'classification_retroactive': 'byProduct 取自 MOF 統計資料庫，現行貨品分類（19章大類，其中「機械及電機設備」下分電子零組件、機械、電機產品、資通與視聽產品、家用電器）已回溯套用至 90年（2001）起各年，故 2001-2025 為同一口徑，無需拼接。「資通與視聽產品」「電子零組件」何年起成為 MOF 新聞稿分類名稱，本次未取得可引用的原文，故不寫起用年份（null）。',
  'optics_name': '新聞稿 108年12月（表2）稱「光學器材」；114年12月新聞稿與統計資料庫稱「光學及精密儀器」，本檔 byProduct 以「光學及精密儀器（光學器材）」對應統計資料庫欄「(1)光學及精密儀器」（其上層為「18.光學及精密儀器；鐘錶；樂器」）。',
  'machinery_definition': '財政部114年12月新聞稿表2說明：「機械係指我國輸出入貨品分類號列第84章之貨品，但不含屬於家用之電器，且不含與自動資料處理機相關者。」',
  'ict_combined': '財政部114年12月新聞稿表2備註：「近年電子零組件、資通與視聽產品之銷售流向隨全球供應鏈重組、部分廠商擴大在臺生產等出現結構性轉變，爰另予併計。」新聞稿自 114年表2起另列「電子及資通產品」合計欄（114年 474,026 百萬美元、占總出口 74.0%，新聞稿初值）；本檔 byProduct 的「電子零組件＋資通與視聽產品合計」為自算，占比以統計資料庫修正後總值計。',
  'market_definition': 'byMarket 為出口目的地（國別／洲別），單位千美元；中國大陸欄不含香港，「中國大陸與香港」為兩欄相加（自算）。東協十國為自算加總（柬埔寨、緬甸、汶萊、寮國皆有值，missing 為空）。「歐洲」為 MOF 洲別合計。占比皆自算（value / 同表總計_出口）。MOF 表下注意事項：「部分國家/地區因貿易管理或往來時間不同,致資料起始年月略有差異(如中國大陸、越南等)。」',
  'market_share_not_from_i9112': '未使用 MOF 國別結構比表（i9112），國別占比為自算；product 占比則直接取 MOF 結構比表 i8123。',
  'ytd2026': '2026年1-10月累計取自統計資料庫（cycle=91, 11501-11510）；與財政部「115年10月海關進出口貿易初步統計」新聞稿（service.mof.gov.tw/public/Data/statistic/trade/news/11510/）「累計 1 至 10 月出口 7,582.9 億美元」一致，仍屬初步統計，可能再修正。',
  'longhistory_scope': 'longHistory 原表逐年有 1952、1955、1960、1965、1970、1973-1990 共 23 點，本檔全收（未補點）。1952 年起算，原表分類為 Agricultural / Processed Agricultural / Industrial Products（農產品／農產加工品／工業產品）。來源 PDF 為 taiwan-database.net 鏡像的 CEPD 原書，非 NDC 官網（NDC 官網 ndc.gov.tw 對程式請求回 403）。',
  'ytd_total_period_note': '2026 全年尚未發布（今日 2026-11-10）。',
  'not_obtained': '2026 年 11 月以後數據；MOF 新聞稿中「資通與視聽產品」改名或新設的年份；1952-1990 的 MOF 官方 HS 口徑表（MOF 統計資料庫貿易結構表僅自民國60年/90年起）。'
}
out = {'task': 'exports', 'accessed': ACC, 'totals': totals, 'byProduct': byProduct, 'byMarket': byMarket,
       'longHistory': longHistory, 'notes': notes}
json.dump(out, open(ROOT + '/data/industry/research/exports.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('ok', len(lh), 'longhistory years')
