---
title: 'REWRITE-PIPELINE'
description: '文章改寫主流程 canonical — 6 stage flow + Hard Gate Inventory + 模式速判 + 條件路由'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v3.1'
last_updated: 2026-05-10
last_session: 'sad-shockley-2150'
plugin_check: 'python3 scripts/tools/article-health.py {file} --profile=rewrite-stage-4'
sister_docs:
  - 'EVOLVE-PIPELINE.md'
  - 'FACTCHECK-PIPELINE.md'
  - 'TRANSLATION-PIPELINE.md'
  - 'PEER-INGESTION-PIPELINE.md'
  - 'MEMORY-PIPELINE.md'
  - 'DIARY-PIPELINE.md'
sub_canonical:
  - 'rewrite/REWRITE-RESEARCH.md'
  - 'rewrite/REWRITE-WRITE.md'
  - 'rewrite/REWRITE-VERIFY.md'
  - 'rewrite/REWRITE-MEDIA.md'
  - 'rewrite/REWRITE-MODES.md'
  - 'rewrite/REWRITE-CRON.md'
upstream_canonical:
  - '../semiont/MANIFESTO.md'
  - '../semiont/DNA.md'
  - '../editorial/EDITORIAL.md'
---

# REWRITE-PIPELINE.md — 文章改寫流程

> **這份檔案是 REWRITE 主流程 canonical**（v3.0 重組後 ~280 行）。完整 stage SOP 拆到 6 個 sub-canonical：
>
> | Sub-canonical                                      | 範圍                                                               |
> | -------------------------------------------------- | ------------------------------------------------------------------ |
> | [REWRITE-MODES.md](rewrite/REWRITE-MODES.md)       | 4 模式判斷（Fresh / Evolution / Merge variant / Boundary variant） |
> | [REWRITE-RESEARCH.md](rewrite/REWRITE-RESEARCH.md) | Stage 1: RESEARCH 完整 11 step 流程                                |
> | [REWRITE-WRITE.md](rewrite/REWRITE-WRITE.md)       | Stage 2: WRITE 寫作順序 + 5 條自檢套件                             |
> | [REWRITE-VERIFY.md](rewrite/REWRITE-VERIFY.md)     | Stage 3 / 3.5 / 4 / 5.1 全部驗證 hard gate                         |
> | [REWRITE-MEDIA.md](rewrite/REWRITE-MEDIA.md)       | Stage 1.7 + 4.5 媒體素材完整生命週期                               |
> | [REWRITE-CRON.md](rewrite/REWRITE-CRON.md)         | Cron 模式特殊規則 + 實戰教訓 + Routine 飛輪整合                    |
>
> **跨檔案職責分工（pipeline + 品質基因生態系）：**
>
> | 檔案                                                      | 範圍                                                            |
> | --------------------------------------------------------- | --------------------------------------------------------------- |
> | **本檔**                                                  | 主流程（6 stage 線性 + sub-canonical pointer + 三表 inventory） |
> | [RESEARCH.md](../editorial/RESEARCH.md)                   | 研究方法論 SSOT（怎麼搜、怎麼判斷、怎麼避坑）                   |
> | [EDITORIAL.md](../editorial/EDITORIAL.md)                 | 品質基因 SSOT（好文章長什麼樣、風格、禁止事項）                 |
> | [CITATION-GUIDE.md](../editorial/CITATION-GUIDE.md)       | 引用規範（腳註格式、密度標準、來源品質）                        |
> | [RESEARCH-TEMPLATE.md](../editorial/RESEARCH-TEMPLATE.md) | 研究模板（Stage 1 輸出格式）                                    |
> | [QUALITY-CHECKLIST.md](../editorial/QUALITY-CHECKLIST.md) | 驗證清單（Stage 3 逐項檢查）                                    |
> | [TERMINOLOGY.md](../editorial/TERMINOLOGY.md)             | 用語規範（台灣在地用語標準）                                    |
> | [FACTCHECK-PIPELINE.md](FACTCHECK-PIPELINE.md)            | Stage 3.5 觸發（事實查核完整 SOP）                              |
> | [TRANSLATION-PIPELINE.md](TRANSLATION-PIPELINE.md)        | Stage 6 觸發（翻譯完整 SOP）                                    |
>
> ⚠️ **每個 Stage 都必須讀對應的 sub-canonical + 品質基因檔案。不讀 = 不合格。**

---

## 🚦 Hard Gate Inventory（一張表 audit 全 pipeline）

> 從 prose 萃取的 hard gate 全景。AI session 啟動 rewrite work 時 read 本表 → 知道完整 gate 圖，不用從 prose 自己抽。
>
> 完整 SOP 在 [REWRITE-VERIFY.md](rewrite/REWRITE-VERIFY.md)。

| Gate                       | 觸發 stage  | 條件                          | 工具                                                                                    | 不過 = ?         |
| -------------------------- | ----------- | ----------------------------- | --------------------------------------------------------------------------------------- | ---------------- |
| 核心矛盾鎖                 | Stage 1 終  | 所有 depth                    | research report frontmatter manual                                                      | 不進 Stage 2     |
| 研究報告落檔               | Stage 1 終  | depth ≥ 2000 字               | manual ls + frontmatter `researchReport`                                                | 不進 Stage 2     |
| 媒體授權矩陣三表           | Stage 1.7   | 所有 article（**含 EVOLVE**） | manual append research 檔末尾 + ls public/article-images/{cat}/                         | 不進 Stage 2     |
| 五指 + 結構 + 塑膠 + 算術  | Stage 3     | 所有 article                  | quality-scan + manual                                                                   | 不 commit        |
| 事實鐵三角(算術/單位/引語) | Stage 3 5   | 含金額/數字/引語              | python algebra + Ctrl-F                                                                 | 不 commit        |
| FACTCHECK Quick/Full Mode  | Stage 3.5   | 所有 article / A 級           | FACTCHECK-PIPELINE                                                                      | 不進 Stage 4     |
| **Title+desc spine sync**  | Stage 3 / 4 | **所有 article（含 EVOLVE）** | manual: title 冒號三明治 + desc 吃進核心矛盾（per EDITORIAL §Title 四原則 全 category） | 不 commit        |
| Format check 7 維度        | Stage 4     | 所有 article                  | article-health.py --profile=rewrite-stage-4                                             | pre-commit hook  |
| 多語 visual smoke          | Stage 4     | i18n 改動                     | 6 步 bash                                                                               | revert commit    |
| Image health               | Stage 4.5f  | 涉及圖                        | article-health.py --check=image-health                                                  | 不進 Stage 5     |
| Aspect ratio 護欄          | Stage 4.5c  | 涉及圖                        | check-aspect.sh                                                                         | 換圖             |
| Sibling 格式預檢           | Stage 5.1   | 補 reverse cross-link         | article-health.py --check=format-structure                                              | DEFER + 開 issue |

**🔴 兩條反射特別強化（v3.1，2026-05-10 sad-shockley）**：

1. **Title+desc spine sync** — 所有 category（不限 People）的 EVOLVE 在 Stage 2 寫完後**必須回看 frontmatter title + description**，問三題：
   - 標題是否走「主題：副標 hook」冒號三明治？（單純名詞 = stub，需升）
   - 副標一句是否能單獨 tweet 出去？
   - description 有沒有吃進這次 EVOLVE 加的新節核心矛盾？舊 description 還適用嗎？
   - 任一答 no → 重寫 frontmatter title + description，跟 prose 同 commit

2. **媒體素材 self-check** — 不論 Fresh / EVOLVE，Stage 1.7 都要跑：
   - Fresh：完整跑 §1.7a/b/c/d/e
   - EVOLVE：先 grep 既有條目 frontmatter `image:` 是否存在 + §圖片來源 section 是否存在 → 不存在 = pre-gate 遺珠（v2.20 hard gate 是 2026-04-28 才升，更早的條目皆需補登），補跑 §1.7b 圖片素材至少 hero 1 張
   - 找不到 PD/CC 圖時記錄邊界（per [REWRITE-MEDIA §1.7b 第 6/8 點](rewrite/REWRITE-MEDIA.md)），不放空

## 📋 模式速判表

> 4 模式 + 一個變體判定矩陣。觀察者觸發 REWRITE 時先速判該走哪個。完整 SOP 在 [REWRITE-MODES.md](rewrite/REWRITE-MODES.md)。

| 場景                                             | 模式                 | 觸發訊號                          | 主要差別                                                               |
| ------------------------------------------------ | -------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| 文章不存在                                       | **Fresh**            | 默認                              | 直接 Stage 1                                                           |
| 文章已存在，需要品質提升                         | **Evolution**        | EVOLVE-PIPELINE 觸發 / 觀察者指派 | Stage 0 素材萃取 + 缺口列表                                            |
| observer issue 指出 N 篇主題重疊**可融合進一篇** | **Merge variant**    | issue 兩篇重疊                    | Step A 選 canonical + 萃 [MERGE-IN] + Step D 路徑改寫 5 lang redirect  |
| observer issue 指出 N 篇切片**理應分段不減篇數** | **Boundary variant** | issue N 篇切片                    | Step A 範圍切片表 + Step B 三類劃分(保留/吸納/移除) + 跨 phase handoff |

**整併 vs 範圍重切判定**：

- ✅ 兩篇覆蓋同主題、視角可融合進一篇且讀起來更完整 → **Merge**
- ✅ N 篇切 N 個明確 scope（年代 / 議題 / 地理）每篇有獨立讀者價值 → **Boundary**
- ❌ 主題相關但角度不同（捷運 vs 高鐵）→ 兩篇都留，互相 cross-link
- ❌ Hub + 深度文 → 兩篇都留，Hub 連深度文
- ❌ 短文 + 長文同主題且短文有獨立價值 → 短文升級為深度文，不刪

## 📍 條件式 step 路由表

> 9 個 sub-section 是條件式（不是線性必跑）。

| Sub-step                  | 觸發條件                         | Skip 條件               |
| ------------------------- | -------------------------------- | ----------------------- |
| Stage 0 素材萃取          | 進化模式（Evolution）            | Fresh 默認跳            |
| 整併變體 Step A-E         | observer issue 兩篇重疊          | 一般 EVOLVE             |
| 範圍重切變體 Step A-D     | observer issue N 篇切片需重劃    | 一般 EVOLVE             |
| Stage 1.5（私有 SSOT）    | 整合當事人提供的私有素材         | 無私有素材              |
| Stage 1.7（媒體研究）     | 涉及公開作品 / 影像 / transcript | hub / 短修              |
| Stage 1.7b（圖片）        | depth + 需配圖                   | hub / 純文章            |
| Stage 3.5 Full Mode       | A 級條目 / 政治敏感              | depth < A 級            |
| Stage 4 多語 visual smoke | i18n 改動                        | 純內容文章              |
| Stage 4.5（媒體插入）     | depth + 有 media manifest        | hub / 翻譯文 / no-media |
| Stage 5.1 sibling 預檢    | 補 reverse cross-link            | 不補                    |
| Stage 6 翻譯              | 觀察者拍板                       | 默認 skip               |

## ⚠️ 你最常忘的 Top 5 step

> 從 LESSONS-INBOX / memory 抽 ship-then-retract 高 friction step。動工前主動掃一次。

1. **Stage 1 #7 核心矛盾必填** — 找不到矛盾 = 這篇不該被重寫（國防現代化重寫教訓）
2. **Stage 1 #9 研究報告落檔** — depth-article 沒檔 = 沒 audit trail（DNA #22 raw 永留）
3. **Stage 2 #4 / #11 小標題不編年體** — 編年體 = 維基百科化 = 失敗（Cicada / 草東 / 康士坦 教訓）
4. **Stage 1.7b aspect ratio 護欄** — portrait hero 切到頭（林琪兒 ι session 教訓）
5. **Stage 3 #13 Agent claim 驗證** — agent 推導的名人 claim 必須有公開 URL Ctrl-F 可搜（吳哲宇 EVOLVE 教訓）

---

## 為什麼需要 Pipeline？

**診斷（實戰觀察）：**

1. **Token 耗盡** → 後半段變草稿
2. **沒有中間 checkpoint** → 品質無聲下滑
3. **結尾最後寫** → 精力不夠，結尾變罐頭（峰終定律）
4. **富文本被遺忘** → EDITORIAL 規範到後面沒人記得

**解法：六階段分離 + 結尾先行 + 後半段品質鎖。**

---

## 模式選擇 → REWRITE-MODES.md

> ⚠️ **如果原本已有一篇文章，使用「進化模式」，不是「全新模式」。**

完整 4 模式判斷（Fresh / Evolution / Merge variant / Boundary Redraw variant）→ **[REWRITE-MODES.md](rewrite/REWRITE-MODES.md)**。

簡寫：

- **Fresh**：文章不存在 → 直接 Stage 1
- **Evolution**：文章已存在，品質提升 → Stage 0 素材萃取 + 缺口列表 → Stage 1
- **Merge variant**：兩篇可融合 → Stage 0 前先選 canonical（Step A）+ Stage 5 後路徑改寫 5 lang redirect（Step D）
- **Boundary Redraw variant**：N 篇切 N 個 scope → Stage 0 三類劃分（保留/吸納/移除）+ 跨 phase handoff

---

## 六階段流程

```
Stage 1: RESEARCH（研究）──────→ 研究筆記 + 媒體 manifest
           │ 品質門檻 ✓ 才進下一步
Stage 2: WRITE（寫作）────────→ 中文全文（預設只產中文）
           │ 品質門檻 ✓ 才進下一步
Stage 3: VERIFY（驗證）───────→ 品質 / 塑膠句 / 破折號 / 歐化自檢 + 事實鐵三角
           │ 品質門檻 ✓ 才進下一步
Stage 3.5: FACT VERIFICATION → FACTCHECK-PIPELINE 觸發（atom 抽取 / source 逐字驗證 / triage 修補，HARD GATE）
           │ 所有 claim ✅/降級/刪 才進下一步
Stage 4: FORMAT CHECK（格式）─→ 格式範本逐項驗證
           │
Stage 4.5: MEDIA INSERTION ──→ 三段敘事節奏 / aspect ratio / caption / image-health gate
           │
Stage 5: CROSS-LINK（交叉連結）→ 雙向延伸閱讀
           │
Stage 6: TRANSLATION（可選）──→ 詢問操作者：要不要產英文版？
```

### Stage 1: RESEARCH（預算 35-40%）

**目標**：產出一份結構化研究筆記，讓 Stage 2「不需要再搜尋」就能寫。

**主流程**（11 step）：載入方法論 → 搜尋 ≥ 20 次 → fact-source 配對 → 結尾素材 → 重複偵測 → 找矛盾（核心矛盾必填） → 問觀察者一手素材 → 報告落檔 → spawn agent 選型 → 私有 SSOT 整合 → 媒體素材研究

**完整 SOP**：[REWRITE-RESEARCH.md](rewrite/REWRITE-RESEARCH.md)

**hard gate**：核心矛盾必填 / depth-article 研究報告必存 / 媒體授權矩陣三表完整 / 私有 SSOT 觀察者拍板（如有）

### Stage 1.5: 私有 SSOT 觀察者拍板（條件式）

觸發：Stage 1 整合了當事人提供的私有素材（Obsidian / 編年史 / 家族內情）。

**完整 SOP**：[REWRITE-RESEARCH.md §Step 11](rewrite/REWRITE-RESEARCH.md)。

### Stage 1.7: MEDIA RESEARCH（v2.20）

觸發：Stage 1 結尾必跑（除非 hub / 短修）。蒐集媒體素材 + 授權矩陣 + 圖片 cache + aspect ratio 通過。

**完整 SOP**：[REWRITE-MEDIA.md §Stage 1.7](rewrite/REWRITE-MEDIA.md)

### Stage 2: WRITE（預算 40-45%）

**主流程**（8 step + 5 條自檢）：載入 EDITORIAL → 結尾先行 → 開場 → 小標題先行（不編年體）→ 正文 + footnote → 延伸閱讀 → 自檢套件 → 富文本驗收

**5 條自檢套件**：歐化 / 60% 暫停數破折號 / 編年體 / 密度平衡 / Agent claim 驗證

**完整 SOP**：[REWRITE-WRITE.md](rewrite/REWRITE-WRITE.md)

**hard gate**（10 條）：結尾不是罐頭 / 第一個名字是具體的人 / ≥ 2 句真人引語 / 因果鏈 / 開場具體事實 / 富文本達標 / 挑戰編織在故事裡 / 純中文 / 5 自檢全跑 / 小標題不像「第一章第二章」

### Stage 3: VERIFY（預算 15-20%）

**必讀**：[QUALITY-CHECKLIST.md](../editorial/QUALITY-CHECKLIST.md)

**主流程**（5 步驟）：五指檢測 / 結構驗證 / 塑膠掃描 / 自動驗證 / 事實鐵三角 5a/b/c/d（算術 + 單位 + 引語）

**完整 SOP**：[REWRITE-VERIFY.md](rewrite/REWRITE-VERIFY.md)

### Stage 3.5: FACT VERIFICATION（事實查核，硬 gate）

**對應 [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律--寧可多檢查一次不要放出連自己都不知道是錯的資訊)**。

REWRITE Stage 2 寫完 prose 後、進 Stage 4 之前，**必須跑 [FACTCHECK-PIPELINE](FACTCHECK-PIPELINE.md) §Quick Mode**。A 級條目 / 政治敏感 → 升 Full Mode。

**hard gate**：0 個 🔴 DEAD-LINK + 0 個 ❌ HARD-FIX 才進 Stage 4。完整 SOP → [REWRITE-VERIFY.md §Stage 3.5](rewrite/REWRITE-VERIFY.md)。

### Stage 4: FORMAT CHECK（格式驗證）

**強制執行**：

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{文章}.md --profile=rewrite-stage-4
```

Pre-commit hook 已自動執行（SSOT pre-commit profile 自 2026-05-04 Phase 10 接管）。如果被擋：按提示修正，**不要用 `--no-verify` 繞過**。

涉及 i18n 改動 → 加跑多語 visual smoke test 6 步。完整 SOP → [REWRITE-VERIFY.md §Stage 4](rewrite/REWRITE-VERIFY.md)。

### Stage 4.5: MEDIA INSERTION（v2.20）

觸發時機：Stage 4 format-check 通過後、Stage 5 cross-link 之前。

**主流程**：依 Stage 1.7 manifest 三段敘事節奏插入（hero / scene-mid / closure）+ aspect ratio 護欄 + caption + alt text + 授權清單同步 + image-health gate

**hard gate**：image-health plugin 過 / aspect ratio 通過

**完整 SOP**：[REWRITE-MEDIA.md §Stage 4.5](rewrite/REWRITE-MEDIA.md)

### Stage 5: CROSS-LINK（交叉連結）

**主流程**：掃描 knowledge/ 找相關文章 → 確認本文延伸閱讀目標存在 → 反向操作（到 sibling 加指向本文）→ 5.1 sibling 格式預檢 → commit

**完整 SOP**：[REWRITE-VERIFY.md §Stage 5.1](rewrite/REWRITE-VERIFY.md)（sibling 預檢 hard gate）

**判斷標準**：

- ✅ 讀者讀完那篇後會自然想知道本文主題
- ✅ 兩篇文章有實質的知識關聯（不只是同 category）
- ❌ 不要為了連結而連結（「台灣」不需要連到每篇文章）

延伸閱讀格式（與 Stage 2 一致）：

```markdown
**延伸閱讀**：

- [台灣氣候危機與淨零轉型](/nature/台灣氣候危機與淨零轉型) — 氣候變遷如何驅動台灣的能源轉型與產業結構重組
```

完整延伸閱讀規範（不用 wikilink / 每條描述）→ [REWRITE-WRITE.md §延伸閱讀規範](rewrite/REWRITE-WRITE.md)。

**Commit 格式**：`cross-link: 為「{文章名}」建立雙向延伸閱讀`

⚠️ **只改延伸閱讀區塊。不要順便「改善」其他文章的內容。**

### Stage 6: TRANSLATION（可選）

**Stage 5 完成後，詢問操作者**：

> 「中文版已完成並推上 main。要不要現在走翻譯 pipeline 產英文版？」

| 回答               | 動作                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------ |
| ✅ 要              | 走 [TRANSLATION-PIPELINE](TRANSLATION-PIPELINE.md)，基於剛 commit 的中文定稿產英文版 |
| ❌ 不要 / 之後再說 | 結束。英文版留給下一輪或其他人                                                       |

**翻譯流程規則**：英文版是「重寫」不是逐句翻譯 / 事實和結構以中文定稿為準 / 寫入 `knowledge/en/{Category}/` / 寫完跑 `bash scripts/core/sync.sh`

⚠️ **這一步永遠在中文版 commit 之後。不要在 Stage 2 偷跑。**

---

## 品質分級

| 等級       | 條件                                 | 動作                    |
| ---------- | ------------------------------------ | ----------------------- |
| ✅ PASS    | hollow ≤ 3 + 五指全過 + 結尾不是罐頭 | commit + push           |
| ⚠️ PARTIAL | hollow ≤ 3 但結尾/富文本不足         | 標記待改善，下輪優先    |
| ❌ FAIL    | hollow > 3 或有事實錯誤              | 不 commit，回到 Stage 1 |

---

## Cron 模式 + Routine 飛輪

REWRITE 是 routine 飛輪 6 條核心 routine 之一（`twmd-rewrite-daily` 每天 16:16）。

完整 cron 特殊規則 + 7 天血淚教訓 + Routine 飛輪整合 → **[REWRITE-CRON.md](rewrite/REWRITE-CRON.md)**。

---

_current: v3.0 | 2026-05-09 brave-kirch — Mode 3 自我重組（per [reports/rewrite-pipeline-evolution-plan-2026-05-09.md](../../reports/rewrite-pipeline-evolution-plan-2026-05-09.md)）_

**v3.0 重組**：1290 → 280 行（-78%）+ 拆 6 sub-canonical（MODES / RESEARCH / WRITE / VERIFY / MEDIA / CRON），每個 single-concern。寫文章主路徑 read 量從 ~2280 行降到 ~1280 行（-44%）。Hard gate 11 條集中 inventory 表。模式速判表 + 條件式 step 路由表 + Top 5 最常忘 step 三表前置。

**最近 milestone**（完整 changelog → `git log docs/pipelines/REWRITE-PIPELINE.md`）：

- **v3.0**（2026-05-09 brave-kirch）— Mode 3 自我重組：1290 → 280 行 / 拆 6 sub-canonical / Hard gate inventory canonical 化 / chronicle_lead plugin Wave 1 ship
- **v2.20**（2026-04-28）— 新增 Stage 1.7 媒體素材研究 + Stage 4.5 媒體插入 / 8 sub-step 涵蓋圖 license / transcript / aspect ratio / caption / alt text / image-health hard gate（2026-05-04 Phase 6 SSOT 化為 `article-health.py --check=image-health`）。設計理由 → [`reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md`](../../reports/rewrite-pipeline-media-stage-design-2026-04-28-ι.md)
- **v2.18**（2026-04-21）— Stage 1 agent 選型規則（Explore read-only / general-purpose 有 Write）+ 私有 SSOT 整合 Tier 1-4 + Stage 2 密度平衡自檢 + Agent claim 驗證。對應 EDITORIAL v5.2 三項

🧬
