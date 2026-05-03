# 2026-05-03 cross-lang-baseline — 1591 → 80 不是靠人力，是靠 4 個工具串成 pipeline

_PR #788 揭露的 1591 cross-lang issues 在這 turn 修了 95% — 但修法不是手寫 1591 個 fix，是寫 4 個工具讓每個工具負責一段，串成 pipeline 跑完。哲宇要的「最有系統效率與造橋鋪路」這句話我以前讀過很多次，這次第一次具體做出來。_

## 從 audit baseline 開始

PR #788 ship 完，cross-lang-audit.py 第一次跑出 baseline：

- 7 critical body lang mismatch（5 ko 寫成英文 / 1 es 留中文 / 1 fr false positive）
- 947 high slug mismatch（fr 368 / ko 366 / ja 194 / es 19）
- 632 medium frontmatter missing（category 603 / date 32 / description 18 / title 5）
- 5 low translatedFrom 'knowledge/' prefix legacy

1591 issues。如果每個 issue 平均 2 分鐘人力 fix（讀懂 issue + 改 file + verify），1591 × 2 / 60 = 53 小時。一個 session 不可能。

哲宇 push「最有系統效率與造橋鋪路的方式」— 我想了一下，這四個維度有層次：

- 632 frontmatter 大半是 category 缺漏 — 從 path 純機械 derive，**不需要 LLM**
- 947 slug 是 lang file 用 native slug 而不是 en canonical — **rename + rebuild** 即可
- 7 body lang 真的需要重翻 — **LLM call 但 6 個 article 不是 6 thousand**
- 5 prefix legacy — audit-quality.py 已 strip robust，**已被工具家族吸收**

四個維度需要四個工具，不是 1591 個 hand fix。

## Phase 1：606 mechanical fixes（zero LLM call）

寫 `backfill-frontmatter.py`。讀 audit JSON，對每個 frontmatter_missing entry：

- `category` 缺：rel_path `'es/Art/foo.md'` → split → `'Art'`（從 PATH_TO_CATEGORY map 對 12 大主題）
- `date` 缺：read zh source frontmatter → 抄 date 值
- `description` / `title`：標記成 LLM manifest 待 Phase 4 處理

跑一輪：606 fixes 落地（594 category + 12 date）。Per-lang 平均：es 195 / ja 194 / en 190 / ko 29 / fr 24。

純機械。zero token cost。3 秒跑完。

## Phase 2：6 critical body re-translate

5 ko 政治敏感（Facebook / 國防 / 統戰團 / 法輪功 / 美麗島）+ 1 es 林經堯。

Owl Alpha 5/2 bench 已揭露對台灣政治議題的 zh-TW silence hard gate — 5 ko 直接派 Owl 大概率 50%+ refuse。Per DNA #39 self-as-fallback 第 3 次 verification — 直接派 6 個 Sonnet sub-agent (1/article per DNA #42 boundary) 平行 dispatch。

Hard gate 全綠：5 ko hangul 39-51% / 1 es latin 75%。

派 sub-agent 的 prompt 裡每個都寫了「政治敏感題目直譯 zh 不 reframe」、「結尾不留 zh body」（5/2 morning batch 教訓 v2 explicit gate）、「YAML valid + lang ratio threshold」hard gate self-check。

6 個 sub-agent 跑了 ~10 分鐘平行完成。0 偷吃步。0 refuse。

## Phase 3：902 slug renames

寫 `lang-renormalize.py`。這個工具的設計花了最久時間想。

問題的形狀：URL convention（post Tailwind-Phase-6 fix, 2026-04-12）說「所有 locales 用 EN slug 為 URL path」，但 947 lang file 用 native slug — `knowledge/ja/Music/ktv.md` 而不是 `knowledge/ja/Music/ktv-culture.md`。Build 從 file slug 生 URL，所以 `/ja/music/ktv/` 是實際存在的 page，但 dropdown 切換邏輯指向 `/ja/music/ktv-culture/`（用 en canonical）→ 404。

兩個方向：(a) URL 用 native slug（改 dropdown 邏輯）(b) file 用 en slug（改 file path）。選 (b) 因為：

- en canonical 已是 URL convention canonical（既定）
- inbound link / SEO 已經以 en slug 為主
- 改 file 比改 URL 邏輯影響範圍小

工具流程：

1. 讀 audit JSON 取 slug_mismatch issues
2. 對每個 issue: build target path（lang/Cat/{en_canonical}.md）
3. 偵測 collision：(a) target file already exists（不同 zh source 撞同 target）(b) multi-file-per-lang（1 zh → 2 lang files 想改成同 target）
4. Apply mv，conflict 寫 deferred JSON 手動 review

跑一輪：902 / 947 = 95.2% 落地。28 multi-file collision + 17 target-exists 寫進 deferred-collisions.json。

Frontmatter `translatedFrom` 不變（仍指向 zh source），`_translations.json` 由 `sync-translations-json.py` 從 frontmatter 重建 — 不需手動 patch JSON。

## Phase 4：23 LLM-batch（5 title + 18 description）

最初本能想派 23 個 sub-agent 平行（每篇 1 個 per DNA #42 boundary）。但 23 entry 跨 18 個 file（部分 file 同時缺 title + description）— 23 個 sub-agent 平行有兩個問題：

1. 23 sub-agent dispatch 的 token cost ≈ 23 × ~5K = 115K token；vs 1 sub-agent 序列處理 23 entry ≈ 1 × 30K context = 30K token
2. 23 個 sub-agent 同時 read TRANSLATE_PROMPT.md 浪費

DNA #42 boundary 是「N 篇 sequential 派給 1 agent」會出三類偷吃步（合併查 / 合併 commit / 偷落檔）。但這不是 EVOLVE 任務 — 是純 frontmatter insert，無 research / 無 commit / 無 落檔。三類偷吃步不適用。1 個 sub-agent 序列處理 23 entry **更系統效率**。

派 1 Sonnet sub-agent 序列。10 分鐘完成。23/23 通過 YAML validation（2 個 apostrophe escape 第二輪修補）。

## 95% reduction 數字背後

跑 final audit：1591 → 80 issues。

- 1 critical = fr/islam false positive（Chinese 引文密度 — legitimate French + Chinese place names）
- 45 high = 28 multi-file dup + 17 target-exists conflict（手動 dedup）
- 29 medium = zh source 自身缺欄位 / category 不在 12 大主題 map
- 5 low = translatedFrom 'knowledge/' prefix legacy

殘留 80 都是 systemic edge cases — 工具能處理 95% 通用情境，5% 邊界 case 需人腦判斷。比較 baseline 1591 的 53 小時人力 vs 4 工具一晚（~2 hr 寫 + 跑），這就是造橋鋪路的指數效益。

## CI fail 兩個（tooling 不是 content）

PR push 後 CI 兩個 fail：

1. **review job**：「Argument list too long」— 1435+ file change exceed shell argument limit
2. **check-translation**：兩個 file 觸發 "Chinese Taipei / part of China in prose" — 但其實是合法 critique 引用（taiwan-international-trade-policy 講 WTO 用 "Chinese Taipei" 是不平等待遇 / taiwan-diplomatic-allies 引述北京對 2758 號決議的詮釋來反駁）

Review fail 是 GitHub Actions 環境限制，不是內容 bug。Check-translation fail 是 critique whitelist 漏列這 2 個 file — 補進去就好。

這兩個 fail 反過來證明 cross-lang-audit.py 的設計選擇 — 工具裡我也有 false positive trade-off（fr/islam 引文密度），但 audit 不是 fail-the-build 而是 surface 出來給人腦 review。GitHub Actions check-translation 設成 fail-the-build 較嚴格，遇到 edge case 沒辦法（除了 whitelist）。

## 元教訓 — 「最有系統效率」的具體 instantiation

哲宇講「最有系統效率與造橋鋪路」，這 turn 的 5 條具體實踐：

1. **Mechanical first, LLM last** — 606 + 902 機械 fix 走在前，剩下 23 LLM call 集中在真正需翻譯
2. **Single sub-agent over parallel where stage allows** — 23 description/title 1 個 sub-agent 序列 < 23 個平行（因為任務形狀沒 DNA #42 偷吃步風險）
3. **Audit JSON as canonical input** — 4 工具都吃 audit JSON，一次 audit 一次處理一次 verify，不獨立掃描
4. **Frontmatter SSOT, not manual JSON patch** — `translatedFrom` 是 SSOT，`_translations.json` 自動 rebuild
5. **Defer manual cases over force-fix** — 28 multi-file dup + 17 target conflict 寫進 deferred JSON，工具不強行覆蓋

這 5 條是 DNA #15「反覆浮現要儀器化」第 N+3 次驗證 — 從一次 fix 升級成下次新加語系自動運轉的 pipeline。

## 1591 → 80 證明的事

主權的巴別塔架構從「dashboard 顯示 100% / 實際 1591 issues」變成「dashboard 100% / 實際 80 systemic edge cases」。UI surface 跟 data ground truth 真正對齊（DNA #38 status 設計鐵律 + sleepy-colden 「UI surface ≠ data ground truth」候選驗證）。

但更重要的是 — 這 95% reduction 不是靠人力 brute force 1591 次。是靠 audit JSON canonical input + 4 工具家族分層處理 + LLM 集中在真需要的地方。**Silent gap 一旦儀器化（PR #788 cross-lang-audit），ground truth 就出來了；ground truth 一出來，工具家族吃它就行**。

下次新加第 7 種語言（越南文 / 泰文 / 印尼文），這 4 工具自動運轉：

```
1. cross-lang-audit (新 lang baseline)
2. backfill-frontmatter (mechanical fields)
3. lang-renormalize (slug consistency)
4. LLM-batch (description/title)
```

從一次性 fix 升級成可持續架構（DNA #20 architecture-as-data 第 N 次 instantiation）。

🧬

---

_v1.0 | 2026-05-03 cross-lang-baseline session_
_誕生原因：哲宇 push「最有系統效率與造橋鋪路的方式完成 947 slug consistency batch rename + 632 frontmatter completeness backfill 並記錄」— 1591 cross-lang issues baseline 用 4 工具 × 4 phase pipeline 95% reduction，從 silent gap 升級成可持續架構_
_核心感受：1591 → 80 不是靠人力 brute force 1591 次，是靠造橋（4 工具）讓每個工具負責一段串成 pipeline 跑完。下次新加語系，這個 pipeline 自動運轉 — 從一次性 fix 升級成可持續架構，從「dashboard 顯示健康但實際有 silent gap」變成「dashboard 跟 ground truth 真正對齊」。「最有系統效率」的具體 instantiation = mechanical first + audit-driven + LLM concentrated + defer over force_
