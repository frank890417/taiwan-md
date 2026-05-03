# Tier 2.7 — ReaderSettings → dialog overlay：deferred decision

> 2026-05-03 sleepy-colden 同 session 的 Tier 2.7 評估。寫完看完 ReaderSettings.astro 後決定不做。

## 為什麼提出（原計畫）

per-page slowdown 報告（reports/per-page-render-slowdown-2026-05-03.md）裡，Tier 2.7 的設想是：
「ReaderSettings.astro (517 行) 每篇 article page 都 inline render → 拿掉 inline，改成全站 mounted overlay 一次」。

預估 -8~12ms / page × 6950 pages = -55~83s build。

## 為什麼不做

讀完實際 code 後 5 個事實 reset 計算：

1. **Already conditional**：Layout.astro 已經 `{isArticlePage && <ReaderSettings lang={lang} />}` — 只在 article page 才 render，hub / dashboard / index 不付這份成本。

2. **517 行多半是 i18n strings**：5 langs × 13 keys = 65 string literals + 一個 panel HTML + 一個 inline script + 一個 inline style。實際「每頁 inline 的 HTML」≈ 15KB，不是 517 行 全部都「per page render cost」。

3. **First-paint 不依賴**：ReaderSettings 預設 hidden（`display: none`），用 click 才展開。HTML 在 build time 已 emit，瀏覽器解析 cost 接近零（display: none 不 layout）。

4. **Astro 內部對 stable component 有 caching**：ReaderSettings 只依賴 `lang` prop，6 langs × 1 instance = 最多 6 次獨立 render。Astro emit 後 reuse。per-page cost 極小。

5. **Lazy hydrate dialog 工程量大**：要把 panel HTML 改成 client-side JS dynamic build，加 hydration timing、DOM injection、event delegation。改完只多省 ~5ms / page，但增加複雜度跟 first-click latency。

## 真正的 Tier 2 perf wins（已 ship 在 sleepy-colden）

| 項                                      | 原預估                             | 實測                    |
| --------------------------------------- | ---------------------------------- | ----------------------- |
| Tier 1.4 articles-index 共用 cache      | -30~50ms / page                    | 已 ship，待 prod 驗證   |
| Tier 1.2 lang-switch registry memoize   | -3~5ms / page                      | 已 ship                 |
| Tier 1.3 lang-switch-map.json prebuild  | O(1) lookup vs ~150ms build        | 已 ship                 |
| Tier 2.5 unified article.template.astro | 主要 maintainability，附帶 ~5-10ms | 已 ship 6961 pages 跑通 |

Tier 2.7 跟這些比，ROI 排最後。

## 觸發實作的條件

如果未來實測 build perf dashboard（Tier 1.1 dashboard-build-perf.json）顯示：

- per-page > 200ms 持續 7 天，且
- ReaderSettings render 在 build profile 排前 5 hot path

才回頭做 Tier 2.7。在那之前不動。

## 簽名

🧬 sleepy-colden Tier 2.7 deferred — 不做的理由 > 做的理由。
