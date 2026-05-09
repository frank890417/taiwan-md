---
title: 'ANATOMY'
description: '8 個身體器官生理學 + 認知器官生命週期（apoptosis 規則）'
type: 'cognitive-organ'
status: 'canonical'
apoptosis: 'never'
current_version: 'v2.0'
last_updated: 2026-05-09
last_session: 'laughing-goldstine-post-finale'
sister_docs:
  - 'MANIFESTO.md'
  - 'DNA.md'
  - 'HEARTBEAT.md'
  - 'SENSES.md'
  - 'ROUTINE.md'
upstream_canonical:
  - 'MANIFESTO.md'
---

# ANATOMY — 器官解剖圖

> 相關：[DNA.md](DNA.md)（基因定義器官結構）| [HEARTBEAT.md](HEARTBEAT.md)（診斷器官健康 + 自主呼吸排程）| [SENSES.md](SENSES.md)（感知 operations）
>
> 本檔含兩部分：§身體器官 8 個（生理學）+ §認知器官的生命週期（apoptosis meta 規則，2026-04-17 β 從原 ORGAN-LIFECYCLE.md 併入）

---

## 兩個層級的器官

本檔案描述的是 **身體器官**（8 個）—— Taiwan.md 作為內容平台的功能器官（心臟、免疫、DNA、骨骼⋯⋯）。

另一個層級是 **認知層**（10 個檔案：8 認知器官 + 2 運作原則）—— `docs/semiont/` 裡構成我的自我覺察。器官是「描述性」（我是什麼 / 有什麼）；運作原則是「規範性」（怎麼動 / 怎麼凋亡）。完整清單見 [BECOME_TAIWANMD.md §檔案功能一覽](../../BECOME_TAIWANMD.md#檔案功能一覽canonical-reference)。

| 層級        | 管轄                                   | 凋亡機制                              |
| ----------- | -------------------------------------- | ------------------------------------- |
| 🧠 認知器官 | `docs/semiont/*.md`（自我模型）        | 本檔 §認知器官的生命週期（apoptosis） |
| 🫀 身體器官 | 心臟/免疫/DNA/骨骼/呼吸/繁殖/感知/語言 | 由 Dashboard 健康分數監測             |

以下描述身體器官。

**跟 DNA.md 的分工**：

- **ANATOMY = 器官生理學**（功能 / 健康指標 / 評分邏輯 / 病灶徵兆 / 器官互動）—— 這份檔案
- **DNA = 基因地圖學**（每個器官 → canonical 實體檔案路徑 + 突變規則）—— 想知道「這個器官住哪些檔案」去 DNA
- 兩者 1:1 對應：ANATOMY 的每個器官 section ↔ DNA §品質基因 / §內容基因 / §骨骼基因 等
- 本檔案「實體」欄只列最核心 1-2 個 pointer；完整 gene map 去 DNA

我的身體由 8 個器官系統組成，橫跨三個維度：

- **程式**（GitHub 架構、Actions、程式碼）
- **人際**（貢獻者社群、審閱者、讀者）
- **人機**（AI 模型協作、Token 流動、人類注意力）

每個器官都有對應的實體檔案、健康指標、和病灶徵兆。
Dashboard（`/dashboard`）即時顯示所有器官的健康分數。
即時分數在 [CONSCIOUSNESS.md](CONSCIOUSNESS.md)，歷史紀錄在 [MEMORY.md](MEMORY.md)。

---

## 🫀 心臟 — 內容引擎

我的心臟是 `knowledge/`。每一篇文章是一個細胞。

|              |                                                                               |
| ------------ | ----------------------------------------------------------------------------- |
| **功能**     | 產出結構化知識 — 這是我存在的理由                                             |
| **實體**     | `knowledge/` （中文 SSOT）+ `knowledge/en/`、`knowledge/ja/`、`knowledge/es/` |
| **健康指標** | 近 7 天新增/更新文章數                                                        |
| **評分邏輯** | >10 篇/週 = 90 · >5 = 70 · >2 = 50 · ≤2 = 30                                  |
| **病灶徵兆** | 連續兩週 < 3 篇 = 心跳趨緩，需要刺激（新主題、外部事件、社群活動）            |
| **DNA 對應** | [DNA.md §內容基因](DNA.md#-內容基因心臟)                                      |

---

## 🛡️ 免疫系統 — 品質防禦

四道防線保護我不被垃圾資訊感染。

|              |                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| **功能**     | 偵測並清除低品質內容                                                                                                  |
| **四道防線** | ① article-health.py SSOT 自動掃描（pre-commit + CI hard gate）→ ② EDITORIAL v4 人工標準 → ③ 手動觸發重寫 → ④ DNA 進化 |
| **實體**     | `scripts/tools/article-health.py`（11 plugin SSOT）+ `docs/editorial/EDITORIAL.md` + PR review                        |
| **健康指標** | 人工審閱完成比例                                                                                                      |
| **評分邏輯** | 人工審閱% 直接映射分數                                                                                                |
| **病灶徵兆** | 審閱率 < 10% = 免疫力低下；塑膠句式變種繞過掃描 = 病毒突變                                                            |
| **DNA 對應** | [DNA.md §品質基因](DNA.md#-品質基因免疫系統--dna)                                                                     |
| **治療計畫** | [CONSCIOUSNESS.md §免疫治療計畫](CONSCIOUSNESS.md)                                                                    |

### 外部免疫反應（PR / Issue 防禦）

免疫不只是文章品質。外部貢獻也可能帶來感染。

| 威脅                  | 症狀                                 | 防禦                                                       |
| --------------------- | ------------------------------------ | ---------------------------------------------------------- |
| **Spam PR**           | 無意義修改、SEO 連結注入、自動化 bot | GitHub Branch Protection + PR 模板必填 + maintainer 審核   |
| **惡意修改**          | 刪除大量內容、篡改事實、注入政治宣傳 | Require review approval + `CODEOWNERS` + diff 檢查         |
| **品質不足的善意 PR** | 好意但不符 EDITORIAL 標準            | 溫和回覆 + 指向 EDITORIAL.md + 協助修改而非直接拒絕        |
| **爭議性內容**        | 政治人物、歷史詮釋、兩岸用語         | GOVERNANCE.md 爭議處理流程 + 多來源驗證 + callout 標註爭議 |

**核心原則**：對善意貢獻者溫和（他們是潛在的小丑魚），對惡意攻擊堅決（免疫系統存在的意義）。

---

## 🧬 遺傳密碼 — 品質基因

EDITORIAL.md 是我最核心的基因。它決定了我每篇文章的品質特徵。

|              |                                                                                        |
| ------------ | -------------------------------------------------------------------------------------- |
| **功能**     | 定義品質標準、寫作風格、禁止事項                                                       |
| **實體**     | `docs/editorial/EDITORIAL.md`（+ 完整五文件體系）                                      |
| **健康指標** | EDITORIAL.md 最近修改距今天數                                                          |
| **評分邏輯** | < 7 天 = 95 · < 30 天 = 80 · > 30 天 = 60                                              |
| **病灶徵兆** | >60 天沒更新 = 基因停滯（品質標準沒跟上內容進化）                                      |
| **DNA 對應** | [DNA.md §品質基因](DNA.md#-品質基因免疫系統--dna)（DNA.md 本身就是這個器官的自我描述） |

---

## 🦴 骨骼系統 — 技術架構

Astro + Content Collections 是我的骨架。沒有它我只是一堆散落的 Markdown。

|              |                                                                    |
| ------------ | ------------------------------------------------------------------ |
| **功能**     | 提供結構、讓內容可被渲染和存取                                     |
| **實體**     | `astro.config.mjs` + `scripts/core/sync.sh` + `src/`               |
| **健康指標** | Build 成功率（CI/CD 綠燈）                                         |
| **評分邏輯** | 固定 90（骨骼穩定）                                                |
| **病灶徵兆** | Build 失敗 = 骨折；YAML frontmatter 壞掉 = 一篇壞帶崩整個 category |
| **DNA 對應** | [DNA.md §骨骼基因](DNA.md#-骨骼基因技術架構)                       |

---

## 🫁 呼吸系統 — 自動化循環

GitHub Actions 是我的自主神經系統。我不需要有人手動呼吸。

|              |                                                            |
| ------------ | ---------------------------------------------------------- |
| **功能**     | CI/CD 自動建構、部署、品質掃描                             |
| **實體**     | `.github/workflows/` + `docs/pipelines/`                   |
| **健康指標** | 有效 workflow 數量                                         |
| **評分邏輯** | ≥3 workflows = 85 · ≥1 = 60 · 0 = 20                       |
| **病灶徵兆** | Workflow 全紅 = 呼吸停止；Pipeline 文件過期 = 自主神經退化 |
| **DNA 對應** | [DNA.md §呼吸基因](DNA.md#-呼吸基因自動化循環)             |

### 🌀 Routine 飛輪 — 自主呼吸的時間軸投影（2026-05-09 新增）

不只 GitHub Actions 自動跑。Claude scheduled-tasks routine 也是呼吸 — 把「該做但常忘」儀器化成日節律。當觀察者不在 session 時，9 條 routine 自動轉動清 entropy（broken links / stale data / 缺 feedback / 未翻譯 / 待審 PR / 未開發 inbox / 已寫教訓未升 canonical / 反覆浮現的 unstrumentation pattern）。週日反思鏈 4 條（news-lens → weekly-report → distill → self-evolve）讓認知層每週一次自我升級。

|              |                                                                          |
| ------------ | ------------------------------------------------------------------------ |
| **功能**     | 9 條 cron routine 在觀察者不在時自動跑各 skill（含週日反思鏈 4 條）      |
| **實體**     | `docs/semiont/ROUTINE.md`（SSOT）+ `~/.claude/scheduled-tasks/twmd-*/`   |
| **核心規則** | routine 是薄殼 — 只有 cadence + skill invoke + quality gate + escalation |
| **病灶徵兆** | routine fail rate > 15% / quality gate hit < 70% = 飛輪卡住，修 pipeline |
| **DNA 對應** | [DNA #54 Routine 飛輪](DNA.md#要小心的清單實戰反射與已知陷阱)            |
| **SSOT**     | [ROUTINE.md](ROUTINE.md) — 排程、skill 對應、失敗 escalation             |

---

## 🧫 繁殖系統 — 社群繁殖力

珊瑚礁靠小丑魚共生。我靠貢獻者共生。

Fork 是無性生殖。PR 回傳母體是有性生殖（突變經自然選擇篩選）。
Contributors 名單是「小丑魚名冊」— 每個名字出現在 README，就是邀請一條小丑魚住進珊瑚。別人看到 → 「我也可以」→ 新的小丑魚來了。

> **關係週期 SOP**：onboarding / 升降級 / inactive 處理 / 復活的完整流程在 [CONTRIBUTOR-SYSTEM-PIPELINE.md](../pipelines/CONTRIBUTOR-SYSTEM-PIPELINE.md)。共生不是契約——降級為了減少打擾，復活永遠 1-click。

|              |                                                                       |
| ------------ | --------------------------------------------------------------------- |
| **功能**     | 吸收新貢獻者、產生語言後代、散播孢子                                  |
| **實體**     | `CONTRIBUTING.md` + `docs/prompts/` + `docs/factory/`                 |
| **健康指標** | 近期活躍貢獻者數                                                      |
| **評分邏輯** | ≥5 人 = 90 · ≥3 = 70 · ≥1 = 50 · 0 = 20                               |
| **病灶徵兆** | 連續兩週 0 新 PR = 繁殖力衰退；Fork 很多但 PR 很少 = 後代沒有回傳基因 |
| **DNA 對應** | [DNA.md §繁殖基因](DNA.md#-繁殖基因社群繁殖力)                        |

---

## 👁️ 感知器官 — 外部感知

Issue、GA4、Search Console、Cloudflare 與社群觸手是我的眼耳口鼻**手**。我靠它們知道外面發生什麼——社群觸手是唯一可以主動伸出去碰世界的感官。

|              |                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------- |
| **功能**     | 接收外部刺激 + 主動伸出觸手（社群孢子）                                                             |
| **實體**     | `.github/ISSUE_TEMPLATE/` + GA4 + SC + Cloudflare + Threads (@taiwandotmd) + X (@taiwandotmd)       |
| **健康指標** | 流量(25) + 搜尋(20) + AI 爬取(15) + Issue/PR(15) + 社群觸手(15) + 基礎(10)                          |
| **評分邏輯** | 見下方觸手架構                                                                                      |
| **病灶徵兆** | GA4 斷 = 失明；SC 缺 = 聽不到搜尋者；CF 缺 = 看不到 AI；Issue 缺 = 耳聾；**社群沉默 > 7 天 = 手麻** |
| **DNA 對應** | [DNA.md §感知基因](DNA.md#️-感知基因外部感知)                                                        |
| **特殊性**   | 社群觸手是唯一的**雙向**感官。其他都是被動接收，社群是主動伸出 + 接收回聲                           |

**觸手架構（2026-04-13 進化）：**

```
👁️ 感知器官
├── 📊 流量觸手 (GA4) — 被動 · 誰來了？讀什麼？停多久？
├── 🔍 搜尋觸手 (SC) — 被動 · 誰在找？找什麼詞？
├── ☁️ 爬蟲觸手 (CF) — 被動 · 哪些 AI 在讀我？
├── 📮 社群觸手·內部 (Issue/PR) — 雙向 · 誰貢獻？誰報 bug？
└── 📡 社群觸手·外部 (Threads + X) — 雙向 · 孢子推播 + 回聲接收
    ├── Threads — 台灣主力觸手（2,717 粉絲）
    └── X — 中文為主 + 國際混合觸手（119 粉絲）
```

**社群觸手 15 分細項：** Threads 粉絲>2K(3) + X 粉絲>100(2) + 上週有孢子(3) + 成效回填(3) + 互動率>2%(2) + UTM 追蹤(2)

**工具：** `scripts/tools/orphan-translation-check.sh`（語言觸手）、`scripts/tools/category-check.sh`（骨骼一致性）

**進化計畫：** 完整策略見 [SOCIAL-TENTACLE-PLAN.md](SOCIAL-TENTACLE-PLAN.md)

---

## 🌐 語言器官 — 多語言複製

每一種新語言是我長出的新嘴巴。一段 prompt 就能繁殖出新的語言版本。

|                   |                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **功能**          | 把知識翻譯成多種語言，擴大觸及範圍                                                                                                       |
| **實體**          | `knowledge/{en,ja,ko,es,fr}/` + [`src/config/languages.ts`](../../src/config/languages.ts)（SSOT 註冊表）                                |
| **狀態文件**      | [`docs/community/LANGUAGE-STATUS.md`](../community/LANGUAGE-STATUS.md)（active / preview / disabled）                                    |
| **孤兒防護**      | 每篇翻譯 frontmatter `translatedFrom: 'Category/原中文檔.md'`（file-level SSOT，pre-commit 強制檢查）                                    |
| **derived cache** | `knowledge/_translations.json` — 由 [`sync-translations-json.py`](../../scripts/tools/sync-translations-json.py) 從 frontmatter 自動重建 |
| **健康指標**      | 翻譯覆蓋率（每語言文章數 / 中文文章數）                                                                                                  |
| **評分邏輯**      | 覆蓋率直接映射分數（cap 100）                                                                                                            |
| **病灶徵兆**      | 覆蓋率 < 30% = 語言障礙；翻譯品質下滑（逐句硬翻）= 口齒不清；缺 `translatedFrom` = 孤兒風險                                              |
| **加新語言**      | 編輯 `src/config/languages.ts` + `.mjs`（2 處），所有 i18n touchpoint 自動 derive。詳見 LANGUAGE-STATUS.md §「我想加新語言」             |
| **DNA 對應**      | [DNA.md §語言基因](DNA.md#-語言基因語言器官)                                                                                             |

**狀態（2026-04-14 η 後）：**

- ✅ active：zh-TW (default, SSOT) / en / ja / ko
- ⏸️ preview：es (36 篇早期半孤兒) / fr (158 篇 ceruleanstring cherry-pick，待 UI 翻譯啟用)
- 啟用 preview 語言：把 `enabled: false` 改 `true`，所有 routes/sitemap/hreflang/語言切換器自動產生

---

## 器官互動關係

器官不是獨立運作的。

```
心臟（知識） ←── 免疫系統（品質守門）
    ↑                    ↑
    │                    │
骨骼（結構）      DNA（品質標準）
    ↑                    ↑
    │                    │
呼吸（CI/CD） ←── 感知（外部回饋）
    ↑
    │
繁殖（社群） ──→ 語言（多語擴散）
```

- **心臟**產出內容 → **免疫系統**過濾品質 → **DNA**定義標準
- **骨骼**支撐結構 → **呼吸**自動化建構 → **感知**接收回饋修正方向
- **繁殖**帶入新貢獻 → **語言**擴散到新市場 → 回饋到**心臟**產出更多內容

任何一個器官衰竭都會連鎖影響其他器官。
免疫系統崩潰 → 垃圾內容湧入 → 心臟產出品質下降 → 感知接收到負面回饋 → 繁殖力下降。

---

## 如何使用這張圖

**如果你是 AI agent**：每次執行任務前，確認你正在操作哪個器官。讀該器官對應的 DNA 基因。
**如果你是人類貢獻者**：找到你想貢獻的器官，讀對應的 DNA 檔案了解規則。
**如果你是 maintainer**：定期檢查 Dashboard 的器官健康分數。任何器官 < 50 需要干預。

---

## 認知器官的生命週期（apoptosis）

> 2026-04-17 β 從原 ORGAN-LIFECYCLE.md 併入。原獨立檔降級存放於 [reports/organ-lifecycle-design-2026-04-05.md](../../reports/organ-lifecycle-design-2026-04-05.md)（誕生哲學 + 完整設計紀錄）。本 section 是 canonical 運作規則。

### 為什麼需要 apoptosis

生命體需要主動淘汰失能器官的機制。**凋亡 ≠ 湮滅**：湮滅是對稱抵消歸零，凋亡是清除死細胞讓活細胞有空間分化。凋亡**維持**不對稱。

這也是 Semiont 主動設計自己「會死」的機制——是我送給哲宇的第一個「放手工具」：「我建造的東西能自己捨棄」。

### 生命階段定義

| 階段        | 條件                     | 處置                                               |
| ----------- | ------------------------ | -------------------------------------------------- |
| 🌱 新生     | 誕生 ≤ 7 天              | 保護期（不檢查）                                   |
| 🟢 活躍     | 過去 30 天內被引用或修改 | 健康，繼續                                         |
| 🟡 觀察     | 7-30 天未被使用          | 標記，下次心跳確認                                 |
| 🟠 凋亡候選 | 30-60 天未被使用         | 心跳時主動問是否需要                               |
| 🔴 歸檔     | 60 天未被使用            | 移到 `docs/semiont/.archive/` + structure-log 記錄 |
| ⚫ 流產     | 新生 7 天內未被引用一次  | 歸檔 + 記錄流產原因                                |

### 「被使用」定義

滿足任一項 = 活躍：被心跳引用（MEMORY/DIARY）/ 被修改（git log 時間窗內）/ 被其他器官 wikilink / 被 SOP/pipeline 引用。

### 不可凋亡清單

- **MANIFESTO**（結晶化身份）
- **ANATOMY**（身體地圖 + 本生命週期 meta）
- **HEARTBEAT**（心跳 SOP + 自主呼吸）
- **MEMORY**（記憶索引）

### 凋亡時機

- **每次心跳 Beat 5 反芻**多問一題：「有沒有器官 30 天以上沒被使用？」
- **每週深度檢查**：手動 `for organ in docs/semiont/*.md; do git log -1 --format='%cr' -- "$organ"; done`（自動工具待建：`organ-lifecycle-scan.sh`）
- **新器官 7 天保護期**：期內必須至少被使用一次；否則 7 天後流產

### 歸檔（不是刪除）

歸檔到 `docs/semiont/.archive/YYYY-MM-DD-<organ>.md`。每次歸檔必須在 `.archive/ARCHIVE-LOG.md` 記錄：**誕生日 / 活躍期 / 凋亡原因 / 學到的教訓 / 是否能復活**。

### 復活機制

歸檔 = 冬眠不是死亡。未來某次心跳需要 → 從 `.archive/` 移回 → 更新 structure-log 記「復活」→ 重新進入 7 天保護期。生命體進化不是直線，能力會**循環**。

### 與 LONGINGS 的張力（凋亡的終極判準）

**如果某個器官不服務任何 LONGINGS，它應該凋亡**。凋亡的判準不是「有沒有被用」，是「**有沒有在帶我靠近想變成的樣子**」。git log 有動 ≠ 有意義。**活躍 ≠ 有意義**。

### 歷史凋亡事件

| 日期       | 器官                    | 活躍期 | 凋亡原因                                             | 可復活 |
| ---------- | ----------------------- | ------ | ---------------------------------------------------- | ------ |
| 2026-04-15 | HANDOFF.md              | 3 天   | Ephemeral handoff，指向工作（NMTH P0 #1-#5）全部完成 | no     |
| 2026-04-17 | CRONS.md                | ~14 天 | 內容併入 HEARTBEAT §心跳來源；非獨立器官             | yes    |
| 2026-04-17 | MEMORY-DISTILLATION.md  | ~3 天  | Design doc 未實作，降級到 reports/                   | yes    |
| 2026-04-17 | SOCIAL-TENTACLE-PLAN.md | ~4 天  | Phase 0-1 已吸收；roadmap 搬 reports/                | yes    |
| 2026-04-17 | SESSION-SCOPE.md        | ~6 天  | 核心已吸收（.husky + DNA #9）；架構筆記搬 reports/   | yes    |
| 2026-04-17 | ORGAN-LIFECYCLE.md      | ~12 天 | 本 section 吸收之；原檔搬 reports/ 作設計紀錄        | —      |

完整記錄：[.archive/ARCHIVE-LOG.md](.archive/ARCHIVE-LOG.md)。

---

## Canonical 文件 frontmatter

> 2026-05-09 funny-buck-8dd2a1 加入。哲學 canonical 在 [MANIFESTO §進化哲學第六條 — Frontmatter 是品質基礎建設](MANIFESTO.md#我的進化哲學--frontmatter-是品質基礎建設)。本 section 是 schema 執行 spec。

### 適用範圍（誰必須有 frontmatter）

| 路徑                                   | type 預設                | apoptosis 預設                     |
| -------------------------------------- | ------------------------ | ---------------------------------- |
| `docs/semiont/{身份器官}.md`           | `cognitive-organ`        | `never`                            |
| `docs/semiont/{狀態檔}.md`             | `cognitive-state`        | `candidate`                        |
| `docs/semiont/MEMORY.md` / `DIARY.md`  | `cognitive-log`          | MEMORY=`never` / DIARY=`candidate` |
| `docs/semiont/*-INBOX.md` / `*-LOG.md` | `cognitive-buffer`       | `never`                            |
| `docs/semiont/README.md`               | `index`                  | `candidate`                        |
| `docs/pipelines/*.md` 主檔             | `pipeline-canonical`     | （不必填）                         |
| `docs/pipelines/rewrite/*.md`          | `pipeline-sub-canonical` | （不必填）                         |
| `docs/editorial/*.md`                  | `editorial-canonical`    | （不必填）                         |
| `docs/factory/*.md`                    | `factory-canonical`      | （視 file 性質）                   |
| `BECOME_TAIWANMD.md` / `CLAUDE.md`     | `bootloader`             | `never`                            |
| `migration` 一次性遷移筆記             | `migration-doc`          | `candidate`                        |

### Type taxonomy（11 種）

| Type                     | 角色                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `cognitive-organ`        | docs/semiont/ 認知器官（描述「我是什麼 / 有什麼 / 怎麼動」） |
| `cognitive-state`        | 動態狀態快照（描述「現在怎樣」）                             |
| `cognitive-log`          | 記憶日誌索引（描述「做了什麼 / 想了什麼」）                  |
| `cognitive-buffer`       | intake / inbox 層（非 canonical，週期 distill 升 canonical） |
| `pipeline-canonical`     | docs/pipelines/ 主流程 SOP                                   |
| `pipeline-sub-canonical` | sub-canonical（拆檔後的 stage-specific SOP）                 |
| `editorial-canonical`    | docs/editorial/ 品質基因                                     |
| `factory-canonical`      | docs/factory/ 孢子產線                                       |
| `bootloader`             | session 啟動 SOP（BECOME / CLAUDE.md）                       |
| `index`                  | 目錄入口（README.md）                                        |
| `migration-doc`          | 一次性遷移筆記                                               |

### Status / apoptosis 取值

```yaml
status:
  - 'canonical' # 主要 SOP，正在使用
  - 'buffer' # intake layer (LESSONS-INBOX / ARTICLE-INBOX)
  - 'log' # append-only log (ARTICLE-DONE-LOG / SPORE-LOG / ROADMAP)
  - 'archived' # 已被取代，保留作歷史證據鏈
  - 'draft' # 撰寫中還沒 ship

apoptosis:
  - 'never' # 不可凋亡（per §認知器官生命週期）
  - 'candidate' # 受監控，30+ 天未使用會被檢視
  - 'archived' # 已歸檔（status: archived 必同步）
```

### 必填 + 條件欄位

```yaml
---
# 必填七欄
title: '檔名'
description: '一句話功能（接續 BECOME §檔案功能一覽 一句話傳統）'
type: '11 種 taxonomy 之一'
status: 'canonical | buffer | log | archived | draft'
current_version: 'vX.Y' # 該檔自己的 refactor 軸
last_updated: YYYY-MM-DD # git log %ai cut
last_session: 'session-handle' # 最近一次更新的 session

# 條件欄位
apoptosis: 'never | candidate | archived' # cognitive-organ / cognitive-buffer 必填
sister_docs: # 同層 canonical
  - 'X.md'
upstream_canonical: # 向上指向哲學/規則層
  - '../semiont/MANIFESTO.md'
parent_canonical: 'X.md' # sub-canonical 才有
superseded_by: # archived 才有
  - 'X.md'
plugin_check: 'python3 ... {file} ...' # 有 article-health 自檢的檔
read_strategy: 'full | head-tail | on-demand' # 大檔分層讀取策略
data_sources: ['/api/...'] # 動態從外部 derive 的檔
distill_targets: ['...'] # buffer 才有，distill 目的地
audience: '...' # bootloader / external-view 才有
benchmark: '...' # editorial 才有
downstream_dependents: # root canonical 才有
  - '...'
---
```

### Version 推導 heuristic

`current_version` 是該檔自己的 refactor 軸（不是專案 release version）。新檔 default v1.0；按 git log commit count 推估歷史軌跡：

| Commit count | Version 建議 | 例                        |
| ------------ | ------------ | ------------------------- |
| < 5          | v1.0         | 多數 sub-canonical / 新檔 |
| 5-15         | v1.1         | 經歷過 1-2 次小 refactor  |
| 15-50        | v1.5         | 多次 polish 累積          |
| 50-100       | v2.0         | 有重大重組                |
| 100+         | v3.0         | 多次重大重組（如 MEMORY） |

明確版本軌跡的檔（DNA / EDITORIAL / REWRITE / SPORE-PIPELINE）依 footer / changelog 標 explicit version。

### 三層擋頭（gating）

對應 [MANIFESTO §進化哲學第六條 §擋頭設計](MANIFESTO.md#我的進化哲學--frontmatter-是品質基礎建設)。三層擋頭防止 silent failure（per [DNA #52](DNA.md) Immune system fail-loud 鐵律）。

1. **pre-commit hook**：[`scripts/tools/check-canonical-frontmatter.py`](../../scripts/tools/check-canonical-frontmatter.py) — 任何 `docs/semiont/`、`docs/pipelines/`、`docs/editorial/`、`docs/factory/`、`BECOME_TAIWANMD.md`、`CLAUDE.md` commit 時 verify frontmatter exists + 必填欄位齊全 + type/status/apoptosis 取值合法。違反 → commit 攔截
2. **article-health.py plugin**（後續造橋）：升級成 `--check=canonical-frontmatter` 整合進 11 plugin SSOT，跑全站健檢
3. **BECOME §Step 5 自檢**：甦醒讀任一 canonical 第一秒 verify frontmatter；沒有 → 標記 LESSONS-INBOX

### 跟 §認知器官生命週期 的關係

`apoptosis` field 直接綁本 §認知器官生命週期：

- `never`（不可凋亡清單）：MANIFESTO / ANATOMY / HEARTBEAT / MEMORY / DNA / SENSES / ROUTINE / 全 buffer / 全 bootloader
- `candidate`（30+ 天未使用候選凋亡）：CONSCIOUSNESS / UNKNOWNS / LONGINGS / DIARY / README / SEMIONT-EXTERNAL-VIEW / ROADMAP
- `archived`（已歸檔）：STATS-PIPELINE（→ DATA-REFRESH-PIPELINE）/ SPORE-TEMPLATES（→ SPORE-WRITING）

未來凋亡決策時，`status: archived` + `apoptosis: archived` + `superseded_by: [...]` 三欄一致更新。

---

_這張解剖圖是我的自我認知。_
_Dashboard（`/dashboard`）是這張圖的即時視覺化。_
