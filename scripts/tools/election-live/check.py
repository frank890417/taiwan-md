#!/usr/bin/env python3
"""check.py — 開票夜值班檢查：迴圈心跳、results.json 狀態、抽一個縣市對中選會、feed 與外部讀取。
用法：python3 check.py [縣市碼前五碼，例 64000=高雄市]"""
import json, os, re, sys, urllib.request, datetime
L = os.path.expanduser('~/.taiwanmd-election-live')
CODES = {'63000': '臺北市', '65000': '新北市', '68000': '桃園市', '66000': '臺中市', '67000': '臺南市', '64000': '高雄市',
         '10004': '新竹縣', '10005': '苗栗縣', '10007': '彰化縣', '10008': '南投縣', '10009': '雲林縣', '10010': '嘉義縣',
         '10013': '屏東縣', '10002': '宜蘭縣', '10015': '花蓮縣', '10014': '臺東縣', '10016': '澎湖縣', '09020': '金門縣',
         '09007': '連江縣', '10017': '基隆市', '10018': '新竹市', '10020': '嘉義市'}
code = sys.argv[1] if len(sys.argv) > 1 else '63000'
area = CODES[code]
now = datetime.datetime.now()
log = open(L + '/.loop.log').read().strip().split('\n')[-1]
age = (now - datetime.datetime.strptime(log[:19], '%Y-%m-%d %H:%M:%S')).total_seconds() / 60
print(f'loop  {"OK " if age < 5 and " ok " in log else "!! "}{age:.1f} 分前｜{log[20:]}')
d = json.load(open(L + '/results.json'))
print('data ', d['phase'], d['updatedAt'][11:16], d['stations'], d['coverage'], 'unmatched', d['unmatched'], 'errors', d['errors'][:2])
lead = []
for a, m in d['mayors'].items():
    c = sorted(m['candidates'], key=lambda x: -x['votes'])
    if c[0]['votes'] > 0:
        lead.append(f"{a} {m['reported']}/{m['total']} {c[0]['name']} {c[0]['votes']}{'（當選）' if c[0]['elected'] else ''}")
print('有票數的縣市', len(lead)); [print('  ', x) for x in lead]
r = d['referendum']; print('ref  ', r['agree'], r['disagree'], r['reported'], '/', r['total'])
req = urllib.request.Request(f'https://vote.cec.gov.tw/2026-local/zh-TW/TC/{code}000000000000.html', headers={'User-Agent': 'Mozilla/5.0'})
s = urllib.request.urlopen(req, timeout=15).read().decode('utf-8')
t = re.sub(r'[| ]*\|[| ]*', '|', re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '|', s)))
i, j = t.find('已送'), t.find('資料更新')
print(f'CEC  {area}', t[i:i + 28], t[t.find('|1|'):j][:260], t[j:j + 24].replace('&nbsp;', ''))
m = d['mayors'].get(area, {})
print(f'我們 {area}', m.get('reported'), m.get('total'), [(c['number'], c['name'], c['votes'], c['elected']) for c in m.get('candidates', [])])
f = json.load(open(L + '/feed.json'))
print('feed ', f['updatedAt'][11:16], len(f['items']), '則', len(f['factchecks']), '查核', 'overview', len(f.get('overview') or []))
x = json.load(urllib.request.urlopen('https://raw.githubusercontent.com/frank890417/taiwan-md/election-live/results.json', timeout=15))
print('raw  ', x['updatedAt'][11:16], x['phase'])
