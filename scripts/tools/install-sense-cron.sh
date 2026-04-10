#!/usr/bin/env bash
# install-sense-cron.sh — 安裝每日自動抓取感知資料的 cron job
#
# 用法:
#   bash scripts/tools/install-sense-cron.sh         # 安裝（預設 08:00 每日）
#   bash scripts/tools/install-sense-cron.sh --hour 6  # 自訂時間
#   bash scripts/tools/install-sense-cron.sh --uninstall
#   bash scripts/tools/install-sense-cron.sh --status
#
# 在 macOS 優先用 launchd（更穩），其次 fallback 到 cron。
# 在 Linux 用 cron。
#
# 2026-04-11 session α 建造

set -o pipefail

HOUR=8
MINUTE=17  # 不要用 :00，避免 API quota 跟全世界擠在整點
ACTION=install

while [[ $# -gt 0 ]]; do
  case "$1" in
    --hour) HOUR="$2"; shift 2 ;;
    --minute) MINUTE="$2"; shift 2 ;;
    --uninstall) ACTION=uninstall; shift ;;
    --status) ACTION=status; shift ;;
    -h|--help)
      grep '^#' "$0" | head -20
      exit 0 ;;
    *) echo "Unknown arg: $1"; exit 1 ;;
  esac
done

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LAUNCHD_PLIST="$HOME/Library/LaunchAgents/md.taiwan.sense-fetch.plist"
LAUNCHD_LABEL="md.taiwan.sense-fetch"
LOG_FILE="$HOME/.config/taiwan-md/cache/fetch.log"

case "$(uname -s)" in
  Darwin) PLATFORM=macos ;;
  Linux) PLATFORM=linux ;;
  *) echo "Unsupported platform: $(uname -s)"; exit 1 ;;
esac

status() {
  echo "Platform: $PLATFORM"
  echo "Repo: $REPO_ROOT"
  echo ""
  if [[ "$PLATFORM" == "macos" ]]; then
    if [[ -f "$LAUNCHD_PLIST" ]]; then
      echo "✅ launchd plist exists: $LAUNCHD_PLIST"
      launchctl list | grep "$LAUNCHD_LABEL" && echo "  (loaded)" || echo "  (not loaded)"
    else
      echo "❌ launchd plist not installed"
    fi
  else
    if crontab -l 2>/dev/null | grep -q "fetch-sense-data.sh"; then
      echo "✅ crontab entry exists:"
      crontab -l 2>/dev/null | grep "fetch-sense-data.sh"
    else
      echo "❌ cron entry not installed"
    fi
  fi
  echo ""
  if [[ -f "$LOG_FILE" ]]; then
    echo "Recent log (last 20 lines):"
    tail -20 "$LOG_FILE"
  else
    echo "No log file yet: $LOG_FILE"
  fi
}

install_macos() {
  mkdir -p "$(dirname "$LAUNCHD_PLIST")" "$(dirname "$LOG_FILE")"

  cat > "$LAUNCHD_PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${LAUNCHD_LABEL}</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>-c</string>
        <string>cd '${REPO_ROOT}' &amp;&amp; bash scripts/tools/fetch-sense-data.sh --days 1 &gt;&gt; '${LOG_FILE}' 2&gt;&amp;1</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>${HOUR}</integer>
        <key>Minute</key>
        <integer>${MINUTE}</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>${LOG_FILE}</string>
    <key>StandardErrorPath</key>
    <string>${LOG_FILE}</string>
    <key>RunAtLoad</key>
    <false/>
</dict>
</plist>
EOF

  # Load into launchd (modern bootstrap, fallback to legacy load)
  launchctl unload "$LAUNCHD_PLIST" 2>/dev/null || true
  if launchctl bootstrap "gui/$(id -u)" "$LAUNCHD_PLIST" 2>/dev/null; then
    echo "✅ Installed via launchctl bootstrap"
  else
    launchctl load "$LAUNCHD_PLIST"
    echo "✅ Installed via launchctl load (legacy)"
  fi

  echo ""
  echo "會在每天 $(printf '%02d:%02d' $HOUR $MINUTE) (local time) 自動執行"
  echo "日誌：$LOG_FILE"
  echo ""
  echo "手動測試跑一次：launchctl start $LAUNCHD_LABEL"
  echo "檢查狀態：bash $0 --status"
  echo "移除：bash $0 --uninstall"
}

uninstall_macos() {
  if [[ -f "$LAUNCHD_PLIST" ]]; then
    launchctl unload "$LAUNCHD_PLIST" 2>/dev/null
    launchctl bootout "gui/$(id -u)" "$LAUNCHD_PLIST" 2>/dev/null || true
    rm -f "$LAUNCHD_PLIST"
    echo "✅ 已移除 launchd plist"
  else
    echo "沒有安裝紀錄"
  fi
}

install_linux() {
  mkdir -p "$(dirname "$LOG_FILE")"
  local cron_line="${MINUTE} ${HOUR} * * * cd '${REPO_ROOT}' && bash scripts/tools/fetch-sense-data.sh --days 1 >> '${LOG_FILE}' 2>&1"

  # Remove any existing entry
  crontab -l 2>/dev/null | grep -v "fetch-sense-data.sh" > /tmp/new-crontab || true
  echo "$cron_line" >> /tmp/new-crontab
  crontab /tmp/new-crontab
  rm /tmp/new-crontab

  echo "✅ Installed cron entry:"
  echo "  $cron_line"
}

uninstall_linux() {
  crontab -l 2>/dev/null | grep -v "fetch-sense-data.sh" > /tmp/new-crontab || true
  crontab /tmp/new-crontab
  rm /tmp/new-crontab
  echo "✅ 已移除 cron entry"
}

case "$ACTION" in
  install)
    if [[ "$PLATFORM" == "macos" ]]; then install_macos; else install_linux; fi
    ;;
  uninstall)
    if [[ "$PLATFORM" == "macos" ]]; then uninstall_macos; else uninstall_linux; fi
    ;;
  status)
    status
    ;;
esac
