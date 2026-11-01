#!/usr/bin/env python3
"""data-hub-i18n.py — /data 資料中樞的多語對賬與待譯原文匯出。

兩層：
  1. 介面字串：src/i18n/dataHub.ts 的 en bundle ↔ data/data-hub/i18n/{lang}.json
  2. 內容層：src/data/data-hub/{indicators,threads,sources,intl,story}.json 裡每個在地化物件
     （有 'zh-TW' 鍵的 dict）↔ data/data-hub/content/{lang}.json 的「路徑 → 譯文」平面表。
     路徑規則必須跟 src/utils/data-hub.ts 的 walkLocs 一致：物件鍵以 / 串起、鍵名 $ 開頭略過、
     陣列元素有字串 id 用 id，沒有用索引。

用法：
  python3 scripts/tools/data-hub-i18n.py export          # 寫 data/data-hub/content/_source.json（待譯原文，zh-TW＋en）
  python3 scripts/tools/data-hub-i18n.py todo ja      # 某語言還缺的鍵與中英原文（JSON）
  python3 scripts/tools/data-hub-i18n.py check [lang…]   # 對賬（缺鍵、多鍵、空值、非 CJK 語言夾漢字）
"""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'src/data/data-hub'
UI_DIR = ROOT / 'data/data-hub/i18n'
CONTENT_DIR = ROOT / 'data/data-hub/content'
# 語言清單吃 languages.mjs（經 lang-sync/langs.py 單一橋），不在這裡寫死
sys.path.insert(0, str(ROOT / 'scripts' / 'tools' / 'lang-sync'))
from langs import ALL_TRANSLATION_LANGS  # noqa: E402

LANGS = [l for l in ALL_TRANSLATION_LANGS if l != 'en']  # 英文住在 SSOT 與 dataHub.ts
CJK_OK = {'ja', 'ko'}
HAN = re.compile(r'[一-鿿]')


def walk(node, path, out):
    if isinstance(node, dict) and isinstance(node.get('zh-TW'), str):
        out[path] = node
        return
    if isinstance(node, list):
        for i, item in enumerate(node):
            key = item['id'] if isinstance(item, dict) and isinstance(item.get('id'), str) else str(i)
            walk(item, f'{path}/{key}', out)
        return
    if isinstance(node, dict):
        for k, v in node.items():
            if k.startswith('$'):
                continue
            walk(v, f'{path}/{k}' if path else k, out)


def content_locs():
    out = {}
    for root in ['indicators', 'threads', 'sources', 'intl', 'story']:
        walk(json.loads((DATA / f'{root}.json').read_text(encoding='utf-8')), root, out)
    # 空字串的欄位（例如中文不需要的前綴）不必翻
    return {k: v for k, v in out.items() if (v.get('zh-TW') or v.get('en'))}


def ui_keys():
    ts = (ROOT / 'src/i18n/dataHub.ts').read_text(encoding='utf-8')
    en = ts.split('  en: {', 1)[1].split("  'zh-TW': {", 1)[0]
    return re.findall(r"^\s*'(dh\.[^']+)':", en, re.M)


def ui_strings():
    """dataHub.ts 裡 en 與 zh-TW 兩個區塊的 key → 字串（值可能跨行，取第一個單引號字串）。"""
    ts = (ROOT / 'src/i18n/dataHub.ts').read_text(encoding='utf-8')
    en = ts.split('  en: {', 1)[1].split("  'zh-TW': {", 1)[0]
    zh = ts.split("  'zh-TW': {", 1)[1]
    pat = re.compile(r"'(dh\.[^']+)':\s*\n?\s*(?:'((?:[^'\\]|\\.)*)'|\"((?:[^\"\\]|\\.)*)\")")
    grab = lambda block: {k: a or b for k, a, b in pat.findall(block)}
    e, z = grab(en), grab(zh)
    unq = lambda x: x.replace("\\'", "'").replace('\\"', '"')
    return {k: {'zh-TW': unq(z.get(k, '')), 'en': unq(e[k])} for k in ui_keys() if k in e}


def export():
    locs = content_locs()
    UI_DIR.mkdir(parents=True, exist_ok=True)
    (UI_DIR / '_source.json').write_text(json.dumps(ui_strings(), ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    # SSOT 裡已經十三語齊全的（例如 sources.json 的 tags 字典）不必再交給翻譯
    src = {k: {'zh-TW': v.get('zh-TW', ''), 'en': v.get('en', '')} for k, v in locs.items()
           if not all(l in v for l in LANGS)}
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    (CONTENT_DIR / '_source.json').write_text(json.dumps(src, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'✅ 匯出 {len(src)} 個內容欄位 → data/data-hub/content/_source.json；介面字串 {len(ui_keys())} 個（src/i18n/dataHub.ts en）')


NUM = re.compile(r'-?\d+(?:\.\d+)?')

# 語言身分：對賬只數鍵的話，翻譯分身互相覆蓋暫存檔、把別的語言寫進來也會全綠
# （2026-10-23 v2.1 五個分身共用 scratchpad 時真的發生過覆蓋）。有自己文字系統的
# 語言，40 字以上的譯文必須用到那套文字；拉丁語系彼此太像，這裡不判。
SCRIPT = {
    'ja': re.compile(r'[\u3040-\u30ff]'),
    'ko': re.compile(r'[\uac00-\ud7af]'),
    'ru': re.compile(r'[\u0400-\u04ff]'),
    'hi': re.compile(r'[\u0900-\u097f]'),
    'ar': re.compile(r'[\u0600-\u06ff]'),
    'vi': re.compile(r'[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]', re.I),
}


def chart_shape(text):
    """章節主圖（threads/…/chart/body）是一整段 tw-* fenced block：資料列（含 | 的列，
    來源列除外）的欄數與每一格裡的數字要跟原文一模一樣，翻譯只能動文字。"""
    rows = []
    for line in text.split('\n'):
        if '|' not in line:
            continue
        cells = [c.strip() for c in line.split('|')]
        rows.append((len(cells), [NUM.findall(c) for c in cells[1:]]))
    return rows


def check(langs):
    keys_ui = ui_keys()
    locs = content_locs()
    keys_c = list(locs.keys())
    bad = 0
    for lang in langs:
        for label, path, keys in [('介面', UI_DIR / f'{lang}.json', keys_ui), ('內容', CONTENT_DIR / f'{lang}.json', keys_c)]:
            if not path.exists():
                print(f'❌ {lang} {label}: 檔案不存在'); bad += 1; continue
            d = json.loads(path.read_text(encoding='utf-8'))
            # 內容層：SSOT 本身已經有這個語言的不必重複；退路語言（中日韓→中文、其他→英文）
            # 是空字串的欄位也不必翻（金額的 prefix／unit 靠空字串分家，見 data-hub.ts loc()）
            base = 'zh-TW' if lang in CJK_OK else 'en'
            need = [k for k in keys if not (label == '內容' and (lang in locs[k] or not locs[k].get(base, '')))]
            missing = [k for k in need if k not in d]
            extra = [k for k in d if k not in keys]
            # 內容層多出來的「不必翻」鍵（例如中日韓的 US$ 前綴）會蓋掉空字串退路，視為錯
            if label == '內容':
                extra += [k for k in d if k in locs and k not in need]
            empty = [k for k, v in d.items() if not isinstance(v, str) or not v.strip()]
            # 主圖：資料列的欄數與數字必須跟英文原文一致（中日韓對中文）
            if label == '內容':
                for k, v in d.items():
                    if k.endswith('/chart/body') and k in locs and isinstance(v, str):
                        if chart_shape(v) != chart_shape(locs[k].get(base, '')):
                            empty.append(k)
                            print(f'       主圖形狀跟原文不一致：{k}')
            han = [k for k, v in d.items() if lang not in CJK_OK and isinstance(v, str) and HAN.search(v)]
            if lang in SCRIPT:
                alien = [k for k, v in d.items() if isinstance(v, str) and len(v) >= 40
                         and not k.endswith('/chart/body') and not SCRIPT[lang].search(v)]
                for k in alien[:3]:
                    print(f'       不像 {lang}：{k} → {d[k][:60]}')
                empty += alien
            ok = not (missing or extra or empty)
            bad += 0 if ok else 1
            print(f"{'✅' if ok else '❌'} {lang} {label}: {len(d)}/{len(need)} missing={len(missing)} extra={len(extra)} empty={len(empty)} 含漢字={len(han)}")
            for k in (missing[:3] + extra[:3] + empty[:3]):
                print('      ', k)
            for k in han[:4]:
                print('       漢字:', k, '→', d[k][:70])
    return bad


def todo(lang):
    """某語言還缺的鍵與中英原文（給翻譯分身用，規則跟 check 的 need 一樣）。"""
    locs = content_locs()
    base = 'zh-TW' if lang in CJK_OK else 'en'
    cpath = CONTENT_DIR / f'{lang}.json'
    upath = UI_DIR / f'{lang}.json'
    have_c = json.loads(cpath.read_text(encoding='utf-8')) if cpath.exists() else {}
    have_u = json.loads(upath.read_text(encoding='utf-8')) if upath.exists() else {}
    content = {k: {'zh-TW': v.get('zh-TW', ''), 'en': v.get('en', '')} for k, v in locs.items()
               if lang not in v and v.get(base, '') and k not in have_c}
    ui_src = ui_strings()
    ui = {k: ui_src.get(k, '') for k in ui_keys() if k not in have_u}
    print(json.dumps({'lang': lang, 'base': base, 'ui': ui, 'content': content}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'check'
    if cmd == 'todo':
        todo(sys.argv[2])
    elif cmd == 'export':
        export()
    else:
        langs = sys.argv[2:] or LANGS
        sys.exit(1 if check(langs) else 0)
