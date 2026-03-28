#!/usr/bin/env python3
"""生成 i18n 翻譯進度 JSON"""
import os, json, glob

knowledge_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'knowledge')

# 掃描中文文章
zh_articles = set()
for root, dirs, files in os.walk(knowledge_dir):
    # 排除 en/, about/, _開頭
    rel = os.path.relpath(root, knowledge_dir)
    if rel.startswith('en') or rel.startswith('about') or rel.startswith('_'):
        continue
    dirs[:] = [d for d in dirs if not d.startswith('_') and d != 'en' and d != 'about']
    for f in files:
        if f.endswith('.md') and not f.startswith('_'):
            zh_articles.add(os.path.join(rel, f) if rel != '.' else f)

# 掃描英文文章
en_dir = os.path.join(knowledge_dir, 'en')
en_articles = set()
if os.path.isdir(en_dir):
    for root, dirs, files in os.walk(en_dir):
        dirs[:] = [d for d in dirs if not d.startswith('_')]
        for f in files:
            if f.endswith('.md') and not f.startswith('_'):
                en_articles.add(os.path.join(os.path.relpath(root, en_dir), f) if os.path.relpath(root, en_dir) != '.' else f)

# 按分類統計
categories = {}
for art in zh_articles:
    cat = art.split('/')[0] if '/' in art else 'root'
    if cat not in categories:
        categories[cat] = {'zh': 0, 'en': 0}
    categories[cat]['zh'] += 1

for art in en_articles:
    cat = art.split('/')[0] if '/' in art else 'root'
    if cat not in categories:
        categories[cat] = {'zh': 0, 'en': 0}
    categories[cat]['en'] += 1

progress = {
    'total_zh': len(zh_articles),
    'total_en': len(en_articles),
    'coverage_en': round(len(en_articles) / max(len(zh_articles), 1) * 100, 1),
    'categories': categories,
    'updated': __import__('datetime').datetime.now().isoformat()[:10]
}

print(json.dumps(progress, ensure_ascii=False, indent=2))

# 也寫入檔案
out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'data', 'i18n-progress.json')
os.makedirs(os.path.dirname(out), exist_ok=True)
with open(out, 'w') as f:
    json.dump(progress, f, ensure_ascii=False, indent=2)
print(f"\n✅ Written to {out}")