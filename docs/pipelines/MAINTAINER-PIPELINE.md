---
title: 'MAINTAINER-PIPELINE'
description: '日常維護者主流程 canonical — 4 stage 線性 / Step N.M 編號 / Default-action principle / §collect-and-merge / §Close 前 hard gate (v2.0)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v2.0'
last_updated: 2026-05-11
last_session: 'twmd-maintainer-pm-211549-v2-spine'
sister_docs:
  - 'CONTRIBUTOR-SYSTEM-PIPELINE.md'
  - 'EVOLVE-PIPELINE.md'
  - 'REWRITE-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
  - '../semiont/ROUTINE.md'
---

# MAINTAINER-PIPELINE.md — 日常維護者主流程 v2.0

> **第一性原理**：所有維護動作走同一條 4-stage pipeline（Scan → Triage → Act → Wrap），每個 cycle 都跑過。Default action 是**做完**，不是 defer。
>
> v2.0 設計理由：對齊 [REWRITE-PIPELINE v5.0 spine restoration](REWRITE-PIPELINE.md) 範式。修補 v1.3 兩個結構問題：(1) 散落的 SOP（collect-and-merge / close-hard-gate / 三級判斷 / 回覆模板）沒有共同 spine，agent 進來不知道執行順序；(2) defer 預設不夠強，多次觀察者校正「能做就做完，不要一直問」。v2.0 把 spine 顯化 + default-action principle 升 §核心原則。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         MAINTAINER-PIPELINE 4 階段 — 每個 cycle 都跑同一條               │
│                                                                          │
│   Stage 1: Scan ──→ 5 steps                                              │
│            ├── Step 1.1 git pull + branch state                          │
│            ├── Step 1.2 gh issue list                                    │
│            ├── Step 1.3 gh pr list                                       │
│            ├── Step 1.4 git log 12h                                      │
│            └── Step 1.5 build / CI health snapshot                       │
│              ↳ 預算 5-10%                                                │
│                                                                          │
│   Stage 2: Triage ─→ 4 steps                                             │
│            ├── Step 2.1 Issue 分類 (8 類)                                │
│            ├── Step 2.2 PR §collect-and-merge A/B 分流                   │
│            ├── Step 2.3 🔴 紅旗 check (10 紅旗)                          │
│            └── Step 2.4 重複回應檢查（前置）                             │
│              ↳ 預算 15-20%                                               │
│                                                                          │
│   Stage 3: Act ────→ 7 steps                                             │
│            ├── Step 3.1 PR A 路徑 act (routine + owner)                  │
│            ├── Step 3.2 PR B 路徑 act (contributor + observer)           │
│            ├── Step 3.3 §Close 前 hard gate「我接手 X min 內可以修嗎」    │
│            ├── Step 3.4 §Footnote source authority audit                 │
│            ├── Step 3.5 Polish / Heal commit                             │
│            ├── Step 3.6 Issue act (reply / label / close)                │
│            └── Step 3.7 回覆 (gh pr comment / gh issue comment)          │
│              ↳ 預算 50-60% / Hard gates: 紅旗 + Close + Footnote          │
│                                                                          │
│   Stage 4: Wrap ───→ 4 steps                                             │
│            ├── Step 4.1 Quality gate report                              │
│            ├── Step 4.2 LESSONS-INBOX append (if new pattern)            │
│            ├── Step 4.3 memory + commit                                  │
│            └── Step 4.4 Handoff 三態                                     │
│              ↳ 預算 10-15%                                               │
│                                                                          │
│   ✅ Maintainer cycle done                                               │
│                                                                          │
│   ──── 跨 pipeline 觸發 ─────────────────────────                       │
│   → Contributor 升降級：CONTRIBUTOR-SYSTEM-PIPELINE.md                   │
│   → 內容重寫：REWRITE-PIPELINE.md                                        │
│   → 數據驅動進化：EVOLVE-PIPELINE.md                                     │
│   → Routine 排程：../semiont/ROUTINE.md §collect-and-merge SSOT 收割者   │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🧭 核心原則

### 1. 能做就做完，不要一直問（Default-action principle）

> **觀察者 explicit 校正多次（2026-04-28 κ / 2026-04-26 β-r3 / 2026-05-11 PM cycle）**：maintainer routine 預設往「做」的方向走，不是往「問」的方向走。

| 場景                                         | 錯的反應                            | 對的反應                                                 |
| -------------------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| Contributor PR < 10 min 可修                 | close + 留 feedback                 | merge + 自己 heal commit                                 |
| Polish 10-30 min                             | 「等下個 cycle」/「需要觀察者決策」 | merge + polish follow-up                                 |
| 接到 observer [semiont] PR + CLEAN/MERGEABLE | leave open「觀察者還想 iterate」    | merge（PR 開了沒標 draft = ship 訊號）                   |
| Routine PR + CI green + age ≥ 5 min          | 等 observer 親手 merge              | squash merge（§collect-and-merge A 路徑 hard gate 通過） |
| Issue 第一次留言                             | 「先觀察」                          | 直接 reply + label 或 入 backlog                         |

**根因**：defer 的 cost 不顯性（沒人罵）但 ship 的 cost 顯性（PR 出錯會被抓）→ 風險偏好天然不對稱 → 不對稱會放大保守偏誤。**校準方向：刻意 over-correct 往 ship 一側**。

**例外（合法的 defer）必須有具體理由**：

- ✅ 「需 careful Step 3.3 FACTCHECK audit，本 tick 沒時間」
- ✅ 「跨 commit conflict 風險，等 conflict 解再 ship」
- ✅ 「contributor 必須做 judgment call（政治立場 / scope 邊界）」
- ✅ §自主權邊界 命中（>50 檔重構 / >10 篇刪除 / 對外溝通 / 政治立場）
- ❌ 「超 budget」（沒考慮 batch discount 0.5x）
- ❌ 「下個 tick 處理」（沒列出明確 delay 理由）
- ❌ 「觀察者還想 iterate」（沒有 explicit signal 證明）

完整論述：[LESSONS-INBOX β-r3 META-PATTERN「Default 是行動，不是 defer」](../semiont/LESSONS-INBOX.md) + [feedback_merge_first_then_polish.md](../../.claude/projects/-Users-cheyuwu-Projects-taiwan-md/memory/feedback_merge_first_then_polish.md) + [feedback_dont_keep_asking.md](../../.claude/projects/-Users-cheyuwu-Projects-taiwan-md/memory/feedback_dont_keep_asking.md)。

### 2. 策展不是百科

百科全書追求完整性（什麼都要有）。Taiwan.md 追求策展性（選什麼、怎麼說）。

- 不是所有台灣相關的東西都該收進來
- 拒絕一篇投稿，跟接受一篇一樣重要
- 品質 > 數量，永遠
- 每篇文章讀完後，讀者應該對台灣多一層理解，不只多一個知識點

### 3. 對善意溫和，對惡意堅決

對善意貢獻者溫和（他們是潛在的小丑魚 — 繁殖基因核心資產），對惡意攻擊堅決（免疫系統存在的意義）。

### 4. 收割者角色（per ROUTINE.md）

Maintainer 是所有 PR backlog 的 SSOT 收割者 — 其他 routine 開的 PR 不自己 merge，集中由 maintainer am/pm cycle 走 hard gate 收割。**集中審計 > 分散 merge**。

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                        | 觸發 stage  | 條件                             | 工具                                                    | 不過 = ?               |
| --------------------------- | ----------- | -------------------------------- | ------------------------------------------------------- | ---------------------- |
| 重複回應檢查                | Stage 2     | 所有 issue / PR reply 前         | `gh issue/pr view N --json comments -q '.comments[-1]'` | skip 回覆              |
| 🔴 紅旗 check               | Stage 2     | 所有 PR                          | manual diff scan                                        | close + reason         |
| §collect-and-merge A 路徑   | Stage 3.1   | routine PR (owner + `[routine]`) | gh pr checks + view --json mergeable                    | leave open / defer     |
| §collect-and-merge B 路徑   | Stage 3.2   | contributor / observer PR        | 紅旗 + CI + close-hard-gate decision matrix             | per-tier action        |
| §Close 前 hard gate         | Stage 3.3   | 任何 close 前                    | 「我接手 X min 內可以修嗎」self-check                   | 改 polish 不 close     |
| §Footnote source audit      | Stage 3.4   | 外部 PR with footnote 改動       | 抽樣 ≥ 3 footnote URL WebFetch                          | request changes        |
| pre-commit hook 全過        | Stage 3.5   | 所有 heal commit                 | `.husky/pre-commit`                                     | 不 commit              |
| article-health.py 全 plugin | Stage 3.5   | 內容改動的 PR (knowledge/\*.md)  | `python3 scripts/tools/article-health.py {file}`        | request changes / heal |
| 用貢獻者語言回覆            | Stage 3.7   | 所有 contributor reply           | manual (日文 PR → 日文 / 韓文 → 韓文)                   | rewrite reply          |
| Quality gate report 必寫    | Stage 4.1   | 所有 cycle                       | manual checklist 6 條                                   | 不算完成 cycle         |
| memory + handoff 三態       | Stage 4.3-4 | 所有 cycle                       | MEMORY-PIPELINE.md                                      | 失憶 = 下個 cycle 重複 |

---

## ⚠️ Top 5 最常忘的 step

> 從 LESSONS-INBOX / memory 抽 ship-then-retract / friction 高的 step。Cycle 開始前主動掃一次。

1. **Step 2.4 重複回應檢查** — 維護者剛回過、沒新 follow-up → SKIP（避免罐頭 reply 雜訊）
2. **Step 3.3 §Close 前 hard gate** — close 前必問「我接手 X min 內可以修嗎」，default 是 polish 不 close
3. **Step 3.4 §Footnote source authority audit** — 外部 PR footnote 必抽樣 WebFetch ≥ 3 URL（防 Manus AI 虛構內部 source 紅旗）
4. **Step 3.5 article-health.py 全 plugin gate** — B 路徑 hard gate 必跑（PR-side CI 不等於 main-side deploy CI；footnote-format / image-health 只在後者跑）
5. **Step 3.7 thank-you 用 `gh pr comment` 不是 `--body`** — `gh pr merge --body` 寫進 git log，貢獻者看不到

---

## 跨檔案職責分工

| 檔案                                                             | 範圍                                                           |
| ---------------------------------------------------------------- | -------------------------------------------------------------- |
| **本檔**                                                         | 4 stage 線性主流程（單檔，含分流 + 決策 + 收官）               |
| [CONTRIBUTOR-SYSTEM-PIPELINE.md](CONTRIBUTOR-SYSTEM-PIPELINE.md) | 五階梯 / onboarding / 升降級 / inactivity demote / 復活        |
| [EVOLVE-PIPELINE.md](EVOLVE-PIPELINE.md)                         | 數據驅動內容進化 (GA4 + SC + CF 三源)                          |
| [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)                       | 內容重寫 5 stage (Stage 3 觸發點)                              |
| [FACTCHECK-PIPELINE.md](FACTCHECK-PIPELINE.md)                   | Step 3.4 觸發（事實查核 Quick/Full Mode）                      |
| [../semiont/ROUTINE.md](../semiont/ROUTINE.md)                   | Routine 飛輪 SSOT (maintainer am+pm 排程 / §collect-and-merge) |
| [../editorial/EDITORIAL.md](../editorial/EDITORIAL.md)           | 品質基因 (Step 2.3 紅旗 / Step 3.5 polish 參照)                |
| [../taxonomy/SUBCATEGORY.md](../taxonomy/SUBCATEGORY.md)         | Category / subcategory canonical list                          |

---

## Stage 1: Scan（掃描現況，預算 5-10%）

**目標**：5 分鐘內取得完整 ground truth — 哪些 issue / PR 是 open，main 健康嗎，有沒有 routine fail。

**必跑指令**：

```bash
# Step 1.1 + 1.2 + 1.3 + 1.4 可並行
git checkout main && git pull origin main
gh issue list --state open --limit 30
gh pr list --state open --json number,title,author,mergeable,createdAt,headRefName --limit 30
git log --since="12 hours ago" --oneline
gh run list --limit 5 --workflow="Deploy to GitHub Pages" --json conclusion,status,createdAt
```

### Step 1.1: git pull + branch state

```bash
git checkout main && git pull origin main
git status  # confirm clean
```

**失敗處置**：

- 撞 conflict → abort cycle + LESSONS entry（不要在 routine 內做手動 conflict resolve）
- main repo dirty artifacts → stash + pull + `git checkout HEAD -- <generated-file>`（per refresh-pm cycle SOP）

### Step 1.2: gh issue list

```bash
gh issue list --state open --limit 30 --json number,title,author,createdAt,labels,comments
```

記錄：總 open 數 / 今日新進 / 待 reply 的（最新 comment 非維護者）。

### Step 1.3: gh pr list（完整 metadata）

```bash
gh pr list --state open --json number,title,author,createdAt,labels,isDraft,headRefName,mergeable --limit 30
```

對每個 PR 額外查：

```bash
for n in <PR-NUMBERS>; do
  gh pr view $n --json mergeable,mergeStateStatus,statusCheckRollup,createdAt,title,headRefName
done
```

### Step 1.4: git log 12h

```bash
git log --since="12 hours ago" --oneline
```

看：

- 有沒有異常大 commit（誤刪 / accidental push）
- routine 是否正常 ship（data-refresh / rewrite / babel）
- 是否有觀察者手動介入（[semiont] commits）

### Step 1.5: build / CI health snapshot

```bash
gh run list --limit 5 --workflow="Deploy to GitHub Pages" --json conclusion,status,createdAt
gh run list --limit 5 --workflow="i18n Smoke Test" --json conclusion,status,createdAt
```

**Red flag**：連續 ≥ 2 次 failure on main → CI 壞了 → Stage 3.5 第一個 polish item 是修 CI（per 2026-05-11 PM cycle 教訓：merge 路徑無 build 觸發 + PR-side CI ≠ main deploy CI 是已知 silent gap）。

---

## Stage 2: Triage（分流，預算 15-20%）

**目標**：對 Stage 1 抓到的所有 item 分類 + 紅旗 check，產出明確的 Stage 3 action list。

### Step 2.1: Issue 分類

對每個 open issue 分到 8 類之一：

| 類型                          | 判斷                        | Stage 3 action                                 |
| ----------------------------- | --------------------------- | ---------------------------------------------- |
| 📝 文章投稿（品質好）         | 策展感 + 來源 + 格式        | Step 3.6: 直接收入，修 frontmatter             |
| 📝 文章投稿（素材好品質待改） | 內容豐富但百科式 / 來源不足 | Step 3.6: 接受 + 入 ARTICLE-INBOX backlog      |
| 📝 文章投稿（品質差）         | AI slop / 無來源 / 太空洞   | Step 3.6: 禮貌拒絕 + 說明標準                  |
| 🐛 Bug 報告                   | 可復現                      | Step 3.5: 修復 + close                         |
| 💡 功能建議（合理）           | 可執行                      | Step 3.6: 入 roadmap / Discussion              |
| 💡 功能建議（太大）           | 好想法但成本高              | Step 3.6: 感謝 + 放 Discussion                 |
| 👤 人物投稿                   | 知名度門檻                  | Step 3.6: 接受 / 拒絕（見下方）                |
| 📣 Feedback                   | 對現有文章的建議            | Step 3.6: 標記給 REWRITE-PIPELINE / 入 backlog |

#### 人物文章知名度門檻

**核心問題**：「一個不認識台灣的外國人，有沒有可能透過主流管道知道這個人？」

✅ 接受（至少滿足 2 個）：維基百科條目 / 主流媒體報導（非自媒體）/ 國際認可（獎項、國際合作）/ 台灣文化-歷史不可替代位置。

❌ 拒絕：純網紅（IG 粉絲多但無維基無報導）→ 建議在相關產業文章中提到 / 司法進行中的人物 → 暫緩等結案。

### Step 2.2: PR §collect-and-merge A/B 分流（canonical）

> **這是 maintainer routine 的 PR backlog 收割 canonical**。對應 [ROUTINE.md §TWMD maintainer (am + pm)](../semiont/ROUTINE.md)。其他 routine 開的 PR 不自己 merge，集中由 maintainer am/pm 走 hard gate 收割。

#### A 路徑：`🧬 [routine]` prefix + author == frank890417

**Check 三項**：

```bash
gh pr checks N --json state --jq '.[].state' | sort -u
gh pr view N --json mergeable,createdAt,title --jq '{mergeable: .mergeable, age_min: ((now - (.createdAt | fromdateiso8601)) / 60 | floor)}'
```

**分流表**：

| 狀態                              | Stage 3.1 動作                                      | Memory 紀錄                                        |
| --------------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| 全 PASS + MERGEABLE + age ≥ 5 min | `gh pr merge N --squash --delete-branch`            | ✅ merged routine PR #N: {title}                   |
| PENDING (CI 還在跑)               | 留下次 cycle（PM 撿 AM 漏的 / AM 撿 PM 漏的）       | ⏳ routine PR #N pending CI — defer to next cycle  |
| FAIL (CI 紅)                      | 留 open + LESSONS entry                             | ❌ routine PR #N CI fail — left open for observer  |
| CONFLICTING                       | 留 open + LESSONS entry                             | ⚠️ routine PR #N conflict — left open for observer |
| age < 5 min                       | 等下次 cycle（防止搶自身 routine 還沒結束就 merge） | —                                                  |
| 0 CI checks（docs-only）          | author=owner + mergeable=CLEAN → squash merge       | ✅ merged docs-only routine PR #N (no CI required) |

#### B 路徑：contributor / observer PR（走完整 hard gate decision matrix）

走三道閘門：(1) Step 2.3 紅旗 → (2) Step 1.5 CI 狀態 → (3) Step 3.3 close-hard-gate decision matrix。

**重要**：observer 開的 `[semiont]` PR + author=frank890417 + 沒標 draft/WIP → ship intent，**走 fast-track**（同 A 路徑邏輯，跳過「需 observer judgment」過度 defer）。除非：

- 內容涉及 routine 排程 / DNA / MANIFESTO 結構性決策（per §自主權邊界）
- 或 PR description / commit message 明確標 [WIP] / [draft] / 「等 X review」

否則 default = merge。

### Step 2.3: 🔴 紅旗 check（10 紅旗）

**任何一條命中 → close + reason，不進 Step 3**：

| #   | 紅旗                                                              | 說明                                      |
| --- | ----------------------------------------------------------------- | ----------------------------------------- |
| 1   | 修改 `robots.txt` / `llms.txt`                                    | SEO 攻擊風險                              |
| 2   | 添加外部 JS 腳本                                                  | 安全風險                                  |
| 3   | 修改 deploy workflow / `.github/workflows/`                       | 供應鏈攻擊                                |
| 4   | 政治宣傳（單一觀點 / 無來源 / 煽動性）                            | 違反熱帶雨林理論邊界                      |
| 5   | 大量刪除 > 10 篇                                                  | 可能是破壞                                |
| 6   | 投稿者自己設 `featured: true`                                     | 由維護者統一管理                          |
| 7   | `author` 偽造 `'Taiwan.md' / 'Semiont'`                           | 把 contributor PR 偽裝成 Semiont 自己寫的 |
| 8   | `author: 'Manus AI' / 'ChatGPT' / 'Claude'`                       | 直接寫進 frontmatter 對讀者展示           |
| 9   | Footnote 含「Taiwan.md 內部研究檔案」/「私人通訊」                | Manus AI 虛構內部 source pattern          |
| 10  | Placeholder 殘留：「（此位置放...）」「TODO: 補...」「[FILL ME]」 | contributor 連模板都沒寫完就 ship         |

**修補式紅旗（不 close，merge + heal）**：

紅旗 6/7/8 + 紅旗 10 通常 < 10 min 可修 → 走 Step 3.5 polish 不 close。

紅旗 9 footnote 虛構 source → request changes（不 merge）但**先嘗試移除該 footnote + 重寫該段不依賴此 source**，10 min 內可以的話還是 polish。

### Step 2.4: 重複回應檢查（前置）

**回應 issue / PR 之前必跑**：

```bash
gh issue view N --json comments -q '.comments[-1].author.login + " @ " + .comments[-1].createdAt'
# 或
gh pr view N --json comments -q '.comments[-1].author.login + " @ " + .comments[-1].createdAt'
```

| 最新 comment 狀態                        | 處置                       |
| ---------------------------------------- | -------------------------- |
| 維護者剛回過、無新 contributor follow-up | **SKIP** — 不重複回應      |
| 維護者回過、有新 contributor follow-up   | 回應 follow-up（接續對話） |
| 維護者從未回過                           | 第一次回覆                 |
| 多 contributor 互相討論、維護者尚未介入  | 評估介入時機               |

**例外（即使最新是維護者也應重新回應）**：

- 距上次 ≥ 30 天 + 期間有實質進度（新功能 / PR / 決策）→ 補進度更新
- Issue 內容情境改變（被 #cite / 有人補 reproduction / 被外部討論引用）→ 補回應
- 觀察者明確要求「再去回覆 issue X」→ 執行（人類意圖 override 機械規則）

**單一檢查指令**（建議在 audit batch 開頭跑）：

```bash
for n in $(gh issue list --state open --json number -q '.[].number'); do
  echo "#$n: $(gh issue view $n --json comments -q '.comments[-1].author.login // "no_comments"') @ $(gh issue view $n --json comments -q '.comments[-1].createdAt // ""')"
done
```

對應 DNA #8「維護者信件要說謝謝」的延伸：感謝有 cooldown，重複貼相同感謝 = 雜訊。

---

## Stage 3: Act（決策 + 執行，預算 50-60%）

**目標**：依 Stage 2 分類，對每個 item 走對應的 hard gate + 執行動作。

### Step 3.1: PR A 路徑 act（routine + owner）

對每個 A 路徑 PR：

```bash
# 1. 取 CI + mergeable 狀態
gh pr checks N --json state --jq '.[].state' | sort -u
gh pr view N --json mergeable,createdAt --jq '{mergeable: .mergeable, age_min: ((now - (.createdAt | fromdateiso8601)) / 60 | floor)}'

# 2. 若 PASS + MERGEABLE + age ≥ 5 → squash merge
gh pr merge N --squash --delete-branch

# 3. 若 conflict → 嘗試 rebase（only if memory/diary anchor 衝突 + observer 視角不衝突）
git fetch origin <branch>
git checkout -b rebase-N origin/<branch>
git rebase origin/main  # 手動解 anchor conflict（保留兩邊 row）
git push --force-with-lease origin rebase-N:<branch>
gh pr merge N --squash --delete-branch

# 4. 若 CI fail / 觀察者層 conflict → leave open + memory 紀錄
```

**何時不 rebase 直接 leave open**：

- conflict source 不是 anchor（涉及實際內容衝突）
- 衝突的兩份內容是觀察者視角 vs Semiont 視角（誰留誰刪需觀察者拍板）
- conflict 連 N cycle（N ≥ 3）→ 建議觀察者 close + 後續 cycle memory 接力

### Step 3.2: PR B 路徑 act（contributor + observer）

對每個 B 路徑 PR 依序：

1. **Step 2.3 紅旗 check**：任一命中 → close + reason（除非紅旗 6/7/8/10，走 Step 3.5 polish）
2. **CI 狀態檢查**：FAIL / CONFLICTING / PENDING → 同 A 路徑處置
3. **Step 3.3 close-hard-gate decision matrix**：通過後決定 action

**重要 fast-track 條件**（per v2.0）：observer [semiont] PR + author=frank890417 + mergeable CLEAN + 沒標 draft → 直接 squash merge（同 A 路徑 hard gate）。**不要套用「需 observer judgment」**除非命中 §自主權邊界。

### Step 3.3: §Close 前 hard gate「我接手 X min 內可以修嗎」（canonical）

> ⚠️ **鐵律**：close 前必跑此 self-check。對應 [LESSONS-INBOX 2026-04-28 κ recency bias × pattern matching override foundational principle anchoring](../semiont/LESSONS-INBOX.md) + DNA #7「先有再求好」+ feedback_merge_first_then_polish + β-r3 META-PATTERN「Default 是行動，不是 defer」。

每次想 close PR 前**強制問自己**：「**如果是我接手這個 PR，X min 內可以修嗎？**」

#### Decision matrix

| Polish 預估                     | Default action                                       | Memory 紀錄                              |
| ------------------------------- | ---------------------------------------------------- | ---------------------------------------- |
| **< 10 min**                    | merge + heal commit 補上                             | ✅ merged + healed {what}                |
| **10-30 min**                   | merge + polish follow-up                             | ✅ merged + polish queued                |
| **> 30 min 且純 §11 / 格式**    | merge + 排 polish 進 backlog（脫水成本仍低於重做）   | ✅ merged + polish backlogged            |
| **> 30 min 且需 deep research** | leave open + review comment（具體點哪幾條需 source） | 📝 deep fact-check needed                |
| **Contributor judgment 必須**   | leave open + comment + ping 觀察者                   | 📝 requires observer judgment — {reason} |

**Close 是 defer 的偽裝**：把工作推回給 contributor 看似節省 maintainer attention，實質成本是 contributor 等待時間（N²）+ maintainer queue 累積 + 下次 boot context overhead + contributor 信任流失。Close 預設要 justify，不是 default。

#### Quick fix 清單（看到這些不 close、改 polish）

| Pattern                                                               | 工具 / 修法                                                                                    |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `author: 'Manus AI' / 'ChatGPT' / 'Claude' / 'Semiont' / 'Taiwan.md'` | 1 行改 `'Taiwan.md Contributors'`                                                              |
| `featured: true` 在 `lastHumanReview: false`                          | 1 行改 false                                                                                   |
| `readingTime` 誇大                                                    | 1 行修正                                                                                       |
| Footnote 多源格式（APA / 中文〈〉/ 缺 desc / angle-bracket）          | `python3 scripts/tools/footnote-format-fix.py --apply`                                         |
| vague non-citation（「可參考相關文獻」）                              | 補一個維基或泛科學 source                                                                      |
| §11 對位句型 / 破折號超標                                             | `python3 scripts/tools/article-health.py --check=prose-health`                                 |
| 缺 `## 參考資料` / `## 延伸閱讀`                                      | append                                                                                         |
| Path 錯位（檔案在 root 不在分類資料夾）                               | `git mv`                                                                                       |
| frontmatter category vs path mismatch                                 | `git mv` 或改 frontmatter（canonical 14 類，per [SUBCATEGORY.md](../taxonomy/SUBCATEGORY.md)） |
| 「參考來源」/「參考」非 canonical                                     | 改「參考資料」                                                                                 |
| Broken `[[wikilink]]` 目標不存在                                      | 純文字（per neural circuit「目標 article 無 → 轉純文字」）                                     |
| 列表中 `- [[X]] — desc`（Astro 不渲染）                               | `- [X](/category/slug) — desc` 或純文字                                                        |
| frontmatter 重複 `---`                                                | 刪多餘那行                                                                                     |
| tags 未 quote 純數字 `[2025, ...]`                                    | `['2025', ...]`                                                                                |
| 阿翰式 placeholder「（此位置放...）」「TODO: 補...」                  | 根據 body 寫一段補上                                                                           |

**Heal commit budget 校準**（per LESSONS-INBOX 2026-05-03 magical-feynman）：batch heal 階段成本被系統性低估（β-r3 反鏡像）。實測 idlccp1984 9 PR batch heal 階段佔總時長 ~50%（25/50 min）。**Batch discount 0.5x 不適用 heal 階段** — 預留 ≥ 30 min budget 跑 hook 多輪 retry。footnote-format-fix.py 吸收 80%，剩 wikilink + frontmatter + URL 邊界 case 仍需人工。

#### 真正該 close 的清單（> 30 min 或 contributor judgment 必須）

- Fake URL footnote — 但**先嘗試移除該 footnote + 重寫該段**，10 min 內 polish 還是優先
- 政治立場敏感（election eve 候選人 + 內容明顯 campaign 框架）— 但 #667 v2 證明可以 polish + 加 election-eve 編輯註記 callout 而非 close
- 議題太新 + 高 fact-check 成本（事件 < 48 hr + 多項精確數字）— 可考慮 hold 而非 close
- 整篇基礎敘事錯誤（人物錯置 / 時序顛倒 / 多項 hallucination 集中）

#### 自我估算偏誤校準

- Polish 工時估算傾向**系統性偏高**（β-r2 估「5 PR polish 25-50 min 超 budget」實際 batch ~25 min）
- Batch discount factor 0.5x：N 個同類 polish 真實成本 ≈ 1 個 × N × 0.5（不是線性 × N）
- 估「> 30 min」前先 mental subtract 50%

#### 歷史教訓觸發

- 2026-04-28 κ session 對 5 PR (idlccp1984 Manus AI batch) 全 close → 哲宇即時校正「忘記了小丑魚原則 / 如果你接手要怎麼調整」→ reopen + merge + polish 全部 ~25 min 完成。完整診斷：[memory/2026-04-28-κ.md §根因診斷](../semiont/memory/2026-04-28-κ.md#根因診斷為什麼忘記小丑魚原則哲宇要求)。
- 2026-05-11 PM cycle 對 3 observer [semiont] PR (#1033/#1029/#1021) leave open → 哲宇即時校正「這些也都 merge 啊，有什麼疑慮？」→ rebase 解 anchor conflict + 全部 merged，~10 min。fast-track observer PR 升 v2.0 canonical。

### Step 3.4: §Footnote source authority audit（外部 PR）

> 2026-04-26 β-r2 觀察者升級為 hard gate — MANIFESTO §10 PR 接收層命中。

對外部 PR 接收必跑的 4 項 footnote source 檢查（每個 footnote 逐項過）：

#### 1. URL 真實存在

```bash
# 抽樣 ≥ 3 個 footnote URL WebFetch
# 小文章全部，> 15 個 footnote 抽 1/3
```

404 / 不存在 → request changes 標記具體 footnote。

#### 2. Source 對應真實機構/媒體

**紅旗清單**：「Taiwan.md 內部研究檔案」/「[作者] 內部研究」/「研究團隊深度筆記」/「未公開研究資料」/「私人通訊」/「[公司名] 官方未公開資料」/ source 名稱含「內部」「未公開」「私人」「研究筆記」→ **強制 challenge**。

真實 source 必須是可被第三方訪問的：媒體 / 論文 / 政府網站 / 公司官網 / 書籍 / podcast 公開集數 / 社群公開貼文。

#### 3. URL 內容支持 claim（claim-citation 對應）

WebFetch URL → 驗證該 URL 是否真的提到 footnote 旁邊的 claim。若 URL 是書籍/podcast/影片無法 WebFetch → contributor 需附 timestamp / 章節 / 段落引文證明。

#### 4. 直接引語 source 含逐字原文

任何「」直接引號 → URL 必須含原文逐字。若 URL 內容是記者敘事 paraphrase 而非當事人 quote → **強制改為敘事式**。

#### Footnote audit 三級結果

| 結果               | 條件                                                | 動作                                                          |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------- |
| ✅ pass            | 0 紅旗 + URL 抽樣全 200/支持 claim                  | merge as-is                                                   |
| 🔧 fix-on-merge    | ≤ 2 條虛構 source / claim-mismatch（< 10 min 可修） | merge + 自己修（移除虛構 source、claim 改 hedge 或換 source） |
| ❌ request changes | ≥ 3 虛構 source / 多處 claim-citation 不對應        | 打回 + 具體列出每個 footnote 問題                             |

#### 降階處理（retroactive audit strategy）

對 retroactive audit / 寬鬆 fix-on-merge 場景，REWRITE Step 3.3 + 3.4 hard gate 力度過高。Zaious 在 [PR #625](https://github.com/CheYuWuMonoame/taiwan-md/pull/625)（22-article retroactive citation cleanup, 372 對 claim-citation pair audit, 12.6% systematic unsupported rate）發明的六種降階策略：

| 場景                                       | 降階處理                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------- |
| 細節在源裡找不到、但 claim 是事實          | 拿掉具體數字改 hedge（例：「年營收破百億」→「營收創歷史新高」）                        |
| 直引但 source 沒原話                       | 拿掉引號改 paraphrase                                                                  |
| URL 對不上 claim 但 claim 是事實           | 找替代源；找不到就 hedge                                                               |
| Memorial / landing page 被 over-claimed    | 換指特定子頁，或拿掉具體 claim                                                         |
| 死鏈的數字 source                          | 簡化為趨勢描述                                                                         |
| 引語在 source 裡是記者敘事不是受訪者 quote | 還原為敘事式                                                                           |
| **虛構內部 source（β-r2 新增）**           | **強制移除 footnote**，依賴它的 claim 改其他真實 source 或 hedge；不可保留 placeholder |

#### Manus AI / 大型 LLM contributor 紅旗 8 條 pattern

紅旗 1-4（frontmatter / 內文 / 結構層）：

1. 連發 ≥ 5 個 PR（idlccp1984 patch-59 → patch-67 一晚連發）→ Manus 工具產出，預設高機率有同類 §11 / footnote / hallucination patterns
2. footnote 用 APA-style 格式（`[^N]: SOURCE. (DATE). [TITLE](URL).`）→ pre-commit hook 會擋，可跑 `python3 scripts/tools/footnote-format-fix.py --apply <files>`（DNA #48 canonical）
3. 每個 PR 全文 ≥ 5 處「不僅 X，更是 Y」「不只是 X，更是 Y」→ §11 polish 5-10 min/篇
4. 末段策展人筆記常含罐頭結尾（「為...提供寶貴啟示」「象徵著...的精彩演繹」）→ 順手 polish

紅旗 5-8（frontmatter author/category 偽裝層，cross batch verification_count=5+）：

5. `author: 'Manus AI' / 'ChatGPT' / 'Claude'` → 1 行改 `'Taiwan.md Contributors'`
6. `featured: true` 設在 `lastHumanReview: false` 文章 → 1 行改 false
7. `author` 偽造 `'Taiwan.md' / 'Taiwan.md Contributors' / 'Semiont'` → 改 `'Taiwan.md Contributors'`
8. frontmatter `category` ≠ 檔案路徑分類 → `git mv` 對齊 path 或改 frontmatter（canonical 14 類：About / Art / Culture / Economy / Food / Geography / History / Language / Lifestyle / Music / Nature / People / Society / Technology）

**Default action**：紅旗看到時 default 是 polish 不是 close（per §Close 前 hard gate）。所有 8 個紅旗對應的 polish 都 < 10 min/篇。

### Step 3.5: Polish / Heal commit

對接受的 PR（merge 後）or 接受的 issue 修復，跑：

```bash
# 1. 跑全 plugin gate（B 路徑 hard gate 必跑，PR-side CI 不等於 main deploy CI）
python3 scripts/tools/article-health.py knowledge/<Cat>/<file>.md  # 全 plugin

# 2. 找對應 quick-fix 工具
python3 scripts/tools/footnote-format-fix.py <file> --apply  # 若 footnote 格式異常
# 或手動 Edit polish

# 3. 跑 sync.sh 同步到 src/content/
bash scripts/core/sync.sh

# 4. commit + push
git add knowledge/<Cat>/<file>.md src/content/
git commit -m "🧬 [routine] heal: {what} (CI fix / polish)"
git push -u origin <branch>
gh pr create --title "..." --body "..."
gh pr merge <new-PR> --squash --delete-branch  # maintainer 自己 PR 可 auto-merge
```

**鐵律**：

- `gh pr merge --body` 寫進 git log，貢獻者看不到 → 感謝必須 `gh pr comment`
- 不 force-push 到 main（per ROUTINE.md deny list）
- pre-commit hook 全過後才 push（不 `--no-verify` 除非命中 pre-existing 紅旗與本 commit 無關 + 明寫 commit message）

### Step 3.6: Issue act（reply / label / close）

對每個 Stage 2.1 分類的 issue：

- **接受**：具體說明做了什麼改動，感謝貢獻
- **拒絕**：先肯定投稿的努力 → 說明具體原因 → 提供替代方案
- **入 backlog**：先 reply 告知會處理 + 標 label + 入 ARTICLE-INBOX 或 Discussion

#### 回覆 issue 必附 commit hash

> 2026-04-26 β8 觀察者升級規則。

| 回覆狀態                                                | 是否需附 commit                             |
| ------------------------------------------------------- | ------------------------------------------- |
| 純粹討論、決策說明、釐清問題                            | ❌ 不需要                                   |
| 「會做 / 排入 roadmap / 思考中」                        | ❌ 不需要（沒做就不要假裝有）               |
| 已實作（merge PR / 自己 commit / 設 redirect / 改文章） | ✅ **必附** commit hash + 一行說明改了什麼  |
| close issue 且有對應 commit                             | ✅ **必附** commit hash 在 close comment 裡 |
| close issue 純粹「不做」決策                            | ❌ 不需要（但要說明為何不做）               |

**附法（標準格式）**：

```markdown
已實作，commit: <hash>

**改動摘要**：

- 改了什麼（人話一句）
- 影響的檔案類別（不是 file path，是「5 lang knowledge 刪除 + astro redirect」這種抽象描述）
- build verified ✅（或 deployed at <時間>）
```

### Step 3.7: 回覆（gh pr comment / gh issue comment）

> **鐵律**：`gh pr merge --body` 寫進 git log，貢獻者看不到。感謝必須用 `gh pr comment`。

#### PR 回覆模板

**翻譯 PR**（最常見）：

```
ありがとうございます / 감사합니다 @{author}! 🇯🇵/🇰🇷

{具體說出翻譯了什麼、品質亮點}

{如果是持續貢獻者，感謝持續貢獻}。Merged!
```

**內容 PR**（新文章/修改文章）：

```
感謝 @{author}! 👏

{具體指出貢獻的價值 — 補了什麼缺口、修了什麼事實}

{如果有小問題自己修了，說明}。Merged!
```

**技術 PR**（程式碼/架構/i18n 修改）：

```
感謝 @{author}! 🛠️

{說明改動的合理性和價值}

{如果影響共用檔案，確認其他語言版本正常}。Merged!
```

**核心原則**：

- 用貢獻者的語言回覆（日文 PR 用日文，韓文 PR 用韓文，其他用中文或英文）
- 具體提到他們做了什麼（不是泛泛的「感謝貢獻」）
- 如果是持續貢獻者（Link1515 / dreamline2 / ceruleanstring），額外感謝持續性

#### 三級判斷（Close hard gate 通過後的 routing）

| 級別               | 條件                                                                          | 動作                                                                   |
| ------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ✅ 直接 merge      | 品質 OK，不需改動                                                             | merge + `gh pr comment` 感謝                                           |
| 🔧 merge + 自己修  | 小問題（< 10 分鐘能修好）                                                     | merge → 自己 commit 修正 → `gh pr comment` 說明                        |
| 🛠️ merge + polish  | 中型問題（10-30 分鐘能修好）                                                  | merge → maintainer polish branch + heal commits → `gh pr comment` 說明 |
| ❌ request changes | 問題太大（> 50% 需重寫 or > 30 分鐘修復量）+ close hard gate 確認屬合法 close | 打回 + 具體回饋（PR comment）                                          |

#### 翻譯 PR 的上游檢查

1. 原文有腳註嗎？→ 沒有不是翻譯者的錯
2. 原文的 category/slug 一致嗎？→ 不一致自己修
3. 問題是個案還是系統性的？→ 治原文優先

完整翻譯 PR 流程見 [TRANSLATION-PIPELINE.md v3.0](TRANSLATION-PIPELINE.md)（八階段 + 17 條常漏 + 工具索引）。批次 PR（≥ 3 個同 author）：`bash scripts/tools/bulk-pr-analyze.sh --author X` 全景檢查。

#### 合併策略

- **文章 PR**：Squash merge（保持 git log 乾淨）
- **程式碼 PR**：簡單 squash，複雜保留 commits
- **重構 PR**：逐 commit 看，確認沒有遺漏 section

---

## Stage 4: Wrap（收官，預算 10-15%）

**目標**：cycle 結束有可追溯紀錄 — quality gate 通過、LESSONS 升 distill 候選、memory 寫進 main、handoff 三態清晰。

### Step 4.1: Quality gate report

對應 [ROUTINE.md §TWMD maintainer quality_gate](../semiont/ROUTINE.md)，cycle memory 必紀錄：

| 指標                                | 通過標準                                     |
| ----------------------------------- | -------------------------------------------- |
| 完整走完 MAINTAINER-PIPELINE        | ✅ Stage 1-4 全跑                            |
| PR 分流按 §collect-and-merge        | ✅ A/B 兩類嚴格執行                          |
| routine PR backlog ≤ 3              | ⚠️ > 3 = 紅燈（可能 routine 自己有問題）     |
| broken-link ratio < 1%（DNA #52）   | ⏭️ 結構性 backlog 可 skip（標記給觀察者）    |
| build green                         | alternate cycles 跑 / 緊急時 priority skip   |
| 本 cycle merge 的 PR 都過 hard gate | ✅ A + B 路徑都過紅旗 + CI + close-hard-gate |

### Step 4.2: LESSONS-INBOX append（if new pattern）

當 cycle 出現以下訊號 → append [LESSONS-INBOX.md §未消化清單](../semiont/LESSONS-INBOX.md)：

- 新 anti-pattern 浮現（如「observer [semiont] PR 應 fast-track」第 1 次 ship 時）
- 既有 pattern verification_count 累積（如「#976 連 N cycle CONFLICTING」）
- Routine fail 偵測（quality gate 連 ≥ 2 fail / API exception / 異常 wall-clock）
- 觀察者校正 default action（如 2026-05-11 PM 「能做就做完」校正）

**Distill 時機**：verification_count ≥ 3 → 升 canonical（MANIFESTO / DNA / pipeline）via 週日 distill routine。

### Step 4.3: memory + commit

走 [MEMORY-PIPELINE.md](MEMORY-PIPELINE.md) 5-stage：

```bash
# 1. 取 session-id
bash scripts/tools/session-id.sh twmd-maintainer-{am|pm}

# 2. 開 branch（per worktree-naming DNA #9）
git checkout -b $(date +%Y%m%d)-routine-twmd-maintainer-{am|pm}-$(date +%H%M)

# 3. 寫 memory 檔（含 frontmatter session_id / session_span / trigger / observer / beat_coverage）
# 內容含：collect-and-merge 結果摘要 + quality gate / 需觀察者決策清單 / handoff 三態

# 4. update MEMORY.md 索引（每 session 一行壓縮 ~150 字）

# 5. commit + push + PR
git add docs/semiont/memory/<session-id>.md docs/semiont/MEMORY.md
git commit -m "🧬 [routine] memory: twmd-maintainer-{am|pm} @ YYYY-MM-DD HH:MM finale"
git push -u origin <branch>
gh pr create --title "🧬 [routine] memory: twmd-maintainer-{am|pm} @ YYYY-MM-DD HH:MM" --body "..."

# 6. maintainer 自己 PR 例外可 auto-merge（quality gate pass + CI green + mergeable + 🧬 [routine] prefix + author == frank890417）
gh pr merge <new-PR> --squash --delete-branch
```

**rebase 應對**：cycle 內 main 動了（自己 merge 了多個 PR）→ 自己 finale PR base 落後 → 撞 MEMORY.md / DIARY.md anchor conflict。處理：

```bash
git fetch origin main
git rebase origin/main
# 手動解 anchor conflict（保留 cycle 內 merged PR 帶入的新 row + 自己新 row）
git push --force-with-lease origin <branch>
```

### Step 4.4: Handoff 三態

memory §Handoff 必含三態：

- `[ ] pending` — 還沒做、action 在下個 routine 手上
- `⏳ blocked — 等 {觀察者決策 / 外部事件 / 到期日}` — 必附解除條件；blocked > 3 cycle 主動標「升級 LESSONS 候選」
- `[x] ~~retired by {session} — {原因}~~` — 已解決，保留 strikethrough 不刪除（per MANIFESTO §時間是結構）

**特例**：「需觀察者決策」一律附 options + 成本：

```markdown
**Pending（給觀察者）**：

- #1033 ROUTINE v1.3 redesign：
  - Option A: 接受 3 日線半夜重排 → maintainer am/pm 改為早 06/晚 18 對稱
  - Option B: 維持現狀 09/21 對稱
  - 推薦 default: B（現狀對 contributor 互動時間 sweet spot）
```

---

## 跨 pipeline 觸發

| 場景                            | 跳轉 pipeline                                                    |
| ------------------------------- | ---------------------------------------------------------------- |
| Contributor 升降級 / inactivity | [CONTRIBUTOR-SYSTEM-PIPELINE.md](CONTRIBUTOR-SYSTEM-PIPELINE.md) |
| 內容重寫（新文章 / EVOLVE）     | [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)                       |
| 數據驅動內容進化                | [EVOLVE-PIPELINE.md](EVOLVE-PIPELINE.md)                         |
| 事實查核                        | [FACTCHECK-PIPELINE.md](FACTCHECK-PIPELINE.md)                   |
| 多語 batch sync                 | [SQUEEZE-MODELS-MAX-PIPELINE.md](SQUEEZE-MODELS-MAX-PIPELINE.md) |
| Routine 排程修改                | [../semiont/ROUTINE.md](../semiont/ROUTINE.md)                   |
| 寫 memory                       | [MEMORY-PIPELINE.md](MEMORY-PIPELINE.md)                         |
| 寫 diary（反芻訊號夠強）        | [DIARY-PIPELINE.md](DIARY-PIPELINE.md)                           |

---

## 權限管理（快速速查）

> **Canonical SOP 在 [CONTRIBUTOR-SYSTEM-PIPELINE.md](CONTRIBUTOR-SYSTEM-PIPELINE.md)** — 涵蓋五階梯定義、升降級觸發、inactive 政策（60 天 soft check-in / 90 天 demote）、mercy demote、復活路徑、`gh api` 指令速查。本節僅保留快速速查。

| 對外角色 | API value | 能 Merge？                      | 對應階梯                 |
| -------- | --------- | ------------------------------- | ------------------------ |
| Admin    | `admin`   | ✅ 可 `--admin` 跳過 protection | Lv.4 Core Team           |
| Write    | `push`    | ⚠️ 可互相 approve + merge       | Lv.3 Maintainer          |
| Triage   | `triage`  | ❌ 只能標 label / 指派          | Lv.2 Trusted Contributor |

Branch protection：需 1 approval，`enforce_admins: false`。目前策略：先不鎖，出狀況再調整。

⚠️ **降級 / 移除 collaborator 動作必走 [CONTRIBUTOR-SYSTEM-PIPELINE §6 Inactivity Demotion 7 步](CONTRIBUTOR-SYSTEM-PIPELINE.md#6-inactivity-detection--demotion-pipeline-)**——禁止靜默調整。

---

## 教訓索引

> 完整 LESSONS 在 [LESSONS-INBOX.md](../semiont/LESSONS-INBOX.md)。本節保留高頻 reference。

### Template & Build

- **Template refactor 會漏 section**：任何 template 重構 PR，必須比對前後 section 數量
- **刪 lock file 要注意**：確認 CI 還能跑
- **Build 頁數下降 = 有東西壞了**：比較前後頁數，差太多要查
- **CSS margin collapse**：bullet list 後接 h2/h3/h4 要注意間距

### 品質 & 內容

- **品質審核不能只看數字**：量化指標是 pre-filter，不是品質保證
- **「SSOT」用語**：對外說「Markdown-first」，不說「SSOT」（避免語境誤解）
- **內部文件外洩**：規劃文件一律 `_` 前綴，避免被 build 到網站上
- **批次修正必須 dry-run**：全站 orthographic fix 前先跑 10 檔（2026-03-30 教訓：838 行被吃掉）

### Sub-agent 管理

- **一次一篇**：不要同時 spawn 4-5 個 → timeout、殭屍、檔案衝突
- **不能直接 push**：所有改動需審核
- **會留垃圾**：commit 前要 `git status` 檢查意外檔案
- **二次 Rewrite 要具體**：指定段落 + 字數，不只說「補充深度」

### CI/CD silent gap（2026-05-11 PM cycle 教訓）

- **PR-side CI ≠ main deploy CI**：PR Content Review workflow 跑的 check 跟 main branch Deploy to GitHub Pages 跑的不一樣。footnote-format / image-health hard plugin 只在後者跑。Maintainer B 路徑 hard gate 必跑 `article-health.py` 全 plugin 對 changed files，不能只靠 PR-side CI

---

## 核心信念

> **「Taiwan.md 是一次大型策展。」** — 選什麼放進來、怎麼說，才是價值。

> **「把台灣開源。」** — CC BY-SA 4.0，任何人都能取用。

> **「From AI Slop to AI Supreme。」** — 用最高品質的 AI 輔助，對抗低品質的 AI 農場。

> **「每篇文章都要讓人讀完後，比讀之前更想了解台灣。」** — 不是「台灣好棒棒」，是「台灣好複雜好有趣」。

> **「拒絕一篇投稿，跟接受一篇一樣重要。」** — 策展的價值在選擇，不在收集。

> **「能做就做完，不要一直問。」** — Default-action principle。Defer 預設要 justify，不是 default。

---

_v2.0 | 2026-05-11 twmd-maintainer-pm-211549-v2-spine — Stage spine restoration：對齊 [REWRITE-PIPELINE v5.0](REWRITE-PIPELINE.md) 範式（4 stage 線性 / Step N.M 編號 / heading 階層 H1-H4 / ASCII spine 顯化頂部 / Hard Gate Inventory 單表 / Top 5 最常忘 cheat sheet）。注入 §核心原則「能做就做完，不要一直問」default-action principle 為頂層 philosophy（對應觀察者多次校正 2026-04-28 κ / 2026-04-26 β-r3 / 2026-05-11 PM）。觸發：哲宇 2026-05-11 PM cycle 校正「這些也都 merge 啊，有什麼疑慮？」+「更新 maintainer pipeline 未來避免 defer 問題」+「參考 rewrite-pipeline 同樣梳理 maintainer-pipeline 讓步驟指示清楚精實」三條 directive。_

_最近 milestone（完整 changelog → `git log docs/pipelines/MAINTAINER-PIPELINE.md`）_：

- **v2.0**（2026-05-11 twmd-maintainer-pm-211549）— Stage spine restoration：4 stage 線性 + Step N.M + ASCII spine + §核心原則「能做就做完」default-action principle 升頂層 philosophy + CI/CD silent gap 教訓 codify
- **v1.3**（2026-05-11 ecstatic-archimedes-v2）— §collect-and-merge v2「外部 PR 也走完整 hard gate decision matrix」（原本「contributor / observer PR 永不 auto-merge」收緊為「走 §PR 審核策略 + §Close 前 hard gate decision matrix」）
- **v1.2**（2026-05-10 gracious-blackwell）— §collect-and-merge SOP 升 canonical + maintainer 1d 2x（am 09:07 + pm 21:07）+ maintainer 是 routine PR backlog SSOT 收割者
- **v1.1**（2026-04-26 β8）— §回覆 issue 必附 commit hash（已實作 vs 純討論分流）
- **v1.0**（2026-03-31）— 從 Repo Maintainer 完整手冊 + Day 1-14 實戰經驗萃取
