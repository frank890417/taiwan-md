#!/usr/bin/env bash
# Merge PRs while preserving contributor history whenever possible.
#
# Default behavior:
#   1. Try a real GitHub merge commit first. This keeps the PR marked MERGED and
#      keeps the contributor's original commits reachable from main.
#   2. If GitHub cannot merge the PR, fall back to API-based file checkout for
#      knowledge/*.md files, preserving the PR author and Co-authored-by lines.
#
# Environment:
#   GH_REPO=owner/repo             Override the GitHub repository.
#   REMOTE=origin                  Git remote used for fallback commits.
#   BASE_BRANCH=main               Branch to fast-forward before fallback.
#   FALLBACK_CHERRY=0             Disable file-checkout fallback.
#   CLOSE_FALLBACK_PRS=1          Comment and close fallback-integrated PRs.
set -euo pipefail

PRS=("$@")
SUCCESS=()
FAILED=()
REPO="${GH_REPO:-frank890417/taiwan-md}"
REMOTE="${REMOTE:-origin}"
BASE_BRANCH="${BASE_BRANCH:-main}"
FALLBACK_CHERRY="${FALLBACK_CHERRY:-1}"
CLOSE_FALLBACK_PRS="${CLOSE_FALLBACK_PRS:-0}"

json_field() {
  local field="$1"
  python3 -c "import json,sys; print(json.load(sys.stdin).get('$field') or '')"
}

ensure_clean_worktree() {
  if [[ -n "$(git status --porcelain)" ]]; then
    echo "  ❌ fallback needs a clean worktree; commit/stash local changes first"
    return 1
  fi
}

fast_forward_base() {
  git fetch "$REMOTE" "$BASE_BRANCH" --quiet
  if ! git merge --ff-only "$REMOTE/$BASE_BRANCH" --quiet; then
    echo "  ❌ fallback branch is not a fast-forward from $REMOTE/$BASE_BRANCH"
    return 1
  fi
}

try_native_merge() {
  local pr="$1"
  local title="$2"

  if gh pr merge "$pr" \
    --repo "$REPO" \
    --merge \
    --subject "Merge pull request #$pr" \
    --body "Preserve contributor commit history for: $title" \
    >/dev/null 2>&1; then
    echo "  ✅ merged via GitHub merge commit: $title"
    return 0
  fi

  return 1
}

first_author() {
  local pr="$1"
  gh pr view "$pr" --repo "$REPO" --json commits --jq '
    .commits[0].authors[0] | "\(.name // "")|\(.email // "")"
  '
}

coauthor_lines() {
  local pr="$1"
  gh pr view "$pr" --repo "$REPO" --json commits --jq '
    [.commits[].authors[] | select(.name and .email) | "\(.name) <\(.email)>"]
    | unique
    | .[]
    | "Co-authored-by: " + .
  '
}

for pr in "${PRS[@]}"; do
  echo ""
  echo "═══ PR #$pr ═══"

  pr_json=$(gh pr view "$pr" --repo "$REPO" --json state,title,url 2>/dev/null || true)
  if [[ -z "$pr_json" ]]; then
    echo "  ❌ cannot read PR"
    FAILED+=("$pr")
    continue
  fi

  state=$(printf '%s' "$pr_json" | json_field state)
  title=$(printf '%s' "$pr_json" | json_field title)
  url=$(printf '%s' "$pr_json" | json_field url)

  if [[ "$state" == "MERGED" ]] || [[ "$state" == "CLOSED" ]]; then
    echo "  ⏭️  $state"
    continue
  fi

  if try_native_merge "$pr" "$title"; then
    SUCCESS+=("$pr")
    sleep 1
    continue
  fi

  if [[ "$FALLBACK_CHERRY" != "1" ]]; then
    echo "  ❌ native merge failed and fallback is disabled"
    FAILED+=("$pr")
    continue
  fi

  echo "  ↪️ native merge failed; using author-preserving fallback"
  if ! ensure_clean_worktree; then
    FAILED+=("$pr")
    continue
  fi
  if ! fast_forward_base; then
    FAILED+=("$pr")
    continue
  fi

  if ! git fetch "$REMOTE" "pull/$pr/head" --quiet 2>/dev/null; then
    echo "  ❌ fetch failed"
    FAILED+=("$pr")
    continue
  fi

  count=0
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    [[ "$f" == "knowledge/_translations.json" ]] && continue
    [[ "$f" != "knowledge/"*".md" ]] && continue
    if git checkout FETCH_HEAD -- "$f" 2>/dev/null; then
      count=$((count+1))
    else
      echo "  ⚠️ skip: $f"
    fi
  done < <(gh api "repos/$REPO/pulls/$pr/files" --paginate --jq '.[].filename' 2>/dev/null)

  if [[ $count -eq 0 ]]; then
    echo "  ❌ no files checked out"
    FAILED+=("$pr")
    continue
  fi

  python3 scripts/tools/sync-translations-json.py >/dev/null 2>&1
  git add knowledge/

  if git diff --cached --quiet; then
    echo "  ⚠️ nothing new (already in main)"
    SUCCESS+=("$pr")
    continue
  fi

  author=$(first_author "$pr")
  author_name="${author%%|*}"
  author_email="${author#*|}"
  [[ -n "$author_name" ]] || author_name="Taiwan.md Contributor"
  [[ -n "$author_email" ]] || author_email="contributors@taiwan.md"

  commit_msg=$(mktemp)
  {
    echo "Merge PR #$pr (fallback cherry-pick): $count files via API + sync"
    echo
    echo "Source PR: $url"
    echo "Fallback reason: GitHub merge commit was not available."
    echo "Original title: $title"
    echo
    coauthor_lines "$pr"
  } >"$commit_msg"

  if GIT_AUTHOR_NAME="$author_name" GIT_AUTHOR_EMAIL="$author_email" \
    git commit -F "$commit_msg" --no-verify --quiet 2>/dev/null; then
    echo "  ✅ $count files via fallback: $title"
    SUCCESS+=("$pr")
  else
    rm -f "$commit_msg"
    echo "  ❌ commit failed; leaving worktree for inspection"
    FAILED+=("$pr")
    break
  fi
  rm -f "$commit_msg"

  git push --quiet 2>/dev/null || { echo "  ❌ push failed"; FAILED+=("$pr"); break; }

  if [[ "$CLOSE_FALLBACK_PRS" == "1" ]]; then
    gh pr comment "$pr" --repo "$REPO" --body "Integrated via fallback cherry-pick because a normal GitHub merge was unavailable. The fallback commit preserves the PR author and Co-authored-by metadata." >/dev/null 2>&1 || true
    gh pr close "$pr" --repo "$REPO" >/dev/null 2>&1 || true
  fi

  sleep 1
done

echo ""
echo "═══════════════════════════════════"
echo "✅ Success: ${#SUCCESS[@]}"
echo "❌ Failed: ${#FAILED[@]} (${FAILED[*]:-none})"
