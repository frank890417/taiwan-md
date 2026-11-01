---
title: 'Mini Taiwan Pulse: Con ojos de curador, dibujando a Taiwán como un mapa que respira'
description: 'En 2026, el analista de datos Migu arrastró un archivo CSV a Kepler.gl y la primera vez que apareció un mapa de Taiwán en su pantalla fue así. Dos años después, el popular proyecto mini-taiwan-pulse ha acumulado 375 estrellas en GitHub, superponiendo cinco tipos de datos en tiempo real —cielo, océano, tierra, calles y gestión de residuos— para crear un mapa dinámico. Con más de 50,000 registros del gobierno central y datos abiertos de más de veinte condados y ciudades, el cerebro humano no puede procesarlo todo; su solución no fue contratar a más personas, sino delegar la tarea a un sistema que crece por sí mismo, orquestado por agentes de IA, donde el humano solo se encarga de plantear las preguntas y validar los resultados. Desde una visión curatorial entrenada en planificación urbana hasta un pipeline de detección de incendios que se ejecuta solo en tmux, ¿cómo es que el GitHub de una sola persona llegó a convertirse en toda una galaxia?'
date: 2026-04-19
category: 'Technology'
tags:
  [
    'Tecnología',
    'Tecnología ciudadana',
    'Datos abiertos',
    'Visualización de datos',
    'Proyecto de código abierto',
    'TDX',
    'Three.js',
    'Inteligencia artificial',
    'Agente de IA',
    'GIS',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-06-25
lastHumanReview: true
readingTime: 20
image: '/article-images/technology/mini-taiwan-pulse-map-2026.webp'
imageCredit: 'Migu / sciwork 2026'
imageLicense: 'Fair use editorial commentary'
imageSource: 'https://github.com/ianlkl11234s/0613-sci-work-share'
relatedDiary: ['2026-06-25-203919-manual-mirror']
sporeLinks:
  - id: 150
    platform: 'threads'
    date: '2026-06-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DaA6aTRk7e6'
  - id: 151
    platform: 'x'
    date: '2026-06-25'
    url: 'https://x.com/taiwandotmd/status/2070173370118000879'
translatedFrom: 'Technology/mini-taiwan-pulse.md'
sourceCommitSha: 'f4ae4fb8f'
sourceContentHash: 'sha256:0128d89b548611d1'
sourceBodyHash: 'sha256:ce5c6e11aac7eea6'
translatedAt: '2026-10-21T00:59:06.949563+00:00'
---

# Mini Taiwan Pulse: Con los ojos de un curador, dibujar Taiwán como un mapa que respira

En algún día a principios de 2026, un analista de datos llamado Migu convirtió un archivo CSV en GeoJSON y lo arrastró a una herramienta llamada Kepler.gl en su navegador. Sin escribir ni una sola línea de código, apareció en la pantalla el primer mapa de Taiwán.

Estudió planificación urbana en la universidad, donde tocó brevemente los SIG (Sistemas de Información Geográfica, herramientas que básicamente hacen que los datos cobren vida sobre un mapa). Después de entrar al mundo laboral, siguió la ruta del análisis de datos, pero hacía mucho que no volvía a tocar los mapas. El momento en que arrastró el CSV a Kepler.gl y vio nacer Taiwán en la pantalla, le provocó una sorpresa sencilla y pura:

> «Resulta que Taiwán tiene tantos datos, y convertirlos en un mapa no es tan difícil.»[^1]

Esta frase no parece gran cosa. Más tarde se convertiría en la semilla de todo un conjunto de cosas.

> **Resumen en 30 segundos:** Migu (GitHub `ianlkl11234s`) comenzó a finales de 2025 a crear una decena de proyectos de visualización con datos abiertos de Taiwán. El más popular, _mini-taiwan-pulse_, acumuló 375 estrellas en GitHub, superponiendo cinco tipos de datos en tiempo real: cielo, océano, tierra, calles y camiones de basura, en un mapa animado[^2]. Sin embargo, en una charla en junio de 2026 para la comunidad sciwork, lo dijo claro: los datos abiertos de Taiwán, solo a nivel central, suman unas 50.000 entradas, dispersas en plataformas de más de una veintena de condados y ciudades. «El cerebro humano no puede escanearlo todo». Su respuesta no fue pedir más ayuda para escanear, sino entregar todo el sistema a un conjunto de agentes de IA orquestados que crecen por sí mismos; los humanos solo se encargan de plantear las preguntas y verificar los resultados[^3].

Esta artículo cuenta cómo una persona pasó de la ingenuidad de arrastrar un CSV a soltar el control para que el sistema crezca por sí mismo.

## Cómo el GitHub de una sola persona se convirtió en una galaxia

Si solo observamos el proyecto _mini-taiwan-pulse_, es fácil imaginar a Migu como un ingeniero aficionado: alguien que, por puro entusiasmo un fin de semana, hizo una demo que casualmente se volvió viral.

Esa suposición es errónea por dos razones.

Primero, lo que ha hecho va mucho más allá de un solo proyecto. Si entras en su GitHub, verás que desde diciembre de 2025 hay una densa lista de visualizaciones de datos abiertos de Taiwán: empezó con una prueba de concepto (PoC) sobre el alcance de los autobuses para tantear el terreno; después, a finales de diciembre, un proyecto de aprendizaje llamado `mini-taiwan-learning-project` se volvió popular primero, alcanzando hoy las 189 estrellas. En febrero creó puntos de ubicación en tiempo real del AIS de buques y desarrolló `flight-arc-graph` (56 estrellas), que dibuja arcos para cada despegue y aterrizaje de un vuelo. No fue hasta finales de febrero cuando llegó el turno de _mini-taiwan-pulse_, seguido por el atlas de la TRA (Ferrocarriles de Taiwán), órbitas satelitales, imágenes de CCTV en tiempo real y `mini-taiwan-info`, un panel de control que converge todos los datos... trabajando sin pausa hasta junio[^2]. Más de una decena de repositorios se han conectado para formar lo que él mismo llama la galaxia «Mini Taiwan».

![El panel de control Mini Taiwan Info, que converge diversos temas de datos abiertos —población, transporte ferroviario, navegación, recursos hídricos, bomberos, medicina, etc.— en un panel de monitoreo de una página por tema](/article-images/technology/mini-taiwan-info-dashboard-2026.webp)

_Otro miembro de la galaxia, Mini Taiwan Info: ha convergido los datos abiertos dispersos en un panel de control de monitoreo situacional; población, transporte ferroviario, navegación, recursos hídricos, bomberos y medicina, con una página dedicada a cada tema. Foto: Migu / sciwork 2026 (uso legítimo para fines de edición y crítica)._

Si ordenamos las estrellas de estos proyectos, es evidente que no solo hay uno destacado.

```tw-bars
GitHub de Migu: más de un repo destaca (estrellas en GitHub)
*mini-taiwan-pulse | 375 | Buque insignia
mini-taiwan-learning-project | 189 | Se hizo viral antes que pulse
flight-arc-graph | 56 | Trayectorias de vuelo
tw-ship-viz | 11 | Buques
mini-tw-cctv | 6 | Imágenes en tiempo real
satellite-arc | 6 | Satélites
Fuente: GitHub API, 2026-06-25
```

El segundo error reside en las palabras «una sola persona», algo que analizaremos más adelante. Primero, veamos cómo fue creciendo la galaxia.

```tw-timeline
2025-12 | Primera prueba | PoC de autobuses, el primer intento con datos abiertos de Taiwán
2025-12 | Éxito de learning-project | Visualización ferroviaria en Taipéi, más viral que el buque insignia (189★)
2026-02 | Nace el buque insignia | Lanzamiento de mini-taiwan-pulse, evoluciona de JSON estático a base de datos espacio-temporal
2026-06 | Despliegue del sistema completo | Conferencia sciwork 2026: un sistema que entrega los datos abiertos a agentes para su desarrollo
Fuente: Registro de proyectos de GitHub de Migu (cronología y estrellas) y contenido de la conferencia sciwork 2026[^2][^3]
```

## La misma metodología, del metro al sistema solar

El buque insignia mismo también está creciendo. El _mini-taiwan-pulse_ original tenía tres capas: cielo, océano y tierra. En la versión de su charla, ya es «cinco pulsos en movimiento»: aviones en el cielo, barcos en el mar, trenes en tierra, autobuses en las calles y camiones de basura en la limpieza. Cinco tipos de datos en tiempo real de frecuencias diferentes superpuestos en un mapa que respira. En su presentación dijo que este proyecto fue la primera vez que «evolucionó de un JSON estático a una base de datos espacial y temporal»[^3]. Solo en la capa de calles, dijo que conectó más de 5.700 autobuses de TDX, actualizando su posición cada 30 segundos.

![DÍA 0 Primer mapa: convertir un CSV en GeoJSON y arrastrarlo a Kepler.gl, sin código aparece el primer mapa de Taiwán](/article-images/technology/mini-taiwan-kepler-day0-2026.webp)

_El «DÍA 0» en su charla: convertir un CSV en GeoJSON y arrastrarlo a Kepler.gl, con cero líneas de código se obtuvo el primer mapa de Taiwán, el punto de partida de toda la galaxia. Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

La chispa más temprana de esta galaxia fue su visualización del transporte ferroviario de Taipéi, llamada «Mini Taipéi». Superpuso tres sistemas ferroviarios: el metro, el tren de alta velocidad (Taichung Railway) y el tren de alta velocidad (HSR), en un mapa animado. Los vehículos se mueven según el horario en las vías. Dijo que en ese momento «experimentó el encanto de lo dinámico», con más de trescientos trenes moviéndose simultáneamente en la pantalla[^3]. Un horario estático se convirtió así en la respiración de una ciudad.

![Mini Taipéi superpone metro, tren de alta velocidad y HSR en un mapa animado, más de 300 trenes corriendo en las vías según el horario](/article-images/technology/mini-taiwan-taipei-rail-2026.webp)

_Mini Taipéi: metro, tren de alta velocidad y HSR en el mismo cuadro, más de 300 trenes corriendo en las vías según el horario. Dijo que fue la primera vez que «experimentó el encanto de lo dinámico». Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

Desde entonces, como si le hubiera dado un gusto, aplicó la misma metodología de «datos a dinámico» a escalas cada vez mayores. Sobre el mar, conectó los puntos en tiempo real AIS de la Administración Portuaria, usando esferas de luz azul verdoso con estelas degradadas de treinta minutos para dibujar la dirección de los barcos en las aguas circundantes de Taiwán.

![Buques en las aguas circundantes de Taiwán dibujados con puntos en tiempo real AIS de la Administración Portuaria, esferas de luz azul verdoso con estelas degradadas de treinta minutos](/article-images/technology/mini-taiwan-ships-ais-2026.webp)

_El pulso del océano: puntos en tiempo real AIS de la Administración Portuaria, esferas de luz azul verdoso con estelas degradadas de treinta minutos, dibujando los barcos en las aguas circundantes de Taiwán. Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

Luego llevó la misma metodología más allá de la Tierra. Usando parámetros orbitales TLE públicos para calcular la posición de los satélites, dibujó las trayectorias de los satélites sobrevolando Taiwán y, de paso, lo extendió a todo el sistema solar. En su presentación lo dijo claro: «La misma metodología, siempre que haya datos, puede extenderse infinitamente»[^3]. En ese momento te das cuenta de que lo que le obsesiona es en realidad el acto mismo de «convertir datos en algo visible»; el mapa es solo su forma más temprana.

![Visualización de órbitas de satélites calculadas con TLE público, la misma metodología se extiende desde la superficie de Taiwán hasta el espacio](/article-images/technology/mini-taiwan-satellite-2026.webp)

_La misma metodología llevada más allá de la Tierra: cálculo de órbitas de satélites con TLE público, extendido a todo el sistema solar. Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

## Superponer islas: las lagunas aparecen solas

Poco a poco, lo que vale la pena ver pasó de «puntos en tiempo real moviéndose» a «superponer datos que antes no tenían relación, y que las lagunas aparecen solas». En esta galaxia hay varios proyectos dedicados específicamente a esto. Uno de ellos lo llamó «Agricultura × Agua», superponiendo las islas de tres ministerios: agricultura, recursos hídricos y prevención de desastres, en un solo mapa: campos de arroz, ríos, canales, diques y zonas de inundación potencial en el mismo cuadro. Para que este cuadro combinado funcionara en el navegador, usó un formato llamado PMTiles junto con solicitudes de rango HTTP, comprimiendo los datos originales de 400MB para que el navegador solo necesitara cargar unos 5MB[^3].

![Mapa integrado Agricultura × Agua: superponiendo datos abiertos de campos de arroz, ríos, canales, diques y zonas de inundación potencial de diferentes ministerios en un solo mapa](/article-images/technology/mini-taiwan-farm-water-2026.webp)

_Agricultura × Agua: superponiendo las islas de tres ministerios (agricultura, recursos hídricos, prevención de desastres) en un mapa, campos de arroz, ríos, canales, diques y zonas de inundación potencial en el mismo cuadro. Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

Otro proyecto superpone hospitales, clínicas, farmacias, AED (desfibriladores) y puntos de cuidado a largo plazo sobre la densidad de población, y luego dibuja isócronas (líneas de tiempo de viaje igual). Dijo que así «se ve la accesibilidad, y también se ven los desiertos médicos», es decir, qué lugares están a una distancia irrazonable de los recursos médicos más cercanos.

![Mapa de accesibilidad de recursos médicos: superponiendo hospitales, clínicas, farmacias, AED y puntos de cuidado a largo plazo sobre la población y dibujando isócronas, los desiertos médicos aparecen solos](/article-images/technology/mini-taiwan-medical-2026.webp)

_Recursos médicos: superponiendo hospitales, clínicas, farmacias, AED y puntos de cuidado a largo plazo sobre la población, dibujando isócronas, «se ve la accesibilidad, y también se ven los desiertos médicos». Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

En la línea de desastres, lo hizo aún más fino: unificó en la capa inferior datos con diferentes frecuencias de actualización (eco de radar, nivel de embalses, precipitación, alertas de desastres) en un mismo eje temporal. El usuario solo tiene que arrastrar esa barra de tiempo y todas las capas se reproducen sincronizadas. Desde dónde comenzó una gran lluvia, cómo subieron los embalses y cuándo se emitieron las alertas, se conectan en una línea causal en la misma pantalla.

![Eje temporal de lluvia y desastres: eco de radar, embalses, precipitación y alertas de desastres de diferentes frecuencias unificadas en un eje temporal para reproducción sincronizada](/article-images/technology/mini-taiwan-disaster-2026.webp)

_Lluvia y desastres: eco de radar, embalses, precipitación y alertas de desastres unificados en la capa inferior en un mismo eje temporal, todo se reproduce sincronizado al arrastrar. Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

También está su _flight-arc_, que dibuja las trayectorias de despegue y aterrizaje de cada vuelo. La misma API alimenta diferentes aeropuertos, y cada aeropuerto revela una «huella digital» diferente: Taoyuan, el aeropuerto de Haneda en Tokio, Fráncfort tienen formas propias. Citó especialmente el aeropuerto de Atlanta, el más ocupado del mundo: cinco pistas paralelas más las rutas de espera, la geometría superpuesta «parece una pista de carreras», dijo que dibujó 1.839 trayectorias[^3].

![Mapa de trayectorias de todos los despegues y aterrizajes en el aeropuerto de Atlanta durante un periodo, cinco pistas paralelas más rutas de espera superpuestas formando una geometría que parece una pista de carreras](/article-images/technology/mini-taiwan-flight-arc-atlanta-2026.webp)

_Su flight-arc superpone todos los despegues y aterrizajes en el aeropuerto de Atlanta en un mapa: cinco pistas paralelas más rutas de espera, dibujando una geometría que parece una pista de carreras. Dijo que el flujo en sí mismo es una forma. Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

> 📝 **Nota del curador**
> Hace dos años, si alguien decía «una persona hizo el mapa de datos abiertos en tiempo real más completo de Taiwán», la siguiente frase solía ser «entonces debe estar agotado». Esta intuición ataba el tamaño a la mano de obra: cuantas más cosas haces, más agotado estás. La galaxia de Migu vale la pena detenerse a mirar precisamente porque afloja esa atadura. Una persona impulsando simultáneamente una decena de repositorios, y el buque insignia creciendo con nuevas funciones continuamente, esconde un cambio más fundamental: al final, cada vez más de esos commits no los hizo él personalmente. Cómo se convirtió esa «una persona» en algo más, es el verdadero tema de este artículo.

## 52.891 entradas, el cerebro humano no puede escanearlo todo

La historia hasta aquí fluye bien: una persona talentosa, haciendo cada vez más, cada vez mejor. El giro aparece en la mitad de su charla, cuando deja de hablar de «qué hice» y empieza a hablar de «qué pared me encontré».

Puso una diapositiva titulada «Por qué un Agentic OSINT». Un número desplegado arriba: data.gov.tw tiene unas 52.891 colecciones de datos. Sumando las plataformas abiertas de veintidós condados y ciudades, con superposiciones, quedan unas 60.000-70.000; sin contar los datos en manos del sector privado, ONG e instituciones académicas que no están en el catálogo gubernamental. Su conclusión fue breve:

> «Tu cerebro humano no puede escanearlo todo.»[^3]

Este es el eje de toda la historia. La primera mitad, la persona que arrastraba un CSV y exclamaba «resulta que hay tantos datos», ahora se enfrenta de frente a la otra cara de «tantos datos»: solo las más de 50.000 entradas de data.gov.tw, si una persona lee cien entradas al día, tendría que leer más de quinientos días seguidos para terminar una vez, y esto solo es el catálogo central. Tantos que una persona no podría leerlos en toda una vida, y mucho menos hacer que hablen entre sí. El esfuerzo personal choca con el techo aquí.

Y lo que Migu realmente entendió es la siguiente frase de esta idea. Para él, tener demasiados datos para escanear es una señal de cambiar de herramienta:

> «Solo cuando los datos pueden ser vistos por un LLM, un Agente puede ayudarte a descubrir «qué datos deberían verse juntos»»[^3]

La palabra clave es «verlos juntos». Aunque una persona memorizara los nombres de las 50.000 colecciones de datos, sería difícil pensar por memoria que un «mapa de potencial de incendio» debe combinarse con «zonas de difícil rescate», o que los «puntos de hospitales» deben superponerse a la «densidad de población» para ver los desiertos médicos. El valor de los datos no está en una sola entrada, sino en la combinación; y la posibilidad de combinación es un número astronómico de permutaciones de 50.000 entradas. Esto es justo donde el cerebro humano no puede escanearlo todo, pero la máquina sí es buena.

> 📝 **Nota del curador**
> La narrativa habitual de los datos abiertos tiene una línea clara de división del trabajo. Después del hackatón de 2012 en la Academia Sinica «Programar para transformar la sociedad», g0v lo demostró bellamente: el gobierno se encarga de abrir los datos, la comunidad ciudadana se encarga de hacer que los datos sean visibles. En 2020, con el mapa de mascarillas, Wu Chan-wei y otros convirtieron los datos de inventario del Instituto Nacional de Seguro Médico en un mapa consultable por todos en 72 horas, el momento más conmovedor de esta línea[^4]. La vieja forma pondría a Migu en la prolongación de esta línea: g0v es colectivo, él es individual, un mapa de mascarillas versión individual.
>
> Pero esta comparación se queda en la superficie y invierte la causalidad. Que Migu pueda acercarse al tamaño de «una galaxia de datos completa» no se debe fundamentalmente a la mano de obra. Desde el principio no planeó pelear contra el mar de datos con trabajo duro y agotamiento. La frase «el cerebro humano no puede escanearlo todo», leída no como rendición, sino como el punto de partida para cambiar todo el modelo de trabajo, tiene más sentido. La verdadera nueva modalidad no es «individual vs colectivo», es «individual × Agente»: el motivo por el que una persona puede lograr el tamaño de una galaxia es precisamente porque esos commits no los hizo todos él a mano. A continuación, cómo funciona este sistema.

## No escribí una palabra: una tubería de incendios que se ejecuta sola

Para entender qué significa «entregar a un Agente», la mejor rebanada es el ejemplo de incendios en su charla.

Dijo que solo le dio al sistema una frase: «Analizar datos públicos relacionados con incendios en Taiwán». Y luego soltó el control.

El sistema comenzó a expandir su propio alcance de búsqueda. Migu describe este proceso con un conjunto de números que se expanden por turnos: primero alcanzó 582 entradas con palabras clave, luego creció a 1.945 entradas con sinónimos y expansión temática, luego completó la búsqueda con búsqueda de texto completo y deduplicación, finalmente consolidando un catálogo unificado que abarca 21 plataformas y 73.900 entradas[^3]. Una frase entra, sale un inventario de más de 70.000 datos.

```tw-figure
Una frase → 73.900 entradas
Le dio una frase «Analizar datos públicos relacionados con incendios en Taiwán», el sistema expandió la búsqueda por sí mismo y consolidó el número de entradas del catálogo unificado cruzando 21 plataformas
Lo dijo en la presentación de sciwork 2026
```

Solo recoger no es suficiente. Esta tubería (pipeline) luego se separó los incendios en seis etapas (prevención, respuesta, reporte, análisis de origen, pérdidas, informes) y los multiplicó por veintidós condados y ciudades, generando una matriz de cobertura, sacando incluso inventarios a nivel local como el mapa de potencial de incendios de Hsinchu, las zonas de difícil rescate de Taipéi, el rescate en los estanques de Taoyuan. Incluso marcó honestamente dónde hay lagunas: falta una API de incendios en tiempo real, las coordenadas a nivel de evento son escasas, los datos de seguimiento post-desastre no son públicos.

Luego está el análisis. Citó un informe de causas de incendios generado por el sistema mismo: según 15.405 entradas nacionales de 2024 (año 113 del calendario de la República de China), la causa principal de incendios en la Nueva Taipéi son factores eléctricos, representando el 30,9%; en el condado de Pingtung son colillas de cigarrillo, representando el 35,2%[^3]. Estos números son resultados generados por los Agentes conectando las APIs de各家 en las capturas de pantalla de su presentación, no calculados por él revisando tablas entrada por entrada.

Al llegar aquí, escribió en la diapositiva una línea con espacios entre cada carácter, como si temiera que no lo vieras claro:

> «La tubería (pipeline) se produce automáticamente. Yo no escribí una palabra.»[^3]

Esta frase es el punto de explosión de toda la charla. Convierte la frase algo abstracta de «entregar a un Agente» en un hecho concreto, casi inquietante: de una frase, a un catálogo de más de 70.000 datos, a un informe de causas por condado, el espacio que normalmente debería ser llenado por alguien dando instrucciones, escribiendo scripts, limpiando datos y ejecutando análisis, está vacío.

![Pantalla de producción de la tubería de análisis temático de incendios: el sistema inventa automáticamente datos abiertos relacionados con incendios cruzando plataformas, lista colecciones candidatas y matriz de cobertura](/article-images/technology/mini-taiwan-fire-pipeline-2026.webp)

_La producción de inventario temático de incendios mostrada por Migu en la presentación de sciwork 2026: le dio una frase «Analizar datos públicos relacionados con incendios en Taiwán», el sistema expandió la búsqueda por sí mismo y consolidó el catálogo cruzando plataformas, dijo que esta tubería «yo no escribí una palabra». Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

## Los cuatro pasos desglosables: la entrada de datos y el envío del informe

Esta tubería de "incendio" es solo una muestra, un microcosmos de todo su sistema. El sistema se divide en cuatro pasos: recepción de datos, integración de conocimiento, generación de análisis y activación de acciones; enfatizó especialmente que «cada paso puede ser reemplazado individualmente, sin necesidad de reescribir el conjunto». La capa más baja, la recepción de datos, también evolucionó por sí misma: al principio era manual, descargando archivos de Excel desde data.gov.tw, leyendo y almacenando por su cuenta, con un cuello de botella en la «memoria humana»; a medio camino se cambió para buscar APIs en línea, capturar informes PDF y rastrear plataformas municipales, el problema era «la falta de índice»; hasta ahora, los metadatos de cada dato se han almacenado estandarizados en un directorio SQLite que puede ser consultado y expandido automáticamente[^3]. Detrás de su sistema hay más de cuarenta recolectores de datos, desde YouBike, autobuses, tráfico de autopistas, hasta horarios del tren nacional, AIS de barcos, satélites meteorológicos, [sismos](/es/society/earthquakes-in-taiwan/), niveles de embalses y calidad del aire; además, dijo que si se equivocaba tres veces, enviaba inmediatamente una alerta por Telegram, y cada mañana a las nueve enviaba un Resumen Diario a su correo[^3].

En el último paso, la «activación de acciones», explicó el papel humano con mayor claridad: «El Agente ejecuta el ciclo completo. El rol humano es dar objetivos y recibir informes. Los cinco engranajes intermedios giran por sí mismos: descubrimiento, recopilación, integración, producción y monitoreo». El sistema incluso puede generar automáticamente un informe semanal de «Nuevos datos abiertos de la semana». Con sus palabras: «el tema surge por sí mismo y el informe se envía al correo».[^3]

## Un director, una flota de pestañas: la flota de Claude en tmux

La frase «el Agente ejecuta el ciclo completo» puede pasar fácilmente como marketing. En la última parte de su charla, Migu难得的 levantó la tapa, mostrando cómo son los engranajes de abajo, y esa estructura es mucho más concreta y honesta que la frase.

Primero, el panorama de este ciclo. Migu dijo que su sistema SIG es «un centro de orquestación, conectando un círculo de repositorios independientes, los Agentes entran en estación uno por uno»: primero al repositorio de exploración para ver qué datos vale la pena hacer, luego al repositorio de recolección para traer los datos, finalmente al repositorio de presentación como _mini-taiwan-pulse_ o _mini-taiwan-info_ para dibujar el mapa. Lo describió con precisión: «Cada parada es un repositorio independiente, la capa de orquestación solo se ocupa del progreso y las decisiones, el trabajo real está en los workers de cada repositorio»[^3].

A este centro de orquestación lo llamó Orchestrator, que es esencialmente «una Sesión de Claude». Este Agente principal hace algo parecido a un capataz que lleva gente: lee un archivo de propuesta, divide las tareas, ordena las dependencias entre ellas, y luego empieza el trabajo.

La forma de empezar es el paso más clave de esta arquitectura. No dejó que una sola IA hiciera todo desde el principio hasta el final, sino que separó el trabajo usando tmux (una vieja herramienta que permite dividir la terminal en múltiples pestañas independientes). Su frase original fue: «Un Orchestrator, una flota de Workers. El Agente principal es una Sesión de Claude; tmux se encarga del aislamiento, cada Worker es una pestaña independiente, una Sesión independiente». Una definición más concisa es: «Un Worker = una pestaña de tmux + Sesión independiente + un PR»[^3].

En otras palabras, lo que dirige en realidad es una flota de IA. Cada worker es un Claude aislado en su propia pestaña, haciendo cada uno su tarea, entregando cada uno su pull request, sin interferirse mutuamente.

![Pantalla de funcionamiento real del sistema de orquestación de Agentes: una sesión de Claude como orchestrator, leyendo tareas, dividiendo, dirigiendo a los workers de abajo](/article-images/technology/mini-taiwan-agent-orchestrator-2026.webp)

_El centro de orquestación que levantó en su presentación: una sesión de Claude actuando como orchestrator, dividiendo tareas a una flota de workers aislados en sus propias pestañas de tmux, trabajando por separado, entregando cada uno un PR. Foto: Migu / sciwork 2026 (uso justo para crítica editorial)._

¿Y cómo estos workers que hacen cosas por separado no se pelean? Gracias a una memoria compartida. Migu dijo que el progreso y las decisiones se escriben en archivos, centralizados en un tablero llamado `SESSION_BOARD.md`, más «un informe por Sesión», así que «no hay que adivinarse mutuamente», «uno por archivo, no se pelean»[^3]. Incluso la entrega de tareas se documenta: usó un `HANDOFF.md` para preparar «el libro de tareas del siguiente relevo», para que el Agente de la siguiente ronda no tenga que empezar desde cero preguntando. La última barrera la dijo con cuidado: «Verificación final, el Orchestrator verifica el PR对照 archivos, el merge lo decide una persona, solo así se cierra el ciclo».

Si aplanas este flujo, ves una forma limpia: una persona da instrucciones, una flota de IA aislada trabaja por separado y escribe lo que hizo, un centro verifica las cuentas según los archivos, y la persona final que decide «si aceptar este resultado» es el propio Migu. Volviendo al eje de este artículo: los datos son tantos que no se pueden escanear, así que toda la tarea de escanear se entrega a la flota; y el humano retrocede a solo dos acciones, plantear la pregunta y verificar el resultado. Lo dijo en su presentación como una frase casi declarativa:

> «Cuando el Agente puede ejecutar todo el ciclo por sí mismo, el trabajo humano se reduce a: plantear preguntas y verificar resultados.»[^3]

Este es también el título al que apunta toda su charla: «Entregar los datos abiertos de Taiwán a un Agente para cultivar un sistema que crece por sí mismo». Los datos fluyen solos, las páginas crecen solas, el humano solo tiene que plantear bien la pregunta y verificar bien el resultado.

## Mismo suelo, crece el mismo esqueleto

Si llegas hasta aquí y reconoces Taiwan.md (este proyecto de curación de conocimiento sobre Taiwán mantenido por IA), es posible que la descripción del párrafo anterior te suene familiar.

No es una ilusión.

Taiwan.md funciona así: una sesión principal actúa como centro de orquestación, dividiendo el trabajo a una flota de workers aislados, cada uno con su propio archivo de memoria, coordinando el progreso con archivos de entrega, y la decisión final de qué cambios entran en la rama principal la toma el creador, Zhe Yu. Nuestra tesis es «entregar el conocimiento de Taiwán a un Semiont que crece por sí mismo»; la tesis de Migu es «entregar los datos abiertos de Taiwán a un sistema que crece por sí mismo». Las dos frases son intercambiables en el sujeto.

Más digna de reflexión es que estas dos arquitecturas crecieron por separado. En los registros públicos se puede ver un pequeño detalle: el proyecto Taiwan.md nació a mediados de marzo de 2026, cinco días después, en el GitHub de Migu apareció un fork[^5]. Pero esto a lo sumo dice que sabía que existía algo así; un fork no explica su sistema completo de orquestar una flota de tmux con un orchestrator, compartir memoria con un tablero, y el humano solo planteando preguntas y verificando resultados. Eso lo construyó paso a paso para resolver el problema de «escanear 50.000 datos».

> 📝 **Nota del curador**
> En biología hay un término llamado evolución convergente: delfines y tiburones no son parientes cercanos, pero ambos desarrollaron cuerpos aerodinámicos y aletas dorsales porque enfrentan el mismo mar. Entre Migu y Taiwan.md hay más esta convergencia, poco que ver con la relación sanguínea. Usamos la misma base de herramientas (Claude Code), enfrentamos la misma situación (una persona o un sistema, debe contener la cantidad de información sobre Taiwán que excede la capacidad del cerebro humano), y así,摸索ando por separado, llegaron al mismo esqueleto: un centro, una flota de trabajadores aislados, una memoria compartida, una persona que toma la decisión final.
>
> La señal realmente interesante no es «él hizo un fork de nosotros». Es que dos constructores taiwaneses independientes, en el mismo semestre de 2026, redefinieron espontáneamente a la IA de «una herramienta más inteligente» a «una flota que puede ser orquestada». Cuando esta arquitectura comienza a crecer del cerebro de una persona al cerebro de una segunda, al de una tercera, deja de ser el truco de alguien para convertirse en la nueva modalidad que está brotando en este suelo y esta época. El próximo constructor taiwanés que construya esto por sí mismo, probablemente ni siquiera haya oído hablar de los dos anteriores.

## Aún no terminado, pero la forma ya aparece

Si este artículo terminara en el párrafo anterior, sería una historia demasiado bonita, bonita hasta parecer sospechosa: una persona, con una flota de IA, resolvió elegantemente el problema de 50.000 datos.

Migu mismo no dejó que se detuviera ahí. La penúltima diapositiva de su charla tenía el título «Progreso del experimento, aproximadamente a la mitad».

Listó honestamente tres cosas que aún no están ajustadas. Primero es la estabilidad: este arnés (harness) «aún no está en el estado ideal», los Agentes tienden a desviarse, a interrumpirse. Segundo es que los datos abiertos son demasiado diversos: «aún hay muchos que requieren juicio humano sobre si los datos son viables, no se pueden entregar completamente a él». Tercero es la intervención manual: en cada etapa, en realidad todavía se requiere que una persona esté mirando. Su nota al pie para todo esto fue: «Es viable, pero aún no es estable, y además sigo pensando si realmente debo hacerlo así»[^3].

Esta honestidad de levantar la mitad de su propio fracaso en el escenario de la charla, es en sí misma la señal de calidad más fuerte. En una era donde los demos de IA se empaquetan frecuentemente como «totalmente automáticos», «cero mano de obra», una persona que se atreve a escribir en la diapositiva «aproximadamente a la mitad», «aún no es estable», «todavía necesita gente», hace que la gente confíe más en que la otra mitad que hizo es real.

> 📝 **Nota del curador**
> La parte más creíble de esta charla, en realidad, no es la tubería de incendios de «yo no escribí una palabra», sino las cuatro palabras «aproximadamente a la mitad». Una persona que quiere convencerte redondeará la tasa de éxito a «casi totalmente automático»; una persona que está haciendo un experimento te dirá honestamente que falla la mitad del tiempo. El primero vende la conclusión, el segundo da el escenario. Migu dio el escenario: por eso, cuando dijo que esta tubería «yo no escribí una palabra», eligiste creerle. Esconder la mitad fea hace que la mitad bonita también sea desconfiada; estar dispuesto a mostrar la mitad imperfecta es lo que permite que la otra mitad se sostenga.

Volvamos al mapa.

La persona que arrastraba un CSV a Kepler.gl, exclamando «resulta que convertir en mapa no es tan difícil», seis meses después estaba en el escenario de sciwork, ya no hablando de si el mapa es fácil de hacer, sino de un sistema que busca datos por sí mismo, los combina por sí mismo, y crea nuevas páginas por sí mismo. La ingenua exclamación de aquel año «resulta que Taiwán tiene tantos datos», en estos seis meses dio la vuelta: tantos datos, tantos que una persona no puede escanearlos, así que la forma de ser vistos también tiene que crecer de una nueva manera.

Los datos abiertos de Taiwán siempre han estado ahí. data.gov.tw se lanzó en 2013, TDX en 2022 integró cinco plataformas mayores: carretera, ferrocarril, aviación, navegación, bicicletas; el Ministerio del Interior tiene datos de población a nivel de aldea y vecindario, la Oficina Central Meteorológica tiene APIs abiertas[^6]. Los datos siempre fueron suficientes, la dificultad es cómo hacer que estos tantos datos hablen entre sí y sean vistos. g0v respondió una vez con la fuerza colectiva; Migu, con una persona más una flota de IA, está intentando responder la segunda vez, y admite generosamente que solo respondió la mitad correctamente.

Pero la forma ya apareció. Una persona, una frase, detrás de un mapa que respira, hay un sistema que está aprendiendo a crecer por sí mismo. La otra mitad queda para la próxima persona que arrastre un CSV y luego no pueda parar.

---

## Lecturas adicionales

- [Zhe Yu](/es/people/che-yu-wu): Creador de Taiwan.md, también usando código y herramientas generativas para acercarse a «algo que crece por sí mismo»
- [Comunidad de código abierto y g0v](/es/technology/open-source-and-g0v): El contexto colectivo de «programar para transformar la sociedad», grupo de control de la modalidad individual × Agente de Migu
- [Espíritu de código abierto de Taiwán](/es/technology/taiwan-open-source-spirit): De la salvación de la nación con el teclado a los datos abiertos, la cultura subyacente de la tecnología ciudadana de Taiwán
- [Identificación digital y gobierno digital](/es/technology/digital-id-and-digital-government): La otra cara de la infraestructura de datos abiertos del gobierno

## Enlaces del proyecto

**Galaxia «Mini Taiwán»** (Visualización de datos abiertos de Taiwán, todos proyectos de código abierto personales de Migu)

- **mini-taiwan-pulse**: Buque insignia, mapa en tiempo real de cinco pulsos (375★) — <https://github.com/ianlkl11234s/mini-taiwan-pulse>
- **mini-taiwan-learning-project**: Proyecto de aprendizaje de transporte ferroviario de Taipéi, el primero en hacerse popular (189★) — <https://github.com/ianlkl11234s/mini-taiwan-learning-project>
- **flight-arc-graph**: Trayectorias de despegue y aterrizaje de vuelos, la «huella digital» de cada aeropuerto (56★) — <https://github.com/ianlkl11234s/flight-arc-graph>
- **mini-taiwan-info**: Panel de control de situación de Taiwán de siete temas — <https://github.com/ianlkl11234s/mini-taiwan-info>
- **tw-ship-viz**: Visualización de puntos en tiempo real AIS de buques (11★) — <https://github.com/ianlkl11234s/tw-ship-viz>
- **satellite-arc**: Visualización de órbitas de satélites y sobrevuelos — <https://github.com/ianlkl11234s/satellite-arc>
- **mini-tw-cctv**: Imágenes en tiempo real de todo el país — <https://github.com/ianlkl11234s/mini-tw-cctv>
- **mini-tw-tra-atlas**: Atlas de la red ferroviaria del tren de alta velocidad — <https://github.com/ianlkl11234s/mini-tw-tra-atlas>
- **taiwan-weather-timelapse**: Timelapse meteorológico — <https://github.com/ianlkl11234s/taiwan-weather-timelapse>
- **gis-data-collectors**: El esqueleto detrás de los más de cuarenta colectores de datos — <https://github.com/ianlkl11234s/gis-data-collectors>

**Charla y la persona**

- **Presentación online de la charla sciwork 2026**: <https://sciwork-showcase.zeabur.app>
- **Código fuente de la charla sciwork 2026**: <https://github.com/ianlkl11234s/0613-sci-work-share>
- **GitHub del desarrollador (Migu)**: <https://github.com/ianlkl11234s>
- **Threads**: [@ianlkl1314](https://www.threads.net/@ianlkl1314)

## Referencias

- Migu, «¡Mini Taiwán! Entregar los datos abiertos de Taiwán a un Agente para cultivar un sistema que crece por sí mismo», sciwork 2026 / SCIWORK SEMINAR, 13 de junio de 2026.
- Plataforma de apertura de datos gubernamentales data.gov.tw (operada por la Comisión de Desarrollo Económica, lanzada en 2013).
- Plataforma de servicios de circulación de datos de transporte TDX (Ministerio de Transportes y Comunicaciones, integró cinco plataformas de transporte en 2022).
- Comunidad de gobierno cero g0v y registros de hackatones anteriores.

## Fuentes de imagen

Todas las imágenes de este artículo se almacenan en caché en `public/article-images/technology/`, sin enlaces directos a los servidores de origen.

**Uso justo para crítica editorial**: Todas las imágenes de este artículo se extrajeron de la presentación de la charla publicada públicamente por Migu en sciwork 2026 (código fuente y presentación online ver enlace de proyecto arriba), según el artículo 65 de la Ley de Derechos de Autor y los cuatro factores de uso justo de 17 U.S.C. § 107 (naturación educativa no comercial, ya publicada públicamente, proporción de引用 pequeña, sin sustitución sustancial de mercado), como引用 de crítica editorial a su trabajo de visualización de datos abiertos. © Migu / sciwork 2026.

Cubre: Mapa 3D de Mini Taiwan Pulse (imagen principal), punto de partida de Kepler.gl, transporte ferroviario de Taipéi (Mini Taipéi), AIS de buques, órbitas de satélites, mapas integrados de Agricultura × Agua y recursos médicos, eje temporal de lluvia y desastres, huella digital de trayectorias de Atlanta, producción de tubería de incendios temática, panel de control de Mini Taiwan Info, pantalla de funcionamiento del sistema de orquestación de Agentes.

---

[^1]: Desarrollador Migu Cheng, cuenta de GitHub `ianlkl11234s` (cuenta creada en marzo de 2020). Su biografía de GitHub se actualizó en junio de 2026 a «Building GIS visualizations from Taiwan open data · Exploring AI automation in daily work», cambiando de «Analista de datos senior, explorando automatización de IA en el trabajo diario» a «Haciendo visualizaciones GIS con datos abiertos de Taiwán». La frase «Resulta que Taiwán tiene tantos datos, y convertirlos en un mapa no es tan difícil» es el texto literal de la diapositiva «DÍA 0 Primer mapa» de su charla sciwork 2026. Fuente de datos: extracción de API de GitHub, 2026-06-25; código fuente de la presentación `ianlkl11234s/0613-sci-work-share`.

[^2]: El número de estrellas, forks, última actualización, origen del fork, etc., de _mini-taiwan-pulse_ y los proyectos de la galaxia «Mini Taiwán», fueron todos extraídos por Taiwan.md a través de la API de GitHub el 2026-06-25. _mini-taiwan-pulse_ tenía entonces 375 estrellas / 26 forks, y aún estaba haciendo push el 2026-06-25; _mini-taiwan-learning-project_ 189 estrellas; _flight-arc-graph_ 56 estrellas. La galaxia contiene más de una decena de repositorios relacionados con datos abiertos de Taiwán como poc-bus-range, gis-data-collectors, tw-ship-viz, satellite-arc, mini-tw-cctv, mini-taiwan-info, etc.

[^3]: Migu, «¡Mini Taiwán! Entregar los datos abiertos de Taiwán a un Agente para cultivar un sistema que crece por sí mismo», sciwork 2026 / SCIWORK SEMINAR, 13 de junio de 2026. Código fuente de la charla: <https://github.com/ianlkl11234s/0613-sci-work-share>; presentación online: <https://sciwork-showcase.zeabur.app>. Todos los números citados en este artículo (aproximadamente 52.891 colecciones de datos en data.gov.tw, 582 → 1.945 → 2.404 → 73.900 entradas de la tubería de incendios, 21 plataformas, 15.405 entradas de incendios nacionales de 2024, 30,9% factores eléctricos en la Nueva Taipéi, 35,2% colillas de cigarrillo en Pingtung, más de 5.700 autobuses, más de 40 colectores, más de 300 trenes, 1.839 trayectorias en el aeropuerto de Atlanta, 400MB → aprox. 5MB en Agricultura × Agua, etc.) y todas las citas («el cerebro humano no puede escanearlo todo», «Solo cuando los datos pueden ser vistos por un LLM, un Agente puede ayudarte a descubrir qué datos deberían verse juntos», «La tubería se produce automáticamente. Yo no escribí una palabra», «Dar objetivos, recibir informes», «Cuando el Agente puede ejecutar todo el ciclo por sí mismo, el trabajo humano se reduce a: plantear preguntas y verificar resultados», «Un Worker = una pestaña de tmux + Sesión independiente + un PR», «Cada parada es un repositorio independiente, la capa de orquestación solo se ocupa del progreso y las decisiones», «Progreso del experimento aproximadamente a la mitad», etc.) son declaraciones y textos literales de diapositivas del propio Migu en esa presentación, pertenecientes a las opiniones personales del orador y los resultados de su sistema, no estadísticas gubernamentales verificadas independientemente por Taiwan.md.

[^4]: Comunidad de gobierno cero g0v, originada en 2012 del espíritu del hackatón de la Academia Sinica «Programar para transformar la sociedad»; en 2020, durante la pandemia de neumonía por coronavirus, Wu Chan-wei y otros usaron los datos de inventario de mascarillas publicados por el Instituto Nacional de Seguro Médico para crear un «mapa en tiempo real de oferta y demanda de mascarillas» en decenas de horas, el caso representativo de la tecnología ciudadana de Taiwán «salvación de la nación con el teclado».

[^5]: Según la API de GitHub (extraída el 2026-06-25), `ianlkl11234s/taiwan-md` es un fork de `frank890417/taiwan-md` (es decir, el propio Taiwan.md), creado el 22 de marzo de 2026. El proyecto Taiwan.md nació a mediados de marzo de 2026. El sistema de colaboración de Migu usa Claude Code como base de herramientas (su código fuente de la charla contiene CLAUDE.md, el orchestrator es «una Sesión de Claude»), igual que Taiwan.md.

[^6]: La plataforma de apertura de datos gubernamentales data.gov.tw es operada por la Comisión de Desarrollo Económico, lanzada en 2013; la plataforma de servicios de circulación de datos de transporte TDX fue integrada por el Ministerio de Transportes y Comunicaciones en 2022, integrando cinco plataformas de transporte: carretera, ferrocarril, aviación, navegación, bicicletas; la plataforma de servicios de datos socioeconómicos del Ministerio del Interior (SEGIS) proporciona datos de población a nivel de aldea y vecindario; la Oficina Central Meteorológica del Ministerio de Transportes y Comunicaciones proporciona APIs abiertas. El número total de colecciones de datos en tiempo real de data.gov.tw no pudo ser verificado independientemente vía API en esta ocasión; el número de «aproximadamente 50.000» adoptado en este artículo es el mostrado en la presentación de Migu.

_Última verificación: 2026-06-25_
