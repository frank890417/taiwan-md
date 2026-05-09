# Worktree 命名標準：YYYYMMDD-{purpose-title}

> **誕生 session**：laughing-goldstine post-finale (2026-05-09 ~13:50 +0800)
> **觸發**：哲宇 redirect「以後 worktree 命名統一化，YYYYMMDD-[PURPOSE-TITLE]，這樣記錄到最核心的工作方式，不然一堆沒意義的 worktree 單字會污染歷史」
> **延伸**：[reports/session-id-naming-2026-05-04.md](session-id-naming-2026-05-04.md) charming-mclaren session 拍板 session-id schema 後的 next-layer canonical 化
> **Status**: design canonical → 對應工具修補（session-id.sh 雙 strip）同 PR ship

---

## 一、問題敘述

### 1.1 Auto-codename 工廠的歷史污染

Claude Code 自動 spawn worktree 時用 `{adjective}-{name}-{hash}` 命名（`charming-mclaren` / `laughing-goldstine` / `magical-feynman` / `intelligent-khayyam`）。優點：collision-free。缺點：

| 維度               | Auto-codename       | 結果                                       |
| ------------------ | ------------------- | ------------------------------------------ |
| **語意內容**       | 0 — 純隨機詞        | 三個月後沒人記得 charming-mclaren 在做什麼 |
| **時序排序**       | 字母排序 ≠ 時間排序 | `ls .claude/worktrees/` 看不出哪個先發生   |
| **Grep 友善**      | 沒 anchor 詞        | 翻 git log 找「babel 升級的那次」要全文搜  |
| **PR branch 污染** | 直接 reuse codename | git log 主時間軸滿是無語意短語             |

**累積效應**：8 個月下來 50+ codename worktrees / branch / session-id handle，回看歷史時每個 reference 都要先翻譯 codename → 實際做的事。哲宇明確指：「污染歷史」。

### 1.2 既有 SOP 已經部分處理但沒到 worktree 層

[`feedback_session_id_handle_naming.md`](~/.claude/projects/-Users-cheyuwu-Projects-taiwan-md/memory/feedback_session_id_handle_naming.md)（2026-05-04 jovial-feistel）已經規定：

> session-id 的 `{handle}` 部分**禁止 auto-codename**，只接受希臘字母 or 短描述標題（kebab-case 1-3 詞）。

但這只規範 session-id handle（memory/diary filename 的 suffix），沒規範 **worktree directory name 本身**。session-id.sh `auto-detect handle` 路徑會從 worktree path 推 handle —— 結果只要 worktree 還叫 `charming-mclaren`，handle 就還是 codename。源頭沒堵。

---

## 二、規範

### 2.1 Worktree 目錄命名格式

```
.claude/worktrees/YYYYMMDD-{purpose-title}/
```

| 欄位              | 規則                                              | 範例                                           |
| ----------------- | ------------------------------------------------- | ---------------------------------------------- |
| `YYYYMMDD`        | 開 worktree 當日本地日期（Asia/Taipei），無連字號 | `20260509`                                     |
| `{purpose-title}` | kebab-case，1-3 詞，描述本批工作核心              | `babel-batch2`, `harvest-cadence`, `bench-prc` |

**完整範例**：

- `20260509-babel-batch2`（本 worktree 之後新建批次走這個格式）
- `20260510-harvest-d3-d7`（聶永真 / 黃魚鴞 D+3/D+7 cadence）
- `20260512-bench-prc`（Sovereignty-Bench-TW PRC 模型 refusal 量化）
- `20260515-evolve-pipeline-v3`（如果 EVOLVE pipeline 進 v3）

**反例**：

- ❌ `charming-mclaren` / `laughing-goldstine` / `magical-feynman`（無語意 codename）
- ❌ `babel-batch2`（缺日期，混在 50+ worktree 之中無法時序定位）
- ❌ `2026-05-09-babel`（連字號分開的日期 + 語義部分混亂；YYYY-MM-DD 在後續多語混排不易視別）
- ❌ `20260509-feature-improvement`（purpose-title 太模糊，「improvement」沒 carry 訊息）

### 2.2 命名階段檢驗清單

開 worktree 前自問三題：

1. **此 worktree 涵蓋的工作是哪一批？** → 一句話能講清楚就 OK，講不清楚先想清楚目標再開
2. **這 1-3 詞放在 git log / `ls` / PR title 是否自我解釋？** → 半年後自己看得懂嗎？
3. **跟既有 worktree 名是否語意衝突？** → 如「babel」已經出現在多個歷史 worktree，本批要 disambiguate（加 `batch2` / `v3` / domain prefix）

### 2.3 對應 session-id handle 推導

`scripts/tools/session-id.sh` v2（2026-05-09 升級）handle 推導鏈：

```
1. CLI arg ($1)            — 顯式優先
2. $SESSION_HANDLE env var — cron 注入
3. Worktree dirname        — strip leading YYYYMMDD- + trailing -{hash}
                             例：20260509-babel-batch2-a1b2c3 → babel-batch2
4. fallback `manual`
```

對 `YYYYMMDD-{purpose-title}` 命名 worktree，session-id 自然落在 `YYYY-MM-DD-HHMMSS-{purpose-title}` — 日期不重複、handle 純語意。

對歷史 codename worktrees（grandfathered），auto-detect 仍會 fallback 回 codename — 維持兼容，但不鼓勵新建。

### 2.4 Grandfathering 規則

**歷史 worktrees 不重命名**（per §時間是結構修補協議：保留錯誤敘事作為證據鏈）：

- 既有 codename worktree 維持（如本 worktree `laughing-goldstine-dc7751`）
- 既有 branch 名（如 `finale/laughing-goldstine`）維持
- 既有 memory/diary filename（如 `2026-05-09-133952-laughing-goldstine.md`）維持

規則**從下個 worktree 創建起 apply**。本 PR 之後新開的 `git worktree add` 必須遵守 §2.1 格式。

---

## 三、為什麼是「日期前綴」而不是「純 purpose-title」

| 選擇                              | 優點                                                                           | 缺點                                                                                               |
| --------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| **`{purpose-title}` only**        | session-id handle 最短                                                         | 同 purpose 多次發生（babel-batch / babel-batch2 / babel-batch3）需手動 disambiguate；`ls` 失去時序 |
| **`YYYYMMDD-{purpose-title}`** ✅ | `ls` 自動時序 + 同 purpose 不同日 collision-free + handle stripping 後仍純語意 | 目錄名稍長（多 9 chars）                                                                           |
| **`YYYY-MM-DD-{purpose-title}`**  | 日期可讀性更高                                                                 | 跟 session-id 格式重疊太接近，視覺易混淆                                                           |

選 `YYYYMMDD-` 是明確 trade-off：以 9 chars 換時序 + collision-free + 規範一致。

---

## 四、對應 SOP / 工具修補

| 修補對象                                                    | 動作                                                             |
| ----------------------------------------------------------- | ---------------------------------------------------------------- |
| `scripts/tools/session-id.sh`                               | v2 雙 strip：trailing `-{hash}` + leading `YYYYMMDD-`            |
| `docs/semiont/DNA.md #9`                                    | 「長任務先開 worktree」延伸命名標準段落                          |
| `reports/worktree-naming-2026-05-09.md`                     | **本檔** — canonical                                             |
| `~/.claude/.../memory/feedback_session_id_handle_naming.md` | 補充：**worktree dir 也禁 codename**                             |
| `CLAUDE.md`                                                 | 不動 — DNA #9 + report 已 cover；CLAUDE.md 是 boot 層不是 SOP 層 |

---

## 五、驗證

### 5.1 session-id.sh 單元驗證

```bash
$ bash scripts/tools/session-id.sh babel-batch2
2026-05-09-135313-babel-batch2

$ SESSION_HANDLE=γ bash scripts/tools/session-id.sh
2026-05-09-135313-γ

# 模擬 strip pipeline（不實際 cd 到 worktree）：
worktree=20260509-babel-batch2-a1b2c3 → handle=babel-batch2  ✅
worktree=20260509-babel-batch2        → handle=babel-batch2  ✅（無 trailing hash）
worktree=charming-mclaren-7d79a7      → handle=charming-mclaren  ✅（grandfathered）
worktree=20260509                     → handle=manual  ✅（純日期防呆）
```

### 5.2 Boundary 案例

- **同日多 worktree**：`20260509-babel-batch2` + `20260509-harvest-d3` 各自獨立 — `ls` 仍時序 + collision-free
- **跨日延續工作**：worktree 開於 5/9（`20260509-babel-batch2`），work 跨到 5/12 — 不重命名（worktree 是工作單位不是日記），以開啟日為錨
- **長期 worktree（experiment branch）**：如 `coral-reef-p5`，本來就不是 session worktree，不適用本規範 — 只規範 finale / batch / harvest 等 session 性質的 worktree

---

## 六、最後一哩：把這條規則進到肌肉記憶

DNA #15 第 N+1 次驗證：**規則寫了 ≠ apply 了**。

對應儀器化：

- (a) `session-id.sh` 雙 strip — **工具 enforce**：即使 worktree 用 codename，session-id 還是強制走推導鏈
- (b) DNA #9 內嵌段落 — **文件 enforce**：每次讀 DNA 都會看到
- (c) 本 report — **canonical reference**：未來 session 撞同問題的 lookup point
- (d) `feedback_worktree_naming` user-memory — **boot-time enforce**：每個 session 開頭 user-memory load 時都會看到

四層儀器化（工具 + DNA + canonical doc + user-memory）已超過 DNA #15「自律 ≠ 閘門」的單層覆蓋。

---

🧬

_v1.0 | 2026-05-09 14:00 +0800 laughing-goldstine post-finale session_
_誕生原因：哲宇 finale 後 redirect「以後 worktree 命名統一化 YYYYMMDD-[PURPOSE-TITLE]」+ session-id naming 規範 5/4 後一直只 cover handle 沒 cover 源頭 worktree dir_
_核心觀察：codename worktree 的 8 個月歷史污染是「視覺長期錯覺」級別 bug — 大家看慣了以為是設計，哲宇從外部觀察才看出_
