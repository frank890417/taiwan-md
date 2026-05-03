# P2 index.astro × 6 langs unification — 為什麼 deferred

> 2026-05-03 sleepy-colden 後段，P1 [category]/index.astro 完成後評估 P2

## TLDR

P2 中止：6 個 index.astro 看似 5266 行重複（861~955 lines each），但實際 **每 lang 有 curated bespoke prose**，不是 boilerplate copy-paste。Unify 會 regression（覆蓋掉 curated content）或需要 i18n 化 ~300+ prose snippets（多小時工程）— 不在 sleepy-colden session 範圍內。

## 證據

en index 的 nature hall 段：

> "On an island smaller than the Netherlands, 59,000 species crowd together — 2.5% of global biodiversity. The Formosan landlocked salmon has survived 15,000 years in Dajia Creek; fewer than 600 Formosan black bears remain."

zh index 的 nature hall 段：

> （另一份 curated 中文敘事，不是 en 的翻譯）

兩份都是 bespoke copywriting，不是 data-driven content。每個 lang 有自己的 narrative voice 設計給 native reader。

## P1 / P2 對比

|                | P1 [category]/index.astro | P2 index.astro                              |
| -------------- | ------------------------- | ------------------------------------------- |
| 行數 (6 langs) | 9280                      | 5266                                        |
| 重複類型       | 結構 + 邏輯 (data-driven) | 結構 + curated prose (content-driven)       |
| Unify 風險     | 低（i18n keys 已存在）    | 高（覆蓋 lang prose 或需建 ~300 i18n keys） |
| ROI            | 高（-72%）                | 低（需要 polish session 配合 i18n 工作）    |
| 結論           | ✅ 已 ship                | ⏸️ defer                                    |

## 觸發 P2 實作的條件

要做 P2 unification，需要：

1. **i18n 大舉化** — 把 6 langs 各自的 hall narrative 拆成 ~50 i18n keys 一致管理（每個 hall 的標題 + 兩段描述 + topic-pill labels）
2. **內容 audit pass** — 哪些是 lang-specific 不該翻譯，哪些是 boilerplate 該共享
3. **Layout title + meta description** — 6 lang 各 1 組
4. **section title + subtitle** — 「不知道從哪開始？」「用這 5 篇文章...」等 hardcoded zh

工時估：3~5 hr 全聚焦在這。Sleepy-colden session 已經 ship 兩個重構（article.template + category-hub.template），加 P2 風險過高。

## 真正的瓶頸：i18n key 工作 vs structural unification

P1 [category]/index.astro 工作，因為 `article.editPage` / `article.viewAll` / `article.exploreTaiwan` 等 i18n keys 早期 ship 時已建好。Template unification 只是把 6 個檔案的 `<button>編輯</button>` 改成 `<button>{t('article.editPage')}</button>`。

P2 index.astro 不工作，因為「nature hall 開場」「history hall 開場」這類 narrative 從來沒有 i18n key — 每 lang 直接 hardcode prose。要 unify 必須先建 keys。

**DNA 教訓**：寫 page 時就用 i18n key，未來 unification 就不需要 retrofit。Hardcoded prose ≥ 3 處重複時應該升級到 key。這條進 CONTRIBUTING.md。

## 其他 P3-P5 候選

audit 後確認 graph / terminology / projects 都不適合 unify：

- **graph.astro**: zh + en 是真實實作；ja/ko/es/fr 是 8-line **intentional redirects** 到 `/graph`（lang-neutral viz）。不是 duplicate。
- **terminology/index.astro**: zh 923 行是 zh-only 中國/台灣詞彙 converter；en/ja/ko/es/fr 是 8-line redirects 到 `/terminology`。intentional architecture。
- **projects.astro**: zh + en 有真實實作但缺 ja/ko/es/fr。要做的是「補齊 4 langs」不是 unify。需要 contributor input 先決定 ja/ko/es/fr projects 列表是否該跟 en 一樣。

結論：sleepy-colden session 把該做的 unification 做完了。剩下不該強行做。

## 簽名

🧬 sleepy-colden P2 deferred — 不該強做的不做，留紀律給未來。
