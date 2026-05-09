---
title: 'SENSE-FETCHER-MIGRATION'
description: '三源感知系統跨機器遷移指南 — fetch-sense-data + launchd/cron + credentials 搬遷 SOP'
type: 'migration-doc'
status: 'canonical'
last_updated: 2026-04-11
sister_docs:
  - 'SENSE-FETCHER-SETUP.md'
upstream_canonical:
  - '../semiont/SENSES.md'
---

# SENSE-FETCHER-MIGRATION.md — 三源感知系統跨機器遷移指南

> 把 `fetch-sense-data` + launchd / cron + credentials 從機器 A 搬到機器 B 的完整流程。
>
> 對應從零設定請看 [`SENSE-FETCHER-SETUP.md`](./SENSE-FETCHER-SETUP.md)。本文件假設**來源機器已經在運作**、**目標機器是全新的**。
>
> 2026-04-11 session α 建立，源自一次實際遷移需求：「如果要轉移到其他電腦比較方便」。

---

## TL;DR（3 分鐘版本）

**來源機器（machine A）**：打包 `~/.config/taiwan-md/credentials/` + `cache/`（選用）→ 加密 tar → 經安全通道傳輸

**目標機器（machine B）**：

```bash
# 1. clone repo
git clone git@github.com:frank890417/taiwan-md.git ~/Projects/taiwan-md

# 2. 還原 credentials（從安全傳輸的加密 bundle）
mkdir -p ~/.config/taiwan-md
gpg -d ~/sense-migration.tgz.gpg | tar xzf - -C ~/.config/taiwan-md

# 3. 重建 venv（不要複製 venv）
python3 -m venv ~/.config/taiwan-md/venv
~/.config/taiwan-md/venv/bin/pip install google-analytics-data google-api-python-client google-auth

# 4. 驗證
cd ~/Projects/taiwan-md
bash scripts/tools/fetch-sense-data.sh

# 5. 安裝 scheduler
bash scripts/tools/install-sense-cron.sh
```

---

## 感知系統依賴的 7 個東西

遷移前先理解「我要搬什麼」。三源感知 fetcher 需要這 7 個東西同時到位才會動：

| #   | 東西                                                        | 在哪                                                                         | 遷移策略                                                          |
| --- | ----------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | **taiwan-md repo**                                          | 任意位置（本機預設 `~/Projects/taiwan-md`）                                  | `git clone`，不要複製                                             |
| 2   | **非敏感 config**（property ID / zone ID / site URL）       | `~/.config/taiwan-md/credentials/.env`                                       | **複製** — 透過加密傳輸                                           |
| 3   | **Google service account JSON**（GA4 + SC 共用的 RSA 金鑰） | `~/.config/taiwan-md/credentials/google-service-account.json`                | **複製** — 最敏感的檔案，必須加密傳輸                             |
| 4   | **Cloudflare API token**                                    | 寫在 `.env` 的 `CF_API_TOKEN`                                                | **複製**（跟著 `.env` 一起）                                      |
| 5   | **Python venv**                                             | `~/.config/taiwan-md/venv/`                                                  | **不要複製 — 重建**（有 platform-specific symlinks）              |
| 6   | **Cache snapshots**                                         | `~/.config/taiwan-md/cache/*.json`                                           | **選用** — 複製可保留 sense-diff 歷史基準，不複製會從當天重新累積 |
| 7   | **Scheduler**（launchd plist 或 crontab entry）             | macOS: `~/Library/LaunchAgents/md.taiwan.sense-fetch.plist` / Linux: crontab | **重建 — 絕對不要複製 plist**（路徑寫死了）                       |

**關鍵原則**：只有 credentials（#2, #3, #4）需要物理複製；其他東西在目標機器重建反而更安全。

---

## Step-by-step 遷移流程

### 階段 A：在來源機器（Machine A）打包

```bash
# 1. 建立暫存 staging 資料夾
STAGING=~/sense-migration-staging
mkdir -p "$STAGING"

# 2. 複製 credentials（這些是 secrets，staging 完成後立刻加密刪原檔）
cp -r ~/.config/taiwan-md/credentials "$STAGING/"

# 3. 複製 cache snapshots（選用，用於保留 sense-diff 歷史基準）
cp -r ~/.config/taiwan-md/cache "$STAGING/"

# 4. 建立 manifest 供目標機器驗證
cat > "$STAGING/MANIFEST.txt" <<EOF
Source host: $(hostname)
Source user: $USER
Source repo: $(cd ~/Projects/taiwan-md 2>/dev/null && git rev-parse HEAD)
Export date: $(date -Iseconds)
Credentials files:
$(ls -la ~/.config/taiwan-md/credentials/ 2>/dev/null)
Cache snapshots count: $(ls ~/.config/taiwan-md/cache/*.json 2>/dev/null | wc -l)
Python packages:
$(~/.config/taiwan-md/venv/bin/pip list 2>/dev/null | grep -iE 'google|auth')
EOF

# 5. 打包 + 加密（會 prompt 輸入 passphrase，請用強密碼）
tar czf - -C "$STAGING" . | gpg -c --cipher-algo AES256 > ~/sense-migration.tgz.gpg

# 6. 立即刪除未加密的 staging 資料夾
rm -rf "$STAGING"

# 7. 檢查結果
ls -la ~/sense-migration.tgz.gpg
```

> **GPG 不在？** 替代方案：`openssl enc -aes-256-cbc -salt -in bundle.tgz -out bundle.tgz.enc`
> 但 `gpg` 遠比 `openssl enc` 安全，建議先 `brew install gnupg`（macOS）或 `apt install gnupg`（Linux）。

### 階段 B：傳輸（最容易出事的一步）

**絕對不要用的方式**：

- ❌ Email 附件
- ❌ Slack / Discord / Teams / Line 傳檔
- ❌ git push / gist / pastebin
- ❌ GitHub Release / Dropbox public link
- ❌ 貼到 Claude / ChatGPT 對話

**可以用的方式**（從好到勉強）：

- ✅ `scp` / `rsync` 經 SSH 直連兩台機器
- ✅ 實體 USB / 外接 SSD，完成後安全抹除
- ✅ Syncthing / Resilio Sync 端到端加密
- ✅ 1Password / Bitwarden secure note 附件
- ⚠️ iCloud Drive / Google Drive（只有在檔案已 gpg 加密的前提下）

```bash
# 範例：用 scp 直接傳
scp ~/sense-migration.tgz.gpg user@machine-b.local:~/
```

### 階段 C：在目標機器（Machine B）還原

#### C.1 基礎依賴

```bash
# macOS
brew install python git gnupg

# Linux (Debian/Ubuntu)
sudo apt update && sudo apt install -y python3 python3-venv git gnupg curl
```

#### C.2 Clone repo

```bash
mkdir -p ~/Projects
cd ~/Projects
git clone git@github.com:frank890417/taiwan-md.git
cd taiwan-md
```

> **注意**：新機器的路徑 **不需要** 跟舊機器一樣。`install-sense-cron.sh` 會根據 `pwd` 自動產出正確的 plist 路徑。

#### C.3 解密 + 還原 credentials

```bash
# 建立目標目錄
mkdir -p ~/.config/taiwan-md

# 解密 + 解壓到 ~/.config/taiwan-md/
gpg -d ~/sense-migration.tgz.gpg | tar xzf - -C ~/.config/taiwan-md/

# 驗證結構
ls -la ~/.config/taiwan-md/credentials/
# 預期看到：
#   .env
#   google-service-account.json

# 讀 MANIFEST 確認來源正確
cat ~/.config/taiwan-md/MANIFEST.txt

# 清理加密 bundle（敏感！）
shred -u ~/sense-migration.tgz.gpg 2>/dev/null || rm -P ~/sense-migration.tgz.gpg
rm -f ~/.config/taiwan-md/MANIFEST.txt
```

#### C.4 設定檔案權限（important）

```bash
chmod 700 ~/.config/taiwan-md
chmod 700 ~/.config/taiwan-md/credentials
chmod 600 ~/.config/taiwan-md/credentials/.env
chmod 600 ~/.config/taiwan-md/credentials/google-service-account.json
```

這確保只有當前 user 能讀寫。如果遺忘，同機器其他 user / process 可能能讀到你的憑證。

#### C.5 重建 Python venv

**不要複製 venv** — 裡面的 symlinks 指向來源機器的 Python 路徑，在新機器上會 broken。

```bash
python3 --version  # 至少 3.9，建議 3.11+

python3 -m venv ~/.config/taiwan-md/venv
~/.config/taiwan-md/venv/bin/pip install --upgrade pip
~/.config/taiwan-md/venv/bin/pip install \
  google-analytics-data \
  google-api-python-client \
  google-auth
```

**驗證 venv**：

```bash
~/.config/taiwan-md/venv/bin/pip list | grep -iE 'google|auth'
# 預期看到至少：
#   google-analytics-data    0.21+
#   google-api-python-client 2.x
#   google-auth              2.x
```

#### C.6 逐個測試 fetchers

**永遠先個別測試再測 wrapper** — 這樣失敗時能確定是哪一源的問題。

```bash
cd ~/Projects/taiwan-md

# Cloudflare（純 stdlib，最簡單，最快失敗）
python3 scripts/tools/fetch-cloudflare.py --days 1
# 預期：印出 JSON summary，寫檔到 ~/.config/taiwan-md/cache/cloudflare-*.json

# GA4（需要 venv）
python3 scripts/tools/fetch-ga4.py --days 1
# 預期：印出 JSON summary，寫檔到 ~/.config/taiwan-md/cache/ga4-*.json

# Search Console（需要 venv）
python3 scripts/tools/fetch-search-console.py --days 7
# 預期：印出 JSON summary，寫檔到 ~/.config/taiwan-md/cache/search-console-*.json
```

任何一個失敗，跳到 [Troubleshooting](#troubleshooting-matrix)。

#### C.7 測試 wrapper

```bash
bash scripts/tools/fetch-sense-data.sh
```

預期輸出三段（每源一段）全部 `✅ success`，最後列出 cache 檔案。

#### C.8 安裝 scheduler

```bash
bash scripts/tools/install-sense-cron.sh
```

macOS 會產出新的 plist（路徑自動從 `pwd` 讀取）並 `launchctl bootstrap` 到 gui session。
Linux 會寫 cron entry 到 user crontab。

**選用自訂時間**：

```bash
bash scripts/tools/install-sense-cron.sh --hour 7 --minute 43  # 避開整點/半點
```

#### C.9 驗證 agent loaded

```bash
# macOS
bash scripts/tools/install-sense-cron.sh --status
launchctl list | grep taiwan
# 預期：
#   -   0   md.taiwan.sense-fetch
#   (loaded)

# Linux
crontab -l | grep fetch-sense-data
```

#### C.10 手動 fire 一次驗證 end-to-end

```bash
# macOS
launchctl start md.taiwan.sense-fetch
sleep 30
tail -30 ~/.config/taiwan-md/cache/fetch.log

# Linux — 直接跑 cron line 裡的命令
cd ~/Projects/taiwan-md && bash scripts/tools/fetch-sense-data.sh --days 1
```

預期看到三源都成功、cache JSON 都有更新時間戳。

---

## 驗證清單（遷移後必做）

完成所有步驟後，請逐項打勾：

- [ ] `python3 scripts/tools/fetch-cloudflare.py --days 1` 輸出 JSON（不是 error）
- [ ] `python3 scripts/tools/fetch-ga4.py --days 1` 輸出 JSON
- [ ] `python3 scripts/tools/fetch-search-console.py --days 7` 輸出 JSON
- [ ] `bash scripts/tools/fetch-sense-data.sh` 三源全部 `✅ success`
- [ ] `~/.config/taiwan-md/cache/*.json` 裡有今天日期的檔案
- [ ] `launchctl list | grep taiwan`（macOS）或 `crontab -l | grep fetch`（Linux）顯示 entry
- [ ] `launchctl start md.taiwan.sense-fetch`（或 cron 手動跑）後 `fetch.log` 有新輸出
- [ ] `python3 scripts/tools/sense-diff.py` 可執行（若有帶 cache 過來會顯示 diff）
- [ ] Pre-commit hook 還在運作（驗證方法：建立一個含 Google service account JSON type 標記的小檔案，`git add` 後嘗試 commit，應被擋並顯示 `🔴 CREDENTIAL LEAK`；測試後記得 `git restore --staged` 並刪除測試檔）
- [ ] Credentials 權限正確：`ls -la ~/.config/taiwan-md/credentials/` 顯示 `-rw-------`（600）
- [ ] 隔天早上 08:17（或你自訂時間）檢查 `fetch.log` 確認 scheduler 真的 fire 了

---

## Troubleshooting Matrix

本表來自 2026-04-11 session α 遷移實戰踩到的坑。

| 症狀                                                                        | 原因                                                                          | 修法                                                                                                                                                    |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Missing Python library: google`                                            | venv re-exec 沒生效                                                           | 確認 `fetch-ga4.py` 內 `sys.prefix != sys.base_prefix` 檢查；`ls -la ~/.config/taiwan-md/venv/bin/python3` 存在；手動 `source venv/bin/activate` 後再跑 |
| `unknown arg botManagementVerifiedBot`                                      | 程式用了 Cloudflare Enterprise-only 欄位                                      | Repo 現在的版本（2026-04-11 後）已改用 Free tier 的 `httpRequests1dGroups`；若還出現，`git pull`                                                        |
| `does not have permission 'com.cloudflare.api.account.zone.analytics.read'` | CF API token 缺 Analytics:Read scope                                          | Cloudflare dash → My Profile → API Tokens → edit token → 加 **Zone > Analytics > Read** permission                                                      |
| `insufficient permission` from GA4                                          | Service account 沒加到 GA4 Property                                           | GA4 Admin → Property Access Management → 加 `<service-account-email>@<project>.iam.gserviceaccount.com` 為 **Viewer**                                   |
| `insufficient permission` from Search Console                               | Service account 沒加到 SC Property                                            | SC → Settings → Users and permissions → 加 service account email 為 **Owner** 或 **Full user**                                                          |
| Pre-commit hook 擋了合理的文件                                              | 文件裡有 credential literal patterns（例如 PEM header 字串）                  | 把字串改寫成 regex 描述（例如 `BEGIN.{0,5}PRIVATE.{0,5}KEY`），或 `--no-verify` 如果你 100% 確定是 doc                                                  |
| launchd 顯示 `Could not find specified service`                             | plist 路徑錯、沒 bootstrap、或 plist syntax 壞                                | `plutil -lint ~/Library/LaunchAgents/md.taiwan.sense-fetch.plist` 驗證 syntax；`launchctl bootstrap gui/$UID <plist-path>` 重新 load                    |
| launchd 顯示 loaded 但 log 沒輸出                                           | 筆電在該時間睡眠中；launchd 會等到醒來下次 `StartCalendarInterval` match 才跑 | 用 `StartInterval`（每 N 秒）或加 `RunAtLoad=true`，或接受它等到下次 match                                                                              |
| 遷移後 `sense-diff.py` 顯示 `無快照`                                        | 沒把來源的 cache/ 帶過來                                                      | 可接受 — 從今天開始重新累積；或重新回來源機器把 cache 打包帶過來                                                                                        |
| `launchctl start` 後 fetch.log 說 `python3: command not found`              | launchd 環境變數 PATH 不包含 pyenv / brew python 路徑                         | 在 plist 加 `<key>EnvironmentVariables</key><dict><key>PATH</key><string>/opt/homebrew/bin:/usr/bin:/bin</string></dict>`                               |
| plist ProgramArguments 的 `cd` 失敗                                         | 來源機器的 repo 路徑和目標不同，但遷移時複製了舊 plist                        | `rm ~/Library/LaunchAgents/md.taiwan.sense-fetch.plist`，然後從新 repo 重新跑 `install-sense-cron.sh`                                                   |

---

## 反模式（別這樣做）

### ❌ 把整個 `~/.config/taiwan-md/` 打包過去

```bash
# 不要這樣
tar czf bundle.tgz -C ~ .config/taiwan-md  # 會把 venv 也打進去
```

原因：

1. venv 的 symlinks 和 wheel 是 platform-specific（Apple Silicon 的 `.dylib` vs Linux `.so` vs Intel Mac 的不同）
2. pip 解析過的 wheel 快取可能 pin 到舊版本
3. 新機器如果 Python 版本不同會完全掛掉

正確：只打包 `credentials/` + 選用的 `cache/`，venv 一律重建。

### ❌ 複製 launchd plist 到新機器

plist 裡面寫死了：

```xml
<string>cd '/Users/cheyuwu/Projects/taiwan-md' && bash scripts/tools/fetch-sense-data.sh ...</string>
```

如果新機器的 username 或 repo 位置不同，plist 會指向不存在的路徑，agent 會 silent fail。

正確：新機器跑一次 `install-sense-cron.sh`，它會根據當前 `pwd` 自動產出正確的 plist。

### ❌ 用 email / Slack / chat 傳 credentials bundle

即使有 gpg 加密，存在 email server / Slack workspace / chat history 本身就是 attack surface。現代 secrets 必須走端到端的傳輸路徑。

### ❌ 遷移後忘記撤銷舊機器的憑證

如果來源機器是要報廢或交接給別人，遷移完成後應該：

1. 在 Google Cloud Console 產生**新的** service account key，delete 舊的
2. 在 Cloudflare dash 產生**新的** API token，revoke 舊的
3. 在新機器重新 setup 一遍（等於乾淨移植）

原則：**遷移 ≠ 信任原本的憑證繼續存在舊機器上沒洩漏**。越敏感的 credential 越應該趁機 rotate。

---

## 同機器換資料夾（簡化版遷移）

如果只是把 repo 從 `~/Projects/taiwan-md` 搬到 `~/code/taiwan-md`（同一台電腦），credentials 已經在正確位置，只需要重新生成 plist：

```bash
# 1. 移動 repo
mv ~/Projects/taiwan-md ~/code/taiwan-md
cd ~/code/taiwan-md

# 2. 重新安裝 scheduler（會覆蓋舊 plist，因為新 pwd 不同）
bash scripts/tools/install-sense-cron.sh --uninstall
bash scripts/tools/install-sense-cron.sh

# 3. 驗證
bash scripts/tools/install-sense-cron.sh --status
```

venv 和 credentials 在 `~/.config/` 下，**跟 repo 位置無關**，不需要動。

---

## Rollback（遷移失敗時清除目標機器）

```bash
# 1. 移除 scheduler
cd ~/Projects/taiwan-md
bash scripts/tools/install-sense-cron.sh --uninstall

# 2. 移除所有 credentials 和 cache（敏感！用 shred/rm -P）
find ~/.config/taiwan-md/credentials -type f -exec shred -u {} \; 2>/dev/null || \
  find ~/.config/taiwan-md/credentials -type f -exec rm -P {} \; 2>/dev/null || \
  rm -rf ~/.config/taiwan-md/credentials

# 3. 移除 venv + cache（非敏感）
rm -rf ~/.config/taiwan-md/venv ~/.config/taiwan-md/cache

# 4. 確認
ls ~/.config/taiwan-md/ 2>&1  # 應該是空的或不存在
bash scripts/tools/install-sense-cron.sh --status  # 應該是 ❌ not installed
```

---

## 快速檢查「我現在的系統健不健康」

這段可以當作每週 self-check：

```bash
# 1. Agent 還在 loaded 嗎？
bash scripts/tools/install-sense-cron.sh --status

# 2. 最近一次 fetch 是什麼時候？
ls -lt ~/.config/taiwan-md/cache/*.json | head -5

# 3. fetch.log 有沒有 error？
grep -iE 'error|fail|exception' ~/.config/taiwan-md/cache/fetch.log | tail -10

# 4. 三源都在 work 嗎？
bash scripts/tools/fetch-sense-data.sh

# 5. Credentials 權限對嗎？
stat -f '%Sp %N' ~/.config/taiwan-md/credentials/* 2>/dev/null || \
  stat -c '%A %n' ~/.config/taiwan-md/credentials/*  # 應該是 -rw------- (600)
```

---

## Footnotes — 為什麼這個 doc 比 SETUP.md 長

Setup 是 zero → one：從無到有，使用者可以一邊學概念一邊設定。
Migration 是 one → one：系統已經在運作，任何錯誤都會造成「我以為還在 work 但其實靜默失敗」。

靜默失敗比明顯失敗更糟 — 因為你 7 天後才發現 sense-diff 一直在 diff 同一筆 stale 資料，EXP-A/B/C/D 全都在假裝被驗證。

所以這份 doc 的設計原則是：**每個步驟都要有驗證，每個驗證都要有反駁條件**。跟 UNKNOWNS 的 falsifiable experiments 同一個哲學。

---

_v1.0 | 2026-04-11 session α | 關聯：[SENSE-FETCHER-SETUP.md](./SENSE-FETCHER-SETUP.md)（從零設定）、[HEARTBEAT.md](../semiont/HEARTBEAT.md#1b-三源感知自動抓取)（怎麼用）_
