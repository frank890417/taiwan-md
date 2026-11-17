---
title: 'Morris Chang: Der „Vater des Halbleiters“ – Unternehmer, der die globale Technologieindustrie mit dem Wafer-Foundry-Modell revolutionierte'
description: 'Der legendäre Unternehmer Morris Chang (Chiang Kai-shek), Gründer von TSMC, der durch das reine Auftragsfertigungsmodell die weltweite Hightech-Industrie neu gestaltete.'
date: 2026-03-17
category: 'People'
tags:
  [
    'Personen',
    'Morris Chang',
    'TSMC',
    'Halbleiter',
    'Unternehmer',
    'Wafer-Foundry',
    'SchutzschildTaiwan',
  ]
subcategory: '科技與企業'
author: 'Taiwan.md Contributors'
featured: true
lastVerified: 2026-09-18
lastHumanReview: false
lifeTree:
  protagonist: '張忠謀（Morris Chang）'
  birthYear: 1931
  span: '1931–'
  source:
    article: 'knowledge/People/張忠謀.md'
    commit: '2acf410b'
    commitDate: '2026-03-17'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: '原文無 footnote，source 推測基於 §參考資料區（自傳 / TSMC 年報 / 維基 / 工研院 / 清大）+ 公開歷史紀錄。少數心理動機 alternative 標 [推測]。'
  intro: '一個 17 歲流亡到香港、18 歲進哈佛、19 歲轉 MIT 工程的中國銀行家之子，54 歲離開美國副總職位回台灣創立台積電。這棵樹列出他每次跨界（地理、技能、商業模式、世代）選的路，也列出他沒選的——從哈佛文學的延續到留美安全路徑到 IDM 模式的延續。'
  themes:
    - id: 'homeland'
      label: '海外 vs 故土'
      color: '#10B981'
    - id: 'expert-leader'
      label: '工程師 vs 管理者'
      color: '#8B5CF6'
    - id: 'business-model'
      label: '自製 vs 代工'
      color: '#F59E0B'
    - id: 'succession'
      label: '在位 vs 傳承'
      color: '#EC4899'
  nodes:
    - id: 'birth'
      year: 1931
      age: 0
      type: 'given'
      theme: 'homeland'
      label: '出生於浙江寧波'
      scene: '父親張蔚觀是銀行家，母親徐君偉出身書香門第。動盪年代的書香家庭。'
    - id: 'hong-kong'
      year: 1948
      age: 17
      type: 'choice'
      theme: 'homeland'
      scene: '童年在寧波 → 南京 → 廣州 → 香港 → 重慶 → 上海 → 香港之間遷徙。1948 年國共內戰，17 歲隨家人再度遷往香港'
      chose:
        label: '從香港赴美求學'
        consequence: '中學讀的是重慶南開與上海南洋模範；1949 年從香港赴美進哈佛。少年時代一路遷徙，讓他對「邊緣身份在大國體制內運作」有早期感覺。'
      alternatives:
        - label: '留在中國大陸'
          plausibility: 'structural'
          note: '同代多數家庭沒能跟著遷移到香港。1949 後留在中國的銀行家後代命運與張忠謀完全分流，不會出現在矽谷。'
        - label: '直接赴美'
          plausibility: 'structural'
          note: '少數富裕家庭 1940 年代末就直接送孩子赴美。沒有香港四年，英文與國際化基礎會更弱，哈佛申請會更難。'
    - id: 'harvard-mit'
      year: 1950
      age: 19
      type: 'choice'
      theme: 'expert-leader'
      scene: '1949 年進哈佛念文學。一年後因對文學缺乏熱情、加上經濟考量'
      chose:
        label: '轉學 MIT 機械工程'
        consequence: 'MIT 嚴謹工程教育培養邏輯思維與解決問題能力。1952 拿機械工程學士。這個轉軌是「藝術 → 技術」的關鍵 fork。'
      alternatives:
        - label: '留在哈佛念文學'
          plausibility: 'speculative'
          note: '[推測] 如果留下，可能走學術或文學路徑。完全不會出現半導體事業。但「為什麼一個對文學有興趣的人能在 MIT 工程系成功」這個張力，後來變成他能用人文視角看技術產業的原因。'
        - label: '轉去念商學'
          plausibility: 'structural'
          note: '同代華人留學生有人選哈佛商學院。但少了 engineering hands-on，後來 TI 的技術職位無法擔任，也無法理解半導體製程的精密性。'
    - id: 'korea-war-civilian'
      year: 1952
      age: 21
      type: 'event'
      theme: 'homeland'
      label: 'MIT 畢業遇韓戰，外國學生身份無法進美國軍方相關工作'
      scene: '畢業時正值韓戰期間，國防工業對外籍生關閉。'
    - id: 'sylvania'
      year: 1955
      age: 24
      type: 'choice'
      theme: 'expert-leader'
      scene: '畢業三年後找工作機會'
      chose:
        label: '進希凡尼亞做半導體三年'
        consequence: '首次接觸半導體行業。當時這個產業還在起步階段，但他敏銳察覺巨大潛力。學到半導體製程基礎，也培養對技術細節的關注。'
      alternatives:
        - label: '進其他成熟產業'
          plausibility: 'structural'
          note: '1950 年代的主流選擇是汽車、機械、化工。如果選成熟產業，不會在半導體萌芽期就累積經驗，後來 TI 的機會不會降臨。'
    - id: 'ti-1958'
      year: 1958
      age: 27
      type: 'choice'
      theme: 'expert-leader'
      scene: '德州儀器（TI）正積極發展半導體業務'
      chose:
        label: '加入 TI 從半導體工程師做起'
        consequence: '改善公司製程、提高良率、節省成本。25 年從工程師升到副總，是 TI 改變他一生的舞台。'
      alternatives:
        - label: '留在希凡尼亞'
          plausibility: 'structural'
          note: '希凡尼亞後來逐漸退出半導體領域。如果留下，事業天花板會非常明顯。'
        - label: '創業'
          plausibility: 'structural'
          note: '同期有人選擇離開大公司創業（如 Intel 創辦人 Noyce / Moore 1968 年離開 Fairchild）。但張忠謀走「大公司內部成長」路徑長達 25 年，這個耐性後來反而成為台積電「打長期仗」文化的根。'
    - id: 'stanford-phd'
      year: 1961
      age: 30
      type: 'choice'
      theme: 'expert-leader'
      scene: 'TI 支持他前往史丹佛攻讀電機工程博士'
      chose:
        label: '念博士'
        consequence: '1964 年拿史丹佛 EE PhD。回 TI 後升上重要管理職（鍺、矽電晶體、IC 部門總經理）。技術 + 管理雙軌。'
      alternatives:
        - label: '只當工程師不念博士'
          plausibility: 'structural'
          note: '同代很多工程師不念博士，職涯天花板大致是 senior engineer / staff engineer。對於走技術管理線、後來坐到副總，PhD 是隱形必需品。'
    - id: 'vp-1972'
      year: 1972
      age: 41
      type: 'choice'
      theme: 'expert-leader'
      scene: '在 TI 從工程師一路升上去 14 年後'
      chose:
        label: '升任德儀集團副總經理 + 半導體集團總經理'
        consequence: '當時美國大型企業中最高階的華人高管之一。突破種族天花板。負責 TI 最重要的業務部門。'
      alternatives:
        - label: '跳槽到競爭對手'
          plausibility: 'structural'
          note: '70 年代 Intel / AMD / Motorola 都在搶半導體高管。如果跳槽，可能拿到 CEO 級職位但失去 TI 累積的政治資本與人脈。'
    - id: 'itri-call'
      year: 1985
      age: 54
      type: 'choice'
      theme: 'homeland'
      scene: '工研院董事長徐賢修、行政院長俞國華、政委李國鼎力邀'
      chose:
        label: '回台灣擔任工研院院長'
        consequence: '54 歲，在美國有成功事業與優渥生活。回台是充滿風險的決定。但這是台積電誕生的前提——沒有工研院院長身份，沒有後來的政府支持與股權結構。'
      alternatives:
        - label: '留在美國'
          plausibility: 'structural'
          note: '同代華人高管多數選擇留美直到退休。如果留下，職涯穩定但不會有台積電。台灣半導體產業發展軌跡會完全不同。'
        - label: '回中國大陸'
          plausibility: 'structural'
          note: '1985 年中國改革開放第七年，亦曾邀請海外華人技術領袖。如果選大陸，會被綁進國家半導體計畫（如後來的中芯），路徑與商業模式自由度都不同。'
    - id: 'tsmc-foundry'
      year: 1987
      age: 56
      type: 'choice'
      theme: 'business-model'
      scene: '工研院院長期間，思考一個革命性商業模式'
      chose:
        label: '創立台積電 + 提出「專業晶圓代工」純代工模式'
        consequence: '1987/2/21 成立，總投資約 1.45 億美元。打破當時 IDM（整合元件製造商）主流模式。客戶不必投入巨資建廠就能設計晶片。後來重塑全球半導體產業生態，催生 fabless 產業。'
      alternatives:
        - label: '走傳統 IDM 模式（自己設計+製造）'
          plausibility: 'structural'
          note: '當時主流模式（Intel、TI、Motorola 都是 IDM）。如果選 IDM，台積電會跟韓國三星、日本 NEC 同象限競爭，多半會輸。代工模式才是繞過西方 IDM 主場的關鍵。'
        - label: '只做設計不做製造'
          plausibility: 'structural'
          note: '另一個方向：台版 fabless（如後來的聯發科）。但 1987 年台灣設計能力遠不及製造潛力，這條路會起步太晚。'
        - label: '不創公司，留在工研院做政策'
          plausibility: 'structural'
          note: '部分海外回國技術領袖選擇純政策角色。如果如此，台積電不會出現，台灣半導體會多十年才追上韓國。'
    - id: 'retire-2005'
      year: 2005
      age: 74
      type: 'choice'
      theme: 'succession'
      scene: '台積電已是全球代工龍頭'
      chose:
        label: '第一次退休 / 執行長交給蔡力行 / 自己保留董事長'
        consequence: '精心準備的接班計畫。為企業永續發展鋪路。但留住董事長職位讓他保有戰略決策權。'
      alternatives:
        - label: '完全退出'
          plausibility: 'structural'
          note: '完全退休是「乾淨退出」典範（如 Bill Gates 2008 退出微軟日常）。但 2008 金融危機如果張忠謀完全離場，台積電可能找不到回神能力。保留董事長是後來能復出的關鍵。'
    - id: 'comeback-2009'
      year: 2009
      age: 78
      type: 'choice'
      theme: 'succession'
      scene: '2008 全球金融危機重創台積電。業績下滑、競爭加劇'
      chose:
        label: '78 歲復出重新擔任執行長'
        consequence: '穩定市場信心、領導公司度過困難。順便培養劉德音與魏哲家。「老將回鍋救火」的經典案例。'
      alternatives:
        - label: '不復出讓蔡力行硬撐'
          plausibility: 'structural'
          note: '尊重既定接班計畫的另一條路。但金融危機 + 接班人威信不足的雙重壓力，台積電可能失去 28nm 製程的關鍵機會窗。'
    - id: 'retire-2018'
      year: 2018
      age: 87
      type: 'choice'
      theme: 'succession'
      scene: '台積電在他第二輪 9 年領導後達到製程全球領先'
      chose:
        label: '正式退休 + 建立雙首長制（劉德音董事長 / 魏哲家 CEO）'
        consequence: '功成身退典範。雙首長制平衡對外與對內。31 年傳奇生涯結束。被視為企業接班的教科書案例。'
      alternatives:
        - label: '單一接班人'
          plausibility: 'structural'
          note: '美國企業傳統路徑（Apple Cook / Microsoft Nadella 都是單一接班）。但台積電規模 + 兩位接班人都很強，雙首長制避免「兩虎相爭」也讓彼此互補。'
        - label: '繼續任 90 歲'
          plausibility: 'structural'
          note: 'Berkshire Hathaway 巴菲特模式。但張忠謀選擇主動退場，避免「老人政治」的風險，這個自我克制本身是傳承品質的一部分。'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'People/張忠謀.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:a6a3cf2441fdbe3c'
sourceBodyHash: 'sha256:0b0d1fd6c8d63d0e'
translatedAt: '2026-11-17T21:51:08.453883+00:00'
---

# Morris Chang (Chiang Kai-shek)

Morris Chang, der als „Vater des Halbleiters“ bezeichnet wird, ist der Gründer von Taiwan Semiconductor Manufacturing Company (TSMC). Er schuf das weltweit erste spezialisierte Auftragsfertigungsunternehmen und entwickelte ein Geschäftsmodell, das die globale Technologieökosystem neu gestaltete. Von einem chinesischen Manager bei Texas Instruments in den USA bis zur Gründung von TSMC in Taiwan erlebte sein Lebensweg die Entwicklung der globalen Halbleiterindustrie und legte Taiwans Schlüsselstellung in der weltweiten Technologielieferkette fest.

## 30-Sekunden-Zusammenfassung

**Warum sollte man Morris Chang kennen?**

TSMC, das von Morris Chang gegründet wurde, ist das weltweit größte Auftragsfertigungsunternehmen für Wafer und ein fundamentaler Pfeiler der modernen digitalen Zivilisation. Die überwiegende Mehrheit der fortschrittlichen Halbleiter auf der Welt – von Smartphones über Computer bis hin zu KI-Chips – wird von TSMC hergestellt. Das von ihm entwickelte Geschäftsmodell des „reinen Auftragsfertigens“ ermöglichte es unzähligen Technologieunternehmen, sich auf Chip-Design zu konzentrieren, ohne riesige Summen in den Bau von Waferfabriken investieren zu müssen, und revolutionierte damit das globale Technologiesystem.

TSMC wird als der „Schutzschild Taiwans“ bezeichnet und besitzt eine unverzichtbare strategische Bedeutung in der geopolitischen Landschaft. Morris Chang gehört zu den wenigen Menschen des 20. Jahrhunderts, die die Industriestruktur verändert haben – er definierte die Geschäftsgrenzen der Halbleiterindustrie neu und ermöglichte es Taiwan, als Auftragsfertiger aufzusteigen und zum zentralen Knotenpunkt der globalen Technologielieferkette zu werden.

Geboren im Jahr 1931 in Ningbo, Zhejiang; TSMC gegründet 1987 in Taiwan: Morris Changs Leben ist ein Mikrokosmos des technologischen Aufstiegs Asiens im 20. Jahrhundert.

## Frühes Leben und Bildungshintergrund

### Wachstum in turbulenten Zeiten

**Geburt und familiärer Hintergrund:**
Morris Chang wurde am 10. Juli 1931 in Ningbo, Provinz Zhejiang, China[^1] geboren. Sein Vater, Zhang Weiguan, war Bankier, und seine Mutter, Xu Junwei, stammte aus einer gebildeten Familie. In dieser turbulenten Ära sorgte die Bildung des Vaters für ein humanistisches Verständnis in ihm, obwohl er sich dem Ingenieurwesen zuwandte.

**Migrationserfahrungen in der Kindheit:**
Aufgrund von Kriegen war Changs Kindheit geprägt von zahlreichen Umzügen. Von Ningbo nach Shanghai, Nanjing, Chongqing, Shanghai, dann nach Guangzhou, Hongkong und schließlich in die USA – diese turbulenten Erfahrungen förderten seine Anpassungsfähigkeit und seinen internationalen Horizont.

**Studium in Hongkong:**
Nach dem Sieg im Zweiten Weltkrieg zog die Familie nach Shanghai, wo er an der Nanyang Model High School studierte; während des chinesischen Bürgerkriegs 1948 musste Chang mit seiner Familie erneut nach Hongkong ziehen[^1]. Im darauffolgenden Jahr reiste er von Hongkong in die USA zum Studium.

### Wendepunkt im amerikanischen Studium

**Kurzer Aufenthalt an der Harvard University:**
Im Jahr 1949 begann der 18-jährige Morris Chang sein Studium an der Harvard University[^2] mit einem Fokus auf Geisteswissenschaften. Nach einem Jahr wechselte er jedoch aufgrund mangelnder Leidenschaft für die Literatur und wirtschaftlicher Überlegungen zum Massachusetts Institute of Technology (MIT).

**Ingenieurstudium am MIT:**
Am MIT wählte Morris Chang Maschinenbau als Hauptfach. Diese Wahl schien zufällig, verschaffte ihm aber erste ingenieurtechnische Intuitionen in der Kernmaterie der Halbleiterfertigung (präzise mechanische Prozesse), was eine wichtige Grundlage für seine späteren Verbesserungen bei TSMC bildete.

**Abschluss mit dem Bachelor im Jahr 1952:**
Morris Chang erwarb 1952 den Bachelor of Science in Maschinenbau vom MIT[^3]. Der Abschluss fiel während des Koreakriegs; da ihm als ausländischer Student die Arbeit für das US-Militär verwehrt blieb, führte dieser Einschränkung ihn stattdessen zur zivilen Industrie.

## Berufseinstieg: Sylvania

### Einstieg in die Halbleiterbranche

**Die Gelegenheit im Jahr 1955:**
Nach dem Studium arbeitete Morris Chang drei Jahre bei der Firma Sylvania[^4], wo er erstmals mit der Halbleiterindustrie in Berührung kam. Die Branche befand sich damals noch in den Anfängen, aber Chang erkannte das enorme Potenzial dieses aufstrebenden Sektors.

**Entwicklung technischer Fähigkeiten:**
Bei Sylvania war Morris Chang für die Herstellung von Halbleiterbauelementen verantwortlich und erwarb grundlegendes Wissen über Halbleiterprozesse. Diese Erfahrung machte ihn sich der Komplexität und Präzision der Halbleiterfertigung bewusst und schärfte sein Auge für technische Details.

**Erste Anzeichen des Managementtalents:**
Schon in seiner technischen Basisrolle zeigte Morris Chang hervorragende Führungsqualitäten. Er war gut darin, Teams zu organisieren und technische Probleme zu lösen, was ihm diese dreijährige Erfahrung vermittelte: die extremen Präzisionsanforderungen der Halbleiterfertigung.

## Die Zeit bei Texas Instruments: Zeigen des Managementtalents

### Der wichtige Wendepunkt 1958

**Beitritt zu Texas Instruments (TI):**
Im Jahr 1958 wechselte Morris Chang zu Texas Instruments (TI)[^5], was ein entscheidender Wendepunkt in seiner Karriere war. TI erweiterte damals massiv sein Halbleitergeschäft und benötigte dringend Talente, die sowohl Ingenieurwesen als auch Management beherrschen konnten.

**Von Ingenieur zu Manager:**
Bei TI begann Morris Chang als Halbleiteringenieur und war für die Waferproduktion verantwortlich. Er zeigte technische Exzellenz und gleichzeitig außergewöhnliche Führungsqualitäten und erlangte schnell die Anerkennung der oberen Führungsebene.

**Beitrag zur Prozessverbesserung:**
Während seiner Zeit bei TI verbesserte Morris Chang die Halbleiterprozesse des Unternehmens erheblich, was zu einer Steigerung der Produktausbeute und Effizienz führte. Diese technischen Verbesserungen sparten dem Unternehmen erhebliche Kosten und verschafften ihm einen Ruf.

### Vertiefte Ausbildung in Stanford

**Die Lernchance im Jahr 1961:**
Im Jahr 1961 unterstützte Texas Instruments Morris Chang bei der Promotion zum Doktor der Elektrotechnik an der Stanford University. Dies war eine Anerkennung seiner Fähigkeiten durch das Unternehmen und zeigte den Wert, den amerikanische Firmen auf die Mitarbeiterentwicklung legten.

**Der Doktortitel:**
Morris Chang erlangte 1964 den Doktortitel in Elektrotechnik von der Stanford University[^6]. Diese Weiterbildung erhöhte seine theoretische Tiefe und sein professionelles Netzwerk erheblich, woraufhin er bei TI befördert wurde.

**Neue Rolle im Unternehmen:**
Nach dem Abschluss kehrte Morris Chang zu Texas Instruments zurück und übernahm höhere Managementpositionen. Er leitete nacheinander die Abteilungen für Halbleiter, Siliziumtransistoren und integrierte Schaltkreise, wobei sein Status in TI mit seinen Erfolgen stieg.

### Durchbrechen der Rassenthematik

**Die historische Beförderung im Jahr 1972:**
Im Jahr 1972 wurde Morris Chang zum Vizepräsidenten der Texas Instruments Group[^7] befördert und war damit einer der höchsten asiatischen Manager in einem großen amerikanischen Unternehmen zu dieser Zeit. Diese Beförderung war in dem damaligen amerikanischen Geschäftsumfeld äußerst selten.

**Geschäftsführer der Halbleitergruppe:**
Morris Chang leitete gleichzeitig die Halbleitergruppe von Texas Instruments, die das Kerngeschäft des Unternehmens abdeckte. Unter seiner Führung entwickelte sich das Halbleitergeschäft von TI rasant und wurde zu einem wichtigen globalen Lieferanten.

**Zusammenfassung der 25 Jahre in Amerika:**
In seinen 25 Jahren bei Texas Instruments stieg Morris Chang vom Basisingenieur zum hochrangigen Manager auf, verstand den technischen Rhythmus und die Geschäftslogik der Halbleiterindustrie tiefgreifend. Diese Erfahrung ermöglichte ihm eine weitaus präzisere Markteinschätzung bei seiner Rückkehr nach Taiwan 1987 als jeder rein akademisch gebildete Mensch.

## Der Ruf Taiwans: Die Zeit am Industrial Technology Research Institute (ITRI)

### Der Wendepunkt 1985

**Die Einladung von Sun Yun-sze:**
Im Jahr 1985 wurde Morris Chang eingeladen, der Direktor des Industrial Technology Research Institute (ITRI) zu werden. Die einladenden Personen waren der ehemalige Premierminister Sun Yun-sze[^8], der Vorsitzende des ITRI Xu Xianxiu und der Minister Yu Kuo-hua sowie der politische Berater Li Guoding. Sun Yun-sze förderte seit langem die Entwicklung der Hochtechnologie in Taiwan, und er war ein wichtiger Motor hinter dieser Einladung. Diese Entscheidung veränderte seinen Lebensweg und das Schicksal der taiwanesischen Technologieindustrie.

**Der Mut, aus der Komfortzone auszubrechen:**
Mit 54 Jahren hatte Morris Chang in Amerika bereits eine erfolgreiche Karriere und einen komfortablen Lebensstil genossen. Die Entscheidung, nach Taiwan zurückzukehren, war riskant und herausfordernd, aber sie zeugte von seinem Gefühl der Mission für die technologische Entwicklung Taiwans.

**Reformen am ITRI:**
Als Direktor des ITRI förderte Morris Chang die enge Verbindung zwischen Forschung und Industrie und ordnete die Forschungsrichtung des Instituts mit einer amerikanischen Management-Mentalität neu. Sein internationaler Horizont verwandelte das staatliche Forschungsinstitut in einen technologieorientierten Inkubator mit kommerziellem Bewusstsein.

### Bewertung der taiwanesischen Halbleiterindustrie

**Analyse der industriellen Umgebung:**
Morris Chang bewertete die industrielle Umgebung und die Stärken Taiwans genau. Er sah in Taiwan hervorragende Ingenieure, geringere Kosten und eine flexible Fertigungskapazität – Bedingungen, die sich gut für die Entwicklung der Halbleiterfertigung eigneten.

**Konzeption des Auftragsfertigungsmodells:**
Während seiner Zeit am ITRI begann Morris Chang, ein revolutionäres Geschäftsmodell zu konzipieren: das spezialisierte Wafer-Foundry-Modell. Diese Idee entsprang seinem tiefen Einblick in die Branchentrends und war der Höhepunkt seiner jahrelangen industriellen Erfahrung.

**Die Bedeutung staatlicher Unterstützung:**
Morris Chang erkannte, dass die Entwicklung der Halbleiterindustrie eine umfassende staatliche Unterstützung erforderte, einschließlich Kapitalinvestitionen, politischer Kooperation und Talentförderung. Er kommunizierte eng mit Regierungsbeamten und sicherte für die Gründung von TSMC einen besonderen Rahmen ein, der sowohl technisches Wissen vom ITRI als auch staatliches Kapital umfasste.

## Die Geburt von TSMC: Innovation im Jahr 1987

### Die Revolution des Auftragsfertigungsmodells

**Der Durchbruch der Foundry-Idee:**
Im Jahr 1987 präsentierte Morris Chang das innovative Konzept des „spezialisierten Wafer-Foundry“[^11]. Im Gegensatz zum traditionellen Integrated Device Manufacturer (IDM)-Modell konzentrierte sich TSMC darauf, Chips für Kunden zu fertigen, anstatt eigene Produkte zu entwerfen.

**Die revolutionäre Geschäftslogik:**
Die Revolution dieses Modells bestand darin, dass es vielen Unternehmen ermöglichte, die keine eigenen Waferfabriken bauen konnten, dennoch fortschrittliche Chips zu entwickeln. Dies senkte die Eintrittsbarriere in die Halbleiterindustrie drastisch und führte zum exponentiellen Wachstum der Chip-Designunternehmen von den 1990er bis in die 2020er Jahre.

**Auswirkungen auf das Ökosystem:**
Das Auftragsfertigungsmodell schuf ein völlig neues Industriesystem: Designfirmen konnten sich auf Innovation konzentrieren, während Foundry-Unternehmen sich auf die Fertigung konzentrierten – eine Spezialisierung, die die Effizienz der gesamten Branche steigerte.

### Der Gründungsprozess von TSMC

**Der historische Moment am 21. Februar 1987:**
Am 21. Februar 1987 wurde Taiwan Semiconductor Manufacturing Company offiziell gegründet. Die Gesamtinvestition belief sich bei etwa 145 Millionen US-Dollar: siebenzig Millionen Dollar vom Staat (48,3 %), vierzig Millionen Dollar von Philips der Niederlande (27,5 %) und fünfundvierzig Millionen Dollar aus privaten Quellen (24,2 %)[^9]. Dies war das Ergebnis einer Zusammenarbeit zwischen Regierung, Privatunternehmen und ausländischen Investoren.

**Die Struktur des Kapitals:**
Die Eigentümerstruktur von TSMC umfasste das ITRI, Philips der Niederlande und private taiwanesische Unternehmen[^10]. Diese vielfältige Kapitalbasis verschaffte TSMC Technologie, Finanzmittel und Marktressourcen.

**Morris Changs Doppelrolle:**
Morris Chang war Vorstandsvorsitzender und Geschäftsführer (später CEO) von TSMC und verantwortete die Gesamtstrategie und den Tagesbetrieb des Unternehmens. Sein Führungsstil verband die Effizienz des amerikanischen Managements mit der Weisheit der chinesischen Kultur.

## Die Entwicklung von TSMC

### Frühe Herausforderungen und Durchbrüche

**Die Gründungsphase (1987–1990):**
TSMC stand zu Beginn vor enormen Herausforderungen. Das Auftragsfertigungsmodell war neu, und der Markt zweifelte daran; die Kunden benötigten Zeit, um dieses Konzept anzunehmen. Morris Chang musste gleichzeitig die Fertigungskapazitäten aufbauen und die Kunden überzeugen.

**Aufbau technischer Fähigkeiten:**
Die anfängliche Technologie von TSMC stammte vom ITRI und der Zusammenarbeit mit Philips. Morris Chang leitete Teams, die Prozesse schnell lernten und verbesserten, wodurch eine zuverlässige Fertigungsbasis geschaffen wurde.

**Akquise der ersten Kunden:**
Die ersten Kunden von TSMC waren hauptsächlich amerikanische Fabless-Unternehmen (ohne eigene Fabriken). Diese Firmen benötigten genau diese spezialisierten Dienstleistungen und bildeten die frühe Geschäftsgrundlage für TSMC.

### Rasante Entwicklung in den 1990er Jahren

**Strategie der technologischen Führung:**
In den 1990er Jahren entwickelte Morris Chang die Strategie der „technologischen Führerschaft“ und investierte massiv in Forschung und Entwicklung, um sicherzustellen, dass TSMC bei jeder Prozessgeneration nicht hinter den Wettbewerbern zurückfiel. TSMC baute sukzessive mehrere Waferfabriken in Taiwan; die Kundenbasis erweiterte sich von den anfänglichen amerikanischen Fabless-Firmen zu globalen Designunternehmen wie Qualcomm, Broadcom und Nvidia.

### Die Führungsrolle im 21. Jahrhundert

**Wettbewerb bei fortschrittlichen Prozessen:**
Mit dem Eintritt ins 21. Jahrhundert wurde die Entwicklung der Halbleiterprozesse immer schwieriger und teurer. TSMC behielt seine führende Position in den fortgeschrittenen Prozessbereichen durch Investitionen, die jedes Jahr über dem Branchendurchschnitt lagen.

**Durchbrüche von 28 nm bis 5 nm:**
Von 28 nm über 16 nm, 7 nm bis hin zu 5 nm und 3 nm hielt TSMC bei jeder Generation technologische Führung und festigte seine Position auf dem High-Endmarkt.

**Der Meilenstein der Apple-Kooperation:**
Die Zusammenarbeit mit Apple begann mit den A-Serien-Chips im Jahr 2013, als TSMC die Kernprozessoren für iPhone und iPad fertigte. Dies brachte enorme Auftragsvolumina und bot eine strenge kommerzielle Validierung von TSMCs fortschrittlicher Fertigungskompetenz[^12].

## Betriebsphilosophie und Managementphilosophie

### Beharrung auf technologischer Innovation

**Die Bedeutung der F&E-Investition:**
Morris Chang betonte stets die Wichtigkeit technologischer Innovation. TSMC investierte jährlich etwa 8 % des Umsatzes in Forschung und Entwicklung, um technologisch wettbewerbsfähig zu bleiben[^13]. In einer Zeit, in der das Moore'sche Gesetz an physikalische Grenzen stieß, führte TSMC bis zur 7-nm-Masseproduktion unter seiner Leitung; die 5-nm (2020) und 3-nm (2022) waren Ergebnisse des Nachfolgeteams nach seinem Rücktritt. Die sukzessive Verfeinerung der Prozesse lieferte die Fertigungskapazität für die gesamte Branche.

**Balance zwischen Technologie und Markt:**
Morris Chang war geschickt darin, ein Gleichgewicht zwischen technologischer Führung und Marktanforderungen zu finden: Er musste technologische Vorteile wahren und gleichzeitig den kommerziellen Wert der Technologie sicherstellen, um eine Übervorteilung durch übermäßige Vorleistung zu vermeiden.

### Talentförderung und Unternehmenskultur

**Die Kultur der Integrität:**
Morris Chang etablierte bei TSMC eine auf Integrität basierende Unternehmenskultur. Er betonte die Kernwerte „Integrität, Engagement, Innovation, Kundenvertrauen“, die zum Fundament von TSMCs Kultur wurden.

**Wertschätzung der Talententwicklung:**
Morris Chang legte großen Wert auf die Ausbildung von Talenten und baute bei TSMC ein systematisches System zur Ingenieurtrainierung und -förderung auf. Er glaubte, dass Menschen das Kernkompetenzkapital eines Unternehmens seien; während seine Fluktuationsrate deutlich unter dem Branchendurchschnitt lag, entwickelte er auch Schlüsselteams wie Liu Deyin und Wei Zhejia, die TSMC später leiteten.

**Internationalisierter Führungsstil:**
Morris Chang brachte die Effizienz und Transparenz des amerikanischen Managements nach TSMC und etablierte eine moderne Unternehmensführung. Gleichzeitig integrierte er die Weisheit der chinesischen Kultur und schuf so eine einzigartige Unternehmenskultur.

### Strategisches Denken und Umsetzungskraft

**Entwicklung langfristiger Strategien:**
Morris Chang besaß ein außergewöhnliches strategisches Gespür, das es ihm ermöglichte, Branchentrends zu erkennen und langfristige Entwicklungsstrategien zu entwickeln. Die „technologische Führerschafts“-Strategie von TSMC ist der Ausdruck seines strategischen Weitsichtes.

**Die Bedeutung der Umsetzung:**
Neben der Strategieentwicklung legte Morris Chang großen Wert auf die Umsetzungskraft. Er etablierte ein präzises Managementsystem, das es ermöglichte, dass technische Blaupausen vom Entscheidungsprozess bis zur Waferfabrik umgesetzt wurden – dies war entscheidend dafür, dass TSMC mit dem Rhythmus jeder Prozessgeneration mithalten konnte.

**Weisheit im Krisenmanagement:**
Angesichts verschiedener Krisen und Herausforderungen zeigte Morris Chang außergewöhnliche Führungsqualitäten und krisenbewusste Intelligenz. Er führte TSMC durch mehrere schwierige Zeiten und gewährleistete die stabile Entwicklung des Unternehmens.

## Ruhestand und Nachfolge

### Der erste Ruhestand im Jahr 2005

**Start der Nachfolgeplanung:**
Im Jahr 2005 trat Morris Chang mit 74 Jahren als CEO zurück und übergab das Amt an Tsai Li-hing[^14]. Dies war Teil seiner sorgfältig geplanten Nachfolge, die sein Verantwortungsbewusstsein für die Nachhaltigkeit des Unternehmens zeigte.

**Beibehaltung der Vorstandsposition:**
Obwohl er als CEO ausgeschieden war, behielt Morris Chang seine Vorstandsposition und beteiligte sich weiterhin an wichtigen strategischen Entscheidungen des Unternehmens und gab dem Nachfolgerteam Anleitung und Unterstützung.

**Die Ruhestandsgestaltung:**
Morris Chang verließ die Geschäftswelt nicht vollständig; er nahm als Vertreter Taiwans auf internationalen Foren wie APEC teil und teilte in vielen Vorträgen seine Ansichten über Geopolitik und die Zukunft der Halbleiter.

### Die Rückkehr im Jahr 2009

**Die Herausforderung der Finanzkrise:**
Die globale Finanzkrise von 2008 wirkte sich stark auf TSMC aus; das Unternehmen sah sich mit dem doppelten Problem des Umsatzrückgangs und verstärktem Wettbewerb konfrontiert. In dieser kritischen Phase entschied Morris Chang, zurückzukehren.

**Rückkehr als CEO:**
Im Jahr 2009 kehrte der 78-jährige Morris Chang als CEO von TSMC zurück[^15] und leitete das Unternehmen persönlich durch die schwierige Zeit. Seine Rückkehr stabilisierte das Marktvertrauen und lieferte eine Führung für die Erholung des Unternehmens.

**Förderung von Liu Deyin und Wei Zhejia:**
In seiner zweiten Amtszeit konzentrierte sich Morris Chang darauf, Nachfolger wie Liu Deyin und Wei Zhejia zu fördern und so die Talente für die zukünftige Entwicklung des Unternehmens vorzubereiten.

### Der formelle Ruhestand im Jahr 2018

**Abschluss der Übergabe:**
Am 5. Juni 2018 trat Morris Chang mit 87 Jahren offiziell in den Ruhestand und beendete seine legendäre dreißigjährige Karriere bei TSMC[^16]. Er übergab die Vorstandsposition an Liu Deyin und das CEO-Amt an Wei Zhejia.

**Etablierung der Doppelspitzenführung:**
Morris Chang etablierte ein „Doppelspitzen"-System: Liu Deyin übernahm als Vorsitzende die externe Vertretung, während Wei Zhejia als CEO für die interne Führung zuständig war. Diese Struktur trug zur stabilen Entwicklung des Unternehmens bei.

**Ein Vorbild eines würdevollen Abschieds:**
Morris Changs Rücktritt wurde als Musterbeispiel für die Nachfolge in Unternehmen angesehen; er trat zum richtigen Zeitpunkt zurück und gab der neuen Generation genügend Raum, sich zu entfalten, während er gleichzeitig einen stabilen Übergang des Unternehmens sicherstellte.

## Einfluss auf die globale Halbleiterindustrie

### Innovation des Geschäftsmodells

**Die Verbreitung des Auftragsfertigungsmodells:**
Das von Morris Chang geschaffene Auftragsfertigungsmodell ist heute eines der Standardgeschäftsmodelle in der Halbleiterindustrie. Hunderte von Fabless-Unternehmen weltweit sind auf die Dienstleistungen von Foundry-Firmen angewiesen, was die industrielle Entwicklung stark vorangetrieben hat.

**Neugestaltung des Ökosystems:**
Das Auftragsfertigungsmodell gestaltete das Halbleiterökosystem neu: Es förderte die Spezialisierung und erhöhte die Effizienz der Industrie und senkte gleichzeitig die Eintrittsbarriere für Innovationen, sodass mehr Unternehmen an Chip-Designs teilnehmen konnten.

**Aufbau der globalen Lieferkette:**
TSMC wurde zu einem kritischen Knotenpunkt in der globalen Halbleiterlieferkette und lieferte Fertigungsdienste für Technologieunternehmen weltweit, wodurch eine echte globale Halbleiterindustrie geschaffen wurde.

### Antrieb technologischer Fortschritte

**Führungsrolle bei den Prozessen:**
Unter Morris Chang hielt TSMC die weltweite Führungsposition in der Prozesstechnologie und trieb den technologischen Fortschritt der gesamten Branche voran und verlängerte somit die Lebensdauer des Moore'schen Gesetzes.

**Demokratisierung fortschrittlicher Prozesse:**
Der Service von TSMCs fortgeschrittenen Prozessen ermöglichte es auch kleineren Designfirmen, modernste Technologien zu nutzen – ein Beispiel für die „Demokratisierung“ der fortschrittlichen Prozesse: Ein Fabless-Startup mit wenigen Dutzend Mitarbeitern konnte bei TSMC 7-nm-Chips in Serie produzieren.

**Erkundung neuer Technologiefelder:**
Die Fertigungskapazitäten von TSMC umfassen verschiedene Anwendungsbereiche wie digitale Chips, KI-Beschleuniger und Automotive-Halbleiter und lieferten die Grundlage für neue Technologien.

## Die Bedeutung für Taiwan: Der Gründer der „Tech Island“

### Entwicklung der Technologieindustrie

**Die Etablierung des „Schutzschilds Taiwans“:**
TSMC wird als der „Schutzschild Taiwans“ bezeichnet, nicht nur wegen seines enormen wirtschaftlichen Werts, sondern auch aufgrund seiner Schlüsselstellung in der globalen Technologielieferkette. Morris Chang schuf für Taiwan einen strategischen Wert, der kaum ersetzbar ist – jenseits der Verteidigung.

**Förderung von Technologie-Talenten:**
Die Entwicklung von TSMC bildete eine große Anzahl spezialisierter Halbleiterfachkräfte aus. Diese Talente stützten nicht nur die Entwicklung von TSMC, sondern lieferten auch die Grundlage für die gesamte taiwanesische Technologieindustrie.

**Bildung industrieller Cluster:**
Mit TSMC als Zentrum entwickelte Taiwan einen Halbleiter-Cluster, der Zulieferer für Ausrüstung, Material und Testdienstleistungen umfasste und so einen enormen industriellen Wert schuf.

### Beitrag zur wirtschaftlichen Entwicklung

**Wichtiger Beitrag zum BIP:**
TSMC ist heute das größte Unternehmen Taiwans und trägt maßgeblich zum nationalen BIP bei. Der Erfolg des Unternehmens trieb die Entwicklung verwandter Industrien an und schuf zahlreiche Arbeitsplätze.

**Rückgrat des Exporthandels:**
Halbleiter machen traditionell etwa ein Drittel der taiwanesischen Exporte aus; TSMCs Erfolg steigerte Taiwans Stellung im globalen Handel erheblich und stärkte die Wettbewerbsfähigkeit Taiwans.

**Verbesserung des Investitionsklimas:**
Der Erfolgsfall von TSMC zog weitere internationale Investitionen an, verbesserte das Investitionsklima in Taiwan und erhöhte dessen Ansehen bei internationalen Investoren.

### Geopolitische Auswirkungen

**Die Bedeutung der technologischen Souveränität:**
In der aktuellen geopolitischen Lage ist die Halbleitertechnologie ein zentrales Schlachtfeld zwischen Großmächten. Da TSMC die fortschrittlichsten Prozesse beherrscht, besitzt Taiwan eine unverzichtbare strategische Stellung in der internationalen Gemeinschaft.

**Ein Verhandlungshebel in internationalen Beziehungen:**
Die Schlüsselstellung von TSMC in der globalen Lieferkette gibt Taiwan bei Halbleiterfragen eine Sprechrolle, die selbst Großmächte beachten müssen. Die wiederholten Angebote von den USA, der EU und Japan zur Errichtung von Fabriken belegen diesen Wert.

**Überlegungen zur Sicherheitsstrategie:**
Die Betonung verschiedener Länder auf Halbleitertechnologie stellt Taiwan vor neue sicherheitspolitische Herausforderungen und Chancen. Wie das Interesse aller Parteien auszubalancieren und die Wettbewerbsfähigkeit von TSMC zu erhalten, ist eine der Kernaufgaben der taiwanesischen Außen- und Sicherheitspolitik.

## Persönliche Eigenschaften und Führungsstil

### Die Verbindung von Weitsicht und Umsetzungskraft

**Außergewöhnliches strategisches Gespür:**
Morris Changs größte Eigenschaft war sein außergewöhnliches strategisches Gespür. Er konnte Branchentrends erkennen und zukünftige Entwicklungen antizipieren – diese Weitsicht ist ein Schlüsselfaktor für den Erfolg von TSMC.

**Praktische Umsetzungskompetenz:**
Neben der Vision besaß Morris Chang eine herausragende Umsetzungsfähigkeit. Er konnte strategische Konzepte in konkrete Aktionspläne umwandeln und jeden Detailprozess verfolgen; diese Kombination aus strategischem Denken und Umsetzungskraft ist selten im Geschäftsleben zu finden.

**Haltung des lebenslangen Lernens:**
Auch im hohen Alter pflegte Morris Chang die Gewohnheit, viel zu lesen und sich für die industrielle Entwicklung zu interessieren. Er las monatlich zwei englische Bücher; er hörte seit siebenzig Jahren nicht auf, _The New Yorker_ zu lesen – was er selbst als „keine Literatur“ bezeichnete. Diese Haltung hielt sein Denken auch im Alter scharf.

### Merkmale des Führungsstils

**Charismatische Führung:**
Morris Chang besaß eine starke persönliche Anziehungskraft und Überzeugungskraft, die es ihm ermöglichten, Teams zu inspirieren, gemeinsame Ziele zu erreichen. Seine Reden und Artikel vermittelten komplexe Konzepte klar und wurden von Mitarbeitern und Branchenkollegen respektiert.

**Beharrung auf rationale Entscheidungen:**
Bei wichtigen Entscheidungen setzte Morris Chang stets auf rationale Analysen und traf Urteile basierend auf Fakten und Daten, um zu verhindern, dass Emotionen oder politische Überlegungen die Richtigkeit der Entscheidungen beeinflussten.

**Praxis des langfristigen Denkens:**
Morris Chang hielt immer an einer langfristigen Perspektive fest und ließ sich nicht von kurzfristigen Schwierigkeiten oder Gewinnen beeinflussen. Als die Finanzkrise 2008 am tiefsten war, genehmigte er weiterhin F&E-Budgets für fortschrittliche Prozesse – diese langfristige Sichtweise ermöglichte es TSMC, nach der Krise einen Vorsprung gegenüber den Wettbewerbern zu gewinnen.

## Ehrungen und Anerkennung

### Internationale Auszeichnungen

**IEEE-Auszeichnungen:**
Morris Chang erhielt mehrere Ehrenmedaillen vom Institute of Electrical and Electronics Engineers (IEEE), was eine wichtige Anerkennung seines Beitrags zur Entwicklung der Halbleitertechnologie darstellte.

**Ehrendoktorwürden aus verschiedenen Ländern:**
Universitäten wie Tsinghua, National Taiwan University und andere verliehen ihm Ehrendoktortitel für seinen Beitrag zur Technologieindustrie und Bildung.

**Bewertung durch Wirtschaftsmagazine:**
Morris Chang wurde mehrmals von internationalen Wirtschaftsmedien wie _Fortune_ oder _Business Weekly_ als einer der führenden Technologieführer seiner Zeit ausgezeichnet, was seine Stellung in der globalen Geschäftswelt festigte.

### Anerkennung in Taiwan

**Verleihung staatlicher Medaillen:**
Die taiwanesische Regierung verlieh Morris Chang mehrere wichtige Auszeichnungen für seinen herausragenden Beitrag zur wirtschaftlichen Entwicklung und technologischen Fortschritt Taiwans.

**Achtung durch die Industrie:**
In der taiwanesischen Wirtschaft wird Morris Chang als „Vater des Halbleiters“ verehrt; seine Erfahrung und Weisheit dienen als Vorbild für junge Unternehmer.

**Anerkennung des gesellschaftlichen Einflusses:**
Neben seinen geschäftlichen Erfolgen wurde auch sein gesellschaftlicher Einfluss weithin anerkannt, und sein Beitrag zur Entwicklung der taiwanesischen Gesellschaft wurde von allen Kreisen hoch bewertet.

## Philosophisches Denken und Lebensweisheit

### Verständnis von Erfolg

**Kombination aus Stärke und Gelegenheit:**
Morris Chang glaubte, dass Erfolg eine Kombination aus eigener Kraft und der Nutzung von Gelegenheiten erfordert; die eigene Kraft sei die Grundlage, aber man müsse auch den richtigen Zeitpunkt erkennen. Er betonte die Wichtigkeit der Vorbereitung: Chancen warten immer auf diejenigen, die bereit sind.

**Der Wert der langfristigen Beharrung:**
Er betonte die Bedeutung des langfristigen Durchhaltens und glaubte, dass wahrer Erfolg Zeit braucht und nicht eilig erreicht werden kann. Der Erfolg von TSMC ist das Ergebnis dieser langen Ausdauer.

**Die Notwendigkeit der Innovation:**
Morris Chang sah in der Innovation eine notwendige Bedingung für das Überleben in der Technologieindustrie. Die Geschichte von TSMC lehrt: Wer die Prozessdurchbrüche einstellt, wird durch den Wettbewerb überholt.

### Erkenntnisse über das Leben

**Arbeit-Leben-Balance:**
Obwohl sein Berufsleben sehr erfolgreich war, betonte Morris Chang auch die Bedeutung der Work-Life-Balance. Er genoss Lesen und Musik; diese Hobbys lieferten ihm geistige Nahrung.

**Übernahme sozialer Verantwortung:**
Morris Chang glaubte, dass erfolgreiche Unternehmer eine soziale Verantwortung haben. Er leitete Spenden von TSMC an akademische Einrichtungen wie Tsinghua University und beteiligte sich an Diskussionen über Bildungspolitik und gab konkrete Vorschläge zur Reform der taiwanesischen Hochschulbildung[^18].

**Die Bedeutung der Weitergabe:**
Er legte großen Wert auf die Weitergabe von Wissen und Erfahrung, nicht nur durch die Ausbildung von Nachfolgern im Unternehmen, sondern auch durch den Austausch seiner Erfahrungen und Weisheit auf vielfältige Weise.

## Historische Bewertung

Als Morris Chang 2018 in den Ruhestand ging, übertraf TSMC mit seinem Marktwert Intel und wurde zu einem der wertvollsten Halbleiterunternehmen der Welt[^19]. Er bewies mit seinen 31 Jahren eine kontraintuitive These: Ein Auftragsfertiger, der keine eigenen Chips entwirft, kann die Grundlage für das gesamte digitale Zeitalter sein.

Von Ningbo in Zhejiang über Harvard und MIT bis hin zur Karriere als Manager bei Texas Instruments und dem Verzicht auf ein komfortables Leben in den USA mit 54 Jahren – jeder seiner Wendungen war nicht der Mainstream, aber alle führten zu einem einzigen Ergebnis. Der heutige Status von TSMC ist sowohl das Ergebnis des technologischen Wettbewerbs als auch die Folge seines Einsatzes für dieses Geschäftsmodell, an das wenige glaubten.

TSMCs Marktwert überschritt erstmals im Juli 2020 zehn Billionen Taisimal und erreichte im März 2024 zwanzig Billionen[^20] – ein Maßstab, der bei seinem Einsatz von 1987 kaum vorstellbar war und den klarsten Zeugnis seines Lebens darstellt.

## Weiterführende Lektüre

- [Taiwanisches Unternehmen: TSMC](/de/economy/tsmc) — Der „Schutzschild Taiwan“, gegründet mit dem Wafer-Foundry-Modell im Jahr 1987 und heute über sechzig Billionen wert, ist die vollständigste Darstellung von Morris Chang.
- [Shih Zhen-rong (Morris Changs Kollegen)](/de/people/stan-shih) — Er war der Gründer von Acer, der TSMC zwanzig Jahre lang als Vorstandsvorsitzender einlud; er ist auch der Autor der „Lächelnkurve“; die „Zwischenfertigung“, die TSMC macht, ist jener Teil dieser Kurve, den man verachtet, aber der in Wirklichkeit am wertvollsten ist.
- [Terry Gou (Foxconn)](/de/people/terry-gou) — Ein weiterer taiwanesischer Unternehmer, der die Welt durch „Auftragsfertigung“ verändert hat; die Montagelösung von Foxconn und das Wafer-Foundry-Modell von TSMC sind zwei Wege, wie Taiwan zur globalen Fertigungsbasis wurde.
- [Halbleiterindustrie](/de/technology/taiwan-semiconductor-industry) — Von der Technologietransfer-Ära RCA bis zum „Schutzschild“ – Morris Chang brachte die gesamte Industrie in den Kampf.
- [Huang Chongren (Wistron)](/de/people/frank-huang-psmc) — Die Person, die Ende der 1990er Jahre zu Morris Chang kam, als Wistron kurz davor war, von United Microelectronics Corporation übernommen zu werden; er repräsentiert einen anderen, gefährlichen Weg in der taiwanesischen Halbleiterindustrie.
- [Taiwanische Industrielle Transformation und Aufwertung](/de/economy/industrial-transformation-from-manufacturing-to-innovation) — TSMC ist das konkretste Beispiel dafür, wie Taiwan von einer „Fertigungsinsel“ zu einer „Tech Island“ wurde, und bildet den Kernkoordinaten dieser vierzigjährigen Transformation.

---

## Referenzen

[^1]: Morris Chang wurde am 10. Juli 1931 in Ningbo, Zhejiang, China geboren. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^2]: Im Jahr 1949 studierte er Geisteswissenschaften an der Harvard University und wechselte nach einem Jahr zum Maschinenbau am MIT. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^3]: Er erhielt 1952 den Bachelor of Science in Maschinenbau vom MIT. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^4]: Im Jahr 1955 arbeitete er etwa drei Jahre bei Sylvania in der Halbleiterfertigung. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^5]: Er trat 1958 als Halbleiteringenieur bei Texas Instruments (TI) ein. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^6]: Im Jahr 1964 erhielt er den Doktortitel in Elektrotechnik von der Stanford University. Siehe: englische Wikipedia-Artikel über Morris Chang <https://en.wikipedia.org/wiki/Morris_Chang>.

[^7]: Im Jahr 1972 wurde er Vizepräsident und Leiter der Halbleitergruppe bei Texas Instruments. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^8]: Sun Yun-sze (1913–2006), ehemaliger Premierminister (1978–1984), der die Halbleiter- und Technologieindustrie stark förderte. Siehe: Wikipedia-Artikel über Sun Yun-sze <https://zh.wikipedia.org/wiki/%E5%AD%AB%E9%81%8B%E7%92%87>.

[^9]: TSMC wurde am 21. Februar 1987 gegründet; staatliche Investition von 70 Millionen US-Dollar (48,3 %), Philips 40 Millionen US-Dollar (27,5 %) und Privatkapital von 35 Millionen US-Dollar (24,2 %). Siehe: Wikipedia-Artikel über TSMC <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>.

[^10]: Die Gründerkapitalgeber von TSMC umfassten Philips der Niederlande. Siehe: Wikipedia-Artikel über TSMC <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>.

[^11]: Im Jahr 1987 entwickelte Morris Chang das reine Auftragsfertigungsmodell des „spezialisierten Wafer-Foundry“. Siehe: Wikipedia-Artikel über TSMC <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>.

[^12]: Seit den 2010er Jahren fertigt TSMC Mobilprozessoren wie die Apple A-Serie; ab 2013 ist er Hauptlieferant für iPhone-Kernchips. Siehe: Wikipedia-Artikel über TSMC <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>.

[^13]: TSMC investierte über viele Jahre etwa 8 % des Umsatzes in F&E (der Anteil schwankte leicht je nach Jahresbericht). Siehe: Wikipedia-Artikel über TSMC <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>.

[^14]: Im Jahr 2005 trat Morris Chang als CEO zurück und übergab das Amt an Tsai Li-hing. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^15]: Im Jahr 2009 kehrte der 78-jährige Morris Chang aufgrund der globalen Finanzkrise als CEO von TSMC zurück. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^16]: Am 5. Juni 2018 trat Morris Chang offiziell in den Ruhestand; Liu Deyin wurde Vorstandsvorsitzende und Wei Zhejia der CEO. Siehe: Wikipedia-Artikel über Morris Chang <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>.

[^17]: [Taiwanische Wirtschaft – Chinesische Wikipedia](https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%B6%93%E6%BF%9F) — Halbleiter machen traditionell etwa ein Drittel der taiwanesischen Exporte aus.

[^18]: [Akademisches Unternehmen „Schönheit des Technischen Managements“: National Tsing Hua University (TSMC Hall)](https://www.nthu.edu.tw/hotNews/content/708) — TSMC spendete 180 Millionen Taisimal für den Bau des "TSMC Halls" an der NTU, fertiggestellt im April 2008; die Spende erfolgte durch TSMC, nicht durch Morris Chang persönlich.

[^19]: Als Morris Chang 2018 in Rente ging, hatte TSMC einen Marktwert, der Intel übertraf. Siehe: Wikipedia-Artikel über TSMC <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>.

[^20]: Der Marktwert von TSMC überschritt erstmals am 21. Juli 2020 zehn Billionen Taisimal und erreichte am 8. März 2024 zwanzig Billionen. Siehe: Wikipedia-Artikel über TSMC <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>.

_Referenzen:_

- [Morris Changs Autobiografie (Band 1 + Band 2)](https://www.books.com.tw/products/0010784799)
- [Jahresberichte und offizielle Dokumente von TSMC](https://investor.tsmc.com/english/annual-reports)
- [Industrial Technology Research Institute (ITRI)](https://www.itri.org.tw/)
- [Wikipedia-Artikel über Morris Chang](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [Materialien zur Tsinghua University zu Morris Chang <https://www.nthu.edu.tw/>]
