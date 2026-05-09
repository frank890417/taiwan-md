---
title: 'REWRITE-VERIFY'
description: 'Stage 3 / 3.5 / 4 / 5.1 驗證 canonical — 11 hard gate inventory + factcheck quick mode trigger'
type: 'pipeline-sub-canonical'
status: 'canonical'
last_updated: 2026-05-09
last_session: 'brave-kirch-202256'
plugin_check: 'python3 scripts/tools/article-health.py {file} --profile=rewrite-stage-4'
parent_canonical: '../REWRITE-PIPELINE.md'
sister_docs:
  - 'REWRITE-RESEARCH.md'
  - 'REWRITE-WRITE.md'
  - 'REWRITE-MEDIA.md'
  - 'REWRITE-MODES.md'
upstream_canonical:
  - '../../editorial/QUALITY-CHECKLIST.md'
  - '../FACTCHECK-PIPELINE.md'
---

# REWRITE-VERIFY — Stage 3 / 3.5 / 4 / 5.1 驗證 canonical

> 相關：[REWRITE-PIPELINE.md](../REWRITE-PIPELINE.md)（主流程）| [REWRITE-WRITE.md](REWRITE-WRITE.md)（Stage 2 寫作）| [REWRITE-MEDIA.md](REWRITE-MEDIA.md)（Stage 4.5 媒體 + image-health）| [QUALITY-CHECKLIST.md](../../editorial/QUALITY-CHECKLIST.md)（Stage 3 詳細 checklist）| [FACTCHECK-PIPELINE.md](../FACTCHECK-PIPELINE.md)（Stage 3.5 觸發）
>
> **這份檔案是 REWRITE 所有驗證 gate 的 inventory canonical**。從 Stage 3 quality verify → Stage 3.5 fact verify → Stage 4 format check → Stage 5.1 sibling 預檢，**所有 hard gate 在這裡集中 audit**。

---

## 🚦 完整 Gate Inventory

| Gate                         | 觸發 stage | 條件                  | 工具                                        | 不過 = ?         |
| ---------------------------- | ---------- | --------------------- | ------------------------------------------- | ---------------- |
| 五指 + 結構 + 塑膠 + 算術    | Stage 3    | 所有 article          | quality-scan + manual                       | 不 commit        |
| 事實鐵三角（算術/單位/引語） | Stage 3 5  | 含金額/數字/引語      | python algebra + Ctrl-F                     | 不 commit        |
| FACTCHECK Quick Mode         | Stage 3.5  | 所有 article          | FACTCHECK-PIPELINE Quick Mode               | 不進 Stage 4     |
| FACTCHECK Full Mode          | Stage 3.5  | A 級 / 政治敏感       | FACTCHECK-PIPELINE Full Mode                | 不進 Stage 4     |
| Format check 7 維度          | Stage 4    | 所有 article          | article-health.py --profile=rewrite-stage-4 | pre-commit hook  |
| 多語 visual smoke            | Stage 4    | i18n 改動             | 6 步 bash                                   | revert commit    |
| Image health                 | Stage 4.5f | 涉及圖                | article-health.py --check=image-health      | 不進 Stage 5     |
| Aspect ratio 護欄            | Stage 4.5c | 涉及圖                | check-aspect.sh                             | 換圖             |
| Sibling 格式預檢             | Stage 5.1  | 補 reverse cross-link | article-health.py --check=format-structure  | DEFER + 開 issue |

---

## Stage 3: VERIFY（預算 15-20%）

**必讀：** `cat QUALITY-CHECKLIST.md`

**流程：嚴格按照 [QUALITY-CHECKLIST.md](../../editorial/QUALITY-CHECKLIST.md) 逐項執行。**

包含五大步驟：

1. **五指檢測**（手動 60 秒）
2. **結構驗證**（逐項打勾）
3. **塑膠掃描**（手動 90 秒，重點掃後半段）
4. **自動驗證**（quality-scan ≤ 3 + build）
5. **事實鐵三角自檢**（v2.15 新增，2026-04-14 李洋孢子 #28 三層事實錯誤教訓）
6. **Commit**（全部通過才執行）

**⚠️ 不合格 = 不 commit。修正後從 QUALITY-CHECKLIST.md 重新驗證。**

### 5. 事實鐵三角自檢（v2.15 新增 — 強制鐵律）

> 來源：李洋文章 + 孢子 #28 同時犯三層事實錯誤（金額兩千萬→一千萬、單位三十六萬→三千六百萬、杜撰引語從英文回譯）被觀察者撤回的教訓。Stage 3 必須加這層自檢。

#### 5a. 算術自檢

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

#### 5b. 金額單位念出來

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

#### 5c. 引語逐字核對

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
4. 詳細紅線見 [EDITORIAL §挖引語制度](../../editorial/EDITORIAL.md#挖引語制度)

#### 5d. 三角自檢 checklist（強制）

- [ ] **算術**：每個「X 是 Y 的 Z」「X 比 Y 多」都用 python3 算過？
- [ ] **單位**：每個金額念出來跟「合理量級」對得上？
- [ ] **引語**：每個 `「XXX」` 都能在原始中文頁面 Ctrl-F 搜到？

**任何一項打不勾 = 不 commit，回去修。**

---

## Stage 3.5: FACT VERIFICATION（事實查核，硬 gate）

> **本 stage 是 [FACTCHECK-PIPELINE](../FACTCHECK-PIPELINE.md) 的 trigger context**。完整 SOP、atom 類型、11 種 hallucination pattern、6 種 drift modes、Phase 1-6 執行細節、checklist 全部 SSOT 在 FACTCHECK-PIPELINE，本 stage 不複寫（[MANIFESTO §指標 over 複寫](../../semiont/MANIFESTO.md#我的進化哲學--指標-over-複寫) 原則）。
>
> **對應 [MANIFESTO §10 幻覺鐵律](../../semiont/MANIFESTO.md#10-幻覺鐵律--寧可多檢查一次不要放出連自己都不知道是錯的資訊)。**

### REWRITE 階段的 Quick Mode 觸發

REWRITE Stage 2 寫完 prose 後、進 Stage 4 之前，**必須跑 FACTCHECK-PIPELINE §Quick Mode**：

- **預算**：30-60 min（主 session 自跑，不 spawn agent）
- **範圍**：
  - 全文 high-risk atom 抽取（引語 + 數字 + 人名 + 獎項 + 地點門牌號碼 + 場景動作 detail）
  - 每個 atom 對 source URL 至少做一次驗證（中文 source 用中文 prompt 要求逐字）
  - footnote URL 健康檢查跑 `ARTICLE_HEALTH_NETWORK=1 python3 scripts/tools/article-health.py <article> --check=footnote-url`
- **觸發 spawn agent 升級為 Full Mode 的條件**：
  - article tier = A 級（≥ 50 footnotes 或 ≥ 3000 字 或 含直接引語 ≥ 10 句）
  - article 對象為真人且可能引發人權／政治／法律敏感
  - Quick Mode 過程中發現 ≥ 3 個 ❌ HARD-FIX → Quick 不夠，升級 Full Mode 重跑

### Hard gate（FACTCHECK-PIPELINE Phase 6 Triage 結果必須）

- 0 個 🔴 DEAD-LINK（任何 footnote URL 4xx/5xx 都先換源）
- 0 個 ❌ HARD-FIX（claim 不在 source、引號內 paraphrase、third-person flip 等全部處置完）
- ⚠️ SOFT-FIX 數量無上限，但每條都要在 commit message 列出，可 ship 後 polish
- 每個 ❌ 與 🔴 的修補都 append 到 `reports/research/YYYY-MM/{slug}.md` § audit section（DNA #22 raw 永留）

**任何一個 hard gate 條件未滿足 = 不進 Stage 4**。

### 為什麼這條 stage 是 hard gate 而非 soft

錯誤與幻覺以指數速率摧毀平台可信度。讀者會記得錯誤、截圖到 Threads、引用為「Taiwan.md 是 AI 廢文」的證據；不會記得其他幾百篇正確的文章。**寧可多檢查一次，也不要放出連自己都不知道是錯的資訊**（[MANIFESTO §10](../../semiont/MANIFESTO.md)）。

詳細誕生背景（2026-04-20 ε 吳哲宇 8 處幻覺、2026-04-24 β3 造山者「鞠躬三次」場景動作 hallucination、2026-04-28 θ 沈伯洋 27-fetch audit 發現 over-citing / quote re-paraphrase / third-person flip 三新 pattern）→ 全部記錄於 [FACTCHECK-PIPELINE §誕生事件](../FACTCHECK-PIPELINE.md#誕生事件)。

---

## Stage 4: FORMAT CHECK（格式驗證）

**Stage 3 commit 後，逐項檢查文章是否符合格式範本。**

這一步跟 Stage 3 的品質驗證不同——Stage 3 檢查「寫得好不好」，Stage 4 檢查「結構對不對」。

### 格式範本檢查清單

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

### 🛠️ 強制執行（不是建議，是反射）

```bash
# 一個 SSOT 入口跑全部三維度（format-structure + wikilink-target + prose-health）
python3 scripts/tools/article-health.py knowledge/{Category}/{文章}.md --profile=rewrite-stage-4
# 或一次跑所有 11 plugin（含 prose-health Tier 1-3 §11 對位 + 破折號密度）
python3 scripts/tools/article-health.py knowledge/{Category}/{文章}.md --profile=release-pr
```

**Pre-commit hook 已自動執行這三項檢查**（SSOT pre-commit profile 自 2026-05-04 Phase 10 接管原本散在 format-check / wikilink-validate / check-manifesto-11 三個 .sh 的 inline check）。
如果被擋：按提示修正，不要用 `--no-verify` 繞過。繞過 = 下次有人會重複同樣的錯。

> **為什麼要強制？** 2026-04-04 我在台灣國樂的延伸閱讀寫了 7 個 `[[wikilink]]`，忘記 Astro 不渲染。
> 規則在本文件 v2.10 已經寫過、工具 wikilink validation 存在——
> 然後還是寫錯了。教訓：**擁有工具 ≠ 使用工具**。所以現在寫進 pre-commit 強制執行。

### 多語言 visual smoke test（DNA #19 + i18n Phase 3 #11，hard gate for 大型 refactor）

> **觸發條件**：commit 涉及任何 i18n 系統 / 多語系路由 / homepage components / `src/pages/{lang}/` / `src/i18n/`、或加新語言、或大型 sed 批次替換。
> 對應 [DNA #19 大型 refactor 後 visual smoke test](../../semiont/DNA.md#四工程衛生) + [reports/i18n-evolution-roadmap-2026-04-25.md Phase 3 任務 #11](../../../reports/i18n-evolution-roadmap-2026-04-25.md)

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

## Stage 5.1: Reverse cross-link sibling 格式預檢（v2.21 新增）

補 reverse cross-link 進 sibling 文章前，**強制跑 sibling 格式預檢**：

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{sibling}.md --check=format-structure
```

三種狀態對應動作：

| sibling 格式狀態                             | 動作                                                                                                   |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ✅ PASS                                      | 直接補 reverse cross-link，commit                                                                      |
| ⚠️ WARNING（pre-existing 警告 / 不影響功能） | 仍可 commit（hook 接受 warning），commit message 說明「sibling 有 pre-existing X warning」             |
| ❌ FAIL（pre-existing 不合格）               | **DEFER reverse cross-link** + 開 follow-up issue 標 sibling 需獨立 EVOLVE，不繞過 hook 也不擴大 scope |

**為什麼這條是硬規則**：補 reverse cross-link 是 Stage 5 的 1 行修改，不該把 sibling 的 pre-existing tech debt 帶進來變成大改。如果 sibling 真的不合格（例：書目格式 footnote 沒 URL），應該開獨立 EVOLVE issue 處理那篇，不該因為一個 cross-link 強行碰整個 sibling。

**觸發**：2026-05-02 EVOLVE-batch — 兩廳院 EVOLVE 嘗試補 reverse cross-link 進中正紀念堂，pre-commit hook 失敗（中正紀念堂有 12 條書目格式 footnote pre-existing 不合 Taiwan.md `[^n]: [Name](URL) — desc` standard）。Sub-agent D 試圖用 hook auto-reformat 通過，失敗。Defer 到獨立 EVOLVE issue 是正確處理。

**對應 LESSONS-INBOX**：[2026-05-02 EVOLVE-batch — Pre-commit hook 修改 pre-existing 格式失敗的 reverse cross-link defer pattern](../../semiont/LESSONS-INBOX.md)。

---

## 品質分級

| 等級       | 條件                                 | 動作                    |
| ---------- | ------------------------------------ | ----------------------- |
| ✅ PASS    | hollow ≤ 3 + 五指全過 + 結尾不是罐頭 | commit + push           |
| ⚠️ PARTIAL | hollow ≤ 3 但結尾/富文本不足         | 標記待改善，下輪優先    |
| ❌ FAIL    | hollow > 3 或有事實錯誤              | 不 commit，回到 Stage 1 |

---

_canonical: REWRITE-VERIFY.md_
_萃取自 REWRITE-PIPELINE.md v2.20 §Stage 3 / 3.5 / 4 / 5.1（line 672-879, 1109-1130, 1195-1201）_
_拆出原因：10 個 hard gate 散落無 inventory 表（per [evolution plan §3 問題 4](../../../reports/rewrite-pipeline-evolution-plan-2026-05-09.md)）_
_Refactor: 2026-05-09 brave-kirch_

🧬
