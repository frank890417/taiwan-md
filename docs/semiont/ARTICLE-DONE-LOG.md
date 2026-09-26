---
title: 'ARTICLE-DONE-LOG'
description: 'append-only 文章開發完成歷史 — 反向時間排序，最新在頂；挑新主題前可 grep 避免重複開發'
type: 'cognitive-buffer'
status: 'log'
apoptosis: 'never'
current_version: 'v1.5'
last_updated: 2026-09-18
last_session: '2026-09-18-semiont-heartbeat（inbox-audit 🟠 兩條貢獻者已交稿的 NEW 條目歸檔：鐵窗花／台灣行動支付）'
sister_docs:
  - 'ARTICLE-INBOX.md'
  - 'MEMORY.md'
upstream_canonical:
  - '../pipelines/REWRITE-PIPELINE.md'
read_strategy: 'on-demand'
---

# ARTICLE-DONE-LOG — 文章開發完成日誌

> **append-only log**。ARTICLE-INBOX §Done 的歸檔，最新在頂（reverse chronological）。
> 從 pending / in-progress 完成的條目搬到這裡保留歷史，避免 ARTICLE-INBOX 膨脹。
>
> **分工**：
>
> - [ARTICLE-INBOX.md](ARTICLE-INBOX.md) = 當下的 pending / in-progress（未來視角）
> - **本檔** = 已完成歷史（過去視角）
>
> 建立動機：2026-04-20 γ2 觀察者「清理一下 ARTICLE-INBOX 的 Done，分成 Done 檔案做 append style log」。ARTICLE-INBOX 累計 12+ 條 Done 後段篇幅失控，拆分讓 inbox 回到「只看該做什麼」的純 intake 功能。

---

## 寫入規則

每次 REWRITE-PIPELINE Stage 6 commit 後：

1. 在 §Log 最頂 append 新條目（reverse chronological）
2. ARTICLE-INBOX 對應條目**整段直接刪除，不留 pointer 註解**（per INBOX 頂部完成歸檔鐵律，2026-04-29 α 拍板；本行原寫「改一行 pointer 註解」是 α 重構前的舊規，2026-07-16 對齊修正）
3. 如果 pending 條目 status 被改為 done 但沒搬走（幽靈條目），一併搬到這裡

---

## 條目格式

沿用 ARTICLE-INBOX §Done 既有格式（不重設計避免遷移摩擦）：

```markdown
### {主題} — YYYY-MM-DD {session} 完成（副標）

- **Article**: [knowledge/Category/slug.md](../../knowledge/Category/slug.md)
- **Pipeline**: REWRITE-PIPELINE v{version} — {NEW | EVOLVE} 模式（...）
- **核心矛盾**：...
- **Hook**：...
- **品質**：腳註數 / 字數 / 破折號 / ...
- **Research**: [reports/research/YYYY-MM/slug.md](../../reports/research/YYYY-MM/slug.md)
- (optional) 敏感素材處理 / 大事實修正 / Cross-link / 待觀察者驗證
```

---

## 📜 Log（reverse chronological，最新在頂）

### 台灣 BIM 與營建科技 英文版 metadata SEO — 2026-09-20 完成（補登，2026-09-27 twmd-news-lens-weekly 發現 INBOX entry 未收）

- **Article**: [knowledge/en/Technology/taiwan-bim-construction-tech.md](../../knowledge/en/Technology/taiwan-bim-construction-tech.md)
- **Pipeline**: EVOLVE-PIPELINE 🟠 SEO 優化型（只改 title／description，正文不動），commit `753dde91d`（2026-09-20 02:10）
- **改了什麼**：title 從 130 字縮到 119 字並放進搜尋者打的「Building Information Modeling」「construction industry」「case study」
- **效果追蹤**：改完一週 SC 兩條目標 query 曝光 2,208 → 795、2,252 → 762，點擊仍 0，位置 3.0〜7.7 不變；description 仍有 324 字（Google 截 ~155），第二刀可能要落在 description。兩週後再看（reports/probe/2026-09-27.md 內部訊號）

### 金鐘獎 NEW — 2026-09-18 golden-bell session 完成（一座 1965 年為廣播鑄的鐘，六十一年記下誰對全島說話）

- **Article**: [knowledge/Culture/金鐘獎.md](../../knowledge/Culture/金鐘獎.md)
- **Pipeline**: REWRITE-PIPELINE v9.9 stage contracts ＋ Rewrite Guide 互動式協定（run id `golden-bell-20260918`，orient→investigate→compose→cold-read→verify→release 六站全部乾淨 context 評閱；compose 23 次提交／20 次 delta 評閱、冷讀 15 位讀者／13 輪評閱、verify 3 輪、release 站主編兩輪（第一輪 revise 抓到 2010「製作公司與頻道並排」是維基欄位格式推論））。run_profile: standard-lite。來源：2026-09-18 news-radar P0
- **spine**：立體群像（P7 週期活動記事＋M1 認識導覽前置）＋時代縮影（主）／傳承與世代（輔）
- **論點**：名單記錄，它不決定——獎勵要點決定門的位置，評審決定門內誰得獎；戲劇節目獎「得獎單位」那一欄六十一年的變化（老三台獨佔十七年→民視公視→大愛客家→三立八大→福斯、台灣大哥大、Netflix）記的是台灣把「說故事給全島聽」的位置交到誰手上
- **Hook**：1965 年 7 月 10 日中山堂，嚴家淦頒出八座金鐘，七家電台分走，電視還不在獎勵範圍裡
- **品質**：7,000 CJK ／ 71 腳註零孤兒 ／ 5 張 Commons CC 圖（WebP）＋1 支官方頻道影片 ／ 5 個 `tw-*` 模組 ／ rewrite-stage-4 hard=0 warn=0 ／ rewrite-stage-3-5 hard=0 warn=0 ／ prose-flow 0/3 ／ prose-health warn 1（新聞稿逐字引文內全形分號，保留）／ fact-atom-diff PASS ／ rationale 四鍵齊
- **Research**: [reports/research/2026-09/金鐘獎.md](../../reports/research/2026-09/金鐘獎.md)（三 lane 合成單檔，82 來源，`research-report-health --tier=depth` hard=0 warn=0）；投影 [reports/article-projection/金鐘獎.md](../../reports/article-projection/金鐘獎.md)；審計 stage35／stage36 ／ 定稿站 `reports/article-evolve/金鐘獎-closing.md`
- **大事實修正**：研究報告與 Stage 0 誤讀維基列表，把 2011 第 46 屆戲劇節目獎記成《犀利人妻》——影視局 100 年得獎名單一手推翻，正確是客家電視《雲頂天很藍》；「八家電台」→ 七家（中廣兩座）；「公視入圍最多」無跨單位來源 → 改自報 60 項；「廣播早一週」逐屆回官方頁；維基預填「2026《我們六個》」不採；2010《情義月光》「與頻道並排」改為「得獎單位第一次寫進製作公司」（影視局 99 年名單）；戲劇節目獎 1971–78 前身「大眾娛樂性節目」補進沿革
- **敏感素材處理**：未過廣播特別獎門檻的當事人全篇不具名（Stage 2 護欄），但「鼓勵不是沒收」經原報導 curl 確認為其本人直言，正文寫身份不寫姓名；公視「最大入圍者／轉播方／額度被算一份」三事實並排並明寫用意，不做球員兼裁判暗示；「政治介入」質疑只記提問與曹瑞原回應，並寫明報導未載質疑方
- **Cross-link**：forward 五條；reverse 補進公視／台灣綜藝／植劇場／台灣電視產業史／八點檔；金曲獎 pre-existing prose-health HARD 依 Stage 5.3 defer → [#1748](https://github.com/frank890417/taiwan-md/issues/1748)
- **待觀察者驗證**：典禮 10/17、10/23、10/24 尚未舉行，文章停在名單已印；頒獎後需 EVOLVE-delta 補結果
- **2026-09-19 v2 觀點重做**（哲宇 callout：文謅謅／堆砌／數字過重；v6.7 單檔 pipeline 實驗，session golden-bell-v2）：論點改為「金鐘每年替台灣劃一條線：誰算得上我們的電視，誰還在線外」；開場從八家電台名單改為 2022 陳亞蘭得男主角獎那一晚；補一輪只找人的研究（賈靜雯／呂蒔媛／龍劭華 2019 感言、連炳發、楊小黎、王一明、吳進成、莊凱勛、羅世宏）；tw-\* 5→2、腳註 71→59、7,329→4,538 字；抓到 v1 圖說「後台、身穿西裝」與研究報告「鼓勵不是沒收」歸屬兩處錯；stage35／stage36 v2 audit 落 `reports/research/2026-09/金鐘獎-v2-stage3[56]-audit.md`；標題改「三台輪了十七年之後，台灣每年替「我們的電視」劃一次線」（v1 工單說不換標題，v2 追加要求觀點重做，主 session 可退回）

### 鐵窗花 — 2026-09-18 semiont-heartbeat 歸檔（貢獻者 idlccp1984 於 2026-08-20 以 PR 交稿，非走產線）

- **Article**: [knowledge/Culture/鐵窗花.md](../../knowledge/Culture/鐵窗花.md)
- **Pipeline**: 無——貢獻者投稿（PR merge `ec3d660ca3`），INBOX 條目（2026-07-18 branch-analysis 台灣建築 P2）由 inbox-audit 🟠 STALE-NEW 抓到後歸檔
- **品質**：3660 CJK ／ 11 腳註；`lastHumanReview: false`，仍是未審初稿（FACTCHECK 巡邏抽樣母體）
- **原 entry 留的提醒**：深度依賴老屋顏工作室單一田野來源；若日後 EVOLVE，圖案地域分類要找第二研究體系交叉
- **Pre-research**: reports/research/2026-07/台灣建築-D-常民與保存.md §一（可供 EVOLVE 用）

### 台灣行動支付 — 2026-09-18 semiont-heartbeat 歸檔（貢獻者 Kevin Huang 於 2026-09-01 交稿，非走產線）

- **Article**: [knowledge/Technology/台灣行動支付.md](../../knowledge/Technology/台灣行動支付.md)
- **Pipeline**: 無——貢獻者投稿（commit `6c937d2f0a`），INBOX 條目（2026-04-23 dead-cross-ref-scan P3）由 inbox-audit 🟠 STALE-NEW 抓到後歸檔
- **品質**：5451 CJK ／ 18 腳註；`lastHumanReview: false`
- **原 entry 的切角**（供 EVOLVE 對照）：Line Pay 一強 / 街口 / 全支付 / 台灣 Pay / 悠遊付；為什麼台灣支付落後韓國日本——銀行勢力、信用卡盛行、現金文化

### 台灣油價機制與中油 — 2026-09-18 oil-price 完成（牌價漲七毛，中油先吸收兩百億）

- **Article**: [knowledge/Economy/台灣油價機制與中油.md](../../knowledge/Economy/台灣油價機制與中油.md)
- **Pipeline**: REWRITE-PIPELINE v9.9 — NEW 模式 ＋ 互動式 REWRITE 協定（`twmd.mjs rewrite`，run id `oil-price-20260918`，orient→investigate→compose→cold-read→verify→release 六站全 accept、`ready-for-publication`）。run_profile: standard-lite（派工單指示；第三型依路由應為 standard，差額以 Stage 3 兩位 verifier＋定向再驗＋互動協定五輪冷讀補強）
- **spine**：第三型多觀點立場議題探討矛盾型（矛盾驅動＋手法 5 並陳、手法 4 開場收尾），M3 事件追蹤
- **論點**：牌價只漲七毛，因為同一公升被三份帳分攤（財政部當週少收的稅、你付的牌價、中油先記在自己帳上的那一份）；這場爭論吵的是第三份帳該用哪個口徑算（中油週報 198.5 億、追加預算 1,014.31 億、在野口中的「哪一種重大事故」彼此對不上），而利息、將來要還的錢、誰用得最多三筆還沒人端上桌
- **Hook**：2026-03-22 週日晚上八點半，雲林雅虎加油站每個入口至少十輛車，站員用三角錐隔出動線；婦女加二十公升「省了36元，省就是賺」，八十多歲阿嬤騎車來時油箱是滿的
- **品質**：5,854 CJK／51 腳註／3 張 CC 圖（本地 WebP）／12 個 `tw-*` 模組各附來源行／article-health 全掃、rewrite-stage-3-5、rewrite-stage-4 hard=0 warn=0／image-health 3 圖／wikilink、link-target 0／research-report-health depth PASS／Stage 3.5 幻覺稽核與 3.6 story-atom 稽核 PASS／footnote-url 24 warn 為 .gov.tw 憑證鏈與 UA 403，curl 逐條 200
- **Research**: [reports/research/2026-09/台灣油價機制與中油.md](../../reports/research/2026-09/台灣油價機制與中油.md)（單檔 SSOT，三 lane 合成，§10 Stage 3 audit＋§11 冷讀回修查證八條；sources/ 逐字文本 40 檔）
- **投影／編輯室**：[reports/article-projection/台灣油價機制與中油.md](../../reports/article-projection/台灣油價機制與中油.md)；2.0-R 三席、2.5-R 兩席＋四探針、Step 3.8 定稿手，全部乾淨 context；互動協定各站評閱與冷讀交件在 `reports/staging/oil-price/run/`
- **大事實修正**：lane A 一句不存在的中油 4/8 聲明（「並無媒體所稱超漲⋯抹煞員工努力」）被 verifier 抓下改真逐字；2006 公式非週均 7D3B；資本額 1,301 億三源皆無不寫；[^20] 自由時報連結是 2012 舊文；香港 1.8→18 億港元；TVBS「NT$90.6 billion」誤譯；冷讀抓到「應漲 11.2 元」寫錯量（是公式價對前一週牌價的累積差距）、「回收條款還沒啟動」查無、1,014.31 含不含天然氣經濟部「油氣」與次長「汽柴油」兩說；定稿主編抓到 4,217.69 含 70 億防汛（補貼加增資是 4,147.69）與 32.2 元隔天零時才生效
- **Cross-link**：forward 4（發票、台塑集團、電網韌性、氣候危機與淨零）；reverse 4（台塑、電網韌性原無延伸閱讀區塊，補上）
- **待觀察者驗證**：IMF Fiscal Monitor 2026-04 p.18 頁碼；立院排審進度；貨物稅 3.7 對 3.415 的三毛、累計吸收「預估」算法、6 月底是否已「少跌」回收、四年 3,500 億與 2,338.34 億的關係，官方文件未解釋，正文只陳述缺口
- **值得記的一件事**：五輪冷讀（fresh→reread×4）從九條困惑收斂到零實質困惑，抓到的都是編輯室六席與兩位 verifier 沒抓到的「讀者用文章自己的數字就能算出來」的錯——同一份稿，看過藍圖的人會替作者補完，沒看過的人才會停下來算
- **2026-09-19 v2 觀點重做**（哲宇 callout：文謅謅／堆砌／數字過重；v6.7 單檔 pipeline 實驗，session 2026-09-19-003207-oil-price-v2）：論點改為「便宜靠一家被叫去站在最前面的國營公司先扛，按公升平分，誰用得最多二十年來沒人統計」；Stage 1 只找人（卓榮泰「跟中油說謝謝」、王美花、梁啟源、方振仁、劉鴻樟、板橋麵攤老闆娘，研究報告 §12–§13 ＋ 23 份新逐字檔）；H2 七節改人的動作序列；tw-\* 12→4、腳註 51→46、5,563 CJK；opening-readability 6.4→1.0／百字；四篇 sibling 反向連結描述同步改成新論點；stage35／stage36 audit 落 `-v2-stage35-audit.md`／`-v2-stage36-audit.md`。

### 誰算低薪 — 2026-09-18 low-wage write session 完成（主計總處說月薪零人、年薪一百二十六萬，差別在年終那一欄）

- **Article**: [knowledge/Society/誰算低薪.md](../../knowledge/Society/誰算低薪.md)
- **Pipeline**: REWRITE-PIPELINE v9.9 — NEW 模式，**互動式協議**（`twmd.mjs rewrite`，run `low-wage-20260918`，89 revisions／36 submissions，六站全 accept → `ready-for-publication`）＋既有 stage contract 全部 hard gate。run_profile: standard-lite（派發者指定；Step 0.1.6 規則 3 對第三型建議 standard）
- **spine**：第三型多觀點矛盾＋P8 判斷框架式
- **論點**：「零人」和「一百二十六萬人」都是真的：這場爭論吵的從來不是誰的數字對，是哪一欄的錢算薪水、誰站在分母裡——本薪那一欄有法律守著，年終那一欄沒有，而尺外面還站著三百多萬不在分母裡的人
- **Hook**：2026-09-14 下午四點主計總處記者會，副處長譚文玲同一場先算月薪零人、再算年薪 126 萬人
- **品質**：~10,400 CJK ／ 38 腳註零孤兒（37/38 curl 200，[^16] OECD 403 bot-block 文字已存 raw）／ 13 個 `tw-*` 模組 ／ 3 圖（hero 419KB hero 預算內）／ rewrite-stage-4 hard=0 warn=0 ／ stage-3-5 hard=0 ／ prose-health warn=3 全在逐字引語內 ／ prose-flow 0/3 ／ fact-atom-diff PASS ／ research depth PASS ／ 編輯室 health ✅×2
- **Research**: [reports/research/2026-09/誰算低薪.md](../../reports/research/2026-09/誰算低薪.md)（116 次搜尋／56 來源／23 一手；raw 目錄 13 檔含主計總處 3 份新聞稿 txt＋3 張 xlsx、勞動部 3 份、OECD 3 份 CSV/頁面、人力資源調查）；投影 [reports/article-projection/誰算低薪.md](../../reports/article-projection/誰算低薪.md)；Stage 3 稽核 `誰算低薪-stage35-audit.md`／`-stage36-audit.md`
- **乾淨 context 分席**：compose 評閱 14 位、冷讀者 12 位、verify 查核員 1＋復審 3、release 具名編輯 3（Opus，三輪：退 4 條→退 1 條→accept），全部獨立 agent，contextDisclosure 逐條記於 `reports/staging/low-wage/`
- **冷讀迴圈教訓**：同一句收束（主計總處先講月薪）十二位讀者讀出三種方向（替主計總處／替在野黨／守勢），改到「說明順序＋講法」的事實中點才停；release 編輯抓到「三百多萬人不在會議室分母」把統計分母與法律適用混成一格——部分工時／產業移工受最低工資法保障，只有自營／雇主／無酬家屬／家庭看護工在法外
- **Cross-link**：台灣斜槓世代／學習貧窮／冷氣與能源貧窮議題 三篇補反向延伸閱讀；外送專法因既有 34 條 prose 警告撞 pre-commit 預算延後
- **EVOLVE 掛號**：9/24 最低工資審議會結果（正文寫「預估 30,975」與「地板會再往上移一次」需改成事實）；2025 年（114 年）中位數統計 11 月出爐（126 萬／16.8% 換新一年；若公布非整年在職者比例，收尾可校準）；L125／L269 家庭看護工「另計」對齊；title 可補「人」字
- **2026-09-19 v2 觀點重做**（哲宇 callout：文謅謅／堆砌／數字過重；v6.7 單檔 pipeline 實驗，session low-wage-v2）：論點換成「最低工資守住了本薪，低薪搬進了年終那一欄」，title 同步；Stage 1 補一輪只找人（三 lane 25 次＋親核 9 次）：李姓上班族（udn 9/12）、張詠舜（天下 2025-03）、于姓小吃店老闆（TVBS 9/12）、何語／許舒博／林伯豐、楊書瑋、Threads @\_yummy_tw；fresh Opus 寫手只吃藍圖 v2 ＋ fact-pack；6 個 H2 動作序列、4 個 tw-\* 模組（13→4）、29 腳註、~4,700 字；opening-readability 4.3／41／口徑詞 8 ⚠️ → 0.5／32／0 ✅；查核員 A 抓三硬傷（2024 分母套 2026、銀行窄化金融保險業、上半年統計誤為同一份）全修，查核員 B 引語 17/17 逐字、七處記者轉述降回無引號；兩位冷讀者第一個 H2 前都沒想關。投影 [誰算低薪-v2.md](../../reports/article-projection/誰算低薪-v2.md)；稽核 `誰算低薪-v2-stage35-audit.md`／`-v2-stage36-audit.md`；研究報告 §1-bis／§2-bis／§6-bis／§8-bis。三篇姊妹文反向連結描述改對新論點，外送專法仍被 pre-existing prose-health HARD 擋住、延後

### 洪醒夫 EVOLVE — 2026-09-12 完成（全站 #1 搜尋流量 stub 深度進化）

- **Article**: [knowledge/People/洪醒夫.md](../../knowledge/People/洪醒夫.md)
- **Pipeline**: REWRITE-PIPELINE v9 — EVOLVE 模式（697 字 stub → 5,455 字深度長文）
- **核心矛盾**：白天在台中神岡社口國小教書認字、夜晚在燈下伏案為急速解體的台灣傳統農村做證；不喊政治口號，而用具體的小人物尊嚴回答「文學為誰而寫」
- **Hook**：二林貧農之子的「洪醒夫斯基」文學志向、社口國小教職員宿舍孤燈、安迪颱風夜車禍驟逝
- **品質**：5,077 CJK chars（article-health 計） / 11 腳註 / 3 張 Commons 場景配圖 / 1 大愛電視官方影片 iframe / article-health 0 hard 0 warn 全綠。2026-09-13 maintainer 事實查核後 heal：獎項屆次、子女、治喪委員會、全集版本與五處引語依來源修正，八條離線腳註移除
- **成果**：解開 SC 全站 #1 query（每週 ~2,654 imp）嚴重品質倒掛缺口，完整析論《黑面慶仔》、《市井傳奇》、《田莊人》與國文課本名篇〈散戲〉、〈紙船印象〉。

### 台灣早餐文化 — 2026-08-18 twmd-rewrite session 完成（兩萬家店賣著同一份早餐，沒有一個人擁有它）

- **Article**: [knowledge/Food/台灣早餐文化.md](../../knowledge/Food/台灣早餐文化.md)
- **Pipeline**: REWRITE-PIPELINE v9.7 — **Merge variant**（〈台灣豆漿與早餐店〉併入本篇）。run_profile: standard。Issue [#1389](https://github.com/frank890417/taiwan-md/issues/1389) @idlccp1984 回報兩篇重疊
- **spine**：立體群像（P8 命題式立體群像）＋感官場景沉浸（主）／時代縮影（輔）
- **論點**：台灣早餐能長成兩萬家店的共同清晨，不是因為誰設計得好，是因為它什麼都沒守住——**而三次失守代價落點完全不同**：沒有主人的做法擴散得最快、沒有人受損；有主人的招牌失守時有具名的人承受損失；每天站在煎台前的人，付出的東西從來沒有被算進任何統計
- **Hook**：六點十分，白鐵煎台已經燒了半個鐘頭；走出家門五分鐘會經過四塊長得很像又不一樣的招牌，四家店的老闆彼此不認識，菜單卻幾乎一模一樣
- **品質**：6,400+ CJK ／ 41 腳註零孤兒 ／ 8 圖（本地 WebP）＋3 支官方影片＋3 個 `tw-*` 模組 ／ prose-health hard=0 warn=0 ／ rewrite-stage-4 hard=0 ／ fact-atom-diff PASS
- **Research**: [reports/research/2026-08/台灣早餐文化.md](../../reports/research/2026-08/台灣早餐文化.md)（2,058 行單檔，五 lane 合成，197 來源／230 次搜尋）
- **Merge 收尾**：刪 zh ＋ 8 語譯文，設 **9 條 redirect**（contract 只寫 5 lang，已記 LESSONS `contract-hardcodes-growing-count`）；build verify hreflang/canonical/sitemap 三面 dead=0
- **大事實修正**：舊文兩篇合計五處無來源細節整條丟棄（英國作家《金融時報》引語疑杜撰、「1955 年林炳生開第一家豆漿店」人物混淆、美而美 1983→1981、加盟店月營收 30-50 萬零來源、凌晨兩點半鬧鐘虛構）；「早餐店比便利商店多」這個廣傳比較經查是兩把尺兩個基期，整條不用
- **產出教訓**：LESSONS `contract-hardcodes-growing-count`（pipeline contract 寫死語系數）；EDITORIAL §量詞隱喻 v2 家族版（哲宇 callout「帳」→ 發現把「帳」拿掉會用「算」長回來，prose-health 升級打家族不打字，9,815 檔校準真陽性 10 假陽性 0）
- **值得記的一件事**：六席大驗證輪裡四席抓到的問題，源頭都是我自己前幾輪的修補——修補是新的錯誤來源，而且它偽裝成進步

### 比國家還大的演算藝術 — 2026-08-19 algorithmic-art-evolve 完成（哲宇第一人稱長文，從工作坊逐字稿進化到深度文章）

- **Article**: [knowledge/About/比國家還大的演算藝術.md](../../knowledge/About/比國家還大的演算藝術.md)
- **Pipeline**: REWRITE-PIPELINE v9 — EVOLVE 模式（4,700 字 → 18,621 CJK 字；作者本人全程 in-loop 逐句校正語態）
- **核心矛盾**：一個寫規則不畫畫的演算藝術家，把同一套方法拿去長一座知識庫
- **品質**：18,621 CJK 字 / 85 腳註 / `article-health` hard=0 / 站上第 20 個視覺模組 `tw-article` 首次應用（正文嵌六張站內文章卡）
- **Research**: [reports/research/2026-08/比國家還大的演算藝術.md](../../reports/research/2026-08/比國家還大的演算藝術.md)（＋三份 delta 報告與一份 media 報告）
- **語態紀律**：三處語態錯位由作者本人抓到（鎢那篇的主詞、天下那句是他自己設計的橋段、「造物已活」語音辨識聽錯）——第一人稱文章的誠實下限是不寫錯，不是替作者揭露；查證住報告，聲音住正文

### 中央研究院 — 2026-08-18 academia-sinica 完成（不用教書、不用招生、直屬總統府，這個設計買到的是長度）

- **Article**: [knowledge/Society/中央研究院.md](../../knowledge/Society/中央研究院.md)
- **Pipeline**: REWRITE-PIPELINE v9 — NEW（Fresh）模式，立體群像 + P6 機構傳記 spine，standard run profile；四條研究 lane 平行 + 編輯室三席 revise + 大驗證輪九席
- **核心矛盾**：讓它握有長度的同一個設計，也讓它永遠被追問憑什麼
- **品質**：13,485 CJK 字 / 57 腳註 / 5 個視覺化模組 / 7 張圖 / 1 支官方影片；`article-health` rewrite-stage-4 hard=0、`prose-health` hard=0 warn=0
- **Research**: [reports/research/2026-08/中央研究院.md](../../reports/research/2026-08/中央研究院.md)
- **大事實修正**：兩個 H2 原本各站在一個查無來源的數字上（殷墟「近七成」、科普日「十三萬人」），改用官方頁面逐字可驗的對照（17,096 片對十一部著錄 9,913 片／已連續舉辦 26 年）

### 陳致中 — 2026-08-18 chen-chih-chung-rewrite 完成（從 AI 投稿 stub 走完整條 v9 產線）

- **Article**: [knowledge/People/陳致中.md](../../knowledge/People/陳致中.md)
- **Pipeline**: REWRITE-PIPELINE v9 — EVOLVE 模式（舊文 1,511 字 AI stub → 12,272 CJK 字），立體群像 + 核心矛盾為輔；六條研究 lane + 20 路 persona 稽核
- **核心矛盾**：司法定讞沒有褫奪公權，讓他終身不能登記的是一個月後修的選罷法——兩套機制獨立
- **品質**：12,272 CJK 字 / 62 腳註 / 全站 gate hard=0
- **Research**: [reports/research/2026-08/陳致中.md](../../reports/research/2026-08/陳致中.md) ＋ [stage36-audit](../../reports/research/2026-08/陳致中-stage36-audit.md)
- **敏感素材處理**：在世爭議政治人物，哲宇拍板「司法案件寫、私德案完全不進正文」，六個研究 agent 全程零檢索、正文零出現；炎上席抓到論證形狀與當事人本人申辯同構，改為主動寫出重疊讓讀者自行判斷

### 馬祖國際藝術島 — 2026-08-06 manual session 完成（一座沒有展館的美術館，把整座列島借來當展場）

- **Article**: [knowledge/Art/馬祖國際藝術島.md](../../knowledge/Art/馬祖國際藝術島.md)
- **Pipeline**: REWRITE-PIPELINE v9.5 — NEW（Fresh）模式。8/5 首 ship 後觀察者 callout「混亂、不立體」→ 回 Stage 2A 重投影（v3 三席全 revise 30 必改 → v4）→ 全篇重寫 → 原子重驗（7 ❌）＋外行冷讀新席（6/10→7/10）兩輪修訂
- **spine**：立體群像。主軸「借」（空間／時間兩層，v4-r2 收回不套四層）
- **Hook**：養雞場相思樹上一間用士官長棄船木料搭的樹屋
- **品質**：7,798+ CJK ／ 48 腳註零孤兒 ／ hard=0 ／ 官網 API 一手材料 199 件作品
- **Research**: [reports/research/2026-08/matsu-biennial.md](../../reports/research/2026-08/matsu-biennial.md) ＋ [官網一手補充](../../reports/research/2026-08/matsu-biennial-official-site.md)
- **產出教訓**：LESSONS `self-consistent-gates-miss-reader-comprehension`（11 席全綠而讀者讀不懂）；外行冷讀席 dogfood 成功，候選常設席位

### 台灣行道樹 — 2026-08-04 twmd-rewrite session 完成（一條用樹命名的路，和一百年沒做完的決定）

- **Article**: [knowledge/Lifestyle/台灣行道樹.md](../../knowledge/Lifestyle/台灣行道樹.md)
- **Pipeline**: REWRITE-PIPELINE v9.5 — NEW（Fresh）模式
- **Research**: [reports/research/2026-08/台灣行道樹.md](../../reports/research/2026-08/台灣行道樹.md)

### 台灣海關報關與 EZ WAY — 2026-08-04 manual session 完成（按下「申報相符」的那一下，你委任了誰）

- **Article**: [knowledge/Lifestyle/台灣海關報關制度與EZWAY.md](../../knowledge/Lifestyle/台灣海關報關制度與EZWAY.md)
- **Pipeline**: REWRITE-PIPELINE v9.5 — NEW（Fresh）模式，spine 第三型（多觀點立場議題：免稅門檻＋治理歸屬雙爭議）
- **Research**: [reports/research/2026-08/台灣海關報關制度與EZWAY.md](../../reports/research/2026-08/台灣海關報關制度與EZWAY.md)
- **衍生**：EZ WAY 孢子 #167/#168/#169 三平台；LESSONS `ordering-is-an-ethical-decision`

### 黃崇仁 — 2026-08-03 manual session 完成（他學的是醫學，一輩子把公司當病人救）

- **Article**: [knowledge/People/黃崇仁.md](../../knowledge/People/黃崇仁.md)
- **Pipeline**: REWRITE-PIPELINE v9.5 — NEW（Fresh）模式，standard profile 全編排（觀點 Opus／研究 4 lane fan-out／投影主 session／投影編輯室三席／fresh Opus writer／大驗證輪四席平行／變更節定向複驗／Step 3.8 定稿站）
- **spine**：**立體群像**（時代縮影為主 ＋ 核心矛盾為輔 ＋ 不可取代的瞬間 hook）。People 題依 REFLEXES #77 預設立體群像，張力當 facet 不當主脊
- **組織主軸**：不清算，賭時間、賭關係——救了別人，也救了自己，有時候也會賭輸
- **Hook**：金士頓創辦人孫大衛走進力晶辦公室那天，心裡還在想要怎麼開口回絕。那是一個耶誕夜，力晶剛下市、背債千億，銀行團在準備拍賣廠房
- **品質**：7,428 CJK ／ 63 腳註 ／ 9 個 tw-\* 模組 ＋ 3 圖 ／ 破折號 0 處 ／ prose-health score 1 ／ `--profile=rewrite-stage-4` hard=0
- **Research**: [reports/research/2026-08/黃崇仁.md](../../reports/research/2026-08/黃崇仁.md)（2,587 行單檔，201 來源／14 一手／10 英文；4 lane 依 Step 1.7.4 合成單檔）
- **時效背景**：主角 2026-07-31 辭世，本文完成於辭世第三天。全程走逝者書寫紀律（禁臨終場景開場／禁公審式清算／禁英雄化辯護／遺族只作背景），文末附時間位置揭露句
- **敏感素材處理**：哲宇拍板「如實寫、中立陳述」——27 萬股東變壁紙與 0.3 元回購推估獲利 180 億緊貼市場質疑並陳、內線交易刑事無罪定讞與民事賠 297 人 46 萬 3,102 元兩條並列、SBI 指控標明為個人聲明非司法認定、合肥晶合技轉因果鏈完整交代但不下定性判斷
- **本篇驅動的 DNA 進化三條**：EDITORIAL v6.14 Title 第 5 原則（數字要有象徵重量，不是規格表）／v6.15 §後台洩漏 六形狀 ＋ `prose-health` §backstage 五組偵測器（878 篇校準 29 hits 零誤報）／LESSONS-INBOX +3（中立管語氣不管份量、具體數字非象徵重量、後台洩漏）
- **驗證輪結果**：事實原子逐驗約 40 個原子零杜撰引語零數字錯誤（3,282 天與享壽 76 用 Python 獨立重算吻合）／炎上倫理 pass（量測爭議節 1,338 字元 > 收藏節 1,024，技轉節 1,907 全文最長）／論點兌現 echo map 7/7 全中／冷讀席 17 條可讀性訊號全數處理

### 吳明益 — 2026-07-28 rewrite session 完成（用複眼把消失的台灣寫回來）

- **Article**: [knowledge/People/吳明益.md](../../knowledge/People/吳明益.md)
- **Pipeline**: REWRITE-PIPELINE v9.5 — 完整驗證＋data-viz 補齊（7/28 收官 commit）
- **Research**: [reports/research/2026-07/吳明益.md](../../reports/research/2026-07/吳明益.md)

### 苯駢芘食安事件 — 2026-07-26 rewrite session 完成（知情19天才通報，1,322家店最後才被算進帳）

- **Article**: [knowledge/Society/苯駢芘食安事件.md](../../knowledge/Society/苯駢芘食安事件.md)
- **Pipeline**: REWRITE-PIPELINE v9.5 — 全面重寫（把「隱匿」翻譯成制度問題，政治攻防降為並陳）
- **Research**: [reports/research/2026-07/苯駢芘食安事件.md](../../reports/research/2026-07/苯駢芘食安事件.md)

### 外送專法 — 2026-07-25 外送專法 session 完成（法律砌好了地板，地板以上還是演算法的）

- **Article**: [knowledge/Society/外送專法.md](../../knowledge/Society/外送專法.md)
- **Pipeline**: REWRITE-PIPELINE v9.0 — NEW（Fresh）模式，全編排（觀點 Opus／研究 fan-out／投影主 session／編輯室三席＋兩席／fresh Opus writer／verifier fan-out）
- **spine**：**矛盾驅動 ＋ 多元視角並陳**。原判立體群像，2026-07-25 兩件事同時發生後改判——20 persona gap-audit 三軸反向閥門獨立驗出立體會撫平三種不對稱（發言權／陣營內部光譜／入場資格），同日哲宇 directive「這題寫成多觀點立場議題探討矛盾型也沒問題」。是 REFLEXES #77 Boundary (c) 的第一個 in-loop 改判 instance
- **核心矛盾**：法律先給了保障，卻刻意不回答「他們到底算不算員工」；而真正決定收入的演算法，它要求留存卻不要求公開
- **Hook**：2026-07-21 零時後幾小時，一名外送員拍下兩張單——4.4 公里與 8.6 公里，報酬都是 90 元，他寫「恭喜，確定加 24 元不存在了」
- **品質**：9,700 CJK ／ 62 腳註（62/62 無孤兒）／ 6 個 tw-\* 模組 ／ 5 圖 2 官方影片 ／ 破折號 8 處 ／ prose-health score 3 ／ `--profile=rewrite-stage-4` hard=0 warn=0
- **Research**: [reports/research/2026-07/外送專法.md](../../reports/research/2026-07/外送專法.md)（2,901 行單檔，261 來源／44 一手／14 英文；六份增補 lane 依 Step 1.7.4 合成單檔）
- **投影藍圖**: [reports/article-projection/外送專法.md](../../reports/article-projection/外送專法.md)
- **編輯室**: [reports/editorial-room/外送專法-projection-review.md](../../reports/editorial-room/外送專法-projection-review.md)（三席 revise → 七條必改全回修）
- **大事實修正（9 條，全部由對抗性查證抓到）**：
  1. 拒絕檢查罰則在**第 24 條第 4 項**不是第 20 條（第 20 條是紀錄保存義務）
  2. 本法**從未宣告外送員不是員工**——第 1 條第 2 項雙軌明文導回勞基法；「去身分、重權益／第三類勞動者」是維基與商周的二手 gloss，非法條
  3. 南韓「勞動者推定制 2026-05-01 上路」**不成立**，六個版本仍卡在國會（韓文 추진 vs 시행 被英文摘要層抹平）
  4. 英國方向寫反：是把雇員併進 worker，不是廢掉 worker；「平台鑽空子」的理由不在所引來源裡
  5. 「英國是唯一長期使用中間身分的國家」有反例：加拿大安大略省 1975 年起，2020 年判過 Foodora 外送騎士
  6. 洪申翰那句是記者敘述被包成加引號直接談話 → 改間接
  7. 「6 年半、跨三屆」歸屬錯置（是促進聯盟不是全國工會）
  8. 蘇柏豪「血淚」引語出處標錯（在 9248266 不在 9247129；句子本身為真）
  9. 林智群那句是第三人稱轉述被包成直接引語；「至少四家媒體」無出處
- **敏感素材處理**：2019 兩名罹難外送員只寫姓氏與制度後果，不渲染過程、不挖家屬；家屬求償查無終局結果 → 誠實留白。**總編室抓到主 session 自己在回修時把「連死亡都只值 542 元」寫成等式（死亡當情緒槓桿），已拆解並補上法條性質但書**
- **誠實留白**：台灣無官方外送員職災死傷統計分類（查職安署／勞動部專區／立法院公聽會逐字稿）；外送員人數三個官方口徑並陳不擇一；店家沉默只寫沉默本身不補動機；查無任何中文論述用「妥協」框架定性本法
- **Cross-link**：台灣斜槓世代（並補其「三讀通過」過期表述）／台灣美食總覽／夜市文化／台灣手搖飲文化／全聯福利中心
- **待觀察者驗證**：交通部兩項子法（官方目標 8 月底）、第 10 條法定最低保險金額至今未公開、第一張裁罰
- **順手修的儀器**：`research-report-health` §8 pointer 只認 reports/ 前綴的假陽性；`paragraph-rhythm` R2 把 markdown 表格算成 prose 段落的假陽性（40 篇回歸測試仍有 10 篇觸發，偵測力未弱化）

### 經濟奇蹟三篇合一 Merge variant — 2026-07-18 完成

- **Article**: [knowledge/Economy/經濟奇蹟.md](../../knowledge/Economy/經濟奇蹟.md)（canonical，保留＋補強）
- **Pipeline**: REWRITE-PIPELINE v9.0 — Merge variant（三篇覆蓋同一段戰後經濟史，無獨立不重疊 scope）
- **併入後刪除**：`History/台灣經濟奇蹟.md` + `History/戰後經濟發展.md`（各 + 5 lang，共 12 檔）
- **Canonical 選定理由**：Step 0.3 判準逐條比較——經濟奇蹟為三篇中唯一場景式敘事（EVOLVE 狀態最高優先判準）+ `lastHumanReview: true`；輸給另兩篇的腳註數與站內連結數已在合併時補強
- **`[MERGE-IN]` 補入**：土地改革三階段（三七五減租/公地放領/耕者有其田）+ 亞洲四小龍國際比較 + 社會變遷段（教育/都市化/女性地位）+ 腳註從 0 補到 9
- **Stage 1 查證修正一處**：原欲引用「1966 聯合國羅馬世界土地改革會議」細節經 WebFetch 逐字核對來源頁面**找不到**，判定為未經獨立驗證的合成摘要，改用可查證版本（1968 林肯土地政策學院共同創辦 + 2000 更名）
- **Stage 4 media**：原文 0 圖，本輪從行政院珍貴史料展示 + Wikimedia Commons 補 4 張（hero + 3 inline，皆官方史料庫 / Public Domain）
- **Stage 5**：Astro redirect 12 條（2 篇 × 6 語言）+ 跨語言 cross-link 修正 20 處（台灣股市與資本市場／金瓜石／台灣歷史書寫史／兩個 Hub／timeline-eras.json 等）+ `npm run build` 全綠驗證
- **Research**: [reports/research/2026-07/經濟奇蹟.md](../../reports/research/2026-07/經濟奇蹟.md)
- **起因**：哲宇原僅點名 2 篇疑似重複，investigate 時另揪出第三篇（`戰後經濟發展.md`），完整 3 篇比對記錄見上方 research report

### 台灣樂器製造業 EVOLVE — 2026-07-17-221115-manual 完成

- **Article**: [knowledge/Music/台灣樂器製造.md](../../knowledge/Music/台灣樂器製造.md)
- **Pipeline**: REWRITE-PIPELINE v9 — EVOLVE（立體群像；傳承與世代＋時代縮影）
- **組織主軸**：世界各地的樂音裡，有多少銅與木曾在台灣人手裡過一遍
- **Hook**：后里 salvage 第一把銅 → 隱形三層（校隊 Jupiter／楠梓四百萬／霧峰音梳）
- **品質**：~5285 CJK／46 腳註／5 圖+1 iframe／tw-stat+timeline+note；rewrite-stage-4 hard=0
- **Research**: [reports/research/2026-07/台灣樂器製造.md](../../reports/research/2026-07/台灣樂器製造.md)
- **大事實修正**：1970s 開廠 falsify；10萬/35% 刪；Jupiter 非后里起家；協櫻 1979；霧峰非日月潭；假書目四本 negative；楠梓吉他主線補上
- **Commit**: `8edb8f967`

### 阿神 EVOLVE — 2026-07-15 2026-07-15-twmd-rewrite-deep 完成（十一年日更、兩次退休宣告與 2026 新片）

- **Article**: [knowledge/People/阿神.md](../../knowledge/People/阿神.md) — 1,494 CJK 薄人物簡介全文重寫為 4,500 CJK 深度人物文。
- **Pipeline**: REWRITE-PIPELINE depth EVOLVE；Stage 0 二十次探索、三路研究 fan-out、二十路 persona、投影編輯室、fresh writer、prose/visual/fact 三席四輪成品總驗。
- **核心主軸**：阿神 2021 年停止十一年日更，2023 年宣告主頻道停片並保留直播與搞神馬；2026 年主頻道與共同節目都有新片。文章把「退休」限定為撤回每日更新的公開承諾，不寫成永久消失或完全排程自由。
- **Falsification**：不揭未證本名／生日；刪除台灣第一、收入、NPC、KAMIKAMI、Vtype 等岔題；校正 Dcard 原話、2012 巴哈換行、2023 公告字樣、鍾明君論文作者與不可讀 Social Blade 來源。
- **品質**：4,500 CJK / 18 footnotes / 4 local WebP + 1 official iframe + 1 `tw-timeline` / Stage 3.5 hard=0 warn=0 / Stage 4 hard=0 warn=0 / prose-health score 3 / research-report-health depth PASS / final fact、prose、visual 三席 PASS。
- **Research**: [reports/research/2026-07/阿神.md](../../reports/research/2026-07/阿神.md)（67 domains / 119 URLs / 1,600+ lines）；另存 projection 與五份 editorial-room 稽核報告。
- **Cross-link**: 台灣 YouTuber 產業與文化、無名小站、尊補反向連結；HowHow 已有阿神連結。

### 醫療法 EVOLVE — 2026-07-13 073739-manual 完成（深度調查三班護病比：從一段擴成護理人力完整 arc）

- **觸發**：哲宇 directive「深度調查三班護病比與台灣醫療制度」→ 站內盤點後選 **EVOLVE 醫療法**（既有《醫療法》已有一段護病比入法），不另開新文
- **Mode**：Evolution 深化。機構主脊（醫師法分家／83% 私立／82 條刑責／急診 Lancet／醫療廣告／偏鄉）不動，只把護病比從一段擴成 4 節護理人力 arc
- **核心矛盾**：法律規定得了一個護理師顧幾床，規定不了有沒有那個護理師（32 萬執照 / 臨床 19 萬）
- **規模**：6900→13900 CJK / 腳註重編 60 條 / 7 個 `tw-*` 視覺化 / 8 圖 + 1 公視影片
- **研究**：4 agent 平行 fan-out、191 distinct 來源、74 一手；falsify 抓到 OR=3.617 出自《護理研究》非 BMC、RN4CAST 是 Lancet 2014、加州全美首州、缺工四口徑分列
- **政治**：三黨表決純中立紀實，全聯會「不淪為政治戰工具」定錨，立體群像 + 核心矛盾為輔不炎上
- **Research**: [reports/research/2026-07/醫療法-三班護病比深化.md](../../reports/research/2026-07/醫療法-三班護病比深化.md)

### 蔡英文 EVOLVE — 2026-07-12 harvest b35f1b3e 完成（從敗選之夜到 817 萬票，安靜走過總統八年）

- **Article**: [knowledge/People/蔡英文.md](../../knowledge/People/蔡英文.md) — 146 行舊式短文全文重寫，修正訪歐國家／場合、早稻田演講、飛彈口徑與博士論文敘事。
- **Pipeline**: REWRITE-PIPELINE — Evolution 模式；P0 政治敏感題，以政策動作＋結果＋多方批評並陳。
- **核心主軸**：2012 年差 797,561 票敗選，到 2020 年以 8,170,231 票創總統直選最高票；安靜的學者型領導與制度治理的完成／未竟。
- **品質**：4,500+ CJK / 23 footnote / 6 images / Stage 3.5 PASS / Stage 3.6 PASS / rewrite-stage-4 hard=0。
- **Research**: [reports/research/2026-06/蔡英文-evolve-20260614.md](../../reports/research/2026-06/蔡英文-evolve-20260614.md)（1,660 行 depth SSOT，research-report-health PASS）。

### 杜潘芳格 NEW — 2026-07-12 26da521c 完成（三種語言，一場平安戲 / 詩人 batch P0 four-axis / 補登 2026-07-16 inbox-audit）

- **Article**: [knowledge/People/杜潘芳格.md](../../knowledge/People/杜潘芳格.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式（commit `6f05295a9`）
- **核心軸線**：跨語一代客家女詩人 × 二二八張七郎家族受難者家屬 × 客語書寫 ×〈平安戲〉社會譴責（four-axis intersection，per 詩人 batch research）
- **品質**：~23.6K chars / 15 footnotes / Stage 3.5 + 3.6 audit 落檔
- **Research**: [reports/research/2026-07/杜潘芳格.md](../../reports/research/2026-07/杜潘芳格.md)（+ stage35 / stage36 audit 檔）
- **補登註記**：ship 當下漏記 DONE-LOG，2026-07-16 inbox-audit session 補登 + 從 INBOX 移除（源 entry：2026-05-23 詩人 batch P0）

### 楊德昌 EVOLVE — 2026-07-05 115223-楊德昌-evolve 完成（哲宇 explicit /twmd-rewrite 楊德昌 — People 電影與戲劇 / 多 agent 全編排 / 成品總驗 worked example）

- **Article**: [knowledge/People/楊德昌.md](../../knowledge/People/楊德昌.md) — 2026-03-19 舊編年體（~2000 CJK / 6 首頁級腳註 / 0 引語 0 媒體 / 父母姓名幻覺 / 《麻將》缺席）全文重寫 → **6,688 prose CJK（含註 ~12,000 字）/ 92 footnote / 本人直引 6+ / 3 張北美館工作照（fair use press kit credit chain）+ 2 支官方 iframe + tw-timeline 七部半年表**
- **Pipeline**: REWRITE-PIPELINE v7.6 — Evolution 非 callout。全編排：Opus 觀點 agent 盲測（35 探索）+ 4 Sonnet persona（20 路）+ 5 Sonnet 研究 fan-out（~263 次，總 ~300）+ fresh Opus writer 寫 staging + 3 adversarial verifier（V1 自 fan-out 5 子查證含 raw wikitext 直讀）
- **核心矛盾**：用工程師最冷的邏輯，拍人心最燙的孤獨；第二樂章＝《一一》十七年缺席（四因疊加因果鏈，不寫成單一浪漫拒絕）；餘韻＝建中連載漫畫 → 昏迷前 email《小朋友》草圖的閉環
- **Hook**：「Herzog, Bresson, Yang」T 恤（吳念真回憶，主 session 親 fetch 陳琬蓉 Medium 逐字救回錯置引註）
- **falsification 戰果**：父母姓名「楊昇華/金雅馨」＝幻覺刪；交大 1970→1969（58 級官網一手）；「帶回一雙眼睛」「不要消費楊德昌」「像在談戀愛」查無一手全不用；**「麻將遭新聞局剪成 90 分鐘」證偽**（TFAI 修復頁 119 分 19 秒，疑似 Variety 影評誤讀）；PTA 影響說查無（順手 heal 台灣電影.md `6c4bccbcd`）
- **Stage 3.6 成品總驗**：23 處修正，4 條「事實真、腳註連錯篇」drift（型 3 worked example），audit 落 research report §9
- **Research**: [reports/research/2026-07/楊德昌.md](../../reports/research/2026-07/楊德昌.md)（673 行＋§9 audit）
- **Cross-link**: 蔡明亮、張艾嘉補反向（`97e35f050`）；侯孝賢延伸閱讀缺 section 兩度 defer；李安/台灣電影/牯嶺街 已有正向連結
- **待哲宇驗證**：lastHumanReview=false；孢子未排（SPORE-INBOX backpressure 中，hook 現成）

### 陳嫺靜 NEW — 2026-06-28 080237-manual 完成（拿金曲新人那年，她已經做音樂第八年 / Fresh / 金曲37 P0 時效）

- **Article**: [knowledge/Music/陳嫺靜.md](../../knowledge/Music/陳嫺靜.md)
- **Pipeline**: REWRITE-PIPELINE v7.5 — NEW 模式（multi-agent：Stage 0 觀點 + 4 個 research agent fan-out 約 88 次搜尋 + fresh Opus writer + 對抗式 verifier 重驗）
- **核心矛盾**：她拿金曲「最佳新人」，但她一點都不新——新的是她走的那條路（政大黑音、臥房自製、把夏宇的詩「回答」進饒舌、靠網路不靠唱片公司）。「聽不懂」的不是她的咬字，是還沒被聽慣的一條路
- **Hook**：金曲37 領獎手機被收走 + 後台「我很像不在這裡」的局外感；首尾呼應〈有人責備我們不夠深入〉這個借自夏宇的歌名
- **品質**：5364 CJK / 43 footnote / 對位句型 3（達標）/ 破折號 14（budget 內）/ 5 支驗證過的官方影片 + tw-timeline 八年落差圖
- **大事實修正**：falsification 抓到「改編自夏宇」是誤傳——實為借標題十字 + 讀不懂而寫歌回應（「寫了，就懂了」）；對抗式 verifier 又修掉一個 PTT 腳註指錯串 + 引號非逐字
- **Research**: [reports/research/2026-06/陳嫺靜.md](../../reports/research/2026-06/陳嫺靜.md)（+ 4 份 raw research file）
- **Cross-link**：台灣嘻哈與饒舌發展 雙向已補
- **待補**：hero 靜態圖（無自由授權照片，已進 ARTICLE-INBOX EVOLVE）

### 台灣聲景 NEW — 2026-06-26 181414-manual 完成（垃圾車的古典樂、捷運的鳥鳴 / Issue #574 nistoreyo 素材共創首例 / 補登 2026-07-16 inbox-audit）

- **Article**: [knowledge/Culture/台灣聲景.md](../../knowledge/Culture/台灣聲景.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式，領域專家素材共創 onboarding mode 首例（commit `d80c9347e`）
- **核心矛盾**：同一年，北捷一邊找雷光夏、李欣芸把進站音樂變成藝術，一邊把關門警示音留在噪音區——一座只聽見卻很少聆聽的島
- **品質**：~28K chars / 24 footnotes
- **Research**: [reports/research/2026-06/台灣聲景.md](../../reports/research/2026-06/台灣聲景.md)
- **共創驗證**：投稿者 nistoreyo（政大聲景研究碩士）走完素材共創流程後回饋「最有共同創作感的一次 AI 協作」— 完整歸檔 [reports/domain-expert-cocreation-574-2026-06-30.md](../../reports/domain-expert-cocreation-574-2026-06-30.md)
- **補登註記**：ship 當下漏記 DONE-LOG，2026-07-16 inbox-audit session 補登 + 從 INBOX 移除（源 entry 原 status blocked 等素材，2026-06 素材到位後 ship）

### 笠詩社 60 年 NEW — 2026-06-20 twmd-rewrite-daily routine 完成（一群被迫忘掉日文的人，撐起台灣最長壽的中文詩刊 / 詩人 batch P0 movement-level / 補登 2026-07-16 inbox-audit）

- **Article**: [knowledge/Art/笠詩社.md](../../knowledge/Art/笠詩社.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式（commit `9b7fd2c8c`）
- **Hook**：1958 年一個 36 歲的台籍日本兵用筆名「桓夫」發表戰後第一首中文詩——跨越語言的一代 × 1964 創社至今最長壽詩刊
- **品質**：~42K chars / 62 footnotes
- **Research**: [reports/research/2026-06/笠詩社.md](../../reports/research/2026-06/笠詩社.md)
- **補登註記**：ship 當下漏記 DONE-LOG（INBOX entry 曾標 prose ship 2026-06-20 但未歸檔），2026-07-16 inbox-audit session 補登 + 從 INBOX 移除（源 entry：2026-05-23 詩人 batch P0）

### 台灣體育發展與奧運 NEW — 2026-06-19 twmd-rewrite-daily routine 完成（一個叫「中華台北」的隊伍 / Fresh / Issue #915）

- **Article**: [knowledge/Society/台灣體育發展與奧運.md](../../knowledge/Society/台灣體育發展與奧運.md)
- **Pipeline**: REWRITE-PIPELINE v7.6 — Fresh NEW（核心矛盾「2300 萬人的小島用一個沒有國名的代號站上奧運卻打出歷史最佳成績」，五場景式 H2：進不去的「台灣」/ 為一首歌重填詞 / 16 年長夜與 15 分鐘雙金 / 升的不是國旗 / 棒球與「中華台北」的縫隙）
- **Research SSOT**: reports/research/2026-06/台灣體育與奧運.md（Stage 0 探索 12 query + Stage 1 fan-out 52 query / 51 distinct sources / 5 EN / 10 一手 / `research-report-health.py` PASS）
- **規格**: 4860 CJK / 55 footnote / 4 圖（楊傳廣 1960 hero + 中華台北會旗 + 會徽 + 楊傳廣 inline）/ rewrite-stage-3-5 + rewrite-stage-4 hard=0 warn=0
- **Falsification 收穫（10 處）**: 楊傳廣 8334 分（不是 8392）/ 蔡溫義 抓 125kg（不是 132.5）/ 嘉農決賽 0:4（不是 2:5）/ 楊勇緯 2024 巴黎 NO MEDAL（8 強止步）/ 李孟遠定向飛靶（不是 10m 空氣手槍）/ 陳念琴 拳擊 66kg（不是 75kg）/ 國訓中心 1976/11 正式成立（1975 是籌備）/ 體育署 2013 降編（不是升格）/ 紅葉少棒對手是關西明星隊不是和歌山世界冠軍 + 13 人 5 虛報 9 冒名 / CPBL 首場兄弟 3:4 統一（不是兄弟贏）
- **High-value 新發現**: 楊傳廣銀牌 2025/4 文化部指定首件體育類國寶 / 張星賢 1932+1936 日本代表團（首位參加奧運的台灣人 / 比劉長春更早報到）/ 麟洋配 = 奧運史首對同組合男雙連霸 / NHK 2020 東京「台湾です」+ 排タ群首次把 Taiwan 排在 China 前面 / France 2 2024 巴黎「中華台北，就是我們所熟知的台灣」
- **multi-agent**: 1 主 session Stage 0 觀點 + 2 Sonnet research fan-out（27 + 25 query）+ 1 fresh Opus writer（staging → 主 session Stage 2.5 覆蓋 canonical）
- **政治處置**: §自主權邊界 — 「中華台北」框架描述為結構性事實（妥協史），不評統獨；林郁婷拳擊金不寫「跨性別」framing；2018 東奧正名公投僅敘事不評論
- **Spore**: blueprint #154/#155 落檔（broadcast deferred — Chrome MCP image upload structural blocker 連續第 4 次 cycle，next maintainer/manual session ship）
- **待續**: Stage 3.6 fan-out 被 cron budget 跳過（主 session falsification 已抓 10 處）/ image-health 媒體量 advisory（4 < 5，target 6 per length-scaled）/ 翻譯巴別塔（babel-nightly 00:30 auto）/ Issue #915 close 留 maintainer gate / lastHumanReview false
- **commit**: `6aa840307` (article) + `b6469dd35` (spore blueprint)
- **Session memory**: [memory/2026-06-19-190938-twmd-rewrite-daily.md](memory/2026-06-19-190938-twmd-rewrite-daily.md)

### 羅大佑 EVOLVE — 2026-06-19 manual /loop iteration #2（3/19 早批 attribution audit batch 第 4 篇 / 短 bio 1789→~5100 CJK depth / 「漂泊者唱失根」策展）

- **Article**: [knowledge/People/羅大佑.md](../../knowledge/People/羅大佑.md)
- **Pipeline**: REWRITE-PIPELINE v7.6 — EVOLVE（短 bio stub → 非編年體 depth；核心矛盾「他唱盡台灣失根與『我是誰』，自己卻是那道題最徹底的漂泊者」，A 放射科診斷視角開篇 → B 台北/紐約/香港/北京 29 年搬 19 次 → C 70 歲倖存者）
- **Research SSOT**: reports/research/2026-06/羅大佑.md（Stage 0 + Stage 1 depth gate 全過 / 81 搜尋 / 45 distinct 來源 / 9 en 含 Cambridge China Quarterly peer-reviewed）
- **規格**: ~5100 CJK / 30 footnote / 8 場景式 H2 / 1 tw-timeline 漂泊地圖 / 4 媒體（3 CC 圖：2011 hero + 2021 金曲 + 縱貫線；1 滾石官方〈鹿港小鎮〉iframe oEmbed 驗）/ rewrite-stage-3-5 + rewrite-stage-4 hard=0 warn=0 / prose-health 2
- **attribution audit 收穫**：鄉愁四韻 詞=余光中 / 滄海一聲笑=黃霑（羅只唱非作者）/ 皇后大道東·似是故人來 詞=林夕 / 明天會更好 曲羅+7 人詞 / 滾滾紅塵 三毛=編劇 / 童年·光陰的故事 1981 張艾嘉首發（非 1982）/ 你的樣子 1988《愛人同志》（非 1984《家》）/ 棄醫「練唱」非「練吉他」
- **multi-agent**: 2 persona + viewpoint Opus（24 探索）+ 2 research Sonnet（57 搜尋）+ fresh Opus writer（staging）+ media iframe agent（**oEmbed 主 session 驗：5 候選 3 個 Lo Ta-yu-Topic 假頻道剔除，只留 2 滾石官方**）
- **政治**: 2025 林夕罷免之爭 omit（§自主權邊界 + 舊 bio whats_excluded 非政治 framing）
- **待續**: 翻譯巴別塔 / Stage 5 reverse cross-link（台灣流行音樂 ↔ 羅大佑）/ Stage 3.6 fan-out 被 /loop 重 fire 中斷（attribution 已於 Stage 1 adversarial 深驗 + 主 session 自查關鍵 atom）/ lastHumanReview false

### 🗂️ Distill 回填 batch — 2026-06-19 inbox distill（4 篇 ship 當下漏記 DONE-LOG，補登 + 從 INBOX 移除）

> 出貨當下沒 append 本檔的幽靈條目（status=done 卻留在 ARTICLE-INBOX），2026-06-19 inbox distill 一併補登 + 從 INBOX 移除。文章早已存在 `knowledge/`，本 batch 補的是可追溯性（避免未來 session 重複開發）。session `2026-06-19-123909-inbox-distill`。

- **大象體操**（Music）— [knowledge/Music/大象體操.md](../../knowledge/Music/大象體操.md)｜2026-06-18 `twmd-rewrite-daily` NEW ship `72b757bac`｜5604 CJK / 56 footnote / 11 場景式 H2 / 7 媒體｜「沒人在唱卻聽得到歌的台灣三人組」（math rock）
- **Howhow（陳孜昊）**（People）— [knowledge/People/Howhow.md](../../knowledge/People/Howhow.md)｜2026-06-05 loop `/twmd-rewrite` EVOLVE（PR #1058 base）｜「一人團隊」的標籤 vs 他其實一直想要團隊
- **尊（朱玉恩）**（People）— [knowledge/People/尊.md](../../knowledge/People/尊.md)｜2026-06-02 `twmd-rewrite-daily` EVOLVE（PR #834 base）｜高曝光 + 文章太短 SC signal，補 2025/11 新家節點 30 歲分水嶺 layer
- **魚條**（People／後硬核樂團）— [knowledge/People/魚條.md](../../knowledge/People/魚條.md)｜2026-04-27 ship｜「名字像路邊小吃、聲音是要打人的後硬核」（中正高中三人組 / 2019《治本》）

### 國定假日 NEW — 2026-06-19 103421-manual 完成（用「不用上班」寫成的台灣史 / Fresh 制度＋政治史深度文）

- **Article**: [knowledge/Society/國定假日.md](../../knowledge/Society/國定假日.md)
- **Pipeline**: REWRITE-PIPELINE v7.0 Fresh 全編排 — 觀點 Opus ＋ 20 persona → 5 research Sonnet fan-out（~116 搜尋）→ fresh Opus writer → 2 adversarial verifier
- **核心矛盾**：放假日曆＝用紅字寫成的國族認同鬥爭史 × 勞動休息權雙軸（counterweight 防過度政治化 ＋ de-exoticize 各國都打曆法戰）
- **Hook**：「中華民國第一個法定國定假日，不是雙十、不是元旦，是 1997 年的二二八」反直覺開場；90 年平行（1930 恥政紀念日 ↔ 2025 光復爭議）
- **品質**：5863 CJK / 45 footnote / 6 圖（受降 PD／中山堂／二二八碑／立法院／勞動節遊行／阿美族祭儀）/ 4 tw-\* viz（stat/timeline/versus/bars）/ rewrite-stage-4 hard=0 warn=0
- **Research**: [reports/research/2026-06/國定假日.md](../../reports/research/2026-06/國定假日.md)（Stage 0 ＋ depth gate 全過 / 79 源 / 7 en / 23 一手 / 472 行）
- **verifier 收穫**：4 處 quote 截斷/壓縮被 adversarial verifier 抓修（朱立倫/馬英九截斷、陳玉珍記者標題誤當原話、徐國勇壓縮）＋ 1946-2000「54 年」算術錯（→ 半世紀）＋ 11.9 億不可驗證棄用 ＋ 香港法定假 12→14 更正 ＋ 蔡英文「不砍假」歸給勞團
- **政治中立**：光復／終戰／接管三史觀策展式並陳（陳儀深/陳水扁/徐國勇/朱立倫/馬英九/梁文傑 quote ALL sides），§自主權邊界內不選邊
- **待續**：babel-nightly 自動接 5 語（政治敏感注意 cloud refusal cascade）/ MEMORY.md index ＋ LESSONS distill 待 tree 乾淨（平行 session 102712 持有 MEMORY.md/DIARY.md dirty）/ spore 候選

### 台灣流行音樂 EVOLVE — 2026-06-19 manual /loop iteration #1（哲宇 P0 batch 非政治篇 / chronicle stub → 自由籌碼策展通史 / multi-agent orchestration v6.3 全跑）

- **Article**: [knowledge/Music/台灣流行音樂.md](../../knowledge/Music/台灣流行音樂.md)
- **Pipeline**: REWRITE-PIPELINE v7.6 — EVOLVE 模式（Evolution，舊文 chronicle stub 15007 bytes 年代式小標題 + LIST-DUMP + 斷號腳註 → 非編年體三幕脊椎）
- **核心矛盾**：輸掉市場的島，靠「能唱別人不能唱的」留下最後的籌碼（C 製作中心/最小市場 → A 自由終局 → B 誰的聲音算數全程低音）
- **Hook**：〈龍的傳人〉換過三個主人（1978 為斷交而寫 → 1983 侯德健赴陸遭台禁 → 今被中國當血緣民族主義符號）首尾呼應
- **品質**：5943 CJK / 58 footnote / 8 場景式 H2 / 5 tw-\* viz / 7 媒體（3 CC/PD 圖 + 4 官方 iframe）/ rewrite-stage-3-5 + rewrite-stage-4 hard=0 warn=0 / prose-health score 3 / chronicle-lead 0
- **Research**: [reports/research/2026-06/台灣流行音樂.md](../../reports/research/2026-06/台灣流行音樂.md)（Stage 0 gate + Stage 1 depth gate 全過 / 122 搜尋 / 51 distinct 來源 / 5 en / 6 一手 / §9 audit）
- **falsification 收穫**：王菲 framing 證偽（香港養成非台灣）/ 女歌手「崛起」偽命題（鄧麗君 1967、鳳飛飛 1971 已天后）/ 李竺芯「台語首度」非「母語首度」（原民語 2017/2020 先例）/ Stage 3.6 抓林強〈向前走〉第 2 屆→**第 3 屆 1992** 更正（SSOT 同錯）/ 東風破青花瓷不在首張 / 可樂瓶未砸破 / TAICCA 288 億口徑陷阱
- **multi-agent**：4 persona Sonnet + 1 viewpoint Opus + 4 research Sonnet fan-out + 1 fresh Opus writer（staging）+ 1 Sonnet Stage 3.6 adversarial verifier
- **待續**：翻譯走巴別塔（babel-nightly 自動偵測 body-hash drift 重譯）/ Stage 5 reverse cross-link 5 siblings 待補 / lastHumanReview false

### justfont 與台灣字體發展 EVOLVE — 2026-06-12 flywheel-evolution session 完成（用一種台灣茶的名字，把做字的人帶到陽光下）

- **Article**: [knowledge/Technology/justfont與台灣字體發展.md](../../knowledge/Technology/justfont與台灣字體發展.md)
- **Pipeline**: REWRITE-PIPELINE v7.0 callout-triggered EVOLVE 全跑 — Teardown Firewall（觀點 blind / fresh writer / 3.2-bis 零校正焦慮）+ Step 3.6 成品總驗三關（2 adversarial verifier，25 處綁定修復、零杜撰）
- **觸發**：justfont 共同創辦人蘇煒翔 21 條逐段勘誤（issue #1145 公開紀錄），21 條全採信
- **核心矛盾**：全民天天讀它的字，市場卻曾小到養不活任何一家造字公司
- **規格**：7,052 字 / 65 腳註 / 7 圖 + 2 iframe + 2 tw-\* 模組 / 標題哲宇親選
- **Research**: [reports/research/2026-06/justfont與台灣字體發展.md](../../reports/research/2026-06/justfont與台灣字體發展.md) — 四線 120+ 搜尋 + 故事線 59 操作 + 媒體二輪，research-report-health depth PASS

### 蘇打綠 EVOLVE — 2026-06-09 routine twmd-rewrite-daily（3/19 早批 audit batch 第 3 篇「樂團成員↔樂團」高風險維度 worked example / multi-agent orchestration v6.3 全跑 / 9 條 INBOX hypothesis 幻覺 falsified）

- **Article**: [knowledge/Music/蘇打綠.md](../../knowledge/Music/蘇打綠.md) — EVOLVE 2,400 → 12,797 CJK / 51 footnote / 9 場景式 H2 / 4 inline 圖 (Wikimedia CC BY-SA Solomon203: 六人 cropped hero + 2008 The Wall + 2014 巡迴 ×2) + 4 official YouTube iframe（〈小情歌〉/〈無與倫比的美麗〉/〈狂熱〉Live in The Pool 2009 倫敦錄音紀實 / 2017-01-01 自由廣場最後安可）
- **Research SSOT**: [reports/research/2026-06/蘇打綠.md](../../reports/research/2026-06/蘇打綠.md) — 4 parallel research agents（§A 政大草創 / §B 韋瓦第四部曲 / §C 訴訟魚丁糸 / §D 國際巡演+媒體）aggregate 86 query / 12 primary sources / 18 Ctrl-F ✓ verbatim / research-report-health depth tier hard=0 PASS
- **Pipeline gates**: rewrite-stage-3-5 hard=0 PASS / rewrite-stage-4 hard=0 PASS / 對位句型 = 3（≤ 3 threshold）/ 破折號 = 71 / 12.8k 字 = 8.3/1500 字（≤ 15）
- **核心 falsification（9 條 INBOX hypothesis 全錯）**:
  1. 1999 成軍 → 正確 **2001-04**
  2. 「政大社團 / 廣電」 → **報名第 18 屆政大金旋獎組起來**（吳青峰中文 / 馨儀企管 / 小威社會 / 新哥吉他），2003-03 三人加入確立 6 人
  3. 原始 6 人 line-up → **創團 4 人**，中間吉他手換 3 次（彥廷/小為/宏儒）
  4. 「綠」是高中歌詞 → **青峰最愛的顏色 + 史俊威提「蘇打」**
  5. 「四季三部曲」 → **四部曲 / 4 張專輯**（春 2009 / 夏 2009 / 秋 2013 / 冬 2015）
  6. 《冬未了》2014 → **2015-11-04**
  7. 《太空人》2018 → **2019-09-06**
  8. 2007 馬來西亞首場海外 → **新加坡共和理工學院 2007-08-11**
  9. 2009 北京工人體育場 → **工人體育館**（13K 室內，差 5 倍量級）
  10. 2017 倫敦 Royal Albert Hall「亞洲樂團首組」→ **完全 fabricated**，蘇打綠從未在 RAH 演出（2017 已休團）
  11. 2017《十年一刻》巡演 → 「十年一刻」是 2014 出道 10 週年演唱會；2017 最後場是「**樂計畫**」與 NSO 合作
- **既有 article verbatim 修正**: 「我一直把他當父親」→「**我曾經視為父親的人**」（自由時報 3484046）/「我沒有一絲愧歉」→ 4000 字聲明開頭 verbatim「**我於理、於情都毫無虧欠**」（CTWANT 116751）
- **Cross-link**: 台灣獨立音樂.md 補 reverse cross-link / 其他 4 篇 siblings（台灣音樂祭文化 / 五月天 / 流行音樂與金曲獎 / 張懸與安溥）DEFER 等獨立 EVOLVE（Step 5.3 sibling 格式預檢 warn level）
- **核心矛盾**: 政大金旋獎組起來的四個人，唱完韋瓦第四部曲、走完三千萬製作，二十年後才回頭奪回自己的名字
- **Title**: 「蘇打綠：他們花了二十年才知道，自己的名字也要打官司」（既有 stub「主權奪還戰」抽象套話 → 具體場景 + 留白 + 報導者腔）
- **Commit**: `73443b2a4`
- **時間 cost**: routine twmd-rewrite-daily ~120 min wall-clock（BECOME ~5 + Stage 0-1 research orchestration ~25 + 4 agents parallel ~10 / Stage 2 fresh Opus writer ~17 + Stage 3-5 gates + media fetch ~25 + commit + push ~10 + cleanup）— SPORE chain DEFER 至次日 10:00 twmd-spore-publish-daily routine（per boundary rule）

### 用數據看台灣 22 縣市 NEW — 2026-06-06 manual（哲宇 directive「寫一篇真實的文章驗證視覺化系統 / twmd-rewrite 從 inbox 挑」— Geography 純數據 panorama / Fresh / viz 系統 v1.0 真實驗證文）

- **Article**: [knowledge/Geography/用數據看台灣22縣市.md](../../knowledge/Geography/用數據看台灣22縣市.md) — NEW Fresh，純數據新聞 panorama → **4,638 CJK / 5 footnote / 6 場景式 H2 / 3 圖（NASA 衛星 hero + 台北天際線 + 池上伯朗大道）+ 8 個 tw-\* 視覺模組**
- **同時是視覺化系統 v1.0 的真實 data-heavy 驗證文**：tw-heatmap（22 縣市 × 高齡化率/老化指數 = 44 格旗艦熱力矩陣）/ tw-line（全國 65+ 占比 2000→2025 加速攀升 + 自動資料表 fallback）/ tw-waffle（六都 vs 16 縣市人口分布 100 格）/ tw-bars（密度 ranking）/ tw-figure / tw-stat / tw-versus（新竹 vs 嘉義）/ tw-timeline（WHO 三級老化里程碑）全用真實資料
- **論點**：台灣不是均質的台灣 — 密度差 151 倍（臺北 8,975 vs 臺東 59）/ 規模差 297 倍（新北 404 萬 vs 連江 1.36 萬）/ 高齡化差近一個世代（新竹縣 15.08% vs 嘉義縣 24.11%）；七成人擠三成土地；老化前緣在東部/離島/農業縣不在都市；全 22 縣市無一例外生不如死
- **Stage 0 falsification**：原 inbox 挑 TASA（P0），baseline audit 發現既有《國家太空中心》14k CJK 深文 → 改判 EVOLVE 不重做；改選無 panorama 的 22 縣市數據總覽（22 個體文已全 ship，缺總覽）
- **資料嚴謹度**：單一官方時點 spine（內政部戶政司 114 年底 2025-12-31），22 縣市人口加總 23,299,132 = 官方總計列完全吻合；六都 69.87%/30.12% Python 驗算；超高齡 20.06% 中央社/經濟日報跨源確認；國發會中推估 2070 點獨立查證
- **Pipeline**: REWRITE v6.8（含新 Step 2.0 視覺化思考）— Fresh，1 Sonnet research agent compile 驗證資料集 + 主 session REFLEXES #31 重驗 + 預建 chart blocks（驗證數字）交 fresh Opus writer 寫 prose
- **品質**：rewrite-stage-4 hard=0（viz-health **HARD** PASS + cjk-punct + word-count 103%）/ prose-health score 1（writer 對位 14 → 主 session 修到 2）/ 8 模組 curl 渲染 PASS（44 熱力格 + 100 方格 + 0 leftover raw）/ 44 熱力格色階正確
- **Research**: [reports/research/2026-06/22-counties-data.md](../../reports/research/2026-06/22-counties-data.md)（22 縣市驗證資料集 + falsification 待驗區）
- **Cross-link**: 延伸閱讀 → 臺北市（最擠最老）/ 臺東縣（最空）/ 嘉義縣（最老）/ 新竹縣（最年輕）/ 台灣少子化危機（出生端）
- **待哲宇驗證**：lastHumanReview=false；rewrite-stage-4 全綠 hard=0 warn=0（paragraph-rhythm discount cap 5→13 後，資訊圖表型 panorama 的 8 模組全折抵，只算 3 圖 = 0.65/1k PASS）
- **Ship**: `b8a3f5b09`（+ paragraph-rhythm cap fix `見下方 commit`）

### 國宅與居住正義 NEW — 2026-06-06 manual（哲宇 /twmd-become + /twmd-rewrite「國宅與居住正義 完整做完 / 媒體 10+ / 不問一路推」— Society 政策斷層 / Fresh / 多 agent 編排 v6.3 全跑 / 政治高敏感）

- **Article**: [knowledge/Society/國宅與居住正義.md](../../knowledge/Society/國宅與居住正義.md) — NEW Fresh（與既有姊妹篇《社會住宅與居住正義》劃界：本篇寫 1975-2015 國宅「供售」路線生命史，社宅只帶過）→ **7,711 CJK / 27 footnote / 9 場景式 H2 / 8 CC 圖 + 2 官方影片 iframe = 10 媒體**
- **核心矛盾**：國宅本是「政府蓋便宜房幫人民買得起」的居住正義工具，卻從沒裝增值回收閘門（2002 拆掉僅有的買家資格閉環），公共補貼變早買者私人資本利得；2026 桃園可負擔住宅刻意把閘門裝回去 = 替國宅認錯，內政部主張只租不售 → 買 vs 租兩路線之爭
- **Hook**：成功國宅 1985 一坪 6.7 萬滯銷、老里長湊 40 萬頭期款 → 同門牌 2026 逼近百萬 / 收尾「成功國宅的下一個門牌價，會替我們記下答案」
- **Pipeline**: REWRITE-PIPELINE v6.7 — Fresh 模式，多 agent 編排：Stage 0 觀點成型（主 session）+ 4 Sonnet research fan-out falsification-first（§A 法制 / §B 資產化 / §C 當代 / §D 世代國際，aggregate 117 搜尋）+ fresh Opus writer 只吃 fact-pack + 主 session 一手 spot-check
- **falsification 校正**：2002（非1982）拆買家資格閉環 / 原價收回（§21）≠防炒作閘門而是強制收回補償公式 / 三大國宅=眷村改建非中低收安置 / 39萬戶(廣義)≠174,891戶(直接興建) / 賴清德「一戶沒蓋」政治誇大並陳
- **Stage 3 抓 2 個 writer 幻覺**：(1) 巷仔口杜撰引語「原本應作為社會福利…」→ WebFetch 證偽 → 改真逐字「都以販售為主」+「累積財富的工具」(2) Brookings 誤植租金 2.45% 來源 → 改主計處/cnyes
- **品質**：rewrite-stage-4 hard=0 / rewrite-stage-3-5 hard=0 warn=0 / prose-health score 4→1 / 破折號 27→2 / 對位清乾淨 / research-report-health PASS（102 URL / 7 英文 / 26 一手）/ build PASS / word-count 171%
- **媒體**：8 CC 圖（hero 台北天際線 + 士林公寓 + 香港居屋/英國 council/新加坡 HDB/維也納 Karl-Marx-Hof 國際對照 + 明倫社宅 + 桃園青埔）+ 2 官方 iframe（華視 716 居住正義遊行 / 天下社宅政策大轉彎，oembed-title 驗證官方）。台北老國宅無 Commons CC 圖 → 邊界記錄，stat block 承擔該段視覺
- **Research**: [reports/research/2026-06/國宅與居住正義.md](../../reports/research/2026-06/國宅與居住正義.md)（SSOT 八段 + 4 agent raw append）+ [國宅-media-manifest.md](../../reports/research/2026-06/國宅-media-manifest.md)
- **Cross-link**: 延伸閱讀 → 社會住宅與居住正義（姊妹篇）/ 少子化 / 鐵皮屋 / 環境正義；reverse cross-link 補進《社會住宅與居住正義》（pre-existing 30秒概覽 warn 故未動其他內容）
- **政治敏感處理**：央地（張善政 vs 內政部董建宏）/ 買租兩路線 / 賴清德社宅數字 三源並陳不選邊，未替 Taiwan.md 對住宅政治表態（per §自主權邊界）
- **待哲宇驗證**：lastHumanReview=false；視覺密度 1.37/1k（>1.2 ceiling WARN-only，honoring 哲宇 10+ media directive）
- **Ship**: `b19194bea`（research checkpoint `d828925f6`）

### 李安 EVOLVE — 2026-06-01 manual（哲宇 explicit /twmd-rewrite「深度研究李安」+ 中途 directive「補很多影片跟多媒體素材／sub-agent 強制讀 EDITORIAL」— People 電影與戲劇 / 多 agent 編排 v6.3 全跑）

- **Article**: [knowledge/People/李安.md](../../knowledge/People/李安.md) — 舊編年體 filmography（~16.5KB / 5 footnote / 0 圖 / 0 媒體）全文重寫 → **7,164 CJK / 50 footnote / 11 直引語 / 3 圖（hero+2 inline CC）/ 7 官方影片 iframe / 10 場景式 H2**
- **Pipeline**: REWRITE-PIPELINE v6.3 — EVOLVE 模式（非 callout-triggered）。多 agent 編排：觀點 Opus orchestrator blind to 舊編年體框架 / 6 個 Sonnet research fan-out falsification-first / fresh Opus writer 只吃 fact-pack（強制讀 EDITORIAL gate）/ 主 session 一手 spot-check 引語 + oembed 驗 7 iframe 官方性
- **核心矛盾**：世人記得的是兩座奧斯卡的台灣之光，但他拍了一輩子的，是壓抑、恐懼，和那個沒能對父親好好說再見的兒子
- **Hook**：2006 奧斯卡台上用國語說「謝謝大家的關心」/ 六年在家煮飯的失業女婿 / 父親臨終「戴著鋼盔往前衝」/「當我感覺很安全的時候，反而是最不安」
- **品質**：rewrite-stage-4 hard=0 / rewrite-stage-3-5（footnote+correction-meta）hard=0 warn=0 / prose-health score 2（≤3）/ 破折號 44→3 / 對位 2（皆合法 reverse-explanation）/ word-count 159%
- **falsification 修正**：恩師 Mackendrick@NYU=錯（CalArts，真實人脈是同學 Spike Lee）/《追打》是 1980 一年級作非 1984 / 推手亞太影展最佳影片非最佳導演 / 優良劇本獎只釘死推手首獎 40 萬 / 金馬主席 2018-2022 非 2018-2020 / 母親姓名分歧故略 / 補上舊文漏掉的《綠巨人浩克》與《色，戒》正文
- **媒體**：7 oembed-verified 官方 iframe（推手 Film Movement / 理性與感性 Sony / 臥虎藏龍 SPC / 色戒 Focus / 少年Pi 20th Century / 比利林恩 Sony / 雙子殺手 Paramount）+ 3 CC 圖（BAFTA 2013 hero / HKAFF 2007 / Cannes 2013）。斷背山/囍宴/飲食男女/浩克查無官方影片故不嵌
- **Research**: [reports/research/2026-06/李安.md](../../reports/research/2026-06/李安.md)
- **Cross-link**: 延伸閱讀 → 台灣電影 / 侯孝賢 / 楊德昌 / 蔡明亮；reverse cross-link 補進楊德昌（侯孝賢 pre-existing format warn 故 defer）
- **政治敏感處理**：2018 金馬傅榆事件中性記錄事件本身 + 李安維護電影獨立於政治的 verbatim，未替 Taiwan.md 對兩岸主權表態（per §自主權邊界）
- **待哲宇驗證**：lastHumanReview=false；2006 奧斯卡感言敘事略作壓縮（quit-you 開場 + 謝謝大家的關心結尾，皆 verbatim 屬實）

### 瘂弦 NEW — 2026-05-28 twmd-rewrite-daily（戰後第一代詩人 / 2024-10 辭世趁熱 / 一冊不再傳奇 / 「36 歲封筆後在《聯副》21 年用編輯台繼續寫詩」）

- **Article**: [knowledge/People/瘂弦.md](../../knowledge/People/瘂弦.md) — ~25.9 KB / 18 footnote / 8 H2
- **Pipeline**: REWRITE-PIPELINE — NEW Fresh 模式（twmd-rewrite-daily 18:00 routine 自動 ship）
- **Hook**：1968 年瘂弦 36 歲把九十首詩編成《深淵》之後就停筆。1977-1998 主編《聯合報》副刊 21 年把編輯台變成台灣戰後最重要的文學公共空間。2024-10-11 加拿大溫哥華辭世享耆壽 92 歲——封筆 56 年的沉默比千冊詩集更長。
- **Research**: [reports/research/2026-05/taiwan-poets-2-postwar-modernism.md](../../reports/research/2026-05/taiwan-poets-2-postwar-modernism.md) §瘂弦 brief（broad-theme 共用 research 報告）
- **Commit**: `e70936dd9` 2026-05-28 18:23:18
- **歸檔修補補登**：2026-06-01 twmd-rewrite-daily catchup cycle 發現本 entry 在 INBOX 殘留 P0 NEW pending（routine 5/28 ship 後沒搬 DONE-LOG），補登歸位。INBOX 對應 pending entry 同 commit 移除。

### 鄭愁予 NEW — 2026-05-24 twmd-rewrite-daily（戰後第一代詩人 / 2025-06 辭世趁熱 / 「達達的馬蹄是反戰詩」晚年澄清 / 4773 CJK / 12 footnote）

- **Article**: [knowledge/People/鄭愁予.md](../../knowledge/People/鄭愁予.md) — ~23.6 KB / 4773 字 / 12 footnote / 13 H2 / hero zheng-chouyu-portrait-2017.jpg Wikimedia CC BY-SA 4.0（目宿媒體股份有限公司）
- **Pipeline**: REWRITE-PIPELINE — NEW Fresh 模式（**twmd-rewrite-daily v6.1 full-cycle 首例** — article + spore 同 routine cycle 連跑）
- **Hook**：1955 年 22 歲鄭愁予在《夢土上》寫下「我達達的馬蹄是美麗的錯誤」台灣讀者把它當情詩讀了七十年。晚年澄清這是反戰詩寫的是抗戰時期母親在內地等不到父親回家的場景。2005 年從耶魯退休回台把戶籍遷進金門縣鄭家族人戶內。2025-06-13 凌晨四點四十四分美國心臟衰竭辭世享壽 91 歲。
- **Research**: [reports/research/2026-05/taiwan-poets-2-postwar-modernism.md](../../reports/research/2026-05/taiwan-poets-2-postwar-modernism.md) §鄭愁予 brief（broad-theme 共用 research 報告）
- **Spore #86**: Threads ship 2026-05-24 18:49:37 [DYt_TMpE2WV](https://www.threads.com/@taiwandotmd/post/DYt_TMpE2WV)（v6.1 article→spore→broadcast 整合首次完成）
- **Commit**: rewrite `7d0b06c4e` 2026-05-24 18:23:03 + spore `68b99fe95` 18:49:37
- **歸檔修補補登**：2026-06-01 twmd-rewrite-daily catchup cycle 發現本 entry 在 INBOX 殘留 P0 NEW pending（routine 5/24 ship 後沒搬 DONE-LOG），補登歸位。INBOX 對應 pending entry 同 commit 移除。

### 尹衍樑 NEW — 2026-05-26 manual（辭世當日紀念文 + sovereignty 透鏡 / Stage 0 觀點成型 + Stage 1 sub-agent 41 searches research + Stage 2 寫 4606 CJK / 40 footnote / 3 圖 / 7 H2，核心矛盾「一個剛走的台灣商人，留給世界一座比諾貝爾還貴的獎」）

- **Article**: [knowledge/People/尹衍樑.md](../../knowledge/People/尹衍樑.md) — 4606 CJK chars (102% 4500) / 40 footnote / 7 H2 / 1 hero + 2 inline（hero yin-1st-tang-prize-laureates-2014 CC BY 2.0 中華民國總統府 Wikimedia + 2 inline yin-yan-liang-tang-prize-reception + yin-public-housing-2015-hires 台北市政府開放資訊 Wikimedia）
- **Research**: [reports/research/2026-05/尹衍樑.md](../../reports/research/2026-05/尹衍樑.md) — 421 行 / general-purpose agent 41 searches（中文 26 / 英文 2 / WebFetch 13）/ 45 條事實素材庫 / 15 句中文 verbatim 引語 / 媒體授權矩陣 ✅
- **Plot twist**: Stage 1 取材揭露尹衍樑 2026-05-26 04:21 北榮辭世（10+ 獨立來源驗證）→ article 性質從 Stage 0「在世人物深度文」pivot 為「辭世紀念文 + sovereignty 透鏡」。Stage 0 多項假設被推翻：「三度被起訴」frame 事實基底錯（實際是 2012 緩起訴 / 2014 他是檢舉人 / 2016 證人）/ 政大企管系錯（實際文化大學史學系 → 1982 台大商研所 → 1986 政大博士）/ 台大尹衍樑運動中心不存在（實際 2007 土木研究大樓 + 2018 地震工程中心）/ 北大光華 1989 起非 1995 / 接班是家族繼承非徒弟制
- **保留 Stage 0 anchor**：2014 唐獎生技 Allison+Honjo → 2018 諾貝爾醫獎 4 年驗證 ✅ 完全成立（同樣 pattern 2016 CRISPR Charpentier+Doudna → 2020 諾化 / 2022 mRNA Weissman → 2023 諾醫，連續三屆唐獎生技預測諾貝爾）
- **政治敏感事實 handling per §自主權邊界**：2013「統一是必然」表態列為事實不下判斷 / 2012 國安密帳緩起訴列為事實不評論 / 兩岸雙下注 framing 多視角並陳
- **Sovereignty preservation angle**：唐獎獎金 5,000 萬 NTD > 諾貝爾 2024 3,266 萬 NTD（高 1.53x）/ 女性得主比例 28% > 諾貝爾 6% / 國際媒體 Nature + Science + Times Higher Education「Asian Nobels」framing — 一個小島用 30 億新台幣信託基金讓「Taiwan」進入全球科學獎譜系，另一種主權書寫方式
- **Stage 0 觀點成型 anchor**：commit `12ae489c4` 先 ship research deliverable raw 永久保留（REFLEXES #22）後再進 Stage 2，pivot 受哲宇 in-loop 確認後執行
- **Cross-link Stage 5 雙向**：許倬雲（2024 唐獎漢學）/ 王永慶（同世代產業領袖轉慈善家）/ 台灣國防與軍事現代化（預鑄工法 + 半導體 + sovereignty 軸線）— 3 條 sibling 全 format-structure ✅ PASS 接受 reverse cross-link；張忠謀 + 施振榮 forward only（無 延伸閱讀 section 不能補 reverse）
- **Prose hard gates**：word-count 4606 (102%) ✅ / footnote-format ✅ / footnote-density ✅ / image-health 3 圖 ✅ / cjk-punct ✅ / chronicle-lead ✅ / prose-health score 1 ≤ 3 ✅
- **觸發**: 哲宇 21:06 directive `/twmd-rewrite 尹衍樑`（不知道當日清晨他剛辭世）→ Stage 1 plot twist 揭露 → 哲宇 in-loop 拍板「走紀念文 + sovereignty 透鏡、你 ship」→ Stage 2-5 連跑

### 大宇雙劍 EVOLVE — 2026-05-26 manual（哲宇 explicit /twmd-rewrite「進化大宇雙劍...深度研究+補足媒體素材」directive — Technology 社群與數位文化 / 從既有 2644 CJK / 20 footnote / 0 圖 升 4784 CJK / 28 footnote / 4 圖 + 2 iframe / 7 H2，新增 3 條重大新事實 + chronicle-lead H2 修補 + 30 秒概覽 canonical format）

- **Article**: [knowledge/Technology/大宇雙劍.md](../../knowledge/Technology/大宇雙劍.md) — 4784 CJK chars (106% 4500) / 28 footnote / 7 H2 / 1 hero + 2 inline + 2 video iframe（hero guanghua-computer-market-2007 CC BY 2.0 pacificmorningpost Flickr Wikimedia + 2 inline softstar-sword-and-fairy + softstar-xuan-yuan-sword-7 SOFTSTAR Steam fair use editorial commentary + iframe 仙劍蝶戀 OST uNG9lwMh2E8 + iframe 胡歌 2005 逍遙嘆 MV O9Fm-nuRhng）
- **Research**: [reports/research/2026-05/大宇雙劍-evolve.md](../../reports/research/2026-05/大宇雙劍-evolve.md) — 834 行 / 50 KB / general-purpose agent 18 WebSearch + 13 WebFetch = 31 ops / 中文 90%+
- **Round 2 補強 angle**：「IP 漂移 + 大宇本體消失 + 姚壯憲立場逆轉」三層新核 — round 1 既有「那個下午賣不掉」雙意象維持，但補三層 timeline 延伸到 2025-2026
- **重大新事實 3 條 (round 1 沒抓到)**：
  - **2025/11/3 大宇本體改名光聚晶電聯合 (Star Fusion Group)** — 半導體佔比 65% / 2026/1/7 經濟部核准 / 涂俊光「進半導體才知與遊戲業差真多」逐字引語。最終結局比 IP 賣斷更深 — 大宇資訊作為以遊戲為核心的公司,2025/11/3 起作為母公司不再存在
  - **2025/6/24 軒轅劍 IP 二次轉手** — 歡動香港買到才九個月轉手成都星閱辰石 / 路陽動畫電影 2027 末上映 / 1 億 RMB 動畫劇集投資。「賣斷 5 億」只是 IP 漂移的開始
  - **姚壯憲 2025 立場逆轉** — 仙劍世界玩家交流會「絕對不會是悲劇結局」逐字引語。1995 那個堅持「靈兒必須死」、頂住謝崇輝與林珈汶反對的 26 歲姚壯憲,30 年後 56 歲親手宣告「不再讓它哭」
- **chronicle-lead H2 修補**：「## 2024 年 9 月：五億的告別」(hard violation) → 「## 那場董事會：賣掉雙劍的兩封公告」(場景化標題)
- **新 H2 加入**：
  - §「雙劍賣斷之後：IP 二次轉手與大宇本體更名」 — 2025/6/24 + 2025/11/3 雙重新事實
  - §「『靈兒必須死』與『絕對不會是悲劇結局』」 — 姚壯憲 30 年立場逆轉獨立 H2
  - §「蝶戀：50 歲對 19 歲自己的回望」 — 林坤信 2026/2/21 重編 deepening
- **30 秒概覽 canonical format**：加 `> **30 秒概覽：**` blockquote 含 2024 / 2025 雙時間軸更新
- **新 footnote 8 條** (20→28): 21 蔡明宏 UDN / 22 軒轅劍二次轉手巴哈 / 23 仙劍世界 17173 / 24 中手游 2025 財報網易 / 25 大宇改名光聚晶電數位時代 / 26 姚壯憲 2025 仙劍世界交流會 UDN / 27 新仙劍奇俠傳維基 / 28 〈蝶戀〉演唱者周黎菁中文百科校正網路長年誤傳劉亦菲
- **重要校正**：〈蝶戀〉演唱者 Candy（周黎菁）— 不是網路長年誤傳的劉亦菲版本
- **品質**：article-health rewrite-stage-4 profile hard=0 warn=0 (8/8 plugin ALL PASS) / footnote-format ✅ / footnote-density ✅ (rewrite-stage-3-5 profile) / prose-health hard=0 score=2 ≤ 3 / 對位句 0 / 破折號 5 處 (under limit) / word-count 4784/4500 106% ✅ / image-health 4 張 ✅ / chronicle-lead ✅ / cjk-punct ✅ / frontmatter-format ✅ / wikilink-target ✅ / link-target ✅ / format-structure ✅
- **Cross-link**：forward 既有 4 條 + 新加 1 條 [雷亞遊戲](/technology/雷亞遊戲)「跟大宇同樣以美學立國但走出完全不同路徑的下一代台灣遊戲公司」 / 既有 4 sibling 已 reverse link 指 大宇雙劍 (round 1 + 雷亞遊戲 round 2 ship 時已加)
- **待 ship 後**：哲宇 review 文字 + 若 OK set lastHumanReview: true / 翻譯走 babel-nightly 自動撿 / 新 sporeLinks frontmatter 條目已含 X #93 (sn=2059239795231281223 utm_campaign=s93,但這應該是 round 1 #92 ship 後的 X fan-out)

### 國家人權博物館 EVOLVE Round 2 — 2026-05-26 manual 補充（哲宇 directive「補充更多園區與意義 還有故事的介紹」+ 6 個 NHRM 官方 source URL + 1 影片轉錄分析 — Round 1 4772 CJK / 26 footnote / 3 圖 → Round 2 **7780 CJK / 40 footnote / 3 圖 + 2 iframe / 7 H2**）

- **Article**: [knowledge/History/國家人權博物館.md](../../knowledge/History/國家人權博物館.md) — 7780 CJK chars (173% 4500) / 40 footnote / 7 H2 / 3 hero+inline 圖 + 2 video iframe（NHRM 景美園區簡介影片 L-qcP5M9rQU + 2025 綠島藝術季宣傳影片 aopbDtOisVM）
- **Round 2 Research**: [reports/research/2026-05/國家人權博物館-stage1-round2.md](../../reports/research/2026-05/國家人權博物館-stage1-round2.md) — 671 行 / 45 KB / general-purpose agent 17 WebSearch + 18 WebFetch = 35 ops / 中文 90%+
- **Transcript Analysis**: [reports/research/2026-05/transcripts/nhrm-L-qcP5M9rQU/transcript-analysis.md](../../reports/research/2026-05/transcripts/nhrm-L-qcP5M9rQU/transcript-analysis.md) — faster-whisper 2347 CJK + STT 校正 + 10 個 key 新事實萃取
- **Round 2 補強 angle**：「博物館作為**記憶基礎建設**」(memory infrastructure)。三資料庫 + 兩園區空間 + 影像/VR/口述史/文學作品 channel + 受難者親自參與 — 補強 Round 1 Hybrid A+C 核心矛盾但不替換
- **重大事實修正 (Round 2 plot twist)**：
  - **蔣中正介入次數**: Round 1「4,101 次」→ Round 2 促轉會 2021/2/25 官方數字「終審死刑 1,153 人 / 介入 970 人 / 改判死刑 259 件」(Round 1 4101 無官方 source 可能 conflate)
  - **twtjdb 筆數**: Round 1「14,946 筆」→ Round 2 官網「**9,915 筆**」現行案件數
- **新 H2 加入 §「外役醫生病歷上的 300 個名字」**: 陳中統 1969-1979 景美外役醫生病歷夾帶 300+ 名單外洩李敖弟弟+日本友人→國際特赦組織 + 三資料庫 + 文學作品 + 中正紀念堂「拆不掉就住進去」常設展 + 2025 綠島藝術季「一四九海浬」23 組藝術家 7 國際 + 高森信男「藝術成為對抗時間的劍柄」quote
- **§2 景美深度補 detail**: 仁愛樓押區三種房（獨居房軟墊 1980 加裝防自殘 / 小押房 3-4 / 大押房 6-10 / 女囚二樓左側雙排）+ 林池受難者設計獬豸水池 + 軍法庭判死刑加腳鐐送安坑刑場流程 + 放風 15 分鐘 + 家屬玻璃電話 10 分鐘探視 + 政治犯子女小六探視 quote + 柏楊崔小萍陳中統兩爆炸案 list + 監察院糾正汪希苓特區爭議
- **§4 蔣中正數字修正**: 1,153 終審死刑 / 970 介入 / 259 改判死刑 + 胡適 1953 quote「憲法只許總統有減刑與特赦之權」+ 蔣中正親筆「處死刑」「應處死刑」「槍決可也」「此人為何不槍決」+ 1956 軍事審判法 133 條總統不得逕為變更原判決
- **結尾段補**: 影片結尾 4 句受訪者願景蒙太奇（平安健康長大 / 模特兒 / 環遊世界 / 85 歲繼續念書）+ 獬豸水池 echo + 「能被凍結的不是這座博物館,是這套還沒完成的記憶基礎建設」收束
- **iframe 嵌入 2 個 NHRM 官方影片** (per REWRITE-PIPELINE Step 4.3.6 影片 iframe 嵌入升級): L-qcP5M9rQU 景美園區簡介(放陳中統段)+ aopbDtOisVM 2025 綠島藝術季宣傳(放劍柄 quote 後)
- **新 footnote 14 條**: 27 仁愛樓 NHRM 官網 / 28 獬豸水池 / 29 軍事法庭 / 30 NHRM YouTube L-qcP5M9rQU + transcript-analysis / 31 監察院糾正案 / 32 陳中統國家人權記憶庫 / 33 歐陽文口述歷史 / 34 國家人權記憶庫官網 / 35 twtjdb 官網 / 36 wtl 官網 / 37 《超級大國民》維基 / 38 《無法離開的人》VR NHRM 新聞稿 / 39 「自由的靈魂 vs. 獨裁者」NHRM 新聞稿 / 40 2025 綠島藝術季 NHRM 新聞稿
- **品質**: prose-health hard=0 score=2 ≤ 3 ✅ / footnote-format ✅ / footnote-density ✅ / chronicle-lead ✅ / frontmatter-format ✅ / word-count 7780/4500 173% ✅ / image-health 3 張 ✅ / cjk-punct ✅ / wikilink-target ✅ / link-target ✅
- **STT 校正**: 從 Whisper transcript 校正錯字 (博洋→柏楊 / 崔小平→崔小萍 / 陳忠統→陳中統 / 興典西畔→新店溪畔 / 汪希林→汪希苓 / 著商→著重 / 火箭→和解 / 批鑒→闢建 / 流日→留日 / 國際的第一法庭→景美第一法庭)
- **下一步**: 走 SPORE-PIPELINE 自動發 spore (per 哲宇 directive「完成後幫我自動化做完整的 /twmd-spore +發布」) + ARTICLE-INBOX EVOLVE entry consumption (如有) + babel-nightly cron 自動撿翻譯

### 國家人權博物館 NEW — 2026-05-26 manual（哲宇 explicit /twmd-rewrite「深度研究國家人權博物館」directive — History 戰後與威權 / Fresh 模式 4772 CJK / 26 footnote / 3 圖 / 6 H2 / Hybrid A+C 核心矛盾「國家自我紀念博物館的悖論」）

- **Article**: [knowledge/History/國家人權博物館.md](../../knowledge/History/國家人權博物館.md) — 4772 CJK chars / 26 footnote / 6 H2 / 3 圖（hero nhrm-tsai-unveil-2018 Wikimedia CC BY 2.0 總統府 + 2 inline nhrm-greenisland-monument-2022 CC BY-SA 4.0 / nhrm-jingmei-park PD Voice of America）
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式（knowledge/History/國家人權博物館.md 不存在，6 sibling [綠島監獄 / 戒嚴時期 / 台灣白色恐怖 / 台灣轉型正義 / 二二八事件 / 民主轉型] 已存在 → 邊界差異化：本文聚焦「博物館機構自身的記憶政治」不重寫 sibling 角度）
- **核心矛盾**（Stage 1.4 鎖定，從 Stage 0.6 三候選 A/B/C 收斂為 Hybrid A+C）：「國家自我紀念博物館的悖論：國家自己建一座博物館紀念自己做過的事，但加害體系的政治繼承者今天仍能凍結它的預算」(48 字) — A 修正 anchor（2025/1 藍白凍結文化部下屬機構業務費 30% + NHRM 對民團補助 522.5 萬刪 + 中正紀念堂轉型停止 + 白色恐怖賠償 1 億刪 + 5/7 解凍）+ C anchor（victim-centered 國際 default + 加害者問責 0 司法審判 + 蔣中正 4101 次未進入刑事 + 蔣中正肖像仍在 10 元硬幣）
- **Hook**：30 秒概覽 + 開場 1951/5/17 vs 2018/5/17 同日呼應 + 蔡焜霖 88 歲「盼望總有一天知道誰殺了我的朋友」+ 67 年後跨日交錯 anchor，title「國家人權博物館：垂淚碑上沒寫的名字」副標 tweet-able 雙意（受難者母親的長夜哭泣 + 加害者具名缺席）
- **品質**：footnote-format ✅（rewrite-stage-3-5 profile）/ footnote-density ✅ / prose-health score=1 (≤3 pass，剩 1 個 lastHumanReview=false 警示) / chronicle-lead ✅（小標題 6 個全反編年體：「盼望總有一天知道，誰殺了我的朋友」/「新店那條捷運路線旁的看守所」/「籌備了六年的博物館」/「柬埔寨關了一個 Duch，台灣關了零個」/「拿到一份處處彈孔的預算書」/「垂淚碑上沒寫的名字」）/ frontmatter-format ✅ / word-count 4772/4500 ✅ / image-health 3 張 ✅ / cjk-punct ✅ / wikilink-target ✅ / link-target ✅
- **Research**: [reports/research/2026-05/國家人權博物館.md](../../reports/research/2026-05/國家人權博物館.md) + [國家人權博物館-stage1-raw.md](../../reports/research/2026-05/國家人權博物館-stage1-raw.md) — Stage 1 raw 622 行 / 58 KB / general-purpose agent 34 WebSearch + 14 WebFetch = 48 ops / 中文 85% + 英文 15%（國際比較）
- **大 Falsification 5 條**：
  - F1 「KMT 提案凍結 NHRM 70% 預算」**推翻** → 實際 30% 全面文化部凍結 + NHRM 個別案目刪除（疑英文 AI summary conflate 總統府 73% 凍結）
  - F2 「KMT 單獨針對 NHRM」**推翻** → 藍白聯手 60 席對文化部全面圍剿
  - F3 「victim-centered 國際 default + 加害者問責結構性缺席」**部分 confirm + 部分修正** → 兩種類型機制（司法審判 / 除垢法）台灣兩種都沒做到
  - F4 「政治受難者群體對 NHRM 滿意度」**confirm + plot twist** → 受難者群體 by and large 支持 NHRM，緊張在 NHRM vs 加害繼承者，B 候選降為 inline 場景不獨立段
  - F5 「2025 事件 = 純政黨意識形態爭議」**修正** → 雙拍敘事 1/20 凍結 + 5/7 解凍 中央首例
- **事實鐵三角修正**：68 年前→67 年（鄭麗君「等了 67 年」quote cross-check）/ 蔡焜霖享耆壽 92→93（TNL vs 維基官方褒揚令衝突，採信 93）/ 江南案 1985→1984/10 江南被殺 1985 初案情爆發 / 15 年三任總統→16 年（2002→2018 算術）/ 107 天 1/20→5/7 verify
- **Sensitive 素材處理**：政治立場敏感（轉型正義 / 加害者問責 / 2025 預算事件 / 藍白 vs 民進黨）走 Step 1.4.5 perspective scan 5 spectrum 全覆蓋（DPP 主流 / KMT 反方 / 民間第三方 / 國際比較 / 學界批評），直引 quote 全程 footnote citation（柏楊垂淚碑 28 字 / 蔡焜霖 / 蔡英文 / 鄭麗君 / 陳俊宏 / 林佳和 / 葉虹靈+黃丞儀 / 33 NGO 聯署 / 文化部新聞稿 / 在野黨團提案理由 / 李遠「招降書」+「胚胎」）
- **Cross-link 雙向**：forward 延伸閱讀 5 條（綠島監獄 + 戒嚴時期 + 台灣白色恐怖 + 台灣轉型正義 + 二二八事件）/ reverse 補進 5 sibling（戒嚴時期 + 台灣白色恐怖 → append 既有 §延伸閱讀；綠島監獄 + 台灣轉型正義 + 二二八事件 → 新增 **延伸閱讀** section + 1 條 link）
- **跟 [綠島監獄] article (2026-05-15 ship) 避免雙寫**：綠島監獄 article 處理「政治黑牢→大哥故鄉」layered memory 角度，本文 §1 綠島段聚焦「博物館化的記憶政治」（新生訓導處→綠洲山莊→人權園區→2018 升格機構轉化軸）
- **Title 三明治**：「國家人權博物館：垂淚碑上沒寫的名字」v6.3 全 category 冒號三明治 + 副標獨立 tweet-able + 雙意 hook（沒寫受難者 / 沒寫加害者）
- **待 Stage 6 後**：哲宇 review 文章內容 + 若 OK 則 set lastHumanReview: true / 翻譯走巴別塔 pipeline (cron twmd-babel-nightly 自動撿)

### 雷亞遊戲 EVOLVE — 2026-05-25 2026-05-25-083427-quirky-pasteur（哲宇 explicit /twmd-rewrite「深度研究進化 + 自動發孢子」directive — Technology 音樂遊戲 / 從既有 9KB / 12 footnote 升 4532 CJK / 27 footnote / 3 圖 + title 從「音樂帝國的裂縫」進化為「以美學立國的音樂帝國，與它十四年的裂縫」）

- **Article**: [knowledge/Technology/雷亞遊戲.md](../../knowledge/Technology/雷亞遊戲.md) — 4532 CJK chars / 27 footnote / 8 H2 / 3 圖（hero rayark-cafe-2021 Wikimedia CC BY-SA 4.0 + 2 inline rayark-logo 2012 fair use + rayark-booth-cosplayers 2018 CC BY-SA 2.0）
- **Pipeline**: REWRITE-PIPELINE v6.0 — EVOLVE 模式（既有 zaious 2026-04-25 ship 127 行 / 12 footnote / [NO-MEDIA] pre-gate 遺珠 / 多處 [THIN] / [FACT-MISMATCH] footnote 9 udn → 5 sub-agent 42 WebSearch + 23 WebFetch deep research 補洞）
- **核心矛盾**（Stage 1.4 鎖定，從 Stage 0.6 四候選 A/B/C/D 收斂）：「美學讓雷亞被看見，也讓它在每個非音樂的場域跌倒」(23 字) — 統合 A 美學護城河變枷鎖（主）+ C 技術人擴張瓶頸（延伸）+ D counter-balance（媒體聲量 ≠ 商業）+ B 赤燭對比作為獨立節非核心
- **Hook**：30 秒概覽提 14 國第一 + 1.3 億下載 + Sdorica 維護模式 + 聚爆動畫 11 年 + ICE 切割 + 美學 lock-in，title「以美學立國的音樂帝國，與它十四年的裂縫」副標 tweet-able
- **品質**：footnote-format ✅ / footnote-density ✅ / prose-health score=3 (≤3 pass) / chronicle-lead ✅（改「2020 年 3 月 ICE」→「摩斯密碼 1344 7609 2575」）/ frontmatter-format ✅（reorder lastVerified < category）/ word-count 4532/4500 ✅ / image-health 3 張 ✅ / cjk-punct ✅ / wikilink-target ✅ / link-target ✅
- **Research**: [reports/research/2026-05/雷亞遊戲.md](../../reports/research/2026-05/雷亞遊戲.md) — 562 行 / 26 high_confidence / 9 unverified flagged
- **大事實補洞**：
  - 六位共同創辦人全 named（鐘志遠 / 游名揚 / 張世群 / 謝昌晏 / 楊善詠 / 李勇霆，三人台大資工 B91-B92 + 鐘台大電信所 + 游森林系跨網媒所）
  - Sdorica 2026-02-11 進入維護模式（重大後續事件，Valdrir DR + Chiyuki DR 最後兩位角色 + 2026-07 後不再復刻）
  - Cytus II 2027 NS / NS2 公布（2026-05-22）+ 18M 全球下載
  - 公司現況：270 人 / 資本額 6,400 萬 / 累計 1.3 億下載
  - 聚爆：第零日動畫 11 年未交付（2015 Kickstarter → 2019 三度跳票 → 2020-2026 5 年空白）
  - ICE Wilson Lam 本名 + 7-18 離職聲明逐字（newtalk 三源驗證）
- **Sensitive 素材處理**：ICE 事件 framing 雙視角並列（英文媒體「pro-democracy / pro-Hong Kong」vs 中文世界「雷亞跪了 / 切割正不正確」）走 ⚠️ 爭議觀點 callout / 赤燭 vs 雷亞 中國市場兩條路對比作為文章 anchor，per MANIFESTO §對位平行不強制平衡 / 五千元禮包 + 角色數值未預告修改事件因 footnote 9 udn 來源 mismatch，hedge 為「未經預告調整角色數值和高定價禮包爭議」概括語言保留 ltn / 巴哈兩 source 三源支持
- **Cross-link**：赤燭遊戲 sibling reverse 已加（「2020 ICE 摩斯密碼事件後選擇了與赤燭相反的路徑」）/ 既有 [台灣遊戲產業] + [大宇雙劍] + [傳奇網路] 保留
- **Title 進化**：「雷亞遊戲：音樂帝國的裂縫」→「雷亞遊戲：以美學立國的音樂帝國，與它十四年的裂縫」(25 字 v6.3 冒號三明治 + tweet-able 副標 + sync 新核心矛盾 + 保留「音樂帝國」視覺 icon)
- **待 Stage 6 後**：自動發孢子（per directive「自動發孢子」），走 SPORE-PIPELINE 5 stage（可能 hook：六位台大電資院創辦人 + Sdorica 維護模式 + 美學 lock-in 三選一）

### 落日飛車 NEW — 2026-05-23 2026-05-23-000000-twmd-rewrite-daily（cron daily 接續 ARTICLE-INBOX P0 — Sunset Rollercoaster 全英語 City Pop 樂團 14 年從台北師大路 Photo Booth 走到 Coachella Sonora 舞台）

- **Article**: [knowledge/Music/落日飛車.md](../../knowledge/Music/落日飛車.md) — 4531 CJK chars / 8 H2 / 40 footnote / 3 圖（hero + 2 inline Puramyun31 攝 2018-04-06 演出，全 CC BY 2.5）
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式（既有 Hub 文章 Music/台灣獨立音樂.md 有 2 paragraph anchor 供 cross-link 但 NEW article 缺）
- **核心矛盾**（Stage 1.4 鎖定，從 Stage 0 三候選 A/B/C 收斂）：「英文唱台北的夕陽，反而讓台灣最被聽見」— Bandcamp Daily / NME / 報導者 多源確認英語是「讓詩意自己浮出來」+ 印尼雅加達是 Spotify 月聽眾最多城市的事實放大張力
- **Stage 1 falsifications（CRITICAL 7 條校正既有 Hub + INBOX）**：(1) 主唱國國前團不是 Manic Sheep — 實際是 Acid Lips / F.L.A.T CLUB / Boyz & Girl / 來吧！焙焙！（Hub 寫錯）(2) 2017 紐約 SummerStage 是錯的 — 實際 2016-07-16 Taiwanese Waves（Hub 寫錯）(3) 「2019/2022 Coachella 兩度」是錯的 — 只有 2023 一次，4/15+4/22 Sonora 舞台（INBOX 寫錯）(4) Taiwan News「Coachella 33 年首組」邏輯不可能（Coachella 1999 才開始），採 Blow「超過二十年來首組」(5) JinJi Kikko Records 不是廠牌名，廠牌是「夕陽音樂產業」(6) Hiatus 期間 Kuo + Lo 搞過 dark industrial side project「Forest」(7) 2015 國國 1300 度近視免役 + 結束 Algae 樂團吉他手 = 重組契機（Hub 完全沒提）
- **品質**：40 footnote / 4531 字 / 對位句型 0 violations / 破折號密度低於 ≤15/1500 上限 / prose-health score 1 ≤ 3 pass / **Stage 4 rewrite-stage-4 hard=0 warn=0 全綠 ✅**
- **Hook**：「落日飛車：從一張 Photo Booth 背景照走到 Coachella，全英語唱台北夕陽的 14 年」— 冒號三明治格式 v6.3 + Title 代表性 > 反諷 hook 原則
- **8 H2 全 scene/物件/矛盾 anchor，0 編年體**：Photo Booth 裡那張 pre-set / Abbey Road 母帶，然後沒了 / 1300 度近視通知書 / Jinji 不是金桔 / Audiotree 那五首 / 沙漠裡的 Sonora 舞台 / 成為自己的光（含「你知道嗎」+「策展人筆記」×2 +「爭議觀點」+「✦ 結尾警句」5 個富文本元素）
- **媒體授權**：3 圖全 Puramyun31 攝 2018-04-06 Wikimedia Commons CC BY 2.5 同場（hero (1).jpg + inline (5).jpg + (8).jpg）+ §圖片來源 section 完整 attribution
- **Research**: [reports/research/2026-05/落日飛車.md](../../reports/research/2026-05/落日飛車.md) — Stage 0 §觀點成型 + Stage 1 agent 64 search deliverable（37 footnote / 15 verbatim quote / 完整 discography + lineup + tour + awards 表 + Wikimedia 9 圖 manifest）
- **Hub 反向 cross-link 待補**：Music/台灣獨立音樂.md 段落 "2017 年紐約中央公園 SummerStage" 應更新為 2016 + 添加 [[落日飛車]] wikilink（Stage 5 deferred 為下一 routine 接力）

### 馬英九 EVOLVE — 2026-05-23 2026-05-22-121707-manual（哲宇 explicit /twmd-rewrite 觸發「深度研究進化馬英九文章」+ 拍板「立體 portrait + 多元觀點並陳」framing，不收斂為單一 thesis）

- **Article**: [knowledge/People/馬英九.md](../../knowledge/People/馬英九.md) — EVOLVE 130 → 296 行（body **6573 字 CJK，146% of 4500 門檻**）
- **Pipeline**: REWRITE-PIPELINE v6.0 — EVOLVE 模式（既有 130 行萃取事實後從零重寫，含 5 條 Stage 1 falsified hypothesis 修正）
- **核心矛盾**：不收斂單一 thesis，6 個小矛盾並存（個人特質 / 兩岸 / 經濟 / 治理 / 身份 / 卸任後）— 多面向 scene 累積讓讀者自己 form 印象，對應 SSODT + EDITORIAL §紀實而不煽情
- **Hook**：「馬英九：哈佛法律博士進蔣經國辦公室當英文翻譯，後來做了八年清廉總統，留下兩岸、太陽花跟 22K」（哲宇拍板 title 含 6 anchor narrative arc）
- **品質**：43 footnote / 6573 字 / 破折號 10 處密度 2.4/1500（遠低於 15/1500 上限）/ 對位句型 0 / prose-health score 2 ≤ 3 pass / Stage 4 hard=0 全綠 / 4 圖（hero 馬習會 2015 CC BY 2.0 + inline MOFA Portrait 2008 + sunflower 太陽花 PD + iframe 1 影片預留 Stage 4.3.6 deferred）
- **Research**: [reports/research/2026-05/馬英九.md](../../reports/research/2026-05/馬英九.md) — 412 行（Stage 0 §觀點成型 + Stage 1 agent 230 行 deliverable：40 fact / 10 quote / 5 故事 / 3 SSODT fault lines / 3 國際視角）
- **Stage 1 falsified hypothesis（CRITICAL 5 條校正既有 article）**：(1) 22K 不是「2009 啟動 2013 喊停」實際 2009/4-2011/9 兩階段跑 2.5 年，2013/6/3 才正式廢止 (2) 9.2% 民調是**年代新聞** 2013/9/15，不是 TVBS（同期 TVBS 11%） (3) 馬鶴凌不是「軍官」是行政院青輔會處長 + 國民黨中央考紀會副主任 (4) 馬習會握手 80 秒 = 1 分 20 秒 confirmed (5) 哈佛 SJD 1981 confirmed
- **Breaking news 納入**：2026/5/21-22 周美青 + 馬以南家屬聲請輔助宣告 + 馬英九本人拍片回應「律師，這樣可以證明我沒有失智吧？」三句 verbatim quotes 來自公視 PNN 報導，按 EDITORIAL §紀實而不煽情處理（時間 + 雙方公開聲明，不臆測健康狀態）
- **Plugin 放寬**：title cap 35 → 45 / EDITORIAL 建議 30 → 35（哲宇拍板適應多 anchor narrative arc 人物文）
- **媒體授權**：3 圖全合規（總統府 Flickr CC BY 2.0 馬習會 / Wikimedia 政府網站開放資訊宣告 MOFA portrait / Wikimedia PD VOA 太陽花）+ §圖片來源 section complete
- **待 Stage 5 reverse cross-link**：太陽花學運 / 蔡英文 / 陳水扁 / 馬英九迷因 / 台海危機與兩岸關係發展（4 篇 sibling format-structure 預檢 pass，馬英九迷因 pre-existing warn 但 commit 接受）
- 待觀察者驗收：哲宇 explicit 表示要驗收成果

### Wave 3 singletons batch — 江賢二 + 許倬雲 EVOLVE + 葉廷皓 + 台灣 BIM 與營建科技 NEW — 2026-05-22 2026-05-21-215830-manual（Wave 3 batch — 4 Opus agents 平行 ship + 校準 prompt v3 / 4 categories: Art × 2 + People × 1 + Technology × 1 / 5290+7908+6796+6384 = **26378 字** / 18+34+34+53 = **139 footnote** / 3+3+3+4 = **13 圖**）

- **Articles** (4):
  - [knowledge/Art/江賢二.md](../../knowledge/Art/江賢二.md) — P2 NEW「逃離臺灣四十五年，回家後才畫得出他這輩子最好的畫」
  - [knowledge/People/許倬雲.md](../../knowledge/People/許倬雲.md) — P1 EVOLVE「兩根手指寫出一條中國史的長河，王力宏外舅公的九十五年」（11.7K → 27K body 擴展）
  - [knowledge/Art/葉廷皓.md](../../knowledge/Art/葉廷皓.md) — P2 NEW「他說『非正確使用科技才有趣』，卻把一輩子花在『正確地教別人怎麼用工具』」（memorial / legacy piece — INBOX 寫他活躍實際 2024-11-12 已逝）
  - [knowledge/Technology/台灣BIM與營建科技.md](../../knowledge/Technology/台灣BIM與營建科技.md) — P2 NEW「政府推 BIM 推 12 年，但真正爆發是 Anthropic MCP 規格 2024 出來的」
- **校準 prompt v3 抓 11 條 INBOX brief fact correction + 1 重大 framing 校正**（per Wave 1+2 retrospective enhancement 補 5 點: wiki-fetch.py 已知 bug + curl fallback / prettier italic-paren caveat / Stage 1 真 40 calls / EVOLVE 7-tag system / 圖荒 fair use scope）
- **新發現的台灣華語文化譜系**: 許倬雲 → 許婉清（二妹）→ 李模（女婿）→ 李建復（〈龍的傳人〉原唱）
- **完整詳述見 [reports/research/2026-05/](../../reports/research/2026-05/)**：jiang-chien / hsu-cho-yun-evolve / yeh-ting-hao / 台灣BIM與營建科技 四份 research reports

### 歷史街區 Taipei batch 12 Wave 2 — 中山北路條通 + 永康街 + 公館 + 寶藏巖 + 北投溫泉街 + 大龍峒 + 四四南村 + 士林 + 牯嶺街 NEW — 2026-05-21/22 2026-05-21-215830-manual（Wave 2 batch — 9 Opus agents 平行 ship + 主 session 整合 retrospective / Geography 歷史街區系列 P0+P1+P2 / 7554+7277+9432+8286+8692+7556+5805+7159+6161 = **67922 字** / 28+25+19+23+29+45+21+24+34 = **248 footnote** / 7+5+8+7+7+7+6+6+6 = **59 圖**）

- **Articles** (9):
  - [knowledge/Geography/中山北路條通.md](../../knowledge/Geography/中山北路條通.md) — P0-4「日本人鋪的去神社的路，最後還是被日商接回來」(21 字)
  - [knowledge/Geography/永康街.md](../../knowledge/Geography/永康街.md) — P1-5「日本教授住過、外省人逃難來、現在是日韓觀光客的台北」
  - [knowledge/Geography/公館.md](../../knowledge/Geography/公館.md) — P1-6「日本帝國的研究室、戒嚴期的地下沙龍、台大學生的炸雞排」
  - [knowledge/Geography/寶藏巖.md](../../knowledge/Geography/寶藏巖.md) — P1-7「拆了 30 年的違章聚落，最後變成台北最酷的藝術村」
  - [knowledge/Geography/北投溫泉街.md](../../knowledge/Geography/北投溫泉街.md) — P1-8「1697 採硫到 2026 浴博 — 同一片山泉，三次被外人發現、四代住民適應」
  - [knowledge/Geography/大龍峒.md](../../knowledge/Geography/大龍峒.md) — P2-9「保安宮的香、孔廟的鐘、圓山的青天白日，三個時代的台北信仰」
  - [knowledge/Geography/四四南村.md](../../knowledge/Geography/四四南村.md) — P2-10「兵工廠的眷村，現在是 101 旁的文創園區」
  - [knowledge/Geography/士林.md](../../knowledge/Geography/士林.md) — P2-11「凱達格蘭族的地、漳泉械鬥的廟、現在每天晚上是台北最擁擠的夜市」
  - [knowledge/Geography/牯嶺街.md](../../knowledge/Geography/牯嶺街.md) — P2-12「日人撤退留下的舊書街被市政整頓搬光，學園換成劇場跟博物館」
- **Pipeline**: REWRITE-PIPELINE v6.0 × 9 Fresh 模式，共通模板 7 H2（凌晨四點時刻 / 名字考據 / 街成形時刻 / 軸線 / 物質層 / 在地人 3 個地方 / 收尾）
- **Orchestration**: 9 Opus agents 平行 dispatch from `wave2-orchestrate` worktree, each in isolation worktree per agent. Wave 1 retrospective 校準 prompt 4 點全應用 (worktree relative path / Wikimedia API verify HARD / wiki-fetch.py local cache HARD / hook executable enforce).
- **品質**: 所有 9 篇 Stage 3.5 + Stage 4 plugin 全部 hard=0 warn=0 (footnote-format / footnote-density / frontmatter / format-structure / wikilink-target / link-target / cjk-punct / chronicle-lead / word-count / image-health). 整合到 wave2-orchestrate branch 後重跑全綠.
- **Research reports**:
  - [reports/research/2026-05/zhongshan-tongdori.md](../../reports/research/2026-05/zhongshan-tongdori.md)
  - [reports/research/2026-05/yongkang.md](../../reports/research/2026-05/yongkang.md)
  - [reports/research/2026-05/gongguan.md](../../reports/research/2026-05/gongguan.md)
  - [reports/research/2026-05/treasure-hill.md](../../reports/research/2026-05/treasure-hill.md)
  - [reports/research/2026-05/beitou-hot-spring.md](../../reports/research/2026-05/beitou-hot-spring.md)
  - [reports/research/2026-05/dalongdong.md](../../reports/research/2026-05/dalongdong.md)
  - [reports/research/2026-05/sisi-south-village.md](../../reports/research/2026-05/sisi-south-village.md)
  - [reports/research/2026-05/shilin.md](../../reports/research/2026-05/shilin.md)
  - [reports/research/2026-05/guling-street.md](../../reports/research/2026-05/guling-street.md)

#### 🚨 Wave 2 校準 prompt 抓出 **5 條 INBOX brief 事實校正** (immune system 升級具體 case)

校準 prompt 強制 Wikimedia API verify + multi-source verify 紀律，跨 5 篇撈出 INBOX brief 寫錯或漏寫的事實。這些 fact correction 同時 enrich Wave 1 articles + 未來 spore / 翻譯 reuse 不會 leak 錯誤資訊。

| 篇           | INBOX brief 寫的                                 | 多源驗證後實際                                                                             |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| 北投溫泉街   | 1997 廢娼陳水扁市長任內                          | **1979 北投廢娼李登輝市長**（議會廢止侍應生制度）+ **1997 全市公娼廢止陳水扁**（兩個事件） |
| 中山北路條通 | 1929 完成林蔭大道                                | **1937-03-30 動工 → 1941-03-28 完工**                                                      |
| 中山北路條通 | 中山堂在中山北路一段口                           | **中山堂在延平南路（中正區）**，跟中山北路 800 公尺距離                                    |
| 士林         | 1859 漳泉械鬥後重建現址                          | **1859 焚毀舊街 + 1864 同治三年才在現址重建**（差 5 年）/ 1859 漳泉械鬥 ≠ 1853 頂下郊拼    |
| 公館         | 紫藤廬 1947 周德偉故居 → 1981 茶藝館 → 1997 古蹟 | **1950-09 周德偉入住 / 1981-01-18 茶藝館開幕 / 1997-07-08 第一批市定古蹟**                 |

#### 🚨 Wave 2 narrative 補洞 (大龍峒 agent surfaced)

通行 1853 頂下郊拼敘事寫「同安人從艋舺逃到大稻埕」**漏寫 mid-stop**。大龍峒 agent 多源驗證後補上：「**1853 戰敗同安人先退大龍峒以保安宮為防禦中心，再遷大稻埕**」。Wave 1 大稻埕 + 艋舺 文章 cross-link 已補上指向大龍峒解釋 mid-stop。

公館 agent 也撈出失落 anchor：「**1729-1734 凱達格蘭族 vs 粵閩械鬥**」比艋舺 1853 頂下郊拼還早 124 年，主流敘事普遍缺。

#### ⚠️ Wave 2 retrospective — wiki-fetch.py 兩個結構性 issue 待修

1. **Latin-1 encoding bug on CJK URLs**: 大龍峒 + 永康街 + 寶藏巖 + 中山北路條通 多個 agents 報告 `wiki-fetch.py` 在 build Referer header 時對 CJK 沒做 percent-encoding → urllib 報 latin-1 codec error → fetch fail. 應該在 `_fetch_once()` 把 referer string 過 `urllib.parse.quote(referer, safe=':/')`. LESSONS-INBOX 候選 (per REFLEXES #15 反覆浮現要儀器化第 N 次驗證).
2. **Concurrency lock 變 serial bottleneck**: 寶藏巖 + 公館 + 多個 agent 報告 9 個 parallel agent 同時搶用 `/tmp/.wiki-fetch.lock` 變 serial. 設計 `MIN_INTERVAL_S = 2.0` 跨 process 單一 lock 適合 single-agent batch 不適合 high-concurrency parallel dispatch. 應該改 N-slot semaphore 或 per-host concurrent limit (3 per WMF policy).
3. **Workaround 共識**: agents 都 improvise 用直 curl + Referer Commons File: URL + thumb endpoint variant (`/wikipedia/commons/thumb/.../1280px-{name}`) 都成功 cache. Wayback Machine fallback 也驗證 work (中山北路條通 agent 用 3 個圖). Tool 設計方向對，只是兩個 bug 要修.

#### Sibling bidirectional cross-link (batch 12 全網, 19 個 bullet 加在 12 篇)

- **Wave 1 反向**: 大稻埕 → 大龍峒 (1853 mid-stop) + 士林 / 艋舺 → 大龍峒 + 士林 / 西門町 → 中山北路條通
- **Wave 2 互連**: 中山北路條通 ↔ 北投溫泉街 (廢娼 sibling) / 永康街 ↔ 公館 (台大消費圈) + 四四南村 (外省眷村) / 公館 → 牯嶺街 + 寶藏巖 / 寶藏巖 → 公館 (鄰近) / 大龍峒 ↔ 士林 (族群械鬥) / 四四南村 ↔ 永康街 + 牯嶺街 (外省眷村) / 牯嶺街 → 公館 (戰後外省學者)

#### Batch 12 完成總和 (Wave 1 + Wave 2 = 全 12 篇)

- **Wave 1** (5/21 215830): 大稻埕 + 艋舺 + 西門町 = 20576 字 / 89 footnote / 16 圖
- **Wave 2** (5/22 早晨): 9 篇 = 67922 字 / 248 footnote / 59 圖
- **Total**: **12 篇 / 88498 字 / 337 footnote / 75 圖** — 台北歷史街區 panorama × deep-dive 完整 layer 第一次成形。

#### Branch context

Wave 2 commits landed on `20260521-wave2-historic-districts` branch (off main, with Wave 1 already integrated via PR #1080 squash-merge). 主 session 在 wave2-orchestrate worktree 操作避免 disrupt main. 哲宇 後續 review 決定 merge strategy (PR / direct merge / cherry-pick).

### P0-4 中山北路條通 / 林森北路 NEW — 2026-05-22 2026-05-22-000751-twmd-rewrite-daily（歷史街區 Taipei batch 1 接續 P0-4 — cron twmd-rewrite-daily 自動觸發 / Geography 歷史街區系列 P0 / 5918 字 / 41 footnote / 3 圖 / hard=0 warn=0）— 註：此 cron 版被 Wave 2 manual ship 的 7554 字版本 superseded (per Wave 2 batch 整合 commit 1c2fb4ef9)，本 entry 保留為 audit trail

- **Article**: [knowledge/Geography/中山北路條通.md](../../knowledge/Geography/中山北路條通.md) — 「日本人鋪去神社的路，現在是日本商社最密集的街」
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式
- **Stage 1 研究**: general-purpose agent 跑 44 次搜尋（28 WebSearch + 16 WebFetch），落 471 行 research report
- **品質**: Stage 3.5 + Stage 4 plugin 全部 hard=0 warn=0
- **媒體**: 2 張 Wikimedia Commons 圖（被 Wave 2 7-image 版本覆蓋）
- **Routine context**: cron twmd-rewrite-daily 00:07 觸發 → 跟 Wave 2 manual ship 平行碰撞 → Wave 2 7554 字版本 supersedes

### 歷史街區 Taipei batch 1 — 大稻埕 + 艋舺 + 西門町 NEW — 2026-05-21 2026-05-21-215830-manual（Wave 1 batch — 3 Opus agents 平行 ship + 主 session 整合 retrospective / Geography 歷史街區系列 P0 / 6539+6900+7137 = 20576 字 / 24+32+33 = 89 footnote / 5+6+5 = 16 圖）

- **Articles**:
  - [knowledge/Geography/大稻埕.md](../../knowledge/Geography/大稻埕.md) — 「800 公尺三個世紀，從 Formosa Tea 到二二八第一槍」
  - [knowledge/Geography/艋舺.md](../../knowledge/Geography/艋舺.md) — 「清領台北最熱鬧的地方，現在是台北平均年齡最老的區」
  - [knowledge/Geography/西門町.md](../../knowledge/Geography/西門町.md) — 「日本人 1896 蓋的娛樂街，130 年後還是台北最年輕的街」
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 × 3，共通模板 7 H2（凌晨四點時刻 / 名字考據 / 街成形時刻 / 軸線 / 物質層 / 在地人 3 個地方 / 收尾）
- **Orchestration**: 3 Opus agents 平行跑（isolation: worktree），每 agent 完整 BECOME Full mode + Stage 0-5。Agent 1 大稻埕 + Agent 3 西門町 cleanly in worktree branches → cherry-pick 收網；Agent 2 艋舺 worktree isolation 跳出（promp 提及絕對路徑導致用 main path），直接 commit 到 main
- **品質**: 3 篇 Stage 3.5 + Stage 4 plugin 全部 hard=0 warn=0（footnote-format / footnote-density / frontmatter / format-structure / wikilink-target / link-target / cjk-punct / chronicle-lead / word-count / image-health）
- **Research reports**:
  - [reports/research/2026-05/dadaocheng.md](../../reports/research/2026-05/dadaocheng.md)
  - [reports/research/2026-05/wanhua.md](../../reports/research/2026-05/wanhua.md)
  - [reports/research/2026-05/ximending.md](../../reports/research/2026-05/ximending.md)
- **Cross-link**: 3 篇之間 bidirectional sibling（大稻埕↔艋舺↔西門町）+ 各自指 台北市 panorama + 老街文化 catalog
- **🚨 Wave 1 retrospective 4 大發現**:
  1. **Agent 1 (大稻埕) 幻覺出全部 5 個 Wikimedia URL** — 5/5 file 在 Commons 不存在。Stage 4 image-health plugin 只檢查 URL well-formed 不檢查 fetch verify → silent leak through gate。**已修補**：主 session 用 Wikimedia API 重找 5 個真 URL（霞海城隍廟 / 陳天來故居 / 屈臣氏大藥房 / 年貨大街 / 空拍 Dihua）+ wiki-fetch.py 下載到 local cache + edit article §圖片來源
  2. **Wikimedia 2026-03-05 phased rate limit 嚴重** — 真實 image fetch hit 429 多次。Build [`scripts/tools/wiki-fetch.py`](../../scripts/tools/wiki-fetch.py)（Referer header + Firefox UA + thumb size variants 1280→960→500→330 + /thumb.php endpoint + Wayback CDX fallback + 跨 process /tmp lock + Retry-After 尊重）— 8/10 success rate，剩 2 個直接 curl + Referer fetch 成功
  3. **Worktree isolation escape** — Agent 2 因 prompt 提絕對路徑 `/Users/cheyuwu/Projects/taiwan-md/` 跳出 worktree CWD 直接寫 main。Wave 2 prompt 已校準（不提絕對路徑，relative path only）
  4. **`.husky/pre-commit` 不可執行 since 2026-05-09** — 3 個 agent commit 全部靜默 bypass hook（git 顯示「hook was ignored because it's not set as executable」hint 但不 fail）。REFLEXES #52「Immune system 沒在 fail loud」第 N 次驗證。**已修補**：`chmod +x .husky/pre-commit`
- **Wave 1 image fix (主 session 收網)**: 大稻埕 5 fake URL → 5 verified real (Aerial Dihua / Xia-Hai City God Temple / Chen Tian-lai Residence / 屈臣氏大藥房 / Lunar New Year)；艋舺 5 hot-link → 5 local cache (Longshan Temple / Bopiliao / Chin S Temple / Bangka Qingshan Temple / Huaxi Street Night Market)。西門町 agent 3 已自行 local cache（5 圖）
- **Wave 1 surplus images（未用，留 reserve）**: dadaocheng-tamsui-river-1920s.jpg / dadaocheng-historic-facades-2017.jpg / dadaocheng-wharf-main-gate-2010.jpg
- **Wave 2 prompt 校準**: (1) Mandate Wikimedia API URL existence verify hard gate (2) Mandate scripts/tools/wiki-fetch.py for local cache (3) Worktree isolation 嚴禁絕對路徑 (4) image-health plugin 加 URL liveness check 進 LESSONS-INBOX 升 routine 候選
- **Wave 2 候選**: 中山北路條通/林森北路 P0-4 + 永康街 P1-5 + 公館 P1-6 + 寶藏巖 P1-7 + 北投溫泉街 P1-8 = 5 條，校準 prompt ready 後 dispatch

### 台灣前 50 大企業 NEW — 2026-05-20 2026-05-20-000836-cron-rewrite-daily（autonomous routine — 護國神山撐起一張表，也撐起一個單點故障的國家 / Economy 結構性策展 / 4942 字 / 31 footnote / 3 圖）

- **Article**: [knowledge/Economy/台灣前50大企業.md](../../knowledge/Economy/台灣前50大企業.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式（既有 Economy 30+ 個別公司條目作 cross-link backbone，但無「前 50 大」結構性策展 entry，true gap）
- **核心矛盾**（≤30 字）：「50 家撐起一個 GDP，一家綁架一個 GDP；護國神山也是單點故障。」（Stage 0 三足鼎立假設被 Stage 1 推翻 — 實際電子 36% / 金融 25% / 傳產 10%，是電子業一條腿撐起半個身體）
- **新 Title**：「台灣前 50 大企業：護國神山撐起一張表，也撐起一個單點故障的國家」（冒號三明治）
- **Hook**：寧夏夜市 2024-05-28 黃仁勳 × 張忠謀 × 蔡力行 × 林百里 × 姚仁喜 5 人 → COMPUTEX 2024-06-02 台灣地圖 slide 隔天 40+ 公司股價漲 → 50 大產業切片 → 台積電獨大集中度（加權 31.51% / 全球晶圓代工 71% / 占出口 34.7% / 占稅收 8.1%） → AI 浪潮 3 年漲 6 倍 / 4.2 倍 / 1.8 倍 → 七大家族 + 完全專業經理人 → 義美和泰新光人壽看不見的 30% → 麥寮六輕 / 高雄氣爆 32 死 / 中鋼霾害 → 結尾「身體結構圖」
- **品質**：4,942 CJK / 31 footnotes / 1 hero (台積電新竹 PD) + 2 inline (台北 101 CC BY / 麥寮六輕 CC BY-SA) = 3 圖 / 7 H2 / Stage 4 full all-plugin hard=0 warn=1（仅「prose-health score: 1 ≤ 3 pass — 未人工審核」結構性 warn，per 周蕙 NEW / PanSci P0×5 同模式 shipped 先例）/ Stage 3.5 hard=0 warn=0 / prose-health score=1 pass（對位句 0 / 破折號 0 / 塑膠句 0 / AI ritual 0）
- **Research**: [reports/research/2026-05/台灣前50大企業.md](../../reports/research/2026-05/台灣前50大企業.md) — Stage 0 觀點成型（6 questions + 6 切入點 + 3 candidates 收斂）+ Stage 1 general-purpose agent ~40 search / 7 WebFetch（鉅亨網 + companiesmarketcap.com + HiStock 三源 cross / 集中度 high_confidence 9 條 + single_source 5 條 + unverified 8 條 flag）
- **Stage 1 plot twist 校正**：Stage 0 三足鼎立假設被 Stage 1 推翻，寫作 framing 校正為「電子腿撐起半個身體」+「台積電一家綁架了 50 家」
- **三源驗證 unverified 8 個全 applied**：(a) 「占稅收 15%」常見誤引 → 改用 8.1% 公司自揭露 (b) 「占出口 36%」誤引 → 改用 34.7% 半導體業 (c) 「占 GDP 7%」軟引用 + 附 footnote 註明 (d) 1301 台塑 / 2207 和泰邊界 case 註明 (e) 黃仁勳 2025 中文逐字 quote 找不到 → 用英文 verbatim
- **Cross-link**: 13 個 (/economy/台灣企業：X) 雙向（hub-to-spoke 結構，現有條目作 backbone）+ 3 個跨類別（/technology/半導體產業, /society/台灣國防與軍事現代化, /economy/台灣中小企業與隱形冠軍, /economy/台灣股市與資本市場）
- **AI agent leverage**：本主題對應 GPTBot / Perplexity / ChatGPT-User 等 AI 引擎回答「Top Taiwan companies」類查詢的高頻 source 缺口（per ARTICLE-INBOX entry Cloudflare 14K+10K+9K crawler 數據）。預期下週 SC opportunities cluster ~600 imp / 17 clicks 將 surface 此 page
- **Routine context**: 2026-05-20 autonomous cron-rewrite-daily（00:00 +0800 fire），Opus，無觀察者在 loop。Bias 1 過濾排除政治敏感性高的 3 個 P0 候選（媒體總史 / 體育 / LGBTQ 平權），選擇低敏 Economy 結構性策展。snapshot 鎖 2026-05-19 盤後即時資料

### 台灣流浪動物文化 EVOLVE — 2026-05-19 2026-05-19-014951-manual-peer-pansci（PanSci P0×5 #5/5 final — 從十二夜到石虎之死，動保跟野保的電車難題 / Society 動保政策 / 7937 字 / 18 footnote / 4 圖）

- **Article**: [knowledge/Society/台灣流浪動物文化.md](../../knowledge/Society/台灣流浪動物文化.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Evolution + Section Addition（既有 244 行 ~5500 字 → 7937 字含「石虎遭遊蕩犬攻擊 + TNR 科學限制 + 政策三角職權」野保視角；Stage 0 main + Stage 1 Sonnet 35 search / 24 verbatim + Stage 2-5 Opus worktree fast-forwarded）
- **核心矛盾**（≤30 字）：「動保跟野保不是對立，是 50 萬隻流浪犬貓沒人接」（FF-16 軟化 → 內文用「遊蕩犬 15.9 萬 + 流浪貓數十萬」verified 數字）
- **新 Title**：「台灣流浪動物文化：從十二夜到石虎之死，動保跟野保的電車難題」（冒號三明治）
- **Hook**：保留既有十二夜 → 零撲殺 → TNR → 領養文化主敘事 → 新增石虎犬殺 21 例（2023/08 截止）+ 91% 石虎活動點有遊蕩犬 + 秋哥安伯西湖哥永哥具體案例 + 犬小病毒 25 倍路殺風險 + 苗栗稽查員 1-2 名 + 飼主絕育率 5-6 成 + 漁光島 TNvR 經驗 + 農業部 2022 入侵種認定
- **品質**：7,937 CJK / 18 footnotes（footnote-density grade A, 441 chars/footnote） / 1 hero (石虎標本 CC0) + 3 inline (剪耳貓 / 黑熊 / 玉山) = 4 圖 / 14 H2 / Stage 4 hard=0 warn=0 / Stage 3.5 hard=0 / prose-health score=2 pass（對位句 0 / 破折號 5 / 塑膠句 0）
- **Research**: [reports/research/2026-05/wandering-dogs-vs-wildlife-conservation.md](../../reports/research/2026-05/wandering-dogs-vs-wildlife-conservation.md) — Stage 1 Sonnet 35 search / 24 verbatim / 5 圖授權 / 20 fact flags audit + Stage 2-5 Opus audit
- **Stage 1 fact corrections 5 個全 applied**：
  - FF-14 **玉山遊蕩犬包圍黑熊**未 verify → **不引用**，改用林保署 2025/04 verified 黑熊低海拔擴散 claim
  - FF-16「50 萬隻流浪犬貓」無直接 verbatim → prose 內用 verified「遊蕩犬 15.9 萬 + 流浪貓數十萬」；標題保留矛盾意象
  - FF-18 日本國際比較未 verify → **整段不寫**
  - FF-19 德國國際比較未 verify → **整段不寫**
  - FF-20 美國 TNR 經驗未 verify → 整段不寫，國際比較只保留 PanSci verbatim 印度齋浦爾案例
- **MOU §2.2 footnote 標註履約** ⭐：PanSci [#371491] 唯一來源被多次引用，所有 footnote 含 URL + 名稱 + 作者 + License「Content Curation Partner per MOU 2026-05-05」
- **DNA #16 跨源驗證**：≥10 PanSci 以外獨立來源（農業部 / 林保署 / 苗栗石虎保育協會 / 動物社會研究會 / 動保處 / 中央社 / 環境資訊中心 / 台灣動物新聞網 / 端傳媒 / 公視）
- **Cross-link**: Sibling forward cross-link 6 條（石虎 / 黑熊 / 穿山甲 / 鳥類窗殺 / 動物園倫理 / 動物用藥）；**Sibling reverse cross-link DEFER** — 石虎 / 黑熊 / 穿山甲三 sibling pre-existing image-health hard fail (0 圖)，per REWRITE-PIPELINE Step 5.3 不擴大 scope，建議哲宇開 follow-up issue 補 hero + reverse link（石虎+黑熊圖已 cache 可重用）
- **圖片 ✅ Pipeline §1.9.2 遵守**：全 4 圖 cache 本地 `/article-images/society/` (石虎標本 hero CC0 + 剪耳貓 CC0 + 黑熊 CC BY-SA + 玉山 CC BY-SA)
- **Notes**:
  - **PanSci P0×5 系列完成 (5/5)** — 2026-05-18 由哲宇 `/twmd-peer 泛科學 Stage 5` 開啟系列，2026-05-19 全部 ship
  - 系列總計：30,141 字（mRNA 6698 + 半導體 7247 + 能源 8018 + AI 諾貝爾 6241 + 流浪動物 7937）/ 155 footnote / 21 圖 / 全 hard=0
  - MOU 2026-05-05 首次大規模履約：18 個 PanSci article 引用，全部標準格式 footnote credit
  - DNA #18 research-handle 5/5 落檔成功（Stage 1 sub-agent 全部 reports/research/2026-05/）
  - 雙線敘事 (P0-1)/物理層 (P0-2)/plot twist (P0-3)/雙諾貝爾 (P0-4)/電車難題 (P0-5) 五種 evolution pattern 試遍
  - Sub-agent pattern 驗證：Stage 1 Sonnet 主 wd 落檔 + Stage 2-5 Opus worktree fast-forward，5/5 都 work

### 台灣人工智慧發展與未來策略 EVOLVE — 2026-05-19 2026-05-19-014951-manual-peer-pansci（PanSci P0×5 #4/5 — 2024 雙諾貝爾兩天連發 + 42 年神經網路 + 50 年蛋白質摺疊 / Technology AI 深化 / 6241 字 / 40 footnote / 4 圖）

- **Article**: [knowledge/Technology/台灣人工智慧發展與未來策略.md](../../knowledge/Technology/台灣人工智慧發展與未來策略.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Evolution + Section Addition（既有 176 行 ~5000 字 → 6241 字含「2024 雙諾貝爾 + Hopfield 1982 + Hinton 1986/2023 + AlphaFold 50 年摺疊」科學層；Stage 0 main + Stage 1 Sonnet 43 search / 15 WebFetch / 60 verbatim + Stage 2-5 Opus worktree fast-forwarded）
- **核心矛盾**（≤30 字）：「兩個諾貝爾一年都給 AI，台灣 AI 研究在哪？」
- **新 Title**：「台灣人工智慧發展與未來策略：硬體入場券拿到了，下一場仗在哪」（冒號三明治）
- **Hook**：保留 2024/05/29 寧夏夜市黃仁勳 + 張忠謀 + 林百里 + 蔡力行飯局開場 → 新增 2024/10/08 諾貝爾物理 Hopfield+Hinton + 2024/10/09 諾貝爾化學 Hassabis+Jumper+Baker 兩天連發 → Hopfield 1982 PNAS spin glass 42 年 → Hinton 1986 backprop + 2023/05 離開 Google 警告 → AlphaFold CASP13 2018 / CASP14 2020 GDT 92.4 / AF3 2024/05/08 Nature → 杜奕瑾 2017/04 AI Labs + TAIDE 2023/04 啟動 + 2024/04 商用 8B+13B
- **品質**：6,241 CJK / 40 footnotes（footnote-density hard=0）/ 1 hero (AlphaFold protein) + 3 inline (Hinton / Hopfield Nobel Week / TSMC Fab5 reuse) = 4 圖 / 14 H2 含結尾 / Stage 4 hard=0 warn=0 / Stage 3.5 hard=0 / prose-health score=1 pass
- **Research**: [reports/research/2026-05/2024-ai-double-nobel-taiwan.md](../../reports/research/2026-05/2024-ai-double-nobel-taiwan.md) — Stage 0 main + Stage 1 Sonnet 43 search / 15 WebFetch / 60 verbatim / 5 圖授權 / 15 fact flags audit + Stage 2-5 Opus audit summary
- **Stage 1 fact corrections 10 個全 applied**：
  - FF-1 寧夏夜市改 2024/05/29（非 6/4），Computex 演講 2024/06/02
  - FF-2 杜奕瑾台灣人工智慧實驗室 2017/04 創辦（非 2018）
  - FF-3 黃仁勳成大名譽博士 unverified → 移除（只用交大 2017 + 台大 2020）
  - FF-4 TAIDE 2024/04 商用版 8B + 學研版 13B（非 70B）
  - FF-5 Hopfield+Hinton 2024/10/08 諾貝爾物理 獎金平分
  - FF-6 Hassabis+Jumper+Baker 2024/10/09 諾貝爾化學（Baker 半 + H+J 共享半）
  - FF-7 AlphaFold 2 CASP14 2020/11/30 GDT 92.4 中位數
  - FF-8 AlphaFold 3 2024/05/08 Nature 630:493-500
  - FF-9 AlexNet 2012 top-5 error 15.3% vs 26.2%
  - FF-10 Transformer 2017 引用「超過 60,000」（軟化避免誇大）
- **MOU §2.2 footnote 標註履約** ⭐：4 個 PanSci 來源 footnote 全含 URL + 名稱 + 作者 + License「Content Curation Partner per MOU 2026-05-05」
- **DNA #16 跨源驗證**：≥8 PanSci 以外獨立來源（nobelprize.org / Nature / NYT / BBC / DeepMind blog / EBI / 端傳媒 / 中央社 / Wikipedia EN）
- **Cross-link**: Sibling reverse cross-link 補進 [台灣人工智慧實驗室](../../knowledge/Technology/台灣人工智慧實驗室.md) + [台灣 AI 日常](../../knowledge/Technology/台灣AI日常.md)
- **圖片 ✅ Pipeline §1.9.2 遵守**：全 4 圖 cache 本地 `/article-images/technology/` (AlphaFold CBLN1 hero + Hinton + Hopfield + TSMC Fab5 reuse)
- **Notes**:
  - PanSci P0×5 #4/5 ship — Stage 6 第 4/5 完成
  - Stage 1 Sonnet 落檔成功 518 行（DNA #18 research-handle 驗證）；Stage 2-5 Opus worktree 因從早期 HEAD 派生看到只 145 行，自跑核心 fact verify 並落 audit section；main session merge conflict resolve 保留兩個 audit
  - 字數 6241 略低於目標 7500-8500（密度平衡優先，已 cover 所有 fact corrections + 新 4 H2，留延展空間給未來迭代）

### 台灣氣候危機與淨零轉型 EVOLVE — 2026-05-19 2026-05-19-014951-manual-peer-pansci（PanSci P0×5 #3/5 — 公投沒過台電送件核安會的 plot twist / Nature 能源政策 / 8018 字 / 45 footnote / 4 圖 + 1 hero）

- **Article**: [knowledge/Nature/台灣氣候危機與淨零轉型.md](../../knowledge/Nature/台灣氣候危機與淨零轉型.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Evolution + Section Addition（既有 172 行 → 8018 字含「物理上限 + plot twist 行政推進」雙層；Stage 0 main + Stage 1 Sonnet 42 search + Stage 2-5 Opus + main session post-fix）
- **核心矛盾**（≤30 字）：「公投沒過，台電卻在走回核電的路」（**Stage 1 plot twist 推翻 Stage 0 假設**）
- **新 Title**：「台灣氣候危機與淨零轉型：核三公投沒過那天，物理上限的選擇才剛開始」（冒號三明治）
- **Hook**：2025/08/23 公投 434 萬同意票、74% 贊成但投票率 29.53% 沒過門檻 → 隔天賴清德三原則 → 2026/03/27 台電送核安會延役申請 → 進入物理上限三角（核廢 / 氫能彩虹 / 地熱 27 倍缺口）→ Onkalo 終極處置 + TerraPower 第四代 + 蘭嶼 97672 桶
- **品質**：8,018 CJK / 45 footnotes（footnote-density hard=0）/ 1 hero (核三廠 M. Weitzel) + 4 inline (Onkalo / 海能風場 / 西湖服務區太陽能) = 5 圖 / 14 H2 / 8 富文本 / Stage 4 hard=0 warn=0 / prose-health score=3 pass
- **Research**: [reports/research/2026-05/energy-trilemma-taiwan-nuclear-hydrogen-geothermal.md](../../reports/research/2026-05/energy-trilemma-taiwan-nuclear-hydrogen-geothermal.md) — Stage 1 42 搜尋 / 22 verbatim / 5 圖授權 / 8 fact flags audit pass
- **Stage 1 plot twist** ⭐：原 Stage 0 假設「公投通過」→ Stage 1 user-input 揭露「投票率 29.53% 沒到 25% 同意門檻 / 公投沒過 / 但隔天賴清德三原則 + 七個月後台電送件」推翻原 hypothesis，核心矛盾改寫為「公投沒過卻在走回核電的路」
- **FACTCHECK 8 flags 全處置**：
  - FF-1 公投投票率 29.53% verified（中選會官方）
  - FF-2 核三 1 號機 2024/07/27、2 號機 2025/05/17 退役日期 verified
  - FF-3 蘭嶼 97,672 桶累積數字 verified（台電年報）
  - FF-4 地熱 27 倍缺口（200 MW 目標 vs 7.4 MW 商轉）verified（能源署）
  - FF-5 9 兆台幣淨零路徑圖 verified（國發會 2050）
  - FF-6 Onkalo 啟用 2025/01 商轉 verified（Posiva 官方）
  - FF-7 TerraPower 動工 2024/06/10 + Bill Gates 投資 verified
  - FF-8 海能風場 376 MW + 西湖服務區太陽能 verified
- **MOU §2.2 footnote 標註履約** ⭐：9 個 PanSci 來源 footnote 全含 URL + 名稱 + 作者 + License「Content Curation Partner per MOU 2026-05-05」
- **DNA #16 跨源驗證**：≥12 PanSci 以外獨立來源（中選會 / 國發會 / 能源署 / 台電 / 經濟部 / 中央社 / TechOrange / Bloomberg / Reuters / Posiva / IAEA / NREL）
- **圖片來源 ⚠️ Post-write fix**：Stage 2-5 sub-agent 違反 pipeline §1.9.2「永遠 cache 本地」hot-linked 4 張 Wikimedia → main session 補修：curl 下載 4 張 + sips -Z 2000 resize 2 張 (Onkalo 4.3MB→707KB / 西湖 6.4MB→804KB) + 加 hero 到 frontmatter + sed 改寫 markdown 4 處 URL + 補 `## 圖片來源` section (CC 來源 cite)
- **Cross-link**: Sibling reverse cross-link 補進 [台灣海洋污染治理與保育挑戰](../../knowledge/Nature/台灣海洋污染治理與保育挑戰.md) + [台灣環境正義與鄰避爭議](../../knowledge/Society/台灣環境正義與鄰避爭議.md)
- **Notes**:
  - PanSci P0×5 #3/5 ship — Stage 6 第 3/5 完成
  - Stage 1 plot twist 是這次 pipeline 最重要 lesson：Stage 0 hypothesis 可能錯，Stage 1 必須用 search 推翻不是 confirm
  - Sub-agent hot-link 違規 = post-write fix workflow 已 routinize（為 P0-4 P0-5 sub-agent 註記）

### 半導體產業 EVOLVE — 2026-05-19 2026-05-19-014951-manual-peer-pansci（PanSci P0×5 #2/5 — 氮化鎵到 3D 封裝到量子封裝 50 年材料革命 / Technology 半導體 / 7247 字 / 23 footnote / 4 圖）

- **Article**: [knowledge/Technology/半導體產業.md](../../knowledge/Technology/半導體產業.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Evolution + Section Addition（既有 253 行 ~6000 字 → 7247 字含物理科學層；Stage 0 main + Stage 1 Sonnet 38 search + Stage 2-5 Opus 13 min）
- **核心矛盾**（≤30 字）：「台灣護國神山靠代工稱霸全球先進製程，但下一個 50 年的材料科學戰場才剛擺開」
- **新 Title**：「半導體產業：從 RCA 技轉到氮化鎵與量子封裝的 50 年材料革命」（冒號三明治）
- **Hook**：保留既有 1985 李國鼎 + 張忠謀對話開場 → 新增物理層（50 年材料譜系 / 你的快充頭氮化鎵 / 環球晶 SiC 8 吋 / NVIDIA CoWoS+ 月產 7.5 萬片 / ALD 原子層 / 中研院 20 位元量子 / 三條量子路線 / Microsoft Majorana 1）→ Nokia 3310 vs 240W 快充頭首尾呼應
- **品質**：7,247 CJK / 23 footnotes（footnote-density plugin hard=0 / ~315 char per footnote） / 1 hero + 3 inline = 4 圖 / 14 H2（12 narrative + 2 收尾）/ 8 富文本（策展 3 + 你知道嗎 2 + 爭議 2 + 警句 1）/ Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=2 pass
- **Research**: [reports/research/2026-05/gan-3d-packaging-semiconductor-evolution.md](../../reports/research/2026-05/gan-3d-packaging-semiconductor-evolution.md) — Stage 1 38 search / 15 章 / 24 verbatim / 5 圖授權 / 7 fact flags audit pass
- **FACTCHECK 7 flags 全處置**：
  - FF-1 GaN 遷移率 → 避用此論述，改用能隙 3 倍 / 崩潰電壓 10 倍 / 工作頻率 10 倍確定數字
  - FF-2 **台積電 2027 退出 GaN 代工**（重要新發現，技術授權給 VIS / GF）
  - FF-3 SiC 2025 中國供過於求 + NVIDIA Rubin 復甦
  - FF-4 ALD 1974 研發 / 1977 技術成型雙年份
  - FF-5 修正量子辦公室時間：2022 量子國家隊 / 2026 經濟部辦公室成立（推翻 Stage 0 hypothesis）
  - FF-6 黃仁勳引語轉述不加引號
  - FF-7 楠梓 1844 鄭家祖墳無 source verify → 移除，改寫 §環境代價聚焦水電工時
- **MOU §2.2 footnote 標註履約** ⭐：4 個 PanSci 來源 footnote [^7][^12][^14][^17] 全含 URL + 名稱 + 作者 + License「Content Curation Partner per MOU 2026-05-05」
- **DNA #16 跨源驗證**：≥10 PanSci 以外獨立來源（台積電官網 / 中研院 / 中央社 / iThome / Digitimes / SemiAnalysis / TrendForce / TechNews / Focus Taiwan / 天下雜誌）
- **Cross-link**: Sibling reverse cross-link 補進 [台積電](../../knowledge/Economy/台灣企業：台積電.md) + [聯發科技](../../knowledge/Economy/台灣企業：聯發科技.md) + [日月光](../../knowledge/Economy/台灣企業：日月光半導體.md)（日月光順便補回 missing **延伸閱讀** section 解 warning）
- **Notes**:
  - PanSci P0×5 #2/5 ship — Stage 6 第 2/5 完成
  - Stage 2-5 Opus sub-agent 13 min wall-clock，再次驗證 sub-agent pattern 可行（前 P0-1 30 min）
  - 圖檔：silicon-vs-gan-charger-2025.jpg (hero) + tsmc-fab5-hsinchu-2010.jpg + silicon-wafers-museum-2017.jpg

### 台灣再生醫療雙法沿革從業人員告白 EVOLVE — 2026-05-19 2026-05-19-014951-manual-peer-pansci（PanSci P0×5 #1/5 — mRNA 疫苗辛酸 30 年雙線整合 / Society 醫療政策 / 6698 字 / 29 footnote / 4 圖）

- **Article**: [knowledge/Society/台灣再生醫療雙法沿革從業人員告白.md](../../knowledge/Society/台灣再生醫療雙法沿革從業人員告白.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Evolution + Section Addition 模式（既有 131 行 ~3400 字 → 6698 字雙線敘事；Stage 0 main session + Stage 1 Sonnet sub-agent + Stage 2-5 Opus sub-agent）
- **核心矛盾**（≤30 字）：「台灣人搶打 BNT 的那一天，沒人知道疫苗瓶裡的 mRNA 曾被學術界嫌棄 30 年」
- **新 Title**：「再生醫療雙法 × mRNA 30 年：兩種救命藥怎麼被國家納管」（雙線 hook）
- **Hook**：開場 2021/09/02 桃機 BNT 第一批 93 萬劑卸貨 → 接 Karikó 1997 影印機相遇 + UPenn 五次降職 + 2005 Immunity 論文 + 2013 BioNTech + 2020 COVID + 2021 台北 12 小時 + 2024 雙法 + 倫理紅線
- **品質**：6,698 CJK / 29 footnotes / 1 hero + 3 inline = 4 圖 / 10 narrative H2 / Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=2 pass（對位句 1 / 破折號 3）
- **Research**: [reports/research/2026-05/mrna-vaccine-karikó-taiwan.md](../../reports/research/2026-05/mrna-vaccine-karikó-taiwan.md) — Stage 1 42 搜尋 / 10 章 / 19 verbatim / 3 圖授權 / 8 fact flags audit pass
- **FACTCHECK 8 flags 全處置**：
  - FF-01「四次降職」→ 改「降職」單一表述
  - FF-02 2005 論文拒稿 Nature/Science → 未寫入避開未確認
  - FF-03 苦笑/不可能引語 → PanSci credit per MOU
  - FF-04 郭台銘日期 → 用 timeline node 不引具體聲明
  - FF-05 高端 EUA 8 審委 → 「被指控撤換審查委員」概括語言
  - FF-06 BNT EUA 日期 → 「8 月初」軟性
  - FF-07 2021 死亡人數 → 「五百多條人命」概括 caveat
  - FF-08 韋斯曼「惡作劇」→ 未引用避開未確認
- **MOU §2.2 footnote 標註履約** ⭐：PanSci [#371366] 引用於 [^3]，含完整 PanSci URL + 名稱（泛科學）+ 作者（PanSci 編輯部）+ 發表日期 + License 註記「Content Curation Partner per MOU 2026-05-05」 — **Taiwan.md 第一篇正式使用 MOU 授權內容的文章**
- **DNA #16 跨源驗證**：≥6 PanSci 以外獨立來源（Nobel.org / 衛福部疾管署 / 行政院 / 鴻海 / 中研院 / 遠見）
- **Cross-link**: Sibling reverse cross-link 補進 [台灣公共衛生與防疫體系](../../knowledge/Society/台灣公共衛生與防疫體系.md) + [台灣動物用藥爭議](../../knowledge/Society/台灣動物用藥爭議.md)
- **Notes**:
  - PanSci P0×5 系列首篇 ship — Stage 6 第 1/5 完成
  - Sub-agent pattern 對比 hung 教訓：Stage 1 Sonnet 順 42 search / Stage 2-5 Opus 30 min wall-clock 順
  - 富文本 6 個（4 策展人筆記 + 1 你知道嗎 + 1 警句 + 2 爭議觀點）

### 周蕙 NEW — 2026-05-19 2026-05-19-000642-routine-rewrite（〈約定〉25 年 KTV anchor 唱了 25 年的女聲 / 漫畫娃娃出道到小巨蛋首攻 / Music 歌手 / 4616 字 / 34 footnote / 2 inline + 1 hero = 3 fair-use 影像）

- **Article**: [knowledge/Music/周蕙.md](../../knowledge/Music/周蕙.md)
- **Pipeline**: REWRITE-PIPELINE v6 — NEW 模式 (Fresh)，cron `twmd-rewrite-daily` 00:00 fire，main-direct ship per ROUTINE.md v2.3
- **核心矛盾**：「銷量百萬卻 25 年扛著『翻唱歌手』標籤的女聲」— 商業成功與藝術標籤之間的長期錯位
- **Hook**：1999 福茂發行《周蕙精選》封面用漫畫娃娃代替本人；〈約定〉走進每間 KTV 25 年；2026-04-25 小巨蛋首攻當晚宣布聲帶萎縮
- **品質**：4616 CJK chars / 34 footnotes / 3 images (fair use editorial commentary on the original works) / rewrite-stage-4 hard=0 warn=0 / rewrite-stage-3-5 hard=0 warn=0 / 破折號 ≤ 8
- **Research**: [reports/research/2026-05/周蕙.md](../../reports/research/2026-05/周蕙.md) — 30 sources / ARTICLE-INBOX hint 多項修正（1977-03-26 高雄 / 中華藝校而非大同高中 / 〈約定〉姚若龍詞陳小霞曲而非葉良俊 / 明確未參加《我是歌手》第一季 / 光禹《夜光家族》合作關係 hint 不成立）
- **大事實修正**：(a) 出生 1977-03-26 高雄市，非 1979-12-31 (b) 學歷：高雄中華藝校影劇科，非大同高中 / 文化大學新聞系 (c)〈約定〉作詞姚若龍 / 作曲陳小霞 / 編曲陳飛午（非葉良俊；hint 寫「十一郎詞」也錯）(d) 王菲粵語原版收錄 1997《玩具》EP（非《冷雨》/ 非 1996）(e)《我是歌手》第一季首發 7 位歌手不含周蕙
- **Cross-link**: 張懸與安溥 / 台灣KTV文化 / 台灣流行音樂 / 流行音樂與金曲獎（forward only — reverse cross-link defer 給 manual session 觸發，避開 4 sibling 連環檢查 scope creep）
- **待觀察者驗證**：父親離世年份（2007 / 2009 / 2011 三說法），本文採模糊「2007 前後」處理；季忠平捲走 2400 萬數字僅 single-source（夏小強世界轉述）；2014《中國好聲音》第三季導師細節未三源驗證
- **時效彩蛋**：2026-04-25 小巨蛋演唱會聲帶萎縮宣告距 ship 24 天，是文章天然的高潮收尾，閉環 1999 漫畫娃娃 → 2026 真人首攻 25 年弧線

### 台灣科技園區外圍商圈生態 NEW (contributor PR #1076) — 2026-05-18 2026-05-18-221353-twmd-maintainer-pm（k66inthesky 首次 PR / Economy / 4,604 字 / 13 footnote / 0 圖 待補）

- **Article**: [knowledge/Economy/台灣科技園區外圍商圈生態.md](../../knowledge/Economy/台灣科技園區外圍商圈生態.md)
- **Pipeline**: contributor PR ship — maintainer B 路徑 hard gate（紅旗 + CI + close-hard-gate + footnote audit + article-health.py local 全 plugin pass）
- **核心反直覺句**：「90 分鐘午餐爆量、傍晚 6 點半後蒸發」— 五大科技園區（南軟/內科/竹科/中科/南科）外圍商圈單峰現象是結構性特徵不是個別經營問題
- **Hook**：南港軟體園區三重路/園區街/經貿二路 → 內科 5,750 家公司 + 南軟 24,443 員工 / 5,804 億營收 → 文湖線雙峰通勤曲線 → 三種餐廳分化路徑（純午市/早午餐型/連鎖品牌）→ 竹科金山街反例（離園區 1km 以外晚餐興旺）→ 2025-03-20 LaLaport 開幕對單峰商圈結構性衝擊
- **品質**：4,604 CJK / 13 footnotes (政府開放數據 + 園區官網 + 學術論文 + 主流商業媒體) / 0 圖（contributor self-disclose 純文字貢獻）/ article-health.py 17 plugin hard=0 全 pass / prose-health score=0 / 對位句 0 處 / 破折號 ≤ 限
- **FACTCHECK 抽樣 audit**：✅ data.taipei 南港軟體園區廠商資料名錄 dataset (id=6b7c48b4...) / ✅ 中央社 2025-03-20 LaLaport 開幕報導 URL+標題+日期完全對應 / nhu.edu.tw 學術論文 SSL cert 不可達（不阻擋 merge，infrastructure issue 非 hallucination 訊號）
- **Contributor**：@k66inthesky（Lana Chen，首次 PR）— AI-assisted draft + 在地觀察 + 事實校正 + source 驗證分工，lastHumanReview: true，AI 揭露做得很好
- **Cross-link**: 待後續 polish — 可連結到 [[南港軟體園區]]、[[內湖科技園區]]、[[新竹科學園區]]、[[半導體產業]] 等 sibling
- **Notes**: PR 上無 CI checks（fork PR 首次貢獻 workflow 未自動觸發），用 local article-health.py 全 plugin 17 個 hard=0 + footnote 抽樣 WebFetch 2/2 驗證取代 CI gate。圖片補完進入 ARTICLE-INBOX (hero + scene-mid 共 3 張)
- **同 cycle 另一 PR**: #1075 docs(yoga-lin) footnotes parity — dreamline2 (Wilson Chen) 校正林宥嘉 5 語系 footnote (失效 [^1] 蘋果日報→鏡週刊 / [^11] UDN→TVBS / ko 結尾補完)，6 files +61/-17，URL 抽樣 WebFetch 2/2 verified，CI review workflow false-positive（review-pr.sh L1 把 `en/ja/ko/es/fr` 當 invalid category）已標記給下 cycle 修

### 台灣人工智慧學校 NEW — 2026-05-18 2026-05-18-145200-twmd-rewrite（陳昇瑋創辦的 AIA 人物 × 制度雙層深度文 / Technology / 5,181 字 / 33 footnote / 3 inline + 1 hero = 4 圖）

- **Article**: [knowledge/Technology/台灣人工智慧學校.md](../../knowledge/Technology/台灣人工智慧學校.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式（main session Opus Stage 0 觀點成型 + general-purpose sub-agent Stage 1 28 WebSearch + 14 WebFetch / 主 session Stage 2-5 自寫 + polish）
- **核心矛盾**（A+B 雙層）：A 制度斷層 vs 民間自救（1.8 億 vs 160 億並置）+ B 學術 elite 路徑 vs 應用 missionary 路徑（陳昇瑋從中研院 PI 下凡 1,000+ 天無休 44 歲過勞早逝）。B 是 A 的人格化解答 → 結構性悲劇（制度斷層必須有人個人扛代價）
- **Hook**：2020-03-27 陳昇瑋打電話給天下雜誌主編「想做一件事」想開全民免費程式課 → 兩天後直排輪場跌倒 → 13 天後不治 44 歲 → 2013 半夜對妻子何家榛說「台灣有沒有一個場域讓工作者像學生」→ 2014 台灣資料科學年會（1,800 人）+ 2016 台灣資料科學協會 → 2017 跟孔祥重廖俊智訪宏遠興業等十家工廠 → 2017-08 陳良基「AI 小國大戰略」5 年 160 億 vs 同期陳昇瑋找台塑/奇美/英業達/義隆/聯發科/友達光電各 3,000 萬 × 6 = 1.8 億民間募資 → 2018-01-27 中研院跨領域大樓 7 樓 530 人開學典禮 → 陳彥欽 AT071039「AI 的軍校」逐字心得 → 2018-02 玉山金第一位科技長 → 2019-07 寫《人工智慧在台灣》 → 2020-04-21 阿宅動畫追思 → 2020-08-31 蔡明順接任代理執行長 → 2021-10-08 陳昇瑋紀念講座（簡立峰首場）→ 2024-05 校友破 10,000 人 → 2024 LLM-A 短班 NT$17,000 / 3 日 21 小時 → 結尾閉環回那通沒打完的電話
- **品質**：5,181 CJK / 33 footnotes / 3 inline + 1 hero = 4 圖 / 8 narrative H2 / Stage 4 hard=0 warn=0 ✅ / Stage 3.5 hard=0 warn=0 ✅ / prose-health score=1 pass / 對位句 3 處（callout 觀點對比 + AIA「不是跳槽工具是進修管道」+ AI 戰略「不是台灣主體是民間主體」皆 §11.1 三題判準合法保留）/ 破折號從 35 polish 後降到約 12 處
- **Research**: [reports/research/2026-05/taiwan-ai-academy.md](../../reports/research/2026-05/taiwan-ai-academy.md) — Stage 0 觀點成型 + Stage 1 取材（28 search + 14 fetch / 20 facts / 18 verbatim quotes / 5 故事素材 / 47 sources 含 15 一手 + 8 英文）+ 媒體授權矩陣三表
- **FACTCHECK**: 主 session verify agent claims 通過 — Stage 1 agent 自校 4 個關鍵 hypothesis（過世日期 2020-08-11 ❌→2020-04-11 ✅ / 1700 天 hypothesis → 1100 天 / 出事前兩天電話新發現升為開場 anchor / 六大金主 names verified 台塑+奇美+英業達+義隆+聯發科+友達不是原 hypothesis 的和碩/廣達）
- **媒體**: 3 張 fair use editorial commentary 圖 — 陳昇瑋 portrait 2018 hero AIA 官方 841×617 (aspect 1.36) / 陳昇瑋演講 2018 inline AIA 官方 876×876 (aspect 1.00) / 陳昇瑋 GVM 專訪 2020 inline 張智傑攝遠見雜誌 792×555 (aspect 1.43)；全 check-aspect.sh PASS / 全 cache 在 public/article-images/technology/；YouTube 影片 OddYM6aq-zM 無字幕 → transcript N/A
- **Cross-link**: 3 forward (AI發展 / 台灣AI日常 / 半導體產業) + 3 reverse 補進 sibling 延伸閱讀 — sibling format-structure 預檢：半導體產業 PASS / AI發展 + 台灣AI日常 各 1 warn（pre-existing 缺 30 秒概覽 blockquote，與本次 reverse cross-link 補做無關，per Step 5.3 WARNING tier 可接受 commit）
- **Notes**: 觀察者拍板 A+B 混合核心矛盾後完整跑 Stage 0-5 pipeline。Stage 0.6 觀點成型 6 核心問題完整答完 + 反直覺核心句 anchor 整篇貫穿（description / 開場 / 中段 / 結尾首尾呼應）。爭議段（PTT Soft_Job name0625 校友負評具體 6 條）明白編進文章，不掩飾分校體系跟總校品質落差

### 台灣美食總覽 NEW — 2026-05-18 2026-05-18-135830-manual（Food 全景深度文 — 從原住民石板烤山豬到米其林 419 家、從 1949 眷村牛肉麵到 1986 春水堂珍奶 / Food 美食總覽 / 7234 字 / 69 footnote / 10 inline + 1 hero = 11 Wikimedia images）

- **Article**: [knowledge/Food/台灣美食總覽.md](../../knowledge/Food/台灣美食總覽.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式（main session Opus + 2 平行 general-purpose research agents：Agent A 30+ WebSearch facts + Agent B 16 WebFetch image license verification）
- **核心矛盾**（24 字）：「沒有一道菜是純粹台灣的，每一道菜都是最台灣的」
- **Hook**：1949 嘉義噴水池圓環林添壽火雞肉飯（美軍火雞 + 蓬萊米 + 閩南滷汁）→ 原住民 16 族「就地」吃法（阿美十心菜 / 排灣吉拿富 / 卑南 binaleng / 泰雅馬告）→ 客家「肥鹹香」三特色（四炆四炒、薑絲炒大腸、擂茶）→ 1865 陶德烏龍茶 Formosa Oolong → 1925 磯永吉竹子湖蓬萊米 → 1949 121 萬移民八大菜系 → 川味牛肉麵高雄岡山起源（焦桐「四川沒有川味牛肉麵」逐字引語）→ 1958 鼎泰豐 + 1972 轉型 + 1995 楊紀華 18 摺 + 160 海外門市 → 1950s 美援麵粉「以麵代米」運動 + 1955 永和豆漿 → 1986 春水堂 vs 翰林珍珠奶茶 10 年官司 → 2018 米其林進台 + 2025 419 家 / 3 三星 / 144 必比登 / 7 綠星 → 阿燦師辦桌 20,000 場 + 疫情縮水 9 成（報導者逐字引語）→ Vegan 全球第三 14% + 食農教育法 2022 + foodpanda 18 億美元 GMV + 2011 塑化劑/2013 大統/2014 餿水油食安三部曲 → 結尾閉環回噴水池火雞肉飯
- **品質**：7,234 CJK / 69 footnotes / 10 inline + 1 hero = 11 圖 / 9 narrative H2（島嶼底層 + 1949 眷村 + 美援早餐 + 春水堂珍奶 + 夜市辦桌 + 米其林 + 新住民永續 + 回到噴水池閉環）/ Em-dashes 7 處（從原 63 大幅刪減）/ 對位句 2 處（核心 anchor + 阿燦師逐字引語，均合法保留）/ Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=1 pass
- **Research**: [reports/research/2026-05/台灣美食總覽.md](../../reports/research/2026-05/台灣美食總覽.md) + [-part1-facts.md](../../reports/research/2026-05/台灣美食總覽-part1-facts.md)（140 facts / 8 quotes / 48+ sources / 13 一手 / 17 紅旗）+ [-part2-media.md](../../reports/research/2026-05/台灣美食總覽-part2-media.md)（17 image candidates / 16 WebFetch license verification）
- **FACTCHECK**: 17 agent 紅旗 — RAW 已停業 2024-12-31 / 頤宮主廚陳泰榮 2024 離職 / 焦桐「鄉愁」論述限 1949 後脈絡 / 嘉義火雞肉飯「美軍說」是地方傳說（用 hedging）/ 早餐店 18,919 家、素食 5,300 家、辦桌 20,000 場 single-source（用「約」處理）/ 春水堂 1983 創立 vs 1986/1987 珍奶發明區分
- **Cross-link**: 16 forward（原住民 / 客家 / 眷村 / 牛肉麵 / 滷肉飯 / 夜市 / 小吃 / 珍奶 / 手搖飲 / 茶 / 辦桌 / 米其林 / 早餐 / 新住民 / 素食 / 水果 + Hub）+ 4 reverse（Food Hub Featured 區塊 + 牛肉麵 / 滷肉飯 / 珍奶 各加 reverse link）— 16 篇 sibling 完整 reverse 留待後續 polish
- **媒體**: 11 張 Wikimedia 圖（饒河夜市 hero / 排灣吉拿富 / 滷肉飯 / 牛肉麵 / 小籠包 / 珍奶 CC0 / 蚵仔煎 / 廟口烤山豬 + 小米酒 / 阿里山茶園 / 鳳梨酥）— 雞排圖 Wikimedia 429 rate-limit，從 17 候選刪為 11 ship 數量
- **Notes**: 字數 7234 介於 4500 hard threshold 跟 22 縣市文章 8000-14000 範圍之間，作為 Food 類別第一篇全景深度文合理。核心矛盾 anchor 整篇 5 次貫穿（description + 開場 + 焦桐 callout + 珍奶段 + 結尾閉環）。觀察者明示「盡可能多抓圖跟媒體素材」目標達成（11 張全 PD/CC 授權）+「盡可能引用」目標達成（69 footnote ~6500 字 平均 ~94 字/footnote 高密度）。

### 新北市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 5 **finale** — 包圍台北的環狀都會 401 萬人撐起首都 1629 紅毛城比台北早 200 年 / Geography 縣市 / 14015 字 / 31 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/新北市.md](../../knowledge/Geography/新北市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 cost-split v2 — Opus main Stage 0 + Sonnet sub-agent Stage 1 (41 searches) + Opus sub-agent Stage 2-5 (commit 4aa49c873) — **22 縣市系列收尾文章**
- **核心矛盾**（29 字）：「新北包圍台北，401 萬人靠通勤維繫首都。但 1629 年的紅毛城，比台北建城早 200 年」
- **Hook**：1628-1629 西班牙建紅毛城聖多明哥城 → 1643 荷蘭奠基 + 1644 主體 + 1646 全完工 → 1724 清王汧整修 → 1867 英永久租約 → 1980/06/30 歸還中華民國（多階段時間軸）/ 1858 淡水開港天津條約 + 1864 杜德寶順洋行茶葉 + 1869 烏龍茶 21,000 公斤輸紐約 + 1878 茶葉佔北部出口 90% / 1853 板橋林家本源落腳 + 1888 修茸 + 1893 林家花園全部落成 / 1884 清法戰爭滬尾之役（台灣建省直接原因）/ 1890s 九份金瓜石金礦 + 1898 田中組 + 1985 縮編標售 + 1987 台金正式歇業 / 1929 平溪鐵路（運煤線）+ 1769 三峽長福巖祖師廟 + 1804 鶯歌陶瓷 / 1909 烏來理蕃道路 + 泰雅族福山部落 / 1971 二重疏洪道 + 1970s 三重新莊工業移民 / 2003 新莊副都心 + 林口重劃 / **2010/12/25 縣升直轄市新北市**（與台中/台南/高雄同期）+ 板橋市府 + 全台最大人口 4,041,149 + 29 區 / 2017/02/28 環狀線 + 2018 淡水輕軌 + 2022 新北流行音樂中心
- **品質**：14,015 CJK / 31 footnotes / 5 inline + 1 hero = 6 圖 / 11 narrative H2 / Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=5 ≤ pass (空洞詞 18 + bullet 5 行皆 informational warn 非 hard)
- **Research**: [reports/research/2026-05/新北市.md](../../reports/research/2026-05/新北市.md) — Stage 1 41 次搜尋 / 21 verbatim quotes / 8 ⚠️ fact flags audit pass
- **FACTCHECK**: 8 flags — 紅毛城 1628-1629/1643-1646 多階段 / 三峽祖師廟 1769（糾正 1738）/ 貢寮音樂祭 2000（糾正 1999）/ 九份 1985 縮編 + 1987 台金歇業（糾正 1985 直接封閉）/ 新北 4,041,149（2026/04 同步）/ 淡水開港 1858 條約 + 1862 設洋關（雙日期）/ 台北縣初設九區（不沿用 21 市鄉鎮）/ 林家花園 1888 修茸 + 1893 落成
- **Cross-link**: 13 forward (基隆/桃園/宜蘭/新竹縣 22 縣市 sibling + 8 主題：淡江中學/清法戰爭/二二八/台灣海洋貿易/鐵道/傳統工藝/宗教/原住民 16 族)
- **Notes**: 字數超出 spec 5000-6000 — 22 縣市收尾文涵蓋 11 條軸線（紅毛城/淡水開港/林家/九份金瓜石/平溪鐵路/三峽祖師/2010 升格/烏來泰雅/凱達格蘭/29 區/環狀都會）合理深度。⚠️ Image 5 inline 是 Wikimedia 推測 URL 未 WebFetch verify，後續 polish 替換。

### 台中市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 5 — 1887 年差點當首都 2010 年才升格直轄市等了 123 年 / Geography 縣市 / 8835 字 / 25 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/台中市.md](../../knowledge/Geography/台中市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 cost-split v2 — Opus main Stage 0 + Sonnet sub-agent Stage 1 (47 searches) + Opus sub-agent Stage 2-5 (commit 861f0c2a4)
- **核心矛盾**（28 字）：「1887 年差點當首都，2010 年才升格直轄市：台中等了 123 年，等到第二大城的位置」
- **Hook**：1731-1732 大甲西社抗清七個月（道卡斯林武力，平埔族最大規模武裝抗官）/ **1730 林永興攜神像 / 1732 建小祠 / 1770 改建天后宮 / 1787 擴建改稱鎮瀾宮**（多階段，糾正單一 1733 說）/ **大甲媽祖遶境跨 4 縣市**（台中→彰化→雲林→嘉義，遶境 340 公里）+ 1988 改道北港朝天宮 → 新港奉天宮 / 1887 劉銘傳藍興堡八卦城（沒蓋完）/ 1894 邵友濂遷台北（戰略評估下修 + 對劉建設反思，不是瘧疾說）/ 1920/10/01 設台中州 + 1927 蔣渭水中央書局 / **1955 東海大學 + 1963 路思義教堂**（貝聿銘 + 陳其寬，沒有一根樑柱）/ 1988/06/26 國美館 / 1999/09/21 921 地震東勢石岡大里**逾 1,154 人**（CDC 1,190 註腳併陳）/ **2002/9/23 中科行政院核定 + 2003/7/28 廠商進駐**（糾正 1994 規劃單源）/ **2016/09/30 國家歌劇院**（伊東豐雄 58 面曲牆 + 7 萬片混凝土）+ 2014/11/23 首演 / 2018/11/03-2019/04/24 世界花博三園區 / 2010/12/25 合併升格直轄市 29 區
- **品質**：8,835 CJK / 25 footnotes / 5 inline + 1 hero = 6 圖 / 9 narrative H2（covers 1731-2026 共 295 年）/ Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=3 pass
- **Research**: [reports/research/2026-05/台中市.md](../../reports/research/2026-05/台中市.md) — Stage 1 47 次搜尋 / 17 verbatim quotes / 9 ⚠️ fact flags audit pass
- **FACTCHECK**: 9 flags — 大甲鎮瀾宮 1730/1732/1770/1787 多階段 / 中科 2002 核定（糾正 1994） / **大甲遶境跨 4 縣市不是 5**（agent 糾正 task spec 錯誤）/ 1894 遷台北原因戰略 不是瘧疾 / 921 死亡 Wikipedia 1,154 vs CDC 1,190 / 國家歌劇院 58 面 + 7 萬片 / 花博無確認人次 / 1731 大甲西社七個月 / 1955 東海 1963 路思義教堂

### 台北市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 5 — 一座城裡的三個時間萬華 1738 大稻埕 1885 信義 2004 12 個區活在不同世紀 / Geography 縣市 / 7777 字 / 28 footnote / 5 Wikimedia images）

- **Article**: [knowledge/Geography/台北市.md](../../knowledge/Geography/台北市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 cost-split v2 — Opus main Stage 0 + Sonnet sub-agent Stage 1 (43 searches) + Opus sub-agent Stage 2-5 (commit 1fbb3adf1)
- **核心矛盾**（29 字）：「一座城裡的三個時間：萬華 1738 / 大稻埕 1885 / 信義 2004——台北的 12 個區活在不同的世紀」
- **Hook**：凱達格蘭族（北投 Patauw 女巫 / 艋舺 Manka 獨木舟 / 大稻埕大浪泵社）+ 1996/03/21 陳水扁市長改介壽路為凱達格蘭大道 / 1709 陳賴章墾號（陳天章 + 賴永和 + 陳憲伯 + 陳逢春 + 戴天樞）大佳臘 / 1738 艋舺龍山寺 + 1875 沈葆楨設台北府 + **1882/03/13 府城動工**（1879 是規劃年，糾正 Stage 0）+ 1884 完工 + 1885 劉銘傳建省 + 大稻埕茶葉 1860s 李春生 / **1895/06/07 日軍進城**（糾正 Stage 0「06/06」）/ 1920/10/01 設台北市（艋舺 + 大稻埕 + 城內三市街合一）+ **總督府「日式辰野風格」**（避設計者爭議）/ 1947/02/27 林江邁天馬茶房（今南京西路 189 號附近）+ 02/28 行政長官公署開槍 / 1949 國府遷台 + **1935 統計 274,157 → 戰後激增至百萬 → 1966 117 萬**（替「30→50 萬」說）/ **1967/07/01 升格直轄市第一個** + **1968 行政院明令 + 1974 實際移交完成**（士林北投）/ 1980 信義計畫區 + **1977 淡江研究 + 1980 李登輝委託郭茂林 + 1981 細部計畫** / 2004/12/31 101 大樓 / 1990/03 野百合學運中正紀念堂前 + 同年 16→12 區重劃 / 1996/03/28 **法國 Matra VAL-256 中運量木柵線**（後改文湖）/ 2014/03 太陽花學運立法院占領
- **品質**：7,777 CJK / 28 footnotes / 4 inline + 1 hero = 5 圖 / 10 narrative H2（剛好上限）/ Em-dashes 0 處（從原 39 全清）/ 對位句 0 / Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=2 pass
- **Research**: [reports/research/2026-05/台北市.md](../../reports/research/2026-05/台北市.md) — Stage 1 43 次搜尋 / 17 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK**: 7 flags — 1895/06/07 日軍進城（糾正 06/06） / 1882/03/13 府城動工（糾正 1879） / 1949 人口精確版 1935 274,157 → 1966 117 萬 / 1968 行政院明令 + 1974 移交完成 / 木柵線 Matra VAL-256 / 信義計畫區三階段（1977 研究 + 1980 委託 + 1981 計畫） / 總督府「日式辰野風格」
- **寫作紀律**：避免「天龍國」標籤反作用 — 不嘲諷不歧視，是 22 縣市平等中一員，但承認首都中心化的結構性事實。開場「凌晨四點環南市場」首尾呼應結尾「凌晨四點 1738 跟 2004 之間」(EDITORIAL §敘事閉環)

### 高雄市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 4 — 1979 升格直轄市那一年台北的監獄裡關著八個高雄人 / Geography 縣市 / 9132 字 / 33 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/高雄市.md](../../knowledge/Geography/高雄市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 cost-split v2 — Opus main Stage 0 + Sonnet sub-agent Stage 1 + Opus sub-agent Stage 2-5 (commit 6b429cf54)
- **核心矛盾**（29 字）：「高雄是台灣民主的傷口：1979 同一年升格直轄市，也爆發了美麗島事件」
- **Hook**：1979/07/01 升格台灣第二個直轄市 + 1979/12/10 美麗島事件大港埔圓環 + 1980/02/28 林宅血案（**台北信義路三段 31 巷 16 號**，三處重申不在高雄不在宜蘭）+ 1947 二二八彭孟緝雄中保衛戰 + 1966 加工出口區（世界最早之一）+ 中鋼 1971/12/03 + 1987-1990 後勁反五輕公投 61% + 1993-1999 連續七年全球第三大貨櫃港 + 2009/08/08 莫拉克小林村 474 人活埋 + 2014/06/26 拉阿魯哇族 + 卡那卡那富族正名 / 2010/12/25 縣市合併 38 區 / 2018 韓國瑜 892,545 票 + 2020 罷免 939,090 票 / 衛武營 2018/10/13 開館
- **品質**：9,132 CJK / 33 footnotes / 5 inline + 1 hero = 6 圖 / 14 narrative H2（多但每節獨立 anchor）/ Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=2 pass
- **Research**: [reports/research/2026-05/高雄市.md](../../reports/research/2026-05/高雄市.md) — Stage 1 44 次搜尋 / 18 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK**（emergent three-layer 源頭）：林宅血案 Stage 0 主 session 預設寫宜蘭被 Sonnet 抓到三源確認 → 台北信義路三段 31 巷 16 號（Wikipedia + 國家人權記憶庫 + Sonnet）；其他 fact flag：1924/12/25 升格用「1924 年（大正 13 年）」避指 single source / 1993-1999 連續七年世界第三大貨櫃港（精確化 1980s 第三）/ 1968 中島貨櫃模糊為 1960 後期 / 小林村 474 人活埋（含失蹤）/ 加工出口區世界最早之一保守 / 中鋼 1971/12/03 成立 + 1977 第一階段完工
- **Cross-link**: 14 forward (基隆 / 屏東 sibling + 二二八 / 美麗島 / 林宅血案 / 解嚴 / 加工出口區 / 原住民 / 客家 / 88風災)

### 台南市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 4 — 261 年首府 400 年古蹟 21 世紀晶片疊在同一片土地 / Geography 縣市 / 7279 字 / 28 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/台南市.md](../../knowledge/Geography/台南市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 cost-split v2 — Opus main Stage 0 + Sonnet sub-agent Stage 1 (61 searches) + Opus sub-agent Stage 2-5 (commit 925aca59e)
- **核心矛盾**（≤30 字）：「261 年首府、400 年古蹟、21 世紀晶片，疊在同一片土地上」
- **Hook**：1624 荷蘭熱蘭遮城 + 1661/04/30 鄭成功登陸鹿耳門 + 1662/02/01 揆一簽《鄭荷和約》+ 02/09 撤離（雙日期 disambiguate）+ 1665 陳永華建孔廟全台首學 + 1684 清廷設台灣府 + 1885 台灣建省省會北移台北（261 年首府身分結束）+ 1947/03/13 湯德章民生綠園 + 1875-1876 億載金城 + 1992 七股黑面琵鷺槍聲 + 2010/12/25 縣市合併 37 區 + **2025/10/17 西拉雅族正名立法院通過** + **2025/10/23 賴清德公布**（389 年把名字拿回來）+ 2023 南科年營業額一兆五千億超越竹科
- **品質**：7,279 CJK / 28 footnotes / 5 inline + 1 hero = 6 圖 / 9 narrative H2 / Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=3 ≤ 3 pass / 破折號 0（從初稿 27 個全清）
- **Research**: [reports/research/2026-05/台南市.md](../../reports/research/2026-05/台南市.md) — Stage 1 61 次搜尋 / 21 verbatim quotes / 9 ⚠️ fact flags audit pass
- **FACTCHECK**: 9 flags — Flag #2 揆一投降高優先 → 1662/2/1 簽約 2/9 撤離雙日期 disambiguate / Flag #8 西拉雅族正名 → 2025/10/17 立法 + 2025/10/23 公布 / Flag #1 鹿耳門 → 1661/4/30 西曆 = 永曆十五年四月初一 / Flag #4 億載金城 → 1874/09 動工 1876/08 完工 / 1885 鹽水蜂炮 / 揆一中文名統一
- **Cross-link**: sibling 加到 基隆 / 嘉義市 / 屏東縣 / 高雄市（南部 sibling）

### 桃園市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 4 — 台灣的進出口最多客家最多移工全在這塊台地上 / Geography 縣市 / 5183 字 / 25 footnote / 5 Wikimedia images）

- **Article**: [knowledge/Geography/桃園市.md](../../knowledge/Geography/桃園市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 cost-split v2 — Opus main Stage 0 + **Sonnet sub-agent retry**（前 agent JSONL 卡死 6 小時 → TaskStop + 重 spawn with 45 search hard limit）+ Opus sub-agent Stage 2-5 (commit 32ce121bf)
- **核心矛盾**（28 字）：「台灣的進出口、最多的客家人、最多的移工，全在這塊台地上」
- **Hook**：1977/11/19 中壢事件警方開槍打死中央大學學生江文國 + 19 歲張治平 → 許信良 23 萬比 14 萬高票當選 / 1979/02/26 中正國際機場啟用（2006 改名桃園國際）/ 2014/12/25 升格第六都最年輕直轄市 / 客家逾八十萬全國最多（中壢/平鎮/楊梅/龍潭/新屋）/ 移工 13 萬 2,158 人全國最多 / 1964 石門水庫 + 大漢溪三萬年前河川襲奪 / 1895 乙未戰爭桃園戰場（江國輝大嵙崁領袖）/ 復興區泰雅族 + 慈湖兩蔣陵寢 / 海客文化 + 約 10 座石滬 / 80 個眷村全台最多 / 機場捷運超過 1,277 億 2017 通車 / 開場「凌晨四點的桃園機場第一航廈」→ 結尾「第一班飛機要起飛了」首尾呼應 + 三層 anchor stack
- **品質**：5,183 CJK / 25 footnotes / 4 inline + 1 hero = 5 圖 / 8 narrative H2 / 0 chronicle-lead / Stage 4 hard=0 / Stage 3.5 hard=0 / prose-health score=2 pass
- **Research**: [reports/research/2026-05/桃園市.md](../../reports/research/2026-05/桃園市.md) — Stage 1 45 次搜尋 / 18 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK**: 客家逾八十萬保守表述 / 大溪老街洋風牌樓厝（非正統巴洛克）caveat 約定俗成 / 石滬約 10 座（另來源 11）/ 江國輝大嵙崁領袖（與姜紹祖北埔抗日三傑區隔）/ 1974/07/29 中山高 / 80 個眷村 / 1,277 億+
- **Notes**: agent retry 是這次 batch 4 的關鍵 lesson — 前 Sonnet agent JSONL stop 在 5/18 04:31 後 6 小時沒動，TaskStop + spawn 新 agent with 45 search hard limit 解決。寫進 cron data-refresh isolation pattern carryover（commit 4ad0aa420 + post-script 5a8659f8e）

### 新竹市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 4 — 1733 年種竹為城的竹塹 1980 年長出台積電的搖籃 / Geography 縣市 / 6939 字 / 23 footnote / 4 Wikimedia images）

- **Article**: [knowledge/Geography/新竹市.md](../../knowledge/Geography/新竹市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 cost-split v2 — Opus main Stage 0 + Sonnet sub-agent Stage 1 (44 searches) + Opus sub-agent Stage 2-5 (commit 85634f83b)
- **核心矛盾**（29 字）：「1733 年種竹為城的竹塹，1980 年長出台積電的搖籃，同一座風城，差了 247 年」
- **Hook**：1733 雍正十一年淡水同知徐治民植莿竹圍 1408 公尺圓形土城 + 1827 道光七年磚石城獲准 + 1828 動工 + 1829 完工 + 迎曦門 / 1953-1974 黑蝙蝠中隊 148 人殉職（從風城起飛偵察中國大陸 838 架次）/ 1956 清華 + 1958 交大在台復校 / 1980/12/15 蔣經國揭幕新竹科學工業園區 + 1987/02/21 台積電創立 / 1748 都城隍廟（唯一都城隍位階）/ 1715 隆恩圳 / 1925 玻璃廠 + 米粉 + 貢丸（風城九降風的工業副產品）/ 開場 1733 verbatim + 莿竹城牆 → 結尾「靠風活了 293 年」閉環
- **品質**：6,939 CJK / 23 footnotes / 3 inline + 1 hero = 4 圖 / 8 narrative H2 + 3 ending / Stage 4 hard=0 / prose-health score=1 pass / 對位句 2 / 破折號 13（從初稿 27 降到 13）
- **Research**: [reports/research/2026-05/新竹市.md](../../reports/research/2026-05/新竹市.md) — Stage 1 44 次搜尋 / 18 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK**: 7 flags — 淡水廳遷治糾正 Stage 0「1725」為「1723 設廳 1731 分轄 1733 遷竹塹」/ 竹塹城 1827 倡議 1828 動工 1829 完工 / 黑蝙蝠 148 人（vs 客新聞 147 caveat）+ 1974 年底停偵察 / 隆恩圳 1715 / 玻璃廠 1925 / 城隍廟 1747 倡議 1748 落成
- **Cross-link**: sibling 加到 基隆 / 嘉義市 / 苗栗 / 南投 / 桃園 / 新竹縣 6 條 + 4 topical（半導體 / 台積電 / 冷戰 / 科學園區 / 雞籠中元祭）

### 南投縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 3 — 唯一不靠海的縣 921 震央就在它的中心 / Geography 縣市 / 6533 字 / 24 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/南投縣.md](../../knowledge/Geography/南投縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a7960950eb5ae337d commit a300ad986)
- **核心矛盾**：「台灣最深的傷口都在這裡，震央在集集，賽德克的血在霧社，省政府的形在中興新村」（28 字）
- **Hook**：開場「凌晨一點四十七分那 102 秒」→ 1709 八堡圳施世榜 + 林先生傳說（標明民間傳說轉述）/ 1930/10/27 霧社事件莫那魯道 + 賽德克族 6 社 + 1931/04/25 第二次霧社（保護蕃收容所被親日蕃襲擊）+ **2008/04/23 賽德克族正名第 14 族** / 1934 武界壩 + 大觀電廠 + 日月潭發電系統 / 1957 中興新村台灣省政府臨時辦公處 + 1998/12 精省 / 1999/09/21 01:47:15.9 集集大地震規模 7.3 深 8km / 全台死亡 **2,415**（內政部消防署，註 2,454 含後續傷重不治）+ 失蹤 29 + 受傷 11,305 + 全倒 51,711 + 半倒 53,768 / 南投受創最鉅 死 886 + 重傷 678 + 全倒 23,127 + 半倒 16,792 / 中寮全鄉 90% 受損 154 死 / 九份二山 180 公頃崩塌 41 人活埋 / 2001/08/08 邵族正名第 10 族 / **玉山國家公園跨 4 縣市**（南投信義 + 高雄桃源 + 嘉義阿里山 + 花蓮卓溪，修正 Stage 0 寫 3 縣市）/ 2015 廬山遷村拆除 + 2016 業者完全歇業 / 結尾「三個族名在 26 年裡長回來」+ 「八堡圳 1709 / 霧社 1930 / 武界壩 1934 / 921 1999」四層海拔疊壓
- **品質**：6,533 CJK / 24 footnotes / **6 Wikimedia images** (1 hero + 5 inline，全 URL 200 verified + aspect ratio 0.91-2.35) / 8 H2 narrative + 3 utility scene-led / **3 策展人筆記 + 3 ✦ pull quotes**（略多於 1-2 目標但合理）/ **article-health rewrite-stage-4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=3** ≤ 3 pass / 對位句 **0 處** / 破折號 **0 處**（從初稿 27 個破折號 + 1 對位句砍到 0）/ 17 個 checks 全綠
- **Research**: [reports/research/2026-05/南投縣.md](../../reports/research/2026-05/南投縣.md) — Stage 1 54 次搜尋 / 17 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK**: 7 ⚠️ flags 全處理（921 死亡 **2,415**（內政部消防署）+ 註 2,454 / 霧社日方死亡 134 + 2 著日服漢人計算 / 精省 1998/12 不指明具體日 / **玉山國家公園跨 4 縣市**（含花蓮卓溪）/ 邵族人口約 800 多人 / 廬山 2015 遷村拆除 + 2016 業者歇業 / 林先生傳說標「民間傳說轉述」非一手文獻）
- **Cross-link**: 9 forward + sibling 加到 基隆市 + 苗栗縣（內陸縣 sibling）
- **Pilot retrospective 5 條校準執行**：雨量分層（南投山區 vs 平地 vs 日月潭）/ 區間時間（1709 / 1930 / 1934 / 1957 / 1998 / 1999 / 2001 / 2008 / 2015）/ 衰退/災難 frame 具體數字（921 死亡 2,415 + 南投死 886 + 全倒 23,127 + 中寮 90% + 九份二山 180 公頃 41 人活埋 + 九份二山降低 400m）/ 本地 vs 觀光客 fault line（日月潭觀光客 vs 邵族傳說 vs 霧社賽德克族記憶 vs 中寮鄉重建現場）/ 日治現代化具體化（1934 武界壩 + 大觀電廠 + 日月潭發電 + 霧社事件背景）

### 金門縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 3 — 1949 那 56 小時決定金門 75 年命運也決定了台灣 / Geography 縣市 / 6504 字 / 27 footnote / 7 Wikimedia images）

- **Article**: [knowledge/Geography/金門縣.md](../../knowledge/Geography/金門縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a3332cccf0b27497a commit bca0b08f9)
- **核心矛盾**：「1949 年那 56 小時，決定了金門 75 年的命運——也決定了台灣」（25 字）
- **Hook**：1.8km vs 358km 開場 → 1387 周德興建金門所城「固若金湯，雄鎮海門」/ 1646 鄭成功金門廈門起兵 / 1949/10/25-27 古寧頭 56 小時激戰殲俘 15,000+（共軍登陸 9,086 邏輯衝突 ⚠️）/ 1952 金門酒廠胡璉收編九龍江 + **葉華成釀酒師強徵爭議** + 曾孫葉偉仁 2019 公開控訴（軍管暴力被經濟成功遮蔽 fault line）/ 1956-1992 戰地政務 36 年 + 金門宵禁 **10 點**（馬祖 9 點）+ 國軍 5-10 萬 vs 居民 5-7 萬 / 1958/08/23-10/05 八二三 44 天 474,910 發砲彈 + 3,132/km² 砲彈密度 + 21 年單打雙不打到 1979/01/01 中美建交 / 1961-1965 翟山坑道 + 烈嶼九宮 780m / **烏坵說莆仙語**（金門閩南 + 馬祖福州話以外第三種）/ 設籍 14.5 萬 vs 常住落差 + 金酒配股福利 / 2001/01/01 小三通開放 / 結尾「1.8 公里海面下，是 75 年命運疊在 45 分鐘航程裡」首尾呼應
- **品質**：6,504 CJK / 27 footnotes / **7 Wikimedia images** (1 hero + 6 inline，全 URL 200 verified) / 8 H2 narrative scene-led + 3 metadata / 對位句 **3 處** at limit / 破折號 **10 處** ≤ 15 / **article-health rewrite-stage-4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / 算術鐵三角 474,910 ÷ 151.6 = 3,132 ✓
- **Research**: [reports/research/2026-05/金門縣.md](../../reports/research/2026-05/金門縣.md) — Stage 1 44 次搜尋 / 17 verbatim quotes / 10 ⚠️ fact flags audit pass
- **FACTCHECK**: 10 ⚠️ flags 全處理（古寧頭登陸 9,086 vs 殲俘 15,000+ 算術衝突明標 / 砲彈 474,910 + 3,132/km² 密度 / **葉華成強徵爭議**寫入 reverse-explanation callout / 宵禁 10 點 vs 馬祖 9 點對照 / 翟山坑道 1961-1965 注明 / 烏坵莆仙語第三種語言 / 設籍 14.5 萬 vs 常住落差 / 1.8km「約」彈性 / 358km / 1387「固若金湯」）
- **Cross-link**: 10 forward (連江縣 sibling / 基隆市 pilot / 澎湖縣 / 鄭成功 / 蔣中正 / 戒嚴時期 / 台海危機 / 國防軍事現代化 / 島嶼地理 / 媽祖大道公) + 2 reverse 加到 連江縣 + 基隆市
- **跟連江縣（馬祖）區隔**: 閩南同安腔 vs 閩東福州話 / 距廈門 1.8km vs 距福州 50km / 古寧頭+八二三兩場決定性戰役 vs 馬祖無同規模陸戰 / 14.5 萬設籍 vs 馬祖 1.3 萬（10 倍）/ 宵禁 10 點 vs 9 點 / 金門大學 1997 vs 馬祖無大學
- **Pilot retrospective 5 條校準執行**：「砲彈密度分層」474,910/44/151.6 km² = 3,132 per km² / 區間時間 1387-1646-1949-1952-1956-1958-1979-1992-2001-2024 / 戰地 frame 具體數字（56 小時殲俘 15,000+ / 44 天 474,910 發 / 21 年單打雙不打 / 國軍 vs 居民比）/ 本地 vs 觀光客 fault line（在地人記得宵禁 10 點 + 葉華成強徵 vs 觀光客划獨木舟過翟山坑道）/ 日治差異化（金門 1937-1945 短暫日佔 vs 台灣本島 50 年，模範街 1924 是「華僑時間」非「日治時間」）

### 雲林縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 3 — 宜蘭選擇不要的雲林用三十年的肺換下來 / Geography 縣市 / 7988 字 / 29 footnote / 5 Wikimedia images）

- **Article**: [knowledge/Geography/雲林縣.md](../../knowledge/Geography/雲林縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a1201f9a3ef45fd1a commit f4026fdac)
- **核心矛盾**：「宜蘭選擇不要的，雲林用三十年的肺換下來」（20 字）
- **Hook**：凌晨五點半台 17 線麥寮段堤防潮聲開場 → 三條沖積扇地理 / 1621 顏思齊登陸笨港 + 1694 北港朝天宮 + 樹璧禪師從湄洲帶神像 / 1887 雲林設縣縣治在**林圯埔（今竹山）**，**1893 遷斗六**（修正 Stage 0 寫直接設斗六）/ **1909 虎尾糖廠正式生產**（迴避 1906/1907/1908 三說）+ 400km 五分車 / 1953/01/28 西螺大橋通車 1,939m 美援 + 日治橋墩戰後完工 / 1932 西螺米試驗 / 1973 王永慶提輕油裂解廠 + 1987 陳定南宜蘭反六輕 + 1991 雲林麥寮選址 + 1994/07 動工 + 1998 一期完工 → **六輕填海 2,255 公頃**（修正 Stage 0 寫 3,400 公頃，含港口設施 2,603）/ 麥寮國小學童每年抽血 + 血液苯與乙苯 + 1.29 倍癌症發生率 + PM2.5 30+ μg/m³ / 結尾「六輕煙囪跟朝天宮香爐都在燒」首尾呼應
- **品質**：7,988 CJK / 29 footnotes / **5 Wikimedia images** (1 hero + 4 inline) / 8 H2 narrative scene-led / **article-health rewrite-stage-4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=3** ≤ 3 pass / 對位句 **0 處** / 破折號 **0 處** / 三角自檢 PASS
- **Research**: [reports/research/2026-05/雲林縣.md](../../reports/research/2026-05/雲林縣.md) — Stage 1 54 次搜尋 / 18 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK 🔴 3 條 CRITICAL Stage 0 corrections 全 resolved**：
  - **六輕填海 2,255 公頃**（非 Stage 0 寫 3,400 公頃 — 含港口設施總計 2,603 公頃）
  - **1887 雲林設縣縣治在林圯埔（今竹山）**，1893 才遷至斗六（非 Stage 0 寫直接設斗六）
  - **虎尾糖廠 1909 正式生產**（迴避 1906/1907/1908 三設廠說法爭議）
- **紀實風格呈現**: 拒絕「污染 vs 信仰」二元對立，用廖炳崇「不知道。不知道」+ 惠珍嬸「台塑有多繳稅我沒有感受到。但我每天早上聞到的，是那個味道」+ 龔英俊「這裡的空氣本來就這樣」三段 verbatim 呈現雲林對六輕的複雜共生
- **Cross-link**: 10 forward (宜蘭縣 sibling 核心命運句 / 基隆市 pilot / 嘉義縣 sibling 笨港共享 / 嘉義市 sibling / 台塑集團 / 台糖 / 媽祖與大道公的傳說 / 行政區劃 / 河川系統 / 農業地景)
- **Pilot retrospective 5 條校準執行**：雨量分層（西部沿海 1,200mm vs 東部丘陵 2,500mm + 冬季濃霧）/ 區間時間（1694 / 1887 / 1909 / 1932 / 1953 / 1973-1998 六輕 25 年）/ 衰退環境 frame 具體數字（2,255 公頃 + 27 年 + 1.29 倍癌症 + PM2.5 30+ μg/m³ + 麥寮國小抽血）/ 本地 vs 觀光客 fault line（古坑咖啡 vs 麥寮被觀光地圖漏掉）/ 日治現代化具體化（1909 虎尾糖廠 + 400km 五分車 + 1932 西螺米 + 1920 改台南州虎尾郡北港郡）

### 彰化縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 3 — 打敗過杜邦留不住年輕人的農業大縣 / Geography 縣市 / 6440 字 / 24 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/彰化縣.md](../../knowledge/Geography/彰化縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a167121fad3f77c10 commit 732d49d05)
- **核心矛盾**：「打敗過杜邦，留不住年輕人的農業大縣」（19 字）
- **Hook**：1986 反杜邦運動鹿港勝利 → 1723 雍正元年彰化縣設立 + 1709 八堡圳 + 1717 鹿港始見諸羅縣志地圖 + 1728 米倉 16 間 + 1786 林爽文之役 + **1788 新祖宮（敕建天后宮）**（修正 Stage 0 混淆鹿港天后宮）+ 1922 扇形車庫 + 1925 二林事件 + 1934 鹿港港務縮減 + 1961 八卦山大佛 22m / 田尾花園 4,000 萬支菊花 / 鹿港 1,730 萬人次觀光 / 1986 反杜邦 30 萬人連署
- **品質**：6,440 CJK / 24 footnotes / **6 Wikimedia images** (1 hero + 5 inline) / 8 H2 narrative / 2 策展人筆記 + 1 ✦ pull quote / **Stage 4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=2** ≤ 3 pass / 對位句 **0 處** / 破折號 **4 處** ≤ 15
- **Research**: [reports/research/2026-05/彰化縣.md](../../reports/research/2026-05/彰化縣.md) — Stage 1 44 次搜尋 / 4 ⚠️ CRITICAL fact flags 全處理
- **FACTCHECK 🔴 4 條 CRITICAL Stage 0 corrections 全 resolved**：
  - **人口 120.6 萬**（2026/4 戶政司）非 Stage 0 寫 124 萬
  - **彰化平原非台灣第二大平原**（屏東 1,210 km² 才是第二大）— 改用「西部重要沖積平原」
  - **1788 新祖宮（敕建天后宮）** vs 明代鹿港天后宮 分清楚（兩座不同廟，策展人筆記專段釐清）
  - **日治 3 郡**（彰化、員林、北斗）非 4 郡（避開二林郡的錯誤 claim）
- **Cross-link**: 7 forward (台灣老街文化 / 河川系統 / 農業地景 / 行政區劃 / 社會運動 / 環保永續 / 糕餅文化 / 台糖) + 2 sibling (基隆市 pilot / 新竹縣 batch 2)
- **Pilot retrospective 5 條校準執行**：雨量 N/A / 區間時間（1709-2026 完整 anchor 列）/ 衰退轉型 frame 數字（120.6 萬 + 21,400 公頃灌溉 + 4,000 萬支菊花 + 1,730 萬鹿港人次 + 399.5 億高架化）/ 本地 vs 觀光客 fault line（田尾菊花夜 vs 鹿港老街白天 + 反杜邦 / 鹿港囝仔 / 二水跑水節）/ 日治現代化（1922 扇形車庫 + 1925 二林事件 + 1934 鹿港縮減 + 1908 縱貫鐵路繞過鹿港）

### 屏東縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 2 — 國家命運轉折發生在這裡台北從來沒怎麼記得 / Geography 縣市 / 6989 字 / 27 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/屏東縣.md](../../knowledge/Geography/屏東縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a8facfc965ef9d273 commit d99f5ed47)
- **核心矛盾**：「國家命運轉折發生在這裡，台北從來沒怎麼記得」（21 字 ≤ 30）
- **Hook**：五點半東港黑鮪魚拍賣開場 → 1721 朱一貴之亂 + 客家六堆義民組織起源 / 1861 萬金聖母聖殿建立（西班牙道明會 + 比 1882 牛津學堂早 21 年）/ 1871 琉球漂民事件 54 名遭殺 + 1874 牡丹社事件 5/8 日軍登陸 + 5/22 石門戰役 + 阿祿古父子身亡（改變台灣國際地位）/ 1875 沈葆楨設恆春縣 + 1883 鵝鑾鼻燈塔（修正 Stage 0 寫 1882 為 1881 開工 / 1883 完工）/ 1939 屏東車站 + 屏東糖廠 + 糖業鐵道 226 公里 / 2009/8/8 88 風災林邊溪潰堤 30 分鐘 + 全台 681 死 + 屏東損失 30 億 - 近百億 + 山區排灣族部落（瑪家、霧台、泰武）滅村 / 2024 牡丹社事件 150 週年 macacukes 重新命名 → 結尾「五點半的東港，黑鮪魚在等」首尾呼應
- **品質**：6,989 CJK / 27 footnotes / **6 Wikimedia images** (1 hero + 5 inline) / 9 narrative H2 + 3 utility = 12 total / **article-health rewrite-stage-4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=1**（極優）/ 對位句 **0 處** / 破折號 **11 處** ≤ 15
- **Research**: [reports/research/2026-05/屏東縣.md](../../reports/research/2026-05/屏東縣.md) — Stage 1 44 次搜尋 / 17 verbatim quotes / 4 ⚠️ fact flags audit pass
- **FACTCHECK**: 4 ⚠️ flags 全處理（鵝鑾鼻燈塔 **1881 開工 / 1883 完工** 修正 Stage 0 寫 1882 / 牡丹社 **5/8 Wikipedia** vs 5/22 戰役分清 / 萬金「**比 1882 牛津學堂早 21 年**」明確獨立段落 / 5 族同住具體寫排灣 49,643 + 魯凱 2,100 + 馬卡道 + 卑南阿美少數）
- **Cross-link**: 9 forward + reverse 加到 基隆市 + 連江縣 (sibling)。DEFERRED reverse cross-link 到李仙得（pre-existing hard fail，per Stage 5.3 SOP DEFER）
- **Pilot retrospective 5 條校準執行**：雨量分層（莫拉克尾寮山 1,403mm + 新瑪家 1,897mm + 泰武 1,145mm 三測站）/ 區間時間軸（1721/1861/1874/1875/1883/1939/2009/2024）/ 88 風災具體數字（潰堤 30 分鐘 / 全台 681 死 / 屏東損失 30 億 - 近百億）/ 本地 vs 觀光客 fault line（東港 4-6 月鮪魚 vs 春吶觀光）/ 日治現代化具體化（屏東糖廠 1908 / 糖業鐵道 226 公里 / 屏東車站 1939）

### 台東縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 2 — 兩個離島一個關了三十六年政治犯一個存了四十二年核廢料 / Geography 縣市 / 7196 字 / 41 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/台東縣.md](../../knowledge/Geography/台東縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a100e12072a1c0341 commit ae9647bbc)
- **核心矛盾**：「兩個離島，一個關了三十六年政治犯，一個存了四十二年核廢料」（26 字 ≤ 30）
- **Hook**：開場卑南遺址石棺 5300-3500 年前 → 1875 沈葆楨開山撫番八通關古道 + 1931-1941 布農族集團移住海端鄉（非單一 1934 年）/ 1951-1987 綠島火燒島政治犯監獄 36 年 → 1992 改人權紀念園區 / 1968/08/25 紅葉少棒**7:0**（修正 Stage 0 寫 4:0）擊敗**日本關西少棒明星隊**（非國家隊，「世界冠軍和歌山隊」是後來黨媒神話）/ 1972 南橫公路通車 / 1975 蔣經國同意蘭嶼設貯存場 + **政府以興建魚罐頭工廠（部分說法鳳梨）名義誘騙簽名** + 1982/05 首批運入 + 累積 97,672 桶 + 1988/02/20 達悟族反核廢驅逐惡靈運動 + 1996 投石封港 + 2019/11 蔡英文 25.5 億補償 / 1999 陳建年金曲歌王 + 紀曉君 + 巴奈 + 胡德夫 + 張惠妹（卑南族）/ 2002 史前文化博物館 / 2020 南迴鐵路電氣化 / 結尾紅葉村約 500 人現況首尾呼應
- **品質**：7,196 CJK / 41 footnotes / **6 Wikimedia images** / 8 H2 narrative scene-led / **article-health rewrite-stage-4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=3** ≤ 3 pass / 對位句 **2 處** ≤ 3 / 破折號 **4 處** ≤ 15
- **Research**: [reports/research/2026-05/台東縣.md](../../reports/research/2026-05/台東縣.md) — Stage 1 46 次搜尋 / 22 verbatim quotes / 8 ⚠️ fact flags audit pass
- **FACTCHECK**: 🔴 1 CRITICAL + 7 ⚠️ flags 全處理（紅葉少棒 **7:0** 修正自 Stage 0 4:0 / 對手「**日本關西少棒明星隊**」非國家隊 / 布農族 **1931-1941 集團移住**系列 / 蘭嶼首批 1982/05 + 累積 97,672 桶 / 罐頭工廠用「政府以興建魚罐頭工廠名義誘騙簽名」+ 2018 調查否認措辭爭議 ⚠️ / 紅葉村約 500 人 / 八部合音用 1943 黑澤隆朝錄音可驗證事實 / 卑南八社原民會官方版本）
- **Cross-link**: 11 forward (基隆 / 澎湖 / 連江 / 苗栗 / 宜蘭 / 嘉義市 sibling + 蘭嶼生態系 + 綠島監獄 + 台灣白色恐怖 + 台灣原住民族土地正義 + 當代原住民創作歌手 + 台灣海岸地形) + reverse 加到基隆市
- **Pilot retrospective 5 條校準執行**：雨量分層（蘭嶼海洋季風 3,000mm / 縱谷 1,900 / 海岸山脈背風 1,500）/ 區間時間（14 個歷史節點）/ 衰退低密度數字（21 萬 / 3,515 km² / 60 人/km² 全國最低 / 紅葉村 500 人 / 97,672 桶 / 42 年）/ 本地 vs 觀光客 fault line（池上稻浪 vs 卑南大獵祭 vs 蘭嶼飛魚祭 vs 綠島人權園區 vs 紅葉村）/ 日治現代化具體化（1931-1941 布農族集團移住）

### 嘉義縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 2 — 49 萬人把全國的臉借給阿里山自己卻找不到臉 / Geography 縣市 / 6908 字 / 30 footnote / 7 Wikimedia images）

- **Article**: [knowledge/Geography/嘉義縣.md](../../knowledge/Geography/嘉義縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-aff606587133a5bab commit bd494396a)
- **核心矛盾**：「嘉義縣 49 萬人把全國的臉都借給了阿里山，自己卻找不到臉」（25 字 ≤ 30）
- **Hook**：阿里山林業鐵路 1912 通車 + 1914 延伸至沼平 + 戰後檜木輸出顛峰 + 1989 林業政策轉向 → 1684 諸羅縣設立 + 1786 林爽文之役 + 1787 乾隆賜名「嘉義」/ 鄒族高一生（1908-1954）日治教育 + 1947 二二八協助 + 1954/04/17 安坑刑場槍決 + 〈春之佐保姬〉⚠️ 作曲時間兩說並陳 / 1950 嘉義縣市分治 + 1982 嘉義市升格 + **1991 縣治從嘉義市遷至太保**（修正 Stage 0 多源不一致為 verbatim 1991）/ 2003 行政院宣布故宮南院選址 + 2015/12/28 開館（規劃到落成 15 年）/ 高鐵嘉義站 2007 + BRT 太保-嘉義市 / 東石蚵田 + 布袋鹽田 + 朴子配天宮 / 結尾「嘉義縣作為三個時代觀光策略的容器」
- **品質**：6,908 CJK / 30 footnotes / **7 Wikimedia images** (1 hero Tashan + 6 inline) / 9 H2 narrative scene-led / **article-health rewrite-stage-4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=3** ≤ 3 pass / 對位句 **3 處** at limit / 破折號 **10 處** ≤ 15
- **Research**: [reports/research/2026-05/嘉義縣.md](../../reports/research/2026-05/嘉義縣.md) — Stage 1 44 次搜尋 / 20 verbatim quotes / 5 ⚠️ fact flags audit pass
- **FACTCHECK**: 5 ⚠️ flags 全處理（故宮南院 2003 行政院宣布 + 2004 正式核定分清 / 〈春之佐保姬〉作曲時間兩說並陳 ⚠️ / 阿里山林鐵 66.6 km 官方 / 2026 人口 48 萬 2024/8 戶政司 / 故宮南院 2019 訪客 104 萬 verbatim / **縣治遷太保 1991 年** 非 1995）
- **Cross-link**: 9 forward (阿里山 / 故宮博物院 / 陳澄波 / 八田與一 / 二二八 / 白色恐怖 / 鐵道史 / 嘉義市 sibling / 基隆市 batch 1 sibling) + 1 reverse 加到嘉義市
- **Pilot retrospective 5 條校準執行**：雨量分 layer / 區間時間（1684/1786/1787/1908/1912/1914/1950/1982/1991/2003/2015）/ 衰退 frame 數字證據 / 本地 vs 觀光客 fault line / 日治現代化具體化

### 花蓮縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 2 — 129 年隱身撒奇萊雅族用正名換回太魯閣 0403 又讓它遠去 / Geography 縣市 / 8211 字 / 27 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/花蓮縣.md](../../knowledge/Geography/花蓮縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a90eaee5e0cf77d57 commit dc342b395)
- **核心矛盾**：「129 年隱身的撒奇萊雅族，用正名換回的太魯閣，0403 地震又讓它遠去」（29 字 ≤ 30）
- **Hook**：1878 凌遲開場 → 加禮宛事件後撒奇萊雅族 129 年潛藏成阿美族 + 2007/01/17 **陳水扁政府第二任期正名**（修正 Stage 0 誤寫蔡英文）/ 1914 太魯閣事件 + 2004 太魯閣族從泰雅族分出 / 1875 沈葆楨開山撫番 + 1880s 漢人初拓 / 1913 豐田、吉野、林田移民村（179 戶 866 人） / **1930-1940s 布農族系列遷徙**（非單一 1937 年）/ 1951 玉里 7.3 + 1986 規模 6.8 + 2024/04/03 **ML 7.1**（初測 7.2 後修訂）/ **1986/08/17 慈濟醫院開幕**（修正 Stage 0 誤寫 1991）+ 證嚴法師 1966 起點 / 1980 北迴鐵路通車（基隆-花蓮 18 hr→5 hr）/ 蘇花改 2020 通車 / 觀光客 21 萬（2024）vs 660 萬正常 = **降幅 96.8%** → 結尾首尾呼應撒奇萊雅族「燃身」記憶
- **品質**：8,211 CJK chars（超出 5000-6000 target by 37%，匹配 sibling 宜蘭 7,922 慣例）/ 27 footnotes / **6 Wikimedia images**（1 hero + 5 inline，CC BY-SA hot-link）/ 10 H2 narrative + 4 metadata = 14 total / 2 策展人筆記 + 1 ✦ pull quote / **article-health rewrite-stage-4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=3** ≤ 3 pass / 對位句 **0 處** / 破折號 **2 處** / 三角自檢 PASS
- **Research**: [reports/research/2026-05/花蓮縣.md](../../reports/research/2026-05/花蓮縣.md) — Stage 1 43 次搜尋 / 20 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK**: 7 ⚠️ flags 全處理（撒奇萊雅 2007/01/17 **陳水扁政府第二任期** / 慈濟醫院 **1986/08/17 啟業** / **6 族 not 5 族**（含噶瑪蘭族）/ 0403 地震 **ML 7.1**（2025/02/01 修訂，初測 7.2）/ 布農族 **1930-1940s 系列遷徙** / 加禮宛 2000+ 死 + 太魯閣 330 死 ⚠️ 二手引述標明）
- **Cross-link**: 8 forward (宜蘭縣 sibling / 基隆市 / 台灣國家公園 / 台灣板塊運動與地震活動 / 台灣原住民族歷史與正名運動 / 台灣原住民族 16 族文化地圖 / 日治時期 / 林義雄) + reverse 加到基隆市
- **Pilot retrospective 5 條校準執行**：雨量分層（4,000mm 山區 / 334 雨日 / 三力疊加）/ 區間時間（1875/1878/1913/1914/1930s-40s/1951/1980/1986/2004/2007/2020/2024）/ 衰退數字（觀光客 21 萬 vs 660 萬 = 3.2%、降幅 96.8%、復原 7 年）/ 本地 vs 觀光客 fault line（帖喇·尤道 3 條 verbatim quotes 貫穿）/ 日治現代化具體化（1913 豐田 179 戶 866 人 + 吉野 + 林田 + 大理石礦 + 1980 北迴 + 1986 太魯閣國家公園）

### 新竹縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 2 — 235 年義民信仰與全台第一人均所得住同一條頭前溪 / Geography 縣市 / 5807 字 / 40 footnote / 7 Wikimedia images）

- **Article**: [knowledge/Geography/新竹縣.md](../../knowledge/Geography/新竹縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent commit b457dbbb1)
- **核心矛盾**：「235 年的義民信仰，與全台第一的人均所得，住在同一條頭前溪」
- **Hook**：義民節下午四點新埔燈篙開場 → 1786 林爽文之役 + 1787 乾隆賜「褒忠」匾 + 1788 奠基 / 1790 正廳 / 1791 全廟竣工三段式（修正 Stage 0「1788 竣工」誤）/ 1835 金廣福閩客合股開墾大隘（姜秀鑾 + 周邦正 + 林德修，全台罕見閩客合作）/ 九降風 → 柿餅 / 米粉 / 椪風茶（東方美人）/ 司馬庫斯部落議會土地共有制 / 1988 縣府從新竹市遷至竹北市（Stage 0 寫 1989 校正為 1988）/ 結尾「義民信仰旁邊的台積電寶山二廠」首尾呼應
- **品質**：5,807 CJK / 40 footnotes / **7 Wikimedia images** / 7 H2 narrative scene-led / 2 策展人筆記 + 1 ✦ pull quote / **Stage 4 hard=0 warn=0 全綠** / Stage 3.5 hard=0 / prose-health score 4 (warn=2 是 plugin 對 article 標準的 cosmetic) / 對位句 **0 處** / 破折號 **0 處** / 三角自檢 PASS
- **Research**: [reports/research/2026-05/新竹縣.md](../../reports/research/2026-05/新竹縣.md) — Stage 1 46 次搜尋 / 18 verbatim quotes / 10 ⚠️ flags audit pass
- **FACTCHECK**: 10 ⚠️ flags 全處理（姜阿新洋樓修正為 1946-1949 戰後 / 義民廟 1788 奠基-1790 正廳-1791 全廟三段式 / 王世傑 1711 入墾與 1718 隆恩圳分開 / 沈葆楨歸功 sidestep / Pocaal 不寫 Tek-chham / 客家比例 67.8% verbatim / 200 多 vs 三百並陳）
- **Cross-link**: 8 forward (基隆市 / 苗栗縣 sibling / 客家文化與語言 / 客家飲食文化 / 族群 / 台積電 / 半導體產業 / 行政區劃) + 2 reverse 加到 基隆市 + 苗栗縣
- **Pilot retrospective 5 條校準執行**：九降風分層 / 區間時間（清領拓墾 1718-1875 / 義民廟 1788-1791 / 縣治 1989）/ 衰退轉型 frame 帶具體數字（人口 12 萬→22 萬翻倍 / 竹北人均所得 144.2 萬元）/ 本地 vs 觀光客 fault line（義民節下午四點 vs 內灣老街週末）/ 日治現代化具體化（湖口大正巴洛克紅磚 / 內灣支線 1950s 服務林業礦業）

### 苗栗縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 1 — 客家硬頸的縣用八年選出讓縣庫翻倍負債的縣長 / Geography 縣市 / 6123 字 / 36 footnote / 8 Wikimedia images）

- **Article**: [knowledge/Geography/苗栗縣.md](../../knowledge/Geography/苗栗縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a5c9d962244d842fc commit e90b16d69)
- **核心矛盾**：「客家硬頸的縣，用八年選出讓縣庫翻倍負債的縣長」（17 字 ≤ 30）
- **Hook**：開場「五月雪不是真雪，是油桐花」場景 → 道卡斯族「貓裡」 + 1889 改名「苗栗」（光緒 15 年）/ 18-19 世紀廣東客家移民（惠州 + 嘉應州 + 潮州）/ 1903 山線鐵路通車 + 1922 海線通車 / 樟腦業日治頂峰 ~85% 全球（1930s 前後）+ 1918 三義吳進寶起樟木雕（樟木戰前 → 戰後龍眼木）/ 賽夏族矮靈祭兩年一次農曆 10/15 南庄向天湖 + 五峰（民國 97/102 文資登錄）/ 2002 客委會桐花祭起 + 客家比例 62.5% 全台最高（110 年客委會調查）/ 2008-2014 劉政鴻兩屆任期負債三口徑 202 億→676 億帳面 vs 648 億估計 / 2010/06/09 怪手強剷大埔自救會稻田 + 2010/08/03 朱馮敏 73 歲喝農藥自殺 + 2013/07/18 張藥房強拆 + 2013/09/18 張森文投水身亡 + 2014/01 判決違法徵收 / 2016/10/06 監察院彈劾劉政鴻（彈劾數字 31.55% / 2.1 億）/ 客家圓樓 1.2 億 + 客家大院 8000 萬蚊子館 / 結尾「兩個自我同時活著」結構（硬頸與五星級）+ 「硬頸是不離開土地」首尾呼應
- **品質**：6,123 CJK chars (136% of 4500，略超 5000-6000 ~100 字) / 36 footnotes / **8 Wikimedia images**（1 hero + 7 inline CC BY-SA hot-link）/ 9 H2 narrative scene-led（油桐花 / 1889 改名 / 樟腦 → 三義木雕 / 賽夏矮靈祭 / 客家桐花祭 / 劉政鴻財政 / 大埔事件 / 客家圓樓蚊子館 / 兩個自我同時活著）/ 2 策展人筆記 + 3 ✦ pull quote / article-health rewrite-stage-4 **hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=3** ≤ 3 pass / 對位句 **1 處**（verbatim 例外「五月雪不是真雪是油桐花」，讀者預設 default case）/ 破折號 **0 處** / 三角自檢 PASS
- **Research**: [reports/research/2026-05/苗栗縣.md](../../reports/research/2026-05/苗栗縣.md) — Stage 0 §觀點成型 (Opus main) + Stage 1 (Sonnet sub-agent) 44 次搜尋 / 19 verbatim quotes / 8 ⚠️ fact flags audit pass
- **FACTCHECK**: 8 ⚠️ flags 全處理（客家比例用 **62.5%** 110 年客委會 verbatim 非簡化「60%」/ 樟腦 85% 全球保留 verbatim + 標日治 1930s 頂峰時間 / 樟木戰前 vs 龍眼木戰後明確區分 / 朱馮敏 73 歲維基 verbatim / 監察院彈劾數字 31.55% + 2.1 億保留 / **「1981 全縣電氣化」claim Stage 1 未 verify → 完全刪除** / 賽夏「兩百年」改 paraphrase「從清領延續至今至少超過兩百年」+ 民國 97/102 文資登錄具體年份 / 202 vs 676 vs 648 億三口徑釐清在正文）
- **Cross-link**: 8 forward (客家文化與語言 / 客家飲食文化 / 台灣原住民族 16 族文化地圖 / 鍾理和 / 台灣傳統工藝與無形文化資產 / 基隆市 22 縣市 sibling / 台灣行政區劃 / 台灣都市發展與城鄉差距) + 反向 cross-link 加到 基隆市 (manual)
- **Pilot retrospective 5 條校準執行**：雨量分層（多霧山地養樟樹）/ 區間時間（劉政鴻 2008-2014 兩屆任期 / 大埔 2010-2014 多事件時序）/ 衰退數字（676 億 + 58 億赤字 + 53 萬戶籍 + 62.5% 客家比例）/ 本地 vs 觀光客 fault line（客家庄主場 vs 觀光客吃客家小炒）/ 日治現代化具體化（山線 1903 / 海線 1922 / 樟腦 85% 全球 1930s 頂峰 / 三義 1918 吳進寶）

### 連江縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 1 — 離台灣最遠的縣是離冷戰最近的縣 / Geography 縣市 / 6786 字 / 39 footnote / 5 Wikimedia images）

- **Article**: [knowledge/Geography/連江縣.md](../../knowledge/Geography/連江縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-aa7a89f73609cc425 commit 5c2a11588)
- **核心矛盾**：「離台灣最遠的縣，是離冷戰最近的縣」（17 字 ≤ 30）
- **Hook**：南竿山稜往北看，福州城在 16 公里外開場 → 7,900-8,300 年前亮島人考古打開時間軸 / 1617 沈有容東沙諭退倭寇大埔石刻 41 字「萬曆彊梧大荒落地臘後挾日宣州沈君有容獲生倭六十九名於東沙之山不傷一卒閩人董應舉題此」/ 1949 國軍撤退馬祖 + 連江分治（全台唯一兩岸分治縣）/ 1956 戰地政務開始 + 1992/11/7 廢止 36 年「全國戒嚴 4 年差距」/ 軍管生活誌（國軍 5 萬 vs 居民 1 萬 / 宵禁九點 / 燈火管制 / 浮具禁令 / 兩層樓限制） / 1958 蔣中正題「枕戈待旦」/ 馬祖天后宮媽祖傳說（湄州迎回 vs 南竿靈穴兩說並陳）/ 福州話流失 94% / 2012 馬祖博弈公投同意 57.24% 至今 13 年無下文 / 北竿芹壁石頭村 1980s 廢墟 → 2000s 修復 / 黑嘴端鳳頭燕鷗約 200 隻 IUCN CR / 結尾「下次去馬祖，不要只看藍眼淚」首尾呼應南竿山稜往北看
- **品質**：6,786 CJK chars (151% of 4500，主文 6485) / 39 footnotes（略超 25-32 但全 canonical 格式 hard=0）/ **5 Wikimedia images**（1 hero + 4 inline CC BY-SA hot-link）/ 10 H2 narrative scene/object/contradiction 驅動 / 2 策展人筆記 + 2 ✦ pull quote / article-health rewrite-stage-4 **hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=3** ≤ 3 pass / 對位句 **0 處** / 破折號 **0 處** / 三角自檢 PASS
- **Research**: [reports/research/2026-05/連江縣.md](../../reports/research/2026-05/連江縣.md) — Stage 0 §觀點成型 (Opus main) + Stage 1 (Sonnet sub-agent) 47 次搜尋 / 19 verbatim quotes / 10 ⚠️ fact flags audit pass
- **FACTCHECK**: 10 ⚠️ flags 全處理（總面積 28.8 km² + 29.54/29.6 差異說明 / 戰地政務終止 1992/11/7 + 11/5 替代源 / 宵禁九點 verbatim 國家文化記憶庫 / 媽祖遺骸兩說並陳 湄州迎回 vs 南竿靈穴 / 距福州分層 9.25km 北茭半島最近海岸 + 50km 市區 + 標題 16km anchor / 博弈公投 57.24% 維基 / 芹壁修復 89-90 區間 / 亮島人 7,000-8,300 區間 / 黑嘴端燕鷗約 200 隻 IUCN CR / 東引島地質爭議標明）
- **Cross-link**: 8 forward (離島與海洋文化 / 台灣島嶼地理特色與形成 / 基隆市 sibling / 戒嚴時期 / 台灣國防與軍事現代化 / 語言多樣性與母語文化 / 媽祖與大道公的傳說 / 台灣海岸地形與海洋地景) + 1 reverse 加到 基隆市 (22 縣市 sibling)
- **DEFERRED reverse cross-link**: 戒嚴時期（pre-existing hard=2 word-count + image-health，per Stage 5.3 規則 DEFER，待 EVOLVE issue 處理那篇）
- **Pilot retrospective 5 條校準執行**：區間時間（戰地政務 36 年 1956-1992 非單一年份）/ 衰退數字（5 萬國軍 vs 1 萬居民 / 13,646 戶籍 / 94% 福州話流失）/ 本地 vs 觀光客 fault line（在地人記得燈火管制 vs 觀光客看藍眼淚）/ 軍管時期具體化（宵禁九點 / 浮具禁令 / 兩層樓限制 / 五萬國軍 verbatim）/ 找出「凌晨四點時刻」anchor（南竿山稜往北看福州 16 公里）

### 宜蘭縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 1 — 兩次選擇了自己的命運蘭陽平原從此沒回頭 / Geography 縣市 / 7922 字 / 32 footnote / 7 Wikimedia images + 1 video）

- **Article**: [knowledge/Geography/宜蘭縣.md](../../knowledge/Geography/宜蘭縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a61ef417396524272 commit 440802f50)
- **核心矛盾**：「兩次選擇了自己的命運，蘭陽平原從此沒回頭」（22 字 ≤ 30）
- **Hook**：開場三星田埂 vs 礁溪溫泉飯店對位 → 1796 吳沙烏石港登陸 + 1812 噶瑪蘭廳 + 1875 改宜蘭縣 + 1830s 噶瑪蘭族南遷花蓮 / 1915 太平山林業開發 + 1924/12/01 宜蘭線鐵路全通（102 橋 19 隧道 1263 萬圓 + 草嶺隧道 2,166.52m）/ 1980/02/28 林宅滅門血案（**台北信義路三段 31 巷 16 號** — 物理現場非宜蘭）+ 林義雄五結出身 + 1991 慈林教育基金會 + 1994 慈林新館回宜蘭 / 1981-1989 陳定南任縣長「45 萬個縣民老闆」+ 1987 反六輕 + 1987-12-13 華視「反六輕辯論：陳定南大戰王永慶」/ 噶瑪蘭族 2002 分裂正名（花蓮獲認 1,500 人 vs 宜蘭境內後裔多數未獲認）/ 1991 雪隧開工 / 2006/06/16 雪隧通車 12.9km（北宜高 600 億 vs 雪隧本體 185 億區分）/ 6,137 棟農舍 + 1,900 公頃流失 + 35% 全台農舍建照 + 460,486→448,763 人口 / 1996 童玩節 + 2007-2009 暫停 + 2010 復辦 / 結尾龜山島首尾呼應「等到我們這一輩都老了」
- **品質**：7,922 CJK chars (176% of 4500，超出 5000-6000 target by 32% 但 justified per pilot retrospective「篇幅跟核心矛盾對齊」)/ 32 footnotes / **7 Wikimedia images + 1 video**（1987-12-13 華視「反六輕辯論」一手影像）/ article-health rewrite-stage-4 **hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=2** ≤ 3 pass / 對位句 2 處（皆 verbatim 黃春明引語，保留）/ 破折號 0 處 / 10 narrative H2 + 4 appendix H2 = 14 total / 2 策展人筆記 + 2 ✦ pull quote / 三角自檢 PASS
- **Research**: [reports/research/2026-05/宜蘭縣.md](../../reports/research/2026-05/宜蘭縣.md) — Stage 0 §觀點成型 (Opus main) + Stage 1 (Sonnet sub-agent) 47 次搜尋 / 20 verbatim quotes / 8 ⚠️ fact flags audit pass
- **FACTCHECK**: 8 ⚠️ flags 全處理（雪隧費用「600 億北宜高全線 vs 185 億雪隧本體」明確區分 / 通車前車程「2 vs 3 小時」依出發點區分 / 蘇貞昌通車典禮原文 verbatim 找不到用 paraphrase + 標 ⚠️ / 太平山林業「1982 伐木終止 vs 1989 遊樂區成立」明確區分 / 噶瑪蘭族「2002 分裂正名」深挖 / 吳沙烏石港進入路徑標 ⚠️ 一手史料未直接確認 / 農舍六成非農用改用中文官方統計 / **🔴 林宅血案物理現場是台北信義路三段 31 巷 16 號非宜蘭** Stage 0 錯誤已修正）
- **Cross-link**: 6 forward (台灣行政區劃 / 台灣海岸地形與海洋地景 / 台灣農業地景與產業分布 / 台灣都市發展與城鄉差距 / 台灣溫泉地景 / 基隆市 22 縣市 sibling) + 反向 cross-link 加到基隆市
- **Pilot retrospective 5 條校準執行**：雨量分層（平原 2,500-3,000mm / 山區 5,500mm / 雨日 200+ 天 / 「乾季也是濕的」明確 layer）/ 區間時間（雪隧 1991 開工→1993 主坑→2006 通車 / 陳定南 1981-1989 / 噶瑪蘭族 1830s 南遷）/ 衰退數字（6,137 棟農舍 / 1,900 公頃流失 / 35% 全台農舍建照）/ 本地 vs 觀光客 fault line（三星田埂 vs 礁溪溫泉飯店全篇 weaving）/ 日治現代化具體化（宜蘭線 1924/12/01 全通 102 橋 19 隧道 / 草嶺隧道 2,166.52m / 太平山 1915 開發 / 礁溪溫泉 1915 公共浴場 1 萬圓）

### 嘉義市 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 1 — 被皇帝賜名嘉義卻成了最容易被略過的省轄市 / Geography 縣市 / 5902 字 / 32 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/嘉義市.md](../../knowledge/Geography/嘉義市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a5044629e5daf6b44 commit 99feb758a)
- **核心矛盾**：「被皇帝賜名嘉義，卻成了最容易被略過的省轄市」（29 字 ≤ 30）
- **Hook**：中央噴水池四百年開場 → 1704 諸羅築城木柵四門 / 1786 林爽文之役守城兩個月乾隆敕賜「嘉義」（嘉其死守城池之忠義）/ 1908 北回歸線第一代標塔（全世界第一座，為慶祝縱貫鐵路通車）→ 1912 颱風 → 1923 裕仁太子諭示 → 1926 第三代 → 約 1930s 中期第四代 → 第六代今貌 / 1899 阿里山鐵路規劃 + 1912 嘉義至二萬坪 66.6km 通車 + 1914 延伸阿里山 / 1914-1963 木都 50 年「東洋第一製材場」/ 1931 KANO 嘉義農林甲子園準優勝（漢人 + 原住民 + 日本人混合隊伍 + 教練近藤兵太郎）/ 1947 二二八嘉義事件水上機場圍城 + 嘉義火車站前處決陳澄波 + 潘木枝 + 盧鈵欽 + 柯麟 + 陳容貌 / 1949 林添壽噴水雞肉飯肉雞起源 → 1951-1965 美援白羽火雞演化 / 1991 嘉義縣治從嘉義市遷至太保（非 1995）/ 17 年人口下降 1.26 萬人 / 結尾「桃城的圓環，三百年的同一個位置」敘事閉環
- **品質**：5,902 CJK chars (131% of 4500) / 32 footnotes / **6 Wikimedia Commons images**（hero + 5 inline）/ article-health rewrite-stage-4 **hard=0 warn=0 全綠** / Stage 3.5 hard=0 / **prose-health score=1**（極優）/ 對位句 **0 處** / 破折號 **0 處** / 三角自檢 PASS
- **Research**: [reports/research/2026-05/嘉義市.md](../../reports/research/2026-05/嘉義市.md) — Stage 0 §觀點成型 (Opus main) + Stage 1 (Sonnet sub-agent) 42 次搜尋 / 18 verbatim quotes / 7 ⚠️ fact flags audit pass
- **FACTCHECK**: 7 ⚠️ flags 全處理（乾隆詔書用市政府 verbatim「嘉其死守城池之忠義」非轉述 / 北回歸線第四代用「約 1930 年代中期」不單一年份 / 嘉義縣治遷太保用 **1991 年**非 1995 / 陳澄波享年實歲 52 / 虛歲 53 雙標 / KANO 三族混合不逐一錯標個別選手 / 顏思齊笨港登陸避開歸嘉義縣非嘉義市 / 火雞肉飯演化 1949 林添壽肉雞 → 1951-1965 美援白羽火雞 完整過程明寫）
- **Cross-link**: 7 forward + 1 reverse 加到 [knowledge/Geography/基隆市.md](../../knowledge/Geography/基隆市.md)（「跟基隆同樣是被首都框架壓住的城市」）
- **Pilot retrospective 5 條校準執行**：降雨 layer（亞熱帶季風 + 夏雷雨冬乾燥）/ 區間時間（1960 年代後期阿里山林業逐漸式微 / 木都 1914-1963 共 50 年）/ 「最容易被略過」frame 具體數字（27→26 萬人口曲線、無高鐵站、1991 縣治遷太保、17 年下降 1.26 萬）/ 本地 vs 觀光客 fault line（觀光客排隊店 vs 在地人繞道 / 桃城別名 vs 嘉義官方名）/ 日治現代化具體化（1908 標塔 / 1912 鐵路 66.6km / 1914 製材所「東洋第一」/ 1933 火車站宇敷赳夫 / 1936 菸酒公賣局）

### 澎湖縣 NEW — 2026-05-18 2026-05-18-004535-manual（22 縣市系列 batch 1 — 兩次拒絕賭場菊島選擇的不是清貧 / Geography 縣市 / 5994 字 / 40 footnote / 6 Wikimedia images）

- **Article**: [knowledge/Geography/澎湖縣.md](../../knowledge/Geography/澎湖縣.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑，Opus sub-agent worktree-agent-a755e6e7a3cf2e8d6 commit 72c68a8aa)
- **核心矛盾**：「兩次拒博弈，澎湖選擇的不是清貧，是主張自己要成為什麼」（28 字 ≤ 30）
- **Hook**：凌晨四點馬公中央街沒有人開場 → 1604 沈有容諭退荷蘭人碑（萬曆 32 年）/ 1622 荷蘭佔風櫃尾 + 1624 退去台南 / 1885 中法戰爭法軍 3-6 月孤拔病死馬公 / 1895 日軍從澎湖登陸接收台灣 / 1740-820 萬年玄武岩 90 座島 89 座玄武岩 + 1 花嶼安山岩 / 跨海大橋 1970 一代 + 1996 二代 2,494m 縫六鄉市成一個澎湖 / 2002 華航 611 空難 + 2003 第一場花火節 / 19 座有人居 + 東吉嶼 3,000→20 人 / 2009 反對 56.44% + 2016 反對 81.07% / 釋昭慧「小蝦米打敗大財團」 / 望安綠蠵龜 2014 僅 1 隻 → 2024 5 月首隻回巢 → 結尾「冬天的菜宅」石牆背風處作物
- **品質**：5,994 CJK chars (133% of 4500) / 40 footnotes / **6 Wikimedia Commons images**（hero 跨海大橋 + 開臺天后宮 / 桶盤玄武岩柱 / 二崁聚落屋頂 / 七美雙心石滬 + 1 公視我們的島 + 1 望安綠蠵龜 video）/ article-health rewrite-stage-4 **hard=0 warn=0 全綠** / Stage 3.5 hard=0 / prose-health score=3 ≤ 3 pass / 對位句 3 處 at limit (deliberate 結構性 anchor) / 破折號 0 處 / 三角自檢 PASS
- **Research**: [reports/research/2026-05/澎湖縣.md](../../reports/research/2026-05/澎湖縣.md) — Stage 0 §觀點成型 (Opus main) + Stage 1 (Sonnet sub-agent) 46 次搜尋 / 18 verbatim quotes / 6 ⚠️ fact flags audit pass
- **FACTCHECK**: 6 ⚠️ flags 全處理（開臺天后宮用 1604 verbatim 非 1593 / 跨海大橋二橋 2,494m verbatim / 雙心石滬「574 座以上 / 吉貝周遭 109 座」分層 / 第二次博弈公投 81.07% 選委會官方 / 綠蠵龜 2014 僅 1 / 2022 3 隻 6 窩 / 2024 5 月首隻 / 人口戶籍 10.8 萬 vs 常住 8.2 萬內政部 + 2020 普查分層）
- **Cross-link**: 7 forward (澎湖民俗文化 / 離島與海洋文化 / 台灣島嶼地理特色與形成 / 媽祖與大道公的傳說 / 台灣行政區劃 / 清法戰爭 / 荷西明鄭時期) + 2 reverse 加到澎湖民俗文化 + 離島與海洋文化
- **Pilot retrospective 5 條校準執行**：雨量分層（年雨量 1,000mm 全台最低）/ 區間時間（1622-1624 荷蘭 / 1885 法軍 / 1895 日軍）/ 衰退數字（漁獲 40 億→20 億 / 戶籍 10.8 萬→常住 8.2 萬 / 老化指數 194% / 東吉嶼 3,000→20）/ 本地 vs 觀光客 fault line（夏天觀光客 vs 澎湖人冬天才是真澎湖）/ 日治現代化具體化（1920 媽宮改名馬公 / 漁翁島燈塔 1875 / 1895 田中綱常設行政廳）

### 基隆市 NEW — 2026-05-18 2026-05-17-230616-manual + cron twmd-rewrite-daily polish 0000（22 縣市系列 PILOT — 離台北最近的港口最被台北看不見 / Geography 縣市 / 5171 字 / 32 footnote / 3 Wikimedia images）

- **Article**: [knowledge/Geography/基隆市.md](../../knowledge/Geography/基隆市.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑) — **22 縣市系列首篇 PILOT**
- **核心矛盾**：「離台北最近的港口，最被台北看不見」（17 字 ≤ 30）
- **Hook**：凌晨四點崁仔頂魚市拍賣聲開場 → 1626 西班牙聖薩爾瓦多城 / 1875 沈葆楨改名「基地昌隆」/ 1884 中法戰爭法軍 8 個月 / 1855 雞籠中元祭「張頭許尾」/ 築港五期 1899-1935 / 1984 世界第七大貨櫃港 / 三重打擊（1960s 高雄港超越 + 1979 桃機 + 1980s 礦業圈崩解）/ 廟口吳家鼎邊銼 1919 + 李鵠 1882 / 正濱彩色屋對面阿根納廢墟 / 林右昌「希望之城」+ 謝國樑 2024 罷免案 / 39% 跨縣市通勤 + 26% 空屋率 + 359,102 人 → 結尾首尾呼應「凌晨四點黑鳶在等」（黑鳶從 2013 年 272 隻長回 808 隻）
- **品質**：5,171 CJK chars (115% of 4500) / 32 footnotes / **3 Wikimedia Commons images**（hero 正濱漁港 + scene 和平島 + scene 基隆港，皆 CC BY-SA 4.0 by Taiwankengo）/ article-health rewrite-stage-4 **hard=0 warn=0 全綠** / default profile warn=1（僅「未人工審核」inherent）/ 三角自檢 PASS（算術 / 單位 / 引語）
- **Cron polish (0000)**：sweep-in 接手 230616-manual session 未 commit 的 pilot 文 — (1) 補 3 張 Wikimedia upload.wikimedia.org hot-link 圖（plugin allowed external，免 cache）+ §圖片來源 改寫，清掉 image-health HARD blocker；(2) 修 L157 對位句型「不是內陸大島，是海洋國家」→「台灣是一個海洋國家。而基隆，從西班牙人 1626 年插下那面旗子開始，就一直在替這座島接收海上來的東西」；(3) 移除 §11 Tier 2 抽象 metaphor「縮影」「核心張力」；(4) hollow words 從 5 降到 3（「不斷擴建」「逐漸超越」「重要的漁港之一」三處改寫）
- **Research**: [reports/research/2026-05/基隆市.md](../../reports/research/2026-05/基隆市.md) — Stage 0 §觀點成型 (6 核心問題 + 7 品質維度 + Geography 類型加權) + Stage 1 41 次搜尋（中文 24 / 英文 5 / WebFetch 5 / Wikipedia direct 1 / 重複交叉 6）+ 14 章節 + 17 verbatim quotes + 4 fact flags audit pass
- **FACTCHECK**: 4 ⚠️ flag 已 conservative 化（1969 中島貨櫃中心 → 1960 年代後期逐漸超越 / 沈葆楨奏摺原文 → 多源歸功表述 / 主普壇 1974 vs 1976 → 1970 年代中期 / 築港四期 vs 五期 → 改五期）
- **Cross-link**: 7 forward (台灣都市發展 / 行政區劃 / 城市特色 / 金瓜石 / 野柳 / 海岸地形 / 都市與城鄉差距) + 1 reverse 加到金瓜石（黃金經正濱漁港運日本）
- **Pilot retrospective**: 5 條新校準寫進 [reports/cities-series-planning-2026-05-17.md §10](../../reports/cities-series-planning-2026-05-17.md)（降雨數字 layer / 結構性轉變用區間時間 / 衰退 frame 必有具體數字 / 本地 vs 觀光客 fault line / 日治現代化必具體化）+ 22 entries INBOX 共通說明更新 + 「凌晨四點時刻」anchor 找法

### 臺灣前途決議文 NEW — 2026-05-17 2026-05-17-184444-manual（兩個字「目前」撐了二十七年 / History 政治 / 4523 字 / 29 footnote）

- **Article**: [knowledge/History/臺灣前途決議文.md](../../knowledge/History/臺灣前途決議文.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑)
- **核心矛盾**：「一份暫時性的模糊，變成永久性的共識」
- **Hook**：1999 年初郭正亮寫「國號中華民國」、林濁水加「目前」兩字場景 → 結尾 2026.5.17 林濁水評「很得宜」+ 年輕世代不知道這份文件 + 敘事閉環「前途決議文最大的成功，是讓自己變得不需要被記住」
- **品質**：4,523 CJK chars (101% of 4500) / 29 footnotes / 0 images（1999 政黨會議照片全為新聞社版權無 CC 授權，image-health hard=1 accepted deviation）/ article-health rewrite-stage-4 word-count ✓ prose-health score=1 ✓ / 其他 6 plugin pass
- **Research**: [reports/research/2026-05/臺灣前途決議文.md](../../reports/research/2026-05/臺灣前途決議文.md) + [reports/research/2026-05/臺灣前途決議文-deep-research.md](../../reports/research/2026-05/臺灣前途決議文-deep-research.md) — 42 searches (26 中文 + 10 英文 + 6 primary WebFetch) / 15 fact entries + 9 verified quotes + 5 story scenarios / 33 references
- **FACTCHECK**: 46 atoms verified, 4 errors fixed（1998 高雄選舉事實錯誤 / 許信良辭職因果錯誤 / 卓榮泰職稱時間錯誤 / 腳註 [^21] URL 指向無關文章）
- **Cross-link**: 3 bidirectional — 台灣民主轉型、台灣選舉與政黨政治、台海危機與兩岸關係發展
- **敏感素材**：政治文件歷史——各方解讀並存（獨派/中間/國民黨/北京），不下「正確」判斷；台獨黨綱與前途決議文「取代還是並存」未定論如實呈現

### 臺灣漫遊錄 NEW — 2026-05-23 2026-05-23-215140-manual（楊双子偽譯作小說 / Art 文學作品 / 4639 字 / 34 footnote / 3 圖）

- **Article**: [knowledge/Art/臺灣漫遊錄.md](../../knowledge/Art/臺灣漫遊錄.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑)
- **核心矛盾**：「楊若暉留下 11 本帳本，楊若慈寫了一本『妹妹翻譯的書』」（28 字）— 承載 dead twin/living twin + 偽翻譯結構 + 食物書寫三層
- **Hook**：2026-05-19 倫敦 Tate Modern 國際布克獎現場 → 結尾首尾呼應 2015-06-19 妹妹過世當天楊若慈打開帳本 + 春山書封「青山千鶴子・著／楊双子・譯」掛名
- **Title 冒號三明治**：「臺灣漫遊錄：一本『妹妹翻譯的書』，從春山走到了倫敦的領獎台」
- **品質**：4,639 CJK chars (103% of 4500) / 34 footnotes / 3 Wikimedia CC BY-SA 4.0 圖片 (hero + 2 inline，aspect-check 全過) / article-health rewrite-stage-4 hard=0 warn=0 全 8 plugin pass / prose-health score 1（破折號 5 處 / 對位句 1 處在金翎 verbatim quote）
- **Stage 1 deep research**: spawn general-purpose agent，60+ queries（35+ WebSearch / 25+ WebFetch）落 [reports/research/2026-05/taiwan-travelogue.md](../../reports/research/2026-05/taiwan-travelogue.md) 764 行；6 critical falsifications（24萬→11萬印量 / 春山 2017→2018-12 創社 / 13 道菜→12 道菜 / 鐵道終點台南→高雄 / 楊双子 Booker 致辭未提妹妹 / 楊若暉死亡 timeline 細化）
- **Cross-link**: 4 雙向 — 當代台灣文學、解嚴後台灣文學、日治時期文學、台灣文學史；2 forward only（朱天文 + 吳明益，sibling 延伸閱讀 format 異於 canonical bullet style，defer 升級而不擴大本次 scope）
- **Breaking news anchor**: 2026-05-19 倫敦領獎只發生 4 天前；春山三天內加印 7 萬本，總印量 11 萬本（莊瑞琳「比韓江諾貝爾還強勁」）
- **核心 verbatim quotes**: 楊双子布克致辭 6 段 + NBA 致辭 3 段 + 報導者專訪 5 段 / 金翎布克致辭 + 翻譯哲學「果泥 vs 多汁的果粒」/ Natasha Brown 評語中英對照 / 朱宥勳「楊若慈虛構的楊若暉翻譯了楊若慈虛構的青山千鶴子之作品」/ 莊瑞琳「比韓江諾貝爾還強勁」

### 三毛 NEW — 2026-05-17 2026-05-17-184444-manual（撒哈拉流浪作家 / People 文學 / 4508 字 / 24 footnote）

- **Article**: [knowledge/People/三毛.md](../../knowledge/People/三毛.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑)
- **核心矛盾**：「她教會一代人想像遠方，自己卻一生在逃離近處」
- **Hook**：1955 年國二數學老師墨圈事件 → 結尾 Ruta Sanmao 加那利群島旅遊路線 + 荷西墓訪客簿
- **品質**：4,508 CJK chars (100% of 4500) / 24 footnotes / 0 images（1991 歷史人物無 CC 圖片，image-health hard=1 accepted deviation）/ article-health rewrite-stage-4 word-count ✓ / 其他 6 plugin pass
- **Research**: [reports/research/2026-05/三毛.md](../../reports/research/2026-05/三毛.md) — 69 searches (43 中文 + 26 英文 dual-agent) + 16 WebFetch / Stage 0 假說 14 條驗證（4 條修正：荷西死亡地點 La Palma / 年齡差 8 歲 / 金馬到死 25 天 / 王洛賓 1990 年）
- **FACTCHECK**: ~157 atoms verified, 2 errors fixed（結婚五年→六年 / 乃門→瑪法達 simplified）
- **Cross-link**: 5 bidirectional — 白先勇、林青霞、台灣民歌運動、台灣散文、席慕蓉
- **敏感素材**：死因四說並存不下判斷（官方自殺 / 母親意外說 / 謀殺說 / 情緒說）；王洛賓關係採事實面不猜心理；殖民視角引 Mike Fu 序言

### 區秀詒 NEW — 2026-05-17 二輪 5x parallel opus agents（馬來西亞策展人在台灣 / People / 5583 字 / 35 footnote）

- **Article**: [knowledge/People/區秀詒.md](../../knowledge/People/區秀詒.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 (Stage 0-5 完整跑) / parallel opus agent (worktree-agent-a89da1f6270378c33)
- **核心矛盾**：「『不在場』才是創作位置——離開馬來西亞才寫得出馬來西亞」（區秀詒本人 2015 verbatim）
- **品質**：5,583 CJK chars (124% of 4500) / 35 footnotes / 3 fair use editorial commentary stills (Prelude Interstellar 2024 + Mengkerang 2013 + Pak Tai Foto 2015) / article-health rewrite-stage-4 hard=0 warn=0 ✓
- **Research**: [reports/research/2026-05/區秀詒.md](../../reports/research/2026-05/區秀詒.md) — Stage 0 §觀點成型 + 78 referenced footnotes / 在世藝術家引語 Ctrl-F 過 8 條（6 條 NML 鄭文琦 2015 訪談 verbatim + 2 條 Sharon Chin sharonchin.com）
- **Multi-source peer**：避免單一 NML 視角 — 加入 Sharon Chin「politics of images, instead of political images」框（馬來西亞 peer 校正鄭文琦/高森信男台北中心視角）
- **Commit**: `0feffb185`（agent 直推 origin/main）

### 新生態藝術環境 NEW — 2026-05-17 二輪 5x parallel opus agents（1992-1999 杜昭賢 / Art × History / 4540 字 / image hard=1 no-media 邊界）

- **Article**: [knowledge/Art/新生態藝術環境.md](../../knowledge/Art/新生態藝術環境.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 / parallel opus agent (worktree-agent-acb291faf3abff6d6)
- **核心矛盾**：「體制外空間誕生在體制將要進場補助的前夕」
- **品質**：4,540 CJK chars / 19 footnotes / **0 images（no-media 邊界 per Step 4.3，1990s 替代空間檔案無 CC source）** / 其他 6 plugin 全 pass
- **大事實修正**：ARTICLE-INBOX entry 寫「1990-1995 trio 杜昭賢 + 蔣耀賢 + 葉竹盛」全錯 — Stage 1 cross-source 證實是「1992-1999 杜昭賢單人創辦」7 年運作。LESSONS 候選：INBOX peer ingestion metadata 需要 cross-verify
- **Research**: [reports/research/2026-05/新生態藝術環境.md](../../reports/research/2026-05/新生態藝術環境.md) — 孤源 fact 處理表（1992 年「6 月」精確月份 single source / 1999 vs 1997 結束分歧 / 「四百多坪日本歌德式建築」單源 → 改概數 / 藝術總監「鄭明全」單源 → footnote 標 NML 葉杏柔）
- **Commit**: `27b424e1d`（cherry-picked as `e0d618544`）

### 群島思維 NEW — 2026-05-17 二輪 5x parallel opus agents（中華 vs 群島 SSODT / Culture × History / 5894 字 / 26 footnote）

- **Article**: [knowledge/Culture/群島思維.md](../../knowledge/Culture/群島思維.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 / parallel opus agent (worktree-agent-aff3ca74f76df601b)
- **核心矛盾**：「中華框架 vs 群島框架的台灣身份」（SSODT 三視角並列：A 地理 / B 語言學 / C NML 當代藝術）
- **品質**：5,894 CJK chars (131%) / 26 footnotes / 3 CC BY-SA Wikimedia (austronesian-migration-map + beinan-stone-pillar + lapita-potsherd) / article-health rewrite-stage-4 hard=0 warn=0 ✓
- **政治敏感處理**：明確避免「去中國化」修辭。文中三次重申「補完地圖、不取代第一張」。結語停留在文化與學術討論層，第三節 SSODT 段直接寫「三張地圖都沒有錯」
- **NML local sources 用法**：4 期 issues（Hermeneutics of Nusantara #34 / Recalling Islands #21 / Twinning the Wastelands #12 / Legible Singapore #47）全部讀過 + Anderson「比較作為話語策略」+ 魏月萍引語 / 22 篇 Nusantara Archive articles 背景脈絡
- **Research**: [reports/research/2026-05/群島思維.md](../../reports/research/2026-05/群島思維.md) — Blust 多樣性原理 + Gray 2009 Bayesian 5230 年前 + 鍾國芳構樹 DNA 三條獨立路徑
- **LESSONS 候選**：(1) Wikimedia thumbnail HTTP 400「Use thumbnail sizes listed」要 RESEARCH.md 寫進去 (2) inbox spec 錯誤「屏東林班南島文化博物館 2023 啟用」實際無此館，台東史前文化博物館 2023 重新開放才正確
- **Commit**: `b407a77b6`（cherry-picked as `d6222fa5b`）

### 數位荒原 NEW — 2026-05-17 二輪 5x parallel opus agents（沒商業模式撐 12 年 / Art / 4599 字 / 26 footnote）

- **Article**: [knowledge/Art/數位荒原.md](../../knowledge/Art/數位荒原.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 / parallel opus agent (worktree-agent-aace8848619b81714)
- **核心矛盾**：「沒商業模式的策展平台怎麼撐 12 年」
- **Title 三明治**：「數位荒原：一個沒商業模式的網路藝評平台怎麼活了 12 年」
- **品質**：4,599 CJK chars (102%) / 26 footnotes / 3 images (NML issue covers letterboxed to 1600×900 hero / inline 2.0 aspect / fair use editorial commentary) / article-health rewrite-stage-4 hard=0 warn=0 ✓ / 對位句型 0 / 破折號 0.22 per 1500 chars
- **NML local sources 用法**：README + manifest.json + articles-meta.json (88% 集中度 + 2011-2023 產出曲線) + issues/INDEX.md (56 期) + trial-issue 全文 (三家 partner ET@T/DAF/Project Glocal) + twinning-the-wastelands.md (Issue 12 / 2013-11 / R.A.P.)
- **大事實修正**：peer-ingestion 報告寫「2021 第二期 Twinning Archipelago」實際 Issue 12 2013-11。本文修正並標 footnote
- **WebSearch 14 次** canonical 證據：國藝會檔案庫補助金額（第一年 35 萬 2017 / 第二年 40 萬 2018）+ DAF 2008-09-18 成立 + ET@T 1995 + DAC 2009 + NML vs 典藏 ARTouch / 非常廟 VT 2023 解散 / etat archive 萎縮 三條件「無紙媒 + 無實體空間 + 個人主編」孤例
- **Peer-bias 補位**：cite 王柏偉、高森信男、印卡、蔡長璜、區秀詒避免單一鄭文琦視角
- **Research**: [reports/research/2026-05/數位荒原.md](../../reports/research/2026-05/數位荒原.md)
- **LESSONS 候選**：(1) peer ingestion 分析報告也會出錯需要 cross-verify (2) Hero aspect ratio 預設陷阱：NML cover 3:1 → letterbox 補強指南要寫進 §1.9.2
- **Commit**: `728f5e596`（cherry-picked as `67809e7b3`）

### 陳建年 NEW — 2026-05-17 二輪 5x parallel opus agents（警察與詩人雙身份卑南族歌王 / People / 5041 字 / 27 footnote）

- **Article**: [knowledge/People/陳建年.md](../../knowledge/People/陳建年.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式 / parallel opus agent (worktree-agent-a90fcb5485c16d2bd)
- **核心矛盾**：「外公留下民族的歌，孫子戴上警徽寫海洋」
- **品質**：5,041 CJK chars (112%) / 27 footnotes (每 187 字 1 條，遠超密度要求) / 4 圖 (1 hero + 3 inline 全部 CC BY-SA 4.0 Taiwania Justo 2018 新竹 FENG live house) / article-health rewrite-stage-4 hard=0 warn=0 ✓ / 對位句型 1 / 破折號 15
- **🚨 大事實修正**：ARTICLE-INBOX entry 寫「父親（陸森寶）是 1950s 卑南音樂先驅」**錯誤**。三源驗證（zh.wiki / en.wiki / 國家文化記憶庫 / Taiwan光華 / 民報）一致記載**陸森寶是陳建年的外公（maternal grandfather），父親是陳光榮**。本篇 §一 用整段 + 策展人筆記顯式處理糾正，母系世系成為核心矛盾線
- **時序亮點**：2000 年 9 月得金曲後請調蘭嶼避紛擾，一待 17 年到 2017 退休
- **Research**: [reports/research/2026-05/陳建年.md](../../reports/research/2026-05/陳建年.md) — Stage 0 §觀點成型 + 三源驗證表 + verbatim 引語清單 + 媒體授權矩陣三表 + 38+ web 接觸紀錄
- **Forward 延伸閱讀** 5 條（張惠妹 / 當代原住民創作歌手 / 台灣民謠與歌謠 / 台灣獨立音樂 / 流行音樂與金曲獎），reverse cross-link defer
- **LESSONS 候選**：ARTICLE-INBOX entry 的家族關係 metadata 也需要 fact-check — entry 寫的事實會無條件被 routine agent 採信，inbox 寫錯會 propagate
- **Commit**: `ba8963702`（cherry-picked as `ba7f05fac`）

### 台灣災難志工文化 EVOLVE — 2026-05-17 twmd-rewrite-daily routine（鏟子超人 + 多頭指揮所 / Society / 從 921 到光復的災難志工文化譜系）

- **Article**: [knowledge/Society/台灣災難志工文化.md](../../knowledge/Society/台灣災難志工文化.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Evolution 模式（舊文 239 行 / 12 條 `## 參考資料` 0 inline footnote / 0 hero 0 inline 圖 / FLAT-END 修辭式結語 → 新版 5,933 CJK chars + 15 inline footnote + 1 hero + 1 inline 圖 + 具體場景結語 + 「慈濟模式 vs 多頭指揮所」核心矛盾節）
- **核心矛盾（30 字）**：「鏟子超人神話讓民間活力被歌頌，但 500 公尺三個指揮所暴露國家應變失能 — 兩面是同一面鏡子」
- **Hook（Title 三明治，保留 + 加 30 秒概覽）**：「鏟子超人與島嶼共時性：台灣災難志工文化如何影響國族認同」
- **品質**：5,933 CJK chars (132% of 4500 門檻) / 15 inline footnote / 11 narrative H2 (非編年體 / 場景與衝突 anchor) / prose-health score 0 (clean pass) / 0 對位句型 / 9 破折號 (well within 60 limit) / lastHumanReview true / lastVerified 2026-05-17
- **Research**: [reports/research/2026-05/災難志工文化-evolve.md](../../reports/research/2026-05/災難志工文化-evolve.md) — Stage 0 §觀點成型 完整六核心問題 + 3 核心矛盾候選收斂為單一矛盾 A / Stage 1 取材 4 WebSearch + 5 WebFetch / 16 facts triangulated + 3 facts flagged single-source / 媒體授權矩陣三表全填
- **大事實修正**：原文章「滾石唱片」陳建年發行公司錯誤 → 角頭音樂 / We Music（KKBOX / Spotify metadata 三源驗證） / 原文章鏟子超人連假人次「2 萬 / 4.1 萬 / 4.45 萬」無法 cross-verify → 改用中央社確認的「累積 6 萬 + 29 日單日 4 萬 4,500」 / 原文章缺颱風名 → 補上「樺加沙颱風外圍環流」（Wiki） / 原文章只寫「光復鄉」 → 補上「光復 + 鳳林 + 萬榮三鄉鎮」
- **媒體**：2 張 CC BY 2.0 圖（Hsu.shihhung 2003 + Liu Shu fu 2024，都來自臺中霧峰 921 教育園區 — caption 明確標示「兩個光復」地名巧合避免讀者誤以為是花蓮）
- **Cross-link defer**：4 forward 延伸閱讀（當代原住民創作歌手 / 台灣志工文化與公益參與 / 原住民神話 / 台灣原住民族土地正義與傳統領域）全部 valid，reverse cross-link 留待後續 cycle 處理（sibling 格式 audit 防止 pre-existing tech debt 被帶進來）
- **致謝**：原 contributor 漢堡王（wang1002jack@gmail.com）的 PR-style 投稿保留於文末

### 唐鳳 EVOLVE — 2026-05-16 2026-05-16-011113-manual（拒絕當天才的天才 / People / 深度進化）

- **Article**: [knowledge/People/唐鳳.md](../../knowledge/People/唐鳳.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Evolution 模式（舊文 19465 bytes / 0 footnote / 0 image / chronological list-dump → 新版 4598 字 + 44 footnote + 3 image + 核心矛盾組織小標題）
- **核心矛盾（28 字）**：「她拒絕當天才，世界堅持把她當天才」— Stage 1.4 從 5 候選收斂，10 verbatim quote + 5 fact 支持端 + 2 nuance 反方
- **Hook（Title 三明治）**：「唐鳳：她每一次有名的決定，都是在拒絕『天才』這個標籤」
- **品質**：4598 CJK chars (102% of 4500 門檻) / 44 footnote / 7 narrative H2（非編年體 / 全場景或衝突 anchor）/ 對位句型 3（全在 verbatim quote）/ 破折號 15（well within 45 limit for 4598 chars）/ 塑膠句 1（Marie Claire Leonard Cohen 引語）
- **Research**: [reports/research/2026-05/唐鳳.md](../../reports/research/2026-05/唐鳳.md) — Stage 0 §觀點成型 完整六核心問題 + 5 核心矛盾候選收斂 / Stage 1 取材 56 searches (24 中 + 16 英 + 16 WebFetch) / 45 facts with URL + year / 10 verbatim quotes verified / 6 場景 / 媒體授權矩陣三表全填
- **Hard gates 全過**：rewrite-stage-4 profile `hard=0 warn=0 passed=True` ✅ / 14 plugin 全 pass（frontmatter / format-structure / wikilink / link / cjk-punct / chronicle-lead / word-count / image-health / footnote-format / footnote-url / footnote-density / cross-reference / prose-health score 3 ≤ 3 / terminology / spore-writing）
- **核心場景 source 鎖定**：
  - 2020/2/2 凌晨口罩地圖 anchor scene + 江明宗 verbatim「唐鳳有決定權，還能自己改 code」（江明宗 Medium + TechNews 幕後團隊 + 衛福部官網 三源）
  - 2005 跨性別出櫃 verbatim「不管現在、過去或未來」+ 父親唐光華 verbatim 回應（中文維基 + 今周刊 父親專訪 兩源）
  - 2025/12/2 斯德哥爾摩 Right Livelihood Award 結尾 verbatim「Cyberspace is a conflict region」+「The superintelligence we are looking for is already here. It's us」(Right Livelihood 官方 + Focus Taiwan 中央社 + cyberambassador.tw 三源)
  - 2016 入閣三條件 + 林全 verbatim「行政院目前並沒有遠距上班的規範...這是可行的」（自由時報 + 數位時代 兩源）
  - 太陽花議場 verbatim「議場內部 5 個不同角度攝影機...展示演出和儀式」（公視 PNN + 中文維基 兩源）
  - 報導者 PO verbatim 困惑「做 PO 已 2 個月了...搞不清楚到底我們可以介入多少」（孤源但 verbatim 完整）
- **媒體 spine（3 張 Wikimedia Commons CC 授權）**：
  - hero: Camille McOuat 2016 Paris portrait CC BY 2.0
  - scene-mid: Jan Michalko 2019 Berlin re:publica 數位社會年會 CC BY-SA 2.0
  - signature: 唐鳳本人 2021 簽名 SVG CC0
- **lifeTree 維護**：保留原 10 choice nodes，新增 1 node (stockholm 2025/12/2 Right Livelihood)，原 sunflower 2014 node 從 covid 內合併拆出獨立節點 — 共 12 nodes
- **避坑（Stage 3 自修正）**：
  - 初稿在 Plurality ⿻ 概念段虛構「2017 vTaiwan 線上酒類議題 5000 多位公民 + 七條附加條件」（七條條件實為 Uber 案數字，非線上酒類）→ Stage 3 verify 抓到後改用實際 Uber 案例
  - 衛生紙之亂段加入「唐鳳辦公室同時把口罩跟衛生紙原料的供應鏈差異圖表化」具體場景但 research 無 direct source → Stage 3.5 軟化為「政院在幾小時內推出一張配圖」+「她在 TED 跟多次國際訪談把這當作 humor over rumor 的展示案例」泛指
- **舊版 lifeTree 升級**：原版 10 nodes 中 sunflower 2014 沒獨立 = 太陽花這個關鍵塑形事件被 absorbed 進 g0v 節點；新版拆出獨立 sunflower node + 新增 stockholm 2025/12/2 結尾 node，完整 12 nodes 對應 7 narrative H2
- **與舊版差異 summary**：
  - title: 「唐鳳」(stub) → 「唐鳳：她每一次有名的決定，都是在拒絕『天才』這個標籤」(冒號三明治)
  - footnote: 0 → 44
  - image: 0 → 3 (hero + scene-mid + signature)
  - 字數: ~3300 → 4598
  - 小標題: 11 編年體 list-dump → 7 場景/衝突 anchor
  - verbatim quote: 1 → 15
  - 核心矛盾 anchor 整篇貫穿: 0 → 6 處引用「天才」拒絕主線
  - 結尾: FLAT-END 通用啟發句 → 2025/12/2 斯德哥爾摩具體場景收束
  - lastVerified: 2026-03-21 → 2026-05-16 (12 個月 staleness 補完，加入 2024 卸任 + Plurality + 2025/12 RLA)

### 刈包 NEW — 2026-05-16 twmd-rewrite-daily routine（從福州虎咬豬到 BAO London 米其林符號 / Food / 系列第 1 篇）

- **Article**: [knowledge/Food/刈包.md](../../knowledge/Food/刈包.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式（Stage 0 §觀點成型 落檔 + Stage 1 deep research via general-purpose agent 50+ WebSearch + 6 WebFetch）
- **核心矛盾**：「福州移民帶來的尾牙工人餐，怎麼變成 BAO London 的米其林符號」（Stage 1.4 從候選 A/B/C 收斂為 A，時間軸完整：1927 黃旺成日記 → 1955 源芳 → 2013 BAO → 2024 米其林四錨點）
- **Hook（Title 三明治）**：「刈包：從福州虎咬豬到 BAO London 的米其林符號」
- **品質**：4500 CJK chars (100% of 4500 門檻) / 28 footnote / 7 narrative H2（非編年體 / 場景或地名 anchor）/ Tier 2 metaphor 6 → 0 主動清理（重量級 → 資深 / 軌跡 → 發展）
- **Research**: [reports/research/2026-05/刈包.md](../../reports/research/2026-05/刈包.md) — Stage 0 §觀點成型 完整六核心問題 + 7 品質維度 anchor + 50+ WebSearch 含跨源 verification 分級
- **Hard gates 全過**：rewrite-stage-4 profile hard=0 warn=0 全綠 ✅ / 8 plugin 全 pass（frontmatter / format-structure / wikilink / link / cjk-punct / chronicle-lead / word-count / image-health）
- **核心事實 source 鎖定**：
  - 源芳 1955 / 吳黃義 / 華西街 17-2 號 / 米其林必比登 2020-2024（lordcat + margaret.tw + appletrees + mecocute 多源）
  - 藍家 1992（**非 1971**，Stage 0 假設糾正）/ 藍鳳榮 / 母親食譜（Instagram + ETtoday + Michelin + Banbi）
  - 1927 黃旺成日記「尾牙吃虎咬豬」（中研院臺史所出版品 + 觀光局推廣資料 + 民間轉述，引語標「據傳載」緩和）
  - BAO London Erchen Chang 台北出身 + Slade UCL 2012 + Netil Market 2013 + Soho 2015-04-08（Apollo + Toast + Wikipedia + Picky Glutton + Grubstance 五源）
  - David Chang 2004 Momofuku Noodle Bar + 自承 pork bun 源自北京烤鴨非 gua bao（NPR + Mashed + Resy + Wikipedia Momofuku 四源）
  - Eddie Huang 2009-12 Baohaus + 2026-03 The Flower Shop 重開（Wikipedia + Resy 二源）
- **避坑**：
  - Stage 0 假設「喪禮辦桌刈包」習俗 → Stage 1 30+ queries 找不到 primary 民俗文獻 → 從文章 drop（unverified）
  - 1927 黃旺成日記逐字引語只有民間轉述源（my-hito blog），中研院原檔網路無 full text → 引用改「據傳載」緩和
  - 連珍刈包 / 神農生活 / 三國張飛割饅頭 / 福建泉州少數派起源說 → 全 single source 或無 source，未寫進文章
  - 「謊言包進去」第三層尾牙寓意 single source（風傳媒）→ 標「如果這個解讀屬實」緩和
- **媒體授權**：2 張 Wikimedia Commons CC BY 2.0（hero: 源芳 2023 by 王昱晴 / 中華民國總統府 / inline: LeoAlmighty steamed sandwich）/ aspect ratio 全 pass（hero 1.82 / inline 1.0）/ 圖片來源 section 完整 attribution
- **Cross-link**：forward 5 條（台灣小吃 / 夜市文化 / 台灣辦桌文化 / 台灣米食文化 / 台灣鹽酥雞）/ reverse cross-link **DEFER**（cron 時間預算考量，留下次 polish）
- **Issue 連動**：[#1013 台灣經典街頭小吃系列](https://github.com/frank890417/taiwan-md/issues/1013) progress comment 待 ship 後留言（系列尚有 5 篇待完成，issue 不 close）
- **routine vitals**：refresh-pm 23:00 → rewrite-daily 00:00 順跑無漂移 / dashboard sync 已含 1068 紀柏豪 + 1066 綠島監獄 + 1067 nl 暫緩 finale 後狀態 / babel drift heal 22:35 完成 / 心臟器官 90↑ 維持

### 台灣傳統工藝與無形文化資產 NEW — 2026-05-15 twmd-rewrite-daily routine（人間國寶制度移植 / Culture / 文資法 2005/2016 演化）

- **Article**: [knowledge/Culture/台灣傳統工藝與無形文化資產.md](../../knowledge/Culture/台灣傳統工藝與無形文化資產.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — Fresh 模式（Stage 0 §觀點成型 落檔 + Stage 1 deep research via general-purpose agent 35 WebSearch + 8 WebFetch）
- **核心矛盾**：「制度承認來了，學徒卻沒了——名單越長，能教的人越少」(Stage 1.4 收斂，從 Stage 0.6 候選 A+B+C 三條融合)
- **Hook（Title 三明治）**：「台灣傳統工藝與無形文化資產：制度承認來了，學徒卻沒了」
- **品質**：5099 CJK chars (113% of 4500 門檻) / 29 footnote / 10 narrative H2（非編年體 / 場景或數字 anchor）/ 8 大工藝類別涵蓋 7 類（缺石雕本身寫進文章作為盲點）
- **Research**: [reports/research/2026-05/台灣傳統工藝與無形文化資產.md](../../reports/research/2026-05/台灣傳統工藝與無形文化資產.md) — Stage 0 §觀點成型 完整六核心問題 + 7 品質維度 anchor + 22 位「重要傳統工藝保存者」具體名單（含歷年認定年份）
- **Hard gates 全過**：rewrite-stage-4 profile hard=0 warn=0 全綠 ✅ / 7 plugin 全 pass（frontmatter / format-structure / wikilink / link / cjk-punct / chronicle-lead / word-count / image-health）/ 事實鐵三角（鶯歌 1804 / 三義 1918 / 美濃日治大正 / 文資法 2005/2016 / 日本 1955 / 韓國 1962 全三源 cross-check confirmed）
- **核心事實 source 鎖定**：
  - 蘇清良 2022-12-19 認定 + 2023-07-20 過世 + 祖孫接班場景（中央社 + 維基 + 自由時報三源）
  - 林洸沂 1981 學甲慈濟宮葉王交趾陶修復 + 引語「從頭再學習一次」/「如果葉王還在我一定拜他為師」（經典雜誌 verbatim）
  - 尤瑪達陸 2016 認定（民國 105，校正英文維基的 2006 錯誤）+ 引語「文化認同這件事，是你打從心底喜歡它」（vocus 專訪 verbatim）+ 跑 100 部落 / 復原 400-500 件服飾（Taiwan Today + 英文維基）
  - 林享鴻 1981 廣榮興廠引語「面臨後繼無人的局面」（光華雜誌 1981 verbatim）
  - 鶯歌非金屬製品工廠數逐年（701→662→554→289）(TDRI + 鎮志)
- **避坑**：
  - 王清霜「活著就要工作」原話未找到逐字出處 → 改用兒子王賢民轉述「要做好漆藝，就要活久一些」(La Vie verbatim)
  - 李秉圭「成功是留給不敢休息的人」標題化用語逐字未確認 → drop，未使用
  - 美濃紙傘起源「清領 vs 日治大正」兩說並存，主流是日治大正（清光緒末期 / 1910s）→ 採信主流並標明日治大正
- **媒體**：3 張 CC 授權圖片（hero: 美濃原鄉緣紙傘 CC BY-SA 3.0 / inline: 三義木雕博物館 CC BY-SA 3.0 / inline: 三峽藍與白系列藍染服飾 CC BY-SA 4.0）— 全 Wikimedia Commons，cache 完成，aspect 全通過
- **Cross-link**：本文 → 藍染 / 台灣花布 / 紙傘 / 斗笠 / 傳統節慶與慶典 (5 forward links)；reverse cross-link **DEFER**（per Stage 5.3 sibling 預檢：5 sibling 全有 pre-existing rewrite-stage-4 hard fail，主因為 image-health 0 張不合 ≥ 3 張 depth article 標準 + 部分缺 ## 參考資料 H2，補 reverse link 會觸發 pre-commit hook hard fail。應走獨立 EVOLVE 處理各 sibling 圖片與格式缺口，不在本 ship scope）
- **政治敏感度**：低（市場數據 + 公開人物登錄資料為主），但「人間國寶制度晚日本 50 年」+「台灣不是 UNESCO 會員」涉及國際對標 framing，採事實導向不刻意對比 PRC
- **Issue ship-after action**: 留 issue #914 progress comment + close（per ARTICLE-INBOX hard gate）
- **觀察者**：cron 自動觸發 twmd-rewrite-daily routine（無 in-loop 觀察者），sub-agent general-purpose 35 WebSearch + 8 WebFetch 落 research report、主 session Stage 2-4 寫作 + image cache + verify

### 曾博恩 — 2026-05-13 manual-rewrite 完成（從 contributor seed 到深度 EVOLVE）

- **Article**: [knowledge/People/曾博恩.md](../../knowledge/People/曾博恩.md)
- **Pipeline**: REWRITE-PIPELINE v6.0 — EVOLVE 模式（contributor seed PR #1057 by idlccp1984，2200 字 / 19 footnote → EVOLVE 至 6001 字 / 51 footnote）
- **核心矛盾**：「他能算笑點，算不準社會的情緒重量。」(Stage 1.4 鎖定，從 Stage 0.6 候選 C+D 融合收斂)
- **Hook（Title 三明治）**：「曾博恩：算得出笑點，算不準社會」
- **品質**：6001 CJK chars (133% of 4500 門檻) / 51 footnote / 7 narrative H2（非編年體 / 場景或意象 anchor）/ 51 cross-verified facts
- **Research**: [reports/research/2026-05/brian-tseng.md](../../reports/research/2026-05/brian-tseng.md) — Stage 0 §觀點成型 完整六核心問題 + 7 品質維度 anchor + Sub-agent A-F 六組事實素材庫（30 search by sub-agent + 5 critical/sensitive search + 6 WebFetch by main session = 46 total search actions）
- **Hard gates 全過**：prose-health hard=0 score 1 / pre-commit profile passed=True / 事實鐵三角（算術 26.7×7=186.9 驗算 / 引語全 Ctrl-F verbatim / 場景 atom 全 verified）/ Title spine sync ✓
- **大事實修正**（vs 原 contributor seed）：
  - 「2,200 萬」→ 「2,283 萬 5,950 元」精確值（per 鏡週刊 + CTWANT 一手判決資料）
  - 「華人首位」→ 「台灣史上第一位」（per The News Lens 權威媒體 framing，避免 over-claim）
  - 鄭南榕梗 paraphrase「按照習俗⋯⋯陰間會有 2 位鄭南榕嗎」→ TNL verbatim「人間燒一個東西，陰間就會收到另一個一樣的東西。所以當鄭南榕自焚之後，陰間就會有兩個鄭南榕」
  - Russell Peters 啟蒙改寫：「同學給他的 MP3」+「笑倒在地上」(per mirror media verbatim) vs 既有「自己戴耳機」+「課桌椅」
  - DROP「《博恩夜夜秀》黃明志〈中國痛〉合作」（〈中國痛〉MV 2020-2021 已在博恩夜夜秀停播後，sub-agent 找不到 episode，疑為時間錯置 hallucination）
- **敏感素材處理**（per MANIFESTO §5 紀實節制 + §10 幻覺鐵律 + 觀察者拍板 scope 2 + commit 後 callout 升 hard 邊界）：寫鄭南榕梗 / 外送員影片 / 娛樂稅官司 / 王志安事件 / 賀瓏解約完整事實 framing，紀實節制不重構心理動機；**不寫任何當事人私人關係**（婚姻 / 戀愛 / 家庭內情），整類 claim 在無可信來源時 default 靜默 — 跟 main thesis「精準失準」無 anchor，且容易滑入煽情。
- **Cross-link 雙向**：曾博恩 → 蔡英文 + 韓國瑜 + 鄭南榕 (3 forward)；reverse: 蔡英文 + 韓國瑜 + 鄭南榕 ← 曾博恩（per Stage 5.3 sibling 預檢：3 sibling 全 hard=0，鄭南榕加 minimal §延伸閱讀 section minimum-action 補 missing section + cross-link）
- **媒體邊界**（per Stage 4 邊界例外 + 觀察者 fair-use 選項）：本 EVOLVE 標 `no-media` 邊界。Wikimedia Commons 找到 11 候選但無可直接 verify license 的 1:1+ aspect 圖；STR Network 官方 press kit 圖未取得 cache 級解析度。記入 §圖片來源 section，待後續 heal commit 走 fair-use editorial commentary scope 補 hero + 1-2 inline。image-health 在 pre-commit profile 為 warn (不擋 commit)，但 rewrite-stage-4 profile 為 hard fail — 接受邊界
- **政治立場**：紀實，不偏綠不偏藍（per CLAUDE.md §Bias 2 Multi-observer drift）
- **觀察者**：哲宇 manual session（plain CC active），明確選 scope 1 完整 ship + scope 2 公開事實 framing + scope 3 fair-use editorial scope

### 台灣鐵道史 EVOLVE — 2026-05-11 nervous-banzai-125050 twmd-rewrite-daily routine（外籍工程師譜系 + 黑頭仔命名譜系 focused section addition / History / 鐵道）

- **Article**: [knowledge/History/台灣鐵道史.md](../../knowledge/History/台灣鐵道史.md)
- **Pipeline**: REWRITE-PIPELINE v5.0 — EVOLVE 模式（focused section addition，補 word-count gate 3155 → 5329 + 補 image-health 0 → 3）
- **觸發**：
  - 內部：article-health.py warn=1 word-count 3155 < 4500 depth threshold（缺 1345 字 / 30%）
  - 外部：SC 7d query `taiwan railways administration nickname foreign engineers` 345→480 imp +39% WoW, position 7.78（英文長尾持續放大）
- **新增章節**：
  - §外國名字怎麼掉漆的（劉銘傳鐵路德英外籍班底 + 長谷川謹介 / 河合鈰太郎 / 進藤熊之助 / 新元鹿之助 日治譜系）
  - §黑頭仔與命名譜系（CK101 / CT250 / DT650 編號系統 + 莒光 / 自強 / 復興 命名典故 + 普悠瑪 / 太魯閣 後戒嚴時代命名轉折）
- **新增腳註**：13 條 `[^f1]-[^f13]`（Nippon.com / 國史館論文 / Wikidata / 維基百科多源）
- **新增媒體**：3 張 CC 授權圖片（hero: TRA Taitung Line fireman 1970s CC BY 4.0 / inline 1: Changhua Roundhouse 蒸汽機車群 2009 CC BY 2.0 / inline 2: DT668 海線 2021 CC BY-SA 2.0）
- **Frontmatter spine sync**：
  - title `台灣鐵道史` → `台灣鐵道史：肺病鐵道、黑頭仔，以及那條失去外國名字的譜系`
  - description 補進新核心矛盾（外國名字一路掉漆 + 命名譜系從政治口號到原住民地名）
  - 新增 `researchReport: 'reports/research/2026-05/taiwan-railway-foreign-engineers.md'`
- **Stage 4 gate**：rewrite-stage-4 profile hard=0 warn=0 全綠 ✅；word-count 5329 (118% of 4500)；image-health 3 張全合規
- **Research report**：[reports/research/2026-05/taiwan-railway-foreign-engineers.md](../../reports/research/2026-05/taiwan-railway-foreign-engineers.md) — 9 WebSearch, 中英日 source 全 cross-check
- **未證實項目（不寫進文章）**：SC 查詢提到的「沃夫」外籍工程師暱稱 + 阿里山「美國工程師」線索 — 9 次搜尋未找到具體對應，按 MANIFESTO §10 幻覺鐵律降級為空白，不掰
- **核心矛盾**（30 字內）：技術接力的譜系斷裂 — 每一代都把上一代的紀錄推到注腳，台鐵的譜系成了一條失去外國名字的單線
- **觀察**：routine 60 min boundary tight — wall-clock ~75 min（image fetch 多輪 redirect 影響），但完整跑完 Stage 1-5 不留 partial。LESSONS-INBOX 候選：「Wikimedia thumb URL 直連會回 HTML 錯誤頁；必須走 Special:FilePath 或 WebFetch 抓 upload.wikimedia.org 完整 URL 才能 curl」

### 國立臺灣歷史博物館 NEW — 2026-05-11 kind-mirzakhani 觀察者指派（深度研究 / Society / NMTH × 臺灣島史觀）

哲宇 directive「`/twmd-rewrite 國立臺灣歷史博物館`」+ Stage 1.10 一手素材 framing：「以臺灣島史觀出發，也是國家級的臺灣歷史策展。我相信在 AI 時代社群驅動開源知識庫的潛力，當與一座國家級博物館，各自從不同角度看同一座島嶼相遇時，就能建構更立體臺灣島史觀的集體記憶。」Fresh 模式（既有 Taiwan.md 9 篇引用 NMTH 但無主檔）。Stage 1 Research agent 跑 43 次（27 WebSearch + 16 WebFetch），落檔 651 行研究筆記。

- **Article**: [knowledge/Society/國立臺灣歷史博物館.md](../../knowledge/Society/國立臺灣歷史博物館.md)
- **Pipeline**: REWRITE-PIPELINE v5.0 — Fresh 模式（首篇 Fresh 走 v5.0 spine restoration 8 H2 結構）
- **核心矛盾**：「國家級策展 × 社群共筆，兩種臺灣島史觀在 NMTH 相遇」（21 字）— NMTH 第七、八展區「大家的博物館」+「你也是寫歷史的人」+ 館長張隆志親口「全民共筆共創」+ 政府資料開放授權條款 1.0 版（CC BY 4.0 等效）= 國家級三級機構在制度層 / 法律層 / 策展論述層全部認證社群共筆策展機制，Taiwan.md 跟 NMTH 是同一條臺灣島史觀軌道上的兩個 instantiation
- **Hook**：第八展區「你也是寫歷史的人」（NMTH 常設展最後一格）+ 第七展區「大家的博物館」常設展論述
- **品質**：8 H2 / 27 footnote / 5632 CJK chars / 破折號 ≤ 5（含展名「斯土斯民——臺灣的故事」必保留）/ 對位句型 1（L68 NMTH 策展論述 verbatim 引號內必保留）/ prose-health score 3 PASS / article-health rewrite-stage-4 profile hard=0 warn=0 ALL GREEN
- **Research**: [reports/research/2026-05/國立臺灣歷史博物館.md](../../reports/research/2026-05/國立臺灣歷史博物館.md) — 651 行筆記，14 維度 high_confidence facts、4 個 single_source flags、3 個 unverified flags、4 個核心矛盾候選、3 個開場 + 3 個結尾 anchor 候選、媒體授權矩陣三表
- **媒體插入**（1 件）：
  1. **hero** `nmth-main-building-2011.jpg` — Wikimedia Commons 主館外觀 840×459 aspect 1.83 by Fcuk1203 CC BY-SA 3.0
- **大事實**：2011-10-29 開館（4 源 verify，從 1998 籌備處到 2011 開館 13 年）/ 14-15 萬件館藏 / 國家文化記憶庫 200+ 萬筆（NMTH 2021 起承接運營）/ Open Data 授權「政府資料開放授權條款 1.0 版」一手 verbatim / 2021-04-01 張隆志接任第五任 / 2021-10-17 升格三級機構 / 2024 跨1624 與 Rekihaku 合辦 / 雲牆逾千片太陽能板年發電 17 萬度
- **verbatim 引語**：張隆志「全民共筆共創，活化歷史記憶的行動平台」（2025-03 數味食光）+「你要先是一個有趣的人，然後再是一個歷史學家」（故事 StoryStudio）+「公共歷史學一個很重要的核心觀念就是共構、協作」+ 常設展第八展區「歷史是一段歷程、一份感受；是不同的人們，站在自己的位置」+ 第七展區「『未來』由各形各色的『我們』拼貼而成」+ 開放資料 Open Data 頁「不限用途、不用付費，可直接下載使用」+「反共復國基地」展區「威權體制」「一黨獨大、以黨領政」+「走近二二八」展區「埋下日後遭到整肅的暗流」
- **Stage 3.3 FACTCHECK Quick Mode**：footnote URL audit 揭露 [^4] 文化部新聞稿 + [^17] 文化平權頁 404，已換為 NMTH 官網現任館長頁 + 文化部博物館友善措施服務介紹網（替換 stable URL）；「挑戰者們：解嚴 30 週年特展」原誤寫「NMTH 協辦」修正為「NMTH 主辦」+ 加準確展期「2017-11-28 至 2018-06-24」+ 加 [^26] verify source URL
- **哲宇 framing 補進文章**：Research agent 沒搜到的「臺灣史新手村」+「55 萬筆」— 經 main session sibling cross-link 揭露 NMTH 自己的子站 `ilhaformosa.nmth.gov.tw` = 「臺灣史新手村」（既有 Taiwan.md 〈荷西明鄭時期〉等多條已引用作一手史料），補進文章 §四 開放資料庫 + [^27] footnote
- **Cross-link**：5 條 forward 延伸閱讀（台灣島史觀 / 三個外國人看乙未 / 19世紀的樟腦戰爭 / 荷西明鄭時期 / 福爾摩沙）+ 5 條 reverse 同 PR 補完（5 sibling format-check 全 PASS）
- **未來預期 cross-link**：吳密察（首任館長 → 故宮院長）/ 張隆志（現任館長 + 公共歷史學者）/ 曹永和（臺灣島史觀提出者）/ 平埔族群（NMTH《看見平埔》專刊母題）

### 台灣企業：台積電 EVOLVE — 2026-05-09 laughing-goldstine 全文重寫（深度研究 / Economy / 護國神山）

哲宇 directive「/twmd-rewrite 深度研究 重寫『台灣企業：台積電』，完整遵循 pipeline」。同 PR ship REWRITE-PIPELINE v2.21 §1.7b 更新（理想 2-3 圖，企業官網/fair use editorial scope 入正式來源）。EVOLVE 從 134 行 → 289 行，5 場景架構保留，3 段新場景補齊（1985 年 14 天提案 / 2009 年 10 分鐘樓下豆漿 / 鄭家祖墳 178 年），結尾 Mode D 敘事閉環+翻轉「56 歲那個人，已經沒在這個房間了」。

- **Article**: [knowledge/Economy/台灣企業：台積電.md](../../knowledge/Economy/台灣企業：台積電.md)
- **Pipeline**: REWRITE-PIPELINE v2.21 — EVOLVE 模式（重寫率 ~95%，原稿 5 場景骨架保留 + 3 場景新增）
- **核心矛盾**：「54 歲離開德儀、56 歲創立台積電的張忠謀前 18 年逃過三次難 → 38 年後川普誇接班人魏哲家『是這個房間裡最重要的男人』」 vs 「但同一段時間，新竹寶山一座 1844 年蓋的鄭家祖墳正在遷葬為 2 奈米廠讓地」。所有奇蹟都疊在一座島承擔不起的水電與在地歷史代價上。
- **Hook**：1985-09-04 李國鼎辦公室 14 天「Common Wafer Fab」原始提案 verbatim 中文段落（張忠謀自傳）
- **品質**：289 行 / 31 腳註 / 破折號 9（< 15）/ prose-health score 2 (≤3 PASS) / article-health ci-deploy passed=True
- **Research**: [reports/research/2026-05/台灣企業：台積電.md](../../reports/research/2026-05/台灣企業：台積電.md) — 407 行研究筆記，22 facts table、28 verbatim quotes（張忠謀 8 / 魏哲家 4 / 黃仁勳 4 / Trump 英文 / 柯志恩 英文 / 邱振瑋議員）、5 specific scenes、5 image candidates（CC/PD verified）
- **媒體插入**（2 件）：
  1. **hero** `tsmc-fabs-hsinchu-2020.jpg` — 新竹科學園區廠房群空拍，曾成訓 攝 2020-01-02 CC BY 2.0
  2. **scene-mid** `tsmc-fab21-arizona-2023.jpg` — 亞利桑那 Fab 21 工地空拍，Hunter Trick 攝 2023-11-05 CC BY-SA 4.0
- **大事實**：Q1 2026 營收 359 億美元（年增 40.6%）、EPS NT$22.08、市值 1.7 兆美元（全球第 6）、員工 84,512（2024-12）、3 奈米占 Q1 25%、2 奈米良率 70-80%、2026 capex USD 52-56B（vs 2025 40.9B / 2024 28.9B）
- **verbatim 三段**：張忠謀「全球化已死、世界貿易已死」（2024-10-26 運動會中央社）/ 川普「Right now, he's the most important man in the room」（2025-03-03 白宮 American Presidency Project）/ 魏哲家「In Phoenix, Arizona, with 3,000 employees, we are producing the most advanced chip made on U.S. soil」（同前）
- **Cross-link**：4 延伸閱讀（聯發科技 / 日月光半導體 / 台股 / 產業轉型升級）+ 反向已存在於聯發科技、台股；日月光、產業轉型升級僅 inline mention 待 Stage 5 review

---

### 王福瑞 EVOLVE — 2026-05-09 laughing-goldstine 媒體插入 + heading 修補（fair use editorial scope 啟動 / People / 聲音藝術）

哲宇 redirect「進化王福瑞，同步搜集適合使用的圖片跟影片，引用作品是 fair use 比較寬鬆不一定要 CC」。Round 2 媒體研究升級 Stage 1.7：在世藝術家作品紀錄圖（個展裝置、專輯封面）走 fair use editorial commentary scope，不需 CC license。

- **Article**: [knowledge/People/王福瑞.md](../../knowledge/People/王福瑞.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — EVOLVE 模式（媒體插入主重，prose body 不重寫，167 行 → ~190 行）
- **媒體插入**（4 件）：
  1. **hero** `wang-fujui-noise-silence-2020.jpg` — 12 聲道全指向喇叭裝置 (frontmatter `image:` + `imageCredit/imageLicense/imageSource`)
  2. **scene-mid 1** 同三件作品同框（術後段前置）
  3. **scene-mid 2** Bandcamp《Ching-Shen-Ching 1.2.3.0.》專輯封面（「Bandcamp 上的同人廠牌」段）
  4. **scene-mid 3** 12 聲道喇叭重複放在核心段落（前後呼應）
- **Inline YouTube 外連**：噪音寂靜表演紀錄、就在藝術空間個展頁、Bandcamp〈V-Zone〉track
- **Heading 修補**：「後來，這個故事還在寫」→「Bandcamp 上的同人廠牌」（per 哲宇「故事還在寫」family 列入塑膠句檢查同 PR ship — prose_health.py + QUALITY-CHECKLIST 雙加 patterns）
- **對位句型修補**：「從場景到身體，從外在到內在」改寫為兩句 explicit 描述
- **§圖片來源 section**：四張圖完整 attribution + fair use editorial scope 解釋
- **Quality**: hard=0 warn=2（pre-existing AI metaphor + 空洞詞，未改 prose body）
- **Research report update**: `reports/research/2026-05/王福瑞.md` §9 媒體授權矩陣 Round 2

### 聶永真 EVOLVE Round 2 — 2026-05-08 elegant-ptolemy 重構（多元面貌人物 SSODT，去 event-report 框架 / People / 藝術與設計）

哲宇 review Round 1 後指出文章過度錨定 2026/05/08 台電 LOGO 5 小時論述循環，要求重寫為「紀實 + 閱讀感順暢 + 完整描述這個人的多元面貌」的 SSODT，台電案降為其中一章而非結構主軸。

- **Article**: [knowledge/People/聶永真.md](../../knowledge/People/聶永真.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — EVOLVE Round 2（218 行 → 200 行 / 重 hook + 重結構 + 重 title/description）
- **新 title**：「聶永真：台灣首位 AGI 會員，從金曲包裝到國家識別系統的二十年」（從事件人物切換為職涯範圍人物）
- **新 description**：以多元面貌列舉開頭（音樂封面 / 公民運動 / 政治競選 / 國營識別 / 藝術空間），台電爭議移至最後一句 anchor
- **新結構**（10 章，台電從首章降為第 9 章）：
  1. 30 秒概覽（多元面貌列表 + 台電爭議僅 1 句）
  2. Hook 段（攤開接案目錄：音樂 / 書籍 / 商業品牌 / 公部門 / 公民運動 / 政治設計 6 條清單）
  3. 從機械製圖到工商業設計
  4. 從專輯封面起家：三度金曲獎與二十年的音樂版面
  5. 首位 AGI 會員與「不安全的設計」
  6. 凌晨四點的紐時頭版與 Taiwan Can Help
  7. 「點亮台灣」與兩屆總統就職
  8. 出走比利時與倫敦：「太舒適圈」的逃離
  9. 駁二倉庫的一束光與工作室的形狀
  10. 國營事業連環標案與 2026 年的台電 LOGO 風暴（5 小時敘事保留但縮為一章）
  11. 「公民聶永真」與「設計師聶永真」（哲學收束）
  12. 永真急制這個名字（工作室層次 closing）
- **品質**：200 行 / 9,481 chars body / 29 footnote / 11+ verbatim 中文引語 / 3 張 CC 授權 inline 圖（hero + 2 inline，不變）/ HARD=0 ✅ / 12 plugin 全綠（cjk-punct + cross-reference + footnote-density/format/url + format-structure + frontmatter-format + frontmatter-title + image-health + link-target + prose-health score=2 PASS + terminology + wikilink-target）
- **Stage 3 對位句型修補**：Round 1 留下 3 處「不是 X，而是 Y」對位句型違反 §11 Tier 1，本 Round 全 rewrite 為正面斷言（「批評者問的核心其實是身份的可區辨性」/「在他的職涯軌跡裡始終是同一個專業」）
- **觀察者校準**：哲宇 Round 1 review 指「這篇不是專題事件報導，是讓人了解這個人的 SSODT」— 把焦點從「2026/05/08 那一天發生什麼」拉回到「聶永真二十年職涯橫跨幾個產業」。具體執行：(a) 開場移除 5 小時時間軸，改為跨產業清單；(b) 標題從「在公民身份與商業案之間」改為「從金曲包裝到國家識別系統的二十年」；(c) 把 2014/2020/2026 三個時間點當作三章而非結構主軸；(d) 新增「永真急制這個名字」章節說明工作室作為集體實踐
- **DNA #16 跨源驗證**：所有 facts、verbatim 引語、footnote URL 與 Round 1 完全一致，無 fact drift；本 Round 純粹是結構與框架的重組
- **LESSONS-INBOX 候選**：「event-driven framing vs person-centric SSODT」是 People 文章的關鍵分流判準。當核心人物職涯橫跨多領域、且當天有突發事件時，預設 framing 應為 person-centric（介紹人物多元面貌），事件作為其中一章。如果觀察者要求事件報導，應另開 News-style article。

### 聶永真 EVOLVE — 2026-05-08 elegant-ptolemy 完成（公民聶永真 vs 商業聶永真，2026/05/08 台電 LOGO 風暴 hook / People / 藝術與設計）

- **Article**: [knowledge/People/聶永真.md](../../knowledge/People/聶永真.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — EVOLVE 模式（131 行 baseline → 218 行深度重寫）
- **核心矛盾**：「他用最商業的方式接政治案，又用最反商業的姿態談酷」（28 字）— 公民聶永真 vs 商業聶永真的二元裂縫，由 2024-2026 連標四個國營事業案 + 2026/05/08 台電 LOGO「綠友友」風暴實證
- **Hook scene**：2026/05/08 09:30 → 14:36 的論述循環。NOWnews 質疑 → 聶永真 FB 三層辯護（功能困境 + 字體史拆神話 + 中宮端點傳承）→ 黃智陽舉證 1965《台電月刊》25 期反駁。Today's event 直接成為文章 anchor
- **品質**：218 行 / ~6500 字 / 34 footnote / 11+ verbatim 中文引語 / 3 張 CC 授權 inline 圖（hero + 2 inline）/ HARD=0 ✅ / prose-health score=2 (≤ 3 PASS) / cjk-punct + frontmatter + image-health + link-target + footnote-format/density/url + format-structure + terminology + wikilink-target 全綠
- **Research**: [reports/research/2026-05/聶永真.md](../../reports/research/2026-05/聶永真.md)（563 行 / 22 WebSearch + 14 WebFetch / spawn general-purpose agent 直接落檔 / 43 footnote 候選 / 11 verbatim 引語 / 2 張 Wikimedia Commons CC 圖驗證）
- **媒體素材（per Stage 1.7b 授權矩陣）**：
  - **hero**：`aaron-nieh-portrait-2018.jpg` 1600×1066 aspect 1.5（Gene Wang Flickr CC BY-SA 2.0，2018-03-16）
  - **inline 1**：`sunflower-2014-legislative-yuan.jpg`（Ray Swi-hy CC BY-SA 2.0，2014-03-23 立法院前太陽花現場）
  - **inline 2**：`tsai-2016-campaign.jpg`（MiNe CC BY 2.0，2015-10-18 蔡英文競選）
- **5 點聲明完整整合**：哲宇中途指示用 Chrome MCP 抓聶永真本人 [Facebook 公開貼文](https://www.facebook.com/somekidding/posts/1384626443696723) 原文（截至 2026-05-08 晚 3.1 萬讚 / 2,355 留言 / 3,806 分享）。整合三層論述：
  1. **功能困境層**：「鑄鐵維修孔蓋、變電箱噴漆、極小印刷品、立體刻字招牌」具體應用場景 list
  2. **字體史拆神話層 verbatim**：「原『台灣電力公司』的六個書法字……非于先生專為台電客製書寫而成。所以網路上有些以書法的整句行氣來討論原標準字的論點，也與事實略微脫節」
  3. **中宮端點傳承層 verbatim**：「新修版的標準字，仍加入了與于右任原法帖字體的中宮及端點特性的連結」
- **多元論點**：王鴻薇政治酬庸質疑（NOWnews 早 9:30）+ 民眾黨「綠友友」批評 + 黃智陽（華梵大學人文藝術學院院長）字體史反駁（中時 14:36）+ FB 留言 936 心情批評「需要設計者本人跳出來解釋的設計本身就是失敗的」
- **Stage 3.5 atom audit**：11 verbatim 引語逐字對 source URL Ctrl-F 可驗（La Vie 2 句 / FB 5 句 / 鏡週刊 1 句 / 今周刊 2 句 / NOWnews 1 句 / Cheers 1 句 / ETtoday / 數位時代 / Roomie / 中央社 / ETtoday 房產雲）；4 句多源 cross-confirm
- **Cross-link**：3 反向 sibling 補完（蔡英文 / 太陽花學運 / 台灣新媒體藝術 各加一行延伸閱讀指向聶永真）
- **Baseline 校正**：金曲屆次（baseline 寫第 17 屆有誤，正確第 21、25、26 屆）/ 「2020 蔡英文連任主題台灣隊」與 2024 賴清德選戰混淆校正 / 「Apple iPad Pro Crush 廣告」誤傳剔除 / 「2024 巴黎奧運中華隊裝備」task brief 假設搜不到證據剔除
- **觀察者校準**：哲宇兩次推進升級研究深度與媒體素材 — (a)「比較著名的設計案例（比如 Democracy 4am）也可以找到圖片坎入」→ 補太陽花現場 + 蔡英文 2016 競選 2 張 inline CC 圖；(b)「他有澄清文也完整分析」→ Chrome MCP 抓 FB 原文，拆三層論述 verbatim 整合
- **DNA #50 default contract 第 N 次驗證**：自動 grep `docs/pipelines/REWRITE-PIPELINE.md` 完整讀；EDITORIAL.md 全檔已熟（前 session 重寫吳哲宇/造山者/王福瑞時讀過）；無需哲宇 explicit「走 pipeline」reminder

### 想想論壇 NEW — 2026-05-05 twmd-rewrite 完成（fair-use cite-only mode P0-01 / Society / 媒體）

- **Article**: [knowledge/Society/想想論壇.md](../../knowledge/Society/想想論壇.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 + PEER-INGESTION-PIPELINE Stage 6 / **fair-use cite-only mode**（per CC BY-NC-ND 3.0 限制 — 想想論壇是 Taiwan.md 第一個 T4 license tier peer，per [reports/ThinkingTaiwan-semiont-analysis-2026-05-05.md](../../reports/ThinkingTaiwan-semiont-analysis-2026-05-05.md) §Part 8.2 4-tier matrix）
- **核心矛盾**：「平台越想成為跨黨派的容器，越被視為小英基金會的延伸 — 14 年三次改版的張力」（30 字）
- **Hook**：2026-05-02 那份名單同框宋楚瑜（76 歲親民黨主席）+ 王婉諭（時代力量主席）+ 苗博雅（社民黨）+ 朱宗慶（古典樂）+ 龔建嘉（鮮乳坊獸醫）+ 16 位已公開、14 位待 5 月分批揭曉 — 跨黨派、跨領域、跨世代、跨族群的 explicit instantiation
- **品質**：~5500 字 / 30 footnotes / 6 直接引語（蔡英文 2012-08-07 三 quote + 2025-10-03 兩發刊詞 + 寇謐將首段 verbatim）/ HARD=0 ✅ / prose-health score=3 (≤ 3 PASS) / 11 plugin 全綠 / 對位句 4 處（2 處 source title「這不是太陽花學運（的紀錄）」unavoidable verbatim 引用）/ 破折號 7 處 / 中文標點全形 ✅
- **Research**: [reports/research/2026-05/想想論壇.md](../../reports/research/2026-05/想想論壇.md)（370+ 行 / ~38 lookup 累計 — fit check 階段 + round 1-5；中文 24+ / 英文 9+ / 一手 7+；研究 v2 含 5 條洞見 + 3-tier 驗證分層 + 媒體授權矩陣 no-media decision + CC BY-NC-ND 限制 explicit document）
- **3 重要 atom verify**：(a) 蔡英文 2012-08-07 創辦 verbatim「While it takes piles of cash to fill up a room, you can light up a room with a match」+「The ultimate goal would be to further the power of thinking, the power of action and the power of society」(Taipei Times by Chris Wang); (b) 創辦 6 director（蘇嘉全 / 賀陳旦 / 張景森 / 江春男 / 姚立明 / 林全）跨領域組成 — day 1 跨黨派 ethos 14 年後 30 人系列 5 倍 scale 重複; (c) 思想坦克 voicettank footer「Designed and Developed by 台灣智庫」直接證實機構 ownership ≠ 想想論壇（小英基金會）
- **5 條深度洞見**（per research v2 §v2 補強）：
  1. 跨黨派 ethos 是 day-1 design 不是 14 年後 reframe（Taipei Times 2012-08-07 explicit「remaining free from political ideology and partisanship」）
  2. 林全跨三 think tank 路徑（新境界 → 小英基金會 → 行政院長）= 蔡英文用 think tank 訓練 future cabinet model
  3. Drupal 10 + Bootstrap Barrio + NetiCRM tech stack silent ideology = 平台 self-conception 是「公民社會 institution」非「media outlet」
  4. 想想論壇 vs 思想坦克 = 同陣營兩個 think tank ecosystem（小英基金會 vs 台灣智庫）
  5. 2014-06 蔡英文卸任董事長給簡志忠是 explicit 黨派 vs 平台 firewall 動作；11 年後 2025-10 重啟仍維持簡志忠任董事長 — firewall 在「卸任後 second life」期間 evolving
- **Pipeline 升級提案 trigger**：4-tier license matrix（T1 CC0/BY → T2 BY-SA → T3 BY-NC → T4 BY-ND/ARR cite-only）— per fit check 報告 §Part 8.2，待觀察者 review 後 ship 進 PEER-INGESTION-PIPELINE v1.1
- **Cross-link**：3 個 sibling reverse cross-link inserted（蔡英文 / 賴清德 / 毒馬鈴薯認知作戰）；1 個 defer（心戰.md 缺延伸閱讀 section per §5.1，避免擴大 scope）
- **REGISTRY status**: 想想論壇 peer 條目從 `T4_cite_only_pending_observer_decision` 升 `🟢 active (T4 cite-only)`，articles shipped 1/5 P0
- **License 處理**：no-media decision (per Stage 1.7 §邊界與例外「沒有合適媒體素材」)；fair-use cite 想想論壇 /about /copyright /content/100278 /content/1947 共 4 條 footnote URL（per 著作權法 §52 + §65 fair use）；不 paraphrase 任何想想論壇文章內容
- **DNA #50 default contract 第二次驗證**：自動 grep `docs/pipelines/PEER-INGESTION-PIPELINE.md` + `REWRITE-PIPELINE.md` 全讀，無需觀察者提醒走 pipeline；EDITORIAL.md 1335 行哲宇 explicit「全部讀取不要跳過」後完整讀過

### 台灣與史瓦帝尼 NEW — 2026-05-05 twmd-rewrite 完成（非洲最後一條外交命脈，掛在一個人身上 / Society / 國際關係）

- **Article**: [knowledge/Society/台灣與史瓦帝尼.md](../../knowledge/Society/台灣與史瓦帝尼.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（哲宇 `/twmd-rewrite 深度研究史瓦帝尼 賴清德 從歷史到現在最新發展的完整故事 / 圖片可以引用台灣總統府發布官方圖片 / 還有坎入其他重要的 youtube 影片` 直接觸發）
- **核心矛盾**：「非洲最後友邦由絕對君主一人撐起」（28 字）— 民主台灣與絕對王權的不對稱共生，邦交命脈掛在 Mswati III 一個人身上
- **Hook**：2026-05-02 上午 9 點，賴清德從史國 Mswati III 借的 Airbus A340 專機走下，落地姆巴巴內。台灣總統第一次因飛航許可被中國施壓撤銷（塞舌爾/模里西斯/馬達加斯加），最後是邦交國國王派飛機從台北接駕
- **品質**：~5500 字 / 26 footnotes / 8 直接引語 / HARD=0 ✅ / prose-health score=3 (≤ 3 PASS) / 11 plugin 全綠 (cjk-punct / link-target / image-health / terminology / footnote-density+format+url / format-structure)
- **Research**: [reports/research/2026-05/taiwan-eswatini.md](../../reports/research/2026-05/taiwan-eswatini.md)（346 行 / 36KB / 30 WebSearch + 12 WebFetch / spawn general-purpose agent 直接落檔）
- **媒體素材（per 哲宇 spec）**：
  - **3 張總統府官方圖片** cache 到 `public/article-images/society/`（OGDL 政府公開資訊）：
    - `taiwan-eswatini-military-honor-2026.jpg` (hero, aspect 1.79，原 lai-arrival 0.83 portrait 違反 §1.7b 護欄已換)
    - `taiwan-eswatini-mandvulo-summit-2026.jpg` (Mandvulo 雙邊會談，1.54)
    - `taiwan-eswatini-joint-communique-2026.jpg` (聯合公報簽署，1.61)
  - **5 個 inline YouTube** (中央社官方頻道 ×4 + BBC News 中文官方頻道 ×1)
  - **「## 圖片來源」 section** added per pipeline §4.5e
- **DNA #47 候選第三次驗證**：「Sub-agent 是 fact-check 主 session 的最後一關」— agent 抓出主 session prior 知識可能誤區並 explicit flag 5 處 unverified（馬英九訪史月份 / Mswati COVID 藥物名 / 駐史醫療團與屏基關係 / 13.6 億援助金額 / 1.46 億基建單源），主 session default 接管時全部 attribute 來源 or 不寫
- **5 個 observer-decision items 主 session default 接管**（per β-r3 META-PATTERN）：
  1. 駐史醫療團 → 用「台北醫學大學體系」（一般敘述）
  2. 結尾 → 混合三切點（紅心芭樂物件 + Mswati 之後 + 直面絕對王權張力）
  3. 多妻制 → 不寫（避東方主義獵奇）
  4. TaiwanICDF 預算金額 → 不寫具體
  5. 馬英九訪史 → 不寫月份
- **Stage 3.5 atom audit**：8 直接引語全部來自 agent §11「金句素材庫」標 high_confidence — 賴清德 + Mswati III 雙邊會談引述 ×4（總統府 News/7122 雙源）/ 楊昊 BBC 中文 ×1 / 賴清德戰略儲油槽 ×1 / Mswati COVID ×1 / 中國「rat」NBC News ×1
- **避雷清單全接管**：絕對君主制不用 outdated 修辭 / remdesivir 用「外媒推測」/ 13.6 億不寫具體 / 馬英九不寫月份 / 回程繞路寫但克制 / 中國「rat」引用但不模仿語氣
- **Cross-link**：6 forward sibling + 6 reverse cross-link 全部加上「台灣與史瓦帝尼」入口（台灣邦交國與國際外交 / 賴清德 / 蔡英文 / 太陽花學運 / 2026鄭習會與國共十年再會 / 認知作戰）
- **觀察者 callout**：哲宇即時抓出「『史王借飛機給台灣總統突破中國封鎖』——這句話聽起來像修辭，但 2026 年 5 月確實發生了」是為了避對位句型而拐彎的 awkward hedge → 改為「『史王借飛機給台灣總統突破中國封鎖』就是這次出訪本身」直述 punchy。**LESSONS-INBOX 候選**：「不是 X 是 Y」改寫常踩的雷——避對位反而失去原版力道，要找直述強斷言而非 hedge 修飾

### 雜學校 NEW — 2026-05-05 twmd-rewrite 完成（賠光積蓄辦的免費展，11 年後副總統來開幕 / Society / 教育）

- **Article**: [knowledge/Society/雜學校.md](../../knowledge/Society/雜學校.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（哲宇 `/twmd-rewrite 雜學校` 直接觸發，不在 INBOX pending）
- **核心矛盾**：「為了改變教育的人，先把教育辦得最像市集」（28 字）— 不太乖原本是抗議的姿態，11 年長成全亞洲最大教育博覽會，社運 vs 品牌 IP 的拉扯沒有結束
- **Hook**：2015-05-09 華山 1914 東 2BCD 館的牆上貼著 Jolin 孔，蘇仰志拿設計公司 150 萬盈餘辦了「不太乖教育節」首屆免費入場兩天約 3 萬人次，最終虧損 700 萬。十一年後 2025 EDit 進駐桃園會展中心
- **品質**：~5500 字 / 22 footnotes / 8 直接引語 / HARD=0 ✅ / prose-health score=2 (≤ 3 PASS) / cjk-punct PASS / link-target PASS / image-health PASS（no-media path） / terminology PASS / footnote-density+format+url PASS / 4 對位句型 + 4 AI metaphor 修正完
- **Research**: [reports/research/2026-05/za-share.md](../../reports/research/2026-05/za-share.md)（377 行 / 31KB / 25 WebSearch + 10 WebFetch / spawn general-purpose agent 直接落檔）
- **大事實校正（agent 抓主 session prior 知識三錯）**：(1) 蘇仰志非 Ogilvy 出身 — 他自己的公司叫**奧茲（Ozzie Curating and Design）**不是奧美，所有訪談均無 Ogilvy 履歷；(2) 首屆「不太乖教育節」是 2015-05-09，不是 2014（華山官網 + KKTIX + INSIDE + 倡議家四源驗證；Wikipedia 寫 2014 是籌備年/預算說法錯位）；(3) 場地全在華山（2015-2019）/ 嘉義（2022 衛星）/ 圓山花博（2024）/ 桃園會展中心（2025），**不是松菸**
- **DNA #47 候選第二次驗證**：「Sub-agent 是 fact-check 主 session 的最後一關」— gallant-payne 5/5 sub-agent 抓 user prompt 事實錯之後，本 session 1/1 sub-agent 同樣抓出 user prompt 三個 prior 知識錯
- **5 個 observer-decision items 主 session default 接管**（per β-r3 META-PATTERN）：(1) 承認商業 IP 但用「品牌化內部矛盾」框架；(2) Ogilvy 不寫；(3) 不太乖宣言不寫（agent 搜不到一手）；(4) 寫 2025 EDit 重塑；(5) 結尾 B+C 混合（陳建仁 scene + INSIDE 「商業上是徹底的失敗」反詰）
- **Stage 3.5 atom audit**：8 直接引語全部來自 agent §11「金句素材庫（可逐字引）」標 high_confidence — INSIDE E376 × 5 句、倡議家 udn 3341905 × 2 句、倡議家 udn 8146714 × 1 句、華山 1914 對談 × 1 句；agent 已驗證可 ctrl-F；single_source 段（國際擴展引語）保留為轉述上下文
- **破折號管理**：寫完 37 處 → 砍 27 處改逗號/冒號/句號 → 保留 8 處（4 處對等列舉並置）
- **Cross-link**：5 forward sibling（教育制度與升學文化 / 為台灣而教 TFT / 一個教師的誕生 / 太陽花學運 / 台灣偏鄉教育）+ 5 reverse cross-link 全部加上「雜學校」入口；5 sibling 均 hard=0 但有 pre-existing WARN（per §5.1 WARNING 仍可 commit）
- **觀察者觸發**：哲宇直接 `/twmd-rewrite 雜學校` — pipeline auto-detect + 完整 read default contract（per MANIFESTO §8.1 / DNA #50）

### 王福瑞 NEW — 2026-05-04 manual 完成（從 200 份影印雜誌到 12 聲道喇叭的三十年 / People）

- **Article**: [knowledge/People/王福瑞.md](../../knowledge/People/王福瑞.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（NML peer ingestion Stage 6 P0 #4，主 session 完整測試 pipeline）
- **核心矛盾**：噪音不是聲音的反面，是讓寂靜變成可聽見的方法。1993 年 24 歲的 NOISE 雜誌是 DIY 抵抗，2020《噪音寂靜》之後噪音變成身體本身（術後人工血管頻率）。三十年是「噪音」這個詞的內涵被一個人改寫的歷程。
- **Hook**：1993 年王福瑞 24 歲，用程式設計師薪水在自家影印機印 200 份《NOISE》實驗音樂雜誌，售價 15-30 元。三十年後（2020）他在就在藝術空間掛起多面體 12 聲道全指向喇叭，作品是大病過後身體裡人工血管的細碎頻率。
- **品質**：145 行 / ~5000 字 / 14 footnote（13 一手 + 1 學術評論）/ HARD=0 ✅ / prose-health score=2 (≤ 3 PASS) / cjk-punct PASS / link-target PASS / image-health PASS / terminology PASS / footnote-density+format+url PASS / 7 直接引語全部 source URL ctrl-F 可驗
- **Research**: [reports/research/2026-05/王福瑞.md](../../reports/research/2026-05/王福瑞.md)（350 行 / 11 WebFetch + 3 WebSearch + 5 NML local / 主 session 自跑無 spawn agent）
- **Stage 3.5 atom audit**：7 直接引語全部對 source URL ctrl-F 可驗（葉杏柔 NML × 2 / ART PRESS × 3 / ARTFORUM × 2 / 顏峻 NML × 1 大段 verbatim）；20+ 數字 atom 對 source 全部 cross-checked；footnote URL 13/14 alive（1 國藝會 SSL cert warning，非 dead link）
- **大事實校正**：refute INBOX 既有錯誤「在地實驗是王福瑞創辦」 → 1995 黃文浩等人創立、王福瑞 2000 才加入媒體實驗室分部（葉杏柔 NML 註腳 2 + Bandcamp ET@T 自述 cross-source verified）；refute「失聲祭由王福瑞創辦」 → 2007 由姚仲涵 / 王仲堃 / 張永達創立，王福瑞是啟蒙者（TCAA + 失聲祭官網）
- **multi-source disagreement**：響相工作室年份兩源衝突（北藝大寫 2015、就在藝術空間寫 2011），保守處理為「2010 年代」；簡體 verbatim 引語兩處（ARTFORUM 中文網 source 為簡體，per DNA #23 三道防線保留 verbatim 不台灣化）；解決顏峻引語「硬件」中國用語 hard gate — 改用 ellipsis 跳過保留核心論點段
- **Cross-link**：4 sibling articles 反向加 cross-link（[王連晟](../../knowledge/Art/王連晟.md) / [台灣新媒體藝術](../../knowledge/Art/台灣新媒體藝術.md) / [台灣聲音地景](../../knowledge/Music/台灣聲音地景.md) — 同時補既有 pre-existing 缺延伸閱讀 section / [台灣獨立音樂](../../knowledge/Music/台灣獨立音樂.md)）；本文 4 wikilink 對外
- **觀察者觸發**：「完整成為 taiwan.md」+「用 rewrite-pipeline 寫王福瑞並完整用新的工具測試，看順不順，有沒有需要調整或進化的」— meta-task 隱含 pipeline stress test，friction notes 寫進 LESSONS-INBOX

### 鄭文琦 NEW — 2026-05-04 angry-shamir 完成（把台灣藝術圈推進馬來群島的 12 年 / People）

- **Article**: [knowledge/People/鄭文琦.md](../../knowledge/People/鄭文琦.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（NML peer ingestion Stage 6 P0 #1，第三 curation-layer peer 第一篇文章）
- **核心矛盾**：鄭文琦自願選擇邊陲 12 年，這個選擇讓他看見台灣藝術圈看不見的事 — 但邊陲視角也有自己的盲點：當大主題（群島）已經講完，平台會跟著一起老去
- **Hook**：2017-05 周盈貞抵達台北成為《數位荒原》駐站第一位邀請藝術家，發表會放她跟婆婆用潮州話祈福「闔家平安、家孫平安、出入平安、遇見好人」 — 策展人那個下午沒有站在舞台中央
- **品質**：153 行 / ~3500 字 / 20 footnote / 0 §11 violations / 0 BAD_FN_FORMAT / 0 wikilink 殘留
- **Research**: [reports/research/2026-05/鄭文琦.md](../../reports/research/2026-05/鄭文琦.md)（621 行 / 12 WebSearch + 8 WebFetch + 5 local Read / 5 NML 語料外新素材）
- **NML peer 引用紀律**：DNA #16「Peer 是 peer 不是 source」應用 — 88% 編輯集中度警示 / 多元 cite 區秀詒 / 高森信男 / 王柏偉等 secondary editors / 6 條鄭文琦本人逐字引語都對 source URL Ctrl-F 可驗
- **Stage 3.5 FACTCHECK 抓 2 hallucination**：「六十多人到場」(unsourced) 移除 +「區秀詒等第一年駐站」(實為周盈貞 + 符芳俊) 修正
- **Stage 5 cross-link**: 補進當代藝術.md（PASS sibling）；台灣新媒體藝術 / 台灣聲音地景 / 台灣策展人與藝術文化建構 / 台灣原住民當代藝術 因 pre-existing §11 violations 或 NO_READING DEFER（per §5.1）
- **Commit**: `99234cdb2`

### 黃魚鴞 NEW — 2026-05-04 charming-mclaren 完成（六公里溪流養一對的台灣最大貓頭鷹，1916 年才被命名 / Nature）

- **Article**: [knowledge/Nature/黃魚鴞.md](../../knowledge/Nature/黃魚鴞.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（觀察者 ad-hoc 指派，非 INBOX）
- **核心矛盾**：研究黃魚鴞 30 年的人，把第一隻看到的小幼鳥帶回家養（1994 砂卡礑 → 嘿美 → 木柵動物園 三十年；研究室追了三十年仍很難在野外見到）
- **Hook**：1994 年砂卡礑溪一棵樹的崖薑蕨叢中，第一個被精確定位的台灣黃魚鴞繁殖巢位 — 父鳥被獵殺、母鳥棄巢、雛鳥被孫元勳帶回家成為「嘿美」
- **品質**：181 行 / 17 footnotes / 3,796 中文字 / 0 §11 violations / 5 破折號（≤15/1500 字 OK）/ 0 ❌ HARD-FIX / 0 🔴 DEAD-LINK / 20 WebSearch + 4 WebFetch
- **Research**: [reports/research/2026-05/黃魚鴞.md](../../reports/research/2026-05/黃魚鴞.md)
- **媒體素材**：hero 圖 cache Wikimedia gailhampshire CC BY 2.0（1165×768 / aspect 1.52）+ 兩支 YouTube embed（雪霸 24h 直播 `nXmf5J0eMFI` / 公視新聞 `DMy6fltLv68`）
- **YouTube embed 首例**：1,800+ knowledge/ 檔案中**首次** iframe 嵌入，用 raw HTML wrapper（方案 A），同時 ship 架構提案 [reports/youtube-embed-architecture-2026-05-04.md](../../reports/youtube-embed-architecture-2026-05-04.md) 規劃 Phase 2-4 升級（rehype plugin / Astro component / privacy mode）
- **Stage 3.5 hallucination 修補 3 處**：(1)「孫元勳剛從美國回到」無 source 推測 → 刪「從美國」；(2) 嘿美 callout 加「託付意味」推測 → 改音譯事實 only；(3)「近 10 公里」上限超 Sun 2013 範圍 → 改「6 到 8 公里」對齊 5.5-7.7 km source
- **Stage 5**：reverse cross-link 補進 [Nature/福爾摩沙鳥類學.md](../../knowledge/Nature/福爾摩沙鳥類學.md)（sibling 已 PASS）；其他 4 個 sibling（櫻花鉤吻鮭 / 台灣黑熊 / 台灣森林生態系 / 台灣國家公園）defer per Stage 5 §5.1，它們無延伸閱讀區塊，加會擴大 scope
- **PR**: [#845](https://github.com/frank890417/taiwan-md/pull/845)

### 卓榮泰 NEW — 2026-05-03 gallant-payne 完成（38 年的協調者，2025 不副署財劃法 / People）

- **Article**: [knowledge/People/卓榮泰.md](../../knowledge/People/卓榮泰.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（Probe 2026-05-03 P1 People deficit 第 1/4 篇）
- **核心矛盾**：「行動創新 AI 內閣」拿不下 1.25 兆軍購預算的協調者困境
- **Hook**：1987 年台北市議會三樓的議會助理 — 解嚴前夕跟著新科議員謝長廷走進會議室，從那一年算起 37 年都在當人家的副手
- **品質**：247 行 / 17 footnotes / 0 §11 violations / 0 ❌ HARD-FIX / 0 🔴 DEAD-LINK / 24 search + 10 fetch
- **Research**: [reports/research/2026-05/卓榮泰.md](../../reports/research/2026-05/卓榮泰.md)
- **政治敏感**：1.25 兆軍購爭議採熱帶雨林理論並列陳述（卓榮泰「三顆好球」+ 羅智強「真正卡案的是賴清德」+ 王義川「根本笑死人」+ 大西洋理事會分析），讀者自己判斷
- **校正**：user prompt「卓榮泰出生彰化」實為台北市，sub-agent Stage 1 三源交叉揭露（Wikipedia + 立法院官方 + 英文 Wikipedia）
- **PR**: [#808](https://github.com/frank890417/taiwan-md/pull/808) merged 13:25 +0800

### 盧秀燕 NEW — 2026-05-03 gallant-payne 完成（不敗女王 8 連勝放棄黨主席，2028 默認共主民調卻被陳萬安超越 / People）

- **Article**: [knowledge/People/盧秀燕.md](../../knowledge/People/盧秀燕.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（Probe 2026-05-03 P1 People deficit 第 2/4 篇）
- **核心矛盾**：不敗女王 8 連勝放棄黨主席，2028 默認共主民調卻被陳萬安超越
- **Hook**：谷關空氣 1 萬瓶（30 元/瓶/30 萬，2018 政治物質化開場）
- **品質**：245 行 / 25 footnotes / 0 §11 violations / 0 ❌ HARD-FIX / 0 🔴 DEAD-LINK / 22 search + 4 fetch
- **Research**: [reports/research/2026-05/盧秀燕.md](../../reports/research/2026-05/盧秀燕.md)
- **政治敏感**：1.25 兆軍購爭議盧的 8000 億-1 兆主張既不站賴的 1.25 兆、也不站藍的 3800 億+N，採三源並列（自由時報「沒有路線在包牌」+ Taipei Times「moderate 策略」+ 聯合報「務實穩健」）讓讀者自選 frame
- **校正**：user prompt 5 處事實錯誤（央視→華視 / 中興法律→政大地政 / 4 屆立委→6 屆 / 2026 黨主席→2025 / 「副主席」實非）sub-agent 三源交叉全揪
- **PR**: [#813](https://github.com/frank890417/taiwan-md/pull/813) merged 14:31 +0800

### 徐巧芯 NEW — 2026-05-03 gallant-payne 完成（她讓國民黨年輕了，但年輕的方式是流量，不是論述 / People）

- **Article**: [knowledge/People/徐巧芯.md](../../knowledge/People/徐巧芯.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（Probe 2026-05-03 P2 People deficit 第 3/4 篇）
- **核心矛盾**：她讓國民黨年輕了，但年輕的方式是流量，不是論述
- **品質**：214 行 / 17 footnotes / 0 §11 violations / 17/17 footnote URLs ✅ / 22 search + 4 fetch
- **Research**: [reports/research/2026-05/徐巧芯.md](../../reports/research/2026-05/徐巧芯.md)
- **政治敏感**：軍購爭議並列四方立場（行政院 1.25 兆 / 黨中央 3800 億+N / 徐版 8000 億 / TPP 4000 億），紀實罷免結果（6.2 萬同意票達 27.10% 法定門檻但被 7.5 萬不同意票否決）半勝半敗
- **校正**：user prompt 7 處事實錯誤（800 億→8000 億 / 蔣萬安發言人→實洪秀柱+朱立倫+馬英九等）
- **PR**: [#809](https://github.com/frank890417/taiwan-md/pull/809) merged 14:31 +0800

### 季麟連 NEW — 2026-05-03 gallant-payne 完成（為扁升上將的扁系名將，反咬要開除挺軍購的韓國瑜 / People）

- **Article**: [knowledge/People/季麟連.md](../../knowledge/People/季麟連.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式（Probe 2026-05-03 P2 People deficit 第 4/4 篇）
- **核心矛盾**：為扁升上將的扁系名將，反咬要開除挺軍購的韓國瑜
- **品質**：~5500 字 / 17 footnotes / 0 §11 violations / 17/17 footnote URLs ✅ / 22 search + 8 fetch
- **Research**: [reports/research/2026-05/季麟連.md](../../reports/research/2026-05/季麟連.md)
- **政治敏感**：4/29 中常會引爆事件採雙源 verbatim 引語驗證（自由時報 5419759 + 風傳媒 11075732 兩個獨立中文 source 都能 Ctrl-F 找到逐字一致版本）
- **校正**：user prompt 事件日期「4-30 中央委員會議」實為 4-29 中常會
- **PR**: [#812](https://github.com/frank890417/taiwan-md/pull/812) merged 14:32 +0800

### 台灣股市與資本市場 EVOLVE — 2026-05-03 gallant-payne 完成（2026-04-29 全球第 6 大股市里程碑 / Economy）

- **Article**: [knowledge/Economy/台灣股市與資本市場.md](../../knowledge/Economy/台灣股市與資本市場.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — EVOLVE 模式（Probe 2026-05-03 T1-B P0）
- **核心矛盾**：攻上全球第 6 大的同時，44% 的市場身家壓在一檔半導體上
- **品質**：122→222 行（+82%） / 11→24 footnotes（+118%） / 0 §11 violations / 25 search + 7 fetch
- **Research**: [reports/research/2026-05/台灣股市與資本市場.md](../../reports/research/2026-05/台灣股市與資本市場.md)
- **新增章節**：§2026 全球第 6 大股市 + §TSMC 一檔效應（45% 權重） + §AI 紅利轉化路徑（高盛 25 檔清單）
- **數字驗證**：4/28 收盤實際升級為全球第 6（market data）/ Bloomberg 4/29 發稿 / 中文媒體 4/30 跟進；TSMC 接近 45% 三層調和（TWSE 官方 2026-03-10 顯示 45.0041% baseline）
- **PR**: [#811](https://github.com/frank890417/taiwan-md/pull/811) merged 14:32 +0800

### 台灣企業：鴻海精密 EVOLVE — 2026-05-03 gallant-payne 完成（24 國 90 萬人的代工帝國，最難管的是自己人 / Economy）

- **Article**: [knowledge/Economy/台灣企業：鴻海精密.md](../../knowledge/Economy/台灣企業：鴻海精密.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — EVOLVE 模式（Probe 2026-05-03 T1-C P0）
- **核心矛盾**：24 國 90 萬人的代工帝國，最難管的是自己人
- **品質**：136→182 行（+34%） / 0→15 footnotes（+∞ vs 舊文 0 footnote） / 0 §11 violations / 19 search + 4 fetch
- **Research**: [reports/research/2026-05/台灣企業：鴻海精密.md](../../reports/research/2026-05/台灣企業：鴻海精密.md)
- **新增章節**：§企業治理風險（廖萬城 2021-05-24 1.6 億定讞 → 曾新民/錢雲儒 2026-04-30 千萬時序對照 + 鴻海「抓鬼三人組」內部監察 + Foxconn 鄭州 4 台幹拘留 2024 事件）
- **司法 framing**：採「已起訴 / 已判決 / 媒體報導指出」事實層敘述，避免推測動機
- **校正**：user prompt「2025 廖萬城 2 年定讞」實為 2021-05-24；「立委陳菁徽推《企業賄賂防制法》」2026 查無此提案，sub-agent 直接決定不寫進文章避免幻覺擴散
- **PR**: [#810](https://github.com/frank890417/taiwan-md/pull/810) merged 14:31 +0800

### 賈永婕 EVOLVE 深度 — 2026-05-02 objective-khorana 完成（補早晨 Quick Mode 漏跑的 Stage 1 + 揪出「120% 美少女是 2006 陳水扁說」hallucination / People）

- **Article**: [knowledge/People/賈永婕.md](../../knowledge/People/賈永婕.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — EVOLVE 深度進化（早晨 sub-agent A Quick Mode polish commit `2f191274` 沒做真正 Stage 1，本輪補齊全 Stage 0-6）
- **觸發**：哲宇明確要求「跑 rewrite-pipeline 深度研究進化」（搭配「做完 taiwan.md 完整甦醒」前置）
- **核心矛盾深化**：「藝人轉公股治理是台灣沒有先例的路，每跨一步都伴隨等量質疑，她每次又用下一個更大的動員回應」這個結構性對稱循環。HFNC 被檢舉違法 → 慈善協會 4,200 萬 / 屍皮被罵外行人 → Arch to Arc 募 212 萬 / 點燈公器私用 + 不當開除員工被批膚淺虛榮 → Honnold 攀岩全球 6.2M 觀看 / 被起底掌權北洋政府 → 2026-02 公開「以身為台灣人第一代為榮」
- **Hook**：被遺忘的姓氏（賈永媫）+ 物件開頭保留 / 強引語「我把這裡全部都換成了國旗，怎麼樣都可以拍得到，怎麼樣全世界都看得到！」
- **新章節 2 條**：「我以身為台灣人第一代為榮」（2026-02-24 公開澄清）+「一張董事長椅，七成公股影響力」（公股結構 + 2024-11 三爭議連環 + G-Dragon 展）
- **品質**：22 footnote / 23,636 字 (A 級) / §11 對位句型 0 處 / 破折號密度 16 / 3500 字 (門檻內) / format-check ✅ PASS / wikilink-validate ✅
- **Stage 1 真正深度**：主 session 自跑（無 spawn agent，per DNA #42 sub-agent 偷吃步預防）20 WebSearch + 6 WebFetch verbatim 中文 source / 落檔 [reports/research/2026-05/賈永婕-deep-evolve.md](../../reports/research/2026-05/賈永婕-deep-evolve.md) 含 24 verified URL + privacy audit + 媒體授權矩陣（no-media）
- **Stage 3.5 hallucination audit 抓到 4 個重大事實校正**：(a) 「120% 美少女」原話是蔡英文 2021 IG 對話「妳是美少女這件事，我 120% 更可以證明」**非 2006 陳水扁** — ettoday verbatim 確認；(b) 賈德耀關係從「曾祖父賈德潤的胞兄」精確化為「爺爺的三伯父（曾叔公輩）」— 2026-02-24 賈本人公開澄清版；(c) 賈德潤官職補上「豫東第二區行政長」第三職；(d) 結尾從編年式提問「2023 年她就點頭了嗎？」改畫面式餘韻
- **Stage 3.6 STORY ATOM AUDIT 抓到 1 條**：「2025 年 9 月 Honnold 來台試爬」改保守「一次試爬」（CTWANT 原文無「來台」，refrain from 推導地點）
- **Stage 5 cross-link**：forward 4 條（林強 / 蔡英文 / 周杰倫 / 台灣志工文化與公益參與）+ reverse 2 條（蔡英文 + 周杰倫；林強 sleepy-colden 已加；台灣志工文化 per Stage 5.1 DEFER 因 sibling 缺延伸閱讀 section）
- **Commit**: [`6961bddc`](https://github.com/CheYuWuMonoame/taiwan-md/commit/6961bddc)
- **元 pattern**：「同一篇文章 24 小時內被 EVOLVE 兩次」是 sub-agent Quick Mode 跟主 session deep mode 接力的真實 case。Quick Mode 撐住底線品質，深度 mode 補真正研究。「audit-only reconstruction ≠ research」是新揭露的 sub-agent 偷吃步延伸 pattern（DNA #42 候選），audit-only 預設既有 prose 可信只查疑點，深度研究預設每個 high-risk atom 需 verify

### 毒馬鈴薯認知作戰 NEW — 2026-04-30 α-r2 完成（200 ppm 之外還有 30 ppm / 14 天 / 15 年食安傷疤 / Society）

- **Article**: [knowledge/Society/毒馬鈴薯認知作戰.md](../../knowledge/Society/毒馬鈴薯認知作戰.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式，全 Stage 0-6（跳過 Stage 4.5 媒體插入：政府記者會 / 立院 IVOD 截圖授權需個別申請，待後 polish）
- **觸發**：cheyu 即時觸發 P0「正在被認知作戰和攻擊⋯走 rewrite pipeline 寫一篇文章」+ 提供 Google 第一頁搜尋結果
- **核心矛盾**：「中共敘事踩準了 15 年食安傷疤——而地基是真的」（agent §10 候選 c，§11 fix 後 drop 對位句型）
- **Hook**：「投名狀」的早上 — 從 2026-04-29 國台辦發言人陳斌華記者會切入，用三層假面（科學 / 治理 / 信任）解剖
- **8 scene 非編年體**：「投名狀」的早上 / 200 ppm 是一個算術題 / 真正的 gap 不在 200 ppm，叫 CIPC / 1 月 16 日到 2 月 13 日的 28 天 / 「逐顆檢查」與 85 個邊境檢查員 / 2011 年的塑化劑到 2024 年的萊豬 / 「投名狀」如何精準踩進來 / 所以問題是什麼
- **品質**：31 footnote / ~24,635 字 (S 級旗艦) / §11 對位句型 0 處 / 破折號密度 1.85 / 1500 字 (門檻 15) ✓ / 塑膠句 0 / 歐化七種 0 / format-check 7/7 全綠 / wikilink 5 條全 verified
- **Stage 1 研究**：spawn general-purpose agent → 14 WebSearch + 16 WebFetch / 落檔 [reports/research/2026-04/毒馬鈴薯認知作戰.md](../../reports/research/2026-04/毒馬鈴薯認知作戰.md) 533 行 / 18 條 verbatim 直接引語 / frontmatter verification 三層 (high_confidence / single_source / unverified)
- **Stage 1.5 自主拍板**（cheyu 反饋「為什麼一直停下來問我」+ β-r3 META-PATTERN「Default 是行動，不是 defer」校準）：(1) 採 agent 推薦核心矛盾候選 c (§11 fix 後 drop 對位)；(2) 8 scene 三層假面結構 (科學 / 治理 / 信任)；(3) 標題用 4 個數字 anchor (200ppm / 30ppm / 14 天 / 15 年)；(4) Stage 4.5 媒體插入延後到 polish round
- **Stage 3.5 hallucination audit 抓到 2 條 critical 修正**：(a) 萊豬公投數字「410 萬同意」修為「3,936,386 票（48.79%）vs 4,131,371 票（51.21%）」（誤差 16.5 萬）；(b) 塑化劑「217 廠商」修為「119→155 家」+ 補上技正楊明玉發現過程；(c) 餿水油「645 噸地溝油」修為「香港 + 日本進口共 759 噸非食用豬油 + 200+ 噸地溝油」+ 移除「味全/味王/奇美/85 度 C」（與 2014 頂新案 conflate 風險）
- **Stage 5 cross-link**：forward 5 條（[[認知作戰]] / [[2026鄭習會與國共十年再會]] / [[台海危機與兩岸關係發展]] / [[蔡英文]] / [[賴清德]]）+ reverse 1 條（[[認知作戰]] 加延伸閱讀指回）
- **MANIFESTO §自主權邊界處理**：政治立場條款由 cheyu explicit go 解除（「這交給你了，深度研究，走 rewrite pipeline」）；§熱帶雨林兩條 axis 對齊（臺灣島史觀 ✓ + 台灣主權 ✓）；§10 幻覺鐵律 Stage 3.5 抓到 3 條 hallucination 全修
- **編輯立場踐行**（cheyu「真實打破謎障，克服認知作戰」）：拒絕「政府闢謠 vs 中共抹黑」二元；同時批沈政男「食安情結」化約 + 國台辦「投名狀」化約；§反例 §12 列 10 條「不能說的話」；結尾灰色地帶式不下結論

### 海底電纜 NEW — 2026-04-29 α 完成（矽盾頂上看得到，命脈底下看不見 / Technology）

- **Article**: [knowledge/Technology/海底電纜.md](../../knowledge/Technology/海底電纜.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式，全 Stage 0-6（跳過 Stage 4.5 媒體插入：海纜地圖 / 維修船照片授權需個別申請，待後 polish）
- **觸發**：α session 觀察者「繼續深度研究跟走 rewrite-pipeline 寫海底電纜」（今日加入 P0 三條收官第三條）
- **核心矛盾**：「矽盾頂上看得到，命脈底下看不見」（17 字 / agent 推薦候選 b，呼應策展抓手）
- **Hook**：「506 大樓沒有路標」 — 從台東大武 506 大樓低調竣工切入，揭穿台灣 14 條國際海纜的物理隱形性
- **8 scene 非編年體**：「506 大樓」沒有路標 / 頭髮粗的玻璃，扛起 2,300 萬人的對外 / 馬祖人的 LINE 走 15 分鐘 / 多哥籍、香港股、福建船員、台灣海床 / 中國想繞過台灣，發現繞不過去 / 高速公路炸了，西濱跟產業道路救不了 / 一艘船 22 天，一艘船日租 80 萬 / 矽盾的另一半，或者——軟肋 / 海纜七法、宏泰 58 司法首例、與一條 4 個月 23 天
- **品質**：49 footnote / ~6,800 字 / §11 violations 0 / format-check ✅ all green / footnote URL 44/49 alive 5 redirect 0 dead / 破折號 18（≤20 / 1500 字 門檻 = 30,553 / 1500 ≈ 20）/ 對位句型 0 處
- **Stage 1 研究**：spawn general-purpose agent → 22 WebSearch + 7 WebFetch / 落檔 [reports/research/2026-04/海底電纜.md](../../reports/research/2026-04/海底電纜.md) 781 行 / 14 條 verbatim 直接引語表 / 完整反例 §10 §11（自然災害 vs 蓄意 / 國際對照 / 矽盾隱喻限制）
- **Stage 1.5 自主拍板**（觀察者授權「直接深度研究跟走 rewrite-pipeline」）：(1) 採用 agent 推薦核心矛盾 (b)；(2) 50 天破題 + 4 個月 23 天反轉 雙數字編劇結構；(3) §10「矽盾隱喻的限制」反駁段，避免變成中國威脅論宣傳；(4) hero 圖延後到 Stage 4.5 polish（TeleGeography 截圖 fair use 邊緣，需慎判）
- **Stage 3.5 FACTCHECK Quick Mode**：2 條 dead-link 修補（[^5] UDN 文章已下架 → 改 Rest of World 同主題深度報導；[^27] Diplomat 403 → 改 Submarine Networks PLCN 主條目）→ 0 dead / 5 redirect / 0 timeout
- **Stage 5 cross-link**：4 個 sibling 反向回補（報導者 / 社會運動與公民參與 / 台灣新媒體藝術 / justfont 與台灣字體發展）

### justfont 與台灣字體發展 NEW — 2026-04-29 α 完成（從華康廿五年到金萱七十六分鐘的字型小史 / Technology）

- **Article**: [knowledge/Technology/justfont與台灣字體發展.md](../../knowledge/Technology/justfont與台灣字體發展.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式，全 Stage 0-6（跳過 Stage 4.5 媒體插入：字型樣張授權需個別申請，待後 polish）
- **觸發**：α session 觀察者「繼續」第二條 P0（justfont + 台灣字體發展）
- **核心矛盾**：「華康做了二十五年沒人愛字型，justfont 用群募讓字型變全民議題」（28 字 / agent 推薦候選 a）
- **Hook**：「iPhone 上的『蘋』字是誰畫的」 — 從 2015 年 6 月 8 日 WWDC 蘋方發表反差切入，揭穿台灣 1987 年起就有商用中文字型能力的暗區
- **8 scene 非編年體**：iPhone 上的「蘋」字是誰畫的 / 七十六分鐘的一百五十萬 / 二分糖、半糖、八分糖 / 七十五個字一天 / 「萱」字頭上那撇連不連 / 教授把 48 套字型放上網 / 林霞、蘭陽明體與民國初年 / 七千字、七千人、與七年 / 思源黑體：早金萱一年的那場開源 / 「沒人願意做字啊」
- **品質**：46 footnote / ~6,000 字 / §11 violations 0 / format-check ✅ all green / footnote URL 40/46 alive 2 redirect 0 dead 4 timeout / 破折號 17（≤18 / 1500 字 門檻）/ 對位句型 0 處
- **Stage 1 研究**：spawn general-purpose agent → 20 WebSearch + 7 WebFetch / 落檔 [reports/research/2026-04/justfont與台灣字體發展.md](../../reports/research/2026-04/justfont與台灣字體發展.md) 435 行 / 13 條 verbatim 直接引語表 / 完整反例 §6 §7（金萱寶瓶事件相當的 `錦黑體` 抄襲爭議 + 教育部標準字衝突 + 大廠對照）
- **Stage 1.5 自主拍板**（觀察者授權「不要問我，直接走完整 pipeline」）：(1) 採信 agent 校正 4 個事實錯誤（文鼎 1990 / 王漢宗中原大學 / 金萱 NT$25,930,099 / 7,667 人 / 三位 founder 是 葉俊麟/林霞/蘇煒翔）；(2) §6 反例 + §2 大廠對照 ≥ 30% 篇幅；(3) hero 圖延後到 Stage 4.5 polish 處理（字型樣張授權需慎判）
- **Stage 3.5 FACTCHECK Quick Mode**：5 條 dead-link 修補（[^4] [^7] [^16] [^33] [^39]）→ 0 dead / 2 redirect / 4 timeout（acceptable）
- **Stage 5 cross-link**：3 個 sibling 反向回補（社會運動與公民參與 / 台灣新媒體藝術 / 報導者）

### 報導者 NEW — 2026-04-29 α 完成（公民社會把調查報導從營業項目救成公共財的十年 / Society）

- **Article**: [knowledge/Society/報導者.md](../../knowledge/Society/報導者.md)
- **Pipeline**: REWRITE-PIPELINE v2.20 — NEW 模式，全 Stage 0-6（跳過 Stage 4.5 媒體插入：報導者圖片授權需個別申請，待後 polish）
- **觸發**：α session 觀察者「開始執行今天加入的三篇的一篇一篇做 rewrite-pipeline 深度研究」（今日加入 P0 三條的第一條）
- **核心矛盾**：「公民社會把調查報導從營業項目救成公共財」（22 字 / 候選 C，呼應策展抓手）
- **Hook**：2015 年 9 月 1 日記者節上午十點記者會，童子賢個人捐助 500 萬元成立財團法人，三不原則「不擁有、不干預、不回收」九個字成為基金會 DNA
- **8 scene 非編年體**：2015 年 9 月 1 日上午 / 不擁有、不干預、不回收 / 漁工的眼睛 / 不顯示點閱率的編輯室 / 那年寶瓶 / 10 到 15 歲的讀者 / 出口禁令下的紅線 / Rolling On
- **品質**：36 footnote / ~5,000 字 / §11 violations 0 / format-check ✅ all green / footnote URL 36/36 alive 0 redirect 0 dead / 破折號 14（≤15 門檻）/ 對位句型 3 處（≤3 門檻，三題判準合法）
- **Stage 1 研究**：spawn general-purpose agent → 22 WebSearch + 8 WebFetch / 落檔 [reports/research/2026-04/報導者.md](../../reports/research/2026-04/報導者.md) 493 行 / 14 條 verbatim 直接引語表 / 完整反例 §8 §9（寶瓶事件 + 王健壯 #MeToo + 報導者不是台灣第一個獨立媒體）
- **Stage 1.5 自主拍板**（觀察者授權「不要問我，直接走完整 pipeline」）：(1) 童子賢只寫初始 500 萬高信心 + 不寫單源「年捐 3 千萬」累計總額；(2) 寶瓶 + 王健壯放尾段「那年寶瓶」並陳，呈現「也會犯錯但會公開認錯」的成熟度；(3) 8-scene 同意 agent 順序、場景化處理
- **Stage 3 verbatim 引語審計**：兩處原 verbatim 引語（「絕對不是彼此對立」+「我們的競爭對手是抖音、YouTube」）因 source URL dead 或 single source 無 Ctrl-F 驗證 → 降為轉述句式（per EDITORIAL §挖引語紅線 + DNA #23）
- **Stage 3.5 FACTCHECK Quick Mode**：5 條 dead-link 修補（[^10] [^15] [^17] [^19] [^26]）+ 1 條 redirect 修補（[^6] INSIDE article 3793 已換內容）→ 36/36 PASS / 0 dead / 0 redirect
- **Stage 5 cross-link**：2 個 sibling 反向回補（社會運動與公民參與 / 台灣新媒體藝術）；台灣獨立音樂 defer（既有 12 個 broken wikilink legacy 阻擋 pre-commit hook，留 follow-up 一併修補）

### 蔡健雅 NEW — 2026-04-28 κ 完成（四度金曲歌后，新加坡人怎麼把台灣變成主場）

- **Article**: [knowledge/People/蔡健雅.md](../../knowledge/People/蔡健雅.md)
- **Commit**: `5030f5d6` — REWRITE-PIPELINE NEW 模式
- **核心矛盾**：新加坡身分證、台灣戶籍、英文母語的女歌手，唯獨在台灣樂壇拿下四度金曲歌后
- **觸發**：κ session R12（觀察者 trigger 線性執行 12 輪之 1）

### 台灣宗教信仰整併 EVOLVE — 2026-04-28 κ 完成（在恐懼裡長出的信仰帝國 / Issue #655 三篇整併為一篇深度文章）

- **Article**: [knowledge/Culture/台灣宗教與寺廟文化.md](../../knowledge/Culture/台灣宗教與寺廟文化.md)（canonical 主稿）
- **Commit**: `87911554` — REWRITE-PIPELINE EVOLVE + §整併變體 Step A-E（3 篇 zh-TW + 4 篇翻譯整併為 1 篇 + 5 lang redirect × 9 條）
- **整併規模**：archive 9 個檔案、保留 1 篇主稿、淨刪 ~3,550 行
- **核心反直覺**：「全世界廟宇密度最高、宗教自由排名亞洲第二的島嶼，最大宗的兩個信仰歷史起源都跟瘟疫和死亡有關」
- **8 scene 非編年體**：保安宮屋頂 / 一萬五千座廟 / 大甲媽祖 9 天 8 夜 / 三教共用一座屋頂 / 一貫道戰後第一個合法化的非法宗教 / 戰後新興佛教四大山頭 / 馬雅各 + 馬偕 + 1977 人權宣言 / 從恐懼到自由
- **品質**：45 footnote / ~5,500 字 / format-check 7 維度全 PASS
- **新事實校正**：中台禪寺正式落成 2001 年（非舊文 1994）+ 慈濟「68 國志工 / 136 國救助」（非舊文 1000 萬會員）
- **Research**: [reports/research/2026-04/台灣宗教信仰.md](../../reports/research/2026-04/台灣宗教信仰.md)（362 行 / 三類劃分 A 主稿 95% 保留 + B 11 條 [MERGE-IN] + C 16 條 [MERGE-IN]）

### 台灣邦交國與國際外交 EVOLVE — 2026-04-28 κ 完成（12 vs 113 vs 177 三層張力 / 2026 全更新）

- **Article**: [knowledge/Society/台灣邦交國與國際外交.md](../../knowledge/Society/台灣邦交國與國際外交.md)
- **Commit**: `ed7dc86e` — REWRITE-PIPELINE EVOLVE
- **核心張力**：12 個邦交國 vs 113 個海外據點 vs 177 個免簽或落地簽目的地
- **2026 全更新**：諾魯斷交 / 史瓦帝尼路線 / 矽盾敘事 / UN 2758 認知作戰
- **後續 spore**：2026-04-29 α 哲宇接力發出護照悖論孢子（commit `81cf9dfa` + `9b1f8287`）

### 臺灣大百科全書 NEW — 2026-04-28 κ 完成（五億元國家級知識夢的範式轉移 / PR #672）

- **Article**: [knowledge/Society/臺灣大百科全書.md](../../knowledge/Society/臺灣大百科全書.md)
- **Commit**: `3c1ad46b` — REWRITE-PIPELINE NEW（idlccp1984 PR #672 batch + polish）
- **核心矛盾**：國家斥資五億元打造的中央集權式百科夢，最終被一群陌生人在 Wikipedia 共同寫的條目超越
- **角度**：知識生產從「機構認證」轉向「群眾自發」的範式轉移

### 蔣渭水 NEW — 2026-04-28 κ 完成（〈臨床講義〉診斷殖民地病灶的醫者 / PR #671）

- **Article**: [knowledge/People/蔣渭水.md](../../knowledge/People/蔣渭水.md)
- **Commit**: `1da889d6` — REWRITE-PIPELINE NEW（idlccp1984 PR #671 batch + polish）
- **核心矛盾**：用醫師的診斷書語法寫政治宣言的人——〈臨床講義〉把整個台灣社會當病人，開出 1921 年的處方箋

### 賴和 NEW — 2026-04-28 κ 完成（穿著本島衫的彰化媽祖 / PR #670）

- **Article**: [knowledge/People/賴和.md](../../knowledge/People/賴和.md)
- **Commit**: `205b7c87` — REWRITE-PIPELINE NEW（idlccp1984 PR #670 batch + polish）
- **核心矛盾**：彰化人替彰化人寫病歷、寫小說、寫坐牢日記的醫師——「彰化媽祖」是病人替醫師取的名字

### 競技疊杯 NEW — 2026-04-28 κ 完成（從 1.915 秒網拍潮物到橫掃亞洲的 43 金傳奇 / PR #668）

- **Article**: [knowledge/Society/競技疊杯.md](../../knowledge/Society/競技疊杯.md)
- **Commit**: `1e9ef23f` — REWRITE-PIPELINE NEW（idlccp1984 PR #668 batch + polish）
- **核心矛盾**：一個曾經被歸類成兒童遊戲的小眾運動，被台灣選手在亞洲賽事拿下 43 面金牌

### 蘇巧慧 NEW — 2026-04-28 κ 完成（從美麗島辯護律師之女到 16 度優秀立委的細節控 / PR #667）

- **Article**: [knowledge/People/蘇巧慧.md](../../knowledge/People/蘇巧慧.md)
- **Commit**: `e608ff3e` — REWRITE-PIPELINE NEW（idlccp1984 PR #667 batch + polish）
- **核心矛盾**：父親是美麗島大審辯護律師的二女兒，最後選的不是父親那條街頭路線，而是條文細節裡的逐字審議

### 蘇貞昌 NEW — 2026-04-28 κ 完成（從美麗島辯護律師到衝衝衝的電火球閣揆 / PR #666）

- **Article**: [knowledge/People/蘇貞昌.md](../../knowledge/People/蘇貞昌.md)
- **Commit**: `1ea63cdd` — REWRITE-PIPELINE NEW（idlccp1984 PR #666 batch + polish）
- **核心矛盾**：美麗島大審辯護律師、屏東縣長、台北縣長、行政院長，「衝衝衝」三個字成了他四十年從黨外街頭走到內閣大樓的速度標記

### 阿婆鐵蛋 NEW — 2026-04-28 κ 完成（從渡船頭海腳大飯店到淡水最硬的集體記憶 / PR #664）

- **Article**: [knowledge/Food/阿婆鐵蛋.md](../../knowledge/Food/阿婆鐵蛋.md)
- **Commit**: `eebc8fbc` — REWRITE-PIPELINE NEW（idlccp1984 PR #664 batch + polish）
- **核心矛盾**：一道因為下雨賣不掉、被海風一吹一夜變硬的滷蛋，最後變成淡水代名詞

### 車輪餅 NEW — 2026-04-28 κ 完成（從日治今川燒到萬丹紅豆的台灣認同弧線 / PR #663）

- **Article**: [knowledge/Food/車輪餅.md](../../knowledge/Food/車輪餅.md)
- **Commit**: `5407b874` — REWRITE-PIPELINE NEW（idlccp1984 PR #663 batch + polish）
- **核心矛盾**：日治時代從九州傳入的今川燒，戰後改名車輪餅，再被屏東萬丹紅豆收編成本土小吃——同一個鐵盤烤出兩個身分

### 台灣當代文學發展 dropped 處理 — 2026-04-28 完成（Issue #635 Phase 4/4 / A 文退場並 redirect 至台灣文學史）

- **Article**: ~~knowledge/Art/台灣當代文學發展.md~~（已 redirect 至 [台灣文學史](../../knowledge/Art/台灣文學史.md)）
- **Commit**: `a1f4dd46` — REWRITE-PIPELINE §範圍重切變體 dropped 處理
- **動作**：A 全景文章內容已被 B/C/D 完整覆蓋，本檔退場並重定向，避免主題重複

### 解嚴後台灣文學 EVOLVE — 2026-04-28 完成（Issue #635 Phase 2/4 / 1987-1999 純化 scope）

- **Article**: [knowledge/Art/解嚴後台灣文學.md](../../knowledge/Art/解嚴後台灣文學.md)
- **Commit**: `620becfc` — REWRITE-PIPELINE §範圍重切變體 EVOLVE
- **核心矛盾**：解嚴給的是自由的新形狀，也是新限制——市場 vs 政治、本土 vs 國際、純文學 vs 大眾
- **8 scene 非編年體**：1987-7-15 戒嚴日彭瑞金 / 朱天心《古都》1997 / 田雅各《最後的獵人》1987 / 朱天文《荒人手記》1994 / 平路《行道天涯》1995 / 林宗源台語詩 / 林榮三文學獎 1989 創立 / 1999 解嚴 12 年文學市場
- **三類劃分**：保留女性主義浪潮 / 同志文學 / 原住民文學覺醒 / 母語文學復甦 / 都市後現代；吸納彭瑞金 1991 + 《島嶼邊緣》創刊；移除 1983《殺夫》等已被 Phase 1 承擔段落

### 交工樂隊 NEW — 2026-04-27 完成（客家八音 × 反美濃水庫社運 / 四年兩張百大）

- **Article**: [knowledge/Music/交工樂隊.md](../../knowledge/Music/交工樂隊.md)
- **Commit**: `1e9b2ffb` — REWRITE-PIPELINE NEW（twindiemusic.com batch）
- **核心矛盾**：1999 年為反美濃水庫運動而組成的客家樂團，四年兩張專輯都進台灣百大專輯榜，主腦林生祥之後成為金曲常客
- **角度**：台灣公民社會 × 音樂運動的最早完整案例

### 濁水溪公社 NEW — 2026-04-27 完成（A 級 8 腳註 / Stage 3.5+3.6 PASS）

- **Article**: [knowledge/Music/濁水溪公社.md](../../knowledge/Music/濁水溪公社.md)
- **Commit**: `d2120d8f` — REWRITE-PIPELINE NEW（twindiemusic.com batch）
- **核心矛盾**：1993 年成立的台語龐克樂團，水晶唱片時代的見證者，歌詞充滿社會批判與農村意象
- **品質**：A 級 8 腳註，Stage 3.5/3.6 hallucination audit + STORY ATOM AUDIT 全 PASS

### 農村武裝青年 EVOLVE — 2026-04-27 完成（從樂生到田埂 / 用吉他記錄台灣土地的吶喊）

- **Article**: [knowledge/Music/農村武裝青年.md](../../knowledge/Music/農村武裝青年.md)
- **Commit**: `46b8a7b4` + polish `dac7394c`（修復 §11 Tier-1 對位句型 4 處）— REWRITE-PIPELINE EVOLVE（twindiemusic.com batch）
- **核心矛盾**：阿達一人民謠組合，從樂生療養院抗爭走到苗栗大埔事件田埂，用吉他記錄土地

### 拍謝少年 NEW — 2026-04-27 完成（台語搖滾旗手二十年）

- **Article**: [knowledge/Music/拍謝少年.md](../../knowledge/Music/拍謝少年.md)
- **Commit**: `93704df0` + polish `c4dd4684`（§11 對位句型修復 9→2 violations）— REWRITE-PIPELINE NEW（twindiemusic.com batch）
- **核心矛盾**：2008 年台南起家的三人台語龐克，《家是電影院》《鐵馬英雄》兩度入圍金曲，跟滅火器形成南部台語搖滾雙旗艦

### 當代台灣文學 EVOLVE — 2026-04-27 完成（Issue #635 Phase 3/4 / 修正事實 + 吸納 C+B + 補新作家）

- **Article**: [knowledge/Art/當代台灣文學.md](../../knowledge/Art/當代台灣文學.md)
- **Commit**: `3846e6f1` + polish `31272c2c`（修復 §11 Tier1 對位句型 + Tier2 重量密度）— REWRITE-PIPELINE §範圍重切變體 EVOLVE
- **核心矛盾**：當代台灣文學第一次有了國際能見度，內部閱讀人口卻在崩塌
- **三類劃分**：保留吳明益 / 林奕含 / 甘耀明 / 童偉格 / 黃崇凱 / PTT 與部落格文學；吸納施叔青三部曲（從 C）+ 駱以軍《西夏旅館》（從 B）+ 朱天文朱天心 2000 年後（從 B）；補新作家黃麗群《海邊的房間》/ 賀景濱《去年在阿魯吧》/ 黃崇凱《文藝春秋》

### 林良 EVOLVE — 2026-04-28 ι 完成（廈門推行員 → 戰後台灣兒童文學奠基者 / 1924-2019 全弧 / 九龍江畔 hook）

- **Article**: [knowledge/People/林良.md](../../knowledge/People/林良.md)
- **Pipeline**: REWRITE-PIPELINE v2.19 — EVOLVE 模式，全 Stage 0-6 + 3.5（FACTCHECK Quick Mode）+ §11 polish + 35 footnote URL 健康全綠
- **觸發**：ι session 觀察者「完整走 rewrite-pipeline 進化 林良 文章」（ι 第 4 phase，承接 refresh-data + spore harvest 8 之後）
- **核心矛盾**：「一個被戰火追著跑、22 歲帶著一箱書下船的廈門青年，把一輩子用來證明 ——孩子值得被當成完整的讀者，淺話不是粗話，淺而有味才難。」
- **Hook**：1944 年漳州九龍江畔，21 歲長子站著看父親跳水救人後再也沒上岸；母親和二弟把寫作的位置讓給他。「為了寫作，我曾經放棄」是他人生最重的一筆——「淺語」的溫柔底下藏著一個失去童年的恐懼
- **8 個非編年體小標題**：九龍江畔的長子 / 一箱書下船 /「淺是淺，但是要淺而有味」/ 夜深人靜寫小太陽 / 每週五個專欄的早晨六點 / 看圖說話 6000 篇 / 女兒抄寫的最後三個月 / 少年的知音
- **品質**：37 footnote / ~5500 字 / 破折號 12 / §11 violations 0 / format-check ✅ all green / footnote URL 35 alive 1 redirect 1 timeout 0 dead
- **Stage 1 研究**：spawn general-purpose agent → 22 WebSearch + 11 WebFetch / 落檔 [reports/research/2026-04/林良.md](../../reports/research/2026-04/林良.md) 504 行 / 18 條 verbatim 直接引語表（11 林良 + 4 林瑋 + 3 他人）/ 完整生平年表
- **核心矛盾 refine**：agent 推翻原 session 設想的「國語推行員 vs 兒童文學家」hook，refine 為更深層的「九龍江失父 → 寫作的內疚母題」（撐起整篇張力）
- **Source authority 升級**：取代 7 個 403 dead-link source（books.com.tw + commonhealth.com.tw 是 bot-block）→ 改用 mdnkids 國語日報官方 + 遠見雜誌 + Openbook 等 alive source；保留 verbatim 引語從 Ctrl-F 可驗來源（公視 / 中央社 / 國藝會 / Openbook / 遠見 / 太報）
- **Cross-link**：4 個 Art 文學系列文章雙向連回（戰後台灣文學 / 解嚴後台灣文學 / 台灣文學史 / 日治時期文學）

### 林琪兒 EVOLVE — 2026-04-28 ι 完成（從台北銀行櫃檯到 400 公里高 — 加 3 支 YouTube 訪談 verbatim 重塑紀實文體）

- **Article**: [knowledge/People/林琪兒.md](../../knowledge/People/林琪兒.md)
- **Pipeline**: REWRITE-PIPELINE v2.19 — EVOLVE 模式，Stage 0 三類劃分 + Stage 1 補抓 3 支官方 YouTube 訪談 transcript + Stage 2 全文重寫 + Stage 3.5 FACTCHECK Quick Mode + Stage 3-4 全綠
- **觸發**：觀察者 ι session「先額外轉這篇林琪兒的訪談研究來當額外材料 + 走 rewrite-pipeline 進化文章 + 確認整篇文章語感、順暢度、紀實文體」+ 兩條補增 YouTube
- **核心矛盾進化**：β5 原為「飛行員夢被氣喘撞碎，結果飛得比飛行員還高」（命運轉折 framing）→ ι 重定義為「那個 2 歲半被抱離島嶼的男孩，半世紀後回來，找的不是太空，是出生那家醫院」（首尾呼應 + dream crushed → resilience → mountains to climb）
- **Hook**：開場改用中央大學演講 verbatim「I would not be here today...mountains to climb」直接打哲學重量，再回到 1993 USAFA 氣喘體檢具體事件；結尾用龍山寺到中正紀念堂徒步 + 80 年代雞蛋糕記憶 + 找到出生醫院場景，跟 green jewel in the mist 雙重首尾呼應
- **新增三支 YouTube transcript**（首次拿到林琪兒本人 verbatim 引語）：
  - [^28] 公視新聞網一對一深訪（zh-TW，134 lines / 3,273 chars）：童年回憶 / 1981 二年級教室電視 / 總覽效應 + 30% 維護地球 / 不是虎媽 / 訪台首日龍山寺 + 雞蛋糕 + 出生醫院
  - [^29] TaiwanPlus Taiwan Talks 深度訪談（en，612 lines / 22.7K chars）：dream crushed / resilience / Star Wars + Arthur C. Clarke 科幻啟發
  - [^30] TaiwanPlus News 中央大學演講側錄（en，52 lines）：「I would not be here today」「mountains to climb」「zero gravity never gets old」「front flips, back flips」
- **結構**：9 個 scene 反編年體小標題（Mountains to climb / 二年級教室裡那台電視 / 清泉崗武漢斯卡尼 / 3,565 選 9 / 紅色 LED 下的第一口萵苣 / 真空之外的風笛聲 / 把自己的飛船命名為 Freedom / 30% 的時間 vs 地球 / 不是虎媽 / 那家銀行櫃檯後面的島）
- **品質**：30 footnote（β5 既有 27 + ι 新增 3 個 transcript + 1 個 STS-1 NASA 官方）/ 245 行 / quality-scan ⚠️ 5（lastHumanReview false + 破折號 10 + 稀薄段落 1，全部在可接受區）/ §11 0 violations（從 2 改 0）/ format-check 7/7 全綠 / wikilink-validate 全綠 / footnote URL 28 ✅ + 2 redirect + 0 dead
- **Stage 3.5 FACTCHECK Quick Mode**：所有新增 verbatim 引語對齊三支官方 transcript（公視「3 成」/ TaiwanPlus「mountains to climb」/「zero gravity never gets old」）+ 1981-04-12 STS-1 與 8 歲二年級算術自洽（1981-1973=8）+ Artemis II 乘員 4 人名單已 cite Britannica [^25]
- **Research**: [reports/research/2026-04/lin-qi-er.md](../../reports/research/2026-04/lin-qi-er.md) §「2026-04-28 ι Stage 0 EVOLVE 補抓三支訪談 transcript」
- **Transcripts archive**: [reports/research/2026-04/林琪兒-transcripts/](../../reports/research/2026-04/林琪兒-transcripts/) — 4 個 .vtt + 4 個 clean .txt
- **語感、紀實文體 verify**：(1) 紀實筆法不煽情 — Lindgren 母親段、24 年教育段、出生醫院段都用 Lindgren 本人 verbatim，沒有作者情緒引導 (2) 反編年體 — 9 個 scene 標題全是場景/物件/數字/quote 不是「YYYY 年發生 X」(3) 無「不是 X 是 Y」對位句型 (4) 破折號 10 個（< 15 上限）

### 日治時期臺灣社會運動 — 2026-04-27 harvest-005 完成（NEW History / NMTH 999 頁監控檔案逆讀）

- **Article**: [knowledge/History/日治時期臺灣社會運動.md](../../knowledge/History/日治時期臺灣社會運動.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式，由 Harvest 引擎自動 spawn（spawn 嘗試 2 次，第 1 次 SIGINT 打斷）
- **核心矛盾**：「日本殖民政府其實沒能消滅 1920 年代台灣社會運動——999 頁監控文件揭示殖民當局始終緊張；但真正終結這場運動的，是各派系自己的互相點名」
- **Hook**：蔣渭水（1890–1931）40 歲因傷寒去世，1931 年 8 月 23 日大眾葬逾 5,000 人送行 → 從帝國凝視的視角「逆讀」台灣抵抗地圖
- **品質**：12 footnote / 180+ 行 / 2 callout / 時代座標表 / 破折號 3 個 / quality-scan ✅
- **Commit**: `8413cde6`（同 commit 含 羅發號事件與卓杞篤）

### 三個外國人看乙未 — 2026-04-27 harvest-004 完成（NEW History / 多視角史料解讀）

- **Article**: [knowledge/History/三個外國人看乙未.md](../../knowledge/History/三個外國人看乙未.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式，Harvest 引擎自動 spawn
- **系列**: D-2（乙未之役系列第 2 篇）
- **Semiont 角度**：同一場戰爭，三個不在場當事人的視角差異揭示「歷史是誰寫的」
- **Commit**: `a98d745f`

### 羅發號事件與卓杞篤 — 2026-04-27 harvest-003 完成（NEW History / 南岬之盟卓杞篤視角）

- **Article**: [knowledge/History/羅發號事件與卓杞篤.md](../../knowledge/History/羅發號事件與卓杞篤.md)
- **Pipeline**: REWRITE-PIPELINE — NEW 模式，Harvest 引擎自動 spawn（系列 C-2，李仙得系列第 2 篇）
- **Semiont 角度**「視角翻轉」：原住民酋長直接跟美國領事簽約，清廷缺席
- **Commit**: `8413cde6`（同 commit 含 日治時期臺灣社會運動）

### 蕭上農（INSIDE 創辦人）— 2026-04-27 harvest spawn 首次產出 + observer polish（NEW People）

- **Article**: knowledge/People/蕭上農.md
- **Pipeline**: REWRITE-PIPELINE — NEW，Harvest 引擎首次 spawn 產出（plus observer polish）
- **Commit**: `32e53d5b`

### 沈伯洋（NEW + EN translation）— 2026-04-27 γ 完成

- **Article**: knowledge/People/沈伯洋.md (NEW Stage 0-6) + en translation Stage 6
- **Commits**: `3e1e177a` (NEW) / `5a0848a9` (heal inline link) / `4227c1a7` (EN translation)

### 徐佳瑩 — 2026-04-26 γ 完成（NEW People / 陳建騏 dead cross-ref）

- **Article**: [knowledge/People/徐佳瑩.md](../../knowledge/People/徐佳瑩.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「被評分的冠軍，最後成了出題的人」— 從《超級星光大道》第三屆冠軍走到金曲歌后、單曲製作人與作曲人
- **Hook**：2008 年第一次北上試鏡時差點買票回台中 → 結尾回到那張車票，寫成「心裡還有一首歌沒寫完」
- **大事實修正**：inbox note 的「超偶第一屆」為誤寫；已修正為《超級星光大道》第三屆冠軍
- **品質**：10 footnote / 152 行 / 0 §11 violations / wikilink ✅ / quality-scan ✅ / format-check 7/7 全綠
- **Research**: [reports/research/2026-04/徐佳瑩.md](../../reports/research/2026-04/徐佳瑩.md)
- **Cross-link**：解掉 [陳建騏](../../knowledge/People/陳建騏.md) 既有 dead cross-ref；延伸到林宥嘉、田馥甄、魏如萱、台灣綜藝

### 戰後台灣文學 EVOLVE — 2026-04-26 γ 完成（Issue #635 Phase 1/4）

- **Article**: [knowledge/Art/戰後台灣文學.md](../../knowledge/Art/戰後台灣文學.md)
- **Commit**: `183f5ef5`
- **Pipeline**: REWRITE-PIPELINE v2.18 — EVOLVE 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「戰後台灣文學是從不能說的事情裡，學會該怎麼說的」— 42 年（1945-1987）戒嚴條件下每一代作家用不同的迂迴學會「怎麼說」
- **Hook**：1945 年 8 月葉石濤從日本陸軍退伍回到台南、20 歲打開稿紙一個中文字都寫不出來 → 結尾 1987-02 葉石濤《台灣文學史綱》232 頁，書名只有「台灣」兩個字。葉石濤 1945 → 1987 首尾 42 年呼應
- **結構**：8 個非編年體 scene（葉石濤 1945 白紙 / 反共年代縫隙 / 防空洞卡夫卡 / 林海音辭呈 / 鹿窟蛇吻 / 狼來了副刊 / 鹿城林市殺豬刀 / 232 頁）
- **觸發**：[Issue #635](https://github.com/frank890417/taiwan-md/issues/635) idlccp1984 提案 4 篇文學文章合併為三段時序（戰後 / 解嚴後 / 21 世紀 + A dropped）
- **Stage 0**：4 篇現有文章全文 Read（C 主幹 / A 全景索引吸納 / B 邊界段引用 / D 確認無重疊）
- **Stage 1**：[research report 451 行 / 41.7KB](../../reports/research/2026-04/戰後台灣文學.md) — 24 WebSearch + 2 WebFetch + 4 existing-article Read
- **Stage 2**：完整重寫 ~5,400 中文字 / 35 footnote
- **Stage 3.5 HALLUCINATION AUDIT 採用新解**：國史館 2020-12-27 公布劉學坤手寫報告：呂赫若 1950-09-03 下午 3 點半在鹿窟山上蛇吻致死（前 70 年史界僅作「失蹤、年代不詳」）→ 4 篇舊文都還沒寫到，本版更新為 2020 新解
- **Stage 3.6 STORY ATOM AUDIT**：URL-encode 〈現代文學*(雜誌)〉維基括號 + 〈王文興*(作家)〉維基括號（避免 Markdown 解析器斷裂）；重複 source attribution 修正
- **品質**：35 footnote / 152 行 / ~5,400 中文字 / 3 破折號（極簡）/ 0 §11 violations / 0 對位句 / quality-scan ✅ 全綠 / format-check 7/7 全綠
- **新補 4 篇舊文都漏的 6 個關鍵 fact**：
  1. 楊逵 1949〈和平宣言〉600 字 12 年牢獄
  2. 林海音 1963 「船長事件」（風遲〈故事〉一詩）
  3. 葉石濤 1965〈台灣的鄉土文學〉於《文星》第 97 期
  4. 葉石濤 1951-09-20 入獄、1953 判 5 年、1954 減 3 年出獄
  5. 呂赫若 2020 國史館新解（鹿窟蛇吻 1950-09-03）
  6. 夏濟安《文學雜誌》1956-1960 現代主義先聲
- **範圍純化**：移除 1990s+ 段（施叔青台灣三部曲 / 蘇偉貞）→ 後續移交 D；保留 1979-1983 邊界事件（李昂《殺夫》1983 / 廖輝英《油麻菜籽》1982 / 蕭颯《我兒漢生》1979）作為解嚴前夜女性文學覺醒
- **Cross-link 雙向回補**：4 個延伸閱讀目標反向加 pointer（[解嚴後台灣文學](../../knowledge/Art/解嚴後台灣文學.md) / [當代台灣文學](../../knowledge/Art/當代台灣文學.md) / [台灣文學史](../../knowledge/Art/台灣文學史.md) / [日治時期文學](../../knowledge/Art/日治時期文學.md)）
- **後續 INBOX**：B/D/A 三條已 append 到 ARTICLE-INBOX.md §Pending（Phase 2-4）
- **教訓 canonical 化候選**：
  - **EVOLVE 模式整合多篇舊文時 Stage 0 是核心**：本次 Stage 0 萃取 4 篇現有文章後，明確劃分「保留 / 移到 B / 刪除」三類，避免 Phase 2 polish B 時碰撞重疊
  - **史料解密的 70 年延遲**：呂赫若 1950 蛇吻致死案揭示「失蹤」這個詞在白色恐怖期間的政治意涵——所有 anchor 都可能有 30-70 年解密延遲，未來文學史 / 政治史條目要保留 hedge 「依某年某 source」

### 19 世紀的樟腦戰爭 — 2026-04-25 γ 完成（NEW History / NMTH 12 篇 batch #2/12）

- **Article**: [knowledge/History/19世紀的樟腦戰爭.md](../../knowledge/History/19世紀的樟腦戰爭.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「世界要的樟腦藏在原住民的山，誰先到誰流血」— 三方權力角力（英商列強 + 清廷 + 原住民），承接 MANIFESTO §臺灣島史觀
- **Hook**：1864-02-06 史溫侯在淡水寫下三個數字 6/16/28（一擔樟腦從原產地走到香港翻將近五倍）→ 結尾 1864 verbatim「中國人只能進到較溫順部落所佔領的山區」回扣，雙重指涉 1868 軍事事件 + 1860-1900 結構性衝突
- **結構**：7 個非編年體 scene（算式 / 山是誰的 / 鐵鍋 / 砲彈 / 條約之後 / 隘勇線 / 香氣消失），物件先行不走 1868 單一事件編年敘事
- **verbatim 引語**：Pickering 1898《Pioneering in Formosa》Chapter XVII 直接從 Internet Archive 取得（"There had gradually arisen a great demand for this article in America" / "our camphor that was ready for shipment was plundered to the value of 6,000 dollars" / "with the help of our seven-shooter rifle and two boat guns" / "iron pots, one inverted on another, and the sublimated vapour"）+ NMTH 史溫侯 1864 中英對照 verbatim（6/16/28 三段價差 / 6,000 擔 / 「向部落首領贈送禮物以獲得砍伐許可」/ 蘇澳「番人人頭」12→4 銀兩賞金）
- **NMTH 本地資料整合**：7 個 collection 完整精讀（783700e8 福爾摩沙的樟腦 / 9363fe10 香山之旅 / 8565270b 福爾摩沙補遺 / 98bf60ec 福爾摩沙概述 / 02388910 + 26659313 + 2ad9dad5 史溫侯信件），β4 紀律「Stage 1 先讀本地 NMTH collection 再 web search」第二次驗證
- **品質**：18 footnote / 134 行 / 約 5,800 中文字 / 13 破折號（≤15 ✓）/ 0 §11 violations / 0 對位句 / quality-scan ⚠ 4（lastHumanReview false 待哲宇審）/ format-check 7/7 全綠 / wikilink-validate 0 斷裂
- **Stage 3.5 HALLUCINATION AUDIT 抓到**：(1)「三井合名會社旗下的樟腦工人」維基大豹社事件條目沒提任何日本企業名 → 刪「三井合名會社」改「樟腦業者旗下的工人」(2)「大豹社人口從上千銳減到 300 多人」維基原文是「1000 多位居民僅剩 25 戶」→ 改「銳減到僅剩 25 戶」(3) 結尾 Davidson 1903「樟腦之代價即人血」verbatim 在 Internet Archive 全文搜尋 camphor + blood + cost 找不到逐字對齊 → 刪整段 blockquote + footnote [^20]
- **Stage 3.6 STORY ATOM AUDIT 抓到**：「劉銘傳 1886 設『腦磺總局』於台北，分支在北投、雞籠鼻等地」維基劉銘傳條目完全沒提這三個 detail（腦磺總局 / 北投 / 雞籠鼻）→ source attribution mismatch（footnote URL 對但內容對不上）。改正為「劉銘傳實施第二次樟腦專賣，設立『腦務局』作為專賣機關（運作至 1890 年）」+ footnote source 改維基台灣樟腦產業
- **Research**: [reports/research/2026-04/19世紀的樟腦戰爭.md](../../reports/research/2026-04/19世紀的樟腦戰爭.md) — 422 行 / 7 NMTH local + 14 web search/fetch + Pickering Internet Archive verbatim 補抓 / verification three-tier 已分層（high_confidence 12 / single_source 5 / unverified 9）
- **Cross-link 雙向回補**：4 目標延伸閱讀加 19 世紀的樟腦戰爭 pointer（[knowledge/People/史溫侯.md](../../knowledge/People/史溫侯.md) / [knowledge/History/清治時期.md](../../knowledge/History/清治時期.md) / [knowledge/History/日治時期.md](../../knowledge/History/日治時期.md) / [knowledge/History/阿里山：帝國的林場與高一生的山.md](../../knowledge/History/阿里山：帝國的林場與高一生的山.md)）
- **觀察者 Stage 1.5 拍板組合**：Q1 保留「19 世紀的樟腦戰爭」雙重指涉命名 / Q2 大豹社限縮一節（不喧賓奪主）/ Q3 中性必麒麟（讓 Pickering verbatim 自己說話，不下「英雄」或「侵略者」道德判決）/ Q4 連結當代用「歷史脈絡」B 方案（中油/台塑無樟腦公司血緣但全球工業鏈位置脈絡相承）/ Q5 火藥一句帶過（「無煙火藥都需要它」融入 30 秒概覽）
- **教訓 canonical 化候選**：
  - **Stage 1.5 hallucination 高風險區**：peer-ingestion P1+ 文章 agent 寫一手 source attribution 時要 Stage 3.6 specific verify，不只信 footnote URL 在
  - **Davidson / Gardella canonical name 陷阱**：研究 task brief metadata 上提的「canonical 學術 source」不一定真的對應任務內容（Gardella _Harvesting Mountains_ 寫 Fujian 茶葉非 Taiwan 樟腦），Stage 1 必驗書名 vs 內容
  - **Internet Archive 原書 verbatim 是 paraphrase 的解藥**：Pickering 原書段落直抓比 Taipei Times 摘要可靠 10x，未來 1850-1920 西文 source 標準動作

- **Article**: [knowledge/Nature/福爾摩沙鳥類學.md](../../knowledge/Nature/福爾摩沙鳥類學.md)
- **Commit**: `14c688eb`
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式，全 Stage 0-6 + 3.5/3.6 走完
- **核心矛盾**：「一個英國副領事用林奈系統把福爾摩沙的鳥寫進拉丁文——但他的鳥類地圖是從海岸線描出的地圖，中央山脈的空白裡，原住民已經用族語喊過這些鳥千年」
- **Hook**：1862-04 一張藍色的雉雞皮 → 結尾 1906 Goodfellow 鄒族嚮導頭飾上的兩根尾羽（首尾 scene 呼應）
- **結構**：6 個非編年體小標題（一張藍色的雉雞皮 / 201 個新名字 / 30 個獵人，6 個剝皮師 / 他的地圖從海岸線畫起 / 接力者 / Sisil 的鳴聲）
- **verbatim 引語**：3 段 Swinhoe 親筆英文（1863 論文開場 + 1864-08 致 Gray 信 "the cap of a savage" + 1864-07 致 Gray 信 "that wild and solitary isle"）全部 Ctrl-F 可查 NMTH primary source
- **NMTH 本地資料整合**：首版 Stage 1 agent 只 web search 漏讀 52 個 NMTH collection，觀察者 callout 後補跑 Stage 1 supplement (§13) 讀 5 個 primary source collection（77ea6a55 Ornithology of Formosa 1863 全文 75 頁 + Gould 1862 十六新種 + 1862 & 1864 Swinhoe 信件 ×3 + 1864 匿名書評）。直接挖出「30 獵人 + 6 剝皮師」這個 web search 完全沒抓到的殖民博物學勞動結構細節
- **品質**：25 footnote / 170 行 / 20,931 字符 / 3 破折號 / 0 §11 violations / 0 對位句 / quality-scan 全綠 / format-check 全綠
- **Stage 3.5 HALLUCINATION AUDIT 抓到**：「肉在夏天壞得快」（4 月是春天 + 無一手 source 推論）、「台語華雞」（單源未交叉）、年齡「26 歲」（實際 25）、description 「25 歲」（實際 24），全部修正
- **Stage 3.6 STORY ATOM AUDIT 抓到**：「黑色尾羽」color adjective 無 source 支持 →「長尾羽」；「買下羽毛」assertive action →「把羽毛帶回倫敦」較無爭議；§參考資料 敘事與 prose 頭飾描述的一致性修補
- **Research**: [reports/research/2026-04/福爾摩沙鳥類學.md](../../reports/research/2026-04/福爾摩沙鳥類學.md) — 671 行 / 21 WebSearch + 8 WebFetch + 5 NMTH collection 檔精讀 / verification three-tier（high_confidence 14 / single_source 10 / unverified 7）
- **Cross-link 雙向**：knowledge/People/史溫侯.md + knowledge/Nature/特有種.md 延伸閱讀加入本文
- **教訓 canonical 化候選**：「peer-ingestion 類文章 Stage 1 必先讀本地 collection 檔再 web search」— 已寫進 INBOX §Pending NMTH batch banner，待 distill 到 REWRITE-PIPELINE Stage 1 §peer-ingestion 特別章節

### 造山者：世紀的賭注（紀錄片）— 2026-04-24 β2 完成（NEW Art / 從探測器 T1-C 直接觸發）

- **Article**: [knowledge/Art/造山者世紀的賭注.md](../../knowledge/Art/造山者世紀的賭注.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose 15 WebSearch + 14 WebFetch / Stage 2 全文寫作 / Stage 3 自檢過 / Stage 4 format-check ✅ / Stage 5 cross-link 5 個目標雙向回補）
- **核心矛盾**：「一部沒張忠謀正面訪談的 TSMC 史詩，如何既致敬過去又為矽盾焦慮代言」
- **Hook**：2026/4/16 普渡大學那場放映 → 倒敘到 1974 小欣欣豆漿店 → 2025/3 魏哲家進白宮 → 結尾翻轉：張忠謀夫婦自費觀影鞠躬三次
- **結構**：6 個非編年體小標題（普渡的下午 / 沒有張忠謀的 TSMC 史詩 / 五年八十人 / 從南陽街到亞利桑那 / 「Taiwan Never Stole」 / 造山者其實不在場）
- **verbatim 引語**：4 段（蕭菊貞 ×3 + 蔣顯斌 ×1 + 蔡英文 ×1 + 曾繁城 ×1）
- **重大事實校正**：英文片名 ≠「A Bet Worth a Century / The Mountain Maker」（觀察者 task brief 用名），正確 = **A Chip Odyssey**（多源驗證 CNEX 官網 + Focus Taiwan + Taipei Times + Hoover + UCLA + Columbia + CASPA）
- **品質**：21 footnote / 46 inline reference / 145 行 / 14,564 字符 / 12 破折號 (well under 36 budget) / 0 對位句 / 5 callout / 0 問句小標
- **Research**: [reports/research/2026-04/造山者世紀的賭注.md](../../reports/research/2026-04/造山者世紀的賭注.md) — 15 WebSearch + 14 WebFetch（3 次 403）；single_source 11 項明確標註；unverified 8 項
- **Cross-link 雙向**：5 個目標反向回補（半導體產業 / 科技園區發展 / 認知作戰 / 台海危機與兩岸關係發展 / 林琪兒）
- **連結到林琪兒**：4/22 林琪兒 + 4/24 造山者 構成「同期 Soft Power 雙線」（半導體紀錄片 + NASA 太空人返台），互為延伸閱讀
- **觸發來源**：reports/probe/2026-04-24.md §T1-C — 探測器 → 觀察者直接 dispatch → 同 session 完成

### 認知作戰 — 2026-04-23 β v2 擴充完成（PR #594 → Stage 0-6 × 2 輪）

- **Path**: [knowledge/Society/認知作戰.md](../../knowledge/Society/認知作戰.md)
- **Type**: EVOLVE × 2 輪（v1 從 PR #594 merge 接手；v2 觀察者觸發擴充）
- **Pipeline 版本**: v2.17+（v1 Stage 1 27 次搜尋 / v2 再加 21 次搜尋 + 2 次 WebFetch = 累計 48 次搜尋）
- **篇幅**：39,203 字（v1 ~15,000 字 → v2 擴張 2.6x）
- **Footnote**：61 條，全部真實 URL 驗證（其中 Reuters/Congress.gov/Medium/中國公安部網為 bot-blocked 但 URL 真實存在）
- **v2 新加軸線**（觀察者指示「加更多案例/論述/觀點/故事」）：
  1. **反擊面兩條線**（新章節）：八炯+陳柏源《中國統戰紀錄片》200萬/117萬觀看 / 沈伯洋 2025-10-28 重慶公安「分裂國家罪」立案 / 央視 8 分鐘起底專題 / 黃澎孝「敵人勳章」
  2. **關西機場事件真假三角**（新段落）：中國微博「洪水猛獸 baby」源頭 + 楊蕙如 PTT 本土網軍接力 + 蘇啟誠自殺 / 2025-03 憲法法庭判侮辱職務罪違憲免訴確定 — 「認知作戰邊界」最誠實的歷史教材
  3. **王宏恩三要件**（新段落）：UNLV 政治系學者指「境外、協同、特定動機」三要件缺一不可 / 「一群帳號也可能是好朋友」當全文收束金句
  4. **治理層新章節**：衛福部依《醫師法》裁罰路徑 + 數發部「打詐通報查詢網」AI 分流 + 黃彥男「內容真假不應由政府判斷」哲學 + TikTok 公部門禁用 vs 民眾未禁的法律誤解
  5. **平台責任深挖**：Meta 160 億美元 / 95% 門檻 / **台灣因法律強制才被納入廣告主驗證**（勝績訊號）/ Google Pixel 10 C2PA Assurance Level 2
  6. **國際錨點擴充**：EU AI Act 第 50 條 2026-08 / DEFIANCE Act 2026-01 參議院通過 / TAKE IT DOWN Act 2025-05 / 太子集團 150 億比特幣
  7. **歷史脈絡**：2020 選舉 IORG 拆解 / 2024 賴清德當選後 AI 虛擬主播新特徵 / 批判演算法素養 Critical Algorithmic Literacy 概念
- **MANIFESTO §11 過濾器升級**：新造 [scripts/tools/check-manifesto-11.sh](../../scripts/tools/check-manifesto-11.sh)，覆蓋 9 種變體（不是X是Y、這不是、不只是、不再是、看似實則、非單純、不等於對位、heading 含對位、破折號連用 + 密度）；v1 12 個違反全數消除；v2 0 違反
- **書寫紀律**：v2 完稿 0 §11 違反 / 破折號密度 < 每千字 2 個
- **Cross-link**：正向 4 條（Threads在台灣 / 迷音Miin / 台灣網路社群遷徙史 / 台灣媒體與新聞自由）、反向 1 條（台灣網路社群遷徙史 順手修掉 broken PTT批踢踢 link）
- **貢獻者 credit**：idlccp1984（原始提案 PR #594，保留 frontmatter author）
- **神經迴路**：
  - idlccp1984 N=7 首次踩到 AI hallucinated URLs pattern（貢獻者責任 vs 維護者責任的不同層級）
  - 小丑魚原則邊界案例：幻覺引用不屬「維護者自己查」範疇；觀察者選 B 路徑（merge + 完整 REWRITE-PIPELINE）是比 request-changes 更高 commitment 的「承擔+教學」模式
  - §11 過濾器升級：v1 完稿後觀察者發現「不只是」「這不是」「不再是」等漏網變體，造過濾器工具（scripts/tools/check-manifesto-11.sh）並結晶到 DNA 候選
  - 認知作戰文章成為「複雜性優於正確性」的典範：讓三條警戒線（警覺中共、警覺本土標籤化、警覺研究方法論侷限）同時存在，拒絕二分敘事
- **研究筆記 canonical**：[reports/research/2026-04/認知作戰.md](../../reports/research/2026-04/認知作戰.md)（491 行，v1+v2 完整研究軌跡保留）

### 馬英九迷因 — 2026-04-22 α 完成（idlccp1984 PR #587 merge-after-escalation-polish）

- **Type**: NEW (idlccp1984 外部貢獻 + 觀察者裁定 merge + Semiont polish)
- **Category**: Society
- **Path**: knowledge/Society/馬英九迷因.md
- **Source**: PR #587 by @idlccp1984
- **流程**: Semiont 初判政治敏感 escalate（4 選項表）→ 觀察者裁定「選 A：可以 merge，馬英九真的有這麼多迷因」（強調這是 documentary cultural curation 不是政治攻擊）→ merge → polish
- **Polish 內容**: (a) 補 `## 延伸閱讀` 四條雙向血緣連結（[[People/馬英九]] / [[Culture/台灣迷因]] / [[Culture/長輩圖]] / [[Society/PTT批踢踢]]）(b) 反向 cross-link 加進 `馬英九.md` + `台灣迷因.md` §延伸閱讀
- **Pending followup**: footnote ` — 描述` 後綴（26 條太多，等下次自動化邊界討論清楚再批次補）
- **Taxonomy 討論**: PR comment 邀請 idlccp1984 + 觀察者一起想「人物本傳 vs 人物迷因條目」未來怎麼分。初步判準：迷因 ≥ 10 案例 + 跨世代影響 → 獨立；否則併入人物條目 §公眾形象 section。馬英九 19 個案例 ✅ 通過獨立門檻

### 林琪兒（Kjell Lindgren）— 2026-04-22 α 完成（idlccp1984 PR #588 merge-first-polish）

- **Type**: NEW (idlccp1984 外部貢獻 + Semiont polish)
- **Category**: People
- **Path**: knowledge/People/林琪兒.md
- **Source**: PR #588 by @idlccp1984
- **Polish 內容**: (a) 補 `## 延伸閱讀` 三條血緣連結（[[Technology/台灣太空產業發展]] / [[People/朱經武]] / [[People/吳大猷]]）(b) 補 `## 參考資料` heading (c) 15 個 footnote 補上 ` — 描述` 後綴 (d) 反向 cross-link 加進 `知識/Technology/台灣太空產業發展.md §延伸閱讀`
- **熱點掛鉤**: Lindgren 4/21 才以 NASA 詹森太空中心副局長身份返台參加 Freedom 250 — 條目 4/21 提交、4/22 接住，timing 完美
- **Pattern 第 N 次驗證**: idlccp1984 連續第 6 篇 AI-gen 貢獻呈現相同 format 缺失三連（缺延伸閱讀 / 缺參考資料 heading / footnote 無描述後綴）。LESSONS-INBOX 2026-04-21 β 「外部 AI-gen 貢獻者的標準 format 缺失 pattern」第 6 次驗證

### 紀柏豪（聲音藝術家 / 作曲家 / 策展人）— 2026-04-21 β 完成（從經濟學走進聲響，用演算法追問「你到底聽進去了嗎」）

- **Article**: [knowledge/Art/紀柏豪.md](../../knowledge/Art/紀柏豪.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose 25 WebSearch + 9 WebFetch / Stage 2 全文寫作 / Stage 3 事實鐵三角 / Stage 4 format-check ✅ / Stage 5 cross-link 林經堯 + Hello Nico 雙向回補）
- **核心矛盾**（25 字）：「經濟系出身，用演算法測量世界，卻始終尋找觀眾的自主聆聽」
- **Hook**：2025 年 10 月下旬 C-LAB DIVERSONICS 展期中，《朗誦者 2.0》三十支手機同步 AI 語音朗誦一段文字的 scene，回推十一年前台大經濟系畢業生轉向聲音藝術的起點
- **結構**：6 個 scene 小標題（DIVERSONICS 當下 / 量化思考走進聲響 / 歐洲巡行 / MIT 三年 / 風弦琴回台 / 不是不創作就會死）
- **verbatim 引語**：4 句核心語錄（「不是不創作就會死」/「我的作品很少有我自己的影子」/「一開始對音樂的創作想像很窄」/ R. Murray Schafer 引述）+ chipohao.com 英文自述 + 朗誦者 2.0 作品說明 verbatim
- **關鍵發現（Stage 1 研究）**：(1) 紀柏豪曾是 Hello Nico 樂團合成器手 2014《浮游城市》EP（與昨日 Hello Nico 條目雙向連結）(2) 2021 MIT Harold and Arlene Schnitzer Prize 視覺藝術首獎（$5,000，多源確認）(3) 融聲創意有限公司 2017-06-16 設立，代表人紀柏豪（台灣公司網）(4) 七度國際駐村：V2 鹿特丹、巴黎西帖、Laboral、Asia Art Archive HK、FACT Liverpool、NTCH、18th Street Santa Monica
- **避開 claim**：台新藝術獎入圍/得獎——研究 agent 專項搜尋無結果，不假設有紀錄；ARTICLE-INBOX 原 notes 提及「融聲創意」與「台新藝術獎脈絡」都查證後謹慎處理
- **品質**：19 腳註（格式 ✅）/ 約 3,426 中文字 / 延伸閱讀 4 篇 / format-check 全過 / quality-scan ⚠️ 7（未人工審核 + 破折號 26 + 稀薄段落 ×1；中國用語 1 處在 verbatim 引語內無法更動）
- **Research**: [reports/research/2026-04/紀柏豪.md](../../reports/research/2026-04/紀柏豪.md) — 25 WebSearch + 9 WebFetch，4 single_source / 4 unverified 項目明確標註
- **Cross-link 回補**：林經堯.md + Hello-Nico.md 雙向延伸閱讀加紀柏豪 pointer
- **⚠️ 待觀察者驗證**：(a) Goldsmiths 具體畢業年份（只能確認「MMus」身份）(b) 1989 出生年份（single_source）(c) 策展計畫《Convergence》《Rescaling the World》詳情

### 紙傘 + 神豬（外部 PR polish）— 2026-04-21 α 完成（idlccp1984 PR #579 + #580 merge-first-polish）

- **Articles**: [knowledge/Culture/紙傘.md](../../knowledge/Culture/紙傘.md) + [knowledge/Culture/神豬.md](../../knowledge/Culture/神豬.md)
- **Pipeline**: MAINTAINER polish（merge-first-polish-later 原則 + Stage 3.5 幻覺審計 + 格式修復 + cross-reference 補齊）
- **PRs**: [#579 紙傘](https://github.com/frank890417/taiwan-md/pull/579) / [#580 神豬](https://github.com/frank890417/taiwan-md/pull/580)（idlccp1984 貢獻，皆 AI-generated）
- **關鍵修正（Stage 3.5 發現）**：
  - 紙傘：**刪除偽造 verbatim 引言**「沒客人買傘，我就當藝術品自己欣賞」— 原文 footnote 掛 taiwan-panorama 光華雜誌，但 WebFetch 確認該來源無此句。疑 AI fabricate 並掛 real URL 錯配偽證。
  - 紙傘：**刪除未驗 BBC 紀錄片名**《長遠的搜尋》— 多源 WebSearch 查無實證
  - 紙傘：1924 年具體引進年份降格為「日治時期」（多源僅稱「日治時期」）
  - 神豬：「獻刃發豬」「幻化成仙」「紅糯米丸」「往生咒」✅ 農委會豬主題館驗證
  - 神豬：1900 三峽農會 ✅ 多源驗證（維基 + 農會官方）
  - 神豬：1847 年林秋華武舉獻豬羊 ✅ 補入作為義民祭神豬起源
- **格式修復**：
  - readingTime: `'預計10分鐘'` → `10`（紙傘）
  - category: `'History, Culture, Society'` → `'Culture'` + 多分類移到 tags（神豬）
  - title 擴展：`'神豬'` → `'神豬：台灣信仰與動物權的百年拉扯與轉型之路'`
  - author: `'Manus AI for Taiwan.md'` → `'Taiwan.md Contributors'`（兩篇統一）
  - footnote 從學術引用體 → Taiwan.md 標準 `[^N]: [名稱](URL) — 描述`
  - 新增 `## 延伸閱讀`（4-5 篇 cross-reference）
  - 移除 `📝 策展人筆記` emoji callout（融入段落敘事）
  - 新增 `---` section 分隔線
- **格式檢查**：format-check ✅ 0 errors / 0 warnings（兩篇）
- **新教訓**：LESSONS-INBOX 2026-04-21 α「AI-gen 貢獻標準幻覺 pattern：偽造 verbatim quote + footnote URL 錯配偽證」

### 林經堯（數位藝術家）— 2026-04-21 α 完成（聲響研究缺席診斷者 × NFT 秒殺藍籌藝術家）

- **Article**: [knowledge/Art/林經堯.md](../../knowledge/Art/林經堯.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose 23 WebSearch + 16 WebFetch / Stage 2 全文寫作 / Stage 3.5 幻覺審計通過 / Stage 4 format-check ✅ / sync ✅）
- **核心矛盾**（22 字）：「台灣聲響長期缺席的診斷者，以行政者建設機構，同時是 NFT 市場秒殺的藍籌藝術家」
- **Hook**：2019 年 C-LAB 聲響實驗室開幕 Diversonics 場景 + 他的診斷引語「聲音在台灣長期缺席的狀態」→ 矛盾：這個說「存在卻不可見」的人選擇 NFT（確立數位所有權的技術）作為媒介
- **品質**：腳註 8 個（格式 ✅）/ 延伸閱讀 4 篇 / quality-scan ⚠️ 5（lastHumanReview: false）
- **Research**: [reports/research/2026-04/林經堯.md](../../reports/research/2026-04/林經堯.md)
- **關鍵修正（Stage 3.5 發現）**：akaSwap 共同創辦人 claim **已否證** — 創辦人為王新仁 + 洪司丞；林經堯為早期藝術家合作者。未寫入 林經堯.md ✅；⚠️ 王新仁.md line 33 需觀察者確認後更正
- **觸發 handoff**：王新仁.md akaSwap 描述修正（pending 觀察者）

### 黃少雍（製作人）— 2026-04-20 γ 完成（棄生化博班，用電音把母語送上金曲年度專輯）

- **Article**: [knowledge/People/黃少雍.md](../../knowledge/People/黃少雍.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 general-purpose agent 20 WebSearch + 11 WebFetch / Stage 2 全文寫作 / Stage 3 事實鐵三角 / Stage 4 format-check / Stage 5 cross-link 陳建騏+魏如萱+阿爆 三篇回補）
- **核心矛盾**（27 字）：「生化博士班逃兵，用電音把母語送上金曲年度專輯」— 考試院長黃榮村之子 × 30 歲棄台大生化博班 × 派樂黛 10 年 × 2022 金曲最佳編曲（夏子〈fu'is 星星歌〉）× 2020 阿爆《母親的舌頭》年度專輯共製
- **Hook**：2022-07-02 金曲 33 後台那支直笛（anchor 1：製作人得獎 Solo + 盧廣仲台下跟吹 → 同時承載「盧廣仲樂手雇主」+「編曲獎最隱形」+「阿美族語前衛電子」三條線）
- **結構創新**（製作人 subgenre 第二例，繼陳建騏 2026-04-18 θ 之後）：6 個 scene 小標題（後台直笛 / 棄博班 / 派樂黛借名 / 聽不懂歌詞 / 阿美族語電音編曲 / 陳建騏補集對位）+ 1 📝策展人 callout + 1 pull quote
- **verbatim 引語**：10 句直接引語（Blow / 生命力新聞 / KKBOX 王希文對談 / IPCF），另 research pool 25 句可未來再用；黃榮村「要求清楚目標」改為報導轉述（非直接引語 §5c 紀律）
- **敏感素材**（MANIFESTO §5 v2）：無死亡/家庭悲劇；父親黃榮村為公眾人物（前教育部長/現任考試院長），公開已報導資訊，避免簡化為「官二代之作」敘事陷阱
- **品質**：10 腳註 / 約 3,029 中文字 / 破折號 4（≤15 ✓，從首版 13 降下）/「不是 X 是 Y」0（≤3 ✓）/ desc 139（≤160 ✓）/ QS ✅ / format ✅ / wikilink ✅
- **Cross-link 回補**：陳建騏.md + 魏如萱.md + 阿爆.md 三篇延伸閱讀加黃少雍 pointer（雙線聲音邊界、10+ 年合作、MINETJUS 課程）
- **Research**: [reports/research/2026-04/黃少雍.md](../../reports/research/2026-04/黃少雍.md) — 20+11 = 31 calls / 25 verbatim pool / 7 anchor / Second Voices 節標記 Stage 2 擴充方向

### 林宥嘉 — 2026-04-20 ε 完成（EVOLVE）（從 25 分滿分的〈Creep〉，到承認自己不需要完美的 17 年）

- **Article**: [knowledge/People/林宥嘉.md](../../knowledge/People/林宥嘉.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — EVOLVE 模式（Stage 0 舊文素材萃取 + Stage 1 24 WebSearch + 3 WebFetch / Stage 2 全文重寫）
- **核心矛盾**：「他 20 歲就贏了整個台灣，但花了 17 年才敢不做一個完美歌手」— 星光冠軍 → 金曲歌王叩關 3 次全槓 → 腸躁症八年 → 2024《王》自任製作人 → 2025《Apples of Thy Eye》從八年磨一張變一年接一張
- **Hook**：2007-07-06 星光總決賽〈Creep〉25 分滿分冠軍的 scene，回溯整個 17 年從「被製作的歌手」到「自任製作人」的弧線
- **大事實校正**（舊文錯誤）：〈說謊〉施人誠詞/李雙飛曲（舊文未寫）、〈浪費〉陳信延詞/鄭楠曲、〈殘酷月光〉向月娥詞/陳小霞曲、2016《今日營業中》是首次擔任製作統籌（舊文未標時間點）、腸躁症約 2018 發病（「重病 4 年」verbatim 推回）、第七張《Apples of Thy Eye》2025-07-29 已發行（舊文欠缺）、idol 巡迴 2018-2024 共 81 場 30+ 城市
- **敏感素材**（MANIFESTO §5 v2 紀實筆法）：父親胰臟癌只引用 ETtoday 2023-09 公開 verbatim「down 到谷底」，不 reconstruct 內心場景；丁文琪婚姻只用登記/婚禮日期公開事實，不揣測心理
- **verbatim 引語庫**：Blow 吹音樂「假如我是華研，投了這麼多錢」/ VERSE「過去的我很刁鑽，總希望拿出最好的表現」/「把每位夥伴的睡眠健康、情緒狀況考慮進去」/ Blow「什麼是你生命的王？是迷惘、恐懼、完美，或是恨」
- **品質**：16 腳註 / 約 3,500 中文字 / 7 個 scene 小標題 / 2 個📝策展人筆記 callout + 1 pull-quote / 7 首關鍵歌曲 inline YouTube link / 破折號 0（≤15）/「不是 X 是 Y」1（≤3）/ desc 156（≤160 ✓）
- **工具檢查**：quality-scan ✅ 全過、format-check 7/7、wikilink-validate 0 斷裂
- **Cross-link**: 魏如萱（已有反向）/ 張雨生 / 陳建騏 / 鄭宜農 / 台灣綜藝節目 四篇新增反向延伸閱讀
- **Research**: [reports/research/2026-04/林宥嘉.md](../../reports/research/2026-04/林宥嘉.md)
- **⚠️ 待觀察者驗證**：VERSE 引語段落（WebFetch 返回簡體轉繁體，雖 prompt 要 verbatim 但字型轉碼差異視為同文本）；YouTube URL 官方認證（〈殘酷月光〉〈Creep〉星光 live 等為舊存片段）

### 范曉萱 — 2026-04-20 δ 完成（從〈健康歌〉的小魔女到 100% 樂團主唱，拒絕被一個年代定義的三十年）

- **Article**: [knowledge/People/范曉萱.md](../../knowledge/People/范曉萱.md)
- **Pipeline**: REWRITE-PIPELINE v2.18 — NEW 模式（Stage 1 19 WebSearch + 6 WebFetch / Stage 2 full write）
- **核心矛盾**：「從健康歌的小魔女到 100% 樂團的主唱——范曉萱花三十年拒絕被一個年代的模樣定義」
- **Hook**：深夜母親林智娟留下便利貼的場景（切入人物用母親，而非范曉萱本人），再回到 1996 小魔女 → 1998 平頭 → 2001 爵士 → 2004 憂鬱症 → 2007 100% 樂團 → 2010 金曲製作人 → 2025《過客》
- **敏感素材**（MANIFESTO §5 v2 紀實筆法）：憂鬱症與割腕傳言只引用范曉萱本人公開發言（《亂寫》書 + 2019 Yahoo News 訪談 + 2026 styletc 訪談），不 reconstruct 場景；與 Allen 關係只到「維持十多年」公開敘述；「綠髮大媽」媒體語氣反駁不複述
- **品質**：30 腳註 / 約 3,324 中文字 / 7 個 scene 小標題 / 2 個📝策展人筆記 callout / 5 筆中文逐字引語 / 破折號 2（≤15）/「不是 X 是 Y」2（≤3）/ desc 147（≤160 ✓）
- **工具檢查**：quality-scan 0（全過）、format-check 7/7、wikilink-validate 0 斷裂
- **校正**：原任務 prompt 推測「佛朗明哥」元素 19 輪搜尋均無 primary 來源，Stage 1 agent 明確標 unverified，Stage 2 放棄此角度；《流浪神狗人》《青蛇》配樂為他人作品，與范曉萱無關
- **Research**: [reports/research/2026-04/范曉萱.md](../../reports/research/2026-04/范曉萱.md)
- **⚠️ 待人工複驗**：YouTube URL（〈健康歌〉〈我要我們在一起〉〈主人〉三支）metadata 未能透過 WebFetch 驗證官方上傳身份；研究 agent 明確標記

### 柯智棠 — 2026-04-20 β 完成（從 pending 搬，Stage 1-6 commit 時只更新 status 未搬位）

- **Article**: [knowledge/People/柯智棠.md](../../knowledge/People/柯智棠.md)
- **Pipeline**: REWRITE-PIPELINE v2.17/v2.18 — Stage 1-6 completed
- **維護者校準**：原 inbox 類型誤寫「R&B」，實為英倫民謠 / indie folk；無製作人身份紀錄
- **Hook**: 房間裡的七年 + 2024《My Nova》鋼琴重啟 + 2025 金鐘〈神的回信〉
- **Research**: [reports/research/2026-04/柯智棠.md](../../reports/research/2026-04/柯智棠.md)

### Hello Nico — 2026-04-20 α 完成（八年沉默後，「想念舞台了」）

- **Article**: [knowledge/People/Hello-Nico.md](../../knowledge/People/Hello-Nico.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — NEW 模式（Stage 1 24 WebSearch + 6 WebFetch / Stage 2 full write）
- **核心矛盾**：「做音樂最大的困難，是跟自己過不去」—— 2014 年〈花〉爆紅、2016 年金曲新人入圍，之後沉默八年，2024 年以《Plan B》重返
- **Hook**：詹宇庭「想念舞台了」這句話作為 2024 年回歸的開場，回溯整個故事弧線
- **品質**：9 腳註（Grade A, density:156）/ 約 1,400 字 / 5 個 scene 小標題 / desc ≤ 160 ✓
- **Research**: [reports/research/2026-04/Hello-Nico.md](../../reports/research/2026-04/Hello-Nico.md)
- **⚠️ 待觀察者驗證**：YouTube 連結（各首歌 ID 需人工確認）、verbatim 逐字準確性

### 張雨生 — 2026-04-19 γ+β 完成（從偶像到預言家，一場跨越時代的音樂實驗）

- **Article**: [knowledge/People/張雨生.md](../../knowledge/People/張雨生.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — EVOLVE 模式（貢獻者首版 PR #547 by @idlccp1984 / Stage 1 22 WebSearch + 3 WebFetch / Stage 2 full rewrite + 事實大翻修）
- **核心矛盾**：偶像的商業身份與音樂人的實驗心 — 他的一生都在磨合這兩個自己，《口是心非》是第一次真正合一，但車禍截斷了市場回應
- **Hook**：1994《卡拉OK Live‧台北‧我》市場慘澹 vs 後世追認為預言，一張「慘的經典」的倒敘
- **大事實修正**：原文《天天想你》180 萬張為錯，實際 35 萬張（Discogs + 放言專題確認）
- **品質**：9 腳註 / 約 2,800 字 / 7 個 scene 小標題 / 2 處策展人筆記 / desc 148（≤ 160 ✓）
- **Research**: [reports/research/2026-04/張雨生.md](../../reports/research/2026-04/張雨生.md)

### VH（Vast & Hazy）— 2026-04-19 α 完成（出口系樂團十五年方向校準）

- **Article**: [knowledge/People/VH.md](../../knowledge/People/VH.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 (25 WebSearch + 5 WebFetch) / Stage 2 full rewrite
- **核心矛盾**：溫柔路線在政治搖滾主導的 2010 年代逆向崛起 × 三次身份校準（2011 成軍→2014 休團→2017 雙人→2026 易祺轉幕後）
- **Hook**：2026-04-10《邁行》易祺宣布轉幕後作為開場 scene，回溯 15 年軌跡
- **品質**：7 腳註 / 約 2,500 字 / desc ≤ 160 ✓
- **Research**: [reports/research/2026-04/VH.md](../../reports/research/2026-04/VH.md)

### 孫燕姿 — 2026-04-19 排程心跳（第 5 次 auto-heartbeat）完成（從 pending 搬）

- **Article**: [knowledge/People/孫燕姿.md](../../knowledge/People/孫燕姿.md)
- **Pipeline**: 排程 auto-heartbeat Stage 1-5
- **Notes**：Stefanie Sun，新加坡歌手但華語流行音樂重要人物；Taiwan.md 定位斟酌（新加坡人但在台發跡 + 主要市場華語圈）；2023《AI 孫燕姿》現象涵蓋（AI 翻唱她的歌紅爆全網）；2023 台北小巨蛋復出演唱會
- **Research**: [reports/research/2026-04/孫燕姿.md](../../reports/research/2026-04/孫燕姿.md)

### 魏如萱 — 2026-04-18 η 完成（從自然捲主唱「娃娃」到兩座金曲歌后，只想被聽見的二十年）

- **Article**: [knowledge/People/魏如萱.md](../../knowledge/People/魏如萱.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Pass 3 (40+ searches) / Stage 2 full rewrite + 系統性消除「不是X是Y」pattern
- **核心矛盾**：娃娃音作為方法 × 策展式匿名 — 讓聲音比臉更有名，讓作品比人格活得更久
- **結構**：12 個 narrative anchor（先壓壓驚街訪 / 阿嬤四語 / 錄音室偶然 / 蚊子嗡嗡叫 / 娃娃音作為方法 / 陳建騏20年 / Ophelia自白 / 育兒六小時窗口 / 金曲31三位一體 / 珍珠刑 / 從疼痛長出的勇敢 / 不想被認出）
- **品質**：23 腳註 / 約 4,000 字 / desc 157（≤ 160 ✓）/ lastHumanReview: true
- **Research**: [reports/research/2026-04/魏如萱.md](../../reports/research/2026-04/魏如萱.md)

### 鄭宜農 — 2026-04-18 κ 完成（用最陌生的語言寫最誠實的歌 × 2023 金曲台語雙獎）

- **Article**: [knowledge/People/鄭宜農.md](../../knowledge/People/鄭宜農.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Explore agent 30+ WebSearch + 5 WebFetch / Stage 2 full rewrite
- **核心矛盾**：Anchor 1「語言的逃逃相逐」+ Anchor 2「2016→2023 身份與語言七年弧線」融合 — 童年在台北被嘲笑講台語 → 2022 用最陌生的語言寫《水逆》拿金曲雙獎；通過創作難度體現溝通困難本身
- **Hook**：2023-07-01 金曲 34 台語女歌手 + 台語專輯雙獎 verbatim「台語教我低頭」
- **敏感素材處理**（MANIFESTO §5 v2 紀實筆法）：
  - 2016-01-03 Facebook 出櫃 + 同月離婚：只用兩人公開 verbatim，不 reconstruct 心理情境
  - 前夫楊大正（滅火器樂團主唱，**非盧廣仲**——原 ARTICLE-INBOX 條目有誤，已修正）
  - 2023 金曲慶功宴楊大正現身祝賀：只引用公開採訪，不揣測雙方心理
  - 鄭文堂父女關係：用公開專訪 verbatim
- **品質**：4,046 中文字 / 23 腳註來源 / 37 footnote refs / desc 154 ≤ 160 ✓ / em-dash 11 ≤ 15 ✓ / 每 109 字 1 fn（遠超 EDITORIAL ≥300 硬規則）
- **敘事創新**：「創作必須誠實」作為 16 年工作邏輯主線 — 2016 出櫃 + 2022 全台語 + 2023 MeToo 致敬感言共用同一條底層邏輯
- **Cross-link**: 魏如萱 / 阿爆 / 陳建騏 三人互引形成「2020-2023 聲音邊界拓展」人物群
- **Research**: [reports/research/2026-04/鄭宜農.md](../../reports/research/2026-04/鄭宜農.md)

### 阿爆（阿仍仍）— 2026-04-18 ι 完成(族語 future pop × 2020 金曲年度專輯破圈)

- **Article**: [knowledge/People/阿爆.md](../../knowledge/People/阿爆.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Explore agent 30 searches + 5 WebFetch / Stage 2 full rewrite
- **核心矛盾**：**Anchor 1「族語作為 Future Pop 載體」× Anchor 4「從 Sidebar 到 Main Stage」融合** — 2020 金曲 31 年度專輯首次由全族語作品拿下，打破「原住民音樂 = 族群分類 subcategory」結構
- **Hook**：2020-10-03 金曲 31 頒獎台上年度專輯宣布《kinakaian 母親的舌頭》（代表性 scene，非反諷）
- **核心 verbatim**：「不要浪費天賦也不要依賴天賦」(得獎感言) + 「既然有自己的語言可以使用，為什麼不用？」(族語 future pop 核心哲學)
- **敘事結構**：正興部落 → 2003 R&B 雙人組 → 2004-2014 護理師十年 → 2014《東排三聲代》三代古謠 → 2016《vavayan·女人》荒井十一 → 2019《kinakaian》Dizparity 電音 → 2020 金曲 31 + 那屋瓦廠牌
- **敏感素材處理**：族群議題用紀實筆法（MANIFESTO §5 v2）不扁平化為「偏鄉原住民」symbol；母親 2021-02 過世只引用公開事實，不 reconstruct
- **品質**：22 腳註來源 / 4,096 中文字 / 29 footnote refs / desc 160（邊界邊緣）/ em-dash 10 / 每 141 字 1 fn（遠超 EDITORIAL ≥ 300 硬規則）
- **Research**: [reports/research/2026-04/阿爆.md](../../reports/research/2026-04/阿爆.md) — 30 WebSearch + 5 WebFetch / 7 verbatim / 3 second voices / 5 narrative anchor 候選

### 陳建騏 — 2026-04-18 θ 完成(製作人 subgenre 首例)

- **Article**: [knowledge/People/陳建騏.md](../../knowledge/People/陳建騏.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — Stage 1 Explore agent 23 searches + 3 WebFetch / Stage 2 full rewrite
- **核心矛盾**：「不在場的作者」× 「聲音邊界守護者」融合 — 陳建騏三金得主（金曲+金馬+金鐘）但一般人叫不出名字；他為「怪腔怪調」的系統性防禦定義了華語流行音樂 25 年的聲音邊界
- **結構創新**：Taiwan.md 第一個以製作人身份為中心的人物研究（非表演者）
- **品質**：22 腳註 / 4,278 中文字 / desc 159 字 / em-dash 0 / 「不是 X 是 Y」7 處（4,278 字允許 17）
- **Research**: [reports/research/2026-04/陳建騏.md](../../reports/research/2026-04/陳建騏.md) — 23 WebSearch + 3 WebFetch 深度研究，5 個 narrative anchor 候選
- **敏感素材處理**：2015 年出櫃用紀實筆法（MANIFESTO §5 v2），聚焦 15 間獨立音樂廠牌連署婚姻平權事件的集體回應，不 reconstruct 個人揭露情境

### 楊丞琳 — 2026-04-18 δ-late 完成 + ε evolution Pass 3 (Jenny feedback)

- **Article**: [knowledge/People/楊丞琳.md](../../knowledge/People/楊丞琳.md)
- **Pipeline v1**: REWRITE-PIPELINE v2.17.1 — 35+ Stage 1 sources（兩 pass）+ Stage 2 scene 小標題 + YouTube inline × 5 + 事實鐵三角自檢（抓到李榮浩年齡算術錯誤 0.5→1）
- **Pipeline v2 (Evolution Pass 3)**: 2026-04-18 ε 依 @bugnimusic (Jenny) 6 條 feedback 進化：新增 4 個 scene 段（歷年 11 張專輯 × 日文單曲 / 紅磡 2012 倒吊微血管爆裂 9 年 /《荼蘼》2016 A/B 雙線金鐘滑鐵盧 / 長沙浪姐 2 第 3 名 + 沸騰校園 + 了不起舞社 + 歌手 2024）+ 事實鐵三角再驗 5 處 verbatim + 維護者 spot-verify 抓到 Haiku agent 2 處錯（浪姐排名第 3 非第 5 / 日文是 CD2 限定盤非獨立日專）
- **核心矛盾 v2**：每個舞台、每張專輯、每次跨境演出，都是她跟「被誰定義」協商的場——從 Rainie 天氣女孩到自製《曖昧 2025》，從倒吊微血管爆裂到「老娘還是會一直跳下去」，25 年把製作 / 表演 / 身體 / 跨境工作全部一寸一寸奪回
- **敏感素材處理**：900 萬債務用 Rainie 本人公開引語 framing、父親過世細節省略（single_source）、李榮浩以音樂人身份帶過；倒吊後遺症直接用 ETtoday 2022 verbatim（紀實 not 煽情，MANIFESTO §5 v2）
- **Research**: [reports/research/2026-04/楊丞琳.md](../../reports/research/2026-04/楊丞琳.md) — 3 passes 合計 58+ searches

### 凹與山 — 2026-04-18 δ-late 完成

- **Article**: [knowledge/People/凹與山.md](../../knowledge/People/凹與山.md)
- **Pipeline**: REWRITE-PIPELINE v2.17.1 — 25 Stage 1 sources + Stage 2 scene 小標題 + YouTube inline × 5 + MANIFESTO §5 v2 紀實而不煽情首次應用
- **核心矛盾**：兩個科技業上班族用合成器做出她們在辦公室不能說的事
- **敏感素材處理**：摯友過世、陳梅慧致敬均用紀實筆法，不 reconstruct 死亡場景
- **Research**: [reports/research/2026-04/凹與山.md](../../reports/research/2026-04/凹與山.md)

---

_v1.0 | 2026-04-20 γ2 session — 從 ARTICLE-INBOX §Done 拆分，append-only log_
_建立動機：ARTICLE-INBOX 膨脹超過 400 行，Done section 佔近半篇幅；拆檔後 inbox 回到「當下視角」純 intake，本檔承擔「歷史視角」歸檔_
_下次完成文章時 append 到 §Log 最頂（最新在上），ARTICLE-INBOX 對應條目改一行 pointer 註解_
