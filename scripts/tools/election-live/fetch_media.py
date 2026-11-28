#!/usr/bin/env python3
"""fetch_media.py — 開票夜的第二個數字：媒體自行計票（非官方）。

中選會的官方計票比電視台慢很多（2026-11-28 17:20 中選會全國才回報 0.5% 投開票所，
媒體計票的臺北市已超過三十萬票）。讀者要的「現在誰領先」在媒體計票裡，所以另外轉錄一份，
在頁面上跟中選會數字分開顯示、標明來源與「非官方」。

來源：Yahoo新聞開票專頁的 22 張圖表（Datawrapper），每張一個縣市，資料檔是公開的 dataset.csv。
      https://s.yimg.com/cv/apiv2/twnews/Utility_Formal_v16.3.14_embed.html 列出圖表代碼。
做法：每張圖表先讀轉址頁拿到目前版本，再讀該版本的 dataset.csv；用候選人姓名對回名冊決定是哪個縣市。
輸出：media.json（只有程式寫）。任何一張失敗都記在 errors，不影響其他張；全部失敗時退出碼 2，呼叫端不覆寫。

用法：python3 fetch_media.py --out <dir>/media.json
"""
import argparse, csv, datetime, io, json, pathlib, re, sys, time, urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[3]
ROSTER = ROOT / 'src/data/elections-2026.json'
EMBED = 'https://s.yimg.com/cv/apiv2/twnews/Utility_Formal_v16.3.14_embed.html'
PAGE = 'https://tw.news.yahoo.com/topic/2026-election/'
UA = {'User-Agent': 'Mozilla/5.0'}
TZ = datetime.timezone(datetime.timedelta(hours=8))


def get(url, timeout=12):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
        return r.read().decode('utf-8', 'replace'), r.headers


def norm(s):
    s = ''.join(str(s or '').split())
    for a, b in (('温', '溫'), ('啓', '啟'), ('台', '臺')):
        s = s.replace(a, b)
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--out', required=True)
    a = ap.parse_args()
    roster = json.loads(ROSTER.read_text(encoding='utf-8'))
    by_name = {}
    for r in roster['races']:
        for c in r['candidates']:
            by_name.setdefault(norm(c['name']), []).append((r['area'], c['name']))
    errors, races = [], {}
    try:
        html, _ = get(EMBED)
        ids = sorted(set(re.findall(r'datawrapper\.dwcdn\.net/([A-Za-z0-9]{5})/', html)))
    except Exception as e:
        print('embed 讀取失敗', e, file=sys.stderr)
        return 2
    for cid in ids:
        try:
            idx, _ = get(f'https://datawrapper.dwcdn.net/{cid}/')
            m = re.search(r'dwcdn\.net/%s/(\d+)/' % cid, idx)
            if not m:
                raise ValueError('找不到版本號')
            text, hdr = get(f'https://datawrapper.dwcdn.net/{cid}/{m.group(1)}/dataset.csv')
            rows = list(csv.DictReader(io.StringIO(text)))
            cands, areas = [], {}
            for row in rows:
                name = (row.get('候選人') or '').strip()
                if not name:
                    continue
                hit = by_name.get(norm(name))
                if hit:
                    for area, _n in hit:
                        areas[area] = areas.get(area, 0) + 1
                votes = re.sub(r'[^\d]', '', row.get('得票數') or '')
                try:
                    pct = float(row.get('得票率') or '')
                except ValueError:
                    pct = None
                cands.append({'name': name, 'votes': int(votes) if votes else 0, 'pct': pct,
                              'elected': bool((row.get('當選') or '').strip() or (row.get('結果') or '').strip())})
            if not cands or not areas:
                raise ValueError('沒有對得上名冊的候選人')
            area = max(areas, key=areas.get)
            roster_names = {norm(c['name']): c['name'] for r in roster['races'] if r['area'] == area for c in r['candidates']}
            keep = []
            for c in cands:
                n = roster_names.get(norm(c['name']))
                if n:
                    keep.append({**c, 'name': n})
            lm = hdr.get('last-modified')
            when = None
            if lm:
                when = datetime.datetime.strptime(lm, '%a, %d %b %Y %H:%M:%S %Z').replace(tzinfo=datetime.timezone.utc).astimezone(TZ).isoformat(timespec='seconds')
            races[area] = {'updatedAt': when, 'candidates': keep}
        except Exception as e:
            errors.append(f'{cid}: {type(e).__name__}: {e}')
        time.sleep(0.15)
    if not races:
        print('全部失敗', errors[:3], file=sys.stderr)
        return 2
    out = {
        'schema': 1,
        'fetchedAt': datetime.datetime.now(TZ).isoformat(timespec='seconds'),
        'sourceName': 'Yahoo新聞',
        'sourceUrl': PAGE,
        'note': '媒體自行計票，非中選會官方數字',
        'races': races,
        'errors': errors,
    }
    pathlib.Path(a.out).write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print(f'media races={len(races)}/22 errors={len(errors)}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
