#!/bin/bash
# 把 auth-watchdog 裝到 mouhouse（或任何跑 Claude Desktop 排程的 mac）。
# 用法（在指揮部）：bash scripts/tools/mouhouse/install-auth-watchdog.sh musebase@100.102.181.10
# 做的事：scp 腳本到 ~/.local/bin、寫 launchd plist 到 ~/Library/LaunchAgents、bootstrap、跑一次 dry-run。
# 只動這兩個路徑，不碰 Claude、不碰 repo、不放任何 token。移除：launchctl bootout gui/$(id -u)/md.taiwan.auth-watchdog
#
# 本機更新（在 mouhouse 自己身上）：bash scripts/tools/mouhouse/install-auth-watchdog.sh --local
#   只把 ~/.local/bin 那份換成 repo 這一版，再跑一次 dry-run。plist 已經在的話不重寫、不 bootout，
#   launchd 下一輪就會讀到新檔；plist 不在才照遠端那套完整裝一次。
#   為什麼要有這個模式（2026-09-26 maintainer）：09-24、09-25 兩班都在 repo 修了看門狗，沒有一班把
#   修補裝上機器，拷貝停在 09-11。維護 session 本來就跑在 mouhouse 上，缺的只是一條不用 ssh 的路。
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
LABEL="md.taiwan.auth-watchdog"

if [ "${1:-}" = "--local" ]; then
  mkdir -p "$HOME/.local/bin" "$HOME/.taiwanmd"
  bash -n "$HERE/auth-watchdog.sh"
  install -m 755 "$HERE/auth-watchdog.sh" "$HOME/.local/bin/taiwanmd-auth-watchdog.sh"
  echo "已更新 $HOME/.local/bin/taiwanmd-auth-watchdog.sh"
  if [ ! -f "$HOME/Library/LaunchAgents/$LABEL.plist" ]; then
    echo "⚠️ 找不到 $LABEL 的 plist：這台機器還沒裝過看門狗，請用遠端模式完整安裝（會寫 plist 並 bootstrap）"
    exit 2
  fi
  echo "--- dry-run ---"; "$HOME/.local/bin/taiwanmd-auth-watchdog.sh" --dry-run || true
  exit 0
fi

HOST="${1:?用法: install-auth-watchdog.sh user@host｜--local}"
scp -q "$HERE/auth-watchdog.sh" "$HOST:/tmp/auth-watchdog.sh"
ssh "$HOST" bash -s "$LABEL" <<'REMOTE'
set -euo pipefail
LABEL="$1"
mkdir -p "$HOME/.local/bin" "$HOME/Library/LaunchAgents" "$HOME/.taiwanmd"
install -m 755 /tmp/auth-watchdog.sh "$HOME/.local/bin/taiwanmd-auth-watchdog.sh"; rm -f /tmp/auth-watchdog.sh
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"
cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key><array><string>$HOME/.local/bin/taiwanmd-auth-watchdog.sh</string></array>
  <key>StartInterval</key><integer>3600</integer>
  <key>RunAtLoad</key><true/>
  <key>EnvironmentVariables</key><dict><key>PATH</key><string>$HOME/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string></dict>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/taiwanmd-auth-watchdog.launchd.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/taiwanmd-auth-watchdog.launchd.log</string>
</dict></plist>
EOF
launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
launchctl print "gui/$(id -u)/$LABEL" | grep -E 'state|program|interval' | head -4
echo "--- dry-run ---"; "$HOME/.local/bin/taiwanmd-auth-watchdog.sh" --dry-run || true
REMOTE
echo "✅ 裝好了：$HOST 上 launchd $LABEL 每小時跑一次，log 在 ~/Library/Logs/taiwanmd-auth-watchdog.log"
