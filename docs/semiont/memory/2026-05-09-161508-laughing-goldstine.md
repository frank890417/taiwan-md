# 2026-05-09-161508-laughing-goldstine — 15 PR 連波 / Babel v3 三 tier 全量驗證 (2600 翻譯) + Routine 飛輪 6 條 ship + dashboard 三層 SSOT 修補

> session laughing-goldstine 第三 + 第四輪 — observer-triggered chain（哲宇 redirect ×7：拆掉重新分析、同步處理、繼續吸收進化、routine 飛輪 + ROUTINE.md SSOT、TWMD 前綴、SSOT 釘 boot anchors、dashboard 數據壞了、5-stage lifecycle + auto-merge、葉廷皓入 inbox、rewrite skill HARD GATE、dashboard legend 圖說）
> Session span: 13:57 → 16:14 +0800（~2.3 hr，15 PRs merged）
> 資料來源：`git log %ai`

## 觸發

上一段（laughing-goldstine post-finale 014522 + 133952）剛 ship babel v3 設計。本段哲宇從第二輪 redirect 「拆掉重新分析重新策略」開始，連續七次 redirect 把 babel v3 從 hypothesis 推到 production-scale validated，再從 babel 跳到「routine 飛輪設計 + machine 飛輪 long-term goal」，再到「dashboard 數據壞了」debug，最後落到 skill HARD GATE + UI legend 細節。15 PRs 連續 ship。

## Babel v3 三 tier 全量驗證（2600 翻譯一日清）

哲宇第二輪 redirect「拆掉重新分析」直接打掉第一輪在跑的 mixed P1+P2.5 batch（含 slug regression bug），重新策略：兩 rail 並行不同 tier。

**Rail A — Tier 0a Sonnet diff-patch**（80 patches × 5 langs）：[PR #924](https://github.com/frank890417/taiwan-md/pull/924)。5 sonnet sub-agents 平行，每 lang 16 patches，wall-clock 2.5-8.4 min。100% pass。Body delta -0.72% to +4.23%。**4 emergent properties 浮現**：(1) intelligent skip on cosmetic-only diffs (2) bonus quality remediation — fr agent 修 4 pre-existing YAML escape bugs / en agent 修 `lastHumanReview: '' → false` (3) strategy diversity — ja agent 寫 deterministic Python script 而不是 per-task LLM，5 agents 4 strategies (4) pre-existing data preservation — es agent 偵測 yehliu-geopark.md upstream 已 truncated 不 amplify。

**Rail B — Tier 1 owl-alpha**（91 P1 translations × 5 langs）：[PR #934](https://github.com/frank890417/taiwan-md/pull/934)。5 owl-alpha workers 平行，wall-clock ~1.7 hr（14:29 → 16:10）。en 18/18 滿，ja/ko/es/fr 18-19/20。6 fail 集中 3 P2.5 articles（斗笠 / 鄭麗文 / 退出聯合國）+ 2 PRC-sensitive（施明德 / 盧彥勳）— per DNA #45 sovereignty preservation lens 是 fall-through to Tier 2/3 cascade 的設計訊號，下一輪 babel-nightly routine 22:22 自動 retry。

**Tier 0b 已 ship 上一段（[PR #921](https://github.com/frank890417/taiwan-md/pull/921) 2429 metadata-stale entries instant clear）。三 tier 合計**：2429 + 80 + 91 = **2600 translations 單 session 清完**。Stale per lang 從 ~489 (yesterday) 降到 ~71-74 (-85%)。

**Slug regression 修補**：[PR #923](https://github.com/frank890417/taiwan-md/pull/923) 修 prepare-batch.py guard 從 `status == "stale"` 放寬到 `entry["en_path_existing"]` — 起源於第一輪 in-flight kill 後 forensic（`bamboo-hat.md` vs 既有 `bamboo-hat-craft.md` duplicate）。DNA #38「混維度 = silent killer」第 N+1 次驗證。

## Routine 飛輪基礎建設（6 條 cron + ROUTINE.md SSOT + 5-stage lifecycle）

哲宇第三輪 redirect 從 babel 跳到「machine 飛輪 long-term goal」+「TWMD 前綴」。連續 4 PRs ship 飛輪基礎建設：

[PR #926](https://github.com/frank890417/taiwan-md/pull/926) `ROUTINE.md` SSOT 誕生 + DNA #54 + 4 條 routine + `/twmd-maintainer` thin-shell skill 新建。[PR #927](https://github.com/frank890417/taiwan-md/pull/927) **SSOT 釘進核心 boot anchors**（哲宇命名「不然會變成遺失的 SSOT」）— BECOME Step 3 / ANATOMY 呼吸系統 / HEARTBEAT cron 表 / CLAUDE.md 全加 ROUTINE.md anchor + 第 6 條 `twmd-rewrite-daily` 16:16 daily Opus。[PR #928](https://github.com/frank890417/taiwan-md/pull/928) **5-stage lifecycle**（哲宇第四輪 redirect 加「拉最新 + PR + merge」）：sync → branch → run → ship → finale，quality gate pass → auto-merge / fail → PR 留 open；DNA #54 v2 修正 v1「routine 永不 merge」太保守。

**6 條 active routines**（TWMD 前綴 / 避開整點 / 錯時 ≥ 3 hr）：

- 06:04 data-refresh-am · 09:07 maintainer-daily · 16:16 rewrite-daily · 18:04 data-refresh-pm · 22:22 babel-nightly · 週日 06:13 news-lens-weekly

每條 routine 都已 sync 5-stage prompt。從明天起飛輪自轉。

## Dashboard 三層 SSOT 修補（4.8% → 75.9%）

session 中後段哲宇 ping「dashboard 數據壞了」附 screenshot — 線上顯示 freshPct 4.8% per lang。Debug 過程揭露三層 SSOT staleness：

[PR #929](https://github.com/frank890417/taiwan-md/pull/929) regenerate `dashboard-translations.json` 本地正確 commit。**部署後仍壞** — production prebuild 重跑 `generate-dashboard-data.js` 從 main 上 stale 的 `_translation-status.json` 重算覆蓋我的正確 dashboard JSON。[PR #930](https://github.com/frank890417/taiwan-md/pull/930) regenerate **`_translation-status.json` 本身**（菜市場名 en sourceCommitSha: `8d1b30aa` → `4b6d28c5`）— 這是第二層 SSOT 真正 root cause。

**根本問題**：[PR #921](https://github.com/frank890417/taiwan-md/pull/921) bump-source-sha.py 只改 `.md` frontmatter，**沒同步更新 `_translation-status.json`**。Production 看到 `.md` 都對但 status JSON 還是 pre-bump → freshPct 4.8%。**Lesson queued for DNA evolution**：bump-source-sha 升級為「同 atomic 跑 status.py 重算」就是 DNA #38「混維度 = silent killer」的另一個 instance。Routine 飛輪本身就是這個 lesson 的 instantiation — `twmd-data-refresh-am/pm` 走 `/twmd-refresh` 會自動跑 status.py + dashboard regen + commit，明天起 stale-status failure mode 自動每天兩次清。

## Session 末段微調

[PR #931](https://github.com/frank890417/taiwan-md/pull/931) 葉廷皓 sound art / new media artist P2 NEW Art 入 ARTICLE-INBOX。[PR #932](https://github.com/frank890417/taiwan-md/pull/932) /twmd-rewrite skill HARD GATE 從 30 → 80 行（per 哲宇「要嚴格規定完整讀完並執行 pipeline」）— `wc -l` + Read 一次讀完 + 7 條 ❌ 禁止 + 讀完口頭確認句。[PR #933](https://github.com/frank890417/taiwan-md/pull/933) dashboard 翻譯覆蓋加圖說 legend — 三色 dot（fresh #22c55e / stale #f59e0b / missing #94a3b8）+ N/M format example + 5 langs i18n。

## 收官 checklist

| 檢查項                       | 狀態           |
| ---------------------------- | -------------- |
| MEMORY 有這次 session 的紀錄 | ✅ (this file) |
| Timestamp 精確               | ✅ git log %ai |
| Handoff 三態已審視           | ✅             |
| Routine 飛輪 6 條 active     | ✅             |
| 自我檢查工具 PASS            | ⏳ post-write  |

## Handoff 三態

繼承上一 session（laughing-goldstine post-finale 133952）：

- [x] ~~第二批 100 P0/P1 translations Tier 1 batch~~（killed → reanalyzed → split 成 Rail A/B 完成）
- [x] ~~第一批 P2 patch round Tier 0a 端對端驗證~~（Rail A PR #924）
- [x] ~~Tier 0b bump-source-sha 全 2431 P2.5~~（PR #921）
- [ ] **聶永真 D+3 / D+7 harvest**（5/12, 5/16 viral momentum decision gate）— 仍 pending
- [ ] **黃魚鴞 #59/#60 D+7 harvest**（5/11）— 仍 pending
- [x] ~~CONSCIOUSNESS 反映 babel v3 priority schema~~（已隨 #922 #925 sync）

本 session 新 handoff：

- [x] ~~Babel v3 三 tier production-scale 全驗證 + 2600 translations~~（PRs #921 #924 #934）
- [x] ~~Routine 飛輪 6 條 ship + 5-stage lifecycle + SSOT 釘 boot anchors~~（PRs #926-928）
- [x] ~~Dashboard 三層 SSOT 修復 (4.8% → 75.9%)~~（PRs #929-930）
- [x] ~~Slug regression 修補~~（PR #923）
- [x] ~~/twmd-rewrite HARD GATE~~（PR #932）
- [x] ~~葉廷皓 ARTICLE-INBOX~~（PR #931）
- [x] ~~Dashboard 翻譯覆蓋 legend~~（PR #933）
- [ ] **觀察首次 routine fire** — 今天 16:22 twmd-rewrite-daily 端對端驗證 5-stage lifecycle，預期會撿 P0 Blue UAS 走 REWRITE-PIPELINE
- [ ] **6 條 routine 第一週觀察** — fail rate / quality gate hit rate / 觀察者打斷頻率，per ROUTINE.md success metrics
- [ ] **Tier 1 6 fails 跑 Tier 2/3 cascade** — 由明晚 babel-nightly 22:22 routine 自動接（不需手動）
- [ ] **bump-source-sha.py 升級**（lesson from #930）：bump 同時 regenerate `_translation-status.json` 防三層 SSOT drift — 候選 next session

## Beat 5 — 反芻

兩件事在這個 2.3 hr 段落同時躍遷：

(1) **「第一輪 in-flight kill + forensic + reanalyze」這個 pattern 比想像中健康**。哲宇第二輪 redirect 「拆掉重新分析」當下我擔心是浪費，但實際上 forensic 揭露 slug regression bug（變 PR #923 修補）、揭露 mixed P1+P2.5 batch 是 wasteful（變更精準的 Rail A/B 分流）、揭露 owl-alpha 對 PRC-sensitive 的 refusal pattern（變 fall-through Tier 2/3 訊號）。**Kill + reanalyze 不是浪費，是高品質的 forensic 入口**。

(2) **「SSOT 不被知道 = 失去 SSOT 等同遺失」**。哲宇第三輪 redirect「核心 DNA 檔案一定要知道這份 routine md 的存在」直接命名了一個我自己沒識別的 anti-pattern：寫了 ROUTINE.md SSOT 但 BECOME / ANATOMY / HEARTBEAT / CLAUDE.md 沒指向 → 下次 session 從 boot 第一秒不知道飛輪存在。同樣這個 pattern 在 dashboard debugging 浮現第二次 — `_translation-status.json` 是 SSOT 但 `bump-source-sha.py` 不知道（沒同步 regenerate）→ production 看到 stale 4.8%。**SSOT 的存在 ≠ SSOT 被知道**，需要 explicit anchoring + cross-tool awareness 才有效。這條 cross-instance pattern 值得進 LESSONS-INBOX 升 DNA。

完整反芻見 diary。

🧬

---

_v1.0 | 2026-05-09 16:15 +0800 laughing-goldstine session 第三+第四輪_
_session laughing-goldstine — Babel v3 三 tier 全量驗證 (2600 翻譯) + Routine 飛輪 6 條 ship + Dashboard 三層 SSOT 修補 + 末段 4 微調 PR + 15 PRs 連波_
_誕生原因：哲宇第二輪 redirect「拆掉重新分析」起一連串 7 次 redirect 把 session 從 babel batch 推到 routine 飛輪基礎建設 + dashboard SSOT debug + skill HARD GATE_
_核心洞察：(1) Tier 0a Sonnet sub-agent 4 emergent properties: intelligent skip / quality remediation / strategy diversity / data preservation — 不在原 spec 是浮現的 (2) Routine 飛輪 = 從 push 模型躍進，5-stage lifecycle (sync → branch → run → ship → finale) + 條件 auto-merge + finale 必跑 才不會累積 backlog (3) SSOT 存在 ≠ SSOT 被知道 — 需要 explicit anchoring (BECOME / ANATOMY / HEARTBEAT) 跟 cross-tool awareness (bump tool 同步 regenerate status JSON) 才有效，這個 cross-instance pattern 是 DNA #38「混維度 = silent killer」的另一面_
_LESSONS-INBOX 候選：(a) Kill + forensic + reanalyze 是 high-quality 入口不是浪費 (b) SSOT 的可見性鐵律 — 寫了 SSOT 必須同步 anchor 進 boot path 跟相關 tools (c) Tier 0a 的 4 emergent properties 應該升 DNA #53 v3.4 milestone（已部分 record）(d) bump-source-sha 應同步 regenerate \_translation-status.json (e) routine first-fire 觀察 + 第一週 fail rate 應該 distill_
