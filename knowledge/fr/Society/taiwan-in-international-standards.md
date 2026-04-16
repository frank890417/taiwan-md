---
title: 'La question de la désignation de Taïwan dans les normes internationales'
description: 'Des codes ISO aux logiciels open source — comment le nom de Taïwan est écrit, contesté et corrigé dans l'infrastructure numérique mondiale'
date: 2026-03-18
category: 'Society'
tags: ['ISO 3166', 'normes internationales', 'open source', 'g0v', 'souveraineté numérique', 'désignation de Taïwan']
subcategory: 'Relations internationales'
author: 'Taiwan.md Translation Team'
difficulty: 'intermediate'
readingTime: 10
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
---

# La question de la désignation de Taïwan dans les normes internationales

Au sein de l'infrastructure numérique mondiale, une question d'apparence technique cache en réalité des enjeux politiques et identitaires profondément sensibles : comment Taïwan doit-il être désigné dans les normes internationales et les systèmes logiciels ? De la norme ISO 3166 aux innombrables projets open source, la désignation « Taiwan, Province of China » suscite des débats persistants et des initiatives de correction.

## Le cœur du problème : la norme ISO 3166-1

ISO 3166-1 est la norme établie par l'Organisation internationale de normalisation, qui attribue à chaque pays et territoire des codes à deux lettres, trois lettres et numériques. Dans ce référentiel, Taïwan s'est vu attribuer le code `TW`, mais son nom officiel est libellé « Taiwan, Province of China » (Taïwan, province de Chine).

Cette désignation figure dans la norme ISO 3166 depuis 1974. Pour de nombreux Taïwanais et membres de la communauté internationale, il s'agit d'une norme « défectueuse » qui ne reflète pas la réalité politique ni la structure de gouvernance effective de Taïwan.

## Les actions correctives de la communauté open source

### Ubuntu Bug 1138121 : le choix du pays dans les sources logicielles

Dans la configuration des sources logicielles d'Ubuntu, les utilisateurs doivent sélectionner leur pays afin d'identifier le miroir le plus adapté. Lorsqu'un utilisateur taïwanais découvre l'option « Taiwan, Province of China », beaucoup ressentent un malaise ou une vive insatisfaction.

Le rapporteur du bug #1138121 a décrit précisément le problème :

> Presque tous les Taïwanais (République de Chine) seraient perturbés par ce défaut logiciel s'il apparaissait sur leur écran d'ordinateur ;)

La solution proposée consistait à utiliser le champ « common name » des codes ISO, soit simplement « Taiwan », plutôt que l'appellation officielle à connotation politique.

### Les tentatives de correction sur GitHub

Au sein de la communauté open source sur GitHub, de nombreux projets sont confrontés au même problème. Dans l'issue #43 du projet ISO-3166-Countries-with-Regional-Codes, un membre de la communauté faisait remarquer :

> Selon Wikipédia, Taïwan n'est pas une province de Chine. Certains codes désignent « Taiwan » comme « Taiwan, Province of China », ce qui est inacceptable.

Ces signalements s'accompagnent généralement de pull requests proposant de corriger la désignation de « Taiwan, Province of China » en « Taiwan » dans les fichiers concernés.

### FreeBSD PR 138672

Le système d'exploitation FreeBSD a également reçu un signalement similaire. Le titre de la PR 138672 est sans ambiguïté : « ISO 3166 attribue un nom erroné à Taïwan, veuillez l'appeler 'Taiwan' comme auparavant. »

### Drupal Issue 1938892

La communauté du système de gestion de contenu Drupal a elle aussi débattu de la migration des données de pays ISO-3166-1 vers les données Unicode CLDR (Common Locale Data Repository). Des membres de la communauté ont qualifié la désignation « Taiwan, Province of China » de « hautement problématique ».

## Défis techniques et solutions envisagées

### Le dilemme de la normalisation

Les développeurs font face à un défi délicat : comment respecter les normes internationales tout en évitant les controverses politiques et en tenant compte de la sensibilité des utilisateurs ? Les solutions les plus courantes sont les suivantes :

1. **Utiliser le nom courant** : adopter la désignation neutre « Taiwan » plutôt que l'appellation officielle complète
2. **Recourir aux données CLDR** : s'appuyer sur les données régionales du projet Unicode CLDR, généralement plus neutres
3. **Traitement par localisation** : utiliser des désignations appropriées selon les contextes linguistiques

### Les modes de réponse de la communauté des développeurs

Lorsqu'un utilisateur signale un problème de désignation concernant Taïwan, les projets open source adoptent généralement la démarche suivante :

1. **Évaluation technique** : vérifier si la désignation peut être modifiée sans affecter le fonctionnement du système
2. **Discussion communautaire** : débattre de l'alternative la plus pertinente dans les issues ou les forums
3. **Correction progressive** : mettre à jour les fichiers concernés par étapes, via des pull requests
4. **Mise à jour de la documentation** : modifier la documentation pour expliquer la nouvelle approche retenue

## Un impact qui dépasse le domaine logiciel

### Le problème de dénomination au sein des organisations internationales

Cette problématique ne se limite pas aux systèmes informatiques. Taïwan se heurte à des défis similaires dans de nombreuses organisations internationales :

- **OMS** : Taïwan ne peut pas y participer sous le nom « Taiwan » ; l'appellation « Taipei chinois » est généralement utilisée
- **Jeux olympiques** : Taïwan concourt sous la désignation « Taipei chinois »
- **Autres organismes de normalisation internationaux** : la plupart suivent la nomenclature ISO 3166-1

### Réflexions sur la souveraineté numérique

La question de la désignation de Taïwan dans les normes internationales est le reflet d'enjeux plus larges liés à l'expression de la souveraineté à l'ère numérique. Dans une infrastructure numérique mondialisée, la manière dont chaque territoire est identifié et représenté mérite une réflexion approfondie.

## La contribution de la communauté g0v

Un remerciement particulier est adressé à chewei, membre de la communauté g0v, pour sa compilation rigoureuse et de longue date des cas et des fils de discussion sur ce sujet, permettant à un plus grand nombre de personnes de prendre conscience de l'ampleur et de l'importance de cette problématique. La communauté g0v s'engage depuis longtemps à améliorer les services numériques publics et à promouvoir la transparence de l'information, grâce à la collaboration open source.

## Recommandations pratiques pour les développeurs

Pour les développeurs amenés à intégrer une fonctionnalité de sélection de pays ou de région, voici quelques recommandations :

1. **Éviter les désignations politiquement sensibles** : privilégier des appellations neutres telles que « Taiwan » plutôt que « Taiwan, Province of China »
2. **Proposer une option de personnalisation** : permettre aux utilisateurs ou aux administrateurs de définir eux-mêmes les noms de régions
3. **S'inspirer des usages internationaux** : se référer aux pratiques des services de premier plan (Google, Microsoft, etc.)
4. **Documenter les choix effectués** : expliquer clairement dans la documentation les raisons du choix d'une désignation particulière

## Conclusion

La question de la désignation de Taïwan dans les normes internationales peut sembler n'être qu'un détail technique, mais elle touche en réalité à des enjeux profonds d'identité, de respect et d'inclusion. Grâce aux efforts continus de la communauté open source, de nombreux projets ont adopté des désignations plus neutres et plus inclusives.

Au-delà de la simple résolution d'un problème technique, chaque correction de ce type témoigne de l'attachement de la communauté des développeurs aux ressentis de ses utilisateurs, et de sa volonté de construire un environnement numérique plus accueillant pour tous.

## Références

- [ISO-3166-Countries-with-Regional-Codes Issue #43](https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/issues/43)
- [Ubuntu Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121)
- [FreeBSD PR 138672](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=138672)
- [Drupal Issue #1938892](https://www.drupal.org/project/drupal/issues/1938892)
- [Taiwan News: Taiwan urged to address mislabeling by ISO](https://www.taiwannews.com.tw/news/3812381)
- [Change.org Petition: Correct "Taiwan, Province of China" on ISO 3166](https://www.change.org/p/iso-international-organization-for-standardization-correct-taiwan-province-of-china-on-iso-3166-and-change-it-to-taiwan-let-tw-be-taiwan)
- [Compilation de la communauté g0v](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) - avec les remerciements de chewei pour son travail de compilation

---

_Cet article a bénéficié du travail de compilation de chewei, membre de la communauté g0v, ainsi que de tous les développeurs et membres de la communauté qui œuvrent à l'amélioration de la représentation de Taïwan dans les systèmes numériques._
