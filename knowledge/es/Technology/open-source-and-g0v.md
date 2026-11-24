---
title: 'Comunidad de código abierto y g0v'
description: 'En febrero de 2020, mientras el mundo se lanzaba a comprar mascarillas, un grupo de programadores taiwaneses logró en 72 horas que 13 000 tiendas de conveniencia pudieran consultar el inventario de mascarillas. Sin órdenes gubernamentales, sin presupuesto, solo una convicción: cambiar la sociedad con código. Así es g0v, el «gobierno cero», un extraordinario experimento de «fork al gobierno».'
date: 2026-03-23
category: 'Technology'
tags: ['Tecnología', 'Comunidad de código abierto', 'g0v', 'Tecnología cívica']
subcategory: '開源社群'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: true
readingTime: 8
translatedFrom: 'Technology/開源社群與g0v.md'
sourceCommitSha: 'ab9964d668'
sourceContentHash: 'sha256:49bc798dac7c0848'
sourceBodyHash: 'sha256:3eab141a44932c8b'
translatedAt: '2026-11-24T11:37:43+08:00'
---

# Comunidad de código abierto y g0v

> **Resumen en 30 segundos:** En 2012, porque el gobierno gastó una fortuna en un anuncio sin contenido, un grupo de ingenieros decidió «hacer fork al gobierno» —cambió gov.tw por g0v.tw y rediseñó cómo debería ser el gobierno. Ocho años después, al estallar la pandemia de COVID-19, estos programadores «aficionados» construyeron en 72 horas el mapa de mascarillas, permitiendo a toda la población de Taiwán consultar en tiempo real el stock de 13 000 farmacias. No es un logro gubernamental, es una victoria ciudadana.

En una noche de octubre de 2012, Kao Chia-liang (高嘉良) estaba frente al ordenador viendo el anuncio del «Plan de impulso del dinamismo económico» del gobierno, y cuanto más lo veía, más indignado se sentía. El gobierno había gastado más de 40 millones de dólares taiwaneses en producir un vídeo promocional, pero el contenido era tan vacuo que hacía dudar: ¿no habría sido más útil tirar ese dinero a la cloaca?

Esa noche tomó una decisión que cambiaría Taiwán: **si el gobierno no lo hace bien, lo hacemos nosotros.**

Cambió la «o» del nombre de dominio gubernamental gov.tw por un «0», creando g0v.tw[^1]. Este simple juego tipográfico simbolizaba un concepto totalmente nuevo: **fork the government**. Igual que en el software de código abierto, si la versión original tiene problemas, haces un fork —creas una rama paralela— y reescribes una versión mejor.

## Fork al gobierno: un experimento ciudadano en la era digital

g0v no busca derrocar al gobierno, sino «paralelizarlo» —usar la colaboración de código abierto para reimaginar cómo deberían ser los servicios públicos.

**Diciembre de 2012**, se celebró el «hackathon cero» de g0v (la primera maratón de programación) en la Academia Sinica (中研院), con la participación de unas 40 personas. El primer proyecto fue rescatar el «Presupuesto general del gobierno central» del infierno de los PDF y convertirlo en un sitio web de visualización interactiva.

Originalmente, el presupuesto gubernamental era un PDF de más de 500 páginas, lleno de cifras y tablas densísimas, incomprensible para la gente común. Los voluntarios de g0v reorganizaron esos datos y crearon gráficos interactivos: **con un clic podías ver en qué se gastaba el gobierno el dinero de tus impuestos.**

> **📝 Nota del comisario**
> Que el primer proyecto de g0v fuera la visualización del presupuesto no fue casualidad. El presupuesto es el núcleo de la política democrática: el pueblo tiene derecho a saber en qué gasta el gobierno su dinero. Pero los presupuestos tradicionales están diseñados precisamente para que no se entiendan. g0v usó la tecnología para romper esa «opacidad intencionada».

Este pequeño experimento demostró una cosa: **que el gobierno no lo haga no significa que no se pueda hacer. Solo que nadie lo había hecho.**

## El Movimiento del Girasol (318): demostración de fuerza de la tecnología cívica

La noche del 18 de marzo de 2014, estudiantes ocuparon el Yuan Legislativo (立法院). A la mañana siguiente, los voluntarios de g0v aparecieron en el lugar, no para protestar, sino para «construir infraestructura».

**Nadie organizó, nadie dio órdenes.** Los participantes de la comunidad g0v actuaron espontáneamente e hicieron lo siguiente:

- **Transmisión en directo en tiempo real**: montaron un sistema multi-cámara para que todo el mundo pudiera ver lo que ocurría en el hemiciclo.
- **Integración de información**: crearon carpetas colaborativas en hackfoldr[^2] para recopilar, organizar y verificar al instante la información que circulaba en la red.
- **Colaboración masiva**: establecieron un sistema de escritura colaborativa (etherpad) para que la ciudadanía no presente pudiera participar en la recopilación de datos y la verificación de hechos.
- **Enlace internacional**: ofrecieron traducción instantánea multilingüe para que los medios internacionales entendieran al momento las demandas de la protesta.

**Durante los 24 días de ocupación, la transmisión en alta definición no se cortó ni una vez.** En 2014 era un logro técnico impensable. Facebook Live aún no existía, YouTube Live no estaba generalizado, pero los voluntarios de g0v construyeron con herramientas de código abierto un sistema de streaming más estable que el de los medios profesionales.

Aún más importante: demostraron el poder de la «transparencia». Gracias al directo, cualquiera podía ver lo que ocurría dentro, y al gobierno le resultó imposible tergiversar los hechos. Este modelo de «usar la tecnología para fiscalizar al gobierno» fue visto en el extranjero como un referente posible, y surgieron comunidades de tecnología cívica similares en Corea del Sur, Tailandia, Japón y Alemania[^3].

## El mapa de mascarillas: el milagro de las 72 horas

A principios de febrero de 2020, la pandemia de COVID-19 estalló en Taiwán. El gobierno anunció el sistema de racionamiento de mascarillas con nombre real: cada persona podía comprar 2 mascarillas por semana. El problema era: ¿dónde comprarlas? ¿Qué farmacia tenía stock?

**El 6 de febrero**, la ministra sin cartera Audrey Tang (唐鳳), miembro fundadora de g0v, anunció que el gobierno abriría los datos de inventario de las 13 000 farmacias concertadas de toda la isla, con actualizaciones cada 30 minutos[^4].

**El 8 de febrero**, el primer mapa de mascarillas salió a la red.
**El 9 de febrero**, aparecieron más de 100 versiones distintas del mapa.

No era un proyecto adjudicado por el gobierno a una empresa informática, sino el resultado de la «horas extra voluntarias» de programadores de todo Taiwán. **Todos querían aportar su granito de arena a la prevención epidémica, y lo que sabían hacer los programadores era escribir código.**

Las versiones más populares incluían:

- **Mapa de mascarillas de Taiwán** (台灣口罩地圖) de Howard Wu: interfaz de mapa clara y concisa.
- **¿Quedan mascarillas?** (還有口罩嗎) del usuario kiang: integraba reseñas y horarios de farmacias.
- **¿Dónde comprar mascarillas?** (口罩哪裡買) de Finjon Kiang: con función de consulta por voz.

En 72 horas, Taiwán tenía el sistema de consulta de inventario de mascarillas más completo del mundo[^5]. **Mientras en otros países la gente hacía cola para comprarlas a ciegas, en Taiwán ya se podía mirar en el móvil cuántas mascarillas quedaban en la farmacia más cercana.**

> **⚠️ Punto de controversia**
> Algunos criticaron al gobierno por «externalizar la responsabilidad a voluntarios», dejando que la sociedad civil hiciera gratis el trabajo del Estado. La respuesta de la comunidad g0v fue directa: no nos están usando, elegimos activamente devolver a la sociedad nuestra experiencia profesional. Además, los mapas de código abierto resultaron más útiles, más innovadores y más ajustados a las necesidades de los usuarios que el sistema que el propio gobierno habría hecho.

## La magia de la colaboración de código abierto

El modelo de funcionamiento de g0v es muy simple: **no hay jefes, no hay empleados, no hay presupuesto, no hay oficina.** Solo hay un grupo de personas dispuestas a usar la tecnología para resolver problemas sociales, y una cultura de colaboración abierta.

### Cultura de hackathon

Cada dos meses organizan un «gran hackathon» (大松), donde los participantes proponen ideas in situ, forman equipos y desarrollan prototipos. El proceso es:

1. **Propuesta de tres minutos**: cualquiera puede subir al escenario a presentar su idea.
2. **Formación libre de equipos**: quien tenga interés se une al proyecto.
3. **Desarrollo in situ**: ese mismo día se empieza a programar.
4. **Presentación de resultados**: por la tarde se comparte el avance del día.

**Nadie es rechazado, ninguna idea se descarta.** El único requisito: el proyecto debe ser de código abierto para que otros puedan continuarlo y mejorarlo.

### Herramientas de colaboración

- **Canales de Slack**: discusión diaria e intercambio de información.
- **GitHub**: gestión de código y control de versiones[^6].
- **HackMD**: documentos colaborativos y actas de reuniones.
- **Trello**: gestión de proyectos y seguimiento del progreso.

### Tres espíritus fundamentales

1. **Código abierto**: todo el código, datos y documentación de los proyectos son públicos.
2. **Descentralizado**: no hay jerarquía directiva, cualquiera puede iniciar un proyecto.
3. **Primacía de la implementación**: «Talk is cheap, show me the code» (Las palabras sobran, enséñame el código).

> **💡 ¿Sabías que...?**
> La comunidad g0v tiene una tradición: en cada hackathon reparten pegatinas de «pequeña ardilla». Si es tu primera vez, recibes una pegatina de ardilla. El diseño sugiere: aunque seas novato, eres bienvenido a aportar tu pequeño grano de arena, como las ardillas que recogen bellotas; cada pequeña contribución importa.

## Proyectos destacados e impacto social

En ocho años, la comunidad g0v ha producido cientos de proyectos, muchos de los cuales han influido directamente en políticas gubernamentales y en el funcionamiento social.

### Transparencia del Yuan Legislativo

Antes, el **Diario de sesiones del Yuan Legislativo** solo existía en versión textual, y la ciudadanía apenas podía enterarse de qué hacían realmente los legisladores. Los voluntarios de g0v crearon la plataforma «Transparencia legislativa», que ofrece:

- **Directo en tiempo real**: streaming de las sesiones parlamentarias.
- **Registro de intervenciones**: estadísticas y búsqueda del contenido de cada legislador.
- **Registro de votaciones**: resultados de las votaciones en proyectos de ley importantes.
- **Seguimiento de propuestas**: proceso completo desde la presentación hasta la tercera lectura.

El resultado: **los legisladores empezaron a preocuparse por sus «datos»**. Tasas de asistencia, número de interpelaciones, cantidad de propuestas —cifras que antes a nadie importaban— ahora hay webs que las calculan automáticamente. Los representantes descubrieron que cada movimiento suyo era vigilado, y su comportamiento empezó a cambiar.

### vTaiwan: experimento de democracia digital

En 2014, g0v y el gobierno lanzaron conjuntamente la plataforma vTaiwan[^7], permitiendo a la ciudadanía participar en la formulación de políticas. El caso más famoso es la controversia de Uber:

**En 2015**, la operación de Uber en Taiwán provocó protestas del sector del taxi. La vía tradicional era una decisión unilateral del gobierno, pero vTaiwan abrió una tercera vía: reunir a todas las partes interesadas en una plataforma en línea para dialogar y buscar una solución ganar-ganar.

Tras meses de debate en línea y talleres presenciales, se llegó a la política de «taxis diversos», que protege los derechos de los taxistas tradicionales y permite la coexistencia de modelos de servicio innovadores.

**Fue la primera vez que Taiwán usó la «democracia digital» para resolver una disputa de política pública.**

### Impulsor del gobierno abierto

Las iniciativas de g0v influyeron directamente en políticas gubernamentales:

- **2012**: el proyecto de visualización presupuestaria impulsó la apertura de datos presupuestarios.
- **2013**: el proyecto de transparencia legislativa llevó al streaming de las sesiones parlamentarias.
- **2014**: tras el Movimiento del Girasol, el gobierno se comprometió a modificar la «Ley de divulgación de información gubernamental».
- **2015**: vTaiwan se convirtió en canal oficial de participación política.
- **2016**: Audrey Tang asumió como ministra sin cartera para asuntos digitales, llevando la experiencia de g0v al interior del gobierno.

## Influencia y conexiones internacionales

La experiencia de g0v no solo impacta Taiwán, sino que inspira al movimiento global de tecnología cívica.

### Red Code for All

g0v es miembro fundador de la red internacional **Code for All**[^8], colaborando estrechamente con Code for Japan (Japón), Code for Korea (Corea del Sur), Code for America (EE. UU.) y otras organizaciones.

**En 2019**, se celebró el g0v summit en Taipéi, reuniendo a comunidades de tecnología cívica de más de 30 países para compartir experiencias y tecnologías.

### Cooperación internacional durante la pandemia

En 2020, la experiencia del mapa de mascarillas de g0v fue adoptada por otros países:

- **Italia**: versión Roma del mapa de mascarillas.
- **Alemania**: versión Berlín del mapa de mascarillas.
- **EE. UU.**: mapa de EPP (equipos de protección personal).
- **Corea del Sur**: 마스크맵 (mask map).

Voluntarios de g0v también ayudaron activamente a otros países a montar sistemas similares, compartiendo con el mundo la experiencia tecnológica taiwanesa contra la pandemia.

## Retos y futuro

Como «organización sin jefes», g0v enfrenta los desafíos típicos de toda comunidad de código abierto.

### Sostenibilidad de los proyectos

Muchos proyectos de g0v nacen «por impulso momentáneo» y carecen de mantenimiento a largo plazo. El mapa de mascarillas fue muy activo durante la pandemia, pero tras su finalización fue decayendo. **Cómo hacer que los buenos proyectos sigan funcionando es el mayor reto de g0v.**

### Agotamiento de los participantes

Ocho años de participación voluntaria de alta intensidad han cansado a algunos contribuyentes pioneros. Cómo atraer savia nueva y hacer la participación más sostenible son cuestiones que la comunidad debe afrontar.

### Relación con el gobierno

La relación de g0v con el gobierno es sutil: a la vez cooperación y fiscalización. Cuando el gobierno abraza activamente el código abierto y la democracia digital, el rol «antagónico» de g0v se difumina. **Cómo mantener la independencia y el espíritu crítico mientras se colabora** es un desafío constante.

### Desinformación y guerra de información

En la era de la guerra informativa, los principios de apertura y transparencia también pueden ser abusados. **Cómo preservar la apertura sin convertirse en canal de difusión de bulos** es un reto nuevo.

## Un experimento que continúa

En 2012, cuando Kao Chia-liang cambió gov.tw por g0v.tw, solo quería expresar su frustración contra el gobierno. Doce años después, g0v se ha convertido en parte de la democracia taiwanesa y en una fuerza importante del movimiento global de tecnología cívica.

Este experimento ha demostrado varias cosas:

1. **La tecnología puede ser herramienta de participación ciudadana**, no solo medio de lucro comercial.
2. **La apertura y la transparencia son más importantes que la eficiencia gubernamental**, porque la transparencia genera eficiencia.
3. **Una pequeña indignación puede cambiar el mundo**, si estás dispuesto a actuar.
4. **Hacer fork al gobierno no es derrocarlo**, sino demostrar que existe una posibilidad mejor.

En una época de retroceso democrático, g0v nos recuerda: **la ciudadanía no son usuarias del gobierno, sino co-creadoras.** Lo que el gobierno hace mal, podemos hacerlo nosotras. Lo que hace bien, podemos ayudar a hacerlo mejor.

No es una revolución terminada, sino un experimento continuo. Cada hackathon, cada nuevo proyecto, cada línea de código responde a la misma pregunta: en la era digital, ¿qué forma puede tener la democracia?

La respuesta sigue escribiéndose, y cada persona dispuesta a contribuir es autora de esa respuesta.

## Referencias

[^1]: [Web oficial de g0v cero gobierno](https://g0v.tw/) — Portal de la comunidad g0v, presenta actividades de hackathon y modos de operación de los proyectos

[^2]: [Carpetas colaborativas hackfoldr de g0v](https://beta.hackfoldr.org/) — Plataforma de documentos colaborativos y colaboración de datos usada habitualmente por la comunidad g0v

[^3]: [A Guide to Win Democracy Back: Civic Tech Project and Community Handbook (Friedrich Naumann Foundation, 2025-06-09)](https://www.freiheit.org/fr/node/49973) — Manual de tecnología cívica escrito con la participación de la comunidad g0v, publicado por la Fundación Friedrich Naumann de Alemania, que califica a g0v como una de las fuerzas más importantes de la democracia digital taiwanesa y posible modelo mundial; el manual recoge casos de Corea del Sur, Tailandia, Japón y Alemania

[^4]: [How digital innovation can fight pandemics and strengthen democracy (Audrey Tang, TED2020)](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy) — Charla de Audrey Tang en TED sobre cómo Taiwán evitó el confinamiento en early 2020 gracias a herramientas digitales, incluido el mapa de mascarillas

[^5]: [Entrevista a desarrolladores del mapa de mascarillas](https://www.ithome.com.tw/news/136038) — Entrevista de iThome a los desarrolladores del mapa de mascarillas, documenta su implicación en el proyecto anti-epidémico

[^6]: [Organización g0v en GitHub](https://github.com/g0v) — Repositorios de código abierto y registros de colaboración de los proyectos de la comunidad g0v

[^7]: [Plataforma de democracia digital vTaiwan](https://vtaiwan.tw/) — Plataforma en línea de debate político y construcción de consensos, fruto de la colaboración entre g0v y el gobierno

[^8]: [Red internacional Code for All](https://codeforall.org/) — Web oficial de la red internacional Code for All que conecta organizaciones de tecnología cívica en todo el mundo

## Temas relacionados

- [Fundación para la Cultura Abierta](/es/technology/open-culture-foundation): la entidad que está detrás de g0v, lleva la contabilidad, emite facturas, asume la carga administrativa de la comunidad, y cómo pasó de un segundo plano a convertirse en guardiana de los derechos digitales
- [Industria de semiconductores](/es/technology/taiwan-semiconductor-industry): base del poder tecnológico de Taiwán
- [Mini Taiwan Pulse](/es/technology/mini-taiwan-pulse-civic-tech): implementación personal de código abierto en tecnología cívica 2026 — usa datos abiertos TDX + Three.js para dibujar Taiwán como trayectorias de luz 3D
