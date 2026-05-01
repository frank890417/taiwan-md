---
title: 'Mini Taiwan Pulse : comment un analyste de données a transformé le pouls des transports taïwanais en trajectoires lumineuses 3D vivantes'
description: 'Le 24 février 2026, un analyste de données nommé Migu Cheng a créé le dépôt mini-taiwan-pulse. Six semaines plus tard, 193 commits et 241 étoiles : à lui seul, il a relié les données ouvertes de FlightRadar24, TDX, SEGIS et CWA, et utilisé Three.js pour dessiner Taïwan sous forme de trajectoires lumineuses 3D vivantes. L infrastructure de données ouvertes de Taïwan figure parmi les meilleures d Asie, mais peu de gens voient cette mer de données. La tech civique, issue des hackathons collectifs de g0v, s étend désormais aux projets personnels du week-end, et la visualisation est en soi une forme de participation.'
date: 2026-04-19
category: Technology
subcategory: '公民科技'
tags: [Technology, 公民科技, 開放資料, 資料視覺化, 開源專案, TDX, Three.js]
readingTime: 12
lastVerified: 2026-04-19
lastHumanReview: true
featured: false
translatedFrom: Technology/mini-taiwan-pulse.md
sourceCommitSha: 55515887
sourceContentHash: sha256:67b51d615cc671f3
translatedAt: 2026-05-01T20:54:17+08:00
---

# Mini Taiwan Pulse : comment un analyste de données a transformé le pouls des transports taïwanais en trajectoires lumineuses 3D vivantes

> **En 30 secondes :** Le 24 février 2026, un développeur dont le compte GitHub s'appelle `ianlkl11234s` et dont la bio indique « Senior Data Analyst, Exploring AI automation in daily work » — Migu Cheng[^1] — a créé un dépôt nommé mini-taiwan-pulse. Six semaines plus tard, ce dépôt comptait 193 commits et 241 étoiles[^2]. Il y a rassemblé les données ouvertes de FlightRadar24 (avions), AIS (navires), TDX (horaires ferroviaires), SEGIS (démographie au niveau des villages) et CWA (grilles météorologiques), dispersées sur différentes plateformes gouvernementales, pour les relier en 23 couches superposées et activables indépendamment, composées de sphères lumineuses, de trajectoires lumineuses et de colonnes de lumière 3D, le tout rendu avec Three.js. Ce n'est ni un projet gouvernemental, ni le fruit d'une subvention, ni un prototype de hackathon du week-end : c'est une personne, sur son temps libre, qui a transformé la mer de données de Taïwan en un paysage visible.

## Un dépôt solitaire, le pouls d'une île

Dans l'historique des commits GitHub du 24 février 2026, le premier commit de `ianlkl11234s/mini-taiwan-pulse` est apparu. L'introduction du README dit :

> Ressentir le pouls de Taïwan à travers les données ouvertes. Les avions tracent des arcs dans le ciel, les navires vont et viennent à la surface de la mer, les trains foncent ponctuellement sur les rails — cette île respire à chaque instant.[^3]

Jusqu'au dernier push du 9 avril, le dépôt avait accumulé 193 commits, 241 étoiles et 12 forks[^2]. L'auteur Migu Cheng n'a laissé sur son profil qu'une seule ligne : « Senior Data Analyst. Exploring AI automation in daily work. » Pas de société, pas de blog, pas de Twitter[^1].

Ce que fait ce dépôt n'est pas simple. Il intègre toutes les sources de données suivantes dans une même carte 3D :

| Couche de données                       | Source                                                           | Échelle                                                       |
| --------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| Positions des vols en temps réel        | API FlightRadar24[^4]                                            | 14 aéroports à Taïwan, plus de 1 500 vols                     |
| Positions AIS des navires               | Système international d'identification automatique AIS           | Eaux autour de Taïwan, traînées de 30 minutes                 |
| Horaires ferroviaires                   | Horaires publics + OSM Overpass[^5]                              | Trains Taiwan Rail / THSR / quatre métros urbains, 333 trains |
| Points de transport public              | Service TDX de circulation des données de transport[^6]          | Bus, autocars, YouBike, pistes cyclables                      |
| Statistiques démographiques par village | SEGIS du ministère de l'Intérieur[^7]                            | 7 748 villages, hexagones H3 résolution 7+8                   |
| Grilles météorologiques                 | Données ouvertes de l'Administration météorologique centrale[^8] | Résolution 0,03°, grille 120×67                               |
| Alertes de catastrophe                  | Flux CAP du NCDR[^9]                                             | Typhons, séismes, inondations                                 |
| Lieux d'événements d'actualité          | RSS de la Central News Agency + géocodage API Gemini[^10]        | Actualités principales/secondaires quotidiennes               |
| Limites aéroports/gares/ports           | API OSM Overpass[^5]                                             | 14 aéroports, 535 gares                                       |

Puis, avec Three.js r172, il superpose six `CustomLayer` indépendants sur un fond de carte Mapbox GL JS v3 : les avions sont des sphères lumineuses multicouches traînant des sillages dégradés en forme de comète ; les navires utilisent un `InstancedMesh` pour le rendu par lots, avec des traînées de 30 minutes en dégradé de couleur par sommet ; 265 segments de lignes OD (origine-destination) pour Taiwan Rail, 333 trains colorés selon le type de service ; 36 phares projetant chacun un faisceau conique rotatif en 3D[^3].

Ces trajectoires lumineuses sont superposées en mode de fusion additive : les zones où plusieurs routes se croisent s'éclairent naturellement. L'intensité du trafic n'a pas besoin de graphiques statistiques — il suffit de regarder la lumière.

## La mer de données de Taïwan, pourquoi si peu de gens la voient

L'infrastructure de données ouvertes de Taïwan figure parmi les meilleures d'Asie. La plateforme gouvernementale de données ouvertes (data.gov.tw) est en ligne depuis 2013 et a accumulé plus de cent mille jeux de données[^11] ; le service TDX de circulation des données de transport du ministère des Transports a intégré en 2022 cinq plateformes (routes, rail, aviation, navigation, cyclisme) pour offrir des API de données statiques et dynamiques de transport public à l'échelle nationale[^6] ; le SEGIS du ministère de l'Intérieur fournit des couches cartographiques spatiales de statistiques démographiques au niveau des villages[^7] ; l'Administration météorologique centrale, le Centre national de recherche sur la prévention des catastrophes naturelles, le ministère de l'Énergie et le Système d'information en temps réel sur les navires dans les eaux taïwanaises disposent chacun de leurs propres API[^8][^9].

Les données existent. Le problème, c'est que **ces données sont dispersées sur différentes plateformes, dans des formats d'API différents, avec des granularités spatiales et des fréquences temporelles différentes**. Quiconque veut voir « ce qui se passe à Taïwan en ce moment » doit écrire ses propres scripts, gérer OData, gérer du CAP XML, gérer du GeoJSON, gérer des hexagones H3, avant même de pouvoir commencer à « visualiser ».

> **📝 Note du curateur**
> Le mouvement pour les données ouvertes comporte deux indicateurs facilement confondus : **la quantité de données** (combien d'API le gouvernement a ouvertes) et **la visibilité des données** (combien de visualisations, d'applications, d'articles en ont été faits). Taïwan est un élève modèle sur le premier indicateur, mais sur le second, il repose depuis longtemps sur les efforts épars de la communauté g0v et de quelques médias d'information commerciaux. C'est dans cette brèche que se situe le plus pertinent de Mini Taiwan Pulse : il ne comble pas un manque de données, il comble un manque de visibilité.

En 2012, g0v (gouvernement zéro) est né lors d'un hackathon à l'Académie sinique, avec le slogan « écrire des programmes pour transformer la société ». Du premier hackathon qui a visualisé le budget général de l'État, à la carte des masques en temps réel de Wu Zhanwei en 2020, qui a connecté 6 000 pharmacies d'assurance maladie en 72 heures et a valu à Taïwan une réputation internationale de « sauver le pays au clavier »[^12], g0v a accumulé plus de 59 hackathons, plus de 7 200 participations et plus de 950 projets proposés[^13].

Mais le récit de g0v est collectif : c'est une communauté, une culture où le samedi matin, des gens s'installent avec leurs ordinateurs portables dans une salle. Mini Taiwan Pulse illustre une autre forme de tech civique : **un week-end solitaire, un git log personnel**. Migu Cheng a mis un lien vers son GitHub en bas du README, sans présentation d'équipe, sans Discord, sans sponsor. Parmi les 193 commits, il y a des refactorisations, des corrections de performances, un compte rendu d'incident du 9 avril 2026 lié à un pic d'E/S[^14]. L'historique des commits de ce dépôt se lit comme un journal d'ingénierie.

## Trois couches de pouls : ciel, océan, terre

Mini Taiwan Pulse divise les objets en mouvement en trois couches :

### Ciel : trajectoires lumineuses des vols

14 aéroports taïwanais, environ 1 500 avions simultanés. Chaque avion est une sphère lumineuse multicouche, avec une animation de respiration simulant un feu anticollision rouge clignotant. Derrière l'avion, un sillage dégradé en forme de comète : sur le thème sombre, les couleurs varient selon l'altitude (orange chaud vers bleu froid) ; sur le thème clair, les couleurs sont aléatoires[^3]. Les données proviennent de l'API publique de FlightRadar24, un réseau mondial de suivi des vols composé de récepteurs ADS-B[^4], avec une densité de couverture très élevée dans l'espace aérien autour de Taïwan.

### Océan : traînées des navires

Les navires utilisent les données AIS (Automatic Identification System), un système de diffusion de position en temps réel imposé par l'Organisation maritime internationale aux grands navires de commerce. Mini Taiwan Pulse représente chaque navire par une sphère lumineuse bleu cyan en `InstancedMesh`, avec une traînée de 30 minutes. Le système filtre automatiquement les sauts GPS anormaux et les MMSI invalides pour garantir que les points lumineux correspondent à de vrais navires[^3].

### Terre : six systèmes de transport guidé

C'est peut-être la partie la plus complexe du projet. Taiwan Rail, le THSR (train à grande vitesse), le métro de Taipei, le métro de Kaohsiung, le tramway de Kaohsiung et le métro de Taichung — six systèmes de transport guidé fonctionnant simultanément. Chaque train est une sphère lumineuse colorée selon le type de service ; Taiwan Rail et le THSR affichent également des traînées de 3 minutes.

Le traitement de Taiwan Rail est particulièrement complexe : l'appariement des segments OD (origine-destination), l'inférence des « golden tracks », les lignes divergentes comme le triangle de Changhua nécessitent un moteur dédié. Le README mentionne explicitement un « moteur dédié à Taiwan Rail »[^3]. Il ne s'agit pas simplement de tracer des horaires sur une carte, mais de reconstituer, à partir des données textuelles des horaires, la position réelle des trains sur les voies.

> **📝 Note du curateur**
> Le « triangle ferroviaire » de Taiwan Rail (comme à Changhua, Taichung ou Nangang) est un détail que seuls les passionnés de chemins de fer remarquent : un train peut entrer et sortir par plusieurs directions, ce n'est pas un simple trajet A→B. La plupart des visualisations ferroviaires simplifient ces segments. Mini Taiwan Pulse a écrit un moteur spécifique pour les traiter. C'est un signal de « profondeur curatoriale » : l'auteur ne se contente pas de connecter des données, il respecte la complexité originelle de ces données.

En plus des trois couches d'objets en mouvement, le projet superpose 23 couches statiques et analytiques activables : colonnes de lumière 3D pour les 535 gares (hauteur proportionnelle au nombre normalisé d'arrêts quotidiens), faisceaux coniques rotatifs 3D pour les 36 phares, réseau routier adaptatif au zoom (autoroutes en rouge / routes provinciales en orange / pistes cyclables en vert), carte de chaleur des hexagones H3 pour la simulation des flux de population (alternance jour/nuis, échelles de couleurs Plasma/Viridis), panneau de 9 indicateurs démographiques (quantité/structure/dépendance), surface ondulée 3D pour les températures de la grille CWA, codage couleur de la congestion sur les autoroutes, échelle de sévérité pour les alertes de catastrophe du NCDR, marqueurs géographiques des événements d'actualité de la CNA[^3].

Au total : 10 catégories, 23 couches, 6 styles de fond de carte Mapbox, navigation par date + accélération de la timeline de 30× à 3600×. Tout cela tient dans un dépôt GitHub solitaire.

## Curatelle technique : combien est-il difficile de rendre des données « en temps réel »

Créer un site de visualisation cartographique n'est pas difficile : le « hello world » de Mapbox tourne en quinze minutes. La difficulté, c'est de le rendre **fluide, en temps réel, capable de gérer plus de 56 000 cellules hexagonales pour les 7 000+ villages de Taïwan**.

Mini Taiwan Pulse présente trois choix architecturaux remarquables :

### 1. Le modèle Overlay Registry

Toutes les couches statiques Mapbox GL (aéroports, gares, ports, phares, routes, champs de vent) sont gérées de manière **pilotée par configuration** via un `overlayRegistry.ts` unifié : un tableau de configuration (`sourceUrl` + fonction `paint`), un `overlayManager.ts` pour les opérations CRUD, un `useEffect` contrôlant la visibilité et le changement de thème de toutes les superpositions. Ajouter une superposition ne nécessite de modifier que trois fichiers[^3].

C'est une architecture classique d'« UI pilotée par les données », pas particulièrement spectaculaire, mais pour un système à 23 couches, c'est la clé de la maintenabilité.

### 2. Intégration de Three.js via CustomLayer

Mapbox GL n'est pas conçu pour dessiner des objets 3D. Mini Taiwan Pulse utilise l'interface `CustomLayer` de Mapbox pour intégrer une scène Three.js dans le même contexte WebGL. Six `CustomLayer` indépendants gèrent respectivement les vols, les navires, le ferroviaire, les phares, les colonnes de lumière des gares et les ondes 3D de température, partageant la matrice de caméra tout en contrôlant individuellement les options de rendu[^3].

C'est l'approche standard pour intégrer Mapbox + Three.js (des bibliothèques tierces comme threebox ou three-geo suivent cette voie[^15]). Mini Taiwan Pulse implémente directement les `CustomLayer` plutôt que de dépendre de threebox, ce qui implique de gérer soi-même la matrice de projection et les paramètres d'éclairage, mais offre un contrôle total sur le pipeline de rendu.

### 3. Le modèle de pré-agrégation via Supabase pg_cron

C'est la décision la plus « ingénierie » du projet. Le pooler de Supabase impose une **limite stricte de 2 minutes de statement_timeout** sur les appels API[^16], ce qui signifie que si une requête SQL dépasse 2 minutes, la connexion est coupée. Pour un système qui doit extraire des trajectoires de navires, des trajectoires de vols et des données de congestion autoroutière chaque jour, interroger directement les tables brutes se heurte inévitablement à ce mur.

La solution de Mini Taiwan Pulse est la suivante : **table classique + fonction de rafraîchissement par jour + pg_cron pour le rafraîchissement programmé + RPC SELECT léger**. Chaque requête temporelle à haute fréquence dispose d'une table de pré-agrégation correspondante, rafraîchie toutes les 10 à 30 minutes par le mécanisme intégré `pg_cron` de Supabase[^17]. Le front-end ne fait que lire les résultats de la table pré-agrégée, avec des temps de réponse stables de l'ordre de la milliseconde :

| RPC                          | Avant   | Après  |
| ---------------------------- | ------- | ------ |
| `get_ship_trails`            | timeout | 123 ms |
| `get_flight_trails`          | timeout | 126 ms |
| `get_freeway_congestion_day` | ~60 s   | 302 ms |
| `get_disaster_alerts_day`    | 13,2 s  | 110 ms |
| `get_temperature_frames`     | 551 ms  | 107 ms |

Ce tableau est directement intégré dans le README[^3], avec un lien vers un rapport d'audit. Pour les lecteurs familiers avec l'architecture Postgres + temps réel, ces lignes sont plus convaincantes qu'une capture d'écran : elles montrent que l'auteur a rencontré un véritable goulot d'étranglement en production et a choisi la bonne solution.

> **📝 Note du curateur**
> Les choix techniques de Mini Taiwan Pulse sont presque tous des « solutions correctes et sans surprise » : CustomLayer Mapbox + Three.js, hexagones H3 open source d'Uber[^18], échelles de couleurs à perception uniforme (Plasma/Viridis/Inferno), normalisation log1p + gamma pour les distributions à queue épaisse, pré-agrégation via Supabase pg_cron. Pas de technique de visualisation inventée, pas de framework à la mode, chaque décision s'appuie sur des références existantes. Ce sentiment de solidité technique sans éclat est la qualité la plus rare dans un projet individuel.

## La définition de la tech civique est en train de s'étirer

Le terme « tech civique » évoque le plus souvent g0v à Taïwan, une communauté « centrée sur la transparence de l'information, l'ouverture des résultats et la collaboration ouverte, qui se soucie des affaires publiques par la force collective des citoyens »[^19]. L'accent de cette définition est mis sur le **collectif** : hackathons, collaboration, écriture collective, revues de PR, jurys de subventions.

Mais Mini Taiwan Pulse illustre une autre forme contemporaine de tech civique : **une personne, une boucle de week-end, une licence MIT**.

Du premier hackathon de g0v en 2012 qui a visualisé le budget général, à la carte des masques de Wu Zhanwei en 2020, au mini-taiwan-pulse de Migu Cheng en 2026. À un extrémité du spectre, il y a la culture de la collaboration collective en présentiel ; à l'autre, l'accumulation lente de commits individuels. Entre les deux, il existe toutes sortes de nuances : des petites équipes qui maintiennent des projets pendant des ans, des projets étudiants, des logiciels open source issus de marchés publics, les bourses d'innovation en tech civique g0v de la Fondation pour la culture ouverte (OCF)[^20].

Ces projets partagent le même postulat : **le gouvernement a ouvert les données, la suite nous appartient**. Le rôle du gouvernement est celui de bâtisseur d'infrastructures de données — TDX, data.gov.tw, SEGIS, CWA — tandis que le rôle de la communauté civique est de rendre ces données « visibles », à travers la visualisation, des wrappers d'API, des tutoriels, des services applicatifs, des tableaux de bord de contrôle parlementaire.

La position de Mini Taiwan Pulse sur ce spectre est claire : ce n'est ni un projet de service (il ne cherche pas à résoudre un problème spécifique), ni un projet d'outil (il ne cherche pas à rendre une bibliothèque réutilisable), c'est un **projet de démonstration**. Quiconque découvre ce dépôt pensera : « Donc c'est à ça que ressemblent des données ouvertes connectées », « Donc TDX + Three.js + Supabase peuvent aller aussi loin », « Donc une seule personne peut accomplir tout cela ».

> **📝 Note du curateur**
> Ce qui manque le plus à l'écosystème taïwanais de données ouvertes, ce ne sont ni les API, ni les ingénieurs, mais **des démonstrations qui présentent les données de manière compréhensible et esthétique au grand public**. Mini Taiwan Pulse a choisi le sujet le plus difficile (échelle nationale + sources de données multiples + mise à jour en temps réel + visualisation 3D) et l'a mené à bien en tant que développeur individuel, jusqu'au stade où il peut être partagé. Le chiffre de 241 étoiles n'est pas significatif en soi ; ce qui compte, c'est qu'il prouve que cette voie est praticable.

## Ce qui pourrait être fait davantage

Mini Taiwan Pulse est actuellement une œuvre de démonstration, pas un produit :

- **Aucune release publiée** : 193 commits mais 0 tag de release, le déploiement se fait via Docker + Nginx auto-hébergé[^3]
- **Certaines sources de données nécessitent une clé API à demander séparément** : l'API commerciale de FlightRadar24, la clé API de la plateforme de données ouvertes de la CWA, l'authentification membre TDX (flux OIDC Client Credentials) doivent être configurées par le lecteur[^6]
- **L'URL de la démo publique n'a pas encore été divulguée** : le README ne contient pas de lien vers une démo en ligne ; pour l'instant, il faut cloner le dépôt et le lancer soi-même
- **Seul 1 issue ouvert, 0 PR** : la communauté collaborative n'a pas encore émergé, ce qui est typique du stade d'un projet de démonstration

Mais tout cela peut changer. Un dépôt avec 241 étoiles signifie que 241 personnes ont cliqué sur « je veux suivre ». Si Migu Cheng décide d'en faire un service public, ou de découper les composants principaux en bibliothèque réutilisable, ou de soumettre le projet sur `grants.g0v.tw` pour demander une bourse[^20], la forme que prendra la prochaine phase de ce projet est une question ouverte qui mérite d'être observée.

## Pourquoi ce projet mérite d'être curaté

Taiwan.md a choisi de faire passer Mini Taiwan Pulse de la [liste de ressources](/resources/mini-taiwan-pulse) au statut d'article approfondi dans la catégorie Technologie, pour trois raisons :

1. **Ce n'est pas un événement d'actualité, c'est un échantillon représentatif**. L'année 2026 comptera certainement beaucoup de commits et d'étoiles dans la communauté taïwanaise des données ouvertes, mais Mini Taiwan Pulse est un point de référence rare sur la dimension « jusqu'où une seule personne peut aller ».
2. **Il donne une forme concrète au concept abstrait de « tech civique »**. La plupart des gens qui parlent de tech civique évoquent g0v, Audrey Tang, la carte des masques ; mais en 2026, la tech civique peut aussi prendre la forme d'un analyste de données écrivant du TypeScript le week-end. Ce n'est pas un récit qui remplace celui de g0v, c'est une extension.
3. **Il montre aux lecteurs le véritable potentiel des données ouvertes gouvernementales**. Si, après avoir lu [Carte d'identité numérique et gouvernement numérique](/technology/數位身分證與數位政府) ou [Communauté open source et g0v](/technology/開源社群與g0v), vous trouvez encore que les données ouvertes sont un concept abstrait, Mini Taiwan Pulse est la note de bas de page qui dit : « Regardez, c'est à cela que ressemblent des données transformées en paysage. »

Un analyste de données, six semaines, 193 commits, 23 couches, une île taïwanaise qui respire.

C'est l'une des formes de la tech civique en 2026.

---

## Pour aller plus loin

- [Communauté open source et g0v](/technology/開源社群與g0v) — Dix ans de trajectoire, du fork de l'État en 2012 à la carte des masques en 2020
- [L'esprit open source taïwan](/technology/台灣開源精神) — Le contexte culturel et les modes de contribution de la communauté open source taïwanaise
- [Carte d'identité numérique et gouvernement numérique](/technology/數位身分證與數位政府) — La couche politique de l'infrastructure numérique gouvernementale
- [PTT (Bulletin Board System)](/technology/PTT批踢踢) — Une autre racine de la culture de collaboration en ligne à Taïwan
- [Wu Zheyu](/people/吳哲宇) — Une autre forme de tech civique : un artiste en nouveaux médias qui bâtit une source unique de vérité (SSOT) pour la souveraineté du savoir taïwanais avec Markdown et GitHub

---

## Liens du projet

- **Dépôt GitHub** : [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Licence** : MIT License
- **Langages principaux** : TypeScript 86,1 % / Python 12,9 %
- **Plateformes de données associées** : [TDX 運輸資料流通服務](https://tdx.transportdata.tw/) · [政府資料開放平臺](https://data.gov.tw/) · [SEGIS 社會經濟資料服務平台](https://segis.moi.gov.tw/) · [中央氣象署開放資料](https://opendata.cwa.gov.tw/)
- **Communautés de tech civique** : [g0v 台灣零時政府](https://g0v.tw/) · [g0v 公民科技創新獎助金](https://grants.g0v.tw/)

---

## Références

- [Dépôt GitHub mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- [TDX 運輸資料流通服務](https://tdx.transportdata.tw/)
- [政府資料開放平臺 data.gov.tw](https://data.gov.tw/)
- [SEGIS 社會經濟資料服務平台](https://segis.moi.gov.tw/)
- [中央氣象署開放資料平臺](https://opendata.cwa.gov.tw/)
- [NCDR 災防中心資料服務平台](https://datahub.ncdr.nat.gov.tw/)
- [g0v 台灣零時政府](https://g0v.tw/)
- [g0v 公民科技創新獎助金](https://grants.g0v.tw/)
- [g0v 黑客松揪松網](https://jothon.g0v.tw/)
- [Documentation Supabase pg_cron](https://supabase.com/docs/guides/database/extensions/pg_cron)
- [Uber H3 : index spatial hiérarchique hexagonal](https://h3geo.org/)
- [OpenStreetMap Taiwan 開放街圖台灣](https://osm.tw/)
- [threebox : plugin Three.js pour Mapbox GL JS](https://github.com/jscastro76/threebox)
- [一手打造口罩地圖，揭露「鍵盤救國」的幕後團隊（TechNews 2020）](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/)

---

[^1]: [Migu Cheng (ianlkl11234s) · GitHub](https://github.com/ianlkl11234s) — Profil du développeur, bio : « Senior Data Analyst. Exploring AI automation in daily work. », compte créé le 7 mars 2020

[^2]: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse) — Dépôt du projet, données extraites de l'API GitHub le 19 avril 2026 : 193 commits, 241 étoiles, 12 forks, 1 issue ouverte

[^3]: [README de mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse/blob/main/README.md) — Documentation technique complète du projet, incluant la liste des couches, la pile technologique, les descriptions d'architecture Overlay Registry / CustomLayer / Supabase pg_cron

[^4]: [Flightradar24 | Flight Tracker](https://www.flightradar24.com/) — Service mondial de suivi des vols en temps réel, réseau de suivi composé de récepteurs ADS-B

[^5]: [OpenStreetMap Taiwan 開放街圖台灣](https://osm.tw/) — Portail de la communauté OSM taïwanaise, l'API Overpass permet d'interroger les données OSM (voies ferrées, gares, limites d'aéroports, etc.)

[^6]: [TDX 運輸資料流通服務](https://tdx.transportdata.tw/) — Point d'entrée unique pour les données ouvertes de transport du ministère des Transports, intégrant cinq plateformes depuis 2022, offrant des API au format OData pour les données statiques et dynamiques de transport public à l'échelle nationale

[^7]: [SEGIS 社會經濟資料服務平台](https://segis.moi.gov.tw/) — Plateforme SIG de données socio-économiques construite par le ministère de l'Intérieur, fournissant des couches cartographiques spatiales de statistiques démographiques au niveau des villages

[^8]: [中央氣象署開放資料平臺](https://opendata.cwa.gov.tw/) — API ouverte de l'Administration météorologique centrale (CWA), fournissant des jeux de données d'observation, de prévision, de grilles, de radar et de satellite

[^9]: [NCDR 災防中心資料服務平台](https://datahub.ncdr.nat.gov.tw/) — Flux d'alerte CAP et API d'événements de catastrophe du Centre national de recherche sur la prévention des catastrophes naturelles

[^10]: [RSS服務 | 中央社 CNA](https://www.cna.com.tw/about/rss.aspx) — Abonnements RSS publics de la Central News Agency, fournissant titres, résumés, liens et images à la une

[^11]: [政府資料開放平臺 data.gov.tw](https://data.gov.tw/) — Point d'entrée unique pour les données ouvertes gouvernementales, géré par le Conseil national de développement, en ligne depuis 2013

[^12]: [一手打造口罩地圖，揭露「鍵盤救國」的幕後團隊 | TechNews 科技新報](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/) — Le processus par lequel Wu Zhanwei et le studio Hao Xiang ont connecté en 72 heures les stocks de masques de plus de 6 000 pharmacies d'assurance maladie à travers le pays

[^13]: [關於揪松團 - g0v 黑客松](https://jothon.g0v.tw/about/) — Statistiques cumulées des hackathons g0v : plus de 59 éditions, plus de 7 200 participations, plus de 950 projets proposés

[^14]: [mini-taiwan-pulse docs/known-issues.md](https://github.com/ianlkl11234s/mini-taiwan-pulse/commits/main) — Commit `docs: known-issues 補 2026-04-09 IO 爆表事件紀錄` et autres entrées de journal d'ingénierie

[^15]: [threebox - Un plugin three.js pour Mapbox GL JS](https://github.com/jscastro76/threebox) — Bibliothèque tierce représentative pour l'intégration Mapbox + Three.js

[^16]: [Supabase Docs | Timeouts](https://supabase.com/docs/guides/database/postgres/timeouts) — Le statement_timeout par défaut du pooler Supabase est de 2 minutes ; les connexions dépassant ce délai sont coupées

[^17]: [pg_cron : planifier des tâches récurrentes dans Postgres | Supabase Docs](https://supabase.com/docs/guides/database/extensions/pg_cron) — Mécanisme de planification cron intégré à Supabase, utilisé pour les tâches programmées au sein de la base de données

[^18]: [Uber H3 : index spatial hiérarchique hexagonal](https://h3geo.org/) — Système de maillage géographique hexagonal open source d'Uber, sous licence Apache 2

[^19]: [g0v 台灣零時政府](https://g0v.tw/) — Communauté de tech civique active depuis 2012, centrée sur la transparence de l'information, l'ouverture des résultats et la collaboration ouverte

[^20]: [g0v 公民科技創新獎助金](https://grants.g0v.tw/) — Bourses pour projets de tech civique gérées par la Fondation pour la culture ouverte (OCF)

---

_Dernière vérification : 2026-04-19_
