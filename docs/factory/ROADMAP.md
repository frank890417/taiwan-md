# 🗺️ 孢子工廠 Roadmap

> 已完成 → 進行中 → 未來計畫

---

## ✅ Phase 1：產線文件化（v1.0, 2026-03-28）

- [x] `SPORE-PIPELINE.md` — 5 階段 AI 可執行主流程（v3.0 2026-05-08：PICK/VERIFY/WRITE/SHIP/HARVEST）
- [x] `SPORE-WRITING.md` — 寫作手藝（craft layer，模板 + 18 條規則 + 自檢三板斧）
- [x] `SPORE-VERIFY.md` — 閘門集中地（gate layer，Hard gate inventory + 7 大 verify）
- [x] `SPORE-HARVEST-PIPELINE.md` — 發布後收割（cadence + decision gate + Chrome MCP workflow）
- [x] `SPORE-LOG.md` — 發文紀錄
- [x] OG Card 頁面 — `/og/[category]/[slug]` 獨立 1200×630 卡片

## 🔜 Phase 2：配圖自動化

### ✅ 動態 OG Image (v3.2 自動化, 2026-04-23)

每篇文章現在都有獨立的動態 OG image，分享連結時自動顯示。四語言都產。

- **解決方案 (v3)**：Build-time 產圖。採用 `?shot=1` 模式直接從文章頁截圖，與 `generate-spore-image.mjs` **共用同一個渲染源**（poster-style hero、justfont rixingsong-semibold、hide chrome），確保 OG 圖跟孢子圖的視覺品牌完全一致。
- **四語言共用**：`shot-mode.css` 抽出到 `src/styles/`，JS toggle 搬到 `src/layouts/Layout.astro`。原本只有 zh-TW 的 poster 模式，現在 en/ja/ko 文章頁也跑同一套。
- **效能優化**：切換至 **JPG 85** 壓縮，單圖體積減少 70%（150-300 KB PNG → 40-80 KB JPG），大幅節省 dist 容量。視覺在 FB/Threads/X 平台看不出差別。
- **CI 自動化**：已整合進 GitHub Actions (`deploy.yml`)。Flow：起 dev server → 跑 og:generate（mtime 增量）→ 關 server → `npm run build`（會複製 `public/og-images/` 到 `dist/`）。
- **Incremental 三層鎖**：
  1. `actions/cache@v4` 按 md + 文章模板 hash 快取 `public/og-images/`，cache hit 直接用
  2. `chetan/git-restore-mtime-action@v2` 把 `git clone` 重設的 mtime 還原到最後 commit 時間，避免誤判全部「新檔」
  3. 腳本內部再比對 md mtime + 模板 mtime（`shot-mode.css` / `ArticleHero.astro` / `Layout.astro` 等），任一比 JPG 新才重產
- **4 平行 worker**：`generate-og-images.mjs` 用 Playwright multi-context 平行產圖，首次 CI 預估 ~17 分（1700+ 張）。可用 `OG_WORKERS=2` 環境變數降級。
- **ja/ko URL 規則**：ja/ko 文章 URL 使用 **en slug**（透過 `knowledge/_translations.json` 映射），沒 en 對應的翻譯會跳過避免 404。
- **SEO 整合**：`SEO.astro` 用 `existsSync` 在 build time 檢查檔案，若 `.jpg` 不存在 → fallback 到 `/images/taiwan-social.jpg` 預設卡，永遠不會 404。
- **CI 穩定性**：Playwright install 拆成 `install-deps`（系統套件）+ `install chromium`（binary）兩步各 5 分 timeout + `DEBIAN_FRONTEND=noninteractive`，避免 silent hang（吸取 2026-04-22 單次 6 小時卡死教訓）。
- **Local graceful skip**：`prebuild:og` 在 `npm run build` 時若 dev server 未開 → warn + skip（不 fail build）。CI 有獨立 step 處理。

#### 使用方式：

```bash
npm run og:generate                    # 全量產圖 (本地需先 npm run dev)
npm run og:generate -- --lang zh-TW    # 只產 zh-TW
npm run og:generate -- --slug 李洋     # 指定 slug（跨語言）
npm run og:generate -- --force         # 忽略 mtime 全部重產
OG_WORKERS=2 npm run og:generate       # 降 worker 數
```

**技術細節：**

- **渲染源**：`https://taiwan.md/[category]/[slug]/?shot=1`（四語言共用模式）
- **儲存路徑**：
  - zh-TW：`public/og-images/[category]/[slug].jpg`（root）
  - 其他語言：`public/og-images/[lang]/[category]/[slug].jpg`
- **死碴清理**：舊 `/og/[...path].astro` 獨立路由已刪，舊 PNG 檔（491 ko）已清，統一到 `.jpg`。

## 🔜 Phase 3：自動發佈

### Threads API

Meta 於 2024 年 6 月開放 Threads API（Publishing API）。

**需要的權限：**

- `threads_basic` — 讀取用戶 profile
- `threads_content_publish` — 發佈文字 + 圖片 + 影片
- `threads_manage_replies` — 管理回覆

**流程：**

1. 註冊 Meta Developer App
2. 取得 Long-Lived Token（60 天有效）
3. API 呼叫發佈：
   ```
   POST https://graph.threads.net/v1.0/{user_id}/threads
   { "media_type": "TEXT", "text": "..." }
   ```

**限制（2026 年）：**

- 每 24 小時最多 250 則 text-only posts
- 圖片需先上傳到 container 再發佈
- Token 每 60 天需 refresh

### 發佈自動化架構

```
cron trigger（每日 12:00 + 20:00）
│
├─ AI agent 執行 SPORE-PIPELINE 5 階段（PICK/VERIFY/WRITE/SHIP，HARVEST 排程化）
├─ 生成孢子文案 + 配圖
├─ 呈現給人類確認（Discord / Telegram）
│   ├─ 人類 approve → API 發佈
│   └─ 人類 reject / modify → 修改重來
└─ 記錄到 SPORE-LOG.md
```

**原則**：AI 準備好草稿 + 圖，人類一鍵 approve。不全自動（品質把關）。

## 🔮 Phase 4：多平台擴散

| 平台        | API 狀態  | 優先度 | 備註                  |
| ----------- | --------- | ------ | --------------------- |
| Threads     | ✅ 可用   | P0     | 主戰場                |
| X (Twitter) | ✅ 可用   | P1     | Free tier 限制多      |
| Bluesky     | ✅ 可用   | P2     | AT Protocol，開放友善 |
| Instagram   | ✅ 可用   | P3     | 需要圖片主導          |
| LINE TODAY  | ❓ 需洽談 | P4     | 台灣在地流量大        |

---

_版本：v1.0 | 2026-03-28_
