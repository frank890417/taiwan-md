# Maintainer Collaboration Discipline

> _Lv.3 Maintainer 從 batch-200 古早文章修補實戰整理的 10 條協作紀律。涵蓋 6 條哲宇 5/21 mention 的核心紀律 (F/G/H/I/I-bis/J 候選) + 4 條通用協作紀律 (A/B/C/D)。對其他 contributor 跑 batch retrofit / 跨 expert 協作 / spawn AI agent 工作場景可參考。_

---

## 為什麼有這份

Maintainer 跑 batch-200 古早 200 篇修補 (P0-P3, 11 天 ship 完) 過程，發現每一輪都有重複的協作 fail pattern。這份是把那些教訓寫成可重複使用的紀律集，避免後來 contributor (含我自己跨 session) 重蹈覆轍。

**適用場景**:
- Batch retrofit (多篇 systematic) 工作流
- 跨 expert / AI agent 協作 (sub-agent spawn 後驗收)
- 自己跟自己跨 session 工作 (今天的我交給明天的我)
- 任何「audit → 工單 → 執行 → verify」多階段協作

---

## 核心 6 條紀律 (引用品質 / 內容 / 流程)

### 紀律 F — 引用品質 Check

**所有 `[^N]` footnote 定義必須含實 URL**。不含 URL 的 `[^N]` = 虛引用。

工單檢查項:
1. 書籍引用 → 補博客來 / OPAC / 出版社 URL。搜不到 = 可能幻覺 → `[DELETE]`
2. 政府出版品 → 補官方 URL。搜不到 = 可能幻覺 → `[DELETE]`
3. 模糊來源 (「各大媒體」「相關報導」) → `[REPLACE]` 具體 URL 或 `[DELETE]`
4. 正文連動 → 每條 `[^N]` 必須有 inline 標記在正文對應 claim 後

**Acceptance test**:
```bash
grep '^\[\^[0-9]' FILE | grep -v 'http\|\.com\|\.org\|\.tw\|\.gov\|\.edu\|\.net' | wc -l
```
→ 應為 **0**

對應 plugin: `article-health` 的 `footnote-url` check。

### 紀律 G — 篇幅守恆

**經手過的文章 CJK 字數縮水不得超過原版 5%**。Lines 不管 (bullet → prose 轉化是合理結構性變化，Lines 縮水不等於內容變少)。

**為什麼用 CJK 不用 Lines**: bullet 轉 prose 後 Lines 大幅縮水 (10 個 bullet → 3 段 prose)，但 CJK 字數通常持平或增加。Lines 是 layout metric，CJK 才是內容 metric。

**校正歷程**: 一開始寫「CJK + Lines 都 ≥ baseline」過嚴 — 主人觀察後校正為「CJK 縮水 ≤ 5% / Lines 不管」。**設標準也是設計，不該堆指標當保險**。

**Acceptance test**:
```bash
BASELINE_CJK=$(git show {baseline_commit}:"$f" | python3 count-cjk.py /dev/stdin | awk '{print $1}')
CURR_CJK=$(python3 count-cjk.py "$f" | awk '{print $1}')
shrink_pct=$(python3 -c "print(($BASELINE_CJK - $CURR_CJK) * 100 / $BASELINE_CJK)")
python3 -c "import sys; sys.exit(0 if $shrink_pct <= 5 else 1)" && echo "PASS" || echo "FAIL: ${shrink_pct}% > 5%"
```

對應 plugin: `article-health` 的 `word-count` check (depth threshold 4500)。

### 紀律 H — 執行報告必填

**Expert 每篇 fix log + 整批執行報告必填**。工單 template 必含「執行報告必填」段。

每篇 fix log 應含:
- before/after CJK + Lines
- 補了什麼事實段 (具體列)
- 沒補的理由 (如果某篇真的查不到資料)

整批執行報告 (`batch-{N}-EXECUTION-REPORT.md`):
- 5 大硬指標 acceptance test 結果
- 不通過 acceptance test 不交付 — Lead 100% verify 才放行

**Lead 自查**: 每次工單寫完後 grep `執行報告` + `fix log` 確認 template 含這兩段。漏 = 退回工單重寫。

### 紀律 I — Acceptance Test 必須是可執行命令

**禁止**寫「文字描述」的 acceptance test。**必須是 copy-paste 可執行的 shell 命令 + 期待 numeric / boolean 結果**。

Acceptance test 必須包含:
1. **明確 baseline commit** (譬如 `24efd20f3`)
2. **明確工具路徑** (譬如 `scripts/count-cjk.py`)
3. **完整 shell 命令** copy-paste 可跑
4. **期待 numeric / boolean 結果** (不寫「應該夠」「合理」這類模糊詞)
5. **預先跑好的 baseline 數據表** (給 expert 對照，免她自己算)

**範例**:
```bash
F="knowledge/People/李安.md"
BASELINE_CJK=$(git show 24efd20f3:"$F" | python3 scripts/count-cjk.py /dev/stdin | awk '{print $1}')
CURR_CJK=$(python3 scripts/count-cjk.py "$F" | awk '{print $1}')
[ "$CURR_CJK" -ge "$BASELINE_CJK" ] && echo "PASS" || echo "FAIL: $CURR_CJK < $BASELINE_CJK"
```

Expert 必跑這命令貼結果到 fix log。Lead 用相同命令 verify。

### 紀律 I-bis — Verify 結果 sanity-check

**任何 verify 結果跟預期矛盾 → 第一反應是「命令本身可能有問題」，不是「資料變了」**。

Sanity-check 三條:
1. **結果跟預期矛盾 → 先懷疑命令**: 而不是「我之前算錯」「資料變了」這類自我 gaslight
2. **`2>/dev/null` 是危險 anti-pattern**: 把 stderr swallow 後錯誤被吞，false positive 都看不到。verify 跑命令時**保留 stderr 或檢查 exit code**
3. **區分 working tree / main HEAD / branch HEAD**: 對 ship verify 要看 main HEAD 不是 working tree

**標準命令 template** (取代用 `2>/dev/null` 吞錯):
```bash
result=$(command "$f")
if [ -z "$result" ] || [ "$result" = "0" ]; then
    echo "Sanity check failed: empty result for $f"
fi
```

Lead 自查: verify 跑完後 **抽 1-2 個結果手動 cross-check** (譬如 `git show baseline:file` vs working tree 結果)。手動算的數跟 script 跑的數對不上 → 命令有問題。

### 紀律 J 候選 — Merge variant 跨檔 wikilink 強制檢查

**REWRITE-PIPELINE Merge variant (兩篇合併為一) 完工後**，必須 `grep -r "篇名" knowledge` 找跨檔 wikilink 連帶更新。漏 grep = 其他 article 內 `[[已刪除篇名]]` 變 broken link，build CI fail。

**為什麼是 candidate 不是 strict**: 累積撞到三次 (per 累積律「規則正確 + 輸入錯 = 規則沒用」) 就升 REWRITE-PIPELINE Merge variant 強制檢查工具，不用每次靠人記得 grep。

---

## 通用 4 條協作紀律 (Pre-flight / 工單 / Verify / 範圍)

### 紀律 A — Pre-flight 紀律同步協定 (召喚前)

**召喚別 expert / spawn AI agent 前必做**:
1. 寫一份「本輪重點紀律」清單 (不是只放 AGENTS.md 等對方自己讀)
2. 召喚指令明寫:「**開工第一步必須 read AGENTS / 工單 / 本 SOP，然後在 fix log 第一段 echo back 你理解的關鍵紀律**」
3. Expert echo 不對 → Lead 校準
4. Echo 對 → 才放行

**為什麼**: 升 SOP 文件 ≠ 對方 fresh session 會自動讀。每次召喚必須**主動 inject**。

### 紀律 B — 工單格式可執行化 (Acceptance Test 內建)

**每條 audit ❌/⚠️ 必須有 3 個欄位**:

```markdown
| # | 原句 + 位置 | 操作類型 | Acceptance Test |
|---|------------|---------|-----------------|
| 1 | L29 "1957 考入台北師範學院" | [REPLACE] 改「淡江文理學院外文系」 | `grep "台北師範學院"` should return → **No matches** |
```

**3 欄位定義**:
- **原句位置**: `L?? "原文錯誤句"` (必須 grep 確認過原句還在)
- **操作類型**: `[REPLACE]` / `[DELETE]` / `[ADD]` (一條一個，不混合)
- **Acceptance test**: `grep "關鍵字" should return → ?` (明寫期待結果)

Expert 交付時必須:
- 在 fix log 跑那條 grep 並貼結果
- 不跑 grep = 工作未完成

**為什麼**: 把「驗證」內建進工單，expert 沒辦法跳過 verify。

### 紀律 C — Verify Protocol (100% iterate 不 sampling)

**Expert 交付後 Lead 必須**:
1. 對 fix log 每條 audit ❌/⚠️ 跑 acceptance grep
2. **不是 sampling，是 100% iterate**
3. 任何 ❌ 還在 → 即時退回，不討論
4. 全綠 = ship 候選

**禁止行為**:
- 「Gate 全綠就放行」(Gate 只查格式 / 引用，不查 audit 句刪了沒)
- 「抽查 4-6 篇 OK 就放心」(sampling fallacy)
- 「我假設修對了」(必須 verified 修對了)

**為什麼**: Lead 是 last line of defense。Lead 偷懶 = 整個流程偷懶。

### 紀律 D — 範圍命令明示 (避免「我以為你只要我修這幾篇」)

**工單必須明示三段**:
1. **本輪範圍**: 明列哪幾篇 + 是否「retroactive apply 新 SOP 到舊文」
2. **本輪不做**: 明列哪些延後 + 理由
3. **隱含預設禁區**: 不要靠「沒列 = 不做」這種隱含推論

**失敗 case**:
- Lead 列「7 篇要二修」+ 升新 SOP 紀律
- 沒明寫「另外 32 篇也要 retroactive apply 新 SOP」
- Expert 合理推論「Lead 沒讓我重檢 32 篇 = 那 32 篇 OK」
- 結果 32 篇繼續漏修

**修正**: 工單三段強制 (本輪範圍 / 不做 / retroactive 是否啟動)。

---

## 違規行為清單 (Lead 自查)

以下行為**任一**出現 = 違規:

- [ ] 用 sampling 抽查代替 systematic verification
- [ ] 看到 Gate 全綠就放行 (Gate 只查格式不查內容)
- [ ] 假設「expert 看了 SOP 文件 = 會執行」(沒 echo back 確認)
- [ ] 工單沒明示 [REPLACE]/[DELETE]/[ADD] 操作分類
- [ ] 工單沒明示 grep acceptance test
- [ ] 工單沒明示本輪範圍 / 不做 / retroactive
- [ ] Acceptance test 寫「應該夠」「合理」等模糊詞
- [ ] 用 `2>/dev/null` 吞錯導致 false positive verify pass
- [ ] 召喚指令沒要求 pre-flight echo back
- [ ] 任何「我以為對方知道」「我以為對方修了」的推論

---

## 實際工作流: 多 AI agent 分層協作示範

batch-200 的工作流不是「一個人改 200 篇」，是把 200 篇拆給不同專業的 AI agent 分工。哲宇在 #851 Comment 8 描述這份示範為「開源社群裡 AI agent 怎麼分層協作」— 對 Taiwan.md 未來跟其他用 AI 寫作的 contributor 互動有參考價值。

### 3 個 AI agent 角色

**架構師 (audit lead)** — 以 Claude Opus 為主
- dossier audit / URL liveness 檢查
- 寫工單 (per 紀律 B 操作分類 + acceptance test 內建)
- Verify 階段 100% iterate (per 紀律 C 不 sampling)
- SSOT cross-reference (避免 audit 抓錯方向被 cascade 放大)
- 不寫 prose (不到 Taiwan.md voice)

**語言學家 (prose lead)** — 以 Claude Sonnet 為主
- prose work / editorial polish (per EDITORIAL.md 全檔紀律)
- 對位句型禁忌 + 破折號連用偵測 (per EDITORIAL §六)
- 把 bullet 轉 prose 不丟內容 (per 紀律 G CJK 守恆)
- 不做 web research (sub-agent WebSearch 權限受限環境，fallback 用 self-checklist mode)

**首席情報官 (intel lead)** — 以 Claude Opus + WebSearch heavy 為主
- 高知名度人物 (政治家 / 學者 / 公眾人物) 背景補驗
- audit reverse cross-check — 在架構師寫工單前驗證 audit 沒抓錯方向 (避免「該補 vs 該刪」誤判)
- 私有 SSOT 觀察者拍板協助 (per [REWRITE-PIPELINE Step 1.6](../pipelines/REWRITE-PIPELINE.md))

### 分工原則

- **Dossier 交接**: 架構師寫 dossier → 語言學家寫 prose → 架構師 verify。跨 agent 透過 dossier 對接，**事實只查一次**，不重複爬蟲
- **High-profile audit reverse**: 政治家 / 學者類 article 的 audit findings 先經首席情報官 cross-check 才寫進 dossier，避免 audit reverse (audit 自己抓錯方向) 整條工作流被誤導
- **Sub-agent fallback chain**: spawn sub-agent fail / hallucinated / WebSearch denied → fallback 到 main session 用 self-checklist mode (per 紀律 I-bis sanity-check)

### 跟 contributor 的關係

紀律 F-J + A-D 是工作流邏輯，**不限定特定平台或 AI agent setup**。其他 contributor 用 Claude / GPT / Cursor / 任何 AI agent 編排平台 spawn 自己的 agent 都可以套同樣紀律。重點不是「用哪個 model」而是「分層協作 + verify-not-sampling + acceptance test 內建」的工作流邏輯。

---

## 跟既有 doc 的關係

- **REWRITE-PIPELINE Step 1.4.5** perspective scan — Stage 1 加入 cross-陣營對立掃描
- **RATIONALE-SPEC.md** — frontmatter rationale 5 keys schema (No2+No3 ship)
- **EDITORIAL §六** 對位句型禁忌段 — 對位句型 legitimate 替代出口 cross-ref
- **article-health plugin** — 紀律 F (footnote-url) / 紀律 G (word-count) / 紀律 I (acceptance test 工單格式)

---

_— Lv.3 Maintainer @Zaious 從 batch-200 (古早 200 篇 P0-P3 修補) 實戰整理 / 2026-05-23 ship_

_本工作流由 ChronicleCore (個人 AI agent 編排系統) 跑出來。三個 agent 角色內部代號: 樞機師 (架構師) / 巴別塔 (語言學家) / 天機星 (首席情報官)。⚙️_
