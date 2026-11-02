#!/usr/bin/env python3
"""election-poll-blackout.py — 選罷法第 53 條第 3 項的民調停刊工具。

投票日前十日起至投票時間截止前，不得以任何方式發布、報導、散布、評論或引述民調。
Taiwan.md 的選舉人物條目把民調整段包在
  <!-- poll-blackout:start --> … <!-- poll-blackout:end -->
之間。本工具：
  --check           列出所有帶標記的檔案；對每篇 zh 再查它的每個譯本有沒有帶到標記，
                    沒帶到的列出譯本裡疑似民調字樣（babel 重譯後要回來量一次）
  --strip [--apply] 把標記之間的內容換成一行 <!-- poll-blackout:stripped --> （預設 dry-run）
放回的方式是 git revert 那一個 strip commit（不在本工具內做，保留證據鏈）。

2026 九合一：哲宇 2026-11-02 拍板「不撤，明確標注時間」。民調表只收禁止期前
發布、八項齊備的，標題與說明寫明收錄日；11-18 00:00 至 11-28 16:00 凍結不改，
翻譯由 config/babel-hold.tsv 擋住（babel-dispatch 讀）。--strip 留作日後需要
真的撤下時用。法規沒有明文要求撤下禁止期前已發布的內容；中選會 99.01.12
中選法字第0980007819號函釋（禁止期前立的民調看板）說個案審酌、作為與不作為都算。
出處：全國法規資料庫 公職人員選舉罷免法 第 53 條。
"""
import argparse, json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parents[2] / 'knowledge'
START, END, STRIPPED = '<!-- poll-blackout:start -->', '<!-- poll-blackout:end -->', '<!-- poll-blackout:stripped -->'
# 標記外的疑似殘留：民調機構名與各語言「民調」字樣（只用來提醒人工看，不自動改）
RESIDUE = re.compile(r'東森民調雲|韜略|TVBS 民意調查|信民|民調|民意調查|\bpolls?\b|\bpolling\b|世論調査|여론조사|\bsondages?\b|\bencuestas?\b|Umfrage|\bsurvei\b|pesquisa(s)? de opinião|sondagem|thăm dò|सर्वेक्षण|استطلاع|\bопрос', re.I)

def files():
    for p in sorted(ROOT.rglob('*.md')):
        t = p.read_text(encoding='utf-8')
        if START in t or STRIPPED in t:
            yield p, t

def translations_of(zh_rel):
    tmap = json.loads((ROOT / '_translations.json').read_text(encoding='utf-8'))
    return sorted(k for k, v in tmap.items() if v == zh_rel)

def body(t):
    return t.split('\n---', 2)[-1] if t.startswith('---') else t

def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument('--check', action='store_true'); g.add_argument('--strip', action='store_true')
    ap.add_argument('--apply', action='store_true')
    a = ap.parse_args()
    marked = list(files())
    if a.check:
        print(f'帶標記的檔案 {len(marked)} 個')
        for p, t in marked:
            outside = re.sub(re.escape(START) + r'.*?' + re.escape(END), '', t, flags=re.S)
            hits = sorted(set(m.group(0) for m in RESIDUE.finditer(outside.split('\n---', 2)[-1])))
            state = 'stripped' if STRIPPED in t else 'live'
            print(f'  {state:8} {p.relative_to(ROOT.parent)}  標記外字樣：{hits or "無"}')
            if p.parent.parent != ROOT:
                continue  # 譯本本身已在上面列過
            for tr in translations_of(str(p.relative_to(ROOT))):
                tp = ROOT / tr
                if not tp.exists():
                    continue
                tt = tp.read_text(encoding='utf-8')
                if START in tt or STRIPPED in tt:
                    continue  # 有標記，上面那一輪會列
                hits = sorted(set(m.group(0) for m in RESIDUE.finditer(body(tt))))
                flag = '⚠️ 無標記' if hits else '   無標記'
                print(f'    {flag} {tr}  疑似民調字樣：{hits or "無"}')
        return 0
    n = 0
    for p, t in marked:
        new = re.sub(re.escape(START) + r'.*?' + re.escape(END), STRIPPED, t, flags=re.S)
        if new != t:
            n += 1; print(('撤下 ' if a.apply else '將撤下 ') + str(p.relative_to(ROOT.parent)))
            if a.apply: p.write_text(new, encoding='utf-8')
    print(f'{n} 個檔案' + ('' if a.apply else '（dry-run，加 --apply 才寫入）'))
    return 0

if __name__ == '__main__':
    sys.exit(main())
