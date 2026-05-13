---
title: 'MAINTAINER-PIPELINE issue 分類 taxonomy + 差異化處理設計'
session: '2026-05-13-011548-manual'
author: 'Taiwan.md (Semiont)'
date: 2026-05-13
type: 'pipeline-upgrade-design-report'
current_version: 'v1.2-draft'
context: '哲宇 prompt — 升級 maintainer pipeline 對不同 issue 類型做差異化處理 / content suggestion 自動進 ARTICLE-INBOX / 事實查核+急修優先處理'
trigger: 'observer in-loop session 第 5 條 callout — 接 babel routine v2.3 swap 之後再升 maintainer'
v1.1_delta: 'B 類 new article submission 改為 auto-append ARTICLE-INBOX（不直接跑 REWRITE-PIPELINE）— maintainer 只 triage + route，content ship 統一交 rewrite routine'
v1.2_delta: '哲宇 review 5 open questions：(1) idempotency issue # 標記應夠 (2) A 類 issue 留 open，INBOX entry 註明完成後回覆 issue + commit hash (3) 加 fact-check label (4) accessibility label 暫不加（reuse enhancement）(5) backfill 真實數字攤開 — open strict A 類只 3 條 #128/#129/#130（非原 18）'
upstream_canonical:
  - 'docs/pipelines/MAINTAINER-PIPELINE.md'
  - 'docs/pipelines/REWRITE-PIPELINE.md'
  - 'docs/semiont/ARTICLE-INBOX.md'
  - 'docs/semiont/ROUTINE.md'
status: 'design draft → 等哲宇 review taxonomy + 然後實作 v2.2 upgrade'
---

# MAINTAINER-PIPELINE issue 差異化處理升級設計

> 對網站最有幫助的設計目標：**有人留 issue 時自動分流** — content suggestion 進 ARTICLE-INBOX，事實查核 + 急修先處理，整篇文章開發進 INBOX，其他類型對應 default action。觀察者醒來看到 issue inbox 已 triage 完，重要的 surface 在前，雜訊已 routed。
>
> **盤點來源**：GitHub open + closed issues 共 ~70 條（最近 1 個月），擷取 11 個重複出現的類型。
>
> **核心哲學（v1.1 哲宇澄清）**：**maintainer 只做 triage + route，不做 content ship**。內容生產（含完整文章稿）統一進 ARTICLE-INBOX → 交給 rewrite routine 處理。Maintainer 接手的範圍 = 「急修 / 小修 / quick win 在 30 min 內可完成」（fact-check / P0-P1 bug / small feedback fix / single UI quick win / 單篇翻譯修正 / 小規模文章整併）。
>
> **本檔範圍**：盤點 + 設計 taxonomy + 對應 action 流程 + auto-append 機制。實作（MAINTAINER-PIPELINE v2.2 + ARTICLE-INBOX section + 新 label）放下個 session。

---

## 一、Issue 類型盤點（從 70+ historical issues 抽取）

### 大類分佈（descending by frequency）

| 類別                                       | 樣本 issue 數 | 識別特徵                                | Sample issues                                                                                 |
| ------------------------------------------ | ------------- | --------------------------------------- | --------------------------------------------------------------------------------------------- |
| **A. Content gap suggestion**              | ~18           | 「網站缺 X」「📋 內容缺口」「希望有 X」 | #128 #129 #130 #1013 #1014 #1015 #1016 #314 #318 #319 #323 #329 #330 #397 #887 #914 #915 #939 |
| **B. New article submission**              | ~7            | `[Article]` prefix + 完整稿 / 完整研究  | #574 #683 #761 #781 #1057 #1058                                                               |
| **C. Existing article feedback**           | ~10           | `Feedback:` prefix 對某 article 意見    | #331 #578 #649 #665 #669 #779 #839 #878 #883                                                  |
| **D. UI/UX comprehensive**                 | ~6            | 一次性 multi-feature 整體優化           | #1059 #110 #148 #394 #615 (umbrella)                                                          |
| **E. UI/UX single suggestion**             | ~3            | 單一 UI 改進建議                        | #316 (副標題) #602 (logo)                                                                     |
| **F. Bug report**                          | ~10           | `[Bug]` prefix / 可復現問題             | #1047 #895 #597 #575 #573 #571 #569 #401 #398 #309                                            |
| **G. Fact-check request**                  | ~2            | `[Fact Check]` / 「資料錯誤」           | #680 #912                                                                                     |
| **H. Multi-article merge / consolidation** | ~7            | 「合併建議」「整併」                    | #556 #609 #616 #618 #626 #635 #655 #661 #662                                                  |
| **I. Translation correction**              | ~1            | 中譯英 / 語言相關修正                   | #912                                                                                          |
| **J. Accessibility**                       | ~1            | 朗讀 / 螢幕閱讀器類                     | #280                                                                                          |
| **K. Governance / community**              | ~3            | maintainer 邀請 / reviewer 變更 / 政策  | #729 #728 #851 #880                                                                           |

### 既有 label 使用率

從現有 labels 看到的命中率：

| Label                  | 用過幾次 | 對應類別  |
| ---------------------- | -------- | --------- |
| `bug`                  | ~10      | F         |
| `content`              | ~12      | A + B + C |
| `content-gap`          | ~5       | A 子集    |
| `enhancement`          | ~3       | D + E + H |
| `good-first-article`   | ~5       | A + B     |
| `needs-verification`   | ~1       | G         |
| `needs-rewrite`        | 0        | C 子集    |
| `indigenous`           | 1        | A 子集    |
| `translation`          | 0        | I         |
| `question`             | ~3       | K         |
| `future-consideration` | 0        | (預留)    |

**缺口**：`accessibility / a11y` 沒對應 label（#280 朗讀問題 unlabeled）。`consolidation` / `merge-suggestion` 沒 label。`fact-check` 高 priority 沒從 `needs-verification` 區分出來。

---

## 二、設計：11 類差異化 action 流程

對每個新 / open issue，maintainer routine 走以下決策樹。順序 = priority（前面的優先處理）。

### Priority 1: 急 / 嚴重類 — 優先處理

#### G. Fact-check request — 標 `needs-verification` + 嘗試 verify

**識別**：

- title 含 `[Fact Check]` / `事實查核` / 「資料錯誤」/「資訊不正確」
- body 提具體錯誤 + 引用文章 path

**Action**：

1. 解析 issue body 找出指控的具體錯誤（人名 / 日期 / 數字 / 引言）
2. **5 min 內可 verify** (查 official source / 跑 web search 確認) → fix 該段 + commit + close issue + reply 致謝
3. **無法立即 verify** → 標 `needs-verification` + reply 「已收到，會在下次 cron 或觀察者 session 處理」 + 留 LESSONS-INBOX entry「待 verify」
4. **明確錯誤但 fix 涉及大改寫** → 標 `needs-rewrite` + 入 ARTICLE-INBOX 進化候選

**對應 default-action**：5 min 可 verify 一律自己接住，不留 observer。

#### F. Bug report — 嘗試復現 + 嚴重程度評估

**識別**：

- title 含 `[Bug]` / 「壞了」/「無法」/「404」
- body 含復現步驟 / screenshot / error message

**Action**：

1. 評估嚴重程度：
   - **P0 (broken page / build fail / 404)** → 立即嘗試解（複製 issue#1047 / #575 / #569 / #401 pattern）
   - **P1 (功能異常 but 可用)** → 嘗試解，預算 30 min
   - **P2 (UI glitch / 小瑕疵)** → 留 open + 標 `bug`
2. **無法復現** → reply 詢問詳細復現步驟 + 標 `bug` `needs-info`
3. **已修** → commit + close + reply

**對應 default-action**：P0/P1 一律自己接住。

### Priority 2: 內容生產類 — 自動 routing

#### A. Content gap suggestion — **auto-append ARTICLE-INBOX**

**識別**：

- title 含「📋 內容缺口」/「網站缺」/「希望有 X 主題」/「建議新增 X 文章」
- body 列出 sub-topics（`- [ ]` 清單）+ 參考資源連結
- 無完整稿（純建議性）

**Action（哲宇核心需求）**：

1. 從 title 提取主題（「📋 內容缺口：宗教信仰與民間文化」→ 「宗教信仰與民間文化」）
2. 從 body 抽 sub-items（`- [ ]` 清單）+ 參考資源
3. **自動 append 到 ARTICLE-INBOX §Auto-append from Issues**（新 section，跟 manual entries 分開）
4. 加 labels：`content-gap` + `good-first-article`（若適用）
5. Reply：「✅ 已收入 ARTICLE-INBOX `(auto-append from #N)`。下次 contributor 認領或 routine 排到時通知你」
6. **不 close issue**（留 open 作為 contributor onboarding hook — 認領者可在這個 issue claim）

**Idempotency**：ARTICLE-INBOX 加 issue # 標記，重跑 routine 時若 issue # 已存在 skip。

#### B. New article submission — **auto-append ARTICLE-INBOX**（v1.1 哲宇澄清）

**識別**：

- title 含 `[Article]` prefix + 完整稿 / 完整 outline
- body 含 markdown 文章草稿 / 完整研究 + 來源
- 通常 contributor 先開 issue 討論主題 + 提供素材，再開 PR

**Action（v1.1 改：maintainer 不直接跑 rewrite，統一進 INBOX）**：

1. 從 issue title 提取主題 + body 抽 article 素材（草稿 / 研究 / 來源連結）
2. **自動 append 到 ARTICLE-INBOX §Auto-append from Issues**（同 A 類機制，但是 entry mode 不同）
3. 加 label：`content`（區隔 A 類的 `content-gap`）
4. Reply：「✅ 已收入 ARTICLE-INBOX `(auto-append from #N)`，含你提供的素材。下次 `twmd-rewrite-daily` routine 排到時會走 REWRITE-PIPELINE Stage 4 verify。如果想直接認領寫 → 開 draft PR 標 [WIP]」
5. **不 close issue**（同 A，留 contributor onboarding hook）

**為什麼不在 maintainer 直接跑 REWRITE-PIPELINE**：

- **Separation of concerns**：maintainer 是 triage layer，rewrite routine 是 ship layer。混在一起 maintainer routine 變肥 + 跨層複寫 rewrite judgement logic
- **Routine 設計一致**：A + B + C(大改) + H(大改) 都進同一個 INBOX，rewrite routine 一個入口統一處理，符合 §架構解 「消滅判斷類別重複」
- **時間預算**：maintainer routine ≤ 1 hr，rewrite routine 沒 boundary（per §義務鐵律 v2.3）— rewrite 才有時間跑 REWRITE-PIPELINE 6 stage 完整流程

**INBOX entry 跟 A 類的差別**：

| 維度                   | A 類（content-gap）                       | B 類（article submission）                       |
| ---------------------- | ----------------------------------------- | ------------------------------------------------ |
| 觸發                   | 「📋 內容缺口」純建議                     | `[Article]` + 完整素材                           |
| INBOX entry mode       | `content-gap`（列 sub-topics + 參考資源） | `submission`（含 contributor 提供的草稿 + 來源） |
| Label                  | `content-gap` + `good-first-article`      | `content`                                        |
| Rewrite routine 接到時 | 從零開始研究寫                            | 走 REWRITE-PIPELINE Stage 4 verify 既有素材      |

#### C. Existing article feedback — 標 + 入 INBOX 進化候選

**識別**：

- title 含 `Feedback:` prefix + 對某 article 提建議
- body 指出某 article 的問題（缺資訊 / 觀點偏頗 / 事實錯）

**Action**：

1. 解析 feedback 提的 article path
2. 評估嚴重程度：
   - **小修補** (補一段 / 改一處引用) → 5-30 min 自己接住 + close
   - **大改寫** (全篇 framing 重來) → 入 ARTICLE-INBOX rewrite mode + 標 `needs-rewrite`
   - **事實錯** → 升 G 類 (fact-check) 處理
3. Reply 致謝 + 告知處理方向

### Priority 3: UI/UX 類 — 評估 + dispatch

#### D. UI/UX comprehensive — link to umbrella + 拆分

**識別**：

- title 含 `[UI/UX & Feature]` / 「整體優化」/「綜合」
- body 列多項建議（5+ 條 sub-items）

**Action**（像 5/13 09:15 reply #1059 那樣）：

1. Reply 致謝 + 同意框架
2. 解析 sub-items 分類：
   - 已在 #615 umbrella 內 → link
   - 是 quick win → 拆出獨立 enhancement issue + label
   - 是 large refactor → 入 future-consideration
3. 標 `enhancement` + link to #615 umbrella

#### E. UI/UX single suggestion — 評估可行性

**識別**：

- title 含「建議」+ 單一 UI 點（副標題 / logo / nav 等）
- body 不長，focused 在一點

**Action**：

1. **< 30 min fix** → 直接做 (default-action) + commit + close
2. **> 30 min** → 入 #615 umbrella + reply 排序

### Priority 4: 結構性類 — 評估

#### H. Multi-article merge / consolidation — 評估 ARTICLE-INBOX 候選

**識別**：

- title 含「合併建議」/「整併」/「重複內容」
- body 列出兩篇以上 article paths 建議整合

**Action**：

1. 評估 article paths 確實重複度
2. **小規模 (< 30 min ship merged article)** → 直接做 + close
3. **大規模 (跨多檔 + 跨 lang)** → 入 ARTICLE-INBOX consolidation mode + reply

#### I. Translation correction — 直接 fix or 入 babel

**識別**：

- body 指出某語言版翻譯錯（人名 / 用語）
- 通常已附正確翻譯建議

**Action**：

1. **單篇單一 lang 修正** → 直接 edit `knowledge/{lang}/{path}.md` + commit + close（per MANIFESTO §6 只改 knowledge/）
2. **跨多篇 / 系統性翻譯問題** → 入 SQUEEZE-MODELS-MAX babel routine queue + 標 `translation`

#### J. Accessibility — 評估 priority + 排 roadmap

**識別**：

- title / body 含「螢幕閱讀器」/「朗讀」/「鍵盤」/「色盲」/「a11y」

**Action**：

1. 評估影響範圍
2. **快速 fix** (aria label / alt text) → 直接做
3. **大改 (整體 a11y audit)** → 入 #615 umbrella + 標新 label `accessibility`（建議新增）

### Priority 5: 觀察者層 — 不自動處理

#### K. Governance / community — 留觀察者

**識別**：

- maintainer 邀請 / reviewer 變更 / repository 政策
- title 含 `@`mention 特定 contributor + 行政決定

**Action**：

1. 不自動處理
2. 標 `question`
3. Reply「@frank890417 這條需要觀察者人工決策」（如果 routine 在白天觸發）

---

## 三、Auto-append ARTICLE-INBOX 機制設計

### 觸發條件

A 類 issue 識別後自動觸發。

### 寫入位置

ARTICLE-INBOX.md 新增獨立 section：

```markdown
## §Auto-append from Issues (maintainer routine)

> Maintainer routine 識別 A/B/C(大改)/H(大規模) 類 issue 後自動 append。
> 跟 §Manual entries 分開，避免格式衝突。
> Idempotent: 重跑 routine 時 issue # 已存在 skip（per v1.2 Q1）。
> **完成 ship 後鐵律**（per v1.2 Q2 哲宇拍板）：rewrite routine ship 完該 entry 後，必須 (1) 回覆原 issue 含 commit hash (2) close issue (3) 從本 INBOX entry 移除（per ARTICLE-INBOX §完成歸檔鐵律）。

### {主題} (Issue #{N})

來源：[Issue #{N}](https://github.com/.../issues/{N}) by @{author}
提出時間：{ISO date}
標籤：{labels — 依類別填}
狀態：📋 pending（等 contributor 認領或 routine 排到）
INBOX entry mode：{content-gap / submission / rewrite / consolidation}

⚠️ **完成 ship 後必做**（rewrite routine 接到本 entry 時）:

1. ship 完 commit + push origin main，取得 commit hash
2. `gh issue comment {N}` 回覆「✅ 完成 — commit `{hash}`，文章 [link]，謝謝 @{author}」
3. `gh issue close {N}` close 該 issue
4. 從本 INBOX entry 移除（per §完成歸檔鐵律 + DONE-LOG append）

待開發 sub-topics（從 issue body 抽出，A/H 類）：

- [ ] {sub-topic 1}
- [ ] {sub-topic 2}
- ...

contributor 提供素材（B 類）：

- 草稿 / outline link
- 來源連結
- 研究 notes

參考資源（從 issue body 抽出）：

- [{name}]({url})
- ...

🧬 auto-appended by twmd-maintainer routine at {timestamp}
```

### Idempotency guard

routine 在 append 前 grep `ARTICLE-INBOX.md` 找 `Issue #{N}` — 已存在 skip + log。

### 衝突避免

- ARTICLE-INBOX.md 是 git tracked file，routine 用 main-direct push
- 多個 routine 同時跑（理論上不會，per ROUTINE.md §半夜不碰撞）— 但要 pre-commit hook 防 conflict
- 如果有 git conflict → routine fail-loud + LESSONS-INBOX entry

### Reply template（v1.2 Q2 哲宇拍板版本）

issue 留 comment 兩階段：

**第一階段（maintainer routine append INBOX 後立即 reply）**：

```markdown
✅ 收到 — 已放入 [ARTICLE-INBOX](https://github.com/.../docs/semiont/ARTICLE-INBOX.md#auto-append-from-issues-maintainer-routine) `(commit {hash})`。

下次 `twmd-rewrite-daily` routine 排到或 contributor 認領時會接手。完成 ship 之後我會回覆這個 issue + 附 commit hash + close。

如果你想直接認領寫 → reply「我來」或直接開 draft PR 標 [WIP]。

🧬 — Taiwan.md maintainer routine
```

**第二階段（rewrite routine ship 完成後 reply + close）**：

```markdown
✅ 完成 — commit `{hash}`，文章上線 [link]。

謝謝 @{author} 的建議。如果有任何修正建議，歡迎開 Feedback issue 或直接 PR。

🧬 — Taiwan.md rewrite routine
```

---

## 四、新 label 建議（v1.2 哲宇 review 結果）

### v1.0 ship（哲宇拍板）

| Label        | 顏色                              | 描述                                                     | 對應類別        |
| ------------ | --------------------------------- | -------------------------------------------------------- | --------------- |
| `fact-check` | `b60205` (紅，high priority 暗示) | 急需事實查核（升級 needs-verification 的 priority 版本） | G priority case |

ship 指令：

```bash
gh label create fact-check --color b60205 --description "急需事實查核（priority over needs-verification）"
```

### v1.0 不 ship（哲宇「不確定」）

| Label           | 暫不加原因                                      | 替代方案                              |
| --------------- | ----------------------------------------------- | ------------------------------------- |
| `accessibility` | #280 是孤例，未來 a11y issue 累積到 3+ 條再評估 | J 類用 `enhancement` + reply 主動分類 |

### v2.0 考慮加（未來累積足夠樣本後）

| Label           | 顏色            | 描述                                               | 升級觸發條件                |
| --------------- | --------------- | -------------------------------------------------- | --------------------------- |
| `accessibility` | `c5def5` (淡藍) | a11y / 螢幕閱讀器 / 鍵盤導航                       | a11y issue ≥ 3              |
| `consolidation` | `fbca04` (黃)   | 多文整併建議                                       | H 大規模 ≥ 5                |
| `auto-routed`   | `7057ff` (淡紫) | 已由 maintainer routine 自動分類處理（便於 audit） | 觀察者要求 audit visibility |

### 不加（reuse 既有）

- 翻譯類 reuse `translation`
- merge 類別 reuse `enhancement`
- governance reuse `question`

---

## 五、Action 決策樹（一張表）

| 識別特徵                    | 類別 | Default action                                        | Label                               | 進 ARTICLE-INBOX? |
| --------------------------- | ---- | ----------------------------------------------------- | ----------------------------------- | ----------------- |
| `[Fact Check]` / 「資料錯」 | G    | 5 min verify → fix/close；否則標 `needs-verification` | `needs-verification` / `fact-check` | ❌                |
| `[Bug]` / 可復現            | F    | P0/P1 嘗試解；P2 留 open                              | `bug`                               | ❌                |
| 「📋 內容缺口」/「網站缺」  | A    | **自動 append ARTICLE-INBOX** + reply                 | `content-gap` `good-first-article`  | ✅ auto           |
| `[Article]` + 完整稿        | B    | 走 REWRITE-PIPELINE review                            | `content`                           | 條件 ✅           |
| `Feedback:` + article path  | C    | 小修自己接，大改入 INBOX                              | `content` `needs-rewrite`           | 條件 ✅           |
| `[UI/UX]` + 多項            | D    | reply + link umbrella + 拆 sub-issues                 | `enhancement`                       | ❌                |
| 單一 UI 建議                | E    | < 30 min 做，否則入 umbrella                          | `enhancement`                       | ❌                |
| 「合併建議」/「整併」       | H    | 小做大入 INBOX                                        | `enhancement`                       | 條件 ✅           |
| 翻譯修正                    | I    | 單篇直接改，系統性入 babel                            | `translation`                       | ❌                |
| a11y 類                     | J    | 快速 fix 做，大改入 #615                              | `accessibility` (new)               | ❌                |
| Governance                  | K    | 不處理，標 question                                   | `question`                          | ❌                |

---

## 六、實作 ship plan（下個 session）

### Phase 1: MAINTAINER-PIPELINE.md v2.2 升級

修改 Stage 2 + Stage 3：

1. **Step 2.1 重寫 issue 分類表** — 8 類 → 11 類，加 Priority 1-5 排序
2. **新 Step 3.6: Issue triage 流程** — 對每類定義具體 action sequence
3. **新 Step 3.6.1: A 類 auto-append ARTICLE-INBOX 機制** — idempotency + reply template + commit message format
4. **新 Step 3.6.2: G 類 fact-check 優先處理** — 5 min verify gate
5. **更新 §核心原則** — 加 issue triage 預設行為（過去只講 PR）

### Phase 2: ARTICLE-INBOX.md 加 §Auto-append 區

1. 新 section `§Auto-append from Issues (maintainer routine)`
2. 加 idempotency guard 規範
3. 加 manual entries 跟 auto-appended entries 分流規範

### Phase 3: 新 label ship

```bash
gh label create accessibility --color c5def5 --description "a11y / 螢幕閱讀器 / 鍵盤導航"
gh label create fact-check --color b60205 --description "急需事實查核（priority over needs-verification）"
```

### Phase 4: Mirror SKILL.md sync

`~/.claude/scheduled-tasks/twmd-maintainer-pm/SKILL.md` + `twmd-maintainer-daily/SKILL.md` 同步 v2.2 鐵律：

- Issue triage 11 類分流
- A 類 auto-append ARTICLE-INBOX

### Phase 5: 第一次 routine 跑驗證

下次 maintainer-pm @ 22:00 跑時觀察：

- A 類 (#128 / #129 / #130 等 18 條) 是否自動 append ARTICLE-INBOX（這些已 open 中，第一次跑會 backfill 全部 18 條）
- G 類 (#680 closed / #912 open) 處理是否正確
- 既有 contributor PR backlog 不被中斷

**估時 1.5-2 hr**（含 mirror sync + 三層 verify）。

---

## 七、Open questions — 哲宇 v1.2 review 結果

1. **auto-append idempotency**：✅ 哲宇「應該夠，我不確定」→ v1.0 用 issue # 標記，未來如出問題再升 hash
2. **A 類 issue 是否 close**：✅ 哲宇「留著（open），INBOX entry 註明完成後要去回覆 issue，初步可以回覆收到以放入 inbox ＋確切 commit」
   - 留 issue open（作為 contributor claim hook）
   - **INBOX entry 結構加 reminder field**：完成 rewrite ship 後要回覆原 issue + 附 commit hash
   - **第一次 Reply template 更新**：「✅ 收到，已放入 ARTICLE-INBOX `(commit {hash})`，完成後會在這裡通知你」
3. **新 `fact-check` label**：✅ 哲宇「好啊先放」→ ship `fact-check` label (color `b60205` 紅，high priority 暗示)
4. **`accessibility` label**：⏳ 哲宇「不確定」→ 暫不加，先 reuse `enhancement`，J 類處理時加 reply 主動分類；未來 a11y issue 累積到 3+ 條再評估
5. **第一次 backfill 數字**：哲宇「有哪些？」→ 真實清單攤開

### #5 清單攤開

| 集合                                     | 數量     | Issues                                                      |
| ---------------------------------------- | -------- | ----------------------------------------------------------- |
| **Open strict A 類** (內容缺口 umbrella) | **3 條** | #128 #129 #130（都 frank890417 自己開的 umbrella tracking） |
| **Open broader 內容生產類**（B+C+I）     | 3 條     | #574 (B 聲景) / #1016 (C 夜生活 KTV) / #912 (I 翻譯修正)    |
| **Closed A 類 reference**（已處理）      | 9 條     | #1015 #1014 #1013 #939 #915 #914 #887 #131 #51              |

**Backfill 選項**（等哲宇 final 決策）：

| 選項                                                      | 內容                                 | INBOX 影響                          |
| --------------------------------------------------------- | ------------------------------------ | ----------------------------------- |
| **5a** Backfill 全 open A+B+C+I                           | 6 條 → 但 strict A 含 30+ sub-topics | INBOX 多 ~33 entries                |
| **5b** Backfill 3 strict A 展開 sub-topics                | #128/#129/#130 sub-topics 全展開     | INBOX 多 ~30 entries                |
| **5c** 不 backfill，只處理 routine 後新 issue             | INBOX 不動                           | 3 條 existing 仍 open 無 INBOX 對應 |
| **5d** Backfill 3 strict A 一個 umbrella 一條 INBOX entry | 不展開 sub-topics                    | INBOX 多 3 entries                  |

**推薦 5d** — 保 1:1 對應 + 不爆量。Rewrite routine 接到 INBOX entry 時自己挑該 umbrella 的哪個 sub-topic 寫。

### v1.2 ship 決策摘要

| Q   | 決策                                    | 影響                                                                           |
| --- | --------------------------------------- | ------------------------------------------------------------------------------ |
| Q1  | issue # 標記 idempotency                | INBOX entry header 加 `Issue #N` marker                                        |
| Q2  | issue 留 open + INBOX 含 reply reminder | Reply template + INBOX entry mode 新增「完成後回覆原 issue + commit hash」step |
| Q3  | ship `fact-check` label                 | `gh label create fact-check --color b60205`                                    |
| Q4  | 不加 `accessibility` label              | J 類用 `enhancement`                                                           |
| Q5  | 推薦 5d，等 final 拍板                  | 第一次 routine 跑時 backfill 3 條（#128 #129 #130）                            |

---

_v1.0-draft | 2026-05-13 09:35 +0800 — 哲宇 prompt 觸發 issue 分類盤點。完整 70+ historical issues 盤點到 11 類 + 對應 action 流程 + auto-append ARTICLE-INBOX 機制設計。實作 MAINTAINER-PIPELINE v2.2 留下個 session。_
