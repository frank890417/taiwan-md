---
title: 'Mini Taiwan Pulse — Real-time 3D Transportation Visualization'
date: 2026-03-22
tags: [resources, open-data, visualization, transportation, 3D, real-time, Taiwan.md]
description: 'Feel Taiwan\'s pulse through open data — flight paths traced across the sky, ships navigating the seas, trains racing on tracks. 23 real-time layers bring this island\'s heartbeat to life.'
translatedFrom: 'resources/mini-taiwan-pulse.md'
---

# Mini Taiwan Pulse — Real-time 3D Transportation Visualization 🌐

> **30-second overview:** An open-source project that transforms Taiwan's real-time transportation dynamics into 3D light orbs and trajectories. Flights carve arcs across the sky, ships leave trails on the ocean surface, trains race along tracks — 23 switchable layers let you "see" Taiwan's pulse.

## Why It Matters

Most people looking at Taiwan maps see static outlines. Mini Taiwan Pulse shows you a **breathing island**.

This project has ambitious goals: integrating scattered open data from various government agencies — flights, AIS ship tracking, Taiwan Railway and High Speed Rail timetables, MRT routes, demographic statistics, weather observations — all onto a single 3D map. Not simple dot markers, but visual language using light orbs, light trails, and comet tails that transform data into moving landscapes.

> **📝 Curator's Note**
> Taiwan's open data infrastructure ranks among Asia's best (consistently in the top ten of the [Global Open Data Index](https://index.okfn.org/)), but there's a vast gap between "data being open" and "data being seen." Mini Taiwan Pulse is filling this gap.

## Three Layers of Pulse

### Sky — Flight Light Trails ✈️

Real-time dynamics covering all 14 airports and 1,500+ flights across Taiwan. Each aircraft appears as a glowing orb with a comet-tail gradient trail behind it. Height exaggeration can be adjusted (1x~5x) to clearly distinguish between low-altitude and high-altitude routes.

Data source: FlightRadar24 API.

### Ocean — Vessel Tracking 🚢

Ship positions around Taiwan's waters, marked with cyan light orbs, each leaving a 30-minute trail. The system automatically filters GPS anomaly jumps and invalid MMSI to ensure every light point you see represents a real vessel.

Data source: AIS (Automatic Identification System) vessel position data.

### Land — Six Rail Systems 🚄

This might be the most stunning component. Six rail systems running simultaneously:

| System                      | Scale                                                        |
| --------------------------- | ------------------------------------------------------------ |
| Taiwan Railways (TRA)       | 265 routes, 333 trains, 6-color classification by train type |
| High Speed Rail (THSR)      | Main north-south line + branch lines                         |
| Taipei Metro (TRTC)         | 8 lines                                                      |
| Kaohsiung Metro (KRTC)      | Red line + Orange line                                       |
| Kaohsiung Light Rail (KLRT) | Circular light rail                                          |
| Taichung Metro (TMRT)       | Green line + Blue line                                       |

TRA processing is particularly complex — OD track matching and divergent routes like the Changhua Triangle all have dedicated engines for handling.

Data sources: Public timetables + [OpenStreetMap](https://www.openstreetmap.org/) track data.

## More Than Just Transportation

Beyond moving vehicles, the project overlays multiple static and analytical layers:

- **Infrastructure**: 14 airport boundaries, 535 station light columns (height = number of stops), 36 lighthouses with 3D rotating beams
- **Road Networks**: National highways (red), provincial roads (orange), bicycle paths (green), with zoom-adaptive widths
- **Population Analysis**: H3 hexagonal population heat maps, supporting day/night population flow switching, 9 demographic indicators
- **Weather**: Real-time observation station data + 3D temperature wave surfaces (0.03° grid resolution)
- **News**: CNA (Central News Agency) RSS + Gemini API geocoding, mapping news events on the map
- **Highway Congestion**: Real-time congestion level color coding

Total of **23 independently switchable layers** across ten categories.

## Technical Highlights

- **TypeScript + Mapbox GL + Three.js**: 2D maps use native Mapbox rendering, 3D elements (light orbs, trails, columns, temperature surfaces) overlaid with Three.js
- **Performance Considerations**: Ships use InstancedMesh batch rendering, viewport culling avoids rendering invisible objects
- **Color Science**: Population layers use perceptually uniform color scales like Plasma/Viridis/Inferno, log1p + gamma normalization for heavy-tail distributions, colorblind-friendly
- **MIT License**: Completely open source, welcome forks and contributions

> **📝 Curator's Note**
> Using additive blending for light trail overlays is a clever choice — areas where multiple flight routes overlap naturally become brighter, visually showing route density without additional statistical charts.

## Open Data Ecosystem

The data sources this project connects to form a guide to Taiwan's open data landscape:

| Data                            | Source                                                       |
| ------------------------------- | ------------------------------------------------------------ |
| Real-time Flight Positions      | FlightRadar24 API                                            |
| Ship AIS                        | International Automatic Identification System                |
| Railway Timetables              | Public timetables + OSM                                      |
| Bus/Coach/Bike                  | [TDX Transport Data Exchange](https://tdx.transportdata.tw/) |
| Population Statistics           | [SEGIS Statistical GIS](https://segis.moi.gov.tw/)           |
| Weather Observations            | [Central Weather Administration](https://www.cwa.gov.tw/)    |
| Offshore Wind Farms             | Ministry of Economic Affairs Bureau of Energy                |
| News Events                     | Central News Agency CNA RSS                                  |
| Airport/Port/Station Boundaries | [OSM Overpass API](https://overpass-turbo.eu/)               |

⚠️ **Worth noting:** Taiwan's [TDX Transport Data Exchange](https://tdx.transportdata.tw/) is one of the few government platforms globally that standardizes all national public transport data, covering buses, coaches, railways, bicycles, etc., with comprehensive API documentation and free usage. This is uncommon worldwide.

## Links

- **GitHub**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **License**: MIT License
- **Language**: TypeScript
- **Related Resources**: [TDX Transport Platform](https://tdx.transportdata.tw/) · [Government Open Data Platform](https://data.gov.tw/) · [SEGIS Statistical Geography](https://segis.moi.gov.tw/)

---

_Last verified: 2026-03-22_
