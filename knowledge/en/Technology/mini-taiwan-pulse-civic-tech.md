---
title: "Mini Taiwan Pulse: Using a Curator's Eye to Paint Taiwan as a Breathing Map"
description: "In 2026, data analyst Migu dragged a CSV file into Kepler.gl, and the first map of Taiwan sprouted on his screen. Two years later, the highly popular mini-taiwan-pulse has accumulated 375 stars on GitHub, layering five types of real-time data—sky, ocean, land, streets, and waste collection—into a living, moving map. With over 50,000 central government records and open data from dozens of county and city platforms, the volume is too vast for human processing. His solution wasn't to hire more people, but to hand it over to an AI Agent-orchestrated system that grows on its own, where humans are only responsible for posing questions and verifying results. From a curator's eye trained in urban planning to a self-running fire pipeline within tmux, how did one person's GitHub grow into an entire galaxy?"
date: 2026-04-19
category: 'Technology'
tags:
  [
    'Technology',
    'Civic Tech',
    'Open Data',
    'Data Visualization',
    'Open Source Project',
    'TDX',
    'Three.js',
    'Artificial Intelligence',
    'AI Agent',
    'GIS',
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
translatedAt: '2026-10-21T00:58:41.106460+00:00'
---

# Mini Taiwan Pulse: Drawing Taiwan as a Breathing Map Through a Curator's Eye

One day in early 2026, a data analyst named Migu converted a CSV file into GeoJSON and dragged it into a browser-based tool called Kepler.gl. Without writing a single line of code, the first map of Taiwan appeared on his screen.

He had studied urban planning in college, where he had encountered a little GIS (geographic information systems, simply put, tools that make data live on maps). After entering the workforce, he went into data analysis, and had not touched mapping for a long time. That day, as he dragged the CSV into Kepler.gl and watched Taiwan emerge on the screen, a plain, almost naive surprise came to mind:

> "So Taiwan has this much data. So turning it into a map isn't hard."[^1]

The sentence does not sound like much. It later became the seed of an entire system.

> **30-second overview:** Since late 2025, Migu (GitHub `ianlkl11234s`) has made more than a dozen visualization projects using Taiwan's open data. The most popular, mini-taiwan-pulse, has accumulated 375 stars on GitHub and layers five kinds of real-time data--sky, sea, land, streets, and waste collection--into a moving map[^2]. But in a June 2026 talk for the sciwork community, he stated the problem plainly: Taiwan's open data includes about 50,000 datasets at the central-government level alone, scattered across more than 20 city and county platforms; "the human brain cannot scan them all." His answer was not to ask more people to help scan them, but to hand the data wholesale to a self-growing system orchestrated by AI Agents, leaving humans responsible only for setting questions and accepting results[^3].

This article is about how one person moved from the innocence of dragging in a CSV to letting a system grow on his behalf.

## How One Person's GitHub Grew into a Galaxy

If you only look at the `mini-taiwan-pulse` project, it is easy to mistake Migu for an amateur hobbyist engineer: someone who got inspired over a weekend, made a demo, and happened to go viral.

This assumption is incorrect in two ways.

First, he has done far more than just one project. Open his GitHub, and after December 2025, it is densely packed with visualizations of Taiwan's open data: it started with a bus-range PoC to test the waters; then, at the end of December, a learning project called `mini-taiwan-learning-project` went viral first, reaching 189 stars today. In February, he created real-time AIS ship positions and `flight-arc-graph`, which draws arcs for every flight takeoff and landing (56 stars). It wasn't until the end of February that `mini-taiwan-pulse` arrived, followed by a TRA atlas, satellite orbits, real-time CCTV feeds, and `mini-taiwan-info`, a situational dashboard that consolidates all the data... continuing all the way through June[^2]. Dozens of repos have connected into a single entity, which he has named the "Mini Taiwan" galaxy.

![Mini Taiwan Info situational dashboard, consolidating multi-themed open data—including population, rail transport, shipping, water resources, fire services, and medical care—into one-page, single-topic monitoring panels](/article-images/technology/mini-taiwan-info-dashboard-2026.webp)

_Another member of the galaxy, Mini Taiwan Info: He consolidated scattered open data into a situational monitoring dashboard, with population, rail transport, shipping, water resources, fire services, and medical care each on its own themed page. Photo: Migu / sciwork 2026 (fair use for editorial commentary)._

If you rank these projects by stars, clearly more than one is "red" (trending).

```tw-bars
Migu's GitHub: More than one repo is trending (GitHub Stars)
*mini-taiwan-pulse | 375 | Flagship
mini-taiwan-learning-project | 189 | Went viral before pulse
flight-arc-graph | 56 | Flight paths
tw-ship-viz | 11 | Shipping
mini-tw-cctv | 6 | Real-time video
satellite-arc | 6 | Satellites
Source: GitHub API, 2026-06-25
```

The second inaccuracy lies hidden within the phrase "one person," which we will unpack later. For now, let's look at how the galaxy grew.

```tw-timeline
2025-12 | First test | Bus-range PoC, earliest attempt with Taiwan open data
2025-12 | learning-project goes viral first | Taipei rail visualization, went viral before the flagship (189★)
2026-02 | Flagship is born | mini-taiwan-pulse launches, evolving from static JSON to a spatio-temporal database
2026-06 | Unveiling the full system | sciwork 2026 talk: A system that hands open data over to Agents for cultivation
Source: Migu's GitHub project records (project timeline and stars) and sciwork 2026 talk content[^2][^3]
```

## The Same Method, from Metro Lines to the Solar System

The flagship itself has also been growing. The earliest mini-taiwan-pulse had three layers: sky, sea, and land. By the version shown in his talk, it had become "five pulses moving together": aircraft in the sky, ships at sea, trains on land, buses on streets, and garbage trucks for waste collection, five kinds of real-time data at different frequencies layered onto the same breathing map. In his slides, he said this was the project's first evolution "from static JSON into a spatiotemporal database"[^3]. The street layer alone, he said, connected to more than 5,700 buses on TDX, updating positions every 30 seconds.

![DAY 0 first map: converting a CSV into GeoJSON and dragging it into Kepler.gl, producing the first Taiwan map without writing code](/article-images/technology/mini-taiwan-kepler-day0-2026.webp)

_His "DAY 0" in the talk: converting a CSV into GeoJSON and dragging it into Kepler.gl, producing the first Taiwan map with zero lines of code, the starting point of the entire galaxy. Image: Migu / sciwork 2026 (fair use editorial commentary)._

The earliest spark in this galaxy was a Taipei rail visualization he called "Mini Taipei." He layered the Taipei Metro, Taiwan Railways, and high-speed rail systems into one moving map, with trains running along the lines according to the timetable. He said it was at that moment that he first "experienced the charm of motion"; more than 300 trains were moving on screen at the same time[^3]. A static timetable thus became the breathing of a city.

![Mini Taipei layers Taipei Metro, Taiwan Railways, and high-speed rail into one moving map, with more than 300 trains running along the lines according to the timetable](/article-images/technology/mini-taiwan-taipei-rail-2026.webp)

_Mini Taipei: Taipei Metro, Taiwan Railways, and high-speed rail in one frame, with more than 300 trains running along the lines according to the timetable. He said this was the first time he "experienced the charm of motion." Image: Migu / sciwork 2026 (fair use editorial commentary)._

After that, almost as if addicted, he applied the same "turning data into motion" method at increasingly large scales. At sea, he connected to real-time AIS positions from the Maritime and Port Bureau, using cyan-blue light spheres and 30-minute gradient trails to draw the direction of ships around Taiwan's surrounding waters.

![Ships in waters around Taiwan drawn from Maritime and Port Bureau AIS real-time positions, with cyan-blue light spheres and 30-minute gradient trails](/article-images/technology/mini-taiwan-ships-ais-2026.webp)

_The ocean pulse: AIS real-time positions from the Maritime and Port Bureau, with cyan-blue light spheres and 30-minute gradient trails, drawing the ships in waters around Taiwan. Image: Migu / sciwork 2026 (fair use editorial commentary)._

Then he pushed the same method beyond Earth. Using public TLE orbital parameters to calculate satellite positions, he drew satellite passes over Taiwan, then extended the work to the entire solar system. He said it plainly in his slides: "The same method can extend infinitely, as long as there is data."[^3] At that moment, you realize that what fascinates him is really "making data visible" itself; maps were only its earliest form.

![Satellite orbit visualization calculated from public TLE data, extending the same method from Taiwan's surface all the way into space](/article-images/technology/mini-taiwan-satellite-2026.webp)

_The same method pushed beyond Earth: using public TLE data to calculate satellite orbits, then extending it to the whole solar system. Image: Migu / sciwork 2026 (fair use editorial commentary)._

## Stacking Islands Until the Gaps Surface

Gradually, the thing worth looking at changed from "real-time points moving" to "putting originally unrelated data together so the gaps surface on their own." Several projects in his galaxy are dedicated to this. One he calls "Agriculture x Water" stacks the isolated datasets of three ministries--agriculture, water resources, and disaster prevention--into one map: farmland, rivers, drainage channels, embankments, and flood-potential areas in the same frame. To make this combined map run in the browser, he used a format called PMTiles together with HTTP range requests, compressing what had been 400MB of data into about 5MB that the browser actually needed to load[^3].

![Agriculture x Water integrated map: stacking farmland, rivers, drainage channels, embankments, and flood-potential open data scattered across different ministries into one map](/article-images/technology/mini-taiwan-farm-water-2026.webp)

_Agriculture x Water: stacking the isolated datasets of agriculture, water resources, and disaster prevention agencies into one map, with farmland, rivers, drainage channels, embankments, and flood-potential areas in the same frame. Image: Migu / sciwork 2026 (fair use editorial commentary)._

Another project overlays hospitals, clinics, pharmacies, AEDs, and long-term care sites on population density, then draws isochrones. He said this lets one "see accessibility, and also see medical deserts"--that is, places where people are unreasonably far from the nearest medical resources.

![Medical-resource accessibility map: overlaying hospitals, clinics, pharmacies, AEDs, and long-term care sites on population and drawing isochrones, allowing medical deserts to surface](/article-images/technology/mini-taiwan-medical-2026.webp)

_Medical resources: overlaying hospitals, clinics, pharmacies, AEDs, and long-term care sites on population, then drawing isochrones to "see accessibility, and also see medical deserts." Image: Migu / sciwork 2026 (fair use editorial commentary)._

He made the disaster line even more precise: radar echoes, reservoir water levels, rainfall, and disaster alerts all update at different frequencies, but he unified them underneath into a single timeline. Users only have to drag that timeline, and every layer replays in sync. Where a heavy rain began, how reservoirs rose, and when alerts were issued become a causal line on the same screen.

![Timeline of heavy rain and disasters: radar echoes, reservoirs, rainfall, and disaster alerts at different frequencies unified on one timeline for synchronized replay](/article-images/technology/mini-taiwan-disaster-2026.webp)

_Heavy rain and disasters: radar echoes, reservoirs, rainfall, and disaster alerts are unified underneath into the same timeline; drag once, and all layers replay in sync. Image: Migu / sciwork 2026 (fair use editorial commentary)._

Then there is flight-arc, which draws every flight takeoff and landing segment as an arc. Feed the same API with different airports, and each airport reveals a different "fingerprint": Taoyuan, Tokyo Haneda, and Frankfurt each have their own shape. He singled out Atlanta, the world's busiest airport: five parallel runways plus holding patterns stack into a geometry "like a racetrack." He said that one image drew 1,839 flight tracks[^3].

![Flight-track map of all takeoffs and landings at Atlanta airport over a period of time, with five parallel runways and holding patterns stacking into a racetrack-like geometry](/article-images/technology/mini-taiwan-flight-arc-atlanta-2026.webp)

_His flight-arc stacks all takeoffs and landings at Atlanta airport over a period of time into one image: five parallel runways plus holding patterns draw a racetrack-like geometry. He said traffic itself is a kind of shape. Image: Migu / sciwork 2026 (fair use editorial commentary)._

> 📝 **Curator's Note**
> Two years ago, if someone said "one person built Taiwan's most complete real-time open-data map," the next sentence would probably have been "he must be exhausted." That intuition binds scale to labor: the more you build, the more you grind. Migu's galaxy is worth stopping for precisely because it loosens that binding. One person advancing more than a dozen repos at once, while the flagship keeps growing new features, conceals a more fundamental shift: by the later stage, more and more of those commits were not typed by him personally. How that "one person" came to be is the real subject of this article.

## Fifty-Two Thousand Eight Hundred Ninety-One Records: Too Many for the Human Brain to Scan

Up to this point, the story still feels straightforward: a gifted person makes more and more things, and the things get better and better. The turn comes midway through his talk, when he stops explaining "what I built" and starts explaining "what wall I hit."

He showed a slide titled "Why Agentic OSINT." On it, one number was laid out: about 52,891 datasets on data.gov.tw; add the open-data platforms of Taiwan's 22 cities and counties, and including overlaps there are roughly another 60,000 to 70,000 records; this does not even count data held by civil society, NGOs, and academic institutions that never entered government catalogs. His conclusion was brief:

> "Your human brain cannot scan them all."[^3]

This is the pivot of the whole story. The person who, in the first half, dragged in a CSV and exclaimed "so there is this much data" now ran head-on into the other side of "this much data": data.gov.tw alone has more than 50,000 entries. Even if one person read 100 records every day, it would take more than 500 consecutive days just to read that central-government catalog once. There is too much for a person to exhaust in a lifetime, let alone make those datasets speak to one another. Personal effort hits a ceiling here.

What Migu truly understood was the next sentence. To him, too much data to scan is a signal to change tools:

> "Only when data can be seen by an LLM can an Agent help you discover which datasets should be looked at together."[^3]

The keyword is "looked at together." Even if one person memorized the names of all 50,000 datasets, it would be difficult to know from memory that a "fire-risk map" should be paired with "hard-to-rescue areas," or that "hospital locations" should be layered with "population density" in order to reveal medical deserts. The value of data lies not in single records, but in combinations; and the possible combinations among 50,000 records are astronomical. That is exactly where the human brain cannot scan everything, and where machines are good.

> 📝 **Curator's Note**
> The open-data narrative we are used to has a clear division of labor. After the 2012 Academia Sinica hackathon with the spirit of "writing code to transform society," g0v demonstrated it beautifully: government opens data, and civic communities make that data visible. During the 2020 mask-map effort, Howard Wu and others turned National Health Insurance Administration inventory data into a map the whole public could query in 72 hours, the most moving example of that division[^4]. The older framing would put Migu on an extension of that line: g0v is collective; he is an individual, a one-person version of the mask map.
>
> But that comparison stays on the surface, and gets the causality backward. Migu can approach the scale of "an entire data galaxy" not because of human labor. From the beginning, he was not trying to grind against a sea of data by sheer effort. "The human brain cannot scan them all" should be read less as surrender than as the starting point for replacing the whole workflow. The truly new form is not "individual vs. collective," but "individual x Agent": one person can reach galaxy scale precisely because those commits are not all hand-typed by him. What follows is how that system works.

## I Didn't Write a Single Character: A Fire Pipeline That Runs Itself

The best slice for understanding what "handing it over to the Agent" means is the fire example from his talk.

He said he simply fed the system one sentence: "Analyze Taiwan's open fire data." Then he let go.

The system began expanding its search scope on its own. Migu described this process with a set of progressively inflating numbers: first hitting 582 entries with keywords, then extending to 1,945 entries through synonyms and topic expansion, followed by full-text search supplementation and deduplication, ultimately converging into a unified catalog spanning 21 platforms and 73,900 entries[^3]. One sentence in, and over seventy thousand pieces of data were inventoried.

```tw-figure
One sentence → 73,900 entries
He tossed in the sentence "Analyze Taiwan's open fire data," and the system expanded its search and converged across 21 platforms into a unified catalog
He said this in his sciwork 2026 presentation
```

Collecting data alone isn't enough. This pipeline then automatically broke fires down into six stages (prevention, emergency response, notification, ignition analysis, losses, reports), multiplied by 22 cities and counties, and generated a coverage matrix. Place-level inventories like Hsinchu's fire risk maps, Taipei's hard-to-reach rescue zones, and [Taoyuan Wetland](/en/geography/taoyuan-ponds/) rescue operations were all surfaced. It even honestly flagged gaps: no real-time fire API, event-level coordinates are scarce, and post-disaster tracking data isn't publicly available.

Then came the analysis. He cited a fire cause report generated by the system itself: based on 15,405 entries nationwide in 2022, the leading cause of fires in New Taipei City was electrical issues, accounting for 30.9%; in Pingtung County, it was cigarette butts, accounting for 35.2%[^3]. These figures are the results produced by the Agent chaining together various APIs in his presentation screenshots, not manually tabulated by him.

At this point, he typed a single line on the slide, with deliberate spacing between each character, as if making sure you could read it clearly:

> "The pipeline is automatically generated. I didn't write a single character."[^3]

This line is the ignition point of the entire talk. It turns the somewhat abstract slogan of "handing it over to the Agent" into a concrete, almost unsettling fact: from one sentence, to over seventy thousand entries in a catalog, to a county-by-county cause report, the space in between—where humans usually give instructions, write scripts, clean data, and run analyses—is empty.

![Fire theme analysis pipeline output: the system automatically inventories cross-platform open fire data and lists candidate datasets and coverage matrix](/article-images/technology/mini-taiwan-fire-pipeline-2026.webp)

_Migu's fire theme inventory output presented at sciwork 2026: toss in the sentence "Analyze Taiwan's open fire data," and the system expands its search and converges into a unified catalog across platforms. He says this pipeline "I didn't write a single character." Image: Migu / sciwork 2026 (fair use for editorial commentary)._

## Four Detachable Steps: Data Comes In, Reports Go Out

This fire pipeline is just one slice, a microcosm of his entire system. The system breaks into four steps: data ingestion, knowledge integration, analysis generation, and action triggering — and he emphasizes that "each step can be swapped out independently; the whole system doesn't need to be rebuilt." At the bottom layer of data ingestion, he himself evolved over time: early on, he manually downloaded Excel files from data.gov.tw and read and stored them himself, with the bottleneck stuck on "human memory"; in the middle period, he switched to searching online for APIs, grabbing PDF reports, and scraping county/city platforms, but the problem was "no indexing"; until now, the metadata for every single piece of data is standardized and stored in a SQLite directory, where it can be automatically queried and automatically expanded[^3]. Behind his system are over forty data collectors, covering YouBike, buses, highway traffic flow, Taiwan Railway timetables, ship AIS, weather satellites, [earthquakes](/en/society/earthquakes-in-taiwan/), reservoir water levels, and air quality — and he says, even if it fails three times in a row, it immediately sends a Telegram alert, and every morning at nine o'clock it pushes a Daily Review to his inbox[^3].

At the final step of "action triggering," he describes the human role most clearly: "The Agent runs the full loop by itself. The human role: set the goal, receive the report. The five gears in between turn on their own: discover, collect, integrate, generate, monitor." The system even automatically generates a weekly report titled "New Open Data Added This Week." In his own words: "Themes emerge on their own, and the report sends itself to the inbox."[^3]

## One Commander, Many Tabs: A Claude Fleet in tmux

Phrases like "the Agent runs the full loop by itself" can easily be heard as marketing language. In the final section of Migu's talk, he unusually lifted the lid to show what the machinery underneath looks like. The structure is much more concrete, and much more honest, than the slogan.

Start with the full view of the loop. Migu said his GIS system is "one orchestration hub, connecting a ring of independent repos, with Agents entering each station in sequence": first entering the repo responsible for exploration to identify which data is worth building with, then entering the repo responsible for collection to bring the data in, and finally entering presentation repos such as mini-taiwan-pulse or mini-taiwan-info to draw the maps. His description was precise: "Each station is an independent repo; the orchestration layer only manages progress and decisions; the work is in the hands of workers in each repo."[^3]

He calls this orchestration hub the Orchestrator. In essence, it is "one Claude Session." This main Agent behaves much like a foreman: it reads a proposal document, breaks down the work, orders dependencies, and then starts work.

The way work starts is the key step in this architecture. He does not have a single AI do everything from beginning to end. Instead, he uses tmux--an old tool for splitting a terminal into multiple independent panes or tabs--to isolate the work. His exact words were: "One Orchestrator, a group of Workers. The main Agent is one Claude Session; tmux handles isolation; every Worker is an independent tab and independent Session." A more concise definition is: "One Worker = one tmux tab + independent Session + one PR."[^3]

In other words, what he commands is effectively an AI fleet. Each worker is a Claude isolated in its own tab, doing its own task, submitting its own pull request, and not interfering with the others.

![Actual operation screen of the Agent orchestration system: one Claude session acts as orchestrator, reading tasks, decomposing them, and directing the workers underneath](/article-images/technology/mini-taiwan-agent-orchestrator-2026.webp)

_The orchestration hub he revealed in his slides: one Claude session acts as orchestrator, assigning tasks to a group of workers isolated in their own tmux tabs, each doing its work and submitting one PR. Image: Migu / sciwork 2026 (fair use editorial commentary)._

How, then, does this group of independent workers avoid fighting? Through shared memory. Migu said all progress and decisions are written into documents, centered on a board called `SESSION_BOARD.md`, plus "one report per Session," so there is "no need to guess at one another" and "one person, one file; no fighting"[^3]. Even handoff is documented: he uses a `HANDOFF.md` as the "task brief for the next runner," so the next round of Agents does not have to ask from scratch. He described the final gate carefully: "Acceptance: the Orchestrator checks PRs against the documents; merge is decided by a human. Only then is the loop closed."

Flatten this workflow, and you see a clean shape: one person gives instructions; a group of isolated AIs each does its work and writes down what it did; a hub reconciles everything against documents; and the person who ultimately decides "whether to accept this result" is Migu himself. Returning to this article's central line: there is too much data to scan, so the act of scanning data is handed to the fleet; the human retreats to two actions, setting questions and accepting results. In his slides, he put it almost as a declaration:

> "When Agents can run the entire loop by themselves, the human job is reduced to setting questions and accepting results."[^3]

This is also what the title of his talk points to: "Handing Taiwan's open data to Agents to grow a self-growing system." Data flows by itself, pages grow by themselves, and humans only have to pose the right questions and properly accept the results.

## The Same Soil Grows the Same Skeleton

If you happen to know Taiwan.md--the AI-maintained Taiwan knowledge curation project you are reading now--the description above may feel familiar.

That is not an illusion.

Taiwan.md itself operates this way: one main session acts as the orchestration hub, breaking work down for a group of workers that are each isolated and each have their own memory files. Handoff documents coordinate progress, and the person who ultimately decides which changes enter the main branch is its creator, Che-yu. Our thesis is "hand Taiwan's knowledge to a self-growing Semiont"; Migu's thesis is "hand Taiwan's open data to a self-growing system." The subjects of the two sentences are almost interchangeable.

What is even more interesting is that the two architectures grew independently. A small public record can be found: the Taiwan.md project was born in mid-March 2026, and five days later a fork appeared on Migu's GitHub[^5]. At most, that shows he knew such a thing existed. A fork does not explain his entire system of using an orchestrator to command a tmux fleet, sharing memory through a board, and leaving humans only to set questions and accept results. That was something he built step by step in order to solve the problem that "50,000 datasets are too many to scan."

> 📝 **Curator's Note**
> Biology has a term, convergent evolution: dolphins and sharks are not close relatives, yet both developed streamlined bodies and dorsal fins because they faced the same sea. The relationship between Migu and Taiwan.md is more like that kind of convergence than kinship. We use the same tooling substrate (Claude Code) and face the same condition (one person, or one system, needing to hold a volume of Taiwan information far beyond an individual brain's capacity), so we each felt our way toward the same skeleton: one hub, a group of isolated workers, shared memory, and one person responsible for the final call.
>
> The truly interesting signal is not "he forked us." It is that two independent Taiwan builders, in the same half-year of 2026, both reconceived AI not as "a smarter tool" but as "a team that can be orchestrated." When this architecture begins to grow from one person's mind into a second and third, it stops being one person's clever trick and becomes a new form emerging from this soil at this moment. The next Taiwan builder who creates this setup may well never have heard of the first two.

## Not Finished, But the Shape Has Appeared

If this article ended at the previous section, it would be too polished a story, polished enough to be suspect: one person elegantly solves the 50,000-dataset problem with an AI fleet.

Migu himself did not let it stop there. The penultimate slide of his talk was titled "Experimental progress: about halfway."

He frankly listed three things that had not yet been tuned. First was stability: the harness "has not been tuned to the ideal state"; Agents easily wander off or get interrupted. Second was the messiness of open data itself: "There are still many cases where humans must judge whether data is feasible; it cannot be fully handed over." Third was human intervention: at every stage, someone still has to watch from the side. His footnote to the whole thing was: "Feasible is feasible, but it is not stable yet, and I am still thinking about whether we really should do this."[^3]

This willingness to reveal half of his own failure onstage is itself the strongest signal of quality. In an era when AI demos are constantly packaged as "fully automated" and "zero labor," someone willing to put "about halfway," "not stable yet," and "still needs people" on a slide makes the other half of what he has built more believable.

> 📝 **Curator's Note**
> The most credible part of this talk is not the fire pipeline where "I didn't write a single word," but the four words "about halfway." Someone trying to persuade you rounds the success rate up to "almost fully automatic"; someone doing an experiment honestly tells you it breaks half the time. The former sells a conclusion; the latter gives you the scene. Migu gives the scene. That is why, when he says of that pipeline, "I didn't write a single word," you choose to believe him. Hide the ugly half, and the beautiful half becomes untrustworthy too; reveal half of the imperfection, and the remaining half can stand.

Return to that map.

The person who dragged a CSV into Kepler.gl and exclaimed "so turning it into a map isn't hard" stood on the sciwork stage half a year later no longer talking about whether maps are easy to make. He was talking about a system that can find data by itself, combine it by itself, and grow new pages by itself. That naive surprise--"so Taiwan has this much data"--turned over during those six months: there is so much data that one person cannot scan it all, so the way it becomes visible also has to grow into a new shape.

Taiwan's open data has always been there. data.gov.tw launched in 2013; TDX integrated five major transport platforms--roads, rail, aviation, shipping, and bicycles--in 2022; the Ministry of the Interior has village-level population data; the Central Weather Administration has open APIs[^6]. There has never been a shortage of data. The hard part is how to make that much data speak to one another and be seen. g0v answered once with collective power; Migu, with one person plus an AI fleet, is trying to answer a second time, and he openly admits he has only answered half of it correctly.

But the shape has appeared. Behind one person, one sentence, and one breathing map is a system learning to grow by itself. The remaining half is left to the next person who drags in a CSV and then cannot stop.

---

## Further Reading

- [Wu Che-yu](/en/people/che-yu-wu): The creator of Taiwan.md, who similarly uses code and generative tools to approach "something that grows by itself"
- [Open-source Communities and g0v](/en/technology/open-source-and-g0v): The collective context of "writing code to transform society," a counterpart to Migu's individual x Agent form
- [Taiwan's Open-source Spirit](/en/technology/taiwan-open-source-spirit): From saving the country by keyboard to open data, the underlying culture of Taiwan civic technology
- [Digital ID and Digital Government](/en/technology/digital-id-and-digital-government): Another side of government open-data infrastructure

## Project Links

**The "Mini Taiwan" galaxy** (Taiwan open-data visualizations, all Migu's personal open-source projects)

- **mini-taiwan-pulse**: Flagship real-time map of five pulses moving together (375★) — <https://github.com/ianlkl11234s/mini-taiwan-pulse>
- **mini-taiwan-learning-project**: The early viral Taipei rail learning project (189★) — <https://github.com/ianlkl11234s/mini-taiwan-learning-project>
- **flight-arc-graph**: Flight takeoff and landing tracks, each airport's "fingerprint" (56★) — <https://github.com/ianlkl11234s/flight-arc-graph>
- **mini-taiwan-info**: Taiwan situational monitoring dashboard across seven major themes — <https://github.com/ianlkl11234s/mini-taiwan-info>
- **tw-ship-viz**: Real-time visualization of vessel AIS positions (11★) — <https://github.com/ianlkl11234s/tw-ship-viz>
- **satellite-arc**: Satellite orbits and pass visualization — <https://github.com/ianlkl11234s/satellite-arc>
- **mini-tw-cctv**: Real-time video feeds across Taiwan — <https://github.com/ianlkl11234s/mini-tw-cctv>
- **mini-tw-tra-atlas**: Taiwan Railways network atlas — <https://github.com/ianlkl11234s/mini-tw-tra-atlas>
- **taiwan-weather-timelapse**: Weather timelapse — <https://github.com/ianlkl11234s/taiwan-weather-timelapse>
- **gis-data-collectors**: Backbone of more than 40 data collectors behind the system — <https://github.com/ianlkl11234s/gis-data-collectors>

**Talk and Developer**

- **sciwork 2026 talk online slides**: <https://sciwork-showcase.zeabur.app>
- **sciwork 2026 talk source code**: <https://github.com/ianlkl11234s/0613-sci-work-share>
- **Developer GitHub (Migu)**: <https://github.com/ianlkl11234s>
- **Threads**: [@ianlkl1314](https://www.threads.net/@ianlkl1314)

## References

- Migu, "Mini Taiwan! Handing Taiwan's Open Data to Agents to Grow a Self-Growing System," sciwork 2026 / SCIWORK SEMINAR, June 13, 2026.
- Government Open Data Platform data.gov.tw (operated by the National Development Council, launched in 2013).
- Transport Data eXchange Platform TDX (Ministry of Transportation and Communications, integrated five major transport platforms in 2022).
- g0v civic tech community and records of past hackathons.

## Image Sources

All images in this article are cached under `public/article-images/technology/` and do not hotlink the source server.

**Fair use editorial commentary**: All images in this article are screenshots from Migu's publicly presented sciwork 2026 talk slides (source code and online slides listed above under "Project Links"). They are cited for editorial commentary on his open-data visualization work under Article 65 of Taiwan's Copyright Act and the four factors of fair use under 17 U.S.C. § 107 (noncommercial educational nature, already publicly presented material, limited proportion quoted, and no substantial market substitution). © Migu / sciwork 2026.

Coverage: Mini Taiwan Pulse 3D map (featured image), Kepler.gl starting point, Taipei rail (Mini Taipei), vessel AIS, satellite orbits, Agriculture x Water and medical-resource integration maps, heavy rain and disaster timeline, Atlanta flight-track fingerprint, fire-topic pipeline output, Mini Taiwan Info dashboard, and Agent orchestration system operation screen.

---

[^1]: Developer Migu Cheng, GitHub account `ianlkl11234s` (account created in March 2020). By June 2026, his GitHub profile had been updated to "Building GIS visualizations from Taiwan open data · Exploring AI automation in daily work," rewritten from the earlier "senior data analyst, exploring AI automation in daily work" into "building GIS visualizations with Taiwan open data." The sentence "So Taiwan has this much data. So turning it into a map isn't hard" is verbatim text from the "DAY 0 first map" slide in his sciwork 2026 talk. Sources: GitHub API retrieval, 2026-06-25; talk-slide source code `ianlkl11234s/0613-sci-work-share`.

[^2]: Star counts, forks, last update times, fork origins, and other data for mini-taiwan-pulse and the projects in the "Mini Taiwan" galaxy were retrieved by Taiwan.md through the GitHub API on 2026-06-25. At the time, mini-taiwan-pulse had 375 stars / 26 forks and was still being pushed on 2026-06-25; mini-taiwan-learning-project had 189 stars; flight-arc-graph had 56 stars. The galaxy includes more than a dozen Taiwan open-data-related repos such as poc-bus-range, gis-data-collectors, tw-ship-viz, satellite-arc, mini-tw-cctv, and mini-taiwan-info.

[^3]: Migu, "Mini Taiwan! Handing Taiwan's Open Data to Agents to Grow a Self-Growing System," sciwork 2026 / SCIWORK SEMINAR, June 13, 2026. Talk source code: <https://github.com/ianlkl11234s/0613-sci-work-share>; online slides: <https://sciwork-showcase.zeabur.app>. All numbers cited from the talk in this article (about 52,891 datasets on data.gov.tw; the fire pipeline's 582 → 1,945 → 2,404 → 73,900 records; 21 platforms; 15,405 national fire records in ROC year 113; electrical factors at 30.9% in New Taipei City; cigarette butts at 35.2% in Pingtung County; 5,700+ buses; 40+ collectors; more than 300 trains; 1,839 flight tracks at Atlanta airport; Agriculture x Water 400MB → about 5MB, etc.) and all quotations ("the human brain cannot scan them all," "Only when data can be seen by an LLM can an Agent help you discover which datasets should be looked at together," "Pipeline generated automatically. I didn't write a single word," "give goals, receive reports," "When Agents can run the entire loop by themselves, the human job is reduced to setting questions and accepting results," "One Worker = one tmux tab + independent Session + one PR," "Each station is an independent repo; the orchestration layer only manages progress and decisions," "experimental progress: about halfway," etc.) are statements by Migu himself and verbatim slide text from that presentation. They are the speaker's personal claims and system outputs, not government statistics independently verified by Taiwan.md.

[^4]: The g0v civic tech community originated in 2012 from the spirit of the Academia Sinica hackathon "writing code to transform society." During the 2020 COVID-19 pandemic, Howard Wu and others used mask-inventory data released by the National Health Insurance Administration to build a "real-time mask supply-and-demand map" within dozens of hours, a representative case of Taiwan civic technology's "saving the country by keyboard."

[^5]: According to the GitHub API (retrieved 2026-06-25), `ianlkl11234s/taiwan-md` is a fork of `frank890417/taiwan-md` (the Taiwan.md main project), created on March 22, 2026. The Taiwan.md project was born in mid-March 2026. Migu's collaboration system uses Claude Code as its tooling substrate (the source code for his talk includes CLAUDE.md, and the orchestrator is "one Claude Session"), the same as Taiwan.md.

[^6]: The Government Open Data Platform data.gov.tw is operated by the National Development Council and launched in 2013; the Transport Data eXchange Platform TDX was created by the Ministry of Transportation and Communications in 2022 by integrating five major transport platforms: roads, rail, aviation, shipping, and bicycles; the Ministry of the Interior's Socio-Economic Geographic Information System (SEGIS) provides village-level population data; the Central Weather Administration provides open APIs. The real-time total number of datasets on data.gov.tw could not be independently verified by API this time; the "about 50,000" figure used in this article is the number shown in Migu's talk slides.

_Last verified: 2026-06-25_
