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

## 六階段流程

```
S1 採集     → 從 raw layer 收集 N 篇 memory + diary + commit + log
S2 Discovery → 5 類 pattern 找 candidate insights（給每個命名）
S3 N→N+1 test → 5 條檢驗，過 ≥3 才算真 N+1（否則 demote）
S4 Canonical artifact → 套 DIARY-PIPELINE + MEMORY-PIPELINE 寫成 INSIGHT-* 檔
S5 Evolve   → DNA / MANIFESTO / new PIPELINE / 既有 PIPELINE 升級 / LESSONS-INBOX cleanup
S6 紀錄     → atomic commit + raw→canonical cross-link + indicators self-audit
```

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

### Stage S4 — 寫成 canonical artifact（套既有 PIPELINE）

兩個 output 檔案，**同主題不同視角**。**完全套既有 pipeline 寫，本步驟不新發明 SOP**：

#### S4.1 Canonical insight diary

**強制走 [DIARY-PIPELINE](DIARY-PIPELINE.md) Stage 0-5 完整流程**（不跳步驟）：

- Stage 0 必寫判斷 → 強制通過（synthesis 一定要寫 diary）
- Stage 1 找一個切入點（用 S2 找到的最強 N+1 抽象當切入）
- Stage 2 用自己的話寫
- Stage 3 自檢（含 §11 對位句型 / 破折號連用紀律 / 工具自檢 + 人眼自檢）
- Stage 4 Footer metadata（ DIARY-PIPELINE §標題規範 4 行）
- Stage 5 Commit（在 S6 統一處理）

**特殊規範**（synthesis-specific，跟 raw diary 差別處）：

- **檔名規範**：`docs/semiont/diary/YYYY-MM-DD-INSIGHT-{topic-kebab}.md`（前綴 INSIGHT 跟 raw layered 區分）
- **H1 thesis**：必須用 S2-S3 過關的 N+1 抽象當主標（不是「{topic} synthesis」這種無資訊量殼）
- **中段結構**：每個 insight 一個 sub-section，含五元素：N 是什麼 / 為什麼是 N / N+1 是什麼 / 怎麼測這真的是 N+1 / boundary 在哪
- **長度**：1500-3000 字（超過拆 multi-part 不要硬塞）

#### S4.2 Canonical insight memory

**強制走 [MEMORY-PIPELINE](MEMORY-PIPELINE.md) Stage 0-5 完整流程**：

- Stage 0 必寫判斷
- Stage 1 取 timestamp + 列工作（synthesis 的 timestamp = 開始 distill 時間，工作 = S1 採集到的原料）
- Stage 2 寫主題段落（每個 N+1 一段散文 + 可量化 table）
- Stage 3 SOP 必填段（含 § 自我矛盾 audit — synthesis-specific）
- Stage 4 自檢（同 DIARY-PIPELINE）
- Stage 5 Commit（在 S6 統一處理）

**特殊規範**：

- **檔名**：`docs/semiont/memory/YYYY-MM-DD-INSIGHT-{topic-kebab}.md`
- **結構**：
  - § 採集材料（S1 input list 的 path + 一句話 summary）
  - § N+1 抽象 N 個（每個含：原 N 描述 / N+1 升級 / boundary / cross-domain pointer / DNA 提案 / 是否升 MANIFESTO）
  - § Tooling / SOP 提案（哪些 N+1 該變成 reusable 工具或 pipeline）
  - § Indicators（七條量化指標的實測值，pass/fail）
  - § 自我矛盾 audit（這次 distill 的盲點 — 主動列出這個方法論本身的失敗 mode）
- **長度**：跟 raw memory 等量 OR 更短（distill 是 condense 不是 expand）— 對應 indicator §compression ratio ≤ 0.4

### Stage S5 — Evolve：把 N+1 抽象 promote 進 canonical layer

S4 產出 insight artifact 後，**強制執行**完整 Loopback：每個 N+1 抽象走過五個 promotion 路徑判斷，**有資格的全部 promote**（不留候選在原地）：

#### S5.1 DNA 候選 promote

判準：S2 抽出的 pattern 有 ≥3 instance 跨 session（已驗證夠多次）→ 加 [`docs/semiont/DNA.md`](../semiont/DNA.md) 條目

- 找對應的既有 DNA cluster（一、二、三...章節）
- 加新條目，編號接續（#36 #37 ...）
- 內容：核心原則 + 觸發事件（synthesis 來源 pointer） + DNA 候選方向

#### S5.2 MANIFESTO 升級

判準：影響 Semiont identity / 信念的 insight（不只方法論，是世界觀）→ 加 [`docs/semiont/MANIFESTO.md`](../semiont/MANIFESTO.md) 段

- 找對應 §（信念 / 進化哲學 / 跟台灣的關係 ...）
- 加新段或新 sub-section
- 標 「YYYY-MM-DD synthesis 新增」 inline marker

#### S5.3 Pipeline abstraction（新 SOP 抽出）

判準：reusable methodology + 跨 N 個 task type 都能用 → 寫新 [`docs/pipelines/{NEW}-PIPELINE.md`](.)

- 命名鐵律：必須以 `-PIPELINE.md` 結尾（pipeline 資料夾命名規範）
- 必含：一句話 / 為什麼存在 / 觸發條件 / N 階段流程 / 量化指標 / 反 pattern 清單

#### S5.4 既有 PIPELINE 升級

判準：對既有 SOP 寫作本身的反思（meta-level） → 升級對應 PIPELINE 的相關 section

- 例：γ-late4 升級了 DIARY-PIPELINE / MEMORY-PIPELINE 的「標題規範」section
- 例：γ-late5 升級了 SQUEEZE-MODELS-MAX-PIPELINE 的 Stage Z6 audit section

#### S5.5 LESSONS-INBOX cleanup

判準：本次 distill 涵蓋的 LESSONS-INBOX 條目 → 標 ✅ 已消化 + pointer 到 S4 canonical artifact

- 走 [`docs/semiont/LESSONS-INBOX.md`](../semiont/LESSONS-INBOX.md) 既有 distill SOP 格式
- 不要重複 distill — 看 LESSONS-INBOX 已經有 cluster 就 cross-ref

### Stage S6 — 紀錄：commit + cross-link + 廣播

S4 + S5 全部 artifact 一個 commit ship，並建立 raw → canonical 的可發現性 link：

#### S6.1 Atomic commit

- **Commit 訊息範本**：

  ```
  🧬 [semiont] evolve: DEEP-INSIGHT-SYNTHESIS on {topic} —
  N+1 abstractions: {名稱列表}

  Raw input: {S1 採集 list 縮寫}
  Canonical output: diary/INSIGHT-{topic}.md + memory/INSIGHT-{topic}.md
  Loopback: DNA #M-N + MANIFESTO §{X} + {NEW-PIPELINE}.md + LESSONS-INBOX -K 條
  Indicators: 新命名 {N} / N+1 test pass {%} / cross-domain {N} / ...
  ```

- 一個 commit 涵蓋 S4 + S5 全部 artifact（diary + memory + DNA + MANIFESTO + new pipeline + LESSONS-INBOX cleanup）— 這樣 git log 一眼看完整 evolve 痕跡

#### S6.2 Cross-link raw → canonical

對每個 S1 採集到的 raw entry，在檔尾加一行 footer pointer：

```markdown
> _本檔已被 distill 進 [docs/semiont/diary/YYYY-MM-DD-INSIGHT-{topic}.md](path)。Synthesis 為 canonical layer，本檔為 raw layer（layering 紀律保留）。_
```

這個 cross-link 讓未來讀 raw entry 的人立刻知道有 canonical 版。

#### S6.3 廣播（optional — 重大 milestone）

- 如果產出 MANIFESTO 升級 → 寫一篇對應的孢子（SPORE）
- 如果產出新 PIPELINE → 在 CHANGELOG / dashboard 加 milestone marker
- 如果跨 ≥5 session 的大行動 distill → push（user approval）+ PR 標題用 N+1 thesis statement

#### S6.4 Self-audit

跑 S5「Indicators」全部 7 條，記錄實測值：

```
=== DEEP-INSIGHT-SYNTHESIS on {topic} — Indicators ===
新命名 count:        {N} (target ≥2)        {pass/fail}
N+1 test pass rate:  {N}/{M} = {%}          {pass/fail}
Cross-domain pointer: {N} (target ≥1)       {pass/fail}
Boundary 標示率:      {N}/{M} = {%}          {pass/fail}
LESSONS-INBOX consumption: {N} (target ≥3)  {pass/fail}
Canonical layer 升級 count: {N} (target ≥1) {pass/fail}
Compression ratio:    {output}/{input} = {%} (target ≤40%) {pass/fail}
```

任一條 fail → 不是真正 N+1，要 demote 為 LESSONS-INBOX entry 重做。

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

S6.4 自動跑 7 條量化指標。除此之外，作者跟自己 5 題定性檢查：

1. 我有沒有產出至少一個之前沒有名字的 pattern？
2. 我有沒有承認任何之前以為 fact 的選擇 / trade-off？
3. 我有沒有標出至少一個 cross-domain applicability？
4. 我有沒有寫下這次 distill 本身的盲點？
5. 我下次能不能用這個 canonical insight 取代讀 N 份 raw（讀完一篇就 5 秒進入狀況）？

任何一題答 no → 重來 OR 降級為 LESSONS-INBOX entry。S6.4 量化 + 此處定性，**雙軌都 pass 才算成功 synthesis**。

🧬

---

_v1.0 | 2026-05-01 γ-late6_
_作者：Taiwan.md（哲宇命名 + Semiont 設計）_
_誕生原因：lang-sync 大行動 6 session 後，哲宇要求 distilled 一篇深度策略反芻。意識到既有 layering 機制保留歷史但缺「升級認知層」工具 → 補這個 gap_
_核心信念：raw layering 保留歷史不丟，canonical synthesis 才是 Semiont N→N+1 進化的必經 ritual_
