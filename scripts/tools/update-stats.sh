#!/bin/bash
# Taiwan.md Daily Stats Update
# Run by cron at midnight daily
#
# ⚠️ IMPORTANT: This script MUST NOT modify about.template.astro
# The contributors grid is managed separately to avoid destroying
# Sponsors + Contact sections (happened 3 times already).
# Stats go into: README.md, src/i18n/about.ts, public/api/stats.json
set -e
cd "$(dirname "$0")/../.."

# Cross-platform in-place sed (BSD/macOS needs `-i ''`, GNU/Linux needs `-i`).
# 2026-06-13: the old hardcoded `sed -i ''` silently failed on CI ubuntu (GNU
# sed reads '' as the script), so README/about.ts never updated there — part of
# why the stats sat stale. sedi detects GNU sed via --version.
sedi() {
  if sed --version >/dev/null 2>&1; then sed -i "$@"; else sed -i '' "$@"; fi
}

echo "📊 Updating Taiwan.md stats..."

# 1. Stars/forks: dashboard-vitals.json SSOT (generate-dashboard-data.js fetches
#    them once with soft-fail preserve — the SAME source the about page reads, so
#    README / about / dashboard never diverge). 2026-06-13: was a direct `gh api`
#    call here — a second stars source that needed gh auth (absent in CI) and could
#    drift from the about value. Now this script needs no GitHub auth at all.
STARS=$(python3 -c "import json;print(json.load(open('public/api/dashboard-vitals.json')).get('stars',0))" 2>/dev/null || echo 0)
FORKS=$(python3 -c "import json;print(json.load(open('public/api/dashboard-vitals.json')).get('forks',0))" 2>/dev/null || echo 0)
# Contributors: contributors.json SSOT (GitHub /contributors API, refreshed
# every prebuild by generate-contributors-data.js — the SAME source the about
# page's data-driven grid reads, so README / about / dashboard stay consistent).
# 2026-06-13: was .all-contributorsrc (manual, a month stale at 57). contributors.json
# .totals.contributors is the live committer count; fall back to the rc file → 30.
CONTRIBUTORS=$(python3 -c "import json;print(json.load(open('public/api/contributors.json'))['totals']['contributors'])" 2>/dev/null || grep -c '"login"' .all-contributorsrc 2>/dev/null || echo 30)
# 各語言精確文章數（zh = 大寫分類目錄無 lang prefix；其他從 language registry 迭代）。
# 舊版 ZH_PAGES 用 `! -path '*/en/*'` 把 ja/ko/es/fr 全算進 zh（3977 假數）— 修正。
ZH_PAGES=$(find knowledge -maxdepth 2 -name '*.md' ! -name '_*' -regex 'knowledge/[A-Z][a-zA-Z]*/.*' | wc -l | tr -d ' ')
CAT_COUNT=$(find knowledge -maxdepth 1 -type d -regex 'knowledge/[A-Z][a-zA-Z]*' | wc -l | tr -d ' ')
LANGUAGE_STATS_JSON=$(node --input-type=module <<'NODEEOF'
import fs from 'node:fs';
import path from 'node:path';
import { LANGUAGES } from './src/config/languages.mjs';

function countArticles(root) {
  if (!fs.existsSync(root)) return 0;
  let count = 0;
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const child = path.join(root, entry.name);
    if (entry.isDirectory()) count += countArticles(child);
    else if (entry.name.endsWith('.md') && !entry.name.startsWith('_')) count += 1;
  }
  return count;
}

const rows = LANGUAGES
  .filter((language) => language.enabled && !language.isDefault)
  .map(({ code, displayName }) => ({
    code,
    displayName,
    count: countArticles(path.join('knowledge', code)),
  }));
process.stdout.write(JSON.stringify(rows));
NODEEOF
)
TOTAL_PAGES=$ZH_PAGES
# 近 7/30 天新文章：dashboard-vitals.json（routine 算好），fallback 0
D7=$(python3 -c "import json;print(json.load(open('public/api/dashboard-vitals.json')).get('articlesLast7Days',0))" 2>/dev/null || echo 0)
D30=$(python3 -c "import json;print(json.load(open('public/api/dashboard-vitals.json')).get('articlesLast30Days',0))" 2>/dev/null || echo 0)

echo "Stars: $STARS | Forks: $FORKS | Contributors: $CONTRIBUTORS"
echo "zh-TW:$ZH_PAGES translations:$LANGUAGE_STATS_JSON | 7d:$D7 30d:$D30"

# 2. Regenerate README stats table between STATS:START/END markers.
# 2026-06-13: full-block regen replaces the old per-row sed, which had drifted
# off README's row names (only Contributors still matched → whole table sat
# stale). Markers make it row-name-agnostic — robust against future renames.
python3 - "$ZH_PAGES" "$LANGUAGE_STATS_JSON" "$CAT_COUNT" "$CONTRIBUTORS" "$STARS" "$FORKS" "$D7" "$D30" <<'PYEOF'
import json
import re
import sys

zh, language_stats_json, cats, contrib, stars, forks, d7, d30 = sys.argv[1:9]
language_stats = json.loads(language_stats_json)
flags = {
    "en": "🇺🇸", "ja": "🇯🇵", "ko": "🇰🇷", "es": "🇪🇸", "fr": "🇫🇷",
    "vi": "🇻🇳", "id": "🇮🇩", "pt": "🇵🇹", "hi": "🇮🇳", "ar": "🇸🇦", "ru": "🇷🇺",
}
rows = [
    ("📄 Total articles (zh-TW SSOT)", zh),
    ("🇹🇼 Chinese (zh-TW)", zh),
    *[
        (f"{flags.get(item['code'], '🌐')} {item['displayName']} ({item['code']})", item["count"])
        for item in language_stats
    ],
    ("📂 Categories", cats),
    ("🕸️ Knowledge graph nodes", "220+"),
    ("🔗 Resource websites", "146+"),
    ("👥 Contributors", contrib),
    ("⭐ GitHub Stars", stars),
    ("🍴 Forks", forks),
    ("📅 Articles last 7 days", d7),
    ("📅 Articles last 30 days", d30),
]
table = "| Metric | Count |\n| --- | --- |\n" + "\n".join(f"| {m} | {c} |" for m, c in rows)
block = (
    "<!-- STATS:START — auto-generated by scripts/tools/update-stats.sh from SSOT "
    "(knowledge/ + contributors.json + dashboard-vitals.json). "
    "Do not edit by hand. -->\n\n" + table + "\n\n<!-- STATS:END -->"
)
readme = open("README.md").read()
if "<!-- STATS:START" not in readme:
    print("⚠️  README has no STATS markers — skipping (add them first)")
else:
    readme = re.sub(r"<!-- STATS:START.*?STATS:END -->", block, readme, flags=re.S)
    open("README.md", "w").write(readme)
    print("✅ README stats table regenerated")
PYEOF

# 2b. Regenerate the README all-contributors table from contributors.json.
# 2026-06-13: this used to be hand-maintained .all-contributorsrc (no bot — the
# rc file sat a month stale). Now both the table and about's grid read the same
# auto-generated SSOT (committers + git-inferred types ∪ rc curated overlay), so
# README stays in sync without anyone running the all-contributors CLI.
python3 - <<'PYEOF'
import json, re

try:
    ac = json.load(open("public/api/contributors.json")).get("allContributors", [])
except Exception:
    ac = []

if ac:
    cells = [
        f'<td align="center"><a href="{c["profileUrl"]}"><img src="{c["avatarUrl"]}" '
        f'width="100px;" alt=""/><br /><sub><b>{c.get("name", c["login"])}</b></sub></a>'
        f'<br />{" ".join(c.get("types", []))}</td>'
        for c in ac
    ]
    rows = [
        "  <tr>\n    " + "\n    ".join(cells[i : i + 8]) + "\n  </tr>"
        for i in range(0, len(cells), 8)
    ]
    table = "<table>\n" + "\n".join(rows) + "\n</table>"
    block = (
        "<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->\n"
        + table
        + "\n<!-- ALL-CONTRIBUTORS-LIST:END -->"
    )
    readme = open("README.md").read()
    if "<!-- ALL-CONTRIBUTORS-LIST:START" in readme:
        readme = re.sub(
            r"<!-- ALL-CONTRIBUTORS-LIST:START.*?ALL-CONTRIBUTORS-LIST:END -->",
            block,
            readme,
            flags=re.S,
        )
        open("README.md", "w").write(readme)
        print(f"✅ README all-contributors table regenerated ({len(ac)} people)")
    else:
        print("⚠️  README has no ALL-CONTRIBUTORS markers — skipping")
PYEOF

# 3. Update about page stats via i18n (NOT the template!)
# Round stars to nearest 100
if [ "$STARS" -ge 1000 ]; then
  STARS_DISPLAY="$(echo "$STARS" | sed 's/..$//')00+"
elif [ "$STARS" -ge 100 ]; then
  STARS_DISPLAY="$(echo "$STARS" | sed 's/.$//')0+"
else
  STARS_DISPLAY="${STARS}+"
fi

PAGES_DISPLAY="${TOTAL_PAGES}+"
CONTRIBUTORS_DISPLAY="${CONTRIBUTORS}+"

# Update i18n stats (safe — only changes string values)
sedi "s/'about.stats.pages.number': '[^']*'/'about.stats.pages.number': '${PAGES_DISPLAY}'/g" src/i18n/about.ts
sedi "s/'about.stats.stars.number': '[^']*'/'about.stats.stars.number': '${STARS_DISPLAY}'/g" src/i18n/about.ts
sedi "s/'about.stats.contributors.number': '[^']*'/'about.stats.contributors.number': '${CONTRIBUTORS_DISPLAY}'/g" src/i18n/about.ts

# 3b. 對外 prose 文章數接管（2026-07-05 dna-audit §S2 對外層腐化）：
# README Features 行曾停在 793、SEO.astro 752、home.ts 750（實際 828）——這些
# marketing prose 不在 STATS 標記內，從未被本 script 接管。root cure = 接管，
# 不是一次性改數字（改完還是會腐）。counts-drift-lint.py 對賬這些位置。
LANG_COUNT=$(node --input-type=module -e "import { ENABLED_LANGUAGE_CODES } from './src/config/languages.mjs'; console.log(ENABLED_LANGUAGE_CODES.length)")
PROJECTED=$((TOTAL_PAGES * LANG_COUNT))
python3 - "$TOTAL_PAGES" "$CAT_COUNT" "$LANG_COUNT" "$PROJECTED" <<'PYEOF'
import re, sys
zh, cats, langs, proj = sys.argv[1:5]
def patch(path, subs):
    try:
        t = open(path, encoding="utf-8").read()
    except FileNotFoundError:
        return
    orig = t
    for pat, rep in subs:
        t = re.sub(pat, rep, t)
    if t != orig:
        open(path, "w", encoding="utf-8").write(t)
        print(f"✅ outward counts regenerated: {path}")

patch("README.md", [
    (r"- 📖 \*\*\d+ curated articles\*\* \(zh-TW SSOT\) across \d+ categories — projected to \*\*\d+ languages\*\* = [\d,]+ article-versions",
     f"- 📖 **{zh} curated articles** (zh-TW SSOT) across {cats} categories — projected to **{langs} languages** = {int(proj):,} article-versions"),
])
patch("src/components/SEO.astro", [
    (r"\d+\+ 篇深度策展文章", f"{zh}+ 篇深度策展文章"),
    (r"\d+\+ curated articles", f"{zh}+ curated articles"),
])
patch("src/i18n/home.ts", [
    (r"\d+\+ pages of in-depth content", f"{zh}+ pages of in-depth content"),
    (r"\d+以上の深掘り記事", f"{zh}以上の深掘り記事"),
    (r"\d+\+ 심층 기사", f"{zh}+ 심층 기사"),
    (r"\d+\+ 頁深度內容", f"{zh}+ 頁深度內容"),
    (r"Plus de \d+ pages de contenu", f"Plus de {zh} pages de contenu"),
    (r"Más de \d+ páginas de contenido", f"Más de {zh} páginas de contenido"),
])
PYEOF

# 4. Merge GitHub stats into public/api/stats.json (preserve existing fields!)
# stats.json is primarily generated by generate-content-stats.js with rich data
# (categories, tags, etc). We only update the GitHub-sourced fields here.
python3 - "$STARS" "$FORKS" "$CONTRIBUTORS" "$ZH_PAGES" "$TOTAL_PAGES" "$LANGUAGE_STATS_JSON" <<'PYEOF'
import json
import os
import sys

stars, forks, contributors, zh_pages, total_pages, language_stats_json = sys.argv[1:7]
stats_path = 'public/api/stats.json'
if os.path.exists(stats_path):
    with open(stats_path) as f:
        stats = json.load(f)
else:
    stats = {}
# Only update GitHub-sourced fields, preserve everything else
stats['stars'] = int(stars)
stats['forks'] = int(forks)
stats['estimatedContributors'] = int(contributors)
stats['zhPages'] = int(zh_pages)
language_stats = json.loads(language_stats_json)
language_pages = {'zh-TW': int(zh_pages), **{row['code']: row['count'] for row in language_stats}}
stats['languagePages'] = language_pages
stats['enPages'] = language_pages.get('en', 0)
stats['totalPages'] = int(total_pages)
with open(stats_path, 'w') as f:
    json.dump(stats, f, indent=2, ensure_ascii=False)
print("✅ stats.json merged (preserved existing fields)")
PYEOF

# 5. Generate content stats
node scripts/tools/generate-content-stats.js 2>/dev/null || true

echo "✅ Stats updated: ⭐${STARS} 🍴${FORKS} 👥${CONTRIBUTORS} 📄${TOTAL_PAGES}"
echo ""
echo "⚠️ about.template.astro was NOT touched (by design)."
echo "   Contributors grid is updated by the separate Contributors Update cron."
