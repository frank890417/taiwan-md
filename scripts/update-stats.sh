#!/bin/bash
# Taiwan.md Daily Stats Update
# Run by cron at midnight daily
#
# ⚠️ IMPORTANT: This script MUST NOT modify about.template.astro
# The contributors grid is managed separately to avoid destroying
# Sponsors + Contact sections (happened 3 times already).
# Stats go into: README.md, src/i18n/about.ts, public/api/stats.json
set -e
cd "$(dirname "$0")/.."

echo "📊 Updating Taiwan.md stats..."

# 1. Fetch current stats from GitHub API
STARS=$(gh api repos/frank890417/taiwan-md --jq '.stargazers_count')
FORKS=$(gh api repos/frank890417/taiwan-md --jq '.forks_count')
CONTRIBUTORS=$(gh api repos/frank890417/taiwan-md/contributors --jq 'length')
ZH_PAGES=$(find knowledge -name '*.md' ! -name '_*' ! -path '*/en/*' | wc -l | tr -d ' ')
EN_PAGES=$(find knowledge/en -name '*.md' ! -name '_*' | wc -l | tr -d ' ')
TOTAL_PAGES=$((ZH_PAGES + EN_PAGES))

echo "Stars: $STARS | Forks: $FORKS | Contributors: $CONTRIBUTORS"
echo "ZH: $ZH_PAGES | EN: $EN_PAGES | Total: $TOTAL_PAGES"

# 2. Update README stats table
sed -i '' "s/| 🇹🇼 Chinese articles.*|.*/| 🇹🇼 Chinese articles      | $ZH_PAGES |/" README.md
sed -i '' "s/| 🇺🇸 English articles.*|.*/| 🇺🇸 English articles      | $EN_PAGES  |/" README.md
sed -i '' "s/| 👥 Contributors.*|.*/| 👥 Contributors          | $CONTRIBUTORS    |/" README.md

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
sed -i '' "s/'about.stats.pages.number': '[^']*'/'about.stats.pages.number': '${PAGES_DISPLAY}'/g" src/i18n/about.ts
sed -i '' "s/'about.stats.stars.number': '[^']*'/'about.stats.stars.number': '${STARS_DISPLAY}'/g" src/i18n/about.ts
sed -i '' "s/'about.stats.contributors.number': '[^']*'/'about.stats.contributors.number': '${CONTRIBUTORS_DISPLAY}'/g" src/i18n/about.ts

# 4. Update public/api/stats.json
python3 << PYEOF
import json
stats = {
    "stars": $STARS,
    "forks": $FORKS,
    "contributors": $CONTRIBUTORS,
    "zhPages": $ZH_PAGES,
    "enPages": $EN_PAGES,
    "totalPages": $TOTAL_PAGES,
}
with open('public/api/stats.json', 'w') as f:
    json.dump(stats, f, indent=2)
print("✅ stats.json updated")
PYEOF

# 5. Generate content stats
node scripts/generate-content-stats.js 2>/dev/null || true

echo "✅ Stats updated: ⭐${STARS} 🍴${FORKS} 👥${CONTRIBUTORS} 📄${TOTAL_PAGES}"
echo ""
echo "⚠️ about.template.astro was NOT touched (by design)."
echo "   Contributors grid is updated by the separate Contributors Update cron."
