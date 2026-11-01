#!/usr/bin/env python3
"""data-hub-check.py — /data 資料中樞指標總表的結構與新鮮度檢查。

查三件事：
  1. 結構：每個指標都有 id／分類／中英標題／數值／期間／asOf／出處機關與網址／性質／洞察；
     性質（basis）與發布頻率（cadence）只能是約定的值；文章路徑真的存在。
  2. 引用：threads.json 七章的指標、影響鏈出處、延伸閱讀文章都存在，正文中英文齊、主圖模組合法。
  3. 新鮮度：依 cadence 估算「該有新數字了」的期限，逾期的列出來（數字過期是資料中樞
     最常見的死法：v1 的八張數字卡兩年沒人動）。

用法：
  python3 scripts/tools/data-hub-check.py            # 結構錯誤 exit 1；逾期只警告
  python3 scripts/tools/data-hub-check.py --stale    # 只印逾期清單（給 routine 早班用）
  python3 scripts/tools/data-hub-check.py --strict   # 逾期也算失敗
  python3 scripts/tools/data-hub-check.py --json     # 機器讀（generate-dashboard-alerts.mjs §12 用），永遠 exit 0
"""
import json, sys, datetime as dt
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'src/data/data-hub'
CATEGORIES = {'about', 'history', 'geography', 'culture', 'food', 'art', 'music', 'technology',
              'nature', 'people', 'society', 'economy', 'lifestyle', 'politics'}
FORMATS = {'count', 'number', 'percent', 'money', 'rank'}
BASIS = {'official', 'estimate', 'projection', 'ranking'}
# cadence 描述「這個值本身」多久換一次（2025 全年出生數是 annual，即使戶政司每月也發月報；
# 兩件事混在一個欄位會把年度總數誤判成過期，REFLEXES #38）。
# 期限＝下一個參考期間＋官方發布時滯（年度統計常要到隔年第三、四季才出）。
MAX_AGE_DAYS = {'monthly': 31 + 60, 'quarterly': 92 + 120, 'annual': 365 + 330}
NO_AGE = {'irregular', 'fixed'}
# 章節主圖可用的 tw-* 模組（graph.md §四；編輯模組只收 timeline）
CHART_MODULES = {'tw-line', 'tw-slope', 'tw-bars', 'tw-dot', 'tw-stack', 'tw-waffle', 'tw-pyramid',
                 'tw-tiles', 'tw-iso', 'tw-heatmap', 'tw-multiples', 'tw-arc', 'tw-timeline'}


def article_exists(p: str) -> bool:
    return (ROOT / 'knowledge' / f'{p}.md').exists()


def main(argv):
    today = dt.date.today()
    ind_doc = json.loads((DATA / 'indicators.json').read_text(encoding='utf-8'))
    threads = json.loads((DATA / 'threads.json').read_text(encoding='utf-8'))['threads']
    errors, stale = [], []
    ids = set()
    for i in ind_doc['indicators']:
        iid = i.get('id', '?')
        def err(msg):
            errors.append(f'{iid}: {msg}')
        if iid in ids:
            err('id 重複')
        ids.add(iid)
        if i.get('category') not in CATEGORIES:
            err(f"分類不合法：{i.get('category')}")
        for f in ('title', 'period', 'insight'):
            v = i.get(f) or {}
            if not v.get('zh-TW') or not v.get('en'):
                err(f'{f} 缺中文或英文')
        if not isinstance(i.get('value'), (int, float)):
            err('value 不是數字')
        if i.get('format') not in FORMATS:
            err(f"format 不合法：{i.get('format')}")
        if i.get('basis', 'official') not in BASIS:
            err(f"basis 不合法：{i.get('basis')}")
        cad = i.get('cadence')
        if cad not in MAX_AGE_DAYS and cad not in NO_AGE:
            err(f'cadence 不合法：{cad}')
        src = i.get('source') or {}
        if not str(src.get('url', '')).startswith('http'):
            err('出處網址缺或不是 http(s)')
        ag = src.get('agency') or {}
        if not ag.get('zh-TW') or not ag.get('en'):
            err('出處機關缺中文或英文')
        try:
            as_of = dt.date.fromisoformat(i.get('asOf', ''))
        except ValueError:
            err(f"asOf 不是 ISO 日期：{i.get('asOf')}")
            as_of = None
        for a in i.get('articles', []):
            if not article_exists(a):
                err(f'文章不存在：{a}')
        if as_of and cad in MAX_AGE_DAYS:
            age = (today - as_of).days
            if age > MAX_AGE_DAYS[cad]:
                stale.append((iid, cad, i['asOf'], age, src.get('url', '')))
    for t in threads:
        tid = t['id']
        for x in t.get('indicators', []) + ([t['lead']] if t.get('lead') else []):
            if x not in ids:
                errors.append(f"章 {tid}：指標不存在 {x}")
        for a in t.get('articles', []):
            if not article_exists(a):
                errors.append(f"章 {tid}：文章不存在 {a}")
        # v2.1 六段骨架（報告 §10.4）：正文、主圖、影響鏈、接下來看什麼、延伸閱讀
        for f in ('question', 'essay', 'next'):
            v = t.get(f) or {}
            if not v.get('zh-TW') or not v.get('en'):
                errors.append(f'章 {tid}：{f} 缺中文或英文')
        ch = t.get('chart') or {}
        if ch.get('module') not in CHART_MODULES:
            errors.append(f"章 {tid}：主圖模組不合法 {ch.get('module')}")
        for c in t.get('chain', []):
            if not article_exists(c.get('article', '')):
                errors.append(f"章 {tid}：影響鏈出處不存在 {c.get('article')}")
        if not 3 <= len(t.get('chain', [])) <= 5:
            errors.append(f"章 {tid}：影響鏈要 3 到 5 環（現在 {len(t.get('chain', []))}）")
        for e in t.get('embeds', []):
            if not article_exists(e.get('path', '')):
                errors.append(f"章 {tid}：延伸閱讀文章不存在 {e.get('path')}")

    n = len(ind_doc['indicators'])
    if '--json' in argv:
        print(json.dumps({
            'indicators': n,
            'threads': len(threads),
            'errors': errors,
            'stale': [
                {'id': iid, 'cadence': cad, 'asOf': as_of, 'ageDays': age,
                 'maxAgeDays': MAX_AGE_DAYS[cad], 'url': url}
                for iid, cad, as_of, age, url in stale
            ],
        }, ensure_ascii=False))
        return 0
    if '--stale' in argv:
        for s in stale:
            print('\t'.join(map(str, s)))
        return 0
    print(f'指標 {n} 個、章 {len(threads)} 個：結構錯誤 {len(errors)}、逾期 {len(stale)}')
    for e in errors:
        print('  ❌', e)
    for iid, cad, as_of, age, url in stale:
        print(f'  ⏰ {iid}（{cad}，期間到 {as_of}，已 {age} 天）{url}')
    if errors or ('--strict' in argv and stale):
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
