---
title: 'Mini Taiwan Pulse — Visualisation 3D du trafic en temps réel à Taïwan'
date: 2026-03-22
tags: [ressources, données-ouvertes, visualisation, transports, 3D, temps-réel, Taiwan.md]
description: "Ressentez le pouls de Taïwan à travers les données ouvertes — les trajectoires lumineuses des avions sillonnent le ciel, les navires glissent sur les flots, les trains filent sur leurs rails : 23 couches superposées restituent en temps réel la respiration de cette île."
category: 'resources'
subcategory: 'Outils et ressources'
author: 'Taiwan.md Translation Team'
readingTime: 5
featured: false
translatedFrom: 'resources/mini-taiwan-pulse.md'
lastVerified: 2026-03-22
---

# Mini Taiwan Pulse — Visualisation 3D du trafic en temps réel à Taïwan 🌐

> **En 30 secondes :** un projet open source qui transforme les flux de transport taïwanais en sphères et traînées lumineuses 3D animées en temps réel. Les avions tracent leurs arcs dans le ciel, les navires laissent un sillage sur la mer, les trains courent sur leurs voies — 23 couches commutables pour « voir » le pouls de Taïwan.

## Pourquoi cela mérite l'attention

La plupart des gens regardent une carte de Taïwan et n'y voient qu'un contour figé. Mini Taiwan Pulse vous montre une **île qui respire**.

L'ambition du projet est considérable : agréger sur une même carte 3D les données ouvertes disséminées dans diverses administrations — vols, AIS maritime, horaires TRA et THSR, lignes de métro, démographie, observations météorologiques. Pas de simples marqueurs ponctuels, mais un vocabulaire visuel fait de sphères lumineuses, de traînées et de queues cométaires qui transforment les données en paysage animé.

> **📝 Note de curation**
> L'infrastructure de données ouvertes de Taïwan est parmi les meilleures d'Asie (l'[Open Data Index](https://index.okfn.org/) la place régulièrement dans le top dix mondial), mais un gouffre sépare « données disponibles » et « données visibles ». Mini Taiwan Pulse s'emploie à combler ce fossé.

## Les trois dimensions du pouls

### Le ciel — trajectoires de vols ✈️

Couvre la dynamique en temps réel de 14 aéroports et de plus de 1 500 vols à travers Taïwan. Chaque avion est une sphère lumineuse traînant une queue cométaire en dégradé. Le facteur de grossissement de l'altitude est réglable (1x à 5x), ce qui permet de distinguer au premier coup d'œil les couloirs aériens bas des routes en altitude.

Source : API FlightRadar24.

### L'océan — suivi des navires 🚢

Les positions des navires dans les eaux entourant Taïwan sont représentées par des sphères bleu-cyan, chacune laissant une traînée de 30 minutes. Le système filtre automatiquement les sauts GPS aberrants et les MMSI invalides : chaque point lumineux correspond à un navire réel.

Source : données de position AIS (système d'identification automatique).

### La terre — six réseaux ferroviaires 🚄

C'est peut-être la partie la plus saisissante. Six systèmes ferrés fonctionnent en synchronisation :

| Réseau | Envergure |
|--------|-----------|
| TRA (réseau national) | 265 lignes, 333 trains, 6 couleurs selon le type de service |
| THSR (grande vitesse) | Ligne principale nord-sud + embranchements |
| Métro de Taipei (TRTC) | 8 lignes |
| Métro de Kaohsiung (KRTC) | Ligne rouge + ligne orange |
| Tramway de Kaohsiung (KLRT) | Boucle légère |
| Métro de Taichung (TMRT) | Ligne verte + ligne bleue |

Le traitement du réseau TRA est particulièrement complexe — correspondance OD des voies, aiguillages en triangle comme celui de Changhua — autant de cas spéciaux pris en charge par des moteurs dédiés.

Source : horaires publics + données ferroviaires [OpenStreetMap](https://www.openstreetmap.org/).

## Bien plus que les transports

Au-delà des véhicules en mouvement, le projet superpose plusieurs couches statiques et analytiques :

- **Infrastructures** : périmètres des 14 aéroports, colonnes lumineuses pour 535 gares (hauteur = nombre d'arrêts), faisceaux 3D rotatifs pour 36 phares
- **Réseau routier** : autoroutes (rouge), routes provinciales (orange), pistes cyclables (vert), largeur adaptative selon le zoom
- **Analyse démographique** : carte de chaleur hexagonale H3, avec basculement flux diurne/nocturne et 9 indicateurs démographiques
- **Météorologie** : données en temps réel des stations d'observation + surface courbe 3D des températures (résolution 0,03°)
- **Actualités** : flux RSS de l'agence CNA + géocodage via l'API Gemini, pour localiser les événements sur la carte
- **Congestion autoroutière** : code couleur en temps réel selon le niveau de trafic

Au total, **23 couches indépendamment commutables**, réparties en dix catégories.

## Points techniques remarquables

- **TypeScript + Mapbox GL + Three.js** : le fond de carte 2D est rendu nativement par Mapbox ; les éléments 3D (sphères, traînées, colonnes, surface thermique) sont superposés via Three.js
- **Performance** : les navires utilisent un `InstancedMesh` pour le rendu par lot, complété par un culling de viewport afin d'éviter de rendre les objets hors champ
- **Colorimétrie** : les couches démographiques utilisent des palettes perceptuellement uniformes (Plasma, Viridis, Inferno) avec normalisation log1p + gamma pour gérer les distributions à longue queue, dans le respect de l'accessibilité daltonisme
- **Licence MIT** : entièrement open source, fork et contributions bienvenus

> **📝 Note de curation**
> Le choix de l'additive blending pour superposer les traînées est particulièrement judicieux : là où plusieurs routes se croisent, la zone s'illumine naturellement, révélant visuellement l'intensité du trafic aérien sans avoir recours à un graphique statistique supplémentaire.

## L'écosystème des données ouvertes

Les sources de données mobilisées par ce projet constituent à elles seules un panorama des données ouvertes à Taïwan :

| Données | Source |
|---------|--------|
| Position des vols en temps réel | API FlightRadar24 |
| AIS maritime | Système d'identification automatique international |
| Horaires ferroviaires | Horaires publics + OSM |
| Bus / autocars / vélos | [TDX — Transport Data eXchange](https://tdx.transportdata.tw/) |
| Démographie | [SEGIS — Système d'information géographique statistique](https://segis.moi.gov.tw/) |
| Observations météo | [Administration météorologique centrale](https://www.cwa.gov.tw/) |
| Parcs éoliens offshore | Bureau de l'énergie, ministère de l'Économie |
| Actualités | Flux RSS de l'agence CNA |
| Aéroports / ports / gares | [API Overpass d'OSM](https://overpass-turbo.eu/) |

> ⚠️ **À noter :** la plateforme [TDX](https://tdx.transportdata.tw/) est l'une des rares initiatives gouvernementales à normaliser à l'échelle nationale les données de transports publics — bus, autocars, rail, vélos — avec une documentation API complète et un accès gratuit. Ce n'est pas courant à l'échelle mondiale.

## Liens

- **GitHub** : [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Licence** : MIT License
- **Langage** : TypeScript
- **Ressources associées** : [Plateforme TDX](https://tdx.transportdata.tw/) · [Portail des données ouvertes](https://data.gov.tw/) · [SEGIS statistique géographique](https://segis.moi.gov.tw/)

---

*Dernière vérification : 2026-03-22*
