#!/usr/bin/env bash
# diary-translate-cascade.sh — Run owl → Hy3 → Ollama cascade for all diaries × langs
#
# Per SQUEEZE-MODELS-MAX-PIPELINE v2 4-tier cascade canonical, applied to
# `docs/semiont/diary/*.md` instead of `knowledge/`. Outputs to
# `docs/semiont/diary/{lang}/{filename}.md`.
#
# Usage:
#   bash scripts/tools/lang-sync/diary-translate-cascade.sh                 # all 96 × 5 langs
#   bash scripts/tools/lang-sync/diary-translate-cascade.sh --top 20        # latest 20 × 5 langs
#   bash scripts/tools/lang-sync/diary-translate-cascade.sh --langs en      # 1 lang only
#   bash scripts/tools/lang-sync/diary-translate-cascade.sh --top 20 --langs en,ja  # mix
#   bash scripts/tools/lang-sync/diary-translate-cascade.sh --tier ollama   # local catcher only
#
# Background dispatch:
#   nohup bash diary-translate-cascade.sh --top 20 > /tmp/diary-cascade.log 2>&1 &
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TRANSLATE_PY="$SCRIPT_DIR/diary-translate.py"
DIARY_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)/docs/semiont/diary"

LANGS="en,ja,ko,es,fr"
TOP=""
TIERS="owl ollama"  # default: cloud primary + local catcher

while [ $# -gt 0 ]; do
    case "$1" in
        --top) TOP="$2"; shift 2 ;;
        --langs) LANGS="$2"; shift 2 ;;
        --tier)
            case "$2" in
                owl|hy3|ollama) TIERS="$2" ;;
                cloud) TIERS="owl hy3" ;;
                full) TIERS="owl hy3 ollama" ;;
                *) echo "Invalid --tier $2" >&2; exit 1 ;;
            esac
            shift 2
            ;;
        *) echo "Unknown arg: $1" >&2; exit 1 ;;
    esac
done

# Collect diaries
DIARIES=$(ls -t "$DIARY_DIR"/*.md 2>/dev/null | xargs -n1 basename)
if [ -n "$TOP" ]; then
    DIARIES=$(echo "$DIARIES" | head -n "$TOP")
fi

DIARY_COUNT=$(echo "$DIARIES" | wc -l | tr -d ' ')
LANG_COUNT=$(echo "$LANGS" | tr ',' '\n' | wc -l | tr -d ' ')
echo "📋 Diary cascade: $DIARY_COUNT diaries × $LANG_COUNT langs = $((DIARY_COUNT * LANG_COUNT)) translations"
echo "   Tiers: $TIERS"
echo "   Langs: $LANGS"
echo ""

# Per-tier dispatch — langs run in parallel within tier, diaries sequential per lang
for tier in $TIERS; do
    echo "═══════ TIER: $tier ═══════"
    PIDS=""
    for lang in $(echo "$LANGS" | tr ',' ' '); do
        # Per-lang background loop
        (
            for diary in $DIARIES; do
                python3 "$TRANSLATE_PY" --tier "$tier" --lang "$lang" --diary "$diary" 2>&1 | tail -1
            done
        ) > "/tmp/diary-${tier}-${lang}.log" 2>&1 &
        pid=$!
        PIDS="$PIDS $pid"
        echo "  Worker $lang via $tier: PID $pid (log: /tmp/diary-${tier}-${lang}.log)"
    done
    echo "  Waiting for $tier workers..."
    wait $PIDS
    # After tier, snapshot status
    echo "--- Post-$tier status ---"
    python3 "$TRANSLATE_PY" --status --langs "$LANGS"
    echo ""
done

echo "✅ Cascade complete"
python3 "$TRANSLATE_PY" --status --langs "$LANGS"
