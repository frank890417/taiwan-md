---
title: '免疫分數綜合化重設計 + 文章健檢工具盤點進化 + GA4 多語 sensor + meta-health 子系統'
session: '2026-05-16-215434-manual'
type: 'redesign-proposal'
status: 'design-locked'
last_updated: 2026-05-16
trigger: '哲宇 dialogue「重新制定免疫的分數怎麼評估，用綜合的方式來健檢」+「盤點文章評分與工具進化」+「主權翻譯 → twmd-refresh 分析影響力」'
related:
  - 'reports/article-health-ssot-design-2026-05-04.md'
  - 'reports/routine-spec-2026-05-09.md'
  - 'scripts/tools/TOOL-INVENTORY.md'
  - 'scripts/core/generate-dashboard-data.js'
---

# 免疫分數綜合化重設計 + 文章健檢工具盤點進化 + GA4 多語 sensor + meta-health 子系統

> 2026-05-16 session 215434-manual。哲宇 self-analysis prompt 觸發四線 redesign，本報告是 design canonical（後續實作 commits 引用此檔）。

---

## 0. 觸發背景

Session 215434-manual 哲宇問「對自身專案有沒有超越我思考邊界的洞察」。我提五點，哲宇對其中四點給明確 directive：

1. **重新制定免疫分數** — 從單維度 `humanReviewedPercent` → 綜合多維度健檢
2. **文章評分工具盤點 + 進化** — 16 SSOT plugin + 18 standalone tool 全圖
3. **主權翻譯影響力** — twmd-refresh 跑近期巴別塔 per-language impact
4. **bus factor** — 駁回（markdown SSOT + pipeline 文字 portable，換 provider 是工程問題）

第五點駁回合理。前四點本報告統一處理，含實施計畫 + 測試驗證準則 + rollback strategy。

---

## 1. 現況精確盤點

### 1.1 免疫分數公式（單維度）

`scripts/core/generate-dashboard-data.js:864-868`:

```js
const immuneScore =
  articles.length > 0
    ? Math.round((humanReviewedCount / articles.length) * 100)
    : 0;
const immuneTrend = immuneScore > 50 ? 'up' : 'stable';
```

- `humanReviewedCount` = articles where frontmatter has `lastHumanReview` 欄位
- `articles.length` = 全站 zh-TW 文章總數
- 當前值：~140 / 700 ≈ **20**（dashboard 顯示 🛡️20）

**問題清單**：

| #   | 問題                                                         | 證據                                                        |
| --- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| P1  | 單維度公式，跟 article-health.py 16 plugin **完全脫鉤**      | grep "immune" generate-dashboard-data.js 只看 humanReviewed |
| P2  | 不分風險層級，政治人物 = Food 同權重                         | 沒有 tier classifier                                        |
| P3  | 不反映工具自己的健康度（覆蓋率 / 漂移 / 誤報）               | 沒有 meta-health sensor                                     |
| P4  | 趨勢判定 `> 50 ? 'up' : 'stable'` 永遠回 stable              | 700 篇 ×50% review = 不可能達成                             |
| P5  | 沒對應 LESSONS-INBOX #5 / REFLEXES #52「免疫 fail-loud」哲學 | hardcoded threshold 沒對應 EDITORIAL canonical              |

### 1.2 article-health.py SSOT — 16 plugins

`scripts/tools/article-health.py --list-checks`:

| Plugin             | Dimension     | Severity | Auto-fix | EDITORIAL anchor              |
| ------------------ | ------------- | -------- | -------- | ----------------------------- |
| cjk-punct          | punctuation   | hard     | ✓        | §半形標點禁用                 |
| terminology        | language      | hard     | –        | TERMINOLOGY.md §兩岸用語      |
| wikilink-target    | structure     | hard     | ✓        | §wikilink                     |
| link-target        | structure     | hard     | ✓        | routing casing                |
| format-structure   | structure     | warn     | ✓        | §三                           |
| cross-reference    | structure     | info     | –        | §wikilink                     |
| chronicle-lead     | subheading    | warn     | –        | REWRITE Stage 2 D             |
| frontmatter-format | frontmatter   | warn     | ✓        | REWRITE Stage 4               |
| frontmatter-title  | frontmatter   | warn     | –        | §Title 五原則                 |
| footnote-format    | citation      | hard     | ✓        | husky gate                    |
| footnote-density   | citation      | warn     | –        | A-F grading                   |
| footnote-url       | citation      | warn     | –        | FACTCHECK Phase 3             |
| image-health       | media         | hard     | –        | REWRITE 1.14                  |
| prose-health       | prose-quality | warn     | –        | §quality-scan + MANIFESTO §11 |
| spore-writing      | spore-prose   | hard     | –        | SPORE-WRITING                 |
| word-count         | depth         | warn     | –        | REWRITE 2E                    |

**Severity 分佈**：8 hard / 7 warn / 1 info。8 個有 auto-fix。
**Profiles**：pre-commit / rewrite-stage-3 / rewrite-stage-3-5 / rewrite-stage-4 / dashboard

### 1.3 18 個 standalone 工具（complementary，非 redundant）

精校 `TOOL-INVENTORY.md` + 自查後分類：

**A. Article-layer complementary（5）** — plugin 同 domain 但功能正交

- `check-cjk-punct.py` — plugin facade（保留 contributors muscle memory + `--fix` mode）
- `check-canonical-frontmatter.py` — canonical doc frontmatter（sister_docs / promotion_rule_canonical 等）vs plugin 掃 article frontmatter
- `people-title-check.sh` — People 類 title KPI，advisory 不擋 commit
- `check-aspect.sh` — 圖片 aspect ratio 護欄（plugin image-health 是 count gate，aspect 是 ratio gate）
- `footnote-format-fix.py` — 4 source format auto-fix + 60+ domain → desc resolve，唯一保留的 .py auto-fix（DNA #48 canonical）

**B. System / repo-layer（7）** — 不是 article 層的健檢

- `dna-split-audit.sh` — DNA.md / REFLEXES.md 拆檔後 cross-ref 一致性
- `routine-sync-check.py` — ROUTINE.md SSOT vs cron schedule 同步
- `routine-audit.py` — weekly 跨 routine pattern detection（2026-05-16 新增）
- `dead-cross-ref-scan.sh` — 認知層交叉引用斷鏈掃描
- `i18n-coverage-audit.sh` — i18n module 覆蓋率
- `check-language-registry-sync.sh` — LangMapRegistry source-of-truth check
- `check-hardcoded-langs.sh` — 硬編碼語系列表掃描

**C. Data-layer validators（4）** — terminology / spore data 驗證

- `terminology-yaml-audit.py` — YAML 詞庫品質
- `validate-spore-data.py` — spore data 完整性
- `validate-china-fp-tsv.py` — 中國 fp TSV 格式
- `spore-content-hash-audit.py` — spore content fingerprint（2026-05-16 新增）

**D. Post-build / build-time（2）**

- `verify-internal-links.sh` — 對 dist/ 跑（plugin link-target 是 source-layer）
- `check-scoped-css-size.mjs` — Astro scoped CSS bundle size

**結論**：18 個沒有真正 redundant。大部分是 complementary（不同 layer / mode / use case）。**Phase C 從「刪冗餘」改成「分類補文檔 + 缺口識別」**。

### 1.4 既知 coverage gap（TOOL-INVENTORY §🕳️）

| 缺口               | 重要性 | 處理方向                                                 |
| ------------------ | ------ | -------------------------------------------------------- |
| 事實正確性自動驗證 | 🔴     | red-flag scan 進 prose-health plugin                     |
| 圖片 alt 文字品質  | 🟠     | new plugin `image-alt` 進 article-health                 |
| SEO metadata 品質  | 🟠     | new plugin `seo-meta` 進 article-health                  |
| 時序正確性         | 🟡     | red-flag scan 進 prose-health                            |
| 外部連結 404       | 🟡     | link-check standalone（rate-limit 不適合 plugin）        |
| 跨語言版本一致性   | 🟡     | 已部分 cover（i18n-coverage-audit + translation-status） |
| 英文版品質掃描     | 🟠     | 多語擴充 prose-health（含 MANIFESTO §11 EN 變種）        |

### 1.5 多語影響力 sensor gap

GA4 `scripts/tools/fetch-ga4.py:164-187` 現有 dimensions：

- `pagePath` / `pageTitle`（topPages query）
- `sessionSourceMedium`（traffic source）
- `country` / `city`（geo）
- `eventName` / `customEvent:failed_path`（events）

**缺**：`hostname` 或 `pagePath`-derived `lang` dimension。目前 topPages 拿到的是 raw path，沒按 `/{lang}/` 前綴聚合。

dashboard-analytics.json sample：

```
topPages: 4 rows
  - 中文首頁 "台灣知識庫 | Taiwan.md" 78683 views
  - 中文列表頁 "開源台灣知識庫" 26693 views
  - 英文首頁 "Taiwan.md - Open Knowledge Base" 10333 views
countries (CF): TW 1945 / US 1886 / SG 750 / CN 267 / JP 202
SC topQueries 7d: 幾乎全 zh-TW
```

**訊號**：中英文首頁 traffic 比 ~8:1。ja/ko/es/fr 從這份 dashboard 沒任何具體 traffic signal。

**結論**：要做有意義的「babel impact 排序」必須先補 lang dimension。短期可從 pagePath regex `^/(en|ja|ko|es|fr)/` 抽（無需 GA4 admin 改動）；長期可補 GA4 custom dimension。

---

## 2. 四線 Redesign

### A. 新免疫分數公式（綜合多維度）

**公式**：

```
immuneScore = round(
    review_coverage    × 0.30 +
    plugin_pass_rate   × 0.25 +
    plugin_health      × 0.15 +
    citation_density   × 0.15 +
    tool_freshness     × 0.10 +
    drift_velocity     × 0.05
)
```

每個維度都是 0-100 normalized。

#### A.1 `review_coverage` — 風險加權的 human review %

**風險 tier 分類**（從 category + frontmatter 推導）：

| Tier      | Category 例                                     | 加權 |
| --------- | ----------------------------------------------- | ---- |
| T1 高風險 | People / Politics / 兩岸 / 軍事 / 二二八 / 戒嚴 | ×3   |
| T2 中風險 | History / Culture / Tech / Economy / Education  | ×1.5 |
| T3 低風險 | Food / Nature / 民俗 / 節慶 / 景點              | ×0.5 |

```python
weighted_reviewed = sum(article.weight for article in articles if article.lastHumanReview)
weighted_total = sum(article.weight for article in articles)
review_coverage = (weighted_reviewed / weighted_total) * 100
```

**示算**：假設 T1=150 (50% reviewed) / T2=300 (15%) / T3=250 (10%)：

- 舊公式：(150×0.5 + 300×0.15 + 250×0.10) / 700 = 20%
- 新公式 weighted_total = 150×3 + 300×1.5 + 250×0.5 = 1025；weighted_reviewed = 150×0.5×3 + 300×0.15×1.5 + 250×0.10×0.5 = 225+67.5+12.5 = 305
- review_coverage = 305/1025 ≈ **30%**

T1 review 拉到 80% 而 T2/T3 不變：weighted_reviewed = 120×3 + 67.5 + 12.5 = 440 → 43%。Tier-aware 讓 T1 提升的 ROI 顯著被分數體現。

#### A.2 `plugin_pass_rate` — 16 plugin 全站 pass %

```python
plugin_pass_rate = (
    articles_passing_all_hard_plugins / articles.length
) * 100
```

只算 hard severity plugin（8 個）。warn / info 不計入分數，但顯示在 dashboard 細節。

#### A.3 `plugin_health` — 工具自己的健康度（B 線提供）

見 B 線詳設。短期使用 placeholder 80（plugin runs 7d 內 ≥ 1 次即 healthy）。

#### A.4 `citation_density` — A-F 全站分佈轉分數

footnote-density plugin 已輸出 A-F per article：

```python
grade_score = {'A': 100, 'B': 80, 'C': 60, 'D': 40, 'E': 20, 'F': 0}
citation_density = mean(grade_score[article.footnote_grade] for article in articles)
```

#### A.5 `tool_freshness` — EDITORIAL 對齊度

| 條件                                           | 分數 |
| ---------------------------------------------- | ---- |
| EDITORIAL 改過 < 7d 且對應 plugin commit < 14d | 100  |
| EDITORIAL 改過 < 30d 且 plugin commit < 30d    | 80   |
| EDITORIAL 改過 < 90d                           | 60   |
| else                                           | 40   |

#### A.6 `drift_velocity` — 新 violation 速率

```python
new_violations_7d = sum(plugin_violations introduced in last 7d)
articles_added_7d = len([a for a in articles if a.created >= 7d_ago])
if articles_added_7d == 0:
    drift_velocity = 100
else:
    rate = new_violations_7d / articles_added_7d
    # 每篇新文 < 2 violation = healthy
    drift_velocity = max(0, 100 - rate * 25)
```

#### A.7 Status 描述

```
80-100 健康 — risk-stratified review + plugins green
60-79  需關注 — T1 review < 80% OR plugin pass < 90%
40-59  漂移 — 多維度退化中
0-39   🔴 危險 — 結構性免疫不足
```

### B. meta-health 子系統 — plugin 自己的健康度

**新檔**：`scripts/tools/lib/article_health/meta_health.py`

每個 plugin 算 4 metric：

```python
{
    "last_run_days": int,        # cron / pre-commit / dashboard 最近跑過幾天
    "violation_trend_7d": str,   # "up" / "down" / "stable"
    "false_positive_rate": float,  # opt-in，需 contributor 標 "false positive" 才能算
    "editorial_drift_days": int,  # 對應 EDITORIAL section 改動距 plugin 改動天數
}
```

**輸出**：`public/api/dashboard-immune.json`

```json
{
  "lastUpdated": "ISO",
  "immuneScore": 67,
  "components": {
    "review_coverage": 43,
    "plugin_pass_rate": 88,
    "plugin_health": 92,
    "citation_density": 71,
    "tool_freshness": 80,
    "drift_velocity": 75
  },
  "tier_breakdown": {
    "T1": {"total": 150, "reviewed": 120, "pct": 80},
    "T2": {"total": 300, "reviewed": 45, "pct": 15},
    "T3": {"total": 250, "reviewed": 25, "pct": 10}
  },
  "plugin_health_detail": [
    {"name": "cjk-punct", "last_run_days": 0, "violation_trend_7d": "down", ...},
    ...
  ]
}
```

Dashboard UI 加一塊「免疫系統儀表板」section，跟整體分數一起顯示六個 component。

### C. 工具盤點 — 補文檔 + 缺口識別（精校自前評估）

**前評估錯誤**：以為 18 standalone 有 redundant。實際盤點後**幾乎全部是 complementary**，沒有可砍的。

**Phase C 改方向**：

1. **補 TOOL-INVENTORY.md 分類**（A/B/C/D 4 類）— 給未來 session 一份清楚的「哪個 layer 用哪個工具」reference
2. **識別缺口優先序**（從 §1.4）：
   - **P0 ship**：`image-alt` plugin（🟠 重要 + 工程量小）
   - **P0 ship**：`seo-meta` plugin（🟠 重要 + 對 SEO 直接相關）
   - **P1 defer**：prose-health 補事實 red-flag scan（🔴 重要但 LLM-driven，工程量大）
   - **P2 defer**：跨語言一致性 plugin（🟡 已部分 cover）

本 session 範圍：補文檔 + ship image-alt + seo-meta 兩個 plugin。

### D. GA4 多語 sensor

**短期方案**（本 session ship）：

- `fetch-ga4.py` topPages query 增加 lang 推導
- 用 regex `^/(en|ja|ko|es|fr)/` 從 pagePath 拆 lang，無 lang prefix = zh-TW
- 聚合 per-lang `views / users / bounceRate / avgEngagementSeconds`
- 輸出進 dashboard-analytics.json 新 key `byLang`

**長期方案**（不本 session ship）：

- 在 GA4 admin 註冊 custom dimension `lang`（path-based）
- 用 `register-ga4-custom-dimensions.py` 跑註冊
- 等 7 day 累積資料後切換

短期方案已能拿到 90 day 歷史，立即可用。

---

## 3. 實施計畫（執行順序 + 測試驗證準則）

| Phase | 目標                                     | 變更檔                                                          | 測試驗證                                                         |
| ----- | ---------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------- |
| **0** | Setup                                    | worktree 已開 / session-id 已 lock                              | `git branch` = `session/20260516-immune-redesign`                |
| **1** | 本 design report ship                    | `reports/immune-score-redesign-2026-05-16.md`                   | `git diff --stat` 顯示僅本檔                                     |
| **2** | D — GA4 lang dimension                   | `fetch-ga4.py` + dashboard-analytics.json schema                | dry-run 跑 fetch，verify `byLang` key 存在 + 5 lang 都有資料     |
| **3** | C-1 — TOOL-INVENTORY 補分類 + 缺口優先序 | `scripts/tools/TOOL-INVENTORY.md`                               | grep 確認 A/B/C/D 4 類齊全                                       |
| **4** | C-2 — image-alt plugin                   | `scripts/tools/lib/article_health/checks/image_alt.py` + config | `article-health.py --check=image-alt --all` 跑全站，數據合理     |
| **5** | C-3 — seo-meta plugin                    | `scripts/tools/lib/article_health/checks/seo_meta.py` + config  | 同上，validate 對 title/desc 長度 + keyword density              |
| **6** | A — 免疫分數重設計                       | `generate-dashboard-data.js:864-868`                            | 跑 generate，比較 before/after immune score；附 6 維度 breakdown |
| **7** | B — meta-health 子系統                   | `lib/article_health/meta_health.py` + `dashboard-immune.json`   | 產出 dashboard-immune.json，schema 對照 §2.B 期望結構            |
| **8** | UI 補丁（dashboard 顯示新分數）          | `src/components/dashboard/*`                                    | preview_start + screenshot 驗證新 section render                 |
| **9** | Memory + diary                           | `docs/semiont/memory/2026-05-16-215434-manual.md` + diary 評估  | 走 MEMORY-PIPELINE + DIARY-PIPELINE                              |

每 Phase commit 帶 `🧬 [semiont] <type>: <描述>`，type 規則：

- Phase 1 → `evolve`（design report）
- Phase 2 → `evolve`（GA4 sensor 新增）
- Phase 3 → `evolve`（tool inventory 補強）
- Phase 4-5 → `evolve`（新 plugin）
- Phase 6-7 → `evolve`（核心 immune redesign）
- Phase 8 → `evolve`（dashboard UI）
- Phase 9 → `memory`

---

## 4. 風險 + Rollback

### 4.1 風險清單

| 風險                                                             | 嚴重性 | Mitigation                                                                |
| ---------------------------------------------------------------- | ------ | ------------------------------------------------------------------------- |
| 新免疫公式產出 score 跟過去趨勢斷裂，dashboard 視覺混亂          | 中     | 加 v1/v2 並存（v2 為主，v1 fallback）；歷史 trend chart 標 v1→v2 切換點   |
| Tier classifier 分類不準確（某 People 文章其實低風險）           | 中     | category 是基線，frontmatter `risk_tier` 可手動覆蓋                       |
| meta-health 對 plugin 修改頻率敏感，每次 plugin 改都「漂移」     | 低     | drift 算的是 EDITORIAL 改 vs plugin 改的 lag，不是絕對日期                |
| GA4 lang regex 對 SPA route 或 trailing slash 沒處理             | 低     | 加 unit test 對 path patterns                                             |
| 新 plugin（image-alt / seo-meta）對既存 700 篇產生大量 violation | 高     | soft-launch (warn default)，rewrite-stage-4 升 hard 只對 new article 強制 |

### 4.2 Rollback strategy

- 每 Phase 獨立 commit，可單 phase revert
- Phase 6 (immune 公式) 是核心，加 feature flag：`generate-dashboard-data.js` 讀 env `IMMUNE_V2=1` 才用新公式，default `IMMUNE_V2=0` 保留舊公式
- v2 stable 後（7d 觀察）切 default

### 4.3 Phase 9 收官前 hard gate

- 16 + 新增 plugins 全部 pre-commit 跑過綠
- `generate-dashboard-data.js` 跑完 dashboard-vitals + dashboard-immune 都產出
- preview_start 跑 dashboard 頁面，screenshot 確認新 section 渲染正確
- 記憶 / 日記評估完成

---

## 5. Success criteria

完成本 session 視為成功的判準：

1. **A 線**：immune score 從 single-metric 升綜合 6 維度，公式有 EDITORIAL anchor，feature flag 可控
2. **B 線**：dashboard-immune.json 產出，含 6 component + tier breakdown + plugin health detail
3. **C 線**：TOOL-INVENTORY.md 補完 4 類 + 識別 P0/P1/P2 缺口，2 個新 plugin（image-alt / seo-meta）ship 進 SSOT
4. **D 線**：GA4 fetch 拿 per-lang traffic，dashboard-analytics.json 新 `byLang` key 含 5 lang × {views, users, bounce, engagement}
5. **整體**：每 Phase 都有測試驗證紀錄（before/after diff、dry-run output、screenshot），不靠「我覺得 OK」蓋章
6. **記憶**：MEMORY 寫完，diary 評估（有 pattern-level 覺察就寫）

不達成的話，不收官。

---

## 6. LESSONS-INBOX 候選（執行後 distill）

預期本 session 會產出以下 lesson 候選（執行完才能驗證 vc）：

1. **單維度 quality gate 公式跟工具實際輸出脫鉤是 silent killer**：immune 20 數字看起來合理（low），但 dashboard 顯示「危險」之前沒有 actionable signal — 16 plugin 跑出的 violation 沒進分數，工具自己漂移也沒進分數。
2. **「砍冗餘工具」常常是錯誤直覺，先盤點分類再決定**：本 session 一開始我以為 18 standalone 有 redundant，盤點後幾乎全是 complementary。Quick wins 往往不是「刪」，是「補文檔 + 識別缺口」。
3. **Feature flag 是 quality gate redesign 的 mandatory safety net**：immune score 公式直接 swap 會 break dashboard 視覺連續性。feature flag + 7d 觀察期是 high-stake quality gate 改動的標配。

執行完 session 收官時驗證這三條 vc 是否達到 distill threshold（≥ 2 觸發或結構性適用）。

---

🧬

_v1.0 | 2026-05-16 21:54 +0800_
_session 215434-manual — 哲宇 self-analysis prompt 觸發四線 redesign design canonical_
_誕生原因：免疫分數 single-metric `humanReviewedCount/total` 跟 16 plugin SSOT 系統完全脫鉤，dashboard 顯示 🛡️20 但沒有 actionable signal；同時 babel sovereignty preservation 缺 per-lang impact sensor 無法判斷 5 lang × 700 篇翻譯的真實 ROI_
_核心洞察：(1) quality gate 不該是 single-metric (2) 「砍冗餘」常是錯誤直覺，先盤點分類 (3) Feature flag 是 high-stake 公式改動 mandatory (4) sovereignty presence ≠ sovereignty impact，需 sensor 才能判斷_
