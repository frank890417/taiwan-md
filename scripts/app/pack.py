#!/usr/bin/env python3
"""pack.py — App 內容包產線第二步：render.mjs 的 NDJSON → 每語一個 SQLite（LZMA 壓縮）＋ index.json。

契約：reports/ios-app-implementation-plan-2026-11-02.md §四（schema 1）。
搜尋欄的正規化規則必須跟 apps/ios/App/Data/TextNormalizer.swift 逐字一致；
兩邊共用 apps/ios/Tests/normalize-cases.json 當對照樣本（--check-normalizer）。

用法：
  python3 scripts/app/pack.py --nd <ndjson 目錄> --out <輸出目錄> [--commit <sha>]
  python3 scripts/app/pack.py --check-normalizer apps/ios/Tests/normalize-cases.json
"""
import argparse
import datetime as dt
import hashlib
import json
import lzma
import os
import re
import sqlite3
import sys
import unicodedata

SCHEMA = 1
ARABIC_MARKS = re.compile('[ً-ٰٟـ]')
SPACES = re.compile(r'\s+')


def normalize(s: str) -> str:
    """NFKC → 小寫 → 去阿拉伯文母音符號與延長符 → 空白壓成一個。"""
    s = unicodedata.normalize('NFKC', s or '')
    s = s.lower()
    s = ARABIC_MARKS.sub('', s)
    return SPACES.sub(' ', s).strip()


def build(nd_path: str, db_path: str, lang: str, commit: str) -> int:
    if os.path.exists(db_path):
        os.remove(db_path)
    db = sqlite3.connect(db_path)
    db.executescript(
        """
        PRAGMA page_size = 4096;
        CREATE TABLE meta(key TEXT PRIMARY KEY, value TEXT);
        CREATE TABLE articles(
          key TEXT PRIMARY KEY, path TEXT NOT NULL, category TEXT NOT NULL, subcategory TEXT,
          title TEXT NOT NULL, description TEXT, tags TEXT, date TEXT, created TEXT, updated TEXT,
          readingTime INTEGER, featured INTEGER DEFAULT 0,
          image TEXT, imageAlt TEXT, imageCredit TEXT, imageLicense TEXT, heroInBody INTEGER DEFAULT 0,
          chars INTEGER, hash TEXT);
        CREATE TABLE bodies(key TEXT PRIMARY KEY, html TEXT NOT NULL);
        CREATE TABLE search(key TEXT PRIMARY KEY, title TEXT, meta TEXT, body TEXT);
        """
    )
    n = 0
    seen = set()
    with open(nd_path, encoding='utf-8') as f:
        for line in f:
            r = json.loads(line)
            if r['key'] in seen:  # 兩篇譯文指到同一篇中文：留第一篇
                print(f'  ⚠️ {lang} 重複 key {r["key"]}（{r["path"]}）略過', file=sys.stderr)
                continue
            seen.add(r['key'])
            db.execute(
                'INSERT INTO articles VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                (
                    r['key'], r['path'], r['category'], r['subcategory'], r['title'], r['description'],
                    json.dumps(r['tags'], ensure_ascii=False), r['date'], r['created'], r['updated'], r['readingTime'],
                    1 if r['featured'] else 0, r['image'], r['imageAlt'], r['imageCredit'], r['imageLicense'],
                    1 if r['heroInBody'] else 0, r['chars'], r['hash'],
                ),
            )
            db.execute('INSERT INTO bodies VALUES (?,?)', (r['key'], r['html']))
            db.execute(
                'INSERT INTO search VALUES (?,?,?,?)',
                (
                    r['key'],
                    normalize(r['title']),
                    normalize(' '.join([r['description'] or '', ' '.join(r['tags']), r['subcategory'] or ''])),
                    normalize(r['text']),
                ),
            )
            n += 1
    db.execute('CREATE INDEX articles_path ON articles(path)')
    db.execute('CREATE INDEX articles_category ON articles(category, created)')
    now = dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    db.executemany(
        'INSERT INTO meta VALUES (?,?)',
        [('schema', str(SCHEMA)), ('lang', lang), ('generatedAt', now), ('commit', commit), ('articles', str(n))],
    )
    db.commit()
    db.execute('VACUUM')
    db.close()
    return n


def sha256(path: str) -> str:
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1 << 20), b''):
            h.update(chunk)
    return h.hexdigest()


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--nd')
    ap.add_argument('--out')
    ap.add_argument('--commit', default='')
    ap.add_argument('--check-normalizer')
    a = ap.parse_args()

    if a.check_normalizer:
        cases = json.load(open(a.check_normalizer, encoding='utf-8'))
        bad = [c for c in cases if normalize(c['in']) != c['out']]
        for c in bad:
            print(f'❌ {c["in"]!r} → {normalize(c["in"])!r}，期望 {c["out"]!r}')
        print(f'{len(cases) - len(bad)}/{len(cases)} 正規化樣本一致')
        sys.exit(1 if bad else 0)

    os.makedirs(a.out, exist_ok=True)
    index = {
        'schema': SCHEMA,
        'minAppSchema': SCHEMA,
        'generatedAt': dt.datetime.now(dt.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
        'source': {'repo': 'frank890417/taiwan-md', 'commit': a.commit},
        'packs': {},
    }
    for name in sorted(os.listdir(a.nd)):
        if not name.endswith('.ndjson'):
            continue
        lang = name[: -len('.ndjson')]
        db_path = os.path.join(a.out, f'pack-{lang}.sqlite')
        n = build(os.path.join(a.nd, name), db_path, lang, a.commit)
        raw = open(db_path, 'rb').read()
        xz_path = db_path + '.lzma'
        with open(xz_path, 'wb') as f:
            f.write(lzma.compress(raw, format=lzma.FORMAT_XZ, check=lzma.CHECK_CRC32, preset=9))
        index['packs'][lang] = {
            'file': os.path.basename(xz_path),
            'bytes': os.path.getsize(xz_path),
            'rawBytes': len(raw),
            'sha256': sha256(xz_path),
            'articles': n,
            'generatedAt': index['generatedAt'],
        }
        print(f'{lang}\t{n} 篇\tsqlite {len(raw) / 1e6:.1f} MB\tlzma {os.path.getsize(xz_path) / 1e6:.1f} MB')
    with open(os.path.join(a.out, 'index.json'), 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    print(f'index.json：{len(index["packs"])} 語')


if __name__ == '__main__':
    main()
