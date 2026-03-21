#!/bin/bash
# Taiwan.md Daily Stats & Contributors Update
# Run by cron at midnight daily
set -e
cd "$(dirname "$0")/.."

echo "📊 Updating Taiwan.md stats and contributors..."

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

# 3. Update about page stats (i18n/about.ts)
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

# Update EN stats
sed -i '' "s/'about.stats.pages.number': '[^']*'/'about.stats.pages.number': '${PAGES_DISPLAY}'/g" src/i18n/about.ts
sed -i '' "s/'about.stats.stars.number': '[^']*'/'about.stats.stars.number': '${STARS_DISPLAY}'/g" src/i18n/about.ts
sed -i '' "s/'about.stats.contributors.number': '[^']*'/'about.stats.contributors.number': '${CONTRIBUTORS_DISPLAY}'/g" src/i18n/about.ts

# 4. Update about page contributors grid from GitHub API
CONTRIBUTORS_JSON=$(gh api repos/frank890417/taiwan-md/contributors --jq '[.[] | {login, avatar: .avatar_url, url: .html_url, contributions: .contributions}]')

# Generate contributor cards HTML
CARDS=""
while IFS= read -r line; do
  LOGIN=$(echo "$line" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['login'])")
  AVATAR=$(echo "$line" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['avatar'])")
  URL=$(echo "$line" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['url'])")
  
  # Skip bots
  if [[ "$LOGIN" == *"[bot]"* ]] || [[ "$LOGIN" == "dependabot"* ]]; then
    continue
  fi
  
  CARDS="${CARDS}            <a
              href=\"${URL}\"
              target=\"_blank\"
              rel=\"noopener noreferrer\"
              class=\"contributor-card\"
            >
              <img
                src=\"${AVATAR}\"
                alt=\"${LOGIN}\"
                class=\"contributor-avatar\"
                loading=\"lazy\"
              />
              <span class=\"contributor-name\">${LOGIN}</span>
            </a>
"
done < <(echo "$CONTRIBUTORS_JSON" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for item in data:
    print(json.dumps(item))
")

# 5. Write contributor cards to a temp file for replacement
CARDS_FILE=$(mktemp)
echo "$CARDS" > "$CARDS_FILE"

# Use python to do the replacement (sed can't handle multiline well)
python3 << PYEOF
import re

# Read about template
with open('src/templates/about.template.astro', 'r') as f:
    content = f.read()

# Read new cards
with open('$CARDS_FILE', 'r') as f:
    new_cards = f.read()

# Replace contributors grid content
pattern = r'(<div class="contributors-grid">)\s*\n(.*?)(</div>\s*</div>\s*</section>)'
# Find the grid and replace its content
start_marker = '<div class="contributors-grid">'
end_marker_pattern = r'</div>\s*\n\s*</div>\s*\n\s*</section>'

idx_start = content.find(start_marker)
if idx_start >= 0:
    idx_start += len(start_marker)
    # Find matching closing pattern after contributors grid
    # Look for the pattern: </div> (closes grid) </div> (closes contributors-in-team) </section>
    remaining = content[idx_start:]
    # Find all </a> tags to locate end of contributor cards
    last_card_end = remaining.rfind('</a>')
    if last_card_end >= 0:
        # Find the next </div> after last card
        next_div = remaining.find('</div>', last_card_end)
        if next_div >= 0:
            content = content[:idx_start] + '\n' + new_cards + '          ' + content[idx_start + next_div:]

with open('src/templates/about.template.astro', 'w') as f:
    f.write(content)

print("✅ About page contributors updated")
PYEOF

rm "$CARDS_FILE"

# 6. Update public/api/stats.json
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

echo "✅ All stats updated: ⭐${STARS} 🍴${FORKS} 👥${CONTRIBUTORS} 📄${TOTAL_PAGES}"
