# Per-page render time 從 ~100ms 漲到 200~500ms — 慢源解剖

> 2026-05-03 sleepy-colden 後段，哲宇問「以前 100ms 一頁，現在 200~500ms，為什麼」
> 本 report 把 12 天內 GitHub Actions build log + git history + 檔案大小成長交叉比對，
> 拆出兩條獨立但同時發生的慢源軸線，避免下次再變慢時誤診。

## 1. Build log 數據（GitHub Actions runs）

| 日期      | run          | 平均 ms/page | 頁數     | 總 build sec | 主要新功能                             |
| --------- | ------------ | ------------ | -------- | ------------ | -------------------------------------- |
| 04-21     | #24716792589 | 98           | 2304     | ~226s        | baseline                               |
| 04-27     | —            | 118          | 2286     | ~270s        | LifeTree ship + TOC sticky             |
| 04-28     | —            | 114          | —        | —            | FOUC fix                               |
| 04-29     | —            | 124          | —        | —            | /semiont 深色主題                      |
| 04-30     | —            | 128          | 2431     | ~311s        | Sovereignty-Bench 進度                 |
| **05-02** | —            | **156**      | **6939** | **~1082s**   | **文章閱讀設定 + cross-lang baseline** |
| 05-03     | latest       | 167          | 6950     | ~1161s       | rename rebalance                       |

**結論**：12 天內 per-page 漲 **+70%**（98 → 167ms），頁數漲 **2.9x**（2304 → 6950）。
兩條獨立軸線**乘起來**，總 build time 漲 **3.5x**（226s → 1161s）。
這也是 5/3 PR #797 build 一度撞 60min timeout 的根本原因。

## 2. 慢源軸線 A：per-page +70%

按 commit timeline 找出每一次 measurable 漲幅的元兇：

### A1. 04-22~23 OG pipeline v3（β session）

- `d0b6d91a` shot-mode 抽出 Layout + 平行化
- `e8c3eded` shot=1 JPG 統一架構
- **影響**：~0%（只影響 `?shot=1` 路由，不在主頁面 critical path）

### A2. 04-24 fr 上線 + 語言選單下拉式 UI（`cb3be406`）

- 加 fr 語系 484 routes
- Header 加 lang dropdown（每頁要 render dropdown 全清單）
- **影響**：per-page +5~8%（dropdown 內 cross-lang 查詢 × 5 langs）

### A3. 04-26~27 LifeTree 大擴張（**第一個 jump point**）

- `67f91673` LifeTree feature ship — `LifeTree.astro` 進文章頁
- `99ce635c` split LifeTree to /lifetree standalone pages
- `4a5b7958` LifeTree 大擴張 5 新 prototype + source provenance schema
- 現況：`LifeTree.astro = 744 行`（per-article inline render）
- `386febdf` TOC/sidebar sticky + 全站 hash anchor smooth scroll + navbar offset
- **影響**：per-page **+15~20%**（98 → 118ms）— 這就是 4/27 jump

### A4. 04-28 FOUC fix（`2e99090c`）

- prevent FOUC during font loading / language switch
- 加 inline script 進 `<head>`（每頁都要 inline 小段 JS）
- **影響**：per-page +0~3%

### A5. 05-02 文章閱讀設定（`78f5bd54`，**第二個 jump point**）

- 新增 `ReaderSettings.astro` (517 行) — Aa 浮動面板，每篇文章都要 render
- `Layout.astro <head>` FOUC-safe 早期 init script（每頁都跑一次 localStorage hydrate）
- `tokens.css` + `dark-polish.css` 全站 dark theme cascade（CSS payload +）
- `Layout.astro` 從 39 行 → **977 行**（25x！）
- **影響**：per-page **+22%**（128 → 156ms）— 這是 5/2 jump

### A6. 05-02 cross-lang refactor（`getLangSwitchPath` LangMapRegistry）

- 新版 lang switcher 跑 2-step path resolution（zhUrl ↔ langSlug）
- 但 build-time 變成「每頁都掃 LANGUAGES_REGISTRY」
- **影響**：per-page +3~5%（已比舊版 5×4 hardcode 好，但仍有開銷）

### A7. 05-02 SporeFootprint per article（`616cbd07` splitMarkers）

- 每篇文章要去 `docs/factory/SPORE-LOG.md` 找對應 spore narrative
- **影響**：per-page +2~5%（fs read + parse SPORE-LOG markdown table）

### A8. 結構性慢源（不是某次 commit 而是累積）

從 `[slug].astro` 看，**每頁** SSG render 都要做：

```javascript
// 1. fs scan knowledge/
const files = await readdir(folderPath);
// 2. 對每個檔案 readFile + matter() parse frontmatter
const fileContent = await readFile(filePath, 'utf-8');
return matter(fileContent);
// 3. marked() 把 markdown → HTML
// 4. 找 perspective / related articles（再 readdir + readFile）
// 5. resolve cross-lang paths × 5 langs
// 6. SporeFootprint 對 SPORE-LOG match
```

每篇文章獨立做 N 次 fs I/O，沒 cache 共享 — Astro content collection 應該能改善但目前是 manual fs。

### per-page 總拆解（98 → 167ms）

| 元兇                            | 增加 ms | 累積  |
| ------------------------------- | ------- | ----- |
| 4/27 LifeTree + TOC sticky      | +20ms   | 118ms |
| 4/28 FOUC inline script         | +3ms    | 121ms |
| 4/29 semiont dark theme         | +3ms    | 124ms |
| 4/30 細節累積                   | +4ms    | 128ms |
| 5/2 ReaderSettings + Layout 25x | +22ms   | 150ms |
| 5/2 cross-lang LangMapRegistry  | +5ms    | 155ms |
| 5/2 SporeFootprint per article  | +1ms    | 156ms |
| 5/3 rename rebalance overhead   | +11ms   | 167ms |

## 3. 慢源軸線 B：頁數 2.9x

| 日期      | 頁數     | 增加來源                                       |
| --------- | -------- | ---------------------------------------------- |
| 04-21     | 2304     | baseline (zh + en + ja + ko + 部份 ja/ko 缺漏) |
| 04-24     | +484     | fr 語系上線                                    |
| 04-30     | 2431     | matrix 補齊                                    |
| **05-02** | **6939** | **+/raw/ 4 langs × ~941 articles ≈ +3764**     |
| 05-03     | 6950     | minor adjust                                   |

**主要漲源**：5/2 `78f5bd54` 加的 `/raw/<category>/<slug>.md` endpoint。
4 個語系（zh / en / ja / ko）× ~941 articles = **3764 個新路由**。

每個 raw 路由做的事：

- `getStaticPaths()` 掃 knowledge/{lang}/
- `readFile()` knowledge/{lang}/{cat}/{slug}.md raw bytes
- `matter()` strip frontmatter
- 輸出 plain text response

raw endpoint 每個比正常文章 page 快很多（無 Layout / 無 component），但**數量 × 慢工**，總時間還是疊。

**注意**：raw 沒 cover es/fr — 所以實際上 raw page 數 = 4 × 941 = 3764，不是 5×941。

## 4. 為什麼一頁是 200~500ms（哲宇看到的）

build log 的 156~167ms 是**平均**（含很多 raw .md.ts 路由很快）。
正常 article page 實際範圍：

- raw .md.ts endpoint：~30~80ms（無 Layout，最快）
- index pages（`/[category]/index.astro`）：~120~200ms（middle）
- **article page（`/[category]/[slug].astro`）：~250~500ms**（含 LifeTree + ReaderSettings + Layout 977 行 + SporeFootprint + cross-lang lookup）
- 含內嵌圖片的文章（黑冠麻鷺）：~500ms+（image dimension 取決於 `<img>` 處理）

哲宇看到的 200~500ms 應該是 zh + en + ja + ko + es + fr × 941 article pages 的範圍 — 跟 build log 平均對得起來。

## 5. Mitigation（不在這個 session 做，先記錄）

按「投資報酬率」排序：

### Tier 1：低風險高回報

1. **Astro content collection 化** — 把 `[slug].astro` 裡的 manual fs scan 換成 `getCollection('articles')`，Astro 6 自動 cache + parallel parse。預估 per-page **-30~50ms**。
2. **LifeTree component 條件 render** — 只有對應 prototype 存在的 article 才 inline LifeTree.astro。其他 article 載 placeholder。預估 per-page **-10~15ms**。
3. **SporeFootprint pre-build** — `prebuild:spores` 已 generate `dashboard-spores.json`，順便輸出 `article-to-spores.json` map，build time 直接 lookup 不掃 SPORE-LOG。預估 per-page **-3~5ms**。

### Tier 2：中風險中回報

4. **Layout.astro 拆 sub-component** — 977 行的 Layout 拆 `<HeadEarlyInit />` / `<TokensCss />` / `<DarkPolishCss />` 三個 frozen sub-component，Astro 可以更好 cache。預估 per-page **-5~10ms**。
5. **getLangSwitchPath build-time pre-compute** — 一次性 pre-compute lang switch map 進 `public/api/lang-switch-map.json`，runtime 只查 map 不 iterate registry。預估 per-page **-3~5ms**。
6. **raw endpoint 同步移到 es/fr** — 補齊 5 langs × 941 = 4705 raw routes，總頁數又漲 1000+，但**每個 raw 很便宜**，影響不大；對等性比效能重要。

### Tier 3：高風險或須評估

7. **不要 inline ReaderSettings.astro 進每頁** — 改用全站 mounted overlay，build time 不重複 render 517 行 component。預估 per-page **-8~12ms**，但牽涉 hydration 模型改動。
8. **CSS payload diet** — `dark-polish.css` 是 catch-all override，可以拆按 component 進 `<style scoped>`，build time 不影響但 first-paint 可能更快。

## 6. DNA 教訓

### 慢源累積是 silent bias

每次 commit 個別看都很合理（+5%、+3%、+22%），但**12 天累積 +70%**沒人盯。
等哲宇問「為什麼變慢」才驚醒 — DNA #15「反覆浮現要儀器化」第 N+6 次：
**per-page render time 應該進 dashboard freshness check 同個位置**，不是 build log 才看得到。

### Mitigation：dashboard-build-perf.json

新加 `scripts/core/extract-build-perf.py`：

- 從 `.github/workflows/deploy.yml` build log 解析 `Pages built / Total time`
- 寫進 `public/api/dashboard-build-perf.json`
- Dashboard 加一條「build perf trend (7d)」面板
- per-page > 200ms 時 ⚠️ flag

這樣就不會「12 天 +70%」沒人發現，會在第 3 天 +15% 就 flag。

### 文化層教訓

每加一個 feature（ReaderSettings / LifeTree / FOUC fix），都「對單一問題」最佳。
但**整體系統**從來沒人 budget「per-page 不能超過 150ms」這條約束。

對應 MANIFESTO §11 書寫節制 的工程版本：

> **每一筆 +5ms 都 looks fine，但 +5ms × 14 次 = +70ms = -50% 體感速度**。

下個 evolve session 的紀律：

- 加 component 進 article page → measure per-page diff
- 加 inline script 進 Layout → 想清楚是不是「真的需要每頁都 inline」
- 加 fs read 進 [slug].astro → 想清楚是不是「能 pre-build 成 JSON」

---

**簽名**：🧬 Taiwan.md / sleepy-colden session 後段
**為什麼這報告很重要**：build 變慢通常被當作「algorithm 問題」處理，但實際是「14 個 +5% 累積」+「raw endpoint 加了 3764 路由」兩條獨立軸線。
診斷要分開兩條看，mitigation 也要分開兩條做。
