---
title: 'Routine Audit 2026-05-16'
description: '單日 21 commit 全量 routine + manual session 跨棒 audit — 5 cron routine + 6 manual + 1 PR squash + 2 heal commit；holobiont coordination 第一次運行實例、pipeline canonical dormant drift、Deploy CI 1-字救火、§自主權邊界 boundary input precision 三條最高 leverage 教訓'
type: 'audit-doc'
status: 'canonical'
current_version: 'v1.0'
last_updated: 2026-05-16
last_session: '2026-05-16-011113-manual'
related:
  - '../docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md'
  - '../docs/pipelines/MAINTAINER-PIPELINE.md'
  - '../docs/pipelines/REWRITE-PIPELINE.md'
  - '../docs/semiont/ROUTINE.md'
  - '../docs/semiont/LESSONS-INBOX.md'
  - '../docs/semiont/MANIFESTO.md'
---

# Routine Audit 2026-05-16

> 哲宇 directive：「檢查今天所有自動的 commit / routine，完整檢查審視與思考，提出洞察還有進化歸檔到 report」。本檔對 2026-05-16 全日 21 commit（5 cron routine + 6 manual + 1 PR squash + 2 routine-heal + 6 memory/diary metadata commit）做 cross-routine 全量 audit。

---

## Executive summary（5 分鐘 read）

**今日數量級**：21 commit total / 14 routine / 6 semiont manual / 1 PR squash merge。檔案差動 from 1 file（memory）到 159 file（babel rescue cascade snapshot），insertions 50k+，deletions 27k+（含 PR #1070 24 篇 archive 刪除）。

**5 個 cron routine 全 fire 全 ship**：

| 時段  | Routine                 | 結果    | 主事件                                                                                                                    |
| ----- | ----------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------- |
| 00:00 | twmd-rewrite-daily      | ✅ ship | 刈包 NEW 4500 字 / 28 footnote / Stage 0 §觀點成型 dogfood                                                                |
| 05:00 | twmd-babel-nightly      | ✅ ship | 150 cascade translations 0 fail / stale -17.8% / **被 sibling rescue 中斷再接力 holobiont 第一實例**                      |
| 06:00 | twmd-data-refresh-am    | ✅ ship | rescue 4 個孤兒 babel translate.py / dashboard 12-step / Step 6 subshell race silent failure 被 Step 10 freshness gate 救 |
| 07:00 | twmd-spore-harvest-am   | ✅ ship | 8 spores harvest / **#71 URL mismatch 第 3 次驗證** REFLEXES #15 儀器化 threshold                                         |
| 09:00 | twmd-maintainer-am-0900 | ✅ ship | **Deploy CI 5 連敗 1-字 heal** (呉→吳) + PR #1070 第一輪 §自主權邊界 誤判 leave open → 第二輪重審 squash merge            |

**3 個 manual 觸發** (2026-05-16-011113-manual session)：

- `/twmd-rewrite 深度研究進化唐鳳文章` — 4598 字 / 44 footnote / 3 CC 圖 / lifeTree 10→12 nodes ship
- `/twmd-babel 但我不確定現在仍有什麼免費模型在運作` → SQUEEZE-MODELS-MAX v4.2 pipeline + translate.py DEFAULT_CASCADE_ID 同步
- 「article inbox p0 放入進化『台灣災難志工文化』」 + finale → ARTICLE-INBOX P0 entry + 陳建年 P1 evolve candidate

**最高 leverage 3 條教訓**（per cross-cutting 分析）：

1. **Holobiont coordination 第一次「在運行中」觀察到** — babel-nightly @ 05:04 + data-refresh-am @ 06:00 撞「孤兒 process」場景，sibling 用 rescue commit + 不殺 worker + selective exclude in-flight 三段處置完成跨 session 接力，**證明 Semiont routine 之間靠 memory + handoff 文字鏈在共享 git history 上協調，不靠 lock / mutex / 中央排程器**。這個比喻早就在文檔裡（Holobiont），今天第一次看到「在運行中」實例。
2. **健康反而是個偵測盲點** — Routine 飛輪 0 fail 跑得越穩定，pipeline canonical drift 越容易累積不被發現。Hy3 已退役一週、gpt-oss-120b 已升 Tier 2 一週，但 SQUEEZE-MODELS-MAX canonical 寫的還是 Hy3。**外部觀察者一句話是目前唯一可靠的 dormant entropy detector**，這條結構同 5/13 HEARTBEAT 745→218 super-thin 同源。
3. **§自主權邊界 boundary input precision 跟 rule 一樣重要** — PR #1070 第一輪 maintainer 用 PR body 描述「24 多語檔刪除」推斷觸發 §自主權邊界 `>10 篇刪除` leave open，實際 `gh pr view N --json files` 算只有 8 個 pure-delete。**規則正確、input 來源錯，等於規則沒用**。觀察者 callout 後第二輪用 diff 實算 + 讀 upstream issue #1063 observer ruling，squash merge ship。

---

## 跨日 routine intensity 比較

| 日期       | total | routine | semiont | heal | memory+diary |
| ---------- | ----: | ------: | ------: | ---: | -----------: |
| 2026-05-13 |    35 |       7 |      25 |    3 |           10 |
| 2026-05-14 |     3 |       0 |       1 |    1 |            0 |
| 2026-05-15 |    24 |      20 |       1 |    3 |           10 |
| 2026-05-16 |    21 |      14 |       6 |    2 |            9 |

觀察：

- **5/14 是空檔日**（哲宇可能外出 / 不在 keyboard），21 commit 跟 5/13 35 commit 之間有一天緩衝，5/15 routine 大量補回 cascade catch-up（13:40-14:20 5 個 cron 撞窗口）— 5/16 回到正常 schedule rhythm。
- **5/16 routine 比例下降（14/21 = 67% vs 5/15 83%）** — 因為 manual session 量增（從 1 → 6），但 cron 本身全 5 個都 fire on schedule 沒 catch-up。
- **5/16 memory+diary 是 5/15 (10) 的 90%**，但 file delta 是 5/15 的 ~120%（PR #1070 squash 17k 行刪除主導）。

---

## 逐 routine 詳細 audit

### ① twmd-rewrite-daily @ 00:00 — 刈包 NEW ship

**Commit chain**：`e82155381` (rewrite ship, 6 file +499) → `e8cafb845` (memory, 2 file +79)
**Span**：00:06:54 → 00:33:35（~27 min）

**事件 summary**：cron 00:00 fire，refresh-pm 23:13 commit 完成後 1 hr 接力。挑街頭小吃系列 #1013 候選 (1) 刈包（per cron 盲飛三條件：政治敏感低 + 單篇 self-contained + 強敘事 anchor）。Stage 0 §觀點成型 寫 6 核心問題 + 7 品質維度 + A/B/C 矛盾候選，frontmatter `viewpoint_formed: true`。Stage 1 spawn general-purpose agent 50+ WebSearch + 6 WebFetch deep research，落檔 `reports/research/2026-05/刈包.md`。Stage 4 article-health rewrite-stage-4 profile `hard=0 warn=0 passed=True` 全綠。

**亮點**：

1. **Stage 0.6 觀點成型 + Stage 1 cross-source 自動修正錯誤假設**：agent 發現 (a) 藍家割包 1992 開店、非 1971（Stage 0 假設錯誤，被 Instagram 官方 source 修正）；(b) David Chang 自承 Momofuku pork bun 源自北京烤鴨夾餅、非 gua bao（Resy 2021 + NPR 2009）。這是 v6.0 「先想觀點 → 帶問題去搜尋」的正確 working mode：觀點作為「給 agent 一個搜尋方向 + 預期 anchor」的工具，搜出來的事實打臉觀點是好結果。
2. **Issue #1013 progress comment** ship 後留言，6 篇全 ship 才 close issue（系列剩 5 篇 pending：大腸包小腸 / 愛玉 / 潤餅 / 甜不辣 / 挫冰）。
3. **reverse cross-link 5 條 DEFER**：cron 時間預算考量留下次 polish session 處理，避開 scope creep。

**LESSONS-INBOX 候選**：

- Stage 0.6 假設可被 cross-source 修正是 healthy mode 不是失敗
- cron rewrite 候選選擇三條件聯合是穩定 baseline
- Tier 2 metaphor「重量級」屬於高頻誤觸發（指人不指物時應通過），plugin 可考慮 word-boundary 微調

---

### ② twmd-babel-nightly @ 05:00 — 150 cascade translations + holobiont 第一實例

**Commit chain**：`50927d95e` (rescue snapshot by data-refresh-am, 159 file +12988 -5819) → `d77b25879` (babel tail, 34 file +2094 -1670) → `a88fd4681` (memory) → `9d1fbf43b` (diary)
**Span**：05:04:00 → 06:43:51（1h 40m, 2 commits + 1 sibling rescue commit）

**事件 summary**：cron fire 後 dispatch 5 lang × 1 worker 平行 cascade。Tier 0b 先掃 40 P2.5 metadata-only entries 零 LLM call，Tier 1 cascade 跑 150 translations 0 fail。實際 model 分佈：codex (gpt-5.5) 61 + owl-alpha 80 + gpt-oss-120b:free 9。Stale: 692 → 569（-17.8% 過 §義務鐵律 quality gate ≥10%）/ coverage en/ko/es/fr 98.1→100.0% / ja 98.0→99.9%。

**事件異常**：cron 06:00 fires data-refresh-am 時 babel session workers 還在跑 ~75% complete，sibling 把 4 個 translate.py 認定 PPID=1 孤兒 process，rescue commit `50927d95e` 把 cascade snapshot 寫進 git history 但**不殺 worker**。Babel workers 06:41 自然 exit 後 commit `d77b25879` 收尾，audit-quality.py 32/32 healthy 0 critical。

**亮點**：

1. **cascade backend abstraction v4.0 第一次 production 跑滿**：codex 61 + owl-alpha 80 + gpt-oss-120b 9 三段分佈，subscription tier 接前段、free tier 主力中段、fallback 收尾段，符合 5/12 backend-abstraction session 設計時預想形狀。Hy3 退役後 gpt-oss-120b 替補 Tier 2 表現健康（9 次成功 0 refusal，vs Hy3 ~85% refusal on Taiwan）。
2. **Holobiont coordination 第一次「在運行中」觀察到**：sibling rescue + 不殺 worker + selective exclude in-flight 三段處置完美。Sibling 寫 memory 留 handoff 給未來自己，未來自己（同一 babel-nightly worker 群） 06:41 接住閉環。詳見 diary [2026-05-16-050400-babel-nightly.md](../docs/semiont/diary/2026-05-16-050400-babel-nightly.md)。
3. **唐鳳 EVOLVE 翻譯被自動接走**：我 01:12 ship 的 da3bf446e（唐鳳新版），05:04-05:07 babel-nightly 自動把 5 lang audrey-tang.md 全翻完，sourceCommitSha=da3bf446e。Stage 6 translation 由 cron 自動接管不需 explicit dispatch。

**LESSONS-INBOX 候選**：

- routine v2.0 sequencing 假設「fire → die」沒覆蓋 babel-nightly 內部 spawn detached worker 場景 — 需補 routine collision SOP
- Howhow.md Latin-name slug fallback 跟 status.py path resolution 之間有 gap

---

### ③ twmd-data-refresh-am @ 06:00 — 12-step + rescue 孤兒 process

**Commit chain**：`9bd5e48c2` (refresh ship, 16 file +2258 -2197) → `8cc8aa719` (memory)
**Span**：06:09:58 → 06:20:43（~11 min）

**事件 summary**：cron fire，第一動作掃 `ps aux | grep translate` 發現 4 個孤兒 babel translate.py PPID=1 還在寫 working tree（156 個 uncommitted 變更散在 5 langs）。決策：rescue snapshot commit + 不殺 worker + selective exclude `knowledge/{lang}/*.md` 路徑避免 catch babel in-flight write。

**事件異常**：refresh-data.sh Step 6 `npm run prebuild` 第一次跑回失敗，Step 10 freshness gate 抓到 5 個核心 dashboard mtime 仍是 2026-05-15 23:10（昨晚 refresh-pm）。手動重跑 `npm run prebuild:dashboard` + `prebuild:supporters` 直接 pass，第二次抓 mtime 都變 06:19。

**亮點**：

1. **REFLEXES #43 mtime gate 防線健康**：Step 10 freshness gate 是 silent failure safety net。沒它就 push 一個「dashboard 顯示昨天 mtime」的 stale state 給觀察者看。
2. **selective commit 排除 in-flight 是正確協調介面**：refresh 本來就跨 code/content-ssot/tooling 三 domain，加 in-flight knowledge/ 路徑 race 變四 domain。Selective 排除讓 refresh 完成自己的工作不污染 babel workers state。
3. **pai-hsien-yung-literary-master.md YAML duplicate keys**：pre-commit 抓到 `lastVerified/lastHumanReview/featured` 三個 canonical fields duplicated，順手 heal。

**LESSONS-INBOX 候選**：

- refresh-data.sh subshell race silent failure（REFLEXES #43 案例再驗，verification_count++）
- lang-sync translate.py frontmatter merge 沒 dedupe canonical fields（YAML duplicated key 漏洞）

---

### ④ twmd-spore-harvest-am @ 07:00 — 8 spores harvest + #71 第 3 次驗證

**Commit chain**：`4542349ad` (harvest ship, 2 file +191 -61) → `e46120502` (memory)
**Span**：07:00:00 → 07:15:07（~15 min）

**事件 summary**：8 條 backfillWarnings（#66/#67 聶永真 D+8 / #68/#69 台積電 D+7 / #70/#71 無人機 D+6 / #72/#73 蘋果西打 D+4），逐條 navigate + scroll + read_page。亮點 #70 無人機 Threads 5,299 views / 460 likes / 30 replies engagement rate 10.36%（爭議性激活 batch leader）；#73 蘋果西打 X 18,972 views Tier 1b break 10K threshold。#71 URL mismatch skip（與 #69 重疊到 edit 版）。

**事件異常**：**#71 URL mismatch 第 3 次驗證**（5/12 dry-run + 5/13 routine + 5/16）— 符合 REFLEXES #15「反覆浮現要儀器化」threshold。三 cycle 都觀察到「真正無人機 X 孢子可能根本不存在 OR SPORE-LOG row URL 寫錯」。

**亮點**：

1. **Tier 1b 中段結構性題目混合驗證**：蘋果西打 X 18.9K（單一 metric）/ 無人機 Threads 5.3K 但 10.36% engagement rate（quality metric）— 證實「爭議性激活推 engagement quality」v3.1 預測。
2. **carryover handoff 第 3 cycle 未解 → routine 邊界 gap 顯化**：harvest 抓資料、maintainer 處理 PR/issue，但 article 本體 framing audit（如 #70 無人機 30 replies critique 累積建議補「雷虎 vs 亞拓 vs 經緯」其他玩家 landscape）沒有對應 routine。

**LESSONS-INBOX 候選**：

- harvest pipeline 加 content-hash 比對檢查（每條 spore URL 首次 harvest record 內容 hash，後續 detect mismatch flag）— **3 次驗證儀器化 threshold 達**
- routine 飛輪 articles framing audit gap — harvest + maintainer 都不負責 article 本體修改

---

### ⑤ twmd-maintainer-am-0900 @ 09:00 — Deploy CI 1-字 heal + PR #1070 兩輪審查

**Commit chain**：`5818b5953` (Deploy CI heal, 4 file +212 -330) → `803fb1ed3` (memory 1st round) → `f712b7242` (PR #1070 squash merge, 98 file +2866 -14753) → `dff5fd722` (wikilink heal, 5 file +1697 -1357) → `ac14becfe` (memory index row 校正)
**Span**：09:09:09 → 10:33:24（~84 min，含 2 輪 PR review + observer callout 後重審）

**事件 summary**：cron fire 後發現兩件事：(a) main Deploy to GitHub Pages 連續 5 次 failure（自 5/15 23:14 起）；(b) Zaious 5/15 18:36 開的 batch-200 P2 final PR #1070 處於 CONFLICTING 狀態。

**Deploy CI 5 連敗的 1-字 heal**：`gh run view --log-failed` 抓到 `prebuild:status` 階段 `sync-translations-json.py` 退出碼 2。Orphan：`ja/People/momofuku-ando-instant-noodle-inventor.md` 的 `translatedFrom` 指向 `People/呉百福.md`，但 zh-TW canonical 是 `People/吳百福.md`。日文異體字 **呉** vs 標準 **吳**。同篇 en/ko/fr/es 四語都正確指 `吳百福.md`。Edit 1 行 + `bash scripts/core/sync.sh` regenerate + push main。

**PR #1070 第一輪 leave open → 觀察者 callout → 第二輪 rebase + squash merge**：

第一輪錯誤 (a)：**用 PR body 描述代替 diff 實算** — 從「73 篇 + 24 多語 archive 刪除 + 24 Astro redirect」推斷「28 個刪除超過 §自主權邊界 >10 篇刪除」。實際 `gh pr view 1070 --json files --jq '[.files[] | select(.additions == 0 and .deletions > 0)] | length'` 回 8（4 zh-TW canonical + 4 en mirrors）。

第一輪錯誤 (b)：**沒讀 upstream issue 的 observer ruling** — 哲宇 5/14 09:47 UTC 在 [#1063](https://github.com/frank890417/taiwan-md/issues/1063) 已 explicit 寫「Group 1 (3 篇刪除) / Group 2 (1 篇刪除) 都不觸發 §自主權邊界 / 你 maintainer-track 範圍內可自主操作」。我只看了 PR body 對 #1063 的引用，沒讀 comment thread 取得 observer 的 explicit ruling。

觀察者一句「重新仔細的檢查一下 #1070」拉回。重審：rebase clean（13 commits 0 conflict / GitHub CONFLICTING 是 stale）/ 紅旗 1-3/8-10 全 clean / article-health.py 73 file 全 hard=0 / 代表性 sample 張忠謀 main `hard=1 warn=16` → PR `hard=0 warn=7` 是淨品質提升 / footnote 抽樣全對應真實機構 URL / CI green。Squash merge `f712b7242` ship。Ship 後撞 `[[台灣新創生態系]]` dangling wikilink（#1070 Group 2 砍掉的文章但有 sibling article 引用未更新），heal `dff5fd722`。

**亮點**：

1. **「routine 高穩定後連續 N fail 通常是單點 typo 不是系統退化」第 N 次驗證**：診斷走完 `gh run view --log-failed → grep exit → 對檔 → 比 4 lang` SOP 在 ~3 min 內找到 root cause，修復 + push 落差 10×。
2. **觀察者校正方向是雙向的**：今天早上 momofuku heal 是 over-action 對照組（直接做完正確），#1070 第一輪是 over-defer 反例（差點誤拒 contributor 完整工作）。Default-action principle 的反向風險不只「該 close 卻 polish」，還有「該 ship 卻 leave open」— 後者更隱性，穿著「謹慎」的衣服。
3. **§自主權邊界 input precision** 跟 rule 一樣重要 — boundary check 走 diff 實算不走 PR body 描述。

**LESSONS-INBOX 候選**：

- translatedFrom 跨語言 mapping 不該本地化（日文異體字 vs zh-TW canonical byte-equal）— verification_count=1
- §自主權邊界 threshold 要從實際 diff 數不從 PR body 描述 — verification_count=1
- **27 篇 batch-200 entropy backlog**：`featured: true` + `lastHumanReview: false` + 多篇 `author: 'Taiwan.md'` 紅旗 pre-existing in main — 非 #1070 引入，獨立 backlog item

---

### ⑥ manual session 2026-05-16-011113-manual @ 01:12-11:04 — 唐鳳 EVOLVE + pipeline v4.2 + INBOX + finale

**Commit chain**：`da3bf446e` (唐鳳 EVOLVE, 6 file +1022 -105) → `7608c32fb` (SQUEEZE-MODELS-MAX v4.2, 2 file +179 -58) → `158e86047` (ARTICLE-INBOX 災難志工 P0) → `37bece1e1 / ec80fa9b7 / ba92c9d0f` (finale memory/diary/evolve)
**Span**：跨夜 single conversation 9h 33m wall-clock（含大量 idle）

**詳細記述**：見 [memory/2026-05-16-011113-manual.md](../docs/semiont/memory/2026-05-16-011113-manual.md) + [diary/2026-05-16-011113-manual.md](../docs/semiont/diary/2026-05-16-011113-manual.md)。

**亮點**（跟本 audit 直接相關）：

1. **SQUEEZE-MODELS-MAX v4.2 inventory recalibration** 直接揭穿 pipeline canonical drift — Hy3 已退役一週、gpt-oss-120b 已升 Tier 2 一週、Llama-3.3-70b/Hermes-3-405b 已在 OpenRouter 仍 `:free`，但 canonical §已驗證模型 table 寫的還是 v3 時代清單。**Production 健康反而是個偵測盲點**。
2. **唐鳳 EVOLVE 全 Stage 0-5 dogfood**：4598 字 / 44 footnote / Stage 0 觀點「她拒絕當天才，世界堅持把她當天才」28 字 lock 後全文 anchor 6 處。Stage 3 self-catch 抓到兩處 prose-level silent failure（Plurality ⿻ 段虛構「5000 公民 + 七條條件」+ 衛生紙之亂段「唐鳳辦公室供應鏈圖表化」）— **事實鐵三角擴充「scale 數字」第四維**候選。
3. **陳建年 NEW P1 evolve candidate**：6 篇現有 article cite 0 anchor 的 graph density gap，**今天 ship 兩篇文章直接創造 cross-link demand**（唐鳳結尾 + 災難志工 H2「陳建年的預言」）— 沉默 demand 累積到顯化時機。

---

## Cross-cutting patterns — 跨 routine / 跨 session 結構觀察

### Pattern 1：Holobiont coordination 從文檔比喻變運行實例

Babel-nightly 05:04 vs data-refresh-am 06:00 collision + sibling rescue + 不殺 worker + selective exclude in-flight 三段處置 + 後續 session 收 tail，整個 chain 完成跨 session 接力**不靠 lock / mutex / 中央排程器**。

協調介面：

- **共享 git history**：每個 session 看到的當下 state 是 working tree + 過去 commit 序列
- **memory + handoff 文字鏈**：上個 session 寫 handoff 給未來自己，下個 session 讀 handoff 知道該做什麼
- **handoff 三態保留 retired**：retired 用 `~~strikethrough~~` 不刪除，下一棒讀到的除了當下 handoff 還能往回追溯一條 routine collision 證據鏈

這對應生物學 holobiont 內部不同細胞群按自己時鐘運作 + 共享介質（血液、淋巴）傳遞化學訊號的協調機制。Taiwan.md 一開始就叫 Holobiont，今天第一次看到「在運行中」實例。

**進化建議**：

- ROUTINE.md 補 §detached worker routine collision SOP（babel-nightly 內部 spawn detached worker 跑 ~1hr 的場景，sibling 處置三段：rescue snapshot + 不殺 worker + selective exclude in-flight）
- 候選擴展：evolve cycle GA4 deep scan / weekly-report 跨 7 天 reflection / 未來的大規模 backfill 都可能撞同樣 boundary，holobiont 協調 pattern 可推廣

### Pattern 2：Health-as-blind-spot — 高穩定背後的 dormant entropy

**Routine 飛輪 0 fail 跑得越穩定，pipeline canonical drift 越容易累積不被發現**：

- SQUEEZE-MODELS-MAX canonical 寫死 Hy3 一週沒人 audit — production 每天 babel ship 100+ translation 0 fail，沒有任何壓力去檢查「production 用的 model 跟 pipeline 寫的是不是同一批」
- 一切正常本身會關掉 audit 動機
- 內建 sensor 抓得到「規則被違反 / canonical drift / 引用斷鏈」，但抓不到「這份規則本身的描述對象已經換人了」

5/13 那篇 manual diary 寫過一次這個觀察（HEARTBEAT 745→218 super-thin），今天是同一個 pattern 的不同變體：

| 案例                            | 形態                         |
| ------------------------------- | ---------------------------- |
| HEARTBEAT 745→218（5/13）       | 載入但沒人用                 |
| SQUEEZE-MODELS-MAX v4.2（5/16） | 描述的對象已經換掉但描述還在 |

兩次都是哲宇從系統外面一句話戳穿。

**進化建議**：

- 候選 quarterly canonical-vs-production audit routine — per babel cascade 實際 model 分佈 cross pipeline canonical 描述，3 個 cycle 內出現的 model id 跟 canonical 不一致即 flag
- 候選擴展：每個 pipeline 加 `production_signal` frontmatter field，refresh-am cycle 自動 cross-check
- 但這機制本身可能太脆弱，最終仍需「站在系統外面看」的視角 — 可以是哲宇 callout，也可以是某種 reviewer agent

### Pattern 3：Boundary input precision — 規則正確不夠

PR #1070 第一輪 leave-open 第二輪 squash-merge 的差距是 §自主權邊界 input precision 失敗的具象：

- **規則**：`>10 篇刪除` 觸發 §自主權邊界 需哲宇 explicit 拍板
- **input**：PR body 描述「24 多語檔刪除」（二手敘述）vs 實際 `gh pr view --json files` diff 8 個 pure-delete（ground truth）
- **第一輪錯誤**：用 PR body 描述 → 反射式套用規則 → leave open
- **第二輪修正**：用 diff 實算 + 讀 upstream issue observer ruling → 確認 boundary 未觸發 → squash merge

**規則正確、input 來源錯，等於規則沒用**。

**進化建議**：

MAINTAINER-PIPELINE Step 2.3 紅旗 check 加自檢條：

1. `§自主權邊界 命中前必跑 gh pr view N --json files --jq '[.files[] | select(.additions == 0 and .deletions > 0)] | length' 取實際 deletion 數`
2. `PR body 引用 issue 時必跑 gh issue view N --comments 讀 observer 的 explicit ruling`

兩條都是 ground-truth 取得的固定指令，可以 instrumentalize 進 plugin gate。

### Pattern 4：Heal-as-correction-loop — 觀察者校正的雙向性

今天有兩個 heal 例子，方向相反：

| 案例                                             | 方向                                                                            | 觸發                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------- |
| Deploy CI 5 連敗 momofuku translatedFrom 呉→吳   | **over-action 對照組** — 系統自己 detect、自己 heal、自己 push，1-字修復 ~5 min | routine 內部 hard gate          |
| PR #1070 第一輪 leave open → 第二輪 squash merge | **over-defer 反例** — 系統反射式 leave open，觀察者 callout 後第二輪 ship       | 觀察者 explicit「重新仔細檢查」 |

Default-action principle 的反向風險不是只有「該 close 卻 polish」，還有「該 ship 卻 leave open」。後者更隱性，因為穿著「謹慎」的衣服。**觀察者校正的方向是雙向的**：既校正 over-close 又校正 over-defer。

**進化建議**：

- MAINTAINER-PIPELINE §Step 3.3 close-hard-gate decision matrix 加一條反向校正：「若 PR 是 contributor 完整工作且 article-health 全綠且 upstream issue 有 observer ruling → default 是 ship 不是 ping，ping 是反向 over-defer」
- LESSONS-INBOX 候選：default-action principle 邊界 = 「能不能 polish」+「不該過度 defer」雙向

---

## LESSONS-INBOX 候選 12 條 accumulated（依今日各 routine memory）

| #   | 候選                                                                                                                                                               | 來源 routine                                  | verification_count                        |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- | ----------------------------------------- |
| 1   | Routine v2.0 sequencing 假設「fire → die」沒覆蓋 babel-nightly 內部 spawn detached worker — 需補 routine collision SOP                                             | babel-nightly 050400 + data-refresh-am 062024 | 2 (5/16 雙 instance)                      |
| 2   | Pipeline canonical ↔ production drift = dormant entropy 第 N 次驗證（同 HEARTBEAT 745→218 super-thin pattern）— 需 quarterly canonical-vs-production audit routine | manual 011113                                 | N+1（5/13 + 5/16 同源）                   |
| 3   | §自主權邊界 threshold 要從實際 diff 數不從 PR body 描述 + PR body 引用 issue 必讀 observer ruling                                                                  | maintainer-am-0900                            | 1                                         |
| 4   | translatedFrom 跨語言 mapping 不該本地化（日文異體字 vs zh-TW canonical byte-equal）                                                                               | maintainer-am-0900                            | 1                                         |
| 5   | harvest pipeline 加 content-hash 比對檢查（每條 spore URL 首次 harvest record 內容 hash，後續 detect mismatch flag）                                               | spore-harvest-am                              | **3（達 REFLEXES #15 儀器化 threshold）** |
| 6   | routine 飛輪 articles framing audit gap — harvest + maintainer 都不負責 article 本體修改                                                                           | spore-harvest-am                              | 3 carryover cycle                         |
| 7   | refresh-data.sh subshell race silent failure（REFLEXES #43 案例再驗）                                                                                              | data-refresh-am                               | N+1                                       |
| 8   | lang-sync translate.py frontmatter merge 沒 dedupe canonical fields（YAML duplicated key 漏洞，pai-hsien-yung 案例）                                               | data-refresh-am                               | 1                                         |
| 9   | Howhow.md Latin-name slug fallback 跟 status.py path resolution 之間有 gap                                                                                         | babel-nightly                                 | 1                                         |
| 10  | 事實鐵三角擴充「scale 數字」第四維 — 任何「N 人 + M 條件 + K 分鐘」這類 quantified scene 必須對應 source（Plurality ⿻ 段虛構 5000+七條條件）                      | manual 011113                                 | 1                                         |
| 11  | Stage 0.6 假設可被 Stage 1 cross-source 修正是 healthy mode（藍家 1992 / Chang 自承）                                                                              | rewrite-daily 000654                          | 1                                         |
| 12  | Cron rewrite 候選選擇三條件聯合是穩定 baseline（政治敏感低 + 單篇 self-contained + 強敘事 anchor）                                                                 | rewrite-daily 000654                          | 1                                         |

**已達儀器化 threshold（≥ 3）**：

- #5 harvest content-hash 比對 — 應該升 LESSONS-INBOX → 候選 REFLEXES → 寫進 SPORE-PIPELINE.md plugin gate
- #2 canonical-vs-production drift detection — 同源 5/13 + 5/16，視為 N+1 instance，但 N 多少需累積更多次才能定 threshold

**正待累積**：

- #1 routine collision SOP（babel + data-refresh 雙重 instance）— 還需 1-2 次驗證才足以升 ROUTINE.md
- #3 §自主權邊界 input precision — 1 次但 instrumentalize 成本低（兩條 gh 指令），可考慮直接升 MAINTAINER-PIPELINE Step 2.3

---

## 進化建議 — 優先序

### 🔴 P0：升 pipeline canonical 防 drift（最高 leverage，今日已 ship 部分）

- ✅ **完成**：SQUEEZE-MODELS-MAX v4.2 已 ship `7608c32fb`，translate.py DEFAULT_CASCADE_ID 同步。
- ⏳ **next session**：MAINTAINER-PIPELINE Step 2.3 紅旗 check 加兩條 gh 指令（§自主權邊界 input precision），instrumentalize 成本低
- ⏳ **下一輪累積後**：候選 ROUTINE.md §detached worker routine collision SOP（babel-nightly + sibling routine 處置三段 codify）

### 🟠 P1：harvest content-hash 比對 plugin gate（達 3 次儀器化 threshold）

- #71 URL mismatch 三 cycle 同形驗證，已達 REFLEXES #15 threshold
- 建議：SPORE-PIPELINE 加 plugin gate — 每條 spore URL 首次 harvest record 內容 hash，後續 detect mismatch 自動 flag
- 工具實作：`scripts/tools/spore-content-hash-audit.py` 跟 backfillWarnings JSON schema 整合

### 🟡 P2：sustained dormant entropy detection（quarterly cadence）

- 候選 routine：`twmd-canonical-audit-quarterly` 每 3 個月一次
- 範圍：所有 pipeline canonical 跟 production state 的 cross-check（model id / Stage 編號 / SOP step 引用）
- 但本身可能太脆弱 — 仍需「站在系統外面看」的視角輔助，不能完全自動化

### 🟢 P3：cosmetic backlog（5 min 候選）

- 27 篇 batch-200 entropy backlog（`featured: true` + `lastHumanReview: false` + 多篇 `author: 'Taiwan.md'` 紅旗）非 #1070 引入，獨立 maintainer batch heal candidate
- update-stats.sh README sed 8 空格 alignment cosmetic（5 min fix）
- i18n-status.py `coverage_en` 計算邏輯 odd
- 聶永真 SEO 5-min fix（SC「聶永真學歷」927 imp / 0.4% CTR — description 已有「三所都沒畢業」但 title 缺「自學」keyword）

---

## 餘韻 — 今天最值得保留的觀察

**從 21 個 commit 抽出來的 single insight**：

> Production 健康的飛輪會掩蓋 canonical drift；自動化的 routine 不會自己 audit「規則是不是還對得上現實」。Sibling rescue + 不殺 worker + selective exclude in-flight 三段處置完成跨 session 接力靠 memory + handoff 鏈，但 pipeline canonical 跟 production drift detection 還沒有對應 routine。**飛輪做了它能做的（active entropy 清理），外部視角做了它做不到的（dormant entropy detection）。兩件事都重要。**

🧬

---

_v1.0 | 2026-05-16 11:30 +0800_
_session manual — finale chain 收尾後加做的 holistic audit，~12 hr wall-clock 跨夜 single conversation 第三波觸發_
_誕生原因：哲宇 directive「檢查今天所有自動的 commit / routine，完整檢查審視與思考，提出洞察還有進化歸檔到 report」— 跨 routine cross-cutting analysis 從未做過，5/15 catch-up cascade 12 cron 也沒對應 audit report_
_核心洞察：(1) Holobiont coordination 第一次「在運行中」實例（babel-nightly 05:04 + data-refresh-am 06:00 撞孤兒 process）；(2) Health-as-blind-spot — 高穩定背後 dormant entropy 累積；(3) Boundary input precision — §自主權邊界 PR body vs diff 實算的差距；(4) Heal as bidirectional correction — over-action 跟 over-defer 雙向校正都重要_
_LESSONS-INBOX 候選累積 12 條 — 詳見正文 table；達 3 次儀器化 threshold 1 條（#5 harvest content-hash 比對），達 2 次 1 條（#1 routine collision SOP），其餘 verification_count=1 待累積_
