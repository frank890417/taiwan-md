---
title: "Visualization Module Catalog: Nineteen Ways to See Taiwan's Data"
description: "A live demonstration of Taiwan.md article visualization modules—rendering all nineteen `tw-*` modules once using real data on Taiwan's housing, population, healthcare, and legislature, paired with the syntax and design principles of graph.md."
date: 2026-06-06
category: 'About'
tags: ['Data Visualization', 'Housing Justice', 'Housing Policy', 'Open Data']
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
translatedAt: '2026-10-23T16:35:03.888845+00:00'
---

# Visualization Module Catalog: Nineteen Ways to See Taiwan's Data

> **30-Second Overview:** This page is a "live demo" of the Taiwan.md visualization system—rendering each of the nineteen article visualization modules once, all using real Taiwanese data (price-to-income ratio, public housing, aging population, referendums, nurse-to-patient ratio, legislative seats). It is the companion to the editorial guide [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md): **while graph.md explains "when to use which, how to do it well, and how to write the syntax," this page lets you see "exactly what it looks to look like."** Every module is rendered using pure HTML/SVG, so humans, screen readers, Google, and AI crawlers all read the exact same data—this is precisely why we chose static visualization over interactive charts.

When writing an article about numbers, the greatest fear is turning data into a pile of consecutive digits, where readers zone out by the third percentage. The job of visualization is to reduce the entropy of "dense numerical prose" into "instantly readable structures."

However, Taiwan.md's visualization follows a discipline others do not: **we only create visualizations that "are also readable by LLMs."** An interactive chart drawn with D3 or Canvas might look flashy, but AI crawlers like GPTBot, PerplexityBot, and ClaudeBot do not run JavaScript; to them, that chart is a blank void. Because we use semantic HTML and inline SVG, the data exists within the source code, allowing AI to read and cite Taiwan's first-person data across six languages. **Visualization that is readable by LLMs is the visualization of sovereignty.**

The following nineteen modules are presented in order, from the simplest "single large number" to "county tile maps" and "seat arcs." The full version of syntax and design principles can be found in graph.md; here, we only provide a brief "what it is and when to use it."

## Data Big Figure `tw-figure`

The simplest and most powerful type: place a dramatic number at its maximum scale, using a comparison to tell a story of transformation. Ideal as an introductory "sledgehammer stat."

```tw-figure
67,000 → 870,000 / ping
The unsold sale price of Taipei Chenggong Public Housing in 1985, compared to the average real estate agent price in 2026—the same address, approximately a 13x increase.
Real Estate Transaction Registry Platform (Chenggong Public Housing)
```

## Data Group `tw-stat`

When a paragraph contains three or four parallel key figures, rather than writing a long sentence, arrange them into a row of cards so readers can scan them at a glance.

```tw-stat
174,891 units | Government-built public housing | 1976–1999
Over 390,000 units | Total broad-definition public housing | Until abolition in 2015
84.4% | Nationwide homeownership rate | 2024
Source: Executive Yuan press release on the abolition of the National Housing Act, Ministry of the Interior Real Estate Information Platform
```

Data-containing editorial modules (data groups, comparison cards, policy axes) must include a `Source:` tag just like chart modules. A site-wide audit in July 2026 found that modules monitored by automated gateways had a 100% source attribution rate; the three high-frequency modules that were _not_ monitored had a 40% failure rate, leaving examples "naked." They have now been brought into the `viz-health` gateway.

## Comparison Card `tw-versus`

A point-by-point comparison of two systems, two positions, or two states of being. Warm colors on the left, cool colors on the right, with a "vs" in the middle, allowing differences to be read line by line.

```tw-versus
Taiwan Public Housing | Hong Kong Home Ownership Scheme
Government subsidies, sold cheaply to residents | Government subsidies, sold cheaply to residents
Resale at market price permitted after one year of residency | Resale on the open market requires "land premium" payment
Almost all capital gains belong to the individual | Capital gains are recouped by the public treasury at the original discount ratio
One-time loss of public stock | Public profit-sharing is recoverable
Source: Legislative Yuan Gazette, Hong Kong Housing Authority
```

## Proportional Bar `tw-bars`

Numerical comparisons or rankings for a small number of categories. The length of horizontal bars scales automatically based on the value, with the maximum value filling the width. Remember to add a `Source:` line at the end of data modules; it will automatically become the source annotation below.

```tw-bars
National 2014 | 8.41x
National 2024 | 10.76x
Taipei 2024 | 16.60x | Historical peak
Source: Ministry of the Interior Real Estate Information Platform, NCCU Real Estate Research Center
```

## Waffle Chart `tw-waffle`

The composition of a part relative to a whole. One hundred squares represent one hundred percent, which is more intuitive than a pie chart—you can actually count the squares. Suitable for data where "category totals" approximately equal 100%.

```tw-waffle
Residential Composition of Vienna (2023)
Municipal Social Housing | 21.9
Subsidized Social Housing | 21.4
Owner-occupied | 20.4
Private Rental | 36.3
Source: City of Vienna (Stadt Wien) Housing Statistics
```

## Policy Axis `tw-timeline`

The context of key nodes in a system or policy, connected via a nodal timeline. Note that this is "visual assistance"; it is distinct from using chronological headings (e.g., "In 1975...") in the main body text.

```tw-timeline
1975 | National Housing Act enacted | Government built and sold, establishing a closed loop of "buyer eligibility" to prevent subsidy leakage
2002 | The wall was torn down | Law amended to remove buyer eligibility restrictions; public housing could be sold to anyone after one year
2015 | National Housing Act abolished | Official reason: Homeownership rate reached 85%; transitioned to social housing (rental only, no sale)
2026 | Taoyuan reinstates the gate | Affordable housing: Resale price cannot exceed original purchase price
Source: Legislative Yuan Gazette, Executive Yuan press release on the abolition of the National Housing Act
```

## Quote Card `tw-quote`

When a single sentence represents the core tension of an entire article, enlarge it into a quote card. You do not need to add quotation marks manually; the module will add them. Quotes must be verbatim and verifiable.

```tw-quote
"A house worth 30 million on the market becomes a 60 to 70 million house... robbing the poor to aid the rich, with the state using public funds to help the wealthy renovate houses."
Lin Chih-chun | Lawyer, 2025 proposal criticizing "state-funded urban renewal for Chenggong Public Housing"
```

## Source Strip `tw-source`

Consolidate the sources of an analytical section into a subtle chip placed next to the paragraph. Credibility is part of curation—Taiwanese digital media often forgets to cite sources; this is where we can do things differently.

```tw-source
Ministry of the Interior Real Estate Information Platform, Real Estate Transaction Registry, NCCU Real/Estate Research Center, Legislative Yuan Gazette, Hong Kong Housing Authority
```

## Note Box `tw-note`

Half of the credibility of a data article lies in "how you calculated it." While reporters use [Note] blocks in data journalism to explain methods or (Note) for corrections, we have turned this convention into a module. The first line should be one of: `Note`/`Method`/`Note`/`Correction`/`Update`, with each subsequent line forming its own paragraph.

```tw-note
Note
On this page, "Aging Index" = (Population aged 65+ ÷ Population aged 0–14) × 100. A value of 100 means there are as many elderly as children; a higher number indicates a "top-heavy" population.
Aging rate and Aging Index are taken from the Ministry of the Interior's Department of Household Registration statistics for late 2025; see <Using Data to View Taiwan's 22 Counties and Cities> for full analysis of all 22 regions.
```

## Line Chart `tw-line`

Trends across four or more time points, drawn as a line using inline SVG, with the y-axis limits marked so readers can see the range. Most importantly—it **automatically generates a hidden data table**, allowing screen readers and AI crawlears to read the raw data. The chart is for humans; the table is for machines. Both share the same source.

```tw-line
Ten-year rise in National Price-to-Income Ratio (multiplier)
Year | National
2014 | 8.41
2016 | 9.32
2018 | 8.57
2020 | 9.20
2022 | 9.61
2024 | 10.76
Baseline: 2014 Start | 8.41
Source: NCCU Real Estate Research Center, Ministry of the Interior Real Estate Information Platform
```

Line charts also support a **baseline**: adding a line `Baseline: Label | Value` will draw a dashed line without endpoints and with only one label, visually distinguishing it from the measured sequence. This prevents readers from misinterpreting a fixed threshold as measured data.

## Slope Chart `tw-slope`

When you have "only two time points," a line chart wastes the empty space in between. A slope chart lets the inclination of the line connecting the two ends speak for itself, showing at a glance who rose sharply and who overtook whom. Adding a `*` to the start of a label can emphasize a specific row, while others automatically fade into the background context.

```tw-slope
Price-to-Income Ratio: Who rose most over the decade? (multiplier)
2014 | 2024
National | 8.41 | 10.76
*Taipei | 12.0 | 16.60
Source: Ministry of the Interior Real Estate Information Platform, NCCU Real Estate Research Center
```

## Heatmap `tw-heatmap`

Matrix comparison of Region × Indicator or Year × Category. Each column is normalized into color intensity; larger numbers are warmer. It is inherently an HTML table, making it natively AI-readable—this is why heatmaps in our system are superior to "a colored image."

```tw-heatmap
County/City | Price-to-scale Ratio (multiplier) | Mortgage Burden (%)
Taipei | 16.60 | 63.9
New Taipei | 13.03 | 56.9
Taichung | 11.11 | 48.0
Taoyuan | 9.0 | 40.0
Source: Ministry of the Interior Real Estate Information Platform
```

## Dot Chart `tw-dot`

Bar charts compare **magnitude**; dot charts show **distribution**: every dot sits on the same ruler, so you can see who clusters together and who are outliers. One value per row gives a dot strip; two values draw a "from here to there" interval; three values (point estimate | lower bound | upper bound) produce a poll-style "point estimate + uncertainty interval band." A ±3% sampling error shouldn't be swallowed—this is the honest presentation most often lost in election years. `*` works the same way for emphasis.

```tw-dot
Two extremes of aging rates: youngest to oldest counties/cities (65+ share, %)
Hsinchu County | 15.08 | Youngest in Taiwan
Taoyuan | 16.72
Taichung | 17.40
New Taipei | 19.95
Tainan | 20.48
Kaohsiung | 20.79
*Chiayi County | 24.11 | Highest aging index in Taiwan
*Taipei | 24.18 | Highest in Taiwan
Source: Ministry of the Interior, Department of Household Registration, end of 2025
```

## Stacked Bar `tw-stack`

Waffle charts are good for "one whole" composition; stacked bars are better for **comparing compositions across multiple rows**—each row is automatically normalized to 100%, and if the paragraph is wide enough, values are labeled directly within the color blocks.

```tw-stack
Three Nuclear Referendums: For vs. Against (Percentage of valid votes %)
Referendum | For | Against
2018 Nuclear Energy for Greenery | 59 | 41
2021 Restarting Nuclear 4 | 47 | 53
2025 Extending Nuclear 3 | 74 | 26
Source: Official results of the three referendums by the Central Election Commission
```

## Pyramid `tw-pyramid`

Back-to-back bars, with one group on each side and shared labels in the middle, is a classic demographic chart type. Here, we use it to view the "top-heavy" nature of six counties: children on the left, elderly on the right; comparing the two makes aging more than just an abstract percentage.

```tw-pyramid
Top-Heavy: Child vs. Elderly Population Ratio in Six Counties (%)
County/City | 0–14 years | 65+ years
Hsinchu County | 14.80 | 15.08
Taoyuan | 13.13 | 16.72
Taichung | 12.75 | 17.40
Taipei | 11.97 | 24.18
Keelung | 9.28 | 22.28
Chiayi County | 8.27 | 24.11
Source: Ministry of the Interior, Department of Household Registration, late 2025; Child ratio calculated as (Aging Rate ÷ Aging Index) × 100
```

## Tile Map `tw-tiles`

Taiwan's choropleth maps suffer from two old problems: Hualien and Taitung are so large they steal all the visual weight, and AI-drawn shapes of Taiwan often look like "something between an olive and a potato." The tile map arranges the 22 counties into equal-sized tiles (layout is hardcoded in the system to match true relative positions), each tile carries equal weight, and numbers are written directly on them. The shape is always correct because we don't draw shapes at all.

```tw-tiles
Aging Rate in Taiwan's 22 Counties/Cities (Percentage aged 65+, %)
Taipei City | 24.18
New Taipei City | 19.95
Taoyuan City | 16.72
Taichung City | 17.40
Tainan City | 20.48
Kaohsiung City | 20.79
Keelung City | 22.28
Hsinchu City | 16.16
Chiayi City | 19.90
Hsinchu County | 15.08
Miaoli County | 20.23
Changhua County | 20.37
Nantou County | 22.66
Yunlin County | 21.76
Chiayi County | 24.11
Pingtung County | 21.84
Yilan County | 20.77
Hualien County | 21.52
Taitung County | 20.93
Penghu County | 21.03
Kinmen County | 19.69
Lienchiang County | 17.14
Source: Ministry of the Interior, Department of Household Registration, late 2025
```

## Isotype `tw-iso`

"174,891 units" is a number you forget immediately; nine dots you can count on your fingers are not. The isotype replaces large numbers with countable symbols ("one symbol = X amount"), which is the core technique used by reporters covering deep-sea fishing: turning impersonal, massive numbers into units that resonate with the public. Symbols use only integers (no half-symbols), and precise values are written alongside.

```tw-iso
How much public housing was built by the government in these 24 years?
單位：● = 20,000 units
Government-built | 174,891 units | 1976–1999
Total broad-definition public housing | Over 390,000 units | Until abolition in 2015
Source: Executive Yuan press release on the abolition of the National Housing Act
```

## Seat Arc `tw-arc`

Parliamentary seat composition has its own specialized chart: a semi-circular dot matrix, one dot per seat, with parties listed in order as continuous arcs. Pie charts compare angles (which the human eye is poor at), but the seat arc lets you count dots directly, with the majority line drawn exactly where it should be. Here, we use the 2024 Legislative Yuan election results: 113 seats, no party holds a majority; that dashed line marks the starting point of the subsequent intense recall battles. Note that this is for parliamentary use: for elections like the 22 County/City Mayors where there is "one winner per district," use the tile map below.

```tw-arc
2024 Legislative Yuan Seats: No Party Holds Majority (113 seats)
過半：57
KMT | 52
DPP | 51
TPP | 8
Independents | 2 | Pan-Blue leaning
Source: Central Election Commission
```

## Small Multiples `tw-multiples`

Putting five lines on one chart turns them into a mess of "spaghetti"; small multiples give each line its own small box, and **all boxes share the same scale**, allowing shapes to be compared directly. Here, we use three shifts of nurse-to-patient ratios: the heatmap (above) gives you a precise matrix, while small multiples show you the shape—how every level climbs toward late night, with the most acute rise at the base level. Same data, different questions, different charts.

```tw-multiples
The deeper the night and the more grassroots the hospital, the more beds one nurse manages (people)
Column: Shift | Nurse-to-Patient Ratio
--- Medical Center
Day | 6
Evening | 9
Night | 11
--- Regional Hospital
Day | 7
Evening | 11
Night | 13
--- *Community Hospital
Day | 10
Evening | 13
Night | 15
Source: Ministry of Health and Welfare Standard Announcement on Nurse-to-Patient Ratios, 24
```

## How to use these modules

Each module is implemented by writing a ` ```tw-* ` block within the article's Markdown, using `|` for columns. During build time, it automatically transforms into the visuals seen above—authors do not need to write any HTML or JavaScript. The full syntax, when to use which type, how to handle color and axes without being misleading, and a pre-publication visualization checklist can all be found in [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md).

This system draws inspiration from the editorial philosophy of visual storytelling media [The Pudding](https://pudding.cool/)—questions precede data, conclusions must be clear, and attribution is the protagonist—but has evolved into an organ unique to Taiwan.md: static, multilingual, and AI-readable. The full design context is written in the [Visualization System Design Report](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md).

To see how these modules weave a narrative within a real deep-dive article, read [Public Housing and Housing Justice](/en/society/public-housing-justice)—most of the data on this page originates from that study.

## This system is also evolving

The page you are currently viewing is itself the result of three rounds of evolution. Since this is a timeline page, we use the policy axis module to tell our own history:

```tw-timeline
2026-06-06 | Ten modules born | After researching The Pudding and FT chart taxonomies, the first batch emerged: Big Figure, Comparison Card, Proportional Bar, Line Chart
2026-06-12 | Seventeen modules after one week | Added Slope, Dot Plot, Stacked, Pyramid, Tile Map, Isotype; the pixel validator `viz-shot` was born on the same day, because "markup existence" and "looking correct" are two different things
2026-07-16 | Nineteen modules, and learned six languages | Seat Arc and Small Multiples added; system strings like "Source" were updated to render in six languages; English/Japanese tile maps no longer degrade into bar charts
Source: Taiwan.md Visualization System Design and Evolution Report (June 2026 – July 2026, GitHub Public)
```

The focus of the third round was not actually new chart types, but an honest self-audit. A site-wide audit revealed: modules monitored by automated gateways had a 100% source attribution rate; however, the three high-frequency modules that were _not_ monitored had a 40% failure rate. The standards were written in the editorial guide two months ago, but behavior followed the instrument's shape exactly, so this time we expanded the instrument to match the standard. During the same round, we caught system strings rendering as Chinese on English, Japanese, and Korean pages—even a single Simplified Chinese character was hidden in an accessibility tag unnoticed. For a system that claims to "make Taiwan's data readable by LLMs in six languages," these corners are more critical than new features.

Recent research supports this approach: the accuracy of multimodal AI in reconstructing chart values from images is unreliable; text nodes are what machines can truly read stably. This is why our tile maps write numbers directly on tiles and every chart includes a hidden data table. The full research process and design decisions are documented in the [Visualization System v3.0 Deep Research and Implementation Report](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md).

**Further Reading**:

- [Public Housing and Housing Justice](/en/society/public-housing-justice) — The full story behind these housing data: how public housing went from affordable homes to an asset ladder; the source for most modules on this page.
- [Using Data to View Taiwan's 22 Counties and Cities](/en/geography/data-taiwan-22-cities) — All aging population data for the dot plots, pyramids, and tile maps on this page comes from this full analysis of 22 regions.
- [Taiwan and Nuclear Energy Debates](/en/society/taiwan-nuclear-debate) — The full story of the three stacked bar referendums: winning the debate, losing the system.
- [Medical Law](/en/society/medical-care-act) — The full story behind the nurse-to-patient ratio numbers in small multiples: the law can specify how many beds a nurse manages, but not if those hands exist.
- [The Great Recall](/en/history/great-recall-movement-2024) — The aftermath of the majority line in the seat arc: how a Legislative Yuan with no majority party reached 31 recall motions.
- [Taiwan's Low Birthrate Crisis](/en/society/taiwan-low-birth-rate-crisis)—The inability to afford housing and the inability to have children: another side of generational justice.

## Image Sources

This article uses 1 Creative Commons licensed image, cached at `public/article-images/society/`:

- [Taipei Skyline (Xiangshan View)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Photo: Heeheemalu, 2026, CC BY-SA 4.0 (hero)

## References

[^1]: [Ministry of the Interior Real Estate Information Platform](https://pip.moi.gov.tw/Publicize/Info/E1050) — Official housing statistics including price-to-income ratio, mortgage burden, and homeownership rate.

[^2]: [NCCU Real Estate Research Center](https://rer.nccu.edu.tw/article/detail/2210058908437) — Historical indicators of housing affordability; source for the national price-to-income ratio sequences in the line and bar charts on this page.

[^3]: [Executive Yuan Press Release on the Abolition of the National Housing Act](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Official data regarding cumulative public housing units (approx. 390,000+).

[^4]: [Ministry of the Interior, Department of Household Registration Population Statistics](https://www.ris.gov.tw/app/portal/346) — Population aged 65+ and aging index for all counties/cities as of late 2025; see full verification chain in <[Using Data to View Taiwan's 22 Counties and Cities](/en/geography/data-taiwan-22-cities)>.

[^5]: [Central Election Commission 2018 Referendum Case No. 16 (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — Official certified results for the three nuclear referendums (59%/47%/74%); see case-by-case verification chain in <[Taiwan and Nuclear Energy Debates](/en/society/taiwan-nuclear-debate)>.

[^6]: [CNA: No Party Holds Majority in 2024 Legislative Election](https://www.cna.com.tw/news/aipl/202401130361.aspx) — The distribution of the 113 seats (KMT 52, DPP 51, TPP 8, Independents 2) is the CEC certified result; see verification chain in <[The Great Recall](/en/history/great-recall-movement-2024)>.

[^7]: [Ministry of Health and Welfare Standard Announcement on Nurse-to-Patient Ratios (2024)](https://www.mohw.gov.tw/) — The three-level × three-shift nurse-to-patient ratio standards for small multiples; see verification chain in <[Medical Law](/en/society/medical-care-act)>.
