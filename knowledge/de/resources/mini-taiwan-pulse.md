---
title: 'Mini Taiwan Pulse – Echtzeit-3D-Visualisierung des Verkehrs in Taiwan 🌐'
description: 'Spüren Sie den Puls Taiwans durch Open Data: Flugbahnen ziehen über den Himmel, Schiffe kreuzen die Oberfläche, Züge rasen auf der Strecke – 23 Ebenen zeigen das Atmen dieser Insel in Echtzeit.'
date: 2026-03-22
category: 'resources'
tags:
  [
    'ressourcen',
    'open-data',
    'visualisierung',
    'transport',
    '3D',
    'echtzeit',
    'Taiwan.md',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-22
lastHumanReview: false
translatedFrom: 'resources/mini-taiwan-pulse.md'
sourceCommitSha: '4b6d28c54'
sourceContentHash: 'sha256:409b7d5c9d0f3bbd'
sourceBodyHash: 'sha256:215016d553b05404'
translatedAt: '2026-09-11T12:47:23+08:00'
---

# Mini Taiwan Pulse – Echtzeit-3D-Visualisierung des Verkehrs 🌐

> 📖 **Vertiefte Version**: Diese Ressource wurde zu einem wissenschaftlichen Artikel über Bürgertechnologie aufgewertet; die vollständige Fassung finden Sie in [Mini Taiwan Pulse: Wie ein Datenanalyst den Verkehrspuls Taiwans in atmende 3D-Lichtbahnen umwandelt](/de/technology/mini-taiwan-pulse-civic-tech) (2026-04-19). Diese Seite dient als Indexeintrag der Ressourcen.

> **30-Sekunden-Überblick**: Ein Open-Source-Projekt, das den Verkehrsbetrieb Taiwans in ein 3D-Lichtvolumen und Lichtbahnen umwandelt. Flugzeuge ziehen Bögen am Himmel, Schiffe hinterlassen Schleppenspuren auf dem Meer – 23 wählbare Ebenen ermöglichen es Ihnen, den Puls Taiwans „zu sehen“.

## Warum ist das wichtig?

Die meisten Menschen betrachten eine Karte von Taiwan als statisches Umrissbild. Mini Taiwan Pulse zeigt Ihnen eine **atmende Insel**.

Dieses Projekt ist ehrgeizig: Es integriert Open Data aus verschiedenen Regierungsstellen – Flugdaten, AIS-Schiffsdaten, Fahrpläne der Tai-Rail und Hochgeschwindigkeitszüge (THSR), U-Bahn-Linien, demografische Daten, meteorologische Beobachtungen – in eine einzige 3D-Karte. Dabei werden nicht nur einfache Punkte gesetzt, sondern die Daten durch visuelle Sprachen wie Lichtvolumina, Lichtbahnen oder Kometenschweppen zu einer sich bewegenden Landschaft gemacht.

> **📝 Notiz des Kurators**
> Die Infrastruktur der Open Data Taiwans ist in Asien führend (https://index.okfn.org/ war mehrmals in den Top 10). Dennoch besteht eine große Kluft zwischen „Datenverfügbarkeit“ und „Datenwahrnehmung“. Mini Taiwan Pulse schließt diese Lücke.

## Die drei Ebenen des Pulses

### Himmel – Flugbahn-Lichtbahnen ✈️

Echtzeitdaten von 14 Flughäfen in ganz Taiwan, mit über 1.500 Flügen. Jedes Flugzeug ist eine leuchtende Kugel, die einen kometenartigen, graduellen Lichtpfad hinter sich herzieht. Die Höhenskalierung (1x bis 5x) ist anpassbar und macht den Unterschied zwischen niedrigen und hohen Flugrouten sofort ersichtlich.

Datenquelle: FlightRadar24 API.

### Ozean – Schiffsverfolgung 🚢

Die Positionen von Schiffen in den Gewässern rund um Taiwan werden mit blau-grünen Lichtkugeln angezeigt, wobei jedes Schiff eine Spur von 30 Minuten hinterlässt. Das System filtert automatisch GPS-Fehlanpassungen und ungültige MMSI, sodass jeder sichtbare Lichtpunkt ein echtes Schiff ist.

Datenquelle: AIS (Automatic Identification System) Schiffsdaten.

### Land – Sechs Bahnnetze 🚄

Dies ist möglicherweise der beeindruckendste Teil. Sechs Bahnsysteme laufen synchron:

| System                      | Umfang                                                      |
| :-------------------------- | :---------------------------------------------------------- |
| Tai-Rail (TRA)              | 265 Linien, 333 Züge, klassifiziert nach Zugtyp in 6 Farben |
| THSR                        | Nord-Süd-Hauptstrecke + Nebenlinien                         |
| Taipei U-Bahn (TRTC)        | 8 Linien                                                    |
| Kaohsiung U-Bahn (KRTC)     | Rotlinie + Orange Linie                                     |
| Kaohsiung Light Rail (KLRT) | Ringeisenbahn                                               |
| Taichung U-Bahn (TMRT)      | Grüne Linie + Blaue Linie                                   |

Die Verarbeitung der Tai-Rail ist besonders komplex – spezielle Engines behandeln abweichende Strecken wie die Changhua Dreieckslinie und OD-Streckenabgleiche.

Datenquelle: Öffentliche Fahrpläne + Bahnstreckendaten von [OpenStreetMap](https://www.openstreetmap.org/).

## Mehr als nur Verkehr

Neben den sich bewegenden Fahrzeugen stapelt das Projekt mehrere statische und analytische Ebenen:

- **Infrastruktur**: Die Grenzen der 14 Flughäfen, Lichtmasten (Höhe = Anzahl der Landungen) von 535 Bahnhöfen, drehende Lichtkegel von 36 Leuchttürmen.
- **Netzwerk**: Nationalstraßen (Rot), Provinzstraßen (Orange), Fahrradwege (Grün), mit adaptiver Zoom-Breite.
- **Bevölkerungsanalyse**: H3-Hexagon-Dichtekarten, die Tag-/Nachtverkehr umschalten können, und 9 demografische Indikatoren.
- **Meteorologie**: Echtzeitdaten von Messstationen + 3D-Oberfläche der Temperaturwelle (0,03°-Rasterauflösung).
- **Nachrichten**: CNA Nachrichten-RSS + Gemini API Geokodierung, die Nachrichtenereignisse auf der Karte markiert.
- **Stau auf Nationalstraßen**: Echtzeitfarbkodierung des Staugrades.

Insgesamt **23 unabhängig wählbare Ebenen** in zehn Kategorien.

## Technische Highlights

- **TypeScript + Mapbox GL + Three.js**: Die 2D-Karte wird nativ mit Mapbox gerendert; die 3D-Elemente (Lichtkugeln, Lichtbahnen, Lichtmasten, Temperaturflächen) werden mit Three.js hinzugefügt.
- **Leistungskonsiderationen**: Schiffe werden mittels InstancedMesh batched gerendert; Viewport Culling verhindert das Rendern unsichtbarer Objekte.
- **Farbwissenschaft**: Die Bevölkerungsdarstellung verwendet wahrnehmungsgleiche Farbskalen wie Plasma / Viridis / Inferno, und die Schwanzverteilung wird durch log1p + Gamma normalisiert, was farbenblindfreundlich ist.
- **MIT Lizenz**: Komplett Open Source, Forking und Beiträge sind willkommen.

> **📝 Notiz des Kurators**
> Die Verwendung von additiver Mischung (additive blending) zum Überlagern der Lichtbahnen war eine kluge Wahl – Bereiche, in denen mehrere Routen sich überlappen, werden natürlich heller, was die Betriebsamkeit der Route visuell darstellt, ohne zusätzliche statistische Diagramme zu benötigen.

## Ökosystem der Open Data

Die Datenquellen, mit denen dieses Projekt verbunden ist, sind selbst ein Verzeichnis der Open Data Taiwans:

| Daten                                 | Quelle                                                            |
| :------------------------------------ | :---------------------------------------------------------------- |
| Echtzeit-Flugpositionen               | FlightRadar24 API                                                 |
| Schiffs-AIS                           | Internationales automatisiertes Identifikationssystem für Schiffe |
| Eisenbahnfahrpläne                    | Öffentliche Fahrpläne + OSM                                       |
| Bus/Fernbus/Fahrrad                   | [TDX ÖPNV Daten](https://tdx.transportdata.tw/)                   |
| Demografische Daten                   | [SEGIS Statistikgeodaten](https://segis.moi.gov.tw/)              |
| Wetterbeobachtungen                   | [Zentrales Meteorologisches Amt](https://www.cwa.gov.tw/)         |
| Offshore-Windfelder                   | Ministerium für Energie (MOEA)                                    |
| Nachrichtenereignisse                 | CNA Zentralagentur RSS                                            |
| Grenzen von Flughäfen/Häfen/Bahnhöfen | [OSM Overpass API](https://overpass-turbo.eu/)                    |

⚠️ **Wichtig zu beachten**: Der [TDX Transportdaten-Austauschdienst](https://tdx.transportdata.tw/) Taiwans ist eine der wenigen Regierungsplattformen, die alle öffentlichen Verkehrsmittel – Busse, Fernbusse, Eisenbahnen, Fahrräder usw. – standardisiert abdecken und deren API vollständig und kostenlos nutzbar ist. Dies ist weltweit selten.

## Links

- **GitHub**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Lizenz**: MIT License
- **Sprache**: TypeScript
- **Verwandte Ressourcen**: [TDX Transportdatenplattform](https://tdx.transportdata.tw/) · [Regierungs-Open-Data-Plattform](https://data.gov.tw/) · [SEGIS Statistikgeodaten](https://segis.moi.gov.tw/)

---

_Letzte Validierung: 2026-03-22_
