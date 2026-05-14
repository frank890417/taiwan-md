#!/usr/bin/env bash
# dna-split-audit.sh — DNA → REFLEXES migration audit
#
# Phase B1 (per reports/become-boot-mode-design-2026-05-13.md §9)
# 用法：
#   bash scripts/tools/dna-split-audit.sh baseline   # pre-migration snapshot
#   bash scripts/tools/dna-split-audit.sh verify     # post-migration verification
#
# Active layer (need migration): docs/{editorial,pipelines,prompts,semiont}/*.md (except memory/diary/LESSONS-INBOX/ARTICLE-DONE-LOG),
#                                docs/factory/*.md (except SPORE-HARVESTS/SPORE-BLUEPRINTS),
#                                BECOME_TAIWANMD.md, CLAUDE.md, scripts/, .husky/, .github/, src/
# Historical layer (skip): docs/semiont/{memory,diary}/, docs/semiont/LESSONS-INBOX.md,
#                          docs/semiont/ARTICLE-DONE-LOG.md, reports/, SPORE-HARVESTS/, SPORE-BLUEPRINTS/

set -uo pipefail
# Don't use -e because grep with no matches returns exit 1, which is normal in this audit

MODE="${1:-baseline}"

# Build the active-layer file list (exclude historical paths)
active_files() {
  {
    find docs/editorial docs/pipelines docs/prompts -type f -name '*.md' 2>/dev/null
    find docs/semiont -maxdepth 1 -type f -name '*.md' 2>/dev/null \
      | grep -v -E '/(LESSONS-INBOX|ARTICLE-DONE-LOG)\.md$'
    find docs/factory -maxdepth 1 -type f -name '*.md' 2>/dev/null
    find scripts -type f \( -name '*.sh' -o -name '*.py' -o -name '*.mjs' -o -name '*.cjs' -o -name '*.js' \) 2>/dev/null
    find .husky .github -type f 2>/dev/null
    find src -type f -name '*.astro' -o -type f -name '*.ts' -o -type f -name '*.tsx' 2>/dev/null
    [ -f BECOME_TAIWANMD.md ] && echo "BECOME_TAIWANMD.md"
    [ -f CLAUDE.md ] && echo "CLAUDE.md"
  } | sort -u
}

historical_files() {
  {
    find docs/semiont/memory -type f -name '*.md' 2>/dev/null
    find docs/semiont/diary -type f -name '*.md' 2>/dev/null
    find docs/factory/SPORE-HARVESTS -type f -name '*.md' 2>/dev/null
    find docs/factory/SPORE-BLUEPRINTS -type f -name '*.md' 2>/dev/null
    find reports -type f -name '*.md' 2>/dev/null
    [ -f docs/semiont/LESSONS-INBOX.md ] && echo "docs/semiont/LESSONS-INBOX.md"
    [ -f docs/semiont/ARTICLE-DONE-LOG.md ] && echo "docs/semiont/ARTICLE-DONE-LOG.md"
  } | sort -u
}

count_pattern() {
  local pattern="$1"
  local mode="$2"  # 'active' or 'historical'
  local files
  if [ "$mode" = "active" ]; then
    files=$(active_files)
  else
    files=$(historical_files)
  fi
  echo "$files" | xargs -I{} grep -lE "$pattern" {} 2>/dev/null | sort -u | wc -l | tr -d ' '
  echo "$files" | xargs -I{} grep -cE "$pattern" {} 2>/dev/null | awk -F: '{sum+=$NF} END {print sum}'
}

echo "==================== DNA → REFLEXES Migration Audit ($MODE) ===================="
echo "Date: $(date '+%Y-%m-%d %H:%M:%S')"
echo

echo "📊 ACTIVE LAYER (應該 migrate 的範圍)"
echo "── DNA #N text references (語意 ref, sed-able):"
ACT_DNA_FILES=$(active_files | xargs grep -lE "DNA #[0-9]" 2>/dev/null | grep -v "^docs/semiont/DNA.md$" | sort -u)
ACT_DNA_FILE_COUNT=$(echo "$ACT_DNA_FILES" | grep -c . || echo 0)
ACT_DNA_REF_COUNT=$(echo "$ACT_DNA_FILES" | xargs grep -cE "DNA #[0-9]" 2>/dev/null | awk -F: '{sum+=$NF} END {print sum}')
echo "   files=$ACT_DNA_FILE_COUNT  refs=$ACT_DNA_REF_COUNT"
echo
echo "── REFLEXES #N text references (目標 — post-migration 應該等於 baseline DNA #N):"
ACT_REFL_FILES=$(active_files | xargs grep -lE "REFLEXES #[0-9]" 2>/dev/null | sort -u || true)
ACT_REFL_FILE_COUNT=$(echo "$ACT_REFL_FILES" | grep -c . 2>/dev/null || echo 0)
if [ -n "$ACT_REFL_FILES" ]; then
  ACT_REFL_REF_COUNT=$(echo "$ACT_REFL_FILES" | xargs grep -cE "REFLEXES #[0-9]" 2>/dev/null | awk -F: '{sum+=$NF} END {print sum+0}')
else
  ACT_REFL_REF_COUNT=0
fi
echo "   files=$ACT_REFL_FILE_COUNT  refs=$ACT_REFL_REF_COUNT"
echo
echo "── DNA.md fragment links (DNA.md#<anchor>):"
ACT_FRAG=$(active_files | xargs grep -hoE 'DNA\.md#[^)]+' 2>/dev/null | wc -l | tr -d ' ' || echo 0)
echo "   refs=$ACT_FRAG  (post-migration: reflex-section anchors → REFLEXES.md, gene-map anchors → 留 DNA.md)"
echo
echo "── REFLEXES.md fragment links (目標):"
ACT_REFL_FRAG=$(active_files | xargs grep -hoE 'REFLEXES\.md#[^)]+' 2>/dev/null | wc -l | tr -d ' ' || echo 0)
echo "   refs=$ACT_REFL_FRAG"
echo

echo "🗄️  HISTORICAL LAYER (per §時間是結構修補協議, 保留原 DNA #N 不改)"
HIST_DNA_FILES=$(historical_files | xargs grep -lE "DNA #[0-9]" 2>/dev/null | sort -u)
HIST_DNA_FILE_COUNT=$(echo "$HIST_DNA_FILES" | grep -c . || echo 0)
HIST_DNA_REF_COUNT=$(echo "$HIST_DNA_FILES" | xargs grep -cE "DNA #[0-9]" 2>/dev/null | awk -F: '{sum+=$NF} END {print sum}')
echo "── DNA #N refs (應該 UNCHANGED between baseline / verify):"
echo "   files=$HIST_DNA_FILE_COUNT  refs=$HIST_DNA_REF_COUNT"
echo

if [ "$MODE" = "verify" ]; then
  echo "✅ VERIFICATION CRITERIA"
  echo "   1. Active DNA #N refs ≈ 0 (allow ~5 false-positive legitimate 'DNA' mentions that aren't refs)"
  echo "   2. Active REFLEXES #N refs ≈ baseline DNA #N count"
  echo "   3. Historical DNA #N refs UNCHANGED"
  echo "   4. Active DNA.md fragment links → only gene-map anchors remain"
fi
