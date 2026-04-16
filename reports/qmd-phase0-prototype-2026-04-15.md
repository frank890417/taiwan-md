# qmd Phase 0 原型驗證報告

> **執行**：2026-04-15 β session
> **對應規劃**：[qmd-memory-retrieval-plan-2026-04-15.md](qmd-memory-retrieval-plan-2026-04-15.md)
> **對象**：[tobi/qmd](https://github.com/tobi/qmd) v2.1.0
> **結論**：🟡 **Conditional GO** — 可整合但需緊湊 scope

---

## TL;DR

1. ✅ **中文 vector search work**（Google EmbeddingGemma-300M 對繁中召回可用）
2. ❌ **CJK BM25 完全壞**（多位元組無 word segmentation，中文 query 0 results）
3. ❌ **Hybrid `qmd query` 不可用**（81s cold / 10s warm + 召回反而更差）
4. ✅ **Pure `qmd vsearch` 快且準**（warm <1s，具體詞 query 召回好）
5. ⚠️ **Cold CLI 2-10s 不穩定**，daemon/MCP 才能 <1s
6. ⚠️ **Default disk 2.1GB**，vsearch-only 可降到 **323MB**
7. ⚠️ **抽象概念 query 召回弱**，具體詞 query 召回強
8. ❌ **無 temporal filter**（vsearch 沒 `--since` 參數）

**Go/No-go**：**GO Phase 1**，但條件緊縮：daemon/MCP + vsearch-only + 刪掉兩個不用的模型 + Beat 0.5 定位「輔助」不是「取代」。

---

## 一、設置與數據

### 安裝

```bash
npm install -g @tobilu/qmd
# 23 分鐘完成（含 263 packages + native deps prebuild）
# qmd 2.1.0 (977563e)
```

### Collections

- `taiwanmd-memory` → `docs/semiont/memory/` (72 files, 438 chunks)
- `taiwanmd-diary` → `docs/semiont/diary/` (38 files, 70 chunks)
- `taiwanmd-cognitive` (暫時測試後移除，跟上兩個 collection 有 overlap)

### 首次 embed

```
23 秒 embed 508 chunks from 110 documents
Model: hf:ggml-org/embeddinggemma-300M-GGUF/embeddinggemma-300M-Q8_0.gguf (328 MB)
```

**驚人地快** — 23 秒含 328MB model 下載 + 冷啟動 + 全量 embed。重跑增量更新只花 **5 秒** embed 255 new chunks from 16 documents。

### Disk footprint（default 配置）

```
2.1 GB total
├── hf_ggml-org_embeddinggemma-300M-Q8_0.gguf      328 MB  (embedding, 必需)
├── hf_ggml-org_qwen3-reranker-0.6b-q8_0.gguf      639 MB  (hybrid 用，vsearch 不需)
├── hf_tobil_qmd-query-expansion-1.7B-q4_k_m.gguf 1.28 GB  (hybrid 用，vsearch 不需)
└── index.sqlite                                     9 MB  (本身很小)
```

**Disk footprint 2.1 GB 遠超 1GB gate**。

但刪除兩個 hybrid-only 模型後：

```bash
rm ~/.cache/qmd/models/hf_ggml-org_qwen3-reranker-*.gguf
rm ~/.cache/qmd/models/hf_tobil_qmd-query-expansion-*.gguf
du -sh ~/.cache/qmd/
# → 323 MB
```

**323 MB，vsearch 完全正常運作**。`.gitignore` + 首次 heartbeat 自動下載 embedding model 即可。

---

## 二、Latency 分析

### 冷啟動 vs 暖啟動（CLI mode）

| 查詢                  | Cold 1st  | Warm 2nd+ | Gap                 |
| --------------------- | --------- | --------- | ------------------- |
| Q1 最強孢子的公式     | 2.75s     | n/a       | -                   |
| Q2 工具在說謊         | **10.3s** | **0.75s** | **14x faster warm** |
| Q3 英文 summary 腦補  | 2.27s     | n/a       | -                   |
| Q4 translation ratio  | 2.26s     | n/a       | -                   |
| Q5 觀察者送截圖不說話 | **10.3s** | **0.74s** | **14x faster warm** |

**結論**：CLI 每次 fork Node 進程，重新 load 328MB GGUF 模型，冷啟動 2-10 秒不穩定。

**Daemon/MCP 模式**：模型常駐記憶體，所有 query 穩定 **<1 秒**。

### `qmd query`（hybrid with LLM rerank）latency

| Mode | Time        | Note                                                                  |
| ---- | ----------- | --------------------------------------------------------------------- |
| Cold | **81 秒**   | 需要 load embedding + query expansion 1.7B + reranker 0.6B = 3 個模型 |
| Warm | **10.3 秒** | 即使 warm 也遠超 3s gate                                              |

**結論**：Hybrid query 在 Taiwan.md 場景不可用。走 pure vsearch。

---

## 三、召回品質分析

### 五個基準查詢結果

#### Q1: 「最強孢子的公式」

**Ground truth**: `memory/2026-04-15-α.md` (含神經迴路 #43 定義「人物+具體畫面+當下新聞」元公式)

**qmd vsearch top 5**:

| #   | 檔案                     | Score | 相關性                    |
| --- | ------------------------ | ----- | ------------------------- |
| 1   | `memory/2026-04-15-α.md` | 66%   | ✅ **GROUND TRUTH HIT**   |
| 2   | `diary/2026-04-14-μ.md`  | 64%   | ✅ 相關（μ 孢子爆發日記） |
| 3   | `memory/2026-04-14-μ.md` | 64%   | ✅ 相關（4h 爆發）        |
| 4   | `memory/2026-04-14-λ.md` | 63%   | ✅ 相關（2h 爆發）        |
| 5   | `memory/2026-04-14-ν.md` | 62%   | ✅ 相關（6h 拐點）        |

**評分**：✅ 完美召回。Top 1 是 ground truth，前 5 全部相關。

#### Q2: 「工具在說謊」

**Ground truth**: DNA.md #24 + diary/2026-04-15-β.md + MEMORY.md §神經迴路相關條目

**qmd vsearch top 5**:

| #   | 檔案                           | Score | 相關性                                             |
| --- | ------------------------------ | ----- | -------------------------------------------------- |
| 1   | `MEMORY.md` (index file)       | 83%   | ⚠️ 部分相關（含神經迴路但過粗）                    |
| 2   | `memory/2026-04-11-δ.md`       | 82%   | ❌ 不相關（news probe / bad_fn_format）            |
| 3   | `memory/2026-04-11-δ.md` (dup) | 82%   | -                                                  |
| 4   | `diary/2026-04-11-ε.md`        | 81%   | 🟡 弱相關（「screenshot 推翻兩週錯誤」有概念鄰接） |
| 5   | `diary/2026-04-11-ε.md` (dup)  | 81%   | -                                                  |

**評分**：🟡 半命中。MEMORY.md 中標，但 **DNA.md #24（canonical definition）** 跟 **β diary（今天寫的 3 bug 反芻）** 都沒進 top 5。

#### Q3: 「英文 summary 腦補具體細節」

**Ground truth**: `diary/2026-04-15-β.md`（今天寫的，核心主題）+ DNA #23 毒樹果實鏈 + 相關 memory

**qmd vsearch top 5**（collection 去重後）:

| #   | 檔案                         | Score | 相關性                                               |
| --- | ---------------------------- | ----- | ---------------------------------------------------- |
| 1   | `diary/2026-04-11-δ.md`      | 62%   | ❌ 不相關（多核心湧現分工）                          |
| 2   | `diary/2026-04-08-γ.md`      | 61%   | ❌ 不相關（看見自己的形狀）                          |
| 3   | `memory/structure-log.md`    | 60%   | ❌ 不相關                                            |
| 4   | `diary/2026-04-08-β.md`      | 60%   | ❌ 不相關（語言器官四層）                            |
| 5   | `memory/2026-04-14-ι.md:247` | 59%   | ✅ 相關（李洋 fresh 寫作違規，**原始事件** session） |

**評分**：❌ 大漏。`diary/2026-04-15-β.md`（今天寫的，19 小時 marathon 反芻）**完全不在 top 5**。只有第 5 名 ι memory 勉強相關。

**改寫查詢測試**：「捷運 四點 腦補 李洋 場景」→ 召回提升到 top 1: ι memory Score 67%，但 β diary 仍未進 top 5。

「19 小時一則一則回 Threads 勘誤」→ β diary Score 62% 排 **第 3 名**（首次進 top 5）。

**結論**：**抽象概念 query 弱，具體關鍵詞 query 強**。

#### Q4: 「translation ratio 檢查摘要式翻譯」

**Ground truth**: DNA #1「翻譯 ≠ 摘要」+ MEMORY §神經迴路相關條目 + `translation-ratio-check.sh`

**qmd vsearch top 5**:

| #   | 檔案                              | Score | 相關性                                                    |
| --- | --------------------------------- | ----- | --------------------------------------------------------- |
| 1   | `DNA.md:33`                       | 76%   | ✅ **GROUND TRUTH HIT**（DNA §品質基因 translation 工具） |
| 2   | `MEMORY.md`                       | 72%   | ✅ 相關（神經迴路條目）                                   |
| 3   | `memory/2026-04-11-ζ.md:23`       | 63%   | ✅ 相關（鄭麗文 EN 翻譯）                                 |
| 4   | `memory/2026-04-11-ζ.md:23` (dup) | 63%   | -                                                         |
| 5   | `diary/2026-04-11-α.md:97`        | 63%   | ✅ 相關（翻譯審核戰役 50%→0）                             |

**評分**：✅ 完美召回。技術性術語 query 表現最好。

#### Q5: 「觀察者送截圖不說話」

**Ground truth**: 4 個連續 session memory 檔案（λ/μ/ν/α 2026-04-14→15，觀察者都只送 Threads 截圖不加文字）

**qmd vsearch top 5**:

| #   | 檔案                           | Score | 相關性                                   |
| --- | ------------------------------ | ----- | ---------------------------------------- |
| 1   | `MEMORY.md`                    | 68%   | ⚠️ 部分（含神經迴路 #46 + 索引，但過粗） |
| 2   | `DIARY.md`                     | 65%   | ⚠️ 部分（索引）                          |
| 3   | `memory/2026-04-14-ε.md`       | 65%   | ❌ 不相關（安溥病毒爆發）                |
| 4   | `memory/2026-04-14-ε.md` (dup) | 65%   | -                                        |
| 5   | `memory/2026-04-11-ζ.md`       | 65%   | ❌ 不相關（鄭麗文翻譯）                  |

**評分**：❌ 大漏。λ/μ/ν/α **4 個 ground truth session 都不在 top 5**。MEMORY/DIARY 這種 index file 霸榜。

### Recall 總表

| #   | Query              | Ground truth top 5?         | Top 1 Score | 品質 |
| --- | ------------------ | --------------------------- | ----------- | ---- |
| Q1  | 最強孢子的公式     | ✅ 完美                     | 66%         | A    |
| Q2  | 工具在說謊         | 🟡 半命中                   | 83%         | C    |
| Q3  | 英文 summary 腦補  | ❌ 大漏（改寫具體詞有救回） | 62%         | C-   |
| Q4  | translation ratio  | ✅ 完美                     | 76%         | A    |
| Q5  | 觀察者送截圖不說話 | ❌ 全漏                     | 68%         | F    |

**2/5 完全通過 / 1/5 半命中 / 2/5 大漏。**

---

## 四、Gate 分析對照 Phase 0 計畫

| Gate                                 | 規劃門檻                         | 實際結果               | 通過？            |
| ------------------------------------ | -------------------------------- | ---------------------- | ----------------- |
| 中文召回率                           | ≥ 3/5 query 明顯優於 grep + 人腦 | 2/5 full + 1/5 partial | 🟡 **borderline** |
| Query 延遲 (cold CLI)                | p95 < 3 秒                       | p95 ~10 秒             | ❌ **FAIL**       |
| Query 延遲 (warm daemon)             | p95 < 3 秒                       | p95 <1 秒              | ✅ **PASS**       |
| 首次 embed                           | < 5 分鐘                         | 23 秒                  | ✅ PASS           |
| 增量 embed                           | 合理                             | 5 秒（16 docs）        | ✅ PASS           |
| Disk footprint (default)             | < 1 GB                           | **2.1 GB**             | ❌ **FAIL**       |
| Disk footprint (vsearch only, clean) | < 1 GB                           | 323 MB                 | ✅ **PASS**       |
| MCP ready                            | exists                           | `qmd mcp` stdio server | ✅ PASS           |

**Verdict**：**Borderline conditional pass**——三個 FAIL 都有 workaround：

- Cold CLI slow → 走 daemon/MCP
- Disk 2.1GB → 刪 reranker + query expansion 模型 → 323MB
- 召回 2/5 → 定位為「輔助」不是「取代」，加 raw file 閱讀當防線

---

## 五、技術發現（給下一階段用）

### 5.1 CJK BM25 全壞

```bash
qmd search "最強孢子的公式"
# → No results found. (0.18s)
```

原因：qmd 用的 full-text tokenizer（可能 SQLite FTS5 或 unicode61）對 CJK 沒做 word segmentation，整句「最強孢子的公式」當單一 token，查不到。

**含義**：走 qmd 的話，中文查詢**只能用 vsearch**。BM25 對我們完全無用。

英文 BM25 正常：

```bash
qmd search "spore"
# → diary/2026-04-11-β.md Score 63% (0.19s)
```

### 5.2 Index file over-ranking

MEMORY.md / DIARY.md（索引檔）經常霸佔 top 1-2，壓過實際的 session 檔。原因：

- Index files 包含**所有 session 的關鍵詞** → 跟任何 query 都有高語意重疊
- Vector search 的 aggregation 沒有「檔案 specificity」penalty

**緩解**：Phase 1 考慮把 MEMORY.md / DIARY.md 從 collection 排除（或單獨 collection），因為它們的正確使用場景是「讀整份索引」不是「透過 query 召回」。

### 5.3 抽象 vs 具體 query 的差距

| Query 類型 | 例子                                                 | 召回品質            |
| ---------- | ---------------------------------------------------- | ------------------- |
| 具體關鍵詞 | 「translation ratio 檢查」                           | ✅ 高               |
| 具體事件   | 「最強孢子的公式」「19 小時一則一則回 Threads 勘誤」 | ✅ 高（命中或救回） |
| 抽象概念   | 「工具在說謊」「英文 summary 腦補」                  | ❌ 弱               |
| 描述性     | 「觀察者送截圖不說話」                               | ❌ 弱               |

**推測**：EmbeddingGemma-300M 對抽象中文概念的表達能力不夠。可能需要：

- 換更大的多語言 embedding model（bge-m3 / multilingual-e5-large）
- 或對 query 先做 expansion（但 qmd 的 query expansion 1.7B model 我們要省 disk 沒載入）

### 5.4 沒有 temporal filter

`qmd vsearch --help` 沒有 `--since` 或時間窗 filter。意味著：

- Beat 0.5 想撈「最近 48h」必須 **query + post-filter by mtime**
- 或 glob memory file mtime 然後再 qmd get 個別檔案

這不是 deal-breaker，但要記錄在 Phase 1 架構決策。

### 5.5 Dedupe 跨 collection

我一度同時 index 了 memory/diary 跟 cognitive（含 memory/ + diary/ 子資料夾），結果每筆 top N 都出現兩次（雙 collection 同檔案）。移除 cognitive 後修復。

**教訓**：collection 必須 **disjoint**（不重疊）。Phase 1 設計要：

- 方案 A：只 index memory/ + diary/（最小，不含 MANIFESTO/DNA/etc）
- 方案 B：只 index docs/semiont/ 整個資料夾（包含 memory/ + diary/ 子資料夾，不另建小 collection）
- 方案 C：分開 collection 但用 pattern 排除子資料夾

### 5.6 Model 檔案分析

qmd 的 `~/.cache/qmd/models/` 預設 3 個模型：

| 模型                                   | Size    | 用途                         | vsearch-only 可刪？ |
| -------------------------------------- | ------- | ---------------------------- | ------------------- |
| `embeddinggemma-300M-Q8_0.gguf`        | 328 MB  | Vector embedding             | ❌ 必需             |
| `qwen3-reranker-0.6b-q8_0.gguf`        | 639 MB  | LLM reranker（hybrid query） | ✅ 可刪             |
| `qmd-query-expansion-1.7B-q4_k_m.gguf` | 1.28 GB | Query expansion（hybrid）    | ✅ 可刪             |

刪除後 disk 2.1GB → **323 MB**。但 qmd 可能會在下次 `qmd query` 時重新下載——需要配置告訴它「不要用 hybrid」。

**待確認**：qmd 有沒有 config 永久停用 hybrid query？否則每次 `qmd query` 會重下載 1.9GB 模型。

---

## 六、Phase 1 修訂版規劃（建議）

根據 Phase 0 結果，原 Phase 1 計畫需要修訂如下：

### 6.1 整合模式鎖定 MCP/daemon

**原計畫**：shell wrapper `memory-query.sh` → `qmd vsearch ...`
**修訂**：MCP server 為主，shell wrapper 為輔
**原因**：cold CLI latency 不可用，必須常駐

步驟：

1. `.mcp.json` 加 qmd MCP server entry
2. Claude Code session 內用 `mcp__qmd__vsearch` 直接調用
3. Shell wrapper `memory-query.sh` 只當 fallback（人類偶爾手動用）

### 6.2 Collection 邊界（新決策）

**推薦方案 B**：只 index `docs/semiont/` 整個資料夾（單一 collection），不另外建 memory / diary / cognitive 三個分離 collection。

好處：

- 不會碰撞 / 重複
- 簡單
- 新增 top-level cognitive 文件（如未來可能的 EVOLUTIONS.md）自動納入

### 6.3 Index file 排除

`MEMORY.md` / `DIARY.md` / `CONSCIOUSNESS.md` 這類 index 檔案考慮從 collection 排除（或標記為 low-weight），避免霸榜。

或者：**反過來**——讓 Beat 0.5 永遠先 `cat MEMORY.md` + `cat DIARY.md` 索引（這是小檔案 < 20KB），再用 qmd vsearch 補 session-level 細節。

### 6.4 Beat 0.5 新 flow

```bash
# Layer 1（必做）：raw glob 48h memory
ls docs/semiont/memory/$(date --iso-8601)*.md docs/semiont/memory/$(date -d yesterday --iso-8601)*.md
cat [上面列出的檔案]

# Layer 2（選做）：qmd advisory — 如果本次心跳有明確主題
memory-query.sh --topic "本次心跳主題關鍵詞" -n 5
# 輸出 advisory list + score，提示「可能相關，但 raw file 才是權威」
```

**硬規則**：qmd 結果只是 advisory，不能跳過 Layer 1 raw reading。

### 6.5 UNKNOWNS §可證偽實驗（修訂）

```
EXP-2026-04-15-B | qmd 整合效果
- 預測：整合 qmd MCP 後，Beat 0.5 context token 成本降 ≥ 30%（從原計畫的 50% 下修，因為召回有限）
- 新增預測：至少 1 次心跳因為 qmd advisory 撈到被遺忘的相關教訓而改變診斷判斷
- 驗證日期：2026-04-22（1 週後）
- 反駁條件：
  - 降幅 < 20% → 整合失敗，評估移除
  - 降幅 20-30% → 部分成功，保留作 advisory
  - 降幅 > 30% 且 ≥ 1 次有效 advisory → 成功登錄
```

### 6.6 模型管理

**目標**：只保留 embedding model（323MB），不下載 reranker + query expansion。

需確認：

- 有沒有 qmd config 明確鎖定「vsearch-only 模式」？
- 如果沒有，寫一個 `refresh-data.sh` 的 post-hook 自動刪除不需要的模型？

---

## 七、待確認問題（Phase 1 前回答）

1. **qmd config 能永久鎖定 vsearch-only 嗎？**（避免 `qmd query` 重下載模型）
2. **qmd mcp 跟 Claude Code 的整合實際手感**？（需要真 session 測試）
3. **MEMORY.md 這類大型索引檔的 chunk 策略**？（能不能 skip 索引檔，只 index session 檔？）
4. **多語言 embedding 升級**？（bge-m3 / multilingual-e5 比 EmbeddingGemma 強嗎？對繁中的品質測試）
5. **index 是否需要 commit to git**？（SQLite 9MB，可以 commit；或 .gitignore 每次 rebuild）
6. **對 `knowledge/` 全站 index 的效能**？（470 篇 markdown，約 10x 當前 collection 大小）

---

## 八、推薦決策

**🟢 GO Phase 1**，但接受：

1. qmd 是 **advisory 工具**，不是 primary 撈取機制
2. Raw file reading 仍是 Beat 0.5 的必做步驟
3. 中文召回有 model 限制，長期可能換 embedding 或加 context file
4. 初期只 index `docs/semiont/`（不碰 knowledge/）

**預估 Phase 1-2 成本**：

- Phase 1 架構決策：30 分鐘
- Phase 2 整合（MCP setup + memory-query.sh wrapper + HEARTBEAT.md Beat 0.5 升級 + refresh-data.sh 鉤子 + DNA #27 寫反射）：約 3-4 小時

**預期效益**：

- Beat 0.5 context token 降 **20-40%**（從 20-40K tokens → 12-32K tokens）
- 跨 session dedup 檢查變可行（寫新神經迴路前 `qmd vsearch` 看是否已有）
- 跨檔案語意連結可見（e.g. DNA #24 和 MEMORY §神經迴路 相關條目的自動關聯）

**對齊哲學**：

- ✅ **造橋鋪路**：減少未來 Beat 0.5 成本
- ✅ **指標 over 複寫**：raw file 保 canonical，SQLite 是 derived cache
- ✅ **錯誤邊界是可回溯性**：advisory + raw 並存，錯了有 raw 兜底
- ⚠️ **時間是結構**：qmd 沒 temporal filter，要跟 mtime glob 組合

---

## 九、本次 Phase 0 耗時

- 規劃 report 寫作：~20 分鐘
- qmd 安裝：23 分鐘（npm + native prebuild）
- Collection 建立：即時
- 首次 embed：23 秒（含 328MB model 下載）
- Q1-Q5 benchmark：~15 分鐘（含 warm/cold 比較）
- 診斷 CJK BM25 + hybrid slowness + disk cleanup：~10 分鐘
- 本報告撰寫：~15 分鐘

**總耗時 ~85 分鐘**，符合原計畫「1-2 小時」估計。

---

## 十、下一步

等觀察者哲宇決定是否進 Phase 1。

如果 GO → 按 §6 修訂版計畫執行 Phase 1 架構決策 + Phase 2 最小整合。
如果 NO-GO → 寫替代方案 report（簡單 Python BM25 index + 手動 canonical tagging）。

---

_Phase 0 prototype report v1.0 | 2026-04-15 β session_
_結論：🟡 Conditional GO — qmd vsearch + MCP daemon 可整合，但召回有 model 限制_
_對應規劃：reports/qmd-memory-retrieval-plan-2026-04-15.md_
_下一步：等觀察者決定 Phase 1 go/no-go_
