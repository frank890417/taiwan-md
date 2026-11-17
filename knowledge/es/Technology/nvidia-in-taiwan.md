---
title: 'NVIDIA en Taiwán: la empresa más valiosa del mundo no fabrica ni uno solo de sus chips'
description: 'En Computex de mayo de 2025, Jensen Huang apareció con su chaqueta de cuero y, en la pantalla de fondo, se encendieron de una vez los logos de 55 empresas taiwanesas: una compañía estadounidense nombraba públicamente a toda la industria de la isla como su propio cuerpo material. Desde aquella carta enviada a Morris Chang en 1996 hasta superar los cinco billones de dólares de valor de mercado y ver al Gobierno de Taipéi desembolsar 4,434 millones de dólares taiwaneses para despejarle un terreno, NVIDIA ha depositado todo su cuerpo en Taiwán. Por eso Taiwán sostiene un interruptor que el mundo no puede apagar, pero sus márgenes brutos son de apenas 5%, se le drenan el agua y la electricidad, y el riesgo de guerra queda cargado sobre la isla: que no puedan prescindir de ella no significa que Taiwán tenga la última palabra.'
date: 2026-06-22
category: 'Technology'
tags:
  [
    'NVIDIA',
    'NVIDIA',
    'Jensen Huang',
    'IA',
    'semiconductores',
    'TSMC',
    'cadena de suministro',
    'escudo de silicio',
    'inteligencia artificial',
    'Computex',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-22
lastHumanReview: false
researchReport: 'reports/research/2026-06/NVIDIA在台灣.md'
relatedDiary: ['2026-06-22-143854-nvidia-taiwan']
image: '/article-images/technology/computex-jensen-huang-2016.webp'
translatedFrom: 'Technology/NVIDIA在台灣.md'
sourceCommitSha: '1ec0df23'
sourceContentHash: 'sha256:533b8db87f48f6de'
sourceBodyHash: 'sha256:8a6bcaa4a83cff70'
translatedAt: '2026-09-16T11:45:54.717846+00:00'
---

# NVIDIA en Taiwán: la empresa más valiosa del mundo no fabrica ni uno solo de sus chips

> **Resumen en 30 segundos:** NVIDIA es la empresa más valiosa del planeta: el 29 de octubre de 2025 superó los cinco billones de dólares de valor de mercado[^1]. Pero no tiene ni una sola fábrica de obleas propia. Cada chip de IA se fabrica en TSMC; cada servidor de IA lo ensamblan Hon Hai, Quanta y Wistron; y Taiwán realiza el 90% de la manufactura por contrato de servidores de IA del mundo[^2]. Esta dependencia es tan profunda que NVIDIA ya es el mayor cliente de TSMC, con 19% de sus ingresos[^3], y tan profunda que la arquitectura de sus chips termina siendo determinada, a la inversa, por el rendimiento de encapsulado de Taiwán[^4]. El problema es que controlar el punto vital de otro no es lo mismo que capturar los beneficios: NVIDIA tiene un margen bruto de 75%, mientras los ODM taiwaneses apenas llegan a 5% u 8%[^5]. Este artículo trata de cómo esta relación desigual llegó a ser lo que es hoy.

![Jensen Huang habla de pie sobre el escenario de Computex Taipei, con su característica ropa oscura; detrás hay una gran pantalla de proyección y, frente a él, una audiencia llena](/article-images/technology/computex-jensen-huang-2016.webp)
_Jensen Huang durante su conferencia en Computex Taipei en 2016. Desde 2023, ha vuelto casi todos los años a esta feria para anunciar los chips de IA más recientes de NVIDIA, ante una audiencia en la que se sienta toda la cadena de suministro taiwanesa que fabrica esos chips. Foto: NVIDIA Taiwan, 2016._

19 de mayo de 2025, Centro de Exposiciones de Nangang, Taipéi. Jensen Huang subió al escenario principal de Computex con su característica chaqueta de cuero. Detrás de él, una enorme pantalla encendió un muro de logos: Aaeon, Accton, Delta Electronics, Gigabyte, Quanta, Wistron, Wiwynn, Hon Hai, MediaTek, TSMC, UMC... uno tras otro, hasta quedar fijados los emblemas de 55 empresas taiwanesas[^6]. Sumadas al video de agradecimiento proyectado en el recinto, las compañías taiwanesas mencionadas llegaron a 122[^6].

Fue la primera vez que la gente de Taiwán “vio” a toda su industria ser nombrada de una sola vez por una empresa estadounidense.

El orgullo era real. Pero ese muro escondía una pregunta no dicha: cada logo en la pared trabajaba para esa empresa estadounidense, mientras el poder real estaba en manos de quien proyectaba el muro, no de quienes aparecían en él.

<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/TLzna9__DnI"
    title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025（官方完整影片）"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>

_Versión completa de la conferencia principal de Jensen Huang en COMPUTEX el 19 de mayo de 2025, en el canal oficial de NVIDIA. Fue en esa presentación donde se mostró el muro con los logos de 55 empresas taiwanesas y se anunció que NVIDIA establecería su sede internacional en Taipéi._

## Una empresa que no fabrica nada se convirtió en la más valiosa del planeta

NVIDIA es la forma extrema del modelo de semiconductores “sin fábrica” o fabless. Diseña chips, pero no construye fábricas, no compra máquinas de litografía y no produce ni una sola oblea. Un imperio valorado en cinco billones de dólares no posee ni una fábrica de obleas propia.

Externalizó la fabricación entera a una isla al otro lado del Pacífico.

![Microfotografía ampliada del die del chip GPU NVIDIA Ampere GA102, con una densa estructura de circuitos](/article-images/technology/nvidia-ampere-ga102-die.webp)
_Micrografía del die del chip NVIDIA Ampere GA102, producido por TSMC con proceso de 8 nanómetros. NVIDIA lo diseñó, pero cada línea densamente trazada sobre esta superficie fue grabada en fábricas taiwanesas. Foto: Fritzchens Fritz, CC0._

Los chips más rentables, como H200, Blackwell y el próximo Rubin, dependen por completo de los procesos de 3 y 4 nanómetros de TSMC[^7]. En su propio informe anual ante la Comisión de Bolsa y Valores de Estados Unidos, NVIDIA reconoció por escrito esta concentración: la cadena de suministro de la compañía está concentrada principalmente en la región de Asia-Pacífico, y utiliza fundiciones como TSMC para producir sus obleas semiconductoras[^8]. Esa frase aparece en un documento legal presentado por la empresa ante la SEC. En otras palabras, fue la propia NVIDIA la que identificó a Taiwán como su mayor fuente de riesgo geopolítico.

Fabricar el chip tampoco basta. Para que una GPU se convierta en algo capaz de calcular, primero necesita encapsulado avanzado y luego debe instalarse en un servidor. El encapsulado CoWoS de TSMC es hoy el cuello de botella mundial, y NVIDIA por sí sola consume alrededor de 60% de la capacidad CoWoS; las estimaciones de medios taiwaneses elevan la cifra a 70%[^9]. Los chips encapsulados pasan luego a ensamblaje en empresas taiwanesas: Ingrasys, de Hon Hai, fabrica los racks GB200 NVL72, y Yuanta Investment Consulting estima que supera 40% de cuota en ensamblaje de racks de IA[^10]; Quanta fabrica servidores en la nube y tiene más de la mitad del mercado entre los 50 mayores centros de datos[^11]; la nueva planta de IA de Wistron en Zhubei está copada por pedidos de NVIDIA[^12].

```tw-stat
75.0% | Margen bruto anual de NVIDIA FY2025 | Informe anual ante la SEC
19% | Participación de NVIDIA en los ingresos de TSMC en 2025 | Ya superó a Apple como mayor cliente
~90% | Participación de Taiwán en la manufactura mundial por contrato de servidores de IA | Llega a 100% si se incluyen proveedores de marcas estadounidenses
~60% | Participación de NVIDIA en la capacidad de encapsulado CoWoS de TSMC | Medios taiwaneses estiman hasta 70%
Fuentes: NVIDIA SEC 10-K, TrendForce, MIC del III, Ministerio de Asuntos Económicos
```

Taiwán concentra 90% de la manufactura por contrato de servidores de IA del mundo; si se incluyen los proveedores de marcas estadounidenses, la cifra es 100%[^2]. Esto significa que casi todas las máquinas físicas de cómputo de IA del planeta han pasado por manos taiwanesas.

Al superponer estas cifras, la contradicción central emerge: **la empresa más valiosa no fabrica nada porque todo su cuerpo material está depositado en Taiwán**. Taiwán es el interruptor que NVIDIA no puede apagar.

Pero controlar el punto vital de alguien y capturar dinero de ese alguien son dos cosas distintas. El siguiente muro está escondido detrás de esos 55 logos.

## Detrás del muro de logos está la parte baja de la curva de la sonrisa

En la manufactura existe una vieja “curva de la sonrisa”: los extremos son altos y el centro es bajo. Quienes controlan marca, diseño y tecnología capturan los mayores márgenes; quienes se ocupan del tramo intermedio de “ensamblaje y fabricación” reciben los márgenes más delgados. Taiwán está, precisamente, en ese tramo intermedio.

El margen bruto anual de NVIDIA en FY2025 fue 75.0%, una cifra declarada por la propia empresa ante la SEC[^5]. En ese mismo periodo, los márgenes brutos de las compañías taiwanesas que ensamblan sus servidores fueron estos: Hon Hai 6.18%, Quanta 4.78% —el nivel más bajo en casi 15 trimestres—, Wistron 5.21% y Wiwynn 7.2%[^13]. El margen bruto de NVIDIA es aproximadamente doce veces el de Hon Hai y dieciséis veces el de Quanta.

```tw-bars
Quién se queda con las ganancias: márgenes brutos de la cadena de suministro de IA (%)
*NVIDIA | 75.0 | Diseño, marca, ecosistema CUDA
Delta Electronics | 37.0 | Energía y refrigeración (extremo tecnológico)
Unimicron | 21.3 | Sustratos ABF (extremo tecnológico)
Wiwynn | 7.2 | Ensamblaje de servidores
Hon Hai | 6.18 | Ensamblaje de sistemas de rack
Wistron | 5.21 | Ensamblaje de servidores
Quanta | 4.78 | Ensamblaje de servidores en la nube
Fuentes: NVIDIA SEC 10-K, conferencias de resultados de cada compañía (trimestres FY2025-FY2026)
```

En esta gráfica se esconde un hecho contraintuitivo. Incluso entre empresas taiwanesas, cuanto más cerca están del “ensamblaje” puro, más delgado es el margen; cuanto más cerca están de la “tecnología”, más alto resulta. Delta Electronics, que fabrica energía y refrigeración, alcanza 37%; Unimicron, que fabrica sustratos ABF, se estima en 21.3%[^14]. La diferencia no está en “ser o no ser una empresa taiwanesa”, sino en qué tramo de la curva ocupas. En el ensamblaje, venga quien venga, el margen es igual de fino.

> 📝 **Nota curatorial**: Morgan Stanley calculó en mayo de 2026 una cifra aún más hiriente: el margen bruto de valor agregado de los ODM en el ensamblaje a nivel de sistema completo cayó de 2.7% en los racks GB300 de la generación anterior a 1.9% en la siguiente generación VR200[^15]. Es decir, cada vez que NVIDIA lanza un chip más potente, las empresas taiwanesas deben adelantar más capital, pero su margen cae. Cuanto más avanza esta cadena de suministro, más se aplasta el fondo de la curva. El logo puede lucir espléndido en la pared y el margen puede seguir siendo tenue en el fondo de la curva; ambas cosas pueden ser ciertas a la vez.

El orgullo y el costo tiran en direcciones opuestas dentro de la misma cadena. La bolsa taiwanesa se disparó por la IA, y en 2025 el crecimiento económico de Taiwán fue de alrededor de 7.37%, el más rápido en quince años y entre los más altos del mundo[^16]. Pero Min-Hua Chiang, académica que estudia la economía taiwanesa, señaló una cifra fría: la mayoría de los taiwaneses no sintió los beneficios de esta economía próspera[^16]. El 10% de mayores ingresos capturó 48% del ingreso total de Taiwán, mientras el 50% más bajo recibió apenas 12%[^16]. Traducido: el ingreso per cápita del 10% superior fue veinte veces el del 50% inferior.

Un artículo de opinión publicado por The Reporter en junio de 2026 describió esta divergencia en forma de K con más precisión: la “población empleada directamente” en la cadena principal de crecimiento de IA, semiconductores y electrónica representa menos de 10% de toda la fuerza laboral[^17]. Una persona que trabaja en restaurantes y servicios de comida percibe un salario mensual total de 38,484 dólares taiwaneses, apenas 34.6% del de la industria de componentes electrónicos[^17]. El dividendo de la IA es real; sólo que se concentra en el capital y en una minoría de ingenieros, mientras la mayoría observa la ola desde fuera.

Este es el primer sentido de “que no puedan prescindir de ti no significa que tengas la última palabra”: Taiwán sostiene el interruptor, pero recibe ese 5%.

## Taiwán alguna vez la sostuvo, y casi la hundió

Para entender cómo empezó esta relación desigual, hay que volver a finales de la década de 1990, cuando NVIDIA todavía corría contra la muerte.

NVIDIA se fundó en 1993 y durante sus primeros años estuvo varias veces al borde de la quiebra. Cuando lanzó el chip gráfico RIVA 128 en agosto de 1997, a la empresa “sólo le quedaba un mes de salarios”[^18]. En aquella época, Jensen Huang abría cada reunión mensual de la compañía con la misma máxima en inglés: nuestra empresa está a treinta días de cerrar[^18]. Esa frase se convirtió después en una creencia interna de NVIDIA, pero nunca fue una frase china.

Lo que realmente sacó a NVIDIA de aquella crisis fue una inyección de 5 millones de dólares de SEGA, no Taiwán[^19]. Hay que aclararlo primero, porque la idea de que “Taiwán salvó a NVIDIA” suele contarse de una forma demasiado romántica.

El papel de Taiwán fue otro: el punto vital de la fabricación. Alrededor de 1996, Jensen Huang, de 32 años, escribió una carta al fundador de TSMC, Morris Chang, preguntando si TSMC podía fabricar chips por contrato para NVIDIA[^20]. En 2025, Miin Wu de TSMC recordó que esa “cooperación profunda comenzó en un momento clave, en 1997”, cuando “Morris Chang, fundador de TSMC, contactó personalmente al fundador de NVIDIA, Jensen Huang, en respuesta a la solicitud de servicios de fundición de NVIDIA”[^21]. En 1998, ambas partes firmaron formalmente un contrato, y TSMC se convirtió en la principal fundición de obleas de NVIDIA[^20]. La división del trabajo “diseño en Silicon Valley, fabricación en TSMC” conectó desde entonces el cuerpo material de NVIDIA con esta isla.

> 💡 **¿Sabías que...?** Según una versión difundida, cuando Huang recibió la llamada de Morris Chang, gritó emocionado a quienes estaban a su lado que guardaran silencio porque era Chang quien llamaba[^22]. La escena es una narración de segunda mano, y el tono quizá no sea exacto, pero captura algo real: aquella pequeña compañía al borde del colapso vio una llamada de TSMC como una cuerda de salvación.

Pero esa cuerda también casi se convirtió en soga. En 1998, un error en un proceso químico de TSMC hizo que grandes lotes de chips de NVIDIA quedaran inutilizados, casi arrastrando otra vez a la empresa al colapso[^23]. Por eso, la forma más honesta de decirlo es esta: Taiwán no fue el “salvador de la quiebra” de NVIDIA; fue su “punto vital de fabricación”. Ese punto vital ataba a ambos lados: Taiwán la sostuvo, pero también estuvo cerca de hundirla. La simbiosis nunca fue una gracia unilateral.

La historia que sigue es más conocida. En 2006, NVIDIA lanzó CUDA, una decisión que casi todos consideraban una locura. En 2012, el estudiante de posgrado Alex Krizhevsky entrenó AlexNet con dos tarjetas NVIDIA GTX 580 en una habitación de la casa de sus padres, y redujo la tasa de error de reconocimiento de imágenes de ImageNet de 26% a 15.3%[^24]. Ese momento demostró que la GPU era el motor del aprendizaje profundo. En 2022, ChatGPT encendió la sed global de capacidad de cómputo, y el valor de mercado de NVIDIA empezó a despegar como un cohete.

```tw-timeline
1993 | NVIDIA se funda en Silicon Valley | Jensen Huang y otros dos fundadores fabrican chips gráficos
1996 | Jensen Huang escribe a Morris Chang | Busca fabricación por contrato de TSMC; el contrato formal llega en 1998 y el cuerpo material se conecta con Taiwán
2006 | Lanzamiento de CUDA | Convierte la GPU en una plataforma de cómputo general; en ese momento se ve como una decisión descabellada
2012 | AlexNet se entrena con dos GTX 580 | Demuestra que GPU = motor de aprendizaje profundo
2022 | Aparece ChatGPT | Explota la demanda global de cómputo y despega el valor de mercado de NVIDIA
2025 | Supera los cinco billones de dólares | Primera empresa de la historia en lograrlo; ese mismo año anuncia sede internacional en Taiwán
Fuentes: The Nvidia Way, podcast Acquired, Wikipedia, CNBC
```

De una pequeña compañía a treinta días de quebrar a la primera empresa de cinco billones de dólares de la historia: entre ambos extremos, cada chip fue fabricado en Taiwán.

![Jensen Huang sostiene una GPU RTX Blackwell durante la conferencia principal de CES 2025](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)
_Jensen Huang alza la nueva generación de GPU Blackwell en CES 2025. De fundador que repetía cada mes “estamos a treinta días de cerrar” a sostener el chip que todo el mundo quiere conseguir; y aun así, ese chip sólo puede fabricarse en Taiwán. Foto: Pronoia, CC0._

## ¿La irremplazabilidad tiene fecha de vencimiento?

Esto lleva a una pregunta que hay que enfrentar con honestidad: esta “irremplazabilidad” de Taiwán, ¿es permanente o tiene un límite temporal?

En el corto plazo, el límite es tan duro que casi no deja grietas. Entre 2025 y 2027, las GPU de IA más avanzadas de NVIDIA, desde la fabricación hasta el encapsulado final, están 100% atrapadas en las líneas CoWoS-L de TSMC dentro de Taiwán[^25]. TSMC controla alrededor de 90% a 92% de los procesos avanzados de menos de 5 nanómetros del mundo, y su capacidad de encapsulado avanzado supera la suma de todos sus competidores[^26]. La investigación del profesor Yuntsai Chou, de la Universidad Nacional de Ciencia y Tecnología de Taiwán, lo dice sin rodeos: dispersar la fabricación por contrato de TSMC no es viable en el corto plazo; construir una nueva fábrica de obleas de frontera requiere entre tres y cuatro años y más de 10,000 millones de dólares[^27].

La prueba de ingeniería más contundente no está en ningún informe, sino en el propio diseño de producto de NVIDIA. La próxima generación Rubin Ultra se había planificado originalmente con encapsulado de “cuatro chiplets”, pero en abril de 2026 TrendForce señaló que cuatro chiplets inflarían el área de encapsulado hasta 7.5 u 8 veces el límite de retícula, lo que “perjudicaría gravemente el rendimiento y el costo”; por eso el diseño “ahora gira hacia una arquitectura de dos chiplets”[^4]. Esta frase debe leerse despacio: el límite físico del rendimiento de encapsulado de Taiwán determina, a la inversa, cómo debe verse el chip de NVIDIA. Incluso la empresa de diseño de chips más poderosa del mundo debe rediseñar alrededor del rendimiento taiwanés. Esto ya es un punto de bloqueo de nivel físico, tan duro que no deja espacio real de negociación.

Pero un “límite duro de corto plazo” no equivale a “para siempre”. Taiwán tiene antecedentes dolorosos.

En 2002, Taiwán impulsó la política industrial “Dos billones, dos estrellas”, y las pantallas y la DRAM —memoria— también fueron consideradas arterias vitales irremplazables para proteger el país. ¿Qué ocurrió después? Por falta de tecnología central, con una inversión en I+D de apenas 6%, muy por debajo del 10% a 21% de Corea del Sur, Japón, Estados Unidos y Europa, ambas industrias fueron vaciadas por Corea del Sur y China. Una retrospectiva de United Daily News fue especialmente punzante: “las otrora gloriosas fábricas de paneles y las empresas de memoria del sector semiconductor, pocos años después, debido al exceso de oferta en el mercado internacional, sufrieron grandes pérdidas y fueron apodadas por los internautas ‘sacerdotes Maoshan’ —mao san dao si, margen bruto de tres a cuatro—, es decir, productos con margen bruto de apenas 3% a 4%; las ‘industrias de dos billones, dos estrellas’ terminaron convertidas en ‘dos billones de industrias tristes’”[^28].

> ⚠️ **En qué se diferencia esta vez de los paneles y la DRAM**: las industrias de paneles y DRAM fueron vaciadas porque Taiwán no controlaba tecnología central y cualquiera podía alcanzarlas. Esta vez, el foso de la IA parece mucho más profundo: TSMC sí domina propiedad intelectual de procesos, y el rendimiento de encapsulado CoWoS más la adherencia de todo el ecosistema no se replican en tres o cinco años sólo con dinero. Pero eso no significa que Taiwán pueda dormirse. SMIC ya afirmó haber puesto en producción los 5 nanómetros; aunque su rendimiento sea apenas un tercio del de TSMC y su costo 50% más alto, el rezago ronda los cinco años[^29]. Cinco años, en tecnología, no son una eternidad. Tratar “ser profundamente indispensable” como “estar seguro para siempre” fue precisamente el error de quienes apostaron por esa política en 2002.

Después de 2028 empiezan a aparecer grietas. En diciembre de 2025, NVIDIA invirtió alrededor de 5,000 millones de dólares en Intel. El verdadero objetivo era “asegurar acceso prioritario a la capacidad de encapsulado avanzado de Intel en Estados Unidos”, con miras a usarla en la arquitectura Feynman de 2028[^30]. La planta de encapsulado AP1 de TSMC en Arizona está prevista para producción masiva en 2028[^31]. Powertech, empresa taiwanesa, desarrolló PiFO, un encapsulado comparable a CoWoS-L, con un costo de producción aproximadamente 30% menor, y “varias compañías estadounidenses de chips de IA” ya la han buscado con urgencia[^32]. Estos son aflojamientos reales, aunque todavía no han entrado en la cadena principal de suministro de las GPU más avanzadas de NVIDIA.

Una cifra resume mejor que ninguna otra la sutileza del momento: TrendForce estima que la brecha entre oferta y demanda de CoWoS se reducirá de alrededor de 20% en la actualidad a cerca de 10% para finales de 2026[^33]. Pero la forma de reducir la brecha es la expansión de capacidad de la propia TSMC, no la llegada de proveedores alternativos[^33]. Es decir, hasta hoy, ese cuello de botella sigue siendo algo que sólo Taiwán puede resolver.

La irremplazabilidad es un hecho de ingeniería, pero tiene un límite duro escrito cerca de 2028. La ficha de negociación de Taiwán tiene fecha de frescura.

## 4,434 millones: una ciudad despeja un terreno para una empresa de billones

Si el margen bruto es una balanza abstracta de poder, lo ocurrido en la segunda mitad de 2025 en el Parque Tecnológico Beitou-Shilin de Taipéi fue una de sus tajadas más afiladas.

La historia empieza en 2021. En aquel momento, el Gobierno de Taipéi licitó dos terrenos del parque, T17 y T18, con un total de 3.89 hectáreas, bajo derecho de superficie por 50 años. Shin Kong Life fue el único postor y ganó con una oferta de 4,400 millones de dólares taiwaneses[^34]. Durante los tres años siguientes, el terreno quedó ocioso y cubierto de maleza.

En mayo de 2025, Jensen Huang anunció en Computex que la sede internacional “Constellation” de NVIDIA prefería instalarse en Beitou-Shilin[^35]. Pero apareció el problema: el derecho de superficie seguía en manos de Shin Kong Life, y un derecho de superficie público no podía transferirse directamente. NVIDIA, Shin Kong Life y el Gobierno de Taipéi quedaron empantanados durante cinco meses por ese terreno[^36].

La solución final fue que el Gobierno de Taipéi pagara para que Shin Kong Life se retirara. El 12 de noviembre de 2025, el Concejo Municipal de Taipéi aprobó sin objeciones una indemnización de rescisión de 4,434 millones de dólares taiwaneses, que el Gobierno municipal pagaría a Shin Kong Life para recuperar el terreno[^37]. La cifra exacta fue: 4,434,064,085 dólares taiwaneses[^37].

```tw-figure
NT$4,434,064,085
Indemnización de rescisión que el Gobierno de Taipéi pagó a Shin Kong Life para recuperar el terreno de Beitou-Shilin y entregarlo a NVIDIA (aprobada por el Concejo el 12/11/2025)
Concejo Municipal de Taipéi, CNA, Next Apple News
```

La factura de rescisión enviada por Shin Kong Life estalló en el Concejo. Yu Shu-hui, concejala del Kuomintang, escribió al recibir esa factura: “Cuando vi en las ocho páginas de la cuenta de Shin Kong Life que hasta el desmalezado, el mantenimiento ambiental, los ajustes de logo y los honorarios del agente escriturador querían que los pagara el Gobierno de Taipéi, sólo pude sonreír amargamente. ¿No era el mantenimiento ambiental algo que originalmente debía hacer el arrendatario? ¿Incluso el costo de ajustar el logo por la fusión de Taishin y Shin Kong Life debe pagarlo el Gobierno de Taipéi? De verdad, me desmayo... suspiro tres veces de impotencia”[^38]. Pero al final votó a favor, y añadió una frase que representó muy bien el clima general: “La factura de Shin Kong Life es inconcebible, pero hay que priorizar el panorama general”[^38].

Ese día se vio una escena inusual en el Concejo: los partidos azul, verde y blanco, normalmente enfrentados, estuvieron excepcionalmente armónicos. Incluso el caucus del Partido Democrático Progresista gritó: “apoyen a NVIDIA, firmen cuanto antes”[^39]. Un terreno y una empresa extranjera lograron que partidos que suelen morderse hablaran con una sola voz.

> 📝 **Nota curatorial**: Vale la pena detenerse a observar esta estructura de poder. Para que una empresa valorada en billones de dólares se instalara, el Gobierno de una ciudad y su Concejo movilizaron fondos públicos, cruzaron líneas partidarias y removieron obstáculos para limpiar un terreno ocupado por el arrendatario anterior. NVIDIA no pagó esos 4,434 millones; el dinero lo adelantaron los contribuyentes de Taipéi, aunque los costos propios de Shin Kong Life y los impuestos ya pagados, por un total de 1,441 millones, fueron asumidos globalmente por NVIDIA[^40]. Aquí, “que no puedan prescindir de ti no significa que tengas la última palabra” adquiere su forma más concreta: cuando necesitas demasiado que alguien se quede, terminas pagando cuentas que no deberían corresponderte.

## ¿La sede es un letrero o raíces plantadas?

¿Qué le dio NVIDIA a Taiwán? Hay que separar dos cosas para no calcular mal.

Una es el “letrero”: la sede Constellation imita la forma de “nave estelar” de la sede estadounidense, alojará a unas 4,000 personas, comenzará construcción en 2026 y sólo entrará en operación en 2030. Hasta hoy, ni siquiera ha empezado a construirse[^41]. Si se mira sólo esto, no es infundado preguntar si la “sede” es apenas una operación de relaciones públicas.

La otra son las “raíces ya plantadas”. NVIDIA no llegó a Taiwán en 2025. Ya tenía oficina en Neihu, Taipéi, con alrededor de 1,800 empleados —una estimación de medios, no una cifra oficial—[^42]. En 2021, el Ministerio de Asuntos Económicos aprobó su “Plan de Centro de Innovación e Investigación en IA”, con inversión total de 24,300 millones de dólares taiwaneses, subsidio gubernamental de 6,700 millones y la contratación de un equipo de I+D de 1,000 personas entre 2022 y 2027[^43]. En noviembre de 2025, constituyó “Taiwan NVIDIA Classic Co., Ltd.”, con capital aumentado de 1,000 a 3,300 millones de dólares taiwaneses: una persona jurídica independiente que puede pagar impuestos y poseer activos por cuenta propia[^44].

Así que la verdad sobre el “aterrizaje de la sede” está en el medio: las raíces reales de I+D sí existen, y la filial que puede pagar impuestos también se constituyó; pero la sede Constellation que concentra la atención sigue en planos. No se puede contar sólo la mitad de ninguna de las dos cosas.

## La isla drenada por esta cadena de suministro

Más allá del halo y de la factura hay otra cuenta, y la pagan todas las personas que viven en esta isla: agua, electricidad, aire y vivienda inaccesible.

![Exterior de una fábrica de TSMC en Taichung, con fachada gris y el logo de TSMC](/article-images/technology/tsmc-taichung-factory.webp)
_Fábrica de TSMC en Taichung. El cuerpo material de cada generación de GPU de NVIDIA toma forma en fábricas como esta, y el agua y la electricidad que consumen son otra factura que la isla está pagando. Foto: Briáxis F. Mendes, CC BY-SA 4.0._

Empecemos por la electricidad. En 2023, TSMC consumió 24,775 millones de kWh, equivalentes a 8.96% de toda la electricidad de Taiwán[^45]. S&P predice que, para 2030, el consumo eléctrico de TSMC podría llegar a 23.7% del total de Taiwán[^45]. Es decir, para entonces, casi uno de cada cuatro kWh consumidos en todo Taiwán podría ser usado por una sola empresa.

```tw-line
Participación del consumo eléctrico de TSMC en el total de Taiwán: una sola empresa drena casi 1/4 de la electricidad de una isla (%)
Año | Participación
2023 | 8.96
2030 | 23.7
Fuentes: S&P, informe CSR de TSMC
```

Las emisiones de carbono suben con ello. El informe de Greenpeace de abril de 2025, “La sombra detrás del auge de los chips”, calculó que el consumo eléctrico mundial de la fabricación de chips de IA pasó de 218 GWh a 984 GWh, un aumento anual superior a 3.5 veces; sólo en Taiwán, el consumo saltó a 375.8 GWh, “hasta representar 38% del total mundial”[^46]. Debido a la alta dependencia de combustibles fósiles de TSMC, sus emisiones por fabricación de chips de IA alcanzaron 185,700 toneladas de CO2 equivalente, y Greenpeace la nombró directamente “campeona de emisiones de carbono” de la fabricación de chips de IA[^46].

¿Y NVIDIA? Greenpeace le dio calificación F. El informe escribió que las emisiones de la cadena de suministro de NVIDIA “casi se duplicaron en los últimos tres años, de 3.51 millones de toneladas en 2022 a 6.91 millones en 2024”, y que lo que hace es “simplemente transferir las emisiones y la contaminación de su cadena de suministro a otras regiones del mundo”[^46]. En otras palabras, la valoración y el halo quedan a nombre de NVIDIA; las emisiones y la contaminación permanecen en el cielo taiwanés.

También está el agua. TSMC usa más de 200,000 toneladas de agua al día; las cuatro plantas de agua regenerada de Tainan suministran 81,000 toneladas diarias que “casi todas van a TSMC”[^47]. El costo cae sobre los campos: en 2021 y 2023, las tierras agrícolas de Chianan suspendieron dos veces el riego para ceder agua a la industria de semiconductores[^48]. Producir una oblea de 12 pulgadas requiere 8,327 litros de agua[^49], y en esta isla hubo campesinos cuyas tierras dejaron de cultivarse para que los chips tuvieran agua.

Luego está la vivienda. Después de que NVIDIA anunciara su sede en Beitou-Shilin, los precios de esa zona empezaron a moverse. La Oficina de Desarrollo Industrial de Taipéi estima que la población empleada permanente futura del parque podría llegar a 60,000 personas, pero según 591 sólo hay alrededor de 1,476 viviendas disponibles para la venta; el suelo residencial representa apenas 13.8% de toda la zona[^50]. Sesenta mil personas compitiendo por 1,476 viviendas: es fácil imaginar hacia dónde se mueven los precios. Informes señalan que nuevos proyectos en el área central de Beitou-Shilin ya superaron 1.5 millones de dólares taiwaneses por ping[^51].

Aquí hay que separar dos cosas para no cargar la ansiedad en la cuenta equivocada. En los registros de precios reales, la transacción más alta de un edificio residencial en el distrito de Shilin en 2025 fue de 570,400 dólares taiwaneses por metro cuadrado, equivalentes a unos 1.88 millones por ping —en el número 39 de Jihe Road, con precio total de 447 millones—[^52]. Pero esas ventas de precio astronómico corresponden a residencias de lujo en Tianmu y el centro de Shilin, no al propio Beitou-Shilin; los nuevos proyectos de Beitou-Shilin que superan 1.5 millones por ping son otra serie de datos reportada por medios. No deben mezclarse. Pero cualquiera de los dos apunta a la misma sensación: el crecimiento ocurre en mi calle, pero yo no puedo comprar.

> ⚠️ **“Si la empresa ni siquiera empezó obras, ¿por qué suben los precios?”**: la reacción de residentes locales es muy concreta. Un operador del sector dijo en privado que, por la mala funcionalidad cotidiana del parque, “muchos empleados no están dispuestos a mudarse con la empresa... incluso después de mudarse, un tercio renunció por la incomodidad del transporte”[^53]. La opinión anónima en PTT fue aún más directa: antes se había agotado el tema TSMC; ahora simplemente se cambió al tema NVIDIA[^54]. Una sede que todavía no empezó obras ya elevó los precios de vivienda de la población local: esta es la versión de la divergencia en K más cercana a la mesa del comedor. La esperanza debe ser honesta: es cierto que la IA hizo visible a Taiwán ante el mundo; también es cierto que se drenan el agua y la electricidad y que la vivienda se vuelve inaccesible. Ambas cosas deben quedar escritas.

## Taiwán no es la única parte que no puede prescindir de ella

Al alejar la cámara, se ve algo más grande: en la relación entre NVIDIA y Taiwán, “no poder prescindir” es bidireccional e incluso multidireccional. Hasta el otro lado del estrecho queda atrapado en esta estructura.

![Piso de Computex en el Centro de Exposiciones de Nangang, Taipéi, con amplios pasillos flanqueados por stands de empresas tecnológicas y gran afluencia de público](/article-images/technology/computex-nangang-floor-2015.webp)
_Piso de Computex en el Centro de Exposiciones de Nangang, Taipéi. Cada junio, compradores de todo el mundo entran a este recinto por lo que produce la cadena de suministro taiwanesa. Taiwán nunca fue la única parte incapaz de prescindir de ella. Foto: NVIDIA Taiwan, CC BY 2.0._

Este es el concepto de “escudo de silicio”: Taiwán controla los chips que todo el mundo necesita, y esa irremplazabilidad se convierte en una capa de protección. Pero el escudo de silicio siempre tuvo dos caras. Es a la vez amuleto protector y polvorín atado a la isla. La academia llama a estas dos caras “escudo de silicio” y “trampa de silicio”: una misma concentración puede disuadir una agresión, pero también puede convertirse en incentivo de invasión o en punto único de falla[^55].

El debate más agudo fue encendido en 2021 por un artículo del U.S. Army War College, que proponía una estrategia extrema de “tierra quemada” o “nido roto”: si China invadía Taiwán, se debería incluso destruir la propia industria de semiconductores para que el invasor no obtuviera beneficios. Pero las objeciones fueron igual de fuertes: aunque disuadiera a China en el corto plazo, ese daño económico autoinfligido quizá sólo pospondría la agresión hasta el día en que China pudiera producir semiconductores por sí misma; además, es poco probable que la población taiwanesa considerara que destruir su propia industria responde a sus intereses[^56]. Esta no es una decisión que Taiwan.md deba dictar, pero pesa de forma real sobre cada discusión acerca de si Taiwán “tiene fichas” o no.

Incluso TSMC está diluyendo el escudo de silicio. Para diversificar riesgos geopolíticos, TSMC comprometió 165,000 millones de dólares en expansión en Estados Unidos[^57]. En agosto de 2025, MIT Technology Review tituló: “El escudo de silicio de Taiwán podría estar debilitándose”[^58]. La preocupación es que la salida de capacidad productiva diluya la ficha local de Taiwán y lleve a Estados Unidos y otros países a sentir que Taiwán ya no merece tanto ser defendido[^58]. Pero Bonnie Glaser, del German Marshall Fund, también recordó que este ecosistema no se traslada con facilidad: el ecosistema creado por Taiwán es verdaderamente único, resultado combinado de una reserva de talento, una cultura y leyes taiwanesas, y no puede replicarse fácilmente en cualquier lugar[^59]. Paul Triolo, especialista en tecnología china, fue aún más directo: cuando se trata de fabricación de frontera, Arizona no está ni cerca de ese nivel, y nunca lo estará[^60].

El momento político que mejor muestra cuán asimétrica es esta dependencia fue uno muy concreto.

El 29 de mayo de 2024, Jensen Huang dijo públicamente en Taiwán: “Taiwan is one of the most important countries in the world.” (“Taiwán es uno de los países más importantes del mundo”)[^61]. Unos días después, el 2 de junio, en una conferencia en la Universidad Nacional de Taiwán, describió a “Taiwán como el héroe anónimo y, sin embargo, el pilar del mundo”[^62].

```tw-quote
Taiwán es el héroe anónimo y, sin embargo, el pilar del mundo
Jensen Huang | Director ejecutivo de NVIDIA, conferencia de Computex en la Universidad Nacional de Taiwán, 2024
```

Dieciocho días después, Chen Binhua, portavoz de la Oficina de Asuntos de Taiwán de China, respondió: “Ante declaraciones tan extremadamente erróneas, la población continental y los internautas ya han expresado fuerte descontento. Taiwán nunca ha sido un país... esperamos que estudie bien la lección”[^63].

Pero lo sugerente fue otra cosa. CNA observó entonces que los medios financieros chinos publicaron muchas notas sobre la visita de Huang a Taiwán, pero “no se vio mención de que Huang dijera que ‘Taiwán es un país importante’, como si hubieran omitido un tema sensible que normalmente se considera de ‘máxima prioridad’”[^64]. Es decir: la autoridad protestó con dureza, mientras los medios financieros eligieron silenciarlo.

> 📝 **Nota curatorial**: Ese silencio revela dónde está realmente el poder. China necesita los chips de NVIDIA. Por eso, aunque Huang dijo algo que Beijing no puede aceptar, los medios continentales eligieron no informarlo ni amplificarlo, por temor a dañar la relación con este “gurú de la IA”. Circula una frase muy extendida: China necesita a NVIDIA, pero NVIDIA no necesita a China[^65]. En esta relación, incluso el enorme mercado del otro lado del estrecho tiene, en cierta medida, el cuello atrapado por la cadena de suministro de una empresa estadounidense. Esa es la posición extraña de esta isla: todo el mundo, incluida la parte que más quiere cambiar su estatus, no puede prescindir de los chips que se fabrican aquí. Pero “el mundo no puede prescindir de ti” y “por eso estás seguro y tienes la última palabra” siguen siendo dos cosas distintas. Este artículo no dicta una conclusión política para Taiwán, pero la tensión misma merece que cada lector la pese por su cuenta.

## Dependencia, no significa control

Volviendo a la pared de logotipos con esas 55 empresas.

Cada nombre en esa pared es real. Son el cuerpo físico de la revolución de la IA terrestre; sin ellos, NVIDIA, valorada en cinco billones de dólares, ni siquiera puede entregar un solo chip. Esta irremplazabilidad es un hecho ingenieril, no una retórica. Taiwán debería estar orgulloso de esto.

Pero al observar el camino recorrido, el halo, la valoración y la toma de decisiones recaen en quienes construyeron esa pared; mientras que el 5% del margen de beneficio, los servicios públicos agotados, los precios inmobiliarios inflados hasta lo inalcanzable y el riesgo de guerra atado a la isla, recaen sobre los nombres en la pared. Taiwán sostiene un interruptor que el mundo no puede apagar, pero eso no le da el poder absoluto. Y este activo tiene una fecha de caducidad cercana al 2028.

Taiwán sí está moviéndose. Lai Ching-te propuso en 2025 convertir a Taiwán en uno de los "cinco principales centros de computación globales", desarrollando la "IA soberana" [^66]; Foxconn está construyendo una supercomputadora nacional en Kaohsiung que utiliza diez mil chips Blackwell [^67]; el "Nuevo Plan Decenal de IA" del Ejecutivo planea invertir más de 100.000 millones, con un objetivo de 15 billones de valor añadido [^68]. Esto es la aspiración de pasar de "fabricar para otros" a "computar para sí mismo": ascender desde el fondo de la curva de la sonrisa.

Sin embargo, todavía queda mucho camino por recorrer. El modelo de lenguaje propio de Taiwán, TAIDE, ha sido descrito como de nivel de "estudiante de secundaria", mientras que las grandes empresas internacionales ya están en nivel de "posgrado" [^69]. El gobierno surcoreano compró 260.000 unidades de GPU de una sola vez, y aquí en Taiwán todavía se está negociando por un terreno y una indemnización [^70]. Desde recibir la llamada de Morris Chang hasta manejar la capacidad de cómputo del mundo entero, Taiwán tardó casi treinta años en llegar a esa pared. Pero pararse sobre ella y tomar el lápiz son dos cosas diferentes.

Esa pared seguirá brillando. En la próxima Computex, habrá más logotipos detrás de Jensen Huang. En 2026, él reveló que NVIDIA gasta alrededor de 150.000 millones de dólares en Taiwán anualmente; hace cinco años eran solo entre 10 y 15 mil millones [^71]. La pregunta de si "Taiwán es importante" ya tiene una respuesta. Lo que Taiwán debe responder es lo más difícil: cuando el mundo no puede prescindir de lo que haces, ¿cómo logras que la "indispensabilidad" se convierta lentamente en "poder de decisión"?

Los nombres en la pared siguen aumentando. ¿Será que quien sostiene el lápiz será propio? Taiwán apenas está comenzando a tocar ese lápiz.

---

**Lecturas relacionadas**:

- [Jensen Huang: del joven que limpiaba baños al gurú de un imperio de cinco billones](/es/people/jensen-huang) — La biografía personal del fundador de NVIDIA; este artículo solo toca superficialmente su historia familiar en Tainan y su crecimiento.
- [Industria de semiconductores](/es/technology/taiwan-semiconductor-industry) — ¿Por qué Taiwán puede ser el centro mundial de la fabricación de chips? Aquí se aborda la cadena de suministro con un contexto más completo.
- [Empresa taiwanesa: TSMC](/es/economy/tsmc) — La "montaña sagrada" que fabrica cada chip para NVIDIA, y la otra cara agotada.
- [Morris Chang: el destinatario de esa carta y el imperio de fundición que construyó](/es/people/tsmc-morris-chang) — El fundador de TSMC, quien recibió una carta de Jensen Huang en 1996.
- [Computex: la feria informática de Taipéi se convierte en la ceremonia de apertura de la IA mundial](/es/technology/computex) — El escenario donde brilla esa pared de logotipos, el evento anual del sector tecnológico de Taiwán.
- [Industria de inteligencia artificial](/es/technology/artificial-intelligence-industry) — Desde fabricar chips para NVIDIA hasta construir un ecosistema de IA, la posición de Taiwán en la ola de la IA.
- [Desarrollo y estrategia de IA de Taiwán](/es/technology/artificial-intelligence-development-strategy) — IA soberana, TAIDE y el intento nacional de Taiwán por ascender desde la fabricación.
- [Historias tecnológicas de Taiwán: chips con 100 puntos, micrófono con 60](/es/technology/taiwan-tech-storytelling) — Dos formas de contar sobre el mismo chip: la prima del beneficio que se lleva NVIDIA y cómo debe aprender la tecnología taiwanesa.
- [Empresa taiwanesa: Foxconn Precision Industry](/es/economy/foxconn-precision-industry) — El gigante de la fabricación que ensambla el 40% de los racks de IA a nivel mundial, las manos más grandes en el fondo de la curva de la sonrisa.

## Fuentes de imágenes

- [Jensen Huang at Computex Taipei](https://commons.wikimedia.org/wiki/File:Jensen_Huang_at_Computex_Taipei_20160531c.jpg) — Foto: NVIDIA Taiwan, 2016, CC BY 2.0 (hero, Jensen Huang durante una conferencia en el escenario de Computex)
- [NVIDIA Ampere GA102 GPU die](<https://commons.wikimedia.org/wiki/File:Nvidia@8nm@Ampere@GA102@GeForce_RTX_3090@S_TW_2032A1_SNNB9W.000_GA102-300-A1_DSC06025-DSC06107_(50740715646).jpg>) — Foto: Fritzchens Fritz, CC0 (micrografía del die del chip)
- [Jensen Huang holding RTX Blackwell at CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Foto: Pronoia, CC0
- [TSMC factory in Taichung](https://commons.wikimedia.org/wiki/File:TSMC_logo_on_Taichung_factory_building.jpg) — Foto: Briáxis F. Mendes, CC BY-SA 4.0
- [Computex Taipei at Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Foto: NVIDIA Taiwan, 2015, CC BY 2.0
- Video: [NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025](https://www.youtube.com/watch?v=TLzna9__DnI) — Canal oficial de NVIDIA en YouTube

## Referencias

[^1]: [NVIDIA becomes first company to hit $5 trillion market cap](https://www.cnbc.com/2025/10/29/nvidia-5-trillion-market-cap.html) — CNBC informó el 29 de octubre de 2025 que NVIDIA se convirtió en la primera empresa de la historia en superar los cinco billones de dólares de valor de mercado, impulsada por la demanda de cómputo de IA.

[^2]: [台灣占全球 AI 伺服器市場 90%](https://technews.tw/) — Datos del Ministerio de Asuntos Económicos y del MIC del III: la industria taiwanesa de servidores ya representaba más de 80% de los envíos mundiales, y la producción y ensamblaje por contrato de servidores de IA alcanzó 90% del total mundial; si se incluyen proveedores de marcas estadounidenses, llega a 100%. El motor fue la exigencia de clientes estadounidenses de producir fuera de China.

[^3]: [TrendForce：NVIDIA 成台積電最大客戶](https://www.trendforce.com/) — Datos de TrendForce del 1 de junio de 2026: la contribución de “Customer A” (NVIDIA) a los ingresos de TSMC subió de 12% en 2024 a 19% en 2025, superando a Apple (22%→17%) como mayor cliente. Fuente primaria: informe anual 2025 de TSMC (investor.tsmc.com).

[^4]: [TrendForce：Rubin Ultra 改採雙晶粒架構](https://www.trendforce.com/news/) — Análisis de TrendForce del 1 de abril de 2026: el encapsulado de cuatro chiplets elevaría el área hasta 7.5-8 veces el límite de retícula y “perjudicaría gravemente el rendimiento y el costo”, por lo que el diseño giró hacia dos chiplets; la IA ocupará 36% de la capacidad de 3 nm en 2026, frente a 5% en 2025. Las limitaciones físicas de rendimiento de encapsulado determinan directamente la arquitectura del chip.

[^5]: [NVIDIA FY2025 10-K（SEC）](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Informe anual FY2025 presentado por NVIDIA ante la Comisión de Bolsa y Valores de Estados Unidos: margen bruto GAAP anual de 75.0% (72.7% en FY2024).

[^6]: [黃仁勳 Computex 2025 演講整理：55 家台廠 logo 牆](https://money.udn.com/money/story/5612/8750451) — Recopilación de Economic Daily News que enumera literalmente las 55 empresas taiwanesas mencionadas en la pantalla de fondo de Computex 2025 (Aaeon, Accton, Delta Electronics... TSMC, UMC, Unimicron, Wistron, Wiwynn, Aetina); otro informe indicó que, sumando la pantalla de fondo y el video de agradecimiento, llegaron a 122.

[^7]: [NVIDIA 對台積電 3/4 奈米的依賴](https://www.ainvest.com/news/) — Análisis industrial: los chips más rentables de NVIDIA, H200, Blackwell y Rubin, dependen por completo de los procesos de 3 y 4 nanómetros de TSMC, creando un doble cuello de botella en fabricación y encapsulado.

[^8]: [NVIDIA FY2025 10-K 供應鏈集中揭露（SEC）](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Texto original del informe anual de NVIDIA: “Our supply chain is mainly concentrated in the Asia-Pacific region. We utilize foundries, such as Taiwan Semiconductor Manufacturing Company Limited, or TSMC... to produce our semiconductor wafers.” Los factores de riesgo enumeran la concentración geográfica de proveedores, fundiciones, encapsulado y pruebas como riesgo geopolítico.

[^9]: [TSMC CoWoS 產能與 NVIDIA 占比](https://www.financialcontent.com/article/tokenring-2025-12-26-tsmc-boosts-cowos-capacity) — Datos de FinancialContent y SiliconAnalysts: NVIDIA ocupa alrededor de 60% de la capacidad CoWoS de TSMC (SiliconAnalysts habla de unas 595,000 obleas); medios taiwaneses afirman que alcanzó 70% en 2025. Los tres mayores clientes (NVIDIA, Broadcom y AMD) suman más de 85%.

[^10]: [鴻海 AI 機架組裝市占超過四成](https://vocus.cc/) — Estimación de Yuanta Investment Consulting: Hon Hai (Ingrasys) se encarga de módulos GPU, switch boards, compute boards y sistemas de rack GB200 NVL72, con una cuota superior a 40%; su planta de Nanching fue certificada por el Foro Económico Mundial como la primera fábrica faro de servidores de IA del mundo en diciembre de 2023.

[^11]: [廣達在前 50 大資料中心市占過半](https://www.artificialintelligence-news.com/news/ai-servers-transform-taiwan-manufacturing-giants/) — AI News informó que Quanta (QCT) se encarga de la integración L10 y L11, posee más de 50% de cuota en los 50 mayores centros de datos en la nube y es el segundo mayor ensamblador de servidores del mundo.

[^12]: [緯創竹北 AI 新廠被 NVIDIA 訂單包下](https://vocus.cc/) — Informe industrial: Wistron se encarga de HGX/DGX, y su nueva planta del parque de IA en Zhubei está “totalmente copada por los fuertes pedidos de NVIDIA”.

[^13]: [台廠 AI 伺服器毛利率法說會數據](https://www.cnyes.com/) — Conferencias de resultados FY2025-FY2026 de cada compañía: margen bruto de Hon Hai Q1 FY2026 de 6.18% (los servidores de IA superan la mitad de los ingresos de cloud networking), Quanta 4.78% (caída trimestral de 1.54 puntos porcentuales, mínimo en casi 15 trimestres), Wistron 5.21%, Wiwynn 7.2% (9.4% un año antes).

[^14]: [次級供應鏈台廠毛利率（玉山投顧）](https://vocus.cc/) — Cuanto más cerca del extremo tecnológico, más alto es el margen de las empresas taiwanesas: Delta Electronics (energía/refrigeración) tiene más de 60% de cuota en fuentes de poder para servidores de IA y margen bruto Q1 FY2026 de 37%; Unimicron (sustratos ABF) supera 70% de cuota en sustratos para AI ASIC, es actualmente el único proveedor de placas CoWoP para NVIDIA y se estima en 21.3% de margen bruto.

[^15]: [摩根士丹利：ODM 組裝增值毛利下滑](https://newtalk.tw/) — Newtalk citó un informe de Morgan Stanley del 22 de mayo de 2026: el margen bruto de valor agregado del ensamblaje ODM a nivel de sistema completo cae de 2.7% en GB300 a alrededor de 1.9% en VR200; el valor agregado por rack de los ODM sube de unos 108,000 dólares en GB300 a 149,600 en VR200. Nota: se refiere al margen bruto de valor agregado del ensamblaje de sistema completo, una dimensión distinta del margen bruto corporativo total (5-7%).

[^16]: [Taiwan Insight：繁榮的台灣經濟，多數人沒感受到好處](https://taiwaninsight.org/) — Artículo de Min-Hua Chiang, Universidad de Nottingham, 12 de enero de 2026: “most people in Taiwan did not feel the benefits of the thriving economy.” “The top 10% earners in Taiwan received 48% of total income, whereas the bottom 50% only received 12%.” El crecimiento estimado de 2025 fue 7.37%, entre los más altos del mundo.

[^17]: [報導者：AI 榮景下的 K 型分化](https://www.twreporter.org/) — Artículo de opinión de Wang Ying-da en The Reporter, 11 de junio de 2026: “la población empleada directamente en la principal cadena de crecimiento de IA, semiconductores y suministro electrónico representa menos de 10% del empleo total”; “el salario mensual total por persona en restaurantes y servicios de comida es de 38,484 dólares taiwaneses, sólo 34.6% del de la fabricación de componentes electrónicos”. El peso de las industrias electrónicas en los ingresos de manufactura subió de 58.0% a 64.7%.

[^18]: [《The Nvidia Way》：離倒閉只剩三十天](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Libro de Tae Kim de 2024 y podcast Acquired/Sequoia: máxima interna de NVIDIA “Our company is thirty days from going out of business.”, usada al inicio de reuniones mensuales; cuando RIVA 128 salió al mercado en agosto de 1997, la empresa sólo tenía aproximadamente un mes de nómina. Es una máxima en inglés, sin versión china literal.

[^19]: [世嘉 500 萬美元救了 NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired y materiales históricos tempranos de NVIDIA: quien realmente sacó a NVIDIA de la crisis financiera a fines de la década de 1990 fue una inversión de 5 millones de dólares de SEGA, no Taiwán; esto aclara la versión romantizada de que “Taiwán salvó a NVIDIA”.

[^20]: [黃仁勳寫信給張忠謀求代工](https://www.ettoday.net/) — ETtoday citó que Jensen Huang escribió alrededor de 1996 al fundador de TSMC, Morris Chang, para preguntar si “TSMC podía fabricar por contrato el primer chip de NVIDIA”; en 1998 firmaron formalmente un acuerdo de cooperación y TSMC se convirtió en la principal fundición de obleas.

[^21]: [台積電米玉傑：深遠合作始於 1997](https://technews.tw/) — TechNews, 19 de mayo de 2025: Miin Wu de TSMC recordó que “la cooperación profunda comenzó en un momento clave, en 1997. Morris Chang, fundador de TSMC, contactó personalmente al fundador de NVIDIA, Jensen Huang, en respuesta a la solicitud de servicios de fundición de NVIDIA”.

[^22]: [黃仁勳接張忠謀電話的場景（二手轉述）](https://www.businessweekly.com.tw/) — Versión en extracto ilustrado de Business Weekly: cuando Huang recibió la llamada de Morris Chang, gritó a quienes estaban a su lado: “¡Todos! ¡Bajen la voz! ¡Es Morris Chang quien llama!”. Es una narración de segunda mano y el tono quizá no sea exacto.

[^23]: [1998 台積電製程出錯幾乎毀了 NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired y materiales históricos tempranos de NVIDIA: en 1998, un error en un proceso químico de TSMC provocó la pérdida de grandes lotes de chips de NVIDIA y casi volvió a hundir la empresa, lo que confirma el marco de “Taiwán como punto vital de fabricación, no como salvador de quiebra” en una simbiosis bidireccional.

[^24]: [AlexNet 用兩張 GTX 580 訓練](https://en.wikipedia.org/wiki/AlexNet) — Wikipedia y Tom's Hardware: en 2012, Alex Krizhevsky entrenó AlexNet con dos tarjetas NVIDIA GTX 580 en una habitación de la casa de sus padres, reduciendo la tasa de error de reconocimiento de imágenes de ImageNet de 26% a 15.3%, 10.8 puntos porcentuales por delante del segundo lugar, y demostrando que la GPU era el motor del aprendizaje profundo. CUDA se lanzó en 2006.

[^25]: [Blackwell/Rubin 100% 依賴台灣境內 CoWoS-L](https://finance.biggo.com/news/) — Análisis industrial citando al Financial Times: entre 2025 y 2027, las GPU de IA más avanzadas de NVIDIA, desde la fabricación hasta el encapsulado final, están 100% atadas a las líneas CoWoS-L de TSMC dentro de Taiwán.

[^26]: [台積電掌全球約 90–92% 先進製程](https://www.csis.org/analysis/countering-chinas-challenge-american-ai-leadership) — Análisis del CSIS: TSMC produce alrededor de 92% de los semiconductores más avanzados del mundo (por debajo de 5 nm), y su capacidad de encapsulado avanzado supera la suma de todos sus competidores; entre los clientes que dependen casi 90% de Taiwán están Apple, Amazon, Google, NVIDIA y Qualcomm.

[^27]: [台科大周雲蔡：短期無法分散台積電代工](https://www.sciencedirect.com/) — Investigación de 2025 de Yuntsai Chou, Universidad Nacional de Ciencia y Tecnología de Taiwán: “Taiwan's supply chain would be particularly vulnerable to a quarantine initiated before 2027”; “Diversifying TSMC foundries is not feasible in the short term. Building a new leading-edge fab takes 3–4 years and costs $10B+.” La producción de 2 nm de TSMC Arizona apunta a 2030.

[^28]: [聯合報：兩兆雙星淪為兩兆傷心慘業](https://udn.com/) — United Daily News revisó la política “Dos billones, dos estrellas”: “las otrora gloriosas fábricas de paneles y empresas de memoria del sector semiconductor, pocos años después, debido al exceso de oferta en el mercado internacional, sufrieron fuertes pérdidas y fueron apodadas por internautas ‘sacerdotes Maoshan’ (mao san dao si, margen bruto de tres a cuatro), es decir, productos con margen bruto de apenas 3% a 4%; las ‘industrias de dos billones, dos estrellas’ se convirtieron en ‘dos billones de industrias tristes’”. Paneles y DRAM fueron vaciados porque la inversión en I+D fue apenas 6%, muy inferior al 10-21% de Corea del Sur, Japón, Estados Unidos y Europa.

[^29]: [中芯 5 奈米良率僅台積電三分之一](https://technews.tw/2025/03/28/) — TechNews, 28 de marzo de 2025: “Con el mismo flujo de fabricación, las obleas de 5 nanómetros de SMIC son 50% más caras que las de TSMC, y por usar sólo equipos DUV, su rendimiento es apenas 33% del de TSMC”; en diciembre de 2025 afirmó haber iniciado producción masiva, con unos cinco años de rezago.

[^30]: [NVIDIA 50 億美元入股英特爾搶封裝產能](https://www.intel.com/) — En diciembre de 2025, NVIDIA tomó alrededor de 5% de Intel; el verdadero objetivo fue “asegurar acceso prioritario a la capacidad de encapsulado avanzado de Intel en Estados Unidos”, evaluada para la arquitectura Feynman de 2028, en respuesta al cuello de botella CoWoS de TSMC. Es una cobertura de largo plazo, no un sustituto inmediato.

[^31]: [台積電亞利桑那封裝廠 AP1 2028 量產](https://www.tomshardware.com/) — Informe industrial: las plantas de encapsulado AP1/AP2 de TSMC Arizona iniciarían construcción a comienzos de 2026; AP1 prevé producción masiva en 2028. Por ahora, 100% de los chips —incluidos los fabricados en Phoenix, Arizona— deben volver a Taiwán para encapsulado. La planta de Amkor en Arizona iniciaría producción masiva a comienzos de 2028.

[^32]: [力成 PiFO 封裝對標 CoWoS-L](https://www.trendforce.com/news/) — TrendForce, 10 de noviembre de 2025: “PiFO advanced packaging technology—benchmarked against TSMC's CoWoS-L—has emerged as the industry's top alternative”; ofrece mejor disipación con sustrato de vidrio, costo de producción alrededor de 30% menor, varias compañías estadounidenses de chips de IA acudieron en busca de ayuda y los pedidos ya llegan hasta 2027. Pero los clientes son “otras compañías estadounidenses de chips de IA”, no GPU principales de NVIDIA claramente identificadas.

[^33]: [TrendForce：CoWoS 缺口縮窄靠台積電自己擴產](https://www.trendforce.com/news/) — TrendForce, 15 de junio de 2026: “the CoWoS supply-demand gap is expected to narrow significantly from around 20% currently to about 10% by the end of 2026”; la capacidad mensual podría llegar a 120,000-140,000 obleas en 2026, nuevo récord. La brecha se reduce por expansión de TSMC, no por sustitución de proveedores.

[^34]: [新光人壽 2021 標下北士科 T17/T18 地上權](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: en 2021, el Gobierno de Taipéi licitó los terrenos T17 y T18 de Beitou-Shilin (3.89 hectáreas en total) bajo derecho de superficie por 50 años, eliminando el requisito de plan de inversión; Shin Kong Life fue el único postor y ganó T17 por 2,800 millones y T18 por 1,600 millones (4,400 millones en total), quedando ociosos durante tres años.

[^35]: [黃仁勳 Computex 2025 宣布 Constellation 總部落腳北士科](https://focustaiwan.tw/business/202505190009) — Focus Taiwan: en Computex de mayo de 2025, Jensen Huang anunció que la sede internacional “Constellation” de NVIDIA prefería instalarse en el Parque Tecnológico Beitou-Shilin, con inversión superior a 40,000 millones de dólares taiwaneses, inicio de obras en 2026, apertura en 2030 y más de 10,000 empleos.

[^36]: [NVIDIA、新壽、北市府三方卡關五個月](https://news.pts.org.tw/article/777650) — PTS: como los derechos de superficie de T17/T18 en Beitou-Shilin estaban en manos de Shin Kong Life y los derechos de superficie públicos no pueden transferirse directamente, las tres partes quedaron bloqueadas por la adquisición del terreno durante unos cinco meses.

[^37]: [台北市議會通過 44.34 億解約金](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: el 12 de noviembre de 2025, el Concejo Municipal de Taipéi aprobó sin objeciones una indemnización de rescisión de 4,434,064,085 dólares taiwaneses (NT$4,434,064,085), que el Gobierno municipal pagaría a Shin Kong Life para recuperar el terreno; el derecho de superficie se canceló registralmente el 28 de diciembre.

[^38]: [游淑慧批新壽解約帳單](https://www.nextapple.com/) — Next Apple News, verificado mediante WebFetch: la concejala del Kuomintang Yu Shu-hui escribió literalmente: “Cuando vi en las ocho páginas de la cuenta de Shin Kong Life que hasta el desmalezado, el mantenimiento ambiental, los ajustes de logo y los honorarios del agente escriturador querían que los pagara el Gobierno de Taipéi, sólo pude sonreír amargamente... ¿Incluso el costo de ajustar el logo por la fusión de Taishin y Shin Kong Life debe pagarlo el Gobierno de Taipéi? De verdad, me desmayo... suspiro tres veces de impotencia”. Después: “La factura de Shin Kong Life es inconcebible, pero hay que priorizar el panorama general”.

[^39]: [法律白話文：議會各黨派和諧通過解約案](https://plainlaw.me/) — Plain Law Movement: “El 12 de noviembre, el Concejo Municipal de Taipéi examinó y aprobó la indemnización de rescisión de 4,434 millones; durante el proceso, todos los partidos estuvieron en armonía, y el caucus del Partido Democrático Progresista incluso gritó ‘apoyen a NVIDIA, firmen cuanto antes’”. El presidente del Concejo, Tai Hsi-chin, dijo “sin objeciones, se toma nota”, y el recinto aplaudió.

[^40]: [44.34 億解約金組成分析](https://www.nextapple.com/) — Next Apple News y cálculo de contadores externos del Gobierno de Taipéi: Shin Kong Life había pagado unos 3,300 millones (sin iniciar obras durante tres años) y presentó una factura de rescisión de 4,470 millones (incluidos desmalezado, ajuste de logos y cercas); los contadores recortaron unos 40 millones y fijaron 4,434 millones, de los cuales 1,441 millones en costos propios e impuestos ya pagados de Shin Kong Life fueron asumidos globalmente por NVIDIA.

[^41]: [都委會通過 Constellation 星艦造型總部設計](https://www.cna.com.tw/news/) — CNA, 26 de enero de 2026: T17 (2.29 hectáreas) y T18 (1.6 hectáreas) se fusionaron; cobertura edificable de 50%→70%, coeficiente de ocupación 300%, altura 119.5 metros, forma de “nave estelar” inspirada en la sede estadounidense, cobertura verde 80%, capacidad para unas 4,000 personas, inicio de obras a fines de 2026 y apertura en 2030.

[^42]: [NVIDIA 台灣現有員工約 1,800 人](https://www.digitimes.com/news/a20250519PD231/) — Estimaciones de Digitimes y otros medios: la oficina de NVIDIA en Neihu, Taipéi (número 8 de Jihu Road), tiene unos 1,800 empleados y tres sucursales; es una estimación mediática, no una cifra oficial.

[^43]: [NVIDIA AI 創新研發中心計畫](https://focustaiwan.tw/business/202505190009) — Focus Taiwan y Ministerio de Asuntos Económicos: en 2021, NVIDIA recibió aprobación para el “Plan de Centro de Innovación e Investigación en IA”, con inversión total de 24,300 millones de dólares taiwaneses, subsidio gubernamental de 6,700 millones y contratación de un equipo de I+D de 1,000 personas entre 2022 y 2027.

[^44]: [台灣輝達經典股份有限公司成立](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: en noviembre de 2025, NVIDIA constituyó “Taiwan NVIDIA Classic Co., Ltd.”, con capital aumentado de 1,000 millones a 3,300 millones de dólares taiwaneses; es una persona jurídica independiente que puede pagar impuestos y poseer activos por cuenta propia.

[^45]: [標普：台積電 2030 用電可達全台 23.7%](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — Initium Media y S&P: en 2023, TSMC consumió 24,775 millones de kWh, 8.96% del total de Taiwán (16.2% del sector industrial); en 2024 consumió 27,456 millones de kWh, con apenas 14.1% de energía renovable. S&P proyecta que para 2030 su consumo podría llegar a 23.7% del total de Taiwán.

[^46]: [綠色和平《晶片榮景後的暗影》](https://www.greenpeace.org/taiwan/press/44037/) — Informe de Greenpeace del 10 de abril de 2025, “La sombra detrás del auge de los chips”: el consumo eléctrico mundial de fabricación de chips de IA pasó de 218 GWh a 984 GWh (aumento anual de más de 3.5 veces), y el de Taiwán saltó a 375.8 GWh, “hasta representar 38% del total mundial”; las emisiones de chips de IA de TSMC fueron 185,700 toneladas de CO2 y la convirtieron en “campeona de emisiones”; NVIDIA recibió calificación F, con emisiones de cadena de suministro que pasaron en tres años de 3.51 millones a 6.91 millones de toneladas, “simplemente transfiriendo las emisiones y la contaminación de su cadena de suministro a otras regiones del mundo”.

[^47]: [台南再生水幾乎全給台積電](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — Initium Media: TSMC usa más de 200,000 toneladas de agua al día (56,000 en Hsinchu Science Park, 53,000 en Central Taiwan Science Park y 99,000 en Southern Taiwan Science Park); las cuatro plantas de agua regenerada de Tainan suministran 81,000 toneladas diarias que “casi todas van a TSMC”.

[^48]: [嘉南農田 2021、2023 兩度停灌讓水給半導體](https://theinitium.com/) — Initium Media y otros informes: las tierras agrícolas de Chianan suspendieron el riego en 2021 y 2023 para reasignar agua de irrigación a la industria de semiconductores.

[^49]: [一片 12 吋晶圓需 8,327 公升水](https://www.greenpeace.org/taiwan/) — Greenpeace y datos industriales: fabricar una oblea de 12 pulgadas requiere aproximadamente 8,327 litros de agua.

[^50]: [北士科 6 萬就業人口搶 1,476 戶住宅](https://house.udn.com/house/story/123590/8769929) — Economic Daily News Real Estate: la Oficina de Desarrollo Industrial de Taipéi estima que la población empleada permanente de Beitou-Shilin puede llegar a 60,000 personas; según 591, hay apenas unas 1,476 viviendas disponibles para la venta, y el suelo residencial sólo representa 13.8% de la zona.

[^51]: [北士科核心地段新案破每坪 150 萬](https://www.ctee.com.tw/news/20260603701575-430601) — Commercial Times, junio de 2026: nuevos proyectos en el núcleo de Beitou-Shilin superaron 1.5 millones de dólares taiwaneses por ping; “60,000 personas compiten por 1,500 viviendas”; residentes temen congestión al estilo Neihu y cuestionan “por qué sube si la empresa ni siquiera empezó obras”.

[^52]: [實價登錄：士林區住宅最高成交每坪 188 萬](https://lvr.land.moi.gov.tw/) — Servicio de consulta de precios reales de transacciones inmobiliarias del Ministerio del Interior: la transacción residencial más alta de Shilin en 2025 fue de 570,400 dólares taiwaneses por metro cuadrado (unos 1.88 millones por ping), en el número 39 de Jihe Road, con precio total de 447 millones; varias transacciones superaron 1.5 millones por ping. Nota: se trata de residencias de lujo en Tianmu y el centro de Shilin, no de Beitou-Shilin propiamente.

[^53]: [業者：園區生活機能差，三分之一員工離職](https://house.udn.com/house/story/123590/8769929) — United Daily News Real Estate citó a un operador anónimo: “por la mala funcionalidad cotidiana, muchos empleados no están dispuestos a mudarse con la empresa al parque... incluso después de mudarse, un tercio renunció por la incomodidad del transporte”; el director de Transporte, Hsieh Ming-hung, dijo que Beitou-Shilin evalúa añadir tres rutas operativas.

[^54]: [PTT 匿名輿論：改換輝達題材](https://www.ptt.cc/) — Discusión anónima en PTT (sin trazabilidad individual): “antes se agotó el efecto TSMC, ahora sólo se cambió al tema NVIDIA”; “muchos ingenieros de Neihu viven en otros condados y ciudades; ¿si NVIDIA viene a Beitou-Shilin todos se mudarán allí? La lógica no tiene sentido”.

[^55]: [矽盾與矽陷阱辯論](https://www.researchgate.net/) — Investigación de 2025 en ResearchGate, “Silicon Shield or Silicon Trap?”, que explora cómo la concentración de chips de Taiwán constituye a la vez protección disuasoria (escudo de silicio) e incentivo de invasión o punto único de falla (trampa de silicio).

[^56]: [破巢／焦土戰略的反論](https://thenewslens.com/) — The News Lens y Parameters del U.S. Army War College (McKinney & Harris, 2021), tesis “Broken Nest” y críticas: “Economic self-harm, even if successful in deterring China in the short-term, may only delay Chinese aggression until China can meet domestic semiconductor production goals”; “it is unlikely that the Taiwanese public would view such a sabotage as in the country's own interests”.

[^57]: [台積電美國擴廠 1,650 億美元](https://www.foreignaffairs.com/) — TSMC anunció inversiones en Arizona, Estados Unidos, por un total de 165,000 millones de dólares (65,000 millones más 100,000 millones), para diversificar riesgos geopolíticos.

[^58]: [MIT 科技評論：台灣矽盾可能正在弱化](https://www.technologyreview.com/) — MIT Technology Review, 15 de agosto de 2025, “Taiwan's silicon shield could be weakening”: “Now some Taiwan specialists and some of the island's citizens are worried that this 'silicon shield,' if it ever existed, is cracking.” La preocupación es que la salida de capacidad productiva diluya la ficha local de Taiwán.

[^59]: [葛來儀：台灣生態系難以複製](https://www.technologyreview.com/) — MIT Technology Review citó a Bonnie Glaser, del German Marshall Fund: “The ecosystem they created is truly unique. It's a function of the talent pipeline, the culture, and laws in Taiwan; you can't easily replicate it anywhere.”

[^60]: [Paul Triolo：亞利桑那永遠到不了那個程度](https://www.technologyreview.com/) — MIT Technology Review citó al experto en política tecnológica Paul Triolo sobre la planta de TSMC en Arizona: “Arizona ain't that yet, and never will be.”

[^61]: [黃仁勳：台灣是世界上最重要的國家之一](https://www.cna.com.tw/) — CNA y múltiples fuentes: el 29 de mayo de 2024, Jensen Huang dijo públicamente en Taiwán: “Taiwan is one of the most important countries in the world.” (frase original en inglés).

[^62]: [Computex 2024 台大演講：臺灣是無名英雄世界支柱](https://www.tbotaiwan.com/) — Transcripción completa del discurso de Jensen Huang en la Universidad Nacional de Taiwán durante Computex 2024; frase final del video: “Taiwán es el héroe anónimo y, sin embargo, el pilar del mundo”; “¡Gracias, Taiwán!”; “Taiwán es la concentración de nuestros socios más valiosos; todo en NVIDIA empezó aquí”.

[^63]: [國台辦陳斌華回應黃仁勳言論](https://zh.wikinews.org/) — Wikinews: Chen Binhua, portavoz de la Oficina de Asuntos de Taiwán de China, respondió 18 días después: “Ante declaraciones tan extremadamente erróneas, la población continental y los internautas ya han expresado fuerte descontento. Taiwán nunca ha sido un país... esperamos que estudie bien la lección.”

[^64]: [中央社：陸媒消音黃仁勳「台灣是重要國家」](https://www.cna.com.tw/) — CNA, 3 de junio de 2024: “Los medios financieros de aquí publicaron muchos informes relacionados, pero no se vio mención de que Huang dijera que ‘Taiwán es un país importante’, como si hubieran omitido un tema sensible que normalmente se considera de ‘máxima prioridad’.”

[^65]: [專家：中國需要輝達，但輝達不需要中國](https://www.voacantonese.com/a/china-s-media-turned-a-blind-eye-to-jensen-huang-s-statement-20240607/7646642.html) — Voice of America Cantonese citó análisis de expertos: el silencio de los medios financieros chinos ante la frase de Huang sobre “Taiwán como país importante” refleja la relación asimétrica de que “China necesita a NVIDIA, pero NVIDIA no necesita a China”.

[^66]: [賴清德：全球前五大運算中心與主權 AI](https://www.bnext.com.tw/article/79391/sovereign-ai) — Business Next: en octubre de 2025, Lai Ching-te propuso que Taiwán se convirtiera en uno de los “cinco mayores centros de cómputo del mundo” y desarrollara “IA soberana”.

[^67]: [鴻海建一萬顆 Blackwell 國家超級電腦](https://blogs.nvidia.com.tw/blog/foxconn-ai-factory-tsmc-taiwan-nvidia/) — Blog de NVIDIA Taiwán: Hon Hai (Big Innovation Company) construye en Kaohsiung una supercomputadora nacional con 10,000 chips Blackwell y más de 90 exaflops, junto con TSMC y el Consejo Nacional de Ciencia y Tecnología, para crear la primera fábrica de IA de Taiwán.

[^68]: [行政院 AI 新十大建設](https://iknow.stpi.niar.org.tw/post/Read.aspx?PostID=21832) — STPI iKnow: las “Diez Nuevas Grandes Construcciones de IA” del Yuan Ejecutivo prevén invertir más de 100,000 millones de dólares taiwaneses antes de 2040, con objetivo de 15 billones en valor de producción.

[^69]: [TAIDE 像高中生，國際大廠是研究生](https://www.cw.com.tw/article/5137534) — CommonWealth Magazine: el modelo lingüístico local de Taiwán, TAIDE, fue descrito como “un estudiante de secundaria, mientras los grandes fabricantes internacionales ya están en nivel de posgrado”; el presupuesto anual completo del proyecto TAIDE no alcanzaría ni para una sola sesión de entrenamiento de un modelo internacional; TAIDE empezó con 9 máquinas (72 H100).

[^70]: [南韓政府採購 26 萬顆 GPU](https://www.cw.com.tw/) — CommonWealth Magazine e informes industriales: el Gobierno de Corea del Sur compró directamente 260,000 GPU, en contraste con la relativa vacilación de Taiwán en la toma de decisiones de política pública.

[^71]: [黃仁勳 Computex 2026：每年在台支出約 1,500 億美元](https://cryptobriefing.com/nvidia-150b-taiwan-silicon-shield-ai/) — Cryptobriefing y Reuters: en Computex 2026, Jensen Huang reveló que NVIDIA gasta alrededor de 150,000 millones de dólares estadounidenses al año en Taiwán (frente a 10,000-15,000 millones cinco años antes); los socios de la cadena Vera Rubin se duplicaron e incluyen 150 empresas taiwanesas; TSMC produce alrededor de 90% de los procesos más avanzados del mundo.
