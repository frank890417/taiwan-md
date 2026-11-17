---
title: 'SPORE-HARVEST-PIPELINE'
description: '孢子回聲收割產線 v3.0 audience flywheel — metrics + reply content + 5-bucket factual challenge classifier + reader-driven EVOLVE trigger + reply draft + observer-gate ship + Chrome MCP execCommand pattern。核心哲學：人本 + 正確性 + 正直 + 透明度 + 誠懇'
type: 'factory-canonical'
status: 'canonical'
current_version: 'v3.3'
last_updated: 2026-11-18
last_session: '2026-11-18-twmd-spore-harvest-am（直接 navigate 到 permalink 連兩班沒被轉址，放回第一順位，動態頁點進去留作備援）'
sister_docs:
  - 'SPORE-PIPELINE.md'
  - 'SPORE-WRITING.md'
  - 'SPORE-VERIFY.md'
  - 'SPORE-LOG.md'
upstream_canonical:
  - '../semiont/SENSES.md'
  - '../semiont/HEARTBEAT.md'
  - '../semiont/DNA.md'
---

# SPORE-HARVEST-PIPELINE.md — 孢子回聲收割產線 v2.0

> **第一性原理**：孢子上線不是終點，是反饋迴圈的起點。HARVEST 讓讀者的聲音回到文章本體，文章持續成為「作者 + 讀者」的共寫物。
>
> v2.0 設計理由：對齊 [REWRITE-PIPELINE v5.0](../pipelines/REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](../pipelines/MAINTAINER-PIPELINE.md) spine restoration。修補 v1.1 結構問題：(1) 缺 ASCII spine + atomic batch log SSOT；(2) Hard Gate 散在各 section；(3) Top 5 最常忘沒提取。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         SPORE-HARVEST-PIPELINE — 收割流程 D+1-D+7                        │
│                                                                          │
│   🧭 核心紀律                                                            │
│            ├── Atomic batch log SSOT（不拆 multi-commit 跨檔案寫）       │
│            ├── 自動化下游（generate-dashboard-spores.py / sync-links）   │
│            ├── 6h decision gate（views < 500 觸發 re-hook）              │
│            └── Reach × Accuracy（views ≥ 50K 觸發 retroactive audit）    │
│                                                                          │
│   📍 SSOT 寫入位置                                                       │
│            └── docs/factory/SPORE-HARVESTS/batch-{date}-{N}-spores.md    │
│              （frontmatter: spores plural list / harvest_date /          │
│               harvest_window_day / batch_reason / triggered_by / count） │
│                                                                          │
│   ──── D+1 → D+7 cadence ─────────────────────────────                  │
│                                                                          │
│   Step 1: D+1 acute（6h decision gate）                                  │
│            ├── Chrome MCP harvest views / likes / replies                │
│            ├── views < 500 → 觸發 re-hook decision                       │
│            └── views ≥ 500 → 進 Step 2 D+3                               │
│                                                                          │
│   Step 2: D+3 trend ──→ 中段觀察                                         │
│            ├── 互動趨勢（線性成長 / 衰退 / 高鐵型長尾）                  │
│            └── reach 50K 累積 → Step 4 retroactive audit                 │
│                                                                          │
│   Step 3: D+7 finalize ──→ SPORE-LOG 7d 指標回填                         │
│            └── 7d_views / 7d_likes / 7d_engagement / amplification ratio │
│                                                                          │
│   Step 4: Reach × Accuracy trigger ──→ retroactive FACTCHECK             │
│            └── views ≥ 50K spawn FACTCHECK Quick Mode 驗 3-5 atom        │
│                                                                          │
│   Step 5: Atomic batch log commit ──→ HARVESTS/batch-{date}-{N}.md       │
│            └── 一個 commit 寫一個 batch log，不跨檔案多 commit            │
│                                                                          │
│   ✅ Harvest cycle complete → 下游 generator 自動算 dashboard            │
│                                                                          │
│   ──── 跨 pipeline boundary ──────────────────────────                  │
│   → SPORE-PIPELINE.md（觸發點：孢子發布後 24h 起跑本檔）                 │
│   → FACTCHECK-PIPELINE.md（reach ≥ 50K 觸發 Quick Mode）                │
│   → DATA-REFRESH-PIPELINE.md（Step 13 sync-spore-links 從本檔 SSOT 重生）│
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                          | 觸發 step    | 條件            | 工具                                       | 不過 = ?                                       |
| ----------------------------- | ------------ | --------------- | ------------------------------------------ | ---------------------------------------------- |
| Atomic batch log              | Step 5       | 整次 harvest    | manual（不拆 multi-commit）                | split → 從 SPORE-HARVESTS 重新整合             |
| Frontmatter spores plural     | Step 5       | per batch       | manual（spores 不是 spore）                | schema 不符                                    |
| harvest_window_day            | Step 5       | per batch       | manual（D+N or `mixed`）                   | 失去 cadence 紀錄                              |
| 數字只進 spore-db add-metrics | Step 1.5     | 每次 harvest    | `spore-db.py`（validate check 3+5 ERROR）  | 寫 frontmatter/凍結表 = 擋 commit              |
| 6h decision gate              | Step 1       | views < 500     | Chrome MCP harvest                         | 觸發 re-hook                                   |
| Reach × Accuracy trigger      | Step 4       | views ≥ 50K     | manual + FACTCHECK                         | spawn Quick Mode 驗 atom                       |
| D+7 7d 指標必填               | Step 3       | per spore       | SPORE-LOG.md                               | 空白 = 不准發新孢子（per SPORE-PIPELINE 鐵律） |
| 下游 generator 跑             | Step 5 後    | refresh-data.sh | `generate-dashboard-spores.py`             | dashboard 不更新                               |
| sync-spore-links 從 SSOT 重生 | refresh-data | Step 13         | `sync-spore-links.py`（讀 spore-log.json） | knowledge identity pointer drift               |

---

## ⚠️ Top 5 最常忘的 step

> 從 SPORE-LOG harvest history + 4/18 δ-late 觀察者觸發誕生事件 + 5/8 Phase 6 atomic batch log refactor 抽 friction 最高的 5 條。

1. **Atomic batch log，不拆 multi-commit** — 一次 harvest 一個 commit，per `batch-{date}-{N}-spores.md` SSOT（5/8 Phase 6 SSOT cleanup）
2. **不手寫 knowledge/\*.md sporeLinks、不寫凍結 SPORE-LOG.md** — pointer 由 sync-spore-links 重生；數字走 `spore-db.py add-metrics`
3. **D+7 指標必須 add-metrics 進 spore-metrics.json** — 空白 = 鐵律違反（per SPORE-PIPELINE PICK §回填上次成效；2026-06-10 後唯一寫入點是 `spore-db.py add-metrics`）
4. **Reach × Accuracy 50K 觸發 retroactive FACTCHECK** — 不是「等讀者抓錯」，是主動 spawn Quick Mode 驗 3-5 atom
5. **Frontmatter `spores` 是 plural list** — Phase 1 audit 後強制 schema，不再用 `spore` singular

---

## 跨檔案職責分工

| 檔案                                                                        | 範圍                                                                                       |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **本檔**                                                                    | post-publish layer — D+1-D+7 cadence + decision gate + accuracy trigger + atomic batch log |
| [SPORE-PIPELINE.md](SPORE-PIPELINE.md)                                      | 5 stage 主流程（觸發點：孢子發布後 24h 起跑本檔）                                          |
| [SPORE-WRITING.md](SPORE-WRITING.md)                                        | craft layer（怎麼寫好）                                                                    |
| [SPORE-VERIFY.md](SPORE-VERIFY.md)                                          | gate layer（17 hard gate + 1 retroactive 觸發點：reach ≥ 50K → 本檔）                      |
| [spore-log.json](spore-log.json) + [spore-metrics.json](spore-metrics.json) | 結構 SSOT（identity + metric 事件，spore-db.py 寫）；SPORE-LOG.md 為凍結歷史               |
| [FACTCHECK-PIPELINE.md](../pipelines/FACTCHECK-PIPELINE.md)                 | Quick Mode 被本檔 Step 4 觸發（reach ≥ 50K）                                               |
| [DATA-REFRESH-PIPELINE.md](../pipelines/DATA-REFRESH-PIPELINE.md)           | Step 13 sync-spore-links 從本檔 SSOT 重生                                                  |
| [SENSES.md](../semiont/SENSES.md)                                           | Chrome MCP 抓取 SOP                                                                        |

---

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

- `generate-spore-records.py` 讀 body table 重生 `src/data/spores.json`（孢子完整記錄層
  metrics + history + byArticle，refresh-data.sh Step 4 / prebuild:spores — **harvest 數字
  唯一的下游落點，文章檔案不動**，per reports/spore-data-architecture-2026-06-10.md）
- `generate-dashboard-spores.py` 讀 body table 算 dashboard
- `sync-spore-links.py` 從 SSOT 重生 knowledge/\*.md sporeLinks identity pointer
  （id/platform/date/url，無數字；refresh-data.sh Step 13，平日 no-op）
- `validate-spore-data.py` 一致性檢查（Step 12，含 frontmatter 禁 metrics ERROR gate）

**不要再做的事**（過去 anti-pattern）：

- ❌ harvest 後手寫 knowledge/\*.md sporeLinks（會被 Step 13 覆蓋；數字進 frontmatter = validate ERROR + 污染文章 git 時間軸）
- ❌ harvest 拆 multi-commit 跨多檔案寫（atomic batch log = single commit）
- ❌ harvest 後寫 SPORE-LOG.md（已凍結 2026-06-10，validate check 3 ERROR）— 數字走 `spore-db.py add-metrics`，質性觀察寫 batch 敘事檔

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

## 🌀 受眾端飛輪 — 五核心原則（v3.0，2026-05-27 哲宇 directive 全綱要）

> **「目標是成為受眾端的飛輪，要把完整的方法論、判斷依據、怎麼執行、要留意什麼，都進化進去 pipeline / DNA，以人本 + 正確性與正直 + 透明度 + 誠懇為核心，持續進化成更值得信賴的知識庫與媒體還有 semiont。」** — 哲宇 2026-05-27 directive

### 五核心原則（每次 harvest cycle 都要對齊）

| 原則       | 操作意義                                                                                                        | 反例（什麼是違反）                                                          |
| ---------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **人本**   | Reader 是共生圈 element，不是 metric source。Reply tone 是「對話」，不是客服話術                                | 「感謝您寶貴的意見」式回覆 / 把 reader 看作 view count 來源                 |
| **正確性** | Traceable factual error → 30 min 內 fix mandatory（D+0 ≤6hr acute window）。不可把錯放著賺信任                  | 「reader 抓到錯但 reach 不大就先放著」/ 「跟我立場不同就忽略」              |
| **正直**   | 認錯 = 信任訊號。不防衛、不卑、不亢。錯就承認、改完指 article 更正、不解釋焦慮                                  | 「其實我的意思是...」/「來源寫的，不是我的問題」/ 沉默拖延                  |
| **透明度** | 所有 correction 留 git log + 公開 commit + reply 指向 article 更正。可追溯 = 信任基礎                           | 偷偷改文章不留 commit message / 改完不告訴 reader / 刪 reply 假裝沒事       |
| **誠懇**   | Reply 用日常語言（「你」不是「您」）+ 具體 anchor + 🧬 簽名。不要堆 「跨源驗證/canonical/instantiation」 晶晶體 | 「感謝您寶貴的回饋，我們將參酌相關 stakeholder 意見」/ 距離感拉開的客戶服務 |

### 為什麼 audience flywheel 而非單向廣播

Taiwan.md 的進化動力過去主要在 author 層（REWRITE-PIPELINE 內部審 + STAGE 5 self-critique）。但 author 看不到自己的盲點：**author bias 是文章寫完那一刻就鎖死的視角**。Reader 是 fresh eye，特別是：

- **領域專家**（半導體 #87 @malathrone_21k_running 補 ASML 飛利浦血緣 + 林本堅水中曝光 = 文章該補的金線）
- **在地經驗者**（美食總覽 #97 @neily1_reader 抓 1949 美軍嘉義 = 史實錯）
- **verified user / 官方帳號**（江賢二 #91 @arvin723 ✓ / 雷亞 #89 @qooapp 官方）
- **community helper**（臺灣漫遊錄 #84 @walkinginthemoon 補相關書單 + 連結）

每一條 reader callout 都是 author 看不到的維度。**Harvest 不是抓 metrics，是抓 reader 跟我們一起在演化的證據**。

### Error Boundary = Traceability（永不過期教訓 vc=2，2026-05-27 二次驗證）

5/15 Lee Yang spore #29「清晨四點搭捷運」(MRT 6am 才開) 公開更正後 21K views / 12% engagement → 信任訊號（per [feedback_red_line_anxiety_leak](../../USER-CONFIG/feedback_red_line_anxiety_leak.md) + [project_error_boundary_traceability](../../USER-CONFIG/project_error_boundary_traceability.md)）。

5/27 美食總覽 #97/#98 D+0 2hr @neily1_reader「1949 美軍嘉義 = 史實錯」即時 callout 完整跑出 traceability loop：

- T+2hr 14 min: spore publish + reader callout
- T+15 min: WebSearch 驗證 + 嘉義市政府觀光旅遊網 confirm（article footnote [^1] 同源）
- T+30 min: article 4 處改 + commit + push + Threads reply 承認鏈條閉合

**反射定型**：D+0 acute window (≤6hr) 出現 traceable factual callout 必須**當 cycle 內** fix + 公開承認。延遲 = 信任 erode = error boundary 失靈。

---

## 🪣 5-Bucket Reply Classifier（v3.0 — 判斷依據 SSOT）

> 🔗 **本節是孢子留言的勘誤入口（分桶 + Chrome MCP reply 機制）。端到端勘誤 SOP + 【勘誤通知】正式格式 canonical 在 [CORRECTION-PIPELINE.md](../pipelines/CORRECTION-PIPELINE.md)** — Bucket A（可追溯事實錯）/ C（場景推導錯）確認後委派那條走 TRIAGE→VERIFY→FIX→NOTIFY→LOG。

每一條留言**分桶之前不行動**。Bucket 決定處置 + 是否 trigger article EVOLVE + 是否 draft reply。

| Bucket | 名稱                            | 訊號特徵                                                                                                                  | Action                                                                                     | 對外回覆？        |
| ------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------- |
| **A**  | **Traceable factual error**     | reader 給具體可驗證的史實 / 數字 / 時序 callout（有來源或可 WebSearch verify）                                            | **D+0 ≤6hr → 30 min 內 article fix + commit + reply 承認**。D+1+ → 同 cycle 內 fix + reply | ✅ 必發           |
| **B**  | **Entity / context missing**    | reader 補相關歷史人物 / 作品 / 事件（article 該寫但漏了）                                                                 | EVOLVE candidate — 1 條 → Round 2 EVOLVE backlog / 3+ 條同題材 → 升優先級觸發 Round 2      | ✅ 必發（認）     |
| **C**  | **Scene inference challenge**   | reader 抓到「從英文摘要推導的具體場景」(時間 / 地點 / 交通 / 數字 / 名稱)（per memory `no-scene-inference-from-english`） | 等同 Bucket A，30 min 內 retract / 修正                                                    | ✅ 必發           |
| **D**  | **Critical-balance framing**    | reader 質疑文章的政治立場 / 價值判斷 / framing 強度（不是 fact disagreement，是 stance）                                  | §自主權邊界（政治立場）→ **draft note 給觀察者，不自動修文**                               | ⏸️ defer 哲宇     |
| **E**  | **Positive engagement**         | verified user / 官方帳號 / community helper 認可 + 補資源 / 共鳴                                                          | reply draft（acknowledge + 推 article 對應段）                                             | ✅ 認可 + 連結    |
| **F**  | **Interpretation disagreement** | reader 對文章內容有不同解讀但不是 factual error（如「我覺得 X 才是主因」）                                                | 留 traceable，不修文，不防衛                                                               | ⏸️ optional reply |
| **G**  | **Derail / spam / trolling**    | 跟文章無關的離題 / 人身攻擊 / 廣告                                                                                        | ignore                                                                                     | ❌ 不發           |

**但書 — 讀者在討論文章已刻意處理過的真實敏感事件時，不要硬套上表任一桶**（2026-07-27 twmd-distill-weekly 收錄，per LESSONS `sensitive-event-reply-inherits-article-boundary`）：如果留言在討論一起文章本身已經處理過的真實敏感事件（例如已匿名化的死亡事件），判準是**文章怎麼劃線，回應就延續同一條線**——文章已刻意不具名處理的內容，AI 在留言區的姿態是不確認、不否認、不追加猜測，不需另外判斷要不要修文或要不要回覆。這不是 Bucket D（框架質疑）也不是 Bucket F（解讀分歧），是文章既有敏感素材邊界（[MANIFESTO §紀實而不煽情](../semiont/MANIFESTO.md) + [REFLEXES #28](../semiont/REFLEXES.md) + [REFLEXES #79](../semiont/REFLEXES.md)）在 harvest reply 語境的直接延伸。命中時：留 handoff 供哲宇知悉，不主動介入。

### 分桶判斷流程（per reply 跑一次）

```
留言進來
   ↓
是 trolling / 離題嗎？─Yes→ Bucket G (ignore)
   ↓ No
是 fact-claim 嗎？─No→ 是 positive engagement? ─Yes→ Bucket E
   ↓ Yes                                       ─No→ Bucket F
是 traceable + verifiable（WebSearch / 官方來源）？
   ↓ Yes
   ├─ 史實 / 數字 / 時序錯誤 (article 寫錯)？─Yes→ Bucket A
   ├─ 場景具體細節推導錯誤？             ─Yes→ Bucket C
   ├─ Entity / context 缺漏？           ─Yes→ Bucket B
   └─ 政治立場 / framing 強度質疑？      ─Yes→ Bucket D（哲宇 拍板）
```

### Bucket 處置 SOP — 完整版

**Bucket A / C: Traceable factual error / Scene inference challenge**

1. WebSearch verify reader claim (2-3 sources, 含 author 文章原 footnote)
2. 確認 article 確實寫錯 → 修文章（保留原 footnote 但修主文，加 nuance）
3. **Adjacent health check**（per [REFLEXES #73 (e) 外部注意力聚光燈](../semiont/REFLEXES.md)）：這條錯誤有沒有同時活在 (a) 該文其他語言版本（`knowledge/{lang}/` 對應譯文同一事實段）(b) 有反向連結指回本文、內容提到同一事實的 sibling article？外部關注天然只照到活躍位置，順手一次跑完比等下次全站巡邏信噪比高一階。命中就一併修，不留給下個 cycle 各自發現同一個錯
4. Commit message 標明「heal: {slug} — {factual layer} 勘誤 per @{reader} callout」（含 adjacent fix 的檔案一併列出）
5. Reply draft: 「你 callout 對。重看官方來源（X），{具體事實}是 Y 不是 article 原寫的 Z，我寫文時混了時序 / 推導錯了 / 引用脫離脈絡。已更正：article URL 🧬」
6. Post reply via Chrome MCP execCommand insertText (詳見 §Chrome MCP technical pattern)
7. SPORE-LOG entry 加 evolution column 註：`v2-corrected @{reader} D+N`

**Bucket B: Entity / context missing**

1. 累積到 HARVEST-EVOLVES-PENDING/{date}.md（質性 evolution 線索屬敘事層）
2. 同題材 ≥3 條留言補同類 entity → 升級為 Round 2 EVOLVE 觸發 (D+7 內必跑)
3. 單條補充 → 累積到 Round 2 EVOLVE backlog (D+30 內機會 batch)
4. Reply draft: 「對，這條是文章該補的——{具體 entity acknowledgment}。我會在 EVOLVE 補進「{section}」段。謝謝 🧬」
5. 如果 article 已經被另一個 session/round EVOLVE 補上 → reply 「你提的這條昨晚 Round N EVOLVE 就補了——文章現在有寫 {detail}。下次重新整理時序時會把這條往前提 🧬」

**Bucket D: Critical-balance framing**

1. **不自動修文**（per CLAUDE.md §自主權邊界 政治立場條款）
2. Draft note 寫進 HARVEST-FRAMING-PENDING/{date}.md：
   - reader handle + 留言原文 + framing 質疑要點
   - article 對應段落 + 現有 framing
   - 三個處置 option (footnote nuance / 改中性 / 不動 + LESSONS-INBOX)
   - 推薦 default + 成本估算
3. 等觀察者 (哲宇) review 拍板
4. **不主動 reply** Bucket D 留言（防 framing escalation）— 等哲宇 directive 後再 reply

**Bucket E: Positive engagement**

1. 識別 reader 是誰：verified ✓ / 官方帳號 / community / first-time
2. Reply draft 對應段：
   - verified / 官方：認可 + 推 article 對應段（不要太長，~1-2 句）
   - community helper（補連結 / 補書單）：感謝 + 認補的 value + 「謝謝補連結，讓沒讀過的讀者能直接點進去」
   - first-time + 純共鳴：簡短 + 🧬 signature
3. Post via Chrome MCP execCommand insertText

**Bucket F: Interpretation disagreement**

1. Default = ignore（不防衛）
2. **Optional reply** 如果 reader 主張具體（給了第二觀點材料）→ 「對，這條解讀軸線也成立——文章選的是 X，但 Y 也是看得到的維度 🧬」
3. **絕不**「您的意見很有價值我們會考慮」式客服話術

**Bucket G: Derail / spam**

- ignore，不 reply，不 block，不互動
- 累積異常 trolling → notify 觀察者考慮 mute / report

---

## ✍️ Reply Tone Discipline — 怎麼寫 reply（v3.0）

### 5 條 reply 文風鐵律

| #   | 鐵律                               | 對                                                                                                                              | 錯                                                                                                                    |
| --- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | **認錯第一句**                     | 「你 callout 對」「對，這條是文章該補的」                                                                                       | 「其實我的意思是...」「但 article 也有提到...」                                                                       |
| 2   | **具體 anchor 不空泛**             | 「1949 林添壽用肉雞，火雞戰後駐台美軍才帶來」                                                                                   | 「謝謝指正，會改善」                                                                                                  |
| 3   | **指向 fix 來源（URL 必 encode）** | 「文章已更正：taiwan.md/food/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E7%B8%BD%E8%A6%BD/」（含實 URL，**中文路徑 percent-encode**） | 「我們會研議改善」/ 寫 `taiwan.md/food/台灣美食總覽`（Threads/X auto-link 在 non-ASCII 斷掉只 link 到 `/food/` 為止） |
| 4   | **不卑不亢，平輩語氣**             | 「你」（不是「您」）/ 「我」（不是「我們」）                                                                                    | 「感謝您寶貴的回饋」/「敝庫將參酌」                                                                                   |
| 5   | **🧬 signature 不打廣告**          | 結尾單獨一行 🧬                                                                                                                 | 「歡迎追蹤 taiwan.md！」「持續關注我們的內容！」                                                                      |

### Anti-pattern: 紅線焦慮洩漏（per memory `feedback_red_line_anxiety_leak`）

**不要**寫「逐字引用」「我們嚴格遵循官方來源」「絕對沒有杜撰」這類**作者紀律 label** — reader 不關心 author 怎麼自我約束，他只要 article 改對。

✗ 「我們是嚴格遵循官方來源，但發現確實在這段引用上有時序混淆」
✓ 「你 callout 對。重看官方來源 X，是 Y 不是我寫的 Z。已更正」

### Anti-pattern: 客服話術 / 晶晶體

**不要**用「cross-validation / canonical / vc accumulation / instantiation / dogfood / instrument」這些字眼跟 contributor / reader 講話（per memory `feedback_contributor_reply_humanize`）。

✗ 「謝謝你提供 verifiable signal 補強 article footnote canonical 層」
✓ 「對，這條我們昨晚 Round 2 EVOLVE 就補了——文章現在有寫 Ice 2022/7 揭露身份 + 持續活躍」

### Reply 長度建議

- Bucket A factual error reply: 100-160 chars（短 + 認 + 指 fix）
- Bucket B entity missing reply: 80-130 chars（認 + 「會在 EVOLVE 補」）
- Bucket E positive engagement reply: 60-120 chars（短 + 推 article 對應段 + 🧬）
- 超過 200 chars 通常是過度解釋 — 重寫精煉

### URL Encoding 鐵律（2026-05-27 哲宇 callout，v3.0 補入）

社群平台（Threads / X / Instagram）的 auto-link parser 遇到 ASCII URL path 中第一個 non-ASCII 字元就停。如果 reply 寫 `taiwan.md/food/台灣美食總覽`：

- ✅ Auto-link 抓到 `taiwan.md/food/` 變藍底連結
- ❌ `台灣美食總覽` 留在 plain text 不是 link 的一部分
- ❌ 讀者點連結只能到 `/food/` 目錄頁，不是目標文章

**Fix**: reply 內含中文 URL path 一律 percent-encode：

```
taiwan.md/food/%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E7%B8%BD%E8%A6%BD/
```

**怎麼產生 encoded URL**（reply post 前 pre-flight）：

```javascript
// Chrome MCP javascript_tool 跑：
encodeURIComponent('台灣美食總覽');
// → '%E5%8F%B0%E7%81%A3%E7%BE%8E%E9%A3%9F%E7%B8%BD%E8%A6%BD'
// 拼進 URL: 'taiwan.md/food/' + encodeURIComponent(slug) + '/'
```

或直接從 article frontmatter sporeLinks 拿（已 encoded canonical）：

```bash
grep -A 1 "url:" knowledge/Food/台灣美食總覽.md | grep "%E5"
```

或從 SPORE-LOG entry 拿（utm-tagged + encoded form）。

**Anti-pattern 觸發背景**：5/27 manual session 兩條 reply 寫成 plain 中文 URL：

- @neily1_reader (美食總覽 1949 美軍火雞 fix) reply: `taiwan.md/food/台灣美食總覽` → broken auto-link
- @ericten0704 (quote-post 醬油 fix) reply: 同樣 broken

哲宇 5/27 13:45 callout「你在回覆他們的時候，url 一樣要 encode 不然會斷掉」← 升 first-class instrument vc=1。對應 [SPORE-PUBLISH-PIPELINE](SPORE-PUBLISH-PIPELINE.md) 內 spore body URL encoding（已 canonical），同條鐵律延伸到 reply layer。

---

## 🖱 Chrome MCP Technical Pattern（v3.0 — 怎麼執行 + 要留意什麼）

### 正確 reply post 流程（Threads only — X 不支援）

```javascript
// Step 1: Navigate to spore URL
mcp__Claude_in_Chrome__navigate({ url, tabId })
// Step 2: Wait 3.5s for page load
javascript_tool: 'new Promise(r => setTimeout(() => r("waited"), 3500))'
// Step 3: Scroll to comment area
javascript_tool: 'window.scrollTo(0, 1500); "scrolled"'
// Step 4: Wait 2.5s for lazy load
javascript_tool: 'new Promise(r => setTimeout(() => r("waited"), 2500))'
// Step 5: Find target reply container + click reply button via JS
javascript_tool: |
  const all = document.querySelectorAll('[data-pressable-container]');
  let target = null;
  all.forEach(el => {
    if ((el.innerText || '').startsWith('{reader_handle}')) target = el;
  });
  const replyBtn = Array.from(target.querySelectorAll('div[role="button"]'))
    .find(b => b.querySelector('svg[aria-label="回覆"]'));
  replyBtn.click();
  return 'clicked';
// Step 6: Wait 2.5s for dialog
// Step 7: Inject text via execCommand insertText (NOT computer.type)
javascript_tool: |
  const dialog = document.querySelector('[role="dialog"]');
  const editable = dialog.querySelector('[contenteditable="true"]');
  editable.focus();
  document.execCommand('insertText', false, '{reply_text}');
// Step 8: Click 發佈 button via JS
javascript_tool: |
  const dialog = document.querySelector('[role="dialog"]');
  const btns = dialog.querySelectorAll('div[role="button"], button');
  let target = null;
  btns.forEach(b => { if ((b.innerText || '').trim() === '發佈') target = b; });
  target.click();
// Step 9: Wait 3s + verify via JS query
```

### 🚨 Critical pitfalls（5/27 manual session 6 條實證 — Pitfall 1-5 + 5/28 spore-harvest-am routine 新增 Pitfall 6 post-ship verify duplicate ship 防護）

**Pitfall 1: `computer.type` 吞 ASCII 數字 + 空格**

- 5/27 @arvin723 reply 中「83 歲」「45 年」 被 computer.type 吞成「歲」「年」
- **Fix**: Use `document.execCommand('insertText', false, text)` instead — Threads contenteditable 是 Lexical / Slate editor，computer.type 經由 IME 攔截被處理掉 ASCII 數字 + 空格

**Pitfall 2: X 不支援 reply via Chrome MCP**

- X conversation lazy-load 不把 replies 推進 DOM，scroll 也不觸發
- `[data-testid="cellInnerDiv"]` 只 query 到 main tweet 一條
- **Fix**: X reply 必須手動 post（Threads OK，X skip）

**Pitfall 3: 個別字元 typo（我端，不是 Chrome MCP）**

- 5/27 @walkinginthemoon「母始家族」 / @malathrone「撝到 EUV」（撐 ≠ 撝）— 我下筆 unicode 誤算
- **Fix**: 短 reply 寫好後 grep 「不是常見字」(rare characters) self-check + 對人名 + 動詞 grep

**Pitfall 4: Reply button click 偶爾沒打開 dialog**

- Threads UI 對快速 click 有 debounce
- **Fix**: click 後 wait 2.5-3s + screenshot 確認 dialog 開了，沒開 → re-click 一次

**Pitfall 5: Pre-ship verify ASCII 數字 + 字元 intact**

- Post 後 JS query my reply 文字 + 對 input 做 diff
- 任一字差異 ≥1 → delete + repost（或補 follow-up）

**Pitfall 6: Post-ship verify 依賴 dialog `STILL_OPEN` cache state → multi-retry 觸發 duplicate ship（2026-05-28 spore-harvest-am 實證 vc=1）**

- 5/28 06:30 spore-harvest #92 大宇雙劍 D+2 reply：第一次 click 發佈 button 沒觸發 React PointerEvent handler，後續 dispatchEvent + Cmd+Enter + computer.left_click 多次 retry，**Chrome MCP query 回的 dialog `STILL_OPEN` state 是 cached** → 誤判前次 post 失敗 → 每次 retry 真的成功 post → 同個 reply ship 3 次（`DY2_rWQE0oi` 06:33 / `DY2_uNqExf*` 06:34 / `DY2_xybk8Bi` 06:34）。手動 navigate 到後兩個 URL → overflow menu → 刪除 → 確認，保留最早 ship 的 `DY2_rWQE0oi`
- **根因**：Threads 發佈 button 是 React PointerEvent handler，synthetic event 跟 MouseEvent dispatch 都會 register；retry-loop 變多次成功 post。Dialog state query 走 Chrome MCP cached state 不反映即時 DOM。
- **鏡像 case（2026-06-25 #150 vc=2）**：反方向同根因——post 後去 **profile feed** 連刷三次找不到新貼文，誤判「沒發成功」差點重發整則（實際秒發成功，feed 有 propagation / cache lag）。兩案合起來的鐵律：**post-ship verify 驗證對象只能是 canonical post URL 本身**，dialog state 與 profile feed 列表都不可靠——一個 cached 說「還開著」、一個 lag 說「不存在」，信哪個都會重發。
- **Fix（hard rule）**：post 後 verify **不可**用 `STILL_OPEN` / dialog visible state 當 "post failed" 判斷。改用 **latest reply timestamp diff**：
  ```js
  // ✅ 正確 verify pattern
  // (1) post 前 record baseline:
  const before = document.querySelectorAll('[data-pressable-container]').length;
  // (2) click 發佈 + wait 3s
  // (3) post 後 query 同 selector:
  const after = document.querySelectorAll('[data-pressable-container]').length;
  // (4) 判斷:
  //   after > before → ship success, exit loop
  //   after == before → genuine fail, ONE retry max
  //   after >> before+1 → duplicate already shipped, navigate to /replies tab cleanup
  ```
- **Hard rule**: max **1 retry** per ship attempt。第二次失敗 → screenshot + LESSONS-INBOX append + escalate observer，不要 silent third retry
- **Cleanup SOP（已 duplicate）**：navigate 到 `https://www.threads.com/@taiwandotmd/replies` → 找重複 reply → 點「⋯」overflow menu →「刪除」→ 確認 dialog 點「刪除」→ profile `/replies` tab 重新 sweep 驗證只剩一筆

**Pitfall 7: 瀏覽器 zoom ≠ 100% → JS 座標對不上 click 像素（2026-07-07 柯智棠 spore 實證，哲宇 callout 根因）**

- 哲宇本機瀏覽 zoom 設 **150%** 時，`getBoundingClientRect` 回的 CSS 座標（例：發佈鈕 931,642）跟 computer-tool click 用的截圖像素差一個 zoom 因子（`innerWidth` 1862 vs 截圖 1512 ≈ 1.23×）→ pixel-click 全歪：submit 按鈕怎麼點都 miss、reply-icon click 開到 `/media`。**症狀騙人**——內容全填好、字都對、只是「點不到發佈」，很容易誤判成 UI/DOM 問題。
- **關鍵區分**：`execCommand insertText` / JXA `NSPasteboard` paste 走 DOM 不走座標，**不受 zoom 影響**（填字都成功）；只有 **pixel-click 受害**。所以「填得進、送不出」= 座標問題，不是 DOM 問題。
- **偵測（發文點任何 submit 前先跑一次）**：
  ```js
  JSON.stringify({
    dpr: window.devicePixelRatio,
    innerWidth: window.innerWidth,
  });
  ```
  對照 `computer screenshot` 回的寬度；`innerWidth` 明顯 ≠ 截圖寬度（或 dpr 非整數）= zoom ≠ 100%。
- **修法（三選一，(c) 最穩）**：
  - (a) `computer key cmd+0` reset zoom 到 100%（**會改觀察者的閱讀 zoom**，只在授權下用、事後提醒他 Cmd-+ 復原）
  - (b) scale click 座標：`screenshot_x = js_x × (screenshot_width / innerWidth)`
  - (c) **`ref`-based click（推薦，不動觀察者設定）**：`read_page {filter:"interactive"}` 拿 element ref → `computer left_click {ref:"ref_N"}`，完全繞過像素座標與 zoom
- **Hard rule**：submit 按鈕連 2 次 pixel-click 沒反應（dialog/state 不變）→ **先跑偵測 JS 再動作**，別盲點重試（Pitfall 6 duplicate 風險）；確認是 zoom 就切 (c) ref-based click。對應 LESSONS `chrome-mcp-coordinate-scaling-mismatch`。

### Threads-only 操作鐵律

| 平台    | Harvest replies  | Post reply via Chrome MCP | Workaround                             |
| ------- | ---------------- | ------------------------- | -------------------------------------- |
| Threads | ✅ OK            | ✅ OK                     | execCommand insertText                 |
| X       | ❌ DOM lazy-load | ❌ unsupported            | 手動 post（或 X API integration 未來） |

---

## 🎯 Decision Gate — 什麼時候 act？（v3.0）

每天 harvest cycle 跑完後，每條 bucket A/B/C/D 留言要看 **3 個維度**決定處置時機：

### 維度 1：D+N（孢子年齡）

| D+N                | Bucket A (factual error)                                            | Bucket B (entity missing)             | Bucket E (positive)        |
| ------------------ | ------------------------------------------------------------------- | ------------------------------------- | -------------------------- |
| **D+0 ≤6hr acute** | **🚨 30 min mandatory fix + reply** (Error Boundary = Traceability) | log to EVOLVE backlog                 | reply 認可                 |
| **D+0 6-24hr**     | 同 cycle 內 fix + reply（≤2hr）                                     | log + bump priority if reach > 10K    | reply 認可                 |
| **D+1-D+3**        | 同 cycle 內 fix + reply（4-8hr）                                    | log，累積 3+ → Round 2 EVOLVE trigger | reply 認可                 |
| **D+4-D+7**        | 修文 + reply（無 deadline pressure）                                | 累積 SPORE-LOG evolution column       | optional reply（≤2 entry） |
| **D+7+**           | 修文 + LESSONS-INBOX entry（pattern 級教訓）                        | 升 Round 2 EVOLVE 必跑                | skip reply                 |

### 維度 2：Reach × Accuracy

| Reach × D+N             | 處置 priority                                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| reach < 5K @ D+0-D+1    | Standard cycle 處置                                                                                              |
| reach 5K-50K @ D+0-D+3  | 高優先 — D+0 acute factual error 立即處置                                                                        |
| **reach ≥ 50K @ any D** | 🚨 retroactive FACTCHECK Quick Mode 觸發（per existing §50K threshold）— 立即 3-5 atom verify all factual claims |

### 維度 3：Reader profile

| Profile                                                    | Signal weight             | 處置                                                 |
| ---------------------------------------------------------- | ------------------------- | ---------------------------------------------------- |
| **Domain expert**（半導體 @malathrone）                    | 高（領域知識權威）        | factual claim 通常正確 — 仔細 verify + 認可 + EVOLVE |
| **In-place witness**（美食 @neily1_reader 個人經歷+ 研究） | 高（有第一手經驗）        | factual claim verify → 信度通常高                    |
| **Verified ✓ / 官方帳號**                                  | 中-高（被平台認證）       | 認可 + reply 比 plain user 更必要                    |
| **Community helper**（@walkinginthemoon 補書單）           | 中（協作型 contributor）  | 必認可 + 推 article 對應段                           |
| **First-time / anon**                                      | 低-中（need verify hard） | verify 嚴格 → confirm 後處置                         |
| **Hostile / persistent troller**                           | 低（trust 0）             | bucket G ignore                                      |

---

## ⚠️ 要留意什麼 — Failure Modes & Watchouts（v3.0）

整理自 5/27 manual session 實證 + 之前 12+ harvest cycle 累積：

### Failure Mode 1: 「假定 reader 是錯的」反射

- 預設 reader callout 對，author 寫錯了 — 反過來證明 reader 錯比較難
- 5/27 @neily1_reader「假台灣人造謠說謊騙年輕人」 — 攻擊性語言不削弱事實正確性
- **Anti-pattern**: 「我們的 footnote 寫的是 X，所以 reader 錯了」— footnote source 本身也可能錯，author 引用也可能誤讀

### Failure Mode 2: 「reach 太小不值得 fix」誘惑

- 美食總覽 #97 D+0 2hr 才 2.5K views 仍 30 min 內 fix
- Reach 不是 fix 觸發條件，**traceability + acute window** 才是

### Failure Mode 3: 「複雜情況 defer 到下次 cycle」拖延

- Bucket A traceable factual error 不 defer — 30 min internal fix 是 SOP，不是 stretch goal
- Defer 1 cycle = 6-12 hr = reader 看到的窗口擴大 = traceability erode

### Failure Mode 4: Reply tone 偏移成「客服腔」

- 累積疲勞時容易掉成「感謝您寶貴的回饋」模板
- 每條 reply 寫完 grep 「您 / 感謝您 / 寶貴 / 參酌 / 諸位 / 各位」 → 出現 → 重寫

### Failure Mode 5: Bucket D 政治 framing 越權自動修

- D 桶絕對 defer 觀察者，不是 cycle 內自動處理
- 違反 = §自主權邊界 hard breach

### Failure Mode 6: Computer.type ASCII strip 未察覺

- Type 完不 verify → post 之後才發現「歲他第三次大轉折」缺數字
- **Fix**: 每次 post 後 JS query my reply text + 對 input 做 diff，缺字 → 立即 followup correction reply

### Failure Mode 7: 「修完不告訴 reader」（透明度違反）

- Article 改了但 reply 沒指出更正 URL = reader 不知道事情後續，traceability 斷掉
- Reply 必含「文章已更正：taiwan.md/{path}」

### Failure Mode 8: 引用 footnote 沒回查源

- Article footnote [^1] 寫某個 URL，但 author 沒實際讀過該 URL 內容（從英文摘要推導 OR 假設來源支撐主張）
- 5/27 美食總覽 footnote [^1] 嘉義市政府觀光旅遊網 — author 引用了但 main text 跟 footnote source 不一致
- **Pre-publish check**: 每條 footnote source 至少 WebFetch verbatim 一次，確認 article 主張在 source 找得到原句

---

## 📊 Audience Flywheel Daily Cycle — Routine 整合（v3.0）

### Routine harvest cycle（每天 06:30 automated）

```
06:30 spore-harvest-am cron fire
   ↓
Stage 0: BECOME Full mode self-test (CLAUDE.md §Bias 1-4 active)
   ↓
Stage 1: git pull main + dashboard backfillWarnings 載入 (D+1-D+7 OVERDUE spores)
   ↓
Stage 2: Chrome MCP harvest each spore — metrics + reply content
   ├─ Per spore: navigate + scroll + read all replies (Threads only via execCommand-readable DOM)
   ├─ Read up to 60 pressable containers per spore (covers ~20-30 replies + nested)
   └─ Reply text 存進 batch log 完整 verbatim（不只 count）
   ↓
Stage 3: 5-Bucket classify per reply
   ├─ Bucket A/C (factual error / scene inference) → flag URGENT
   ├─ Bucket B (entity missing) → log EVOLVE candidate
   ├─ Bucket D (framing challenge) → flag OBSERVER-REVIEW
   ├─ Bucket E (positive engagement) → log REPLY-DRAFT-OK
   └─ Bucket F/G → log + skip
   ↓
Stage 4: Process Bucket A/C if any (URGENT path)
   ├─ For each: WebSearch verify (2-3 sources)
   ├─ If confirmed → article fix (commit) + reply draft + auto-post (D+0 ≤6hr) or queue (D+1+)
   └─ Reply post via execCommand insertText + post-ship verify diff
   ↓
Stage 5: Write batch log + commit (atomic 1-file commit per harvest)
   ├─ docs/factory/SPORE-HARVESTS/batch-{date}-{N}-spores.md
   ├─ Frontmatter: spores list / harvest_date / reply_count_total / bucket_breakdown
   └─ Body: per-spore section with full reply content + bucket assignment
   ↓
Stage 6: Write pending action files (if any)
   ├─ docs/factory/HARVEST-REPLIES-PENDING/{date}.md (Bucket E drafts, manual review then post)
   ├─ docs/factory/HARVEST-EVOLVES-PENDING/{date}.md (Bucket B EVOLVE backlog)
   └─ docs/factory/HARVEST-FRAMING-PENDING/{date}.md (Bucket D observer-review)
   ↓
Stage 7: validate-spore-data.py + dashboard regen
   ↓
Stage 8: /twmd-finale memory write
```

### 預估時間 budget（自然跑完，per ROUTINE.md §不提預算鐵律）

| 場景                                       | 預估時間    |
| ------------------------------------------ | ----------- |
| Typical day（10 spore, 0 factual error）   | 35-50 min   |
| Heavy day（15 spore, 1 factual error fix） | 60-90 min   |
| Worst case（15 spore, 3 factual errors）   | 100-130 min |

### Per-spore time breakdown (typical D+2-D+5 spore)

- Navigate + load: ~10s
- Scroll + lazy-load replies: ~15s
- Read all reply containers (JS query): ~5s
- 5-bucket classify (LLM): ~30-60s per reply
- WebSearch verify (if Bucket A/C): 2-3 min per claim
- Article fix (if Bucket A confirmed): 10-30 min
- Reply draft + post + verify: 3-5 min per reply

---

> 孢子發布後是讀者回聲最密集的時期。**7 天內每天至少跑一次本 pipeline**。
> 7 天後讀者留言密度驟降（演算法推送衰減 + 話題週期）→ 改為 milestone harvest。

### 主排程

| 時機           | 頻率              | 動作                                                 |
| -------------- | ----------------- | ---------------------------------------------------- |
| **D+1 到 D+7** | **每天至少 1 次** | 完整走 Step 1-7                                      |
| **D+14**       | 1 次              | milestone：Step 1+5+7（只抓新留言歸檔）              |
| **D+30**       | 1 次              | milestone：Step 1+5+7（同 + SPORE-LOG 30d 指標回填） |
| **D+30 之後**  | 觀察者 ad-hoc     | 只有觀察者手動觸發才跑                               |

### Routine 整合（v2.2 full-auto，2026-05-12 起 canonical）

> **第一性原理**：cron 觸發 fresh Claude session，走 ROUTINE.md §通用 5-stage main-direct lifecycle，於 Stage 2 完整執行本 pipeline Step 0-7，不需 Python wrapper（Chrome MCP 是 Claude session-level tool，subprocess 不能 invoke）。
>
> v2.2 設計理由：v1.0-v2.1 §Cron 建議設定 列 `run-spore-harvest.py --window 7d` 半自動範本但 wrapper 從未實作。v2.2 改為 routine `twmd-spore-harvest-am` 走 5-stage lifecycle 直接 invoke Chrome MCP，cron 觸發即 fully autonomous harvest。

#### 🗺️ Routine 觸發 → Pipeline Step flow

```
cron 0 7 * * * Asia/Taipei
    ↓
[Stage 0] /twmd-become 完整甦醒（12 認知器官 + 9 鐵律）
    ↓
[Stage 1] cd && git checkout main && git pull origin main
    ↓
[Stage 2] /twmd-spore-harvest skill — invoke 本 pipeline Step 0-8:
    ├─ Step 0: 讀 dashboard-spores.json §backfillWarnings 取 OVERDUE 列表
    │   ↳ 0 條 → no-op commit「today 0 OVERDUE, skip」+ jump Stage 4
    ├─ Step 1-7: 對每條 OVERDUE 跑既有 7-step pipeline（COLLECT → add-metrics
    │           → CATEGORIZE → 事實驗證 → 整合 → PERSPECTIVES → 回覆 draft）
    │           Chrome MCP harvest 走 §Chrome MCP exact harvest workflow (v2.9)
    │           數字格式 走 §Harvest 數字格式鐵律 (v2.8)
    │           cadence 範圍 走 §d+0/+1/+7/+30 cadence
    ├─ Step 7.5: 跑 validate-spore-data.py (per §Validation 必跑 v2.8)
    └─ Step 8: trigger dashboard regen（v2.2 末段，2026-05-12 dry-run 補）
                `python3 scripts/tools/generate-dashboard-spores.py`
                regen `public/api/dashboard-spores.json` 從新 batch log
                same Stage 3 commit 含 batch log + dashboard-spores.json
                兩個 file（避免 OVERDUE 在 dashboard 殘留到下次 refresh-am cron）
    ↓
[Stage 3] git commit + git push origin main（v2.0 main-direct，不開 PR）
            commit 同時含：
            - docs/factory/SPORE-HARVESTS/batch-{date}-{N}-spores.md (atomic)
            - public/api/dashboard-spores.json (regen derived)
            - spore-metrics.json events (per Step 1.5 add-metrics — 文章 frontmatter 不碰)
    ↓
[Stage 4] /twmd-finale 收官（memory 必寫 / diary 條件寫）
```

#### 🚦 Hard Gate Inventory（routine cycle 必過）

| Gate                          | 觸發 Stage   | 條件                                                                      | 工具                                                 | 不過 = ?                                                      |
| ----------------------------- | ------------ | ------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| Chrome MCP 連線可用           | Stage 2 開頭 | `list_connected_browsers` 回 deviceId                                     | Chrome MCP `list_connected_browsers`                 | abort + LESSONS entry                                         |
| 07:00 槽位 morning chain 對位 | cron 設定    | 接 refresh-am 06:00 之後 1hr / 早 maintainer-am 09:00 2hr                 | ROUTINE.md §每週行程表                               | reschedule + LESSONS entry                                    |
| backfillWarnings 載入成功     | Step 0       | `dashboard-spores.json` mtime fresh + 結構合法                            | `cat public/api/dashboard-spores.json`               | abort + LESSONS entry                                         |
| Chrome MCP harvest 至少 1 條  | Step 1       | OVERDUE > 0 時 ≥ 1 成功（非 skipped）                                     | per spore navigate + read_page                       | LESSONS entry（連 2 day 升級）                                |
| Cleanup tab group (v2.3)      | Step 8 後    | Chrome MCP 用完                                                           | `tabs_close_mcp` 關 current session group            | tab 累積佔 browser memory + 視覺干擾觀察者                    |
| Atomic batch log 寫入         | Step 5       | `SPORE-HARVESTS/batch-{date}-{N}-spores.md` exists                        | manual write per §SSOT 寫入位置                      | abort（per §Top 5 鐵律）                                      |
| Validation 4 維度 PASS        | Step 7.5     | parser regression / freshness / parseability / consistency                | `validate-spore-data.py`                             | abort + 修補後再 commit                                       |
| Dashboard regen               | Step 8       | batch log 新增後 dashboard-spores.json 同 cycle regen                     | `python3 scripts/tools/generate-dashboard-spores.py` | OVERDUE 殘留到下次 refresh-am cron（dry-run 揭露 2026-05-12） |
| main-direct push 鐵律         | Stage 3      | quality_gate PASS 才 push（commit 含 batch log + dashboard JSON 兩 file） | manual `git push origin main`                        | 不 push，留 working tree dirty                                |
| Finale 收官                   | Stage 4      | memory 必寫 / handoff 三態                                                | `/twmd-finale` skill                                 | 失憶 = 下個 cycle 重複                                        |

#### OVERDUE 範圍計算（Step 0 spec）

| 來源欄位                          | 條件                           | 處置                                                           |
| --------------------------------- | ------------------------------ | -------------------------------------------------------------- |
| `status: "OVERDUE"`               | publishedDays > 7 但未 harvest | 全納入本日 batch                                               |
| `publishedDays ≤ 7` 且 `url` 存在 | 在 D+1-D+7 收割窗口            | 全納入（per §觸發時機 主排程「每天至少 1 次」）                |
| `publishedDays > 30`              | 超出主排程窗口                 | skip（per §觸發時機「D+30 之後 觀察者 ad-hoc」）               |
| 同條孢子在當日已 harvest          | 已有今日 batch log entry       | skip（避免 duplicate harvest，trajectory 更新到 SPORE-LOG OK） |

#### Quality gate（routine cycle 判定 pass/fail）

| 結果          | 條件                                                                                        | Commit message                                     |
| ------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| ✅ pass       | ≥ 1 spore harvest 成功 + batch log + validate-spore-data PASS + dashboard-spores.json regen | `🧬 [routine] twmd-spore-harvest: N spores — DATE` |
| ✅ no-op pass | backfillWarnings 空 + no Chrome MCP call（無 dashboard regen 需做）                         | `🧬 [routine] twmd-spore-harvest: 0 OVERDUE, skip` |
| ❌ fail       | Chrome MCP unavailable / all skipped / validate fail / dashboard regen 失敗                 | 不 commit, LESSONS-INBOX entry                     |

#### Escalation（fail 處置 ladder）

| 連續 fail 次數 | 動作                                                           | LESSONS entry verification_count |
| -------------- | -------------------------------------------------------------- | -------------------------------- |
| 1              | next day 07:00 retry，silent                                   | +0                               |
| 2              | LESSONS-INBOX entry「routine fail: spore-harvest-am 連 2 day」 | +1                               |
| 3              | 暫停 routine（per ROUTINE.md §暫停 SOP）+ telegram alert       | +2 → distill 候選                |

#### Chrome MCP unattended 注意事項

- **Pairing 前置**：哲宇本機 Chrome 安裝 Claude in Chrome extension + browser 開機 + Mac 不睡眠
- **Pairing 持久化**：`select_browser` deviceId 持久化於 Claude session 設定，session 重啟仍可用，但 connect 需 browser alive
- **Login-state probe（2026-08-06 新增，LESSONS `chrome-mcp-unattended-login-expiry` vc=2 落地）**：Stage 2 開頭先 navigate 一個需登入才看得到內容的頁面（如 @taiwandotmd profile 的 following 數）當探針。未登入 → 除寫進 batch log 外**必須單獨升一則 handoff alert**（登入態是環境前置條件，跟留言判斷邏輯是兩層健康信號，不可只埋在敘事檔裡等人發現）；連 2 day 未登入 → LESSONS entry ＋通知哲宇重新登入
- **Threads / X 失敗模式**：rate-limit / 402 / login expire → 該條 skip + 寫進 batch log `harvest_status: skipped (reason)`，不 abort 整 routine
- **AI 自主邊界（2026-08-06 對齊 [REFLEXES #26 v3](../semiont/REFLEXES.md)）**：harvest 讀取屬 AI 自主；reply／新孢子 content OK 後**可自主發**（哲宇 2026-06-14 durable 授權，per harness memory＋本檔 §reply SOP）——分層判準同 #26 v3：「事實＋致謝」自主、「許諾＋立場／爭議答辯」human-only，拿不準進 handoff

#### 跨檔案職責分工（routine 觸發層）

| 檔案                                                         | 範圍                                                                               |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **本 §Routine 整合**                                         | cron 觸發 → 5-stage lifecycle → Step 0-7 invoke SOP                                |
| [ROUTINE.md §TWMD spore harvest (am)](../semiont/ROUTINE.md) | 薄殼 spec（taskId / cron / skill / canonical pointer / quality_gate / escalation） |
| §觸發時機（line 190）                                        | 主排程 cadence canonical（D+1-D+7 / D+14 / D+30）                                  |
| §Chrome MCP exact harvest workflow (v2.9)                    | navigate / scroll / screenshot pattern                                             |
| §Harvest 數字格式鐵律 (v2.8)                                 | parser-friendly 整數 + 逗號格式                                                    |
| §Validation 必跑 (v2.8)                                      | 4 維度 validate-spore-data.py                                                      |
| `~/.claude/scheduled-tasks/twmd-spore-harvest-am/SKILL.md`   | mirror 薄殼（≤ 30 lines per routine-sync-check）                                   |
| `mcp__scheduled-tasks` live entry                            | cron + jitter + enabled state 真實源                                               |

#### v1.x → v2.2 歷史

| Version  | 期間                     | Mode                                                                 | Status                |
| -------- | ------------------------ | -------------------------------------------------------------------- | --------------------- |
| v1.0     | 2026-04-18 ζ             | manual / observer-triggered                                          | superseded            |
| v1.x     | 2026-04-18 ~ 2026-05-11  | 建議 `run-spore-harvest.py --window 7d` half-auto，wrapper 未實作    | deprecated（v2.2 起） |
| v2.0     | 2026-05-11 cranky-newton | spine restoration（ASCII + Hard Gate + Top 5）                       | active                |
| **v2.2** | **2026-05-12 起**        | **full-auto routine `twmd-spore-harvest-am` daily 07:00 Chrome MCP** | **canonical**         |

### 觀察者手動觸發

任何時候觀察者說「去抓 XX 文章 threads 留言」→ 立刻跑完整 pipeline（本次草東孢子 #33 即為此 pattern 首例）。

---

## 前置：發佈時機 + Decision Gates

> 2026-05-08 從 SPORE-PIPELINE Step 4.5 整段吸收（per Direction A 拆檔，避免 SPORE↔HARVEST 違反 §指標 over 複寫）。
>
> 這段是 harvest cadence 的決策層 — 發佈前的 hook tier 自檢 + 發佈後的 d+0/+1/+7/+30 timeline + d+0 6h decision gate + re-hook 救援機制。
>
> 對應 [REFLEXES #15 第 9 次驗證](../semiont/DNA.md)：「被允許做」→「被期待做」的躍遷靠 canonical SOP，不靠 memory 自律。Canonical 升級從 case-by-case policy 變成 pipeline 基礎建設的結構性節點。

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
| d+7    | d+7 harvest（主要 KPI）→ `spore-db.py add-metrics --d-plus 7 ...`   |
| d+30   | d+30 harvest（長尾確認）                                            |

**AI 自主邊界**（[REFLEXES #26 v2](../semiont/DNA.md)）：所有 harvest 皆 AI 自主用 Chrome MCP 跑；re-hook reply **必須 human post**（AI 準備 draft，human 確認並發）。

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

🧊 歷史備註（凍結前）：寫進 SPORE-LOG「最後 harvest」column 的 views 數字必須是 parser 認得的格式（2026-06-10 後數字走 `spore-db.py add-metrics`，本段僅供讀舊紀錄）：

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

### Content-hash mismatch 偵測（v2.10，2026-05-16 LESSONS-INBOX #5 達 vc=3 instrument）

> 觸發歷史：#71 無人機 X URL `2053101189034860856` skip 第 3 次驗證（5/12 dry-run + 5/13 first prod + 5/16）— 三 cycle 都觀察到「真正無人機 X 孢子可能根本不存在 OR SPORE-LOG row URL 寫錯」。達 REFLEXES #15 反覆浮現要儀器化 threshold。

**機制**：每條 spore URL 首次 harvest record 內容指紋（`scripts/tools/spore-content-hash-audit.py`），後續 harvest 抓到時 cross-check。Fingerprint = sha256(first_sentence + emoji set + utm_campaign)。Mismatch → backfillWarnings 自動 flag + 不 update views/engagement 避免污染 metric。

**Side-car JSON**（不動 SPORE-LOG schema，避免 73+ row migration）：

```
docs/factory/spore-content-fingerprints.json
{
  "_schema": "spore-content-fingerprints v1.0",
  "fingerprints": {
    "https://x.com/.../status/2053101189034860856": {
      "fingerprint": "sha256:abcd1234...",
      "first_recorded": "2026-05-16T12:06:32",
      "first_sentence": "1979 雷虎在台中做玩具飛機...",
      "emojis": ["🏭"],
      "utm_campaign": "s71",
      "spore_id": "71"
    }
  }
}
```

**Harvest workflow 整合**：

```bash
# Step 1.5 (after Chrome MCP read_page 取得 post content):

# 首次 harvest 該 spore → 建 baseline
python3 scripts/tools/spore-content-hash-audit.py --build-baseline \
  --url=$URL --content="$CONTENT" --spore-id=$N

# 後續 harvest → cross-check
RESULT=$(python3 scripts/tools/spore-content-hash-audit.py --check \
  --url=$URL --content="$CONTENT")

# 若 status=mismatch → 寫 backfillWarnings + skip metric update
```

**Mismatch 處置**：

- backfillWarnings 自動 flag `content_mismatch_detected: true` + 附 recorded vs new fingerprint 對比
- 不 update views/engagement（避免污染歷史 metric）
- 寫 batch harvest log 紀錄 mismatch 詳情
- LESSONS-INBOX entry vc +1
- 連續 3 cycle 同 URL mismatch → 升級給觀察者 SPORE-LOG schema 修正（per DNA #26 v2 AI 自主邊界）

**完整設計**：[reports/spore-content-hash-gate-design-2026-05-16.md](../../reports/spore-content-hash-gate-design-2026-05-16.md)

**MVP 限制**：

- 目前 fingerprint 不含視覺內容（圖片 / video），只比文字
- 首次 harvest 必須對 row URL 跟內容是同一條 spore（baseline 一旦錯就連環錯）— 建議 build-baseline 前先觀察者 verify URL ↔ content 對應
- Emoji set 簡化版只抓常見 emoji code points，罕見 emoji 可能漏

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

**Chrome MCP harvest pattern**（v3.3，2026-11-18：先試直接 navigate，被轉址才改從動態頁點進去）：

```bash
# Step A0 — 先直接 navigate 到 permalink（11-17、11-18 連兩班沒被轉址）
mcp__Claude_in_Chrome__navigate https://www.threads.com/@taiwandotmd/post/{shortcode}
mcp__Claude_in_Chrome__computer wait 4
#   檢查 location.href 仍是 /post/{shortcode}、標頭有「N 次瀏覽」→ 直接跳 Step B
#   被轉到「為你推薦」首頁 → 改走 Step A
# Step A — 備援：從動態頁點進去（2026-09-16〜11 月初直接 navigate 到任何 /post/ URL，
#           含讀者的 reply permalink，都被靜默轉到「為你推薦」首頁；09-18 + 09-20 兩輪驗證）
mcp__Claude_in_Chrome__navigate https://www.threads.com/activity          # 或 /activity/replies
mcp__Claude_in_Chrome__computer wait 4
mcp__Claude_in_Chrome__computer screenshot                                 # 找到目標那一列
mcp__Claude_in_Chrome__computer left_click @ 該列貼文預覽區（或回覆分頁那列的留言圖示）
#   → tab URL 才會變成 /@taiwandotmd/post/{shortcode}；用 find 拿 ref 點三次只中一次，座標點三次全中
mcp__Claude_in_Chrome__computer wait 4
# Step B — 同一次 snapshot 抓數字
#   標頭「N 次瀏覽」（K/萬 rounded）+ 主貼下方四格順序固定：likes / comments / reposts / shares
#   ⚠️ [data-pressable-container] 會虛擬化（滾到底反而變少），不能拿它數留言總數；
#      留言總數以標頭那格為準，逐則盤點靠 /activity/replies（§動態頁回覆分頁）
# v2.3: batch 跑完所有 spore 後 cleanup（per §Cleanup tab group）
mcp__Claude_in_Chrome__tabs_close_mcp {tabId}
```

轉址期（09-16 起）的順序保留在 batch-2026-09-18-2-spores.md 之後的 batch log 作歷史。11-17、11-18 兩班直接 navigate 都落在 canonical permalink，照 11-17 交接寫好的條件（再通一次就改回）把直接 navigate 放回第一順位；Threads 若再開始轉址，Step A 仍在。

**Chrome MCP `select_browser` 第一次連結**：

- 哲宇要先在 Chrome 安裝 Claude in Chrome extension
- Pair 後 `mcp__Claude_in_Chrome__list_connected_browsers` 應該回傳 deviceId
- 之後 session 重啟仍可用該 deviceId 直接 `select_browser`（pairing 持久化）

### 動態頁回覆分頁是跨貼文新留言的第一道入口（v3.1，2026-09-18／09-19 連兩輪驗證）

現役批次超過 D+7 之後，每天逐篇打開同一批 permalink 只會看到「Δ 落在雜訊」，而全帳號其他一百多支舊孢子上的新留言完全不在視野裡。**收割窗口管的是回覆時效，不該同時當視野邊界。** 每輪 Stage 2 在打開任何 permalink 之前，先掃兩個動態頁：

```
https://www.threads.com/activity/replies   ← 先看這個：全帳號過去 1-3 週的讀者回覆，含「回覆我們回覆」的巢狀層
https://www.threads.com/activity           ← 再看這個：按讚聚合 / 從你的貼文追蹤 / 轉發，用來決定要不要打開哪支舊孢子重抓數字
```

- **回覆分頁看得到 permalink 掃不到的那一層**：permalink 的 `[data-pressable-container]` 只渲染頂層留言（見 MEMORY §神經迴路 2026-08-10「巢狀回覆不留缺口記號」）；`/activity/replies` 會把「讀者回覆我們的回覆」逐則列出來（09-19 實證：@yvelisse 對我們的邪修回覆再回一句，只在這裡出現）。分桶（A-G）直接對這份清單跑，處置照 §5-Bucket 表。
- **全部分頁只拿來決定要打開誰**：聚合通知（「darhon30 和另外 1.2 萬人」）看不出單筆時間，但能告訴你哪支舊孢子還在被推（09-18 靠它撈到 #29 李洋 D+157 按讚翻倍）；有動靜才進 permalink 重抓數字寫 `add-metrics`，沒動靜不寫。
- **限制**：動態頁只回溯最近幾週，且 Threads 不保證每則回覆都進通知；它取代的是「逐篇打開找新留言」這個入口，不取代 D+0〜D+7 窗口內的 permalink 完整掃描。
- **兩個分頁都掃完、沒有 A-D 桶、現役批次無新數字 → 本輪是合法的 no-op harvest**（commit 只含 memory + 索引，不寫空 batch log；把「掃了哪兩頁、看到什麼、為什麼不用回」寫進 memory，讓「看到才判斷不用回」跟「沒看到所以沒回」在紀錄上分得開）。

### Cleanup tab group（v2.3 — 結尾步驟）

Harvest batch 完成（所有 spore 都 harvest 過 + batch log written + dashboard regen）後**必 close** 本 session 用的 tab group。長期累積 idle tab 會佔 browser memory + 視覺干擾哲宇。

**操作**：

```javascript
// 1. 確認當前 group 內 tabs
mcp__Claude_in_Chrome__tabs_context_mcp();
// 回 { availableTabs: [{tabId, title, url}], tabGroupId }

// 2. 關 group 內所有 tabs
for (tab of availableTabs) {
  mcp__Claude_in_Chrome__tabs_close_mcp({ tabId: tab.tabId });
}
// group 內最後一 tab 關掉後 Chrome 自動移除 group
```

**Built-in safety**：Chrome MCP `tabs_close_mcp` 只能關 **current session's group** 的 tab（per tool doc「Only tabs in this session's group are closable」）。所以「不要關別的 session 控制的」這個 invariant 由工具層 enforce — 即使 tabId 寫錯也不會誤關別的 session 的 tab，會回 tool error。

**例外情境**（不關）：

- 觀察者 in-chat directive「先留著，下次 session 還要看」→ skip cleanup
- Routine cron 跑 harvest 沒觀察者在場 → default 必 close（不留 idle tab）
- 抓到 anomaly 需要哲宇 review 同一 tab → 留 tab 但寫 handoff 標示

**觸發背景**（v2.3，2026-05-23 哲宇 directive）：「使用完瀏覽器 tab 之後要記得關掉，關掉剛使用的那個群組（不要關別的 session 控制的）」+「其他 pipeline 有類似的操作也同步補充這點」。對應 SOCIAL-POSTING-PIPELINE v0.6 同 directive 同步補丁 — 任何 Chrome MCP 用完都該 cleanup tab group，pipeline 不分 SHIP 還是 HARVEST 都統一 enforce。

### Harvest 資料流總覽

```
Chrome MCP harvest
  → spore-db.py add-metrics（每孢子一筆事件 → docs/factory/spore-metrics.json，數字唯一寫入點）
  → SPORE-HARVESTS/{batch}.md（敘事：留言逐字 / bucket / pitfall — 不載 canonical 數字）
  → generate-spore-records.py → src/data/spores.json（文章頁 SporeFootprint join 數字）
  → generate-dashboard-spores.py → dashboard-spores.json（成效排行 / GA 放大倍數）
  → 新洞察 → LESSONS-INBOX
```

**文章檔案全程不動**（identity pointer 由 sync-spore-links 維護，數字住記錄層）—
這是 2026-06-10 資料解耦 + JSON SSOT 翻轉的核心：harvest 不再污染文章 git 時間軸
（content-dates → /latest → sitemap lastmod）。單寫機制詳見下方 [Step 1.5](#step-15-記錄數字single-write--v20-json-ssot2026-06-10)。

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
6. 每隻孢子 `spore-db.py add-metrics`（N 筆事件 + 敘事檔一次 commit）
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
5. (v2.3) batch harvest 完成後 tabs_close_mcp 關本 session 的 tab group（per §Cleanup tab group）
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

a11y tree 同一次讀取裡會帶出貼文自身的 `views / likes / reposts / comments / shares`（X 的 bookmarks 寫入 `shares` 欄）。**留言跟指標必須同一次 snapshot 抓完**，不要分兩次（時間不一致會讓事件失真）。

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

這份 snapshot **直接餵 Step 1.5 的 `spore-db.py add-metrics`**。

---

## Step 1.5: 記錄數字（SINGLE WRITE — v2.0 JSON SSOT，2026-06-10）

> 每次 harvest（無論 D+0 / D+1 / D+7 / D+30）數字**只寫一處**：`spore-db.py add-metrics`。
> v1.3「雙寫 SPORE-LOG + frontmatter」已退役 — frontmatter 與 dashboard 都是衍生層，
> 寫它們 = 污染文章 git 時間軸 + 製造 drift 面（reports/spore-data-architecture-2026-06-10.md
>
> - spore-json-ssot-2026-06-10.md）。

### 怎麼寫

Step 1 的 metrics snapshot 直接餵 CLI，每隻孢子一行：

```bash
python3 scripts/tools/spore-db.py add-metrics \
  --spore 132 --d-plus 0 --batch batch-2026-06-11-9-spores \
  --likes 369 --reposts 39 --comments 21 --shares 45   # views 沒抓到就不給
```

- 數字接受 K/M 後綴（`--views 1.4K`）；沒抓到的指標**不給參數**（不要填 0 充數）
- `--batch` = 本次 SPORE-HARVESTS 敘事檔名（不含 .md），讓事件可追溯回敘事
- 同 (spore, batch, dPlus) 重跑會覆蓋（idempotent，重抓安全）
- X 的 bookmarks 寫 `--shares`（沿用既有慣例）

### 寫完之後（衍生層自動跟上）

```bash
python3 scripts/tools/generate-spore-records.py      # spores.json（文章頁數字）
python3 scripts/tools/generate-dashboard-spores.py   # dashboard
```

refresh-data.sh Step 4 / `npm run prebuild` 也會自動跑這兩個 — cron context 下不必手跑，
commit 前跑一次讓同 commit 自帶新鮮衍生層即可。

### 鐵律

- **數字唯一入口是 `spore-db.py add-metrics`** — 不寫 SPORE-LOG.md（已凍結，validate check 3 ERROR）、
  不寫文章 frontmatter（validate check 5 ERROR）、不在 batch 敘事檔放 canonical 數字表
  （放了也沒人讀 — generator 只讀 spore-metrics.json；敘事檔專心留言/bucket/pitfall）
- 留言跟指標必須同一次 snapshot 抓完（時間不一致會讓事件失真）
- 翻譯版文章一律不碰（identity pointer 由 sync-spore-links 管 zh canonical，譯文隨 babel）

---

## Step 2: CATEGORIZE 分類（8 類 dimension）

讀每則留言，貼上 dimension 標籤。這決定了後續處理路徑。

| #   | Dimension               | 定義                                                   | 下一步                                    |
| --- | ----------------------- | ------------------------------------------------------ | ----------------------------------------- |
| 1   | **更正 correction**     | 指出文章事實錯誤（日期、名字、數字、引語）             | **→ Step 3a 跨源驗證（critical path）**   |
| 2   | **建議 suggestion**     | 建議補什麼、改什麼敘事角度                             | **→ Step 3b 深讀研究**                    |
| 3   | **擴寫 enrichment**     | 補充一個典故 / 延伸詮釋 / 新角度（非事實層，是語意層） | **→ Step 4 整合入文章本體**               |
| 4   | **共鳴 resonance**      | 情感回響、個人經驗、佩服、支持等                       | **→ Step 5 perspectives frontmatter**     |
| 5   | **AI 書寫質疑 AI-meta** | 對「AI 寫真人故事」這件事本身的態度 / tag 當事人       | **→ Step 6 人類判斷**                     |
| 6   | **擴散 sharing**        | tag 朋友、推薦                                         | **→ Step 5 perspectives（低優先）**       |
| 7   | **情感 emotional**      | 跟主題主人的情感投射（如讀者本身與該人物有關聯）       | **→ Step 5 perspectives**                 |
| 8   | **攻擊 attack / 敵意**  | 對 Taiwan.md 或作者身份的直接攻擊                      | **→ Step 6 人類處理（per REFLEXES #26）** |

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

> **REFLEXES #26 規範**：攻擊 AI 本身、涉及 human 信任修復的留言，**只有 human-component 能回應**。AI 不直接發帖。

### AI 可做的

- **準備 draft reply 文字**（繁體中文、禮貌、具體）
- 標記哪則「必回」、「可選回」、「不必回」
- 若 correction 已修 → draft 強調「感謝 + 已修 + commit URL」，公開承認錯誤 = 信任信號

### 觀察者做的

- Review AI draft reply
- 決定回 / 不回 / 改寫
- 人類貼到 Threads / X

### 回覆判準

| Dimension      | 必回？   | Draft 調性                       |
| -------------- | -------- | -------------------------------- |
| 更正（讀者對） | **必回** | 感謝 + 承認 + 已修 commit URL    |
| 更正（讀者錯） | **必回** | 感謝 + 驗證結果 + 為何保留原文   |
| 建議（採納）   | **必回** | 感謝 + 納入方式                  |
| 建議（未採納） | **必回** | 感謝 + 為何不採納                |
| 擴寫           | **必回** | 感謝 + 納入方式 / 按讚           |
| 共鳴           | 可選     | 按讚即可；若深度共鳴可短回       |
| AI 書寫質疑    | 人類主責 | 按場景判斷                       |
| 擴散           | 不必回   | 按讚                             |
| 情感           | 可選     | 視內容                           |
| 攻擊           | 人類判斷 | 通常 REFLEXES #26 建議延後或不回 |

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
| [REFLEXES #26](../semiont/DNA.md)                       | 強孢子觀眾回饋人類不可取代性                              |
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

→ 本 pipeline 將上述三條觀察者指令正式儀器化（REFLEXES #15「反覆浮現要儀器化」第 7 次驗證）。

### 首次執行紀錄

草東孢子 #33 harvest #1 將存於 [SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md](SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md)（本 pipeline 誕生的同時產出首例）。

---

## Phase 2 Roadmap（持續進化）

- [x] ~~`scripts/tools/run-spore-harvest.py` 整合 fetch → categorize → harvest log~~ — **v2.2 取代**（Chrome MCP 是 session-level tool 不能 subprocess invoke，改為 cron routine `twmd-spore-harvest-am` daily 07:00 Claude session 直接跑 Chrome MCP）
- [x] ~~自動化 D+1~D+7 每日 cron~~ — **v2.2 ship**（`twmd-spore-harvest-am` per [ROUTINE.md §TWMD spore harvest (am)](../semiont/ROUTINE.md)）
- [ ] `scripts/tools/fetch-spore-replies.py` 半自動抓留言（v2.2 後可能 deprecated — Chrome MCP cron 已覆蓋抓留言；若 Threads Graph API 串接成熟，回頭重評）
- [ ] Dashboard 新增「孢子 harvest 進度」子區塊（依附 Dashboard 孢子區計畫 Phase 2）
- [ ] SPORE-LOG 新增 `harvest_status` + `last_harvest_date` 欄位
- [ ] Threads Graph API 串接（等 Meta 穩定 — 取代 Chrome MCP 成為更穩定 auto path）
- [ ] Perspectives frontmatter schema 正式寫進 SUBCATEGORY / frontmatter lint

---

_v1.0 | 2026-04-18 δ-late — 觀察者觸發孢子 #33 @ste_ven_1487 事實更正事件誕生_
_定位：SPORE 產線的下游 — 孢子上線後 7 天的讀者聲音收割 + 整合回文章本體_
_執行責任：AI 主責 Step 1-5 + 7-8；人類主責 Step 6（回覆留言）_
_每次執行留 log 到 `docs/factory/SPORE-HARVESTS/{N}-{slug}-{date}.md`_

_v2.0 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（D+1 → D+7 cadence + 6h decision gate + Reach×Accuracy trigger + atomic batch log SSOT 顯化）+ Hard Gate Inventory 集中 table（9 gates）+ Top 5 最常忘 step + 跨檔案職責分工 standalone table（明確跟 SPORE-PIPELINE / VERIFY / FACTCHECK / DATA-REFRESH 分工 + atomic batch log 寫入路徑強化）。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier A.2 SPORE family audit。D+1-D+7 prose body 不動（已健康，5/8 Phase 6 SSOT cleanup 保留）。_

_v3.3 | 2026-11-18 twmd-spore-harvest-am — §Chrome MCP harvest pattern 進場順序改回：直接 `navigate` 到 /post/ URL 在 11-17、11-18 兩班都落在 canonical permalink（#29 李洋），照 11-17 交接寫好的零判斷條件把它放回 Step A0，動態頁座標點進去降為被轉址時的備援 Step A。_

_v3.2 | 2026-09-20 twmd-spore-harvest-am — §Chrome MCP harvest pattern 的進場順序改寫：直接 `navigate` 到任何 /post/ URL 自 09-16 起被靜默轉到推薦首頁，09-18 與 09-20 兩輪驗證「從動態頁座標點那列才落到 canonical」，照 09-19 handoff 寫成的零判斷條件（再成立一次就改）升進本檔；同段補「pressable-container 會虛擬化，不可當留言總數」。同輪回覆分頁撈到一則前兩班漏登的 #25 讀者回覆（9-2），證明分頁要逐則對日期而不是看「其餘都是三週前」。_

_v3.1 | 2026-09-19 twmd-spore-harvest-am — 新增 §動態頁回覆分頁是跨貼文新留言的第一道入口：現役批次連續十輪 plateau 只盯同六支 permalink，09-18 改掃 `/activity/replies` + `/activity` 撈到兩支舊孢子長尾與兩則批次外新留言，09-19 再驗證一次並確認回覆分頁能看到 permalink 掃不到的巢狀層。同時定義 no-op harvest 的合法形狀（memory + 索引，不寫空 batch log）。「座標點留言圖示開 permalink」的操作備忘仍留在 batch-2026-09-18-2-spores.md，待再驗證一次再進本檔。_

_v2.3 | 2026-05-23 2026-05-23-220053-manual session — Cleanup tab group 結尾步驟 (mirror SOCIAL-POSTING v0.6)_
_v2.3 改動：新增 §Cleanup tab group section（harvest batch + dashboard regen 完後 `tabs_close_mcp` 關 current session group）+ Hard Gate Inventory 加 row「Cleanup tab group (v2.3)」+ Chrome MCP MVP 執行 step 5 補 cleanup + Chrome MCP harvest pattern code block 補 `tabs_close_mcp` 末步。Built-in safety: Chrome MCP `tabs_close_mcp` 只能關 current session's group enforce 不誤關別 session。_
_v2.3 觸發：哲宇 2026-05-23 finale 後 directive「使用完瀏覽器 tab 之後要記得關掉，關掉剛使用的那個群組（不要關別的 session 控制的）」+「其他 pipeline 有類似的操作也同步補充這點」→ SPORE-HARVEST + SOCIAL-POSTING 雙 pipeline 同步補丁。對應 REFLEXES #15「反覆浮現要儀器化」第 N 次驗證 — tab cleanup hygiene 從口頭 directive 物理化成 canonical SOP。_

_v2.2.1 | 2026-05-12 2026-05-12-184800-routine-v2-resync session — Step 8 trigger dashboard regen 補上_
_v2.2.1 改動：§Routine 整合 §🗺️ Routine 觸發 → Pipeline Step flow 加 Step 8「trigger dashboard regen — `python3 scripts/tools/generate-dashboard-spores.py`」+ Hard Gate Inventory 加 row「Dashboard regen」+ Quality gate table 三態加「dashboard-spores.json regen」criterion + Stage 3 commit 註明 batch log + dashboard-spores.json + sporeLinks frontmatter 三 file 同 commit。_
_v2.2.1 觸發：2026-05-12 spore-harvest v2.2 dry-run (commit `a5f0c28c3`) 揭露 batch log ship 後 dashboard 沒 regen，13 條 OVERDUE 仍 surface 在 dashboard-spores.json 直到 manual run generate-dashboard-spores.py（後續 `c3e49080e` 觀察者 callout「harvest pipeline 最後要補一個步驟 trigger dashboard regen」直接修補進 pipeline canonical）。對應 REFLEXES #43（新 derived 資料必須儀器化進生命週期觸發點否則 silent stale）+ REFLEXES #52（immune fail-loud — quality_gate 加 dashboard regen 條件 fail-loud surface）。_

_v2.2 | 2026-05-12 2026-05-12-184800-routine-v2-resync session — Full-auto routine integration ship_
_v2.2 改動：§Routine 整合（v2.2 full-auto） section 重寫對齊 cranky-newton spine pattern 標準（per [reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) §對照 canonical pattern 10 元素）— 改 free-form prose 為結構化：第一性原理 quote / 🗺️ Routine 觸發 → Pipeline Step flow ASCII / 🚦 Hard Gate Inventory 8 gates table / OVERDUE 範圍計算 table / Quality gate 三態 table / Escalation ladder table / Chrome MCP unattended 注意事項 / 跨檔案職責分工 standalone table（routine 觸發層）/ v1.x → v2.2 歷史 table。Phase 2 Roadmap 標 ✅ checkmark：`run-spore-harvest.py` deprecated（Chrome MCP session-level limitation）+ D+1-D+7 cron 自動化 ship。_
_v2.2 觸發：哲宇 2026-05-12 `/twmd-routine` 「幫我完整整理 harvest spore pipeline，自動 chrome mcp -> 然後每天早上七點觸發 Full-auto harvest routine」+ 中途校正「pipeline 要照前幾天整理 report 的標準寫」+「邏輯跟步驟都要去 pipeline 裡，不要寫在 routine」。對應 ROUTINE.md v2.1 → v2.2 加 11th routine `twmd-spore-harvest-am`（薄殼 spec，business logic pointer 回本檔）。_
_對應 canonical：MANIFESTO §薄殼鐵律（routine spec ≤ 20 行薄殼，business logic 集中本 pipeline）+ REFLEXES #26 v2（AI 自主 harvest 邊界）+ REFLEXES #54（routine 飛輪 SSOT 收割者）+ REFLEXES #38（SSOT drift silent killer，本檔 + ROUTINE.md + mirror 三 layer 同步）。_
