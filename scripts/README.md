# ⚙️ scripts/ — 腳本總覽

> AI agent 或開發者讀這一頁，就能找到所有可用腳本。

---

## 目錄結構

```
scripts/
├── core/          Build pipeline（prebuild 必跑）
├── tools/         日常操作工具
├── utils/         偶爾使用的修復/維護工具
└── deprecated/    已棄用
```

---

## 🔴 core/ — Build Pipeline（npm run build 自動觸發）

| 腳本                          | 語言 | 用途                                           |
| ----------------------------- | ---- | ---------------------------------------------- |
| `sync.sh`                     | bash | 同步 knowledge/ → src/content/（SSOT 複製）    |
| `generate-api.js`             | node | 產生 `public/api/*.json`（文章列表、搜尋索引） |
| `generate-dashboard-data.js`  | node | 產生 Dashboard 4 支 JSON API                   |
| `generate-map-markers.js`     | node | 產生地圖標記資料                               |
| `generate-content-stats.js`\* | node | 被 generate-api 呼叫，統計各分類文章數         |
| `build-search-index.mjs`      | node | 建構全文搜尋索引                               |
| `post-build-check.mjs`        | node | Build 後煙霧測試（驗證頁面數量、分類健康）     |
| `test-frontmatter.mjs`        | node | Pre-commit hook：驗證 frontmatter 格式         |

**執行順序**：`sync.sh` → `generate-*.js` → Astro build → `post-build-check.mjs`

## 🟡 tools/ — 日常操作

| 腳本                     | 語言 | 用途                                                             |
| ------------------------ | ---- | ---------------------------------------------------------------- |
| `quality-scan.sh`        | bash | **品質掃描 v3.0** — 14 維度偵測（空洞/塑膠/清單堆砌/品質衰退等） |
| `review-pr.sh`           | bash | PR 自動初審（frontmatter + 品質 + 安全 4 層檢查）                |
| `rewrite-pipeline.sh`    | bash | 文章改寫流程輔助（Stage 1-5 互動引導）                           |
| `translate.sh`           | bash | 翻譯文章（呼叫 AI + 品質驗證）                                   |
| `update-stats.sh`        | bash | 更新 README 統計數字（文章數/語言覆蓋等）                        |
| `manage-featured.sh`     | bash | 管理 featured 文章標記                                           |
| `assign-subcategory.cjs` | node | 批次指派子分類（讀 taxonomy → 寫 frontmatter）                   |
| `check-freshness.js`     | node | 檢查文章新鮮度（lastVerified 過期預警）                          |
| `generate-og-images.mjs` | node | **自動化 OG 圖產生器** — 支援多語系、增量生成、分類/語系過濾     |

**常用指令**：

```bash
bash scripts/tools/quality-scan.sh                    # 全量掃描
bash scripts/tools/quality-scan.sh knowledge/Art/X.md  # 單檔掃描
bash scripts/tools/quality-scan.sh --sort --diff       # 排序 + 差分
bash scripts/tools/review-pr.sh 123                    # 審核 PR #123

# --- OG Image 相關 ---
npm run og:generate                                   # 全量產圖（增量更新）
node scripts/core/generate-og-images.mjs "林琪兒"      # 產出單一文章 OG 圖
node scripts/core/generate-og-images.mjs --lang ko --category food  # 產出韓文食物系列
```

## 🟢 utils/ — 維護工具（偶爾使用）

| 腳本                             | 語言   | 用途                             |
| -------------------------------- | ------ | -------------------------------- |
| `check-links.sh`                 | bash   | 檢查所有內部連結是否有效         |
| `check-references.mjs`           | node   | 驗證 wikilink 引用完整性         |
| `check-translation-sync.sh`      | bash   | 檢查翻譯版本是否與中文 SSOT 同步 |
| `check-images.mjs`               | node   | 掃描缺失/未使用的圖片            |
| `fix-wikilinks.mjs`              | node   | 批次修復 wikilink 格式           |
| `fix-wikilinks-v2.mjs`           | node   | 進階 wikilink 修復（含 rename）  |
| `fix-all-frontmatter.py`         | python | 批次修復 frontmatter 格式問題    |
| `cache-images.sh`                | bash   | 快取外部圖片到本地               |
| `cache-images-v2.sh`             | bash   | 快取 v2（含 Wikimedia Commons）  |
| `cache-and-replace.py`           | python | 快取圖片 + 替換 markdown 引用    |
| `download-wiki-images.mjs`       | node   | 下載維基百科圖片                 |
| `replace-wiki-urls.py`           | python | 替換維基百科 URL 為本地路徑      |
| `replace-wiki-urls.sh`           | bash   | Shell 版維基 URL 替換            |
| `i18n-status.py`                 | python | 各語言翻譯覆蓋率統計             |
| `translation-sync-report.sh`     | bash   | 翻譯同步報告                     |
| `generate-translation-issues.sh` | bash   | 生成翻譯缺失的 GitHub issues     |
| `publish.sh`                     | bash   | 部署輔助                         |
| `test-wikilinks.mjs`             | node   | Wikilink 渲染測試                |

## ⚫ deprecated/ — 已棄用

| 腳本                     | 原因                         |
| ------------------------ | ---------------------------- |
| `fix-all-frontmatter.py` | 被 test-frontmatter.mjs 取代 |
| `fix-hub-frontmatter.sh` | 一次性修復，已完成           |
| `quick-fix-hubs.py`      | 同上                         |
| `sync-knowledge.sh`      | 被 core/sync.sh 取代         |

## 📄 根目錄檔案

| 文件                | 用途                          |
| ------------------- | ----------------------------- |
| `i18n-mapping.json` | 檔名→語言映射表（翻譯系統用） |

---

_最後更新：2026-03-28_
