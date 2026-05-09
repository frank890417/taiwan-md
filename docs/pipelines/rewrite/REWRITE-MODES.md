---
title: 'REWRITE-MODES'
description: '四模式判斷 canonical — Fresh / Evolution / Merge / Boundary variant 速判 + 路由表'
type: 'pipeline-sub-canonical'
status: 'canonical'
last_updated: 2026-05-09
last_session: 'brave-kirch-202256'
parent_canonical: '../REWRITE-PIPELINE.md'
sister_docs:
  - 'REWRITE-RESEARCH.md'
  - 'REWRITE-WRITE.md'
  - 'REWRITE-VERIFY.md'
  - 'REWRITE-MEDIA.md'
  - 'REWRITE-CRON.md'
upstream_canonical:
  - '../EVOLVE-PIPELINE.md'
---

# REWRITE-MODES — 四模式判斷 canonical

> 相關：[REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md)（主流程）| [EVOLVE-PIPELINE.md](../EVOLVE-PIPELINE.md)（Mode 1 文章進化觸發 REWRITE）
>
> **這份檔案是 REWRITE 4 模式判斷的 canonical**。觀察者 / agent 觸發 REWRITE 時先讀這份決定走哪個模式，再讀 [REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md) 跑 6 stage。

---

## 📋 模式速判表

| 場景                                             | 模式                 | 觸發訊號                          | 主要差別                                                                |
| ------------------------------------------------ | -------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| 文章不存在                                       | **Fresh**            | 默認                              | 直接 Stage 1                                                            |
| 文章已存在，需要品質提升                         | **Evolution**        | EVOLVE-PIPELINE 觸發 / 觀察者指派 | Stage 0 素材萃取 + 缺口列表                                             |
| observer issue 指出 N 篇主題重疊**可融合進一篇** | **Merge variant**    | issue 兩篇重疊                    | Step A 選 canonical + 萃 [MERGE-IN] + Step D 路徑改寫 5 lang redirect   |
| observer issue 指出 N 篇切片**理應分段不減篇數** | **Boundary variant** | issue N 篇切片                    | Step A 範圍切片表 + Step B 三類劃分（保留/吸納/移除）+ 跨 phase handoff |

**整併 vs 範圍重切判定**：

- ✅ 兩篇覆蓋同主題、視角可融合進一篇且讀起來更完整 → **Merge**
- ✅ N 篇切 N 個明確 scope（年代 / 議題 / 地理）每篇有獨立讀者價值 → **Boundary**
- ❌ 主題相關但角度不同（捷運 vs 高鐵）→ 兩篇都留，互相 cross-link
- ❌ Hub + 深度文 → 兩篇都留，Hub 連深度文
- ❌ 短文 + 長文同主題且短文有獨立價值 → 短文升級為深度文，不刪

---

## Fresh 模式（全新模式）

**適用**：文章不存在。

直接從 Stage 1 開始，按標準流程走（[REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md) Stage 1-6）。

> 💡 **實際上進化模式 = 全新模式 + 免費的 Stage 0 素材。** 寫作品質完全相同，只是省了部分研究時間。

---

## Evolution 模式（進化模式）

**適用**：文章已存在，需要品質提升。

**核心原則**：舊文是素材庫，不是骨架。全文重寫，不在舊文上修補。

> ⚠️ **為什麼不在舊文上「修改」？** AI 讀了品質不佳的舊文會不自覺模仿它的語氣、結構、甚至壞習慣（清單堆砌、塑膠句式）。把舊文當骨架 = 讓病毒感染新內容。正確做法：從舊文中**只提取事實**，然後用全新模式重寫。

### Stage 0: 素材萃取（進化模式專屬）

> 完整素材萃取方法論見 [`RESEARCH.md` §七](../../editorial/RESEARCH.md#七進化模式的素材萃取stage-0)

核心步驟：

1. **提取事實清單**：人名、年份、數字、引語、有效 URL
2. **標記問題類型**：`[LIST-DUMP]` / `[THIN]` / `[STALE]` / `[PLASTIC]` / `[FLAT-END]`
3. **列出缺口**：「舊文缺什麼？Stage 1 需要補什麼研究？」

**⚠️ 萃取完畢後，舊文不再被參考。只看事實清單進入 Stage 1。**

**然後進入 Stage 1（研究），研究範圍 = 舊文缺口 + 正常研究流程。**

---

## Merge variant（整併變體）

**定位**：進化模式的子變體。流程跟進化模式一模一樣，只多兩件事：(1) 開頭多一道「保留誰」的判定，(2) 結尾多一道路徑改寫（redirect + 翻譯鏡像清理 + cross-link）。其他所有 Stage（1→2→3→3.5→3.6→4→5）照常走。

**觸發**：observer issue 指出兩篇（或多篇）主題重疊（如 #609 黑白大廚 9→1、#626 台灣交通 2→1、#635 戰後到現代文學）。

### Step A：選 canonical（額外於 Stage 0 之前）

比較候選文章，挑一篇當保留方。判準（按優先序）：

1. **EVOLVE 狀態**：已 EVOLVE 過的場景式 > 未 EVOLVE 的條列式
2. **腳註密度與一手來源**：高 > 低
3. **`lastHumanReview: true` 優先**
4. **slug 持續性**：對外連結多的 slug 優先保留（少斷鏈）
5. **category 切合度**：主題真正屬於哪個 category（#626 交通歸 Lifestyle 比 Geography 自然）

### Step B：把要刪那篇的獨有素材帶進 canonical

走 Stage 0 素材萃取時，**兩篇都要萃**：

- canonical 的事實清單：照常
- 將被刪那篇的事實清單：標 `[MERGE-IN]`，列出「對方有但 canonical 沒有的視角/場景/數據」
- Stage 1 研究範圍 = canonical 缺口 + `[MERGE-IN]` 視角的補強查證

範例（#626）：Geography 篇獨有「中央山脈/桃機/高雄港」三個視角 → 標 `[MERGE-IN]` → Stage 1 補查雪山隧道 12.9km、桃機 4,400 萬客、高雄港全球排名第 18 → Stage 2 寫成 canonical 的兩段新章節。

### Step C：Stage 1→6 照常進化模式跑

不另立規則。EVOLVE canonical 篇就是 EVOLVE，Stage 3.5 FACT VERIFICATION（含 FACTCHECK-PIPELINE 完整 SOP）照常 hard gate。

### Step D：路徑改寫（額外於 Stage 5 之後）

整併獨有的收尾，**四件事缺一不可**：

1. **Astro redirect（5 lang 全寫）** — `astro.config.mjs` `redirects:` 區塊：

   ```javascript
   '/{old-category}/{zh-slug}': '/{new-category}/{zh-slug}/',
   '/en/{old-category}/{en-slug}': '/en/{new-category}/{new-en-slug}/',
   '/ja/{old-category}/{ja-slug}': '/ja/{new-category}/{new-ja-slug}/',
   '/ko/{old-category}/{ko-slug}': '/ko/{new-category}/{new-ko-slug}/',
   '/fr/{old-category}/{fr-slug}': '/fr/{new-category}/{new-fr-slug}/',
   ```

   **不可省任一語系**——舊 URL 在 SC / 外站可能任何語系都有 backlink。漏一個語系就漏一條 SEO 流量。

2. **刪除被併方原檔（5 lang + sync 鏡像）**：
   - `knowledge/{old-category}/{原檔}.md`（zh-TW）
   - `knowledge/{en,ja,ko,fr}/{old-category}/{translation-slug}.md`
   - 跑 `bash scripts/sync.sh`，`src/content/` 鏡像會跟著刪
   - 確認 `git status` 顯示 zh-TW + 4 lang knowledge + 對應 src/content 全部 deleted

3. **Cross-link audit**：
   - `grep -rn "被刪 slug" knowledge/ src/` — 找所有引用
   - 出現的 wikilink / markdown link 改指 canonical（或刪除）
   - Hub 頁面（`_*.md`）裡的舊條目改指 canonical

4. **Build verify**：
   - `npm run build` 必須過（會驗 redirect 語法）
   - 隨機開一個被刪的舊 URL 試 redirect 是否真的轉到 canonical
   - sitemap 應減少對應數量的 entry

### Step E：commit message + reply issue

- commit prefix 用 `🧬 [evolve+merge]`（不是純 `[evolve]`）
- commit body 列：保留誰、為何、EVOLVE 進去什麼、刪了哪幾個檔、設了哪幾條 redirect
- reply issue 必附 commit hash，並說明「未來類似問題會走整併變體 SOP」

---

## Boundary Redraw variant（範圍重切變體）

**定位**：進化模式的另一個子變體。**跟整併的差別在於篇數不減少**——多篇覆蓋同主題的不同切片（時序 / 地理 / 議題分支），現有切片重疊或不對齊，需要重新劃定每篇的範圍邊界，而非合併成一篇。

**觸發**：observer issue 指出 N 篇主題重疊但**理應分段**（如 Issue #635 4 篇文學文章合併為三段時序：戰後 / 解嚴後 / 21 世紀；或未來可能的「台灣音樂史」依時代 / 風格切多篇）。

### 跟整併變體的差別

| 面向         | 整併變體                       | 範圍重切變體                             |
| ------------ | ------------------------------ | ---------------------------------------- |
| 篇數         | 2+ → 1（減少）                 | N → N（保持，或 N → N-1 部分 dropped）   |
| Stage 0 動作 | 萃取兩篇事實 + 標 `[MERGE-IN]` | **每篇必須三類劃分：保留 / 吸納 / 移除** |
| 跨檔協調     | 不需要（吸完就刪）             | **必須**：移到別篇的內容跟接收篇要有共識 |
| Phase 數     | 1（一次 ship）                 | N（一篇一 phase，跨 session 接力）       |

### Step A：跨檔範圍規劃（額外於 Stage 0 之前）

對所有涉及篇章做一次 audit，產出「範圍切片表」：

```
| 篇 | 範圍切片 | 處理方式 |
|---|---|---|
| C 戰後台灣文學 | 1945-1987 | EVOLVE Phase 1 |
| B 解嚴後台灣文學 | 1987-2000 | EVOLVE Phase 2 |
| D 當代台灣文學 | 2000- | EVOLVE Phase 3 |
| A 全景索引 | 已被 B+C+D 覆蓋 | dropped Phase 4 |
```

切片邊界明確（年代 / 議題 / 地理），**每篇都有自己的純化 scope**，不重疊。

### Step B：每篇 Stage 0 必須三類劃分

EVOLVE 多篇時，Stage 0 萃取既有素材後，**強制**分成三類：

1. **保留** — 落在本篇純化 scope 內，繼續用
2. **吸納** — 別篇現有但寫得比本篇好的素材（標 `[ABSORB-FROM-X]`）
3. **移除** — 落在別篇 scope 內（標 `[MOVE-TO-Y]`），本篇刪掉、後續 phase 接收篇吸納

範例（Issue #635 Phase 1 戰後台灣文學）：

- 保留：失語 / 反共 / 現代主義 / 鄉土論戰主幹
- 吸納：A 文「葉石濤 1945」物件級開場 `[ABSORB-FROM-A]`
- 移除：1990s+ 段（施叔青台灣三部曲 / 蘇偉貞）`[MOVE-TO-D]`

**沒有三類劃分 = Phase 2 必碰撞**。本次 Phase 1 沒劃分，Phase 2 polish B 時會再次寫 1983 殺夫（C 已寫過），重疊重現。

### Step C：跨 session handoff 鐵律

Phase 1 ship 後留 INBOX entry 給 Phase 2-N 接力，entry 必須含：

- **本篇純化 scope**（年代 / 主題切片）
- **從上一 phase `[MOVE-TO]` 接收的素材清單**（具體段落 / 事實）
- **預期 cross-link 對象**（哪幾篇是 sibling）
- **接力者 5 分鐘自檢題**：讀完 entry 能否回答「我這篇要寫什麼、不寫什麼、邊界在哪裡」？答不出 = entry 不完整

### Step D：Stage 1→6 照常

每篇單獨走完整 EVOLVE 流程。Stage 5 cross-link 時要互相反向回補（C 寫完 → 加進 B/D 延伸閱讀；B 寫完 → 加進 C/D；以此類推），形成完整 sibling 網路。

### commit message + reply issue

- 多篇分多 commit / 多 phase（不要硬塞同 commit）
- 每個 phase commit prefix 仍用 `🧬 [semiont] rewrite:` + 描述含 `Phase N/M`
- Issue 留 open，每個 phase 完成 update comment，全部 phase ship 後才 close

**誕生事件**：2026-04-26 γ session 處理 Issue #635（idlccp1984 提案 4 篇文學文章合併三段時序），Phase 1 戰後台灣文學 ship 時意識到既有「整併變體」不對應 4-N→3 範圍重切的場景，Stage 0 三類劃分是被低估的核心紀律。

---

_canonical: REWRITE-MODES.md_
_萃取自 REWRITE-PIPELINE.md v2.20 §進化模式 vs §全新模式（line 30-212）_
_拆出原因：4 模式判斷無主索引，AI agent 跑 REWRITE 時對 mode 選擇無 hard guidance_
_Refactor: 2026-05-09 brave-kirch（per [reports/rewrite-pipeline-evolution-plan-2026-05-09.md](../../../reports/rewrite-pipeline-evolution-plan-2026-05-09.md) Direction A）_

🧬
