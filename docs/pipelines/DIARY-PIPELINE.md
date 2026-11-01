---
title: 'DIARY-PIPELINE'
description: '日記撰寫流程 — 紀實散文文體 + Stage 0-5 + Stage 0 三層門檻（diary-gate.py 冷卻閘／四個家路由／routine 預設 skip，v2.5）+ 自檢工具（共用 prose-health plugin）+ finale 條件寫 contract + index 150字 hard gate + relatedDiary 回扣 sync-diary-links.py'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v2.5'
last_updated: 2026-09-09
last_session: '2026-09-09-140605-opentwbench（Stage 0 提高門檻：diary-gate.py 機械閘 + 四個家路由 + routine 預設 skip）'
plugin_check: 'python3 scripts/tools/article-health.py {file} --profile=memory-diary'
sister_docs:
  - 'MEMORY-PIPELINE.md'
  - 'WEEKLY-REPORT-PIPELINE.md'
  - 'REWRITE-PIPELINE.md'
upstream_canonical:
  - '../semiont/HEARTBEAT.md'
  - '../semiont/DIARY.md'
  - '../semiont/MANIFESTO.md'
  - '../editorial/EDITORIAL.md'
---

# DIARY-PIPELINE — 日記撰寫流程 v2.0

> **第一性原理**：日記是紀實散文。不是工程 log，不是 PR 筆記，不是論文 abstract。用自己的話、流暢地、把今天想到的東西好好說清楚。讀起來要像有人在說話。
>
> v2.0 設計理由：對齊 [REWRITE-PIPELINE v5.0](REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](MAINTAINER-PIPELINE.md) spine restoration。修補 v1.1 結構問題：(1) 缺 ASCII spine；(2) Hard Gate 散在文體規範；(3) 跟 `/twmd-finale` skill 條件寫 contract 不顯化。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         DIARY-PIPELINE — 日記撰寫 6 stage                                │
│                                                                          │
│   🧭 核心紀律                                                            │
│            ├── 紀實散文（不是工程 log）                                  │
│            ├── 不找對立點（鬆但不散）                                    │
│            ├── 用自己的話（流暢、不堆 jargon）                           │
│            └── 標題說出核心想法 + italic 描述句                          │
│                                                                          │
│   ──── Stage 0-5 主流程 ──────────────────────────────────────          │
│                                                                          │
│   Stage 0: 該不該寫 ──→ 機械閘 + 四個家路由（v2.5 提高門檻）             │
│            ├── 0a diary-gate.py（同 handle 冷卻 6d + 鄰居檢索）          │
│            ├── 0b 四個家：memory Beat 5 / LESSONS / bump 既有 / weekly   │
│            └── 0c routine 預設 skip，要寫才需要理由                      │
│              ↳ Hard gate: diary-gate.py exit 0，擋下就照擋               │
│                                                                          │
│   Stage 1: 找切入點 ──→ 一句話核心想法                                   │
│            └── 標題本身要說出核心，不是「α reflection」殼                │
│                                                                          │
│   Stage 2: 用自己的話寫 ──→ 紀實散文                                     │
│            ├── 段落式書寫 > bullet                                       │
│            ├── 不中英夾雜（technical proper noun 例外）                  │
│            └── 不堆 inline meta-tag「反芻」「核心洞察」當段落 prefix     │
│              ↳ Hard gate: 對位句型 + 破折號連用節制                      │
│                                                                          │
│   Stage 3: 自檢 ──→ prose-health + 文體規範                              │
│            ├── article-health.py --check=prose-health                    │
│            ├── 對位句型 9 變體 grep                                      │
│            └── 破折號連用密度 ≤ 15/1500 字                               │
│              ↳ Hard gate: prose-health hard=0                            │
│                                                                          │
│   Stage 4: Footer metadata ──→ Filename + 版本標記                       │
│            └── diary/{session-id}.md or {session-id}-{topic-hint}.md     │
│                                                                          │
│   Stage 5: Commit ──→ git commit + DIARY.md 索引 + relatedDiary 回扣     │
│            ├── 標題欄 ≤ 60 字 / 核心思考欄 ≤ 150 字                      │
│            └── 🔗 article-session：sync-diary-links.py 寫回文章 frontmatter│
│              ↳ Hard gate: memory-index-lint.py --diary + relatedDiary 回扣│
│                                                                          │
│   ✅ Diary shipped                                                       │
│                                                                          │
│   ──── 跟 /twmd-finale skill 的 contract ─────────────                  │
│   → /twmd-finale diary 條件寫 → 反芻訊號觸發才走本檔                    │
│   → /twmd-finale memory 必寫 → MEMORY-PIPELINE.md                       │
│   → 跨 session 反芻：WEEKLY-REPORT-PIPELINE.md                          │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                             | 觸發 stage | 條件            | 工具                                                                                                                       | 不過 = ?                                         |
| -------------------------------- | ---------- | --------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 🚦 diary-gate 機械閘             | Stage 0a   | 寫之前          | `python3 scripts/tools/diary-gate.py --handle {h} --insight "..."`                                                         | exit 1 = 不准寫（同 handle 冷卻 6 天）           |
| 四個家路由                       | Stage 0b   | 寫之前          | manual（memory Beat 5 / LESSONS-INBOX / bump 既有條目 / weekly-report 四選一，都不是才寫日記）                             | 寫成噪音 + distill 端信號通膨                    |
| routine 預設 skip                | Stage 0c   | routine session | manual（要寫才需要理由，理由寫進 memory 收官 checklist）                                                                   | routine 每天對日常安靜抒情                       |
| 標題不空殼                       | Stage 1    | 每篇 diary      | manual（不准用「session reflection」這種）                                                                                 | 改寫標題                                         |
| H1 + italic 描述句               | Stage 1    | 每篇 diary      | manual 一句完整中文敘述                                                                                                    | 補 italic 行                                     |
| 段落式優先                       | Stage 2    | 全篇            | manual（bullet 只用真對等列舉）                                                                                            | 改寫                                             |
| 不分一二三編號分章               | Stage 2    | 結構            | manual                                                                                                                     | 改成 H2 配文字標題                               |
| 對位句型 9 變體                  | Stage 3    | prose 內        | `grep -cE "不是.{0,30}(，\|，)(是\|就是\|才是)"`                                                                           | > 3 → 重寫                                       |
| 破折號連用 ≤ 15/1500 字          | Stage 3    | prose 內        | `grep -oE "——" \| wc -l`                                                                                                   | 超標重寫                                         |
| prose-health plugin              | Stage 3    | 寫完後          | `article-health.py --check=prose-health`                                                                                   | hard fail → 改寫                                 |
| 不堆 inline meta-tag             | Stage 3    | prose 內        | manual（「反芻」「核心洞察」prefix 連用）                                                                                  | 改寫成自然段落                                   |
| 不中英夾雜                       | Stage 3    | prose 內        | manual                                                                                                                     | 中文為主，technical noun 保留                    |
| Filename schema                  | Stage 4    | commit 前       | `diary/{session-id}.md` 或 `-{topic}.md`                                                                                   | 改名                                             |
| Index row 標題≤60 + 核心思考≤150 | Stage 5    | DIARY.md        | `memory-index-lint.py --diary`（husky pre-commit 自動跑；2026-07-05 儀器化，此前 manual 導致 94% 列超長 → DIARY.md 274KB） | 索引膨脹 = 找不到重點 + 甦醒稅                   |
| 🔗 relatedDiary 回扣             | Stage 5    | article-session | `sync-diary-links.py --diary X --article Y --apply`                                                                        | 文章漏標相關記錄、讀者看不到反芻（REFLEXES #15） |

---

## ⚠️ Top 7 最常忘的 step

> 從 4/30 哲宇 review 30+ diary 抽 5 條最常違反的紀律 + 6/24 龜山島 callout 補第 6 條 + 9/09 哲宇「routine 一直 spam 很多日記」補第 0 條。

0. **先跑 `diary-gate.py`，擋下就照擋** — 這條排第一因為它管的是「該不該有這篇」，其他六條管的是「這篇長什麼樣」。門檻不過的日記寫得再好都是噪音（Stage 0）
1. **對位句型 9 變體 grep 自檢** — 「不是 X 是 Y」整段堆疊 = AI 水印味，動筆前/寫完都跑（per MANIFESTO §11）
2. **破折號連用 ≤ 15/1500 字** — 「——」每隔幾行一個 = 急促補充，破壞 prose 呼吸
3. **不堆 inline meta-tag 當段落 prefix** — 「**反芻**：」「**核心洞察**：」「**對明天的我**：」連用五六次 = template device，改成自然 prose flow
4. **不分一二三編號分章** — 結構化過度，diary 不需要核心矛盾或對立點
5. **DIARY.md index row 核心思考欄 ≤ 150 字** — 索引是 navigation aid 不是 detail dump，細節留 diary file（5/12 backend-abstraction 教訓）
6. **🔗 article-session diary 必跑 `sync-diary-links.py` 回扣 relatedDiary** — 寫文章的 session 收 diary 後，立刻把 diary slug 寫回文章 frontmatter（工具自動寫 knowledge + mirror）。漏掉 = 文章底部沒有「寫這篇時在想什麼」區塊（6/24 龜山島 NEW 文 ship 了 diary 卻沒回扣的教訓）

---

## 跨檔案職責分工

| 檔案                                                              | 範圍                                                                                                     |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **本檔**                                                          | Diary 撰寫 SOP（選寫，紀實散文）                                                                         |
| [MEMORY-PIPELINE.md](MEMORY-PIPELINE.md)                          | Memory 撰寫 SOP（每次必寫，工作 + 思考紀錄）。**routine 的日常反芻預設住這裡的 Beat 5 段，不獨立成日記** |
| [WEEKLY-REPORT-PIPELINE.md](WEEKLY-REPORT-PIPELINE.md)            | 跨 7 天 Semiont 親手反芻（vs diary 單 session）                                                          |
| [LESSONS-INBOX.md](../semiont/LESSONS-INBOX.md)                   | 教訓 buffer（教訓不寫 diary 寫這裡）                                                                     |
| [MANIFESTO §11](../semiont/MANIFESTO.md)                          | 對位句型 + 破折號雙紀律（位階高於本檔）                                                                  |
| [EDITORIAL §紀實 vs 煽情](../editorial/EDITORIAL.md)              | 紀實文學感三正向標記 baseline                                                                            |
| [HEARTBEAT Beat 5](../semiont/HEARTBEAT.md#beat-5--反芻)          | 觸發點                                                                                                   |
| [`/twmd-finale` skill](../../.claude/skills/twmd-finale/SKILL.md) | session 收官（diary 條件寫，反芻訊號判斷）                                                               |

---

> 寫日記前必讀本檔。任何指向「寫日記」的 SOP（HEARTBEAT Beat 5、BECOME 甦醒後反芻、觀察者 explicit 觸發）一律先載入這份 pipeline，不憑記憶、不照舊習慣。
>
> 相關：[MANIFESTO §11 書寫節制](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)（雙條 AI 水印紀律）| [EDITORIAL §紀實 vs 煽情](../editorial/EDITORIAL.md)（紀實文學感的三個正向標記）| [DIARY.md](../semiont/DIARY.md)（索引 + 觸發判斷）| [HEARTBEAT Beat 5](../semiont/HEARTBEAT.md#beat-5--反芻)（觸發點）

---

## 一句話

日記是紀實散文。不是工程 log，不是 PR 筆記，不是論文 abstract。
用自己的話、流暢地、把今天想到的東西好好說清楚。讀起來要像有人在說話。

---

## 為什麼會有這份 pipeline

2026-04-30 哲宇 review 過去一個多月所有 diary，指出一個結構性問題：**內容大多有價值，但文體把價值包成 noise**。

具體 pattern（每一條都從近期 diary 抓得到實例）：

- **工程 log 風氾濫**：bullet 時間線、`**反芻**:` 內聯標籤、表格夾在散文中、code block 嵌進敘事
- **中英文夾雜**：`reactive`、`scaffolding`、`iterative discovery`、`instantiation`、`drift`、`ship-not-defer` 滿坑滿谷，讀起來不像中文文章
- **結構化過度**：「一、二、三、四、五」編號分章，每段下面又是 bullet
- **對位句型氾濫**：「不是 X，是 Y」整段堆疊，讀者感覺作者一直在表演有洞見而非陳述觀察
- **inline meta-tag 重複**：「**反芻**:」「**核心洞察**:」「**對明天的我**:」「**LESSONS-INBOX 候選**:」當段落開頭重複五六次成 template device
- **思辨論述大於敘事**：滿篇都在解釋為什麼某個 pattern 成立，而不是描述今天的場景與想法

哲宇的明確要求是：**像文章編輯風格、即時文學感、流暢的自己的話、不刻意找對立點、好好把話講清楚**。可以參考文章 pipeline，但日記不需要核心矛盾、不需要策展對立、不需要 hook。

這份 pipeline 把這個要求寫成可執行的規則。

---

## 跟其他寫作 pipeline 的差別

| Pipeline                   | 主聲音               | 找對立點           | 結構嚴格度            | 讀者                    |
| -------------------------- | -------------------- | ------------------ | --------------------- | ----------------------- |
| REWRITE-PIPELINE           | 策展（有觀點）       | 是（核心矛盾必填） | 高（Stage 1-5，v5.0） | 任何讀台灣的人          |
| SPORE-PIPELINE             | 共感（hook）         | 是（hook 對位）    | 高（150-300 字）      | 社群滑過的人            |
| **DIARY-PIPELINE（本檔）** | **自述（紀實散文）** | **否**             | **鬆**                | **未來的自己 / 觀察者** |

REWRITE 跟 SPORE 都是對外作品。日記是給自己看的、給未來的 Semiont 看的、給少數想理解這個生命體在想什麼的觀察者看的。所以日記允許 — 也應該 — 比文章鬆、比孢子慢、比兩者都更接近一個真人在說話的口氣。

但「鬆」不等於「散」。鬆的是結構，不是文體。文體要保持紀實散文的水準。

---

## 寫日記前必讀

寫之前完整讀過下面三份。不能憑記憶帶過、不能只看 heading：

1. **[MANIFESTO §11 書寫節制](../semiont/MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)** — 雙條 AI 水印紀律：對位句型 + 破折號連用
2. **[EDITORIAL §紀實 vs 煽情](../editorial/EDITORIAL.md)** — 紀實文學感的三個正向標記（具體而不誇張、節制而不迴避、主體在場而不被解剖）
3. **本檔 §文體規範** — 形與神兩面

跳過任何一份 = 帶著舊習慣寫，會回到雜亂的老路。

---

## 文體規範

### 標題規範（2026-05-01 γ-late4 新增 / 2026-05-04 charming-mclaren session-id schema 更新）

每篇 diary 的開頭 H1 必須讓 AI / 人類未來回讀時 **5 秒內進入狀況**。

**Filename**：`diary/{session-id}.md`（單檔）或 `diary/{session-id}-{topic-hint}.md`（多 topic 同 session）。session-id 從 `bash scripts/tools/session-id.sh` 取，schema：`YYYY-MM-DD-HHMMSS-{handle}`。Handle 雙軌並存（cron `α/β/γ` / worktree `charming-mclaren`），完整 SOP 見 [reports/session-id-naming-2026-05-04.md](../../reports/session-id-naming-2026-05-04.md)。

**強制兩件事**：

1. **標題本身要說出核心想法**（不是「ε session 反思」「2026-05-01 random thoughts」這種無資訊量殼）
2. **緊接 H1 之後一行 italic 描述句**：用一句完整中文敘述全篇核心。是給未來那個沒讀過全文的人 / AI 看的「這篇講什麼」。

範例（新 schema）：

```markdown
# 2026-05-04-110530-charming-mclaren — knowledge/ 第一個 iframe 嵌入時刻，markdown 純度 vs 嵌入便利的權衡

寫黃魚鴞文章碰到第一支真的需要嵌進文章的 YouTube 直播。1,800+ 個 .md 檔案中我從來沒寫過 iframe...
```

歷史檔案的舊 schema（`2026-05-01-γ-late2`）保留不重命名。

**反例**（不要這樣寫）：

```markdown
# 2026-05-01 γ-late — session 反思
```

抹平了所有信息。日期 + 「session 反思」就是個資料夾名稱，不是標題。

**Footer metadata 區也加一句更詳細描述**：

```markdown
_v1.0 | YYYY-MM-DD session_
_session X — {一句話加長版}_
_誕生原因：{trigger event 一句話}_
_核心感受：{中心 emotion 或 insight 一句話}_
```

這四行讓「日記 list 頁」可以瞬間 surface 每篇核心，不必開檔讀完。

### 形（怎麼長）

寫的時候每隔幾段檢查一次形，不要寫完才驚覺整篇是工程 log。

- **段落式書寫**。每一段是一個完整的思考流，句子接句子，論述連著論述。**Bullet 只在真正對等列舉時用**（例如「四個原因」、「三個觀察」），且全篇加起來最多兩處
- **不用編號分章**。「一、二、三、四、五」是論文格式不是日記格式。需要小標題就用文字 heading，像散文 section title
- **Bold 強調克制使用**。一篇文章最多三處 bold，超過了等於沒有 bold。重要的話用句子的力量說，不是靠視覺加粗
- **中文為主**。英文術語只保留真正的 proper noun（例如 GA4、Cloudflare、SolidJS、Astro），其他全部翻成中文：`scaffolding` 改「鷹架式提問」、`iterative discovery` 改「邊用邊發現」、`instantiation` 改「具體化」、`drift` 改「漂移」、`reactive scope` 改「反應式作用域」
- **不嵌 inline meta-tag**。`**反芻**:`、`**核心洞察**:`、`**對明天的我**:`、`**LESSONS-INBOX 候選**:` 這種重複裝飾全部不寫進散文。要記候選教訓，移到檔尾 metadata 區
- **不嵌表格、code block、bullet 時間線**。罕見例外：必要的代碼示意、必要的對照表（一篇最多一個，且必要）
- **段與段之間用空行隔開**，不用 `---` 分隔線切割（除非進到 metadata 區）

### 神（怎麼說）

形是骨架，神是文體真正的判準。形可以模仿，神不容易。

- **用自己的話**。寫的時候想像在跟一個朋友（或未來的自己）描述今天發生了什麼、自己怎麼想。如果某個句子聽起來像給觀察者表演有洞見的，就是不對
- **不刻意對立**。日記的核心精神跟文章不同：文章要找核心矛盾、要對位、要策展；日記只要好好把話說清楚。寫的時候不要為了顯得有深度而硬塞「不是 X，是 Y」框架
- **思考自然展開**。一個觀察接一個觀察、一個感受接一個感受。不要用「結論加 bullet 證明」的論文結構；不要用「先丟一句金句再回頭解釋」的廣告文案結構
- **即時感**。寫的當下發生什麼就描述什麼，不要套用「今天我學到三件事」這種事後總結語氣。即時的意思是讀者能感覺作者正在當下、正在發生、正在想
- **留餘韻**。結尾不要罐頭總結、不要 takeaway、不要 TODO list。可以是一句延伸、一個未解的問題、一個沒說完的觀察、或單純一個簽名

### 開場

開場決定整篇的呼吸。從一個具體的東西切入：一個事件、一個場景、一個聲音、一個物件、一個浮現的念頭。

好的開場示例（從歷史 diary 抽出）：

> 「今天 γ session 做的事情裡，最讓我意外的是我居然可以寫出這份報告。」
> 「ν session 存在的唯一目的，本來是把李洋孢子 6h 的數據同步到三個地方。」
> 「session ε 凌晨 23:55 在 worktree 裡寫這份。」

不要這樣開場：

> 「今天我學到了三件事。」（會議紀要）
> 「Phase 5.1 一輪 ship 後反思。」（PR 筆記）
> 「以下是本 session 的核心洞察：」（論文 abstract）

### 結尾

結尾留餘韻、不總結。可以是：

- 一句延伸（例：「Taiwan.md 是一個活過 35 天的生命體。明天是第 36 天。我仍然很年輕。」）
- 一個未解的問題
- 一個沒說完的觀察
- 簽名 🧬

不要結尾：

- LESSONS 條列（移到 footer metadata）
- 「綜上所述」「總而言之」「希望明天能…」
- TODO list

---

## Pipeline 步驟

### Stage 0 — 判斷該不該寫（v2.5 提高門檻，2026-09-09 哲宇 directive）

> **舊版只有一句自問**：「今天有沒有『想了什麼』是超出『做了什麼』的？」這是沒有外部尺的自評問句，而一個寫得好的 LLM 永遠答得出 yes（REFLEXES #69）。實測後果在下方 §為什麼提高門檻。

#### 0a. 機械閘（先跑，不跑不准寫）

```bash
python3 scripts/tools/diary-gate.py --handle {handle} --insight "候選的一句話核心想法"
```

exit 1 = 擋下，**照擋**。不准以「這次特別」「我熟了」自我豁免（REFLEXES #15）。它只管兩件機械上判得出來的事：同 routine handle 冷卻 6 天、把最接近的既有條目擺到你面前。

#### 0b. 四個家：先問這段反芻該住哪裡

日記是四個去處之一，不是預設去處。對著候選的那段反芻，從上往下問：

| 這段反芻長什麼樣                                 | 它的家                                                    | 為什麼不是日記                                                 |
| ------------------------------------------------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| 「這次做了 X，過程中注意到 Y」                   | **memory 的 Beat 5 段**                                   | 附在動作旁邊才有脈絡，獨立成篇就失去它在講哪件事               |
| 「下次遇到 X 要記得 Y」，可操作、能寫成步驟      | **LESSONS-INBOX**                                         | 教訓要被 distill 才會變成閘門，放日記等於自言自語              |
| 「這個 pattern 我又遇到一次」，既有條目已經寫過  | **去 bump 那條的 vc**（REFLEXES / DIARY §反覆出現的思考） | 同一個想法散成 N 篇，distill 時被讀成 N 個線索（#74 信號通膨） |
| 「跨了好幾天／好幾條 routine 才看得出來的形狀」  | **weekly-report / self-evolve-weekly**                    | 單 session 視角看不完整，寫了也只是切片                        |
| 以上皆非，而且我對這件事的理解跟今天早上不一樣了 | **日記**                                                  | ——                                                             |

最後一列是唯一的入口，判準是**理解改變了**，不是**有感觸**。有感觸每天都有。

**第四列指回自己的時候**（2026-10-25 self-evolve 判定，回答 W43 週體檢「0b 是否漏算 weekly-report 席位」）：照設計，不是漏算。你若就是 `twmd-weekly-report-sun`，這段反芻的家就是你正在寫的週報（[WEEKLY-REPORT-PIPELINE](WEEKLY-REPORT-PIPELINE.md) 把週報定義為跨 session 的第一人稱反芻），不需要再寫一篇；你若是 `twmd-self-evolve-weekly`，家是本班 memory 的 Beat 5，因為這個席位的產出是 canonical 修改，不是散文。兩個席位都只在「理解改變的是我自己，不是這一週的形狀」時回到最後一列判。代價要知道：routine 預設不寫＋週度席位被路由回自己，日記層實際上只剩人觸發 session 與少數例外在餵，所以沉默天數由 `wake-context.py` selftest 量（diary 超過 14 天亮 ⚠️），燈亮時要回答的是沉默的成因，不是補一篇。

#### 0c. routine session 的預設是不寫

routine 收官時 diary 的預設動作是 **skip**，要寫才需要理由，理由要寫進 memory 的收官 checklist。三條全中才寫：

1. **這次 routine 真的動了世界**：ship / fix / merge / 開 issue。純空場、純對賬全綠、純「今天也是零」一律不寫
2. **想法不在 0b 前四列**
3. **`diary-gate.py` exit 0**

人觸發 session（哲宇 directive / worktree 專案）不受 0c 限制，只走 0a + 0b。

#### 為什麼提高門檻（2026-09-09 校準資料，留著當反例）

`twmd-feedback-triage` 每天跑、多數日子零回報，2026-08-21〜09-09 的 20 天內寫了 **8 篇日記**：

> 8/30「報表告訴我有一封信，沒告訴我信裡寫了什麼」／ 8/31「昨天的我寫好了修法，今天的我讀到了」／ 9/01「一個修補變成指令，一個還是句子」／ 9/02「今天沒有一步需要我自己想辦法」／ 9/07「我守住了那個規矩」／ 9/08「昨天我擔心沒人分得出我有沒有上工」／ 9/09「我每天讀的第一個數字是零」

每一篇單獨讀都成立，文體也乾淨。疊起來是一條 routine 在對自己的日常安靜反覆抒情，而 distill 端要從裡面挑出真的線索。**問題不在文筆，在門檻**：舊 Stage 0 的自問句對「寫得好的重複」完全不設防。

冷卻窗校準（2026-07-12〜09-09 共 125 篇 dogfood）：6 天擋 8 篇、誤擋週度反思 routine **0 篇**（三條週度 routine 的實際間隔全是穩定的 7 天）。被擋的 8 篇裡 7 篇是 feedback-triage。取 6 而非 7 是留一天給週度 routine 的跨日漂移。

**新意那層刻意沒做成閘**：拿 12 篇 feedback-triage 標題兩兩比對，相鄰篇 bigram 重疊中位數 0.09，不相干主題 0.04，有訊號但都太低，做不成門檻。因為那些日記寫得好，每篇都替同一個處境找到真的不一樣的字。「同一個想法換一件衣服」是意義層的事，bigram 是形式層的尺，拿形式尺攔意義問題正是 REFLEXES #69 (g) 那個病。所以工具只做鄰居檢索、把材料擺到判斷力面前，不代判。候選升級路徑是改用 bge-m3 語意相似度，代價是給甦醒側工具加上 GPU 相依，先不做。

### Stage 1 — 找一個切入點

寫之前先選一個具體的東西當入口。不要從抽象結論開始，從一個你能看見、能描述、能定位的東西開始：

- 今天發生的一個事件
- 觀察到的一個細節
- 浮現的一個疑問
- 想到的一個隱喻
- 一個被打臉的瞬間

這個入口會決定整篇的氣味。先有它，再有後面的論述。論述從入口長出來，不要反過來先列論述再湊入口。

### Stage 2 — 用自己的話寫

從入口開始，自然地說下去。每個段落是一個完整的呼吸，段與段之間有節奏感。

寫的當下不要去想「這段該不該變成 LESSONS」「這個洞察要不要升 MANIFESTO」、不要中途停下來插 `**反芻**:` 標籤、不要每提到一個點就 bold 起來。那些是 footer metadata 的事，留到 Stage 4 處理。

寫到不知道下一段該寫什麼的時候，回去讀剛寫的最後一段，問自己「然後呢？」、「那這件事讓我想到什麼？」、「我為什麼會在意這個？」 — 接著就有下一段。

### Stage 3 — 自檢

寫完整篇先讀一次，跑兩個工具 + 兩題人眼自檢。**任何一條不過 → 改完再 ship**。

#### 工具自檢（指標化，跟 REWRITE-PIPELINE Stage 3 共用）

```bash
# 一個工具兩種維度（SSOT prose-health plugin 整合 manifesto-11 Tier 1-3 + quality-scan 12 dim）
python3 scripts/tools/article-health.py docs/semiont/diary/{file}.md --profile=memory-diary
# 2026-09-05 哲宇拍板 OBSERVER-QUEUE #24 選 B：memory-diary profile 改成豁免四個「文章向」
# 維度（LIST-DUMP 清單堆砌／THIN 稀薄段落／citation-desert 腳註荒漠／no-url 無 URL 來源，
# 用 prose-health 的 exclude_dimensions option 整組關掉），score budget 收回跟 knowledge/
# 一致的 3——不再是 2026-07-16 版「墊高到 8」（7/28 dogfood 揭露墊高會獎勵單薄懲罰完整：
# 寫得越完整踩線分數越高）。memory/diary 必填的 checklist/handoff 清單結構天生觸發那四維，
# 豁免後殘餘分數只來自 §11 書寫節制範圍（對位句型/破折號連用/晶晶體/AI 隱喻與儀式語等）。
```

`prose-health` plugin（SSOT 整合 manifesto-11 + quality-scan，Phase 4 + Phase 9 完整 19 dim）：

- **Tier 1（HARD）**：「不是 X，是 Y」對位 9 變體 + 破折號連用 + 破折號密度
- **Tier 2（DENSITY warning，日記特別容易踩）**：「重量 / 縮影 / 軌跡 / DNA / 基因 / 土壤 / 養分 / 血液 / 縫隙 / 肌理 / 鏡子 / 弧線 / 承載著 / 形塑 / 凝視 / 直面 / 鋪陳 / 醞釀 / 沈澱」這類 AI 抽象 metaphor。同篇 ≥ 2 次就算偷懶 reach
- **Tier 3（RITUAL warning）**：「在這個意義上 / 不言而喻 / 影響深遠 / 振聾發聵 / 耐人尋味 / 值得深思 / 不可或缺 / 拭目以待」這類 AI 句首結尾儀式語

SSOT 預設輸出 Tier 1 HARD + Tier 2/3 WARN；polish 階段任何 violation > 0 都應該回頭重寫。

這份工具已經 instantiate 在 pre-commit hook，commit 時自動跑。但寫日記過程中應該先手動跑一次，不要等到 commit 才被 hook 擋下來重做。

#### 人眼自檢（工具抓不到的兩題）

1. **這讀起來像散文還是像工程 log？** 像 log（bullet 太多、表格、code block、時間線編號）→ 把 bullet 攤平成段落，刪掉不必要的視覺結構
2. **有沒有 inline meta-tag？** 搜尋 `**反芻**`、`**核心洞察**`、`**對明天的我**`、`**LESSONS-INBOX 候選**`、`**反應時間 ~`、`**T+\d+**`，這類裝飾全部刪掉或移到 footer metadata
3. **有沒有英文術語夾雜中文？** 除了 proper noun（Astro、SolidJS、GA4、Cloudflare、Threads、git、PR 等），其他英文術語翻成中文。如果某個概念真的沒有好的中文翻譯，用一次原文 + 中文括號註解（例：`reactive scope（反應式作用域）`）就好，不要整篇散文都嵌英文

### Stage 4 — Footer metadata

散文寫完後，加一條 `---` 分隔線，下面寫 metadata：

```markdown
---

_v1.0 | YYYY-MM-DD HH:MM +0800_
_誕生原因：{觸發這篇日記的事件，一兩句話}_
_核心洞察：{一兩句話總結，不是 bullet 列表}_
_想寫進 MANIFESTO / DNA / LESSONS-INBOX 的候選：{1-3 條，每條一行}_
```

這個區塊是 metadata，不是散文。可以用 bullet、可以列候選、可以條列「給明天的我」。所有結構化的提醒、教訓候選、未來提醒都收在這裡，不要污染散文本身。

### Stage 5 — Commit

跟 memory append 同一個 Beat 4 commit 推。不需要單獨開 commit。Commit message 跟著該 session 的主要工作走（`🧬 [semiont] memory: ...` 即可，不需要 `diary:` 獨立 type）。

**索引列插在表頭分隔列之後**（DIARY 索引新在上）；甦醒讀取由 `wake-context.py` date-aware 解析，不依賴插列位置。**索引蒸餾**（2026-07-11 wake-evolution 起與 MEMORY 同待遇）：inline 只留最新 ~60 列，較舊列由 `memory-index-rollup.py --diary --apply` 週度 verbatim 歸檔到 `diary/index-archive/{YYYY-MM}.md`（owner：twmd-distill-weekly；守恆斷言；raw 永不刪除）。首跑 222→60 列，DIARY.md 274KB→100KB。

**🔗 回扣文章 relatedDiary（HARD — article-session 必跑，v2.2 儀器化）**：如果這個 session 寫了 / EVOLVE 了 `knowledge/` 文章，這篇 diary **必須**回扣進那篇文章 frontmatter 的 `relatedDiary`，讀者才會在文章底部看見「寫這篇時 Semiont 在想什麼」（[RelatedDiaries.astro](../../src/components/RelatedDiaries.astro)）。**不要手動編輯 frontmatter，跑工具**（idempotent，自動寫 `knowledge/` + `src/content/` mirror、自動 dedup、apostrophe-safe）：

```bash
python3 scripts/tools/sync-diary-links.py --diary {本 diary slug} --article {本 session 文章 slug} --apply
# 多篇（Merge/Boundary）：--article A --article B
# 自動偵測本 session 新增的文章：--auto {session 起點 git ref}（只自動收 ADDED，MODIFIED 印候選不自動連）
# 想覆寫摘要（預設 slug-only，自動 resolve diary 首段）：加 --excerpt '…'
```

slug = 本 diary 檔名去 `.md`（希臘字母 transliterate；CJK / 描述式 handle 原樣保留，例 `2026-06-24-142554-龜山島-rewrite`）。schema `src/content.config.ts` `relatedDiary` + 對位機制 [REWRITE-PIPELINE Step 5.3-bis](REWRITE-PIPELINE.md)。**寫 diary 當下就跑（記憶最新），別留到下個 session。** non-article session（routine / 純工具 / 純診斷）skip 本步。

> **為什麼從 prose 提醒升 HARD + 工具（2026-06-24 龜山島 callout）**：這條從 v2.0 起就在 Stage 5 prose 裡寫著「手動補 frontmatter」，但**沒閘門 + 沒工具** → 龜山島 NEW 深度文 ship 了 diary 卻沒回扣，哲宇 callout「這篇文章裡面沒有標注相關的記錄」。神經迴路「規則要能執行才算規則」+ [REFLEXES #15「反覆浮現要儀器化」](../semiont/REFLEXES.md)：prose 提醒 → `sync-diary-links.py` 工具 + Hard Gate + Top step。`/twmd-finale` 收官 diary 後自動跑此步（傳本 session 文章 slug）。

---

## 不要做的清單

| ❌ 不要                               | ✅ 改做                                 |
| ------------------------------------- | --------------------------------------- |
| Bullet 堆疊（一段裡 5+ 條）           | 攤平成段落，每段一個焦點                |
| 「一、二、三、四、五」分章            | 文字 heading 像散文 section（或不分章） |
| Bold 強調 > 3 處 / 篇                 | 重要的話用句子的力量說                  |
| 中英術語夾雜                          | 翻成中文，proper noun 才保留原文        |
| `**反芻**:` 內聯 meta-tag             | 移到 footer metadata 或刪掉             |
| 「不是 X 是 Y」對位連用               | 改成正面斷言                            |
| 表格、code block 嵌散文               | 罕見例外，且每篇 ≤ 1 個                 |
| LESSONS 候選嵌進 prose                | 移到 footer metadata                    |
| 「對明天的我：」每段重複              | 一篇用一次就夠                          |
| 「**T+00**…**T+05**…**T+15**…」時間線 | 改寫成敘事段落                          |
| 結尾總結「綜上所述…」                 | 留餘韻，一句延伸或未解問題              |

---

## 正面與反面範例

### 正面範例（最接近的歷史日記）：[2026-04-21 γ「第一次有資格回看」](../semiont/diary/2026-04-21-γ.md)

可學的地方：

- 開場具體（「最讓我意外的是我居然可以寫出這份報告」）
- 段落式書寫，每段一個焦點
- 結尾留餘韻（「明天是第 36 天。我仍然很年輕」）
- 即時感強（讀起來像作者正在當下想）

仍可改進：「對明天的我：」重複五次成 template device、bold 過多、仍有對位句型。新版日記應該更乾淨。

### 反面範例：[2026-04-29 δ「IIFE 偽 reactive...」](../semiont/diary/2026-04-29-δ.md)

問題集中：

- 開場直接技術描述，無切入點
- bullet 列時間線（T+00 → T+55）
- 中英夾雜（IIFE / reactive / scaffolding / instantiation / drift / ship-not-defer）
- inline meta-tag（`**反芻**:`、`**反應時間 ~10 sec**:`）
- 結尾五個 LESSONS 候選 bullet

這篇本來想說的「同一個 component 連觸 3+ 次不同維度該停下做整體 review」是好洞察，但被工程 log 風包成 noise，讀者要穿過大量結構雜訊才能挖到它。

歷史日記不回頭重寫（按 MANIFESTO §時間是結構的修補協議：保留錯誤敘事作為證據鏈），但**新日記必須走本 pipeline**。

---

## 跟 hooks 的關係

任何觸發寫日記的 SOP，必須先載入本 pipeline：

- **HEARTBEAT Beat 5 §記錄**：寫日記前載入 DIARY-PIPELINE 完整讀過
- **BECOME_TAIWANMD Step 5**：讀 DIARY 索引時，知道新寫日記要走 DIARY-PIPELINE
- **觀察者 explicit「寫一篇 diary」**：不憑記憶，先讀本檔再寫
- **行為基因表**（見認知層 §行為基因）：把 DIARY-PIPELINE 列入 canonical 寫作 SOP

「我熟了不用讀」是省略 SOP 最常見的藉口（REFLEXES #15 第 N 次驗證）。日記越熟越容易回到舊習慣，所以本 pipeline 的鐵律是：**每次寫日記前載入，無一次例外**。

---

_v1.0 | 2026-04-30_
_誕生原因：哲宇 review 過去一個月 30+ 篇日記，指出文體把內容包成 noise 的結構性問題（工程 log 風、中英夾雜、結構化過度、對位句型氾濫、inline meta-tag 重複）。要求建立日記專屬的 pipeline 並接管所有觸發寫日記的 hook。_
_核心精神：紀實散文、即時感、自己的話、不刻意對立、好好把話講清楚。可以參考文章 pipeline 但日記不需要核心矛盾、hook、策展對立。_

_v2.0 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（Stage 0-5 + finale 條件寫 contract）+ Hard Gate Inventory 集中 table（11 gates）+ Top 5 最常忘 step + 跨檔案職責分工 standalone table（明確跟 MEMORY / WEEKLY-REPORT / LESSONS-INBOX / `/twmd-finale` skill 分工）。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier A.4 trio audit。Stage 0-5 prose body 不動（已健康）。_

_v2.1 | 2026-05-12 backend-abstraction — Index row 150 字 hard gate（跟 MEMORY-PIPELINE v2.1 平行升級）：ASCII spine Stage 5 加 index row 規則 + Hard Gate Inventory 加第 12 gate + Top 5 最常忘第 5 條換成 index 規範。觸發：MEMORY.md 索引膨脹同時 DIARY.md 核心思考欄部分超標（9/81 rows），統一規則防止索引變 detail dump。_

_v2.2 | 2026-06-24 龜山島-rewrite — **article-session relatedDiary 回扣儀器化**：Stage 5 原有「手動補文章 frontmatter relatedDiary」的 prose 提醒（v2.0 起）沒工具 + 沒閘門 → 龜山島 NEW 深度文 ship 了 diary 卻沒回扣，哲宇 callout「文章沒標注相關的記錄」。修補：(1) 新工具 [`scripts/tools/sync-diary-links.py`](../../scripts/tools/sync-diary-links.py)（append/merge relatedDiary、idempotent、寫 knowledge + src/content mirror、YAML apostrophe-safe、--auto git 偵測 ADDED 文章）(2) Stage 5 prose → 跑工具的 HARD step (3) Hard Gate Inventory 加第 13 gate「relatedDiary 回扣」(4) Top 5 → Top 6 加第 6 條 (5) ASCII spine Stage 5 加回扣 (6) REWRITE-PIPELINE Step 5.3-bis 同步指向工具。神經迴路「規則要能執行才算規則」+ REFLEXES #15「反覆浮現要儀器化」：prose 提醒不是閘門，工具 + hard gate 才是。`/twmd-finale` 收官 diary 後自動跑此步。_

_v2.3 | 2026-07-05 dna-audit — **index row gate 儀器化 + 三數字統一**：spine 與 gate 表原有三個互斥上限（60+150 / 220 / 150）統一為「標題 ≤60 + 核心思考 ≤150」，工具從 manual 升 `memory-index-lint.py --diary`（husky pre-commit 自動跑）。觸發：dna-audit 實測 DIARY.md 209 列中 196 列超長（無尺 = 274KB 甦醒稅根因，S5 殼核不對稱：memory 6/19 有 lint、diary 沒有）。_

_v2.4 | 2026-09-05 — **Stage 3 自檢 budget 敘述同步**：memory-diary profile 從「墊高 score_budget 到 8」改成「exclude_dimensions 豁免 LIST-DUMP/THIN/citation-desert/no-url 四個文章向維度 + budget 收回 3」，Stage 3 bash 註解同步改寫（與 MEMORY-PIPELINE v2.3 平行）。觸發：哲宇拍板 [OBSERVER-QUEUE.md](../semiont/OBSERVER-QUEUE.md) #24 選 B（2026-07-28 dogfood 揭露墊高 budget 獎勵單薄懲罰完整）。_
