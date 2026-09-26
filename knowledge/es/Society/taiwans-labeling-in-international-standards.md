---
title: 'El problema del etiquetado de Taiwán en los estándares internacionales'
description: 'Desde los códigos ISO hasta el software de código abierto — cómo se escribe el nombre de Taiwán en la infraestructura digital global, por qué genera controversia y cómo se corrige'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'estándares internacionales',
    'software de código abierto',
    'g0v',
    'soberanía digital',
    'etiquetado de Taiwán',
  ]
subcategory: '國際關係'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
translatedFrom: Society/台灣在國際標準中的標示問題.md
sourceCommitSha: d7b843fbf
sourceContentHash: sha256:c6d4e2074d20efa4
sourceBodyHash: sha256:234ae4c6ee15c7e0
translatedAt: 2026-09-26T11:10:12+08:00
---

# El problema del etiquetado de Taiwán en los estándares internacionales

> **Resumen de 30 segundos:** En la infraestructura digital global, Taiwán frecuentemente aparece etiquetado como «Taiwan, Province of China» (Taiwán, Provincia de China). Esta etiqueta surge de la Resolución 2758 de la Asamblea General de las Naciones Unidas en 1971, que remodeló el panorama político internacional después de que la República Popular China ocupara el asiento de China en las Naciones Unidas. El etiquetado ha impactado estándares internacionales como ISO 3166 y se ha extendido a través del software de código abierto y servicios de internet globales. Las comunidades de código abierto continúan impulsando cambios hacia una designación más neutral a través de reportes de bugs y solicitudes de pull requests.

En la infraestructura digital global, la forma en que se etiqueta a Taiwán refleja desacuerdos políticos internacionales que se extienden durante más de medio siglo. Desde ISO 3166 hasta la interfaz de selección de sitios espejo en Ubuntu, un detalle técnico aparentemente simple en la superficie expresa un desacuerdo irresuelto sobre la identidad política de Taiwán dentro del sistema internacional.

## Contexto histórico: de la Resolución 2758 de la ONU a ISO 3166

En 1971, la Asamblea General de las Naciones Unidas aprobó la Resolución 2758, que determinó que «el asiento de China en las Naciones Unidas» sería ocupado por la República Popular China. Como resultado, la República de China (台灣) perdió su asiento en las Naciones Unidas. Aunque esta resolución se limitaba originalmente al asiento representativo en la ONU, posteriormente fue ampliamente citada como justificación para la exclusión de Taiwán o su etiquetado de formas específicas en diversas organizaciones internacionales y organismos de establecimiento de normas.[^1]

En diciembre de 1974, se publicó la primera versión de ISO 3166. Desde entonces, la entrada para Taiwán en este estándar ha sido «Taiwan, Province of China» (Taiwán, Provincia de China), una designación que persiste hasta hoy. Aunque ISO 3166-1 asignó a Taiwán el código de dos letras `TW`, la controversia sobre el nombre oficial ha permanecido sin resolverse desde entonces.

La posición de ISO es que se basa en datos de la Base de Datos de Nombres Geográficos de la Oficina de Estadística de las Naciones Unidas (UNSD), cuya nomenclatura a su vez se remonta al contexto político posterior a la Resolución 2758. Esto crea un sistema de interdependencias mutuamente reforzadas: los estándares internacionales citan datos de las Naciones Unidas, el software de código abierto cita estándares internacionales, y finalmente «Taiwan, Province of China» aparece en los menús desplegables de desarrolladores en todo el mundo.[^2]

## Las acciones correctivas de la comunidad de software de código abierto

El Bug #1138121 de Ubuntu (reportado en 2013) es uno de los casos más citados. Cuando los usuarios taiwaneses seleccionaban un sitio espejo de fuentes de software, veían que «Taiwan, Province of China» aparecía en la interfaz, lo que generaba inquietud en muchos. El reportero sugirió usar el campo del nombre común en ISO 3166, es decir, simplemente «Taiwan» (Taiwán), en lugar del nombre oficial completo.

Problemas similares han surgido de manera recurrente en otros proyectos de código abierto. El Issue #43 en ISO-3166-Countries-with-Regional-Codes, el PR 138672 en FreeBSD y el Issue #1938892 en Drupal todos registran objeciones de la comunidad respecto a este etiquetado. Las soluciones generalmente implican adoptar datos de CLDR (Repositorio de Datos de Configuración Común de Unicode), que ofrece una designación más neutral para Taiwán.[^3]

Las acciones correctivas de la comunidad de código abierto reflejan la intersección de lo técnico y lo político: los desarrolladores generalmente prefieren adoptar designaciones más neutras, pero están limitados por consideraciones sobre «cumplir con estándares internacionales», lo que frecuentemente requiere discusiones comunitarias prolongadas. Algunos mantenedores también han optado por evitar el tema completamente. Miembros de la comunidad g0v como chewei han documentado sistemáticamente casos relacionados, registrando la amplitud del problema de etiquetado de Taiwán en el ecosistema global de software.

## Un impacto de nomenclatura más amplio

En escenarios formales de organizaciones internacionales, el problema de nomenclatura de Taiwán tiene un alcance más amplio. En la Asamblea Mundial de la Salud (AMS), Taiwán participó alguna vez como observador bajo el nombre de «Taipéi Chino», con invitaciones formales durante ocho asambleas consecutivas de 2009 a 2016; desde 2017, después de que China se opusiera a la participación continuada de Taiwán, las invitaciones se suspendieron y Taiwán no ha recibido invitaciones formales desde entonces.[^6] En la Organización de Aviación Civil Internacional (OACI), Taiwán no ha podido participar como miembro formal en la toma de decisiones y durante mucho tiempo ha dependido de canales informales para obtener información sobre normas técnicas aeronáuticas, lo que constituye una posible brecha en el flujo de información sobre seguridad aérea. En los Juegos Olímpicos, Taiwán ha participado desde 1981 bajo el nombre de «Taipéi Chino» — una designación que surge del Acuerdo de Lausana, un tratado firmado en 1981 entre el Comité Olímpico Internacional y el Comité Olímpico Chino. Esta solución de compromiso también ha sido adoptada por muchas organizaciones internacionales no gubernamentales y extendida a contextos como la APEC.

El problema de nomenclatura ha adquirido nuevas dimensiones en la era digital. Más allá de ISO 3166, el código bancario SWIFT, los códigos de aeropuertos de la OACI y las bases de datos geográficas de diversos gobiernos nacionales utilizan diferentes formas de etiquetar a Taiwán, sin un estándar unificado.

La designación oficial en ISO 3166-1 en sí no ha cambiado hasta hoy, y cómo empresas individuales y proyectos de software muestran a Taiwán sigue siendo una decisión caso por caso.

## El cambio del diseño del pasaporte en 2020

El **2 de septiembre de 2020**, el Ministerio de Asuntos Exteriores de la República de China anunció el nuevo diseño de pasaporte: el texto «REPUBLIC OF CHINA» (República de China) en la portada original se redujo significativamente (conservando el emblema nacional), mientras que la palabra «TAIWAN» (Taiwán) se amplió considerablemente para estar a la par con «REPUBLIC OF CHINA». Este cambio respondió a incidentes ocurridos durante la pandemia de COVID-19 en los que viajeros taiwaneses fueron rechazados en múltiples países debido a la confusión sobre su nacionalidad, lo que representó el primer esfuerzo del gobierno de Taiwán en abordar la «confusión de designación soberana» a través del diseño de pasaportes. El nuevo pasaporte comenzó a emitirse el **1 de enero de 2021**.[^4]

## La controversia de «Taipéi Chino» en los Juegos de París 2024

Durante los **Juegos Olímpicos de París en julio-agosto de 2024**, Taiwán participó bajo el nombre de «Taipéi Chino», pero hubo discrepancias significativas en cómo se tradujo este nombre. En múltiples plataformas de redes sociales chinas, se utilizó la traducción «中國台北» (China Taipéi), que diverge claramente de la traducción oficial del Comité Olímpico que establece «Chinese Taipei = 中華台北» (Taiwán Chino). Durante los Juegos Olímpicos, atletas taiwaneses experimentaron actos de manipulación de banderas por parte de espectadores chinos, y delegaciones de taiwaneses en el extranjero fueron interferidas por personal chino, lo que reavivó las reflexiones de la sociedad taiwanesa sobre el Acuerdo de Lausana de 1981.[^5]

## Casos de presión de corporaciones transnacionales

La expansión de las presiones chinas sobre el «Principio de una sola China» se ha generalizado ampliamente en el ámbito corporativo transnacional desde finales de la década de 2010. **China Airlines** ha mantenido durante años el nombre «China Airlines» (Aerolíneas de China) en sus rutas internacionales, lo que ha generado controversias internas sobre la identidad nacional taiwanesa (durante el período de diplomacia de mascarillas por COVID-19 en 2020, una petición en Change.org sobre el cambio de nombre de China Airlines reunió aproximadamente 40,000 firmas). Corporaciones como **Delta Air Lines**, **Marriott Hotels**, **United Airlines** y **Zara** han sido presionadas por la Administración de Aviación Civil de China o la Oficina del Ciberespacio de China después de que sus sitios web enumeraran a «Taiwán» como un país, y han sido obligadas a cambiar las designaciones por «Taiwan, China» (Taiwán, China) o «Taiwan Area» (Área de Taiwán). Estos casos demuestran que el «poder político de los estándares ISO» se ha extendido desde el ámbito técnico hacia convertirse en una herramienta de presión geopolítica.

## Perspectiva: La postura de China

Desde la perspectiva oficial de la República Popular China, el «Principio de una sola China» es la base política de las relaciones entre ambos lados del estrecho. Sostiene que la República Popular China es el único gobierno legítimo de China y que Taiwán es una provincia de la República Popular China (con rango administrativo de «Provincia de Taiwán»). Esta postura ha impactado directamente la designación de Taiwán en ISO 3166 desde 1974 como «Taiwan, Province of China» (Taiwán, Provincia de China). Comprender el problema del etiquetado de Taiwán en los estándares internacionales requiere simultáneamente examinar la postura de oposición del gobierno de la República de China, las afirmaciones de la República Popular China, así como el espectro diverso de identidades políticas dentro de la sociedad taiwanesa — estas tres perspectivas no son idénticas y tampoco pueden reducirse una a la otra.

## La Torre de Babel de la soberanía: sovereignty preservation

El problema del etiquetado de Taiwán en los estándares internacionales, en esencia, es una cuestión de **infraestructura de preservación de soberanía**. Permitir que la voz en primera persona de Taiwán exista en cada idioma, cada sistema, cada base de datos, es la forma de mantener a Taiwán visible como un ente político independiente en la era de la información. Cada reporte de bug, cada solicitud de pull request, cada actualización de diseño de pasaporte, representa un ladrillo en esta infraestructura fundamental.

## Referencias

## Lecturas recomendadas

- [Comunidad g0v — Compilación sobre el problema del etiquetado de Taiwán](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Base de datos de ejemplos sobre el etiquetado de Taiwán en software de código abierto recopilada por chewei
- [Plataforma de consulta en línea de ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Consulta la designación actual de Taiwán en ISO 3166-1

[^1]: [Resolución 2758 de la Asamblea General de la ONU (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Texto completo de la resolución que decidió que el asiento de China en las Naciones Unidas sería ocupado por la República Popular China.

[^2]: [Agencia de Mantenimiento de ISO 3166 — Plataforma de Consulta en Línea](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Entrada de ISO 3166-1 para Taiwán, incluyendo el código TW y el nombre oficial.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Reporte original del problema de etiquetado de Taiwán en la interfaz de fuentes de software de Ubuntu, 2013.

[^4]: [El nuevo diseño de la portada del pasaporte amplía las letras TAIWAN, con emisión programada para enero de 2021](https://www.cna.com.tw/news/firstnews/202009020019.aspx) — Reporte de la Agencia Central de Noticias del 2 de septiembre de 2020. El Ministerio de Asuntos Exteriores anuncia el nuevo diseño de portada de pasaporte con el texto TAIWÁN ampliado, comenzando la emisión en enero de 2021.

[^5]: [Comité Olímpico Internacional — Acuerdo del Comité Olímpico de Taipéi Chino](https://www.olympic.org/) — El Acuerdo de Lausana de 1981 estableció el nombre «Chinese Taipei» (Taipéi Chino); durante los Juegos de París 2024, China causó controversia al traducir erróneamente el nombre como «中國台北» (China Taipéi).

[^6]: [Ministerio de Salud y Bienestar de la República de China — Explicación sobre la participación de Taiwán en la OMS](https://www.mohw.gov.tw/) — Taiwán participó como observador en la Asamblea Mundial de la Salud de 2009 a 2016, sin invitaciones formales desde 2017 en adelante; para contexto sobre la exclusión de la OACI, véanse explicaciones relacionadas del Ministerio de Asuntos Exteriores.
