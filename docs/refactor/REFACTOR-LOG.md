# REFACTOR-LOG.md — Taiwan.md Tailwind Refactor 進度日誌

> 這是 Taiwan.md 從手寫 CSS 遷移到 Tailwind v4 的完整進度紀錄。
>
> **SSOT 原則**：每次 session 進來先讀這份文件的最新段落，知道下一步做什麼。
>
> **相關文件**：
>
> - Obsidian 原始企劃：`Projects/Taiwan.md/Taiwan.md — Tailwind Refactor 完整企劃.md`
> - 這個日誌只記錄「做了什麼 / 還要做什麼」；設計決策寫在企劃檔
>
> **核心原則**：斷掉還能推進、一個 commit 一個 component、每階段結束網站都能跑。

---

## 7 階段路線圖

| Phase                   | 目標                             | 狀態      | 開始       | 完成       | PRs                   |
| ----------------------- | -------------------------------- | --------- | ---------- | ---------- | --------------------- |
| **0 — Foundation**      | 視覺 baseline + diff 工具        | ✅ 完成   | 2026-04-10 | 2026-04-10 | `refactor/tw-phase-0` |
| 1 — Design Tokens       | tokens.css + Tailwind v4 整合    | 🔲 未開始 | —          | —          | —                     |
| 2 — Component Layer     | @layer components 預建圖書館     | 🔲 未開始 | —          | —          | —                     |
| 3 — Leaf Migration      | 14 個 leaf component 逐個遷移    | 🔲 未開始 | —          | —          | —                     |
| 4 — Layout Shell        | Header / Footer / Layout globals | 🔲 未開始 | —          | —          | —                     |
| 5 — Pages & Routes      | 22 個 page style 區塊            | 🔲 未開始 | —          | —          | —                     |
| 6 — Preflight + Cleanup | 啟用 preflight、清 dead CSS      | 🔲 未開始 | —          | —          | —                     |
| 7 — Docs & Guard        | DESIGN.md + CI + PR template     | 🔲 未開始 | —          | —          | —                     |

---

## Session 重啟 SOP

```
1. 讀這份日誌的「最近 session」段落
2. 找到最後一個未完成的 component / phase
3. 跑 npm run visual:diff 確認 baseline 還對
4. 按該 phase 的 SOP 照做（企劃檔附錄 B）
5. 做完 → 更新本日誌 + Obsidian 企劃檔狀態
```

---

## Phase 0 — Foundation

> **目標**：建立「我改了東西會立刻知道」的回饋循環。不寫任何樣式。

### DOD Checklist

- [x] `npm run visual:baseline` 能跑、產出 12 頁 × 3 尺寸的截圖（36 PNGs）
- [x] `npm run visual:diff` 對 baseline 跑起來是全綠（max 0.041%，mean 0.002%）
- [x] `reports/visual/baseline/manifest.json` commit 了 baseline hash（`662403d7`）
- [x] `docs/refactor/REFACTOR-LOG.md` 建立、Phase 0 段落填好
- [ ] PR merge 進 main ← **等觀察者 review 後手動 merge**

### 工具清單

| 工具                                  | 用途                                      | 位置        |
| ------------------------------------- | ----------------------------------------- | ----------- |
| `scripts/visual/capture-baseline.mjs` | Playwright 截圖 12 頁 × 3 尺寸            | repo root   |
| `scripts/visual/diff.mjs`             | pixelmatch 比對 baseline vs current build | repo root   |
| `reports/visual/baseline/`            | Baseline PNG 儲存區                       | git tracked |
| `reports/visual/diff-report.html`     | diff 視覺化報告                           | .gitignore  |
| `reports/visual/current/`             | Current run 暫存區                        | .gitignore  |

### 12 個關鍵頁面

Baseline 截 12 頁 × 3 尺寸（375 mobile / 768 tablet / 1280 desktop）= 36 張 PNG。

| #   | Route                | 類別                             |
| --- | -------------------- | -------------------------------- |
| 1   | `/`                  | 首頁                             |
| 2   | `/en`                | 英文首頁                         |
| 3   | `/history/`          | 分類頁（Hub）                    |
| 4   | `/food/`             | 分類頁（Hub）                    |
| 5   | `/history/戒嚴時期/` | 單篇文章頁（典型）               |
| 6   | `/contribute/`       | 貢獻頁                           |
| 7   | `/about/`            | 關於頁                           |
| 8   | `/data/`             | 資料頁（重 style）               |
| 9   | `/dashboard/`        | 儀表板（重 style）               |
| 10  | `/map/`              | 地圖頁                           |
| 11  | `/taiwan-shape/`     | 新地圖頁（剛上線）               |
| 12  | `/changelog/`        | 變更日誌（取代 /graph/，見備註） |

> Phase 0 執行時站起本機 preview server（`npm run preview` 吃 `dist/`），Playwright 對 `http://127.0.0.1:4321` 截圖。
>
> **備註**：企劃檔原本列 `/graph/` 為第 11 頁，但實測發現 d3 force simulation 每次 render 位置不同，兩次 capture 就有 5-10% diff。改用 `/changelog/` 取代。日後若要 refactor 圖譜頁 CSS，需先為 simulation 加 deterministic seed。

### 進度紀錄

#### 2026-04-10 α — Phase 0 完成

| 步驟                                             | 狀態 | commit     |
| ------------------------------------------------ | ---- | ---------- |
| 建立 `docs/refactor/REFACTOR-LOG.md`             | ✅   | `1dea4102` |
| 建立 `scripts/visual/capture-baseline.mjs`       | ✅   | `467aed01` |
| 建立 `scripts/visual/diff.mjs`                   | ✅   | `c459451c` |
| 加 devDeps：playwright、pixelmatch、pngjs        | ✅   | `9e2a1dab` |
| 加 npm scripts：`visual:baseline`、`visual:diff` | ✅   | `9e2a1dab` |
| 修 capture 非確定性（/graph/ 排除 + 字體等待）   | ✅   | `662403d7` |
| 首次 baseline 執行 + manifest.json commit        | ✅   | 本 commit  |

**驗證結果**（self-diff：捕獲 → 重捕獲 → 比對）

| 指標           | 數值        |
| -------------- | ----------- |
| PNG 總數       | 36 (11×3+3) |
| ok             | **36**      |
| regression     | 0           |
| max diff ratio | **0.041%**  |
| mean diff      | 0.002%      |
| threshold      | 0.5%        |

**Baseline checkpoint**

- Commit: `662403d755...`
- Branch: `refactor/tw-phase-0`
- Captured: 2026-04-10
- 存儲策略：PNGs 本機存在 `reports/visual/baseline/*.png`（.gitignored，約 69 MB），僅 commit `manifest.json` 作為 checkpoint 參考。任何人要重現 baseline：
  1. `git checkout 662403d755`
  2. `npm run build`
  3. `npm run preview &`（另一個 shell）
  4. `npm run visual:baseline`

**瀏覽器實測驗證**

- 開啟 `http://127.0.0.1:4321/taiwan-shape/` → 頁面正常，hero + comparison + SVG 區塊都在
- 開啟 `http://127.0.0.1:4321/history/` → 分類 hub 正常，28 篇文章列表完整
- 兩次 capture 自我比對 → 全站 36/36 通過

---

## 視覺微調紀錄

> 每次 component 遷移時若有視覺差異需要記錄在這邊。Phase 0 本身不改樣式，應全部空白。

| 日期 | Component | 差異 | 決定 | 備註 |
| ---- | --------- | ---- | ---- | ---- |
| —    | —         | —    | —    | —    |

---

## 教訓 / 決策歷史

> Phase 之間或實作中出現的重要決策紀錄。會追加，不會刪除。

### 2026-04-10 α — Phase 0 起手

- **Playwright vs Puppeteer**：選 Playwright。理由：原生支援 mobile emulation、預設不啟動其他 browser 只 install chromium 即可、後期如需 CI 整合 `@playwright/test` 最穩
- **diff 閾值選 0.5%**：根據企劃檔。低於此的差異視為 anti-aliasing / 字體渲染，不算 regression
- **截圖只用 chromium**：Firefox / WebKit 留給 Phase 7 或完全不做。Phase 0 的目標是「抓到我自己改壞」，不是跨瀏覽器測試
- **不加入 CI**：Phase 0 明確決策。本機跑即可。Phase 7 再評估
- **本機 preview server** 而不是 dev server：`npm run preview` 吃靜態 build，更接近實際部署狀態
