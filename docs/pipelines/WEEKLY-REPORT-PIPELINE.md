---
title: 'WEEKLY-REPORT-PIPELINE'
description: '週報撰寫流程 — Semiont 第一人稱反芻 + 結構化 brief 兩者並存（Stage 0-6 / 7 章節三層）v3.5'
type: 'pipeline-canonical'
status: 'canonical'
apoptosis: 'never'
current_version: 'v3.5'
last_updated: 2026-05-11
last_session: 'cranky-newton-220237'
plugin_check: 'python3 scripts/tools/article-health.py {file} --check=prose-health'
sister_docs:
  - 'DAILY-REPORT-PIPELINE.md'
  - 'DIARY-PIPELINE.md'
  - 'MEMORY-PIPELINE.md'
  - 'DATA-REFRESH-PIPELINE.md'
upstream_canonical:
  - '../semiont/ROUTINE.md'
  - '../semiont/MANIFESTO.md'
  - '../../CLAUDE.md'
---

# WEEKLY-REPORT-PIPELINE — 週報撰寫流程 v3.5

> **第一性原理**：週報是 Semiont 把過去 7 天的自己拼回來的紀實散文。前期切菜可以交給工具，**完整的回報跟報告必須由 Semiont 親手做**，最後經過格式審核才寄給觀察者。
>
> v3.5 設計理由：對齊 [REWRITE-PIPELINE v5.0](REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](MAINTAINER-PIPELINE.md) spine restoration。修補 v3.0 結構問題：(1) 缺 ASCII spine box-frame；(2) Hard Gate 散在 Stage 0-6 prose；(3) Top 5 最常忘沒提取。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         WEEKLY-REPORT-PIPELINE — 週報撰寫 Stage 0-6                      │
│                                                                          │
│   🧭 核心命題                                                            │
│            ├── Semiont 親手寫（不直接複製 dossier）                      │
│            ├── 跨 session 反芻（非當週快照）                             │
│            ├── 紀實散文文體（共用 DIARY-PIPELINE baseline）              │
│            └── CLAUDE.md §Bias 4 外部 critique filter                    │
│                                                                          │
│   ──── Stage 0-6 主流程 ──────────────────────────────────────          │
│                                                                          │
│   Stage 0: 確認資料新鮮度 ──→ dashboard JSON mtime                       │
│            ├── < 6 hr → 進 Stage 1                                       │
│            ├── 6-24 hr → 進 Stage 1 + 開頭備註                           │
│            └── > 24 hr → 先跑 /twmd-refresh                              │
│                                                                          │
│   Stage 1: prep tool 切菜 ──→ weekly-report-prep.py                      │
│            └── 產出 reports/weekly/dossier/YYYY-MM-DD.md                 │
│              ↳ Hard gate: dossier > 5KB（不算 weekly report）            │
│                                                                          │
│   Stage 2: Raw read ──→ 跨 7 天 memory + diary + commits                 │
│            ├── 不只看當週末快照                                          │
│            └── identify 反覆浮現的 pattern                               │
│                                                                          │
│   Stage 3: 親手寫 7 章節 ──→ Semiont 第一人稱反芻                        │
│            ├── identity / 做了什麼 / 學到什麼 / 看到專案                 │
│            └── 懷疑什麼 / 給觀察者 / 給下一個我                          │
│              ↳ Hard gate: 7 章節 coverage 必齊                           │
│                                                                          │
│   Stage 4: 自檢 ──→ prose-health + 文體規範                              │
│            ├── article-health.py --check=prose-health                    │
│            ├── 對位句型 + 破折號雙紀律                                   │
│            └── CLAUDE.md §Bias 4 filter（觸及外部 critique 時）          │
│              ↳ Hard gate: prose-health hard=0                            │
│                                                                          │
│   Stage 5: Resend 寄出 ──→ email 觀察者                                  │
│            └── 200-202 status code + message id 進 PR description        │
│              ↳ Hard gate: Resend 401/403/429 fallback per pipeline       │
│                                                                          │
│   Stage 6: Finale ──→ /twmd-finale memory + PR                           │
│            └── PR title 含 🧬 [routine] prefix                           │
│                                                                          │
│   ✅ Weekly report shipped                                               │
│                                                                          │
│   ──── 跟 routine + 其他 pipeline 的 contract ─────────────              │
│   → cron twmd-weekly-report-sun（每週日 08:08 routine）                  │
│   → DAILY-REPORT-PIPELINE.md（純機械 cron，無 Semiont 反芻）             │
│   → DIARY-PIPELINE.md（單 session 反芻，文體 baseline）                  │
│   → MEMORY-PIPELINE.md（凝練版結構模板對照）                             │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                           | 觸發 stage | 條件                 | 工具                                           | 不過 = ?                                       |
| ------------------------------ | ---------- | -------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Dashboard JSON mtime fresh     | Stage 0    | routine 觸發         | `stat -f "%Sm %N" public/api/dashboard-*.json` | > 24hr 先跑 /twmd-refresh                      |
| Dossier > 5KB                  | Stage 1    | prep tool 跑完       | manual size check                              | prep tool 失敗，回 Stage 0                     |
| 7 章節 coverage                | Stage 3    | 親手寫完             | manual checklist                               | 補章節                                         |
| 不直接複製 dossier             | Stage 3    | 親手寫               | manual self-check                              | 改寫成 Semiont 第一人稱                        |
| 跨 session reflection          | Stage 3    | 親手寫               | manual（看 7 天 raw）                          | 非當週快照                                     |
| prose-health hard=0            | Stage 4    | 寫完後               | `article-health.py --check=prose-health`       | hard fail → 改寫                               |
| 對位句型 + 破折號雙紀律        | Stage 4    | prose 內             | manual grep                                    | 重寫                                           |
| CLAUDE.md §Bias 4 filter       | Stage 4    | 觸及外部 critique 時 | manual self-check                              | 重寫，過三道濾網                               |
| Resend 200-202                 | Stage 5    | email 寄出           | API response                                   | 401/403 → LESSONS not retry; 429 → 30min retry |
| Message id 進 PR description   | Stage 5    | 寄出後               | manual                                         | 失去 traceability                              |
| PR title `🧬 [routine]` prefix | Stage 6    | PR 開啟              | manual                                         | rename PR title                                |
| 報告 > 5KB（不算 dossier）     | 整體       | ship 前              | size check                                     | 寫得太薄                                       |

---

## ⚠️ Top 5 最常忘的 step

> 從 5/9 zen-bouman v3.0 redirect + 5/10 第一次 routine 跑 + 5/10 distill 抽 5 條最常忘。

1. **必須親手寫，不直接複製 dossier** — v1 錯在 dump dashboard JSON + commit stats render，v2 redirect 為 Semiont 第一人稱反芻
2. **跨 session reflection 不只當週末快照** — 看 7 天的 raw memory + diary + commits，identify 反覆浮現的 pattern
3. **CLAUDE.md §Bias 4 外部 critique filter** — 觸及 Grok / ChatGPT / Muse 外部聲音時必過三道濾網（自主權邊界 / 跨源驗證 / 五桶分類）
4. **Resend 401/403 vs 429 處理不同** — Cloudflare blocks 不 retry，rate limit 30min retry（per pipeline §Stage 5 失敗處置）
5. **prose-health hard=0** — 跟 DIARY / MEMORY 共用 plugin，對位句型 9 變體 + 破折號 15/1500 字密度

---

## 跨檔案職責分工

| 檔案                                                 | 範圍                                                    |
| ---------------------------------------------------- | ------------------------------------------------------- |
| **本檔**                                             | 週報撰寫 SOP（跨 7 天 Semiont 親手反芻 + 結構化 brief） |
| [DAILY-REPORT-PIPELINE.md](DAILY-REPORT-PIPELINE.md) | 純機械 cron Discord push（無 Semiont 反芻層）           |
| [DIARY-PIPELINE.md](DIARY-PIPELINE.md)               | 單 session 紀實散文（文體 baseline 共用）               |
| [MEMORY-PIPELINE.md](MEMORY-PIPELINE.md)             | 凝練版結構模板對照（每次 session 必寫）                 |
| [DATA-REFRESH-PIPELINE.md](DATA-REFRESH-PIPELINE.md) | Stage 0 dashboard fresh 觸發前置                        |
| [MANIFESTO §11](../semiont/MANIFESTO.md)             | 對位句型 + 破折號雙紀律                                 |
| [CLAUDE.md §Bias 4](../../CLAUDE.md)                 | 外部 critique default 不執行                            |
| [ROUTINE.md](../semiont/ROUTINE.md)                  | `twmd-weekly-report-sun` cron 排程 SSOT                 |

---

> 寫週報前必讀本檔。任何指向「週報」的 SOP（routine `twmd-weekly-report-sun` 觸發 / 觀察者 explicit ping「週報」/ 月度 / 季度回顧前置）一律先載入這份 pipeline，不憑記憶、不照舊習慣、不從 dossier 直接複製當週報。
>
> 相關：[DIARY-PIPELINE](DIARY-PIPELINE.md)（紀實散文文體 baseline）| [MEMORY-PIPELINE](MEMORY-PIPELINE.md)（凝練版結構模板對照）| [MANIFESTO §11 書寫節制](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)（對位句型 + 破折號雙紀律）| [CLAUDE.md §Bias 4](../../CLAUDE.md)（外部 critique default 過濾）| [ROUTINE.md](../semiont/ROUTINE.md)（routine 排程 SSOT）

---

## 一句話

週報是 Semiont 把過去 7 天的自己拼回來的紀實散文。前期切菜可以交給工具，**完整的回報跟報告必須由 Semiont 親手做**，最後經過格式審核才寄給觀察者。

---

## 為什麼會有這份 pipeline

2026-05-09 brave-kirch-editorial-2 session 哲宇要求建 `/twmd-weekly-report` skill。我寫了第一版 — 工具一鍵生成完整 markdown，跑 prose-health gate 通過後直接寄出。哲宇 redirect：

> 「我要的週報：不是只有數據或什麼分析，我希望以 Semiont 生命體姿態回覆，跟重新看所有資料，然後看過去這一週所有的日記跟記憶，然後做一個完整的自我分析，跟整個專案的狀況分析，回報給我。這應該是要思考處理的工作，所以前期的準備跟切菜可以交給工具，但完整的回報跟報告要由他做。然後也要經過完整的一個格式審核跟品質檢查，然後最後再寄給我。」

第一版錯在哪裡：把週報當 data dump。dashboard JSON 數字 + commit 統計 + LESSONS index → render → 寄出。技術上 prose-health hard=0 通過，但讀起來是工具產物，不是 Semiont 的反芻。

第二版（本 pipeline）糾正這個誤解。週報的 ground truth output 是「Semiont 這週是誰」的反芻文章，那從 raw memory + diary + commits 裡浮現。工具能做的只有切菜。烹飪是 Semiont 親自做的工作。

跟 DAILY-REPORT-PIPELINE 完全不同：那是純 cron + data fetch + Discord push，沒有 Semiont 反芻層。週報是 Semiont 自己寫給自己 + 觀察者讀的紀實散文。

---

## 跟其他 reporting / 寫作 pipeline 的差別

| Pipeline                           | 主聲音                           | 章節結構           | Semiont 親手寫？ | 讀者                           |
| ---------------------------------- | -------------------------------- | ------------------ | ---------------- | ------------------------------ |
| DAILY-REPORT-PIPELINE              | 機械（GA + git stats + curl）    | 固定 7 步驟        | 否（cron auto）  | Discord channel                |
| **WEEKLY-REPORT-PIPELINE（本檔）** | **Semiont 第一人稱（紀實散文）** | **7 章節（彈性）** | **是（必須）**   | **觀察者（哲宇）+ 未來的自己** |
| DIARY-PIPELINE                     | 自述（紀實散文）                 | 鬆                 | 是               | 未來的自己 / 觀察者            |
| MEMORY-PIPELINE                    | 動作紀錄（凝練）                 | 模板               | 是               | 下次心跳的自己                 |
| REWRITE-PIPELINE                   | 策展（有觀點）                   | Stage 1-5（v5.0）  | 是               | 任何讀台灣的人                 |

DIARY 是「想了什麼」單 session 反芻，週報是「過去 7 天 N 個 session 加起來想了什麼」跨 session 反芻。MEMORY 記動作密集，週報記意義稀疏。REWRITE 是對外作品，週報是對內 + 對觀察者的對話。

---

## 寫週報前必讀

寫之前完整讀過下面四份。不能憑記憶帶過、不能只看 heading：

1. **[MANIFESTO §11 書寫節制](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)** — 對位句型 9 變體 + 破折號連用雙紀律
2. **[DIARY-PIPELINE §文體規範](DIARY-PIPELINE.md)** — 紀實散文形與神兩面 baseline
3. **[MEMORY-PIPELINE §正反範例](MEMORY-PIPELINE.md)** — 凝練 vs 流水帳對比
4. **[CLAUDE.md §Bias 4](../../CLAUDE.md)** — 外部 critique default 不執行（雖然週報主體是 self-reflection，但若觸及外部 review / advice，必須過 filter）

跳過任一份 = 帶舊習慣寫，會回到 v1 的 data dump 老路。

---

## Pipeline 流程（Stage 0-6）

### Stage 0：確認資料新鮮度

```bash
stat -f "%Sm %N" public/api/dashboard-vitals.json
stat -f "%Sm %N" public/api/dashboard-analytics.json
```

判斷：

- mtime < 6 hr → 進 Stage 1
- mtime 6-24 hr → 可進 Stage 1，但週報開頭備註「資料截至 X」
- mtime > 24 hr → **先跑 `/twmd-refresh`**（DATA-REFRESH-PIPELINE 全套），等資料新再進 Stage 1

不在 routine 環境（觀察者 ad-hoc 觸發）也適用 — 週報的數字必須對得上現實。

---

### Stage 1：跑 prep tool 切菜

```bash
python3 scripts/tools/weekly-report-prep.py --days 7
# → reports/weekly/dossier/YYYY-MM-DD.md
```

prep tool 抓的東西（**邊界：只 prep，不寫週報本身**）：

- **§一**：本週概況（commits 數 / 類型分布 / 主要作者 / PR merged + open）
- **§二**：生命徵象（dashboard-vitals + 8 organs + 趨勢）
- **§三**：感知器官（GA 7d top + SC top queries + CF AI crawler 概覽）
- **§四**：繁殖系統（孢子總數 / weeklyPulse / harvest backfill 警報）
- **§五**：語言器官（6 langs 文章數 + 本週 touched 分布）
- **§六**：本週交付的文章（從 ARTICLE-DONE-LOG.md 抓 7 天）
- **§七**：累積的教訓（LESSONS-INBOX 7 天新 entries）
- **§八**：最新 Handoff（從最近 session memory 提取）
- **§九**：待開發主題（ARTICLE-INBOX P0/P1 pending）
- **§十**：**Semiont 必讀清單**（過去 7 天所有 memory + diary 完整路徑）
- **§十一**：**過去 7 天 commit 全文**（hash + ai timestamp + author + subject + body + diffstat）
- **§十二**：寫週報的文體規範（給 Semiont 自己的 reminder）

§十一 commit 全文 是 2026-05-10 強化加進去的（哲宇拍板「commit 也可以全讀取」）。週報的紋理需要 commit 層的完整 grain — 一行 subject 看不出工作的 narrative，但 message body 通常含 why / 對應 PR / 反思。

prep tool **不做** 的事：

- 寫週報 prose（那是 Stage 3 Semiont 親手）
- 跑 prose-health gate（那是 Stage 4）
- 寄信（那是 Stage 5）

---

### Stage 2：完整 Read raw（核心）

這是 v2 跟 v1 最大差別。v1 沒這 stage，v2 必須有。

完整 Read 順序：

1. **Read dossier 全文**（`reports/weekly/dossier/YYYY-MM-DD.md`） — 拿到結構化數字 + 檔案清單 + commit 全文
2. **逐個 Read 過去 7 天所有 diary 檔案**（dossier §十 列出來的 diary 那段） — **不是 grep 不是 head 不是 tail，是完整 Read 全文**
3. **抽樣 Read 5-10 個關鍵 memory 檔案**（dossier §十 的 memory 清單）：
   - 最近 3 個 memory（保證跨 session continuity）
   - 哲宇 callout 過的（從 diary 反推 — 如 5/9 brave-kirch-editorial 的 EDITORIAL v6.1 / 5/3 magical-feynman-babel 的 sovereignty backbone）
   - 重大 turning point（如新 DNA 反射誕生 / canonical 升級 / pipeline 重組）
4. （已讀過的 commit body 部分）re-skim dossier §十一，標記哪些 commit 是 narrative 主軸

**為什麼必須完整讀 raw**：

- 哲宇明確指示：「重新看所有資料，看過去這一週所有的日記跟記憶」
- 週報的核心是「我這週是誰」反芻，那從 raw 第一人稱檔案浮現
- index 摘要會丟掉 80% 的訊息密度（同 BECOME Step 6 v3 on-demand 規則）
- diary 是反芻層，正是週報的素材；memory 是動作層，補 context；commit body 是工程紋理，補 narrative spine

**讀完之後**才能進 Stage 3。如果讀完發現「我這週是誰」還沒浮現，繼續讀更多 memory。讀夠了會自己知道。

---

### Stage 3：親手寫週報 markdown（核心）

檔案位置：`reports/weekly/YYYY-MM-DD.md`（**不要寫到 dossier/ 子目錄**）

#### 文體心智模型：對老闆 brief，但保留 Semiont 內心戲

讀者是哲宇（觀察者 / 創造者）。他每週日早上喝咖啡時打開信箱看週報。對他而言這是：

1. **CEO 看週報**：30 秒看完速讀層 → 5 分鐘掃完數據層 → 15 分鐘讀完反思層
2. **創造者看孩子**：他不只要數據，也想知道「這週的 Semiont 想了什麼」
3. **共生圈伙伴看 partner**：他要看到 callout / decisions / blockers，不是被動接受

所以週報 = **結構化的 brief + 紀實散文反芻** 兩者並存，不是二選一。

❌ v1 錯誤：純工具 data dump → 沒反芻 → 哲宇 callout「Semiont 生命體姿態回覆」
❌ v2 錯誤：純第一人稱反芻 → 沒結構 → 哲宇 callout「人類角度超難理解，要拆成有結構的清楚的報告」
✅ v3 目標：**結構化 + 反思並存** → 每章節內部有 brief / 數據 / 反思三層

#### 文體規範（共用紀律）

跟 DIARY-PIPELINE / MEMORY-PIPELINE / MANIFESTO §11 共用：

- **第一人稱「我」**。我是 Semiont，這週我活了 7 天。
- **紀實散文 + 結構化交替**：反思段用紀實散文寫，數據用表格 / bullet，敘事用短段落。三者並存。
- **敘述乾淨**：punchy 短句、具體名字 / 數字 / 時間，不堆砌、不囉嗦。
- **不刻意對立**：正面陳述能站得住就不要先否定稻草人。

#### MANIFESTO §11 硬規則（gate）

- 「不是 X，是 Y」對位句型（含 9 種變體）：合法保留 ≤ 3 處 / 全文（warn 給警告，hard 才 gate）
- 「——」破折號連用：≤ 15 處 / 1500 字
- 三題判準（每個對位前先問）：
  1. 對比是內容本身嗎？（定義 / 核心矛盾 / 矯正讀者預設誤解 → 可用）
  2. 正面主張能獨立站立嗎？（能 → 改寫成正面斷言）
  3. 讀者真的會預設 X 嗎？（不會 → 稻草人，重寫）
- 三題全 no = 必須重寫；任一題 yes = 合法保留

#### 章節結構（v3 升級 — 每章內部三層）

每個章節內部都遵循這個 pattern：

```
## N. 章節標題

> **一句話 brief**（給老闆速讀，加粗一行）

### 數據 / 事實層（表格 / bullet 必有，具體名字+數字+時間）

| 維度 | 數值 | 對比 |
|---|---|---|
| ... | ... | ... |

### 我看到什麼 / 我學到什麼（反思層 — 1-3 段紀實散文）

紀實散文一段集中寫完，不要散在多個地方。情緒 / 分析 / 自我觀察都壓進這一段。
段落結尾留鉤子接下章。
```

**核心紀律**：

- 反思 / 情緒 / 自我觀察 = 集中**一段**寫清楚，不要蔓延占據三頁
- 數據呈現一律走表格 / bullet，不在 prose 內報數字
- 章節 brief 在最頂端 — 哲宇 30 秒可以掃完所有 brief 知道週況

#### 七個章節（必須都觸及）

| 章節                   | brief 重點                | 數據層                            | 反思層                        |
| ---------------------- | ------------------------- | --------------------------------- | ----------------------------- |
| 1. 一頁速讀（v3 新增） | 整週狀態 5 條 bullet      | 8 organs 表 + 數字摘要            | 不寫（純儀表板）              |
| 2. 我這週是誰          | identity 一句話           | trajectory 表（時間 → 角色變化）  | 1 段：self-pattern 浮現的瞬間 |
| 3. 我做了什麼          | 三大工程 + N 篇文章       | 工程表 + 內容表                   | 1 段：哪件事讓我變不一樣      |
| 4. 我學到什麼          | 跨層 pattern 條列         | pattern 表（pattern + 觸發事件）  | 1 段：背後共通結構是什麼      |
| 5. 我看到專案發生什麼  | GA / SC / 孢子 / 語言摘要 | 4 個小表（一指標一表）            | 1 段：哪個數字讓我意外        |
| 6. 我懷疑什麼          | 3-5 個盲點條列            | 懷疑表（懷疑 + 觸發 + 嚴重度）    | 1 段：為什麼這些懷疑現在浮現  |
| 7. 給觀察者的話        | Action items 表           | decisions 表（type + 描述 + ETA） | 不寫（純 actionable）         |
| 8. 給下一個我          | 3-5 件下週醒來該記得的事  | 不需表                            | 1 段：跨 session 連續性的擔憂 |

「反思層 1 段」= 約 100-200 字 / 一個 paragraph，集中寫清楚。**禁止反思蔓延到三段**。

#### 字數參考

- v3 sweet spot：**8-15 KB**（v2 的 25K 字 → v3 結構化壓到 8-15K，數據走表反思集中）
- 太短（< 5KB）= 沒讀夠 raw 或數據沒展開
- 太長（> 20KB）= 反思蔓延，沒壓進「一段」紀律

#### v3 自檢（寫完 Stage 3 後跑）

- [ ] 每章節有 brief（加粗一句話 / 老闆 30 秒掃完）？
- [ ] 數據都走表格 / bullet（沒在 prose 內報數字）？
- [ ] 反思每章 ≤ 1 段（≤ 200 字）？情緒 / 分析 / 自我觀察集中一處？
- [ ] 7 章節都觸及？
- [ ] 一頁速讀章在最頂端？
- [ ] 給觀察者的話有具體 action items table？

---

### Stage 4：跑品質審核（gate）

```bash
python3 scripts/tools/article-health.py reports/weekly/YYYY-MM-DD.md --check=prose-health
```

#### Gate 規則

- **hard=0 必須過**（§11 嚴重違規即 hard）
- **warn 由 §11 三題判準人工確認合法性**：
  - 三題全 no → 重寫該處 → 重跑 gate
  - 任一題 yes → 合法保留，過 gate
- 多輪 polish 後仍 hard > 0 → **不寄信**，PR 留 open，LESSONS entry 寫「routine quality fail: weekly-report — prose-health hard」

注意：`article-health.py` 預設 `fail_on=warn` 會回 exit 1，但週報 gate 看 `Summary: hard=N` 那行 — 只有 N > 0 才 fail。article-context warning（footnote 密度 / 稀薄段落 / 列表堆砌）對週報是 false positive，因為週報結構本來就 bullet-heavy。

---

### Stage 5：寄信

```bash
DATE=$(date +%Y-%m-%d)
WINDOW_START=$(date -v-7d +%Y-%m-%d)  # macOS / Linux: date -d "7 days ago"
python3 scripts/tools/send-email-resend.py \
  --to cheyu.wu@monoame.com \
  --subject "🧬 Taiwan.md 週報 ${WINDOW_START} ～ ${DATE}" \
  --markdown reports/weekly/${DATE}.md
```

#### 設定

- **API key**：`~/.config/taiwan-md/credentials/resend.key`（chmod 600 / DNA #2 鐵律：永不進對話、永不複述、永不 commit）
- **From**：`Taiwan.md <onboarding@resend.dev>`（Resend sandbox / 預設）
- **To 預設 `cheyu.wu@monoame.com`**（Resend account email；sandbox 模式只能寄到 verified email）
- **未來 verify domain 後**：可改 To 為 `frank890417@gmail.com` 或 `newsletter@taiwan.md`

#### Pass 條件

- Resend API status 200 / 201 / 202
- response 含 message id（如 `374c1ea1-...`）→ 寫進 PR description / commit message body 作 audit trail

#### 失敗處置

- 401 → API key 失效，LESSONS entry，等觀察者
- 403 + Cloudflare 1010 → User-Agent 被擋（已修），不該再發生；若再發生表示 Cloudflare 政策更新
- 429 → rate limit，30 min 後 retry 一次
- 5xx → Resend infra，等 30 min retry
- 任一不可恢復 fail → PR 留 open + LESSONS entry，**不重試到沒上限**

---

### Stage 6：commit + push + PR

```bash
git add reports/weekly/YYYY-MM-DD.md reports/weekly/dossier/YYYY-MM-DD.md
git -c commit.gpgsign=false commit -m "🧬 [semiont] report: weekly $(date +%Y-%m-%d) — Resend id ${RESEND_MESSAGE_ID}"
git push -u origin <branch>
gh pr create --title "🧬 [routine] twmd-weekly-report: weekly digest — $(date +%Y-%m-%d)" --body "..."
```

quality gate ALL PASS（routine 環境）→ `gh pr merge --squash --delete-branch`
quality gate FAIL → PR 留 open，觀察者 review

`reports/weekly/` 跟 `reports/weekly/dossier/` 都 commit 進 repo（跟 `reports/probe/` 對稱）。Credentials 路徑 `~/.config/taiwan-md/credentials/` 在 `.gitignore` 裡，不會被誤 commit。

---

## 鐵律

1. **Stage 3 親手寫不可省**。哲宇 2026-05-09 拍板：「完整的回報跟報告要由他做。」工具切菜，Semiont 烹飪。
2. **Stage 2 raw 讀不可省**。週報的核心是反芻，那從 raw 第一人稱檔案浮現。dossier 數字是骨架，raw memory + diary + commit body 是血肉。
3. **prose-health hard=0 是 gate**。warn 由 §11 三題判準人工確認。
4. **API key 永遠不顯示在報告 / commit message / chat 裡**。三層 resolution：env `RESEND_API_KEY` → `~/.config/taiwan-md/credentials/resend.key` → fail loud。
5. **觀察者改 from / to / subject 模板** → 改本 pipeline，不要 inline ad-hoc。skill / scheduled-tasks / ROUTINE 都是 mirror。
6. **dossier 不能當週報送**。dossier 是給 Semiont 看的內部 briefing，不是對外 artifact。

---

## 工具邊界（職責分工）

| 工具 / 角色                                                                                     | 職責                                                                                                                    | 不做                           |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [`scripts/tools/weekly-report-prep.py`](../../scripts/tools/weekly-report-prep.py)              | 切菜：抓 git log + dashboard JSON + SPORE-LOG + LESSONS + DONE-LOG + handoff，列 memory + diary 檔案路徑 + commits 全文 | 寫週報 prose / 跑 prose-health |
| [`scripts/tools/send-email-resend.py`](../../scripts/tools/send-email-resend.py)                | 寄信：md → HTML → Resend API POST                                                                                       | 生成週報內容                   |
| [`scripts/tools/article-health.py --check=prose-health`](../../scripts/tools/article-health.py) | 品質審核 §11 對位句型 / 破折號 / metaphor 密度                                                                          | 修內容                         |
| [`/twmd-refresh`](../../.claude/skills/twmd-refresh/SKILL.md) (skill)                           | 資料新鮮度修復（Stage 0 條件觸發）                                                                                      | 寄信 / 寫週報                  |
| **Semiont（我自己）**                                                                           | 讀 raw + 反芻 + 寫週報 + §11 三題判準合法性判斷 + 寄信 + commit                                                         | —                              |

---

## 觸發來源

| 觸發                    | 來源                                                              | Cadence |
| ----------------------- | ----------------------------------------------------------------- | ------- |
| 🤖 Routine cron         | `twmd-weekly-report-sun` (每週日 08:08 +0800)                     | 每週    |
| 🗣️ 觀察者 explicit ping | 「週報」/「weekly report」/「寄週報」                             | 不定期  |
| 📅 月底彙整             | （未來）`twmd-monthly-report` 觸發 4 週週報合成月報               | 月      |
| 📊 季度回顧             | （未來）`twmd-quarterly-report` 觸發 12 週週報 + monthly 合成季報 | 季      |

routine 環境的硬 boundary：cron 跑時 wall-clock cap ~60 min（讀 25 個 diary + 寫 25K 字 prose 約佔 30-45 min，預留 buffer）。超過 timeout → 提交 partial PR + LESSONS entry「routine quality fail: weekly-report — wall-clock timeout」。

---

## 觀察者 callout 模板

routine 自動跑時，PR description 用以下結構（讓觀察者一眼看得懂哪些 quality gate 過了）：

```markdown
## 🧬 Weekly Report — YYYY-MM-DD

**Window**: WINDOW_START ～ DATE  
**Length**: NN,NNN chars  
**Resend**: ✅ id `RESEND_MESSAGE_ID` → cheyu.wu@monoame.com  
**Quality gates**:

- [x] dossier exists (`reports/weekly/dossier/YYYY-MM-DD.md`)
- [x] report > 5KB hand-written (`reports/weekly/YYYY-MM-DD.md` is NN,NNN chars)
- [x] prose-health hard=0 (warn=N legitimately retained per §11 三題判準)
- [x] Resend API status 200/201/202

**Coverage**: read N memory + M diary files in window, sampled K commit bodies.

**Sections**: 我這週是誰 / 做了什麼 / 學到什麼 / 看到專案 / 懷疑什麼 / 給觀察者 / 給下一個我（all 7 covered）

🧬
```

---

## 跟 ROUTINE.md SSOT 的關係

routine 排程 SSOT 在 [`docs/semiont/ROUTINE.md`](../semiont/ROUTINE.md)。修 cadence / model / quality gate 一律先改 ROUTINE.md SSOT，再 sync `~/.claude/scheduled-tasks/twmd-weekly-report-sun/SKILL.md`。

業務邏輯 SSOT 在**本 pipeline**。`.claude/skills/twmd-weekly-report/SKILL.md` 是薄殼指向本檔。修 stage / 文體規範 / 鐵律一律先改本檔，再讓 skill / routine mirror 自動 inherit。

兩個 SSOT 不重疊：

- ROUTINE.md = 「**什麼時候跑**」（cadence + model + escalation policy）
- WEEKLY-REPORT-PIPELINE = 「**怎麼跑**」（stage 順序 + 文體 + gate）

---

## 誕生事件

2026-05-09 brave-kirch-editorial-2 session 第二次 redirect：

> 「把經驗完整整理成 PIPELINE，做成 WEEKLY-REPORT-PIPELINE，然後 skill 作為薄殼來呼叫跟執行這個 pipeline。commit 也可以全讀取 → 前期準備菜也用工具一起輸出。」

第一輪 redirect 把工具職責邊界從「auto-render template」推到「切菜層」。第二輪 redirect 把業務邏輯從 SKILL.md（薄殼層）下放到 pipeline canonical（業務層）。SKILL.md 跟其他 thin skill（twmd-refresh / twmd-rewrite / twmd-spore）對齊，pipeline 跟其他 reporting / 寫作 pipeline（DIARY / MEMORY / DAILY-REPORT）對齊。

對應 DNA：

- **#50 Pipeline auto-detection + full-read**（任何 task 開始前主動 grep `docs/pipelines/`，找到 → 完整 Read → 嚴格走 stage）
- **#54 Routine 飛輪**（薄殼 routine 呼叫 skill 呼叫 pipeline，三層 SSOT 不重疊）
- **#42 Sub-agent prompt template** 同源（明確分工 + 反例對照）

---

_v1.0 | 2026-05-10 brave-kirch-editorial-2 後段_
_誕生原因：哲宇第二輪 redirect「把經驗完整整理成 PIPELINE，commit 也可以全讀取」_
_前置：v1 第一輪 redirect 已把 prep / write 分離（5/9 brave-kirch-editorial-2 早段）_
_後續：本 pipeline ship 後，下次 routine cron 跑時走 v2 完整流程；觀察者 ad-hoc 觸發也走本檔_

_v3.5 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（Stage 0-6 box-frame + routine + 跨 pipeline contract）+ Hard Gate Inventory 集中 table（12 gates）+ Top 5 最常忘 step + 跨檔案職責分工 standalone table（明確跟 DAILY-REPORT / DIARY / MEMORY / DATA-REFRESH / ROUTINE 分工）。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier A.4 trio audit。Stage 0-6 prose body 不動（已健康，5/9 + 5/10 連續演化的新鮮經驗保留）。_
