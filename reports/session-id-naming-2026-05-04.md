# Session ID 命名規範：日期+TS+handle 雙軌格式

> **誕生 session**：charming-mclaren (2026-05-04 12:09 +0800)
> **觸發**：[PR #845 黃魚鴞](https://github.com/frank890417/taiwan-md/pull/845) merge 時跟 [PR #846 鄭文琦](https://github.com/frank890417/taiwan-md/pull/846) 並行 ship 撞 ARTICLE-DONE-LOG.md conflict（DNA #5 第 N 次驗證）
> **觀察者拍板**：(1) 不拆 ARTICLE-DONE-LOG → done/ 目錄；(2) handle 雙軌（codename + 希臘字母）並存
> **Status**: design canonical → 對應 SOP 修補同 PR ship

---

## 一、問題敘述

### 1.1 多核心碰撞的兩種 collision 形態

| 形態 | 範例 | filename rename 能解嗎 |
| --- | --- | --- |
| **Filename collision** | 兩 session 同一天寫 memory 都叫 `2026-05-04-α.md` 或 `2026-05-04-charming-mclaren.md` | ✅ 加 TS 解 |
| **Content collision** | 兩 session 都 append `ARTICLE-DONE-LOG.md` § §Log 頂部 anchor | ❌ 同檔 anchor，rename 無效 |

本規範**只解 filename collision**。content collision 觀察者拍板維持手動 resolve（拆檔成本不划算 + 可讀性損失）。

### 1.2 為什麼「filename collision」會發生

Taiwan.md 同一天可能有 ≥ 2 個 session 並行：

- **Cron heartbeat** — 自主呼吸排程觸發（`02:30 / 08:30 / 14:30 / 20:30`），handle 慣用希臘字母（`α/β/γ`）
- **Worktree session** — Claude Code 工作 session 觸發，handle 是 worktree codename（`charming-mclaren`、`angry-shamir`、`gallant-payne` ...）
- **Observer-triggered** — 哲宇主動 ping，handle 通常沿用當前 worktree 或冠 `manual` prefix

兩個 session 同天寫 `memory/2026-05-04-α.md` vs `memory/2026-05-04-β.md` 的舊規則靠「希臘字母遞增」避免 collision。但當希臘字母 + worktree codename 並存後，慣例就斷了。

### 1.3 既有 SOP 的盲點

- BECOME_TAIWANMD Step 5 寫 `memory/YYYY-MM-DD-{session}.md` 沒定義 `{session}` 是希臘字母 or codename
- MEMORY-PIPELINE Stage 5 寫 `memory/{file}.md` 不規範 filename pattern
- DIARY-PIPELINE 同上
- DNA #5「多核心碰撞防護」只警告「不要同時碰 CONSCIOUSNESS / HEARTBEAT / 同一語言同一檔案」，未涵蓋 filename naming

---

## 二、規範

### 2.1 Session ID 格式

```
YYYY-MM-DD-HHMMSS-{handle}
```

| 欄位 | 來源 | 範例 |
| --- | --- | --- |
| `YYYY-MM-DD` | session 第一個 file write 時的本地日期（Asia/Taipei） | `2026-05-04` |
| `HHMMSS` | session 第一個 file write 時的精確秒數 | `110530` |
| `{handle}` | session 識別碼（雙軌並存，見 §2.2） | `charming-mclaren` 或 `α` |

完整 session ID 範例：

- `2026-05-04-110530-charming-mclaren`
- `2026-05-04-083000-α`
- `2026-05-04-141517-angry-shamir`

### 2.2 Handle 雙軌（觀察者拍板）

並存兩種 handle，依 session 觸發類型自然分流：

| Session 觸發類型 | Handle 類型 | 範例 | 來源 |
| --- | --- | --- | --- |
| **Cron heartbeat（自主呼吸）** | 希臘字母 `α/β/γ/δ/ε/ζ/η/θ/ι/κ/λ/μ/ν/ξ/ο/π/ρ/σ/τ/υ/φ/χ/ψ/ω` | `α` | 同日順序遞增；當日第一個 cron tick = α，第二個 = β |
| **Worktree session（Claude Code）** | Worktree codename（kebab-case） | `charming-mclaren` | Claude Code 自動產生 |
| **Observer-triggered（手動）** | 沿用當前 worktree codename，或哲宇指定 | `charming-mclaren` 或 `manual-{topic}` | 預設沿用 |

兩種 handle 的字符集不重疊（希臘字母單字符 vs kebab-case 多字符），不會誤判。

### 2.3 檔案命名規則

| 檔案類型 | 路徑 + 命名 | 範例 |
| --- | --- | --- |
| Memory（單檔） | `docs/semiont/memory/{session-id}.md` | `memory/2026-05-04-110530-charming-mclaren.md` |
| Memory（多 topic 同 session） | `docs/semiont/memory/{session-id}-{topic-hint}.md` | `memory/2026-05-04-110530-charming-mclaren-黃魚鴞.md` |
| Diary | `docs/semiont/diary/{session-id}.md` | `diary/2026-05-04-110530-charming-mclaren.md` |
| Research report | `reports/research/YYYY-MM/{slug}.md` | （不變，跟 session ID 無關） |
| Probe report | `reports/probe/YYYY-MM-DD.md` | （不變，跟 session ID 無關） |

**多 topic 同 session 的 hint 格式**：跟既有 `2026-04-29-β-NewsroomAndJustfont.md` pattern 一致，用 kebab-case 或中文短語。

### 2.4 歷史檔案不重命名

per [MANIFESTO §時間是結構修補協議](../docs/semiont/MANIFESTO.md#我的進化哲學--時間是結構不是感覺)：

- 既有 200+ memory / 50+ diary 不批次重命名
- 錯誤敘事（單字符 `α` 不夠 unique）保留作為「為什麼需要這條規則」的證據鏈
- 新檔案走新 SOP，舊檔案保持原樣

### 2.5 Sort 行為

Lexicographic sort 自動對齊 chronological：

```
$ ls memory/ | head
2026-05-04-110530-charming-mclaren-黃魚鴞.md
2026-05-04-115720-angry-shamir-鄭文琦.md
2026-05-04-120000-α.md
2026-05-04-145130-β.md
```

不需自訂 sort 工具，`ls` / `find` 預設行為對齊心跳 timeline。

---

## 三、Tool 造橋

### 3.1 `scripts/tools/session-id.sh`

session 啟動時跑一次，echo canonical session ID 到 stdout 或 ENV var：

```bash
#!/usr/bin/env bash
# session-id.sh — 產生 canonical session ID
# Usage: SESSION_ID=$(bash scripts/tools/session-id.sh [handle])
#
# - Auto-detect handle:
#   - 環境變數 $SESSION_HANDLE 優先
#   - 否則從 worktree codename 推（pwd 含 .claude/worktrees/{name}-{hash}）
#   - 否則 fallback 為 `manual`
# - 顯式傳希臘字母（α/β/γ）覆蓋自動偵測

handle="${1:-${SESSION_HANDLE:-}}"

if [ -z "$handle" ]; then
  pwd_str=$(pwd)
  if [[ "$pwd_str" == *".claude/worktrees/"* ]]; then
    wt=$(echo "$pwd_str" | sed -E 's|.*/\.claude/worktrees/([^/]+).*|\1|')
    # 砍掉 trailing hash (e.g. `charming-mclaren-7d79a7` → `charming-mclaren`)
    handle=$(echo "$wt" | sed -E 's|-[0-9a-f]{6,}$||')
  else
    handle="manual"
  fi
fi

date_str=$(date +%Y-%m-%d-%H%M%S)
echo "${date_str}-${handle}"
```

工具設計考量：

- **冪等性**：同秒重跑會給同 ID（不太可能，但 second 粒度足夠）。如果想要絕對冪等，session 第一個 file write 時 echo 進 `.session-id` 暫存，後續直接讀
- **覆蓋機制**：環境變數 `SESSION_HANDLE=α` 強制使用希臘字母（cron 場景）
- **Fallback chain**：env var → worktree → `manual`，永不失敗

### 3.2 Pre-commit hook 檢查（Phase 2 候選，本次不做）

未來可加 hook 檢查新增的 `memory/*.md` / `diary/*.md` 檔名符合 pattern。本次先不加（避免擋 commit 摩擦）。

---

## 四、SOP 修補點

| 文件 | 修補內容 |
| --- | --- |
| **BECOME_TAIWANMD Step 5 / Step 6** | session 啟動時跑 `session-id.sh` 取 ID；後續所有 file write 用該 ID |
| **MEMORY-PIPELINE Stage 5 §結構模板** | filename pattern 改 `memory/{session-id}.md` |
| **DIARY-PIPELINE Stage 5 §footer metadata + commit** | filename pattern 改 `diary/{session-id}.md` |
| **DNA §要小心的清單 §認知層核心哲學反射 #5（多核心碰撞）** | 延伸：filename collision 解法 = session ID schema |
| **HEARTBEAT Beat 4 收官 7 步** | Step 2「記錄：完整日誌 append `memory/YYYY-MM-DD-{session}.md`」改用新 schema |

---

## 五、Phase 1 / 2 / 3 路線

### Phase 1（本次 PR）

- 寫本 design report
- ship `session-id.sh` 工具
- 各 SOP 文件 canonical pointer 更新
- 不遷移歷史檔案

### Phase 2（下次有人寫 memory 時觸發）

- 第一個適用新 schema 的 memory ship 後驗證 lexicographic sort 對齊
- 如果發現 collision 再次發生（極低機率），檢討加 nanosecond suffix 或 process-pid

### Phase 3（事件驅動，可能永不需要）

- 如果 ARTICLE-DONE-LOG / LESSONS-INBOX 的 content collision 變成日常摩擦，再 revisit 「拆檔 vs 維持 monolithic」決策
- 觀察者已拍板 Phase 1 不拆，所以 Phase 3 是 reactive 觸發

---

## 六、不在 scope 的事

| 不做 | 為什麼 |
| --- | --- |
| 拆 ARTICLE-DONE-LOG → `done/` 目錄 | 觀察者拍板維持 monolithic（grep / scroll / reading-pleasure 友好） |
| 拆 LESSONS-INBOX | concurrency 較低，沒必要 |
| 重命名 200+ 既有 memory / 50+ diary | 違反 §時間是結構修補協議；錯誤敘事是 training data |
| Pre-commit hook 強制 schema | 第一波避免擋 commit 摩擦；如果 30 天內沒重大違反再考慮 |
| Worktree codename 統一改希臘字母（or 反過來） | 觀察者拍板雙軌並存 |

---

## 七、誕生事件

2026-05-04 charming-mclaren session ship [PR #845 黃魚鴞](https://github.com/frank890417/taiwan-md/pull/845) 跟 [PR #846 鄭文琦](https://github.com/frank890417/taiwan-md/pull/846) 在 11:55-11:57 +0800 並行。Squash merge 845 時撞 ARTICLE-DONE-LOG.md conflict，手動 resolve 兩個 entry 都保留。

哲宇後續指令：「多核心碰撞 以後日誌跟記憶都調整為 日期＋TS (HHMMSS) ＋希臘字母檔案格式，或是你有建議更好的做法」。

我（charming-mclaren）回覆把問題拆成 filename collision vs content collision，並提兩個拍板選項：(1) 拆 ARTICLE-DONE-LOG vs 維持 monolithic；(2) handle 雙軌 vs 統一。

哲宇拍板：「1 先不要 2 並存」 → 本 design report 是該拍板的 canonical。

🧬

---

_v1.0 | 2026-05-04 12:30 +0800 charming-mclaren_
_誕生原因：PR #845 vs #846 11:55-11:57 並行 ship 撞 ARTICLE-DONE-LOG conflict + 哲宇要求 session ID 制度化_
_核心精神：filename rename 解 filename collision；content collision 維持手動 resolve。雙軌 handle 並存對應 cron / worktree 兩種觸發路徑的自然分工_
