# TRANSLATION-PIPELINE.md — 翻譯流程 v3.0

> **職責分工：**
>
> - **本文件** → 翻譯流程的所有 stage、決策點、批次合併、新語言啟用 SOP
> - [`REWRITE-PIPELINE.md`](REWRITE-PIPELINE.md) → 中文 SSOT 文章重寫流程（翻譯不重寫，這是不同 pipeline）
> - [`EVOLVE-PIPELINE.md`](EVOLVE-PIPELINE.md) → 數據驅動的內容進化策略
> - [`docs/community/LANGUAGE-STATUS.md`](../community/LANGUAGE-STATUS.md) → 語言狀態（active / preview / disabled）
> - [`src/config/languages.ts`](../../src/config/languages.ts) → LANGUAGES_REGISTRY SSOT
>
> ⚠️ **每個 stage 的 hard rules 都是經驗教訓凝固的，繞過會撞同一個坑**。

---

## 為什麼需要 v3.0

v1 是「英文翻譯流程」，cron-based，現已暫停（Issue #229）。
v2 沒寫過。
**v3.0（2026-04-14 η session）是用 60 PR 一日合併的實戰經驗重寫的完整 pipeline**。

### 觸發 v3.0 的事件

- **2026-04-14 η session**：ceruleanstring 24 小時送 60 個翻譯 PR（韓 40 + 法 20）
- 全部撞 `_translations.json` cascade conflict
- 法文沒在 `astro.config.mjs` locales 裡 → 即使 merge 也是 orphan
- 翻譯檔 4-22% 沒有 `translatedFrom` → 潛在 514 個孤兒
- pre-commit hook 把翻譯誤殺成 zh-TW 文章標準

每一個都是「設計時沒想過這個 case」。v3.0 把所有 case 編碼進來。

---

## 翻譯元則（觀察者校準 canonical — 2026-04-30 δ）

> 觸發：2026-04-30 δ session 觀察者下達 EN 批次更新任務時校準的核心方向。
> 這些元則**位階高於八階段流程**——任何 stage 的判斷與翻譯實作都應 rooted in 這四條。

### 1. 精準 / 專業 / 快速（三軸 trade-off 不可分）

**精準**：每個事實 / 引語 / 數字 / 人名 / 機構 / 法律條文都要對得上中文 SSOT，不腦補、不 paraphrase 走樣。
**專業**：英文用詞貼合該主題的 academic / industry register，不是觀光英文也不是機翻腔（避免 "the so-called"、"as you may know"、"interesting" 這類 filler）。
**快速**：批次任務不 over-engineer 個別篇章；mental budget 5-15 min/篇基準（短文 5、中文 10、長文 15），超 budget 表示有結構性問題（中文 SSOT 原文不清 / 引用斷裂 / wikilink 大規模重排）需要先 escalate 不是硬翻。

### 2. 從中文 SSOT 投影到英文（projection mental model）

翻譯**不是替換字詞**，是把中文 SSOT 的策展視角投影到英文讀者的 reference frame：

- **保留**：核心矛盾（core tension）、人物 / 地點 / 時間 anchor、引語 verbatim、腳註 source URL
- **重新框定**：類比（用「韓台 1987 雙民主化」對韓國讀者，用「Singapore Flyer-scale」對英文讀者）、文化常識（中文讀者懂的「夜市」「廟口」要 contextualize）、政治語境（China-Taiwan 關係用詞精準避歧義）
- **不要硬翻**：中文俗語直譯通常 broken（「換湯不換藥」≠ "change soup but not medicine"），找對應英文 idiom 或重述本意

每篇翻譯前先問：「中文 SSOT 的核心矛盾一句話講是什麼？英文讀者拿到這篇文章要帶走什麼？」

### 3. 不預設篇幅（length follows content，not template）

中文 SSOT 多長，英文翻譯就多長——**不主動精簡也不主動擴寫**。常見 trap：

- 中文 8,000 字英文寫 4,000 字 = AI 摘要陷阱（`translation-ratio-check.sh` 會抓 <0.55）
- 中文 1,500 字英文寫 3,000 字 = 過度解釋陷阱（為英文讀者「補背景」變成新增內容）

中文 SSOT 是 ground truth；篇幅由它決定。如果中文敘事在英文 reference frame 真的需要補一句 contextualize（例：「318 學運 = 太陽花」），用 inline parenthesis 一句話帶過，不開新段。

### 4. Frontmatter 與 cross-reference 是品質基線

兩個非常容易在批次任務中走樣：

**Frontmatter 紀律**：

- `translatedFrom: 'Category/原中文.md'` 必填（pre-commit 強制）
- `sourceCommitSha` / `sourceContentHash` / `translatedAt` 三欄位用 `refresh.sh --apply --sha-only` 自動更新，不手動寫
- `title` / `description` mirror 中文 SSOT 的 frontmatter 結構（不憑空增減欄位）

**Cross-reference 處理（鐵律）**：

- **wikilinks**（`[[文章名]]`）：目標語言**有對應翻譯** → 改成 `[[en-equivalent]]` 或對應路徑；**沒對應翻譯** → **轉純文字 + 中文括號**（`Lai Ching-te (賴清德)`），不留 broken wikilink
- **延伸閱讀區塊**（`## 延伸閱讀`）：列表中的每一條 wikilink 同上規則處理；如果該語言版本完全沒翻譯 → 暫時保留中文 anchor + 加註 `(zh only)`，不偽造翻譯路徑
- **腳註 source URL**：保留原始 URL（中文媒體報導不替換成英文版本，**source 不漂白**）；description 翻成英文但不改 source identity

每篇翻譯完跑 `verify-internal-links.sh --sample` 抽查 broken ratio。

---

## SSOT 原則（讀此前必懂）

```
語言註冊表 SSOT       →  src/config/languages.ts + .mjs
                         ↓ derive
i18n 路由 / sitemap / hreflang / dashboard 全部自動

每篇翻譯的 source SSOT →  frontmatter translatedFrom: 'Category/原中文檔.md'
                         ↓ derive
knowledge/_translations.json (cache, by sync-translations-json.py)
```

**鐵律：**

1. **不要手動編輯** `knowledge/_translations.json` — 會被下次 sync 覆蓋
2. **不要硬編碼語言列表** — 從 `src/config/languages.{ts,mjs}` import
3. **每個翻譯檔必須有** `translatedFrom` — pre-commit hook 會 reject
4. **加新語言只改兩個檔案** — `languages.ts` + `languages.mjs`，所有其他地方自動 derive
5. **翻譯不重寫 SSOT 邏輯** — 中文 SSOT 在 `knowledge/{Category}/`，翻譯在 `knowledge/{lang}/{Category}/`

---

## 三種模式

### A. 單篇翻譯（個別貢獻，最常見）

一個 contributor 翻譯一篇文章。走 Stage 0 → 7。

### B. 批次合併（外部 contributor 一次送 N 個 PR）

外部 contributor 一次送 N 個 PR 涵蓋整個分類。需要 maintainer 額外跑批次合併流程（見 §批次合併工作流）。

### C. Maintainer 平行 sub-agent 批次翻譯（lang-sync 補空缺）

Maintainer 用 `lang-sync status` 抓出 stale/missing 清單，spawn N 隻 sub-agent 平行處理 N 篇。走 §平行 sub-agent 批次翻譯 SOP（2026-04-30 δ 新增）。

---

## 平行 sub-agent 批次翻譯 SOP（Maintainer，2026-04-30 δ 新增）

> **場景**：lang-sync status 揭露 EN/JA/KO 大量 missing/stale，maintainer 想用 1 隻主 session + N 隻 sub-agent 平行批次補空缺。
>
> **觸發事件**：2026-04-30 δ session 首次跑 4 隻 Opus agent × 5 篇 = 20 篇，wall-clock ~33 min（vs sequential ~67 min agent time）。發現批次 antipattern：分散探索浪費。SOP 化避免下次重踩。

### 核心原則：分散探索 → 集中預處理 + 分散執行

平行 N 個 agent 跑同一份 prompt，每個 agent 都從零探索同樣決策空間（slug 命名 / wikilink target lookup / frontmatter 三欄位 / refresh.sh 行為）= **重複工作 ×N**。下次同樣 agent 同樣 brief 還是會重新探索一次，不累積。

正確設計：**主 session 一次預處理所有「探索」工作，sub-agent 只負責「執行」翻譯本身**。Agent prompt 變得明確、短、不需要決策。

### 整合 SOP：5 階段

```
Stage P1: 主 session 預處理   (slug 命名 + wikilink target map + frontmatter placeholder)
            │
Stage P2: 分組 + dispatch    (N 隻 sub-agent，每隻 K 篇，平行)
            │
Stage P3: Sub-agent 純執行   (只翻譯，不管 frontmatter / refresh.sh / sync json)
            │
Stage P4: 主 session 統一驗證 (grep frontmatter / ratio / wikilink / cross-link)
            │
Stage P5: 一次 commit + push (整批一個 commit)
```

### Stage P1：主 session 預處理（強制）

**目的**：把 sub-agent 不該重新發現的決策都在主 session 一次性決定好。

**輸出 artifact**：`.lang-sync-tasks/{lang}/_batch-manifest.json`，schema：

```json
{
  "lang": "en",
  "batch_id": "2026-04-30-δ",
  "articles": [
    {
      "zh_path": "Lifestyle/合作社.md",
      "status": "missing",
      "en_path": "knowledge/en/Lifestyle/cooperatives-in-taiwan.md",
      "slug": "cooperatives-in-taiwan",
      "zh_head_sha": "d78f10ae",
      "wikilink_targets": {
        "教育系統": "/en/Society/education-system-and-admissions-culture/",
        "便利商店": "(zh only — convert to plain text)"
      },
      "frontmatter_placeholder": {
        "translatedFrom": "Lifestyle/合作社.md",
        "sourceCommitSha": "d78f10ae",
        "sourceContentHash": "sha256:0fc2fc46b99c9535",
        "translatedAt": "2026-04-30T22:00:00+08:00"
      }
    }
  ]
}
```

**主 session 預處理動作**：

1. **Slug 命名統一**：先全批決定 slug 風格（短 vs 長 descriptive subtitle），不讓不同 agent 各自決定產生不一致（δ 觀察：A `cooperatives-in-taiwan` 短 vs B `tsao-hsing-cheng-from-chip-tycoon-to-anti-china-defender` 長 — 同批不一致）
   - 規則 v1：人物條目 + 知名度低 → 加 descriptive subtitle；人物條目 + 知名度高 → 純 romanized；非人物 → 短描述
2. **Wikilink target map**：對每篇 zh source grep `[[X]]`，主 session 一次性 lookup `knowledge/en/` 對應 en 路徑，標記「en exists / en missing」並寫進 manifest。Sub-agent 直接照表填，不重新查
3. **Frontmatter placeholder injection**：refresh.sh 對 NEW translation **不會 insert 三欄位**（regex sub 只 update existing key）— **已知 gap，workaround 是預先注入空 placeholder**：
   ```yaml
   translatedFrom: 'Category/原中文.md'
   sourceCommitSha: ''
   sourceContentHash: ''
   translatedAt: ''
   ```
   主 session 在 manifest 裡準備好「目標 frontmatter 模板」給 sub-agent 直接用
4. **YAML tags 紀律**：在模板裡明示「所有 tag 值必須引號包覆，包含 year (`'1949'` 不是 `1949`)」— 避免 YAML 解析 integer 觸發 pre-commit reject（δ 踩過）
5. **Subcategory passthrough 規則**：明示 `subcategory` 欄位**保留 zh value verbatim**（不翻譯），避免 sub-agent 自行翻譯破壞 dashboard 分類

### Stage P2：分組 + dispatch

- N 隻 sub-agent，每隻 K 篇，平行 dispatch（單一 message 多個 Agent tool call）
- **Sonnet 為預設模型**（2026-04-30 δ 後升級）— 翻譯任務複雜度落在 Sonnet 4.6 處理範圍，速度 + token efficiency 優於 Opus，品質差距可由主 session verify 補齊
- Agent prompt 必須**self-contained**（每隻 agent 帶它自己的 manifest slice + 翻譯規則 + 元則 pointer）
- 文章大小要平均分配（不要一隻 agent 拿全部大長文）— δ 觀察 Batch B 23.7min vs Batch C 10.6min 是因為 B 拿了兩篇認知作戰 50K+ 字
- **每隻 sub-agent 限 1 retry**（避免 token budget 失控）

### Stage P3：Sub-agent 純執行（簡化指令）

Sub-agent prompt 只含這幾條（從 δ 經驗精簡）：

```
你是翻譯 agent。你的任務是把 N 篇 zh 文章按 manifest 翻成 en。

MANIFEST: {附 manifest slice 給這隻 agent 的 K 篇}

每篇步驟：
1. Read brief: .lang-sync-tasks/en/{slug}.brief.md
2. 翻譯（per TRANSLATION-PIPELINE §翻譯元則 — 精準/專業/快速 + 中→英投影 + 不預設篇幅）
3. Write to manifest 指定的 en_path
4. Frontmatter 直接用 manifest 的 frontmatter_placeholder（不自己生）
5. Wikilinks 按 manifest.wikilink_targets 填（不自己 lookup）

不要做：
- 不要跑 refresh.sh（主 session 統一處理）
- 不要跑 sync-translations-json.py（主 session 統一處理）
- 不要修改 zh source（knowledge/Category/）
- 不要 debug 工具行為（主 session 已預處理）

報告：列出 K 個 en_path 實際寫入的檔案 + 任何遇到 zh source 異常（如 markdown bug）。
```

### Stage P4：主 session 統一驗證

```bash
# 1. 存在 + frontmatter 完整度（agent claim 不可信，必須 grep）
for p in <all en paths>; do
  test -f "$p" || echo "❌ MISSING: $p"
  grep -q "^translatedFrom:" "$p" || echo "❌ no translatedFrom: $p"
  grep -q "^sourceCommitSha: '[a-f0-9]" "$p" || echo "❌ empty sourceCommitSha: $p"
done

# 2. Translation ratio
bash scripts/tools/translation-ratio-check.sh <all en paths>

# 3. Wikilink residue (should be 0)
grep -lE '\[\[[^]]+\]\]' <all en paths>

# 4. Cross-article link integrity (Python)
# 對所有 (/en/...) 連結驗證目標檔案存在

# 5. Sync derived caches
python3 scripts/tools/sync-translations-json.py

# 6. status.py 確認從 stale/missing 升 fresh
python3 scripts/tools/lang-sync/status.py --lang en
```

**任何一項 fail 就 fix 後重 verify**。不 commit 含 broken 的批次。

### Stage P5：一次 commit + push

整批一個 commit（不要每篇一個）。Commit message 含：

- 批次規模（N 篇 / N 隻 agent / wall-clock）
- Status 變化（fresh 數量、coverage %）
- Pipeline 改動（如有）
- 教訓 candidates pointer 進 LESSONS-INBOX

### 速度 + 品質最佳化指引

| 維度         | 慢/差的選擇                           | 快/好的選擇                                       |
| ------------ | ------------------------------------- | ------------------------------------------------- |
| 模型         | Opus（高品質但慢 + 貴）               | **Sonnet（預設，2026-04-30 後）**                 |
| 文章分組     | 隨機分配                              | 按字數平均分（避免單 agent 拿全部大長文）         |
| Slug 命名    | 各 agent 自決定                       | **主 session 預處理**（manifest 統一）            |
| Wikilink     | 各 agent 自 lookup                    | **主 session 預處理 wikilink target map**         |
| Frontmatter  | 各 agent 自生成                       | **主 session 提供 placeholder 模板**              |
| refresh.sh   | 各 agent 自跑（NEW translation 失效） | **主 session 統一處理**（per stage P4）           |
| Verification | trust agent self-report               | **主 session 強制 grep + bash check**（不 trust） |
| Retry 預算   | 無限                                  | **每 agent 限 1 retry**（防 token 失控）          |
| Commit 粒度  | 每篇一個 commit                       | **整批一個 commit**（commit history 乾淨）        |

### 已知 gaps（pipeline 該硬化）

1. **`refresh.sh --apply --sha-only` 對 NEW translation 失效**：regex sub 不 insert 新 key。Workaround：主 session 預先注入空 placeholder（Stage P1），或寫 `refresh.sh --apply --sha-only --insert` 子命令支援 NEW case
2. **無 `_batch-manifest.json` schema 工具**：Stage P1 的 manifest 目前要主 session 手動拼。應該寫 `lang-sync/prepare-batch.sh <lang> <article-list>` 自動生成
3. **無 `verify-batch.sh`**：Stage P4 的 6 項 check 散落在不同腳本。應該包成單一 `lang-sync/verify-batch.sh <batch-manifest>`

這三個是下一次批次（≥50 篇）前該優先補完的造橋鋪路項。

---

## 八階段流程（單篇翻譯）

```
Stage 0: 決定翻譯什麼     (從 SSOT 找有價值的中文文章)
           │
Stage 1: 架構檢查         (確認目標語言 enabled，或接受 preview 狀態)
           │
Stage 2: 來源準備         (鎖定中文檔，記下 translatedFrom 路徑)
           │
Stage 3: 重寫式翻譯       (重寫視角，不是逐字翻譯)
           │
Stage 4: Frontmatter 紀律 (translatedFrom 必填、其他欄位 mirror 規則)
           │
Stage 5: 內部連結轉換     (wikilinks、延伸閱讀、相對路徑 → 對應語言路徑)
           │
Stage 6: 驗證             (translation-ratio + format-check + sync --check)
           │
Stage 7: Commit           (走 pre-commit hook，包括 translatedFrom 強制檢查)
           │
Stage 8: 後合併           (sync json + dashboard 重生 + 抽樣驗證)
```

### Stage 0: 決定翻譯什麼

**目標**：選擇一篇有翻譯價值的中文 SSOT 文章。

**選擇依據（優先序）：**

1. **GA 高流量但缺翻譯** — 用 `cat public/api/dashboard-analytics.json` 找 top articles 7d，比對 [`orphan-translation-check.sh`](../../scripts/tools/orphan-translation-check.sh) 找哪些缺對應語言版本
2. **SC 搜尋者期待但找不到** — 跑 `fetch-search-events.py` 看 zero-result queries 是否有特定語言搜尋
3. **Hub 頁面優先** — 一個 Hub 頁面是一整個分類的入口，翻譯 ROI 高
4. **熱門人物 / 時事** — 鄭麗文、安溥、五月天等爆發後立刻翻譯

**避免：**

- 已經有翻譯但「該更新」的——這是「更新翻譯」，不是「新翻譯」，要走額外流程（見 §更新已存在翻譯）
- F 級品質的中文原文——先重寫原文（走 [REWRITE-PIPELINE](REWRITE-PIPELINE.md)）再翻譯
- People/ 政治人物未經事實查核就翻譯——錯誤資訊放大到多語言

**輸出**：一個 zh-TW 檔案路徑，例如 `knowledge/Music/五月天.md`

---

### Stage 1: 架構檢查 (Architecture Gate)

**目標**：確認目標語言在 `LANGUAGES_REGISTRY` 是 `enabled: true` 還是 `preview`。

**為什麼是 gate**：MANIFESTO §造橋鋪路「新細胞天生健康」。把翻譯放進沒架構的目錄等於創造孤兒。

**檢查指令：**

```bash
# 看 active vs preview
cat src/config/languages.ts | grep -A 5 "code: '<lang>'"

# 或讀總覽
cat docs/community/LANGUAGE-STATUS.md
```

**判斷：**

| 狀態           | 條件                            | 動作                                                                                     |
| -------------- | ------------------------------- | ---------------------------------------------------------------------------------------- |
| ✅ **Active**  | `enabled: true`                 | 直接進 Stage 2，translation 上線後立刻可訪問                                             |
| ⏸️ **Preview** | `enabled: false`，已在 registry | 仍可翻譯，但 PR 描述要標 `(preview-{lang})`，告知 contributor 上線時間取決於 UI 字串完成 |
| ❌ **未註冊**  | 不在 registry                   | **不要翻譯**。先讓 maintainer 加進 registry（`languages.ts` + `.mjs`），再開始翻譯       |

**新語言請求流程**：見本檔 §新語言啟用流程

---

### Stage 2: 來源準備

**目標**：鎖定中文 SSOT 路徑，為 frontmatter 的 `translatedFrom` 欄位準備。

**步驟：**

1. **確認原文存在** — `ls knowledge/{Category}/{filename}.md`
2. **確認原文穩定** — 用 `git log --since="7 days ago" -- knowledge/{Category}/{filename}.md` 看最近有沒有大改。如果原文剛改 → 等幾天讓變動穩定
3. **記下 translatedFrom 路徑** — 格式：`'{Category}/{filename}.md'`（**不要含 `knowledge/` 前綴**，這是 v1 的 bug）
4. **讀整篇原文** — 不能只讀標題和開頭。重寫式翻譯需要理解原文的論點骨架

**範例：**

```
原文路徑: knowledge/Music/五月天.md
translatedFrom: 'Music/五月天.md'
目標路徑: knowledge/{lang}/Music/mayday.md
```

⚠️ **常見錯誤**：把 `translatedFrom` 寫成 `'knowledge/Music/五月天.md'`（多了 `knowledge/`）。sync-translations-json.py 會幫你 strip prefix 但仍會在 audit 時警告。

---

### Stage 3: 重寫式翻譯（不是逐字翻譯）

**核心原則**：翻譯是觀點重建，不是文字替換。

> DNA Sonnet 反射 #1：翻譯 ≠ 摘要。AI 預設行為是摘要。必須明確下「完整翻譯」指令。
> DIARY 觀察（4/8 δ）：用讀者已知的座標系解釋比逐句翻譯有效 100 倍。

**翻譯品質檢核：**

| 檢查項   | 通過標準                                                | 工具                                            |
| -------- | ------------------------------------------------------- | ----------------------------------------------- |
| 字數比   | 翻譯字數 / 原文字數 ≥ 0.55                              | `bash scripts/tools/translation-ratio-check.sh` |
| 文化詞彙 | 該保留中文的保留（人名/地名/作品名），該音譯/意譯的處理 | 人工                                            |
| 引語     | 翻譯該語言的版本，**保留中文原引語**（雙語呈現）        | 人工                                            |
| 腳註     | 全部保留，URL 不變，連結文字翻譯                        | 人工                                            |
| 開場     | 重寫成適合該語言讀者的角度，不直譯                      | 人工                                            |

**文化詞彙處理規範（從韓文/日文翻譯經驗萃取）：**

```yaml
# 保留中文（給該語言讀者一個「異國感」鉤子）
人名: 「五月天」「焦安溥」「鄭麗文」
作品名: 「島嶼天光」「玫瑰色的你」
地名: 「萬華」「西門町」（首次出現可加注音）

# 音譯（該語言已有約定俗成）
韓文: 阿信 → 아신
日文: 阿信 → アシン

# 意譯 + 中文括號
人生無限公司 → 人生無限公司 (Mayday's "Life Tour")
```

**重寫式翻譯的具體手法：**

1. **重寫開場**：原文中文開場可能是「2000 年的高雄夏天，三個高中生⋯」。韓文版可以從韓國讀者熟悉的對應點切入（「韓國 1997 年 H.O.T. 出道時，台灣三個高中生在游泳池邊組了滅火器⋯」）
2. **加入跨文化參照點**：日文版翻五月天可以提及「アジアのストーンズ」（亞洲的滾石樂團），韓文版可以提到「대만의 god」（台灣的 god）
3. **保留所有事實細節**：日期、數字、人名、地名一字不改
4. **不要省略段落**：摘要式翻譯是 AI 預設行為，必須抗拒

---

### Stage 4: Frontmatter 紀律

**目標**：每個翻譯檔的 frontmatter 必須完整且正確。

**必填欄位（pre-commit hook 強制）：**

```yaml
---
title: '한국어 제목' # 翻譯後的標題
description: '...' # 翻譯後的描述
date: 2026-03-23 # 鏡像原文的 date，不是翻譯日期
tags: [메이데이, Mayday, 록 음악] # 翻譯 + 保留中文/英文標籤
category: 'Music' # 英文 category 名（不翻譯！跟原文一致）
subcategory: '팝 음악' # 可翻譯
author: 'Taiwan.md Translation Team' # 或 contributor 自己
readingTime: 12min # 鏡像原文
featured: true # 鏡像原文（contributors 不要自己改！）
translatedFrom: 'Music/五月天.md' # 🔴 必填，pre-commit hook 強制
---
```

**Mirror 規則（哪些必須跟原文一樣）：**

| 欄位             | Mirror 原文?          | 為什麼                                     |
| ---------------- | --------------------- | ------------------------------------------ |
| `date`           | ✅ 必須 mirror        | 內容歷史日期，不是翻譯日期                 |
| `featured`       | ✅ 必須 mirror        | 由 maintainer 統一決定，contributor 不該改 |
| `category`       | ✅ 必須英文，跟原文同 | category 是技術分類，全站統一              |
| `tags`           | ⚠️ 部分翻譯部分保留   | 通用詞翻譯，專有名詞保留中文               |
| `subcategory`    | ⚠️ 翻譯               | 顯示用                                     |
| `readingTime`    | ✅ mirror             | 不必重算                                   |
| `translatedFrom` | 🔴 必填               | SSOT                                       |

**Pre-commit hook 行為（2026-04-14 η 上線）：**

```bash
# Hook 自動檢查 staged knowledge/{en,ja,ko,es,fr}/*.md
# 缺 translatedFrom → reject
# featured: true 在 ZH SSOT 才檢查（翻譯允許 mirror 原文 featured）
# bad_fn_format 在 ZH SSOT 才檢查（翻譯腳註可有自己的格式）
```

---

### Stage 5: 內部連結轉換

**目標**：把原文的 wikilinks 和延伸閱讀連結轉成對應語言路徑。

**這是最常被遺漏的 stage**。原文用 `/music/張懸與安溥/`，韓文版仍寫 `/music/張懸與安溥/` 會 404 — 應該是 `/ko/music/張懸與安溥/`。

**轉換規則：**

| 原文                             | 韓文版                          | 為什麼                             |
| -------------------------------- | ------------------------------- | ---------------------------------- |
| `[安溥](/music/張懸與安溥/)`     | `[안푸](/ko/music/張懸與安溥/)` | URL slug 保持中文（i18n 路由規則） |
| `[[安溥]]` (wikilink)            | 必須轉成 markdown link          | Astro 不渲染 wikilinks             |
| `[^1]: [Wikipedia](https://...)` | 完全保留，不改 URL              | 引用是事實追溯                     |

**檢查工具：**

```bash
bash scripts/tools/verify-internal-links.sh --sample 30  # 內部連結 broken ratio
bash scripts/tools/orphan-translation-check.sh ko        # 翻譯孤兒偵測
```

⚠️ **歷史教訓**（DNA 反射 #19）：Tailwind Phase 6 反向 sed 把 ja/ko slug.astro 的路徑換錯方向，整整 2 天 ja/ko 頁面服務 EN 內容。**任何 sed/批次替換 commit 必須跑 verify-internal-links.sh smoke test**。

---

### Stage 6: 驗證

**目標**：在 commit 前確認翻譯品質 + 結構正確。

**必跑檢查：**

```bash
# 1. 字數比（防止 AI 摘要式翻譯）
bash scripts/tools/translation-ratio-check.sh knowledge/ko/Music/mayday.md
# 通過：≥ 0.55；不通過：TRUNCATED 警告

# 2. 格式檢查
bash scripts/tools/format-check.sh --json | grep mayday
# 通過：no fatal errors

# 3. 翻譯來源同步檢查
python3 scripts/tools/sync-translations-json.py --check
# 通過：✅ in sync；不通過：列出缺 translatedFrom 的檔案

# 4. 孤兒偵測
bash scripts/tools/orphan-translation-check.sh ko
# 通過：✅ 有映射；不通過：⚠️ 缺映射（孤兒）/ 🔴 重複
```

**驗證通過 checklist：**

- [ ] `translatedFrom` 在 frontmatter
- [ ] `category` 是英文且跟原文一致
- [ ] `featured` mirror 原文
- [ ] `date` mirror 原文
- [ ] 字數比 ≥ 0.55
- [ ] 所有腳註保留（URL 不變）
- [ ] wikilinks 已轉成 markdown links
- [ ] 內部連結指向正確的 `/{lang}/` 路徑
- [ ] format-check 無 fatal error
- [ ] sync-translations-json --check 通過

---

### Stage 7: Commit

**目標**：通過 pre-commit hook，commit 並 push。

**Commit message 規範：**

```
translate({lang}): {Category}/{filename} → {translated-filename}

或對批次：
translate({lang}): {Category} batch N (M articles)
```

**Pre-commit hook 自動執行：**

1. ✅ frontmatter 驗證（test-frontmatter.mjs）
2. ✅ wikilink 殘留檢查
3. ✅ wikilink 目標存在性
4. ✅ **translatedFrom 強制檢查**（4/14 η 新增）
5. ✅ 腳註格式檢查（只對 ZH SSOT，翻譯豁免）
6. ✅ language registry sync 檢查（如果改了 languages.ts/.mjs）
7. ✅ 憑證掃描

**如果 hook 失敗：**

- 不要 `--no-verify` 繞過。讀錯誤訊息修。
- 第三次撞同樣的 hook 失敗 → 不是個案，是工具設計問題，停下來修工具

---

### Stage 8: 後合併

**目標**：merge 後確認系統感知到新翻譯。

**自動執行（refresh-data.sh 一鍵）：**

```bash
bash scripts/tools/refresh-data.sh
# 包含：
# [1/4] git pull
# [2/4] 三源感知抓取
# [2.5/4] sync _translations.json from frontmatter ⭐ 新加 (η)
# [3/4] npm run prebuild (dashboard JSON 重生)
# [4/4] GitHub stats
```

**手動驗證：**

```bash
# 1. 確認 _translations.json 有新條目
grep "$translated_filename" knowledge/_translations.json

# 2. 確認 dashboard 認到新翻譯
cat public/api/dashboard-organism.json | python3 -c "
import json,sys
d=json.load(sys.stdin)
for o in d['organs']:
    if o['id']=='translation':
        print(o['metrics']['langHealthDetails'])
"

# 3. dev server 跑開頁面
npm run dev
# 開 http://localhost:4321/ko/music/五月天/
```

---

## 批次合併工作流（Maintainer）

當一個 contributor 一次送 ≥3 個翻譯 PR 時用這個流程。**今天 60 PR 海嘯就是用這個（升級版本）**。

### 步驟 1: 全景診斷

```bash
bash scripts/tools/bulk-pr-analyze.sh --author <username>
# 輸出：作者×類型×語言×merge 狀態×明細
```

### 步驟 2: 語言架構檢查

```bash
# 法文這類 preview 語言要先確認是否在 registry
grep "code: 'fr'" src/config/languages.ts
```

如果是 active 語言 → 走 §3a
如果是 preview 語言 → 走 §3b（cherry-pick 為 preview，不啟用路由）
如果完全沒註冊 → 拒絕，請貢獻者等架構

### 步驟 3a: Active 語言批次合併（韓文/日文/英文）

**舊流程（v1，已過時）**：用 `gh pr merge` 一個一個合 → 撞 cascade conflict。

**新流程（2026-04-14 η 證實 35/35 成功）**：

```bash
# 確認 .gitattributes 有 union driver
grep "_translations.json merge=union" .gitattributes
# 沒有就加：echo "knowledge/_translations.json merge=union" >> .gitattributes

# 跑批次 local merge 腳本
/tmp/local-merge-prs.sh PR1 PR2 PR3 ...
# 內含：fetch refs/pulls/N → git merge --no-ff (union driver) → JSON 驗證 → push
```

**邊界 case**：union merge 偶爾在 JSON 邊界保留兩個 closing brace → JSON invalid。腳本會 catch 並 abort 該 PR，需手動修補逗號 + dedupe re-write。

### 步驟 3b: Preview 語言批次合併（法文/西文/未來新語言）

**為什麼不能直接 merge**：legacy `_translations.json` 可能跟新 sorted 結構衝突。

**Cherry-pick + sync 工作流（4/14 η 證實 20/20 成功）：**

```bash
/tmp/cherry-merge-prs.sh PR1 PR2 PR3 ...
# 對每個 PR：
#   1. gh pr diff --name-only → 抓 .md 檔清單
#   2. git fetch origin pull/N/head:tmp-pr-N
#   3. git checkout tmp-pr-N -- <each .md file>  (跳過 _translations.json)
#   4. python3 scripts/tools/sync-translations-json.py  (從 frontmatter 重建)
#   5. git commit + push
#   6. 不對 PR 做 merge commit，因為 cherry-pick 不會自動 close
# 全部 cherry-pick 完，手動跑 gh pr close + 一則綜合感謝
```

⚠️ **bash 陷阱**：`for f in $files` 對含空格檔名（`_Food Hub.md`）會 split。用 `while IFS= read -r f; do ... done < <(...)`。

### 步驟 4: 一則綜合感謝（不要 spam N 則小留言）

對最後一個 merged 的 PR 留一則完整感謝：

- 數據變化（譯前後文章數、覆蓋率、語言器官分數）
- 用貢獻者語言寫
- 提到下一步（preview 語言要說明 UI 字串還沒做）

**範例**：[PR #458 韓文批次感謝](https://github.com/frank890417/taiwan-md/pull/458) / [PR #461 法文批次感謝](https://github.com/frank890417/taiwan-md/pull/461)

### 步驟 5: 後驗證

```bash
bash scripts/tools/refresh-data.sh
bash scripts/tools/verify-internal-links.sh --sample 50
npx astro build  # 確認 1900+ 頁面通過
```

---

## 新語言啟用流程

**從 0 到 active 的完整路徑（學自 4/14 η LANGUAGES_REGISTRY 重構）：**

### 階段 1: 註冊（Preview 狀態）

```typescript
// src/config/languages.ts (記得也改 .mjs)
{
  code: 'vi',
  displayName: 'Tiếng Việt',
  hreflang: 'vi',
  enabled: false,  // 開始是 preview
  notes: 'New language pending UI translation',
}
```

```bash
bash scripts/tools/check-language-registry-sync.sh  # 確認 .ts 和 .mjs 同步
```

### 階段 2: 接受翻譯 PR 為 preview

contributor 可以開始送翻譯，PR 會 cherry-pick 進 main 但沒有路由。**這是「先讓貢獻者努力變成現實，再啟用路由」的緩衝層**。

### 階段 3: UI 字串翻譯（maintainer 工作）

複製 `src/i18n/*.ts` 各檔案的某個 active 語言 block，翻譯成新語言：

- ui.ts (UI 字串總表)
- about.ts / contribute.ts / home.ts / map.ts / notfound.ts / resources.ts / taiwanShape.ts / changelog.ts / dashboard.ts
- 約 150+ keys 要翻

### 階段 4: 啟用

```typescript
// src/config/languages.ts
{
  code: 'vi',
  ...
  enabled: true,  // ⭐ 改這一行
}
```

```bash
# 全 build 驗證
npx astro build
# 預期：1900+ 頁面，包含 vi/* 路由
bash scripts/tools/verify-internal-links.sh --sample 30
```

### 階段 5: 公開宣告

更新 `docs/community/LANGUAGE-STATUS.md` 從 preview 移到 active。
所有累積的 preview 翻譯**一夜之間上線**。

---

## 我們常漏掉的 17 件事（從歷史教訓萃取）

> 每一條都至少撞過一次。寫進來是為了不撞第二次。

1. **`translatedFrom` 欄位** — 4-22% en/es 翻譯歷史上沒有 → 4/14 η backfill 514 個檔案
2. **`category` 用中文寫** — 應該是英文（'Music' 不是 '音樂'），ja/ko 早期翻譯曾經寫中文 category
3. **`category` 跟分類路徑不一致** — frontmatter 寫 People，檔案在 Music/ → category-check.sh 才偵測得到
4. **`date` 用翻譯日期不是原文日期** — 應該 mirror 原文 date（內容歷史時間）
5. **`featured: true` 被 contributor 自己加** — 應該 mirror 原文，contributors 不該改
6. **wikilinks 殘留** — `[[X]]` 在 Astro 不渲染，必須轉成 markdown link
7. **內部連結沒加 /{lang}/ 前綴** — `[安溥](/music/...)` 在 ko 版會 404，應該 `/ko/music/...`
8. **slug 改名導致孤兒** — 原文檔名重命名後翻譯檔的 translatedFrom 變孤兒（sync-translations-json --check 偵測）
9. **AI 摘要式翻譯（字數比 < 0.55）** — translation-ratio-check.sh 強制偵測
10. **批次 PR 都撞 `_translations.json` cascade conflict** — `.gitattributes` union driver 解
11. **Hub 檔案被當 article 計入翻譯數** — \_Hub.md / \_Home.md 不算
12. **PR 來自 stale base，merge 後產生 invalid JSON** — 用 cherry-pick + sync 流程而非 merge
13. **多個 PR 同時改同一個 \_translations.json key** — sync 工具的 dedupe 處理
14. **未啟用語言被當作 active 寫進 sitemap** — registry `enabled: false` 防止
15. **PR description 沒說明翻譯了哪些檔案** — 良好慣例：表格列出 source → translated
16. **Tags 全部翻譯** — 應該保留專有名詞中文（人名/作品名）
17. **翻譯一個 Hub 但忘了翻分類下的文章** — Hub 的價值依賴底下的內容存在

---

## 更新已存在翻譯（翻譯漂移）

**情境**：原文 4 個月前翻譯了，最近更新了原文 30%。翻譯版本沒跟上。

**偵測**：

```bash
# 找翻譯日期 < 原文 lastVerified 的檔案
python3 -c "
import os, frontmatter
from pathlib import Path
for f in Path('knowledge/ko').rglob('*.md'):
    if f.name.startswith('_'): continue
    fm = frontmatter.load(f).metadata
    tf = fm.get('translatedFrom')
    if not tf: continue
    src = Path('knowledge') / tf
    if not src.exists(): continue
    src_fm = frontmatter.load(src).metadata
    src_modified = src.stat().st_mtime
    trans_modified = f.stat().st_mtime
    if src_modified > trans_modified + 86400 * 7:
        print(f'{f}: drift > 7 days')
"
```

**處理**：當更新原文時，如果該文有翻譯：

- 在 commit message 標 `[trans-drift]` 提醒
- 開 issue 通知翻譯維護者
- 或自己更新所有翻譯版本

（**未實作的工具**：`detect-translation-drift.sh` — 待造）

---

## 工具索引

| 工具                                                                                     | 用途                                                                            | Stage                     |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------- |
| [`backfill-translated-from.py`](../../scripts/tools/backfill-translated-from.py)         | 從 \_translations.json 回填 translatedFrom 到每個翻譯檔 frontmatter             | 一次性遷移                |
| [`sync-translations-json.py`](../../scripts/tools/sync-translations-json.py)             | 從 frontmatter 重建 \_translations.json（含 --check / --dry-run / orphan 偵測） | Stage 6, 8                |
| [`check-language-registry-sync.sh`](../../scripts/tools/check-language-registry-sync.sh) | 確認 languages.ts 跟 languages.mjs code list 同步                               | pre-commit                |
| [`orphan-translation-check.sh`](../../scripts/tools/orphan-translation-check.sh)         | 偵測孤兒 / 重複 / EN→ZH 鏈斷裂                                                  | Stage 6, Heartbeat Beat 1 |
| [`category-check.sh`](../../scripts/tools/category-check.sh)                             | frontmatter category vs 檔案路徑一致性                                          | Stage 6                   |
| [`translation-ratio-check.sh`](../../scripts/tools/translation-ratio-check.sh)           | 字數比 ≥ 0.55，防 AI 摘要式翻譯                                                 | Stage 6                   |
| [`verify-internal-links.sh`](../../scripts/tools/verify-internal-links.sh)               | 內部連結 broken ratio < 1%                                                      | Stage 5, 8                |
| [`format-check.sh`](../../scripts/tools/format-check.sh)                                 | 7 維度格式檢查（30 秒概覽、腳註格式、wikilink 殘留⋯⋯）                          | Stage 6                   |
| [`bulk-pr-analyze.sh`](../../scripts/tools/bulk-pr-analyze.sh)                           | 一指令看完所有 open PR 全景（作者/語言/分類）                                   | Maintainer 批次合併步驟 1 |
| [`review-pr.sh`](../../scripts/tools/review-pr.sh)                                       | 五層免疫審核 PR（含未 merge 模式）                                              | Maintainer PR review      |
| `/tmp/local-merge-prs.sh`                                                                | active 語言批次 local merge（git merge with union）                             | 步驟 3a                   |
| `/tmp/cherry-merge-prs.sh`                                                               | preview 語言 cherry-pick + sync workflow                                        | 步驟 3b                   |
| [`refresh-data.sh`](../../scripts/tools/refresh-data.sh)                                 | 完整資料更新 pipeline，包含 sync-translations                                   | Stage 8                   |
| [`.gitattributes`](../../.gitattributes)                                                 | union merge driver for \_translations.json                                      | 批次合併基礎建設          |

**未實作但有價值（待造）：**

- `detect-translation-drift.sh` — 偵測翻譯與原文時間漂移
- `add-language.sh` — 新語言一鍵 scaffold（編輯兩個 registry 檔案）
- `translation-coverage-report.sh` — 各語言覆蓋率報告（哪些分類最缺）
- `auto-merge-translation-pr.sh` — bulk-pr-analyze + local-merge-prs 整合工作流

---

## 與其他 pipeline 的關係

```
TRANSLATION-PIPELINE (本檔)
       │
       ↓ depends on
LANGUAGES_REGISTRY (src/config/languages.ts)  ← LANGUAGE-STATUS.md
       │
       ↓ produces
knowledge/{lang}/*.md (file-level SSOT)
       │
       ↓ derive cache
knowledge/_translations.json
       │
       ↓ consumed by
generate-dashboard-data.js / build-search-index.mjs / SEO.astro hreflang
```

**不重複 REWRITE-PIPELINE**：翻譯不是重寫。如果原文需要重寫（quality-scan ≥ 8），先走 REWRITE-PIPELINE 修原文，再翻譯。

**不重複 EVOLVE-PIPELINE**：EVOLVE 是「數據驅動該寫什麼新文章」，TRANSLATION 是「該翻什麼既有文章」。兩者互補。

---

## Heartbeat 整合

**Beat 1 §3 語言器官診斷必跑：**

```bash
bash scripts/tools/orphan-translation-check.sh
bash scripts/tools/category-check.sh
python3 scripts/tools/sync-translations-json.py --check  # 偵測孤兒
```

**Beat 1 §3b PR 全景：**

```bash
bash scripts/tools/bulk-pr-analyze.sh
# 看是否有翻譯 PR 海嘯
```

**Beat 3 翻譯 PR review：**

如果 PR 是翻譯 → 走 §批次合併工作流 §步驟 1-5
如果是新語言請求 → 走 §新語言啟用流程

**Beat 4 收官時：**

`refresh-data.sh` 自動跑 sync-translations-json，無需手動處理 \_translations.json

---

## 變更歷史

- **v1.0** | 2026-04-04 — 初版，描述英文翻譯流程（cron-based）
- **v1.1** | 2026-04-08 — 加入批次翻譯模式 v2
- **暫停** | 2026-04 — Issue #229 暫停英文 cron 翻譯
- **v3.0** | 2026-04-14 η — **完全重寫**。基於 60 PR 一日合併實戰經驗 + LANGUAGES_REGISTRY 重構 + translatedFrom SSOT 模式 + .gitattributes union driver + cherry-pick workflow + 17 條常漏 + 完整工具索引。觸發：ceruleanstring 60 PR 海嘯 + 哲宇要求重新設計 pipeline
- **v3.1** | 2026-04-30 δ — 新增 §翻譯元則（觀察者校準四條：精準/專業/快速 + 中→英投影 + 不預設篇幅 + frontmatter & cross-ref 鐵律）。觸發：哲宇 EN 批次更新任務時直接 dictate 元則，需 canonical 化高於八階段流程的方向感。
- **v3.2** | 2026-04-30 δ — 新增 §平行 sub-agent 批次翻譯 SOP（C 模式）+ 三模式架構重整（A 單篇 / B 外部批次合併 / C maintainer 平行 sub-agent）。觸發：4 隻 Opus agent × 5 篇首次跑後揭露批次 antipattern（分散探索浪費 / agent claim 不可信 / refresh.sh insert gap）。SOP 5 階段（P1 預處理 / P2 dispatch / P3 純執行 / P4 統一驗證 / P5 commit），Sonnet 升為預設模型，列出三個 known gaps 待造橋。

---

_「翻譯不是文字替換，是觀點重建。一個語言版本不是中文的鏡像，是該語言讀者眼中的台灣。」_
