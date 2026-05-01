---
title: "Mini Taiwan Pulse: How One Data Analyst Turned Taiwan's Traffic Pulse into Breathing 3D Light Trails"
description: "On February 24, 2026, a data analyst named Migu Cheng opened the mini-taiwan-pulse repository. Six weeks later it had 193 commits and 241 stars: working alone, he wired together open data from FlightRadar24, TDX, SEGIS, and CWA and used Three.js to render Taiwan as a breathing island of 3D light trails. Taiwan's open data infrastructure is among the best in Asia, yet very few people can see that ocean of data. Civic tech has expanded from g0v's collective hackathons into individual weekend projects, and visualization itself is a form of civic participation."
date: 2026-04-19
tags:
  - Technology
  - 'Civic Tech'
  - 'Open Data'
  - 'Data Visualization'
  - 'Open Source'
  - TDX
  - 'Three.js'
category: Technology
subcategory: '公民科技'
author: 'Taiwan.md Contributors'
featured: false
readingTime: 12
lastVerified: 2026-04-19
lastHumanReview: true
translatedFrom: 'Technology/mini-taiwan-pulse.md'
sourceCommitSha: '55515887'
sourceContentHash: 'sha256:67b51d615cc671f3'
translatedAt: '2026-05-01T12:53:58+08:00'
---

# Mini Taiwan Pulse: How One Data Analyst Turned Taiwan's Traffic Pulse into Breathing 3D Light Trails

> **30-second overview:** On February 24, 2026, a developer named Migu Cheng — GitHub handle `ianlkl11234s`, bio reading "Senior Data Analyst, Exploring AI automation in daily work"[^1] — opened a repository called mini-taiwan-pulse. Six weeks later the repo had 193 commits and 241 stars[^2]. He had wired together open data scattered across different government platforms — FlightRadar24 flights, AIS vessel positions, TDX rail schedules, SEGIS village-level population data, CWA weather grids — into 23 independently toggleable layers of light spheres, light trails, and 3D light columns rendered with Three.js. It is not a government project, not a grant recipient, and not a hackathon weekend prototype. It is one person's leisure time turning Taiwan's ocean of data into visible scenery.

## One Person's Repo, One Island's Pulse

On February 24, 2026, the first commit landed in `ianlkl11234s/mini-taiwan-pulse` on GitHub's commit history. The opening of the README reads:

> Using open data, feel the pulse of Taiwan. Flights trace arcs through the sky, ships crisscross the sea, trains run on time along their tracks — this island breathes with every passing moment.[^3]

By the time of the last push on April 9, the repo had accumulated 193 commits, 241 stars, and 12 forks[^2]. Author Migu Cheng left only one line on his profile: "Senior Data Analyst. Exploring AI automation in daily work." No employer, no blog, no Twitter[^1].

What this repo does is not simple. It connects all of the following data sources into a single 3D map:

| Data Layer                      | Source                                       | Scale                                                 |
| ------------------------------- | -------------------------------------------- | ----------------------------------------------------- |
| Real-time flight positions      | FlightRadar24 API[^4]                        | 14 airports across Taiwan, 1,500+ flights             |
| AIS vessel positions            | International AIS auto-identification system | Taiwan's surrounding waters, 30-minute trailing track |
| Rail schedules                  | Public timetables + OSM Overpass[^5]         | TRA/THSR/four metro systems, 333 trains               |
| Public transit stops            | TDX Transport Data eXchange[^6]              | Bus, intercity bus, YouBike, cycling lanes            |
| Village population statistics   | MOI SEGIS[^7]                                | 7,748 villages, H3 hexagonal grid res7+res8           |
| Weather grids                   | Central Weather Administration open data[^8] | 0.03° resolution, 120×67 grid                         |
| Disaster alerts                 | NCDR CAP feed[^9]                            | Typhoon, earthquake, flooding                         |
| News event markers              | CNA RSS + Gemini API geocoding[^10]          | Daily primary/secondary news                          |
| Airport/port/station boundaries | OSM Overpass API[^5]                         | 14 airports, 535 stations                             |

All of this is then rendered on a Mapbox GL JS v3 basemap using six independent Three.js r172 `CustomLayer`s: aircraft appear as glowing spheres with comet-tail gradient light trails; vessels are batch-rendered with `InstancedMesh` at 30-minute trailing positions using per-vertex color gradients; TRA runs 265 OD track segments with 333 trains color-coded across 6 types; 36 lighthouses each cast a 3D rotating cone of light[^3].

These light trails are stacked using additive blending. Areas where multiple routes overlap naturally brighten — the busyness of traffic is immediately legible from the light without any statistical chart.

## Taiwan's Ocean of Data — Why So Few People Can See It

Taiwan's open data infrastructure ranks among the best in Asia. The government's open data platform (data.gov.tw) launched in 2013 and has accumulated over 100,000 datasets[^11]. The Ministry of Transportation's TDX Transport Data eXchange unified five major platforms in 2022 — road, rail, aviation, maritime, and cycling — providing nationwide public transit static and dynamic data APIs[^6]. The MOI's SEGIS delivers spatial layers of population statistics down to the village level[^7]. The Central Weather Administration, the National Science and Technology Center for Disaster Reduction, the Ministry of Economic Affairs Energy Bureau, and the Taiwan AIS ship information system all maintain their own APIs[^8][^9].

The data exists. The problem is that **these data sources are scattered across different platforms, use different API formats, different spatial granularities, and different temporal frequencies**. A person who simply wants to see "what Taiwan looks like right now" has to write their own scrapers, handle OData, handle CAP XML, handle GeoJSON, handle H3 hexagons — and only then can they begin the task of "visualization."

> **Curator's note**
> The open data movement is often measured by two easily conflated metrics: **how much data there is** (how many APIs the government has published) and **how visible the data is** (how many visualizations, applications, and stories exist). Taiwan is a model student on the first metric, but for the second it has long relied on the scattered efforts of the g0v community and a handful of commercial news outlets. This gap is Mini Taiwan Pulse's most meaningful position: what it fills is not the data, but the visibility.

In 2012, the g0v civic technology movement was born at a hackathon at Academia Sinica under the motto "write code to change society." From the first hackathon that visualized the government's entire budget, to 2020 when Wu Zhan-wei assembled a real-time mask map for over 6,000 NHI pharmacies in 72 hours — cementing Taiwan's international reputation as a country of "keyboard civic action"[^12] — g0v has accumulated over 59 hackathons, 7,200+ participants, and 950+ proposed projects[^13].

But g0v's narrative is collective: it is a community, a culture of people showing up on Saturday mornings with laptops crammed into venues. Mini Taiwan Pulse demonstrates another contemporary form of civic tech: **one person's weekend, one person's git log**. Migu Cheng put his GitHub link at the bottom of the README — no team page, no Discord, no sponsors. The 193 commits include refactors, performance fixes, and an entry documenting an IO overload event on April 9, 2026[^14]. Reading the commit history of this repo is like reading an engineering diary.

## Three Layers of Pulse: Sky, Sea, Land

Mini Taiwan Pulse organizes moving objects into three layers:

### Sky: Flight Light Trails

14 Taiwanese airports, approximately 1,500 flights active at any moment. Each aircraft is a multi-layered glowing sphere with an animated blinking red anti-collision light. The comet-tail gradient light trail behind each plane is colored by altitude in dark mode (warm orange fading to cool blue), with random colors in light mode[^3]. Data comes from FlightRadar24's public API — a global flight-tracking network composed of ADS-B receivers[^4] — with very dense coverage of Taiwan's airspace.

### Sea: Vessel Trails

Vessel data uses AIS (Automatic Identification System), the international maritime organization's mandated real-time position broadcasting system for large commercial ships. Mini Taiwan Pulse marks vessel positions with teal-blue `InstancedMesh` light spheres, each with a 30-minute trailing track; the system automatically filters GPS position jumps and invalid MMSI numbers to ensure every light point represents a real ship[^3].

### Land: Six Rail Systems

This may be the hardest part of the entire project to implement. TRA, THSR, Taipei Metro, Kaohsiung Metro, Kaohsiung Circular Light Rail, and Taichung Metro — six rail systems running simultaneously, each train a light sphere color-coded by type, with TRA and THSR trains leaving 3-minute trailing tracks.

TRA's treatment is especially complex: OD track matching, golden track inference, branch-point routes like the Changhua triangle — all require specialized handling. The README directly names "TRA dedicated engine"[^3]. This is not simply plotting a timetable onto a map; it is reverse-engineering from timetable text data to the actual position of each train on its track.

> **Curator's note**
> The "triangle" junctions in TRA (such as Changhua, Taichung, Nangang) are details that only rail enthusiasts notice: trains can enter and exit from multiple directions, not simply A→B routes. Most rail visualizations simplify these sections. Mini Taiwan Pulse wrote a dedicated engine to handle them. This is a signal of "curatorial depth" — the author didn't just wire the data, he respected the original complexity of the data.

Beyond the three layers of moving objects, the project also overlays 23 toggleable static and analytical layers: 3D light columns for 535 stations (height proportional to normalized daily stop count), 3D rotating cone beams for 36 lighthouses, zoom-adaptive road networks for national freeways (red), provincial highways (orange), and cycling lanes (green), H3 hexagonal hexmap heat maps with day/night human flow switching (Plasma/Viridis color scales), 9 population indicator panels (quantity/structure/dependency), CWA grid temperature as a 3D wave surface, freeway congestion color encoding, NCDR disaster alert severity color scale, and CNA news event geographic markers[^3].

In total: 10 categories, 23 layers, 6 Mapbox basemap styles, date navigation, and timeline playback at 30× to 3600× acceleration. All of it inside one person's GitHub repo.

## Technical Curation: How Hard Is "Real-Time"?

Building a map visualization website is not difficult — Mapbox's hello world runs in fifteen minutes. What is difficult is making it **real-time, smooth, and able to support 56,000 hexagonal cells for over 7,000 Taiwanese villages**.

Mini Taiwan Pulse makes three architectural decisions worth examining:

### 1. Overlay Registry Pattern

All Mapbox GL static layers (airports, stations, ports, lighthouses, roads, wind fields) are managed uniformly through a **configuration-driven** `overlayRegistry.ts`: a config array (`sourceUrl` + `paint` function), an `overlayManager.ts` for CRUD operations, and a `useEffect` controlling visibility and theme switching for all overlays. Adding a new overlay requires changing only three files[^3].

This is classic "data-driven UI" architecture — nothing flashy, but for a 23-layer system it is the key to long-term maintainability.

### 2. Three.js CustomLayer Integration

Mapbox GL itself is not well-suited for rendering 3D objects. Mini Taiwan Pulse uses Mapbox's `CustomLayer` interface to insert a Three.js scene into the same WebGL context: six independent `CustomLayer`s separately managing flights, vessels, rail, lighthouses, station light columns, and temperature 3D waves, sharing the camera matrix while each controlling its own rendering switch[^3].

This is the standard approach for Mapbox + Three.js integration (third-party libraries like threebox and three-geo all follow this pattern[^15]). Mini Taiwan Pulse hand-codes the `CustomLayer` directly rather than relying on threebox — the cost is having to manage the projection matrix and lighting setup; the benefit is complete control over the rendering pipeline.

### 3. Supabase pg_cron Pre-aggregation Pattern

This is the most engineering-heavy decision in the entire project. Supabase's pooler has a **hard 2-minute statement_timeout limit**[^16], meaning any SQL query running longer than 2 minutes will be terminated. For a system that needs to pull vessel trajectories, flight trajectories, and freeway congestion data daily, querying the raw tables directly would hit this wall.

Mini Taiwan Pulse's solution: **normal table + per-day refresh function + pg_cron scheduled refresh + thin SELECT RPC**. Each high-frequency time-series query has a corresponding pre-aggregated table, refreshed every 10–30 minutes by Supabase's built-in `pg_cron`[^17]; the frontend reads only from the pre-aggregated tables, consistently landing in the sub-second range:

| RPC                          | Before   | After |
| ---------------------------- | -------- | ----- |
| `get_ship_trails`            | timeout  | 123ms |
| `get_flight_trails`          | timeout  | 126ms |
| `get_freeway_congestion_day` | 60s edge | 302ms |
| `get_disaster_alerts_day`    | 13.2s    | 110ms |
| `get_temperature_frames`     | 551ms    | 107ms |

This table appears directly in the README[^3], with a link to the full profiling report. For readers familiar with Postgres + realtime architecture, these few lines say more than any screenshot: they tell you the author encountered real production bottlenecks and chose the correct solution.

> **Curator's note**
> Mini Taiwan Pulse's technical choices are almost all "correct boring solutions": Mapbox + Three.js `CustomLayer`, Uber's open-source H3 hexagonal grid[^18], perceptually uniform color scales (Plasma/Viridis/Inferno), log1p + gamma normalization for heavy-tailed distributions, Supabase pg_cron pre-aggregation. No invented visualization techniques, no trendy new frameworks; every decision has prior art you can look up. This "no surprises" quality of stable engineering is the rarest quality in independent projects.

## Civic Tech's Definition Is Being Stretched

The phrase "civic tech" in Taiwan most commonly evokes g0v — a community whose core is "information transparency, open outputs, and open collaboration to engage in public affairs through grassroots crowd power"[^19]. The emphasis of that definition is on **crowds**: hackathons, collaboration, shared wikis, PR reviews, grant reviews.

But Mini Taiwan Pulse demonstrates another contemporary form of civic tech: **one person, one weekend loop, one MIT license**.

From g0v's first hackathon budget visualization in 2012, to Wu Zhan-wei's mask map in 2020, to Migu Cheng's mini-taiwan-pulse in 2026. At one end of this spectrum is the in-person culture of collective collaboration; at the other end is the slow accumulation of an individual's commits. Between the two ends there are many degrees of mixing: small teams maintaining projects for years, student projects, open-source government contracts, Open Culture Foundation (OCF) g0v civic tech innovation grants[^20].

These projects share one premise: **the government has opened up the data — what happens next is up to us**. The government's role is building the data infrastructure — TDX, data.gov.tw, SEGIS, CWA — while the civic community's role is making that data "visible" through visualizations, API wrappers, tutorial articles, applications, and oversight dashboards for accountability.

Mini Taiwan Pulse's position on this spectrum is clear: it is not a service project (not solving a specific problem), not a tool project (not asking others to reuse a library). It is a **demonstration project**. People who see this repo will think: "So this is what open data looks like when you wire it together," "So TDX + Three.js + Supabase can be taken this far," "So one person can do all of this."

> **Curator's note**
> What Taiwan's open data ecosystem lacks most is not APIs, and not engineers — it is **demonstrations showing the data to ordinary people in beautiful, accessible forms**. Mini Taiwan Pulse chose the hardest possible challenge (national scale + multiple data sources + real-time updates + 3D visualization) and executed it with the effort of a single independent developer to a standard that could be shared. The number 241 stars matters not in its absolute value, but in what it proves: this path is viable.

## What Could Be Done Next

Mini Taiwan Pulse is currently a demonstration work, not a product:

- **No releases published**: 193 commits but 0 release tags; deployment is self-hosted Docker + Nginx[^3]
- **Some data sources require obtaining your own API keys**: FlightRadar24 commercial API, CWA open data platform API key, TDX membership authentication (OIDC Client Credentials flow) all require readers to configure themselves[^6]
- **No public demo URL disclosed**: the README provides no live demo link; to see it working currently requires cloning and running it locally
- **Only 1 open issue, 0 PRs**: community collaboration has not yet started — typical stage for a demonstration project

But all of these are things that could change. A repo with 241 stars means 241 people pressed "I want to follow this." If Migu Cheng decides to push it into a public service, or to split the core components into a reusable library, or to list it at `grants.g0v.tw` to apply for a grant[^20], what the next stage of this project looks like is an open question worth watching.

## Why This Deserves to Be Curated

Taiwan.md chose to upgrade Mini Taiwan Pulse from the [resources list](/en/resources/mini-taiwan-pulse) into a full-depth Technology article for three reasons:

1. **It is not a news event, but a representative sample.** Taiwan's open data scene in 2026 will certainly have many commits and many stars, but Mini Taiwan Pulse is a rare reference point on the dimension of "how far can one person go."
2. **It gives the abstract concept of "civic tech" a concrete shape.** Most people discussing civic tech will mention g0v, Audrey Tang, or the mask map. But civic tech in 2026 can look like a data analyst writing TypeScript on weekends. This is not a replacement for the g0v narrative — it is an expansion of it.
3. **It lets readers see the real potential of government open data.** If you have read about digital ID and digital government or open source and g0v and still find open data to be an abstract concept, Mini Taiwan Pulse is the footnote that says: "Look — this is what data becoming scenery looks like."

One data analyst. Six weeks. 193 commits. 23 layers. One breathing island.

This is one face of civic tech in 2026.

---

## Further Reading

- [Open Source and g0v](/en/Technology/open-source-and-g0v/) — the ten-year arc from forking the government in 2012 to the mask map in 2020
- [Taiwan's Open Source Spirit](/en/Technology/taiwan-open-source-spirit/) — the cultural context and contribution patterns of Taiwan's open source community
- [Digital ID and Digital Government](/en/Technology/digital-id-and-digital-government/) — the policy layer of government digital infrastructure
- [PTT](/en/Technology/ptt-bulletin-board-system/) — another root of Taiwan's internet collaboration culture
- [Che-Yu Wu](/en/People/che-yu-wu/) — another form of civic tech: a new media artist building a SSOT for Taiwan's knowledge sovereignty with Markdown and GitHub

---

## Project Links

- **GitHub repo**: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **License**: MIT License
- **Primary language**: TypeScript 86.1% / Python 12.9%
- **Related platforms**: [TDX Transport Data eXchange](https://tdx.transportdata.tw/) · [Government Open Data Platform](https://data.gov.tw/) · [MOI SEGIS](https://segis.moi.gov.tw/) · [CWA Open Data](https://opendata.cwa.gov.tw/)
- **Civic tech community**: [g0v Taiwan](https://g0v.tw/) · [g0v Civic Tech Innovation Grants](https://grants.g0v.tw/)

---

## References

[^1]: [Migu Cheng (ianlkl11234s) · GitHub](https://github.com/ianlkl11234s) — Developer profile; bio: "Senior Data Analyst. Exploring AI automation in daily work." Account created 2020-03-07.

[^2]: [ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse) — Project repo; figures from the GitHub API as of 2026-04-19: 193 commits, 241 stars, 12 forks, 1 open issue.

[^3]: [mini-taiwan-pulse README](https://github.com/ianlkl11234s/mini-taiwan-pulse/blob/main/README.md) — Complete technical documentation, including the layer list, technology stack, and Overlay Registry / CustomLayer / Supabase pg_cron architecture.

[^4]: [Flightradar24 | Flight Tracker](https://www.flightradar24.com/) — Global real-time flight tracking service composed of a network of ADS-B receivers.

[^5]: [OpenStreetMap Taiwan](https://osm.tw/) — Taiwan OSM community portal; Overpass API can query OSM tag data for tracks, stations, airport boundaries, and more.

[^6]: [TDX Transport Data eXchange](https://tdx.transportdata.tw/) — The Ministry of Transportation's single-entry portal for open transport data, integrating five major platforms in 2022 with OData standard APIs for road, rail, aviation, maritime, and cycling.

[^7]: [MOI SEGIS Statistical Geographic Information Service](https://segis.moi.gov.tw/) — GIS platform built by the Ministry of the Interior, providing village-level population statistics spatial layers.

[^8]: [Central Weather Administration Open Data Platform](https://opendata.cwa.gov.tw/) — CWA Open API providing observation, forecast, grid, radar, satellite, and other datasets.

[^9]: [NCDR National Science and Technology Center for Disaster Reduction Data Platform](https://datahub.ncdr.nat.gov.tw/) — CAP alert feed and disaster event API from the National Science and Technology Center for Disaster Reduction.

[^10]: [RSS Service | CNA Central News Agency](https://www.cna.com.tw/about/rss.aspx) — CNA's public RSS subscriptions providing headlines, leads, links, and featured images.

[^11]: [Government Open Data Platform data.gov.tw](https://data.gov.tw/) — Single government open data entry operated by the National Development Council, launched in 2013.

[^12]: [The Team Behind the Mask Map — TechNews 2020](https://technews.tw/2020/02/23/expose-the-team-behind-mask-map/) — The story of Wu Zhan-wei and Maker Bar assembling real-time mask inventory for over 6,000 NHI pharmacies across Taiwan within 72 hours.

[^13]: [About Jothon — g0v Hackathon](https://jothon.g0v.tw/about/) — Statistics for g0v hackathons: over 59 events, 7,200+ participants, 950+ proposed projects.

[^14]: [mini-taiwan-pulse docs/known-issues.md](https://github.com/ianlkl11234s/mini-taiwan-pulse/commits/main) — Commit `docs: known-issues add 2026-04-09 IO overload event log` and similar engineering diary entries.

[^15]: [threebox — A three.js plugin for Mapbox GL JS](https://github.com/jscastro76/threebox) — Representative third-party library for Mapbox + Three.js integration.

[^16]: [Supabase Docs | Timeouts](https://supabase.com/docs/guides/database/postgres/timeouts) — Supabase pooler's statement_timeout default is 2 minutes; connections are terminated on timeout.

[^17]: [pg_cron: Schedule Recurring Jobs in Postgres | Supabase Docs](https://supabase.com/docs/guides/database/extensions/pg_cron) — Supabase's built-in cron scheduling mechanism for timed jobs within the database.

[^18]: [Uber H3: Hexagonal Hierarchical Spatial Index](https://h3geo.org/) — Uber's open-source hexagonal geographic grid system, Apache 2 licensed.

[^19]: [g0v Taiwan Zero Hour Government](https://g0v.tw/) — Civic tech community since 2012, with information transparency, open outputs, and open collaboration at its core.

[^20]: [g0v Civic Tech Innovation Grants](https://grants.g0v.tw/) — Civic tech project grants administered by the Open Culture Foundation (OCF).

---

_Last verified: 2026-04-19_
