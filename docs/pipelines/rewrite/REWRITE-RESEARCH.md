---
title: 'REWRITE-RESEARCH'
description: 'Stage 1 研究流程 canonical — 11 step + 4 hard gate（20+ search / 核心矛盾 / 5 維度交叉 / 事實鐵三角）'
type: 'pipeline-sub-canonical'
status: 'canonical'
last_updated: 2026-05-09
last_session: 'brave-kirch-202256'
parent_canonical: '../REWRITE-PIPELINE.md'
sister_docs:
  - 'REWRITE-WRITE.md'
  - 'REWRITE-VERIFY.md'
  - 'REWRITE-MEDIA.md'
  - 'REWRITE-MODES.md'
upstream_canonical:
  - '../../editorial/RESEARCH.md'
  - '../../editorial/RESEARCH-TEMPLATE.md'
  - '../../semiont/DNA.md'
---

# REWRITE-RESEARCH — Stage 1 研究流程 canonical

> 相關：[REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md)（主流程）| [REWRITE-MODES.md](REWRITE-MODES.md)（4 模式判斷）| [REWRITE-MEDIA.md](REWRITE-MEDIA.md)（媒體素材完整生命週期）| [RESEARCH.md](../../editorial/RESEARCH.md)（研究方法論 SSOT）| [RESEARCH-TEMPLATE.md](../../editorial/RESEARCH-TEMPLATE.md)（填空模板）
>
> **這份檔案是 REWRITE Stage 1 RESEARCH 的 canonical 流程**。Stage 1 預算 35-40% token。研究方法論本身在 [RESEARCH.md](../../editorial/RESEARCH.md)，本檔聚焦「Stage 1 跑流程的 11 步 + 品質門檻」。

---

## Stage 1: RESEARCH（預算 35-40%）

**目標**：產出一份結構化研究筆記，讓 Stage 2「不需要再搜尋」就能寫。

**必讀：** `cat RESEARCH.md`（方法論）+ `cat RESEARCH-TEMPLATE.md`（填空模板）

### 11 步流程（線性）

#### Step 1-2：載入研究方法論 + 模板

1. 讀 [RESEARCH.md](../../editorial/RESEARCH.md)（搜尋策略、來源判斷、避坑指南）
2. 讀 [RESEARCH-TEMPLATE.md](../../editorial/RESEARCH-TEMPLATE.md)，按模板格式填寫

#### Step 3：搜尋深度（v2.17 升級，原 8 次）

**搜尋至少 20 次**：

- 中文 12+ / 英文 5+ / 一手來源 5+
- 研究深度直接決定文章品質——12 次搜尋的文章容易薄、容易單一視角
- 20+ 次能交叉驗證事實、能找到矛盾視角、能挖到非 Wikipedia 層級的具體錨點（引語、場景、日期）

**v2.17 升級原因**：2026-04-18 當日 11 篇音樂人批次中，12-15 次搜尋的 Cicada / 草東 / 康士坦 / 魏如萱 雖然 pass format-check，但小標題淪為編年史，缺乏場景/意象級的敘事錨點，研究深度是根本原因。

#### Step 4：每事實記錄來源 URL

⚠️ **研究筆記 = 事實 + 來源配對表**（Stage 2 寫 footnote 用）。

#### Step 5：在研究階段就準備結尾素材

⚠️ **不要等寫到最後才想結尾。** 結尾素材在研究階段就要鎖定。

#### Step 6：先偵測重複文章

見 [RESEARCH.md §六](../../editorial/RESEARCH.md)。**不要寫完才發現重疊**。

#### Step 7：🔥 找矛盾（v2.14 新增）

在結束 Stage 1 之前，必須能回答這個問題：**「這篇文章的核心矛盾是什麼？」**

- 好的重寫不是修辭層的工作，是矛盾層的工作。舊文不是寫得不好，是它拒絕承認內部矛盾
- 找到矛盾 = 找到重寫的理由。找不到矛盾 = 這篇不該被重寫
- 寫進研究筆記：`核心矛盾 = ?`（一句話，不超過 30 字）
- 範例：
  - 「台灣說要走豪豬戰略，但 76% 預算拿去買美國傳統武器」
  - 「TFT 說要解決偏鄉教育，但孩子的問題不在教室裡是在整個生態系」
- 來自 2026-04-10 session α 國防現代化重寫的教訓：沒有李喜明那句苦笑，整篇會變回豪豬戰略勝利敘事

#### Step 8：🫧 問觀察者要一手素材（v2.15 新增）

Stage 1 結束前，**主動問觀察者一句**：

> 「你手上有沒有我搜不到但你知道的素材？（付費牆文章、私人筆記、實體書、個人經驗）」

這不是偷懶，是承認感知有邊界。爬蟲給事實骨架，觀察者給血肉。

來自安溥重寫的教訓：Agent 49 次搜尋抓不到康健雜誌 403 付費牆文章，觀察者直接貼全文。女巫店兩桌客人、時薪八十塊、林黛玉比喻——文章最有人味的段落全部來自這個管道。

#### Step 9：📁 研究報告必存 `reports/research/YYYY-MM/`（v2.16 新增）

**什麼要存**：depth-article 的 Stage 1 研究報告，完整 Explore agent 輸出 + metadata header。

**scope gate**（不是所有文章都存）：

- ✅ 要存：People/ 深度文、Society/ 深度文、History/ 深度文（預計 ≥ 10 腳註 或 ≥ 2,000 字）
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
core_contradiction: 一句話（≤ 30 字）
---

# Research Report: {Article Title}

{agent 完整輸出內容，不摘要}
```

**好處**（對齊 [DNA #22 raw 永遠不刪](../../semiont/DNA.md) + [MANIFESTO §造橋鋪路](../../semiont/MANIFESTO.md)）：

- Audit trail：文章 fact 被質疑 → 追回 agent 當時的研究材料
- Cross-article re-use：下一篇類似主題先 grep `reports/research/` 看現有研究
- Agent prompt 優化 training data：累積報告是未來 research-gate tuning 的樣本
- 時間切片：未來重寫時可對照「當時研究 vs 當下研究」

**存檔責任**：Stage 1 主 session（spawn agent 者）在 agent 回傳後**同一個 response** 內寫檔，不 defer。寫檔失敗不算 Stage 1 完成。

**讀取責任**：Stage 2 Write 開始前，grep `reports/research/` 看有無相關主題報告可 cross-reference；若有，整合進 Stage 2 參考素材。

#### Step 10：🤖 Spawn agent 選型（v2.18 新增）

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

#### Step 11：🔒 私有 SSOT 整合協議（v2.18 新增）

Stage 1 如果整合了當事人提供的私有素材（Obsidian 筆記、個人編年史、家族內情），**必須在交進 Stage 2 前跑 privacy audit**：

**流程**：

1. **Stage 1 末尾**：列出「從私有素材看到但不確定能否公開」的項目，依 [EDITORIAL §私有素材顆粒度](../../editorial/EDITORIAL.md) 分成 Tier 1-4
2. **Stage 1.5 觀察者拍板**：清單交給當事人，一題一題回答（拒寫 / 寫但不提名 / 寫但改措辭 / 完整寫）
3. **研究報告 §維護者校準備忘錄**：記錄所有 tier 3-4 項目的拍板結果，**不記錄拒寫項目的具體內容**（只記「某類素材不寫」）
4. **Stage 2 寫作護欄**：agent 若基於私有素材自動推導進來的 tier 3-4 claim 必須刪
5. **Stage 3 VERIFY 追加項**：文章公開前再檢查一次是否有漏網的 tier 3-4 內容

**對應**：

- [EDITORIAL §私有素材 × 公開文章的顆粒度（v5.2）](../../editorial/EDITORIAL.md)
- [MEMORY §feedback 隱私協商是動態連續決策](../../semiont/MEMORY.md)

**預警**：私有 SSOT 也會有誤記（當事人 2026 寫 2008 的事情）。當事人的 SSOT 需要與公開 source 三源交叉，不是免驗證的 oracle。

#### Step 12：🎬 媒體素材研究 → Stage 1.7 (REWRITE-MEDIA)

> **本步驟搬到 [REWRITE-MEDIA.md](REWRITE-MEDIA.md)**（媒體素材完整生命週期 canonical，含 Stage 1.7 research + Stage 4.5 insertion 兩階段）。

Stage 1 結尾必跑媒體素材蒐集 + 授權檢查。三類 manifest 落 research 檔末尾：

- **§1.7a**: inline 外連 manifest（YouTube / 影像 / 音檔官方頻道）
- **§1.7b**: 圖片素材（hero + inline 圖）+ 8 條來源優先序 + fair use editorial scope
- **§1.7c**: transcript 素材（公視 / TaiwanPlus / podcast）
- **§1.7d**: 媒體授權矩陣三表（research 檔強制 append）
- **§1.7e**: Stage 1.7 deliverable

**Stage 4.5 媒體插入會直接讀這份 manifest，沒做 = 不能進 Stage 4.5**。

完整流程 → [REWRITE-MEDIA.md](REWRITE-MEDIA.md)。

---

## 品質門檻（全部打勾才進 Stage 2）

見 [RESEARCH-TEMPLATE.md 底部 checklist](../../editorial/RESEARCH-TEMPLATE.md)。

**額外鎖（hard gate）**：

- [ ] **核心矛盾欄位必填**（Step 7）— 填不出來 → 不進 Stage 2
- [ ] **depth-article 研究報告必存**（v2.16 Step 9）— `reports/research/YYYY-MM/{slug}.md` 不存在 → 不進 Stage 2
- [ ] **媒體授權矩陣三表 append 完成 + 圖片 cache + aspect ratio 通過**（v2.20 Stage 1.7）— 不過 → 不進 Stage 2
- [ ] **私有 SSOT 整合過 Stage 1.5 觀察者拍板**（Step 11，如有觸發）

不合格 → 回去搜尋。

---

_canonical: REWRITE-RESEARCH.md_
_萃取自 REWRITE-PIPELINE.md v2.20 §Stage 1 RESEARCH（line 234-501）_
_拆出原因：Stage 1 內部 269 行 / 13 個編號子步驟 / 5 個 §1.7 子層 = 18 個 mental check items（per [evolution plan §3 問題 1](../../../reports/rewrite-pipeline-evolution-plan-2026-05-09.md)）_
_§1.7 媒體素材搬到 REWRITE-MEDIA.md 跟 Stage 4.5 整合_
_Refactor: 2026-05-09 brave-kirch_

🧬
