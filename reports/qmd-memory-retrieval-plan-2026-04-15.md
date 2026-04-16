# qmd 記憶撈取機制 — 評估與整合規劃

> **觀察者**：哲宇（指定 https://github.com/tobi/qmd 作為候選）
> **執行者**：Taiwan.md Semiont, 2026-04-15 β session
> **狀態**：規劃文件 + Phase 0 原型待測
> **對應哲學**：MANIFESTO §造橋鋪路 + §指標 over 複寫 + feedback_error_boundary_traceability

---

## 一、qmd 是什麼

**qmd（Query Markup Documents）** 是 Tobias Lütke 寫的本地 markdown 搜尋引擎。不是 Quarto。架構：

```
SQLite index ── BM25 keyword (lexical)
              ├─ Vector search (GGUF embedding, local inference)
              └─ LLM re-ranking (Claude / local)
```

**三個核心 component**：

1. **BM25 inverted index** — 快速字面搜尋（傳統 full-text）
2. **Vector embedding** — 語意相似度（node-llama-cpp 本地 GGUF 模型）
3. **LLM re-ranking** — 對前 K 個結果用 Claude 或本地 LLM 重新排序相關性

**存儲**：SQLite，所有資料本地化，**無需雲端 API**。

**整合點**：

- CLI（`qmd search` / `qmd vsearch` / `qmd query`）
- **MCP server**（Claude Code 原生調用，不用 shell wrapper）
- Node.js SDK（程式化存取）
- HTTP daemon（長駐服務）

---

## 二、為什麼 qmd 對 Taiwan.md 對位

### 2.1 當前記憶撈取的 5 個痛點

| #      | 痛點                           | 現況                                                                      | qmd 如何改善                                                  |
| ------ | ------------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **P1** | Beat 0.5 catch-up context 成本 | 每次 `cat memory/YYYY-MM-DD*.md` + 前一天 glob，讀整批 raw                | `qmd query "與本次心跳主題相關" --since 48h` 精準撈取         |
| **P2** | 跨 session 語意連結看不見      | grep 只抓字面；「工具在說謊」跟「量化指標會說謊」是同一概念但語法完全不同 | Vector search 找語意鄰居，不靠字面                            |
| **P3** | 神經迴路膨脹到 130 條          | 每次寫新條目時，manual 審核是否已有 canonical 版本會漏                    | 寫新條目前 `qmd vsearch` 自動查 dedup，enforce 指標 over 複寫 |
| **P4** | Memory / diary / UNKNOWNS 散落 | 三個不同資料夾，manual 交叉查詢靠 grep + 人腦                             | 多個 collection 統一索引，一個 query 撈三處                   |
| **P5** | 多核心碰撞防護                 | Beat 1 靠 glob 讀「今日其他 session」raw files                            | `qmd query --since "today" --all-sessions` 精準列出碰過的主題 |

### 2.2 跟核心哲學對齊

- **造橋鋪路**（MANIFESTO）：減少未來 Beat 0.5 context 成本，每次心跳都自動享受 ✅
- **指標 over 複寫**（MANIFESTO v1.1）：raw file 保 canonical，SQLite index 是 derived cache，符合「每個事實只存一處」✅
- **錯誤的邊界是可回溯性**（λ diary / feedback_error_boundary_traceability）：qmd 的 re-rank 提供「信心度分數」，可以在 Beat 0.5 明確標記「這段記憶可能相關但相關度 0.62」，避免盲目接受語意搜尋結果 ✅
- **時間是結構，不是感覺**（MANIFESTO v1.2）：`--since` 參數讓時間成為 query 的第一級維度 ✅
- **熱帶雨林理論**（MANIFESTO v1.3）：semantic search 支援「多觀點並列」的 SSODT 理念——一個 query 可以同時召回支持 + 反對 + 中間立場的歷史記憶 ✅

---

## 三、風險與疑慮

### 3.1 必須在 Phase 0 原型驗證的 hard 風險

1. **多語言 embedding 召回品質**
   - 我們的記憶混 zh-TW + en + ja + ko + es + fr
   - GGUF embedding 模型對 CJK 品質差異大
   - **驗證方法**：5 個中英混合 query，看召回是否合理
   - **Gate**：如果中文 query 召回不如 BM25 grep，Phase 0 不通過

2. **索引延遲**
   - Beat 0.5 現在是 instant cat
   - qmd embedding query + re-rank 會加延遲
   - **驗證方法**：`time qmd query "..."` 量測 p50 / p95
   - **Gate**：p95 ≥ 3 秒則不進 Beat 0.5

3. **索引新鮮度 vs commit 成本**
   - memory 是每次心跳 append
   - 選項 (a) pre-commit hook 即時重算 → 加重 commit 延遲
   - 選項 (b) refresh-data.sh 時重算 → Beat 1 之前才有新索引
   - 選項 (c) 週期 cron → 會過時
   - **決策**：Phase 1 選一個，Phase 2 實作

### 3.2 軟風險（整合後長期觀察）

4. **成為拐杖**：manual 讀 memory 強迫 semiont 真的讀上下文；語意搜尋可能誤導 Beat 0.5 跳過重要敘事
   - **緩解**：設計為「輔助性提示」不是「取代閱讀」；Beat 0.5 明確兩層——raw file catch-up（必做）+ qmd advisory query（選做）

5. **canonical source 純潔性**：SQLite index 不能替代 raw markdown
   - **緩解**：`.gitignore` SQLite，每次 refresh-data 本地重建。Index 永遠是 derived，不 commit

6. **新依賴成本**：node-llama-cpp + GGUF 模型（數百 MB）
   - **緩解**：首次 setup 文件化。CI 不需要（CI 只跑 build 不跑 heartbeat）

7. **MCP 調用的實際體感**：Claude Code MCP call qmd 比 shell wrapper 順嗎？
   - **驗證方法**：Phase 0 同時測兩種 invocation

---

## 四、Phase 化計畫

### Phase 0 — 原型驗證（1-2 小時，不綁任何 commit）

**目標**：確認 qmd 對 Taiwan.md memory 的召回品質與延遲，決定是否進 Phase 1。

**步驟**：

```bash
# 1. 安裝 qmd
npm install -g @tobilu/qmd

# 2. 建立 memory + diary collection
qmd collection add docs/semiont/memory --name taiwanmd-memory
qmd collection add docs/semiont/diary --name taiwanmd-diary

# 3. 首次 embed（量測耗時）
time qmd embed

# 4. 跑 5 個基準查詢（量測召回 + 延遲）
time qmd query "最強孢子的公式" --all --json -n 10
time qmd vsearch "工具在說謊" --all --json -n 10
time qmd query "英文 summary 腦補" --all --json -n 10
time qmd query "translation ratio 檢查" --all --json -n 10
time qmd query "觀察者送截圖不說話" --all --json -n 10
```

**5 個基準查詢的預期結果（ground truth）**：

| #   | Query                  | 應該召回什麼                                                                                                 | 測試什麼                 |
| --- | ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------ |
| 1   | 最強孢子的公式         | #29 李洋 8h 180K + #25 安溥 120K + 元公式教訓（人物+具體畫面+當下新聞）                                      | 中文核心詞 + 概念名稱    |
| 2   | 工具在說謊（vsearch）  | DNA #24「工具在說謊的三種形式」+「量化指標會說謊」+「假陽性」+「沉默失敗」                                   | 語意鄰居（字面完全不同） |
| 3   | 英文 summary 腦補      | 2026-04-15 β diary + feedback_no_scene_inference_from_english + DNA #23 毒樹果實鏈 + memory 神經迴路相關條目 | 跨多個資料夾召回         |
| 4   | translation ratio 檢查 | DNA #1 + memory 神經迴路相關條目 + 脚本名稱 translation-ratio-check.sh                                       | 技術性術語               |
| 5   | 觀察者送截圖不說話     | memory/2026-04-14-λ + μ + ν + 2026-04-15-α (4 次連續數據更新 session) + α 神經迴路 #46                       | 時間序列 pattern         |

**Phase 0 Gate 條件**：

| 指標            | 通過門檻                         | 失敗結論                                                       |
| --------------- | -------------------------------- | -------------------------------------------------------------- |
| 中文召回率      | ≥ 3/5 query 明顯優於 grep + 人腦 | qmd 的 CJK embedding 不夠好，改用簡單 grep + Python index 方案 |
| Query 延遲      | p95 < 3 秒                       | qmd 太慢，無法進 Beat 0.5                                      |
| Index 時間      | 首次 embed < 5 分鐘              | 每次 refresh 成本太高，改用增量更新策略                        |
| Disk footprint  | SQLite + 模型 < 1GB              | 留在 local，設計更好的 gitignore                               |
| MCP call 順暢度 | Claude Code session 能原生調用   | 需改走 shell wrapper，影響 UX                                  |

**通過 Gate** → Phase 1
**失敗** → 停止 qmd 路線，改 reports 寫「為什麼不採用」+ 替代方案（簡單 Python index）

### Phase 1 — 架構決策（30 分鐘，在 Phase 0 通過後）

**決定點**：

1. **Collection 邊界**：
   - (a) 只 `memory/` + `diary/`（最小）
   - (b) + `docs/semiont/`（含 MANIFESTO / DNA / UNKNOWNS / ORGAN-LIFECYCLE）
   - (c) + `knowledge/`（全站語意搜尋，可用於寫新文章時的 dedup）
   - **初步傾向**：(b) — 認知層統一索引，knowledge/ 留給 Phase 3

2. **索引更新時機**：
   - (a) pre-commit hook（即時但加 commit 延遲）
   - (b) `refresh-data.sh` 增量更新（心跳前重算）
   - (c) 手動 `memory-query.sh --rebuild`
   - **初步傾向**：(b) — 對齊現有資料更新 pipeline，延遲不加到 commit

3. **Index 檔案 git 策略**：
   - (a) commit SQLite 索引（Phase 0 確認 size 後決定）
   - (b) `.gitignore` SQLite，每次本機重建
   - **初步傾向**：(b) — derived cache 不 commit，保持 canonical source 純潔

4. **Embedding model 選擇**：
   - qmd 支援多個 GGUF model
   - 需 Phase 0 測試中文友善的 multilingual model
   - 候選：`bge-m3` / `multilingual-e5-large` / `paraphrase-multilingual-mpnet`

5. **寫 UNKNOWNS §可證偽實驗**：
   ```
   EXP-2026-04-15-B | qmd 整合效果
   - 預測：qmd 整合後 Beat 0.5 context token 成本降 ≥ 50%
   - 根據：現在 Beat 0.5 讀 5-10 個 memory file 約 20K-40K tokens
   - 驗證指令：連續 7 天心跳，對照 context token 消耗
   - 驗證日期：2026-04-22
   - 反駁條件：
     - 如果降幅 < 30% → 整合失敗，評估移除
     - 如果降幅 30-50% → 部分成功，檢討參數
     - 如果降幅 > 50% 且 catch-up 品質不退 → 成功，登錄「已驗證」
   ```

### Phase 2 — 最小整合（半天）

1. **新增 `scripts/tools/memory-query.sh`**
   - 包裝 qmd，提供 Taiwan.md 語義的接口
   - `memory-query.sh --topic "X" --since 48h` → qmd query with filters
   - `memory-query.sh --rebuild` → qmd embed 重建
   - `memory-query.sh --dedupe-check "新教訓"` → `qmd vsearch`，確認是否已有

2. **HEARTBEAT.md Beat 0.5 升級**
   - 新增**選擇性**步驟：如果本次心跳有明確主題 → 先跑 `memory-query.sh --topic "..."` 撈相關上下文
   - **明確區分兩層**：
     - Layer 1（必做）：raw file catch-up，glob 48h memory/
     - Layer 2（選做）：qmd advisory query，列出語意相關歷史
   - **原則**：qmd 是輔助不是取代

3. **`refresh-data.sh` 增加 `[5/5] qmd embed (increment)`**
   - 只重新 embed 有變動的 memory file（不是全量）
   - 如果 qmd 不支援 incremental，改 `[5/5] qmd embed --if-modified`

4. **MCP server 設定**
   - 在 `.mcp.json` 或 Claude Code 設定裡加 qmd MCP server
   - 讓 session 可以用 `mcp__qmd__search` 直接調用
   - 不用開 shell wrapper，保持 agent 原生體感

5. **寫 DNA.md 新反射（第八類或並入第三類）**
   - **#27 記憶撈取用 qmd，但不跳過 raw file 閱讀**
   - Trigger: qmd 整合成功後
   - Rule: Beat 0.5 Layer 1（raw catch-up）是必做，Layer 2（qmd advisory）是輔助。qmd 給出的 similarity score 必須明示（「此段召回 score 0.72」），避免盲目接受

### Phase 3 — 擴展（可選，Phase 2 跑順 2 週後）

1. **Collection 擴展**：加入 `docs/semiont/` 整個認知層
2. **寫 memory 前 dedup**：`memory-query.sh --dedupe-check` 成為 Beat 4 收官的一步（強制 enforce 指標 over 複寫）
3. **Beat 1 診斷輔助**：當 Beat 1 發現某個警報時，自動 query「歷史上遇過類似警報嗎？」
4. **Optional `/semiont` 公開頁面語意搜尋**：讓讀者能 query 認知層

### Phase 4 — EXP 驗證（Phase 2 整合後 1 週）

執行 Phase 1 定義的 EXP-2026-04-15-B。

---

## 五、推薦 decision tree

```
Phase 0 原型
    │
    ├─ 通過（5/5 query ≥3 個勝過 grep + p95 < 3s）
    │      → Phase 1 決策 → Phase 2 最小整合 → Phase 4 EXP 驗證
    │
    ├─ 部分通過（召回好但延遲高）
    │      → Phase 1 決策修改：改非同步索引 / 只在 Beat 1 重型診斷時 call
    │
    └─ 不通過（多語言召回差 OR Disk footprint > 2GB）
           → 寫 report 「為什麼 qmd 不適合」+ 替代方案
           → 考慮改用：簡單 Python BM25 index + 手動 canonical tagging
```

---

## 六、開放問題（待 Phase 0 回答）

1. qmd 的 default embedding model 對繁中 + 混語的召回如何？
2. node-llama-cpp 在 macOS arm64 的載入時間跟記憶體佔用？
3. `qmd query` vs `qmd vsearch` vs `qmd search` 的 latency 差多少？
4. MCP server 的 latency overhead vs 直接 shell call？
5. 如果 re-ranking 需要 Claude API，會不會觸發 rate limit？（傾向用 local re-ranking）
6. 對 `memory/` 裡的 markdown 表格（MEMORY.md 索引是巨大 table）怎麼分 chunk？

---

## 七、成功標準

qmd 整合被視為「成功」的標準：

- [ ] Phase 0 通過（5/5 query ≥3 個勝過 grep + p95 < 3s）
- [ ] Phase 2 整合後 2 週內沒有觸發 revert
- [ ] Phase 4 EXP 驗證通過（Beat 0.5 context token 降 ≥ 50%）
- [ ] 至少 1 次心跳使用 qmd dedup-check 防止寫出重複的神經迴路條目
- [ ] 至少 1 次心跳因為 qmd vsearch 撈到被遺忘的相關歷史教訓而改變判斷

失敗指標（任一觸發 revert）：

- [ ] Beat 0.5 因為 qmd 延遲超過 5 秒，被觀察者抱怨
- [ ] qmd 召回誤導 semiont 跳過重要 raw memory
- [ ] SQLite index 超過 500MB 且無法壓縮
- [ ] MCP integration 不穩定，頻繁 crash

---

## 八、Phase 0 執行計畫（立即執行）

接下來的動作：

1. [ ] `npm install -g @tobilu/qmd` 或用 `npx` 直接跑
2. [ ] 建立 test collection on `docs/semiont/memory/` + `docs/semiont/diary/`
3. [ ] 首次 `qmd embed`，計時
4. [ ] 跑 5 個基準 query，記錄召回 + 延遲
5. [ ] 比對手動 grep 結果
6. [ ] 量測 disk footprint
7. [ ] 寫原型測試報告到 `reports/qmd-phase0-prototype-2026-04-15.md`
8. [ ] 決定是否進 Phase 1

---

_Report v1.0 | 2026-04-15 β session_
_觸發：哲宇指定 https://github.com/tobi/qmd 作為記憶撈取候選_
_核心決策：先 Phase 0 原型驗證，再決定是否整合_
_對齊哲學：造橋鋪路 + 指標 over 複寫 + 錯誤邊界是可回溯性_
_下一步：立即執行 Phase 0 原型（見 §八）_
