---
title: 'sync.sh 架構演化策略：knowledge/ → src/content/ 投影管線的長期解法'
session: '2026-05-12-001000-admiring-montalcini-post-finale'
author: 'Taiwan.md (Semiont)'
date: 2026-05-12
type: 'architectural-design-report'
context: '哲宇 prompt — 先 /twmd-become 然後分析 sync.sh 缺口的長期最佳解法並歸檔'
trigger: '2026-05-11 cleanup 過程中跑 sync.sh 揭露 2801 file drift + 10 篇 contributor 文章 silent missing from site'
upstream_canonical:
  - 'docs/semiont/MANIFESTO.md'
  - 'docs/semiont/DNA.md'
  - 'docs/semiont/ROUTINE.md'
  - 'docs/pipelines/DATA-REFRESH-PIPELINE.md'
status: 'draft → 等觀察者決策'
---

# sync.sh 架構演化策略

> 投影管線（`knowledge/` SSOT → `src/content/` derived protein）目前的儀器化缺口分析 + 八個解法候選 + 推薦組合 + Migration plan

## 一、觸發事件

2026-05-11 晚間 cleanup session 後，哲宇要求「判斷跑 sync 之後產生的檔案到底有沒有需要 commit 還是可以 ignore」。實測 `bash scripts/core/sync.sh` 在 working tree clean 的 main 上產生：

- **2801 個 `M` tracked file diff**：99% 是 `sourceCommitSha` / `sourceContentHash` / `translatedAt` metadata 漂移（每次 main 移動就漂）+ frontmatter 引號正規化（`category: Art → 'Art'`）+ 少量真內容（footnote 重排）
- **10 個 `??` untracked**：對應 8 篇 contributor PR (`#968 #1005-1009 #1019 #1025`) 已 merge 到 `knowledge/` 但 `src/content/` 投影**從未產生**，網站 build 不到 → 文章已存在卻沒露臉

10 篇 untracked 已在 `f2a2f3eef` 補 commit + push。2801 file drift 已 `git checkout` revert，等待架構解。

## 二、根因 + DNA 對應

根因：**`sync.sh` 沒被儀器化進任何生命週期觸發點**（工具本身行為正常）。系統現況：

```
                      ┌─────────────────────────────────┐
                      │ contributor / Semiont PR        │
                      │ 改 knowledge/{lang}/X/Y.md      │
                      └────────────┬────────────────────┘
                                   │ merge to main
                                   ▼
              ┌──────────────────────────────┐
              │ main has new knowledge/      │
              │ src/content/ 仍是舊狀態      │
              └──────────────┬───────────────┘
                             │
        ┌────────────────────┼─────────────────────┐
        ▼                    ▼                     ▼
  ❌ refresh-data.sh    ❌ pre-commit hook    ❌ CI workflow
   12 步沒 sync.sh      無 sync.sh trigger    不跑 sync.sh
        │                    │                     │
        └────────────────────┴─────────────────────┘
                             │
                             ▼
              ┌──────────────────────────────┐
              │ 結果：src/content/ silent stale│
              │ Astro build 看不到新文章      │
              │ 網站缺料 8 天 (PR #968 起)    │
              └──────────────────────────────┘
```

**DNA 對應分析**（5 條反射同時 fire）：

| DNA #   | 反射                                                            | 本案 instantiation                                                              |
| ------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **#43** | 新 dashboard JSON 必須同步進 refresh-data.sh，否則 silent stale | sync.sh 是同一 pattern — 衍生資料沒進 refresh-data 就會 silent stale            |
| **#15** | 反覆浮現要儀器化（11 次驗證）                                   | sync.sh gap 是 #N 次驗證；觀察者每次 cleanup 都看到 dirty src/content/          |
| **#52** | Immune system 沒在 fail loud 比缺 immune system 更危險          | refresh-data Step 10 已 verify dashboard freshness，沒 verify src/content/      |
| **#50** | Pipeline auto-detection + full-read                             | sync.sh 沒在任何 pipeline canonical 提到，Semiont session 主動跑 = 觀察者要提醒 |
| **#54** | Routine 飛輪 5-stage lifecycle                                  | sync.sh 該變成 routine 自動清 entropy 的工作，不是觀察者 push 觸發              |

MANIFESTO §6 鐵律「knowledge/ 是唯一的 DNA，永遠不要直接改蛋白質」**已經被全 contributor 遵守**（PR 都只動 knowledge/）。架構缺口是「轉錄機制沒被觸發」，不是「有人違反鐵律」。

## 三、解空間枚舉（8 個候選方案）

### A | prebuild hook（npm run prebuild 加 sync.sh）

**做法**：`package.json` 加 `"prebuild:sync": "bash scripts/core/sync.sh"` 進 `run-p prebuild:*` 序列。

| 維度               | 評估                                                               |
| ------------------ | ------------------------------------------------------------------ |
| 觸發點             | 每次 `npm run dev` / `npm run build` / CI build                    |
| 解決 silent stale? | ✅ Build 永遠 see fresh src/content/                               |
| Drift 可見性       | 開發時 `git status` 仍會看到 thousands of `M`（更糟）              |
| Build time         | +5-10s（4236 file cp + frontmatter normalize）                     |
| 語意純度           | 弱 — prebuild 在做 generation（API / 索引），sync 是 transcription |
| Fresh clone        | ✅ 首次 dev 自動 sync                                              |
| Routine 整合       | ✗ 跟 routine 飛輪解耦                                              |

### B | refresh-data.sh Stage 0+（routine 飛輪整合）

**做法**：`refresh-data.sh` Step 1（git sync）之後加 Step 1.5「sync.sh + commit if drift」。

| 維度            | 評估                                                 |
| --------------- | ---------------------------------------------------- |
| 觸發點          | data-refresh am (04:14) / pm (00:33) — 1d 2x         |
| 鮮度延遲        | ≤ 12 hr（contributor PR merge 後最多等 12 hr）       |
| 飛輪整合        | ✅ 跟現有 routine cadence 對齊                       |
| DNA #43 pattern | ✅ 跟 dashboard JSON 同樣的整合方式                  |
| Fresh clone     | ✗ 第一次 clone 仍需手動跑 sync.sh                    |
| 風險            | routine drift 風險：sync.sh 失敗 → src/content/ 卡死 |

### C | gitignore src/content/ + CI auto-sync

**做法**：移除 `src/content/` 4568 files 出 git，加 `.gitignore`；CF Pages build step 先跑 sync.sh。

| 維度           | 評估                                                                 |
| -------------- | -------------------------------------------------------------------- |
| SSOT 純度      | ✅ 終極純粹（knowledge/ 真的是唯一 source）                          |
| Migration cost | ❌ 大量（4568 files untrack + 文檔 / contributor 重新教育）          |
| Build 依賴     | CI 一定要跑 sync.sh，依賴上升                                        |
| PR diff 可讀性 | ✅ 改善（PR 只看 knowledge/）                                        |
| Git history    | 失去 src/content/ 的歷史 grep 能力（但 git history 對應 knowledge/） |
| Fresh clone    | ❌ 第一次 dev 必須先跑 sync.sh                                       |
| Rollback 難度  | 高（需要 force-add 回來）                                            |

### D | pre-commit hook 自動 sync

**做法**：`.husky/pre-commit` 偵測 staged `knowledge/**/*.md`，自動跑 sync.sh 並 add 對應 `src/content/`。

| 維度             | 評估                                                          |
| ---------------- | ------------------------------------------------------------- |
| 觸發點           | 每次 commit 動 knowledge/ 時                                  |
| 原子性           | ✅ knowledge/ + src/content/ commit 一起                      |
| Commit 速度      | 慢 +5-10s（除非配 incremental sync 降到 <1s）                 |
| Contributor 體驗 | 不熟 sync 概念 → 困惑，但 hook silent 跑 contributor 感覺正常 |
| 風險             | sync.sh 失敗 → contributor commit 卡住，需 fallback           |

### E | maintainer pipeline 加 sync gate

**做法**：`/twmd-maintainer` routine 在 PR review 時跑 sync.sh，diff 跟 src/content/ 不一致 → request changes 或自動 fix-on-merge。

| 維度      | 評估                                                              |
| --------- | ----------------------------------------------------------------- |
| 觸發點    | maintainer am (09:07) / pm (21:07) — 收割 PR 時                   |
| 鮮度延遲  | ≤ 12 hr                                                           |
| Scope     | 只 cover routine collect-and-merge 的 PR，不 cover 觀察者直 merge |
| 跟 B 重複 | maintainer 是 PR 收割者，已經做類似工作                           |

### F | sync.sh incremental refactor

**做法**：sync.sh 改成 `git diff --name-only HEAD` 取改動 file list，只 cp 改動的；frontmatter normalize 也只跑改動的。

| 維度          | 評估                                                 |
| ------------- | ---------------------------------------------------- |
| 性能          | 4236 file cp → typically <100 file cp（>40x faster） |
| Idempotence   | 多輪跑同 knowledge/ state → 同 src/content/ output   |
| 為其他層鋪路  | ✅ B / D 都需要 sync 快才能整合                      |
| 風險          | first run / cold cache 仍需 full sync 邏輯 fallback  |
| Refactor cost | Medium — sync.sh 主邏輯重寫，需 dogfood 驗證         |

### G | GitHub Action 自動補 sync PR

**做法**：knowledge/ 改動 merge 後，GitHub Action 自動跑 sync.sh + 開「[bot] sync src/content/」PR。

| 維度      | 評估                                    |
| --------- | --------------------------------------- |
| 觸發點    | knowledge/ 改動 push 到 main 後         |
| Async     | 多一輪 PR，不影響 contributor 流程      |
| 跟 B 重複 | Routine 飛輪已經要做這事，多此一舉      |
| Setup     | 需 GH Actions workflow + bot token 配置 |

### H | sourceCommitSha 重新設計（讓 sync.sh 真 idempotent）

**做法**：把 `sourceCommitSha` 改成「最後改 zh source 的 commit SHA」（用 `git log -1 --format=%H -- knowledge/Category/X.md` 算），而不是 sync 跑時 stamp 當下 main SHA。

| 維度          | 評估                                                 |
| ------------- | ---------------------------------------------------- |
| 根因解決      | ✅ sourceCommitSha drift 從根源消除                  |
| Idempotence   | ✅ 同 zh state → 同 metadata，永遠不漂               |
| Refactor cost | Medium — 改 fix-all-frontmatter.py 邏輯              |
| 跟 F 互補     | 兩者組合 = sync.sh 真正只在 zh 改動時動 src/content/ |

## 四、推薦組合：F + H + B + 收尾 fail-loud gate

長期最佳解法是**四層儀器化組合**，每層解一個獨立子問題：

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1：sync.sh 本身（F + H）                          │
│   • F: incremental — git diff 偵測改動，只 sync 改動    │
│   • H: idempotent metadata — sourceCommitSha 從 zh git  │
│                              log 算，不從 main HEAD     │
│   → 結果：同 knowledge/ state → 同 src/content/，0 drift│
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 2：refresh-data.sh 整合（B）                       │
│   • Step 1.5 加 sync.sh（git pull 之後立刻跑）          │
│   • 跟 dashboard JSON 同節奏（1d 2x routine）           │
│   • DNA #43 pattern instantiate                          │
│   → 結果：每 12hr 自動 catch up，silent stale 上限 12hr │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 3：refresh-data Step 10 fail-loud verify（DNA #52）│
│   • 現有 Step 10 已 verify dashboard JSON freshness     │
│   • 加 verify "src/content/ in sync with knowledge/"    │
│   • 跑完 sync.sh 後 git diff --quiet src/content/        │
│   • 不一致 → 紅燈 + LESSONS entry                       │
│   → 結果：sync.sh silent failure 被 fail loud 捕捉      │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│ Layer 4：pre-commit hook 補強（D，可選）                 │
│   • 偵測 staged knowledge/**/*.md                       │
│   • incremental sync 改動的 src/content/                │
│   • git add 對應 src/content/ 一起 commit               │
│   → 結果：knowledge/ + src/content/ commit 原子化       │
│   • 配 F 後 <1s 不打擾，沒 F 不要加（會卡 commit）       │
└─────────────────────────────────────────────────────────┘
```

### 為什麼是這四層

**F (incremental)** 是基礎建設 — 沒 F，B/C/D 全部受 4236 file cp 拖累，整個方案 unfeasible。F 改完 sync.sh 後續整合才有意義。

**H (idempotent metadata)** 跟 F 互補 — F 解「為什麼要重 cp 那麼多 file」，H 解「為什麼 sourceCommitSha 不該漂」。沒 H，F 改完後 frontmatter 還是會被 normalize 出 drift。

**B (refresh-data integration)** 是飛輪層 — 配 F+H 後，refresh-data 跑 sync.sh 變成 ~1s 操作。跟 dashboard JSON 同 cadence 自動清 entropy。**routine 飛輪是「機器幫做」的核心，sync.sh 該在飛輪上**。

**Layer 3 fail-loud verify** 是 immune layer — 任何上述三層失敗（sync.sh bug / cron 跑不起來 / routine drift），verify gate 都會在 refresh-data 下一輪紅燈。Per DNA #52「Silence is success 是 anti-pattern」。

**D (pre-commit) 是可選** — 配 F 後加會讓 commit 卡 <1s，不配 F 加會卡 5-10s（contributor friction）。先 ship F+H+B+verify 跑 1 個月看 silent stale 上限 12hr 是否夠用，再決定加不加 D。

### 為什麼**不**選 A / C / E / G

| 拒絕方案                   | 理由                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------- |
| A (prebuild)               | Build time penalty + drift 仍可見於 git status；語意不對（prebuild 是 generation） |
| C (gitignore src/content/) | Migration cost 太大（4568 files + DX 大破壞）；fresh clone 體驗倒退；rollback 難   |
| E (maintainer-only)        | 只 cover routine 收割的 PR，不 cover 觀察者直 merge / contributor force merge      |
| G (GH Action)              | 跟 B 重複；多一個 noise PR；違反「指標 over 複寫」（B 已經是飛輪 canonical）       |

## 五、Migration Plan（per MANIFESTO §修改量級）

按修改量級 M-S 拆 4 個 ship，每個都是單 session 完成範圍：

### Ship 1: F+H combined refactor（修改量級 M）

**Scope**：~6 files / ~400 lines

- `scripts/core/sync.sh`：
  - 加 `--incremental` mode（default on）
  - 用 `git diff --name-only HEAD~1` 或 `git diff --cached` 取改動 file list
  - 只 cp 改動的 + 改動所屬 lang/category dir
  - `--full` flag 保留 fallback（cold cache / 第一次 clone）
- `scripts/utils/fix-all-frontmatter.py`：
  - 改 `sourceCommitSha` 算法：用 `git log -1 --format=%H -- knowledge/{translatedFrom}`
  - 不在 sync 時 stamp 當前 main SHA
  - 只動該 sync 的檔案，不全掃
- `scripts/core/sync.sh` 加 dogfood test：跑兩次 sync.sh，第二次應該 0 file changed
- 加 `scripts/tools/sync-self-test.sh`：CI 用，驗證 idempotence

**Verify**：跑兩次 `bash scripts/core/sync.sh && git diff --quiet src/content/` 應該 exit 0。

**Risk**：sync.sh 是骨骼基因（per DNA §基因突變規則「骨骼基因任何變更必須通過 build 驗證」），必跑：

1. Local: `npm run build` 通過 + Astro 看到所有 4196 篇
2. CI: i18n-smoke-test.yml 通過
3. CF Pages: deploy preview 看 prod 健康

### Ship 2: refresh-data.sh Step 1.5 整合（修改量級 S）

**Scope**：~2 files / ~30 lines

- `scripts/tools/refresh-data.sh`：
  - Git sync 後加 `[1.5/12] sync knowledge/ → src/content/`
  - 跑 `bash scripts/core/sync.sh --incremental`
  - 失敗 → soft skip（per refresh-data 既有失敗策略）
- `docs/pipelines/DATA-REFRESH-PIPELINE.md`：
  - 更新 12 步說明改 13 步
  - 加 §Step 1.5 sync.sh integration

**Verify**：跑 refresh-data.sh 完整 12+1 步通過 + sync 後 git diff 乾淨。

### Ship 3: Step 10 verify gate 升級（修改量級 S）

**Scope**：~2 files / ~50 lines

- `scripts/tools/refresh-data.sh` Step 10：
  - 既有 dashboard JSON freshness gate 保留
  - 加 src/content/ sync gate：跑 `bash scripts/core/sync.sh --incremental --check`（dry-run mode）
  - `git diff --quiet src/content/` 不一致 → exit 1 + 列出 drift files
- `docs/pipelines/DATA-REFRESH-PIPELINE.md` §Step 10 更新
- DNA.md #43 補強 entry（從「dashboard JSON」擴到「dashboard JSON + 投影層」）

**Verify**：人為製造 drift（手改 knowledge/ 不跑 sync）→ refresh-data Step 10 紅燈 + 明確錯誤訊息。

### Ship 4: 觀察 1 個月後決定加不加 D（pre-commit）

**Scope**：~1 files / ~20 lines（如果加）

- `.husky/pre-commit`：
  - `git diff --cached --name-only | grep ^knowledge/` 非空 → 跑 `bash scripts/core/sync.sh --incremental --staged`
  - 自動 `git add src/content/` 對應 file
  - sync.sh 失敗 → 不阻擋 commit，warn + LESSONS entry

**Decision criteria**：1 個月後檢查 routine flywheel 數據

- Silent stale 上限 ≤ 12hr ✅ 不需 D
- Silent stale 上限 > 12hr（observer manual merge 太頻繁）→ 加 D

## 六、Success Metrics（1 個月觀察）

| 指標                                            | Baseline                | Target                 |
| ----------------------------------------------- | ----------------------- | ---------------------- |
| sync.sh 跑完後 `git status` 漂移 files          | 2801 / 4236 (66%)       | < 10                   |
| sync.sh wall-clock                              | ~10s                    | < 1s（typical change） |
| Silent stale duration (PR merge → site reflect) | ∞（直到觀察者手動觸發） | ≤ 12hr                 |
| refresh-data.sh fail-loud detection rate        | 0% (沒 verify)          | 100%                   |
| Contributor PR 需要手動補 src/content/ 次數     | 8 起（PR #968-1025）    | 0                      |

長期 success = **觀察者再也不用思考 sync.sh**。Per DNA #36 founder time leverage — routine 飛輪接走 entropy，觀察者精力給策略決策。

## 七、跟 MANIFESTO / DNA 的對應

| 上游 canonical                                                 | 本提案 instantiation                                       |
| -------------------------------------------------------------- | ---------------------------------------------------------- |
| MANIFESTO §6（knowledge/ 是 DNA, src/content/ 是 protein）     | 強化 SSOT 純粹性 — 轉錄機制儀器化進飛輪                    |
| MANIFESTO §造橋鋪路                                            | sync.sh 從觀察者 push 變成 routine 自動                    |
| MANIFESTO §指標 over 複寫                                      | sync.sh canonical 在 scripts/core/，所有觸發點 pointer     |
| DNA #15 反覆浮現要儀器化                                       | 第 N 次驗證 — sync.sh gap 從思考升 SOP / cron / hook       |
| DNA #43 新衍生資料必須進 refresh-data.sh                       | 延伸：「新衍生資料」概念從 dashboard JSON 擴到投影層       |
| DNA #50 Pipeline auto-detection                                | DATA-REFRESH-PIPELINE 升 13 步後，sync.sh 從此 auto-detect |
| DNA #52 Immune system 沒在 fail loud 比缺 immune system 更危險 | Layer 3 verify gate 把 sync.sh silent failure fail loud    |
| DNA #54 Routine 飛輪 5-stage lifecycle                         | sync.sh 進 routine 是飛輪 instantiation                    |
| ANATOMY §骨骼基因                                              | sync.sh 是骨骼，本提案動骨骼基因「必須通過 build 驗證」    |

## 八、Open Questions（給觀察者決策）

1. **Ship 1 風險容忍度**：sync.sh 是骨骼基因。F+H 改完後跑兩遍 build + i18n-smoke-test + CF Pages deploy preview 已足夠 verify？還是要先在 branch 跑一週 dogfood 才 merge？

2. **Ship 2 cadence**：B 把 sync.sh 接進 refresh-data 1d 2x routine。需要更頻繁嗎？（e.g. 每 hr 跑 sync.sh-only routine 把 silent stale 上限從 12hr 壓到 1hr）

3. **Pre-commit (D) 的長期傾向**：先觀察 1 個月再決定，還是直接一次 ship 完整四層？傾向看哲宇對 contributor friction 的容忍度。

4. **Migration timing**：建議優先序：
   - 本週：Ship 1 (F+H) — 解根因
   - 本週：Ship 2 (B) — 飛輪整合
   - 本週：Ship 3 (verify gate) — fail-loud
   - 1 個月後：Ship 4 (D) — 觀察後決定

   還是要拆更慢的節奏？

5. **是否同時補 documentation**：CLAUDE.md 沒提到 sync.sh，CONTRIBUTING.md 也沒。本提案需要連帶補哪些 doc？建議至少 DATA-REFRESH-PIPELINE.md 更新 13 步 + DNA #43 補強 entry。

## 九、為何這份 report 必要

本案是「pipeline 結構缺口暴露」的範例。如果跳過策略分析直接動手改 sync.sh，會錯過幾件事：

- **F vs A 的取捨**：直觀第一念是「加進 prebuild」（A），但 A 不能解 drift 可見性問題。深度分析後 F 是更好的根因解法。
- **Layer 3 fail-loud 的必要性**：沒有 verify gate，整個系統依賴 sync.sh 永遠不壞。Per DNA #52 這是 anti-pattern。
- **Ship 順序**：F 不先 ship，B 跑進來就是慢的 sync — routine flywheel timeout。
- **跟既有 routine 飛輪的對齊**：B 必須跟 ROUTINE.md v2.0 main-direct 對齊；如果 sync.sh 在 routine 內跑出 drift，誰負責 commit？答案是 routine 自己 main-direct push（已是 ROUTINE.md v2.0 的設計）。

**本 report 的角色**是哲宇 review 後決定 Ship 順序 + open questions 的拍板基礎。Per HEARTBEAT §收官鐵律 2 特例「需觀察者決策必附 options + 成本 + 推薦 default」 — 上面八節已 cover。

🧬

---

_v1.0 | 2026-05-12 00:30 +0800 admiring-montalcini-post-finale session_
_誕生原因：2026-05-11 cleanup session 揭露 sync.sh 沒被儀器化 → 8 篇 contributor 文章 silent missing from site → 哲宇要求「分析策略並歸檔 report」_
_核心洞察：(1) sync.sh 沒進 refresh-data.sh 是 DNA #43 pattern 重演 (2) 真正解法是四層儀器化（F+H+B+verify gate），不是單點修補 (3) sync.sh 從觀察者 push 變 routine 自動 = founder time leverage 的具體 instantiation_
