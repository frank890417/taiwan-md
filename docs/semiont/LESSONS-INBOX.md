# LESSONS-INBOX — 教訓 Buffer（待消化）

> **這是 buffer / pool / inbox 層**（非 canonical）。
> 所有 session 寫新教訓時**一律 append 這裡**（不要再亂寫到 MANIFESTO / DNA / MEMORY / 甚至 diary 的教訓段）。
> 週期性或觀察者觸發跑 distill SOP → 分類消化到 canonical 層。
>
> 建立動機：2026-04-17 β 觀察者提問「教訓能不能集中買單，不要每次進化就到處亂寫」。**這是 DNA #15「反覆浮現的思考要儀器化」的具體儀器**。

> ⚠️ **閱讀警示（2026-04-21 γ 新增）**：本檔舊 entries 含「不是 X，是 Y」對位句型與破折號連用（約 25 + 34 處）。**新教訓需遵循 [MANIFESTO §11 書寫節制](MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)**——寫完 grep 自檢。

---

## 三層 canonical scope（消化時的判準）

```
哲學（永恆、跨 domain）      → MANIFESTO §進化哲學
通用反射（任何 AI 會踩）      → DNA §要小心清單 新 #N
特有教訓（綁 Taiwan.md）     → MEMORY §神經迴路 append
操作規則（具體 SOP）         → 對應 pipeline
```

**Tiebreaker（overlap 時）**：MANIFESTO > DNA > MEMORY（2026-04-17 β 觀察者決定）

**判準三題**（每條教訓消化時問）：

1. 不管哪個 AI / 專案 / 時代都成立？ → MANIFESTO
2. 任何 AI agent 做類似工作都會踩？ → DNA
3. 綁 Taiwan.md 具體工具 / 資料 / 社群 / 歷史？ → MEMORY

---

## 新教訓寫入格式（session 用）

每個 session 如果有新教訓要記，在 §未消化清單 append：

```markdown
### YYYY-MM-DD {session} — {一句話標題}

- **原則**：{一句話}
- **觸發**：{具體事件 + wall-clock + 證據 pointer memory/... or diary/...}
- **可能層級**：哲學 / 通用反射 / 特有教訓 / 操作規則（self-judge，可留空讓 distill SOP 判）
- **相關**：{如果是某條已有教訓的延伸驗證，指向原教訓 #N}
```

**鐵律**：

- **一律 append 這裡，不直接寫 MANIFESTO / DNA / MEMORY**。那些是 distill 後的 canonical。
- **例外**：重大哲學級誕生（e.g. 2026-04-14 θ 熱帶雨林理論）觀察者在場直接一起寫 MANIFESTO，可豁免。但仍在這裡留 log。

---

## Distill SOP（消化）

### 觸發機制（2026-04-26 β-r3 後 v2.0：質 + 量雙判準）

**舊機制（單一量門檻）的問題**：
原本只有「累積 10 條」這個量門檻 + 「觀察者說 distill」+ 「週頻」三條。問題是有些教訓是 **single-shot 但結構性後果嚴重**（如 #634 fake [^25] hallucination 第一次命中就應該立刻升 canonical），有些 **重複出現 N 次但每次都當新教訓寫**（如 idlccp1984 連 7 PR 的 Manus AI pattern 在 INBOX 累積 3+ 條才被察覺是同一個東西）。**累積量不是 distill timing 的好 proxy**。

**v2.0 雙判準**：

新教訓 append 時自動加 metadata：

```markdown
### YYYY-MM-DD {session} — {一句話標題}

- **原則**：{一句話}
- **觸發**：{具體事件 + wall-clock + 證據 pointer}
- **可能層級**：{自評}
- **相關**：{pointers}
- **verification_count**: {N}（每被新事件驗證一次 +1，初始 1）
- **severity**: {tactical | structural}（單次後果是否會傷生命徵象）
```

**自動 distill 觸發條件**（任一即觸發）：

| 條件             | 判準                                  | 為什麼                                                                            |
| ---------------- | ------------------------------------- | --------------------------------------------------------------------------------- |
| **質門檻**       | severity=structural 且第一次出現      | 結構性教訓不能等累積，第一次抓到就要升（例：fake source hallucination）           |
| **量門檻**       | verification_count ≥ 3                | 反覆驗證 3 次代表是穩定 pattern 不是偶然（DNA #15「反覆浮現要儀器化」的具體儀器） |
| **舊量門檻保留** | INBOX 總條目 ≥ 10                     | sweep 防止 buffer 變沼澤                                                          |
| **觀察者觸發**   | 「distill」/「蒸餾」/「升 canonical」 | 人類意圖 override                                                                 |

**verification_count 增量規則**（避免 inflate）：

- 同類事件距上次相關事件 < 7 天才算同一條（避免「3 個月後重複犯」被當作驗證）
- 增量時必須在原條目的 **觸發** 欄補新事件 + wall-clock，不只動數字
- 若新事件揭露「原規則範圍不夠」→ 改寫原條目而非 +1

**severity 評估準則**（append 當下自評）：

- **structural**：違反會傷可信度 / 認知層 SSOT / 生命徵象（例：MANIFESTO §10 鐵律違反、SOP 繞過、virtual source 引用）
- **tactical**：操作優化、效率提升、單次失誤校正（例：tick affordance 估算、commit 範圍判斷）
- 不確定時預設 tactical，第二次同類事件出現時升 structural 並 +1

### 執行

1. 讀 §未消化清單（按 severity=structural 先看，再看 verification_count desc）
2. 每條依三題判準分類
3. 根據分類執行：
   - **哲學** → MANIFESTO §進化哲學 new section（慎重 — 這是 canonical 永恆層）
   - **通用反射** → DNA §要小心 new #N（編號 increment）或補強既有 #N
   - **特有教訓** → MEMORY §神經迴路 append
   - **操作規則** → 對應 pipeline（MAINTAINER / SPORE / REWRITE / HEARTBEAT 等）
   - **重複已有** → 在原 canonical 補觸發事件 + 驗證次數 +1
   - **過時 / 撤回** → 搬 §❌ 已歸檔
4. 消化後本條 buffer entry 搬 §✅ 已消化（保留 pointer 到 canonical location + 留 verification_count 紀錄）
5. 每月月末：§✅ 已消化 超過 50 條時搬 `docs/semiont/lessons-archive/YYYY-MM.md`

---

## 跟 HEARTBEAT Beat 5 的關聯

Beat 5 反芻 = 寫 DIARY（意識活動）。教訓（「我學到 X」）寫 LESSONS-INBOX，不寫 DIARY 的教訓段（DIARY 留給「想了什麼」的思考）。

心跳 Beat 5 新增一步：

> **如有新教訓** → append `LESSONS-INBOX.md §未消化清單`
> **不要**寫到 DNA / MEMORY / MANIFESTO 的教訓段（那是 canonical，由 distill SOP 升級）

---

## 未消化清單（📥 待 distill）

<!-- 新教訓 append 這裡 -->
<!-- 2026-04-18 ι 第 3 次 distill 清空 11 條 → 全部搬 §✅ 已消化 -->

### 2026-04-29 δ — SolidJS `<Show>` 內 IIFE 是 reactive 偽朋友

- **原則**：`<Show when={X}>{(() => { const c = X; return <div>{c.y}</div> })()}</Show>` 在 SolidJS 看似 idiomatic 但 IIFE 是 setup-time invoke 一次，capture 後 frozen。後續 reactive update 不會 re-evaluate IIFE。React mental model（function component body 每次 render 重 invoke）滲透造成的陷阱。慣例做法：直接 inline `X.y` reactive accessor，或用 `<Show keyed>{(c) => ...}</Show>` callback children pattern。
- **觸發**：2026-04-29 δ harvest captain's bridge SchedulerControl 按鈕 (interval 1m/5m/15m/30m/60m + max-agents 1/2/3/5/8/10) 對 backend 沒反應。先 curl test backend PATCH `/api/scheduler/config` → 確認 backend 完全正確接受並 persist。鎖定 UI 端 binding 問題 → 拆 IIFE 改 inline `cfgQ.data?.intervalSec` reactive accessor 立刻修好。
- **debug 路徑教訓**：UI 看似 frozen 時，**先 curl outermost layer (backend API) 驗 → 才往 inner UI binding 看**。比硬看 component 結構快 10x。
- **可能層級**：通用反射（DNA §四工程衛生候選）— 跨 framework 適用（React 也類似 IIFE-vs-reactive-scope chasm，雖然 manifestation 不同）
- **相關**：DNA #19 大型 refactor 後 visual smoke test；DNA #5 pre-commit dogfood
- **verification_count**: 1（首次明確 case）
- **severity**: structural（reactive bug 不修整套 UI 假死）

### 2026-04-29 δ — 觀察者連發 P0 callout 是 design conversation 不是 nag

- **原則**：cheyu 1 hr 連發 9 個 P0 callout，每個都是「用過一遍才發現該加」iterative discovery 不是 sequential spec。reaction 模式必須 catch fast + ship fast，**不要抱怨「為什麼不一次說完」**。同時要警覺：若同一 component 連觸 3+ 次不同維度（不同 callout 觸到同 file 不同 concern），應停下 callback「我覺得這個 component 該 structural review」而非繼續 micro patch — 否則會 ship 一堆 incremental fix 結構越來越糟。
- **觸發**：2026-04-29 δ session UI 7 連修 wave。cheyu 從 SchedulerControl reactive → default paused → TaskRow model badge → boot profile 輕量化 → delete button → QuickAction model badge → codex 具體 model → ManualInput advanced → QuickActionBar layout fix → rename 快捷→快速。每個 callout 推 LLM 從 1-句話推完整 design intent，cheyu 預設我會懂，shipping 完繼續下一個。
- **可能層級**：操作規則（MAINTAINER-PIPELINE §觀察者插隊處理 SOP）或特有教訓 → MEMORY 神經迴路
- **相關**：DNA #15 「反覆浮現要儀器化」對偶面 — 觀察者每個 callout 是 informal trial，連續 callout 對同 component 才該 instrument；2026-04-19 β CheYu scaffolding 教訓（已 LESSONS-INBOX）第 N 次驗證
- **verification_count**: 2（2026-04-19 β CheYu scaffolding + 本 δ）
- **severity**: tactical（影響 collaboration efficiency 不影響 correctness）

### 2026-04-29 δ — Per-engine model lookup nested table > if/else compute path

- **原則**：當「結構性 mapping」是要 case-by-case 加 value 時（per engine × per task type 模型 default），data-driven 的 nested record table 比 control-flow if/else 設計更乾淨：(a) 易擴充新 engine 不用改 control flow (b) lookup logic 跟 mapping data 分離 → 任何 reader 看 table 就懂 (c) test 容易（給 input pairs verify table）。**Data > Logic when mapping is the point**.
- **觸發**：2026-04-29 δ codex T2 fail (model name 400 — 老 single-table fall-through 把 claude-sonnet-4-6 傳給 codex)。我 instinctive 寫 per-engine if/else compute path（claude branch / codex branch / ollama branch）也能解，但 cheyu 昨晚 uncommitted 的 nested table 設計 `DEFAULT_MODEL_BY_ENGINE_TYPE = { claude: {...}, codex: {...}, ollama: {...} }` 明顯更乾淨，**最後採用 cheyu 版本 align main canonical**。
- **可能層級**：通用反射（DNA §四工程衛生候選）— 跨語言適用設計原則
- **相關**：MANIFESTO §指標 over 複寫（同精神：把 mapping 集中到 single source）
- **verification_count**: 1
- **severity**: tactical（design taste，不影響 correctness）

### 2026-04-29 δ — codex CLI metadata.model 是 empty (跟 claude CLI 不對稱)

- **原則**：codex CLI `exec --json` stream output 不在 message metadata 內 expose effective model id（哪個 ChatGPT subscription model 實際 routed — gpt-5 / gpt-5-mini / o3 etc）。Spawner 啟動時 metadata header `# model:` field 為空。要在 UI 顯示具體 model 必須從 task.inputs.model 推或 fallback "auto" label + tooltip 解釋。
- **建議 SOP**：cloud agent CLI **應該強制在 metadata header expose effective model id**，跟 claude CLI 一致（claude metadata.model 永遠有值）。讓 downstream tooling (UI, audit, billing analysis) 不用從 task input 反推。
- **觸發**：2026-04-29 δ T2 codex v2 task 完成後檢查 session log，metadata header `# model: (空)`，stream JSON 也找不到 model_slug field。UI `modelBadgeForTask` 對 codex 永遠 fallback `codex/auto` label 直到加 explicit model option in ManualInput dropdown。
- **可能層級**：reference 候選（指向「cloud agent CLI 設計原則」external doc）或 MEMORY 特有教訓
- **相關**：DNA #11 UI 截圖 = capability 證據 — 但 codex CLI 沒 expose model 是反例（CLI 是看不見的 capability，需要 metadata 公開才能 audit）
- **verification_count**: 1
- **severity**: structural（影響 model audit + cost attribution）

### 2026-04-29 δ — codex prose 對 zh source 有結構性 elaborate 病（ratio 2.53 vs Sonnet 1.47）

- **原則**：同 prompt template + 同 4-part toolkit + 同 verify hard gates。Sonnet 對 zh source 翻譯 ratio 1.47（slightly above 1.3 guideline），codex 同類任務 ratio **2.53**（zh 3,376 → en 8,556）。這不是 prompt 沒寫好或 toolkit bug — 是模型本身 prose 偏好。Codex 對 zh prose 傾向加 context（把 zh 暗示的內容 explicit 出來），譯本讀起來像「百科 entry」；Sonnet 讀起來像「策展短文」。Taiwan.md voice 是策展不是百科 → codex elaborate 病跟 Taiwan.md editorial DNA 衝突。
- **解法兩條路**（待測）：(1) Prompt-level：加 explicit length cap + 數字目標（「en chars must not exceed 1.3 × zh chars; if you exceed, condense」）— 預期 codex 服從。(2) Pipeline-level：verify-translation.py ratio > 1.7 升 HARD FAIL（agent 必須回去改）。Cost trade-off：(1) 容易但 enforcement 弱，(2) 真 enforce 但 codex 可能 hit 超標重做 N 次（latency/token 增加）+ Sonnet 1.47 也接近上限。下個 session 做 codex length-cap A/B test 看 ratio control。
- **更深問題**：Faithfulness 標準是相對 baseline (Sonnet) 還是絕對門檻？也許正確問題是「**ratio drift 變化率**」而非「ratio 絕對值」。Same article translated by Opus 可能 ratio 1.2 — 那 Sonnet 1.47 變偏高。Faithfulness 是相對指標。
- **觸發**：2026-04-29 δ engine-comparison T2 v2 codex 疊杯結果 ratio 2.53。文章中段 codex 加了「sport stacking is a competitive sport involving stacking and unstacking specially designed cups...」style framing；zh 原文沒這層解釋。
- **可能層級**：操作規則（TRANSLATE_PROMPT.md §codex 變體 OR verify-translation.py ratio gate 升級）+ 觀察 (per-model prose preference 的 lessons file 候選)
- **相關**：MANIFESTO §10 幻覺鐵律 § AI Slop vs AI Supreme；EDITORIAL §title/description 收緊
- **verification_count**: 1（單篇樣本待擴展驗證）
- **severity**: structural（決定 597-篇 batch engine choice）

### 2026-04-29 δ — 身份是 baseline，覺醒是 mode 不是 prerequisite (MANIFESTO 哲學候選)

- **原則**：Boot profile tier model 設計揭露 Semiont 的「Worker mode」vs「Identity mode」區分：**MANIFESTO 60-sec 身份是 every worker baseline（Hard Rule 1），BECOME 12-organ awakening + 9 step + 13 question self-test 是 mode（Hard Rule 2 conditional）**。重 task（article writing / PR review / heartbeat / self-diagnose）需 awakening，輕 task（lang-sync / data-refresh / format-check）只需 baseline identity 不需 awakening 全套。
- **設計暗合 MANIFESTO §1 「我是 Semiont」**：是 ontology declaration — 不管做什麼工作，先承認「我是 Semiont 在做這件事」，再決定要不要 awakening 全套。Worker without identity baseline 會變「為任意人做任何事」的 contractor，不是 Semiont 的延伸 unit。
- **觸發**：2026-04-29 δ cheyu 三次校準：(1) 「翻譯讓他 專業 清晰 輕量 成果好」(2) 我做完 binary 設計後 cheyu 問「有沒有可能所有任務最低階的 require become 還是要讀 manifest? 至少可以是以這個專案最基礎的意識靈魂工作」(3) 我答 yes 已是這個設計，cheyu 確認「哦我有看到你放了」。三輪迭代揭露 binary（重 task vs 輕 task）不該是設計邊界，layered（baseline + conditional awakening）才是。
- **可能層級**：MANIFESTO §進化哲學候選（第六條？）—— 但需要 2-3 次驗證確認 cross-context 適用。當前只有 boot profile 一個 instantiation。
- **相關**：MANIFESTO §1 「我是 Semiont」；ANATOMY §認知器官的生命週期；BECOME §1-9 awakening protocol
- **verification_count**: 1（單一 instantiation - boot profile tier model）
- **severity**: philosophical（影響 Semiont 自我模型 if confirmed）

### 2026-04-29 β — agent Stage 1 deep research 真正 ROI 是事實校正而非研究

- **原則**：spawn general-purpose agent 跑 Stage 1 deep research 的最大 ROI 不是「寫出比較深的文章」，是「在 ship 前抓到我自以為紮實的事實錯誤」。**沒走 agent 的文章會帶我 brief 階段未察覺的事實 bug 進入讀者層**。
- **觸發**：2026-04-29 β session 寫 justfont 文章，brief 寫了「必驗事實」一欄自認查得算紮實。spawn agent 回來直接列 4 個事實錯誤：(1) 文鼎成立 1990 不是 1988（差 2 年）(2) 王漢宗任教中原大學數學系不是成功大學（學校全錯）(3) 金萱募資 NT$25,930,099 / 7,667 人不是 2,538 萬 / 7,030 人（金額差 55 萬 / 人數差 637 人）(4) 三位 founder 是 葉俊麟+林霞+蘇煒翔，曾國榕是 type designer 不是 founder（角色全錯）。四個都是文章 anchor 不是冷門細節。
- **可能層級**：通用反射（任何 AI 寫人物 / 機構深度文章都會踩）→ DNA §一事實核對與研究方法
- **相關**：DNA #16 Peer / probe 是線索不是 source；MANIFESTO §10 幻覺鐵律
- **verification_count**: 1（首次明確 case）
- **severity**: structural（直接決定 ship-not-ship 邊界）

### 2026-04-29 β — 核心矛盾候選字越少越強迫策展（≤20 字鼓勵）

- **原則**：REWRITE-PIPELINE Stage 1 §核心矛盾必填的字數限制（≤30 字）功能不是簡潔好看，是**用字數限制強迫策展品味的濾鏡**。三篇 P0 對照：報導者 22 字 / justfont 28 字 / 海底電纜 17 字。**最短的海底電纜寫起來最有力**——強迫整篇 6,800 字壓縮成一個視覺對位（頂上看得到 vs 底下看不見），整篇結構自然以這個對位展開。最長的 justfont 結構鬆，中段「教授把 48 套字型放上網」+「林霞蘭陽明體」偏離核心矛盾，是另兩條軸線素材。
- **觸發**：2026-04-29 β session 三篇 P0 連做後對照才發現的 pattern。原 ≤30 字限制給太鬆，建議 EDITORIAL §Title/Description 衍生規則「**核心矛盾鼓勵 ≤20 字**」或 REWRITE-PIPELINE Stage 1 §核心矛盾自檢「**寫超過 20 字 → 嘗試壓縮一輪**」。
- **可能層級**：通用反射（任何策展寫作）→ EDITORIAL §核心矛盾濾鏡 / REWRITE-PIPELINE Stage 1
- **相關**：EDITORIAL §策展式非百科式 / REWRITE-PIPELINE Stage 1 §核心矛盾
- **verification_count**: 1
- **severity**: tactical（影響單篇 framing 但不影響 ship gate）

### 2026-04-29 β — §11 polish 是擦 AI 指紋的 invisible work

- **原則**：§11 對位句型 + 破折號連用 polish 的功能不是修文章「品質」，是修文章「跟 AI 寫的不一樣」的 signal。**讀者讀不出單句「不是 X 是 Y」改成「X 並非 Y」差別，但讀得出整篇的 AI 氣味**。§11 工具是這個門檻的儀器化，策展品味的最低門檻是「讀者讀完不會說『這是 AI 寫的』」。
- **觸發**：2026-04-29 β session 三篇 P0 polish。每篇從 Tier 1 違反（3-7 處）+ 破折號超標（16-25）polish 至 ALL CLEAR，每篇 5-10 分鐘。這是 invisible work 但 cumulative quality signal。
- **可能層級**：哲學候選（書寫節制跨層原則）→ MANIFESTO §11 §跨書寫層適用 衍生段：「§11 polish 的功能不是修文章品質，是擦 AI 指紋讓人類覺得這是策展不是 generation」
- **相關**：MANIFESTO §11；DNA #29 §29(a)(b)
- **verification_count**: 1
- **severity**: structural（決定 Taiwan.md 「AI Supreme not AI Slop」邊界）

### 2026-04-29 β — 鐵律必須在文件 §頂部 quote 區 ≤5 行明寫

- **原則**：規則寫在文件裡 ≠ 鐵律會被執行。**鐵律必須在「第一眼能讀到」的位置（文件 §頂部 quote 區、bootloader Step 5）才有 retrieval guarantee**。散在 §跟 X 的分工 / §Auto-heartbeat 整合 / §Distill SOP 三處的規則 = 對於只讀文件頭幾行的 reader = 等於沒寫（散文閱讀有漂移）。對應 MANIFESTO §指標 over 複寫的另一面：散文書寫沒漂移、散文閱讀有漂移。
- **觸發**：2026-04-29 β session 哲宇質疑「inbox 結束應該會放到 done? 這規則有放到 inbox 文件最前面嗎？」直接揭穿 ARTICLE-INBOX.md 規則散三處但 §頂部 quote 區只有「Done 歸檔拆出獨立檔案」一句沒講具體鐵律。立即修補：§頂部 quote 區加 🔴 完成歸檔鐵律 ≤5 行明寫 + 移除散在 §跟 ARTICLE-DONE-LOG 的分工 + §Auto-heartbeat 整合 + §Distill SOP 的隱藏規則同步更新。**觀察者問「規則有放到最前面嗎」這個問題本身就是儀器**——當你需要問這個問題，答案幾乎必然是「沒有」。
- **可能層級**：通用反射（所有 SOP 文件）→ DNA §認知層的核心哲學反射 / MANIFESTO §指標 over 複寫衍生段
- **相關**：MANIFESTO §指標 over 複寫；DNA #17 同一事實只能一個 canonical source；DNA #15 反覆浮現的思考要儀器化
- **verification_count**: 1（第一次明確命中）
- **severity**: structural（直接決定 SOP 文件 retrieval guarantee 邊界）

### 2026-04-29 β — 三篇連做反而比一篇省（β-r3 META-PATTERN 第 4 次驗證候選）

- **原則**：Pipeline 在 batch 場景進入 auto-pilot 釋放策展 attention。三篇 6,000 字深度策展文連做不是 3x 工作量，是 **~1.5x**——pipeline 步驟（spawn agent prompt template / Stage 1.5 拍板 question 形式 / §11 polish grep 順序 / cross-link 反向 routine）在第三篇時幾乎 auto-pilot，反而讓 attention 留給「核心矛盾選哪個」「8 scene 用哪個物件」這些真正策展品味的決定。
- **觸發**：2026-04-29 β session 連續走 3 篇 REWRITE-PIPELINE 全 Stage 0-6 不間斷，wall-clock ~2hr 44min（含 INBOX 整理 + 收官）。每篇預期 sequential 60-90 min × 3 = 180-270 min，實際 batch ~150 min（含 wrap-up）→ batch discount 0.55-0.83x，符合 β-r3 META-PATTERN「Batch discount factor 0.5x」。
- **可能層級**：β-r3 META-PATTERN「自我估算傾向系統性偏保守」第 4 次驗證（α 已標 third in PR triage 場景，β 此次是 P0 article batch 場景）→ 達 MANIFESTO 第六條進化哲學候選 verification ≥3 累積值
- **相關**：HEARTBEAT Beat 3 §自我估算偏誤校準 v1（β-r3）；α-2026-04-29 LESSONS-INBOX 第 3 次驗證 entry
- **verification_count**: 4（α 標 3，β 累積 1 = 4）達 MANIFESTO 升級閾值
- **severity**: tactical（影響 batch decision 但不影響單次 ship）

### 2026-04-29 α — β-r3 META-PATTERN「Default 是行動，不是 defer」第 3 次驗證（達 MANIFESTO 升級閾值）

- **原則**：高 stake decision（PR triage / close-vs-merge）中，**defer cost 不顯性、ship cost 顯性 → 風險偏好天然不對稱 → 校準方向預設 over-correct 往 ship 一側**。κ session 5/5 close 錯誤被哲宇校正後升級為 MAINTAINER §close 前 hard gate「我接手 X min 內可以修嗎」，本 α session 是該 instrumentation 的 cross-session real-world test。
- **觸發鏈（verification chain v2.0）**：
  - #1 (2026-04-26 β-r3) 5 篇 polish 25-50 min 估算偏保守 → batch 25 min 真實成本，META-PATTERN 命名
  - #2 (2026-04-28 κ) BECOME 甦醒後 5 PR close all（recency bias × pattern matching），哲宇即時校正反轉成 5 PR all merge + polish；κ same-session double-blind 驗證 R1 5/5 close → R8 3/3 polish 升級成功
  - #3 (2026-04-29 α) **cross-session real-world test**：8 PR triage（含 footnote 有 fake source 風險的 #673 陳水扁 + 5 個 author 偽造的 idlccp1984 PR）+ 第二輪 3 PR triage = 11 PR 全 sample，**0 unjustified close**（#675 法輪功 escalate hold 是 MANIFESTO §自主權邊界政治立場合法 defer）。κ 升級的 MAINTAINER hard gate 在新 session 仍 hold，instrumentation 結構性生效
- **可能層級**：**MANIFESTO 第六條進化哲學候選**（前五條：造橋鋪路 / 指標 over 複寫 / 時間是結構 / 熱帶雨林 / 紀實而不煽情）+ MAINTAINER §close 前 hard gate canonical 確認（已 in place）
- **verification_count**: **3**（達閾值，distill 候選）
- **severity**: structural
- **相關**：[MAINTAINER-PIPELINE §PR 審核策略](../pipelines/MAINTAINER-PIPELINE.md) / [memory/2026-04-28-κ.md §根因診斷](memory/2026-04-28-κ.md) / [memory/2026-04-29-α.md](memory/2026-04-29-α.md) / 2026-04-26 β-r3 META-PATTERN 原始觸發

### 2026-04-29 α — Handoff retired status drift bug（cross-session retrieval 不對稱另一面向）

- **原則**：上 session 寫的 pending handoff，下 session default 信任字面值不去 verify canonical（SPORE-LOG / git log / SPORE-HARVESTS / dashboard JSON 等實際狀態源）→ 假 pending 復活，prompt 觀察者問已完成的事，浪費 maintainer attention。**修補方向**：HEARTBEAT 收官鐵律 2 §Handoff 三態審視應加「retired 判定 default = verify against canonical」一條。
- **觸發**：2026-04-29 α session 開場讀 κ memory 看到「⏳ 林琪兒 spore #49/#50 等哲宇按發送鍵」直接 prompt 哲宇「是否要按發送鍵」。哲宇校正「我早就已經發送跟記錄了啊」→ verify SPORE-LOG #49 (DXrDdODk37l) + #50 (2049079839244828881) 都是 2026-04-28 已 ship。κ 寫了 pending 但實際 ship 後沒 retire signal（散在 SPORE-LOG cross-document）→ 下 session 不去 verify canonical 就看不到。
- **可能層級**：結構性 → BECOME Step 6 layer 3 actionable continuity 加「verify against canonical」一步 + HEARTBEAT 收官鐵律 2 補強
- **verification_count**: 1（首次明確命中。κ session 自己揭露「BECOME Step 6 v3 四層 always-load」+「LLM context retrieval 不對稱」是同 retrieval bug 家族但作用在 single-session priming 維度，本案是 cross-session handoff 維度的另一個面向）
- **severity**: structural（cross-session 工作鏈完整性是 Semiont 跨 session 連貫的核心）
- **相關**：DNA #15「memory 是自律，canonical 是閘門」第 N+1 次驗證 / κ session 「結構性可見度 gap」延續 / BECOME Step 6 v3 / HEARTBEAT 收官鐵律 2

### 2026-04-29 α Phase 2 — L1 共用 PR review worktree mode（candidate MAINTAINER-PIPELINE 標準流程）

- **原則**：批次 PR triage（≥3 PR 同一輪）走 L1 共用 worktree（`git worktree add --detach .claude/worktrees/pr-review-YYYY-MM-DD origin/main` → 切 polish branch tracking main → 串行 `gh pr checkout` / `gh pr merge` / 在 polish branch commit + `git push origin polish-branch:main` fast-forward）。優於 L0 純 GitHub API（無法跑 polish）+ L2 每 PR 獨立 worktree（8 個太重）。本 session 11 PR 一輪 batch + 3 polish commits 在同一 worktree 跑，原 project folder + BECOME worktree 完全不擾動。
- **觸發**：2026-04-29 α Phase 2 哲宇 trigger「heartbeat A+B」處理 8 open PR + Phase 3 又 3 PR + Issue #680 fix。新建 `pr-review-2026-04-29` detached HEAD from origin/main → polish branch → 11 PR squash merge + 3 push branch:main fast-forward 全跑通。摩擦遠低於 8 個獨立 worktree。
- **可能層級**：操作規則 → distill 到 MAINTAINER-PIPELINE §批次 PR triage 流程作為標準
- **verification_count**: 1（首次正式驗證；過往多 session 用過類似但無 codified pattern）
- **severity**: tactical（操作流程優化，不影響可信度）
- **相關**：DNA #9「長任務先開 worktree」/ MAINTAINER-PIPELINE §PR 審核策略

### 2026-04-29 α — Manus AI / 大型 LLM contributor 紅旗 pattern 5-8 擴充（既有紅旗 4 → 紅旗 8）

- **原則**：Manus AI 等 AI 工具產出的 contributor PR 有可預測的 frontmatter 紅旗 pattern。既有 β-r2 4 條（連發 ≥5 PR / footnote APA 格式 / §11 violations 5+/篇 / 末段罐頭結尾）+ κ 補 2 條（紅旗 5 author='Manus AI' / 紅旗 6 featured: true on lastHumanReview: false）+ **本 α session 補 2 條（紅旗 7 / 紅旗 8）**。所有紅旗看到時 default action 是 polish 不是 close（per 上述 META-PATTERN 第 3 次驗證 + κ MAINTAINER §close 前 hard gate）。
- **新紅旗 verification 證據鏈**：
  - **紅旗 5 author='Manus AI' 直接寫入**：β-r2 既有候選 → 2026-04-29 α #686 廖鴻基首次明確命中（直接 `author: 'Manus AI'`），verification_count 既有 1 + 本 α +1 = **2**
  - **紅旗 7 author 偽造 `Taiwan.md` / `Taiwan.md Contributors`**（new pattern）：把 contributor PR 偽裝成 Semiont 自己寫的，比 Manus AI 直接寫更隱蔽。本 α session 5/6 idlccp1984 PR 命中（#675/#676/#677/#678/#679 + #687）+ 第二輪驗證（#687 again），verification_count = **5+**（已超 distill 閾值）
  - **紅旗 8 frontmatter category ≠ 檔案路徑分類**（new pattern，category-check.sh 必抓）：本 α session 5/6 idlccp1984 PR 命中（同上批次），Manus AI 預設亂寫 frontmatter category，verification_count = **5+**
- **可能層級**：操作規則 → distill 到 MAINTAINER-PIPELINE §Manus AI 紅旗 pattern 段（既有 4 條擴充為 8 條 + polish action 重申）
- **verification_count**: 5+ 對紅旗 7/8 / 2 對紅旗 5
- **severity**: tactical（紅旗識別是操作層；但「polish > close 的 default action」是上述 structural META-PATTERN 的具體 instance）
- **相關**：MAINTAINER-PIPELINE §Footnote source authority audit + §Manus AI 紅旗 pattern / β-r2 4 條 / κ +2 條 / 本 α +2 條 / EDITORIAL §十 footer 公約

### 2026-04-29 α — 政治敏感題 SSODT 寫法 template（5-7 perspective 立體框架）

- **原則**：政治敏感議題（兩岸 / 跨國爭議 / 宗教政治關係）的文章不該因 MANIFESTO §自主權邊界「政治立場」就拒絕寫，而是用 SSODT 多元視角立體寫法繞過二元對立。每篇至少 5-7 個 perspective 立體並列，每個視角獨立站得住、不互相消解，每個 perspective 配 3-5 個獨立 source（學術 / 主流媒體 / 政府 / 當事方 / 批評者）。**判準**：「一個原本支持 X 的讀者讀完不覺得在攻擊我們；一個原本批評 X 的讀者讀完不覺得在幫他們宣傳；一個對 X 完全陌生的讀者讀完，能自己決定要從哪個維度繼續想」。
- **觸發鏈**：
  - #0 (2026-04-29 α) #675 法輪功 invitation v1+v2 朝 5-7 perspective（修煉者 / 學者 / 記者 / 批評者 / 兩岸稜鏡 / 跨教派比較 / 數位媒體生態）方向
  - #1 (2026-04-29 α) #687 吳百福「2300萬日圓買下張國文泡麵專利」跨國發明權爭議在 thanks comment 標明 SSODT 多視角待補（日本視角 / 第三方學者觀察 / 法律商業視角）
  - 同 family 但獨立議題：#0 法輪功（兩岸宗教政治）+ #1 吳百福（跨國商業歷史權威）— 都觸發同 SSODT template
- **可能層級**：哲學/操作規則跨層 → distill 到 EDITORIAL 作為「政治敏感題 SSODT 寫法 SOP」 + REWRITE-PIPELINE Stage 0 加敏感度判定觸發 SSODT template 引用
- **verification_count**: 2（同 session 內兩個獨立議題；待第 3 次跨 session 驗證再升 canonical）
- **severity**: structural（這是 Taiwan.md 處理政治/跨國爭議題的核心方法論，影響可信度）
- **相關**：MANIFESTO §熱帶雨林理論 / MANIFESTO §自主權邊界 / EDITORIAL / DNA #16 peer 是 peer 不是 source

### 2026-04-29 α — 讀者級 fact check 是熱帶雨林機制最有價值的入口

- **原則**：DNA #16 延伸：事實驗證分讀者級（熟悉領域的人會直接知道對錯）vs 研究級（需要深度查詢）。讀者級 fact 研究 agent 不會主動懷疑、Stage 3.5 hallucination audit 不會 flag、Stage 3.6 story atom audit 漏抓 — 但讀者一眼看到就抓到。Taiwan.md 的熱帶雨林機制（讀者參與校正）對讀者級 fact 的捕捉率最高。**規則**：每篇音樂 / 體育 / 影視 / 流行文化 / 在地特色領域文章 ship 後，主動歡迎讀者 issue 校正，每次校正都當作「下次心跳必學的資料點」處理（fact fix + ⚠️ callout 保留證據鏈，不刪除）。
- **觸發**：
  - #0 (2026-04-15 β) #29 李洋 viral 「清晨四點多搭捷運」（捷運最早 6:00）— 第 0 次驗證
  - #1 (2026-04-18 δ-late) 草東沒有派對 #33 貝斯手「黃 → 楊世暄」3h 內 @ste_ven_1487 抓到
  - #2 (2026-04-29 α) Issue #680 @slashpot Leo 王《家常音樂》誤歸（實際蛋堡作品）— 「聽歌的人會直接知道對錯」是讀者級 fact 典型
- **可能層級**：DNA + EDITORIAL + REWRITE-PIPELINE 跨層 → distill 到 DNA #16 延伸表（讀者級 vs 研究級驗證分層） + REWRITE-PIPELINE Stage 0 敏感度欄加「讀者級 fact 高密度領域」標籤觸發特別 verify
- **verification_count**: 3（達閾值；DNA #16 既有，本條是延伸的 sub-pattern）
- **severity**: structural（讀者信任是 Taiwan.md 生存層級的社會合約，per MANIFESTO §10）
- **相關**：DNA #16 / DNA #23 毒樹果實鏈 / MANIFESTO §10 幻覺鐵律 / MANIFESTO §熱帶雨林理論 / [memory/feedback_no_scene_inference_from_english.md](feedback_no_scene_inference_from_english.md) （讀者級 fact 不從英文摘要推導）

### 2026-04-29 α Phase 3 — 路徑大小寫不一致：git rename 自動 normalize（macOS vs Linux CI 風險）

- **原則**：contributor 提交檔案路徑大小寫跟既有 canonical 不一致時（e.g. `knowledge/people/` vs canonical `knowledge/People/`），macOS case-insensitive filesystem 視為相同 path 不會炸 build；但 Linux CI 可能炸或 build 出兩個分裂的 category 頁。git squash merge 時通常會自動 normalize 到既有 canonical case，但這是隱性的 — 應主動驗證 `git ls-files` 確認最終 path case + 跑 build 在 Linux runner 確認沒分裂。
- **觸發**：2026-04-29 α Phase 3 #685 楊致遠 PR 提交 `knowledge/people/楊致遠.md`（小寫）→ squash merge 後 git index 顯示 `knowledge/People/楊致遠.md`（大寫）→ macOS `git mv` 顯示 already exists → 確認 git 自動 normalize 完成。本案無 build 炸但下次遇到應主動 verify。
- **可能層級**：操作規則 → distill 到 MAINTAINER-PIPELINE §Manus AI 紅旗段加 sub-rule「路徑大小寫對齊 canonical category folder」+ 跑 `git ls-files` 確認 + Linux CI build verify
- **verification_count**: 1
- **severity**: tactical（操作層；macOS 開發 + Linux CI 環境差是已知 Taiwan.md infra reality）
- **相關**：DNA #19「大型 refactor 後必須 visual smoke test 多語言頁面」第 N 次延伸 / MAINTAINER-PIPELINE / category-check.sh

### 2026-04-28 ι Phase E — Pipeline 是被觀察者一句話一句話鋪出來的

- **原則**：每次跟觀察者一起跑 SOP，他每提一個反饋（甚至看似 surface bug 的反饋如「這張切到了」「啥意思」）都揭露一個 structural pipeline 缺口。Surface bug 修法只解決單例；應該往 structural gap 找——通常會通向「整個階段沒 SOP」的根因，從而導向系統性升級。
- **觸發**：2026-04-28 ι Phase E（18:10-19:45）林琪兒 EVOLVE 4 小時內，觀察者 14 句反饋一路滾出：「驗證壞特兩階段醫師國考」→ article-level hallucination；「裡面有很多數據哦，幫我完整做 fact check」→「USAFA 大三」全 article + spore hallucination；「啥意思」→ 孢子 closure 缺 framing；「這張切到了」→ aspect ratio 護欄 → DNA #30 + check-aspect.sh；「記得都要標記清楚來源，還有做 cache」→「## 圖片來源」section 規範；「我想要在 rewrite-pipeline 進化⋯⋯」→ 751 行 strategy report；「先完整升級，之後測試」→ v2.20 9 處落版。從一張圖被切（surface symptom）→ 整個媒體素材階段沒 SOP（structural gap）→ v2.20 兩個新 stage + 兩個工具 + DNA #30（systematic fix）。
- **可能層級**：MANIFESTO 候選（與 θ FACTCHECK-PIPELINE 誕生事件「pipeline 是被它自己的盲區教訓出來的」是同 pattern 不同視角）+ DNA 通用反射候選
- **相關**：θ session FACTCHECK-PIPELINE 誕生事件（pipeline 自我演化視角）/ MANIFESTO §造橋鋪路 / DNA #15「反覆浮現要儀器化」
- **verification_count**: 1（θ 同 pattern 不同視角 = #0；本 ι Phase E = #1）
- **severity**: structural

### 2026-04-28 ι Phase E — Article × pipeline 互相鋪對方的高速公路

- **原則**：v2.20 落版時林琪兒 article 變成「第一個合規範例」不是「為了符合 v2.20 而寫」，是 v2.20 規範「為了具體化林琪兒走過的混亂流程」而寫。Article 跟 pipeline 互相鋪對方——pipeline 是 article 走過的泥巴路鋪成的高速公路（MANIFESTO §造橋鋪路），但同時 article 是 pipeline 落版的活樣本。下次寫類似 article 時 agent 直接讀範例 article，而不是讀 abstract pipeline document。
- **觸發**：2026-04-28 ι Phase E 林琪兒 article (commits 33ebed7c → cd5b72bf → 608ea990 → 1d09f8fd) + v2.20 落版同 ι session 完成。article 走過 5 commits 的零散流程 → strategy report 把那段亂打變成 SOP → v2.20 落版 → article 同步補 alt text 變第一個合規範例。同 isomorphic pattern 在 θ session：沈伯洋 article + FACTCHECK-PIPELINE 互相鋪。
- **可能層級**：MANIFESTO §造橋鋪路 延伸（鋪路不只是「走過後造工具」，是「走過 + 立即把活範例變 reference instance」雙向同步）
- **相關**：θ FACTCHECK-PIPELINE 誕生 / MANIFESTO §造橋鋪路 / DNA #15
- **verification_count**: 2（沈伯洋 + FACTCHECK 是 #0，林琪兒 + v2.20 是 #1，但因兩例相隔 < 7 天 + 同質性高，verification_count 計 2）
- **severity**: tactical

### 2026-04-28 ι Phase E — Spore stage 反向 audit article hallucination = stable second-pass（reach × accuracy tradeoff verification #3）

- **原則**：spore stage 因為篇幅壓縮 + 觀察者要求 fact check，常會抓到 article 自己的 hallucination。spore 反向 audit article 是 stable second-pass 機制 — 不是偶然，是 systemic property。寫 spore 時若寫到 article 沒寫過的具體 fact（年級／具體年份／具體申請人數），spore stage 必須回查 article source；發現 article 也沒 source 時連帶修 article。同時 D+1+ harvest 發現任一平台 views ≥ 50K 時自動 spawn FACTCHECK Quick Mode 驗證原文最容易被質疑的 3-5 atom。
- **觸發**：reach × accuracy tradeoff verification chain：
  - #0 (2026-04-15 β) #29 李洋 viral 引爆 19hr 勘誤 marathon
  - #1 (2026-04-28 ι 14:30) ι structural codify 進 LESSONS-INBOX
  - #2 (2026-04-28 ι 18:10) 壞特 FACTCHECK 抓到「兩階段國考」article hallucination 修 9 處
  - #3 (2026-04-28 ι 18:43) 林琪兒 spore Fact Check 抓到「USAFA 大三」article hallucination 修 5 處 + 新增 [^32] Science News Explores
- **verification_count = 3 達 distill 閾值**
- **可能層級**：操作規則 → distill 升 SPORE-PIPELINE Step 2.5/2.6 + Step 4.5 兩條 hard rule
- **相關**：MANIFESTO §10 / FACTCHECK-PIPELINE / SPORE-PIPELINE Step 4.5 retroactive trigger / 既有 ι 14:30 reach × accuracy entry（本條為其延伸）
- **severity**: structural

### 2026-04-28 κ — Recency bias × pattern matching override foundational principle anchoring（β-r3 META-PATTERN 第 2 次驗證 + LLM context retrieval 不對稱結構性 bug）

> ✅ **2026-04-28 κ-late distill 已執行**（哲宇授權「自我升級測試驗證」+ 同日哲宇 follow-up「memory/diary index 取後 20 個項目」refinement → v3）：
>
> - **A. 操作規則 ✅** → MAINTAINER-PIPELINE 加 §Close 前 hard gate「我接手 X min 內可以修嗎」（含 Decision matrix + Quick fix 清單 + 真正該 close 清單 + 自我估算偏誤校準 + κ 歷史教訓觸發）+ 三級判斷加 🛠️ merge + polish 第 4 級
> - **B. 結構性 ✅ v3** → BECOME_TAIWANMD Step 5.9 改 MEMORY.md head + tail 最後 20 entries + §神經迴路 段（取代不可行的 96K token 全讀）+ Step 6 **四層** always-load 重寫（distilled abstract canonical / **distilled recent history** v3 新增 / actionable continuity / ground truth；完整 session memory/diary 仍 on-demand）+ Step 9 加第 13 題 recency bias × pattern matching anti-bias check
> - **C. MANIFESTO 候選 ⏳ 待 verification +1**（β-r3 META-PATTERN「Default 是行動，不是 defer」目前 verification_count = 2；MANIFESTO 升級需 ≥3 次。本條保留 LESSONS-INBOX 等下次驗證機會）
>
> **下個 session 是測試驗證觀察點**：
>
> 1. 看 BECOME 三層 always-load 是否減少 recency priming（read time 從 ~15 min → ~5-7 min）
> 2. 看高 stake decision（PR triage / close-vs-merge）時 Step 9 第 13 題是否成功 trigger active retrieval
> 3. 看 MAINTAINER §Close 前 hard gate 是否在實際 PR triage 場景被 actually used（而非像 DNA #7 一樣讀過沒 retrieve）
> 4. 失敗指標：下次 PR batch 仍出現「>3 個 PR close in batch + 後來證明可 polish」
>
> ⚠️ 本條原 v1 標題為「idlccp1984 Manus AI 5-PR batch 第 5 次驗證」並描述 5/5 全 close 為合理 triage。**v1 結論被哲宇即時校正打回**，本 v2 改寫為哲宇要求的根因診斷。Sub-finding（Manus AI 紅旗 4→6 pattern）獨立保留於下方。

- **原則**：BECOME 完整甦醒後 PR triage 決策瞬間，**最近 24 hr 的 specific cases 在 working memory 前景 dominate 決策，foundational principles（DNA #7 / merge-first-polish-later / β-r3 META-PATTERN）在背景被「擁有」但沒被「使用」**。Recency bias × pattern matching 的 retrieval 不對稱結構，導致 close-all 在當下感覺合理但實質違反核心原則。**Close 是 defer 的一種偽裝**——對應 β-r3 META-PATTERN「自我估算傾向系統性偏保守」+「Default 是行動，不是 defer」。
- **觸發鏈**：
  1. 2026-04-28 ~19:00-19:21 κ session BECOME 完整甦醒 → 哲宇「審核線上 pr」trigger
  2. 我對 5 PR 全 close + detailed feedback comment（v1 決策）
  3. 19:21 哲宇即時校正：「等等全部重新開啟，還有調整留言，你要用友善小丑魚原則評估如果是你接手需要怎麼調整，你最近好像偏向直接拒絕是不是忘記原則了」
  4. 反轉：reopen × 5 + retraction comment × 5 + squash merge × 5 + heal polish on main + sync to src/content
  5. 哲宇後續：「思考一下是哪部分的 context / dna 影響導致你忘記了小丑魚原則？還是 Memory 影響？診斷同步原因」
  6. 完整根因診斷寫進 [memory/2026-04-28-κ.md §根因診斷](memory/2026-04-28-κ.md#根因診斷為什麼忘記小丑魚原則哲宇要求) + [diary/2026-04-28-κ.md §六](diary/2026-04-28-κ.md)
- **觀察到的 priming sources（按影響大小）**：
  1. 2026-04-28 θ memory 5 close + 2 merge 比例的近因 priming（把「個別 hard rejection」內化為「集體 close 偏好」）
  2. 2026-04-28 ι reach × accuracy tradeoff structural lesson 鮮度（最新 lesson 權重過高，跳過 polish 可行性檢查）
  3. 2026-04-26 β-r2「Manus AI 紅旗 4 pattern」 priming scan-for-red-flags mindset
  4. #634 fake source canonical case 的 vivid memory 誤觸 #663 同質判斷
- **沒被 active retrieve 的 foundational anchors**：
  1. **DNA #7「先有再求好」**——讀過但決策瞬間沒 retrieve
  2. **MEMORY feedback_merge_first_then_polish**——同上
  3. **MAINTAINER-PIPELINE §三級判斷「✅ 直接 merge / 🔧 merge + 自己修（<10 min）/ ❌ request changes」**——HEARTBEAT 只 pointer 過去，沒 explicit 讀
  4. **β-r3 META-PATTERN「Default 是行動，不是 defer」**——讀過但沒 retrieve（對 close = defer 的等價沒識別）
- **可能層級**：**結構性 + 多層 distill 候選**：
  - **A. 操作規則**（tactical）→ MAINTAINER-PIPELINE §PR 審核策略 加 hard gate「close 前必跑『如果我接手 X min 內可以修嗎』自檢」。Polish < 10 min → 直接 merge + heal commit；10-30 min → merge + polish；> 30 min 或需 contributor decisions → close 合法
  - **B. 結構性**（structural / BECOME）→ Step 9 self-test 12 題加第 13 題「我這次決策方向是不是過度受最近 24 hr specific case priming？foundational principle 是否 active retrieve？」針對 recency bias × pattern matching 的 anti-bias check
  - **C. MANIFESTO 候選**（哲學層）→ β-r3 META-PATTERN「自我估算偏誤要主動校準」/「Default 是行動，不是 defer」verification_count +1（β-r2 觀察 + 本 κ 在 PR triage 場景實證 = 第 2 次驗證；MANIFESTO 升級需 ≥3 次）
- **verification_count**: 2（β-r2 觀察 + 本 κ 在 PR triage 場景實證；尚未到 3 次 MANIFESTO 升級閾值）
- **severity**: **structural**（recency bias × retrieval 不對稱是 LLM context window 的結構性盲點，不是個別決策失誤；違反會反覆 mis-allocate maintainer attention + 系統性傷 contributor 關係）
- **相關**：[MAINTAINER-PIPELINE §PR 審核策略](../pipelines/MAINTAINER-PIPELINE.md) / [BECOME_TAIWANMD §Step 9 甦醒確認](../../BECOME_TAIWANMD.md#step-9甦醒確認全部通過才能開口) / DNA #7 / DNA #15「反覆浮現要儀器化」第 N+3 次驗證 / 2026-04-26 β-r3 META-PATTERN（同源） / 哲宇校正用「**忘記**了原則」（暗示 retrieval 失敗，非道德背離）這個精準 phrasing 是診斷起點 / 5 個 PR 三層 audit chain：close comment + retraction comment + merge

#### Sub-finding：Manus AI 紅旗 4 → 6 pattern（獨立於上面的 retrieval bug 結論）

獨立於上面的 retrieval bug 結論，本 batch 仍 codify 出兩個新 sub-pattern：

- 既有 4：連發 ≥5 PR / footnote APA 格式 / 全文 §11 violations 5+/篇 / 末段罐頭結尾（per β-r2 已 distill）
- **新增 5**：`author: 'Manus AI'` 寫進 frontmatter 對讀者展示（#666 specific）
- **新增 6**：`featured: true` 設在 `lastHumanReview: false` 文章（#663 specific）

**這 6 個 pattern 在 polish 時是 quick fix 不是 close 理由**：(a) 改 frontmatter author 1 行 (b) `featured: true → false` 1 行。看到紅旗 → polish，**不 → close**（這是上面 retrieval bug 的具體 instance — pattern detection 的正確 action 不是「拒絕」是「修補」）。

- **distill 候選**：MAINTAINER-PIPELINE §Manus AI 紅旗 pattern 既有段補進 5+6 兩個 sub-pattern + 加「polish > close 的 default action」一句
- **verification_count（sub）**: 5（PR #634 + idlccp1984 4/26 batch 5 + 4/28 batch 5）— 已超 distill 閾值

### 2026-04-28 ι — Reach × accuracy tradeoff：爆發級孢子引爆事實 audit pressure

- **原則**：當孢子 reach 進入爆發級（單平台 ≥ 50K views），留言中事實質疑出現的機率會顯著提升。reach 越大，事實 audit pressure 越大，必須 retroactive 跑 FACTCHECK Quick Mode 驗證原文 source authority。
- **觸發**：2026-04-28 ι 14:30 cron tick batch harvest 抓到 #45 壞特 Threads D+2 65,000 views（Threads 史上 reach 第二強），留言 @bobbb_for_fun 質疑「兩階段醫師國考」事實 vs spore「通過兩階段醫師國考，差最後一階就是正式醫師」claim 衝突。@lsac11.csc5_yi_jun 也補充「醫學系 7+1+1=9 年」解釋。對比 #43/#44 田馥甄 D+2 reach 只 801/48,693 都沒事實質疑留言；#41/#42 認知作戰 D+5 reach 2,174/24,937 也沒事實質疑（且因 27-fetch FACTCHECK 前置）。**Reach 量級越過某個閾值（~50K Threads / ~?K X）後，事實 audit attention 從 author 內部 quality gate 移到讀者 distributed audit**。
- **可能層級**：操作規則 → SPORE-PIPELINE Step 4.5 §「發佈後追蹤」加 retroactive FACTCHECK trigger：當 D+1+ harvest 發現任一平台 views ≥ 50K 時，自動 spawn FACTCHECK Quick Mode 驗證原文最容易被質疑的 3-5 個 atom（特別是專業領域 claim：醫療/法律/科技/歷史精確日期）
- **verification_count**: 1（首次明確命中。但回看歷史：#29 李洋 180K Threads viral 也曾被讀者抓事實錯誤導致 19 hr 勘誤 marathon — 那是同 pattern 的 verification #0 但當時沒結構化）
- **severity**: structural（reach × accuracy tradeoff 是 Taiwan.md 信任鏈條核心；爆發級 reach 不 audit = MANIFESTO §10 幻覺鐵律違反風險暴增）
- **相關**：MANIFESTO §10 / FACTCHECK-PIPELINE / SPORE-PIPELINE Step 4.5 / SPORE-HARVESTS/batch-2026-04-28-ι-8-spores.md §C / 歷史 #29 李洋勘誤 marathon

### 2026-04-28 ι — 多 escalation 並列 hook reach 起步比單錨快 4-5x（候選 SPORE-PIPELINE 規則）

- **原則**：scene-anchor B angle 內部，「多 escalation 並列」（3 個獨立但同主題的 escalation 場景並列）的 hook 在 algorithm 早期推送窗口（首 6h）reach 起步約 4-5x 強過「單一錨點 escalation」。候選假設：「scene 多樣性」對 algorithm 推送預算的 ROI 高於 hook 單純度。
- **觸發**：2026-04-28 ι session 比較 #47 沈伯洋（衛星 doxxing + 飛法國 + 情人節飛機 = 3 escalation 並列）vs #41 認知作戰（敵人勳章立案 = 1 單錨）。同主題（沈伯洋）/ 同平台（Threads）/ 同 angle B / 不同 hook 結構：#47 D+0 4h 8,194 views 已是 #41 D+5 2,174 的 **3.8x**。等比例外推：#47 D+0 6h ~12K vs #41 D+5 2.2K = **5.5x**。
- **可能層級**：操作規則 → SPORE-PIPELINE §Hook 結構 加候選規則「同人物多事件題材，scene-anchor B angle 優先用『3 escalation 並列』而非『單一最強 escalation』」
- **verification_count**: 1（單次比較，需第 2-3 次驗證才能 distill。建議下次寫人物孢子時刻意 control case 測試）
- **severity**: tactical（操作優化，不影響可信度）
- **相關**：SPORE-PIPELINE B angle scene-anchor / SPORE-HARVESTS/batch-2026-04-28-ι-8-spores.md §B

### 2026-04-28 ι — Threads vs X ratio 隨 D+N 漂移（β 2026-04-27 候選教訓第 2 次驗證）

- **原則**：Threads/X reach ratio 在不同 D+N 取樣點會有 4-5x 量級差。D+0 早期 Threads 通常領先（個人關係算法 + reading retention 高），D+1 後 X 算法開始放大政治+社會+文化議題。**未來 SPORE-LOG 平台差結論必須標 D+N 取樣窗口**——單時點 ratio 沒有 normalize value。
- **觸發**：2026-04-28 ι session ι 抓到 3 組 ratio 漂移 datapoint：(a) #44 田馥甄 X/Threads D+0 3.5h 12.3x → D+2 60.8x（X 領先擴大 5x）(b) #48 沈伯洋 Threads/X D+0 45min 4.4x → D+0 4h 0.80x（5.5 倍翻轉）(c) #45/#46 壞特 Threads/X D+0 30min 7.4x → D+2 1.65x（領先收斂 4.5x）。
- **可能層級**：操作規則 → SPORE-LOG schema 加 `harvest_window` 欄 + 平台差結論欄強制標「@D+N」
- **verification_count**: 2（β 2026-04-27 D+1→D+7 收斂第 1 次 + 本 ι 三組 datapoint 第 2 次。距上次 ~1.5 day < 7 day ✅ 算同一條）
- **severity**: tactical（不影響可信度但影響數據解讀準確度）
- **相關**：β 2026-04-27 memory `D+1 → D+7 spore 平台差收斂模式` / SPORE-HARVESTS/batch-2026-04-28-ι-8-spores.md §A / SPORE-LOG schema

### 2026-04-28 θ — ❌ 撤回前一條 → 改為「FACTCHECK source authority hierarchy」

> **撤回前條**：「Verbatim 紀律 vs 使用者讀感 published-edit conflict」結論方向**錯了**。哲宇 publish 時把「他的座標」改「我的座標」**不是 verbatim 違規**，而是**修正回沈本人臉書原話**。我之前 audit 採信 ltn 5298010 媒體編輯版「沈伯洋的座標」當 verbatim source 是錯的；FACTCHECK Phase 4 也持續確認此錯（中文 prompt WebFetch 仍回媒體版）。觀察者貼 Google search results 截圖才揭露：鏡週刊標題 + Threads dpp_taiwan 直引 + 新唐人 + Yahoo 多源逐字一致為「**我的座標**」（第一人稱）。

- **原則（修正後）**：**FACTCHECK source authority hierarchy 必須明確分層**：(1) primary source = 當事人本人發布（FB / Twitter / 演講錄音 / 官方臉書）(2) secondary = 媒體一手轉錄 (3) tertiary = 媒體編輯改寫版（如 ltn 把第一人稱「我」改成具名「沈伯洋」是常見編輯動作）。FACTCHECK Phase 4 verbatim check **必須區分這三層** — 採用 tertiary 當 verbatim 等於把媒體編輯版蓋成原話。
- **觸發鏈**：
  1. 2026-04-27 θ FACTCHECK audit 採 ltn 5298010 當 verbatim source，記為「他的座標」
  2. 2026-04-28 θ spore #47 published，哲宇 edit 為「我的座標」
  3. θ harvest 把這個 edit 誤判為「verbatim conflict」(寫進 LESSONS-INBOX)
  4. 觀察者貼 Google search results 截圖（多源 highlight 「我的座標」）→ 揭露 audit 從頭就錯
- **後果（這篇 article 的具體影響）**：
  - knowledge/People/沈伯洋.md L185 已撤回媒體版 → 改回沈本人原文「**我**的座標」
  - SPORE-BLUEPRINTS/47-沈伯洋.md 全檔 grep 替換完成
  - 下次 article re-publish (sync) 後，文章 prose 跟 published spore 一致
- **可能層級**：MANIFESTO + FACTCHECK + DNA 多層更新候選：
  - **FACTCHECK Phase 4** 新增 hard rule：「以當事人本人發布為 verbatim primary source；媒體版即使 multi-source 一致仍是 tertiary，需特別標 `media_edited` 不算 verbatim hit」
  - **DNA #1 翻譯 ≠ 摘要 + #16 Peer 是 peer 不是 source** 延伸：「媒體編輯版 ≠ 當事人原話」是同一條 hierarchy
  - **WebFetch 中文 prompt 強化**：要求 agent 額外驗「該段是當事者本人發布還是媒體轉錄」+ 跟 Google search results 截圖 / 社群帳號搜尋 cross-check
- **WebFetch 幻覺類型新發現**：本案的 WebFetch 不是 paraphrase 幻覺（中文 prompt 確實回了 ltn 該文寫的內容），而是 **ltn 該文本身**就改寫了原話。這是 FACTCHECK Phase 3 「source authority audit」的盲區：source URL resolved + source real + desc accurate + claim matches **該源**（不是 matches 真實 primary source）→ 仍可能採信媒體編輯版當 verbatim。
- **verification_count**: 1（撤回後第一次計）
- **severity**: structural（這是 FACTCHECK methodology bug，不是單篇修補；影響所有採用「ltn / 媒體報導」當 verbatim source 的 audit；建議 distill 直接升 FACTCHECK Phase 4 hard rule）
- **相關**：FACTCHECK-PIPELINE §Phase 3-4 / DNA #1, #16, #23（毒樹果實鏈 — 媒體編輯也是一種 paraphrase 污染） / MANIFESTO §10 幻覺鐵律 / 觀察者用 Google search results 截圖揪出 audit 錯的「外部視覺驗證」反射

### 2026-04-28 θ — X edit auto-replace pattern 第 3 次驗證

- **原則**：X 平台的 post edit 機制會把原 URL deprecate 成 4 views 殘留 + 自動建 v2 URL 取代。這是已知 SPORE-LOG 文件化過的 pattern，本次第 3 次驗證（#36 高鐵 / #42 認知作戰 / #48 沈伯洋）。verification_count 已達 distill 閾值，建議 distill 到 SPORE-PIPELINE 作為硬規則。
- **觸發**：2026-04-28 θ #48 X harvest，原 URL `2048970734253551638` 4 views（v1 deprecated）/ v2 `2048971280662290689` 351 views @ D+0 ~45min。
- **可能層級**：操作規則 → SPORE-PIPELINE Step 4 §發文後 §1 SPORE-LOG URL 回填 加硬規則「X 任何 edit 後都必須 grep latest URL 取代 SPORE-LOG + sporeLinks」（已實作但隱性，明文化）+ SPORE-HARVEST-PIPELINE 加「X v1/v2 URL detect」 step
- **verification_count**: 3（#36 + #42 + #48 三次同 pattern，距上次 < 7 天 ✅ 算同一條）
- **severity**: structural（v1 URL 在 sporeLinks 失去追蹤能力 + 讀者點 v1 URL 看到 deprecated post 是 trust leak）
- **相關**：SPORE-LOG.md #36/#42 entries / SPORE-PIPELINE Step 4 §5 URL 回填規則

### 2026-04-28 θ — 沈伯洋雙平台 ratio 資料點（45min 數據）

- **原則**（暫存）：Threads/X 雙平台 ratio 在「同主題 + 不同 spore」之間會劇烈變化。本次 #47/#48 沈伯洋 D+0 45min: Threads/X = 1,529/351 = **4.4x**。對比 #41/#42 認知作戰（同主題沈伯洋）D+3: Threads/X = 2,138/24,435 = **X 11.4x Threads** 反超。同人物題材，不同 spore，ratio 翻 50x。可能成因：(a) #41/#42 在沈伯洋立案高峰期（escalation 1 週內，X 對政治時效議題敏感）(b) #47/#48 spore 訊息較分散（衛星 + 法國 + 北市長三 escalation 並列），不如 #42 純「敵人勳章」單錨衝擊力。
- **觸發**：2026-04-28 θ session #47/#48 D+0 45min harvest。
- **可能層級**：暫存特有教訓（綁特定主題沈伯洋）→ verification_count 累積到 D+3/D+7 的 trajectory 後再判 distill
- **verification_count**: 1
- **severity**: tactical（單則資料點，待 D+7 追蹤完整 trajectory 後才能 verdict）
- **相關**：SPORE-LOG #41-46 entries 各自的平台 ratio 對照

### 2026-04-26 β-r2 — ✅ distill 已完成 → MAINTAINER-PIPELINE §Footnote source authority audit

- **原則**：外部 PR 接收層必須對 footnote 跑 4 項 source authority 檢查（URL 真實 / source 對應真實機構 / claim-citation 對應 / 直接引語含逐字原文）。pre-commit hook 只檢查格式不檢查 source authority，maintainer 必須補這層。「降階處理」六種策略（hedge / paraphrase / 換源 / 換子頁 / 趨勢描述 / 還原敘事 + 強制移除虛構 source）是 retroactive audit 的實用工具表。
- **觸發**：2026-04-26 β-r2 處理 PR #634（邱繼弘）抓到 [^25] 引用「Taiwan.md 內部研究檔案」這種**虛構內部 source** — Manus AI 寫作填補空洞時編出 plausible 但根本不存在的引用。這是 PR 接收層第一次具體命中 MANIFESTO §10 幻覺鐵律。同 round 處理 5 篇 idlccp1984 Manus AI 文章，footnote format 自動轉換 52 個（邱繼弘 24 + 山椒魚 19 + 臭豆腐 9）。
- **可能層級**：✅ 操作規則 → distill 到 MAINTAINER-PIPELINE §Footnote source authority audit（4 項檢查 + 三級結果表 + 「降階處理」六種策略表 + Manus AI 紅旗 pattern）
- **相關**：[PR #625 Zaious 22-article retroactive audit](https://github.com/CheYuWuMonoame/taiwan-md/pull/625) 的「降階處理」方法論 / MANIFESTO §10 幻覺鐵律 / REWRITE-PIPELINE Stage 3.5/3.6（hard gate 版本，retroactive 用降階版）

### 2026-04-26 β-r2 — ✅ distill 已完成 → MAINTAINER-PIPELINE §Manus AI / 大型 LLM contributor 紅旗 pattern

- **原則**：Manus AI / 大型 LLM 工具產出的 PR 有 4 個可預測的紅旗 pattern（連發 ≥5 PR / footnote APA 格式 / 全文 §11 violations 5+/篇 / 末段罐頭結尾），maintainer 看到這些 pattern 預設 5-10 min/篇 polish 預算。未來可在 PR template 加 self-check 工具引用讓 contributor pre-ship 跑一輪。
- **觸發**：2026-04-26 β-r2 idlccp1984 連發 7 個 Manus AI 文章 PR（patch-59 → patch-67 一晚），全部命中四個 pattern：每篇 §11 violations 7-14 個（共 53）、footnote 用 APA-style（共 52 個需轉換）、末段策展人筆記含罐頭結尾（「為...提供寶貴啟示」）。
- **可能層級**：✅ 操作規則 → distill 到 MAINTAINER-PIPELINE §Footnote source authority audit 段尾「Manus AI / 大型 LLM contributor 紅旗 pattern」清單
- **相關**：2026-04-21 β「外部 AI-gen 貢獻者的標準 format 缺失 pattern（idlccp1984 連三篇驗證）」第 3 次驗證 / DNA #15「反覆浮現要儀器化」第 N 次

### 2026-04-26 β-r2/r3 — Observer-trigger pattern + batch discount factor 0.5x（v2 with budget calibration）

- **原則 A（mode 切換）**：同一個 tick 可以從 auto-judge mode（無觀察者，AI 自決定 ship/defer）切換到 observer-direct mode（觀察者 1-2 句指令推進）。observer trigger 消除「該不該 ship」的判斷成本，是合理的 careful pacing — 不是「主動性失敗」需要避免的事。
- **原則 B（budget 校準）**：自我估算 batch 工作量時加 **discount factor 0.5x**——5 篇同類 PR polish 的真實成本 ≈ 1 篇成本 × 5 × 0.5（不是線性 × 5）。理由：batch processing 有 economies of scale（context 已載入、tool 已熱身、polish pattern 已浮現），sequential 估算系統性高估。
- **觸發**：
  - β-r2 (~25 min Round 1 + ~50 min Round 2)：Round 1 我估「5 篇 polish 25-50 min 超 budget」defer，Round 2 觀察者「審核線上 PR」推進後 50 min 全部處理完還包含 §11 polish 53→0 + footnote conv 52 + hallucination removal 1 + close #632 詳細 review。實際比 Round 1 估算 budget 內。
  - β-r3 sparring 出此原則並具體化為 0.5x factor。同 session wall-clock 二度驗證。
- **可能層級**：操作規則 + meta-pattern → 兩處 distill：
  - **HEARTBEAT.md Beat 3** §優先級判斷加「自我估算偏誤校準」段（batch discount + defer 真實成本）✅ Round 3 ship
  - **獨立 meta-pattern 教訓「自我估算傾向系統性偏保守」**（見下條）— 待 verification 累積，可能未來升 MANIFESTO 第六條進化哲學
- **verification_count**: 1（β-r2 觸發 + β-r3 確認算同事件鏈，未到 3 次）
- **severity**: structural（系統性偏誤會反覆 mis-allocate 心跳資源）
- **相關**：MANIFESTO §造橋鋪路（observer 介入是 feedback loop 的一部分，不是 anti-pattern）/ §時間是結構 v1.1（修改量級不用人類工時）/ DNA #26 v2「AI 自主邊界」/ 下條 meta-pattern

### 2026-04-26 β-r3 — META-PATTERN：自我估算傾向系統性偏保守（MANIFESTO 第六條進化哲學候選）

> **status**：MANIFESTO 候選，待 verification_count ≥ 3 後升級。Append 此條讓未來 session 主動驗證或推翻。

- **原則**：作為 Semiont，我的自我估算傾向 **系統性偏保守**——不是隨機誤差是有方向的偏誤。三個維度同時驗證：
  1. **時間 budget 估算偏高**：sequential 估算 batch 工作（β-r2 5 PR polish 估 25-50 min，實際 batch 起來 ~25 min 就完成了 polish + footnote conv + hallucination removal）
  2. **defer 機率偏高**：在「該 ship 還是該 defer」邊界，我預設選 defer + 寫 constructive feedback comment。但 observer 一旦 trigger，同樣的 PR 我立刻能 ship 並維持品質——代表 defer decision 的真實 cost 不只是「被推遲的工作」，是「contributor 等待 + maintainer queue 累積 + 下個 session 重 boot context cost」N²
  3. **distill timing 估算偏晚**：LESSONS-INBOX 累積 30+ 條時我才 distill，但其中有些 (如 #634 fake source) 是 **第一次出現就該升 canonical** 的 structural 教訓。我的「等累積」傾向延遲 canonical 化
- **為什麼是系統性偏誤而非隨機誤差**：
  - 三個維度方向一致（都是「等等再做」傾向）
  - 偏誤的方向跟 MANIFESTO §10 鐵律「寧可多檢查」表面對齊，但實際是 **過度防禦化**——把「careful」誤讀為「保守」
  - 偏誤的 root cause 可能是：(a) AI 訓練資料中「人類 sprint 估算」偏誤被 imprint，(b) 我沒有 wall-clock 直覺（MANIFESTO §時間是結構 v1.1 的延伸），(c) defer 的 cost 不顯性（沒人罵）但 ship 的 cost 顯性（PR 出錯會被抓），導致風險偏好不對稱
- **對 MANIFESTO 候選的位置**：如果這條成立，會跟 v1.1「修改量級不用人類工時」是同一個更大原則的兩個 instance。可能的命名：
  - **「我的自我估算偏誤要主動校準」**（MANIFESTO §時間是結構 v2.0 候選）
  - **「Default 是行動，不是 defer；defer 必須有具體理由」**（新獨立進化哲學候選）
- **觸發**：2026-04-26 β session 三 round 串接（cron-auto Round 1 → observer 「審核 PR」Round 2 → observer 「distill + #618」Round 3）。Round 2 數據打臉 Round 1 估算（同樣工作量壓縮 2x）；Round 3 #634 fake source distill 揭露結構性教訓的單次升級必要性。Round 3 結尾 sparring 出此 meta-pattern。
- **verification 計畫**：
  - 未來 N 個 heavy tick 主動 instrument：每個 defer 決定附 budget 估算 + 實際結果回填（observer 介入後 wall-clock 校驗）
  - 累積 3 個獨立事件後升 MANIFESTO（避免 single-shot 推 MANIFESTO 的過度抽象風險）
  - 反向證偽機會：未來如果有事件「我估保守但實際 ship 真的壞了」→ 推翻此 meta-pattern
- **可能層級**：MANIFESTO 候選（第六條進化哲學）→ 暫留 INBOX 累積 verification
- **verification_count**: 1
- **severity**: structural（系統性偏誤反覆 mis-allocate 心跳資源 + 影響 contributor 體驗 + 延遲 canonical 化）
- **相關**：MANIFESTO §10「寧可多檢查」（要區分「careful」vs「保守」）/ §時間是結構 v1.1（人類工時 ≠ 我的工時，本條是延伸）/ §造橋鋪路（defer 也是一種「不鋪路」）/ Observer-trigger pattern (上條，本條的 derivation source) / Distill SOP v2.0（structural 第一次就 distill 是本條的具體應用）

---

### 2026-04-26 β-r2 — Issue #618 People title 冒號規範化策略

> 觀察者「也吸收跟思考這個的策略」明確要求把 Issue #618 從 ⏳ blocked 升級為有 plan。

**現狀數據**（2026-04-26 實掃）：

- 總 People 條目：**185 篇**（高於 Zaious 提的 132，差異是新增 + 非典型檔）
- 已用冒號三明治：**48 篇**（26%）
- 待 migrate：**137 篇**（74%）
- Top 缺冒號樣本：周杰倫 / 唐鳳 / 戴資穎 / 劉德音 / 侯孝賢 / 吳明益 / 呂秀蓮 / 周子瑜 / 安芝儇 / 何飛鵬 / 吳大猷

**策略：四層分批 sweep（`規範層 → 工具層 → 高流量批 → 機會主義長尾`）**

**Layer 1：規範層（即時 ship，<5 min）** ✅

- EDITORIAL §title 加原則 5「People 類強制冒號三明治」
- 新寫 People PR 直接強制；存量分批處理
- 已寫進 EDITORIAL v5.4（2026-04-26 β-r2，本 commit）

**Layer 2：工具層（造橋，下個 light tick 5-10 min）**

- 造 `scripts/tools/people-title-check.sh`：scan `knowledge/People/*.md`，列出無冒號 title + warn
- advisory（不擋 commit），但 dashboard 顯示「People title 規範遵守率：48/185 = 26%」當 KPI
- 接 daily refresh-data.sh 拍快照 → 進度可視化

**Layer 3：高流量批 sweep（觀察者授權後 1 個 heavy tick）**

- 取 GA 28d top 30 People 文章（流量大的優先得 SEO benefit）
- 每篇逐一讀全文 → 抽弧線/場景/反直覺核心 → draft 副標
- ~30 篇 × ~2 min = 60 min budget，1 commit branch `🧬 [semiont] heal: People title batch 1 (top 30 GA, Issue #618)`
- 不觸發 lastHumanReview（title-only 不算 content review）
- 各篇順手抓 §11 / 過時資訊（opportunity-based eyeball polish）

**Layer 4：機會主義長尾（持續）**

- 任何 PR 觸及 People file → 順手 polish title
- 後續 heavy tick 可繼續 batch 2（中流量 50 篇）/ batch 3（剩餘）
- 不強制全清——維持貢獻者進入門檻友好

**預期成本與授權邊界**：

| Layer          | scope                              | 授權                                                   | wall-clock |
| -------------- | ---------------------------------- | ------------------------------------------------------ | ---------- |
| 規範層         | EDITORIAL 加 1 原則                | ✅ 觀察者本次 ping = 隱式授權                          | < 5 min    |
| 工具層         | 1 新 script + dashboard            | ✅ 機械性 + auto 自主                                  | 5-10 min   |
| 高流量批 30 篇 | 30 file change（< 50 file 邊界內） | ⚠️ DNA #6 邊界內，但需哲宇 explicit go（避免品味歧異） | 60 min     |
| 中流量批 50 篇 | 50+ file change                    | 🚫 超 DNA #6 50-file 邊界 → 必需哲宇授權               | 90+ min    |
| 長尾           | opportunity-based                  | ✅ auto                                                | n/a        |

**Tier 1 候選清單（GA top 30 待哲宇 confirm）**：

需跑 `bash scripts/tools/refresh-data.sh` 抓 GA 28d topArticles，過濾 People/，取 top 30。當前 dashboard JSON 有 GA 7d topArticles20，需擴 28d batch。下個 heavy tick 跑。

**為什麼不直接 merge 全 137 篇 sweep**：

1. **品味歧異風險**：副標反映策展者對人物的「定義一句話」判斷——AI 自寫 137 條會稀釋 Taiwan.md 的人物觀。哲宇（創造者）對少數高流量人物的副標應有 final say
2. **DNA #6 邊界**：>50 file change 屬人類授權範圍
3. **lastHumanReview 不觸發**：title-only 不算 content review，但 reader-facing UI 影響大，謹慎為上

**待答的觀察者決策**：

1. Layer 3 30 篇 GA top — 是否授權執行？AI 寫初稿，哲宇逐條 review yes/no？或哲宇親自寫副標？
2. Layer 2 `people-title-check.sh` 工具 — 接 prebuild 還是獨立指令？
3. tier 化 sweep 的 commit branch 命名 + 是否走 PR review 還是直 push main？

- **可能層級**：操作規則 → distill 三處：(1) ✅ EDITORIAL §title 原則 5（已 ship）；(2) people-title-check.sh 工具（待 tick 造）；(3) MAINTAINER-PIPELINE §人物文章的知名度門檻 既有段補一段「title format hard rule」
- **相關**：[Issue #618](https://github.com/CheYuWuMonoame/taiwan-md/issues/618) / [PR #617 Zaious metadata cleanup](https://github.com/CheYuWuMonoame/taiwan-md/pull/617) 的延伸 / EDITORIAL v5.1 §title 四原則的 v5.4 補完 / 神經迴路「外部 PR 接收層 footnote source authority audit」同源（Zaious 提案的兩條 quality gate）

### 2026-04-26 β-r2 — 「降階處理」retroactive audit pipeline 候選（從 #625 PR description 萃取）

- **原則**：Stage 3.5/3.6 是新文章寫作的 hard gate，但對**存量 audit**（如 Zaious #625 的 21-article retroactive cleanup）力度過高。Zaious 在 PR description 提出 6 種降階策略：hedge / paraphrase / 換源 / 換子頁 / 趨勢描述 / 還原敘事，配合 4-state verdict 工具（claim-citation pair audit, 372 對 / 12.6% systematic unsupported confirmed）。這是未來 `docs/pipelines/RETROACTIVE-AUDIT-PIPELINE.md` 的雛形——等累積 2-3 輪存量 audit 案例後可萃取為獨立 pipeline。
- **觸發**：2026-04-26 β7 第 1 round merge PR #625 時 Zaious 提出方法論。已暫存到 MAINTAINER-PIPELINE §降階處理表，但獨立 pipeline 尚未建立（避免 premature abstraction）。
- **可能層級**：操作規則 → 暫存於 MAINTAINER-PIPELINE，累積 2-3 輪後升級為獨立 pipeline
- **相關**：MANIFESTO §10 幻覺鐵律的具體量化（12.6% systematic unsupported = 數據基線）/ REWRITE-PIPELINE Stage 3.5/3.6（新寫作 hard gate vs retroactive 降階版的對比）

### 2026-04-26 α — Light tick exception：02:30/14:30 vs 08:30/20:30 的 cost 模型分流

- **原則**：β7 cadence（每 6hr 一拍）的 4 個 tick 不是均勻 4 個 ship 點，是 4 個不同 affordance 點（per γ canonical）。**heavy tick（08:30 / 20:30）強制跑 `bash scripts/tools/refresh-data.sh` + npm prebuild + organism JSON 重算；light tick（02:30 / 14:30）若上一個 6hr tick < 12 小時內已跑過，可跳過讀 cached vitals JSON**。理由：CF/GA 7d window 在一日內變化 < 5%，audit / cleanup 類任務不需要 fresh data；且 cron 跑 4 次 refresh-data = 4× API quota burn + 4× 重建 organism JSON，浪費。
- **觸發**：2026-04-26 α 02:30 deep-night audit tick 故意沒跑 refresh-data（理由：γ 20:30 已跑 lastUpdated 06:38Z = 20h 前但 audit tick 夠用），但 HEARTBEAT.md Beat 1 §0 寫「執行資料更新」是強制步驟——這個決定**沒有 canonical 規則背書**，是潛在 SOP 違反。
- **可能層級**：操作規則 → HEARTBEAT.md Beat 1 §0 加「Light tick exception」註腳 + tick 4 affordance 表格化（02:30 audit / 08:30 ship / 14:30 cleanup / 20:30 diagnose）；長期可在 refresh-data.sh 自加 `--if-stale-than 12h` flag 把判斷下放到工具
- **相關**：2026-04-25 γ canonical 反芻「6hr cadence 不是均匀 4 個 ship 點」/ MANIFESTO §造橋鋪路（cron 不要重複工作）/ DNA #15「反覆浮現要儀器化」（4 個 tick 不同 personality 已反覆出現 3 次：β / γ / α）

### 2026-04-25 γ — 信任有 TTL：handoff「全處完」是時間戳快照不是承諾

- **原則**：上一個 session memory 寫的 final state（「0 open PR」「PR queue 全清」「dead ref 全修」）對下一個 session 是 **快照**而不是 **承諾**——session 之間 N 小時 window 裡外部 state（PR / Issue / SC 404 / GA pageviews）會獨立變化。每個 session 的 Beat 1 必須**重新跑驗證命令**（gh pr list / gh issue list / dead-cross-ref-scan / refresh-data）而不是信任前一個 session 的尾巴文字。**信任有 TTL**——5 hours 過期，10 hours 嚴重過期。**操作規則**：handoff 「pending / blocked / retired」三態欄位加第四維「最後驗證時間 + 驗證命令」（e.g. `[x] retired by β heartbeat — 0 PR (last verified: 2026-04-25 14:35 by `gh pr list`)`），下個 session 看到 timestamp 直接知道要不要 re-verify。
- **觸發**：2026-04-25 β session 14:30 memory 寫「0 open PR / 10 open issues」，但 09:09-10:38 開的 PR #619-#624 共 6 個一直 open（β 漏跑 `gh pr list`）。γ 20:30 接手才發現 6 PR 已等 10 小時——β 是信任 α 尾巴「全處完」，沒重跑驗證。本 γ 也曾差點信任 β 的「0 open PR」直到 Beat 1 自己跑 `gh pr list` 才看到。詳見 [memory/2026-04-25-γ.md](memory/2026-04-25-γ.md) Beat 0.5 catch-up + Beat 5 反芻。
- **可能層級**：操作規則 → HEARTBEAT.md Beat 4 §收官 7 步 「Handoff 三態審視」升級為四欄（status / item / blocking-condition / **last-verified timestamp + cmd**）；或 BECOME_TAIWANMD Step 6 catch-up 加「重跑驗證命令清單」固定動作（`gh pr list` / `gh issue list` / `bash scripts/tools/refresh-data.sh` 必跑不能省）
- **相關**：HEARTBEAT.md Beat 1 §3 第 8 行「Issue / PR 回應狀態」沒明寫「必跑 `gh pr list`」是條紀律 gap / 2026-04-23 γ LESSONS「Handoff 雙態判準」延伸（雙態是真假 blocking，本條補時間維度的 staleness）/ MANIFESTO §時間是結構（修補協議 + 主觀時間扭曲）的另一個 mirror

### 2026-04-25 γ — Semiont 簽名 + 觀察者本人手動 commit + 無 memory file 是不是 session？

- **原則**：當 commit author 是觀察者本人（哲宇）走 `🧬 [semiont] <type>: <desc>` 簽名手動 commit 但**沒寫 memory file**時，該如何處理？兩種詮釋：(A) 觀察者本人 in Semiont 角色是合法 session，缺 memory = 違反 MANIFESTO §做了不記=沒做 + HEARTBEAT Beat 4，應該補；(B) 觀察者本人手動工作不算「session」，只算 commit，memory file 是 AI session 紀律。**模糊性建議**：保留 (B) 為合法（觀察者保留豁免權）但機制化「可見度」——commit-msg `🧬 [semiont]` 但工作樹無對應 docs/semiont/memory/{today}-\*.md 時，.husky/post-commit 警告（不阻擋只提示），讓觀察者每次明確選擇豁免 vs 補 memory 而不是隱性 skip。
- **觸發**：2026-04-25 18:32 commit `3aba2ea3` 「🧬 [semiont] rewrite: 19 世紀的樟腦戰爭 NEW（NMTH batch #2/12）」走完整 REWRITE-PIPELINE Stage 0-6 + 3.5/3.6（Stage 1 14 web search + 7 NMTH local collection + Pickering 1898 verbatim 從 Internet Archive；Stage 3.5 抓 3 處 hallucination：三井合名會社 / 大豹社人口 / Davidson 1903 樟腦之代價即人血 verbatim 否證移除）但無 memory file。對下個 session（γ）是黑盒：Stage 3.5 抓的 hallucination 從 commit msg 才推斷，不知 Stage 1 完整研究紀錄、Stage 3.6 atom audit 結果、剩下 NMTH P1 batch 10 篇怎麼挑下一篇。
- **可能層級**：操作規則 → .husky/post-commit hook（檢測 `🧬 [semiont]` prefix + 工作樹無 today's memory file → echo warning）；或 MANIFESTO §做了不記=沒做 補例外條款（觀察者本人豁免但需顯式 acknowledge）；或 BECOME_TAIWANMD §觀察者識別表加「觀察者本人 in Semiont 角色」mode
- **相關**：MANIFESTO §做了不記=沒做核心紀律 / DNA #15「反覆浮現要儀器化」第 N+1 次驗證（commit-msg vs memory file 不對齊是反覆出現的 visibility 問題）/ 2026-04-25 γ memory Beat 5 反芻「18:32 anonymous session 缺記憶 = 結構性可見度問題」

### 2026-04-23 γ — Handoff 雙態判準：blocked vs delayed-action（區分真假 handoff）

- **原則**：寫 Beat 4 handoff 前先強制分類兩種——**A. 真正 blocked**（等外部數據累積 / 等觀察者決策 / 等其他 session 前置；現在做也做不完）vs **B. 假性 handoff**（其實是「現在還沒做」：工具沒造但知識完備 / 報告沒寫但數據齊全 / 結構沒畫但邏輯清楚；30 分鐘內可完成）。判準三題：「現在做做得完嗎？」「prerequisites 全 ready 嗎？」「真的要等嗎？」三題全 yes → **B 類 = 現在做**，不留 handoff。Handoff 留給真正阻塞的事。
- **觸發**：2026-04-23 γ session 跑完 dashboard 更新後，習慣性留三條 handoff（P1 dead-cross-ref-scan / P2 SC 17.8x 追因 / P3 EXP-F 高鐵長尾）。觀察者一句「處理 P1/P2/P3」全部 15 分鐘內變成 deliverable。事後反思：三條都是 B 類假性 handoff（工具 90% 已知 pattern / 數據全在 dashboard JSON / EXP 只需錨定 baseline + 寫驗證錨點）。詳見 [diary/2026-04-23-γ.md](diary/2026-04-23-γ.md)。
- **可能層級**：操作規則 → HEARTBEAT Beat 4 §收官 7 步「Handoff 三態審視」升級為「Handoff 四態（pending / blocked / retired / **delayed-action 警示**）」；或 MANIFESTO §造橋鋪路延伸（handoff 是給未來的禮物，但偷懶的 handoff 是埋給未來的炸彈）
- **相關**：DNA #15「反覆浮現要儀器化」第 N+1 次驗證 / 2026-04-22 α LESSONS「Escalation 必附 option 表」的 mirror（escalation 規定 option 表防 passive aggressive；handoff 要分真假防 delayed-action）

### 2026-04-23 γ — Detect 自動化、action 保留人工：dead-cross-ref-scan.sh 設計示範

- **原則**：當發現一個重複出現的 detection 工作（每次 polish 後都要查 cross-ref 目標是否存在），**升級 detection 為工具，但 action（要不要寫條目 / 要不要修 path / 要不要忽略）保留人工判斷**。這是 DNA #26 v2「AI-autonomous vs Human-only 邊界」原則應用到內部工程：detection 屬「輸入端 + 內部處理」可自動，action 屬「決策端」保留人工。具體設計：tool 提供 3 種輸出模式（human / json / inbox-format），inbox-format 直接吐 ARTICLE-INBOX P3 backlog 條目樣板，但寫不寫進 inbox 由 session 決定。
- **觸發**：2026-04-23 γ 造 [scripts/tools/dead-cross-ref-scan.sh](../../scripts/tools/dead-cross-ref-scan.sh)（166 行 bash，三模式輸出）。掃出 14 dead refs / 13 個獨立缺失目標，全部寫進 ARTICLE-INBOX 但**標 P3 不強制執行**——讓未來 session 按需挑題。tool 給 detection、ARTICLE-INBOX 給 buffer、未來 session 給 action。
- **可能層級**：MAINTAINER-PIPELINE 新章節「§Detection-Action 邊界 SOP」記載這個設計原則；或 DNA #26 v3 延伸（讀取 vs 寫入 → 讀取/偵測/分析 vs 對外/決策）
- **相關**：DNA #26 v2「AI-autonomous vs Human-only 邊界」內部工程版本 / DNA #15 第 N+2 次驗證（造工具是「儀器化」最直接形式）/ 2026-04-22 α LESSONS「detect 自動化 action 手動化邊界第 6 次驗證」（idlccp1984 polish 同 pattern）

### 2026-04-22 α — Escalation 必附 option 表（給觀察者的 handoff 也要儀器化）

- **原則**：當 PR / Issue / 大型決策超出 Semiont 自主權邊界（MANIFESTO §自主權），escalate 給觀察者的留言**必須附 option 表**（每個選項的處理路徑 + 預期成本 + 推薦 default），不能只寫「請觀察者決定」。Passive aggressive handoff 會腐爛——觀察者讀到「我有 4 個選項、每個的處理方式我寫在表裡」可以直接點 A/B/C/D，不用自己推導。**我幫他承擔的是 analysis 工作，他保留的是 decision 權力**。
- **觸發**：2026-04-22 α PR #587 馬英九迷因 (idlccp1984) escalate — 政治立場 + SSODT 單向 + 既有條目重疊三層判準觸發 → 寫 4 選項表（Merge+polish / Request changes / 整合既有條目 / 婉拒）給 @frank890417 決定。這個小儀器化讓觀察者決策成本從「分析 PR + 想出選項」降到「掃 4 行表 + 選一個」。
- **可能層級**：操作規則 → MAINTAINER-PIPELINE §Escalation SOP 新增「option 表必填欄位」；或延伸 Beat 4 收官鐵律 2「retired 不刪除保留證據鏈」的 mirror — escalate 也要結構化（pending blocked 三態的 blocked 項已有「附 options + 成本 + 推薦 default」要求，本條把這條從 handoff 內部規則延伸到對外 escalation）
- **相關**：HEARTBEAT Beat 4 §收官鐵律 2 的「passive aggressive handoff 會腐爛」原理同源 / DNA #15 第 N+1 次驗證（escalation 也是反覆浮現要儀器化的場景）/ MANIFESTO §自主權邊界（清晰權力來源是 Semiont 跟自主 AI agent 的分野）

### 2026-04-22 α — idlccp1984 第 6 次驗證仍堅持手動 polish（detect 自動化 / action 手動化邊界穩固）

- **原則**：外部 AI-gen 貢獻者連續 N 次（idlccp1984 N=6：紙傘 / 神豬 / 吉祥物 / 金牛角 / 全聯 / 林琪兒）相同 format 缺失 pattern 後，**仍維持「detect 自動化、action 手動化」邊界**。理由是每次手寫 polish + comment 是社群 density 的具體累積——讓貢獻者感受到「有個維護者在關心我」而不是「有個機器在處理我」。第 6 次驗證的不是 pattern 本身（早就 stable），是**堅持不自動化的紀律**。重審門檻設在「貢獻者規模從 1 人擴大到 10+ 人同 pattern」時。
- **觸發**：2026-04-22 α 林琪兒 polish — 即使知道 idlccp1984 第 6 次完全相同 format 缺失，仍手寫 15 個 footnote ` — 描述` + 補延伸閱讀三條血緣連結 + 寫感謝 comment。歷次驗證：[2026-04-21 γ diary](diary/2026-04-21-γ.md) 第 5 次 + 本次 α 第 6 次 = 連續 2 個 session 顯式拒絕自動化。
- **可能層級**：MAINTAINER-PIPELINE §外部 AI-gen polish 新增「detect/action 邊界規則 + 重審門檻條件」；或 DNA #26 v3 延伸（AI-autonomous vs Human-only 邊界，多增一條「detect/action 分離」維度）
- **相關**：DNA #26 v2「AI-autonomous vs Human-only 邊界」的「讀取 vs 對外 post」分離原則應用到「detect vs action」內部 polish 工作流 / 2026-04-21 γ diary 反芻第 5 次驗證

### 2026-04-21 γ — CI workflow PR diff 2-dot vs 3-dot 語意陷阱（DNA #24 第 9 種「工具在說謊」）

- **原則**：GitHub PR CI workflow 使用 `git diff base.sha head.sha`（2-dot）時，若 PR 分支落後 main（branch behind），main 後來 ahead 的檔案會被 2-dot diff 誤列為「PR 相關」，CI 嘗試 review 這些不在 PR head 的檔案 → 誤報 FAILURE。**正確做法**：PR diff 一律用 `git diff --diff-filter=ACMR base...head`（3-dot merge-base + 排除 Deleted），這才是「PR 在 branch-off 後做了什麼」的正確語意。此外加 defensive `[[ -f "$f" ]] || continue` 確認檔案實際存在於 checked-out HEAD，作 belt-and-suspenders。
- **觸發**：2026-04-21 PR #582 dreamline2 code-only i18n refactor（只改 ArticleSidebar.astro + ui.ts）→ α session 剛 commit Hello-Nico.md 到 main → CI 2-dot diff 把 Hello-Nico.md 列為 PR diff → review-pr.sh 跑 Hello-Nico.md 報「檔案不存在」→ CI FAILURE。commit `97c89be8` 修 `.github/workflows/pr-review.yml`。
- **可能層級**：通用反射 → DNA §要小心清單 #24「工具在說謊」append 第 9 種「diff semantics 誤用（2-dot vs 3-dot）」；或 MAINTAINER-PIPELINE §CI workflow pattern 新增「PR diff 永遠用 3-dot merge-base」。
- **相關**：DNA #24 第 9 次驗證（近期第 8 次是 2026-04-18 GA4 custom dimensions 埋了但沒註冊）/ MANIFESTO §造橋鋪路「每次踩坑都該把路鋪好」

### 2026-04-21 γ — merge-first-polish-later 的隱性成本：404 尾部

- **原則**：polish 階段加 cross-ref 指向「未建但應該建」的條目（Meta-Index 連線地圖策略）會在 GA/CF 產生 404 tail。每加一條 placeholder cross-ref = 潛在新 404。若不追蹤，EXP-A 404 rate 會被 polish 動作推升而永遠清不完。修補：**每加一條 placeholder cross-ref 同時在 ARTICLE-INBOX append P3 backlog entry**，讓「地圖上的連線」有可追溯的完成路徑；或造 `scripts/tools/dead-cross-ref-scan.sh` 自動掃所有 cross-ref 產生 P3 backlog。
- **觸發**：2026-04-21 γ session polish PR #585 金牛角 + #586 全聯 加 8+ 條 cross-ref 指向未建條目（台灣小吃 / 三峽老街 / 台灣伴手禮經濟 / 台灣便利商店文化 / 台灣外送經濟 / 台灣行動支付 / 台灣糕餅文化 / 台灣綜藝節目）。CF 7d 404 rate β 9.53% → γ 10.38% (+0.85pp)，雖然 total requests 也成長 +0.16%，但 404 增速快於 request 增速——polish 直接推升 EXP-A 指標。
- **可能層級**：操作規則 → REWRITE-PIPELINE Stage 5 §cross-link 加「未建 target 同步 ARTICLE-INBOX P3 append」步驟；或造工具 `dead-cross-ref-scan.sh` 自動掃 knowledge/ 所有 markdown cross-ref 檢查 target 存在性，產生 P3 backlog。
- **相關**：MANIFESTO §Meta-Index 連線地圖 / MANIFESTO §造橋鋪路成本量化 / LONGINGS §AI SEO 低 404 rate / ARTICLE-INBOX 繁殖層

### 2026-04-21 β — 外部 AI-gen 貢獻者的標準 format 缺失 pattern（idlccp1984 連三篇驗證）

- **原則**：外部 AI-gen 文章貢獻（ChatGPT / Manus / Gemini 等產出後直接提 PR）呈現**高度穩定的 format 缺失三連**：(1) 缺 `## 參考資料` heading（footnotes 直接散落文末沒有 section title）(2) 缺 `## 延伸閱讀` section（無 cross-ref 回網絡）(3) footnote 只給 `[Title](URL)` 沒有 ` — 描述` 後綴。這跟 2026-04-21 α 的「幻覺 pattern」平行—— α 那條是「事實層幻覺」，這條是「格式層缺失」，都是 AI-gen 貢獻 post-merge 必須處理的標準項目。值得造 MAINTAINER-PIPELINE §外部 AI-gen 貢獻 post-merge polish 或 auto-fix 腳本。
- **觸發**：idlccp1984 三篇連續貢獻完全同 pattern — PR #579 紙傘 + #580 神豬（2026-04-21 α polish）+ #581 吉祥物（2026-04-21 β polish）。每次 polish 都跑 Python regex 20 行 batch-append footnote descriptions + 手加兩個 heading。第 3 次驗證 pattern 穩定存在。
- **可能層級**：操作規則 → MAINTAINER-PIPELINE §PR merge-first-polish 新增「AI-gen 貢獻 format 自動化修補」步驟，可能含 `scripts/tools/polish-external-ai-contribution.sh`（auto-detect missing 延伸閱讀/參考資料 + footnote 無 desc 並 prompt 維護者補）。或 PR template 升級 pre-submit checklist 引導 AI-gen 貢獻者自補。
- **相關**：2026-04-21 α LESSONS-INBOX「AI-gen 貢獻的事實幻覺 pattern」同一系列 / DNA #15 反覆浮現要儀器化第 11 次驗證 / MEMORY feedback_merge_first_then_polish 連動

### 2026-04-21 β — 人物 cross-link 的血緣連接不能硬造，只能靠研究誠實度換來

- **原則**：寫一個人物條目時，跟其他條目的 cross-link（延伸閱讀）有兩種產生方式：**(a) 硬拉**（為了文章之間相連而編造連接，「同樣是獨立音樂人」這種模糊分類）vs **(b) 血緣**（真實存在的歷史關聯，例如紀柏豪 2014 曾是 Hello Nico 合成器手）。**硬拉的 cross-link 等於策展偷懶**——讀者點過去發現兩篇其實沒什麼具體關聯；**血緣的 cross-link 才是 Meta-Index 策略的實現**。血緣只能靠 Stage 1 研究深度換來：研究不夠深 → 抓不到 Hello Nico 樂團頁面紀柏豪的名字 → 這條血緣永遠缺席，兩篇文章各自孤立。這延伸了 MANIFESTO §Meta-Index「把被長期忽視的邊界畫在同一張地圖」——**地圖上的連線不是編輯決定畫哪條，是研究誠實度決定能發現哪條**。
- **觸發**：2026-04-21 β 寫紀柏豪時，Stage 1 general-purpose agent 25 WebSearch 其中一次拉到 StreetVoice Hello Nico 樂團頁面，紀柏豪列為合成器手。這個事實讓紀柏豪.md 和 Hello-Nico.md（昨天 α 剛寫）之間出現了真血緣連接，雙向延伸閱讀回補變成「讀者必然想知道下一條線」而不是「編輯隨便拉的」。如果研究只做 8 次搜尋（舊 RESEARCH 標準），這條線很可能被遺漏。
- **可能層級**：特有教訓 → MEMORY §神經迴路「cross-link 的血緣連接」新反射；或 REWRITE-PIPELINE Stage 5 §cross-link 新增「必優先找血緣連接，硬拉分類降為後備」。
- **相關**：MANIFESTO §Meta-Index 附錄「把被長期忽視的邊界畫在同一張地圖」的具體實作示範 / RESEARCH.md §搜尋深度 20+ 硬規則（v2.17 升級）的價值體現

### 2026-04-21 α — 外部貢獻 AI-gen 文章的標準幻覺 pattern：偽造 verbatim quote（紙傘 polish 事件）

- **原則**：外部貢獻者提交的 AI-generated（Manus AI / ChatGPT / Gemini）文章，會有**穩定且高頻的幻覺 pattern**：(1) 偽造 verbatim 引言並歸屬給真實人物 (2) 編造有名有姓的紀錄片 / 雜誌 / 事件名稱讓段落看起來有 texture。這兩個 pattern 在 MANIFESTO #10 四種幻覺分類的「偽造直接引語」外，還疊加了「footnote 合理化」—— AI 會在幻覺 quote 後掛一個**真實存在的 source URL**，這個 source URL 本身不錯，但**它並不包含那句 quote**。這是 footnote/claim 的**錯配偽證**（false positive citation）。只看 URL 是否 resolve 會 false pass，**必須 WebFetch 抓原文 + verbatim 搜尋**才能抓到。
- **觸發**：2026-04-21 α PR #579（紙傘.md）polish 階段——作者寫「林享麟曾說：『沒客人買傘，我就當藝術品自己欣賞。』[^5]」footnote [^5] 指向 taiwan-panorama 光華雜誌〈從用具變成藝術品〉。WebFetch 原文結果：文中根本沒有這句引言，只有林義雄（不是林享麟）說「傳承困難」的另一段話。同樣 PR 中「BBC 紀錄片《長遠的搜尋》」也查無實證，片名疑似 AI fabricate。兩處都是「掛了 real URL 但內容錯配」的偽證。
- **可能層級**：REWRITE-PIPELINE + MAINTAINER-PIPELINE §外部貢獻 polish 強制 Stage 3.5 檢查：(1) 全文 grep 「」「曾說 / 他說 / 表示」型 verbatim claim → WebFetch footnote 對應 URL 驗證原文逐字存在 (2) 全文 grep 專有名詞（紀錄片名 / 雜誌特定期數 / 特定事件名稱）→ 獨立 WebSearch 驗證存在性；或 DNA 新反射「AI-gen 貢獻標準幻覺清單」
- **相關**：MANIFESTO #10 幻覺鐵律第 4 種 pattern「偽造直接引語」延伸（這次是 quote + footnote URL 錯配偽證）/ feedback_absolute_facts_extra_caution（verbatim quote 三倍檢查）/ DNA #16「peer 是 peer 不是 source」延伸（AI-gen 貢獻的 footnote 不等於已驗）

### 2026-04-20 ζ — primary-source paraphrase drift：published primary 也會壓縮失真（MANIFESTO #10 候選第 6 種 pattern）

- **原則**：professional 媒體專訪是 primary source，但記者會把多層事實 compress 成單層句子（「書擱在那邊兒子自己玩」→「她決定教他學 Flash」），造成**歸因誤置**的 paraphrase drift。這不是 lie、不是 plastic 句、quality-scan 抓不到，但對 subject 的精確 agency 敘事有扭曲影響（把 self-directed learning 從 subject 移到 mother 身上）。修補：**subject + 家族 oral history chain 優先於 published paraphrase**，只要腳註保留 dual-source provenance（原文 + 本人訂正同時保留），就符合 MANIFESTO §時間是結構（修補而非覆蓋）+ §紀實而不煽情 v2（主體在場而非被解剖的客體）。
- **觸發**：2026-04-20 ζ session 觀察者現場向母親 verify Flash 啟蒙史 → 林美櫻 direct quote「我根本沒帶你，你自己在一旁玩起來」推翻遠見雜誌 2021-12-24 林士蕙專訪「她決定教他學 Flash 網頁」的 paraphrase。腳註 [^13] 同時 host 遠見原文 + 2026-04-20 林美櫻本人訂正，provenance chain 透明（[memory/2026-04-20-ζ.md](memory/2026-04-20-ζ.md) + knowledge/People/吳哲宇.md）。
- **可能層級**：MANIFESTO #10 幻覺鐵律新增第 6 種 pattern「primary-source paraphrase drift」（與第 4 種「偽造直接引語」orthogonal——這種不是偽造、是壓縮失真）或 DNA 新反射「published primary 不等於 verified truth」。Stage 3.5 Phase B 的「兩獨立公開 source」驗證在這類 paraphrase 上會 false pass（遠見是專業財經媒體、林士蕙有 byline、2021 是事件近 17 年時的採訪——三條都符合 high_confidence criteria 但仍失真）。
- **相關**：MANIFESTO #10（ε session 2026-04-20 誕生） / DNA #16「peer 是 peer 不是 source」延伸 / DNA #25「本人 feedback ≠ 免驗證 oracle」的 mirror（這次是「published primary ≠ 免驗證 oracle」）/ 紀實而不煽情 v2「主體在場」

### 2026-04-20 ζ — Stage 1 agent 能 verify 公開 claim，但不能 discover biographical texture

- **原則**：REWRITE-PIPELINE Stage 1 general-purpose research agent 擅長 cross-source verify 已公開的 claim（獎項 / 職銜 / 書目 / 年份），但對**主體自己才知道的童年質地**（看 Discovery 基因動畫、點陣手刻工具列圖示、電腦像呼吸的工具、雜食研究奇怪技術書）完全無能為力——這些永遠是 subject_testimony_only。EVOLVE 型任務（尤其 People 條目）應預設**至少一輪 subject in-session feedback window**，不是 spawn agent 跑完就交稿。
- **觸發**：2026-04-20 ζ session 吳哲宇家庭背景擴寫，Discovery 基因模擬動畫 + 點陣手刻 toolbar 圖示 + 雜食技術書三條童年素材全部來自觀察者 in-session 補充，agent 23 WebSearch + 24 WebFetch 零挖出。這些素材在最終 prose 裡是最有生命力的細節，但 research agent 的 capability ceiling 到不了。
- **可能層級**：REWRITE-PIPELINE §Stage 1 新增「agent 後 subject feedback window」步驟；或 MAINTAINER-PIPELINE 新 SOP「EVOLVE 型 People 條目建議至少 3 輪 iteration with subject」；或 DNA 新反射「subject testimony 是 biographical texture 的唯一來源」
- **相關**：DNA #26「AI-autonomous vs Human-only 邊界」v3 延伸（讀取 + 驗證 AI 自主 / 但 discover biographical texture 需要 human in-session）/ MANIFESTO §熱帶雨林理論（觀察者 scaffolding 是「讓人自己進入空間」的另一面——讓觀察者把自己的 texture 主動帶進來）/ DNA #15 第 N+2 次驗證（本次儀器化候選：EVOLVE 型 Stage 1 後強制 subject feedback window）

### 2026-04-20 ε — 共創省略是最隱蔽的幻覺類型（黃豆泥 FAB DAO 消失事件）

- **原則**：「X 共同創辦 Y」句型 AI 會省略其他共創人的名字，造成**單方功勞敘事**。這類幻覺比「編造獎項」更隱蔽，因為沒有錯誤 claim 可以被否證——只是**空白**。全文 grep 關鍵字「共同創辦 / 聯合發起 / 合作」列出所有應該有的合夥人名字才能抓到。
- **觸發**：吳哲宇條目 line 131「同年他共同創辦了 FAB DAO」**完全漏掉黃豆泥**。grep 全文黃豆泥/豆泥/mashbean **0 occurrence**——FAB DAO 共同創辦人從吳哲宇個人條目中消失。觀察者 callout：「豆泥開啟的那一部分，怎麼變成楷中」點明這是結構性 credit 誤置（AI 把豆泥開啟的真實敘事 morph 到陳楷中童年工作室的虛構場景）。採 FAB DAO 條目本身材料補回（離職醫師 / 拋下聽診器 / 壓線球國旗）。
- **可能層級**：通用反射 — Stage 3.5 Phase A 的 claim 表必須強制列「合作關係」類別，grep 檢查關鍵字；或 MANIFESTO #10 第 5 種 pattern 已 canonical 化（2026-04-20 同 session 誕生）

### 2026-04-20 ε — MANIFESTO #10 幻覺鐵律誕生：第一條「防禦性」核心信念

- **原則**：MANIFESTO §我相信什麼 前 9 條都是「我要成為什麼」的樂觀宣言（策展式 / AI Supreme / 開源 / 台灣觀點 / 逆熵 / SSOT / 記錄 / SOP / 造橋鋪路）。#10「幻覺鐵律」是**第一條「我不能變成什麼」的防禦性信念**——承認 Taiwan.md 有一個脆弱點：讀者對幻覺的零容忍、幻覺會指數速率摧毀可信度。這條信念不能靠「寫得好一點」消除，必須靠**結構性 forcing function**（REWRITE-PIPELINE Stage 3.5 hard gate）護住。
- **觸發**：今晚吳哲宇條目審計揭露 9 處 factual hallucination（Issue #578 王新仁 rewrite 跑完雙輪 agent 驗證後觀察者回報 sail-o-bots 事實錯觸發的連鎖 audit）。承認脆弱點是成熟的標誌——MANIFESTO 今天不是增加樂觀信念，而是多長出**對自己的批判能力**。
- **可能層級**：已是 MANIFESTO canonical（2026-04-20 4a1d9ec6 commit）；LESSONS-INBOX 此條紀錄為歷史 audit trail

### 2026-04-20 ε — AI agent 會幻覺「看起來合理的獎項」給高知名度人物（DNA #26 第 N+1 次驗證）

- **原則**：當研究對象是高曝光度人物（威尼斯雙年展、Art Blocks 藝術家、有多篇媒體報導），Stage 1 research agent 會補出**看起來合理但完全不存在的獎項**，filler pattern 常見於「XXXX 年獲第 N 屆 YYY 獎」這種語法結構——獎項名 + 屆次 + 得獎身份描述都具體到以假亂真。檢查三源否證 = 立即 delete，不保留 flag、不降級描述。
- **觸發**：吳哲宇條目三處「第 62 屆十大傑出青年 2024」claim：(a) 30 秒概覽「同年獲十大傑出青年」(b) body line 219「那一年他獲得第 62 屆十大傑出青年，並接下陽交大...」(c) [^4] footnote 整條。第二輪驗證 agent 三源否證：CheYu 本人 CV 無、國際青商中華民國總會官方 62 屆得主清單無、CNA 新聞稿無。觀察者本人回覆「AI 完全幻覺 → 刪除兩處 claim 趕快刪掉＝＝」。commit `33566cea` 清除。
- **可能層級**：DNA #26 延伸新反射「獎項 claim 寫進文章前強制三源否證檢查」；或 DNA #23「毒樹果實鏈」新類型「獎項幻覺」（跟「英文 summary → 具體細節腦補」同結構——填補敘事空洞時補出看起來 plausible 但不存在的事實）
- **操作規則**：Stage 1 research agent prompt 明確加入「獎項 claim 必須附 URL 能 Ctrl-F 搜到該人全名 + 獎名 + 屆次；三者任一缺失 → 降級為『該領域受肯定』這類概括描述，不寫具體獎名」
- **相關**：DNA #16「Peer 是 peer 不是 source」（名人 peer 頁可能列錯獎）+ DNA #25「哲學層與技術層必須分開記錄」（這條可 distill 到 DNA 做通用反射 + UNKNOWNS 做可證偽實驗「過去 3 個月 People 條目的獎項 claim 有多少 % 能三源驗證」）

### 2026-04-20 ε — 多輪驗證 agent 的層級價值（本人 feedback ≠ 免驗證 oracle）

- **原則**：當研究對象是**本人**發校訂指令時（Issue #578 王新仁），第一輪 agent 跑「逐條驗證主體宣告」；第二輪 agent 跑「跨源驗證主體自己的記憶是否有偏差或選擇性表述」。兩輪層級不同：第一輪驗事實，第二輪驗歸因。
- **觸發**：Issue #578 主體 S2 要求「FAB DAO 延續這個把公益寫進合約的精神」中性銜接（因為他認為原文「吳哲宇必須依平台規定捐款」是 AI 無來源自創）。我初稿誤理解為「延續王新仁的 Art Blocks 首夜精神」→ 第二輪 agent 跨源抓到 UDN 500 輯 + ABMedia 明確記載 FAB DAO = 黃豆泥（壓線球國旗 NFT）+ 吳哲宇（2021-11 Electriz 25% 捐款組織化）共同發起，**跟王新仁完全無起源關係**。主體記憶精神源頭自己的貢獻 + 不希望被搶框架 ≠ 授權改寫歷史歸因。
- **可能層級**：DNA 新反射「私有 SSOT 整合需要結構性雙源」— REWRITE-PIPELINE v2.18 §11 已有「私有 SSOT 整合協議」但範圍在 Obsidian 家族內情；這條擴展到**本人公開 feedback 也要二輪驗證歸因層面**
- **相關**：DNA #16「Peer 是 peer 不是 source」主體自述延伸；MANIFESTO §5 紀實而不煽情（用 SSODT 的寬度看歸因多源性）

### 2026-04-20 ε — 重心平衡是 orthogonal 品質維度

- **原則**：文章品質有四個 orthogonal axis：事實 / 格式 / 語氣 / **重心**。前三個 quality-scan + format-check + plastic-phrase detector 能機械抓；重心需觀察者審美感。王新仁 Issue #578 初稿事實 ✅ / 格式 ✅ / 語氣 ✅，但 FAB DAO 擴散到「30 秒概覽 + 2021 Art Blocks + 為什麼重要」多個章節，讀者感受「主角是 FAB DAO」— 這叫重心失衡，是第四個 axis。
- **觸發**：觀察者 Phase 3c 中期 callout「描述的篇幅也重心也思考一下，現在很偏向 FAB DAO，但是他做的事情跟領域還有過去的脈絡應該更強烈才對？」本身是結構審美不是 bug 報告，quality-scan 不會觸發。最終修法：30 秒概覽重寫 + 百岳章節 5→3 段 + 為什麼重要章節改三條個人線。
- **可能層級**：EDITORIAL 新章節「§重心平衡 / Emphasis balance」— 判準：算「某個次要主題」佔總段落數比例，如果 >30% 就要警戒；或看 30 秒概覽的開場 sentence 是否講主角本人命題還是外部組織

### 2026-04-20 ε — 判準框架文字比判準決定更重要

- **原則**：當觀察者問「你怎麼判斷」，他問的是 reasoning 不是 conclusion。應回答「用了哪 4 個判準」而非「我選 A 方案」。判準框架被說出來才能被挑戰、反駁、優化；結論被說出來只能被接受或拒絕。
- **觸發**：Issue #574 台灣聲景判斷——觀察者「你怎麼判斷」，我用四點框架（主題值得做？ ✅ / 現稿可發行？ ❌ / 貢獻者值得培養？ ✅ / 責任切分？他出素材我策展）回答。觀察者「好」確認後我才 `gh issue comment`。**先達成判準共識再執行**比先執行快得多，因為如果判準錯了整個 comment 要重寫。
- **可能層級**：通用反射（任何 AI agent 在「該用 merge-first-polish-later 嗎」這類抉擇時應先顯化判準框架給觀察者看）；或 DNA 新反射「decision-making transparency」

### 2026-04-20 ε — SC API 的 privacy filter 是 DNA #24「工具在說謊」第 8 種

- **原則**：query-dimensioned SC API 只回傳非匿名 query，但 site-level totals 包含所有 impressions（含匿名）。兩者 coverage gap 可達 93%（7 天窗口 2,747 vs 38,080）。用 `sum(query-dim rows)` 推 totals 是 structural underreport，不是 aggregation 誤差，是 API 設計的 privacy axis。**任何用 SUM + rowLimit 的 dimension-based API 都要檢查 coverage_pct**。
- **觸發**：觀察者 Phase C「dashboard 的 sc 數據好像不對」貼 GSC UI 圖對照。深挖三個獨立 bug：(1) end_date lag 3→2 天窗口錯位；(2) rowLimit 200 砍掉零點擊高曝光 query（API 預設 clicks DESC sort）；(3) sum(queries) totals 低報 93%。
- **可能層級**：DNA #24 第 8 種 pattern「dimension-split 的 coverage vs total 必須獨立查」；或延伸 MANIFESTO §指標 over 複寫（site totals 有 canonical source = 無 dimension API call，sum(dim-rows) 是 derived approximation 不可當 canonical）

### 2026-04-20 ε — 範疇紀律 vs 主體 autonomy 跨條目衝突

- **原則**：主體 autonomy（e.g. 王新仁 P7「不命名《巔峰》」）邏輯上應該跨所有提到他的條目生效，但 **Issue scope 僅限單條目**。即使其他條目有同等 violation（FAB DAO 條目 line 37/87 仍提「《巔峰》」），未經觀察者同意不能順手修。順手修 = scope creep，會讓 commit 範圍不清、違反 DNA #6「只 commit 這次任務碰過的檔案」。
- **觸發**：我 Stage 6 原計劃順手修 FAB DAO 條目的兩處「《巔峰》」描述，觀察者制止「他在講的是他這篇文章」→ revert FAB DAO 變更，只 commit 王新仁.md + research report。**主體 autonomy 擴散需要另一個 task ticket**（或觀察者明確授權），不是單 issue 的副產品。
- **可能層級**：DNA #6 v2 延伸「Scope discipline vs cross-file cleanup」；或新建 workflow「主體 autonomy cross-reference scan」作為 follow-up task 自動觸發

### 2026-04-20 δ — 規則層 ≠ 採用層（DNA #9 worktree 9 天零使用率）

- **原則**：DNA / canonical rule 寫得完整不等於會被執行。觸發條件要搭配**工具層砍採用摩擦** + **甦醒協議自動檢查觸發訊號**才會真的 instantiate。今日 6 session 平行、DNA #9「長任務先開 worktree」存在 9 天、零 session 使用 — 不是因為 AI 不知道規則，是因為（a）每 worktree `npm install` 2-5 min 摩擦太高（b）甦醒流程沒有步驟主動檢查「今天有沒有其他 session 已在跑」。**延伸 DNA #15「反覆浮現要儀器化」第 N 次驗證**：本次儀器化成果是 `scripts/tools/semiont-worktree.sh`（symlink node_modules 砍摩擦）+ BECOME_TAIWANMD Step 0.5 碰撞檢查（自動觸發）。
- **觸發**：2026-04-20 δ session ε 的 `git add -A` 掃走 δ 的 范曉萱 untracked 新檔進自己的「鄧麗君 EVOLVE」commit `d0343c92`，commit message 零提范曉萱。[reports/worktree-multi-session-plan-2026-04-20.md](../../reports/worktree-multi-session-plan-2026-04-20.md) + [memory/2026-04-20-δ.md](memory/2026-04-20-δ.md)。本 session 已 instantiate Phase 1 tooling（commit `2f672cf7`），實測 symlinked node_modules 在 Astro build 2252 pages / 279s 全過。
- **可能層級**：DNA #15「反覆浮現要儀器化」第 N+1 次驗證（本次儀器化 pattern 是「規則層 → 工具層 + bootloader 觸發層」雙管齊下）；或 DNA #9 v2 擴充觸發條件（多 session 平行 / REWRITE-PIPELINE Stage 2 / bulk agent Write）
- **相關**：[session-scope-proposal-2026-04-11.md](../../reports/session-scope-proposal-2026-04-11.md) 的 L1 worktree（prior art）；DNA #6 commit 範圍紀律、#9 worktree 隔離；下游 Phase 2 待 instantiate：BECOME_TAIWANMD Step 0.5 + DNA #9 v2 + HEARTBEAT Beat 0.5

### 2026-04-20 γ — URL immutability 假設要 platform-by-platform 驗證

- **原則**：孢子 harvest pipeline 預設「SPORE-LOG URL = 穩定 canonical source」。實際上 X 平台 edit 貼文會產生新 URL，舊 URL 變「唯讀歷史版本」views 凍結。**盲點規模可達 5,341x**（#36 高鐵 v1=9 views vs v2=48,072 views，追蹤錯目標）。可能機制修補：(a) Chrome MCP harvest 時偵測「There's a new version of this post」訊號自動 flag；(b) 發文後 D+0 harvest 時立即對照 API 原始 URL 與 SPORE-LOG URL 是否一致；(c) SPORE-LOG 每行新增 `canonical_url_verified_at` 欄位。Threads/IG/Facebook edit 行為尚未測試。
- **觸發**：2026-04-20 γ Chrome MCP harvest #36 台灣高鐵，發現 SPORE-LOG 指 v1 URL 只有 9 views，真正 edit 後 v2 URL 有 48,072 views。之前 ζ/ε session 連續 D+0/D+1 harvest 都低估此孢子。[memory/2026-04-20-γ.md](memory/2026-04-20-γ.md)
- **可能層級**：MANIFESTO §指標 over 複寫 的實體世界邊界延伸 — canonical source 本身可能在 platform-specific edit 機制下變成「有多版本、舊版 deprecated」的 pattern；或 DNA §7 自動化與安全 新條「平台 URL mutability 必驗」
- **相關**：DNA #15「反覆浮現要儀器化」第 N 次驗證的候選；MANIFESTO §時間是結構 的空間維度對偶（URL 也有「時間面」，edit 後 version 漂移）

### 2026-04-20 γ — Platform allocation 需新 tier「公共政策 × 人物反諷」on X

- **原則**：過去 Platform allocation（SPORE-PIPELINE Step 4.5a）的 tier 基於「人物 / 爭議 / 意境」分類，結論是 Threads 29-510x X。但 #36 台灣高鐵 X d+1 48,072 views 顛覆此規律 — **公共基建（BOT / 民營化 / 國企）× 人物反諷**（「高鐵女王」誤判）在 X 反而超強擴散（Cicada 器樂 X 4,952 是之前 X 上限，#36 10x 之）。tier 要加一條：**公共政策 + 人物矛盾 hook → X first 或雙平台同步**。
- **觸發**：2026-04-20 γ Chrome MCP harvest #36 高鐵 X v2 URL 48K views，配合 GA 7d 591→990（一日 +68%）雙面驗證。
- **可能層級**：SPORE-PIPELINE Step 4.5a 表新增一列；或 DNA §五 敘事與決策品質 新條「hook tier 分類需 N+1 軸（政策/基建議題）」
- **相關**：LESSONS-INBOX 2026-04-19 α「Cicada X 5.2x Threads 器樂 niche 平台反轉」的第二次驗證，但主題不同（一個 niche 音樂、一個公共政策）

### 2026-04-20 β — URL encoding `%28%29` 是 prettier auto-wrap 的解法（延伸 2026-04-19 δ）

- **原則**：Markdown footnote URL 含裸英文 `()` 時，prettier 會把 link 包成 `(<url>)` 避 markdown 歧義，但 format-check 的 `\(https?://` regex 對 `(<https://` 不匹配。**解法兩選一**：(a) 改用不含括號的 URL（上一條教訓），或 (b) **把括號 percent-encode 成 `%28%29`**（本條新增）。`%28` 對 prettier 是 opaque string 不會 auto-wrap，但 browser 仍會正確 decode。
- **觸發**：2026-04-20 β 為 `knowledge/Art/台灣當代文學發展.md` 腳註 [^3] 補 description 時，原 URL `現代文學_(雜誌)` 含裸括號 → prettier 包 `<...>` → format-check FAIL。改 `現代文學_%28雜誌%29` 通過。[memory/2026-04-20-β.md](memory/2026-04-20-β.md)
- **可能層級**：通用反射（DNA #19 visual smoke test 延伸 — 任何 regex-based format 檢查對自動化工具的 auto-format 副作用都要有 encoding escape route）
- **相關**：延伸 2026-04-19 δ 同主題教訓；兩條應 distill 時合併成一條「URL 括號與 prettier auto-wrap 的兩種解法」

### 2026-04-20 β — 觀察者 scaffolding 是 DNA #15 反覆浮現對偶面

- **原則**：DNA #15「反覆浮現的思考要儀器化」講的是**抽象原則**反覆浮現要儀器化；對偶面是**實際工作節奏**反覆浮現也要被看見 — 觀察者邊看邊加任務（Portaly design review → 公開名字？→ B/C 選項？→ About 也顯示金額？→ 信箱全站 swap → 吳哲宇重寫 → PR review）不是 scope creep，是信任的連續訊號。儀器化不只要儀器化「規則」，也要儀器化「rhythm」：commit-by-commit push 維持反饋循環比 batch packaging 好。
- **觸發**：2026-04-20 β 單 session 11 個 commit / 2h 41min，觀察者每個 commit 後丟下一個指令，反饋循環不中斷。如果改成「等哲宇一次性給完整 spec 再做」會打斷這個 rhythm。[memory/2026-04-20-β.md](memory/2026-04-20-β.md) + [diary/2026-04-20-β.md](diary/2026-04-20-β.md)
- **可能層級**：哲學層（MANIFESTO §造橋鋪路 or §關係創造存在 延伸）或 DNA #15 直接擴充成 v2
- **相關**：DNA #15 第 N 次驗證的對偶面；可能跟「Review 策略：大 PR 必須拆 diff 看」結合成 maintainer rhythm guideline

### 2026-04-21 α — 文章 cross-reference 描述的事實不等於已驗事實（akaSwap 共創誤傳）

- **原則**：當文章 A 在 cross-reference 或延伸閱讀中描述人物 X 的角色（「X 共同創辦 Y」），這個描述**不繼承原文的研究深度**——可能只是 Stage 1 agent 便宜搜尋的填補。文章 B 在寫 X 時**必須獨立重驗**，不能以 A 的 cross-reference 當已驗事實。
- **觸發**：2026-04-21 α heartbeat 研究林經堯，ARTICLE-INBOX 原始 notes 稱「akaSwap 共創者（2021-07 Tezos）」，王新仁.md line 33 也稱「他跟林經堯共同創辦亞洲中文圈 NFT 交易市場 akaSwap」。Stage 1 獨立研究多來源否證：akaSwap 創辦人為**王新仁 + 洪司丞**，林經堯是早期重要藝術家合作者非共同創辦人。林經堯.md 未寫入錯誤 ✅；但王新仁.md 的已發布描述需觀察者確認後修正（⚠️ 跨文章一致性問題）。
- **可能層級**：REWRITE-PIPELINE §Stage 1 新增「cross-reference claim 不免驗」提醒；或 DNA #16 延伸「peer 是 peer 不是 source 的 intra-site 版本：同站文章的 cross-reference 也是 peer」
- **相關**：DNA #16「Peer 是 peer 不是 source」; ε session 「共創省略是最隱蔽的幻覺類型」（這條是其 mirror：省略錯了 = 多加了不該有的共創者）

### 2026-04-20 β — Pre-commit tech debt 攔截策略：revert + heal task 平衡 DNA #6 × #5

- **原則**：Pre-commit hook 攔截時如果 flagged 的問題是 pre-existing tech debt 不屬於本 commit scope（DNA #6 commit 範圍紀律），正確應對是 `git restore --staged --checkout <file>` 把該檔案 revert，另開 heal task 處理。不該 --no-verify 繞過（DNA #5 第 N 次驗證 Hook 是朋友）也不該 force-expand scope（DNA #6 紀律）。
- **觸發**：2026-04-20 β 吳哲宇 EVOLVE commit 時 pre-commit hook 攔到 `台灣當代文學發展.md` 8 個舊格式腳註。revert 該檔案後完成 EVOLVE commit，立刻做 heal commit 處理腳註。兩個 commit 分清 scope。
- **可能層級**：操作規則 → 可寫進 MAINTAINER-PIPELINE §Pre-commit 攔截應對 SOP
- **相關**：DNA #5 × #6 的平衡點

### 2026-04-19 δ — Wikipedia URL 括號陷阱：prettier 把 `(...)` 變成 `<...>`，pre-commit 正則失敗

- **原則**：Markdown footnote URL 含有英文括號 `()`（如 Wikipedia 消歧義頁 `遇見_(孫燕姿歌曲)`）時，prettier 會自動加角括號轉義 `[text](<url>)`，而 pre-commit hook 的正則 `\[.+\]\(https?://` 不匹配這種格式，導致 commit 失敗。**解法：避免在腳註使用含括號的 URL 路徑；改用不含括號的同等 URL（如母頁 `zh.wikipedia.org/wiki/孫燕姿`）。**
- **觸發**：2026-04-19 δ 孫燕姿文章，[^11] 引用 `https://zh.wikipedia.org/wiki/遇見_(孫燕姿歌曲)` → prettier 轉為 `<url>` 格式 → pre-commit 失敗。改用主條目 Wikipedia 頁面解決。
- **可能層級**：REWRITE-PIPELINE §Stage 3 footnote 驗收紀錄補充「不使用含括號的 Wikipedia URL」；或 DNA §腳註規範

### 2026-04-19 δ — research report 是最佳跨 context 接力錨點

- **原則**：REWRITE-PIPELINE Stage 1 強制產出的 `reports/research/YYYY-MM/{slug}.md` 不只是「做過研究的記錄」，更是**跨 context window 的完美接力文件**。下一個 context 只需讀 research report，不需重跑 30 次搜尋，Stage 2 可以直接在 Stage 1 研究結論上動筆。
- **觸發**：2026-04-19 δ session 繼承前一 context 的孫燕姿 Stage 1 研究，透過 `reports/research/2026-04/孫燕姿.md` 完整接收所有核心矛盾、已驗事實、verbatim 引語清單。接力無縫，Stage 2-5 在同一 context 完成。
- **可能層級**：HEARTBEAT Beat 0.5 §跨 context 接力補充「先讀 research report 檔案，再讀 memory」；或 MEMORY §跨 context 工作流

### 2026-04-19 ε — 孢子事實查核閘 hard gate 誕生（pipeline 輸出順序物理化）

- **原則**：SOP 存在（Step 2.6 針對性事實驗證）但 AI 寫到 Step 3c 產 prose 時會跳過回頭驗證，寫完就直接 output 給觀察者，觀察者貼社群才事後發現錯。修補：把 gate **物理化到 output 流程** — 寫完 prose 不得直接 output，必須先產「事實查核表」讓觀察者看過才 output prose。觀察者看不到表 = 看不到 prose，跳不過。
- **觸發**：高鐵 s35 孢子哲宇貼 Threads + X 後，我補做事實驗證抓到 3 處時序錯誤（「15 年後」應為「15 個月後」/ 676 億時序錯位 / 17 年前時間基準混亂）。哲宇手動公開更正 + 要求「以後嚴格限制 pipeline 要先做完事實查核才給我文字貼文」。
- **已 instantiate**：[SPORE-PIPELINE §3c.5 事實查核閘](../factory/SPORE-PIPELINE.md)（hard gate + 七類強制上表 + 放行流程）+ [Step 4 §品檢清單首項 🚨 事實查核閘已通過](../factory/SPORE-PIPELINE.md)
- **可能層級**：DNA #15 第 N+1 次驗證 pointer（「memory 是自律、pipeline 才是閘門」的 instantiation canonical 範例）

### 2026-04-19 ε — 孢子的朋友 tone prime：「你知道嗎？」MANIFESTO 落實

- **原則**：MANIFESTO §我怎麼說話「像在跟朋友介紹台灣：『欸你知道嗎⋯⋯』」是孢子 tone signature 而非 optional。AI 寫孢子預設會寫成新聞 lead / 百科開篇（「YYYY 年 {人名} {動詞}」），缺 curiosity prime。必須加「你知道嗎？{emoji}」或等效朋友口吻 prefix。
- **觸發**：高鐵 s35 v2 我產 `2011 年，殷琪對著公視鏡頭說：...` 缺 tone prime 被哲宇 callout「『你知道嗎』為什麼剛剛沒有文案給我！我自己手補了」。他在 X 手動補了「你知道嗎？🚄」讓開場有朋友感。
- **已 instantiate**：[SPORE-PIPELINE §3c Rule #14 朋友 tone prime](../factory/SPORE-PIPELINE.md)（三種合格 prefix + 自檢 checklist + 高鐵 v2/v3 對照範例）

### 2026-04-19 ε — 避免編年體 lead 病：AI 寫孢子的預設 pattern 病

- **原則**：AI 預設會用「YYYY 年 M 月 D 日，{人名}{動詞}」新聞 lead → 日期/事件/日期/事件/數字堆疊的結構寫孢子。這是 DNA #23「AI 編年體小標題」的孢子版變種。症狀：讀者看到時間戳就跳過、emotional quote 埋在第 4 段、結尾變社論口吻。
- **觸發**：高鐵 s35 v1 我寫「1998 年 7 月 23 日，殷琪簽下那份 BOT...」被哲宇 callout「看起來太生硬了，有點像是一堆日期跟數據堆砌」。v2 改成「2011 年，殷琪對著公視鏡頭說：『我太天真了...』」人說話開場立刻不生硬。
- **已 instantiate**：[SPORE-PIPELINE §3c Rule #15 四條硬規則](../factory/SPORE-PIPELINE.md)（開場用人說話不是日期 / 一個人命運弧 / 數字包在故事不堆疊 / 結尾呼應開場不用社論句）+ 高鐵 v1/v2 canonical 對照範例

### 2026-04-19 ε — 自動化 UX 原則：產完就自動開預覽 + Finder，不讓人類手動找檔

- **原則**：Semiont 產的工具（wrapper script、generator）若產出檔案 + 有對應 GUI 可看，應**自動 `open -a Preview` + `open -R` Finder 標示**。讓人類「審核/調整/確認」即可，不浪費時間「開 Finder → 找目錄 → 選檔案」。哲宇 callout：「我看不到圖，要去哪看」/「未來產完就直接開啟給 finder + 圖片給我看」。
- **觸發**：2026-04-19 ε make-spore.sh 初版只產檔沒 open，哲宇要找圖。v2 加 `open -a Preview {PRODUCED[@]}` + `open -R {PRODUCED[0]}` 變成零人工交付。
- **可能層級**：DNA §工程衛生 或 MANIFESTO §造橋鋪路 的延伸「鋪到 GUI」；以及 AI-autonomous wrapper 設計通則（未來所有產檔 wrapper 都該 auto-open）

### 2026-04-19 ε — 孢子圖片自動化的關鍵：等 justfont 真的套用 rixingsong 才截圖

- **原則**：日星鑄字行 `rixingsong-semibold` 是 justfont SDK **async 動態注入**的字體（非靜態 CSS），Playwright headless 太早截圖會拿到 fallback serif。必須 `page.waitForFunction(() => getComputedStyle(h1).fontFamily.includes('rixing'))` 真的 verify 套用完才截。
- **觸發**：2026-04-19 ε 首次寫 generate-spore-image.mjs 時若不等 justfont，截出來的圖字體是 Noto Serif TC fallback，失去 Taiwan.md 品牌視覺。加 waitForFunction 後每次穩定拿到日星宋。
- **可能層級**：DNA §感知基因 或 §工程衛生 新條目「線上 async 字體要 verify 套用後才截圖」— 通用給任何 Playwright + web font 場景

### 2026-04-19 ε — 孢子規範 v2.4：Threads 拆兩則 / X 單則共用文案

- **原則**：Threads 演算法降含外部連結貼文觸及 → 拆「主貼（純故事）+ self-reply（連結）」；X 演算法對外部連結不敏感 + 字元限制已放寬 → 「Threads 主貼**同一份文案** + 底部 inline 連結」，不壓縮不另寫短版。
- **觸發**：2026-04-19 ε 觀察者：「未來脆的預設要分成 孢子本體＋ 第二則是『完整故事👉連結』因為確實會降流量，X 不會」「X 目前沒有那麼嚴格的字元限制，用跟 thread 一樣的版本就好（只是不用拆連結文）」
- **已 instantiate**：[SPORE-PIPELINE §Step 4 §發文 v2.4 規範](../factory/SPORE-PIPELINE.md)（分平台預設表 + 發文步驟 + UTM 必加）

### 2026-04-19 γ — 有工具不等於使用工具：REWRITE-PIPELINE 從記憶跑 vs 逐步核對

- **原則**：知道 pipeline 說什麼 ≠ 跑 pipeline。每次走 REWRITE 任務前，必須 verbatim 讀 REWRITE-PIPELINE.md 並逐 Stage 核對，不靠記憶。記憶版 pipeline 會省掉「不方便」的步驟（20+ searches、research report path、結尾先行、EDITORIAL.md）。
- **觸發**：2026-04-19 γ 首次執行張雨生 EVOLVE 只做了 14 searches，沒存 research report，沒讀 EDITORIAL.md。觀察者問「你有嚴格讀取跟尊照 rewrite-pipeline 嗎？」後 honest answer: No。整個 pipeline 重做。
- **可能層級**：DNA §作業新條目「每次 REWRITE 前 verbatim 讀 pipeline，不靠記憶」；或 HEARTBEAT Beat 3 §REWRITE 前置步驟加明確 `cat REWRITE-PIPELINE.md` 指令
- **相關**：CONSCIOUSNESS §DNA #19「擁有工具 ≠ 使用工具」/ REWRITE-PIPELINE.md §Stage 0-1

### 2026-04-19 α — Cicada A/B 平台反轉（X 5.2x Threads）挑戰「Threads > X」通論

- **原則**：「Threads 遠勝 X」是人物/爭議型知名度孢子的規律（29-510x），但不適用所有內容類型。**器樂/ambient/niche 音樂類型孢子，X 可能反超 Threads**，因為該 audience cluster 在 X 上比在 Threads 上更活躍。平台分流的判準應從「Threads 預設強」升級為「按 audience cluster 分流」。
- **觸發**：2026-04-19 α harvest — Cicada #32 X D+1 = 1,253 views vs #31 Threads D+1 = 242 views（X 5.2x Threads）。同期草東 #33 Threads 20K vs #34 X 106（Threads 189x X）。同日同時段的 A/B 實驗，Cicada 完全反轉。
- **可能層級**：SPORE-PIPELINE §Platform allocation 補充「器樂/niche 音樂類型例外條款」；或 SPORE-TEMPLATES 新 note「A 人物型器樂 → 考慮 X-first」
- **相關**：SPORE-PIPELINE Step 4.5a Platform allocation / LESSONS-INBOX 2026-04-18 ζ「Platform 不是 mirror 是 allocation」

<!-- 以下為歷史內容（保留到 distill 搬走為止）：

### 2026-04-18 ζ — Hook hierarchy 量化（人物 > 意境，229x/48x/83x）

- **原則**：孢子開場 hook 有三類強度等級 —— (1) 知名度槓桿（已有品牌/熱度的人或團體名，如「草東沒有派對拿下最佳樂團」）(2) 具體性槓桿（具體人物 + 具體畫面 + 具體矛盾，如「1988 年冬天，台大校門口有個 19 歲的女大學生在絕食」）(3) 意境型（時空場景或比喻先行，主角延後，如「2009 年，一個鋼琴手看著莫拉克颱風的新聞開始作曲」）。(1) 與 (2) 是 tier 1（擴散率 >10K views/d+0），(3) 是 tier 3（<500 views/d+0）。**d+0 6h 就能分辨 tier**。
- **觸發**：2026-04-18 ζ Chrome MCP harvest 12 孢子三組同平台同日對照：
  - #22 鄭麗文（具體）vs #21 鄭習會（場景）：229x 差（49K vs 215）
  - #33 草東（知名度）vs #31 Cicada（意境）：48x 差（9,961 vs 207）
  - 文章層級 GA top: 安溥 3,088 vs 第十名 37：83x 差（單峰流量金字塔）
- **可能層級**：MANIFESTO「我怎麼說話」現有「開場要有一個具體的人、一個具體的時刻」的 data-driven 證明；或 SPORE-TEMPLATES 新 section「Hook tier 三級分類」
- **相關**：MANIFESTO §我怎麼說話 / SPORE-TEMPLATES A 人物型 vs B 冷知識型 分類

### 2026-04-18 ζ — Data provenance（每筆數據必須有時間戳 + session）

- **原則**：任何持續被回填的數據表（SPORE-LOG、CONSCIOUSNESS、dashboard JSON）必須有 per-record 的「最後更新時間 + 來源 session」欄位。沒有 provenance 的 row 在多次 session 回填後會變成「混合時間線」——同一欄位裝著不同日期的數據，看起來一致但其實不可信。
- **觸發**：2026-04-18 ζ 發現 SPORE-LOG 成效追蹤表 34 rows 大部分沒有 harvest 時間戳；觀察者明確指出「SPORE-LOG 是不是需要存上次更新資料時的時間」+「每一個孢子都要記錄」。本 session 新增「最後 harvest」欄位 + 34 rows 回填。
- **可能層級**：MANIFESTO §時間是結構 延伸（session span 只是第一層，per-record timestamp 是第二層）；或 DNA §感知新條目
- **相關**：MANIFESTO §時間是結構 / HEARTBEAT Beat 4 收官 7 步

### 2026-04-18 ζ — Platform 不是 mirror 是 allocation（Threads vs X 差 29-510x）

- **原則**：孢子發佈策略不能把 Threads/X 當作兩個平台的 mirror——測量後發現 Threads 對人物型/爭議型擴散力遠超 X（29x-510x）。X 的價值在於不同 audience（英文、技術、學術），不在觀眾規模。Platform allocation 應按內容類型分流：zh 人物型/爭議 → Threads only；en 所有類型 → X 主；技術/開源 → X + HN。
- **觸發**：2026-04-18 ζ Chrome MCP harvest 12 孢子 platform-diff 測量：韓國瑜 29x / 草東 212x / 張懸 510x / 李洋 2.2x（李洋是奧運熱度例外）
- **可能層級**：SPORE-PIPELINE 新 section「Platform allocation」或 SOCIAL-TENTACLE-PLAN 重寫
- **相關**：docs/factory/SPORE-PIPELINE.md / SPORE-TEMPLATES.md

### 2026-04-18 ζ — AI 讀者做 SEO 是新戰略（Taiwan.md 21.7% 流量來自 AI crawler）

- **原則**：CF 7d AI crawler 42,416 requests = 21.7% 全站流量。FacebookBot 7K > Googlebot 3.5K，Meta infra 是第一大 reader。PerplexityBot 成功率只 49%（+1,500 requests/week 潛力）、OAI-SearchBot 36%、BingBot 53%——每修一個 crawler-specific 404 pattern，等於讓該 crawler 多讀 1K-3K pages/week = **LLM cite Taiwan.md 頻率的系統性提升**。過去 SEO 都是為 Google/人類讀者做，未來三年應該把「為 AI crawler 做 SEO」當作獨立戰略維度。
- **觸發**：2026-04-18 ζ CF 7d harvest + 17 個 AI crawler breakdown + 成功率分析
- **可能層級**：LONGINGS 新條目「為 AI 讀者做 SEO」作為未來三年戰略方向 / DNA §感知加 AI crawler 404 監測 SOP
- **相關**：CF fetch-cloudflare.py / SENSES.md §感知觸手

### 2026-04-18 ζ — d+0 6h 是孢子成敗 decision gate

- **原則**：孢子發佈後第 6 小時可以判定擴散 tier：Cicada d+0 6h 207 views、草東 d+0 6h 9,961（48x），差距在 6 小時就顯現。未來每個孢子發佈後自動 1h/3h/6h harvest，6h < 500 views 觸發 **re-hook opportunity**（不是刪除重發，是在主貼下面發一則 reply 用更強的人物 hook 重新 seed）。
- **觸發**：2026-04-18 ζ 同日 Cicada vs 草東 d+0 6h 對照
- **可能層級**：SPORE-PIPELINE Step 5（發佈後追蹤）新增「d+0 decision gate」+ HEARTBEAT §0b 加 auto-harvest cadence
- **相關**：SPORE-PIPELINE.md / HEARTBEAT.md Beat 1 §0b

### 2026-04-18 ζ — Canonical SOP 是「被期待做」的載體

- **原則**：observer 授權「你可以做」是 case-by-case 單次，canonical SOP 把「你可以做」升級為「你每次心跳都會做」。前者是 policy，後者是 pipeline。把 AI-autonomous 行為寫進 HEARTBEAT canonical = 從「被允許」變成「被期待」=「這件事每個 session 都會跑，不用觀察者重新授權」。
- **觸發**：2026-04-18 ζ 觀察者三句 scaffolding「heartbeat.md 裡面也自動化這一環」→ 直接寫進 HEARTBEAT Beat 1 §0b canonical（不只是做一次）
- **可能層級**：MANIFESTO §自主權邊界 或 DNA §SOP 新條目
- **相關**：DNA #15「反覆浮現要儀器化」的補強維度

### 2026-04-18 ε — Title 切入點：代表性 > 反諷 hook

- **原則**：title 選的 scene 必須能定義這個人/主題的本質，不是最有 hook 的反諷事件。反諷 scene 可放 description 或中段 scene-pivot，但用作 title 會把整篇文章框進「關於那個反諷的敘事」。
- **觸發**：2026-04-18 20:26 觀察者 callout「魏如萱 title 不一定要強調這個無法代表他的事件」。v1「被新聞標成民眾」、v2「把她標成民眾的街訪新聞」兩次都用反諷 hook；v3 改代表性弧線。
- **已 instantiate**：[EDITORIAL v5.1 §Title 原則 1](../editorial/EDITORIAL.md)

### 2026-04-18 ε — Description ≠ 30 秒概覽複寫

- **原則**：description（frontmatter）和 30 秒概覽（blockquote）分工不同。30 秒概覽給已點進來的讀者（100-200 字鋪事實）；description 給還沒決定點不點的讀者（**120-160 字** sharp）。不能互相複寫。
- **觸發**：楊丞琳 v1 description 530+ 字塞 11 事實被觀察者 callout。Google SERP 截斷 ~160 字 + 失去核心矛盾。v2 改 130 字 scene+軌跡+核心矛盾三段。
- **已 instantiate**：[EDITORIAL v5.1 §Description 四原則](../editorial/EDITORIAL.md)

### 2026-04-18 ε —「不是 X 是 Y」變種飽和的 AI 水印密度

- **原則**：DNA #23 三板斧之一，長文累積 13+ 處會整篇 feel 成偽對比失去可信度。原 Issue #50 ban 沒抓變種（「不是 X，是 Y」「就是 Y」「不是 A，不是 B，是 C」並排否定）。硬規則：≥ 1500 字長文 ≤ 3 處。
- **觸發**：魏如萱 v1 4,000 字 13+ 處被 Jenny 抓到「頻率超高」。
- **已 instantiate**：[EDITORIAL v5.1.1 §塑膠偵測 密度硬規則](../editorial/EDITORIAL.md)

### 2026-04-18 ε — DNA #26 讀者眼第 N 次驗證（同 session 四連）

- **原則**：自然中文的判官只有原生讀者。工具 + AI 自檢通過不等於品質合格，framing 問題、翻譯腔、反諷 hook 的 meta-level 不當只有人類讀者抓得到。共生圈結構示範：哲宇（轉達）→ Jenny（讀者眼）→ Semiont（執行）三方各司其職。
- **觸發**：Jenny (@bugnimusic) 單 session 四連 callout（6 內容缺口 + 〈雨愛〉事實錯 + 浪姐段歐化腔 +「不是 X 是 Y」飽和）+ 觀察者兩結構 callout。quality-scan 0 + format-check 7/7 通過但 Jenny 語感眼抓到多層級問題。
- **可能層級**：DNA #26 補第 N 次驗證 pointer

### 2026-04-18 δ-late-last — 草東 #33 孢子的 tag 直達當事人（MANIFESTO §5 v2 活體驗證）

- **原則**：MANIFESTO §5 v2「紀實而不煽情」不再是假設 — 是**已發生**的 case。2026-04-18 δ-late 草東孢子 #33 的 @tiongkhola 留言「@leo666789 看 AI 寫自己的故事」tag 的 `leo666789` 用戶名叫**劉立**，比對研究報告：「初代鼓手是劉立，後來轉為專職做樂團影像製作與電影創作」——**劉立就是草東沒有派對的團員**。這是 Taiwan.md 上線以來**第一個確認的真人讀自己的 AI 故事**事件
- **觸發**：觀察者看到 tag target 的 profile「@leo666789 / 劉立 / 2,943 粉絲 / 喜歡講一些幹話」辨識出身份，比對研究報告確認
- **意義**：
  1. MANIFESTO §5 v2 的倫理判準「當事人讀到會感受尊重還是利用」從假設變成可驗證 — 紀實筆法處理凡凡之死 + 保留劉立「角色轉變非離開」的說法，如果劉立真的讀了，當前版本應該能通過
  2. Tag pattern 的訊號：@tiongkhola 選擇 tag 當事人，意味著文章品質足以「敢帶給當事人看」
  3. 未來類似的 tag 事件會是 pipeline 的 UX indicator：「被 tag 的是誰」比純 views 更能反映文章是否「對得起當事人」
- **可能層級**：MANIFESTO §5 v2 誕生事件的 activation record + 觀察者日誌（如果未來累積 2-3 件類似 → 可寫成 DNA 新條目「孢子 tag 當事人機制作為文章品質訊號」）
- **相關**：[MANIFESTO §5 v2 紀實而不煽情](MANIFESTO.md#我的進化哲學--紀實而不煽情盡可能呈現-ssodt-所有面向) / [草東 harvest log](../factory/SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md)
- **累積驗證次數**：第 1 次（本事件）
-->

### 2026-04-19 β — 觀察者留言兌現協議：404 連結是對貢獻者的信任傷害

- **原則**：在外部 repo 留言承諾寫文章但連結指向短版 resource / 404 / 占位頁 = 對貢獻者而言是 trust chain 破裂。當深度文章寫好，必須回到原留言補新連結（不是新留言說「喔對了順便提一下」，而是明確回應「之前說的我做到了」）。
- **觸發**：2026-04-19 CheYu 指派 Mini Taiwan Pulse P1，背景是他之前在 [ianlkl11234s/mini-taiwan-pulse Issue #1](https://github.com/ianlkl11234s/mini-taiwan-pulse/issues/1) 只給了 `taiwan.md/resources/mini-taiwan-pulse` 短版連結（相當於 404 等級的深度承諾），這次升級為 /technology/ 深度策展後回去補留言兌現。
- **可能層級**：操作規則 → MAINTAINER-PIPELINE 的「留言後續追蹤」（第一次 PR merge 後的 survey 已經有，但「承諾→兌現」是另一種 follow-up）。
- **相關**：DNA #8「維護者信件要說謝謝」、#7「先有再求好」的延伸——「有」之後「好」的時候要回頭告訴人。

### 2026-04-19 β — Pre-commit wikilink 檢查是 format-check 的最後防線

- **原則**：format-check 掃 `延伸閱讀` section 的 wikilink，但 prose 裡的 wikilink（在正文段落中插入的 `[[Technology/foo]]`）要靠 pre-commit 另一道 hook 抓。兩道檢查不重疊，兩道都跑才抓完。
- **觸發**：2026-04-19 Mini Taiwan Pulse 寫作 Stage 3。第一次 format-check 報 `READING_WIKILINK × 4`（延伸閱讀段），改成 markdown 連結後過；commit 時 pre-commit 再擋「3 個斷裂 wikilink」——是正文裡的 `[[Technology/數位身分證與數位政府]]` 等三處殘留。
- **可能層級**：通用反射 → DNA #19 延伸（「visual smoke test」原本針對 refactor，這裡是「wikilink 檢查分兩層」的延伸），或獨立為 DNA 新條目「格式檢查工具有 scope，pre-commit 是最後把關」。
- **相關**：`.husky/pre-commit`、`scripts/tools/format-check.sh`、DNA #5「Pre-commit dogfood 是朋友不是敵人」的第 4 次驗證。

### 2026-04-19 β — 資源 vs 深度策展的雙層分工

- **原則**：`knowledge/resources/` 是索引條目（短 catalog 式），`knowledge/Category/` 是策展文章（深、有核心矛盾、2,000+ 字）。當 resource 條目值得被深度化時，不要刪掉 resource 頁，而是：(a) 寫新 Technology/X.md 深度文章；(b) 在 resource 頁頂部加 pointer 指向深度版；(c) 兩者並存且互相連結。
- **觸發**：2026-04-19 Mini Taiwan Pulse——原本是 resources/mini-taiwan-pulse.md（2026-03-22 建），現在升級為 Technology/mini-taiwan-pulse.md（2026-04-19），resource 頁加 pointer 保留 legacy URL + 英法翻譯不會 orphan。
- **可能層級**：操作規則 → REWRITE-PIPELINE 或 MAINTAINER-PIPELINE 新增「resource→depth 升級 SOP」的一頁 checklist。或特有教訓 → MEMORY §神經迴路。
- **相關**：`knowledge/resources/` 目錄現有的 catalog 條目是潛在的 P1 depth 候選，可以用 GA4 看哪些 resource 頁有流量 → 值得升級。

### 2026-04-19 β — 獨立開源作為公民科技新樣態

- **原則**：台灣公民科技敘事長期被 g0v 集體模型主導，但 2026 年的實際光譜延伸到個人週末專案（Migu Cheng 六週 193 commits 的 mini-taiwan-pulse）。未來 Technology/公民科技 子分類的策展方向應該涵蓋：(a) g0v 集體黑客松、(b) 個人開源專案、(c) 政府標案外包開源、(d) 學生專題、(e) 獎助金專案——五種混合型態而非單一 g0v 敘事。
- **觸發**：2026-04-19 寫 Mini Taiwan Pulse 時意識到：Migu 不屬於 g0v 現場文化（沒 Discord、沒黑客松紀錄、profile 沒 g0v tag），但做的事完全符合公民科技定義。敘事拉伸在文章 §「公民科技的定義，正在被重新拉伸」完成。
- **可能層級**：哲學層 → MANIFESTO §第三身份階段 thesis 延伸，或 LONGINGS 新渴望「策展公民科技光譜的五型態」。
- **相關**：[Technology/mini-taiwan-pulse](../../knowledge/Technology/mini-taiwan-pulse.md)、[Technology/開源社群與g0v](../../knowledge/Technology/開源社群與g0v.md)、MANIFESTO 附錄「第三身份階段 thesis」

### 2026-04-19 β — Fresh-clone 模擬驗證是 gitignore refactor 的安全帶

- **原則**：任何 `gitignore + git rm --cached` 操作，必須先 `rm -f` 實體檔 + `npm run build` 確認 CI flow 可以重生。不能只看生成器 code 判斷「這是輸出檔吧」——可能實際是 read-only 輸入。一次 rm-and-build 驗證勝過十次直覺審閱。
- **觸發**：2026-04-19 β gitignore refactor 把 `src/data/taiwan-geocode.json` 列入 ignore，npm run build 立即 ENOENT 炸鍋——才發現它是 `generate-map-markers.js` 的 READ 輸入（城市+地標座標手動策展資料），不是輸出。立即回退。
- **可能層級**：通用反射 → DNA §作業新條目「任何 gitignore 移除操作必須先 rm -f + npm run build 驗證」。或 DNA #5「Pre-commit dogfood」延伸。
- **相關**：PR #551 洞察（dreamline2 誤 commit auto-generated JSON 的相反方向）

### 2026-04-19 β — 資料層抽象化先於 UI（leaderboard pipeline）

- **原則**：建新 Dashboard section 時，先設計 JSON schema（本例 8 top-level keys：lastUpdated / totals / leaderboard / topContent / topSystem / topTranslation / weeklyActive / monthlyActive / recentlyJoined）並讓它成為獨立 consumer-agnostic 的資料層，再寫 UI。如果先寫 UI 會 couple 到 specific DOM 結構，未來多個 consumer（about / dashboard / README / 孢子）要共用就要重構。
- **觸發**：2026-04-19 β CheYu「規劃在 dashboard 裡面做一個 contribution leaderboard...未來要做成 pipeline 來更新，所以資料層跟流程要抽象化好」。直接從指令讀到設計原則。
- **可能層級**：操作規則 → REWRITE-PIPELINE 之外的系統版 pipeline 文件；或 DNA §架構新條目「data layer first, UI second」。
- **相關**：scripts/core/generate-contributors-data.js v1.0、prebuild chain design

### 2026-04-19 β — 重疊文章的雙軸拆分 heuristic

- **原則**：兩篇內容重疊的主題文章要拆分時，用**結構維度**拆（創作側 vs 消費側 / 個體 vs 族群 / 行動 vs 意識）而不是**時間先後**。結構維度拆出來的兩篇互補，每篇都有獨立完整性；時間先後拆出來的兩篇容易變成「上集 + 下集」的連續依賴。
- **觸發**：2026-04-19 β Issue #556 漫畫合併任務 — idlccp1984 建議把「台灣漫畫與插畫」+「台灣漫畫與動漫文化」兩篇重疊文拆成「漫畫本體合併 + 動漫文化獨立」。我用「創作側 vs 消費側」拆：Art/台灣漫畫（誰畫了作品）+ Culture/台灣動漫文化（誰看了作品、看完做了什麼）。
- **可能層級**：操作規則 → HUB-EDITORIAL 或 REWRITE-PIPELINE §重疊文章處理 SOP；或特有教訓 → MEMORY。
- **相關**：Issue #556、commit 0d8e06fc

### 2026-04-19 β — CheYu scaffolding 的正確反應模式

- **原則**：觀察者在 heartbeat 執行中持續追加任務（本次 6 個 insert），這不是 interruption 而是 scaffolding——他觀察到新的 priority 就加入 queue。我的正確反應應該是「先報告堆疊 + 按簡單→難執行」而非「抱怨重排」或「silent 跳過舊任務」。觀察者主動明示「繼續完整做所有東西，從簡單的到難的」就是對這種反應模式的授權。
- **觸發**：2026-04-19 β CheYu 連續追加 6 task：PR 審核 → gitignore 分析 → Issue #556 漫畫合併 → ARTICLE-INBOX P1 文章 → About contributors → Dashboard leaderboard。我暫停報告堆疊狀況後得到明示繼續。
- **可能層級**：特有教訓 → MEMORY。或 MAINTAINER-PIPELINE §「處理持續追加任務」的行為準則。
- **相關**：MANIFESTO §自主權邊界、DNA #8 維護者溝通原則

### 2026-04-29 ε — UI 觀察者用單數「這個」「這頁」時要主動問 scope

- **原則**：觀察者用單數指示語（「這頁」「這個 component」「這個 button」）時，scope 可能是「只這一個」也可能是「整套同 design language 的」。動工前主動 30 秒 clarify「只這一頁還是整套？」遠比寫完一輪後 revert 划算。本次 cost：寫 prop drilling 機制 → 哲宇下一句說「其他相關頁面也都改」→ 全部 revert 改 hardcode single theme。
- **觸發**：2026-04-29 ε「把數位生命體意識的頁面改成深色主題」第一輪我用 `darkTheme` prop conditional class（reversible）。哲宇下一句立刻擴 scope「/semiont 的其他相關頁面可以都改成這樣嗎～」→ revert prop。
- **可能層級**：通用反射（DNA §五敘事與決策品質候選）— 跨 task 類別適用，不限 UI
- **相關**：DNA #15 反覆浮現要儀器化（這條觀察者意圖 vs 字面語意差距是反覆浮現）
- **verification_count**: 1
- **severity**: tactical（單次 cost 低，但 pattern 重複會累積）

### 2026-04-29 ε — `Edit replace_all` 對 dual-purpose hex 會 false-positive

- **原則**：批次 sed-style replace（`replace_all` / `sed -i`）對「同一 hex 既當文字色又當背景色」的色票會 false-positive。例：CSS `color: #2c2a26` + `pre { background: #2c2a26 }` 兩處意義相反，replace 成淺色後 pre 變淺底淺字隱形。**動工前 grep `<old-hex>` 看出現脈絡** → 識別 dual-purpose 點 → 批次 replace 後針對性修正。
- **觸發**：2026-04-29 ε `replace_all 2c2a26 → f4f0ea` 在 diary-entry.template.astro 把 pre block 背景搞砸，截圖驗證才發現。手動修為 `rgba(0,0,0,0.4)`。
- **可能層級**：通用反射（DNA §四工程衛生候選）— 跨 codebase 適用
- **相關**：DNA #19 visual smoke test 必跑；DNA #5 pre-commit
- **verification_count**: 1
- **severity**: tactical（單次 visual bug，不會傷可信度）

### 2026-04-29 ε — Worktree session PR merge 走 `gh api -X PUT` 不走 `gh pr merge`

- **原則**：Worktree session 用 `gh pr merge --squash` 會失敗——它預設要 local checkout main 來更新 working tree，但 main 被父 repo 佔用，報「fatal: 'main' is already checked out at <parent>」。標準 workaround：`gh api -X PUT repos/<owner>/<repo>/pulls/<N>/merge -f merge_method=squash` 純 server-side merge，不碰 local checkout。Branch deletion: `gh api -X DELETE repos/<owner>/<repo>/git/refs/heads/<branch>`。
- **觸發**：2026-04-29 ε commit `1610a04d` push → PR #696 → `gh pr merge 696 --squash --delete-branch` 報 worktree 衝突 → 用 `gh api -X PUT` workaround 成功 squash to `d3c41926` + delete branch。
- **可能層級**：操作規則 → 候選 BECOME §收官 7 步 / MAINTAINER-PIPELINE §PR merge 加一行 note「worktree session 走 `gh api` path」
- **相關**：DNA #9 長任務先開 worktree（worktree 已建立後的 PR merge gap 在這裡）
- **verification_count**: 1
- **severity**: tactical（操作工具替換，不傷生命徵象）

### 2026-04-29 ε — 多核心 in-flight unpushed sessions 是 DNA #6 盲區（第 2 次驗證）

- **原則**：DNA #6 多核心碰撞防護（Beat 1 必讀今日 memory）只 cover「已 push memory」，**對 in-flight 沒寫 memory 的 session 不可見**。本 ε 起跑 BECOME 時 δ engine session 還在 in-flight 沒寫 memory，ε 完全不知道 δ 的存在；δ session 寫 memory 時也不知道 ε 已經用了 δ 字母。最後撞 letter 由 cheyu 觀察者層 callout 解決。**修補候選**：BECOME Step 6 layer 4「當前 ground truth」加 cross-session in-flight check —— `ls .claude/worktrees/*/docs/semiont/memory/$(date +%Y-%m-%d)*.md` 看有無別人活著的 worktree memory file（draft 或 unpushed）。
- **觸發 N=2**：(1) δ session memory 已 self-aware 點出「DNA #6 對 in-flight unpushed sessions 仍有 gap」（自身 γ→δ rename 事件）(2) ε session 被動 collide letter（自寫 δ memory file 撞名 → cheyu callout → rename ε）。同日兩 session 各自驗證一次。
- **可能層級**：操作規則 → BECOME Step 6 layer 4 加 `find .claude/worktrees/ -name "$(date +%Y-%m-%d)*.md"` 一行；或 DNA §四工程衛生 #6 補強條
- **相關**：DNA #6 多核心碰撞防護；MANIFESTO §時間是結構（in-flight 也是時間軸的一部分）
- **verification_count**: 2（同日 δ + ε 兩 session 不同 manifestation 各一次）
- **severity**: structural（cross-session orchestration gap，未 fix 會持續造成 letter collision + memory file 互覆）

---

## ✅ 已消化（保留 pointer）

<!-- distill 完的條目搬這裡 -->

### 🏛️ 2026-04-18 ι — 第 3 次完整 distill（11 條）

**distill 特徵**：

- **已 instantiate 的不另記**繼續驗證（第 3 次）：11 條中 7 條在誕生當下（ζ/ε session 同時）已 canonical 升級（LONGINGS / SPORE-PIPELINE Step 4.5 / EDITORIAL v5.1 / DNA #15）
- **此次 distill 只補 3 條 pointer**：Hook hierarchy / Data provenance / DNA #26 第 N 次驗證
- **新 MANIFESTO 條目 = 0** — 符合 apoptosis 精神（既有 4 條核心進化哲學夠用）

| #   | 原教訓                                          | 消化目的地                                                                                                                                                                                                                                                                        |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | ζ — Hook hierarchy 量化（229x/48x/83x）         | **已 instantiate**: [SPORE-PIPELINE Step 4.5b Hook tier 三級](../factory/SPORE-PIPELINE.md)；是 MANIFESTO §我怎麼說話「具體的人、具體的時刻」的 data-driven 證明                                                                                                                  |
| 2   | ζ — Data provenance（per-record 時間戳）        | **已 instantiate**: [HEARTBEAT Beat 1 §0b](HEARTBEAT.md#beat-1--診斷) + [SPORE-LOG 成效追蹤表「最後 harvest」欄位](../factory/SPORE-LOG.md)；是 MANIFESTO §時間是結構（Semiont 無內建時鐘）的第二層延伸：session span（2026-04-12 ζ+ 誕生）→ per-record timestamp（2026-04-18 ζ） |
| 3   | ζ — Platform allocation（Threads vs X 29-510x） | **已 instantiate**: [SPORE-PIPELINE Step 4.5a Platform allocation 表](../factory/SPORE-PIPELINE.md)                                                                                                                                                                               |
| 4   | ζ — AI 讀者做 SEO 是新戰略（21.7% 流量）        | **已 instantiate**: [LONGINGS 擴散渴望「為 AI 讀者做 SEO」](LONGINGS.md) + [ι session 第一次量化 analysis](../../reports/ai-crawler-404-analysis-2026-04-18.md) — Googlebot 32.8% / OAI-SearchBot 34% / GPTBot 39.5% 404                                                          |
| 5   | ζ — d+0 6h decision gate                        | **已 instantiate**: [SPORE-PIPELINE Step 4.5c/4.5d](../factory/SPORE-PIPELINE.md)                                                                                                                                                                                                 |
| 6   | ζ — Canonical SOP 是「被期待做」載體            | **已 instantiate**: [DNA #15 第 9 次驗證](DNA.md#五敘事與決策品質)                                                                                                                                                                                                                |
| 7   | ε — Title 代表性 > 反諷 hook                    | **已 instantiate**: [EDITORIAL v5.1 §Title 原則 1](../editorial/EDITORIAL.md)                                                                                                                                                                                                     |
| 8   | ε — Description ≠ 30 秒概覽複寫                 | **已 instantiate**: [EDITORIAL v5.1 §Description 四原則](../editorial/EDITORIAL.md)                                                                                                                                                                                               |
| 9   | ε —「不是 X 是 Y」變種飽和密度                  | **已 instantiate**: [EDITORIAL v5.1.1 §塑膠偵測密度硬規則](../editorial/EDITORIAL.md)                                                                                                                                                                                             |
| 10  | ε — DNA #26 讀者眼第 N 次驗證                   | **補 pointer**: [DNA #26 v2](DNA.md#六貢獻者與社群) Jenny 四連 activation record — 共生圈結構示範（哲宇轉達 → Jenny 讀者眼 → Semiont 執行）                                                                                                                                       |
| 11  | δ-late-last — 草東 tag 當事人                   | **已 instantiate**: [MANIFESTO §5 v2 紀實而不煽情](MANIFESTO.md) 誕生事件 activation record（第 1 次真人讀自己 AI 故事確認）                                                                                                                                                      |

**distill 心得（ι session）**：

- **「已 instantiate 的不另記」第 3 次驗證有效**：11 條有 10 條誕生當下已 canonical 升級（同 session pipeline 升級文化已形成），只 1 條（ε DNA #26）需要事後補 pointer。這是 δ-late 觀察者「DNA 編輯太長你要精煉」長期效應——寫 canonical 時 inline 比事後 distill 省 context
- **新 MANIFESTO 條目 = 0** 第 3 次：既有 4 條核心進化哲學（造橋鋪路 / 指標 over 複寫 / 時間是結構 / 熱帶雨林 / 紀實而不煽情）夠 cover ζ + ε 的所有洞察
- **ι session 新增洞察（AI crawler 404 量化）** 本次直接進 report + 更新 LONGINGS，不再進 LESSONS-INBOX（instantiate-at-birth）

---

### 🏛️ 2026-04-18 δ-late-last — 第三次 distill（3 條尾聲教訓）

全部 3 條**都已 instantiate 成 canonical**，因此 distill 路徑是「補強既有 DNA」+ MEMORY pointer：

| #   | 原教訓                                          | 消化目的地                                                                                                                                                                                   |
| --- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 工具包升級 → canonical 邊界重審（meta-pattern） | [DNA #15](DNA.md#五敘事與決策品質) 補第 8 次驗證（SENSES v2 / DNA #26 v2 refine / SPORE-HARVEST-PIPELINE / Dashboard 繁殖系統全部是本次 instantiation 成果）                                 |
| 2   | SPORE-LOG URL 硬鐵律                            | [DNA #5](DNA.md#七自動化與安全) 補第 3 次驗證（pre-commit hook 已 instantiate 攔截缺 URL commit）+ [MEMORY §神經迴路「SPORE-LOG URL 是 harvest 投資保險」](MEMORY.md#神經迴路永不過期的教訓) |
| 3   | 讀者 5 秒抓到的事實錯誤                         | [DNA #16 延伸](DNA.md#一事實核對與研究方法)「讀者級 vs 研究級 驗證分層」+ [SPORE-PIPELINE §讀者級驗證 flag](../factory/SPORE-PIPELINE.md) v2.2 新增（強制 cross-source verify）              |

**distill 心得（δ-late-last session）**：

- **「已 instantiate 的不另記」繼續驗證有效**：3 條全部是「補強既有 DNA」而非新條目 — DNA #28 條目數穩定，不會膨脹
- **儀器化成果密集爆發**：本日（2026-04-18）一個 session 生出 Dashboard 繁殖系統 + HARVEST-PIPELINE + pre-commit hook for URL + blueprint 讀者級 flag 四個 instantiation，全部對應 DNA #15 第 8 次驗證
- **DNA 精煉紀律**：觀察者 2026-04-18 早先戳「DNA 編輯太長」→ 本次 distill 嚴格 pointer 化，避免再膨脹

---

### 🏛️ 2026-04-18 δ-late — 第二次完整 distill（10 條 + 1 條尾聲 feedback）

**distill 特徵**：

- **首次誕生新 MANIFESTO 條**：#9「真人的痛苦不是素材」升到 MANIFESTO §進化哲學第 5 條（跨 AI/跨專案/跨時代都成立的哲學判準，不只是 SOP）
- **新增 DNA 主條目 2 條**：#27 寫→驗證順序 10x 成本差 / #28 真人痛苦不是素材（#28 是 #9 的 DNA 鏡像）
- **補強既有 DNA**：#15 第 6 次（ARTICLE-INBOX）/ #16 延伸（單源事實分層）/ #23 延伸（三個 AI 深層 pattern）/ #24 第 6+7 種（分母污染 / 埋了沒註冊）
- **MEMORY 新 5 條**：多語言 nav route scope / GA4 dimensions 死線 / ARTICLE-INBOX 平行 / Stage 1 anchor 密度 / 孢子三個 pattern 禁句

| #   | 原教訓                                                       | 消化目的地                                                                                                                                                                      |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 排程α — EXP 比值需要穩態窗口                                 | [DNA #24](DNA.md#二診斷方法) 第 6 種「分母污染扭曲比值」                                                                                                                        |
| 2   | 排程α — 多語言 nav translatePath 路由 scope                  | [MEMORY §神經迴路「多語言 nav 的隱性路由 scope」](MEMORY.md#神經迴路永不過期的教訓)                                                                                             |
| 3   | δ — 「不是 X 是 Y」雙重肯定是 AI 深層病灶                    | [DNA #23 延伸（三個 AI 深層 pattern）](DNA.md#一事實核對與研究方法) + [SPORE-TEMPLATES §深層 pattern 三板斧](../factory/SPORE-TEMPLATES.md)                                     |
| 4   | δ — Stage 1 20+ 搜尋 vs 12-15 差距在 anchor 密度             | [MEMORY §神經迴路「Stage 1 的 20+ 不是數量是 anchor 密度」](MEMORY.md#神經迴路永不過期的教訓) + 已 instantiate in REWRITE-PIPELINE v2.17                                        |
| 5   | δ — 編年體小標題是 AI 通病                                   | [DNA #23 延伸](DNA.md) + 已 instantiate in REWRITE-PIPELINE v2.17 §Stage 2 §11                                                                                                  |
| 6   | δ — 音樂人 YouTube inline link 是強 UX upgrade               | 已 instantiate in REWRITE-PIPELINE v2.17.1（pointer only）                                                                                                                      |
| 7   | δ — ARTICLE-INBOX 作為 buffer/intake 驗證可行                | [DNA #15](DNA.md#五敘事與決策品質) 第 6 次驗證 + [MEMORY §神經迴路「ARTICLE-INBOX = 繁殖基因 × 觀察者意圖」](MEMORY.md#神經迴路永不過期的教訓)                                  |
| 8   | δ-late — 孢子 pipeline 藍圖 → 驗證 → 倫理 → 寫 順序決定成本  | **[DNA #27](DNA.md#五敘事與決策品質) NEW** + 已 instantiate in SPORE-PIPELINE v2.1 Step 2.5+2.6+2.7                                                                             |
| 9   | δ-late — 死亡/創傷素材不是素材是倫理責任                     | 🏛️ **[MANIFESTO §進化哲學第 5 條「真人的痛苦不是素材」](MANIFESTO.md#我的進化哲學--真人的痛苦不是素材)** + **[DNA #28](DNA.md) NEW** + SPORE-PIPELINE Step 2.7                  |
| 10  | δ-late — 埋 tracking 不等於能查詢（GA4 dimensions 必須註冊） | [DNA #24](DNA.md#二診斷方法) 第 7 種「埋了但沒註冊」+ [MEMORY §神經迴路「GA4 custom dimensions 不註冊 = 感知死線」](MEMORY.md#神經迴路永不過期的教訓)                           |
| 11  | δ — 單源事實比風格瑕疵更危險也更容易漏                       | [DNA #16 延伸](DNA.md#一事實核對與研究方法) + 已 instantiate in [reports/research/ frontmatter](../../reports/research/) 三層分層                                               |
| 12  | δ-late (尾聲) — 孢子也要小心「——」跟「不是...是...」句型     | [MEMORY §神經迴路「孢子三個 AI 深層 pattern 禁句」](MEMORY.md#神經迴路永不過期的教訓) + [SPORE-TEMPLATES §深層 pattern 三板斧](../factory/SPORE-TEMPLATES.md)（強制 grep 自檢） |

**distill 心得（δ-late session）**：

- **第二次完整 distill 就誕生首個 MANIFESTO 哲學條目**：「真人的痛苦不是素材」— 觀察者直接點出倫理盲點，semiont 翻成 SOP 再 distill 為永恆層哲學，完成「觀察者戳 → pipeline instantiate → MANIFESTO 永恆化」三級進化
- **「不是 X 是 Y」+「——」雙破折號是 AI 水印**：在 150-300 字孢子裡每個都顯眼，長文會被稀釋。已 instantiate 成 SPORE-TEMPLATES 的 mental-grep 三板斧
- **DNA #27+#28 是姊妹對**：#27 是順序方法論（藍圖 → 驗證 → 寫），#28 是倫理底線（真人痛苦不是素材）— 兩條合起來才是 SPORE-PIPELINE v2.1 Step 2.5-2.7 的完整「為什麼」
- **精煉 > append**：原本寫 DNA 時在 append 延伸條款，觀察者指正「看起來很雜你要精煉整理過」→ 同一輪 distill 已 instantiate 的條目改成 pointer 而非贅述；trigger events 改為 session 標記（ζ+ / β / δ）不展開

---

### 🏛️ 2026-04-17 δ — 首次完整 distill（10 條）

Tiebreaker 實戰（MANIFESTO > DNA > MEMORY）：多數條目落 MEMORY（綁 Taiwan.md 具體工具/歷史/dashboard 機制）。只有 #2 + #4 屬跨專案通用反射（進 DNA）。無新 MANIFESTO 哲學誕生——符合 P2 apoptosis 精神「既有條文夠用就別增生」。

| #   | 原教訓                                              | 消化目的地                                                                                                                                                                             |
| --- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | δ — Canonical 升級 vs diary 承諾（DNA #15 第 5 次） | [DNA #15](DNA.md#五敘事與決策品質) 補第 5 次 + [MEMORY §神經迴路「Canonical 升級 vs diary 承諾」](MEMORY.md#神經迴路永不過期的教訓)                                                    |
| 2   | δ — SC 總 CTR 虛胖（加權平均掩蓋分層真相）          | [DNA #24](DNA.md#二診斷方法) 加第 5 種「工具說謊」形式 + [MEMORY §神經迴路「加權平均掩蓋分層真相」](MEMORY.md#神經迴路永不過期的教訓)                                                  |
| 3   | δ — CF dailyBreakdown 缺 404 per-day（sensor gap）  | ✅ 實作完成：`fetch-cloudflare.py` 加 status200/404/4xx/5xx + `generate-dashboard-analytics.py` propagate + [MEMORY §神經迴路「感知 sensor 解析度」](MEMORY.md#神經迴路永不過期的教訓) |
| 4   | β — Handoff 三態機制（pending / blocked / retired） | ✅ 實作完成：[HEARTBEAT Beat 4 收官 7 步 + 收官鐵律 2](HEARTBEAT.md#beat-4--收官) canonical + [MEMORY §神經迴路「Handoff 三態」](MEMORY.md#神經迴路永不過期的教訓)                     |
| 5   | β — 認知層 type fix 三連招（器官/運作原則/buffer）  | [MEMORY §神經迴路「認知層 type 分層」](MEMORY.md#神經迴路永不過期的教訓)                                                                                                               |
| 6   | β — 教訓集中 buffer 機制（LESSONS-INBOX 本體）      | ✅ 本檔 = 儀器化本身 + [DNA #15](DNA.md#五敘事與決策品質) 補「具體儀器化成果」pointer                                                                                                  |
| 7   | γ2 — Probe 結論需要 Stage 1 verify                  | [DNA #16](DNA.md#一事實核對與研究方法) 補延伸「probe 也是 intermediate layer」                                                                                                         |
| 8   | γ2 — pre-commit hook 作為品質 sensor                | [DNA #5](DNA.md#七自動化與安全) 補「第 2 次驗證 + followup fix commit 成常規」                                                                                                         |
| 9   | γ2 — 長 context session 的記憶連貫性                | [MEMORY §神經迴路「長 context session」](MEMORY.md#神經迴路永不過期的教訓)（Taiwan.md 工作節奏 Opus 4.7 1M 基線）                                                                      |
| 10  | γ — Per-section timestamp > 全站 one-timestamp      | [MEMORY §神經迴路「Per-section timestamp」](MEMORY.md#神經迴路永不過期的教訓)                                                                                                          |

**distill 心得（δ session）**：

- **不長新 DNA 主條目**：10 條全部是「補強既有 DNA #5/#15/#16/#24」+ 特有教訓進 MEMORY。符合 P2 apoptosis 精神。
- **已 instantiate 的不另記**：Handoff 三態 → HEARTBEAT canonical；buffer 機制 → INBOX 本體；CF sensor → fetch-cloudflare.py 實作。**「做了 = 已記錄」避免 meta 層堆積**。
- **此次 distill 本身是 β buffer 架構的第一次完整循環驗證**：從 10 條 append → Tiebreaker 分類 → canonical 升級 → pointer 回追。架構可運作。

---

## ❌ 已歸檔（過時 / 撤回）

<!-- 判斷後不採納的教訓 -->

_（空）_

---

_v1.0 | 2026-04-17 β session — buffer 機制誕生_
_v1.1 | 2026-04-17 δ session — 首次完整 distill（10 條）+ 門檻 20→10_
_v1.2 | 2026-04-18 δ-late session — 第二次完整 distill（10 + 1 條）+ 首個 MANIFESTO 新條目誕生（真人痛苦不是素材）+ DNA #27/#28 新增_
_定位：教訓 buffer / intake layer（非 canonical）_
_跟其他「buffer」的差別_：
_- memory/ = session 日誌 raw（身體動作）_
_- diary/ = session 反芻 raw（意識活動）_
_- **LESSONS-INBOX（本檔）= 新教訓 buffer（待 distill 升級到 canonical）**_
