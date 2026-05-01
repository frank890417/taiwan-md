---
title: 'Comunidad de código abierto y g0v'
description: 'En febrero de 2020, mientras el mundo entero acaparaba mascarillas, un grupo de programadores de Taiwán tardó solo 72 horas en permitir que 13,000 tiendas de conveniencia pudieran consultar el inventario de mascarillas. Sin órdenes gubernamentales, sin apoyo presupuestario, solo una convicción: cambiar la sociedad con código. Este es g0v (Gobierno Cero), un experimento fascinante de «hacer fork al gobierno».'
category: Technology
subcategory: '開源社群'
tags: ['Tecnología', 'Comunidad de código abierto', 'g0v', 'Tecnología cívica']
date: 2026-03-23
lastVerified: 2026-03-23
lastHumanReview: true
readingTime: 8
featured: false
translatedFrom: 'Technology/開源社群與g0v.md'
sourceCommitSha: '528d1c04'
sourceContentHash: 'sha256:af78147ce6c1c764'
translatedAt: '2026-05-01T22:19:10+08:00'
---

# Comunidad de código abierto y g0v

> **Resumen en 30 segundos:** En 2012, debido a que el gobierno gastó una gran suma de dinero en un anuncio sin contenido, un grupo de ingenieros decidió «hacer fork al gobierno»: cambiar gov.tw por g0v.tw y rediseñar cómo debería ser el gobierno. Ocho años después, estalló la pandemia de COVID-19, y estos programadores «amateur» construyeron el mapa de mascarillas en 72 horas, permitiendo que todos los taiwaneses consultaran en tiempo real el inventario de mascarillas de 13,000 farmacias. Esto no es un logro del gobierno, es una victoria ciudadana.

En una noche de octubre de 2012, 高嘉良 estaba sentado frente a su computadora mirando el anuncio del «Plan de Impulso del Dinamismo Económico» del gobierno, y se enfurecía cada vez más. El gobierno había gastado más de 40 millones en la producción de un video promocional, pero su contenido era tan vacío que hacía dudar: ¿no tendría más sentido tirar ese dinero directamente a la alcantarilla?

Esa noche, tomó una decisión que cambiaría a Taiwán: **Si el gobierno no lo hace bien, lo haremos nosotros.**

Cambió la «o» en el dominio de gobierno gov.tw por un «0», convirtiéndolo en g0v.tw. Este simple juego de palabras simbolizaba un concepto nuevo: **hacer fork al gobierno**. Al igual que el software de código abierto, si la versión original tiene problemas, se hace un fork de una rama y se reescribe una versión mejor.

## Hacer fork al gobierno: un experimento ciudadano en la era digital

g0v no busca derrocar al gobierno, sino «paralelizar» al gobierno: usar la colaboración de código abierto para imaginar nuevamente cómo deberían ser los servicios gubernamentales.

**En diciembre de 2012**, se celebró el 0º hackatón de g0v en la Academia Sinica, con la participación de más de 40 personas. El primer proyecto fue rescatar el «Presupuesto General del Gobierno Central» del infierno de PDF y convertirlo en un sitio web interactivo y visual.

El libro de presupuesto original del gobierno era un PDF de más de 500 páginas, con números y tablas densos que la gente común no podía entender. Los voluntarios de g0v reorganizaron estos datos y crearon gráficos interactivos: **con un clic, se puede ver en qué gasta el gobierno tus impuestos.**

> **📝 Nota del curador**
> El primer proyecto de g0v, la visualización del presupuesto gubernamental, no fue una coincidencia. El presupuesto es el núcleo de la democracia: el pueblo tiene derecho a saber en qué gasta el gobierno su dinero. Pero los presupuestos tradicionales están diseñados precisamente para ser incomprensibles. g0v utilizó la tecnología para romper esta «opacidad intencional».

Este pequeño experimento demostró una cosa: **que el gobierno no lo haga no significa que sea imposible. Solo significa que nadie lo ha hecho.**

## Movimiento del 18 de marzo (318): demostración de fuerza de la tecnología cívica

En la noche del 18 de marzo de 2014, estudiantes ocuparon el Yuan Legislativo. A la mañana siguiente, voluntarios de g0v aparecieron en el lugar, no para protestar, sino para «construir infraestructura básica».

**Sin organización, sin mando.** Los participantes de la comunidad g0v realizaron las siguientes acciones de forma espontánea:

- **Transmisión en tiempo real**: instalaron un sistema de transmisión en vivo con múltiples cámaras, permitiendo que el mundo entero viera la situación dentro del recinto.
- **Integración de información**: crearon una carpeta hackfoldr para recopilar, organizar y verificar información de diversas fuentes en internet en tiempo real.
- **Colaboración masiva**: establecieron un sistema de edición colaborativa, permitiendo que personas que no estaban en el lugar participaran en la recolección de datos y el fact-checking.
- **Conexión externa**: proporcionaron traducción en tiempo real en varios idiomas, para que los medios internacionales pudieran entender las demandas de la protesta en tiempo real.

**24 días de ocupación, transmisión en vivo de alta definición sin interrupciones.** Esto fue un logro técnico increíble en 2014. En ese momento, Facebook Live ni siquiera existía, y la transmisión en vivo de YouTube no era común, pero los voluntarios de g0v construyeron con herramientas de código abierto un sistema de transmisión más estable que el de los medios profesionales.

Más importante aún, demostraron el poder de la «transparencia». Debido a la transmisión en vivo, todos podían ver lo que ocurría dentro del recinto, haciendo imposible que el gobierno distorsionara los hechos. Este modelo de «usar la tecnología para supervisar al gobierno» fue posteriormente estudiado e imitado por movimientos ciudadanos de todo el mundo.

## Mapa de mascarillas: el milagro de 72 horas

A principios de febrero de 2020, estalló la pandemia de COVID-19 en Taiwán. El gobierno anunció una política de mascarillas con sistema de registro civil, permitiendo a cada persona comprar 2 mascarillas por semana. El problema era: ¿dónde comprarlas? ¿En qué farmacias quedaba inventario?

**El 6 de febrero**, la Comisionada de Política Digital 唐鳳 (quien es miembro fundadora de g0v) anunció que el gobierno abriría los datos de inventario de mascarillas de las 13,000 farmacias afiliadas en todo Taiwán, actualizados cada 30 minutos.

**El 8 de febrero**, se lanzó el primer mapa de mascarillas.
**El 9 de febrero**, aparecieron más de 100 versiones diferentes del mapa de mascarillas.

Este no fue un proyecto adjudicado por el gobierno a una empresa de informática, sino el resultado de «horas extra voluntarias» de programadores de todo Taiwán. **Cada uno quería contribuir a la prevención de la epidemia, y lo que los programadores podían hacer era escribir código.**

Las versiones más populares incluyeron:

- **Mapa de mascarillas de Taiwán** por Howard Wu: interfaz de mapa sencilla y clara.
- **¿Quedan mascarillas?** por el usuario kiang: integración de comentarios de farmacias e información de horarios.
- **¿Dónde comprar mascarillas?** por Finjon Kiang: soporte para consulta por voz.

En 72 horas, Taiwán tenía el sistema de consulta de inventario de mascarillas más completo del mundo. \*\*Mientras los ciud
