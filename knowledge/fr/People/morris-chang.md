---
title: 'Morris Chang'
description: 'Le « parrain des semi-conducteurs », fondateur de TSMC, l'entrepreneur légendaire qui a transformé l'industrie technologique mondiale grâce au modèle de fonderie de wafers'
date: 2026-03-17
tags: ['Personnalité', 'Morris Chang', 'TSMC', 'Semi-conducteurs', 'Entrepreneur', 'Fonderie de wafers', 'Bouclier national']
subcategory: '科技與企業'
lastVerified: 2026-03-19
lastHumanReview: false
featured: true
lifeTree:
  protagonist: '張忠謀（Morris Chang）'
  birthYear: 1931
  span: '1931–2018'
  source:
    article: 'knowledge/People/張忠謀.md'
    commit: '2acf410b'
    commitDate: '2026-03-17'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: '原文無 footnote，source 推測基於 §參考資料區（自傳 / TSMC 年報 / 維基 / 工研院 / 清大）+ 公開歷史紀錄。少數心理動機 alternative 標 [推測]。'
  intro: '一個 14 歲流亡到香港、18 歲念哈佛文學、20 歲轉 MIT 工程的中國銀行家之子，54 歲離開美國副總職位回台灣創立台積電。這棵樹列出他每次跨界（地理、技能、商業模式、世代）選的路，也列出他沒選的——從哈佛文學的延續到留美安全路徑到 IDM 模式的延續。'
  themes:
    - id: homeland
      label: '海外 vs 故土'
      color: '#10B981'
    - id: expert-leader
      label: '工程師 vs 管理者'
      color: '#8B5CF6'
    - id: business-model
      label: '自製 vs 代工'
      color: '#F59E0B'
    - id: succession
      label: '在位 vs 傳承'
      color: '#EC4899'
  nodes:
    - id: birth
      year: 1931
      age: 0
      type: given
      theme: homeland
      label: '出生於浙江寧波'
      scene: '父親張蔚觀是銀行家，母親徐韻徵出身書香門第。動盪年代的書香家庭。'
    - id: hong-kong
      year: 1945
      age: 14
      type: choice
      theme: homeland
      scene: '童年在寧波 → 上海 → 南京 → 重慶 → 上海 → 廣州 → 香港之間遷徙。14 歲隨家人定居香港'
      chose:
        label: '在英國殖民教育體系下接受中學教育'
        consequence: '香港的國際化環境與英文訓練，為日後赴美奠定語言與視野基礎。也讓他對「邊緣身份在大國體制內運作」有早期感覺。'
      alternatives:
        - label: '留在中國大陸'
          plausibility: structural
          note: '同代多數家庭沒能跟著遷移到香港。1949 後留在中國的銀行家後代命運與張忠謀完全分流，不會出現在矽谷。'
        - label: '直接赴美'
          plausibility: structural
          note: '少數富裕家庭 1940 年代末就直接送孩子赴美。沒有香港四年，英文與國際化基礎會更弱，哈佛申請會更難。'
    - id: harvard-mit
      year: 1950
      age: 19
      type: choice
      theme: expert-leader
      scene: '1949 年進哈佛念文學。一年後因對文學缺乏熱情、加上經濟考量'
      chose:
        label: '轉學 MIT 機械工程'
        consequence: 'MIT 嚴謹工程教育培養邏輯思維與解決問題能力。1952 拿機械工程學士。這個轉軌是「藝術 → 技術」的關鍵 fork。'
      alternatives:
        - label: '留在哈佛念文學'
          plausibility: speculative
          note: '[推測] 如果留下，可能走學術或文學路徑。完全不會出現半導體事業。但「為什麼一個對文學有興趣的人能在 MIT 工程系成功」這個張力，後來變成他能用人文視角看技術產業的原因。'
        - label: '轉去念商學'
          plausibility: structural
          note: '同代華人留學生有人選哈佛商學院。但少了 engineering hands-on，後來 TI 的技術職位無法擔任，也無法理解半導體製程的精密性。'
    - id: korea-war-civilian
      year: 1952
      age: 21
      type: event
      theme: homeland
      label: 'MIT 畢業遇韓戰，外國學生身份無法進美國軍方相關工作'
      scene: '畢業時正值韓戰期間，國防工業對外籍生關閉。'
    - id: sylvania
      year: 1955
      age: 24
      type: choice
      theme: expert-leader
      scene: '畢業三年後找工作機會'
      chose:
        label: '進希凡尼亞做半導體三年'
        consequence: '首次接觸半導體行業。當時這個產業還在起步階段，但他敏銳察覺巨大潛力。學到半導體製程基礎，也培養對技術細節的關注。'
      alternatives:
        - label: '進其他成熟產業'
          plausibility: structural
          note: '1950 年代的主流選擇是汽車、機械、化工。如果選成熟產業，不會在半導體萌芽期就累積經驗，後來 TI 的機會不會降臨。'
    - id: ti-1958
      year: 1958
      age: 27
      type: choice
      theme: expert-leader
      scene: '德州儀器（TI）正積極發展半導體業務'
      chose:
        label: '加入 TI 從半導體工程師做起'
        consequence: '改善公司製程、提高良率、節省成本。25 年從工程師升到副總，是 TI 改變他一生的舞台。'
      alternatives:
        - label: '留在希凡尼亞'
          plausibility: structural
          note: '希凡尼亞後來逐漸退出半導體領域。如果留下，事業天花板會非常明顯。'
        - label: '創業'
          plausibility: structural
          note: '同期有人選擇離開大公司創業（如 Intel 創辦人 Noyce / Moore 1968 年離開 Fairchild）。但張忠謀走「大公司內部成長」路徑長達 25 年，這個耐性後來反而成為台積電「打長期仗」文化的根。'
    - id: stanford-phd
      year: 1961
      age: 30
      type: choice
      theme: expert-leader
      scene: 'TI 支持他前往史丹佛攻讀電機工程博士'
      chose:
        label: '念博士'
        consequence: '1964 年拿史丹佛 EE PhD。回 TI 後升上重要管理職（鍺、矽電晶體、IC 部門總經理）。技術 + 管理雙軌。'
      alternatives:
        - label: '只當工程師不念博士'
          plausibility: structural
          note: '同代很多工程師不念博士，職涯天花板大致是 senior engineer / staff engineer。對於走技術管理線、後來坐到副總，PhD 是隱形必需品。'
    - id: vp-1972
      year: 1972
      age: 41
      type: choice
      theme: expert-leader
      scene: '在 TI 從工程師一路升上去 14 年後'
      chose:
        label: '升任德儀集團副總經理 + 半導體集團總經理'
        consequence: '當時美國大型企業中最高階的華人高管之一。突破種族天花板。負責 TI 最重要的業務部門。'
      alternatives:
        - label: '跳槽到競爭對手'
          plausibility: structural
          note: '70 年代 Intel / AMD / Motorola 都在搶半導體高管。如果跳槽，可能拿到 CEO 級職位但失去 TI 累積的政治資本與人脈。'
    - id: itri-call
      year: 1985
      age: 54
      type: choice
      theme: homeland
      scene: '工研院董事長徐賢修、行政院長俞國華、政委李國鼎力邀'
      chose:
        label: '回台灣擔任工研院院長'
        consequence: '54 歲，在美國有成功事業與優渥生活。回台是充滿風險的決定。但這是台積電誕生的前提——沒有工研院院長身份，沒有後來的政府支持與股權結構。'
      alternatives:
        - label: '留在美國'
          plausibility: structural
          note: '同代華人高管多數選擇留美直到退休。如果留下，職涯穩定但不會有台積電。台灣半導體產業發展軌跡會完全不同。'
        - label: '回中國大陸'
          plausibility: structural
          note: '1985 年中國改革開放第七年，亦曾邀請海外華人技術領袖。如果選大陸，會被綁進國家半導體計畫（如後來的中芯），路徑與商業模式自由度都不同。'
    - id: tsmc-foundry
      year: 1987
      age: 56
      type: choice
      theme: business-model
      scene: '工研院院長期間，思考一個革命性商業模式'
      chose:
        label: '創立台積電 + 提出「專業晶圓代工」純代工模式'
        consequence: '1987/2/21 成立，初始資本 220 億。打破當時 IDM（整合元件製造商）主流模式。客戶不必投入巨資建廠就能設計晶片。後來重塑全球半導體產業生態，催生 fabless 產業。'
      alternatives:
        - label: '走傳統 IDM 模式（自己設計+製造）'
          plausibility: structural
          note: '當時主流模式（Intel、TI、Motorola 都是 IDM）。如果選 IDM，台積電會跟韓國三星、日本 NEC 同象限競爭，多半會輸。代工模式才是繞過西方 IDM 主場的關鍵。'
        - label: '只做設計不做製造'
          plausibility: structural
          note: '另一個方向：台版 fabless（如後來的聯發科）。但 1987 年台灣設計能力遠不及製造潛力，這條路會起步太晚。'
        - label: '不創公司，留在工研院做政策'
          plausibility: structural
          note: '部分海外回國技術領袖選擇純政策角色。如果如此，台積電不會出現，台灣半導體會多十年才追上韓國。'
    - id: retire-2005
      year: 2005
      age: 74
      type: choice
      theme: succession
      scene: '台積電已是全球代工龍頭'
      chose:
        label: '第一次退休 / 執行長交給蔡力行 / 自己保留董事長'
        consequence: '精心準備的接班計畫。為企業永續發展鋪路。但留住董事長職位讓他保有戰略決策權。'
      alternatives:
        - label: '完全退出'
          plausibility: structural
          note: '完全退休是「乾淨退出」典範（如 Bill Gates 2008 退出微軟日常）。但 2008 金融危機如果張忠謀完全離場，台積電可能找不到回神能力。保留董事長是後來能復出的關鍵。'
    - id: comeback-2009
      year: 2009
      age: 78
      type: choice
      theme: succession
      scene: '2008 全球金融危機重創台積電。業績下滑、競爭加劇'
      chose:
        label: '78 歲復出重新擔任執行長'
        consequence: '穩定市場信心、領導公司度過困難。順便培養劉德音與魏哲家。「老將回鍋救火」的經典案例。'
      alternatives:
        - label: '不復出讓蔡力行硬撐'
          plausibility: structural
          note: '尊重既定接班計畫的另一條路。但金融危機 + 接班人威信不足的雙重壓力，台積電可能失去 28nm 製程的關鍵機會窗。'
    - id: retire-2018
      year: 2018
      age: 87
      type: choice
      theme: succession
      scene: '台積電在他第二輪 9 年領導後達到製程全球領先'
      chose:
        label: '正式退休 + 建立雙首長制（劉德音董事長 / 魏哲家 CEO）'
        consequence: '功成身退典範。雙首長制平衡對外與對內。31 年傳奇生涯結束。被視為企業接班的教科書案例。'
      alternatives:
        - label: '單一接班人'
          plausibility: structural
          note: '美國企業傳統路徑（Apple Cook / Microsoft Nadella 都是單一接班）。但台積電規模 + 兩位接班人都很強，雙首長制避免「兩虎相爭」也讓彼此互補。'
        - label: '繼續任 90 歲'
          plausibility: structural
          note: 'Berkshire Hathaway 巴菲特模式。但張忠謀選擇主動退場，避免「老人政治」的風險，這個自我克制本身是傳承品質的一部分。'
translatedFrom: People/張忠謀.md
sourceCommitSha: 4a5b7958
sourceContentHash: sha256:cd227d8ac5698cc4
translatedAt: 2026-05-02T01:17:16+08:00
---

# Morris Chang

Morris Chang, entrepreneur légendaire surnommé le « parrain des semi-conducteurs », est le fondateur de Taiwan Semiconductor Manufacturing Company (台積電, TSMC). Il a non seulement créé la première fonderie de wafers spécialisée au monde, mais il a aussi inauguré un modèle d'affaires qui a transformé l'écosystème de l'industrie technologique mondiale. De cadre supérieur chez Texas Instruments aux États-Unis à fondateur de TSMC à Taïwan, son parcours personnel retrace l'évolution de l'industrie mondiale des semi-conducteurs et a consolidé la position clé de Taïwan dans la chaîne d'approvisionnement technologique mondiale.

## Vue d'ensemble en 30 secondes

**Pourquoi le monde devrait connaître Morris Chang ?**

TSMC, fondée par Morris Chang, n'est pas seulement la plus grande fonderie de wafers au monde : c'est aussi un pilier fondamental de la civilisation numérique moderne. Des smartphones aux ordinateurs en passant par les puces d'intelligence artificielle, la quasi-totalité des semi-conducteurs avancés de la planète sont fabriqués par TSMC. Son modèle d'affaires de « fonderie pure » a permis à d'innombrables entreprises technologiques de se concentrer sur la conception de puces sans avoir à investir des sommes colossales dans la construction de fonderies, transformant radicalement l'écosystème de l'industrie technologique mondiale.

TSMC est surnommée le « bouclier national » (護國神山) de Taïwan et revêt une importance stratégique majeure sur le plan géopolitique. Morris Chang n'est pas seulement un entrepreneur à succès : il est un innovateur qui a changé le monde. Son histoire est une légende de vision, de persévérance et de sagesse commerciale.

## Jeunesse et formation

### Une enfance dans la tourmente

**Naissance et milieu familial :**
Le 10 juillet 1931, Morris Chang naît à Ningbo, dans la province du Zhejiang, en Chine. Son père, Zhang Weiguan, est banquier et sa mère, Yunzheng Xu, est issue d'une famille de lettrés. En cette époque troublée, une éducation familiale solide lui confère des bases culturelles profondes.

**Une enfance de déplacés :**
En raison de la guerre, l'enfance de Morris Chang est une succession de déménagements : de Ningbo à Shanghai, Nankin, Chongqing, puis de nouveau à Shanghai, Canton, Hong Kong, et enfin aux États-Unis. Cette existence nomade forge sa capacité d'adaptation et lui ouvre une perspective internationale.

**Les années d'études à Hong Kong :**
En 1945, à l'âge de 14 ans, Morris Chang s'installe avec sa famille à Hong Kong, où il poursuit ses études secondaires dans le système éducatif colonial britannique. L'environnement international de Hong Kong et l'enseignement en anglais jettent les bases essentielles de ses futurs études et de sa carrière aux États-Unis.

### Le tournant décisif des études aux États-Unis

**Un bref passage à Harvard :**
En 1949, à 18 ans, Morris Chang entre à l'université Harvard et commence par étudier la littérature. Cependant, un an plus tard, faisant preuve d'un manque d'enthousiasme pour la littérature et pour des raisons financières, il se transfère au Massachusetts Institute of Technology (MIT).

**La formation d'ingénieur au MIT :**
Au MIT, Morris Chang choisit le génie mécanique comme spécialisation. Cette décision, en apparence fortuite, pose les bases de son futur succès dans l'industrie manufacturière. La formation rigoureuse du MIT développe sa pensée logique et sa capacité à résoudre des problèmes.

**L'obtention du diplôme de bachelor en 1952 :**
Morris Chang obtient son diplôme de bachelor en génie mécanique du MIT en 1952. La guerre de Corée bat son plein à cette époque : en tant qu'étudiant étranger, il ne peut accéder aux emplois liés à l'armée américaine. Cette contrainte le redirige vers l'industrie civile.

## Début de carrière : Sylvania

### L'entrée dans l'industrie des semi-conducteurs

**L'opportunité de 1955 :**
Après l'obtention de son diplôme, Morris Chang travaille trois ans chez Sylvania, ce qui constitue son premier contact avec l'industrie des semi-conducteurs. À l'époque, ce secteur en est encore à ses balbutiements, mais Morris Chang perçoit avec acuité l'immense potentiel de cette industrie émergente.

**Le développement de compétences techniques :**
Chez Sylvania, Morris Chang est responsable de la fabrication de dispositifs semi-conducteurs et acquiert les fondamentaux des procédés de fabrication. Cette expérience lui fait comprendre la complexité et la précision de la fabrication des semi-conducteurs, tout en cultivant son souci du détail technique.

**Les premiers signes de talent managérial :**
Même à un poste technique de base, Morris Chang fait preuve de remarquables aptitudes de gestion. Il sait organiser efficacement une équipe et résoudre des problèmes techniques, posant ainsi les bases de sa future carrière de dirigeant.

## L'ère Texas Instruments : l'éclosion du talent de dirigeant

### Le tournant de 1958

**L'arrivée chez Texas Instruments :**
En 1958, Morris Chang rejoint Texas Instruments (TI), le tournant le plus décisif de sa carrière. À cette époque, Texas Instruments développe activement ses activités dans les semi-conducteurs et lui offre une scène idéale pour s'épanouir.

**De l'ingénieur au dirigeant :**
Chez Texas Instruments, Morris Chang commence comme ingénieur en semi-conducteurs, chargé de la production de wafers. Il excelle non seulement sur le plan technique, mais surtout il fait preuve de talents de gestion exceptionnels, attirant rapidement l'attention de sa hiérarchie.

**Les contributions à l'amélioration des procédés :**
Durant ses années chez Texas Instruments, Morris Chang améliore considérablement les procédés de fabrication de semi-conducteurs de l'entreprise, augmentant le rendement des produits et l'efficacité de la production. Ces améliorations techniques permettent à l'entreprise de réaliser d'importantes économies et lui valent une solide réputation.

### Les études à Stanford

**L'opportunité d'études en 1961 :**
En 1961, Texas Instruments soutient Morris Chang dans son projet de doctorat en génie électrique à l'université Stanford. Cette initiative témoigne de la reconnaissance de ses capacités par l'entreprise et illustre l'importance que les entreprises américaines accordent à la formation de leurs talents.

**Les acquis du doctorat :**
En 1964, Morris Chang obtient son doctorat en génie électrique de Stanford. Cela renforce non seulement ses compétences techniques, mais élargit surtout son horizon et son réseau de contacts.

**Un nouveau rôle au sein de l'entreprise :**
Après l'obtention de son doctorat, Morris Chang retourne chez Texas Instruments et accède à des postes de direction plus importants. Il occupe successivement les fonctions de directeur général de la division des transistors au germanium, de la division des transistors au silicium et de la division des circuits intégrés, progressant régulièrement dans sa carrière.

### Le plafond de verre brisé

**Une promotion historique en 1972 :**
En 1972, Morris Chang est promu vice-président du groupe Texas Instruments, devenant l'un des plus hauts dirigeants d'origine chinoise dans une grande entreprise américaine. Cette promotion constitue un exploit extrêmement rare dans le contexte commercial américain de l'époque.

**Directeur général du groupe semi-conducteurs :**
Morris Chang occupe simultanément le poste de directeur général du groupe semi-conducteurs de Texas Instruments, responsable de la division la plus importante de l'entreprise. Sous sa direction, l'activité semi-conducteurs de Texas Instruments se développe rapidement et l'entreprise devient l'un des principaux fournisseurs mondiaux de semi-conducteurs.

**Bilan de 25 ans de carrière aux États-Unis :**
Durant ses 25 ans chez Texas Instruments, Morris Chang gravit tous les échelons, de l'ingénieur de base à la direction générale, accumulant une riche expérience technique et managériale. Plus encore, il acquiert une compréhension approfondie des lois du développement et de la logique commerciale de l'industrie des semi-conducteurs.

## L'appel de Taïwan : la présidence de l'ITRI

### Le tournant de 1985

**L'invitation de Sun Yun-suan :**
En 1985, Morris Chang est invité par Xu Xianxiu, président de l'ITRI (Institut de recherche en technologie industrielle), Yu Guohua, Premier ministre, et Li Kuo-ting, ministre conseiller, à prendre la direction de l'ITRI. Cette décision change le cours de sa vie et transforme le destin de l'industrie technologique taïwanaise.

**Le courage de quitter sa zone de confort :**
À 54 ans, Morris Chang jouit déjà d'une carrière réussie et d'une vie aisée aux États-Unis. Choisir de revenir à Taïwan est une décision pleine de risques et de défis, qui témoigne de son sens des responsabilités envers le développement technologique de Taïwan.

**Les réformes de l'ITRI :**
Durant sa présidence de l'ITRI, Morris Chang promeut activement l'intégration de la R&D et de l'industrie, renforçant la capacité d'innovation technologique de Taïwan. Sa philosophie de gestion et sa vision internationale ouvrent de nouvelles perspectives de développement pour l'ITRI.

### L'évaluation de l'industrie des semi-conducteurs taïwanaise

**L'analyse de l'environnement industriel :**
Morris Chang analyse en profondeur l'environnement industriel et les atouts de Taïwan. Il estime que Taïwan dispose d'ingénieurs talentueux, de coûts compétitifs et d'une capacité de fabrication flexible, des conditions propices au développement de l'industrie de la fabrication de semi-conducteurs.

**La conception du modèle de fonderie :**
Durant son mandat à l'ITRI, Morris Chang commence à réfléchir à un modèle d'affaires révolutionnaire : la fonderie de wafers spécialisée. Cette idée découle de sa compréhension aiguë des tendances industrielles et cristallise ses nombreuses années d'expérience sectorielle.

**L'importance du soutien gouvernemental :**
Morris Chang comprend que le développement de l'industrie des semi-conducteurs nécessite un soutien gouvernemental substantiel, comprenant des investissements financiers, un appui politique et la formation de talents. Il communique activement avec les responsables gouvernementaux pour préparer la création de TSMC.

## La naissance de TSMC : l'innovation de 1987

### L'innovation du modèle de fonderie spécialisée

**La percée du concept de fonderie :**
En 1987, Morris Chang propose le concept innovant de « fonderie de wafers spécialisée ». Contrairement au modèle traditionnel d'IDM (fabricant de composants intégrés), TSMC se concentrera exclusivement sur la fabrication sous contrat de puces pour ses clients, sans concevoir ses propres produits.

**Le caractère révolutionnaire du modèle d'affaires :**
Le caractère révolutionnaire de ce modèle réside dans le fait qu'il permet à de nombreuses entreprises incapables de construire leurs propres fonderies de concevoir des puces avancées, abaissant considérablement la barrière à l'entrée dans l'industrie des semi-conducteurs et stimulant l'essor de l'innovation.

**L'impact sur l'écosystème industriel :**
Le modèle de fonderie spécialisée crée un tout nouvel écosystème industriel : les sociétés de design peuvent se concentrer sur l'innovation, les fonderies sur la fabrication, permettant une division spécialisée du travail qui améliore l'efficacité de l'ensemble du secteur.

### Le processus de création de TSMC

**Le moment historique du 21 février 1987 :**
Le 21 février 1987, Taiwan Semiconductor Manufacturing Company est officiellement fondée, avec un capital initial de 22 milliards de dollars taïwanais. C'est le fruit d'une collaboration entre le gouvernement, des entreprises privées et des investisseurs étrangers.

**La conception de la structure actionnariale :**
La structure actionnariale de TSMC comprend l'ITRI, la société néerlandaise Philips et des entreprises privées taïwanaises. Cette structure actionnariale diversifiée apporte à TSMC des ressources technologiques, financières et commerciales.

**La double fonction de Morris Chang :**
Morris Chang occupe les postes de président et directeur général (plus tard renommé PDG) de TSMC, responsable de la stratégie globale et des opérations quotidiennes de l'entreprise. Son style de leadership allie l'efficacité du management américain à la sagesse de la culture chinoise.

## Le parcours de développement de TSMC

### Les premiers défis et percées

**1987-1990 : la période difficile des débuts :**
TSMC fait face à d'immenses défis dans ses premières années. La fonderie spécialisée est un modèle d'affaires entièrement nouveau, le marché reste sceptique et les clients ont besoin de temps pour accepter ce concept. Morris Chang doit simultanément construire des capacités de fabrication et convaincre les clients.

**L'établissement des capacités techniques :**
La technologie initiale de TSMC provient du transfert de l'ITRI et de la coopération avec Philips. Morris Chang dirige son équipe dans un apprentissage rapide et l'amélioration des procédés de fabrication, établissant ainsi des capacités de fabrication fiables.

**La conquête des premiers clients :**
Les premiers clients de TSMC sont principalement des sociétés fabless (sans usine) américaines. Ces entreprises ont précisément besoin de services de fonderie spécialisés, fournissant ainsi une base commerciale initiale à TSMC.

### Le développement rapide des années 1990

**La stratégie de leadership technologique :**
Dans les années 1990, Morris Chang élabore une stratégie de « leadership technologique », investissant massivement dans la R&D pour garantir que TSMC maintienne une avance en matière de procédés de fabrication. Cette stratégie jette les bases du développement à long terme de l'entreprise.

**L'expansion des capacités et la mondialisation :**
Avec l'augmentation des commandes, TSMC étend activement ses capacités de construction et construit de multiples fonderies à Taïwan. L'entreprise commence également à envisager une implantation mondiale pour se rapprocher de ses principaux clients et marchés.

**La diversification de la clientèle :**
La clientèle de TSMC ne cesse de s'élargir, passant des premières sociétés fabless américaines aux principales sociétés mondiales de conception de semi-conducteurs, notamment Qualcomm, Broadcom, NVIDIA et d'autres entreprises renommées.

### Le leadership au XXIe siècle

**La compétition dans les procédés avancés :**
Au XXIe siècle, le développement de la technologie des procédés de semi-conducteurs devient de plus en plus complexe et coûteux. Grâce à des investissements continus en R&D et à l'innovation technologique, TSMC maintient sa position de leader dans le domaine des procédés avancés.

**Des percées du 28 nm au 5 nm :**
Du 28 nm au 16 nm, au 7 nm, puis au 5 nm et au 3 nm, TSMC conserve son avance technologique à chaque génération de procédés avancés, consolidant sa position sur le marché haut de gamme.

**Le jalon de la coopération avec Apple :**
La relation de coopération avec Apple, notamment la production de processeurs pour l'iPad et l'iPhone, constitue un jalon majeur dans l'histoire de TSMC et renforce considérablement le chiffre d'affaires et la position de marché de l'entreprise.

## Philosophie de gestion et philosophie managériale

### L'engagement envers l'innovation technologique

**L'importance accordée à l'investissement en R&D :**
Morris Chang a toujours souligné l'importance de l'innovation technologique. TSMC consacre chaque année une part significative de son chiffre d'affaires à la R&D, garantissant ainsi son avance technologique. Cette philosophie d'investissement à long terme est un facteur clé du succès de l'entreprise.

**La poursuite de la loi de Moore :**
À une époque où la loi de Moore est remise en question, Morris Chang dirige TSMC dans une avancée continue des procédés de fabrication, prolongeant la vitalité de la loi de Moore et apportant une contribution majeure au développement de l'ensemble de l'industrie des semi-conducteurs.

**L'équilibre entre technologie et marché :**
Morris Chang excelle à trouver l'équilibre entre l'avance technologique et la demande du marché, en maintenant un avantage technologique tout en garantissant la valeur commerciale de la technologie, évitant ainsi un excès d'avance qui entraînerait des coûts prohibitifs.

### La formation des talents et la culture d'entreprise

**Une culture d'entreprise fondée sur l'intégrité :**
Morris Chang a instauré chez TSMC une culture d'entreprise centrée sur l'intégrité et la droiture. Il met l'accent sur les valeurs fondamentales que sont « l'intégrité, l'engagement, l'innovation et la confiance du client », valeurs qui constituent le socle culturel de TSMC.

**L'importance accordée au développement des talents :**
Morris Chang attache une grande importance à la formation et au développement des talents, mettant en place un système complet de formation. Il considère que les talents sont l'actif le plus précieux de l'entreprise et que seule la formation d'individus d'exception permet à une entreprise de se développer durablement.

**Un style de gestion international :**
Morris Chang introduit l'efficacité et la transparence du management américain chez TSMC, établissant une structure moderne de gouvernance d'entreprise. Il y intègre également la sagesse de la culture chinoise, créant ainsi une culture d'entreprise unique.

### La pensée stratégique et l'exécution

**La formulation de stratégies à long terme :**
Morris Chang possède une remarquable capacité de pensée stratégique, capable de discerner les tendances industrielles et d'élaborer des stratégies de développement à long terme. La stratégie de « leadership technologique » de TSMC est l'expression de sa vision stratégique.

**L'importance accordée à l'exécution :**
Outre la formulation stratégique, Morris Chang attache une grande importance à l'exécution. Il a mis en place un système de gestion complet pour garantir la mise en œuvre efficace des stratégies, ce qui est une raison majeure de la croissance continue de TSMC.

**La sagesse dans la gestion des crises :**
Face aux diverses crises et défis, Morris Chang a fait preuve d'un leadership exceptionnel et d'une sagesse remarquable dans la gestion des crises, guidant TSMC à travers de nombreuses périodes difficiles et maintenant le développement stable de l'entreprise.

## Retraite et succession

### La première retraite en 2005

**Le lancement du plan de succession :**
En 2005, à 74 ans, Morris Chang annonce sa retraite et cède le poste de PDG à Rick Tsai. Ce plan de succession, soigneusement préparé, témoigne de son sens des responsabilités envers le développement durable de l'entreprise.

**Le maintien de la présidence :**
Bien qu'il quitte ses fonctions de PDG, Morris Chang conserve son poste de président du conseil d'administration, continuant à participer aux décisions stratégiques majeures de l'entreprise et à fournir orientation et soutien à l'équipe de succession.

**L'organisation de la vie de retraité :**
Après sa retraite, Morris Chang ne se retire pas complètement des activités commerciales. Il participe activement à divers forums et conférences, partageant son expérience et ses perspectives, et contribuant par sa sagesse au développement de l'industrie.

### Le retour en 2009

**Les défis de la crise financière :**
La crise financière mondiale de 2008 frappe durement TSMC, qui fait face à un double défi : baisse des performances et intensification de la concurrence. En cette période critique, Morris Chang décide de revenir.

**Le retour en tant que PDG :**
En 2009, à 78 ans, Morris Chang reprend ses fonctions de PDG de TSMC et dirige personnellement l'entreprise à travers cette période difficile. Son retour stabilise la confiance du marché et fournit le leadership nécessaire à la reprise de l'entreprise.

**La formation de Liu Deyin et Wei Zhejia :**
Durant son second mandat, Morris Chang se concentre sur la formation de successeurs tels que Liu Deyin et Wei Zhejia, préparant ainsi l'avenir de l'entreprise sur le plan des talents.

### La retraite définitive en 2018

**L'achèvement du plan de succession :**
En juin 2018, à 87 ans, Morris Chang prend officiellement sa retraite, mettant fin à sa carrière légendaire de 31 ans chez TSMC. Il cède la présidence du conseil d'administration à Liu Deyin et le poste de PDG à Wei Zhejia.

**L'établissement du système de double direction :**
Morris Chang met en place un « système de double direction » : Liu Deyin, en tant que président, est responsable des relations extérieures, tandis que Wei Zhejia, en tant que PDG, est responsable de la gestion intérieure. Ce dispositif favorise le développement stable de l'entreprise.

**Un modèle de retraite réussie :**
La retraite de Morris Chang est considérée comme un modèle de succession d'entreprise. Il se retire au bon moment, laissant aux nouveaux dirigeants toute la latitude pour s'épanouir, tout en assurant une transition stable pour l'entreprise.

## L'impact sur l'industrie mondiale des semi-conducteurs

### L'innovation du modèle d'affaires

**La généralisation du modèle de fonderie spécialisée :**
Le modèle de fonderie spécialisée créé par Morris Chang est devenu l'un des modèles d'affaires standards de l'industrie des semi-conducteurs. Plusieurs centaines de sociétés fabless dans le monde dépendent des services de fonderies, et ce modèle a considérablement stimulé le développement du secteur.

**La refonte de l'écosystème industriel :**
Le modèle de fonderie spécialisée a refondu l'écosystème de l'industrie des semi-conducteurs, favorisant la division spécialisée du travail, améliorant l'efficacité du secteur et abaissant les barrières à l'innovation, permettant à davantage d'entreprises de participer à la conception de puces.

**L'établissement d'une chaîne d'approvisionnement mondiale :**
TSMC est devenue un nœud clé de la chaîne d'approvisionnement mondiale en semi-conducteurs, fournissant des services de fabrication aux entreprises technologiques du monde entier et établissant une véritable chaîne d'approvisionnement mondialisée pour l'industrie des semi-conducteurs.

### La promotion du progrès technologique

**Le leadership en matière de procédés de fabrication :**
Sous la direction de Morris Chang, TSMC a maintenu une position de leadership mondial en matière de procédés de fabrication, stimulant le progrès technologique de l'ensemble de l'industrie des semi-conducteurs et prolongeant la vitalité de la loi de Moore.

**La démocratisation des procédés avancés :**
Les services de procédés avancés de TSMC permettent même aux petites entreprises d'accéder aux technologies les plus récentes, réalisant ainsi une « démocratisation » des procédés avancés et stimulant l'essor de l'innovation.

**L'exploration de nouveaux domaines technologiques :**
Des puces numériques traditionnelles aux puces d'intelligence artificielle, de l'électronique grand public à l'électronique automobile, TSMC fournit un soutien à la fabrication pour divers domaines technologiques émergents, favorisant l'application de l'innovation technologique.

## La signification pour Taïwan : le fondateur de l'île technologique

### Le développement de l'industrie technologique

**L'établissement du « bouclier national » :**
TSMC est surnommée le « bouclier national » (護國神山) de Taïwan, non seulement en raison de sa valeur économique considérable, mais aussi en raison de sa position clé dans la chaîne d'approvisionnement technologique mondiale. Morris Chang a doté Taïwan d'un actif stratégique majeur.

**La formation de talents technologiques :**
Le développement de TSMC a permis de former un grand nombre de professionnels des semi-conducteurs. Ces talents soutiennent non seulement le développement de TSMC, mais constituent aussi un vivier de compétences pour l'ensemble de l'industrie technologique taïwanaise.

**La formation d'un pôle industriel :**
Autour de TSMC, Taïwan a développé un pôle industriel complet de semi-conducteurs, comprenant des fournisseurs d'équipements, des fournisseurs de matériaux, des usines d'encapsulation et de test, créant ainsi une immense valeur industrielle.

### La contribution au développement économique

**Une contribution majeure au PIB :**
TSMC est devenue la plus grande entreprise de Taïwan et sa contribution au PIB est considérable. Le succès de l'entreprise a également stimulé le développement des industries connexes et créé de nombreux emplois.

**Un pilier du commerce d'exportation :**
Les semi-conducteurs sont devenus le premier produit d'exportation de Taïwan. Le succès de TSMC a considérablement renforcé la position de Taïwan dans le commerce mondial et accru la compétitivité de l'économie taïwanaise.

**L'amélioration de l'environnement d'investissement :**
L'exemple de succès de TSMC a attiré davantage d'investissements internationaux, amélioré l'environnement d'investissement à Taïwan et renforcé la réputation de Taïwan auprès des investisseurs mondiaux.

### L'impact géopolitique

**L'importance de la souveraineté technologique :**
Dans le contexte géopolitique actuel, l'importance de la technologie des semi-conducteurs ne cesse de croître. La présence de TSMC renforce l'importance et l'influence de Taïwan sur la scène internationale.

**Un atout dans les relations internationales :**
La position clé de TSMC dans la chaîne d'approvisionnement technologique mondiale constitue un atout majeur pour Taïwan dans les relations internationales et renforce son influence mondiale.

**Les considérations de stratégie de sécurité :**
L'importance accordée par les pays à la technologie des semi-conducteurs expose également Taïwan à de nouveaux défis et opportunités en matière de sécurité. Trouver un équilibre entre les intérêts de toutes les parties et maintenir l'avantage concurrentiel de TSMC constitue une considération stratégique majeure.

## Qualités personnelles et style de leadership

### La combinaison de vision et d'exécution

**Une vision stratégique exceptionnelle :**
La plus grande qualité de Morris Chang est sa vision stratégique exceptionnelle. Il est capable de discerner les tendances industrielles et de prévoir les orientations futures du développement. Cette vision est un facteur clé du succès de TSMC.

**Une capacité d'exécution pragmatique :**
Outre sa vision, Morris Chang possède également une remarquable capacité d'exécution. Il sait transformer des concepts stratégiques en plans d'action concrets et en garantir la mise en œuvre efficace. Cette combinaison de pensée stratégique et de capacité d'exécution est extrêmement rare.

**Un esprit d'apprentissage continu :**
Même à un âge avancé, Morris Chang conserve un esprit d'apprentissage continu, restant attentif aux derniers développements de l'industrie. Cette attitude d'apprentissage lui permet de toujours maintenir la perspicacité de sa pensée et l'exactitude de ses jugements.

### Les caractéristiques de son style de leadership

**Un leadership charismatique :**
Morris Chang possède un charisme personnel et un pouvoir de persuasion considérables, capables d'inspirer les équipes à œuvrer pour des objectifs communs. Ses discours et ses articles expriment toujours des concepts complexes avec clarté, lui valant le profond respect des employés et des professionnels du secteur.

**L'attachement à la prise de décision rationnelle :**
Face aux décisions majeures, Morris Chang s'en tient toujours à une analyse rationnelle, basant ses jugements sur des faits et des données, évitant que des considérations émotionnelles ou politiques n'affectent la justesse de ses décisions.

**La pratique de la pensée à long terme :**
Morris Chang adhère toujours à une vision à long terme, sans se laisser influencer par les difficultés ou les intérêts à court terme. Cette perspective à long terme permet à TSMC de maintenir un avantage concurrentiel durable dans l'industrie hautement compétitive des semi-conducteurs.

## Distinctions et reconnaissance

### Prix et reconnaissance internationaux

**La médaille d'honneur de l'IEEE :**
Morris Chang a reçu plusieurs médailles d'honneur de l'IEEE (Institute of Electrical and Electronics Engineers), en reconnaissance de sa contribution majeure au développement de la technologie des semi-conducteurs.

**Des doctorats honoris causa :**
De nombreuses universités prestigieuses, dont Stanford, MIT et l'université Tsinghua, ont décerné à Morris Chang des doctorats honoris causa en reconnaissance de sa contribution à l'industrie technologique et à l'éducation.

**Les classements des magazines économiques :**
Morris Chang a été à plusieurs reprises désigné par des magazines économiques internationaux tels que _Fortune_ et _BusinessWeek_ comme l'un des dirigeants d'entreprise les plus influents au monde, confirmant ainsi sa position dans le monde des affaires international.

### Les honneurs à Taïwan

**Les distinctions gouvernementales :**
Le gouvernement taïwanais a décerné à Morris Chang plusieurs distinctions majeures en reconnaissance de sa contribution exceptionnelle au développement économique et au progrès technologique de Taïwan.

**Le respect du monde industriel :**
Morris Chang est vénéré par le monde industriel taïwanais comme le « parrain des semi-conducteurs ». Son expérience et sa sagesse servent de modèle aux entrepreneurs de la génération suivante.

**La reconnaissance de l'influence sociale :**
Outre ses réalisations commerciales, l'influence sociale de Morris Chang est largement reconnue. Sa contribution au développement de la société taïwanaise est hautement appréciée par tous les secteurs.

## Réflexions philosophique et sagesse de vie

### Sa conception du succès

**La combinaison de compétence et d'opportunité :**
Morris Chang estime que le succès nécessite la combinaison de compétences et d'opportunités. Les compétences sont le fondement, mais il faut aussi saisir le moment opportun. Il souligne l'importance de la préparation : les opportunités sont toujours réservées à ceux qui s'y sont préparés.

**La valeur de la persévérance à long terme :**
Il insiste sur l'importance de la persévérance à long terme, estimant que le véritable succès exige une accumulation de temps et qu'il ne faut pas chercher à obtenir des résultats rapides. Le succès de TSMC est le fruit d'une persévérance de longue haleine.

**La nécessité de l'innovation continue :**
Morris Chang considère que dans l'industrie technologique, l'innovation continue est une condition nécessaire à la survie. Les entreprises doivent investir sans relâche dans l'innovation pour maintenir leur compétitivité.

### Ses réflexions sur la vie

**L'équilibre entre vie professionnelle et vie personnelle :**
Bien que sa carrière soit couronnée de succès, Morris Chang souligne également l'importance de l'équilibre entre vie professionnelle et vie personnelle. Il aime lire et écouter de la musique, des loisirs qui nourrissent son esprit.

**L'assomption de la responsabilité sociale :**
Morris Chang estime que les entrepreneurs qui ont réussi ont la responsabilité de donner en retour à la société. Il participe activement aux domaines de l'éducation et de la philanthropie, contribuant ainsi au développement social.

**L'importance de la transmission :**
Il attache une grande importance à la transmission du savoir et de l'expérience, non seulement en formant des successeurs au sein de l'entreprise, mais aussi en partageant son expérience et sa sagesse par divers canaux.

## La légende se poursuit

L'histoire de Morris Chang est une légende de vision, de persévérance et d'innovation. De l'adolescent en temps de guerre au dirigeant d'entreprise américaine, puis au fondateur de TSMC, son parcours personnel témoigne des bouleversements de son époque et a écrit l'histoire. Il n'a pas seulement bâti une entreprise exceptionnelle : surtout, il a transformé la trajectoire de développement de tout un secteur et influencé la vie d'innombrables personnes.

TSMC est surnommée le « bouclier national », mais Morris Chang lui-même n'est-il pas un « trésor national » de Taïwan ? Son succès n'appartient pas seulement à Taïwan, mais au monde entier. À l'époque du développement rapide des technologies, le modèle d'affaires et la culture d'entreprise qu'il a créés continuent de jouer un rôle essentiel et d'influencer une nouvelle génération d'entrepreneurs et d'ingénieurs.

La légende de Morris Chang se poursuit. Bien qu'il ait pris sa retraite, l'entreprise qu'il a bâtie et la richesse spirituelle qu'il a léguée continueront d'influencer le monde. À l'époque du développement rapide des nouvelles technologies telles que l'intelligence artificielle, la 5G et l'Internet des objets, l'importance des semi-conducteurs est plus cruciale que jamais. En tant que leader mondial de la fabrication de semi-conducteurs, TSMC continuera de jouer un rôle clé dans la promotion du progrès technologique.

Telle est la légende de Morris Chang — une histoire de rêve devenu réalité, une histoire de la façon dont on peut changer le monde.

---

_Références :_

- [Autobiographie de Morris Chang (volumes 1 et 2)](https://www.books.com.tw/products/0010784799)
- [Rapports annuels et documents officiels de TSMC](https://investor.tsmc.com/english/annual-reports)
- [Institut de recherche en technologie industrielle (ITRI)](https://www.itri.org.tw/)
- [Article Wikipédia « Morris Chang »](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [Documents relatifs à Morris Chang de l'université nationale Tsinghua](https://www.nthu.edu.tw/)
