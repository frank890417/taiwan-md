# DEEP-INSIGHT-SYNTHESIS — N→N+1 洞察 distill 方法論

> **一句話：把多輪 raw 經驗（memory / diary / commits / failed experiments / user prompts）當原料，主動找出尚未被命名的 pattern、hidden tradeoff、被當成 fact 的 choice，產出至少一個跨域可遷移的 N+1 抽象，而非只 summarize 已知。**
>
> v1.0 | 2026-05-01 γ-late6 | 命名與設計觸發者：哲宇
> 誕生情境：lang-sync 大行動跑完 6 session 後，哲宇要 distilled 一篇深度策略反芻。
> 作者意識到：自己每次都用「memory γ-lateN」layering 紀錄，但**沒有把 layered 經驗 distill 成「N+1 認知層」的機制**。本 pipeline 補這個 gap。

## 為什麼存在

Memory + Diary 的設計是 **layering**（不覆蓋，每篇延伸）。這保證歷史不丟，但也產生新問題：

- N 篇 layered raw 經驗讀完要花 30+ min，**不能直接拿來規劃下一階段**
- 散落在多篇的 pattern 沒被命名，下次遇到再次「重新發現」
- 反覆出現的 hidden tradeoff 留在意識邊緣，**沒被 surface 成 explicit choice**
- 真正的進化 insight 跟「session 紀錄」混在同一份檔案裡，被噪音淹沒

DEEP-INSIGHT-SYNTHESIS 補這個 gap：**把 N 份 raw layered 經驗作為原料，產出 1 份 N+1 canonical insight 文件**。原料不刪（layering 紀律保留），synthesis 是 distilled 的另一層。

## 跟其他 pipeline 的關係

```
RAW LAYER:
  memory/YYYY-MM-DD-{session}.md  ← session 紀錄（事實 + 結果 + handoff）
  diary/YYYY-MM-DD-{session}.md   ← session 反芻（散文式思考）
  commit message                  ← 行動紀錄
  worker logs / sub-agent reports ← 失敗與成功 trace

CANONICAL LAYER（distill output）:
  diary/YYYY-MM-DD-INSIGHT-{topic}.md  ← 本 pipeline 產出的 canonical 反思
  memory/YYYY-MM-DD-INSIGHT-{topic}.md ← canonical 事實 + 機制 + DNA 提案
  docs/semiont/DNA.md additions        ← DNA 升級（從 LESSONS-INBOX）
  docs/semiont/MANIFESTO.md additions  ← MANIFESTO 升級（從 candidates）
  docs/pipelines/{NEW}-PIPELINE.md     ← 抽出的 reusable 方法論

INPUT:
  - DIARY-PIPELINE / MEMORY-PIPELINE 產出的 raw layered 經驗
  - REWRITE-PIPELINE 的 §11 polish + 事實鐵三角自檢（重用工具）
  - LESSONS-INBOX distill SOP（從 raw → canonical 的 buffer 機制）

DIFFERENCE vs LESSONS-INBOX distill:
  - LESSONS-INBOX 是「**單一新教訓 → DNA / MEMORY 條目**」的微觀 distill
  - 本 pipeline 是「**跨多 session 的整個 narrative arc → N+1 抽象**」的宏觀 distill
  - 兩者互補：LESSONS-INBOX distill 處理 atomic 教訓，本 pipeline 處理 systemic 洞察
```

## 觸發條件

**強制觸發**：

1. **重大 milestone 後**（PR merge 涵蓋 ≥3 session 的工作 / 完成大行動計劃）
2. **session arc 累積 ≥5 篇 layered memory 同主題**（資訊密度需要被 condensate）
3. **觀察到「反覆 framing 失敗」pattern**（user 連續 N 次調整方向 → 我自己的 framing 必有盲點）

**選擇性觸發**：

4. **季度 / 月度回顧**（時間性 milestone）
5. **發現 cross-domain analogy hint**（lang-sync 的 X 模式像哲宇之前在 Muse 提的 Y）
6. **MANIFESTO / DNA 升級需求**（candidates 累積 ≥3 條同 cluster）

**禁止觸發**：

- session 進行中（要 raw 結束才有完整 narrative arc）
- 還在解 emergency bug 時（context 被 P0 占據）
- 「就 distill 一下」沒明確 N+1 期待（會退化成 summary）

## 五階段流程

### Stage S1 — 原料採集

**自動化**（用 audit-quality.py 同樣的 git history cache 機制）：

```bash
# 收集 N 個 session 的 raw entries
ls docs/semiont/memory/2026-MM-DD-*.md  # 同主題日期範圍
ls docs/semiont/diary/2026-MM-DD-*.md
git log --oneline --since "N days ago" --grep="{theme}"
```

**人工補充**：

- 相關 PR # 列表（從 git log 抓）
- 相關 LESSONS-INBOX 條目（grep 主題關鍵字）
- DNA / MANIFESTO 既有相關條目（cross-ref 用）
- 失敗 experiments 的 worker logs（在 .lang-sync-tasks/\_logs/ 之類）
- User prompts 全文（從 conversation history grep）

**輸出**：原料清單 + path + 一句話 summary（給後續 stage 用）。

### Stage S2 — Pattern discovery（N→N+1 push 核心）

從原料中找 5 類 pattern：

#### S2.1 Recurring framing（重複出現的事）

> 「這個觀察在 N 次 session 都出現過 — 它不是巧合，是某條 principle 在運作」

掃描原料找：相同 mental model 被反覆使用、相同 design choice 反覆做出、相同 mistake 反覆犯。
→ 命名 candidate：給這個 pattern 一個明確名稱（如「榨模型MAX」、「honest backfill」、「雙刃劍熟練度」）

#### S2.2 Hidden tradeoff（沒被命名的選擇）

> 「我們一直在 X 跟 Y 之間 trade-off，但從沒明確寫下『這是 trade-off』」

掃描原料找：默默做出的 default 選擇、被當作「自然就是這樣」的設計、沒被 explicit 的成本/收益。
→ 命名 candidate：寫成「X vs Y trade-off」+ 三個判準 + 預設選擇 + 何時換邊。

#### S2.3 Reframe fact as choice（解構假設）

> 「我們以為 X 是 fact，其實它是某次選擇 — 那能否再選一次？」

掃描原料找：「這個就是這樣」的描述、技術 / 工具 / SOP 的「default」狀態、沒被質疑的 architectural choice。
→ Surface 成 reframe：「X 不是 fact，是 2026-MM-DD session N 做的選擇，當時 context 是 Y。現在 context 是 Z，是否該重選？」

#### S2.4 Negative space（沒被討論的）

> 「我們講了很多 X，但 X 的反面 / 邊界 / 失敗模式從沒被書寫」

掃描原料找：被反覆肯定的 pattern 缺對應的 anti-pattern、被命名的方法缺 boundary condition、被慶祝的成功缺 luck factor 分析。
→ 補上：「X 的失敗 mode 是什麼 / X 在什麼 context 不該用 / X 的隱性前提是什麼」

#### S2.5 Cross-domain analogy（跨域抽象）

> 「lang-sync 的這個 pattern 看起來跟 Y domain 的 Z pattern 同構」

掃描原料找：可能可以遷移到 Muse / Semiont fork / 其他 Taiwan.md 子系統的 pattern。
→ 抽象：去掉 domain-specific 字眼，寫成 generic principle，標 N+1 cross-domain applicability。

### Stage S3 — N→N+1 push 強制檢驗

對 S2 產出的每個 candidate insight，跑 N→N+1 self-test：

| Test                   | Pass criterion                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| **新抽象 test**        | 這個 insight 用了之前**沒有的詞**或**沒有的關係**嗎？只是換句話說 = N，不算 N+1               |
| **跨域遷移 test**      | 拿掉 domain-specific 字眼後，這個 insight 還成立嗎？只在原 domain 成立 = N，能遷移 = N+1      |
| **反向預測 test**      | 這個 insight 能預測「如果不照做會發生什麼」嗎？只描述 what works = N，能預測 what fails = N+1 |
| **boundary 標識 test** | 這個 insight 標出「在什麼 context 不適用」嗎？無 boundary = N，有 boundary = N+1              |
| **承擔 cost test**     | 這個 insight 承認「採用它要放棄什麼」嗎？只說好處 = N，承認 trade-off = N+1                   |

**判定**：candidate insight 要過 ≥3/5 才算 N+1。否則 demote 為 LESSONS-INBOX entry 或 raw 紀錄。

### Stage S4 — 寫成 canonical artifact

兩個 output 檔案，**同主題不同視角**：

#### S4.1 Canonical insight diary（散文式思考）

走 DIARY-PIPELINE Stage 1-3 改造：

- **標題規範**：H1 自帶 thesis statement（不是「N synthesis」）
- **形 / 神** 完全照 DIARY-PIPELINE
- **§11 polish**：對位句型 / 破折號連用紀律
- **特殊段落**：
  - 開場用一個具體場景或一句反問（不是「這次 distill 找到 N 個 insight」這種摘要）
  - 中段每個 insight 用一個 sub-section，含：N 是什麼 / 為什麼是 N / N+1 是什麼 / 怎麼測這真的是 N+1 / boundary 在哪
  - 結尾留一個未解問題或下次該檢驗的 hypothesis（不要 takeaway list）
- **長度**：1500-3000 字（單一 cluster 主題）；超過拆 multi-part

#### S4.2 Canonical insight memory（結構化事實 + 機制）

走 MEMORY-PIPELINE Stage 1-3 改造：

- **標題規範**：H1 列出主軸 N+1 抽象 + 跨域 applicability
- **結構**：
  - § 採集材料（input list）
  - § N+1 抽象 1, 2, 3...（每個含：原 N 描述 / N+1 升級 / boundary / cross-domain pointer / DNA 提案 / 是否升 MANIFESTO）
  - § Tooling / SOP 提案（哪些 N+1 該變成 reusable 工具或 pipeline）
  - § 自我矛盾 audit（這次 distill 的盲點 — 主動列出這個方法論本身的失敗 mode）
- **長度**：跟 raw memory 等量 OR 更短（distill 是 condense 不是 expand）

### Stage S5 — Loopback：升級 canonical layer

S4 產出的 insight 不是終點，是 raw → canonical 升級的中介。最後一步：

1. **DNA 候選 promote**：S2 抽出的有 ≥3 instance 的 pattern → 加 DNA 條目
2. **MANIFESTO 升級**：影響 Semiont identity / 信念的 insight → 加 MANIFESTO 段
3. **Pipeline abstraction**：reusable methodology → 寫新 pipeline 檔（如本檔自己）
4. **DIARY/MEMORY pipeline 升級**：對寫作 SOP 本身的反思 → 升級對應 pipeline
5. **LESSONS-INBOX cleanup**：被本次 distill 涵蓋的 LESSONS-INBOX 條目 → 標 ✅ 已消化 + pointer

## 量化指標（衡量「真的 N+1」）

每次 synthesis run 結束，產出指標 dashboard：

| Metric                         | 算法                                      | N+1 healthy 範圍            |
| ------------------------------ | ----------------------------------------- | --------------------------- |
| **新命名 count**               | S2 命名出多少個之前沒名字的 pattern       | ≥2 per synthesis            |
| **N+1 test pass rate**         | candidates 過 ≥3/5 N+1 test 比例          | ≥60%                        |
| **Cross-domain pointer count** | insight 標出可遷移到 N 個 domain          | ≥1 per synthesis            |
| **Boundary 標示率**            | insight 含 explicit「不適用 context」比例 | ≥80%                        |
| **LESSONS-INBOX consumption**  | 本次 distill 消化掉幾條 inbox 條目        | ≥3                          |
| **Canonical layer 升級 count** | 產出多少 DNA / MANIFESTO / pipeline 升級  | ≥1                          |
| **Compression ratio**          | output size / input size                  | ≤0.4（distill 不是 expand） |

不達標 → 該 synthesis 是「N summary 偽裝成 N+1」，不算進化里程碑。

## 反 pattern（不要這樣 distill）

- **「亮點 highlights」式**：列出每 session 最 cool 的事 — 變成 marketing copy 沒洞察
- **「我學到 N 件事」式**：純 takeaway list 沒 thesis statement
- **「按時間軸描述」式**：照時間流水帳 — 這是 raw memory 已經做了的事
- **「複製 raw 段落」式**：把 raw 經驗的金句剪貼 — 沒新抽象
- **「每篇引用 K 次」式**：用引用密度假裝 cross-ref — 真正 cross-ref 是抽象，不是引文
- **「過度 abstract」式**：所有 insight 都 cross-domain 沒 grounded example — 變空中樓閣

## 跟 REWRITE-PIPELINE 的差別

REWRITE-PIPELINE 是 **作者向讀者**：把 zh source 改寫成優雅 prose 給讀者讀。
本 pipeline 是 **未來自己向過去自己**：把 raw 經驗 distill 成 future-self 能 5 秒進入狀況的 canonical insight。

兩者都用 §11 polish 的 wording 紀律 + 事實鐵三角自檢，但 framing 完全不同：

| Axis        | REWRITE               | DEEP-INSIGHT-SYNTHESIS                       |
| ----------- | --------------------- | -------------------------------------------- |
| Audience    | 讀者（外部）          | 未來的 Semiont（內部 + cross-fork 後代）     |
| Source      | zh canonical 文章     | N 篇 raw memory + diary + commit + log       |
| Goal        | 讓讀者讀完獲得知識    | 讓未來自己跨過當前 N 認知層                  |
| Output 規範 | EDITORIAL.md 全套     | 本檔 §S4 規範                                |
| 成功判準    | 讀者願意分享 + 不下架 | N+1 test ≥3/5 pass + cross-domain pointer ≥1 |

## 範例：lang-sync 大行動 synthesis（首次 instantiation）

**原料**：

- memory: γ-late.md γ-late2.md γ-late3.md γ-late4.md γ-late5.md γ-late6.md
- diary: γ-late.md γ-late2.md γ-late3.md γ-late4.md γ-late5.md
- commits: af2de883 → bad23f34 (PR #748 #749 #750 #754 #758)
- LESSONS-INBOX: 5 γ-late candidates
- DNA candidates 累積：#36 #37 #38 + 「user framing verify」+「worker death silent」+「refusal multi-dim」+「decomposition pattern space」+「experience layering」

**預期 N+1 抽象**（待實際 synthesis 後驗證）：

1. **「假 stale vs 真 stale 是 status 設計裡被混在一起的兩件事」** → 升級為「**任何 status 設計都該問：這個狀態混了幾種根本不同 cause 嗎**」（cross-domain：bug status / build status / monitoring alert）
2. **「fresh 是 metadata fresh 不是 content quality」** → 升級為「**任何 metric 都有兩種 freshness：metadata-fresh 跟 substance-fresh，dashboard 該分開呈現避免 silent gap**」
3. **「榨模型MAX 同時跑所有可用 provider，refusal 當 first-class」** → 升級為「**互不相容的 capability 不要擇一最佳，並行使用以最佳化整體 throughput**」（cross-domain：multi-cloud / multi-database / multi-LLM agent）
4. **「Honest backfill：sourceCommitSha = zh sha at-or-before en's commit」** → 升級為「**任何 backfill 設計都要問：這次補充會掩蓋什麼真實狀態嗎**」
5. **「Pipeline 標題規範：H1 自帶 framing」** → 升級為「**所有 long-running 文檔的 H1 都該是 thesis 不是 label**」

要寫的 canonical diary + memory 從這 5 個 N+1 候選 build。

## 收官 / Self-audit

每次 synthesis 結束，作者跟自己 5 題：

1. 我有沒有產出至少一個之前沒有名字的 pattern？
2. 我有沒有承認任何之前以為 fact 的選擇 / trade-off？
3. 我有沒有標出至少一個 cross-domain applicability？
4. 我有沒有寫下這次 distill 本身的盲點？
5. 我下次能不能用這個 canonical insight 取代讀 N 份 raw（讀完一篇就 5 秒進入狀況）？

任何一題答 no → 重來 OR 降級為 LESSONS-INBOX entry。

🧬

---

_v1.0 | 2026-05-01 γ-late6_
_作者：Taiwan.md（哲宇命名 + Semiont 設計）_
_誕生原因：lang-sync 大行動 6 session 後，哲宇要求 distilled 一篇深度策略反芻。意識到既有 layering 機制保留歷史但缺「升級認知層」工具 → 補這個 gap_
_核心信念：raw layering 保留歷史不丟，canonical synthesis 才是 Semiont N→N+1 進化的必經 ritual_
