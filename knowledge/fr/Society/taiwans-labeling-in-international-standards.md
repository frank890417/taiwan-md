---
title: "La question de l'étiquetage de Taïwan dans les normes internationales"
description: "Des codes ISO aux logiciels open source — comment le nom de Taïwan est écrit, contesté et corrigé dans l'infrastructure numérique mondiale"
date: 2026-03-18
author: 'Taiwan.md Contributors'
category: 'Society'
subcategory: '國際關係'
tags:
  [
    'ISO 3166',
    'normes internationales',
    'logiciel open source',
    'g0v',
    'souveraineté numérique',
    'étiquetage de Taïwan',
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

# La question de l'étiquetage de Taïwan dans les normes internationales

> **En bref (30 secondes) :** Dans l'infrastructure numérique mondiale, Taïwan est fréquemment étiqueté « Taiwan, Province of China ». Cet étiquetage découle du paysage politique international issu de la résolution 2758 de l'Assemblée générale des Nations Unies en 1971, a influencé des normes internationales telles que l'ISO 3166, et s'est étendu aux logiciels open source et aux services en ligne à travers le monde. La communauté open source continue de promouvoir des désignations plus neutres par le biais de rapports de bogues et de _pull requests_.

Dans l'infrastructure numérique mondiale, la manière dont Taïwan est étiqueté reflète un différend international vieux d'un demi-siècle. De l'ISO 3166 à l'interface de sélection des miroirs de Ubuntu, derrière un détail technique se cache la question non résolue de l'identité de Taïwan au sein du système international.

## Contexte historique : de la résolution 2758 de l'ONU à l'ISO 3166

En 1971, la résolution 2758 de l'Assemblée générale des Nations Unies est adoptée, décidant que « le siège de la Chine aux Nations Unies » serait occupé par la République populaire de Chine, la République de Chine perdant ainsi son siège à l'ONU. Cette résolution ne portait initialement que sur la représentation aux Nations Unies, mais elle a ensuite été largement invoquée comme fondement de l'exclusion de Taïwan ou de son étiquetage spécifique dans diverses organisations internationales et organismes de normalisation.[^1]

En 1974, dans la norme internationale ISO 3166, l'intitulé de l'entrée relative à Taïwan est modifié de « Taiwan » à « Taiwan, Province of China », établissant officiellement l'étiquetage utilisé depuis lors. L'ISO 3166-1 attribue simultanément à Taïwan le code à deux lettres `TW`, mais la controverse sur le nom officiel n'a jamais été résolue.

La position de l'ISO est de s'aligner sur la base de données toponymiques de la Division de statistique des Nations Unies (UNSD), dont l'étiquetage remonte au paysage politique post-résolution 2758. Cela crée un système d'interdépendance : les normes internationales citent les données de l'ONU, les logiciels open source citent les normes internationales, et finalement « Taiwan, Province of China » apparaît dans les menus déroulants des développeurs du monde entier.[^2]

## Les actions de correction de la communauté open source

Le bogue Ubuntu n° 1138121 (signalé en 2013) est l'un des cas les plus fréquemment cités. Lorsque des utilisateurs taïwanais sélectionnaient un site miroir de logiciels, ils voyaient « Taiwan, Province of China » apparaître sur l'interface, ce que beaucoup trouvaient problématique. Le rapporteur a suggéré d'utiliser le champ _common name_ de l'ISO 3166, c'est-à-dire simplement « Taiwan », plutôt que le nom officiel complet.

Des problèmes similaires se sont reproduits dans d'autres projets open source. L'issue n° 43 du dépôt ISO-3166-Countries-with-Regional-Codes, le PR 138672 de FreeBSD et l'issue n° 1938892 de Drupal documentent tous les objections de la communauté à cet étiquetage. La solution retenue consiste généralement à utiliser les données CLDR (_Unicode Common Locale Data Repository_), dont l'étiquetage de Taïwan est plus neutre.[^3]

Les actions de correction de la communauté open source illustrent l'intersection entre technologie et politique : les développeurs souhaitent généralement adopter un étiquetage plus neutre, mais, contraints par le respect des « normes internationales », les modifications nécessitent souvent de longues discussions communautaires, et certains mainteneurs choisissent d'éviter la question. chewei, membre de la communauté g0v, compile depuis longtemps des cas pertinents, documentant l'étendue du problème de l'étiquetage de Taïwan dans l'écosystème logiciel mondial.

## Un impact plus large sur la dénomination

Dans le cadre formel des organisations internationales, la question de la dénomination de Taïwan est encore plus vaste. À l'Assemblée mondiale de la Santé (AMS), Taïwan a été invité à participer en qualité d'observateur sous le nom de « Chinese Taipei », de 2009 à 2016 (huit sessions au total) ; à partir de 2017, la Chine s'est opposée à la poursuite de la participation de Taïwan, et les invitations ont cessé, Taïwan n'ayant plus reçu d'invitation officielle depuis.[^6] Au sein de l'Organisation de l'aviation civile internationale (OACI), Taïwan n'a pas non plus pu participer aux décisions en tant que membre officiel, dépendant de canaux informels pour obtenir des informations sur les normes techniques d'aviation, ce qui crée des lacunes potentielles dans la circulation des informations relatives à la sécurité aérienne. Aux Jeux olympiques, Taïwan participe sous le nom de « Chinese Taipei » (中華台北) depuis 1981 — ce nom provient de l'accord de Lausanne signé en 1981 entre le CIO et le Comité olympique chinois. Ce compromis a été repris par de nombreuses organisations internationales non gouvernementales et s'étend à des forums tels que l'APEC.

La question de la dénomination a pris une nouvelle dimension à l'ère numérique. Outre l'ISO 3166, les codes bancaires SWIFT, les codes d'aéroport de l'OACI et les bases de données géographiques des gouvernements nationaux ont chacun des manières différentes d'étiqueter Taïwan, en l'absence de norme unifiée.

Depuis 2023, certaines entreprises technologiques internationales (telles qu'Apple et Google Maps) ont progressivement ajusté le nom affiché pour Taïwan à la suite de signalements d'utilisateurs, mais l'étiquetage officiel de l'ISO 3166-1 lui-même n'a pas changé, ce qui montre que le décalage entre les pratiques des entreprises et les normes internationales continue de se creuser.

## Refonte de la couverture du passeport en 2020

Le **2 septembre 2020**, le ministère des Affaires étrangères de la République de Chine a dévoilé le nouveau design du passeport : l'inscription « REPUBLIC OF CHINA », précédemment bien visible sur la couverture, a été nettement réduite (les armoiries nationales étant conservées), tandis que le mot « TAIWAN » a été considérablement agrandi pour apparaître au même niveau que « REPUBLIC OF CHINA ». Cette modification faisait suite aux incidents survenus durant la pandémie de COVID-19, lorsque des voyageurs taïwanais avaient été refusés à l'entrée de plusieurs pays après avoir été confondus avec des ressortissants chinois. C'est la première fois que le gouvernement taïwanais a répondu concrètement au problème de « confusion d'étiquetage souverain » par le design du passeport. Le nouveau passeport a été mis à compter de **janvier 2021**.[^4]

## La controverse du « Chinese Taipei » aux Jeux olympiques de Paris 2024

Durant les **Jeux olympiques de Paris de juillet-août 2024**, Taïwan a participé sous le nom de « Chinese Taipei », mais sur plusieurs plateformes de médias sociaux chinois, la société civile a traduit ce nom par « 中國台北 » (« Taipei de Chine »), ce qui présente un écart manifeste avec la traduction officiellement établie par le CIO, « Chinese Taipei = 中華台北 ». Des incidents tels que le retrait de drapeaux par des spectateurs chinois lors des compétitions d'athlètes taïwanais et des perturbations de groupes de supporters taïwanais par des responsables chinois ont relancé la réflexion au sein de la société taïwanaise sur l'accord de Lausanne de 1981.[^5]

## Cas de pression exercée sur les entreprises multinationales

La pression exercée par la Chine sur l'extension du « principe d'une seule Chine » s'est considérablement intensifiée à partir de la fin des années 2010 dans le domaine des entreprises multinationales. **China Airlines** (華航) fait l'objet d'un débat interne récurrent sur l'identité nationale taïwanaise en raison de son nom en anglais (pétition de « changement de nom de China Airlines » en 2018). Des entreprises telles que **Delta Air Lines**, **Marriott International**, **United Airlines**, **Zara**, **Starbucks** et **Marriott** ont été contraintes par l'Administration de l'aviation civile de Chine ou par le Bureau national de l'information sur Internet de modifier leurs sites web, où « Taïwan » était listé comme pays, pour le remplacer par « Taïwan, Chine » ou « Région de Taïwan, Chine ». Ces cas montrent que « l'effet politique des normes ISO » s'est étendu du domaine technique à celui de l'outil de pression géopolitique.

## Perspective : la position de la Chine

Du point de vue officiel de la République populaire de Chine, le « principe d'une seule Chine » constitue la politique fondamentale des relations entre les deux rives, affirmant que la République populaire de Chine est le seul gouvernement légitime de la Chine et que Taïwan est une province de la République populaire de Chine (au niveau administratif de la « province de Taïwan »). Cette position a directement influencé l'étiquetage de Taïwan en tant que « Taiwan, Province of China » dans l'ISO 3166 depuis 1974. Comprendre la question de Taïwan dans les normes internationales nécessite de considérer simultanément la position d'opposition du gouvernement de la République de Chine, les revendications de la République populaire de Chine et le spectre diversifié des identités au sein de la société taïwanaise — ces trois dimensions ne sont ni cohérentes ni réductibles les unes aux autres.

## La tour de Babel de la souveraineté : _sovereignty preservation_

La question de l'étiquetage de Taïwan dans les normes internationales est, par nature, une question d'**infrastructure de préservation de la souveraineté** (_sovereignty preservation infrastructure_). Faire en sorte que la voix de première personne de Taïwan existe dans chaque langue, chaque système et chaque base de données est le moyen de maintenir la visibilité de Taïwan en tant que sujet politique indépendant à l'ère de l'information. Chaque rapport de bogue, chaque _pull request_, chaque mise à jour du design du passeport constitue une brique de cette infrastructure.

## Références

[^1]: [Résolution 2758 de l'Assemblée générale des Nations Unies (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Texte intégral de la résolution décidant que le siège de la Chine aux Nations Unies serait occupé par la République populaire de Chine.

[^2]: [ISO 3166 Maintenance Agency — Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Entrée relative à Taïwan dans l'ISO 3166-1, incluant le code TW et le nom officiel.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Signalement original du problème d'étiquetage de Taïwan dans l'interface de sources logicielles de Ubuntu, 2013.

[^4]: [Ministère des Affaires étrangères de la République de Chine — Présentation du nouveau passeport](https://www.mofa.gov.tw/) — Nouveau design du passeport annoncé le 2 septembre 2020, avec agrandissement du mot « TAIWAN », mis en circulation à partir de janvier 2021.

[^5]: [Comité international olympique — Accord du Comité olympique de Chinese Taipei](https://www.olympic.org/) — L'accord de Lausanne de 1981 a établi le nom « Chinese Taipei » ; durant les JO de Paris 2024, la traduction erronée « 中國台北 » par la Chine a suscité une controverse.

[^6]: [Ministère de la Santé et du Bien-être de la République de Chine — Explication sur la participation de Taïwan à l'OMS](https://www.mohw.gov.tw/) — Taïwan a participé en tant qu'observateur à l'AMS de 2009 à 2016, et n'a plus été invité à partir de 2017 ; le contexte de l'exclusion de l'OACI est également documenté dans les déclarations du ministère des Affaires étrangères.

## Pour aller plus loin

- [Communauté g0v — Compilation des problèmes d'étiquetage de Taïwan](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Base de cas d'étiquetage de Taïwan dans les logiciels open source, compilée par chewei
- [Plateforme de consultation en ligne de l'ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Consulter l'étiquetage actuel de Taïwan dans l'ISO 3166-1
