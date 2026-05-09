---
title: 'DAILY-REPORT-PIPELINE'
description: '每日 09:00 cron — GA4 流量 + 品質分數 + 社群動態 → 健康報告產出'
type: 'pipeline-canonical'
status: 'canonical'
last_updated: 2026-03-29
sister_docs:
  - 'DATA-REFRESH-PIPELINE.md'
  - 'STATS-PIPELINE.md'
  - 'SENSE-FETCHER-SETUP.md'
upstream_canonical:
  - '../semiont/HEARTBEAT.md'
  - '../semiont/SENSES.md'
---

# Daily Report Pipeline — 每日報告流程

> 每天 09:00 (Asia/Taipei) 由 Cron 自動執行

---

## 流程

```
GA4 流量 → GitHub stats → Open PRs/Issues → 網站狀態 → 內容統計 → i18n → 組報告 → 發 Discord
```

### Step 1：GA4 流量

用 Python + Google Analytics Data API 查詢（Property ID 見本地 TOOLS.md）：

- 昨日瀏覽量、用戶數
- 國家分布 Top 5
- 熱門頁面 Top 5

Service account JSON 路徑見本地環境。

### Step 2：GitHub Stats

```bash
gh api repos/frank890417/taiwan-md --jq '.stargazers_count,.forks_count,.open_issues_count'
```

### Step 3：Open PRs + Issues

```bash
gh pr list --repo frank890417/taiwan-md --state open
gh issue list --repo frank890417/taiwan-md --state open
```

對每個 PR：diff 大小、作者、內容品質快速評估。

### Step 4：網站狀態

```bash
curl -s -o /dev/null -w '%{http_code}' https://taiwan.md
```

### Step 5：內容統計

```bash
# 中文
find ~/taiwan-md/knowledge -name '*.md' ! -name '_*' ! -path '*/en/*' | wc -l
# 英文
find ~/taiwan-md/knowledge/en -name '*.md' ! -name '_*' | wc -l
```

### Step 6：i18n 覆蓋率

```bash
cd ~/taiwan-md && python3 scripts/utils/i18n-status.py 2>&1 | head -8
```

### Step 7：發報告

用 message tool 發送到 Discord #taiwan-md (channel: `1483379411179933759`)。
格式：簡潔 emoji 報告，包含趨勢對比。

---

## ⚠️ 注意事項

### GA4 API 常見問題

- Service account 需要有 property 的 Viewer 權限
- Python 依賴：`google-analytics-data`（用系統 pip）
- Rate limit：每日 50,000 requests（不太會撞到）

### 發送失敗排查

如果 message tool 發送失敗（近期 consecutiveErrors: 3）：

- 確認 Discord channel ID 正確：`1483379411179933759`
- 確認 OpenClaw Discord 模組正常運行
- 降級方案：靜默結束，不強制發送

---

## 相關 Cron

| Cron                        | 時間       | 職責           |
| --------------------------- | ---------- | -------------- |
| Taiwan.md Daily Report      | 09:00      | 本 pipeline    |
| Taiwan.md AI Citation Check | 週一 10:00 | SEO 引用率追蹤 |

---

_版本：v1.0 | 2026-03-29_
