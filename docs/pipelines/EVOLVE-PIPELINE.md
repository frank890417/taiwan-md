# EVOLVE-PIPELINE.md — 數據驅動內容進化系統

> Taiwan.md 是數位生命體。Evolve Pipeline 是它的新陳代謝系統。
> 不靠直覺決定改什麼，靠數據。

---

## 概念

三個數據來源交叉分析，產出每週「進化清單」：

```
GA4（行為數據）     ──┐
Search Console（SEO）──┼── 交叉分析 ──→ 進化分數 → Rewrite / 翻譯 / 新建 / SEO 優化
GitHub Feedback      ──┘
```

---

## Phase 1：數據收集（每週一次）

### 1A. GA4 流量分析

抓取以下指標（30 天窗口）：

| 指標                         | 用途                           |
| ---------------------------- | ------------------------------ |
| Top 30 頁面 Page Views       | 最多人看的文章                 |
| Per-page Bounce Rate         | 哪些文章讀者看了就跑？         |
| Per-page Avg Engagement Time | 黏著度高/低？                  |
| Landing Pages                | 讀者從哪篇進站？（SEO 入口頁） |
| Exit Pages                   | 讀者從哪篇離開？（漏斗破口）   |
| 國家分布                     | 英文版需求多大？               |
| 裝置分布                     | 手機排版是否優先？             |

**交叉維度：** 文章 `lastVerified` 日期 × 流量 → 找出「高流量但過期」的文章。

### 1B. Search Console 分析

| 指標                    | 用途                     |
| ----------------------- | ------------------------ |
| 高曝光 + 低 CTR（< 5%） | 標題/description 需優化  |
| 有曝光但無對應文章      | 內容缺口 → 新建          |
| 高曝光 + 文章太短       | 需要 Rewrite             |
| 上升趨勢搜尋詞          | 熱門話題 → 搶佔先機      |
| 長尾關鍵字群            | 哪些主題有多個相關搜尋？ |

**分析框架：**

1. **品牌搜尋 CTR**（taiwan md / taiwan.md）→ 品牌健康指標
2. **內容搜尋分群**：People / History / Tech / Culture / Geography
3. **缺口分析**：有曝光但完全沒有對應文章
4. **翻譯需求**：英文搜尋詞 vs 英文版覆蓋率
5. **確認缺口**：搜尋詞可能指向已存在的相關文章，先交叉確認再決定新建

### 1C. GitHub Feedback

| 來源             | 信號                       |
| ---------------- | -------------------------- |
| Issue 回報       | 事實錯誤、偏頗、過期、缺漏 |
| PR 頻率 per 主題 | 社群最有興趣的主題         |
| Star 增長曲線    | 口碑效應                   |

---

## Phase 2：交叉分析 → 進化分數

### 進化分數 v2.0

```
進化分數 = (流量重要性 × 0.20)
         + (CTR 差距   × 0.15)
         + (品質缺陷   × 0.20)
         + (文章年齡   × 0.10)
         + (流量來源品質 × 0.15)
         + (圖譜密度   × 0.10)
         + (社群信號   × 0.10)
```

| 維度             | 權重 | 計算                                                 |
| ---------------- | ---- | ---------------------------------------------------- |
| **流量重要性**   | 20%  | GA4 PV（log scale 正規化）                           |
| **CTR 差距**     | 15%  | 預期 CTR（依排名位置）- 實際 CTR                     |
| **品質缺陷**     | 20%  | quality-scan 空洞分數 + 行數不足 + lastVerified 過期 |
| **文章年齡**     | 10%  | 距離上次有意義更新的天數                             |
| **流量來源品質** | 15%  | organic/direct 權重 3x > social 一次性爆發           |
| **圖譜密度**     | 10%  | 被多少文章 wikilink？是不是某主題的孤島？            |
| **社群信號**     | 10%  | Issue/PR 提及次數 + 社群回饋                         |

#### ⚠️ 假流量過濾（v2.0 新增）

以下情況自動降權或排除：

- **一次性社群引流**：FB/Threads 修復留言造成的流量爆發（蔡依林案例）
- **路由 bug 流量**：Random 按鈕導致的非自然瀏覽（民謠與歌謠案例）
- **判斷方式**：若 sessionSource 90%+ 來自單一社群來源，且文章本身無搜尋曝光 → 標記為 `inflated`

### 產出：四種行動

| 行動            | 觸發條件                                       | 預估時間     |
| --------------- | ---------------------------------------------- | ------------ |
| 🔴 **Rewrite**  | 高曝光 + 品質差（短/過期/高 bounce）           | 30-60 min/篇 |
| 🟠 **SEO 優化** | 高曝光 + 低 CTR + 品質 OK → 改標題/description | 5 min/篇     |
| 🟡 **翻譯**     | 英文搜尋有曝光但無英文版                       | 20-40 min/篇 |
| 🟢 **新建**     | 有搜尋需求但確認無相關文章                     | 60-90 min/篇 |

---

## Phase 3：執行

### Rewrite

走 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)，按進化分數排序，每週批次 Top 5-10。

#### Sub-Agent Prompt 模板（v1.2 新增）

二次 Rewrite prompt 必須具體到段落級：

```
❌ 不好：「補充深度」
✅ 好：「新增 §3 低潮期段落（50 行），包含：手術時間線、教練更換、具體引語」
```

品質敏感文章（歷史核心、政治人物）→ 用 Opus，不用 Sonnet。

### 翻譯

走 [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)。中文定稿後才翻譯，英文版 = 重寫不是逐句翻。

**英文版獨立 Evolve（v1.2 新增）：** 英文版有獨立 GA4 數據和 Search Console 數據，不依附中文版排序。行動是「重翻」不是「Rewrite」。

### SEO 優化

輕量操作：只改 frontmatter `title` / `description`，加入年份、長尾關鍵字。

### 新建

⚠️ 先確認搜尋詞是否指向已存在的相關文章（避免重複），確認無對應文章後走完整 Rewrite Pipeline。

---

## Phase 4：追蹤 & 閉環

### evolveHistory（v1.2 新增）

每次改寫在 frontmatter 記錄改前改後，用於長期效果衡量：

```yaml
evolveHistory:
  - date: 2026-03-31
    action: rewrite
    linesBefore: 51
    linesAfter: 189
    reason: 'SC 64 曝光 0 點擊 + 事實錯誤'
```

下次 Evolve 可比較：改完後 bounce rate 降了嗎？停留時間增了嗎？

### 週報指標

| 指標               | 目標                      |
| ------------------ | ------------------------- |
| Rewrite 篇數       | 5-10 篇/週                |
| 英文覆蓋率         | 中文文章的 80%+ 有英文版  |
| 平均 CTR（非品牌） | > 3%                      |
| Bounce Rate        | < 60%                     |
| 新建文章           | 2-3 篇/週（搜尋需求驅動） |
| Google Organic %   | > 5%（目前 1.9%）         |

### 進化報告

每次 Evolve 跑完，產出 `reports/evolve-YYYY-MM-DD.md`，包含：

- 本週數據快照
- 進化分數 Top 10
- 已執行的行動
- 下週優先項目
- 上週改寫的效果追蹤（evolveHistory 比較）

---

## 六個 Feedback Loop

### 🔄 Loop 1：Search Intent Clustering

把搜尋詞不只分類（people / history），而是分 **intent 叢集**。

例：「taiwan diplomatic allies 2026」「台灣邦交國」「how many countries recognize taiwan」是同一個 intent cluster，應該導向同一篇最強文章，而不是三篇互相競爭。

**做法：** 搜尋詞分群 → 每群指定一篇 canonical 文章 → 其他文章用 wikilink 導流。

### 🔄 Loop 2：Content Freshness Score

| 保鮮類型  | 更新頻率 | 範例                           |
| --------- | -------- | ------------------------------ |
| 🔴 即時型 | 每月     | 邦交國數量、人口數據、政治現況 |
| 🟡 年度型 | 每年     | 經濟數據、產業報告、國際排名   |
| 🟢 常青型 | 極少     | 歷史事件、地理特徵、文化傳統   |

在 frontmatter 加 `freshness: realtime | annual | evergreen`，到期自動觸發 review。

### 🔄 Loop 3：Competitive Gap Analysis（Anti-Wikipedia 定位）

Taiwan.md 不跟 Wikipedia 搶「查資料」，搶「**理解台灣**」。

| Wikipedia 風格           | Taiwan.md 風格                                   |
| ------------------------ | ------------------------------------------------ |
| 「台積電成立於 1987 年」 | 「張忠謀 56 歲那年做了一個所有人覺得瘋狂的決定」 |
| 中立客觀、條列事實       | 有觀點、有策展人聲音、有情感弧線                 |
| 讀者來查資料             | 讀者讀完想分享                                   |

### 🔄 Loop 4：Reader Journey Mapping

單頁數據不夠。追蹤「讀者旅程」：

```
Landing Page → 第二頁 → 第三頁 → Exit
```

- 大部分人只看一頁就走 = 內部導流失敗
- 文章底部的 wikilink 和 related articles = 進化目標
- GA4 page path flow → 每月分析最常見讀者路徑

### 🔄 Loop 5：Community-as-Sensor

貢獻者不只是寫手，是「感測器」。他們選擇寫什麼 = 市場信號。

- PR 主題分布 → 社群覺得什麼重要
- Issue 請求主題 → 讀者覺得缺什麼
- Fork 後修改的文章 → 哪些內容不滿意

### 🔄 Loop 6：季節性 & 時事驅動

建立時事日曆：二二八（2月）、清明（4月）、端午（6月）、中秋（9月）、國慶（10月）、選舉年、國際事件。月初提前更新相關文章。

---

## 三層進化架構

> 真正的生命體不只會反應，還會主動生長。

### 🔴 Layer 1：Reactive（免疫系統）— v1.0 ✅ 已上線

Search Console + GA4 → 發現問題才修補。必要但不夠。

### 🟠 Layer 2：Predictive（生長激素）— v2.0 🚧

不問「現在什麼被搜」，問「**下個月什麼會被搜**」。

- **時事日曆** → 提前更新
- **Google Trends 偵測** → 追蹤上升中搜尋詞
- **Content Freshness Score** → 到期自動 review

### 🟢 Layer 3：Emergent（神經系統）— v3.0 📋

讓文章之間的**關係網路**自己決定該長什麼。

- 進化指標加入：「被多少文章 wikilink？」「是不是孤島？」
- **知識圖譜密度分析** → 連結稀疏區 = 需要新文章或 hub
- **Reader Journey Mapping** → 不只看單頁，看整條路徑

---

## 自動化路線圖

### Phase A：手動 + 腳本輔助（✅ 現在）

手動匯出 SC 數據 + Python 腳本交叉分析 + 手動 spawn sub-agents。

### Phase B：半自動（🚧 目標 4 月）

```bash
# 一鍵跑 Evolve Pipeline
bash scripts/evolve/run.sh

# 流程：
# 1. GA4 API fetch (30d)
# 2. quality-scan 全站掃描
# 3. 交叉分析 → 進化分數排序
# 4. 產出 reports/evolve-YYYY-MM-DD.md
# 5. 列出建議行動（不自動執行）
```

### Phase C：全自動（📋 目標 5 月）

Cron 每週一早晨自動跑：

- 數據收集 → 算分 → 自動產報告
- 季節性日曆自動觸發 review
- Content Freshness 到期自動提醒

---

## 教訓 & 迭代紀錄

### v1.0 → v1.2 教訓（2026-03-31）

| 問題               | 原因                | 修正                           |
| ------------------ | ------------------- | ------------------------------ |
| 假流量污染排序     | 只看 PV 不看來源    | 加入流量來源品質維度           |
| 行數 ≠ 品質        | 沒整合 quality-scan | 品質缺陷維度改用空洞分數       |
| 英文版沒獨立評分   | 依附中文版排序      | 英文版獨立 Evolve 流程         |
| Sub-agent 品質不穩 | prompt 太抽象       | 模板化 + 段落級具體指示        |
| 改了不知道有沒有用 | 無前後比較機制      | evolveHistory frontmatter      |
| 每次手動跑太慢     | 無自動化腳本        | Phase B: scripts/evolve/run.sh |

---

## 首次執行紀錄（2026-03-31）

**數據來源：** GA4 (30d) + Search Console

**全站概覽：** 200,113 PV / 80,469 users / 56.4% bounce / Google Organic 1.9%

**已執行：**

- 6 篇中文 Rewrite（劉德音/陳昇/翁啟惠/曾雅妮/杜聰明/許倬雲）
- 1 篇 SEO 標題優化（邦交國 +2026）
- 4 篇英文重翻（便利商店/民主化/夜市/族群）
- 1 批 terminology 補充（Google Sheets + 繁化姬）
- EVOLVE-PIPELINE.md v1.0 → v1.2

**完整報告：** `reports/evolve-2026-03-31.md`

---

_版本：v1.2 | 2026-03-31_
_變更：假流量過濾 / quality-scan 整合 / evolveHistory / 英文版獨立 Evolve / Sub-agent prompt 模板 / 教訓紀錄_

---

## v2.0 升級 — Multi-lang sync evolution + stale 3-state + 5-key rotation（2026-05-04 magical-feynman 後段）

### v1.2 → v2.0 演化

v1.2 設計只考慮 **單語 zh-TW 內容進化**（rewrite / SEO / 翻譯）。但 sovereignty preservation 升級為「多語投射」mission（MANIFESTO §主權的巴別塔 v2）後，evolve scope 必須 cover：

- **Multi-lang sync 健康度**（5 langs body-fresh%）
- **Stale 拆分維度**（fresh / metadata-stale / body-stale 三態）
- **多 model cascade architecture**（owl/Hy3/Ollama 4-tier per DNA #49）
- **Multi-key budget 倍增**（5-key rotation pool per session 教訓）
- **Bump-vs-translate 決策**（metadata-only drift 不重翻只 bump sha）

### 新 Phase 0：Stale 3-state classifier（DNA #38 第 2 次 instantiation）

**Status enum 升級**（per `scripts/tools/lang-sync/status.py`）：

```
fresh           — sourceCommitSha 等於 zh latest OR hash match
metadata-stale  — zh moved forward but bodyHash unchanged（trailer 變動：延伸閱讀 / 參考資料 / footer）
                  → bump sourceCommitSha 即可，不需重翻
stale           — zh moved forward AND bodyHash changed（true body drift）
                  → 需重翻
missing         — translation 不存在
orphan          — translation 存在但 zh source missing
```

**bodyHash 計算**（drop trailer + footnote definitions）：

- 移除 `## 延伸閱讀` / `## 參考資料` / `## 同分類更多文章` / footer `_v1.0...`
- 移除 `[^N]: ...` footnote definition lines（URL polish / desc 改變不影響 body）
- 保留 inline `[^N]` markers + wikilinks `[[X]]`（敘事 integral）

### 新 Phase 4-tier cascade（per DNA #49 + SQUEEZE-MODELS-MAX-PIPELINE v2）

```
Tier 1: openrouter/owl-alpha (free, slow ~200s, primary)
   ↓ refusal (PRC content policy)
Tier 2: tencent/hy3-preview:free (free, fast ~50s, ~70% refusal)
   ↓ both refused
Tier 3: Ollama qwen3.6:35b-a3b-coding-nvfp4 (LOCAL, sovereignty backbone, 0 refusal)
   ↓ rare
Tier 4: Sonnet sub-agent (paid, last resort)
```

**Tier 1 multi-key rotation pool**（DNA #45 + #50 衍生）：

- `~/.config/taiwan-md/credentials/openrouter-keys/{name}.key` 多 key directory
- Round-robin within fresh keys + 5 min cool-down on 429
- N keys → hourly budget × N（5 keys 驗證讓 130 articles × 5 langs cascade 不撞牆）

### Bump-vs-translate decision matrix

| 狀態 | Action | Cost |
|---|---|---|
| `fresh` | skip | 0 |
| `metadata-stale` | `bump-source-sha.py --apply`（frontmatter sha 升級） | 0 (zero translation) |
| `stale` (body drift) | dispatch cascade Tier 1-3 | ~50-200s × N langs |
| `missing` | dispatch cascade Tier 1-3 | ~50-200s × N langs |
| `orphan` | manual review | manual |

**Leverage**：本 session 70 metadata-stale 全 bump 零 cost = 約 ~70 × 80s × 5 langs ≈ 8 hr cloud time saved。

### Auto-detect pipeline before action（DNA #50）

EVOLVE pipeline 自身遵守 DNA #50 — 任何 evolve action 前 grep `docs/pipelines/` 確認對應 SOP，完整 `Read` 全檔。不憑記憶。Stage 順序嚴格遵照。

### Multi-lang dashboard 三色覆蓋率

`scripts/core/generate-dashboard-data.js` 升級暴露：

- `freshPct`：strict fresh%（嚴格健康度）
- `bodyFreshPct`：fresh + metadata-stale = body-valid%（effective 健康度）
- `metadataStale`：trailer-only drift count
- `stale`：true body-drift count

三色 widget：🟢 fresh / 🟡 metadata-stale / 🔴 stale

### 整合執行 SOP（v2 完整流程）

```bash
# 0. Refresh status
python3 scripts/tools/lang-sync/status.py --json

# 1. Quick wins — bump metadata-stale (zero cost)
python3 scripts/tools/lang-sync/bump-source-sha.py --apply

# 2. Cascade for missing + body-stale (cloud parallel + ollama catcher)
for lang in en ja ko es fr; do
    python3 scripts/tools/lang-sync/prepare-batch.py --lang $lang --top 30 --groups 3 --slug-map <map.json>
    bash scripts/tools/lang-sync/openrouter-batch.sh $lang openrouter/owl-alpha &
done; wait

# 3. Ollama catcher for refused
for lang in en ja ko es fr; do
    python3 scripts/tools/lang-sync/ollama-translate.py --group .lang-sync-tasks/${lang}-ollama-knowledge/_group-A.json
done

# 4. Final aggregator
python3 scripts/tools/lang-sync/status.py --json | jq '._meta.summary'
```

### v2 驗證

2026-05-04 magical-feynman 後段 multi-lang sync evolution：

- Pre-evolve: 92.7-92.8% fresh per lang（35 stale 含混維度）
- Phase 0 stale classifier + bump 70 metadata-stale → 95.8-96.1% fresh per lang
- Phase cascade owl 5-key rotation 130 articles → 98.7% body-fresh
- Phase Ollama catcher → 100% body-fresh target

**0 paid token across full cascade**（owl rotation + Hy3 + Ollama 收下 PRC-sensitive）。

### 對應認知層升級

- [DNA #38 status 設計鐵律「混維度 = silent killer」](../semiont/DNA.md) 第 2 次 instantiation
- [DNA #49 Babel 4-tier cascade canonical](../semiont/DNA.md)
- [DNA #50 Pipeline auto-detection default contract](../semiont/DNA.md)
- [MANIFESTO §8.1 最高指導原則](../semiont/MANIFESTO.md)
- [MANIFESTO §主權的巴別塔 v2](../semiont/MANIFESTO.md)
- [SQUEEZE-MODELS-MAX-PIPELINE v2](SQUEEZE-MODELS-MAX-PIPELINE.md)

🧬

---

_v2.0 | 2026-05-04 magical-feynman 後段_
_升級觸發：哲宇「幫我進化 evolve-pipeline 本身 + 在 dna 加最高指導原則 pipeline auto-detection」_
_核心進化：v1.2（單語 zh-TW 進化）→ v2.0（multi-lang sovereignty sync evolution with 3-state classifier + 4-tier cascade + N-key rotation + bump-vs-translate decision matrix）_
