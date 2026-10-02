#!/usr/bin/env python3
"""hub-translate.py — 分類 Hub 檔的出生翻譯 runner（2026-07-18 出生戰役）。

病根：`_* Hub.md` 不在 `_translation-status.json`（status 索引排除 `_` 前綴），
prepare-batch --input 對它們一律 Skipping unknown → 標準批次管線從不服務 Hub，
es/fr 當年是手工。本 runner 手構 group-entry schema 直呼 translate_one 復用
完整 cascade + 驗證 + 落檔機制。

2026-09-05 修（wikilink_targets 從誕生起一律傳空 dict）：git blame 顯示本檔
從出生就沒有組 wikilink_targets，`armor_pre()` 因此對每篇 Hub 的 `[[X]]` 完全
拿不到指引，模型會把方括號留著但把目標翻掉／搞丟（de Culture Hub 30 個、
People Hub 113 個 hard wikilink-target-not-found）。現在比照
`prepare-batch.py`（`get_top_stale_missing` 那條路）在呼叫 `armor_pre()` 前
現場組 zh→{lang} 索引 + 逐個 `lookup_wikilink_target()`，見
`build_zh_to_lang_index()` / `build_wikilink_targets()`。

用法：
    python3 scripts/tools/lang-sync/hub-translate.py <lang> [cascade]   # cascade 預設 codex,ollama
    python3 scripts/tools/lang-sync/hub-translate.py <lang> --dry-run   # 只印 wikilink 解析結果，不呼叫後端、不寫檔
"""
import argparse
import importlib.util
import json
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(REPO / 'scripts/tools/lang-sync'))

# 已誕生語言目錄——`knowledge/*/_* Hub.md` glob 也會撈到這些目錄自己的
# Hub 翻譯檔，必須排除才不會把「已譯 Hub」誤當成「待譯 zh 來源」重譯一次。
LANG_DIRS = ('en', 'ja', 'ko', 'es', 'fr', 'vi', 'id', 'pt', 'hi', 'ar', 'ru', 'de')


def load(name, fname):
    spec = importlib.util.spec_from_file_location(name, REPO / 'scripts/tools/lang-sync' / fname)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


tr = load('translate_mod', 'translate.py')
pb = load('prepare_mod', 'prepare-batch.py')


def build_zh_to_lang_index(lang: str) -> dict:
    """比照 `prepare-batch.py` Step 3：從 `_translations.json` 組 zh→{lang} 索引，
    供 `build_wikilink_targets()` 查 wikilink target 用。"""
    trans_data = json.load(open(REPO / 'knowledge' / '_translations.json', encoding="utf-8"))
    zh_to_lang: dict = {}
    for lang_path, zh_path in trans_data.items():
        if lang_path.startswith(f'{lang}/') and zh_path not in zh_to_lang:
            zh_to_lang[zh_path] = lang_path
    return zh_to_lang


def build_wikilink_targets(zh_path: str, zh_to_lang_idx: dict) -> dict:
    """比照 `prepare-batch.py` manifest 迴圈：抽 zh 來源裡的 `[[X]]`，逐個查
    `zh_to_lang_idx`，組出 `armor_pre()` 要吃的 `wikilink_targets` dict——
    有解析到目標是 `/lang/...` 路徑字串，沒有解析到是 zh-only 提示字串
    （與 prepare-batch.py 同一套慣例：故意不是 None／不省略 key，因為
    `armor_pre()` 的判斷式是 `target.startswith('/')`，兩種情況都要讓模型
    收到明確指引，而不是讓 `[[X]]` 沒有任何對照就留在 prompt 裡）。"""
    wikilinks = pb.extract_wikilinks(zh_path)
    target_map: dict = {}
    for wl in wikilinks:
        wl_clean = wl.split('|')[0].strip()
        target = pb.lookup_wikilink_target(wl, zh_to_lang_idx)
        target_map[wl_clean] = target if target else '(zh only — convert to plain text + Chinese parenthesis)'
    return target_map


def discover_hubs():
    return sorted(p for p in (REPO / 'knowledge').glob('*/_* Hub.md')
                  if p.parts[-2] not in LANG_DIRS)


def build_hub_article(hub: Path, lang: str, wikilink_targets: dict) -> dict:
    zh_path = str(hub.relative_to(REPO / 'knowledge'))
    cat, stem = hub.parts[-2], hub.stem
    sha, content_hash, body_hash = pb.get_zh_meta(zh_path)
    return {
        'zh_path': zh_path,
        'status': 'missing',
        'en_path': f'knowledge/{lang}/{cat}/{hub.name}',
        'slug': stem,
        'zh_head_sha': sha,
        'zh_content_hash': content_hash,
        'zh_body_hash': body_hash,
        'wikilink_targets': wikilink_targets,
        'frontmatter_placeholder': {
            'translatedFrom': zh_path,
            'sourceCommitSha': sha,
            'sourceContentHash': content_hash,
            'sourceBodyHash': body_hash,
            'translatedAt': datetime.now().astimezone().isoformat(timespec='seconds'),
        },
    }


def run_dry_run(lang: str, zh_to_lang_idx: dict, hubs: list) -> None:
    """只印每個 Hub 的 wikilink 解析結果 + `armor_pre()` 組出的 wikilink_note
    前幾行，不建 cascade、不呼叫後端、不寫檔。刻意對「已存在」的 Hub 檔也照跑
    （不套用 `out.exists()` skip），因為驗證這個修復時常見情境就是目標語言
    13 個 Hub 全部已存在——不對已存在的檔分析就等於永遠驗不到。"""
    for hub in hubs:
        zh_path = str(hub.relative_to(REPO / 'knowledge'))
        cat, stem = hub.parts[-2], hub.stem
        out = REPO / 'knowledge' / lang / cat / hub.name
        wikilink_targets = build_wikilink_targets(zh_path, zh_to_lang_idx)
        resolved = sum(1 for v in wikilink_targets.values() if not v.startswith('(zh only'))
        unresolved = len(wikilink_targets) - resolved
        tag = 'existing' if out.exists() else 'missing'
        print(f'[{lang}] {zh_path} [{tag}]: {len(wikilink_targets)} wikilinks '
              f'({resolved} resolved, {unresolved} zh-only)')
        if not wikilink_targets:
            continue
        article = build_hub_article(hub, lang, wikilink_targets)
        zh_content = hub.read_text(encoding='utf-8')
        system, _user, _ctx = tr.armor_pre(article, zh_content, lang)
        idx = system.find('WIKILINK TARGETS')
        if idx == -1:
            print('   ⚠️  wikilink_note NOT found in armor_pre() system prompt')
            continue
        preview = '\n'.join(system[idx:].splitlines()[:6])
        print('   wikilink_note preview:')
        for line in preview.splitlines():
            print(f'     {line}')


def run_live(lang: str, cascade_id: str, zh_to_lang_idx: dict, hubs: list) -> None:
    cascade = tr.build_cascade(cascade_id)
    ok = fail = skip = 0
    for hub in hubs:
        zh_path = str(hub.relative_to(REPO / 'knowledge'))
        cat = hub.parts[-2]
        out = REPO / 'knowledge' / lang / cat / hub.name
        if out.exists():
            skip += 1
            continue
        wikilink_targets = build_wikilink_targets(zh_path, zh_to_lang_idx)
        article = build_hub_article(hub, lang, wikilink_targets)
        print(f'[{lang}] {zh_path} … ({len(wikilink_targets)} wikilinks)', flush=True)
        success, err, backend = tr.translate_one(article, lang, cascade)
        if success:
            ok += 1
            print(f'   ✅ via {backend}', flush=True)
        else:
            fail += 1
            print(f'   ❌ {err}', flush=True)

    print(f'HUBS {lang}: ok={ok} fail={fail} skip={skip}')


def main(argv=None) -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('lang')
    ap.add_argument('cascade_id', nargs='?', default='codex,ollama')
    ap.add_argument('--dry-run', action='store_true',
                     help='只印 wikilink 解析結果 + armor_pre() wikilink_note 前幾行，不呼叫後端、不寫檔')
    args = ap.parse_args(argv)

    lang = args.lang
    zh_to_lang_idx = build_zh_to_lang_index(lang)
    hubs = discover_hubs()

    if args.dry_run:
        run_dry_run(lang, zh_to_lang_idx, hubs)
    else:
        run_live(lang, args.cascade_id, zh_to_lang_idx, hubs)


if __name__ == '__main__':
    main()
