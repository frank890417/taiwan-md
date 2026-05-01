---
title: 'La industria robótica de Taiwán'
description: 'La isla número uno en semiconductores del mundo, ¿por qué tiene que "recuperar clases" en la era de los robots? Desde la inauguración del NCAIR en 2026, una mirada retrospectiva al milagro y los puntos ciegos de la maquinaria de precisión taiwanesa.'
date: 2026-04-11
tags:
  [
    'robótica',
    'maquinaria de precisión',
    'semiconductores',
    'IA',
    'transformación industrial',
    'HIWIN',
    'NCAIR',
    '2026',
  ]
subcategory: '科技產業'
author: 'Taiwan.md'
readingTime: 13
lastVerified: 2026-04-11
lastHumanReview: false
featured: true
translatedFrom: Technology/台灣機器人產業.md
sourceCommitSha: fa95d5e0
sourceContentHash: sha256:1474f16951c52f9b
translatedAt: 2026-05-01T20:54:23+08:00
---

# La industria robótica de Taiwán

## Aquella tarde en Shalun

El 10 de abril de 2026, en la Ciudad Científica de Energía Verde e Inteligencia de Shalun, Tainan. Lai Ching-te inauguró personalmente una nueva institución gubernamental: el **Centro Nacional de Robótica con Inteligencia Artificial**, con la sigla en inglés NCAIR.[^1] La nueva institución quedó adscrita al Instituto Nacional de Investigación Aplicada (NIAR), y su misión sonaba directa: investigar, probar y entrenar robots.

El día de la inauguración, Lai mencionó en su discurso una cifra concreta: entre 2026 y 2029, el gobierno invertiría **200 mil millones de dólares taiwaneses** en la industria robótica.[^2] El objetivo era lograr que al menos tres empresas emergentes echaran raíces. Las cuatro áreas de aplicación prioritarias eran: profesiones de alto riesgo, atención médica y de salud, industria alimentaria y servicios, y —como enfatizó especialmente Su Wen-yu, director del NCAIR— **robots de cuidado a domicilio para personas mayores**.[^3]

Todo esto sonaba muy razonable. Taiwán está envejeciendo, hay escasez de mano de obra en el cuidado familiar, y en teoría los robots podrían cubrir ese vacío. El gobierno asigna presupuesto, crea un centro, fija metas e invita al presidente a inaugurar: el gesto clásico de inicio de una política industrial.

Pero la pregunta verdaderamente relevante no es "¿Taiwán va a hacer robots?", sino: **¿por qué Taiwán no hizo esto hasta 2026?**

Taiwán es el lugar del mundo que mejor fabrica chips. Las líneas de producción más avanzadas del mundo —5 nm, 3 nm, 2 nm— están todas en esta isla. Los chips que los robots más necesitan —sensores, procesamiento, control de motores— Taiwán sabe fabricarlos todos, y mejor que cualquier otro lugar.

Pero el 80% de las articulaciones de los robots humanoides más avanzados del mundo usan reductores armónicos de la empresa japonesa Harmonic Drive Systems.[^4]

> **Resumen en 30 segundos**: El 10 de abril de 2026, Lai Ching-te inauguró en Shalun, Tainan, el Centro Nacional de Robótica con IA (NCAIR), un punto de inflexión en el que el gobierno taiwés elevó formalmente la robótica a estrategia industrial nacional. Se invertirán NT$200 mil millones entre 2026 y 2029, con el objetivo de impulsar tres startups robóticas y centrarse en el cuidado a domicilio de personas mayores y en aplicaciones para profesiones de alto riesgo. El contexto es que Taiwán posee una cadena de suministro de semiconductores y maquinaria de precisión de clase mundial (HIWIN, Taiwan Precision, Zhi-De, Mirle), pero en el mercado de componentes clave para robots humanoides (reductores armónicos, reductores planetarios) Japón ha dominado durante décadas. El NCAIR no es un comienzo, es una recuperación de clases: una isla que surgió gracias a cadenas de suministro por encargo debe reaprender a caminar en la siguiente etapa, la "integración de sistemas".

## La frase de una empresa: "Si no puedes comprar la tecnología, fabrícala tú mismo"

Para entender la situación de la industria robótica taiwanesa, lo más rápido es empezar por una empresa llamada **HIWIN Technologies**.

HIWIN tiene su sede en Taichung y se especializa en "cosas que se mueven": guías lineales, husillos de bolas, reductores y sistemas de control. Estos componentes suenan mundanos, pero cualquier máquina industrial que se mueva los necesita. Cualquier máquina herramienta CNC, cualquier brazo robótico dentro de una fábrica de semiconductores, cualquier dron con un sistema de transmisión en su interior: casi todos llevan piezas de HIWIN.

Su posición en el mercado es la siguiente: **segundo fabricante mundial de guías lineales, primero en el mercado de transmisión italiano**. En la lista de Morgan Stanley de 2025 de las "100 principales empresas de robots humanoides a nivel mundial", cuatro empresas taiwanesas fueron seleccionadas: TSMC, Foxconn, He Da Industrial y HIWIN.[^5] Chips, ensamblaje, componentes, transmisión: cuatro representantes, cada uno en una esquina.

El presidente de HIWIN, **Cho Wen-heng**, ingresó a la empresa en 1995 y asumió la presidencia en 2019. Una frase que pronunció se convirtió en la filosofía central de la compañía:

> **"Si no puedes comprar la tecnología, fabrícala tú mismo."**[^6]

Esta frase suena motivadora, pero detrás hay un punto de dolor muy práctico: HIWIN quería fabricar brazos robóticos de seis ejes para uso industrial, y el componente más crítico era el reductor armónico, un mecanismo de precisión capaz de convertir la alta velocidad y bajo par de un motor en la baja velocidad y alto par que necesita un brazo robótico. El principal proveedor mundial de este componente es la empresa japonesa Harmonic Drive Systems (HDS), cuya cuota de mercado en aplicaciones de robótica industrial alcanza el 80%.[^7]

HDS no actúa de mala fe; simplemente lo hace tan bien que los demás no pueden alcanzarlo. El engranaje exterior flexible (flex spline) dentro de un reductor armónico debe soportar cientos de millones de ciclos de torsión alterna sin fracturarse, y eso requiere décadas de acumulación en ciencia de materiales, procesos de tratamiento térmico y mecanizado de precisión. HIWIN quería comprar productos de HDS para ensamblar sus propios robots; HDS podía vendérselos, pero no le daría las especificaciones más recientes, y el precio lo fijaba HDS.

La opción de HIWIN fue fabricar los suyos. Desarrollaron una serie llamada **DATORKER** ("DT"), y tras años de prueba y error lograron producir reductores armónicos funcionales. No son los mejores del mundo, pero son suficientes y pueden integrarse en sus propios brazos robóticos de seis ejes.[^8]

Hay un detalle importante en esta historia: la tasa de integración vertical de HIWIN es del **95%**.[^9] Es decir, ellos mismos fabrican el equipo, rectifican las bolas, producen la materia propia, realizan las pruebas y ensamblan el producto final. Esta integración vertical no busca ahorrar costos —de hecho, integrar verticalmente es más caro que subcontratar—, sino que en **la industria de maquinaria de precisión, cada eslabón de la cadena de suministro puede ser un cuello de botella**. Si externalizas un proceso, la mejora de la siguiente generación de productos queda sujeta al calendario de ese proveedor.

HIWIN cambió la integración vertical más la I+D autónoma por la libertad de no depender de los fabricantes japoneses. Pero el precio de esa libertad fue: **tuvieron que construir cada capa de toda la cadena industrial por sí mismos**.

Este es el retrato robot de la industria robótica taiwanesa: **no es falta de capacidad, es falta de ecosistema**.

## Por qué una potencia en semiconductores es alumna recuperadora en robótica

Si nos limitamos a los componentes, la cadena de suministro superior de la industria robótica taiwanesa no es en realidad débil:

- **Componentes de transmisión**: HIWIN (guías/husillos/reductores), Taiwán Precision (reductores planetarios), Zhi-De (guías lineales)
- **Control de motores**: Delta Electronics, TECO, Shihlin Electric
- **Chips y sensores**: TSMC (fabricación bajo contrato de chips de IA), Foxconn (ensamblaje), Novatek (procesamiento de imagen), PixArt (sensores 3D)
- **Fundición de precisión**: He Da Industrial (piezas fundidas para reductores, proveedor del Tesla Optimus)
- **Integración de sistemas**: Mirle, Delta Electronics (robots industriales)

Pero si le preguntas a un ingeniero extranjero "¿Cuál es el robot humanoide más esperado de 2026?", dirá Tesla Optimus, Figure AI, Boston Dynamics o los chinos Unitree y宇樹 (Yushu). No mencionará ninguna marca taiwanesa.

Esta es la **paradoja** central de la industria robótica taiwanesa: **componentes fuertes, máquinas completas débiles**.

¿Por qué? Porque la lógica de desarrollo económico de Taiwán durante medio siglo ha sido convertirse en el eslabón medio-alto de la cadena de suministro global. "Me das las especificaciones y yo te lo fabrico": Taiwán es muy bueno en esto. TSMC llevó esta lógica al extremo: el cliente le dice a TSMC qué chip necesita, TSMC se encarga de fabricarlo, y no diseña sus propias CPU, GPU ni marcas de consumo.

Esta lógica funcionó en semiconductores, en el ensamblaje por encargo de PC, en el ensamblaje de teléfonos móviles, en paneles y en servidores. **Pero la robótica no funciona así**.

La robótica es una industria donde **máquina completa = escenario de aplicación**. No basta con fabricar "un buen reductor" para ganar en el mercado de robots humanoides. Hay que definir el escenario de uso (¿cuidado de personas mayores en casa? ¿tareas de fábrica? ¿servicio en restaurantes?), definir los requisitos de movimiento (¿subir escaleras? ¿cargar a una persona mayor? ¿servir café?), definir la lógica de interfaz (¿voz? ¿gestos? ¿pantalla táctil?), y a partir de esas necesidades deducir hacia abajo: qué sensores necesito, qué algoritmo de control, qué estructura mecánica, qué gestión de batería.

Esta es la lógica típica de "la demanda descendiente define la oferta ascendente". La experiencia de Taiwán en manufactura por encargo no está familiarizada con esta lógica: Taiwán está acostumbrado a que "la cadena de suministro ascendente sea impulsada por el cliente". Hacerlo al revés requiere reestructurar toda la organización industrial, la formación de talento y los sistemas de incentivos.

Por eso existe el NCAIR. No es un centro de I+D, es un **centro de reestructuración industrial**. Los 200 mil millones del gobierno no son solo para comprar equipos, construir laboratorios e investigadores: son para comprar tiempo, comprar el costo de los errores, y comprar un espacio para que los ingenieros taiwaneses empiecen a pensar en "¿qué debe hacer el robot?" en lugar de "¿cómo hago mejor este componente"?

## De la fábrica al hogar: la próxima guerra de la industria robótica

El NCAIR identificó cuatro áreas de aplicación, pero el director Su Wen-yu enfatizó especialmente una: **robots de cuidado a domicilio para personas mayores**.

Esta elección no fue aleatoria. En 2025, la proporción de la población de Taiwán mayor de 65 años superó el 20%, entrando en la categoría de "sociedad superenvejecida". Ese número sigue empeorando. Al mismo tiempo, la escasez estructural de cuidadores extranjeros, la brecha generacional en los cuidadores locales y la presión financiera de la política de cuidado a largo plazo 2.0: todo apunta a la misma conclusión: **dentro de veinte años, Taiwán necesitará algo que cubra el déficit de mano de obra**.

Si un robot de cuidado a domicilio pudiera "ayudar a una persona mayor a darse la vuelta, cambiarle el pañal, conversar con ella, recordarle cuándo tomar sus medicamentos, medir su presión arterial y dar la alarma en caso de caída", podría resolver entre el 60% y el 70% de las tareas que un cuidador humano realiza. El 30% restante requiere juicio humano y conexión emocional, algo que los robots no pueden hacer a corto plazo. Pero resolver entre el 60% y el 70% ya sería suficiente para aliviar la carga de familiares y cuidadores hasta un punto en que la vida pueda continuar.

Este cálculo parece sencillo, pero en la práctica se encuentran tres problemas estructurales:

**Primero, el hardware no es lo suficientemente barato.** Un robot de cuidado humanoide o semihumanoide aceptable cuesta en 2026 entre 30,000 y 100,000 dólares (aproximadamente 900,000 a 3,000,000 de dólares taiwaneses). Ese es todavía un precio de producción temprana con volúmenes bajos; incluso con una producción de 100,000 unidades anuales, el precio unitario difícilmente bajaría de 100,000 dólares taiwaneses. En comparación, un cuidador extranjero cuesta aproximadamente 20,000 dólares taiwaneses al mes, es decir, 2,400,000 en diez años. La "ventaja de costo" del robot aún no se ha establecido realmente.

**Segundo, el software no es lo suficientemente inteligente.** Los grandes modelos de lenguaje actuales pueden conversar e imágenes, pero integrar estas capacidades en acciones físicas —que el robot sepa "qué quiere ahora la persona mayor", "esta acción, ¿le hará daño?", "esta persona está de mal humor hoy, ¿cómo debería responder?"— sigue en una fase de investigación muy temprana. La IA física (Physical AI) está una generación por detrás de los modelos de lenguaje puros.

**Tercero, el entorno no está lo suficientemente maduro.** El hogar es caótico. Un vaso de agua en la mesa puede volcarse en cualquier momento, las zapatillas en el suelo pueden tropezar al robot, los niños querrán jugar con él en cualquier momento, y la persona mayor puede contarle historias de la era colonial japonesa. Los robots de fábrica operan en entornos predefinidos; en casa no los hay. El salto de "robot de fábrica" a "robot doméstico" no se resuelve ajustando parámetros de ingeniería: es una transición de "entorno estructurado" a "entorno no estructurado".

La elección del NCAIR de empezar por el cuidado a domicilio de personas mayores es una decisión pragmática y arriesgada a la vez. Pragmática porque la demografía de Taiwán realmente lo necesita; arriesgada porque es el frente más difícil de toda la industria robótica mundial: ni Japón, ni Alemania, ni Estados Unidos tienen todavía un ganador claro.

## Epílogo: veinte años para recuperar una clase

Para 2030, el objetivo del "Plan de Impulso a la Industria de Robots Inteligentes con IA" del Ejecutivo Yuan es **superar un billón de dólares taiwaneses en producción nacional**.[^10]

Esta cifra es muy ambiciosa. Desde el punto de partida de 2026 hasta el billón de 2030, implica un **crecimiento anual superior al 40%**. En comparación, Morgan Stanley proyecta que el mercado global de robots humanoides alcanzará ingresos anuales cercanos a los **5 billones de dólares** para 2050, con una base instalada acumulada de más de **10,000 millones de unidades**; o Goldman Sachs, que pronostica un tamaño de mercado de 30,000 a 38,000 millones de dólares para 2035. Que Taiwán logre obtener un billón de dólares taiwaneses en esta pista no es imposible, pero tampoco ocurrirá automáticamente.

El verdadero desafío no está en el volumen total, sino en la estructura.

**Si en 2030 el billón de dólares taiwaneses de la industria robótica taiwanesa proviene de:**

- Vender componentes a marcas extranjeras → es una extensión de la vieja ruta; Taiwán simplemente traslada el modelo de fabricación por encuerdo de semiconductores al de componentes robóticos
- Vender máquinas completas a mercados extranjeros → es el éxito de la nueva ruta; Taiwán tiene su propia marca y capacidad de integración de sistemas
- Suministrar principalmente al mercado interno (salud, cuidado a largo plazo, fábricas) → es el éxito de la sustitución de importaciones; Taiwán convierte la dependencia externa en autonomía interna

Las implicaciones políticas de los tres caminos son completamente distintas. El primero es el más fácil pero tiene el techo más bajo; el segundo es el más difícil pero con mayor recompensa potencial; el tercero es el más pragmático pero no permite exportar.

La apuesta detrás de los 200 mil millones del NCAIR y la visión de Lai Ching-te de una "isla tecnológica" es esta: **¿puede Taiwán, en las próximas dos décadas, pasar de ser "eslabón medio-alto de la cadena de suministro" a convertirse en "integrador de sistemas"?**

Esta mejora no es un problema tecnológico: es un problema organizativo, un problema cultural, un problema educativo, un problema de asignación de capital. Lo que Taiwán mejor sabe hacer es "hacer una cosa lo mejor posible"; lo que menos domina es "decidir qué cosa hacer". La industria robótica exige exactamente lo segundo.

¿Habrá un billón en 2030? Quizás. Pero la pregunta más importante es: de ese billón, ¿cuánto vendrá de "finalmente decidimos qué queremos hacer" y cuánto de "ejecutamos mejor el pedido de otro país"?

La diferencia entre esas dos respuestas es la verdadera calificación de la industria robótica taiwanesa.

---

**Lecturas complementarias**:

- [Industria de inteligencia artificial](/technology/ai人工智慧產業) — Panorama general de los cinco artículos sobre IA en Taiwán; los robots son IA encarnada, pero la "inteligencia" y el "cuerpo" son dos líneas paralelas en la industria taiwanesa
- [Industria de semiconductores](/technology/半導體產業) — La base de todos los chips para robots, y por qué "chips fuertes no equivalen a robots fuertes" en lógica industrial
- [Industria de drones de Taiwán](/technology/台灣無人機產業) — Otro caso de "componentes fuertes, máquinas completas débiles", que puede leerse en paralelo con la industria robótica
- [Crisis de baja natalidad en Taiwán](/society/台灣少子化危機) — ¿Por qué el NCAIR puso el "cuidado a domicilio de personas mayores" en primer lugar? La respuesta está en la estructura demográfica
- [Transformación y mejora industrial de Taiwán](/economy/台灣產業轉型升級) — Del ensamblaje por encargo a la marca propia, de los componentes a la integración de sistemas: el dilema estructural debatido repetidamente en las últimas dos décadas
- [Industria de máquinas herramienta de Taiwán](/economy/台灣機械工具產業) — Las 1,500 empresas de maquinaria de precisión del Valle Dorado de Dadu Shan son la base de suministro superior para el hardware robótico

## Referencias

[^1]: [Lai inaugurates National Center for AI Robotics in Tainan - Taipei Times](https://www.taipeitimes.com/News/taiwan/archives/2026/04/11/2003855415) — Reportaje en inglés del Taipei Times que documenta el proceso completo de la inauguración del Centro Nacional de Robótica con IA (NCAIR) por el presidente Lai Ching-te en la Ciudad Científica de Energía Verde e Inteligencia de Shalun, Tainan, el 10 de abril de 2026, con información del lugar y las funciones oficiales.

[^2]: [President Lai inaugurates National Center for AI Robotics in Tainan - Focus Taiwan](https://focustaiwan.tw/sci-tech/202604100020) — Focus Taiwan (servicio en inglés de la Agencia Central de Noticias) registra la cifra de inversión concreta anunciada por Lai Ching-te en la inauguración (NT$200 mil millones entre 2026 y 2029, aproximadamente US$6,290 millones) y la cita de la visión de "isla tecnológica".

[^3]: [Lai inaugurates National Center for AI Robotics in Tainan - Taipei Times](https://www.taipeitimes.com/News/taiwan/archives/2026/04/11/2003855415) — El Taipei Times cita a Su Wen-yu (Su Wen-yu), director del NCAIR, definiendo las prioridades del centro, enfatizando que los robots de cuidado a domicilio para personas mayores son el foco principal de investigación del NCAIR, así como la planificación específica de las cuatro áreas de aplicación.

[^4]: [減速機扮人形機器人要角 全球大廠卡位台廠拚商機 - 工商時報](https://www.ctee.com.tw/news/20241130700314-430502) — Reportaje en profundidad industrial del Commercial Times que analiza el panorama de suministro del mercado global de reductores armónicos, documentando el hecho de que la empresa japonesa Harmonic Drive Systems (HDS) alcanza una cuota de mercado del 80% en aplicaciones de robótica industrial, así como el origen de sus barreras tecnológicas.

[^5]: [入選全球「人形機器人百強」！上銀科技的致勝心法 - 經理人月刊](https://www.managertoday.com.tw/articles/view/71579) — Perfil corporativo completo de HIWIN Technologies publicado por Manager Today en 2025, que incluye información de contexto sobre las cuatro empresas taiwanesas seleccionadas en la lista "Humanoid 100" de Morgan Stanley (TSMC, Foxconn, He Da Industrial y HIWIN).

[^6]: [入選全球「人形機器人百強」！上銀科技的致勝心法 - 經理人月刊](https://www.managertoday.com.tw/articles/view/71579) — Manager Today recoge la filosofía de gestión original del presidente de HIWIN, Cho Wen-heng: "Si no puedes comprar la tecnología, fabrícala tú mismo", así como su trayectoria completa: ingreso a la empresa en 1995 y asunción de la presidencia en 2019.

[^7]: [減速機扮人形機器人要角 全球大廠卡位台廠拚商機 - 工商時報](https://www.ctee.com.tw/news/20241130700314-430502) — El Commercial Times documenta la estructura del mercado global de reductores armónicos: Harmonic Drive Systems y sus empresas asociadas representan aproximadamente el 70% de la cuota de mercado global, alcanzando el 80% en aplicaciones de robótica industrial; los reductores planetarios están dominados por fabricantes japoneses y alemanes.

[^8]: [AI 機器人｜全球滾珠螺桿巨頭 上銀有望掌握人形機器人商機嗎 - 優分析](https://uanalyze.com.tw/articles/9860012116) — Análisis financiero en profundidad de Uanalyze que documenta el contexto de desarrollo de la serie DATORKER (DT) de reductores armónicos de HIWIN, así como la elección estratégica de HIWIN de "romper el monopolio japonés mediante I+D propia".

[^9]: [入選全球「人形機器人百強」！上銀科技的致勝心法 - 經理人月刊](https://www.managertoday.com.tw/articles/view/71579) — Manager Today revela la tasa de integración vertical del 95% de HIWIN, así como la cifra operativa de una mejora de 3 a 4 veces en la eficiencia de producción mediante equipos fabricados internamente, explicando por qué eligió la I+D autónoma en lugar de la externalización.

[^10]: [「AI 機器人大聯盟」啟動！2030 年拚兆元出口，台灣精密機械業轉型劇本改寫中？ - 遠見雜誌](https://www.gvm.com.tw/article/123262) — Reportaje de Global Views Magazine sobre el "Plan de Impulso a la Industria de Robots Inteligentes con IA" lanzado por el Ejecutivo Yuan en 2025, que documenta el objetivo de política de alcanzar un billón de dólares taiwaneses en producción para 2030 y la dirección de transformación de la industria de maquinaria de precisión.
