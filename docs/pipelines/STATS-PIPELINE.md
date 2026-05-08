# Stats Pipeline — REPLACED by DATA-REFRESH-PIPELINE

> ⚠️ **2026-05-08 起 Phase 5 SSOT cleanup**：本 pipeline 已完全被 [DATA-REFRESH-PIPELINE.md](./DATA-REFRESH-PIPELINE.md) **Step 9** 取代。
>
> Cron / Manual 觸發都應改走 DATA-REFRESH-PIPELINE.md。

---

## 為什麼保留此檔

只保留作為 `scripts/tools/update-stats.sh` 腳本本身的參考文檔（鐵律 + 副作用）。**不再描述 pipeline 流程**。

## update-stats.sh 鐵律

### ⚠️ 絕對不要 `git add -A`

腳本只 stage：

- `README.md`
- `src/i18n/about.ts`
- `public/api/stats.json`
- `src/data/content-stats.json`

`git add -A` 會把其他並行 session 的工作一起 commit。

### ⚠️ 絕對不要動 `about.template.astro`

Contributors grid 由另一個 Cron（Taiwan.md Contributors Update）管理。動 about.template.astro = 破壞 Sponsors + Contact section。**已經發生過 3 次。**

### `stats.json` 是 merge 不是 overwrite

由兩個來源共同維護：

- `generate-content-stats.js`：categories / tags / subcategories（主要來源）
- `update-stats.sh`：stars / forks / contributors（GitHub API 即時）

腳本只更新 GitHub 欄位，**保留其他既有欄位**。整個覆寫 = Dashboard 資料全丟。

---

## 相關檔案

| 檔案                                      | 用途                                       |
| ----------------------------------------- | ------------------------------------------ |
| `scripts/tools/update-stats.sh`           | 主腳本                                     |
| `scripts/tools/generate-content-stats.js` | 內容統計（categories/tags）                |
| `public/api/stats.json`                   | 統一 stats API（Dashboard + About 頁共用） |
| `src/i18n/about.ts`                       | About 頁面顯示數字                         |
| `src/data/content-stats.json`             | Build-time 內容統計                        |

---

_v1.0 | 2026-03-29 — original_
_v2.0 | 2026-05-08 laughing-goldstine | Phase 5 SSOT cleanup：精簡為 update-stats.sh 鐵律參考；pipeline 流程移到 DATA-REFRESH-PIPELINE.md_
