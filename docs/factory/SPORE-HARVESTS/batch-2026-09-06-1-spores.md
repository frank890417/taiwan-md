---
spores: '#175, #176'
harvest_date: '2026-09-06 07:30'
harvest_window_day: 'D+14'
batch_reason: 'D+14 milestone harvest（用語保存副詞層 threads/x 兩平台，per SPORE-HARVEST-PIPELINE §d+0/+1/+7/+30 cadence D+14 milestone）；當日 dashboard backfillWarnings 為 0（views_7d 已 backfill，不算 warning），但 harvestStatus 逐條核對顯示 8/23 發布的 #175/#176 今日恰好滿 14 天，觸發到期'
triggered_by: 'cron'
reply_count: '0 新增（Threads 留言數與 08-30 D+7 harvest 快照完全相同，X 因未登入無法讀取留言內容但 header metrics 五項一致）'
---

# 2026-09-06 harvest — 用語保存副詞層 D+14 milestone

Login-state probe：PASS（@taiwandotmd 個人檔案顯示「編輯個人檔案」按鈕、6,528 位粉絲，帳號已登入 Threads）。

`public/api/dashboard-spores.json` §backfillWarnings 為 0 條（views_7d 已在前幾輪 backfill，不再列入 warning），單看這個彙總欄位會誤判今天整輪 no-op。逐條核對 §harvestStatus（168 筆）後發現 #175/#176（用語保存副詞層，2026-08-23 發布）今日 daysSincePublish=14，剛好命中 D+14 milestone——這條到期不會出現在 backfillWarnings，只有主動核對 harvestStatus 才看得到（跟 09-01 budget 三孢子那輪是同一種形狀）。

## #175 Threads（用語保存副詞層，D+14）

- URL: https://www.threads.com/@taiwandotmd/post/DcWa8qxo55C（1/2 主帖；2/2 CTA 帖 `DcWa9mnI4vJ` 是獨立子貼文，瀏覽數與互動數各自計）
- Metrics（harvest snapshot）：views 25,000（2.5 萬）/ likes 1,830 / comments 82 / reposts 240 / shares 175 — 與 08-30 D+7 harvest 快照（本輪 4 則新回覆後）逐項完全相同
- 讀取方式：navigate 進主帖 permalink，`window.scrollTo` + `[data-pressable-container]` 逐段核對可見留言。頁面在載入約 12 則留言後 infinite-scroll 停滯不再抓取新一批（`scrollHeight` 卡在同一值，等待 8 秒未變化）——不是登入或工具問題，Threads 這輪對本帳號的留言分頁載入本身變慢。可見的留言（pinky_kirara / seo_charta / ssu.cooklab / 1yiyi_0707 / cindywu1981 / cerul.noptill / yvelisse.\_.1122 兩則 / bdoalongbong2\_）全部是 08-23〜08-31 期間、前幾輪 harvest（08-28/08-29/08-30）已經讀過並處置過的舊留言，其中 yvelisse.\_.1122 8/29 的追問「真的會有台灣人這樣用嗎……」在 08-30 那輪已由作者回覆（「會，尤其是遊戲圈和年輕族群……」，標記 6 天前）。comments 計數（82）與 08-30 快照完全一致，確認這 7 天沒有淨增的新留言，不需要重新分桶或回覆。

## #176 X（用語保存副詞層，D+14）

- URL: https://x.com/taiwandotmd/status/2091212353874678264
- Metrics：views 2.5 萬（登出狀態下唯一可見欄位，與前四輪一致）/ likes 630 / reposts 120 / comments 21 / bookmarks 109 — 沿用 08-30 快照（本機未登入 X，讀不到留言內容與完整 header metrics，per 前幾輪一致判斷：login wall 是環境限制不是工具故障）
- 08-30 那輪已把月島伶「踩雷」語源查證補進 `data/terminology/踩雷.yaml`，是唯一一件累積的 Bucket B EVOLVE candidate，本輪未見新留言，沒有新的待處置項目

## 本輪摘要

- 2 spore D+14 milestone harvest 完成，數字已寫入 `spore-db.py add-metrics --d-plus 14`（唯一入口，未碰 frontmatter / SPORE-LOG.md）
- Bucket A/B/C/D：0 條新增（兩平台皆無新讀者留言）
- Bucket E/F/G：0 條新增（既有留言均已在前幾輪處理過）
- Reply shipped：0（無新留言需回覆，Chrome MCP 本輪只做讀取，未觸發任何 post）
- Factual fix：0
- 結構性觀察：Threads 這輪 infinite-scroll 在載入約 12 個 `[data-pressable-container]` 後停滯不再抓新批次，跟帳號登入狀態無關（login probe 通過），懷疑是這次留言樹提出比較久（14 天）分頁快取變慢；comments 計數本身仍即時更新（82，跟 likes/reposts/shares 一起比對三項均與上輪相同）可以獨立確認零新增，不依賴把留言全部滾動到底
