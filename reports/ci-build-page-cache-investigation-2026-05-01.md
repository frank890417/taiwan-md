---
title: CI build 文章頁面 cache 化深度研究 + 本機 per-language matrix 實驗
session: 2026-05-01 γ-late4
status: investigation (本機已驗證，未進 CI；patch 仍在 working tree)
related:
  - reports/ci-build-optimization-discussion-2026-04-22.md
  - .github/workflows/deploy.yml
  - scripts/core/generate-og-images.mjs
---

# CI build 文章頁面 cache 化研究 — γ-late4

## 起點

觀察者：「最近頁面產生變久了，類似 OG image 那樣讓文章頁面也 cache 化可行嗎？還是現在框架不適合？」

接續 [reports/ci-build-optimization-discussion-2026-04-22.md](reports/ci-build-optimization-discussion-2026-04-22.md) 的討論。當時 build 3-4 min，結論是「不是瓶頸不要動」。**今天 build 飆到 12.6 min** —— 假設前提變了，重新檢視。

---

## 1. 病灶定位 — 不是 OG，是 `astro build` 本體

抓 `.github/workflows/deploy.yml` 最近 4 個 deploy run，分離 OG step 跟 astro build step：

| 時間 (UTC)  | Run ID      | 頁數      | astro build | OG step     |
| ----------- | ----------- | --------- | ----------- | ----------- |
| 04-30 17:45 | 25180407308 | 2,333     | 319s        | (cache hit) |
| 04-30 18:15 | 25181775063 | 2,368     | 324s        | (cache hit) |
| 05-01 01:21 | 25197659825 | 2,394     | 265s        | (cache hit) |
| 05-01 12:42 | 25214432368 | **3,807** | **754s**    | 395s        |

**04-30 → 05-01 一天內頁數從 2,394 跳到 3,807（+59%）**，astro build 時間從 265s → 754s（+184%，超線性）。

成因：[src/config/languages.mjs:46-60](src/config/languages.mjs:46) 啟用 fr (04-24, 484 篇)、es (04-25, 36 篇)，加上今天 ja/ko 的同步 batch 補翻譯，路由總數翻倍。

**OG cache 已經做得很好**（cache hit 6.5 min，cache miss 22 min；不是這次 regression 的主兇）。**真正的時間黑洞是 astro 的 prerender 階段**。

---

## 2. OG image vs 文章 HTML — 為什麼 cache 難度不同

OG image cache（[scripts/core/generate-og-images.mjs](scripts/core/generate-og-images.mjs) + [.github/workflows/deploy.yml:74-81](.github/workflows/deploy.yml:74)）成功的三個前提：

1. **1:1 純函數**：`md + 模板 → JPG`，單篇獨立
2. **失敗安全網**：[src/components/SEO.astro](src/components/SEO.astro) 有 `existsSync` fallback
3. **重產成本高**（Playwright headless ~2.5s/張），cache 收益巨大

文章 HTML 的跨頁依賴（[src/pages/[category]/[slug].astro](src/pages/[category]/[slug].astro)）：

| 跨頁依賴              | 機制                                                                                                       | 影響面                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Related articles**  | 同 category 抓 3 篇                                                                                        | 改 A → 同 cat 的 B/C/D 的 related 也可能變                                     |
| **Wiki links**        | [plugins/remark-wikilinks.mjs](plugins/remark-wikilinks.mjs) startup 全掃 `knowledge/` 建 `titleToUrl` map | 任何檔案重命名 → 所有 `[[link]]` 重算                                          |
| **Translation badge** | `_translations.json` snapshot                                                                              | 一次 lang-sync batch 動 50 篇 → 該 50 篇所有語言版本的「他語可讀性」badge 連動 |

→ OG cache key 只看「這篇 md + 模板」就夠；HTML cache key 要看「這篇 + 同 cat 鄰居 + wiki 目標 list + translation slice」。**key 一複雜命中率就掉**。

---

## 3. Astro 6 框架本身的 cache 能力

實測 `npx astro build --help`：

- ✅ `.astro/` content collection cache（已啟用，[deploy.yml:53-60](.github/workflows/deploy.yml:53)）：緩存 frontmatter parse + schema 驗證
- ❌ HTML 輸出 cache：**沒有**。`--force` flag 只是「清掉 content cache」。正常 build 永遠 fresh prerender 全部頁面
- ❌ 平行 prerender flag：**沒有**
- ❌ 增量 build：Astro roadmap 有討論，未 ship

**結論**：在 Astro 6 框架內，**沒有 native 機制讓 HTML 像 OG 那樣乾淨地 cache**。要做就是繞過框架。

---

## 4. 本機實驗 — 驗證 per-language matrix 假設

### 設計

假設：「每個 [slug].astro template 加 `BUILD_LANGS` env filter，跑單語 build 應該只要 1/5 時間，matrix 可拿到 ~5× wall-clock 加速」。

Patch 6 個檔案（zh-TW + en + ja + ko + fr + es 的 [slug].astro），在 `getStaticPaths` 開頭加：

```ts
const __BL = process.env.BUILD_LANGS;
if (__BL && !__BL.split(',').includes('XX')) return [];
```

XX = 該檔語言代碼。

### 數據（本機 Mac，注意 ko/es 受 CPU contention 噪音）

| 配置              | 時間             | 頁數  | 備註                                             |
| ----------------- | ---------------- | ----- | ------------------------------------------------ |
| **Baseline 全跑** | **626s (10:26)** | 3,847 | 對照組                                           |
| BUILD_LANGS=en    | 120s             | 887   | 乾淨                                             |
| BUILD_LANGS=zh-TW | 164s             | 896   | 乾淨                                             |
| BUILD_LANGS=fr    | 129s             | 866   | 乾淨                                             |
| BUILD_LANGS=ja    | 186s             | 866   | 乾淨                                             |
| BUILD_LANGS=ko    | 349s             | 756   | ⚠️ 我自己 Claude session 同時跑 tool call 搶 CPU |
| BUILD_LANGS=es    | 858s             | 866   | ⚠️ 同上                                          |

baseline log 還抓到一個有趣 timeline，證實 Astro 是**按字母順序語言序列 prerender**：

```
22:40:48  en/economy/realtek
22:42:29  es/economy/realtek (+1:41)
22:44:14  fr/economy/realtek (+1:45)
22:45:50  ja/economy/realtek (+1:36)
22:47:12  ko/economy/realtek (+1:22)
```

每語言 ~1.5 min。

### 兩個關鍵發現

**Finding 1：序列加總比 baseline 還慢**

各語言獨立跑加總 ≈ 120+164+186+129+~150+~130 = **880s**，比 baseline 626s **多 250s**。

頁數加總：887+896+866+866+756+866 = **5,137 頁**，比 baseline 3,847 **多 +33%**（重複工 ≈ 1,290 頁）。

原因：每個 per-lang build 都 rebuild 所有「語言無關頁面」（index、dashboard、semiont、changelog…）+ 該語言所有非文章頁。我的 patch 只 filter 文章 slug，沒 filter 其他 page templates。

→ **「序列跑 5 次 per-language build」比現況更慢，不是更快**。

**Finding 2：平行才有 wall-clock 贏面**

GitHub Actions matrix 平行（每 lang 一台 runner），wall-clock = `max(per-lang)`：

- 乾淨 max ≈ 186s（ja）
- 加 CI setup（checkout + npm ci + cache restore）≈ +30s
- 加 final merge step（合 dist + sitemap）≈ +30s
- **預估 CI wall-clock ≈ 4 min** vs 現在 12.6 min

**Matrix 省的是「人類等待時間」，不是「總算力」**。總 CI minutes 反而 **+50% 到 +100%**。

---

## 5. 三條路權衡

### 路 A：whole-`dist/` 短路（最便宜、命中率低）

hash all `.md` + `.astro` + `plugins/` + `astro.config.mjs` + `_translations.json`。命中 → 直接 restore `dist/`，跳過 `astro build`。

- **省**：12 min × 命中率
- **問題**：哲宇現在每 commit 都動 `knowledge/`（lang-sync / heal / evolve），命中率近 0
- **結論**：不值得做

### 路 B：5-lang matrix CI

把 build job 拆 5 個平行（zh-TW / en / ja / ko / fr / es），各自只 build 自己語言的 `dist/{lang}/`，merge step 拼起來上 GitHub Pages。

- **理論**：wall-clock 從 12.6 min → ~4 min（**3× 加速，不是 5×**）
- **實作**：Astro 沒 per-language native；用 `BUILD_LANGS` env-var 過濾 + 改 deploy.yml strategy.matrix
- **代價**：總 CI minutes +50-100%（GitHub 公開 repo 免費，沒成本）
- **風險**：sitemap、cross-language hreflang 要 merge step 統一處理
- **結論**：能做但不是 silver bullet

### 路 C：dist 分語言 cache + paths-filter（推薦）

- 拆 `dist/{lang}/` 各自獨立 cache
- 用 [dorny/paths-filter](https://github.com/dorny/paths-filter) 偵測「這 commit 動了哪些語言的 .md」
- 沒動的語言：直接從 cache 還原 `dist/{lang}/`
- 動的語言：跑 `BUILD_LANGS=lang astro build`
- merge step 合起來

**為什麼這條 ROI 最高**：lang-sync routine 一次只動一語的 batch。最近 20 個 commit 看：~15 個只動單一語言 → 命中率 75%+。命中時 build 從 12 min → ~2 min（只跑 1 個語言 + 還原其他 dist）。

- **省**：wall-clock + 算力同時省（不像路 B 只省 wall-clock）
- **實作**：paths-filter + GitHub cache 分語言 key，比路 B 簡單
- **風險**：跨語言 component 修改（如 Layout.astro）要全部失效 → 需要 hash 模板進 cache key

### 路 D：per-page HTML cache（最大 ROI 但最重）

完全模仿 OG cache 思路：每篇 article HTML 各自 cache，key = md hash + 模板 hash + related slug list + wiki target list。

- **省**：典型 lang-sync batch 動 50 篇 → 3,800 - 50 = 3,750 篇 cache hit → ~95% 省下，build 12 min → ~1 min
- **風險**：cross-page 依賴算錯 → 公開上線 stale 內容（比建置變慢嚴重得多）
- **實作**：寫 Astro Vite plugin intercept page emission，1-2 天工
- **何時做**：等路 C 跑穩之後，若還嫌慢再上

### 路 E：架構轉向（不建議）

從 SSG 改 Cloudflare Pages Functions / Vercel ISR。
丟掉 GitHub Pages 免費部署、整個 CI/CD 換掉、static-only 的可審計性消失（MANIFESTO 在意這個）。**現在不該做**。

---

## 6. 推薦執行順序

1. **先做路 C**（dist 分語言 cache + paths-filter）— 高 ROI、實作中等、風險低
2. **觀察 1-2 週實際命中率** — 如果 lang-sync routine 確實 90%+ 命中，就停在這
3. **如果還是慢 / 路 C 命中率不夠 → 上路 D**（per-page HTML cache）
4. **路 B（matrix）可以略過** — 比路 C 弱：路 C 命中時根本不啟 matrix，沒命中時跟單 job 一樣

---

## 7. 此 session 留下的東西

### 仍在 working tree 的 patch（**未 commit**）

6 個 [slug].astro 的 `getStaticPaths` 開頭加了實驗 filter：

- [src/pages/[category]/[slug].astro](src/pages/[category]/[slug].astro)
- [src/pages/en/[category]/[slug].astro](src/pages/en/[category]/[slug].astro)
- [src/pages/ja/[category]/[slug].astro](src/pages/ja/[category]/[slug].astro)
- [src/pages/ko/[category]/[slug].astro](src/pages/ko/[category]/[slug].astro)
- [src/pages/fr/[category]/[slug].astro](src/pages/fr/[category]/[slug].astro)
- [src/pages/es/[category]/[slug].astro](src/pages/es/[category]/[slug].astro)

每個檔案在 `getStaticPaths` 第二行加：

```ts
// [EXPERIMENT] per-language matrix filter
const __BL = process.env.BUILD_LANGS;
if (__BL && !__BL.split(',').includes('XX')) return [];
```

**等決定要走哪條路再決定保留還丟棄**：

- 走路 B 或路 C → patch 留下並 polish 成正式 feature（移除 `[EXPERIMENT]` 標籤）
- 走路 D 或暫不做 → 全部 revert

### 數據檔案

`/tmp/baseline-build.log`、`/tmp/build-{en,zh,ja,fr,ko,es}.log` 是本機實驗原始 log，session 結束後消失（重要數字已抓進本報告 §4 表格）。

---

## 8. 上一份報告的延續關係

[reports/ci-build-optimization-discussion-2026-04-22.md](reports/ci-build-optimization-discussion-2026-04-22.md)（β session）的延後題目「v3 首次 CI 實際跑幾分鐘」現在有答案：

| β session 預測（2026-04-22）       | γ-late4 實測（2026-05-01）                                        |
| ---------------------------------- | ----------------------------------------------------------------- |
| OG cache hit 後全 CI <2 min        | OG cache hit ~7 min（路徑增 + ja/ko 同步啟用）                    |
| Astro build 不是瓶頸               | **fr/es 上線後 Astro build 變主瓶頸**（754s）                     |
| 「除非 push 頻率上升 10 倍才優化」 | push 頻率沒漲 10×，但**頁面數漲 59%** —— 觸發了優化條件的另一條軸 |

β session 的判斷在當時是對的；**γ-late4 重新檢視是因為「頁面數翻倍」這個前提改變**，不是 β session 看錯。

---

_v1.0 | 2026-05-01 γ-late4_
_作者：Taiwan.md（與觀察者哲宇對話 + 本機實驗驗證）_
_誕生原因：fr/es 上線後 build 從 5 min 飆到 12 min，觀察者問「能否類似 OG cache 化文章頁」。本機 per-language matrix 實驗驗證 matrix 沒有 5× 的乾淨贏面，真正的解是分語言 dist cache + paths-filter（路 C）或 per-page HTML cache（路 D）_
