---
title: 'El espíritu open source de Taiwán: ingenieros que generan electricidad con amor'
description: 'El proyecto open source más influyente de Taiwán no es un software, sino un grupo de ingenieros que le dijeron al gobierno en un hackathon: "Si no puedes hacerlo bien, lo haremos nosotros".'
date: '2026-03-29'
author: 'p3nchan'
category: 'Technology'
subcategory: '社群與數位文化'
tags:
  [
    'open source',
    'g0v',
    'COSCUP',
    'GitHub',
    'tecnología cívica',
    'software libre',
  ]
readingTime: '8'
lastVerified: '2026-03-29'
lastHumanReview: 'false'
featured: 'false'
translatedFrom: 'Technology/台灣開源精神.md'
sourceCommitSha: '0ed55e20'
sourceContentHash: 'sha256:8cc121a9cccbf90a'
translatedAt: '2026-05-01T22:19:10+08:00'
---

> La industria de software de Taiwán no se cuenta entre las más grandes del mundo, pero los usuarios registrados en GitHub con ubicación en Taiwan superan los 44 000, los hackathones comunitarios acumulan más de 70 ediciones con miles de contribuyentes —casi todos desarrolladores individuales que trabajan por su cuenta después de su jornada laboral—. Este artículo no solo habla de g0v, sino que traza el mapa completo de la cultura open source de Taiwán desde cuatro perspectivas: personas, comunidad, educación e industria.

---

## Un anuncio que desencadenó un hackathon

En octubre de 2012, el Yuan Ejecutivo emitió un anuncio televisivo de 40 segundos para promocionar el "Programa de Impulso a la Energía Económica". El contenido del anuncio se reducía a una frase: "Este programa es realmente demasiado complejo para explicarlo en pocas palabras."

Kao Chia-liang (clkao), graduado del Departamento de Informática de la Universidad Nacional de Taiwán, vio el anuncio y abrió su computadora. Él y varios amigos participaron en el Yahoo! Open Hack Day, cambiaron su proyecto a última hora y en tres días desarrollaron la "Visualización del Presupuesto del Gobierno Central", ganando un premio honorífico. Dos meses después, Kao registró g0v.tw y usó el dinero del premio para organizar el "Hackathon de Movilización Antidisturbios Número Cero".

El nombre de g0v reemplaza la "o" de gov (gobierno) por un 0. El mensaje es directo: si no puedes hacerlo bien, lo haremos nosotros.

No es una organización. g0v no tiene oficina, no tiene junta directiva, no tiene empleados a tiempo completo. Es una comunidad descentralizada sostenida por hackathones bimensuales. Hasta finales de 2025, se han realizado más de 70 hackathones, el canal de Slack cuenta con más de 8 000 miembros y en HackMD se han acumulado más de 4 500 notas colaborativas.

---

## 72 horas, 100 aplicaciones

El momento en que g0v obtuvo mayor visibilidad internacional fue en 2020.

Al estallar la pandemia de COVID-19, Taiwán implementó un sistema de mascarillas con nombre real. El Ministerio de Salud y Bienestar publicó una API abierta con el inventario de mascarillas en farmacias, y la ministra digital Tang Audrey anunció la noticia en el canal de chat de g0v. En las siguientes 72 horas, la comunidad de desarrolladores de Taiwán desplegó una energía colaborativa sin precedentes: Chiang Ming-tsung (kiang) creó el mapa de mascarillas por farmacia, Jarvis Lin desarrolló la aplicación para Android, y un bot de chat para LINE se lanzó el mismo día.

En una semana, las aplicaciones relacionadas con la consulta de mascarillas superaron las 100. Se estima que cerca de mil ingenieros participaron en el desarrollo.

_Foreign Affairs_ publicó un artículo especial titulado _Civic Technology Can Help Stop a Pandemic_, en el que señalaba que Taiwán había demostrado un tercer camino distinto tanto de la vigilancia al estilo chino como de las grandes tecnológicas occidentales: la innovación democrática impulsada por tecnología cívica (civic tech). Un informe de la Facultad de Medicina de Stanford documentó 124 intervenciones independientes implementadas por Taiwán durante la pandemia. NPR, MIT Technology Review y Harvard Business Review publicaron reportajes especiales.

No fue mérito exclusivo del gobierno, ni solo de Tang Audrey. Fue obra de un grupo de ingenieros sin remuneración, que abrieron sus portátiles un fin de semana y lo hicieron.

---

## Antes de Tang Audrey: las raíces del open source en Taiwán

La razón por la que g0v pudo tomar forma rápidamente en 2012 es que Taiwán ya contaba con veinte años de terreno fértil para el open source.

Tang Audrey (唐鳳) aprendió Perl a los 12 años y abandonó la escuela a los 14 para emprender. Antes de incorporarse al gobierno, inició más de 100 proyectos en CPAN (la plataforma de módulos de Perl) y lideró Pugs, la primera implementación funcional de Perl 6 en Haskell, además de co-desarrollar EtherCalc con Dan Bricklin, creador de la hoja de cálculo. Era una figura reconocida como líder en las comunidades de Perl y Haskell, y su influencia en el ecosistema open source internacional es muy anterior a su carrera política.

Hong Ren-yu (PCMan) es otro personaje representativo. Médico de profesión, aprendió programación de forma autodiseñada en la secundaria y escribió PCMan, un software de conexión BBS. En 2006 inició el proyecto LXDE, un entorno de escritorio ligero para Linux. LXDE fue en su momento el entorno de escritorio de menor consumo de memoria entre los principales, y fue adoptado por distribuciones como Knoppix y Lubuntu. Un entorno de escritorio creado por un médico taiwanés funcionaba en máquinas Linux de todo el mundo. Hong se incorporó posteriormente a Google, pero la historia de LXDE ilustra una característica típica de los contribuyentes open source de Taiwán: su profesión principal no es el software, y crean proyectos de nivel internacional en su tiempo libre.

Huang Ching-chun (jserv) tomó un camino diferente. Participó en desarrollo de software de sistemas en empresas como MediaTek y Andes Technology, y posteriormente se incorporó como profesor en el Departamento de Informática de la Universidad Nacional de Cheng Kung, donde impartió el curso "Diseño del Núcleo de Linux" —el único curso universitario en Taiwán que descompone sistemáticamente el kernel más reciente de Linux—. Sus estudiantes enviaron directamente parches a Linux, glibc, GCC y LLVM. Ha dado conferencias en múltiples ediciones de COSCUP y en FOSDEM en Europa. jserv no representa al contribuyente "genio", sino un intento de integrar la práctica open source en el sistema educativo.

---

## Ecosistema comunitario: no solo COSCUP

La densidad de las comunidades open source de Taiwán es notable incluso en Asia.

**COSCUP** (Conference for Open Source Coders, Users and Promoters), iniciado en 2006, es la mayor conferencia anual de open source de Taiwán. Para 2024, la asistencia superó las 2 800 personas, con más de 40 salas comunitarias (community rooms) que cubrían temas como Kubernetes, PostgreSQL, Ruby, Python y Blockchain. Cada sala comunitaria disponía de aproximadamente 6 horas de programación, curada autónomamente por cada comunidad. COSCUP no cobra entrada. Los voluntarios superan el centenar, todos sin remuneración. 2025 marcó la vigésima edición de COSCUP.

**SITCON** (Students' Information Technology Conference), iniciado en 2013, es organizado íntegramente por estudiantes, desde su concepción hasta su ejecución. Su razón de existencia es que un estudiante de secundaria de 18 años vea que no necesita esperar a graduarse para participar en open source. SITCON celebra su conferencia anual cada marzo, además de HackGen durante el semestre, campamentos de verano y reuniones quincenales.

**PyCon TW** es la conferencia anual de la comunidad Python, que reúne usuarios de Python de diversas disciplinas. **MozTW** es la comunidad de voluntarios de Mozilla en Taiwán, que desde 2004 mantiene la versión en chino tradicional de Firefox y opera programas como embajadores universitarios y un grupo de traducción de subtítulos. El espacio comunitario "Mozi Gongliao" en Taipéi funcionó de 2014 a 2023; tras el fin del patrocinio de Mozilla, se sostuvo con donaciones locales.

Existe una amplia participación cruzada entre estas comunidades. Una misma persona puede ser ponente en COSCUP, contribuyente de g0v y voluntario en PyCon TW. El círculo open source de Taiwán no es grande, pero sí muy denso.

---

## Legado institucional y ruptura

Taiwán tuvo en su momento un intento gubernamental de impulsar el open source.

En 2003, el Instituto de Informática de la Academia Sinica recibió financiamiento de la Oficina de Industria del Ministerio de Asuntos Económicos para establecer la "Fundición de Software Libre" (OSSF, Open Source Software Foundry). OSSF ofrecía alojamiento de proyectos, asesoría legal y promoción mediante boletines electrónicos, cultivando las comunidades open source locales durante más de una década. En 2015, el Ministerio de Ciencia y Tecnología decidió retirar el financiamiento, OSSF cesó sus operaciones y el sitio web se mantuvo en línea hasta su cierre a finales de 2021.

La desaparición de OSSF no provocó un declive en la actividad open source de Taiwán —lo cual demuestra precisamente que la energía open source de Taiwán nunca dependió del gobierno—. Lo que realmente sostiene el ecosistema es la "Fundación de Cultura Abierta" (OCF, Open Culture Foundation), establecida en 2014. La OCF fue fundada conjuntamente por varias comunidades open source, es una fundación de bien público sin fines de lucro y actúa como administradora financiera de las comunidades: emite facturas para COSCUP, gestiona donaciones para proyectos y ofrece asesoría legal sobre licencias open source. La OCF también colabora con instituciones internacionales como AIT, la Oficina Británica en Taiwán y el Banco Mundial, exportando la experiencia de tecnología cívica de Taiwán al exterior.

Esta estructura es reveladora: cuando el programa gubernamental terminó, una fundación civil tomó el relevo. Las instituciones crecieron de abajo hacia arriba.

---

## Las razones estructurales de "generar electricidad con amor"

La gran mayoría de los contribuyentes open source de Taiwán son individuos. No existen empresas open source del calibre de Red Hat, ni programas de patrocinio corporativo comparables al Google Summer of Code; la inversión en open source de las empresas tecnológicas suele consistir en "permitir que los empleados lo hagan en su tiempo libre" más que en "incluirlo en los indicadores de desempeño".

¿Por qué?

La industria tecnológica de Taiwán se centra en la fabricación por contrato (OEM/ODM) y el diseño de circuitos integrados. Los modelos de negocio de TSMC, MediaTek y Foxconn se construyen sobre capacidad de fabricación y barreras de patentes, no sobre código abierto. El software en este ecosistema suele ser un "complemento del hardware", no una fuente de ingresos independiente. De las miles de empresas de servicios de software, el 90 % se dedica a la integración de sistemas para el mercado interno.

El resultado es que hay muchos programadores, pero casi nadie "vive del open source". El open source es algo que se hace después del horario laboral, en reuniones comunitarias, en los hackathones del sábado. En la lista de patrocinadores de COSCUP, las empresas extranjeras (Google, LINE, Trend Micro) superan en número a las locales.

Esto no es enteramente negativo. Precisamente porque el open source no es un indicador de desempeño, las motivaciones de los participantes son más puras. El mapa de mascarillas de g0v pudo materializarse en 72 horas no porque alguien emitiera una orden de trabajo, sino porque mil ingenieros sintieron que "esto había que hacerlo".

Pero este modelo tiene un techo. Sin inversión corporativa sostenida, los proyectos tienden a estancarse cuando los mantenedores principales se agotan. Taiwán no carece de hackers de fin de semana; lo que faltan son puestos de trabajo dedicados a tiempo completo al open source.

---

## La fuerza silenciosa de 44 000 personas

Los usuarios registrados en GitHub con ubicación en Taiwan son 44 408 (cifra de marzo de 2026). Se requieren al menos 67 seguidores para aparecer en el ranking de Taiwán en committers.top. Considerando los 23 millones de habitantes de Taiwán, esta cifra significa que por cada 500 taiwaneses hay una cuenta activa de GitHub. En comparación con Japón, Singapur y Hong Kong, la actividad per cápita en GitHub de los desarrolladores taiwaneses se sitúa en la franja alta de Asia.

Más revelador que las cifras es el tipo de contribuciones. El papel de los desarrolladores taiwaneses en proyectos internacionales suele ser "infraestructura invisible": parches al kernel, optimización de compiladores, traducción de localización, redacción de documentación. Estudiantes de la Universidad Nacional de Cheng Kung envían código directamente al kernel de Linux. MozTW ha mantenido la versión en chino de Firefox durante veinte años. Estas contribuciones no aparecen en las noticias, pero sin ellas, el software no funcionaría.

Las comunidades open source de Taiwán tienen además una característica poco común en Asia: g0v ha aplicado la metodología open source a las políticas públicas. La plataforma vTaiwan utiliza la tecnología Polis para la deliberación en línea, y ha abordado más de 30 temas, incluyendo la regulación de Uber y la normativa fintech. _MIT Technology Review_ la describió como "el sistema simple pero ingenioso que Taiwán utiliza para hacer crowdsourcing de sus leyes". Esto ya no es una cuestión de programación: es aplicar la lógica colaborativa del open source a la gobernanza democrática.

El open source en Taiwán nunca ha sido solo asunto de comunidades técnicas. Es una actitud: ver un problema, abrir el editor y empezar a escribir.

---

## Referencias

1. [Manual de proyectos y comunidad de tecnología cívica g0v](https://g0v.hackmd.io/@jothon/ctpbook) (fuente primaria)
2. [Un año turbulento en 2020: las contribuciones de g0v van más allá del "mapa de mascarillas"](https://www.gvm.com.tw/article/76428) — 遠見雜誌
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs (fuente en inglés)
4. [El poder hacker ciudadano: g0v, el gobierno de hora cero](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — 台灣光華雜誌
5. [Tang Audrey, líder de la comunidad open source internacional: el open source es el nuevo paradigma de intercambio](https://www.ithome.com.tw/news/93603) — iThome
6. [Hong Ren-yu — Wikipedia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [Huang Ching-chun — Wikipedia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [Fundición de Software Libre — Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Lecturas complementarias

- [Comunidades open source y g0v](/technology/開源社群與g0v) — La narrativa colectiva de un gobierno bifurcado
- [Historia de la migración de las comunidades en línea de Taiwán](/technology/台灣網路社群遷徙史) — Una historia generacional del BBS al Discord
- [Mini Taiwan Pulse](/technology/mini-taiwan-pulse) — La dimensión personal del open source en tecnología cívica: 193 commits en seis semanas que convierten datos abiertos en pistas de luz 3D
- [Las dos espadas de Softstar](/technology/大宇雙劍) — Otra historia taiwanesa de "hacer algo que supera las propias dimensiones con pasión" (un RPG nacido en el Guanghua Market)
- [No se puede dormir sin bajar al sótano](/technology/不入地窖焉能睡覺) — Una comunidad de 6 millones de jugadores que brotó de una residencia universitaria de la Universidad Nacional Central
