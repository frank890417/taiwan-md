#!/usr/bin/env python3
"""publish_results.py — 把 fetch_cec.py 的輸出轉成開票專區讀的 results.json。

開票夜（2026-11-28）票數這條路只有程式能寫：
  fetch_cec.py（讀中選會計票網站） → 本檔（對名冊、算狀態、寫 results.json）
  → push 到 election-live 分支 → 瀏覽器端的 LiveBoard.astro 每兩分鐘抓。

本檔做的事：
  1. 用姓名把中選會的候選人對到 src/data/elections-2026.json 的名冊（異體字正規化；
     南投、連江名冊沒有號次，所以不用號次配對）。對不上的寫進 unmatched，不靜默丟掉。
  2. 決定 phase：pre（沒有任何票數）／counting／final（22 縣市都回報完）。
  3. 新抓到的票數若比上一版少（中選會端點暫時失敗、回 0），保留上一版那個縣市，
     並在 errors 記一筆。票數只會往上走，倒退一律當成抓取失敗。
  4. 「當選」只照中選會標註，不自己判斷。

用法：
  python3 publish_results.py --cec /tmp/cec.json --prev <dir>/results.json --out <dir>/results.json
退出碼：0 正常；2 = 這一輪沒有任何可用票數而且上一版已經在 counting（呼叫端不要覆寫）。
"""
import argparse, json, pathlib, sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
ROSTER = ROOT / 'src/data/elections-2026.json'
CEC_URL = 'https://vote.cec.gov.tw/2026-local/zh-TW/indexP.html'


def norm(s):
    s = ''.join(str(s or '').split())
    for a, b in (('温', '溫'), ('啓', '啟'), ('台', '臺')):
        s = s.replace(a, b)
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--cec', required=True)
    ap.add_argument('--prev')
    ap.add_argument('--out', required=True)
    a = ap.parse_args()

    cec = json.loads(pathlib.Path(a.cec).read_text(encoding='utf-8'))
    roster = json.loads(ROSTER.read_text(encoding='utf-8'))
    prev = {}
    if a.prev and pathlib.Path(a.prev).exists():
        try:
            prev = json.loads(pathlib.Path(a.prev).read_text(encoding='utf-8'))
        except Exception:
            prev = {}

    errors = [e if isinstance(e, str) else f"{e.get('url','')}: {e.get('error','')}" for e in cec.get('errors', [])]
    unmatched = []
    mayors = {}
    area_by_norm = {norm(r['area']): r for r in roster['races']}
    got = {norm(k): v for k, v in (cec.get('mayors') or {}).items()}

    rep_sum = tot_sum = 0
    rep_known = True
    for key, race in area_by_norm.items():
        area = race['area']
        src = got.get(key)
        prev_area = (prev.get('mayors') or {}).get(area)
        if not src or not src.get('candidates'):
            if prev_area:
                mayors[area] = prev_area
            continue
        by_name = {norm(c['name']): c for c in race['candidates']}
        cands = []
        for c in src['candidates']:
            b = by_name.get(norm(c.get('name')))
            if not b:
                unmatched.append(f"{area}: {c.get('name')}")
            cands.append({
                'number': c.get('number') if c.get('number') is not None else (b or {}).get('number'),
                'name': (b or {}).get('name') or c.get('name'),
                'party': (b or {}).get('party') or c.get('party') or '',
                'votes': int(c.get('votes') or 0),
                'pct': c.get('pct'),
                'elected': bool(c.get('elected')),
            })
        missing = [n for n in by_name if n not in {norm(c['name']) for c in cands}]
        if missing:
            unmatched.append(f"{area}: 名冊有但中選會沒有 {missing}")
        new_total = sum(c['votes'] for c in cands)
        old_total = sum(int(c.get('votes') or 0) for c in (prev_area or {}).get('candidates', []))
        # 票數倒退分兩種：掉很多是抓到壞頁，保留上一版；掉不到百分之二是中選會
        # 自己更正（2026-11-28 21:44 高雄 2089/2089 退回 2088/2089，少 942 票），照官方走。
        if new_total < old_total and new_total < old_total * 0.98:
            errors.append(f'{area}: 新票數 {new_total} 少於上一版 {old_total}，保留上一版')
            mayors[area] = prev_area
            continue
        mayors[area] = {'reported': src.get('reported'), 'total': src.get('total'), 'candidates': cands}

    for area, m in mayors.items():
        if isinstance(m.get('reported'), int) and isinstance(m.get('total'), int) and m['total'] > 0:
            rep_sum += m['reported']
            tot_sum += m['total']
        else:
            rep_known = False

    total_votes = sum(c['votes'] for m in mayors.values() for c in m['candidates'])
    ref = cec.get('referendum') or {}
    ref_votes = int(ref.get('agree') or 0) + int(ref.get('disagree') or 0)
    prev_ref = prev.get('referendum') or {}
    if ref_votes < (int(prev_ref.get('agree') or 0) + int(prev_ref.get('disagree') or 0)) * 0.98:
        errors.append('公投: 新票數少於上一版，保留上一版')
        ref = prev_ref
        ref_votes = int(ref.get('agree') or 0) + int(ref.get('disagree') or 0)

    if total_votes == 0 and ref_votes == 0:
        phase = 'pre'
    else:
        all_done = (len(mayors) == len(area_by_norm) and rep_known and tot_sum > 0 and rep_sum == tot_sum)
        phase = 'final' if all_done else 'counting'
    if phase == 'pre' and prev.get('phase') in ('counting', 'final'):
        print('這一輪沒有任何票數，上一版已在開票中：不覆寫', file=sys.stderr)
        return 2

    out = {
        'schema': 1,
        'phase': phase,
        'updatedAt': cec.get('fetchedAt'),
        'sourceName': '中央選舉委員會計票資訊查詢網站',
        'sourceUrl': CEC_URL,
        'stations': {'reported': rep_sum, 'total': tot_sum} if rep_known and tot_sum > 0 and len(mayors) == len(area_by_norm) else None,
        'mayors': mayors,
        'referendum': {k: ref.get(k) for k in ('agree', 'disagree', 'valid', 'invalid', 'eligible', 'reported', 'total', 'completedEligible')},
        'coverage': {'mayorsWithData': len(mayors), 'mayorsTotal': len(area_by_norm)},
        'unmatched': unmatched,
        'errors': errors[:40],
    }
    pathlib.Path(a.out).write_text(json.dumps(out, ensure_ascii=False, indent=1) + '\n', encoding='utf-8')
    print(f"phase={phase} mayors={len(mayors)}/{len(area_by_norm)} votes={total_votes} ref={ref_votes} unmatched={len(unmatched)} errors={len(errors)}")
    return 0


if __name__ == '__main__':
    sys.exit(main())
