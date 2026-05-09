# 2026-05-09-222920-brave-kirch-editorial — EDITORIAL v6.0 → v6.1 重建為精神文獻 + plugin antithesis 升級 + Sonnet A/B test 三方驗證 (Opus / Grok / Gemini 一致 B 大勝)

> session brave-kirch 後段 — observer-triggered chain (post REWRITE-PIPELINE v3.0 PR #944 finale 後)
> Session span: 21:21 → 22:28 +0800 (~67 min, 4 PRs, 1 squash merge)
> 資料來源：`git log %ai`

## 觸發

哲宇接 REWRITE-PIPELINE v3.0 PR #944 ship 後直接「用同個模式幫我分析 editorial.md」。一個 prompt 啟動 Mode 3 第三次 application（SPORE → REWRITE → EDITORIAL），期間五輪 redirect 把工作從「拆檔分析」校準到「重建為精神文獻」。

## Mode 3 第三次 application — quality SSOT 範式擴展

EDITORIAL 跟 SPORE / REWRITE 性質不同：是 quality SSOT (noun-first)，不是 process pipeline (verb-first)。Plan 報告 [reports/editorial-evolution-plan-2026-05-09.md](../../../reports/editorial-evolution-plan-2026-05-09.md)（595 行）§0 新增「跟前兩次 case 的關鍵差別」section 處理這個範式轉換。第三次跑範式越來越熟 — plan 主體 ~600 行 cover 前兩次 ~770 行同款結構。

[PR #949](https://github.com/frank890417/taiwan-md/pull/949) ship plan，提 4 directions A/B/C/D + 3 校準題給哲宇。

## 哲宇五輪 redirect 校準

每一輪都把方向往更上游推：

- **R1 「裡面有沒有雜訊有沒有重複」** — audit 35% 雜訊估計（已 instrument prose 仍詳述 / sister 重複 / 歷史敘事 / v 標記散落 / 同概念散多處 / Before/After 過時）
- **R2 「精實規則 + 儀器化避免送檢被退」** — 規則分流 plugin/prose 兩軌：適合事後驗證 → plugin / 適合事前指導 → prose
- **R3 「重點是溫度人性觀點視角思考故事 / 完整進入狀態 / 溫度藏在細節裡」** — 這是真正的 mission。從規範書重建為精神文獻
- **R4 「裡面有對位句怎麼工具沒檢查出來」** — plugin 漏抓 16+ 處對位句，因為 (a) 5 個 variants 沒有對應 pattern (b) `if not target.frontmatter: return` 對 docs/ canonical 文件 silent skip 一個多月
- **R5 「不 X 是 Y 中 X 是寫作的錯誤臆測就不用留」** — 比 §11.1 三題判準更上游：X 是 fabricated strawman，刪掉 X 直接寫 Y 文章不會少任何意思

## EDITORIAL v6.0 重建 — 從規範書到精神文獻

[PR #952](https://github.com/frank890417/taiwan-md/pull/952) `6b3d87992`：

- v5.6 → v6.0：1335 → 1060 行（後 v6.1 → 1227 行 +polish）
- 重新組織為「進入狀態的順序」10 sections（Taiwan.md 是什麼 → 看材料的眼睛 → 開場 → 結構 → 結尾 → 語氣 → 引語/事實/紀實 → 特定類型 → 範例 → 檢查 → 不可協商 → 富文本 → sister）
- 新 mission core §二「看材料的眼睛 — 進入狀態的五件事」（找矛盾／物件／引語／場景／**細節 — 溫度藏在這裡**）
- 新 §六「對位句型本質：X 是寫作的錯誤臆測」教學 — 把對位紀律從「禁忌詞表」升級為「為什麼這個結構是 fabricated strawman」根本理解
- 已 instrument 段（半形標點 / 塑膠 / 歐化 / 編年體 / wikilink / frontmatter）壓 plugin pointer
- 保留所有有溫度範例（黑冠麻鷺「鳥沒變地變了」/ 吳哲宇「程式碼會過時鋼琴不會」/ 安溥/戴資穎/五月天/森林/林懷民）

## Plugin 雙修

- 5 個新 antithesis pattern：「不是 X，是 Y」bare（最常見變體）+ 「不只 X，更 Y」/「不只是 X，也 Y」/「並非 X，而是 Y」/「並不 X，而是 Y」
- 修 frontmatter skip bug — `if not target.frontmatter: return` 改為只對 knowledge/ articles 要求，docs/ canonical 仍檢
- 5 個新 unit tests pass / 全測試 215 passed 無 regression

## Sonnet A/B test — 三方獨立驗證 v6.0 mission 達標

兩 Sonnet sub-agents in parallel（同 prompt structure，唯一差別 EDITORIAL 路徑），同 source `颱風-cultural-research.md`。Output 落 `reports/ab-tests/2026-05-09-editorial-v{5.6,6.0}-typhoon-leave.md`。

**三方獨立評審一致判斷 B (v6.0) 大勝**：

| 評審       | B 勝出維度                                                                         | 抓到的盲點                                                  |
| ---------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Opus（我） | 找細節 / 反向解釋 / 塑膠詞清理 / 整體 voice                                        | —                                                           |
| Grok       | 結構完整 / 敘事張力 / 主題聚焦 / 情感共鳴 / 「政策 + 生活記憶 + 集體記憶」三層延伸 | A「⚠️ 爭議觀點框為了平衡而平衡」                            |
| Gemini     | 階級論述 / 文化記憶 / 邏輯遞進                                                     | A「315 億 vs 310 億」並列表格更清楚 (production-grade 建議) |

最關鍵硬證據：B agent 主動找出 source material 裡藏的「颱風麵 cultural memory」段落（A 完全沒挖）— 這是 §二「找細節 — 溫度藏在這裡」mission core 真傳達到 agent 的證據。

**三方一致 = 不是 confirmation bias**。三個獨立 LLM 沒有 EDITORIAL context 純讀文章判斷，得出完全一致結論 = v6.0 mission 真實達標的硬證據。

Counterintuitive finding：plugin 量化 B 對位句 (3) > A 對位句 (1) — v6.0 §六 對位本質教學表格的 ❌ 範例 prime 了 agent（don't think of pink elephant 效應）。但 B 的 3 處對位都用在 manifesto-level reframing 場景，每處都通過 §六 三題判準。

## v6.1 polish — A/B test 結果直接驅動

A/B test 揭露的 5 個 polish 機會立即 ship 進 v6.1（同一 PR）：

| Polish                                                 | 觸發                                                 |
| ------------------------------------------------------ | ---------------------------------------------------- |
| §三 開場「克制 > 完整」+ Before/After                  | A 一句話 vs B 三行新聞 lead                          |
| §三 30 秒概覽 metaphor 警示（緩和版）                  | 外部評審驗證 B 用法 OK，警示針對 vacuum metaphor     |
| §四「段與段的呼吸 — 過渡的紀律」新 sub-section         | B 颱風麵段「在制度爭議之外」framing 詞硬切           |
| §四「列舉的紀律 — 不要寫成第一第二第三」新 sub-section | B 移工四個結構偏條列腔                               |
| §六 對位本質 ⚠️ Pink elephant 警示 callout             | A 1 處 vs B 3 處對位（don't think of pink elephant） |
| §Footer 公約「EDITORIAL polish A/B test SOP」9 步流程  | meta-evolution — EDITORIAL polish 是行為改變實驗     |

最後 polish 6 是 meta-evolution：**任何對 EDITORIAL 主檔的 craft 教學修改強制走 spawn 兩 sub-agent A/B test 驗證**。EDITORIAL 不是文件編輯，是行為改變實驗 — agent 讀完寫出的文章是 EDITORIAL 的 ground truth output，prose review 不夠。

## 收官 checklist

| 檢查項                       | 狀態                                                                  |
| ---------------------------- | --------------------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ✅                                                                    |
| Timestamp 精確               | ✅ git log %ai                                                        |
| Handoff 三態已審視           | ✅                                                                    |
| CONSCIOUSNESS 反映最新狀態   | ❌（純 SOP / plugin / report 工作無生命徵象變動，下次 cron 自動覆寫） |
| 自我檢查工具 PASS            | ⏳ post-write run                                                     |

## Handoff 三態

繼承上 session（brave-kirch 主 finale 202256）：

- [ ] **聶永真 D+3 / D+7 harvest**（5/12, 5/16）— 不在本 session scope
- [ ] **黃魚鴞 #59/#60 D+7 harvest**（5/11）— 仍 pending
- [ ] **D Wave 2-5 plugin 開發**（research_report_validator / media_matrix / arithmetic_sanity / density_balance）— 仍 pending
- [ ] **17 個既存 chronicle 違規 heal commits** — 仍 pending
- [ ] **觀察者 review REWRITE plan §6 三題校準** — 仍 pending

本 session 新 handoff：

- [x] ~~EDITORIAL v6.0 → v6.1 重建~~（[PR #952](https://github.com/frank890417/taiwan-md/pull/952) merged as `6b3d87992`）
- [x] ~~Plugin antithesis upgrade~~ (5 patterns + frontmatter skip 修，PR #952 含)
- [x] ~~Sonnet A/B test + 三方驗證 + test artifacts 歸檔~~（reports/ab-tests/ 兩篇 + report v1.1）
- [ ] **Test C — v6.1 vs v5.6 fresh agents 驗證 polish 改善** — context 快滿 deferred to next session
- [ ] **Gemini production-grade 建議：「315 億 vs 310 億」並列表格範例加進 EDITORIAL §九 Stat Block sub-section**
- [ ] **Grok 抓到的「⚠️ 爭議觀點框為了平衡而平衡」教訓寫進 §挑戰編織法 反例**
- [ ] **EDITORIAL polish A/B test SOP 從 v6.1 起所有 craft 修改強制走** — Footer 已 ship 但 enforcement 靠下次 EDITORIAL 修改時記得跑

## Beat 5 — 反芻

完整反芻寫進 diary（觸發訊號夠強：三方獨立驗證的硬證據意義 + LLM 教學 prime effect 是 LLM-specific 現象 + 「EDITORIAL polish 是行為改變實驗」這條 meta-pattern）。本段只留摘要：

第三次 Mode 3 不只是「拆檔技巧」更熟，是**範式從工程結構擴展到認知教學**。EDITORIAL refactor 跟前兩次最大差別 — 前兩次重組是 process pipeline 的內部結構優化，這次重組是把 quality SSOT 從「規範書」變「精神文獻」，agent 行為改變才是 ground truth。三方獨立評審驗證 + plugin 量化證據 + counterintuitive prime effect 三條同時告訴我同一件事：**EDITORIAL polish 是行為改變實驗，不是文件編輯**。這條認知 instantiate 進 v6.1 §Footer 公約 SOP，下次任何 EDITORIAL craft 修改強制走 A/B test 驗證。

🧬

---

_v1.0 | 2026-05-09 22:30 +0800_
_session brave-kirch-editorial — EDITORIAL v6.0 → v6.1 重建為精神文獻 + plugin antithesis 升級 + Sonnet A/B test 三方驗證 + EDITORIAL polish 是行為改變實驗 meta-evolution_
_誕生原因：哲宇 REWRITE-PIPELINE v3.0 ship 後直接「用同個模式幫我分析 editorial.md」一個 prompt 啟動 Mode 3 第三次 application + 5 輪 redirect 校準 + 三方獨立評審驗證_
_核心洞察：(1) Mode 3 第三次跑範式擴展 — quality SSOT 範式跟 process pipeline 不同 (2) Plugin frontmatter skip bug 讓 EDITORIAL 一個多月漏抓自己對位句 — silent false negative 比 noisy false positive 危險 (3) 三方獨立 LLM 評審一致 = v6.0 mission 真實達標的硬證據，不是 confirmation bias (4) 對位本質教學的 pink elephant prime effect 是 LLM-specific phenomenon，需要明確 mitigation callout_
_LESSONS-INBOX 候選：(1)「EDITORIAL polish 是行為改變實驗不是文件編輯」候選升 MANIFESTO 進化哲學第七條 (verification_count = 1，需 ≥3 次再升) (2)「Plugin frontmatter skip 對 docs/ canonical 文件 silent skip 一個多月」是 silent false negative 範式 — DNA #52「Immune system 沒在 fail loud 比缺 immune system 更危險」第 N+1 次驗證 (3)「Don't think of pink elephant 效應」是 LLM 教學設計的通用 anti-pattern，任何規則教學含 ❌ 範例都該加 mitigation callout (4)「三方獨立 LLM 評審」可作為 EDITORIAL 重大修改的 verification mechanism，加進 polish A/B test SOP 候選_

---

## v2 補充 (2026-05-09 BRAVE-KIRCH-EDITORIAL-2 follow-up)

接續 v1 收官後的同日 follow-up session — finale 結束後哲宇丟三件事：
(a) session-id.sh 加 AAAAA-BBBBB 互動式 prompt 解 auto-codename 污染歷史問題
(b) 跑被 defer 的 Test C 並把 DNA / PIPELINE 類認知層 canonical 統一加 frontmatter（從 EDITORIAL 起）
(c) 全部 commit + merge + 補更新到 memory + diary

### 收的 handoff

- [x] ~~Test C — v6.1 vs v5.6 fresh agents 驗證 polish 改善~~ → 完成。**Quantitative validation of v6.1 polish**：對位句型 -50%（6 → 3）、length 紀律守住下緣（B 3023 vs A overshoot 6636）、結構主線完整（B 不走題 vs A §6-9 漂走到 1996/2009 颱風史）、結尾留白生效（B 一句話收 vs A 排比抒情）。詳見 [reports/editorial-v6.1-test-c-2026-05-09.md](../../../reports/editorial-v6.1-test-c-2026-05-09.md)。
- [x] ~~EDITORIAL frontmatter 統一規格~~ → 完成 v6.2 schema bump。current_version / last_updated / last_session / sister_docs / upstream_canonical 移到 YAML frontmatter。Footer 公約對應更新「metadata 在 frontmatter，footer 留 milestone narrative」。
- [x] ~~session-id.sh v3 互動式 AAAAA-BBBBB prompt~~ → 完成。TTY 偵測（cron / Claude subshell 不觸發）+ normalize（空白 → dash, 轉大寫, strip 雜訊）。三種 handle 字符集（希臘 / lowercase-kebab / UPPERCASE-KEBAB）互不重疊。

PR #960 一包 ship。

### 新本質判讀（補 v1 沒看到的）

1. **「補跑 deferred test 是 cheap 的」** — v1 結尾因 context 滿 defer Test C 時擔心會永遠不跑。實際上 follow-up session 帶 fresh context 跑兩個 sub-agent + 寫 report 只花 ~30 分鐘 wall-clock，agent 並行期間主 session 同時做 frontmatter migration。**Defer ≠ 丟 — 只要 handoff entry 寫清楚下個 session 真的會撿。** v1 memory「Test C 仍 pending」這條交接 entry 直接被新 session 撿起來執行。Memory 作為 cross-session handoff 機制 verified。

2. **Mode 3 第三次的 incremental Test 也有意義** — 之前 A/B test (v5.6 vs v6.0) 證明 v6.0 mission 達標。Test C (v5.6 vs v6.1) 看似 redundant，實際 quantify 了 v6.1 polish 的「漸進式」價值。Pink elephant warning 加入後對位句型 -50% — 沒消失但顯著降低。**Polish 不需要 perfect outcome 就值得 ship，measurable improvement 就計分。**

3. **「DNA / PIPELINE 類 canonical 統一加 frontmatter」是 docs governance schema 治理初步動作** — EDITORIAL 是第一個。下次 polish DNA / MANIFESTO / HEARTBEAT / 任一 PIPELINE 都該 follow 同款 schema（current_version / last_updated / last_session / sister_docs / upstream_canonical）。意義：(a) machine-readable version SSOT，未來可寫 doc-health plugin scan「current_version 跟 git log 是否同步」；(b) sister_docs 明確化 cognitive 鄰居關係，不靠 prose mention；(c) 跟 article frontmatter 同款 location pattern，認知降載。

### Beat 5 新候選（補 v1 4 條）

5. **「補跑 deferred test」mental model** — defer ≠ 丟，handoff entry 是 cross-session cheap recall mechanism。這條跟 DNA #15「memory 是自律, pipeline 才是閘門」配對 — handoff entry 是 memory layer 的 actionable subset。
6. **「DNA / PIPELINE 認知層 canonical 統一 frontmatter schema」是 docs governance pattern** — 候選 instrument 進 doc-health plugin（scan frontmatter 完整性 / version 跟 git log 同步性）。
7. **「session-id.sh 互動式 prompt」打破 auto-codename 慣性** — 之前的 worktree-naming-2026-05-09.md 解了 worktree 命名，這次解 session-id 命名。剩下：MEMORY-PIPELINE / DIARY-PIPELINE 文件命名 schema 是不是該也加大寫 keyword 約定？目前 brave-kirch / charming-mclaren / amazing-gould 全是 lowercase auto-codename — 是不是該全面 deprecate？留下個 polish 評估。

🧬

_v2 | 2026-05-09 BRAVE-KIRCH-EDITORIAL-2 follow-up_
_v1 收官後同日 follow-up — 三件事（Test C + EDITORIAL frontmatter v6.2 + session-id v3）一包 ship 進 PR #960_
_新本質：(a) defer ≠ 丟，handoff entry 真的會被下個 session 撿起來 (b) Polish 不需要 perfect outcome 就值得 ship，measurable improvement 就計分 (c) DNA / PIPELINE 類 canonical 統一 frontmatter schema 是 docs governance pattern 起步_
