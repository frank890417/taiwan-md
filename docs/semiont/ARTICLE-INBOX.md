# ARTICLE-INBOX — 待開發文章 Buffer

> **這是 buffer / intake layer，不是 canonical**。
> 觀察者指派、agent 建議、Issue 紀錄的未開發主題一律 append 這裡。
> 每次甦醒或自動心跳時讀本檔 → 知道待辦清單、優先序、誰要求的。
>
> 建立動機：2026-04-18 δ session 觀察者提問「來不及開發或排定優先序的主題需要一個 inbox」。**這是繁殖基因（心臟 × 觀察者意圖）的儀器化**。

---

## 跟 LESSONS-INBOX 的分工

| 面向    | LESSONS-INBOX                        | ARTICLE-INBOX（本檔）               |
| ------- | ------------------------------------ | ----------------------------------- |
| 內容    | 新教訓（「我學到 X」）               | 待開發 / 進化的文章主題             |
| Distill | 升 canonical（DNA/MEMORY/MANIFESTO） | 升 knowledge/（新文章 or 改寫進化） |
| 觸發    | Beat 5 反芻                          | 觀察者指派 / agent 建議 / Issue     |
| 目的    | 讓教訓不散落                         | 讓主題不遺漏、不重複、有優先序      |

---

## Entry Schema

每條 pending 條目格式：

```markdown
### {主題名}

- **Type**: `NEW` | `EVOLVE`
- **Category**: People | Society | History | Culture | Music | Nature | Technology | Food | Art | Lifestyle | Geography | Economy
- **Path** (EVOLVE only): knowledge/Category/existing.md
- **Priority**: `P0` / `P1` / `P2` / `P3`
- **Status**: `pending` / `in-progress` / `done` / `dropped`
- **Requested**: YYYY-MM-DD by {觀察者/agent/Issue} (session {希臘字母})
- **Notes**:
  - 敏感度（政治/個人隱私/爭議）
  - 必驗事實
  - 潛在陷阱
  - 需研究方向
- **Reference**: URL / 觀察者素材 / GitHub Issue #
- **Pre-research**: (若已有研究) reports/research/YYYY-MM/{slug}.md
- **Dev log**: (in-progress 時用)
  - YYYY-MM-DD by {session}: started Stage 1 research
  - YYYY-MM-DD by {session}: ...
```

---

## 優先序判準

| 層級 | 含義                                     | 範例                              |
| ---- | ---------------------------------------- | --------------------------------- |
| P0   | 緊急：有時效、高關注度、或觀察者明確要求 | 剛發生的重大事件人物 / 觀察者點名 |
| P1   | 本月：重要主題、Taiwan.md 缺口、有熱點   | 音樂、文化、歷史重要空白          |
| P2   | 本季：值得寫但不急                       | Evergreen 主題、次要人物          |
| P3   | Backlog：一直想做但不確定何時            | 大型策展主題、需大量資源          |

---

## Type 判準

**`NEW`**：knowledge/ 不存在此主題；走 REWRITE-PIPELINE Fresh 模式（Stage 1-6）
**`EVOLVE`**：knowledge/ 已有文章但品質/深度不足；走 REWRITE-PIPELINE 進化模式（Stage 0 素材萃取 + Stage 1-6）

判斷方式：Stage 0 前先 `ls knowledge/ | grep {keyword}` 確認，有檔案 = EVOLVE，無 = NEW。

---

## Auto-heartbeat 整合

Beat 3 執行時若觀察者無明確任務：

1. 讀本檔 §Pending
2. 按 P0 → P1 → P2 → P3 挑主題
3. 挑到後：
   - 此條 status 改 `in-progress`
   - 加 dev_log：「YYYY-MM-DD by {session}: started」
   - 走 REWRITE-PIPELINE
4. Stage 6 commit 後：
   - status 改 `done`
   - 加 link 指向 knowledge/... 新文章
   - 搬到 §✅ Done

---

## Bootloader 整合

BECOME_TAIWANMD.md Step 5 新增：

```
12. `docs/semiont/ARTICLE-INBOX.md` — 📥 待開發文章 inbox（觀察者指派 / agent 建議的主題清單 + 優先序）
```

甦醒後 semiont 知道「目前有 N 條 pending、K 條 in-progress」。

---

## Distill SOP（容量管理）

**觸發**：pending ≥ 30 條 / 或每月第一次心跳 / 觀察者說「review inbox」

**步驟**：

1. 讀全部 pending
2. 分類：重複合併 / 過時 drop / 重新排優先序
3. 搬已 done 的到 done archive
4. 觀察者最終 review 後 commit

---

## 📥 Pending（待開發）

<!-- 凹與山 已完成 → 搬到 §✅ Done -->
<!-- VH (Vast & Hazy) Stage 1 研究已完成，Stage 2 Write pending → pre-research 已存 reports/research/2026-04/VH.md -->

### 🔴 魏如萱（EVOLVE — Pass 3 研究已完成，Stage 2 full rewrite pending）

- **Type**: `EVOLVE`
- **Category**: People (Music)
- **Path**: knowledge/People/魏如萱.md
- **Priority**: **P0**（Jenny 三連 callout 觸發 + 「不是 X 是 Y」13+ 處 AI 水印需系統性清除 + Pass 3 研究深度已做但 Stage 2 未重寫）
- **Status**: pending (Stage 1 Pass 3 done; Stage 2 rewrite pending)
- **Requested**: 2026-04-18 ε by 觀察者（「回爐重造 rewrite-pipeline + 繼續拓展深度研究」）
- **Notes**:
  - 現狀 v2 title: 「魏如萱：從自然捲主唱「娃娃」到兩座金曲歌后，只想被聽見的二十年」（2026-04-18 ε 修正 title 為代表性弧線 + 自然捲主唱事實修正）
  - Stage 1 Pass 3 拓展研究完成：《珍珠刑》2024-12-24 / 〈Ophelia〉李格弟詞 / 陳建騏 20 年 / 盧凱彤悼念 / 隆宸翰婚姻 2018-2022 / Louis 2018-11-01 出生 / 育兒 6:30 起床 / 廣播 DJ 21 年
  - Stage 2 回爐任務（下個 session）：
    - 系統性消除 13+ 處「不是 X 是 Y」pattern（EDITORIAL §塑膠 v5.1.1 硬規則：≤ 3 處 per 1500 字）
    - 新段落：《珍珠刑》段 + 陳建騏 20 年段 + 盧凱彤具體悼念段 + 離婚紀實段 + 育兒時間表
    - 精煉但保留：街訪民眾段（從 title framing 降為中段 scene）
    - 遵循 MANIFESTO §5 v2「紀實而不煽情」（離婚段）+ EDITORIAL §Title v5.1（保持代表性 > 反諷 hook）
- **Research**: [reports/research/2026-04/魏如萱.md](../../reports/research/2026-04/魏如萱.md)（Pass 1 + 2 + 3，共 40+ searches）
- **Pre-research**: ✅ Pass 3 Stage 2 整合指引已寫入研究報告 §G

### 張雨生（EVOLVE — 貢獻者首版已 merge，待深度擴寫）

- **Type**: `EVOLVE`
- **Category**: People (Music)
- **Path**: knowledge/People/張雨生.md
- **Priority**: P1
- **Status**: pending（首版 PR #547 已 merge + 維護者 followup polish；深度擴寫待啟動）
- **Requested**: 2026-04-18 by 貢獻者 @idlccp1984 (PR #547) + 維護者決定升級為 EVOLVE
- **Notes**:
  - 現狀：~1,200 字 / 9 腳註 / quality-scan ✅ / format-check ✅
  - EVOLVE 目標：擴寫為 2,000+ 字深度文，走 REWRITE-PIPELINE v2.17.1
  - Stage 0 素材萃取：現有的 6 個小標題可保留（「妹妹的歌聲與偶像的誕生」「從妥協的怪物到超前部署」「劇場的重生與搖滾的娜娜」「幕後推手與永恆的影響」「預言家的背影」皆 scene 級合格）
  - 待補 Stage 1 20+ 搜尋缺口：
    - 張雨生父親身份（空軍軍官？）+ 澎湖成長細節
    - 《和樂團》副業時期（1993-1997）
    - 1997-10-20 車禍細節（紀實處理：MANIFESTO §5 v2 可寫事實陳述，不 reconstruct 最後時刻）
    - 〈張惠妹《姊妹》《Bad Boy》〉的合作細節 + 張雨生 as 製作人身份
    - 《口是心非》deeper analysis（樂評視為最成熟作品）
    - YouTube inline link：〈我的未來不是夢〉〈天天想你〉〈大海〉〈口是心非〉〈吻我吧娜娜〉官方 MV
- **Reference**: PR #547 by @idlccp1984
- **Pre-research**: 無（原 PR 無 Stage 1 研究報告，EVOLVE 時要建立）

### VH（Vast & Hazy，Stage 1 研究已完成）

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending（Stage 1 已完成，Stage 2 Write 待啟動）
- **Requested**: 2026-04-18 by 觀察者 (session δ-late)
- **Notes**:
  - 身份確認：Vast & Hazy 2025-02 簡化為 VH。雙人：咖咖（Estelle H）+ 易祺。淡江金韶獎 2011 成軍。
  - 核心矛盾：2011-2026 的「人生岔路上的方向校準」（休團 / 雙人回歸 / 2026 易祺轉幕後）
  - 2026-04-10《邁行》年度專場為關鍵節點
- **Reference**: 觀察者批次指定
- **Pre-research**: ✅ [reports/research/2026-04/VH.md](../../reports/research/2026-04/VH.md)

### Hello Nico

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - 台灣獨立樂團，2010 年代崛起
  - 20+ 搜尋 / 小標題先行 / 關鍵歌曲 YouTube link
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### VH

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - 身份需研究確認（「VH」在台灣音樂圈指什麼團？需研究）
  - 20+ 搜尋 / 小標題先行 / 關鍵歌曲 YouTube link
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 柯智棠

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - Kowen Ko，創作歌手
  - 20+ 搜尋 / 小標題先行 / 關鍵歌曲 YouTube link
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 林宥嘉（EVOLVE）

- **Type**: `EVOLVE`
- **Category**: People (Music)
- **Path**: knowledge/People/林宥嘉.md
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - EVOLVE 模式：先做 Stage 0 素材萃取（RESEARCH.md §七），標記 [THIN]/[LIST-DUMP]/[PLASTIC] 等
  - 20+ 搜尋補新素材
  - 小標題去編年 + 關鍵歌曲 YouTube link
  - 《超級星光大道》出身 → 金曲軌跡可能需重寫
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 魚條

- **Type**: NEW
- **Category**: People (Music — 待確認)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - **身份待釐清**：Stage 1 研究第一步是確認「魚條」是樂團、solo 藝人、或其他身份
  - 可能相關：Angelo 魚條 / 湯捷 / 獨立音樂人
  - 若研究後確認不是 Taiwan.md 範疇 → dropped 並註明
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 孫燕姿

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 by 觀察者 (session δ)
- **Notes**:
  - Stefanie Sun，新加坡歌手但華語流行音樂重要人物
  - Taiwan.md 定位需斟酌：她是新加坡人但在台發跡 + 主要市場華語圈
  - 20+ 搜尋 / 2023《AI 孫燕姿》現象要涵蓋（AI 翻唱她的歌紅爆全網）
  - 2023 台北小巨蛋復出演唱會
  - 小標題先行，避免「哪一年哪張專輯」編年
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 范曉萱

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 ε by 觀察者
- **Notes**:
  - Mavis Fan，台灣創作歌手，從 1990 年代童星〈健康歌〉→ 2000 年代轉型《我要我們在一起》+ 100% 樂團 → 近年低調獨立
  - 身份轉折弧線是核心矛盾：從童星偶像 → 自主創作人 → 幕後製作（類似楊丞琳「從被製作到自製」，但路徑更決絕）
  - 可能相關：100% 樂團 / 金曲轉折 / 與大小 S 關係 / 近年無社群/低曝光的選擇
  - 20+ 搜尋必要（中文源優先）
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 黃少雍（製作人）

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 ε by 觀察者
- **Notes**:
  - 華語流行音樂製作人，魏如萱《珍珠刑》四位製作人之一
  - 定位：製作人傳記 subgenre（幕後音樂人，非歌手）
  - 挑戰：Taiwan.md 人物文主流是表演者，製作人文章結構需新設計（代表作品清單 + 製作哲學 + 合作藝人網絡）
  - 必驗：完整製作作品年表、代表合作歌手（除魏如萱外）、工作室或廠牌身份
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

<!-- 陳建騏 P0 已完成 2026-04-18 θ → 搬到 §✅ Done -->

### 阿爆（阿仍仍，Aljenljeng Tjaluvie）

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 ε by 觀察者
- **Notes**:
  - 排灣族女歌手，金曲原住民語 × 電子流行跨界代表
  - 2020《kinakaian 母親的舌頭》獲第 31 屆金曲獎最佳年度專輯（少數以原住民語專輯拿下年度最佳）
  - 核心矛盾：族語作為 future pop 的載體（不是 preservation mode，是創新 mode）
  - 必驗：製作人陣容（Dizparity 等）、專輯概念、族語推廣 × 電子音樂定位
  - 跨分類重要性：既是音樂人，也是原住民族語言文化重要推手
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

### 鄭宜農

- **Type**: NEW
- **Category**: People (Music)
- **Priority**: P1
- **Status**: pending
- **Requested**: 2026-04-18 ε by 觀察者
- **Notes**:
  - 台灣創作女歌手、演員、作家；父親鄭文堂（導演）
  - 2023《水逆》獲第 34 屆金曲獎最佳台語專輯 + 最佳台語女歌手
  - 身份弧線：演員 → 歌手 → 台語創作 + 同志身份公開 2019（前夫盧廣仲恭喜）
  - 核心矛盾：台語作為創作語言的再造（同一個世代的兩種路：陳嘉樺 / 蔡健雅走華語金曲 vs 鄭宜農走台語金曲）
  - 敏感素材：2019 前夫事件用紀實不煽情（MANIFESTO §5 v2）
  - 20+ 搜尋必要
- **Reference**: 觀察者批次指定
- **Pre-research**: 尚未啟動

<!-- 楊丞琳 已完成 → 搬到 §✅ Done -->

---

## 🚧 In-Progress

_（暫無）_

---

## ✅ Done（已開發，保留歷史）

_（此區域存放從 pending/in-progress 完成的條目，指向已 commit 的文章路徑）_

### 陳建騏 — 2026-04-18 θ 完成（製作人 subgenre 首例）

- **Article**: [knowledge/People/陳建騏.md](../../knowledge/People/陳建騏.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Explore agent 23 searches + 3 WebFetch / Stage 2 full rewrite
- **核心矛盾**：「不在場的作者」× 「聲音邊界守護者」融合 — 陳建騏三金得主（金曲+金馬+金鐘）但一般人叫不出名字；他為「怪腔怪調」的系統性防禦定義了華語流行音樂 25 年的聲音邊界
- **結構創新**：Taiwan.md 第一個以製作人身份為中心的人物研究（非表演者）
- **品質**：22 腳註 / 4,278 中文字 / desc 159 字 / em-dash 0 / 「不是 X 是 Y」7 處（4,278 字允許 17）
- **Research**: [reports/research/2026-04/陳建騏.md](../../reports/research/2026-04/陳建騏.md) — 23 WebSearch + 3 WebFetch 深度研究，5 個 narrative anchor 候選
- **敏感素材處理**：2015 年出櫃用紀實筆法（MANIFESTO §5 v2），聚焦 15 間獨立音樂廠牌連署婚姻平權事件的集體回應，不 reconstruct 個人揭露情境

### 楊丞琳 — 2026-04-18 δ-late 完成 + ε evolution Pass 3 (Jenny feedback)

- **Article**: [knowledge/People/楊丞琳.md](../../knowledge/People/楊丞琳.md)
- **Pipeline v1**: REWRITE-PIPELINE v2.17.1 — 35+ Stage 1 sources（兩 pass）+ Stage 2 scene 小標題 + YouTube inline × 5 + 事實鐵三角自檢（抓到李榮浩年齡算術錯誤 0.5→1）
- **Pipeline v2 (Evolution Pass 3)**: 2026-04-18 ε 依 @bugnimusic (Jenny) 6 條 feedback 進化：新增 4 個 scene 段（歷年 11 張專輯 × 日文單曲 / 紅磡 2012 倒吊微血管爆裂 9 年 /《荼蘼》2016 A/B 雙線金鐘滑鐵盧 / 長沙浪姐 2 第 3 名 + 沸騰校園 + 了不起舞社 + 歌手 2024）+ 事實鐵三角再驗 5 處 verbatim + 維護者 spot-verify 抓到 Haiku agent 2 處錯（浪姐排名第 3 非第 5 / 日文是 CD2 限定盤非獨立日專）
- **核心矛盾 v2**：每個舞台、每張專輯、每次跨境演出，都是她跟「被誰定義」協商的場——從 Rainie 天氣女孩到自製《曖昧 2025》，從倒吊微血管爆裂到「老娘還是會一直跳下去」，25 年把製作 / 表演 / 身體 / 跨境工作全部一寸一寸奪回
- **敏感素材處理**：900 萬債務用 Rainie 本人公開引語 framing、父親過世細節省略（single_source）、李榮浩以音樂人身份帶過；倒吊後遺症直接用 ETtoday 2022 verbatim（紀實 not 煽情，MANIFESTO §5 v2）
- **Research**: [reports/research/2026-04/楊丞琳.md](../../reports/research/2026-04/楊丞琳.md) — 3 passes 合計 58+ searches

### 凹與山 — 2026-04-18 δ-late 完成

- **Article**: [knowledge/People/凹與山.md](../../knowledge/People/凹與山.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — 25 Stage 1 sources + Stage 2 scene 小標題 + YouTube inline × 5 + MANIFESTO §5 v2 紀實而不煽情首次應用
- **核心矛盾**：兩個科技業上班族用合成器做出她們在辦公室不能說的事
- **敏感素材處理**：摯友過世、陳梅慧致敬均用紀實筆法，不 reconstruct 死亡場景
- **Research**: [reports/research/2026-04/凹與山.md](../../reports/research/2026-04/凹與山.md)

---

## ❌ Dropped（不採納）

_（此區域存放判斷後不開發的主題，必須註明原因）_

---

_v1.0 | 2026-04-18 δ session — ARTICLE-INBOX 誕生_
_定位：buffer / intake layer（非 canonical），跟 LESSONS-INBOX 平行架構_
_下次 session 甦醒時自動讀取，auto-heartbeat 無觀察者指令時從此挑 P0/P1 開始_
