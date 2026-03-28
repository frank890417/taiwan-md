# 👀 Reviewers Guide — Taiwan.md 協作者指南

## 角色與權限

Taiwan.md 的社群協作分為三個角色：

| 角色            | 權限                                       | 如何取得            |
| --------------- | ------------------------------------------ | ------------------- |
| **Contributor** | 提交 PR、回報 Issue                        | 任何人（Fork → PR） |
| **Reviewer**    | Approve PR、管理 Issue labels、建立 branch | 受邀（見下方標準）  |
| **Maintainer**  | Merge PR、管理 Settings                    | 僅 @frank890417     |

### Branch Protection

`main` branch 受保護：

- ✅ 所有變更必須透過 Pull Request
- ✅ 需要至少 **1 位 Reviewer approve** 才能 merge
- ✅ Stale reviews 會在新 commit 後失效
- ⚠️ 最終 merge 權限在 Maintainer

---

## 現任 Reviewers

| GitHub                                     | 擅長領域                    | 加入時間 |
| ------------------------------------------ | --------------------------- | -------- |
| [@fredchu](https://github.com/fredchu)     | 內容品質、英文校正、UI 修復 | 2026-03  |
| [@YenTingWu](https://github.com/YenTingWu) | 前端架構、i18n、DevOps      | 2026-03  |

---

## 成為 Reviewer 的標準

我們會主動邀請符合以下條件的貢獻者：

1. **至少 3 個 merged PR**（內容或技術皆可）
2. **PR 品質穩定**（清楚的描述、通過 build、考慮邊界情況）
3. **主動參與討論**（Issue 回覆、架構建議、code review 留言）
4. **尊重社群規範**（見 [CONTRIBUTING.md](./CONTRIBUTING.md)）

不需要自己申請——我們會在 Issue 中公開邀請，確認意願後發送 collaborator 權限。

---

## Review 流程

### 1. 收到 Review 請求

當你被 assign 為 reviewer（或自願 review），請檢查：

**內容類 PR：**

- [ ] 事實是否正確？有沒有可查證的來源？
- [ ] 語氣是否中性？（不偏頗、不過度美化、不政治宣傳）
- [ ] 用語是否符合 [TERMINOLOGY.md](./TERMINOLOGY.md)？
- [ ] 文章結構是否符合 [EDITORIAL.md](./EDITORIAL.md)？
- [ ] 有沒有空洞修飾詞？（蓬勃/日益/積極/顯著/豐富/完整/多元）

**技術類 PR：**

- [ ] `npm run build` 是否通過？
- [ ] 有沒有破壞現有功能？
- [ ] 程式碼風格是否一致？（Prettier 已設定）
- [ ] 是否有不必要的大型依賴引入？

### 2. 給出 Review

- **Approve** ✅ — 品質達標，可以 merge
- **Request Changes** 🔄 — 需要修改，具體說明哪裡要改
- **Comment** 💬 — 有建議但不阻擋 merge

### 3. Merge

只有 Maintainer（@frank890417）會執行 merge。Reviewer approve 後，Maintainer 會儘快處理。

---

## Review 原則

### 我們鼓勵的

- 🟢 具體的修改建議（「第 15 行的年份應該是 1684，不是 1683」）
- 🟢 提出替代方案（「這裡用 fetch API 會比 define:vars 更好，因為...」）
- 🟢 肯定好的部分（「這個抽象化做得很好！」）
- 🟢 標注嚴重程度（「nit:」表示小事、「blocking:」表示必須修改）

### 我們避免的

- 🔴 模糊的批評（「這個不太好」→ 請說明為什麼、怎麼改）
- 🔴 風格偏好之爭（已有 Prettier，不需要爭論格式）
- 🔴 過度完美主義（「先求有，再求好」— 不要因為小瑕疵阻擋有價值的貢獻）

---

## Issue 管理

Reviewer 可以使用以下 labels：

| Label                | 用途                      |
| -------------------- | ------------------------- |
| `good-first-article` | 適合新手撰寫的文章主題    |
| `content`            | 內容相關（新增/修改文章） |
| `bug`                | 錯誤修復                  |
| `enhancement`        | 功能改進                  |
| `i18n`               | 翻譯相關                  |
| `discussion`         | 需要社群討論              |
| `duplicate`          | 重複的 Issue              |
| `wontfix`            | 不會處理（需說明原因）    |

---

## 溝通管道

- **GitHub Issues & PR comments** — 主要討論場所（公開、可追溯）
- **GitHub Discussions** — 開放式提案和想法

---

## FAQ

**Q: Reviewer 有薪水嗎？**
A: 沒有。Taiwan.md 是純志工開源專案。我們用 [All Contributors](https://allcontributors.org/) 記錄每位貢獻者。

**Q: 我可以同時是 Reviewer 和 Contributor 嗎？**
A: 當然！你可以繼續提交 PR，但不能 approve 自己的 PR。

**Q: 如果我太忙無法 review 怎麼辦？**
A: 完全沒問題。沒有最低活躍要求。有空就幫忙，沒空就休息。

**Q: 如何退出 Reviewer？**
A: 隨時跟 @frank890417 說一聲，或直接在 GitHub 移除自己的 collaborator 權限。

---

_Last updated: 2026-03-21_
