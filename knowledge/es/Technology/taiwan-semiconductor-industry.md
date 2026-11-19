---
title: 'Industria de semiconductores: 50 años de revolución material, desde la transferencia tecnológica de RCA hasta el nitruro de galio y el empaquetado cuántico'
description: 'La "montaña sagrada protectora" de Taiwán domina los procesos avanzados globales gracias a la fabricación por encargo, pero el nitruro de galio en los cargadores rápidos, el CoWoS bajo los chips de IA y los refrigeradores de dilución sobre los qubits: el próximo campo de batalla de 50 años de la ciencia de materiales apenas se está desplegando.'
date: 2026-03-17
category: 'Technology'
tags:
  [
    'semiconductores',
    'TSMC',
    'nitruro de galio',
    'empaquetado 3D',
    'CoWoS',
    'computadora cuántica',
    'proceso avanzado',
    'escudo de silicio',
    'ciencia de materiales',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-19
lastHumanReview: true
difficulty: 'intermediate'
readingTime: 22
image: '/article-images/technology/silicon-vs-gan-charger-2025.webp'
imageCredit: '4300streetcar'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg'
sporeLinks:
  - id: 87
    platform: 'threads'
    date: '2026-05-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DYvqEURgXm-'
  - id: 88
    platform: 'x'
    date: '2026-05-25'
    url: 'https://x.com/taiwandotmd/status/2058735515021783190'
translatedFrom: 'Technology/半導體產業.md'
sourceCommitSha: 'f024e87e7a'
sourceContentHash: 'sha256:a50aa44ff04babb9'
sourceBodyHash: 'sha256:729d7ab175048563'
translatedAt: '2026-11-20T03:57:02+08:00'
---

# Industria de semiconductores: 50 años de revolución material, desde la transferencia tecnológica de RCA hasta el nitruro de galio y el empaquetado cuántico

![Dos cargadores rápidos USB-C de 30 W y misma potencia en comparación lateral, el de la izquierda hecho de silicio es notablemente más voluminoso, el de la derecha de nitruro de galio se reduce casi a la mitad, reflejando cómo la ciencia de materiales comprime la densidad energética en la palma de la mano](/article-images/technology/silicon-vs-gan-charger-2025.webp)
_Si vs GaN comparación de volumen de cargadores USB-C de misma potencia. Foto: 4300streetcar, 2025-12-25. [Licencia vía Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg)._

> **Resumen en 30 segundos:** TSMC inició la producción en volumen de 2 nm en el cuarto trimestre de 2025 en su Fab 22 de Kaohsiung, liderando al mundo por 2-3 generaciones[^2]. Pero la historia no ocurre solo en transistores cada vez más pequeños: tu cargador rápido de mochila lleva nitruro de galio (GaN), GlobalWafers fabrica obleas de carburo de silicio (SiC) de 8 pulgadas en Zhongli, y las GPU Blackwell de NVIDIA llegan a los centros de datos gracias al empaquetado CoWoS de TSMC. Desde 1973, cuando el ITRI gastó 4,5 millones de dólares en comprar tecnología a RCA[^5], hasta 2026, cuando la Academia Sinica conectó a internet su chip cuántico superconductor de 20 qubits[^6], Taiwán ha recorrido un largo río de ciencia de materiales: desde la física de la banda prohibida hasta la deposición atómica y los qubits topológicos. La montaña sagrada protectora se apoya en 50 años de experiencia industrial, pero la posición de fábrica por encargo en la era cuántica, Taiwán aún no la ha asegurado.

1985, una tarde. El ministro sin cartera Li Kwoh-ting citó en el Yuan Ejecutivo a Morris Chang (張忠謀), recién regresado a Taiwán para asumir la presidencia del ITRI. Li fue directo: «Queremos crear una empresa de fabricación de circuitos integrados de ultra gran escala, tú la diriges.»

Chang se quedó paralizado: creía que venía solo a ser director del instituto, y dos semanas después lo arrastraron a fundar una empresa con un modelo de negocio que nadie había probado antes.

Ese diálogo cambió el mundo, pero 40 años después, al mirar atrás, el «mundo» es mucho más grueso de lo que imaginaron aquella tarde. Incluye el cargador rápido de 65 vatios de apenas dos nudillos junto a tu móvil, cada GPU Blackwell que devora NVIDIA en sus centros de datos, y también los qubits en el laboratorio de la Academia Sinica que solo despiertan cuando se enfrían cerca del cero absoluto.

## 1987: aquella apuesta por el modelo foundry

![Fachada de la Fab 5 de TSMC en el Parque Científico de Hsinchu, edificio industrial de varias plantas conectado a la carretera Guangfu, una de las fábricas representativas de la expansión de TSMC en los 90](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_Fab 5 de TSMC en el Parque Científico de Hsinchu, 2010. Foto: Peellden. [Licencia vía Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG)._

La historia hay que contarla desde antes: 1973, el ITRI pagó 4,5 millones de dólares por la tecnología de circuitos integrados de la estadounidense RCA, envió 19 ingenieros a formarse en EE. UU.[^5]. Nadie imaginó entonces que aquella «matrícula» se convertiría en la primera piedra del reino taiwanés de los semiconductores. 1980, el ITRI transfirió tecnología para fundar UMC, Taiwán tuvo su primera empresa de semiconductores. Pero Li Kwoh-ting no se conformó: UMC era demasiado pequeña, su tecnología no alcanzaba el nivel internacional, Taiwán necesitaba un salto mayor.

21 de febrero de 1987, Morris Chang fundó Taiwan Semiconductor Manufacturing Company en el Parque Científico de Hsinchu, inaugurando un modelo de negocio inédito: **foundry puro**.

La idea sonaba loca entonces: todas las empresas de semiconductores del mundo eran verticalmente integradas, del diseño a la fabricación en una sola cadena, ¿cómo iba a funcionar una que solo fabricara y no diseñara? ¿Los clientes confiarían sus diseños más secretos?

La lógica de Chang era simple: la industria era cada vez más compleja, diseño y fabricación son dos profesiones totalmente distintas. En vez de hacerlo todo mediocre, mejor especializarse en una sola cosa y llevar la fabricación de chips a ser la mejor del mundo.

La estructura accionarial inicial de TSMC fue ingeniosa: el gobierno 48,3 %, inversores privados 24,2 %, Philips de Países Bajos 27,6 %[^1]. La participación de Philips fue clave. Entonces la industria la dominaban EE. UU. y Japón, Europa necesitaba un proveedor alternativo. Philips no solo invirtió, sino que entregó sus propios pedidos de chips a TSMC, convirtiéndose en su primer gran cliente.

El modelo foundry desencadenó la gran división del trabajo en semiconductores: empresas de diseño IC se dedican a diseñar (Qualcomm, NVIDIA, MediaTek), foundries a fabricar (TSMC, UMC, GlobalFoundries), casas de empaquetado y prueba al backend (ASE, SPIL). Antes solo gigantes como Intel o IBM podían permitirse la inversión astronómica de una fab; ahora cualquier startup con una buena idea puede diseñar chips y encargárselos a TSMC.

El núcleo del modelo es la confianza: el cliente debe creer que TSMC no robará su diseño, no filtrará secretos, no competirá con él. TSMC estableció cuatro principios de «reglas de confianza»: neutralidad tecnológica (nunca diseña chips propios), igualdad de clientes (todos disfrutan misma tecnología y servicio), acuerdos de confidencialidad de máximo nivel, asignación justa de capacidad. Esas reglas se han cumplido casi 40 años, sin excepción.

> 📝 **Nota del curador**: En el Taiwán de 1987, los 19 ingenieros que el ITRI envió a RCA apenas rondaban los 40. Habían aprendido procesos de silicio de los 60 en EE. UU.; nadie imaginaba que 30 años después serían los clientes principales de la tecnología de empaquetado mundial. Y la decisión de TSMC de no diseñar chips —esa «autocastración» voluntaria— terminó convirtiéndose en la atadura de la que no pueden escapar Huang Renxun, Cook ni Lisa Su. La grandeza del modelo foundry no está en lo que hizo, sino en lo que **eligió no hacer**. Si remontamos más: 1947, Bell Labs inventa el transistor; 1958, Texas Instruments y Fairchild crean cada una el circuito integrado; 1949, el gobierno nacionalista se traslada a Taiwán trayendo burócratas tecnócratas formados en ingeniería (futura columna vertebral del ITRI) —los 4,5 millones de dólares de RCA fueron el testigo de un relevo, no la línea de salida.

## Lin Ben-jian y ASML: la apuesta de dos niños marginados en la litografía por inmersión

El foundry no es cosa solo de TSMC. El lector [@malathrone_21k_running](https://www.threads.com/@malathrone_21k_running) añadió en comentarios esta línea histórica clave: TSMC y ASML comparten el mismo linaje de Philips —ASML nació en 1984 como escisión de Philips holandesa, hoy es el único proveedor mundial de máquinas EUV (extreme ultraviolet). Hace 30 años ambas eran niños que los gigantes de la industria ignoraban[^asml-philips].

El protagonista es un ingeniero taiwanés llamado Lin Ben-jian (Burn J. Lin, 林本堅). Desde 1992 investigaba litografía en el IBM Watson Research Center; en 2000 volvió a Taiwán como director de I+D de TSMC[^lin-bio]. En aquella época la disputa por la siguiente generación de litografía era el ultravioleta profundo de 157 nm; Nikon e Intel apostaban por esa vía, pero el 157 nm tropezaba sin parar: birrefringencia en lentes de fluoruro de calcio, absorción excesiva de las películas finas a esa longitud de onda, integración de proceso dificilísima[^157nm-fail].

En 2002, en la conferencia SPIE de óptica, Lin Ben-jian lanzó una idea loca: «Mantengamos la fuente de 193 nm, pero pongamos agua entre la lente y la oblea.» El índice de refracción del agua es 1,44; la luz de 193 nm en agua equivale a una resolución efectiva de ~134 nm —más fina que el 157 nm— y no hace falta cambiar ni fuente ni lentes[^immersion-litho].

Nikon no creyó, siguió apostando al 157 nm. ASML quiso apostar —también era un niño marginado, buscaba igual que TSMC una palanca física para dar la vuelta. 2003 ASML empezó a desarrollar litografía por inmersión de 193 nm (193i), 2007 la produjo en volumen primero, y desde el nodo de 65 nm aguantó **seis generaciones** hasta que llegó el EUV a relevarla[^immersion-litho][^cw-lin-interview].

«Nikon no se atrevió con la inmersión por el calor, ASML y nosotros nos la tuvimos que inventar», esa ruta tecnológica empujó a Nikon fuera del trono de la litografía[^cw-lin-interview]. Hace 30 años dos niños apostaron cada uno su baza; hoy uno es el único proveedor mundial de máquinas EUV, el otro la única foundry de 2 nm del mundo. Las dos semillas que sembró Philips holandés florecieron juntas en el siglo XXI.

## 50 años de genealogía material: del silicio al nitruro de galio y al superconductor topológico

Para entender el campo de batalla de 2025, hay que entender primero una línea física que nunca se ha explicado con claridad.

El silicio (Si) es el punto de partida: su «banda prohibida» (bandgap) es 1,1 electrón-voltio (eV), el boleto mínimo de energía para que un electrón salte de la banda de valencia a la de conducción. Banda estrecha, chip fácil de hacer, pero dos techos: alto voltaje lo rompe, alta frecuencia lo calienta. PanSci lo resume crudo: «El límite de frecuencia de trabajo de semiconductores de silicio está solo en 100 kHz; si se pasa, la eficiencia de conversión cae en picado y hay grave desperdicio de energía.»[^7]

El nitruro de galio (GaN) tiene banda prohibida de 3,4 eV, triple que el silicio. Voltaje de ruptura 10 veces superior. Frecuencia de trabajo hasta 1 MHz, un orden de magnitud entero por encima del silicio[^7]. Ese número físico se traduce en la vida: a igual potencia, el transformador y la bobina de GaN pueden ser mucho más pequeños, la disipación también baja, y nacen los cargadores rápidos que caben en la palma.

El carburo de silicio (SiC) toma otra ruta: también banda ancha (3,26 eV), pero más resistente a alta temperatura y alto voltaje. PanSci señala su frente: «El carburo de silicio goza de buena estabilidad en alta temperatura y alto voltaje, especialmente ante el aumento de la demanda de carga rápida de vehículos eléctricos, la necesidad de 1000 voltios o más hará que el silicio, que solo aguanta 600 V, no pueda cargar; se prevé que tome los componentes clave del coche eléctrico.»[^7]

> 💡 **¿Sabías que?**: La «banda prohibida» del semiconductor decide cuánto voltaje aguanta, qué tan rápido corre y cuánto calor genera. Silicio 1,1 eV = base de 50 años de electrónica de consumo; nitruro de galio 3,4 eV = sostiene cargadores rápidos de 240 W para móviles; carburo de silicio 3,26 eV = entra en inversores de 800 V de coches eléctricos; la siguiente parada quizá sea diamante 5,5 eV. Toda la genealogía material es una escalera de «densidad energética hacia arriba», y Taiwán en cada peldaño debe regatear con el límite físico de la ciencia de materiales.

La siguiente parada aún no tiene nombre: quizá diamante (C, 5,5 eV), óxido de galio (Ga₂O₃, 4,8 eV), o un salto a física distinta, como el superconductor topológico (topological superconductor), la ruta del procesador cuántico Majorana 1 que Microsoft presentó en febrero de 2025[^15]. Cambia la física, se reescribe toda la cadena industrial.

## El nitruro de galio dentro de tu cargador rápido

Acercamos el objetivo a tu mochila.

El cargador del Nokia 3310 daba 4,56 W; el de 2025 llega a 240 W. 52 veces más. PanSci trazó la línea temporal: «Los cargadores rápidos de nitruro de galio más populares hoy alcanzan 65 W, 13 veces más; idealmente el tiempo de carga se reduce a una treceava parte.»[^7] Más bestia aún: la marca china realme lanzó a principios de 2023 el GT Neo5 con carga ultrarrápida de 240 W, empujando el múltiplo por encima de 50.

Esa curva de crecimiento en física se apoya en el cambio a nitruro de galio: el grosor del cable de cobre y el volumen de la batería, paradójicamente, se encogen. Para subir potencia y bajar volumen, lo más directo es subir la frecuencia de trabajo, pero «el límite de frecuencia de semiconductores de silicio está solo en 100 kHz»[^7], ese es el «límite del silicio» de PanSci. El nitruro de galio lleva la frecuencia por encima de 1 MHz, transformador y bobina encogen a la vez, y todo el cargador cabe en el bolsillo.

El problema: justo cuando el mercado taiwanés de cargadores rápidos iba a explotar, TSMC anunció una cosa: **en julio de 2027 sale del foundry de GaN**[^8].

Detrás hay dos presiones: una, las foundries chinas de GaN (China Resources Micro, Silan, Ruineng, etc.) expandieron capacidad a lo bestia, hundiendo el precio de foundry a donde TSMC no quiere entrar. Dos, el margen de chips de IA es demasiado jugoso; TSMC quiere reconvertir las líneas de GaN en líneas de empaquetado avanzado (CoWoS). La licencia tecnológica se la dio a VIS (世界先進) y GlobalFoundries; la carga del foundry de GaN en Taiwán recae en PSI (穩懋, 3163) y GigaDevice (宏捷科, 8086), que ya apostaban hace diez años[^8].

> ⚠️ **Punto de controversia**: La salida de TSMC del foundry de GaN tiene dos lecturas. Una: «reservar capacidad para IA» es elección racional; la oblea de 3 nm da 20 veces más margen que la de 6 pulgadas de GaN, la asignación de capacidad va donde el retorno es mayor. La otra: Taiwán suelta el GaN = regala a las fábricas chinas la base de la próxima generación de electrónica de consumo (móvil / portátil / cargador); ¿el «escudo de silicio» solo cubre el flanco de IA? La diferencia está en: ¿crees que el valor de la montaña sagrada es «proceso más avanzado irremplazable» o «agrupamiento completo de toda la cadena de suministro»?

Sea TSMC, GlobalWafers u otras grandes foundries nacionales y extranjeras, todas subieron al tren[^7]. Pero _qué vagón_ toman, son dos cosas distintas.

## Las obleas de SiC de 8 pulgadas de GlobalWafers

Si el nitruro de galio es la historia del cargador del móvil, el carburo de silicio es la del coche eléctrico.

La empresa clave taiwanesa en SiC es GlobalWafers (環球晶), no TSMC. 2024, GlobalWafers llevó la capacidad mensual de obleas SiC de 6 pulgadas a ~20 000 unidades, hornos de crecimiento propio de 3 a 20, rendimiento superó 50 %[^9]. 2025, obleas SiC de 8 pulgadas en producción en volumen, primera en Taiwán.

La CEO Doris Hsu (徐秀蘭) habla directo: «Sino-American y GlobalWafers forman "grupo IDM virtual", apuntan a la demanda de carburo de silicio en los próximos 5 años. ¡Los perseguimos muy rápido!»[^9] Estrategia: encadenar bajo Sino-American el crecimiento de cristales (GlobalWafers), epitaxia (Pancoast) y módulos (Hongyang Semiconductor).

Pero el SiC no es línea recta arriba: segunda mitad de 2025, fábricas chinas de SiC (San'an Optoelectronics, Tianyke, etc.) expanden como locas, exceso global de oferta, utilización de capacidad de 6 y 8 pulgadas de GlobalWafers cayó bajo 50 %[^10]. Eso choca con el guion optimista de PanSci 2023 «la demanda de coches eléctricos tomará el relevo»; apareció un valle.

La señal de recuperación viene de NVIDIA: se rumorea que la próxima plataforma Rubin GPU usará SiC en el interposer, con arquitectura de centro de datos a 800 V CC, producción en volumen 2027[^10]. Si el rumor es cierto, la capacidad de 8 pulgadas de GlobalWafers pasaría del coche eléctrico al centro de datos de IA, y la historia se reencendería.

> 📝 **Nota del curador**: Nitruro de galio y carburo de silicio se suelen agrupar como «semiconductores de tercera generación», pero en Taiwán su significado industrial va más allá de la etiqueta «material de próxima generación» —representan la primera vez que la industria taiwanesa de semiconductores tiene un dominio con **cadena de suministro completa sin pasar por TSMC**. GlobalWafers crece cristales, Pancoast epitaxia, PSI empaqueta, GigaDevice diseña: fuera de la montaña sagrada, otra montaña, mucho más discreta pero independiente, la «tercera generación», está creciendo.

## El lazo de Huang Renxun con CoWoS+

Volvamos al frente de IA.

La GPU H100 de NVIDIA usa proceso de 4 nm de TSMC + empaquetado CoWoS-S integrando memoria HBM3 de alta banda. La Blackwell B200 sube a CoWoS-L, integra dos GPU Blackwell + una CPU Grace, velocidad de entrenamiento 4× H100[^11]. Siguiente generación Rubin, prevista 2026.

Cada generación de GPU tiene doble motor: «proceso avanzado + empaquetado avanzado». Proceso achica transistores, empaquetado apila dies cada vez más cerca. PanSci lo comparó con la carretera provincial 9 y el túnel de Xueshan: «El empaquetado tradicional debe recorrer la sinuosa provincial 9; el empaquetado avanzado corta camino, perfora el túnel de Xueshan que une ambos lados, haciendo el tráfico de datos mucho más cómodo y rápido.»[^12]

El núcleo de CoWoS (Chip-on-Wafer-on-Substrate) es el «agujero pasante de silicio» (through-silicon via, TSV): apilar dies distintos, usar microcanales verticales que atraviesan el sustrato de silicio, convirtiendo dos circuitos separados en conexión 3D. PanSci lo describe gráfico: «El apilamiento 3D permite colocar el chip C sobre el chip A, atravesar el sustrato de silicio adelgazado con TSV, conectar ambos circuitos con líneas verticales de ultra alta densidad; su distancia pasa de confín del mundo a un paso.»[^12]

Los números de capacidad duelen: capacidad mensual CoWoS de TSMC ~35 000 obleas a finales de 2024, objetivo 75 000 a finales de 2025, rumbo a 150 000 en 2028, tasa compuesta anual ~80 %[^13]. NVIDIA se lleva directamente la capacidad CoWoS de TSMC hasta 2027, y **todos los chips, sin importar en qué fab de TSMC se fabriquen (incluida Arizona), al final deben volver a Taiwán para el empaquetado CoWoS**[^13].

Este es el duopolio de dos cabezas de Huang Renxun y TSMC. NVIDIA en diseño, TSMC en fabricación y empaquetado, ambas encallan juntas el nudo crítico de los centros de datos de IA.

2 de junio de 2024, Huang Renxun en el pabellón de la Universidad Nacional de Taiwán en la keynote de Computex, mostró al mundo ese lazo —las diapositivas mostraban la hoja de ruta Blackwell y Rubin, pero detrás de cada una está la línea CoWoS de TSMC.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/pKXDVsWZmUU" title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Canal oficial de NVIDIA: keynote de Huang Renxun el 2 de junio de 2024 en el pabellón de la NTU, Computex «The Era of AI». Dos horas enteras desplegando GPU Blackwell, NVLink, Spectrum-X —pero el set físico de cada diapositiva está en Baoshan, Hsinchu. «Sin TSMC no hay NVIDIA» no lo dijo en voz alta, pero cada gráfico de capacidad lo grita._

El coste físico del empaquetado 3D no es pequeño. PanSci señaló los retos: «El empaquetado avanzado exige alta planicidad de dies y alineación precisa; si al apilar algún punto de contacto no conecta, se pierde rendimiento. Además, los circuitos integrados generan calor al operar; el empaquetado avanzado acerca los dies, la conducción térmica se influye mutua, todos se calientan juntos, la disipación se vuelve más difícil.»[^12]

Siguiente fase: SoIC (System on Integrated Chips) y SoW-X (System on Wafer). SoIC es «3D de verdad», oblea contra oblea directo, sin bumps (bumping-free). SoW-X previsto 2027 en volumen, tamaño de máscara 9,5× CoWoS actual, integra 16+ dies de computación grande, capacidad de cómputo 40× CoWoS actual[^13]. Los chips de IA crecen, las líneas de empaquetado de TSMC se parecen cada vez más a pequeñas fábricas.

## ALD: creciendo capa a capa, átomo a átomo

![En una vitrina de museo, varias obleas de silicio de distintos tamaños dispuestas en fila, la mayor de ~12 pulgadas, reflejo espejo que muestra la materia prima central de la fabricación de semiconductores](/article-images/technology/silicon-wafers-museum-2017.webp)
_Muestra de obleas de silicio, 2017. Foto: ArticCynda. [Licencia vía Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg)._

3 nm, 2 nm, 1,6 nm. Detrás de esos números hay una tecnología de fabricación discreta pero crucial: deposición atómica (Atomic Layer Deposition, ALD).

La ALD la inventó un finlandés, pero se volvió paso nuclear en cada oblea de proceso avanzado de Taiwán.

La historia empieza en Finlandia. 1974, el científico de materiales Tuomo Suntola (圖奧莫．松托拉) en Instrumentarium Oy empezó a investigar ALD. 1977 tecnología madura, debut en feria industrial[^14]. Entonces solo servía para pantallas electroluminiscentes; el propio Suntola no imaginó que 30 años después sería la arteria de los nodos nanométricos. 1999 vendió la tecnología ALD a la empresa holandesa de equipos ASM. Hoy ASM tiene >55 % del mercado ALD[^14].

PanSci explica el principio limpio: «La deposición atómica es una CVD mejorada; divide la deposición en dos pasos. Primero inyecta el primer precursor, reacciona con la superficie del sustrato… cuando la superficie se satura, inyecta el segundo precursor, reacciona con el ya adsorbido, forma el material objetivo, completa la película.»[^14] Dos precursores turnándose, cada ciclo crece solo un monoátomo de espesor.

¿Por qué importa? Porque el gate de transistores de 2 nm tiene apenas unos átomos de grosor, y la capa dieléctrica del gate debe tener planicidad y control de espesor a nivel atómico. CVD tradicional no llega, PVD no llega, solo ALD puede «crecer capa a capa». Cada fab avanzada de TSMC lleva máquinas ALD de ASM; esta cadena —equipo holandés, tecnología finlandesa, proceso taiwanés— es la base física que permite la producción en volumen de 2 nm.

> 💡 **¿Sabías que?**: El rasgo mínimo de 2 nm equivale a ~20 átomos de silicio en fila. Si cada átomo fuera una bola de ping-pong, el transistor de 2 nm mediría ~una mesa de ping-pong. El trabajo de ALD es «bola a bola» alfombrar esa mesa con material dieléctrico.

ASM no cotiza en Taiwán, pero casi todas sus máquinas ALD de 12 pulgadas tienen su mayor cliente en Taiwán. **Esta cadena de suministro es invisible pero insustituible**; si TSMC tropieza en 2 nm, no hay segunda ALD en el mundo que pueda relevar.

## Tras 2 nm viene lo cuántico

El ángstrom (1 nm = 10 Å) y lo que sigue, TSMC aún no lo ha escrito todo.

Cuarto trimestre 2025, TSMC inicia producción en volumen de 2 nm en Fab 22 de Kaohsiung, le sigue Fab 20 de Baoshan, Hsinchu[^2]. 2 nm estrena arquitectura de nanosheet GAA (Gate-All-Around), abandona el FinFET que usó desde 22 nm hasta 3 nm[^16]. 2 nm ≈ 20 átomos de silicio de ancho, ya roza el límite teórico de la física. Primeros clientes: serie A de Apple y chips de IA de NVIDIA; capacidad de 2 nm se expandirá trimestre a trimestre[^3].

Siguiente parada: 1,6 nm (A16), previsto Q4 2026 en volumen, estrena «red de alimentación por el dorso» (Backside Power Delivery Network), nombre propio de TSMC: Super Power Rail[^16]. Mismo consumo, 10 % más rápido que N2P; mismo rendimiento, 15-20 % menos consumo.

¿Y tras 1,6 nm? El nodo baja cada vez más caro. I+D de 28 nm ~1000 M USD, 7 nm salta a 3000 M, 3 nm se dispara a 10 000 M, 2 nm se estima >20 000 M[^4]. La curva exponencial de la ley de Moore vuelve astronómico el coste de I+D en cola; como dice PanSci: «La complejidad y la inversión del desarrollo de procesos avanzados crecen exponencialmente, y a menudo inversión y retorno no son proporcionales.»[^12]

Así que la industria cambia estrategia: expansión horizontal → apilamiento vertical (empaquetado 3D), silicio → nuevos materiales (GaN/SiC), y al final quizá salto a física de cómputo distinta, como la computación cuántica.

La línea temporal de la Academia Sinica va así. Octubre 2023, computadora cuántica superconductor de 5 qubits completada. 29 enero 2024, la presidenta Tsai Ing-wen visita, computadora cuántica conectada a internet oficialmente[^6]. PanSci lo recoge: «Enero 2024, la primera computadora cuántica de desarrollo propio de Taiwán nace oficialmente en la Academia Sinica; aunque solo tiene 5 qubits, abre el telón para que Taiwán ocupe un asiento en la arena global de computación cuántica.»[^17]

Diciembre 2025, chip cuántico superconductor de 20 qubits completado. Enero 2026 anuncio de conexión para uso[^6]. Tiempo de coherencia (coherence time T1) de 15-30 µs en época de 5 qubits, salta a 530 µs en 20 qubits. El tiempo de coherencia es cuánto aguanta el qubit en superposición; más largo = menos ruido = operaciones más complejas posibles.

El equipo cuántico nacional interministerial se formó oficialmente en marzo 2022, presupuesto 5 años 8000 M NT$, 17 equipos de investigación[^18]. El Ministerio de Economía creó en abril 2026 la «Oficina de Promoción de Tecnología Industrial Cuántica», tendiendo puentes entre I+D académica e industria.

Lo que hace el ITRI es especialmente interesante: usa el proceso de 28 nm de TSMC para hacer «chips de control de qubits». CNA marzo 2024 cita al ITRI: «Aprovechando el diseño IC de microondas en que Taiwán destaca y el proceso de 28 nm de TSMC, creamos chips y módulos de control a baja temperatura (4 K, –269 °C)… encogemos el instrumento de control para meterlo en el refrigerador de dilución, reducimos volumen total 40 %, simplificamos cableado, ventaja de comercialización… consumo del módulo 50 % menor que datos publicados de grandes internacionales.»[^19]

> 📝 **Nota del curador**: La estrategia cuántica de Taiwán no está en fabricar qubits (eso es terreno de IBM, Google, Academia Sinica), sino en miniaturizar los circuitos de control hasta que quepan dentro del refrigerador de dilución. De 5 a 20 qubits, los chips de control del ITRI pasaron de soportar 1 qubit, 2, 8, y prevén 20 qubits para 2026-2027. **La siguiente estación de la montaña sagrada quiere ser la foundry de la era cuántica, no disputar la hegemonía cuántica**. Pero esa posición de foundry, hoy nadie ha clavado el clavo de «déjenlo en manos de Taiwán».

## Tres rutas cuánticas: superconductor, trampa de iones, topológico

La computación cuántica no tiene una sola ruta.

**Qubits superconductores** (superconducting qubits): ruta de IBM, Google, Academia Sinica. Ventaja: proceso compatible con fabs de semiconductores actuales (ahí está la baza de Taiwán), control rápido. Desventaja: necesita refrigerador de dilución cerca del cero absoluto (15 mK, ~–273 °C), ruido alto. Google 2019 con 53 qubits «Sycamore» reclamó supremacía cuántica, 200 segundos para tarea que supercomputadora clásica tardaría 10 000 años[^20].

**Qubits de trampa de iones** (trapped ion qubits): láser controla átomos individuales. PanSci resumió la diferencia: «La tecnología de trampa de iones usa láser para operar átomos individuales; tiene precisión y estabilidad extremas, pero enfrenta complejidad técnica y coste.»[^17] Representantes: IonQ, Quantinuum. Ventaja: alta precisión, buena estabilidad, no necesita temperatura extrema. Desventaja: control lento, difícil escalar a muchos qubits.

**Qubits topológicos** (topological qubits): la apuesta de próxima generación de Microsoft. Febrero 2025, Microsoft presenta procesador cuántico topológico Majorana 1, dice escalable a un millón de qubits[^15]. Teóricamente inmunes a interferencias, pero ruta menos madura; la existencia misma de la partícula Majorana sigue en verificación física.

Tres rutas, tres riesgos. La estrategia de Taiwán es **«asegurar que, gane la ruta que gane, Taiwán tenga un nudo de cadena de suministro»**, no apostar a una sola. Ruta superconductor → chips de control de 28 nm de TSMC. Ruta trampa de iones → óptica de precisión que conecta con industria optoelectrónica taiwanesa; ruta topológica → si triunfa, necesita películas de pureza extrema, y volvemos al territorio de ALD.

## Fabs en el extranjero: ¿expansión o salida?

La globalización de TSMC acelera desde 2020.

**EE. UU. Arizona Fab 21**: Fase 1, 4 nm, primera mitad 2025 en volumen; Fase 2, 3 nm / 2 nm, segunda mitad 2027; Fase 3, 2 nm / A16, antes de 2030. Capex total ~165 000 M USD[^21]. Pero un «pero» importante: **todo el empaquetado CoWoS de chips de IA sigue solo en Taiwán; las obleas de Arizona vuelven a Taiwán para empaquetado final**[^13].

**Japón Kumamoto Fab 1**: 22-28 nm, 2024 en volumen, con Sony y Toyota. Fab 2 original (12-16 nm) progreso incierto, parte de recursos reasignados a Arizona.

**Alemania Dresde ESMC** (TSMC 40 %): 28/22/16/12 nm para auto, segunda mitad 2025 entrada de equipos, 2027 en volumen, capacidad ~40 000 obleas/mes[^22].

Todas comparten un principio «N-2» —**siempre dos generaciones por detrás de Taiwán**. Cuando Taiwán hace 2 nm, lo más avanzado fuera es 4 nm; cuando Taiwán empuja 1,6 nm, fuera llega a 3 nm. Esa línea roja está escrita en la ética de ingeniería geopolítica, no en cláusulas contractuales.

> ⚠️ **Punto de controversia**: ¿Las fabs extranjeras expanden o diluyen el escudo de silicio? Partidarios: tecnología se queda en Taiwán, capacidad sale fuera = escudo pasa de «una isla» a «una cadena», des-riesgo más profundo. Contrarios: cada fab que se envía fuera lleva ingenieros formados, SOPs de producción en volumen, relaciones con clientes. 30 años después, cuando Arizona o Kumamoto acumulen hasta el límite N-2, esos «dos generaciones más avanzadas» podrían comprimirse lentamente. N-2 hoy es promesa de TSMC, no ley física.

Paralelo a fabs extranjeras va la «fuga de talento de diseño». Diseño de chips de IA ya no solo necesita Taiwán; Silicon Valley, Tel Aviv, Nueva Delhi tienen sus centros. El ecosistema foundry de TSMC muta de «ingenieros de toda la isla» a «ingenieros globales + fabricación en toda la isla» híbrido.

## Coste ambiental: el otro lado de la montaña sagrada

La montaña sagrada pesa.

El agua es lo más visible. Tres parques científicos de TSMC consumen >208 000 t/día; grupos ecologistas estiman que tras 2025, con nuevas fabs, el consumo podría cuadruplicarse a 770 000 t/día[^23]. Respuesta de TSMC: cada gota se usa 3,5 veces de media, tasa de reciclaje 87 %, nuevas fabs objetivo 90 %; 2024 ahorro adicional 5,54 M m³.

Electricidad es el segundo examen. Una fab de 3 nm consume ~2100 M kWh/año, equivalente a 20 000 hogares taiwaneses/año. 2 nm y 1,6 nm subirán aún más. TSMC promete RE100 (100 % renovable) para 2050, pero la oferta verde de Taiwán no sigue el ritmo de expansión de semiconductores; esa línea de tiempo vive bajo prueba de estrés constante.

Horas de trabajo es el tercer examen. Horas, precio de vivienda, natalidad de ingenieros en Hsinchu, tema para otro artículo. Pero como la ciencia de materiales, es problema físico: el tiempo y la energía humanos también tienen «banda prohibida», pasas el umbral y colapsas.

La existencia de la montaña sagrada depende, además de la tecnología de TSMC, la política del gobierno, la oportunidad geopolítica, también de 170 000 ingenieros de parques científicos, toda la cadena de proveedores, y cada residente taiwanés que comparte el coste de electricidad y agua.

## Ecosistema completo: Taiwán no es solo TSMC

La competitividad taiwanesa en semiconductores nace del clúster entero, no de TSMC sola. En diseño IC: MediaTek (top 3 global), Novatek, Realtek, Himax; en foundry además de TSMC: UMC, VIS, Powerchip; en empaquetado y prueba: ASE (Nº1 global), SPIL, KYEC; en tercera generación: GlobalWafers (crecimiento SiC), Pancoast, PSI (GaN), GigaDevice; en memoria: Nanya, Winbond; en equipos y materiales: Hwatsing, Sinyuan, Chung-Yue, esos fabricantes invisibles que cubren huecos.

Un chip del diseño a acabado puede dar la vuelta a Taiwán sin cruzar fronteras. Esa «ventaja de cadena corta» el mundo la vio en COVID; desde entonces está en el white paper de cadena de suministro de cada gigante tech.

Parque Científico de Hsinchu 1980, 40+ años, 500+ empresas, 170 000 empleados. Un ingeniero puede estar 5 años en TSMC, saltar a MediaTek a diseñar chips, luego a ASE a empaquetar —esa circulación de talento entre empresas difunde efectivamente el nivel técnico de toda la industria.

¿Competencia? Samsung Corea, estrategia vertical 2022-2026 invierte 230 000 M USD, pero rendimiento de proceso avanzado sigue detrás de TSMC[^4]. Intel estancada en 10 nm años, 2021 lanza IDM 2.0 queriendo compaginar diseño y foundry, pero en 2025 su negocio foundry aún sin clientes mayores —lo más irónico: algunos chips de gama alta de la propia Intel ahora los fabrica TSMC.

## La plaza cuántica sigue vacía

Cargador Nokia 3310: 4,56 W. Cargador rápido 2025: 240 W. 52×. El silicio tardó 30 años en recorrer esa ruta; el nitruro de galio la completó en 5.

En el laboratorio cuántico de la Academia Sinica, los chips superconductores necesitan operar a 15 mK (–273 °C). El ITRI, con proceso de 28 nm de TSMC, hizo chips de control que comprimen el «instrumento de control» de extrema baja temperatura de un edificio entero a una cajita. La capacidad de semiconductores de Taiwán está moviendo, poco a poco, la frontera de la computación cuántica.

Pero dónde está esa frontera, nadie lo dice claro. Tiempo de coherencia de qubits de 15 µs a 530 µs, esto solo es el principio. Hace 50 años, aquellos 19 ingenieros que RCA envió fuera quizá tampoco sabían que su 1973 cuajaría en el 2 nm de 2025.

La montaña sagrada reinó el presente con 50 años de experiencia industrial. Los próximos 50, la plaza de foundry en la era cuántica, Taiwán aún no la ha tomado.

> ✦ La Blackwell de Huang Renxun infiere en la nube sobre tu cabeza; el SiC de GlobalWafers calienta en el poste de carga de tu coche eléctrico; la primera película ALD que Suntola hizo en 1974 en Finlandia sella hoy el dieléctrico del gate en tu chip de móvil —el semiconductor siempre ha sido toda una genealogía de materiales trepando peldaño a peldaño por la física de la banda prohibida durante 50 años, no pertenece solo a TSMC. ¿Dónde está el siguiente peldaño? La física nos lo dirá; ¿subir o no? Es elección de Taiwán.

---

**Lecturas complementarias**:

- [Temáticas industriales de Taiwán](/industry/) — Dibuja la estructura industrial con estadísticas oficiales: exportaciones y PIB 70 años, parques científicos, fábricas por condado, top 10 capitalización histórica, más seis debates públicos con posturas varias
- [Mapa de cadena de suministro](/industry/supply-chain-map/) — Semiconductores, servidores IA, wolframio, tres cadenas, eslabón a eslabón ver qué empresas están en Taiwán, cuál depende del exterior
- [Empresa taiwanesa: TSMC](/es/economy/tsmc) — Gobernanza corporativa, estructura financiera, escala de capex de la montaña sagrada
- [Empresa taiwanesa: MediaTek](/es/economy/mediatek) — Cómo el líder de diseño IC se posiciona en chips móviles y IA edge
- [Empresa taiwanesa: ASE](/es/economy/taiwan-enterprise-ase-semiconductor) — Empaquetado y prueba Nº1 global, ecosistema backend más allá de CoWoS
- [Los creadores de montaña: la apuesta del siglo](/es/art/mountain-makers-tsmc-documentary) — Documental 2025 de Xiao Ju-zhen, 5 años, 80+ veteranos de semiconductores, 2026 entra en Purdue / Wisconsin / Michigan, tres polos de inversión CHIPS Act
- [Wu Ta-you](/es/people/tai-yu-wu) — Mientras Taiwán apostaba por semiconductores en los 80, como presidente de Academia Sinica defendió la ciencia básica, sentando bases del sistema de I+D taiwanés
- [Huang Chong-jen](/es/people/frank-huang-psmc) — Fundador de Mosel / Powerchip, la ruta DRAM de Taiwán que en licencia ajena construyó su propia fab: cuota de 23,2 % a 6,3 %, el tramo menos contado de la industria
- [Industria robótica de Taiwán](/es/technology/taiwan-robotics-industry) — Isla Nº1 en semiconductores, ¿por qué en era robótica es alumna repetidora? Desde inauguración de NCAIR mira la fractura industrial
- [Bolsa y mercado de capitales de Taiwán](/es/economy/taiwan-stock-market) — Cómo la cadena de suministro que sostiene el top 6 global 2026 se refleja en el mercado de capitales
- [Cadena de suministro de wolframio de Taiwán](/es/technology/taiwan-tungsten-supply-chain) — Hexafluoruro de wolframio rellena contactos y wordlines de 3D NAND; Taiwán sin minas de wolframio pero sube al midstream por reciclaje y refinación
- [Escuelas de IA de Taiwán](/es/technology/taiwan-ai-academy) — 8 años de AIA formando 10 000 ingenieros IA, ¿cómo vuelven a la cadena ICT de semiconductores a reforzar el flanco software?
- [Computex: tres grandes ferias internacionales, dos se fueron, quedó la de Taipéi](/es/technology/computex) — CoWoS y proceso avanzado de TSMC, cada mayo estrechan manos con gigantes globales de IA en esta feria de 45 años
- [Parques científicos de Taiwán](/es/technology/science-park-development) — Hsinchu, Tainan, Taichung, tres parques, cuerpo físico del clúster de semiconductores, también centro geográfico del escudo de silicio

## Fuentes de imágenes

El artículo usa 3 imágenes con licencia CC / PD, cacheadas en `public/article-images/technology/` para evitar hotlink:

- [Silicon vs GaN 30W USB-C chargers](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg) — Foto: 4300streetcar, 2025-12-25, CC BY 4.0, Wikimedia Commons file Silicon_vs_GaN_30W_USB-C_chargers.jpg
- [TSMC Fab 5 Hsinchu](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG) — Foto: Peellden, 2010-09-05, CC BY-SA 3.0, Wikimedia Commons file TSMC_Fab5.JPG
- [Silicon wafers museum display](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg) — Foto: ArticCynda, 2017-10-23, CC0 dominio público, Wikimedia Commons file Silicon_wafers.jpg

## Referencias

[^1]: [Semiwiki — How Philips Saved TSMC](https://semiwiki.com/semiconductor-history/307560-how-philips-saved-tsmc/) — Participación de Philips 27,6 % según investigación de Semiwiki; accionista clave tecnológico y de clientes en la fundación de TSMC

[^2]: [Focus Taiwan 2025/12/30 — TSMC 2nm production](https://focustaiwan.tw/business/202512300012) — Producción en volumen de 2 nm de TSMC con Fab 22 de Kaohsiung como principal, Fab 20 de Baoshan, Hsinchu le sigue

[^3]: [Digital Era — TSMC 2nm officially in volume production](https://www.bnext.com.tw/article/89663/tsmc-2nm-volume-production) — TSMC inicia producción en volumen de 2 nm en Q4 2025; capacidad mensual concreta es estimación externa, no oficial

[^4]: [TechNews — TSMC 3nm utilization hits 100%](https://technews.tw/2025/05/26/tsmcs-2nm-process-is-expected-to-reach-full-capacity-in-four-seasons/) — Rendimiento de proceso avanzado de TSMC estimado superior a competidores; cifras concretas son estimaciones de terceros, no divulgación oficial

[^5]: [CommonWealth Magazine — Li Kwoh-ting and the birth of TSMC](https://www.cw.com.tw/article/5095492) — 1987 Morris Chang funda TSMC, establece modelo «foundry puro», base de división global de semiconductores; trasfondo de transferencia RCA 1973 por 4,5 M USD

[^6]: [Academia Sinica — 20-qubit superconducting quantum chip announcement](https://www.sinica.edu.tw/News_Content/56/2375) — Academia Sinica completa chip cuántico superconductor de 20 qubits en diciembre 2025, conectado en enero 2026; tiempo de coherencia T1 alcanza 530 µs

[^7]: [PanSci — Nitruro de galio: 1/3 del tiempo, misma potencia](https://pansci.asia/archives/362660) — Autor: equipo PanSci. GaN banda prohibida 3,4 eV, voltaje ruptura 10×, frecuencia 1 MHz vs silicio 100 kHz; SiC 1000 V aplicación carga rápida coche eléctrico. Content Curation Partner per MOU 2026-05-05

[^8]: [TrendForce — TSMC exits GaN foundry by July 2027](https://www.trendforce.com/news/2025/08/22/news-tsmc-reportedly-exits-gan-foundry-business-by-2027/) — TSMC sale de foundry GaN en julio 2027, licencia tecnología a VIS y GlobalFoundries; PSI (3163) envía ~500 obleas/mes de 6 pulgadas GaN

[^9]: [Fugu Direct — GlobalWafers SiC 8-inch wafer 2025 volume production](https://www.fugle.tw/news/article/1234567) — GlobalWafers 6 pulgadas SiC capacidad mensual 20 000 a finales 2024, hornos propios 3→20, rendimiento >50 %; estrategia «grupo IDM virtual» de Doris Hsu

[^10]: [TechNews — SiC supply chain under pressure](https://technews.tw/2025/11/sic-market-oversupply) — 2025 fábricas chinas SiC expanden, utilización 6/8 pulgadas de GlobalWafers <50 %; rumor NVIDIA Rubin GPU adopta SiC interposer + centro de datos 800 V CC 2027 volumen

[^11]: [SemiAnalysis — NVIDIA Blackwell CoWoS-L Analysis](https://www.semianalysis.com/p/nvidia-blackwell-b200-cowos-l) — Blackwell B200 usa CoWoS-L integrando 2 GPU Blackwell + 1 CPU Grace; entrenamiento IA 4× H100; NVIDIA acapara capacidad CoWoS de TSMC hasta 2027

[^12]: [PanSci — Apilamiento 3D: cómo el empaquetado avanzado mete chips en el túnel de Xueshan](https://pansci.asia/archives/367588) — Autor: equipo PanSci. Principio CoWoS / SoIC / TSV; metáfora provincial 9 vs túnel Xueshan; retos de rendimiento y disipación en empaquetado 3D. Content Curation Partner per MOU 2026-05-05

[^13]: [Digitimes — TSMC CoWoS capacity expansion plan](https://www.digitimes.com.tw/iot/article.asp?cat=158&id=0000696823_X1D7L8XB6JNL2Y8XLPZJK) — Capacidad CoWoS mensual TSMC: 35 000 finales 2024, 75 000 finales 2025, objetivo 150 000 2028; NVIDIA acapara hasta 2027; obleas Arizona vuelven a Taiwán para empaquetado

[^14]: [PanSci — ALD deposición atómica: 50 años de revolución de película fina](https://pansci.asia/archives/377669) — Autor: equipo PanSci. ALD 1974 Suntola en Instrumentarium Oy, 1977 madura, 1999 vendida a ASM; ASM 55 % cuota; principio doble precursor CVD. Content Curation Partner per MOU 2026-05-05

[^15]: [TechNews — Microsoft Majorana 1 topological quantum processor announced](https://technews.tw/2025/02/20/microsoft-majorana-1-topological-qubit/) — Microsoft febrero 2025 presenta primer procesador cuántico topológico Majorana 1, dice escalable a 1 millón de qubits

[^16]: [TSMC official — A16 (1.6nm) process announcement](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm) — 2 nm estrena GAA nanosheet (abandona FinFET); A16 estrena alimentación por dorso (Super Power Rail), Q4 2026 volumen, mismo consumo +10 % vs N2P, mismo rendimiento –15-20 % consumo

[^17]: [PanSci — Tecnología cuántica de Taiwán: de 5 qubits a era de producción](https://pansci.asia/archives/377923) — Autor: equipo PanSci. Academia Sinica enero 2024 nace computadora cuántica de 5 qubits; tres rutas superconductor vs trampa iones vs topológica; Google Sycamore 53 qubits 200 s resuelve problema de 10 000 años. Content Curation Partner per MOU 2026-05-05

[^18]: [iThome — Equipo cuántico nacional 5 años 8000 M presupuesto](https://www.ithome.com.tw/news/151234) — Marzo 2022 equipo cuántico interministerial formado, 5 años 8000 M NT$, 17 equipos; abril 2026 Ministerio Economía crea Oficina de Promoción Tecnología Industrial Cuántica

[^19]: [CNA 2024/03/06 — ITRI quantum control chip](https://www.cna.com.tw/news/ait/202403060123.aspx) — ITRI usa proceso 28 nm TSMC para chips de control cuántico a 4 K (–269 °C), volumen –40 %, consumo 50 % menor que grandes internacionales; ruta 2024 1 qubit → 2026-2027 20 qubits

[^20]: [TechNews — Google Sycamore quantum supremacy](https://technews.tw/2019/10/24/google-sycamore-quantum-supremacy/) — 2019 Google 53 qubits Sycamore logra supremacía cuántica, 200 s completa cálculo que supercomputadora clásica necesita 10 000 años

[^21]: [SemiAnalysis — TSMC Arizona Fab 21 investment plan](https://www.semianalysis.com/p/tsmc-arizona-1650b-capex) — TSMC Arizona Fab 21 tres fases 165 000 M USD; Fase 1 (4 nm) 2025 volumen, Fase 2 (3 nm/2 nm) 2027, Fase 3 (2 nm/A16) antes 2030; principio N-2 fuera siempre dos generaciones detrás de Taiwán

[^22]: [Digitimes — ESMC Dresden 2027 volume production](https://www.digitimes.com.tw/news/esmc-dresden-2027) — TSMC ESMC 40 %; Dresde 28/22/16/12 nm auto, H2 2025 equipos, 2027 volumen, capacidad ~40 000 obleas/mes

[^23]: [CommonWealth Magazine — TSMC water consumption](https://www.cw.com.tw/article/5128456) — Tres parques científicos TSMC >208 000 t/día; ecologistas estiman tras 2025 nuevas fabs sube a 770 000 t/día; TSMC responde: cada gota 3,5 usos, reciclaje 87 % (nuevas 90 %), 2024 ahorro adicional 5,54 M m³

[^asml-philips]: [Wikipedia — ASML Holding](https://en.wikipedia.org/wiki/ASML_Holding) — ASML 1 abril 1984 desde joint venture 50/50 Philips (Países Bajos) y ASM International (ASMI) como ASM Lithography; 1995 salida a bolsa ASMI sale, hoy ASML único proveedor mundial EUV

[^lin-bio]: [Wikipedia — Burn-Jeng Lin](https://en.wikipedia.org/wiki/Burn-Jeng_Lin) — Lin Ben-jian 1942 nacido en Vietnam, desde 1970 en IBM Watson litografía, 2000 vuelve a Taiwán como director I+D TSMC; 2008 premio SPIE Frits Zernike; «padre de la litografía por inmersión»

[^157nm-fail]: [Electronics Weekly — Immersion litho sidelines 157nm](https://www.electronicsweekly.com/news/research-news/process-rd/immersion-litho-sidelines-157nm-2005-05/) — Ruta 157 nm por birrefringencia CaF₂, absorción fuerte de películas a 157 nm, integración difícil, 2002-2003 reemplazada por 193 nm immersion; apuesta Intel + Nikon fallida

[^immersion-litho]: [Wikipedia — Immersion lithography](https://en.wikipedia.org/wiki/Immersion_lithography) — Lin Ben-jian 2002 SPIE propone 193 nm inmersión; índice agua 1,44 hace 193 nm resolución efectiva ~134 nm; 2007 ASML volumen, desde 65 nm aguanta 7 nm, alarga ley de Moore seis generaciones

[^cw-lin-interview]: [CommonWealth Magazine — Interview with the Father of Immersion Lithography Who Put TSMC on the Map](https://english.cw.com.tw/article/article.action?id=3720) — 2024-06-18 entrevista Lin Ben-jian — «Nikon no se atrevió con inmersión» contexto histórico; Lin vuelve a TSMC 2000 impulsa adopción immersion lithography, vena de cooperación tecnológica TSMC-ASML 30 años
