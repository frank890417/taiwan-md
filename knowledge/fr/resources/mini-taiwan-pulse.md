---
title: 'Mini Taiwan Pulse — Visualisation 3D en temps réel des transports à Taïwan'
description: "Sentir le pouls de Taïwan à travers les données ouvertes — des traînées lumineuses d'avions traversant le ciel, des navires sillonnant la surface de la mer, des trains fonçant sur les rails, 23 couches superposées révèlent en temps réel la respiration de cette île."
date: 2026-03-22
tags:
  [
    ressources,
    données-ouvertes,
    visualisation,
    transport,
    3D,
    temps-réel,
    Taiwan.md,
  ]
translatedFrom: resources/mini-taiwan-pulse.md
sourceCommitSha: 528d1c04
sourceContentHash: sha256:409b7d5c9d0f3bbd
translatedAt: 2026-05-01T22:19:06+08:00
---

# Mini Taiwan Pulse — Visualisation 3D en temps réel des transports à Taïwan 🌐

> 📖 **Article approfondi** : cette ressource a fait l''objet d''un article de recherche dédié aux technologies civiques. Pour la version complète, voir [Mini Taiwan Pulse : comment un analyste de données a transformé le pouls des transports taïwanais en traînées lumineuses 3D vivantes](/technology/mini-taiwan-pulse) (2026-04-19). Cette page est conservée comme entrée d''index dans la liste des ressources.

> **Aperçu en 30 secondes :** un projet open source qui transforme en temps réel la dynamique des transports à Taïwan en sphères et traînées lumineuses 3D. Les avions tracent des arcs dans le ciel, des navires laissent des sillages à la surface de la mer, des trains foncent sur les rails — 23 couches activables vous permettent de « voir » le pouls de Taïwan.

## Pourquoi y prêter attention

La plupart des gens regardent une carte de Taïwan et n''y voient qu''un contour statique. Mini Taiwan Pulse vous montre une **île qui respire**.

L''ambition du projet est considérable : intégrer sur une même carte 3D les données ouvertes dispersées entre plusieurs agences gouvernementales — vols, positions AIS des navires, horaires des trains conventionnels et à grande vitesse, lignes de métro, statistiques démographiques, observations météorologiques. Pas de simples points sur une carte, mais un langage visuel fait de sphères lumineuses, de traînées, de queues cométaires, qui transforme les données en paysage animé.

> **📝 Note du curateur**
> L''infrastructure de données ouvertes de Taïwan figure parmi les meilleures d''Asie (l''[Open Data Index mondial](https://index.okfn.org/) l''a classée à plusieurs reprises dans le top 10), mais un fossé considérable sépare les « données ouvertes » des « données visibles ». Mini Taiwan Pulse contribue à combler cet écart.

## Trois couches de pulsation

### Le ciel — Traînées lumineuses des vols ✈️

Couvre les vols en temps réel pour 14 aéroports à travers Taïwan, soit plus de 1 500 vols. Chaque avion est représenté par une sphère lumineuse traînant derrière elle un sillage dégradé en forme de queue cométaire. Le facteur d''exagération de l''altitude est réglable (1x à 5x), permettant de distinguer d''un coup d''œil les routes aériennes de basse et haute altitude.

Source des données : API FlightRadar24.

### L''océan — Suivi des navires 🚢

Les positions des navires dans les eaux autour de Taïwan sont indiquées par des sphères lumineuses bleu-vert, chacune laissant une traînée de 30 minutes. Le système filtre automatiquement les sauts GPS anormaux et les MMSI invalides, garantissant que chaque point lumineux correspond à un navire réel.

Source des données : données de positionnement AIS (Système d''identification automatique).

### La terre — Six systèmes ferroviaires 🚄

C''est peut-être la partie la plus impressionnante. Six systèmes ferroviaires fonctionnent simultanément :

| Système                               | Envergure                                              |
| ------------------------------------- | ------------------------------------------------------ |
| Trains conventionnels taïwanais (TRA) | 265 lignes, 333 trains, classés par type en 6 couleurs |
| TGV taïwanais (THSR)                  | Ligne principale nord-sud + branches                   |
| Métro de Taipei (TRTC)                | 8 lignes                                               |
| Métro de Kaohsiung (KRTC)             | Ligne rouge + ligne orange                             |
| Tramway léger de Kaohsiung (KLRT)     | Ligne circulaire                                       |
| Métro de Taichung (TMRT)              | Ligne verte + ligne bleue                              |

Le traitement des trains conventionnels est particulièrement complexe — l''appariement des trajectoires OD, les lignes divergentes comme le triangle de Changhua, font l''objet d''un moteur dédié.

Source des données : horaires publics + données ferroviaires [OpenStreetMap](https://www.openstreetmap.org/).

## Au-delà des transports

En plus des véhicules en mouvement, le projet superpose de multiples couches statiques et analytiques :

- **Infrastructures** : périmètres de 14 aéroports, colonnes lumineuses pour 535 gares (hauteur = nombre d''arrêts), faisceaux rotatifs 3D pour 36 phares
- **Réseau routier** : autoroutes (rouge), routes provinciales (orange), pistes cyclables (vert), largeur adaptative au zoom
- **Analyse démographique** : carte thermique de population en hexagones H3, commutation jour/nuit des flux de population, 9 indicateurs démographiques
- **Météorologie** : données en temps réel des stations d''observation + surface 3D ondulée de température (résolution de grille 0,03°)
- **Actualités** : flux RSS de CNA (Agence centrale de presse) + géocodage via API Gemini, plaçant les événements d''actualité sur la carte
- **Congestion routière** : codage couleur en temps réel du niveau d''embouteillage sur les autoroutes

Au total, **23 couches activables indépendamment**, réparties en dix catégories.

## Points techniques saillants

- **TypeScript + Mapbox GL + Three.js** : la carte 2D utilise le rendu natif Mapbox, les éléments 3D (sphères lumineuses, traînées, colonnes, surfaces de température) sont superposés via Three.js
- **Considérations de performance** : les navires sont rendus par lots via InstancedMesh, l''élimination par fenêtre d''affichage (viewport culling) évite de rendre les objets hors champ
- **Science des couleurs** : les couches démographiques utilisent des échelles de couleurs perceptuellement uniformes (Plasma / Viridis / Inferno), normalisation log1p + gamma pour les distributions à queue épaisse, adapté aux daltoniens
- **Licence MIT** : entièrement open source, forks et contributions bienvenus

> **📝 Note du curateur**
> L''utilisation du mélange additif (additive blending) pour superposer les traînées lumineuses est un choix astucieux — les zones où de multiples routes aériennes se croisent deviennent naturellement plus lumineuses, révélant visuellement la densité du trafic sans nécessiter de graphiques statistiques supplémentaires.

## Écosystème de données ouvertes

Les sources de données interconnectées par ce projet constituent en elles-mêmes un guide des données ouvertes de Taïwan :

| Données                              | Source                                                                               |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| Positions de vols en temps réel      | API FlightRadar24                                                                    |
| AIS des navires                      | Système d''identification automatique international                                  |
| Horaires ferroviaires                | Horaires publics + OSM                                                               |
| Bus / autocars / vélos               | [TDX — Données de transport public](https://tdx.transportdata.tw/)                   |
| Statistiques démographiques          | [SEGIS — Système d''information géographique statistique](https://segis.moi.gov.tw/) |
| Observations météorologiques         | [Administration météorologique centrale](https://www.cwa.gov.tw/)                    |
| Parcs éoliens offshore               | Bureau de l''énergie du ministère de l''Économie                                     |
| Événements d''actualité              | Flux RSS de l''Agence centrale de presse (CNA)                                       |
| Périmètres aéroports / ports / gares | [API Overpass d''OSM](https://overpass-turbo.eu/)                                    |

⚠️ **À noter :** la plateforme [TDX](https://tdx.transportdata.tw/) est l''une des rares plateformes gouvernementales à avoir unifié et standardisé les données nationales de transport public, couvrant bus, autocars, rail, vélos, avec une documentation API complète et un accès gratuit. Cela reste rare à l''échelle mondiale.

## Liens

- **GitHub** : [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Licence** : MIT License
- **Langage** : TypeScript
- **Ressources connexes** : [Plateforme TDX](https://tdx.transportdata.tw/) · [Portail gouvernemental des données ouvertes](https://data.gov.tw/) · [SEGIS — Géographie statistique](https://segis.moi.gov.tw/)

---

_Dernière vérification : 2026-03-22_
