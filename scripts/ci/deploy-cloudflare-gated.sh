#!/bin/bash
# deploy-cloudflare-gated.sh — 等「驗證」job 過了才部署到 Cloudflare。
#
# 正式站在 Cloudflare 上。部署是在 build job 裡、建置一完成就在背景開始的，
# 這時候同一次 run 裡平行跑的 validate job（Markdown 契約、frontmatter、
# 全站文章健檢）通常早就跑完了，但「通常」不是閘門：這支先問 GitHub 那個 job
# 的結果，不是 success 就不部署、結束碼 1。
#
# 沒有設 Cloudflare 的環境變數時（例如 fork），直接交給部署腳本去印「跳過」。
set -u

if [ -n "${TWMD_CF_WORKER_NAME:-}" ] && [ -n "${GITHUB_RUN_ID:-}" ]; then
  conclusion=""
  for _ in $(seq 1 120); do
    conclusion=$(gh api "repos/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID/jobs" \
      -q '.jobs[] | select(.name=="validate") | .conclusion // ""' 2>/dev/null || true)
    [ -n "$conclusion" ] && break
    sleep 5
  done
  if [ "$conclusion" != "success" ]; then
    echo "[deploy-cloudflare] ⛔ validate job 的結果是「${conclusion:-等不到}」，不部署到 Cloudflare"
    exit 1
  fi
  echo "[deploy-cloudflare] validate job 通過，開始部署"
fi

exec node scripts/ci/deploy-cloudflare.mjs "${1:-dist}"
