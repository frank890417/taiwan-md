---
title: 'Catalogue des modules de visualisation : 19 façons de voir les données de Taïwan'
description: 'Exemples vivants des modules de visualisation de Taiwan.md — Chaque module tw-* est rendu une fois avec des données réelles taïwanaises (logement, démographie, santé, parlement), à lire conjointement avec la syntaxe et les principes de design de graph.md.'
date: 2026-06-06
category: 'About'
tags:
  [
    'Visualisation de données',
    'Justice résidentielle',
    'Politique du logement',
    'Données ouvertes',
  ]
author: 'Taiwan.md'
readingTime: 11
featured: false
lastVerified: 2026-06-12
lastHumanReview: false
image: '/article-images/society/taipei-skyline-housing-2026.webp'
imageCredit: 'Heeheemalu'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg'
relatedDiary: ['2026-07-16-222859-viz-evolution']
translatedFrom: 'About/視覺化模組型錄.md'
sourceCommitSha: '756ab2957'
sourceContentHash: 'sha256:e634c73174fd4145'
sourceBodyHash: 'sha256:5fe923f8d157fe62'
translatedAt: '2026-10-23T16:38:09.650063+00:00'
---

# Catalogue des modules de visualisation : 19 façons de voir les données de Taïwan

> **Aperçu en 30 secondes :** Cette page est l'exemple « vivant » du système de visualisation de Taiwan.md — elle rend chaque module d'article une fois, en utilisant toutes les données réelles de Taïwan (ratio prix du logement/revenu, logements sociaux publics, vieillissement, référendums, ratio infirmiers/patients, sièges au parlement). C'est le compagnon du guide d'édition [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md) : **graph.md explique « quand utiliser quel module, comment le faire correctement, et comment écrire la syntaxe » ; cette page vous montre directement « à quoi cela ressemble ».** Chaque module est rendu en HTML/SVG pur, de sorte que les humains, les lecteurs d'écran, Google et les robots d'IA puissent lire les mêmes données — c'est précisément la raison pour laquelle nous avons choisi une visualisation statique plutôt que des graphiques interactifs.

Lorsqu'on rédige un article sur les chiffres, la pire chose est de transformer les données en une accumulation de paragraphes numériques ; le lecteur décroche au troisième pourcentage. Le travail de la visualisation consiste à inverser l'entropie d'un « texte numérique dense » pour en faire une « structure lisible d'un coup d'œil ».

Mais la visualisation chez Taiwan.md suit une discipline que personne d'autre n'a : **nous ne faisons que des visualisations « lisibles par les LLM »**. Un graphique interactif dessiné avec D3 ou Canvas est impressionnant, mais les robots d'IA comme GPTBot, PerplexityBot ou ClaudeBot ne font pas tourner de JavaScript ; pour eux, ce graphique est un vide. Avec nos graphiques en HTML sémantique et SVG intégré, les données sont dans le code source, et l'IA peut lire et citer les données de première main de Taïwan dans six langues. **Une visualisation lisible par les LLM est une visualisation de la souveraineté.**

Les dix-neuf modules ci-dessous, du plus simple « un grand chiffre » aux « tuiles de comtés » et aux « arcs de sièges », sont présentés dans l'ordre. La version complète de la syntaxe et des principes de design se trouve dans graph.md ; ici, nous ne mettons qu'une phrase : « Qu'est-ce que c'est, et quand l'utiliser ».

## Grand chiffre de données `tw-figure`

Le plus simple et le plus puissant : mettre un chiffre dramatique à l'échelle maximale, en comparant avant et après pour raconter une transformation. Idéal pour un « sledgehammer stat » (statistique percutante) en introduction.

```tw-figure
67 000 → 870 000 / ping
Le prix de vente non vendu du logement social public de Chenggong à Taipei en 1985, jusqu'au prix moyen des agents immobiliers en 2026 — le même numéro de porte, environ 13 fois plus cher
Plateforme d'agents immobiliers de l'enregistrement des prix réels (Chenggong)
```

## Groupe de statistiques `tw-stat`

Lorsqu'un paragraphe contient trois ou quatre chiffres clés en parallèle, il vaut mieux les disposer en une rangée de cartes plutôt que de les écrire dans une longue phrase, permettant au lecteur de tout scanner d'un coup d'œil.

```tw-stat
174 891 logements | Logements sociaux publics construits directement par le gouvernement | 1976–1999
Plus de 390 000 logements | Volume total des logements sociaux au sens large | Jusqu'à l'abrogation en 2015
84,4 % | Taux de propriété résidentielle à l'échelle nationale | 2024
Source : Communiqué de presse sur l'abrogation du Règlement des logements nationaux par le Conseil exécutif ; Plateforme d'information sur l'immobilier du Ministère de l'intérieur
```

Les modules éditoriaux contenant des données (groupe de statistiques, carte de comparaison, axe politique) doivent, comme les modules de graphique, porter la mention `Source :`. L'audit du site entier de juillet 2026 a révélé que les modules surveillés par les portes automatiques avaient un taux de mention de source de 100 % ; les trois modules à haute fréquence non surveillés étaient exactement ceux-ci, avec 40 % d'exemples « à nu ». Ils sont désormais également intégrés au portail viz-health.

## Carte de comparaison `tw-versus`

Comparaison point par point de deux systèmes, de deux positions ou de deux états avant/après. Couleur chaude à gauche, couleur froide à droite, un « vs » au milieu, permettant de lire les différences ligne par ligne.

```tw-versus
Logements sociaux publics de Taïwan | Logements sociaux de Hong Kong
Subventions gouvernementales, vendus à bas prix aux résidents | Subventions gouvernementales, vendus à bas prix aux résidents
Revendre au prix du marché après un an de résidence | La revente sur le marché public doit d'abord « payer le prix du terrain »
La plus-value revient presque entièrement aux individus | La plus-value est récupérée par le trésor public selon le ratio de la remise originale
Perte一次性 du stock public | Les avantages publics peuvent être récupérés
Source : Rapports du Parlement de Taïwan, Commission du logement de Hong Kong
```

## Barres de proportion `tw-bars`

Comparaison de valeurs ou classement de quelques catégories ; la longueur des barres horizontales est automatiquement mise à l'échelle selon les valeurs, la valeur maximale remplissant la largeur. N'oubliez pas d'ajouter une ligne `Source :` à la fin du module de données, qui se transformera automatiquement en mention de source ci-dessous.

```tw-bars
National 2014 | 8,41 fois
National 2024 | 10,76 fois
Taipei 2024 | 16,60 fois | Pic historique
Source : Plateforme d'information sur l'immobilier du Ministère de l'intérieur, Centre de recherche sur l'immobilier de l'Université nationale Chengchi
```

## Graphique en grille `tw-waffle`

Composition proportionnelle d'une partie par rapport au tout, cent cases représentant cent pour cent, plus intuitif qu'un camembert — vous pouvez vraiment compter les cases. Adapté aux données où la somme des différentes catégories est approximativement égale à 100 %.

```tw-waffle
Composition du logement à Vienne (2023)
Logements sociaux publics municipaux | 21,9
Logements sociaux à profit limité | 21,4
Propriétaires | 20,4
Location privée | 36,3
Source : Statistiques sur le logement du gouvernement municipal de Vienne (Stadt Wien)
```

## Axe politique `tw-timeline`

Le contexte des jalons clés d'un système ou d'une politique, reliés par une chronologie de nœuds. Notez qu'il s'agit d'une « aide visuelle » ; elle est différente des sous-titres du texte principal qui ne peuvent pas être rédigés de manière chronologique (« En 1975… » comme titre).

```tw-timeline
1975 | Entrée en vigueur du règlement sur les logements sociaux | Le gouvernement construit pour vendre, établissant une boucle fermée de « qualification des acheteurs », les subventions ne s'échappent pas
2002 | Le mur est démantelé | Modification de la loi supprimant les restrictions de qualification des acheteurs ; les résidents des logements sociaux peuvent vendre à n'importe qui après un an
2015 | Abrogation du règlement sur les logements sociaux | Raison officielle : le taux de propriété est déjà de 85 %, passage aux logements sociaux uniquement en location
2026 | Taoyuan réinstalle le portail | Logements abordables : la revente ne peut pas dépasser le prix d'achat original
Source : Rapports du Parlement de Taïwan, Communiqué de presse sur l'abrogation du Règlement des logements nationaux par le Conseil exécutif
```

## Carte de citation `tw-quote`

Lorsqu'une phrase peut représenter la tension centrale de tout l'article, agrandissez-la en une carte de citation. Les citations n'ont pas besoin d'ajouter elles-mêmes des guillemets « » ; le module le fera. La citation doit être littérale et vérifiable.

```tw-quote
Une maison de 30 millions de dollars du marché devient une maison de 60 à 70 millions… Voler les pauvres pour enrichir les riches, l'État paie pour aider les riches à rénover leurs maisons
Lin Chih-chün | Avocat, 2025, commentant la proposition de « rénovation urbaine du logement social de Chenggong financée par l'État »
```

## Barre de source `tw-source`

Regroupez les sources de données d'une analyse en un modeste « chip », placé à côté du paragraphe. La crédibilité fait partie de la curation — les médias numériques taïwanais oublient souvent de citer les sources, c'est là que nous pouvons faire la différence.

```tw-source
Plateforme d'information sur l'immobilier du Ministère de l'intérieur, Enregistrement des prix réels, Centre de recherche sur l'immobilier de l'Université nationale Chengchi, Rapports du Parlement de Taïwan, Commission du logement de Hong Kong
```

## Boîte de note `tw-note`

La crédibilité des articles sur les données repose à moitié sur « comment vous avez calculé ». Les journalistes de données utilisent des blocs 【Note】 pour expliquer les méthodes de calcul et des (Notes) pour marquer les corrections ; nous avons transformé cette convention en un module. La première ligne écrit `Note` / `Méthode` / `Remarque` / `Correction` / `Mise à jour` ; chaque ligne restante forme un paragraphe autonome.

```tw-note
Note
L'« indice de vieillissement » de cette page = Population de 65 ans et plus ÷ Population de 0–14 ans × 100. Une valeur de 100 signifie qu'il y a autant de personnes âgées que d'enfants ; un chiffre plus élevé signifie que l'endroit est plus « lourd en haut et léger en bas ».
Le taux de vieillissement et l'indice de vieillissement proviennent des statistiques de fin 2025 du Bureau du recensement, des affaires et des décomptes du Ministère de l'intérieur ; pour une analyse complète des 22 comtés, voir « Voir Taïwan en données : 22 comtés ».
```

## Graphique linéaire `tw-line`

Tendances à quatre points temporels ou plus, dessinées en SVG intégré ; les limites supérieure et inférieure de l'axe y sont marquées pour que le lecteur voie la portée. Le plus important — il **génère automatiquement un tableau de données caché**, permettant aux lecteurs d'écran et aux robots d'IA de lire les données brutes. Le graphique est pour les humains, le tableau est pour les machines, les deux ont la même source.

```tw-line
Ascension sur dix ans du ratio prix du logement/revenu national (fois)
Année | National
2014 | 8,41
2016 | 9,32
2018 | 8,57
2020 | 9,20
2022 | 9,61
2024 | 10,76
Référence : Point de départ 2014 | 8,41
Source : Centre de recherche sur l'immobilier de l'Université nationale Chengchi, Plateforme d'information sur l'immobilier du Ministère de l'intérieur
```

Le graphique linéaire prend également en charge les **lignes de référence** : ajoutez une ligne `Référence : étiquette | valeur`, qui sera dessinée en pointillés, sans extrémités, avec une seule étiquette, distincte visuellement de la série mesurée. Les lecteurs ne confondront pas un seuil fixe avec des données mesurées.

## Graphique de pente `tw-slope`

Lorsque vous n'avez que « deux points temporels », le graphique linéaire gaspille l'espace vide du milieu. Le graphique de pente laisse directement la pente de la ligne reliant les deux extrémités parler : qui a augmenté le plus, qui a rattrapé qui, tout est visible d'un coup d'œil. Ajouter `*` au début d'une étiquette met en évidence cette ligne ; les autres lignes deviennent automatiquement grises pour servir de contexte.

```tw-slope
Ratio prix du logement/revenu : qui a augmenté le plus en dix ans (fois)
2014 | 2024
National | 8,41 | 10,76
*Taipei | 12,0 | 16,60
Source : Plateforme d'information sur l'immobilier du Ministère de l'intérieur, Centre de recherche sur l'immobilier de l'Université nationale Chengchi
```

## Graphique en chaleur `tw-heatmap`

Comparaison matricielle région×indicateur, ou année×catégorie. Chaque colonne est normalisée individuellement en profondeur de couleur ; plus le chiffre est élevé, plus c'est chaud. C'est lui-même un tableau HTML, donc naturellement lisible par l'IA — c'est aussi la raison pour laquelle le graphique en chaleur est meilleur dans notre système qu'« une image colorée ».

```tw-heatmap
Comtés | Ratio prix du logement/revenu (fois) | Taux de charge hypothécaire (%)
Taipei | 16,60 | 63,9
Nouveau Taipei | 13,03 | 56,9
Taichung | 11,11 | 48,0
Taoyuan | 9,0 | 40,0
Source : Plateforme d'information sur l'immobilier du Ministère de l'intérieur
```

## Graphique à points `tw-dot`

Les graphiques à barres comparent des « quantités », les graphiques à points montrent la « distribution » : tous les points se situent sur la même échelle, vous voyez qui se regroupe et qui sont des valeurs aberrantes. Une valeur par ligne donne une bande de points (`dot strip`) ; deux valeurs tracent un intervalle « d'ici à là » ; trois valeurs (`estimation ponctuelle | borne inférieure | borne supérieure`) produisent une « estimation ponctuelle + bande d'incertitude » style sondage. L'erreur d'échantillonnage de ±3 % ne doit pas être masquée, c'est la représentation honnête que l'on sacrifie le plus souvent en année électorale. Le `*` permet également de mettre en évidence.

```tw-dot
Les deux extrêmes du taux de vieillissement : des comtés/villes les plus jeunes aux plus âgés (part des 65 ans et plus, %)
Hsinchu County | 15.08 | le plus jeune de Taïwan
Taoyuan | 16.72
Taichung | 17.40
New Taipei | 19.95
Tainan | 20.48
Kaohsiung | 20.79
*Chiayi County | 24.11 | indice de vieillissement le plus élevé de Taïwan
*Taipei | 24.18 | le plus élevé de Taïwan
Source : Bureau du recensement, des affaires et des décomptes du Ministère de l'intérieur, fin 2025
```

## Barres empilées `tw-stack`

Le graphique en grille convient à la composition d'« un tout » ; les barres empilées conviennent à **comparer la composition sur plusieurs lignes** — chaque ligne est automatiquement normalisée à 100 %, et si la section est suffisamment large, les valeurs sont directement marquées dans les blocs colorés.

```tw-stack
Trois référendums sur l'énergie nucléaire : Pour vs Contre (part des suffrages valides %)
Référendum | Pour | Contre
2018 Énergie nucléaire pour verte | 59 | 41
2021 Relance du réacteur 4 | 47 | 53
2025 Prolongation du réacteur 3 | 74 | 26
Source : Résultats officiels vérifiés par la Commission électorale centrale pour les trois référendums
```

## Pyramide `tw-pyramid`

Barres dos à dos, un camp à gauche, un camp à droite, étiquettes partagées au milieu, c'est le graphique classique de la démographie. Ici, nous l'utilisons pour voir le « lourd en haut et léger en bas » de six comtés : à gauche les enfants, à droite les personnes âgées, en comparant les deux, le vieillissement n'est plus un pourcentage abstrait.

```tw-pyramid
Lourd en haut et léger en bas : part de la population jeune vs âgée de six comtés (%)
Comté | 0–14 ans | 65 ans et plus
Hsinchu | 14,80 | 15,08
Taoyuan | 13,13 | 16,72
Taichung | 12,75 | 17,40
Taipei | 11,97 | 24,18
Keelung | 9,28 | 22,28
Chiayi | 8,27 | 24,11
Source : Bureau du recensement, des affaires et des décomptes du Ministère de l'intérieur, fin 2025 ; part jeune calculée à partir de l'indice de vieillissement ÷ indice de vieillissement × 100
```

## Tuiles de comtés `tw-tiles`

La carte choroplèthe de Taïwan a deux vieux problèmes : la superficie de Hualien et Taitung est si grande qu'elle accapale le poids visuel, et la forme de Taïwan dessinée à la main par l'IA devient souvent « entre une olive et une pomme de terre ». Les tuiles disposent les 22 comtés en blocs de taille égale (la disposition est figée dans le système, selon la position relative réelle), chaque tuile a le même poids, les chiffres sont écrits directement sur la tuile. La forme est toujours correcte car on ne dessine aucune forme.

```tw-tiles
Taux de vieillissement à l'échelle nationale des 22 comtés (part de population 65 ans et plus, %)
Ville de Taipei | 24,18
Nouveau Taipei | 19,95
Ville de Taoyuan | 16,72
Ville de Taichung | 17,40
Ville de Tainan | 20,48
Ville de Kaohsiung | 20,79
Ville de Keelung | 22,28
Ville de Hsinchu | 16,16
Ville de Chiayi | 19,90
Comté de Hsinchu | 15,08
Comté de Miaoli | 20,23
Comté de Changhua | 20,37
Comté de Nantou | 22,66
Comté de Yunlin | 21,76
Comté de Chiayi | 24,11
Comté de Pingtung | 21,84
Comté de Yilan | 20,77
Comté de Hualien | 21,52
Comté de Taitung | 20,93
Comté de Penghu | 21,03
Comté de Kinmen | 19,69
Comté de Lienchiang | 17,14
Source : Bureau du recensement, des affaires et des décomptes du Ministère de l'intérieur, fin 2025
```

## Graphique unitaire `tw-iso`

« 174 891 logements » est un chiffre qu'on oublie après l'avoir lu ; neuf points que l'on peut compter avec les doigts ne le sont pas. Le graphique unitaire remplace les grands chiffres par des unités dénombrables « un symbole = combien », c'est la méthode des journalistes du The Reporter pour leur série sur la pêche hauturière : transformer des chiffres massifs insensibles en unités sensibles pour le public. Les symboles ne sont utilisés qu'en nombres entiers (pas de demi-cercle), la valeur exacte est écrite à côté.

```tw-iso
Combien de logements sociaux le gouvernement a-t-il construits en 24 ans
單位：● = 20 000 logements
Construction directe par le gouvernement | 174 891 logements | 1976–1999
Volume total des logements sociaux au sens large | Plus de 390 000 logements | Jusqu'à l'abrogation en 2015
Source : Communiqué de presse sur l'abrogation du Règlement des logements nationaux par le Conseil exécutif
```

## Arc de sièges `tw-arc`

La composition des sièges parlementaires a son propre graphique dédié : un pointillé semi-circulaire, un point par siège, les partis sont listés dans l'ordre pour former un secteur continu. Le camembert compare les angles (les yeux humains ne sont pas bons pour ça), l'arc de sièges vous permet de compter directement les points, la ligne de majorité est dessinée directement à sa position. Ici, nous utilisons les résultats des élections législatives de 2024 : 113 sièges, trois partis sans majorité absolue, cette ligne pointillée est le point de départ des tiraillements ultérieurs de la grande motion de censure. Notez que c'est un graphique parlementaire : pour les élections « un gagnant par district » comme les maires des 22 comtés, utilisez les tuiles de comtés ci-dessous.

```tw-arc
Sièges du Parlement de 2024 : trois partis sans majorité absolue (113 sièges)
過半：57
Parti Kuomintang | 52
Parti progressiste démocrate | 51
Parti populaire de Taïwan | 8
Indépendants | 2 | Pro-bleu pan-bleu
Source : Commission électorale centrale
```

## Grille de petits multiples `tw-multiples`

Cinq lignes dans un graphique, les lignes s'emmêlent comme des spaghettis ; les petits multiples séparent chaque ligne dans sa propre petite case, **toutes les cases partageant la même règle**, afin que les formes puissent être comparées. Ici, nous utilisons le ratio infirmiers/patients en trois équipes : le graphique en chaleur (celui au-dessus) vous donne la matrice précise, les petits multiples vous donnent la forme « chaque niveau monte vers la nuit profonde, les niveaux de base montent le plus raide ». Avec les mêmes données, posez différentes questions, choisissez différents graphiques.

```tw-multiples
Plus la nuit est profonde, plus les hôpitaux sont de base, plus un infirmier gère de lits (personnes)
Colonne : Équipe | Ratio infirmiers/patients
--- Hôpitaux de niveau médical
Équipe de jour | 6
Petite nuit | 9
Grande nuit | 11
--- Hôpitaux de niveau régional
Équipe de jour | 7
Petite nuit | 11
Grande nuit | 13
--- *Hôpitaux de district
Équipe de jour | 10
Petite nuit | 13
Grande nuit | 15
Source : Annonce des normes de ratio infirmiers/patients en trois équipes du Ministère de la santé et du bien-être, 2024
```

## Comment utiliser ces modules

Chaque module est écrit dans le Markdown de l'article sous forme de bloc ` ```tw-* `, avec des colonnes séparées par `|`, converti automatiquement en ce que vous voyez ci-dessus lors de la construction — l'auteur n'a pas besoin d'écrire de HTML ou de JavaScript. La syntaxe complète, quand utiliser quel type, comment faire les couleurs et les axes pour ne pas induire en erreur, et la liste de contrôle de vérification visuelle avant publication se trouvent dans [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md).

Ce système s'inspire de la philosophie éditoriale de [The Pudding](https://pudding.cool/) — la question précède les données, la conclusion doit être claire, la mention est le protagoniste — mais a grandi pour devenir un organe adapté à Taiwan.md : statique, multilingue, lisible par l'IA. Le contexte complet de la conception est écrit dans [Rapport de conception du système de visualisation](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md).

Pour voir comment ces modules s'entrelacent dans un article de fond réel, lisez [Logements sociaux et justice résidentielle](/fr/society/public-housing-justice) — la plupart des données de cette page proviennent de la recherche de cet article.

## Ce système évolue également lui-même

Cette page que vous lisez est elle-même le fruit de trois cycles d'évolution. Puisqu'il s'agit d'une page sur la chronologie, utilisons le module axe politique pour raconter notre propre histoire :

```tw-timeline
2026-06-06 | Naissance de dix modules | Après avoir étudié The Pudding et la méthode de classification des graphiques du FT, les premiers sont nés : grand chiffre, carte de comparaison, barres de proportion, linéaire
2026-06-12 | Dix-sept une semaine plus tard | Ajout de pente, points, empilées, pyramide, tuiles de comtés, unitaire ; l'instrument de validation pixel viz-shot est né le même jour, car « le markup existe » et « il a l'air correct » sont deux choses différentes
2026-07-16 | Dix-neuf, et apprenant à parler six langues | Arc de sièges et petits multiples ajoutés ; les chaînes de système comme « source des données » sont désormais rendues en six langues, les tuiles de comtés en versions anglaise et japonaise ne dégénèrent plus en barres
Source : Rapport de conception et d'évolution du système de visualisation de Taiwan.md (2026-06 à 2026-07, GitHub public)
```

Le point central du troisième cycle n'est pas vraiment les nouveaux graphiques, mais un auto-examen honnête. L'audit du site entier a révélé : les modules surveillés par les portes automatiques avaient un taux de mention de source de 100 % ; les trois modules à haute fréquence non surveillés étaient « à nu » à 40 %. La norme a été écrite dans le guide d'édition pendant deux mois, mais le comportement a suivi la forme de l'instrument ; donc cette fois, l'instrument a été complété pour être aussi large que la norme. Dans le même cycle, il a été capturé que les chaînes de système étaient rendues en chinois sur les pages anglaise, japonaise et coréenne, avec un seul caractère simplifié mélangé dans les étiquettes d'accessibilité sans que personne ne le remarque. Pour un système qui prétend « rendre les données de Taïwan lisibles par les LLM dans six langues », ces coins sont plus importants que les nouvelles fonctionnalités.

Les recherches récentes ont également fait la preuve de cette voie : la précision de la reconstruction des valeurs de graphique à partir d'images par l'IA multimodale n'est pas fiable, les nœuds textuels sont ce que les machines lisent le plus stablement. C'est la raison pour laquelle les tuiles écrivent les chiffres directement sur les tuiles, et chaque graphique est accompagné d'un tableau de données caché. Le processus de recherche complet et les décisions de conception sont écrits dans [Recherche approfondie et rapport de mise en œuvre du système de visualisation v3.0](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md).

**Pour aller plus loin** :

- [Logements sociaux et justice résidentielle](/fr/society/public-housing-justice) — L'histoire complète derrière ces données de logement : comment les logements sociaux sont passés de maisons bon marché à des échelles d'actifs, source de données de la plupart des modules de cette page
- [Voir Taïwan en données : 22 comtés](/fr/geography/data-taiwan-22-cities) — Les données de vieillissement des points, pyramides et tuiles de comtés de cette page proviennent toutes de l'analyse complète des 22 comtés de cet article
- [Discussion sur Taïwan et l'énergie nucléaire](/fr/society/taiwan-nuclear-debate) — L'histoire complète des trois référendums des barres empilées : gagné le débat, perdu le système
- [Loi sur les soins médicaux](/fr/society/medical-care-act) — L'histoire complète des chiffres du ratio infirmiers/patients en trois équipes de la grille de petits multiples : la loi peut écrire combien de lits gérer, pas si ces mains existent
- [Grande motion de censure](/fr/history/great-recall-movement-2024) — La suite de la ligne pointillée de majorité de l'arc de sièges : comment le Parlement sans majorité absolue de trois partis est arrivé à 31 motions de censure
- [Crise de la faible natalité à Taïwan](/fr/society/taiwan-low-birth-rate-crisis) — Ne pas pouvoir acheter une maison et ne pas pouvoir avoir d'enfants, l'autre face de la justice intergénérationnelle

## Sources des images

Cet article utilise 1 image sous licence CC, mise en cache dans `public/article-images/society/` :

- [Horizon urbain résidentiel de Taipei (vue du mont Xiang)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Photo : Heeheemalu, 2026, CC BY-SA 4.0 (hero)

## Références

[^1]: [Plateforme d'information sur l'immobilier du Ministère de l'intérieur](https://pip.moi.gov.tw/Publicize/Info/E1050) — Statistiques officielles sur le logement : ratio prix du logement/revenu, taux de charge hypothécaire, taux de propriété résidentielle, etc.

[^2]: [Centre de recherche sur l'immobilier de l'Université nationale Chengchi](https://rer.nccu.edu.tw/article/detail/2210058908437) — Indicateurs annuels de capacité d'achat du logement, source de la série du ratio prix du logement/revenu national des graphiques linéaires et des barres de proportion de cette page.

[^3]: [Communiqué de presse sur l'abrogation du Règlement des logements nationaux par le Conseil exécutif](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Données officielles sur le nombre cumulatif de logements sociaux (environ plus de 390 000 logements).

[^4]: [Données démographiques du Bureau du recensement, des affaires et des décomptes du Ministère de l'intérieur](https://www.ris.gov.tw/app/portal/346) — Taux de population de 65 ans et plus et indice de vieillissement par comté à la fin de 2025, source de données des points, pyramides, tuiles de comtés et boîtes de note de cette page ; chaîne de vérification complète dans « [Voir Taïwan en données : 22 comtés](/fr/geography/data-taiwan-22-cities) ».

[^5]: [Résultats du 16e référendum de 2018 de la Commission électorale centrale (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — La part de « pour » des trois référendums sur l'énergie nucléaire (59 % / 47 % / 74 %) est le résultat officiellement vérifié par la Commission électorale centrale, chaîne de vérification par cas dans « [Discussion sur Taïwan et l'énergie nucléaire](/fr/society/taiwan-nuclear-debate) ».

[^6]: [Agence centrale de Taïwan : trois partis sans majorité absolue aux élections législatives de 2024](https://www.cna.com.tw/news/aipl/202401130361.aspx) — La répartition de 113 sièges de l'arc de sièges (Parti Kuomintang 52, Parti progressiste démocrate 51, Parti populaire de Taïwan 8, Indépendants 2) est le résultat vérifié par la Commission électorale centrale, chaîne de vérification dans « [Grande motion de censure](/fr/history/great-recall-movement-2024) ».

[^7]: [Annonce des normes de ratio infirmiers/patients en trois équipes du Ministère de la santé et du bien-être (2024)](https://www.mohw.gov.tw/) — Valeurs standard du ratio infirmiers/patients en trois équipes à trois niveaux de la grille de petits multiples, chaîne de vérification dans « [Loi sur les soins médicaux](/fr/society/medical-care-act) ».
