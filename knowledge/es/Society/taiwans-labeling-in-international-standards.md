---
title: 'El problema de etiquetado de Taiwán en los estándares internacionales'
description: 'De los códigos ISO al software de código abierto: cómo el nombre de Taiwán se escribe, se disputa y se corrige en la infraestructura digital global'
date: 2026-03-18
author: 'Taiwan.md Contributors'
category: 'Society'
subcategory: '國際關係'
tags:
  [
    'ISO 3166',
    'estándares internacionales',
    'software de código abierto',
    'g0v',
    'soberanía digital',
    'etiquetado de Taiwán',
  ]
lastVerified: 2026-03-19
lastHumanReview: false
featured: false
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: '18157ab5d'
sourceContentHash: 'sha256:474db7988470495f'
sourceBodyHash: 'sha256:288ae1e41983889d'
translatedAt: '2026-05-15T15:39:40+08:00'
---

# El problema de etiquetado de Taiwán en los estándares internacionales

> **Resumen en 30 segundos:** En la infraestructura digital global, Taiwán suele aparecer etiquetado como «Taiwan, Province of China». Este etiquetado se deriva del panorama político internacional posterior a la Resolución 2758 de la Asamblea General de las Naciones Unidas en 1971, ha influido en estándares internacionales como ISO 3166 y se ha extendido al software de código abierto y los servicios en línea a nivel mundial. La comunidad de código abierto continúa impulsando formas de etiquetado más neutrales mediante informes de errores (_bug reports_) y solicitudes de incorporación de cambios (_pull requests_).

En la infraestructura digital global, la forma en que se etiqueta a Taiwán refleja un desacuerdo político internacional de más de medio siglo. Desde ISO 3166 hasta la interfaz de selección de espejos (_mirror sites_) de Ubuntu, detrás de un detalle técnico se encuentra la disputa irresuelta sobre la identidad de Taiwán en el sistema internacional.

## Contexto histórico: de la Resolución 2758 de la ONU a ISO 3166

En 1971, la Resolución 2758 de la Asamblea General de las Naciones Unidas fue aprobada, decidiendo que la «representación de China en las Naciones Unidas» sería ejercida por la República Popular China, por lo que la República de China perdió su asiento en la ONU. Dicha resolución originalmente solo concernía a la representación en las Naciones Unidas, pero posteriormente fue ampliamente invocada como base para la exclusión de Taiwán o su etiquetado de manera específica en diversas organizaciones internacionales y organismos de normalización.[^1]

En 1974, el nombre de la entrada de Taiwán en el estándar internacional ISO 3166 fue cambiado de «Taiwan» a «Taiwan, Province of China», estableciendo formalmente el etiquetado que se ha mantenido vigente desde entonces. ISO 3166-1 asignó simultáneamente a Taiwán el código de dos letras `TW`, pero la disputa sobre el nombre oficial ha continuado sin resolverse desde entonces.

La postura de la ISO es seguir la base de datos de nombres geográficos de la División de Estadística de las Naciones Unidas (UNSD), cuyo etiquetado a su vez se remite al panorama político posterior a la Resolución 2758. Esto forma un sistema de dependencia mutua: los estándares internacionales citan datos de la ONU, el software de código abierto cita los estándares internacionales, y finalmente «Taiwan, Province of China» aparece en los menús desplegables de desarrolladores de todo el mundo.[^2]

## Acciones correctivas de la comunidad de software de código abierto

El informe de errores #1138121 de Ubuntu (reportado en 2013) es uno de los casos más citados. Cuando los usuarios taiwaneses seleccionaban un espejo de origen de software, veían «Taiwan, Province of China» en la interfaz, lo cual resultaba problemático para muchos. El reportante sugirió utilizar el campo _common name_ de ISO 3166, es decir, simplemente «Taiwan», en lugar del nombre oficial completo.

Problemas similares han surgido repetidamente en otros proyectos de código abierto. El Issue #43 de ISO-3166-Countries-with-Regional-Codes, el PR 138672 de FreeBSD y el Issue #1938892 de Drupal documentan las objeciones de la comunidad a este etiquetado. La solución habitualmente adoptada es cambiar a los datos del CLDR (_Unicode Common Locale Data Repository_), cuyo etiquetado de Taiwán es más neutral.[^3]

Las acciones correctivas de la comunidad de código abierto reflejan la intersección entre tecnología y política: los desarrolladores generalmente desean adoptar un etiquetado más neutral, pero están limitados por la consideración de «seguir los estándares internacionales»; las modificaciones a menudo requieren largas discusiones comunitarias, y algunos mantenedores optan por evitar el tema. El miembro de la comunidad g0v, chewei, ha recopilado casos relacionados durante un largo periodo, documentando la amplitud del problema del etiquetado de Taiwán en el ecosistema de software global.

## Un impacto más amplio en la denominación

En el ámbito formal de las organizaciones internacionales, el problema de la denominación de Taiwán tiene un alcance aún mayor. En la Asamblea Mundial de la Salud (WHA), Taiwán fue invitado a participar como observador bajo la identidad de «Chinese Taipei», entre 2009 y 2016 (un total de ocho sesiones); a partir de 2017, China se opuso a la continuación de la participación de Taiwán, y las invitaciones se interrumpieron, por lo que Taiwán no ha recibido una invitación formal desde entonces.[^6] En la Organización de Aviación Civil Internacional (OACI), Taiwán tampoco ha podido participar en la toma de decisiones como miembro formal, dependiendo durante mucho tiempo de canales informales para obtener información sobre estándares técnicos aeronáuticos, lo que ha generado una brecha potencial en el flujo de información sobre seguridad aérea. En los Juegos Olímpicos, Taiwán participa bajo el nombre de «Chinese Taipei» (中華台北) desde 1981 — este nombre proviene del Acuerdo de Lausana firmado en 1981 entre el Comité Olímpico Internacional y el Comité Olímpico Chino. Este compromiso también ha sido adoptado por muchas organizaciones internacionales no gubernamentales y se ha extendido a foros como APEC.

El problema de la denominación ha adquirido nuevas dimensiones en la era digital. Además de ISO 3166, los códigos bancarios SWIFT, los códigos de aeropuerto de la OACI y las bases de datos geográficas de los gobiernos de distintos países tienen cada uno formas diferentes de etiquetar a Taiwán, careciendo de un estándar unificado.

Desde 2023, algunas empresas tecnológicas internacionales (como Apple y Google Maps) han ajustado gradualmente el nombre mostrado de Taiwán tras recibir reportes de usuarios, pero el etiquetado oficial de ISO 3166-1 en sí no ha cambiado, lo que indica que la desconexión entre la implementación empresarial y los estándares internacionales sigue ampliándose.

## Cambio en la cubierta del pasaporte en 2020

El **2 de septiembre de 2020**, el Ministerio de Relaciones Exteriores de la República de China presentó el nuevo diseño del pasaporte: la inscripción «REPUBLIC OF CHINA» en la cubierta se redujo notablemente (aunque se conservó el escudo nacional), mientras que la inscripción «TAIWAN» se amplió significativamente hasta quedar al mismo nivel que «REPUBLIC OF CHINA». Este cambio respondió a incidentes durante la pandemia de COVID-19 en los que viajeros taiwaneses fueron confundidos con ciudadanos chinos y se les denegó la entrada en varios países, constituyendo la primera vez que el gobierno taiwanés abordaba mediante el diseño del pasaporte el problema concreto de la «confusión en la identificación soberana». El nuevo pasaporte comenzó a emitirse en **enero de 2021**.[^4]

## La controversia de Chinese Taipei en los Juegos Olímpicos de París 2024

Durante los **Juegos Olímpicos de París de julio-agosto de 2024**, Taiwán participó bajo el nombre de «Chinese Taipei», pero la sociedad civil china tradujo ese nombre como «中国台北» (_Zhōngguó Táiběi_, 'Taipéi de China') en múltiples plataformas de redes sociales, lo cual presenta una diferencia clara con la traducción oficial establecida por el COI: «Chinese Taipei = 中華台北» (_Zhōnghuá Táiběi_, 'Taipéi Chino'). Incidentes como la confiscación de banderas de Taiwán por parte de espectadores chinos durante los Juegos y la interferencia de delegaciones chinas contra grupos de apoyo taiwaneses provocaron una nueva reflexión en la sociedad taiwanesa sobre el Acuerdo de Lausana de 1981.[^5]

## Casos de presión sobre empresas multinacionales

La presión extendida de China sobre el «principio de una sola China» se expandió significativamente al ámbito de las empresas multinacionales a finales de la década de 2010. **China Airlines** ha generado durante años un debate interno sobre la identidad nacional taiwanesa debido al uso de su nombre en inglés a nivel internacional (la petición de «cambio de nombre de China Airlines» en 2018). Empresas como **Delta Air Lines**, **Marriott International**, **United Airlines**, **Zara**, **Starbucks** y **Marriott** fueron presionadas por la Administración de Aviación Civil de China o la Oficina de Información de Internet (CAC) por listar a «Taiwán» como país en sus sitios web, y se vieron obligadas a cambiarlo por «中国台湾» (_Zhōngguó Táiwān_, 'Taiwán de China') o «中国台湾地区» (_Zhōngguó Táiwān Dìqū_, 'Región de Taiwán de China'). Estos casos demuestran que la «eficacia política de los estándares ISO» se ha expandido del ámbito técnico a una herramienta de presión geopolítica.

## Perspectiva: la postura de China

Desde la postura oficial de la República Popular China, el «principio de una sola China» es la base política de las relaciones entre las dos orillas, sosteniendo que la República Popular China es el único gobierno legítimo de China y que Taiwán es una provincia de la República Popular China (con nivel administrativo de «provincia de Taiwán»). Esta postura influyó directamente en el etiquetado de Taiwán como «Taiwan, Province of China» en ISO 3166 a partir de 1974. Para comprender el problema de Taiwán en los estándares internacionales, es necesario ver simultáneamente la postura de oposición del gobierno de la República de China, la reivindicación de la República Popular China y el diverso espectro de identidades en la sociedad taiwanesa: estos tres elementos no son coincidentes ni pueden reducirse entre sí.

## La Torre de Babel de la soberanía: preservación de la soberanía

El problema del etiquetado de Taiwán en los estándares internacionales es, en esencia, una cuestión de **infraestructura de preservación de la soberanía**. Garantizar que la voz en primera persona de Taiwán exista en cada idioma, cada sistema y cada base de datos es la forma de mantener a Taiwán visible como un sujeto político independiente en la era de la información. Cada informe de errores, cada solicitud de incorporación de cambios y cada actualización del diseño del pasaporte son un ladrillo más en esta infraestructura.

## Referencias

[^1]: [Resolución 2758 de la Asamblea General de las Naciones Unidas (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Texto completo de la resolución que decidió que la representación de China en la ONU sería ejercida por la República Popular China.

[^2]: [ISO 3166 Maintenance Agency — Plataforma de consulta en línea](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Entrada de Taiwán en ISO 3166-1, con el código TW y el nombre oficial.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Reporte original del problema de etiquetado de Taiwán en la interfaz de orígenes de software de Ubuntu, 2013.

[^4]: [Ministerio de Relaciones Exteriores de la República de China — Información sobre el nuevo pasaporte](https://www.mofa.gov.tw/) — Presentación del nuevo diseño del pasaporte el 2 de septiembre de 2020, con la inscripción TAIWAN ampliada; emisión a partir de enero de 2021.

[^5]: [Comité Olímpico Internacional — Acuerdo del Comité Olímpico de Chinese Taipei](https://www.olympic.org/) — El Acuerdo de Lausana de 1981 estableció el nombre «Chinese Taipei»; durante los Juegos Olímpicos de París 2024, la traducción errónea de China como «中国台北» generó controversia.

[^6]: [Ministerio de Salud y Bienestar de la República de China — Información sobre la participación de Taiwán en la OMS](https://www.mohw.gov.tw/) — Taiwán participó como observador en la WHA entre 2009 y 2016; a partir de 2017 no ha sido invitado de nuevo. Sobre la exclusión de la OACI, véanse las explicaciones pertinentes del Ministerio de Relaciones Exteriores.

## Lecturas complementarias

- [Comunidad g0v — Recopilación sobre el problema del etiquetado de Taiwán](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Base de datos de casos de etiquetado de Taiwán en software de código abierto recopilada por chewei
- [Plataforma de consulta en línea de ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Consultar el etiquetado vigente de Taiwán en ISO 3166-1
