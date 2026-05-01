---
title: 'Comunidad de código abierto y g0v'
description: "'En febrero de 2020, cuando el mundo entero seguía comprando mascarillas a toda prisa, un grupo de programadores taiwaneses tardó 72 horas en hacer que 13.000 tiendas de conveniencia pudieran consultar el inventario de mascarillas. No hubo orden gubernamental ni apoyo presupuestario, solo una convicción: cambiar la sociedad con código. Esto es g0v, el gobierno de la hora cero, un extraño experimento de «fork al gobierno».'"
date: 2026-03-23
category: Technology
subcategory: '開源社群'
tags: [Technology, 開源社群, g0v, 公民科技]
readingTime: 8
lastVerified: 2026-03-23
lastHumanReview: true
featured: false
translatedFrom: Technology/開源社群與g0v.md
sourceCommitSha: 528d1c04
sourceContentHash: sha256:af78147ce6c1c764
translatedAt: 2026-05-01T22:19:10+08:00
---

# Comunidad de código abierto y g0v

> **Resumen en 30 segundos:** En 2012, porque el gobierno gastó una fortuna en producir un anuncio vacío de contenido, un grupo de ingenieros decidió «fork al gobierno»: cambiaron gov.tw por g0v.tw y rediseñaron cómo debería ser el gobierno. Ocho años después, cuando estalló la pandemia de COVID-19, estos programadores «aficionados» construyeron un mapa de mascarillas en 72 horas, permitiendo a toda la población de Taiwán consultar en tiempo real el inventario de mascarillas en 13.000 farmacias. Esto no fue un logro del gobierno, fue una victoria ciudadana.

Una noche de octubre de 2012, Kao-Chiang (高嘉良) estaba sentado frente a su computadora viendo el anuncio gubernamental del «Programa de Impulso a la Dinámica Económica», y cada vez se enfurecía más. El gobierno había gastado más de 40 millones de dólares taiwaneses en producir un vídeo promocional, pero su contenido era tan hueco que uno se preguntaba si no habría sido más útil tirar el dinero directamente al desagüe.

Esa noche tomó una decisión que cambiaría Taiwán: **si el gobierno no lo hace bien, lo haremos nosotros mismos.**

Cambió la «o» del dominio gubernamental gov.tw por un «0», creando g0v.tw. Este sencillo juego de palabras simbolizaba un concepto completamente nuevo: **fork the government**. Igual que en el software de código abierto, si la versión original tiene problemas, se hace un fork de la rama y se reescribe una versión mejor.

## Fork al gobierno: un experimento ciudadano de la era digital

g0v no busca derrocar al gobierno, sino crear un gobierno «paralelo»: reimaginar, mediante colaboración de código abierto, cómo deberían ser los servicios gubernamentales.

**En diciembre de 2012**, se celebró el hackathon g0v número cero en la Academia Sinica, con la participación de más de 40 personas. El primer proyecto consistió en rescatar el _Presupuesto General del Gobierno Central_ del infierno de los PDF y convertirlo en un sitio web interactivo con visualizaciones.

El presupuesto gubernamental original era un PDF de más de 500 páginas, repleto de números y tablas densas que la gente común no podía entender. Los voluntarios de g0v reorganizaron esos datos y crearon gráficos interactivos: **con un solo clic se podía ver a dónde iba el dinero de los impuestos.**

> **📝 Nota del curador**
> Que el primer proyecto de g0v fuera la visualización del presupuesto gubernamental no fue una coincidencia. El presupuesto es el núcleo de la democracia: los ciudadanos tienen derecho a saber en qué gasta el gobierno su dinero. Pero los documentos presupuestarios tradicionales están diseñados para que no se entiendan. g0v usó la tecnología para romper esta «opacidad deliberada».

Este pequeño experimento demostró algo: **que el gobierno no lo haga no significa que sea imposible. Simplemente nadie lo había hecho.**

## El movimiento estudiantil del 318: demostración de fuerza de la tecnología cívica

La noche del 18 de marzo de 2014, estudiantes ocuparon el Legislativo. A la mañana siguiente, los voluntarios de g0v ya estaban presentes en el lugar, no para protestar, sino para «construir infraestructura».

**Nadie los organizó, nadie los dirigió.** Los participantes de la comunidad g0v hicieron espontáneamente lo siguiente:

- **Retransmisión en directo**: instalaron un sistema de transmisión en vivo con múltiples cámaras para que el mundo entero pudiera ver lo que ocurría dentro del recinto legislativo.
- **Integración de información**: crearon carpetas en hackfoldr para recopilar, organizar y verificar en tiempo real toda la información que circulaba por internet.
- **Colaboración colectiva**: establecieron un sistema de documentos colaborativos para que los ciudadanos que no estaban presentes pudieran participar en la recopilación de datos y la verificación de hechos.
- **Conexión exterior**: proporcionaron traducción en varios idiomas en tiempo real para que los medios internacionales pudieran comprender de inmediato las demandas de la protesta.

**24 días de ocupación, transmisión en directo en alta calidad, sin interrupciones.** En 2014, esto era un logro técnico increíble. Facebook Live aún no existía, la transmisión en YouTube tampoco era común, pero los voluntarios de g0v construyeron con herramientas de código abierto un sistema de transmisión más estable que el de los medios profesionales.

Más aún, demostraron el poder de la «transparencia». Gracias a la transmisión en directo, todos podían ver lo que ocurría dentro del recinto legislativo, haciendo imposible que el gobierno distorsionara los hechos. Este modelo de «vigilancia del gobierno mediante tecnología» fue después estudiado e imitado por movimientos ciudadanos en todo el mundo.

## El mapa de mascarillas: un milagro en 72 horas

A principios de febrero de 2020, la pandemia de COVID-19 estalló en Taiwán. El gobierno anunció el sistema de racionamiento de mascarillas, permitiendo a cada persona comprar dos mascarillas por semana. El problema era: ¿dónde comprarlas? ¿Qué farmacia aún tenía existencias?

**El 6 de febrero**, la ministra digital Audrey Tang (唐鳳, ella misma miembro fundador de g0v) anunció que el gobierno abriría los datos de inventario de mascarillas de las 13.000 farmacias contratadas en todo el país, con actualizaciones cada 30 minutos.

**El 8 de febrero**, el primer mapa de mascarillas se puso en línea.
**El 9 de febrero**, aparecieron más de 100 versiones diferentes del mapa de mascarillas.

Este no fue un proyecto gubernamental subcontratado a una empresa informática, sino el resultado de que programadores de todo Taiwán «hicieran horas extra por su cuenta». **Todos querían aportar su granito de arena a la lucha contra la epidemia, y lo que un programador puede hacer es escribir código.**

Las versiones más populares incluían:

- **Mapa de mascarillas de Taiwán** de Howard Wu: interfaz de mapa clara y sencilla.
- **¿Quedan mascarillas?** del internauta kiang: integraba reseñas de farmacias e información de horarios.
- **¿Dónde comprar mascarillas?** de Finjon Kiang: con función de consulta por voz.

En 72 horas, Taiwán disponía del sistema de consulta de inventario de mascarillas más completo del mundo. **Mientras los ciudadanos de otros países seguían haciendo cola para comprar a toda prisa, los taiwaneses ya podían consultar desde su teléfono cuántas mascarillas quedaban en la farmacia más cercana.**

> **⚠️ Punto de vista controvertido**
> Algunos criticaron al gobierno por «subcontratar responsabilidades a voluntarios», haciendo que los ciudadanos desarrollaran sistemas gratuitamente para el gobierno. Pero la respuesta de la comunidad g0v fue directa: no estamos siendo utilizados por el gobierno, hemos elegido activamente devolver a la sociedad con nuestra experiencia profesional. Además, los mapas de mascarillas de código abierto eran más útiles, más innovadores y se ajustaban mejor a las necesidades de los usuarios que cualquier sistema que el gobierno pudiera haber construido por sí mismo.

## La magia de la colaboración de código abierto

El modelo de funcionamiento de g0v es simple: **no hay jefes, no hay empleados, no hay presupuesto, no hay oficina.** Solo hay un grupo de personas dispuestas a usar la tecnología para resolver problemas sociales, junto con una cultura de colaboración de código abierto.

### Cultura de hackathon

Cada dos meses se celebra un «gran hackathon» (大松), donde los participantes proponen ideas, forman equipos y desarrollan proyectos in situ. El proceso es:

1. **Propuesta de tres minutos**: cualquiera puede subir al escenario y presentar una idea.
2. **Formación libre de equipos**: quienes estén interesados pueden unirse a un proyecto.
3. **Desarrollo in situ**: se empieza a trabajar ese mismo día.
4. **Presentación de resultados**: por la tarde se comparten los avances del día.

**Nadie es rechazado, ninguna idea es descartada.** El único requisito es que el proyecto sea de código abierto, para que otros puedan continuar mejorándolo.

### Herramientas de colaboración

- **Canales de Slack**: discusión cotidiana e intercambio de información.
- **GitHub**: gestión de código y control de versiones.
- **HackMD**: documentos colaborativos y actas de reuniones.
- **Trello**: gestión de proyectos y seguimiento del progreso.

### Tres principios fundamentales

1. **Código abierto**: el código, los datos y la documentación de todos los proyectos son públicos.
2. **Descentralización**: no hay jerarquía de liderazgo, cualquiera puede iniciar un proyecto.
3. **La ejecución ante todo**: «Talk is cheap, show me the code» (Hablar es barato, muéstrame el código).

> **💡 ¿Sabías que...?**
> La comunidad g0v tiene una tradición: en cada hackathon se preparan pegatinas de «ardillitas». Si es tu primera vez participando, recibes una pegatina de ardilla. Este diseño sugiere que, aunque seas principiante, eres bienvenido a aportar tu granito de arena: igual que una ardilla recoge bellotas, cada pequeña contribución es importante.

## Proyectos clave e impacto social

En ocho años, la comunidad g0v ha producido cientos de proyectos, muchos de los cuales han influido directamente en las políticas gubernamentales y en el funcionamiento de la sociedad.

### Transparencia de los procedimientos legislativos

Las **actas del Legislativo** solo existían en formato de texto, y al ciudadano común le resultaba difícil entender qué hacían realmente los legisladores. Los voluntarios de g0v crearon la plataforma «Transparencia Legislativa», que ofrece:

- **Transmisión en directo**: retransmisión en vivo de las sesiones del Legislativo.
- **Registros de intervenciones**: estadísticas y búsqueda de contenido de las intervenciones de cada legislador.
- **Registros de votación**: resultados de votaciones sobre proyectos de ley importantes.
- **Seguimiento de propuestas**: el proceso completo de un proyecto de ley, desde su presentación hasta la tercera lectura.

El resultado fue que **los legisladores empezaron a preocuparse por sus propios «datos»**. La tasa de asistencia, el número de interpelaciones, la cantidad de propuestas presentadas: cifras que antes a nadie le importaban, ahora quedaban registradas en un sitio web. Los representantes populares descubrieron que cada uno de sus actos era supervisado, y su comportamiento empezó a cambiar.

### vTaiwan: un experimento de democracia digital

En 2014, g0v y el gobierno colaboraron para lanzar la plataforma vTaiwan, que permite a los ciudadanos participar en el proceso de formulación de políticas. El caso más famoso fue la controversia de Uber:

**En 2015**, la operación de Uber en Taiwán provocó protestas de los taxistas. La forma tradicional de proceder habría sido una decisión unilateral del gobierno, pero vTaiwan ofreció una tercera vía: permitir que todas las partes interesadas dialogaran en una plataforma en línea para encontrar una solución beneficiosa para todos.

Tras varios meses de debate en línea y talleres presenciales, se llegó a la política de «taxis diversificados», que protegía los derechos de los taxistas tradicionales al tiempo que permitía la existencia de modelos de servicio innovadores.

**Esta fue la primera vez que Taiwán utilizó la «democracia digital» para resolver una controversia política.**

### Impulsor del gobierno abierto

Las iniciativas de g0v influyeron directamente en las políticas gubernamentales:

- **2012**: el proyecto de visualización del presupuesto gubernamental impulsó la apertura de datos presupuestarios por parte del gobierno.
- **2013**: el proyecto de transparencia legislativa promovió la transmisión en directo de las sesiones del Legislativo.
- **2014**: tras el movimiento Sunflower, el gobierno se comprometió a impulsar la reforma de la _Ley de Información Gubernamental_.
- **2015**: la plataforma vTaiwan se convirtió en un canal oficial de participación en políticas públicas.
- **2016**: Audrey Tang fue nombrada ministra digital, llevando la experiencia de g0v al interior del gobierno.

## Impacto internacional y conexiones

La experiencia de g0v no solo ha influido en Taiwán, sino que también ha inspirado movimientos de tecnología cívica en todo el mundo.

### La red Code for All

g0v es miembro fundador de la red internacional **Code for All**, y colabora estrechamente con organizaciones como Code for Japan, Code for Korea y Code for America.

**En 2019**, la cumbre de g0v se celebró en Taipéi, reuniendo a comunidades de tecnología cívica de más de 30 países para compartir experiencias y tecnología.

### Cooperación internacional durante la pandemia

Durante la pandemia de 2020, la experiencia del mapa de mascarillas de g0v fue adoptada por otros países:

- **Italia**: versión Roma del mapa de mascarillas.
- **Alemania**: versión Berlín del mapa de mascarillas.
- **Estados Unidos**: mapa de EPP (equipos de protección personal).
- **Corea del Sur**: 마스크맵 (mapa de mascarillas).

Los voluntarios de g0v también ayudaron activamente a otros países a construir sistemas similares, compartiendo la experiencia tecnológica de prevención epidemiológica de Taiwán con el mundo entero.

## Desafíos y futuro

Como organización «sin jefes», g0v enfrenta los mismos desafíos que cualquier comunidad de código abierto.

### Sostenibilidad de los proyectos

Muchos proyectos de g0v son productos de un «entusiasmo momentáneo» y carecen de mantenimiento a largo plazo. El mapa de mascarillas fue muy activo durante la pandemia, pero una vez terminada esta, poco a poco dejó de recibir mantenimiento. **Cómo mantener en funcionamiento los buenos proyectos es el mayor desafío de g0v.**

### Fatiga de los participantes

Ocho años de participación voluntaria de alta intensidad han provocado agotamiento en algunos de los primeros colaboradores. Cómo atraer nuevos miembros y hacer que la participación sea más sostenible son cuestiones que la comunidad debe afrontar.

### Relación con el gobierno

La relación entre g0v y el gobierno es sutil: cooperan y al mismo tiempo se supervisan mutuamente. Cuando el gobierno abraza activamente el código abierto y la democracia digital, el papel de «oposición» de g0v se vuelve difuso. Cómo mantener la independencia y el espíritu crítico dentro de la cooperación es un desafío constante.

### Desinformación e información bélica

En la era de la guerra informativa, los principios de apertura y transparencia también pueden ser abusados. Cómo mantener la apertura sin convertirse en un canal de difusión de desinformación es un nuevo desafío.

## Un experimento que continúa

En 2012, cuando Kao-Chiang cambió gov.tw por g0v.tw, solo quería expresar su descontento con el gobierno. Doce años después, g0v se ha convertido en parte de la democracia taiwanesa y en una fuerza importante del movimiento mundial de tecnología cívica.

Este experimento ha demostrado varias cosas:

1. **La tecnología puede ser una herramienta de participación ciudadana**, no solo un medio de lucro comercial.
2. **La transparencia abierta es más importante que la eficiencia gubernamental**, porque la transparencia genera eficiencia.
3. **Una pequeña indignación puede cambiar el mundo**, siempre que estés dispuesto a actuar.
4. **Fork al gobierno no significa derrocar al gobierno**, sino demostrar que existen mejores posibilidades.

En esta era de retroceso democrático, g0v nos recuerda que **los ciudadanos no son usuarios del gobierno, sino cocreadores**. Si el gobierno hace algo mal, podemos hacerlo nosotros mismos. Si el gobierno hace algo bien, podemos ayudar a hacerlo mejor.

Esta no es una revolución terminada, sino un experimento en curso. Cada hackathon, cada nuevo proyecto, cada línea de código responden a la misma pregunta: en la era digital, ¿qué forma puede adoptar la democracia?

La respuesta sigue escribiéndose, y cada persona dispuesta a contribuir es autora de esa respuesta.

## Referencias

- [Sitio web oficial de g0v](https://g0v.tw/)
- [Organización de g0v en GitHub](https://github.com/g0v)
- [Carpeta de documentos colaborativos de g0v hackfoldr](https://beta.hackfoldr.org/)
- [Red internacional Code for All](https://codeforall.org/)
- [Plataforma de democracia digital vTaiwan](https://vtaiwan.tw/)
- [_La participación democrática en la era digital: del movimiento Sunflower a g0v_](https://www.books.com.tw/products/0010867342)
- [Charla TED: Cómo corregir el gobierno sin pedir permiso](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy)
- [Entrevista con los desarrolladores del mapa de mascarillas](https://www.ithome.com.tw/news/136038)

## Temas relacionados

- [Industria de semiconductores](/technology/半導體產業): la base del poder tecnológico de Taiwán.
- [Mini Taiwan Pulse](/technology/mini-taiwan-pulse): implementación personal de código abierto de tecnología cívica en 2026 — usando datos abiertos de TDX + Three.js para dibujar Taiwán en 3D con rastros de luz.
