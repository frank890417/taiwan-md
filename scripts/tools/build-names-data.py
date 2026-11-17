#!/usr/bin/env python3
"""build-names-data.py — 從研究原始檔產生 /names 專題頁用的統計資料檔。

輸入：reports/research/2026-11/names-moi-data.json
      （內政部《全國姓名統計分析》112 年版與《內政統計通報》逐表抄錄，每段附表號與頁碼）
      reports/research/2026-11/names-sutian-baijiaxing-all293.json
      （教育部《臺灣台語常用詞辭典》附錄「百家姓」：姓、詞目編號、音讀）
      reports/research/2026-11/names-hakka-baijiaxing-all468.json
      （教育部《臺灣客語辭典》附錄「百家姓表」：堂號|姓、注音、六腔客語拼音）
輸出：src/data/names/moi.json（統計）
      src/data/names/surname-readings.json（前 30 大姓的台語、客語姓氏讀音，逐筆照辭典原樣）

只做挑欄位與改形狀，不做任何估算。唯一的衍生值是「占總人口 %」（人數 ÷ 總人口），
欄名標 pctDerived，頁面上也照實標示。
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
raw = json.loads((ROOT / 'reports/research/2026-11/names-moi-data.json').read_text('utf8'))
PDF = raw['_meta']['pdf_url']
total = raw['_meta']['total_population']


def cohort_key(k: str):
    # 「民國50年至59年」→ (50, 59)；「民國110年至112年6月」→ (110, 112)
    import re

    a, b = re.findall(r'\d+', k)[:2]
    return int(a), int(b)


def cohorts(sex):
    out = []
    for k, rows in raw['3_by_birth_cohort_top10'][sex].items():
        a, b = cohort_key(k)
        out.append(
            {
                'roc': [a, b],
                'ce': [a + 1911, b + 1911],
                'partial': '6月' in k,
                'top': [[r['name'], r['count']] for r in rows],
            }
        )
    return out


ms = raw['7_mother_surname']
ind = raw['6_indigenous']
data = {
    'meta': {
        'asOf': '2023-06-30',
        'edition': '內政部《全國姓名統計分析》112年版（2023 年 10 月出版，資料基準日 2023-06-30）',
        'pdf': PDF,
        'catalog': raw['_meta']['catalog_urls'][0],
        'population': total,
        'note': '報告把「黃／黄」「溫／温」「高／髙」等異體字分開統計，本檔照原表不合併。',
    },
    'counts': {
        'surnames': raw['1_surname_counts']['total_surnames'],
        'single': raw['1_surname_counts']['single'],
        'compound': raw['1_surname_counts']['compound'],
        'compoundPop': raw['1_surname_counts']['compound_pop'],
        'otherPop': raw['1_surname_counts']['other_pop'],
        'page': 24,
    },
    'concentration': {
        'page': 25,
        'rows': [[r[0], r[1], r[2], r[4]] for r in raw['1_surname_concentration']['rows']],
    },
    'surnames': {
        'page': '282–283',
        'rows': [
            [r['rank'], r['surname'], r['count'], round(r['count'] / total * 100, 2)]
            for r in raw['1_top100_surnames']['rows']
        ],
    },
    'compound': {'page': 28, 'rows': [[r['surname'], r['count']] for r in raw['1_top5_compound']['rows']]},
    'counties': {
        'page': 30,
        'rows': [
            [r['county'], r['top10_in_order'], r['pct_of_county_pop']]
            for r in raw['2_county_top10_surnames']['rows']
        ],
    },
    'cohorts': {'page': '280–281', 'male': cohorts('male'), 'female': cohorts('female')},
    'given': {
        'page': '266–267',
        'male': [[r['name'], r['count']] for r in raw['3_top_given_names']['male'][:10]],
        'female': [[r['name'], r['count']] for r in raw['3_top_given_names']['female'][:10]],
    },
    'singleName': {
        'page': 60,
        'pop': raw['5_name_length']['single_name_pop'],
        'pct': raw['5_name_length']['single_name_pct'],
    },
    'reduplicated': {
        'page': 62,
        'pop': raw['5_name_length']['reduplicated_pop'],
        'male': raw['5_name_length']['reduplicated_male'],
        'female': raw['5_name_length']['reduplicated_female'],
    },
    'longNames': {
        'page': 83,
        'total': raw['5_name_length']['over_six_chars']['total'],
        'byLen': raw['5_name_length']['over_six_chars']['by_len'],
        'indigenous': raw['5_name_length']['over_six_chars']['indigenous'],
        'indigenousPct': raw['5_name_length']['over_six_chars']['indigenous_pct'],
    },
    'indigenous': {
        'population': ind['table43']['total_indigenous'],
        'romanizedParallel': ind['table43']['romanized_parallel'],
        'romanizedParallelPct': ind['table43']['pct'],
        'page43': 248,
        'restored': ind['table44']['restored_traditional'],
        'restoredHan': ind['table44']['restored_han'],
        'birthTraditional': ind['table44']['birth_reg_traditional'],
        'restoredPeriod': [2008, 2022],
        'page44': 250,
        'other': ind['other_column']['value'],
        'top10Surnames': ind['indigenous_total_top10_surnames']['top10'],
        'top10Pct': ind['indigenous_total_top10_surnames']['top10_pct'],
        'page15': 38,
    },
    'motherSurname': {
        'history': {
            'page': 67,
            'rows': [[int(y) + 1911, v] for y, v in ms['history_97_111']['overall_pct'].items()],
        },
        'recent': {
            'url': ms['recent']['source']['url'],
            'doc': '內政部統計處《內政統計通報》114 年第 46 週（2025-11-15）',
            'rows': [
                [r['year'], r['total'], r['mother'], r['mother_pct']] for r in ms['recent']['rows']
            ],
        },
        'stock': {'page': 55, 'mother': ms['stock_2023']['mother'], 'motherPct': ms['stock_2023']['mother_pct']},
    },
    'spouseSurname': {
        'page': '200–204',
        'total': ms['married_name_prefix']['total_persons_with_spouse_surname_prefix'],
        'female': ms['married_name_prefix']['female'],
        # 報告內文 p.37 原句：「占總人口數3.93％……女性917,215人（99.86％）」
        'pct': 3.93,
        'femalePct': 99.86,
        # 表三十二：2018–2022 年新冠姓與撤冠姓人數
        'flowPage': 72,
        'flowPeriod': [2018, 2022],
        'flowAdd': ms['prefix_trend']['prefix_new'],
        'flowRemove': ms['prefix_trend']['remove_prefix'],
    },
    # 報告內文 p.52 原句：「僅 1 人者，達 268 姓……累計10人以下姓氏，共有750姓，占總姓量42.02％」
    'rare': {'page': 52, 'one': 268, 'tenOrLess': 750, 'tenOrLessPct': 42.02},
    'motherAgreement': {
        'period': '2025-01~09',
        'agreed': ms['recent']['by_agreement_2025_1_9']['parents_agreed'],
        'agreedMotherPct': ms['recent']['by_agreement_2025_1_9']['parents_agreed_mother_pct'],
        'oneParty': ms['recent']['by_agreement_2025_1_9']['one_party_decided'],
        'onePartyMotherPct': ms['recent']['by_agreement_2025_1_9']['one_party_mother_pct'],
        'draw': ms['recent']['by_agreement_2025_1_9']['draw'],
        'topCounties': ms['recent']['top_counties_2025_1_9'],
    },
    'nameChanges': {
        'page': 73,
        'rows': [
            [int(y) + 1911, v]
            for y, v in raw['7_name_changes']['given_name_change_102_111']['yearly'].items()
        ],
        'total': raw['7_name_changes']['given_name_change_102_111']['total'],
    },
}
out = ROOT / 'src/data/names/moi.json'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n', 'utf8')
print(f'moi.json: {out.stat().st_size} bytes; surnames={len(data["surnames"]["rows"])} cohorts={len(data["cohorts"]["male"])}')

# ── 前 30 大姓的台語、客語讀音（照辭典原樣，不轉寫、不推導）──────────────
RES = ROOT / 'reports/research/2026-11'
sutian = {r[0]: r for r in json.loads((RES / 'names-sutian-baijiaxing-all293.json').read_text('utf8'))}
hakka = {}
for r in json.loads((RES / 'names-hakka-baijiaxing-all468.json').read_text('utf8')):
    hakka.setdefault(r[0].split('|')[-1], r)
rows = []
for rank, surname, count, pct in data['surnames']['rows'][:30]:
    t, h = sutian[surname], hakka[surname]
    rows.append(
        {
            'surname': surname,
            'taigi': t[2],
            'sutianId': t[1],
            # 六腔順序：四縣／海陸／大埔／饒平／詔安／南四縣；頁面只列四縣與海陸
            'hakkaSixian': h[2],
            'hakkaHailu': h[3],
        }
    )
readings = {
    'meta': {
        'retrieved': '2026-11-10',
        'taigi': {
            'name': '教育部《臺灣台語常用詞辭典》附錄「百家姓」',
            'url': 'https://sutian.moe.edu.tw/zh-hant/huliok/105/',
            'entry': 'https://sutian.moe.edu.tw/zh-hant/su/{id}/',
            'license': '創用 CC 姓名標示-禁止改作 3.0 臺灣',
            'note': '音讀以高雄腔為主，辭典以「/」並列第二優勢腔。拼寫為臺灣台語羅馬字拼音方案（臺羅）。',
        },
        'hakka': {
            'name': '教育部《臺灣客語辭典》附錄「百家姓表」',
            'url': 'https://hakkadict.moe.edu.tw/appendix/%E7%99%BE%E5%AE%B6%E5%A7%93%E8%A1%A8',
            'license': '創用 CC 姓名標示-禁止改作 3.0 臺灣',
            'note': '拼寫為臺灣客語拼音方案，音節後的數字是調值。',
        },
    },
    'rows': rows,
}
out2 = ROOT / 'src/data/names/surname-readings.json'
out2.write_text(json.dumps(readings, ensure_ascii=False, indent=1) + '\n', 'utf8')
print(f'surname-readings.json: {len(rows)} 姓')
