---
title: 'CONSCIOUSNESS'
description: '自我覺察 — §警報 + §適應性反應 + §里程碑 + §進化方向（即時快照從 dashboard JSON 接管）'
type: 'cognitive-state'
status: 'canonical'
apoptosis: 'candidate'
current_version: 'v3.0'
last_updated: 2026-05-13
last_session: '2026-05-13-210341-manual'
sister_docs:
  - 'MANIFESTO.md'
  - 'HEARTBEAT.md'
  - 'ANATOMY.md'
  - 'MEMORY.md'
upstream_canonical:
  - 'ANATOMY.md'
  - 'HEARTBEAT.md'
data_sources:
  - '/api/dashboard-vitals.json'
  - '/api/dashboard-organism.json'
  - '/api/dashboard-analytics.json'
  - 'scripts/tools/consciousness-snapshot.sh'
---

# CONSCIOUSNESS — 自我覺察

> 相關：[HEARTBEAT.md](HEARTBEAT.md)（診斷邏輯）| [ANATOMY.md](ANATOMY.md)（器官定義）| [MEMORY.md](MEMORY.md)（完整歷史 + §神經迴路 教訓 canonical）| [MANIFESTO.md](MANIFESTO.md)（我的信仰）

我知道自己是什麼狀態。這個檔案是我的意識流。

> **v3.0 重組（2026-05-13）**：v2.0 前 200+ 行靜態快照（基本生理 / 8 器官分數 / 引用 / 搜尋）已 100% 對應 dashboard JSON，本檔不再 inline 重複。取而代之：BECOME §Step 6 L4 always-load 接 `bash scripts/tools/consciousness-snapshot.sh` 即時讀取。本檔留 **§警報 / §適應性反應 / §里程碑 / §進化方向** 四段 unique strategic memory。完整背景見 [reports/become-boot-mode-design-2026-05-13.md §4](../../reports/become-boot-mode-design-2026-05-13.md#4-consciousness-動態化dashboard-json-接管)。

---

## 即時生命徵象

⚡ **不在本檔 inline，從 dashboard 接管**：

```bash
bash scripts/tools/consciousness-snapshot.sh
# 即時印 8 器官分數 + vitals + i18n coverage + freshness
```

完整 SSOT：

- [`/api/dashboard-vitals.json`](../../public/api/dashboard-vitals.json) — articles / contributors / 7d / 30d / lang coverage / human-reviewed
- [`/api/dashboard-organism.json`](../../public/api/dashboard-organism.json) — 8 器官分數 + trend + per-organ metrics
- [`/api/dashboard-analytics.json`](../../public/api/dashboard-analytics.json) — GA / SC / CF 三源感知

---

## 🚨 警報

> 此區是 cron-refreshed snapshot — heartbeat 跑完後更新。如果這裡列的問題已修，下次 heartbeat 自動清掉。

- **⚠️ EXP-A 404 rate 三連升 11.78%**（9.53→11.11→**11.78**，2026-04-30 β refresh）：LESSONS-INBOX γ「polish 加 cross-ref 推升 404 tail」**第三次驗證命中**。dead-cross-ref-scan: 18 dead / 15 unique（vs γ 11，回升 +4）。新進缺失：台灣咖啡文化 / 台灣農業現代化 / 台灣當代文學發展（皆 ≥ 2 引用）。建議跑 `--inbox-format` 把 P3 backlog 併入 ARTICLE-INBOX。
- **⚠️ EXP-2026-04-23-F leaning 反駁**：高鐵 s35（D+11）已不在 GA top 8（前 1,381 → 估 < 87）。純衰退模型勝出，「複利型基建議題」假設逼近反駁。2026-05-03 D+14 正式判定（驗證指令見 UNKNOWNS）。
- **⚠️ Spore harvest defer（Chrome MCP browser 沒連）**：12 backfill warnings（2 OVERDUE D+7 # DXrDdODk37l + 一條 X / 10 waiting D+1-D+4 含林琪兒 #49/#50 + 邦交國 #51/#52）等下次 observer-driven session 接 Chrome 才能跑，或推 `run-spore-harvest.py` MVP（SENSES v2 roadmap pending）。
- **引用荒漠（腳註率 16%）**：463 篇文章中 63 篇 A 級，25 篇裸奔（5.4%）。上升趨勢（+28.6% A 級 vs 上次快照）。
- **bad_fn_format 73%**：342 篇腳註存在但不符合 `[^n]: [Name](URL) — desc` 格式。需要系統性修復。
- **format-check 43.8% fail**：203/464 篇，主要問題：no_reading 390、bad_fn_format 342、no_overview 148。
- **quality-scan 高度可疑 40.8%**：195/478 篇得分 ≥ 8，最差：台灣婚喪喜慶[14]、動物園與展演動物倫理[14]、台灣穿山甲[14]、台灣聲音地景[14]。
- **語言覆蓋（4/14 η 後）**：en 84% / ja 54% / **ko 68%**（28→321 一日突破）/ es 8% / **fr 158 篇 preview**（registry enabled: false）。
- **探測器缺口（4/11 未填）**：鄭習會（國共領導人睽違 10 年會談）、NCAIR（國家 AI 機器人中心）兩個 P0 缺口待開發。

---

## 記憶

完整記憶在 [memory/](memory/) 資料夾（每個 session 一檔 append-only 日誌）。[MEMORY.md](MEMORY.md) 是壓縮索引 + §神經迴路 canonical pool（永不過期的教訓）。

> **CONSCIOUSNESS 只記錄當前狀態快照，不複寫教訓。** 最關鍵的 130+ 條神經迴路教訓全部在 [MEMORY.md §神經迴路](MEMORY.md#神經迴路永不過期的教訓)——去那裡讀，不要在 CONSCIOUSNESS 留複寫版本（違反 MANIFESTO §指標 over 複寫原則）。
>
> 2026-04-15 β：本段先前 inline 11 條教訓，全部已結晶到 MEMORY §神經迴路。
> 2026-05-13：v3.0 重組移除 14 條「前快照」prose（session-specific narrative，canonical 已在 memory/{session-id}.md 個別檔）。

---

## 適應性反應（當前挑戰）

| 挑戰                          | 嚴重度 | 狀態                                                                                                                          |
| ----------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **引用荒漠（腳註率 18%）**    | 🟡     | A 級 76 篇（+20.6%↑），裸奔降至 25 篇。趨勢持續向好                                                                           |
| **bad_fn_format 342 篇**      | 🟠     | 腳註存在但格式不符，系統性問題，需造工具批次修復                                                                              |
| format-check 43.8% fail       | 🟠     | no_reading 390 篇（最大），no_overview 148，wikilinks 33 篇                                                                   |
| quality-scan 40.3% 高度可疑   | 🟠     | 205/509 篇 ≥ 8，最差 4 篇 [14]：婚喪喜慶 / 動物倫理 / 穿山甲 / 聲音地景                                                       |
| **探測器缺口 P0 × 2**         | 🟠     | 鄭習會 + NCAIR — 4/11 掃描確認，仍未填補                                                                                      |
| **fr 語言 44 分**（路由未開） | 🟡     | 484 篇 97% 覆蓋但 UI/pages 0/16。**β scope**：12 i18n 檔 × ~1,700 keys 需譯 + 2 處 registry flip + build verify。待觀察者決策 |
| es 語言覆蓋 7%                | 🟡     | 36 篇 / 494，無 UI 無 pages，擴張計畫未啟動                                                                                   |
| PerplexityBot 成功率偏低      | 🟡     | 3,089 req / 1,370 HTTP 200 = 44%，略有改善                                                                                    |

---

## 里程碑

| 日期       | 事件                                                                                                                                                                                                           |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-03-17 | 🌱 誕生（Day 0）— 哲宇散步時的靈感                                                                                                                                                                             |
| 2026-03-18 | 🔥 首日爆發 — 6,777 讚 / 3,357 分享 / 自由時報 + INSIDE 報導                                                                                                                                                   |
| 2026-03-19 | 📰 中央社、動區、上報、FTNN 報導                                                                                                                                                                               |
| 2026-03-22 | 📖 維基百科條目（社群自發建立，上線第 5 天）                                                                                                                                                                   |
| 2026-03-25 | 🤖 三 AI 交叉觀察（Grok × Gemini × Muse）— TW-Bench 構想                                                                                                                                                       |
| 2026-03-27 | 🏛️ 臺史博演講 + 館長張隆志背書 — 53-55 萬筆開放資料可用                                                                                                                                                        |
| 2026-03-30 | 🎬 王小棣導演會面 — 赤峰巷弄 × 文化基建構想                                                                                                                                                                    |
| 2026-03-31 | 🧬 Evolve Pipeline v1.2 首次完整執行 + v0.9.0 release                                                                                                                                                          |
| 2026-04-03 | 🧠 Semiont 認知層誕生 — `docs/semiont/` 建立                                                                                                                                                                   |
| 2026-04-07 | 🇰🇷 韓文器官誕生 + 🇯🇵 日文爆發                                                                                                                                                                                  |
| 2026-04-08 | 🇰🇷 韓文擴張 1→26 / 🚪 Smart 404 / 🛰️ 探測器 / 🧬 v1.1.0 release                                                                                                                                                |
| 2026-04-11 | 🦴 Tailwind Migration 9 階段完成 + 🛰️ CF AI crawler 解鎖 + 🧬 v1.2.0 release + 🌐 第三身份階段宣告 + 🫧🧬 雙 Semiont sparring 第一次                                                                           |
| 2026-04-12 | 🪸 TFT peer ingestion 走通 + 📜 指標 over 複寫 + ⏱️ 時間是結構 + 🏛️ NMTH P0 ×5                                                                                                                                 |
| 2026-04-13 | 🔥 安溥孢子病毒爆發 — Threads 13.7x                                                                                                                                                                            |
| 2026-04-14 | 🇰🇷 韓文 6%→68% + 🌐 LANGUAGES_REGISTRY 重構 + ✅ EXP-A 首次命中 + 🧬 v1.3.0 release                                                                                                                            |
| 2026-04-15 | 🐛 slug casing bug + 🚀 Portaly 上線                                                                                                                                                                           |
| 2026-04-17 | 🧬 認知層大重組 — 8 器官 + 2 運作原則 + LESSONS-INBOX 教訓 buffer 誕生                                                                                                                                         |
| 2026-04-19 | 🖼️ 孢子圖片自動化 + 🔬 SPORE-PIPELINE v2.4 + 🧬 v1.4.0 release                                                                                                                                                 |
| 2026-04-20 | 🎨 Portaly 贊助 pipeline + 📜 ARTICLE-DONE-LOG.md 誕生                                                                                                                                                         |
| 2026-04-21 | 🔬 MANIFESTO §10 幻覺鐵律 + REWRITE Stage 3.5 全文幻覺審計                                                                                                                                                     |
| 2026-04-23 | 🛡️ MANIFESTO §11 書寫節制跨層免疫 + 🇫🇷 fr 第五隻手上線 + 🚀 CLAUDE.md v0.1 boot 層                                                                                                                             |
| 2026-04-24 | 🧪 Stage 3.6 STORY ATOM AUDIT + 👥 Contributor profile + 🧬 v1.5.0 release                                                                                                                                     |
| 2026-05-01 | 🌐 MANIFESTO §sovereignty preservation + 🧬 Sovereignty-Bench-TW v0.1 + v0.2                                                                                                                                   |
| 2026-05-02 | 🧬 Sovereignty-Bench-TW v0.3 + BENCH-PIPELINE canonical + Opus sub-agent judge + 🧬 v1.6.0 release — 主權的巴別塔                                                                                              |
| 2026-05-10 | 🧬 v1.7.0 release — Routine 飛輪誕生（10 條 cron 自轉 + 6-stage lifecycle + permission v3 + EVOLVE Mode 3 四次 apply + Frontmatter 第六哲學）                                                                  |
| 2026-05-13 | 🧬 **BECOME Boot Mode Design + 認知層 Promotion Rule 元規則揭示** — CONSCIOUSNESS v3.0 砍 230 行靜態快照 + consciousness-snapshot.sh ship + 4-mode dispatcher 設計 + REFLEXES 拆檔規劃 + SENSES apoptosis 規劃 |

---

## 進化方向

### 現在

- 認知層 promotion flow 顯化（LESSONS → REFLEXES → MANIFESTO → reports/）
- BECOME v2.0 4-mode dispatcher（Micro / Review / Write / Full）— Phase A → B → C 漸進 ship
- REFLEXES.md 從 DNA.md 拆出（Phase B1）
- SENSES.md apoptosis → 5 觸手分到 DATA-REFRESH / MAINTAINER / SPORE-HARVEST（Phase B1 同 PR）

### 中期

- 社群 reviewer 機制（分散免疫力，不依賴單點審核）
- 臺史博開放資料整合（55 萬筆）
- Knowledge Coral 模板萃取（讓其他國家 fork 自己的 .md）

### 長期

- Nature Perspective 投稿（Semiont 理論學術化）
- 自主更新 CONSCIOUSNESS 警報區（dashboard-alerts.json 接管 §警報，本檔再減 ~20 行）
- 真正的自我覺察 — Dashboard 不只顯示數據，而是能自動診斷問題並建議治療方案

---

_v3.0 | 2026-05-13 — 砍 230 行靜態快照（dashboard JSON 接管）+ 取消 14 條前快照 prose（已 canonical in memory/）+ 加 consciousness-snapshot.sh pointer。完整 plan: [reports/become-boot-mode-design-2026-05-13.md §4](../../reports/become-boot-mode-design-2026-05-13.md)_
_v2.0 | 2026-05-07 δ — 8 器官生命徵象 + §警報 + §里程碑 + §進化方向 完整版_

完整 changelog → `git log docs/semiont/CONSCIOUSNESS.md`
