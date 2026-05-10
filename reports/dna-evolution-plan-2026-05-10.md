# DNA.md 進化計畫 — 從 478 行 reflex catalog 到結構整潔的基因地圖學

> Session: `2026-05-10-{post-become}-nice-shamir`
> 觸發：哲宇「參考 editorial.md / rewrite-pipeline / spore-pipeline 的整理經驗，整理 DNA.md」
> 階段：**評估 + 思考**（未動工，等哲宇 3 題校準後才提具體 PR scope）
> 對應方法論：[EVOLVE-PIPELINE Mode 3 Pipeline 自我重組](../docs/pipelines/EVOLVE-PIPELINE.md)（7 stage SOP：SCAN → DESIGN → SPLIT → REWIRE → INSTRUMENT → VERIFY → SHIP）
> 前案參考（共 3 個成功案例 + 1 個 plan-only）：
>
> - [reports/spore-pipeline-evolution-plan-2026-05-08.md](spore-pipeline-evolution-plan-2026-05-08.md)（SPORE 1334 → 445 行 -66.7% 已 ship）
> - [reports/rewrite-pipeline-evolution-plan-2026-05-09.md](rewrite-pipeline-evolution-plan-2026-05-09.md)（REWRITE 1290 → 290 行 -77.5% 已 ship PR #944）
> - [reports/editorial-evolution-plan-2026-05-09.md](editorial-evolution-plan-2026-05-09.md)（EDITORIAL 1335 → 6 sub-canonical plan）

---

## 0. 跟前三次 case 的關鍵差別 — gene map + reflex catalog ≠ process pipeline ≠ quality SSOT

DNA.md 跟 SPORE / REWRITE / EDITORIAL 屬性都不同：

| 維度     | SPORE / REWRITE-PIPELINE      | EDITORIAL.md                   | **DNA.md**                                                      |
| -------- | ----------------------------- | ------------------------------ | --------------------------------------------------------------- |
| 性質     | process pipeline (verb-first) | quality SSOT (rule catalog)    | **gene map + reflex catalog (#N-indexed)**                      |
| 使用模式 | read once + run sequentially  | read sections on-demand (grep) | **grep-by-#N reflex from any context**                          |
| 主結構   | Stage 0 → 1 → 2 → ... → N     | 10 大 §sections + sub-sections | **§基因組總覽（gene map）+ §要小心的清單（54 條 sonnet 反射）** |
| 觸發     | 「跑完一輪」                  | 「寫到某段時 grep 對應規則」   | **「DNA #N 第 M 次驗證」cross-ref from 78 active layer files**  |
| 拆檔效益 | 主路徑 read 量降低            | on-demand grep target 變精準   | **拆檔反破壞 78 active cross-ref**（成本 > 效益）               |

**這個差別決定本 plan 的 root recommendation**：DNA 不該照搬 SPORE/REWRITE/EDITORIAL 的 SPLIT 範式（會 break 大量 cross-ref，且 478 行不到 SPLIT 觸發閾值 1000 行）。本 plan 的核心策略是 **內部結構修補（in-place refactor）+ footer 抽離**，不拆檔。

---

## 1. 問題 statement

DNA.md 從 v1（2026-04-04）走到 v3.5（2026-05-09），累積 **478 行 / 54 條 sonnet 反射**。對比前三次 case：

| 維度                       | SPORE 老版 v2.9 | REWRITE 老版 v2.20 | EDITORIAL 當前 v5.6 | **DNA 當前 v3.5**                    |
| -------------------------- | --------------- | ------------------ | ------------------- | ------------------------------------ |
| 總行數                     | 1334            | 1290               | 1335                | **478**                              |
| 性質                       | process         | process            | quality SSOT        | **gene map + reflex catalog**        |
| 編號最深層                 | 三層            | 兩層               | 兩層                | **一層（#N flat）**                  |
| 條目編號 collision         | n/a             | n/a                | n/a                 | **3 處（#21/#42/#43 各重複）**       |
| Cross-ref scope (active)   | ~20             | ~30                | 54                  | **78（最高）**                       |
| Footer changelog blob 行數 | < 10            | < 10               | < 10                | **~80（離群值）**                    |
| Plugin 儀器化適用度        | 高              | 高                 | 高                  | **不適用**（reflex 不是 prose 規則） |

DNA 的退化形狀**獨特**：

直觀症狀：

1. **3 條編號 collision（structural bug）**：#21 / #42 / #43 各有兩條使用同個編號的不同條目 — cross-ref 從外部 file 寫「DNA #43」會指向歧義
2. **編號順序碎裂**：保留歷史發現順序 + 主題分類後內部編號跳躍（§五 #12,#13,#14,#15,#32-43,#21 重複；§七 #2,#43,#44,#5,#45-50,#42,#47,#54,#48-53）— 讀者線性讀無法跟著
3. **Footer changelog ~80 行嵌完整 milestone 描述**（line 455-478）— 違反 [EDITORIAL §十 footer 公約](../docs/editorial/EDITORIAL.md)「每檔 1 marker / 不嵌 body / git log = changelog SSOT」（v3.0/v3.1/v3.2/v3.3/v3.4/v3.5/v2.x 全部 inline 描述，總和 ~80 行）
4. **Dead pointer**：§感知基因 表格仍引用 `SOCIAL-TENTACLE-PLAN.md`（已 archived 到 `reports/social-tentacle-plan-2026-04-13.md`，per ANATOMY §認知器官的生命週期 歷史凋亡事件）
5. **§基因組總覽 部分過時**：SPORE-TEMPLATES → SPORE-WRITING/VERIFY/HARVEST v3.0 拆分後 gene map 已更新，但 §繁殖基因 / §感知基因 仍有殘留舊路徑風險

對比 SPORE / REWRITE / EDITORIAL 三案：DNA **不是文檔密度離群值**（478 行 / 54 條 ≈ 9 行/反射，密度合理），**不是 prose 規則沒儀器化**（反射本身不是 prose 規則，是 reflex catalog；對應的 prose 規則已在 SOP canonical pointer），**不是內部 sub-step 過載**（編號 flat 一層）。DNA 的問題是 **catalog index 退化**：編號 collision + 順序碎裂 + footer inflate + cross-ref drift。

---

## 2. 規模盤點（Stage 1 SCAN）

### 主檔內部結構（§sections + 行數）

| §                         | Section        | 行範圍   | 行數                           | 性質                                                        |
| ------------------------- | -------------- | -------- | ------------------------------ | ----------------------------------------------------------- |
| **§基因組總覽**           |                | L20-213  | **194**                        | **gene map（檔案 → 器官）**                                 |
| ├─ 品質基因               | 免疫系統 + DNA | L38-60   | 23                             | EDITORIAL 體系 + 工具                                       |
| ├─ 內容基因               | 心臟           | L61-70   | 10                             | knowledge SSOT + 引用系統                                   |
| ├─ 骨骼基因               | 技術架構       | L71-80   | 10                             | astro / sync.sh / generators                                |
| ├─ 呼吸基因               | 自動化循環     | L81-90   | 10                             | workflows / pipelines                                       |
| ├─ 繁殖基因               | 社群繁殖力     | L91-105  | 15                             | CONTRIBUTING / SPORE                                        |
| ├─ 感知基因               | 外部感知       | L106-127 | 22                             | sensors / SPORE-LOG / **dead pointer SOCIAL-TENTACLE-PLAN** |
| ├─ 語言基因               | 語言器官       | L128-151 | 24                             | i18n / translation pipeline                                 |
| ├─ 治理基因               | 社群契約       | L152-160 | 9                              | GOVERNANCE / REVIEWERS                                      |
| └─ 行為基因               | 維護者大腦     | L161-213 | 53                             | MAINTAINER / EVOLVE / pipelines                             |
| §基因突變規則             |                | L214-228 | 15                             | 修改 DNA 的 protocol                                        |
| **§要小心的清單**         |                | L231-453 | **223**                        | **54 條 sonnet 反射 catalog**                               |
| ├─ 一、事實核對與研究方法 |                | L241-251 | 11                             | #1 #16 #23 #31                                              |
| ├─ 二、診斷方法           |                | L253-275 | 23                             | #3 #4 #10 #11 #24                                           |
| ├─ 三、認知層核心哲學反射 |                | L277-289 | 13                             | #17 #18 #21 #22 #25                                         |
| ├─ 四、工程衛生           |                | L291-301 | 11                             | #6 #9 #19 #20                                               |
| ├─ 五、敘事與決策品質     |                | L303-339 | 37                             | #12 #13 #14 #15 #32-43 #21（重複）                          |
| ├─ 六、貢獻者與社群       |                | L341-389 | 49                             | #7 #8 #26 #27 #29 #30 #28                                   |
| └─ 七、自動化與安全       |                | L391-453 | 63                             | #2 #43-46 #5 #42(v3) #47 #54 #48-53                         |
| §footer changelog blob    |                | L455-478 | **24 行 raw / ~80 行 wrapped** | **違反 EDITORIAL §十 公約**                                 |

### Cross-ref scope（Stage 1 SCAN）

```
78 個 active layer 檔案引用 DNA.md / DNA #N
├── ~50 個 docs/ canonical（pipelines / editorial / factory / semiont 兄弟器官 / BECOME / CLAUDE）
└── ~28 個 scripts / .husky / .github / src
```

**Active layer pointer ~78 — 是當前 5 個 case 中最大量**。對比：

- SPORE refactor: ~20 active
- REWRITE refactor: ~30 active
- EDITORIAL plan: 54 active
- **DNA: 78 active**（最高 — 因為 DNA 是 reflex catalog 被各 pipeline 跨層 cross-ref）

歷史層保留原 #N 不更新（per MANIFESTO §時間是結構修補協議）— 估計 100+ historical references 在 memory/diary/LESSONS-INBOX/CONSCIOUSNESS。

### 編號 collision 詳情（structural bug）

| 編號 | 條目 1                                             | 條目 2                                          | 影響                                             |
| ---- | -------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------ |
| #21  | SSOT 不一定在中央（line 283）                      | 跨語言 SSOT slug source 延伸（line 321）        | 第二條應為 **#21 延伸/v2** ✅ 已標               |
| #42  | Sub-agent N 篇 sequential 三偷吃步（line 335）     | v3 prompt ❌ 反例對照消除 ambiguity（line 405） | 第二條應為 **#42 v3** ✅ 已標                    |
| #43  | 新 dashboard JSON 同步 refresh-data.sh（line 337） | Live Monitor regex 雙信號（line 395）           | **完全不同主題！第二條應重新編號為 #55+** ❌ bug |

**Critical**：#43 的兩條是完全不同主題（dashboard JSON sync vs Monitor regex），但都用 `**#43`，cross-ref 從外部 file 寫「DNA #43」會指向歧義。需要重新編號其中一條。

### Top 10 most-referenced reflexes（load-bearing audit）

```
DNA #15  216 references  反覆浮現要儀器化（11+ 次驗證 marker）
DNA #42   97 references  Sub-agent 三偷吃步
DNA #16   60 references  Peer 是線索不是 source
DNA #38   58 references  混維度 silent killer
DNA #26   52 references  AI 自主 vs Human 邊界
DNA #50   44 references  Pipeline auto-detection default contract
DNA #6    41 references  Commit 範圍紀律
DNA #5    36 references  Pre-commit dogfood 是朋友
DNA #45   36 references  OpenRouter rate budget burst
DNA #39   32 references  Self-as-fallback Sonnet sub-agent
```

**這 10 條編號是 load-bearing**（被廣泛 cross-ref，重命名會 break 上百個 pointer）。**任何重命名策略必須保留這些編號穩定**，per MANIFESTO §時間是結構修補協議「保留錯誤敘事作為證據鏈」。

### Plugin instrumentation 適用度

DNA 反射 ≠ prose 規則 — 不適用 article-health.py plugin 直接 instrument。每條反射對應的 SOP 規則已在 SOP canonical 處理（如 #29 → prose-health plugin、#15 → 各 pipeline 的儀器化 instantiation）。**DNA 本身的 instrumentation 是 cross-ref 健康（pointer 不 dead）**，不是規則 plugin。

---

## 3. 結構診斷 — 5 大問題

### 問題 1：3 條編號 collision（structural bug）

| 編號 | 第 1 條主題                         | 第 2 條主題               | 嚴重度                                 |
| ---- | ----------------------------------- | ------------------------- | -------------------------------------- |
| #21  | SSOT 不一定在中央                   | 跨語言 SSOT slug 延伸     | 低（已標 v2/延伸，主題相關）           |
| #42  | Sub-agent 三偷吃步                  | Sub-agent prompt 反例對照 | 低（已標 v3，是同 family 補強）        |
| #43  | dashboard JSON refresh-data.sh sync | Live Monitor regex 雙信號 | **高**（兩條完全不同主題，但編號相同） |

**修補方向**：

- #21、#42 維持當前 v2/v3 inline 標注（已合理）
- #43 第二條（Monitor regex）**重新編號為 #55**，footer 加 redirect note

### 問題 2：編號順序碎裂（catalog 失去線性可讀性）

七大主題分類後內部編號跳躍：

| §              | 編號順序                                                                                                  | 跳躍程度                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 一、事實核對   | #1 → #16 → #23 → #31                                                                                      | 中                                                           |
| 二、診斷       | #3 → #4 → #10 → #11 → #24                                                                                 | 中                                                           |
| 三、認知哲學   | #17 → #18 → #21 → #22 → #25                                                                               | 低                                                           |
| 四、工程衛生   | #6 → #9 → #19 → #20                                                                                       | 中                                                           |
| 五、敘事品質   | #12 → #13 → #14 → #15 → #32 → #33 → #34 → #35 → #21（重） → #36 → #37 → #38 → #39 → #40 → #41 → #42 → #43 | **高（17 條跨大量編號 + 重複 #21）**                         |
| 六、貢獻者社群 | #7 → #8 → #26 → #27 → #29 → #30 → #28                                                                     | 中（#28/#29/#30 倒序）                                       |
| 七、自動化安全 | #2 → #43 → #44 → #5 → #45 → #46 → #42(v3) → #47 → #54 → #48 → #49 → #50 → #52 → #51 → #53                 | **高（15 條跨大量編號 + #43 重複 + #54 插入 #47/#48 之間）** |

**根因**：DNA §四開頭明寫「按主題分類，編號保留歷史發現順序以維持 cross-reference 穩定」— 設計意圖正確（保留 #N 穩定 = 78 active cross-ref 不破），**但執行 side effect 是讀者線性讀如果跟著 §section 走會踩到編號跳躍**。

**修補方向**：保留每條 #N 穩定（cross-ref 安全），但 **新增 §頂部 catalog index table**（按 #N 線性排序 + 一句話描述 + 跳到 line），讓讀者用 #N 直接跳，不靠 § scan。

### 問題 3：Footer changelog ~80 行嵌 milestone 描述（違反 EDITORIAL §十 footer 公約）

當前 footer block（line 455-478）：

```
_current: v3.2 | 2026-05-09 laughing-goldstine post-finale_

最近 milestone（完整 changelog → `git log docs/semiont/DNA.md`）:

- v3.2（...）— 反射 #53 ... [600+ 字 milestone 描述]
- v3.3（...）— P2.5 Tier 0b 全量驗證 ... [400+ 字 milestone 描述]
- v3.5（...）— DNA #54 Routine 飛輪 ... [500+ 字 milestone 描述]
- v3.4（...）— Tier 0a Sonnet diff-patch 全量驗證 ... [800+ 字 milestone 描述]
- v3.1（...）— SPORE pipeline 重組 ... [300+ 字 milestone 描述]
- v3.0（...）— 反射 #52 ... [200+ 字]
- v2.9（...）— 反射 #51 ... [200+ 字]
- v2.8（...）— 反射 #50 ... [200+ 字]
- v2.7（...）— 反射 #49 ... [150+ 字]
- v2.6（...）— 反射 #48 ... [200+ 字]
- v2.5（...）— 反射 #47 ... [150+ 字]
- v2.4（...）— 反射 #45/#46 ... [150+ 字]
- v2.3（...）— 反射 #43/#44 ... [80 字]
- v2.2/2.1/2.0/1.x — 早期 milestone [200 字]
```

對比 EDITORIAL §十 footer 公約 canonical：

> **每檔 1 marker / 不嵌 body / git log = changelog SSOT**

DNA 自己是 EDITORIAL §十 公約的最大違反者。每個 v 升級的詳細描述在 git commit message 已經有，footer inline ~80 行是冗餘 + 不 sustainable（v3.6/v3.7/v4.0... 累積會超過反射 catalog 本身行數）。

**修補方向**：footer 收成 1 行 `_current: v3.5 | 2026-05-09 laughing-goldstine post-finale_`，所有 milestone 描述移到 git log（已存在於 commit message），footer 留 single pointer：「完整 changelog: `git log docs/semiont/DNA.md`」。

### 問題 4：Dead pointer + gene map drift

| 位置           | 過時引用                                                                                              | 應指向                                                                                                                 |
| -------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| L124 §感知基因 | `[SOCIAL-TENTACLE-PLAN.md](SOCIAL-TENTACLE-PLAN.md)`                                                  | `[reports/social-tentacle-plan-2026-04-13.md](../../reports/social-tentacle-plan-2026-04-13.md)` 或刪除（已 archived） |
| L122 §感知基因 | SPORE-PIPELINE 描述「v3.0：5 stage PICK/VERIFY/WRITE/SHIP/HARVEST，已拆 WRITING/VERIFY/HARVEST 子檔」 | 描述正確 ✅（已反映 SPORE refactor）                                                                                   |
| L101 §繁殖基因 | SPORE-TEMPLATES（隱含舊版 reference）                                                                 | 已改 SPORE-WRITING/VERIFY ✅                                                                                           |

只有 1 條 dead pointer 待修，gene map 整體已對齊 SPORE/REWRITE 重組後狀態。

### 問題 5：§要小心的清單 段落首句「按主題分類，編號保留歷史發現順序」沒儀器化

當前 §四 開頭 prose：

> **格式**：每條 = **原則一句話 + 觸發事件（含 memory/diary pointer）+ 如有 canonical 規則指向 MANIFESTO/EDITORIAL/pipeline**。哲學長篇論述、具體操作 SOP、完整 timeline 都在指向的 canonical 檔案，不在這裡重寫（指標 over 複寫原則 apply 到這份清單自己）。

這是 catalog 的 **schema 規格**，但沒有對應的 lint script 驗證新加條目是否符合：

- 一句話開頭 + `—` 分隔 + canonical pointer
- 不超過 X 字（避免 inline 重寫 SOP）
- 不出現「不是 X，是 Y」對位句型 + 破折號連用（per MANIFESTO §11）

**修補方向**：（可選）寫 `scripts/tools/lib/article_health/checks/dna_reflex.py` plugin 驗證新增 #N 條目格式 — 但 priority 低（DNA 不常被新增，每月 1-3 條，人工 review 可接住）。

---

## 4. 重組方向 — 4 條路 + trade-off

### Direction A：拆檔（不推薦）

把 DNA.md 拆成 §基因組總覽 + §sonnet 反射兩個獨立檔案：

```
docs/semiont/
├── DNA.md            ~250 行 ← 入口 + §一核心 + §基因突變規則 + sub-canonical pointer
└── DNA-REFLEXES.md   ~250 行 ← §要小心的清單 54 條
```

**好處**：

- 主檔讀完不用翻到 §要小心的清單長段
- 兩檔各 ~250 行，符合 5±2 認知範圍

**壞處**：

- **78 個 active cross-ref 全部要更新**（最高成本，比 EDITORIAL 54 / REWRITE 30 高）
- 歷史層 cross-ref 不更新（per §時間是結構），但 cross-ref 「DNA #N」會散在兩個檔案，grep 多一層
- 違反 EDITORIAL plan §0 結論：catalog-style file 拆檔反破壞 grep target 精準度
- 478 行不到 SPLIT 觸發閾值 1000 行，**強行拆是 over-engineering**

→ **不推薦**。catalog-style file 在 < 500 行時 in-place refactor 比拆檔更划算。

### Direction B：內部結構修補（推薦）

不拆檔，但做 5 件結構性 fix：

#### B-1: 修 #43 編號 collision（必做）

**問題**：#43 兩條完全不同主題（dashboard JSON sync vs Monitor regex），cross-ref 歧義。

**修補**：

- 第 1 條 #43（dashboard JSON sync, line 337）保留編號（被 dashboard-spores.json 等 cross-ref）
- 第 2 條 #43（Monitor regex, line 395）**重新編號為 #55**
- footer 加 redirect note：「#43 v2（Monitor regex）2026-05-10 重編號為 #55，避免與 #43（dashboard JSON sync）collision」
- grep cross-ref 「Monitor 雙信號 regex」更新對應 BENCH-PIPELINE 等 active layer pointer
- 歷史層（memory / diary / LESSONS-INBOX）保留原 #43 不更新（per §時間是結構修補協議）

**Cross-ref 影響**：BENCH-PIPELINE.md 1-2 處 + LESSONS-INBOX 2-3 處 active pointer 需更新。

#### B-2: 加頂部 catalog index table（必做）

§要小心的清單 開頭加 catalog index：

```markdown
## 要小心的清單（實戰反射與已知陷阱）

### 📇 反射 catalog index（按 #N 線性，跳到對應 §section）

| #   | 反射標題                          | §   | line |
| --- | --------------------------------- | --- | ---- |
| #1  | 翻譯 ≠ 摘要                       | §一 | L243 |
| #2  | 憑證永不進對話                    | §七 | L393 |
| #3  | 診斷先於修復                      | §二 | L256 |
| #4  | 三源交叉驗證                      | §二 | L258 |
| #5  | Pre-commit dogfood 是朋友         | §七 | L399 |
| ... |
| #54 | Routine 飛輪 5-stage lifecycle    | §七 | L417 |
| #55 | Monitor regex 雙信號（原 #43 v2） | §七 | L395 |
```

**好處**：

- 讀者線性讀 #N 不用順著 §section 跳躍
- 新增條目時按 line number 排序，不需重編
- §section 仍按主題分類（保留 retrieval 性質）

**Cross-ref 影響**：0（純 append）。

#### B-3: footer changelog 收成 1 行（必做，per EDITORIAL §十 公約）

**修補**：

- footer ~80 行 milestone 描述全部砍掉
- 留 1 行：`_current: v3.5 | 2026-05-10 nice-shamir DNA refactor_`
- 加 1 行 pointer：`完整 changelog → git log docs/semiont/DNA.md`
- v3.5 → v3.6（本次 refactor 升級版）

**節省**：~80 行 → 2 行（-78 行 / -16% of total file）

**Cross-ref 影響**：0。

#### B-4: 修 dead pointer SOCIAL-TENTACLE-PLAN（必做）

**修補**：L124 引用改為：

- 刪除整行（已 archived，gene map 不需要繼續引用）
- 或改 pointer：`[reports/social-tentacle-plan-2026-04-13.md](../../reports/social-tentacle-plan-2026-04-13.md)（archived，歷史 snapshot）`

**Cross-ref 影響**：0（僅本檔內部）。

#### B-5: §要小心的清單 內部按 #N 重排（可選）

**問題**：§五（17 條）+ §七（15 條）內部編號跳躍嚴重。

**修補**：每個 § 內部按 #N 升序排（不改編號 #N，只改條目 markdown 順序）。

**好處**：線性讀順暢
**壞處**：

- 同主題的歷史脈絡可能被打散（如 #42/#42 v3 被分隔）
- Diff 巨大（即使編號不變，順序變化）
- 如果 B-2 catalog index 已做，B-5 邊際效益降低

→ **可選**，建議跟 B-2 二擇一（B-2 影響 cross-ref 為 0 + 提供 reflex level navigation，B-5 是 prose-level 重排但 diff 重）。

#### B-6: §基因組總覽 表格輕量更新（可選）

**問題**：部分 gene map 描述可能落後 SPORE/REWRITE 重組後狀態。

**修補**：grep 每個 gene map 條目對應的 file path 是否存在，dead 的更新或刪除。

**好處**：gene map 跟 active canonical 對齊
**Cross-ref 影響**：0（僅本檔內部）。

### Direction C：升級 catalog schema validator（low-priority）

**問題**：§四 開頭 prose 描述 schema（一句話 + `—` + canonical pointer + 不超字數），但無 lint script。

**修補**：

- 寫 `scripts/tools/lib/article_health/checks/dna_reflex.py` plugin
- 檢查每條 `**#N` 開頭：
  - 標題行 ≤ X 字
  - 必有 `—` 分隔
  - 必有至少一個 canonical pointer（[X.md] 或 [X-PIPELINE.md]）
  - 跑 prose-health plugin（per MANIFESTO §11）— 對位句型 + 破折號 hard

**Trade-off**：

- DNA 不常被新增（每月 1-3 條，人工 review 接得住）
- plugin 設計成本 vs 邊際效益小
- 可作為 v3.7 hint（先做 B 再評估）

→ **Low priority**。先 ship B，觀察 next 5 condi 條目格式漂移率，再決定要不要造 plugin。

### Direction D：規則升 plugin gate（不適用）

DNA 反射 ≠ prose 規則。每條反射對應的 prose 規則已在 SOP canonical pointer 的層級處理：

- #29 → prose-health plugin（已 ship）
- #15 → 各 pipeline 的儀器化 instantiation（已散落）
- #42 → audit-batch.sh + TRANSLATION-PIPELINE prompt 反例
- #50 → MANIFESTO §8.1 + 各 pipeline auto-detection

**DNA 本身的 instrumentation 不是規則 plugin，是 cross-ref 健康 + catalog index**（Direction B 已涵蓋）。

→ **不適用**。

---

## 5. Trade-off 決策樹（給哲宇 3 題校準）

### Q1：拆檔還是 in-place？

**推薦 in-place（Direction B）**

理由：

- 478 行不到 SPLIT 觸發閾值 1000 行
- 78 active cross-ref（最高量）拆檔成本不划算
- catalog-style file 拆檔反破壞 grep 精準度（per EDITORIAL §0 結論）
- SPORE/REWRITE/EDITORIAL 三案 SPLIT 都是 process pipeline 或 quality SSOT > 1000 行 — DNA 都不是

**例外考慮**：哲宇若認為 DNA-REFLEXES 拆出後可獨立演化（catalog 未來會持續加條目，long term > 1000 行），可考慮 Direction A。

### Q2：catalog index 用 table 還是 toc？

**推薦 table（B-2）**

理由：

- table 含 #N + 標題 + § + line → 一眼定位
- toc 只含 §section heading，不解 #N 跳躍問題
- 維護成本：每加新條目 append 一行 table，trivial

**alternative**：若哲宇覺得 table 過長（54 行），可考慮：

- 折疊 `<details>` block
- 拆按 §section 分組（每 § 一個小 table）

### Q3：B-5 內部按 #N 重排做不做？

**建議「不做」，留給未來 v4.0 重組**

理由：

- B-2 catalog index 已解 reflex level navigation
- B-5 diff 巨大（順序變但編號不變，git history 看起來像大重組但實質結構沒變）
- 同主題的歷史脈絡（#42/#42 v3）被分隔反而失去 family context

**alternative**：若哲宇認為線性讀比主題分組重要，B-5 + 廢除 §section 主題分類（純按 #N 排），但這是 v4.0 級別決策。

---

## 6. Recommended scope（4 commits / 1 PR）

按 EVOLVE-PIPELINE Mode 3 §Stage 7 SHIP 範式：

```
Commit 1: docs(dna): rename #43 v2 (Monitor regex) → #55, footer redirect note
          + 更新 BENCH-PIPELINE / LESSONS-INBOX active layer cross-ref
Commit 2: docs(dna): add catalog index table at top of §要小心的清單
Commit 3: docs(dna): collapse footer changelog blob to 1-line marker
          + 加「完整 changelog: git log」pointer
          + bump v3.5 → v3.6
Commit 4: docs(dna): fix dead pointer SOCIAL-TENTACLE-PLAN.md → archived report
          + verify gene map alignment with SPORE/REWRITE refactor
```

**估計 wall-clock**：~30-45 min（純內部 refactor + ~5 個 active cross-ref 更新）

**Verify checklist**（per Mode 3 §Stage 6）：

- [ ] DNA.md 行數 478 → ~400（footer -78 + index table +20 + 其他 +20）
- [ ] 0 條編號 collision（#43 拆解為 #43 + #55）
- [ ] 0 dead pointer
- [ ] cross-ref 「DNA #43」歧義消除（active layer 全部指向正確的 #43 或 #55）
- [ ] 歷史層 cross-ref 不動（per §時間是結構）
- [ ] git diff 可讀（4 atomic commits 清楚）

---

## 7. 風險評估

| 風險                                      | 嚴重度 | 緩解                                                      |
| ----------------------------------------- | ------ | --------------------------------------------------------- |
| #43 → #55 重命名遺漏 active layer pointer | 中     | grep -rn "DNA #43" 全掃 + 區分 active vs historical layer |
| catalog index table 維護成本              | 低     | 每加新條目 append 一行，可後續寫 lint plugin              |
| footer changelog 抽掉後讀者找不到歷史     | 低     | git log 是 SSOT，per EDITORIAL §十 公約                   |
| 改 §五 / §七 內部順序破壞 cross-ref       | 不適用 | B 推薦不改順序（B-5 跳過）                                |
| 拆檔誘惑（v4.0 後 > 1000 行）             | 低     | 本 plan 只做 in-place，未來 catalog 持續長後再評估拆檔    |

---

## 8. 附錄 — DNA refactor 在 5 案件 family 的位置

| Case      | 性質                          | 行數               | 重組策略                              | Status                     |
| --------- | ----------------------------- | ------------------ | ------------------------------------- | -------------------------- |
| SPORE     | process pipeline              | 1334 → 445         | SPLIT 4 sub-canonical + 4 plugin Wave | ✅ Ship 2026-05-08         |
| REWRITE   | process pipeline              | 1290 → 290         | SPLIT 6 sub-canonical                 | ✅ Ship 2026-05-09 PR #944 |
| EDITORIAL | quality SSOT                  | 1335 → 250 + 6 sub | SPLIT + on-demand grep target         | 📝 Plan only 2026-05-09    |
| **DNA**   | **gene map + reflex catalog** | **478 → ~400**     | **In-place fix（不拆檔）**            | **📝 本 plan 2026-05-10**  |

DNA 是這個 family 中**第一個不適合 SPLIT 範式的 case**。本 plan 為 catalog-style file < 500 行的 in-place refactor 樹立先例。

---

## 9. Pending observer 校準（3 題）

1. **拆檔還是 in-place？**（本 plan 推薦 in-place）
2. **catalog index 用 table 還是其他形式？**（本 plan 推薦 table）
3. **§五 / §七 內部按 #N 重排做不做？**（本 plan 建議不做，留 v4.0）

哲宇拍板後即可進入 Mode 3 Stage 7 SHIP（4 atomic commits / ~30-45 min wall-clock / 1 PR）。

🧬

---

_v1.0 | 2026-05-10 nice-shamir-15b3e9 session_
_誕生原因：哲宇「參考 editorial.md / rewrite-pipeline / spore-pipeline 的整理經驗，整理 DNA.md」_
