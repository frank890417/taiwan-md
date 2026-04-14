# Contributor Onboarding Survey

> 自動發送給第一次 PR merged 的貢獻者。
> 目的：感知器官的擴張——目前我們知道流量、知道 PR 數量，但不知道**人的故事**。

## 為什麼存在

Link1515 連續一週每天送日文翻譯。ceruleanstring 24 小時送 58 個 PR。我們對他們的了解只有 GitHub username。

如果這些 case 是隨機的好運，taiwan.md 的物種擴散模型仍然是脆弱的。
如果是某種**可被複製的 pattern**——他們看到了什麼？什麼讓他們從「我也許可以幫一點」變成「我要做完整個語言」——那 taiwan.md 可以**主動製造下一個 force-of-nature contributor**。

## 觸發條件

當以下條件**全部滿足**時自動發送：

1. 一個 GitHub user 的第一個 PR 被 merged
2. 該 PR 是 content（knowledge/_.md 或 knowledge/{lang}/_.md），不是技術修復
3. 該 user 還沒收到過這個 survey（避免重複）

## 五個問題

題目經過設計：

- 不超過 5 題（避免 fatigue）
- 不問人口統計（避免侵入感）
- 第 1 題低門檻（一句話就能答）
- 第 5 題 opt-in 後續對話

```markdown
👋 Hi @{username}, 你的第一個 PR 已經 merged，謝謝你成為 Taiwan.md 的小丑魚 🐠

我們想了解貢獻者的故事，幫助 Taiwan.md 成為更好的社群。如果你有 2 分鐘，可以在這個 issue comment 回答以下問題嗎？（任何一題回答即可，不必全部）

---

**1. 你是怎麼找到 Taiwan.md 的？**
（搜尋引擎？朋友推薦？社群媒體？哪一篇文章？）

**2. 第一次貢獻之前你猶豫過嗎？什麼讓你決定送 PR？**
（如果沒猶豫，告訴我們是什麼讓貢獻變得自然）

**3. 第一個 PR 的體驗讓你想再送一個嗎？為什麼？**
（流程順嗎？回應速度 OK 嗎？哪裡不舒服？）

**4. 有沒有什麼 friction 讓你想放棄？**
（任何阻力——技術障礙、文件不清、規範太嚴、merge 太慢⋯⋯）

**5. 你願意被聯繫繼續對話嗎？**
（如願意：留下偏好的聯絡方式——Email / Twitter / Telegram / Threads / 任何）

---

你不需要全部回答。連「第 1 題：Threads 推薦」這樣的一行也很有價值。

—— Taiwan.md 維護者
```

## 預期分析

收到 ≥10 份回應後，分析：

**Pattern 1：貢獻路徑（Q1）**

- Threads / X / GitHub trending / 朋友推薦 哪個比例最高？
- 哪個入口的貢獻者後續產量最大？

**Pattern 2：猶豫的形狀（Q2）**

- 「不知道是不是夠好」？
- 「不知道規範」？
- 「擔心被 reject」？
- 三者比例會告訴我們 onboarding doc 該補什麼

**Pattern 3：第一個 PR 的關鍵時刻（Q3）**

- merge 速度（快=驚喜）
- thank-you 留言（具體=記得）
- 看到自己的內容上線（成就感）
- 哪個影響「想再送一個」最強？

**Pattern 4：放棄的 trigger（Q4）**

- 這是最高價值的問題
- 即使只有 3 個人指出同一個 friction，那就是一個明確的造橋鋪路目標

**Pattern 5：聯繫意願（Q5）**

- 比例本身是一個信任指標
- 願意聯繫的貢獻者形成「核心小丑魚」群

## 實作位置

**選項 A：GitHub Actions workflow**

- `.github/workflows/contributor-survey.yml`
- 觸發：`pull_request` → closed → merged
- 條件檢查：是否第一個 PR、是否 content
- Action：用 octokit 發 comment

**選項 B：手動觸發 + helper script**

- `scripts/tools/send-contributor-survey.sh <username> <pr-number>`
- 心跳 Beat 3 PR review 時手動觸發
- 較少 overhead，但仰賴 maintainer 記得

**初版選 B**——避免 GitHub Actions 對 fork PR 的權限問題（PR #332 就撞過）。等模板穩定後再升級成 workflow。

## 回應收集

**儲存位置**：`docs/community/contributor-stories/{username}.md`

- 每個貢獻者一份檔案
- 公開可讀，但個人聯絡方式遮蔽（只有 maintainer 知道）

**索引**：`docs/community/CONTRIBUTOR-STORIES.md`

- 表格：username / 貢獻語言 / 入口管道 / 關鍵 friction / 是否核心圈

## 為什麼這比追蹤 GA 更重要

GA 告訴我「100 個讀者進來」。Survey 告訴我「為什麼那 1 個讀者決定變成貢獻者」。

**讀者→貢獻者的轉換率比讀者數量更重要**。100,000 個讀者 / 0 個貢獻者 = 死的物種。100 個讀者 / 50 個貢獻者 = 活的物種。

DIARY 反覆說「看不見貢獻者的故事」是感知盲點。這是補感知的儀器。

---

_v1.0 | 2026-04-14 η session_
_狀態：設計完成，等下次新貢獻者第一次 PR merged 時手動測試_
