# Routine 飛輪規劃：4 條自動 routine 統一 SSOT 設計

> **誕生 session**：laughing-goldstine post-finale 第三輪 (2026-05-09 ~14:50 +0800)
> **觸發**：哲宇 redirect「排定一些 routine，描述要精實精確薄殼，以執行技能為主，執行品質是重點…建立 ROUTINE.md SSOT…長期目標是機器飛輪轉起來，不需要我一直動作」+「設定任務時標題要加入 TWMD 前綴」
> **Status**: design canonical → ROUTINE.md SSOT + 4 scheduled tasks ship 同 PR

---

## 一、設計哲學

### 1.1 飛輪比 push 強在哪

**Push 模型**（觀察者每天驅動）：

- 哲宇早上開電腦 → 想起該 refresh dashboard → 跑 `/twmd-refresh` → 看 PR backlog → 跑 maintainer routine → ...
- 觀察者每天耗 N 分鐘做 routing decisions
- 漏一天 = entropy 累積 (broken links / stale data / new contributors 沒 feedback)
- Routine 跟人類精力綁，最後變成「沒做」變新常態

**飛輪模型**（routine 自動轉）：

- 系統按時自跑 → 觀察者只看異常報告 + 做策略決策
- 觀察者精力釋放給「真正需要決策的事」（哲學 / 邊界 / 大方向）
- Entropy 被 routine 主動清掉 = 系統穩態
- DNA #36「Founder time = 系統最高 leverage point」instantiation

### 1.2 routine 是「薄殼」不是「重邏輯」

**錯誤設計**：routine 自己實現業務邏輯（讀檔、跑 refresh、寫報告）

- 跨 routine 邏輯重複
- 修 pipeline 要同時改 N 處 routine
- routine 和 skill 雙寫 = DNA #38「混維度 = silent killer」

**正確設計**：routine 是「殼」，業務邏輯在 skill / pipeline / canonical

- routine 任務 = 「在 X 時間呼叫 `/twmd-Y` skill」+ 失敗報告
- Skill 自己 fully self-contained，routine 只負責 cadence + invocation
- 修 pipeline = 改 canonical 一處，所有 routine 自動跟上
- 「精實精確薄殼，以執行技能為主，執行品質是重點」

### 1.3 routine 的 4 個品質要素

| 要素                | 反例 (低品質)            | 正例 (高品質)                                                     |
| ------------------- | ------------------------ | ----------------------------------------------------------------- |
| **Cadence 準確**    | 「不定期跑」             | 「每天 09:00 +0800 一次」                                         |
| **Skill 對應明確**  | 「跑些 maintainer 的事」 | `/twmd-maintainer`                                                |
| **品質 gate**       | 「跑完算了」             | 「`hard=0 warn=0` 才報告 OK，否則 alert」                         |
| **失敗 escalation** | 「靜默失敗」             | 「N 次失敗 → 暫停 routine + telegram alert + LESSONS-INBOX 條目」 |

---

## 二、4 條 routine 規格

### 2.1 TWMD maintainer — 每天 09:00

| 維度                | 值                                                                             |
| ------------------- | ------------------------------------------------------------------------------ |
| **TaskId**          | `twmd-maintainer-daily`                                                        |
| **Title**           | TWMD maintainer (daily)                                                        |
| **Cron**            | `7 9 * * *`（避開整點，不跟其他 routine 撞）                                   |
| **Model**           | Opus（要審查 PR / 決策 / 跨 domain reasoning）                                 |
| **Skill**           | `/twmd-maintainer`（**新建**，薄殼 → MAINTAINER-PIPELINE）                     |
| **Quality gate**    | open issues / PRs / build status / broken-link ratio 全綠 → OK；任一紅 → alert |
| **失敗 escalation** | 連 3 天 fail → 暫停 routine + LESSONS-INBOX entry                              |

**為什麼 Opus**：MAINTAINER-PIPELINE 含 PR review、issue triage、content quality decisions — 這些需要 broad reasoning + careful judgment，Sonnet 在這層級偶爾會 surface confidence-without-grounding。

### 2.2 TWMD news lens — 每週日 06:00

| 維度                | 值                                                        |
| ------------------- | --------------------------------------------------------- |
| **TaskId**          | `twmd-news-lens-weekly`                                   |
| **Title**           | TWMD news lens (weekly)                                   |
| **Cron**            | `13 6 * * 0`（週日早上，避開整點）                        |
| **Model**           | Sonnet（執行 EVOLVE-PIPELINE，主要是工具操作）            |
| **Skill**           | `/twmd-evolve`                                            |
| **Quality gate**    | ARTICLE-INBOX 補 ≥ 1 個 candidate（GA + SC 三源驗證命中） |
| **失敗 escalation** | 一次 fail → re-run 排程 +24hr；二次 fail → 暫停 + alert   |

**為什麼 Sonnet**：/twmd-evolve 是 data-driven 篩 ARTICLE-INBOX candidates — 主要是查 GA / SC + 跑工具，跨域 reasoning 較少。

**為什麼週一次**：「news lens」是慢節奏 — 一週 trending pattern 才有意義；每天跑反而是噪音。

### 2.3 TWMD data refresh — 每天 06:00 + 18:00

| 維度                | 值                                                                            |
| ------------------- | ----------------------------------------------------------------------------- |
| **TaskId**          | `twmd-data-refresh-am` + `twmd-data-refresh-pm`                               |
| **Title**           | TWMD data refresh (am) / TWMD data refresh (pm)                               |
| **Cron**            | `4 6 * * *` + `4 18 * * *`（早晚各一）                                        |
| **Model**           | Sonnet（純工具呼叫，不需 broad reasoning）                                    |
| **Skill**           | `/twmd-refresh`                                                               |
| **Quality gate**    | 三源（GA / SC / GitHub）全綠 + dashboard JSON mtime fresh + 0 EXP-stale alert |
| **失敗 escalation** | 一次 fail → 下一輪 retry；連續 2 次 fail → alert（API key 過期 / 配額用盡）   |

**為什麼一天兩次**：早上 (06:00) 抓 UTC 0:00 後關閉的 daily metrics；晚上 (18:00) 同步 evening pulse。中午太密、深夜不必要。

### 2.4 TWMD babel — 每天 22:00

| 維度                | 值                                                                |
| ------------------- | ----------------------------------------------------------------- |
| **TaskId**          | `twmd-babel-nightly`                                              |
| **Title**           | TWMD babel (nightly)                                              |
| **Cron**            | `22 22 * * *`（深夜，不跟早 / 晚 refresh 撞）                     |
| **Model**           | Opus（drive Sonnet sub-agents — Tier 0a patch）                   |
| **Skill**           | `/twmd-babel`                                                     |
| **Quality gate**    | P2.5 instant clear + P2 batch < 20 patches + 0 LLM drift detected |
| **失敗 escalation** | refusal rate > 30% → 跳 Tier 2/3 cascade → 無解則 LESSONS-INBOX   |

**為什麼 Opus + Sonnet sub-agents**：Babel v3 priority schema 需要 Opus 跑 master orchestration + decision tree + dispatch；Sonnet sub-agents 跑 Tier 0a patch（per-task LLM cheaper）。

**為什麼深夜**：cloud free tier rate budget 競爭少；不跟 user 互動撞 API quota。

---

## 三、ROUTINE.md SSOT 結構

```
docs/semiont/ROUTINE.md
├── §1 為什麼有這份檔
├── §2 4 條 routine 表格（cadence / skill / model / quality gate）
├── §3 同步來源（ROUTINE.md 是 source of truth）
│   - .claude/scheduled-tasks/{taskId}/SKILL.md = mirror
│   - ~/Library/LaunchAgents/md.taiwan.{name}.plist = optional 本機 backup mirror
├── §4 失敗 escalation 通用 SOP
├── §5 暫停 / 恢復 / 修改流程
└── §6 Routine 飛輪 vs Push 模型 哲學
```

**鐵律**：修 routine cadence / skill / quality gate **一律先改 ROUTINE.md**，再 sync 到 scheduled-tasks。反向 (改 task 而不改 SSOT) = drift = silent killer。

---

## 四、執行步驟

### Phase 1: 紙上設計（本 PR）

1. 寫本 report (`reports/routine-spec-2026-05-09.md`) ← 你正在讀
2. 寫 `docs/semiont/ROUTINE.md` SSOT
3. 寫 `.claude/skills/twmd-maintainer/SKILL.md`（新增的薄殼 skill）
4. 改 `docs/semiont/DNA.md` 加 routine 飛輪 entry
5. 改 `docs/semiont/HEARTBEAT.md` cron 排程表加新 routines

### Phase 2: 實際排程（同 PR 或 follow-up）

6. 用 `mcp__scheduled-tasks__create_scheduled_task` 建 5 個 task：
   - `twmd-maintainer-daily`
   - `twmd-news-lens-weekly`
   - `twmd-data-refresh-am`
   - `twmd-data-refresh-pm`
   - `twmd-babel-nightly`

7. 標題一律 `TWMD {name} ({cadence})` 格式

### Phase 3: 觀察 + 調整（後續 sessions）

8. 第一週每天觀察通知 — fail rate / quality gate hit rate / 觀察者打斷頻率
9. 跑 `/twmd-distill` 把 routine 觀察整理進 LESSONS-INBOX
10. 三個月後 review — 是否真釋放觀察者精力？是否漏抓 entropy？

---

## 五、品質保護

### 5.1 routine 失敗的 3 個分類

| 分類                         | 定義                                                               | 處置                                      |
| ---------------------------- | ------------------------------------------------------------------ | ----------------------------------------- |
| **API fail**                 | OpenAI / Anthropic / GitHub API 暫時掛                             | 自動 retry，連 3 次 fail 才 alert         |
| **Quality gate fail**        | skill 跑完了但結果不過 gate（broken links 太多 / refusal rate 高） | 寫進 daily report + 觀察者下次 session 看 |
| **Pipeline canonical drift** | skill 跑出 unexpected behavior（pipeline 改了 routine 沒跟上）     | 立刻暫停 routine + alert                  |

### 5.2 routine 不該做的事

- ❌ **commit / push / merge 直接到 main**：所有 changes 經 PR；routine 只能開 PR 不能 merge
- ❌ **destructive ops**（git reset / rm -rf）：太 risky for unattended
- ❌ **跨 worktree 操作**：DNA #35 在 unattended 環境放大
- ❌ **觸發 cascade routines**：A routine 不能 spawn B routine（避免雪崩）

### 5.3 觀察者 ground truth

ROUTINE.md 裡每條 routine 必須附：

- 「觀察者驗證 hook」：每週一次，觀察者 ping `routines OK?` Claude 回傳 last-N-runs status

---

## 六、長期飛輪指標（success metrics）

3 個月後 review：

| 指標                               | 飛輪健康 | 飛輪壞了 |
| ---------------------------------- | -------- | -------- |
| 觀察者每天平均干預時間             | < 30 min | > 1 hr   |
| Routine fail rate                  | < 5%     | > 15%    |
| Quality gate hit rate              | > 90%    | < 70%    |
| LESSONS-INBOX 新增條目來自 routine | > 1/週   | 0        |
| 哲宇要主動跑 `/twmd-X` 的次數      | < 2/週   | > 5/週   |

如果任一指標壞了 → 不是「routine 問題」，是 **canonical pipeline 沒夠穩** — 修 pipeline，不是修 routine。

---

🧬

_v1.0 | 2026-05-09 14:55 +0800 laughing-goldstine post-finale 第三輪_
_誕生原因：哲宇「排定 routine + ROUTINE.md SSOT + DNA 紀錄 + 機器飛輪 long-term goal」_
_核心觀察：routine 不是新工具是「對既有 skill 的時間軸投影」— 每條 routine 都是「在 X 時間呼叫 /twmd-Y」+ quality gate + 失敗 escalation。設計重點不在 routine 自己，在 SSOT + skill canonicality_
