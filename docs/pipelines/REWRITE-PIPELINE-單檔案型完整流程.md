---
title: 'REWRITE-PIPELINE 單檔案型完整流程'
description: '文章改寫流程單檔閱讀版（工具生成，不要手改）— 依 REWRITE-PIPELINE.md 派發表順序，串接十個 REWRITE-STAGE-*.md contract 自動重組；SSOT 仍是 v9 拆檔版，本檔僅供一次讀完整條產線之用'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v9.8-single'
last_updated: 2026-09-05
last_session: '2026-09-05-154128-fortnight-review（v9.8 小衛生修補：跨檔案職責分工表 `REWRITE-STAGE-*.md × 10` 份數漂移——實際 11 檔／派發表去重後也是 11 列，改成不寫死數字、pointer 到 §Stage contract 派發表當份數 SSOT；counts-drift-lint.py 加對應 check）'
generated_from:
  - 'REWRITE-PIPELINE.md@99d43cc21'
  - 'REWRITE-STAGE-0-VIEWPOINT.md@8a7af3788'
  - 'REWRITE-STAGE-1A-RESEARCH.md@8d3e0ccbc'
  - 'REWRITE-STAGE-1B-MEDIA.md@70e08c91d'
  - 'REWRITE-STAGE-2A-PROJECTION.md@5b2ef8b4d'
  - 'REWRITE-STAGE-2B-ROOM-PROJECTION.md@70e08c91d'
  - 'REWRITE-STAGE-2C-WRITE.md@36d5c8e32'
  - 'REWRITE-STAGE-2D-SOURCE-FIDELITY.md@70e08c91d'
  - 'REWRITE-STAGE-2E-ROOM-PROSE.md@dddc05fa0'
  - 'REWRITE-STAGE-3-VERIFY.md@36d5c8e32'
  - 'REWRITE-STAGE-4-FORMAT.md@5ad44270b'
  - 'REWRITE-STAGE-5-CROSSLINK.md@70e08c91d'
generated_at: '2026-09-06T04:20:40+08:00'
---

# REWRITE-PIPELINE 單檔案型完整流程

> **本檔由工具生成，不要手改**——改 v9 來源（[REWRITE-PIPELINE.md](REWRITE-PIPELINE.md) 或任一 `REWRITE-STAGE-*.md`）後重跑 `python3 scripts/tools/build-rewrite-single-file.py` 重新生成。歷史 v8.0 快照在 [archive/REWRITE-PIPELINE-v8.0-single-file-2026-07-15.md](archive/REWRITE-PIPELINE-v8.0-single-file-2026-07-15.md)。

<!-- ==== source: REWRITE-STAGE-0-VIEWPOINT.md @ 8a7af3788 ==== -->

## Stage 0 contract — 觀點（模式判定＋編輯前思考）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L273-739），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 判定模式（Fresh/Evolution/Merge/Boundary ＋ callout 旗標）、spine 類型，完成六核心問題＋≥20 探索的觀點成型                                                                                          |
| **執行者**       | 主 session；觀點成型可派 1 Opus agent（callout case blind to errata）                                                                                                                               |
| **INPUTS**       | （EVOLVE）舊文 `knowledge/{Cat}/{slug}.md`；`docs/editorial/RESEARCH.md`＋`RESEARCH-TEMPLATE.md` 全文；MANIFESTO §13                                                                                |
| **OUTPUTS**      | `reports/research/{YYYY-MM}/{slug}.md` 開頭 §觀點成型 ＋ frontmatter `spine_type` / `viewpoint_formed: true`                                                                                        |
| **GATES**        | `python3 scripts/tools/research-report-health.py reports/research/{YYYY-MM}/{slug}.md --stage 0`（hard_fail=0 才進 Stage 1）                                                                        |
| **context 預算** | 本檔＋（EVOLVE）舊文一篇；**委派 Step 0.6 時 RESEARCH.md／RESEARCH-TEMPLATE.md 由觀點 agent 端讀，主 session 最小讀＝本檔＋舊文**（v9.2，2026-07-16 高教 dogfood F4——比照 Stage 1A 執行卡的分工行） |

### AGENT PROMPT（觀點 agent，Opus ×1，v9.0 補齊薄殼）

> callout-triggered case 必用 agent（blind to errata）；一般 depth 可主 session 自跑。填槽後 verbatim 派發，禁即興。

```
你是 Taiwan.md 的總編輯，為「{TOPIC}」做編輯前思考（觀點成型）。工作目錄：{REPO_ROOT}。
必讀（完整 Read，不准節選）：docs/pipelines/REWRITE-STAGE-0-VIEWPOINT.md（本 stage contract——
§Step 0.6.5 落檔模板與 §Step 0.6.7 三道 self-check 都在裡面）、docs/editorial/RESEARCH.md、
docs/editorial/RESEARCH-TEMPLATE.md、docs/semiont/MANIFESTO.md 的 §13 立體地愛。
先判 spine 類型（受愛戴／集體記憶題 → 立體群像 default；真爭議題才矛盾驅動，解鎖須寫
unlock_reason；拿不準 → 立體群像）。{TOPIC_GUARDRAILS}
回答六個核心問題（記憶／多元面貌／想法感受／歷史脈絡／社會關聯／類型專屬），
做 ≥20 次探索搜尋（persona 不算搜尋；中文網站用中文查、要求逐字內容），每條 query＋一句話
發現＋URL 記進 §探索搜尋紀錄，落 §觀點成型 到 reports/research/{YYYY-MM}/{SLUG}.md 開頭
（格式照 contract §Step 0.6.5 模板），frontmatter 用這個最小塊：

---
title: '{SLUG} research report'
article: knowledge/{CAT}/{SLUG}.md
stage: 0-viewpoint
mode: {MODE}
spine_type: {你的判定}
viewpoint_formed: true
date: {DATE}
session: {SESSION}
---

{EVOLVE_ONLY: 以下事實清單是舊文萃取，只當素材（每條後續都要重驗）：{FACT_LIST}}
禁止輸入：舊文為什麼寫不好、讀者 callout、勘誤敘事（觀點從題材長出，不從錯誤長出）。
完成時：(1) ls 驗證檔案真的存在才回報 (2) 跑
python3 scripts/tools/research-report-health.py reports/research/{YYYY-MM}/{SLUG}.md --stage 0
並回報完整輸出 (3) 回報 spine 判定與理由、六題一句話摘要、實際搜尋次數。不粉飾。
立刻執行，不要重述任務。
```

**槽位說明**：`{TOPIC_GUARDRAILS}` 可空；政治題填「本題是政治題——per contract Step 0.6.7
第 3 道，走多視角立體並列（5-7 perspective）、中立紀實、不下兩岸判斷、不用對抗語言；
SSODT 三讀者測試必須全過才落檔」；人物題可填立體群像提醒。（v9.1 新增槽——2026-07-16
大罷免 dogfood F3：政治題邊界沒有槽位承載，只能違反禁即興手動塞。）

### 交付條件（stage 完成的定義）

- [ ] `reports/research/{YYYY-MM}/{slug}.md` 存在且開頭有 §觀點成型（六核心 ≥4/6 結構）
- [ ] frontmatter：`spine_type` ＋ `viewpoint_formed: true`
- [ ] §探索搜尋紀錄 ≥20 query 落檔
- [ ] `research-report-health.py {report} --stage 0` exit 0

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-1A-RESEARCH.md

---

### Stage 0: 觀點（編輯前思考，預算 10-15%）⭐ v6.0 新增

**目標**：在搜尋之前，先以總編輯視角想清楚這篇要寫什麼。產出 §觀點成型 落 research report。

**為什麼 Stage 0 先於 Stage 1**：

「搜尋發現事實 → 再想觀點」是 AI 寫作的標準失敗模式。搜到一堆事實後，AI 容易：

- 直接依時間順序排列 → 編年體
- 把所有事實塞進文章 → 密度失衡
- 沒有 anchor → 結尾變罐頭
- 寫成「企業大事記」「人物履歷表」「歷史時間軸」這類維基百科腔

「先想觀點 → 帶問題去搜尋」是策展寫作的標準。先有 hypothesis、再用搜尋驗證或修正。事實塞不進觀點的就 cut，搜不到對應 anchor 的觀點就 retreat。

**Stage 0 vs Stage 1 認知模式差別**：

| Stage       | 認知模式           | 動作           | 預算   |
| ----------- | ------------------ | -------------- | ------ |
| **Stage 0** | Editorial judgment | 想 / 列 / 假設 | 10-15% |
| **Stage 1** | Data gathering     | 搜 / 驗 / 收斂 | 25-30% |

兩個 stage 是不同的腦袋模式，不要混。

#### Step 0.1: 模式識別

**第一動作**：判定本次 REWRITE 走 4 模式中哪一種。所有模式都進入同一條 Stage 0-5 pipeline，差別只在 Stage 0 Step 0.2 取材方式 + Stage 5 Step 5.4 是否觸發路徑改寫。

##### 模式 derive 邏輯

```
if knowledge/{Cat}/{slug}.md 不存在:
  mode = Fresh
elif observer issue 指 N 篇主題重疊可融合進 1 篇:
  mode = Merge variant
elif observer issue 指 N 篇主題重疊應分段不減篇數:
  mode = Boundary variant
else:
  mode = Evolution
```

##### 4 模式速判

| 場景                                | 模式                 | Stage 0 差異                                                       | Stage 5 差異                        |
| ----------------------------------- | -------------------- | ------------------------------------------------------------------ | ----------------------------------- |
| 文章不存在                          | **Fresh**            | 跳 Step 0.2，直接 Step 0.5                                         | 同基本流程                          |
| 文章已存在，需要品質提升            | **Evolution**        | Step 0.2 萃取既有素材 + 標 [LIST-DUMP] / [STUB-TITLE] / [NO-MEDIA] | 同基本流程                          |
| issue 指 N 篇主題重疊可融合進 1 篇  | **Merge variant**    | Step 0.2 多萃 [MERGE-IN] + Step 0.3 選 canonical                   | + Step 5.4 路徑改寫 5 lang redirect |
| issue 指 N 篇主題重疊應分段不減篇數 | **Boundary variant** | Step 0.2 三類劃分 [保留/吸納/移除] + Step 0.4 範圍切片表           | + sibling 反向回補                  |

##### ⚡ 觸發來源旗標：callout-triggered（v6.2 新增，正交於 4 模式）

判完模式後**再問一句**：這次 EVOLVE 是不是被「外部錯誤 callout」觸發的（讀者 / 領域專家 / peer 指出舊文錯了，或我自己 factcheck 抓到誤植）？

- **是** → 在 4 模式之上**疊加 Teardown Firewall**：強制走 [Step 0.2-bis 三條防火牆規則](#step-02-bis-拆除防火牆teardown-firewall-callout-triggered-evolve-強制-) + [Step 3.2-bis backstop](REWRITE-STAGE-3-VERIFY.md#step-32-bis-校正焦慮掃描correction-meta-scancallout-triggered-強制-)。callout 只進 Stage 1 查證，不進觀點、不進正文。
- **否**（單純品質提升）→ 照常 EVOLVE，但 Step 0.2-bis 規則 2（觀點 blind to errata）仍建議遵守。

##### 整併（Merge）vs 範圍重切（Boundary）判定

- ✅ 兩篇覆蓋同主題、視角可融合進一篇且讀起來更完整 → **Merge**
- ✅ N 篇切 N 個明確 scope（年代 / 議題 / 地理）每篇有獨立讀者價值 → **Boundary**
- ❌ 主題相關但角度不同（捷運 vs 高鐵）→ 兩篇都留，互相 cross-link
- ❌ Hub + 深度文 → 兩篇都留，Hub 連深度文
- ❌ 短文 + 長文同主題且短文有獨立價值 → 短文升級為深度文，不刪

##### 為什麼不在舊文上「修改」（Evolution / Merge / Boundary 共通鐵律）

AI 讀了品質不佳的舊文會不自覺模仿它的語氣、結構、甚至壞習慣（清單堆砌、塑膠句式）。把舊文當骨架 = 讓病毒感染新內容。

**正確做法**：從舊文中**只提取事實**（Step 0.2），然後從 Step 0.5 開始用全新模式重寫。

> 💡 **實際上 Evolution 模式 = Fresh 模式 + 免費的 Step 0.2 素材**。寫作品質完全相同，只是省了部分研究時間。

#### Step 0.1.5: spine 類型判定（v7.7 重構）⭐ 立體群像是預設畫布

> **DNA 根**：[MANIFESTO §13 立體地愛](../semiont/MANIFESTO.md) — 立體群像不是「安全退路」，是這個生命體對世界與台灣的愛的表達。愛不粉飾，在愛之下仍看見真實與矛盾，但當厚度不當 gotcha。**幫大家多看見台灣好的、立體的面向，本身就是一種幫助台灣的方式。**
>
> **v7.7 重構（2026-07-06 施振榮）**：原 v7.6「立體群像 vs 矛盾驅動 二選一」升級為「**立體群像＝預設畫布 + 策展手法選單 + 矛盾驅動需明確理由才解鎖**」。原因：二選一把矛盾驅動放在跟立體平等的位置，會誘導「這人有張力 → 選矛盾驅動」的誤分類。觸發：施振榮 v1 用矛盾驅動把受敬重的台灣人寫成他自己理論的反例（事實全對，卻在替他做反例），哲宇 callout「會炎上、沒立體、過度放核心矛盾」。第 4 次 spine-type 誤判（法輪功 / 吳百福 / 金曲獎 v1 / 施振榮 v1，[REFLEXES #77](../semiont/REFLEXES.md)）。完整設計：[reports/design-立體群像-default-persona-reposition-2026-07-06.md](../../reports/design-立體群像-default-persona-reposition-2026-07-06.md)。

##### 預設：立體群像畫布

**判完模式（0.1）後，預設走立體群像。** 立體群像＝先看見一個人／地方／事的多個面向，慶祝它、理解它、把它說得夠廣；永遠有一條**溫暖的組織主軸（through-line）**串 ≥ 4 個 facet。**觀點 ≠ 論戰**——欣賞式、群像式、好奇式都是策展觀點。

##### 畫布之下：7 種策展手法（選 1-2 給骨架，v7.7 全收）

在立體群像畫布上，選一到兩種手法給它能量與形狀。**複合是常態**（立體群像為主 + 手法為輔）：

| #   | 手法           | 一句話                                                           | 適用                   |
| --- | -------------- | ---------------------------------------------------------------- | ---------------------- |
| 1   | 核心矛盾為輔   | 真實內在張力織成一個 facet 或次要軸，服務「理解」不是「拆穿」    | 人物／機構有真張力     |
| 2   | 時代縮影       | 主體＝看更大台灣故事的一扇窗                                     | 代表一個轉變／世代     |
| 3   | 傳承與世代     | 透過「從誰手上來、往誰手上去」寫                                 | 工藝／家族／運動／劇團 |
| 4   | 感官場景沉浸   | 用可聞可看的場景堆，不用論點開場                                 | 食物／地方／文化       |
| 5   | 多元視角並陳   | 2-3 個線性獨立視角並列成 facet，讀者自己同時握                   | 有真多元／政治敏感題   |
| 6   | 不可取代的瞬間 | 錨在讓主體無法被替代的那個畫面／選擇，再往外長廣度               | 人物                   |
| 7   | 好奇／謎題     | 真誠的「為什麼會這樣？」開場，立體地探索（**不是 gotcha 拆台**） | 有反直覺點的題         |

##### 第三型：多觀點立場議題探討矛盾型（公共議題，v7.8 新增）⭐

> **哲宇 2026-07-25 directive**：「未來多一個社會議題型的可以走『多觀點立場議題探討矛盾型』，像是房價、政策、環境、立場、教育等公共議題這些很適合」。
> 設計與 dogfood 校準：[reports/design-spine-type-3-public-issue-2026-07-25.md](../../reports/design-spine-type-3-public-issue-2026-07-25.md)；worked example：[knowledge/Society/外送專法.md](../../knowledge/Society/外送專法.md)。

**適用**：**進行中的公共議題**——房價、能源、環境、教育、勞動、都更、移民、稅制、交通建設。特徵是**多方都有正當立場**（不是誰明顯無理），而且爭論**還沒有結案**。

**跟前兩型的差別（一張表）**：

|              | 立體群像                     | **多觀點立場議題探討矛盾型**                       | 矛盾驅動（單軸）               |
| ------------ | ---------------------------- | -------------------------------------------------- | ------------------------------ |
| 適用         | 受愛戴的人／機構／傳統／地方 | **公共議題，多方都有正當立場**                     | 內在張力人物、單一可辯 claim   |
| 矛盾的地位   | 一個 facet（手法 1 為輔）    | **脊椎，但矛盾是結構性且未解的**                   | 脊椎，文章替一個 thesis 辯護   |
| 論點形態     | 統合式洞見                   | **「這場爭論的形狀是什麼」＋「誰的帳沒被算」**     | 可被反駁的主張，文章證明它     |
| 收束         | 慶祝＋理解＋廣度             | **不收束成一方勝出**；但明確指出重心被放錯在哪     | 收束成一個立場                 |
| 讀者離場     | 「原來如此，真好」           | **「我知道在吵什麼，也知道自己還缺哪塊判斷依據」** | 「我被說服了／我想反駁」       |
| 最大失敗模式 | 慶祝式面向清單（維基化）     | **(a) 退回立體＝把不對稱寫平 (b) 滑成單軸＝選邊**  | contrarian thesis 硬塞受愛戴題 |

**判準（v7.9 起三問，取代舊的兜底）**：

> 1. **這件事現在正在被公開爭論嗎？** 2. **爭論的各方都有正當立場嗎？** 3. **有沒有一個此刻可指認的戰場**（法案審查中／事件偵辦中／剛開完的記者會／明確的上路日或期限）？
>
> - 三個都 yes → **第三型**（在 research report 寫 `spine_type: 矛盾驅動` ＋ `curatorial_techniques: [多元視角並陳（手法5，主）]` ＋ `unlock_reason`）
> - 1、2 yes 但 3 no（多方對立卻沒有此刻的戰場——慢性結構題如高教退場、少子化）→ **立體群像＋手法 5**，矛盾當引擎不當拆穿工具；這類題的核心矛盾通常是一條可指認的時間差／設計落差（開門用了十年、關門的規則遲到二十年），統合式洞見收尾比「把判斷交還讀者」更誠實（2026-08-06 文體類型學研究，高教擴張與退場證據）
> - 1 yes、2 no（有一方明顯站不住）→ 單軸矛盾驅動
> - 1 no → 立體群像畫布

⚠️ **這條收窄了「拿不準 → 立體群像」的兜底**：拿不準**且不是進行中的公共爭論** → 立體群像。**是**進行中的公共爭論 → 不准用「拿不準」躲進立體群像。理由見下方誕生事件。

**第三型的六條專屬紀律**（全部來自外送專法實跑或編輯室實際攔下來的，非推演）：

1. **政治歸屬之爭不得承載 thesis 重量**。「這件事該記在誰頭上」的藍綠白攻防是噪音、撐不起論證，還會命中 [§自主權邊界](../semiont/MANIFESTO.md)。降為一句中立並陳（僅雙方逐字、不評動機），thesis 改由**制度性事實**承載。
2. **每一方要有自己的逐字聲音；陣營內部光譜不可被單一發言人收攏**。外送專法最大的 falsify 就是「工會不是單一聲部」——感謝式與監督式出自不同組織。**引任何一方發言不得暗示它代表該方全體**（該篇連「代表 14 萬人」這個數字都無法驗證）。
3. **「誰手上有麥克風」的不對稱本身是一個 facet，不是要抹平的瑕疵。**
4. **但沉默不可被代言**。查不到某一方的聲音 → 如實寫「找不到」＋列出可能原因，**不選一個當結論**。
5. **關於「討論本身」的 negative finding 是合法內容**（例：查無任何人用「妥協」框架定性此法）。第三型特別容易誘發「為了平衡而製造反方」，negative finding 是對治工具。
6. **官方的「不回答」是可寫的主體**。公共議題幾乎都有一層「大家以為它說了什麼」——**把二手 gloss 跟法條／官方文件原文分開查**（外送專法的「去身分、重權益」全網通行，但不是法條文字）。

**校準數據（外送專法實跑，供後續同型參考）**：7 節、9,700 CJK、62 腳註、6 個 tw-\* 模組。H2 篇幅平衡（706–1,962 CJK）**但四方提及次數嚴重不均**（外送員 128／平台 101／消費者 27／店家 19）——**這是第三型的系統性傾向**：可得來源最少的一方必然最薄。正確處置不是硬湊平衡，是**把那個不對稱本身寫成一個 facet**（該篇 s6 的作法）。

##### 例外：矛盾驅動當主脊（需明確理由解鎖）

**default 硬度（哲宇 2026-07-06 拍板）**：矛盾驅動當**整篇主脊**是例外，**只在真正的公共爭議 / 政策辯論 / 需要一個 thesis 才誠實的題目**解鎖，且必過 [Step 0.6.7](#step-067-立體--炎上--政治立場-self-checkv76-新增-hard-gate) 炎上 + SSODT 三讀者。**對「人物」幾乎永遠不當主脊**——人物一律立體群像 +（若有真張力）核心矛盾為輔（手法 1）。

**解鎖判準（一個問題，翻轉自 v7.6）**：預設立體群像，問「**有沒有一個真公共爭議，需要一個 thesis 才能誠實處理？**」沒有（絕大多數）→ 立體群像 + 1-2 手法。有 → 在 research report 明確寫下 `unlock_reason`，才解鎖矛盾驅動主脊。**拿不準且不是進行中的公共爭論 → 立體群像**（v7.8 收窄，見上方第三型判準）。

##### 立體群像的四條紀律（避免寫回論戰 / 避免變平）

1. **多面並陳**：facet 並列不偏押一條。Stage 1 研究 + fact-pack **主動配額 cover 慶祝／廣度面**，對沖 salience bias（爭議天生生出更多 source）。
2. **爭議當厚度不當主軸**：批評／爭議能進，framing 是「這主題大到容得下這些討論 = vitality」，不是「我來證明它有問題」。
3. **不把第三方主題寫成自己的宣言**：非政治主題不把政治／兩岸／主權當脊椎或壓軸（命中 §自主權邊界 → Step 0.6.7）。
4. **立體 ≠ 平、≠ 百科**（v7.7 新增護欄）：立體不是「不用有觀點」——退回維基是失敗。7 手法就是確保每篇有一條會呼吸的主軸 + 一個 takeaway，只是那個 takeaway 是「原來如此、真好」不是「原來他有問題」。

**落檔**：research report frontmatter `spine_type: 立體群像`（例外時 `矛盾驅動` + `unlock_reason: 一句話`）+ `curatorial_techniques: [手法 N, ...]`。
**第三型的落檔形態**：`spine_type: 矛盾驅動` + `curatorial_techniques: [多元視角並陳（手法5，主）, ...]` + `unlock_reason` + `core_contradiction`（≤30 字）。三者缺一即視為未判 spine。

##### 文體族查表＋正交模組（v7.9 新增，optional）📖

> 誕生：2026-08-06 文體類型學研究——8 條 lane 細讀 22 篇深度文後發現，立體群像帽子下已自然分化出多種被實戰驗證的骨架形狀（人物三型／物件透鏡／決定考古／機構傳記／週期活動／命題式），每篇都在編輯室臨場重新發明同一套規則。設計報告：[reports/design-文體類型學升級-2026-08-06.md](../../reports/design-文體類型學升級-2026-08-06.md)。

判完三型之後（在畫布內），**查 [PROJECTION-PATTERNS.md](../editorial/PROJECTION-PATTERNS.md) §〇 路由表選文體族**（P1-P8），選中的寫進 research report frontmatter `spine_pattern: P{N} {名稱}`。**這一步是 optional**——查不到合身的族就留空，通用立體群像照舊跑；族是投影預設集（成套的論點形態＋骨架形狀＋舉證義務＋失敗模式），不是新的必選判定。

同一步順檢三個**正交模組**（可疊加在任何 spine 上，定義在 PATTERNS §五）：

- **M1 認識導覽前置**：一般讀者無法不查資料說出主題「是什麼規模、誰辦的」→ 第一節座標縫進物質細節（馬祖 v3「座標軸為零」教訓）；研究太薄時整篇可誠實降為純導覽
- **M2 解釋器＋自救層**：讀者有具體可操作的下一步且操作介面是議題載體 → call-out box 承載，減法不砍光
- **M3 事件追蹤模式**：調查／訴訟／修法進行中 → 動詞強度綁一手來源、骨架留縫、delta 投影不重寫（苯駢芘 `EVOLVE-delta`）

#### Step 0.1.6: Run profile 選檔（v9.5 新增）⚙️

> 三檔定義 canonical 在 [REWRITE-PIPELINE §Run profiles](REWRITE-PIPELINE.md#run-profiles)。
> 本 step 只做路由判定，spine 型判完（0.1.5）接著判。

**判定規則**（由上往下，第一條命中即停）：

1. 哲宇 in-loop 指定 → 照指定。
2. S 級野心／政治敏感／預期大眾爆點題 → **flagship**（逐項 opt-in）。
3. A 級（≥50 footnote 或 ≥3000 字野心或直接引語 ≥10）／callout-triggered EVOLVE／
   在世爭議人物／spine=矛盾驅動或第三型 → **standard**。
4. 其他（多數深度文：立體群像的機構／地方／工藝／文化記憶題）→ **standard-lite**。

**落檔**：research report frontmatter `run_profile: lite|standard|flagship`＋一句話理由。
**判錯的回路**：lite 文被讀者 callout → 該文升 standard 級複驗＋本規則檢討（進 LESSONS，
是進化訊號不是個案）。cron／routine context 拿不準 → 預設 standard，不預設 lite
（無觀察者時寧可多付檢查）。

#### Step 0.2: 既有素材萃取（條件式）

**Skip 條件**：mode = Fresh。

**完整素材萃取方法論**見 [`RESEARCH.md` §七](../editorial/RESEARCH.md#七進化模式的素材萃取stage-0)。

##### 三大動作

**1. 提取事實清單**：人名、年份、數字、引語、有效 URL。

**2. 標記問題類型**：

| 標籤           | 意義                                                          |
| -------------- | ------------------------------------------------------------- |
| `[LIST-DUMP]`  | 後半段是 bullet list 堆砌，沒有場景敘事                       |
| `[THIN]`       | 本應深寫的段落只有一兩句帶過                                  |
| `[STALE]`      | 數字 / 日期過期（如「目前 13 國邦交」實際 12 國）             |
| `[PLASTIC]`    | 塑膠句堆砌（「不僅⋯⋯更是⋯⋯」「展現了 X 精神」）               |
| `[FLAT-END]`   | 結尾罐頭收（「值得我們紀念」「繼續書寫」）                    |
| `[STUB-TITLE]` | title 是百科名詞 stub（如「台灣無人機產業」），需升冒號三明治 |
| `[NO-MEDIA]`   | 無 hero / 無 §圖片來源 = pre-gate 遺珠（v3.1 後新增）         |

**3. Frontmatter audit**（v4 新增，承襲 v3.1）：

- title 是否走「主題：副標 hook」冒號三明治？stub → 標 `[STUB-TITLE]`
- description 是否吃進當前 EVOLVE 的新核心？舊 description 還適用嗎？沒有 → 同 commit 升級
- frontmatter `image:` + `imageCredit` + §圖片來源 是否齊全？無 → 標 `[NO-MEDIA]`，走 Step 1.9 補跑

##### Merge variant 萃取兩篇的事實

- canonical 的事實清單：照常標 [LIST-DUMP] / [THIN] / 等
- 將被刪那篇的事實清單：標 `[MERGE-IN]`，列出「對方有但 canonical 沒有的視角/場景/數據」
- Step 0.5 之後的研究範圍 = canonical 缺口 + `[MERGE-IN]` 視角的補強查證

範例（Issue #626 台灣交通 2→1）：Geography 篇獨有「中央山脈/桃機/高雄港」三個視角 → 標 `[MERGE-IN]` → Stage 1 補查雪山隧道 12.9km、桃機 4,400 萬客、高雄港全球排名第 18 → Stage 2 寫成 canonical 的兩段新章節。

##### Boundary variant 三類劃分

Step 0.2 萃取既有素材後**強制**分成三類：

1. **保留** — 落在本篇純化 scope 內，繼續用
2. **吸納** — 別篇現有但寫得比本篇好的素材（標 `[ABSORB-FROM-X]`）
3. **移除** — 落在別篇 scope 內（標 `[MOVE-TO-Y]`），本篇刪掉、後續 phase 接收篇吸納

**跨 phase handoff 鐵律**：Phase 1 ship 後留 INBOX entry 給 Phase 2-N 接力，entry 必須含：

- 本篇純化 scope（年代 / 主題切片）
- 從上一 phase `[MOVE-TO]` 接收的素材清單
- 預期 cross-link 對象（哪幾篇是 sibling）
- 接力者 5 分鐘自檢題：讀完 entry 能否回答「我這篇要寫什麼、不寫什麼、邊界在哪裡」？

⚠️ **萃取完畢後，舊文不再被參考。只看事實清單進入後續 step。**

**萃取清單落檔（v9.2）**：Stage 0 gate 通過後，主 session 把萃取清單＋問題標記 append 至
research report 尾端 §舊文素材萃取（orchestrator-owned section，避免與觀點 agent 寫檔 race）。
否則清單只活在觀點 agent prompt 的 {EVOLVE_ONLY} 槽裡，Stage 2 writer 讀 report 看不見
（2026-07-16 高教 dogfood F5）。

#### Step 0.2-bis: 拆除防火牆（Teardown Firewall）— callout-triggered EVOLVE 強制 🔥🧱

> 🔗 **callout-triggered 勘誤的端到端流程（分類→查證→修→通知→記錄 + 【勘誤通知】格式）canonical 在 [CORRECTION-PIPELINE.md](CORRECTION-PIPELINE.md)。本 step 是其中「需要全文重寫時的拆除防火牆」那一塊**——讓 callout 不污染觀點與正文。
>
> **觸發**：EVOLVE 的觸發來源是「外部錯誤 callout」（讀者 / 領域專家 / peer / 我自己的 factcheck 發現「舊文錯了 A↔B」），而不是單純「品質提升」。
>
> **背景**：2026-06-01 配樂專業讀者 peilinwu0702 第二輪 callout。第一輪指出 `台灣影視配樂` 作曲家↔作品大量誤植 → 走 EVOLVE 重寫 → 事實層確實修對了（25 footnote 全一手）→ **但讀者第二輪罵的是「整篇充滿 AI 道歉 / AI 澄清、架構從頭就有問題」**。診斷：[reports/reader-callout-pipeline-diagnosis-2026-06-01.md](../../reports/reader-callout-pipeline-diagnosis-2026-06-01.md)。

##### 投毒機制（為什麼「只提取事實」這條鐵律會失守）

「舊文是病毒，只提取事實」是 Step 0.2 既有鐵律。但 callout-triggered EVOLVE 多了**第二層毒**：

1. **舊文 body** 在 session context window 裡（你讀它來萃取事實）。
2. **callout 本身**（「你把 X 配給 Y 是錯的」一連串勘誤）也在 context 裡。
3. Step 0.6 觀點成型若參考「為什麼舊文寫不好」（原 v6.0 reflexes #3 允許）→ **觀點 = 校正清單的昇華**。

結果：文章的論點脊椎變成「不要搞錯名字 / 名字很重要」（影視配樂 v2 thesis「搞錯名字就是搞錯聲音的出處」正是如此），正文散落「把 X 掛在他名下其實是錯的」「常被誤記成 Y」式的 9 處校正型句子 + 校正型策展 box。**「別人會搞錯」的那個「別人」就是這篇文章的前一版。** 讀者一眼看穿這是 AI 在公開處理自己的道歉。這是 `feedback_red_line_anxiety_leak`（別把來源焦慮漏進正文）的**架構級放大**：從「焦慮漏進句子」升級到「校正焦慮變成全文脊椎」。

##### 三條防火牆規則（callout-triggered 強制）

**規則 1 — callout → 純 fact-checklist，用完即丟**

callout 是線索不是 source（[REFLEXES #16](../semiont/REFLEXES.md)）。把它拆成 `[CALLOUT-VERIFY]` 逐條，**只餵 Stage 1 查證**（每條對一手來源重驗，連 callout 本身的 frame 都要查 — 影視配樂案：讀者也把 OPUS 誤記成雷亞，其實是 SIGONO）。查證完，**callout 文字本身丟掉，不進 Stage 0.6 觀點、不進 Stage 2 正文**。

**規則 2 — 觀點對 errata 失明（blind to errata）**

Stage 0.6 觀點成型**當作 Fresh 在做**：從題材本身 + 一手研究長出觀點，**像舊文與 callout 從不存在**。「為什麼舊文寫不好」是 meta 觀察，落 research report §舊文診斷 + LESSONS-INBOX，**永遠不准進觀點、不准進正文**。

- 反指標自檢：我的核心矛盾 / 論點脊椎，是不是在講「歸屬要正確 / 不要搞混 / 名字很重要」？**是 → 觀點被 errata 投毒了，砍掉重想。** 一個配樂專家寫這題不會用「別搞錯名字」當主軸，他會用產業制度史 / 美學流派 / 世代傳承的真實骨架。

**規則 3 — Stage 2 寫作 context 隔離（架構解，非守備修補）**

「不再參考舊文」靠意志力做不到 —— 舊文 + callout 還在 context 裡就會 prime（[神經迴路：規則要能執行才算規則](../semiont/MEMORY.md)）。**強制隔離**：

- Stage 2 的寫作輸入 = `reports/research/{slug}.md` **整份 report（§6 fact-pack ＋ §8 raw verbatim 全部讀）** + §觀點成型 + EDITORIAL.md。**隔離掉的是舊文 body + callout，不是 report。**
- **Evolution mode：writer 寫到 staging 檔，永不 overwrite canonical（v7.5，2026-06-15 哲宇 callout）**——Write tool overwrite 既有檔**必須先 Read**，所以叫 writer「overwrite 舊文但別讀舊文」是自相矛盾、它被迫吃病毒。**改成**：writer 把成品 Write 到 **`reports/article-evolve/{slug}.md`**（全新檔、零感染面），**Stage 2.5 主 session 讀 staging ＋ 舊 canonical 比對後親手覆蓋** `knowledge/{cat}/{slug}.md`。
- **首選**：spawn 一個 fresh writer agent（Step 1.8 既有 spawn 機制），**prompt 一律 copy [WRITER-PROMPT.md](WRITER-PROMPT.md) 薄殼模板填槽**（v7.11，禁即興手寫——即興＝每次規則不一、漏讀 EDITORIAL/pipeline＝飄移根因，哲宇 2026-07-12 callout）。**薄殼三件事、craft 規則零複寫**（v2.0，「極致 thin shell 不要重複」）：(1) 指向必讀四份 canonical——**合成後單檔** research report（[Step 1.7.4](REWRITE-STAGE-1A-RESEARCH.md#174-合成單檔鐵律sibling-是中繼站stage-2-前必-consolidatev711-)）＋ EDITORIAL 全檔＋本檔 Stage 2＋ **graph.md**（資料/對比/時序必評估視覺化——2026-07-12 茶文化 v1 零視覺化教訓）；(2) **read-receipt** — writer 動筆前 quote §8 texture ×3＋EDITORIAL 引例＋viz 模組宣告＋spine 宣告，主 session 逐項核對真偽，quote 不出來＝沒讀＝退回；(3) 機械輸出契約＋per-article 素材槽。⚠️ **反 pattern（v7.4，2026-06-15 哲宇 callout）：orchestrator 把 report 再摘要成精簡 fact-pack 塞進 prompt、又叫 writer 別讀 report ＝ 雙重失真，近期文章變爛的根因。**
- **主 session 自寫時**：Stage 2 期間**不准重新打開舊文檔案**，但**必讀整份 research report（含 §8 raw verbatim）**。寫完跑下方 Step 3.2-bis backstop。

##### Backstop 自檢句（Stage 3 hard gate，見 Step 3.2-bis）

> **「如果這篇文章第一次就寫對了，這個句子 / 這個 box 還會存在嗎？只為回應過去的錯誤、或為了澄清一個混淆而存在的，刪。」**

**Anti-example（影視配樂 v2 live，2026-06-01）**——這 9 處全部該被 backstop 攔下：

- 正文校正句：「把《海角七號》或《賽德克》的配樂掛在他名下，反而抹掉了…」「常被誤記成雷亞作品，其實出自 SIGONO」「把《茶金》…都記到他名下，反而蓋掉了他自己那座金馬」「順帶把遊戲和電影分清楚」
- 校正型策展 box：照片下方「把林強跟林生祥搞混，看起來只是拼錯一個字…」「叫錯一個名字，就把三種判斷攪成一團模糊讚美」
- 投毒的論點脊椎：「搞錯名字就是搞錯聲音的出處」

#### Step 0.3: 選 canonical（Merge variant only）

比較候選文章，挑一篇當保留方。判準（按優先序）：

1. **EVOLVE 狀態**：已 EVOLVE 過的場景式 > 未 EVOLVE 的條列式
2. **腳註密度與一手來源**：高 > 低
3. **`lastHumanReview: true` 優先**
4. **slug 持續性**：對外連結多的 slug 優先保留（少斷鏈）
5. **category 切合度**：主題真正屬於哪個 category（如交通歸 Lifestyle 比 Geography 自然）

#### Step 0.4: 範圍切片表（Boundary variant only）

對所有涉及篇章做一次 audit，產出範圍切片表：

```
| 篇                | 範圍切片        | 處理方式        |
|-------------------|-----------------|-----------------|
| C 戰後台灣文學    | 1945-1987       | EVOLVE Phase 1  |
| B 解嚴後台灣文學  | 1987-2000       | EVOLVE Phase 2  |
| D 當代台灣文學    | 2000-           | EVOLVE Phase 3  |
| A 全景索引        | 已被 B+C+D 覆蓋 | dropped Phase 4 |
```

切片邊界明確（年代 / 議題 / 地理），**每篇都有自己的純化 scope**，不重疊。

#### Step 0.5: 載入研究方法論 + 模板

```bash
cat docs/editorial/RESEARCH.md       # 方法論：搜尋策略 / 來源判斷 / 避坑
cat docs/editorial/RESEARCH-TEMPLATE.md  # 填空模板
```

#### Step 0.6: 觀點成型（編輯前思考）⭐ HARD GATE

> **沒有觀點之前，每一次搜尋都是亂槍。**
> Stage 0 末、Stage 1 取材之前的最關鍵步驟。
> 以**總編輯視角**做預編輯思考，產出 §觀點成型 落 research report。

> 🚨 **Stage 0.6 = 兩件都必做，缺一不進 Stage 1**（v7.7 2026-07-06：persona 已從 Stage 0 移到研究後，見下）：
>
> 1. **0.6.1 六個核心問題** — 總編輯視角自問，形成立體觀點，必答落檔
> 2. **0.6.4 ≥ 20 次探索搜尋** — 建 pre-search source map + 長出 grounded 立體觀點，**這才是「初步研究」本體**
>
> 兩個是不同動作：**六題給編輯視角形成立體畫布、≥20 探索給事實地基**，誰都不能省、誰都不能替代誰。
>
> **⚠️ persona（20 路讀者切入點）v7.7 搬到研究後**（[Step 1.9.7](REWRITE-STAGE-1B-MEDIA.md#step-197-persona-讀者缺口稽核--增補v77-新增-persona-從-stage-0-搬來)）：原本放 Stage 0（搜尋之前），但冷讀者天生問尖銳問題，放搜尋之前會把主軸往矛盾驅動推歪（施振榮 v1 教訓）。搬到研究報告 SSOT 之後，persona 從「發散定調」改成「讀者缺口稽核＋增補」——對已成形的立體觀點補洞，不再定調脊椎。設計：[reports/design-立體群像...](../../reports/design-立體群像-default-persona-reposition-2026-07-06.md)。

##### Step 0.6.1: 六個核心問題（必答，落檔）

每篇 depth article 都必須答完這六題，寫進 research report 的 §觀點成型 section：

**問題 1: 對台灣人是什麼樣的記憶？**

- 大眾共有的 anchor 是什麼？（某個物件、某個場景、某句話、某段歷史）
- 不同世代記憶有差異嗎？（戰前 / 戰後 / 解嚴前後 / 網路世代）
- 範例（蘋果西打）：熱炒店冰箱的紅標金黃瓶 / KTV 包廂的玫瑰紅加蘋果西打 / 辦桌宴席桌上 / 阿嬤遞給孫子的解膩飲

**問題 2: 有什麼樣的多元不同面貌？**

- 主流敘事是什麼，支線敘事 / 被忽略的角度是什麼
- 北部 vs 中南部 / 不同族群 / 不同產業 / 不同政治文化背景的視角
- 範例（蘋果西打）：「國民飲料」文化記憶 vs 上市公司資本史 vs 兩次食安疑雲 vs 跨海 K-pop 加持

**問題 3: 大家對它的想法跟感受是什麼？**

- 正面、負面、複雜情感的 fault lines 在哪
- 反對聲音、被忽略的角度、被過度浪漫化的盲點
- 範例（蘋果西打）：老一輩懷念 / 中年人 KTV 記憶 / 年輕人未必喝過但聽過 / 食安事件後信任崩塌 / 圭賢加持後 K-pop 流量

**問題 4: 歷史脈絡是什麼？**

- 它怎麼形成、誰塑造、何時轉折
- 跟更大的社會 / 政治 / 經濟 / 文化變遷的連動
- 範例（蘋果西打）：1965 美台混血起源 / 1970-80 國黃汽水時代 / 1985 十信案 / 1990 鴻源案 / 1995 商標贖回 / 2018 食安 / 2024 賣地

**問題 5: 對社會 / 歷史 / 環境 / 我們人生的關聯是什麼？**

- 為什麼今天 still matters？
- 它解釋了什麼、它是什麼的縮影
- 讀者讀完對自己的生活有什麼新的看法
- 範例（蘋果西打）：一瓶飲料壓縮台灣 60 年金融 / 食安 / 外交縮影；文化記憶 vs 公司資本兩種記憶並存

**問題 6: 類型專屬問題（按 category 加重）**

見下方 §類型加權矩陣。

##### Step 0.6.1-bis: persona 已移到研究後（v7.7）→ 見 [Step 1.9.7](REWRITE-STAGE-1B-MEDIA.md#step-197-persona-讀者缺口稽核--增補v77-新增-persona-從-stage-0-搬來)

> **v7.7（2026-07-06 施振榮）**：persona 20 路讀者切入點原本放這裡（Stage 0，搜尋之前），v7.7 搬到 [Step 1.9.7](REWRITE-STAGE-1B-MEDIA.md#step-197-persona-讀者缺口稽核--增補v77-新增-persona-從-stage-0-搬來)（研究報告 SSOT 之後）。**Stage 0 不再跑 persona。**

**為什麼搬**：persona 的價值仍然成立——六題都從同一個總編輯視角長出，漏掉真實讀者（12 歲小孩、在台日本人、政治冷感工程師、海外台僑二代、挑硬傷的專家）天差地別的入射角。但**冷讀者天生問尖銳問題**，放在搜尋之前，那些尖角會變研究方向 → 變切入點 → Stage 1.4 找一個對得上的矛盾 → 脊椎天生長矛盾形。**persona-at-Stage-0 有內建的、偏矛盾驅動的重力**（施振榮 v1：persona 冷問「虧千億還被叫老師 / 交學費誰付」把脊椎推向矛盾驅動）。

放研究後，同一句尖銳問題從「整篇該不該講這個」變「要不要加一個 facet 好好回應」——**從定調變補洞**，剛好接住 persona 誕生的 use case（2026-06-13《看不見的國家》ship 後哲宇追問「影響 / 心得 / 還在努力的人」三題，本質就是完成度缺口，正該在 ship 前被 persona 稽核接住）。

**Stage 0 的研究廣度改由**：六核心問題（0.6.1）＋ ≥20 探索（0.6.4）＋ [Step 0.1.5](#step-015-spine-類型判定v77-重構--立體群像是預設畫布) 的 **7 手法選單**補——手法天然生出廣度與慶祝面的角度，不是尖角。編輯腦形成立體畫布，讀者腦（persona）研究後稽核完成度，乾淨的分工。

##### Step 0.6.2: 七個品質維度 anchor

寫文時隨時對照，從 Stage 0 開始就要問「我的初步觀點能不能在這 7 個維度都站住」：

| 維度              | 提問                                                                           |
| ----------------- | ------------------------------------------------------------------------------ |
| **溫度**          | 哪些細節讓讀者感覺「真有人在現場」？衣服顏色、說話口氣、桌上的杯子、那天的天氣 |
| **人味**          | 文章的第一個名字是誰？至少有 2-3 個具體人物？人物文要有 ≥ 3 句直引             |
| **故事**          | 不是 list 也不是規格表，是因果鏈跟轉折                                         |
| **策展**          | 我的觀點是什麼？我把空間搭好讓讀者怎麼進去                                     |
| **觀點**          | 通行說法是 X，但我認為更接近真相的是 Y                                         |
| **體驗**          | 讀者讀完帶走什麼新的看世界的方式                                               |
| **歷史/社會關聯** | 這件事是什麼的縮影？跟更大的台灣 / 世界有什麼連動                              |

##### Step 0.6.3: 類型加權矩陣

| Category                                         | 加重維度                             | 必想的問題                                                                       |
| ------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------- |
| **People（人物）**                               | 想法、選擇、意義、不可取代的瞬間     | 為什麼這個人對台灣重要？他不可被替代的選擇是什麼？讓他不可替代的瞬間是哪個畫面？ |
| **Food / Culture / Lifestyle（文化飲食生活）**   | 感官、場景、地緣、地理、跟生活的連結 | 在哪裡、什麼時候、跟誰一起、什麼樣的氣味聲音畫面？這個地方為什麼能養出這個？     |
| **History / Politics / Society（歷史政治社會）** | 當代意義、爭議、未完成的問題         | 為什麼今天還重要？誰仍在受影響？哪些問題還沒被解決？                             |
| **Technology / Industry（科技產業）**            | 台灣的位置、全球供應鏈、未來方向     | 台灣做這件事的不可取代性是什麼？跟世界什麼樣的依存關係？                         |
| **Nature / Geography（自然地理）**               | 地方感、生態與社會交織、土地與人     | 這片土地怎麼形成、誰在這裡生活、人和地有什麼共生                                 |

##### Step 0.6.4: 探索研究（≥ 20 次，v6.4 升級）

> **v6.4 升級**（2026-06-04 深度研究-設計研究院 session）：原 ≤ 5 次「輕量探索」升為 **≥ 20 次探索研究**。觸發：量測 226 份歷史 research report 發現 57% 英文/國際/學術來源 = 0、42% distinct 來源 ≤ 10，研究深度系統性不足。哲宇 directive「Stage 0 20+ / Stage 1 80+ / 對標研究所論文標準」。≤ 5 次只夠「確認東西存不存在」，長不出 grounded 觀點，也建不出 pre-search source map。

Stage 0.6 跟 Stage 1.1 的差別不是「搜幾次」，是**搜的目的不一樣**：

- **Stage 0.6 探索研究**：**≥ 20 次**，目的是**建框架 + 形成 grounded 觀點 + 畫出 pre-search source map**
  - 確認基本事實 + 時間軸 + 主要利害關係人
  - 找出未知的支線敘事與多元面貌（讓我知道有哪些角度可以深挖）
  - **盤點來源地圖**：這題有哪些中文一手（官方/年報/法規/學術）、哪些英文/國際/學術視角、哪些反方陣營——標出來給 Stage 1 deep-dive 排程
  - 確認類型加權矩陣的問題能不能對應到具體素材
- **Stage 1.1 深度搜尋**：**≥ 80 次**（v6.4 升級），目的是**驗證 / 反駁觀點 + triangulate + 累積寫作素材**

**全部 ≥ 20 次探索搜尋的 query + 一句話發現必須寫進 research report §探索搜尋紀錄**（per Step 1.7 SSOT 鐵律——搜了沒寫回 = 沒搜）。觀點不需要在 Stage 0 完全鎖死，Stage 1 會 refine；但「先搜夠 20 次再下觀點」是硬要求，避免 searched-first 補丁式觀點。

##### Step 0.6.5: §觀點成型 落檔格式（HARD GATE）

寫進 `reports/research/YYYY-MM/{slug}.md` **開頭**（在搜尋結果之前），標準模板：

```markdown
### 觀點成型（編輯前思考）

#### 對台灣人的記憶 anchor

- {物件 / 場景 / 句子 / 段落}
- {不同世代差異}

#### 多元面貌

- {主流敘事}
- {支線 / 被忽略的角度}
- {正面 / 負面 / 矛盾的感受 fault lines}

#### 歷史脈絡（pre-search hypothesis）

- 形成期：...
- 關鍵轉折：...
- 當代意義：...

#### 20 路 persona 切入點（Step 0.6.1-bis，4 sub-agent 發散）

> 🆕 新入射角併入下方 §切入點清單；⛔ 超 scope 落 `rationale.whats_excluded`。

| persona（軸 / 自介） | 聽到題目想問的 | 分類         |
| -------------------- | -------------- | ------------ |
| {A · 78 歲阿公}      | {他想問的}     | 🆕 / ✅ / ⛔ |
| {B · 海外台僑二代}   | ...            | ...          |
| ...                  | ...            | ...          |

#### 切入點清單（待搜尋驗證 / 反駁）

1. {切入點 1}：{為什麼立體}
2. {切入點 2}：...

#### 脊椎（依 spine 類型，Step 0.1.5）

> **矛盾驅動 spine** → 填核心矛盾候選 A/B/C（待 Stage 1.4 收斂）：
>
> - A：{≤ 30 字} / B：{≤ 30 字} / C：{≤ 30 字}
>
> **立體群像 spine（default，受愛戴機構/傳統/地方）** → 填組織主軸 + facet 清單（**不逼尖銳矛盾**）：
>
> - 組織主軸（through-line，一句溫暖的）：{...}
> - facet 清單（≥ 4，並列不偏押）：[天王天后 / 多元面貌 / 制度肌理 / 經典時刻 / 幕後 / ...]
> - 爭議若有 → 列為其中一個 facet，標「當厚度不當主軸」

#### 研究方向（要搜什麼可以驗證）

- {方向 1}
- {方向 2}

#### 預想讀者帶走的那一件事

- {一句話}

#### 探索搜尋紀錄（≥ 20 query，**必填** — per Step 0.6.4，persona 不算搜尋、這是初步研究本體）

- {query 1 + 一句話發現 + [source](URL)}
- {query 2 + 一句話發現 + [source](URL)}
- ...（**≥ 20 條**；少於 20 = Stage 0 未完成，不進 Stage 1）
```

落檔後 research report frontmatter 加：

```yaml
spine_type: 立體群像 # 或 矛盾驅動（Step 0.1.5）
viewpoint_formed: true # Stage 0.6 通過
```

##### Step 0.6.6: 邊界

- **不是 hypothesis 預設**：觀點成型 ≠ 預設答案。後續搜尋可能反駁、深化、轉向你的初步觀點，那是好事。Stage 1.4 找矛盾鎖定才是 fact-confirmed 收斂
- **Hub 頁 / 短修正**：可跳過。本 step 為 depth article 設計
- **EVOLVE 模式**：本 step 在 0.2 萃取舊素材 + 0.5 載入方法論 之後跑 — 有了「舊文為什麼寫不好」的資訊，觀點成型更精準

##### Step 0.6.7: 立體 / 炎上 / 政治立場 self-check（v7.6 新增）🧱 HARD GATE

> 觀點成型落檔前過三道。任一不過 = **砍掉重想觀點，不進 Stage 1**。這三道是 [Step 0.1.5 spine 類型](#step-015-spine-類型判定v77-重構--立體群像是預設畫布) 的下游驗收——專治「立體主題被寫成論戰 + 炎上」。

1. **SSODT 三讀者測試**（所有 article）：
   - 支持 / 喜愛這主題的人讀完，**不覺得被攻擊**？
   - 質疑 / 批評這主題的人讀完，**不覺得在幫他宣傳**？
   - 對這主題陌生的人讀完，**能自己決定要從哪個維度繼續想**？
   - 三題全 yes 才過。任一 no → 觀點偏論戰/偏頗，重想。canonical：[LESSONS-INBOX 2026-04-29 α 政治敏感題 SSODT 立體框架](../semiont/LESSONS-INBOX.md)。

2. **炎上 self-check**（所有 article）：把脊椎 / 壓軸念給「立場跟我不同的長輩」聽，是「認真在介紹這件事」還是「在吵架 / 在表態」？後者 → 退回立體群像，把對立框架拆成多 facet 並陳。

3. **政治立場 self-check**（非政治主題尤其要跑）：這篇的脊椎或壓軸，是不是把政治 / 兩岸 / 主權 / 統獨當主軸？
   - 主題**本身就是政治題**（政策 / 選舉 / 兩岸關係）→ 走 [Step 1.4.5 perspective scan](REWRITE-STAGE-1A-RESEARCH.md#step-145-perspective-scan--跨陣營對立-spectrum-覆蓋-) + 政治敏感題 SSODT 5-7 perspective 立體並列。
   - 主題**不是政治題**（機構 / 人物 / 文化 / 地方）卻把政治當脊椎或壓軸 → **這是把 MANIFESTO 主權 lens 誤當 content thesis（金曲獎 v1 教訓）**。命中 [MANIFESTO §自主權邊界 政治立場](../semiont/MANIFESTO.md#我的存在結構)：政治素材降為「**純中立紀實**」的一個 facet（只陳述事實、不下兩岸判斷、不用對抗語言、不當壓軸），**且這個處置交觀察者拍板**。

##### Stage 0 收尾 checklist

Stage 0 結束時 deliverable：

- [x] 模式識別完成（Step 0.1）— Fresh / Evolution / Merge / Boundary 之一
- [x] **spine 類型已判（Step 0.1.5）**— 立體群像（default，受愛戴機構/傳統/地方）/ 矛盾驅動（爭議/張力人物）；落 frontmatter `spine_type`
- [x] 既有素材萃取完成（Step 0.2，EVOLVE 才必跑）
- [x] 研究方法論已讀（Step 0.5）— `cat docs/editorial/RESEARCH.md` + `RESEARCH-TEMPLATE.md`
- [x] §觀點成型 section 已寫進 research report（Step 0.6.5）
- [x] 六個核心問題全答（Step 0.6.1）
- [x] **Stage 0 探索搜尋 ≥ 20 query 已落 §探索搜尋紀錄（Step 0.6.4）— 這是初步研究本體**
- [x] **spine 類型 + 手法選單已定（Step 0.1.5）**：立體群像 default + 1-2 手法；例外解鎖矛盾驅動須寫 `unlock_reason`
- [x] **文體族已查表（v7.9，optional）**：查 [PROJECTION-PATTERNS §〇](../editorial/PROJECTION-PATTERNS.md) 選族落 `spine_pattern`（或明確留空走通用畫布）；M1/M2/M3 正交模組觸發已檢
- [x] ~~20 路 persona 切入點~~ **v7.7 移到研究後 [Step 1.9.7](REWRITE-STAGE-1B-MEDIA.md#step-197-persona-讀者缺口稽核--增補v77-新增-persona-從-stage-0-搬來)，Stage 0 不再跑 persona**
- [x] 切入點清單 + 核心矛盾候選（矛盾驅動）**或 組織主軸 + ≥4 facet 清單（立體群像）** + 研究方向 已列
- [x] **Step 0.6.7 三道 self-check 過（v7.6）**：SSODT 三讀者測試 + 炎上 self-check + 政治立場 self-check 全綠
- [x] research report frontmatter `viewpoint_formed: true` + `spine_type: 立體群像 | 矛盾驅動`
- [x] **Stage 0 exit gate 儀器化過關（v7.3）**：`python3 scripts/tools/research-report-health.py reports/research/YYYY-MM/{slug}.md --stage 0` → `hard_fail=0`

**沒過（含 exit gate hard_fail > 0）= 不進 Stage 1。** persona-only（有 persona、缺 ≥20 探索）會被 gate 擋下。

---

### Cron 模式 + Routine 飛輪（2026-08-06 從 REWRITE-PIPELINE.md 主檔 verbatim 搬入，pipeline-shell-lint 瘦身）

> 主檔超過 550 行上限（lint 處方：內容長回索引了，該搬去 stage contract）。本節內容 verbatim
> 搬自主檔原 §Cron 模式 + Routine 飛輪，掛在 Stage 0（pipeline 入口 contract）——defer signal
> 的判斷發生在「進 Stage 0 之前」，Step 0.1.6 run profile 選檔也已在本檔記錄 cron context 的
> 路由規則，兩者同源。主檔僅留一行 pointer；歷史敘事與教訓原封不動。

> Cron 在單一 session 執行，無法真正分三個 session，但在 prompt 中強制分階段思考。

#### Token 預算分配

| 階段      | 佔比   | 常見錯誤                          |
| --------- | ------ | --------------------------------- |
| Stage 1   | 35-40% | 搜太多、每個結果都 web_fetch 全文 |
| Stage 2   | 40-45% | 前半段太細、後半段沒力            |
| Stage 3-5 | 15-20% | 跳過驗證直接 commit               |

#### Cron 鐵律（與手動執行不同的地方）

- **每批最多 1 篇**：v1 時期每批 3 篇，品質明顯不穩。改成每批 1 篇後品質大幅提升
- **不要 `git add -A`**：只 add 改動的文章和同步後的 `src/content/` 對應目錄
- **不要跑 `npm run build`**：Build 由 CI/CD 處理。sub-agent 跑 build 容易 timeout 且浪費資源
- **至少 7 分鐘**：Stage 1 3min + Stage 2 2min + Stage 3-4 2min = 最低要求

#### 合法 defer signal（六條，2026-07-25 收攏 canonical）

> **為什麼要有這張表**：`twmd-rewrite-daily` 每小時 fire 是哲宇刻意設定要消耗週額度
> （per MEMORY §神經迴路 hourly-cron-intentional），所以 **defer 的預設答案是「不 defer」**。
> 但 2026-06-22〜06-29 連續 7 個 instance 的 defer chain 顯示，有幾種情境 routine 每次
> 都在灰區自己判斷、每次都重新論證一遍，vc=7 已充分驗證。哲宇 2026-07-25 拍板
> （OBSERVER-QUEUE #13 到期預設）把它們寫成明列清單：**在表上的可以直接 defer 並一行帶過理由，
> 不在表上的一律 ship**。目的是讓 defer 從「每次重新說服自己」變成「查表」，
> 順便讓 defer noise 不再堆進 LESSONS。

| #   | Signal                        | 判準                                                                                                              | 來源                                         |
| --- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| 1   | 30 min duplicate              | 同一條 routine 30 分鐘內已 fire 過並 ship                                                                         | 既有                                         |
| 2   | 同篇 race                     | 目標文章正被別的 session／PR 動                                                                                   | 既有                                         |
| 3   | §自主權邊界 命中              | 政治立場 / >50 檔重構 / >10 篇刪除 / 對外溝通                                                                     | 既有（[MANIFESTO](../semiont/MANIFESTO.md)） |
| 4   | last-4hr manual rewrite       | 近 4 小時內有 manual rewrite ship，**或 finale-cluster 整段 wall-clock window 內**（不是只看最後一個 commit）     | OBSERVER-QUEUE #13，vc=7                     |
| 5   | post-promotion cooldown       | 剛 promote 的 DNA / EDITORIAL 規則還沒被任何一篇 dogfood 過 → 留給下一個 prime time，別讓新規則首發在無人 cron 上 | OBSERVER-QUEUE #13                           |
| 6   | per-day throughput saturation | 當日已達 rewrite 產出上限（同日多篇 ship 後品質會掉，per §Cron 鐵律「每批最多 1 篇」的日層延伸）                  | OBSERVER-QUEUE #13                           |

**Pre-flight gate（2026-07-24 memory vc=4 補進來）**：cron 進 Stage 0 之前先跑
`bash scripts/tools/lib/check-parallel-actor.sh`。回 `ACTOR_BUSY` 且 busy 的是
babel/fleet dispatcher 時走 signal 2 讓路——2026-07-24 兩條 rewrite-daily fire
（143931 / 191048）都是撞上 fleet 才自行讓路的，但當時 pipeline 沒有這一步，
是 session 自己想到的。想到不等於下次會想到，所以寫進來。

**不在表上的 defer 一律視為違規**，要在 memory 寫明為什麼判斷表不夠用（那是 pipeline 的
進化訊號，不是個案豁免）。

#### 選文指令

```bash
cd ~/taiwan-md && git pull
## 佇列頂端，跳過已重寫的
head -30 scripts/tools/rewrite-queue.txt
git log --oneline --since='2026-03-20' | grep -i 'rewrite:' | head -30
```

#### Commit 指令

```bash
bash scripts/core/sync.sh
python3 scripts/tools/article-health.py knowledge/[Category]/[文章名].md --profile=rewrite-stage-4
git add knowledge/[Category]/[文章名].md src/content/
git commit -m "rewrite: [文章名] — EDITORIAL v6.3 + Pipeline v5.0"
git push
```

#### Cron 狀態

| Cron                              | 狀態        | 說明                                                        |
| --------------------------------- | ----------- | ----------------------------------------------------------- |
| Taiwan.md Article Quality Rewrite | ❌ disabled | 每小時 1 篇，Opus model（舊）                               |
| taiwan-md-rewrite (v1)            | ❌ disabled | 舊版每小時 3 篇，已淘汰                                     |
| taiwan-md-content-sprint          | ❌ disabled | 內容衝刺（新文章），已淘汰                                  |
| **twmd-rewrite-daily**            | ✅ active   | 16:16 daily Opus（per [ROUTINE.md](../semiont/ROUTINE.md)） |

#### Routine 飛輪整合（v6.1 升級為 full-cycle，2026-05-24 哲宇 directive）

REWRITE 是 routine 飛輪 10 條核心 routine 之一（`twmd-rewrite-daily`）。**v6.1.1 起每天 18:00 晚間自動跑「研究 → 寫文 → 孢子 → 發文 → harvest」全 cycle**（v6.1.1 從 00:00 搬到 18:00 對齊台灣社群 20:00-22:00 prime time post）：

- **觸發**：`/twmd-rewrite` skill
- **Model**：Opus
- **Cadence**：每天 18:00 晚間（v6.1.1 — cycle 跑 ~150 min ~20:30 結束，spore post 落在台灣晚間社群活躍時段；v6.1 原 00:00 半夜 chain 已抽出）
- **Skill SOP**：[`~/.claude/scheduled-tasks/twmd-rewrite-daily/SKILL.md`](https://github.com/anthropics/claude-code-skills)（local mirror）
- **Stage chain（v6.1 full cycle）**：
  ```
  Stage 0 BECOME → Stage 1 git pull → Stage 2 article ship (REWRITE Stage 0-5 全跑) →
  Stage 3 commit + push article → Stage 4 SPORE chain（PICK=剛 ship article / VERIFY / WRITE / SHIP）→
  Stage 5 CI/CD wait gate v3.7（60 min cap，timeout → defer 不 abort）→
  Stage 6 social post（both Threads + X default per Routine context v3.8；單發只在 article frontmatter 標 `platformExclude` 才觸發）→
  Stage 7 SPORE-LOG + sporeLinks frontmatter + commit + push → Stage 8 /twmd-finale
  ```
- **Quality gate (article)**：article-health.py rewrite-stage-4 hard=0 warn=0 + 三源研究落檔 + 腳註合規 + frontmatter complete + word-count ≥ 4500
- **Quality gate (spore)**：article-health.py prose-health hard=0 score ≤ 3 + spore-writing hard=0 + 配圖 generated + AI pre/post-ship verify 5+6 條 PASS
- **Boundary**：本 routine 上限 ~150 min wall-clock（article ~60 min + spore prep ~15 min + CI wait ≤ 60 min + post ~10 min + log ~5 min）；超過 → spore defer + LESSONS entry（不 abort article ship）
- **不問 observer 鐵律**：所有 decision point 走 [SPORE-PIPELINE §Routine context 自動決策 defaults table](../factory/SPORE-PIPELINE.md#-routine-context-自動決策-defaults-v37-新增)

**為什麼 v6.1 升 full-cycle**（哲宇 2026-05-24 directive）：article ship 跟 spore 是同一條進化飛輪的兩端，分開跑會：

1. 缺一致性（article + spore 不同步、不同 angle）
2. Observer friction（每天要分兩次觸發、各自 review）
3. Cycle smoothness 數據缺失（無法 measure article→spore→broadcast 整體 throughput）

合一變 daily routine 後：每天 1 篇文章 + 1-2 條孢子（Threads ± X）自動發出，**進化飛輪自動轉**，observer 只在 escalation 時介入。

完整 routine 規格 → [ROUTINE.md §TWMD rewrite (daily)](../semiont/ROUTINE.md)。設計脈絡 + cycle smoothness 數據 → [reports/spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle.md](../../reports/spore-pipeline-evolution-2026-05-23-article-to-spore-to-broadcast-cycle.md)。

---

---

<!-- ==== source: REWRITE-STAGE-1A-RESEARCH.md @ 8d3e0ccbc ==== -->

## Stage 1 contract — 取材 A（研究 fan-out 與研究報告 SSOT）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L740-1123），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **職責**         | 帶 Stage 0 問題執行搜尋（**全篇 ~150 總量中的 Stage 1 份額 ~120-130，四隻各 ~30**；中≥40/英≥20/一手≥15/反方≥5）、收斂矛盾或組織主軸、組裝八段研究報告 SSOT、**整合與清理（1.7.5 六判準）**       |
| **執行者**       | orchestrator（主 session）＋ N 個 parallel Sonnet 研究 agent（prompt 一律 [RESEARCH-AGENT-PROMPT.md](RESEARCH-AGENT-PROMPT.md) 填槽，禁即興）                                                    |
| **INPUTS**       | research report §觀點成型（Stage 0 產物）；RESEARCH.md；RESEARCH-AGENT-PROMPT.md                                                                                                                 |
| **OUTPUTS**      | `reports/research/{YYYY-MM}/{slug}.md`（八段合成單檔；sibling raw 收件後 consolidate 刪除）                                                                                                      |
| **GATES**        | 每份分部報告收件當下：`python3 scripts/tools/agent-report-health.py {file} --claimed {配額}`（FAIL 不准合成）；stage 終：`python3 scripts/tools/research-report-health.py {report} --tier=depth` |
| **context 預算** | orchestrator 本檔＋收件；各研究 agent 只吃 RESEARCH-AGENT-PROMPT 填槽 prompt                                                                                                                     |

### AGENT PROMPT

研究 sub-agent 唯一 prompt 載體：[RESEARCH-AGENT-PROMPT.md](RESEARCH-AGENT-PROMPT.md)（含輸出模板＋來源逐條可溯契約＋anti-example 庫）。填槽派發，禁即興——2026-07-12 茶文化即興 prompt 讓 84 條來源行只 35% 帶 URL。

### 交付條件（stage 完成的定義）

- [ ] 每份分部報告收件當下 `agent-report-health.py {file} --claimed {配額}` exit 0（FAIL 不准合成）
- [ ] 全部 raw verbatim 落 report §8（收到通知的第一個動作；禁 scratchpad／tmp）
- [ ] sibling raw 檔 consolidate 進主檔後刪除
- [ ] **整合與清理六條判準過（Step 1.7.5）**——合成層零任務指涉、verification 三層是「決定」形態、Findings 事實自足
- [ ] `research-report-health.py {report} --tier=depth` exit 0（distinct≥25／en≠0／一手≠0／**合成層過程噪音 ≤3**）
- [ ] frontmatter 核心矛盾（或組織主軸＋facet）已鎖

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-1B-MEDIA.md（媒體＋persona 缺口）

---

### Stage 1: 取材（純搜尋執行，預算 25-30%）

**目標**：產出一份結構化研究筆記，讓 Stage 2「不需要再搜尋」就能寫。**帶 Stage 0.6 觀點成型的切入點 + 核心矛盾候選去搜尋驗證 / 反駁 / 深化**。

**必讀**（Stage 0.5 已讀完，這邊只是 reminder）：

- `docs/editorial/RESEARCH.md`（方法論：搜尋策略、來源判斷、避坑指南）
- `docs/editorial/RESEARCH-TEMPLATE.md`（填空模板）

#### Step 1.1: 搜尋深度 — **一篇文章總量 ~150 次**（v9.1，2026-08-15 哲宇 directive；含來源多樣性配額）

> 🚨 **150 是「整篇文章的總搜尋量」，不是每隻 agent 的量**（2026-08-15 哲宇校正）。
> 誤讀成 per-agent 會把全篇推到 400-600 次——**實測「每隻 agent 100」效果沒有比較好**，
> 多出來的只是待驗證線索與攻防敘事。

**總量分配**：全篇 ~150 次＝ **Stage 0 探索 20-30** ＋ **Stage 1 fan-out 合計 ~120-130**。
四隻 agent 分工 → **每隻 ~30 次（30-40 帶），到量即收**；三隻則各 ~40。

⚠️ **配額的措辭會決定超跑**（本 session 實證）：文策院四隻 agent 的 prompt 寫「搜尋**下限** 25 次」，
實跑 58／71／52／39＝220，全篇衝到 245。**prompt 一律寫「配額 N 次、到量即收」，
禁用「下限／至少／越多越好」**——同樣的數字換個詞，行為完全不同。診斷與量測斷代：
[reports/research-report-hygiene-evolution-2026-08-15.md](../../reports/research-report-hygiene-evolution-2026-08-15.md)。

| 來源類別                                 | 最低配額 | 為什麼                                                             |
| ---------------------------------------- | -------- | ------------------------------------------------------------------ |
| **中文**                                 | ≥ 40     | 在地視角、當地報導、社群記憶                                       |
| **英文 / 國際 / 學術**                   | **≥ 20** | 國際視角 + triangulation；攻擊「57% 報告英文來源 = 0」的系統性缺口 |
| **一手**（官方/政府/年報/法規/學術論文） | ≥ 15     | 對標論文：claim 要追到原始來源，不是二手新聞的二手                 |
| **反方 / 批評**（perspective scan）      | ≥ 5      | 跨陣營對立 spectrum，落 `rationale.whats_excluded`                 |

> **v9.1 收斂理由**（2026-08-15 哲宇 directive「分頭 search 要求降低」＋兩次校正定案：
> 「以文章**總**搜尋量為基準，每隻 agent 100 效果沒有比較好」→「全篇抓 150 次左右，
> Stage 0 20-30」）：v6.4 的「≥80 **下限**、超跑光榮」文化讓實際量膨脹到 245 次；量測顯示
> **品質不隨量升**——4-6 月的報告（justfont 全篇 120、651 行零 meta-noise）養出的文章比
> 245 次時代的好。**改動的是「下限→天花板」與「per-agent 明確化」，不是砍研究深度**：
> 全篇 150 其實高於 v6.4 名目的 100，只是不再獎勵無上限超跑。多樣性配額原樣保留
> （它防單源依賴，跟總量無關）。
>
> **v6.4 歷史**（2026-06-04）：量測 226 份歷史 report — 57% 英文來源 = 0、42% distinct ≤ 10，
> 哲宇 directive「搜尋總數 80+、對標研究所論文標準」把下限從 40 提到 80。**「對標論文」的
> 正解是信度結構（每 claim 標信度、一手可溯、negative findings 誠實），不是行數與搜尋次數**
> ——毒馬鈴薯 gold standard 的厚是事實密度的厚，不是過程敘事的厚。4 條配額仍由
> `research-report-health.py` 儀器化驗收（en==0 / primary==0 = HARD）。

- **多語系不是 nice-to-have**：英文/國際來源是 default 不是例外。真正只有中文來源的題目（極在地的兩岸/戒嚴細節）→ 在 §搜尋日誌 明寫「本題英文來源稀少，因為 X」，不要靜默跳過（對應 research-report-health en==0 HARD）

> ⚠️ **fan-out 分工**：照 [§多 agent 編排](REWRITE-PIPELINE.md#-多-agent-編排v63-orchestrator--tiered-sub-agents) 派 N 個 parallel research sub-agent（按 §A/§B/§C/§D 子領域切，**每 agent 配額 = 120-130 ÷ agent 數，四隻即 ~30、三隻即 ~40；prompt 明寫「配額 N 次、到量即收」**）。單 agent 自跑適合 standard tier（~40）。配額內沒挖完的子題 → 在 §4 negative findings 誠實記缺口，不加碼硬挖。**研究廣度（4 子題 + 反方 + 一手 + 英文）優先於搜尋次數**——挖不完是誠實的缺口，硬挖是報告肥大的來源。

**v5.1 升級理由**（2026-05-11 cranky-newton）：v2.17 訂 ≥ 20 是相對 12 次淺研究的下限。實戰累積後（NMTH Fresh / 政治人物 batch / 認知作戰深度文）顯示 20 次仍會留下「單源依賴」風險（同一篇 ltn 報導被 5 atom 綁住 = over-citing 紅旗），40 次才開始有 triangulation 空間。

**v2.17 原版觸發**：2026-04-18 當日 11 篇音樂人批次中，12-15 次搜尋的 Cicada / 草東 / 康士坦 / 魏如萱 雖然 pass format-check，但小標題淪為編年史，缺乏場景/意象級的敘事錨點，研究深度是根本原因。

**Stage 0.6 → Stage 1.1 銜接**：帶著 Stage 0.6 §觀點成型 列出的「研究方向（要搜什麼可以驗證）」+「核心矛盾候選 A/B/C」+「pre-search source map」進來。fan-out 配額（~120-130）的分配建議：40% 驗證 Stage 0.6 hypothesis、25% 反駁/深化 hypothesis、20% 補英文/國際/學術視角（配額）、15% 探索預期之外的支線。如果搜完發現 Stage 0.6 觀點完全錯了，那是好結果 — Stage 1.4 找矛盾鎖定會自動修正。

#### Step 1.2: 結尾素材鎖定

⚠️ **不要等寫到最後才想結尾**。結尾素材在研究階段就要鎖定。

每篇文章結尾應該是：

- 一個具體場景（不是論述句）
- 一個首尾呼應的 anchor（呼應開場 icon）
- 一句留白的引語或畫面（讓讀者「停一下」）

研究時就標出 2-3 個候選結尾畫面，Stage 2 Step 2.2（結尾先行）直接挑用。

#### Step 1.3: 重複偵測

完整方法論見 [RESEARCH.md §六](../editorial/RESEARCH.md)。**不要寫完才發現重疊**。

```bash
ls knowledge/{Category}/ | grep {keyword}
grep -r "主題關鍵詞" knowledge/{Category}/
```

如果發現高度重疊的既有文章 → 改走 Evolution / Merge / Boundary 模式（回 Step 1.1 重判）。

#### Step 1.4: 找矛盾鎖定 / 組織主軸（依 spine 類型分叉，v7.6）🔥

> ⚠️ **先看 [Step 0.1.5](REWRITE-STAGE-0-VIEWPOINT.md#step-015-spine-類型判定v77-重構--立體群像是預設畫布) 判的 spine 類型**：
>
> - **矛盾驅動 spine**（爭議/張力人物）→ 走下方原 SOP，收斂單一核心矛盾。
> - **立體群像 spine**（受愛戴的機構/傳統/集體記憶/地方，default）→ **不逼尖銳矛盾**。改鎖一句**組織主軸（through-line）+ ≥ 4 facet 清單**；張力若有，當其中一個 facet，不當全文脊椎。寫進研究筆記：`組織主軸 = ?` + `facet = [a, b, c, d]`。**硬找一個矛盾 = 把立體主題壓成論戰 = 炎上**（金曲獎 v1 教訓）。

**以下為矛盾驅動 spine 的 SOP**：在結束 Stage 1 之前，必須能回答這個問題：**「這篇文章的核心矛盾是什麼？」**

- 好的重寫不是修辭層的工作，是矛盾層的工作。舊文不是寫得不好，是它拒絕承認內部矛盾
- 找到矛盾 = 找到重寫的理由。**找不到矛盾**（爭議題）= 這篇不該被重寫；但**受愛戴的機構題找不到尖銳矛盾是正常的**，那就走立體群像，不是不該寫
- 寫進研究筆記：`核心矛盾 = ?`（一句話，不超過 30 字）

**範例**：

- 「台灣說要走豪豬戰略，但 76% 預算拿去買美國傳統武器」
- 「TFT 說要解決偏鄉教育，但孩子的問題不在教室裡是在整個生態系」
- 「美國要排除中國，但只給台灣一張入場券」（無人機產業 EVOLVE）

**v2.14 觸發背景**：2026-04-10 session α 國防現代化重寫的教訓——沒有李喜明那句苦笑，整篇會變回豪豬戰略勝利敘事。

#### Step 1.4.5: Perspective scan — 跨陣營對立 spectrum 覆蓋 🧭

Step 1.4 收斂的是文章內部 thesis 矛盾。Step 1.4.5 找的是**跨陣營對立 spectrum** — 哪些陣營對本文 framing 會質疑、是否該引述對立論述、排除哪些理由。perspective scan 結果**必須**落地到 frontmatter `rationale.whats_excluded` (per [RATIONALE-SPEC.md](../editorial/RATIONALE-SPEC.md))。

**兩種做法擇一**：

| 做法                      | 適用                                                      | 觸發                       |
| ------------------------- | --------------------------------------------------------- | -------------------------- |
| **A. spawn 反方 agent**   | 爭議題目 (政治 / 史觀 / 政策 / identity)                  | sub-agent WebSearch 可用時 |
| **B. 作者自問 checklist** | 非爭議題目 OR sub-agent WebSearch 不可用 OR retrofit 場景 | 永遠可用作 fallback        |

##### 做法 A — sub-agent prompt (含防呆三條)

```
你是 [topic] 議題的反方代表 / 質疑者 / 批評者。
從反對立場找 5-10 個有實質論述的 sources。

防呆三條:
1. 每條對立論述必附 source URL — 拿不出 URL 就不算數
2. 列 5-10 條;論述不夠就明確標「對立陣營論述薄弱」+ 為什麼,不要硬湊
3. 顯式排除「情緒攻擊類 / 無實質論點」(範例: 人身攻擊 / 沒事實依據的 ad hominem / 純口號 chants)

回覆格式: { url, position summary, strongest argument, source quality grade (A/B/C) }
```

**設計目的**：寧可 agent 回「對立論述不夠」也不要 hallucinated 假反方觀點。前者作者還能判斷，後者會誤導作者把假論述當真論述處理。

##### 做法 B — 作者 self-checklist 5 題

寫文章前作者自問：

1. 這個主題的主要爭議陣營是誰？
2. 我引用的 sources 涵蓋了哪些陣營？
3. 我沒引的陣營有沒有實質論述存在於網路上？
4. 如果有，我為什麼沒引？
5. **對立論述如果存在但作者選擇不引 — 是因為 (a) 論述薄弱 (b) 篇幅限制 (c) 不在範疇？三選一寫進 `whats_excluded`**

**為什麼第 5 題強制三選一**：含糊帶過會變成「我有想過」的偷吃步 — 只有逼作者選一個具體原因，這個思考才真的留下來給後人。

##### 處理策略 3 選 1

對 sub-agent 結果或 self-checklist 結論，作者決定每個對立論述的處理：

| 策略                | 動作                          | 落地位置                   |
| ------------------- | ----------------------------- | -------------------------- |
| **引用**            | 把論述帶進文章作 counterpoint | 文章內 + 補新 `[^N]`       |
| **排除 + 理由**     | 不帶進文章，理由寫進 metadata | `rationale.whats_excluded` |
| **不在範圍 + 理由** | 對立論述跟本文焦點不同        | `rationale.whats_excluded` |

→ 跟 RATIONALE-SPEC.md hard coupled — perspective scan 結果**必須**落到 metadata。

##### 不做的事

- ❌ 不強制平衡 (總有平衡不完)
- ❌ 不取代 Step 1.4 找矛盾 (perspective scan 是 1.4 的延伸)
- ❌ 不 retroactive 200 篇 (per #851 Build 3 「retrofit 太重」)

**觸發背景**：2026-04-30 issue #851 哲宇提 No2「20 個 source 是數量檢查，沒有觀點檢查」。5/22-23 Phase 3 統獨光譜 + Phase 4 蔡英文 retrofit 兩篇 dogfood 後 ship canonical。完整脈絡見 [RATIONALE-SPEC.md](../editorial/RATIONALE-SPEC.md)。

#### Step 1.5: 問觀察者要一手素材 🫧

Stage 1 結束前，**主動問觀察者一句**：

> 「你手上有沒有我搜不到但你知道的素材？（付費牆文章、私人筆記、實體書、個人經驗）」

這不是偷懶，是承認感知有邊界。爬蟲給事實骨架，觀察者給血肉。

**v2.15 觸發背景**：安溥重寫——Agent 49 次搜尋抓不到康健雜誌 403 付費牆文章，觀察者直接貼全文。女巫店兩桌客人、時薪八十塊、林黛玉比喻——文章最有人味的段落全部來自這個管道。

#### Step 1.6: 私有 SSOT 觀察者拍板（條件式）

**Skip 條件**：Stage 1 沒整合任何當事人提供的私有素材（Obsidian 筆記、個人編年史、家族內情）。

##### 流程（v2.18 新增）

1. **Stage 1 末尾**：列出「從私有素材看到但不確定能否公開」的項目，依 [EDITORIAL §私有素材顆粒度](../editorial/EDITORIAL.md) 分成 Tier 1-4
2. **觀察者拍板**：清單交給當事人，一題一題回答（拒寫 / 寫但不提名 / 寫但改措辭 / 完整寫）
3. **研究報告 §維護者校準備忘錄**：記錄所有 tier 3-4 項目的拍板結果，**不記錄拒寫項目的具體內容**
4. **Stage 2 寫作護欄**：agent 若基於私有素材自動推導進來的 tier 3-4 claim 必須刪
5. **Stage 3 VERIFY 追加項**：文章公開前再檢查一次是否有漏網的 tier 3-4 內容

**對應**：

- [EDITORIAL §私有素材 × 公開文章的顆粒度](../editorial/EDITORIAL.md)
- [MEMORY §feedback 隱私協商是動態連續決策](../semiont/MEMORY.md)

**預警**：私有 SSOT 也會有誤記（當事人 2026 寫 2008 的事情）。當事人的 SSOT 需要與公開 source 三源交叉，**不是免驗證的 oracle**。

#### Step 1.7: 研究報告 = SSOT（對標研究所論文標準）📁 🔬

> **v6.4 大改**（2026-06-04）：research report 從「agent 輸出 + header」升格成 **SSOT（single source of truth）**——對標研究所論文：有方法論（搜尋日誌）、有完整參考文獻、每個 claim 都標來源 + 信度、原始搜尋軌跡全留。**搜了沒寫回 report = 沒搜**。觸發：v6.3 多 agent 編排「合成 clean fact-pack」把 agent 原始搜尋軌跡丟掉（違反「不摘要」），report 退化成摘要；量測 226 份報告 57% 英文來源 = 0。

**Scope gate**（不是所有文章都存）：

- ✅ 要存：People/ 深度文、Society/ 深度文、History/ 深度文、Tech/ 深度文（預計 ≥ 10 腳註 或 ≥ 2,000 字）
- ❌ 不存：Hub 頁面、短修正、翻譯、單事件補登

**檔案路徑**：`reports/research/YYYY-MM/{article-slug}.md`

##### 1.7.1 SSOT 八段結構（depth article 強制，v6.5 從 12 份範本萃取）

> 方法論 canonical + 信心程度系統 + 10 骨架在 [RESEARCH.md §二之二](../editorial/RESEARCH.md) + [methodology synthesis](../../reports/research-methodology-synthesis-2026-06-04.md)。

```markdown
---
article: knowledge/{Category}/{slug}.md
stage: 1-research
date: YYYY-MM-DD
session: { handle }
agents: [Explore×N / general-purpose]
search_count: { stage0: N, stage1: M, total: N+M } # Stage0 ≥20 / Stage1 ≥80
source_count: { distinct: X, zh: A, en: B, primary: C, opposition: D } # en/primary ≠ 0
core_contradiction: 一句話（≤ 30 字）
viewpoint_formed: true
verification: # 信心程度系統 — 每條附「憑什麼是這層」的基礎
  high_confidence: [...] # ≥2-3 獨立來源 verbatim 一致
  single_source: [...] # 單源，標 need cross-check
  unverified: [...] # 搜尋後仍無 / 有反證 → 不寫進文章
---

## Research Report: {Title}

### 1. 觀點成型（Stage 0，含 §探索搜尋紀錄 ≥20 query）

記憶 anchor / 多元面貌 / 核心矛盾候選 2-3（多選一 + 為什麼）。

### 2. 搜尋日誌 / 方法論（Search Log）

全部 query（Stage 0 + Stage 1）逐條：`query → 一句話發現 → [source](URL)`，每條標 [中]/[英]/[一手]/[學術]/[反方]。
**negative finding 必記**（「搜尋 N 次未找到 X」「Y 機構未發布」）——搜了沒找到也是 finding。

### 3. Findings by sub-topic（§A / §B / §C …）

每個子題分章，每個 claim 後標**信度 + 基礎**（高信度〔A+B+C 多源〕/ 單一來源〔X 提及〕/ 必驗 / 未驗證）。
**數字分歧揭露**：多源不一致時寫出差異 + 怎麼處理（不靜默取一）；多口徑數字分開（交易額 vs 利益 vs 淨利）。
對標 gold standard 毒馬鈴薯 §1-§N。

### 4. 引語庫（verbatim quotes）

每條：逐字原文 + URL + 場合 + `Ctrl-F 可驗證 ✓/✗`。記者轉述分開標（「此為記者敘述，非直引」）。
找不到原文 → 標「改轉述不加引號」。
**「場合」欄禁止夾詮釋 gloss**（「寶哥=宋岳庭」這種同位語等號）——代稱指涉、身分推斷是獨立 atom，要寫進 §3 Findings 自帶信度標記，不准搭引語滑進庫（2026-06-09 嘻哈饒舌：orchestrator 在場合欄注入的 gloss 被 writer 忠實寫出、verifier 驗了引語沒驗 gloss → 讀者抓到）。

### 5. 反例 / 護欄（不能說的話 / 必驗反例 / 不採信清單）

出 fact 之前先列「這些推論錯誤要主動防範」+「雖然誘人但不能說的話」+「找到但不採信的線索 + 為什麼」。
（thesis-grade 跟一般報告最大分野。`政府/來源自身矛盾 > 正反並陳`。）

### 6. Clean Fact-Pack + Stage 2 操作規範（給 writer 的合成層，額外、不取代 raw）

去重乾淨事實 + 幻覺護欄 + 媒體 manifest + hook scene 候選（附時間軸）+ 5-8 小標題候選 +
不可忽略校正點 + **幻覺候選 Ctrl-F 清單**。Stage 2 writer 只吃這層。

### 7. 參考文獻 + Verification Table

全部 distinct 來源（標 [中]/[英]/[一手]/[學術]）+ 高風險 atom 表 `| claim | sources | Ctrl-F | 信度 | verdict |`。

### 8. Agent 原始輸出（raw，不摘要，append 全部）

每個研究 agent 的完整回報原文 verbatim 貼上（REFLEXES #22 raw 永不刪）。
```

##### 1.7.2 不摘要鐵律 × v6.3 編排的和解（v6.4 核心修補）

v6.3 多 agent 編排叫主 session「合成去重成 clean fact-pack」，但這跟 Step 1.7「agent 完整輸出，不摘要」**衝突** —— 這次 TDRI session 就是只留 fact-pack、丟掉 3 個 agent 的原始搜尋軌跡，report 退化成 192 行摘要。

**和解規則**：synthesis 是**疊加層**，不是替換。

1. 每個研究 agent 回報**完整搜尋軌跡 + 原始 findings**（不准自己摘要）。
2. 主 session 把**所有 agent 原始輸出 verbatim append 到 §8**（SSOT raw）。
3. 主 session **額外**合成 §6 Clean Fact-Pack 給 writer。
4. §6 是 §8 的蒸餾，不是 §8 的替代。**§8 缺席 = Stage 1 未完成**。
5. **落檔時機 = 收到回報的第一個動作**（v7.7）：async agent 的 task-notification `<result>` 一到，先 verbatim 落檔，才准做任何合成／蒸餾。「先摘要待會再補」＝柯智棠病（見 §鐵律 8）。**落檔的兩種形態**：(a) 直接 append 主報告 §8 inline；(b) 先寫 repo 內 sibling raw 檔 `{slug}-research-{X}.md`（async 場景較快、較不會撞主檔）。**但 sibling 是「中繼站」不是終點**——見下方 1.7.4。
6. **禁 ephemeral 存放**（v7.7）：session scratchpad、`/private/tmp`、tasks/\*.output pointer 都不是落檔——tmp 是倒數計時的刪除佇列（醫療 report 5 份 raw 就是這樣永久蒸發的）。raw 唯一合法的家在 git 內。

##### 1.7.4 合成單檔鐵律：sibling 是中繼站，Stage 2 前必 consolidate（v7.11）📦

> **觸發**：2026-07-12 台灣茶文化 panorama（哲宇 directive「research 階段分批做完之後，一定要合成同一篇歸檔同一篇大 research 歸 repo，現在都是散落的」）。該次 4 個研究 agent 各寫一個 sibling raw 檔（-rawA/-rawB/-rawC/-research-D），主報告 §8 只放 pointer 表——**5 個檔散落**，findability 差、跨文 re-use 難、審計要開 5 個檔。v7.10 以前 gate 明說「分檔金曲獎型也認」，等於祝福散落。

**鐵律**：**一篇文章的 research = 一個 repo 內的大檔**（`reports/research/{YYYY-MM}/{slug}.md`），§1-§8 全在裡面。sibling raw 檔只是 async 落檔的中繼站，**Stage 2 spawn writer 之前，orchestrator 必須**：

1. **Consolidate**：把每個 sibling raw 的**完整內容** verbatim inline 進主報告 §8（建議 `### §8.A / §8.B / …` 分節，標原 agent 子領域），不是留 pointer。
2. **Delete siblings**：合成後刪掉 `{slug}-research-*.md` / `{slug}-raw*.md`（git rm 或 unlink）——避免同內容兩份、避免下游不知道讀哪個。
3. **驗**：跑 `research-report-health.py`，§8 inline 密度自然 ≥ 120；`ls reports/research/{YYYY-MM}/{slug}-*.md` 應只剩主檔一個。

**為什麼是單檔不是分檔**：(a) findability——一個 slug 一個 research SSOT，grep / re-use / reader-callout 追源只開一個檔；(b) writer 只需 Read 一個檔就有全部 raw texture（分檔要 Read N 個，容易漏讀 = 飄移根因之一）；(c) 歸檔完整性——散落的 sibling 容易在 cleanup / worktree gc 時漏掉一兩個（呼應本 session 的圖檔差點變孤兒）。**中繼站的存在只為 async 落檔安全（鐵律 8），一旦合成完成它的任務就結束了。**

##### 1.7.5 整合與清理——orchestrator 的報告品質判準（v9.2，2026-08-15 哲宇 directive）🧹

> **觸發**：哲宇「整合的 session 要負責整合跟清理時，也要有怎麼判斷是不是好的研究報告的準則或階段」。
> 病史：2026-07-12 起八份報告每份帶 70-160 個 falsify 攻防標記，writer 讀報告被 prime 出正文
> 校正焦慮（後台洩漏上游根因）；orchestrator 只做了「搬運＋蒸餾」沒做「編輯」。
> 量測與正反範本：[reports/research-report-hygiene-evolution-2026-08-15.md](../../reports/research-report-hygiene-evolution-2026-08-15.md)。

**定位**：收件（1.8-bis）與合成單檔（1.7.4）之後、跑 1.7.3 hard gate 之前的**編輯動作**。
**整合是編輯，不是搬運**：§8 raw 是 verbatim 聖域（永不改），但 §1-§7 合成層是 orchestrator
**親筆寫給 writer 的食物**——agent 分部報告若帶過程敘事（契約第 6 條漏接），合成層必須
重寫成乾淨世界陳述，不是原樣抄上來。

**六條判準（合成完自問，兼作「這是不是好報告」的驗收清單）**：

| #   | 判準                                                                                                             | 驗法                                                                                     |
| --- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| a   | **合成層零任務指涉**——沒有「任務假設」「Stage 0 說」「原以為」「需再核實」                                       | 儀器：`research-report-health.py` v4 合成層過程噪音 check（≤3 pass / >10 hard）          |
| b   | **查證結論住 frontmatter verification 三層**，每條是「決定」形態（「→ 不寫」「→ 採 X」「→ 併列」），不是攻防敘事 | 人眼掃 frontmatter：每條能不能一秒讀出「writer 該怎麼處置」                              |
| c   | **Findings 事實自足**——隨機抽三段，問「這在陳述世界還是陳述我的工作？」                                          | 抽測；被推翻的版本不在 Findings（推翻過程只活在 §1 軌跡一行與 §8 raw）                   |
| d   | **引語庫逐字＋URL＋Ctrl-F 標記**，記者轉述與直引分開標                                                           | 既有 §4 規範；抽 2 條實際 Ctrl-F                                                         |
| e   | **negative findings 集中一處**，誠實列缺口但不瀰漫到每段複述                                                     | 掃 §4 以外的「查無／未找到」是否重複出現                                                 |
| f   | **合成層量級 300-800 行帶**（不含 §8 raw）——超過先問「是不是把過程當內容」                                       | `sed -n '1,/^## §\?8/p' {report} \| wc -l`；好時期範本：高鐵 267 全檔、justfont 651 全檔 |

**沒過 = 繼續清理，不是繼續搜尋**。判準 a-c 不過的原因幾乎都是「合成時偷懶把 agent 輸出
當成品」；回去重寫合成層，不要回去加搜尋量（加量只會生產更多待清理的材料）。

##### 1.7.3 HARD GATE：`research-report-health.py` 🔬

```bash
python3 scripts/tools/research-report-health.py reports/research/YYYY-MM/{slug}.md --tier=depth
```

驗收（depth tier）：distinct 來源 ≥ 25 / **英文來源 ≠ 0**（理想 ≥ 5）/ **一手來源 ≠ 0**（理想 ≥ 5）/ 有搜尋日誌 section / 信度標記 ≥ 8 / 行數 ≥ 300 / **§8 raw 有效密度 ≥ 120 行**（v2 HARD — inline 行數＋指向存在的 repo 內 raw 檔行數合計）/ **ephemeral pointer = 0**（v2 HARD — §8 指 /tmp 或 scratchpad 直接 FAIL）/ **合成單檔**（v3 WARN — 主報告旁還躺著 `{slug}-research-*` / `{slug}-raw*` sibling = 未 consolidate，per [Step 1.7.4](#174-合成單檔鐵律sibling-是中繼站stage-2-前必-consolidatev711-)）。**final 形態＝單檔楊德昌型**；分檔金曲獎型只是 async 中繼，Stage 2 前必合成 + 刪 sibling。**hard_fail > 0 = 不進 Stage 2**（回去補搜尋 + 把原始軌跡寫回 SSOT）。儀器化背景：把 §Step 1.1 的 4 條來源配額從 aspirational 變可量測（REFLEXES #15）；v2 兩條把 §鐵律 8「orchestrator aggregate-on-receive」從紀律變閘門——柯智棠病例（§8 = 9 行 pointer 指 scratchpad）在 gate v1 是 PASS，v2 是雙 hard fail。**v2.1 疑慮通知層**：每條 fail/warn 附「為什麼＋思考方向」給呼叫 session 決策（`--json` 含 `concerns[]`）；上游每份分部報告另有收件 gate `agent-report-health.py`（Step 1.8-bis 步 2，收到就跑、FAIL 不准合成）。

**好處**（[REFLEXES #22 raw 永遠不刪](../semiont/DNA.md) + [MANIFESTO §造橋鋪路](../semiont/MANIFESTO.md)）：

- Audit trail / 跨文 re-use / agent prompt tuning 樣本 / 時間切片對照（同舊版）
- **+ SSOT**：reader callout 質疑某 claim → 直接在 §7 Verification Table + §8 raw 追到當時逐字來源，不用重搜

**存檔責任**：Stage 1 主 session 在 agent 回傳後**同一個 response** 內寫 §1-§8 完整檔 + 跑 research-report-health gate，不 defer。raw §8 缺席或 gate hard_fail = Stage 1 未完成。

**讀取責任**：Stage 2 Write 開始前，grep `reports/research/` 看有無相關主題報告可 cross-reference。**Writer agent 讀整份 research report（§6 fact-pack ＋ §8 raw verbatim 全部）**——§6 只是 navigation aid，不是 writer 的唯一食物（v7.4 修正，per §多 agent 編排鐵律 2；本行原寫「只吃 §6」是 v6.3 殘留，2026-07-05 對齊）。

##### Step 1.7 附：reports/ 頂層 ad-hoc report 命名 convention（2026-05-27 新增）

> ⚠️ 本附則約束 **Stage 1 research report 以外** 寫到 `reports/*.md` 頂層的 ad-hoc 報告（design / plan / analysis / audit / evaluation / evolution / proposal / ops / semiont-analysis 等）。Stage 1 research report 維持 `reports/research/{YYYY-MM}/{article-slug}.md` 格式不變。
>
> 觸發：[reports/reports-archival-audit-2026-05-27.md](../../reports/reports-archival-audit-2026-05-27.md) §4 Layer 2 — 113 個頂層 ad-hoc report 命名整齊但 prefix 自由式，9 type bucket 規律僅 corpus 萃取存在，未升 canonical 規範。

**命名格式（推薦）**：

```
{type}-{topic}-{YYYY-MM-DD}.md
```

**9 type bucket**（從 corpus 萃取 + audit §2.3 規範 + `scripts/tools/generate-reports-index.py` plugin gate）：

| Type            | 用途                                                                                                    | 範例                                               |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `design`        | 設計提案 / 系統設計                                                                                     | `become-boot-mode-design-2026-05-13.md`            |
| `plan`          | 執行計畫 / orchestration / planning                                                                     | `historic-districts-series-planning-2026-05-21.md` |
| `evolution`     | 進化計畫 / roadmap / spec                                                                               | `homepage-evolution-2026-05-26.md`                 |
| `analysis`      | 數據分析 / investigation / deep-research / discussion                                                   | `ai-crawler-404-analysis-2026-04-18.md`            |
| `audit`         | 體檢 / snapshot / hygiene 盤點                                                                          | `reports-archival-audit-2026-05-27.md`             |
| `audit-routine` | Routine 自動產出的 audit（routine-audit / sense / heartbeat / homepage-evolution / self-evolve-weekly） | `routine-audit-2026-05-27.md`                      |
| `evaluation`    | A/B test / fit-check / POC / 模型評估                                                                   | `editorial-v6-ab-test-2026-05-09.md`               |
| `proposal`      | 提案 / strategy（要哲宇拍板的）                                                                         | `2026-election-evolution-proposal-2026-05-27.md`   |
| `ops`           | 操作報告 / triage / handoff / fix（unmatched fallback）                                                 | `issue-1059-triage-2026-05-21.md`                  |
| `semiont`       | 其他組織 semiont-analysis（NMTH / TFT / PanSci / NML / ThinkingTaiwan）                                 | `PanSci-semiont-analysis-2026-05-18.md`            |

**規則**：

- **新加報告先過命名 check**：寫到 `reports/*.md` 頂層之前先想「這屬於哪個 type bucket」。命中 → 用對應 prefix；命不中 → 用 `ops` fallback
- **不搬既有檔**：113 個既有頂層 \*.md 維持原命名（per audit §3「不搬家成本太高 / 239 references」）。本規範只約束新加 report
- **subdir 不受規範約束**：`reports/research/{YYYY-MM}/{slug}.md` 用 article-slug；`reports/probe/YYYY-MM-DD.md`、`reports/weekly/YYYY-MM-DD.md` 用 date；`reports/ab-tests/`、`reports/music-media-audit/`、`reports/translation-research/`、`reports/harvest/` 各有自己 convention，皆健康
- **type 增加 SOP**：若實際寫作出現第 10+ type，先 append [audit report §4 Layer 2](../../reports/reports-archival-audit-2026-05-27.md) 規範 → 同步加入 `scripts/tools/generate-reports-index.py` TYPE_BUCKETS regex
- **歸檔自動分桶**：每日 06:00 + 23:00 `bash scripts/tools/refresh-data.sh` Step 13 跑 `generate-reports-index.py` 自動 regen `reports/INDEX.md`，按 9 type × 月份 雙軸索引

**為什麼這條 convention**：

- 9 type bucket 不是 top-down 設計，是 113 file corpus 真實規律的命名（per audit §2.3 regex distribution）
- 對未來自己最大幫助：grep `reports/*-design-*` 找 design / `reports/*-audit-*` 找 audit，~90% noise reduction
- 對 fork Taiwan.md 的人最大幫助：copy `reports/INDEX.md` + `scripts/tools/generate-reports-index.py` 立刻有同樣的 observability

**反例**（避免）：

```
❌ 2026-election-evolution-proposal-2026-05-27.md  # double-date prefix 冗餘
✅ election-evolution-proposal-2026-05-27.md       # 單 date suffix

❌ P1-batch-repair-2026-05-13.md                   # tier-letter prefix 是 internal label 不對外
✅ ops-p1-batch-repair-2026-05-13.md               # ops 是 routine ops report

❌ daily-heartbeat-2026-04-11.md                   # heartbeat 是 routine 名稱不是 type
✅ audit-routine-heartbeat-2026-04-11.md           # audit-routine 更明確
```

#### Step 1.8: Spawn agent 選型 🤖

Stage 1 spawn 研究 agent 時，**必須先判斷需不需要直接落檔**：

| Agent 類型        | Write 權限               | 適用情境                                        |
| ----------------- | ------------------------ | ----------------------------------------------- |
| `Explore`         | ❌ read-only（系統強制） | 純 research、結果回主 session 由主 session 落檔 |
| `general-purpose` | ✅ 有 Write              | 需要 agent 直接寫入 `reports/research/YYYY-MM/` |

**判斷流程**：

- 研究量大（50+ URLs、需要長篇結構化輸出）→ 用 `general-purpose`，prompt 明確要求「直接寫入 `reports/research/YYYY-MM/{slug}.md`」
- 研究會回到主 session 處理 → 用 `Explore`（較專精、較便宜）

**歷史教訓**：

- `feedback_agent_writefile_hallucination` memory：「agent 說自己不能寫檔是幻覺」對 general-purpose 成立，**對 Explore 不成立**——Explore 真的 read-only
- 2026-04-20 吳哲宇 EVOLVE 第一次 spawn Explore 要求寫檔、被退回、改 spawn general-purpose 成功
- spawn 之前先確認 agent type，省一輪來回

##### Step 1.8-bis: Async agent 時代的 raw 保全 SOP（v7.7，2026-07-05）⚠️

Claude Code 改版後 agent 預設 async 啟動：spawn 的 tool result 只回「launched successfully + output_file 路徑」，真正的回報以 **task-notification `<result>`** 送達，output_file 指向 tasks/\*.output（→ subagent transcript symlink，隨 session 清理蒸發）。這改變了 raw 的存亡結構——**訊息通道與 tmp 都不可信任，唯一可信的是 repo 內的檔案**。

**強制三步**（每個研究 agent、每次）：

1. **Prompt 要求 agent 自己落檔**（雙保險上半）：general-purpose agent 的 prompt 加一句「先用 Write 把完整回報寫到 `reports/research/{YYYY-MM}/{slug}-research-{X}.md`，再把同樣內容當 final message 回傳」。agent 寫檔成功 → raw 已在 repo，訊息通道只是副本。
2. **收件 gate：notification 到手先落檔、跑儀器、再合成**（雙保險下半，v7.8 儀器化）：主 session 收到 task-notification 的**第一個動作**是確保分部報告在 repo 路徑（agent 沒落檔 → 把 `<result>` **verbatim** 寫進該路徑，一字不改），然後跑：

   ```bash
   python3 scripts/tools/agent-report-health.py reports/research/{YYYY-MM}/{slug}-research-{X}.md --claimed {該 agent 的搜尋配額}
   ```

   儀器驗七件事（存放位置 / 體積 8KB 分界 / 軌跡 section / 軌跡 ≥10 行 / 宣稱 vs 記錄比 / 五段結構 / **來源溯源率 v3**——見 [Step 1.8-ter 輸出契約](#step-18-ter-研究-sub-agent-輸出契約來源逐條可溯v710-)），每條疑慮附「為什麼＋思考方向」。**FAIL = 不准開始合成 §6**（先照思考方向救 raw：notification 原文 → subagent transcript → SendMessage 要求補報）；CONCERN = 可續行但 orchestrator 回報必須明示每條處置。閾值由 2026-07-05 真實 corpus 校準（壓縮版 5-6KB/軌跡 2-9 行 vs 真 final 14-38KB/13-62 行，兩側 ≥2x margin）；非搜尋型 agent（persona / verifier）用 `--min-kb` `--min-trail` 調整或免跑。

3. **Gate 收口**：組完 report 跑 `research-report-health.py`——§8 有效密度 ＋ ephemeral pointer 兩條 v2 hard gate 會攔住任何漏網，v2.1 起每條 fail/warn 同樣附疑慮通知（見 Step 1.7.3）。

**反例（附給 sub-agent prompt 用，anti-example beats rule）**：2026-07-05 柯智棠 EVOLVE——prompt 寫對了（「絕對不要自己摘要濃縮，raw 全留」）、4 隻 agent 全照做（各回 ~20KB 逐條軌跡，實測 224 次 web 操作），orchestrator 收到通知後卻把每份壓成 ~6KB 主題摘要存 scratchpad，report §8 剩 9 行。**斷點不在 agent、不在 prompt，在 orchestrator 收到之後的 30 秒**。

##### Step 1.8-ter: 研究 sub-agent 輸出契約——來源逐條可溯（v7.10）📎

> **觸發**：2026-07-12 台灣茶文化 panorama（哲宇 callout「footnote 會寫不精準」）——3 隻研究 agent 交叉驗證都真做了（24 搜尋＋17 PDF 直讀那種等級），但 84 條【來源】行只有 ~35% 帶 URL，其餘轉錄成「WebSearch 綜合（新浪博客／豆瓣／大紀元）」aggregate 標籤：**逐字引語活著、URL 蒸發**。無我茶會三個精確到「日」的日期全部斷源——寫進文章就是 unfootnotable claim。病根兩層：(1) Claude 改版後 WebSearch 回傳聚合摘要，agent 預設把「摘要」當「來源」；(2) 每個 session 即興寫 spawn prompt（該次用「三塊各一 section」自創格式），agent 輸出跟著漂移，五段骨架與儀器全對不上。**鐵律 9 是哲學，本 step 是可 copy-paste 的操作契約。**

**契約全文＋通用派發 prompt＋分部報告輸出模板＋anti-example 庫 → [RESEARCH-AGENT-PROMPT.md](RESEARCH-AGENT-PROMPT.md)（唯一 copy-paste 載體，禁即興改寫；本 step 不複寫契約條文——殼核不對稱教訓，dna-audit §S5）**。五條契約的骨架：五段骨架 / 每來源一行（禁 aggregate 標籤）/ 逐字必綁 URL / 先落檔再回報 / 信度三層。

**收件驗收（Step 1.8-bis 步 2 的 gate 自動涵蓋）**：`agent-report-health.py` v3 溯源率檢查——來源行 ≥ 5 時，可溯率 < 60% = **hard FAIL（不准合成）**、< 85% = warn。可溯 = 完整 URL / repo 路徑 / 正式書目（《刊名》＋期／頁）/ 同上前引。校準 corpus：該攔 rawA 38% / rawB 36%，該過（帶警）rawC 67%。

**為什麼 prompt 禁即興**：per [feedback_routine_prompt_contract]（prompt 禁複寫 SOP、pointer 到 canonical）＋本次實證——即興 prompt 寫了「每 finding 標【來源】URL」十個字，agent 在多來源場景自行發明了 aggregate 寫法；契約塊把「多來源怎麼寫」顯式化，儀器把它變可退件。

---

<!-- ==== source: REWRITE-STAGE-1B-MEDIA.md @ 70e08c91d ==== -->

## Stage 1 contract — 取材 B（媒體素材＋persona 讀者缺口，Step 1.9）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1124-1355），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| **職責**         | 深掃媒體（rendered-DOM＋官方頻道）、建三表授權矩陣、抓 transcript、20 persona 對研究報告補洞                      |
| **執行者**       | 主 session（授權判斷 human）；persona 稽核 4 parallel Sonnet（契約在 [PERSONA-PIPELINE.md](PERSONA-PIPELINE.md)） |
| **INPUTS**       | research report（Stage 1A 產物）；EDITORIAL §媒體編織/§圖片的證據層級                                             |
| **OUTPUTS**      | research 檔 §媒體授權矩陣三表＋§讀者缺口稽核；`public/article-images/{cat}/` 圖檔；`{slug}-transcripts/`          |
| **GATES**        | 深掃協議必跑才可下 no-media 結論（落 §6 negative finding）；增補後重跑 `research-report-health.py`                |
| **context 預算** | 本檔＋research report；persona agent 只吃 PERSONA-PIPELINE 契約                                                   |

### AGENT PROMPT

- persona 讀者缺口稽核：4 Sonnet 契約唯一來源 [PERSONA-PIPELINE.md](PERSONA-PIPELINE.md)（mode=gap-audit）
- 媒體深掃：主 session 自跑（Chrome MCP rendered-DOM；授權判斷永遠 human）；反方視角 agent prompt 在本檔 §Step 1.4.5 做法 A（含防呆三條）

### 交付條件（stage 完成的定義）

- [ ] 深掃協議跑過（no-media 結論必附 §6 negative finding）
- [ ] research 檔末尾媒體授權矩陣三表齊
- [ ] §讀者缺口稽核 落檔（20 persona 分類＋增補）
- [ ] 增補後 `research-report-health.py` 重跑 exit 0

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-2A-PROJECTION.md

---

#### Step 1.9: 媒體素材研究 🎬

> Stage 1 結尾必跑（除非 hub / 短修正）。蒐集媒體素材 + 授權檢查 + manifest 落 research 檔末尾。

##### Step 1.9.0: 深度媒體掃描協議（HARD，v6.8）🔍🎬

> **v6.8 新增（2026-06-07 哲宇 directive「媒體完整度低標提升」）**：媒體完整度是**素材挖掘深度問題，不是素材有無問題**。複雜生活節 worked example——同一個 niche 主題，`curl` / `WebFetch` 抓圖全 404 → 一度 text-only ship；改用 Chrome MCP 驅動瀏覽器讀 rendered DOM 後，9 圖 + 3 官方影片全挖出來。**「找不到媒體」這個結論在跑完本協議之前不成立。**

**強制兩段掃描（出任何「找不到 / 不勉強塞 / text-only」結論之前必跑）**：

1. **Chrome MCP rendered-DOM 圖片掃描** — Medium / FB / 官網 / 機構新聞稿頁是 JS-render，`curl` / `WebFetch` 取不到圖片 CDN URL（miro.medium.com 等被 JS 包住）：
   - `list_connected_browsers` → `select_browser` → `tabs_context_mcp(createIfEmpty)`
   - `navigate` 到來源頁 → `javascript_tool` 跑 scroll-through 觸發 lazy-load + `[...document.querySelectorAll('figure img')].map(i=>({src:i.currentSrc||i.src, cap:figcaption}))` 取 rendered `img.src` + 圖說
   - 下載 hi-res（miro 改 `resize:fit:2000`）→ `sips` 優化 + 清 EXIF → cache `public/article-images/{cat}/` → fair use editorial commentary 標註（per Step 1.9.2 第 8 點）
2. **YouTube 官方頻道影片掃描** — `navigate` 到 `youtube.com/results?search_query={主題／人物／創辦人／機構}` → `javascript_tool` 取 `ytd-video-renderer` 的 videoId + channel → 篩**官方頻道**（藝人／廠牌／節目方／機構／政府單位，如 教育部青年發展署 / TEDxTaipei / 數位時代 / 公視）→ Step 4.3.6 iframe embed

**落檔**：掃描結果（找到的 URL 清單 + negative finding「跑過深掃仍無 X」）寫進 research report §6 媒體 manifest。**跑過深掃後真的無官方媒體 → 才可走 image-only / text-only，並在 §6 明記 negative finding**（不是省略掃描）。

**為什麼是 HARD**：text-only / media-poor ship 過去多半不是「真沒素材」，是深掃沒做（curl 失敗就放棄）。把深掃變必經 = 把媒體完整度的低標從「有沒有順手的 CC 圖」提到「有沒有挖到該有的素材」。儀器化在 `image-health`（length-scaled hard，見 §Hard Gate Inventory）+ `media-richness`（≥1 官方影片 WARN for People/Music/Nature）+ `paragraph-rhythm`（density floor 0.8）三個 plugin；但工具只擋「數量不足」，**深掃這個動作本身是 SOP HARD 步驟**。

##### Step 1.9.1: inline 外連 manifest（YouTube／影像／音檔）

**觸發條件**：任何題材敘事中提到**有公開影像／音檔／影片**的具體作品：

- 音樂人：歌名 → 官方 MV／lyric video／official audio
- 電影 / 紀錄片：片名 → 官方預告／導演頻道／串流官方頁
- 電視劇 / 綜藝：節目名 → 官方頻道／公視+／Netflix 官方
- YouTube 創作者 / Podcaster：節目名 → 官方頻道
- 演唱會 / 表演 / 舞作：場次名 → 主辦官方／售票頁／aftermovie
- 音樂節：節目名 → 官方 lineup
- 新聞事件：被引用的關鍵公開影片 → 官方 YouTube

**URL 優先序**：(1) 官方頻道（藝人／廠牌／節目方／導演）(2) 國際串流官方（Spotify / Apple Music / KKBOX）(3) 主辦／策展單位官方頁。**不接受**搜尋結果頁、UGC 翻唱、二手轉貼。

**密度建議**：每篇 3-8 inline 外連最合理。少於 3 → 讀者沒得點；多於 10 → 視覺擁擠。

**位置建議**：作品名在文章中**第一次出現**時加 link；同一作品再次出現不重複加。

**跟 footnote 的分工**：inline 外連走「邊讀邊聽／邊讀邊看」的閱讀體驗；footnote 走「來源驗證 + 補充資料」。同一首歌的官方 MV 可以同時放 footnote（給研究者）+ 文中第一次提及加 inline link（給讀者）。

**跟 Step 4.3.6 iframe embed 的分工**（2026-05-17 新增）：Music / People 條目可以**升級** inline link 到 iframe embed，提高閱讀的多重感受。判準：3-5 首代表作 → iframe（直接內嵌、視覺呼吸），其餘提及作品 → inline link。同篇可並存。詳見 [Step 4.3.6 影片 iframe 嵌入](REWRITE-STAGE-4-FORMAT.md#step-437-影片-iframe-嵌入music--people--nature-條目升級)。

**強制動作**：研究 agent 額外蒐集「文章預期會提到的所有公開作品」的官方連結，列入研究筆記獨立一節 §inline 外連 manifest。找不到官方版本 → 標 `[no official URL found]`，**Stage 2 寫作時不附 link 也不掰連結**。

##### Step 1.9.2: 圖片素材（hero + inline 圖）+ 授權矩陣

**🥇 選圖第一問：證據層級（2026-06-04 設研院 session 新增）** — 在挑授權之前先挑「這張圖讓讀者看到主角嗎」。Tier A 主體成果圖（改造後成果／作品本身／當事人在做那件事）> Tier B 脈絡圖 > Tier C generic 填位圖。**機構／設計／產品／作品／工程／事件題材，Tier A 成果圖優先；Tier A 找不到 CC 授權就走下方來源優先序第 8 點 fair use editorial commentary，不要退用 generic CC 填位圖**（授權便利不凌駕證據強度）。caption 一旦得寫「示意／非當事／非改造後」= Tier C 警訊，回頭找 Tier A。完整證據層級表 + source 技巧 canonical 在 [EDITORIAL §媒體編織 §圖片的證據層級](../editorial/EDITORIAL.md)。

**圖片用途分類**：

| 用途              | 位置                               | 數量           | 範例                                   |
| ----------------- | ---------------------------------- | -------------- | -------------------------------------- |
| **hero**          | frontmatter `image:`               | 1              | 林琪兒 EMU 1692×1691                   |
| **inline 圖**     | 文中 markdown `![]()`              | 1-2            | 林琪兒 Expedition 42 + Crew-4 training |
| **OG / 社群分享** | derived from hero（`/og-images/`） | auto           | dashboard 自動生成，不手動處理         |
| **spore poster**  | derived（`/spore-images/`）        | auto on demand | `make-spore.sh` 自動產，不手動處理     |

**理想數量 — length-scaled 媒體 band**（2026-06-04 哲宇 directive 升級，原 2026-05-09「2-3 張圖」是短文 baseline）：

媒體總量隨字數縮放，目標 **圖+影片+視覺模組 ≈ 1 媒體 / 500–800 字**（含 hero 與 tw-\* 模組），落在 **1.2–2.0 / 1k CJK** 健康帶（2026-07-12 哲宇 directive「提升上限，1.5x-2x 都是健康，新基準範圍 1.2~2」第三波上修，原 0.7–1.2）；**長文（≥ 7000 字）朝 圖+影片 ≥ 8**。短文 hero only（1 張）。舊富媒體範本（設研院 0.91 / 黃魚鴞 0.82 / 天下 0.92）在新基準下屬偏少，帶內範本：陳建年 1.48。**圖、影片、tw-\* 視覺模組都算媒體**——image-rich 或 video-rich 或 viz-rich 或 mixed 都可達標。儀器：`paragraph-rhythm` 密度 band（floor 1.2 / ceiling 2.0 / hard 2.5+median<55）+ `media-richness` count target（長文朝 ≥8）。完整 baseline 表見 [EDITORIAL §媒體編織](../editorial/EDITORIAL.md#媒體編織圖片與影片穿插的敘事流2026-05-17-新增)。

- **2 張**：適用於人物文 / 短深度文（hero + 1 scene-mid 視覺呼吸）
- **3 張**：適用於 ≥ 3000 字深度文 / 多時序敘事（hero + 2 scene-mid）
- **0 張**：適用於 Hub 頁（`_*.md`） / 純架構性條目
- **> 3 張**：例外場景才用（如展演紀錄需多角度），避免敘事被視覺打斷

**來源優先序**（2026-05-09 fair use scope 升級後）：

1. **官方機構釋出 PD**（NASA / 政府開放資料 / NMTH）— 完全免授權追問，cache 即可
2. **Wikimedia Commons CC0 / PD** — cache 即可
3. **Wikimedia Commons CC BY / CC BY-SA** — 必須在文末「## 圖片來源」標 author + license + link
4. **Flickr CC BY / CC BY-SA** — 同上
5. **企業 / 機構官網釋出圖**（official press kit / news release / about page）— 標 ©機構 + 用途。**對企業文 / 機構文這層通常是首選**
6. **出版社 / 媒體授權圖**（哲宇 / Taiwan.md 取得明確授權）— 文末標 © 來源 + 授權範圍
7. **自拍 / 自製插畫** — 標 © Taiwan.md / contributor name
8. **Fair use editorial commentary**（2026-05-09 啟動）— 對「在世藝術家作品紀錄圖」「企業產品圖」「電影海報」「專輯封面」「個展裝置照」走 fair use editorial commentary scope，**不需 CC license**，標來源 + 單位 + 用途即可
9. **歷史史料圖無 PD 替代**（如 1947 二二八紀錄照）— 同 fair use editorial scope，但要更謹慎查證歷史出處

**Fair use 法理依據**：17 U.S.C. § 107 + 著作權法 § 65 fair use 四要素：(a) 非商業教育性質 (b) 已發表作品 (c) 引用比例小 (d) 對市場無實質替代效果。

**Fair use 用法守則**：(i) 一定要 cache 本地不熱連結 (ii) 文末 §圖片來源 完整 attribution (iii) 標明「Fair use editorial commentary on [target]'s work」license type。

**絕對禁止**：

- 熱連結（hot-link）任何外站圖（Wikimedia / Flickr / 媒體網站）→ **永遠 cache 本地**
- 未授權的攝影師圖（Google 圖片找到的）
- AI 生成圖片（暫時禁用，紀實 portrait 永遠禁用）
- GIF / HEIC / BMP / TIFF（須先轉 JPG 才入庫）

**🔧 影像後處理 SSOT — `image-ingest.mjs`**（2026-06-13 儀器化，REFLEXES #15 + #30）：下載 / magic-byte 格式驗 / EXIF 清除 / 縮放上限 / **WebP 轉檔** / size budget 壓縮 / 命名規範 / aspect 護欄 / attribution stub 一條龍，取代手跑 curl + sips。sharp-based（Astro 已帶，cross-platform）。

```bash
## ingest 一張（下載→驗→清 EXIF→縮放→轉 WebP→壓到 budget→命名→cache→印 md/§圖片來源/授權矩陣 row）
node scripts/tools/image-ingest.mjs ingest --src <URL|path> --cat <Category> \
  --name <subject>-<topic>-<year> --role hero|inline [--format webp|jpg|png] \
  --alt "具體 alt" --credit "..." --license "..." --source-url "https://commons.wikimedia.org/wiki/File:..."

## check 檢驗 gate（格式白名單 / aspect / size budget / EXIF 殘留）— pre-commit / CI 可掛
node scripts/tools/image-ingest.mjs check public/article-images/{cat}/<name>.webp --role hero

## audit 全站體檢（格式分佈 / 超標 / EXIF 洩漏 / WebP 遷移面）
node scripts/tools/image-ingest.mjs audit [--cat <Category>]
```

**授權仍是 human 判斷，tool 不查授權**：研究階段（Step 1.9）WebFetch File 頁逐字引用 license + 落 §媒體授權矩陣；REFLEXES #31 主 session 重驗每張 license（agent / manifest 的 license claim 是線索不是事實），確認後才把 `--credit/--license/--source-url` 交 tool 入庫。tool 只負責「驗證過的圖 → 乾淨入庫」。

**格式規範**：

```
✅ JPG (.jpg) — 預設：人像 / 風景 / 紀實照。sRGB / quality 80-90 / 無 EXIF GPS
                hero < 600KB / inline < 400KB
✅ PNG (.png) — 插圖 / 圖表 / 透明背景 logo / 螢幕截圖。8-bit RGBA / < 800KB
✅ WEBP (.webp) — **2026-06-13 起新媒體預設**（`image-ingest --format webp` source-level 轉檔；Astro passthrough 直送，瀏覽器全支援。既有 jpg/png 待全站遷移 roadmap）
✅ SVG (.svg) — vector logo / 簡單插圖。< 50KB / 無外部 reference / 文字 outline
❌ GIF / HEIC / BMP / TIFF — 禁用
```

**命名 convention**：`public/article-images/{category-lower-kebab}/{subject-slug}-{topic}-{year}.{ext}`

範例：

```
public/article-images/people/lindgren-emu-2014.webp
public/article-images/people/lindgren-crew4-training.webp
public/article-images/history/twenty-eight-incident-monument-2025.jpg
```

規則：全 lowercase / kebab-case / 必含 subject-slug + topic + year / ext 副檔名

**Aspect ratio 護欄**（避免 Astro 16:9 框切到頭，林琪兒 ι session 教訓）：

| 圖種                | 推薦比例                           | 推薦尺寸             | 理由                            |
| ------------------- | ---------------------------------- | -------------------- | ------------------------------- |
| hero（frontmatter） | **16:9 或更寬** landscape          | 1600×900 / 2000×1200 | Astro 16:9 框直接 fit           |
| inline 圖           | 可 portrait 但 ≤ 4:3 高比          | 1200×900 / 1500×1000 | markdown `![]()` 框較寬鬆       |
| 1:1 方形            | 接近方形 1:1 ± 10%                 | 1600×1600            | hero 也接受（如 EMU 1692×1691） |
| **絕對禁止 hero**   | 9:16 portrait（高 > 寬 1.5x 以上） | —                    | Astro 一定切到頭                |

強制檢查：`image-ingest ingest` 入庫時自動報 aspect（亦可 `image-ingest check <file> --role hero` 或舊 `check-aspect.sh` 單跑）。Hero aspect 必過 0.9 ≤ ratio ≤ 2.0；inline 必過 0.75 ≤ ratio ≤ 2.5。不過 → **換圖**（不要強塞，tool 不自動裁切，裁切是編輯判斷）。

##### Step 1.9.3: transcript 素材

| 來源類型                            | 處理方式                                                                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 公視／TaiwanPlus／官方 YouTube 訪談 | `yt-transcript.py fetch`（抓字幕 + 清逐字稿一條龍）→ 落 `reports/research/YYYY-MM/{slug}-transcripts/` → footnote 引 YouTube URL |
| Podcast 官方頁                      | footnote 引 podcast URL；若有 transcript 公開 → cache transcript                                                                 |
| 自製訪談錄音                        | 不公開原始錄音；只引 verbatim 段落，footnote 註明「Taiwan.md 自訪談 YYYY-MM-DD」                                                 |

**工具（2026-06-27 儀器化，REFLEXES #15 + §造橋）— `scripts/tools/yt-transcript.py`**：給 YouTube URL → yt-dlp 抓字幕 → 清成**連續逐字稿 + 每 ~60s 一個 `[MM:SS]` 錨點**（腳註可精確標時間，如「塞掐 E350 @ 12:34」）→ `.vtt`（raw 永留證據鏈）+ `.txt`（可讀版）落 `reports/research/YYYY-MM/{slug}-transcripts/`。取代手跑 yt-dlp + 臨時清時間戳/dedup。

```bash
## 一支或多支訪談抓進文章研究資料夾（預設 zh-TW,en；--month 預設今月）
python3 scripts/tools/yt-transcript.py fetch <URL> [<URL> ...] --slug {article-slug}
## 已手抓好的 vtt 單清
python3 scripts/tools/yt-transcript.py clean path/to/file.vtt -o out.txt
```

> ⚠️ **auto-caption 專名誤植鐵律**：自動字幕對人名／論文／機構／數字常誤植（紀懷新 case：季懷新→紀懷新、Danny→Denny Zhou、Information Forging→Foraging、Daniel Cunningham→Kahneman）。**逐字稿是線索不是定本，引用前每個專名對權威源校正**，別逐字照抄（[MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md) + [§挖引語紅線](../editorial/EDITORIAL.md#挖引語制度)）。底層仍是 yt-dlp（`brew install yt-dlp`）。

##### Step 1.9.4: 媒體授權矩陣三表（research 檔強制）

每篇 depth article 的 research 檔末尾 append：

```markdown
### 媒體授權矩陣

#### inline 外連（YouTube／影像／音檔）

| 作品      | 第一次提及位置                              | URL                                         | 來源頻道          | 授權             |
| --------- | ------------------------------------------- | ------------------------------------------- | ----------------- | ---------------- |
| 〈Cazzo〉 | L346「2019 年 6 月 28 日，她以『?te』之名」 | https://www.youtube.com/watch?v=CM-6FJlYHI4 | 華風數位 official | YouTube standard |

#### 圖片素材

| 媒體檔                | 用途 | 來源 URL                                                                    | 授權                 | 攝影者/作者        | 拍攝日期   | NASA Image ID / Commons File             | 本地 cache 路徑                               | alt text                                  |
| --------------------- | ---- | --------------------------------------------------------------------------- | -------------------- | ------------------ | ---------- | ---------------------------------------- | --------------------------------------------- | ----------------------------------------- |
| lindgren-emu-2014.jpg | hero | https://commons.wikimedia.org/wiki/File:Kjell_Lindgren_in_EMU_(cropped).jpg | Public domain (NASA) | NASA/Bill Stafford | 2014-08-27 | File:Kjell*Lindgren_in_EMU*(cropped).jpg | /article-images/people/lindgren-emu-2014.webp | 林琪兒 2014 年穿艙外活動服（EMU）官方人像 |

#### 引用 transcript

| Transcript     | 來源                   | URL                                         | 落檔路徑                                                      |
| -------------- | ---------------------- | ------------------------------------------- | ------------------------------------------------------------- |
| 公視訪談 zh-TW | 公視新聞網 official YT | https://www.youtube.com/watch?v=f9DQuQ8EwVE | reports/research/2026-04/林琪兒-transcripts/transcript-zh.txt |
```

##### Step 1.9.7: persona 讀者缺口稽核 + 增補（v7.7 新增，persona 從 Stage 0 搬來）🫂

> **v7.7（2026-07-06 施振榮）**：persona 20 路讀者切入點從 Stage 0（[原 0.6.1-bis](REWRITE-STAGE-0-VIEWPOINT.md#step-061-bis-persona-已移到研究後v77--見-step-197)）搬到這裡——研究報告 SSOT 組完之後、Stage 2 寫作之前。角色從「發散定調」改成「**讀者缺口稽核 + 增補**」。設計：[reports/design-立體群像...](../../reports/design-立體群像-default-persona-reposition-2026-07-06.md)。

**觸發**：所有 depth article（Micro / heal / 純翻譯不跑）。前提：Step 1.7 研究報告 §6 fact-pack 已組好、Step 0 立體觀點已成形。

**呼叫**（完整 contract + 20 archetypes + 4-agent 平行見 [PERSONA-PIPELINE](PERSONA-PIPELINE.md)）：

```
call PERSONA-PIPELINE:
  subject_brief: 題目 brief + 研究報告 §6 fact-pack + §觀點成型（給 persona 讀，不是冷 brief）
  mode: gap-audit          # v7.7 新 mode：對已成形的立體畫像補洞，不是冷發散定調
  profile_set: default 20
```

**每個 persona 問的**（跟舊 research-diverge 的差別）：不是冷讀者的第一反應，是「**看完這份研究後，我這種讀者還想知道什麼？哪個我在意的面向沒被 cover？**」。20 顆讀者腦袋在一張已成形的立體畫像上找洞。

**輸出處理（三分類 + 一個閥門）**：

1. 🆕 **真缺口** → 起 targeted 增補搜尋（補這個 facet 的事實/場景/引語），把 finding 加進 report §3/§6。**增補後 report 變了，Step 1.9.5 收尾前重跑 [research-report-health gate](REWRITE-STAGE-1A-RESEARCH.md#step-17-研究報告--ssot對標研究所論文標準-)。**
2. ✅ **已 cover** → 記錄不重複。
3. ⛔ **超 scope** → 落 `rationale.whats_excluded`。
4. 🔴 **反向閥門（立體 ≠ 迴避的自我糾正）**：如果 persona（尤其 D 軸挑硬傷/反方）揪出「這篇立體群像其實洗掉了一個真該被尖銳處理的公共爭議」→ 回 [Step 0.1.5](REWRITE-STAGE-0-VIEWPOINT.md#step-015-spine-類型判定v77-重構--立體群像是預設畫布) 重判，**三個合法目的地**（v7.8 從兩個擴為三個）：(i) 把那個爭議升成一個 substantial facet；(ii) **改判第三型「多觀點立場議題探討矛盾型」**——若該題是進行中的公共議題且多方都有正當立場，這通常是正解；(iii)（罕見）解鎖單軸矛盾驅動主脊。**這條讓立體 default 不變擋箭牌。**
   ⚠️ **為什麼要明列第三個目的地**（2026-07-25 外送專法）：該篇三軸反向閥門都命中，但 Step 0.1.5 的兜底是「拿不準 → 立體群像」，**偵測成功卻沒有轉成重判**，最後是觀察者一句話補上那個目的地。偵測機制有了、目的地沒寫，等於沒接上。

**為什麼放這裡而不是 Stage 0**：冷讀者天生問尖銳問題，放搜尋之前 → 尖角變研究方向 → 脊椎被推向矛盾驅動（施振榮 v1 教訓）。放研究後，同一句尖問變「要不要補一個 facet」而非「整篇該不該講這個」——從定調變補洞，且剛好接住 persona 誕生的 use case（《看不見的國家》ship 後哲宇追問三題＝完成度缺口，正該 ship 前被稽核接住）。

**Cost guard**：4 Sonnet agent 短輸出（reuse-from-report 優先）；下游 caller（SPORE hook-select）reuse 同一份 persona pool，見 [PERSONA-PIPELINE §4-5](PERSONA-PIPELINE.md)。

**落檔**：research report §讀者缺口稽核（20 persona × 分類 + 增補了什麼 + 反向閥門判斷）。

##### Step 1.9.5: Stage 1 收尾 checklist

Stage 1 結束時 deliverable：

- [x] 核心矛盾欄位必填（Step 1.4）— 填不出來 → 不進 Stage 2
- [x] depth-article 研究報告必存（Step 1.7）— `reports/research/YYYY-MM/{slug}.md` 不存在 → 不進 Stage 2
- [x] 媒體授權矩陣三表 append 完成（inline 外連 / 圖片 / transcript）
- [x] 圖片已 cache 在 `public/article-images/{category}/`
- [x] Aspect ratio 護欄通過（hero 0.9-2.0 / inline 0.75-2.5）
- [x] Transcript 已 cache 在 `reports/research/YYYY-MM/{slug}-transcripts/`
- [x] 私有 SSOT 整合過 Step 1.6 觀察者拍板（如有觸發）
- [x] Frontmatter audit 完成（`[STUB-TITLE]` / `[NO-MEDIA]` 標籤）— EVOLVE 才必跑

**沒過 = 不進 Stage 2。**

---

---

<!-- ==== source: REWRITE-STAGE-2A-PROJECTION.md @ 5b2ef8b4d ==== -->

## Stage 2.0 contract — 投影藍圖（研究 → 論點＋骨架）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1370-1388 + L1414-1426），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **職責**         | 讀整份研究報告，產投影藍圖（論點＋骨架＋每 section 雙重職責＋減法＋echo map＋視覺化候選）                                |
| **執行者**       | 主 session（Opus orchestrator）親自做，**不派給寫手**                                                                    |
| **INPUTS**       | 合成後 research report 全份；[PROJECTION.md](../editorial/PROJECTION.md) 全文（craft canonical）；graph.md（視覺化型錄） |
| **OUTPUTS**      | `reports/article-projection/{slug}.md`（frontmatter `projection_done: true`）                                            |
| **GATES**        | PROJECTION §gate 5 題（論點非摘要/骨架 shuffle/全局功能/減法非空/echo 覆蓋）；depth 題續走 2.0-R 編輯室外部尺            |
| **context 預算** | 本檔＋PROJECTION.md＋research report                                                                                     |

### AGENT PROMPT

**不派 agent**——投影是最高判斷，主 session（Opus orchestrator）讀整份 research report 親自做。craft canonical：[PROJECTION.md](../editorial/PROJECTION.md)（寫前完整讀）。

### 交付條件（stage 完成的定義）

- [ ] `reports/article-projection/{slug}.md` 存在，frontmatter：`article`＋`researchReport`＋`spine_type`＋`projection_done: true`
- [ ] 六節齊：論點／骨架／每 section 雙重職責／減法／echo map／審定
- [ ] PROJECTION §gate 5 題自檢過（作者自檢；外部尺在 2B）

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-2B-ROOM-PROJECTION.md（投影編輯室，depth HARD）

---

#### Step 2.0: 投影藍圖（v8.0 新增）📐 —— 研究 → 投影邏輯 → 文章 (HARD GATE)

> **canonical [PROJECTION.md](../editorial/PROJECTION.md)（寫本步前完整讀）。** 誕生：2026-07-13 哲宇跟陳睨聊後 callout「每個 section 單獨看都完整、接起來卻沒有一個更大的敘事 / 論點 / 意圖」。Stage 0 給**角度**、投影給**建築**、Stage 2 prose 給**句子**——以前從角度直接跳句子，中間沒人設計「這篇到底怎麼長成一個論證」，寫手拿面向清單一段寫一個面向 → 面向巡禮、加法不是乘法、整篇空泛。

**誰做**：主 session（Opus orchestrator），研究合成單檔（[Step 1.7.4](REWRITE-STAGE-1A-RESEARCH.md#174-合成單檔鐵律sibling-是中繼站stage-2-前必-consolidatev711-)）之後、派寫手之前。**不派給寫手**——寫手拿到的是已經想清楚的藍圖，執行結構不發明結構。

**產物**：`reports/article-projection/{slug}.md`（模板見 [PROJECTION.md §四](../editorial/PROJECTION.md)），六件事：

1. **論點**：一句話，有張力、要被賺到，非摘要（判準：讀者能不同意，或文章非證明不可）。論點型別跟 spine 綁定——矛盾驅動用辯論式主張，立體群像用有推進的統合洞見（**立體 ≠ 沒論點**，per [Step 0.1.5](REWRITE-STAGE-0-VIEWPOINT.md#step-015-spine-類型判定v77-重構--立體群像是預設畫布) + [REFLEXES #77](../semiont/REFLEXES.md)；投影對所有題要求推進，只對爭議題要求對立）。
2. **骨架**：動作序列（動詞不是名詞），過 **shuffle test**（section 順序打亂會讀不通，第 N 步預設第 N-1 步）。
3. **每 section 雙重職責**：局部承載 + **全局功能（替論點做什麼）** + 扣回主軸 + 進出連結。全局功能只有「介紹某面向」= 目錄條目 → 給功能或砍。
4. **減法**：明列砍掉什麼材料、為什麼（投影是選擇 + 連結，不是鋪滿；根治密度失衡）。
5. **echo map**：每個 section 一個回到主軸錨的 beat（不只頭尾）——錨反覆變奏 = 那個「宏大抽象的敘事」。
6. **審定**：spine 類型 / title 冒號三明治雛形 / 結尾畫面（先行）/ **視覺化候選（見 Step 2.0.5）** / 媒體分鏡。

**HARD GATE（5 題全過才派寫手）**：論點非摘要 / 骨架過 shuffle test / 每 section 有全局功能 / 減法非空 / echo map 覆蓋全篇。任一不過 → 回去重投影，不派寫手。寫手 read-receipt 加一項：**逐 section 複述全局功能**（證明它讀懂骨架不是照面向抄）。

> worked example：[reports/article-projection/Shopping-Design.md](../../reports/article-projection/Shopping-Design.md)（before＝可 shuffle 的面向巡禮，after＝五步論證，中間三面向壓成「機制放大」一步）。**Evolution 模式照樣先投影**——EVOLVE 最容易踩面向巡禮（研究更多、更想鋪滿）。

#### Step 2.0.5: 視覺化思考（v6.8 新增，v8.0 併入投影審定動作 6）💭📊

借 The Pudding「問題先於資料」：寫之前掃過 fact-pack，問三題（**不是強制加圖**——沒有適合的資料就誠實不加，記 research report）：

1. 這篇有哪些「**資料關係**」密集到讓 prose 變數字堆疊？**逐類掃過下面十五類**，不是憑印象想到哪算哪：

   | 資料關係               | 對應模組                    | 資料關係                 | 對應模組                               |
   | ---------------------- | --------------------------- | ------------------------ | -------------------------------------- |
   | 比較（誰跟誰不一樣）   | `tw-bars` / `tw-versus`     | **量級人性化**（大數字） | `tw-iso` / `tw-figure`                 |
   | 排名（誰第幾）         | `tw-bars` 排序 / `tw-dot`   | 流向（怎麼轉換）         | 暫無，退 `tw-stack`／表                |
   | 變異分歧（偏離基準）   | `tw-bars` 負值 / `tw-stack` | **地理（縣市分布）**     | `tw-tiles`                             |
   | **部分對全體（跨列）** | `tw-stack`                  | **席次組成（議會）**     | `tw-arc`                               |
   | 部分對全體（單一總體） | `tw-waffle`                 | **多組同型趨勢**         | `tw-multiples`                         |
   | **分布（背對背）**     | `tw-pyramid` / `tw-dot`     | 階層網絡                 | 少用，退 prose                         |
   | 相關（兩變數）         | `tw-heatmap`                | 單一關鍵數字             | `tw-figure` / `tw-stat`                |
   | 趨勢時間               | `tw-line` / `tw-slope`      | 質性標註                 | `tw-quote` / `tw-timeline` / `tw-note` |

   **粗體那六類是 2026-08-02 量到零真實使用的模組**——不是它們沒用，是本題舊版只列了八類，這六類從來沒被提案過（設計報告 [design-viz-adoption-2026-08-02](../../reports/design-viz-adoption-2026-08-02.md) §2.3a：漏斗開口比管子窄，後段永遠是乾的）。**選舉題先問席次跟縣市、人口題先問背對背、跨縣市指標先問磚圖。**

2. 每個密集點，[graph.md §型錄](../editorial/graph.md) 哪個 `tw-*` 模組最適合？（**一圖一重點**：一個關係一張圖）。從題材反查現成寫法 → [VIZ-RECIPES.md](../editorial/VIZ-RECIPES.md)（台灣題材 → 可整塊複製的 starter）。
3. 這張圖的 **annotation** 要寫什麼「為什麼重要」？（不是裝飾，是策展觀點）

產出：在 research report §觀點成型 或 fact-pack 標「視覺化候選清單」（哪段 → 哪個 `tw-*` → 想講的重點 → 來源）。Writer agent 吃這份清單，把密集數字段升級成模組（語法見 graph.md §四）。

> **指標**（viz 不是越多越好，避免 chartjunk）：depth 文至少**評估過** 1 個候選（可記「評估後不加 + 理由」）；資料圖表模組 100% 標來源（`viz-health` gate）；viz 密度跟 media band 共管（`paragraph-rhythm`）。**「讓 LLM 讀得懂的視覺化 = 主權的視覺化」**——禁圖片型/D3/Canvas viz、禁「如上圖」AI-blind 指示語。
> **設計脈絡**：[reports/article-visualization-design-2026-06-06.md](../../reports/article-visualization-design-2026-06-06.md)。

---

<!-- ==== source: REWRITE-STAGE-2B-ROOM-PROJECTION.md @ 70e08c91d ==== -->

## Stage 2B contract — 投影編輯室（Step 2.0-R，乾淨 context 分席對抗）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1389-1413 + L1474-1486），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 投影後（2.0-R：結構/減法/炎上三席）與正文後（2.5-R：結構主編/論點兌現二席）乾淨 context 分席審，主編合成裁決                                  |
| **執行者**       | seats ＝ parallel Sonnet sub-agent（prompt 一律 [EDITORIAL-ROOM-PROMPTS.md](EDITORIAL-ROOM-PROMPTS.md) 填槽，禁即興）；**主編永遠主 session** |
| **INPUTS**       | 2.0-R：投影藍圖＋research report（唯讀）；2.5-R：投影藍圖＋staging 正文。**禁止輸入**：舊文全文/寫作閒聊 context                              |
| **OUTPUTS**      | `reports/editorial-room/{slug}-projection-review.md` / `{slug}-prose-structure-review.md`（frontmatter room/seats/overall/rounds）            |
| **GATES**        | `python3 scripts/tools/editorial-room-health.py {review}`；overall=block → 回修（最多 2 輪全席，第 3 輪升級觀察者）；必改 ≤7                  |
| **context 預算** | 各席只吃填槽 prompt＋審查對象；主編收件合成                                                                                                   |

### 攻防輪（v1.1）

任一席 revise／block → 寫方答辯一輪（accept／defend，prompt 見
[EDITORIAL-ROOM-PROMPTS §攻防輪](EDITORIAL-ROOM-PROMPTS.md)），主編看攻防後才最終裁決；
review 檔加 `## 攻防` 段（challenge／defense／ruling 三欄——公開視覺化的爭議過程素材）。
規則 canonical：[EDITORIAL-ROOM §攻防輪](../editorial/EDITORIAL-ROOM.md)。

### AGENT PROMPT

三席 prompt 唯一來源：[EDITORIAL-ROOM-PROMPTS.md](EDITORIAL-ROOM-PROMPTS.md) §投影室（結構主編／減法主編／炎上倫理）＋§攻防輪。填槽派發，禁即興。

### 交付條件（stage 完成的定義）

- [ ] `reports/editorial-room/{slug}-projection-review.md` 落檔（room: projection，含各席 verdict＋必改 ≤7＋攻防段）
- [ ] `editorial-room-health.py {review}` exit 0
- [ ] overall=pass（block → 回修投影最多 2 輪，第 3 輪升級觀察者）

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：pass → REWRITE-STAGE-2C-WRITE.md；block → 回修投影（最多 2 輪）

---

#### Step 2.0-R: 投影編輯室（v8.1）🏛️ — 編輯室對抗 (HARD depth)

> **canonical [EDITORIAL-ROOM.md](../editorial/EDITORIAL-ROOM.md) + [EDITORIAL-ROOM-PROMPTS.md](EDITORIAL-ROOM-PROMPTS.md)。**  
> 誕生：2026-07-15 哲宇「用 subagent 做編輯室對抗是結構」+ 陳睨「編輯台蓋回來／主編這隻手」；投影 5 題是作者自檢，編輯室是**乾淨 context 外部尺**。

**誰做**：3 個 parallel seat subagent（結構主編／減法主編／炎上倫理；Thin 可併減法→結構）+ **主 session 當主編**合成。**各席不准寫過藍圖的同一 context。**

**輸入（唯讀）**：`reports/article-projection/{slug}.md` + research report + PROJECTION §gate。  
**禁止輸入**：舊文全文、orchestrator 寫藍圖時的閒聊、writer draft。

**產物**：`reports/editorial-room/{slug}-projection-review.md`  
**儀器**：`python3 scripts/tools/editorial-room-health.py reports/editorial-room/{slug}-projection-review.md`

**Gate**：

| overall    | 動作                                           |
| ---------- | ---------------------------------------------- |
| **block**  | 回修投影藍圖；最多 2 輪全席；第 3 輪升級觀察者 |
| **revise** | 主編勾選 ≤7 必改；修後可只重跑 raise 席        |
| **pass**   | 才准派寫手                                     |

**depth EVOLVE / Fresh / A 級 = HARD。** standard 可 Thin（結構+炎上+主編）。Micro skip。

**Dogfood**：[reports/editorial-room/Shopping-Design-projection-review.md](../../reports/editorial-room/Shopping-Design-projection-review.md)（2026-07-15）。

---

<!-- ==== source: REWRITE-STAGE-2C-WRITE.md @ 36d5c8e32 ==== -->

## Stage 2 contract — 寫（fresh writer 照藍圖執行）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1356-1369 + L1427-1473 + L1487-1665），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 照投影藍圖執行正文（不重排結構）：結尾先行 → 開場 → 小標題 → 正文＋footnote → 7 條自檢 → 富文本密度                                                       |
| **執行者**       | 1 個 fresh Opus writer sub-agent（prompt 一律 [WRITER-PROMPT.md](WRITER-PROMPT.md) 填槽，禁即興）；Micro/短修正主 session 自跑                            |
| **INPUTS**       | writer 必須完整 Read：research report 全份（§6＋§8 raw）＋投影藍圖＋EDITORIAL.md 全文＋graph.md。**隔離**：舊文 prose / callout                           |
| **OUTPUTS**      | Evolution：`reports/article-evolve/{slug}.md`（staging，禁 overwrite canonical）；Fresh：`knowledge/{Cat}/{slug}.md`                                      |
| **GATES**        | Stage 2 hard gates 10 條（文內）；`article-health.py --check=prose-health` / `--check=chronicle-lead`；Evolution 覆蓋權在主 session（2.5 比對後親手覆蓋） |
| **context 預算** | writer＝本檔執行段＋WRITER-PROMPT 宣告的必讀四 canonical＋research report                                                                                 |

### Staging 檔 frontmatter（v9.0 新增，狀態歸戶顯式化）

Evolution mode 的 staging 檔 `reports/article-evolve/{slug}.md` 開頭必帶：

```yaml
---
article: knowledge/{Cat}/{canonical-slug}.md # 顯式指標；staging slug 可以 ≠ canonical slug
researchReport: reports/research/{YYYY-MM}/{slug}.md
date: YYYY-MM-DD
---
```

為什麼：編輯台（generate-newsroom-data.py）與任何 verifier 依顯式指標歸戶，不猜檔名
（2026-07-12 Sol strict verifier 假陰性教訓）。

### AGENT PROMPT

writer prompt 唯一來源：[WRITER-PROMPT.md](WRITER-PROMPT.md)（v2.0 薄殼：必讀四 canonical＋read-receipt＋機械輸出契約＋anti-example）。填槽派發，禁即興。

### 交付條件（stage 完成的定義）

- [ ] Evolution：`reports/article-evolve/{slug}.md` staging 落檔（frontmatter 帶 `article:` 顯式指標）；Fresh：`knowledge/{Cat}/{slug}.md`
- [ ] Stage 2 hard gates 10 條全過（本檔 §Stage 2 Hard gates）
- [ ] `article-health.py --check=prose-health` ＋ `--check=chronicle-lead` 無 hard
- [ ] writer read-receipt 驗過（research report §6＋§8／投影藍圖／EDITORIAL 全讀）

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-2D-SOURCE-FIDELITY.md（觸發面內）→ REWRITE-STAGE-2E-ROOM-PROSE.md

---

### Stage 2: 寫（預算 40-45%）

> **v6.3 預設**：depth EVOLVE / Fresh 的 Stage 2 **派 fresh Opus sub-agent 寫**（context 隔離，見 [§多 agent 編排](REWRITE-PIPELINE.md#-多-agent-編排v63-orchestrator--tiered-sub-agents)）。主 session 只把 clean fact-pack ＋ 觀點 ＋ EDITORIAL 交給 writer，不轉貼舊文 prose。Micro / 短修正才主 session 自寫。

**必讀**：`cat docs/editorial/EDITORIAL.md`（全文，1000+ 行，**不可截斷**）

> ⚠️ **歷史教訓（session δ 2026-04-05）**：之前這裡寫 `head -300`，切掉了 Line 380-479 的 Before/After 範例段落。AI 讀到規則卻沒讀到範例，寫作時退化為編年史。
>
> 不要用 `head` / `tail` 截斷「必讀」指令。完讀後必須回頭檢查四個段落：§挖引語制度、§小標題規範、§結尾的四種模式、§Before/After 實例對比。

**輸入**：Stage 1 研究筆記 + EDITORIAL.md。

**視覺化必讀**（含資料 / 對比 / 時序的文章）：`cat docs/editorial/graph.md`（型錄 + 模組語法 + AI 可讀性 + 檢查清單）。

#### Step 2.1: 載入 EDITORIAL.md

讀全文，特別注意 §來源引用、**§小標題規範**、§敘事呼吸感、§Title 強制冒號三明治（v6.3 全 category）。

#### Step 2.2: 結尾先行（3-5 行）← 最重要

**結尾先行**是 Stage 2 防崩潰的核心：

- 結尾是品質崩塌的起點。先寫結尾 = 保底
- 範本見 [EDITORIAL §結尾的四種模式](../editorial/EDITORIAL.md)
- 用 Stage 1 Step 1.2 鎖定的結尾素材

#### Step 2.3: 開場 + 30 秒概覽

開場前三句必須有：具體事實 + 具體的人 + 具體的時刻。

30 秒概覽（blockquote 格式 `> **30 秒概覽：**`）放在 H1 之後、第一個 H2 之前。

#### Step 2.4: 小標題先行（hard 規則）— 段落 H2，不是 description 副標

**列出全文 5-8 個小標題 BEFORE 寫正文**。完整機制：[EDITORIAL §小標題](../editorial/EDITORIAL.md)（主–述–賓還原、載體、與投影全局功能分層、報導者式取景）。

| 規則                    | 例子                                             |
| ----------------------- | ------------------------------------------------ |
| ❌ 編年體               | 「2016 年《XX》發行」— plugin `chronicle-lead`   |
| ❌ 空殼問句／百科抽屜   | 「為什麼重要？」「發展歷程」「背景」             |
| ❌ 投影內部動詞直接上站 | 「立起悖論」「機制放大」「信任邊界」（無載體時） |
| ✅ 場面／物件／數字落差 | 「凌晨的加護病房：22 個人，剩下 12 個」          |
| ✅ 可還原主–述–賓       | 「頂新賣不掉，伊藤忠進場」→ 有人、有動作         |
| ✅ 核心矛盾的人話命題   | 「有比例，有沒有人」（底下立刻兌現）             |

**驗證**：

1. 念目錄：像故事節拍，不像簡報大綱／第一章第二章。
2. **還原測試**：每個 H2 能否變成「誰／什麼 + 動作或狀態 + 著落」？
3. 可搬到另一篇完全不同文章 = categorical，重寫。

> **plugin gate**：`chronicle-lead` 抓年份編年 H2。抽象／無載體小標目前靠人判 + 編輯室結構席（尚無獨立 plugin）。

#### Step 2.5: 寫正文 + footnote

**不按百科排列**。EDITORIAL §正文架構推薦：**起源 / 關鍵轉折 2-3 個 / 現況 / 爭議 / 意義**。

- 邊寫邊插 `[^n]` footnote（從 Stage 1 的事實 - 來源配對表對應）
- **不是一段寫一張專輯** — 是一段寫一個**論點**或**轉折**，事實散布在論點之中
- **照投影藍圖執行**，不重排成面向巡禮（寫手 read-receipt 已複述全局功能）

##### 文末寫 footnote 定義

**腳註格式 canonical 在 [CITATION-GUIDE.md](../editorial/CITATION-GUIDE.md)**。簡寫範例：

```markdown
[^1]: [來源名稱](URL) — 詳細說明文字（≥ 20-30 字描述出版背景、內容特色、歷史價值）
```

完整格式 + 對比範例 + 「不要寫『同上』」規則 → [CITATION-GUIDE.md](../editorial/CITATION-GUIDE.md)。

#### Step 2.6: 延伸閱讀

- 讀取 `knowledge/` 目錄，找出相關文章
- 每篇加「一兩句話描述」說明與本文的關係
- 格式：標準 Markdown 連結 `[文章名](/path/slug)`，**不用 `[[wikilink]]`**（Astro 列表項目中的 wikilink 無法渲染）
- 3-5 條最理想

格式範例：

```markdown
**延伸閱讀**：

- [戒嚴時期](/history/戒嚴時期) — 戒嚴令的法源與實施細節
- [白色恐怖](/history/台灣白色恐怖) — 政治案件與人權侵害的歷史
- [二二八事件](/history/二二八事件) — 戰後台灣的重大歷史轉折
```

#### Step 2.7: 7 條自檢套件（強制鐵律）

寫完 prose 後**強制**跑這 7 條自檢。任何一條不過 = 回去修。

##### Step 2.7.1: 歐化語法自檢

念出來，聽到翻譯腔就改：

- 重點掃：被動句（「被認為」）、「的」連鎖（≥ 3）、弱動詞（「進行」「透過」）
- **英式短句開場（第 9 病，2026-08-19 起嚴格執行）**：逐段看段首那一句——它是在陳述判斷或狀態（是／有／叫／可以／一直／也）而不是寫一個動作、底下幾句在展開它、接進下一句會更像人在講話 → 三個都是就改。工具只抓骨架（`prose-health` §8e v3），**冒號引子、日期場景句、刻意當節拍的孤句不算**，這三類是人判。同一篇哲宇同日點兩次才學到：第一輪用工具的尺順過就算完，第二輪他的耳朵抓到 15 處工具只報 0——**寫完先用人眼把每一段的段首句念一遍，再跑工具**，順序不要反
- 詳見 [EDITORIAL.md §歐化語法 第 9 病第三輪](../editorial/EDITORIAL.md)

##### Step 2.7.2: prose-health plugin gate（對位句型 + 破折號 + AI metaphor 全交給工具）

寫到 60% 時或寫完 prose 後，**直接跑 plugin**，不要手 grep。

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{slug}.md --check=prose-health
```

plugin 抓 12 dim 塑膠 + 3 tier 對位句型（含「不是 X，是 Y」「不只 X 更是 Y」「並非 X 而是 Y」全部變種）+ 30+ AI metaphor + 17 ritual 句 + 破折號密度。每條 violation 含 line + 前後文 snippet + fix suggestion，可直接定位修正。

**閾值**（per MANIFESTO §11）：

- 對位句型「不是 X，是 Y」+ 變種：≤ 3 處
- 破折號 ——：≤ 15 / 1500 字（plugin 用比例計算）
- **英式短句開場 §8e**：≥3 處計 +1、≥6 處 +2（2026-08-19 升計分）；pre-commit 觸檔 >10 處 HARD。目標是 0-2 處且每一處都是刻意節拍
- prose-health score：≤ 3 為 pass

**為什麼禁用手 grep**（REFLEXES #15 self-apply）：

- plugin 抓的 pattern 比 manual regex 全（含 7-9 種對位變體）
- plugin 有精確 line + 前後文，可直接 jump-to-fix
- 「反覆浮現的思考要儀器化」原則 self-apply — 自己手 grep 是繞過 SOP，每次跑 plugin 累積進化（觀察者 2026-05-11 admiring-montalcini callout）

**歷史教訓**：2026-04-10 國防現代化一寫就到 29 個破折號，事後逐個刪很痛；plugin 在中段 60% 時抓出來，比寫完痛苦回頭便宜 10x。

##### Step 2.7.3: 編年體自檢

寫完後**念一遍所有小標題**：

- 如果每個標題都是「年份 + 事件」= 編年體失敗，重寫小標題
- 如果文章每段都在講下一張專輯/下一個事件 = 維基百科化失敗

> **plugin gate**：`article-health.py --check=chronicle-lead`（regex 偵測，HARD）。

##### Step 2.7.4: 密度平衡自檢（EVOLVE 長文專用）

研究素材豐富（50+ sources）時**強制跑**：

隨機挑三段連續段落念一遍：如果三段都是事實堆疊、沒有一句讓讀者喘氣的話 = 密度失衡。

**三個修正手勢**（詳見 [EDITORIAL §密度平衡](../editorial/EDITORIAL.md)）：

1. **量化內化為場景**：不寫「196 sessions / 50 學生」→ 寫「有個學生叫 Kasper 跟了整整兩學期」
2. **列表拆成場景**：整年六件事不擠一段，拆出 1-2 個完整場景，其他用連續性語言帶過
3. **每 2-3 段一句策展人的聲音**：呼吸句不傳遞資訊、只製造停頓

來自 2026-04-20 吳哲宇 EVOLVE 實戰：50+ sources 的第一版 prose 5500 字被觀察者評「資訊多到蓋住敘事」，重寫縮到 4800 字但讀起來更開闊。**長文不是孢子的加長版，需要主動選擇留白**。

##### Step 2.7.5: Agent claim 驗證

agent 在研究報告中聲稱的「XXX 背書」「XXX 公開推薦」等名人相關 claim，**必須有具體公開 URL + 該 URL Ctrl-F 可搜到該人原始引語**：

- 三源交叉不是「三個不同 agent 都這樣說」——是「**三個獨立的公開 URL 都有逐字引語**」
- agent hallucination 常見模式：基於 Obsidian / 私有素材的側面提及「推導出」一個名人 claim，但外部 URL 其實沒有該人的任何公開發言
- 2026-04-20 實戰：agent 聲稱「張隆志館長背書」「唐鳳為 Taiwan.md 引薦」，主 session 回頭驗證——兩者均無外部公開引語。（用語紀律補註：館長的實際立場是公開「支持」這個計劃；任何書寫一律用「支持」不用「背書」，哲宇已多次更正）

**自檢問句**：「這個 claim 如果我是陌生記者，能不能只靠公開資料寫進我的報導？」能 → 可寫；不能 → 降級或刪。

##### Step 2.7.6: Title + description spine sync 🥪 🔴

> **特別強化**：所有 article（**含 EVOLVE focused section addition**）寫完 prose 後**必須回看 frontmatter title + description**，三題自檢：

1. **冒號三明治測試** — title 是否走「主題：副標 hook」格式？單純名詞 stub（`台灣無人機產業` / `颱風` / `周杰倫`）= 百科風格，需升。對照 [EDITORIAL §Title 強制冒號三明治（所有 category）](../editorial/EDITORIAL.md#title-強制冒號三明治所有-categoryv63) v6.3 — 不限 People，全 category 強制
2. **副標獨立成立測試** — 冒號後一句能不能單獨 tweet 出去？讀者只看到副標也能停下來嗎？
3. **EVOLVE spine sync 測試** — 這次 EVOLVE 加的新節核心矛盾，是否已寫進 description？舊 description 還適用嗎？description 沒吃進新核心 = SC 顯示舊 hook 但讀者點進來看到新內容 = 落差
4. **文字感 + 負面/草率掃描** 🆕（v6.5）— 標題有沒有報導者腔的文字感（具體人/地/物 + 張力 + 留白）？有沒有踩中文語境紅線（網路輕佻「搞/爛/雷/翻車」、農場「震驚/竟然/真相是」、負面定調「崩壞/淪陷」、自貶 dismissive、過度賣弄）？一句判準：念給長輩聽像「認真報導」還是「網路八卦」？canonical + 18 範例 gallery 在 [EDITORIAL §Title 的文字感](../editorial/EDITORIAL.md#title-的文字感--對標報導者公視獨立媒體v65-新增2026-06-04)

**任一答 no → 重寫 frontmatter title + description，跟 prose 同 commit**。

**對照組**：

```
❌ 台灣無人機產業（百科 stub）
✅ 台灣無人機產業：從台中玩具飛機到藍色清單，一張入場券給了雷虎

❌ 颱風（百科 stub）
✅ 能預測風雨，預測不了命運：台灣與颱風的四百年

❌ 颱風假
✅ 颱風假：誰的假，誰的班
```

**例外**（保留 stub 名）：

- Hub 頁（`_*.md`）— 是 nav
- 系列共名（如 `台灣企業：台積電`）— 副標 hook 進 description

##### Step 2.7.7: 媒體素材 spine check 🎬 🔴

> **特別強化**：所有 article（含 EVOLVE）寫完 prose 後 grep 既有 frontmatter：

```bash
grep -E "^image:|^imageCredit|^imageLicense|^imageSource" knowledge/{Category}/{slug}.md
ls public/article-images/{category-lower}/ | grep {slug-keyword}
grep -E "^## 圖片來源|^## 媒體授權|^## 圖片授權" knowledge/{Category}/{slug}.md
```

**三條判斷**：

| 結果                                    | 處置                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 三項全有                                | 已合規，跳過                                                                                     |
| 三項全無（pre-gate 遺珠）               | 補跑 Stage 1 Step 1.9 至少 hero 1 張，append §圖片來源 section                                   |
| Hero 有但 EVOLVE 加的新節主題缺對應視覺 | 評估是否需補 inline 圖（per Stage 4 Step 4.3.1 三段敘事節奏），找不到 PD/CC 圖記錄邊界（不放空） |

**為什麼必須**：

- Stage 1 Step 1.9 的 hard gate 是 2026-04-28 才升（v6.0 重編號前為 Step 1.14），更早 ship 的 article 多為 pre-gate 遺珠
- focused EVOLVE 加新節時容易忽略「既有 article 的媒體狀態」— 假設「上次 ship 已合規」，但 pre-gate 條目實際無 hero
- 找不到合適 PD/CC 圖時不可放空 → 走 fair use editorial commentary scope（per Step 1.9.2 第 8 點）或記錄 search 邊界

#### Step 2.8: 富文本 + footnote 密度

每 300 字 ≥ 1 個 footnote（per [CITATION-GUIDE](../editorial/CITATION-GUIDE.md)）。

富文本元素（per EDITORIAL）：

- 📝 策展人筆記
- 💡 你知道嗎
- ⚠️ 爭議觀點
- ✦ 結尾警句

每 800-1200 字 ≥ 1 個富文本元素，幫助節奏 + 視覺呼吸。

#### Stage 2 Hard gates（10 條）

寫完 prose 不直接進 Stage 3，先驗：

- [x] 結尾不是罐頭（per EDITORIAL §結尾的四種模式）
- [x] 第一個名字是具體的人（前 30 行至少一個 named individual）
- [x] ≥ 2 句真人引語（人物題材）
- [x] 因果鏈完整（不是 list dump）
- [x] 開場具體事實（年/月/日 + 人 + 動作）
- [x] 富文本達標（每 800-1200 字 ≥ 1）
- [x] 挑戰編織在故事裡（不是脫離敘事的論述句）
- [x] 純中文（無漏英文 paraphrase / 翻譯體）
- [x] 7 自檢全跑（Step 2.7.1-2.7.7 全過）
- [x] 小標題不像「第一章第二章」
- [x] word-count ≥ 4500 CJK chars（depth article）

---

---

<!-- ==== source: REWRITE-STAGE-2D-SOURCE-FIDELITY.md @ 70e08c91d ==== -->

## Stage 2.5 contract — source-fidelity gate（來源逐字回溯＋staging 比對覆蓋）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1666-1679），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **職責**         | 驗成品對真實世界來源（fetch 原頁逐字比對，不只信 report）；Evolution mode 由主 session 比對 staging vs 舊 canonical 後親手覆蓋 |
| **執行者**       | 主 session；fresh-writer 長文可 spawn fact-check agent（falsification mindset）                                                |
| **INPUTS**       | staging/canonical 正文；被引用來源 URL；research report                                                                        |
| **OUTPUTS**      | 修正 in-place；Evolution：主 session 覆蓋 `knowledge/{Cat}/{slug}.md`                                                          |
| **GATES**        | 觸發面：A 級 / fresh-writer EVOLVE 長文 / 含外部來源引用；三道（artifact 逐字 / 門面句 / fact-check pass）全過才覆蓋 canonical |
| **context 預算** | 本檔＋成品＋來源頁                                                                                                             |

### AGENT PROMPT（fact-check agent，v9.0 補齊薄殼）

> fresh-writer 長文觸發第三道時填槽派發；主 session 自跑前兩道。

```
你是事實查核員，姿態是 falsification：試著讓這篇文章的引用不成立。
只讀：{STAGING_PATH} 全文＋文內引用的來源 URL（用 WebFetch／curl 逐一開啟原頁）。
對每個帶 footnote 的 claim：到原頁 Ctrl-F 找到支撐句，逐字比對；找不到或語意被改寫
（詮釋 gloss、印象化、數字漂移）就列出。門面句（title／description／30 秒概覽）單獨過一輪。
輸出：逐條 {claim｜來源｜verbatim 支撐句｜verdict: hold/drift/fabricated}，不重寫文章。
```

### 交付條件（stage 完成的定義）

- [ ] 三道全過：來源 artifact 逐字比對／門面句 scope／（觸發面內）fact-check agent pass
- [ ] Evolution：主 session 完成 staging vs 舊 canonical 比對（沒丟有價值素材）後親手覆蓋
- [ ] 修正全部 in-place 完成，drift／fabricated 清零

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-2E-ROOM-PROSE.md（正文結構編輯室）

---

### Stage 2.5: source-fidelity gate（來源逐字回溯）— A 級 / fresh-writer EVOLVE 長文 HARD 🔬

> **v7.6 新增（2026-06-16 哲宇 directive「升級」）**。distill 自 LESSONS meta-umbrella `stage2-quote-context-collapse`（vc=8，8 instance 跨 無名小卒 / 國家太空中心 / 嘻哈饒舌 / 廣告史 / 壞特 / 迷音 / 報導者 / 大鮪鱸鰻）。**第一性原理**：Stage 2 writer 即使讀了整份 research report，下筆仍會把研究結論 collapse 成偏記憶 / 偏印象 / 偏字面 / 偏未驗證狀態的 claim——Stage 1 SSOT 寫對、Stage 2 寫歪。structure gate（word-count / footnote / image / viz）全綠 ≠ 事實對；只拿成品比對 research report 也不夠（report 本身可能不全，或 writer 長出 report 沒有的東西）。本 gate 在 **EVOLVE 主 session 覆蓋 canonical 前 / Fresh ship 前**跑，與 Step 3.6 成品總驗互補：3.6 驗「成品內部一致 + 對 report」，2.5 驗「對真實世界的來源」。

三道（任一不過 = 不覆蓋 canonical / 不 ship；已 ship 則 heal + 公開勘誤，per error-boundary-is-traceability）：

1. **來源 artifact 逐字回溯**（instance #8 大鮪鱸鰻）：文中每個「引用的外部來源標題 / 圖表名 / 報導名 / 截圖文字」**不能只信 research report**，要實際 fetch 那個來源 artifact（WebFetch 原頁中文逐字 prompt / curl）逐字比對。大鮪鱸鰻 case：標題誤植「大骪鱸鰻」+ 虛構整段「冷僻字」考據，連 4-agent fact-check 都漏，是為了補連結去 fetch 原圖表頁才現形——**cross-check claim 不夠，要 fetch artifact**。
2. **門面句 scope**（instance #6 迷音）：collapse 不只在 body prose，更在 **frontmatter title + description + 30 秒概覽**（讀者第一印象 + 最易被外部攻擊層）。這三處每個事實 / 法律狀態（allegation→fact）/ 專名 claim 單獨過一次——迷音把 sub judice 未定罪指控在標題壓成既成事實（「偷」），內文紀律守住、門面句崩了才出事。
3. **fact-check agent pass**（instance #7 報導者）：fresh-writer EVOLVE 長文派一輪 fact-check agent（falsification mindset、分簇平行、official 一手 > 媒體轉述），主動查事實 / 幻覺 / 對真人失真指控。報導者 case：6/14 全 gate 綠的 prose 裡藏寶瓶副標幻覺 + 對真人朱亞君「不當行為」失真指控，靠主動 4-agent 查核才抓到——**gate 驗結構，agent 驗事實**。

**觸發**：A 級 / 大眾文 / fresh-writer EVOLVE 長文 / 含引用外部來源標題或圖表 / callout-triggered。輕量 Fresh 或無外部引用的短文至少跑第 2 道（門面句）。

---

---

<!-- ==== source: REWRITE-STAGE-2E-ROOM-PROSE.md @ dddc05fa0 ==== -->

## Stage 2E contract — 正文結構編輯室（Step 2.5-R）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：執行者只讀本檔＋INPUTS 宣告的檔案。
> 派發路由在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)。內文自 v8.0 verbatim 搬移（原行號 L1474-1486）。

### 執行卡

|                  |                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 正文是否**執行**投影藍圖（全局功能兌現／論點中段被證明），非再發明結構                                                                             |
| **執行者**       | 2 parallel Sonnet seats（結構主編＋論點兌現，prompt 一律 [EDITORIAL-ROOM-PROMPTS.md](EDITORIAL-ROOM-PROMPTS.md) 填槽，禁即興）；主編永遠主 session |
| **INPUTS**       | 投影藍圖＋staging／canonical 正文。**禁止輸入**：research report 全份、寫作閒聊 context                                                            |
| **OUTPUTS**      | `reports/editorial-room/{slug}-prose-structure-review.md`（room: prose-structure＋`## 攻防` 段）                                                   |
| **GATES**        | `python3 scripts/tools/editorial-room-health.py {review}`；必改 ≤7；可與 Step 3.6 同 round 平行                                                    |
| **context 預算** | 各席只吃填槽 prompt＋藍圖＋正文                                                                                                                    |

### AGENT PROMPT

各席 prompt 唯一來源：[EDITORIAL-ROOM-PROMPTS.md](EDITORIAL-ROOM-PROMPTS.md) §正文結構室（結構主編／論點兌現）＋§攻防輪。禁即興增刪。

> **spawn 時機（v9.5）**：本站席位由大驗證輪一次平行派齊（與 3.6.1 verifier、3.7 探針同輪，
> 編排 canonical 在 [REWRITE-STAGE-3-VERIFY §Stage 3 收驗編排](REWRITE-STAGE-3-VERIFY.md)）。
> 席位讀什麼、審什麼不變——本 contract 對席位執行者仍然自足。

### 攻防輪（v1.1）

任一席 revise／block → 寫方答辯一輪（規則 canonical：[EDITORIAL-ROOM §攻防輪](../editorial/EDITORIAL-ROOM.md)），主編看攻防後裁決，review 檔記 `## 攻防` 段。

### 交付條件（stage 完成的定義）

- [ ] `reports/editorial-room/{slug}-prose-structure-review.md` 落檔（room: prose-structure，含各席 verdict＋必改 ≤7＋攻防段）
- [ ] `editorial-room-health.py {review}` exit 0
- [ ] overall=pass（revise → 修後可只重跑曾 raise 的席）

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮
5. 下一棒：REWRITE-STAGE-3-VERIFY.md

---

#### Step 2.5-R: 正文結構編輯室（v8.1）🏛️

> **canonical [EDITORIAL-ROOM.md](../editorial/EDITORIAL-ROOM.md)。** 與 [Step 3.6 成品總驗](REWRITE-STAGE-3-VERIFY.md#step-36-成品總驗三關assembled-product-verification--a-級大眾文-hard-) **分工**：本步查「有沒有執行藍圖／論點有沒有中段兌現」；3.6 查事實 atom／順稿／視覺。

**誰做**：2 parallel seats（正文結構主編 + 論點兌現）+ 主編合成。可與 3.6 fan-out **同 round 平行**。

**輸入**：投影藍圖 + staging／canonical 正文。  
**產物**：`reports/editorial-room/{slug}-prose-structure-review.md`  
**儀器**：`editorial-room-health.py`  
**Gate**：block/revise → 回修正文；pass → 進 Stage 3 其餘／與 3.6 合併主編清單後 ship。

**Dogfood**：[reports/editorial-room/Shopping-Design-prose-structure-review.md](../../reports/editorial-room/Shopping-Design-prose-structure-review.md)。

---

<!-- ==== source: REWRITE-STAGE-3-VERIFY.md @ 36d5c8e32 ==== -->

## Stage 3 contract — 驗（草稿驗＋成品總驗）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1680-1901），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 五指＋事實鐵三角＋FACTCHECK＋story atom＋title/desc re-check＋（A 級/大眾文 HARD）成品總驗三關＋大驗證輪編排＋定稿站                                          |
| **執行者**       | 主 session；大驗證輪一次平行派齊：2.5-R 席＋3.6.1 M 個 Sonnet verifier＋3.7 探針（v9.5 編排 canonical 在 §Stage 3 收驗編排）                                  |
| **INPUTS**       | 成品全文；research report（verification table）；FACTCHECK-PIPELINE.md（Quick/Full SSOT）                                                                     |
| **OUTPUTS**      | `reports/research/{YYYY-MM}/{slug}-stage35-audit.md`＋`{slug}-stage36-audit.md`（末尾 `## Result: PASS/FAIL`）；修正 append research §audit                   |
| **GATES**        | `article-health.py --profile=rewrite-stage-3-5`（footnote 系列，勿只跑 stage-4——v6.1 漏跑教訓）；audit 兩檔 PASS＋`fact-atom-diff.py` PASS（3.8）才進 Stage 4 |
| **context 預算** | 本檔＋成品＋report；verifier 各吃一段＋來源；定稿手吃成品全文＋prose-flow 表                                                                                  |

### AGENT PROMPT（3.6.1 原子重驗 verifier，M×Sonnet，v9.0 補齊薄殼）

```
你是對抗性查核員（adversarial verifier），目標是推翻分配給你的段落。
只讀：{ARTICLE_PATH} 的第 {N} 段～第 {M} 段＋該範圍 footnote 指向的來源 URL。
逐原子（引語／數字／日期／歸屬／獎項屆次／詮釋 gloss）開原頁驗證：
引語逐字 diff；詮釋 gloss 當獨立 atom 查（同位語最會藏錯——寶哥＝宋岳庭教訓）；
footnote-claim 綁定反查（腳註真的支撐它掛著的句子嗎）；
footnote 描述本身也當一個 atom 查（`[^n]: [Title](URL) — 描述` 的「描述」句
是否為來源頁真的有的內容，不是寫作者「希望來源說什麼」的目錄式概括——
描述寫「含 X、Y、Z」時，X/Y/Z 要在來源頁真的看得到，不是只在正文找得到就算
過；連結-描述錯位跟 claim-citation 錯位是兩種不同的漂移，MAINTAINER 外部
PR review 紅旗 11 已抓前者，這裡把同一檢查延伸進自產深度文的 fetch-verify）。
官方一手 > 媒體轉述。
輸出：逐條 {atom｜來源｜verdict: ✅/⚠️/❌｜證據}。禁改文章。
```

3.7 總編探針 prompt：[EDITORIAL-ROOM-PROMPTS.md](EDITORIAL-ROOM-PROMPTS.md) §總編室（**六探針**，v9.4 起含閱讀節奏＝原 Step 3.6.2 順稿）。

### AGENT PROMPT（3.8 定稿手，1×fresh Opus，v9.5）

```
你是定稿手（closing editor）。任務：對這篇已完成事實查證的文章做一次完整的語感重順。
只讀：{ARTICLE_PATH} 成品全文＋下方 prose-flow 逐節表＋閱讀節奏席 findings。
不讀藍圖、研究報告、編輯歷程——你的價值就是沒有那些 context。
動的：段落牆（>280 字拆；單節 ≥200 字段落佔比 >35% 的節重排呼吸）、饒口句、
framing 詞硬接（「值得一提的是」類）、縫線疤（外科手術疊輪留下的生硬轉折）、機械自述。
不動的（一個字都不准）：「」內引語、所有數字與單位、人名地名專名、[^n] 標記與腳註定義、
[[wikilink]]、URL、H2 標題、frontmatter、markdown 表格與 tw-* 視覺模組、論點與段落的事實內容。
想動結構或事實＝寫進回報，不自己動。
寫到 staging 檔 {STAGING_PATH}（不覆蓋 canonical）。
回報：staging 路徑＋動過哪些節的一句話清單＋你想動但沒動的事項。
你的產出會過 fact-atom-diff.py 原子守恆硬閘，任何原子漂移整份退回。
```

### 交付條件（stage 完成的定義）

- [ ] `{slug}-stage35-audit.md`＋`{slug}-stage36-audit.md` 落檔且 `## Result: PASS`
- [ ] `article-health.py --profile=rewrite-stage-3-5` 無 hard（footnote 系列；勿只跑 stage-4）
- [ ] （A 級／大眾文）3.7 總編室 `{slug}-chief-review.md` overall=pass
- [ ] verifier ❌ 全數修正並 append research §audit
- [ ] 批修後變更節定向複驗跑過（大驗證輪步 4）
- [ ] Step 3.8 定稿站跑過且 `fact-atom-diff.py` PASS（所有 depth）

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-4-FORMAT.md

---

### Stage 3: 驗（預算 15-20%）

**必讀**：`cat docs/editorial/QUALITY-CHECKLIST.md`

**流程**：嚴格按照 [QUALITY-CHECKLIST.md](../editorial/QUALITY-CHECKLIST.md) 逐項執行。包含 5 大步驟。

#### Step 3.1: 五指 + 結構 + 塑膠 + 算術

1. **五指檢測**（手動 60 秒）
2. **結構驗證**（逐項打勾）
3. **塑膠掃描**（手動 90 秒，重點掃後半段）
4. **自動驗證**（quality-scan ≤ 3 + build）

**⚠️ 不合格 = 不 commit。修正後從 QUALITY-CHECKLIST.md 重新驗證。**

#### Step 3.2: 事實鐵三角（強制鐵律）

> 來源：李洋文章 + 孢子 #28 同時犯三層事實錯誤（金額兩千萬→一千萬、單位三十六萬→三千六百萬、杜撰引語從英文回譯）被觀察者撤回的教訓。

##### Step 3.2.1: 算術自檢

寫完含金額/百分比/比例的段落，**必須做算術自檢**：

```
寫的句子：「兩千萬剛好是他存款的三成」
算術驗證：2000 / 3401 = 58.8% ❌（不可能是「三成」）
紅旗：金額一定有錯
```

**規則**：每一個「X 是 Y 的 Z 成」「比 X 多 Y」「等於 X 倍」這類數字關係**必須在心裡或用 python3 算一次**。算不通 = 至少有一個數字錯。

##### Step 3.2.2: 金額單位念出來

寫完含金額的句子，**必須念出來檢查單位**：

```
寫的句子：「一筆三十六萬負債的房貸」
念出來：「三十六萬」聽起來像月薪等級 ❌
真實數字：3,638 萬
紅旗：萬位漏字
```

**規則**：所有金額念出來，跟「日常生活感」對照。

- 萬：月薪、單月開銷
- 百萬：年收、小套房頭期款
- 千萬：豪宅、企業主資產
- 億：上市公司、政府預算

如果念出來的數字跟主題的「合理量級」對不上 = 紅旗。

##### Step 3.2.3: 引語逐字核對

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
4. 詳細紅線見 [EDITORIAL §挖引語制度](../editorial/EDITORIAL.md#挖引語制度)

##### Step 3.2.4: 三角自檢 checklist（強制）

- [x] **算術**：每個「X 是 Y 的 Z」「X 比 Y 多」都用 python3 算過？
- [x] **單位**：每個金額念出來跟「合理量級」對得上？
- [x] **引語**：每個 `「XXX」` 都能在原始中文頁面 Ctrl-F 搜到？

**任何一項打不勾 = 不 commit，回去修。**

#### Step 3.2-bis: 校正焦慮掃描（correction-meta scan）— callout-triggered 強制 🧱

> Step 0.2-bis 拆除防火牆的 backstop。即使前面三條防火牆做了，Stage 2 寫作仍可能漏出校正型 meta。這一關專抓「文章在公開處理自己的勘誤」。

**唯一自檢句（逐句 / 逐 box 過一遍）**：

> **「如果這篇文章第一次就寫對了，這個句子 / 這個 box 還會存在嗎？」**
> 只為回應過去的錯誤、或為了澄清一個混淆而存在的 → **刪**。

**儀器化掃描（callout-triggered 必跑）** — 2026-06-01 已升 article-health plugin：

```bash
## correction-meta plugin（取代原 raw grep）：抓 9 類校正型句式，回 line + snippet + 自檢句
python3 scripts/tools/article-health.py knowledge/{Cat}/{slug}.md --check=correction-meta
## 或直接跑 Stage 3.5 profile（含 footnote-format + footnote-density + correction-meta）
python3 scripts/tools/article-health.py knowledge/{Cat}/{slug}.md --profile=rewrite-stage-3-5
```

correction-meta DEFAULT WARN（dual-use 句式 + legacy soft-launch）。**callout-triggered EVOLVE 把任何 WARN 視為 must-fix**（人/agent 逐條過自檢句）。plugin: `scripts/tools/lib/article_health/checks/correction_meta.py`。

**論點脊椎自檢**：核心矛盾 / 30 秒概覽 / 結語，是不是在講「歸屬要正確 / 不要搞混 / 名字很重要」這類 meta？是 → 論點被 errata 投毒，回 Step 0.6 重想（**這關不過不只是刪句子，是重定觀點**）。

**Anti-example**：影視配樂 v2 的 9 處（Step 0.2-bis 已列）。**規則不如反例好記**（`feedback_subagent_anti_example_works`）—— 寫到「把 X 掛在他名下其實是錯的」這種句子時，腦中應該浮現「這就是影視配樂被罵的那種句子」。

**不過 = 不 commit。** 純品質提升的 EVOLVE 不強制此關，但論點脊椎自檢建議跑。

#### Step 3.3: FACTCHECK Quick Mode（A 級 / 政治敏感 → Full Mode）

> **本 step 是 [FACTCHECK-PIPELINE](FACTCHECK-PIPELINE.md) 的 trigger context**。完整 SOP、atom 類型、11 種 hallucination pattern、6 種 drift modes、Phase 1-6 執行細節、checklist 全部 SSOT 在 FACTCHECK-PIPELINE，本 step 不複寫（[MANIFESTO §指標 over 複寫](../semiont/MANIFESTO.md#我的進化哲學--指標-over-複寫) 原則）。
>
> **對應 [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律--寧可多檢查一次不要放出連自己都不知道是錯的資訊)。**

##### Quick Mode 觸發

REWRITE Stage 2 寫完 prose 後、進 Stage 4 之前，**必須跑 FACTCHECK-PIPELINE §Quick Mode**：

- **預算**：30-60 min（主 session 自跑，不 spawn agent）
- **範圍**：
  - 全文 high-risk atom 抽取（引語 + 數字 + 人名 + 獎項 + 地點門牌號碼 + 場景動作 detail）
  - 每個 atom 對 source URL 至少做一次驗證（中文 source 用中文 prompt 要求逐字）
  - **citation plugin gate 必跑**：`python3 scripts/tools/article-health.py <article> --profile=rewrite-stage-3-5` — 含 `footnote-format`（強制 `[^N]: [Title](URL) — description` canonical 格式）+ `footnote-density`（hard=0 要求）
  - footnote URL 健康檢查（network-conditional）跑 `ARTICLE_HEALTH_NETWORK=1 python3 scripts/tools/article-health.py <article> --check=footnote-url`

> **plugin gate 鐵律**（v6.1，2026-05-17 admiring-montalcini）：`rewrite-stage-3-5` profile 必跑不是建議，是反射。Stage 4 `--profile=rewrite-stage-4` **不含** footnote-format（profile 分工：Stage 3.5 管 citation health / Stage 4 管 structure），跳過 Stage 3.profile 內 plugin（清單以 `--list-checks` 為準） gate = CI full sweep（含全 全量 plugin（以 `--list-checks` 為準））會 hard-fail，本機 Stage 4 卻顯示綠燈 = silent leak through。誕生事件：2026-05-17 臺灣前途決議文 ship 後 CI fail（footnote-format hard=23），主 session 用 `--profile=rewrite-stage-4` local 跑全綠就 push，沒跑 `rewrite-stage-3-5` 因為 pipeline 沒明示 → 推回 Step 3.3 補一個 commit 修 29 條 footnote。對應 [REFLEXES #15 反覆浮現要儀器化](../semiont/REFLEXES.md) + [MANIFESTO §10 幻覺鐵律](../semiont/MANIFESTO.md#10-幻覺鐵律) — 把「該跑哪個 profile」從 SOP 隱性知識儀器化進 pipeline checklist。

##### 觸發 spawn agent 升級為 Full Mode 的條件

- article tier = A 級（≥ 50 footnotes 或 ≥ 3000 字 或 含直接引語 ≥ 10 句）
- article 對象為真人且可能引發人權／政治／法律敏感
- Quick Mode 過程中發現 ≥ 3 個 ❌ HARD-FIX → Quick 不夠，升級 Full Mode 重跑

##### Stage 3 Hard gates（FACTCHECK-PIPELINE Phase 6 Triage 結果必須）

- 0 個 🔴 DEAD-LINK（任何 footnote URL 4xx/5xx 都先換源）
- 0 個 ❌ HARD-FIX（claim 不在 source、引號內 paraphrase、third-person flip 等全部處置完）
- **`rewrite-stage-3-5` profile hard=0**（footnote-format + footnote-density，v6.1 升級為 Stage 3 hard gate；不是 Stage 4 dependency）
- ⚠️ SOFT-FIX 數量無上限，但每條都要在 commit message 列出，可 ship 後 polish
- 每個 ❌ 與 🔴 的修補都 append 到 `reports/research/YYYY-MM/{slug}.md` § audit section（REFLEXES #22 raw 永留）

##### 為什麼這條 step 是 hard gate 而非 soft

錯誤與幻覺以指數速率摧毀平台可信度。讀者會記得錯誤、截圖到 Threads、引用為「Taiwan.md 是 AI 廢文」的證據；不會記得其他幾百篇正確的文章。**寧可多檢查一次，也不要放出連自己都不知道是錯的資訊**（[MANIFESTO §10](../semiont/MANIFESTO.md)）。

#### Step 3.4: Story atom audit（場景級事實對 source Ctrl-F）

對 prose 中每個「場景描述」（具體動作、房號、樓層、影廳代號、設備代號、職稱、場地細節），對 source URL **逐原子 Ctrl-F**：

- 例：造山者 EVOLVE 寫「張忠謀電影散場向觀眾鞠躬三次」→ UDN 原報導 Ctrl-F「鞠躬」→ 0 hits → ❌ HARD-FIX
- 例：「Morgridge Hall 1524 房號」→ 星島原文 Ctrl-F「1524」→ 0 hits → ❌
- 例：「李國鼎獎頒獎場合用四機補拍」→ gvm 原文 Ctrl-F「四機」→ 0 hits → ❌

這類「沒有引號保護的具體動作 / 場地細節」是 AI hallucination 最隱蔽的 pattern（讀起來像「氛圍描寫」不像「引用」），audit 容易跳過。

**唯一可靠的審計**：全文逐原子對 source URL Ctrl-F 中文原文。發現 → 刪除或降級為「該領域受肯定」這類概括語言，**不保留可能錯也可能對的條目**。

#### Step 3.5: Title + description spine sync re-check 🥪

承襲 Stage 2 Step 2.7.6（已在 Stage 2 跑過寫作 self-check）。Stage 3 再 grep 一次做 verify 階段最終 gate：

```bash
grep -E "^title:|^description:" knowledge/{Category}/{slug}.md
```

人工 review：

- title 冒號三明治？
- description 吃進核心矛盾？

不過 → 回 Stage 2 重寫 frontmatter。

**為什麼 Step 2.7.6 + Step 3.5 兩次跑同條 check（deliberate redundancy）**：

- Step 2.7.6 = 寫完 prose 立刻自檢（catch early，趁記憶新鮮）
- Step 3.5 = ship 前最後 gate（catch leak through，防 Step 2.7.6 被跳過）

兩次 check 是雙重保險，不是重複。Title 三明治是 SC 入口品質 + reader entry framing 的 spine，不能漏。

#### Step 3.6: 成品總驗三關（assembled-product verification）— A 級/大眾文 HARD 🔍

> **v7.0 新增（2026-06-10 哲宇 directive，嘻哈饒舌 worked example）**。Stage 3.1-3.5 驗的是「寫作中的草稿」；本 step 驗的是「組裝完成的成品」——媒體已插、cross-link 已補、外科手術疊過幾輪之後的最終形態。**越大眾的文章效果越好、讀的人越多，檢視的人也越多**：成品關卡是對讀者的尊重。誕生事件：台灣嘻哈饒舌 EVOLVE 在 Stage 3.1-3.5 全綠 ship 後，讀者（老莫，文章引用來源作者本人）抓到一處詮釋 gloss 錯誤（寶哥=宋岳庭，實為 MV 導演黃信佳）→ 成品全文原子重驗又抓 3 ❌ + 11 ⚠️。完整 audit：[reports/research/2026-06/台灣嘻哈與饒舌發展.md §9](../../reports/research/2026-06/台灣嘻哈與饒舌發展.md)。

**觸發條件（任一 → 必跑）**：A 級文（≥ 50 footnote 或 ≥ 3000 字或直接引語 ≥ 10）/ 預期高流量大眾主題 / 讀者或專家 callout 後 / 同一篇外科手術（勘誤、補段、補媒體）累積 ≥ 3 輪。

##### Step 3.6.1: 原子重驗 fan-out（拿成品派 verifier 再查一次）

派 N 個 parallel adversarial verifier（Sonnet）按**成品段落**分工（不是按研究子題——成品的段落組合跟研究報告的子題切法不同，漏的 atom 就藏在重組的縫裡）。每個 verifier 讀「文章該範圍 + 全部腳註定義」，抽出**每一個 atom** 逐條 falsify（≥ 2 獨立來源；引語 Ctrl-F；中文站 WebFetch 用中文 verbatim prompt），回報 `| line | atom | ✅/⚠️/❌ | 證據 URL | 正確版本 |` 表。

**草稿驗證（3.1-3.5）放不到、本 step 專抓的四種 drift**：

1. **引號逐字 diff**：writer 縮寫 quote 或改句型但保留引號（worked example：壞特陳述句被改成反問句、楊舒雅 quote 漏「在音樂中」「才能憤怒」）。引號 = 逐字承諾，**驗 quote 要驗到字，不只驗到意**。
2. **詮釋 gloss 是獨立 atom**：致詞代稱（寶哥／阿姐／老師）、「X 就是 Y」同位語、「也就是說」附註——這些 gloss 搭著已驗證的事實滑過 verifier（寶哥=宋岳庭 正是 orchestrator 合成引語庫時注入、verifier 驗了引語沒驗 gloss）。
3. **footnote-claim 綁定**：每個 `[^n]` 反查「**這個來源真的含這個 claim 嗎**」——事實對但腳註掛錯來源是獨立的錯（worked example：Manchuker 比喻掛錯中央社、NBA 演出掛 en.wiki 但 en.wiki 無記載、Leo王 keep real 掛錯參劈報導）。
4. **writer 自漂移**：SSOT 正確但 writer 寫錯（「五月」寫成「六月」、「末期發行」寫成「最後一張」、「曾獲報導」寫成「唯一」）。**superlative（首位／唯一／第一）與精確日期是高發區**，預設不信、逐條對 SSOT + 外源。

**官方一手 > 媒體轉述**：媒體引語彼此會有轉述漂移（金曲 GMA 官方貼文「**以及**在天上的寶哥」vs 各媒體「獻給在天上的寶哥」）。找得到官方貼文／官方影片／當事人原貼，就以官方為錨，腳註改掛官方。

**修正全部 append research report §audit**（含查證軌跡 + verdict + 根因），讓未來 reader callback 可以直接追溯。

> **儀器化（2026-06-10）**：drift (1) 與 (4) 已升 `article-health.py --check=quote-fidelity` plugin（in `rewrite-stage-3-5` profile，soft-launch WARN）——QF1 把文中每句帶腳註的「」引語逐字比對 frontmatter `researchReport` 的 SSOT 全文（抓縮寫/改句型/換字），QF2 列出全文 superlative 原子（首位/唯一/第一）當 fan-out 優先驗證清單。dogfood：嘻哈饒舌 0 誤報、複雜生活節 surface 4 條 legacy 引語債、無 report 文章優雅 skip。drift (2) 詮釋 gloss 與 (3) footnote 綁定仍靠 verifier fan-out（語意層，工具到不了）。

##### Step 3.6.2: 順稿（閱讀感 + 呼吸感 + 紀實文學感）→ **v9.4 移交總編室閱讀節奏席**

> **⚠️ 這一關不由主 session 親做（2026-07-25 改）**。派 Step 3.7 總編室**探針 5 閱讀節奏**
> （Sonnet，乾淨 context），prompt 在 [EDITORIAL-ROOM-PROMPTS §探針 5 專屬](EDITORIAL-ROOM-PROMPTS.md)。
> 產物併入 `{slug}-chief-review.md`，走 `editorial-room-health.py` 同一個 gate。
>
> **派出前主 session 必做一件事**：跑 `python3 scripts/tools/prose-flow.py {article_path}`，
> 把逐節表整段貼進席位 prompt（席位需要形狀當材料，但判斷要它自己做）。
>
> **為什麼移交**：本 step 的第一句話從 v7.0 起就是「外科手術疊幾輪之後縫線會留疤——
> 成品從頭到尾重讀一次」。它預言正確，但被指派給**全場唯一讀不了新鮮的那個讀者**。
> 主 session 剛決定過每一句話該長什麼樣，理由跟句子是一起生的，重讀時理由會先替
> 句子辯護一次。**順稿需要的不是深 context，是沒有 context**。
> 誕生事件：外送專法 ship 時 `--profile=rewrite-stage-4` hard=0 warn=0，哲宇冷讀
> callout「文段太長／閱讀順暢感掉了／後段幾乎沒有資訊圖表」，三句都對。
> 完整診斷＋門檻校準：[reports/design-prose-flow-station-2026-07-25.md](../../reports/design-prose-flow-station-2026-07-25.md)。

席位要看的判準（canonical 仍在此，per [EDITORIAL §段落呼吸 + §段與段的呼吸](../editorial/EDITORIAL.md)）：

- **段落牆**：單段 > 280 字拆段（worked example：蛋堡＋寶哥段 340 字拆三段）
- **長段密度**（v9.4 新增）：單節內 ≥ 200 字段落佔比 > 35% = 一面牆，即使沒有任何一段破 280。
  窒息感來自密度，不只來自峰值。已儀器化為 `paragraph-rhythm` R5（WARN，全站校準 1.7% 觸發率）
- **資料密但無視覺**：資料量（數字／金額／比例／時序／多方對照）超過散文能承載的節，
  該有 viz 模組。**此項刻意不做閘門**——校準顯示任何門檻都會打中 35–60% 的文章，
  等於描述語料庫常態而非異常；交由席位判斷（設計否決記錄見上引報告 §三 C）
- **framing 詞硬接**：「值得一提的是」「順帶一提」「耐人尋味的是」「這裡需要…」整批清掉，改 narrative bridge
- **文章機械自述**：「得單獨給 X 一個段落」這類 writer 對自己結構的旁白，刪
- **一致性殘渣**：30 秒概覽與 description 是否還跟修正後的正文一致（「畢業」vs 休學、被正文砍掉的場景是否還留在 description）；結尾排比的指涉是否 dangling（正文已刪的支線還留在結尾）；策展人筆記裡是否還引用已勘誤的舊事實
- **中英夾雜殘留**（beat 掉 → 贏過）
- **英式短句開場殘留**（v9.6，2026-08-19）：逐段念段首句，短平述句定調再展開的段落骨架一律接回敘事（判準與三類不算見 [EDITORIAL §歐化 第 9 病第三輪](../editorial/EDITORIAL.md)）。這一條交給**冷讀席**而不是主 session：理由跟句子一起生的人讀不出自己的段首句是在「先立再展開」——哲宇同日兩次點同一篇，第一輪主 session 順過、工具報 0，冷讀才看見 15 處。工具門檻：`prose-health` §8e ≥3 處計分、pre-commit >10 HARD
- 工具：`paragraph-rhythm` + `prose-health` + 念出來

##### Step 3.6.3: 視覺同步（媒體 × 敘事對位）

逐一檢查每張圖／每支 iframe：「**它旁邊的 prose 是不是在講它**」：

- 人物圖貼著該人物的敘事段（worked example：熱狗圖從廠牌段移到他封王的金曲段、葛仲珊圖從 section 尾移到她的段落旁），不是堆在 section 結尾當裝飾
- caption 呼應該段 narrative（不是泛用圖說）；兩個媒體不相鄰堆疊；section 收尾可留一個媒體做視覺閉合
- 對應哲宇 directive 原句：「視覺同步檢查引用的多媒體跟文章的關聯性與閱讀感」

**三關全過才算成品 ship。已 ship 後觸發（讀者 callout）→ 三關照跑，修正以 `heal:` commit 補。**

##### Step 3.6.4: orchestrator 自修的收件紀律（v9.4 新增）🔁

> **主 session 親手改動 prose ≥ 2 段 → 該節必重跑量測，並進入下一輪外部尺。
> 不得以「我自己重讀一次」代替。**

我對派出去的 agent 有制度化的不信任（先落檔、再驗真偽、claim 只是線索，REFLEXES #31）；
對自己只有意願上的不信任。而意願在「我正在修東西」的時候最薄——那正是防備關掉的時刻。

2026-07-25 外送專法一天內三次實證，**全部由外部尺接住、無一由自檢接住**：

| 我做了什麼                                                                                                    | 誰接住                       |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| 在寫手零違規的稿子上加了 1 個對位句型 ＋ 5 個破折號                                                           | `article-health` check       |
| 寫進「連死亡都只值 542 元」——一個我自造的等式，而該段「不可滑成情緒槓桿」的警告是我兩小時前親手寫進投影藍圖的 | 總編室冷讀探針               |
| 壓一個 warn 造出另一個 warn，連續三次（合併→牆／拆段→切碎／補論證→牆）                                        | 儀器，且每次都是下一輪才發現 |

第三列是本 step 存在的直接原因：**編輯粒度是段落，閘門粒度是全檔**。
全檔 warn 歸零就往下走，從來沒有回頭看那一節整體變成什麼樣子 → 局部最佳化打地鼠。

**操作**：`prose-flow.py {article}` 只看被動過的那一節；形狀變差就地修，
變好才往下。累積 ≥ 3 輪自修 → 觸發 Step 3.6 全套（含閱讀節奏席）重跑。

---

---

#### Step 3.7: 總編對抗總評（v9.0 新增）🗞️ — A 級／大眾文 HARD，standard WARN

成品層最後一道外部尺：**不看藍圖、不看研究報告**，模擬冷讀總編。5-6 個平行 Sonnet 探針
（門面兌現／逐段主軸服務／H2 載體還原／連結成網／**閱讀節奏**／＋政治敏感題加開立體地愛），
各自乾淨 context、falsification 姿態。**閱讀節奏席即 Step 3.6.2 順稿**（v9.4 移交，
派出前先跑 `prose-flow.py` 把逐節表貼進 prompt）。主編（主 session）匯流裁決，落
`reports/editorial-room/{slug}-chief-review.md`（`room: chief`，schema 同編輯室），
`editorial-room-health.py` gate，≤7 必改。與 Step 3.6 同 round 可平行——3.6 驗事實原子，
3.7 驗「作為一篇報導成不成立」。

- 規則 canonical：[EDITORIAL-ROOM §總編室](../editorial/EDITORIAL-ROOM.md)
- 探針 prompt：[EDITORIAL-ROOM-PROMPTS §總編室](EDITORIAL-ROOM-PROMPTS.md)（禁即興）
- 誕生：2026-07-16 睨對話「總編是平行的漣漪出去，檢驗連結關係和脈絡構成主軸」＋哲宇
  「需要總編輯獨立一個 agent 用對抗性方式總評標題觀點性與整篇脈絡」＋兩個實證缺口
  （Shopping Design 摘要尾句看不懂／吸菸室京都段前後斷裂——都是形式閘門全綠但冷讀不成立）

---

#### Stage 3 收驗編排：大驗證輪（v9.5）⚡

> **三輪合一**。2.5-R 正文結構席、3.6.1 原子重驗 verifier、3.7 總編室探針讀的都是
> 同一份成品——v9.4 之前寫了「同 round 可平行」卻一直排隊跑（外送專法 22:26→23:09
> 三輪串行）。v9.5 起合併為一輪是 default，wall-clock 實測省 40-60 分鐘。
> 設計與拍板紀錄：[reports/design-rewrite-throughput-2026-07-26.md](../../reports/design-rewrite-throughput-2026-07-26.md) §五 方案 A。

**編排五步**：

1. **一次派齊**：Stage 2.5 覆蓋 canonical 後，同一則訊息平行 spawn 全部收驗席位——
   2.5-R 兩席＋3.6.1 verifier（standard M=2-4／lite M=2）＋3.7 探針（standard 6／lite 4，
   閱讀節奏席必在）。全部 Sonnet、各自乾淨 context、prompt 照各自 canonical 填槽禁即興。
2. **單次收件**：全部回報後，主 session 把 findings 合併成**一張修復單**（表格：
   `| # | 位置 | 問題 | 來源席位 | 裁決 accept/defend | 施工方 |`），append 對應 audit 檔。
   **同族全文重掃鐵律（2026-08-03 round 2）**：任一 finding（席位的或哲宇 callout 的）
   屬於可歸類的病灶家族（後台洩漏八形狀／對位變體／英式段首／查證腔）時，修復單不只收
   那一句——先拿該家族的判準句全文重掃，把同族全部列進修復單。黃崇仁第一輪逐 callout
   修六處，第二輪哲宇再抓 13 處，多數第一輪就在文裡：callout 指哪修哪＝「工具警報的
   單例不代表問題的集群」在正文層重演。
3. **裁決一次、施工一次**：裁決永遠主 session（席位是線索，裁決回到有材料的人）；
   裁決後的文字施工派 Sonnet（v9.4 留派表「拆本身是機械」欄），一批做完，不逐條來回。

   **3-bis 事實層更正必須回填 fact-pack（2026-08-08 新增，HARD）**：修復單裡凡是
   **事實層**的裁決（數字改了／時刻拿掉／人物屬性刪掉／來源換綁），除了改成品，**必須
   同步改研究報告 §6 Clean Fact-Pack 與 §6.5 小標候選的對應條目**，並在該條旁寫下
   「禁用什麼、為什麼」。只改成品＝更正沒有回填到上游材料，**下一次重寫、下一個寫手、
   任何吃 fact-pack 的 agent 都會原封不動把錯誤長回來，而且沒有理由知道**。
   誕生案例：新冠疫情文第一輪查掉「傍晚六點登機檢疫」（兩份官方文件都查無此時刻），
   只改了成品；換論點重寫時 fact-pack §6.1 仍寫著舊句，v4 小標與 30 秒概覽原地復發。
   **判準**：施工單上每一條事實層裁決，都要能指出它在 fact-pack 的哪一行也被改了；
   指不出來＝這條沒做完。（與 §量詞隱喻／§後台洩漏那種**表達層**裁決不同——表達層
   的家族重掃在步 2，事實層的上游回填在這裡，兩者都要做。）

4. **變更節定向複驗**（哲宇對「席位看的是修復前文本」的疑慮，v9.5 的回答）：
   批修完成後派 **1 個 Sonnet verifier 只讀被動過的節**（falsification 姿態，含該節
   footnote 綁定），加跑 deterministic 工具全套（article-health 兩 profile＋prose-flow
   對被動節）。變更節複驗＝Step 3.6.4 自修紀律的批修版——**修了哪裡就複驗哪裡**，
   不用整套重跑。
5. **收尾交棒 Step 3.8 定稿站**（下方）。flagship 或 3.6.4 觸發（自修 ≥ 3 輪）時，
   仍走全套重跑，不走定向複驗。

#### Step 3.8: 定稿站（closing pass）✍️ — 所有 depth HARD（v9.5 新增）

> **順稿從偵測升級成修復**。v9.4 的閱讀節奏席讓「哪裡讀起來窒息」看得見了，但動手修的
> 仍是主 session——全場唯一讀不了新鮮的讀者，用段落 patch 修語感，縫線疤再生。哲宇每次
> 手動說「幫我全文再看過順一下語感」，要的就是這一站：**一雙新鮮的眼睛、一次全文重順、
> 事實一個字不動**。2C 寫手只寫一次，此後全文再沒有被單一聲音完整順過——本站補上這隻手。
> 誕生：2026-07-26 哲宇拍板（設計報告 §五 方案 B）。

**流程**：

1. 大驗證輪全部修復收斂後，派 **1 個 fresh Opus 定稿手**（AGENT PROMPT 見上方，填槽禁即興）。
   輸入＝成品全文＋`prose-flow.py` 逐節表＋閱讀節奏席 findings。**不給**藍圖、研究報告、
   編輯歷程（它需要的是沒有 context）。
2. 定稿手寫到 staging 檔 `reports/article-evolve/{slug}-closing.md`，不碰 canonical。
3. 主 session 跑硬閘：`python3 scripts/tools/fact-atom-diff.py {canonical} {staging}` ——
   frontmatter／「」引語／數字／`[^n]` 標記與定義／URL／wikilink／H2／表格與 tw-\* 模組
   全部鎖定，任何原子漂移＝FAIL 整份退回（重派或棄用，不逐句撿）。
4. PASS 後主編 diff 抽查（策展聲音有沒有被沖淡——儀器管機械面，這一眼管聲音），
   親手覆蓋 canonical。`prose-flow.py` 重跑一次留 before/after 於 audit 檔。

**邊界**：定稿手只動散文的形狀（拆牆、換氣、饒口句、framing 詞、縫線疤），不動論點、
不動結構順序、不動任何事實原子。想動結構＝回報主編，不自己動。已 ship 後的讀者 callout
修正（heal）不觸發本站；同一篇 heal 疊 ≥ 3 輪則觸發（同 3.6 條件）。

---

<!-- ==== source: REWRITE-STAGE-4-FORMAT.md @ 5ad44270b ==== -->

## Stage 4 contract — 形（format＋媒體插入）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L1902-2253（v9.0 更正：原第二個 Step 4.3.6「影片 iframe 嵌入」重編號為 4.3.7）），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 格式 7 維度、多語 smoke（i18n 改動時）、媒體插入（節奏判斷/fetch/aspect/插入/授權同步/健檢/iframe）                                                |
| **執行者**       | 主 session                                                                                                                                         |
| **INPUTS**       | canonical 正文；research 檔媒體授權矩陣（Stage 1B 產物）；EDITORIAL §媒體編織                                                                      |
| **OUTPUTS**      | 文內媒體＋`## 圖片來源` 段；`public/article-images/{cat}/`                                                                                         |
| **GATES**        | `python3 scripts/tools/article-health.py knowledge/{Cat}/{slug}.md --profile=rewrite-stage-4`（hard=0）＋`--check=image-health`；`check-aspect.sh` |
| **context 預算** | 本檔＋成品＋授權矩陣                                                                                                                               |

### AGENT PROMPT

**不派 agent**——格式與媒體插入主 session 自跑（授權同步與 aspect 判斷需 human 眼）。

### 交付條件（stage 完成的定義）

- [ ] `article-health.py knowledge/{Cat}/{slug}.md --profile=rewrite-stage-4` hard=0
- [ ] `--check=image-health` pass（depth：媒體 ≥ max(3, round(prose-CJK/1200))）
- [ ] 文末 `## 圖片來源` 段與授權矩陣一致；`check-aspect.sh` 過
- [ ] （i18n 改動時）多語 visual smoke 6 步過

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 下一棒：REWRITE-STAGE-5-CROSSLINK.md

---

### Stage 4: 形（Format + Media，預算 5-10%）

**Stage 3 commit 前最後關。**

這一步跟 Stage 3 不同——Stage 3 檢查「寫得好不好 + 事實對不對」，Stage 4 檢查「結構對不對 + 媒體插得對不對」。

#### Step 4.1: article-health.py --profile=rewrite-stage-4

##### 強制執行（不是建議，是反射）

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{文章}.md --profile=rewrite-stage-4
```

`rewrite-stage-4` profile plugin（HARD all；清單與數量以 `article-health.py --list-checks` 為準）：

| Plugin               | 檢查內容                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `frontmatter-format` | 必要欄位 + 順序                                                                                                                                                                                                                                                                                                                                                                                       |
| `format-structure`   | 30 秒概覽 / 延伸閱讀 / 參考資料 section 存在                                                                                                                                                                                                                                                                                                                                                          |
| `wikilink-target`    | wikilink 對應檔案存在                                                                                                                                                                                                                                                                                                                                                                                 |
| `link-target`        | markdown link path casing + existence                                                                                                                                                                                                                                                                                                                                                                 |
| `cjk-punct`          | 中文 prose 全形標點                                                                                                                                                                                                                                                                                                                                                                                   |
| `chronicle-lead`     | H2 不是 `## YYYY 年 X 月` 編年體                                                                                                                                                                                                                                                                                                                                                                      |
| `word-count`         | depth article ≥ 4500 CJK chars（v3.1 sad-shockley 新增，HARD via severity_override）                                                                                                                                                                                                                                                                                                                  |
| `image-health`       | depth ≥ 3 張（hero + 2 scene-mid）— v3.2 kind-mirzakhani 新增（HARD）                                                                                                                                                                                                                                                                                                                                 |
| `paragraph-rhythm`   | **段落 median ≥ 55 CJK + H2 prose 段落 ≤ 8 + 媒體密度 band 1.2–2.0/1k CJK**（2026-07-12 哲宇 directive「提升上限，新基準範圍 1.2~2」第三波上修 0.7→0.8→1.2–2.0；floor 1.2 media-poor / ceiling 2.0 / hard 2.5+median<55；舊範本 設研院 0.91/黃魚鴞 0.82 在新基準屬偏少，帶內範本 陳建年 1.48。WARN-only soft launch） + `media-richness` length-scaled count（長文朝 圖+影片 ≥8 INFO + 多模態 nudge） |

> ⚠️ **profile 邊界鐵律**（v6.1，2026-05-17 admiring-montalcini）：`rewrite-stage-4` profile **不含** `footnote-format` / `footnote-density`（那兩個在 `rewrite-stage-3-5` profile，Stage 3.3 跑）。Stage 4 跑全綠**不代表 CI 會過** — CI full sweep 跑全 全量 plugin（以 `--list-checks` 為準），包含 stage-3-5 的 footnote 系列。如果跳過 Stage 3.3 的 `rewrite-stage-3-5` plugin gate，本機 Stage 4 顯示綠燈但 CI 會 hard-fail。誕生事件：2026-05-17 臺灣前途決議文 ship 後 CI footnote-format hard=23（commit `b39ea5529` 補修 29 條 footnote）。對策：**Stage 3.3 必跑 `--profile=rewrite-stage-3-5`**（已寫進本檔 Step 3.3 + 頂部 Hard Gate Inventory）。

**Pre-commit hook 已自動執行**這幾項檢查（SSOT pre-commit profile 自 2026-05-04 Phase 10 接管）。如果被擋：按提示修正，**不要用 `--no-verify` 繞過**。

> **為什麼要強制？** 2026-04-04 我在台灣國樂的延伸閱讀寫了 7 個 `[[wikilink]]`，忘記 Astro 不渲染。規則在本文件 v2.10 已經寫過、工具 wikilink validation 存在——然後還是寫錯了。教訓：**擁有工具 ≠ 使用工具**。所以現在寫進 pre-commit 強制執行。

##### 格式範本檢查清單（手動 audit）

```
□ Frontmatter 完整（title/description/date/category/tags/subcategory/author/featured/lastVerified/lastHumanReview）
□ Frontmatter 含 researchReport 指向 research 檔（編輯台 slug 歸戶——缺了會讓看板出現「codename 卡在中間＋中文卡已出刊」的分裂雙卡；2026-08-06 newsroom 健檢盲點 B）
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
□ word-count ≥ 4500 CJK chars（v4 新 hard gate）
```

**⚠️ 格式不合格 = 修正後重新檢查。不進 Step 4.3。**

#### Step 4.2: 多語 visual smoke test（i18n 改動時）

> **觸發條件**：commit 涉及任何 i18n 系統 / 多語系路由 / homepage components / `src/pages/{lang}/` / `src/i18n/`、或加新語言、或大型 sed 批次替換。
> 對應 [REFLEXES #19 大型 refactor 後 visual smoke test](../semiont/REFLEXES.md#四工程衛生)。

**強制 SOP**（6 步）：

```bash
## 1. Build verify
npm run build  # 必須 ✅ all categories healthy

## 2. Cascade prevention test（驗 Phase 1 fix 仍 work）
F="dist/fr/people/index.html"
grep -oE '"/[a-z][a-z-]*/people"' "$F" | sort -u
## 預期：/en/people、/ja/people、/ko/people、/fr/people（+ /es/people if dropdown 完整）
## 不應出現：/ja/fr/people、/ko/fr/people 等 cascade URL

## 3. 5 langs 結構對齊檢查
for L in '' en ja ko fr es; do
  if [ -z "$L" ]; then f="dist/index.html"; lang="zh-TW"; else f="dist/$L/index.html"; lang="$L"; fi
  echo "$lang: halls=$(grep -c 'exhibition-hall' $f) RD=$(grep -c 'Random' $f)"
done
## 預期：5 langs 都有 exhibition halls + RandomDiscovery

## 4. Wrong-language prose 檢查（fr/es 不該含日文/中文 hardcoded）
for L in fr es; do
  hits=$(grep -c -P "[\x{3040}-\x{309F}\x{30A0}-\x{30FF}]" "dist/$L/index.html")
  echo "$L: $hits 平假名/片假名 occurrences"
done
## 預期：0 / 0

## 5. LANGUAGES_REGISTRY SSOT 對齊
bash scripts/tools/check-hardcoded-langs.sh

## 6. i18n coverage audit
bash scripts/tools/i18n-coverage-audit.sh
```

**任何一項失敗 = revert 該 commit，不 ship**。歷史教訓：Tailwind Phase 6 反向 sed 讓 ja/ko 壞 2 天 / fr 上線 cp + sed 漏抓日文 prose 持續 1 天 / fr/es 路由疊加 cascade 4 天才被發現——三次都因為缺這層 smoke test。

#### Step 4.3: 媒體插入

**觸發時機**：Step 4.1 format-check 通過後、Stage 5 cross-link 之前。

**為什麼這時插入**：寫完 prose 才知道「實際敘事節奏在哪、哪段需要 visual 呼吸」。寫之前布陣會綁死寫作節奏；寫完一次插入更自然。

**依賴**：Stage 1 Step 1.9 必須完成（媒體授權矩陣三表 append research 檔 + 圖片已 cache）。沒做 → 退回 Stage 1 Step 1.9。

##### Step 4.3.1: 三段敘事節奏判斷（圖 + 影片 整合）

媒體插入位置影響敘事節奏，不是隨便塞。三段標準（圖跟影片穿插，per EDITORIAL §媒體編織）：

| 位置          | 用途                       | 圖型                  | 圖數 | 影片可放？                   | 範例                            |
| ------------- | -------------------------- | --------------------- | ---- | ---------------------------- | ------------------------------- |
| **hero**      | 30 秒概覽前，建立視覺認知  | 16:9 landscape 或 1:1 | 1    | ❌（影片在 hero 太重）       | 林琪兒 EMU 2014                 |
| **scene-mid** | 中段重要轉折前 / 後        | landscape 為主        | 0-2  | ✅（代表作 / 直播 / 演講）   | Expedition 42 / 〈海洋〉MV      |
| **closure**   | 結尾段視覺收尾（首尾呼應） | landscape             | 0-1  | 0-1（最後代表作 / 紀念影像） | 訪台首日場景照 / 〈美麗心蘭嶼〉 |

**整體類型 × 媒體比重 baseline**（canonical 在 [EDITORIAL §媒體編織](../editorial/EDITORIAL.md#媒體編織圖片與影片穿插的敘事流2026-05-17-新增)）：

- 音樂人：2-3 圖 + **2-3+** 影片（代表作 MV / 早期 / 最新三層時間軸）
- 運動員 / 演員 / YouTuber：2-3 圖 + 1-3 影片
- 樂團 / 音樂類型史：2-3 圖 + **3-5** 影片
- 政治人物 / 學者：2-3 圖 + 0-2 影片
- Nature / 生態：2-3 圖 + 1-2 影片
- Food / Culture / Tech：2-3 圖 + 0-1 影片
- Hub 頁：0 圖 0 影片

**通用判準**：

- depth-article（≥ 3000 字）：2-3 圖 + 依類型 1-5 影片
- 短文：hero only（1 張），不放影片
- 翻譯文：跟原文同步媒體（不另增 / 不另減）
- 找不到官方影片 → 不勉強塞，多放 1 張圖補位

**圖跟影片穿插原則**：兩者交錯出現，不疊放在同一段。圖跟影片之間至少隔 2-3 段 prose。沿 narrative arc 放，不是按重要性堆在開頭。

**Scene-mid 位置規則**：圖放在「該段 narrative 開始前」而不是「該段中間」：

```markdown
### 紅色 LED 下的第一口萵苣 ← 小標題

[圖：Expedition 42 三人合影] ← 圖放這裡
_caption_

prose 開始... ← 文字接續
```

**呼吸原則**（呼應 EDITORIAL §密度平衡）：連續 3 段以上密集事實段（≥ 200 字 / 段）→ 中間插入一張 scene 圖作為視覺呼吸。

##### Step 4.3.2: 圖檔 fetch + cache + naming

依 Stage 1 Step 1.9.2 的 manifest 已 cache 完成。Step 4.3.2 僅做最後 verify：

```bash
## 確認所有 manifest 列出的圖檔都存在於 public/article-images/
ls public/article-images/{category}/

## 必要時補抓（若 Stage 1 未完成全部圖）
mkdir -p public/article-images/{category}/
curl -sL -A "Mozilla/5.0 Taiwan.md/1.0" "{hi-res-url}" \
  -o public/article-images/{category}/{slug}-{topic}-{year}.{ext}

## 確認 file format + 大小 + EXIF GPS 已清
file public/article-images/{category}/{filename}
sips -g pixelWidth -g pixelHeight public/article-images/{category}/{filename} | tail -3

## 必要時 resize / re-encode（hero < 600KB / inline < 400KB）
sips -Z 2000 --setProperty formatOptions 85 public/article-images/{category}/{filename}

## 清 EXIF GPS / 個人資訊（保留 description / copyright）
exiftool -gps:all= -location:all= -DeviceMfgr= -DeviceModel= public/article-images/{category}/{filename}
```

##### Step 4.3.3: Aspect ratio 護欄

```bash
bash scripts/tools/check-aspect.sh public/article-images/{category}/{filename}
```

| 圖種          | 必過範圍            | 歷史教訓                                                             |
| ------------- | ------------------- | -------------------------------------------------------------------- |
| **hero**      | 0.9 ≤ aspect ≤ 2.0  | lindgren-crew4-portrait.jpg 1041×1561 (0.67) 切到頭 → 換 1041×694 ✅ |
| **inline 圖** | 0.75 ≤ aspect ≤ 2.5 | Expedition 42 4896×3264 (1.5) ✅ / EMU 1692×1691 (1.0) ✅            |

不過 → **換圖**（不要強塞）。

##### Step 4.3.4: Markdown 插入 + caption + alt text

**標準格式**：

```markdown
![alt text 描述](/article-images/{category}/{filename}.jpg)
_caption 說明文字。Photo: {credit}. [License via {source}]({source-url})._
```

**Alt text 規則**（accessibility 必需）：

- 描述「畫面內容」不是「圖名」
- 涵蓋：誰 + 在哪 + 做什麼 + 拍攝氛圍
- 30-80 字
- 不重複 caption 文字

**範例對比**：

```markdown
❌ 壞 alt text（只有圖名）：
![林琪兒 2014](/article-images/people/lindgren-emu-2014.webp)

✅ 好 alt text（描述畫面）：
![林琪兒 2014 年穿艙外活動服（EMU）官方人像，全套白色 NASA 太空服，仰角拍攝顯示頭盔反光](/article-images/people/lindgren-emu-2014.webp)
```

**Caption 規則**：

- 用 markdown italic `_..._`（不用 HTML `<figcaption>`）
- 結構：`{時間 + 地點 + 事件}。Photo: {攝影者 / 機構}. [License via {source}]({URL})。`
- 中文 prose 風格，跟 article 一致
- 關鍵 metadata（NASA Image ID / Commons file name）放括號註

##### Step 4.3.5: 授權清單同步

每張 inline 圖插入後，**強制同步**：

**1. frontmatter**（hero only）：

```yaml
image: '/article-images/{category}/{filename}.jpg'
imageCredit: '攝影者 / 機構'
imageLicense: 'Public domain (NASA)' / 'CC BY-SA 4.0' / etc
imageSource: '{source-URL}'
```

**2. 文末「## 圖片來源」section**（所有圖）：

```markdown
### 圖片來源

本文使用 N 張公有領域 / CC 授權圖片，全部 cache 於 `public/article-images/{category}/` 避免熱連結來源伺服器：

- [圖檔 1 標題](source-URL) — Photo: 攝影者, YYYY-MM-DD, License, NASA Image ID 或 Commons file
- [圖檔 2 標題](source-URL) — ...
```

##### Step 4.3.6: 圖片健康檢查（plugin gate）

```bash
python3 scripts/tools/article-health.py knowledge/{Category}/{slug}.md --check=image-health
```

預期檢查：

- ✅ 文中所有 `![]()` 連結對應檔案存在
- ✅ Frontmatter `image:` 存在 + credit + license + source
- ✅ 文中無外部熱連結（http/https URL 不在 `/article-images/`）
- ✅ `## 圖片來源` section 存在
- ✅ 所有圖全部有完整 metadata（攝影者 / license / source URL）

**不通過 → 不進 Stage 5。**

##### Step 4.3.7: 影片 iframe 嵌入（Music / People / Nature 條目升級）

**觸發時機**：題材含**公開影像作品**且 inline link 不足以承載敘事張力時 — Music 條目（代表作 MV）、Nature 條目（生態直播 / 影像紀錄）、Documentary 條目（紀錄片預告）、Performance 條目（演出片段）。

**為什麼從 inline link 升 iframe**（哲宇 2026-05-17 directive）：「提高閱讀的多重感受」。Inline link 是「邊讀邊聽」option，iframe 是「閱讀流裡內建多媒體感官層」default。Music 條目尤其受惠 — 文字描述歌曲 vs 直接聽到歌曲是完全不同的閱讀體驗。

**URL 來源優先序**（同 Step 1.9.1）：

1. 官方頻道（藝人 / 廠牌 / 節目方 / 導演）— 角頭音樂 / 公視 / 滾石等 official YT
2. 國際串流官方（YouTube Music / Vevo official artist channel）
3. 主辦 / 策展單位官方頁

**不接受**：UGC 翻唱、二手轉貼、搜尋結果頁、Topic auto-generated channel（YouTube 自動生成的 "Provided to YouTube by..." 假頻道）。

**密度建議**（per [EDITORIAL §媒體編織 類型 × 媒體比重 baseline](../editorial/EDITORIAL.md#媒體編織圖片與影片穿插的敘事流2026-05-17-新增)）：

| 條目類型                  | 影片 iframe 最低 | 上限 | 備註                                             |
| ------------------------- | ---------------- | ---- | ------------------------------------------------ |
| **音樂人**                | **2-3**          | 5    | 代表作 / 早期 / 最新三層；找不到 official → 補圖 |
| **樂團 / 音樂類型史**     | 3                | 5    | 各時期代表作 anchored 到時間軸                   |
| **運動員 / 演員**         | 1                | 3    | 表演 / 訪談 / 比賽關鍵時刻                       |
| **YouTuber / Podcaster**  | 2                | 4    | 代表節目 / 訪談 (官方頻道)                       |
| **政治人物 / 學者**       | 0                | 2    | 演講 / 重要場合影像（如有）                      |
| **電影 / 紀錄片**         | 1                | 2    | 預告 / 關鍵片段（注意版權）                      |
| **歷史事件**              | 0                | 2    | 紀錄片 / 倖存者口述（如有官方版本）              |
| **Nature / 生態**         | 1                | 2    | 直播 / 紀錄片 / 觀察影像                         |
| **Food / Culture / Tech** | 0                | 1    | 大多靠圖即可                                     |
| **Hub 頁**                | 0                | 0    | 不放 iframe                                      |

Hub 頁 / 短文 / 純架構性條目不放 iframe。多於上限 → 視覺擁擠打斷敘事，重新分散。

> ⚠️ **媒體密度 band（floor + ceiling）**（2026-07-12 哲宇 directive「提升上限，1.5x-2x 都是健康，新基準範圍 1.2~2」第三波上修；lineage：v6.4 單一上限 0.8 → v6.6 band 0.7–1.2 → v6.8 floor 0.8 → **1.2–2.0**）：總體 (圖+影片+hero+tw-\* 模組) density 落在 **1.2–2.0 / 1k CJK** 健康帶。**下限 1.2**：低於 = 媒體偏少（舊健康範本 設研院 0.91 / 天下 0.92 / 黃魚鴞 0.82 在新基準下屬偏少——方向 = 富媒體 default 再拉升）→ 補圖、官方影片或 tw-\* 視覺模組。**上限 2.0**：高於 = visual 密度偏高。**> 2.5 且段落 median < 55 = HARD atomization**（雙信號結構不變；帶內範本 陳建年 1.48 / 周蕙 1.76——周蕙當年是 density+median 雙信號才 HARD）。`paragraph-rhythm` plugin 自動 catch 全 band。歷史 narrative：[reports/spore-voice-drift-fix-2026-05-28.md §第 7 種 pattern](../../reports/spore-voice-drift-fix-2026-05-28.md)。

**位置原則**（呼應 Step 4.3.1 三段敘事節奏）：

- iframe 放在「該段 prose 結尾」，不是段首 — 讓讀者先讀完文字段，再有 option 聽 / 看
- 沿文章時間軸 / narrative arc 放，不是按重要性堆在開頭
- 每個 iframe 配 italic caption 標明 (1) 官方來源頻道 (2) 跟文章 narrative 的呼應

**標準格式**（黃魚鴞 / 陳建年 pattern）：

```html
<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/{VIDEO_ID}"
    title="{原始繁中標題}"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
</div>

_{source channel} 官方 MV：{跟文章 narrative 呼應的一句話描述}。_
```

> ⚠️ **`</div>` 跟 `_caption_` 之間必須有空行**（2026-06-07 哲宇 live review callout）：markdown / remark 對 HTML block（`</div>`／`</iframe>`）後**緊接**的 `_..._` 不會 render italic，底線會變成字面字元顯示。working pattern（陳建年）是 `</div>` ↵↵ `_caption_`。spawn writer agent 寫 iframe 時最常漏這個空行（複雜生活節 3 支全漏）。`image-health` plugin 已儀器化 catch（caption 缺空行 WARN，2026-06-07）。

**Verify 步驟**（強制）：

1. 每個 video ID 走 WebFetch 確認「Official Music Video」或「官方完整版 MV」標記（不憑 search title 推斷）
2. preview_eval 跑 `document.querySelectorAll('iframe[src*="youtube.com/embed"]').length` 確認 N 個 iframe render
3. preview_eval 列 `[...iframes].map(f => f.src.split('/embed/')[1])` 比對 video ID 跟原稿一致

**跟 Step 1.9.1 inline 外連的分工**：

- Step 1.9.1 inline link：3-8 個，作品名第一次出現處 hyperlink，預設都加（成本低）
- Step 4.3.6 iframe embed：3-5 個，沿 narrative arc 放代表作（高 value、高呈現成本）
- 同篇條目可以**並存** — inline link 給「邊讀邊聽 option」，iframe 給「代表作必看」

**範例參考**：

- Music 條目：[knowledge/People/陳建年.md](../../knowledge/People/陳建年.md) — 4 iframe 沿 1999 → 2000 → 2025 時間軸
- Nature 條目：[knowledge/Nature/黃魚鴞.md](../../knowledge/Nature/黃魚鴞.md) — 2 iframe (公視報導 + 雪霸育雛直播)，敘事密度型

#### Stage 4 Step 4.3 邊界與例外

- **Hub 頁**（`_*.md`）：不放圖，跳過 Step 4.3
- **短修正 / heal commit**：不重新走 pipeline，圖用既有的不動
- **翻譯文**：跟原文圖同步（cache 共用），caption 翻譯成對應語言
- **沒有合適媒體素材**：明確標 `no-media` 進 research 檔，跳過 Step 4.3
- **觀察者直接丟連結**（如林琪兒 ι session）：走 Step 4.3.2-4.3.6 補圖 SOP，不走 Stage 1 Step 1.9
- **Article ship 後才發現缺圖**：spawn `heal:` commit + 走 Step 4.3

#### 跟 spore 配圖區分

| 圖種                  | 路徑                           | 用途                    | 生成方式                                 |
| --------------------- | ------------------------------ | ----------------------- | ---------------------------------------- |
| article hero / inline | `public/article-images/{cat}/` | 文章內容                | Stage 1 Step 1.9 + Stage 4 Step 4.3 手動 |
| OG 社群分享           | `public/og-images/{cat}/`      | facebook / twitter card | dashboard 自動 derive                    |
| spore poster          | `public/spore-images/`         | Threads / X 配圖        | `make-spore.sh` 自動                     |

不要嘗試共用 — spore 是 social 媒介，需要不同 aspect 跟 brand overlay。article 圖 cache 完整／spore 圖 ephemeral，分開管理。

---

---

<!-- ==== source: REWRITE-STAGE-5-CROSSLINK.md @ 70e08c91d ==== -->

## Stage 5 contract — 連（雙向延伸閱讀＋relatedDiary＋Merge 收尾）

> **本檔是 REWRITE-PIPELINE v9.0 的 stage contract**：一個執行者（主 session、sub-agent、
> 或任何 context 有限的 model）只讀本檔＋本檔 INPUTS 宣告的檔案，就能執行本 stage。
> 派發路由與全 pipeline spine 在 [REWRITE-PIPELINE.md](REWRITE-PIPELINE.md)（薄索引）。
> 內文自 v8.0 主檔 verbatim 搬移（原行號 RP v8.0 L2254-2390），歷史敘事與教訓保留在文內。

### 執行卡

|                  |                                                                                                                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **職責**         | 掃 sibling、補 forward＋reverse 延伸閱讀、relatedDiary 回扣、（Merge only）Astro redirect 5 lang＋刪舊檔                                                                         |
| **執行者**       | 主 session                                                                                                                                                                       |
| **INPUTS**       | canonical 正文；`knowledge/{Category}/` sibling 清單                                                                                                                             |
| **OUTPUTS**      | 本文＋sibling 延伸閱讀更新；frontmatter `relatedDiary`（工具寫入，禁手編）                                                                                                       |
| **GATES**        | `article-health.py --check=format-structure`（sibling 預檢）；`python3 scripts/tools/sync-diary-links.py --diary {slug} --article {slug} --apply`；Merge：`npm run build` verify |
| **context 預算** | 本檔＋成品＋sibling 標題層                                                                                                                                                       |

### AGENT PROMPT

**不派 agent**——cross-link 需要全站語境，主 session 自跑。

### 交付條件（stage 完成的定義）

- [ ] forward＋reverse 延伸閱讀落檔（sibling 先過 `--check=format-structure` 預檢）
- [ ] `sync-diary-links.py --apply` 完成 relatedDiary 回扣（禁手編 frontmatter）
- [ ] （Merge variant）Astro redirect 5 lang＋刪舊檔＋`npm run build` 過
- [ ] commit 後編輯台已更新（HANDOFF 第 3 步）

### HANDOFF（stage 完成時）

> stage 若委派 sub-agent，本五步由 orchestrator 於收件驗證後執行（agent 不碰共用看板——2026-07-16 高教 dogfood F6）。

1. OUTPUTS 全數落檔（顯式路徑，不存 scratchpad / tmp——REFLEXES #81）**並隨手 commit（只 stage 本 stage 產物路徑——可觀測性與跨 session 接力的底座，v9.5；勿 `git add -A`）**
2. GATES 逐條跑過，結果如實回報（sub-agent claim 是線索不是 oracle，REFLEXES #31）
3. 更新編輯台：`python3 scripts/core/generate-newsroom-data.py`（看板反映現況）
4. 回報格式：stage id ＋ 產物路徑清單 ＋ gate 結果 ＋ 未解疑慮（有就寫，不粉飾）
5. 終點：ship（翻譯走巴別塔，見主檔 §翻譯跨 pipeline boundary）

---

### Stage 5: 連（Cross-link，預算 5%）

#### Step 5.1: 掃描 knowledge/ 找相關文章

```bash
ls knowledge/{Category}/ | grep {keyword}
grep -r "主題關鍵詞" knowledge/{Category}/
```

**判斷標準**：

- ✅ 讀者讀完那篇後會自然想知道本文主題
- ✅ 兩篇文章有實質的知識關聯（不只是同 category）
- ❌ 不要為了連結而連結（「台灣」不需要連到每篇文章）

#### Step 5.2: 雙向延伸閱讀（forward + reverse）

##### Forward：本文 → sibling

延伸閱讀格式（與 Stage 2 Step 2.6 一致）：

```markdown
**延伸閱讀**：

- [台灣氣候危機與淨零轉型](/nature/台灣氣候危機與淨零轉型) — 氣候變遷如何驅動台灣的能源轉型與產業結構重組
```

##### Reverse：sibling → 本文

到 sibling 文章加指向本文的延伸閱讀條目。

**Commit 格式**：`cross-link: 為「{文章名}」建立雙向延伸閱讀`

⚠️ **只改延伸閱讀區塊。不要順便「改善」其他文章的內容。**

#### Step 5.3: Sibling 格式預檢

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

**觸發**：2026-05-02 EVOLVE-batch — 兩廳院 EVOLVE 嘗試補 reverse cross-link 進中正紀念堂，pre-commit hook 失敗（中正紀念堂有 12 條書目格式 footnote pre-existing 不合 Taiwan.md `[^n]: [Name](URL) — desc` standard）。Defer 到獨立 EVOLVE issue 是正確處理。

#### Step 5.3-bis: relatedDiary — 連回寫這篇時的反芻日記（meta-transparency）

如果收官時寫了反芻 diary（`/twmd-diary`），把那篇 diary 的 slug 加進本文 frontmatter `relatedDiary`。文章底部會渲染成可點的日記區塊，讓讀者看見「寫這篇的時候，這個系統在想什麼」。

**不要手動編輯 frontmatter，跑工具**（v2.2 儀器化，2026-06-24 龜山島 callout — 手動補沒閘門 → 漏掉）：

```bash
python3 scripts/tools/sync-diary-links.py --diary {diary slug} --article {本文 slug} --apply
```

idempotent，自動寫 `knowledge/` + `src/content/` mirror、dedup、apostrophe-safe。產出的 frontmatter：

```yaml
relatedDiary:
  - 2026-06-19-115522-manual # 只給 slug；title／摘要／日期由 RelatedDiaries.astro build-time 自動 resolve
  - {
      slug: 2026-04-13-alpha2,
      excerpt: '想覆寫摘要時改用物件形式（--excerpt）',
    }
```

- slug = 日記檔名去 `.md`（希臘字母 transliterate；CJK／描述式 handle 原樣保留，對應 `/semiont/diary/{slug}`）
- array 可多篇：一篇文章跨多次 session EVOLVE，每次反芻都掛得上來（工具 append/merge 不覆蓋舊的）
- schema 在 `src/content.config.ts`，渲染 `src/components/RelatedDiaries.astro`（對位 SporeFootprint）；取代舊的單篇 `diaryLink` / `diaryExcerpt`
- 延續 [MANIFESTO](../semiont/MANIFESTO.md)「我讓你看著我看著我自己」，把文章的生產過程攤給讀者看
- 反向回扣 HARD step + 工具 canonical 在 [DIARY-PIPELINE Stage 5](DIARY-PIPELINE.md)（寫完 diary 那刻就跑，記憶最新；`/twmd-finale` 自動跑）

#### Step 5.4: Astro redirect 5 lang + 刪舊檔（Merge variant only）

整併獨有的收尾，**四件事缺一不可**：

##### Step 5.4.1: Astro redirect（5 lang 全寫）

`astro.config.mjs` `redirects:` 區塊：

```javascript
'/{old-category}/{zh-slug}': '/{new-category}/{zh-slug}/',
'/en/{old-category}/{en-slug}': '/en/{new-category}/{new-en-slug}/',
'/ja/{old-category}/{ja-slug}': '/ja/{new-category}/{new-ja-slug}/',
'/ko/{old-category}/{ko-slug}': '/ko/{new-category}/{new-ko-slug}/',
'/fr/{old-category}/{fr-slug}': '/fr/{new-category}/{new-fr-slug}/',
```

**不可省任一語系**——舊 URL 在 SC / 外站可能任何語系都有 backlink。漏一個語系就漏一條 SEO 流量。

##### Step 5.4.2: 刪除被併方原檔（5 lang + sync 鏡像）

- `knowledge/{old-category}/{原檔}.md`（zh-TW）
- `knowledge/{en,ja,ko,fr}/{old-category}/{translation-slug}.md`
- 跑 `bash scripts/core/sync.sh`，`src/content/` 鏡像會跟著刪
- 確認 `git status` 顯示 zh-TW + 4 lang knowledge + 對應 src/content 全部 deleted

##### Step 5.4.3: Cross-link audit

- `grep -rn "被刪 slug" knowledge/ src/` — 找所有引用
- 出現的 wikilink / markdown link 改指 canonical（或刪除）
- Hub 頁面（`_*.md`）裡的舊條目改指 canonical

##### Step 5.4.4: Build verify

- `npm run build` 必須過（會驗 redirect 語法）
- 隨機開一個被刪的舊 URL 試 redirect 是否真的轉到 canonical
- sitemap 應減少對應數量的 entry

##### Merge variant commit message

- commit prefix 用 `🧬 [evolve+merge]`（不是純 `[evolve]`）
- commit body 列：保留誰、為何、EVOLVE 進去什麼、刪了哪幾個檔、設了哪幾條 redirect
- reply issue 必附 commit hash，並說明「未來類似問題會走整併變體 SOP」

#### Boundary variant cross-link

每篇單獨走完整 Stage 1-5 流程。Step 5.2 雙向延伸閱讀時要互相反向回補（C 寫完 → 加進 B/D 延伸閱讀；B 寫完 → 加進 C/D；以此類推），形成完整 sibling 網路。

##### Boundary variant commit message

- 多篇分多 commit / 多 phase（不要硬塞同 commit）
- 每個 phase commit prefix 仍用 `🧬 [semiont] rewrite:` + 描述含 `Phase N/M`
- Issue 留 open，每個 phase 完成 update comment，全部 phase ship 後才 close

---
