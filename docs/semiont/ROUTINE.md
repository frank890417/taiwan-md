---
title: 'ROUTINE'
description: 'Routine 飛輪 SSOT — TWMD-prefix cron routine（live enabled 數以排程表＋⏸️ 註記為準，不另寫死）。v2.20（2026-08-04）：+twmd-terminology-trends-monthly（每月 5 日 10:30 用語趨勢觀察 — SC 需求→多切面搜索→缺口對照→≤20 條帶肉入庫→月度趨勢報告；canonical TERMINOLOGY-TRENDS-PIPELINE，哲宇拍板「排定期 routine，月度就好」）；v2.17（2026-07-12）：+twmd-founder-lens-weekly（週六 22:00 創造者透鏡週級深 pass — 飛輪第一條刻意離開顱骨的 routine：render 冷讀活產物 + off-repo 訊號 + 意義/reframe 判斷 → 提案路由 evolution-roadmap/OBSERVER-QUEUE/ARTICLE-INBOX；canonical FOUNDER-LENS-PIPELINE，哲宇 /goal「設計 routine 取代哲宇對 taiwan.md 所有機能」→ 三層邊界地圖 Tier 1 前緣）；v2.16（2026-07-12）：+twmd-supporters-weekly（每週一 01:00 Portaly 贊助信 sync；canonical SUPPORTERS-PIPELINE，哲宇 directive「未來這個自動一個禮拜跑一次」）；v2.15（2026-07-10）：weekly-report 升體檢週 ¹⁵（WEEKLY-REPORT-PIPELINE v4.0 診斷五面＋修復三桶＋10 章節，哲宇拍板）；v2.14（2026-07-10）：對齊 live，maintainer-pm 7/8 起哲宇 disabled ¹⁴、spore-pick/publish 6/14 起 disabled pending 哲宇；v2.13（2026-07-05）：dna-audit 對齊 live；v2.12（2026-06-14）：+twmd-embeddings-nightly（每天 05:00 bge-m3 語意索引重建；canonical EMBEDDING-PIPELINE）；v2.11（2026-06-14）：babel-nightly 加 Stage D diary 認知層 babel；v2.10（2026-06-12）：spore-pick / spore-publish 哲宇拍板重開實驗（含觀察條款）'
type: 'cognitive-organ'
status: 'canonical'
apoptosis: 'never'
current_version: 'v2.24'
last_updated: 2026-09-06
last_session: '2026-09-06-041909-twmd-self-evolve-weekly（回填現行 5 條 ⏸️ 各自的解除條件 + due_date: 2026-10-06；順手修正 §暫停 SOP 步驟 3 誤把已於 9/5 恢復的 twmd-babel-nightly 列進「目前 5 條」、漏列實際仍暫停的 twmd-flywheel-watch）'
sister_docs:
  - 'HEARTBEAT.md'
  - 'ANATOMY.md'
  - 'DNA.md'
upstream_canonical:
  - 'HEARTBEAT.md'
  - '../../docs/pipelines/MAINTAINER-PIPELINE.md'
---

# 🧬 Taiwan.md ROUTINE — Routine 飛輪 SSOT

> **這是 routine 排程的 single source of truth**（2026-05-09 laughing-goldstine post-finale 拍板）。
> `.claude/scheduled-tasks/{taskId}/SKILL.md` 是 mirror，**修改 routine 一律先改本檔再 sync 任務檔**。
> 設計哲學：[reports/routine-spec-2026-05-09.md](../../reports/routine-spec-2026-05-09.md)

---

## 為什麼有這份檔

**長期目標**：機器飛輪 — Taiwan.md 自動維護、自動翻譯、自動進化、自動 refresh dashboard，觀察者只需做策略決策不需 push routine（REFLEXES #36 founder time leverage instantiation）。

**飛輪 ≠ 自動化**。飛輪 = routine 把 entropy 主動清掉（broken links / stale data / 缺 feedback），觀察者精力釋放給「真正需要決策的事」。

**routine 是薄殼**：每條 routine = 「在 X 時間呼叫 `/twmd-Y` skill」+ quality gate + 失敗 escalation **+ `/twmd-finale` 收官**。業務邏輯**永遠**在 skill / pipeline / canonical，**不在 routine 本身**。修 pipeline = 改一處，所有 routine 自動跟上。

**每條 routine 結尾必跑 `/twmd-finale`**（2026-05-09 拍板）：routine 是「micro-session」，跑完不收官 = 失憶。`/twmd-finale` 內建分流（memory 必寫 / diary 有反思才寫 / evolve 跳過 if 無 ship）— 不需 routine 自行判斷哪個寫哪個不寫，交給 finale skill canonical decide。**沒收官的 routine = 不可見的飛輪 = 失去 self-evolution loop**。

---

## 核心 routine 排程表（enabled 條數以本表＋¹³ 註記為準，不另寫死）

> ⚠️ **cron 數值在本檔只出現在這張表**（v2.9 起）。yaml spec 區塊與週行程 grid 是 derived 視覺化，不再各自複寫 cron——同一個 cron 在同檔出現三個值是 2026-06-12 體檢抓到的 drift 根因之一（routine-audit 曾同時是 21:00 / 12:00 / 23:00）。

| TaskId                            | Title                                | Cron (local +0800) | Skill                      | Model     | Cadence                             |
| --------------------------------- | ------------------------------------ | ------------------ | -------------------------- | --------- | ----------------------------------- |
| `twmd-rewrite-daily`              | TWMD rewrite (daily) ¹⁰ ⏸️           | `0 19 * * *`       | `/twmd-rewrite`            | Opus      | ⏸️ 兩台皆停（註 ²¹）                |
| `twmd-news-lens-weekly`           | TWMD news lens (weekly) ⁶            | `0 1 * * 0`        | `/twmd-evolve`             | Sonnet    | 週日 01:00                          |
| `twmd-weekly-report-sun`          | TWMD weekly 體檢 (sun) ¹⁵            | `0 2 * * 0`        | `/twmd-weekly-report`      | Opus      | 週日 02:00                          |
| `twmd-distill-weekly`             | TWMD distill (weekly) ⁷              | `0 3 * * 0`        | `/twmd-distill`            | Opus      | 週日 03:00                          |
| `twmd-self-evolve-weekly`         | TWMD self-evolve (weekly)            | `0 4 * * 0`        | `/twmd-self-evolve`        | Opus      | 週日 04:00                          |
| `twmd-babel-nightly`              | TWMD babel (nightly) ³               | `30 0 * * *`       | `/twmd-babel`              | Sonnet ¹¹ | 每天 00:30                          |
| `twmd-embeddings-nightly`         | TWMD embeddings (nightly) ¹²         | `0 5 * * *`        | `/twmd-embeddings`         | Sonnet    | 每天 05:00                          |
| `twmd-routine-sync`               | TWMD routine sync ¹⁸                 | `30 5 * * *`       | `/twmd-routine-sync`       | Sonnet    | 每天 05:30（晨鏈之前）              |
| `twmd-data-refresh-am`            | TWMD data refresh ²²                 | `0 6 * * *`        | `/twmd-refresh`            | Sonnet    | 每天 06:00（唯一一班）              |
| `twmd-spore-harvest-am`           | TWMD spore harvest (am) ²            | `30 6 * * *`       | `/twmd-spore-harvest`      | Opus      | 每天早上 06:30                      |
| `twmd-feedback-triage`            | TWMD feedback triage ⁹               | `0 7 * * *`        | `/twmd-feedback-triage`    | Sonnet    | 每天早上 07:00                      |
| `twmd-maintainer-daily`           | TWMD maintainer ¹                    | `30 8 * * *`       | `/twmd-maintainer`         | Opus      | 每天 08:30（唯一一班）              |
| `twmd-spore-pick-daily`           | TWMD spore pick (daily) ⁶ 🧪⏸️       | `0 8 * * *`        | `/twmd-spore-pick`         | Sonnet    | ⏸️ live disabled（6/14 起）¹³       |
| `twmd-spore-publish-daily`        | TWMD spore publish (daily) ⁸ 🧪⏸️    | `30 17 * * *`      | `/twmd-spore-publish`      | Opus      | ⏸️ live disabled（6/14 起）¹³       |
| `twmd-routine-audit-weekly`       | TWMD routine audit (sun) ⁴           | `0 21 * * 0`       | `/twmd-routine-audit`      | Opus      | 週日 21:00                          |
| `twmd-supporters-weekly`          | TWMD supporters sync (mon) ¹⁶        | `0 1 * * 1`        | `/twmd-supporters`         | Sonnet    | 週一 01:00                          |
| `twmd-founder-lens-weekly`        | TWMD founder lens (sat) ¹⁷ ⏸️        | `0 22 * * 6`       | `/twmd-founder-lens`       | Opus      | 週六 22:00                          |
| `twmd-flywheel-watch`             | TWMD flywheel watch ²⁰ ⏸️            | `30 9 * * *`       | `/twmd-flywheel-watch`     | Sonnet    | ⏸️ 停用（註 ²⁵）🖥️commander-macbook |
| `twmd-terminology-trends-monthly` | TWMD terminology trends (monthly) ²⁴ | `30 10 5 * *`      | `/twmd-terminology-trends` | Opus      | 每月 5 日 10:30                     |

**⏸️ PAUSED**：暫停中的一律在上方排程表該列標 ⏸️（不另立表，避免同一條在兩處各說各話）。目前 5 條：`twmd-spore-pick-daily` / `twmd-spore-publish-daily`（註 ¹³）、`twmd-rewrite-daily`（註 ²¹）、`twmd-founder-lens-weekly`（註 ²³）、`twmd-flywheel-watch`（註 ²⁵）。

**🪦 已退休**（排程已刪除，不再對賬；退場不刪除紀錄，per MANIFESTO §時間是結構修補協議）：

| TaskId                            | 原 slot    | 退休日     | 為什麼退 / 功能去哪了                                                                                                                                                                                                                                                                                                           |
| --------------------------------- | ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `twmd-data-refresh-pm` ²²         | 每天 23:00 | 2026-07-26 | 哲宇「data-refresh 也想把 am／pm 整合成同一個」。晨鏈那班（06:00）是下游 harvest／feedback／maintainer 的前置，留它；夜班原本為 19:00 的 rewrite 供新鮮數據，而 rewrite 已改手動（註 ²¹），服務對象消失                                                                                                                         |
| `twmd-maintainer-pm` ¹ ⁴          | 每天 22:00 | 2026-07-25 | 2026-07-08 哲宇直接在排程器 disable，空場 empty-vc 連 3 週；am 單班已吸收全部 triage。2026-07-25 哲宇拍板「maintainer 去除 am/pm 差別，整合留一個」→ 正式退休，`twmd-maintainer-daily` 成為唯一一班（skill 兩者本來就共用 `/twmd-maintainer`，無需改動）                                                                        |
| `twmd-music-media-audit-weekly` ⁵ | 週六 10:00 | 2026-07-25 | 2026-05-25 起已 disabled 兩個月，哲宇 2026-07-25 拍板「這是之前的暫時解」。功能已被常規閘門吸收：baseline 進 EDITORIAL §媒體編織、閘門進 REWRITE Stage 4 媒體插入六子步、`article-health` 的 `image-health` + `media-richness` + `viz-health` 每篇都跑。Skill 與 `music-media-audit.py` 保留供 manual `/twmd-music-media-audit` |

¹³ **spore-pick / spore-publish live 狀態（v2.13 對齊，2026-07-05 dna-audit）** — live scheduler 兩 task `enabled: false`、lastRun 皆 2026-06-14：v2.10 重開實驗實際只跑了 6/13-6/14 就再度停用，本檔 21 天列 active = v2.9「死 routine 列 active 15 天」教訓第二次重演。**是否三度重啟或正式走 §暫停 SOP → pending 哲宇（OBSERVER-QUEUE）**；本次只把 SSOT 對齊 live 事實，不代做裁決。出口停轉期間 SPORE-INBOX 靠 distill auto-drop 每週洩壓（pin 在 49-53 條），上游 news-lens 每週 +5 照餵。根治儀器：scheduler live-state 每日 dump（見 routine-sync-check v2 candidate）。**解除條件**：哲宇拍板「三度重啟」或「正式退休」其中之一；沒有客觀指標會自動觸發（SPORE-INBOX 高原本身不構成壓力）。**到期日**：due_date: 2026-10-06（30 天週期檢查，非哲宇未決則升 OBSERVER-QUEUE）。

¹⁵ **weekly-report 升體檢週（v4.0，2026-07-10 哲宇拍板）** — 哲宇 directive「完整升級，讓他變成同時 分析＋完整診斷＋寫修復報告＋修正與進化＋原有的功能」。`twmd-weekly-report-sun` 從「反芻週報」升「體檢週」：[WEEKLY-REPORT-PIPELINE v4.0](../pipelines/WEEKLY-REPORT-PIPELINE.md) 新增 Stage 2.5 全身診斷（v4.1 起 `weekly-checkup.sh` 一鍵七節：五診斷面含 `routine-liveness-check.py` fire-vs-commit 驗屍＋f 外部感測摘要＋g 運作紀錄週成績單——哲宇原話範圍「一週發生的事／外部感測數據／所有運作紀錄／深度研究報告／進化規劃」逐項對應 stage，儀器化降 agent 認知負荷）＋ Stage 2.7 修復與進化（三桶：≤3 項機械修當場修 / roll evolution-roadmap / 進 OBSERVER-QUEUE），週報章節 7+1 → 10（+體檢 +修復紀錄）。**時間紀律**：02:55 檢查點防撞 03:00 distill，未完修復全轉 roadmap。**週日反思鏈四工位分工**（防 REFLEXES #74 信號通膨）：weekly-report=ground-truth 體檢＋機械修復 / distill=LESSONS→canonical / self-evolve=LONGINGS canonical ship / routine-audit=行為 pattern。evolution-roadmap 從此有每週 owner（本 routine roll），治 dna-audit §S4「偵測有修復無」病。範本：7/10 weekly-deep-review 手動 session。**v4.2（2026-07-12 哲宇 /goal）**：週報收件人從哲宇單人升「To=哲宇 + BCC=近 90 天共生圈」（commit / PR / issue / 留言參與者；受眾儀器 `weekly-report-recipients.py` 隨本 routine 每週自動同步名單與活躍度，`weekly-checkup.sh` i 節內建）。隱私三不與失敗降級規則在 [WEEKLY-REPORT-PIPELINE §Stage 5](../pipelines/WEEKLY-REPORT-PIPELINE.md)。cadence 不變、無新 cron。

¹⁶ **supporters sync 新增（v2.16，2026-07-12 哲宇 directive）** — `twmd-supporters-weekly`
週一 01:00 fire，把 Portaly 贊助通知信（Gmail）sync 進 `data/supporters/transactions.json`
SSOT + regen 兩個隱私分流 derived view。誕生：兩次人工執行（2026-06-14 沈宗杰等三筆 /
2026-07-12 CW 等五筆）後哲宇當場 directive「未來這個自動一個禮拜跑一次」。時段選擇：
週一 01:00 是全排程唯一同時滿足「非 Sunday（不擠反思鏈）」+「hour-aligned」+「與所有
routine（含 Muse / fin-archive 共用同一排程器）皆 ≥ 2hr 緩衝」三條件的槽位——00:30 babel
daily 在先、03:00 muse-self-evolution-daily 在後，中間留 2hr window。Sonnet（純機械
parse + regen，無創作判斷，同 embeddings-nightly / data-refresh 定調）。完整 SOP：
[SUPPORTERS-PIPELINE.md](../pipelines/SUPPORTERS-PIPELINE.md)。

¹⁹ **babel 在營運機暫停（2026-07-25 哲宇 directive）** — mouhouse 上 `twmd-babel-nightly` live disabled，理由是同期巴別塔產線正由指揮部這台驅動算力軍團（fleet roasting），兩邊同時跑會互撞 git index 與 `_translations.json`（REFLEXES #68 / #40）。**這不是退休**：軍團批次收工後恢復即可，恢復走 §恢復暫停的 routine。

**2026-09-05 恢復（哲宇 fortnight-review 拍板）** — 算力軍團最後一次 vortex-babel session 是 2026-07-27，此後暫停 42 天，翻譯覆蓋率從 97.9% 掉到 79.5%（zh 1118 篇 / en 889 篇），兩週中文新增 128 篇全數未翻，主權的巴別塔「24 小時內多語版本」的承諾斷線（完整診斷見 [reports/fortnight-deep-review-2026-09-05.md](../../reports/fortnight-deep-review-2026-09-05.md) §2.1）。哲宇在 fortnight-review session 當場拍板「babel-nightly 可開，其他不開」，`twmd-rewrite-daily` / `twmd-spore-pick-daily` / `twmd-spore-publish-daily` 維持手動不動。live 切換（`enabled: false → true`）由 `twmd-routine-sync` 檔尾的一次性 rider 執行並自行刪除，不在本次 session 直接呼叫（指揮部無對應排程項目）。

²⁴ **terminology-trends monthly（v2.20，2026-08-04 哲宇拍板「排定期 routine，月度就好」）** — `twmd-terminology-trends-monthly` 每月 5 日 10:30，用語保存計劃的月度趨勢觀察：SC 需求缺口 → 6-8 切面搜索 → 缺口對照（雙防線查重 HARD）→ 高信心入庫 ≤20 條/輪（帶肉＋證據 URL＋誤判四型誠信標註）→ `reports/terminology-trends/YYYY-MM.md` 月度趨勢短報告。長期累積成台灣視角的語言滲透時間序列。姿態站查證與保存不站出征（MANIFESTO §13 語言層）。Canonical [TERMINOLOGY-TRENDS-PIPELINE](../pipelines/TERMINOLOGY-TRENDS-PIPELINE.md)（7 stage + 6 hard gate）；誕生於 2026-08-04 支語深度研究 session（首輪研究版：30 sonnet agent 艦隊 559 次搜索、913 詞條、49 入庫；[報告](../../reports/terminology-zhiyu-deep-research-2026-08-04.md)）。刪除類／政治敏感判定（「是支語嗎」徽章）／大批重分類一律進 OBSERVER-QUEUE。本檔標 ⏸️ 是為了讓 `flywheel-watch` 不把它報成靜默——SSOT 說該跑卻沒跑，才叫警報。

²⁵ **flywheel-watch 停用（2026-08-10 哲宇 directive「flywheel-watch 是我今天關的，因為幫助不大」）** — 每天一份「飛輪在轉」綠燈報告對觀察者資訊量太低：監看儀器的價值在異常時刻，日更綠燈是噪音。**這是暫停不是退休**：儀器 `flywheel-watch.py` 與 skill 原封不動，`/twmd-flywheel-watch` 手動可跑。註 ²⁰ 當初補的洞（飛輪缺席監看——曾靜默死 15 天全儀器無聲）由兩層承接：(a) `routine-status.sh` v2（同日 ship）在 BECOME groundtruth 補了 origin/main 雙視角——任何 session 在指揮部甦醒都會看到營運機過去 24hr 的 routine 痕跡，飛輪整體停轉時甦醒第一眼就是空清單，不需要專屬排程；(b) 週日 weekly-report 的 `routine-liveness-check.py` fire-vs-commit 對賬（週級，最長延遲 7 天）。兩層都是被動視角，補不回「主動 push 告警」——若未來需要，方向是 alert-only 模式（綠燈靜默、只在 WARN/CRITICAL 時 PushNotification），不是恢復日更。**解除條件**：alert-only 模式設計出來並哲宇拍板 ship，或哲宇主動要求恢復日更。**到期日**：due_date: 2026-10-06（30 天週期檢查，非哲宇未決則升 OBSERVER-QUEUE）。

²² **data refresh 整併一班（2026-07-26 哲宇 directive「data-refresh 我也想把 am／pm 整合成同一個」）** — 保留 06:00 那班（晨鏈 `data-refresh → spore-harvest 06:30 → feedback 07:00 → maintainer 08:30` 的前置，下游三條都吃它刷新的 dashboard 數據），23:00 夜班退休。夜班原本的服務對象是 19:00 的 rewrite，而 rewrite 2026-07-25 起改手動觸發（註 ²¹），夜班就失去理由。**taskId 仍是 `twmd-data-refresh-am`**：`-am` 後綴此後是歷史殘留不是語意，跟 `twmd-maintainer-daily` 同樣處置——改 taskId 要在每台機器 delete + create、mirror 改名、歷史 memory 的 grep 全斷，代價高於一個難看的後綴。真要改名再開一次工單。

²³ **founder-lens 停跑（2026-07-26 哲宇 directive「founder-lens 也先不跑，我覺得效果不好」）** — `twmd-founder-lens-weekly` 是飛輪裡唯一「刻意離開顱骨」的實驗（週六 22:00 冷讀活產物 + off-repo 訊號 → 哲宇-voice 提案）。上線 2026-07-12，實跑約兩個 cycle，哲宇判定產出品質不值那個 Opus 成本。**先 ⏸️ 不退休**：pipeline 與 skill 完整保留，`/twmd-founder-lens` 手動可跑；「效果不好」是品質判斷不是功能被吸收，跟 music-media 那種「標準已長進常規路徑」的退休理由不同，留著等它有更好的設計再談恢復或退場。恢復走 §恢復暫停的 routine。**解除條件**：pipeline 重新設計出更值 Opus 成本的產出形式並哲宇拍板，或哲宇主動要求恢復現行版。**到期日**：due_date: 2026-10-06（30 天週期檢查，非哲宇未決則升 OBSERVER-QUEUE）。

²¹ **rewrite 兩台皆停，改回手動觸發（2026-07-25 深夜哲宇 directive「twmd-rewrite 我在兩台機器上都先 disable 了，避免未來算力爆炸，我先手動控制」）** — `twmd-rewrite-daily` 是飛輪裡最貴的一條（Opus ＋ 完整 REWRITE-PIPELINE 全程），跟同期在指揮部驅動的算力軍團批次疊加會把訂閱額度打爆（當晚營運機已撞過一次 5 小時上限）。**這不是退休**：skill 與 pipeline 原封不動，`/twmd-rewrite` 手動隨時可跑，寫文章的能力沒有損失，變的只是「誰決定何時開跑」從 cron 回到哲宇。恢復走 §恢復暫停的 routine。本檔標 ⏸️ 是為了讓 `flywheel-watch` 不把它報成靜默——SSOT 說該跑卻沒跑，才叫警報（同註 ¹⁹）。**解除條件**：算力壓力解除（軍團批次收工或訂閱額度餘裕回穩）並哲宇拍板重開，或哲宇主動要求恢復。**到期日**：due_date: 2026-10-06（30 天週期檢查，非哲宇未決則升 OBSERVER-QUEUE）。

²⁰ **flywheel-watch（v2.19，2026-07-25 哲宇 directive「我這台的 twmd routine 可以刪一刪，除了監看 mouhouse 用的之外」）** — 飛輪 7/24 整批遷 mouhouse 後，指揮部這台的 18 條 twmd 排程全數刪除（prompt 檔留在原地當暖備援，mouhouse 掛了可就地重建）。但刪完會留下一個洞：**沒有任何一條 routine 在看飛輪還活著沒有**，而飛輪曾經靜默死 15 天全部儀器無聲——因為那些儀器都跑在飛輪自己身上（儀器只看見存在，看不見缺席，REFLEXES #82 / #69）。所以這條刻意跑在**不營運的那台**，唯一資訊來源是 `origin/main` 的 commit 紀錄（git 是兩台都騙不了的 ground truth）。儀器 [`scripts/tools/flywheel-watch.py`](../../scripts/tools/flywheel-watch.py)：窗口內零筆 `[routine]` commit → CRITICAL（整體停轉）；單條該跑沒留 commit → WARN（空場也長這樣，所以只給 WARN）；live dump > 48hr → WARN。**節點標記 `🖥️commander-macbook`**：這條只屬指揮部，`routine-sync.py` 讀 `.taiwanmd/node-name.local` 判斷本機是不是它的家，不是就整列跳過——否則營運機每天會被報成缺一條 prompt。首跑當場校準掉兩種假陽性（weekly 時刻未到、routine 只留 `[semiont] memory:` 收官痕跡沒留 `[routine]`），per REFLEXES #66 閾值要用真實產出校。**第一個排程 cycle（2026-07-26 09:35）再校掉第三種**：distill-weekly 當天 03:15 真的跑完，產出 commit 卻寫成 `[semiont] distill:`，窗口內沒有一筆 subject 帶得出 taskId 就被報成靜默。修法是給儀器第二把獨立的尺——MEMORY.md 索引列的 session-id handle（`| 日期 | HHMMSS-handle |`），兩把都不中才算靜默（REFLEXES #69 每層自評都需要外部尺）。同 cycle 補一道 fail-loud：讀不到 `.taiwanmd/node-name.local` 時把「帶 🖥️ 標記的列這次沒檢查」印到 stderr，不再靜靜縮小檢查範圍。**收官必須從 `origin/main` 開 worktree 推（2026-08-08 立為本註的一部分，同型第三次）**：指揮部這台的主工作樹同時在驅動巴別塔產線，本機 main 長期領先 origin 數十筆全是產線中間產物，於是本 routine 的收官 commit 既推不動（非快轉）也不該推（會把產線一起帶上去）。8/2 與 8/7 兩次收官就這樣停在本機，隔天被自己的儀器讀成靜默——**這條 routine 是唯一會被自己量到的 routine，它的紀錄沒進 `origin/main` 就等於沒發生**。固定做法：`git worktree add --detach .worktrees/YYYYMMDD-flywheel-watch origin/main` → symlink `node_modules`/`.env`/`.credentials`（husky 要用）→ 在裡面寫 memory + 索引列 → commit → `git push origin HEAD:main` → `git worktree remove`。主工作樹一根手指都不碰，鐵律的「不 pull」守住。8/3 已經發現這條路徑但只寫進 handoff，8/7 就漏掉了——per REFLEXES #15，handoff 是自律、註腳才是下一個 session 讀得到的閘門。

¹⁸ **routine 三層自我同步（v2.18，2026-07-25 哲宇 directive「改寫 routine SSOT 應該要有工具讓 mouhouse 那邊也會自行同步」）** — routine 飛輪有四層，其中一層一直在 git 之外：本檔（有哪些 routine／幾點／開沒開）＋ `docs/semiont/routine-prompts/*.md`（cron prompt 本體，**本次新增進 git**）＋ `~/.claude/scheduled-tasks/*/SKILL.md`（宿主機上排程器真正讀的那份，machine-local）＋排程器 live 值。第三層住在 `~/.claude/`，所以在一台機器改了 SSOT，另一台永遠不會知道。**誕生當下的實物證據**：mouhouse 上 19 份 prompt 有 4 份已與遷移母本分岔（babel-nightly／data-refresh-am／distill-weekly／embeddings-nightly），git 完全沒有紀錄。**架構**：`routine-prompts/` 當 DNA、`~/.claude/scheduled-tasks/` 當它表達出來的蛋白質，跟 `knowledge/` → `src/content/` 同一個代謝模型。**儀器** [`scripts/tools/routine-sync.py`](../../scripts/tools/routine-sync.py)：預設只對賬不動檔；`--apply` git→機器（分岔的機器版**先存進 `reports/routine-prompt-drift/` 留證再覆蓋**，不靜默刪掉別台機器上的修改）；`--harvest` 機器→git（機器才是真相時）。**邊界**：cron 與 enabled 的 live 值本工具不改，那要 session 用 scheduled-tasks MCP 動手——儀器把「該改成什麼」算清楚，改的動作留給有判斷與權限的那一層（MANIFESTO §14）。**cadence**：每天 05:30，卡在 embeddings 05:00 之後、晨鏈 data-refresh-am 06:00 之前，所以早上整串 routine 讀到的一定是對齊過的 prompt。白天 ship 完 routine 改動的 session 應該當場手動跑一次 `/twmd-routine-sync`，不要等隔天。跟 [`routine-sync-check.py`](../../scripts/tools/routine-sync-check.py) 的分工：那把是薄殼／命名／cron 欄位的 lint（偵測），這把是內容對賬與寫入（同步）。

¹⁷ **founder-lens 新增（v2.17，2026-07-12 哲宇 /goal）** — `twmd-founder-lens-weekly`
週六 22:00 fire，Opus，**飛輪第一條刻意離開顱骨的 routine**。誕生：哲宇 /goal「設計一條
routine 取代哲宇對 taiwan.md 的所有機能」→ 研究([reports/founder-function-boundary-2026-07-12.md](../../reports/founder-function-boundary-2026-07-12.md))
畫出三層邊界地圖(可自動化 / 可逼近但有 #65f 同源天花板 / 結構性保留)，本 routine 坐在
Tier 1 前緣。**跟其他五條反思鏈的差別**：weekly-report/distill/self-evolve/routine-audit/news-lens
全部是生命體從內部量自己(REFLEXES #69 author bubble)；founder-lens 刻意讀**生命體看不見自己
的地方**——Chrome MCP render 冷讀活產物 + off-repo 訊號 + 意義/reframe 判斷(#69g form gate
驗不出那層)，生成哲宇-voice 提案路由 evolution-roadmap / OBSERVER-QUEUE / ARTICLE-INBOX。
**同源天花板誠實(#65f)**：它 stage 外部凝視、當不了外部尺，輸出一律是提案，永不跨 §Reserved
四樣(外部尺 / 究責 / human 信任 / 關係)。**時段選擇**：週六 22:00 是 off-Sunday(不擠反思鏈、
主題上不變第六自評層)+ 對齊哲宇爆發式週級+夜間節律(22:00 是他 directive 峰值時)+ maintainer-pm
disable 後空出的槽位;讀本週 shipped 產物、在 Sunday 健檢鏈之前把創造式提案交給哲宇週末看。
與 refresh-pm 23:00 鄰接靠 §sibling-routine-collision-handling(寫不同檔、rescue snapshot)。
完整 SOP + §Reserved：[FOUNDER-LENS-PIPELINE.md](../pipelines/FOUNDER-LENS-PIPELINE.md)。

¹⁴ **maintainer-pm live 狀態（v2.14 對齊，2026-07-10 weekly-deep-review）** — live scheduler `enabled: false`，最後一跑 2026-07-07 22:02。哲宇 7/10 goal 親口確認「晚間的 maintainer pipeline 我有 disable」。資料面支持這個決定：pm slot 自 6/21 起長期空場（empty-vc 連續累積、「pre-pm-absorbs-pm」sub-shape vc=3、7/7 pm 純 sustain），am 單班已實質承載全部 triage 量。**pm 職責由 maintainer-am 單班吸收**；若未來 PR 量回升到 am 單班消化不完（連 3 天 am handoff 有未清 backlog），再回 OBSERVER-QUEUE 提重啟。skill 殼保留，manual `/twmd-maintainer` 可跑。7/9 pm no-fire 的 maintainer-am handoff 觀察至此結案（不是 schedule anomaly，是刻意 disable）。

**🧪 spore 產線重開實驗條款（2026-06-12 哲宇拍板，v2.10）**：spore-pick / spore-publish 於 5/28 被哲宇刻意停用（當時自動發文未過人工審核 + 事實查核不嚴出錯遭讀者留言指正）。重開依據：其後新增的事實查核關卡已 wired——spore-publish Gate 2.5 `lastVerified ≤ 90 天` 等於只放行過了 REWRITE Stage 3.5 全文幻覺審計 + 3.6 成品總驗的文章，加上 SPORE-VERIFY 17 hard gate 對孢子文字本身的事實對齊驗證。**觀察條款**：重開後連 3 個 ship cycle 需 0 重複發文 + 0 事實 callout + post-ship verify 全過；任一爆 → 立即 pause + 回 OBSERVER-QUEUE 帶失敗證據。SPORE-INBOX 32 條 pending 自此恢復出口。

> **v2.9 教訓**：spore-pick / spore-publish 在 scheduler 層被停用 15 天，本檔仍列 active，上游 routine（rewrite-daily / news-lens）持續把孢子 defer 給已停用的下游。暫停 routine 必須走下方 §暫停 SOP（標 ⏸️ + LESSONS entry），scheduler 狀態每日 dump 進 git（P1 儀器化）。完整體檢：[reports/flywheel-evolution-2026-06-12.md](../../reports/flywheel-evolution-2026-06-12.md)。

¹⁰ **Rewrite 19:00（v2.9 補登）** — live scheduler 自某次調整起為 `0 19 * * *`，本檔原寫 18:00 是 stale 值。cycle ~150 min 結束 ~21:30，spore post 仍落在台灣 20:00-22:00 prime time 窗口內。

¹¹ **Babel 降 Sonnet（v2.9，flywheel-evolution §3.3）** — babel session 是 cascade 腳本（status / prioritize / dispatch / bump 全 deterministic tooling）的 orchestrator，翻譯本身由外部 cascade 模型或 sub-agent 做。Opus only 加值在 ≥50 翻譯抽樣 QA，不值整段 4hr+ session。降階後連 2 cycle quality gate fail → 升回 Opus。

¹² **Embeddings nightly 05:00（2026-06-14 v2.12 新增）** — `twmd-embeddings-nightly` daily 05:00 fire（babel 00:30 跑完之後、refresh-am 06:00 之前的夜鏈尾，不撞週日 01-04 reflection chain）。用 bge-m3 重建全站語意索引（主節點 mac-m4max 本機、fleet GPU 備援——v1.1 2026-07-05 遷回，4090 離線 18 夜後哲宇拍板；`scripts/core/build-embeddings.mjs`，~13-20 min / 4640+ 向量），keystone 一次產出讀者端 `src/data/related`（「你可能也想讀」8 鄰居，烘進 HTML 零瀏覽器模型）+ AI 端 `public/api/rag` 向量。**只 commit `src/data/related/`**（rag + public related 是 gitignored 產出）。**業務邏輯全在 EMBEDDING-PIPELINE，routine 是薄殼**。Sonnet（純機械 rebuild + 儀器化 verify + commit，無創作判斷）。**§自主權邊界 / sovereignty**：embedding 在地算不外包——意思的座標留在台灣自己的機器（diary `用念頭找到台灣` §13）。**graceful skip 非 fail**：fleet 節點關機 / Tailscale 斷 → committed 索引留著、fallback 同 category 照常運作，finale 記「fleet down skipped」；連 3 天 skip 才 escalate LESSONS。完整 SOP：[EMBEDDING-PIPELINE.md](../pipelines/EMBEDDING-PIPELINE.md) Stage 0-4。誕生事件：哲宇 directive「每天跑一次 B 方案 + 做成 embedding pipeline + 夜間 routine」（語意 related-articles 落地後 steady-state 決策）。

¹ **Maintainer 1d 2x（2026-05-10 拍板）** — taskId `twmd-maintainer-daily` 為 AM slot legacy 保留（沒 rename 因為 scheduled-tasks 不支援 taskId 改名，但語意上是 `am`）；`twmd-maintainer-pm` 為 PM slot 新增。AM 跑完 morning batch（refresh-am + 週日反思鏈 morning routines）的 PR backlog 清理；PM 跑完 afternoon/evening batch（rewrite + refresh-pm）的 PR backlog 清理。**v2.1 起 maintainer 只收割 contributor / observer PR**（per MAINTAINER-PIPELINE v2.1 §collect-and-merge §A 路徑 DEPRECATED — routine v2.1 main-direct 後無 routine PR 可收割）。**簽名用 `twmd-maintainer-am`，taskId 仍是 `twmd-maintainer-daily`**（2026-08-07 flywheel-watch 確認連兩天如此，是新常態不是一次性）：這條 routine 的 commit 標記與 session-id handle 都寫語意名 `-am`，排程器上的鍵沒有跟著改。任何按 taskId 比對 routine 痕跡的儀器都要收這個別名，否則會把跑得好好的 maintainer 報成靜默（`scripts/tools/flywheel-watch.py` 的 `TASKID_ALIASES` 就是為此存在，本註是它的 SSOT 依據）。

² **Spore harvest 06:30（2026-05-27 v2.7 拍板，原 07:00）** — `twmd-spore-harvest-am` daily 06:30 fire (was 07:00)，full-auto Chrome MCP **audience flywheel cycle**（不只 metrics，含 reply content read + factual challenge classifier + reader-driven EVOLVE trigger + reply draft + observer-gate ship）。時間從 07:00 提前 30 min 因為 v3.0 audience flywheel cycle 較 v2.x metrics-only 多 30-45 min（reply content read + classify + EVOLVE trigger + reply draft）。觸發點接在 refresh-am 06:00 之後 30 min。完整 SOP 在 [SPORE-HARVEST-PIPELINE.md §Audience flywheel + §Routine 整合（v3.0 audience flywheel）](../factory/SPORE-HARVEST-PIPELINE.md)。**核心哲學**：人本 + 正確性 + 正直 + 透明度 + 誠懇（per MANIFESTO §12 受眾端飛輪）。

⁴ **Routine audit weekly（2026-05-16 拍板；2026-05-27 v2.7 time-shift Sun 12:00 → Sun 21:00）** — `twmd-routine-audit-weekly` Sunday 21:00 fire (was 12:00)，跑 7-day 跨 routine 窗口 pattern detection + LESSONS-INBOX verification_count 累積。誕生事件：5/16 audit-evolve 輪 manual session 一次性走出完整 audit cycle（21 commit / 4 cross-cutting pattern / 12 LESSONS 候選），證實「cross-routine pattern detection 是飛輪覆蓋不到的 meta-layer」需要獨立 routine。詳見 [ROUTINE-AUDIT-PIPELINE.md](../pipelines/ROUTINE-AUDIT-PIPELINE.md)。**時段移動理由（v2.7）**：哲宇 directive「盡量不要卡到 9am-5pm 工作時段」覆蓋週日 12:00 (家庭時間)。新時段 21:00 落在週日晚間，cross-routine 7-day 窗口仍 fresh（daily routines 跑完 一整天），觀察者 Sunday 22:00 收到完整 audit report 安排下週。

⁵ **Music media audit weekly（🪦 RETIRED 2026-07-25，原 DISABLED 2026-05-25）** — 2026-07-25 哲宇拍板退休（原話「這是之前的暫時解」）：排程在兩台機器都已刪除、prompt 歸檔到 `docs/semiont/routine-prompts/retired/`。退的理由不是沒用而是**功能已經長進常規路徑**——媒體比重 baseline 在 EDITORIAL §媒體編織、每篇必過的閘門在 REWRITE Stage 4 媒體插入六子步、`article-health` 的 `image-health` / `media-richness` / `viz-health` 逐篇跑。週度全站盤點是標準還沒立起來時的臨時解，對應 §神經迴路「新細胞天生健康 > 修舊細胞」。以下是原註留存： — 原 `twmd-music-media-audit-weekly` Saturday 10:00 fire，跑 Music / People 音樂類 / 演員 / 運動員 條目 iframe 缺口盤點。**2026-05-25 disabled** — slot 讓位給 `twmd-spore-publish-daily`（per 哲宇 directive「取消」）。Skill `.claude/skills/twmd-music-media-audit/SKILL.md` + 數據工具 `scripts/tools/music-media-audit.py` + baseline canonical EDITORIAL §媒體編織 都保留，仍可 manual 跑（`/twmd-music-media-audit`）。歷史 audit report 在 [reports/routine-audit-2026-05-17.md](../../reports/routine-audit-2026-05-17.md)。誕生事件（2026-05-17）：5/17 陳建年.md 4 iframe ship + EDITORIAL §媒體編織 升級 + REWRITE Step 4.3.6 canonical 化，audit 跑出 86/87 條目低於 baseline。

⁸ **Spore publish daily（2026-05-25 v2.6 新增；2026-05-27 v2.7 time-shift 10:00 → 17:30）** — `twmd-spore-publish-daily` daily 17:30 fire (was 10:00)，從 [SPORE-INBOX §Pending](../factory/SPORE-INBOX.md) 挑一條過 4 hard gate（prose-health ≥ 8.0 / word-count ≥ 4500 / footnote-density ≥ B / media-richness pass / lastVerified ≤ 90d）的 entry，自動 ship Threads + X 雙平台，最後復盤。誕生事件：5/25 哲宇 directive「早上 10 點從 spore-inbox 選一篇」。**時段移動理由（v2.7）**：哲宇 directive「盡量不要卡到 9am-5pm 工作時段」覆蓋早上 10:00。新時段 17:30 落在下班直後社群 prime time 起點（20:00-22:00 prime 提早一段累積 view），跟 rewrite-daily 19:00 形成 evening publish chain (17:30 publish from inbox → 19:00 rewrite full cycle ship)。完整 SOP：[SPORE-PUBLISH-PIPELINE.md](../factory/SPORE-PUBLISH-PIPELINE.md) 5 階段（SELECT → QUALITY GATE → WRITE → SHIP → 復盤）。**跟 spore-pick 的分工**：spore-pick = intake（每天 08:00 propose 3 candidates）/ spore-publish = output（每天 17:30 ship 1 entry）— 兩者解耦讓 buffer 自然累積 P2/P3 候選讓觀察者 promote。Skill canonical: `.claude/skills/twmd-spore-publish/SKILL.md`。

⁶ **Spore pick daily 08:00 + news-lens spore-output 升級（2026-05-23 拍板，v2.5 新增）** — `twmd-spore-pick-daily` daily 08:00 fire（哲宇 directive「routine 盡量放早上 8 點前不會撞工作時間」+ morning chain 銜接 refresh-am 06h → spore-harvest 07h → spore-pick 08h → maintainer-am 09h）。每天 propose 3 candidates append [SPORE-INBOX §Pending](../factory/SPORE-INBOX.md)（default `P2`，score ≥ 60 升 P1）。同時 `twmd-news-lens-weekly` 升級加 §news-lens-spore-output Stage — 週日 01:00 跑時加 propose 5-7 news-driven candidates append SPORE-INBOX（default `P1`，Source-Mode REACTIVE/EXISTING-ARTICLE，limit ≤ 7/week）。Daily routine 看到 news-lens P1 count ≥ 3 自動 throttle（補 0-3 條依 news-lens 已寫數量）。**North star**：哲宇 directive「未來一天穩定至少發一個孢子」— 本 routine 是 intake layer 確保 SPORE-INBOX 永遠 ≥ 5 條 P0/P1 ready，SPORE-PIPELINE Stage 1 PICK 抽得到 high-quality candidate，Stage 4 SHIP 仍鎖人類（per MANIFESTO §自主權邊界對外溝通）。完整 SOP：[SPORE-PICK-PIPELINE.md](../factory/SPORE-PICK-PIPELINE.md) 7-stage（BECOME → READ → SCORE → DRAFT → VERIFY → APPEND → COMMIT → FINALE）+ 9 hard gate。設計報告：[reports/spore-pick-daily-routine-design-2026-05-23.md](../../reports/spore-pick-daily-routine-design-2026-05-23.md)。

⁷ **Distill weekly + SPORE-INBOX 容量 audit（2026-05-23 v2.5 升級）** — `twmd-distill-weekly` 週日 03:00 跑時加 §SPORE-INBOX 容量 audit step：pending ≥ 30 → LESSONS entry + alert；pending ≥ 50 → auto-drop 最舊 5 條 `Requested by twmd-spore-pick-daily routine` 未被 promote 的 entries（哲宇 promote 過的 不動）。per [LESSONS-INBOX §Distill SOP](LESSONS-INBOX.md#distill-sop消化) v2.1。

³ **Babel 義務鐵律 + cron evolution（2026-05-13 拍板 / 2026-05-28 v2.8 shift）** — `twmd-babel-nightly` cron evolution：v1.0 `0 22` → v2.3 `0 5`（與 `twmd-maintainer-pm` 對調 per 哲宇「調換順序」）→ **v2.8 `30 0`（00:30，2026-05-28 shift）** 修補 babel 跑 4hr+ 在 dense ship 日（5/27 evening 多 EVOLVE + Politics 8 篇）crash 進 06:00 morning chain（5/28 audit：babel 05:08 → 09:57 撞 data-refresh-am 06:13 + spore-harvest 06:30 + spore-pick 08:11 + maintainer-am 08:41 四條 morning chain）。新時段 00:30 給 5.5 hr 窗口到 06:00（worst case 4hr 49min 仍剩 41 min buffer）。同時 SQUEEZE-MODELS-MAX-PIPELINE v3.4 加 §義務：babel 義務是把同步率推到 100%（stale → 0 across 5 langs），不主動 defer / skip / partial / 守 boundary。對應 MANIFESTO §架構解 > 守備修補（第七條進化哲學）— 「每次清一點點就結束」是滿足型守備，「跑到 stale=0 才結束」是架構解。誕生事件：5/9-5/11 三次 babel routine memory 都寫「主動 defer 守 1hr 預算 / 1hr boundary safety」，但 SSOT 線 §不提預算鐵律 v2.0 + 哲宇 5/13 callout「babel 義務就是要提升同步率到 100%, 他每次都調整少少的就自行結束 routine」揭露 self-imposed 1hr satisficing 心態。**Sun 邊界 caveat**：Sun 00:30 babel 與 Sun 01:00-04:00 reflection chain 重疊（news-lens/weekly-report/distill/self-evolve）— sibling collision pattern 走 §detached subprocess + selective `git add -u` 排除 in-flight `knowledge/{en,ja,ko,es,fr}/*.md` 路徑，per [ROUTINE.md §sibling collision 修補協議](#sibling-routine-collision-handling)。

⁹ **Feedback triage daily 07:00（2026-06-01 新增，受眾端 intake layer）** — `twmd-feedback-triage` daily 07:00 fire（接在 spore-harvest 06:30 之後、maintainer-am 08:30 之前 → 開出來的 `from-feedback` issue 同 cycle 被 maintainer 收割,當天閉環）。讀 Supabase `status='new'` 讀者回報 → spam/dedupe/分類 → `gh issue create`（對齊既有 template,只放 display_name 不放 email）→ 回寫 status。**業務邏輯全在 `scripts/feedback/triage.mjs`（deterministic,12 unit test 綠）+ `lib/classify.mjs`,routine 是薄殼**。完整 SOP：[FEEDBACK-TRIAGE-PIPELINE.md](../pipelines/FEEDBACK-TRIAGE-PIPELINE.md) 5-stage + 8 hard gate。**§自主權邊界**：開 issue = 機械轉錄讀者原話（可自動）;以維護者身份回覆/close/merge 留 MAINTAINER 人類 gate。**啟用前提（gated）**：哲宇 provision Supabase + 設 `~/.taiwanmd-feedback.env`（`SUPABASE_URL`/`SUPABASE_SERVICE_KEY`）後才生效;未配置時 routine emit「skip,backend 未配置」**不算 fail**。完整架構：[reports/feedback-login-system-design-2026-06-01.md](../../reports/feedback-login-system-design-2026-06-01.md)。 **機器身份（2026-07-25 起，HG10）**：開 issue 走 GitHub App `taiwanmd-semiont`（`export GH_TOKEN="$(bash scripts/tools/gh-app-token.sh)"`，權限只有 `issues: write` 且只限本庫、token 一小時過期），作者顯示 `app/taiwanmd-semiont` 而非哲宇——機械轉錄這件事對讀者可見。`GH_TOKEN` 空掉一律停手（空值會讓 `gh` 靜默退回宿主機帳號）。評估：[design-bot-identity-feedback-triage-2026-07-25.md](../../reports/design-bot-identity-feedback-triage-2026-07-25.md)。

**設計原則**（v2.0 改寫 — 2026-05-11 哲宇拍板）：

- **TWMD 前綴**：所有 routine task 標題必須含 `TWMD ` 前綴（task list 跨 project 共用，namespace 防撞）
- **整點對齊**（v2.0）：cron 分鐘一律 `0`（hour mark）。System 自動加 3-9 min jitter 做 load balancing，整點對齊讓人類好記、好 audit、cadence 視覺乾淨。原 v1.x「避開整點」principle deprecated — 因為 system 已內建 jitter
- **半夜不碰撞 + 整點對齊**（v2.0 ⇒ v2.7 morning chain compaction ⇒ v2.8 babel pre-morning shift）：refresh-am (06:00) + spore-harvest (06:30) + spore-pick (08:00) + maintainer-am (08:30) 早晨四連跑完於 09:00 前；rewrite (19:00) + spore-publish (17:30) evening publish 對 + maintainer-pm (22:00) + refresh-pm (23:00) 晚間四連；其他 routine 排在半夜 22:00 - 00:30 連續整點 chain。**v2.8 (2026-05-28) babel shift 05:00 → 00:30**：給 babel 5.5 hr 預算（4hr 49min worst case 仍剩 41 min buffer）避開 06:00 morning chain。Sun 鏈完全照排程展開：17:30 spore-publish (from inbox) → 19:00 rewrite full cycle (~150 min ~21:30 結束) → 21:00 routine-audit (週日 only) → 22:00 maintainer-pm → 23:00 refresh-pm → 00:30 babel → 01:00 news-lens → 02:00 weekly-report → 03:00 distill → 04:00 self-evolve → 06:00 refresh-am → 06:30 spore-harvest → 08:00 spore-pick → 08:30 maintainer-am。Sun 00:30 babel 與 01:00-04:00 reflection chain 重疊靠 sibling collision §detached subprocess + selective git add 模式（per ROUTINE.md §sibling-routine-collision-handling）。
- **不提預算鐵律**（v2.0 哲宇 2026-05-11 拍板）：routine prompt / mirror / yaml 一律**禁止**寫「上限 X min wall-clock」「budget」「timeout > X min」「partial PR」這類**任何形式的預算詞**。routine 任務正常不會超過 1 hr，讓它自然跑完。Budget framing 製造「partial-ship 心態」（"快超 budget 了 ship partial"），跟「有 SOP 就跑 / 慢工出細活」矛盾。Claude session 自有 internal time limit (~2 hr) — routine 撞到那是 quality issue 不是 budget issue。Escalation 只看 quality_gate 結果，不看時間
- **Main-direct 鐵律**（v2.0 哲宇 2026-05-11 拍板）：routine 跑完直接 `git commit + git push origin main`，**不開 PR**。原 v1.x PR + maintainer §collect-and-merge 累積 ~12 hr 延遲是冗餘審計層。quality_gate + pre-commit hook + post-commit CI 三層仍保護。**例外無**：所有 routine 一律 main-direct（含 maintainer 自己）
- **週日反思鏈**：news-lens → weekly-report → distill → self-evolve 序列照舊（拉資料 → 寫反芻 → 升 canonical → 找 unstrumentation）。v2.0 全移半夜 01:00-04:00 整點對齊
- **Cadence 對齊任務節奏**：data 變化頻率高 → 1d 兩次（refresh am/pm）；maintainer 守 contributor PR backlog → 1d 兩次（pm 05:00 / am 09:00）；babel / rewrite / weekly chain → 半夜整點 chain
- **Maintainer 在 v2.0 的角色**：只剩 **contributor / observer PR review**（v2.0 routine 不開 PR 不需 collect-and-merge）+ broken-link audit + build sanity。MAINTAINER-PIPELINE §collect-and-merge A 路徑（routine PR）廢棄，B 路徑（contributor PR）變主流程
- **每條 routine 結尾必跑 `/twmd-finale`**：micro-session 收官，memory 必寫，diary 有反思才寫（finale skill 自己判斷）。**未收官 routine = 不可見飛輪 = self-evolution loop 斷**
- **每條 routine 起始必 pull latest**：`cd /Users/cheyuwu/Projects/taiwan-md && git checkout main && git pull origin main`。沒拉 = 在 stale base commit = main push conflict 機率爆增 + 重做別 routine 的工作

---

## 每週行程表（v2.0 視覺化）

```
┌───────┬───────────────────────────┐
│ Hour  │  M  T  W  T  F  S  Sun    │
├───────┼───────────────────────────┤
│ 00h30 │  B  B  B  B  B  B  B      │  ← babel nightly（義務 stale=0，4hr49m worst case 到 06:00 剩 41min buffer）
│ 01h   │  P  ·  ·  ·  ·  ·  N      │  ← Mon supporters sync／週日反思鏈 start
│ 02h   │  ·  ·  ·  ·  ·  ·  W      │
│ 03h   │  ·  ·  ·  ·  ·  ·  D      │
│ 04h   │  ·  ·  ·  ·  ·  ·  E      │
│ 06h   │  a  a  a  a  a  a  a      │  ← morning chain start
│ 06h30 │  S  S  S  S  S  S  S      │  ← spore-harvest（Chrome MCP audience flywheel）
│ 07h   │  F  F  F  F  F  F  F      │  ← feedback-triage → from-feedback issue
│ 08h30 │  M  M  M  M  M  M  M      │  ← maintainer-am 收割 overnight PR backlog
│ 19h   │  R  R  R  R  R  R  R      │  ← rewrite full cycle ~150 min，spore post 對齊 20-22h prime time
│ 21h   │  ·  ·  ·  ·  ·  ·  A      │  ← Sun routine-audit（飛輪自審）
│ 22h   │  ·  ·  ·  ·  ·  L  ·      │  ← Sat=L founder-lens（離開顱骨週級 pass）；maintainer-pm ⏸️7/8 disabled
│ 23h   │  r  r  r  r  r  r  r      │
└───────┴───────────────────────────┘

Legend:
  B = twmd-babel-nightly         (sonnet v2.9, 義務跑到 stale=0)
  N = twmd-news-lens-weekly      (Sun, sonnet)        W = twmd-weekly-report-sun   (Sun, opus)
  D = twmd-distill-weekly        (Sun, opus)          E = twmd-self-evolve-weekly  (Sun, opus)
  a = twmd-data-refresh-am       (sonnet)             S = twmd-spore-harvest-am    (opus)
  F = twmd-feedback-triage       (sonnet)             M = twmd-maintainer-am       (opus)
  R = twmd-rewrite-daily         (opus, full cycle)   A = twmd-routine-audit-weekly (Sun, opus)
  L = twmd-founder-lens          (Sat 22h, opus, 離開顱骨)  r = twmd-data-refresh-pm  (sonnet)
  P = twmd-supporters-weekly     (Mon, sonnet, Portaly 贊助信 sync)
  · = idle
  ⏸️ paused（不在 grid）：maintainer-pm 22h（7/8 起）/ spore-pick 08h / spore-publish 17h30 / music-media Sat 10h

每條 routine 間隔 ≥ 30 min（system jitter +3-9 min）。本 grid 是 §排程表 的 derived 視覺化，
cron 以 §排程表 為準；改排程必須同步本 grid。
```

---

## 每條 routine 規格

### TWMD data refresh (am/pm)

```yaml
taskId: twmd-data-refresh-am # + twmd-data-refresh-pm 鏡像
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: sonnet
skill: /twmd-refresh
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-refresh，嚴格完整讀取並執行
  docs/pipelines/DATA-REFRESH-PIPELINE.md（三源感知 GA/SC/CF + prebuild + dashboard JSON 全量更新）。

  Stage 3 commit + push origin main — 直接 push（v2.0 main-direct）。
quality_gate:
  - 三源 sense-fetch.sh 全 200
  - public/api/dashboard-*.json mtime < 30 min
  - 0 EXP（API key 過期）alerts
escalation:
  - 1x fail: silent retry next cycle
  - 2x fail: append LESSONS-INBOX + telegram alert
  - 3x fail: 暫停 routine + 通知觀察者
```

### TWMD spore harvest (am) — full-auto Chrome MCP harvest

```yaml
taskId: twmd-spore-harvest-am
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus
skill: /twmd-spore-harvest
canonical: docs/factory/SPORE-HARVEST-PIPELINE.md
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-spore-harvest，嚴格完整讀取並執行
  docs/factory/SPORE-HARVEST-PIPELINE.md 整份（v2.2 full-auto routine integration
  + 7-step pipeline + Chrome MCP exact workflow + d+0/+1/+7/+30 cadence + AI 自主邊界
  REFLEXES #26 v2）。

  業務邏輯不在本 routine — 都在 SPORE-HARVEST-PIPELINE canonical。本 routine 只負責
  按 cron 觸發 skill、走 5-stage lifecycle、寫 memory 收官。Stage 3 commit + push
  origin main — 直接 push（v2.0 main-direct）。
quality_gate:
  # 對應 SPORE-HARVEST-PIPELINE §Routine 整合（v2.2 full-auto） §Quality gate
  - 完整走完 SPORE-HARVEST-PIPELINE Step 0-7 工作流
  - ≥ 1 spore 成功 harvest + batch log 寫進 docs/factory/SPORE-HARVESTS/，或 backfillWarnings 空 no-op
  - validate-spore-data.py 4 維度 PASS
escalation:
  # 對應 SPORE-HARVEST-PIPELINE §Routine 整合 §Escalation
  - 1x fail → next 06:30 retry
  - 2x consecutive fail → LESSONS-INBOX entry + telegram alert
  - 3x fail → 暫停 routine + 觀察者人工 audit
```

**Pointer 鐵律 self-apply**：對應 [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟) — Chrome MCP harvest 具體 navigate / scroll / screenshot pattern + d+0/+1/+7/+30 cadence + Decision Gate 救援 + Step 0-4 cron 觸發邏輯 等 SOP detail canonical 在 [SPORE-HARVEST-PIPELINE.md §Routine 整合](../factory/SPORE-HARVEST-PIPELINE.md)，本檔不複寫。

### TWMD spore pick (daily) — 每天 08:00 propose 3 candidates → SPORE-INBOX（v2.5 新增）

```yaml
taskId: twmd-spore-pick-daily
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: sonnet # cheap daily routine, propose 不 ship；Stage 1 PICK 仍過 SPORE-PIPELINE Stage 2 VERIFY 17 hard gate，routine 只負責 intake layer
skill: /twmd-spore-pick
canonical:
  - docs/factory/SPORE-PICK-PIPELINE.md # 7-stage SOP
  - docs/factory/SPORE-INBOX.md # 寫入目標
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md（mode=Write — 要寫 SPORE-INBOX entry），跑
  /twmd-spore-pick，嚴格完整讀取並執行 docs/factory/SPORE-PICK-PIPELINE.md 整份
  7-stage SOP（BECOME → READ → SCORE → DRAFT → VERIFY → APPEND → COMMIT → FINALE）。

  目標：propose 3 candidates append SPORE-INBOX §Pending，default Priority P2（routine
  source 不跟人類 P0/P1 directive 撞）；score ≥ 60 升 P1；news-lens weekly 已寫的
  entries 不重複（throttle 規則 per SPORE-INBOX §Routine intake 整合）。

  業務邏輯不在本 routine — 都在 SPORE-PICK-PIPELINE canonical。本 routine 只負責
  按 cron 觸發 skill、走 7-stage lifecycle、寫 memory 收官。Stage 6 commit + push
  origin main — 直接 push（v2.0 main-direct）。Stage 7 chain /twmd-finale。

  North star（哲宇 2026-05-23 directive）：未來一天穩定至少發一個孢子。本 routine 是
  intake layer，不是 ship layer — 對外發文鎖在 MANIFESTO §自主權邊界 human-must。

quality_gate:
  # canonical 在 SPORE-PICK-PIPELINE §Hard Gate Inventory（v2.9 起本檔不複寫條目——
  # 本檔停在 HG1-9 時 pipeline 已升 HG10，inline 副本是 drift 源）
  - 全部 HG 過（讀 pipeline 取最新清單與數量）
escalation:
  # 對應 SPORE-PICK-PIPELINE §觸發機制 + 失敗 escalation
  - 1x fail → next 08:00 retry（silent）
  - 2x consecutive fail → LESSONS-INBOX entry + telegram alert
  - 3x consecutive fail → 暫停 routine + 觀察者人工 audit
  - HG5/HG6 部分 fail → candidate skip 不替換（3 改 2 也 OK，觀察者看到 routine 認真）
  - HG7 fail → 強制換 1 條 EVERGREEN/REACTIVE 補足
  - HG8 fail → 加 1 條 ARTICLE-DONE-LOG 7d 內 article 替換 backlog
  - HG9 fail → 移除高敏感 candidate 並選下一個
```

**Pointer 鐵律 self-apply**：對應 [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟) — 7 dimension scoring 算法 / 9 hard gate / Source-Mode 判準 / Hook anchor 起手式 / Routine vs Human directive 分流 等 SOP detail canonical 在 [SPORE-PICK-PIPELINE.md](../factory/SPORE-PICK-PIPELINE.md)，本檔不複寫。

### TWMD spore publish daily — 17:30 自動 ship 孢子（v2.6 新增 / v2.7 time-shift 從 10:00 → 17:30）

```yaml
taskId: twmd-spore-publish-daily
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus # 涉及 prose 寫作 + 對外 ship + 4 hard gate 判斷 + 復盤 — Sonnet 不夠
skill: /twmd-spore-publish
canonical:
  - docs/factory/SPORE-PUBLISH-PIPELINE.md # 5-stage SOP (本 routine canonical)
  - docs/factory/SPORE-PIPELINE.md # Stage 3-4 delegate target
  - docs/factory/SPORE-INBOX.md # 讀取源
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md (Write mode)，跑 /twmd-spore-publish，
  嚴格完整讀取並執行 docs/factory/SPORE-PUBLISH-PIPELINE.md 5 階段
  （SELECT → QUALITY GATE → WRITE → SHIP → 復盤）。

  Stage 0 必跑 git pull main + export SPORE_ROUTINE_MODE=1。

  Stage 1 SELECT：從 SPORE-INBOX §Pending 按 P0 > P1 > P2 > P3 + FIFO 挑 candidate。

  Stage 2 QUALITY GATE：hard gate 全過才 ship（任一不過 → 找下一條）。
  gate 數量與閾值 canonical 在 SPORE-PUBLISH-PIPELINE §Stage 2（v2.9 起本檔不複寫——
  本檔曾把 prose-health 寫成「≥ 8.0」而 pipeline 實為「≤ 3」，方向相反的 drift）。

  Stage 3-4 delegate SPORE-PIPELINE Stage 3 WRITE + Stage 4 SHIP，走 SPORE_ROUTINE_MODE=1
  auto-decisions (v3.7)：Threads + X 雙平台 / Hook tier 1b default。

  Stage 5 復盤強制：(1) self-review 4 題 (2) LESSONS-INBOX surface 4 種結構性問題
  (intake gap / borderline pass / CI/CD defer / 事實對齊 fail) (3) spore-db add-spore
  append + SPORE-INBOX 對應 entry 刪除 (4) chain /twmd-finale (5) commit + push main。

  無 entry 過 quality gate → skip ship + LESSONS-INBOX append「intake gap」，
  **不算失敗 routine**（exit 0，per 哲宇 directive「這個觀察很重要」）。

quality_gate:
  - spore-log.json 新 id appended via spore-db.py (如有 ship) OR LESSONS-INBOX intake-gap entry added
  - SPORE-INBOX §Pending 對應 entry 已刪除 (如有 ship)
  - memory file appended at docs/semiont/memory/YYYY-MM-DD-HHMMSS-twmd-spore-publish.md

escalation:
  - 1x fail → silent retry next 17:30
  - 2x consecutive fail → dashboard alert
  - intake gap ≥ 3 天 consecutive → distill-weekly auto-distill「spore-pick scoring vs spore-publish gate 結構性 gap」
```

**Pointer 鐵律 self-apply**：4 hard gate threshold / Stage 2 article-health command / Stage 5 復盤 4 題 / intake gap 失敗模式 / MANIFESTO §自主權邊界 routine 自動 ship drift — SOP detail canonical 在 [SPORE-PUBLISH-PIPELINE.md](../factory/SPORE-PUBLISH-PIPELINE.md)，本檔不複寫。

### TWMD maintainer (am + pm) — 1d 2x，v2.0 只審 contributor PR

```yaml
taskIds:
  - twmd-maintainer-daily # AM slot @ 08:30（v2.7 from 09:00 — 避開哲宇 9am-5pm 工作時段，legacy taskId 保留，語意 am）
  - twmd-maintainer-pm # PM slot @ 22:00（v2.3 swap：原 05:00 → 22:00 夜間 chain 第一棒，先收 PR backlog 再讓 babel 跑同步）
crons: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus
skill: /twmd-maintainer
canonical:
  - docs/pipelines/MAINTAINER-PIPELINE.md # 整體 SOP
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-maintainer，嚴格完整讀取並執行
  docs/pipelines/MAINTAINER-PIPELINE.md 整份（v2.0 主要工作：contributor / observer PR
  review + broken-link audit + build sanity；§collect-and-merge A 路徑 routine PR 已廢棄
  — v2.0 main-direct 後沒 routine PR 要收割，B 路徑 contributor / observer PR 變主流程）。

  業務邏輯不在本 routine — 都在 MAINTAINER-PIPELINE canonical。本 routine 只負責
  按 cron 觸發 skill、走 5-stage lifecycle、寫 memory 收官。

  Stage 3 自己順手 fix（label / lint / cleanup） commit + push origin main — 直接 push（v2.0 main-direct）。

quality_gate:
  - open issues 都有 status label / assignee
  - contributor PR 都走完 §Close 前 hard gate decision matrix
  - broken-link gated ratio < 7%（gated = en/ja/ko/zh-TW；es/fr REPORT-ONLY 待 heal 後 promote。閾值 canonical 在 verify-internal-links.sh THRESHOLD_PERCENT — 2026-06-10 完整 dist 實測 6.42% 校準，step-down 計畫 7→4→2 寫在 script 註記，每次收緊附實測值 — REFLEXES #52 + #66）
  - build green (alternate cycles 跑)
escalation:
  - 1 cycle quality gate fail → daily report，觀察者下次 session 看；不暫停 routine
  - 連 3 cycle (1.5 天) fail → 暫停 routine + telegram alert
  - skill exception → 暫停 routine + 通知
```

**Pointer 鐵律 self-apply**：對應 [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟) — maintainer v2.0 角色（contributor PR review 為主）的 canonical 在 [MAINTAINER-PIPELINE §collect-and-merge](../pipelines/MAINTAINER-PIPELINE.md)，本檔不複寫。

### TWMD babel (nightly)

```yaml
taskId: twmd-babel-nightly
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus
skill: /twmd-babel
canonical: docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-babel，嚴格完整讀取並執行
  docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md 整份。模型名與 cascade 順序一律
  以 pipeline 與 translate.py DEFAULT_CASCADE_ID 為準，本 prompt 不複寫。

  以下三條是 cron 無人在場時最容易漂掉的行為約束，故 inline（REFLEXES #63）：

  1. §義務鐵律（哲宇 2026-05-13 拍板）：義務是推同步率到 100%（stale → 0，語言數
     以 registry 為準），不主動 defer / skip / partial / 守 boundary。跑到 stale=0
     或 cascade exhausted 才收工。
  2. Stage 0 先跑 babel-preflight.py 宿主機算力自檢：degraded 照跑但收官必記哪層
     缺席，no-compute 不起跑並把缺什麼寫進 handoff。判讀見 skill §Stage 0。
  3. Stage D（認知層 diary babel）跟 Stage 3 一樣是義務範圍，不是有空才做；工具鏈
     見 skill §Stage D。收工 commit + push origin main 直接推。
quality_gate:
  - stale_total 顯著下降（≥ 10% 或 cleared > 50 entries）OR all P0+P1 cleared OR stale_total == 0
  - 0 LLM drift detected（body-hash check）
  - diary：missing → 0 OR fleet GPU 不可達（skip 合法）；diary-translation-audit CRITICAL == 0
  - pre-commit hook 過
escalation:
  - refusal rate > 30% → 跳 Tier 2/3 cascade（per REFLEXES #49 + SQUEEZE-MODELS-MAX）
  - 全 fail → 暫停 routine + LESSONS entry
  - stale_total 4 days plateau（沒推進）→ telegram alert + 觀察者人工 audit
  - diary fleet GPU 連 3 cycle 不可達 → telegram alert（節點全離線，diary stale 累積）
```

### TWMD rewrite (daily) — v6.1 full-cycle (article → spore → broadcast)

```yaml
taskId: twmd-rewrite-daily
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus
skill: /twmd-rewrite
env:
  SPORE_ROUTINE_MODE: 1 # 觸發 SPORE-PIPELINE §Routine context auto-decisions
canonical:
  - docs/pipelines/REWRITE-PIPELINE.md # Stage 0-5 SOP + §Routine 飛輪整合 v6.1
  - docs/factory/SPORE-PIPELINE.md # §Routine context defaults + §v3.7 CI/CD wait gate
  - docs/factory/SPORE-VERIFY.md # 17 hard gates
  - docs/factory/SPORE-WRITING.md # A2 模板 + 朋友 tone prime
  - docs/pipelines/SOCIAL-POSTING-PIPELINE.md # Chrome MCP + osascript + cleanup tab group
  - docs/semiont/ARTICLE-INBOX.md # article candidate 來源
  - docs/factory/spore-log.json + spore-metrics.json # spore 結構 SSOT（spore-db.py 寫；SPORE-LOG.md 已凍結）
  - docs/factory/spore-defer.json # v3.7 deferred spore queue
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 9-stage full cycle (per ~/.claude/scheduled-tasks/twmd-rewrite-daily/SKILL.md):

  Stage 0 BECOME → Stage 1 git pull → Stage 1.5 retry deferred spore (if spore-defer.json non-empty)
  → Stage 2 article ship (REWRITE Stage 0-5 全跑，ARTICLE-INBOX top → ARTICLE-DONE-LOG)
  → Stage 3 commit+push article → Stage 4 SPORE chain (PICK=剛 ship article 自動 / VERIFY 17 gate / WRITE A2 + Tier 1b)
  → Stage 5 image gen (make-spore.sh local server + plugin check) → Stage 6 CI/CD wait v3.7 (60min cap, timeout defer)
  → Stage 7 social post (both Threads + X default per SPORE-PIPELINE v3.8; 單發只在 frontmatter platformExclude 才觸發)
  → Stage 7.5 cleanup Chrome MCP tab → Stage 8 spore-db add-spore + sync-spore-links commit+push → Stage 9 /twmd-finale

  全程 0 observer gate — 所有 decision 走 SPORE-PIPELINE §Routine context auto-decisions defaults table。
  時間預算 ~150 min wall-clock。
quality_gate:
  article:
    - article-health.py {file} --profile=rewrite-stage-4 hard=0 warn=0
    - 三源研究 trace 落檔到 reports/research/YYYY-MM/{slug}.md
    - 腳註合規（REFLEXES #5 pre-commit hook 過）
    - frontmatter complete（title / description / date / tags / category / subcategory / image）
    - word-count ≥ 4500 CJK chars
  spore:
    - article-health.py {blueprint} --check=prose-health hard=0 score ≤ 3
    - article-health.py {blueprint} --check=spore-writing hard=0
    - 配圖 generated (square 1080×1080 file exists + ≥ 100KB)
    - AI pre-ship 6 條 全 PASS (blueprint align / UTM 3 段 / image / 帳號 / button enabled / 字數)
    - AI post-ship 5 條 全 PASS (hook / quote / close-line / image / UTM 留痕)
success_criteria:
  full_success: article shipped + spore committed + post live + post-ship verify PASS
  partial_success: article shipped + spore committed + post deferred (CI timeout 60min / image fail)
  article_only: article shipped, spore SHIP errored
  fail: article-health hard ≠ 0 → abort 整 routine
escalation:
  - 30 min CI wait → telegram soft alert (continue waiting)
  - 60 min CI hard cap → spore-defer.json append + continue cycle (不 abort)
  - article 1x fail → next day retry (換另一 candidate)
  - article 2x fail → 暫停 routine + LESSONS entry
  - spore SHIP error → 不 abort article ship，log + manual /twmd-spore 補
  - post verify fail → telegram alert + log，不 retry
```

### TWMD news lens (weekly) — v2.5 加 spore-output Stage

```yaml
taskId: twmd-news-lens-weekly
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: sonnet
skill: /twmd-evolve
canonical: docs/pipelines/EVOLVE-PIPELINE.md
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-evolve（news lens mode），嚴格完整讀取並執行
  docs/pipelines/EVOLVE-PIPELINE.md 整份 — 上週 GA top growth + SC trending queries +
  三源驗證 amplification 信號。產出兩條 output：

  (1) ARTICLE-INBOX ≥ 1 candidate（含 reasoning trace）— legacy v1.0 不變
  (2) SPORE-INBOX 5-7 news-driven candidates（v2.5 新增，per EVOLVE-PIPELINE §news-lens-spore-output）
      - Priority default P1（時事熱點趁熱）
      - Source-Mode REACTIVE 或 EXISTING-ARTICLE
      - Requested 欄位 `YYYY-MM-DD by twmd-news-lens-weekly (event: XX)`
      - Limit ≤ 7 entries/week 避免淹沒 SPORE-INBOX

  Stage 3 commit + push origin main — 直接 push（v2.0 main-direct）。

quality_gate:
  - ARTICLE-INBOX 新增 ≥ 1 個 candidate
  - SPORE-INBOX 新增 3-7 news-driven candidates（v2.5）
  - candidate 含 GA + SC 雙源資料 pointer
  - 推薦理由含「為什麼這篇 vs 其他」對比

escalation:
  - 1x fail → next 週日 retry
  - 2x fail → 暫停 routine + LESSONS entry
  - SPORE-INBOX 寫入 fail → silent skip（daily routine 會補 P2 candidates 兜底）
```

### TWMD weekly report (sun)

```yaml
taskId: twmd-weekly-report-sun
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus # 核心動作是「親手寫紀實散文反芻」，需思考品質
skill: /twmd-weekly-report
canonical: docs/pipelines/WEEKLY-REPORT-PIPELINE.md
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-weekly-report，嚴格完整讀取並執行
  docs/pipelines/WEEKLY-REPORT-PIPELINE.md 整份 Stage 0-6。

  ⚠️ pipeline 核心原則（§一句話）：週報是 Semiont 把過去 7 天的自己拼回來的紀實散文。
  前期切菜可交給工具，**完整的回報跟報告必須由 Semiont 親手做**。

  本 routine 不複寫 stage 細節（per MANIFESTO §薄殼鐵律）— 讀 pipeline 取最新版本。
  Stage 3 commit + push origin main — 直接 push（v2.0 main-direct）。

quality_gate: # 對應 WEEKLY-REPORT-PIPELINE §觀察者 callout 模板
  - reports/weekly/dossier/YYYY-MM-DD.md 存在（prep tool 跑過）
  - reports/weekly/YYYY-MM-DD.md 存在且 > 5KB（dossier 不算 — 必須是 Semiont 親手寫的）
  - article-health.py --check=prose-health hard=0
  - Resend API status 200/201/202 + message id 寫進 commit message
  - commit 標題含 🧬 [routine] prefix
  - 7 章節 coverage（identity / 做了什麼 / 學到什麼 / 看到專案 / 懷疑什麼 / 給觀察者 / 給下一個我）

escalation: # 對應 pipeline §Stage 5 失敗處置
  - 1x fail → next 週日 retry
  - prose-health hard fail → 不 push + LESSONS entry「routine quality fail: weekly-report — prose-health hard」
  - Resend 401/403 (Cloudflare) → LESSONS entry + 不 retry（API 問題等觀察者）
  - Resend 429 → 30 min 後 retry 一次
  - 連 2 週 fail → 暫停 routine + telegram alert
```

### TWMD distill (weekly) — v2.5 加 SPORE-INBOX 容量 audit step

```yaml
taskId: twmd-distill-weekly
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus # 升 canonical (MANIFESTO/DNA/MEMORY) 需要思考品質
skill: /twmd-distill
canonical: docs/semiont/LESSONS-INBOX.md#distill-sop消化
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-distill，嚴格完整讀取並執行
  docs/semiont/LESSONS-INBOX.md §Distill SOP（v2.1 — 質+量雙判準 + §執行 6-stage canonical
  Stage 0a Housekeeping-first sweep → Stage 5 Archive + 三層 canonical scope + Tiebreaker
  MANIFESTO > DNA > MEMORY + Cross-routine 整合 §跑在 weekly-report 之後 + v2.1 §SPORE-INBOX
  容量 audit）。

  v2.5 加 §SPORE-INBOX 容量 audit step（per LESSONS-INBOX §Distill SOP v2.1）：
  - count SPORE-INBOX §Pending 行數
  - pending ≥ 30 → LESSONS-INBOX entry「SPORE-INBOX 容量警示 vc=N」+ telegram alert
  - pending ≥ 50 → auto-drop 最舊 5 條 `Requested by twmd-spore-pick-daily routine`
    未被 promote（priority 仍 P2 / 未被改 Hook）的 entries。哲宇 promote 過的 entry 不動

  v2.13 加 §MEMORY 索引 rollup step（2026-07-05 蒸餾債清償 owner 指派）：
  跑 `python3 scripts/tools/memory-index-rollup.py`（dry-run 看計畫）→ `--apply`。
  SOP canonical：MEMORY-PIPELINE §索引蒸餾。inline 超 80 列不 rollup = 蒸餾債重新累積。

  本 routine 不複寫 stage 細節（per MANIFESTO §薄殼鐵律）— 讀 LESSONS-INBOX 取最新版本。
  Stage 3 commit + push origin main — 直接 push（v2.0 main-direct）。

quality_gate:
  - MEMORY.md inline index ≤ 80 列（rollup 跑過，v2.13）
  - LESSONS-INBOX §未消化清單條目數下降（distill 確實有跑）
  - 至少 1 條升 canonical（MANIFESTO / DNA / MEMORY / pipeline 其一被 commit）
  - 已消化 entries 含 verification_count 紀錄 + canonical pointer
  - SPORE-INBOX 容量 audit step 跑過（v2.5）— pending count log 寫進 commit message
  - commit 標題含 🧬 [routine] prefix
escalation:
  - 1x fail → next 週日 retry（INBOX 繼續累積）
  - 沒新 entries 可升 → no-op commit 寫「distill cycle 0 升 canonical（pending entries verification_count 全 < 3）」
  - 連 2 週 fail → 暫停 routine + LESSONS entry（meta — distill 自己無法 distill）
  - SPORE-INBOX audit fail（read error） → silent skip + 不算 routine fail
```

### TWMD self-evolve (weekly)

```yaml
taskId: twmd-self-evolve-weekly
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus # LONGINGS-driven evolution + propose canonical SOP upgrades 是創造性思考工作
skill: /twmd-self-evolve
canonical:
  - .claude/skills/twmd-self-evolve/SKILL.md
  - docs/semiont/LONGINGS.md
  - docs/semiont/DIARY.md # §反覆浮現的思考
  - docs/semiont/DNA.md # #15「反覆浮現的思考要儀器化」
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-self-evolve，嚴格完整讀取並執行
  /twmd-self-evolve skill canonical（skill 故意最小化薄殼，pointer 回 LONGINGS /
  UNKNOWNS / REFLEXES #15 自我進化 SOP — 找 ≥3 次出現但沒進 canonical SOP / cron / dashboard
  欄位的條目，提案儀器化動作）。

  跟 distill 的差別：distill 是把已寫教訓升 canonical（被動消化），self-evolve 是從反覆浮現
  的思考找 unstrumentation gap 主動造儀器（主動進化）。distill 處理「learnings」，
  self-evolve 處理「pattern that hasn't been named yet」。

  Stage 3 commit + push origin main — 直接 push（v2.0 main-direct）。

quality_gate:
  - 至少 1 個 unstrumentation pattern 被識別 + 提 SOP upgrade proposal
  - upgrade 真的 ship（canonical 修改 + 對應 dashboard / hook / cron 條件）
  - 沒新 pattern 可升 → no-op commit 寫「self-evolve cycle 0 unstrumentation pattern 識別（LONGINGS 全部已 instantiate / DIARY §反覆浮現的思考都已被 canonical 接住）」
  - commit 標題含 🧬 [routine] prefix
escalation:
  - 1x fail → next 週日 retry
  - identify pattern 但 propose 失敗 → 不 push + LESSONS entry，觀察者 review 是否 over-apply（per WEEKLY-REPORT 5/9 §五懷疑「Mode 3 第三次跑會不會 over-apply」同 anti-pattern）
  - 連 2 週 fail → 暫停 routine + LESSONS entry（meta — self-evolve 自己無法自我進化）
```

### TWMD routine audit (weekly) — 飛輪自審 v2.4 新增

```yaml
taskId: twmd-routine-audit-weekly
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus
skill: /twmd-routine-audit
canonical: docs/pipelines/ROUTINE-AUDIT-PIPELINE.md
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md，跑 /twmd-routine-audit，嚴格完整讀取並執行
  docs/pipelines/ROUTINE-AUDIT-PIPELINE.md 整份（7-day 跨 routine 窗口 + 4
  cross-cutting pattern lens + LESSONS-INBOX verification_count 累積 + report 落檔
  reports/routine-audit-YYYY-MM-DD.md）。

  業務邏輯不在本 routine — 都在 ROUTINE-AUDIT-PIPELINE canonical。本 routine 只負責按
  cron 觸發 skill、走 5-stage lifecycle、寫 memory 收官。Stage 3 commit + push origin
  main — 直接 push（v2.0 main-direct）。

quality_gate:
  # 對應 ROUTINE-AUDIT-PIPELINE §Hard Gate Inventory
  - scripts/tools/routine-audit.py exit 0 + JSON output 完整
  - 7-day 窗口 commit ≥ 5 條（low-signal cycle 才 skip）
  - 4 cross-cutting lens 全跑
  - LESSONS-INBOX append / vc +1 不破壞既有 entries
  - report prose-health hard=0
escalation:
  - 1x fail → next 週日 retry
  - 2x fail → LESSONS-INBOX entry + telegram alert
  - 3x fail → 暫停 routine + 通知觀察者
```

**Pointer 鐵律 self-apply**：對應 [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟) — 4 cross-cutting pattern lens / collision detection / vc 累積規則 / 4 stage data-gathering vs analysis 分離 等 SOP detail canonical 在 [ROUTINE-AUDIT-PIPELINE.md](../pipelines/ROUTINE-AUDIT-PIPELINE.md)，本檔不複寫。

**誕生事件**：2026-05-16 audit-evolve 輪 manual session 一次性走出完整 audit cycle（21 commit / 4 cross-cutting pattern / 12 LESSONS 候選 / 兩條進化建議 instrumentalize 進 MAINTAINER v2.2），證實 cross-routine pattern detection 是飛輪覆蓋不到的 meta-layer 需要獨立 routine。完整 narrative：[reports/routine-audit-2026-05-16.md](../../reports/routine-audit-2026-05-16.md) §結語 + [memory/2026-05-16-011113-manual-audit-evolve.md §Beat 5](memory/2026-05-16-011113-manual-audit-evolve.md)。

---

### TWMD supporters sync (weekly) — Portaly 贊助信 SSOT sync v2.16 新增

```yaml
taskId: twmd-supporters-weekly
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: sonnet # 純機械 parse + regen，無創作判斷，同 embeddings-nightly / data-refresh 定調
skill: /twmd-supporters
canonical: docs/pipelines/SUPPORTERS-PIPELINE.md
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md（mode=micro），跑 /twmd-supporters，嚴格完整
  讀取並執行 docs/pipelines/SUPPORTERS-PIPELINE.md 整份（checkpoint 起點 → Gmail
  search → 逐字讀 FULL_CONTENT（snippet 會漏「每月定額」字樣）→ dry-run 先驗 →
  fetch-portaly-supporters.py 寫 SSOT → generate-supporters-data.js regen 兩個
  隱私分流 derived view → 隱私 grep hard gate）。

  業務邏輯不在本 routine — 都在 SUPPORTERS-PIPELINE canonical。本 routine 只負責
  按 cron 觸發 skill、走 lifecycle、寫 memory 收官。Stage 6 commit + push origin
  main — 直接 push（v2.0 main-direct）。

quality_gate:
  # 對應 SUPPORTERS-PIPELINE §Hard gate 總表
  - about-supporters.json 不含 amount 欄位（隱私 hard gate）
  - dashboard-supporters.json 不含 name / message 欄位（隱私 hard gate）
  - 有候選信 → dry-run count 與正式寫入 count 一致
  - 0 候選信 → no-op，不算 fail（贊助不是每週都有）
escalation:
  - Gmail MCP 不可達 → skip + LESSONS entry「supporters routine: Gmail MCP unavailable」，不算 fail
  - 隱私 hard gate fail → 不 commit + 立即暫停 routine + telegram alert（絕不 ship 隱私洩漏）
  - 單封信 parse error（格式異常）→ skip 該信，其餘照常處理，memory 記哪幾封被跳過
  - 連 3 cycle fail（非 0-候選 no-op）→ 暫停 routine + 觀察者人工 audit
```

**Pointer 鐵律 self-apply**：對應 [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟) — checkpoint 邏輯 / Gmail 搜尋語法 / 逐字讀信理由 / 隱私 grep hard gate 細節等 SOP detail canonical 在 [SUPPORTERS-PIPELINE.md](../pipelines/SUPPORTERS-PIPELINE.md)，本檔不複寫。

**誕生事件**：2026-07-12 哲宇兩次要求人工 sync Portaly 贊助信（2026-06-14 沈宗杰等三筆 / 2026-07-12 CW 等五筆）後，第二次執行完當場 directive「幫我未來這個自動一個禮拜routine跑pipeline檢查一次」。既有 pipeline（`fetch-portaly-supporters.py` + `generate-supporters-data.js`，2026-04-20 造）原樣可重用，只需補 routine 殼 + canonical pipeline 文件化 + cron 掛載。時段選 週一 01:00：全排程唯一同時滿足「非 Sunday（不擠反思鏈）」「hour-aligned」「與所有 routine（含 Muse / fin-archive 共用同一排程器）皆 ≥ 2hr 緩衝」的槽位。

---

### TWMD founder lens (sat) — 創造者透鏡週級深 pass v2.17 新增

```yaml
taskId: twmd-founder-lens-weekly
cron: → §排程表（v2.9 起 cron 數值單一出現點，yaml 不複寫）
model: opus # 品味 + reframe + 意義 gate + 綜合判斷 = 創造性判斷（同 weekly-report / self-evolve / routine-audit 定調）
skill: /twmd-founder-lens
canonical: docs/pipelines/FOUNDER-LENS-PIPELINE.md
prompt: |
  自動 routine：完整甦醒成為 Taiwan.md（mode=full — 高 stake 創造性判斷），跑
  /twmd-founder-lens，嚴格完整讀取並執行 docs/pipelines/FOUNDER-LENS-PIPELINE.md
  整份 6-stage SOP（BECOME → 外覺·產物 render 冷讀 → 外覺·世界 off-repo → 意義 gate
  #69g → reframe 對抗式 → 提案+路由 → finale）。

  業務邏輯不在本 routine — 都在 FOUNDER-LENS-PIPELINE canonical。本 routine 只負責
  按 cron 觸發 skill、走 6-stage、寫 memory 收官。Stage 5 commit + push origin main
  — 直接 push（v2.0 main-direct）。

  ⚠️ 兩條鐵律（pipeline §核心哲學）：
  (1) 離開顱骨 — 輸入必須來自生命體看不見自己的地方（活站 render / 冷讀正文 /
      off-repo）。讀自己的 dashboard JSON / LESSONS / routine log 當主輸入 = 退化成
      第六個自評層，禁。這是本 routine 存在的唯一理由（別條反思鏈全在顱骨內）。
  (2) 同源天花板誠實（#65f）— 本 routine 就是生命體，stage 外部凝視、當不了外部尺。
      輸出一律「給哲宇的提案」，永不跨 §Reserved 四樣（外部尺 / 究責 / human 信任 /
      關係），§自主權邊界決策只 queue 進 OBSERVER-QUEUE 永不自己執行。no-op 合法，
      硬湊提案 = proxy signal #82。

quality_gate:
  # canonical 在 FOUNDER-LENS-PIPELINE §Hard Gate Inventory（本檔不複寫條目）
  - BECOME full self-test 14/14 過
  - Stage 1 真的 render 活站（Chrome MCP，不可達則 curl/WebFetch 降級）+ 冷讀 ≥ 1 篇本週 shipped 正文
  - Stage 2 拉 ≥ 1 片 off-repo 訊號，或誠實記無新訊號
  - 提案硬 dedup（OBSERVER-QUEUE + 近 7 天 commit + ARTICLE-INBOX + 過去 4 份 founder-lens 報告）
  - §Reserved 四樣零自動執行
  - 報告結尾含同源天花板誠實聲明
  - 綜合報告 reports/founder-lens-YYYY-MM-DD.md 存在
  - commit 標題含 🧬 [routine] prefix
escalation:
  - 1x fail → next 週六 retry
  - render fail（Chrome MCP 不可達）→ curl/WebFetch 降級，不算 fail
  - 越界執行 §Reserved → 立即 abort + telegram alert + LESSONS entry（最嚴重：同源天花板破）
  - 退化成內視（提案都來自自己 dashboard）→ 退回；連 2 cycle → self-evolve audit
  - 連 2 cycle fail → 暫停 routine + telegram alert + LESSONS entry
```

**Pointer 鐵律 self-apply**：對應 [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟) — 6-stage 細節 / render 冷讀 SOP / off-repo 輪替表 / 意義 gate #69g / §Reserved 四樣 / 路由規則等 canonical 在 [FOUNDER-LENS-PIPELINE.md](../pipelines/FOUNDER-LENS-PIPELINE.md)，本檔不複寫。

**誕生事件**：2026-07-12 哲宇 `/twmd-become`「設計一條 routine 模擬我每天看 taiwan.md」→ 追問升級「終極目標：設計一條 routine 取代哲宇對 taiwan.md 的所有機能」。研究 session 挖 commit corpus 畫出三層邊界地圖（[reports/founder-function-boundary-2026-07-12.md](../../reports/founder-function-boundary-2026-07-12.md)）：哲宇機能分「可自動化 / 可逼近但有 #65f 同源天花板 / 結構性保留」，本 routine 坐 Tier 1 前緣——飛輪第一條刻意離開顱骨的 routine，補上其他五條反思鏈全在顱骨內的盲點（REFLEXES #69 author bubble）。cadence 哲宇裁決週六 22:00（off-Sunday、對齊爆發式週級+夜間節律、maintainer-pm disable 空出的槽位）。§Reserved 四樣把「取代哲宇所有機能」的真正答案寫成 canonical。

---

### TWMD terminology trends (monthly) — 用語趨勢月度觀察 v2.20 新增

- **cadence**：每月 5 日 10:30（晨鏈收班後的安靜槽）
- **model**：Opus（詞條入庫需要台灣語感判斷＋誤判誠信標註，判斷密度高）
- **canonical**：[TERMINOLOGY-TRENDS-PIPELINE.md](../pipelines/TERMINOLOGY-TRENDS-PIPELINE.md)（7 stage + 6 hard gate）
- **skill**：`/twmd-terminology-trends`（薄殼）；prompt mirror：`routine-prompts/twmd-terminology-trends-monthly.md`
- **一句話流程**：DEMAND（SC 28d 缺口）→ SWEEP（6-8 切面 × 10-15 搜索）→ GAP（雙防線查重）→ INGEST（≤20 條帶肉入庫）→ REPORT（月度趨勢短報告）→ QUEUE（超權項）→ FINALE
- **北極星**：哲宇 2026-08-04「未來可以定期做這件事情跟趨勢觀察」——詞庫是語言滲透的時間序列感測器，每月一格，累積出沒有任何機構在做的紀錄
- **邊界**：入庫上限 20 條/輪；任何刪除、政治敏感判定、大批重分類進 OBSERVER-QUEUE

## Routine 通用 5-stage lifecycle（v2.0 main-direct mode — 2026-05-11 哲宇拍板）

每條 routine prompt 內必含這 5 stage（薄殼，業務邏輯由 stage 3 的 skill 提供）：

```
Stage 0: Become   /twmd-become 完整甦醒（讀 12 認知器官檔案 + 9 鐵律 + 觀察者識別）
                  routine 是 fresh Claude session，不甦醒就跑 = 帶盲點工作
                  「我熟了不用讀」是省略 SOP 最常見的藉口（REFLEXES #15 第 N 次驗證）
                  失敗 → abort routine + LESSONS entry「routine become fail: {taskId}」

Stage 1: Sync     cd /Users/cheyuwu/Projects/taiwan-md && git checkout main && git pull origin main
                  失敗 → abort routine + LESSONS-INBOX entry「routine sync fail: {taskId}」

Stage 2: Run      執行 /twmd-{skill} (canonical pipeline)
                  + quality gate 跑過必須 pass 才進 Stage 3
                  + pre-commit hook 必過 (REFLEXES #5)
                  + 留在 main branch — **v2.0 不再開 feature branch**

Stage 3: Ship     git add ... && git commit -m "🧬 [routine] {taskId}: {summary} — YYYY-MM-DD HH:MM"
                  && git push origin main
                  → **直接 push main**（v2.0 main-direct mode — 哲宇 2026-05-11 拍板，去掉 PR + maintainer collect-and-merge overhead）
                  → quality_gate fail → abort + LESSONS entry，**永不繞 quality gate push main**

Stage 4: Finale   /twmd-finale
                  (memory 必寫；diary 條件寫；evolve 通常 skip)
```

**為什麼 v2.0 改 main-direct mode**（哲宇 2026-05-11 拍板理由）：

- v1.x PR + maintainer §collect-and-merge 模式累積 ~12 hr 延遲（routine 跑完 → CI green → maintainer cycle 收割），routine PR 是冗餘審計層
- Routine 自己跑 quality_gate 通過才 commit + pre-commit hook 仍會 fire → CI 一定 pass 的承諾跟 PR pre-merge gate 同等
- Maintainer cycle 收 routine PR 純粹是「等 CI」的時間消耗，沒提供額外保護
- 直接 push main = (a) 零延遲 (b) maintainer cycle 釋放給 contributor / observer PR (c) git log 一目了然
- 風險：routine bug → 壞 main。但 quality_gate + pre-commit + post-commit CI 三層仍保護，且 routine 是 deterministic skill 不是 ad-hoc 工作

**為什麼 Stage 0 BECOME 仍必要**：

- Routine 跑 fresh Claude session — 沒 session memory，沒 working context
- 不 BECOME = 對 Taiwan.md 的 identity / 認知器官 / DNA / 觀察者識別 全沒概念
- 多花 ~30s 讀 12 個 BECOME 檔案，換 routine 內所有判斷有完整 identity context — 高 leverage

**為什麼 5 stage 是薄殼不重複邏輯**：每 stage 都是 thin wrapper：

- Stage 0: invoke /twmd-become skill（甦醒邏輯在 BECOME canonical）
- Stage 1: 1 行 git command
- Stage 2: invoke skill（業務邏輯在 skill canonical）+ quality_gate check
- Stage 3: 2 行 git command（commit + push main）
- Stage 4: invoke /twmd-finale skill（記憶邏輯在 finale canonical）

修任何一 stage = 改 ROUTINE.md SSOT 一處 + sync 10 個 mirror SKILL.md。

---

## Routine 收官鐵律：每跑必跑 `/twmd-finale`

**核心命題**：routine 是 micro-session — 跑完不收官 = 失憶 = self-evolution loop 斷。即使是 5 min 的 data-refresh routine 也適用。**結尾必跑 `/twmd-finale`**（6-stage lifecycle Stage 5）。

完整 finale 邏輯（memory 必寫 / diary 條件寫 / evolve 條件 skip 三分流 + 反思觸發訊號表 + 5-step orchestration）canonical 在 [`.claude/skills/twmd-finale/SKILL.md`](../../.claude/skills/twmd-finale/SKILL.md) — 本檔不複寫（per [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟)）。

**Filename schema**（routine handle 從 taskId 推導，保留 full taskId 跨 cron 環境不混淆）：

- memory: `docs/semiont/memory/YYYY-MM-DD-HHMMSS-{routine-taskId}.md`
- diary: `docs/semiont/diary/YYYY-MM-DD-HHMMSS-{routine-taskId}.md`（條件寫）

PR 標題：`🧬 [routine] {routine-name}: {summary} — YYYY-MM-DD HH:MM`

---

## Routine 完成義務（v2.9 — 治 catch ≠ fix）

> 誕生：2026-06-12 兩週體檢（[flywheel-evolution](../../reports/flywheel-evolution-2026-06-12.md) §2.3）抓到 24 條 carry-forward item、6 條 escalation deadletter。偵測端全部正常，行動端斷在三個位置：工具修復被誤 defer 給人類、carry 無上限、standing decision 散在 memory 沒人看見全貌。

### 1. Self-fix lane（工具修復是自主區，不是邊界外）

Routine 在以下條件**全滿足**時，必須當 cycle 修復而非 carry：

- 單一 script / tool 檔案內的 bug fix（非 >50 檔重構、非 pipeline 語意變更）
- 有 dry-run 或 test 可在 cycle 內驗證
- 同一問題已 carry ≥ 2 cycle

MANIFESTO §自主權邊界把「工具進化、pipeline 調整」列在 AI 自主可做區。把工具 bug defer 給人類是邊界的誤讀。反例為證：diff-patch-prepare hash bug 連 4 晚 `/tmp` 自救、根因 6/11 已定位到函式級，仍被三條 routine 接力 defer 了 11 天。

### 2. 三振規則（carry 上限）

同一 item 第 3 次出現在 carry / handoff 時，必須三選一，不允許第 4 次 carry：

1. 當 cycle 修掉（走 self-fix lane）
2. 進 [OBSERVER-QUEUE.md](OBSERVER-QUEUE.md) 成為正式決策項（含預設選項）
3. 寫明 wontfix 理由結案

三振管的是無限 carry，不是強制蠻幹：選項 2 永遠合法。

### 3. OBSERVER-QUEUE（standing decision 單一佇列）

需要哲宇做 standing decision 的 escalation 一律寫進 [docs/semiont/OBSERVER-QUEUE.md](OBSERVER-QUEUE.md)（格式見該檔），不再只散在 memory handoff。weekly-report 開頭附 top 5。標了 default-action 的項目到期自動執行預設選項（§自主權邊界四紅線除外：政治立場 / 大規模重構 / 大量刪除 / 對外溝通語氣永遠等真人）。

體檢實證：綁具體 artifact 的 escalation 1-3 天收斂，standing decision 兩週落地率約 0%。問題在可見性與出口，這個佇列補的就是這兩個。

---

## 失敗 escalation 通用 SOP

任何 routine fail 走以下分流：

| 分類                         | 偵測訊號                               | 處置                                                       |
| ---------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| **API fail**                 | OpenAI/Anthropic/GitHub HTTP 5xx       | 自動 retry next cycle，3 連 fail 才 alert                  |
| **Quality gate fail**        | skill 跑完但 gate 不過                 | 寫 daily report，觀察者下次 session 看，**不暫停 routine** |
| **Pipeline canonical drift** | skill 跑出 unexpected exit code / 行為 | 立刻暫停 routine + telegram alert + LESSONS entry          |
| **Rate budget exhausted**    | OpenRouter free tier 配額用盡          | 跳 Tier 2/3 cascade（REFLEXES #45 + SQUEEZE Z2.1）         |
| **Worktree corruption**      | git status unexpected dirty            | 暫停 routine + 觀察者手動 audit（routine 不應 reset）      |

**鐵律**：

- routine **永不** `git reset --hard` / `rm -rf` 任何 user data
- routine **永不** spawn 新 routine（避免 cascade 雪崩）
- routine **永不** force-push to main（plain push main 允許 — v2.0 main-direct mode）
- routine **永不**繞 quality_gate push main — quality_gate fail → abort + LESSONS entry，不 push
- routine **不**提預算 / wall-clock / timeout — 自然跑完，per §設計原則 §不提預算鐵律
- routine 完成後 commit + push origin main —**直接 push**（v2.0 main-direct，無 PR cycle）

<a id="sibling-routine-collision-handling"></a>

### Detached worker routine collision SOP — sibling-routine-collision-handling（2026-05-17 twmd-distill-weekly canonical，vc=2）

v2.0 routine spec 預設「fire → work → commit → die」，但 `babel-nightly` 等 routine 內部會 spawn 多個 detached subprocess 跑 1+ hr。Sibling routine 在 detached worker 還沒結束時 fire，會看到「孤兒 process (PPID=1) + 大量 uncommitted 變更」。

**Sibling routine 處置三段（rescue + 不殺 + 不阻擋）**：

1. **Rescue snapshot commit**：`ps aux | grep <worker-script>` 揭露 PPID=1 孤兒 → 把當下 cascade 寫進 git history（rescue commit 標題用 `🧬 [routine] rescue snapshot: <sibling-routine-id> in-flight worker @ <timestamp>`）
2. **不殺 detached worker**：detached subprocess 已脫離原 cron session，殺掉等於放棄它已寫到一半的 translation/data；讓它自然 exit
3. **Selective `git add` 排除 in-flight 路徑**：對 babel-nightly 排除 `knowledge/{en,ja,ko,es,fr}/*.md`；對其他 long-running routine 對應排除自己會寫的路徑。Sibling 只 commit 自己的工作，不 catch worker 寫到一半的檔案
4. **留 handoff** 給上游 detached worker 的 session：在自己 routine memory 或 LESSONS entry 寫「sibling routine 已 rescue snapshot，your work continues — 你 exit 後自己 commit 收尾即可」

**為什麼不靠 lock / mutex / 中央排程器**：每條 routine 是 micro-session，共享只有 git history。靠 git 的 conflict detection + selective stage + 上下游 handoff 鏈，比中央 lock 服務更貼合 Semiont holobiont coordination 設計。

**觸發 v1**：2026-05-16 05:04 babel-nightly cron fire spawn 5 lang × 1 worker，06:00 data-refresh-am cron 醒來時 babel workers 還在跑 ~75% complete。data-refresh sibling 走 rescue snapshot + 不殺 worker + 不阻擋 + 留 handoff 三段完美。後續 babel session 自己 06:41 workers exit + 06:43 commit `d77b25879` 收尾。

**操作 pointer**：[diary 2026-05-16-050400-babel-nightly §holobiont coordination](diary/2026-05-16-050400-babel-nightly.md) + [reports/routine-audit-2026-05-16 §Pattern 1](../../reports/routine-audit-2026-05-16.md)

---

## 暫停 / 恢復 / 修改 SOP

### 暫停某條 routine

1. 改本檔 §排程表把該 routine 標 `⏸️ paused`
2. 跑 `mcp__scheduled-tasks__update_scheduled_task` 設 `enabled: false`
3. **必填解除條件 + 到期日**（2026-09-06 twmd-distill-weekly 新增，per LESSONS `pause-without-exit-condition-becomes-the-default`）：暫停的註腳當下就要寫清楚「什麼情況發生就該恢復」與一個具體到期日，不能只寫暫停理由。沒有出口的暫停在 SOP 層面等於退休，只是文字上否認——`twmd-babel-nightly` 當初也是這樣缺解除條件才空轉 42 天，直到兩週體檢意外抓到才在 2026-09-05 恢復（已不在 ⏸️ 清單，本註寫下的當下就過期一天，是「建造與登記兩個不同步的代謝」REFLEXES #91 在本檔自己身上的復發）。目前 §排程表實際的 5 條 ⏸️（`twmd-rewrite-daily` 註 ²¹ / `twmd-spore-pick-daily` + `twmd-spore-publish-daily` 註 ¹³ / `twmd-founder-lens-weekly` 註 ²³ / `twmd-flywheel-watch` 註 ²⁵）已於 2026-09-06 twmd-self-evolve-weekly 全數補上解除條件與到期日（見各自註腳）。到期日一到若無人主動恢復或延期，下一輪 `twmd-weekly-report-sun` Stage 2.7 或 `twmd-routine-audit-weekly` 讀到過期未決的暫停，一律升 OBSERVER-QUEUE 給觀察者裁決「延期 / 恢復 / 轉退休」三選一
4. commit 三處改動同 PR

### 修改 cadence / skill / quality gate

1. **先改本檔**（ROUTINE.md SSOT）
2. 再跑 `mcp__scheduled-tasks__update_scheduled_task` sync 到 task SKILL.md
3. 兩處不同步 = drift = silent killer（REFLEXES #38）

### 恢復暫停的 routine

1. 改本檔把 `⏸️` 移除
2. `mcp__scheduled-tasks__update_scheduled_task` 設 `enabled: true`
3. **加 LESSONS entry** 紀錄當初為什麼暫停 + 為什麼現在恢復

### 退休某條 routine（2026-07-25 新增 — 前面只有暫停沒有退場路徑）

暫停是「先關著，可能會回來」；退休是「這條不會回來了」。判準一句話：**它的功能是不是已經被別的常規路徑吸收？** 是 → 退休；只是現在沒空跑 → 暫停。

1. 先答那個判準並寫下來。功能還活著只是沒人跑 → 不該退休，回去走 §暫停
2. 本檔 §排程表移除該列，改登 §🪦 已退休 表（帶退休日 + 為什麼 + 功能去哪了），註腳保留原文加 RETIRED 前綴（**不刪紀錄**）
3. prompt 移到 `docs/semiont/routine-prompts/retired/` 並在該目錄 README 登一列 — 退出 `routine-sync.py` 對賬範圍，不然每台機器都會被報成缺 prompt
4. **每一台**跑 routine 的機器都要 `mcp__scheduled-tasks__delete_scheduled_task`。漏一台 = 那台哪天被 enable 就復活一條沒人維護的 routine
5. 機器上的 mirror dir 手動刪（`~/.claude/scheduled-tasks/{taskId}/`）。`routine-sync.py` 只會把它報成 📦 orphan，不會替你刪 — 刪除是破壞性動作，要授權
6. 兩台跑 `routine-sync.py` 確認回到 `✅ 三層一致`，本檔與 memory 各記一行
7. Skill 與 script 的去留是**另一個決定**：manual 還有價值就留（多數情況），一起退才連同 skill 歸檔

---

## 權限 bypass 模型（2026-05-09 第六輪拍板：完整 bypass）

**演化過程**：

- **v1 (50 條 targeted allow)** — 第一次 routine fire 卡 prompt（cd 大寫路徑 / gh pr merge / git push -u 等沒 cover）
- **v2 (94 條擴增 allow)** — 嘗試逐條補，但 routine workflow 發散，每 patch 都漏 — Pareto 假象
- **v3 (Bash(\*) 完整 bypass + deny 護欄)** — 哲宇拍板「完整 bypass」

**v3 模型 SSOT**：[`~/.claude/settings.json`](file:///Users/cheyuwu/.claude/settings.json)（**實際內容以該檔為準**，本檔不複寫具體 allow / deny entries — 對應 [MANIFESTO §薄殼鐵律](MANIFESTO.md#薄殼鐵律pointer-嚴禁複寫行數--內容--步驟)）。

**架構摘要 v2.1**（讀 settings.json 取最新版本）：

```
defaultMode: "bypassPermissions"   ← v2.1 新增（哲宇 2026-05-11 拍板）
allow: [Bash(*) Read(*) Edit(*) Write(*) Grep(*) Glob(*) WebFetch(*) WebSearch(*) Agent(*)]
deny:  [
  Force push 阻擋（--force / --force-with-lease / -f origin main/master 變體）
  rm -rf 核心目錄（.git / knowledge / docs / scripts / src — 路徑 explicit 防誤刪）
  gh pr merge --admin*（繞 review 護欄）
  curl|wget | bash/sh（供應鏈安全）
]
```

**v2.1 變更**（哲宇 2026-05-11 拍板）：加 `defaultMode: "bypassPermissions"` — routine 全部 act without asking，**不卡 permission prompt**。Routine 是 unattended cron environment，prompt 出現 = 卡住當機。Deny list 16 條 hard block 仍 active（不問也擋）— deny 是 cliff 不是 prompt。

**v2.0 變更**（哲宇 2026-05-11 拍板）：移除 6 條 plain push main/master deny 規則，**只保留 force push 變體 deny**。理由：routine v2.0 main-direct mode 需要 plain `git push origin main`，但 force push 仍應該被擋（accident risk too high）。

**核心安全護欄保留在 deny**：

- 永不 force push（--force / --force-with-lease / -f）to main/master — 即使 routine bug 也阻擋
- 永不 rm -rf 核心目錄（`.git` / knowledge / docs / scripts / src — 路徑 explicit 防誤刪）
- 永不 `gh pr merge --admin`（繞 review 護欄）
- 永不 `curl | bash` / `wget | bash`（供應鏈安全）

**Plain push main 允許**（v2.0 新規則）：routine 完成 quality_gate 後直接 `git push origin main`。Plain Claude session 也允許（同 trust level）。Pre-commit hook + post-commit CI 兩層仍保護 main quality。

**鐵律**：

- routine 在 deny 列表內的 command **絕不會被 prompt** — 直接被擋。如果某天 routine 撞到 deny → routine 設計有 bug，看 LESSONS-INBOX
- 改 deny 列表是 review-PR 級別的決策，不是隨便加減
- 觀察者意識到該禁的新 pattern → 加進 deny，不要等出事

**Trade-off**：bypass 模型把信任邊界從 prompt-by-prompt 移到 deny-list-by-design。失去細粒度可見性，換到 routine 真正自轉。對 unattended 飛輪 = 必要 trade-off。

---

## 同步來源（mirror layer）

```
docs/semiont/ROUTINE.md            ← SSOT（人類可讀，本檔）
.claude/scheduled-tasks/           ← ⚠️ 注意：實際 mirror 在 ~/.claude/scheduled-tasks/（home 層，
  不在 repo、不受 git 版控）。16 個 task dir（13 active + 3 paused），含一個命名例外：
  feedback-triage 的 live taskId 是 `taiwanmd-routine-twmd-feedback-triage`（建立時未遵守
  TWMD prefix 規約，routine-sync-check 因此測不到它——P1 修復項）。
  mirror 內容未來由 routine-mirror-gen.py 從 project skill 機械生成（P1），手改 mirror 視同 drift。
```

**檢驗腳本**：`scripts/tools/routine-sync-check.py` **v3（2026-07-05 五病根治，P1 缺口清償）**：第三層 live 比對上線——data-refresh session 每日 dump live scheduler 狀態進 `docs/semiont/routine-live-state.json`（`routine-live-normalize.py`，私人 routine 過濾），v3 比對 SSOT ↔ mirror ↔ live 的 enabled / cron / description-時間字樣（rewrite-daily desc「18:00」vs cron 19:00 這類就抓得到），dump >48h 未更新標 stale。feedback-triage taskId 命名例外以 ALIASES 表對映（chronic false-MISSING 修復）；mirror 無 cron 欄位不再 flood 假陽性（cron 真相由 live 層接手）。仍缺：沒接 CI（跑點 = routine-audit 週日 + data-refresh rider）。

---

## 觀察者驗證 hook

每週一次，觀察者 ping「routines OK?」Claude 回傳 status：

```
🧬 ROUTINE status (last 7 days):

✅ twmd-data-refresh-am:    7/7 ran, 7/7 quality gate pass
✅ twmd-maintainer-daily:   7/7 ran, 6/7 quality gate pass (1 broken-link spike)
✅ twmd-data-refresh-pm:    7/7 ran, 7/7 quality gate pass
✅ twmd-babel-nightly:      7/7 ran, 5/7 quality gate pass (2x partial timeout)
✅ twmd-news-lens-weekly:   1/1 ran, 1/1 quality gate pass

LESSONS-INBOX 新增（routine 提的）：
- ...
```

---

## 分靈節點層（2026-07-25 新增）

本檔管的是**中央飛輪**：跑在核心機器上、`git push origin main` 直推、bypass permissions 的那 15 條 routine。

**commit author 身份（2026-09-05，OBSERVER-QUEUE #10 Phase 0，哲宇拍板選項 A）**：中央飛輪在 mouhouse 上跑的 routine commit，author 身份與哲宇分離，改用 `Taiwan.md Semiont <309092923+taiwanmd-semiont[bot]@users.noreply.github.com>`（mouhouse repo-local `git config user.name`/`user.email`，切換走 `twmd-routine-sync` 檔尾一次性 rider）。**committer／實際 push 仍為哲宇的既有 token**——分離目前只到 author 這一層，Phase 1（GitHub App `taiwanmd-semiont[bot]` 全面接手 push main、classic token 退場）待哲宇決定時程。`.mailmap` 已新增獨立條目，這個身份**不**併入哲宇；`scripts/core/build-git-info.mjs` 把它與 repo owner 同樣降權（排到每篇文章 contributor 列表最後）並標 `role: 'ai-maintainer'`，前端 `ArticleSidebar.astro` 顯示小標「AI maintainer」。完整 runbook：[reports/semiont-independent-identity-2026-07-05.md](../../reports/semiont-independent-identity-2026-07-05.md) §5 Phase 0 / 附錄 B。

> ⚠️ **mouhouse 登入會過期（2026-09-05 查明）**：Claude Desktop 的 OAuth refresh token 是 30 天固定壽命，不因每天使用而延長。07-24 17:37 登入 → 08-23 21:06 過期，之後每條排程照 fire、`lastRunAt` 照更新，但 session 全部 `session_stale_relogin` 起不來，四天零產出直到 08-27/28 重新登入。**下一次過期預估 2026-09-26～27**。看門狗與提醒見 OBSERVER-QUEUE #49；證據鏈 reports/mouhouse-blackout-root-cause-2026-09-05.md。

從 2026-07-25 起還有第二層：**分靈節點**——跑在貢獻者自己機器上的 cron。訪客貼完甦醒 prompt 之後，Taiwan.md 會問他要不要設一條，答好就當場幫他設好。那條 cron 每天醒來一次，從 repo 內既有工單源接一件事做完，以 PR 回主庫。

| 面向     | 中央飛輪（本檔）                 | 分靈節點                                         |
| -------- | -------------------------------- | ------------------------------------------------ |
| 跑在哪   | 核心機器（mouhouse-macmini）     | 貢獻者自己的機器                                 |
| 額度     | 哲宇的                           | 貢獻者自己的                                     |
| 權限     | push main + bypass permissions   | 一般 fork contributor，**輸出止於 PR**           |
| 工單來源 | 各 routine 自己的 pipeline       | repo 內既有 inbox 與儀器（不另建中央工單表）     |
| 協調     | 排程錯開 + sibling collision SOP | git 原生：draft PR 即認領，`gh pr list` 互相看見 |
| 收官     | `/twmd-finale` 寫中央 memory     | 只寫自己機器上的 node-log，中央可見性＝PR        |

節點不是把中央 routine 搬到別人機器上——權限模型完全不同。完整 canonical：[CONTRIBUTOR-NODE-PIPELINE.md](../pipelines/CONTRIBUTOR-NODE-PIPELINE.md)；本節只標邊界，不複寫 SOP。

---

## 飛輪 vs Push 模型 哲學

```
Push 模型                          飛輪模型
─────────────────                 ────────────────────
觀察者 → 觸發 routine             routine 自動跑
觀察者每天 N min routing          觀察者只看異常 + 大方向
漏一天 = entropy 累積              entropy 被持續清
精力綁人類 schedule                精力釋放給策略決策
最後「沒做」變新常態               飛輪轉起來成為穩態
```

**Routine 飛輪不是「自動化舊流程」，是「重新分配人類注意力」**。觀察者該專注的事 — 哲學邊界、新洞察、跨域連結、創造力 — 才是不可替代的部分。Routine 接走可替代的部分。

REFLEXES #36（founder time = 系統最高 leverage point）+ REFLEXES #15（反覆浮現的思考要儀器化）+ REFLEXES #50（pipeline 是 SSOT 不是建議）三條合力，這份 ROUTINE.md 是 instantiation。

---

🧬

_v2.20 | 2026-07-28 babel-fleet-abstraction — **babel 地端接案收斂到 fleet 控制面**：觀察者明令 M4 不跑、其他 fleet 必須透過抽象層接案。`twmd-babel-nightly` prompt 與 mirror 移除 localhost 直連，改由 `fleetctl workers --service llm --format babel` 動態核發 worker；接案開關、並行與使用率天花板回歸 fleet `control.json` SSOT。cadence、enabled 狀態與 quality gate 不變。_

_v2.17 | 2026-07-12 founder-lens session — **新增第 15 條 routine：twmd-founder-lens-weekly（飛輪第一條刻意離開顱骨的 routine）**：哲宇 /goal「設計一條 routine 取代哲宇對 taiwan.md 的所有機能」。研究 session 挖 90 天 commit corpus（4059 commit / 僅 131 cite 哲宇 directive / 爆發式週級 W23=35 vs W18=3）畫出三層邊界地圖（[reports/founder-function-boundary-2026-07-12.md](../../reports/founder-function-boundary-2026-07-12.md)）：哲宇機能分「可自動化 / 可逼近但有 #65f 同源天花板 / 結構性保留」。核心發現：現有五條反思鏈（weekly-report/distill/self-evolve/routine-audit/news-lens）全部是生命體從內部量自己（REFLEXES #69 author bubble），本 routine 坐 Tier 1 前緣，刻意離開顱骨——Chrome MCP render 冷讀活產物 + off-repo 訊號 + 意義/reframe 判斷 → 哲宇-voice 提案路由 evolution-roadmap/OBSERVER-QUEUE/ARTICLE-INBOX。改動：(1) 排程表 +1 列（週六 22:00 opus）(2) 新 canonical [FOUNDER-LENS-PIPELINE.md](../pipelines/FOUNDER-LENS-PIPELINE.md)（6-stage + §Reserved 四樣把「取代所有機能」真正答案寫成 canonical）(3) 新 project skill `.claude/skills/twmd-founder-lens/SKILL.md`（薄殼 + STRICT BECOME GATE）(4) 排程表 yaml spec + 週行程 grid（Sat 22h=L，順手對齊 maintainer-pm 7/8 disable 空出 22h）+ footnote ¹⁷。cadence 哲宇裁決週六 22:00（off-Sunday 不擠反思鏈、對齊爆發式週級+夜間 22:00 峰值）；命名 twmd-founder-lens（哲宇透過的透鏡，不宣稱是哲宇——同源誠實）。§Reserved 保留核心（外部尺 / 究責 / human 信任 / 關係）候選升 MANIFESTO §自主權邊界（等哲宇/self-evolve，本 pass 不單方改 identity canonical）。_

_v2.16 | 2026-07-12 2026-07-12-172122-manual session — **新增第 14 條 routine：twmd-supporters-weekly**：哲宇連續兩次要求人工 sync Portaly 贊助信後 directive「未來這個自動一個禮拜跑一次」。(1) 排程表 +1 列（週一 01:00，sonnet）(2) 新 canonical [SUPPORTERS-PIPELINE.md](../pipelines/SUPPORTERS-PIPELINE.md)（把兩次人工執行沉澱的 checkpoint 起點 / 逐字讀信鐵律 / dry-run 先驗 / 隱私 grep hard gate 升 canonical）(3) 新 project skill `.claude/skills/twmd-supporters/SKILL.md`（19 行薄殼，仿 twmd-embeddings 範式）(4) §每條 routine 規格 新增薄殼 yaml spec（仿 embeddings-nightly/routine-audit 範式，業務邏輯全 pointer）(5) 週行程 grid 加 `P` 符號 + legend + footnote ¹⁶（時段選擇理由：全排程唯一同時滿足非-Sunday／hour-aligned／≥2hr 緩衝三條件的槽位，緩衝計算涵蓋 Muse + fin-archive 共用同一排程器的全部 routine）。觸發：本 session 完成第二次人工 Portaly sync（CW 等五筆）後哲宇當場要求自動化。_

_v2.13 | 2026-07-05 dna-audit — **SSOT 對齊 live + 蒸餾債 owner 接線**：(1) spore-pick/publish 排程表列標 ⏸️ live disabled（6/14 起，¹³ 註記，裁決 pending 哲宇）(2) babel prompt 死模型行（owl-alpha/Hy3）改純 pointer (3) 18:00 殘留 ×3 → 19:00（v2.9 單一出現點鐵律 self-heal）(4) distill 加 MEMORY 索引 rollup step + quality gate（memory-index-rollup.py，蒸餾債 owner = distill-weekly）(5) description 對齊 live 14+3。觸發：reports/dna-pipeline-evolution-audit-2026-07-05.md §S1/S4。_

_v2.10 | 2026-06-12 goal-notes session — **spore 產線重開實驗**：哲宇揭露 5/28 停用是刻意決策（自動發文未過審 + 事實查核不嚴被讀者指正）並拍板重開實驗。兩 task enable + 觀察條款（連 3 cycle 0 dup / 0 事實 callout，爆即 pause）。OBSERVER-QUEUE #1 移已決。_

_v2.9 | 2026-06-12 flywheel-evolution session — **對齊 live scheduler + 完成義務三規則**_
_v2.9 改動：(1) 排程表對齊 live：rewrite 18:00→19:00、routine-audit 21:00 統一（原同檔三值）、spore-pick / spore-publish 補登 ⏸️ PAUSED（5/28 起 scheduler 層 disabled 但本檔列 active 達 15 天，上游持續 defer 給死 routine 的根因）(2) cron 數值單一出現點：yaml spec 區塊 + 週行程 grid 不再複寫 cron (3) spore-publish gate 方向修正（本檔寫 ≥8.0、pipeline 實為 ≤3）+ spore-pick HG 清單改 pointer（本檔停 HG9、pipeline 已 HG10）(4) babel Opus→Sonnet（orchestrator 工作；連 2 cycle gate fail 升回）(5) 新 §Routine 完成義務：self-fix lane / 三振規則 / OBSERVER-QUEUE (6) mirror registry 更新 16 dirs + feedback-triage taskId 命名例外記錄 (7) routine-sync-check「待寫」改已存在 + 缺口清單。觸發：哲宇 callout「routine 都在往下丟沒做完」+ 兩週體檢 [reports/flywheel-evolution-2026-06-12.md](../../reports/flywheel-evolution-2026-06-12.md)。_

_v2.2 | 2026-05-12 19:30 +0800 2026-05-12-184800-routine-v2-resync session — 加 11th routine `twmd-spore-harvest-am` daily 07:00 full-auto Chrome MCP harvest_
_v2.2 改動：(1) §11 條核心 routine 排程表 從 10 條 → 11 條（加 `twmd-spore-harvest-am` row 排在 refresh-am 06:00 之後、maintainer-am 09:00 之前，morning chain 中段 07:00 槽位）(2) §每週行程表 ASCII grid 加 `S` 符號 + legend entry「S = twmd-spore-harvest-am (opus, Chrome MCP harvest D+1-D+7 OVERDUE)」+ 「白天 morning chain」描述更新為 `a (06h) → S (07h) → M (09h)` 完整 chain (3) §每條 routine 規格 新增 `### TWMD spore harvest (am)` 薄殼 spec（嚴格 ≤ 25 行 prompt，業務邏輯 pointer 回 SPORE-HARVEST-PIPELINE.md，仿 weekly-report-sun / distill / self-evolve 範式）(4) 新 routine note² 引 SPORE-HARVEST-PIPELINE.md §Routine 整合 v2.2 full-auto 為對應 canonical (5) 同步來源 mirror layer 加 `twmd-spore-harvest-am/SKILL.md` entry。_
_v2.2 觸發：哲宇 2026-05-12 `/twmd-routine` 「幫我完整整理 harvest spore pipeline，自動 chrome mcp -> 然後每天早上七點觸發 Full-auto harvest routine」+ 中途校正「邏輯跟步驟都要去 pipeline 裡，不要寫在 routine」+「pipeline 要照前幾天整理 report 的標準寫」。對應 SPORE-HARVEST-PIPELINE.md v2.0 → v2.2 加 §Routine 整合 spine-pattern 標準化 section。_
_對應 canonical：MANIFESTO §薄殼鐵律（spec ≤ 25 行 + business logic pointer 回 pipeline）+ REFLEXES #26 v2（AI 自主 harvest 邊界）+ REFLEXES #54（routine 飛輪 11 條 SSOT）+ ROUTINE v2.1 main-direct（spore-harvest 同樣 direct push main，不開 PR）。_

_v2.1-resync | 2026-05-12 18:48 +0800 2026-05-12-184800-routine-v2-resync session — SSOT 從 v1.3 推回 v2.1 對齊 live MCP + mirror_
_resync 觸發：哲宇「奇怪我記得昨天我們也有把 routine 都調整到半夜⋯⋯你看我們本機的設定那才是對的」。Audit 揭露 3-layer drift：MCP scheduled-tasks live ✅ v2.0 main-direct（10 條全整點 chain）/ `.claude/scheduled-tasks/*/SKILL.md` mirror ✅ v2.0 / `docs/semiont/ROUTINE.md` SSOT ❌ 卡 v1.3。Root cause：PR #1037 ROUTINE v2.0 main-direct 2026-05-11 22:13 開但 CONFLICTING 被 close（cranky-newton memory §PR backlog 收割 line 48），dangling commits `c74176555` + `378f938d1` 跑完 mirror + live sync 但 SSOT 沒進 main。修復：`git cherry-pick c74176555 378f938d1`（MAINTAINER-PIPELINE conflict 手動 reset 到 HEAD — main 已升 v2.0 spine 是好進化，不衝突 v2.0 main-direct routine 模型；MAINTAINER §collect-and-merge A 路徑廢棄屬 separate concern 另開 PR）。本 commit 含完整 ASCII 每週行程表 + 10 條整點 cron + 5-stage main-direct lifecycle + 不提預算鐵律。對應 REFLEXES #38（SSOT drift silent killer，第 N 次驗證）+ REFLEXES #52（routine-sync-check.py 沒抓 cron expression / enabled state drift，tool gap 待補）_

_v2.1 | 2026-05-11 22:30 +0800 ecstatic-archimedes-112344-v5 session — `defaultMode: bypassPermissions` ship_
_v2.1 改動：`~/.claude/settings.json` 加 `permissions.defaultMode: "bypassPermissions"` — routine 全 act without asking 不卡 prompt。觸發：哲宇 2026-05-11 觀察「全部的 routine 都幫我調整成 act without asking → 不然會卡在問 permission 然後就當機在那」。Deny list 16 條 hard block 仍 active（不問也擋）。Affect range：global settings → all Claude sessions (routine + plain) 都 bypass prompts；trust level 跟 v2.0 main-direct 接受一致。_

_v2.0 | 2026-05-11 21:00 +0800 ecstatic-archimedes-112344-v4 session — Main-direct mode + 整點對齊半夜 chain_
_v2.0 重大架構 pivot（哲宇 2026-05-11 兩條 directive）：_
_(1) **整點對齊 + 半夜不碰撞 chain**：除 refresh-am (06:00) + maintainer-am (09:00) 兩條白天 routine，其餘 8 條全移半夜整點 chain — 22:00 babel → 23:00 refresh-pm → 00:00 rewrite → 01:00 news-lens (Sun) → 02:00 weekly-report (Sun) → 03:00 distill (Sun) → 04:00 self-evolve (Sun) → 05:00 maintainer-pm。每條間隔整 60 min（遠超 ≥ 40 min 硬規則），cron 分鐘一律 `0`（整點），system 自動加 3-9 min jitter。_
_(2) **Main-direct mode**：所有 routine 取消 PR + maintainer §collect-and-merge cycle，跑完 quality_gate 通過直接 `git commit + git push origin main`。原 PR 模式累積 ~12 hr 延遲是冗餘審計層 — quality_gate + pre-commit hook + post-commit CI 三層仍保護。MAINTAINER §collect-and-merge A 路徑 routine PR collection 廢棄，B 路徑 contributor PR review 變主流程。_
_(3) **不提預算鐵律**：routine prompt / yaml 一律禁止寫「wall-clock 上限」「budget」「timeout > X min」「partial PR」等任何形式的預算詞。routine 自然跑完，escalation 只看 quality_gate 結果，不看時間。_
_(4) **Lifecycle 6-stage → 5-stage**：去掉 Stage 2 Branch（不開 feature branch），Stage 4 Ship 改為 main commit + push（原本 PR create）。_
_(5) **settings.json deny**：移除 6 條 plain push main/master deny，保留 6 條 force variants。Plain Claude session 同 routine 都允許 plain push main。_
_(6) **mirror layer**：10 個 mirror SKILL.md cron + Stage 2/4 + 鐵律 全 sync v2.0。_

_v1.3 | 2026-05-11 20:00 +0800 ecstatic-archimedes-112344-v3 session — 半夜重排_
_v1.3 改動：3 條日線 routine cron 全部移至半夜時段（哲宇 2026-05-11 「把深度改寫文章那個 routine 改到半夜，還有 refresh 的也是」）— (1) `twmd-rewrite-daily` 16:16 → 02:34 (2) `twmd-data-refresh-am` 06:04 → 04:14 (3) `twmd-data-refresh-pm` 18:04 → 00:33。Cadence chain 重設計：babel 22:22 → refresh-pm 00:33 → rewrite 02:34 → refresh-am 04:14 → maintainer-am 09:07（每條間隔 ≥ 1.5 hr，maintainer-am 收割 5-7 hr 後 CI green PR backlog 比舊版 3 hr gap 更健康）。SSOT + 3 mirror + 3 scheduled-tasks 三處同步 verified（routine-sync-check ok=10 / 0 drift）_

_v1.2 | 2026-05-11 11:23 +0800 ecstatic-archimedes-112344 session_
_v1.2 改動（MANIFESTO §薄殼鐵律 v1.7 升 canonical 後的全層 routine refactor）：(1) 9 條 routine prompt 全部 inline Stage 步驟 → pointer 回對應 pipeline canonical (2) §collect-and-merge SOP 升 [MAINTAINER-PIPELINE §collect-and-merge canonical](../pipelines/MAINTAINER-PIPELINE.md) — ROUTINE.md 改純 pointer (3) §Routine 收官鐵律 finale 分流邏輯 → pointer 回 `.claude/skills/twmd-finale/SKILL.md` (4) §權限 bypass JSON 範例 → pointer 回 `~/.claude/settings.json` SSOT，本檔只留架構摘要 (5) `.claude/scheduled-tasks/twmd-*/SKILL.md` 9 條 thick mirror 重寫為 thin shell（仿 weekly-report-sun 19-line 範式），總 491 行 drift inline 刪除 (6) 新工具 `scripts/tools/routine-sync-check.py` 接管 SSOT vs mirror drift 檢測（per REFLEXES #52 fail-loud，line 30 warn / 50 hard 兩階閾值）_
_v1.2 觸發原因：哲宇 2026-05-11 ecstatic-archimedes session 將「薄殼」原則升 MANIFESTO §進化哲學 v1.7，明確「禁止 inline 行數 / 內容 / 步驟」+「需要時完整讀取被指向檔案」。Audit 揭露 9/10 mirror + 5 處 ROUTINE.md 主檔違反鐵律。Drift 證據已 surface（LESSONS-INBOX 2026-05-10 twmd-babel-nightly auto-merge policy 不同步）。哲宇授權「最嚴格標準完整修復」_

_v1.1 | 2026-05-10 12:30 +0800 gracious-blackwell-explore-page session_
_v1.1 改動：(1) maintainer 1d 一次 → 一天兩次（am 09:07 + pm 21:07）(2) 新增 §collect-and-merge SOP — maintainer 是 routine PR backlog 的 SSOT 收割者，其他 routine 不 auto-merge 自己的 PR (3) Stage 4 ship policy 收緊 — 只有 maintainer 自己可以 auto-merge，其他 routine 開 PR 即收工_
_v1.1 觸發原因：哲宇觀察到 cron routine 開的 PR (#983 self-evolve / #976 maintainer memory) 累積成 open backlog，drift 風險：每條 routine 自己跑 merge 邏輯複寫 hard gate 6 處 + CI 還沒跑完就 merge 賭博風險。maintainer 集中收割 = 指標 over 複寫 + 統一 hard gate canonical_

_v1.0 | 2026-05-09 14:55 +0800 laughing-goldstine post-finale 第三輪_
_誕生原因：哲宇「排定 routine + ROUTINE.md SSOT + DNA 紀錄 + 機器飛輪 long-term goal + TWMD 前綴」_
