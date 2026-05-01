---
title: 'Morris Chang'
description: 'El padrino de los semiconductores, fundador de TSMC, el empresario legendario que transformó la industria tecnológica mundial con el modelo de fundición de obleas'
date: 2026-03-17
tags: [人物, 張忠謀, 台積電, 半導體, 企業家, 晶圓代工, 護國神山]
subcategory: '科技與企業'
lastVerified: 2026-03-19
lastHumanReview: false
featured: true
translatedFrom: 'People/張忠謀.md'
sourceCommitSha: '4a5b7958'
sourceContentHash: 'sha256:cd227d8ac5698cc4'
translatedAt: '2026-05-01T20:54:23+08:00'
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
  intro: 'Un hijo de banquero chino que a los 14 años se exilió en Hong Kong, a los 18 estudió literatura en Harvard y a los 20 cambió a ingeniería en MIT, regresó a Taiwán a los 54 años para fundar TSMC tras dejar un cargo de vicepresidente en Estados Unidos. Este árbol traza cada cruce de fronteras (geográficas, de habilidades, de modelos de negocio, generacionales) que eligió, y también los caminos que no tomó: desde continuar en literatura en Harvard hasta quedarse en la seguridad del camino estadounidense o perpetuar el modelo IDM.'
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
---

# Morris Chang (張忠謀)

Morris Chang, el empresario legendario conocido como el "Padrino de los Semiconductores", es el fundador de Taiwan Semiconductor Manufacturing Company (TSMC, 台積電). No solo creó la primera empresa especializada en fundición de obleas (foundry) del mundo, sino que además inauguró un modelo de negocio que transformó el ecosistema de la industria tecnológica global. Desde ejecutivo de origen chino en Texas Instruments en Estados Unidos hasta fundador de TSMC en Taiwán, su trayectoria vital ha sido testigo de la evolución de la industria mundial de semiconductores y ha consolidado la posición clave de Taiwán en la cadena de suministro tecnológico global.

## Resumen en 30 segundos

**¿Por qué el mundo debería conocer a Morris Chang?**

La TSMC fundada por Morris Chang no es solo la fundición de obleas más grande del mundo, sino también un pilar fundamental de la civilización digital moderna. Desde teléfonos inteligentes y computadoras hasta chips de inteligencia artificial, la gran mayoría de los semiconductores avanzados del mundo son fabricados por TSMC. Su modelo de negocio de "fundición pura" permitió a innumerables empresas tecnológicas concentrarse en el diseño de chips sin necesidad de invertir enormes sumas en la construcción de fábricas de obleas, transformando radicalmente el ecosistema de la industria tecnológica mundial.

TSMC es conocida como la "montaña sagrada protectora de la nación" (護國神山) de Taiwán, con una importancia estratégica significativa en el ámbito geopolítico. Morris Chang no es solo un empresario exitoso, sino un innovador que cambió el mundo. Su historia es una leyenda de visión de futuro, perseverancia y sabiduría empresarial.

## Vida temprana y formación académica

### Crecimiento en tiempos turbulentos

**Nacimiento y contexto familiar:**
El 10 de julio de 1931, Morris Chang nació en Ningbo, provincia de Zhejiang, China. Su padre, Zhang Weiguan, era banquero, y su madre, Xu Yuzheng, provenía de una familia de tradición literaria. En aquellos tiempos convulsos, una sólida educación familiar le proporcionó una profunda base cultural.

**Experiencias de migración en la infancia:**
Debido a la guerra, la infancia de Morris Chang estuvo marcada por constantes desplazamientos. De Ningbo a Shanghái, Nankín, Chongqing, Shanghái de nuevo, Cantón, Hong Kong y finalmente Estados Unidos, esta experiencia itinerante forjó su capacidad de adaptación y su visión internacional.

**Años de estudio en Hong Kong:**
En 1945, Morris Chang, de 14 años, se trasladó con su familia a Hong Kong, donde recibió educación secundaria bajo el sistema educativo colonial británico. El entorno internacionalizado de Hong Kong y la enseñanza en inglés sentaron bases importantes para su posterior formación y carrera en Estados Unidos.

### El giro decisivo de los estudios en Estados Unidos

**La breve experiencia en Harvard:**
En 1949, Morris Chang, de 18 años, ingresó en la Universidad de Harvard para estudiar inicialmente literatura. Sin embargo, un año después, debido a la falta de pasión por la literatura y a consideraciones económicas, se trasladó al Instituto Tecnológico de Massachusetts (MIT).

**La formación en ingeniería en MIT:**
En MIT, Morris Chang eligió ingeniería mecánica como especialidad. Esta decisión, aparentemente casual, sentó las bases de su futuro éxito en el sector manufacturero. La rigurosa formación en ingeniería del MIT cultivó su pensamiento lógico y su capacidad para resolver problemas.

**Graduación como licenciado en 1952:**
Morris Chang obtuvo su licenciatura en ingeniería mecánica del MIT en 1952. En el momento de su graduación, en plena Guerra de Corea, su condición de estudiante extranjero le impedía acceder a empleos relacionados con el sector de defensa estadounidense, una restricción que paradójicamente lo orientó hacia la industria civil.

## Inicio de la carrera profesional: Sylvania

### Primeros pasos en la industria de semiconductores

**La oportunidad de 1955:**
Tras graduarse, Morris Chang trabajó durante tres años en Sylvania, su primer contacto con la industria de semiconductores. En aquel entonces, este sector estaba aún en sus primeras etapas, pero Chang percibió con agudeza el enorme potencial de esta industria emergente.

**Desarrollo de capacidades técnicas:**
En Sylvania, Morris Chang se encargó de la fabricación de dispositivos semiconductores y adquirió conocimientos fundamentales sobre los procesos de fabricación. Esta experiencia le permitió comprender la complejidad y precisión de la manufactura de semiconductores, y cultivó su atención al detalle técnico.

**Primeros signos de talento gerencial:**
Incluso en puestos técnicos de base, Morris Chang demostró una destacada capacidad de gestión. Era capaz de organizar equipos de manera eficaz y resolver problemas técnicos, sentando las bases de su futura carrera gerencial.

## Período en Texas Instruments: el despliegue del talento gerencial

### El giro decisivo de 1958

**Incorporación a Texas Instruments:**
En 1958, Morris Chang se unió a Texas Instruments (TI), el punto de inflexión más importante de su carrera. En aquel momento, TI estaba expandiendo activamente su negocio de semiconductores, ofreciéndole un escenario de desarrollo incomparable.

**De ingeniero a gerente:**
En Texas Instruments, Morris Chang comenzó como ingeniero de semiconductores encargado de la producción de obleas. No solo se destacó técnicamente, sino que, lo que es más importante, demostró una excepcional capacidad gerencial, ganando rápidamente el reconocimiento de sus superiores.

**Contribuciones a la mejora de procesos:**
Durante su tiempo en TI, Morris Chang mejoró significativamente los procesos de semiconductores de la empresa, aumentando el rendimiento de producción y la eficiencia. Estas mejoras técnicas generaron ahorros sustanciales para la compañía y le valieron un sólido prestigio.

### Estudios de posgrado en Stanford

**La oportunidad de estudio en 1961:**
En 1961, Texas Instruments apoyó a Morris Chang para que cursara un doctorado en ingeniería eléctrica en la Universidad de Stanford. Este respaldo fue un reconocimiento a su capacidad y reflejó la importancia que las empresas estadounidenses otorgan a la formación de talento.

**Los logros del doctorado:**
En 1964, Morris Chang obtuvo su doctorado en ingeniería eléctrica de Stanford. Esto no solo fortaleció sus competencias técnicas, sino que, más importante aún, amplió su visión y su red de contactos profesionales.

**Nuevo rol al regresar a la empresa:**
Tras completar su doctorado, Chang regresó a Texas Instruments, donde asumió puestos gerenciales de mayor responsabilidad. Ocupó sucesivamente los cargos de gerente general del departamento de transistores de germanio, gerente general del departamento de transistores de silicio y gerente general del departamento de circuitos integrados, con una trayectoria profesional en constante ascenso.

### Rompiendo el techo racial

**El ascenso histórico de 1972:**
En 1972, Morris Chang fue promovido a vicepresidente del grupo de Texas Instruments, convirtiéndose en uno de los ejecutivos de origen chino de más alto rango en una gran empresa estadounidense de la época. Este ascenso fue un logro extremadamente infrecuente en el entorno empresarial estadounidense de entonces.

**Gerente general del grupo de semiconductores:**
Chang asumió simultáneamente el cargo de gerente general del grupo de semiconductores de TI, responsable del área de negocio más importante de la empresa. Bajo su liderazgo, el negocio de semiconductores de Texas Instruments experimentó un rápido desarrollo, consolidando a la compañía como uno de los principales proveedores mundiales de semiconductores.

**Balance de 25 años en Estados Unidos:**
Durante sus 25 años en Texas Instruments, Morris Chang ascendió desde ingeniero de base hasta ejecutivo de alto nivel, acumulando una vasta experiencia técnica y gerencial. Más aún, comprendió a fondo las dinámicas de desarrollo y la lógica comercial de la industria de semiconductores.

## El llamado de Taiwán: período como presidente del ITRI

### El giro vital de 1985

**La invitación de Sun Yun-suan:**
En 1985, Morris Chang fue invitado por Hsien Hsiu-hsien, presidente del Instituto de Investigación de Tecnología Industrial (ITRI, 工研院), el primer ministro Kuo Hua y el comisionado Li Kuo-ting, para asumir la presidencia del ITRI. Esta decisión cambió el curso de su vida y también el destino de la industria tecnológica de Taiwán.

**El coraje de abandonar la zona de confort:**
A sus 54 años, Morris Chang ya había construido una carrera exitosa y una vida acomodada en Estados Unidos. Elegir regresar a Taiwán fue una decisión llena de riesgos y desafíos, que reflejó su sentido de misión hacia el desarrollo tecnológico de Taiwán.

**Reformas en el ITRI:**
Durante su mandato como presidente del ITRI, Chang impulsó vigorosamente la integración de la investigación y el desarrollo con la industria, elevando la capacidad de innovación tecnológica de Taiwán. Su filosofía de gestión y su visión internacional aportaron una nueva dirección de desarrollo al instituto.

### Evaluación de la industria de semiconductores de Taiwán

**Análisis del entorno industrial:**
Morris Chang analizó en profundidad el entorno industrial y las ventajas de Taiwán. Consideró que Taiwán contaba con excelentes talentos de ingeniería, costos relativamente bajos y capacidad de manufactura flexible, condiciones idóneas para desarrollar la manufactura de semiconductores.

**La concepción del modelo de fundición:**
Durante su período en el ITRI, Chang comenzó a idear un modelo de negocio revolucionario: la fundición profesional de obleas. Esta concepción surgió de su profunda comprensión de las tendencias industriales y era el fruto de sus años de experiencia en el sector.

**La importancia del apoyo gubernamental:**
Chang reconoció que el desarrollo de la industria de semiconductores requería un fuerte respaldo gubernamental, incluyendo inversión de capital, apoyo político y formación de talento. Se comunicó activamente con funcionarios gubernamentales para preparar el establecimiento de TSMC.

## El nacimiento de TSMC: la innovación de 1987

### La innovación del modelo de fundición profesional

**El avance del concepto de fundición:**
En 1987, Morris Chang propuso el concepto innovador de "fundición profesional de obleas". A diferencia del modelo tradicional de fabricante de dispositivos integrados (IDM), TSMC se centraría exclusivamente en la producción por encargo de chips para clientes, sin diseñar sus propios productos.

**La naturaleza revolucionaria del modelo de negocio:**
Lo revolucionario de este modelo radicaba en que permitía a empresas sin capacidad para construir fábricas de obleas diseñar chips avanzados, reduciendo drásticamente las barreras de entrada a la industria de semiconductores y fomentando un florecimiento de la innovación.

**Impacto en el ecosistema industrial:**
El modelo de fundición profesional creó un ecosistema industrial completamente nuevo, permitiendo que las empresas de diseño se concentraran en la innovación y las fundiciones en la manufactura, logrando una división especializada del trabajo que elevó la eficiencia de toda la industria.

### El proceso de fundación de TSMC

**El momento histórico del 21 de febrero de 1987:**
El 21 de febrero de 1987, Taiwan Semiconductor Manufacturing Company (TSMC) fue oficialmente constituida con un capital inicial de 22 mil millones de dólares taiwaneses. Fue el resultado de una colaboración conjunta entre el gobierno, empresas privadas e inversores extranjeros.

**Diseño de la estructura accionaria:**
La estructura accionaria de TSMC incluía al ITRI, la empresa holandesa Philips y empresas privadas taiwanesas. Esta estructura accionaria diversificada aportó a TSMC recursos tecnológicos, financieros y de mercado.

**La doble función de Morris Chang:**
Chang asumió los cargos de presidente y gerente general (posteriormente denominado director ejecutivo) de TSMC, responsable de la estrategia general y las operaciones diarias de la empresa. Su estilo de liderazgo combinaba la eficiencia de la gestión al estilo estadounidense con la sabiduría de la cultura china.

## La trayectoria de desarrollo de TSMC

### Los primeros desafíos y avances

**1987-1990: Período fundacional difícil:**
TSMC enfrentó enormes desafíos en sus inicios. La fundición profesional era un modelo de negocio completamente nuevo, el mercado lo recibía con escepticismo y los clientes necesitaban tiempo para aceptar el concepto. Chang debía simultáneamente construir capacidad de manufactura y convencer a los clientes.

**Establecimiento de capacidades técnicas:**
La tecnología inicial de TSMC provino de la transferencia del ITRI y de la colaboración con Philips. Chang lideró al equipo en el aprendizaje rápido y la mejora de los procesos tecnológicos, estableciendo una capacidad de manufactura fiable.

**Captación de los primeros clientes:**
Los primeros clientes de TSMC fueron principalmente empresas fabless (sin fábrica) de Estados Unidos. Estas empresas necesitaban precisamente servicios de fundición profesionales, proporcionando una base comercial inicial para TSMC.

### Rápido desarrollo en la década de 1990

**Estrategia de liderazgo tecnológico:**
En la década de 1990, Chang estableció la estrategia de "liderazgo tecnológico", invirtiendo fuertemente en investigación y desarrollo para asegurar que TSMC mantuviera una posición de vanguardia en tecnología de procesos. Esta estrategia sentó las bases para el desarrollo a largo plazo de la empresa.

**Expansión de capacidad y presencia global:**
Con el aumento de pedidos, TSMC expandió activamente su capacidad, construyendo múltiples fábricas de obleas en Taiwán. Al mismo tiempo, comenzó a considerar una presencia global para acercarse a sus principales clientes y mercados.

**Diversificación de clientes:**
La base de clientes de TSMC se expandió continuamente, desde las primeras empresas fabless estadounidenses hasta las principales empresas de diseño de semiconductores a nivel mundial, incluyendo compañías reconocidas como Qualcomm, Broadcom y NVIDIA.

### Liderazgo en el siglo XXI

**Competencia en procesos avanzados:**
Al ingresar al siglo XXI, el desarrollo de la tecnología de procesos de semiconductores se volvió cada vez más difícil y costoso. TSMC, gracias a su continua inversión en I+D e innovación tecnológica, mantuvo su posición de liderazgo en el ámbito de los procesos avanzados.

**Avances de 28 nm a 5 nm:**
Desde los 28 nm hasta los 16 nm, 7 nm, y luego 5 nm y 3 nm, TSMC mantuvo el liderazgo tecnológico en cada generación de procesos avanzados, consolidando su posición en el mercado de alta gama.

**El hito de la colaboración con Apple:**
La relación de cooperación con Apple, especialmente la producción de procesadores para iPhone e iPad, se convirtió en un hito fundamental en la historia de desarrollo de TSMC, impulsando enormemente los ingresos y la posición de mercado de la empresa.

## Filosofía de gestión y principios empresariales

### Compromiso con la innovación tecnológica

**Énfasis en la inversión en I+D:**
Morris Chang siempre enfatizó la importancia de la innovación tecnológica. TSMC destina anualmente una proporción significativa de sus ingresos a investigación y desarrollo, asegurando el mantenimiento del liderazgo tecnológico. Esta filosofía de inversión a largo plazo es un factor clave del éxito de la empresa.

**La búsqueda de la Ley de Moore:**
En una era en la que la Ley de Moore enfrentaba desafíos, Chang lideró a TSMC en el avance continuo de la tecnología de procesos, prolongando la vigencia de la Ley de Moore y haciendo una contribución significativa al desarrollo de toda la industria de semiconductores.

**Equilibrio entre tecnología y mercado:**
Chang supo encontrar el equilibrio entre el liderazgo tecnológico y la demanda del mercado, manteniendo la ventaja tecnológica al tiempo que aseguraba el valor comercial de la tecnología, evitando que un exceso de adelanto generara costos desproporcionados.

### Formación de talento y cultura empresarial

**Cultura empresarial de integridad:**
Morris Chang estableció en TSMC una cultura empresarial centrada en la integridad y la honestidad. Enfatizó los valores fundamentales de "integridad, compromiso, innovación y confianza del cliente", que se convirtieron en los pilares culturales de TSMC.

**Importancia de la formación de talento:**
Chang otorgó gran importancia a la formación y el desarrollo del talento, estableciendo un sistema integral de capacitación. Consideraba que el talento era el activo más valioso de una empresa y que solo cultivando profesionales excepcionales podía una empresa desarrollarse de manera sostenible.

**Estilo de gestión internacionalizado:**
Chang introdujo la eficiencia y la transparencia de la gestión al estilo estadounidense en TSMC, estableciendo una estructura moderna de gobierno corporativo. Al mismo tiempo, integró la sabiduría de la cultura china, creando una cultura empresarial única.

### Pensamiento estratégico y capacidad de ejecución

**Formulación de estrategias a largo plazo:**
Morris Chang poseía una capacidad de pensamiento estratégico excepcional, capaz de discernir las tendencias industriales y formular estrategias de desarrollo a largo plazo. La estrategia de "liderazgo tecnológico" de TSMC es una muestra de su visión estratégica.

**Énfasis en la ejecución:**
Además de la formulación estratégica, Chang también otorgaba gran importancia a la capacidad de ejecución. Estableció un sistema de gestión completo para asegurar que las estrategias se implementaran de manera efectiva, razón fundamental por la cual TSMC logró un crecimiento sostenido.

**Sabiduría en la gestión de crisis:**
Al enfrentar diversas crisis y desafíos, Chang demostró un liderazgo excepcional y sabiduría en el manejo de crisis, guiando a TSMC a través de múltiples períodos difíciles y manteniendo el desarrollo estable de la empresa.

## Jubilación y sucesión

### La primera jubilación en 2005

**Inicio del plan de sucesión:**
En 2005, Morris Chang, a los 74 años, anunció su jubilación y cedió el cargo de director ejecutivo a Rick Tsai. Esto formaba parte de un plan de sucesión cuidadosamente preparado, que reflejaba su responsabilidad hacia el desarrollo sostenible de la empresa.

**Retención del cargo de presidente:**
Aunque dejó el puesto de director ejecutivo, Chang conservó el cargo de presidente del consejo, continuando su participación en las decisiones estratégicas clave de la empresa y brindando orientación y apoyo al equipo sucesor.

**Organización de la vida de jubilación:**
Tras su jubilación, Chang no se retiró por completo de la actividad empresarial. Participó activamente en diversos foros y conferencias, compartiendo su experiencia y perspectivas, y contribuyendo con su sabiduría al desarrollo de la industria.

### El regreso en 2009

**Los desafíos de la crisis financiera:**
La crisis financiera global de 2008 afectó gravemente a TSMC, que enfrentó el doble desafío de la caída de resultados y la intensificación de la competencia. En este momento crucial, Chang decidió regresar.

**Reasunción del cargo de director ejecutivo:**
En 2009, Morris Chang, a los 78 años, reasumió el cargo de director ejecutivo de TSMC, liderando personalmente a la empresa durante el período difícil. Su regreso estabilizó la confianza del mercado y proporcionó liderazgo para la recuperación de la empresa.

**Formación de Liu Deyin y Wei Zhejia:**
Durante su segundo mandato, Chang se centró en formar a sucesores como Liu Deyin (劉德音) y Wei Zhejia (魏哲家), preparando el talento necesario para el futuro desarrollo de la empresa.

### La jubilación definitiva en 2018

**Finalización del plan de sucesión:**
En junio de 2018, Morris Chang, a los 87 años, se retiró formalmente, poniendo fin a su legendaria carrera de 31 años en TSMC. Cedió el cargo de presidente a Liu Deyin y el de director ejecutivo a Wei Zhejia.

**Establecimiento del sistema de doble liderazgo:**
Chang estableció un "sistema de doble liderazgo": Liu Deyin como presidente, responsable de las relaciones externas, y Wei Zhejia como director ejecutivo, responsable de las operaciones internas. Este arreglo institucional favorece el desarrollo estable de la empresa.

**Un paradigma de jubilación ejemplar:**
La jubilación de Morris Chang es considerada un modelo de sucesión empresarial. Se retiró en el momento oportuno, brindando a la nueva generación de líderes un espacio pleno para desarrollarse, al tiempo que aseguró una transición estable de la empresa.

## Impacto en la industria mundial de semiconductores

### Innovación del modelo de negocio

**Popularización del modelo de fundición profesional:**
El modelo de fundición profesional creado por Morris Chang se ha convertido en uno de los modelos de negocio estándar de la industria de semiconductores. Cientos de empresas fabless en todo el mundo dependen de los servicios de las fundiciones, un modelo que ha impulsado enormemente el desarrollo de la industria.

**Reconfiguración del ecosistema industrial:**
El modelo de fundición profesional reconfiguró el ecosistema de la industria de semiconductores, promoviendo la división especializada del trabajo, mejorando la eficiencia industrial y reduciendo las barreras de entrada a la innovación, permitiendo que más empresas participen en el diseño de chips.

**Establecimiento de la cadena de suministro global:**
TSMC se convirtió en un nodo clave de la cadena de suministro global de semiconductores, proporcionando servicios de manufactura a empresas tecnológicas de todo el mundo, estableciendo una cadena de suministro verdaderamente globalizada para la industria de semiconductores.

### Impulso del progreso tecnológico

**Liderazgo en tecnología de procesos:**
Bajo el liderazgo de Morris Chang, TSMC mantuvo una posición de liderazgo mundial en tecnología de procesos, impulsando el progreso tecnológico de toda la industria de semiconductores y prolongando la vigencia de la Ley de Moore.

**Democratización de los procesos avanzados:**
Los servicios de procesos avanzados de TSMC permiten que las empresas más pequeñas accedan a la tecnología más reciente, logrando una "democratización" de los procesos avanzados y fomentando un florecimiento de la innovación.

**Exploración de nuevos campos tecnológicos:**
Desde chips digitales tradicionales hasta chips de inteligencia artificial, desde electrónica de consumo hasta electrónica automotriz, TSMC proporciona soporte de manufactura para diversas áreas tecnológicas emergentes, impulsando la aplicación de la innovación tecnológica.

## Significado para Taiwán: el fundador de la isla tecnológica

### Desarrollo de la industria tecnológica

**Establecimiento de la "montaña sagrada protectora de la nación":**
TSMC es conocida como la "montaña sagrada protectora de la nación" (護國神山) de Taiwán, no solo por su enorme valor económico, sino también por su posición clave en la cadena de suministro tecnológico global. Morris Chang estableció un activo estratégico fundamental para Taiwán.

**Formación de talento tecnológico:**
El desarrollo de TSMC ha formado una gran cantidad de profesionales especializados en semiconductores. Este talento no solo ha sostenido el crecimiento de TSMC, sino que también ha proporcionado una base de recursos humanos para toda la industria tecnológica de Taiwán.

**Formación de un clúster industrial:**
En torno a TSMC, Taiwán ha desarrollado un clúster industrial completo de semiconductores, incluyendo proveedores de equipos, proveedores de materiales, plantas de encapsulado y pruebas, generando un enorme valor industrial.

### Contribución al desarrollo económico

**Importante contribución al PIB:**
TSMC se ha convertido en la empresa más grande de Taiwán, con una contribución muy significativa al PIB del país. Su éxito también ha impulsado el desarrollo de industrias relacionadas y ha creado un gran número de empleos.

**Pilar del comercio de exportación:**
Los semiconductores se han convertido en el producto de exportación más importante de Taiwán. El éxito de TSMC ha elevado enormemente la posición de Taiwán en el comercio mundial y ha fortalecido la competitividad económica del país.

**Mejora del clima de inversión:**
El caso de éxito de TSMC ha atraído más inversión internacional, mejorando el clima de inversión de Taiwán y elevando la posición del país en la percepción de los inversores globales.

### Impacto geopolítico

**Importancia de la soberanía tecnológica:**
En el actual entorno geopolítico, la importancia de la tecnología de semiconductores se ha vuelto cada vez más prominente. La existencia de TSMC ha reforzado la importancia y la capacidad de influencia de Taiwán en la comunidad internacional.

**Poder de negociación en relaciones internacionales:**
La posición clave de TSMC en la cadena de suministro tecnológico global se ha convertido en una pieza importante de negociación para Taiwán en las relaciones internacionales, fortaleciendo también su influencia a nivel mundial.

**Consideraciones de estrategia de seguridad:**
La importancia que los distintos países otorgan a la tecnología de semiconductores también ha expuesto a Taiwán a nuevos desafíos y oportunidades de seguridad. Cómo equilibrar los intereses de todas las partes y mantener la ventaja competitiva de TSMC es una consideración estratégica fundamental.

## Cualidades personales y estilo de liderazgo

### Combinación de visión y capacidad de ejecución

**Visión estratégica excepcional:**
La cualidad más destacada de Morris Chang es su visión estratégica excepcional. Es capaz de discernir las tendencias industriales y anticipar las direcciones de desarrollo futuro. Esta visión de futuro ha sido un factor clave del éxito de TSMC.

**Capacidad de ejecución pragmática:**
Además de su visión, Chang también posee una destacada capacidad de ejecución. Es capaz de transformar conceptos estratégicos en planes de acción concretos y asegurar su implementación efectiva. Esta combinación de pensamiento estratégico y capacidad de ejecución es sumamente infrecuente.

**Espíritu de aprendizaje continuo:**
Incluso a una edad avanzada, Morris Chang ha mantenido un espíritu de aprendizaje continuo, atento a los últimos desarrollos de la industria. Esta actitud de aprendizaje le ha permitido mantener siempre un pensamiento agudo y juicios precisos.

### Características del estilo de liderazgo

**Liderazgo carismático:**
Morris Chang posee un fuerte carisma personal y poder de persuasión, capaz de motivar a los equipos a trabajar hacia objetivos comunes. Sus discursos y artículos siempre logran expresar conceptos complejos con claridad, y es profundamente respetado por empleados y profesionales de la industria.

**Compromiso con la toma de decisiones racional:**
Ante decisiones importantes, Chang siempre insiste en el análisis racional, basando sus juicios en hechos y datos, evitando que las consideraciones emocionales o políticas afecten la corrección de las decisiones.

**Práctica del pensamiento a largo plazo:**
Chang siempre ha mantenido un enfoque a largo plazo, sin dejarse influir por dificultades o intereses a corto plazo. Esta perspectiva de largo plazo ha permitido a TSMC mantener una ventaja competitiva sostenida en la feroz industria de semiconductores.

## Honores y reconocimientos

### Premios y reconocimientos internacionales

**Medallas de honor del IEEE:**
Morris Chang ha recibido múltiples medallas de honor del Instituto de Ingenieros Eléctricos y Electrónicos (IEEE), un reconocimiento importante a sus contribuciones al desarrollo de la tecnología de semiconductores.

**Doctorados honoris causa:**
Prestigiosas universidades como Stanford, MIT y la Universidad Nacional de Tsinghua han otorgado a Morris Chang doctorados honoris causa en reconocimiento a sus contribuciones a la industria tecnológica y a la educación.

**Selecciones de revistas empresariales:**
Morris Chang ha sido seleccionado en múltiples ocasiones por revistas empresariales internacionales como _Fortune_ y _BusinessWeek_ como uno de los líderes empresariales más influyentes del mundo, consolidando su posición en la comunidad empresarial global.

### Reconocimientos en Taiwán

**Condecoraciones gubernamentales:**
El gobierno de Taiwán ha otorgado a Morris Chang múltiples condecoraciones importantes en reconocimiento a sus contribuciones excepcionales al desarrollo económico y al progreso tecnológico del país.

**Estima de la industria:**
Morris Chang es venerado por la industria taiwanesa como el "Padrino de los Semiconductores". Su experiencia y sabiduría se han convertido en un modelo a seguir para los empresarios de la nueva generación.

**Reconocimiento de la influencia social:**
Además de sus logros empresariales, la influencia social de Morris Chang también ha recibido un amplio reconocimiento. Sus contribuciones al desarrollo de la sociedad taiwán han sido altamente valoradas por todos los sectores.

## Reflexiones filosóficas y sabiduría vital

### Comprensión del éxito

**Combinación de capacidad y oportunidad:**
Morris Chang considera que el éxito requiere la combinación de capacidad y oportunidad. La capacidad es la base, pero también es necesario aprovechar el momento oportuno. Enfatiza la importancia de la preparación: las oportunidades siempre llegan para quienes están preparados.

**Valor de la perseverancia a largo plazo:**
Subraya la importancia de la perseverancia sostenida, considerando que el verdadero éxito requiere la acumulación de tiempo y no se puede lograr con precipitación. El éxito de TSMC es el resultado de una perseverancia a largo plazo.

**Necesidad de la innovación continua:**
Chang sostiene que en la industria tecnológica, la innovación continua es una condición necesaria para la supervivencia. Las empresas deben invertir constantemente en innovación para mantener su competitividad.

### Reflexiones sobre la vida

**Equilibrio entre trabajo y vida personal:**
A pesar de su gran éxito profesional, Morris Chang también enfatiza la importancia del equilibrio entre el trabajo y la vida personal. Disfruta leyendo y escuchando música, aficiones que le proporcionan un sustento espiritual.

**Asunción de responsabilidad social:**
Chang considera que los empresarios exitosos tienen la responsabilidad de retribuir a la sociedad. Participa activamente en iniciativas educativas y benéficas, contribuyendo con su esfuerzo al desarrollo social.

**Importancia de la transmisión del conocimiento:**
Otorga gran importancia a la transmisión del conocimiento y la experiencia, no solo formando sucesores dentro de la empresa, sino también compartiendo su experiencia y sabiduría a través de diversos medios.

## La continuación de la leyenda

La historia de Morris Chang es una leyenda de visión de futuro, perseverancia e innovación. Desde un joven en tiempos de guerra hasta ejecutivo de una empresa estadounidense, y luego fundador de TSMC, su trayectoria vital ha sido testigo de los cambios de época y ha hecho historia. No solo construyó una empresa grandiosa, sino que, más importante aún, transformó la trayectoria de desarrollo de toda una industria e influyó en la vida de innumerables personas.

TSMC es conocida como la "montaña sagrada protectora de la nación", pero Morris Chang mismo es, sin duda, una figura de nivel "tesoro nacional" para Taiwán. Su éxito no pertenece solo a Taiwán, sino al mundo entero. En la actualidad, con el rápido desarrollo tecnológico, el modelo de negocio y la cultura empresarial que fundado continúan desempeñando un papel fundamental, influyendo en una nueva generación de empresarios e ingenieros.

La leyenda de Morris Chang continúa. Aunque ya se ha jubilado, la empresa que construyó y el legado espiritual que dejó seguirán influyendo en el mundo. En una era de rápido desarrollo de nuevas tecnologías como la inteligencia artificial, 5G e Internet de las cosas, la importancia de los semiconductores es más prominente que nunca, y TSMC, como líder mundial en manufactura de semiconductores, seguirá desempeñando un papel clave en el impulso del progreso tecnológico.

Esta es la leyenda de Morris Chang: una historia sobre cómo los sueños se hacen realidad, una historia sobre cómo cambiar el mundo.

---

_Referencias:_

- [Autobiografía de Morris Chang (Volumen I y II)](https://www.books.com.tw/products/0010784799)
- [Informes anuales y datos oficiales de TSMC](https://investor.tsmc.com/english/annual-reports)
- [Instituto de Investigación de Tecnología Industrial (ITRI)](https://www.itri.org.tw/)
- [Entrada "Morris Chang" en Wikipedia](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [Datos relacionados con Morris Chang en la Universidad Nacional de Tsinghua](https://www.nthu.edu.tw/)
