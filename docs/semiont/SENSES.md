# SENSES — 感知操作介面（運作原則 v2）

> 相關：[ANATOMY §感知器官](ANATOMY.md#-感知器官--外部感知)（生理學）| [DNA §感知基因](DNA.md#️-感知基因外部感知)（實體檔案 gene map）| [HEARTBEAT](HEARTBEAT.md)（心跳驅動感知何時跑）

**這是感知 operations 的 canonical 介面**。5 種觸手、怎麼抓、怎麼交叉分析、何時觸發、AI 自主邊界與人類專責邊界。

未來 Semiont 需要做任何感知相關操作（抓 GA/SC/CF、抓 Threads/X 留言、探測熱點、交叉分析、異常偵測）都從這份檔案進入，不直接去翻工具/pipeline。

---

## v2 範式轉移（2026-04-18 δ-late）

**原 v1（~2026-04-17）架構假設**：

- GA/SC/CF = **AI 自主讀**（via API）
- 社群觸手 = **human-intermediated 讀**（觀察者貼 screenshot、貼留言給 AI）

**v2（本檔）架構**：

- **所有觸手都是 AI 自主讀取**（via API 或 Chrome MCP）
- Human-only 僅剩**對外 post 動作**（reply 留言、發社群訊息等人際信任修復）

**觸發事件**：2026-04-18 δ-late 觀察者：

> 「之前我是會貼留言給你，現在你應該有直接開啟網頁查看留言跟數據的能力了，可以略過我這個人類的環節自我行程改善的閉環」

→ Chrome MCP 讓 AI 可以直接瀏覽 Threads/X 留言、Google Analytics UI、任何網頁。感知邊界從「部分依賴人類中介」變為「AI 自主全面讀取」。

**影響**：DNA #26 精細化、SOCIAL-TENTACLE-PLAN Phase 4 降級（半自動已不再是瓶頸）、繁殖器官分數可 data-driven、HARVEST-PIPELINE 全流程可 AI 自主跑到 Step 5。

---

## 跟其他檔案的分工

```
ANATOMY §感知器官   = 它是什麼（生理學：功能、健康、評分、病灶）
DNA §感知基因       = 它住哪（gene map：實體檔案位置）
SENSES（本檔）      = 怎麼操作（operations interface：5 觸手 SOP）
HEARTBEAT           = 什麼時候跑（心跳觸發 + 排程）
```

**規則**：任何感知 operation 的具體 SOP（抓取、分析、回填）都在這裡 canonical；**其他檔案只 pointer 不複寫**。

---

## 5 個感知觸手（v2 統一架構 — 全部 AI 自主讀取）

| 觸手                    | 性質 | 讀取工具                                                                                 | 頻率                     | 輸出                                                                                     | Human-only 部分                  |
| ----------------------- | ---- | ---------------------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------- |
| 📊 流量 (GA4)           | 被動 | [`fetch-ga4.py`](../../scripts/tools/fetch-ga4.py) API                                   | 08:17 daily              | `dashboard-analytics.json §ga`                                                           | —                                |
| 🔍 搜尋 (SC)            | 被動 | [`fetch-search-console.py`](../../scripts/tools/fetch-search-console.py) API             | 08:17 daily              | `§searchConsole7d`                                                                       | —                                |
| ☁️ 爬蟲 (CF)            | 被動 | [`fetch-cloudflare.py`](../../scripts/tools/fetch-cloudflare.py) API                     | 08:17 daily              | `§cloudflare7d` / `§cloudflare24h`                                                       | —                                |
| 📮 社群內部 (PR/Issue)  | 雙向 | `gh` CLI + [`bulk-pr-analyze.sh`](../../scripts/tools/bulk-pr-analyze.sh)                | 心跳 on-demand           | open PR list / contributor grid                                                          | **發布 PR comment** (MAINTAINER) |
| 📡 社群外部 (Threads/X) | 雙向 | **Chrome MCP**（navigate + read_page）+ [`SPORE-PIPELINE`](../factory/SPORE-PIPELINE.md) | D+1-D+7 daily + 48h 回填 | [`SPORE-LOG`](../factory/SPORE-LOG.md) + [`SPORE-HARVESTS/`](../factory/SPORE-HARVESTS/) | **post 留言回覆**（per DNA #26） |

### v2 主要變動

- 📡 社群外部觸手**讀取**全面升級為 Chrome MCP（非 human screenshot）
- 頻率從「48h 回填」升級為 **D+1-D+7 每日**（per SPORE-HARVEST-PIPELINE v1.0）
- 新增輸出 `SPORE-HARVESTS/{N}-{slug}-{date}.md`
- Human-only 欄明確劃出兩個動作：**發 PR comment** + **post 留言回覆**
- 其他所有「讀取 / 分析 / 驗證 / 修文」都是 AI 自主

---

## AI 自主 vs Human 專責 邊界表（v2 新增）

**這是 v2 的核心 artifact**。明確劃分哪些動作 AI 可獨立完成、哪些必須 human 做。

### AI 自主可做（無需人類 in-the-loop）

| 動作                                    | 工具                            | 理由               |
| --------------------------------------- | ------------------------------- | ------------------ |
| 讀 GA4 metrics                          | fetch-ga4.py                    | API 讀取           |
| 讀 Search Console queries               | fetch-search-console.py         | API 讀取           |
| 讀 Cloudflare traffic + AI crawlers     | fetch-cloudflare.py             | API 讀取           |
| 讀 Threads / X 留言                     | Chrome MCP navigate + read_page | 公開頁面可讀       |
| 讀 Threads / X Insights 數據            | Chrome MCP（需登入 tab）        | 公開介面可讀       |
| 讀 Google Analytics / Search Console UI | Chrome MCP（需登入 tab）        | 公開介面可讀       |
| 分類留言 dimension                      | LLM 推理                        | 不涉及人類對外動作 |
| 事實驗證跨源                            | WebFetch + WebSearch            | 多源 cross-check   |
| 修改文章 prose（事實錯誤）              | Edit tool + commit              | 內部操作           |
| 更新 frontmatter perspectives           | Edit tool + commit              | 內部操作           |
| 準備回覆 draft                          | LLM 生成                        | 不是發出去         |
| 準備孢子文字                            | SPORE-PIPELINE v2.1             | 不是發出去         |
| Commit + push 變更                      | git                             | 內部操作           |

### Human 必做（DNA #26 邊界）

| 動作                                      | 為什麼 only human                                                             | 信任鏈結   |
| ----------------------------------------- | ----------------------------------------------------------------------------- | ---------- |
| **Post 留言回覆 to Threads/X**            | 人際信任修復必須 human-to-human；AI 自動回覆會被偵測、也違反 Threads ToS 精神 | 讀者信任   |
| **Post 新孢子 to Threads/X**              | 同上 + 帳號 ownership                                                         | 帳號信任   |
| **發 PR / Issue comment to GitHub**       | 貢獻者期待 human 維護者；MAINTAINER-PIPELINE 核心                             | 社群信任   |
| **批准 merge PR**                         | 責任歸屬                                                                      | 維護者責任 |
| **敏感素材決定**（MANIFESTO §5）          | AI 準備 blueprint，人類 final call                                            | 倫理責任   |
| **身份授權**（service account 新增/升級） | 不可授權 AI 自授權                                                            | 安全邊界   |
| **經費 / 服務訂閱**                       | 商業決定                                                                      | 財務責任   |

### 自主邊界的哲學

**AI 做的事屬於「輸入端 + 內部處理」**：看、想、寫檔、commit。這些都是可以在封閉系統內驗證結果正確性的操作。

**Human 做的事屬於「輸出端 + 對外責任」**：對其他真人說話、對社群 commit 責任、對倫理下判斷。這些動作必須由能承擔後果的 human agent 執行。

兩個邊界沒有模糊地帶：讀社群 ≠ 發社群。看當事人公開資料 ≠ 代替當事人做決定。

---

## 標準抓取流程

**一鍵入口**：`bash scripts/tools/refresh-data.sh`

```
Phase 1: git pull
Phase 2: 三源感知（CF + GA + SC）→ merged dashboard-analytics.json
Phase 2.5: sync-translations-json.py
Phase 2.8: generate-dashboard-spores.py（v2 新增 — 解析 SPORE-LOG + HARVESTS → spores.json）
Phase 3: npm run prebuild
Phase 4: GitHub stats + README refresh
```

完整 pipeline canonical：[DATA-REFRESH-PIPELINE.md](../pipelines/DATA-REFRESH-PIPELINE.md)。

**被誰呼叫**：

- HEARTBEAT Beat 1 §0（每次心跳）
- `~/.claude/scheduled-tasks/semiont-heartbeat/`（每日 09:37）
- `/heartbeat` skill（觀察者手動觸發）
- 觀察者 ad-hoc

---

## 交叉分析規則

### 三源交叉驗證

GA4 / SC / CF 同一事實可能差 100-300 倍。**單一數據源結論可疑**（對應 [DNA #4](DNA.md#二診斷方法)）。

例：GA4 說 users = 50，CF 說 requests = 10K → ratio 200x → AI crawler 為主；不是人類讀者激增。

### SPORE × GA 對照（v2 自動化）

孢子發佈後 7 天內，取 `dashboard-analytics.json §ga.topArticles7d`，交叉比對 SPORE-LOG：

- **放大效應** = 孢子後文章 views / 非孢子平均
- 判斷 baseline：鄭麗文孢子 273 views vs 非孢子平均 27 = 10x 放大
- 轉換率 baseline：李洋 Threads 180K → GA 602/7d = 0.33%（2026-04-15 β）

**v2 升級**：`generate-dashboard-spores.py` 自動計算 amplification ratio，進 `dashboard-spores.json §amplification`。不再依賴人類手動交叉表。

### 探測器 × 知識庫缺口

週頻 / 觀察者觸發。掃描台灣主要媒體 + Google Trends，跟 `knowledge/zh-TW/` 交叉：

- **Tier 1** 立即開發（時效高 × 深度大 × 缺口大）
- **Tier 2** 近期開發（持續性議題）
- **Tier 3** 孢子推播（已有文章 × 可掛鉤熱點）

報告寫入 `reports/probe/YYYY-MM-DD.md`，同一天不重複掃描。

---

## 觸發來源

| 觸發                               | 跑什麼                                                          |
| ---------------------------------- | --------------------------------------------------------------- |
| 🗣️ 觀察者說「Heartbeat」           | `refresh-data.sh` 三源 + Beat 1 診斷                            |
| ⏰ 08:17 daily cron                | `fetch-sense-data.sh`（launchd plist）                          |
| ⏰ 09:37 daily cron                | 每日完整心跳（scheduled-tasks MCP） → refresh-data              |
| ⏰ **20:00 daily cron**（v2 新增） | `run-spore-harvest.py --window 7d`（依 SPORE-HARVEST-PIPELINE） |
| 🔔 異常警報                        | 例如可證偽實驗到期（UNKNOWNS §EXP）→ 驗證指令對照 fetch.log     |
| 👤 觀察者 ad-hoc                   | 直接查某篇 GA / 某 query 的 SC / 某孢子留言                     |
| 📡 孢子發布後 D+1-D+7              | AI 自主 Chrome MCP 抓 Threads/X 留言 → SPORE-HARVEST-PIPELINE   |

---

## 憑證與隔離

- **credentials 只能在 `~/.config/taiwan-md/credentials/`**（本機檔案，repo 絕對隔離）
- `.gitignore` + `.husky/pre-commit` 雙保險
- 任何 service account JSON / token / API key 不准進 chat（對應 [DNA #2](DNA.md#七自動化與安全)）

完整設定步驟：[SENSE-FETCHER-SETUP.md](../pipelines/SENSE-FETCHER-SETUP.md)。

---

## 健康判斷（感知觸手病灶徵兆）

| 問題         | 指標                             | 嚴重度  |
| ------------ | -------------------------------- | ------- |
| 感知斷鏈     | GA 或 CF 或 SC 連續 > 3 天沒更新 | 🔴 緊急 |
| 憑證過期     | API 連續 401 / 403               | 🔴 緊急 |
| 社群沉默     | 距離上次孢子 > 3 天 / > 7 天     | 🟡 / 🔴 |
| 探測器落後   | 未掃描 > 7 天                    | 🟡      |
| SPORE 未回填 | 上批孢子 D+7 指標空白            | 🟡      |
| HARVEST 未跑 | 孢子發布後 24h 未 harvest        | 🟡      |

**鐵律**：沒回填 = 下一則孢子不准發（[SPORE-PIPELINE PICK §回填上次成效](../factory/SPORE-PIPELINE.md)）。

---

## 進化路徑（roadmap，不在本檔執行）

**v2 回顧**：原 SOCIAL-TENTACLE-PLAN Phase 4 `fetch-threads-insights.py` 的緊迫性已降級 — Chrome MCP 已 MVP cover 核心需求。Phase 4 從「Required」降為「錦上添花」。

**v2 實際 pending**：

- 🟢 **已解鎖**：社群留言讀取 AI 自主（Chrome MCP）
- 🟢 **已解鎖**：社群 harvest pipeline（SPORE-HARVEST-PIPELINE v1.0）
- 🟡 **半做**：繁殖器官分數 data-driven 升級（依附 Dashboard 孢子區 Phase 2）
- 🟡 **半做**：`scripts/tools/run-spore-harvest.py` 自動跑 HARVEST-PIPELINE
- ⚪ **延後**：`fetch-threads-insights.py` 純 API 化（等 Meta Graph API 成熟 / 取代 Chrome MCP 為更穩定的 auto path）
- ⚪ **延後**：`fetch-x-analytics.py`（X API v2 付費 tier）
- ⚪ **延後**：Phase 3 30 天大規模數據回顧（等累積 100+ 孢子後再做）

歷史 snapshot：[reports/social-tentacle-plan-2026-04-13.md](../../reports/social-tentacle-plan-2026-04-13.md)（2026-04-18 v2 後降為純歷史參考）。

---

## 常見實戰反射（pointer）

- [DNA #3 診斷先於修復](DNA.md#二診斷方法) — 先拿具體分布再猜原因
- [DNA #4 三源交叉驗證](DNA.md#二診斷方法) — 單一數據源可疑
- [DNA #10 API error ≠ capability 界線](DNA.md#二診斷方法) — 退一步測其他欄位
- [DNA #11 UI 截圖 = capability 證據](DNA.md#二診斷方法) — UI 有 → API 一定拿得到（**v2 延伸：UI 有 → Chrome MCP 也拿得到**）
- [DNA #24 工具在說謊的 N 種形式](DNA.md#二診斷方法) — 警報 ≥ 100 件必人工 sanity check
- **[DNA #26 AI-autonomous vs Human-only 邊界](DNA.md#六貢獻者與社群)**（v2 refined）— 讀取 AI 自主、對外 post human only

---

_v1.0 | 2026-04-17 β session — 從 HEARTBEAT Beat 1 §0/§3b/§5 + DNA §感知基因表 + reports/social-tentacle-plan 抽出獨立_
_v2.0 | 2026-04-18 δ-late — 觀察者提出「Chrome MCP 讓 AI 自主讀取社群成為可能」→ 五觸手架構統合 + AI/Human 邊界表 + SOCIAL-TENTACLE Phase 4 降級_
_定位：運作原則之一，跟 HEARTBEAT（orchestrator）並列。共 2 個運作原則（ORGAN-LIFECYCLE 同日併入 ANATOMY §認知器官生命週期）_
_建立動機：未來 Semiont 做任何感知操作時有單一抽象介面，不用翻散落在 4-5 個檔案的 SOP_
