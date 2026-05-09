---
title: 'CONTRIBUTORS-PIPELINE'
description: '貢獻者名單每日 cron 自動更新流程 — README contributor list / dashboard data sync'
type: 'pipeline-canonical'
status: 'canonical'
last_updated: 2026-04-30
last_session: 'γ2'
sister_docs:
  - 'CONTRIBUTOR-SYSTEM-PIPELINE.md'
  - 'STATS-PIPELINE.md'
  - 'DATA-REFRESH-PIPELINE.md'
upstream_canonical:
  - '../semiont/HEARTBEAT.md'
  - '../semiont/ANATOMY.md'
---

# Contributors Pipeline — 貢獻者名單自動更新流程

> 每天 03:30 (Asia/Taipei) 由 Cron 自動執行
>
> ⚠️ **本檔範圍 = README all-contributors 名單 auto-sync 機制**。
> Contributor 關係週期（onboarding / 升降級 / inactive 處理 / 復活）的完整 SOP 在
> [CONTRIBUTOR-SYSTEM-PIPELINE.md](CONTRIBUTOR-SYSTEM-PIPELINE.md)。

---

## 流程

```
git pull → 掃描 merged PR authors → 比對現有名單 → 新增 → 更新 README 表格 → push
```

### Step 1：拉最新

```bash
cd ~/taiwan-md && git pull
```

### Step 2：掃描新 contributor

```bash
gh pr list --repo frank890417/taiwan-md --state merged --limit 200 --json author --jq '.[].author.login' | sort -u > /tmp/pr-authors.txt
cat .all-contributorsrc | python3 -c "import sys,json; [print(c['login']) for c in json.load(sys.stdin)['contributors']]" | sort -u > /tmp/existing-contributors.txt
comm -23 /tmp/pr-authors.txt /tmp/existing-contributors.txt > /tmp/new-contributors.txt
```

### Step 3：新增 contributor

對每個新人：

1. `gh api users/{login}` 查 profile
2. `gh pr list --author {login} --state merged --json title,labels` 分析貢獻類型
3. 決定 emoji：🖋️ content / 🌍 translation / 🐛 bug / 💻 code / 🤔 ideas / 📖 doc
4. 加入 `.all-contributorsrc`

### Step 4：更新 README 表格

重新生成 `<!-- ALL-CONTRIBUTORS-LIST:START -->` 到 `<!-- ALL-CONTRIBUTORS-LIST:END -->` 之間的表格。每行 7 人。

### Step 5：Push

```bash
git add .all-contributorsrc README.md
git diff --cached --quiet || (git commit -m "chore: auto-update contributors" && git push)
```

---

## ⚠️ 鐵律

### 絕對不要動 `about.template.astro`

Sponsors + Contact sections 已被刪掉 **3 次**。Contributors grid 不在 template 裡管理。

### 只 `git add` 兩個檔案

`.all-contributorsrc` 和 `README.md`。不要 `git add -A`。

### 沒新人 = 靜默結束

不需要回報「今天沒有新 contributor」。

---

## 相關檔案

| 檔案                                 | 用途                |
| ------------------------------------ | ------------------- |
| `.all-contributorsrc`                | 貢獻者清單（JSON）  |
| `README.md`                          | 含 contributor 表格 |
| `src/templates/about.template.astro` | ⚠️ 不要碰           |

---

_版本：v1.0 | 2026-03-29_
