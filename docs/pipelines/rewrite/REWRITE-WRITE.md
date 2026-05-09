---
title: 'REWRITE-WRITE'
description: 'Stage 2 寫作流程 canonical — 8 step + 5 自檢套件（小標題先行 / 結尾先行 / hook 物件 / 核心矛盾）'
type: 'pipeline-sub-canonical'
status: 'canonical'
last_updated: 2026-05-09
last_session: 'brave-kirch-202256'
parent_canonical: '../REWRITE-PIPELINE.md'
sister_docs:
  - 'REWRITE-RESEARCH.md'
  - 'REWRITE-VERIFY.md'
  - 'REWRITE-MEDIA.md'
  - 'REWRITE-MODES.md'
upstream_canonical:
  - '../../editorial/EDITORIAL.md'
  - '../../editorial/CITATION-GUIDE.md'
---

# REWRITE-WRITE — Stage 2 寫作流程 canonical

> 相關：[REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md)（主流程）| [REWRITE-RESEARCH.md](REWRITE-RESEARCH.md)（Stage 1 研究）| [REWRITE-VERIFY.md](REWRITE-VERIFY.md)（Stage 3 驗證）| [EDITORIAL.md](../../editorial/EDITORIAL.md)（品質基因 SSOT）| [CITATION-GUIDE.md](../../editorial/CITATION-GUIDE.md)（腳註格式 SSOT）
>
> **這份檔案是 REWRITE Stage 2 WRITE 的 canonical 流程**。Stage 2 預算 40-45% token。寫作品質規範本身在 [EDITORIAL.md](../../editorial/EDITORIAL.md)，本檔聚焦「Stage 2 跑流程的寫作順序 + 自檢套件」。

---

## Stage 2: WRITE（預算 40-45%）

**必讀：** `cat docs/editorial/EDITORIAL.md`（全文，686 行，不可截斷）

> ⚠️ **歷史教訓（session δ 2026-04-05）**：之前這裡寫 `head -300`，切掉了 Line 380-479 的 Before/After 範例段落。AI 讀到規則卻沒讀到範例，寫作時退化為編年史。
>
> 不要用 `head` / `tail` 截斷「必讀」指令——規則會讀，但具體範例、小標題規範、結尾模式表會被切掉。完讀後必須回頭檢查四個段落：§挖引語制度、§小標題規範、§結尾的四種模式、§Before/After 實例對比。

**輸入**：Stage 1 研究筆記 + EDITORIAL.md

---

## 寫作順序（強制）

### Step 1：載入 EDITORIAL.md

讀全文，特別注意 §來源引用、**§小標題規範**、§敘事呼吸感。

### Step 2：先寫結尾（3-5 行）← 最重要！

**結尾先行**是 Stage 2 防崩潰的核心：

- 結尾是品質崩塌的起點。先寫結尾 = 保底。
- 範本見 [EDITORIAL §結尾的四種模式](../../editorial/EDITORIAL.md)。

### Step 3：寫開場 + 30 秒概覽

開場前三句必須有具體事實 + 具體的人 + 具體的時刻。

### Step 4：小標題先行決定（v2.17 新增，hard 規則）

**列出全文 5-8 個小標題 BEFORE 寫正文**。鐵律：

| 規則                | 例子                                                              |
| ------------------- | ----------------------------------------------------------------- |
| ❌ 禁止編年體標題   | 「2016 年《XX》發行」「2020 金曲 32」— 這讓文章變成維基百科時間軸 |
| ❌ 禁止問句標題     | 見 [EDITORIAL §小標題規範](../../editorial/EDITORIAL.md)          |
| ✅ 用場景/意象/衝突 | 「陽明山的草東街」/「派對結束了」                                 |
| ✅ 用具體物件/quote | 「凡凡的狗叫土豆」「那張 2,000 張的手工 CD」                      |
| ✅ 用核心矛盾       | 「向外憤怒與向內修補」「沒被認出的金曲歌后」                      |

**驗證**：把 5-8 個小標題念一遍，如果像「第一章、第二章」就是編年史失敗。重來。

> **plugin gate（D Wave 1）**：`article-health.py --check=chronicle-lead` 偵測 `^##\s*\d{4}\s*年` 開頭小標題。HARD violation = 不過 Stage 4。

### Step 5：寫正文（按敘事弧線）

**不按百科排列**。EDITORIAL §正文架構推薦：**起源/關鍵轉折 2-3 個/現況/爭議/意義**。

- 邊寫邊插 `[^n]` footnote（從 Stage 1 的事實 - 來源配對表對應）
- **不是一段寫一張專輯** — 是一段寫一個**論點**或**轉折**，事實散布在論點之中

### Step 6：文末寫 footnote 定義

**腳註格式 canonical 在 [CITATION-GUIDE.md](../../editorial/CITATION-GUIDE.md)**。簡寫範例：

```markdown
[^1]: [來源名稱](URL) — 詳細說明文字（≥ 20-30 字描述出版背景、內容特色、歷史價值）
```

完整格式 + 對比範例 + 「不要寫『同上』」規則 → [CITATION-GUIDE.md](../../editorial/CITATION-GUIDE.md)。

### Step 7：生成延伸閱讀清單

- 讀取 `knowledge/` 目錄，找出相關文章
- 每篇加「一兩句話描述」說明與本文的關係
- 格式：標準 Markdown 連結 `[文章名](/path/slug)`，**不用 `[[wikilink]]`**（Astro 列表項目中的 wikilink 無法渲染）
- 詳見下方 §延伸閱讀規範

### Step 8：回頭檢查富文本數量 + footnote 密度

每 300 字 ≥ 1 個 footnote（per [CITATION-GUIDE](../../editorial/CITATION-GUIDE.md)）。

---

## 寫作中自檢套件（強制鐵律，5 條）

### 自檢 1：歐化語法自檢（v2.13 新增）

念出來，聽到翻譯腔就改：

- 重點掃：被動句（「被認為」）、「的」連鎖（≥ 3）、弱動詞（「進行」「透過」）
- 詳見 [EDITORIAL.md §歐化語法偵測](../../editorial/EDITORIAL.md)

### 自檢 2：60% 暫停數破折號（v2.14 新增）

寫到 60% 時暫停，**數一下「——」數量**：

- > 8 個就開始替換為逗號、句號、冒號或斷句重寫
- quality-scan 閾值是 15，但寫作中途到 15 才改已經傷筋動骨
- 來自 2026-04-10 國防現代化教訓：一寫就寫到 29 個，事後逐個刪很痛

> **plugin gate**：`article-health.py --check=prose-health`（已 instrument 對位句型 + 破折號密度）。

### 自檢 3：編年體自檢（v2.17 新增）

寫完後**念一遍所有小標題**：

- 如果每個標題都是「年份 + 事件」= 編年體失敗，重寫小標題
- 如果文章每段都在講下一張專輯/下一個事件 = 維基百科化失敗
- 觸發 2026-04-18 觀察者 callout 教訓

> **plugin gate（D Wave 1）**：`article-health.py --check=chronicle-lead`（regex 偵測，HARD）。

### 自檢 4：密度平衡自檢（v2.18 新增 — EVOLVE 長文專用）

研究素材豐富（50+ sources）時**強制跑**：

隨機挑三段連續段落念一遍：如果三段都是事實堆疊、沒有一句讓讀者喘氣的話 = 密度失衡。

**三個修正手勢**（詳見 [EDITORIAL §密度平衡](../../editorial/EDITORIAL.md)）：

1. **量化內化為場景**：不寫「196 sessions / 50 學生」→ 寫「有個學生叫 Kasper 跟了整整兩學期」
2. **列表拆成場景**：整年六件事不擠一段，拆出 1-2 個完整場景，其他用連續性語言帶過
3. **每 2-3 段一句策展人的聲音**：呼吸句不傳遞資訊、只製造停頓

來自 2026-04-20 吳哲宇 EVOLVE 實戰：50+ sources 的第一版 prose 5500 字被觀察者評「資訊多到蓋住敘事」，重寫縮到 4800 字但讀起來更開闊。**長文不是孢子的加長版，需要主動選擇留白**。

### 自檢 5：Agent claim 驗證（v2.18 新增 — Stage 2 寫作護欄）

agent 在研究報告中聲稱的「XXX 背書」「XXX 公開推薦」等名人相關 claim，**必須有具體公開 URL + 該 URL Ctrl-F 可搜到該人原始引語**：

- 三源交叉不是「三個不同 agent 都這樣說」——是「**三個獨立的公開 URL 都有逐字引語**」
- agent hallucination 常見模式：基於 Obsidian / 私有素材的側面提及「推導出」一個名人 claim，但外部 URL 其實沒有該人的任何公開發言
- 2026-04-20 實戰：agent 聲稱「張隆志館長背書」「唐鳳為 Taiwan.md 引薦」，主 session 回頭驗證——兩者均無外部公開引語（張隆志只有策展合作關係，唐鳳是被書寫對象）

**自檢問句**：「這個 claim 如果我是陌生記者，能不能只靠公開資料寫進我的報導？」能 → 可寫；不能 → 降級或刪。

**好的策展文**：讀者讀完記得的是「這個人的**一個核心張力**」而不是「這個人的 8 張專輯」。對照組：

- 魏如萱「沒被認出的金曲歌后」是好的（張力）
- Cicada「2022《棲居在溪源之上》：15 天遠征」是編年失敗

---

## inline 外連 → 媒體生命週期（Stage 1.7a SSOT）

> 觸發條件擴大：不只音樂人 People/。**任何題材如果在敘事中提到有公開影像/音檔/影片的具體作品，都應在第一次出現時加 inline 外連**。
>
> 完整 SOP（觸發條件 / URL 優先序 / 密度建議 / 位置建議 / 跟 footnote 的分工）→ [REWRITE-MEDIA.md §1.7a inline 外連 manifest](REWRITE-MEDIA.md)。

格式範例：

```markdown
〈[小幸運](https://www.youtube.com/watch?v=_sQSXwdtxlY)〉成為第一支 YouTube 點擊破億的華語單曲 MV[^9]。
```

其中 footnote `^9` 描述事實＋附上同一個 URL；inline 連結是給讀者直接跳。

**密度建議**：每篇 3-8 inline 外連最合理。少於 3 → 讀者沒得點；多於 10 → 視覺擁擠。

---

## 延伸閱讀規範（v2.10 新增）

**格式：標準 Markdown 連結，不用 wikilink `[[ ]]`**

```markdown
**延伸閱讀**：

- [戒嚴時期](/history/戒嚴時期) — 戒嚴令的法源與實施細節
- [白色恐怖](/history/台灣白色恐怖) — 政治案件與人權侵害的歷史
- [二二八事件](/history/二二八事件) — 戰後台灣的重大歷史轉折
```

**重點**：

- 用 `[文字](/path)` 格式，不是 `[[文字]]`
- 每條連結加「一兩句話描述」說明與本文的關係
- 描述要具體，說明「為什麼延伸閱讀這個」

**為什麼？**

- Astro 的 wikilink plugin 只在段落文字中解析 `[[ ]]`
- 列表項目中的 wikilink 無法渲染
- 標準 Markdown 連結 100% 可靠

---

## 防崩潰機制

- **結尾先行**：結尾是品質崩塌的起點。先寫結尾 = 保底
- **後半段品質鎖**：寫到 60% 時暫停自問——「我還有足夠 token 寫好結尾嗎？」不夠 → 現在寫結尾，中間精簡
- **反百科指令**：不要線性排列事實（北→南→危機→展望）。找驚訝切角，用敘事弧線串連。讀者要想說「欸你知道嗎⋯⋯」不是「我讀了一篇百科」

---

## SSOT 鐵律 + 截圖分享點 + 翻譯邊界

### ⚠️ 本 Pipeline 只產中文版

英文版由獨立的翻譯流程處理：

- Rewrite Pipeline 的職責 = 產出高品質**中文版**文章。句號。
- **不要在 rewrite 過程中「順便」產英文版。** 這會分散 token 預算，導致中文品質下降
- 英文版什麼時候產？→ 中文版 commit 後，走翻譯流程（[TRANSLATION-PIPELINE.md](../TRANSLATION-PIPELINE.md)）
- **100% 的 token 預算都給中文**

### ⚠️ Frontmatter 完整性鐵律

- `subcategory` 必填 — 參照 [SUBCATEGORY.md](../../taxonomy/SUBCATEGORY.md) 該 category 的子分類表
- 跨主題文章加統一 tag（如原住民相關文章統一加 `原住民族` tag）
- 不確定歸哪個 subcategory → 先查 SUBCATEGORY.md，沒有合適的 → 在 SUBCATEGORY.md 新增
- **`researchReport` 必填**（v2.18 新增）：depth-article 若 Stage 1 走 v2.16 流程存了研究報告，frontmatter 必須加 pointer：`researchReport: reports/research/YYYY-MM/{slug}.md`

### ⚠️ SSOT 鐵律：只改 `knowledge/`，不直接改 `src/content/`

寫完後用 `bash scripts/sync.sh` 同步到 src/content/，再 build。直接改 src/content/ 會被 sync.sh 覆蓋回舊版。

### 截圖分享點（2000+ 字文章必備）

- 2000 字以上的文章，至少埋 **1 個截圖分享點**
- 格式：blockquote 金句（`> ...`）
- 標準：**脫離上下文仍有意義** — 有人截圖這一句貼到社群，不需要讀全文也能理解和被打動
- 好範例：`> 「數位身分證可以是智慧政府的基礎，也可以是威權政府的基礎建設。」——邱文聰`
- 壞範例：`> 這件事後來產生了深遠的影響。`（脫離上下文 = 廢話）

---

## 品質門檻（全部打勾才進 Stage 3）

- [ ] 結尾不是罐頭？
- [ ] 文章第一個名字是具體的人？
- [ ] 至少 2 句真人引語？
- [ ] 每個轉折有因果鏈？（誰→因為什麼→導致什麼）
- [ ] 開場前三句有具體事實？
- [ ] 富文本達標？（見 [EDITORIAL.md](../../editorial/EDITORIAL.md)）
- [ ] 挑戰是編織在故事裡？
- [ ] **本 pipeline 只產中文。** 沒有偷跑英文版？
- [ ] **5 個自檢全跑**：歐化 / 破折號 / 編年體 / 密度平衡 / Agent claim？
- [ ] **小標題念一遍不像「第一章、第二章」**？

---

_canonical: REWRITE-WRITE.md_
_萃取自 REWRITE-PIPELINE.md v2.20 §Stage 2 WRITE（line 503-670）_
_拆出原因：寫作 step 跟自檢套件混在一起；inline 外連跟媒體插入分散；footnote 格式範例跟 CITATION-GUIDE 重複（per [evolution plan §3 問題 3](../../../reports/rewrite-pipeline-evolution-plan-2026-05-09.md)）_
_inline 外連 manifest 搬 REWRITE-MEDIA.md / footnote 格式 pointer CITATION-GUIDE_
_Refactor: 2026-05-09 brave-kirch_

🧬
