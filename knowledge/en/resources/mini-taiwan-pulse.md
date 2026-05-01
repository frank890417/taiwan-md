---
title: 'Mini Taiwan Pulse — Taiwan Transportation Real-Time 3D Visualization'
date: 2026-03-22
tags:
  - resources
  - open-data
  - visualization
  - transportation
  - 3D
  - real-time
  - 'Taiwan.md'
description: "Using open data, feel the pulse of Taiwan — flight light trails crossing the sky, ships threading the sea, trains rushing along rails, 23 layers rendering this island's breathing in real time."
translatedFrom: 'resources/mini-taiwan-pulse.md'
sourceCommitSha: '528d1c04'
sourceContentHash: 'sha256:409b7d5c9d0f3bbd'
translatedAt: '2026-05-01T12:53:58+08:00'
---

# Mini Taiwan Pulse — Taiwan Transportation Real-Time 3D Visualization

> **In-depth version:** This resource has been upgraded to a full civic tech article. For the complete piece, see [Mini Taiwan Pulse: How One Data Analyst Turned Taiwan's Traffic Pulse into Breathing 3D Light Trails](/en/Technology/mini-taiwan-pulse-civic-tech/) (2026-04-19). This page is retained as an index entry in the resource list.

> **30-second overview:** An open-source project that visualizes Taiwan's real-time transportation dynamics as 3D light spheres and light trails. Flights trace arcs through the sky, ships leave trails across the sea, trains race along rails — 23 toggleable layers let you "see" Taiwan's pulse.

## Why This Is Worth Watching

Most people looking at a map of Taiwan see a static outline. Mini Taiwan Pulse lets you see an **island that is breathing**.

The project's ambitions are not small: it integrates open data scattered across various government agencies — flights, AIS vessel positions, TRA and THSR timetables, metro lines, population statistics, weather observations — all onto a single 3D map. Not simple dot-and-marker notation, but visual language of light spheres, light trails, and comet tails transforming data into moving scenery.

> **Curator's note**
> Taiwan's open data infrastructure ranks among the best in Asia ([Open Data Index](https://index.okfn.org/) has placed it in the top ten multiple times), but a vast gap exists between "data is open" and "data is seen." Mini Taiwan Pulse is filling this gap.

## Three Layers of Pulse

### Sky — Flight Light Trails

Real-time dynamics covering 14 Taiwanese airports and over 1,500 simultaneous flights. Each aircraft is a multi-layered glowing sphere, trailing a comet-tail gradient light trail. Altitude exaggeration ratio is adjustable (1x to 5x), making the difference between low-altitude and high-altitude routes immediately apparent.

Data source: FlightRadar24 API.

### Sea — Vessel Tracking

Vessel positions in Taiwan's surrounding waters marked with teal-blue light spheres, each ship leaving a 30-minute trailing track. The system automatically filters GPS position jumps and invalid MMSI numbers to ensure every light point represents a real ship.

Data source: AIS (Automatic Identification System) vessel position data.

### Land — Six Rail Systems

This may be the most astonishing part. Six rail systems running simultaneously:

| System                               | Scale                                                         |
| ------------------------------------ | ------------------------------------------------------------- |
| TRA                                  | 265 routes, 333 trains, color-coded in 6 types by train class |
| THSR                                 | North-south main line + branch lines                          |
| Taipei Metro (TRTC)                  | 8 lines                                                       |
| Kaohsiung Metro (KRTC)               | Red line + Orange line                                        |
| Kaohsiung Circular Light Rail (KLRT) | Circular light rail                                           |
| Taichung Metro (TMRT)                | Green line + Blue line                                        |

TRA's handling is especially complex — OD track matching, branching routes like the Changhua triangle — all handled by dedicated engines.

Data source: Public timetables + [OpenStreetMap](https://www.openstreetmap.org/) track data.

## More Than Transportation

Beyond moving vehicles, the project overlays multiple static and analytical layers:

- **Infrastructure**: 14 airport boundaries, 3D light columns for 535 stations (height = normalized stop count), 3D rotating cone beams for 36 lighthouses
- **Road network**: National freeways (red), provincial highways (orange), cycling lanes (green), with zoom-adaptive width
- **Population analysis**: H3 hexagonal population heat map, supports day/night human flow switching, 9 population indicators
- **Weather**: Real-time data from weather stations + 3D temperature wave surface (0.03° grid resolution)
- **News**: CNA RSS + Gemini API geocoding, mapping news events onto the map
- **Freeway congestion**: Real-time congestion level color encoding

Total of **23 independently toggleable layers** across ten categories.

## Technical Highlights

- **TypeScript + Mapbox GL + Three.js**: 2D map rendered natively by Mapbox; 3D elements (light spheres, light trails, light columns, temperature surfaces) overlaid with Three.js
- **Performance considerations**: Vessels batch-rendered with `InstancedMesh`; viewport culling to avoid rendering invisible objects
- **Color science**: Population layers use perceptually uniform color scales (Plasma/Viridis/Inferno); log1p + gamma normalization for heavy-tailed distributions; color-blind friendly
- **MIT license**: Fully open-source; welcome to fork and contribute

> **Curator's note**
> Using additive blending for light trail overlay is a clever choice — areas where multiple routes overlap naturally brighten, letting you see traffic route busyness directly from the light without needing a separate statistical chart.

## The Open Data Ecosystem

The data sources this project connects are themselves a guided tour of Taiwan's open data:

| Data                            | Source                                                                |
| ------------------------------- | --------------------------------------------------------------------- |
| Real-time flight positions      | FlightRadar24 API                                                     |
| AIS vessel data                 | International vessel auto-identification system                       |
| Rail timetables                 | Public timetables + OSM                                               |
| Bus/intercity bus/cycling       | [TDX Public Transit Data](https://tdx.transportdata.tw/)              |
| Population statistics           | [SEGIS Statistical Geographic Information](https://segis.moi.gov.tw/) |
| Weather observations            | [Central Weather Administration](https://www.cwa.gov.tw/)             |
| Offshore wind farms             | Ministry of Economic Affairs Energy Bureau                            |
| News events                     | CNA RSS                                                               |
| Airport/port/station boundaries | [OSM Overpass API](https://overpass-turbo.eu/)                        |

Worth noting: Taiwan's [TDX Transport Data eXchange](https://tdx.transportdata.tw/) is one of the few government platforms that standardizes all national public transit data under a unified format, covering bus, intercity bus, rail, and cycling — with complete API documentation and free to use. This is quite uncommon globally.

## Links

- **GitHub**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **License**: MIT License
- **Language**: TypeScript
- **Related resources**: [TDX Transport Data Platform](https://tdx.transportdata.tw/) · [Government Open Data Platform](https://data.gov.tw/) · [SEGIS Statistical Geographic Information](https://segis.moi.gov.tw/)

---

_Last verified: 2026-03-22_
