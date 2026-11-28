#!/bin/bash
# setup-selfhosted-runner-macos.sh — 在一台 Mac 上替 GitHub Actions 自架 runner 準備一個隔離的帳號。
#
# 要用 sudo 跑一次（會問這台機器管理者的密碼）：
#   sudo bash setup-selfhosted-runner-macos.sh
#
# 它做四件事，都可以重複跑：
#   1. 建一個非管理者帳號 ghrunner，主要群組是它自己的 ghrunner（不是 staff），
#      所以讀不到其他使用者的家目錄（裡面有 GitHub App 私鑰、Supabase 憑證、Claude 登入）。
#   2. 把呼叫者（SUDO_USER）的 SSH 公鑰清單複製給 ghrunner，之後可以用同一把鑰匙 ssh 進去
#      安裝與設定 runner 本體，不必再用 sudo。
#   3. 裝一個系統層的 LaunchDaemon：開機後用 ghrunner 的身份跑 ~/actions-runner/run.sh，
#      低優先權（不跟這台機器上的排程班搶 CPU）。runner 還沒設定前它不會啟動。
#   4. 驗證 ghrunner 真的讀不到呼叫者的家目錄。
#
# 它不做的事：不下載 runner、不向 GitHub 註冊（那兩步用 ghrunner 身份做，不需要 sudo）。
#
# 還原：
#   sudo launchctl bootout system/md.taiwan.ghrunner
#   sudo rm /Library/LaunchDaemons/md.taiwan.ghrunner.plist
#   sudo sysadminctl -deleteUser ghrunner && sudo dseditgroup -o delete ghrunner

set -euo pipefail

if [ "$(id -u)" != "0" ]; then
  echo "要用 sudo 跑：sudo bash $0" >&2
  exit 1
fi
CALLER="${SUDO_USER:-}"
if [ -z "$CALLER" ] || [ "$CALLER" = "root" ]; then
  echo "請從一般管理者帳號用 sudo 跑（需要 SUDO_USER 來複製 SSH 公鑰）" >&2
  exit 1
fi
CALLER_HOME="$(dscl . -read "/Users/$CALLER" NFSHomeDirectory | awk '{print $2}')"

U=ghrunner
G=ghrunner
HOME_DIR="/Users/$U"
LABEL=md.taiwan.ghrunner
PLIST="/Library/LaunchDaemons/$LABEL.plist"

echo "== 1. 群組與帳號"
if ! dscl . -read "/Groups/$G" >/dev/null 2>&1; then
  dseditgroup -o create "$G"
fi
GID="$(dscl . -read "/Groups/$G" PrimaryGroupID | awk '{print $2}')"
if ! dscl . -read "/Users/$U" >/dev/null 2>&1; then
  # 密碼是隨機的、不會印出來，也不會被用到（只開放 SSH 金鑰登入）
  sysadminctl -addUser "$U" -fullName "GitHub Actions Runner" \
    -password "$(openssl rand -base64 30)" -home "$HOME_DIR" -shell /bin/zsh
fi
dscl . -create "/Users/$U" PrimaryGroupID "$GID"
dscl . -create "/Users/$U" IsHidden 1
# 確保它不是管理者
dseditgroup -o edit -d "$U" -t user admin 2>/dev/null || true
# 也不留在 staff 群組（其他使用者的家目錄對 staff 開了讀取）
dseditgroup -o edit -d "$U" -t user staff 2>/dev/null || true
mkdir -p "$HOME_DIR"
chown -R "$U:$G" "$HOME_DIR"
chmod 700 "$HOME_DIR"

echo "== 2. SSH 公鑰"
install -d -m 700 -o "$U" -g "$G" "$HOME_DIR/.ssh"
if [ -f "$CALLER_HOME/.ssh/authorized_keys" ]; then
  install -m 600 -o "$U" -g "$G" "$CALLER_HOME/.ssh/authorized_keys" "$HOME_DIR/.ssh/authorized_keys"
  echo "   已複製 $CALLER 的 authorized_keys"
else
  echo "   ⚠️ $CALLER 沒有 authorized_keys，之後要自己放一把公鑰到 $HOME_DIR/.ssh/authorized_keys"
fi
# 「遠端登入」若設成只允許特定使用者，要把 ghrunner 加進去
if dscl . -read /Groups/com.apple.access_ssh >/dev/null 2>&1; then
  dseditgroup -o edit -a "$U" -t user com.apple.access_ssh || true
fi

echo "== 3. LaunchDaemon"
install -d -m 755 -o "$U" -g "$G" "$HOME_DIR/Library" "$HOME_DIR/Library/Logs"
cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>UserName</key><string>$U</string>
  <key>GroupName</key><string>$G</string>
  <key>WorkingDirectory</key><string>$HOME_DIR/actions-runner</string>
  <key>ProgramArguments</key>
  <array><string>$HOME_DIR/actions-runner/run.sh</string></array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>HOME</key><string>$HOME_DIR</string>
    <key>PATH</key><string>/usr/bin:/bin:/usr/sbin:/sbin</string>
  </dict>
  <key>RunAtLoad</key><true/>
  <!-- runner 設定完成（.runner 檔出現）之後才啟動，並在它結束時重啟 -->
  <key>KeepAlive</key>
  <dict>
    <key>PathState</key>
    <dict><key>$HOME_DIR/actions-runner/.runner</key><true/></dict>
  </dict>
  <key>ThrottleInterval</key><integer>30</integer>
  <!-- 低優先權：這台機器還有排程班與翻譯產線在跑 -->
  <key>ProcessType</key><string>Background</string>
  <key>Nice</key><integer>5</integer>
  <key>LowPriorityIO</key><true/>
  <key>StandardOutPath</key><string>$HOME_DIR/Library/Logs/actions-runner.out.log</string>
  <key>StandardErrorPath</key><string>$HOME_DIR/Library/Logs/actions-runner.err.log</string>
</dict>
</plist>
EOF
chown root:wheel "$PLIST"
chmod 644 "$PLIST"
launchctl bootout "system/$LABEL" 2>/dev/null || true
launchctl bootstrap system "$PLIST"

echo "== 4. 驗證隔離"
if sudo -u "$U" ls "$CALLER_HOME" >/dev/null 2>&1; then
  echo "   ⛔ $U 讀得到 ${CALLER_HOME}，隔離沒有成立。請不要繼續註冊 runner。"
  exit 1
fi
echo "   ✅ $U 讀不到 $CALLER_HOME"
echo "   群組：$(id -Gn "$U")"
echo
echo "完成。接下來用 ssh $U@<這台機器> 安裝與註冊 runner（不需要 sudo）。"
