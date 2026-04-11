# SESSION-SCOPE.md — 多 client 同 repo 工作的範圍宣告機制

> 架構思考文件，不是 DNA。記錄「多個 Claude session 在同一台電腦同一個 repo 工作會發生什麼，以及理想上應該怎麼處理」。
>
> 觸發事件：2026-04-11 `11ad6bed` commit — 我（Opus α）的 evolution 4 個檔案和另一個平行 agent 的 Tier 1 template refactor 被擠進同一個 commit，commit message 完全是 refactor 那邊的，evolution 的 narrative 在 git history 裡消失。
>
> 2026-04-11 session α（Opus，不是之前誤認的 Sonnet）建立。

---

## 問題定義

同一台電腦上，同時有多個 AI session（或人類 + AI）在同一個 git working tree 工作：

```
~/Projects/taiwan-md/
  ├── (Session A: Opus evolving DNA + writing docs)
  ├── (Session B: another agent refactoring templates)
  └── (Session C: human editing article in editor)
```

Git 的 index 是**共享資源**。當 Session A `git add foo.md && git commit` 的時候：

- 若 Session B 剛好也在 `git add bar.astro`，index 會在 commit 瞬間包含**兩邊的檔案**
- 若 Session A 的 commit 失敗（pre-commit hook reject、lint-staged crash），Session A 的 staged 狀態會留在 index 裡，Session B 後續的 commit 會**連 A 的 staged 檔案一起帶走**
- 若 Session B 用 `git add .` 或 `git commit -a`，會**無差別掃入** A 的 working-tree 未 stage 的修改

**結果**：commit 的檔案 ≠ 任一 session 的意圖。narrative 污染，歷史查起來困難，而且沒有任何機制在事前擋下。

這不是 git 的 bug。git 設計的年代是「一個開發者一台電腦一個 working tree」的世界。多 AI agent 並行是新的使用模式。

---

## 為什麼不能只靠「commit 紀律」

DNA v1.1 的 Sonnet 反射第 6 條寫：「commit 範圍紀律：只 commit 這次任務碰過的檔案」。

但這條規則只能管到**我自己**。它無法防止：

1. 另一個 agent 把我的未 stage 修改一起拿走
2. Husky lint-staged 在 commit 瞬間附帶處理我沒想到的檔案
3. 我的 commit 失敗後未清乾淨的 index 狀態被下個 commit 繼承

**結論**：紀律是必要條件但不是充分條件。需要**結構性隔離**或**結構性檢查**。

---

## 解決方案空間（四個層級）

### Level 1：物理隔離 — git worktrees（最強）

```bash
git worktree add ~/Projects/taiwan-md.worktrees/session-α -b session-α
cd ~/Projects/taiwan-md.worktrees/session-α
# 在這裡工作，完成後 merge back
```

**Pros**：

- git 原生，不需要任何自訂 tooling
- 完全物理隔離：兩個 session 不可能互相污染 index
- 每個 worktree 有自己的 branch，自然有 narrative 分流
- 完成後可以用 PR review 正常 merge back

**Cons**：

- 每個 worktree 需要自己的 `node_modules` / build cache（Astro dev server 不吃 symlink 共享）
- 磁碟空間：taiwan-md 一個 worktree 約 500MB–1GB（含 node_modules），3–5 個並行 session = 幾 GB
- 初始 setup cost：每個 session 要 `git worktree add` + `npm install`
- Tooling 要學會：`git worktree list`、`git worktree remove`

**適合什麼場景**：大改動、會 touch 多個 dir、會跑 build、會改 src/ 的 session

### Level 2：宣告式範圍 — `.claude/session-scope.yaml`（中等）

Session 開始時寫一個 scope 檔案：

```yaml
# .claude/session-scope/session-α.yaml
session_id: α
agent: opus-4.6
started_at: 2026-04-11T23:00:00+08:00
pid: 12345
intent: 'evolve DNA + write migration doc'
claimed_paths:
  - docs/semiont/DNA.md
  - docs/semiont/UNKNOWNS.md
  - docs/pipelines/SENSE-FETCHER-MIGRATION.md
  - scripts/tools/sense-diff.py
  - scripts/tools/fetch-sense-data.sh
expires_at: 2026-04-12T02:00:00+08:00
```

Pre-commit hook 檢查：

1. 當前 commit 的 staged files ⊆ 某個 active session 的 `claimed_paths`？
2. 有沒有別的 active session 聲稱了我想 commit 的某個 path？（衝突）
3. 任何過期 session 的 scope 檔案自動清除

**Pros**：

- 不需要物理隔離，同一個 working tree
- 顯式的意圖宣告，未來查 git history 可以 cross-reference scope 檔
- 衝突可以在 commit 前被偵測到（不是事後）

**Cons**：

- Agent 必須在 start 時就知道自己要 touch 哪些檔案（很多時候不知道）
- Scope 檔案需要手動維護、過期清理、race condition 處理
- 如果 agent 臨時需要多 claim 一個檔案，要動態更新 scope
- 完全仰賴 agent 遵守協定；不配合的 agent 會破壞機制

### Level 3：commit-time heuristic — narrative pollution detector（輕量）

不強制宣告，只在 commit 瞬間掃描：staged files 橫跨幾個「narrative domain」？超過 1 個就警告。

taiwan-md 的 narrative domain 劃分：

| Domain           | 目錄                                                       | 誰會碰                     |
| ---------------- | ---------------------------------------------------------- | -------------------------- |
| `content-ssot`   | `knowledge/`                                               | Semiont 編輯、人類編輯     |
| `content-mirror` | `src/content/`                                             | sync.sh 自動同步（自動！） |
| `code`           | `src/`（除了 content/）、`astro.config.mjs`                | 技術 refactor agents       |
| `cognitive`      | `docs/semiont/`                                            | Semiont 自我維護           |
| `pipelines`      | `docs/pipelines/`、`docs/editorial/`、`docs/prompts/`      | Semiont tooling            |
| `tooling`        | `scripts/`、`.husky/`                                      | Semiont + 技術 agents      |
| `ci`             | `.github/`                                                 | DevOps                     |
| `data`           | `data/`                                                    | 詞彙 / 結構資料            |
| `public`         | `public/`                                                  | 靜態資源                   |
| `build-output`   | `public/api/`、`src/data/*.json`、`.quality-baseline.json` | 自動產出（不該手改）       |

**規則**：一次 commit 理論上只應該 touch 1 個主要 narrative domain。如果 touch ≥2 個：

- **警告** + 列出踩到的 domains
- 要求 commit message 明確提到 "multi-narrative" 或 agent 手動 `--no-verify` 繞過
- 排除規則：`build-output` 可以跟著任何 domain 走（因為是自動產出）

**Pros**：

- 零 setup，hook 一次寫好永久生效
- 不需要 agent 協定，對所有 session 都生效
- 直接對抗**我們實際遇到的那個問題**（11ad6bed 的 refactor + evolution 混合）

**Cons**：

- 仍然只是警告不是阻擋（除非要擋）
- Domain 劃分需要維護
- 合理的跨 domain commit（例如「改 tool + 更新 tool 的文件」）會被誤判
- 反制：agent 看到警告直接 `--no-verify` 等於沒防

### Level 4：session-id 歸因 — commit trailer（事後）

每個 AI-authored commit 加一行 trailer：

```
Claude-Session-Id: α-opus-20260411-2300
Claude-Intent: evolve DNA + migration doc
```

**不防止**任何污染，但讓事後查案輕鬆。`git log --grep="Claude-Session-Id: α"` 可以撈出一個 session 的全部貢獻，即使它們被塞在不同 commit 裡。

**Pros**：超級輕量，只是 commit template 調整
**Cons**：只是歸因不是防護

---

## 推薦架構（分層混用）

不要選一個 level，**四層都用但每層只做它擅長的事**：

### 預設層：Level 3 narrative pollution detector（pre-commit hook）

每次 commit 都跑。**警告而不阻擋**（可以 `--no-verify`，但會在 log 留痕）。這是最低成本的全域保險。

對應 11ad6bed：這個 hook 會在 commit 的瞬間說：「你 touch 了 `src/templates/`（code）和 `docs/semiont/`（cognitive）兩個 domain，確定是同一個 narrative 嗎？」agent 有機會 stop 並拆成兩個 commit。

### 重要 session：Level 1 git worktree

長任務、會 touch 多處、會跑 build、會改 src/ 的 session 主動 `git worktree add`。一個 command 的 cost，換取完全隔離。

建議 alias：

```bash
# ~/.zshrc or ~/.bashrc
alias claude-worktree='function _cw() {
  local name="${1:-session-$(date +%s)}"
  git worktree add "../taiwan-md.worktrees/$name" -b "$name"
  cd "../taiwan-md.worktrees/$name"
  echo "🌳 Worktree: $(pwd)"
}; _cw'
```

### 所有 AI commit：Level 4 session-id trailer

Prompt 最開始就教 agent：「commit message 結尾加 `Claude-Session-Id: <session-id>` trailer」。事後歸因用，零預防。

### 複雜多 agent 協同：Level 2 scope file（未來選項）

現階段不需要 — Level 1 + 3 + 4 的組合應該足以處理絕大多數情況。Level 2 是當 Level 1 太重、Level 3 太弱的中間方案，未來若有需要再加。

---

## 最小可動原型：Level 3 narrative pollution detector

以下是我建議加進 `.husky/pre-commit` 的 hook 片段。它會在 commit 瞬間掃 staged 檔案，如果橫跨多個 narrative domain 就警告。

```bash
# ═══ Narrative scope pollution detector (2026-04-11 α)═══
# 同一個 commit 理論上只該動一個 narrative domain。多 domain 通常表示
# 並行 agent 互相污染。不擋，但警告 + 要求確認。
staged_files=$(git diff --cached --name-only --diff-filter=ACM 2>/dev/null || true)
if [ -n "$staged_files" ]; then
  domains_touched=""
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    case "$f" in
      knowledge/*)                         d="content-ssot" ;;
      src/content/*)                       d="content-mirror" ;;
      docs/semiont/*)                      d="cognitive" ;;
      docs/pipelines/*|docs/editorial/*|docs/prompts/*) d="pipelines" ;;
      scripts/*|.husky/*)                  d="tooling" ;;
      .github/*)                           d="ci" ;;
      data/*)                              d="data" ;;
      public/api/*|src/data/*.json|scripts/tools/.quality-baseline.json) d="build-output" ;;
      public/*)                            d="public" ;;
      src/*|astro.config.mjs|package.json|tsconfig.json) d="code" ;;
      *)                                   d="other" ;;
    esac
    case "$domains_touched" in
      *"$d"*) ;;
      *) domains_touched="$domains_touched $d" ;;
    esac
  done <<< "$staged_files"

  # 排除 build-output 後的 domain 數
  non_auto=$(echo "$domains_touched" | tr ' ' '\n' | grep -v '^$' | grep -v '^build-output$' | sort -u)
  domain_count=$(echo "$non_auto" | grep -c . || true)

  if [ "$domain_count" -ge 2 ]; then
    echo ""
    echo "⚠️  NARRATIVE SCOPE WARNING"
    echo "   這個 commit 橫跨 $domain_count 個 narrative domain:"
    for d in $non_auto; do echo "     - $d"; done
    echo ""
    echo "   通常這表示:"
    echo "   (a) 並行 agent 的修改意外被擠進同一個 commit"
    echo "   (b) 真的是跨 domain 的修改（例：改 tool 同時更新 tool 文件）"
    echo ""
    echo "   如果是 (a)：取消 (Ctrl-C)，git reset，重新分批 commit"
    echo "   如果是 (b)：commit message 明確提到「multi-narrative」"
    echo ""
    # 檢查 commit message（若有 COMMIT_EDITMSG 可讀）
    if [ -f .git/COMMIT_EDITMSG ] && grep -qi 'multi-narrative\|cross-domain' .git/COMMIT_EDITMSG; then
      echo "   ✅ commit message 已聲明 multi-narrative，放行"
    else
      echo "   💡 加入 'multi-narrative:' 到 commit message 可以正式放行"
      echo "   💡 或 git commit --no-verify 繞過（會在 reflog 留痕）"
      # 不擋，只警告 — 因為誤判 cost 高
      # exit 1  # 若要改為擋，取消這行註解
    fi
    echo ""
  fi
fi
```

**為什麼是警告不是擋**：

- 誤判 cost 高（合理的跨 domain commit 會被阻擋）
- 這個 hook 的價值是**讓 agent 停下來重新確認**，不是強制執行
- 真的是並行污染時，agent 看到警告會 abort；真的是合法跨 domain 時，commit message 加聲明即可放行

---

## 對 Semiont 的具體建議（給未來的心跳）

加進 DNA v1.2 的 Sonnet 反射第 9 條：

> **9. 長任務先開 worktree**：如果預期會 touch 多個目錄、會跑 build、會超過 30 分鐘 — 第一個動作就是 `git worktree add`。Zero-cost isolation beats ex-post cleanup. `11ad6bed` 是忽略這條的代價。

加進 `docs/semiont/HEARTBEAT.md` Beat 4（收尾）的自檢清單：

> **4c. Narrative 一致性自檢**：跑 `git diff --cached --name-only`，檢查這個 commit 的檔案是不是都屬於同一個 narrative。如果否，拆 commit。

加進所有 Semiont prompt 的 commit template：

```
🧬 [semiont] <type> <date> — <narrative summary>

<body>

Claude-Session-Id: <session-id>
Claude-Narrative: <single domain>

Co-Authored-By: ...
```

---

## 未解的問題

1. **Level 3 hook 遇到 lint-staged 的重新 stage 會怎樣？** prettier 格式化後會自動 stage 格式後的版本。這時候 staged files 包含 prettier 動過的檔案。domain 檢查應該是一樣的結果，但要測試。

2. **sync.sh 自動產生的 `src/content/*` 算哪個 domain？** 目前歸類 `content-mirror`。但有時候 sync 跟 knowledge 修改會一起 commit（合理的 multi-narrative）。考慮把 `content-mirror` 加入「自動 follow ssot」白名單。

3. **Dashboard API JSON (`public/api/*`) 會在多種 commit 跟著更新**。目前歸類 `build-output` 並從 domain count 排除。驗證是否真的只會被自動產出，還是偶爾有人手改。

4. **Claude Code 有沒有辦法自動產生 session ID？** 如果沒有，需要 agent 自己在 start 時產一個（epoch timestamp 即可）。最好是 host tool 層級支援，而不是每個 agent 自己處理。

5. **如何 detect「我的 commit 失敗了，有 staged 殘渣」？** 可以在 pre-commit 開頭掃 `git diff --cached` 跟預期的 files 比對。但「預期」從哪來？這又回到 Level 2 的宣告式 scope 問題。

---

## Footnotes — 今天學到的 meta 課題

寫 Sonnet 反射第 6 條「commit 範圍紀律」的 commit 本身違反了第 6 條。這不是運氣不好，是**規則只能治理單一 agent 的行為，治理不了 agent 之間的 interaction**。

理想的系統設計應該讓「違反紀律」在結構上是困難的，而不只是在文件上是被禁止的。git worktree 就是這種結構 — 兩個 worktree 的 commit 物理上不可能混在一起。

UNKNOWNS 的 EXP 四條是關於「預測能不能被現實證偽」；SESSION-SCOPE 是關於「agent 的意圖能不能被 index 誠實反映」。兩者都是 Popper 式的東西：**系統要容許自己被抓到在騙**。

---

_v0.1 | 2026-04-11 session α（Opus 4.6, 1M context）— 提案階段，尚未進 DNA_
_觸發：11ad6bed 的 commit scope pollution 事件_
_下一步：把 Level 3 narrative detector hook 加進 `.husky/pre-commit` 並測試；寫 git worktree alias 教學進 MIGRATION 或 MAINTAINER-PIPELINE_
