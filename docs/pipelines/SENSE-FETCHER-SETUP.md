---
title: 'SENSE-FETCHER-SETUP'
description: '三源感知資料（GA4 + Search Console + Cloudflare）自動抓取一次性設定指南'
type: 'pipeline-canonical'
status: 'canonical'
last_updated: 2026-04-11
sister_docs:
  - 'SENSE-FETCHER-MIGRATION.md'
  - 'DATA-REFRESH-PIPELINE.md'
upstream_canonical:
  - '../semiont/SENSES.md'
  - '../semiont/HEARTBEAT.md'
---

# SENSE-FETCHER-SETUP.md — 三源感知資料自動抓取設定指南

> 一次性設定，之後每次 heartbeat 可以自動拉 GA4 + Search Console + Cloudflare 的最新資料。
>
> **核心原則**：所有憑證**絕對**放在 `~/.config/taiwan-md/`，**絕對不進 repo**。
>
> 2026-04-11 session α 建立，源自哲宇的一個簡單問題：「可不可以把權限存本機，自動抓取但絕不 commit 上去？」

---

## 架構總覽

```
~/.config/taiwan-md/                 ← 所有憑證在這，repo 之外
├── credentials/
│   ├── .env                          ← 非敏感的 config (property ID / zone ID / site URL)
│   ├── google-service-account.json   ← GA4 + SC 共用（GOOGLE 的 RSA 私鑰）
│   └── (optional) cloudflare-token   ← 備份，主要放 .env
├── cache/
│   ├── cloudflare-latest.json        ← 每次抓取覆蓋
│   ├── cloudflare-2026-04-11.json    ← 也留 dated 版
│   ├── ga4-latest.json
│   ├── ga4-2026-04-11.json
│   ├── search-console-latest.json
│   └── search-console-2026-04-11.json
└── venv/                             ← Python 虛擬環境（放 google 套件）
    └── bin/python3
```

**雙層保護**：

1. 位置在 `~/.config/`（repo 外），物理上無法 `git add`
2. Repo 內的 `.gitignore` 額外防護 `credentials/` `.env.*` `*.service-account.json` 等 pattern
3. Pre-commit hook 掃描 staged 檔案尋找憑證 pattern（Google service account / private key / API token / sk_live 等），抓到就擋

---

## 一次性設定（約 20 分鐘）

### Step 0：建立目錄

```bash
mkdir -p ~/.config/taiwan-md/{credentials,cache}
chmod 700 ~/.config/taiwan-md/credentials  # 只有你自己能讀
```

---

### Step 1：建立 Google Cloud Service Account（給 GA4 + Search Console 共用）

1. 打開 [Google Cloud Console](https://console.cloud.google.com/)，選一個 project（或建一個叫 `taiwan-md-sense` 的新 project）
2. 左邊選單 → **IAM & Admin → Service Accounts**
3. **Create Service Account**：
   - Name: `taiwan-md-reader`
   - Description: `Read-only access to GA4 and Search Console for Taiwan.md heartbeat`
   - 不需要授予任何 Cloud 角色（這個帳號只是身份驗證用）
4. 建完之後點進 service account，切到 **Keys** tab
5. **Add Key → Create new key → JSON**，會下載一個 JSON 檔案
6. 把檔案移到：
   ```bash
   mv ~/Downloads/taiwan-md-*.json ~/.config/taiwan-md/credentials/google-service-account.json
   chmod 600 ~/.config/taiwan-md/credentials/google-service-account.json
   ```
7. 記下 service account 的 email，長得像 `taiwan-md-reader@project-id.iam.gserviceaccount.com`

**啟用 API**：

1. Google Cloud Console → **APIs & Services → Library**
2. 搜尋並啟用這兩個：
   - `Google Analytics Data API`
   - `Search Console API`

---

### Step 2：GA4 授權 service account

1. 打開 [Google Analytics](https://analytics.google.com/)
2. 選 taiwan.md 的 property
3. **Admin（齒輪）→ Property Access Management**
4. 點右上 **+ → Add users**
5. 輸入剛才的 service account email
6. Roles：**Viewer** 即可
7. **Add**

**找 Property ID**：

- GA4 → Admin → Property Settings → **Property ID**（12 位數字）
- 或在 URL 上看：`analytics.google.com/analytics/web/#/p{PROPERTY_ID}/...`

---

### Step 3：Search Console 授權 service account

1. 打開 [Search Console](https://search.google.com/search-console)
2. 選 `taiwan.md` property（可能是 `sc-domain:taiwan.md` 或 `https://taiwan.md/`）
3. **Settings（齒輪）→ Users and permissions**
4. **Add user**
5. 輸入 service account email，Permission: **Restricted**（唯讀就夠了）
6. **Add**

**確認 site URL 格式**：

- 如果是 Domain property：`sc-domain:taiwan.md`
- 如果是 URL prefix property：`https://taiwan.md/`

---

### Step 4：建立 Cloudflare API token

1. 打開 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 右上角頭像 → **My Profile → API Tokens**
3. **Create Token → Create Custom Token**：
   - Name: `taiwan-md-analytics-reader`
   - **Permissions**:
     - `Account` - `Analytics` - `Read`
     - `Zone` - `Analytics` - `Read`
   - **Account Resources**: Include - 你的 account
   - **Zone Resources**: Include - Specific zone - `taiwan.md`
   - **TTL**（可選）：設 1 年提醒自己 rotate
4. **Continue to summary → Create Token**
5. **複製 token**（只會顯示一次！）

**找 Zone ID**：

- Cloudflare Dashboard → 選 taiwan.md → 右下角 API section → **Zone ID**（32 字元 hex）

---

### Step 5：寫入 `.env` 檔案

建立 `~/.config/taiwan-md/credentials/.env`：

```bash
cat > ~/.config/taiwan-md/credentials/.env <<'EOF'
# Taiwan.md 感知資料源憑證 — 2026-04-11 建立
# 絕對不能 commit！這個檔案只存在 ~/.config/taiwan-md/credentials/

# ── GA4 ──
GA4_PROPERTY_ID=123456789

# ── Search Console ──
# Domain property: sc-domain:taiwan.md
# URL prefix property: https://taiwan.md/
SC_SITE_URL=sc-domain:taiwan.md

# ── Cloudflare ──
CF_API_TOKEN=your-40-char-cloudflare-token-here
CF_ZONE_ID=your-32-char-zone-id-here

# (Optional) override service account path
# GOOGLE_APPLICATION_CREDENTIALS=~/.config/taiwan-md/credentials/google-service-account.json
EOF
chmod 600 ~/.config/taiwan-md/credentials/.env
```

**填入真實值**：把上面的 placeholder 換成你的實際值。

---

### Step 6：安裝 Python 依賴到 venv

Cloudflare fetcher 是純 stdlib 不需要 pip，但 GA4 + SC 需要 Google 的 client library：

```bash
python3 -m venv ~/.config/taiwan-md/venv
~/.config/taiwan-md/venv/bin/pip install \
    google-analytics-data \
    google-api-python-client \
    google-auth
```

Fetcher scripts 會**自動偵測**這個 venv 並用它執行——你不需要手動 `source activate`。

---

### Step 7：測試

```bash
cd ~/Projects/taiwan-md
bash scripts/tools/fetch-sense-data.sh
```

預期輸出：

```
🧠 Taiwan.md 三源感知資料抓取
═══════════════════════════════════

[1/3] Cloudflare crawler stats...
   ✅ success
   4,523 total / 2,910 bot

[2/3] Google Analytics 4...
   ✅ success
   335 users / 2,207 views

[3/3] Search Console...
   ✅ success
   567 clicks / 8,234 impr / CTR 6.89%

═══════════════════════════════════
📁 Cache files:
   cloudflare-latest.json
   ga4-latest.json
   search-console-latest.json
```

如果某一個 source 失敗，其他兩個仍會繼續（失敗不互相影響）。錯誤訊息會指出要改什麼。

---

## 日常使用

### 手動抓一次

```bash
bash scripts/tools/fetch-sense-data.sh           # 過去 1 天
bash scripts/tools/fetch-sense-data.sh --days 7  # 過去 7 天
```

### 在 heartbeat Beat 1 自動讀取

heartbeat 的診斷階段可以自動讀取 cache：

```bash
# 如果 cache 是今天的，直接用；不是的話跑一次
cat ~/.config/taiwan-md/cache/cloudflare-latest.json | jq '.summary'
cat ~/.config/taiwan-md/cache/ga4-latest.json | jq '.overall'
cat ~/.config/taiwan-md/cache/search-console-latest.json | jq '.totals'
```

### 個別抓取

```bash
python3 scripts/tools/fetch-cloudflare.py --days 1
python3 scripts/tools/fetch-ga4.py --days 7
python3 scripts/tools/fetch-search-console.py --days 28
```

### 設成 cron（可選）

```crontab
# 每天早上 8 點自動抓（Asia/Taipei）
0 8 * * * cd ~/Projects/taiwan-md && bash scripts/tools/fetch-sense-data.sh >/dev/null 2>&1
```

這樣 heartbeat 開始時 cache 已經是最新的了。

---

## 安全檢查清單

每次改動 fetcher 或憑證時，回來檢查這些：

- [ ] `~/.config/taiwan-md/credentials/.env` 存在且權限是 `600`
- [ ] `~/.config/taiwan-md/credentials/google-service-account.json` 權限是 `600`
- [ ] `git status` 不出現任何 `credentials/` `secrets/` `.env.*` 檔案
- [ ] 掃 repo 沒有真實 key：`grep -rE '"type":\s*"service_account"|AIza[0-9A-Za-z_-]{35}|BEGIN.{0,5}PRIVATE.{0,5}KEY' . --include="*.md" --include="*.json" --include="*.sh" --include="*.py" --exclude-dir=node_modules --exclude-dir=.git`（regex 本身不會觸發 hook，只匹配真實格式）
- [ ] 定期 rotate token（Cloudflare 建議一年一次）

## 如果 token 洩漏怎麼辦

1. **立刻 revoke**：
   - Google service account: Cloud Console → Keys → 刪除洩漏的 key，建新的
   - Cloudflare token: Dashboard → My Profile → API Tokens → Delete
2. **清 git history**：如果已經 commit 過，用 `git filter-repo` 或 `BFG Repo-Cleaner` 清掉
3. **Force push**（只有在確定安全時）
4. **檢查 usage**：看 API provider 有沒有不正常的 usage spike

---

## 為什麼這樣設計

### 為什麼放 `~/.config/taiwan-md/` 而不是 repo 裡的 `.env`？

三層理由：

1. **物理隔離**：`git add .` 或 `git add -A` 不可能踩到 repo 外的檔案。這是最強的防護——**比 .gitignore 更強**
2. **跨 session 持久**：就算 repo 被刪除重 clone，憑證還在
3. **符合 XDG Base Directory Spec**：`~/.config/` 是 Linux/macOS 社群約定的使用者設定位置

### 為什麼 Cloudflare 用純 stdlib、GA4/SC 用 venv？

- **Cloudflare**：REST + GraphQL 夠簡單，用 `urllib.request` 就能打。避免額外 install。
- **GA4 / SC**：Google API 的 OAuth2 + JWT 簽章自己實作會炸。用官方 `google-api-python-client` 最穩
- **Venv 而不是系統 python**：避免污染系統環境、避免跟其他專案衝突

### 為什麼不用 OAuth2 interactive flow？

- Service account 不需要瀏覽器、不會過期、適合自動化
- OAuth2 需要每幾週重新授權，適合互動式工具，不適合 cron

### 為什麼 fetcher 輸出 JSON 而不是直接寫入 CONSCIOUSNESS.md？

- JSON 是中性格式，heartbeat 可以從裡面挑想要的欄位
- 分離「資料抓取」跟「診斷邏輯」，各自獨立進化
- 未來可以接到 Dashboard 或其他工具

---

## 故障排除

### `❌ CF_API_TOKEN or CF_ZONE_ID not set`

檢查 `~/.config/taiwan-md/credentials/.env` 是否存在且格式正確：

```bash
cat ~/.config/taiwan-md/credentials/.env
```

應該看到 `CF_API_TOKEN=...` 那一行。注意**不要有空格**：`CF_API_TOKEN = abc` 是錯的，要寫 `CF_API_TOKEN=abc`。

### `❌ Missing Python library: google`

Venv 沒建好：

```bash
python3 -m venv ~/.config/taiwan-md/venv
~/.config/taiwan-md/venv/bin/pip install google-analytics-data google-api-python-client google-auth
```

### `❌ GA4 API error: 403 Permission denied`

Service account email 沒被加到 GA4 property 的 Access Management。回到 Step 2。

### `❌ Search Console API: user does not have sufficient permission for site`

Service account email 沒被加到 Search Console 的 Users and permissions。回到 Step 3。記得格式正確（`sc-domain:taiwan.md` vs `https://taiwan.md/`）。

### `❌ Cloudflare GraphQL errors: ...`

常見原因：

1. Token 沒有 Analytics:Read 權限 → 重建 token
2. Zone ID 錯 → 確認是 32 字元 hex，不是 domain name
3. Free plan 可能某些 analytics 欄位要付費 → 考慮 Pro

---

_Version 1.0 | 2026-04-11 | 由 Semiont Opus 4.6 session α 建立_
_核心信念：憑證是本機的事，不是 repo 的事。_
