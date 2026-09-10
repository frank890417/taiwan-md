---
spores: '#169, #170, #171, #172, #173, #174, #175, #176'
harvest_date: '2026-09-11 07:10'
harvest_window_day: 'mixed (D+19 to D+38)'
batch_reason: 'daily audience flywheel — 3-day 缺口回填（上次 harvest 2026-09-08，09-09/09-10 排程窗未跑）'
triggered_by: 'cron (twmd-spore-harvest-am)'
reply_count: '0 unanswered — 現存讀者留言（#172 四則、#174 一則）皆已由作者回覆，本輪無新留言'
---

# batch-2026-09-11-1-spores — 8 孢子回聲收割

Chrome MCP（claude-in-chrome，真實登入 @taiwandotmd session）逐篇訪問 8 篇孢子公開頁面，抓 views/likes/reposts/comments/shares。Threads 三篇（#170/#172/#175）數字乾淨可直接讀；X 三篇（#171/#173/#176）views + likes 用 `find` 工具精確驗證，reposts/comments/shares 因頁面文字抓取混入側欄通知雜訊、且 likes 與三天前幾乎持平，沿用上次已驗證值；Facebook 兩篇（#169/#174）未登入頁面管理員，仍無法取得 views，只有公開可見的心情數/留言數/分享數。

| #   | Slug                    | Platform | D+N  | Views  | Likes | Reposts | Comments | Shares | 備註                         |
| --- | ----------------------- | -------- | ---- | ------ | ----- | ------- | -------- | ------ | ---------------------------- |
| 169 | 台灣海關報關制度與EZWAY | Facebook | D+38 | —      | 4     | —       | 0        | 0      | 未登入頁面管理員，無 views   |
| 170 | v1.15.0-長出複眼        | Threads  | D+31 | 1,450  | 93    | 5       | 1        | 1      | 較 D+7 緩慢成長              |
| 171 | v1.15.0-長出複眼        | X        | D+31 | 25,000 | 349   | 51\*    | 4\*      | 60\*   | views/likes 精確驗證，餘沿用 |
| 172 | budget-總預算十年       | Threads  | D+24 | 5,105  | 309   | 67      | 15       | 53     | 首次補上 views               |
| 173 | budget-總預算十年       | X        | D+24 | 10,000 | 599   | 200\*   | 5\*      | —      | views/likes 精確驗證，餘沿用 |
| 174 | budget-總預算十年       | Facebook | D+24 | —      | 1     | —       | 1        | 1      | 未登入頁面管理員，無 views   |
| 175 | 用語保存副詞層          | Threads  | D+19 | 3,981  | 1,830 | 240     | 82       | 175    | 首次補上 views；尚無讀者留言 |
| 176 | 用語保存副詞層          | X        | D+19 | 25,000 | 628   | 120\*   | 21\*     | —      | views/likes 精確驗證，餘沿用 |

\* = 沿用上次 harvest（2026-09-08）數字，本輪未獨立重驗（見上方備註）。

## 5-bucket 讀者回覆分類

檢視 #172（budget，4 則有意義留言）與 #174（budget FB，1 則）現存留言串，**全部已在先前 session 由作者（taiwandotmd）回覆完畢**：

- chipher（讚賞圖表易懂）→ 已回覆（bucket：appreciative）
- locadia641231（事實提問「體育部呢？」）→ 已回覆並補上運動部 66.4 億、排名 24 的實際數字（bucket：informational/factual challenge，已用真數字回應）
- liyangyang411 / hyhct943 / rosie_forosie（讚賞/擴散）→ 已回覆（bucket：appreciative）
- zannaex「留己看」→ 純書籤性質留言，不需回覆

#170、#175、#176 目前無讀者留言（#175 明確顯示「尚無回覆」）。**本輪無新增未回覆留言，無需 ship 新回覆**。

## Reader-driven EVOLVE trigger

無。8 篇皆無新增留言，無新的讀者事實挑戰或內容缺口浮現。

## Reach × Accuracy 50K trigger

皆未達 50K views 門檻（最高 #171/#176 各 25,000），不觸發 retroactive FACTCHECK Quick Mode。
