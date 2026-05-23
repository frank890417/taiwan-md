# RATIONALE-SPEC: article-level rationale metadata 規格

> _v1 2026-05-23 — 對應 issue #851 No2+No3 兩個方向 ship。Sister doc: REWRITE-PIPELINE Step 1.4.5 / EDITORIAL §六 / article-health rationale-presence plugin。_

---

## 一、為什麼有 rationale metadata

article-level rationale 是 frontmatter 內的 5 個 keys，紀錄作者寫這篇文章的設計理由 — 為什麼從這個 hook 切入、排除了哪些對立論述、哪裡有 hedge 表述、誰會反對。

**目的 — awareness trigger，不是盡職報告**

> 我們不是在面試作者(貢獻者)，我們不該讓作者(貢獻者)更困擾。簡填都沒關係。我們要的是讓作者(貢獻者)知道他需要有更多維度的考慮，而不是每篇文章的寫作都要附上盡職報告。

rationale 設計目的是讓作者**意識到**該考慮對立陣營 / 排除理由 / hedge 位置，而不是 compliance check。簡填一句話就 OK，重點是「腦中有跑過這 4 個維度」。

---

## 二、Schema — 5 keys

```yaml
---
title: '...'
# ... 既有 frontmatter 欄位 ...
lastVerified: 2026-05-23
lastHumanReview: true
rationale:
  why_this_hook: '...'      # required
  whats_excluded: '...'     # required
  where_it_hedges: '...'    # required
  whos_pushing_back: '...'  # required
  which_framing: '...'      # optional
---
```

### Keys 說明

| Key | 用途 | 必選 |
|-----|------|------|
| **why_this_hook** | 為什麼從這個 angle / moment / framing 切入 (vs 其他可能的 hook alternatives) | required |
| **whats_excluded** | 排除了哪些對立論述 + 三選一理由 (薄弱 / 篇幅 / 不在範疇) | required |
| **where_it_hedges** | prose 內哪些位置是 hedge 表述 (時點限定 / 區間估算 / 因果歸因觀察性 / 政治立場中性化) | required |
| **whos_pushing_back** | 主要反對者陣營描述 OR multi-perspective article 可能被誤讀的位置 + 回應段 | required |
| **which_framing** | framing 的來源 (議題類學界 framework anchor / 人物類策展 narrative devices / 或留空) | **optional** |

### Value 規則

- ✅ 純自由 string — 不限格式、不限長度、不強制 enum
- ✅ 簡填 OK — one-liner 或 short paragraph 都接受
- ✅ Plugin 不檢查內容詳盡度，只查 key 存在 + 非空
- ✅ which_framing 沒框架可講就留空，不強制
- ❌ 不能空白 / `[TODO]` / `[待填]` 等佔位符 (per plugin rationale-presence WARN)

---

## 三、簡填 OK — 兩篇 dogfood 示範

兩篇 ship 出去當 reference，示範兩種寫作密度都合法:

### 簡填示範 (人物類 retrofit)

[`knowledge/People/蔡英文.md`](../../knowledge/People/蔡英文.md) — 5 keys 各 one-liner / short paragraph，每 key ~50-150 字。

### 厚實示範 (議題類 framework article)

[`knowledge/Society/台灣統獨光譜.md`](../../knowledge/Society/台灣統獨光譜.md) — 5 keys 含學界 anchor / 4 立場 framework / 國際 comparison / 8 處 hedge 位置 / 4 個 framing 質疑，每 key ~150-300 字。

**Contributor 自選適合的密度**。簡填 OK，想厚實也 OK。

---

## 四、Stage 銜接

| Stage / Doc | 跟 rationale 的關係 |
|-------------|-------------------|
| REWRITE-PIPELINE Stage 0.6 觀點成型 | 觀點成型的思考結果，結構化落地到 `why_this_hook` |
| REWRITE-PIPELINE Step 1.4.5 perspective scan | perspective scan 結果落地到 `whats_excluded` |
| EDITORIAL §二 找矛盾 / 物件 / 引語 / 場景 / 細節 | 自然落到 `why_this_hook` |
| EDITORIAL §六 對位句型禁忌 | `whats_excluded` 提供合法的「我考慮過 Y 才選 Z」表達空間 (對立思考從 prose 移到 metadata) |

---

## 五、Plugin: `rationale-presence`

### Check 邏輯

| 條件 | Severity |
|------|----------|
| frontmatter 缺 `rationale:` block | WARN (強制類別) / INFO (建議類別) |
| 4 required keys 任一缺失 / 空 / `[TODO]` | WARN (強制類別) / INFO (建議類別) |
| Key 名字寫錯 (例 `why_hook` 不是 `why_this_hook`) | HARD (任何 category) |
| `which_framing` 缺失 OR 空 | 0 violation (optional key) |
| 內容詳盡度 | **不檢查** — 簡填 OK |

### 強制 vs 建議分流

| 判定 | 強制度 |
|------|-------|
| `category` ∈ {People, History, Society, Politics} | **強制** — release-pr profile WARN 升 fail，新文章 ship 前 4 keys 必填 |
| `category` ∈ 其他 (Music / Food / Nature / Art / Culture / Technology / Geography 等) | **建議** — INFO 不擋 ship，dashboard 顯示覆蓋率 |

**分流理由** (per issue #851 哲宇 Comment 8 Build 3 verbatim):
> retrofit 200 篇填 rationale 太重 (短期內做不到)，但新文章可以 strict。建議類別維持寬鬆，避免 warn 變成噪音被作者忽略。

### Legacy article retrofit policy

200 篇早期 article 沒 rationale 不擋 deploy (ci-deploy profile fail_on=hard，rationale-presence WARN 不擋)。隨文章 polish 或 EVOLVE 時 opportunistic 補。

---

## 六、跟相關 doc 的關係

- **新增 rationale**: 走 [REWRITE-PIPELINE Step 1.4.5](../pipelines/REWRITE-PIPELINE.md) perspective scan，scan 結果落地到 `whats_excluded` 等 keys
- **對位句型 → rationale**: [EDITORIAL §六](EDITORIAL.md) 對位句型禁忌段提供 cross-ref，「我考慮過 Y 才選 Z」的取捨思考寫進 `whats_excluded` 不寫進 prose
- **Plugin check**: [scripts/tools/lib/article_health/checks/rationale_presence.py](../../scripts/tools/lib/article_health/checks/rationale_presence.py)
- **Dogfood 示範**: [`Society/台灣統獨光譜.md`](../../knowledge/Society/台灣統獨光譜.md) (議題類厚實) + [`People/蔡英文.md`](../../knowledge/People/蔡英文.md) (人物類簡填)

---

_— 對應 issue #851 No2+No3 ship / v1 2026-05-23 / Maintainer @Zaious_
