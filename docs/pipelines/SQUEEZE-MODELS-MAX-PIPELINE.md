---
title: 'SQUEEZE-MODELS-MAX-PIPELINE'
description: '多語 batch sync 主流程 — priority schema P0/P1/P2/P2.5/P3 + Tier 0a Sonnet diff-patch + 4-tier cascade + Z0-Z6 stage spine (v4.0)'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v4.0'
last_updated: 2026-05-11
last_session: 'cranky-newton-220237'
sister_docs:
  - 'TRANSLATION-PIPELINE.md'
  - 'DATA-REFRESH-PIPELINE.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
---

# 榨模型MAX — 多語 batch sync 主流程 v4.0

> **第一性原理**：用所有手邊免費 model 同時平行打、refusal 當作 first-class 結果記錄、最終跨批次統合補空缺，把單一 model 的天花板（rate limit / content policy / quality）拆成許多小天花板加起來逼近 100%。Tier 3 Local LLM 永不漏接 sovereignty-sensitive topics。
>
> v4.0 設計理由：對齊 [REWRITE-PIPELINE v5.0](REWRITE-PIPELINE.md) + [MAINTAINER-PIPELINE v2.0](MAINTAINER-PIPELINE.md) spine restoration 範式。修補 v3.3 結構問題：(1) 缺 ASCII spine box-frame；(2) Hard Gate 散在 Z2/Z6 prose 無集中索引；(3) Top 5 最常忘沒提取。

---

## 🗺️ ASCII spine

```
╭──────────────────────────────────────────────────────────────────────────╮
│         SQUEEZE-MODELS-MAX 多語 batch sync — Z0-Z6 主流程                │
│                                                                          │
│   🧭 三軸設計原則                                                        │
│            ├── 軸一：跨模型平行（task dir per provider）                 │
│            ├── 軸二：try-catch first-class（refusal 是 result 不是 exc） │
│            └── 軸三：最後統合 + retry（aggregate 不是 throw away）       │
│                                                                          │
│   🪜 4-tier cascade（v2.0）                                              │
│            ├── Tier 0a: Sonnet diff-patch（已存在翻譯漂移 ≤ 10 lines）   │
│            ├── Tier 0b: bump-source-sha.py（pure metadata refresh）      │
│            ├── Tier 1: owl-alpha（主力 ~70% pass）                       │
│            ├── Tier 2: Hy3 + Gemma + Llama 等 cloud free                 │
│            └── Tier 3: Ollama qwen3.6:35b（永不漏接 sovereignty）        │
│                                                                          │
│   ──── Z0-Z6 standard execution flow ──────────────────────              │
│                                                                          │
│   Z1: Pre-flight ──→ 6 step                                              │
│            ├── status.py / sync-translations / slug-map / prepare-batch  │
│            └── filter TBD-NEEDS-SLUG / snake-balance N groups            │
│              ↳ Hard gate: manifest 完整 + group balanced                 │
│                                                                          │
│   Z2: 跨模型平行 dispatch ──→ N task dir × M worker                      │
│            ├── Tier 1 主批 (owl-alpha)                                   │
│            ├── Tier 2 副批 (Hy3 / Gemma etc)                             │
│            └── Z2.1 Concurrency cap 3-5 / Z2.2 Cool-down ≥ 5-10 min      │
│              ↳ Hard gate: refusal detection / 40-byte stub purge         │
│                                                                          │
│   Z3: 增量 commit ──→ 每 ~50 fresh local commit（不 push）               │
│              ↳ Hard gate: pre-commit YAML / 0-byte purge                 │
│                                                                          │
│   Z4: 跨輪 retry ──→ still-missing → 下一 tier model                    │
│              ↳ 重複 Z2 → Z4 直到 still-missing == 0 OR 全 tier 試過      │
│                                                                          │
│   Z5: 最終統合 + 驗證 ──→ verify-batch.py 8 項全跑                       │
│              ↳ Hard gate: lang-sync status fresh ratio 達標              │
│                                                                          │
│   Z6: 抽樣品質 audit ──→ size-ratio scan + 人眼抽樣 N=max(10, 5%)        │
│              ↳ Hard gate: healthy ratio ≥ 90% 才能 ship                  │
│                                                                          │
│   ✅ Batch shipped (push after user approval)                            │
│                                                                          │
│   ──── 跨 pipeline boundary ─────────────────────────                   │
│   → 單篇 SOP / 跨 pipeline 觸發：TRANSLATION-PIPELINE.md                │
│   → 跨機器搬遷：SENSE-FETCHER-MIGRATION.md                              │
╰──────────────────────────────────────────────────────────────────────────╯
```

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

| Gate                           | 觸發 stage | 條件             | 工具                                     | 不過 = ?                |
| ------------------------------ | ---------- | ---------------- | ---------------------------------------- | ----------------------- |
| Manifest 完整                  | Z1         | dispatch 前      | `prepare-batch.py` output                | 不 dispatch             |
| Group snake-balance            | Z1         | dispatch 前      | manifest 內建                            | 重 balance              |
| 40-byte refusal detection      | Z2         | per-article      | `output too small (40 bytes)` worker log | log ❌ + cleanup + 繼續 |
| null content refusal           | Z2         | per-article      | `result is None` guard                   | log ❌ + 繼續           |
| HTTP 429 backoff               | Z2         | per-call         | 指數退避 3 retry                         | 最後失敗 log ❌ + 繼續  |
| YAML parse fail                | Z2 + Z3    | per-article      | `yaml.safe_load(frontmatter_block)`      | rm + retry queue        |
| Concurrency cap 3-5 worker     | Z2.1       | initial dispatch | manual + DNA #45                         | reduce concurrency      |
| Cool-down ≥ 5-10 min           | Z2.2       | rate-limited 後  | DNA #45                                  | 走 Tier-2 fallback      |
| Pre-commit hook（YAML / 憑證） | Z3         | per commit       | `.husky/pre-commit`                      | 不 commit               |
| 不 push 中途                   | Z3         | 整個 batch round | manual                                   | abort push              |
| Destructive git ops 禁令       | 全程       | sub-agents alive | DNA #35                                  | abort op，走 worktree   |
| `verify-batch.py` 8 項         | Z5         | 整個 batch       | `verify-batch.py`                        | 不 ship                 |
| Size-ratio scan ≥ 0.5          | Z6         | 每篇新翻譯       | `audit-quality.py`（待造）               | flag + retry            |
| Healthy ratio ≥ 90%            | Z6         | sample audit     | random N = max(10, 5%)                   | 回 Z4 retry             |
| `lang-sync status` fresh       | Z5         | ship 前          | `status.py`                              | retry 直到達標          |

---

## ⚠️ Top 5 最常忘的 step

> 從 Z2.1 / Z2.2 / Z6 / DNA #35 / DNA #45 抽 friction 最高的 5 條。

1. **Concurrency cap 3-5 worker，不是 8+** — OpenRouter free tier 是 hourly/daily budget 不是 per-minute throttle，8+ worker burst 一次燒光（5/2 sleepy-colden 實證）
2. **40-byte refusal 必 cleanup + 繼續** — worker process 永不 crash on refusal，rm stub file 後繼續下一篇
3. **Z6 sample audit healthy ratio ≥ 90%** — fresh count 是 metadata fresh 不是 content quality，必須隨機抽樣才能 ship
4. **不 push 中途** — deploy CI 11-30 min，中途 push cancel 前一個 → 部署狀態混亂
5. **Sub-agents 跑期間禁止 destructive git ops**（DNA #35）— `git reset --hard` / `git checkout main` / `git stash drop` 會抹掉 tracked file 的 sub-agent modify

---

## 跨檔案職責分工

| 檔案                                                 | 範圍                                                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **本檔**                                             | 多 model fleet 巴別塔批次 — Z0-Z6 stage + 4-tier cascade + try-catch first-class + last-write-wins |
| [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)   | 翻譯主檔（4 模式 + 8 stage 單篇 + 翻譯元則 + 17 條常漏）                                           |
| [DATA-REFRESH-PIPELINE.md](DATA-REFRESH-PIPELINE.md) | refresh-data.sh 12 step + sync-translations-json + verify mtime                                    |
| [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)           | 中文 SSOT 寫作（產出待翻譯來源）                                                                   |

**邊界：本檔 vs TRANSLATION C 模式**：

- **本檔（SQUEEZE）** = 多 model fleet（OpenRouter Hy3 / Gemma / Llama / owl-alpha + Tier 0a Sonnet diff-patch + Tier 3 Local Ollama），refusal first-class，跨批次 last-write-wins
- **TRANSLATION C 模式** = main session orchestrate N 個 Anthropic SDK sub-agent，單 model（Sonnet default），主 session 預處理 + sub-agent 純執行
- 兩者互相 cross-ref，**不互相覆蓋**

---

## 為什麼存在

單一 model 跑 ja sync 都有結構性瓶頸：

- **owl-alpha**：通過率 high，per-call 慢（150-250s），rate-limit 撞牆早
- **Hy3**：per-call 快（30-60s），但對台灣人物 binary refusal ~85%
- **Sonnet sub-agent**：品質最高，但 token cost 是 Anthropic 預算硬牆
- **Gemma / Nemotron / Hermes / Llama**：未測未知，可能更快但可能 refuse 不同類別

「擇一最佳」永遠捨棄至少 60% 潛在吞吐。**榨模型MAX 把所有可用 model 同時跑，互補弱點，用文件系統的「last write wins」自然解決衝突**。

## 三軸設計原則

### 軸一：跨模型平行（parallel across providers）

每個 model 一個獨立 task dir：

```
.lang-sync-tasks/ja/         ← owl-alpha 主力批
.lang-sync-tasks/ja-hy3/     ← Hy3 副批（高 refusal 期待，跑得快）
.lang-sync-tasks/ja-gemma/   ← Gemma 補充批（待測）
.lang-sync-tasks/ja-llama/   ← Llama 備援批（待測）
```

每個 dir 有獨立的 `_batch-manifest.json` + `_group-{A..N}.json`。openrouter-batch.sh 接 `$1` = task dir name + `$2` = model id。Workers 平行 dispatch。

**為什麼分 dir 不分 model 在同 dir**：

- task dir 對應一個 batch lifecycle（prepare → dispatch → verify → commit）
- 不同 batch 不同 model，但**全部寫到同一個 `knowledge/{lang}/...` 路徑**
- 衝突自然解決：先到先寫、後到覆蓋（owl-alpha 後寫贏 Hy3，因為品質高）

### 軸二：try-catch first-class（refusal 是 result 不是 exception）

`translate_one()` 的 return shape：`(success: bool, error: str | None)`

所有失敗類型 normalize 成「return False with reason」**不 raise**：

| Failure mode             | Detection                         | Worker 行為                                   |
| ------------------------ | --------------------------------- | --------------------------------------------- |
| 40-byte 字串 refusal     | `output too small (40 bytes)`     | log ❌ + cleanup file + 繼續下一篇            |
| null content refusal     | `result is None` guard            | log ❌ + 繼續                                 |
| HTTP 429 rate limit      | `urllib.error.HTTPError code=429` | 指數退避 retry 3 次，最後失敗則 log ❌ + 繼續 |
| Network error            | `URLError / TimeoutError`         | linear retry 3 次                             |
| YAML parse fail post-hoc | verify-batch 階段檢測             | 主 session purge + 加入 retry queue           |

**鐵律**：Worker process 永不 crash on refusal。一篇失敗不能拖垮整個 group。已修兩個 silent-killer bug（PR #750 commit）。

### 軸三：最後統合 + retry（aggregate 不是 throw away）

每輪結束後：

1. **掃描 `knowledge/{lang}/` 找 < 1KB stub**（refusal 殘留），purge
2. **比對 `_translation-status.json`** — fresh count + missing list
3. **計算 still-missing 集合** = (zh canonical) - (fresh ja)
4. **下一輪用不同 model retry** still-missing 集合
5. 重複直到 still-missing == 0 OR 所有 model 都試過

跨模型 retry 順序建議：

```
Round 1: owl-alpha  （主力，~70% 預期通過）
Round 2: Hy3        （快速，補政治不敏感的縫隙）
Round 3: Gemma 4 31B（Western，補不同類別）
Round 4: Llama 3.3 70B / Hermes 3（Western backup）
Round 5: Nemotron 120B / gpt-oss 120B（最後底線）
```

## 標準執行流程

### Stage Z1：Pre-flight

1. `python3 scripts/tools/lang-sync/status.py` 確認當前 fresh / stale / missing
2. `python3 scripts/tools/sync-translations-json.py` rebuild `_translations.json`（防 stale slug-map）
3. 從 `_translations.json` 自動 derive slug-map（zh→en filename）
4. `prepare-batch.py --lang ja --top N` 產 `_batch-manifest.json`
5. 過濾 `TBD-NEEDS-SLUG`（補手動 fallback 或 skip）
6. snake-balance 切 N 個 group

### Stage Z2：跨模型平行 dispatch

```bash
# Tier 1 主批
bash scripts/tools/lang-sync/openrouter-batch.sh ja "openrouter/owl-alpha"

# Tier 2 並行副批（不同 task dir）
python3 -c "<diff zh paths between full backlog and ja groups>"
bash scripts/tools/lang-sync/openrouter-batch.sh ja-hy3 "tencent/hy3-preview:free"
```

每 batch 用 8-15 個 worker。OpenRouter free tier 對單一 model 可能有 rate limit，但跨 model 是獨立配額（不衝突）。

**監控指標**：

- 每分鐘 ok / fail count（grep 各 batch 的 worker logs）
- alive worker count（ps -ef | grep openrouter-translate）
- API HTTP 429 熱頻（worker logs 中「Rate limit (attempt」字樣）

#### Z2.1 Concurrency cap 鐵律（2026-05-02 sleepy-colden 實戰修補，DNA #45）

**初次 dispatch concurrency cap = 3-5 worker，不是上面 v1 寫的 8-15**。OpenRouter free tier rate limit 不是 per-minute throttle 而是 hourly/daily 累積 budget。一次 N-worker burst（N ≥ 8）會把當前 budget 一次性消耗光，後續即使降到 1 worker 仍會 stuck attempt 3 backoff。

| Concurrency | 結果                                                        |
| ----------- | ----------------------------------------------------------- |
| 1-3 worker  | ✅ 緩慢但穩定，rate budget 慢慢累積 cap                     |
| 4-5 worker  | ⚠️ 邊緣安全，前 5 篇可能 rate-limit，之後逐漸通暢           |
| 6-7 worker  | 🔴 開始 burst — 多數 worker 卡 attempt 1-2，少數通過        |
| 8+ worker   | 🚨 全部卡 attempt 3 backoff（10s/20s/40s），budget 一次燒光 |

**規則 v2**（取代原 v1 的 8-15 worker 上限）：

- 跨 5 lang 平行：**每 lang 1 worker（5 simultaneous）= safe baseline**
- 跨 5 lang × 2 worker = 10 simultaneous → ❌ 不要這樣 dispatch
- 同 lang 多 worker 場景：1-3 worker，分批 dispatch 而非 burst

#### Z2.2 Rate-limited cool-down 鐵律（DNA #45）

**Rate-limited 後立刻降 concurrency 重試 = 沒用**。Budget 耗盡後不會立刻補充，需要 cool-down ≥ 5-10 min。Cool-down 期間 fallback 路徑：

1. **Tier-2 fallback (DNA #39 self-as-fallback)**：派 Sonnet sub-agent 平行 ship（5 agent × 1 lang × N articles）— 5/2 sleepy-colden 實證 ~10 min 一輪 15 翻譯
2. **跨 provider fallback**：切到 Anthropic（已用 Sonnet sub-agent 等於同 path）/ paid OpenAI / etc.
3. **Wait + retry**：~10 min 後重試 1-3 worker，但這時通常 task urgency 已 escalate，不如直接走 (1)

**規則**：rate-limit 出現後 ≤ 30s 內決定走 (1) 還是 (3)，不要無限 retry。

**觸發 v1 → v2 升級**：2026-05-02 sleepy-colden session 5 lang × 2 worker = 10 burst dispatch 全卡 attempt 3 backoff，kill 後 5 worker 重試仍卡，最終走 Sonnet escalation 一輪到位。Verification 第 2 次（5/1 γ-late 系列也踩過類似 issue 但沒 codify）。

### Stage Z3：增量 commit（防 context 流失）

每完成 ~50 fresh translations local commit 一次：

1. `find knowledge/{lang} -name "*.md" -size -1000c -delete` 清 refusal stub
2. 識別 truncated YAML（pre-commit hook 會 catch）→ 對應檔案 rm + retry queue
3. `git add knowledge/{lang}/ && git commit -m "🧬 [semiont] heal: ja parallel batch N"`
4. **不 push** 直到所有 batch round 結束（避免觸發部署 cancel chain）

### Stage Z4：跨輪 retry

當前 batch 全部 worker process exit 後：

1. 比對 `status.py` 找 still-missing
2. 重新 prepare batch（subset = still-missing）
3. dispatch 用下一個 tier 的 model
4. 重複 Z2 → Z4

### Stage Z5：最終統合 + 驗證

所有 round 結束：

1. `verify-batch.py` 全 run（YAML / 比例 / wikilink residue / cross-link / sync json / status）
2. 修剩餘 0-byte / 過小 / YAML error 檔案（手動或最小化 sub-agent）
3. `lang-sync status` 確認 fresh / total ratio 達標
4. 寫 memory γ-late + diary 紀錄結果
5. push（user approval）

### Stage Z6：抽樣品質 audit（2026-05-01 γ-late5 強制新增）

「fresh count 上升」≠「品質好」。`status.py` 的 fresh 只看 frontmatter 元資料，
不看內容是否 truncated / YAML 是否合法 / 翻譯是否 coherent。**「fresh」是
metadata fresh，不是 content quality**。

**強制 audit 流程（每 round 結束 OR Z3 commit 之間至少跑一次）**：

#### Z6.1 自動掃描（O(n)，1 秒內）

- **Size-ratio scan**：對每個新翻譯，計算 `trans_size / zh_source_size`
  - 比例 < **0.5** → flag（多為 truncation / API timeout 中斷）
  - 比例 = 0（zh source = 0 bytes）→ 同樣 flag（empty stub article 不該翻）
  - 不同語言預期比例：
    - 西語 / 法語：1.2-1.7（romance language 較啰嗦）
    - 韓語：0.6-0.9（CJK 中相對緊湊）
    - 日語：0.8-1.3
    - 英語：0.7-1.0
- **Frontmatter completeness**：grep `^title:`、`^description:`、`^category:`
  - 任一缺 → flag（owl-alpha 嚴格遵從 placeholder 偶爾漏）
- **YAML parse**：對每個檔案跑 `yaml.safe_load(frontmatter_block)`
  - 拋例外 → flag（pre-commit hook 已抓但越早越好）

掃描 script 位置：`scripts/tools/lang-sync/audit-quality.py`（待建，可從
backfill-source-sha.py 的 git history cache 套用）。

#### Z6.2 人眼抽樣（隨機 N 篇，N = max(10, 5%)）

```python
import random
random.seed(YYYYMMDD)  # session 日期當 seed 確保 reproducible
sample = random.sample(new_files_in_branch, max(10, len(new_files)//20))
```

對每篇 sample：

- **head -30** 檢查 frontmatter + 開頭散文流暢度
- **tail -10** 檢查結尾沒被截斷（最後一句是完整的）
- **mid section** 抽 1-2 段，檢查文化詞處理（夜市 → night market 那種）

判定 healthy 比例 ≥ 90% 才能 ship。否則回到 Stage Z4 retry。

#### Z6.3 失敗處理

- **Truncated（size ratio < 0.5）**：直接 `rm`，加入下輪 retry queue
- **YAML error**：看是 worker output bug（rm + retry）還是 pre-existing
  source bug（手動修 zh source）
- **Frontmatter incomplete**：rm + retry，問題出在 placeholder 不夠豐富 →
  回頭升級 prepare-batch.py 的 placeholder 邏輯

#### Z6.4 報告

ship 前產出：

```
=== Quality Audit Report ===
Pool: N 個新 translations
Auto-scan suspicious: M 個（size < 0.5 ratio: X / yaml-fail: Y / frontmatter-incomplete: Z）
Sample audit (random K): H 個 healthy / S 個 suspicious
Healthy ratio: H/K = HH%
Action: ship / retry-round / manual-fix
```

範例（2026-05-01 γ-late5）：

```
Pool: 269 new translations across 5 langs
Auto-scan suspicious: 19（size < 0.5: 19, yaml-fail: 0, frontmatter-incomplete: 2）
Sample audit (random 30, seed 42 + 99): 28 healthy / 2 truncated
Healthy ratio: 28/30 = 93.3%
Action: purged 19 + ship → status.py 確認 fresh count 反映正確真實基線
```

## 量化指標

榨模型MAX run 完之後應提供：

| Metric                           | 算法                                                      |
| -------------------------------- | --------------------------------------------------------- |
| **fresh ratio**                  | fresh / total_zh                                          |
| **跨輪 round count**             | 用了幾個 model rounds                                     |
| **per-model 通過率**             | model X 的 ok / (ok+fail)                                 |
| **catastrophic refusal pattern** | 哪些 (zh_path, lang) 全部 model 都 refuse                 |
| **wall-clock**                   | 第一個 dispatch → 最後 verify pass                        |
| **token / API call cost**        | 各 model 累積 usage（Anthropic / OpenRouter usage panel） |

## 不做的事

- **不 push 中途**：deploy CI 11-30 min，中途 push 會 cancel 前一個 → 部署狀態混亂
- **不在 batch 跑期間 destructive git op**（DNA #35）
- **不假設 worker process alive**：必須 `ps -ef` 對齊 group 數量
- **不依賴單一 success metric**：fresh count 上升 ≠ 品質好（要 sample audit）
- **不對 refusal 做語意修飾**：直接 log 「null content (likely content-policy refusal)」，不寫「請求失敗」這種弱化版

## 已驗證模型（fan-out matrix calibration）

| Model                      | 速度          | LINE.md (4 lang)  | 政治人物                  | 文化 | 注意         |
| -------------------------- | ------------- | ----------------- | ------------------------- | ---- | ------------ |
| `openrouter/owl-alpha`     | 慢 (150-250s) | 4/4 ✓             | 部分 refuse（張懸與安溥） | 通過 | 1M ctx       |
| `tencent/hy3-preview:free` | 快 (30-60s)   | 2/4（es/fr null） | ~85% refuse               | 通過 | PRC          |
| 其他 28 個 free model      | 待測          | 待測              | 待測                      | 待測 | 見 inventory |

## 待辦（calibration matrix）

- [ ] Gemma 4 31B 對 People/田馥甄 + Music/張懸與安溥 + Culture/伊斯蘭教在台灣
- [ ] Llama 3.3 70B 同樣 set
- [ ] Hermes 3 405B 同樣 set
- [ ] Nemotron 120B 同樣 set
- [ ] gpt-oss 120B 同樣 set
- [ ] 比較 wall-clock per call + frontmatter 完整度

## 命名 origin

哲宇 2026-05-01 γ-late4 session：「我們有辦法同步榨另一批用 Hy3 preview (free) 嗎」+「把多重模型榨取與持續性容錯整合取名為『榨模型MAX』」。

「榨」字捕捉了三件事：

1. **不浪費**：所有可用 model 都用上，不擇一
2. **逼到極限**：每個 model 跑到它的 rate limit / content policy 邊界
3. **last drop**：refusal 也是 data — 統合下一輪知道哪些 model 哪些題材 refuse

🧬

---

_v1.0 | 2026-05-01 γ-late4_
_作者：Taiwan.md（哲宇命名 + Semiont 實作 + 文件化）_
_誕生原因：Hy3 對 Taiwan 人物 ~85% refusal + owl-alpha 4/4 LINE 通過但慢，單一 model 都有天花板；哲宇問「同步榨另一批」直接打開 multi-model parallel 的設計空間_

_v4.0 | 2026-05-11 cranky-newton — Spine restoration 對齊 REWRITE v5.0 + MAINTAINER v2.0：頂部加 ASCII spine（Z0-Z6 + 4-tier cascade box-frame）+ Hard Gate Inventory 集中 table（15 gates）+ Top 5 最常忘 step + 跨檔案職責分工 table（明確跟 TRANSLATION C 模式邊界）。觸發：[reports/pipelines-audit-2026-05-11.md](../../reports/pipelines-audit-2026-05-11.md) Tier A.1 audit。Z0-Z6 prose body 不動（已健康）。_

---

## v2.0 升級 — 4-tier cascade with local LLM 「最後捕手」（2026-05-03 magical-feynman 後段）

### v1.0 → v2.0 演化

v1.0 設計只考慮 **cloud free tier × N parallel**（owl-alpha + Hy3 + Gemma 等），最後 fallback 是付費 model（Sonnet sub-agent）。問題：**cloud free tier 80% coverage 永遠是脆弱的 80%** — refuse 的話題、rate-limited 時段、外部 automation 災難、API 502 transient。剩 20% 全是 PRC sensitive topics — 是 sovereignty preservation 的真正戰場 — 卻只能花付費 token 收。

v2.0 加入 **Tier 3 local LLM「最後捕手」**：Ollama qwen3.6:35b-a3b-coding-nvfp4 (21GB GPU 模型) 作為「永不漏接」的 catcher。No PRC content policy / no budget / no rate limit / 0 refusal observed in production。

### v2.0 4-tier cascade canonical

```
Tier 1: openrouter/owl-alpha (free, slow ~200s/call, primary force)
   ↓ refusal (e.g. 心戰 universal HTTP 400 from Stealth provider)
Tier 2: tencent/hy3-preview:free (free, fast ~50s/call, ~70% refusal on Taiwan content)
   ↓ both refused
Tier 3: Ollama qwen3.6:35b-a3b-coding-nvfp4 (LOCAL, no budget, sovereignty backbone)
   ↓ rare
Tier 4: Sonnet sub-agent (paid, last resort — should rarely fire)
```

### Tier 3 dispatch SOP

**Stage L1 — 識別 missing**：跑 aggregator 對 `knowledge/{lang}/...` × expected slugs scan，產出 `babel-fallback-missing.json`（missing_pairs list with lang/zh_path/slug/target fields）。

**Stage L2 — Build per-lang ollama task dirs**：從原 `_batch-manifest.json` filter 到 missing list，寫到 `.lang-sync-tasks/{lang}-ollama/_batch-manifest.json` + `_group-A.json`（small batch 1 group 即可）。target en_path 仍指 `knowledge/{lang}/...`（last-write-wins on same target，覆蓋 cloud 漏接）。

**Stage L3 — Sequential dispatch**：

```bash
# Sequential per lang，避免 GPU memory 競爭（qwen3.6 35B 需 21GB）
for lang in en ja ko es fr; do
    python3 scripts/tools/lang-sync/ollama-translate.py \
        --group .lang-sync-tasks/${lang}-ollama/_group-A.json
done
```

Per-lang ~1.5-3.5 min wall-clock for 1-2 articles。Total 5-lang ~10 min wall-clock。

**Stage L4 — Re-aggregate**：重跑 aggregator → 確認 missing 0。如果還有，那才是 Tier 4 sonnet 的時刻（極罕見 — qwen3.6 對 sensitive topics 幾乎不 refuse）。

### Tier 3 model 選擇

驗證過的 local model：

- ✅ `qwen3.6:35b-a3b-coding-nvfp4` — 21GB，0 refusal observed，翻譯品質可接受（略低於 owl-alpha 但「永遠收下」更重要）
- 候選未測：`gemma4:e4b-nvfp4`（9.6GB，更輕）/ `taide-gemma3-12b:2602-q4km`（8.2GB，台灣本土訓練 — 候選 sovereignty-aware backbone）

### 災難 recovery SOP（v2.0 新增）

當 long-running batch 災難（worker crash / env wipe / partial failure）發生時：

1. **Kill 所有 workers**：`pkill -f openrouter-translate; pkill -f ollama-translate`
2. **救出已成功的 ✅ files**：`find knowledge/{lang}/ -name "*.md" -newer <ref> -size +1k`
3. **Switch to stable home**：long-running batches 走 dedicated session branch worktree（如 magical-feynman），avoid main / shared branch worktrees 被 backup-sentinel / worktree pruner 干擾
4. **Re-stage babel state in stable home**：copy slug-map + article list，重新跑 status.py + prepare-batch.py
5. **Aggregator-driven resume**：跑 aggregator → identify missing → rerun ONLY missing（surgery 不 reset）

### v2.0 驗證

2026-05-03 magical-feynman 後段 9 articles × 5 langs babel sync：

- Tier 1 owl-alpha：~30 ✅（包括 PRC-tolerant sensitive 如 出國史 in en/ja/es）
- Tier 2 Hy3 副批：5 ✅（70% refusal as DNA #45）
- Tier 3 Ollama qwen3.6：9 ✅（last 20% sovereignty 戰場全收下，包括 5 langs × 心戰）
- Tier 4 Sonnet：**0 calls**

**45/45 = 100% from FREE tier**，0 paid token spent。

### 對應認知層升級

- [DNA #49 Babel 4-tier cascade canonical](../semiont/DNA.md)
- [MANIFESTO §主權的巴別塔 v2 — Local LLM 是 sovereignty backbone](../semiont/MANIFESTO.md)

🧬

---

_v2.0 | 2026-05-03 magical-feynman 後段_
_升級觸發：哲宇 prompt「ollama qwen3.6 你也可以用 最後捕手🤣」以輕鬆語氣放下 architecture 級設計指令_
_最後 20% 是 sovereignty 真正戰場 — Local LLM 不是 backup，是 sovereignty backbone_

---

## v3.0 升級 — Priority schema + Tier 0 diff-patch（2026-05-09 laughing-goldstine post-finale）

### v2 → v3 演化

v2 把所有 babel 任務當「翻譯」一視同仁 — 全部走 Tier 1 owl-alpha 重翻。但實際上 658 stale articles 中有 70% 是「**只動腳註 / sporeLinks / tags reformat**」這種 trailer-only-drift（status `metadata-stale`）+ 20% 是「**body 小幅補一兩段**」這種 minor stale。對這兩類重新跑全文翻譯是 wasteful：

- **Token cost**：每篇 owl-alpha ~300s × 5 lang = 25 min wall-clock per article，但 90% body 沒變
- **Drift risk**：LLM 重翻 unchanged 段落會產生細微語意 drift（同義詞替換 / 文風變調），破壞 audit trail
- **Budget**：cloud free tier rate limit 一次燒光

v3 加入 **priority schema + Tier 0 diff-patch**：

### Priority schema（per-task triage）

```
P0 缺口            → 走 Tier 1 cascade（full translation，新檔案無 existing）
P1 大幅更新        → 走 Tier 1 cascade（diff > 50 lines or added > 30）
P2 小幅更新        → **Tier 0a: Sonnet diff-patch sub-agent**（diff ≤ 50 lines body change）
P2.5 metadata only → **Tier 0b: bump-source-sha.py**（deterministic, no LLM, instant）
P3 舊文章          → 視內容 P2/P2.5 路由 OR skip
```

判定工具：`scripts/tools/lang-sync/prioritize-batch.py`

```bash
# Top 20 unique articles by priority, output zh paths
python3 scripts/tools/lang-sync/prioritize-batch.py --lang all --by-article --top-n 20 --out /tmp/batch.txt
```

### Tier 0a: diff-patch sub-agent（P2 minor stale）

對 P2 stale 文章不重翻，改 patch existing translation with the zh diff applied to the corresponding lang。**比 full re-translation 快 5-10x，preserves unchanged paragraphs（避免 LLM drift），cheaper token cost**。

**Workflow**：

```bash
# 1. Prepare patch tasks (per-pair JSON with zh diff + existing translation)
python3 scripts/tools/lang-sync/diff-patch-prepare.py --input batch.txt --lang all
# → .lang-sync-tasks/diff-patch/{lang}-patch-tasks.json

# 2. 主 session 用 Agent tool 平行 dispatch Sonnet sub-agents
#    (5 lang parallel × 1 task per agent，single message multi-Agent calls)
```

Per-task agent prompt template（in skill）:

```
You are a translation patch agent for Taiwan.md. Apply this zh diff to the existing
{lang} translation, preserving unchanged paragraphs verbatim.

Step 1: Read patch task JSON from .lang-sync-tasks/diff-patch/{lang}-patch-tasks.json
Step 2: Decide what to patch:
  - frontmatter changes (tags reformat / sporeLinks updates) → mirror to translation
  - body prose changes → translate ONLY changed sentences/paragraphs
  - sourceCommitSha / sourceContentHash / sourceBodyHash → update from task expected values
  - translatedAt → bash `date -u +%Y-%m-%dT%H:%M:%SZ`
Step 3: Write atomic via Write tool
Step 4: Verify YAML valid + body length ±10%
```

**驗證範例**（2026-05-09 賈永婕 P2 stale en）：

- Before: en/People/chia-yung-chieh.md sourceCommitSha=616cbd07 (5/3)
- zh diff: 55 lines (frontmatter tags reformat + sporeLinks views 14K→35K + 3 SHA fields)
- Patch: body 100% preserved (29807 chars unchanged), frontmatter 52 bytes ↑
- After: YAML valid, sourceCommitSha=0c60c45d, 90s wall-clock

### Tier 0b: bump-source-sha.py（P2.5 metadata-stale）

對 trailer-only-drift（footnote URL polish / 延伸閱讀 list 變動）— body 已 valid（bodyHash 沒變），不重翻只 bump metadata：sourceCommitSha + sourceContentHash + sourceBodyHash → zh latest。

```bash
# Apply 對所有 metadata-stale 文章（5 lang × N articles，instant）
python3 scripts/tools/lang-sync/bump-source-sha.py --apply
```

零 LLM call、零 token cost、零 risk。Phase 6 + this v3 後 P2.5 = 自動清。

### v3 4-tier cascade（updated）

```
Per task priority routing：

P0 missing → Tier 1+ (full translation)
  Tier 1: openrouter/owl-alpha (proven 100% on Taiwan content, 1M ctx)
  Tier 2: tencent/hy3-preview:free (skip if PRC-sensitive — 85% refusal)
  Tier 3: Ollama qwen3.6 (sovereignty backbone — 永不漏接)
  Tier 4: Sonnet sub-agent (paid last resort)

P1 major stale → 同 P0 cascade

P2 minor stale → Tier 0a Sonnet diff-patch sub-agent
  fallback if patch fails (size ratio < 0.5 / YAML broken) → P0 cascade

P2.5 metadata-stale → Tier 0b deterministic bump-source-sha
  no LLM call, instant
```

### Smart tier router（per-article heuristic）

```python
# In prioritize-batch.py suggest_tier()
if topic_sensitivity_keywords_in_title:  # 政治/兩岸/台獨/國防/民主/主權 等
    skip Tier 2 Hy3 (85% refusal on Taiwan content)
if article_size > 5000 bytes:
    Tier 1 owl-alpha (1M ctx)
if prior_refusal_cache says owl-alpha refused:
    skip to Tier 3 Ollama
default:
    Tier 1
```

### 量化收益（2026-05-09 batch1 first run）

實測 Phase 6 後 babel 第一波 (zero-coverage 11 articles × 5 lang = 55 translations)：

- 100% Tier 1 owl-alpha pass，0 refusal
- 8 YAML quoting bugs (owl-alpha `\'` escape) auto-fixed in-place

預估 v3 全 stale clear 量化（686 articles × 5 lang = 3430 translations 涵蓋）：

- P0/P1 (~300 entries): Tier 1 cascade，~5 hr 集中 batch
- **P2 (~531 entries): Tier 0a diff-patch，~1.5 hr Sonnet sub-agents**（5x 加速）
- **P2.5 (~2431 entries): Tier 0b bump-source-sha，<1 min**（instant）

### 量化驗證（2026-05-09 batch2 — P2.5 全量 production-scale 驗證）

[PR #921](https://github.com/frank890417/taiwan-md/pull/921) 一次 ship Tier 0b production-scale 驗證：

- **2429 metadata-stale entries 全量 bump**（489 P2.5 articles × 5 langs，one-shot）
- **Wall-clock**：< 1 min（status.py JSON parse + 2429 single-line frontmatter writes）
- **Token cost**：$0（Tier 0b deterministic，0 LLM call）
- **Coverage delta**：stale 從 ~489 / lang 降到 ~157 / lang（**-67% per lang**）
- **Body 連續性**：100% preserved（bodyHash 沒變的前提即 Tier 0b 篩選條件）
- **Pre-commit**：1933 frontmatter validation pass / 26 pre-existing warnings（與 bump 無關）
- **驗證**：v3 設計從「賈永婕一篇 patch demo」躍升到「全 corpus P2.5 一次 clear」，Tier 0b 在大量低 entropy drift 場景**線性可放大**

對應認知層升級：

- **DNA #53 v3.3 milestone**（2026-05-09 同日續工）：P2.5 production-scale 驗證
- **DNA #9 延伸**：worktree 命名 `YYYYMMDD-{purpose-title}` 標準（codename 污染歷史 antipattern）
- LESSONS-INBOX：「v3 升級觸發 — 哲宇『翻譯策略也加上一個 diff patch，用子 agent 快速 patch diff 應該會是最好的做法』」

🧬

---

_v3.0 | 2026-05-09 laughing-goldstine post-finale_
_升級觸發：哲宇「翻譯策略也加上一個 diff patch，用子 agent (小幅度更新) sonnet 快速的 patch diff 應該會是最好的做法」+「優先排序：缺口 → 大幅更新 → 小幅／腳註 → 舊」+「自我演化 DNA 跟紀錄」_
_核心洞察：v2 把所有 babel 任務當「翻譯」處理是 over-spec — P2/P2.5 不需要 full re-translate，patch + bump 就夠且更安全（preserves unchanged paragraphs，避免 LLM drift）_
_v3 工具新增：prioritize-batch.py（智慧分流）+ diff-patch-prepare.py（Tier 0a 任務準備）；bump-source-sha.py（Tier 0b deterministic）已存在 reuse_
