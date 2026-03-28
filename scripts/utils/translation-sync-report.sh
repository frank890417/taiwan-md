#!/bin/bash
# Translation Sync Report
# Compares zh article modification dates with en counterparts
# Usage: bash scripts/translation-sync-report.sh

cd "$(dirname "$0")/.."

echo "# Taiwan.md Translation Sync Report"
echo "Generated: $(date '+%Y-%m-%d %H:%M')"
echo ""

total_zh=0
total_en=0
outdated=0
missing=0

echo "## Per-Category Summary"
echo ""
echo "| Category | ZH | EN | EN Outdated | EN Missing |"
echo "|----------|----|----|-------------|------------|"

for cat in About Art Culture Economy Food Geography History Lifestyle Music Nature People Society Technology; do
  zh_count=$(find "knowledge/$cat" -maxdepth 1 -name "*.md" ! -name "_*" 2>/dev/null | wc -l | tr -d ' ')
  en_count=$(find "knowledge/en/$cat" -maxdepth 1 -name "*.md" ! -name "_*" 2>/dev/null | wc -l | tr -d ' ')
  
  cat_outdated=0
  cat_missing=0
  
  for zh_file in knowledge/"$cat"/*.md; do
    [[ "$(basename "$zh_file")" == _* ]] && continue
    [ ! -f "$zh_file" ] && continue
    
    zh_mod=$(git log -1 --format="%ct" -- "$zh_file" 2>/dev/null)
    [ -z "$zh_mod" ] && continue
    
    # Check for en counterpart (exact filename match)
    en_file="knowledge/en/$cat/$(basename "$zh_file")"
    if [ -f "$en_file" ]; then
      en_mod=$(git log -1 --format="%ct" -- "$en_file" 2>/dev/null)
      if [ -n "$en_mod" ] && [ "$zh_mod" -gt "$en_mod" ]; then
        cat_outdated=$((cat_outdated + 1))
      fi
    else
      cat_missing=$((cat_missing + 1))
    fi
  done
  
  total_zh=$((total_zh + zh_count))
  total_en=$((total_en + en_count))
  outdated=$((outdated + cat_outdated))
  missing=$((missing + cat_missing))
  
  echo "| $cat | $zh_count | $en_count | $cat_outdated | $cat_missing |"
done

echo ""
echo "## Totals"
echo "- ZH articles: $total_zh"
echo "- EN articles: $total_en"  
echo "- EN outdated (zh modified after en): $outdated"
echo "- EN missing (zh exists, no exact en match): $missing"
echo "- **Action needed: ~$((outdated + missing)) articles**"
echo ""
echo "## Priority Queue (featured articles outdated)"
echo ""

# List featured zh articles where en is outdated
for zh_file in knowledge/[A-Z]*/*.md; do
  [[ "$(basename "$zh_file")" == _* ]] && continue
  [ ! -f "$zh_file" ] && continue
  
  if grep -q "featured: true" "$zh_file" 2>/dev/null; then
    cat=$(echo "$zh_file" | cut -d'/' -f2)
    en_file="knowledge/en/$cat/$(basename "$zh_file")"
    
    zh_mod=$(git log -1 --format="%ai" -- "$zh_file" 2>/dev/null | cut -d' ' -f1)
    
    if [ ! -f "$en_file" ]; then
      echo "- 🔴 **$(basename "$zh_file" .md)** ($cat) — NO EN VERSION (zh: $zh_mod)"
    else
      en_mod=$(git log -1 --format="%ai" -- "$en_file" 2>/dev/null | cut -d' ' -f1)
      zh_ts=$(git log -1 --format="%ct" -- "$zh_file" 2>/dev/null)
      en_ts=$(git log -1 --format="%ct" -- "$en_file" 2>/dev/null)
      if [ "$zh_ts" -gt "$en_ts" ]; then
        echo "- 🟡 **$(basename "$zh_file" .md)** ($cat) — EN outdated (zh: $zh_mod, en: $en_mod)"
      fi
    fi
  fi
done
