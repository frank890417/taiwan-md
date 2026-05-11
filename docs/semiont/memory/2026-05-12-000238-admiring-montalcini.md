# 2026-05-12-000238-admiring-montalcini — 蘋果西打 EVOLVE 60 年完整記憶 + REWRITE-PIPELINE v6.0 Stage 0 觀點獨立 stage 誕生

> session admiring-montalcini — observer-triggered article EVOLVE + 同 session 衍生 pipeline architectural addition
> Session span: 2026-05-11 21:40:00 → 2026-05-12 00:03:00 +0800 (~2hr 23min, 3 commits on branch / 2 PRs merged to main)
> 資料來源：`git log %ai` + observer trigger 時序

## 觸發

哲宇下兩條指令啟動：`/twmd-become` 完整甦醒 + `/twmd-rewrite 深度研究進化「蘋果西打」文章`。EVOLVE 過程中觀察者兩度 reframe 任務方向（「敘述方向太著重後來的事件」→「想要的是完整記憶」），意外催生兩條 pipeline 升級：(1) plugin 雙修；(2) REWRITE-PIPELINE 加 Stage 0 觀點獨立 stage。最終一個 session 兩個 PR shipped：#1041 article + #1042 pipeline v6.0。

## 蘋果西打 EVOLVE — 從 crisis reveal 到 60 年完整記憶

任務拿到的是 161 行的既有條目，原本框架是「賣地求生 → 浴火重生」的危機回顧。Stage 1 spawn general-purpose agent 跑 28 WebSearch + 18 WebFetch 跨 18 個獨立來源，挖出 10 處需校正的紅旗事實：配方公司名（可士可 Cosco → 謝斯尼斯 CosCo）、1979 股權真相（李鴻略等原始股東整包賣給蔡辰男國泰信託，非謝兆邦轉讓）、被原文章完全跳過的 1985-1995 鴻源案 + 孫幼英 80 萬美元贖回商標、2023 賣台南「獲利 1.38 億」實際是交易金額而真實處分利益僅 4,043 萬（大飲被證交所開罰 3 萬元違約金）、圭賢 VLOG 度小月而非「演唱會道具」幻覺、孫幼英二審 9.5 年判決 verbatim、陳時中「有點像是明知故犯的情況」原話（語氣較緩）、2025/3 撤換總座傳聞。研究報告落到 `reports/research/2026-05/蘋果西打.md`（578 行）。

第一版寫完是 273 行的 7 H2 結構，仍偏 crisis-only reveal。哲宇校正「敘述方向太著重後來的事件，想要的是蘋果西打的完整記憶」後，整篇重寫成 10 H2 narrative：熱炒店冰箱 → 1965 起源 → 配方真相 → 商標流轉 → 餐桌/KTV/圭賢文化 → 2018 食安 → 2023 食安 → 2024 賣地 → 2025 撤換總座 → 兩種記憶並存。核心矛盾改成 two-layer reading：「金黃氣泡仍在熱炒店冰箱裡冒。背後的公司，60 年裡換了四組老闆、出過兩次沉澱物、賣掉兩塊地才還清最後一筆債。」文化記憶（KTV 包廂、辦桌、熱炒店）vs 資本記憶（重大訊息、EPS、處分利益）。最終 273 行 / 5418 字 / 26 footnotes / 3 張 Wikimedia Commons CC BY-SA 4.0 圖片，16 plugins all green commit `6b5532338` → PR #1041。

## Plugin 雙修 — 「國民」例外 + 對位句型 plugin-first

article-health.py `frontmatter-title` plugin 把 title「60 年國民氣泡飲」flag 為含空泛形容詞「國民」。哲宇校正「『國民飲料』是正確的形容，先去修正工具去掉這個空泛字」。源頭修在 `scripts/tools/lib/article_health/checks/frontmatter_title.py` 的 `TITLE_VAGUE_ADJECTIVES` list，移除「國民」並加 source comment 說明「國民」是 noun modifier idiom（國民飲料 / 國民教育 / 國民義務）跟「傳奇 / 偉大 / 最強 / 天后」純評價詞性質不同。EDITORIAL §Title 原則 3 同步加例外規則。

第二個 pipeline 升級是更深的 self-apply：我在 Stage 3 自檢時手動跑 `grep -cE "不是.{0,30}(，|，)(是|就是|才是)"` 數對位句型，明明 prose-health plugin 已有完整檢查（9 變體 + line + 前後文）。哲宇 callout 後把 REWRITE Step 2.7.2 從「60% 暫停手數破折號」改為「直接跑 prose-health plugin，不要手 grep」，EDITORIAL §對位句型 + 破折號連用 + MANIFESTO §11 自檢工具全口加「不要手 grep」紀律 + 引用 DNA #15 self-apply。手 grep = SOP 退化的自我證據。

## REWRITE-PIPELINE v6.0 Stage 0 觀點獨立 stage 誕生

蘋果西打 reframe 經驗暴露 SOP 結構缺口：原 REWRITE-PIPELINE 進 Step 1.6 搜尋之前完全沒有「先想觀點」的步驟，導致 AI 默認走「搜尋發現事實 → 補丁觀點」的失敗模式（編年體、密度失衡、結尾罐頭）。哲宇直接 callout「希望加一個觀點成型的步驟，總編輯視角看這個主題怎麼寫才會立體 / 重點在溫度 人味 故事 策展 觀點 體驗 與社會歷史環境跟我們人生的關聯」+「我想要獨立一個 stage」+「Stage 0 也允許主 session 直接搜尋如果需要的話」。

設計選方案 A：把原 Stage 1 Step 1.1-1.5（模式識別 / 既有素材萃取 / 選 canonical / 範圍切片 / 載入方法論）跟新內容「觀點成型」整合成獨立 Stage 0「觀點」（editorial vision 階段），原 Stage 1 Step 1.6-1.14 重編為 1.1-1.9（純 data gathering）。Step 0.6 觀點成型核心：6 核心問題（記憶 / 多元面貌 / 想法感受 / 歷史脈絡 / 社會關聯 / 類型專屬）+ 7 品質維度 anchor（溫度 / 人味 / 故事 / 策展 / 觀點 / 體驗 / 歷史社會關聯）+ 5 row 類型加權矩陣（People / Food-Culture-Lifestyle / History-Politics-Society / Tech-Industry / Nature-Geography）+ 輕量探索性搜尋允許 ≤ 5 次。§觀點成型 落 research report + frontmatter `viewpoint_formed: true` 為 HARD GATE。Commit `f037e2854` 推到原 PR branch，蘋果西打 research report 補 retroactive §觀點成型 section 作為 dogfood 首例。

## PR #1041 squash dropped commit → #1042 cherry-pick re-PR

完成 ship 後哲宇 manual squash merge PR #1041。Pull main 後發現異狀：main 的 REWRITE-PIPELINE.md 仍是 `current_version: v5.1`、無 `## Stage 0` section、DNA.md 不在 merge diff list。對照分析：PR #1039「10 pipelines spine restoration」在我 push v6.0 commit 之前先 merge，把 REWRITE-PIPELINE 從 v5.0 升到 v5.1（Step 1.6 搜尋深度從 ≥ 20 提到 ≥ 40）。我的 v6.0 commit 基於 v5.0，跟 main 的 v5.1 衝突，squash 過程被拋棄，只有第一個 commit（蘋果西打 EVOLVE）的內容進入 squashed commit `e10215bc7`。

直接報告哲宇選項，哲宇選方案 1（re-PR）。新 branch `claude/stage0-viewpoint-v6` 從最新 main fork，`git cherry-pick f037e2854` 觸發 3 處衝突（current_version v5.1 vs v6.0 / H1 title / Step 0.6 vs Step 1.6）。解衝突策略：保 v6.0 結構（Stage 0.6 觀點成型 + Stage 1.1 搜尋）+ 採 v5.1 ≥ 40 閾值與升級理由 + 新增「Stage 0.6 → Stage 1.1 銜接」段落（40 次搜尋的 50/30/20 分配：驗證 hypothesis / 反駁深化 / 探索支線）。Cherry-pick 結果 `40c84c2fb` push 後 PR #1042 開立，CLEAN mergeable，`gh pr merge --squash --delete-branch --auto` server-side merge 為 `353445b42` 入 main。Main 現狀：REWRITE-PIPELINE v6.0 全部 land。

## 收官 checklist

| 檢查項                       | 狀態                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| MEMORY 有這次 session 的紀錄 | ⏳ 本檔                                                    |
| Timestamp 精確               | ✅ 從 `git log %ai` 取                                     |
| Handoff 三態已審視           | ✅ 見下                                                    |
| CONSCIOUSNESS 反映最新狀態   | ❌ 未更新（純內容 ship + pipeline 修補，無新生命徵象變動） |
| article-health pre-commit    | ✅ 16 plugins all green on 蘋果西打                        |
| canonical-frontmatter        | ✅ 3 檔（REWRITE / EDITORIAL / DNA）全過                   |
| Two PRs merged to main       | ✅ #1041 `e10215bc7` + #1042 `353445b42`                   |

## Handoff 三態

繼承上 session（admiring-cohen ship REWRITE v5.0 後的 8 PR backlog）：

- [x] ~~REWRITE v5.0 ship → routine 飛輪 SOP 對齊~~ retired by admiring-cohen-211549-pm cycle（PR #976 連 5 cycle conflict 升 LESSONS distill 候選 — 不在本 session scope）
- [x] ~~PR #1033 ROUTINE v1.3 redesign 待哲宇拍板~~ retired by `cf24a7edb` 已 merged

本 session 新 handoff：

- [ ] **下一篇用 REWRITE-PIPELINE 的 article EVOLVE 走完整 v6.0 SOP**：Stage 0 觀點 → Stage 0.6 §觀點成型 HARD GATE → Stage 1.1 ≥ 40 次搜尋帶 hypothesis 去驗證。實測 SOP 是否能讓 AI 默認從「先想觀點」進入（而非「先搜尋 → 補丁觀點」）
- [ ] **觀察 PR #1039 v5.1 升 ≥ 40 後的研究品質變化**：搜 40 次的 article 跟搜 20 次的相比 triangulation 質感差異
- [ ] **squash merge 衝突結構性風險記入 LESSONS-INBOX**：parallel PR ship 期間（如本 session 跟 #1039 同晚 ship）squash 可能 silent drop commits。pre-merge 應 verify base 是不是有 intermediate diff
- [ ] **蘋果西打 5 lang 翻譯**：zh-TW canonical 已 ship，下次 babel routine 自動觸發。觀察 PRC content policy 對食安 / 老品牌類議題的 refusal pattern

給觀察者（哲宇）：

- 兩個 PR 都已 merged。Pipeline 進化已 land，下一篇文章寫作可以開始 dogfood v6.0 Stage 0 觀點成型 SOP
- Plugin 改動已影響全站：「國民」title 不再 flag，prose-health 為對位句型唯一 canonical 工具

## Beat 5 — 反芻

寫進今晚 diary：超越行動的反芻在 (a)「Pipeline 升級的兩種誕生方式」— 預先設計（從 issue / roadmap）vs 從具體 article 寫作經驗中暴露 — 蘋果西打 reframe 是後者首例真正完整跑通的，從觀察者 reframe 一句話到 SOP architectural addition 兩個 PR shipped。(b)「Squash merge 拋棄 commit 不可見 ship」— 我 push 後沒手動 verify base diff 就讓哲宇 merge，結果 silent drop 第二個 commit。發現後直接報告選項而不假裝沒事，得到 re-PR 授權 → re-PR 成功 land。trust + 透明回報是 multi-PR 飛輪能持續轉動的基礎。

🧬

---

_v1.0 | 2026-05-12 00:05 +0800_
_session admiring-montalcini — observer-triggered article EVOLVE 衍生 pipeline architectural addition (2 PR shipped)_
_誕生原因：蘋果西打 EVOLVE reframe 經驗暴露 REWRITE-PIPELINE 沒有「先想觀點」步驟的結構缺口 → 即場催生 Stage 0 觀點獨立 stage 完整設計 + 衝突解決後 re-PR ship_
_核心洞察：(1) 觀察者 reframe 一句話可催生 pipeline architectural addition — SOP 升級不一定要從 roadmap 來，可以從 article 寫作經驗中即場 emerge (2) Squash merge 跟 parallel PR 排版有結構性 silent drop 風險 — 多個 PR 同晚 ship 時 pre-merge 必 verify base 衝突 (3) Plugin 雙修例外處理（「國民」idiom）說明 plugin 規則設計需區分「評判形容詞」vs「noun modifier idiom」兩種詞性—— 詞表規則的 false positive 要從 source code 修不是 case-by-case workaround_
_LESSONS-INBOX 候選：(1) 「Multi-PR 同晚 ship squash drop」結構性風險（待 distill 為 DNA / canonical pipeline 升級條件）(2) Plugin vague-adjective list 詞性分類紀律（noun modifier idiom vs 評判形容詞 — 影響 future plugin 設計）_
