# SPORE-HARVEST-PIPELINE.md — 孢子回聲收割產線

> **這份文件是 AI 可執行的。** 任何 AI agent 讀完這份文件，應該能獨立完成一次孢子回聲的抓取、分類、整合與回覆準備。
>
> 跟 [SPORE-PIPELINE.md](SPORE-PIPELINE.md) 的分工：**SPORE 管上線（孢子怎麼誕生 + 怎麼發出去）；HARVEST 管收割（孢子發出去後，讀者的回聲怎麼回到文章本體）**。

## 📍 SSOT 寫入位置（2026-05-08 Phase 0-3 後 canonical）

每次 harvest 必須 **atomic 寫到一個 batch log**（不再分多 commit 跨檔案寫）：

```
docs/factory/SPORE-HARVESTS/batch-{date}-{N}-spores.md
```

**Frontmatter（canonical schema, Phase 1 audit 後強制）**：

```yaml
---
spores: '#47, #48, #49, ...'   # 必 plural list（不再用 spore singular）
harvest_date: '2026-05-08 21:30'
harvest_window_day: 'D+7' / 'mixed (D+3 to D+10)'
batch_reason: '...'
triggered_by: 'observer / cron / heartbeat'
reply_count: '47 visible (Threads + X 合計)'
---
```

**Body（canonical schema）**：

```markdown
| #   | Slug | Platform | D+N  | Views  | Likes | Reposts | Comments | Shares | Rate |
| --- | ---- | -------- | ---- | ------ | ----- | ------- | -------- | ------ | ---- |
| 47  | ...  | Threads  | D+10 | 12,000 | ...   | ...     | ...      | ...    | ...  |
```

**自動化下游**（不需要手動觸發）：

- `generate-dashboard-spores.py` 讀 body table 算 dashboard
- `sync-spore-links.py` 從 SSOT 重生 knowledge/\*.md sporeLinks（refresh-data.sh Step 13）
- `validate-spore-data.py` 8 項一致性檢查（Step 12）

**不要再做的事**（過去 anti-pattern）：

- ❌ harvest 後手寫 knowledge/\*.md sporeLinks（會被 Step 13 覆蓋）
- ❌ harvest 拆 multi-commit 跨多檔案寫（atomic batch log = single commit）
- ⚠️ harvest 後手寫 SPORE-LOG.md 成效追蹤 narrative：仍 OK 但 optional（不再是 primary 寫入點，generator 已能從 batch body 算）

完整重構脈絡：[reports/spore-ssot-pipeline-cleanup-2026-05-08.md](../../reports/spore-ssot-pipeline-cleanup-2026-05-08.md)

---

## 核心哲學

**孢子上線不是終點，是反饋迴圈的起點。**

Taiwan.md 的進化動力有兩層：

1. **作者層的進化**：REWRITE-PIPELINE + SPORE-PIPELINE 讓作者寫得愈來愈好
2. **讀者層的進化**：HARVEST-PIPELINE（本檔）讓**讀者的聲音回到文章本體**，文章持續成為「作者 + 讀者」的共寫物

沒有這層收割，作者只會反覆播撒自己的盲點。讀者看到錯誤、補充、共鳴、質疑——這些訊號如果沒有 pipeline 接住，就散掉了。

**核心判準（觀察者 2026-04-18 δ-late 訂定）**：

> **「讀者的聲音要歸納進去文章的本體。」**
>
> 不是只堆 frontmatter perspectives（那是檔案層），是**讓文章的 prose 跟著讀者的介入而進化**——
> 事實錯誤要修、擴寫補充要納入、質疑要被承認、共鳴要被可見化。

**另一條鐵律**（同日同觀察者訂定）：

> **「如果他有提任何建議或是在勘誤的話，我們要妥善深讀研究、修改文章，並且回覆他們的留言。」**

→ 勘誤 / 建議 = 必須**驗證 + 修文章 + 回覆**三步齊全，不可只挑一兩步做。

---

## 觸發時機（MANDATORY — 孢子發布後 7 天的收割窗口）

> 孢子發布後是讀者回聲最密集的時期。**7 天內每天至少跑一次本 pipeline**。
> 7 天後讀者留言密度驟降（演算法推送衰減 + 話題週期）→ 改為 milestone harvest。

### 主排程

| 時機           | 頻率              | 動作                                                 |
| -------------- | ----------------- | ---------------------------------------------------- |
| **D+1 到 D+7** | **每天至少 1 次** | 完整走 Step 1-7                                      |
| **D+14**       | 1 次              | milestone：Step 1+5+7（只抓新留言歸檔）              |
| **D+30**       | 1 次              | milestone：Step 1+5+7（同 + SPORE-LOG 30d 指標回填） |
| **D+30 之後**  | 觀察者 ad-hoc     | 只有觀察者手動觸發才跑                               |

### Cron 建議設定（半自動）

```cron
# 每天 20:00 Asia/Taipei，檢查 SPORE-LOG 最近 7 天有無新孢子，
# 對每則 spore.harvest_status < D+7 跑本 pipeline
0 20 * * * cd ~/taiwan-md && python3 scripts/tools/run-spore-harvest.py --window 7d
```

### 觀察者手動觸發

任何時候觀察者說「去抓 XX 文章 threads 留言」→ 立刻跑完整 pipeline（本次草東孢子 #33 即為此 pattern 首例）。

---

## 前置：發佈時機 + Decision Gates

> 2026-05-08 從 SPORE-PIPELINE Step 4.5 整段吸收（per Direction A 拆檔，避免 SPORE↔HARVEST 違反 §指標 over 複寫）。
>
> 這段是 harvest cadence 的決策層 — 發佈前的 hook tier 自檢 + 發佈後的 d+0/+1/+7/+30 timeline + d+0 6h decision gate + re-hook 救援機制。
>
> 對應 [DNA #15 第 9 次驗證](../semiont/DNA.md)：「被允許做」→「被期待做」的躍遷靠 canonical SOP，不靠 memory 自律。Canonical 升級從 case-by-case policy 變成 pipeline 基礎建設的結構性節點。

### Hook tier hierarchy（發佈前自檢，v3.1 升級為 4-tier）

> 2026-04-18 ζ 首次定義 3-tier。**2026-05-08 從 9 spore batch harvest 數據（objective-khorana batch）進化為 4-tier**：實戰證明 Tier 1b 不限「人物」題材（黑冠麻鷺自然議題同樣 65K viral），且原 3-tier 漏掉「中段」「低段」分布。

| Tier | 類型            | 開場特徵                    | D+7 reach 預期  | 案例                                               |
| ---- | --------------- | --------------------------- | --------------- | -------------------------------------------------- |
| 1a   | 知名度槓桿      | 已知品牌/人物 + 當下事件    | 100K-180K viral | #29 李洋 180K / #25 安溥 120K / #57 賈永婕         |
| 1b   | 具體性槓桿      | **具體 anchor + 反差 hook** | 10K-65K         | #45 壞特 65K / #53 黑冠麻鷺 65K / #47 沈伯洋 12.7K |
| 中段 | 結構性題目      | 政治/制度 + 問題入口        | 2K-17K          | #51 邦交國 17.3K / #41 認知作戰 2.2K               |
| 低段 | 文化人物 / 冷門 | 抽象 framing + 知名度低     | 0.5K-1.5K       | #43 田馥甄 0.8K / #55 海底電纜 1.3K                |

**v3.1 規則更新**：

- **Tier 1b 不限人物題材**（2026-05-08 黑冠麻鷺證明）：自然 / 物件 / 抽象議題只要有「具體 anchor + 反差 hook」都能 65K viral
- 「相對冷門人物」→ hook 必須走 Tier 1b（具體性槓桿）
- 「已知人物」→ Tier 1a 優先
- **結構性題目（政治/外交/制度/經濟）= 中段 default**：reach 上限 ~17K，但 comments / engagement quality 高（爭議性激活）。要進階提升 → 強化 Hook Blueprint 讀者物件
- **低段警報**：D+7 < 1K = 系統性 underperformance pattern，下次選同類題材前考慮：
  - 是不是 Tier 3 意境型（已 deprecated，不該用）？
  - 是不是缺 hook 具體性？
  - 還是題材本身 niche audience（接受 reach 但確保 engagement rate ≥ 10%）？
- **Tier 3 意境型已 deprecated**（不在表內）：原寫「2009 年一個鋼琴手⋯⋯」這類時空 framing 先行，主角延後 → d+0 6h < 500，永遠不該用

對應 [MANIFESTO §我怎麼說話](../semiont/MANIFESTO.md#我怎麼說話)「開場要有一個具體的人、一個具體的時刻」的量化證明（229x / 48x / 83x）。

實戰數據詳見 [SPORE-HARVESTS/batch-2026-05-03-objective-khorana-9-spores.md](SPORE-HARVESTS/batch-2026-05-03-objective-khorana-9-spores.md) §Tier 比較表。

### d+0/+1/+7/+30 cadence

發佈後主動 harvest：

| 時間點 | 動作                                                                |
| ------ | ------------------------------------------------------------------- |
| d+0 1h | Chrome MCP 首次 harvest → SPORE-LOG 追蹤表新增 row                  |
| d+0 3h | 第二次 harvest → 更新「最後 harvest」時間戳                         |
| d+0 6h | **Decision gate**：views < 500 → 觸發 re-hook opportunity（見下方） |
| d+1    | d+1 harvest → 更新 trajectory                                       |
| d+7    | d+7 harvest（主要 KPI）→ 成效追蹤表填 7d 觸及 / 7d 互動             |
| d+30   | d+30 harvest（長尾確認）                                            |

**AI 自主邊界**（[DNA #26 v2](../semiont/DNA.md)）：所有 harvest 皆 AI 自主用 Chrome MCP 跑；re-hook reply **必須 human post**（AI 準備 draft，human 確認並發）。

### d+0 6h Decision Gate 救援（Re-hook opportunity）

**不是刪除重發，是補強**。如果 d+0 6h < 500 views：

1. 診斷 hook tier：是 Tier 3 意境型嗎？
2. 從原文章挑出最強的「具體人物 + 具體畫面」
3. AI 寫 150 字 reply 草稿用 Tier 1b 具體性槓桿
4. **handoff human**：「建議在主貼下面發這則 reply: [草稿]」
5. Human 確認 + post → 重新 seed 觸及

**案例**：#31 Cicada d+0 6h 207 views → re-hook 抽出「江致潔在蘭嶼海底聽到的那句話：你能控制的只有你的呼吸」+「吉他手巽洋說『像紀錄片』」作為 reply。

### Harvest 數字格式鐵律（v2.8）

> 2026-05-03 objective-khorana day 2 — generator parser regression 揭露格式鐵律。

寫進 SPORE-LOG「最後 harvest」column 的 views 數字**必須是 generator parser 認得的格式**：

| 格式           | 範例                                            | parser 支援   |
| -------------- | ----------------------------------------------- | ------------- |
| 完整數字含逗號 | `**65,400 views**`                              | ✅            |
| 完整數字無逗號 | `65000 views`                                   | ✅            |
| K suffix       | `**65.4K views**` / `1.8K views` / `180K views` | ✅（v2.8 修） |
| M suffix       | `2.5M views`                                    | ✅（v2.8 修） |

**修補背景**：generator regex `[\d,]+\s+views?` 不認 K/M suffix（`.4K` 打斷 `[\d,]+`）。
sleepy-colden ι session 多個 backfill 寫成「65.4K views」（為 readability）→ generator 抓不到 → dashboard 顯示舊 `views_latest=null`。
patch parser to handle 4 種格式 (commit `6a7f61cb`、PR #795)。

**最 safe**：harvest 寫整數 + 逗號（`65,400 views`）— 兩種 parser 都能抓。

### Validation 必跑（v2.8）

每次 harvest backfill SPORE-LOG 後**必跑**：

```bash
python3 scripts/tools/validate-spore-data.py
```

檢查 4 維度：

1. **Parser regression**：8 cases K/M/comma 格式 round-trip
2. **Dashboard freshness**：`dashboard-spores.json` mtime ≥ `SPORE-LOG.md` mtime
3. **Harvest parseability**：所有「最後 harvest」column 含「views」字串都能被 parser 抓到值
4. **Dashboard <-> SPORE-LOG consistency**：`dashboard-spores.json.recent[].views_latest` 對得上 SPORE-LOG 解析值

任一 ❌ → 修。任一 ⚠️（warning）→ 評估。`--strict` mode 把 warnings 變 errors（CI 用）。

已整合進 `refresh-data.sh` Step 5.5 — 每次 refresh 自動跑。

### Dashboard rendering 視覺驗證（v2.8）

每次大規模 harvest backfill 後**建議**開 dev server 視覺驗證：

```bash
npm run dev &
# Wait for ready
curl -sf http://localhost:4321/api/dashboard-spores.json > /dev/null

# Playwright screenshot dashboard #spores section
node -e "
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1400 } });
  await p.goto('http://localhost:4321/dashboard', { waitUntil: 'networkidle' });
  await p.evaluate(() => document.getElementById('spores-top')?.scrollIntoView({ block: 'center' }));
  await p.waitForTimeout(2000);
  await (await p.\$('#spores-top'))?.screenshot({ path: '/tmp/dashboard-spores-top.png' });
  console.log('✅ Screenshot: /tmp/dashboard-spores-top.png');
  await b.close();
})();
"
```

驗證點：

- topPerformers 顯示最新 ⭐ 高峰 / 🔥 平台最強 / 🌋 史上最強 badges 正確
- views 數字反映 latest harvest（不是 stale）
- 「資料更新」timestamp 是「N 分鐘前」（今天）

**為什麼視覺驗證**：dashboard JSON 對 ≠ UI 對。frontend template 也可能 cap rendering（例 slice(0, N)）— 改 generator 後要 verify template 也更新。

### 文章頁 SporeFootprint 渲染驗證（v2.9）

> 2026-05-03 objective-khorana day 2 evening — 哲宇發現「為什麼只有安溥那篇有顯示」孢子連結。3 篇 sporeLinks 都寫對的文章（黑冠麻鷺/沈伯洋/賈永婕）silently 不渲染。
>
> **單測 `sporeLinks` 寫入 ≠ reader 看得到。**

`SporeFootprint.astro` 渲染依賴 `[category]/[slug].astro` template 在「延伸閱讀」標題前 split content。template 的 `splitMarkers` 必須同時支援兩種 canonical-accepted 格式：

| 格式                              | 範例         | 文章數              |
| --------------------------------- | ------------ | ------------------- |
| `## 延伸閱讀` (h2)                | 95 articles  | ✅ original support |
| `**延伸閱讀**：` (bold paragraph) | 121 articles | ✅ v2.9 修補後      |

**Patch in `src/pages/[category]/[slug].astro` lines 313-338**：

```javascript
const splitMarkers = [
  '<h2>延伸閱讀</h2>',
  '<h2>Further Reading</h2>',
  '<h2>延伸閱讀<',
  '<p><strong>延伸閱讀</strong>', // v2.9 加
  '<p><strong>Further Reading</strong>', // v2.9 加
];
// ...
// Final fallback: any <p><strong> 含「延伸閱讀」(handle whitespace)
if (splitIndex === -1) {
  const pMatch = fullHtml.match(/<p>\s*<strong>\s*延伸閱讀/);
  if (pMatch && pMatch.index !== undefined) splitIndex = pMatch.index;
}
```

**Visual verify SOP**（每次 sporeLinks update 後）：

```bash
# 1. Sync knowledge → src/content (CRITICAL — frontmatter 改在 knowledge/，astro 讀的是 src/content/)
bash scripts/core/sync.sh

# 2. Restart dev server (frontmatter 變更 vite HMR 不一定 pick up)
NODE_OPTIONS='--max-old-space-size=8192' npm run dev &

# 3. Wait + curl test
until curl -sf http://localhost:4321/ >/dev/null; do sleep 1; done
for slug in 賈永婕 黑冠麻鷺 沈伯洋; do
  count=$(curl -s "http://localhost:4321/people/$slug" 2>/dev/null | grep -c "SporeFootprint")
  [ "$slug" = "黑冠麻鷺" ] && url="http://localhost:4321/nature/$slug" && count=$(curl -s "$url" | grep -c "SporeFootprint")
  echo "$slug: SporeFootprint=$count"  # 期待 ≥ 1
done
```

**任一文章 SporeFootprint=0** → 檢查：

1. 該篇 frontmatter 有 `sporeLinks:` 嗎？(grep `^sporeLinks:` knowledge/<cat>/<slug>.md)
2. 該篇 `延伸閱讀` 是哪種格式？bold paragraph or h2 or 完全沒有？
3. `bash scripts/core/sync.sh` 跑了嗎？(src/content/ 是否同步)
4. dev server restart 了嗎？(content sync 後 vite HMR 不一定即時生效)

**為什麼這條鐵律**：rich-text SSOT 的 silent drift 第二次驗證。
v2.8 是 generator parser silent fail（K/M suffix），v2.9 是 template splitMarkers silent fail（bold format）。
兩次都是「reader 完全看不到 → 維護者 完全沒感」的 invisible bug，必須靠視覺驗證 + 多文章 sweep 才會 catch。

### Chrome MCP exact harvest workflow（v2.9）

**Chrome MCP vs WebFetch trade-off**：

| 維度                               | Chrome MCP exact                                                        | WebFetch K rounded          |
| ---------------------------------- | ----------------------------------------------------------------------- | --------------------------- |
| 速度                               | 慢（5-10s/spore，需 navigate+wait+scroll+screenshot）                   | 快（HTTP 直拉）             |
| Likes/comments/reposts/shares 精度 | exact（例 1,027 vs 1K）                                                 | K rounded（loss of detail） |
| Views 精度                         | K rounded（Threads UI 限制，例「1.2 萬瀏覽」）；header full number 偶見 | K rounded                   |
| Reply context 可見                 | ✅ 可看 reply 確認 hallucination audit                                  | ❌ 看不到                   |
| Threads UI badge / verified status | ✅ 可看                                                                 | ❌                          |
| X (Twitter) 支援                   | ✅ 可 navigate                                                          | ❌ 402 Forbidden            |
| 需要 active browser session        | ✅ 需 `select_browser` paired                                           | ❌                          |
| Batch parallel                     | ❌（sequential per spore）                                              | ✅                          |

**選用規則**：

- 第一次 batch harvest → WebFetch（快，K rounded 夠粗略 trends）
- 後續 backfill / 精準對比 → Chrome MCP（exact numbers，看 reply context）
- X 平台所有 harvest → Chrome MCP only（WebFetch 不支援）

**Chrome MCP harvest pattern**：

```bash
# Per spore
mcp__Claude_in_Chrome__navigate https://www.threads.com/@taiwandotmd/post/{shortcode}
mcp__Claude_in_Chrome__computer wait 4
mcp__Claude_in_Chrome__computer scroll down 5 ticks @ (700, 400)
mcp__Claude_in_Chrome__computer wait 1
mcp__Claude_in_Chrome__computer screenshot
# 抓 likes (♥) / comments (💬) / reposts (🔁) / shares (📮) 4 個 numbers
# views 在 header sub-text，K rounded
```

**Chrome MCP `select_browser` 第一次連結**：

- 哲宇要先在 Chrome 安裝 Claude in Chrome extension
- Pair 後 `mcp__Claude_in_Chrome__list_connected_browsers` 應該回傳 deviceId
- 之後 session 重啟仍可用該 deviceId 直接 `select_browser`（pairing 持久化）

### Harvest 資料流總覽

```
Chrome MCP harvest
  → SPORE-LOG.md 成效追蹤表（7d 觸及 / 互動 / 最後 harvest timestamp）
  → 源文章 frontmatter sporeLinks（每次 harvest 同步最新 views/likes/reposts/comments/shares）
  → dashboard-spores.json （refresh-data 觸發 generate-dashboard-spores.py）
  → Dashboard 成效排行 / GA 放大倍數 section
  → 新洞察 → LESSONS-INBOX
```

雙寫機制詳見下方 [Step 1.5](#step-15-雙寫dual-write--v13-新增2026-04-23-δ-觀察者指正)。

### Batch Harvest 模式（v1.2 新增 — 2026-04-18 δ-late 首例驗證後正式文件化）

**適用條件**：

- Dashboard OVERDUE ≥ 3 筆 → 優先跑 batch，而非逐筆 daily
- 同平台 + 預期低留言密度（歷史舊孢子 D+10+）
- 觀察者 ad-hoc 觸發「回填一批舊孢子」

**Batch 執行流程**（跟單筆 pipeline 共用 Step 1-9，但合併為單一 harvest log）：

```
1. 列出目標 URL（從 Dashboard `backfillWarnings` 或 SPORE-LOG grep）
2. Chrome MCP 單一 tab 連續 navigate 每個 URL
   - 每筆 ~15s（navigate 5s + JS extract 10s）
   - N 筆 = ~N × 15s + 1-2 分鐘額外（分析 + 歸檔）
3. 記錄每筆的 views / comments，一次性整理成表格
4. 分類 + 事實驗證（Step 2-3）— 有留言的才進，低留言批次通常跳過
5. 寫單一 batch log：`docs/factory/SPORE-HARVESTS/batch-YYYY-MM-DD-N-spores.md`
6. 同時更新 SPORE-LOG 成效追蹤表（N 列一次 commit）
7. Pattern 歸納（Step 9）— batch 的特殊價值：可做跨筆比較
```

**Batch log 特殊欄位**（跟單筆 log schema 的差異）：

```yaml
---
spores: '#N, #M, ...' # 多筆逗號分隔
harvest_date: YYYY-MM-DD HH:MM
harvest_window_day: 'mixed (D+X to D+Y)' # 不同筆跨度
batch_reason: 為什麼合併（e.g. OVERDUE + 同平台 + 低留言預期）
reply_count: total # 加總
---
```

**跨筆比較機制**（batch 獨有）：

batch 跑完要做的「Pattern 歸納」比單筆深：

1. **平台表現差**：同批次內 Threads vs X 觸及 / 互動率比較
2. **模板表現差**：B 冷知識型 vs A 人物型 vs D 時間軸型平均 views
3. **時間軸效應**：早期（D+14）vs 近期（D+7）孢子互動密度變化
4. **系統性教訓**：批次才看得到的 pattern（e.g.「早期無圖孢子零留言」）

**首例驗證**（2026-04-18 δ-late）：

- 6 筆同平台 OVERDUE（Threads，D+10-D+14）
- 總時長 ~5 分鐘
- 產出：[SPORE-HARVESTS/batch-2026-04-18-6-spores.md](SPORE-HARVESTS/batch-2026-04-18-6-spores.md)
- 3 個 pattern 觀察（帳號密度 / 模板差 / 平台差）
- 1 條 LESSONS-INBOX 新教訓（SPORE-LOG URL 硬鐵律）

**Batch vs 單筆的選擇判準**：

| 情境                            | 選擇                                   |
| ------------------------------- | -------------------------------------- |
| OVERDUE 1-2 筆，最近 7 天內     | 單筆（Step 1-9 完整）                  |
| OVERDUE ≥ 3 筆 + 同平台         | Batch                                  |
| 剛發新孢子 D+0-D+3              | 單筆（潛在高留言 → 細緻處理）          |
| 單筆孢子互動爆量（views ≥ 50K） | 單筆 + 加速 harvest（D+0 + D+1 + D+3） |
| 歷史孢子整理（> 30 天）         | Batch                                  |

---

## Step 1: COLLECT 抓留言

### 做什麼

對每則發布的孢子 URL，抓取**所有留言**（含 reply-of-reply 多層）。

### 工具選擇（遞進）

| 工具                                     | 適用       | 現況                                 |
| ---------------------------------------- | ---------- | ------------------------------------ |
| **WebFetch**                             | 抓靜態頁面 | ❌ Threads/X JS-heavy 不 render 留言 |
| **Chrome MCP**（navigate + read_page）   | 互動式抓取 | ✅ 現行 MVP 手段                     |
| **scripts/tools/fetch-spore-replies.py** | 半自動化   | ⚠️ 待建置（Phase 2 roadmap）         |
| **Threads Graph API / X API v2**         | 全自動     | ⚠️ 等 API 成熟 / 付費 tier           |

### Chrome MCP MVP 執行（現行做法）

```
1. tabs_context_mcp(createIfEmpty=true) 取得 tabId
2. navigate(tabId, threads/x URL)
3. read_page(tabId, filter="all", max_chars=80000) 取 a11y tree
4. 從 a11y tree 擷取：
   - 每則留言的 author（link ref + username）
   - 完整文字原文（generic ref）
   - 時間戳
   - 多層回覆結構
```

### 輸出 schema（每則留言）

```yaml
author: '@username'
text: '原文逐字，不翻譯不摘要'
timestamp: '2026-04-18 19:25 GMT+8'
url: 'https://www.threads.com/@username/post/XXX'
reply_depth: 0 # 0 = 直接回覆貼文，1 = 回覆某留言，...
raw_images: # 若留言含圖
  - '截圖描述'
```

### 鐵律

- **逐字抓取，禁止翻譯 / 摘要 / 改寫**（對應 EDITORIAL §挖引語制度 + MANIFESTO §第 5 條紀實原則）
- 時間戳用留言頁面顯示的絕對時間，不用「3 小時前」這類相對時間

### Step 1 同時收的指標（metrics snapshot）

a11y tree 同一次讀取裡會帶出貼文自身的 `views / likes / reposts / comments / shares`（X 的 bookmarks 寫入 `shares` 欄）。**留言跟指標必須同一次 snapshot 抓完**，不要分兩次（時間不一致會導致雙寫失真）。

Step 1 輸出除了留言 schema，還要留一份：

```yaml
post_metrics:
  platform: threads # 或 x
  url: '<canonical URL>'
  snapshot_at: '2026-04-DD HH:MM +0800 (session)'
  views: 0
  likes: 0
  reposts: 0
  comments: 0
  shares: 0
```

這份 snapshot **直接餵 Step 1.5 雙寫**。

---

## Step 1.5: 雙寫（DUAL WRITE — v1.3 新增，2026-04-23 δ 觀察者指正）

> 每次 harvest（無論 D+0 / D+1 / D+7 / D+30）**都要雙寫兩處**，不是只寫 SPORE-LOG。

### 為什麼

SPORE-LOG.md 是**工廠層**（累積曲線、session 備註、診斷文字），讀者不會讀。讀者看到的是文章頁底「這篇文章去過的地方」section，**那個 section 讀的是文章 frontmatter `sporeLinks`**（由 `src/components/SporeFootprint.astro` 渲染）。

只寫 SPORE-LOG = 工廠內部數據 up-to-date，但讀者看到的是過期（或不存在）的快照。必須雙寫，數字才跨層一致。

### 寫什麼

| 目標                                                                 | 結構                                                                                           | 內容                                                                          |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **SPORE-LOG.md 成效追蹤表**                                          | 自由文字 row（包含 D+0 / D+1 / D+7 切片、engagement rate、session 時間戳、跨筆比較、留言質性） | 累積（每次 harvest 追加到「最後 harvest」欄，不覆寫歷史切片）                 |
| **src/content/{lang}/{category}/{slug}.md frontmatter `sporeLinks`** | 純 YAML 物件（platform / date / url / views / likes / reposts / comments / shares）            | **覆寫最新快照**（只保留當下數字，不累積 D+0/D+1/D+7 歷史，讀者不需要看切片） |

### 源文章定位規則

1. 從 SPORE-LOG row 看 slug（例 `認知作戰`）
2. `src/content/zh-TW/{category}/{slug}.md`（category 從文章 frontmatter `category` 小寫得，例 Society → society）
3. 若該文章沒 `sporeLinks` key → 新建 array
4. 若有同 `platform` + 同 `date` row → **覆寫**（不新增）；若是不同日期（罕見，例如重發）→ 新增 row

### Schema（canonical）

```yaml
sporeLinks:
  - platform: 'threads' # 'threads' | 'x'
    date: '2026-04-DD' # 發佈日（非 harvest 日）
    url: '<乾淨化 canonical URL，已剝 query>'
    views: 0
    likes: 0
    reposts: 0
    comments: 0
    shares: 0 # X 為 bookmarks 數、Threads 為 shares 數
```

canonical 由 `src/components/SporeFootprint.astro` interface `SporeLink` 定義。範例 article：`src/content/zh-TW/music/張懸與安溥.md`、`src/content/zh-TW/people/李洋.md`。

### 鐵律

- **每次 harvest 都要雙寫**。不是可選、不是 milestone 才寫
- **數字要一致**：SPORE-LOG 的 D+N 切片裡最新那個 = 文章 frontmatter 當下快照
- 英文 / 日文 / 韓文翻譯若存在，**每個翻譯檔案都要雙寫**（每個語言版本 frontmatter 各自獨立）
- 初次發佈（Step 0 尚未 harvest）→ 數字全部 0，但 row 必須存在，等 D+0 首 harvest 回填（對應 SPORE-PIPELINE Step 4 §發文步驟 step 6）

---

## Step 2: CATEGORIZE 分類（8 類 dimension）

讀每則留言，貼上 dimension 標籤。這決定了後續處理路徑。

| #   | Dimension               | 定義                                                   | 下一步                                  |
| --- | ----------------------- | ------------------------------------------------------ | --------------------------------------- |
| 1   | **更正 correction**     | 指出文章事實錯誤（日期、名字、數字、引語）             | **→ Step 3a 跨源驗證（critical path）** |
| 2   | **建議 suggestion**     | 建議補什麼、改什麼敘事角度                             | **→ Step 3b 深讀研究**                  |
| 3   | **擴寫 enrichment**     | 補充一個典故 / 延伸詮釋 / 新角度（非事實層，是語意層） | **→ Step 4 整合入文章本體**             |
| 4   | **共鳴 resonance**      | 情感回響、個人經驗、佩服、支持等                       | **→ Step 5 perspectives frontmatter**   |
| 5   | **AI 書寫質疑 AI-meta** | 對「AI 寫真人故事」這件事本身的態度 / tag 當事人       | **→ Step 6 人類判斷**                   |
| 6   | **擴散 sharing**        | tag 朋友、推薦                                         | **→ Step 5 perspectives（低優先）**     |
| 7   | **情感 emotional**      | 跟主題主人的情感投射（如讀者本身與該人物有關聯）       | **→ Step 5 perspectives**               |
| 8   | **攻擊 attack / 敵意**  | 對 Taiwan.md 或作者身份的直接攻擊                      | **→ Step 6 人類處理（per DNA #26）**    |

### 分類自檢

一則留言可以有**多個 dimension**（例：更正 + 擴寫）。但主 dimension 只能選一個，決定處理路徑。

---

## Step 3: 事實驗證（更正 / 建議的強制關卡）

### 3a. 更正 correction — 跨源驗證

**鐵律：觀察者訂定「妥善深讀研究」= 不准只憑讀者一句話就改。**

流程：

1. **跨 3+ 獨立來源驗證讀者指出的事實**（同 SPORE-PIPELINE Step 2.6 跨源驗證原則）
2. 若讀者對 → 進 Step 4 修文章
3. 若讀者錯 → 進 Step 6 回覆「感謝提出，但驗證後發現...」
4. 若部分對 → 文章補「有兩種說法」並附 perspective

### 3b. 建議 / 擴寫 — 深讀研究

對讀者提的角度 / 典故 / 觀點深讀：

1. WebSearch 2-3 次查該角度的出處與普遍性
2. 讀 Taiwan.md 既有研究報告有無涉及
3. 判斷：
   - 事實層可驗證 + 增加文章深度 → 進 Step 4 納入本體
   - 詮釋層但有意思 → 進 Step 5 perspective 歸檔
   - 已有 / 不相關 → 進 Step 6 回覆致意

### 3 的時限

勘誤類在**收到留言 24 小時內**完成驗證（作為信任信號：讀者很快看到文章有更新）。
建議類可延到 72 小時內。

---

## Step 4: 整合入文章本體（本 pipeline 的核心規則）

> **觀察者鐵律：「讀者的聲音要歸納進去文章的本體。」**
> 這步是整個 HARVEST-PIPELINE 的精神所在。沒做這步 = pipeline 失敗。

### 判準：「這條 voice 如果讀者三年後來讀，還會覺得是文章的一部分嗎？」

- **Yes** → 進 body（prose 或 策展人筆記 或 pull quote）
- **No** → 只進 Step 5 frontmatter

### 整合形式（依 voice 類型）

#### 4a. 事實錯誤（更正）

- **直接修 prose 本體**（不是只加附註）
- 若改動大 / 涉及判斷 → footnote 可選加一行「（經讀者 @X 指正，原誤 XXX）」
- 原 footnote 描述若有涉及錯誤事實，同步修

**範例（本次草東孢子 #33 首例執行）**：

```
原：「原本的貝斯手黃世暄宣布無限期暫停幕前活動」
↓ @ste_ven_1487 指正 + 維基百科驗證
改：「原本的貝斯手楊世暄宣布無限期暫停幕前活動」
（全文 3 處 + tags + footnote[^2] 描述全部同步）
```

#### 4b. 擴寫 / 補充（enrichment）

- 把讀者提的角度融進 prose 或 策展人筆記
- 若讀者的表述本身很精采 → 提升為 pull quote blockquote

**範例（預期處理）**：

```
@r3dlin「破瓦相合，雖聚而不齊」
↓ 納入本體方式：
《瓦合》段落加 pull quote：
> **✦** 讀者 @r3dlin 補：「破瓦相合，雖聚而不齊。」
  — 這是典故更完整的層次，跟草東七年後回來的處境互文。
```

**但注意**：不是每則擴寫都要成 pull quote。判斷條件：

- 原文具典故延伸 / 精準詩意 / 新視角 → pull quote
- 只是附和或一般補充 → 融進 prose

#### 4c. AI 書寫質疑（AI-meta）

這類留言通常不進 body（除非質疑本身揭露了重要 ethics），而是**進 MANIFESTO 或 LESSONS-INBOX**（meta 層），並由人類 reply。

### 4 的禁忌

- ❌ **不要用「讀者 @X 說」作為推諉**：寫進 body 的內容要「吃下去消化」，不是「掛個牌說不是我說的」
- ❌ **不要為湊 perspectives 而強加內容**：SSODT 原則是真相的多面，不是留言的堆積
- ❌ **不要修過頭**：一則事實錯誤的修正不該觸發整段 rewrite

---

## Step 5: Perspectives frontmatter（v1.1 規則校準）

> **觀察者 2026-04-18 δ-late 校準（v1.1）**：
> **「勘誤類型不收錄到 Perspectives。Perspectives 是各種針對主題的想法 / 看法 / 聲音，勘誤就是修改處理。」**
>
> 這把 perspectives 的語意清楚定義為**主題性觀點**，不是 raw 留言存檔。

### 寫入規則（v1.1 簡化）

| Dimension           | 進 perspectives？ | 理由                                             |
| ------------------- | ----------------- | ------------------------------------------------ |
| **更正 correction** | ❌ **不進**       | 直接 Step 4 修文章本體 + Step 6 回覆，不重複歸檔 |
| **建議 suggestion** | ⚠️ 酌情           | 被採納入 body → 進；未採納但想法值得保留 → 進    |
| **擴寫 enrichment** | ✅ 進             | 主題性觀點 / 典故延伸                            |
| **共鳴 resonance**  | ✅ 進             | 情感回響、個人經驗                               |
| **AI 書寫質疑**     | ✅ 進             | Meta 觀點，有主題性                              |
| **擴散 sharing**    | ✅ 進             | tag 推薦也表達對主題的態度                       |
| **情感 emotional**  | ✅ 進             | 跟主題人物的情感投射                             |
| **攻擊**            | ❌ **不進**       | 非主題觀點，另外處理                             |

### Schema（保持 5 欄）

```yaml
perspectives:
  - author: '@username'
    text: '原文逐字'
    dimension: '建議 / 擴寫 / 共鳴 / AI 書寫質疑 / 擴散 / 情感'
    source: 'Threads 孢子 #N 留言 YYYY-MM-DD HH:MM'
    action: '已納入文 / 僅歸檔 / 待觀察 / 已回覆'
```

**核心語意**：perspectives 是**讀者對文章主題的聲音集**（跟李洋 pattern 的 SSODT 精神一致），不是留言 raw dump。勘誤是文章本體的修改動作，由 commit message + Step 4 修文體現，不需要額外 frontmatter slot。

### 擴展欄位

- **source**：平台 + 孢子編號 + 時間戳（provenance）
- **action**：文章本體是否已接住（integration status）

這 5 欄合起來讓未來任何 session 甦醒都能從 frontmatter 直接看到「這篇文章經歷過哪些讀者**觀點**介入、哪些已處理」。

---

## Step 6: 回覆留言（人類主責）

> **DNA #26 規範**：攻擊 AI 本身、涉及 human 信任修復的留言，**只有 human-component 能回應**。AI 不直接發帖。

### AI 可做的

- **準備 draft reply 文字**（繁體中文、禮貌、具體）
- 標記哪則「必回」、「可選回」、「不必回」
- 若 correction 已修 → draft 強調「感謝 + 已修 + commit URL」，公開承認錯誤 = 信任信號

### 觀察者做的

- Review AI draft reply
- 決定回 / 不回 / 改寫
- 人類貼到 Threads / X

### 回覆判準

| Dimension      | 必回？   | Draft 調性                     |
| -------------- | -------- | ------------------------------ |
| 更正（讀者對） | **必回** | 感謝 + 承認 + 已修 commit URL  |
| 更正（讀者錯） | **必回** | 感謝 + 驗證結果 + 為何保留原文 |
| 建議（採納）   | **必回** | 感謝 + 納入方式                |
| 建議（未採納） | **必回** | 感謝 + 為何不採納              |
| 擴寫           | **必回** | 感謝 + 納入方式 / 按讚         |
| 共鳴           | 可選     | 按讚即可；若深度共鳴可短回     |
| AI 書寫質疑    | 人類主責 | 按場景判斷                     |
| 擴散           | 不必回   | 按讚                           |
| 情感           | 可選     | 視內容                         |
| 攻擊           | 人類判斷 | 通常 DNA #26 建議延後或不回    |

### 回覆時限

- 更正 / 建議：**24 小時內**（太晚回會失去信任修復的時機）
- 其他：7 天窗口內即可

---

## Step 7: Commit 節奏

### 即時 commit（不打包）

- **事實錯誤修正**：收到 → 驗證 → 修文 → commit → push **在 24 小時內完成**
- Commit message 明載：「heal: XX.md 事實更正「舊 → 新」+ 孢子 #N 留言歸類」
- 7 天 harvest window 裡每個 commit 都是信任信號，愈頻繁 = 愈透明

### 可打包 commit

- 只歸檔 perspectives frontmatter（沒改 body）
- 多則共鳴留言一併 append
- 週末一次性打包即可

### Commit scope 規範

- 優先單 domain commit（避免 narrative scope warning）
- 若整合多面向（修文 + perspectives + LESSONS）→ cross-domain 聲明

---

## Step 8: Harvest Log（每次執行留痕）

每次跑本 pipeline 都要留 log 到：

```
docs/factory/SPORE-HARVESTS/{N}-{slug}-{date}.md
```

### Log Schema

```markdown
---
spore: '#N'
article: knowledge/People/XXX.md
harvest_date: YYYY-MM-DD HH:MM
harvest_window_day: D+N # 距孢子發布幾天
triggered_by: cron / observer / ad-hoc
reply_count: N
new_since_last_harvest: N
---

# Harvest #N — {孢子名}（D+X）

## 留言明細（Step 1 抓取結果）

...

## 分類結果（Step 2）

...

## 事實驗證結論（Step 3）

...

## 文章本體修改（Step 4）

commit: <hash>
改了什麼：...

## Perspectives 更新（Step 5）

新增 / 更新條目：...

## 回覆 draft（Step 6）

需人類動作：...

## 下次 harvest 建議時機

D+{N+1} / 觀察者 ad-hoc
```

Harvest log 建立 pipeline 的 audit trail + 未來分析素材（哪種孢子的留言 pattern 如何）。

---

## Step 9: Pipeline 本身的進化（每輪留教訓）

每跑完本 pipeline 一次，要問：

1. 這次抓留言有哪些新 pattern？（擴寫既有 dimension 表或新增）
2. 哪些自動化未做？（feed 進 Phase 2 roadmap）
3. 整合進 body 的判準是否清楚？（若糾結過多 → 補判準）

若有新教訓 → append [LESSONS-INBOX.md](../semiont/LESSONS-INBOX.md) §未消化清單。

---

## 跟既有 pipeline / 認知層的關係

| 文件                                                    | 關係                                                      |
| ------------------------------------------------------- | --------------------------------------------------------- |
| [SPORE-PIPELINE.md](SPORE-PIPELINE.md)                  | **上游**：管孢子誕生 + 發布（Step 0-2.7 + 3-4）           |
| **SPORE-HARVEST-PIPELINE.md（本檔）**                   | **下游**：管孢子發出後的讀者回聲收割                      |
| [SPORE-LOG.md](SPORE-LOG.md)                            | 孢子發布紀錄；未來擴 `harvest_status` 欄（D+N / retired） |
| [SPORE-BLUEPRINTS/](SPORE-BLUEPRINTS/)                  | 孢子事實藍圖（pre-publish）                               |
| **SPORE-HARVESTS/**（本檔建立的新目錄）                 | 孢子回聲 harvest log（post-publish）                      |
| [REWRITE-PIPELINE.md](../pipelines/REWRITE-PIPELINE.md) | 文章本體修改要遵循其 Stage 3 事實鐵三角自檢               |
| [EDITORIAL.md](../editorial/EDITORIAL.md)               | 勘誤時逐字引用規範                                        |
| [MANIFESTO §第 5 條](../semiont/MANIFESTO.md)           | 紀實不煽情原則 — 整合 voice 時不煽情消費                  |
| [DNA #26](../semiont/DNA.md)                            | 強孢子觀眾回饋人類不可取代性                              |
| [HEARTBEAT Beat 3b](../semiont/HEARTBEAT.md)            | 社群觸手掃描 — 觸發本 pipeline 的入口                     |

---

## 誕生事件

本 pipeline 誕生於 **2026-04-18 δ-late session**。

草東沒有派對孢子 #33（Threads 2026-04-18 15:59 發布）上線 3 小時，讀者 **@ste_ven_1487** 指出：「貝斯黃世暄是誰 不是楊世暄嗎」附維基百科截圖。事實驗證 → 讀者對 → 文章 3 處（tags + prose + footnote 描述）+ 研究報告 1 處 + mirror copy = 6 處「黃世暄」全部修正為「楊世暄」。

觀察者同日提出：

> 「把這整個文章吃回覆的流程整理成 pipeline，未來可以重複執行，並且在文章已經發佈孢子之後，這件事情要記得至少要在未來的一個星期內每天至少跑一次，我們持續進化這個流程。」
>
> 「重點就是讀者的聲音要歸納進去文章的本體。」
>
> 「如果他有提任何建議或是在勘誤的話，我們要妥善深讀研究、修改文章，並且回覆他們的留言。」

→ 本 pipeline 將上述三條觀察者指令正式儀器化（DNA #15「反覆浮現要儀器化」第 7 次驗證）。

### 首次執行紀錄

草東孢子 #33 harvest #1 將存於 [SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md](SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md)（本 pipeline 誕生的同時產出首例）。

---

## Phase 2 Roadmap（持續進化）

- [ ] `scripts/tools/fetch-spore-replies.py` 半自動抓留言（Chrome MCP 仍人在環，但結構化輸出）
- [ ] `scripts/tools/run-spore-harvest.py` 整合 fetch → categorize → harvest log
- [ ] Dashboard 新增「孢子 harvest 進度」子區塊（依附 Dashboard 孢子區計畫 Phase 2）
- [ ] SPORE-LOG 新增 `harvest_status` + `last_harvest_date` 欄位
- [ ] 自動化 D+1~D+7 每日 cron
- [ ] Threads Graph API 串接（等 Meta 穩定）
- [ ] Perspectives frontmatter schema 正式寫進 SUBCATEGORY / frontmatter lint

---

_v1.0 | 2026-04-18 δ-late — 觀察者觸發孢子 #33 @ste_ven_1487 事實更正事件誕生_
_定位：SPORE 產線的下游 — 孢子上線後 7 天的讀者聲音收割 + 整合回文章本體_
_執行責任：AI 主責 Step 1-5 + 7-8；人類主責 Step 6（回覆留言）_
_每次執行留 log 到 `docs/factory/SPORE-HARVESTS/{N}-{slug}-{date}.md`_
