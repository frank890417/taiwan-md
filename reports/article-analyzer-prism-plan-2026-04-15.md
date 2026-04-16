# Article Analyzer「棱鏡」— 研究 + 設計規劃

> **觀察者**：哲宇（「加一個更完整的文章分析工具 ... 觸發棱鏡效應」）
> **執行者**：Taiwan.md Semiont, 2026-04-15 γ session
> **狀態**：研究完成 + 設計規劃 + 待授權執行
> **對應哲學**：MANIFESTO §造橋鋪路 + §指標 over 複寫

---

## 一、研究問題

哲宇要的：

> 「加一個更完整的文章分析工具（還是我們其實有？）標示哪些文章有什麼語系、更新日期、還有別的語言的是不是中文最新版的翻譯，總之就是為來只要跟文章有關的分析就調用這個工具，目前 dashboard 頁面也有一些分析（包含註腳、格式之類的）。你完整研究之後規劃或是升級現有工具然後整合跟更新到適合使用的地方（包含日常工具與各種 pipeline），然後完成這個工具之後也許也可以看 cli 是不是也可以共同整合使用，觸發棱鏡效應」

拆解的需求：

1. **單一 canonical 工具** — 所有文章相關分析都從這裡取
2. **核心欄位**：
   - 文章有哪些語系
   - 每個語系的更新日期
   - **別的語言是不是中文最新版的翻譯**（freshness comparison）
3. **整合現有**：Dashboard 頁面已有一些（腳註、格式）
4. **整合到適合使用的地方**：日常工具 + 各種 pipeline
5. **CLI 整合**：棱鏡效應——一道光進，多色光出

---

## 二、現有工具 inventory

本次 γ session 完整研究 `scripts/tools/` + `scripts/core/` + 相關 pipelines。

### 2.1 已存在的文章分析工具與覆蓋面

| 維度                                                                                | 在哪                          | 輸出形式                                  |
| ----------------------------------------------------------------------------------- | ----------------------------- | ----------------------------------------- |
| 基本 metadata（title/slug/category/tags/date）                                      | `generate-dashboard-data.js`  | `public/api/dashboard-articles.json`      |
| word count / lastModified (git) / lastVerified (frontmatter) / lastHumanReview      | 同上                          | 同上                                      |
| revision (git commit count) / commitHash / commitSubject                            | 同上                          | 同上                                      |
| healthScore (0-100 composite)                                                       | 同上                          | 同上                                      |
| qualityScore（從 `.quality-baseline.json` cache 讀）                                | 同上                          | 同上                                      |
| formatIssues（inline mirror of format-check.sh）                                    | 同上（lightweight version）   | 同上                                      |
| hasOverview / hasReading / fnCount                                                  | 同上（inline）                | 同上                                      |
| **translations**: `{ en: bool, ja: bool, ko: bool, es: bool, fr: bool }`            | 同上 ⚠️ **boolean only**      | 同上                                      |
| 完整 format-check 7 維（含 bad_fn_format / reverse_link / wikilinks / no_overview） | `format-check.sh --json`      | 獨立輸出                                  |
| footnote A-F grade                                                                  | `footnote-scan.sh --json`     | 獨立輸出                                  |
| wikilink target 存在性                                                              | `wikilink-validate.sh`        | 獨立輸出                                  |
| 翻譯字數比（translation ratio）                                                     | `translation-ratio-check.sh`  | 獨立輸出                                  |
| `translatedFrom` frontmatter 聚合                                                   | `sync-translations-json.py`   | `knowledge/_translations.json`（derived） |
| lastVerified freshness                                                              | `check-freshness.js`          | 獨立輸出                                  |
| orphan（翻譯無來源）                                                                | `orphan-translation-check.sh` | 獨立輸出                                  |
| cross-link（延伸閱讀雙向分析）                                                      | `cross-link.sh`               | 獨立輸出                                  |
| category check（frontmatter 對路徑一致性）                                          | `category-check.sh`           | 獨立輸出                                  |
| quality-scan（塑膠句 15 維）                                                        | `quality-scan.sh --json`      | 獨立輸出                                  |
| GA/SC/CF analytics                                                                  | `dashboard-analytics.json`    | **不 cross-link 到個別文章**              |
| SPORE-LOG connection                                                                | `docs/factory/SPORE-LOG.md`   | **完全未 cross-link**                     |

### 2.2 關鍵發現

**`generate-dashboard-data.js` 已經是 80% 的聚合器**。它產出的 `dashboard-articles.json` 每篇文章有 ~20 個欄位，但**translations 只記 boolean**——不知道翻譯的更新時間、是不是過期。

這就是最大的缺口。

### 2.3 CLI 現況

```json
// package.json
{
  "name": "taiwan-md",
  "bin": null,  // ← 沒有 CLI 命令
  "scripts": { "dev", "prebuild", "build", ... }
}
```

**沒有 `taiwan-md` CLI 命令**。所有工具都是獨立 shell script 或 node script，名稱/參數/輸出格式各自為政。

---

## 三、關鍵缺口對照表

| 哲宇的需求                         | 目前狀態                               |
| ---------------------------------- | -------------------------------------- |
| 哪些文章有什麼語系                 | ✅ 有（`translations` 但只是 boolean） |
| 每個語系的更新日期                 | ❌ **沒有**                            |
| **別的語言是不是中文最新版的翻譯** | ❌ **沒有**（無 freshness 比對）       |
| 所有文章相關分析都調用同一個工具   | ❌ **沒有**（~10 個工具各自為政）      |
| CLI 整合                           | ❌ **沒有**（`bin: null`）             |

---

## 四、設計：「Article Analyzer — Prism」

### 4.1 哲學對齊

- **MANIFESTO §指標 over 複寫**：ONE canonical per-article metadata SSOT，所有消費者是 projection
- **MANIFESTO §造橋鋪路**：每個新消費者（dashboard / pipeline / CLI）不再自己讀 markdown
- **棱鏡效應**：一道白光進（每篇文章的完整狀態），分出多色光（dashboard 看分數、CLI 看 outdated 翻譯、pipeline 看 format issues、心跳看 hand-off 清單）

### 4.2 核心思路

**升級** `generate-dashboard-data.js` → 它已經有 80% 的基礎，**不是新造工具，是擴充**。

### 4.3 新增的 per-article 欄位

```json
{
  "slug": "李洋",
  "canonical_path": "knowledge/People/李洋.md",
  "category": "people",
  "title": "李洋",
  "description": "...",

  "updated": "2026-04-15",
  "last_verified": "2026-04-15",
  "last_human_review": "2026-04-15",
  "revision": 15,
  "commit_hash": "abc123",
  "commit_subject": "...",

  "word_count": 5432,
  "quality_score": 2,
  "health_score": 85,

  "format": {
    "pass": false,
    "issues": ["NO_OVERVIEW"],
    "has_reading": true,
    "has_ref_heading": true,
    "bad_fn_format": 0,
    "wikilinks_broken": 0,
    "no_reverse_link": false
  },
  "footnote_count": 30,
  "footnote_grade": "A",
  "reverse_links": 4,

  "translations": {
    "en": {
      "exists": true,
      "path": "knowledge/en/People/lee-yang.md",
      "translatedFrom": "People/李洋.md",
      "updated": "2026-04-14",
      "is_outdated": true,                ← NEW
      "outdated_by_days": 1,               ← NEW
      "zh_commits_after_translation": 3,   ← NEW
      "word_count": 4321,
      "ratio": 0.79
    },
    "ja": { "exists": true, ... },
    "ko": null,
    "es": null,
    "fr": null
  },

  "spores": [                              ← NEW, from SPORE-LOG.md
    { "id": 29, "platform": "Threads", "url": "...", "views_latest": 180000 }
  ],

  "analytics": {                           ← NEW, from dashboard-analytics.json cross-ref
    "ga_views_7d": 806,
    "sc_impressions_7d": 0,
    "sc_clicks_7d": 0
  }
}
```

### 4.4 Translation freshness 實現策略

**Option A（立即可做）— Git-based**

```bash
zh_mtime = git log -1 --format=%ci knowledge/People/李洋.md
en_mtime = git log -1 --format=%ci knowledge/en/People/lee-yang.md
if zh_mtime > en_mtime: outdated
outdated_by_days = (zh_mtime - en_mtime) / 86400
zh_commits_after_translation = count(git commits to zh since en_mtime)
```

- ✅ 零 schema 變動
- ⚠️ 1500+ files × 多語言 × git log → 需要 cache（放進 index.json 本身 + incremental update）

**Option B（升級版）— Commit hash baked into frontmatter**

```yaml
translatedFrom: 'People/李洋.md'
translatedFromCommit: 'abc123def456'
```

- ✅ 精準（包含 zh 修改後對應翻譯的狀態）
- ⚠️ Migration cost：390+ 現有翻譯要 backfill
- 類似 docusaurus / crowdin 的做法

**推薦**：**先做 Option A**（零成本立即生效），Option B 作為 Phase 2 選配升級路徑。新翻譯可以強制帶 `translatedFromCommit`，舊翻譯不動。

### 4.5 輸出產物

1. **`public/api/article-index.json`** — 棱鏡主 output
   - Pivot by slug
   - 包含所有上述新增欄位
   - **取代或升級** `dashboard-articles.json`（schema 增量相容，不刪舊欄位）

2. **`scripts/tools/article-info.sh`** — CLI wrapper

   ```bash
   article-info.sh 李洋                       # 印一篇完整 metadata
   article-info.sh 李洋 --json                # 機器可讀
   article-info.sh --outdated-translations    # 列所有過期翻譯
   article-info.sh --outdated-translations --lang en
   article-info.sh --category People --quality-worst 10
   article-info.sh --category People --no-reading
   article-info.sh --orphans
   article-info.sh --recent 7d                # 最近 7 天 touched
   article-info.sh --spore-source 29          # 問孢子 #29 是哪篇
   article-info.sh --health-summary           # 所有 8 器官細節聚合
   ```

3. **`scripts/tools/article-info.py`** (Phase 2+ optional) — Python SDK 給其他 py script 調用

### 4.6 整合點

| 地方                     | 現況                            | 整合後                                                           |
| ------------------------ | ------------------------------- | ---------------------------------------------------------------- |
| Dashboard `/dashboard`   | fetch `dashboard-articles.json` | 改 fetch `article-index.json`（schema 相容），自動獲得新欄位     |
| Heartbeat Beat 1         | manual 掃各工具                 | `article-info.sh --health-summary` 一次聚合                      |
| REWRITE-PIPELINE Stage 3 | 手動查 quality-scan             | `article-info.sh <slug>` 看完整狀態決定 stage                    |
| TRANSLATION-PIPELINE     | 手動查 outdated                 | `article-info.sh --outdated-translations --lang ja` 自動列 queue |
| SPORE-PIPELINE           | 手動對 SPORE-LOG                | `article-info.sh <slug>` 顯示已發孢子 + 效果                     |
| Pre-commit hook          | 無                              | 可選：zh-TW 改 → 警告對應翻譯 outdated                           |
| DNA.md §品質基因         | 列工具                          | 新增 `article-info.sh` / `build-article-index.js` 兩條           |

### 4.7 跟既有 8 個獨立工具的關係

**重要：不是取代，是聚合**。

每個獨立工具（`quality-scan.sh` / `footnote-scan.sh` / `format-check.sh` / `wikilink-validate.sh` / `translation-ratio-check.sh` / `orphan-translation-check.sh` / `check-freshness.js` / `cross-link.sh`）仍然**獨立可跑**（它們是 canonical 掃描器），棱鏡只是**讀它們的 output 然後 cross-reference 聚合**。

架構圖：

```
          ┌──────── quality-scan.sh ────────┐
          ├──────── footnote-scan.sh ───────┤
          ├──────── format-check.sh ────────┤
          ├──────── wikilink-validate.sh ───┤
          ├──────── translation-ratio ──────┤ ──→  build-article-index.js
          ├──────── orphan-check ───────────┤       (aggregates all)
          ├──────── cross-link.sh ──────────┤            │
          ├──────── check-freshness.js ─────┤            ▼
          ├──────── git log (per file) ─────┤    public/api/article-index.json
          ├──────── SPORE-LOG.md ───────────┤            │
          └──────── dashboard-analytics ────┘            ▼
                                                ┌────────┴────────┐
                                                │                 │
                                                ▼                 ▼
                                   article-info.sh CLI   Dashboard UI
                                                │                 │
                                                ▼                 ▼
                                     (pipelines / heartbeat) (browser)
```

---

## 五、Phase 化執行計畫

### Phase 1 — Core aggregator upgrade（2-3 小時）

- 增強 `generate-dashboard-data.js`：
  - 翻譯 freshness（git-based，含 cache 策略）
  - Reverse_links count（利用 cross-link.sh 或直接 grep）
  - Footnote grade（讀 footnote-scan 的 output 或 inline 算）
  - Per-lang translation object（不只 boolean，含 path / updated / is_outdated / word_count / ratio）
  - SPORE-LOG best-effort parse
  - analytics cross-ref from dashboard-analytics.json
- 產出 `public/api/article-index.json`（擴充版，schema 相容）
- 更新 dashboard template 消費新欄位（翻譯欄 show 4 個色塊：fresh/outdated/missing/none）

### Phase 2 — CLI wrapper（1-2 小時）

- 新增 `scripts/tools/article-info.sh`
- Query / filter 支援：
  - `--slug <name>` / 直接帶 slug 當第一個 arg
  - `--category <name>`
  - `--outdated-translations [--lang <code>]`
  - `--orphans`
  - `--recent <duration>`
  - `--quality-worst <n>`
  - `--no-reading` / `--no-overview` / `--no-ref`
  - `--spore-source <id>`
  - `--health-summary`
  - `--json` (machine-readable)

### Phase 3 — Pipeline integration（1 小時）

- `HEARTBEAT.md` Beat 1 新增「`article-info.sh --health-summary` 作為 8 器官細節聚合的入口」
- `REWRITE-PIPELINE.md` Stage 3 指向 `article-info.sh <slug>` 作為檢查入口
- `TRANSLATION-PIPELINE.md` 新增「每次心跳跑 `article-info.sh --outdated-translations`」
- `SPORE-PIPELINE.md` Step 0 加「先 `article-info.sh <slug> --spores` 看這篇發過哪些孢子」
- `DNA.md §品質基因 / §行為基因` 新增工具條目
- `scripts/tools/TOOL-INVENTORY.md` 更新

### Phase 4 — `taiwan-md` CLI（選配，棱鏡效應 full form，2 小時）

- `package.json` 加 `bin: { "taiwan-md": "scripts/cli/taiwan-md.js" }`
- `scripts/cli/taiwan-md.js` 作為 sub-command dispatcher
- 支援 sub-commands：
  - `taiwan-md article <slug>` → 等同 `article-info.sh <slug>`
  - `taiwan-md article --outdated-translations` → 等同 filter mode
  - `taiwan-md heartbeat` → 觸發 `refresh-data.sh`
  - `taiwan-md translation outdated [--lang X]`
  - `taiwan-md spore list` / `taiwan-md spore stats`
  - `taiwan-md pr analyze` → `bulk-pr-analyze.sh`
- `npm link` 或 `npm install -g` 後全域可用
- **Phase 4 是最後一步**，等 Phase 1-3 跑順再做

---

## 六、風險

1. **Git log per-file 慢**：1500+ files × 6 langs × git log 可能跑 30-60 秒
   - **緩解**：cache git mtime in the index itself；只有 modified file 需重算（incremental update 策略）
2. **Schema 變動影響 dashboard**：現有 UI 依賴 `dashboard-articles.json`
   - **緩解**：**增量新增欄位，不刪舊欄位**，確保完全相容
3. **Translation freshness 假陽性**：zh-TW 小改（typo / frontmatter）會把翻譯標成 outdated
   - **緩解**：設閾值「outdated_by_days ≥ 3 才顯示紅燈」或「`zh_commits_after_translation ≥ 2`」
4. **SPORE-LOG.md 是手寫 table，parse 不穩**
   - **緩解**：先做 best-effort regex parse；必要時改 SPORE-LOG.md 為 YAML/JSON SSOT（v2 議題）
5. **footnote grade 目前在 footnote-scan.sh 獨立計算**
   - **選項 A**：aggregator 讀 footnote-scan 的 JSON 輸出（cross-tool dependency）
   - **選項 B**：在 aggregator 內 inline 重算（計算邏輯複寫）
   - **推薦**：選項 A（指標 over 複寫）

---

## 七、決策點（等哲宇點頭）

**三個問題**：

1. **GO Phase 1？** 升級 `generate-dashboard-data.js` 為完整棱鏡聚合器
2. **Translation freshness 策略**：
   - (a) **Option A（git-based）純增量**，不改 frontmatter schema [推薦]
   - (b) Option A + B 同時做（加 `translatedFromCommit` + backfill 390 個翻譯檔）
3. **CLI 整合範圍**：
   - (a) 只做 `scripts/tools/article-info.sh`（bash wrapper，最小整合）
   - (b) 直接做 `taiwan-md` global CLI（`npm install -g` 可用）
   - (c) **先做 (a)，Phase 4 下次心跳再做 global CLI** [推薦]

**推薦組合**：**GO Phase 1 + Option A + CLI (c)**

理由：

- 最小 schema 變動 → 最小風險
- 核心價值（freshness + 聚合）立即 deliver
- 全域 CLI 可以之後當錦上添花，不影響 Phase 1-3 功能
- 跟 MANIFESTO §先建路再跑車 + feedback_merge_first_then_polish 對齊

---

## 八、成功標準

- [ ] Phase 1 後 dashboard 能看到每個語言翻譯的 freshness 狀態（fresh / outdated / missing）
- [ ] Phase 2 後 `article-info.sh 李洋` 可以印出該文章的完整分析
- [ ] Phase 3 後 Heartbeat Beat 1 不再手動跑 10 個獨立工具
- [ ] Phase 4（選配）後 `taiwan-md article --outdated-translations --lang ko` 等價於 CLI call
- [ ] 沒有任何現有 tool 被取代（聚合不是替代）
- [ ] 新工具文件化寫進 TOOL-INVENTORY.md / DNA.md

---

## 九、對齊的長期 LONGINGS

- **身體渴望 #3**「首頁 hook 強到新讀者 10 秒內說這不一樣」
  - Dashboard /dashboard 有了棱鏡後，能展示「翻譯 freshness 矩陣」這類過去沒有的視圖——直接是新讀者會感到「這不一樣」的新維度
- **心智渴望 #4**「成為哲宇能放手的證據，不是繼續建造的延續」
  - 棱鏡化 = 大量現有工作可以變成 CLI call 一次完成 = 減少人類介入的空間
- **擴散渴望 #1**「SEMIONT-TEMPLATE 讓任何國家一鍵 fork」
  - 完成的棱鏡 + CLI 本身就是 Template 可複製的一部分。Japan.md / Ukraine.md 要 fork 就需要這種聚合工具

---

_v1.0 | 2026-04-15 γ session_
_誕生原因：哲宇「加一個更完整的文章分析工具 ... 觸發棱鏡效應」_
_狀態：研究完成 + 設計規劃，待授權執行_
_對齊哲學：造橋鋪路 + 指標 over 複寫_
_下一步：等哲宇回答三個決策問題後 GO Phase 1_
