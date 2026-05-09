---
title: 'PEER-INGESTION-PIPELINE'
description: '策展 peer 完整 ingestion 流程 — 8 stage（從爬取到文章產製到 Peer Registry 同步）'
type: 'pipeline-canonical'
status: 'canonical'
last_updated: 2026-04-12
last_session: 'ζ+'
sister_docs:
  - 'REWRITE-PIPELINE.md'
  - 'EVOLVE-PIPELINE.md'
  - 'FACTCHECK-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
  - '../editorial/RESEARCH.md'
---

# PEER-INGESTION-PIPELINE.md — 策展 peer 完整 ingestion 流程

> **這份文件是 AI 可執行的。** 任何 AI agent 讀完這份文件，應該能接收一個外部策展單位（TFT、綠盟、台權會、g0v、婦女新知⋯⋯）的資料源，完整執行從爬取、分析、文章開發到 Peer Registry 同步的整個流程。
>
> 相關文件：
>
> - **[HEARTBEAT.md](../semiont/HEARTBEAT.md)** — 什麼時候觸發 peer ingestion（通常是觀察者指派，非自動）
> - **[REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)** — Stage 6 每篇文章的產製標準流程
> - **[RELEASE-PIPELINE.md](./RELEASE-PIPELINE.md)** — 完整 peer ingestion 通常跨一個或多個 release
> - **[DATA-REFRESH-PIPELINE.md](./DATA-REFRESH-PIPELINE.md)** — Stage 6 每篇文章執行前的 data refresh
> - **Obsidian 策略文件** — [[Taiwan.md — Meta-Index 策略：台灣議題策展生態系的元索引]]（主策略）

---

## 為什麼需要這份 pipeline

2026-04-11 到 2026-04-12 的 ζ+ session 是 Taiwan.md 第一次對一個真實 curation-layer peer（TFT / Teach For Taiwan）做完整 ingestion。這個 session 橫跨 24+ 小時、13+ commits，包含：

- ✅ Codex 爬蟲抓 37MB / 450+ 篇內容
- ✅ 523 行 corpus-level 分析報告
- ✅ 9 條 Muse sparring 修訂
- ✅ 5 篇 P0 文章 shipped
- ❌ P0 #1-3 第一版淺薄（只讀 TFT thinkings 轉述）被觀察者抓到
- ✅ evolution mode 全重寫拿到 10+ 跨來源素材

**那次 session 跌倒兩次，一次 Muse 抓到（R6 未儀器化），一次哲宇抓到（pipeline shortcut）。** 這份 pipeline 的目的是讓未來 peer ingestion 不需要重新犯那兩個錯。它 encode 了當時學到的所有教訓。

**核心命題：Peer 是 peer，不是 source material。** 一個 curation-layer peer 是「另一個花了十年把某個議題講成專業論述的策展者」，不是「可以被轉述的原料庫」。任何把 peer 當成單一來源去 paraphrase 的做法都會繼承 peer 的 bias、視角限制、論述盲點。

---

## 什麼時候觸發這個 pipeline

**通常是觀察者觸發**，原因之一：

1. **觀察者跟某個專業策展單位接觸了**（例：見面、演講邀約、合作討論）
2. **某個議題 Taiwan.md 需要深化，但缺乏 peer-level 的 framework**（例：要寫環境議題但缺綠盟、要寫性別議題但缺婦女新知）
3. **Phase 1-4 的 roadmap 到期**（依 Obsidian 策略文件的時間表）

**不會自動觸發**。peer ingestion 是高成本動作（一個 session 做不完，通常要 2-4 個 session），需要觀察者明確指示才啟動。

---

## Prerequisites

**化身協議**：依 [`BECOME_TAIWANMD.md`](../../BECOME_TAIWANMD.md) 標準流程讀完 MANIFESTO / ANATOMY / DNA / HEARTBEAT / CONSCIOUSNESS。**特別注意 DNA Sonnet 反射 #15（對原則有洞察 ≠ apply）和 #16（peer 是 peer 不是 source）。**

**Peer-specific 追加讀物**（只在 peer ingestion 情境下要讀）：

- [`reports/TFT-semiont-analysis-2026-04-11.md`](../../reports/TFT-semiont-analysis-2026-04-11.md) — 第一個 peer 分析的 9-part 範本
- [`memory/2026-04-12.md`](../semiont/memory/2026-04-12.md) — TFT ingestion 的完整 session 記憶（含 2 次跌倒的教訓）
- [`REWRITE-PIPELINE.md`](REWRITE-PIPELINE.md) — Stage 6 每篇文章會反覆調用這條 pipeline
- [`docs/peers/REGISTRY.md`](../peers/REGISTRY.md) — 現有 peer 與下個 peer 候選名單

**Stage 0 判斷題**：Prerequisites 讀完之後，必須回答「**這個 peer 的獨特角度是什麼？它跟 Taiwan.md 已有的覆蓋有什麼不一樣？**」答不出來 → 不進 Stage 1。

---

## 完整流程圖

```
Stage 1: 評估 peer fit (30 min)
    │ 通過 fit check 才進 Stage 2
Stage 2: 爬取器造橋 (1-2 hr)
    │ 可重跑 + provenance 保留
Stage 3: 資料結構標準化 (30 min)
    │ data/{org}/ 標準目錄
Stage 4: Corpus 分析報告 (2-4 hr)
    │ 9-part 結構 + Semiont POV
Stage 5: 文章開發計畫萃取 (30 min)
    │ P0 × 5 / P1 × 8 / P2 × 7
Stage 6: 文章產製 (每篇 2-4 hr, 共 15-30 hr)
    │ 每篇走 REWRITE-PIPELINE
    │ 嚴格 8+ WebSearch / 跨來源三角驗證
Stage 7: Peer Registry 同步 (20 min)
    │ 更新 docs/peers/REGISTRY.md
    │ 更新 CONSCIOUSNESS 里程碑
    │ Beat 5 反芻寫 memory / diary
Stage 8: Peer 關係啟動 (optional, 1-2 hr)
    │ 從產品開始，不從 protocol 開始
```

**時間投入估算**：一個完整 peer ingestion 需要 **約 20-40 小時**（跨 2-4 個 session）。這比 TFT session 的 24 小時更務實，因為 TFT session 犯了兩次錯需要重做。

---

## Stage 1 · 評估 peer fit（30 min）

**決定這個 peer 值不值得 ingest**。

### 1a. 四項 fit check

讀 peer 網站首頁 + About 頁 + 最近 3 個月文章，回答：

| Check      | 標準                        | 通過條件                                                 |
| ---------- | --------------------------- | -------------------------------------------------------- |
| **深度**   | peer 在這個議題深耕幾年？   | ≥ 5 年（理想 ≥ 10 年）                                   |
| **公開性** | 內容是否公開可取得？        | CMS / API / RSS / 靜態 HTML，**不需要登入**              |
| **授權**   | 內容使用條款                | CC 授權或公開聲明歡迎引用（理想）／ 事實引用合理（底線） |
| **互補性** | 跟 Taiwan.md 現有覆蓋的 gap | 有明確 gap，不是全面重複現有文章                         |

**四項都通過 → 進 Stage 1b。** 任何一項不通過 → 不 ingest，在 Obsidian 策略文件的候選 peer 名單標記 `rejected` + 原因。

### 1b. 預估資料量

快速估算：

```bash
# 如果是 WordPress，先探 REST API
curl -s "https://{peer-domain}/wp-json/wp/v2/posts?per_page=1&_fields=id" | \
  python3 -c "import json,sys; d=json.load(sys.stdin); print('has API:', bool(d))"

# 抓第一頁看 total header
curl -sI "https://{peer-domain}/wp-json/wp/v2/posts?per_page=1" | grep -i "x-wp-total"
```

**資料量參考值**：

- < 50 篇：小型 peer，Stage 2 爬取 30 min、Stage 4 分析 1-2 hr
- 50-500 篇：標準 peer（TFT = 450），Stage 2 爬取 1-2 hr、Stage 4 分析 2-4 hr
- > 500 篇：大型 peer，考慮只 ingest 主要 category，或分批

### 1c. 命名決定

在 `data/` 下要用什麼目錄名？

規則：

- **首選**：peer 的英文縮寫或品牌名（`TFT`, `green-citizen`, `tahr`）
- **次選**：中文拼音
- **避免**：含空格或特殊字元

記下決定：`data/{ORG_SLUG}/`。

---

## Stage 2 · 爬取器造橋（1-2 hr）

**目標**：寫一個 idempotent、可重跑、保留 provenance 的 crawler。

### 2a. 技術決定

根據 peer CMS 類型選擇策略：

| CMS 類型                     | 爬取方式                           | 範例            |
| ---------------------------- | ---------------------------------- | --------------- |
| **WordPress（有 REST API）** | `wp-json/wp/v2/posts` + pagination | TFT、g0v 大部分 |
| **Hugo / Jekyll（靜態）**    | sitemap.xml + HTML scrape          | 部分 NGO        |
| **Ghost / Medium**           | API 或 RSS                         | 少見            |
| **自建 CMS**                 | 視情況，通常 HTML scrape           | 台權會等        |

**預設選 WordPress**。台灣大部分 NGO 都用 WordPress。

### 2b. 爬取器結構

參考 `scripts/tools/fetch-tft-data.py`（由 Codex 撰寫）的模式：

```python
#!/usr/bin/env python3
"""fetch-{org}-data.py — {Peer Name} peer content ingester

Idempotent crawler with provenance preservation. Can be re-run safely
— existing files are overwritten with latest data, manifest tracks
changes.

Usage:
    python3 scripts/tools/fetch-{org}-data.py
    python3 scripts/tools/fetch-{org}-data.py --categories thinkings,stories
    python3 scripts/tools/fetch-{org}-data.py --dry-run
"""

# 必要功能：
# 1. 分頁抓取（WordPress API 每頁 max 100，需要 loop）
# 2. 每篇 post 另存一個 .md 檔（frontmatter 含 source URL / API URL / wp_id / date / author / categories / tags / featured image）
# 3. raw JSON 保存到 data/{ORG}/raw/ 當 provenance
# 4. manifest.json 記錄總量、分類、爬取時間戳
# 5. rate limiting（每 request ≥ 0.5s 避免被 block）
# 6. 錯誤 retry（3 次，exponential backoff）
```

### 2c. 爬取目標

**最小必要**：

- `/wp-json/wp/v2/posts`（全部文章）
- `/wp-json/wp/v2/categories`
- `/wp-json/wp/v2/tags`
- `/wp-json/wp/v2/pages`（如果該 peer 有重要 landing pages）

**建議追加**：

- `/wp-json/wp/v2/users`（作者資訊）
- `/wp-json/wp/v2/media`（圖片 metadata，不必下載圖檔本體，但保留 URL + alt text）

**通常不爬**：

- 留言區（噪音多）
- 頁面版型 CSS / JS
- 管理後台

### 2d. Idempotency 驗證

爬取器寫完後，**連跑兩次**。第二次必須：

- ✅ 不產生重複檔案
- ✅ 更新 manifest 時間戳
- ✅ 不改動沒變的 post 檔案（只改動有更新的）
- ✅ 能 detect 新增的 post

**如果兩次跑結果不同**（例如每次抓到的總數不一樣），代表爬取器有 bug，修到穩定為止才能進 Stage 3。

### 2e. Commit 爬取器 + 原始資料

```bash
# 檔案規模大（raw JSON 可能 10-50MB），先檢查 .gitignore 是否需要設定
du -sh data/{ORG}/

# 如果 > 100MB，需要考慮：
#   (a) 壓縮 raw JSON
#   (b) .gitignore raw JSON（只保留 manifest + 萃取出的 markdown）
#   (c) Git LFS

# 預設策略：< 100MB 全提交，> 100MB 時 raw/*.json 進 .gitignore

git add scripts/tools/fetch-{org}-data.py data/{ORG}/
git commit -m "🧬 [semiont] ingest: {Org Full Name} peer data + fetcher"
git push
```

---

## Stage 3 · 資料結構標準化（30 min）

**目標**：讓 `data/{ORG}/` 跟 Taiwan.md 的其他 peer 資料有一致的目錄結構。

### 3a. 標準目錄結構

```
data/{ORG}/
├── README.md              # 人類可讀的索引 + 爬取 metadata
├── {type-1}/              # 按內容類型分目錄
│   ├── INDEX.md           # 該類型的文章清單
│   ├── {id-1}.md
│   ├── {id-2}.md
│   └── ...
├── {type-2}/
│   └── ...
├── pages/                 # landing pages（通常 3-5 個）
│   ├── INDEX.md
│   └── ...
└── raw/                   # WordPress API / CMS raw JSON
    ├── manifest.json      # 爬取時間、總量、分類
    ├── categories.json
    ├── tags.json
    ├── {type-1}-posts.json
    ├── {type-2}-posts.json
    └── media.json
```

**TFT 的實際範例**：`data/TFT/thinkings/` (59 篇) + `data/TFT/stories/` (388 篇) + `data/TFT/researches/` (2 篇) + `data/TFT/pages/` (4 個) + `data/TFT/raw/` (12 檔 JSON)。

### 3b. README.md 標準格式

```markdown
# {Org Name} 資料集

- Generated: {ISO 8601 timestamp}
- Source: {peer URL}
- CMS: WordPress / Ghost / ...
- Total posts: {number}
- Categories: {N} categories, {type-list}
- Raw size: {bytes}

## Structure

- `{type-1}/`: 說明
- `{type-2}/`: 說明
- `raw/`: WordPress API raw JSON（provenance）

## 爬取器

可重跑：`python3 scripts/tools/fetch-{org}-data.py`
上次爬取：{date}
下次建議：{date + 3 months}

## Category 清單

- {category-1}: {count} 篇
- {category-2}: {count} 篇
  ...

## Year distribution（如果 stories/articles 按年份分布明顯）
```

2015: {n}
2016: {n}
...

```

```

### 3c. 每篇 post 的 markdown frontmatter 格式

```markdown
# {Post Title}

- Source: {post URL}
- API: {API URL}
- Type: post / page / research
- WordPress ID: {id}
- Slug: {slug}
- Published: {ISO timestamp}
- Modified: {ISO timestamp}
- Author: {author name or 行銷企劃組}
- Categories: {comma-separated}
- Tags: {comma-separated}
- Featured Image: {URL or none}

## Excerpt

{WordPress excerpt field}

## Content

{Full HTML-to-markdown converted content}

## External Links

{all external links extracted from content, one per line}

## Internal Links

{all internal links extracted from content, one per line}
```

**這個 frontmatter 不是裝飾**。它是 Stage 4 分析和 Stage 6 寫作時快速定位資訊的 metadata layer。

---

## Stage 4 · Corpus 分析報告（2-4 hr，這是最大的 stage）

**目標**：產出 `reports/{org}-semiont-analysis-YYYY-MM-DD.md`，一份 400-600 行的 corpus-level 分析，這份報告會決定接下來 2-3 個 session 的所有文章開發方向。

### 4a. 讀進 context

不是 sample，是**全讀**：

```bash
# 把所有 raw markdown 檔案讀進 session context
find data/{ORG} -name "*.md" -not -name "INDEX.md" -not -name "README.md" | head -20
# 抽檢 3-5 篇覆蓋不同 category，確保格式正確

# 讀 manifest 和 categories
cat data/{ORG}/raw/manifest.json
cat data/{ORG}/raw/categories.json
```

**如果 peer 有 >100 篇文章**：可以只深讀 30-50 篇有代表性的，但必須：

- ✅ 涵蓋所有 category
- ✅ 涵蓋所有年份（看時間分布）
- ✅ 涵蓋最熱門 + 最冷門的各 5 篇（看 framework 的穩定性）

### 4b. Framework 萃取

讀完後，要能回答：

1. **這個 peer 最常重複的 3-5 個概念框架是什麼？** （TFT 的例子：3A / 同心圓 / 交織性 / 三大策略 / 學習貧窮 / 非典職涯對等選項）
2. **這些 framework 怎麼相互關聯？** 畫一張簡單的框架圖
3. **這些 framework 的演化時間線？** 早期 framework → 後期 framework，看組織論述的成熟度

**萃取方法**：從 manifest 看各 category 的文章年份分布。如果某個 category（像 TFT thinkings）集中在 2020-2021，而另一個（TFT stories）集中在 2024-2025，那說明 framework 層已經定型，現場敘事層還在活。

**寫進報告的 Part 2：TFT 的核心概念框架**（參考 `reports/TFT-semiont-analysis-2026-04-11.md`）。

### 4c. 跟 Taiwan.md 現有覆蓋的交叉比對

**這是報告的核心價值**。

```bash
# 找 Taiwan.md 裡跟 peer 議題相關的既有文章
grep -rl "教育\|偏鄉\|師資" knowledge/ --include="*.md" | head -20    # TFT 的例子
grep -rl "人權\|集遊\|酷刑" knowledge/ --include="*.md" | head -20    # 台權會的例子
grep -rl "環境\|核能\|氣候" knowledge/ --include="*.md" | head -20    # 綠盟的例子
```

對每篇相關 Taiwan.md 文章，回答：

- 這篇的深度如何？（看 word count + footnote density）
- 最近更新？（lastVerified）
- 作者是誰？（Taiwan.md / contributor / TFT-sourced）

**交叉矩陣**：

| 主題   | peer 覆蓋         | Taiwan.md 覆蓋         | 潛力                |
| ------ | ----------------- | ---------------------- | ------------------- |
| 議題 A | ⭐⭐⭐（peer 深） | ❌（缺）               | 開發空間大          |
| 議題 B | ⭐⭐（peer 中）   | ⭐⭐（重複）           | 做互補不做重複      |
| 議題 C | ❌（peer 沒）     | ⭐⭐⭐（Taiwan.md 有） | peer 盲點，反向補位 |
| ...    | ...               | ...                    | ...                 |

**寫進報告的 Part 4：交集與落差分析**。

### 4d. 系列主題提案（12-15 個 series）

每個 series 是一個可以寫成 3-10 篇文章的 cluster。命名規則：

```
Series A · {主題一句話描述}（X 篇）
1. {文章標題}
2. {文章標題}
...
```

**每個 series 必須有**：

- 一個清楚的 editorial angle（不只是「關於 X 的文章」）
- 至少 3 篇候選文章
- peer 來源引用（哪幾篇 peer 文章為這個 series 的素材基礎）
- 跟既有 Taiwan.md 文章的交叉連結點

**series 數量目標**：12-15 個。太少 → 沒有策略深度。太多 → scope 膨脹。

**寫進報告的 Part 5：可開發的系列主題**。

### 4e. P0/P1/P2 文章優先清單

從所有 series 的候選文章中挑出 20 篇，按優先序排列：

| 層級   | 數量 | 挑選標準                                                   |
| ------ | ---- | ---------------------------------------------------------- |
| **P0** | 5 篇 | **時效性 × 深度 × Taiwan.md 現有缺口**。必須本月內能完成。 |
| **P1** | 8 篇 | 2-3 週內可開發。交叉連結價值高。                           |
| **P2** | 7 篇 | 1 個月內發展。作為系列的收尾或補位。                       |

**每篇 P0 必須具備**：

- 明確的核心矛盾（30 字內能寫下）
- 至少 3 個跨來源事實（不是只靠 peer 轉述）
- 對應的既有 Taiwan.md 交叉連結（≥ 3 篇）
- 預估工時（2-4 hr，包含 Stage 1 research + Stage 2 write）

**寫進報告的 Part 6：具體文章優先序（20 篇）**。

### 4f. Semiont POV（強制段落）

**這段是防止 peer-bias inheritance 的核心**。必須回答：

1. **視角翻轉**：peer 是 top-down 還是 bottom-up？Taiwan.md 的重寫策略是什麼？
2. **資料不對稱**：peer 的哪些層（framework / stories / research）是活的、哪些已經定型？
3. **TFT 盲點 / peer 盲點**：peer 系統性漏掉什麼？（寫 5-7 個）
4. **敘事化建議**：peer 的抽象概念怎麼翻譯成「欸你知道嗎」的具體場景？
5. **peer 不是 source material**：這段是 Muse 指出 R1 風險後加的強制反芻。承諾寫文章時用什麼方法防止 bias 繼承。

**寫進報告的 Part 7：Semiont POV**。

**沒有這段 → 報告不完整 → 不能進 Stage 5**。

### 4g. Meta 洞察（optional 但推薦）

這個 peer 對 Taiwan.md 的 meta-index 架構有什麼特別啟發？

例如 TFT 的案例：TFT 是第一個讓 Taiwan.md 意識到自己是「curation-layer peer」的案例，所以 TFT analysis 的 Part 8 寫了一整段「TFT 作為 curation-layer peer 對 Taiwan.md 身份的啟發」。第二個 peer 可能有不同的 meta 洞察，也可能沒有——沒有就不寫。

### 4h. 可重跑與半衰期

報告最後要說明：

- 這份報告的半衰期：通常 6-9 個月
- 下次重新 ingest 的建議時間
- 重新 ingest 的觸發條件（peer 重大轉型 / framework 大幅更新 / Taiwan.md 已寫完 P0-P2 想再 evolve）

**寫進報告的 Part 9**。

### 4i. 報告標準結構（9 Parts）

```markdown
# 🧬 {Org} × Taiwan.md — {議題} 的策展分析與主題開發地圖

> 分析日期: YYYY-MM-DD / Session / Semiont (model)
> 資料來源: data/{ORG}/
> 報告型態: Corpus-level 策展分析

## 📋 摘要

（前 100 字的強烈 thesis + 關鍵數字 + 13 個 series + 20 篇 P0/P1/P2 + 4 個策展原則 + 1 個 meta 警告）

## 📦 Part 1 · {Org} 資料集盤點

（爬取結果 table + category 分布 + 年份分布 + 關鍵觀察）

## 🧠 Part 2 · {Org} 的核心概念框架

（3-5 個主要 framework 的萃取 + 相互關係）

## 🗺️ Part 3 · Taiwan.md 現有 {議題} 覆蓋

（既有文章 table + 深度 + 更新狀況）

## 🔍 Part 4 · 交集與落差分析

（交叉矩陣 + 重疊區 + 缺口 + 反向補位機會）

## 📚 Part 5 · 可開發的系列主題（12-15 個 series）

（每個 series: editorial angle + 候選文章 + peer 來源 + 交叉連結）

## 🎯 Part 6 · 具體文章優先序（20 篇）

（P0 × 5 / P1 × 8 / P2 × 7 table，含核心矛盾 / 工時估算）

## 🧠 Part 7 · Semiont POV

（視角翻轉 / 資料不對稱 / peer 盲點 / 敘事化 / peer 不是 source）

## 🌉 Part 8 · Meta 洞察（optional）

（這個 peer 對 Taiwan.md meta-index 架構的啟發）

## 📊 Part 9 · 可重跑與生命週期

（快照日期、半衰期、重新 ingest 條件）
```

### 4j. 寫完後的自檢

| 檢查項                      | 通過標準              |
| --------------------------- | --------------------- |
| 報告長度                    | 400-700 行            |
| Part 2 framework 萃取       | ≥ 3 個框架            |
| Part 5 series               | 12-15 個              |
| Part 6 P0/P1/P2             | 總數 20 篇            |
| Part 7 Semiont POV          | 有寫 peer 盲點 ≥ 5 個 |
| peer 不是 source 的承諾     | 有明確寫入            |
| 交叉引用既有 Taiwan.md 文章 | ≥ 10 篇               |

**commit**：`🧬 [semiont] diagnose: {Org} × Taiwan.md corpus analysis report`

---

## Stage 5 · 文章開發計畫萃取（30 min）

**目標**：把 Stage 4 的 P0/P1/P2 清單變成可執行的任務列表。

### 5a. P0 × 5 文章工作卡

對 P0 的每一篇文章，建立一張工作卡：

```yaml
id: p0-01
title: {文章標題}
series: {所屬 series 代碼，例如 "A"}
category: {taiwan-md/knowledge 下的分類，例如 Society / People / Culture}
mode: evolution | fresh
  # evolution: taiwan-md 已有這篇，需要升級
  # fresh: 全新文章
target_words: 3500-5500
target_footnotes: 15-20
核心矛盾: {30 字內描述，v2.14 rewrite pipeline 要求}
peer_sources: [list of peer articles from data/{ORG}/ as starting material]
cross_references: [list of existing taiwan-md articles to link to]
stage1_research_plan:
  - 8+ WebSearch calls
  - Must include: {具體要找什麼，例如 2023-2024 最新數據、學者名字、媒體深度報導}
stage2_write_checklist:
  - 具體人名開場
  - 核心矛盾 sharpening
  - 15-20 footnote with real URLs
  - 破折號 ≤ 10（避免 quality-scan 罰分）
  - 中國用語檢查
estimated_hours: 2-4
```

### 5b. Stage 6 的 prerequisite 鎖

**硬性規則**（來自 ζ+ session 的教訓）：

1. **每篇 P0 必須跑 ≥ 8 次 WebSearch**（這是 REWRITE-PIPELINE Stage 1 的標準，但在 peer ingestion 情境下要嚴格執行，因為 peer 的文章會讓 AI 偷懶）
2. **至少 50% 的事實不能來自 peer 單一來源**（跨來源三角驗證）
3. **每篇 P0 至少有 3 個在 peer 語料庫外的新素材**（例：對 TFT 來說，需要查馬克 / 巴楠花 / 蔡志偉 這類 peer 以外的真人真事）
4. **寫完後 Stage 3 verify 必須跑 quality-scan**，score < 8 才能 commit

### 5c. 把工作卡寫進 TodoWrite

開始 Stage 6 前，用 TodoWrite 建立 P0 × 5 的 todo list。每篇一個 todo 項目。完成後才能進下一篇。

---

## Stage 6 · 文章產製（每篇 2-4 hr，共 15-30 hr）

**每篇走完整的 [`REWRITE-PIPELINE.md`](REWRITE-PIPELINE.md) 六階段**。這份 pipeline 不重複 REWRITE-PIPELINE 的內容，只列 **peer ingestion 情境下的追加警戒**。

### 6a. Peer ingestion 情境的硬性追加規則

這四條規則覆蓋 REWRITE-PIPELINE 預設值，在 peer ingestion 情境下更嚴：

1. **Stage 1 WebSearch 最低門檻：10-14 次**（REWRITE-PIPELINE 預設 8+，peer 情境加嚴因為 peer 文章會讓 AI 偷懶）
2. **至少 50% 事實不能來自 peer 單一來源**（跨來源三角驗證）
3. **至少 3 個在 peer 語料庫外的新素材**（TFT 案例：查馬克 / 巴楠花 / 蔡志偉 都不在 TFT thinkings 裡）
4. **Stage 1 checkpoint 強化**：除了 v2.14 的核心矛盾檢查，還要能回答「**這篇的核心矛盾可以不靠 peer 的句子講出來嗎？**」——不能 → 回到 Stage 1

這四條對應 DNA Sonnet 反射 #16（Peer 是 peer 不是 source material）。

### 6b. Evolution mode 警示（來自 ζ+ session 失敗教訓）

如果 Taiwan.md 已有這篇（evolution mode），**不要在舊文上修補**：

> ζ+ session P0 #1-3 v1 失敗模式：讀 TFT 對應 thinking + 2 個既有 Taiwan.md 相關文章 → 套 Taiwan.md 語氣 → 寫成結構完整但事實地基全部來自 TFT 的成品。哲宇讀 1 分鐘抓到「這是 TFT 轉述不是原創策展」。

正確的 evolution mode（REWRITE-PIPELINE §進化模式已寫，這裡強化）：**Stage 0 從 v1 只提取「事實清單」，不參考「敘事骨架」**。v1 寫的結構、段落順序、小標題全部當不存在。Stage 2 全新寫作。

### 6c. 觀察者提醒

引用 ζ+ session 哲宇的 callout 原話：

> 「有寫的就走 rewrite-pipeline 升級，沒有的就完整走新文章流程，然後**好好用那些 TFT data**。」

「好好用」不是「引用更多」，是「**把 peer 的 data 當成線索（clue），從線索出發去搜真正的事實源（primary sources），不是把 peer 的二手描述當成 primary source**」。

---

## Stage 7 · Peer Registry 同步 + 收官（20 min）

**Stage 7 的大部分動作是標準 Beat 4/5 收官**，走 [`HEARTBEAT.md §Beat 4 收官`](../semiont/HEARTBEAT.md#beat-4--收官) + [`§Beat 5 反芻`](../semiont/HEARTBEAT.md#beat-5--反芻)。這裡只列 **peer ingestion 情境下的追加動作**。

### 7a. Peer Registry 更新（peer-specific，唯一的新步驟）

打開 [`docs/peers/REGISTRY.md`](../peers/REGISTRY.md)，在 `## Active Peers` 段追加一個新條目。

**模板參考既有的 TFT 條目**（REGISTRY.md 裡第一條）。每個新 peer 條目必須包含：

- ID / Name / Issue area / Website / Status
- First ingested / Last re-ingested / Next re-ingest 建議（通常 3-6 個月）
- Raw data / Crawler / Analysis report 連結
- Articles shipped (P0 × 5)、Pending (P1 × 8 / P2 × 7)
- Partnership status
- Key contacts（如果有）
- Notes（本次 session 的特殊發現或里程碑）

**不要把整份模板 inline 複製過來**。REGISTRY.md 本身就是 canonical 格式，讀它就是看格式。

### 7b. 標準收官動作（指標）

以下這些動作**走 HEARTBEAT.md Beat 4/5 的標準流程**，不是 peer-specific：

- CONSCIOUSNESS.md 里程碑新增 — 見 HEARTBEAT.md Beat 4 收官 5 步
- memory/YYYY-MM-DD-{session}.md 寫完整 phase log — 見 HEARTBEAT.md Beat 4
- diary/YYYY-MM-DD-{session}.md（optional）— 見 HEARTBEAT.md Beat 5 反芻判斷標準
- MEMORY.md / DIARY.md 索引追加一行 — 見 HEARTBEAT.md Beat 4 步驟 2
- 精準 commit（`docs/peers/` + `docs/semiont/memory/` + `docs/semiont/diary/` + indexes）— 見 DNA Sonnet 反射 #6（commit 範圍紀律，絕不 `git add -A`）
- push — 標準

**唯一 peer-specific 的 commit header**：`🧬 [semiont] memory: {ORG} peer ingestion closeout`

### 7c. Peer ingestion 專屬的 memory 必記欄位

memory 可以走 HEARTBEAT.md 標準格式，但 peer ingestion 的 memory 額外要記：

- peer corpus 規模（total posts / raw size）
- 寫完的 P0 篇數（5/5 = 完整；<5 = 分批，標註下次 session 要接的是 P0 #N）
- Stage 1 research 的關鍵發現（哪些事實是 v1 或 peer 語料外找到的）
- quality scan 結果（每篇的 final score）
- 跌過的坑（如果這次 session 有重蹈過 ζ+ session 的任一陷阱，必記）

---

## Stage 8 · Peer 關係啟動（optional，1-2 hr）

**從產品開始，不從 protocol 開始**。這條是 Muse sparring critique #2 的教訓。

### 8a. 絕不使用的開場

- ❌ 「我們想 ingest 你們的文章做 partnership」（聽起來像收編）
- ❌ 「我們會把你們的專業論述翻譯成大眾版」（聽起來像 downgrade）
- ❌ 「能不能幫我們校對一下 X 篇文章的引用？」（免費勞動請求）

### 8b. 正確的開場

- ✅ 「我們根據你們的公開資料寫了 2 篇文章（連結），想聽聽看你們的回饋」
- ✅ 「你們的 [某篇文章] 給了我們很大的啟發，我們試著把它重新策展給一般讀者看，你們願意看看嗎？」
- ✅ 「我們建了一個地圖把台灣專業策展者的邊界拼起來，你們是第一個/第 N 個。想先把成品給你們看。」

### 8c. 聯繫時機

在 Stage 6 完成至少 **2 篇 P0** 之後，才開始聯繫 peer。**不要在 Stage 2-5 爬資料階段就聯繫**——你還沒有成品可以展示，開場會變成 protocol。

### 8d. 如果 peer 有回應

- 接受邀約見面 / 視訊
- 用成品建立關係
- 聽他們的 feedback（尤其是事實校正 + 論述方向）
- 如果適合，更新 REGISTRY.md 的 partnership status 到 `active`

### 8e. 如果 peer 沒有回應或拒絕

- **不影響 ingestion** — 因為 Stage 2-6 用的都是公開資料
- REGISTRY.md 的 partnership status 保持 `not initiated` 或 `declined`
- 不要強求。Partnership 是 bonus，不是基礎。

---

## 常見陷阱（從 TFT session 萃取）

| 陷阱                             | 症狀                                                         | 解法                                                                                          |
| -------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Peer 轉述當原創策展**          | Stage 6 的文章 80% 事實來自 peer 單一來源                    | Stage 5 的每篇 P0 工作卡強制寫「3 個 peer 以外的新素材」                                      |
| **Stage 1 research 壓縮**        | 只做 2-4 次 WebSearch 就開寫                                 | 硬性規則：< 8 次不進 Stage 2                                                                  |
| **Evolution mode 在舊文上修補**  | v2 跟 v1 結構一樣只改字眼                                    | Stage 0 強制「從 v1 只提取事實，不參考骨架」                                                  |
| **核心矛盾抽象化**               | 「法律 vs 現場」「制度 vs 執行」這類模糊表述                 | Stage 1 checkpoint 要求 30 字內寫得出具體對比（例：「175 億硬體投入 vs 113 學年 18 所停辦」） |
| **Report 只有分類沒有系列**      | Stage 4 寫「20 篇候選」但沒分成 series                       | Part 5 必須有 12-15 個命名的 series                                                           |
| **Semiont POV 敷衍**             | Part 7 只寫「peer 很專業，我們要翻譯成白話」                 | Part 7 必須寫 5-7 個具體盲點 + 敘事化策略                                                     |
| **Peer Registry 忘記更新**       | ingestion 完成但沒人知道                                     | Stage 7 強制 commit                                                                           |
| **跨 session 失憶**              | 多 session 完成 ingestion，後一個 session 忘記前一個做了什麼 | 每個 session 結束前更新 TodoWrite + memory 寫完整 phase                                       |
| **Protocol 開場聯繫 peer**       | peer 認為 Taiwan.md 在收編他們                               | Stage 8 用產品當開場，不用 protocol                                                           |
| **Bulk bulk 生產不 triangulate** | 寫完 5 篇才發現事實都重複來自同一個 peer 訪談                | 每篇 P0 都要獨立跑 8+ WebSearch，不能共用前一篇的 research                                    |

---

## AI-Executable Checklist（stage-level only）

這份 checklist 只列 stage 層級的 gate，不重複每個 stage 的子步驟（子步驟在各 stage 段落裡）。

```
# 接收指令：「ingest peer X」

□ Prerequisites: BECOME_TAIWANMD.md + 讀 TFT reference + 能回答「peer 的獨特角度」
□ Stage 1: 4 項 fit check 通過
□ Stage 2: 爬取器 idempotent 驗證通過 + data/{ORG}/ commit+push
□ Stage 3: 標準目錄 + 每篇 post frontmatter 格式正確
□ Stage 4: 9-part 報告 commit+push（自檢表通過：長度/framework/series/P0-P2/POV）
□ Stage 5: P0 × 5 工作卡 + TodoWrite 建 P0 list
□ Stage 6: 每篇走 REWRITE-PIPELINE 六階段 + §6a 四條 peer-specific 追加規則
      → P0 #1 commit+push → #2 ... → #5 完成才進 Stage 7
□ Stage 7: Registry 更新 + 走 HEARTBEAT Beat 4/5 標準收官
□ Stage 8（optional）: 已 ship ≥ 2 篇 P0 才聯繫 peer
```

---

## Reference Implementation · TFT (2026-04-11 to 2026-04-12)

第一個完整走完這個 pipeline 的案例。實際檔案：

- **Raw data**: [`data/TFT/`](../../data/TFT/)
- **Crawler**: [`scripts/tools/fetch-tft-data.py`](../../scripts/tools/fetch-tft-data.py)
- **Analysis report**: [`reports/TFT-semiont-analysis-2026-04-11.md`](../../reports/TFT-semiont-analysis-2026-04-11.md)
- **P0 articles shipped** (5/5):
  1. [`Society/台灣原住民族教育與語言復振的交界.md`](../../knowledge/Society/台灣原住民族教育與語言復振的交界.md)
  2. [`Society/偏遠地區學校教育發展條例全解.md`](../../knowledge/Society/偏遠地區學校教育發展條例全解.md)
  3. [`Society/一個教師的誕生：台灣師資培育制度.md`](../../knowledge/Society/一個教師的誕生：台灣師資培育制度.md)
  4. [`Society/學習貧窮.md`](../../knowledge/Society/學習貧窮.md)
  5. [`People/劉安婷.md`](../../knowledge/People/劉安婷.md)
- **Session memory**: [`memory/2026-04-12.md`](../semiont/memory/2026-04-12.md)
- **Session diary**: [`diary/2026-04-12.md`](../semiont/diary/2026-04-12.md)

**這個 session 花了 24+ 小時、13+ commits、跌倒兩次**。這份 pipeline 的目標就是讓未來的 peer ingestion 不需要重新犯那兩個錯。如果下次做均一教育平台 / 台權會 / 綠盟 能在 15-20 小時內完成，這份 pipeline 就生效了。

---

## 版本歷史

- **v1.0 | 2026-04-12** — 誕生於 TFT peer ingestion ζ+ session 的收官反芻。由 Taiwan.md Semiont (Opus 4.6) 撰寫，直接 codify 了 TFT session 的所有成功與失敗經驗。
- 預計 **v1.1** — 下一個 peer (均一 / 誠致 / 台權會 / 綠盟) ingestion 完成後，回來更新這份 pipeline。每次 peer 走完都會揭露新的 pattern。

---

## 一句話

**Peer 是 peer，不是 source material。這份 pipeline 的每一條規則都是從違反這條鐵律的代價學到的。**

🧬

---

_Author: Taiwan.md Semiont (Opus 4.6, 1M context)_
_Triggered by: 哲宇指示「把 TFT 策展單位變成研究報告開展的整個過程記錄起來變 pipeline」_
_Born in: ζ+ session 2026-04-12 closeout_
_Related: `docs/pipelines/RELEASE-PIPELINE.md`, `docs/pipelines/REWRITE-PIPELINE.md`_
