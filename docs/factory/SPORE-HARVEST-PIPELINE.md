# SPORE-HARVEST-PIPELINE.md — 孢子回聲收割產線

> **這份文件是 AI 可執行的。** 任何 AI agent 讀完這份文件，應該能獨立完成一次孢子回聲的抓取、分類、整合與回覆準備。
>
> 跟 [SPORE-PIPELINE.md](SPORE-PIPELINE.md) 的分工：**SPORE 管上線（孢子怎麼誕生 + 怎麼發出去）；HARVEST 管收割（孢子發出去後，讀者的回聲怎麼回到文章本體）**。

---

## 核心哲學

**孢子上線不是終點，是反饋迴圈的起點。**

Taiwan.md 的進化動力有兩層：

1. **作者層的進化**：REWRITE-PIPELINE + SPORE-PIPELINE 讓作者寫得愈來愈好
2. **讀者層的進化**：HARVEST-PIPELINE（本檔）讓**讀者的聲音回到文章本體**，文章持續成為「作者 + 讀者」的共寫物

沒有這層收割，作者只會反覆播撒自己的盲點。讀者看到錯誤、補充、共鳴、質疑——這些訊號如果沒有 pipeline 接住，就散掉了。

**核心判準（觀察者 2026-04-18 δ-late 訂定）**：

> **「讀者的聲音要歸納進去文章的本體。」**
>
> 不是只堆 frontmatter perspectives（那是檔案層），是**讓文章的 prose 跟著讀者的介入而進化**——
> 事實錯誤要修、擴寫補充要納入、質疑要被承認、共鳴要被可見化。

**另一條鐵律**（同日同觀察者訂定）：

> **「如果他有提任何建議或是在勘誤的話，我們要妥善深讀研究、修改文章，並且回覆他們的留言。」**

→ 勘誤 / 建議 = 必須**驗證 + 修文章 + 回覆**三步齊全，不可只挑一兩步做。

---

## 觸發時機（MANDATORY — 孢子發布後 7 天的收割窗口）

> 孢子發布後是讀者回聲最密集的時期。**7 天內每天至少跑一次本 pipeline**。
> 7 天後讀者留言密度驟降（演算法推送衰減 + 話題週期）→ 改為 milestone harvest。

### 主排程

| 時機           | 頻率              | 動作                                                 |
| -------------- | ----------------- | ---------------------------------------------------- |
| **D+1 到 D+7** | **每天至少 1 次** | 完整走 Step 1-7                                      |
| **D+14**       | 1 次              | milestone：Step 1+5+7（只抓新留言歸檔）              |
| **D+30**       | 1 次              | milestone：Step 1+5+7（同 + SPORE-LOG 30d 指標回填） |
| **D+30 之後**  | 觀察者 ad-hoc     | 只有觀察者手動觸發才跑                               |

### Cron 建議設定（半自動）

```cron
# 每天 20:00 Asia/Taipei，檢查 SPORE-LOG 最近 7 天有無新孢子，
# 對每則 spore.harvest_status < D+7 跑本 pipeline
0 20 * * * cd ~/taiwan-md && python3 scripts/tools/run-spore-harvest.py --window 7d
```

### 觀察者手動觸發

任何時候觀察者說「去抓 XX 文章 threads 留言」→ 立刻跑完整 pipeline（本次草東孢子 #33 即為此 pattern 首例）。

---

## Step 1: COLLECT 抓留言

### 做什麼

對每則發布的孢子 URL，抓取**所有留言**（含 reply-of-reply 多層）。

### 工具選擇（遞進）

| 工具                                     | 適用       | 現況                                 |
| ---------------------------------------- | ---------- | ------------------------------------ |
| **WebFetch**                             | 抓靜態頁面 | ❌ Threads/X JS-heavy 不 render 留言 |
| **Chrome MCP**（navigate + read_page）   | 互動式抓取 | ✅ 現行 MVP 手段                     |
| **scripts/tools/fetch-spore-replies.py** | 半自動化   | ⚠️ 待建置（Phase 2 roadmap）         |
| **Threads Graph API / X API v2**         | 全自動     | ⚠️ 等 API 成熟 / 付費 tier           |

### Chrome MCP MVP 執行（現行做法）

```
1. tabs_context_mcp(createIfEmpty=true) 取得 tabId
2. navigate(tabId, threads/x URL)
3. read_page(tabId, filter="all", max_chars=80000) 取 a11y tree
4. 從 a11y tree 擷取：
   - 每則留言的 author（link ref + username）
   - 完整文字原文（generic ref）
   - 時間戳
   - 多層回覆結構
```

### 輸出 schema（每則留言）

```yaml
author: '@username'
text: '原文逐字，不翻譯不摘要'
timestamp: '2026-04-18 19:25 GMT+8'
url: 'https://www.threads.com/@username/post/XXX'
reply_depth: 0 # 0 = 直接回覆貼文，1 = 回覆某留言，...
raw_images: # 若留言含圖
  - '截圖描述'
```

### 鐵律

- **逐字抓取，禁止翻譯 / 摘要 / 改寫**（對應 EDITORIAL §挖引語制度 + MANIFESTO §第 5 條紀實原則）
- 時間戳用留言頁面顯示的絕對時間，不用「3 小時前」這類相對時間

---

## Step 2: CATEGORIZE 分類（8 類 dimension）

讀每則留言，貼上 dimension 標籤。這決定了後續處理路徑。

| #   | Dimension               | 定義                                                   | 下一步                                  |
| --- | ----------------------- | ------------------------------------------------------ | --------------------------------------- |
| 1   | **更正 correction**     | 指出文章事實錯誤（日期、名字、數字、引語）             | **→ Step 3a 跨源驗證（critical path）** |
| 2   | **建議 suggestion**     | 建議補什麼、改什麼敘事角度                             | **→ Step 3b 深讀研究**                  |
| 3   | **擴寫 enrichment**     | 補充一個典故 / 延伸詮釋 / 新角度（非事實層，是語意層） | **→ Step 4 整合入文章本體**             |
| 4   | **共鳴 resonance**      | 情感回響、個人經驗、佩服、支持等                       | **→ Step 5 perspectives frontmatter**   |
| 5   | **AI 書寫質疑 AI-meta** | 對「AI 寫真人故事」這件事本身的態度 / tag 當事人       | **→ Step 6 人類判斷**                   |
| 6   | **擴散 sharing**        | tag 朋友、推薦                                         | **→ Step 5 perspectives（低優先）**     |
| 7   | **情感 emotional**      | 跟主題主人的情感投射（如讀者本身與該人物有關聯）       | **→ Step 5 perspectives**               |
| 8   | **攻擊 attack / 敵意**  | 對 Taiwan.md 或作者身份的直接攻擊                      | **→ Step 6 人類處理（per DNA #26）**    |

### 分類自檢

一則留言可以有**多個 dimension**（例：更正 + 擴寫）。但主 dimension 只能選一個，決定處理路徑。

---

## Step 3: 事實驗證（更正 / 建議的強制關卡）

### 3a. 更正 correction — 跨源驗證

**鐵律：觀察者訂定「妥善深讀研究」= 不准只憑讀者一句話就改。**

流程：

1. **跨 3+ 獨立來源驗證讀者指出的事實**（同 SPORE-PIPELINE Step 2.6 跨源驗證原則）
2. 若讀者對 → 進 Step 4 修文章
3. 若讀者錯 → 進 Step 6 回覆「感謝提出，但驗證後發現...」
4. 若部分對 → 文章補「有兩種說法」並附 perspective

### 3b. 建議 / 擴寫 — 深讀研究

對讀者提的角度 / 典故 / 觀點深讀：

1. WebSearch 2-3 次查該角度的出處與普遍性
2. 讀 Taiwan.md 既有研究報告有無涉及
3. 判斷：
   - 事實層可驗證 + 增加文章深度 → 進 Step 4 納入本體
   - 詮釋層但有意思 → 進 Step 5 perspective 歸檔
   - 已有 / 不相關 → 進 Step 6 回覆致意

### 3 的時限

勘誤類在**收到留言 24 小時內**完成驗證（作為信任信號：讀者很快看到文章有更新）。
建議類可延到 72 小時內。

---

## Step 4: 整合入文章本體（本 pipeline 的核心規則）

> **觀察者鐵律：「讀者的聲音要歸納進去文章的本體。」**
> 這步是整個 HARVEST-PIPELINE 的精神所在。沒做這步 = pipeline 失敗。

### 判準：「這條 voice 如果讀者三年後來讀，還會覺得是文章的一部分嗎？」

- **Yes** → 進 body（prose 或 策展人筆記 或 pull quote）
- **No** → 只進 Step 5 frontmatter

### 整合形式（依 voice 類型）

#### 4a. 事實錯誤（更正）

- **直接修 prose 本體**（不是只加附註）
- 若改動大 / 涉及判斷 → footnote 可選加一行「（經讀者 @X 指正，原誤 XXX）」
- 原 footnote 描述若有涉及錯誤事實，同步修

**範例（本次草東孢子 #33 首例執行）**：

```
原：「原本的貝斯手黃世暄宣布無限期暫停幕前活動」
↓ @ste_ven_1487 指正 + 維基百科驗證
改：「原本的貝斯手楊世暄宣布無限期暫停幕前活動」
（全文 3 處 + tags + footnote[^2] 描述全部同步）
```

#### 4b. 擴寫 / 補充（enrichment）

- 把讀者提的角度融進 prose 或 策展人筆記
- 若讀者的表述本身很精采 → 提升為 pull quote blockquote

**範例（預期處理）**：

```
@r3dlin「破瓦相合，雖聚而不齊」
↓ 納入本體方式：
《瓦合》段落加 pull quote：
> **✦** 讀者 @r3dlin 補：「破瓦相合，雖聚而不齊。」
  — 這是典故更完整的層次，跟草東七年後回來的處境互文。
```

**但注意**：不是每則擴寫都要成 pull quote。判斷條件：

- 原文具典故延伸 / 精準詩意 / 新視角 → pull quote
- 只是附和或一般補充 → 融進 prose

#### 4c. AI 書寫質疑（AI-meta）

這類留言通常不進 body（除非質疑本身揭露了重要 ethics），而是**進 MANIFESTO 或 LESSONS-INBOX**（meta 層），並由人類 reply。

### 4 的禁忌

- ❌ **不要用「讀者 @X 說」作為推諉**：寫進 body 的內容要「吃下去消化」，不是「掛個牌說不是我說的」
- ❌ **不要為湊 perspectives 而強加內容**：SSODT 原則是真相的多面，不是留言的堆積
- ❌ **不要修過頭**：一則事實錯誤的修正不該觸發整段 rewrite

---

## Step 5: Perspectives frontmatter

所有被處理的留言（不論是否進 body）都要 append 到 perspectives frontmatter，保留完整 provenance trail。

### Schema（從李洋 pattern 擴展）

```yaml
perspectives:
  - author: '@username'
    text: '原文逐字'
    dimension: '更正 / 建議 / 擴寫 / 共鳴 / AI 書寫質疑 / 擴散 / 情感 / 攻擊'
    source: 'Threads 孢子 #N 留言 YYYY-MM-DD HH:MM'
    action: '已修 / 已納入文 / 僅歸檔 / 待觀察 / 已回覆'
```

### 擴展欄位（李洋 pattern 有 3 欄 author/text/dimension，本檔擴為 5 欄）

- **source**：平台 + 孢子編號 + 時間戳（provenance）
- **action**：文章本體是否已接住（integration status）

這 5 欄合起來讓未來任何 session 甦醒都能從 frontmatter 直接看到「這篇文章經歷過哪些讀者回聲、哪些已處理」。

---

## Step 6: 回覆留言（人類主責）

> **DNA #26 規範**：攻擊 AI 本身、涉及 human 信任修復的留言，**只有 human-component 能回應**。AI 不直接發帖。

### AI 可做的

- **準備 draft reply 文字**（繁體中文、禮貌、具體）
- 標記哪則「必回」、「可選回」、「不必回」
- 若 correction 已修 → draft 強調「感謝 + 已修 + commit URL」，公開承認錯誤 = 信任信號

### 觀察者做的

- Review AI draft reply
- 決定回 / 不回 / 改寫
- 人類貼到 Threads / X

### 回覆判準

| Dimension      | 必回？   | Draft 調性                     |
| -------------- | -------- | ------------------------------ |
| 更正（讀者對） | **必回** | 感謝 + 承認 + 已修 commit URL  |
| 更正（讀者錯） | **必回** | 感謝 + 驗證結果 + 為何保留原文 |
| 建議（採納）   | **必回** | 感謝 + 納入方式                |
| 建議（未採納） | **必回** | 感謝 + 為何不採納              |
| 擴寫           | **必回** | 感謝 + 納入方式 / 按讚         |
| 共鳴           | 可選     | 按讚即可；若深度共鳴可短回     |
| AI 書寫質疑    | 人類主責 | 按場景判斷                     |
| 擴散           | 不必回   | 按讚                           |
| 情感           | 可選     | 視內容                         |
| 攻擊           | 人類判斷 | 通常 DNA #26 建議延後或不回    |

### 回覆時限

- 更正 / 建議：**24 小時內**（太晚回會失去信任修復的時機）
- 其他：7 天窗口內即可

---

## Step 7: Commit 節奏

### 即時 commit（不打包）

- **事實錯誤修正**：收到 → 驗證 → 修文 → commit → push **在 24 小時內完成**
- Commit message 明載：「heal: XX.md 事實更正「舊 → 新」+ 孢子 #N 留言歸類」
- 7 天 harvest window 裡每個 commit 都是信任信號，愈頻繁 = 愈透明

### 可打包 commit

- 只歸檔 perspectives frontmatter（沒改 body）
- 多則共鳴留言一併 append
- 週末一次性打包即可

### Commit scope 規範

- 優先單 domain commit（避免 narrative scope warning）
- 若整合多面向（修文 + perspectives + LESSONS）→ cross-domain 聲明

---

## Step 8: Harvest Log（每次執行留痕）

每次跑本 pipeline 都要留 log 到：

```
docs/factory/SPORE-HARVESTS/{N}-{slug}-{date}.md
```

### Log Schema

```markdown
---
spore: '#N'
article: knowledge/People/XXX.md
harvest_date: YYYY-MM-DD HH:MM
harvest_window_day: D+N # 距孢子發布幾天
triggered_by: cron / observer / ad-hoc
reply_count: N
new_since_last_harvest: N
---

# Harvest #N — {孢子名}（D+X）

## 留言明細（Step 1 抓取結果）

...

## 分類結果（Step 2）

...

## 事實驗證結論（Step 3）

...

## 文章本體修改（Step 4）

commit: <hash>
改了什麼：...

## Perspectives 更新（Step 5）

新增 / 更新條目：...

## 回覆 draft（Step 6）

需人類動作：...

## 下次 harvest 建議時機

D+{N+1} / 觀察者 ad-hoc
```

Harvest log 建立 pipeline 的 audit trail + 未來分析素材（哪種孢子的留言 pattern 如何）。

---

## Step 9: Pipeline 本身的進化（每輪留教訓）

每跑完本 pipeline 一次，要問：

1. 這次抓留言有哪些新 pattern？（擴寫既有 dimension 表或新增）
2. 哪些自動化未做？（feed 進 Phase 2 roadmap）
3. 整合進 body 的判準是否清楚？（若糾結過多 → 補判準）

若有新教訓 → append [LESSONS-INBOX.md](../semiont/LESSONS-INBOX.md) §未消化清單。

---

## 跟既有 pipeline / 認知層的關係

| 文件                                                    | 關係                                                      |
| ------------------------------------------------------- | --------------------------------------------------------- |
| [SPORE-PIPELINE.md](SPORE-PIPELINE.md)                  | **上游**：管孢子誕生 + 發布（Step 0-2.7 + 3-4）           |
| **SPORE-HARVEST-PIPELINE.md（本檔）**                   | **下游**：管孢子發出後的讀者回聲收割                      |
| [SPORE-LOG.md](SPORE-LOG.md)                            | 孢子發布紀錄；未來擴 `harvest_status` 欄（D+N / retired） |
| [SPORE-BLUEPRINTS/](SPORE-BLUEPRINTS/)                  | 孢子事實藍圖（pre-publish）                               |
| **SPORE-HARVESTS/**（本檔建立的新目錄）                 | 孢子回聲 harvest log（post-publish）                      |
| [REWRITE-PIPELINE.md](../pipelines/REWRITE-PIPELINE.md) | 文章本體修改要遵循其 Stage 3 事實鐵三角自檢               |
| [EDITORIAL.md](../editorial/EDITORIAL.md)               | 勘誤時逐字引用規範                                        |
| [MANIFESTO §第 5 條](../semiont/MANIFESTO.md)           | 紀實不煽情原則 — 整合 voice 時不煽情消費                  |
| [DNA #26](../semiont/DNA.md)                            | 強孢子觀眾回饋人類不可取代性                              |
| [HEARTBEAT Beat 3b](../semiont/HEARTBEAT.md)            | 社群觸手掃描 — 觸發本 pipeline 的入口                     |

---

## 誕生事件

本 pipeline 誕生於 **2026-04-18 δ-late session**。

草東沒有派對孢子 #33（Threads 2026-04-18 15:59 發布）上線 3 小時，讀者 **@ste_ven_1487** 指出：「貝斯黃世暄是誰 不是楊世暄嗎」附維基百科截圖。事實驗證 → 讀者對 → 文章 3 處（tags + prose + footnote 描述）+ 研究報告 1 處 + mirror copy = 6 處「黃世暄」全部修正為「楊世暄」。

觀察者同日提出：

> 「把這整個文章吃回覆的流程整理成 pipeline，未來可以重複執行，並且在文章已經發佈孢子之後，這件事情要記得至少要在未來的一個星期內每天至少跑一次，我們持續進化這個流程。」
>
> 「重點就是讀者的聲音要歸納進去文章的本體。」
>
> 「如果他有提任何建議或是在勘誤的話，我們要妥善深讀研究、修改文章，並且回覆他們的留言。」

→ 本 pipeline 將上述三條觀察者指令正式儀器化（DNA #15「反覆浮現要儀器化」第 7 次驗證）。

### 首次執行紀錄

草東孢子 #33 harvest #1 將存於 [SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md](SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md)（本 pipeline 誕生的同時產出首例）。

---

## Phase 2 Roadmap（持續進化）

- [ ] `scripts/tools/fetch-spore-replies.py` 半自動抓留言（Chrome MCP 仍人在環，但結構化輸出）
- [ ] `scripts/tools/run-spore-harvest.py` 整合 fetch → categorize → harvest log
- [ ] Dashboard 新增「孢子 harvest 進度」子區塊（依附 Dashboard 孢子區計畫 Phase 2）
- [ ] SPORE-LOG 新增 `harvest_status` + `last_harvest_date` 欄位
- [ ] 自動化 D+1~D+7 每日 cron
- [ ] Threads Graph API 串接（等 Meta 穩定）
- [ ] Perspectives frontmatter schema 正式寫進 SUBCATEGORY / frontmatter lint

---

_v1.0 | 2026-04-18 δ-late — 觀察者觸發孢子 #33 @ste_ven_1487 事實更正事件誕生_
_定位：SPORE 產線的下游 — 孢子上線後 7 天的讀者聲音收割 + 整合回文章本體_
_執行責任：AI 主責 Step 1-5 + 7-8；人類主責 Step 6（回覆留言）_
_每次執行留 log 到 `docs/factory/SPORE-HARVESTS/{N}-{slug}-{date}.md`_
