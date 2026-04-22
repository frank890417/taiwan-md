# 🗺️ 孢子工廠 Roadmap

> 已完成 → 進行中 → 未來計畫

---

## ✅ Phase 1：產線文件化（v1.0, 2026-03-28）

- [x] `SPORE-PIPELINE.md` — 完整 6 步 AI 可執行流程
- [x] `SPORE-TEMPLATES.md` — 四種模板 + 成功範例庫
- [x] `SPORE-LOG.md` — 發文紀錄
- [x] OG Card 頁面 — `/og/[category]/[slug]` 獨立 1200×630 卡片

## 🔜 Phase 2：配圖自動化

### ✅ 動態 OG Image (已完成)

每篇文章現在都有獨立的動態 OG image，分享連結時自動顯示。

- **解決方案**：Build time / Manual 預生成（採用 Playwright 截圖 `/og/[...path]` 頁面）。
- **自動化**：已整合進 `scripts/core/generate-og-images.mjs`，支援增量生成與多語系過濾。
- **SEO 整合**：`SEO.astro` 已自動連動產出的圖片路徑。

#### 使用方式：
```bash
npm run og:generate                    # 全量產圖
node scripts/core/generate-og-images.mjs --lang ko --category food # 指定過濾
```

**技術細節（方案 C）：**

```bash
# 用 Playwright 截圖
npx playwright screenshot \
  "https://taiwan.md/og/music/台灣民歌運動/" \
  --viewport-size="1200,630" \
  public/og-images/music/台灣民歌運動.png
```

**SEO 整合**：

- `SEO.astro` 的 `og:image` 改為動態：`/og-images/<category>/<slug>.png`
- Fallback：沒有截圖的用預設 `/images/taiwan-social.jpg`

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
├─ AI agent 執行 SPORE-PIPELINE Step 1-4
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
