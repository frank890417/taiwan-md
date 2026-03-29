# 🌐 Translation Board — 翻譯任務看板

> **用你的 AI 訂閱幫台灣說故事。** 每篇翻譯大約需要 5-10 分鐘 + 你的 AI（Claude/ChatGPT/Gemini）。

---

## 怎麼翻譯一篇文章？

### 最簡單的方式（3 步驟）

1. **挑一篇** — 從下面的「待翻譯」清單選一篇你有興趣的
2. **丟給 AI** — 把 [TRANSLATE_PROMPT.md](../prompts/TRANSLATE_PROMPT.md) 貼給你的 AI，告訴它你要翻譯哪篇
3. **提交 PR** — 把翻譯好的 `.md` 檔案放到對應語言資料夾，開 PR

### 路徑規則

| 語言     | 資料夾                              | 範例                                    |
| -------- | ----------------------------------- | --------------------------------------- |
| 英文     | `knowledge/en/{Category}/`          | `knowledge/en/Food/beef-noodle-soup.md` |
| 西班牙文 | `knowledge/es/{Category}/`          | `knowledge/es/Food/beef-noodle-soup.md` |
| 日文     | `knowledge/ja/{Category}/`          | `knowledge/ja/Food/beef-noodle-soup.md` |
| 其他語言 | `knowledge/{lang-code}/{Category}/` | 歡迎開拓新語言！                        |

### 品質要求

- ❌ 不是逐字翻譯，是用目標語言**重寫**
- ✅ 母語者讀起來自然流暢
- ✅ 台灣專有名詞保留原文（如：滷肉飯 lǔ ròu fàn）
- ✅ 保持 frontmatter 格式一致

詳細風格指南：[TRANSLATE_PROMPT.md](TRANSLATE_PROMPT.md)

---

## 📊 翻譯進度

| 語言          | 完成度 | 最需要的分類     |
| ------------- | ------ | ---------------- |
| 🇬🇧 English    | ~95%   | Art, Economy     |
| 🇪🇸 Español    | ~8%    | 所有分類都需要！ |
| 🇯🇵 日本語     | ~1%    | 所有分類都需要！ |
| 🇫🇷 Français   | 0%     | 等你來開拓       |
| 🇩🇪 Deutsch    | 0%     | 等你來開拓       |
| 🇰🇷 한국어     | 0%     | 等你來開拓       |
| 🇻🇳 Tiếng Việt | 0%     | 等你來開拓       |

---

## 🔥 推薦翻譯（高流量文章優先）

這些是最多人看的文章，翻譯它們影響力最大：

### 西班牙文 / 日文 最需要

1. 半導體產業 — 台灣最重要的產業故事
2. 民主化 — 寧靜革命的奇蹟
3. 珍珠奶茶 — 征服世界的飲料
4. 牛肉麵 — 台灣國民美食
5. 夜市文化 — 台灣最獨特的生活場景
6. 台灣原住民文化 — 南島語族的搖籃
7. 便利商店文化 — 全球密度最高
8. 台灣電影 — 從侯孝賢到魏德聖
9. 流行音樂與金曲獎 — 華語音樂重鎮
10. 開源社群與 g0v — 數位民主先鋒

### 英文待補（約 20 篇）

主要集中在 Art 和 Economy 分類。詳見下方分類清單。

---

## 📋 待翻譯清單（按分類）

> 💡 **認領方式**：直接開 PR，或在 [Discussions](https://github.com/frank890417/taiwan-md/discussions) 留言說你想翻哪篇。

### Art 🎨

- [ ] 台灣電影
- [ ] 台灣建築
- [ ] 台灣攝影
- [ ] 台灣文學史
- [ ] 台灣傳統藝術
- [ ] 台灣當代藝術
- [ ] 台灣劇場與表演藝術
- [ ] 台灣漫畫與插畫
- [ ] 台灣水彩畫的百年流變
- [ ] 台灣原住民當代藝術
- [ ] 台灣新媒體藝術
- [ ] 金馬賓館當代美術館

### Culture 🎭

- [ ] 台灣宗教與寺廟文化
- [ ] 台灣原住民文化
- [ ] 台灣原住民族16族文化地圖
- [ ] 客家文化與語言
- [ ] 語言多樣性與母語文化
- [ ] 傳統節慶與慶典
- [ ] 台灣廟會與陣頭文化
- [ ] 媽祖與大道公的傳說
- [ ] 台灣茶道與生活美學
- [ ] 台灣花布

### Food 🍜

- [ ] 台灣辦桌文化
- [ ] 台灣早餐文化
- [ ] 客家飲食文化
- [ ] 台灣原住民飲食文化
- [ ] 台灣眷村菜
- [ ] 台灣手路菜
- [ ] 台灣發酵食品與醃製文化

### Economy 💰

- [ ] 30 篇企業文章（台積電、鴻海、聯發科等）
- [ ] 夜市經濟學
- [ ] 台灣循環經濟與資源再利用
- [ ] 新創生態系

---

## 🤝 提交方式（三條路，PR 優先）

### 🥇 GitHub PR（推薦！零人工介入）

1. 在 GitHub 點 `Add file` → `Create new file`
2. 路徑：`knowledge/{lang}/{Category}/{slug}.md`
3. 貼上翻譯內容
4. Commit message：`translate(es): 珍珠奶茶 → bubble-tea`
5. 選 `Create a new branch and start a pull request`
6. PR 描述寫：用了什麼 AI + 是否母語者
7. **自動觸發審核 → Merge** 🎉

### 🥈 GitHub Issue（不會 Git 也行）

1. [開新 Issue](https://github.com/frank890417/taiwan-md/issues/new)
2. 標題：`translate(ja): 牛肉麵 → beef-noodle-soup`
3. 內容：貼完整 `.md` 檔案
4. 維護者會幫你轉成 PR

### 🥉 Email（最後手段）

寄到 cheyu.wu@monoame.com，附完整 `.md` 檔案

---

## 💡 Token Donation 概念

如果你有 AI 訂閱（Claude Pro / ChatGPT Plus / Gemini Advanced），每個月用不完的 token 可以拿來翻譯台灣文章。

這不是眾包翻譯，是**分散式運算**：

- 你的 AI 訂閱 = 一個運算節點
- TRANSLATE_PROMPT.md = 通訊協議
- PR = 輸出結果
- 母語 reviewer = 共識機制

**一個人翻不完，但一百個人每人翻一篇就是一百篇。**

---

_這份看板由腳本自動更新。最後更新：2026-03-23_
