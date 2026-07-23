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

⚠️ **檔名必須與 en sibling 相同**（en slug 是 canonical）。`scripts/tools/check-slug-consistency.py` 會擋。

### 品質要求

- ❌ 不是逐字翻譯，是用目標語言**重寫**
- ✅ 母語者讀起來自然流暢
- ✅ 台灣專有名詞保留原文（如：滷肉飯 lǔ ròu fàn）
- ✅ 保持 frontmatter 格式一致（`translatedFrom` 必填，否則 pre-commit 擋）

詳細風格指南：[TRANSLATE_PROMPT.md](../prompts/TRANSLATE_PROMPT.md)

---

## 📊 翻譯進度

**分母：853 篇 zh SSOT 文章**（不含 `_Hub` / `_ROADMAP` 等索引檔）。

| 語言          | 已翻 | 缺口 | 完成度    | 現在最需要什麼        |
| ------------- | ---- | ---- | --------- | --------------------- |
| 🇬🇧 English    | 853  | 0    | **100%**  | 維護既有譯文與 SSOT 同步 |
| 🇯🇵 日本語     | 845  | 8    | **99.1%** | 見下方缺口清單        |
| 🇰🇷 한국어     | 843  | 10   | **98.8%** | 見下方缺口清單        |
| 🇪🇸 Español    | 843  | 10   | **98.8%** | 見下方缺口清單        |
| 🇫🇷 Français   | 843  | 10   | **98.8%** | 見下方缺口清單        |
| 🇮🇩 Indonesia  | 54   | 799  | **6.3%**  | 🔥 全面開拓           |
| 🇵🇹 Português  | 54   | 799  | **6.3%**  | 🔥 全面開拓           |
| 🇻🇳 Tiếng Việt | 54   | 799  | **6.3%**  | 🔥 全面開拓           |
| 🇮🇳 हिन्दी      | 49   | 804  | **5.7%**  | 🔥 全面開拓           |

**重點：五個成熟語言都已逼近或達到 100%，真正缺人的是 id / pt / vi / hi 這四個新開拓語言。**
如果你想讓貢獻的邊際效益最大，請直接跳到這四個語言，不要再從成熟語言挑。

---

## 🔥 現在最需要翻譯的

### 第一優先：四個開拓語言（id / pt / vi / hi）

各缺約 800 篇，隨便挑一篇都是淨增益。建議從讀者觸及面最大的開始：

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

> 💡 越南文對在台越南社群（最大的移工與新住民族群）意義最高；印尼文次之。

### 第二優先：成熟語言的最後缺口

這些多半是近期新寫、還沒被投射的 zh 文章。翻完就能讓該語言歸零。

| zh 原文                          | 還缺   |
| -------------------------------- | ------ |
| `Culture/Shopping Design.md`     | ko/es/fr |
| `Music/閃靈.md`                   | ja/ko/es/fr |
| `Music/大港開唱.md`               | es/fr  |
| `People/大支.md`                  | ja/ko/es/fr |
| `People/杜潘芳格.md`              | ja/ko/es |
| `People/林昶佐.md`                | ja/ko/es/fr |
| `Society/台北吸菸室.md`            | ja/ko/es/fr |
| `Technology/AI硬體供應鏈.md`       | ja/ko/es/fr |
| `Technology/AI供應鏈海外設廠.md`    | ja/ko/es/fr |
| `Technology/半導體用水與台灣水資源.md` | ja/ko/fr |
| `Technology/台灣的電力與半導體.md`   | ko/es/fr |

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

_本看板目前由**人工**維護（先前 footer 寫「由腳本自動更新」，但 repo 內沒有任何腳本或 workflow 會寫入本檔，實際上從 2026-03-23 起就停止更新）。_

_數字重算方式：以 `knowledge/_translations.json`（由各譯文 frontmatter 的 `translatedFrom` 重建）對照 `knowledge/*/*.md` 的 zh 文章清單；id / pt / vi / hi 尚未進入該對照表，改以檔案數計算。_

_最後更新：2026-07-23（對應 upstream `dba3a7bb`）_
