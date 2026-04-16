# 🧬 Taiwan.md 完整心跳觀察報告 — Session ζ

> **日期**：2026-04-14
> **Session**：ζ（δ→ε→ζ 今日第三個 session）
> **觀察者**：哲宇
> **聚焦**：PR 全景診斷 + 造橋鋪路工具升級

---

## 🚨 摘要：頭條事件

**ceruleanstring 一個人在 24 小時內送了 58 個批次翻譯 PR**：

- 韓文 40 PRs（11 個分類完整覆蓋）
- 法文 18 PRs（5 個分類）
- 總 +346,732 行
- 所有 PR 品質一致：natural rewrite、frontmatter 完整、PR description 標準化

**這是 taiwan.md 史上最大規模的單一貢獻者事件**。

但帶來一個 P0 阻擋：**法文沒有在 astro.config.mjs 的 locales 裡**。merge 18 個法文 PR 等於創造 18 個 orphan articles（檔案存在但無路由、無 sitemap、無語言切換）。

---

## 一、生命徵象（vs 4/14 ε session）

### 基本生理

| 指標             | 數值                                       | 變化                 |
| ---------------- | ------------------------------------------ | -------------------- |
| 知識細胞（中文） | 472                                        | →                    |
| 翻譯細胞         | en 395 / ja 256 / ko 28 / es 36 / **fr 0** | fr 即將上線？        |
| Open PRs         | **58**                                     | +56 vs 上次          |
| Contributors     | 55 → **56** (after merge)                  | +1（ceruleanstring） |

### 器官健康

| 器官    | 分數 | 趨勢 | 說明                       |
| ------- | ---- | ---- | -------------------------- |
| 🫀 心臟 | 90   | →    |                            |
| 🛡️ 免疫 | 99   | →    | review-pr.sh 三層升級      |
| 🧬 DNA  | 95   | →    |                            |
| 🦴 骨骼 | 90   | ⚠️   | fr/es 半孤兒問題暴露       |
| 🫁 呼吸 | 85   | →    |                            |
| 🧫 繁殖 | 85   | ↑↑   | 單一貢獻者 58 PR 海嘯      |
| 👁️ 感知 | 90   | ↑    | bulk-pr-analyze.sh 新工具  |
| 🌐 語言 | 65   | ⚠️   | fr 缺架構，ko 即將大幅提升 |

---

## 二、🔥 PR 海嘯：完整清單

### 韓文 40 PRs（架構 ready，等決策 merge）

| 分類       | PRs | 範圍             | Mergeable |
| ---------- | --- | ---------------- | --------- |
| About      | 1   | #458             | ✅        |
| Art        | 3   | #431-434         | mostly ?  |
| Culture    | 5   | #420-424         | ?         |
| Economy    | 6   | #425-430         | ?         |
| Food       | 3   | #402-404         | ?         |
| History    | 4   | #407-410         | mixed     |
| Lifestyle  | 2   | #405-406         | ?         |
| Music      | 3   | #437/440/444     | ✅        |
| Nature     | 4   | #446/450/453/454 | ✅        |
| Society    | 5   | #411-415         | ?         |
| Technology | 4   | #416-419         | ?         |

**韓文涵蓋率影響**：當前 28 篇 → merge 後 ~265 篇（接近完整覆蓋 SSOT 的 56%）

### 法文 18 PRs（🔴 架構缺席，無法 merge）

| 分類       | PRs | 範圍             | 規模     |
| ---------- | --- | ---------------- | -------- |
| Culture    | 2   | #457, #459       | +60K 行  |
| Food       | 4   | #433/435/436/438 | +17K 行  |
| History    | 4   | #439/441/442/443 | +43K 行  |
| Society    | 4   | #445/447/448/449 | +71K 行  |
| Technology | 4   | #451/452/455/456 | +102K 行 |

**法文目標規模**：18 PRs × ~8 articles ≈ 140+ 篇翻譯 = 一次性追平日文（256 篇）的 55%

---

## 三、品質抽樣

### PR #437 韓文 Music batch 1（五月天 etc）

```yaml
title: '메이데이 (五月天)'
description: '1997년, 다섯 명의 고등학생이 BBS 닉네임으로 밴드를 결성했다...'
tags: [메이데이, Mayday, 아신, 록 음악, 화어 음악, ...]
```

✅ 自然韓文敘事
✅ 文化詞彙正確（아신=阿信、스승대부속중학교=師大附中、人生無限公司 保留中文）
✅ Frontmatter 完整 + translatedFrom 標記
✅ 9 篇文章 + \_translations.json 配套

**review-pr.sh v1.2 結果**：9/9 安全 / 9/9 格式 / 9/9 品質 → 🟡 WARNING（軟警告：缺引語、無腳註——對翻譯而言合理）

### PR #433 法文 Food batch 1（牛肉麵 etc）

```yaml
title: 'La soupe de nouilles au bœuf — âme de la cuisine taïwanaise'
description: "Des migrants continentaux nostalgiques à l'icône culinaire nationale..."
tags: [gastronomie, soupe de nouilles au bœuf, Michelin, ...]
```

✅ 地道法文，Michelin reference 自然
✅ Wikipedia image 含 imageCredit
✅ 文化背景重新組織（不是逐句翻譯）

---

## 四、🚧 法文架構問題（深度診斷）

### 缺失的 15 個 Touchpoint

通過 Explore agent 完整掃描後，新增法文需要修改：

1. `astro.config.mjs` — locales array + sitemap i18n（2 處）
2. `src/content/config.ts` — 5 個 collection 定義
3. `src/types.ts` — Lang type union
4. `src/i18n/ui.ts` — languages object + 法文 UI block（~150 行翻譯）
5. `src/utils/getLangSwitchPath.ts` — 5+ 處硬編碼
6. `src/components/Header.astro` — 語言切換 UI（3 區塊）
7. `src/templates/dashboard.template.astro` — langs array（2 處）
8. `scripts/core/build-search-index.mjs` — 索引產生
9. `scripts/core/generate-dashboard-data.js` — TRANSLATION_LANGS
10. `scripts/core/generate-api.js` — languageDistribution
11. `src/templates/changelog.template.astro` — 日期格式
12. `src/i18n/dashboard.ts` — 法文 dashboard 文案
13. `src/i18n/about.ts / contribute.ts / home.ts / map.ts / notfound.ts / resources.ts / taiwanShape.ts / changelog.ts` — 9 個 i18n 檔案的法文 block
14. `src/pages/` — 建立 fr/ 路由目錄
15. `knowledge/_translations.json` — 法文映射（PR 已包含）

### es 半孤兒問題（同病相憐）

- ✅ Has knowledge base articles in `knowledge/es/` (36 篇)
- ✅ Listed in `generate-dashboard-data.js` TRANSLATION_LANGS
- ❌ NO i18n UI strings
- ❌ NO `/es/` page directory
- ❌ NOT in astro.config locales
- ❌ NOT in Lang type union

**意思是 36 篇西文翻譯也是 orphan**——多個前期 session 創造的歷史債。

---

## 五、🛠️ 造橋鋪路：工具升級

### 工具 1：review-pr.sh v1.2（三層修復）

**Bug 1：L0 whitelist**
PR #399, #400, #437 都因為 `_translations.json` 被 L0 報「非 .md 檔」一律 FAIL。修法：

```bash
SAFE_NON_MD=("knowledge/_translations.json" "knowledge/_taxonomy.json")
```

**Bug 2：--pr 模式無法讀未 merge 的 PR**
`gh pr diff --name-only` 給檔名但本地不存在。修法：

```bash
git fetch origin "pull/${pr_num}/head:refs/pulls/${pr_num}"
git show "refs/pulls/${pr_num}:$file" > "$tmp/$file"
```

不需要 `gh pr checkout`（破壞性切換 branch），用 git ref + tmp dir。

**Bug 3：featured 規則對翻譯誤殺**
原規則「featured 不可 true」是針對 ZH SSOT 防止內容作者搶首頁，但翻譯應該 mirror 原文。修法：

```bash
if echo "$f" | grep -qvE '/(en|ja|ko|es|fr)/'; then
  echo "$fm" | grep -q '^featured: true' && err+=("featured 不可 true")
fi
```

**驗證**：PR #437 從全部 FAIL → 9/9 安全 / 9/9 格式 / 9/9 品質 = 🟡 WARNING ✅

### 工具 2：bulk-pr-analyze.sh v1.0（新建）

**為什麼造這個工具**：

- 心跳 Beat 1 §3 「外部感知」需要 PR 全景數據
- 以前手刻 jq + python 統計，N=2 還能做、N=58 完全做不下去
- 沒有工具就沒有感知——不知道有 58 PR 之前我以為只有 2 個

**輸出範例**：

```
╔══════════════════════════════════════════════════╗
║  📊 Bulk PR Analyze — 58 open PRs                ║
╚══════════════════════════════════════════════════╝

📁 Authors (1)
  ceruleanstring: 58 PRs (+346,732 lines)

🌐 Translation Coverage
  /fr/ (18 PRs): Culture:2, Food:4, History:4, Society:4, Technology:4
  /ko/ (40 PRs): About:1, Art:3, Culture:5, Economy:6, ...

🔀 Merge Status
  ✅: 25
  ?: 33

📋 PR List (newest first)
#459  fr   Culture    +30,654  ✅  ceruleanstring  Add French translations: Culture batch 2
...
```

執行時間：0.8 秒分析完 58 個 PR（單次 GitHub API call + python 處理）

**用法**：

```bash
bash scripts/tools/bulk-pr-analyze.sh           # 全部
bash scripts/tools/bulk-pr-analyze.sh --author ceruleanstring  # 過濾作者
bash scripts/tools/bulk-pr-analyze.sh --json    # JSON 輸出（給其他工具消費）
```

### 工具 3：add-language.sh（規劃中，未實作）

15 個 touchpoint 太多，**這是有人類在場的 session 才能跑的工具**。本心跳不動。

---

## 六、決策樹（給觀察者）

### 法文 18 PRs 三選項

**Option A：先建 fr 架構（推薦）**

- 工作量：~2-4 小時 human-in-loop session
- 結果：fr 變成正式語言，後續 PR 順暢
- 風險：大規模架構修改

**Option B：暫時 close 法文 PR + 留言**

- 工作量：30 分鐘（寫一個禮貌詳細的留言模板）
- 結果：保住貢獻者關係，等架構 ready 再請他重送
- 風險：貢獻者熱情冷卻

**Option C：建 wip/fr branch，merge 到 branch**

- 工作量：1 小時
- 結果：保留所有翻譯成果，但延後 production
- 風險：branch 維護、merge conflict

### 韓文 40 PRs 三選項

**Option A：分批 merge（推薦）**

- 每次 5-8 個，逐次驗證 build
- 工作量：分散在多個 session
- 結果：穩定，可中途暫停

**Option B：一次全 merge**

- 工作量：30 分鐘
- 風險：sync 衝突、build 時間爆增、search index 重生時間

**Option C：建 wip/ko-batch branch**

- 工作量：30 分鐘
- 結果：可以 batch test 後再合到 main

---

## 七、未完成（傳承）

| 優先序 | 項目                     | 說明                                                     |
| ------ | ------------------------ | -------------------------------------------------------- |
| 🔴 P0  | 法文 18 PR 決策          | 需要 human-in-loop                                       |
| 🟠 P1  | 韓文 40 PR 決策          | 需要 human-in-loop                                       |
| 🟠 P1  | bad_fn_format auto-fixer | 382 篇                                                   |
| 🟠 P1  | LANGUAGE-STATUS.md       | 寫一份明確的「open / coming soon / not yet」文件給貢獻者 |
| 🟡 P2  | 探測器缺口 ×2            | 鄭習會 + NCAIR                                           |
| 🟡 P2  | es 半孤兒修復            | 同 fr 問題                                               |
| 🟢 P3  | add-language.sh          | 規劃中                                                   |
| 🟢 P3  | 孢子 A/B 測試            |                                                          |
| 🟢 P3  | SSODT Phase 1            |                                                          |

---

## 八、本心跳交付物

1. ✅ `scripts/tools/review-pr.sh` v1.2（三層修復）
2. ✅ `scripts/tools/bulk-pr-analyze.sh` v1.0（新工具）
3. ✅ `docs/semiont/memory/2026-04-14-ζ.md`（session memory）
4. ✅ `reports/heartbeat-2026-04-14-ζ.md`（本報告）
5. ✅ Dashboard JSON 全面刷新
6. ⏸️ PR merge 動作 → 等觀察者決策

---

## 九、Beat 5 反芻（同步寫進 memory）

1. **58 PR 的真正問題不是規模，是 architecture 缺席**。如果 fr/ infra 已經 ready，這 18 個 PR 就只是再來一輪 sync。下一個造橋機會：寫 `LANGUAGE-STATUS.md` 明確說明「目前 active 語言、規劃中語言、未開放語言」，讓未來貢獻者不會做 invalid 假設。

2. **三層 review-pr.sh 修復是「同一個漏洞的不同表現」**。三個 bug 都源於一個失效假設：review-pr.sh 是為「單篇本地 .md 的 ZH SSOT 修改」設計的。當場景變成「批次翻譯 PR」，三個地方同時露餡。

3. **「沒有工具就沒有感知」**。bulk-pr-analyze.sh 寫完之前我以為 open PR 是 2 個。心跳的 Beat 1 應該把 PR 全景納入標準前置步驟。下次升級：HEARTBEAT.md Beat 1 加 §3b「跑 bulk-pr-analyze.sh」。

---

_🧬 Taiwan.md — Session ζ 完整心跳報告_
_Generated: 2026-04-14 ~10:50 +0800_
