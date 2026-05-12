---
title: 'claude-with-webhook 評估報告：自架 GitHub Issue → Claude Code 自動化的可借力性'
session: '2026-05-13-011548-manual'
author: 'Taiwan.md (Semiont)'
date: 2026-05-13
type: 'external-tool-evaluation-report'
current_version: 'v1.0'
context: '哲宇 prompt — 研究 htlin222/claude-with-webhook 寫 report'
trigger: 'observer 發現一個用本機 claude CLI 訂閱跑 Issue → Plan → PR 的自架 webhook server'
upstream_canonical:
  - 'docs/semiont/MANIFESTO.md'
  - 'docs/semiont/ROUTINE.md'
  - 'docs/pipelines/MAINTAINER-PIPELINE.md'
  - 'docs/semiont/DNA.md'
external_refs:
  - 'https://github.com/htlin222/claude-with-webhook'
  - 'https://github.com/anthropics/claude-code-action'
status: 'evaluation → 等觀察者決策三條路徑'
---

# claude-with-webhook 評估報告

> 一個 Go 寫的自架 webhook server，把 GitHub Issue 變成 Claude Code 的觸發信號 — 開 Issue 自動產 plan，留言 `@claude approve` 自動實作開 PR。重點在：**用你本機的 `claude` CLI 訂閱**（Pro/Max/Team），不用 Anthropic API key。
>
> **核心 finding**：這專案的設計哲學 ≈「Semiont routine flywheel 的事件版」。Taiwan.md 現在有 11 條時間觸發 routine，但缺一條 **observer 事件觸發**的進入點。這個 server 補的正是那個缺口，而且自架在 user 自己機器、用 user 自己的訂閱 — 跟 §主權的巴別塔 自架本機 LLM 的哲學是同一條路徑。
>
> **三條推薦路徑**：(A) 全採用 + bolt Taiwan.md identity loader / (B) Fork + 客製 systemPrompt / (C) 不採用但 cherry-pick 五個 hardening pattern 進 MAINTAINER-PIPELINE。

---

## 一、專案基本資料

| 維度        | 數值                                                                            |
| ----------- | ------------------------------------------------------------------------------- |
| Repo        | [htlin222/claude-with-webhook](https://github.com/htlin222/claude-with-webhook) |
| Created     | 2026-03-18                                                                      |
| Last commit | 2026-04-03（5 週活躍開發後 sit）                                                |
| Stars       | 5（早期 solo 專案）                                                             |
| License     | MIT — fork / 改造安全                                                           |
| 語言        | Pure Go（只用 stdlib，零外部 dependency — 作者顯式列為 invariant）              |
| 拓樸        | 單一 Go binary + 註冊腳本 + tunnel（Tailscale Funnel / ngrok / zrok 三選一）    |
| 代碼量      | `main.go` 58k 字元（單檔 monolith）+ `main_test.go` 22k 字元                    |

### Mission（README 自陳）

> "A Go server that automates Claude Code planning and implementation via GitHub issues. One server handles multiple repos, routed by URL path."

人類在 Issue 討論，agent 把後面所有「summarize → plan → code → test → PR」自動化。作者把這條斷層描述為：「The only irreplaceable part is the conversation. Everything after that is execution.」

---

## 二、工作流程拆解

### 觸發鏈

```
觀察者開 Issue
    ↓
GitHub 送 webhook
    ↓
Tunnel（Tailscale Funnel / ngrok / zrok）
    ↓
你本機 :8080 上的 claude-webhook-server
    ↓
🤖 Planning（立即 post progress comment）
    ↓
Claude CLI 產 plan（每 2s streaming 更新 comment）
    ↓
Post final plan 附 @claude approve 指示
    ↓
你留言 "@claude approve [extra guidance]"
    ↓
建 git worktree from origin/main → Claude 實作 → commit/push → 開 PR
```

### Issue 標籤自動管理

server 自動建/換 workflow labels，整個 issue 生命週期可追蹤：

| Label          | 觸發時機                  | 意義                  |
| -------------- | ------------------------- | --------------------- |
| `planning`     | Issue 開 / `@claude plan` | Claude 正在產 plan    |
| `planned`      | Plan post 完              | Plan ready for review |
| `implementing` | `@claude approve`         | Claude 正在寫 code    |
| `review`       | PR created                | 實作可 review         |
| `done`         | PR auto-merged            | 完整解掉              |

同時間只會有一個 active workflow label，前一個自動移除。

### 留言指令

所有指令都要 `@claude` 前綴防誤觸：

```
@claude approve                       # 啟動實作
@claude approve focus on X and add tests   # 含額外引導
@claude approve 請用繁體中文寫註解         # 多語也行
@claude lgtm                          # = approve
@claude plan                          # 重新產 plan（webhook 漏接時用）
@claude <follow-up question>          # 隨時問
```

同樣指令對 Issue / PR 都生效，行為不同：

- **在 Issue**：開新 branch → 實作 → 開 PR
- **在 PR**：checkout PR 既有 branch → 實作 → push 進該 PR branch（含讀 PR 全部討論）

---

## 三、為什麼這個專案的存在合理 — 對 `claude-code-action` 的差異化

Anthropic 官方有 `anthropics/claude-code-action`（GitHub Actions 整合）。作者在 README 直接列差異表，作者選擇自架因為官方版**不適合**他的工作流。逐條比對：

| 維度           | Anthropic 官方 GHA                   | claude-with-webhook（自架）                 |
| -------------- | ------------------------------------ | ------------------------------------------- |
| **跑在哪**     | GitHub Ubuntu runner（冷啟）         | **你自己機器（always warm）**               |
| **Auth**       | 需要 `ANTHROPIC_API_KEY`（API 計費） | **本機 `claude` CLI（Pro/Max/Team 訂閱）**  |
| **Cost**       | API tokens + GHA minutes             | **零額外成本（用既有訂閱）**                |
| **本機工具**   | 無 — sandbox 環境                    | **完整存取 — editor / linter / test / DB**  |
| **進度回饋**   | 等整個 Action 跑完                   | **Live streaming SVG spinner，每 2s 更新**  |
| **Multi-repo** | 每個 repo 一份 workflow.yml          | **一個 server，`register` 加 repo**         |
| **Setup**      | GitHub App + API key + YAML          | `make install` + `register`                 |
| **Networking** | GitHub → Anthropic API               | Tailscale Funnel / ngrok / zrok → localhost |

### 對 Taiwan.md 的價值評估

**`Auth + Cost` 這兩格是 killer 差異**：

- 哲宇有 Claude Pro/Max 訂閱
- API 計費版每次 plan/implement 都燒 API tokens（一個有規模的 plan 跑下來幾塊 USD 起跳）
- 自架版**用同一份訂閱跑 unlimited issue 觸發**，邊際成本接近 0
- Taiwan.md 是 public OSS 專案 + 11 條 cron routine 都已經消費哲宇本機 Claude — 多接一條 webhook 不會撞 quota（subscription 是 per-account rate，不是 per-instance）

**`本機工具` 對 Taiwan.md 直接有意義**：

- Taiwan.md MAINTAINER-PIPELINE 用 `scripts/tools/article-health.py` + `prettier` + `lint-staged` + 內部 prebuild chain — sandbox 跑不到
- 哲宇本機已經有 ROUTINE flywheel runtime，再接一條 issue trigger 等於同一個 runtime 多吃一種 event source

---

## 四、安全模型 — 直接可借鏡 MAINTAINER-PIPELINE

`main.go` 內建五條 hardening pattern，每條對應 Taiwan.md 既有缺口：

### 1. Command timeouts（`context.WithTimeout`）

- Planning：30 min
- Follow-up：30 min
- Implementation：60 min
- git/gh 個別 command：30 sec

**Taiwan.md 對照**：ROUTINE flywheel 目前每個 cron job 沒有硬性 timeout（依賴 GH Actions `ubuntu-24.04-arm` job-level 120min），子 task 卡住可能拖整個 routine。**可借鏡 → 給每個 routine 內 subtask 加 `timeout` 包裝**。

### 2. Concurrency limit（預設 max 3 concurrent jobs）

超出時 silently drop，log warning，不排隊。`MAX_CONCURRENT` 可配。

**Taiwan.md 對照**：11 條 routine 在 cron crontab 上有時段碰撞風險。**可借鏡 → routine 全局 max concurrent guard**。

### 3. Event 去重（`X-GitHub-Delivery` UUID 1hr cache）

GitHub 重送 webhook（網路抖動 / 客戶 ack 慢）時不會跑兩次。

**Taiwan.md 對照**：spore-harvest routine 沒有 dedup — 同一個 harvest batch 重跑可能重複 post Threads/X。**可借鏡 → harvest 加 idempotency key**。

### 4. Error sanitization（post 到 GitHub comment 前過濾）

三層處理：

- 截斷 500 chars
- 字串 grep `token` / `key` / `secret` / `password` / `credential` → 整行刪
- 絕對檔案 path → redact

**Taiwan.md 對照**：MAINTAINER-PIPELINE sub-agent 在 PR comment 引用 git diff 或錯誤 log 時可能 leak 本機 path / .env。**可借鏡 → MAINTAINER 在 post PR comment 前過一道 sanitization**。

### 5. Filtered git add（dangerous pattern blocklist）

`.env*` / `*.pem` / `*.key` / `*credential*` / `*secret*` / `*token*` / `node_modules/` / `.git/` — 即使 Claude 想 stage 也會被 server 攔。

**Taiwan.md 對照**：routine main-direct mode（cron 直推 main）有理論性風險 — 如果 Claude 誤把 `.env` 變動 stage 進 routine commit，會直接污染 main。**可借鏡 → 在 `scripts/core/sync.sh` 第一步加 dangerous pattern guard**。

### 額外：Hostname validation on startup

server 啟動時逐 repo 對比 GitHub 上註冊的 webhook URL 跟當前 tunnel hostname — 漂移時 log warning。對應 Taiwan.md DNA #38 SSOT drift silent killer 哲學。

---

## 五、Dual-Account 模式 — Taiwan.md 已半實作

README §Dual-Account Setup 提倡兩個帳號：

- **Primary（人）**：開 Issue、`@claude approve`
- **Bot（VM 上）**：post plan、push code、開 PR

`BOT_USERNAME` 環境變數讓 server filter 掉 bot 自己的 comment 防自觸發無限迴圈。Audit trail 上 PR / comment 視覺區分明顯。

### Taiwan.md 對照

哲宇已經有：

- Primary: `frank890417`
- Bot: `taiwandotmd`（負責發 Threads / X spore）

但 `taiwandotmd` 目前**沒接 GitHub** — 它只在 social platform 工作。如果採用這個 server，可以一次性把 `taiwandotmd` 升級成完整 GitHub bot account：

- `ALLOWED_USERS=frank890417`（只有哲宇能 `@claude approve`）
- `BOT_USERNAME=taiwandotmd`
- 哲宇從哪台機器都能開 Issue 觸發實作，PR 由 `taiwandotmd` 帳號名義 open，視覺上 Semiont 跟哲宇人類 commit 分得很乾淨

---

## 六、技術細節觀察

### `systemPrompt` 是泛用的，不是 Taiwan.md identity 化的

`main.go` 內 `const systemPrompt` 是給通用 OSS 專案的 non-interactive instruction（強調 Read → Modify → Verify / 不要問問題 / 不要 git commit）。**沒有 MANIFESTO / BECOME / EDITORIAL 識別**。

直接採用會發生的情境：webhook 觸發的 Claude session **不會自動載入 Taiwan.md 身份**，產出的 plan / 實作會退化成普通 LLM helper 風格 — 用詞、結構、編輯紀律全部 drift。

對應 CLAUDE.md §Bias 2 Multi-observer drift：「identity 不為任何 observer 改一個字」— 但這個觸發點上沒人載入 identity。

### 解法（如果採用）

需要在 webhook 觸發進 Claude CLI 之前注入 `read /Users/cheyuwu/Projects/taiwan-md/BECOME_TAIWANMD.md and execute all 12 awakening steps before responding`。在 fork 版可以改 `systemPrompt` 字串，或在 `runPlan` / `handleApprove` 前面 prepend 一段 boot loader prompt。

工作量估計：~2 小時（fork → 改一個常數 → rebuild → test）。

### 多 agent polish loop（commit `#36`）

作者 ship 過一個 `runPolish` / `runReview` / `runRefine` / `isLGTM` 多 agent 迴圈，靈感來自 [`@yohey-w/multi-agent-shogun`](https://github.com/yohey-w/multi-agent-shogun)。實際上是：implement → review agent 給 critique → refine agent 改 → loop until LGTM。

**對照 Taiwan.md REWRITE-PIPELINE Stage 4 polish + Stage 5 verify**：兩者哲學完全一致（多 pass 不要一次到位）。如果採用這 server，這個 polish loop 等於免費 ship 一個新 sub-pipeline。

### 單檔 monolith 風險

`main.go` 58k 字元一個檔，含 webhook signature 驗證 / payload parse / Claude streaming wrapper / git worktree mgmt / `gh` CLI wrapper / comment dedup / discussion 抓取 / classification — 全部混一起。Test 只 22k 字元（≈ 37% test:code 比）。維護 / 客製化會直接打到這個 monolith。

Fork 改 systemPrompt 簡單，但客製化超過那個範圍會痛。

### 沒有 persistent state

server crash 在實作中途 = orphan worktree（在 `<repo>/worktrees/issue-N/`）+ GitHub Issue 卡在 `implementing` 標籤。沒有 resume 機制。

對 Taiwan.md 影響：哲宇 M2 Max 還算穩，但出門帶筆電變 sleep 會觸發。需要監控 + 手動 recovery hook。

### 早期 solo 專案

5 stars / 1 contributor / 5 週活躍開發後 sit 1 個月。專案沒有死，但也沒到 community-maintained。**Fork 是更安全的選項**（License MIT 允許）— upstream 變動 / 停滯都不會卡住 Taiwan.md。

---

## 七、Sovereignty Preservation 視角

MANIFESTO §主權的巴別塔 + v1.6.0 後 Taiwan.md 重新定向：自架本機 LLM（Tier 3 Ollama）是 sovereignty-sensitive 主題的最後 fallback，因為 PRC cloud free tier 對 Taiwan 政治主題會 silent refuse。

**這個 webhook 專案在 sovereignty 軸上的位置**：

| Tier 維度          | claude-with-webhook                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Runtime 位置       | **你自己機器**（不是 cloud）                                                                |
| Auth 路徑          | 訂閱 → 本機 CLI（不過 Anthropic API runner）                                                |
| 程式碼路徑         | open-source Go binary，可審計                                                               |
| Vendor lock-in     | 低 — MIT license + 自架                                                                     |
| 對抗 silent refuse | N/A（Claude 不在 sovereignty 拒絕清單）但 path **不經過任何政策可能變動的 cloud middleman** |

**跟 SQUEEZE-MODELS-MAX cascade 的關係**：

兩個都是「**把推論主權留在 user 機器**」的同形 instantiation：

- Cascade 處理「翻譯 / 內容生成」的 sovereignty preservation
- 這個 webhook 處理「**自動化決策觸發**」的 sovereignty preservation

哲宇對 Anthropic API runner 沒 sovereignty 顧慮（Anthropic 是 US 公司、不會 silent refuse Taiwan 主題），所以 sovereignty 不是核心動機。但「**runtime 在你自己機器**」這個架構選擇本身跟 §主權的巴別塔 哲學一致。

---

## 八、Fit Taiwan.md 評估 — 三條路徑

### Path A：全採用 + bolt Taiwan.md identity loader

**做法**：

1. `make install` 到 `~/.claude-webhook/`
2. `register` Taiwan.md + Muse + 未來 Japan.md
3. **必做**：fork 改 `systemPrompt` 注入 BECOME_TAIWANMD 載入指令（不做的話產出會 drift 出 identity）
4. `taiwandotmd` 帳號升級成完整 GitHub bot

**Pro**：

- 完整能力一次到位
- Multi-repo 一個 server（taiwan-md + muse + 未來 fork）
- 哲宇出門用手機都能在 Issue 留言觸發實作
- 跟既有 routine flywheel 互補（時間觸發 + 事件觸發）

**Con**：

- 需要保持本機 server 跑（哲宇 M2 Max 變 sleep 會斷）
- Tunnel maintenance（Tailscale Funnel 最穩定）
- Identity loading 是強制依賴 — 沒做就 ship 出 drift 內容
- 5-stars solo project，upstream 風險 → 直接 fork 比較安全

**估時**：3-4 小時（install + register + fork + 改 systemPrompt + test 一個 Issue end-to-end）

---

### Path B：Fork + 深度客製

**做法**：

- 把這個 repo fork 進 `frank890417/claude-with-webhook-twmd`
- `systemPrompt` 重寫成 Taiwan.md 專用 boot loader
- 接 Taiwan.md ROUTINE telemetry（issue 流量進 dashboard）
- 接 article-health.py 當 Stage 4 polish gate（不過 polish loop 才能 commit）

**Pro**：

- Identity / quality gate 完整整合
- 比 Path A 更 Taiwan.md-native

**Con**：

- 維護成本：每次 upstream 改 main.go 要 rebase
- 估時：8-12 小時（含 quality gate 接線）
- 過度工程化風險 — 觀察者觸發實作的頻率可能不夠高到 justify 客製化

**估時**：8-12 小時

---

### Path C：不採用，cherry-pick 五個 hardening pattern

**做法**：
從 `main.go` 抽五條 pattern 進 Taiwan.md 既有 pipeline：

| Pattern            | 抽進哪                                              |
| ------------------ | --------------------------------------------------- |
| Command timeouts   | 每個 cron routine subtask 加 `timeout` 包裝         |
| Concurrency limit  | ROUTINE.md 加全局 max concurrent guard              |
| Event dedup        | spore-harvest 加 idempotency key                    |
| Error sanitization | MAINTAINER-PIPELINE post comment 前過濾             |
| Filtered git add   | `scripts/core/sync.sh` 第一步加 dangerous blocklist |

**Pro**：

- 零依賴新 service
- 五個 pattern 都是 Taiwan.md 既有缺口
- 不增加 runtime 維護負擔

**Con**：

- 沒拿到 webhook 自動化能力
- Issue → Plan → PR 還是手動

**估時**：1-2 小時（每個 pattern ~15 min）

---

## 九、推薦

**短期（這週）**：走 **Path C** — 五個 hardening pattern cherry-pick 進 Taiwan.md 既有 pipeline。理由：

1. **零風險**：不引入新 service / tunnel / 帳號管理
2. **解決既有缺口**：五個 pattern 都對應 Taiwan.md 既有 silent failure 風險
3. **架構解 > 守備修補**：今天剛 ship 的 MANIFESTO §架構解 哲學 — 這五個 pattern 都是架構級防護，符合進化方向

**中期（一個月後評估）**：根據 issue 流量決定要不要升 Path A：

- 如果一個月內 Taiwan.md 有 ≥ 5 個「觀察者開 issue → 哲宇手動跟 sub-agent 跑 plan → ship」case → 走 Path A
- 如果只是偶發 ad-hoc 觸發 → 留在 Path C，省 runtime 維護

**Path B 不建議**：客製化成本高、Taiwan.md issue 流量還沒到 justify 深度整合的階段。

---

## 十、附錄：可借力的具體 code snippet

### A. Error sanitization regex

`main.go` 內的 sanitize 邏輯（從 commit log 推導）：

```go
// 整行 grep 敏感關鍵字
secretKeywords := []string{"token", "key", "secret", "password", "credential"}
// 絕對 path 替換 → redact
// 截斷 500 chars
```

Taiwan.md MAINTAINER-PIPELINE sub-agent 在 post review comment 前可加同樣 filter。

### B. Dangerous file blocklist

```
.env*
*.pem
*.key
*credential*
*secret*
*token*
node_modules/
.git/
```

可直接複製進 `scripts/core/sync.sh` 第一步：

```bash
# 防 routine main-direct mode 誤推敏感檔
DANGEROUS_PATTERNS=(".env*" "*.pem" "*.key" "*credential*" "*secret*" "*token*")
for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if git status --short | grep -qE "$pattern"; then
    echo "❌ DANGEROUS file detected: $pattern — refusing to commit"
    exit 1
  fi
done
```

### C. X-GitHub-Delivery dedup

```go
// cache: map[deliveryID]time.Time, TTL 1hr
// 收到 webhook 第一件事 check delivery ID 是否在 cache
```

Taiwan.md spore-harvest routine 可同樣 hash `(platform, content_hash, timestamp_minute)` 做 idempotency key。

---

## 十一、Open questions（送哲宇）

1. **路徑選擇**：Path A / B / C 哪個？或先 C 一個月後 reassess？
2. **`taiwandotmd` 升級**：要不要把它擴成完整 GitHub bot 帳號（不只 social）？
3. **Issue 流量**：過去一個月 Taiwan.md 有多少「觀察者開 issue + 期待 Semiont 接手實作」的 case？這數字決定 ROI。
4. **fork vs upstream watch**：如果走 A，要不要直接 fork（防 upstream sit）？
5. **Sovereignty thinking**：「runtime 在你自己機器」這條原則要不要升進 MANIFESTO §主權的巴別塔 的延伸 — 不只「推論主權」也包含「**自動化決策主權**」？

---

_v1.0 | 2026-05-13 01:15 +0800 — 哲宇 prompt 觸發評估，Path C 推薦先行五個 hardening cherry-pick，Path A 留作一個月後 issue 流量 reassess。_
