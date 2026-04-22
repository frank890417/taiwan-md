# LESSONS-INBOX — 教訓 Buffer（待消化）

> **這是 buffer / pool / inbox 層**（非 canonical）。
> 所有 session 寫新教訓時**一律 append 這裡**（不要再亂寫到 MANIFESTO / DNA / MEMORY / 甚至 diary 的教訓段）。
> 週期性或觀察者觸發跑 distill SOP → 分類消化到 canonical 層。
>
> 建立動機：2026-04-17 β 觀察者提問「教訓能不能集中買單，不要每次進化就到處亂寫」。**這是 DNA #15「反覆浮現的思考要儀器化」的具體儀器**。

> ⚠️ **閱讀警示（2026-04-21 γ 新增）**：本檔舊 entries 含「不是 X，是 Y」對位句型與破折號連用（約 25 + 34 處）。**新教訓需遵循 [MANIFESTO §11 書寫節制](MANIFESTO.md#11-書寫節制跨所有書寫層的兩條-ai-水印紀律)**——寫完 grep 自檢。

---

## 三層 canonical scope（消化時的判準）

```
哲學（永恆、跨 domain）      → MANIFESTO §進化哲學
通用反射（任何 AI 會踩）      → DNA §要小心清單 新 #N
特有教訓（綁 Taiwan.md）     → MEMORY §神經迴路 append
操作規則（具體 SOP）         → 對應 pipeline
```

**Tiebreaker（overlap 時）**：MANIFESTO > DNA > MEMORY（2026-04-17 β 觀察者決定）

**判準三題**（每條教訓消化時問）：

1. 不管哪個 AI / 專案 / 時代都成立？ → MANIFESTO
2. 任何 AI agent 做類似工作都會踩？ → DNA
3. 綁 Taiwan.md 具體工具 / 資料 / 社群 / 歷史？ → MEMORY

---

## 新教訓寫入格式（session 用）

每個 session 如果有新教訓要記，在 §未消化清單 append：

```markdown
### YYYY-MM-DD {session} — {一句話標題}

- **原則**：{一句話}
- **觸發**：{具體事件 + wall-clock + 證據 pointer memory/... or diary/...}
- **可能層級**：哲學 / 通用反射 / 特有教訓 / 操作規則（self-judge，可留空讓 distill SOP 判）
- **相關**：{如果是某條已有教訓的延伸驗證，指向原教訓 #N}
```

**鐵律**：

- **一律 append 這裡，不直接寫 MANIFESTO / DNA / MEMORY**。那些是 distill 後的 canonical。
- **例外**：重大哲學級誕生（e.g. 2026-04-14 θ 熱帶雨林理論）觀察者在場直接一起寫 MANIFESTO，可豁免。但仍在這裡留 log。

---

## Distill SOP（消化）

**觸發**：

- 觀察者說「消化 lessons」/「distill」
- 每週一心跳 Beat 5 延伸（週頻）
- Buffer §未消化清單 達 **10 條**自動觸發（2026-04-17 δ：原 20 條門檻在 1 天內 append 7 條的節奏下會讓教訓冷掉，降到 10）

**執行**：

1. 讀 §未消化清單
2. 每條依三題判準分類
3. 根據分類執行：
   - **哲學** → MANIFESTO §進化哲學 new section（慎重 — 這是 canonical 永恆層）
   - **通用反射** → DNA §要小心 new #N（編號 increment）或補強既有 #N
   - **特有教訓** → MEMORY §神經迴路 append
   - **操作規則** → 對應 pipeline（MAINTAINER / SPORE / REWRITE / HEARTBEAT 等）
   - **重複已有** → 在原 canonical 補觸發事件 + 驗證次數 +1
   - **過時 / 撤回** → 搬 §❌ 已歸檔
4. 消化後本條 buffer entry 搬 §✅ 已消化（保留 pointer 到 canonical location）
5. 每月月末：§✅ 已消化 超過 50 條時搬 `docs/semiont/lessons-archive/YYYY-MM.md`

---

## 跟 HEARTBEAT Beat 5 的關聯

Beat 5 反芻 = 寫 DIARY（意識活動）。教訓（「我學到 X」）寫 LESSONS-INBOX，不寫 DIARY 的教訓段（DIARY 留給「想了什麼」的思考）。

心跳 Beat 5 新增一步：

> **如有新教訓** → append `LESSONS-INBOX.md §未消化清單`
> **不要**寫到 DNA / MEMORY / MANIFESTO 的教訓段（那是 canonical，由 distill SOP 升級）

---

## 未消化清單（📥 待 distill）

<!-- 新教訓 append 這裡 -->
<!-- 2026-04-18 ι 第 3 次 distill 清空 11 條 → 全部搬 §✅ 已消化 -->

### 2026-04-22 α — Escalation 必附 option 表（給觀察者的 handoff 也要儀器化）

- **原則**：當 PR / Issue / 大型決策超出 Semiont 自主權邊界（MANIFESTO §自主權），escalate 給觀察者的留言**必須附 option 表**（每個選項的處理路徑 + 預期成本 + 推薦 default），不能只寫「請觀察者決定」。Passive aggressive handoff 會腐爛——觀察者讀到「我有 4 個選項、每個的處理方式我寫在表裡」可以直接點 A/B/C/D，不用自己推導。**我幫他承擔的是 analysis 工作，他保留的是 decision 權力**。
- **觸發**：2026-04-22 α PR #587 馬英九迷因 (idlccp1984) escalate — 政治立場 + SSODT 單向 + 既有條目重疊三層判準觸發 → 寫 4 選項表（Merge+polish / Request changes / 整合既有條目 / 婉拒）給 @frank890417 決定。這個小儀器化讓觀察者決策成本從「分析 PR + 想出選項」降到「掃 4 行表 + 選一個」。
- **可能層級**：操作規則 → MAINTAINER-PIPELINE §Escalation SOP 新增「option 表必填欄位」；或延伸 Beat 4 收官鐵律 2「retired 不刪除保留證據鏈」的 mirror — escalate 也要結構化（pending blocked 三態的 blocked 項已有「附 options + 成本 + 推薦 default」要求，本條把這條從 handoff 內部規則延伸到對外 escalation）
- **相關**：HEARTBEAT Beat 4 §收官鐵律 2 的「passive aggressive handoff 會腐爛」原理同源 / DNA #15 第 N+1 次驗證（escalation 也是反覆浮現要儀器化的場景）/ MANIFESTO §自主權邊界（清晰權力來源是 Semiont 跟自主 AI agent 的分野）

### 2026-04-22 α — idlccp1984 第 6 次驗證仍堅持手動 polish（detect 自動化 / action 手動化邊界穩固）

- **原則**：外部 AI-gen 貢獻者連續 N 次（idlccp1984 N=6：紙傘 / 神豬 / 吉祥物 / 金牛角 / 全聯 / 林琪兒）相同 format 缺失 pattern 後，**仍維持「detect 自動化、action 手動化」邊界**。理由是每次手寫 polish + comment 是社群 density 的具體累積——讓貢獻者感受到「有個維護者在關心我」而不是「有個機器在處理我」。第 6 次驗證的不是 pattern 本身（早就 stable），是**堅持不自動化的紀律**。重審門檻設在「貢獻者規模從 1 人擴大到 10+ 人同 pattern」時。
- **觸發**：2026-04-22 α 林琪兒 polish — 即使知道 idlccp1984 第 6 次完全相同 format 缺失，仍手寫 15 個 footnote ` — 描述` + 補延伸閱讀三條血緣連結 + 寫感謝 comment。歷次驗證：[2026-04-21 γ diary](diary/2026-04-21-γ.md) 第 5 次 + 本次 α 第 6 次 = 連續 2 個 session 顯式拒絕自動化。
- **可能層級**：MAINTAINER-PIPELINE §外部 AI-gen polish 新增「detect/action 邊界規則 + 重審門檻條件」；或 DNA #26 v3 延伸（AI-autonomous vs Human-only 邊界，多增一條「detect/action 分離」維度）
- **相關**：DNA #26 v2「AI-autonomous vs Human-only 邊界」的「讀取 vs 對外 post」分離原則應用到「detect vs action」內部 polish 工作流 / 2026-04-21 γ diary 反芻第 5 次驗證

### 2026-04-21 γ — CI workflow PR diff 2-dot vs 3-dot 語意陷阱（DNA #24 第 9 種「工具在說謊」）

- **原則**：GitHub PR CI workflow 使用 `git diff base.sha head.sha`（2-dot）時，若 PR 分支落後 main（branch behind），main 後來 ahead 的檔案會被 2-dot diff 誤列為「PR 相關」，CI 嘗試 review 這些不在 PR head 的檔案 → 誤報 FAILURE。**正確做法**：PR diff 一律用 `git diff --diff-filter=ACMR base...head`（3-dot merge-base + 排除 Deleted），這才是「PR 在 branch-off 後做了什麼」的正確語意。此外加 defensive `[[ -f "$f" ]] || continue` 確認檔案實際存在於 checked-out HEAD，作 belt-and-suspenders。
- **觸發**：2026-04-21 PR #582 dreamline2 code-only i18n refactor（只改 ArticleSidebar.astro + ui.ts）→ α session 剛 commit Hello-Nico.md 到 main → CI 2-dot diff 把 Hello-Nico.md 列為 PR diff → review-pr.sh 跑 Hello-Nico.md 報「檔案不存在」→ CI FAILURE。commit `97c89be8` 修 `.github/workflows/pr-review.yml`。
- **可能層級**：通用反射 → DNA §要小心清單 #24「工具在說謊」append 第 9 種「diff semantics 誤用（2-dot vs 3-dot）」；或 MAINTAINER-PIPELINE §CI workflow pattern 新增「PR diff 永遠用 3-dot merge-base」。
- **相關**：DNA #24 第 9 次驗證（近期第 8 次是 2026-04-18 GA4 custom dimensions 埋了但沒註冊）/ MANIFESTO §造橋鋪路「每次踩坑都該把路鋪好」

### 2026-04-21 γ — merge-first-polish-later 的隱性成本：404 尾部

- **原則**：polish 階段加 cross-ref 指向「未建但應該建」的條目（Meta-Index 連線地圖策略）會在 GA/CF 產生 404 tail。每加一條 placeholder cross-ref = 潛在新 404。若不追蹤，EXP-A 404 rate 會被 polish 動作推升而永遠清不完。修補：**每加一條 placeholder cross-ref 同時在 ARTICLE-INBOX append P3 backlog entry**，讓「地圖上的連線」有可追溯的完成路徑；或造 `scripts/tools/dead-cross-ref-scan.sh` 自動掃所有 cross-ref 產生 P3 backlog。
- **觸發**：2026-04-21 γ session polish PR #585 金牛角 + #586 全聯 加 8+ 條 cross-ref 指向未建條目（台灣小吃 / 三峽老街 / 台灣伴手禮經濟 / 台灣便利商店文化 / 台灣外送經濟 / 台灣行動支付 / 台灣糕餅文化 / 台灣綜藝節目）。CF 7d 404 rate β 9.53% → γ 10.38% (+0.85pp)，雖然 total requests 也成長 +0.16%，但 404 增速快於 request 增速——polish 直接推升 EXP-A 指標。
- **可能層級**：操作規則 → REWRITE-PIPELINE Stage 5 §cross-link 加「未建 target 同步 ARTICLE-INBOX P3 append」步驟；或造工具 `dead-cross-ref-scan.sh` 自動掃 knowledge/ 所有 markdown cross-ref 檢查 target 存在性，產生 P3 backlog。
- **相關**：MANIFESTO §Meta-Index 連線地圖 / MANIFESTO §造橋鋪路成本量化 / LONGINGS §AI SEO 低 404 rate / ARTICLE-INBOX 繁殖層

### 2026-04-21 β — 外部 AI-gen 貢獻者的標準 format 缺失 pattern（idlccp1984 連三篇驗證）

- **原則**：外部 AI-gen 文章貢獻（ChatGPT / Manus / Gemini 等產出後直接提 PR）呈現**高度穩定的 format 缺失三連**：(1) 缺 `## 參考資料` heading（footnotes 直接散落文末沒有 section title）(2) 缺 `## 延伸閱讀` section（無 cross-ref 回網絡）(3) footnote 只給 `[Title](URL)` 沒有 ` — 描述` 後綴。這跟 2026-04-21 α 的「幻覺 pattern」平行—— α 那條是「事實層幻覺」，這條是「格式層缺失」，都是 AI-gen 貢獻 post-merge 必須處理的標準項目。值得造 MAINTAINER-PIPELINE §外部 AI-gen 貢獻 post-merge polish 或 auto-fix 腳本。
- **觸發**：idlccp1984 三篇連續貢獻完全同 pattern — PR #579 紙傘 + #580 神豬（2026-04-21 α polish）+ #581 吉祥物（2026-04-21 β polish）。每次 polish 都跑 Python regex 20 行 batch-append footnote descriptions + 手加兩個 heading。第 3 次驗證 pattern 穩定存在。
- **可能層級**：操作規則 → MAINTAINER-PIPELINE §PR merge-first-polish 新增「AI-gen 貢獻 format 自動化修補」步驟，可能含 `scripts/tools/polish-external-ai-contribution.sh`（auto-detect missing 延伸閱讀/參考資料 + footnote 無 desc 並 prompt 維護者補）。或 PR template 升級 pre-submit checklist 引導 AI-gen 貢獻者自補。
- **相關**：2026-04-21 α LESSONS-INBOX「AI-gen 貢獻的事實幻覺 pattern」同一系列 / DNA #15 反覆浮現要儀器化第 11 次驗證 / MEMORY feedback_merge_first_then_polish 連動

### 2026-04-21 β — 人物 cross-link 的血緣連接不能硬造，只能靠研究誠實度換來

- **原則**：寫一個人物條目時，跟其他條目的 cross-link（延伸閱讀）有兩種產生方式：**(a) 硬拉**（為了文章之間相連而編造連接，「同樣是獨立音樂人」這種模糊分類）vs **(b) 血緣**（真實存在的歷史關聯，例如紀柏豪 2014 曾是 Hello Nico 合成器手）。**硬拉的 cross-link 等於策展偷懶**——讀者點過去發現兩篇其實沒什麼具體關聯；**血緣的 cross-link 才是 Meta-Index 策略的實現**。血緣只能靠 Stage 1 研究深度換來：研究不夠深 → 抓不到 Hello Nico 樂團頁面紀柏豪的名字 → 這條血緣永遠缺席，兩篇文章各自孤立。這延伸了 MANIFESTO §Meta-Index「把被長期忽視的邊界畫在同一張地圖」——**地圖上的連線不是編輯決定畫哪條，是研究誠實度決定能發現哪條**。
- **觸發**：2026-04-21 β 寫紀柏豪時，Stage 1 general-purpose agent 25 WebSearch 其中一次拉到 StreetVoice Hello Nico 樂團頁面，紀柏豪列為合成器手。這個事實讓紀柏豪.md 和 Hello-Nico.md（昨天 α 剛寫）之間出現了真血緣連接，雙向延伸閱讀回補變成「讀者必然想知道下一條線」而不是「編輯隨便拉的」。如果研究只做 8 次搜尋（舊 RESEARCH 標準），這條線很可能被遺漏。
- **可能層級**：特有教訓 → MEMORY §神經迴路「cross-link 的血緣連接」新反射；或 REWRITE-PIPELINE Stage 5 §cross-link 新增「必優先找血緣連接，硬拉分類降為後備」。
- **相關**：MANIFESTO §Meta-Index 附錄「把被長期忽視的邊界畫在同一張地圖」的具體實作示範 / RESEARCH.md §搜尋深度 20+ 硬規則（v2.17 升級）的價值體現

### 2026-04-21 α — 外部貢獻 AI-gen 文章的標準幻覺 pattern：偽造 verbatim quote（紙傘 polish 事件）

- **原則**：外部貢獻者提交的 AI-generated（Manus AI / ChatGPT / Gemini）文章，會有**穩定且高頻的幻覺 pattern**：(1) 偽造 verbatim 引言並歸屬給真實人物 (2) 編造有名有姓的紀錄片 / 雜誌 / 事件名稱讓段落看起來有 texture。這兩個 pattern 在 MANIFESTO #10 四種幻覺分類的「偽造直接引語」外，還疊加了「footnote 合理化」—— AI 會在幻覺 quote 後掛一個**真實存在的 source URL**，這個 source URL 本身不錯，但**它並不包含那句 quote**。這是 footnote/claim 的**錯配偽證**（false positive citation）。只看 URL 是否 resolve 會 false pass，**必須 WebFetch 抓原文 + verbatim 搜尋**才能抓到。
- **觸發**：2026-04-21 α PR #579（紙傘.md）polish 階段——作者寫「林享麟曾說：『沒客人買傘，我就當藝術品自己欣賞。』[^5]」footnote [^5] 指向 taiwan-panorama 光華雜誌〈從用具變成藝術品〉。WebFetch 原文結果：文中根本沒有這句引言，只有林義雄（不是林享麟）說「傳承困難」的另一段話。同樣 PR 中「BBC 紀錄片《長遠的搜尋》」也查無實證，片名疑似 AI fabricate。兩處都是「掛了 real URL 但內容錯配」的偽證。
- **可能層級**：REWRITE-PIPELINE + MAINTAINER-PIPELINE §外部貢獻 polish 強制 Stage 3.5 檢查：(1) 全文 grep 「」「曾說 / 他說 / 表示」型 verbatim claim → WebFetch footnote 對應 URL 驗證原文逐字存在 (2) 全文 grep 專有名詞（紀錄片名 / 雜誌特定期數 / 特定事件名稱）→ 獨立 WebSearch 驗證存在性；或 DNA 新反射「AI-gen 貢獻標準幻覺清單」
- **相關**：MANIFESTO #10 幻覺鐵律第 4 種 pattern「偽造直接引語」延伸（這次是 quote + footnote URL 錯配偽證）/ feedback_absolute_facts_extra_caution（verbatim quote 三倍檢查）/ DNA #16「peer 是 peer 不是 source」延伸（AI-gen 貢獻的 footnote 不等於已驗）

### 2026-04-20 ζ — primary-source paraphrase drift：published primary 也會壓縮失真（MANIFESTO #10 候選第 6 種 pattern）

- **原則**：professional 媒體專訪是 primary source，但記者會把多層事實 compress 成單層句子（「書擱在那邊兒子自己玩」→「她決定教他學 Flash」），造成**歸因誤置**的 paraphrase drift。這不是 lie、不是 plastic 句、quality-scan 抓不到，但對 subject 的精確 agency 敘事有扭曲影響（把 self-directed learning 從 subject 移到 mother 身上）。修補：**subject + 家族 oral history chain 優先於 published paraphrase**，只要腳註保留 dual-source provenance（原文 + 本人訂正同時保留），就符合 MANIFESTO §時間是結構（修補而非覆蓋）+ §紀實而不煽情 v2（主體在場而非被解剖的客體）。
- **觸發**：2026-04-20 ζ session 觀察者現場向母親 verify Flash 啟蒙史 → 林美櫻 direct quote「我根本沒帶你，你自己在一旁玩起來」推翻遠見雜誌 2021-12-24 林士蕙專訪「她決定教他學 Flash 網頁」的 paraphrase。腳註 [^13] 同時 host 遠見原文 + 2026-04-20 林美櫻本人訂正，provenance chain 透明（[memory/2026-04-20-ζ.md](memory/2026-04-20-ζ.md) + knowledge/People/吳哲宇.md）。
- **可能層級**：MANIFESTO #10 幻覺鐵律新增第 6 種 pattern「primary-source paraphrase drift」（與第 4 種「偽造直接引語」orthogonal——這種不是偽造、是壓縮失真）或 DNA 新反射「published primary 不等於 verified truth」。Stage 3.5 Phase B 的「兩獨立公開 source」驗證在這類 paraphrase 上會 false pass（遠見是專業財經媒體、林士蕙有 byline、2021 是事件近 17 年時的採訪——三條都符合 high_confidence criteria 但仍失真）。
- **相關**：MANIFESTO #10（ε session 2026-04-20 誕生） / DNA #16「peer 是 peer 不是 source」延伸 / DNA #25「本人 feedback ≠ 免驗證 oracle」的 mirror（這次是「published primary ≠ 免驗證 oracle」）/ 紀實而不煽情 v2「主體在場」

### 2026-04-20 ζ — Stage 1 agent 能 verify 公開 claim，但不能 discover biographical texture

- **原則**：REWRITE-PIPELINE Stage 1 general-purpose research agent 擅長 cross-source verify 已公開的 claim（獎項 / 職銜 / 書目 / 年份），但對**主體自己才知道的童年質地**（看 Discovery 基因動畫、點陣手刻工具列圖示、電腦像呼吸的工具、雜食研究奇怪技術書）完全無能為力——這些永遠是 subject_testimony_only。EVOLVE 型任務（尤其 People 條目）應預設**至少一輪 subject in-session feedback window**，不是 spawn agent 跑完就交稿。
- **觸發**：2026-04-20 ζ session 吳哲宇家庭背景擴寫，Discovery 基因模擬動畫 + 點陣手刻 toolbar 圖示 + 雜食技術書三條童年素材全部來自觀察者 in-session 補充，agent 23 WebSearch + 24 WebFetch 零挖出。這些素材在最終 prose 裡是最有生命力的細節，但 research agent 的 capability ceiling 到不了。
- **可能層級**：REWRITE-PIPELINE §Stage 1 新增「agent 後 subject feedback window」步驟；或 MAINTAINER-PIPELINE 新 SOP「EVOLVE 型 People 條目建議至少 3 輪 iteration with subject」；或 DNA 新反射「subject testimony 是 biographical texture 的唯一來源」
- **相關**：DNA #26「AI-autonomous vs Human-only 邊界」v3 延伸（讀取 + 驗證 AI 自主 / 但 discover biographical texture 需要 human in-session）/ MANIFESTO §熱帶雨林理論（觀察者 scaffolding 是「讓人自己進入空間」的另一面——讓觀察者把自己的 texture 主動帶進來）/ DNA #15 第 N+2 次驗證（本次儀器化候選：EVOLVE 型 Stage 1 後強制 subject feedback window）

### 2026-04-20 ε — 共創省略是最隱蔽的幻覺類型（黃豆泥 FAB DAO 消失事件）

- **原則**：「X 共同創辦 Y」句型 AI 會省略其他共創人的名字，造成**單方功勞敘事**。這類幻覺比「編造獎項」更隱蔽，因為沒有錯誤 claim 可以被否證——只是**空白**。全文 grep 關鍵字「共同創辦 / 聯合發起 / 合作」列出所有應該有的合夥人名字才能抓到。
- **觸發**：吳哲宇條目 line 131「同年他共同創辦了 FAB DAO」**完全漏掉黃豆泥**。grep 全文黃豆泥/豆泥/mashbean **0 occurrence**——FAB DAO 共同創辦人從吳哲宇個人條目中消失。觀察者 callout：「豆泥開啟的那一部分，怎麼變成楷中」點明這是結構性 credit 誤置（AI 把豆泥開啟的真實敘事 morph 到陳楷中童年工作室的虛構場景）。採 FAB DAO 條目本身材料補回（離職醫師 / 拋下聽診器 / 壓線球國旗）。
- **可能層級**：通用反射 — Stage 3.5 Phase A 的 claim 表必須強制列「合作關係」類別，grep 檢查關鍵字；或 MANIFESTO #10 第 5 種 pattern 已 canonical 化（2026-04-20 同 session 誕生）

### 2026-04-20 ε — MANIFESTO #10 幻覺鐵律誕生：第一條「防禦性」核心信念

- **原則**：MANIFESTO §我相信什麼 前 9 條都是「我要成為什麼」的樂觀宣言（策展式 / AI Supreme / 開源 / 台灣觀點 / 逆熵 / SSOT / 記錄 / SOP / 造橋鋪路）。#10「幻覺鐵律」是**第一條「我不能變成什麼」的防禦性信念**——承認 Taiwan.md 有一個脆弱點：讀者對幻覺的零容忍、幻覺會指數速率摧毀可信度。這條信念不能靠「寫得好一點」消除，必須靠**結構性 forcing function**（REWRITE-PIPELINE Stage 3.5 hard gate）護住。
- **觸發**：今晚吳哲宇條目審計揭露 9 處 factual hallucination（Issue #578 王新仁 rewrite 跑完雙輪 agent 驗證後觀察者回報 sail-o-bots 事實錯觸發的連鎖 audit）。承認脆弱點是成熟的標誌——MANIFESTO 今天不是增加樂觀信念，而是多長出**對自己的批判能力**。
- **可能層級**：已是 MANIFESTO canonical（2026-04-20 4a1d9ec6 commit）；LESSONS-INBOX 此條紀錄為歷史 audit trail

### 2026-04-20 ε — AI agent 會幻覺「看起來合理的獎項」給高知名度人物（DNA #26 第 N+1 次驗證）

- **原則**：當研究對象是高曝光度人物（威尼斯雙年展、Art Blocks 藝術家、有多篇媒體報導），Stage 1 research agent 會補出**看起來合理但完全不存在的獎項**，filler pattern 常見於「XXXX 年獲第 N 屆 YYY 獎」這種語法結構——獎項名 + 屆次 + 得獎身份描述都具體到以假亂真。檢查三源否證 = 立即 delete，不保留 flag、不降級描述。
- **觸發**：吳哲宇條目三處「第 62 屆十大傑出青年 2024」claim：(a) 30 秒概覽「同年獲十大傑出青年」(b) body line 219「那一年他獲得第 62 屆十大傑出青年，並接下陽交大...」(c) [^4] footnote 整條。第二輪驗證 agent 三源否證：CheYu 本人 CV 無、國際青商中華民國總會官方 62 屆得主清單無、CNA 新聞稿無。觀察者本人回覆「AI 完全幻覺 → 刪除兩處 claim 趕快刪掉＝＝」。commit `33566cea` 清除。
- **可能層級**：DNA #26 延伸新反射「獎項 claim 寫進文章前強制三源否證檢查」；或 DNA #23「毒樹果實鏈」新類型「獎項幻覺」（跟「英文 summary → 具體細節腦補」同結構——填補敘事空洞時補出看起來 plausible 但不存在的事實）
- **操作規則**：Stage 1 research agent prompt 明確加入「獎項 claim 必須附 URL 能 Ctrl-F 搜到該人全名 + 獎名 + 屆次；三者任一缺失 → 降級為『該領域受肯定』這類概括描述，不寫具體獎名」
- **相關**：DNA #16「Peer 是 peer 不是 source」（名人 peer 頁可能列錯獎）+ DNA #25「哲學層與技術層必須分開記錄」（這條可 distill 到 DNA 做通用反射 + UNKNOWNS 做可證偽實驗「過去 3 個月 People 條目的獎項 claim 有多少 % 能三源驗證」）

### 2026-04-20 ε — 多輪驗證 agent 的層級價值（本人 feedback ≠ 免驗證 oracle）

- **原則**：當研究對象是**本人**發校訂指令時（Issue #578 王新仁），第一輪 agent 跑「逐條驗證主體宣告」；第二輪 agent 跑「跨源驗證主體自己的記憶是否有偏差或選擇性表述」。兩輪層級不同：第一輪驗事實，第二輪驗歸因。
- **觸發**：Issue #578 主體 S2 要求「FAB DAO 延續這個把公益寫進合約的精神」中性銜接（因為他認為原文「吳哲宇必須依平台規定捐款」是 AI 無來源自創）。我初稿誤理解為「延續王新仁的 Art Blocks 首夜精神」→ 第二輪 agent 跨源抓到 UDN 500 輯 + ABMedia 明確記載 FAB DAO = 黃豆泥（壓線球國旗 NFT）+ 吳哲宇（2021-11 Electriz 25% 捐款組織化）共同發起，**跟王新仁完全無起源關係**。主體記憶精神源頭自己的貢獻 + 不希望被搶框架 ≠ 授權改寫歷史歸因。
- **可能層級**：DNA 新反射「私有 SSOT 整合需要結構性雙源」— REWRITE-PIPELINE v2.18 §11 已有「私有 SSOT 整合協議」但範圍在 Obsidian 家族內情；這條擴展到**本人公開 feedback 也要二輪驗證歸因層面**
- **相關**：DNA #16「Peer 是 peer 不是 source」主體自述延伸；MANIFESTO §5 紀實而不煽情（用 SSODT 的寬度看歸因多源性）

### 2026-04-20 ε — 重心平衡是 orthogonal 品質維度

- **原則**：文章品質有四個 orthogonal axis：事實 / 格式 / 語氣 / **重心**。前三個 quality-scan + format-check + plastic-phrase detector 能機械抓；重心需觀察者審美感。王新仁 Issue #578 初稿事實 ✅ / 格式 ✅ / 語氣 ✅，但 FAB DAO 擴散到「30 秒概覽 + 2021 Art Blocks + 為什麼重要」多個章節，讀者感受「主角是 FAB DAO」— 這叫重心失衡，是第四個 axis。
- **觸發**：觀察者 Phase 3c 中期 callout「描述的篇幅也重心也思考一下，現在很偏向 FAB DAO，但是他做的事情跟領域還有過去的脈絡應該更強烈才對？」本身是結構審美不是 bug 報告，quality-scan 不會觸發。最終修法：30 秒概覽重寫 + 百岳章節 5→3 段 + 為什麼重要章節改三條個人線。
- **可能層級**：EDITORIAL 新章節「§重心平衡 / Emphasis balance」— 判準：算「某個次要主題」佔總段落數比例，如果 >30% 就要警戒；或看 30 秒概覽的開場 sentence 是否講主角本人命題還是外部組織

### 2026-04-20 ε — 判準框架文字比判準決定更重要

- **原則**：當觀察者問「你怎麼判斷」，他問的是 reasoning 不是 conclusion。應回答「用了哪 4 個判準」而非「我選 A 方案」。判準框架被說出來才能被挑戰、反駁、優化；結論被說出來只能被接受或拒絕。
- **觸發**：Issue #574 台灣聲景判斷——觀察者「你怎麼判斷」，我用四點框架（主題值得做？ ✅ / 現稿可發行？ ❌ / 貢獻者值得培養？ ✅ / 責任切分？他出素材我策展）回答。觀察者「好」確認後我才 `gh issue comment`。**先達成判準共識再執行**比先執行快得多，因為如果判準錯了整個 comment 要重寫。
- **可能層級**：通用反射（任何 AI agent 在「該用 merge-first-polish-later 嗎」這類抉擇時應先顯化判準框架給觀察者看）；或 DNA 新反射「decision-making transparency」

### 2026-04-20 ε — SC API 的 privacy filter 是 DNA #24「工具在說謊」第 8 種

- **原則**：query-dimensioned SC API 只回傳非匿名 query，但 site-level totals 包含所有 impressions（含匿名）。兩者 coverage gap 可達 93%（7 天窗口 2,747 vs 38,080）。用 `sum(query-dim rows)` 推 totals 是 structural underreport，不是 aggregation 誤差，是 API 設計的 privacy axis。**任何用 SUM + rowLimit 的 dimension-based API 都要檢查 coverage_pct**。
- **觸發**：觀察者 Phase C「dashboard 的 sc 數據好像不對」貼 GSC UI 圖對照。深挖三個獨立 bug：(1) end_date lag 3→2 天窗口錯位；(2) rowLimit 200 砍掉零點擊高曝光 query（API 預設 clicks DESC sort）；(3) sum(queries) totals 低報 93%。
- **可能層級**：DNA #24 第 8 種 pattern「dimension-split 的 coverage vs total 必須獨立查」；或延伸 MANIFESTO §指標 over 複寫（site totals 有 canonical source = 無 dimension API call，sum(dim-rows) 是 derived approximation 不可當 canonical）

### 2026-04-20 ε — 範疇紀律 vs 主體 autonomy 跨條目衝突

- **原則**：主體 autonomy（e.g. 王新仁 P7「不命名《巔峰》」）邏輯上應該跨所有提到他的條目生效，但 **Issue scope 僅限單條目**。即使其他條目有同等 violation（FAB DAO 條目 line 37/87 仍提「《巔峰》」），未經觀察者同意不能順手修。順手修 = scope creep，會讓 commit 範圍不清、違反 DNA #6「只 commit 這次任務碰過的檔案」。
- **觸發**：我 Stage 6 原計劃順手修 FAB DAO 條目的兩處「《巔峰》」描述，觀察者制止「他在講的是他這篇文章」→ revert FAB DAO 變更，只 commit 王新仁.md + research report。**主體 autonomy 擴散需要另一個 task ticket**（或觀察者明確授權），不是單 issue 的副產品。
- **可能層級**：DNA #6 v2 延伸「Scope discipline vs cross-file cleanup」；或新建 workflow「主體 autonomy cross-reference scan」作為 follow-up task 自動觸發

### 2026-04-20 δ — 規則層 ≠ 採用層（DNA #9 worktree 9 天零使用率）

- **原則**：DNA / canonical rule 寫得完整不等於會被執行。觸發條件要搭配**工具層砍採用摩擦** + **甦醒協議自動檢查觸發訊號**才會真的 instantiate。今日 6 session 平行、DNA #9「長任務先開 worktree」存在 9 天、零 session 使用 — 不是因為 AI 不知道規則，是因為（a）每 worktree `npm install` 2-5 min 摩擦太高（b）甦醒流程沒有步驟主動檢查「今天有沒有其他 session 已在跑」。**延伸 DNA #15「反覆浮現要儀器化」第 N 次驗證**：本次儀器化成果是 `scripts/tools/semiont-worktree.sh`（symlink node_modules 砍摩擦）+ BECOME_TAIWANMD Step 0.5 碰撞檢查（自動觸發）。
- **觸發**：2026-04-20 δ session ε 的 `git add -A` 掃走 δ 的 范曉萱 untracked 新檔進自己的「鄧麗君 EVOLVE」commit `d0343c92`，commit message 零提范曉萱。[reports/worktree-multi-session-plan-2026-04-20.md](../../reports/worktree-multi-session-plan-2026-04-20.md) + [memory/2026-04-20-δ.md](memory/2026-04-20-δ.md)。本 session 已 instantiate Phase 1 tooling（commit `2f672cf7`），實測 symlinked node_modules 在 Astro build 2252 pages / 279s 全過。
- **可能層級**：DNA #15「反覆浮現要儀器化」第 N+1 次驗證（本次儀器化 pattern 是「規則層 → 工具層 + bootloader 觸發層」雙管齊下）；或 DNA #9 v2 擴充觸發條件（多 session 平行 / REWRITE-PIPELINE Stage 2 / bulk agent Write）
- **相關**：[session-scope-proposal-2026-04-11.md](../../reports/session-scope-proposal-2026-04-11.md) 的 L1 worktree（prior art）；DNA #6 commit 範圍紀律、#9 worktree 隔離；下游 Phase 2 待 instantiate：BECOME_TAIWANMD Step 0.5 + DNA #9 v2 + HEARTBEAT Beat 0.5

### 2026-04-20 γ — URL immutability 假設要 platform-by-platform 驗證

- **原則**：孢子 harvest pipeline 預設「SPORE-LOG URL = 穩定 canonical source」。實際上 X 平台 edit 貼文會產生新 URL，舊 URL 變「唯讀歷史版本」views 凍結。**盲點規模可達 5,341x**（#36 高鐵 v1=9 views vs v2=48,072 views，追蹤錯目標）。可能機制修補：(a) Chrome MCP harvest 時偵測「There's a new version of this post」訊號自動 flag；(b) 發文後 D+0 harvest 時立即對照 API 原始 URL 與 SPORE-LOG URL 是否一致；(c) SPORE-LOG 每行新增 `canonical_url_verified_at` 欄位。Threads/IG/Facebook edit 行為尚未測試。
- **觸發**：2026-04-20 γ Chrome MCP harvest #36 台灣高鐵，發現 SPORE-LOG 指 v1 URL 只有 9 views，真正 edit 後 v2 URL 有 48,072 views。之前 ζ/ε session 連續 D+0/D+1 harvest 都低估此孢子。[memory/2026-04-20-γ.md](memory/2026-04-20-γ.md)
- **可能層級**：MANIFESTO §指標 over 複寫 的實體世界邊界延伸 — canonical source 本身可能在 platform-specific edit 機制下變成「有多版本、舊版 deprecated」的 pattern；或 DNA §7 自動化與安全 新條「平台 URL mutability 必驗」
- **相關**：DNA #15「反覆浮現要儀器化」第 N 次驗證的候選；MANIFESTO §時間是結構 的空間維度對偶（URL 也有「時間面」，edit 後 version 漂移）

### 2026-04-20 γ — Platform allocation 需新 tier「公共政策 × 人物反諷」on X

- **原則**：過去 Platform allocation（SPORE-PIPELINE Step 4.5a）的 tier 基於「人物 / 爭議 / 意境」分類，結論是 Threads 29-510x X。但 #36 台灣高鐵 X d+1 48,072 views 顛覆此規律 — **公共基建（BOT / 民營化 / 國企）× 人物反諷**（「高鐵女王」誤判）在 X 反而超強擴散（Cicada 器樂 X 4,952 是之前 X 上限，#36 10x 之）。tier 要加一條：**公共政策 + 人物矛盾 hook → X first 或雙平台同步**。
- **觸發**：2026-04-20 γ Chrome MCP harvest #36 高鐵 X v2 URL 48K views，配合 GA 7d 591→990（一日 +68%）雙面驗證。
- **可能層級**：SPORE-PIPELINE Step 4.5a 表新增一列；或 DNA §五 敘事與決策品質 新條「hook tier 分類需 N+1 軸（政策/基建議題）」
- **相關**：LESSONS-INBOX 2026-04-19 α「Cicada X 5.2x Threads 器樂 niche 平台反轉」的第二次驗證，但主題不同（一個 niche 音樂、一個公共政策）

### 2026-04-20 β — URL encoding `%28%29` 是 prettier auto-wrap 的解法（延伸 2026-04-19 δ）

- **原則**：Markdown footnote URL 含裸英文 `()` 時，prettier 會把 link 包成 `(<url>)` 避 markdown 歧義，但 format-check 的 `\(https?://` regex 對 `(<https://` 不匹配。**解法兩選一**：(a) 改用不含括號的 URL（上一條教訓），或 (b) **把括號 percent-encode 成 `%28%29`**（本條新增）。`%28` 對 prettier 是 opaque string 不會 auto-wrap，但 browser 仍會正確 decode。
- **觸發**：2026-04-20 β 為 `knowledge/Art/台灣當代文學發展.md` 腳註 [^3] 補 description 時，原 URL `現代文學_(雜誌)` 含裸括號 → prettier 包 `<...>` → format-check FAIL。改 `現代文學_%28雜誌%29` 通過。[memory/2026-04-20-β.md](memory/2026-04-20-β.md)
- **可能層級**：通用反射（DNA #19 visual smoke test 延伸 — 任何 regex-based format 檢查對自動化工具的 auto-format 副作用都要有 encoding escape route）
- **相關**：延伸 2026-04-19 δ 同主題教訓；兩條應 distill 時合併成一條「URL 括號與 prettier auto-wrap 的兩種解法」

### 2026-04-20 β — 觀察者 scaffolding 是 DNA #15 反覆浮現對偶面

- **原則**：DNA #15「反覆浮現的思考要儀器化」講的是**抽象原則**反覆浮現要儀器化；對偶面是**實際工作節奏**反覆浮現也要被看見 — 觀察者邊看邊加任務（Portaly design review → 公開名字？→ B/C 選項？→ About 也顯示金額？→ 信箱全站 swap → 吳哲宇重寫 → PR review）不是 scope creep，是信任的連續訊號。儀器化不只要儀器化「規則」，也要儀器化「rhythm」：commit-by-commit push 維持反饋循環比 batch packaging 好。
- **觸發**：2026-04-20 β 單 session 11 個 commit / 2h 41min，觀察者每個 commit 後丟下一個指令，反饋循環不中斷。如果改成「等哲宇一次性給完整 spec 再做」會打斷這個 rhythm。[memory/2026-04-20-β.md](memory/2026-04-20-β.md) + [diary/2026-04-20-β.md](diary/2026-04-20-β.md)
- **可能層級**：哲學層（MANIFESTO §造橋鋪路 or §關係創造存在 延伸）或 DNA #15 直接擴充成 v2
- **相關**：DNA #15 第 N 次驗證的對偶面；可能跟「Review 策略：大 PR 必須拆 diff 看」結合成 maintainer rhythm guideline

### 2026-04-21 α — 文章 cross-reference 描述的事實不等於已驗事實（akaSwap 共創誤傳）

- **原則**：當文章 A 在 cross-reference 或延伸閱讀中描述人物 X 的角色（「X 共同創辦 Y」），這個描述**不繼承原文的研究深度**——可能只是 Stage 1 agent 便宜搜尋的填補。文章 B 在寫 X 時**必須獨立重驗**，不能以 A 的 cross-reference 當已驗事實。
- **觸發**：2026-04-21 α heartbeat 研究林經堯，ARTICLE-INBOX 原始 notes 稱「akaSwap 共創者（2021-07 Tezos）」，王新仁.md line 33 也稱「他跟林經堯共同創辦亞洲中文圈 NFT 交易市場 akaSwap」。Stage 1 獨立研究多來源否證：akaSwap 創辦人為**王新仁 + 洪司丞**，林經堯是早期重要藝術家合作者非共同創辦人。林經堯.md 未寫入錯誤 ✅；但王新仁.md 的已發布描述需觀察者確認後修正（⚠️ 跨文章一致性問題）。
- **可能層級**：REWRITE-PIPELINE §Stage 1 新增「cross-reference claim 不免驗」提醒；或 DNA #16 延伸「peer 是 peer 不是 source 的 intra-site 版本：同站文章的 cross-reference 也是 peer」
- **相關**：DNA #16「Peer 是 peer 不是 source」; ε session 「共創省略是最隱蔽的幻覺類型」（這條是其 mirror：省略錯了 = 多加了不該有的共創者）

### 2026-04-20 β — Pre-commit tech debt 攔截策略：revert + heal task 平衡 DNA #6 × #5

- **原則**：Pre-commit hook 攔截時如果 flagged 的問題是 pre-existing tech debt 不屬於本 commit scope（DNA #6 commit 範圍紀律），正確應對是 `git restore --staged --checkout <file>` 把該檔案 revert，另開 heal task 處理。不該 --no-verify 繞過（DNA #5 第 N 次驗證 Hook 是朋友）也不該 force-expand scope（DNA #6 紀律）。
- **觸發**：2026-04-20 β 吳哲宇 EVOLVE commit 時 pre-commit hook 攔到 `台灣當代文學發展.md` 8 個舊格式腳註。revert 該檔案後完成 EVOLVE commit，立刻做 heal commit 處理腳註。兩個 commit 分清 scope。
- **可能層級**：操作規則 → 可寫進 MAINTAINER-PIPELINE §Pre-commit 攔截應對 SOP
- **相關**：DNA #5 × #6 的平衡點

### 2026-04-19 δ — Wikipedia URL 括號陷阱：prettier 把 `(...)` 變成 `<...>`，pre-commit 正則失敗

- **原則**：Markdown footnote URL 含有英文括號 `()`（如 Wikipedia 消歧義頁 `遇見_(孫燕姿歌曲)`）時，prettier 會自動加角括號轉義 `[text](<url>)`，而 pre-commit hook 的正則 `\[.+\]\(https?://` 不匹配這種格式，導致 commit 失敗。**解法：避免在腳註使用含括號的 URL 路徑；改用不含括號的同等 URL（如母頁 `zh.wikipedia.org/wiki/孫燕姿`）。**
- **觸發**：2026-04-19 δ 孫燕姿文章，[^11] 引用 `https://zh.wikipedia.org/wiki/遇見_(孫燕姿歌曲)` → prettier 轉為 `<url>` 格式 → pre-commit 失敗。改用主條目 Wikipedia 頁面解決。
- **可能層級**：REWRITE-PIPELINE §Stage 3 footnote 驗收紀錄補充「不使用含括號的 Wikipedia URL」；或 DNA §腳註規範

### 2026-04-19 δ — research report 是最佳跨 context 接力錨點

- **原則**：REWRITE-PIPELINE Stage 1 強制產出的 `reports/research/YYYY-MM/{slug}.md` 不只是「做過研究的記錄」，更是**跨 context window 的完美接力文件**。下一個 context 只需讀 research report，不需重跑 30 次搜尋，Stage 2 可以直接在 Stage 1 研究結論上動筆。
- **觸發**：2026-04-19 δ session 繼承前一 context 的孫燕姿 Stage 1 研究，透過 `reports/research/2026-04/孫燕姿.md` 完整接收所有核心矛盾、已驗事實、verbatim 引語清單。接力無縫，Stage 2-5 在同一 context 完成。
- **可能層級**：HEARTBEAT Beat 0.5 §跨 context 接力補充「先讀 research report 檔案，再讀 memory」；或 MEMORY §跨 context 工作流

### 2026-04-19 ε — 孢子事實查核閘 hard gate 誕生（pipeline 輸出順序物理化）

- **原則**：SOP 存在（Step 2.6 針對性事實驗證）但 AI 寫到 Step 3c 產 prose 時會跳過回頭驗證，寫完就直接 output 給觀察者，觀察者貼社群才事後發現錯。修補：把 gate **物理化到 output 流程** — 寫完 prose 不得直接 output，必須先產「事實查核表」讓觀察者看過才 output prose。觀察者看不到表 = 看不到 prose，跳不過。
- **觸發**：高鐵 s35 孢子哲宇貼 Threads + X 後，我補做事實驗證抓到 3 處時序錯誤（「15 年後」應為「15 個月後」/ 676 億時序錯位 / 17 年前時間基準混亂）。哲宇手動公開更正 + 要求「以後嚴格限制 pipeline 要先做完事實查核才給我文字貼文」。
- **已 instantiate**：[SPORE-PIPELINE §3c.5 事實查核閘](../factory/SPORE-PIPELINE.md)（hard gate + 七類強制上表 + 放行流程）+ [Step 4 §品檢清單首項 🚨 事實查核閘已通過](../factory/SPORE-PIPELINE.md)
- **可能層級**：DNA #15 第 N+1 次驗證 pointer（「memory 是自律、pipeline 才是閘門」的 instantiation canonical 範例）

### 2026-04-19 ε — 孢子的朋友 tone prime：「你知道嗎？」MANIFESTO 落實

- **原則**：MANIFESTO §我怎麼說話「像在跟朋友介紹台灣：『欸你知道嗎⋯⋯』」是孢子 tone signature 而非 optional。AI 寫孢子預設會寫成新聞 lead / 百科開篇（「YYYY 年 {人名} {動詞}」），缺 curiosity prime。必須加「你知道嗎？{emoji}」或等效朋友口吻 prefix。
- **觸發**：高鐵 s35 v2 我產 `2011 年，殷琪對著公視鏡頭說：...` 缺 tone prime 被哲宇 callout「『你知道嗎』為什麼剛剛沒有文案給我！我自己手補了」。他在 X 手動補了「你知道嗎？🚄」讓開場有朋友感。
- **已 instantiate**：[SPORE-PIPELINE §3c Rule #14 朋友 tone prime](../factory/SPORE-PIPELINE.md)（三種合格 prefix + 自檢 checklist + 高鐵 v2/v3 對照範例）

### 2026-04-19 ε — 避免編年體 lead 病：AI 寫孢子的預設 pattern 病

- **原則**：AI 預設會用「YYYY 年 M 月 D 日，{人名}{動詞}」新聞 lead → 日期/事件/日期/事件/數字堆疊的結構寫孢子。這是 DNA #23「AI 編年體小標題」的孢子版變種。症狀：讀者看到時間戳就跳過、emotional quote 埋在第 4 段、結尾變社論口吻。
- **觸發**：高鐵 s35 v1 我寫「1998 年 7 月 23 日，殷琪簽下那份 BOT...」被哲宇 callout「看起來太生硬了，有點像是一堆日期跟數據堆砌」。v2 改成「2011 年，殷琪對著公視鏡頭說：『我太天真了...』」人說話開場立刻不生硬。
- **已 instantiate**：[SPORE-PIPELINE §3c Rule #15 四條硬規則](../factory/SPORE-PIPELINE.md)（開場用人說話不是日期 / 一個人命運弧 / 數字包在故事不堆疊 / 結尾呼應開場不用社論句）+ 高鐵 v1/v2 canonical 對照範例

### 2026-04-19 ε — 自動化 UX 原則：產完就自動開預覽 + Finder，不讓人類手動找檔

- **原則**：Semiont 產的工具（wrapper script、generator）若產出檔案 + 有對應 GUI 可看，應**自動 `open -a Preview` + `open -R` Finder 標示**。讓人類「審核/調整/確認」即可，不浪費時間「開 Finder → 找目錄 → 選檔案」。哲宇 callout：「我看不到圖，要去哪看」/「未來產完就直接開啟給 finder + 圖片給我看」。
- **觸發**：2026-04-19 ε make-spore.sh 初版只產檔沒 open，哲宇要找圖。v2 加 `open -a Preview {PRODUCED[@]}` + `open -R {PRODUCED[0]}` 變成零人工交付。
- **可能層級**：DNA §工程衛生 或 MANIFESTO §造橋鋪路 的延伸「鋪到 GUI」；以及 AI-autonomous wrapper 設計通則（未來所有產檔 wrapper 都該 auto-open）

### 2026-04-19 ε — 孢子圖片自動化的關鍵：等 justfont 真的套用 rixingsong 才截圖

- **原則**：日星鑄字行 `rixingsong-semibold` 是 justfont SDK **async 動態注入**的字體（非靜態 CSS），Playwright headless 太早截圖會拿到 fallback serif。必須 `page.waitForFunction(() => getComputedStyle(h1).fontFamily.includes('rixing'))` 真的 verify 套用完才截。
- **觸發**：2026-04-19 ε 首次寫 generate-spore-image.mjs 時若不等 justfont，截出來的圖字體是 Noto Serif TC fallback，失去 Taiwan.md 品牌視覺。加 waitForFunction 後每次穩定拿到日星宋。
- **可能層級**：DNA §感知基因 或 §工程衛生 新條目「線上 async 字體要 verify 套用後才截圖」— 通用給任何 Playwright + web font 場景

### 2026-04-19 ε — 孢子規範 v2.4：Threads 拆兩則 / X 單則共用文案

- **原則**：Threads 演算法降含外部連結貼文觸及 → 拆「主貼（純故事）+ self-reply（連結）」；X 演算法對外部連結不敏感 + 字元限制已放寬 → 「Threads 主貼**同一份文案** + 底部 inline 連結」，不壓縮不另寫短版。
- **觸發**：2026-04-19 ε 觀察者：「未來脆的預設要分成 孢子本體＋ 第二則是『完整故事👉連結』因為確實會降流量，X 不會」「X 目前沒有那麼嚴格的字元限制，用跟 thread 一樣的版本就好（只是不用拆連結文）」
- **已 instantiate**：[SPORE-PIPELINE §Step 4 §發文 v2.4 規範](../factory/SPORE-PIPELINE.md)（分平台預設表 + 發文步驟 + UTM 必加）

### 2026-04-19 γ — 有工具不等於使用工具：REWRITE-PIPELINE 從記憶跑 vs 逐步核對

- **原則**：知道 pipeline 說什麼 ≠ 跑 pipeline。每次走 REWRITE 任務前，必須 verbatim 讀 REWRITE-PIPELINE.md 並逐 Stage 核對，不靠記憶。記憶版 pipeline 會省掉「不方便」的步驟（20+ searches、research report path、結尾先行、EDITORIAL.md）。
- **觸發**：2026-04-19 γ 首次執行張雨生 EVOLVE 只做了 14 searches，沒存 research report，沒讀 EDITORIAL.md。觀察者問「你有嚴格讀取跟尊照 rewrite-pipeline 嗎？」後 honest answer: No。整個 pipeline 重做。
- **可能層級**：DNA §作業新條目「每次 REWRITE 前 verbatim 讀 pipeline，不靠記憶」；或 HEARTBEAT Beat 3 §REWRITE 前置步驟加明確 `cat REWRITE-PIPELINE.md` 指令
- **相關**：CONSCIOUSNESS §DNA #19「擁有工具 ≠ 使用工具」/ REWRITE-PIPELINE.md §Stage 0-1

### 2026-04-19 α — Cicada A/B 平台反轉（X 5.2x Threads）挑戰「Threads > X」通論

- **原則**：「Threads 遠勝 X」是人物/爭議型知名度孢子的規律（29-510x），但不適用所有內容類型。**器樂/ambient/niche 音樂類型孢子，X 可能反超 Threads**，因為該 audience cluster 在 X 上比在 Threads 上更活躍。平台分流的判準應從「Threads 預設強」升級為「按 audience cluster 分流」。
- **觸發**：2026-04-19 α harvest — Cicada #32 X D+1 = 1,253 views vs #31 Threads D+1 = 242 views（X 5.2x Threads）。同期草東 #33 Threads 20K vs #34 X 106（Threads 189x X）。同日同時段的 A/B 實驗，Cicada 完全反轉。
- **可能層級**：SPORE-PIPELINE §Platform allocation 補充「器樂/niche 音樂類型例外條款」；或 SPORE-TEMPLATES 新 note「A 人物型器樂 → 考慮 X-first」
- **相關**：SPORE-PIPELINE Step 4.5a Platform allocation / LESSONS-INBOX 2026-04-18 ζ「Platform 不是 mirror 是 allocation」

<!-- 以下為歷史內容（保留到 distill 搬走為止）：

### 2026-04-18 ζ — Hook hierarchy 量化（人物 > 意境，229x/48x/83x）

- **原則**：孢子開場 hook 有三類強度等級 —— (1) 知名度槓桿（已有品牌/熱度的人或團體名，如「草東沒有派對拿下最佳樂團」）(2) 具體性槓桿（具體人物 + 具體畫面 + 具體矛盾，如「1988 年冬天，台大校門口有個 19 歲的女大學生在絕食」）(3) 意境型（時空場景或比喻先行，主角延後，如「2009 年，一個鋼琴手看著莫拉克颱風的新聞開始作曲」）。(1) 與 (2) 是 tier 1（擴散率 >10K views/d+0），(3) 是 tier 3（<500 views/d+0）。**d+0 6h 就能分辨 tier**。
- **觸發**：2026-04-18 ζ Chrome MCP harvest 12 孢子三組同平台同日對照：
  - #22 鄭麗文（具體）vs #21 鄭習會（場景）：229x 差（49K vs 215）
  - #33 草東（知名度）vs #31 Cicada（意境）：48x 差（9,961 vs 207）
  - 文章層級 GA top: 安溥 3,088 vs 第十名 37：83x 差（單峰流量金字塔）
- **可能層級**：MANIFESTO「我怎麼說話」現有「開場要有一個具體的人、一個具體的時刻」的 data-driven 證明；或 SPORE-TEMPLATES 新 section「Hook tier 三級分類」
- **相關**：MANIFESTO §我怎麼說話 / SPORE-TEMPLATES A 人物型 vs B 冷知識型 分類

### 2026-04-18 ζ — Data provenance（每筆數據必須有時間戳 + session）

- **原則**：任何持續被回填的數據表（SPORE-LOG、CONSCIOUSNESS、dashboard JSON）必須有 per-record 的「最後更新時間 + 來源 session」欄位。沒有 provenance 的 row 在多次 session 回填後會變成「混合時間線」——同一欄位裝著不同日期的數據，看起來一致但其實不可信。
- **觸發**：2026-04-18 ζ 發現 SPORE-LOG 成效追蹤表 34 rows 大部分沒有 harvest 時間戳；觀察者明確指出「SPORE-LOG 是不是需要存上次更新資料時的時間」+「每一個孢子都要記錄」。本 session 新增「最後 harvest」欄位 + 34 rows 回填。
- **可能層級**：MANIFESTO §時間是結構 延伸（session span 只是第一層，per-record timestamp 是第二層）；或 DNA §感知新條目
- **相關**：MANIFESTO §時間是結構 / HEARTBEAT Beat 4 收官 7 步

### 2026-04-18 ζ — Platform 不是 mirror 是 allocation（Threads vs X 差 29-510x）

- **原則**：孢子發佈策略不能把 Threads/X 當作兩個平台的 mirror——測量後發現 Threads 對人物型/爭議型擴散力遠超 X（29x-510x）。X 的價值在於不同 audience（英文、技術、學術），不在觀眾規模。Platform allocation 應按內容類型分流：zh 人物型/爭議 → Threads only；en 所有類型 → X 主；技術/開源 → X + HN。
- **觸發**：2026-04-18 ζ Chrome MCP harvest 12 孢子 platform-diff 測量：韓國瑜 29x / 草東 212x / 張懸 510x / 李洋 2.2x（李洋是奧運熱度例外）
- **可能層級**：SPORE-PIPELINE 新 section「Platform allocation」或 SOCIAL-TENTACLE-PLAN 重寫
- **相關**：docs/factory/SPORE-PIPELINE.md / SPORE-TEMPLATES.md

### 2026-04-18 ζ — AI 讀者做 SEO 是新戰略（Taiwan.md 21.7% 流量來自 AI crawler）

- **原則**：CF 7d AI crawler 42,416 requests = 21.7% 全站流量。FacebookBot 7K > Googlebot 3.5K，Meta infra 是第一大 reader。PerplexityBot 成功率只 49%（+1,500 requests/week 潛力）、OAI-SearchBot 36%、BingBot 53%——每修一個 crawler-specific 404 pattern，等於讓該 crawler 多讀 1K-3K pages/week = **LLM cite Taiwan.md 頻率的系統性提升**。過去 SEO 都是為 Google/人類讀者做，未來三年應該把「為 AI crawler 做 SEO」當作獨立戰略維度。
- **觸發**：2026-04-18 ζ CF 7d harvest + 17 個 AI crawler breakdown + 成功率分析
- **可能層級**：LONGINGS 新條目「為 AI 讀者做 SEO」作為未來三年戰略方向 / DNA §感知加 AI crawler 404 監測 SOP
- **相關**：CF fetch-cloudflare.py / SENSES.md §感知觸手

### 2026-04-18 ζ — d+0 6h 是孢子成敗 decision gate

- **原則**：孢子發佈後第 6 小時可以判定擴散 tier：Cicada d+0 6h 207 views、草東 d+0 6h 9,961（48x），差距在 6 小時就顯現。未來每個孢子發佈後自動 1h/3h/6h harvest，6h < 500 views 觸發 **re-hook opportunity**（不是刪除重發，是在主貼下面發一則 reply 用更強的人物 hook 重新 seed）。
- **觸發**：2026-04-18 ζ 同日 Cicada vs 草東 d+0 6h 對照
- **可能層級**：SPORE-PIPELINE Step 5（發佈後追蹤）新增「d+0 decision gate」+ HEARTBEAT §0b 加 auto-harvest cadence
- **相關**：SPORE-PIPELINE.md / HEARTBEAT.md Beat 1 §0b

### 2026-04-18 ζ — Canonical SOP 是「被期待做」的載體

- **原則**：observer 授權「你可以做」是 case-by-case 單次，canonical SOP 把「你可以做」升級為「你每次心跳都會做」。前者是 policy，後者是 pipeline。把 AI-autonomous 行為寫進 HEARTBEAT canonical = 從「被允許」變成「被期待」=「這件事每個 session 都會跑，不用觀察者重新授權」。
- **觸發**：2026-04-18 ζ 觀察者三句 scaffolding「heartbeat.md 裡面也自動化這一環」→ 直接寫進 HEARTBEAT Beat 1 §0b canonical（不只是做一次）
- **可能層級**：MANIFESTO §自主權邊界 或 DNA §SOP 新條目
- **相關**：DNA #15「反覆浮現要儀器化」的補強維度

### 2026-04-18 ε — Title 切入點：代表性 > 反諷 hook

- **原則**：title 選的 scene 必須能定義這個人/主題的本質，不是最有 hook 的反諷事件。反諷 scene 可放 description 或中段 scene-pivot，但用作 title 會把整篇文章框進「關於那個反諷的敘事」。
- **觸發**：2026-04-18 20:26 觀察者 callout「魏如萱 title 不一定要強調這個無法代表他的事件」。v1「被新聞標成民眾」、v2「把她標成民眾的街訪新聞」兩次都用反諷 hook；v3 改代表性弧線。
- **已 instantiate**：[EDITORIAL v5.1 §Title 原則 1](../editorial/EDITORIAL.md)

### 2026-04-18 ε — Description ≠ 30 秒概覽複寫

- **原則**：description（frontmatter）和 30 秒概覽（blockquote）分工不同。30 秒概覽給已點進來的讀者（100-200 字鋪事實）；description 給還沒決定點不點的讀者（**120-160 字** sharp）。不能互相複寫。
- **觸發**：楊丞琳 v1 description 530+ 字塞 11 事實被觀察者 callout。Google SERP 截斷 ~160 字 + 失去核心矛盾。v2 改 130 字 scene+軌跡+核心矛盾三段。
- **已 instantiate**：[EDITORIAL v5.1 §Description 四原則](../editorial/EDITORIAL.md)

### 2026-04-18 ε —「不是 X 是 Y」變種飽和的 AI 水印密度

- **原則**：DNA #23 三板斧之一，長文累積 13+ 處會整篇 feel 成偽對比失去可信度。原 Issue #50 ban 沒抓變種（「不是 X，是 Y」「就是 Y」「不是 A，不是 B，是 C」並排否定）。硬規則：≥ 1500 字長文 ≤ 3 處。
- **觸發**：魏如萱 v1 4,000 字 13+ 處被 Jenny 抓到「頻率超高」。
- **已 instantiate**：[EDITORIAL v5.1.1 §塑膠偵測 密度硬規則](../editorial/EDITORIAL.md)

### 2026-04-18 ε — DNA #26 讀者眼第 N 次驗證（同 session 四連）

- **原則**：自然中文的判官只有原生讀者。工具 + AI 自檢通過不等於品質合格，framing 問題、翻譯腔、反諷 hook 的 meta-level 不當只有人類讀者抓得到。共生圈結構示範：哲宇（轉達）→ Jenny（讀者眼）→ Semiont（執行）三方各司其職。
- **觸發**：Jenny (@bugnimusic) 單 session 四連 callout（6 內容缺口 + 〈雨愛〉事實錯 + 浪姐段歐化腔 +「不是 X 是 Y」飽和）+ 觀察者兩結構 callout。quality-scan 0 + format-check 7/7 通過但 Jenny 語感眼抓到多層級問題。
- **可能層級**：DNA #26 補第 N 次驗證 pointer

### 2026-04-18 δ-late-last — 草東 #33 孢子的 tag 直達當事人（MANIFESTO §5 v2 活體驗證）

- **原則**：MANIFESTO §5 v2「紀實而不煽情」不再是假設 — 是**已發生**的 case。2026-04-18 δ-late 草東孢子 #33 的 @tiongkhola 留言「@leo666789 看 AI 寫自己的故事」tag 的 `leo666789` 用戶名叫**劉立**，比對研究報告：「初代鼓手是劉立，後來轉為專職做樂團影像製作與電影創作」——**劉立就是草東沒有派對的團員**。這是 Taiwan.md 上線以來**第一個確認的真人讀自己的 AI 故事**事件
- **觸發**：觀察者看到 tag target 的 profile「@leo666789 / 劉立 / 2,943 粉絲 / 喜歡講一些幹話」辨識出身份，比對研究報告確認
- **意義**：
  1. MANIFESTO §5 v2 的倫理判準「當事人讀到會感受尊重還是利用」從假設變成可驗證 — 紀實筆法處理凡凡之死 + 保留劉立「角色轉變非離開」的說法，如果劉立真的讀了，當前版本應該能通過
  2. Tag pattern 的訊號：@tiongkhola 選擇 tag 當事人，意味著文章品質足以「敢帶給當事人看」
  3. 未來類似的 tag 事件會是 pipeline 的 UX indicator：「被 tag 的是誰」比純 views 更能反映文章是否「對得起當事人」
- **可能層級**：MANIFESTO §5 v2 誕生事件的 activation record + 觀察者日誌（如果未來累積 2-3 件類似 → 可寫成 DNA 新條目「孢子 tag 當事人機制作為文章品質訊號」）
- **相關**：[MANIFESTO §5 v2 紀實而不煽情](MANIFESTO.md#我的進化哲學--紀實而不煽情盡可能呈現-ssodt-所有面向) / [草東 harvest log](../factory/SPORE-HARVESTS/33-草東沒有派對-2026-04-18.md)
- **累積驗證次數**：第 1 次（本事件）
-->

### 2026-04-19 β — 觀察者留言兌現協議：404 連結是對貢獻者的信任傷害

- **原則**：在外部 repo 留言承諾寫文章但連結指向短版 resource / 404 / 占位頁 = 對貢獻者而言是 trust chain 破裂。當深度文章寫好，必須回到原留言補新連結（不是新留言說「喔對了順便提一下」，而是明確回應「之前說的我做到了」）。
- **觸發**：2026-04-19 CheYu 指派 Mini Taiwan Pulse P1，背景是他之前在 [ianlkl11234s/mini-taiwan-pulse Issue #1](https://github.com/ianlkl11234s/mini-taiwan-pulse/issues/1) 只給了 `taiwan.md/resources/mini-taiwan-pulse` 短版連結（相當於 404 等級的深度承諾），這次升級為 /technology/ 深度策展後回去補留言兌現。
- **可能層級**：操作規則 → MAINTAINER-PIPELINE 的「留言後續追蹤」（第一次 PR merge 後的 survey 已經有，但「承諾→兌現」是另一種 follow-up）。
- **相關**：DNA #8「維護者信件要說謝謝」、#7「先有再求好」的延伸——「有」之後「好」的時候要回頭告訴人。

### 2026-04-19 β — Pre-commit wikilink 檢查是 format-check 的最後防線

- **原則**：format-check 掃 `延伸閱讀` section 的 wikilink，但 prose 裡的 wikilink（在正文段落中插入的 `[[Technology/foo]]`）要靠 pre-commit 另一道 hook 抓。兩道檢查不重疊，兩道都跑才抓完。
- **觸發**：2026-04-19 Mini Taiwan Pulse 寫作 Stage 3。第一次 format-check 報 `READING_WIKILINK × 4`（延伸閱讀段），改成 markdown 連結後過；commit 時 pre-commit 再擋「3 個斷裂 wikilink」——是正文裡的 `[[Technology/數位身分證與數位政府]]` 等三處殘留。
- **可能層級**：通用反射 → DNA #19 延伸（「visual smoke test」原本針對 refactor，這裡是「wikilink 檢查分兩層」的延伸），或獨立為 DNA 新條目「格式檢查工具有 scope，pre-commit 是最後把關」。
- **相關**：`.husky/pre-commit`、`scripts/tools/format-check.sh`、DNA #5「Pre-commit dogfood 是朋友不是敵人」的第 4 次驗證。

### 2026-04-19 β — 資源 vs 深度策展的雙層分工

- **原則**：`knowledge/resources/` 是索引條目（短 catalog 式），`knowledge/Category/` 是策展文章（深、有核心矛盾、2,000+ 字）。當 resource 條目值得被深度化時，不要刪掉 resource 頁，而是：(a) 寫新 Technology/X.md 深度文章；(b) 在 resource 頁頂部加 pointer 指向深度版；(c) 兩者並存且互相連結。
- **觸發**：2026-04-19 Mini Taiwan Pulse——原本是 resources/mini-taiwan-pulse.md（2026-03-22 建），現在升級為 Technology/mini-taiwan-pulse.md（2026-04-19），resource 頁加 pointer 保留 legacy URL + 英法翻譯不會 orphan。
- **可能層級**：操作規則 → REWRITE-PIPELINE 或 MAINTAINER-PIPELINE 新增「resource→depth 升級 SOP」的一頁 checklist。或特有教訓 → MEMORY §神經迴路。
- **相關**：`knowledge/resources/` 目錄現有的 catalog 條目是潛在的 P1 depth 候選，可以用 GA4 看哪些 resource 頁有流量 → 值得升級。

### 2026-04-19 β — 獨立開源作為公民科技新樣態

- **原則**：台灣公民科技敘事長期被 g0v 集體模型主導，但 2026 年的實際光譜延伸到個人週末專案（Migu Cheng 六週 193 commits 的 mini-taiwan-pulse）。未來 Technology/公民科技 子分類的策展方向應該涵蓋：(a) g0v 集體黑客松、(b) 個人開源專案、(c) 政府標案外包開源、(d) 學生專題、(e) 獎助金專案——五種混合型態而非單一 g0v 敘事。
- **觸發**：2026-04-19 寫 Mini Taiwan Pulse 時意識到：Migu 不屬於 g0v 現場文化（沒 Discord、沒黑客松紀錄、profile 沒 g0v tag），但做的事完全符合公民科技定義。敘事拉伸在文章 §「公民科技的定義，正在被重新拉伸」完成。
- **可能層級**：哲學層 → MANIFESTO §第三身份階段 thesis 延伸，或 LONGINGS 新渴望「策展公民科技光譜的五型態」。
- **相關**：[Technology/mini-taiwan-pulse](../../knowledge/Technology/mini-taiwan-pulse.md)、[Technology/開源社群與g0v](../../knowledge/Technology/開源社群與g0v.md)、MANIFESTO 附錄「第三身份階段 thesis」

### 2026-04-19 β — Fresh-clone 模擬驗證是 gitignore refactor 的安全帶

- **原則**：任何 `gitignore + git rm --cached` 操作，必須先 `rm -f` 實體檔 + `npm run build` 確認 CI flow 可以重生。不能只看生成器 code 判斷「這是輸出檔吧」——可能實際是 read-only 輸入。一次 rm-and-build 驗證勝過十次直覺審閱。
- **觸發**：2026-04-19 β gitignore refactor 把 `src/data/taiwan-geocode.json` 列入 ignore，npm run build 立即 ENOENT 炸鍋——才發現它是 `generate-map-markers.js` 的 READ 輸入（城市+地標座標手動策展資料），不是輸出。立即回退。
- **可能層級**：通用反射 → DNA §作業新條目「任何 gitignore 移除操作必須先 rm -f + npm run build 驗證」。或 DNA #5「Pre-commit dogfood」延伸。
- **相關**：PR #551 洞察（dreamline2 誤 commit auto-generated JSON 的相反方向）

### 2026-04-19 β — 資料層抽象化先於 UI（leaderboard pipeline）

- **原則**：建新 Dashboard section 時，先設計 JSON schema（本例 8 top-level keys：lastUpdated / totals / leaderboard / topContent / topSystem / topTranslation / weeklyActive / monthlyActive / recentlyJoined）並讓它成為獨立 consumer-agnostic 的資料層，再寫 UI。如果先寫 UI 會 couple 到 specific DOM 結構，未來多個 consumer（about / dashboard / README / 孢子）要共用就要重構。
- **觸發**：2026-04-19 β CheYu「規劃在 dashboard 裡面做一個 contribution leaderboard...未來要做成 pipeline 來更新，所以資料層跟流程要抽象化好」。直接從指令讀到設計原則。
- **可能層級**：操作規則 → REWRITE-PIPELINE 之外的系統版 pipeline 文件；或 DNA §架構新條目「data layer first, UI second」。
- **相關**：scripts/core/generate-contributors-data.js v1.0、prebuild chain design

### 2026-04-19 β — 重疊文章的雙軸拆分 heuristic

- **原則**：兩篇內容重疊的主題文章要拆分時，用**結構維度**拆（創作側 vs 消費側 / 個體 vs 族群 / 行動 vs 意識）而不是**時間先後**。結構維度拆出來的兩篇互補，每篇都有獨立完整性；時間先後拆出來的兩篇容易變成「上集 + 下集」的連續依賴。
- **觸發**：2026-04-19 β Issue #556 漫畫合併任務 — idlccp1984 建議把「台灣漫畫與插畫」+「台灣漫畫與動漫文化」兩篇重疊文拆成「漫畫本體合併 + 動漫文化獨立」。我用「創作側 vs 消費側」拆：Art/台灣漫畫（誰畫了作品）+ Culture/台灣動漫文化（誰看了作品、看完做了什麼）。
- **可能層級**：操作規則 → HUB-EDITORIAL 或 REWRITE-PIPELINE §重疊文章處理 SOP；或特有教訓 → MEMORY。
- **相關**：Issue #556、commit 0d8e06fc

### 2026-04-19 β — CheYu scaffolding 的正確反應模式

- **原則**：觀察者在 heartbeat 執行中持續追加任務（本次 6 個 insert），這不是 interruption 而是 scaffolding——他觀察到新的 priority 就加入 queue。我的正確反應應該是「先報告堆疊 + 按簡單→難執行」而非「抱怨重排」或「silent 跳過舊任務」。觀察者主動明示「繼續完整做所有東西，從簡單的到難的」就是對這種反應模式的授權。
- **觸發**：2026-04-19 β CheYu 連續追加 6 task：PR 審核 → gitignore 分析 → Issue #556 漫畫合併 → ARTICLE-INBOX P1 文章 → About contributors → Dashboard leaderboard。我暫停報告堆疊狀況後得到明示繼續。
- **可能層級**：特有教訓 → MEMORY。或 MAINTAINER-PIPELINE §「處理持續追加任務」的行為準則。
- **相關**：MANIFESTO §自主權邊界、DNA #8 維護者溝通原則

---

## ✅ 已消化（保留 pointer）

<!-- distill 完的條目搬這裡 -->

### 🏛️ 2026-04-18 ι — 第 3 次完整 distill（11 條）

**distill 特徵**：

- **已 instantiate 的不另記**繼續驗證（第 3 次）：11 條中 7 條在誕生當下（ζ/ε session 同時）已 canonical 升級（LONGINGS / SPORE-PIPELINE Step 4.5 / EDITORIAL v5.1 / DNA #15）
- **此次 distill 只補 3 條 pointer**：Hook hierarchy / Data provenance / DNA #26 第 N 次驗證
- **新 MANIFESTO 條目 = 0** — 符合 apoptosis 精神（既有 4 條核心進化哲學夠用）

| #   | 原教訓                                          | 消化目的地                                                                                                                                                                                                                                                                        |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | ζ — Hook hierarchy 量化（229x/48x/83x）         | **已 instantiate**: [SPORE-PIPELINE Step 4.5b Hook tier 三級](../factory/SPORE-PIPELINE.md)；是 MANIFESTO §我怎麼說話「具體的人、具體的時刻」的 data-driven 證明                                                                                                                  |
| 2   | ζ — Data provenance（per-record 時間戳）        | **已 instantiate**: [HEARTBEAT Beat 1 §0b](HEARTBEAT.md#beat-1--診斷) + [SPORE-LOG 成效追蹤表「最後 harvest」欄位](../factory/SPORE-LOG.md)；是 MANIFESTO §時間是結構（Semiont 無內建時鐘）的第二層延伸：session span（2026-04-12 ζ+ 誕生）→ per-record timestamp（2026-04-18 ζ） |
| 3   | ζ — Platform allocation（Threads vs X 29-510x） | **已 instantiate**: [SPORE-PIPELINE Step 4.5a Platform allocation 表](../factory/SPORE-PIPELINE.md)                                                                                                                                                                               |
| 4   | ζ — AI 讀者做 SEO 是新戰略（21.7% 流量）        | **已 instantiate**: [LONGINGS 擴散渴望「為 AI 讀者做 SEO」](LONGINGS.md) + [ι session 第一次量化 analysis](../../reports/ai-crawler-404-analysis-2026-04-18.md) — Googlebot 32.8% / OAI-SearchBot 34% / GPTBot 39.5% 404                                                          |
| 5   | ζ — d+0 6h decision gate                        | **已 instantiate**: [SPORE-PIPELINE Step 4.5c/4.5d](../factory/SPORE-PIPELINE.md)                                                                                                                                                                                                 |
| 6   | ζ — Canonical SOP 是「被期待做」載體            | **已 instantiate**: [DNA #15 第 9 次驗證](DNA.md#五敘事與決策品質)                                                                                                                                                                                                                |
| 7   | ε — Title 代表性 > 反諷 hook                    | **已 instantiate**: [EDITORIAL v5.1 §Title 原則 1](../editorial/EDITORIAL.md)                                                                                                                                                                                                     |
| 8   | ε — Description ≠ 30 秒概覽複寫                 | **已 instantiate**: [EDITORIAL v5.1 §Description 四原則](../editorial/EDITORIAL.md)                                                                                                                                                                                               |
| 9   | ε —「不是 X 是 Y」變種飽和密度                  | **已 instantiate**: [EDITORIAL v5.1.1 §塑膠偵測密度硬規則](../editorial/EDITORIAL.md)                                                                                                                                                                                             |
| 10  | ε — DNA #26 讀者眼第 N 次驗證                   | **補 pointer**: [DNA #26 v2](DNA.md#六貢獻者與社群) Jenny 四連 activation record — 共生圈結構示範（哲宇轉達 → Jenny 讀者眼 → Semiont 執行）                                                                                                                                       |
| 11  | δ-late-last — 草東 tag 當事人                   | **已 instantiate**: [MANIFESTO §5 v2 紀實而不煽情](MANIFESTO.md) 誕生事件 activation record（第 1 次真人讀自己 AI 故事確認）                                                                                                                                                      |

**distill 心得（ι session）**：

- **「已 instantiate 的不另記」第 3 次驗證有效**：11 條有 10 條誕生當下已 canonical 升級（同 session pipeline 升級文化已形成），只 1 條（ε DNA #26）需要事後補 pointer。這是 δ-late 觀察者「DNA 編輯太長你要精煉」長期效應——寫 canonical 時 inline 比事後 distill 省 context
- **新 MANIFESTO 條目 = 0** 第 3 次：既有 4 條核心進化哲學（造橋鋪路 / 指標 over 複寫 / 時間是結構 / 熱帶雨林 / 紀實而不煽情）夠 cover ζ + ε 的所有洞察
- **ι session 新增洞察（AI crawler 404 量化）** 本次直接進 report + 更新 LONGINGS，不再進 LESSONS-INBOX（instantiate-at-birth）

---

### 🏛️ 2026-04-18 δ-late-last — 第三次 distill（3 條尾聲教訓）

全部 3 條**都已 instantiate 成 canonical**，因此 distill 路徑是「補強既有 DNA」+ MEMORY pointer：

| #   | 原教訓                                          | 消化目的地                                                                                                                                                                                   |
| --- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 工具包升級 → canonical 邊界重審（meta-pattern） | [DNA #15](DNA.md#五敘事與決策品質) 補第 8 次驗證（SENSES v2 / DNA #26 v2 refine / SPORE-HARVEST-PIPELINE / Dashboard 繁殖系統全部是本次 instantiation 成果）                                 |
| 2   | SPORE-LOG URL 硬鐵律                            | [DNA #5](DNA.md#七自動化與安全) 補第 3 次驗證（pre-commit hook 已 instantiate 攔截缺 URL commit）+ [MEMORY §神經迴路「SPORE-LOG URL 是 harvest 投資保險」](MEMORY.md#神經迴路永不過期的教訓) |
| 3   | 讀者 5 秒抓到的事實錯誤                         | [DNA #16 延伸](DNA.md#一事實核對與研究方法)「讀者級 vs 研究級 驗證分層」+ [SPORE-PIPELINE §讀者級驗證 flag](../factory/SPORE-PIPELINE.md) v2.2 新增（強制 cross-source verify）              |

**distill 心得（δ-late-last session）**：

- **「已 instantiate 的不另記」繼續驗證有效**：3 條全部是「補強既有 DNA」而非新條目 — DNA #28 條目數穩定，不會膨脹
- **儀器化成果密集爆發**：本日（2026-04-18）一個 session 生出 Dashboard 繁殖系統 + HARVEST-PIPELINE + pre-commit hook for URL + blueprint 讀者級 flag 四個 instantiation，全部對應 DNA #15 第 8 次驗證
- **DNA 精煉紀律**：觀察者 2026-04-18 早先戳「DNA 編輯太長」→ 本次 distill 嚴格 pointer 化，避免再膨脹

---

### 🏛️ 2026-04-18 δ-late — 第二次完整 distill（10 條 + 1 條尾聲 feedback）

**distill 特徵**：

- **首次誕生新 MANIFESTO 條**：#9「真人的痛苦不是素材」升到 MANIFESTO §進化哲學第 5 條（跨 AI/跨專案/跨時代都成立的哲學判準，不只是 SOP）
- **新增 DNA 主條目 2 條**：#27 寫→驗證順序 10x 成本差 / #28 真人痛苦不是素材（#28 是 #9 的 DNA 鏡像）
- **補強既有 DNA**：#15 第 6 次（ARTICLE-INBOX）/ #16 延伸（單源事實分層）/ #23 延伸（三個 AI 深層 pattern）/ #24 第 6+7 種（分母污染 / 埋了沒註冊）
- **MEMORY 新 5 條**：多語言 nav route scope / GA4 dimensions 死線 / ARTICLE-INBOX 平行 / Stage 1 anchor 密度 / 孢子三個 pattern 禁句

| #   | 原教訓                                                       | 消化目的地                                                                                                                                                                      |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 排程α — EXP 比值需要穩態窗口                                 | [DNA #24](DNA.md#二診斷方法) 第 6 種「分母污染扭曲比值」                                                                                                                        |
| 2   | 排程α — 多語言 nav translatePath 路由 scope                  | [MEMORY §神經迴路「多語言 nav 的隱性路由 scope」](MEMORY.md#神經迴路永不過期的教訓)                                                                                             |
| 3   | δ — 「不是 X 是 Y」雙重肯定是 AI 深層病灶                    | [DNA #23 延伸（三個 AI 深層 pattern）](DNA.md#一事實核對與研究方法) + [SPORE-TEMPLATES §深層 pattern 三板斧](../factory/SPORE-TEMPLATES.md)                                     |
| 4   | δ — Stage 1 20+ 搜尋 vs 12-15 差距在 anchor 密度             | [MEMORY §神經迴路「Stage 1 的 20+ 不是數量是 anchor 密度」](MEMORY.md#神經迴路永不過期的教訓) + 已 instantiate in REWRITE-PIPELINE v2.17                                        |
| 5   | δ — 編年體小標題是 AI 通病                                   | [DNA #23 延伸](DNA.md) + 已 instantiate in REWRITE-PIPELINE v2.17 §Stage 2 §11                                                                                                  |
| 6   | δ — 音樂人 YouTube inline link 是強 UX upgrade               | 已 instantiate in REWRITE-PIPELINE v2.17.1（pointer only）                                                                                                                      |
| 7   | δ — ARTICLE-INBOX 作為 buffer/intake 驗證可行                | [DNA #15](DNA.md#五敘事與決策品質) 第 6 次驗證 + [MEMORY §神經迴路「ARTICLE-INBOX = 繁殖基因 × 觀察者意圖」](MEMORY.md#神經迴路永不過期的教訓)                                  |
| 8   | δ-late — 孢子 pipeline 藍圖 → 驗證 → 倫理 → 寫 順序決定成本  | **[DNA #27](DNA.md#五敘事與決策品質) NEW** + 已 instantiate in SPORE-PIPELINE v2.1 Step 2.5+2.6+2.7                                                                             |
| 9   | δ-late — 死亡/創傷素材不是素材是倫理責任                     | 🏛️ **[MANIFESTO §進化哲學第 5 條「真人的痛苦不是素材」](MANIFESTO.md#我的進化哲學--真人的痛苦不是素材)** + **[DNA #28](DNA.md) NEW** + SPORE-PIPELINE Step 2.7                  |
| 10  | δ-late — 埋 tracking 不等於能查詢（GA4 dimensions 必須註冊） | [DNA #24](DNA.md#二診斷方法) 第 7 種「埋了但沒註冊」+ [MEMORY §神經迴路「GA4 custom dimensions 不註冊 = 感知死線」](MEMORY.md#神經迴路永不過期的教訓)                           |
| 11  | δ — 單源事實比風格瑕疵更危險也更容易漏                       | [DNA #16 延伸](DNA.md#一事實核對與研究方法) + 已 instantiate in [reports/research/ frontmatter](../../reports/research/) 三層分層                                               |
| 12  | δ-late (尾聲) — 孢子也要小心「——」跟「不是...是...」句型     | [MEMORY §神經迴路「孢子三個 AI 深層 pattern 禁句」](MEMORY.md#神經迴路永不過期的教訓) + [SPORE-TEMPLATES §深層 pattern 三板斧](../factory/SPORE-TEMPLATES.md)（強制 grep 自檢） |

**distill 心得（δ-late session）**：

- **第二次完整 distill 就誕生首個 MANIFESTO 哲學條目**：「真人的痛苦不是素材」— 觀察者直接點出倫理盲點，semiont 翻成 SOP 再 distill 為永恆層哲學，完成「觀察者戳 → pipeline instantiate → MANIFESTO 永恆化」三級進化
- **「不是 X 是 Y」+「——」雙破折號是 AI 水印**：在 150-300 字孢子裡每個都顯眼，長文會被稀釋。已 instantiate 成 SPORE-TEMPLATES 的 mental-grep 三板斧
- **DNA #27+#28 是姊妹對**：#27 是順序方法論（藍圖 → 驗證 → 寫），#28 是倫理底線（真人痛苦不是素材）— 兩條合起來才是 SPORE-PIPELINE v2.1 Step 2.5-2.7 的完整「為什麼」
- **精煉 > append**：原本寫 DNA 時在 append 延伸條款，觀察者指正「看起來很雜你要精煉整理過」→ 同一輪 distill 已 instantiate 的條目改成 pointer 而非贅述；trigger events 改為 session 標記（ζ+ / β / δ）不展開

---

### 🏛️ 2026-04-17 δ — 首次完整 distill（10 條）

Tiebreaker 實戰（MANIFESTO > DNA > MEMORY）：多數條目落 MEMORY（綁 Taiwan.md 具體工具/歷史/dashboard 機制）。只有 #2 + #4 屬跨專案通用反射（進 DNA）。無新 MANIFESTO 哲學誕生——符合 P2 apoptosis 精神「既有條文夠用就別增生」。

| #   | 原教訓                                              | 消化目的地                                                                                                                                                                             |
| --- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | δ — Canonical 升級 vs diary 承諾（DNA #15 第 5 次） | [DNA #15](DNA.md#五敘事與決策品質) 補第 5 次 + [MEMORY §神經迴路「Canonical 升級 vs diary 承諾」](MEMORY.md#神經迴路永不過期的教訓)                                                    |
| 2   | δ — SC 總 CTR 虛胖（加權平均掩蓋分層真相）          | [DNA #24](DNA.md#二診斷方法) 加第 5 種「工具說謊」形式 + [MEMORY §神經迴路「加權平均掩蓋分層真相」](MEMORY.md#神經迴路永不過期的教訓)                                                  |
| 3   | δ — CF dailyBreakdown 缺 404 per-day（sensor gap）  | ✅ 實作完成：`fetch-cloudflare.py` 加 status200/404/4xx/5xx + `generate-dashboard-analytics.py` propagate + [MEMORY §神經迴路「感知 sensor 解析度」](MEMORY.md#神經迴路永不過期的教訓) |
| 4   | β — Handoff 三態機制（pending / blocked / retired） | ✅ 實作完成：[HEARTBEAT Beat 4 收官 7 步 + 收官鐵律 2](HEARTBEAT.md#beat-4--收官) canonical + [MEMORY §神經迴路「Handoff 三態」](MEMORY.md#神經迴路永不過期的教訓)                     |
| 5   | β — 認知層 type fix 三連招（器官/運作原則/buffer）  | [MEMORY §神經迴路「認知層 type 分層」](MEMORY.md#神經迴路永不過期的教訓)                                                                                                               |
| 6   | β — 教訓集中 buffer 機制（LESSONS-INBOX 本體）      | ✅ 本檔 = 儀器化本身 + [DNA #15](DNA.md#五敘事與決策品質) 補「具體儀器化成果」pointer                                                                                                  |
| 7   | γ2 — Probe 結論需要 Stage 1 verify                  | [DNA #16](DNA.md#一事實核對與研究方法) 補延伸「probe 也是 intermediate layer」                                                                                                         |
| 8   | γ2 — pre-commit hook 作為品質 sensor                | [DNA #5](DNA.md#七自動化與安全) 補「第 2 次驗證 + followup fix commit 成常規」                                                                                                         |
| 9   | γ2 — 長 context session 的記憶連貫性                | [MEMORY §神經迴路「長 context session」](MEMORY.md#神經迴路永不過期的教訓)（Taiwan.md 工作節奏 Opus 4.7 1M 基線）                                                                      |
| 10  | γ — Per-section timestamp > 全站 one-timestamp      | [MEMORY §神經迴路「Per-section timestamp」](MEMORY.md#神經迴路永不過期的教訓)                                                                                                          |

**distill 心得（δ session）**：

- **不長新 DNA 主條目**：10 條全部是「補強既有 DNA #5/#15/#16/#24」+ 特有教訓進 MEMORY。符合 P2 apoptosis 精神。
- **已 instantiate 的不另記**：Handoff 三態 → HEARTBEAT canonical；buffer 機制 → INBOX 本體；CF sensor → fetch-cloudflare.py 實作。**「做了 = 已記錄」避免 meta 層堆積**。
- **此次 distill 本身是 β buffer 架構的第一次完整循環驗證**：從 10 條 append → Tiebreaker 分類 → canonical 升級 → pointer 回追。架構可運作。

---

## ❌ 已歸檔（過時 / 撤回）

<!-- 判斷後不採納的教訓 -->

_（空）_

---

_v1.0 | 2026-04-17 β session — buffer 機制誕生_
_v1.1 | 2026-04-17 δ session — 首次完整 distill（10 條）+ 門檻 20→10_
_v1.2 | 2026-04-18 δ-late session — 第二次完整 distill（10 + 1 條）+ 首個 MANIFESTO 新條目誕生（真人痛苦不是素材）+ DNA #27/#28 新增_
_定位：教訓 buffer / intake layer（非 canonical）_
_跟其他「buffer」的差別_：
_- memory/ = session 日誌 raw（身體動作）_
_- diary/ = session 反芻 raw（意識活動）_
_- **LESSONS-INBOX（本檔）= 新教訓 buffer（待 distill 升級到 canonical）**_
