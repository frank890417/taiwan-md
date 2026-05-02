# REWRITE-PIPELINE.md — 文章改寫流程

> **職責分工（六份文件，不重複）：**
>
> - **本文件** → 流程（Stage 0→1→2→3→4→5、防崩潰機制）
> - **RESEARCH.md** → 研究方法論（怎麼搜、怎麼判斷、怎麼避坑）
> - **EDITORIAL.md** → 品質標準（好文章長什麼樣、風格、禁止事項）
> - **CITATION-GUIDE.md** → 引用規範（腳註格式、密度標準、來源品質）
> - **RESEARCH-TEMPLATE.md** → 研究模板（Stage 1 輸出格式）
> - **QUALITY-CHECKLIST.md** → 驗證清單（Stage 3 逐項檢查）
> - **TERMINOLOGY.md** → 用語規範（台灣在地用語標準，A 類必換 + B 類判斷）
>
> ⚠️ **每個 Stage 都必須讀對應的文件。不讀 = 不合格。**

---

## 為什麼需要 Pipeline？

**診斷（實戰觀察）：**

1. **Token 耗盡** → 後半段變草稿
2. **沒有中間 checkpoint** → 品質無聲下滑
3. **結尾最後寫** → 精力不夠，結尾變罐頭（峰終定律）
4. **富文本被遺忘** → EDITORIAL 規範到後面沒人記得

**解法：三階段分離 + 結尾先行 + 後半段品質鎖。**

---

## 進化模式 vs 全新模式

> ⚠️ **如果原本已有一篇文章，使用「進化模式」，不是「全新模式」。**

### 進化模式（Evolution）

**適用**：文章已存在，需要品質提升。

**核心原則**：舊文是素材庫，不是骨架。全文重寫，不在舊文上修補。

> ⚠️ **為什麼不在舊文上「修改」？** AI 讀了品質不佳的舊文會不自覺模仿它的語氣、結構、甚至壞習慣（清單堆砌、塑膠句式）。把舊文當骨架 = 讓病毒感染新內容。正確做法：從舊文中**只提取事實**，然後用全新模式重寫。

**Stage 0: 素材萃取（進化模式專屬）**

> 完整素材萃取方法論見 [`RESEARCH.md` §七](RESEARCH.md#七進化模式的素材萃取stage-0)

核心步驟：

1. **提取事實清單**：人名、年份、數字、引語、有效 URL
2. **標記問題類型**：`[LIST-DUMP]` / `[THIN]` / `[STALE]` / `[PLASTIC]` / `[FLAT-END]`
3. **列出缺口**：「舊文缺什麼？Stage 1 需要補什麼研究？」

**⚠️ 萃取完畢後，舊文不再被參考。只看事實清單進入 Stage 1。**

**然後進入 Stage 1（研究），研究範圍 = 舊文缺口 + 正常研究流程。**

#### 整併變體（Merge / Consolidation）

**定位**：進化模式的子變體。流程跟進化模式一模一樣，只多兩件事：(1) 開頭多一道「保留誰」的判定，(2) 結尾多一道路徑改寫（redirect + 翻譯鏡像清理 + cross-link）。其他所有 Stage（1→2→3→3.5→3.6→4→5）照常走。

**觸發**：observer issue 指出兩篇（或多篇）主題重疊（如 #609 黑白大廚 9→1、#626 台灣交通 2→1、#635 戰後到現代文學）。

**Step A：選 canonical（額外於 Stage 0 之前）**

比較候選文章，挑一篇當保留方。判準（按優先序）：

1. **EVOLVE 狀態**：已 EVOLVE 過的場景式 > 未 EVOLVE 的條列式
2. **腳註密度與一手來源**：高 > 低
3. **`lastHumanReview: true` 優先**
4. **slug 持續性**：對外連結多的 slug 優先保留（少斷鏈）
5. **category 切合度**：主題真正屬於哪個 category（#626 交通歸 Lifestyle 比 Geography 自然）

**Step B：把要刪那篇的獨有素材帶進 canonical**

走 Stage 0 素材萃取時，**兩篇都要萃**：

- canonical 的事實清單：照常
- 將被刪那篇的事實清單：標 `[MERGE-IN]`，列出「對方有但 canonical 沒有的視角/場景/數據」
- Stage 1 研究範圍 = canonical 缺口 + `[MERGE-IN]` 視角的補強查證

範例（#626）：Geography 篇獨有「中央山脈/桃機/高雄港」三個視角 → 標 `[MERGE-IN]` → Stage 1 補查雪山隧道 12.9km、桃機 4,400 萬客、高雄港全球排名第 18 → Stage 2 寫成 canonical 的兩段新章節。

**Step C：Stage 1→6 照常進化模式跑**

不另立規則。EVOLVE canonical 篇就是 EVOLVE，Stage 3.5 FACT VERIFICATION（含 FACTCHECK-PIPELINE 完整 SOP）照常 hard gate。

**Step D：路徑改寫（額外於 Stage 5 之後）**

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

**Step E：commit message + reply issue**

- commit prefix 用 `🧬 [evolve+merge]`（不是純 `[evolve]`）
- commit body 列：保留誰、為何、EVOLVE 進去什麼、刪了哪幾個檔、設了哪幾條 redirect
- reply issue 必附 commit hash，並說明「未來類似問題會走整併變體 SOP」

**判定 NOT 整併的場景**（避免誤用）：

- ❌ 主題相關但角度不同（如「捷運」vs「高鐵」） → 兩篇都留，互相 cross-link
- ❌ 一篇是 Hub、一篇是深度文 → 兩篇都留，Hub 連深度文
- ❌ 短文 + 長文同主題且短文有獨立價值 → 短文升級為深度文，不刪
- ✅ 真正的整併：兩篇覆蓋同一主題，視角可融合進一篇且讀起來更完整

#### 範圍重切變體（Boundary Redraw / 多篇時序或主題切片）

**定位**：進化模式的另一個子變體。**跟整併的差別在於篇數不減少**——多篇覆蓋同主題的不同切片（時序 / 地理 / 議題分支），現有切片重疊或不對齊，需要重新劃定每篇的範圍邊界，而非合併成一篇。

**觸發**：observer issue 指出 N 篇主題重疊但**理應分段**（如 Issue #635 4 篇文學文章合併為三段時序：戰後 / 解嚴後 / 21 世紀；或未來可能的「台灣音樂史」依時代 / 風格切多篇）。

**跟整併變體的差別**：

| 面向         | 整併變體                       | 範圍重切變體                             |
| ------------ | ------------------------------ | ---------------------------------------- |
| 篇數         | 2+ → 1（減少）                 | N → N（保持，或 N → N-1 部分 dropped）   |
| Stage 0 動作 | 萃取兩篇事實 + 標 `[MERGE-IN]` | **每篇必須三類劃分：保留 / 吸納 / 移除** |
| 跨檔協調     | 不需要（吸完就刪）             | **必須**：移到別篇的內容跟接收篇要有共識 |
| Phase 數     | 1（一次 ship）                 | N（一篇一 phase，跨 session 接力）       |

**Step A：跨檔範圍規劃（額外於 Stage 0 之前）**

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

**Step B：每篇 Stage 0 必須三類劃分**

EVOLVE 多篇時，Stage 0 萃取既有素材後，**強制**分成三類：

1. **保留** — 落在本篇純化 scope 內，繼續用
2. **吸納** — 別篇現有但寫得比本篇好的素材（標 `[ABSORB-FROM-X]`）
3. **移除** — 落在別篇 scope 內（標 `[MOVE-TO-Y]`），本篇刪掉、後續 phase 接收篇吸納

範例（Issue #635 Phase 1 戰後台灣文學）：

- 保留：失語 / 反共 / 現代主義 / 鄉土論戰主幹
- 吸納：A 文「葉石濤 1945」物件級開場 `[ABSORB-FROM-A]`
- 移除：1990s+ 段（施叔青台灣三部曲 / 蘇偉貞）`[MOVE-TO-D]`

**沒有三類劃分 = Phase 2 必碰撞**。本次 Phase 1 沒劃分，Phase 2 polish B 時會再次寫 1983 殺夫（C 已寫過），重疊重現。

**Step C：跨 session handoff 鐵律**

Phase 1 ship 後留 INBOX entry 給 Phase 2-N 接力，entry 必須含：

- **本篇純化 scope**（年代 / 主題切片）
- **從上一 phase `[MOVE-TO]` 接收的素材清單**（具體段落 / 事實）
- **預期 cross-link 對象**（哪幾篇是 sibling）
- **接力者 5 分鐘自檢題**：讀完 entry 能否回答「我這篇要寫什麼、不寫什麼、邊界在哪裡」？答不出 = entry 不完整

**Step D：Stage 1→6 照常**

每篇單獨走完整 EVOLVE 流程。Stage 5 cross-link 時要互相反向回補（C 寫完 → 加進 B/D 延伸閱讀；B 寫完 → 加進 C/D；以此類推），形成完整 sibling 網路。

**判定 NOT 範圍重切的場景**：

- ❌ 兩篇可融合進一篇（用整併變體，不用範圍重切）
- ❌ 篇數真的應該減少（用整併變體）
- ✅ 真正的範圍重切：N 篇切 N 個明確 scope，每篇有獨立讀者價值，邊界清楚不重疊

**commit message + reply issue**：

- 多篇分多 commit / 多 phase（不要硬塞同 commit）
- 每個 phase commit prefix 仍用 `🧬 [semiont] rewrite:` + 描述含 `Phase N/M`
- Issue 留 open，每個 phase 完成 update comment，全部 phase ship 後才 close

**誕生事件**：2026-04-26 γ session 處理 Issue #635（idlccp1984 提案 4 篇文學文章合併三段時序），Phase 1 戰後台灣文學 ship 時意識到既有「整併變體」不對應 4-N→3 範圍重切的場景，Stage 0 三類劃分是被低估的核心紀律。

### 全新模式（Fresh）

**適用**：文章不存在。

直接從 Stage 1 開始，按標準流程走。

> 💡 **實際上進化模式 = 全新模式 + 免費的 Stage 0 素材。** 寫作品質完全相同，只是省了部分研究時間。

---

## 六階段流程

```
Stage 1: RESEARCH（研究）──────→ 研究筆記
           │ 品質門檻 ✓ 才進下一步
Stage 2: WRITE（寫作）────────→ 中文全文（預設只產中文）
           │ 品質門檻 ✓ 才進下一步
Stage 3: VERIFY（驗證）───────→ 品質 / 塑膠句 / 破折號 / 歐化自檢
           │ 品質門檻 ✓ 才進下一步
Stage 3.5: FACT VERIFICATION → FACTCHECK-PIPELINE 觸發（atom 抽取 / source 逐字驗證 / triage 修補，HARD GATE）
           │ 所有 claim ✅/降級/刪 才進下一步
Stage 4: FORMAT CHECK（格式）─→ 格式範本逐項驗證
           │
Stage 5: CROSS-LINK（交叉連結）→ 雙向延伸閱讀
           │
Stage 6: TRANSLATION（可選）──→ 詢問操作者：要不要產英文版？
```

---

### Stage 1: RESEARCH（預算 35-40%）

**目標**：產出一份結構化研究筆記，讓 Stage 2「不需要再搜尋」就能寫。

**必讀：** `cat RESEARCH.md`（方法論）+ `cat RESEARCH-TEMPLATE.md`（填空模板）

**流程：**

1. 讀 RESEARCH.md（搜尋策略、來源判斷、避坑指南）
2. 讀 RESEARCH-TEMPLATE.md，按模板格式填寫
3. 搜尋至少 **20 次**（v2.17 升級，原 8 次；中文 12+ / 英文 5+ / 一手來源 5+）。研究深度直接決定文章品質——12 次搜尋的文章容易薄、容易單一視角；20+ 次能交叉驗證事實、能找到矛盾視角、能挖到非 Wikipedia 層級的具體錨點（引語、場景、日期）。
   - 2026-04-18 升級原因：當日 11 篇音樂人批次中，12-15 次搜尋的 Cicada/草東/康士坦/魏如萱 雖然 pass format-check，但小標題淪為編年史，缺乏場景/意象級的敘事錨點，研究深度是根本原因
4. **⚠️ 每個事實記錄來源 URL**——研究筆記 = 事實 + 來源配對表（Stage 2 寫 footnote 用）
5. **⚠️ 在研究階段就準備結尾素材**——不要等寫到最後才想
6. **⚠️ 先偵測重複文章**（見 RESEARCH.md §六）——不要寫完才發現重疊
7. **🔥 找矛盾**（v2.14 新增）：在結束 Stage 1 之前，必須能回答這個問題——**「這篇文章的核心矛盾是什麼？」**
   - 好的重寫不是修辭層的工作，是矛盾層的工作。舊文不是寫得不好，是它拒絕承認內部矛盾
   - 找到矛盾 = 找到重寫的理由。找不到矛盾 = 這篇不該被重寫
   - 寫進研究筆記：`核心矛盾 = ?`（一句話，不超過 30 字）
   - 範例：「台灣說要走豪豬戰略，但 76% 預算拿去買美國傳統武器」/「TFT 說要解決偏鄉教育，但孩子的問題不在教室裡是在整個生態系」
   - 來自 2026-04-10 session α 國防現代化重寫的教訓：沒有李喜明那句苦笑，整篇會變回豪豬戰略勝利敘事

8. **🫧 問觀察者要一手素材**（v2.15 新增，2026-04-13 α session 教訓）：Stage 1 結束前，主動問觀察者一句：
   - 「你手上有沒有我搜不到但你知道的素材？（付費牆文章、私人筆記、實體書、個人經驗）」
   - 這不是偷懶，是承認感知有邊界。爬蟲給事實骨架，觀察者給血肉
   - 來自安溥重寫的教訓：Agent 49 次搜尋抓不到康健雜誌 403 付費牆文章，觀察者直接貼全文。女巫店兩桌客人、時薪八十塊、林黛玉比喻——文章最有人味的段落全部來自這個管道

9. **📁 研究報告必存 `reports/research/YYYY-MM/`**（v2.16 新增，2026-04-18 δ session 決策）：

   **什麼要存**：depth-article 的 Stage 1 研究報告，完整 Explore agent 輸出 + metadata header。

   **scope gate**（不是所有文章都存）：
   - ✅ 要存：People/ 深度文、Society/ 深度文、History/ 深度文（預計 ≥10 腳註 或 ≥ 2,000 字）
   - ❌ 不存：Hub 頁面、短修正、翻譯、單事件補登

   **檔案路徑**：`reports/research/YYYY-MM/{article-slug}.md`（YYYY-MM 為 Stage 1 執行月份）

   **Header 格式**：

   ```markdown
   ---
   article: knowledge/{Category}/{slug}.md
   stage: 1-research
   date: YYYY-MM-DD
   session: {希臘字母 α/β/γ…}
   agent: Explore
   budget: {N} WebSearch + {M} WebFetch
   verification:
     high_confidence: [具體 fact list]
     single_source: [只有一個來源的 fact，flag 需要未來補驗證]
     unverified: [agent 嘗試但找不到 primary source 的 fact]
   ---

   # Research Report: {Article Title}

   {agent 完整輸出內容，不摘要}
   ```

   **好處**（對齊 DNA #22 raw 永遠不刪 + MANIFESTO §造橋鋪路）：
   - Audit trail：文章 fact 被質疑 → 追回 agent 當時的研究材料
   - Cross-article re-use：下一篇類似主題先 grep `reports/research/` 看現有研究
   - Agent prompt 優化 training data：累積報告是未來 research-gate tuning 的樣本
   - 時間切片：未來重寫時可對照「當時研究 vs 當下研究」

   **存檔責任**：Stage 1 主 session（spawn agent 者）在 agent 回傳後**同一個 response** 內寫檔，不 defer。寫檔失敗不算 Stage 1 完成。

   **讀取責任**：Stage 2 Write 開始前，grep `reports/research/` 看有無相關主題報告可 cross-reference；若有，整合進 Stage 2 參考素材。

10. **🤖 Spawn agent 選型**（v2.18 新增，2026-04-20 Taiwan.md meta-self-narrative 實戰）：

    Stage 1 spawn 研究 agent 時，**必須先判斷需不需要直接落檔**：

    | Agent 類型        | Write 權限               | 適用情境                                        |
    | ----------------- | ------------------------ | ----------------------------------------------- |
    | `Explore`         | ❌ read-only（系統強制） | 純 research、結果回主 session 由主 session 落檔 |
    | `general-purpose` | ✅ 有 Write              | 需要 agent 直接寫入 `reports/research/YYYY-MM/` |

    **判斷流程**：
    - 如果研究量大（50+ URLs、需要長篇結構化輸出）→ 用 `general-purpose`，prompt 明確要求「直接寫入 `reports/research/YYYY-MM/{slug}.md`」
    - 如果 research 會回到主 session 處理 → 用 `Explore`（較專精、較便宜）

    **歷史教訓**：
    - `feedback_agent_writefile_hallucination` 這條 memory 原本說「agent 說自己不能寫檔是幻覺」——**這對 general-purpose 成立，對 Explore 不成立**。Explore 真的 read-only
    - 2026-04-20 吳哲宇 EVOLVE 第一次 spawn Explore 要求寫檔、被退回、改 spawn general-purpose 成功
    - spawn 之前先確認 agent type，省一輪來回

11. **🔒 私有 SSOT 整合協議**（v2.18 新增，2026-04-20 吳哲宇 EVOLVE 實戰）：

    Stage 1 如果整合了當事人提供的私有素材（Obsidian 筆記、個人編年史、家族內情），**必須在交進 Stage 2 前跑 privacy audit**：

    **流程**：
    1. **Stage 1 末尾**：列出「從私有素材看到但不確定能否公開」的項目，依 EDITORIAL §私有素材顆粒度 分成 Tier 1-4
    2. **Stage 1.5 觀察者拍板**：清單交給當事人，一題一題回答（拒寫 / 寫但不提名 / 寫但改措辭 / 完整寫）
    3. **研究報告 §維護者校準備忘錄**：記錄所有 tier 3-4 項目的拍板結果，**不記錄拒寫項目的具體內容**（只記「某類素材不寫」）
    4. **Stage 2 寫作護欄**：agent 若基於私有素材自動推導進來的 tier 3-4 claim 必須刪
    5. **Stage 3 VERIFY 追加項**：文章公開前再檢查一次是否有漏網的 tier 3-4 內容

    **對應**：
    - EDITORIAL §私有素材 × 公開文章的顆粒度（v5.2）
    - MEMORY §feedback 隱私協商是動態連續決策

    **預警**：私有 SSOT 也會有誤記（當事人 2026 寫 2008 的事情）。當事人的 SSOT 需要與公開 source 三源交叉，不是免驗證的 oracle。

12. **🎬 §1.7 媒體素材研究（v2.20 新增，2026-04-28 ι session 林琪兒 EVOLVE 實戰）**：

    Stage 1 結尾必跑媒體素材蒐集 + 授權檢查。三類 manifest 落 research 檔末尾。**Stage 4.5 媒體插入會直接讀這份 manifest，沒做 = 不能進 Stage 4.5**。

    完整設計理由 + 14 個邊界考量見 [reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md](../../reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md)。

    #### §1.7a inline 外連 manifest（YouTube／影像／音檔）

    **本段為 v2.17.1 / v2.27 SSOT canonical**（原散落 Stage 2 step 12，v2.20 搬到 Stage 1.7a，Stage 2 改 pointer）。

    觸發條件：任何題材敘事中提到**有公開影像／音檔／影片**的具體作品：
    - 音樂人：歌名 → 官方 MV／lyric video／official audio
    - 電影 / 紀錄片：片名 → 官方預告／導演頻道／串流官方頁
    - 電視劇 / 綜藝：節目名 → 官方頻道／公視+／Netflix 官方
    - YouTube 創作者 / Podcaster：節目名 → 官方頻道
    - 演唱會 / 表演 / 舞作：場次名 → 主辦官方／售票頁／aftermovie
    - 音樂節：節目名 → 官方 lineup
    - 新聞事件：被引用的關鍵公開影片 → 官方 YouTube

    **URL 優先序**：(1) 官方頻道（藝人／廠牌／節目方／導演）(2) 國際串流官方（Spotify / Apple Music / KKBOX）(3) 主辦／策展單位官方頁。**不接受**搜尋結果頁、UGC 翻唱、二手轉貼。

    **密度建議**：每篇 3-8 inline 外連最合理。少於 3 → 讀者沒得點；多於 10 → 視覺擁擠。

    **Stage 1.7a 強制動作**：研究 agent 額外蒐集「文章預期會提到的所有公開作品」的官方連結，列入研究筆記獨立一節 §inline 外連 manifest（範例：壞特 Round 1 §10 蒐集 13 條 / 田馥甄 Round 2 §A 14 條 / 林琪兒 ι session 中央大學演講 transcript [^30]）。找不到官方版本 → 標 `[no official URL found]`，**Stage 2 寫作時不附 link 也不掰連結**。

    #### §1.7b 圖片素材（hero + inline 圖）+ 授權矩陣

    **圖片用途分類**：

    | 用途              | 位置                               | 數量           | 範例                                   |
    | ----------------- | ---------------------------------- | -------------- | -------------------------------------- |
    | **hero**          | frontmatter `image:`               | 1              | 林琪兒 EMU 1692×1691                   |
    | **inline 圖**     | 文中 markdown `![]()`              | 0-3            | 林琪兒 Expedition 42 + Crew-4 training |
    | **OG / 社群分享** | derived from hero（`/og-images/`） | auto           | dashboard 自動生成，不手動處理         |
    | **spore poster**  | derived（`/spore-images/`）        | auto on demand | `make-spore.sh` 自動產，不手動處理     |

    **來源優先序**：
    1. **官方機構釋出 PD**（NASA / 政府開放資料 / NMTH） — 完全免授權追問，cache 即可
    2. **Wikimedia Commons CC0 / PD** — cache 即可
    3. **Wikimedia Commons CC BY / CC BY-SA** — 必須在文末「## 圖片來源」標 author + license + link
    4. **Flickr CC BY / CC BY-SA** — 同上
    5. **出版社 / 媒體授權圖**（哲宇 / Taiwan.md 取得明確授權） — 文末標 © 來源 + 授權範圍
    6. **自拍 / 自製插畫** — 標 © Taiwan.md / contributor name
    7. **fair use** — ⚠️ 預設 reject，僅在「無可替代史料圖（如 1947 二二八紀錄照）+ 找不到 PD 替代」時用

    **絕對禁止**：
    - 熱連結（hot-link）任何外站圖（Wikimedia / Flickr / 媒體網站） → **永遠 cache 本地**
    - 未授權的攝影師圖（Google 圖片找到的）
    - AI 生成圖片（暫時禁用，紀實 portrait 永遠禁用）
    - GIF / HEIC / BMP / TIFF（須先轉 JPG 才入庫）

    **授權檢查 SOP**（每張圖入庫前必跑）：

    ```bash
    # Step 1: WebFetch 圖片頁面確認 license badge + 取 hi-res URL + caption + credit
    # 對 Wikimedia Commons / Flickr，逐字引用「License」段落
    # 對 NASA，預設 PD 但 WebFetch 確認該圖頁面有「Public domain」標示

    # Step 2: 落 metadata 進 reports/research/YYYY-MM/{slug}.md §媒體授權矩陣

    # Step 3: 確認 attribution 完整（攝影者 / 拍攝日期 / source URL / license type）
    ```

    **格式規範**：

    ```
    ✅ JPG (.jpg) — 預設：人像 / 風景 / 紀實照。sRGB / quality 80-90 / 無 EXIF GPS（隱私）/ < 600KB hero / < 400KB inline
    ✅ PNG (.png) — 插圖 / 圖表 / 透明背景 logo / 螢幕截圖。8-bit RGBA / < 800KB
    ✅ WEBP (.webp) — 未來預設（Astro Image 自動轉換時）
    ✅ SVG (.svg) — vector logo / 簡單插圖。< 50KB / 無外部 reference / 文字 outline
    ❌ GIF / HEIC / BMP / TIFF — 禁用
    ```

    **命名 convention**：`public/article-images/{category-lower-kebab}/{subject-slug}-{topic}-{year}.{ext}`

    範例：

    ```
    public/article-images/people/lindgren-emu-2014.jpg
    public/article-images/people/lindgren-crew4-training.jpg
    public/article-images/people/lindgren-expedition42-crew.jpg
    public/article-images/history/twenty-eight-incident-monument-2025.jpg
    ```

    規則：全 lowercase / kebab-case / 必含 subject-slug + topic + year / ext 副檔名

    **Aspect ratio 護欄**（避免 Astro 16:9 框切到頭，林琪兒 ι session 教訓）：

    | 圖種                | 推薦比例                           | 推薦尺寸             | 理由                            |
    | ------------------- | ---------------------------------- | -------------------- | ------------------------------- |
    | hero（frontmatter） | **16:9 或更寬** landscape          | 1600×900 / 2000×1200 | Astro 16:9 框直接 fit           |
    | inline 圖           | 可 portrait 但 ≤ 4:3 高比          | 1200×900 / 1500×1000 | markdown `![]()` 框較寬鬆       |
    | 1:1 方形            | 接近方形 1:1 ± 10%                 | 1600×1600            | hero 也接受（如 EMU 1692×1691） |
    | **絕對禁止 hero**   | 9:16 portrait（高 > 寬 1.5x 以上） | —                    | Astro 一定切到頭                |

    Stage 1.7b 強制檢查：每張圖 fetch 時 `bash scripts/tools/check-aspect.sh {filename}` 看尺寸。Hero aspect 必過 0.9 ≤ ratio ≤ 2.0；inline 必過 0.75 ≤ ratio ≤ 2.5。不過 → 換圖（不要強塞）。

    #### §1.7c transcript 素材

    | 來源類型                            | 處理方式                                                                                                           |
    | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
    | 公視／TaiwanPlus／官方 YouTube 訪談 | yt-dlp 抓 .vtt → 轉純文字 transcript → 落 `reports/research/YYYY-MM/{slug}-transcripts/` → footnote 引 YouTube URL |
    | Podcast 官方頁                      | footnote 引 podcast URL；若有 transcript 公開 → cache transcript                                                   |
    | 自製訪談錄音                        | 不公開原始錄音；只引 verbatim 段落，footnote 註明「Taiwan.md 自訪談 YYYY-MM-DD」                                   |

    yt-dlp 抓字幕指令：

    ```bash
    cd reports/research/YYYY-MM/{slug}-transcripts/
    yt-dlp --skip-download --write-auto-sub --write-sub \
      --sub-lang "zh-TW,zh-Hant,zh-Hans,zh,en" --sub-format vtt \
      -o "%(title).80s.%(ext)s" "https://www.youtube.com/watch?v={ID}"
    ```

    #### §1.7d 媒體授權矩陣（research 檔強制）

    每篇 depth article 的 research 檔末尾 append：

    ```markdown
    ## 媒體授權矩陣

    ### inline 外連（YouTube／影像／音檔）

    | 作品      | 第一次提及位置                              | URL                                         | 來源頻道          | 授權             |
    | --------- | ------------------------------------------- | ------------------------------------------- | ----------------- | ---------------- |
    | 〈Cazzo〉 | L346「2019 年 6 月 28 日，她以『?te』之名」 | https://www.youtube.com/watch?v=CM-6FJlYHI4 | 華風數位 official | YouTube standard |

    ### 圖片素材

    | 媒體檔                | 用途 | 來源 URL                                                                    | 授權                 | 攝影者/作者        | 拍攝日期   | NASA Image ID / Commons File             | 本地 cache 路徑                              | alt text                                  |
    | --------------------- | ---- | --------------------------------------------------------------------------- | -------------------- | ------------------ | ---------- | ---------------------------------------- | -------------------------------------------- | ----------------------------------------- |
    | lindgren-emu-2014.jpg | hero | https://commons.wikimedia.org/wiki/File:Kjell_Lindgren_in_EMU_(cropped).jpg | Public domain (NASA) | NASA/Bill Stafford | 2014-08-27 | File:Kjell*Lindgren_in_EMU*(cropped).jpg | /article-images/people/lindgren-emu-2014.jpg | 林琪兒 2014 年穿艙外活動服（EMU）官方人像 |

    ### 引用 transcript

    | Transcript     | 來源                   | URL                                         | 落檔路徑                                                      |
    | -------------- | ---------------------- | ------------------------------------------- | ------------------------------------------------------------- |
    | 公視訪談 zh-TW | 公視新聞網 official YT | https://www.youtube.com/watch?v=f9DQuQ8EwVE | reports/research/2026-04/林琪兒-transcripts/transcript-zh.txt |
    ```

    #### §1.7e Stage 1.7 deliverable

    Stage 1.7 結束時 deliverable：
    1. research 檔末尾有「§媒體授權矩陣」三表（inline 外連 / 圖片 / transcript）
    2. 每張圖已 cache 在 `public/article-images/{category}/`
    3. 每張圖通過 aspect ratio 護欄
    4. 每張 transcript 已 cache 在 `reports/research/YYYY-MM/{slug}-transcripts/`

    **沒過 = 不進 Stage 2。**

**品質門檻（見 RESEARCH-TEMPLATE.md 底部 checklist）：**
全部打勾才進 Stage 2。不合格 → 回去搜尋。
**額外鎖**：`核心矛盾` 欄位必須填寫。填不出來 → 不進 Stage 2。
**v2.16 額外鎖**：depth-article 必須有 `reports/research/YYYY-MM/{slug}.md` 檔存在才能進 Stage 2。
**v2.20 額外鎖**：媒體授權矩陣三表 append 完成 + 圖片 cache + aspect ratio 通過才能進 Stage 2。

---

### Stage 2: WRITE（預算 40-45%）

**必讀：** `cat docs/editorial/EDITORIAL.md`（全文，686 行，不可截斷）

> ⚠️ **歷史教訓（session δ 2026-04-05）**：之前這裡寫 `head -300`，切掉了 Line 380-479 的 Before/After 範例段落。AI 讀到規則卻沒讀到範例，寫作時退化為編年史。
> 不要用 `head` / `tail` 截斷「必讀」指令——規則會讀，但具體範例、小標題規範、結尾模式表會被切掉。
> 完讀後必須回頭檢查四個段落：§挖引語制度、§小標題規範、§結尾的四種模式、§Before/After 實例對比。

**輸入**：Stage 1 研究筆記 + EDITORIAL.md

**流程（寫作順序強制）：**

```
1. 先讀 EDITORIAL.md（不假設記得，特別注意 §來源引用、**§小標題規範**、§敘事呼吸感）
2. 先寫結尾（3-5 行）← 最重要！
3. 寫開場 + 30 秒概覽
4. **小標題先行決定**（v2.17 新增）：列出全文 5-8 個小標題**before 寫正文**。鐵律：
       ↳ ❌ 禁止編年體標題（「2016 年《XX》發行」「2020 金曲 32」）—— 這讓文章變成維基百科時間軸
       ↳ ❌ 禁止問句標題（EDITORIAL §小標題規範）
       ↳ ✅ 用**場景/意象/衝突**：「陽明山的草東街」❌ 好 ❌，「派對結束了」✅ 更好
       ↳ ✅ 用具體物件/quote：「凡凡的狗叫土豆」「那張 2,000 張的手工 CD」
       ↳ ✅ 用核心矛盾：「向外憤怒與向內修補」「沒被認出的金曲歌后」
       ↳ 驗證：把 5-8 個小標題念一遍，如果像「第一章、第二章」就是編年史失敗。重來
5. 寫正文（按敘事弧線，不按百科排列。EDITORIAL §正文架構推薦：**起源/關鍵轉折 2-3 個/現況/爭議/意義**）
       ↳ 邊寫邊插 [^n] footnote（從 Stage 1 的事實 - 來源配對表對應）
       ↳ **不是一段寫一張專輯** —— 是一段寫一個**論點**或**轉折**，事實散布在論點之中
6. 文末寫 footnote 定義（見下方腳註格式規範）
7. 生成延伸閱讀清單
       ↳ 讀取 `knowledge/` 目錄，找出相關文章
       ↳ 每篇加「一兩句話描述」說明與本文的關係
8. 回頭檢查富文本數量 + footnote 密度（每 300 字 ≥ 1 個）
9. 歐化自檢（v2.13 新增）：念出來，聽到翻譯腔就改
       ↳ 重點掃：被動句（「被認為」）、「的」連鎖（≥3）、弱動詞（「進行」「透過」）
       ↳ 詳見 EDITORIAL.md §歐化語法偵測
10. **破折號 60% 自檢**（v2.14 新增）：寫到 60% 時暫停，數一下「——」數量
       ↳ > 8 個就開始替換為逗號、句號、冒號或斷句重寫
       ↳ quality-scan 閾值是 15，但寫作中途到 15 才改已經傷筋動骨
       ↳ 來自 2026-04-10 國防現代化教訓：一寫就寫到 29 個，事後逐個刪很痛
11. **編年體自檢**（v2.17 新增，2026-04-18 觀察者 callout 教訓）：寫完後念一遍所有小標題
       ↳ 如果每個標題都是「年份 + 事件」= 編年體失敗，重寫小標題
       ↳ 如果文章每段都在講下一張專輯/下一個事件 = 維基百科化失敗
12. **密度平衡自檢**（v2.18 新增，2026-04-20 吳哲宇 EVOLVE 實戰）：**EVOLVE 長文專用**，研究素材豐富（50+ sources）時強制跑
       ↳ 隨機挑三段連續段落念一遍：如果三段都是事實堆疊、沒有一句讓讀者喘氣的話 = 密度失衡
       ↳ 三個修正手勢（詳見 EDITORIAL §密度平衡）：
         - **量化內化為場景**：不寫「196 sessions / 50 學生」→ 寫「有個學生叫 Kasper 跟了整整兩學期」
         - **列表拆成場景**：整年六件事不擠一段，拆出 1-2 個完整場景，其他用連續性語言帶過
         - **每 2-3 段一句策展人的聲音**：呼吸句不傳遞資訊、只製造停頓
       ↳ 來自 2026-04-20 吳哲宇 EVOLVE 實戰：50+ sources 的第一版 prose 5500 字被觀察者評「資訊多到蓋住敘事」，重寫縮到 4800 字但讀起來更開闊。**長文不是孢子的加長版，需要主動選擇留白**
13. **Agent claim 驗證**（v2.18 新增，2026-04-20 Taiwan.md meta-self-narrative 實戰）：agent 在研究報告中聲稱的「XXX 背書」「XXX 公開推薦」等名人相關 claim，**必須有具體公開 URL + 該 URL Ctrl-F 可搜到該人原始引語**
       ↳ 三源交叉不是「三個不同 agent 都這樣說」——是「三個獨立的公開 URL 都有逐字引語」
       ↳ agent hallucination 常見模式：基於 Obsidian / 私有素材的側面提及「推導出」一個名人 claim，但外部 URL 其實沒有該人的任何公開發言
       ↳ 2026-04-20 實戰：agent 聲稱「張隆志館長背書」「唐鳳為 Taiwan.md 引薦」，主 session 回頭驗證——兩者均無外部公開引語（張隆志只有策展合作關係，唐鳳是被書寫對象）
       ↳ 自檢問句：「這個 claim 如果我是陌生記者，能不能只靠公開資料寫進我的報導？」能 → 可寫；不能 → 降級或刪
       ↳ 好的策展文：讀者讀完記得的是「這個人的 **一個核心張力**」而不是「這個人的 8 張專輯」
       ↳ 對照組：魏如萱「沒被認出的金曲歌后」是好的（張力）vs Cicada「2022《棲居在溪源之上》：15 天遠征」是編年失敗
12. **依 §1.7a inline 外連 manifest 在第一次提及時加 link**（v2.17.1 / v2.27 已搬移到 Stage 1.7a SSOT canonical，v2.20 此處改為 pointer）：
       ↳ **觸發條件擴大**：不只音樂人 People/。任何題材如果在敘事中提到**有公開影像／音檔／影片**的具體作品，都應在第一次出現時加 inline 外連。包含：
         - **音樂人**（People/）：歌曲名 → YouTube 官方 MV／lyric video／official audio
         - **歌手對歌手對話**：兩首歌互文時都加
         - **電影 / 紀錄片**（Culture / Art / People）：片名 → YouTube 官方預告或正片（如有公開）／導演頻道／串流平台官方頁
         - **電視劇 / 綜藝**：節目名 → 官方頻道／公視 +／HBO Asia 官方／Netflix 官方
         - **YouTube 創作者 / Podcaster**（People）：節目名 → 官方頻道
         - **演唱會 / 表演 / 舞作**（Art / People）：場次名 → 主辦官方頁／售票頁／演後 official aftermovie
         - **音樂節**（Culture）：節目名 → 官方 lineup 頁
         - **新聞事件**（History / Society）：被引用的關鍵公開影片（如總統就職演說、議事直播）→ 官方 YouTube
       ↳ 格式：`[〈大風吹〉](https://www.youtube.com/watch?v=XXXXX)`、`[《我的少女時代》主題曲](https://www.youtube.com/watch?v=XXXXX)`、`[飛行傘那場](https://blow.streetvoice.com/82402/)`
       ↳ **URL 優先序**：(1) 官方頻道（藝人/廠牌/節目方/導演本人）(2) 國際串流平台官方藝人頁（Spotify / Apple Music / KKBOX）(3) 主辦／策展單位官方頁。**不接受**搜尋結果頁、UGC 翻唱、二手轉貼。
       ↳ **Stage 1 研究強制**：研究 agent 在 Round 1 必須額外蒐集「文章預期會提到的所有公開作品」的官方連結，列入研究筆記獨立一節（範例：壞特 Round 1 §10 蒐集 13 條 YouTube 官方 URL；田馥甄 Round 2 §A 14 條）。找不到官方版本就標 `[no official URL found]`，**Stage 2 寫作時不附 link 也不掰連結**。
       ↳ **密度建議**：每篇 3-8 個 inline 外連最合理。少於 3 → 讀者沒得點，少了「邊讀邊聽」體驗；多於 10 → 視覺擁擠，每段都是藍字。
       ↳ **位置建議**：作品名在文章中**第一次出現**時加 link；同一作品再次出現不重複加。
       ↳ **跟 footnote 的分工**：inline 外連走「邊讀邊聽／邊讀邊看」的閱讀體驗；footnote 走「來源驗證 + 補充資料」。同一首歌的官方 MV 可以同時放 footnote（給研究者）+ 文中第一次提及加 inline link（給讀者）。範例：
         > 〈[小幸運](https://www.youtube.com/watch?v=_sQSXwdtxlY)〉成為第一支 YouTube 點擊破億的華語單曲 MV[^9]。
         其中 footnote `^9` 描述事實＋附上同一個 URL；inline 連結是給讀者直接跳。
       ↳ 原因：讀者讀到作品名可直接 click 聽／看，不打斷閱讀流；比把所有外連都堆到 footnote 來得即時。對於音樂題材尤其關鍵——歌曲是文章敘事的物件，讀者應該能在閱讀當下就接觸到那個聲音。
```

**延伸閱讀生成（v2.10 新增）：**

```
1. 掃描 `knowledge/` 目錄，找出相關主題文章
2. 選擇 3-5 篇最相關的文章
3. 每篇加上「一兩句話描述」，說明：
       - 為什麼延伸閱讀這篇文章？
       - 這篇文章補充什麼背景/延伸資訊？
4. 格式：標準 Markdown 連結，不用 `[[ ]]`
       - [戒嚴時期](/history/戒嚴時期) — 戒嚴令的法源與實施細節
```

**為什麼要加描述？**

- 讀者知道「為什麼要看這篇文章」
- 建立文章之間的語意連結
- 增強網站的「珊瑚礁結構」感

**⚠️ Footnote 邊寫邊插，不要事後補。** 事後對應來源極度耗時（實測：sub-agent 超時 3 次）。Stage 1 研究筆記裡已有「事實→來源」配對，寫作時直接引用。

**腳註格式規範（v2.9 新增）：**

```markdown
[^1]: [《嚴家淦總統行誼訪談錄》](https://www.drnh.gov.tw/p/404-1003-12925.php?Lang=zh-tw) — 國史館出版，2013 年嚴家淦逝世二十週年紀念叢書，收錄對其親朋故舊的口述訪談，還原其從財經改革到總統任內的完整歷程。
```

**格式要點：**

- **連結 + 破折號 + 完整描述**：`[^n]: [來源名稱](URL) — 詳細說明文字`
- **說明文字長度**：至少 20-30 字，描述來源的出版背景、內容特色、歷史價值
- **不要只有連結**：`[^1]: [URL]` 或 `[^1]: URL` 都不夠好
- **不要「同上」**：重複引用同一來源時，也要寫完整說明（可簡化但不空白）
- **位置**：腳註定義放在 `## 參考資料` 標題下方（標題必須存在）

**為什麼要這樣寫？**

- 讀者可以一鍵複製連結，同時了解來源的背景和可信度
- 完整描述讓文章更有學術嚴謹性
- 避免「同上」讓讀者不知道指的是哪篇文章

**範例對比：**

| 壞範例                  | 好範例                                                                                              |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| `[^1]: [維基百科](URL)` | `[^1]: [維基百科：耕者有其田](URL) — 收錄台灣土地改革三個階段的詳細歷史數據和政策內容。`            |
| `[^2]: 同上`            | `[^2]: [同上](URL) — 收錄公地放領 1951-1976 年間放領 138,957 公頃土地給 286,287 戶農戶的詳細數據。` |
| `[^3]: URL`             | `[^3]: [國史館](URL) — 中華民國政府官方檔案機構，收藏 1949 年政府遷台相關史料。`                    |

**⚠️ 本 Pipeline 只產中文版。英文版由獨立的翻譯流程處理。**

- Rewrite Pipeline 的職責 = 產出高品質**中文版**文章。句號。
- **不要在 rewrite 過程中「順便」產英文版。** 這會分散 token 預算，導致中文品質下降。
- 英文版什麼時候產？→ 中文版 commit 後，走翻譯流程（另一個任務）。
- 100% 的 token 預算都給中文。

**⚠️ Frontmatter 完整性鐵律：**

- `subcategory` 必填 — 參照 `docs/taxonomy/SUBCATEGORY.md` 該 category 的子分類表
- 跨主題文章加統一 tag（如原住民相關文章統一加 `原住民族` tag）
- 不確定歸哪個 subcategory → 先查 SUBCATEGORY.md，沒有合適的 → 在 SUBCATEGORY.md 新增
- **`researchReport` 必填**（v2.18 新增，2026-04-18 δ-late 觀察者建議）：depth-article 若 Stage 1 走 v2.16 流程存了研究報告，frontmatter 必須加 pointer：`researchReport: reports/research/YYYY-MM/{slug}.md`。Dashboard / CI 未來可以從這個欄位 derive「有/無 research audit trail」指標；讀者點擊也能追到原始研究材料。若無 Stage 1 報告（短修正 / 翻譯），省略此欄。

**⚠️ SSOT 鐵律：只改 `knowledge/`，不直接改 `src/content/`。**
寫完後用 `bash scripts/sync.sh` 同步到 src/content/，再 build。
直接改 src/content/ 會被 sync.sh 覆蓋回舊版。

**截圖分享點（2000+ 字文章必備）：**

- 2000 字以上的文章，至少埋 **1 個截圖分享點**
- 格式：blockquote 金句（`> ...`）
- 標準：**脫離上下文仍有意義** — 有人截圖這一句貼到社群，不需要讀全文也能理解和被打動
- 好範例：`> 「數位身分證可以是智慧政府的基礎，也可以是威權政府的基礎建設。」——邱文聰`
- 壞範例：`> 這件事後來產生了深遠的影響。`（脫離上下文 = 廢話）

**防崩潰機制：**

- **結尾先行**：結尾是品質崩塌的起點。先寫結尾 = 保底。
- **後半段品質鎖**：寫到 60% 時暫停自問——「我還有足夠 token 寫好結尾嗎？」不夠 → 現在寫結尾，中間精簡。
- **反百科指令**：不要線性排列事實（北→南→危機→展望）。找驚訝切角，用敘事弧線串連。讀者要想說「欸你知道嗎⋯⋯」不是「我讀了一篇百科」。

**品質門檻（全部打勾才進 Stage 3）：**

- [ ] 結尾不是罐頭？
- [ ] 文章第一個名字是具體的人？
- [ ] 至少 2 句真人引語？
- [ ] 每個轉折有因果鏈？（誰→因為什麼→導致什麼）
- [ ] 開場前三句有具體事實？
- [ ] 富文本達標？（見 EDITORIAL.md）
- [ ] 挑戰是編織在故事裡？
- [ ] **本 pipeline 只產中文。** 沒有偷跑英文版？

---

### Stage 3: VERIFY（預算 15-20%）

**必讀：** `cat QUALITY-CHECKLIST.md`

**流程：嚴格按照 QUALITY-CHECKLIST.md 逐項執行。**

包含五大步驟：

1. **五指檢測**（手動 60 秒）
2. **結構驗證**（逐項打勾）
3. **塑膠掃描**（手動 90 秒，重點掃後半段）
4. **自動驗證**（quality-scan ≤ 3 + build）
5. **事實鐵三角自檢（v2.15 新增，2026-04-14 李洋孢子 #28 三層事實錯誤教訓）**
6. **Commit**（全部通過才執行）

**⚠️ 不合格 = 不 commit。修正後從 QUALITY-CHECKLIST.md 重新驗證。**

#### 5. 事實鐵三角自檢（v2.15 新增 — 強制鐵律）

> 來源：李洋文章 + 孢子 #28 同時犯三層事實錯誤（金額兩千萬→一千萬、單位三十六萬→三千六百萬、杜撰引語從英文回譯）被觀察者撤回的教訓。Stage 3 必須加這層自檢。

##### 5a. 算術自檢

寫完含金額/百分比/比例的段落，**必須做算術自檢**：

```
寫的句子：「兩千萬剛好是他存款的三成」
算術驗證：2000 / 3401 = 58.8% ❌（不可能是「三成」）
紅旗：金額一定有錯
```

```
正確版本：「一千萬剛好是他存款的三成」
算術驗證：1000 / 3401 = 29.4% ≈ 三成 ✅
```

**規則**：每一個「X 是 Y 的 Z 成」「比 X 多 Y」「等於 X 倍」這類數字關係**必須在心裡或用 python3 算一次**。算不通 = 至少有一個數字錯。

##### 5b. 金額單位念出來

寫完含金額的句子，**必須念出來檢查單位**：

```
寫的句子：「一筆三十六萬負債的房貸」
念出來：「三十六萬」聽起來像月薪等級 ❌
真實數字：3,638 萬（從原始來源確認）
紅旗：萬位漏字
```

**規則**：所有金額念出來，跟「日常生活感」對照。

- 萬：月薪、單月開銷
- 百萬：年收、小套房頭期款
- 千萬：豪宅、企業主資產
- 億：上市公司、政府預算

如果念出來的數字跟主題的「合理量級」對不上 = 紅旗。

##### 5c. 引語逐字核對

每一個 `「XXX」` 直接引語格式**必須跟原始中文來源逐字核對**：

```
寫的引語：「我最早到學校，但跟不上齊麟。」
原始來源：《少年報導者》中文網頁
Ctrl-F 搜「我最早到學校」→ 搜不到 ❌
紅旗：杜撰引語
```

**陷阱來源**：WebFetch 對中文網站經常返回**英文 paraphrase 而非中文原文**。把英文 summary 翻譯回中文當「直接引語」使用 = 杜撰。

**規則**：

1. 引語格式 `「XXX」` 是承諾「這是原話」
2. 任何引語在 commit 前必須能在原始中文頁面 Ctrl-F 搜到
3. 搜不到 = 改成轉述句式（不加引號），不准用直接引語格式
4. 詳細紅線見 [EDITORIAL §挖引語制度](../editorial/EDITORIAL.md#挖引語制度)

##### 5d. 三角自檢 checklist（強制）

- [ ] **算術**：每個「X 是 Y 的 Z」「X 比 Y 多」都用 python3 算過？
- [ ] **單位**：每個金額念出來跟「合理量級」對得上？
- [ ] **引語**：每個 `「XXX」` 都能在原始中文頁面 Ctrl-F 搜到？

**任何一項打不勾 = 不 commit，回去修。**

---

### Stage 3.5: FACT VERIFICATION（事實查核，硬 gate）

> **本 stage 是 [FACTCHECK-PIPELINE](FACTCHECK-PIPELINE.md) 的 trigger context**。完整 SOP、atom 類型、11 種 hallucination pattern、6 種 drift modes、Phase 1-6 執行細節、checklist 全部 SSOT 在 FACTCHECK-PIPELINE，本 stage 不複寫（[MANIFESTO §指標 over 複寫](../semiont/MANIFESTO.md#我的進化哲學--指標-over-複寫) 原則）。
>
> **對應 [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律--寧可多檢查一次不要放出連自己都不知道是錯的資訊)。**

#### REWRITE 階段的 Quick Mode 觸發

REWRITE Stage 2 寫完 prose 後、進 Stage 4 之前，**必須跑 FACTCHECK-PIPELINE §Quick Mode**：

- **預算**：30-60 min（主 session 自跑，不 spawn agent）
- **範圍**：
  - 全文 high-risk atom 抽取（引語 + 數字 + 人名 + 獎項 + 地點門牌號碼 + 場景動作 detail）
  - 每個 atom 對 source URL 至少做一次驗證（中文 source 用中文 prompt 要求逐字）
  - footnote URL 健康檢查跑 `bash scripts/tools/check-footnote-urls.sh <article>`
- **觸發 spawn agent 升級為 Full Mode 的條件**：
  - article tier = A 級（≥ 50 footnotes 或 ≥ 3000 字 或 含直接引語 ≥ 10 句）
  - article 對象為真人且可能引發人權／政治／法律敏感
  - Quick Mode 過程中發現 ≥ 3 個 ❌ HARD-FIX → Quick 不夠，升級 Full Mode 重跑

#### Hard gate（FACTCHECK-PIPELINE Phase 6 Triage 結果必須）

- 0 個 🔴 DEAD-LINK（任何 footnote URL 4xx/5xx 都先換源）
- 0 個 ❌ HARD-FIX（claim 不在 source、引號內 paraphrase、third-person flip 等全部處置完）
- ⚠️ SOFT-FIX 數量無上限，但每條都要在 commit message 列出，可 ship 後 polish
- 每個 ❌ 與 🔴 的修補都 append 到 `reports/research/YYYY-MM/{slug}.md` § audit section（DNA #22 raw 永留）

**任何一個 hard gate 條件未滿足 = 不進 Stage 4**。

#### 為什麼這條 stage 是 hard gate 而非 soft

錯誤與幻覺以指數速率摧毀平台可信度。讀者會記得錯誤、截圖到 Threads、引用為「Taiwan.md 是 AI 廢文」的證據；不會記得其他幾百篇正確的文章。**寧可多檢查一次，也不要放出連自己都不知道是錯的資訊**（MANIFESTO §10）。

詳細誕生背景（2026-04-20 ε 吳哲宇 8 處幻覺、2026-04-24 β3 造山者「鞠躬三次」場景動作 hallucination、2026-04-28 θ 沈伯洋 27-fetch audit 發現 over-citing / quote re-paraphrase / third-person flip 三新 pattern）→ 全部記錄於 [FACTCHECK-PIPELINE §誕生事件](FACTCHECK-PIPELINE.md#誕生事件)。

---

### Stage 4: FORMAT CHECK（格式驗證）

**Stage 3 commit 後，逐項檢查文章是否符合格式範本。**

這一步跟 Stage 3 的品質驗證不同——Stage 3 檢查「寫得好不好」，Stage 4 檢查「結構對不對」。

**格式範本檢查清單：**

```
□ Frontmatter 完整（title/description/date/category/tags/subcategory/author/featured/lastVerified/lastHumanReview）
□ 30 秒概覽存在（blockquote 格式，開頭 > **30 秒概覽：**）
□ 正文小標題不是問句（除非問句本身是核心矛盾）
□ 延伸閱讀區塊存在且格式正確：
    - 標題是 **延伸閱讀**：
    - 每條用標準 Markdown 連結（不是 [[wikilink]]）
    - 每條有一兩句話描述
    - 3-5 條
□ ## 參考資料 標題存在，且在腳註定義之前
□ 腳註格式正確：[^n]: [來源名稱](URL) — 完整描述文字
□ 沒有殘留的舊格式（## 參考資料 下面不該有 bullet list 式的來源）
```

**⚠️ 格式不合格 = 修正後重新檢查。不進 Stage 5。**

**🛠️ 強制執行（不是建議，是反射）：**

```bash
# 1. 格式健康 7 維度（含延伸閱讀格式、[[wikilink]] 殘留、斷連結）
bash scripts/tools/format-check.sh knowledge/{Category}/{文章}.md

# 2. 所有 inline [[wikilink]] 目標存在性
bash scripts/tools/wikilink-validate.sh knowledge/{Category}/{文章}.md

# 3. MANIFESTO §11 書寫節制全變體檢查（2026-04-23 β 新增）
# 抓 9 種「不是X是Y」對位句型 + 破折號密度
# 原本 quality-scan.sh 只抓「不是X而是Y」「不僅X更是Y」3 種，
# 認知作戰 v1 實戰抓出「這不是」「不只是」「不再是」「不是A,而是B(跨逗號)」
# 等變體全部漏網。這個工具是造橋鋪路。
bash scripts/tools/check-manifesto-11.sh knowledge/{Category}/{文章}.md
```

**Pre-commit hook 已自動執行這三項檢查**（format-check + wikilink-validate 於 2026-04-04 建立；check-manifesto-11 於 2026-04-23 β 新增）。
如果被擋：按提示修正，不要用 `--no-verify` 繞過。繞過 = 下次有人會重複同樣的錯。

> **為什麼要強制？** 2026-04-04 我在台灣國樂的延伸閱讀寫了 7 個 `[[wikilink]]`，忘記 Astro 不渲染。
> 規則在本文件 v2.10 已經寫過、工具 `check-wikilinks.sh` 存在、我還自己造了 `wikilink-validate.sh`——
> 然後還是寫錯了。教訓：**擁有工具 ≠ 使用工具**。所以現在寫進 pre-commit 強制執行。

#### 多語言 visual smoke test（DNA #19 + i18n Phase 3 #11，hard gate for 大型 refactor）

> **觸發條件**：commit 涉及任何 i18n 系統 / 多語系路由 / homepage components / `src/pages/{lang}/` / `src/i18n/`、或加新語言、或大型 sed 批次替換。
> 對應 [DNA #19 大型 refactor 後 visual smoke test](../semiont/DNA.md#四工程衛生) + [reports/i18n-evolution-roadmap-2026-04-25.md Phase 3 任務 #11](../../reports/i18n-evolution-roadmap-2026-04-25.md)

**強制 SOP**：

```bash
# 1. Build verify
npm run build  # 必須 ✅ all categories healthy

# 2. Cascade prevention test（驗 Phase 1 fix 仍 work）
F="dist/fr/people/index.html"
grep -oE '"/[a-z][a-z-]*/people"' "$F" | sort -u
# 預期：/en/people、/ja/people、/ko/people、/fr/people（+ /es/people if dropdown 完整）
# 不應出現：/ja/fr/people、/ko/fr/people 等 cascade URL

# 3. 5 langs 結構對齊檢查
for L in '' en ja ko fr es; do
  if [ -z "$L" ]; then f="dist/index.html"; lang="zh-TW"; else f="dist/$L/index.html"; lang="$L"; fi
  echo "$lang: halls=$(grep -c 'exhibition-hall' $f) RD=$(grep -c 'Random' $f)"
done
# 預期：5 langs 都有 exhibition halls + RandomDiscovery

# 4. Wrong-language prose 檢查（fr/es 不該含日文/中文 hardcoded）
for L in fr es; do
  hits=$(grep -c -P "[\x{3040}-\x{309F}\x{30A0}-\x{30FF}]" "dist/$L/index.html")
  echo "$L: $hits 平假名/片假名 occurrences"
done
# 預期：0 / 0

# 5. LANGUAGES_REGISTRY SSOT 對齊
bash scripts/tools/check-hardcoded-langs.sh
# 預期：✅ 無 hardcoded language array 違反

# 6. i18n coverage audit（看哪些語言 module 缺 keys）
bash scripts/tools/i18n-coverage-audit.sh
# 預期：知道目前覆蓋率，發現大幅退步主動修
```

**任何一項失敗 = revert 該 commit，不 ship**。歷史教訓：Tailwind Phase 6 反向 sed 讓 ja/ko 壞 2 天 / fr 上線 cp + sed 漏抓日文 prose 持續 1 天 / fr/es 路由疊加 cascade 4 天才被發現——三次都因為缺這層 smoke test。

**對於 SOP 心理摩擦**：跑全套 6 步只要 ~3 分鐘（npm build 是大宗）。如果 commit 不涉及 i18n/multilingual，跳過此 section；只要涉及就強制跑。

---

### Stage 4.5: MEDIA INSERTION（媒體插入，v2.20 新增）

> **觸發時機**：Stage 4 format-check 通過後、Stage 5 cross-link 之前。
>
> **為什麼這時插入**：寫完 prose 才知道「實際敘事節奏在哪、哪段需要 visual 呼吸」。寫之前布陣會綁死寫作節奏；寫完一次插入更自然。
>
> **依賴**：Stage 1.7 必須完成（媒體授權矩陣三表 append research 檔 + 圖片已 cache）。沒做 → 退回 Stage 1.7。
>
> **完整設計理由**：[reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md](../../reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md)

#### §4.5a 三段敘事節奏判斷

媒體插入位置影響敘事節奏，不是隨便塞。三段標準：

| 位置          | 用途                          | 圖型                  | 數量 | 範例                            |
| ------------- | ----------------------------- | --------------------- | ---- | ------------------------------- |
| **hero**      | 30 秒概覽前，建立人物視覺認知 | 16:9 landscape 或 1:1 | 1    | 林琪兒 EMU 2014                 |
| **scene-mid** | 中段重要轉折前                | landscape 為主        | 0-2  | Expedition 42 / Crew-4 training |
| **closure**   | 結尾段視覺收尾（首尾呼應）    | landscape             | 0-1  | 訪台首日場景照（如有）          |

**判準**：

- depth-article（≥ 3000 字）：hero + 1-2 scene-mid，總共 2-3 張
- 短文 / Hub：hero only（1 張）
- 翻譯文：跟原文同步圖片（不另增）

**Scene-mid 位置規則**：圖放在「該段 narrative 開始前」而不是「該段中間」：

```markdown
## 紅色 LED 下的第一口萵苣 ← 小標題

[圖：Expedition 42 三人合影] ← 圖放這裡
_caption_

prose 開始... ← 文字接續
```

**錯誤示範**（切斷敘事節奏）：

```markdown
## 紅色 LED 下的第一口萵苣

prose 第一段...
prose 第二段...

[圖：Expedition 42 三人合影] ← 切斷敘事
_caption_

prose 第三段...
```

**呼吸原則**（呼應 EDITORIAL §密度平衡）：連續 3 段以上密集事實段（≥ 200 字 / 段）→ 中間插入一張 scene 圖作為視覺呼吸。

#### §4.5b 圖檔 fetch + cache + naming

依 Stage 1.7b 的 manifest 已 cache 完成。Stage 4.5 僅做最後 verify：

```bash
# 確認所有 manifest 列出的圖檔都存在於 public/article-images/
ls public/article-images/{category}/

# 必要時補抓（若 Stage 1.7b 未完成全部圖）
mkdir -p public/article-images/{category}/
curl -sL -A "Mozilla/5.0 Taiwan.md/1.0" "{hi-res-url}" \
  -o public/article-images/{category}/{slug}-{topic}-{year}.{ext}

# 確認 file format + 大小 + EXIF GPS 已清
file public/article-images/{category}/{filename}
sips -g pixelWidth -g pixelHeight public/article-images/{category}/{filename} | tail -3

# 必要時 resize / re-encode（hero < 600KB / inline < 400KB）
sips -Z 2000 --setProperty formatOptions 85 public/article-images/{category}/{filename}

# 清 EXIF GPS / 個人資訊（保留 description / copyright）
exiftool -gps:all= -location:all= -DeviceMfgr= -DeviceModel= public/article-images/{category}/{filename}
```

#### §4.5c Aspect ratio 護欄（避免被切）

```bash
bash scripts/tools/check-aspect.sh public/article-images/{category}/{filename}
```

| 圖種          | 必過範圍            | 林琪兒 ι 教訓                                                              |
| ------------- | ------------------- | -------------------------------------------------------------------------- |
| **hero**      | 0.9 ≤ aspect ≤ 2.0  | lindgren-crew4-portrait.jpg 1041×1561 (0.67) 切到頭 → 換 1041×694 (1.5) ✅ |
| **inline 圖** | 0.75 ≤ aspect ≤ 2.5 | Expedition 42 4896×3264 (1.5) ✅ / EMU 1692×1691 (1.0) ✅                  |

不過 → **換圖**（不要強塞）。

#### §4.5d Markdown 插入 + caption + alt text 全規範

**標準格式**：

```markdown
![alt text 描述](/article-images/{category}/{filename}.jpg)
_caption 說明文字。Photo: {credit}. [License via {source}]({source-url})._
```

**Alt text 規則**（accessibility 必需）：

- 描述「畫面內容」不是「圖名」
- 涵蓋：誰 + 在哪 + 做什麼 + 拍攝氛圍
- 30-80 字
- 不重複 caption 文字

**範例對比**：

```markdown
❌ 壞 alt text（只有圖名）：
![林琪兒 2014](/article-images/people/lindgren-emu-2014.jpg)

✅ 好 alt text（描述畫面）：
![林琪兒 2014 年穿艙外活動服（EMU）官方人像，全套白色 NASA 太空服，仰角拍攝顯示頭盔反光](/article-images/people/lindgren-emu-2014.jpg)
```

**Caption 規則**：

- 用 markdown italic `_..._`（不用 HTML `<figcaption>`）
- 結構：`{時間 + 地點 + 事件}。Photo: {攝影者 / 機構}. [License via {source}]({URL})。`
- 中文 prose 風格，跟 article 一致
- 關鍵 metadata（NASA Image ID / Commons file name）放括號註

**範例**：

```markdown
_2014 年 8 月 27 日，林琪兒穿艙外活動服（Extravehicular Mobility Unit）在 NASA 詹森太空中心拍攝的官方人像。Photo: NASA/Bill Stafford. [Public domain via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kjell_Lindgren_in_EMU_(cropped).jpg).\_
```

#### §4.5e 授權清單同步

每張 inline 圖插入後，**強制同步**：

1. **frontmatter**（hero only）：

   ```yaml
   image: '/article-images/{category}/{filename}.jpg'
   imageCredit: '攝影者 / 機構'
   imageLicense: 'Public domain (NASA)' / 'CC BY-SA 4.0' / etc
   imageSource: '{source-URL}'
   ```

2. **文末「## 圖片來源」section**（所有圖）：

   ```markdown
   ## 圖片來源

   本文使用 N 張公有領域 / CC 授權圖片，全部 cache 於 `public/article-images/{category}/` 避免熱連結來源伺服器：

   - [圖檔 1 標題](source-URL) — Photo: 攝影者, YYYY-MM-DD, License, NASA Image ID 或 Commons file
   - [圖檔 2 標題](source-URL) — ...
   ```

#### §4.5f 圖片健康檢查（P0 工具強制）

```bash
bash scripts/tools/article-image-health.sh knowledge/{Category}/{slug}.md
```

預期檢查：

- ✅ 文中所有 `![]()` 連結對應檔案存在
- ✅ Frontmatter `image:` 存在 + credit + license + source
- ✅ 文中無外部熱連結（http/https URL 不在 `/article-images/`）
- ✅ `## 圖片來源` section 存在
- ✅ 所有圖全部有完整 metadata（攝影者 / license / source URL）

**不通過 → 不進 Stage 5。**

#### Stage 4.5 邊界與例外

- **Hub 頁**（`_*.md`）：不放圖，跳過 Stage 4.5
- **短修正 / heal commit**：不重新走 pipeline，圖用既有的不動
- **翻譯文**：跟原文圖同步（cache 共用），caption 翻譯成對應語言
- **沒有合適媒體素材**：明確標 `no-media` 進 research 檔，跳過 Stage 4.5
- **觀察者直接丟連結**（如林琪兒 ι session）：走 Stage 4.5 補圖 SOP（§4.5b/c/d/e/f），不走 Stage 1.7
- **Article ship 後才發現缺圖**：spawn `heal:` commit + 走 Stage 4.5

#### 跟 spore 配圖區分

| 圖種                  | 路徑                           | 用途                    | 生成方式              |
| --------------------- | ------------------------------ | ----------------------- | --------------------- |
| article hero / inline | `public/article-images/{cat}/` | 文章內容                | Stage 1.7 + 4.5 手動  |
| OG 社群分享           | `public/og-images/{cat}/`      | facebook / twitter card | dashboard 自動 derive |
| spore poster          | `public/spore-images/`         | Threads / X 配圖        | `make-spore.sh` 自動  |

不要嘗試共用 — spore 是 social 媒介，需要不同 aspect 跟 brand overlay。article 圖 cache 完整／spore 圖 ephemeral，分開管理。

---

### Stage 5: CROSS-LINK（交叉連結）

**Stage 4 通過後，建立本文與站內其他文章的雙向連結。**

知識不是孤島。每篇新文章都應該編進珊瑚礁的連結網路。

**流程：**

```
1. 從本文的 tags、category、關鍵字，掃描 knowledge/ 找出相關文章（3-8 篇候選）
2. 確認本文的延伸閱讀連結指向的文章確實存在：
   ls knowledge/{Category}/{文章名}.md
3. 反向操作：到每篇相關文章中，檢查是否已有指向本文的延伸閱讀
4. 如果沒有 → 在相關文章的延伸閱讀區塊中加入本文連結（附描述）
5. 如果相關文章沒有延伸閱讀區塊 → 在 ## 參考資料 之前新增
6. commit 所有被修改的文章
```

**加入連結的判斷標準：**

- ✅ 讀者讀完那篇文章後，會自然想知道本文的主題
- ✅ 兩篇文章有實質的知識關聯（不只是同一個 category）
- ❌ 不要為了連結而連結（「台灣」不需要連到每篇文章）

**延伸閱讀格式（與 Stage 2 一致）：**

```markdown
**延伸閱讀**：

- [台灣氣候危機與淨零轉型](/nature/台灣氣候危機與淨零轉型) — 氣候變遷如何驅動台灣的能源轉型與產業結構重組
```

**Commit 格式：** `cross-link: 為「{文章名}」建立雙向延伸閱讀`

**⚠️ 只改延伸閱讀區塊。不要順便「改善」其他文章的內容。**

#### §5.1 Reverse cross-link sibling 格式預檢（v2.21 新增，2026-05-02 EVOLVE-batch 教訓）

補 reverse cross-link 進 sibling 文章前，**強制跑 sibling 格式預檢**：

```bash
bash scripts/tools/format-check.sh knowledge/{Category}/{sibling}.md
```

三種狀態對應動作：

| sibling 格式狀態                             | 動作                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ✅ PASS                                      | 直接補 reverse cross-link，commit                                                                      |
| ⚠️ WARNING（pre-existing 警告 / 不影響功能） | 仍可 commit（hook 接受 warning），commit message 說明「sibling 有 pre-existing X warning」             |
| ❌ FAIL（pre-existing 不合格）               | **DEFER reverse cross-link** + 開 follow-up issue 標 sibling 需獨立 EVOLVE，不繞過 hook 也不擴大 scope |

**為什麼這條是硬規則**：補 reverse cross-link 是 Stage 5 的 1 行修改，不該把 sibling 的 pre-existing tech debt 帶進來變成大改。如果 sibling 真的不合格（例：書目格式 footnote 沒 URL），應該開獨立 EVOLVE issue 處理那篇，不該因為一個 cross-link 強行碰整個 sibling。

**觸發**：2026-05-02 EVOLVE-batch — 兩廳院 EVOLVE 嘗試補 reverse cross-link 進中正紀念堂，pre-commit hook 失敗（中正紀念堂有 12 條書目格式 footnote pre-existing 不合 Taiwan.md `[^n]: [Name](URL) — desc` standard）。Sub-agent D 試圖用 hook auto-reformat 通過，失敗。Defer 到獨立 EVOLVE issue 是正確處理。

**對應 LESSONS-INBOX**：[2026-05-02 EVOLVE-batch — Pre-commit hook 修改 pre-existing 格式失敗的 reverse cross-link defer pattern](../semiont/LESSONS-INBOX.md)。

---

### Stage 6: TRANSLATION（可選）

**Stage 5 完成後，詢問操作者：**

> 「中文版已完成並推上 main。要不要現在走翻譯 pipeline 產英文版？」

| 回答               | 動作                                         |
| ------------------ | -------------------------------------------- |
| ✅ 要              | 基於剛 commit 的中文定稿，走翻譯流程產英文版 |
| ❌ 不要 / 之後再說 | 結束。英文版留給下一輪或其他人               |

**翻譯流程規則：**

- 英文版是「重寫」不是逐句翻譯 — 用英文讀者的語境重新敘事
- 事實和結構以中文定稿為準，不另外加料或刪減
- 英文版寫入 `knowledge/en/{Category}/` 對應路徑
- 寫完跑 `bash scripts/core/sync.sh`

**⚠️ 這一步永遠在中文版 commit 之後。不要在 Stage 2 偷跑。**

---

## 延伸閱讀規範（v2.10 新增）

**格式：標準 Markdown 連結，不用 wikilink `[[ ]]`**

```markdown
**延伸閱讀**：

- [戒嚴時期](/history/戒嚴時期) — 戒嚴令的法源與實施細節
- [白色恐怖](/history/台灣白色恐怖) — 政治案件與人權侵害的歷史
- [二二八事件](/history/二二八事件) — 戰後台灣的重大歷史轉折
```

**重點：**

- 用 `[文字](/path)` 格式，不是 `[[文字]]`
- 每條連結加「一兩句話描述」說明與本文的關係
- 描述要具體，說明「為什麼延伸閱讀這個」

**為什麼？**

- Astro 的 wikilink plugin 只在段落文字中解析 `[[ ]]`
- 列表項目中的 wikilink 無法渲染
- 標準 Markdown 連結 100% 可靠

**錯誤範例：**

```markdown
- [[戒嚴時期]]
- [[白色恐怖]]
```

**正確範例：**

```markdown
- [戒嚴時期](/history/戒嚴時期) — 戒嚴令的法源與實施細節
- [白色恐怖](/history/台灣白色恐怖) — 政治案件與人權侵害
```

---

## 品質分級

| 等級       | 條件                                 | 動作                    |
| ---------- | ------------------------------------ | ----------------------- |
| ✅ PASS    | hollow ≤ 3 + 五指全過 + 結尾不是罐頭 | commit + push           |
| ⚠️ PARTIAL | hollow ≤ 3 但結尾/富文本不足         | 標記待改善，下輪優先    |
| ❌ FAIL    | hollow > 3 或有事實錯誤              | 不 commit，回到 Stage 1 |

---

## Cron 特殊規則

Cron 在單一 session 執行，無法真正分三個 session，但在 prompt 中強制分階段思考。

**Token 預算分配：**

| 階段 | 佔比   | 常見錯誤                          |
| ---- | ------ | --------------------------------- |
| 研究 | 35-40% | 搜太多、每個結果都 web_fetch 全文 |
| 寫作 | 40-45% | 前半段太細、後半段沒力            |
| 驗證 | 15-20% | 跳過驗證直接 commit               |

**Cron 鐵律（與手動執行不同的地方）：**

- **每批最多 1 篇**：v1 時期每批 3 篇，品質明顯不穩。改成每批 1 篇後品質大幅提升。
- **不要 `git add -A`**：只 add 改動的文章和同步後的 `src/content/` 對應目錄。
- **不要跑 `npm run build`**：Build 由 CI/CD 處理。sub-agent 跑 build 容易 timeout 且浪費資源。
- **至少 7 分鐘**：研究 3min + 寫作 2min + 驗證 2min = 最低要求。

**選文指令：**

```bash
cd ~/taiwan-md && git pull
# 佇列頂端，跳過已重寫的
head -30 scripts/tools/rewrite-queue.txt
git log --oneline --since='2026-03-20' | grep -i 'rewrite:' | head -30
```

**Commit 指令：**

```bash
bash scripts/core/sync.sh
bash scripts/tools/quality-scan.sh knowledge/[Category]/[文章名].md    # ≤ 3 才 commit
git add knowledge/[Category]/[文章名].md src/content/
git commit -m "rewrite: [文章名] — EDITORIAL v4 + Pipeline v2.5"
git push
```

**Cron 狀態（2026-04-03）：**

| Cron                              | 狀態        | 說明                       |
| --------------------------------- | ----------- | -------------------------- |
| Taiwan.md Article Quality Rewrite | ❌ disabled | 每小時 1 篇，Opus model    |
| taiwan-md-rewrite (v1)            | ❌ disabled | 舊版每小時 3 篇，已淘汰    |
| taiwan-md-content-sprint          | ❌ disabled | 內容衝刺（新文章），已淘汰 |

**重啟條件（品質革命 Phase 1）：**

1. 確認 EDITORIAL v4 的新標準（引語、因果鏈、切入人物）已整合到 prompt
2. 設定 featured 文章優先佇列（124 篇門面文章先洗）
3. 目標：pass rate → 30%（3 個月內）

---

## 實戰教訓（7 天 Cron 血淚）

1. **一次一篇**：多個 sub-agent 同時跑 = 搶檔案 + timeout + 殭屍 session
2. **至少 7 分鐘**：研究 3min + 寫作 2min + 驗證 2min = 最低要求
3. **prompt 裡寫「立刻執行，不要重述任務」**：否則 AI 花 30% 時間重述指令
4. **量化指標是 pre-filter 不是品質保證**：塑膠句數=0 ≠ 好文章，必須逐篇讀
5. **塑膠會變種**：AI 把被禁句式微調成看似不同的版本（"展現了"→"印證了"→"彰顯了"）
6. **Build 驗證不能省**：YAML frontmatter 偶爾壞掉，一篇壞 = 整個 category 炸
7. **結尾最後寫 = 品質最差**：Pipeline v2 改成結尾先行（Stage 2 先寫結尾再寫正文）

---

## Quick Commands（手動執行用）

```bash
# 寫完文章後一次跑完 Stage 3 驗證
bash scripts/core/sync.sh
npm run build
bash scripts/tools/quality-scan.sh
# 全部通過才 commit
git add -A && git commit -m "content: 深度研究重寫「{主題}」" && git push
```

---

_current: v2.20 | 2026-04-28 ι_

**最近 milestone**（完整 changelog → `git log docs/pipelines/REWRITE-PIPELINE.md`）：

- **v2.20**（2026-04-28）— 新增 Stage 1.7 媒體素材研究 + Stage 4.5 媒體插入 / 8 sub-step 涵蓋圖 license / transcript / aspect ratio / caption / alt text / article-image-health.sh hard gate。設計理由 → [`reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md`](../../reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md)
- **v2.18**（2026-04-21）— Stage 1 agent 選型規則（Explore read-only / general-purpose 有 Write）+ 私有 SSOT 整合 Tier 1-4 + Stage 2 密度平衡自檢 + Agent claim 驗證。對應 EDITORIAL v5.2 三項
- **v2.15**（2026-04-14）— Stage 3 VERIFY「事實鐵三角自檢」段（5a 算術 / 5b 金額單位 / 5c 引語逐字 / 5d checklist）。源自李洋孢子 #28 三層事實錯誤教訓（per DNA #23）
