---
title: "Mini Taiwan Pulse : Avec un regard de commissaire d'exposition, dessiner Taïwan comme une carte vivante"
description: "En 2026, l'analyste de données Migu a glissé un fichier CSV dans Kepler.gl, faisant apparaître la toute première carte de Taïwan sur son écran. Deux ans plus tard, le projet mini-taiwan-pulse est devenu extrêmement populaire sur GitHub avec 375 étoiles, superposant cinq types de données en temps réel — ciel, océan, terre, rues et gestion des déchets — pour créer une carte animée. Face à l'impossibilité pour un humain d'analyser les données ouvertes provenant de plus de vingt comtés et villes ainsi que 50 000 enregistrements du gouvernement central, sa solution n'a pas été de recruter davantage de personnel, mais de confier la tâche à un système évolutif orchestré par des agents IA, l'humain ne se chargeant que de poser les questions et de valider les résultats. Du regard de commissaire d'exposition formé en urbanisme au pipeline de détection d'incendies s'exécutant seul dans tmux, découvrez comment le GitHub d'une seule personne a pu devenir toute une galaxie."
date: 2026-04-19
category: 'Technology'
tags:
  [
    'Technologie',
    'Civic Tech',
    'Données ouvertes',
    'Visualisation de données',
    'Projet open source',
    'TDX',
    'Three.js',
    'Intelligence artificielle',
    'Agent IA',
    'SIG',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-06-25
lastHumanReview: true
readingTime: 20
image: '/article-images/technology/mini-taiwan-pulse-map-2026.webp'
imageCredit: 'Migu / sciwork 2026'
imageLicense: 'Fair use editorial commentary'
imageSource: 'https://github.com/ianlkl11234s/0613-sci-work-share'
relatedDiary: ['2026-06-25-203919-manual-mirror']
sporeLinks:
  - id: 150
    platform: 'threads'
    date: '2026-06-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DaA6aTRk7e6'
  - id: 151
    platform: 'x'
    date: '2026-06-25'
    url: 'https://x.com/taiwandotmd/status/2070173370118000879'
translatedFrom: 'Technology/mini-taiwan-pulse.md'
sourceCommitSha: 'f4ae4fb8f'
sourceContentHash: 'sha256:0128d89b548611d1'
sourceBodyHash: 'sha256:ce5c6e11aac7eea6'
translatedAt: '2026-10-21T00:59:21.303095+00:00'
---

# Mini Taiwan Pulse : Avec le regard d'un curateur, faire de Taïwan une carte qui respire

En 2026, un jour quelconque, un analyste de données nommé Migu a transformé un fichier CSV en GeoJSON et l'a fait glisser dans un outil appelé Kepler.gl dans son navigateur. Sans écrire une seule ligne de code, la première carte de Taïwan est apparue à l'écran.

Il a étudié la planification urbaine à l'université et avait alors touché un peu à la SIG (Système d'Information Géographique, un outil qui permet, pour faire simple, aux données de prendre vie sur une carte). Après sa sortie de l'école, il a suivi la voie de l'analyse de données, et la question des cartes n'avait plus été abordée depuis longtemps. Le jour où il a fait glisser le CSV dans Kepler.gl et a vu Taïwan prendre forme à l'écran, la surprise simple et brute qui lui est venue à l'esprit était :

> « Il s'avère que Taïwan possède autant de données, et qu'il n'est pas si difficile de les transformer en carte. »[^1]

Cette phrase ne semble rien dire. Elle est devenue plus tard la graine d'un ensemble complet de projets.

> **Aperçu en 30 secondes :** Migu (GitHub `ianlkl11234s`) a réalisé une quinzaine de projets de visualisation à partir des données ouvertes de Taïwan à partir de la fin de 2025. Le plus populaire, _mini-taiwan-pulse_, a accumulé 375 étoiles sur GitHub, superposant cinq types de données en temps réel : le ciel, la mer, la terre, les rues et les camions de collecte des ordures, pour en faire une carte animée[^2]. Lors d'une conférence donnée en juin 2026 à la communauté sciwork, il a clarifié le problème : les données ouvertes de Taïwan comptent environ 50 000 entrées au niveau central seulement, dispersées sur une vingtaine de plateformes de comtés et de villes. « Le cerveau humain ne peut pas tout scanner. » Sa réponse n'était pas de demander à plus de personnes d'aider à scanner, mais de confier l'ensemble des données à un système orchestré par un Agent IA, capable de grandir par lui-même, où les humains ne se chargent que de poser les questions et de valider les résultats[^3].

Cet article raconte comment une personne est passée de l'ingénuité de faire glisser un CSV à la décision de laisser le système grandir à sa place.

## Le GitHub d'une seule personne, comment est-il devenu une galaxie ?

Si l'on ne regarde que le projet _mini-taiwan-pulse_, il est facile de s'imaginer que Migu n'est qu'un ingénieur amateur : un projet fait sur un coup de tête un week-end, qui devient soudainement viral.

Cette impression est erronée pour deux raisons.

Premièrement, ce qu'il a réalisé dépasse largement un simple projet. En parcourant son GitHub, on découvre qu'après décembre 2025, le profil est saturé de visualisations de données ouvertes de Taïwan : cela a commencé par une preuve de concept (PoC) sur la zone de couverture des bus pour tâter le terrain ; ensuite, fin décembre, un projet d'apprentissage nommé `mini-taiwan-learning-project` a connu un premier succès, atteignant aujourd'hui 189 étoiles. En février, il a réalisé la position en temps réel des navires via l'AIS, puis le `flight-arc-graph` (56 étoiles), qui trace chaque décollage et atterrissage de vol sous forme d'arcs. Ce n'est qu'à la fin du mois de février que vint le tour de _mini-taiwan-pulse_, suivi de l'atlas de la TRA (Taiwan Railway Administration), des orbites satellites, de la vidéosurveillance CCTV en temps réel, et d'un tableau de bord de situation consolidant toutes les données nommé `mini-taiwan-info`... un travail continu jusqu'en juin[^2]. Plus d'une dizaine de dépôts (_repos_) forment un tout cohérent qu'il a lui-même baptisé la galaxie « Mini Taiwan ».

![Tableau de bord de situation Mini Taiwan Info, qui consolide diverses thématiques de données ouvertes — population, transport ferroviaire, maritime, ressources en eau, lutte contre les incendies, médical, etc. — en un panneau de surveillance d'une page par thème](/article-images/technology/mini-taiwan-info-dashboard-2026.webp)

_Un autre membre de la galaxie, Mini Taiwan Info : il a regroupé des données ouvertes éparses en un tableau de bord de surveillance de situation, avec une page dédiée à chaque thème (population, transport ferroviaire, maritime, ressources en eau, lutte contre les incendies, médical). Photo : Migu / sciwork 2026 (usage équitable pour l'édition et la critique)._

Si l'on classe ces projets par nombre d'étoiles, on constate qu'il n'y a pas qu'un seul succès majeur.

```tw-bars
GitHub de Migu : plus d'un repo est populaire (étoiles GitHub)
*mini-taiwan-pulse | 375 | Vaisseau amiral
mini-taiwan-learning-project | 189 | Devenu viral avant pulse
flight-arc-graph | 56 | Tracés de vol
tw-ship-viz | 11 | Navires
mini-tw-cctv | 6 | Vidéo en temps réel
satellite-arc | 6 | Satellites
Source : API GitHub, 2026-06-25
```

La seconde erreur de jugement se cache dans les mots « une seule personne », un point que nous analyserons plus tard. Voyons d'abord comment cette galaxie s'est développée.

```tw-timeline
2025-12 | Premier essai | PoC sur la zone des bus, première tentative avec les données ouvertes de Taïwan
2025-12 | Succès de learning-project | Visualisation ferroviaire à Taipei, devenu viral avant le vaisseau amiral (189★)
2026-02 | Naissance du vaisseau amiral | Lancement de mini-taiwan-pulse, évoluant de JSON statique vers une base de données spatio-temporelle
2026-06 | Déploiement du système complet | Conférence sciwork 2026 : un système qui confie les données ouvertes à des agents pour leur développement
Source : Historique des projets GitHub de Migu (chronologie et étoiles) et contenu de la conférence sciwork 2026[^2][^3]
```

## La même méthode, du métro au système solaire

Le vaisseau amiral lui-même grandit également. Le premier _mini-taiwan-pulse_ comprenait trois couches : le ciel, la mer et la terre. Dans la version de sa conférence, il s'agit désormais de « cinq veines en mouvement » : les avions dans le ciel, les navires dans la mer, les trains sur terre, les bus dans les rues et les camions poubelles de collecte, cinq types de données en temps réel à fréquences différentes superposées sur une même carte qui respire. Dans sa présentation, il a déclaré qu'il s'agissait de la première fois que ce projet « évoluait d'un JSON statique vers une base de données spatio-temporelle »[^3]. Concernant la couche des rues seulement, il a indiqué qu'elle connectait plus de 5 700 bus sur la plateforme TDX, avec une mise à jour des positions toutes les 30 secondes.

![JOUR 0, première carte : transformer un CSV en GeoJSON et le faire glisser dans Kepler.gl, sans code, pour obtenir la première carte de Taïwan](/article-images/technology/mini-taiwan-kepler-day0-2026.webp)

_Le « JOUR 0 » dans sa conférence : transformer un CSV en GeoJSON et le faire glisser dans Kepler.gl, zéro ligne de code pour obtenir la première carte de Taïwan, point de départ de toute la galaxie. Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

La première étincelle de cette galaxie est venue de sa visualisation des transports ferroviaires de Taipei, qu'il appelle « Mini Taipei ». Il a superposé trois systèmes ferroviaires : le métro de Taipei, les trains Taïwan et le TGV, pour en faire une carte animée. Les trains circulent selon les horaires, et il a déclaré qu'à ce moment-là seulement, il a « expérimenté le charme du dynamisme », avec plus de 300 trains en mouvement simultanément à l'écran[^3]. Un horaire statique est ainsi devenu la respiration d'une ville.

![Mini Taipei superpose les trois systèmes ferroviaires (métro, trains Taïwan, TGV) en une carte animée, avec plus de 300 trains circulant selon l'horaire](/article-images/technology/mini-taiwan-taipei-rail-2026.webp)

_Mini Taipei : Métro, trains Taïwan et TGV dans le même cadre, plus de 300 trains circulant selon l'horaire. Il a déclaré que c'était sa première fois à « expérimenter le charme du dynamisme ». Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

Depuis lors, comme s'il était accroc, il a appliqué la même méthode de « transformation des données en dynamique » à des échelles de plus en plus grandes. Sur la mer, il a connecté les points de positionnement AIS en temps réel de l'Administration portuaire, utilisant des sphères lumineuses bleu-vert avec des traînées dégradées de trente minutes pour tracer la direction des navires autour des eaux taïwanaises.

![Navires autour des eaux taïwanaises tracés à partir des points de positionnement AIS en temps réel de l'Administration portuaire, sphères bleu-vert avec traînées dégradées de 30 minutes](/article-images/technology/mini-taiwan-ships-ais-2026.webp)

_La veine maritime : Points de positionnement AIS en temps réel de l'Administration portuaire, sphères bleu-vert avec traînées dégradées de 30 minutes, traçant les navires autour des eaux taïwanaises. Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

Puis il a poussé la même méthode au-delà de la Terre. En utilisant les paramètres orbitaux TLE publics pour calculer la position des satellites, il a tracé les trajectoires de survol de Taïwan par les satellites, puis a étendu cela à l'ensemble du système solaire. Dans sa présentation, il a dit clairement : « La même méthode, tant qu'il y a des données, peut être étendue à l'infini. »[^3] À ce moment-là, on réalise qu'il est en fait fasciné par le fait même de « rendre les données visibles », la carte n'en étant que la première forme.

![Visualisation des orbites satellites calculées à partir des TLE publics, la même méthode s'étendant de la surface de Taïwan jusqu'à l'espace](/article-images/technology/mini-taiwan-satellite-2026.webp)

_La même méthode poussée au-delà de la Terre : calcul des orbites satellites à partir des TLE publics, étendu à l'ensemble du système solaire. Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

## Superposer les îlots isolés : les lacunes émergent d'elles-mêmes

Petit à petit, ce qui est intéressant à voir passe de « des points en temps réel qui bougent » à « superposer des données qui n'ont rien à voir ensemble, faisant émerger les lacunes par elles-mêmes ». Plusieurs projets dans cette galaxie sont专门 dédiés à cela. L'un d'eux, qu'il appelle « Agriculture × Eau », superpose les îlots isolés de trois ministères : agriculture, ressources en eau et prévention des catastrophes, en une seule carte : champs agricoles, rivières, canaux, digues et zones potentielles d'inondation dans le même cadre. Pour faire fonctionner cette carte superposée dans le navigateur, il a utilisé un format appelé PMTiles couplé aux requêtes de plage HTTP, compressant les données initiales de 400 Mo à environ 5 Mo que le navigateur doit seulement charger[^3].

![Carte intégrée Agriculture × Eau : superposant les données ouvertes de champs agricoles, rivières, canaux, digues et zones potentielles d'inondation, dispersées dans différents ministères](/article-images/technology/mini-taiwan-farm-water-2026.webp)

_Agriculture × Eau : Superposant les îlots isolés de trois ministères (agriculture, ressources en eau, prévention des catastrophes) en une carte, champs, rivières, canaux, digues et zones potentielles d'inondation dans le même cadre. Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

Un autre projet superpose les hôpitaux, cliniques, pharmacies, AED (défibrillateurs) et points de soins de longue durée sur la densité de population, puis trace les isochrones. Il a déclaré que cela permet de « voir l'accessibilité, mais aussi voir les déserts médicaux », c'est-à-dire les endroits où les gens sont à une distance déraisonnable des ressources médicales les plus proches.

![Carte d'accessibilité des ressources médicales : superposant hôpitaux, cliniques, pharmacies, AED, points de soins de longue durée sur la population et traçant des isochrones, les déserts médicaux émergent](/article-images/technology/mini-taiwan-medical-2026.webp)

_Ressources médicales : Superposant hôpitaux, cliniques, pharmacies, AED, points de soins de longue durée sur la population, traçant des isochrones, « voir l'accessibilité, mais aussi voir les déserts médicaux ». Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

Sur la ligne des catastrophes, il a affiné davantage : il a unifié à la base des données de différentes fréquences de mise à jour (échos radar, niveaux des réservoirs, précipitations, alertes de catastrophes) sur le même axe temporel. L'utilisateur n'a qu'à faire glisser cet axe temporel pour rejouer synchroniquement toutes les couches. Le début d'une forte pluie, la montée des réservoirs, l'émission des alertes, tout est relié en une ligne de causalité sur le même écran.

![Axe temporel des fortes pluies et des catastrophes : échos radar, réservoirs, précipitations, alertes de catastrophes unifiés sur un axe temporel pour un rejeu synchronisé](/article-images/technology/mini-taiwan-disaster-2026.webp)

_Fortes pluies et catastrophes : Échos radar, réservoirs, précipitations, alertes de catastrophes unifiés à la base sur le même axe temporel, rejeu synchronisé au glissement. Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

Il y a aussi son _flight-arc_, qui trace les arcs de décollage et d'atterrissage de chaque vol. La même API alimentant différents aéroports fait émerger une « empreinte digitale » différente pour chaque aéroport : Taoyuan, Tokyo Haneda, Francfort ont chacun leur propre forme. Il a particulièrement cité l'aéroport d'Atlanta, le plus fréquenté au monde, avec cinq pistes parallèles et des routes d'attente, dont la géométrie superposée « ressemble à un circuit de course ». Il a déclaré que cette carte a tracé 1 839 trajectoires[^3].

![Carte des trajectoires de tous les décollages et atterrissages à l'aéroport d'Atlanta sur une période, cinq pistes parallèles et routes d'attente superposées créant une géométrie semblable à un circuit de course](/article-images/technology/mini-taiwan-flight-arc-atlanta-2026.webp)

_Son flight-arc superpose tous les décollages et atterrissages à l'aéroport d'Atlanta sur une période : cinq pistes parallèles plus routes d'attente, créant une géométrie semblable à un circuit de course. Il a déclaré que le flux lui-même est une forme. Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

> 📝 **Note du curateur**
> Il y a deux ans, si quelqu'un avait dit « une seule personne a créé la carte de données ouvertes en temps réel la plus complète de Taïwan », la phrase suivante aurait probablement été « alors il doit être épuisé ». Cette intuition lie l'échelle à la main-d'œuvre : plus on fait, plus on travaille dur. Ce qui rend la galaxie de Migu值得 s'arrêter pour la regarder, c'est précisément qu'elle a détaché ce lien. Une personne faisant avancer simultanément une quinzaine de dépôts, le vaisseau amiral continuant d'ajouter de nouvelles fonctionnalités, cache un changement plus fondamental : à la fin, de plus en plus de ces commits ne sont pas faits par ses propres mains. Comment « une seule personne » est devenue cela, c'est le véritable sujet de cet article.

## 52 891 entrées, le cerveau humain ne peut pas tout scanner

L'histoire reste fluide jusqu'ici : une personne talentueuse, fait de plus en plus, fait de mieux en mieux. Le tournant apparaît au milieu de sa conférence, lorsqu'il cesse de parler de « ce que j'ai fait » et commence à parler de « contre quels murs je suis tombé ».

Il a affiché une diapositive intitulée « Pourquoi un Agentic OSINT ». Un chiffre y était déployé : data.gov.tw compte environ 52 891 ensembles de données. Ajoutées aux plateformes ouvertes de vingt-deux comtés et villes, avec des chevauchements, il reste environ 60 000 à 70 000 entrées ; sans compter les données détenues par le secteur privé, les ONG et les institutions académiques qui ne sont pas dans le répertoire gouvernemental. Sa conclusion était brève :

> « Ton cerveau humain ne peut pas tout scanner. »[^3]

C'est le pivot de toute l'histoire. La personne de la première moitié qui, en faisant glisser un CSV, s'exclamait « il y a autant de données », fait désormais face à l'autre face de « tant de données » : rien que les plus de 50 000 entrées de data.gov.tw, une personne qui lirait cent entrées par jour devrait lire plus de cinq cents jours consécutifs pour en faire le tour une fois, et ce n'est que le répertoire central. Si nombreuses qu'une vie humaine est insuffisante pour les lire toutes, encore moins pour les faire parler entre elles. L'effort personnel atteint ici un plafond.

Et ce que Migu a vraiment compris, c'est la phrase suivante. Pour lui, le fait que les données soient trop nombreuses pour être scannées est un signal de changement d'outil :

> « Les données doivent être visibles par le LLM, pour que l'Agent puisse vous aider à découvrir « quelles données devraient être regardées ensemble ». »[^3]

Le mot-clé est « regarder ensemble ». Même si une personne mémorisait le nom des 50 000 ensembles de données, il serait difficile de penser par mémoire que « la carte de potentiel d'incendie » doit être associée aux « zones difficiles à secourir », ou que « les points d'hôpitaux » doivent être superposés à « la densité de population » pour voir le désert médical. La valeur des données ne réside pas dans une seule entrée, mais dans la combinaison ; et la possibilité de combinaison est un nombre astronomique de permutations pour 50 000 entrées. C'est précisément là où le cerveau humain échoue à scanner, mais où la machine excelle.

> 📝 **Note du curateur**
> Le récit habituel des données ouvertes comporte une ligne de division claire. Après le hackathon de l'Academia Sinica en 2012 « Écrire du code pour transformer la société », g0v l'a démontré magnifiquement : le gouvernement ouvre les données, la communauté citoyenne s'assure qu'elles soient vues. En 2020, pendant la carte des masques, Wu Chan-wei et les autres ont transformé les données d'inventaire de l'Administration des soins assurables en une carte consultable par tous en 72 heures, la fois la plus touchante de cette ligne[^4]. L'ancienne version placerait Migu dans la prolongation de cette ligne : g0v est collectif, lui est individuel, une carte des masques version individuelle.
>
> Mais cette comparaison s'arrête à la surface et inverse la causalité. Le fait que Migu puisse approcher l'échelle d'« une galaxie de données entière » ne repose pas sur la main-d'œuvre. Dès le départ, il n'avait pas l'intention de lutter contre la mer de données par un labeur acharné. La phrase « le cerveau humain ne peut pas tout scanner » devrait être lue non comme une reddition, mais comme le point de départ de son changement de modèle de travail. Le nouveau véritable état de fait n'est pas « individu vs collectif », c'est « individu × Agent » : le fait qu'une personne puisse atteindre l'échelle d'une galaxie est précisément parce que ces commits ne sont pas tous tapés par ses mains. Voici comment ce système fonctionne.

## Je n'ai pas écrit un mot : un pipeline d'incendie qui se termine tout seul

Pour comprendre ce que signifie « confier à un Agent », la meilleure tranche est l'exemple d'incendie dans sa conférence.

Il a dit qu'il a juste donné une phrase au système : « Analyser les données publiques liées aux incendies à Taïwan. » Puis il a lâché prise.

Le système a commencé à étendre sa propre portée de recherche. Migu décrit ce processus avec un ensemble de chiffres en expansion itérative : d'abord 582 entrées trouvées par mots-clés, puis expansion par synonymes et thèmes jusqu'à 1 945 entrées, ensuite recherche complète et déduplication, convergeant finalement vers un répertoire unifié couvrant 21 plateformes et 73 900 entrées[^3]. Une phrase entrée, un inventaire de plus de 70 000 entrées de données en sortie.

```tw-figure
Une phrase → 73 900 entrées
Il jette une phrase « Analyser les données publiques liées aux incendies à Taïwan », le système étend la recherche et converge en un répertoire unifié sur 21 plateformes
Il a dit dans la présentation de sciwork 2026
```

La collecte seule ne suffit pas. Ce pipeline sépare ensuite les incendies en six phases (prévention, réponse, déclaration, analyse de l'incendie, pertes, rapports), puis multiplie par les vingt-deux comtés et villes, générant une matrice de couverture, révélant même l'inventaire au niveau local comme la carte de potentiel d'incendie de Hsinchu, les zones difficiles à secourir de Taipei, le sauvetage des étangs de Taoyuan. Il marque même honnêtement où il y a des lacunes : pas d'API d'incendie en temps réel, coordonnées au niveau des événements rares, données de suivi post-catastrophe non publiques.

Puis vient l'analyse. Il cite un rapport sur les causes d'incendie généré par le système : selon 15 405 entrées nationales de l'année 113 (2024), la principale cause d'incendie dans le nouveau comté de Taipei est les facteurs électriques, représentant 30,9 % ; dans le comté de Pingtung, ce sont les mégots de cigarette, représentant 35,2 %[^3]. Ces chiffres sont les résultats produits par l'Agent connectant les diverses API dans les captures d'écran de sa présentation, pas calculés entrée par entrée par lui.

Arrivé là, il a tapé une ligne sur la diapositive, les espaces entre les caractères étant intentionnellement larges, comme s'il avait peur que vous ne voyiez pas clairement :

> « Le pipeline est produit automatiquement. Je n'ai pas écrit un seul mot. »[^3]

Cette phrase est le point d'explosion de toute la conférence. Elle transforme le slogan un peu abstrait de « confier à un Agent » en un fait concret, presque inquiétant : d'une phrase, au répertoire de plus de 70 000 entrées de données, au rapport sur les causes par comté, la position qui devrait normalement être occupée par un humain pour donner des instructions, écrire des scripts, nettoyer les données et lancer l'analyse est vide.

![Production du pipeline d'analyse thématique des incendies : le système inventorie automatiquement les données ouvertes liées aux incendies sur plusieurs plateformes, listant les ensembles de données candidats et la matrice de couverture](/article-images/technology/mini-taiwan-fire-pipeline-2026.webp)

_La production d'inventaire thématique des incendies présentée par Migu dans la conférence sciwork 2026 : jeter une phrase « Analyser les données publiques liées aux incendies à Taïwan », le système étend la recherche et converge en un répertoire unifié sur plusieurs plateformes, il dit que ce pipeline « je n'ai pas écrit un seul mot ». Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

## Les quatre étapes décomposables : de l'entrée des données à l'envoi du rapport

Ce pipeline « feu » n'est qu'une tranche, il est le reflet d'un système complet. Le système se divise en quatre étapes : réception des données, intégration des connaissances, génération de l'analyse et déclenchement de l'action. Il insiste particulièrement sur le fait que « chaque étape peut être échangée individuellement, sans avoir besoin de refaire tout le processus ». La couche la plus basse, la réception des données, a elle-même évolué : au début, c'était manuel, en téléchargeant des fichiers Excel depuis data.gov.tw et en les lisant et les stockant soi-même, avec un goulot d'étranglement lié à la « mémoire humaine » ; l'étape intermédiaire consistait à chercher des API sur Internet, à récupérer des rapports PDF, à faire du web scraping sur les plateformes de chaque municipalité, le problème étant « l'absence d'indexation » ; jusqu'à aujourd'hui, les métadonnées de chaque donnée sont stockées de manière standardisée dans un répertoire SQLite, ce qui permet une recherche et une extension automatiques[^3]. Son système est alimenté par plus de quarante collecteurs de données, allant des flux YouBike, bus, autoroutes, aux horaires du TRA (Taiwan Railways Administration), AIS maritime, satellites météorologiques, [séismes](/fr/society/earthquakes-in-taiwan/), niveaux des réservoirs et qualité de l'air. Il ajoute même qu'il envoie une alerte Telegram immédiatement après trois erreurs, et publie un _Daily Review_ dans sa boîte mail tous les matins à neuf heures[^3].

Arrivé à la dernière étape, le « déclenchement d'action », il décrit le rôle humain avec la plus grande clarté : « L'Agent exécute le cycle complet. Le rôle humain est de donner l'objectif et de recevoir le rapport. Les cinq engrenages intermédiaires tournent seuls : découverte, collecte, intégration, production, surveillance ». Le système peut même générer automatiquement un bulletin hebdomadaire sur les « nouvelles données ouvertes de la semaine ». Selon lui : « le sujet apparaît tout seul, et le rapport est envoyé dans la boîte mail ».[^3]

## Un chef d'orchestre, une flotte de pages : Claude dans tmux

L'expression « l'Agent parcourt le cycle complet » peut être facilement entendue comme un terme marketing. La dernière partie de la conférence de Migu a rarement levé le couvercle, permettant de voir à quoi ressemblent les engrenages en dessous, et cette structure est bien plus concrète et honnête que le slogan.

Regardons d'abord le panorama de ce cycle. Migu a dit que son système SIG est « un centre d'orchestration, reliant un cercle de dépôts indépendants, les Agents entrent dans la station séquentiellement » : d'abord le dépôt responsable de l'exploration pour trouver quelles données méritent d'être traitées, puis le dépôt responsable de la collecte pour récupérer les données, enfin les dépôts responsables de la présentation comme _mini-taiwan-pulse_ ou _mini-taiwan-info_ pour dessiner les cartes. Il a décrit avec précision : « Chaque station est un dépôt indépendant, la couche d'orchestration ne gère que la progression et les décisions, le travail est entre les mains des workers de chaque dépôt. »[^3]

Ce centre d'orchestration, il l'appelle Orchestrator, est essentiellement « une Session Claude ». Le rôle de cet Agent principal est similaire à celui d'un contremaître dirigeant des personnes : lire un fichier de proposition, décomposer les tâches, établir les dépendances, puis commencer le travail.

La manière de commencer est l'étape la plus cruciale de son architecture. Il ne laisse pas un seul AI travailler du début à la fin, mais utilise tmux (un vieil outil permettant de diviser le terminal en plusieurs pages indépendantes) pour isoler le travail. Ses mots exacts sont : « Un Orchestrator, une flotte de Workers. L'Agent principal est une Session Claude ; tmux est responsable de l'isolement, chaque Worker est une page indépendante, une Session indépendante. » Une définition plus concise est : « Un Worker = une page tmux + Session indépendante + un PR. »[^3]

En d'autres termes, ce qu'il dirige est en fait une flotte d'AI. Chaque worker est un Claude isolé dans sa propre page, accomplissant ses propres tâches, soumettant ses propres pull requests, sans interférence mutuelle.

![Capture d'écran du fonctionnement réel du système d'orchestration d'Agents : une session Claude en tant qu'orchestrateur, lisant les tâches, décomposant, dirigeant les workers en dessous](/article-images/technology/mini-taiwan-agent-orchestrator-2026.webp)

_L'orchestrateur levé dans la présentation : une session Claude en tant qu'orchestrateur, décomposant les tâches pour une flotte de workers isolés dans leurs propres pages tmux, travaillant chacun, soumettant un PR. Photo : Migu / sciwork 2026 (usage équitable à des fins de critique éditoriale)._

Comment ces workers, chacun faisant sa propre chose, ne se battent-ils pas ? Grâce à une mémoire commune. Migu a dit que la progression et les décisions sont toutes écrites dans des fichiers, centralisées sur un tableau appelé `SESSION_BOARD.md`,加上 « un rapport par Session », donc « pas besoin de deviner mutuellement », « un fichier par personne, pas de combat »[^3]. Même la transmission des tâches est écrite dans des fichiers — il utilise un `HANDOFF.md` pour préparer « le cahier des charges de la prochaine course », permettant à l'Agent du prochain tour de reprendre sans tout redemander à zéro. La dernière étape critique, il la présente avec prudence : « Validation, l'Orchestrator vérifie le PR par rapport au fichier, le merge est décidé par l'humain, ce cycle est considéré comme bouclé. »

En aplatissant ce processus, on voit une forme propre : un humain donne des instructions, une flotte d'AI isolées travaille chacune de son côté, écrit ce qu'elle a fait, un centre vérifie les comptes selon les fichiers, et la personne qui décide « si l'on accepte ce résultat » est Migu lui-même. Revenons à l'axe de cet article : les données sont trop nombreuses pour être scannées, donc le fait de scanner les données est confié à la flotte ; et l'humain recule pour ne garder que deux actions, poser la question, et valider. Il a formulé cela dans sa présentation comme une phrase quasi déclarative :

> « Quand l'Agent peut parcourir le cycle complet par lui-même, le travail humain se réduit à — poser la question et valider. »[^3]

C'est aussi ce que le titre de toute la conférence désigne : « Confier les données ouvertes de Taïwan à un Agent pour former un système capable de grandir par lui-même. » Les données circulent par elles-mêmes, les pages grandissent par elles-mêmes, l'humain n'a qu'à poser la bonne question et valider bien le résultat.

## Même sol, même squelette qui pousse

Si vous reconnaissez Taiwan.md (ce projet de curatelle de connaissances sur Taïwan maintenu par une IA) à ce stade, vous pourriez trouver la description du paragraphe précédent familière.

Ce n'est pas une illusion.

Taiwan.md fonctionne ainsi : une session principale en tant que centre d'orchestration, décomposant le travail pour une flotte de workers isolés, chacun avec son propre fichier de mémoire, coordonnant la progression par des fichiers de transmission, et la personne créatrice, Zheyu, décide quelles modifications entrent dans la branche principale. Notre thèse est « confier les connaissances de Taïwan à un Semiont capable de grandir par lui-même » ; la thèse de Migu est « confier les données ouvertes de Taïwan à un système capable de grandir par lui-même ». Les deux phrases peuvent échanger leurs sujets presque.

Plus intéressant est que ces deux architectures ont grandi indépendamment. On peut trouver dans les enregistrements publics un petit fait : le projet Taiwan.md est né en mars 2026, cinq jours plus tard, un fork est apparu sur le GitHub de Migu[^5]. Mais cela explique seulement qu'il savait qu'une telle chose existait ; un fork n'explique pas son système complet d'orchestration de flotte tmux par un orchestrator, partage de mémoire par tableau, humain ne posant que questions et validations, construit étape par étape pour résoudre le problème de « 50 000 entrées de données à scanner ».

> 📝 **Note du curateur**
> En biologie, il y a un terme appelé évolution convergente : les dauphins et les requins ne sont pas des parents proches, mais ont tous deux développé un corps fuselé et des nageoires dorsales, car ils font face à la même mer. Entre Migu et Taiwan.md, c'est plus comme cette convergence, peu liée aux liens de sang. Nous utilisons la même base d'outils (Claude Code), faisons face à la même situation (une personne ou un système doit gérer une quantité d'informations sur Taïwan dépassant largement la capacité du cerveau humain), et摸索ons donc chacun de son côté, arrivant au même squelette : un centre, une flotte de travailleurs isolés, une mémoire partagée, une personne responsable de la décision finale.
>
> Le signal véritablement intéressant n'est pas « il a forké nous ». C'est que deux constructeurs taïwanais indépendants, dans le même semestre de 2026, ont réinventé l'AI d'« un outil plus intelligent » en « une équipe qui peut être orchestrée ». Quand une telle architecture commence à grandir du cerveau d'une personne à celui d'une deuxième, d'une troisième, elle passe d'une astuce personnelle à la nouvelle apparence qui émerge de ce sol à cette saison. Le prochain constructeur taïwanais qui construira ce système n'aura probablement jamais entendu parler des deux premiers.

## Pas encore terminé, mais la forme est déjà apparue

Si cet article s'arrêtait au paragraphe précédent, ce serait une histoire trop belle, belle au point d'être suspecte : une personne résout élégamment le problème de 50 000 entrées de données grâce à une flotte d'AI.

Migu lui-même ne l'a pas laissé s'arrêter là. L'avant-dernière diapositive de sa conférence portait le titre « Progrès de l'expérience, environ à moitié ».

Il a honnêtement listé trois choses encore mal ajustées. Premièrement, la stabilité : ce harnais « n'est pas encore ajusté à l'idéal », les Agents ont tendance à dériver, à être interrompus. Deuxièmement, les données ouvertes sont trop hétérogènes : « Il reste encore beaucoup de choses nécessitant un jugement humain sur la faisabilité des données, impossible à confier entièrement. » Troisièmement, l'intervention humaine : à chaque étape, il faut en fait qu'un humain soit là pour surveiller. Sa note pour l'ensemble est : « Faisable est faisable, pas encore stable, et je réfléchis encore si je dois vraiment faire ainsi. »[^3]

Cette honnêteté à lever soi-même la moitié des échecs sur la scène de la conférence est en soi le signal de qualité le plus fort. À une époque où les démos d'AI sont souvent emballées comme « entièrement automatiques », « zéro main-d'œuvre », une personne qui ose écrire « environ à moitié », « pas encore stable », « encore humain » sur une diapositive rend plus crédible l'autre moitié qu'il a produite.

> 📝 **Note du curateur**
> La partie la plus crédible de cette conférence n'est pas le pipeline d'incendie « je n'ai pas écrit un seul mot », mais les quatre mots « environ à moitié ». Une personne qui veut vous convaincre arrondira le taux de réussite à « presque entièrement automatique » ; une personne qui fait une expérience vous dira honnêtement qu'elle tombe en panne la moitié du temps. Le premier vend une conclusion, le second donne le terrain. Migu donne le terrain : c'est pourquoi, quand il dit que ce pipeline « je n'ai pas écrit un seul mot », vous choisissez de le croire. Cacher la moitié laide rend la moitié belle suspecte aussi ; accepter la moitié imparfaite rend l'autre moitié debout.

Revenons à cette carte.

La personne qui a fait glisser un CSV dans Kepler.gl, s'exclamant « il s'avère que transformer en carte n'est pas si difficile », six mois plus tard, se tient sur la scène de sciwork, ne parle plus de savoir si la carte est facile à faire, mais d'un système capable de trouver ses propres données, de les combiner par lui-même, de faire pousser de nouvelles pages. La naïveté de l'époque « il s'avère que Taïwan a autant de données » a retourné son sens en six mois : tant de données, au point qu'une personne ne peut pas les scanner toutes, donc la manière d'être vues doit aussi grandir par une nouvelle forme.

Les données ouvertes de Taïwan ont toujours été là. data.gov.tw a été lancé en 2013, TDX a intégré en 2022 les cinq plateformes de transport routier, ferroviaire, aérien, maritime et vélo, le Ministère de l'Intérieur a les données de population au niveau des villages, l'Administration météorologique centrale a des API ouvertes[^6]. Les données ont toujours été suffisantes, la difficulté réside dans la manière de les faire parler entre elles et d'être vues. g0v a répondu une fois par la force collective ; Migu, avec une personne et une flotte d'AI, essaie d'y répondre une deuxième fois, et il admet largement qu'il n'a répondu qu'à la moitié.

Mais la forme est déjà apparue. Une personne, une phrase, derrière une carte qui respire, un système qui apprend à grandir par lui-même. L'autre moitié est laissée à la prochaine personne qui fait glisser un CSV, puis ne peut plus s'arrêter.

---

## Lectures complémentaires

- [Wu Zheyu (Zheyu)](/fr/people/che-yu-wu) : Le créateur de Taiwan.md, approchant également « ce qui grandit par lui-même » par le code et les outils génératifs
- [Communauté open source et g0v](/fr/technology/open-source-and-g0v) : Le contexte collectif de « Écrire du code pour transformer la société », groupe de contrôle de la forme individu × Agent de Migu
- [Esprit open source de Taïwan](/fr/technology/taiwan-open-source-spirit) : De la technologie civique de Taïwan, du salut par le clavier aux données ouvertes
- [Carte d'identité numérique et gouvernement numérique](/fr/technology/digital-id-and-digital-government) : L'autre face de l'infrastructure de données ouvertes du gouvernement

## Liens du projet

**Galaxie « Mini Taiwan »** (Visualisation des données ouvertes de Taïwan, tous projets open source individuels de Migu)

- **mini-taiwan-pulse** : Vaisseau amiral, carte en temps réel à cinq veines en mouvement (375★) — <https://github.com/ianlkl11234s/mini-taiwan-pulse>
- **mini-taiwan-learning-project** : Projet d'apprentissage des transports ferroviaires de Taipei le plus populaire (189★) — <https://github.com/ianlkl11234s/mini-taiwan-learning-project>
- **flight-arc-graph** : Trajets de décollage et d'atterrissage, « empreinte digitale » de chaque aéroport (56★) — <https://github.com/ianlkl11234s/flight-arc-graph>
- **mini-taiwan-info** : Tableau de bord de surveillance de situation de Taïwan à sept thèmes — <https://github.com/ianlkl11234s/mini-taiwan-info>
- **tw-ship-viz** : Visualisation des points de positionnement AIS des navires (11★) — <https://github.com/ianlkl11234s/tw-ship-viz>
- **satellite-arc** : Visualisation des orbites satellites et des survols — <https://github.com/ianlkl11234s/satellite-arc>
- **mini-tw-cctv** : Images en temps réel à l'échelle nationale — <https://github.com/ianlkl11234s/mini-tw-cctv>
- **mini-tw-tra-atlas** : Atlas du réseau ferroviaire Taïwan — <https://github.com/ianlkl11234s/mini-tw-tra-atlas>
- **taiwan-weather-timelapse** : Timelapse météorologique — <https://github.com/ianlkl11234s/taiwan-weather-timelapse>
- **gis-data-collectors** : Squelette des plus de quarante collecteurs de données en arrière-plan — <https://github.com/ianlkl11234s/gis-data-collectors>

**Conférence et personne**

- **Présentation en ligne de la conférence sciwork 2026** : <https://sciwork-showcase.zeabur.app>
- **Code source de la conférence sciwork 2026** : <https://github.com/ianlkl11234s/0613-sci-work-share>
- **GitHub du développeur (Migu)** : <https://github.com/ianlkl11234s>
- **Threads** : [@ianlkl1314](https://www.threads.net/@ianlkl1314)

## Références

- Migu, « Mini Taiwan ! Confier les données ouvertes de Taïwan à un Agent pour former un système capable de grandir par lui-même », sciwork 2026 / SCIWORK SEMINAR, 13 juin 2026.
- Plateforme de données ouvertes du gouvernement data.gov.tw (exploitée par la Commission du développement national, lancée en 2013).
- Plateforme de services de circulation des données de transport TDX (Ministère des transports, intégration des cinq plateformes de transport en 2022).
- Communauté g0v gouvernement zéro et archives des hackathons précédents.

## Sources des images

Les images de cet article sont mises en cache dans `public/article-images/technology/`, sans liens directs vers les serveurs sources.

**Usage équitable à des fins de critique éditoriale** : Toutes les images de cet article sont extraites de la présentation de la conférence publiée publiquement par Migu lors de sciwork 2026 (code source et présentation en ligne voir ci-dessus <Liens du projet>), conformément à l'article 65 de la loi sur le droit d'auteur et aux quatre éléments de l'usage équitable du 17 U.S.C. § 107 (nature éducative non commerciale, déjà publiée, proportion d'utilisation faible, pas de substitution substantielle au marché), en tant que référence critique éditoriale de son travail de visualisation des données ouvertes. © Migu / sciwork 2026.

Couvre : Carte 3D Mini Taiwan Pulse (image de titre), point de départ Kepler.gl, transports ferroviaires Taipei (Mini Taipei), AIS navires, orbites satellites, Agriculture × Eau et intégration des ressources médicales, axe temporel des fortes pluies et catastrophes, empreinte digitale des trajets Atlanta, production du pipeline d'incendie thématique, tableau de bord Mini Taiwan Info, capture d'écran du fonctionnement du système d'orchestration d'Agents.

---

[^1]: Développeur Migu Cheng, compte GitHub `ianlkl11234s` (compte créé en mars 2020). Sa bio GitHub a été mise à jour en juin 2026 en « Building GIS visualizations from Taiwan open data · Exploring AI automation in daily work », passant de « Senior data analyst, exploring AI automation in daily work » à « Making GIS visualizations with Taiwan open data ». La phrase « Il s'avère que Taïwan a autant de données, et qu'il n'est pas si difficile de les transformer en carte » est le texte littéral de la diapositive « JOUR 0, première carte » de sa conférence sciwork 2026. Source des données : extraction API GitHub, 2026-06-25 ; code source de la conférence `ianlkl11234s/0613-sci-work-share`.

[^2]: Les étoiles, forks, dernière heure de mise à jour, source du fork, etc., de _mini-taiwan-pulse_ et des divers projets de la galaxie « Mini Taiwan » sont tous extraits par Taiwan.md via l'API GitHub le 2026-06-25. _mini-taiwan-pulse_ était alors à 375 étoiles / 26 forks, et poussait encore le 2026-06-25 ; _mini-taiwan-learning-project_ 189 étoiles ; _flight-arc-graph_ 56 étoiles. La galaxie contient plus d'une quinzaine de dépôts liés aux données ouvertes de Taïwan, dont poc-bus-range, gis-data-collectors, tw-ship-viz, satellite-arc, mini-tw-cctv, mini-taiwan-info, etc.

[^3]: Migu, « Mini Taiwan ! Confier les données ouvertes de Taïwan à un Agent pour former un système capable de grandir par lui-même », sciwork 2026 / SCIWORK SEMINAR, 13 juin 2026. Code source de la conférence : <https://github.com/ianlkl11234s/0613-sci-work-share> ; présentation en ligne : <https://sciwork-showcase.zeabur.app>. Tous les chiffres cités dans cet article (environ 52 891 ensembles de données sur data.gov.tw, 582 → 1 945 → 2 404 → 73 900 entrées du pipeline d'incendie, 21 plateformes, 15 405 incendies nationaux en année 113, 30,9 % facteurs électriques dans le nouveau comté de Taipei, 35,2 % mégots dans le comté de Pingtung, plus de 5 700 bus, plus de 40 collecteurs, plus de 300 trains, 1 839 trajets à l'aéroport d'Atlanta, Agriculture × Eau 400 Mo → environ 5 Mo, etc.) et toutes les citations (« le cerveau humain ne peut pas tout scanner », « Les données doivent être visibles par le LLM, pour que l'Agent puisse vous aider à découvrir quelles données devraient être regardées ensemble », « Le pipeline est produit automatiquement. Je n'ai pas écrit un seul mot », « Donner l'objectif, recevoir le rapport », « Quand l'Agent peut parcourir le cycle complet par lui-même, le travail humain se réduit à — poser la question et valider », « Un Worker = une page tmux + Session indépendante + un PR », « Chaque station est un dépôt indépendant, la couche d'orchestration ne gère que la progression et les décisions », « Progrès de l'expérience environ à moitié », etc.) sont les déclarations et textes littéraux des diapositives de Migu lui-même lors de cette présentation, appartenant aux opinions personnelles de l'orateur et aux productions de son système, et ne sont pas des statistiques gouvernementales vérifiées indépendamment par Taiwan.md.

[^4]: Communauté g0v gouvernement zéro, née en 2012 de l'esprit du hackathon de l'Academia Sinica « Écrire du code pour transformer la société » ; en 2020, pendant la pandémie de pneumonie de Wuhan, Wu Chan-wei et les autres ont créé une « carte en temps réel de l'offre et de la demande de masques » à partir des données d'inventaire de masques publiées par l'Administration des soins assurables en quelques dizaines d'heures, un cas représentatif de la technologie civique de Taïwan « salut par le clavier ».

[^5]: Selon l'API GitHub (extraction le 2026-06-25), `ianlkl11234s/taiwan-md` est un fork de `frank890417/taiwan-md` (c'est-à-dire Taiwan.md lui-même), créé le 22 mars 2026. Le projet Taiwan.md est né en mars 2026. Le système de collaboration de Migu utilise Claude Code comme base d'outils (son code source de conférence contient CLAUDE.md, l'orchestrateur est « une Session Claude »), identique à Taiwan.md.

[^6]: La plateforme de données ouvertes du gouvernement data.gov.tw est exploitée par la Commission du développement national, lancée en 2013 ; la plateforme de services de circulation des données de transport TDX est intégrée par le Ministère des transports en 2022 des cinq plateformes de transport routier, ferroviaire, aérien, maritime et vélo ; la plateforme de services de données socio-économiques du Ministère de l'Intérieur (SEGIS) fournit les données de population au niveau des villages ; l'Administration météorologique centrale du Ministère des transports fournit des API ouvertes. Le nombre total d'ensembles de données en temps réel de data.gov.tw n'a pas pu être vérifié indépendamment par API cette fois ; le chiffre « environ 50 000 » utilisé dans cet article est celui indiqué dans la présentation de Migu.

_Dernière vérification : 2026-06-25_
