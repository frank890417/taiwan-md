---
title: '台灣 BIM 與營建科技：政府推十二年的因案制宜，被一個十八個月的 protocol 改寫'
description: '2014 年 5 月 23 日，行政院公共工程委員會掛牌「公共工程運用 BIM 推動平台」，採用「因案制宜、循序漸進」八字方針。十一年又七個月後，一位在東京工作的台灣開發者把名為 REVIT_MCP_study 的倉庫推上 GitHub，七十多顆星、八十多個 fork。中間那十二年，台灣建築業走過了從手繪曬圖到 3D 模型、從個別嘗試到國家標準、從工具升級到職業重定義的長路。'
date: 2026-05-22
category: 'Technology'
tags:
  [
    'Technology',
    'BIM',
    '建築資訊建模',
    '營建科技',
    '建築',
    '數位轉型',
    'Revit',
    'MCP',
    'AI',
    '中鼎工程',
    '台灣世曦',
    '碩濤',
  ]
subcategory: '建築科技'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-22
lastHumanReview: false
readingTime: 22
researchReport: reports/research/2026-05/台灣BIM與營建科技.md
image: '/article-images/technology/freecad-bim-example-2024.webp'
imageCredit: 'Maxwxyz via Wikimedia Commons'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png'
curation: incubating
curationReason: unverified
---

# 台灣 BIM 與營建科技：政府推十二年的因案制宜，被一個十八個月的 protocol 改寫

![FreeCAD 1.0 開源 BIM 工作平台 dark theme 截圖，畫面中央顯示一棟示範建築物的 3D 模型，左側面板列出各專業圖層（結構、機電、外殼），底層工具列為 BIM workbench 專屬指令集，反映 BIM 把建築物資訊系統化的工程數位轉型本質](/article-images/technology/freecad-bim-example-2024.webp)
_FreeCAD 1.0 Dark Theme BIM workbench 示範檔。Photo: Maxwxyz, 2024-10-07. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png)._

> **30 秒概覽：** 2014 年 5 月 23 日，行政院公共工程委員會掛牌「公共工程運用 BIM 推動平台」[^1]，採「因案制宜、循序漸進」原則三階段推動，至今仍未強制[^2]。同一段時間，台灣大學 BIM 研究中心開了第一堂課、台灣建築資訊模型協會掛牌成立[^3]、新北市府發出第一張 BIM 建照、北市都發局公告竣工模型作業規範[^4]、BSI 簽下 Taiwan BIM Task Group MOU[^5]。十一年又七個月後，2025 年 12 月 10 日，一位叫 CHIANG SHUOTAO 的開發者把名為 `REVIT_MCP_study` 的倉庫推上 GitHub，七十三顆星、八十五個 fork[^6]。再四個月，2026 年 4 月，Autodesk 公告 Revit 2027 內建 Model Context Protocol server[^7]。政府推不動的十二年，跟 Anthropic 一個十八個月的 protocol 之間，是台灣營建業從畫圖到系統整合的緩慢職業重定義。

---

## 公共工程委員會的「因案制宜」

2014 年 5 月 23 日，行政院公共工程委員會建構了一個叫「公共工程運用建築資訊建模（BIM）推動平台」的東西[^1]。掛牌那天的八字方針是「**因案制宜、循序漸進**」。

這八個字後來被引用了很多年。

工程會把推動策略分成三階段：第一階段（民國 103 年）「鼓勵及試辦選案」，找非建築類工程的主辦機關進來做試辦案，優先選統包最有利標案；第二階段（104-105 年）「試辦執行與評估」；第三階段「**106 年起推動一定金額以上公共工程運用 BIM 技術**」[^1]。

但「一定金額以上」這個門檻，到 2026 年都沒變成全面強制。工程會反覆強調的措辭是「**由工程主辦機關就較為複雜或規模較大之工程，依個案需求及機關履約管理能力，自行評估是否採用 BIM 技術，而非全面性、強制性規定**」[^2]。

對照組是香港。香港發展局早就強制造價估計 3,000 萬港元以上的工程項目必須採用 BIM[^8]。台灣這邊則是「鼓勵」「試辦」「自行評估」三個動詞輪流出現在每一份白皮書裡。

到搜尋日為止的公開資料顯示，工程會 BIM 平台累計有「超過 60 個工程招標機關使用 BIM 技術，應用標案數超過 120 件」[^2]。這個數字放在台灣每年一萬多件公共工程案中，連塞牙縫都不算。

> **📝 策展人筆記**
> 通行說法是「政府推 BIM 推不動，因為產業跟不上」。這個解釋在敘事上順手，但它把因果搞反了。**真正的順序更接近：政府從 2014 年起就決定不強制 BIM，因為強制等於砸掉一半建築師事務所的飯碗**。因案制宜是一種政治算計：把選擇權留給「具備履約管理能力」的少數機關，其餘的繼續用 AutoCAD，誰都別動誰。

---

## 內政部、台北、新北：三條互不同步的推動軸

公共工程委員會推它的，內政部建築研究所推自己的。

ABRI（內政部建築研究所）從民國 104 年（2015）啟動「**建築資訊整合分享與應用研發推廣計畫**」4 年中程個案計畫，108 年（2019）銜接第二期 4 年計畫[^9]。第二期兩大目標寫得很大：「**建築技術數位升級**」+「**建築數位居住環境**」，後者要把 BIM 跟 GIS、IoT 整合做數位城市[^10]。

但 ABRI 不是建管的執行機關。建管在縣市政府手上。

2014 年，**新北市政府發出第一張以 BIM 模型審核通過的建照**[^11]。同年新北市公布「**新北市公有建築物 BIM 竣工模型資訊交付準則**」。到 2026 年，新北市府的「建築執照電腦輔助查核系統」（bim.ntpc.gov.tw）已經累積了 20 多份完成的 BIM 模型[^11]。

四年後，2018 年 11 月 6 日，**臺北市政府都市發展局公告「臺北市政府都市發展局主辦建築工程建築資訊建模（BIM）竣工模型屬性資料作業規範」**[^4]。北市的規範參考國際 COBie（Construction Operations Building Information Exchange）格式，並納入 104 年內政部建研所及英國的相關規範[^4]。規範要求使用不同 BIM 建模軟體時，必須轉出 **IFC**（Industry Foundation Classes，工業基礎類別，buildingSMART International 制定的開放國際標準，ISO 16739-1：2024）跟 COBie 標準資料繳交[^4][^12]。

> **💡 你知道嗎**
> IFC 屬於一個叫 buildingSMART International 的非營利組織制定的開放國際標準[^12]，跟 Autodesk 或任何單一廠商無關。它的存在邏輯類似於 PDF：讓不同軟體（Revit、ArchiCAD、Tekla、Navisworks）做出來的模型可以無痛交換。**丹麥政府從 2010 年起強制公共建設專案使用 IFC 格式，挪威、芬蘭、新加坡也跟進**[^12]。台灣到 2018 年才從北市府這個地方層級把 IFC 寫進規範。國際標準早走十年，台灣慢慢補上。

中央、北市、新北三條軸線推動的時間點全部不同步。同一座捷運站，可能設計階段用台北捷運工程局的 BIM 規定（被綁進統包契約），建照階段用北市都發局的竣工模型作業規範（COBie 格式），維運階段又落入另一套 facility management 工具裡。

「**目前公部門多數應用 BIM 都屬於設計與施工階段，傳統式與統包式工程之應用情形亦有差異，後續營運管理模式尚採用傳統式做法**」[^13]：這是 ABRI 自己的成果報告寫的。

---

## 萬大線、苗栗站、桃機 T3：BIM 的公共工程登場

2011 年，**台北捷運萬大線首次將 BIM 納入工程設計契約**[^14]。

這是台灣推動 BIM 一個常被引用的「first」事件。萬大線各標段依據合約要求採用 BIM 模式進行捷運站體設計，同時導入建築、結構及機電專業，跨專業整合，**降低設計介面衝突**[^14]。

跟著萬大線的腳步，公共工程一個接一個進來。台北捷運環狀線 Y19 高架車站、新北的多個運動中心、[台灣高鐵](/lifestyle/台灣高鐵/)苗栗新建站、[桃園機場](/lifestyle/桃園機場/)第三航廈、高雄環狀輕軌：每一個案子都有一篇 case study 寫在 ABRI、台大 NTUBIM 或捷運局的內部期刊上。

最被引用的「**數字勝利**」是台灣高鐵苗栗站：開工前三個月導入 BIM，監造團隊從 3D 模型發現多處衝突點，**省下 20% 後續設計變更成本，工地放樣比預定提早兩個月開工**[^15]。

桃園機場第三航廈是另一個 scale 不同的案例。2021 年 3 月，**三星物產與榮工工程組成的團隊以新台幣 445 億元得標 T3 主體航廈土建工程**[^16]。整個 T3 由台灣世曦工程顧問領銜設計（連同 Rogers Stirk Harbour + Partners 跟 Ove Arup and Partners Hong Kong），跨國協作必須仰賴 BIM 模型在不同事務所之間流動：這是台灣世曦在內部訓練教材裡反覆使用的招牌案例[^17]。

> **✦** 萬大線 2011 年第一次把 BIM 寫進契約的那刻，是台灣公共工程史上一個寧靜的分水嶺。從那一天起，台灣的捷運、機場、高鐵、輕軌，再也沒有一個重大公共工程不問「BIM 怎麼做」。

但這些都是「指標案例」。所有指標案例在台灣只有一個共通缺點：**它們是少數**。

---

## 五大工程顧問 + 兩大組織：背後的人

把 BIM 推進公共工程的人有名字，有面孔。

**台灣世曦工程顧問股份有限公司**：2007 年從財團法人中華顧問工程司（CECI，1969 年成立）轉投資成立[^18]。**2010 年率先成立 BIM 整合中心**[^19]，是台灣產業界最早的整合中心之一。近 2,000 名同仁九成具備公路、鐵路、港灣、機場、橋梁、結構、隧道、捷運、建築、機械、電機與系統控制、BIM、ITS、PPP 等相關背景[^19]。

**中興工程顧問**：1970 年成立，1994 年轉型 NPO 後轉投資中興工程顧問股份[^20]。中興後來把 BIM 做成一個叫「**計畫管理資訊系統（PMIS）**」的東西：基於 ISO 19650 通用資料環境（CDE）精神，內含七個主要模組，協助跨專業、跨計畫的資訊整合[^21]。

**永峻工程顧問股份有限公司（EGC）**：1974 年創立。台北 101 跟高雄 85 樓 T&C Tower 的結構設計都是它做的[^22]。**CTBUH（世界高層建築與都市人居學會）把 EGC 列為全球前十大高樓結構顧問之一**[^22]。

學界這邊有兩個關鍵節點：

**國立臺灣大學土木工程資訊模擬與管理研究中心（NTUBIM）**：2011 年成立，主任是土木工程學系**謝尚賢**教授。共同創始的學者**郭榮欽**副教授在 2011 年 12 月寫過一篇〈**BIM 發展 衝擊現行建築體制**〉[^23]，至今是台灣 BIM 學術論述的指標性早期文獻之一。NTUBIM 後來承接 ABRI、公共工程委員會多年委託案，主導台灣的 BIM 協同作業指南、ISO 19650 中文版翻譯。

**台灣建築資訊模型協會（TBIMA）**：前身是 2009 年的台灣 BIM 技術愛好者聚會，2011 年開始籌備，**2012 年 3 月 10 日**正式成立為內政部註冊社團[^3]。協會主要成員來自 2008 年 Autodesk Taiwan 原廠培訓講師：台灣 BIM 民間組織的血脈，直接從 Autodesk 認證講師圈長出來。

> **📝 策展人筆記**
> Taiwan BIM Task Group 在 2018 年 10 月 3 日的 MOU 簽署儀式上[^5]，桌邊坐了五張臉孔：BSI（英國標準協會）台灣、台大 NTUBIM、台灣營建研究院、台灣建築中心、TBIMA。**內政部建研所是「指導單位」而非「簽署單位」**，這個層級安排耐人尋味。它意味著政府承認自己在 BIM 國際標準這件事上，最好讓學界跟民間組織主導，自己退到二線。隔年 BSI 發布的《**ISO 19650 中文版**》[^24] 是一個小小的軟性主權宣示：台灣終於有了自己對國際 BIM 標準的中文官方翻譯。

---

## Revit、ArchiCAD、Tekla：軟體霸權的暗流

![Autodesk Revit 2024 操作畫面截圖，顯示一道簡單的隔間牆連同門窗在三維空間中的物件化呈現，左側為元件屬性面板，右下為平面、立面、剖面三視圖即時同步預覽，反映 BIM 軟體的物件導向建模本質](/article-images/technology/autodesk-revit-2024-bim-objects.webp)
_Autodesk Revit 2024 BIM 元件示範。Photo: DanielDefault, 2024. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Revit_2024.png)._

走進台灣任何一間導入 BIM 的事務所，啟動畫面有 90% 是 Revit。

「**在台灣，90% 的建築師（具備 BIM 設計能力）使用 Revit Architecture**」——這是 ArchiCAD 經銷商在自家網站上寫的數字[^25]。雖然是單一來源的引用，但跟產業認知一致：Revit 在台灣建築設計領域接近壟斷。

ArchiCAD 由匈牙利公司 Graphisoft 開發，在 Mac 跟 Windows 上跑。設計直覺、學習曲線比 Revit 友善，但在台灣使用者明顯較少[^26]。代理商龍庭資訊在台北東區辦過很多場 demo，每次都會聽到設計師說：「我會用 Revit，事務所只有 Revit license。」這就是規模效應的鎖死。

鋼結構領域則是另一條軸線。**Tekla Structures（Trimble 公司產品，前身 XSteel）目前是台灣鋼結構設計的主流軟體**[^27]。Tekla 處理鋼構的能力在台灣的高樓、橋梁、體育館、工廠領域是業界公認。

基礎設施（鐵路、公路、隧道）則往 Bentley Systems 旗下的 MicroStation 系統靠攏[^28]。中鼎、中興、台灣世曦在大型 EPC 統包案、跨國軌道工程上會用 MicroStation 加上 Bentley 的 OpenRoads / OpenBridge。

跑在這些主流軟體上的是 Autodesk 自家的 Dynamo（視覺程式設計）跟開源的 pyRevit（Python 擴充框架）。**2016 年初，Autodesk Taiwan 特地從新加坡請來 Dynamo 研發團隊講師到台灣開課**[^29]，從那之後 Dynamo 在台灣 BIM 工程師圈受到矚目。一個典型場景：機電工程師寫一段 Dynamo 腳本，自動排序所有風管的座標、檢查淨高、生成剖面圖：過去用 CAD 要花一整天的事，現在幾分鐘搞定[^30]。

衝突檢測（clash detection）的舞台則屬於 Autodesk Navisworks。Navisworks Manage 整合了 3D 導航、衝突檢測、報告匯出、4D 進度模擬、5D 估價功能[^31]。台灣的捷運機電工程裡有個專有名詞叫 **CSD / SEM**：CSD（Combined Service Drawing）是機電綜合圖說，SEM（Structure / Electric / Mechanic）是結構機電整合圖說。傳統做法用 CAD 套圖、紙本核對；BIM 時代用 Navisworks 跑碰撞檢查，3D 角度找衝突點[^32]。

「**CSD/SEM 圖面整合**」這六個字，現在掛在台灣 BIM 顧問公司網站上是必備服務。

---

## 中鼎、互助、達欣、大林組：誰在蓋台灣

![2020 年 6 月 21 日上午台北大巨蛋施工現場街景，遠景大巨蛋鋼構鐵皮外殼仍在搭建中，前景一輛 Hino 300 卡車正經過忠孝東路靠近國父紀念館捷運站 5 號出口的斑馬線，反映台北最大型體育場館長達十多年的施工現實與大林組在這個 6.5 萬噸圓形鋼管巨蛋的施工管理角色](/article-images/technology/taipei-dome-construction-cheng-2020.webp)
_台北大巨蛋施工現場，2020-08-16，忠孝東路國父紀念館站 5 號出口。Photo: Cheng-en Cheng, 2020-08-16. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg).\_

撐起台灣大型營建市場的主力，是一群統包工程公司：比建築師事務所更早碰 BIM、更早把它當生產工具。

排第一的是**中鼎工程股份有限公司（CTCI，股票代碼 9933）**。中鼎 1979 年由財團法人中技社與中華開發工業銀行、中央投資公司共同投資成立[^33]：這個成立背景很特殊：中技社（財團法人中國技術服務社）1959 年成立，是一個服務於台灣工業發展的技術轉移機構，1970 年代石化業興盛時，從中油等國營事業手上承擔大量技術顧問工作。1979 年中技社把工程顧問業務分拆出來，就成了中鼎。

中鼎的業務是 **EPC**（Engineering、Procurement、Construction，工程設計／採購／建造一條龍統包）：煉油、石化、化工、電力、鋼鐵、儲運、交通、焚化爐、公共建設及環境工程[^33]。截至 2021 年員工 7,500 人，已在 15 個國家設立分公司／辦事處[^33][^34]。沙烏地阿拉伯 Amine 專案、Saudi Kayan 乙烯裂解爐統包工程、SAMAC MMA and PMMA 統包工程：這些名字串起來，是台灣 EPC 業者過去 20 年的中東足跡[^33]。

2011 年發生了一件改寫中鼎股東結構的事：**日商千代田化工建設取得中鼎工程股權，成為最大股東**[^33]。這是台灣本土最大統包工程公司，現在的最大股東是一家日本化工建設集團。這個冷知識多數人不知道。

> **⚠️ 爭議觀點**
> 中鼎這類大型 EPC 公司的海外工程不是沒有爭議。2017 年中鼎在印度的天然氣處理廠 EPC 案發生重大延遲與呆帳，集團坦承「**國際風控的致命斷層**」[^35]。同一年，國光石化撤案、麥寮六輕居民健康爭議持續發酵，中鼎參與的多項石化案在環境敘事裡都被點名。BIM 在這些大案的工程精度上幫了忙，但精度不會解決土地、勞工、環境的政治問題。

民間建商市場有另外一群名字：**互助營造**「累積完成高科技廠房總樓板面積，國內建廠經驗之最」[^36]；**達欣工程（2535）**被外界視為「**台積電的御用營造廠**」，拿下台積電南科 18P3 FAB 廠上部結構工程訂單[^37]。達欣的 BIM 部門在內部簡報裡寫：「**以 BIM 為基礎工具平台，進行建築專案之開發、規劃、設計、施工相關整合與協調**」[^37]：但這只佔達欣承攬案的一小部分。

外商在台灣有兩家結構性的存在。**台灣大林組營造**是日商 Obayashi 株式会社（蓋東京晴空塔的那家）1989 年在台灣設立的分公司，承造台北 101 全程、台北捷運信義線、桃機 T3、**台北大巨蛋**等[^38]。**大林組台灣分公司官網的「公司概要」頁明確列出「施工圖管理與 BIM 運用」為主要施工管理項目**[^38]。

> **💡 你知道嗎**
> 台北大巨蛋整個鋼構總重 65,000 噸，是全球唯一整個巨蛋都採用圓形鋼管構建[^39]。鋼結構的設計多半在 Tekla Structures 上做出來，再把模型匯入 Navisworks 跟其他專業（機電、消防）做衝突檢測。**沒有 BIM，大巨蛋這種規模的鋼構建案幾乎不可能在不出大錯的情況下完工**——這也是為什麼大林組會把 BIM 寫進公司概要的「主要施工管理項目」清單裡。

---

## 缺工、老化、移工：為什麼非數位轉型不可

把場景拉到一個普通的工地早晨：六點半，工人陸續到場。一半以上是 40 歲以上的「阿公級」師傅。

**新北市政府職災死亡統計顯示，100 多個死亡案例中超過 77% 年齡逾 40 歲**[^40]。這個數字在土木技師圈早已是常識。台灣營造業的勞動力老化已經是現實，不是還在發生的趨勢。

少子化讓年輕人不進營造業。工地條件艱難、薪水沒競爭力、傷亡率高：三件事疊在一起，營造業的徵才壓力越來越大[^40]。勞動部 2024 年同意開放 1.5 萬名營造業移工名額，到 2026 年初已經「**即將核配完畢**」[^41]。

這就是為什麼數位轉型成了營造業非做不可的事。

**BIM 工程師職位需求大、新手起薪 35,000-45,000 元，月薪 50,000+ 職位在 1111 人力銀行有 104 個職缺**[^42]。但「需求大」跟「能用」是兩回事：「**學 BIM 不一定帶來顯著薪資成長，多數人選擇較經濟的學習路徑**」[^43]。BIM 工程師的職涯天花板在哪裡，產業還沒有共識。

更深一層的結構性問題在於：BIM 把建築師從「**畫圖**」這個職業類別拉到「**系統整合者**」這個新類別。工具升級只是表象。

用 AutoCAD 畫圖的建築師，畫的是兩維線條的集合。畫平面、立面、剖面：每張圖各自獨立，改了平面忘了改立面是日常。用 Revit / BIM 的工程師，建的是一個資訊模型：每一條線後面綁著材料、規格、廠商、價格、施工順序、維護週期[^44]。改了平面，立面剖面自動同步。

老建築師看著年輕 BIM 工程師說「這是新一代的事」，背後的真實理由很簡單：**那個職業已經跟他們進入產業時的「建築師」分屬不同行當**。

> **✦** 「BIM 模型常變成外包工作，與實際工程脫節，許多 BIM 中心或團隊解散」[^45]——這是台大 BIM 研究中心自己對台灣 BIM 推動現況的觀察。

---

## USB-C 那樣的 protocol：Anthropic 把 AI 接進 Revit 的那把鑰匙

2024 年 11 月 25 日，Anthropic 開源了一個叫 **Model Context Protocol（MCP）**的東西[^46]。

公告原文寫得很科學：「**MCP is an open standard, open-source framework introduced by Anthropic to standardize the way artificial intelligence (AI) systems like large language models (LLMs) integrate and share data with external tools, systems, and data sources**」[^47]。Anthropic 的解釋更白話：「**Think of MCP like a USB-C port for AI applications**」[^46]：就像 USB-C 統一了設備連接，MCP 想統一 AI 跟資料源、工具的連接協定。

跟著 MCP 公告一起出來的是 Python、TypeScript、C#、Java SDK，加上預建的 MCP servers 串接 Google Drive、Slack、GitHub、Git、Postgres、Puppeteer[^46]。

接下來的事情，速度沒人預料到。

2025 年 12 月 10 日，一位叫 **CHIANG SHUOTAO** 的開發者把名為 `REVIT_MCP_study` 的倉庫推上 GitHub[^48]。倉庫描述只有八個英文字：「LEARN HOW TO BUILD UP YOUR REVIT MCP」。語言分布：**C# 54.2%、JavaScript 18.7%、PowerShell 14.3%、TypeScript 7.0%、HTML 3.3%、Shell 1.2%**[^48]。到 2026 年 5 月，這個個人 repo 累積了 **73 顆星、85 個 fork**[^6]。

碩濤的 GitHub 個人頁地點寫的是「Tokyo」，但 README 跟所有教學文件是繁體中文，內容大量呼應台灣建築業的工作流程。他的周邊倉庫：`CAD_MCP_study`、`NAVISWORK_MCP`、`IFCSH`——構成一個 BIM × MCP × AI 的個人開源實驗系列[^49]。

這個 case 怎麼讀？

不是「台灣有自己的 BIM_MCP」——碩濤的 repo 跟國際的 `mcp-servers-for-revit/revit-mcp`、Autodesk 自己的 Revit 2027 內建 MCP server[^7][^50] 是同一個生態圈的一部分。它的意義在於：**一個台灣開發者，在 Anthropic 公告 MCP 後不到 13 個月，做出一個七十多顆星的開源教學專案，把國際 Revit MCP 的工程實踐接回中文社群**。

四個月後，**2026 年 4 月 Autodesk 公告 Revit 2027 內建 MCP server 跟 Autodesk Assistant**[^7]。新的 Autodesk Assistant 可以做這種事：「**找出所有缺機電標籤的房間**」「**設定 Phase 2 所有門的防火等級為 90 分鐘**」「**生成這個樓層的所有給排水視圖**」[^7]——用自然語言操作 Revit。

過去要學 Revit 一兩年才會的事，現在用中文（或英文）說一句話就做得到。

> **📝 策展人筆記**
> 把時間軸對齊看：2014 年 5 月 23 日工程會 BIM 平台掛牌，到 2024 年 11 月 25 日 Anthropic 開源 MCP，**中間隔了 10 年 6 個月**。台灣政府推 BIM 的這 10 年，從「鼓勵試辦」走到「因案制宜」，從來沒走到強制。從 Anthropic 開源 MCP 到 Autodesk Revit 2027 內建 MCP 公告，**只隔了 17 個月**。技術 platform 改寫產業 onboarding 的速度，遠超過政策推動的速度。**真正的差距在兩種推動模式的結構**——強制推動需要協調幾百個利害關係人、平衡幾十個產業遊說、調整幾條法律；platform 推動只需要把 SDK 開源、把 documentation 寫好。把這個結構看清楚，比抱怨政府或崇拜 AI 都重要。

---

## 從畫圖到系統整合：未完成的職業重定義

把鏡頭推回 1990 年代的建築師事務所。

那時候的事務所牆上掛著製圖桌、T 字尺、針筆、藍曬機。建築師畫平面圖要在 A1 大圖上用針筆描線，畫完一張要送出去藍曬機曬副本——機器嗡嗡作響，藍底白線的曬圖紙從機器另一端慢慢滾出來。改一處要重畫整張。

AutoCAD 1992 年發布 Classic Mac OS 版、1993 年發布 Microsoft Windows 版[^51]，台灣建築師事務所從 1990 年代中期開始大規模轉用 CAD。轉型陣痛持續了大約十年——老建築師抗拒，年輕設計師擁抱，事務所內部分成「在 CAD 上畫」跟「在桌上畫」兩派。

從 AutoCAD 到 Revit 是第二次轉型。**Autodesk 在 2002 年才把 Revit 跟「Building Information Modeling」這個詞推出來**[^52]——也就是說，從手繪到 CAD 跟從 CAD 到 BIM，間隔大約二十年。但 BIM 轉型的陣痛比 CAD 轉型更深，因為這次要求的層級從工具更換升到了**思維模式重組**。

CAD 把你的線條數位化。BIM 要求你把整個建築物的資訊系統化。一面牆變成「2 樓 A 區辦公空間的隔間牆，材質：12mm 雙面石膏板加 75mm 輕鋼骨架，防火時效 1 小時，廠商 XX，造價 YY，施工順序排在機電配管之後」這樣一個資料物件，不再只是兩條平行線。

跨專業整合也跟著變了。傳統流程是建築師畫好圖、結構技師畫好圖、機電技師畫好圖，三套圖最後在工地套圖時發現衝突——一根風管穿過一根樑、一個排水管位置撞到一個結構柱。BIM 流程是在設計階段就在同一個三維模型裡套圖，碰撞檢查、衝突檢討在電腦上完成[^32]。

「**降低設計介面衝突**」這六個字寫進所有台灣 BIM case study 的成效報告裡[^14][^15]。但這六個字背後的職業變化是：建築師、結構技師、機電技師、營造廠四方的權力結構正在重新洗牌。**過去建築師是設計階段的單一作者，BIM 時代的設計是多方協作的系統整合**。

這個職業重定義還沒完成。

> **✦** 「**業主對 BIM 應用缺乏充分認識，常以傳統工程流程作業，限制 BIM 技術效能**」[^53]——這是 BSI 對台灣業主端最直白的觀察。BIM 推不動的瓶頸在業主端，工程師會與不會反而是次要的事。

---

## 接下來的事

2026 年 5 月，BIM 在台灣的處境是這樣的：

- 中央政府推了 12 年，仍然「因案制宜」，沒有全面強制[^2]
- 北市、新北從 2014 / 2018 起在建照層級要求 BIM 模型，但縣市規範各自不同[^4][^11]
- 大型工程顧問（台灣世曦、中興、永峻）跟大型營造（中鼎、互助、達欣、大林組）都在用，BIM 工程師職位需求大[^17][^19][^33][^42]
- 中小型建築師事務所多數仍以 AutoCAD 為主，BIM 普及率推測在個位數百分比[^43][^45]
- Anthropic MCP 2024-11 開源後 17 個月，Autodesk Revit 2027 內建 MCP server 公告[^7][^46]
- 一個台灣開發者寫了 73 顆星的 Revit MCP 教學 repo，把國際生態接回中文社群[^6][^48]

把這六條串起來看，**台灣 BIM 是一個職業正在被技術 platform 從外部重新定義的故事**，距離一個成熟產業的樣子還有距離。政府推動的速度跟不上技術迭代，民間採用的速度跟不上人口老化，台灣的營建業同時被三個力量拉扯：高齡化的傳統從業者、缺工的工地現場、AI × BIM 的新世代工具。

下一個十年，台灣的「建築師」這個職業可能不再是現在這個樣子。畫圖的部分會交給 AI——用一句話「**設定 Phase 2 所有門的防火等級為 90 分鐘**」[^7] 就能改完整個專案的門。建築師的工作會更接近「**系統整合者**」「**業主與技術之間的翻譯者**」「**多方協作的策展人**」。

2014 年 5 月 23 日公共工程委員會 BIM 平台第一次開會時，台灣高鐵苗栗站還沒蓋。2026 年 4 月 Autodesk 公告 Revit 2027 內建 MCP 那天，台積電在高雄的下一座 fab 已經用全 BIM 圖說準備中。十二年的「因案制宜」走到了一個它自己沒預料到的地方——一個從美國加州 Anthropic 辦公室開源出來的 protocol，從 platform 端改寫了整個產業的 onboarding 曲線，繞過了政府強制這條原本的主路。

碩濤 2025 年 12 月把 `REVIT_MCP_study` 推上 GitHub 那天[^48]，距離工程會 BIM 平台掛牌剛好 11 年 7 個月。中間那十二年，台灣建築業走過了從手繪曬圖到 3D 模型、從個別嘗試到國家標準、從工具升級到職業重定義的長路。**這條路沒有走完——但它的下一段路怎麼走，已經不完全在台灣政府手上了**。

---

**延伸閱讀**：

- [台灣建築](/art/台灣建築) — 從石板屋到摩天樓的建築文化敘事，本文是其工程數位化層的姊妹篇
- [社會住宅與居住正義](/society/社會住宅與居住正義) — BIM 在社會住宅維運管理的應用是內政部建研所近年重點計畫
- [台灣企業：台積電](/economy/台灣企業：台積電) — BIM 在台積電廠房的應用是達欣、互助等營造廠的主要實戰場域
- [台灣 AI 發展](/technology/AI發展) — Anthropic MCP 跟 Revit 2027 內建 MCP 是 AI × 產業的具體 case
- [半導體產業](/technology/半導體產業) — fab 廠房工程整體解決方案 + BIM 智慧建廠是半導體聚落擴張的工程基底

## 圖片來源

本文使用 3 張 Wikimedia Commons CC 授權圖片，全部 cache 於 `public/article-images/technology/` 避免熱連結來源伺服器：

- [FreeCAD 1.0 Dark BIM Example](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png) — Photo: Maxwxyz, 2024-10-07, CC BY 4.0（hero 圖：開源 BIM 工具的 3D 模型呈現）
- [Autodesk Revit 2024 物件示範](https://commons.wikimedia.org/wiki/File:Revit_2024.png) — Photo: DanielDefault, 2024, CC BY-SA 4.0（inline 圖：Revit 物件化建模畫面）
- [Taipei Dome and Hino 300 BEM-5593](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg) — Photo: Cheng-en Cheng, 2020-08-16, CC BY-SA 2.0（inline 圖：大巨蛋施工現場 6.5 萬噸鋼構搭建中）

完整媒體授權矩陣紀錄於 [`reports/research/2026-05/台灣BIM與營建科技.md`](../../reports/research/2026-05/台灣BIM與營建科技.md) §媒體授權矩陣三表。

## 參考資料

[^1]: [中華民國行政院公共工程委員會：公共工程運用建築資訊建模（BIM）專區](https://www.pcc.gov.tw/content/index?eid=1345&type=C) — 行政院公共工程委員會官方 BIM 推動平台頁面，記錄 2014 年 5 月 23 日成立、三階段推動策略「鼓勵試辦／試辦執行／106 年起推動一定金額以上公共工程」的官方政策文件。

[^2]: [審計部公共政策網路參與平臺：工程會 BIM 推動策略意見徵集](https://cy.join.gov.tw/policies/detail/8e95c8d6-ce87-4e05-afce-c46a33eb6f89) — 審計部開放討論頁，記錄工程會推動原則為「因案制宜、循序漸進」，非全面強制；累積超過 60 個工程招標機關使用 BIM、應用標案數超過 120 件的官方統計。

[^3]: [台灣建築資訊模型協會（TBIMA）官方網站](https://sites.google.com/view/tbima) — 內政部註冊社團官網，記錄 2009 年聚會起源、2011 年籌備、2012 年 3 月 10 日正式成立、主要成員來自 2008 年 Autodesk Taiwan 原廠培訓講師圈的歷史脈絡。

[^4]: [臺北市政府都市發展局：建築工程 BIM 竣工模型屬性資料作業規範 v2.0](https://udd.gov.taipei/assets/50-10660/Documents/竣工模型屬性資料作業規範v2.0_20181109_new.pdf) — 北市都發局 2018 年 11 月 9 日公告的官方規範，參考 COBie 國際格式、要求轉出 IFC 標準資料的具體規定。

[^5]: [BSI 攜手產官學研簽署「Taiwan BIM Task Group」合作備忘錄](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2018-/october/bsitaiwan-bim-task-group/) — BSI 台灣 2018 年 10 月 3 日 MOU 簽署新聞稿，記錄五個簽署單位（BSI、台大 NTUBIM、台灣營建研究院、台灣建築中心、TBIMA）與內政部建研所指導角色。

[^6]: [shuotao/REVIT_MCP_study GitHub repository](https://github.com/shuotao/REVIT_MCP_study) — CHIANG SHUOTAO（碩濤）個人開源 Revit MCP 教學專案，2025 年 12 月創立，2026 年 5 月累積 73 顆星、85 個 fork，C# 54.2% + JavaScript 18.7% + PowerShell 14.3% 等語言分布。

[^7]: [Autodesk Developer Blog: Revit API Agents, MCP, Copilot and Codex](https://blog.autodesk.io/revit-api-agents-mcp-copilot-and-codex/) — Autodesk 官方開發者部落格 2026 年 4 月公告，Revit 2027 內建 MCP server + Autodesk Assistant 支援自然語言操作 Revit 模型。

[^8]: [ONC Lawyers: BIM 建築信息模擬在建築業界的採用及其法律影響](https://www.onc.hk/zh_HK/publication/adoption-of-bim-and-its-legal-complications-for-the-construction-industry) — 香港律師事務所文章，記錄香港發展局對造價估計 3,000 萬港元以上工程項目強制使用 BIM 的政策對比。

[^9]: [中華民國內政部建築研究所：建築資訊建模 BIM 應用推廣計畫](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=315634) — ABRI 官方計畫頁，記錄 2015 年（民國 104 年）4 年中程計畫與 2019 年（108 年）第二期計畫的目標與範圍。

[^10]: [內政部建研所：我國建築資訊模型（BIM）發展成果應用調查及推動方案研究](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39612) — ABRI 委託研究成果報告，記錄第二期計畫「建築技術數位升級」+「建築數位居住環境」兩大目標及 BIM × GIS × IoT 數位城市整合方向。

[^11]: [新北市政府工務局：建築執照電腦輔助查核系統](https://www.bim.ntpc.gov.tw/) — 新北市府 BIM 建照查核系統官網，記錄 2014 年第一張 BIM 模型建照、20+ 完成 BIM 模型的累積成果與「新北市公有建築物 BIM 竣工模型資訊交付準則」。

[^12]: [buildingSMART International: Industry Foundation Classes (IFC)](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) — buildingSMART International 官網 IFC 標準頁，記錄 ISO 16739-1:2024 國際標準、丹麥 2010 年起強制公共建設使用 IFC 等國際採用情況。

[^13]: [內政部建研所：建築資訊建模 BIM 應用推廣計畫成果報告（112 年）](https://ws.moi.gov.tw/001/Upload/404/relfile/9489/315634/0cccc6e2-2dc6-496f-a45f-69b60e2811b1.pdf) — ABRI 2023 年（民國 112 年）成果報告，承認「公部門多數應用 BIM 屬設計與施工階段，營運管理仍採傳統做法」的官方診斷。

[^14]: [新北市政府捷運工程局：捷運萬大線 BIM 應用](https://www.dorts.ntpc.gov.tw/documentary/articleInfo/P9z2zp0nZrDp?page=216) — 新北市捷運局工程文集記載，台北捷運萬大線是「首個將 BIM 列入契約的公共工程」、降低設計介面衝突的官方記錄。

[^15]: [Flow BIM Service：智慧商辦案例分享](https://bim.flow.tw/smartoffice-globalshowcase/) — 若水國際 BIM 顧問公司案例分享，引用台灣高鐵苗栗站 BIM 應用「省下 20% 設計變更成本、提早兩個月開工」的具體數據。

[^16]: [自由財經：桃機三航廈決標 三星物產與榮工工程團隊以新台幣 445 億元得標](https://ec.ltn.com.tw/article/breakingnews/3414669) — 自由時報 2021 年 3 月新聞稿，記錄桃園機場 T3 主體航廈土建工程決標、三星物產與榮工工程組成團隊的具體細節。

[^17]: [iThome：營造業靠 BIM 實現建築數位分身，台灣世曦案例](https://www.ithome.com.tw/people/137308) — iThome 2021 年深度報導，採訪台灣世曦總工程師林曜滄，記錄世曦的鳳山車站、八卦山隧道等 BIM 全生命週期案例，桃機 T3 跨國協作 BIM 流程。

[^18]: [財團法人中華顧問工程司（CECI）：經典 50 大事記](https://www.ceci.org.tw/modules/article-content.aspx?s=13&i=226) — CECI 官網 50 週年大事記，記錄 1969 年成立、2007 年轉投資成立台灣世曦工程顧問股份有限公司的官方歷史。

[^19]: [台灣世曦工程顧問股份有限公司：公司簡介](https://www.104.com.tw/company/d1w3jw0) — 台灣世曦 104 求職頁面，記錄近 2,000 名同仁九成具備公路、鐵路、機場、橋梁、BIM、ITS、PPP 等專業背景與 2010 年率先成立 BIM 整合中心的官方資訊。

[^20]: [財團法人中興工程顧問社：邁向中興工程 50 週年](https://50th-anniversary.sinotech.org.tw/about_ltd.html) — 中興工程顧問社 50 週年官網，記錄 1970 年成立、1994 年轉型 NPO 後轉投資中興工程顧問股份有限公司的歷史。

[^21]: [Autodesk University：中興工程 BIM 協同作業平台之設計與應用](https://www.autodesk.com/autodesk-university/class/zhongxinggongchengBIMxietongzuoyepingtaizhishejiyuyingyong-2020) — Autodesk University 2020 年技術簡報，記錄中興工程基於 ISO 19650 CDE 環境建置 BIM 議題追蹤模組與 PMIS 七主要模組的技術架構。

[^22]: [永峻工程顧問股份有限公司（Evergreen Consulting Engineering）官網](https://www.egc.com.tw/) — 永峻官網，記錄 1974 年創立、超過 80 位專業人員、台北 101 與高雄 85 樓 T&C Tower 結構設計、CTBUH 全球前十大高樓結構顧問之一的官方資訊。

[^23]: [臺大 BIM 研究中心：BIM 發展 衝擊現行建築體制（郭榮欽 2011.12）](https://www.ntubim.net/bim2356027396/bim-201112) — 台大 NTUBIM 學術論述指標性早期文獻，副教授郭榮欽 2011 年發表的台灣 BIM 學術論述代表作之一。

[^24]: [BSI：為營建業數位化添助力，Taiwan BIM Task Group 發布 BIM 國際標準《ISO 19650 中文版》](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2019/20197/iso-19650-tw-standard-launch/) — BSI 2019 年新聞稿，記錄 ISO 19650 中文版發布、內政部建研所王榮進所長督導、台大 NTUBIM 翻譯協助的具體分工。

[^25]: [BIM-API: PyRevit + Dynamo Scripts](https://www.bim-api.com/en/blog/pyrevit-dynamo-scripts/) — BIM-API 部落格文章，記錄「在台灣 90% 的建築師（具備 BIM 設計能力）使用 Revit Architecture」的產業觀察數字。

[^26]: [龍庭資訊 Graphisoft Archicad 代理商官網](https://www.academicd.com/) — Graphisoft Taiwan 代理商龍庭資訊官網，記錄 ArchiCAD 在台灣的銷售支援與培訓資源，市場定位為「比 Revit 友善的 BIM 軟體」。

[^27]: [BIM Explorer：Tekla Structures 使用經驗分享](https://tpuaup.blogspot.com/2013/05/tekla-structures.html) — BIM 部落格文章，記錄 Tekla Structures 為台灣鋼結構設計主流軟體、處理鋼構複雜結構（體育館、橋梁、廠房）的產業現況。

[^28]: [大塚資訊科技：MicroStation 基礎設施設計](https://www.oitc.com.tw/products-detail/MicroStation/79) — 台灣 Bentley MicroStation 代理商官網，記錄 MicroStation 在台灣鐵路、公路、隧道、橋梁等基礎設施工程的應用範圍。

[^29]: [數位建築學院 BIM+ Studio：Dynamo 建築基礎課程](https://bimstudio.tabc.org.tw/blogs/bim%E7%9F%A5%E8%AD%98%E5%BA%AB/49627) — 台灣建築中心 BIM+ Studio 課程介紹，記錄 2016 年初 Autodesk Taiwan 從新加坡請來 Dynamo 研發團隊講師到台灣開課的關鍵時間點。

[^30]: [WeBIM Services：Dynamo 如何翻轉 Revit 的世界](https://webim.com.tw/en/tech-en/dynamo-application-webim-3/) — WeBIM 技術文章，記錄 Dynamo 在台灣 BIM 工程師圈的具體應用案例（風管座標排序、淨高判斷、剖面圖自動生成）。

[^31]: [Autodesk Navisworks 產品概覽](https://www.quickly.com.tw/autodesk/navisworks.php) — Autodesk 台灣經銷商快克利官網，記錄 Navisworks Manage 整合 3D 導航、衝突檢測、報告匯出、4D 進度模擬、5D 估價的完整功能。

[^32]: [airitiLibrary：BIM 輔助捷運 CSD／SEM 設計自動化發展與應用](https://www.airitilibrary.com/Article/Detail/0257554X-202107-202107290004-202107290004-77-85) — 華藝線上圖書館學術期刊論文，記錄台灣捷運機電工程 CSD（Combined Service Drawing）與 SEM（Structure / Electric / Mechanic）的 BIM 整合方法論。

[^33]: [中鼎集團 - 維基百科](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E9%BC%8E%E9%9B%86%E5%9C%98) — 維基百科中鼎集團條目，記錄 1979 年由中技社與中華開發工業銀行、中央投資公司共同投資成立、2011 年日商千代田化工建設取得最大股東、7,500 員工（2021）、沙烏地阿拉伯 Amine / Saudi Kayan / SAMAC MMA 等海外重大 EPC 案例。

[^34]: [CTCI Group 中鼎集團官方網站](https://www.ctci.com/www/ctci2022/page.aspx?L=CH) — 中鼎工程官方網站，記錄統包工程業務、EPC 模式、15 個國家分公司／辦事處的營業範圍。

[^35]: [換日線：從中鼎海外鉅額呆帳危機，看臺灣統包商「國際風控」的致命斷層](https://crossing.cw.com.tw/article/19832) — 天下換日線深度報導，記錄 2017 年中鼎在印度的天然氣處理廠 EPC 案發生重大延遲與呆帳的爭議事件。

[^36]: [互助營造股份有限公司：高科技廠房業績](https://www.futsu.com.tw/p_hitech.html) — 互助營造官網高科技廠房頁，記錄「累積完成高科技廠房總樓板面積，國內建廠經驗之最」的官方表述。

[^37]: [達欣工程：BIM 經驗](https://www.dacin.com.tw/bim/) — 達欣工程官網 BIM 經驗頁，記錄「以 BIM 為基礎工具平台，進行建築專案之開發、規劃、設計、施工相關整合與協調」的官方表述。

[^38]: [台灣大林組：公司概要](https://www.obayashi.com.tw/topic/about/preview/3250113421819124234) — 台灣大林組營造股份有限公司官網，記錄 1989 年創立、總公司大林組株式会社（建造東京晴空塔）、「施工圖管理與 BIM 運用」為主要施工管理項目的官方資訊。

[^39]: [臺北大巨蛋 - 維基百科](https://zh.wikipedia.org/zh-tw/%E8%87%BA%E5%8C%97%E5%A4%A7%E5%B7%A8%E8%9B%8B) — 維基百科臺北大巨蛋條目，記錄樓地板總面積 12 萬平方公尺、鋼構總重 65,000 噸、全球唯一整個巨蛋採用圓形鋼管構建的工程規格。

[^40]: [聯合新聞網：阿公級勞工撐場 營造業技術面臨斷層](https://udn.com/news/story/124689/9220106) — 聯合新聞網調查報導，記錄新北職災死亡人數 100+ 中逾 40 歲占 77% 的營造業老化現實。

[^41]: [自由電子報：全台大缺工！營造業 1.5 萬名移工名額即將用罄](https://estate.ltn.com.tw/article/21452) — 自由電子報財經報導，記錄 2024-2026 年勞動部同意開放 1.5 萬名營造業移工名額、核配即將完畢的勞動力結構性危機。

[^42]: [1111 人力銀行：BIM 工程師職缺月薪 50,000+ 搜尋結果](https://www.1111.com.tw/search/job?page=1&col=ab&sort=desc&ks=bim,%E7%B9%AA%E5%9C%96&st=1&sa0=50000*) — 1111 人力銀行 BIM 工程師職缺搜尋頁，記錄月薪 50,000+ 職位 104 個、新手起薪 35,000-45,000 元的台灣 BIM 工程師薪資現況。

[^43]: [台灣 BIM 為何難以落地？四個階段揭露真相與轉機](https://engineeringlifetw.com/whynotbim/) — 工地人生部落格深度分析文章，記錄台灣 BIM 推動的文化阻力：「過去政府建管基於 CAD、產業流程跟隨 CAD、BIM 模型變成外包工作、許多 BIM 中心或團隊解散」的具體現實。

[^44]: [Verakey 拓璞工程：BIM 是什麼？5 大 BIM 優點完整分析](https://veracityconsultant.com.tw/what-is-bim/) — Verakey BIM 顧問公司官網，解釋 BIM 把建築物資訊系統化（材料、規格、廠商、價格、施工順序、維護週期）的工程數位轉型本質。

[^45]: [中華民國內政部建築研究所：BIM 應用推廣計畫](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39506) — ABRI 計畫頁，記錄「BIM 模型變成外包工作、與實際工程脫節、許多 BIM 中心或團隊解散」的台灣 BIM 推動現況自我診斷。

[^46]: [Anthropic：Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Anthropic 官方公告 2024 年 11 月 25 日開源 Model Context Protocol（MCP），描述「Think of MCP like a USB-C port for AI applications」與隨之發布的 Python / TypeScript / C# / Java SDK。

[^47]: [Wikipedia: Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol) — 維基百科英文版 MCP 條目，記錄 Anthropic 2024 年 11 月 25 日開源、Anthropic 2025 年 12 月將 MCP 捐給 Agentic AI Foundation（Linux Foundation 下）的完整時間軸。

[^48]: [shuotao GitHub 個人頁](https://github.com/shuotao) — CHIANG SHUOTAO 的 GitHub 個人頁面，記錄位置 Tokyo、周邊 BIM × MCP × AI 開源實驗系列倉庫（CAD_MCP_study、NAVISWORK_MCP、IFCSH 等）。

[^49]: [shuotao/CAD_MCP_study GitHub repository](https://github.com/shuotao/CAD_MCP_study) — 碩濤的 CAD × MCP 開源教學專案，與 REVIT_MCP_study、NAVISWORK_MCP 構成 BIM × MCP × AI 個人開源實驗系列的一部分。

[^50]: [Architosh: Autodesk Revit 2027—Big New AI and Graphics Changes](https://architosh.com/2026/04/autodesk-revit-2027-big-new-ai-and-graphics-changes/) — Architosh 建築軟體專業媒體 2026 年 4 月報導，詳細記錄 Autodesk Revit 2027 內建 MCP server + Autodesk Assistant 的具體功能與架構。

[^51]: [AutoCAD - Wikipedia](https://en.wikipedia.org/wiki/AutoCAD) — 維基百科英文版 AutoCAD 條目，記錄 1982 年 12 月 CP/M 與 IBM PC 平台首發、1992 年 Classic Mac OS 版、1993 年 Microsoft Windows 版的歷史時間軸。

[^52]: [建築資訊模型 - 維基百科](https://zh.wikipedia.org/zh-tw/%E5%BB%BA%E7%AF%89%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9E%8B) — 維基百科繁體中文 BIM 條目，記錄 BIM 1975 年首次提出、1980 年代芬蘭與美國學者研究、2002 年 Autodesk 推出「Building Information Modeling」術語的學術發展史。

[^53]: [BSI 台灣：建築資訊塑模（BIM）的商業價值](https://www.bsigroup.com/zh-TW/insights-and-media/insights/blogs/business-value-of-building-information-modelling-bim/) — BSI 台灣官方部落格，記錄「業主對 BIM 應用缺乏充分認識，常以傳統工程流程作業，導致 BIM 技術的效能受到限制」的對業主端結構問題的觀察。
