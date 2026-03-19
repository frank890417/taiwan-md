# 已棄用腳本

這些腳本已被整合到 `scripts/sync.sh` 中，保留僅作為參考。

## 整合後的腳本功能

- `fix-all-frontmatter.py` → 整合到 `sync.sh` 步驟 2
- `sync-knowledge.sh` → 整合到 `sync.sh` 步驟 1
- `quick-fix-hubs.py` → 功能已包含在 frontmatter 修復中
- `fix-hub-frontmatter.sh` → 功能已包含在 frontmatter 修復中

## 使用新的統一腳本

```bash
# 完整同步（推薦）
npm run sync

# 同步並建構
npm run sync:build

# 手動執行
bash scripts/sync.sh
```

## 遷移日期

2026-03-17 - 腳本整合與優化
