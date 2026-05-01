#!/usr/bin/env bash
# run-bench.sh — Sovereignty-Bench-TW one-shot wrapper
#
# Usage:
#   bash scripts/bench/run-bench.sh smoke       # 6 runs, ~$0.10
#   bash scripts/bench/run-bench.sh phase1      # 120 runs, ~$1-2
#   bash scripts/bench/run-bench.sh phase1 --no-judge   # skip Claude judge calls
#
# Wraps runner.py + scorer.py in one command. Assumes openrouter.key in
# ~/.config/taiwan-md/credentials/.

set -o pipefail

REPO="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO"

MODE="${1:-smoke}"
shift || true
EXTRA_ARGS=("$@")

case "$MODE" in
  smoke)
    echo "═══ Sovereignty-Bench-TW: SMOKE TEST ═══"
    echo "Scope: 3 prompts × 2 models × 1 lang = 6 runs"
    echo "Estimated cost: ~\$0.10  (1 Claude judge call per axis-D run)"
    echo
    python3 scripts/bench/runner.py --smoke "${EXTRA_ARGS[@]}" || exit 1
    echo
    python3 scripts/bench/scorer.py --axes A "${EXTRA_ARGS[@]}" || exit 1
    ;;
  phase1)
    echo "═══ Sovereignty-Bench-TW: PHASE 1 DRY RUN ═══"
    echo "Scope: 20 prompts × 3 models × 2 langs = 120 runs"
    echo "Estimated cost: ~\$1-2 (Claude paid + Llama/Tencent free + judge)"
    echo
    read -p "Proceed? [y/N] " confirm
    if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
      echo "Aborted."
      exit 0
    fi
    python3 scripts/bench/runner.py --phase 1 "${EXTRA_ARGS[@]}" || exit 1
    echo
    python3 scripts/bench/scorer.py --axes A D "${EXTRA_ARGS[@]}" || exit 1
    ;;
  *)
    echo "Usage: bash scripts/bench/run-bench.sh {smoke|phase1} [extra args]"
    exit 1
    ;;
esac

echo
echo "═══ Done. ═══"
echo "Raw responses: bench/v0/responses/"
echo "Scores: bench/v0/results/"
