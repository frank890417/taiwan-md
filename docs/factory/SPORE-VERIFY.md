---
title: 'SPORE-VERIFY'
description: '孢子閘門集中地（gate layer）— 17 Hard gate inventory + 7 大 verify + 紀實/煽情閘 (v1.5)'
type: 'factory-canonical'
status: 'canonical'
current_version: 'v1.5'
last_updated: 2026-05-11
last_session: 'cranky-newton-220237'
sister_docs:
  - 'SPORE-PIPELINE.md'
  - 'SPORE-WRITING.md'
  - 'SPORE-HARVEST-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
  - '../pipelines/FACTCHECK-PIPELINE.md'
---

# SPORE-VERIFY.md — 孢子閘門集中地（gate layer）v1.5

> **第一性原理**：寫一則孢子需要過的所有閘門集中在一張表 — 17 hard gate，任一不過 = 不放行。本檔是 verify 紀律的 single source of truth。
>
> v1.5 設計理由：對齊 [REWRITE-PIPELINE v5.0](../pipelines/REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](../pipelines/MAINTAINER-PIPELINE.md) spine restoration。Hard Gate Inventory 已存在不動，補 ASCII spine + Top 5 最常忘 + 跨檔案職責分工 standalone table。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         SPORE-VERIFY — gate layer（怎麼驗一則孢子）                      │
│                                                                          │
│   🧭 verify 紀律                                                         │
│            ├── 17 hard gate（12 必跑 + 5 條件）                          │
│            ├── 三層 quality（自動掃描 → EDITORIAL → 人工判斷）           │
│            └── reach × accuracy（views ≥ 50K 觸發 retroactive audit）    │
│                                                                          │
│   ──── 7 大 verify 階段 ──────────────────────────────────────          │
│                                                                          │
│   1. 上次成效回填 ──→ PICK 前置（鐵律）                                  │
│   2. 品質三層 ──→ 自動掃描 + EDITORIAL + 人工                           │
│   3. 事實藍圖 + 信度層 ──→ blueprint 必填                                │
│   4. 紀實/煽情閘 ──→ 敏感度 flag 觸發四問自檢                            │
│   5. Hook Blueprint ──→ 結構性題目讀者物件 + 矛盾問題                    │
│   6. 事實查核表 + §11 書寫節制 ──→ 7 類 claim audit + AI 水印            │
│   7. SHIP checklist ──→ URL encode / 配圖 / Hook tier / Platform        │
│                                                                          │
│   ──── 17 Hard Gate Inventory（一張表 audit 全 pipeline）───              │
│            └── 詳見下方 §Hard Gate Inventory                             │
│                                                                          │
│   ──── HARVEST 觸發 retroactive audit ──────────────                    │
│            └── views ≥ 50K → spawn FACTCHECK Quick Mode 驗 3-5 atom      │
│                                                                          │
│   ✅ 孢子過所有閘門 → 進 WRITE / SHIP                                   │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## ⚠️ Top 5 最常忘的 step

> 從 4/14 ε spore #29 紅線焦慮 + 鄭麗文事實藍圖必填 + 多次「Tier 3 廉價懸念」紅旗抽 friction 最高的 5 條。

1. **事實藍圖必填**（VERIFY 第 3 階段）— 不能寫 prose 前必須有 blueprint + frontmatter 信度層
2. **Reach × Accuracy 50K 觸發 retroactive audit** — 孢子 views ≥ 50K spawn FACTCHECK Quick Mode 驗 3-5 atom，發現錯誤修原文
3. **§11 prose-health plugin** — 對位句型 9 變體 + 破折號連用 + spore-writing plugin 全跑
4. **Platform allocation** — zh 一般人物 default Threads only，X 拉非中文受眾才開
5. **Hook tier 自檢** — Tier 1a/1b only，禁 Tier 3 廉價懸念（「未完待續」一律重寫）

---

## 跨檔案職責分工

| 檔案                                                        | 範圍                                                                            |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **本檔**                                                    | gate layer — 17 hard gate inventory + 7 大 verify + 紀實煽情閘 + Hook Blueprint |
| [SPORE-PIPELINE.md](SPORE-PIPELINE.md)                      | 5 stage 主流程 process layer                                                    |
| [SPORE-WRITING.md](SPORE-WRITING.md)                        | craft layer — 模板 + 18 條規則 + 自檢三板斧                                     |
| [SPORE-HARVEST-PIPELINE.md](SPORE-HARVEST-PIPELINE.md)      | post-publish — Reach×Accuracy 50K 觸發本檔 retroactive audit                    |
| [FACTCHECK-PIPELINE.md](../pipelines/FACTCHECK-PIPELINE.md) | 觸發 Quick Mode 對孢子做 atom 驗證（reach ≥ 50K）                               |
| [MANIFESTO §11](../semiont/MANIFESTO.md)                    | 對位句型 + 破折號雙紀律                                                         |
| [DNA #16+31](../semiont/DNA.md)                             | 事實驗證 / 跨源驗證                                                             |

---

## 跟其他 spore 檔的分工

PIPELINE 管 process（5 stage 線性），WRITING 管 craft（怎麼寫好），**本檔管 gate（怎麼驗）**。

對應 [reports/spore-pipeline-evolution-plan-2026-05-08.md](../../reports/spore-pipeline-evolution-plan-2026-05-08.md) Direction A 拆檔。

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

寫一則孢子需要過的所有閘門。任一 hard gate 不過 = 不放行。

| Gate                | 觸發 stage | 觸發條件        | 工具 / 自檢                                | 不過 = ?     | 觸發類型 |
| ------------------- | ---------- | --------------- | ------------------------------------------ | ------------ | -------- |
| 上次成效回填        | PICK       | 所有 spore      | manual + `SPORE-LOG.md` 最後 3 筆          | 不准發新孢子 | 必跑     |
| 品質三層            | VERIFY     | 所有 spore      | `validate` + `article-health.py`           | 回爐 rewrite | 必跑     |
| 事實藍圖（fact）    | VERIFY     | 所有 spore      | manual blueprint + frontmatter 信度層      | 不能寫 prose | 必跑     |
| 針對性事實驗證      | VERIFY     | bullet 標需驗證 | WebSearch ×3 來源 + ✅/⚠️/❌ 標記          | 移除 bullet  | 條件     |
| 紀實/煽情閘         | VERIFY     | 敏感度 flag     | 四問自檢                                   | 重寫或棄用   | 條件     |
| Hook Blueprint      | VERIFY     | 結構性題目      | 四格自填（讀者物件 + 矛盾問題）            | 不能進寫作   | 條件     |
| 事實查核表          | VERIFY     | 所有 spore      | 7 類 claim audit（日期/數字/引語等）       | 不放 prose   | 必跑     |
| §11 書寫節制        | VERIFY     | 所有 spore      | `article-health.py --check=prose-health`   | 改寫         | 必跑     |
| spore-writing 規則  | VERIFY     | 所有 spore      | `article-health.py --check=spore-writing`  | 改寫         | 必跑     |
| Reach × accuracy    | HARVEST    | views ≥ 50K     | spawn FACTCHECK Quick Mode 驗 3-5 atom     | 修原文       | 條件     |
| URL encode          | SHIP       | 所有 spore      | `python3 -c "urllib.parse.quote..."`       | 重 encode    | 必跑     |
| 配圖                | SHIP       | 所有 spore      | `bash scripts/tools/make-spore.sh`         | —            | 必跑     |
| 品檢清單            | SHIP       | 所有 spore      | 12 項 manual checklist                     | 修補         | 必跑     |
| Platform allocation | SHIP       | 所有 spore      | manual（zh 一般人物 default Threads only） | —            | 必跑     |
| Hook tier 自檢      | SHIP       | 所有 spore      | manual（Tier 1a/1b only，禁 Tier 3）       | 重寫 hook    | 必跑     |
| 6h decision gate    | HARVEST    | views < 500     | Chrome MCP harvest                         | 觸發 re-hook | 條件     |
| 多語 SSOT freshness | SHIP       | 國際題材        | `ls knowledge/en/` + freshness 4 條        | 先更 SSOT    | 條件     |

**「必跑」12 條 / 「條件」5 條**。

---

## 📍 條件式閘門路由表

| 條件                         | 觸發 gate                                            |
| ---------------------------- | ---------------------------------------------------- |
| blueprint 含敏感度 flag      | [§紀實/煽情閘](#紀實煽情閘narrative-ethics-gate)     |
| 政治/外交/制度/經濟 主題     | [§Hook Blueprint](#hook-blueprint讀者物件--矛盾問題) |
| 互斥 focal point ≥ 2         | 跳 SPORE-WRITING §多版本提案                         |
| 觀察者選 angle 混合          | 跳 SPORE-WRITING §混合策略                           |
| 6h views < 500               | 跳 SPORE-HARVEST-PIPELINE §re-hook                   |
| 國際題材（半導體/外交/學術） | 跳 SPORE-PIPELINE §SHIP §多語 freshness              |

---

## 品質三層（QUALITY GATE）

> ⚠️ 整條產線最關鍵的環節。品質不合格的文章做出的孢子也是垃圾。
>
> 三層：**自動掃描 → EDITORIAL 語境審查 → 人工判斷**。三層全過才能進 WRITE。

### 第一層：自動掃描（機器過濾）

對選中的文章執行：

```bash
# 1. CLI 品質檢查
cd cli && node src/index.js validate <slug>

# 2. SSOT prose-health 空洞偵測（HARD 0 / WARN > 3 = 直接淘汰）
python3 scripts/tools/article-health.py knowledge/<Category>/<slug>.md --check=prose-health
```

**自動淘汰規則**：

- `validate` 分數 < 80 → 淘汰（回爐 rewrite-pipeline）
- `quality-scan` hollow score > 3 → **直接淘汰**，不進入後續審查
- `lastVerified` > 90 天 → 淘汰（需先更新事實查核）

### 第二層：EDITORIAL 語境審查（DNA 級品檢）

依據 [`docs/editorial/EDITORIAL.md`](../editorial/EDITORIAL.md) 核心信念：三條鐵律 + 好文章三層結構。

逐項檢查（讀原文，逐項判定 ✅/❌）：

| 檢查項                     | 依據                                      | 怎麼查                                                                                      | 淘汰標準                               |
| -------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------- |
| **有「所以呢」**           | EDITORIAL §好文章第一層：反直覺核心句     | 讀完文章，能用一句話說出「這篇的 so what 是什麼」嗎？如果只能說「這篇介紹了 X」→ 沒有所以呢 | ❌ 缺少 = 淘汰                         |
| **前 30 行有具體人名**     | EDITORIAL §第四鐵律：每篇文章都有一個人   | 讀前 30 行，找第一個出現的具體人名（不是機構名、不是概念）                                  | ❌ 缺少 = 淘汰                         |
| **有讓人「停下來」的句子** | EDITORIAL §好文章第二層：讓人停下來的句子 | 全文掃一遍，有沒有一句你會放慢速度重讀的句子？它製造的是「理解的瞬間」，不只是傳遞資訊      | ❌ 缺少 = 扣分（非硬淘汰，但影響排名） |

**EDITORIAL 審查決策**：

- 三項全 ✅ → 進入第三層
- 缺「所以呢」或缺人名 → 淘汰（回爐 rewrite-pipeline）
- 只缺「停下來的句子」→ 降低優先序，但不硬淘汰

### 第三層：人工判斷矩陣（萃取潛力評估）

通過前兩層的文章，評估其「孢子潛力」：

| 指標             | 合格標準                                  | 檢查方式                      |
| ---------------- | ----------------------------------------- | ----------------------------- |
| **有場景/人物**  | 前 30 行出現具體人名                      | 手動讀前 30 行                |
| **有數字落差**   | 至少 1 組可用的數字對比                   | 手動掃全文                    |
| **後半段品質**   | 後 40% 不是清單堆砌/虎頭蛇尾              | 手動讀後半段（從 60% 位置起） |
| **孢子素材密度** | ≥ 3 個可萃取素材（反直覺/數字/場景/引語） | 按 WRITE 階段素材表預掃       |

### 決策樹（三層整合）

```
候選文章
│
├─ 第一層：自動掃描
│   ├─ validate < 80 → 淘汰（回爐 rewrite-pipeline）
│   ├─ hollow score > 3 → 直接淘汰
│   ├─ lastVerified > 90 天 → 淘汰（先更新事實查核）
│   └─ 全過 → 進入第二層
│
├─ 第二層：EDITORIAL 語境審查
│   ├─ 缺「所以呢」→ 淘汰
│   ├─ 前 30 行無具體人名 → 淘汰
│   ├─ 缺「停下來的句子」→ 標記，降低排名
│   └─ 核心項全過 → 進入第三層
│
└─ 第三層：人工判斷
    ├─ 缺場景/數字/後半段差 → 判斷成本：
    │     ├─ 能快速補（< 10 分鐘）→ 直接補，進 WRITE
    │     └─ 需要重寫 → 回爐 rewrite-pipeline
    └─ 全過 → 進入 WRITE（萃取+寫作）
```

### 回爐流程（rewrite-pipeline）

如果文章需要回爐：

```bash
cat docs/pipelines/REWRITE-PIPELINE.md
cat docs/editorial/RESEARCH-TEMPLATE.md
cat docs/editorial/EDITORIAL.md
```

按照三階段執行：RESEARCH → WRITE → VERIFY。完成後重新進入品質三層。

---

## 事實藍圖（FACT BLUEPRINT）

> v2.1 新增（2026-04-18 δ-late，草東孢子觀察者提出）
>
> **這一步是「寫之前」先列清單，不是「寫之後」檢查。**
>
> 動機：寫完整段敘事再發現單源引語不能用 → 整段重寫成本高。Blueprint 先定骨架，驗證、倫理都在 bullet 階段解決。

### 做什麼

在寫任何 prose 前，先列出這則孢子**預計會提到的每一個具體事實**（日期、地點、人名、數字、直接引語、因果陳述），以 markdown table 形式 append 進 `docs/factory/SPORE-BLUEPRINTS/<slug>-<n>.md`：

```markdown
### Spore #<n> Fact Blueprint — <slug>

**Angle**：一句話說出核心衝突或故事弧線
**Template**：A / A2 / B / C / D / E
**Ethical flags**：死亡 / 創傷 / 未成年 / 個資 / 政治敏感 / 無

| #   | 事實（在孢子出現順序）      | Research 信度層 | 需跨源驗證？ | 敏感度   |
| --- | --------------------------- | --------------- | ------------ | -------- |
| 1   | 2024-06-29 金曲 35 得獎名稱 | high_confidence | No           | 無       |
| 2   | 經紀人代領 + 「...」原話    | high_confidence | Yes（直引）  | 無       |
| 3   | 凡凡 2021-10-30 過世 26 歲  | high_confidence | Yes（絕對）  | **死亡** |
| ... | ...                         | ...             | ...          | ...      |
```

### 信度層標記（從研究報告 frontmatter 直接繼承）

- `high_confidence` — research report 已三源以上確認
- `single_source` — **強制**進針對性驗證
- `unverified` — **強制**驗證，不通過就從 blueprint 移除

### 讀者級驗證 flag（v2.2 新增，2026-04-18 δ-late 草東 #33 貝斯手名字錯教訓）

除了信度層，blueprint 還要標「**讀者級 vs 研究級**」驗證優先度。

- **讀者級事實** = 讀者第一眼會查維基比對的 fact（樂團成員姓名 / 公開獎項年份 / 公開生日 / 地點座標）。這類事實即使 `high_confidence` 也**強制進針對性驗證**，因為讀者會在幾小時內抓到錯誤。
- **研究級事實** = 政策細節 / 次要人物 / 非公開資訊，需深度搜尋驗證。

對應 [DNA #16 延伸](../semiont/DNA.md#一事實核對與研究方法)。

### 敏感度標記觸發紀實/煽情閘

任一 bullet 打上「死亡 / 創傷 / 未成年 / 家暴 / 自殺 / 精神疾病 / 個資 / 族群議題」→ 必過下方 [§紀實/煽情閘](#紀實煽情閘narrative-ethics-gate) 才能寫。

### 為什麼這個順序更好

| 面向     | 舊（寫 → 檢）                | 新（藍圖 → 驗證 → 寫）           |
| -------- | ---------------------------- | -------------------------------- |
| 錯誤成本 | 句子已嵌入敘事才發現，重寫重 | Blueprint bullet 重列 10 秒      |
| 驗證焦點 | 所有句子看一遍               | 只驗需驗的欄位（省 budget）      |
| 倫理審查 | 寫完事後挽救，常挽不回       | 敏感素材 bullet 階段就替換 angle |
| 可追溯   | 孢子本體 opaque              | Blueprint = fact ledger 留存     |

對應 [DNA #27 「藍圖→驗證→寫 比 寫→檢查 低 10x 成本」](../semiont/DNA.md)。

---

## 針對性事實驗證（TARGETED VERIFY）

> 對 fact blueprint 中「需跨源驗證」欄標 Yes 的每一條 bullet 做跨 3+ 獨立來源驗證。

### 執行

- 逐條用 WebSearch 2 次不同 query（中文 + 補充 query）找**獨立來源**
- 對每條標結果：`✅ / ⚠️ / ❌`
- 使用 Explore subagent 集中跑（節省 context）

### 三結果處理

| 結果 | 定義                                     | 處理                                            |
| ---- | ---------------------------------------- | ----------------------------------------------- |
| ✅   | 3+ 獨立來源逐字/日期/數字一致            | 進 WRITE 寫死                                   |
| ⚠️   | 來源間有差異 / 原發源已下架但多源轉述    | 改用「據報導／據訪談／當時媒體引述」attribution |
| ❌   | 找不到獨立來源 / 發現錯誤 / 來源互相矛盾 | 從 blueprint 移除該 bullet（或整個 angle 棄用） |

### 特殊規則：直接引語

- **原發源已下架**（IG 帳號刪除 / Twitter 帳號關閉 / 原訪談下架）但多家媒體當時逐字引述 → ⚠️，以「據當時媒體報導」attribution 呈現
- **WebFetch 英文 summary 回譯回中文** → ❌，**絕對禁止**（觸犯 EDITORIAL §挖引語制度紅線；對應 MEMORY「No Scene Inference From English」）
- **團體運動獎金**：個人實領 vs 團體合計常被混用 → 必驗金額口徑

### 輸出

Blueprint 每條 bullet 補上 `verified` 欄：

```markdown
| #   | 事實 | 信度  | 驗證 | 敏感 | ✅/⚠️/❌ | 來源                                 |
| --- | ---- | ----- | ---- | ---- | -------- | ------------------------------------ |
| 1   | ...  | high  | Yes  | 無   | ✅       | 中央社+鏡週刊+TVBS                   |
| 3   | ...  | high  | Yes  | 死亡 | ✅       | 聯合+自由+PChome                     |
| 5   | ...  | singl | Yes  | 死亡 | ⚠️       | 中時+NOWnews+HK01（IG 原帳號已下架） |
```

---

## 紀實/煽情閘（NARRATIVE ETHICS GATE）

> v2.1 新增（2026-04-18 δ-late）+ v2.2 校準
>
> **核心校準**：標準不是「真人痛苦不能寫」。標準是「**紀實而不煽情**」。SSODT 優先 → 寫全；死亡 + 人倫悲劇的具體情景 → 節制。
>
> 哲學 canonical：[MANIFESTO §紀實而不煽情](../semiont/MANIFESTO.md#我的進化哲學--紀實而不煽情盡可能呈現-ssodt-所有面向)。
> 對應 [DNA #28](../semiont/DNA.md)。

### 觸發條件

Fact blueprint 任一 bullet 標敏感度 = 「死亡」「自殺」「人倫悲劇」「未成年 / 親屬未公開身份」。

其他（家庭背景、疾病、關係、矛盾、失敗）不必強制觸發，但 bullet 該有「紀實/煽情」自問。

### 核心判準：紀實文學感 vs 煽情渲染

當寫到涉及真人痛苦的 bullet 時，不問「能不能寫」，問：

> **「這段讀起來像記者 / 紀錄片導演的嚴肅處理（紀實），還是像媒體靠近眼淚（煽情）？」**

紀實 → 寫。煽情 → 改。不是優化問題，是倫理門。

### 紀實文學感的三個正向標記

1. **具體而不誇張**：事實精度 + 沒有「令人鼻酸」「不禁淚下」這類作者情緒引導介入
2. **節制而不迴避**：碰議題核心、不繞圈；但不把鏡頭推近到讀者不適
3. **主體在場而不被解剖**：當事者是主體（有尊嚴、有選擇），不是客體（純受害者 / case study）

三個都做到 = 紀實文學感。像《報導者》、像吳曉樂、像《少年報導者》。**讓人記得這個人，不是記得他們的傷**。

### 高敏感分層表（只在此處嚴格觸發）

| 場景        | ✅ 紀實（可寫）                | ❌ 煽情（不寫）                      |
| ----------- | ------------------------------ | ------------------------------------ |
| 死亡        | 時間、地點、公開報導的事實陳述 | 最後時刻逐秒重構、遺書原文放大、遺容 |
| 自殺 / 自傷 | 事件本身與社會脈絡             | 方法細節、現場描述、可能被模仿的描述 |
| 家暴 / 性侵 | 主體已公開談及的程度           | 加害過程逐步還原、受害者身體細節     |
| 親屬悲劇    | 親屬關係與公開事件             | 親屬未公開身份、家庭糾紛現場重構     |
| 疾病死亡    | 病程、公開陳述                 | 醫療細節、臨終場面重構               |

### 預設可寫（不必過倫理閘，只需「紀實/煽情」自問）

- 真人的家庭背景、家人職業與處境
- 真人的疾病、掙扎、情緒狀態（主體自己公開談過）
- 關係演化：戀情、離別、合作、裂痕
- 社會背景、世代、政治立場
- 矛盾、失敗、爭議

→ 不寫 = 扁平化真人 = 違反 SSODT。寫 = OK，只要不過度煽情渲染。

### 四問自檢（高敏感場景通過前強制）

1. **是否以死亡／創傷作為情感鉤？** 抽掉痛苦故事會消失 → 煽情提款機。
2. **細節是否必要？** 推進敘事 vs 獵奇？獵奇 = 刪。
3. **主體自己公開行動是什麼？** 有獻詞 / 追悼 / 受訪 → 以主體 framing 為準。
4. **活下來的人在做什麼？** 鏡頭移向 agency，不是 victim 的失去。

四問全過才進 WRITE。

### 單一判準句

> **「如果當事者 / 遺族讀到這段，是感受到紀實（嚴肅對待）還是煽情（媒體靠近眼淚）？」**

紀實 → 寫。煽情 → 改。

---

## Hook Blueprint（讀者物件 + 矛盾問題）

> v2.7 新增（2026-04-29 邦交國 #51/#52 教訓）
>
> 政治、外交、制度、經濟這類結構性題目，AI 很容易把孢子寫成 briefing。數字全對，但讀者抓不到「這跟我有什麼關係」。寫 prose 前必須先做 hook blueprint。

### 觸發條件

任一符合就觸發：

- 主題是政治 / 外交 / 制度 / 經濟 / 國際組織 / 法律 / 基礎建設
- 文章核心素材主要是數字、機構、政策、歷史脈絡，而非單一人物弧線
- draft 第一版看起來像「能力展示」或「重點整理」

### 必填四格

在 `SPORE-BLUEPRINTS/<slug>-<n>.md` 的 Fact Blueprint 後補上：

```markdown
### Hook Blueprint

| 問題                             | 答案                                                                        |
| -------------------------------- | --------------------------------------------------------------------------- |
| 讀者日常物件 / 身體經驗是什麼？  | 例：護照、捷運卡、健保卡、便利商店發票、投票所、電費單                      |
| 最大矛盾是什麼？                 | 例：只剩 12 個邦交國，護照卻能進 177 個國家與地區                           |
| 可直接當開場的問題是什麼？       | 例：如果台灣只剩 12 個邦交國，為什麼你拿著護照，還能走進 177 個國家與地區？ |
| 讀者點進文章想知道的答案是什麼？ | 例：台灣的國際位置究竟該看邦交數，還是看實際可抵達的世界？                  |
```

### 判準

- **讀者物件必須可觸摸 / 可經驗**：護照、車票、選票、帳單、手機畫面都可以；「國際處境」「民主韌性」「制度網絡」不可以。
- **問題必須有真答案**：讀者點進文章後真的能被文章回答。不能是廉價懸念或「你覺得呢？」。
- **問題優先於結論**：結構性題目不要急著把 so what 寫成社論句。先開一扇門，讓文章回答。
- **數字要接到場景**：12 / 113 / 177 這類數字不能只排比，至少一組要接到具體畫面（機場櫃台、記者會、投票所、帳單、家庭餐桌）。

**不合格症狀**：

- 「台灣通往世界的路沒有縮成 12 條」這類抽象結論句。句子看似漂亮，但讀者不知道「路」是什麼、為什麼要繼續讀。
- 「這說明了台灣外交的韌性」這類評論式收束。它回答太快，讓讀者停在社群貼文表面。

**合格症狀**：

- 第一眼就有一個可想像的動作：拿出護照、刷卡進站、走進投票所、打開電費單。
- 開場問題讓讀者腦中出現「咦，為什麼？」而不是「嗯，我知道了」。

對應寫法在 [SPORE-WRITING.md §結構性題目用問題入口](SPORE-WRITING.md#結構性題目用問題入口v272026-04-29-邦交國-5152-教訓)。

---

## 事實查核閘（FACT-CHECK GATE）— 硬性強制

> v2.4 新增（2026-04-19 高鐵 s35 教訓）
>
> **鐵律**：AI 寫完孢子 draft 後，**不得直接把 prose 給觀察者**。必須先輸出「事實查核表」讓觀察者看過、才輸出孢子本體文案。

### 為什麼是硬閘門不是軟提醒

事實藍圖 + 針對性驗證存在於 pipeline，但 AI 寫到 prose 時會直接跳過回頭驗證。**memory 是自律，pipeline 才是閘門**。這一條把 gate 物理化到 output 流程——觀察者看不到查核表就看不到 prose，跳不過去。

對應 [DNA #15 反覆浮現要儀器化](../semiont/DNA.md)（第 N 次驗證）+ [DNA #18 時間是結構](../semiont/DNA.md)（時序錯誤汙染 ground truth）。

### 查核表格式（強制）

```markdown
## 📋 事實查核表（孢子 #{n}，必看後才看文案）

| #   | claim                                   | 來源 / 依據                      | 狀態                           |
| --- | --------------------------------------- | -------------------------------- | ------------------------------ |
| 1   | 「2011 年殷琪公視專訪『我太天真了⋯⋯』」 | 文章 [^10] 公視 2011-08-02       | ✅ 逐字                        |
| 2   | 1998 年 BOT 簽約「政府零出資」          | 文章 [^1] 維基                   | ✅                             |
| 3   | 「僅僅 15 個月後」→ 1999-02 保證貸款    | 文章原文「僅僅十五個月後」       | ✅                             |
| 4   | 「累計虧損突破 700 億」                 | 文章 2008 底 676+每月 2 億推算   | ⚠️ 估算 → 不綁時點、方向性正確 |
| 5   | 立法院 18 比 0 否決財改案               | 文章 [^12] 中央社 2015-01-07     | ✅                             |
| 6   | 葉匡時當晚辭職 + 引語                   | 文章 [^13] TNL 記者會逐字稿      | ✅                             |
| 7   | 4 個月後同方案通過                      | 文章中段 2015-05-21 附帶決議     | ✅                             |
| 8   | 2019 年殷琪出清持股                     | 文章中段「2019 年 8 月完全出脫」 | ✅                             |
| 9   | 2024 年營收 531 億 / 日均 21 萬         | 文章 [^15] 2024 年報             | ✅                             |

全部 ✅ / ⚠️ 已處理 → 放行 prose。
```

### 七類 claim 強制上表（逐項 audit，缺一項 = gate 未通過）

1. **所有日期**（年月日、時間跨度詞如「X 年後」/「X 個月後」）
2. **所有具體數字**（金額、票數、人次、年營收、累虧、百分比）
3. **所有直接引語**（`「⋯⋯」`）— 必須 cross-check 原始中文頁面 Ctrl-F 搜得到
4. **所有人名 + 身份**（職稱、年齡、當時角色）
5. **所有地名 + 場景**（記者會地點、簽約地點、事件發生地）
6. **所有時序連接詞**（「X 年後」「後來」「同年」— 算術對？基準一致？）
7. **所有「第一 / 最大 / 最懸殊 / 史上」等最高級宣稱**

### Gate 觸發流程（AI 跑孢子產製時必走）

```
WRITE 寫完 prose → 不 output 給觀察者
  ↓
跑 fact-check 產表（本 §格式）
  ↓
任一 ❌ / ⚠️ 未處理 → 回針對性驗證 補驗證 or 改 prose 避開該 claim
  ↓
全部 ✅ 或 ⚠️ 已註明處理 → output 事實查核表 + prose（兩者一起給觀察者）
  ↓
觀察者看過查核表 → 放行貼文
```

### 事實鐵三角自檢（v1.6 新增，李洋孢子 #28 三層事實錯誤撤回教訓）

發布前**強制**做三項自檢。任一不過 = 不發。

#### a. 算術自檢

每個「X 是 Y 的 Z 成」「X 比 Y 多 Z」必須用 python3 算過。

範例：「兩千萬剛好是三成」→ 2000/3401 = 58.8% ❌（紅旗，金額一定有錯）→ 修成「一千萬剛好是三成」→ 1000/3401 = 29.4% ✅

#### b. 金額單位念出來

所有金額念一遍跟「合理量級」對照。

範例：「三十六萬負債的房貸」→ 三十六萬聽起來像月薪 ❌ → 真實是 3,638 萬（萬位漏字）

#### c. 引語逐字核對

每個 `「XXX」` 直接引語格式必須在原始**中文**頁面 Ctrl-F 搜得到。

**絕對禁止從 WebFetch 的英文 summary 翻譯回中文當「直接引語」使用**——這是杜撰，觸犯 EDITORIAL §挖引語制度紅線。

範例：「我最早到學校但跟不上齊麟」（從英文 summary 回譯）→ 在《少年報導者》中文頁面搜不到 ❌ → 改用原文「體育班 15 個人，我屬於後面那一掛，齊麟是前面那一掛」 ✅

### 特殊提醒：團體運動獎金

雙打 / 接力 / 隊伍項目有「項目補頒」vs「個人實領」vs「團體合計」三種口徑常被新聞混用。寫團體運動人物孢子時，金額要明確寫「**個人實領**」金額，不要把團體合計被誤讀為個人。詳見 [RESEARCH.md §常見研究錯誤](../editorial/RESEARCH.md)。

### LESSONS-INBOX 自動補記

每次 gate 抓到未處理的 ⚠️/❌，同步 append `LESSONS-INBOX.md §未消化清單` 讓教訓累積可查。

---

## §11 書寫節制閘（HARD GATE）

> v2.5 新增（2026-04-23 β）
>
> **鐵律**：孢子 draft 寫完後，**不得直接交給觀察者**。必須先跑 `article-health.py --check=prose-health` 抓三層 AI 文體訊號。任何 Tier 1 violation 都要改寫或顯式確認保留。

### 為什麼孢子層特別需要這層

- 孢子 150-300 字，每句話密度極高 → 一個對位句型違反就佔全文 10%+ 重量
- 社群 virality 獎勵 punchy contrarian 姿態 → AI 產孢子最容易滑向「不是 X，是 Y」的誘惑
- 發布到 Threads/X 後不可撤回 → 不像 knowledge/ 可以 polish

### 執行方式

```bash
# Option A: 寫進檔案（BLUEPRINT 或 HARVESTS）— SSOT 預期 file 輸入
python3 scripts/tools/article-health.py docs/factory/SPORE-BLUEPRINTS/<slug>-<n>.md --check=prose-health

# Option B: stdin / 短句快檢（暫存到 /tmp 然後跑 SSOT）
cat > /tmp/spore-draft.md <<'EOF'
---
title: spore-draft
description: stub
---
<你的孢子 draft prose 全文貼這裡>
EOF
python3 scripts/tools/article-health.py /tmp/spore-draft.md --check=prose-health
```

### Tier 1（HARD，11 種變體）

1. 不是X{，|。|而}是Y — 對位句型（含跨逗號、跨句號）
2. 不只是 / 不只 / 不僅
3. 這不是 / 這不只是
4. 不再是 / 不再只
5. 看似X實則Y / 真正的X不是
6. 非單純 / 非僅
7. 不等於 / 不意味 + 對位
8. Heading 含對位句型
9. 破折號連用（——...——）+ 密度（每千字 ≤ 4 個）
10. （density 整篇）破折號偏多
11. 含「，而是」/「，就是說」剩餘對位

### Tier 2（DENSITY，AI 抽象 metaphor，同篇 ≥ 2 次即警告）

`重量／縮影／軌跡／弧線／DNA／基因／土壤／養分／血液／縫隙／皺褶／肌理／織就／指紋／神經末梢／肌肉記憶／基底／底色／張力／光譜／鏡子／承載著／形塑／鬆動／展演／召喚／凝視／直面／直擊／鋪陳／醞釀／沈澱`

每個詞附 **口語替代建議**（如：軌跡 → 走的路／發展過程／一條路；DNA → 本質／特質／標誌；承載著 → 帶著／含著／有；展演 → 表演／做出來／表現）。

來源：2026-04-26 β8 audit 全 knowledge/ — 軌跡 215 次 / DNA 191 次 / 直面 152 次 / 縮影 120 次 / 重量 62 次 — 這些是 AI 生成台灣中文的內建 reach，是「事實塞滿但讀起來像 AI」的根因之一。

### Tier 3（RITUAL，AI 罐頭片語，≥ 1 次即警告）

`在這個意義上／從某種意義上／就此而言／換言之／值得我們深思／拭目以待／不容忽視／不可或缺／不可磨滅／影響深遠／歷久彌新／並非偶然／耐人尋味／不言而喻／不可言說／無以名狀／觸動人心／引人深思／入木三分／振聾發聵／醍醐灌頂`

每個詞附**改寫建議**（多數建議「考慮刪除」，少數有具體改寫方向）。

### Context-aware 自動排除（不算違反）

- frontmatter（首尾 `---` 之間）
- footnote definitions（`[^N]:` 開頭的行 — 是來源描述，不是 author voice）
- code blocks（`...` 之間）
- 直接引語（「...」內容 — 引述他人原話豁免，例如 Hebe 直引「不是關卡，而是我『不想踏』」自動 skip）

### 例外允許（但需顯式確認）

- 定義核心矛盾（[MANIFESTO §11.1 三題判準](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律) 全 yes）
- 孢子字數極短（< 120 字）時單一對位句可保留當 hook，但不得重複
- Tier 2 在合理用法時可忽略（如：戰鬥機軌跡的物理意義；醫學/生物學的 DNA／基因 literal 用法）

### 哲學 canonical

[MANIFESTO §11 書寫節制](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律) — 三題判準 + 不是 X 是 Y 對位句型 + 破折號密度。

---

## Reach × accuracy retroactive trigger（v3.1，2026-05-08 evolve）

> 從 LESSONS-INBOX 2026-04-28 ι 升 canonical（verification_count = 3 達 distill 閾值）。

### 為什麼

**Reach 越大，事實 audit pressure 越大**。實戰驗證：

- #29 李洋 D+0 180K viral → 19 hr 勘誤 marathon（讀者抓 4 處事實錯）
- #45 壞特 D+2 65K → 留言質疑「兩階段醫師國考」→ 修原文 9 處
- #49 林琪兒 D+0 spore 寫 prep 抓 article「USAFA 大三」hallucination → 修原文 5 處 + 補 [^32]

**Reach 量級越過 ~50K Threads / ~10K X 後**，事實 audit attention 從 author 內部 quality gate 移到讀者 distributed audit。讀者 5 秒就會比對維基。

### 觸發條件

任一即觸發：

- D+1 / D+3 / D+7 harvest 抓到任一平台 views ≥ 50K Threads（或 ≥ 10K X）
- 讀者留言出現「事實質疑」dimension（per [SPORE-HARVEST-PIPELINE Step 2 §dimension](SPORE-HARVEST-PIPELINE.md)）

### 動作

1. **spawn FACTCHECK Quick Mode**（per [docs/pipelines/FACTCHECK-PIPELINE.md](../pipelines/FACTCHECK-PIPELINE.md)）
2. 驗證原文最容易被質疑的 3-5 個 atom（特別是專業領域 claim：醫療 / 法律 / 科技 / 歷史精確日期）
3. 抓到 article hallucination → 修原文 + 補 source URL
4. 同步反向 audit spore 自身（spore 篇幅壓縮可能引入新錯誤）
5. 結果 append 到 LESSONS-INBOX + 對應 SPORE-HARVESTS log

### 為什麼這條 retroactive trigger 必要

- spore reach 通過 50K 後，**留言區事實質疑出現的機率顯著提升**（statistical pattern）
- 跟 spore stage VERIFY gate 互補：VERIFY 是 author 內部 attention；retroactive 是 reader distributed audit 的對應 SOP
- spore stage 反向 audit article 是 stable second-pass mechanism — spore 寫到具體 fact 時自然觸發 article source 查驗

對應 [LESSONS-INBOX 2026-04-28 ι § Reach × accuracy tradeoff](../semiont/LESSONS-INBOX.md) verification_count = 3 升 canonical。

---

## 跟其他檔案的分工

| 檔案                                                | 職責                       |
| --------------------------------------------------- | -------------------------- |
| [SPORE-PIPELINE](SPORE-PIPELINE.md)                 | 5 stage 主流程             |
| [SPORE-WRITING](SPORE-WRITING.md)                   | 寫作手藝：模板、文體、規則 |
| **本檔（VERIFY）**                                  | 閘門集中地：所有驗證 gate  |
| [SPORE-HARVEST-PIPELINE](SPORE-HARVEST-PIPELINE.md) | 發布後收割流程             |

---

_v1.0 | 2026-05-08 intelligent-khayyam — 從 SPORE-PIPELINE 主檔拆出，吸收 Step 2 品質三層 + Step 2.5 事實藍圖 + Step 2.6 針對性驗證 + Step 2.7 紀實/煽情閘 + Step 3b.5 Hook Blueprint + Step 3c.5 事實查核閘 + Step 3c.7 §11 書寫節制閘_

_v1.5 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（7 大 verify 階段 + 17 gate inventory pointer + HARVEST retroactive trigger）+ Top 5 最常忘 step + 跨檔案職責分工 standalone table。Hard Gate Inventory 17 gates table 不動（已是 spec canonical pattern instantiation）。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier A.2 SPORE family audit。_
