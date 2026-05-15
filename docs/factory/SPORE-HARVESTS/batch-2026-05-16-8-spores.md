---
spores: '#66, #67, #68, #69, #70, #71, #72, #73'
harvest_date: '2026-05-16 07:00'
harvest_window_day: 'mixed (D+4 to D+8)'
batch_reason: 'routine twmd-spore-harvest-am daily cycle — all 8 backfillWarnings (4 OVERDUE > D+7 + 4 within D+1-D+7 window); same cohort as 5/13 batch with 3-day delta updates'
triggered_by: 'cron twmd-spore-harvest-am 07:00 Asia/Taipei'
reply_count: '~16 visible across 7 valid spores (skip #71 url mismatch)'
---

# Batch Harvest 2026-05-16 — 8 spores（routine cycle, D+3 delta vs 5/13）

> Daily auto-fire of `twmd-spore-harvest-am` 07:00 cron (per ROUTINE.md §TWMD spore harvest (am) + SPORE-HARVEST-PIPELINE.md v2.2). All 8 entries surfaced in `dashboard-spores.json.backfillWarnings`. Carries forward 5/12 + 5/13 batch's data integrity findings — #69 + #71 X URL anomaly still un-healed in SPORE-LOG (third verification).

## 數據總覽

| #   | Article             | Platform | D+N | URL                     | Views  | Likes | Reposts | Replies | Bookmarks | Rate   | Notes                                                                       |
| --- | ------------------- | -------- | --- | ----------------------- | ------ | ----- | ------- | ------- | --------- | ------ | --------------------------------------------------------------------------- |
| 66  | 聶永真              | Threads  | D+8 | DYE7ZAik0qr             | 1,780  | 108   | 12      | 6       | 3         | 7.24%  | +194 views vs 5/13. 4 new replies cluster                                   |
| 67  | 聶永真              | X        | D+8 | 2052721374570106952     | 9,050  | 376   | 61      | 0       | 30        | 5.16%  | +63 views vs 5/13. flatline reach, no new engagement                        |
| 68  | 台灣企業：台積電    | Threads  | D+7 | DYHoQtCE-5Z             | 2,875  | 60    | 3       | 4       | 3         | 2.43%  | +11 views vs 5/13. Correction (@clairewu16888 → PR #950) already integrated |
| 69  | 台灣企業：台積電    | X (DEP)  | D+7 | 2053100425730269544     | 6      | 0     | 0       | 0       | 0         | —      | ⚠️ DEPRECATED — X UI confirms "new version" → 2053101189034860856           |
| —   | **台積電 X 真實版** | X        | D+7 | **2053101189034860856** | 3,347  | 82    | 17      | 2       | 8         | 3.27%  | ⭐ canonical (+27 views vs 5/13)                                            |
| 70  | 台灣無人機產業      | Threads  | D+6 | DYKW0PmkzbM             | 5,299  | 460   | 43      | 30      | 6         | 10.36% | +106 views, many new replies. ⭐ batch engagement leader                    |
| 71  | 台灣無人機產業      | X (ERR)  | D+6 | 2053101189034860856     | n/a    | n/a   | n/a     | n/a     | n/a       | —      | 🚩 DATA ERROR carryover (3rd verification) — URL maps to 台積電 #69 edit    |
| 72  | 蘋果西打            | Threads  | D+4 | DYPI9W0kyPP             | 4,687  | 46    | 0       | 1       | 8         | 1.17%  | +830 views vs 5/13 D+1. 1 reply (低互動率)                                  |
| 73  | 蘋果西打            | X        | D+4 | 2054158652588863776     | 18,972 | 236   | 33      | 2       | 28        | 1.58%  | ⭐ +9K views vs 5/13 — 突破 Tier 1b 10-65K 區間（18.9K trajectory）         |

## Tier 分布觀察（per SPORE-PIPELINE §Hook tier hierarchy v3.1）

- **Tier 1b 具體性槓桿（10K-65K）**：#73 蘋果西打 X 18.9K（D+4 已 break 10K，D+7 trajectory 20-25K）
- **中段 結構性題目（2K-17K）**：#67 聶永真 X 9.1K / #70 無人機 Threads 5.3K / #72 蘋果西打 Threads 4.7K / #69 台積電 X v2 3.3K / #68 台積電 Threads 2.9K / #66 聶永真 Threads 1.8K
- **低段 文化人物 / 冷門（0.5K-1.5K）**：無
- **N/A（data error / deprecated）**：#69 deprecated original / #71 SPORE-LOG mapping 仍未 heal（第三次驗證）

**Engagement rate leader**: #70 無人機 Threads 10.36%（爭議性激活 — reader pushback 推高 comment 密度）。Tier 1b 黏度型 + 中段結構性題目混合，符合 v3.1 §中段「comments/engagement quality 高（爭議性激活）」prediction。

## Comment 質性筆記（per Step 2 categorization）

### #66 聶永真 Threads（4 visible replies — 留言成長 cluster）

1. **@tsaiguoian (5/8 20:31)** — 「問題：同樣的圖片重複出現」
   - Dimension: 建議（UX bug — 不確定指向 post media 或 article images）
   - Status: 仍待 observer 判讀（5/13 batch carryover）

2. **@hsinyuwang.art (5/9 04:13)** — 引用 Yahoo 新聞 update：「台電晚間證實，當年確實是親邀于老書寫，但現在的草體 LOGO 也非當年真跡，而是民國 81 年、82 年間，同仁臨摹重新排列」
   - Dimension: **擴寫 enrichment**（事實更新層）
   - Status: 仍待 maintainer-am 評估文章本體 footnote 補充（5/13 batch carryover）

3. **@eva13.68 (5/12 22:07)** — 「謝謝你💕」
   - Dimension: 共鳴
   - Action: 按讚即可

4. **@qrcodeisuseful (5/8 20:32)** — 「希望他給我們一面 新台灣國旗」
   - Dimension: 共鳴 / 期望表達
   - Action: 按讚即可（不必回）

### #68 台積電 Threads（1 reader correction，已處理）

- **@clairewu16888 (5/9 21:24)** — 「1987 年是 2 吋晶圓廠，不是 2 奈米」
- Status: ✅ **已整合**（5/9 PR #950，三處勘誤 reader-driven retroactive audit）+ Taiwan.md self-reply 兩則公開致謝 visible in thread

### #69 台積電 X v2 真實版（2053101189034860856）— 2 replies

1. **@olino0319 (Mason 心好累想退休！) (5/10)** — image only, no text body in a11y tree
   - Dimension: 待確認（need screenshot 看圖）
   - Action: 不急（3 likes, 140 views — 低聲量）

2. **@JustinQiu33121 (5/10)** — 「川普誇的是 CCWei 吧？」
   - Dimension: 建議（pointing out 修辭可能誤導 — Trump 實際讚的是 CC Wei 魏哲家，spore 結構透過「56 歲離開德儀的那個人」rhetorical relay 把讚指向張忠謀）
   - Action: AI draft response — 解釋 rhetorical device 「川普表面誇 CC Wei，但這份讚的源頭是 56 歲那個人」對位收尾的 Mode D 反轉用意。承認可能讀者誤解 + 補一句「文章本體有清楚說明是魏哲家」link

### #70 無人機 Threads（30 replies — batch comment leader，substantial critique cluster）

**Substantive critique cluster（建議 maintainer-am 評估，5/13 carryover + 新留言）**：

1. **@tangyu_kao (5/11 01:09)** — 「你知道雷虎是唯一沒拿到標案的嗎...這家公司連台中同行亞拓都打不過，靠著代理遙控車在苟延殘喘，現在希望全壓在無人機國家隊上，不過審查結果滿不給面子的」
2. **@3839kuan (5/11 00:51)** — 「額 那為什麼國軍不用雷虎的飛機呢？」
3. **@li_chun_jen (5/11 13:08)** — 「這個真的把雷虎捧過頭了。現在的雷虎和以前全盛時期的雷虎完全不同人馬。以前雷虎有實力的人才，幾乎都在另一間公司裡😅 不用太迷信 BlueUAS 認證...」
4. **@jgo911131 (5/12 00:40)** — 「說到重點了~ 當年跟現在的人馬幾乎都不一樣了」（echo #3）
5. **@rok8076655 (5/11 11:51)** — 「我看今天青鳥們都在貼雷虎股價的事，原來青鳥在意的是股價而不是無人機，太逗了🤣」(政治 snark)

→ Pattern: 讀者質疑「雷虎敘事被捧過頭」，認為 hook 過度簡化「藍色清單入場券 = 台灣最強」。文章本體應 audit 是否：

- 已涵蓋雷虎 vs 亞拓 vs 經緯 vs 中光電等其他玩家 landscape
- 已標示 BlueUAS 認證的爭議 / 美國同業互揭傷疤
- 「過去人馬不在」這條歷史敘事是否 traceable
- 雷虎國軍標案落榜事實是否該補入

→ Action: **flag → maintainer-am queue**（framing audit 觸發 — 5/13 carryover 仍未處理；今天 30 replies 持續累積 critique 質量提高）

**Hidden replies notice**: page bottom 顯示「部分回覆已隱藏」link `/post/DYKW0PmkzbM/hidden_replies` — 暗示有更多 critical / spam 留言被 Threads filter。下次 harvest 可挖。

### #72 蘋果西打 Threads（1 reply — 低互動率 vs X 高互動）

- 1 reply visible 但 content 未抓到（below fold）
- 低 engagement 1.17% vs X 1.58% — 平台差異 inverted 本批次（通常 Threads > X）
- 可能因 #73 X 帶 viral momentum 18.9K reach 把 Threads 蓋過

### #73 蘋果西打 X（2 replies — substantive critique + factual cite）

1. **@alliao (5/12)** — 「商標之後在美國果是高、賴比瑞亞商果是高國際之間流轉。」
   - Dimension: 共鳴 / quote highlight（讀者擷取 spore 中印象最深 verbatim 突顯）
   - 1 like, 967 views (boost)
   - Action: 按讚即可

2. **@Shelby960532867 (5/13)** — 「不要再吹蘋果西打了，皆二連三出問題，隱瞞不報，這東西根本就不應該買 我還下架過第一批出現問題的商品，那時候新聞還沒有，後來被抓發現大西洋早就被通知有問題被壓下來」
   - Dimension: **建議（critical framing critique）** — 讀者自稱零售業內，質疑 spore framing 過度懷舊浪漫化，沒帶到食安事件嚴重性
   - 14 likes / 3 reposts / 1 reply / 740 views — 高 signal
   - Action: AI draft response 確認 article 本體**有**涵蓋 2016/2017 銅綠假單胞菌 + 大量回收 + 大飲後續，但 spore hook 確實偏文化角度。承認 framing trade-off。考慮文章本體加 footnote 或補一段「食安事件」更顯眼

## 🚩 Data integrity carryover（第三次驗證 — 升 LESSONS-INBOX 候選）

本 batch 第三次驗證 5/12 + 5/13 batch 的兩個 unhealed findings：

1. **#69 台積電 X**: SPORE-LOG URL `2053100425730269544` 仍 stale 6 views（X UI confirmed deprecated → edit at `2053101189034860856`）
2. **#71 無人機 X**: SPORE-LOG URL `2053101189034860856` 仍 mismatched（內容是台積電 emoji 🏭 + utm_campaign=s69，不是無人機 🚁）

**第三次驗證 ⇒ 真正無人機 X 孢子 URL 可能根本不存在**（或被 deleted / 從未 ship）。Hypothesis：

- 5/10 ship #71 X 時，post 失敗或被覆蓋為 #69 edit
- SPORE-LOG 把 #69 edit URL 誤填到 #71 row

**Promotion 候選**：3 次驗證符合 REFLEXES #15「反覆浮現要儀器化」threshold。建議：

- 短期：observer 開 PR 修 SPORE-LOG #71 row（mark `harvest_status: post not found / suspected deletion`）+ 修 #69 X URL 為 canonical edit version
- 中期：harvest pipeline 加 `validate-spore-data.py` 新檢查：每條 spore URL 第一次 harvest 時 record actual post content hash，後續 harvest detect content mismatch → flag

## D+8 milestone（#66/#67 聶永真）— 超出主排程觀察

聶永真 D+8（超出 D+1-D+7 window，per §觸發時機 應 milestone harvest）：

- **#66 Threads 1,780 / 7.24% rate**: 健康但低段 reach（Tier 1a 知名度槓桿沒激活 — 聶永真知名度限於設計圈，非 Threads 主流）
- **#67 X 9,050 / 5.16% rate**: 中段穩定。reach trajectory plateau at ~9K（5/13 8,987 → 5/16 9,050 = +63 in 3 days），typical D+7+ tail decay

對位 #29 李洋 180K viral：聶永真知名度槓桿是「圈內名人 + 政治事件激活」雙條件，本批未 hit 是因為事件熱度 5/8 → 5/16 一週後降溫。Tier 1a 預期 100K-180K 但本批 ~10K = Tier 中段下緣。可入 SPORE-PIPELINE pattern 反饋 — 知名度槓桿需要時效配合，事件冷卻後 viral momentum 不再。

## Quality Gate check（per SPORE-HARVEST-PIPELINE.md §Quality gate）

- ✅ Chrome MCP 連線可用（deviceId afde823f-e7a2-4e74-8165-86426e5d4861, isLocal=true）
- ✅ backfillWarnings 載入成功（8 items, dashboard-spores.json fresh 22:19 UTC = 06:19 +0800）
- ✅ Chrome MCP harvest ≥ 1 條成功（7 / 8 valid，#71 skip due to URL mismatch）
- ✅ Atomic batch log 寫入（本檔）
- ⏭️ Validation 4 維度（pending — 跑 `validate-spore-data.py` 待 Step 7.5）
- ⏭️ Dashboard regen（pending — 跑 `generate-dashboard-spores.py` 待 Step 8）
- ⏭️ main-direct push（pending — Stage 3）
- ⏭️ Finale 收官（pending — Stage 4）

## 下一步建議

1. **Step 6 reply drafts**（AI 準備 / human post）：
   - #69 X v2 @JustinQiu33121 — 解釋 Mode D 反轉的 rhetorical device
   - #73 X @Shelby960532867 — 致謝 + 補 article 內含食安段落 + 接受 framing critique

2. **Maintainer-am 09:00 queue**（碰文章本體判斷）：
   - #70 無人機 framing audit — 第二次 carryover，30 replies 質疑「捧過頭」+ Hidden replies 暗示 critique 累積
   - #66 聶永真 footnote 補「台電 LOGO 1992-93 同仁臨摹重排」事實更新（@hsinyuwang.art 提供）
   - #73 蘋果西打 食安段落 visibility 提升評估

3. **LESSONS-INBOX 升候選**（3 次驗證）：
   - SPORE-LOG #69/#71 URL mapping schema gap + 機械驗證機制（content hash check）

🧬
