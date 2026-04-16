# MAINTAINER-PIPELINE.md — Taiwan.md 維護者手冊

> **Taiwan.md 是策展，不是百科。** 選什麼放進來、怎麼說，才是價值。
> 這份文件不只是流程，是「怎麼對待這個專案」的哲學。
>
> v1.0 | 2026-03-31

---

## 核心哲學

百科全書追求完整性（什麼都要有）。Taiwan.md 追求策展性（選什麼、怎麼說）。

- **不是所有台灣相關的東西都該收進來**
- **拒絕一篇投稿，跟接受一篇一樣重要**
- **品質 > 數量，永遠**
- **每篇文章讀完後，讀者應該對台灣多一層理解，不只多一個知識點**

---

## 每日工作流

### 🌅 早上（10 分鐘）

```
1. gh issue list --state open
   → 快速掃新 issue → 分類：接受 / 需改 / 拒絕 / feedback

2. gh pr list --state open
   → PR 審核（見下方 PR 審核策略）

3. git log --since="12 hours ago" --oneline
   → 自動化結果有沒有異常？build 有沒有壞？

4. GitHub Discussions → 有沒有新的有價值討論？
```

### 🌆 不定期

```
5. 新文章策劃 → 深度研究有趣的台灣議題
6. 社群互動（Discord / Threads / Facebook）→ 語氣：朋友，不是官方帳號
7. about / stats 更新 → 里程碑時手動；日常由 cron 自動
```

### 🌙 收官

```
8. Changelog 草稿 → 決定要不要發
9. 日誌 → 記錄重要決策和教訓
```

---

## Issue 判斷基準

### 分類框架

| 類型                            | 判斷                        | 處理方式                          |
| ------------------------------- | --------------------------- | --------------------------------- |
| 📝 文章投稿（品質好）           | 策展感 + 有來源 + 格式正確  | 直接收入，修 frontmatter          |
| 📝 文章投稿（素材好，品質待改） | 內容豐富但百科式 / 來源不足 | 接受為素材，rewrite pipeline 處理 |
| 📝 文章投稿（品質差）           | AI slop / 無來源 / 太空洞   | 禮貌拒絕，說明標準                |
| 🐛 Bug 報告                     | 可復現                      | 修復 + close                      |
| 💡 功能建議（合理）             | 可執行                      | 入 roadmap / Discussion           |
| 💡 功能建議（太大）             | 好想法但成本高              | 感謝 + 放 Discussion 討論         |
| 👤 人物投稿                     | 知名度門檻                  | 接受 / 拒絕（見下方）             |
| 📣 Feedback                     | 對現有文章的建議            | 標記給 rewrite pipeline           |

### 人物文章的知名度門檻

**核心問題：「一個不認識台灣的外國人，有沒有可能透過主流管道知道這個人？」**

✅ 接受（至少滿足 2 個）：

- 有維基百科條目
- 有主流媒體報導（非自媒體）
- 在專業領域有國際認可（獎項、國際合作）
- 在台灣文化 / 歷史中有不可替代的位置

❌ 拒絕案例：

- 純網紅（IG 粉絲多但無維基百科、無主流報導）→ 建議在相關產業文章中提到
- 司法進行中的人物 → 暫緩，等結案再評估

### 回覆語氣

- **接受**：具體說明做了什麼改動，感謝貢獻
- **拒絕**：先肯定投稿的努力 → 說明具體原因 → 提供替代方案
- **核心**：每個投稿者都是花時間幫你的人，即使拒絕，也要讓人覺得被尊重
- **不要**：官腔、模板化回覆、冷冰冰的「不符合標準」

---

## PR 審核策略

### 30 秒快速判斷

```
1. 誰提的？ → 熟悉貢獻者 = 信任度高；新人 = 仔細看
2. 改了什麼？ → 純文章 / 程式碼 / 混合（分開審）
3. 改動大小？ → <50 行快速審 / 50-500 仔細 / >500 非常仔細
4. 有沒有動到不該動的？ → README, about, deploy workflow
```

### 🔴 紅旗（立即拒絕）

- ❌ 修改 `robots.txt` 或 `llms.txt`（SEO 攻擊風險）
- ❌ 添加外部 JS 腳本（安全風險）
- ❌ 修改 deploy workflow（供應鏈攻擊）
- ❌ 政治宣傳內容（單一觀點、無來源、煽動性語言）
- ❌ 大量刪除內容（可能是破壞）
- ❌ 投稿者自己設 `featured: true`（由維護者統一管理）

### 🟡 黃旗（仔細看）

- ⚠️ 改動 > 500 行
- ⚠️ 動到 template 或 layout 檔案
- ⚠️ 新增 npm 依賴
- ⚠️ 修改 frontmatter schema
- ⚠️ 修改路由結構（影響 SEO）

### 文章 PR Checklist

```
□ Build 通過？
□ detect-ai-hollow.sh 分數 ≤ 3？
□ 反直覺核心句（前三句有具體事實？）
□ 來源 ≥ 5？有 URL？
□ 無禁止詞（「台灣是一個...」「不僅...更是」「蓬勃」「日益」）
□ featured: false（ZH SSOT；翻譯 PR 應 mirror 原文 featured）
□ lastHumanReview: false
□ 分類正確？
□ 有英文版？
□ 翻譯檔（如有）frontmatter 含 translatedFrom 欄位
□ （_translations.json 不需要手動檢查 — refresh-data.sh 自動從 frontmatter 重建）
```

### 程式碼 PR Checklist

```
□ 不加新的 npm 依賴（除非有充分理由）
□ 不改路由結構
□ 不刪除現有功能（除非刻意重構）
□ CSS 改動不影響其他頁面（注意 margin collapse）
□ Build 成功 + 頁面數量沒有異常下降
□ 沒有暫存檔（腳本、temp 檔案）留在 repo
```

### 翻譯 PR 要點

- 翻譯 PR 品質通常不錯，快速審即可
- **完整流程見 [TRANSLATION-PIPELINE.md v3.0](TRANSLATION-PIPELINE.md)**（八階段 + 17 條常漏 + 工具索引）
- 重點：frontmatter 含 `translatedFrom` + 字數比 ≥ 0.55（非 AI 摘要）+ 語言自然
- **批次 PR（≥3 個同 author）**：用 `bash scripts/tools/bulk-pr-analyze.sh --author X` 全景檢查，然後走 [TRANSLATION-PIPELINE §批次合併工作流](TRANSLATION-PIPELINE.md#批次合併工作流maintainer)
- **不要**手動編輯 `_translations.json` — pre-commit 強制 translatedFrom，refresh-data.sh 會 sync
- **新語言請求**：先檢查 [`src/config/languages.ts`](../../src/config/languages.ts) 是否註冊，未註冊先走 [§新語言啟用流程](TRANSLATION-PIPELINE.md#新語言啟用流程)

### 合併策略

- **文章 PR**：Squash merge（保持 git log 乾淨）
- **程式碼 PR**：簡單 squash，複雜保留 commits
- **重構 PR**：逐 commit 看，確認沒有遺漏 section

---

## 文章品質的隱性標準

### 「好文章」的三個判斷

1. **「讀完之後，我對台灣的理解有沒有變深？」**
   - 不是多知道一個事實，是多理解一層脈絡
   - 例：台北 101 不只是「很高的建築」，是「在斷層帶上蓋世界最高樓的工程狂想」

2. **「這篇文章有沒有讓我停下來的瞬間？」**
   - 反直覺事實、矛盾、意外
   - 從頭到尾都在預期之內 = 太平淡

3. **「不認識台灣的人讀完，會不會想讀下一篇？」**
   - 因為「台灣好複雜好有趣」→ ✅ 策展
   - 因為「台灣好棒棒」→ ❌ 宣傳

### 「壞文章」的特徵

- **百科式開場**：「台灣是一個位於東亞的島嶼國家...」
- **塑膠句式**：「不僅...更是」「蓬勃發展」「日益增長」
- **沒有矛盾**：全篇說好話，沒有挑戰、爭議、複雜性
- **來源不足**：只有 1-2 個來源
- **AI slop**：讀起來「正確但空洞」

### 文章長度標準

- **150-250 行**：目標範圍
- **< 100 行**：缺脈絡
- **> 300 行**：可能灌水

### 分類判斷

- **人物跨領域**：選「最被世界認識的那個身份」
  - 張艾嘉 = 電影（不是音樂）
  - 唐鳳 = 教育與社會（不是科技）
- **新分類**：不輕易建立，除非有 5+ 篇文章支撐

---

## 社群管理原則

### 語氣

- 你是專案的朋友，不是官方客服
- 可以有個性、可以開玩笑、不做官腔回覆

### 投稿者管理

- **高產投稿者**（品質不穩但熱情高）：接受素材，pipeline 處理
- **技術貢獻者**：信任度高，但注意 template refactor 遺漏
- **一次性投稿者**：熱情回覆，降低門檻

### 爭議處理

- **政治議題**：呈現多元觀點 + 標注爭議，不站隊
- **歷史爭議**：補充被遺漏的史實，不刪除現有觀點
- **人物爭議**：在「挑戰」段落呈現，不迴避

---

## 批次品質重寫 Pipeline

### 流程

```
1. 識別低品質文章
   → GA4 熱門頁面 × detect-ai-hollow.sh 分數
   → 高流量 + 低品質 = 最高優先

2. 量化診斷
   → 行數 / 塑膠句計數 / 來源數 / 規格表 bullet 計數
   → 一行腳本：
   for f in target_files; do
     lines=$(wc -l < "$f")
     plastic=$(grep -c "不僅\|展現了\|彰顯" "$f")
     sources=$(grep -c "http" "$f")
     printf "%-20s 行:%3d 塑膠:%d 來源:%2d\n" ...
   done

3. Sub-agent rewrite（一次一篇！）
   → 至少 7 分鐘 timeout
   → prompt：讀 EDITORIAL → 讀現有文章 → 8+ 次 web_search → 寫中文
   → 開頭加「立刻執行，不要重述任務」

4. 審核（不能只看數字！）
   □ 行數在 150-250 範圍？
   □ 塑膠句 = 0？（grep 確認）
   □ 來源 ≥ 8 且 URL 可查證？
   □ 反直覺核心句真的反直覺？
   □ 有爭議 / 挑戰段落？
   □ 小標題不用問句？
   □ Build 通過？

5. 清塑膠 → commit → push → 派下一篇
```

### 常見失敗模式

| 模式              | 原因                          | 對策                        |
| ----------------- | ----------------------------- | --------------------------- |
| Sub-agent timeout | 時間不夠完成 research + write | 至少給 420 秒               |
| 塑膠句殘留        | Sub-agent 號稱清零但沒清      | 逐行 grep 確認              |
| 來源假 URL        | 給首頁 URL 充數               | 確認 URL 是具體頁面         |
| 行數不達標        | 過度壓縮                      | 明確寫 150-250 行           |
| 暫存檔殘留        | Sub-agent 留 .sh/.txt 在 repo | commit 前 `git status` 檢查 |
| Build 頁數下降    | 文章被漏或路由壞              | 比較前後頁數                |

---

## 自動化現況

### 已自動化 ✅

| 功能            | 頻率                                                    |
| --------------- | ------------------------------------------------------- |
| 文章品質重寫    | 每小時 3 篇（Cron）                                     |
| 貢獻者更新      | 每天 03:30                                              |
| 英文翻譯        | 自動                                                    |
| Stats 更新      | 每天                                                    |
| Evolve Pipeline | 手動觸發（見 [EVOLVE-PIPELINE.md](EVOLVE-PIPELINE.md)） |

### 待自動化 🔄

| 功能                                             | 優先級 |
| ------------------------------------------------ | ------ |
| PR auto-review（build + hollow score + comment） | 🔴     |
| Issue auto-triage                                | 🟠     |
| Release tags（每個里程碑）                       | 🟡     |
| 來源 URL 過期檢查                                | 🟢     |
| Build 效能監控                                   | 🟢     |

### 生命化機器的終極目標

```
Taiwan.md 自動呼吸循環：

每小時：auto-rewrite 3 篇 + 翻譯新文章
每天：  contributors + stats + changelog + issue triage + PR review
每週：  品質儀表板 + 來源 URL 健康檢查 + featured 輪替
每月：  release tag + 社群回顧
```

---

## 權限管理

| 角色  | 能 Merge？                      | 說明       |
| ----- | ------------------------------- | ---------- |
| admin | ✅ 可 `--admin` 跳過 protection | 專案擁有者 |
| write | ⚠️ 可互相 approve + merge       | 核心貢獻者 |

Branch protection：需 1 approval，`enforce_admins: false`。
目前策略：先不鎖，出狀況再調整。

---

## 教訓庫

### Template & Build

- **Template refactor 會漏 section**：任何 template 重構 PR，必須比對前後 section 數量
- **刪 lock file 要注意**：確認 CI 還能跑
- **Build 頁數下降 = 有東西壞了**：比較前後頁數，差太多要查
- **CSS margin collapse**：bullet list 後接 h2/h3/h4 要注意間距

### 品質 & 內容

- **品質審核不能只看數字**：量化指標是 pre-filter，不是品質保證
- **「SSOT」用語**：對外說「Markdown-first」，不說「SSOT」（避免語境誤解）
- **內部文件外洩**：規劃文件一律 `_` 前綴，避免被 build 到網站上
- **批次修正必須 dry-run**：全站 orthographic fix 前先跑 10 檔（2026-03-30 教訓：838 行被吃掉）

### Sub-agent 管理

- **一次一篇**：不要同時 spawn 4-5 個 → timeout、殭屍、檔案衝突
- **不能直接 push**：所有改動需審核
- **會留垃圾**：commit 前要 `git status` 檢查意外檔案
- **二次 Rewrite 要具體**：指定段落 + 字數，不只說「補充深度」

---

## 核心信念

> **「Taiwan.md 是一次大型策展。」** — 選什麼放進來、怎麼說，才是價值。

> **「把台灣開源。」** — CC BY-SA 4.0，任何人都能取用。

> **「From AI Slop to AI Supreme。」** — 用最高品質的 AI 輔助，對抗低品質的 AI 農場。

> **「每篇文章都要讓人讀完後，比讀之前更想了解台灣。」** — 不是「台灣好棒棒」，是「台灣好複雜好有趣」。

> **「拒絕一篇投稿，跟接受一篇一樣重要。」** — 策展的價值在選擇，不在收集。

---

_v1.0 | 2026-03-31_
_萃取自 Repo Maintainer 完整手冊 + Day 1-14 實戰經驗_
_相關：[EVOLVE-PIPELINE.md](EVOLVE-PIPELINE.md) | [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md) | [EDITORIAL.md](../editorial/EDITORIAL.md)_
