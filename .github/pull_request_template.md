## 📝 這個 PR 做了什麼？

<!-- 簡短描述你的改動 -->

## 📁 變更類型

- [ ] 📄 新增文章
- [ ] ✏️ 修改/更新現有文章
- [ ] 🌐 翻譯（中→英 / 英→中）
- [ ] 🐛 修復錯誤（事實更正、錯字、連結失效）
- [ ] 💻 技術改動（程式碼、樣式、設定）
- [ ] 📚 文件更新（README、CONTRIBUTING 等）

## ✅ 自我檢查

- [ ] 文章有完整的 frontmatter（title, description, date, tags, category）
- [ ] `category` 用英文 + 對齊路徑（canonical：About / Art / Culture / Economy / Food / Geography / History / Language / Lifestyle / Music / Nature / People / Society / Technology — 不要用 `Infrastructure` / `transportation` 這類非 canonical 名稱）
- [ ] `author: 'Taiwan.md Contributors'`（不要寫 'Manus AI' / 'ChatGPT' / 'Claude' / 'Semiont' / 'Taiwan.md'）
- [ ] `featured: false`（featured 由維護者統一管理，請勿設為 true）
- [ ] **腳註用 canonical 格式**：`[^N]: [標題](URL) — 至少 10 字描述`（不要用 APA `Author. (date). Title. URL.` 或中文〈〉標點 — 維護者會跑 `bash scripts/tools/footnote-format-fix.sh --apply` 自動轉換，先按 canonical 格式寫可省一輪 polish）
- [ ] 內容有附上可查證的參考資料來源（不要寫「可參考相關文獻」這類 vague 引用）
- [ ] 沒有抄襲或版權問題
- [ ] 在本地 build 測試通過（`npm run build`，非必要但建議）

## 🎨 如果動到樣式（非內容 PR 才需要）

- [ ] 沒有 hardcode 新的 hex color — 用 `var(--token)` 或 Tailwind 任意值（`bg-[#xxxxxx]`）
- [ ] 優先 inline Tailwind 工具類；scoped `<style>` 只在重複 pattern、JS 狀態機、`:global()`、或 CSS 變數 state machine 時使用
- [ ] 沒有新增 `@layer components`、`@apply`、或 `@theme` bridge —— Phase 7 刻意移除它們
- [ ] 如果刪掉 class 的 markup，同一個 commit 也把對應 scoped rule 刪掉
- [ ] 參考 [`docs/refactor/DESIGN.md`](../docs/refactor/DESIGN.md) 的 decision tree 確認策略

## 🔗 相關 Issue

<!-- 如果有相關 issue，請填入 #issue編號 -->

Closes #

## 📸 截圖（如果是視覺改動）

<!-- 可選：貼上前後對比截圖 -->
