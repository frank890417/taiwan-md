---
title: 'Mini Taiwan Pulse: Cómo un analista de datos convirtió el pulso del transporte de Taiwán en pistas de luz 3D que respiran'
description: 'El 24 de febrero de 2026, un analista de datos llamado Migu Cheng abrió el repositorio mini-taiwan-pulse. Seis semanas después, 193 commits y 241 estrellas: una persona conectó datos abiertos de FlightRadar24, TDX, SEGIS y CWA, y usó Three.js para dibujar Taiwán como pistas de luz 3D que respiran. La infraestructura de datos abiertos de Taiwán está entre las mejores de Asia, pero pocos pueden ver ese océano de datos. La tecnología cívica se extiende desde los hackatones colectivos de g0v hasta proyectos personales de fin de semana, y la visualización en sí misma es una forma de participación.'
date: 2026-04-19
category: Technology
subcategory: '公民科技'
tags: [Technology, 公民科技, 開放資料, 資料視覺化, 開源專案, TDX, Three.js]
readingTime: 12
lastVerified: 2026-04-19
lastHumanReview: true
featured: false
translatedFrom: Technology/mini-taiwan-pulse.md
sourceCommitSha: 55515887
sourceContentHash: sha256:67b51d615cc671f3
translatedAt: 2026-05-01T20:54:23+08:00
---

# Mini Taiwan Pulse: Cómo un analista de datos convirtió el pulso del transporte de Taiwán en pistas de luz 3D que respiran

> **Resumen en 30 segundos:** El 24 de febrero de 2026, un desarrollador cuyo perfil de GitHub se llama `ianlkl11234s` y cuya bio dice "Senior Data Analyst, Exploring AI automation in daily work" —Migu Cheng[^1]— abrió un repositorio llamado mini-taiwan-pulse. Seis semanas después, el repositorio acumuló 193 commits y 241 estrellas[^2], integrando datos abiertos de vuelos de FlightRadar24, posiciones AIS de embarcaciones, horarios ferroviarios de TDX, demografía de aldeas de SEGIS y cuadrículas meteorológicas de CWA, todo unido mediante esferas luminosas, estelas de luz y columnas 3D de Three.js en 23 capas conmutables de forma independiente. No es un proyecto gubernamental, ni producto de una subvención, ni un prototipo de hackatón de fin de semana: es el tiempo libre de una persona convirtiendo el océano de datos de Taiwán en un paisaje visible.

## Un repositorio de una persona, el pulso de una isla

En el historial de commits de GitHub del 24 de febrero de 2026, el primer commit de `ianlkl11234s/mini-taiwan-pulse` llegó. El inicio del README dice:

> Con datos abiertos, siente el pulso de Taiwán. Los vuelos en el cielo trazan arcos, las embarcaciones navegan de ida y vuelta sobre el mar, los trenes corren puntuales sobre las vías — esta isla respira en cada instante.[^3]

Hasta el último push del 9 de abril, el repositorio acumuló 193 commits, 241 estrellas y 12 forks[^2]. El autor, Migu Cheng, solo dejó una línea en su perfil: "Senior Data Analyst. Exploring AI automation in daily work." Sin empresa, sin blog, sin Twitter[^1].

Lo que hace este repositorio no es sencillo. Conecta todas las siguientes fuentes de datos en un mismo mapa 3D:

| Capa de datos                             | Fuente                                                                         | Escala                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Posición de vuelos en tiempo real         | API de FlightRadar24[^4]                                                       | 14 aeropuertos en Taiwán, más de 1.500 vuelos                 |
| Posicionamiento AIS de embarcaciones      | Sistema internacional AIS de identificación automática                         | Aguas circundantes a Taiwán, estela con retardo de 30 minutos |
| Horarios ferroviarios                     | Horarios públicos + OSM Overpass[^5]                                           | TRA/THSR/metro de cuatro áreas metropolitanas, 333 trenes     |
| Estaciones de transporte público          | TDX Servicio de circulación de datos de transporte[^6]                         | Autobuses, autocares, YouBike, ciclovías                      |
| Estadísticas de población por aldea       | SEGIS del Ministerio del Interior[^7]                                          | 7.748 aldeas, hexágonos H3 res7+res8                          |
| Cuadrículas meteorológicas                | Datos abiertos de la Administración Central de Meteorología[^8]                | Resolución 0,03°, malla 120×67                                |
| Alertas de desastres                      | Feed CAP de NCDR[^9]                                                           | Tifones, terremotos, inundaciones                             |
| Marcadores geográficos de noticias        | RSS de la Agencia Central de Noticias + geocodificación con API de Gemini[^10] | Noticias principales/secundarias diarias                      |
| Límites de aeropuertos/puertos/estaciones | API Overpass de OSM[^5]                                                        | 14 aeropuertos, 535 estaciones                                |

Luego utiliza Three.js r172 sobre un mapa base de Mapbox GL JS v3, superponiendo seis `CustomLayer` independientes: los aviones son esferas luminosas multicapa con estelas de degradado en forma de cometa; las embarcaciones usan `InstancedMesh` para renderizado por lotes, con una estela de 30 minutos como degradado de color por vértice; 265 rutas OD de TRA y 333 trenes clasificados por tipo en 6 colores; cada uno de los 36 faros tiene un haz cónico 3D giratorio[^3].

Estas pistas de luz se superponen con mezcla aditiva (additive blending): las zonas donde múltiples rutas se cruzan se iluminan naturalmente, y la intensidad del tráfico no necesita gráficos estadísticos — basta con mirar la luz.

## El océano de datos de Taiwán, por qué pocos pueden verlo

La infraestructura de datos abiertos de Taiwán está entre las mejores de Asia. La Plataforma de Datos Abiertos del Gobierno (data.gov.tw) se lanzó en 2013 y acumula más de cien mil conjuntos de datos[^11]; el servicio TDX del Ministerio de Transporte integró en 2022 cinco plataformas (carreteras, ferrocarril, aviación, navegación y ciclismo) en una única puerta de entrada con API de datos estáticos y dinámicos de transporte a escala nacional[^6]; el SEGIS del Ministerio del Interior ofrece capas espaciales de estadísticas demográficas a nivel de aldea[^7]; la Administración Central de Meteorología, el Centro Nacional de Ciencia y Tecnología para la Reducción de Desastres, la Administración de Energía del Ministerio de Economía y el Sistema de Información en Tiempo Real de Embarcaciones en Aguas de Taiwán operan sus propias API[^8][^9].

Los datos existen. El problema es que **están dispersos en distintas plataformas, con formatos de API diferentes, granularidades espaciales distintas y frecuencias temporales diversas**. Alguien que quiera ver "cómo está Taiwán ahora mismo" tiene que escribir sus propios scrapers, procesar OData, procesar CAP XML, procesar GeoJSON, procesar hexágonos H3, y solo entonces puede empezar con la "visualización".

> **📝 Nota del curador**
> El movimiento de datos abiertos tiene dos indicadores que se confunden fácilmente: **cuántos datos hay** (cuántas API abrió el gobierno) y **cuántos datos se ven** (cuántas visualizaciones, aplicaciones y historias existen). Taiwán es un alumno ejemplar en el primer indicador, pero en el segundo ha dependido durante mucho tiempo del esfuerzo disperso de la comunidad g0v y de algunos medios de noticias comerciales. Esta brecha es la posición más significativa de Mini Taiwan Pulse: no llena un vacío de datos, sino de visibilidad.

En 2012, g0v (Gobierno Cero) surgió en un hackatón en la Academia Sinica, con el lema "escribir programas para transformar la sociedad". Desde el primer hackatón que visualizó el presupuesto general del gobierno, hasta que en 2020 Wu Zhanwei conectó en 72 horas las existencias de mascarillas en más de 6.000 farmacias del seguro nacional de salud, generando la reputación internacional de Taiwán como "salvar la nación con el teclado"[^12], g0v acumuló más de 59 hackatones, más de 7.200 participantes y más de 950 proyectos propuestos[^13].

Pero la narrativa de g0v es colectiva: es una comunidad, una cultura de sábados por la mañana donde la gente llega con sus portátiles. Mini Taiwan Pulse muestra otra forma de tecnología cívica: **un fin de semana de una persona, un git log de una persona**. Migu Cheng puso su enlace de GitHub al final del README, sin presentación de equipo, sin Discord, sin patrocinadores. Entre los 193 commits hay refactorizaciones, correcciones de rendimiento y registros del evento de saturación de E/S del 9 de abril de 2026[^14]; el historial de commits de este repositorio se lee como un diario de ingeniería.

## Tres capas de pulso: cielo, mar y tierra

Mini Taiwan Pulse divide los objetos en movimiento en tres capas:

### Cielo: estelas de luz de vuelos

14 aeropuertos de Taiwán, aproximadamente 1.500 aviones simultáneos. Cada avión es una esfera luminosa multicapa, con una animación de respiración tipo luz anticolisión roja. La estela de degradado en forma de cometa detrás del avión sigue una paleta de colores por altitud en tema oscuro (naranja cálido a azul frío) y colores aleatorios en tema claro[^3]. Los datos provienen de la API pública de FlightRadar24, una red global de seguimiento de vuelos compuesta por receptores ADS-B[^4], con una densidad de cobertura muy alta en el espacio aéreo circundante a Taiwán.

### Mar: estelas de embarcaciones

Las embarcaciones utilizan datos AIS (Automatic Identification System), un sistema de transmisión de posición en tiempo real obligatorio de la Organización Marítima Internacional para grandes buques comerciales. Mini Taiwan Pulse marca las posiciones con esferas luminosas InstancedMesh en azul verdoso, con una estela de 30 minutos; el sistema filtra automáticamente saltos GPS anómalos y MMSI inválidos para asegurar que los puntos de luz sean embarcaciones reales[^3].

### Tierra: seis sistemas ferroviarios

Esta es probablemente la parte más compleja de todo el proyecto. TRA, THSR, Metro de Taipéi, Metro de Kaohsiung, Tren Ligero de Kaohsiung y Metro de Taichung: seis sistemas ferroviarios operando simultáneamente, cada tren como una esfera luminosa coloreada según su tipo, con TRA y THSR mostrando además una estela de 3 minutos de retardo.

El procesamiento de TRA es especialmente complejo: emparejamiento de rutas OD (origen-destino), inferencia de "golden track", rutas divergentes como el triángulo de Changhua requieren un motor dedicado, y el README lo denomina directamente "motor específico para TRA"[^3]. Esto no es simplemente dibujar horarios sobre un mapa, sino inferir la posición real de los trenes en las vías a partir de datos textuales de horarios.

> **📝 Nota del curador**
> Las "rutas triangulares" de TRA (como las de Changhua, Taichung y Nangang) son un detalle que solo los entusiastas del ferrocarril notarían: los trenes pueden entrar y salir desde múltiples direcciones, no son simples rutas A→B. La mayoría de las visualizaciones ferroviarias simplifican estos tramos; Mini Taiwan Pulse escribió un motor dedicado para manejarlos. Esta es una señal de "profundidad curatorial": el autor no solo conecta datos, sino que respeta la complejidad original de los datos.

Además de los tres capas de objetos en movimiento, el proyecto superpone 23 capas estáticas y analíticas conmutables: columnas de luz 3D para 535 estaciones (altura proporcional normalizada a las paradas diarias), haces cónicos 3D giratorios para 36 faros, red de carreteras adaptable al zoom (autopistas en rojo / carreteras provinciales en naranja / ciclovías en verde), mapa de calor hexagonal H3 de simulación de flujo de personas (cambio día/noche, escalas de color Plasma/Viridis), panel de 9 indicadores demográficos (cantidad/estructura/carga), superficie ondulada 3D de temperaturas por cuadrícula CWA, codificación de color de congestión en autopistas, escala de severidad de alertas de desastres NCDR, y marcadores geográficos de eventos noticiosos de CNA[^3].

En total: 10 categorías, 23 capas, 6 estilos de mapa base de Mapbox, navegación por fecha + línea de tiempo con reproducción acelerada de 30× a 3600×. Todo esto contenido en un repositorio GitHub de una sola persona.

## Curaduría técnica: qué tan difícil es hacer que los datos sean "en tiempo real"

Crear un sitio web de visualización con mapa no es difícil; el "hola mundo" de Mapbox se ejecuta en quince minutos. Lo difícil es que sea **en tiempo real, fluido y capaz de manejar más de 56.000 celdas hexagonales para las más de 7.000 aldeas de Taiwán**.

Mini Taiwan Pulse tiene tres decisiones arquitectónicas dignas de mención:

### 1. Patrón Overlay Registry

Todas las capas estáticas de Mapbox GL (aeropuertos, estaciones, puertos, faros, carreteras, campos de viento) se gestionan de forma unificada mediante un `overlayRegistry.ts` **basado en configuración**: un array de configuración (`sourceUrl` + función `paint`), un `overlayManager.ts` para operaciones CRUD, y un `useEffect` que controla la visibilidad y el cambio de tema de todos los overlays. Añadir un overlay solo requiere modificar tres archivos[^3].

Esta es una arquitectura clásica de "UI basada en datos", no especialmente llamativa, pero para un sistema de 23 capas es la clave de si se puede mantener o no.

### 2. Incrustación de Three.js CustomLayer

Mapbox GL por sí solo no es bueno dibujando objetos 3D. Mini Taiwan Pulse utiliza la interfaz `CustomLayer` de Mapbox para incrustar la escena de Three.js en el mismo contexto WebGL, con seis `CustomLayer` independientes gestionando vuelos, embarcaciones, ferrocarril, faros, columnas de luz de estaciones y ondas 3D de temperatura, compartiendo la matriz de cámara y controlando cada una su interruptor de renderizado[^3].

Esta es la forma estándar de integrar Mapbox + Three.js (bibliotecas de terceros como threebox y three-geo siguen este camino[^15]). Mini Taiwan Pulse escribe los CustomLayer a mano en lugar de depender de threebox, a costa de tener que manejar la matriz de proyección y la configuración de iluminación manualmente, pero con la ventaja de tener control total sobre el flujo de renderizado.

### 3. Patrón de preagregación con Supabase pg_cron

Esta es la decisión más ingenieril de todo el proyecto. El pooler de Supabase tiene un **límite estricto de 2 minutos en statement_timeout** para llamadas a la API[^16], lo que significa que si tu consulta SQL tarda más de 2 minutos, la conexión se corta. Para un sistema que necesita consultar trayectorias de embarcaciones, trayectorias de vuelos y congestión de autopistas diariamente, consultar las tablas originales directamente chocaría contra este muro.

La solución de Mini Taiwan Pulse es: **tabla normal + función de actualización diaria + pg_cron para actualización programada + RPC SELECT ligera**. Cada consulta temporal de alta frecuencia tiene su tabla de preagregación correspondiente, actualizada cada 10-30 minutos mediante `pg_cron` integrado en Supabase[^17]; el frontend solo lee resultados de la tabla preagregada, manteniéndose consistentemente en el rango de milisegundos:

| RPC                          | Antes            | Después |
| ---------------------------- | ---------------- | ------- |
| `get_ship_trails`            | timeout          | 123ms   |
| `get_flight_trails`          | timeout          | 126ms   |
| `get_freeway_congestion_day` | al límite de 60s | 302ms   |
| `get_disaster_alerts_day`    | 13,2s            | 110ms   |
| `get_temperature_frames`     | 551ms            | 107ms   |

Esta tabla aparece directamente en el README[^3], con enlace al informe de inventario. Para lectores familiarizados con arquitecturas Postgres + tiempo real, estas líneas son más convincentes que cualquier captura de pantalla: indican que el autor encontró un cuello de botella real de producción y eligió la solución correcta.

> **📝 Nota del curador**
> Las decisiones técnicas de Mini Taiwan Pulse son casi todas "soluciones aburridas correctas": CustomLayer de Mapbox + Three.js, hexágonos H3 de código abierto de Uber[^18], escalas de color perceptualmente uniformes (Plasma/Viridis/Inferno), normalización log1p + gamma para distribuciones de cola pesada, preagregación con Supabase pg_cron. No hay técnicas de visualización inventadas, ni el framework de moda más reciente; cada decisión tiene antecedentes documentados. Esta sensación de ingeniería estable "sin sorpresas" es la cualidad más escasa en un proyecto independiente.

## La definición de tecnología cívica se está redefiniendo

La palabra "tecnología cívica" en Taiwán se asocia más frecuentemente con g0v, una comunidad "centrada en la transparencia de la información, los resultados abiertos y la colaboración abierta, que se preocupa por los asuntos públicos a través del poder de las bases populares"[^19]. El énfasis de esta definición está en lo **colectivo**: hackatones, colaboración, coescritura, revisiones de PR, evaluaciones de subvenciones.

Pero Mini Taiwan Pulse muestra otra forma contemporánea de tecnología cívica: **una persona, un bucle de fin de semana, una licencia MIT**.

Desde la visualización del presupuesto en el primer hackatón de g0v en 2012, hasta el mapa de mascarillas de Wu Zhanwei en 2020, hasta el mini-taiwan-pulse de Migu Cheng en 2026. En un extremo del espectro está la cultura presencial de colaboración colectiva; en el otro, la lenta acumulación de commits individuales. Entre ambos extremos hay varios grados de mezcla: equipos pequeños con mantenimiento de varios años, proyectos de estudiantes, código abierto subcontratado por licitaciones gubernamentales, y las becas de innovación en tecnología cívica g0v de la Open Culture Foundation (OCF)[^20].

Todos estos proyectos comparten la misma premisa: **el gobierno abrió los datos, el resto depende de nosotros**. El papel del gobierno es el de constructor de infraestructuras de datos como TDX, data.gov.tw, SEGIS y CWA, mientras que el papel de la comunidad cívica es hacer que esos datos "se vean", a través de visualizaciones, wrappers de API, artículos tutoriales, servicios aplicados y paneles de supervisión ciudadana.

La posición de Mini Taiwan Pulse en este espectro es clara: no es un proyecto de servicio (no busca resolver un problema específico), ni un proyecto de herramientas (no busca que otros reutilicen una biblioteca), es un **proyecto de demostración**. Quienes vean este repositorio pensarán: "así que los datos abiertos conectados pueden verse así", "TDX + Three.js + Supabase pueden lograr este nivel", "una persona sola puede hacer todo esto".

> **📝 Nota del curador**
> Lo que más escasea en el ecosistema de datos abiertos de Taiwán no son las API ni los ingenieros, sino **demuestras que presenten los datos de forma atractiva y comprensible para el público general**. Mini Taiwan Pulse eligió el tema de mayor dificultad (escala nacional + múltiples fuentes de datos + actualización en tiempo real + visualización 3D) y un desarrollador independiente lo llevó al punto de poder compartirlo. La cifra de 241 estrellas no importa por su valor absoluto, sino porque demuestra que este camino es viable.

## Cosas que podrían hacerse

Mini Taiwan Pulse es actualmente una obra de demostración, no un producto:

- **No ha publicado releases**: 193 commits pero 0 etiquetas de release; el despliegue es Docker + Nginx auto-hospedado[^3]
- **Algunas fuentes de datos requieren solicitar claves API propias**: la API comercial de FlightRadar24, la clave API de la plataforma de datos abiertos de CWA y la autenticación de miembro TDX (flujo OIDC Client Credentials) deben configurarse por el lector[^6]
- **La URL de demostración pública aún no se ha revelado**: el README no incluye enlace a demo en vivo; para ver los efectos actualmente hay que clonar y ejecutar localmente
- **Solo 1 issue abierto y 0 PR**: la colaboración comunitaria aún no ha arrancado; esta es la etapa típica de un proyecto de demostración

Pero todo esto puede cambiar. Un repositorio con 241 estrellas significa que 241 personas pulsaron "quiero seguir esto". Si Migu Cheng decide convertirlo en un servicio público, o extraer los componentes centrales como bibliotecas reutilizables, o presentarlo en `grants.g0v.tw` para solicitar una beca[^20], cómo sería la siguiente fase de este proyecto es una pregunta abierta que vale la pena observar.

## Por qué merece ser curado

Taiwan.md eligió elevar Mini Taiwan Pulse de la [lista de recursos](/resources/mini-taiwan-pulse) a artículo en profundidad bajo la categoría de tecnología, por tres razones:

1. **No es un evento noticioso, es una muestra representativa**. En 2026, la comunidad de datos abiertos de Taiwán tendrá muchos commits y muchas estrellas, pero Mini Taiwan Pulse es un punto de referencia poco común en la dimensión de "hasta dónde puede llegar una sola persona".
2. **Da forma concreta al concepto abstracto de "tecnología cívica"**. La mayoría de la gente al hablar de tecnología cívica menciona g0v, Audrey Tang o el mapa de mascarillas; pero la tecnología cívica de 2026 puede verse como un analista de datos escribiendo TypeScript los fines de semana. Esto no reemplaza la narrativa de g0v, la amplía.
3. **Permite al lector ver el verdadero potencial de los datos abiertos gubernamentales**. Si después de leer [Identidad digital y gobierno digital](/technology/數位身分證與數位政府) o [Comunidad de código abierto y g0v](/technology/開源社群與g0v) los datos abiertos siguen pareciendo un concepto abstracto, Mini Taiwan Pulse es la nota al pie que dice: "mira, así es como los datos se convierten en paisaje".

Un analista de datos, seis semanas, 193 commits, 23 capas, una isla de Taiwán que respira.

Esta es una de las formas que adopta la tecnología cívica en 2026.

---

## Lectura adicional

- [Comunidad de código abierto y g0v](/technology/開源社群與g0v) — La trayectoria de una década desde el fork al gobierno en 2012 hasta el mapa de mascarillas en 2020
- [Espíritu de código abierto de Taiwán](/technology/台灣開源精神) — El contexto cultural y los patrones de contribución de la comunidad de código abierto de Taiwán
- [Identidad digital y gobierno digital](/technology/數位身分證與數位政府) — La capa de política de la infraestructura digital gubernamental
- [PTT (批踢踢)](/technology/PTT批踢踢) — Otra raíz de la cultura de colaboración en red de Taiwán
- [Wu Che-yu (吳哲宇)](/people/吳哲宇) — Otra forma de tecnología cívica: un artista de nuevos medios construye una SSOT para la soberanía del conocimiento de Taiwán con Markdown y GitHub

---

## Enlaces del proyecto

- **Repositorio GitHub**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Licencia**: MIT License
- **Lenguajes principales**: TypeScript 86,1% / Python 12,9%
- **Plataformas de datos relacionadas**: [TDX Servicio de circulación de datos de transporte](https://tdx.transportdata.tw/) · [Plataforma de Datos Abiertos del Gobierno](https://data.gov.tw/) · [Plataforma SEGIS de datos socioeconómicos](https://segis.moi.gov.tw/) · [Datos abiertos de la Administración Central de Meteorología](https://opendata.cwa.gov.tw/)
- **Comunidades de tecnología cívica**: [g0v Gobierno Cero de Taiwán](https://g0v.tw/) · [Becas de innovación en tecnología cívica g0v](https://grants.g0v.tw/)

---

## Referencias

- [Repositorio GitHub mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- [TDX Servicio de circulación de datos de transporte](https://tdx.transportdata.tw/)
- [Plataforma de Datos Abiertos del Gobierno data.gov.tw](https://data.gov.tw/)
- [Plataforma SEGIS de datos socioeconómicos](https://segis.moi.gov.tw/)
- [Plataforma de datos abiertos de la Administración Central de Meteorología](https://opendata.cwa.gov.tw/)
- [Plataforma de datos del Centro de Ciencia y Tecnología para la Reducción de Desastres NCDR](https://datahub.ncdr.nat.gov.tw/)
- [g0v Gobierno Cero de Taiwán](https://g0v.tw/)
- [Becas de innovación en tecnología cívica g0v](https://grants.g0v.tw/)
- [Jothon g0v — Red de hackatones](https://jothon.g0v.tw/)
- [Documentación de Supabase pg_cron](https://supabase.com/docs/guides/database/extensions/pg_cron)
- [Uber H3: Índice espacial jerárquico hexagonal](https://h3geo.org/)
- [OpenStreetMap Taiwán — Mapa Abierto de Calles](https://osm.tw/)
- [threebox: plugin de Three.js para Mapbox GL JS](https://github.com/jscastro76/threebox)
- [Quién creó el mapa de mascarillas: el equipo detrás de "salvar la nación con el teclado" (TechNews 2020)](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/)

---

[^1]: [Migu Cheng (ianlkl11234s) · GitHub](https://github.com/ianlkl11234s) — Perfil del desarrollador, bio: "Senior Data Analyst. Exploring AI automation in daily work.", cuenta creada el 7 de marzo de 2020

[^2]: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse) — Repositorio del proyecto, datos obtenidos de la API de GitHub el 19 de abril de 2026: 193 commits, 241 estrellas, 12 forks, 1 issue abierto

[^3]: [README de mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse/blob/main/README.md) — Documentación técnica completa del proyecto, incluyendo lista de capas, stack tecnológico, y explicaciones de la arquitectura Overlay Registry / CustomLayer / Supabase pg_cron

[^4]: [Flightradar24 | Rastreador de vuelos](https://www.flightradar24.com/) — Servicio global de seguimiento de vuelos en tiempo real, red de rastreo compuesta por receptores ADS-B

[^5]: [OpenStreetMap Taiwán — Mapa Abierto de Calles](https://osm.tw/) — Portal de la comunidad OSM de Taiwán; la API Overpass permite consultar datos de vías, estaciones, límites de aeropuertos y otras etiquetas OSM

[^6]: [TDX Servicio de circulación de datos de transporte](https://tdx.transportdata.tw/) — Puerta de entrada única de datos abiertos de transporte del Ministerio de Transporte, integrada en 2022 con cinco plataformas, que ofrece API estándar OData de datos estáticos y dinámicos de transporte a escala nacional

[^7]: [Plataforma SEGIS de datos socioeconómicos](https://segis.moi.gov.tw/) — Plataforma GIS de datos socioeconómicos construida por el Ministerio del Interior, que ofrece capas espaciales de estadísticas demográficas a nivel de aldea

[^8]: [Plataforma de datos abiertos de la Administración Central de Meteorología](https://opendata.cwa.gov.tw/) — API abierta de CWA que proporciona conjuntos de datos de observación, pronóstico, cuadrículas, radar y satélite

[^9]: [Plataforma de datos del Centro de Ciencia y Tecnología para la Reducción de Desastres NCDR](https://datahub.ncdr.nat.gov.tw/) — Feed de alertas CAP y API de eventos de desastres del Centro Nacional de Ciencia y Tecnología para la Reducción de Desastres

[^10]: [Servicio RSS | Agencia Central de Noticias CNA](https://www.cna.com.tw/about/rss.aspx) — Suscripción RSS pública de la Agencia Central de Noticias, que proporciona titular, resumen, enlace e imagen destacada

[^11]: [Plataforma de Datos Abiertos del Gobierno data.gov.tw](https://data.gov.tw/) — Puerta de entrada única de datos abiertos del gobierno operada por el Consejo Nacional de Desarrollo, lanzada en 2013

[^12]: [Quién creó el mapa de mascarillas: el equipo detrás de "salvar la nación con el teclado" | TechNews](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/) — El proceso de Wu Zhanwei y Good-Ideas Studio conectando las existencias de mascarillas en más de 6.000 farmacias del seguro nacional de salud en 72 horas

[^13]: [Acerca de Jothon — Hackatón g0v](https://jothon.g0v.tw/about/) — Estadísticas acumuladas del hackatón g0v: más de 59 ediciones, más de 7.200 participantes y más de 950 proyectos propuestos

[^14]: [mini-taiwan-pulse docs/known-issues.md](https://github.com/ianlkl11234s/mini-taiwan-pulse/commits/main) — Commit `docs: known-issues registro del evento de saturación de E/S del 9 de abril de 2026` y otros registros de ingeniería

[^15]: [threebox — Un plugin de Three.js para Mapbox GL JS](https://github.com/jscastro76/threebox) — Biblioteca de terceros representativa para la integración de Mapbox + Three.js

[^16]: [Documentación de Supabase | Timeouts](https://supabase.com/docs/guides/database/postgres/timeouts) — El statement_timeout predeterminado del pooler de Supabase es de 2 minutos; las conexiones que excedan el tiempo se cortan

[^17]: [pg_cron: Programar trabajos recurrentes en Postgres | Documentación de Supabase](https://supabase.com/docs/guides/database/extensions/pg_cron) — Mecanismo de programación cron integrado en Supabase para trabajos programados dentro de la base de datos

[^18]: [Uber H3: Índice espacial jerárquico hexagonal](https://h3geo.org/) — Sistema de malla geográfica hexagonal de código abierto de Uber, licencia Apache 2

[^19]: [g0v Gobierno Cero de Taiwán](https://g0v.tw/) — Comunidad de tecnología cívica activa desde 2012, centrada en la transparencia de la información, los resultados abiertos y la colaboración abierta

[^20]: [Becas de innovación en tecnología cívica g0v](https://grants.g0v.tw/) — Programa de becas para proyectos de tecnología cívica ejecutado por la Open Culture Foundation (OCF)

---

_Última verificación: 2026-04-19_
