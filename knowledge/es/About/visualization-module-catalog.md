---
title: 'Catálogo de módulos de visualización: diecinueve formas de ver los datos de Taiwán'
description: 'Ejemplos interactivos de los módulos de visualización de artículos de Taiwan.md: utilizando datos reales de vivienda, población, salud y el parlamento de Taiwán para renderizar cada módulo visual `tw-*`, junto con la sintaxis y principios de diseño de `graph.md`.'
date: 2026-06-06
category: 'About'
tags:
  [
    'Visualización de datos',
    'justicia habitacional',
    'política de vivienda',
    'datos abiertos',
  ]
author: 'Taiwan.md'
readingTime: 11
featured: false
lastVerified: 2026-06-12
lastHumanReview: false
image: '/article-images/society/taipei-skyline-housing-2026.webp'
imageCredit: 'Heeheemalu'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg'
relatedDiary: ['2026-07-16-222859-viz-evolution']
translatedFrom: 'About/視覺化模組型錄.md'
sourceCommitSha: '756ab2957'
sourceContentHash: 'sha256:e634c73174fd4145'
sourceBodyHash: 'sha256:5fe923f8d157fe62'
translatedAt: '2026-10-23T16:35:59.984632+00:00'
---

# Catálogo de módulos de visualización: diecinueve formas de ver los datos de Taiwán

> **Resumen en 30 segundos:** Esta página es un «ejemplo vivo» del sistema de visualización de Taiwan.md: renderiza cada uno de los diecinueve módulos visuales utilizados en los artículos, todos con datos reales de Taiwán (relación precio-ingresos, vivienda social, envejecimiento, referéndums, ratio enfermera-paciente, escaños parlamentarios). Es el complemento de la guía de edición [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md): **mientras que graph.md explica «cuándo usar cada uno, cómo hacerlo bien y cómo escribir la sintaxis», esta página te permite ver directamente «cómo quedan».** Cada módulo se renderiza mediante HTML/SVG puro, por lo que las personas, los lectores de pantalla, Google y los rastreadores de IA pueden leer exactamente los mismos datos; esta es la razón por la que elegimos la visualización estática en lugar de gráficos interactivos.

Al escribir un artículo sobre cifras, el mayor temor es presentar los datos como una pila de números consecutivos, donde el lector pierde la atención al llegar al tercer porcentaje. La labor de la visualización es transformar «un prosa densa de números» en una «estructura legible de un vistazo».

Sin embargo, la visualización de Taiwan.md tiene una disciplina que otros no poseen: **solo realizamos visualizaciones que «también sean comprensibles para los LLM»**. Un gráfico interactivo hecho con D3 o Canvas puede ser impresionante, pero los rastreadores de IA como GPTBot, PerplexityBot o ClaudeBot no ejecutan JavaScript; para ellos, ese gráfico es un espacio en blanco. En cambio, nuestros gráficos hechos con HTML semántico y SVG integrado contienen los datos directamente en el código fuente, permitiendo que la IA lea y cite los datos en primera persona de Taiwán en seis idiomas. **Visualizar para que los LLM lo entiendan es visualizar la soberanía.**

A continuación se presentan los diecinueve módulos, desde el más simple «un número grande» hasta el «mapa de teselas por condado» y el «arco de escaños», presentados en orden. La versión completa de la sintaxis y los principios de diseño se encuentra en `graph.md`; aquí solo incluimos una breve descripción de «qué es y cuándo usarlo».

## Gran cifra tw-figure

La más simple y potente: presentar un número dramático en gran tamaño para mostrar una transformación mediante el contraste. Ideal como un «dato contundente» (sledgehammer stat) para abrir un tema.

```tw-figure
67,000 → 870,000 / ping
Precio de venta de la vivienda social Chenggong en Taipéi en 1985 frente al precio medio de mercado en 2026: la misma dirección, aproximadamente 13 veces más caro.
Plataforma de registro de precios reales (Vivienda Social Chenggong)
```

## Grupo de datos tw-stat

Cuando un párrafo contiene tres o cuatro cifras clave paralelas, en lugar de escribir una frase larga, es mejor organizarlas en una fila de tarjetas para que el lector las escanee rápidamente.

```tw-stat
174,891 unidades | Vivienda social construida directamente por el gobierno | 1976–1999
Más de 390,000 unidades | Total de vivienda social en sentido amplio | Hasta su abolición en 2015
84.4% | Tasa de propiedad de vivienda en Taiwán | 2024
Fuente: Comunicado del Ejecutivo sobre la abolición de la Ley de Vivienda Nacional, Plataforma de Información Inmobiliaria del Ministerio del Interior
```

Los módulos de edición que contienen datos (grupos de datos, tarjetas de comparación, ejes de política) deben incluir `Fuente:` al igual que los módulos gráficos. En una auditoría de todo el sitio en julio de 2026, se descubrió que los módulos supervisados por la puerta automática tenían un 100% de tasa de atribución de fuentes; sin embargo, los tres módulos de alta frecuencia no supervisados presentaban un 40% de omisiones. Ahora también han sido integrados en el control `viz-health`.

## Tarjeta de comparación tw-versus

Comparación punto por punto entre dos sistemas, dos posturas o dos estados temporales. Color cálido a la izquierda, color frío a la derecha, con un «vs» en el centro para leer las diferencias línea por línea.

```tw-versus
Vivienda social de Taiwán | Vivienda subsidiada de Hong Kong
Subvencionada por el gobierno, venta económica a residentes | Subvencionada por el gobierno, venta económica a residentes
Se puede revender al precio de mercado tras un año de residencia | La reventa en el mercado abierto requiere el «pago de la diferencia de suelo»
La plusvalía pertenece casi totalmente al individuo | La plusvalía es recuperada por el erario público según la proporción del descuento original
Pérdida única del inventario público | El beneficio público se recupera mediante la reventa
Fuente: Boletín de la Legislatura, Comisión de Vivienda de Hong Kong
```

## Barra de proporciones tw-bars

Comparación de valores o rankings para pocas categorías. La longitud de las barras horizontales se escala automáticamente según el valor, expandiéndose hasta el máximo. Recuerda añadir una fila de `Fuente:` al final del módulo de datos; esto se convertirá automáticamente en la nota de fuente inferior.

```tw-bars
Nacional 2014 | 8.41 veces
Nacional 2024 | 10.76 veces
Taipéi 2024 | 16.60 veces | Pico histórico
Fuente: Plataforma de Información Inmobiliaria del Ministerio del Interior, Centro de Investigación Inmobiliaria de la Universidad de Política Nacional
```

## Gráfico de cuadrícula tw-waffle

Composición de una parte respecto al todo. Cien cuadros representan el 100%, lo cual es más intuitivo que un gráfico de sectores: puedes contar los cuadros físicamente. Ideal para datos donde las categorías suman aproximadamente 100%.

```tw-waffle
Composición de la vivienda en Viena (2023)
Vivienda social municipal | 21.9
Vivienda social con lucro limitado | 21.4
Vivienda propia | 20.4
Alquiler privado | 36.3
Fuente: Estadísticas de vivienda de la ciudad de Viena (Stadt Wien)
```

## Eje de política tw-timeline

Contexto de hitos clave en sistemas o políticas, conectados mediante una línea de tiempo de nodos. Nota: esto es un «auxilio visual»; no debe confundirse con el uso de cronologías como subtítulos del cuerpo del texto (ej. «En 1l975...»).

```tw-timeline
1975 | Implementación de la Ley de Vivienda Nacional | El gobierno construyó para vender, estableciendo un ciclo cerrado de «calificación de comprador» sin escape de subsidios.
2002 | Se derribó esa barrera | La reforma eliminó las restricciones de calificación, permitiendo vender vivienda social a cualquier persona tras un año de residencia.
2015 | Abolición de la Ley de Vivienda Nacional | Razón oficial: la tasa de propiedad alcanzó el 85%, virando hacia viviendas sociales de alquiler sin venta.
2026 | Taoyuan reinstala la barrera | Vivienda asequible: la reventa no puede superar el precio original de adquisición.
Fuente: Boletín de la Legislación, Comunicado del Ejecutivo sobre la abolición de la Ley de Vivienda Nacional
```

## Tarjeta de cita tw-quote

Cuando una sola frase representa la tensión central de todo un artículo, amplifícala en una tarjeta de cita. No es necesario añadir comillas manualmente; el módulo las incluye. Las citas deben ser literales y verificables.

```tw-quote
Una casa con valor de mercado de 30 millones se convierte en una de 60 a 70 millones... robando a los pobres para beneficiar a los ricos, usando dinero estatal para ayudar a los ricos a remodelar sus casas.
Lin Chih-chun | Abogado, propuesta de 2025 sobre «uso de fondos estatales para la renovación de la Vivienda Social Chenggong»
```

## Barra de fuente tw-source

Concentra las fuentes de un análisis en una etiqueta (chip) discreta junto al párrafo. La credibilidad es parte de la curaduría; los medios digitales en Taiwán suelen olvidar citar sus fuentes, y este es un lugar donde podemos marcar la diferencia.

```tw-source
Plataforma de Información Inmobiliaria del Ministerio del Interior, Registro de Precios Reales, Centro de Investigación Inmobiliaria de la Universidad de Política Nacional, Boletín de la Legislatura, Comisión de Vivienda de Hong Kong
```

## Caja de notas tw-note

La credibilidad de un artículo de datos reside en un 50% en «cómo hiciste el cálculo». Los reporteros de periodismo de datos usan bloques de 【Nota】 para explicar metodologías o (Nota) para correcciones; nosotros convertimos esta convención en un módulo. La primera fila debe ser una de estas: `Nota`/`Método`/`Nota aclaratoria`/`Corrección`/`Actualización`, y cada fila posterior es un párrafo independiente.

```tw-note
Método
En esta página, el «índice de envejecimiento» = (población de 65 años o más ÷ población de 0 a 14 años) × 100. Un valor de 100 significa que hay tantos ancianos como niños; cuanto mayor sea el número, más «desequilibrada» estará la estructura poblacional.
La tasa de envejecimiento y el índice de envejecimiento provienen de las estadísticas de la Dirección de Registro Civil del Ministerio del Interior a finales de 2025; el análisis completo de los 22 condados y ciudades se encuentra en 〈Ver los 22 condados y ciudades de Taiwán con datos〉.
```

## Gráfico de líneas tw-line

Tendencias de cuatro o más puntos temporales, dibujadas como líneas mediante SVG integrado. Los límites superior e inferior del eje Y se muestran para que el lector vea el rango. Lo más importante es que **genera automáticamente una tabla oculta** para que los lectores de pantalla y los rastreadores de IA accedan a los datos originales. El gráfico es para humanos, la tabla es para máquinas; ambos comparten el mismo origen.

```tw-line
Aumento de la relación precio-ingresos en todo el país durante diez años (veces)
Año | Nacional
2014 | 8.41
2016 | 9.32
2018 | 8.57
2020 | 9.20
2022 | 9.61
2024 | 10.76
Base: Inicio en 2014 | 8.41
Fuente: Centro de Investigación Inmobiliaria de la Universidad de Política Nacional, Plataforma de Información Inmobiliaria del Ministerio del Interior
```

El gráfico de líneas también admite una **línea base**: al añadir una fila `Base: etiqueta | valor`, se dibuja como una línea discontinua sin extremos, solo con una etiqueta, visualmente separada de la serie medida. Así, el lector no confundirá un umbral fijo con un dato medido.

## Gráfico de pendiente tw-slope

Cuando solo tienes «dos puntos temporales», el gráfico de líneas desperdicia el espacio intermedio. El gráfico de pendiente permite que la inclinación de la línea entre ambos puntos hable por sí sola, mostrando quién subió más o quién superó a quién de un vistazo. Añadir un `*` al inicio de una etiqueta permite enfatizar una fila; las demás se atenúan automáticamente para servir de contexto.

```tw-slope
Relación precio-ingresos: ¿Quién subió más en diez años? (veces)
2014 | 2024
Nacional | 8.41 | 10.76
*Taipéi | 12.0 | 16.60
Fuente: Plataforma de Información Inmobiliaria del Ministerio del Interior, Centro de Investigación Inmobiliaria de la Universidad de Política Nacional
```

## Mapa de calor tw-heatmap

Comparación matricial de Región × Indicador, o Año × Categoría. Cada columna se normaliza según la intensidad del color; cuanto mayor es el número, más cálido es el tono. Es intrínsecamente una tabla HTML, por lo que es legible para la IA, razón por la cual este módulo es superior a «una simple imagen en color» en nuestro sistema.

```tw-heatmap
Ciudad/Condado | Relación precio-ingresos (veces) | Tasa de carga hipotecaria (%)
Taipéi | 16.60 | 63.9
Nuevo Taipéi | 13.03 | 56.9
Taichung | 11.11 | 48.0
Taoyuan | 9.0 | 40.0
Fuente: Plataforma de Información Inmobiliaria del Ministerio del Interior
```

## Gráfico de puntos tw-dot

El gráfico de barras compara «cantidades», mientras que el gráfico de puntos muestra la «distribución»: todos los puntos caen sobre la misma escala, lo que te permite ver quién está agrupado y quién es un valor atípico. Si proporcionas un valor por fila, obtendrás un _dot strip_; si proporcionas dos valores, se dibujará un intervalo de «de aquí hasta allá»; si proporcionas tres valores (`estimación puntual | límite inferior | límite superior`), se dibujará una «estimación puntual + banda de incertidumbre», similar a las encuestas de opinión. El margen de error del ±3% no debe ignorarse; esta es la forma más honesta de presentarlo, algo que suele fallar con frecuencia en los años electorales. También puedes usar `*` para enfatizar algo.

```tw-dot
Los extremos del envejecimiento: de los condados/ciudades más jóvenes a los más viejos (% de población de 65 años o más)
Hsinchu | 15.08 | El condado más joven de Taiwán
Taoyuan | 16.72
Taichung | 17.40
Nuevo Taipéi | 19.95
Tainan | 20.48
Kaohsiung | 20.79
*Chiayi | 24.11 | Índice de envejecimiento más alto de Taiwán
*Taipéi | 24.18 | El más alto de Taiwán
Fuente: Dirección de Registro Civil del Ministerio del Interior, finales de 2025
```

## Barras apiladas tw-stack

El gráfico de cuadrícula es ideal para la composición de «un todo»; las barras apiladas son ideales para **comparar composiciones entre varias filas**. Cada fila se normaliza automáticamente al 100%; si el párrafo es lo suficientemente ancho, los valores se mostrarán directamente dentro de los bloques de color.

```tw-stack
Tres referéndums nucleares: A favor vs En contra (% de votos válidos)
Referéndum | A favor | En contra
201            | 59 | 41
2021            | 47 | 53
2025            | 74 | 26
Fuente: Resultados oficiales de la Comisión Central de Elecciones, Comisión Electoral Central
```

## Pirámide tw-pyramid

Barras espalda con espalda, con un grupo a cada lado y etiquetas compartidas en el centro; es el gráfico demográfico clásico. Aquí lo usamos para ver el «desequilibrio» en seis ciudades/condados: a la izquierda los niños, a la derecha los ancianos; al compararlos, el envejecimiento deja de ser un porcentaje abstracto.

```tw-pyramid
Desequilibrio: Proporción de población infantil vs anciana en seis regiones (%)
Ciudad/Condado | 0–14 años | 65 años o más
Condado de Hsinchu | 14.80 | 15.08
Taoyuan | 13.13 | 16.72
Taichung | 12.75 | 17.40
Taipéi | 11.97 | 24.18
Keelung | 9.28 | 22.28
Condado de Chiayi | 8.27 | 24.11
Fuente: Dirección de Registro Civil del Ministerio del Interior, finales de 2025; la proporción infantil se calcula como (tasa de envejecimiento ÷ índice de envejecimiento) × 100
```

## Mapa de teselas tw-tiles

Los mapas coropléticos de Taiwán tienen dos problemas antiguos: el área de Hualien y Taitung es tan grande que domina visualmente, y la forma de Taiwán dibujada por IA suele parecer «una mezcla entre oliva y patata». El mapa de teselas organiza los 22 condados y ciudades en bloques de igual tamaño (la disposición está fija en el sistema según su posición real), cada bloque tiene el mismo peso y los números se escriben directamente sobre ellos. La forma siempre es correcta porque no dibujamos formas.

```tw-tiles
Tasa de envejecimiento en los 22 condados y ciudades de Taiwación ( % de población de 65 años o más)
Taipéi | 24.18
Nuevo Taipéi | 19.95
Taoyuan | 16.72
Taichung | 17.40
Tainan | 20.48
Kaohsiung | 20.79
Keelung | 22.28
Hsinchu | 16.16
Chiayi | 19.90
Condado de Hsinchu | 15.08
Miaoli | 20.23
Changhua | 20.37
Nantou | 22.66
Yunlin | 21.76
Condado de Chiayi | 24.11
Pingtung | 21.84
Yilan | 20.77
Hualien | 21.52
Taitung | 20.93
Penghu | 21.03
Kinmen | 19.69
Lienchiang | 17.14
Fuente: Dirección de Registro Civil del Ministerio del Interior, finales de 2025
```

## Gráfico de unidades tw-iso

«174,891 unidades» es un número que se olvida tras leerlo; nueve puntos redondos que puedes contar con los dedos no. El gráfico de unidades sustituye cifras grandes por unidades contables («un símbolo = cierta cantidad»), una técnica esencial para reporteros en reportajes sobre pesca de altura: transformar números masivos e intangibles en unidades perceptibles para el ciudadano. Los símbolos solo usan números enteros (sin medios símbolos), y el valor exacto se escribe al lado.

```tw-iso
Cuánta vivienda social ha construido el gobierno en estos 24 años
單位：● = 20,00<0xC2>0 unidades
Construcción directa del gobierno | 174,891 unidades | 1976–1999
Total de vivienda social en sentido amplio | Más de 390,000 unidades | Hasta su abolición en 2015
Fuente: Comunicado del Ejecutivo sobre la abolición de la Ley de Vivienda Nacional
```

## Arco de escaños tw-arc

La composición parlamentaria tiene su propio gráfico especializado: una matriz semicircular de puntos, un punto por escaño, donde los partidos se organizan en un sector continuo según su orden de lista. El gráfico de sectores compara ángulos (algo que el ojo humano no hace bien); el arco de escaños te permite contar puntos directamente, con la línea de mayoría absoluta dibujada exactamente donde debe estar. Aquí usamos los resultados de las elecciones legislativas de 2024: 113 escaños, sin mayoría para ningún partido; esa línea discontinua es el punto de partida de la posterior tensión por las revocaciones de mandatos. Nota: este es un gráfico parlamentario; para elecciones de alcaldes en los 22 condados y ciudades (donde hay un ganador por distrito), debe usarse el mapa de teselas inferior.

```tw-arc
Legislatura de 202cal: Sin mayoría absoluta (113 escaños)
過半：57
KMT | 52
DPP | 51
TPP | 8
Independientes | 2 | Tendencia Pan-azul
Fuente: Comisión Central de Elecciones
```

## Rejilla de pequeños múltiplos tw-multiples

Un solo gráfico con cinco líneas se convierte en un nudo de espagueti; los pequeños múltiplos asignan cada línea a su propia celda, **donde todas las celdas comparten la misma escala**, permitiendo la comparación directa de formas. Aquí usamos el ratio enfermera-paciente en tres turnos: el mapa de calor (el anterior) te da una matriz precisa; los pequeños múltiplos te muestran la tendencia: cómo cada nivel aumenta hacia la madrugada y cómo la base es la que más se dispara. Con los mismos datos, si haces preguntas diferentes, elige gráficos diferentes.

```tw-multiples
A medida que la noche es más profunda y el hospital más básico, un enfermero cuida de más camas (personas)
Columna: Turno | Ratio enfermera-paciente
--- Centro Médico
Mañana | 6
Tarde | 9
Noche | 11
--- Hospital Regional
Mañana | 7
Tarde | 11
Noche | 13
--- *Hospital de Distrito
Mañana | 10
Tarde | 13
Noche | 15
Fuente: Anuncio estándar del ratio enfermera-paciente para tres turnos, Ministerio de Salud y Bienestar, 2024
```

## Cómo usar estos módulos

Cada módulo se escribe en el Markdown del artículo como un bloque ` ```tw-* ` utilizando `|` para las columnas. Durante la construcción, se transforma automáticamente en lo que ves arriba; el autor no necesita escribir HTML ni JavaScript. La sintaxis completa, cuándo usar cada uno, cómo diseñar colores y ejes para no inducir a error, y la lista de verificación visual antes de publicar, se encuentran en [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md).

Este sistema toma como referencia la filosofía editorial de [The Pudding](https://pudding.cool/) —la pregunta precede al dato, las conclusiones deben ser claras, la atribución es protagonista— pero ha evolucion a un órgano propio de Taiwan.md: estático, multilingüe y legible para la IA. El contexto completo del diseño se encuentra en el [Informe de Diseño del Sistema de Visualización](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md).

Para ver cómo estos módulos se entrelazan narrativamente en un artículo profundo real, lee [Vivienda Social y Justicia Habitacional](/es/society/public-housing-justice); la mayoría de los datos de esta página provienen de esa investigación.

## Este sistema también está evolucionando

La página que estás viendo es el resultado de tres rondas de evolución. Al ser una página con línea de tiempo, usaremos el módulo de eje de política para contar su propia historia:

```tw-timeline
2026-06-06 | Nacimiento de diez módulos | Tras investigar la taxonomía de gráficos de The Pudding y FT, surgiamos con la primera tanda: cifra grande, tarjeta de comparación, barra de proporciones y línea.
2026-06-12 | Crecemos a diecisiete una semana después | Añadimos pendiente, puntos, apilado, pirámide, teselas y unidades; el verificador de píxeles `viz-shot` nació el mismo día, porque «la existencia del markup» y «que se vea bien» son dos cosas distintas.
2026-07-16 | Diecinueve módulos, y aprendemos seis idiomas | Se integran el arco de escaños y los pequeños múltiplos; las cadenas de sistema como «Fuente» ahora se renderizan en seis idiomas; las teselas para versiones en inglés y japonés ya no se degradan a barras.
Fuente: Informe de Diseño y Evolución del Sistema de Visualización de Taiwan.md (junio 2026 – julio 2026, público en GitHub)
```

El enfoque de la tercera ronda no fue añadir nuevos gráficos, sino realizar una auditoría honesta. La auditoría de todo el sitio reveló que: los módulos supervisados por la puerta automática tenían un 100% de atribución; pero los tres módulos de alta frecuencia no supervisados presentaban un 40% de omisiones. Las normas se escribieron en la guía de edición hace dos meses, pero el comportamiento seguía sin alinearse con las herramientas; por ello, esta vez ampliamos las herramientas para que coincidan con las normas. En la misma ronda detectamos que las cadenas del sistema en páginas en inglés, japonés y coreano se renderizaban todas en chino, e incluso un carácter simplificado se colaba en las etiquetas de accesibilidad sin que nadie lo notara. Para un sistema que afirma «hacer que los datos de Taiwán sean legibles para los LLM en seis idiomas», estos detalles son más importantes que las nuevas funciones.

Investigaciones recientes respaldan este enfoque: la precisión de la IA multimodal para reconstruir valores de gráficos a partir de imágenes no es fiable; los nodos de texto son lo que las máquinas pueden leer con estabilidad. Esta es la razón por la que el mapa de teselas escribe los números directamente sobre los bloques y cada gráfico incluye una tabla de datos oculta. El proceso de investigación completo y las decisiones de diseño se detallan en el [Informe de Investigación Profunda e Implementación del Sistema de Visualización v3.0](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md).

**Lecturas adicionales**:

- [Vivienda Social y Justicia Habitacional](/es/society/public-housing-justice) — La historia completa tras estos datos de vivienda: cómo la vivienda social pasó de ser económica a ser un escalón de activos; fuente de la mayoría de los datos de esta página.
- [Ver los 22 condados y ciudades de Taiwán con datos](/es/geography/data-taiwan-22-cities) — Los datos de envejecimiento para el gráfico de puntos, pirámide y teselas de esta página provienen del análisis completo de los 22 condados y ciudades de este artículo.
- [Debates sobre Taiwán y la energía nuclear](/es/society/taiwan-nuclear-debate) — La historia completa de los tres referéndums en las barras apiladas: ganamos el debate, perdimos la política.
- [Ley de Salud](/es/society/medical-care-act) — La historia completa de los ratios enfermera-paciente en los pequeños múltiplos: la ley puede decir cuántas camas atender, pero no si hay manos disponibles para hacerlo.
- [Revocaciones masivas](/es/history/great-recall-movement-2024) — El seguimiento de la línea de mayoría absoluta en el arco de escaños: cómo un parlamento sin mayoría llegó a 31 casos de revocación.
- [Crisis de baja natalidad en Taiwán](/es/society/taiwan-low-birth-rate-crisis)— La otra cara de la justicia generacional: no poder comprar vivienda y no poder tener hijos.

## Fuentes de imágenes

Este artículo utiliza 1 imagen con licencia Creative Commons, almacenada en `public/article-images/society/`:

- [Skyline de Taipéi (vista desde Xiangshan)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Foto: Heeheemalu, 2026, CC BY-SA 4.0 (hero)

## Referencias

[^1]: [Plataforma de Información Inmobiliaria del Ministerio del Interior](https://pip.moi.gov.tw/Publicize/Info/E1050) — Estadísticas oficiales de vivienda como relación precio-ingresos, tasa de carga hipotecaria y tasa de propiedad.

[^2]: [Centro de Investigación Inmobiliaria de la Universidad de Política Nacional](https://rer.nccu.edu.tw/article/detail/2210058908437) — Indicadores históricos de asequibilidad de la vivienda; fuente de la serie de relación precio-ingresos en los gráficos de líneas y barras de esta página.

[^3]: [Comunicado del Ejecutivo sobre la abolición de la Ley de Vivienda Nacional](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Datos oficiales como el número acumulado de unidades de vivienda social (aprox. 390,000).

[^4]: [Estadísticas demográficas de la Dirección de Registro Civil del Ministerio del Interior](https://www.ris.gov.tw/app/portal/346) — Proporción de población de 65 años o más y índice de envejecimiento por condado/ciudad a finales de 2025; para la cadena completa de verificación, ver 〈[Ver los 22 condados y ciudades de Taiwán con datos](/es/geography/data-taiwan-22-cities)〉.

[^5]: [Resultado del Referéndum n.º 16 de 2018 de la Comisión Central de Elecciones (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — La proporción de votos a favor en los tres referéndums nucleares (59%/47%/74%) son resultados oficiales de la CEC; cadena de verificación por caso en 〈[Debates sobre Taiwán y la energía nuclear](/es/society/taiwan-nuclear-debate)〉.

[^6]: [CNA: Sin mayoría absoluta en las elecciones legislativas de 202$\\$4](https://www.cna.com.tw/news/aipl/202401130361.aspx) — La distribución de los 113 escaños (KMT 52, DPP 51, TPP 8, Independientes 2) son resultados oficiales de la CEC; cadena de verificación en 〈[Revocaciones masivas](/es/history/great-recall-movement-2024)〉.

[^7]: [Anuncio estándar del ratio enfermera-paciente para tres turnos (2024), Ministerio de Salud y Bienestar](https://www.mohw.gov.tw/) — Valores estándar por los tres niveles en los pequeños múltiplos; cadena de verificación en 〈[Ley de Salud](/es/society/medical-care-act)〉.
