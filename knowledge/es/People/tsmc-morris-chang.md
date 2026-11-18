---
title: 'Morris Chang'
description: 'Padre de los semiconductores, fundador de TSMC, legendario empresario que cambió la industria tecnológica global con el modelo de fundición de obleas'
date: 2026-03-17
category: 'People'
tags:
  [
    'Personajes',
    'Morris Chang',
    'TSMC',
    'semiconductores',
    'empresario',
    'fundición de obleas',
    'montaña sagrada protectora',
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
sourceCommitSha: 'b1a5fea0'
sourceContentHash: 'sha256:a6a3cf2441fdbe3c'
sourceBodyHash: 'sha256:0b0d1fd6c8d63d0e'
translatedAt: '2026-09-23T22:11:50+08:00'
---

# Morris Chang (張忠謀)

Morris Chang, aclamado como el «padre de los semiconductores», es un legendario empresario, fundador de Taiwan Semiconductor Manufacturing Company (TSMC, 台積電). Creó la primera fundición de obleas profesional del mundo, inaugurando un modelo de negocio que reconfiguró el ecosistema de la industria tecnológica global. Desde ejecutivo chino-estadounidense en Texas Instruments hasta su regreso a Taiwán para fundar TSMC, su trayectoria vital atestigua la historia del desarrollo de la industria global de semiconductores y cimentó la posición clave de Taiwán en la cadena de suministro tecnológica mundial.

## Resumen en 30 segundos

**¿Por qué el mundo debería conocer a Morris Chang?**

TSMC, fundada por Morris Chang, es la empresa de mayor capitalización bursátil en el mercado global de fundición de obleas y una piedra angular de la civilización digital moderna. Desde teléfonos inteligentes, computadoras hasta chips de inteligencia artificial, la inmensa mayoría de los semiconductores avanzados del mundo son fabricados por TSMC. Su modelo de negocio de «fundición pura» permitió a innumerables empresas tecnológicas centrarse en el diseño de chips sin necesidad de invertir capitales masivos en la construcción de fábricas de obleas, transformando radicalmente el ecosistema de la industria tecnológica global.

TSMC es llamada la «montaña sagrada protectora» de Taiwán, con una posición estratégica insustituible en la geopolítica. Morris Chang es uno de los pocos hombres del siglo XX que realmente cambió la estructura de una industria: redefinió los límites comerciales del negocio de los semiconductores, permitiendo que Taiwán, partiendo de la fundición, se convirtiera en el nodo central de la cadena de suministro tecnológica global.

Nacido en 1931 en Ningbo, Zhejiang; fundó TSMC en Taiwán en 1987: la vida de Morris Chang es en sí misma un microcosmos del ascenso tecnológico de Asia en el siglo XX.

## Primeros años y formación académica

### Trayectoria de crecimiento en tiempos turbulentos

**Nacimiento y entorno familiar:**
El 10 de julio de 1931, Morris Chang nació en Ningbo, provincia de Zhejiang, China[^1]. Su padre, Chang Wei-kuan, era banquero, y su madre, Hsu Chun-wei, provenía de una familia culta. En aquella época convulsa, su padre, versado en literatura e historia, mantenía una vasta biblioteca familiar, entorno que le permitió mantener una perspectiva humanista a lo largo de su carrera en ingeniería.

**Experiencia migratoria en la infancia:**
Debido a la guerra, la infancia de Chang estuvo marcada por continuos desplazamientos. De Ningbo a Shanghái, Nankín, Chongqing, de nuevo a Shanghái, luego a Cantón, Hong Kong y finalmente a Estados Unidos; esta experiencia errante forjó su capacidad de adaptación y su visión internacional.

**Años de estudio en Hong Kong:**
En 1945, tras la victoria en la Guerra de Resistencia, la familia se trasladó a Shanghái e ingresó en la Escuela Secundaria Modelo Nanyang; en 1948, con la guerra civil entre el KMT y el PCCh, el joven Chang, de 17 años, se mudó nuevamente con su familia a Hong Kong[^1]. Al año siguiente, partió de Hong Kong hacia Estados Unidos para cursar estudios superiores.

### El giro decisivo de sus estudios en Estados Unidos

**Breve paso por la Universidad de Harvard:**
En 1949, a los 18 años, Morris Chang ingresó en la Universidad de Harvard[^2], cursando inicialmente Letras. Sin embargo, un año después, por falta de pasión por la literatura y consideraciones económicas, se transfirió al Instituto Tecnológico de Massachusetts (MIT).

**Formación en ingeniería en el MIT:**
En el MIT, Chang eligió Ingeniería Mecánica como especialidad. Esta elección, aparentemente casual, le permitió acumular una intuición ingenieril de primera mano en el núcleo de la fabricación de semiconductores (procesos de maquinaria de precisión), base crucial para su posterior liderazgo en la mejora de procesos en TSMC.

**Licenciatura en 1952:**
Morris Chang obtuvo el título de Bachiller en Ingeniería Mecánica por el MIT en 1952[^3]. Se graduaba durante la Guerra de Corea y, por su condición de estudiante extranjero, no pudo acceder a empleos relacionados con el sector militar estadounidense; esta restricción, paradójicamente, lo orientó hacia la industria civil.

## Inicios de su carrera profesional: Sylvania

### Primer contacto con la industria de semiconductores

**La oportunidad de 1955:**
Tras graduarse, Morris Chang trabajó tres años en Sylvania[^4], su primer contacto con la industria de semiconductores. El sector estaba entonces en pañales, pero Chang percibió agudamente el enorme potencial de esta industria naciente.

**Desarrollo de capacidades técnicas:**
En Sylvania, Chang se encargó de la fabricación de dispositivos semiconductores, aprendiendo los fundamentos de los procesos de manufactura. Esta experiencia le hizo comprender la complejidad y precisión de la fabricación de semiconductores, cultivando su atención al detalle técnico.

**Destellos de talento directivo:**
Incluso en puestos técnicos de base, Chang demostró sobresalientes dotes de gestión. Sabía organizar equipos y resolver problemas técnicos; esos tres años le enseñaron los exigentes requisitos de la manufactura de semiconductores.

## Etapa en Texas Instruments: Despliegue del talento directivo

### El punto de inflexión de 1958

**Ingreso en Texas Instruments:**
En 1958, Morris Chang se incorporó a Texas Instruments (TI)[^5], momento crucial de su carrera. TI expandía agresivamente su negocio de semiconductores y necesitaba precisamente talentos capaces de tender puentes entre ingeniería y gestión.

**De ingeniero a directivo:**
En TI, Chang comenzó como ingeniero de semiconductres, a cargo de la producción de obleas. Destacó técnicamente y mostró al mismo tiempo excepcionales capacidades directivas, ganándose rápidamente la estima de sus superiores.

**Aportes a la mejora de procesos:**
Durante su etapa en TI, Chang mejoró significativamente los procesos de semiconductores de la empresa, elevando el rendimiento y la eficiencia productiva. Estas mejoras técnicas ahorraron cuantiosos costos a la compañía y le granjearon reputación.

### Estudios de posgrado en la Universidad de Stanford

**Oportunidad de formación en 1961:**
En 1961, Texas Instruments patrocinó a Morris Chang para cursar el doctorado en Ingeniería Eléctrica en la Universidad de Stanford. Fue un reconocimiento a sus capacidades y una muestra de la importancia que las empresas estadounidenses daban al desarrollo del talento.

**Obtención del doctorado:**
En 1964, Morris Chang obtuvo el doctorado en Ingeniería Eléctrica por Stanford[^6]. Esta etapa profundizó su solidez teórica y amplió su red de contactos en la industria; a su regreso a TI fue ascendido de inmediato.

**Nuevo rol tras el doctorado:**
Tras doctorarse, Chang volvió a TI para asumir cargos directivos de mayor nivel. Dirigió sucesivamente la División de Transistores de Germanio, la División de Transistores de Silicio y la División de Circuitos Integrados, escalando posiciones en la empresa año tras año.

### Rompiendo el techo de cristal racial

**Ascenso histórico en 1972:**
En 1972, Morris Chang fue ascendido a Vicepresidente General de Texas Instruments[^7], convirtiéndose en uno de los ejecutivos chinos de más alto rango en las grandes corporaciones estadounidenses de la época. En el entorno empresarial estadounidense de entonces, era un logro extraordinario.

**Director General del Grupo de Semiconductores:**
Chang asumió simultáneamente la Dirección General del Grupo de Semiconductores, a cargo del negocio nuclear de la compañía. Bajo su liderazgo, el negocio de semiconductores de TI se desarrolló rápidamente, consolidándose como uno de los principales proveedores mundiales.

**Balance de 25 años en Estados Unidos:**
En sus 25 años en TI, Chang ascendió desde ingeniero de base a alto directivo, adquiriendo una comprensión profunda del ritmo tecnológico y la lógica comercial de la industria de semiconductores. Esta experiencia hizo que su juicio de mercado al regresar a Taiwán para emprender en 1987 fuera mucho más certero que el de cualquiera con solo formación académica.

## La llamada de Taiwán: Etapa como presidente del ITRI

### El punto de inflexión vital de 1985

**La invitación de Sun Yun-suan:**
En 1985, Morris Chang recibió la invitación del ex primer ministro Sun Yun-suan[^8], del presidente del ITRI Hsu Hsien-chu, del primer ministro Yu Kuo-hwa y del ministro sin cartera Li Kuo-ting, para asumir la presidencia del Instituto de Investigaciones de Tecnología Industrial (ITRI). Sun Yun-suan llevaba años impulsando el desarrollo de la industria de alta tecnología en Taiwán y fue el principal artífice del regreso de Chang. Esta decisión cambió su trayectoria vital y el destino de la industria tecnológica taiwanesa.

**Valentía para salir de la zona de confort:**
A sus 54 años, Chang gozaba en Estados Unidos de una carrera exitosa y una vida acomodada. Elegir regresar a Taiwán fue una decisión cargada de riesgos y desafíos, que evidenció su sentido de misión hacia el desarrollo tecnológico de Taiwán.

**Reforma del ITRI:**
Durante su presidencia, Chang impulsó la estrecha integración entre I+D e industria, reorientando las líneas de investigación del ITRI con mentalidad gerencial estadounidense. Su visión internacional transformó al ITRI, de organismo gubernamental de investigación, en una incubadora tecnológica con mayor conciencia comercial.

### Evaluación de la industria de semiconductores de Taiwán

**Análisis del entorno industrial:**
Chang analizó detenidamente el entorno y las ventajas de Taiwán. Consideraba que la isla disponía de excelentes ingenieros, costos menores y capacidad de manufactura flexible, condiciones idóneas para desarrollar la fabricación de semiconductores.

**Gestación del modelo de fundición:**
Durante su etapa en el ITRI, Chang comenzó a concebir un modelo de negocio revolucionario: la fundición profesional de obleas. Esta idea surgió de su profunda percepción de las tendencias industriales y fue la cristalización de sus años de experiencia en el sector.

**Importancia del apoyo gubernamental:**
Chang comprendió que el desarrollo de la industria de semiconductores requería respaldo gubernamental pleno, incluyendo inversión de capital, coordinación de políticas y formación de talento. Mantuvo estrecha comunicación con funcionarios para asegurar, para la creación de TSMC, una estructura especial que combinaba transferencia tecnológica del ITRI e inversión accionarial gubernamental.

## El nacimiento de TSMC: La innovación de 1987

### Ruptura del concepto de fundición profesional

**Innovación del concepto de fundición:**
En 1987, Morris Chang propuso el concepto innovador de «fundición profesional de obleas»[^11]. A diferencia del modelo tradicional de fabricantes integrados de dispositivos (IDM), TSMC se centraría exclusivamente en la fabricación por encargo de chips para clientes, sin diseñar productos propios.

**Revolución del modelo de negocio:**
Lo revolucionario de este modelo residía en permitir que numerosas empresas sin capacidad para construir fábricas de obleas pudieran diseñar chips avanzados, reduciendo drásticamente la barrera de entrada a la industria de semiconductores y propiciando el crecimiento exponencial de las empresas de diseño de chips (fabless) desde los años 1990 hasta los 2020.

**Impacto en el ecosistema industrial:**
El modelo de fundición profesional creó un ecosistema industrial totalmente nuevo, permitiendo que las empresas de diseño se concentren en la innovación y las fundiciones en la manufactura, realizando una división profesional del trabajo que elevó la eficiencia de toda la industria.

### Proceso de fundación de TSMC

**Momento histórico del 21 de febrero de 1987:**
El 21 de febrero de 1987, Taiwan Semiconductor Manufacturing Company se constituyó formalmente, con una inversión total de aproximadamente 145 millones de dólares: el gobierno invirtió 70 millones (48,3 %), Philips de Países Bajos 40 millones (27,5 %) y el sector privado taiwanés 35 millones (24,2 %)[^9]. Fue el fruto de la cooperación entre gobierno, empresas privadas e inversores extranjeros.

**Diseño de la estructura accionarial:**
La estructura accionarial de TSMC incluía al ITRI, a Philips de Países Bajos y a empresas privadas taiwanesas[^10]. Esta estructura diversificada aportó a TSMC recursos tecnológicos, financieros y de mercado.

**Doble rol de Morris Chang:**
Chang asumió la presidencia y la dirección general de TSMC (posteriormente renombrada como CEO), a cargo de la estrategia global y la operación diaria. Su estilo directivo combinaba la eficiencia de la gestión estadounidense con la sabiduría de la cultura china.

## Trayectoria de desarrollo de TSMC

### Desafíos y avances en la etapa inicial

**1987-1990: Dificultades del arranque:**
En sus inicios, TSMC enfrentó enormes desafíos. La fundición profesional era un modelo de negocio completamente nuevo; el mercado lo miraba con escepticismo y los clientes necesitaban tiempo para aceptarlo. Chang tuvo que construir simultáneamente la capacidad de manufactura y convencer a los clientes.

**Construcción de la capacidad técnica:**
La tecnología inicial de TSMC provenía de la transferencia del ITRI y la cooperación con Philips. Chang lideró al equipo para aprender y mejorar rápidamente los procesos, estableciendo una capacidad de manufactura fiable.

**Apertura de la primera cartera de clientes:**
Los primeros clientes de TSMC fueron principalmente empresas fabless estadounidenses. Estas compañías necesitaban precisamente servicios profesionales de fundición, proporcionando a TSMC una base de negocio temprana.

### Desarrollo acelerado en los años 1990

**Estrategia de liderazgo tecnológico:**
En los años 1990, Chang formuló la estrategia de «liderazgo tecnológico», invirtiendo masivamente en I+D para asegurar que TSMC no quedara rezagada en ninguna generación de procesos. TSMC construyó sucesivamente múltiples fábricas de obleas en Taiwán, y su cartera de clientes se expandió desde las primeras empresas fabless estadounidenses hasta Qualcomm, Broadcom, NVIDIA y otras grandes empresas de diseño globales.

### Liderazgo en el siglo XXI

**Competencia en procesos avanzados:**
Entrado el siglo XXI, el desarrollo de la tecnología de procesos de semiconductores se volvió cada vez más difícil y costoso. TSMC, gracias a una inversión en I+D sostenidamente superior a la media del sector, mantuvo el liderazgo en el ámbito de procesos avanzados.

**Avances de 28 nm a 5 nm:**
Desde 28 nm hasta 16 nm, 7 nm, y luego 5 nm y 3 nm, TSMC mantuvo el liderazgo tecnológico en cada generación de procesos avanzados, consolidando su posición en el mercado de alta gama.

**Hito de la colaboración con Apple:**
La colaboración con Apple, iniciada en 2013 con la serie A de chips, hizo que TSMC fabricara los procesadores nucleares de iPhone y iPad, aportando volúmenes de pedidos masivos y sometiendo la capacidad de procesos avanzados de TSMC a la verificación comercial más exigente[^12].

## Filosofía de gestión y pensamiento directivo

### Insistencia en la innovación tecnológica

**Énfasis en la inversión en I+D:**
Chang siempre subrayó la importancia de la innovación tecnológica; TSMC destina anualmente alrededor del 8 % de sus ingresos a I+D, garantizando no quedar rezagada frente a competidores[^13]. En la era en que la ley de Moore topa con límites físicos, bajo su mandato TSMC logró la producción en masa de 7 nm; los 5 nm (2020) y 3 nm (2022) son logros del equipo sucesor; cada generación de procesos avanzados ha proporcionado capacidad de manufactura para el desarrollo de toda la industria de semiconductores.

**Equilibrio entre tecnología y mercado:**
Chang supo hallar el punto de equilibrio entre liderazgo tecnológico y demanda de mercado, manteniendo la ventaja técnica y asegurando al mismo tiempo su valor comercial, evitando que un exceso de vanguardia disparara los costos.

### Cultivo del talento y cultura corporativa

**Cultura corporativa de integridad:**
Chang estableció en TSMC una cultura corporativa centrada en la integridad. Enfatizó los valores nucleares de «integridad, compromiso, innovación, confianza del cliente», que se convirtieron en los cimientos culturales de TSMC.

**Importancia al desarrollo del talento:**
Chang otorgó gran relevancia al cultivo del talento, creando en TSMC un sistema sistemático de formación y promoción de ingenieros. Considera que el talento es la competitividad nuclear de la empresa; TSMC mantiene una tasa de rotación muy inferior a la media del sector y ha formado a líderes como Mark Liu (劉德音) y C. C. Wei (魏哲家), que luego dirigieron la compañía.

**Estilo directivo internacionalizado:**
Chang introdujo en TSMC la eficiencia y transparencia de la gestión estadounidense, construyendo una estructura moderna de gobierno corporativo. Al mismo tiempo, integró la sabiduría de la cultura china, creando una cultura empresarial única.

### Pensamiento estratégico y capacidad de ejecución

**Formulación de estrategia a largo plazo:**
Chang posee una excepcional capacidad de pensamiento estratégico, capaz de percibir tendencias industriales y formular estrategias de desarrollo a largo plazo. La estrategia de «liderazgo tecnológico» de TSMC es la manifestación de su visión estratégica.

**Énfasis en la ejecución:**
Más allá de la formulación estratégica, Chang valoró enormemente la ejecución. Estableció un sistema de gestión preciso que permite que los planes tecnológicos vayan de la decisión a la fábrica de obleas; esta es la razón clave por la que TSMC puede seguir el ritmo de cada generación de procesos.

**Sabiduría en la gestión de crisis:**
Ante diversas crisis y desafíos, Chang demostró sobresaliente capacidad directiva y sabiduría para la gestión de crisis, guiando a TSMC a superar múltiples períodos difíciles y mantener un desarrollo estable.

## Jubilación y sucesión

### Primera jubilación en 2005

**Puesta en marcha del plan de sucesión:**
En 2005, a los 74 años, Morris Chang anunció su jubilación, cediendo el cargo de CEO a Rick Tsai (蔡力行)[^14]. Fue parte de un plan de sucesión meticulosamente preparado, que reflejó su sentido de responsabilidad por el desarrollo sostenible de la empresa.

**Mantenimiento de la presidencia:**
Aunque dejó la dirección general, Chang conservó la presidencia, continuando su participación en las grandes decisiones estratégicas y brindando orientación y apoyo al equipo sucesorio.

**Vida tras la jubilación:**
Tras jubilarse, Chang no se desvinculó por completo de la actividad empresarial; asistió a foros internacionales como APEC en calidad de representante de Taiwán y compartió en numerosas conferencias sus perspectivas sobre geopolítica y futuro de los semiconductores.

### Regreso en 2009

**Desafío de la crisis financiera:**
La crisis financiera global de 2008 impactó severamente a TSMC, que enfrentó caída de resultados y competencia intensificada. En ese momento crítico, Chang decidió volver.

**Nuevo mandato como CEO:**
En 2009, a los 78 años, Morris Chang reassumió el cargo de CEO de TSMC[^15], liderando personalmente a la empresa fuera de la dificultad. Su regreso estabilizó la confianza del mercado y aportó liderazgo para la recuperación.

**Formación de Liu y Wei:**
Durante su segundo mandato, Chang se centró en formar a sucesores como Mark Liu y C. C. Wei, preparando el talento para el futuro de la compañía.

### Jubilación formal en 2018

**Finalización del plan de sucesión:**
En junio de 2018, a los 87 años, Morris Chang se jubiló formalmente, cerrando 31 años de trayectoria legendaria en TSMC[^16]. Cedió la presidencia a Mark Liu y la dirección general a C. C. Wei.

**Establecimiento del sistema de doble dirección:**
Chang instauró un «sistema de doble dirección»: Mark Liu como presidente a cargo de asuntos externos, C. C. Wei como CEO a cargo de la operación interna; este arreglo institucional favorece el desarrollo estable de la empresa.

**Paradigma de retirada tras cumplir la misión:**
La jubilación de Chang es considerada un modelo de sucesión empresarial: se retiró en el momento oportuno, dejando espacio suficiente a la nueva generación de líderes y asegurando al mismo tiempo una transición estable.

## Impacto en la industria global de semiconductores

### Innovación del modelo de negocio

**Difusión del modelo de fundición profesional:**
El modelo de fundición profesional creado por Chang se ha convertido en uno de los modelos de negocio estándar de la industria de semiconductores. Cientos de empresas fabless en el mundo dependen de los servicios de las fundiciones; este modelo ha impulsado enormemente el desarrollo del sector.

**Reconfiguración del ecosistema industrial:**
El modelo de fundición profesional reconfiguró el ecosistema de la industria de semiconductores, fomentando la división profesional del trabajo, elevando la eficiencia industrial y reduciendo la barrera de la innovación, permitiendo que más empresas participen en el diseño de chips.

**Construcción de la cadena de suministro global:**
TSMC se convirtió en nodo clave de la cadena de suministro global de semiconductores, proveyendo servicios de manufactura a empresas tecnológicas de todo el mundo, estableciendo una cadena de suministro verdaderamente globalizada.

### Impulso al progreso tecnológico

**Liderazgo en tecnología de procesos:**
Bajo el liderazgo de Chang, TSMC mantuvo el liderazgo global en tecnología de procesos, impulsando el progreso tecnológico de toda la industria de semiconductores y prolongando la vigencia de la ley de Moore.

**Democratización de procesos avanzados:**
Los servicios de procesos avanzados de TSMC permiten que empresas de diseño de menor escala también utilicen la tecnología más reciente, realizando la «democratización» de los procesos avanzados: una startup fabless de unas decenas de personas puede encargar a TSMC la producción en masa de chips de 7 nm.

**Apertura de nuevos ámbitos tecnológicos:**
La capacidad de manufactura de TSMC abarca chips digitales, aceleradores de IA, semiconductores para automoción y otros ámbitos de aplicación, proveyendo base de manufactura a diversas tecnologías emergentes.

## Significado para Taiwán: Fundador de la isla tecnológica

### Desarrollo de la industria tecnológica

**Establecimiento de la montaña sagrada protectora:**
TSMC es llamada la «montaña sagrada protectora» de Taiwán, no solo por su enorme valor económico, sino por su posición clave en la cadena de suministro tecnológica global. Chang construyó para Taiwán el activo estratégico más difícil de sustituir fuera de la defensa nacional.

**Formación de talento tecnológico:**
El desarrollo de TSMC formó una gran cantidad de profesionales de semiconductores; estos talentos no solo sustentaron el crecimiento de TSMC, sino que proveyeron base de talento a toda la industria tecnológica taiwanesa.

**Formación de clústeres industriales:**
En torno a TSMC, Taiwán formó un clúster industrial de semiconductores que abarca proveedores de equipos, materiales y casas de empaquetado y prueba, creando un enorme valor industrial.

### Contribución al desarrollo económico

**Importante aporte al PIB:**
TSMC se ha convertido en la mayor empresa de Taiwán, con una contribución muy significativa al PIB. Su éxito ha arrastrado el desarrollo de industrias relacionadas, creando abundantes oportunidades de empleo.

**Pilar del comercio exterior:**
Los semiconductores representan aproximadamente un tercio del total de exportaciones de Taiwán; el éxito de TSMC elevó enormemente la posición de Taiwán en el comercio global y reforzó la competitividad de la economía taiwanesa[^17].

**Mejora del entorno de inversión:**
El caso de éxito de TSMC atrajo más inversión internacional, mejoró el entorno de inversión de Taiwán y elevó su estatus ante los inversores globales.

### Influencia geopolítica

**Importancia de la soberanía tecnológica:**
En el actual entorno geopolítico, la tecnología de semiconductores se ha convertido en ficha central de la competencia entre grandes potencias. TSMC domina los procesos más avanzados del mundo, dotando a Taiwán de una posición estratégica insustituible en la comunidad internacional.

**Ficha en las relaciones internacionales:**
La posición clave de TSMC en la cadena de suministro tecnológica global otorga a Taiwán, en temas de semiconducteres, una capacidad de interlocución que las grandes potencias deben tomar en serio. EE. UU., la UE y Japón han ofrecido subsidios sucesivamente para atraer a TSMC a construir fábricas, lo que evidencia el peso real de este estatus.

**Consideraciones de estrategia de seguridad:**
La atención de各国 a la tecnología de semiconductores plantea a Taiwán nuevos desafíos y oportunidades de seguridad. Cómo equilibrar los intereses de todas las partes y mantener la ventaja competitiva de TSMC es uno de los temas nucleares de la política exterior y de seguridad de Taiwán.

## Rasgos personales y estilo de liderazgo

### Combinación de visión y capacidad de ejecución

**Excepcional visión estratégica:**
El mayor rasgo de Chang es su excepcional visión estratégica. Capaz de percibir tendencias industriales y prever direcciones futuras de desarrollo, esta previsión es factor clave del éxito de TSMC.

**Capacidad de ejecución pragmática:**
Además de visión, Chang posee sobresaliente capacidad de ejecución. Sabe transformar concepciones estratégicas en planes de acción concretos y dar seguimiento a cada detalle de ejecución; esta combinación de pensamiento estratégico y capacidad ejecutiva es rara en el mundo empresarial.

**Actitud de aprendizaje permanente:**
Incluso en edad avanzada, Chang mantiene el hábito de leer ampliamente y seguir la evolución industrial. Lee dos libros en inglés al mes y lleva setenta años leyendo _The New Yorker_ sin interrupción; él dice que esos libros «no son literatura». Esta actitud mantiene su pensamiento agudo incluso en la vejez.

### Características del estilo de liderazgo

**Liderazgo carismático:**
Chang posee fuerte carisma personal y capacidad de persuasión, capaz de motivar al equipo para esforzarse por metas comunes. Sus discursos y artículos expresan siempre con claridad conceptos complejos, ganándose el profundo respeto de empleados y profesionales del sector.

**Insistencia en la decisión racional:**
Ante decisiones mayores, Chang se ciñe siempre al análisis racional, basando sus juicios en hechos y datos, evitando que emociones o consideraciones políticas afecten la corrección de las decisiones.

**Práctica del pensamiento a largo plazo:**
Chang mantiene invariablemente el pensamiento a largo plazo, sin dejarse influir por dificultades o intereses de corto plazo. En lo más hondo de la crisis financiera de 2008, aprobó aún el presupuesto de I+D para procesos avanzados; precisamente esta perspectiva de largo plazo permitió a TSMC ampliar su ventaja sobre rivales tras la crisis.

## Honores y reconocimientos

### Premios y reconocimientos internacionales

**Medalla de Honor del IEEE:**
Chang ha recibido múltiples medallas de honor del Instituto de Ingenieros Eléctricos y Electrónicos (IEEE), importante reconocimiento a su contribución al desarrollo de la tecnología de semiconductores.

**Doctorados honoris causa:**
Incluyendo la Universidad Nacional Tsing Hua, la Universidad Nacional Chiao Tung, la Universidad Nacional de Taiwán y otras, le han conferido doctorados honoris causa, en reconocimiento a sus aportes a la industria tecnológica y la educación.

**Selecciones de revistas empresariales:**
Chang ha sido incluido repetidamente por _Fortune_, _BusinessWeek_ y otras revistas empresariales internacionales entre los líderes contemporáneos más destacados de la industria tecnológica, consolidando su estatus en el mundo empresarial global.

### Reconocimientos en Taiwán

**Condecoraciones gubernamentales:**
El gobierno de Taiwán ha concedido a Chang múltiples condecoraciones importantes, en reconocimiento a sus contribuciones sobresalientes al desarrollo económico y al progreso tecnológico de Taiwán.

**Reverencia del sector industrial:**
Chang es venerado por la industria taiwanesa como el «padre de los semiconductores»; su experiencia y sabiduría se han convertido en modelo de aprendizaje para las nuevas generaciones de empresarios.

**Reconocimiento de la influencia social:**
Más allá de los logros empresariales, la influencia social de Chang ha obtenido amplio reconocimiento; su contribución al desarrollo de la sociedad taiwanesa es altamente valorada por todos los sectores.

## Reflexiones filosóficas y sabiduría vital

### Comprensión del éxito

**Combinación de capacidad y oportunidad:**
Chang considera que el éxito requiere la combinación de capacidad y oportunidad; la capacidad es la base, pero también hay que saber aprovechar el momento. Enfatiza la importancia de la preparación: la oportunidad siempre favorece a quien está preparado.

**Valor de la persistencia a largo plazo:**
Subraya la importancia de la persistencia a largo plazo, convencido de que el verdadero éxito necesita acumulación temporal y no puede buscarse con prisas. El éxito de TSMC es resultado de la persistencia a largo plazo.

**Necesidad de la innovación:**
Chang estima que en la industria tecnológica la innovación es condición necesaria para la supervivencia. La historia de TSMC demuestra: basta detener el avance en procesos para que los competidores llenen el vacío.

### Reflexiones sobre la vida

**Equilibrio entre trabajo y vida:**
Pese al gran éxito profesional, Chang también enfatiza la importancia del equilibrio entre trabajo y vida. Gusta de la lectura y la música; estos hobbies le proporcionan nutrición espiritual.

**Asunción de responsabilidad social:**
Chang cree que los empresarios de éxito tienen la responsabilidad de retribuir a la sociedad; impulsó donaciones de TSMC a instituciones académicas como la Universidad Nacional Tsing Hua, participó en debates sobre políticas educativas y formuló propuestas concretas para la reforma de la educación superior en Taiwán[^18].

**Importancia de la transmisión:**
Concede gran importancia a la transmisión de conocimientos y experiencia; no solo forma sucesores dentro de la empresa, sino que comparte su experiencia y sabiduría por diversas vías.

## Valoración histórica

Cuando Morris Chang se jubiló en 2018, la capitalización bursátil de TSMC superó a la de Intel, convirtiéndose en la empresa de semiconductores más valiosa del mundo[^19]. En 31 años verificó una proposición contraintuitiva: una fundición que no diseña sus propios chips puede convertirse en la base de manufactura de toda la era digital.

Desde Ningbo, Zhejiang, a Harvard, MIT, y desde la alta dirección de Texas Instruments hasta renunciar a los 54 años a una vida cómoda en Estados Unidos para regresar a Taiwán, cada uno de sus giros no fue la opción mayoritaria, pero todos apuntaron en la misma dirección. La posición actual de TSMC es tanto el resultado de la competencia tecnológica en semiconductores como el fruto de aquella apuesta de 1987 por un modelo de negocio en el que pocos creían.

La capitalización de TSMC superó por primera vez los 10 billones de dólares taiwaneses en julio de 2020 y los 20 billones en marzo de 2024, convirtiéndose en una de las empresas tecnológicas de mayor valor bursátil de Asia[^20]; es una escala difícil de imaginar cuando hizo aquella apuesta en 1987, y la nota al pie más nítida de toda su vida.

## Lecturas complementarias

- [Empresa taiwanesa: TSMC](/es/economy/tsmc) — La montaña sagrada protectora que él fundó en 1987 con el modelo de fundición de obleas y que hoy supera los 60 billones en capitalización, es en sí misma la nota al pie más completa de Morris Chang
- [Stan Shih (施振榮)](/es/people/stan-shih) — Fundador de Acer, invitado a formar parte del consejo de TSMC durante veintiún años, autor de la «curva de la sonrisa»; el «segmento medio de manufactura» que hace TSMC es precisamente el tramo que la curva pronosticaba en declive pero que en la realidad resulta el más valioso
- [Terry Gou (郭台銘)](/es/people/terry-gou) — Otro empresario taiwanés que cambió el mundo con la «fundición»; la fundición de ensamblaje de Foxconn y la fundición de obleas de TSMC son las dos vías por las que la manufactura taiwanesa llegó al mundo
- [Industria de semiconductores](/es/technology/taiwan-semiconductor-industry) — Desde la transferencia tecnológica de RCA en 1976 hasta la montaña sagrada protectora, el campo de batalla industrial completo en el que Chang introdujo a Taiwán de la mano
- [John Hsu (黃崇仁)](/es/people/frank-huang-psmc) — A finales de los 90, cuando Powerchip (力晶) estuvo a punto de ser absorbida por UMC (聯電), corrió a buscar a Chang; recorrió la otra ruta de los semiconductores taiwaneses, la que tiene acantilados
- [Transformación y升級 de la industria taiwanesa](/es/economy/industrial-transformation-from-manufacturing-to-innovation) — TSMC es el caso más concreto de la transformación de Taiwán de «isla de la fundición» a «isla tecnológica», y la coordenada nuclear de esta transformación de cuarenta años

---

## Referencias

[^1]: Morris Chang nació el 10 de julio de 1931 en Ningbo, provincia de Zhejiang, China. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^2]: En 1949 ingresó en la Universidad de Harvard cursando Letras; un año después se transfirió al MIT para Ingeniería Mecánica. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^3]: En 1952 obtuvo el título de Bachiller en Ingeniería Mecánica por el MIT. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^4]: Desde 1955 trabajó en Sylvania (希凡尼亞) en fabricación de semiconductores durante aproximadamente tres años. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^5]: En 1958 se incorporó a Texas Instruments como ingeniero de semiconductores. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^6]: En 1964 obtuvo el doctorado en Ingeniería Eléctrica por la Universidad de Stanford. Véase: Wikipedia en inglés «Morris Chang» <https://en.wikipedia.org/wiki/Morris_Chang>

[^7]: En 1972 ascendió a Vicepresidente General de Texas Instruments y Director General del Grupo de Semiconductores. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^8]: Sun Yun-suan (孫運璿, 1913–2006), fue primer ministro (1978–1984); durante su mandato impulsó vigorosamente la industria de semiconductores y tecnológica. Véase: Wikipedia «Sun Yun-suan» <https://zh.wikipedia.org/wiki/%E5%AD%AB%E9%81%8B%E7%92%87>

[^9]: TSMC se constituyó el 21 de febrero de 1987; el gobierno invirtió 70 millones de USD (48,3 %), Philips 40 millones (27,5 %) y el sector privado 35 millones (24,2 %). Véase: Wikipedia «Taiwan Semiconductor Manufacturing» <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^10]: Los accionistas fundadores de TSMC incluían a Philips de Países Bajos. Véase: Wikipedia «Taiwan Semiconductor Manufacturing» <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^11]: En 1987 Morris Chang propuso el modelo de negocio de «fundición profesional de obleas» puro. Véase: Wikipedia «Taiwan Semiconductor Manufacturing» <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^12]: TSMC fabrica para la serie A de Apple y otros procesadores móviles desde la década de 2010; a partir de 2013 se convirtió en proveedor principal de los chips nucleares del iPhone. Véase: Wikipedia «Taiwan Semiconductor Manufacturing» <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^13]: TSMC destina anualmente alrededor del 8 % de sus ingresos a I+D (la proporción varía ligeramente según el informe anual). Véase: Wikipedia «Taiwan Semiconductor Manufacturing» <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^14]: En 2005 Morris Chang dejó el cargo de CEO, sucedido por Rick Tsai (蔡力行). Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^15]: En 2009, a los 78 años, Morris Chang volvió a asumir el cargo de CEO de TSMC debido a la crisis financiera global. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^16]: El 5 de junio de 2018 Morris Chang se jubiló formalmente; Mark Liu (劉德音) asumió la presidencia y C. C. Wei (魏哲家) la dirección general. Véase: Wikipedia «Morris Chang» <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^17]: [Economía de Taiwán — Wikipedia en chino](https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%B6%93%E6%BF%9F) — Los semiconductores representan aproximadamente tres décimas partes de las exportaciones de Taiwán desde hace años.

[^18]: [Buena obra empresarial por la educación: «Facultad de Gestión Tecnológica - Edificio TSMC» se inaugura — Universidad Nacional Tsing Hua](https://www.nthu.edu.tw/hotNews/content/708) — TSMC donó 180 millones de dólares taiwaneses para construir el «Edificio TSMC» de la Facultad de Gestión Tecnológica de Tsing Hua, inaugurado en abril de 2008; la donante fue TSMC, no Morris Chang a título personal.

[^19]: En 2018, al jubilarse Morris Chang, la capitalización de TSMC ya había superado a la de Intel. Véase: Wikipedia «Taiwan Semiconductor Manufacturing» <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^20]: La capitalización de TSMC superó por primera vez los 10 billones de dólares taiwaneses el 21 de julio de 2020 y los 20 billones el 8 de marzo de 2024. Véase: Wikipedia «Taiwan Semiconductor Manufacturing» <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

_Referencias:_

- [Autobiografía de Morris Chang (volumen superior + inferior)](https://www.books.com.tw/products/0010784799)
- [Informes anuales y materiales oficiales de TSMC](https://investor.tsmc.com/english/annual-reports)
- [Instituto de Investigaciones de Tecnología Industrial (ITRI)](https://www.itri.org.tw/)
- [Wikipedia «Morris Chang»](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [Materiales relacionados con Morris Chang de la Universidad Nacional Tsing Hua](https://www.nthu.edu.tw/)
