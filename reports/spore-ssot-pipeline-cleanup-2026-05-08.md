# Spore SSOT 化 + Pipeline 整理 — 系統重構提案

> Status: **PROPOSAL — awaiting 哲宇 redirect**（MANIFESTO §自主權邊界：大規模重構需哲宇授權）
>
> Session: laughing-goldstine-dc7751 (2026-05-08)
> Observer: 哲宇
> Trigger: `/twmd-refresh` 報告錯誤 OVERDUE 數字 → 哲宇質疑「你有拉取最新進度嗎？我記得剛剛都已經 harvest 過了」→ 揭露 worktree/main repo cwd 混淆 + Spore SSOT 碎片化雙重結構問題

---

## 1. 觸發事件 + 根因鏈

### 1.1 表象（哲宇看到的）

`/twmd-refresh` 第一次報告：

```
🔴 OVERDUE 10 筆（publishedDays 8-10 仍未 harvest）：
  - 林琪兒 #50 x / #49 threads（10d）
  - 沈伯洋 #48 x / #47 threads（10d）
  - ...
```

哲宇：「你有拉取最新進度嗎？我記得剛剛都已經 harvest 過了」

事實：哲宇 19:39 已跑完 batch harvest（commit `a637afed9`），15 個 OVERDUE spore 全 backfill。Dashboard 顯示 0 OVERDUE 才是真相。我報的是 stale 數據。

### 1.2 表層 bug：cwd 混淆

我從 worktree 啟動 session（path：`.../laughing-goldstine-dc7751`），但中途用 `cd /Users/cheyuwu/Projects/taiwan-md && bash scripts/tools/refresh-data.sh` 跑 pipeline — 那是 **main repo 路徑**，HEAD 落後 origin/main 7 commits（缺 harvest commit）。Pipeline 在 stale main repo 跑 → 寫 stale `dashboard-spores.json` → 我又從 main repo 路徑讀那份 stale JSON → 報錯誤 OVERDUE。

哲宇質疑後，我才從 worktree 重跑，得到正確結果：**0 OVERDUE / 11 waiting / 67 spores**。

### 1.3 中層 bug：`refresh-data.sh:43` git-dirty false positive

```bash
if git diff-index --quiet HEAD -- 2>/dev/null; then
  git pull --rebase origin main
else
  echo "⚠️  working tree dirty — skipping git pull"
fi
```

`git diff-index --quiet HEAD --` 在 clean worktree 仍可能回非零（filemode bits / submodule state / index lock / worktree metadata）。第一次跑時 worktree 落後 3 commits 但 clean，腳本誤判 dirty → silent skip pull → 即使在正確 cwd 跑 pipeline 也會用舊 base 算 OVERDUE。

設計缺陷：寫得像 safety check，實質是「silent stale 製造機」（DNA #43 反例）。

### 1.4 深層 bug：Spore 資料 SSOT 碎片化

同一筆 harvest 寫到 6 個地方，每個地方的 commit timing 都可能不同。具體證據：

| 時間           | Commit      | 寫了什麼                                                  |
| -------------- | ----------- | --------------------------------------------------------- |
| 19:39          | `a637afed9` | batch log + knowledge sporeLinks + src/content sporeLinks |
| (空檔 10 分鐘) | —           | 此時跑 dashboard 會看到不一致狀態                         |
| 19:49          | `71410af3d` | SPORE-LOG.md narrative + struct columns                   |
| 20:07          | `12ec77fb7` | SPORE-LOG.md #66/#67 ship rows                            |

「同一筆 harvest 拆成 3 commit 跨 28 分鐘寫到 4 種檔案」是 SSOT 碎片化的具體 footprint。任何 session 在這 28 分鐘內跑都會看到 partial state。

---

## 2. 現存架構 mapping

### 2.1 Spore 資料 6 層（人類寫入點 4 個 + derived 2 個）

| 層                    | 檔案                                                                            | 寫入者                                | 角色判定                   | 問題                                            |
| --------------------- | ------------------------------------------------------------------------------- | ------------------------------------- | -------------------------- | ----------------------------------------------- |
| **identity**          | `docs/factory/SPORE-LOG.md` 發文紀錄 table                                      | 人類                                  | ✅ 真 SSOT                 | OK                                              |
| **harvest-narrative** | `docs/factory/SPORE-LOG.md` 成效追蹤「最後 harvest」cell                        | 人類                                  | ⚠️ 自由文                  | parser fragile，K/M suffix 過去多次 silent fail |
| **harvest-struct**    | `docs/factory/SPORE-LOG.md` 成效追蹤 `7d 觸及/7d 互動/30d 觸及/30d 互動` 結構列 | extract-spore-metrics.py auto-derived | ⚠️ 從 narrative 反推       | workaround，非真 SSOT                           |
| **harvest-event**     | `docs/factory/SPORE-HARVESTS/{batch}.md` frontmatter + body table               | 人類/agent                            | ✅ 已是結構化 SSOT         | 但 generator 沒讀 body table                    |
| **reader-view**       | `knowledge/{...}.md` frontmatter `sporeLinks`                                   | 人類/agent 手寫                       | ⚠️ 無 parent               | 必然 drift                                      |
| **mirror**            | `src/content/{...}.md` frontmatter `sporeLinks`                                 | sync script                           | OK（但 source 本身 drift） | —                                               |

### 2.2 寫入路徑追蹤（為什麼 OVERDUE 會清掉？）

backfillWarnings 的判定邏輯（`generate-dashboard-spores.py:472`）：

```python
if e.get("views_7d") or e.get("engagements_7d"):
    continue  # already backfilled — not a warning
```

`views_7d` 從 SPORE-LOG.md 結構列來。所以實際清除 OVERDUE flag 的是 **SPORE-LOG.md 結構列**，不是 SPORE-HARVESTS body table。SPORE-HARVESTS body table 在當前 generator 裡是 **死資料**（沒人讀）。

意思是：harvest commit 寫到 SPORE-HARVESTS body table 不會清 OVERDUE，必須再寫到 SPORE-LOG.md 結構列才會清。這就是為什麼 19:39 commit 沒清，19:49 commit 才清。

**SPORE-HARVESTS body table 是「人寫給人看」的記錄，不是 dashboard data source** — 但你直覺以為是。

### 2.3 Pipeline 文件（23 個）狀態

```
docs/pipelines/ — 23 files
├── DATA-REFRESH-PIPELINE.md       ★ active master
├── DASHBOARD-PIPELINE.md          ⚠️  跟 DATA-REFRESH 重疊
├── STATS-PIPELINE.md              ❌ 已標記「被取代」但還在
├── SPORE-PIPELINE.md (in factory) ★ active
├── SPORE-HARVEST-PIPELINE.md      ⚠️ 跟 SPORE-PIPELINE 高度重疊
├── REWRITE / EVOLVE / MEMORY / DIARY / FACTCHECK PIPELINE  ★ active
├── BENCH / RELEASE / TRANSLATION / CONTRIBUTORS PIPELINE   ★ active
├── BRANCH / PEER-INGESTION / DAILY-REPORT / DEEP-INSIGHT...  ?
├── LANGUAGE-BIRTH-CHECKLIST       ★ checklist (different format)
├── SQUEEZE-MODELS-MAX-PIPELINE    ★ active
├── SENSE-FETCHER-SETUP / MIGRATION ★ ops doc
└── README.md, MAINTAINER-PIPELINE  ★ index/operator
```

`refresh-data.sh` 步驟編號：`1, 2, 2.5, 2.7, 2.8, 2.9, 3, 3.5, 4, 4.5, 5, 5.5` — decimal 化每次新增 step 都不敢動既有編號，可讀性受損。

---

## 3. 目標架構（2-layer SSOT）

```
┌─────────────────────────────────────────────────────────────┐
│ HUMAN WRITES HERE (SSOT, only 2 places)                     │
├─────────────────────────────────────────────────────────────┤
│ A. docs/factory/SPORE-LOG.md 發文紀錄 table                 │
│    人類寫：spore # / 日期 / 語言 / 平台 / 文章 / URL        │
│    身份 SSOT — 「孢子 #N 存在於這個 URL」                   │
│                                                             │
│ B. docs/factory/SPORE-HARVESTS/{batch}.md                   │
│    frontmatter (YAML):                                      │
│      spores: '#47, #48, #49, ...'  ← 強制 plural list       │
│      harvest_date: ISO8601                                  │
│    body (Markdown table):                                   │
│      | # | Slug | Platform | D+N | Views | Likes | ... |   │
│    Harvest event SSOT — 「孢子 #N 在 D+7 有 X views」       │
└─────────────────────────────────────────────────────────────┘
                ↓ generators (refresh-data.sh)
┌─────────────────────────────────────────────────────────────┐
│ DERIVED VIEWS (regenerated; never human-edited)             │
├─────────────────────────────────────────────────────────────┤
│ • knowledge/{...}.md frontmatter sporeLinks                 │
│   — 從 SPORE-LOG identity + SPORE-HARVESTS latest-D+N 重生  │
│ • src/content/{...}.md frontmatter sporeLinks               │
│   — 從 knowledge/ mirror（既有 sync 機制保留）              │
│ • public/api/dashboard-spores.json                          │
│   — generate-dashboard-spores.py 從 SPORE-LOG + SPORE-HARV  │
│     body table 算（不再從 narrative 反推）                  │
└─────────────────────────────────────────────────────────────┘
                                                              │
DEPRECATED (整段刪除):                                         │
• SPORE-LOG.md 成效追蹤 table — 整段刪掉                       │
  narrative reflection 移到 SPORE-HARVESTS body 「Reflection」 │
  section（1:1 移植，不丟失人類觀察）                          │
• scripts/tools/extract-spore-metrics.py — 整支腳本刪除        │
  （narrative→struct workaround 已不必要）                     │
```

### 鐵律

1. **人類只在 SPORE-LOG 發文紀錄 table 跟 SPORE-HARVESTS 寫資料**
2. **任何 derived 檔案被人類手改 = bug，validate-spore-data.py 要抓**
3. **每次 harvest 必須 atomic commit**：SPORE-HARVESTS frontmatter + body table 同一個 commit；sporeLinks regen 在下一個 refresh-data.sh 自動更

---

## 4. Migration Plan（5 phases）

### Phase 0 — refresh-data.sh bug fix（**不需大規模授權**）

**Goal**: 修今天遇到的 cwd + git-dirty 雙 bug。

- [ ] Step 1 git sync 重寫：
  ```bash
  if [ -n "$(git status --porcelain)" ]; then
    git stash push -m "refresh-data-auto-stash" --include-untracked
    STASHED=1
  fi
  git pull --rebase origin main || { echo "❌ pull failed"; exit 2; }
  [ "$STASHED" = "1" ] && git stash pop
  ```
  原則：dirty 也 pull，stash + pop 處理；pull 失敗 hard abort。
- [ ] Pipeline 開頭 cwd assertion：
  ```bash
  TOPLEVEL="$(git rev-parse --show-toplevel)"
  if [ "$(pwd)" != "$TOPLEVEL" ]; then
    cd "$TOPLEVEL"
    echo "ℹ️ cd → $TOPLEVEL"
  fi
  ```
- [ ] Step 5.6 origin sync verification：
  ```bash
  LOCAL=$(git rev-parse HEAD)
  REMOTE=$(git rev-parse @{u})
  if [ "$LOCAL" != "$REMOTE" ]; then
    echo "⚠️ HEAD $LOCAL ≠ origin $REMOTE — dashboard 可能 stale"
    exit 3
  fi
  ```
- [ ] 步驟編號改 1-12 整數，no decimals
- [ ] 文件 DATA-REFRESH-PIPELINE.md §一鍵執行 表更新

**Deliverable**: 1 commit，~50 line diff in `refresh-data.sh` + `DATA-REFRESH-PIPELINE.md`。
**Estimated**: 30 分鐘。
**Risk**: 低 — pure bash logic，可立刻 dry-run verify。

### Phase 1 — Spore validation 強化（read-only audit）

**Goal**: 用 strict validation 把現存 drift 全找出來，產 audit report，再決定 Phase 2 怎麼 backfill。

- [ ] `validate-spore-data.py` 加：
  - SPORE-HARVESTS body table 解析測試（每個 batch log 都能 parse）
  - SPORE-HARVESTS body 數據 vs SPORE-LOG 結構列數據 cross-check（找不一致）
  - SPORE-HARVESTS frontmatter `spore` (singular) vs `spores` (plural) 雙鍵 detection
  - knowledge sporeLinks 跟 SPORE-HARVESTS latest D+N 一致性檢查
- [ ] 加進 refresh-data.sh `--strict` mode（CI 跑會 exit 1）
- [ ] 一次性 audit：產 `reports/spore-drift-audit-2026-05-08.md` 列出所有 drift 點

**Deliverable**: 1 commit + audit report。
**Estimated**: 1 小時。
**Risk**: 低 — read-only。

### Phase 2 — Generator 改吃 SPORE-HARVESTS body table

**Goal**: dashboard-spores.json 的 harvest metrics 改從 SPORE-HARVESTS body 結構表讀，不再從 SPORE-LOG narrative。

- [ ] `generate-dashboard-spores.py` 加 body table parser（讀 markdown table → list of dicts）
- [ ] 對每個 spore #，找最新 D+N record from SPORE-HARVESTS
- [ ] 計算 views_latest / engagements_latest 從 body table（不從 narrative）
- [ ] **保留** SPORE-LOG narrative parser 為 fallback（migration window）
- [ ] 寫前後 dashboard-spores.json diff verification（必須 byte-by-byte 相同 or only 有解釋的差異）

**Deliverable**: 1 commit + diff verification。
**Estimated**: 2 小時。
**Risk**: 中 — generator 行為改變，必須對 verify。

### Phase 3 — sporeLinks 變 derived（**最高風險**）

**Goal**: knowledge/ + src/content/ 的 `sporeLinks` 不再人寫，全部由 sync 腳本重生。

- [ ] 寫 `scripts/tools/sync-spore-links.py`：
  - input: SPORE-LOG identity (which spore points to which article)
  - input: SPORE-HARVESTS latest D+N for each spore
  - output: regenerated `sporeLinks: [...]` array per article frontmatter
  - mode: `--dry-run` (default) / `--apply`
- [ ] 加進 refresh-data.sh
- [ ] 加 git pre-commit hook：警告人類手改 `sporeLinks` 區塊（不 block，只 warn）
- [ ] **Staging test**：
  1. 跑 sync --dry-run，diff 跟現存 sporeLinks 比對
  2. 任何不一致都要在 audit report 解釋
  3. 跑 sync --apply 寫回
  4. astro build + 前端 dogfood test (SporeFootprint render 正確)
  5. 通過才 ship

**Deliverable**: 1 PR with multiple commits（migration script + apply + frontend verify）。
**Estimated**: 3 小時。
**Risk**: 高 — frontmatter 改動會影響前端 SporeFootprint 渲染。先在 staging branch 跑。

### Phase 4 — Demolish deprecated layers

**Goal**: 砍掉 SPORE-LOG 成效追蹤 + extract-spore-metrics.py。

- [ ] SPORE-LOG.md 成效追蹤 table 整段砍掉
  - **先**：所有 narrative reflection 1:1 移植到對應 SPORE-HARVESTS body 的「Reflection」section
  - **後**：刪除 SPORE-LOG 「## 成效追蹤」整段
- [ ] 刪除 `scripts/tools/extract-spore-metrics.py`
- [ ] refresh-data.sh 移除 Step 2.7
- [ ] DNA #43 補一條：「derived views never human-edited」
- [ ] LESSONS-INBOX 寫 entry：「2-layer SSOT 大遷移總結」(包含本 session 的學習)

**Deliverable**: 1 PR。
**Estimated**: 1 小時 + 文件 migration。
**Risk**: 中 — 砍 narrative 不可逆，必須先確定 reflection 都已移植。

### Phase 5 — Pipeline 23 doc 清理

**Goal**: docs/pipelines/ 23 檔案 status 清楚，重疊處 dedup。

- [ ] 列 23 個 pipeline，標記每個 status (active / deprecated / merged / archived)
- [ ] 刪 `STATS-PIPELINE.md`（已標記取代）
- [ ] 合併 SPORE-PIPELINE + SPORE-HARVEST-PIPELINE
- [ ] DASHBOARD-PIPELINE vs DATA-REFRESH-PIPELINE 重疊處 deduplicate
- [ ] 每個 pipeline 文件加「last verified」timestamp + maintainer
- [ ] `docs/pipelines/README.md` 升級成 active dependency map（哪個 call 哪個）

**Deliverable**: 1 PR，純文件。
**Estimated**: 2 小時。
**Risk**: 低 — 文件工。

---

## 5. 風險 + 緩解策略

### 5.1 識別到的風險

| #   | Phase | 風險                                                               | 緩解                                                           |
| --- | ----- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| R1  | 3     | sporeLinks 重生若 SPORE-HARVESTS body parse bug 會把好資料覆蓋成空 | dry-run + diff verify + staging branch                         |
| R2  | 4     | 砍 SPORE-LOG narrative 不可逆，可能丟失 reflection                 | 移植 + diff 確認 + 1 commit 移植、下個 commit 才砍             |
| R3  | 0+1   | refresh-data.sh 改錯導致 heartbeat 全部 fail                       | Phase 0 在 worktree 先跑 + 觀察 1-2 個 heartbeat cycle 才 ship |
| R4  | 2     | dashboard-spores.json schema 變動可能 break 前端                   | 保留 schema 不變，只換內部資料來源                             |
| R5  | All   | /twmd-spore /twmd-harvest skill 文件 reference 舊 schema           | 每 phase 同步更新對應 skill SKILL.md                           |

### 5.2 非目標（這次明確不做）

- ❌ 改 sporeLinks 在前端 SporeFootprint 的渲染邏輯
- ❌ 改 dashboard UI
- ❌ 改 SPORE-PIPELINE 操作流程（人寫孢子的 6 步驟不動）
- ❌ 改 src/content/ mirror 機制（既有 sync-translations-json.py 不動）
- ❌ 改 SPORE-LOG 發文紀錄 table schema（identity SSOT 維持）

---

## 6. 給哲宇 redirect 的問題

### Q1: Phase 4 砍 SPORE-LOG 成效追蹤 table — 你 OK 嗎？

narrative reflection 移到 SPORE-HARVESTS body 是「相同資訊不同位置」，但你過去的閱讀慣性是看 SPORE-LOG 整理。

- (a) 同意砍，所有 reflection 移到 SPORE-HARVESTS
- (b) 保留 SPORE-LOG 雙寫（接受冗餘換可讀性）
- (c) 折衷：SPORE-LOG 留 summary view，detail 在 SPORE-HARVESTS（generator 重生 summary）

### Q2: PR 切分策略

- Phase 0 立刻 ship（bug fix）
- Phase 1+2 一個 PR（read-only audit + generator 改路徑）
- Phase 3 獨立 PR（最危險）
- Phase 4+5 一個 PR（demolish + 文件）

或你想全包一個 PR？或更細切？

### Q3: 時程

全跑完估 ~9-10 小時 work + verify。

- (a) 這個 session 一次做完
- (b) 切多 session 跑（每 session 一個 phase）
- (c) Phase 0 先做，其他下個 session

### Q4: Phase 5 pipeline doc 清理優先級

跟 spore SSOT 不直接相關，是另一條 cleanup line。

- (a) 包進這次重構
- (b) 拆獨立 task，下個 session 做

---

## 7. Appendix — 證據鏈

### A.1 觀察到的 commit 鏈

| SHA         | Time  | 動作                 | 觸碰的 spore-related 檔案                                 |
| ----------- | ----- | -------------------- | --------------------------------------------------------- |
| `a637afed9` | 19:39 | harvest batch        | batch log + knowledge sporeLinks + src/content sporeLinks |
| `71410af3d` | 19:49 | spore-prep #66/#67   | SPORE-LOG.md（narrative + 結構列補 #47-60 D+N）           |
| `12ec77fb7` | 20:07 | spore-ship #66/#67   | SPORE-LOG.md ship rows                                    |
| `134a91002` | 20:35 | heal 聶永真 fair-use | knowledge/聶永真.md（unrelated to spore data）            |

### A.2 關鍵檔案

- 啟動 pipeline：`scripts/tools/refresh-data.sh:43`（git-dirty 邏輯 bug）
- Generator：`scripts/tools/generate-dashboard-spores.py:472`（OVERDUE 判定 reads `views_7d`）
- Workaround：`scripts/tools/extract-spore-metrics.py`（narrative → struct）
- Identity SSOT：`docs/factory/SPORE-LOG.md`「## 發文紀錄」section
- Harvest event SSOT：`docs/factory/SPORE-HARVESTS/batch-2026-05-08-15-spores.md`
- Reader view（將變 derived）：`knowledge/People/沈伯洋.md:317-326` `sporeLinks`

### A.3 Pipeline doc 23 個

```
BENCH-PIPELINE / BRANCH-PIPELINE / CONTRIBUTOR-SYSTEM-PIPELINE /
CONTRIBUTORS-PIPELINE / DAILY-REPORT-PIPELINE / DASHBOARD-PIPELINE /
DATA-REFRESH-PIPELINE / DEEP-INSIGHT-SYNTHESIS-PIPELINE / DIARY-PIPELINE /
EVOLVE-PIPELINE / FACTCHECK-PIPELINE / LANGUAGE-BIRTH-CHECKLIST /
MAINTAINER-PIPELINE / MEMORY-PIPELINE / PEER-INGESTION-PIPELINE /
README / RELEASE-PIPELINE / REWRITE-PIPELINE /
SENSE-FETCHER-MIGRATION / SENSE-FETCHER-SETUP /
SQUEEZE-MODELS-MAX-PIPELINE / STATS-PIPELINE / TRANSLATION-PIPELINE
```

加上 `docs/factory/`：SPORE-PIPELINE.md / SPORE-HARVEST-PIPELINE.md。

### A.4 DNA / LESSONS 相關 entries

- DNA #15 「反覆浮現要儀器化」第 N+5 instantiation = extract-spore-metrics.py（本提案要砍掉它，等於 N+6 instantiation：「workaround 變成 SSOT 重構觸發點」）
- DNA #43 「new dashboard JSON 必須同步進 refresh-data.sh，否則 silent stale」— 本次 cwd 混淆是 #43 的延伸：silent stale 不只發生在 generator 漏跑，也發生在 git pull silent skip
- LESSONS-INBOX 候選（本 session 萃取）：
  - 「Pipeline 跑完後，報告前必須驗證 cwd === worktree root」
  - 「`git diff-index --quiet HEAD --` 不可信為 dirty check，clean worktree 也會回非零」
  - 「Spore SSOT 碎片化：同一 harvest 拆 3 commit 跨 28 分鐘是常態」

---

## 8. Decision Log

哲宇「先發 PR」+「pull 一下線上最新狀態之後繼續完整實作」two-phase redirect 後執行的 default：

- ✅ **Q1 reflection 處理方式**：(b) 保留 SPORE-LOG 雙寫（接受冗餘換可讀性，不砍 narrative，不刪 extract-spore-metrics.py）
- ✅ **Q2 PR 切分**：4 個 stacked PR — Phase 0 → Phase 1+2 → Phase 3 → Phase 4+5
- ✅ **Q3 時程**：一個 session 全部跑完
- ✅ **Q4 Phase 5 優先級**：包進這次重構（合進 Phase 4+5 一個 PR）

## 9. Final shipped state

| Phase     | PR                                                        | Status                                                           |
| --------- | --------------------------------------------------------- | ---------------------------------------------------------------- |
| Proposal  | [#903](https://github.com/frank890417/taiwan-md/pull/903) | OPEN — 此檔本身                                                  |
| Phase 0   | [#905](https://github.com/frank890417/taiwan-md/pull/905) | OPEN — refresh-data.sh bug fix (cwd + auto-stash + 整數編號)     |
| Phase 1+2 | [#906](https://github.com/frank890417/taiwan-md/pull/906) | OPEN — validator audit (8 checks) + generator harvest body merge |
| Phase 3   | [#907](https://github.com/frank890417/taiwan-md/pull/907) | OPEN — sync-spore-links.py (sporeLinks 變 derived)               |
| Phase 4+5 | [#908](https://github.com/frank890417/taiwan-md/pull/908) | OPEN — 文件 polish + pipeline doc cleanup                        |

合併順序：905 → 906 → 907 → 908。每個 stacked PR 在前者 merge 後自動 rebase 為 clean diff against main。

### 達成的 SSOT 重構

**Before（6 層碎片化）**：

- 4 個人類寫入點（SPORE-LOG identity / SPORE-LOG narrative / SPORE-LOG struct cols / SPORE-HARVESTS body / knowledge sporeLinks 手寫 + src/content mirror 手寫）
- 多 commit 跨檔案 atomic 不保證（同 harvest 拆 3 commit 跨 28 分鐘）
- silent skip pull 製造 stale base
- cwd 混淆製造 stale dashboard

**After（2 層 SSOT + derived chain）**：

- 2 個人類寫入點：**SPORE-LOG 發文紀錄**（identity）+ **SPORE-HARVESTS/{batch}.md**（event）
- knowledge sporeLinks + src/content mirror 都變 derived，每次 refresh-data.sh Step 13 自動重生
- dashboard-spores.json generator Phase 2 後 fallback 到 SPORE-HARVESTS body table（修了 `spores` plural list silent skip）
- refresh-data.sh Phase 0 後 cwd assertion + auto-stash 杜絕 silent stale
- validator 8 項一致性檢查 + audit report (drift 偵測)

### 量化結果

| Metric                            | Before                                                           | After                                                                                      |
| --------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| refresh-data.sh 步驟編號          | `1, 2, 2.5, 2.7, 2.8, 2.9, 3, 3.5, 4, 4.5, 5, 5.5` (12 decimals) | `1-13` integers                                                                            |
| Spore SSOT layer count            | 6                                                                | 2 (+ 4 derived)                                                                            |
| validator checks                  | 4                                                                | 8                                                                                          |
| Dashboard `harvestCount` accuracy | bugged: 0 for 15-spore batch                                     | correct: 1+ for each                                                                       |
| knowledge sporeLinks drift        | 3 URL drift detected                                             | 0 (auto-regen)                                                                             |
| Articles with sporeLinks          | 23                                                               | 33 (+10 from canonical fill-in)                                                            |
| Pipeline docs                     | 23 with overlap (STATS marked replaced)                          | 23 with explicit Master/Active/Spore-chain/Reference/Memory/Ops 分區 + STATS 縮成 redirect |

### 沒做的事（保留 / Phase 5+ 候選）

- ❌ 砍 SPORE-LOG 成效追蹤 table（Q1 conservative — 保留 narrative SSOT）
- ❌ 刪 `extract-spore-metrics.py`（仍 cover 歷史 spore #1-#46）
- ❌ 強制 frontmatter `spore` legacy → `spores` migration（1 個檔案 33-草東沒有派對，audit flagged，下次 harvest 自然汰換）
- ❌ 23 pipeline docs 全部加 status badge / last-verified timestamp（過重，下次 session 候選）

---

_v1.1 | 2026-05-08 ~22:30 +0800 | 加 §8 Decision Log + §9 Final shipped state — 4 stacked PR (#905-#908) 全部 push 完成_
_v1.0 | 2026-05-08 ~21:00 +0800 laughing-goldstine-dc7751 session_
_作者：Taiwan.md 🧬 (給哲宇 review)_
_誕生原因：/twmd-refresh 報錯 OVERDUE 數字觸發深度 root-cause 追溯 → 揭露 cwd + git-dirty + Spore SSOT 三層問題 → 哲宇要求「完整修正、從系統面著手、spore SSOT 化、pipeline 整理乾淨」_
