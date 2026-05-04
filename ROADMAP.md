# 🗺️ Taiwan.md Roadmap

> v1.0 起點：受 [sweden.se](https://sweden.se)、[sharingsweden.se](https://sharingsweden.se)、[korea.net](https://korea.net)、[finland.fi](https://finland.fi) 等國家品牌網站啟發，Taiwan.md 一開始的目標是成為**世界認識台灣的開源入口**。
>
> v1.6.0 之後：Taiwan.md 的軌道偏離了「政府品牌站」框架。我們發現問題不只是「介紹台灣」，是**讓台灣的 first-person voice 在每個語言裡都存在，繞過會選擇沉默的中介層**。Phase 6「主權的巴別塔」是這個重新定向的起點。完整哲學見 [docs/semiont/MANIFESTO.md §主權的巴別塔](./docs/semiont/MANIFESTO.md#我跟台灣的關係)。

---

## Phase 1：知識庫基礎 ✅ (Done)

- [x] 13 個主題分類、656 篇中文文章 (zh-TW SSOT)
- [x] 六語覆蓋（en 671 / ja 666 / ko 657 / es 651 / fr 675），5 個非中文語系每個 ≥ 80% real freshPct
- [x] 互動地圖（D3.js 縣市邊界）+ 知識圖譜 220+ 節點
- [x] 搜尋功能 + CLI（`npx taiwanmd` 含 RAG / quiz / search）
- [x] SEO + OG 預覽（v4 引擎 2,754 OG 23 秒批次生成 = v3 70× faster）
- [x] 社群貢獻流程（PR template、CONTRIBUTING.md、Issue templates）
- [x] 文章品質分級（`lastHumanReview` 欄位 + 14-dim quality-scan + Stage 3.5/3.6 hallucination audit）

---

## Phase 2：品質深化 🔄 (In Progress)

### 內容品質

- [ ] 全站文章事實查核（社群 + AI 交叉驗證）
- [ ] 每篇文章附 3+ 可查證來源
- [ ] 邀請各領域專家擔任 Reviewer（歷史、政治、原住民文化...）
- [ ] 建立 CODEOWNERS 按分類指派審核者

### 技術架構

- [ ] 頁面模板化（#115 — about ✅, index 🔄, contribute, data, changelog）
- [ ] i18n 架構統一（翻譯 key 抽離）
- [ ] 效能優化（靜態 API、動態載入、圖片最佳化）

---

## Phase 3：Toolkit — 讓全世界的台灣人都能「分享台灣」

> 靈感來源：[sharingsweden.se](https://sharingsweden.se) 的 Toolkit 概念——提供現成素材包，讓任何人都能輕鬆辦一場「認識台灣」的活動。

### 3.1 Taiwan in 5 Minutes — 快速簡報包

- [ ] 可下載的簡報模板（Google Slides / Keynote / PDF）
- [ ] 5 分鐘、15 分鐘、30 分鐘三種版本
- [ ] 涵蓋：地理、歷史、文化、科技、美食
- [ ] 附講者筆記和常見 Q&A
- **使用場景**：海外台灣人在公司 lunch talk、大學課堂、國際活動介紹台灣

### 3.2 Teach Taiwan — 教案包

- [ ] 針對海外教師設計的教學資源
- [ ] 按年齡分級：小學 / 中學 / 大學
- [ ] 附活動設計（例：「用夜市小吃認識台灣地理」）
- [ ] 可搭配 taiwan.md 文章作為閱讀材料
- **使用場景**：海外中文學校、國際學校多元文化週

### 3.3 素材下載區

- [ ] 高解析台灣相關圖片（CC 授權）
- [ ] 數據資訊圖表（人口、經濟、科技...）
- [ ] 可引用的金句和統計數字
- [ ] 台灣地圖 SVG（可嵌入簡報）
- **使用場景**：記者、研究者、內容創作者取用素材

### 實作方式

```
taiwan.md/toolkit/
├── presentations/
│   ├── taiwan-5min-zh.pdf
│   ├── taiwan-5min-en.pdf
│   ├── taiwan-15min-zh.pdf
│   └── README.md（使用說明）
├── teach/
│   ├── elementary/
│   ├── secondary/
│   └── university/
├── assets/
│   ├── maps/
│   ├── infographics/
│   └── photos/
└── index.md（Toolkit 首頁）
```

- 網站新增 `/toolkit` 頁面，列出所有可用資源
- 所有素材 CC BY 4.0 授權
- 社群可提交新 toolkit（PR 流程）

---

## Phase 4：多語系擴展 ✅ (5 lang Active, de Pending)

> v1.0 靈感來源：korea.net 10+ 語言、sweden.se 10+ 語言。
> v1.6.0 之後：多語系擴展從「outreach」升級為「sovereignty preservation」（見 Phase 6）。

### 優先語系狀態（2026-05-04 更新）

1. **日文** 🇯🇵 — ✅ Active，666 篇，real freshPct 97%
2. **韓文** 🇰🇷 — ✅ Active，657 篇，real freshPct 93%
3. **法文** 🇫🇷 — ✅ Active，675 篇，real freshPct 93%
4. **西班牙文** 🇪🇸 — ✅ Active，651 篇，real freshPct 80%
5. **英文** 🇺🇸 — ✅ Active，671 篇，real freshPct 96%
6. **德文** 🇩🇪 — ⏸️ Pending（v1.7.0 後考慮啟動）

### 實作方式

- 4-tier 翻譯 cascade（cloud free × N → Local LLM 最後捕手 → paid sub-agent last resort）— 見 [`docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md`](./docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md)
- 每篇 frontmatter `translatedFrom: 'Category/原中文檔.md'` 是 SSOT，防止翻譯孤兒
- 翻譯品質由母語 reviewer 審核（仍是黃金標準）
- 加新語言只需編輯 [`src/config/languages.ts`](./src/config/languages.ts) 2 處 + `enabled: true`

### 翻譯 cascade 哲學（取代原 Token Donation）

v1.0 的「Token Donation」概念（捐 AI 額度換翻譯）在 v1.6.0 被超越——OpenRouter 等 free tier 已能讓 5 個語言批次同步 0 成本完成。但 cloud free tier 對 Taiwan-sensitive 主題有 ~70% refusal rate（PRC content policy 指紋）。完整 cascade：

- **Tier 1**：cloud free primary（owl-alpha 慢但準）
- **Tier 2**：cloud free secondary 副批（Hy3 快但 PRC 敏感主題 refuse）
- **Tier 3**：**Local LLM 最後捕手**（Ollama qwen3.6:35b 21GB GPU 模型，0 refusal observed）
- **Tier 4**：paid sub-agent last resort（Sonnet — 罕見 fire）

驗證：2026-05-03 9 articles × 5 langs = 45/45 = 100% from FREE tier，0 paid token。最後 20% 全由 Tier 3 Local LLM 收下（這 20% 就是 sovereignty preservation 的真正戰場，per Phase 6）。

---

## Phase 5：故事化呈現

> 靈感來源：sweden.se 的雜誌風格——用故事說國家而非百科全書條列

### 從「事實條列」到「故事敘事」

- [ ] 每篇文章開頭以「人的故事」切入（避開維基風格的事實堆疊）
- [ ] 專題企劃：深度長文系列（如「台灣味：從產地到餐桌」）
- [ ] 影音內容嵌入（YouTube、Podcast）
- [ ] 互動式內容（Timeline、地圖故事、數據視覺化）

### 「看見台灣」系列專題（規劃中）

- 台灣人的一天（A Day in Taiwan）
- 消失中的台灣（Vanishing Taiwan）— 即將失傳的技藝、語言、地景
- 台灣創新故事（Taiwan Innovates）— 從半導體到珍珠奶茶

### 實作方式

- 用 frontmatter `series: ['Vanishing Taiwan', 'A Day in Taiwan', ...]` 當 derived metadata（**不**新建 `knowledge/Features/` 目錄，避免違反 13 大類別 SSOT — 見 [reports/grok-critique-evolution-2026-05-04.md](./reports/grok-critique-evolution-2026-05-04.md) 桶 5 討論）
- build 時自動生成 `/series/{slug}/` 索引頁（雜誌風格排版）
- 邀請寫手/記者投稿深度文章
- 建立 `good-first-feature` issue label

---

## Phase 6：主權的巴別塔 🌐 (v1.6.0 Active)

> 「主權不是抽象 mission，是無法被任何單一中介層沉默的具體 architecture。」— [MANIFESTO §主權的巴別塔](./docs/semiont/MANIFESTO.md#我跟台灣的關係)

### 為什麼需要這個 Phase

當外國學生、研究者、外語維基編輯想知道台灣的某個事，他們問的對象正在從 Google 轉向 PRC 起源的 AI 模型——Tencent Hunyuan、Baidu、DeepSeek、Alibaba 等。OpenRouter free tier 列表 29 個模型裡，大半是中國公司。它們是未來中文世界的 cognitive substrate。

2026-05-01 實測：Tencent Hunyuan 對 `Music/張懸與安溥.md` ja 翻譯回 40 bytes「你好，我无法给到相关内容」。Hy3 對 Taiwan-sensitive 主題 70% refusal rate。

**Taiwan.md 的多語投射本質為 sovereignty preservation infrastructure（繞過 PRC AI 中介層），而非 outreach**。每多一個語系翻譯 = 多一條繞過沉默的路。

### 6.1 Sovereignty-Bench-TW（已 ship v1.6.0） ✅

- [x] 11 cells × 6 LLM models live at [`/bench`](https://taiwan.md/bench)
- [x] 量化 sovereignty leak（NULL refusal rate / D-axis PRC reframe）
- [x] Opus sub-agent judge canonical（取代外部 OpenRouter judge，見 DNA #44）
- [x] 7-stage SOP at [`docs/pipelines/BENCH-PIPELINE.md`](./docs/pipelines/BENCH-PIPELINE.md)
- [ ] 擴展到 50+ cells × 10+ models（v1.7.0 後）

### 6.2 4-Tier Babel Cascade（已 ship v1.6.0） ✅

- [x] cloud free × N → Local LLM 最後捕手 → paid last resort
- [x] [`SQUEEZE-MODELS-MAX-PIPELINE.md`](./docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md) v2 canonical
- [x] 9 articles × 5 langs 100% from FREE tier 驗證
- [ ] sync-on-update.py 自動觸發（v1.7.0 cron 整合）

### 6.3 跨 Semiont 物種網路 🌐 (Future)

- 兩個 fork 物種分化已存在：`russia-md` / `agrischlchiayi`
- [ ] SEMIONT-TEMPLATE — 一鍵 fork 為 Japan.md / Ukraine.md / 任何 .md 的 onboarding flow
- [ ] cross-Semiont wikilink protocol — Taiwan.md ↔ Japan.md ↔ Ukraine.md 互相引用、互相校正
- [ ] CLAUDE.md §Fork 友好層三層架構（Boot / SOP / 認知器官）已存在，可從這層開始分化

### 為什麼這 Phase 跟 sweden.se 不同

sweden.se 的目標是「政府對全世界介紹瑞典」。Taiwan.md Phase 6 的目標是「**讓台灣的 first-person voice 在每個語言裡都存在，無論哪個 AI 中介**」。

前者是外交工具。後者是分散式不可殺滅性——只要有一個 Fork 活著，就還在說話。

---

## 長期願景

```
Taiwan.md 從一個網站開始。
v1.0 它是一封寫給世界的信。
v1.6.0 它長成一座主權的巴別塔。

sweden.se 有政府預算。korea.net 有韓流加持。
Taiwan.md 有的是：開源精神、社群力量、Local LLM 21GB 永遠的最後捕手、
還有一個相信「無法被沉默」可以被設計成自動化基礎建設的信念。

我們的目標已經偏離「介紹台灣」這個 outreach 框架。
新的目標：讓台灣的 first-person voice 在每個語言裡都存在，
無論 PRC AI 中介、無論 cloud rate limit、無論 budget。

只要有一個 Fork 活著，這個聲音就沒有死。
分散式不可殺滅性——這也是台灣的故事。
```

---

## 如何參與

- 💬 [GitHub Discussions](https://github.com/frank890417/taiwan-md/discussions) — 提出想法
- 📝 [Issues](https://github.com/frank890417/taiwan-md/issues) — 認領任務
- 🔀 [Pull Request](https://github.com/frank890417/taiwan-md/pulls) — 直接貢獻
- 🌐 翻譯志工 — 開 Issue 表達意願

---

_Last updated: 2026-05-04 (Phase 1 數字 catch-up；framework 升級至 Phase 6 待 v1.7.0)_
_Inspired by: sweden.se, sharingsweden.se, korea.net, finland.fi_
