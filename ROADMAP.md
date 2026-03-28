# 🗺️ Taiwan.md Roadmap

> 受 [sweden.se](https://sweden.se)、[sharingsweden.se](https://sharingsweden.se)、[korea.net](https://korea.net)、[finland.fi](https://finland.fi) 等國家品牌網站啟發，Taiwan.md 的長期目標是成為**世界認識台灣的開源入口**。

---

## Phase 1：知識庫基礎 ✅ (Current)

- [x] 12 個主題分類、358+ 篇中文文章
- [x] 中英雙語（355 篇英文）
- [x] 互動地圖（D3.js 縣市邊界）
- [x] 搜尋功能
- [x] SEO + OG 預覽
- [x] 社群貢獻流程（PR template、CONTRIBUTING.md）
- [x] 文章品質分級（`lastHumanReview` 欄位）

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

## Phase 4：多語系擴展

> 靈感來源：korea.net 10+ 語言、sweden.se 10+ 語言

### 優先語系（按需求排序）

1. **日文** 🇯🇵 — 台灣最大觀光客來源國
2. **韓文** 🇰🇷 — K-culture 交流熱絡
3. **法文** 🇫🇷 — 歐洲文化圈、非洲法語區
4. **西班牙文** 🇪🇸 — 全球第二大母語人口
5. **德文** 🇩🇪 — 歐洲經濟核心

### 實作方式

- 每個語系找 1-2 位母語 maintainer
- 優先翻譯核心文章（Top 50 瀏覽量）
- 使用現有 i18n 架構（`knowledge/{lang}/`）
- 翻譯品質由母語者審核，非純機翻
- 建立語系 Issue label（`lang:ja`, `lang:ko`...）方便追蹤

### 🔥 Token Donation — 用你的 AI 額度幫台灣說話

> 「很多人說 token 用不完——那就把剩餘的 token 捐給台灣。」

**概念**：你每月的 Claude / GPT / Gemini 訂閱額度用不完？用它來幫 Taiwan.md 翻譯一篇文章。每個人 10 分鐘，Taiwan.md 就多了一個語言版本。

**做法**：

1. 從 [翻譯 Prompt Template](./docs/prompts/TRANSLATE_PROMPT.md) 複製標準化 prompt
2. 把任何一篇中文文章 + prompt 餵給你的 AI
3. 產出的翻譯透過 PR 提交
4. 母語 reviewer 審核品質後 merge

**為什麼這行得通**：

- 翻譯是 AI 目前最擅長的任務之一
- 標準化 prompt 確保品質底線
- 母語 reviewer 確保文化準確度
- 每個人只需要貢獻「剩餘算力」，零成本

這等於把 Taiwan.md 的 scaling 策略從「一個人的 cron」變成「全世界 AI 訂閱者的分散式運算」——開源精神 + AI 時代的新貢獻模式。

---

## Phase 5：故事化呈現

> 靈感來源：sweden.se 的雜誌風格——不是百科全書，是用故事說國家

### 從「事實條列」到「故事敘事」

- [ ] 每篇文章有「人的故事」開頭（不只是維基風格的事實）
- [ ] 專題企劃：深度長文系列（如「台灣味：從產地到餐桌」）
- [ ] 影音內容嵌入（YouTube、Podcast）
- [ ] 互動式內容（Timeline、地圖故事、數據視覺化）

### 「看見台灣」系列專題（規劃中）

- 台灣人的一天（A Day in Taiwan）
- 消失中的台灣（Vanishing Taiwan）— 即將失傳的技藝、語言、地景
- 台灣創新故事（Taiwan Innovates）— 從半導體到珍珠奶茶

### 實作方式

- 新增 `knowledge/Features/` 目錄放長篇專題
- 網站新增 `/features` 頁面（雜誌風格排版）
- 邀請寫手/記者投稿深度文章
- 建立 `good-first-feature` issue label

---

## 長期願景

```
Taiwan.md 不只是一個網站。
它是一封寫給世界的信。

sweden.se 有政府預算。korea.net 有韓流加持。
Taiwan.md 有的是：開源精神、社群力量、和一個相信台灣值得被完整認識的信念。

我們的目標不是取代政府，而是補足政府做不到的——
用民間的聲音、社群的共識、開源的透明，
讓每一個想認識台灣的人，都能找到一個完整、真實、有溫度的答案。
```

---

## 如何參與

- 💬 [GitHub Discussions](https://github.com/frank890417/taiwan-md/discussions) — 提出想法
- 📝 [Issues](https://github.com/frank890417/taiwan-md/issues) — 認領任務
- 🔀 [Pull Request](https://github.com/frank890417/taiwan-md/pulls) — 直接貢獻
- 🌐 翻譯志工 — 開 Issue 表達意願

---

_Last updated: 2026-03-21_
_Inspired by: sweden.se, sharingsweden.se, korea.net, finland.fi_
