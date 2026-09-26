---
title: 'Taïwan dans les normes internationales : le problème de la dénomination'
description: 'Des codes ISO aux logiciels libres — comment le nom de Taïwan est écrit, contesté et corrigé dans les infrastructures numériques mondiales'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'normes internationales',
    'logiciels libres',
    'g0v',
    'souveraineté numérique',
    'dénomination de Taïwan',
  ]
subcategory: '國際關係'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: 'd7b843fbf'
sourceContentHash: 'sha256:c6d4e2074d20efa4'
sourceBodyHash: 'sha256:234ae4c6ee15c7e0'
translatedAt: '2026-09-26T11:10:12+08:00'
---

# Taïwan dans les normes internationales : le problème de la dénomination

> **Vue d'ensemble en 30 secondes :** Dans les infrastructures numériques mondiales, Taïwan est souvent désignée sous le terme « Taïwan, Province de Chine ». Cette dénomination découle de la résolution 2758 de l'Assemblée générale des Nations unies en 1971, qui a déterminé l'équilibre politique international et affecte les normes internationales comme l'ISO 3166. Elle s'étend aux logiciels libres et services en ligne mondiaux. Les communautés de développeurs poussent continuellement pour des dénominations plus neutres par le biais de rapports de bogues et de demandes de tirage.

À travers les infrastructures numériques mondiales, la façon dont Taïwan est désignée reflète plus d'un demi-siècle de divergence politique internationale. Du code ISO 3166 aux interfaces de sélection des mirroirs Ubuntu, derrière ce détail technique se cache le statut inachevé de Taïwan au sein du système international.

## Contexte historique : Résolution 2758 de l'ONU à l'ISO 3166

En 1971, la résolution 2758 de l'Assemblée générale des Nations unies a été adoptée, décidant que le siège de « la Chine » aux Nations unies serait représenté par la République populaire de Chine, ce qui a conduit la République de Chine à perdre son siège. Cette résolution visait initialement à déterminer la représentation aux Nations unies, mais elle a été largement invoquée par la suite comme base pour l'exclusion ou la désignation particulière de Taïwan dans diverses organisations internationales et organes de normalisation. [^1]

En décembre 1974, l'ISO 3166 a été publié pour la première fois, et le nom de l'entrée taïwanaise était « Taïwan, Province de Chine » depuis ce moment, et continue à l'être jusqu'à aujourd'hui. L'ISO 3166-1 attribue simultanément à Taïwan le code à deux lettres `TW`, mais la controverse concernant le nom officiel persiste depuis.

La position de l'ISO est de suivre la base de données géographique du Bureau de la statistique des Nations unies (UNSD), dont les dénominations remontent à l'équilibre politique qui a suivi la résolution 2758 de l'ONU. Cela crée un système d'interdépendance mutuelle : les normes internationales citent les données des Nations unies, les logiciels libres citent les normes internationales, et finalement « Taïwan, Province de Chine » apparaît dans les listes déroulantes des développeurs du monde entier. [^2]

## Actions de correction par la communauté des logiciels libres

Le bug Ubuntu #1138121 (signalé en 2013) est l'un des cas les plus cités. Lorsque les utilisateurs taïwanais choisissaient les mirroirs de sources logicielles, beaucoup étaient perturbés de voir « Taïwan, Province de Chine » apparaître à l'écran. Le rapporteur a suggéré d'utiliser plutôt le champ « common name » de l'ISO 3166, c'est-à-dire simplement « Taïwan », plutôt que le nom officiel complet.

Des problèmes similaires ont resurgi dans d'autres projets open-source. Le problème n°43 du projet ISO-3166-Countries-with-Regional-Codes, la demande de tirage (PR) 138672 de FreeBSD et le problème #1938892 de Drupal documentent tous les objections de la communauté envers cette dénomination. Les solutions consistent généralement à utiliser plutôt les données de la CLDR (Référentiel de données régionales communes Unicode), qui adopte une désignation plus neutre pour Taïwan. [^3]

Les actions correctrices de la communauté open-source reflètent l'intersection entre technologie et politique : les développeurs souhaitent généralement adopter des dénominations plus neutres, mais sont limités par la considération de « conformité aux normes internationales ». Les modifications nécessitent souvent des discussions communautaires prolongées, et certains mainteneurs choisissent d'éviter cette question. Chewei, un membre de la communauté g0v, a systématiquement compilé les cas pertinents et documenté l'étendue du problème de la dénomination taïwanaise dans l'écosystème logiciel mondial.

## L'impact plus large de la dénomination

Dans les contextes officiels des organisations internationales, le problème de la dénomination taïwanaise a une portée plus large. À l'Assemblée mondiale de la santé (AMS), Taïwan a autrefois reçu des invitations en tant qu'observatrice de 2009 à 2016 (huit sessions au total) ; depuis 2017, la Chine s'oppose à la participation continue de Taïwan, les invitations ont cessé, et Taïwan n'a plus reçu d'invitation officielle. [^6] À l'Organisation de l'aviation civile internationale (OACI), Taïwan ne peut pas participer formellement aux processus décisionnels en tant que membre à part entière, et dépend depuis longtemps des canaux informels pour accéder aux normes techniques aéronautiques, créant une lacune potentielle dans la circulation des informations de sécurité aérienne. Aux Jeux olympiques, Taïwan participe depuis 1981 sous le nom de « Taipei chinois » — ce nom provient de l'accord de Lausanne signé en 1981 entre le Comité international olympique et le Comité olympique de la République de Chine. Ce compromis a également été adopté par de nombreuses organisations internationales non gouvernementales et étendu à des occasions comme l'APEC.

Le problème de la dénomination a pris une nouvelle dimension à l'ère numérique. Au-delà de l'ISO 3166, les codes SWIFT de banque, les codes d'aéroport de l'OACI, et les bases de données géographiques des gouvernements nationaux utilisent tous différentes façons de désigner Taïwan, sans normes unifiées.

La désignation officielle dans l'ISO 3166-1 n'a pas changé à ce jour, et la manière dont chaque entreprise ou projet logiciel affiche Taïwan reste décidée au cas par cas.

## Changement de la couverture du passeport en 2020

**Le 2 septembre 2020**, le ministère des Affaires étrangères de la République de Chine a publié un nouveau design de passeport : les mots « REPUBLIC OF CHINA » sur la couverture d'origine ont été considérablement réduits (le sceau national a été conservé), tandis que les mots « TAIWAN » ont été considérablement agrandis pour être à parité avec « REPUBLIC OF CHINA ». Ce changement répondait aux incidents survenus pendant la pandémie de COVID-19, au cours desquels des voyageurs taïwanais ont été refusés à l'entrée dans plusieurs pays en raison d'une confusion avec la Chine continentale, marquant la première fois que le gouvernement taïwanais réagissait à la « confusion des désignations de souveraineté » par le biais de la conception des passeports. Le nouveau passeport est entré en circulation à partir de **janvier 2021**. [^4]

## Controverse sur « Taipei chinois » aux Jeux olympiques de Paris 2024

**Durant les Jeux olympiques de Paris de juillet à août 2024**, Taïwan a participé sous le nom « Taipei chinois » (Chinese Taipei), mais les utilisateurs chinois sur plusieurs plateformes de médias sociaux ont traduit ce nom par « Taipei chinoise » (中国台北), ce qui s'écarte clairement de la traduction officiellement désignée par le Comité olympique « Chinese Taipei = Taipei chinoise ». Pendant les Jeux olympiques, les athlètes taïwanais ont connu des incidents tels que des drapeaux saisis par des spectateurs chinois, et les délégations amies de taïwanais ont subi des interférences de la part des délégations chinoises, ce qui a ravivé la réflexion taïwanaise sur l'accord de Lausanne de 1981. [^5]

## Cas de pression exercée par les entreprises multinationales

À partir de la fin de la décennie 2010, les pressions exercées par la Chine sur le « principe d'une seule Chine » se sont largement étendues au domaine des entreprises multinationales. **China Airlines** a longtemps utilisé le nom « China Airlines » sur les lignes internationales, soulevant des controverses internes sur l'identité nationale taïwanaise (en 2020, pendant la diplomatie des masques liée à la pandémie, une pétition Change.org demandant « le changement de nom de China Airlines » a reçu environ 40 000 signatures). **Delta Air Lines**, **Marriott Hotels**, **United Airlines**, **Zara** et d'autres entreprises ont subi des pressions de l'Administration de l'aviation civile chinoise ou du Bureau de l'administration du cyberespace après que leurs sites web aient listé « Taïwan » comme pays, les forçant à changer en « Taïwan, Chine » ou « région de Taïwan, Chine ». Ces cas illustrent comment « le pouvoir politique des normes ISO » s'est étendu du domaine technique au domaine de la pression géopolitique.

## Perspective : point de vue chinois

Du point de vue officiel de la République populaire de Chine, le « principe d'une seule Chine » est la base politique des relations entre les deux rives du détroit, soutenant que la République populaire de Chine est le seul gouvernement légal de la Chine et que Taïwan est une province de la République populaire de Chine (au niveau administratif de « Province de Taïwan »). Cette position a directement influencé la désignation « Taïwan, Province de Chine » dans l'ISO 3166 depuis 1974. Comprendre le problème de Taïwan dans les normes internationales exige de considérer simultanément la position d'opposition du gouvernement de la République de Chine, les revendications de la République populaire de Chine, et le spectre pluriel des identités au sein de la société taïwanaise — ces trois éléments ne sont pas en accord et ne peuvent pas être réduits l'un à l'autre.

## La tour de Babel de la souveraineté : preservation de la souveraineté

Le problème de la dénomination de Taïwan dans les normes internationales est essentiellement une question d'**infrastructure de préservation de la souveraineté**. Laisser la voix en première personne de Taïwan exister dans chaque langue, chaque système, et chaque base de données, est le moyen de maintenir Taïwan comme sujet politique indépendant et visible à l'ère de l'information. Chaque rapport de bogue, chaque demande de tirage, chaque mise à jour de la conception du passeport est une pierre dans cette infrastructure.

## Références

[^1]: [Résolution 2758 de l'Assemblée générale des Nations unies (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Texte intégral de la résolution décidant que le siège de la Chine aux Nations unies sera représenté par la République populaire de Chine.

[^2]: [ISO 3166 Maintenance Agency — Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Entrée taïwanaise de l'ISO 3166-1, incluant le code TW et le nom officiel.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Rapport initial du problème de dénomination taïwanaise dans l'interface des sources logicielles d'Ubuntu, en 2013.

[^4]: [Passeport redesigné avec agrandissement du mot TAIWAN, lancé en janvier 2021](https://www.cna.com.tw/news/firstnews/202009020019.aspx) — Reportage de l'agence centrale de presse taïwanaise du 2 septembre 2020, le ministère des Affaires étrangères annonce le nouveau design de couverture de passeport avec agrandissement du mot TAIWAN, lancé en janvier 2021.

[^5]: [Comité International Olympique — Accord des Jeux olympiques de Taipei chinoise](https://www.olympic.org/) — L'accord de Lausanne de 1981 établit le nom « Taipei chinoise » ; pendant les Jeux olympiques de Paris 2024, la traduction chinoise « Taipei chinoise » par la Chine a suscité la controverse.

[^6]: [Ministère de la Santé et du Bien-être social de la République de Chine — Explication de la participation de Taïwan à l'OMS](https://www.mohw.gov.tw/) — Taïwan a participé à l'AMS en tant qu'observatrice de 2009 à 2016, n'a plus reçu d'invitation depuis 2017 ; les antécédents d'exclusion par l'OACI sont également explicités dans les explications pertinentes du ministère des Affaires étrangères.

## Lecture complémentaire

- [Communauté g0v — Compilation des problèmes de dénomination taïwanaise](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Base de données des cas de dénomination taïwanaise dans les logiciels libres compilée par chewei
- [Plateforme de consultation en ligne ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Consulter la désignation taïwanaise actuelle dans l'ISO 3166-1
