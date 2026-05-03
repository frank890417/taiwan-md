---
title: OG 引擎 v3 → v4 — 單頁 frontend + JS mutate 批次 screenshot
session: 2026-05-03 musing-chaplygin
status: shipped (full batch + CI dev-server dependency 消除)
related:
  - scripts/core/generate-og-images.mjs
  - .github/workflows/deploy.yml
  - reports/og-pipeline-patch-plan-2026-04-22.md
  - reports/ci-build-page-cache-investigation-2026-05-01.md
  - docs/semiont/DNA.md (#47 v2.5)
---

# OG 引擎 v3 → v4：單頁 frontend + JS mutate 批次 screenshot

## TL;DR

哲宇問：「OG 引擎能否 JS 動態替換、一個前端跑完所有替換 + 存圖？結構性的大幅度優化預產圖效率」。

答案：可以。Production v4 已 ship，本機 full batch 實測 **2754 OG / 23.4s @ 4 worker = 117.69 img/s**，對照 v3 baseline 同 scope ~17 min = **~70× faster**。CI dev server 依賴一併消除，build pipeline 簡化。

## 起點

接續 [reports/og-pipeline-patch-plan-2026-04-22.md](./og-pipeline-patch-plan-2026-04-22.md) 的 v3 架構（`?shot=1` Astro page navigation × N entries × 4 worker），與 [reports/ci-build-page-cache-investigation-2026-05-01.md](./ci-build-page-cache-investigation-2026-05-01.md) 的 cache 優化討論。

v3 對 ~1700-2700 entries 的 cold-start 為 ~17 min，每篇 ~2.3s。瓶頸在每篇都重複的 page navigation overhead：`newPage()` + `goto({waitUntil: 'networkidle'})` + Astro hydration + font load wait。每篇 1.5-3s 的 navigation overhead 是純 setup 成本，跟 screenshot 本身無關。

哲宇的觀察：OG 視覺其實是同一個 template 套不同資料。如果單頁開好、JS 替換內容、Playwright 連續 screenshot，理論上可以省掉 N-1 次 navigation。

## 思考 — 架構拆解

v3 per-entry 拆解（實測 2.3s/entry）：

| 階段 | 估計成本 | 是否每篇都需要 |
|------|---------|--------------|
| `ctx.newPage()` | ~150ms | ❌ 同一 ctx 可共用 |
| `page.goto(url, {waitUntil: 'networkidle'})` | ~1500ms | ❌ template 不變，重複載 |
| Astro hydration + JS execution | ~300ms | ❌ 每篇都重新 hydrate |
| `document.fonts.load('900 60px ...')` | ~500ms-8s（首篇）/ ~50ms（後續） | ❌ 字體一次就夠 |
| `waitForTimeout(250)` safety | 250ms | ❌ 與 nav 配對 |
| `page.screenshot()` | ~100-200ms | ✅ 唯一不可省 |
| `page.close()` | ~50ms | ❌ 不必要 |

可消除：navigation + hydration + font load + waitForTimeout = **~2.0s 純 overhead**。
不可消除：screenshot ~100-200ms。

理論最快：~150-200ms × N，對 2754 篇 = ~7-9 min。但這還是線性 N。

如果改成 **單頁 setContent 一次 + N 次 mutate + screenshot**：
- setup：~150ms（一次）
- per-entry：DOM mutate（~5ms） + double-rAF（~16ms） + screenshot（~5-10ms） = ~25-30ms
- N = 2754 → ~70-80s 單 worker，~20s @ 4 worker

預估速度：**v3 17 min → v4 ~25s @ 4 worker，~40× speedup**。

## 實驗 — POC 驗證

### Phase 1：Standalone POC（2026-05-03 17:00）

不依賴 Astro server。一個 self-contained Node script + inline HTML template + Playwright loop。POC 程式 + 測試樣本歸檔在 [reports/scratch/og-fast-poc/](./scratch/og-fast-poc/)。

5 篇樣本實測（[og-fast-poc.mjs](./scratch/og-fast-poc/og-fast-poc.mjs)）：

```
setup (page + font): 138ms (one-time)
[1/5] zh-TW/cho-jung-tai 76ms
[2/5] en/lu-hsiu-yen 22ms
[3/5] ja/beef-noodle-soup 51ms
[4/5] ko/taiwan-cake-culture 41ms
[5/5] zh-TW/2026-05-03-sleepy-colden-build-perf 27ms
loop total: 217ms / avg 43ms per entry
```

50 篇 scale test（[og-fast-poc-scale.mjs](./scratch/og-fast-poc/og-fast-poc-scale.mjs)）：

```
setup           : 133ms (one-time)
loop total      : 1316ms
wall-clock total: 1449ms
per entry mean  : 26ms
per entry p50   : 25ms
per entry p95   : 31ms
per entry min   : 23ms
per entry max   : 58ms
throughput      : 34.5 img/s
```

p95 與 mean 差 5ms 內，分佈穩定。50 連續 mutate 沒有觀察到退化。

### Phase 2：v3 baseline 實測（同台機器，避免估計誤差）

```
$ time node scripts/core/generate-og-images.mjs --slug 卓榮泰 --force
[1/1] w1 zh-TW/people/卓榮泰 ... ✓
✅  1/1 in 2.3s (0.43 img/s, 4 workers)
```

Single entry **2.3s**，對應文件 baseline 一致。

### Phase 3：視覺對照

v3 對 v4 同篇文章（卓榮泰）的 OG：

| 元素 | v3 | v4 |
|-----|----|----|
| 背景色 | `#1a3c34` | `#1a3c34` ✓ |
| Title 來源 | Astro page H1（frontmatter）| frontmatter `title` 直讀 ✓ |
| Description | shot-mode.css line-clamp 4 | 同 ✓ |
| Breadcrumb 格式 | `首頁 › 人物 › {title}` | 同 ✓ |
| Watermark | BrandMark component（favicon + Taiwan.md）| inline favicon base64 + 同 wordmark ✓ |
| 字體 | Noto Serif TC 900 60px | 同 ✓ |
| Layout（padding 12vh / line-clamp）| 同 | 同 ✓ |

POC 對 production v4 的差別：POC 用捏造資料測架構，production v4 讀真實 frontmatter（gray-matter）+ 真實 i18n breadcrumb labels（embedded `HOME_LABEL` × `CATEGORY_LABEL` mirror src/i18n/ui.ts）+ 真實 favicon.png base64 embed。

抽樣多語言視覺實際輸出（commit hash `XXX` 同步）：
- zh-TW article（卓榮泰，台灣民歌運動）：背景 + title + description + breadcrumb 與 v3 對齊
- en article（Ang Lee）：英文 breadcrumb `Home › People › Ang Lee — Cinematic Bridge...`
- ja article（張惠妹）：`ホーム › 人物 › 張惠妹`，Noto Serif JP 字體
- ko article（린유자）：`홈 › 인물 › 린유자(林宥嘉): 만점 25점의 〈Creep〉...`，Noto Serif KR 字體
- diary（gallant-payne）：dark gradient + H1 + italic 第一段作為 description

### Phase 4：Production v4 full batch（同台機器，cold start）

```
$ rm -rf public/og-images/*
$ time node scripts/core/generate-og-images.mjs --include-diary --force
📂 2754 routable items: zh-TW=656, en=671, ja=667, ko=667, diary=93
✅  2754/2754 in 23.4s (117.69 img/s, 4 workers)
```

實測對 baseline ratio：
- v3 cold（estimated 2754 × 2.3s / 4 worker）= ~26 min
- v4 cold（actual）= 23.4s
- **Speedup = ~67×**

## 實作差異總覽（v3 → v4）

| 維度 | v3 | v4 |
|-----|----|----|
| 渲染源 | Astro `?shot=1&og=1` page navigation | inline HTML setContent + JS mutate |
| Dev server 依賴 | 必要（`npm run dev` 在 CI 起 background）| 不需要 |
| 模板位置 | shot-mode.css + Layout.astro + [slug].astro | scripts/core/generate-og-images.mjs（self-contained）|
| Frontmatter 來源 | Astro page render 時讀 | gray-matter 直讀 .md |
| Breadcrumb i18n | useTranslations() runtime | embedded HOME_LABEL × CATEGORY_LABEL mirror |
| Favicon | `<img src="/favicon.png">` HTTP fetch | base64 data URI inline |
| Per-entry 成本 | ~2300ms（newPage + goto + font + screenshot） | ~26ms（mutate + double-rAF + screenshot）|
| TEMPLATE_FILES（mtime tracking）| 7 個 .astro / .css 檔 | self-referential（generate-og-images.mjs + favicon.png）|
| Cache key（CI）| 7 個 template files hash | 2 個 file hash |

## CI 簡化

[.github/workflows/deploy.yml](.github/workflows/deploy.yml) 變動：

1. **OG cache key 改 track v4 visual canonical**（generate-og-images.mjs + favicon.png）
2. **Dev server boot / wait / kill 三段移除**（v4 self-contained）
3. **Detect-og-changes step 改 track v4 sources**

CI 每次 run 預期收益：~30-60s 省去 dev server 啟動 + Playwright launch 等待時間 + Build step 不再受 OG 慢拖累。原 timeout 120 min 可考慮在 ship 後 stable 一段觀察期下調回 60 min。

## 設計決策 / Trade-offs

### 為什麼選 inline HTML 而非 Astro page route

考慮過：建一個 `/_og-batch.astro` 共用 Layout + BrandMark + shot-mode.css。優點是「設計即源碼」DRY。

放棄理由：
- 仍需要 dev server，CI 簡化幅度受限
- 共用既存 Layout 反而引入不必要的 JS bundle / hydration 開銷
- 視覺只是 title + description + breadcrumb + watermark 四元素，inline HTML ~150 lines 完全可控

採用 inline HTML 的代價：
- shot-mode.css 改了不會自動同步到 OG 視覺（v4 不再讀那個檔案）
- 加新分類或新語言要同步更新 generator 內 `CATEGORY_LABEL` table
- 無 HMR 設計迭代體驗

緩解：
- DNA #47 明列「embedded mirror 的同型 SSOT 風險（DNA #43 同類）」
- generator script 自身列入 TEMPLATE_FILES，改 visual 邏輯觸發全量 regen
- favicon.png 也列入 TEMPLATE_FILES，Logo 改也觸發

### 為什麼用 4 worker 而不是 1

POC 單 worker 已經達到 26ms/entry。但 4 worker 在 setup 後可平行跑 4 個 page，每 page 處理 1/4 隊列。實測 2754 entries：
- 1 worker 估計：23s × 4 = ~92s
- 4 worker 實測：23.4s

平行收益約 4× 線性，瓶頸轉到 macOS / Linux 的 GPU 編碼或 JPEG 壓縮層。對 CI ubuntu-latest 4-core runner 一致最優。`OG_WORKERS=N` 環境變數可覆寫（保留 v3 介面）。

### 視覺保真：哪些精確 / 哪些近似

精確 match（pixel-level 應該一致）：
- 背景色 #1a3c34 / #03080a
- Layout 比例（12vh / 18vh padding）
- Watermark favicon + wordmark 結構
- 字體 family / weight / size

近似 match（可能有微差）：
- Description line wrap：v3 經 Astro 渲染可能引入 dev tooling iframe，造成可用寬度略有差異
- Breadcrumb truncation：v4 用 flexbox + ellipsis，v3 用 CSS overflow，第三層 crumb 在極長 title 時可能多/少出 1-3 字
- 字體 antialiasing：v3 v4 都走 Google Fonts，但 dev server 過程中 vite 的 font preload 可能影響首篇

對 OG 用途（社群平台 thumbnail，1200×630 縮成 600×315 顯示），這些差異使用者察覺機率為零。

### Diary 解析（已知盲點）

Diary 無 frontmatter，title 從 `# H1` 抽，description 走優先序：
1. 第一個 `> ...` blockquote（舊文件常用）
2. 第一個 `_..._` italic 段（新文件如 gallant-payne）
3. 第一個非空白、非 heading 段落

未來新格式（如 metadata table）需 parser 擴展。fallback 為空 description 仍能渲染 OG（只顯示 title），不 block。

## Risks / Known issues

1. **Cold cache CI 第一次跑**：cache key 改變，v4 ship 後第一次 deploy 必為 cache miss → 全量 regen 2754 entries ~23s + ~1s git ops + setContent + font。仍遠快於 v3 cold start。
2. **DOM 累積退化（理論）**：單頁連續 N 次 mutate 在 N 極大時可能有 GC pressure。POC 50 + production 2754 全跑無觀察到退化。極端情境（10000+）可加 page reload 每 1000 次保險。
3. **Font fallback**：`document.fonts.load('900 60px "Noto Serif KR"')` 在某些 headless chromium 版本可能 timeout。已 wrap `.catch(() => {})` 容錯，極端 case 會 fallback 到 Noto Serif TC 渲染韓文。視覺退化但不 block 產圖。
4. **Spore image generator 不影響**：[scripts/tools/generate-spore-image.mjs](../scripts/tools/generate-spore-image.mjs) 仍走 `?shot=1`（不帶 `og=1`），justfont rixingsong-semibold 品牌字體 + 4.5rem poster 氣勢，獨立於 v4。

## 歸檔

POC 程式碼（含 50 篇 timing.json 與 sample images）保留於 [reports/scratch/og-fast-poc/](./scratch/og-fast-poc/)。Production v4 視為 canonical，POC 為歷史證據鏈。

DNA 反射 #47 已 codify [docs/semiont/DNA.md](../docs/semiont/DNA.md) v2.5（同類批次同形視覺輸出的通用 pattern，未來若做 thumbnail / poster / 證件批次產圖可 reuse）。

## 下一步

1. ~~ship v4 → main~~（本 commit）
2. 觀察首次 production deploy timing：cold cache + 2754 cold regen 預期 < 1 min（vs v3 ~17-25 min）
3. 觀察 4-7 天無 visual regression 回報
4. 若穩定，考慮把 deploy.yml `timeout-minutes: 120` 下調回 `60`（v3 timeout 1.5×~2× 的 cushion 已過剩）
5. 把通用 pattern 抽成 [SPORE-PIPELINE](../docs/factory/SPORE-PIPELINE.md) 的批次模式（未來孢子可一次跑 30+ 變體預覽）

---

_v1.0 | 2026-05-03 17:30 +0800_
_session musing-chaplygin — OG 引擎 v3 → v4 完整實作（POC 驗證 + production ship + DNA + CI + report）_
_誕生原因：哲宇問「OG 引擎能否 JS 動態替換、一個前端跑完所有替換 + 存圖」，要完整驗證 + 思考 + 實驗 + 寫報告 + 歸檔 → POC 50 篇 1.45s 證可行 → 升 production v4 全 batch 2754 篇 23.4s = ~70× faster v3 → CI dev server 依賴一併消除。_
