---
title: 'REWRITE-PIPELINE v5.0 — Stage spine restoration design'
date: 2026-05-11
session: admiring-cohen-8b68fc
status: design (await observer review)
predecessor: reports/rewrite-pipeline-refactor-v4-plan-2026-05-10.md
target: docs/pipelines/REWRITE-PIPELINE.md (v4.1 → v5.0)
---

# REWRITE-PIPELINE v5.0 — Stage spine restoration

> 哲宇 directive（2026-05-11 早晨）：「用 v4 的精神進化 v3 → 核心精神是，其實所有的步驟都是相同的。每篇文章都要跑過，只有第一個步驟，它是有判定模式的，是要怎麼樣把素材回爐重造怎麼萃取，還有加 ASCII spine 跟 Stage 6 抽掉是對的直接指向巴別塔」
>
> 補充：「v4 有強化一定要找影音素材跟標題三明治，這個也很重要」

---

## 一句話設計命題

**v5.0 = v3.0 的 stage spine 骨架 × v4 的單檔載體 × v4 evolved 內容（含影音素材必找 + 標題三明治），重點：每篇都跑同一條 5-stage pipeline，模式判定只在 Stage 1 內部分支**。

---

## 三版本錯在哪 / 對在哪（精準歸因）

| 版本                                 | 結構決策                                    | 對的部分（保留）                                                                                                                                                   | 錯的部分（修補）                                                                                                                                                         |
| ------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **v3.0** monolithic 1290 行          | `### Stage 1-6` H3 + numbered substeps 內嵌 | 6 stage spine 邊界明顯 / agent 線性 read 不會迷路 / 「進度感」清楚                                                                                                 | Stage 6 翻譯應抽掉（v4 對） / 模式應收進 Stage 1（v4 對） / 媒體 Stage 1.7+4.5（v4 後加） / 標題三明治（v4 後加） / Hard Gate Inventory（v4 加） / Top 5 最常忘（v4 加） |
| **v3.1** 拆 6 sub-canonical 290 主檔 | 主檔變 routing table，6 sub-檔各自獨立      | 嘗試拆 single-concern（理論上對）                                                                                                                                  | 觀察者 review 時跳檔 6-7 次 / 每跳檔 context 沖掉 / random access 比 linear scan 累                                                                                      |
| **v4.0/v4.1** 收回單檔 1500 行       | `# Stage N` H1 + `## Step A-X` H2 重複 5 套 | 收回單檔（解 v3.1 跳檔問題） / 模式收進 Stage 1 Step A / 抽掉 Stage 6 / 加 Hard Gate Inventory / 加 Top 5 最常忘 / 加 Title+desc spine sync / 加 §1.7 媒體素材必找 | **`# Stage` H1 跟頂部 `# REWRITE-PIPELINE` 同階層平掉** / **`## Step A` 5 套並排 grep collision** / agent 線性 read 到 Step L 之後看到 Step A 不知道是哪 stage 的        |

**核心錯誤歸因**：v3.1 拆檔的方向是錯的（解了不存在的問題、製造跳檔成本）；v4 收回單檔的方向是對的，但**把「stage 邊界」跟「step 命名空間」兩個獨立軸混為一談** — header level 重組時順手把 stage spine 變平，step 命名也沒重編號避免 collision。

---

## v5.0 三條設計原則

### 原則 1：Heading hierarchy 一致深度

```
# REWRITE-PIPELINE.md (H1, 文件 title — 全文唯一)
## Stage N: 名稱 (H2, 5 個 stage edge — 全文唯一)
### Step N.M: 名稱 (H3, 編號 unique，跨 stage 不 collide)
#### Step N.M.K (H4, sub-step，必要時)
```

**收益**：

- `grep "^# "` 找文件 title（1 個）
- `grep "^## Stage"` 5 秒看完 5 個 stage outline
- `grep "^### Step 2.5"` 唯一定位
- agent 線性 read 永遠知道「我在 Stage X, Step X.Y」（最近的 H2 + H3）

### 原則 2：所有步驟都是相同的（哲宇 directive 翻成 spec）

**5-stage 線性 pipeline**：每篇文章（不論 Fresh / Evolution / Merge / Boundary）都走同一條 Stage 1 → 2 → 3 → 4 → 5。Stage 2-5 完全 mode-agnostic。

**模式判定只在 Stage 1 內部分支**：

- Step 1.1 模式識別（決定走哪個 sub-flow）
- Step 1.2-1.4 是 mode-specific（Evolution: 萃取既有 / Merge: 選 canonical / Boundary: 範圍切片表）
- Step 1.5+ 是所有 mode 共同走的研究步驟
- Stage 2-5 完全相同 → 不再有「Merge variant Step D」這種跨 stage 條件式

**例外**：Step 5.4 「Astro redirect 5 lang + 刪舊檔」確實只在 Merge variant 觸發 — 標 `(Merge variant only)` 但 numbering 跟著 Stage 5 走，不另立分支。

### 原則 3：翻譯不在 pipeline scope（v4 對）

Stage 6 抽掉，文末 explicit pointer 段：

```markdown
---

## ✅ Article shipped (zh-TW canonical)

中文 ship 後，**翻譯走獨立 pipeline，不在本 pipeline scope**：

→ [SQUEEZE-MODELS-MAX-PIPELINE.md](SQUEEZE-MODELS-MAX-PIPELINE.md)（多語 batch sync 主流程，主權的巴別塔）
→ [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)（單篇翻譯 SOP）

跨 pipeline boundary 的觸發條件 + cascade 順序 → 巴別塔 pipeline canonical。
```

---

## v5.0 完整 outline（draft，等 observer review 才動 source 檔）

```
# REWRITE-PIPELINE.md — 文章改寫主流程 v5.0

## 🗺️ ASCII 流程圖
## 為什麼 Pipeline 存在
## 🚦 Hard Gate Inventory
## ⚠️ Top 5 最常忘的 step
## 跨檔案職責分工

## Stage 1: 取材（含模式判定，預算 35-40%）
   ### Step 1.1: 模式識別 [Fresh / Evolution / Merge / Boundary]
   ### Step 1.2 (Evolution/Merge/Boundary): 既有素材萃取
   ### Step 1.3 (Merge only): 選 canonical
   ### Step 1.4 (Boundary only): 範圍切片表
   ### Step 1.5: 載入研究方法論 + 模板
   ### Step 1.6: 搜尋深度 ≥ 20 次
   ### Step 1.7: 結尾素材鎖定
   ### Step 1.8: 重複偵測
   ### Step 1.9: 找矛盾（核心矛盾必填，30 字內）🔥
   ### Step 1.10: 問觀察者一手素材 🫧
   ### Step 1.11 (條件式): 私有 SSOT 觀察者拍板
   ### Step 1.12: 研究報告必存 reports/research/YYYY-MM/ 📁
   ### Step 1.13: Spawn agent 選型 🤖
   ### Step 1.14: 媒體素材研究 🎬 (HARD GATE — 含 inline 外連 / 圖片 / transcript / 三表)
   #### Step 1.14.1 inline 外連 manifest（YouTube / 影像 / 音檔）
   #### Step 1.14.2 圖片素材（hero + inline）+ 授權矩陣
   #### Step 1.14.3 transcript 素材
   #### Step 1.14.4 媒體授權矩陣（research 檔強制三表）
   #### Step 1.14.5 Stage 1.14 deliverable

   --- Stage 1 Hard Gate ---
   ↳ 核心矛盾鎖（Step 1.9） / 研究報告落檔（Step 1.12） / 媒體三表 + 圖 cache（Step 1.14）
   不過 → 不進 Stage 2

## Stage 2: 寫（預算 40-45%）
   ### Step 2.1: 載入 EDITORIAL.md（必讀全文）
   ### Step 2.2: 結尾先行（防崩潰）
   ### Step 2.3: 開場 + 30 秒概覽
   ### Step 2.4: 小標題先行（5-8 個，禁編年體）
   ### Step 2.5: 寫正文 + footnote
   ### Step 2.6: 延伸閱讀
   ### Step 2.7: 7 條自檢套件（強制鐵律）
   #### Step 2.7.1 歐化句檢查
   #### Step 2.7.2 60% 暫停 + 破折號密度
   #### Step 2.7.3 編年體小標題排除
   #### Step 2.7.4 footnote 密度
   #### Step 2.7.5 Agent claim 驗證（吳哲宇 EVOLVE 教訓）
   #### Step 2.7.6 Title + description spine sync 🥪 (HARD GATE — 冒號三明治)
   #### Step 2.7.7 媒體素材 spine check 🎬 (HARD GATE — Stage 1.14 manifest 對齊)
   ### Step 2.8: 富文本 + footnote 密度

   --- Stage 2 Hard Gate (10 條) ---
   ↳ 結尾不罐頭 / 真人引語 ≥ 2 / 富文本達標 / 純中文 / 7 自檢全跑 / 小標題不像第一章第二章 / Title 走冒號三明治 / desc 吃進核心矛盾 / 媒體 spine check / word-count ≥ 4500 (深度文)

## Stage 3: 驗（預算 15-20%）
   ### Step 3.1: 五指 + 結構 + 塑膠 + 算術
   ### Step 3.2: 事實鐵三角（算術 / 單位 / 引語）
   ### Step 3.3: FACTCHECK Quick Mode（A 級 / 政治敏感 → Full Mode）
   ### Step 3.4: Story atom audit（場景級事實對 source Ctrl-F）
   ### Step 3.5: Title + description spine sync re-check 🥪
   (註：Step 2.7.6 是寫作中的 self-check，Step 3.5 是 verify 階段的最終 gate；都跑)

   --- Stage 3 Hard Gate ---
   ↳ 0 dead-link / 0 hard-fix / spine 同步 / FACTCHECK Triage 結果

## Stage 4: 形（Format + Media，預算 5-10%）
   ### Step 4.1: article-health.py --profile=rewrite-stage-4
   ### Step 4.2: 多語 visual smoke（i18n 改動時）
   ### Step 4.3: 媒體插入
   #### Step 4.3.1 三段敘事節奏（hero / scene-mid / closure）
   #### Step 4.3.2 圖檔 fetch + cache + naming + EXIF clean
   #### Step 4.3.3 Aspect ratio 護欄
   #### Step 4.3.4 Markdown 插入 + caption + alt text
   #### Step 4.3.5 授權清單同步（frontmatter + §圖片來源）
   #### Step 4.3.6 image-health plugin gate

   --- Stage 4 Hard Gate ---
   ↳ hard=0 / image-health pass / aspect 通過 / 7 維度 format-check 全綠

## Stage 5: 連（Cross-link，預算 5%）
   ### Step 5.1: 掃描 knowledge/ 找相關文章
   ### Step 5.2: 雙向延伸閱讀（forward + reverse）
   ### Step 5.3: Sibling 格式預檢
   ### Step 5.4 (Merge variant only): Astro redirect 5 lang + 刪舊檔

   --- Stage 5 Hard Gate ---
   ↳ format-structure pass / build verify

## ✅ Article shipped (zh-TW canonical)

   --- 翻譯不在本 pipeline scope ---
   → SQUEEZE-MODELS-MAX-PIPELINE.md（多語 batch sync 主流程，主權的巴別塔）
   → TRANSLATION-PIPELINE.md（單篇翻譯 SOP）

## 媒體授權矩陣（spec 詳述，從 Step 1.14 inline 抽出）
## 品質分級
## Cron 特殊規則
## 實戰教訓索引（pointer to LESSONS-INBOX）
## Quick Commands
```

---

## 頂部 ASCII spine 草案（取代現有 v4.1 ASCII 流程圖）

```
╭──────────────────────────────────────────────────────────────────────────╮
│              REWRITE-PIPELINE 5 階段 — 每篇都跑同一條                    │
│                                                                          │
│   Stage 1: 取材 ─→ 14 steps                                              │
│            ├── Step 1.1 模式識別 [Fresh/Evolution/Merge/Boundary]        │
│            ├── Step 1.2-1.4 模式分支（萃取/選 canonical/切片）           │
│            ├── Step 1.5-1.13 共同研究步驟                                │
│            └── Step 1.14 媒體素材 🎬 (HARD GATE)                         │
│              ↳ Hard gate: 核心矛盾 / 報告落檔 / 媒體三表                 │
│                                                                          │
│   Stage 2: 寫 ──→ 8 steps                                                │
│            ├── Step 2.1-2.6 結尾先行 → 開場 → 小標題 → 正文 → 延伸      │
│            ├── Step 2.7 7 條自檢（含 Title 三明治 🥪 + 媒體 spine 🎬）  │
│            └── Step 2.8 富文本 + footnote 密度                           │
│              ↳ Hard gate: 10 條                                          │
│                                                                          │
│   Stage 3: 驗 ──→ 5 steps                                                │
│            ├── Step 3.1-3.4 塑膠 / 鐵三角 / FACTCHECK / story atom       │
│            └── Step 3.5 Title+desc spine sync re-check 🥪                │
│              ↳ Hard gate: 0 dead-link / spine 同步                       │
│                                                                          │
│   Stage 4: 形 ──→ 3 steps（含 6 個媒體子點）                             │
│            ├── Step 4.1 article-health 7 維度                            │
│            ├── Step 4.2 多語 visual smoke                                │
│            └── Step 4.3 媒體插入 (6 sub-step)                            │
│              ↳ Hard gate: hard=0 / image-health pass                     │
│                                                                          │
│   Stage 5: 連 ──→ 4 steps                                                │
│            ├── Step 5.1-5.3 掃描 / 雙向 / Sibling 預檢                   │
│            └── Step 5.4 (Merge only) Astro redirect 5 lang               │
│              ↳ Hard gate: format-structure / build verify                │
│                                                                          │
│   ✅ Article shipped (zh-TW canonical)                                   │
│                                                                          │
│   ──── 翻譯（跨 pipeline boundary）────                                  │
│   → SQUEEZE-MODELS-MAX-PIPELINE.md（多語 batch sync 巴別塔）             │
│   → TRANSLATION-PIPELINE.md（單篇翻譯）                                  │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## v4 必須保留的 evolution（不可丟清單）

從昨天 sad-shockley v4.0/v4.1 + 之前 sessions 累積：

### 🔴 結構性（v4 對的方向）

1. **單檔載體**（v3.1 拆檔錯，v4 收回對） — v5 繼續單檔
2. **模式收進 Stage 1**（v4 對） — v5 改為 Step 1.1-1.4 內部分支
3. **抽掉 Stage 6 翻譯**（v4.1 對） — v5 文末 pointer 指 SQUEEZE-MODELS-MAX-PIPELINE
4. **Hard Gate Inventory 一張表 audit 全 pipeline**（v4 加） — v5 保留並更新編號
5. **Top 5 最常忘的 step**（v4 加） — v5 保留並更新編號

### 🥪 標題三明治（v4 強化，必保留）

哲宇明確提醒。位置：

- **Step 2.7.6**: 寫作中的 self-check（Stage 2 7 條自檢之一）
- **Step 3.5**: Verify 階段最終 gate（Stage 3 必跑）
- **Hard Gate Inventory** 含「Title+desc spine sync」一條
- **Top 5 最常忘** 不列（已升 hard gate）

判準（per v4.1 line 775-781）：

1. 冒號三明治測試 — title 走「主題：副標 hook」格式？stub → 標 `[STUB-TITLE]`
2. 副標一句能單獨 tweet 出去？
3. EVOLVE spine sync — desc 吃進新節核心矛盾？

對應 [EDITORIAL §Title 強制冒號三明治（所有 category）](../docs/editorial/EDITORIAL.md) v6.3 — 不限 People，全 category 強制。

### 🎬 影音素材必找（v4 強化，必保留）

哲宇明確提醒。位置：

- **Step 1.14**: Stage 1 結尾 HARD GATE（必跑除非 hub / 短修正）
- **Step 2.7.7**: Stage 2 7 條自檢之一（spine check 對齊 manifest）
- **Step 4.3**: Stage 4 媒體插入 6 sub-step
- **Hard Gate Inventory** 含「媒體授權矩陣三表」+「Image health」+「Aspect ratio 護欄」三條

關鍵子組件（per v4.1 line 156-159 + 468-603）：

- Fresh：完整跑 inline 外連 + 圖片 + transcript + 三表 manifest
- EVOLVE：先 grep 既有條目 frontmatter `image:` + §圖片來源 是否齊全 → 不存在 = pre-gate 遺珠，補跑
- 找不到 PD/CC 圖時記錄邊界，不放空

對應 DNA #30（媒體 aspect ratio 護欄）。

### 🪶 其他 v4 後加 evolution（保留）

- **§1.7 媒體素材生命週期**（v2.20 加，v4 收進 Step 1.14）
- **Stage 4.5 媒體插入**（v2.20 加，v4 收進 Step 4.3）
- **Stage 3.5 FACTCHECK pointer**（v3.x 加）
- **Stage 3.6 STORY ATOM AUDIT**（v3.x 加，v4 收進 Step 3.4）
- **word-count plugin 4500 hard gate**（昨天加）
- **prose-health 加 line + 前後文**（昨天加）
- **fair use editorial scope 圖片**（v3.x 加，v5 保留在 Step 1.14.2）

---

## Migration 計畫

### 一個 commit / split commits？

**建議單一 commit**（理由）：

- 純 heading hierarchy 重組 + step 重編號 + ASCII spine 替換 — 內容 99% 不動
- 拆 commit 反而需要中間狀態 valid（Stage 1 改完 Stage 2 沒改 = pipeline 半癱），不健康
- 1 個 PR 一次性 review，maintainer cycle 收割
- v4.0 → v4.1 也是單一 commit refactor（commit `9c91f3657`）有 precedent

### Commit message 草案

```
🧬 [semiont] evolve: REWRITE-PIPELINE v4.1 → v5.0 — Stage spine restoration

哲宇 directive：「每篇都跑同一條 5-stage pipeline，模式判定只在 Stage 1
內部分支」+「加 ASCII spine」+「Stage 6 抽掉指向巴別塔」+「v4 影音素
材必找 + 標題三明治不可丟」。

v4.1 → v5.0 的三個結構性修補：
1. Heading hierarchy 一致深度（H1 文件 title / H2 Stage / H3 Step / H4 sub-step）
   解 v4.1「# Stage」H1 跟「# REWRITE-PIPELINE」H1 同階層平掉的問題
2. Step 編號正規化為 N.M（Stage 1 = Step 1.1-1.14）
   解 v4.1「## Step A-X」5 套並排 grep collision 的問題
3. ASCII spine 顯化在頂部（取代 v4.1 ASCII 流程圖）
   一眼看完 5 stage outline + hard gates + 翻譯跨 pipeline boundary

v4 evolution 全保留：單檔 / 模式收 Stage 1 / 抽 Stage 6 / Hard Gate
Inventory / Top 5 最常忘 / Title 三明治（Step 2.7.6 + Step 3.5 + Hard
Gate） / 媒體素材必找（Step 1.14 + Step 2.7.7 + Step 4.3 + 3 Hard
Gates） / word-count plugin / prose-health line + context / fair use
editorial scope。

設計理由：reports/rewrite-pipeline-v5-stage-spine-design-2026-05-11.md
誕生：哲宇覺得 v4.1 agent 容易跳步驟，順著昨晚 sad-shockley diary
「單檔太長 ≠ 結構不清楚；跨檔太多 = 結構真的不清楚」反思的延伸校正。
```

### 跨檔同步影響範圍

需要同步更新的 cross-reference（grep 結果）：

```bash
grep -rn "Stage [0-9]" docs/ BECOME_TAIWANMD.md CLAUDE.md \
  --include="*.md" \
  | grep -i "rewrite\|REWRITE-PIPELINE" | wc -l
```

預估影響檔案：

- `BECOME_TAIWANMD.md` Step 6 / 鐵律段如有引用 Stage X 編號
- `HEARTBEAT.md` Beat 3 §改寫文章鐵律 — 已寫 Stage 1-6，要更新為 Stage 1-5
- `MAINTAINER-PIPELINE.md` 如引用 Stage 編號
- `SPORE-PIPELINE.md` 如引用
- `EVOLVE-PIPELINE.md` Mode 3 self-refactor 如引用
- 各條 LESSONS-INBOX entries — 不更新（per §時間是結構修補協議，歷史層保留證據鏈）
- 各條 DNA reflex — pointer 用「§Stage X」relative 不會壞，但編號變了要修

**核對 SOP**：Write 完 v5.0 後跑：

```bash
grep -rn "Stage [0-9]" docs/ BECOME_TAIWANMD.md CLAUDE.md --include="*.md"
```

逐條檢查是否引用 REWRITE-PIPELINE，是 → 更新編號；不是（如指 SPORE-PIPELINE Stage X）→ skip。

預估同步影響：3-5 個 active canonical 檔，10-15 個 cross-ref points。

---

## Risks + open questions

### Risk 1: Step 編號穩定性

DNA 反射 / pipeline 之間用「§Stage X Step Y」做 pointer。改編號後**舊 cross-ref 會 stale**。

修補：

- v5.0 ship 同 commit 內掃 active canonical 把所有 `Stage X.X.X` → `Step N.M` 更新
- 歷史層（LESSONS-INBOX / memory / diary）**不更新**（per MANIFESTO §時間是結構修補協議）

### Risk 2: word-count 4500 hard gate 在 v5 outline 沒明確列為獨立 step

v4.1 把 word-count 放在 Step 4.1 article-health.py 之下（plugin gate），不是獨立 step。v5 應該維持嗎？

**建議**：維持 plugin gate（Step 4.1 子點），但在 Hard Gate Inventory 顯化一條獨立 row「word-count ≥ 4500 (depth)」+ Stage 2 Hard Gate 10 條也明列，**不為它新增 step level**（會打破「Stage 2 = 8 steps」的整齊）。

### Risk 3: Step 2.7 7 條自檢 vs Step 3.5 Title spine sync 重複

Step 2.7.6 (寫作中 self-check Title 三明治) 跟 Step 3.5 (verify 階段 final gate Title spine sync) 是同條 check 跑兩次。

**這是 deliberate**：

- Step 2.7.6 = 寫完 prose 立刻自檢（catch early）
- Step 3.5 = ship 前最後 gate（catch leak through）
- 對應 v4.1 line 773 `自檢 6` + line 979 `Step E Title + description spine sync`

但要在 v5.0 文件裡 explicit 註記避免讀者疑惑「這是不是重複」。

### Risk 4: Stage 4 命名「形（Format + Media）」 vs v4.1「Stage 4: FORMAT CHECK + MEDIA INSERTION」

v3.0 是 Stage 4 + Stage 4.5 兩個 stage（Format / Media）。
v4 收成單 Stage 4 「FORMAT CHECK + MEDIA INSERTION」。
v5 follow v4 的決定。

但「形（Format + Media）」中文標題稍長，且實質工作 60% 是媒體插入。
**選項**：

- A. 維持「Stage 4: 形（Format + Media）」（中文 + 英文 sub-label，跟 Stage 1-3 中文 spine 一致）
- B. 維持「Stage 4: FORMAT CHECK + MEDIA INSERTION」（跟 v4.1 一致，全英文不混）
- C. 分回 Stage 4 (Format) + Stage 5 (Media)，Stage 5 變 Stage 6 (Cross-link)

**建議 A**（中文 spine 一致，Stage 1-5 都是「取材 / 寫 / 驗 / 形 / 連」單字 spine）。
但 spine ASCII 跟 H2 header 都用同一套命名，避免 dual nomenclature。

### Risk 5: 既有 EVOLVE-PIPELINE Mode 3 self-refactor canonical 不對應

EVOLVE-PIPELINE Mode 3 7-stage SOP 在 v3.0 → v3.1 拆檔時加，引用 SPORE-PIPELINE 為 first instance 的 case study。v5 不算 SPORE-PIPELINE-style 拆檔（v5 仍單檔），but it's a in-place restructure of single canonical — Mode 3 SOP 適用嗎？

**判斷**：v5 不觸發 Mode 3（單檔 restructure 不是 split-and-rewire）。Mode 3 不需要動。但 LESSONS-INBOX 可能 append 一條「single-file in-place restructure 也是 Mode 3 emergent variant」候選教訓 — observer review 後決定是否升 canonical。

---

## 執行順序（approve 後）

```
1. Read current v4.1 full content (1504 lines)
2. Draft v5.0 in /tmp/rewrite-v5.0.md（complete file，不是 patch）
3. Diff /tmp/rewrite-v5.0.md vs current 檢查內容 1:1（heading 動 / 內容不動）
4. Write replace docs/pipelines/REWRITE-PIPELINE.md
5. Update frontmatter version v4.1 → v5.0
6. Grep cross-ref 同步：HEARTBEAT.md / BECOME / 其他 canonical
7. Pre-commit hook 跑 → 確認 frontmatter / format / cross-link 全綠
8. commit + push + open PR
9. 等 maintainer cycle 收割
```

預估 wall-clock：30-45 min single-session。

---

## 給觀察者的 callout

請哲宇 review：

1. **Heading hierarchy 設計（原則 1）** — H1 / H2 / H3 / H4 四層是否同意？或想用其他方案（如 H2 Stage / H3 Step level，避免 H4）？
2. **Step 編號 N.M 是否同意？** 還是想用其他 scheme（如 Step 1A / 1B 字母而非數字 / Step 1-1 dash 而非 dot）？
3. **Stage 名稱 5 個中文單字「取材 / 寫 / 驗 / 形 / 連」是否同意？** 還是想用其他命名（如保留全英文 RESEARCH / WRITE / VERIFY / FORMAT / CROSS-LINK）？
4. **Step 2.7.6 + Step 3.5 兩次 Title spine sync** — 是否同意這個 deliberate redundancy（catch early + catch leak）？
5. **Stage 4 Format + Media 合併** — Risk 4 三個選項哪個？
6. **Migration 單一 commit 還是 split** — 同意單一 commit？
7. **新增 Step 1.14 / Step 4.3 sub-step（H4）** — 是否同意這層深度，或維持 v4.1 inline list 不開 H4？

approve / 微調 後我直接動工 v5.0 ship。

🧬

_v0.1 design draft | 2026-05-11 早晨 admiring-cohen-8b68fc session_
_前置：reports/rewrite-pipeline-refactor-v4-plan-2026-05-10.md（v4 plan）+ reports/rewrite-pipeline-evolution-plan-2026-05-09.md（v3.x evolution）_
_等 observer review，approve 後動工 v5.0_
