---
article: knowledge/Technology/台灣無人機產業.md
stage: 1-research
mode: Evolution（focused section addition）
date: 2026-05-10
session: sad-shockley-626394
agent: main-session（無 sub-agent，直接 WebSearch）
budget: 10 WebSearch + 0 WebFetch
verification:
  high_confidence:
    - 雷虎 Overkill FPV 2025-09-21 通過 Blue UAS Cleared，是台灣首家也是目前唯一進入 Cleared List 的廠商
    - NDAA Section 848（FY-2020）禁止採購含中國關鍵零組件之無人機，covered components = 飛控/收發器/傳輸/相機/雲台/地面控制/軟體/資料儲存
    - 2025-12-03 Blue UAS list 從 DIU 移交給 DCMA（國防合約管理局），新 portal bluelist.dcma.mil；管理單位 US-X Palmdale CA，由空軍上校 Dustin Thomas 領導
    - 截至 2025-11-19，Blue UAS Cleared List 累計 39 個整機平台 + 165 個元件
    - 2026-04 美國參議員 Ted Cruz / John Curtis (R) + Jeff Merkley / Andy Kim (D) 提案 Blue Skies for Taiwan Act of 2026 (S.4259)，要求對台灣廠商建立 Blue UAS 快速通道
    - 雷虎 2025-12-08 宣布參與美陸軍 Drone Dominance Program（11 億美元、四關 gauntlet 篩選、最終約 12 家、首批 3 萬架、目標單價 2,300 美元）
    - 雷虎 2026 Q1 計畫 Ohio 設立組裝廠（符合 Buy American + 縮短交期）
    - 雷虎與 Auterion 2025-06-25 簽 MOU，初期協議涵蓋 25,000 架；中科院 NCSIST 同期跟 Auterion 簽策略夥伴（NCSIST 首次與外國國防科技公司簽約）
    - AeroVironment 2025-09 跟 NCSIST 簽 MOU，初期合作 JUMP 20 / JUMP 20-X VTOL 定翼平台
    - 系統電（5309 Sysgration）2025-09 與 Vantage Robotics 合作推出 Vesper / Trace 兩款符合 Blue UAS / NDAA 的無人機（間接路徑：Taiwan 廠商當已認證美國品牌的供應鏈）
    - 中光電智能機器人（CIRC）為 Teledyne FLIR SIRAS 在台灣製造（payload 整合在美完成）— 同樣間接路徑
    - Taiwan UAV 出口 2026-01-02 兩個月達 85,500 架；產值 2024 NT$5B → 2025 NT$12.9B → 2026 預估 NT$20B
  single_source:
    - Drone Dominance Program 預算 $1.1B 數字（thedefensepost.com / armyrecognition）
    - 雷虎月產 1,000+ 架軍規 UAV 產能（多次自稱數字，未獨立稽核）
    - NT$12 億增資、NT$8 億在嘉義大埔美廠（digitimes 報導，未交叉）
  unverified:
    - DefenseScoop 報導 Blue UAS 對非資料儲存類中國機械零件（馬達等）有 loophole — 政策層論述，非條目級事實
    - 「Blue UAS 通過率」具體數字（雷虎審核花多久 / 駁回率）— 各 source 皆無公開
core_contradiction: 「美國要排除中國，但只給台灣一張入場券」— 認證機制設計與台灣實際准入的落差
---

# Research Report: Blue UAS Cleared List 與台灣廠商（2026 焦點）

> 用途：EVOLVE [knowledge/Technology/台灣無人機產業.md](../../../knowledge/Technology/台灣無人機產業.md)，新增「藍色清單與台灣廠商」專節（取代既有零散提及）。

## 1. 為什麼這篇要做（SC 訊號）

- **2026-05-08 SC 7d**：`blue uas cleared list 台灣廠商 2026` 564 imp / position 8.43 / 0 clicks
- **2026-05-10 SC 7d 放大**：同 query 升至 **751 imp / position 8.8 / 0 clicks**（+33% imp WoW）
- 讀者語意：「想知道哪些台灣廠商在清單上」。事實答案：**目前只有一家（雷虎）**——這個資訊落差本身就是文章的核心矛盾

## 2. Blue UAS 機制的關鍵事實

### 2.1 法源與排除清單

**NDAA FY-2020 Section 848** 是 Blue UAS 的法源母體：禁止國防部採購或操作「在中國製造、或含中國關鍵零組件」的無人機系統[^a1]。

**Covered countries**：原本只列中國；2022 年 NDAA 修法擴及俄羅斯、伊朗、北韓[^a1]。

**Covered critical components**（具名禁止項）：

- 飛控（flight controllers）
- 無線電 / 收發器（radios）
- 資料傳輸裝置（data transmission devices）
- 相機（cameras）
- 雲台（gimbals）
- 地面控制系統（ground control systems）
- 操作軟體（operating software）
- 資料儲存單元（data-storage units）

**漏洞**（DefenseScoop 2025-11-20 揭露）：條文聚焦在「儲存或傳輸資料」的元件，**馬達、被動電子元件等機械類目前未被禁止**。許多 Blue UAS 認證無人機仍含中國馬達[^a2]。

### 2.2 認證流程

申請 Blue UAS 認證需通過四道條件[^a3]：

1. **DoD 贊助方**：必須有國防部單位提出作戰或訓練需求
2. **新能力**：不能跟現有 Blue UAS 產品重疊
3. **NDAA 848 合規**：供應鏈零件無 covered country 來源
4. **資安測試**：通過完整網路安全評估，並承諾持續維護更新

申請通道：DCMA 線上 portal。需提交公司識別、產品說明、軟硬體 BOM、關鍵元件文件、NDAA 自我認證。

### 2.3 行政變動（2025-12-03）

Blue UAS Cleared List 於 2025-12-03 從 DIU（Defense Innovation Unit, Mountain View CA）移交給 **DCMA（Defense Contract Management Agency）**[^a4]。

- 新 portal：**bluelist.dcma.mil**
- 管理單位：US-X（Unmanned Systems–Experimental Command）位於 Palmdale CA
- 領導：空軍上校 Dustin Thomas
- DIU 持續擔任夥伴提供標準與 checklist
- 移交原因：Pete Hegseth 戰部長 2025-07-10 備忘錄訂的「2027 年底達成小型 UAS 領域支配」目標

截至 2025-11-19：Cleared List 含 **39 個整機平台 + 165 個元件**。

## 3. 台灣廠商的三條路徑

### 3.1 直接認證：雷虎科技 Overkill FPV（唯一一家）

**2025-09-21 雷虎 Overkill FPV 自殺無人機系列獲 Blue UAS Cleared 認證**——台灣首家也是截至本研究時點唯一直接進入 Cleared List 的廠商[^a5][^a6]。

關鍵 timeline：

| 時間            | 事件                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 2025-06-25      | 雷虎 + Auterion 簽 MOU；中科院 NCSIST 同期跟 Auterion 簽策略夥伴（NCSIST 首次跟外國國防科技公司簽約）                  |
| 2025-09-21      | Overkill FPV 通過 Blue UAS                                                                                             |
| 2025-10         | AUSA 展（美國陸軍協會）跟 Auterion 共同展位展出「Overkill FPV 飛天刀」                                                 |
| 2025-12-08      | 宣布參與美陸軍 Drone Dominance Program 競標（$1.1B 計畫，4 關 gauntlet 篩選 25 → 12 家，首批 3 萬架，單價目標 $2,300） |
| 2026 Q1（計畫） | 美國 Ohio 設立組裝廠（Buy American compliance + 供應鏈安全 + 縮短交期）                                                |

雷虎自陳產能：台灣軍規 UAV 月產 1,000+ 架；NT$1.2B 增資中 NT$800M 投入嘉義大埔美廠[^a7][^a8]。

**Auterion 整合**：Overkill 採用 Auterion Skynode AI 平台，可在複雜電磁環境下偵測並追蹤 1 公里範圍移動目標[^a9]。雷虎 + Auterion 初期協議覆蓋 25,000 架（含台灣與外銷市場）。

### 3.2 間接路徑：替已認證的美國品牌做台灣製造

未進 Cleared List 但已實質參與美國 Blue UAS 供應鏈的台灣廠商：

- **中光電智能機器人（CIRC）**：替 Teledyne FLIR 製造 SIRAS 四旋翼無人機（Teledyne FLIR Ion M440 在 Cleared List）。設計與製造在台灣，最終 payload 整合與品管在美國完成，符合 NDAA 供應鏈透明度[^a10]
- **系統電（Sysgration, 5309）**：2025-09 與美國 Vantage Robotics 合作推出 Vesper、Trace 兩款符合 Blue UAS / NDAA 的無人機，主攻巡檢與公共安全[^a11]

這條路徑的策略意義：台灣廠商不直接面對 DoD 認證的高門檻，而是當已上榜美國品牌的硬體後援。**「拿不到入場券就賣門票給拿到入場券的人」**。

### 3.3 立法層快速通道：Blue Skies for Taiwan Act of 2026

2026-04 美國參議員 Ted Cruz、John Curtis（共和黨）+ Jeff Merkley、Andy Kim（民主黨）共同提案 **S.4259 Blue Skies for Taiwan Act of 2026**[^a12]：

- 要求國務院協同國防部「為台灣 Blue UAS 廠商建立快速通道（fast-track process）」
- 設立「Blue UAS Working Group」評估台灣產能、辨識整合台製元件進入美國國防供應鏈的機會與障礙
- 與其他區域盟友建立非中國供應鏈合作框架

**這條法案揭露的事實**：截至提案時，台灣廠商實際進入 Blue UAS 的速度被視為「不夠快」——政策需要立法降低門檻。**雷虎花了多久？所有公開報導都沒給準確數字，但 Blue Skies 法案的存在本身就是一份 implicit 自陳**。

## 4. 產業層脈絡（佐證向）

- 台灣 UAV 出口 2026 年 1-2 月達 **85,500 架**（focus.tw 統計）
- 產值軌跡：NT$5B（2024）→ NT$12.9B（2025）→ 預估 NT$20B（2026）
- 中科院 NCSIST 跟 AeroVironment 2025-09 簽 MOU，初期合作 JUMP 20 / JUMP 20-X VTOL 定翼平台與生命週期支援[^a13]
- 國防部 2025-07-23 公告 NT$500 億 / 近 5 萬架軍用商規無人機採購（2026-2027 兩年）[^a14]（既有條目已涵蓋）

## 5. 寫作 framing 建議

**核心矛盾鎖**（≤30 字）：「美國要排除中國，但只給台灣一張入場券」

**敘事邏輯**：

1. 機制本身（NDAA 848 + Blue UAS gate + DCMA 移交）建立讀者基線
2. 雷虎是唯一直接通過——揭示這是稀缺資源不是清單
3. 中光電 / 系統電的間接路徑說明台灣產業已經進入美國國防供應鏈，只是不在「清單」上
4. Blue Skies for Taiwan Act 揭露「速度不夠快」是公開承認的事實
5. 結尾不下定論，留給讀者：這是台灣的機會、還是台灣的天花板？

**避坑**：

- 不要把雷虎個案放大成「台灣無人機產業全面進入美軍」（與事實不符）
- Drone Dominance Program 雷虎只是「宣布參與」，**未得標**——文中要清楚區分 bid vs. award
- Ohio 廠是「計畫 2026 Q1 開」，截至寫作日不確定是否如期

## 6. 整合進既有條目的位置

既有 113 行條目結構：

```
1979 雷虎背景 →（藍色清單一句話帶過）→ 從農田到戰場 → 500 億標案 → 非紅供應鏈 →（藍色清單再被一句話帶過）→ 產業鏈 → 從代工到戰略產業 → 結尾
```

**EVOLVE 動作**：在「非紅供應鏈」段之後、「產業鏈」段之前，**新增一節「藍色清單與三條路徑」**（~50-60 行 + 4-6 個新腳註）。其餘段落保留。

新節骨架：

- §3.1 機制：DIU/NDAA 848 → DCMA（2025-12 移交）的關鍵事實
- §3.2 雷虎的入場券（直接路徑）
- §3.3 中光電 / 系統電（間接路徑）
- §3.4 Blue Skies for Taiwan Act（立法層快速通道）

## 參考資料

[^a1]: [DIU Blue UAS Policy: FY20 NDAA Sec 848 Component Definition Guidance](https://www.diu.mil/blue-uas-policy) — NDAA 848 條文與 covered components 完整清單。

[^a2]: [DefenseScoop: Pentagon's growing list of 'made in America' drones has a loophole for certain parts made in China](https://defensescoop.com/2025/11/20/dod-drones-blue-uas-list-chinese-parts-motors/) — 2025-11-20 報導 NDAA 848 對非資料元件（馬達等）的政策漏洞。

[^a3]: [Mobilicom: What is Blue UAS? The Ultimate Guide to Secure Drone Compliance](https://mobilicom.com/insight/what-is-blue-uas-the-ultimate-guide-to-secure-drone-compliance/) — 認證四要件 + 申請流程綜整。

[^a4]: [DCMA: US-X launches Blue List UAS website](https://www.dcma.mil/News/Article-View/Article/4346752/us-x-launches-blue-list-uas-website/) — 2025-12-03 DIU 正式移交 DCMA + 新 portal bluelist.dcma.mil 上線官方公告。

[^a5]: [中央社：雷虎自殺無人機獲美 Blue UAS 認證 搶攻國內外標案](https://www.cna.com.tw/news/afe/202509220039.aspx) — 2025-09-22 報導台灣首家通過 Blue UAS 認證。

[^a6]: [Aviation Week: Taiwan's Thunder Tiger Eyes U.S. Army's Drone Dominance Program](https://aviationweek.com/defense/aircraft-propulsion/taiwans-thunder-tiger-eyes-us-armys-drone-dominance-program) — 雷虎 Overkill FPV 進入 Blue UAS Cleared List 國際視角報導（既有條目 [^1]）。

[^a7]: [Taiwan News: Taiwan's Thunder Tiger to join US military drone procurement bid](https://www.taiwannews.com.tw/news/6260242) — 2025-12-08 雷虎宣布參與 Drone Dominance Program 細節。

[^a8]: [Digitimes: Thunder Tiger builds US manufacturing base to power China-free drone supply chain](https://www.digitimes.com/news/a20260318PD245/technology-texas-testing-taiwan-2026.html) — Ohio 組裝廠 2026 Q1 計畫 + 嘉義大埔美擴廠。

[^a9]: [工商時報：雷虎與 Auterion 強強結盟 美國 AUSA 展出 OVERKILL FPV 飛天刀](https://www.ctee.com.tw/news/20251015701942-430503) — 2025-10 AUSA 展現場 + Auterion Skynode AI 整合細節。

[^a10]: [聯合新聞網：中光電智能機器人攜手 Teledyne FLIR 優化無人機數據安全](https://udn.com/news/story/7241/7437232) — 中光電 + Teledyne FLIR SIRAS 合作架構。

[^a11]: [經濟日報：系統電攜手 Vantage Robotics 推動智慧無人機應用](https://money.udn.com/money/story/5635/8947968) — 系統電 + Vantage Robotics Vesper / Trace 兩款 Blue UAS / NDAA 合規無人機。

[^a12]: [Taipei Times: US senators introduce bill to boost Taiwan drone cooperation](https://www.taipeitimes.com/News/taiwan/archives/2026/04/03/2003854975) — Blue Skies for Taiwan Act of 2026 (S.4259) 提案內容。

[^a13]: [AeroVironment: AV Signs Strategic Partnership with Taiwan's NCSIST](https://investor.avinc.com/news-releases/news-release-details/av-signs-strategic-partnership-taiwans-national-chung-shan) — 2025-09 AV + NCSIST MOU + JUMP 20 系列。

[^a14]: 既有條目 [^4] 經濟日報 500 億標案。

---

## 媒體授權矩陣（Stage 1.7d 補登 — 2026-05-10 sad-shockley）

### inline 外連（YouTube／影像／音檔）

本次 EVOLVE focused section 不引用具名公開作品（institutional fact 為主），無 inline 外連 manifest。

### 圖片素材

| 媒體檔                            | 用途   | 來源 URL                                                                                           | 授權          | 攝影者/作者 | 拍攝日期   | Wikimedia File                                                  | 本地 cache 路徑                                              | aspect           | size   | alt text                                         |
| --------------------------------- | ------ | -------------------------------------------------------------------------------------------------- | ------------- | ----------- | ---------- | --------------------------------------------------------------- | ------------------------------------------------------------ | ---------------- | ------ | ------------------------------------------------ |
| chung-shyang-ii-uav-2007.jpg      | hero   | https://commons.wikimedia.org/wiki/File:Chung_Shyang_II_UAV.jpg                                    | Public domain | Kliu1       | 2007-10-11 | File:Chung_Shyang_II_UAV.jpg                                    | /article-images/technology/chung-shyang-ii-uav-2007.jpg      | 1.5 (1999×1333)  | 504 KB | 中科院中翔二號無人機 2007 ROC 國慶大會 hero shot |
| uav-9717-zhongzheng-port-2013.jpg | inline | https://commons.wikimedia.org/wiki/File:UAV_9717_Display_at_No.11_Pier_Left_Rear_View_20130504.jpg | CC BY-SA 3.0  | 玄史生      | 2013-05-04 | File:UAV_9717_Display_at_No.11_Pier_Left_Rear_View_20130504.jpg | /article-images/technology/uav-9717-zhongzheng-port-2013.jpg | 1.33 (1500×1125) | 396 KB | 中科院銳鳶 9717 號 2013 中正軍港開放日展示       |

**Aspect ratio 護欄**：兩張皆通過 `bash scripts/tools/check-aspect.sh`（hero 0.9-2.0 / inline 0.75-2.5）。
**File format**：兩張皆 JPEG sRGB / quality 80-85 / 已 resize / 無 EXIF GPS。
**Cache verify**：兩檔皆存在於 `public/article-images/technology/`，無熱連結。

### 引用 transcript

無（本次 EVOLVE 不引 verbatim quote / podcast / 訪談 transcript）。

### Stage 1.7e deliverable 確認

- [x] §媒體授權矩陣 三表完整（inline 外連 N/A / 圖片 2 張 / transcript N/A）
- [x] 圖檔 cache 在 `public/article-images/technology/`
- [x] aspect ratio 護欄通過
- [x] image-health plugin gate hard=0（2026-05-10 16:50 跑通）

### 為什麼 Wikimedia 找不到雷虎 / Overkill / 民間廠商圖

Stage 1.7 search 邊界紀錄供未來補強：

- Wikimedia Commons search「Thunder Tiger drone Taiwan」→ 0 results
- Wikimedia Commons search「Taiwan defense expo drone」→ 0 results
- Wikimedia Commons search「Taiwan UAV military」→ 3 results 全為 NCSIST 國造軍用無人機（中翔 II / 銳鳶 9717 / Guardian）
- 雷虎 Overkill / 中光電 SIRAS / 系統電 Vesper / Trace 在 Commons **皆無圖**
- 雷虎企業官網 product pages 屬企業 IP，可走 fair use editorial commentary scope（per REWRITE-MEDIA §1.7b 第 6/8 點），但本輪用 NCSIST 國造軍用 UAV 已能涵蓋「台灣無人機產業」廣義 hero 視覺需求，未走 fair use 路徑

**未來補強方向**（非本 PR scope）：

1. 中科院 NCSIST 官方 press release 圖庫可能有更多 PD 釋出（如紅雀 II / 騰雲 / 銳鳶 II / 劍翔）— 待 Stage 1.7 補抓
2. 國防部年鑑 / 雙年武器展圖（Taipei Aerospace & Defense Technology Exhibition 2025 / 2026）可能有 PD 或可請示授權
3. 雷虎 / 中光電 / 系統電官方 IR 投資人關係頁的 product hi-res 圖可走 fair use editorial commentary scope（如台積電條目慣例）

🧬
