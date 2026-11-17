---
title: 'El espíritu de código abierto de Taiwán — Los ingenieros que generan energía con amor'
description: 'El proyecto de código abierto más influyente de Taiwán no es un software, sino un grupo de ingenieros que le dijeron al gobierno en un hackathon: «Haces un mal trabajo, nosotros lo haremos».'
date: 2026-03-29
category: 'Technology'
tags:
  [
    'Código abierto',
    'g0v',
    'COSCUP',
    'GitHub',
    'Tecnología cívica',
    'Software libre',
  ]
subcategory: '社群與數位文化'
author: 'p3nchan'
featured: false
lastVerified: 2026-03-29
lastHumanReview: false
readingTime: 8
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣開源精神.md'
sourceCommitSha: '22286539e'
sourceContentHash: 'sha256:8cc121a9cccbf90a'
sourceBodyHash: 'sha256:98feb4bab36f053f'
translatedAt: '2026-11-04T16:27:05.928986+00:00'
---

> La industria del software de Taiwán no está en la línea de punta mundial, pero en GitHub hay más de 44.000 usuarios que indican a Taiwán como su ubicación, se han celebrado más de 70 hackathons comunitarios y hay miles de contribuidores —casi todos desarrolladores individuales que invierten su propio dinero después de su jornada laboral. Este artículo no solo habla de g0v, sino que traza un mapa completo de la cultura de código abierto de Taiwán desde cuatro perspectivas: personas, comunidad, educación e industria.

---

## El hackathon que surgió de un anuncio

En octubre de 2012, el Yuan Ejecutivo emitió un anuncio de 40 segundos en televisión para promocionar el «Plan de Impulso del Dinamismo Económico». El contenido del anuncio era solo una frase: «Este plan es realmente complejo, no se puede explicar claramente con unas pocas palabras sencillas».

Kao Chia-liang (高嘉良, clkao), graduado del Departamento de Ciencias de la Computación de la Universidad Nacional de Taiwán, vio el anuncio y abrió su computadora. Junto con unos amigos, participó en el Yahoo! Open Hack Day, cambió el tema a último momento y en tres días desarrolló el proyecto «Visualización del Presupuesto del Gobierno Central», ganando un premio a la mención honorífica. Dos meses después, Kao registró g0v.tw y utilizó el premio para organizar el «Hackathon de Movilización para la Paz y el Orden Público (Edición Cero)».

El nombre g0v surge de reemplazar la "o" de "gov" (gobierno) por un 0. El significado es directo: haces un mal trabajo, nosotros lo haremos.

No es una organización. g0v no tiene oficinas, ni junta directiva, ni empleados a tiempo completo. Es una comunidad descentralizada que se mantiene mediante hackathons bimensuales. A finales de 2025, se habían realizado más de 70 hackathons, había más de 8.000 miembros en Slack y más de 4.500 notas colaborativas acumuladas en HackMD.

## 72 horas, 100 aplicaciones

El momento en que g0v recibió mayor atención internacional fue en 2020.

Al inicio del brote de COVID-19, Taiwán implementó un sistema de registro de mascarillas. El Ministerio de Salud y Bienestar publicó una API abierta con el inventario de mascarillas en farmacias, y Audrey Tang (唐鳳), entonces ministra digital, difundió la noticia en los canales de chat de g0v. En las siguientes 72 horas, la comunidad de desarrolladores de Taiwán desplegó una energía colaborativa sin precedentes: Chiang Ming-tsung (江明宗, kiang) creó el mapa de mascarillas en farmacias, Jarvis Lin desarrolló la aplicación para Android y el chatbot de LINE se lanzó el mismo día.

En una semana, había más de 100 aplicaciones relacionadas con la consulta de mascarillas. Se estima que cerca de mil ingenieros participaron en el desarrollo.

_Foreign Affairs_ publicó un artículo titulado _Civic Technology Can Help Stop a Pandemic_, señalando que Taiwán demostró un tercer camino distinto a la vigilancia al estilo chino y a los gigantes tecnológicos occidentales: una innovación democrática impulsada por la tecnología cívica. Un informe de la Facultad de Medicina de Stanford documentó las 124 medidas de intervención independientes implementadas por Taiwán durante la pandemia. NPR, _MIT Technology Review_ y _Harvard Business Review_ realizaron reportajes especiales.

Esto no fue mérito del gobierno, ni solo de Audrey Tang. Fue obra de un grupo de ingenieros sin sueldo que abrieron sus laptops los fines de semana.

## Antes de Audrey Tang: las raíces del código abierto en Taiwán

La rápida consolidación de g0v en 2012 fue posible porque Taiwán ya tenía dos décadas de experiencia en código abierto.

Audrey Tang (唐鳳) aprendió Perl a los 12 años y abandonó la escuela a los 14 para emprender. Antes de ingresar al gobierno, lanzó más de 100 proyectos en CPAN (la plataforma de módulos de Perl), lideró Pugs —la primera versión ejecutable de Perl 6 implementada en Haskell— y desarrolló EtherCalc junto a Dan Bricklin, padre de las hojas de cálculo. Es una líder reconocida en las comunidades Perl y Haskell, con una influencia en la comunidad internacional de código abierto que precede con creces su carrera política.

Hung Jen-yu (洪任諭, PCMan) es otra figura representativa. Es médico internista, aprendió programación por su cuenta en la escuela secundaria y escribió el software de conexión a BBS PCMan. En 2006 lanzó el proyecto LXDE, un entorno de escritorio ligero para Linux. LXDE fue el entorno de escritorio principal con menor consumo de memoria del mundo, adoptado por distribuciones como Knoppix y Lubuntu. Un entorno de escritorio escrito por un médico taiwanés corre en máquinas Linux de todo el mundo. Hung luego se unió a Google, pero la historia de LXDE ilustra una característica típica de los contribuidores de código abierto de Taiwán: su profesión principal no es el software, y desarrollan proyectos de nivel internacional en su tiempo libre.

Huang Ching-chun (黃敬群, jserv) siguió otro camino. Participó en el desarrollo de software de sistemas en empresas como MediaTek y Andes Technology, y luego se incorporó como profesor al Departamento de Ciencias de la Computación de la Universidad Nacional Cheng Kung, donde imparte el curso «Diseño del Kernel de Linux», la única asignatura universitaria en Taiwán que desglosa sistemáticamente las versiones más recientes del kernel de Linux. Sus estudiantes envían parches directamente a Linux, glibc, GCC y LLVM. Ha dado conferencias en COSCUP y FOSDEM en Europa. Huang Ching-chun no representa a los contribuidores «genio», sino un intento de integrar la práctica de código abierto en el sistema educativo.

## Ecosistema comunitario: no solo COSCUP

La densidad de comunidades de código abierto en Taiwán es excepcional en Asia.

**COSCUP** (Conference for Open Source Coders, Users and Promoters) se celebra desde 2006 y es la conferencia anual de código abierto más grande de Taiwán. Para 2024, la participación superó los 2.800 asistentes, con más de 40 espacios temáticos comunitarios que cubren tópicos como Kubernetes, PostgreSQL, Ruby, Python y Blockchain. Cada espacio comunitario cuenta con aproximadamente 6 horas de programación, planificadas autónomamente por cada comunidad. COSCUP no cobra entrada. Cuenta con más de cien voluntarios, todos sin compensación. 2025 marca la vigésima edición de COSCUP.

**SITCON** (Conferencia de Tecnología de Información para Estudiantes) comenzó en 2013, completamente organizada e impulsada por estudiantes. Su propósito es demostrar a jóvenes de 18 años que no necesitan esperar a graduarse para participar en código abierto. SITCON celebra una conferencia anual en marzo, además de HackGen durante el semestre, campamentos de verano y reuniones quincenales.

**PyCon TW** es la conferencia anual de la comunidad Python, que reúne a usuarios de Python de diversos campos. **MozTW** es la comunidad de voluntarios de Mozilla en Taiwán, que desde 2004 mantiene la versión en chino tradicional de Firefox, gestiona el programa de embajadores en campus y coordina equipos de traducción de subtítulos. El espacio comunitario «Mozilla Loft» en Taipéi funcionó desde 2014 hasta 2023; después del fin de la financiación de Mozilla, se mantuvo con donaciones locales.

Existe amplio cruce de participación entre estas comunidades. Una misma persona puede ser conferencista en COSCUP, contribuidor de g0v y voluntario de PyCon TW simultáneamente. El círculo de código abierto de Taiwán es pequeño, pero tiene una densidad alta.

## El legado institucional y la ruptura

Taiwán alguna vez intentó promover el código abierto desde el gobierno.

En 2003, el Instituto de Ciencias de la Computación de la Academia Sinica, con subsidio del Ministerio de Industria bajo el Consejo Económico, estableció el «Open Source Software Foundry» (OSSF). OSSF proporcionaba alojamiento de proyectos, consultoría legal y boletines para promover y cultivar la comunidad de código abierto local durante más de una década. En 2015, el Ministerio de Ciencia y Tecnología decidió no continuar con los subsidios, y OSSF cesó operaciones, con el sitio web cerrándose completamente en finales de 2021.

La desaparición de OSSF no causó un declive en las actividades de código abierto de Taiwán —paradójicamente, esto demuestra que la energía de código abierto en Taiwán nunca dependió del gobierno. Lo que realmente sostiene el ecosistema es la «Open Culture Foundation» (OCF), establecida en 2014. OCF fue fundada colectivamente por múltiples comunidades de código abierto y es una fundación sin fines de lucro que actúa como administradora fiduciaria de los fondos comunitarios: emite recibos para COSCUP, gestiona donaciones para proyectos y proporciona consultoría legal sobre licencias de código abierto. OCF también colabora con instituciones internacionales como la AIT, la Oficina Británica en Taiwán y el Banco Mundial, exportando la experiencia de la tecnología cívica de Taiwán al ámbito internacional.

Esta estructura es interesante: el programa del gobierno terminó, y una fundación privada asumió el relevo. La institución creció de abajo hacia arriba.

## Las razones estructurales del «generando energía con amor»

La mayoría de los contribuidores de código abierto de Taiwán son individuos. No hay empresas de código abierto de la envergadura de Red Hat, no hay programas de patrocinio empresarial a escala de Google Summer of Code, y la inversión de las empresas tecnológicas en código abierto suele ser «permitir a los empleados trabajar en ello durante el tiempo libre» en lugar de «incluir código abierto en los KPI».

¿Por qué?

La industria tecnológica de Taiwán se centra en la fabricación por contrata y el diseño de circuitos integrados. Los modelos de negocio de TSMC, MediaTek y Foxconn se construyen sobre capacidades de fabricación y barreras de patentes, no sobre código abierto. El software en este ecosistema suele ser un «complemento asociado con el hardware», no una fuente de ingresos independiente. Entre miles de empresas de software y servicios, el noventa por ciento realiza integración de sistemas, atendiendo el mercado interno.

El resultado es: hay muchas personas escribiendo código, pero casi nadie que pueda vivir del código abierto. El código abierto es cosa de después del trabajo, cosa de reuniones comunitarias, cosa de hackathons de sábado. En la lista de patrocinadores de COSCUP, verás empresas extranjeras (Google, LINE, Trend Micro) más que empresas locales.

Esto no es enteramente malo. Precisamente porque el código abierto no es un KPI, los motivantes de los participantes son más puros. La razón por la que el mapa de mascarillas de g0v explotó en 72 horas no fue porque alguien abriera un ticket de tarea, fue porque mil ingenieros sintieron que «esto debería hacerse».

Pero este modelo tiene un techo. Sin inversión empresarial sostenida, los proyectos se estancan fácilmente cuando el mantenedor central se agota. A Taiwán no le faltan hackers de fin de semana; lo que le falta son posiciones que permitan dedicación exclusiva al código abierto.

## El poder silencioso de 44.000 personas

En GitHub hay 44.408 usuarios (según datos de marzo de 2026) que indican a Taiwán como su ubicación. Se necesita al menos 67 seguidores para entrar en el ranking de Taiwán en committers.top. Considerando la población de 23 millones de Taiwán, esta cifra significa que por cada 500 taiwaneses hay una cuenta activa de GitHub. En comparación con Japón, Singapur y Hong Kong, la actividad de GitHub per cápita de los desarrolladores taiwaneses está en el nivel frontal de Asia.

Lo que vale la pena destacar no son los números, sino el tipo de contribuciones. El rol de los desarrolladores taiwaneses en proyectos internacionales frecuentemente es «infraestructura invisible»: parches del kernel, optimizaciones del compilador, traducción localizada, redacción de documentación. Los estudiantes de la Universidad Nacional Cheng Kung envían código directamente al kernel de Linux. MozTW ha mantenido la versión en chino tradicional de Firefox durante veinte años. Estas contribuciones no aparecen en los titulares, pero sin ellas, el software no funcionaría.

La comunidad de código abierto de Taiwán también tiene una característica rara en Asia: g0v ha aplicado la metodología de código abierto a la política pública. La plataforma vTaiwan usa la tecnología Polis para deliberación en línea, habiendo tratado más de 30 temas como regulación de Uber y legislación de tecnología financiera. _MIT Technology Review_ la llamó «el sistema simple pero ingenioso que Taiwán usa para tercerizar la elaboración de leyes». Ya no es cuestión de escribir código; es aplicar la lógica colaborativa del código abierto a la gobernanza democrática.

El código abierto en Taiwán nunca fue solo cosa de la comunidad técnica. Es una actitud: ver un problema, abrir el editor, empezar a escribir.

## Referencias

1. [g0v Civic Technology Projects and Community Handbook](https://g0v.hackmd.io/@jothon/ctpbook) — Documento de primera mano
2. [2020 動盪一年，g0v 的貢獻可不只「口罩地圖」](https://www.gvm.com.tw/article/76428) — Global Views Monthly
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs
4. [公民黑客力 g0v 零時政府](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — Taiwan Panorama
5. [國際開源社群領導者唐鳳：開源是新時代交換典範](https://www.ithome.com.tw/news/93603) — iThome
6. [洪任諭 — Wikipedia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [黃敬群 — Wikipedia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [自由軟體鑄造場 — Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Lecturas complementarias

- [Open source communities and g0v](/es/technology/open-source-and-g0v) — La narrativa colectiva de «forking the government»
- [A history of Taiwan's internet community migration](/es/technology/taiwan-online-community-migration) — De BBS a Discord, una historia generacional
- [Mini Taiwan Pulse](/es/technology/mini-taiwan-pulse-civic-tech) — Formas individuales de tecnología cívica: 193 commits en seis semanas transforman datos abiertos en trazas de luz 3D
- [The Twin Swords of Dayu](/es/technology/softstar-twin-classics) — Otra historia taiwanesa de «lograr cosas extraordinarias con pasión», surgida de una galería comercial (RPG de Dayu)
- [There is no unpleasantness without entering the dungeon](/es/technology/into-the-cellar-taiwan-game-podcast) — Una comunidad de 6 millones de jugadores brotó de un dormitorio universitario en la Universidad Central
