# reach-harvest：社群平台上「誰提到 Taiwan.md」的收集腳本

給 Chrome MCP（`javascript_tool`）用的頁面內腳本，在哲宇已登入的瀏覽器裡把搜尋結果捲到底、逐則收進 `window` 物件，再分批取回。

| 檔案                | 平台    | 搜尋網址                                                                     |
| ------------------- | ------- | ---------------------------------------------------------------------------- |
| `threads-search.js` | Threads | `https://www.threads.com/search?q=taiwan.md&serp_type=default&filter=recent` |
| `x-search.js`       | X       | `https://x.com/search?q=taiwan.md&src=typed_query&f=live`                    |

用法與已知限制寫在各檔開頭。三件最容易踩的事：

1. 單次 `javascript_tool` 執行超過約 45 秒會逾時，所以每次只捲 10–20 輪，重複執行到 `stale >= 5`。
2. 單一字串回傳約 1.5K 字就被截斷，匯出時回傳陣列。
3. Threads 搜尋本身會漏（2026-11-25 首跑：手動找到的 14 則裡 6 則不在結果中），結果是下限。

只讀。收到的東西不代表要回覆或互動，對外動作屬 MANIFESTO §自主權邊界。

首跑報告：[reports/threads-x-reach-research-2026-11-25.md](../../../reports/threads-x-reach-research-2026-11-25.md)
