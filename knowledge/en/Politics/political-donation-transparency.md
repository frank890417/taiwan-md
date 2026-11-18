---
title: 'Political Donation Transparency: The Control Yuan Platform, g0v Visualization, and 22 Years of Openness Infrastructure'
description: "Open the Control Yuan's political donation public search platform, enter any candidate's name, and you can find out who gave them money, how much, and what campaign activities the funds went toward. This infrastructure didn't fall from the sky — it was built step by step through the 2004 Political Donations Act, the 2008 platform launch, the 2017 data-openness agreement between the CEC and the Control Yuan, and a decade of g0v engineers filling in with visualization tools — one law at a time, one accounting report at a time, one civic engineer at a time."
date: 2026-05-27
author: 'Taiwan.md'
category: 'Politics'
subcategory: '公民監督'
tags:
  ['政治獻金', '透明度', '監察院', 'g0v', '選舉金流', '2004立法', '2026選舉']
readingTime: 12
lastVerified: 2026-05-27
lastHumanReview: false
featured: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Politics/政治獻金透明度.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:8a7814971a9249c7'
sourceBodyHash: 'sha256:214c403ec0d7137c'
translatedAt: '2026-07-11T00:35:00+08:00'
---

# Political Donation Transparency: When Democratic Infrastructure Becomes a Downloadable CSV

> **30-second overview:** One weekend in 2014, a g0v engineer at a hackathon venue on Qingdao East Road in Taipei opened the Control Yuan's political donation reports. He didn't want much — just to see which companies had given money to the previous legislative candidates, and how much each contribution was. But the files downloaded as PDFs. Not spreadsheets, not CSVs, not JSON — scanned PDFs. He set down his coffee, opened a terminal, and started writing the first line of a data-scraping script. A decade later, Taiwan had the "Election Money Flow" visualization system — not built by the government, but filled in by civic engineers. But the gap they filled wasn't empty. Beneath it lay a law passed in 2004, a search platform launched in 2008, and accounting reports uploaded to the Control Yuan in accordance with the law. This article is about that space — political donation transparency, the most technical, most overlooked, yet most concrete piece of Taiwan's 22-year democratic infrastructure.

---

## Why Start with PDFs

Ordinary citizens don't look up political donations. That's a fact.

Open the Control Yuan's political donation public search platform[^1], enter a candidate's name, download the report — this entire sequence is outside the daily routine for the vast majority of voters. Going to the polling station on election day, casting a ballot, going home to watch the vote count — that's the mainstream experience of democratic participation.

But **the value of transparency infrastructure lies not in how many people use it, but in its very existence**.

When an investigative journalist needs to trace a money flow — the platform is there.
When a legislative candidate wants to know which companies gave money to the incumbent in the previous term — the platform is there.
When a g0v engineer wants to build visualizations to make the data more comprehensible — the raw data is there.
When a scholar wants to study the structure of money-powered politics — two decades of accumulated data are there.

When the platform doesn't exist, none of these inquiries are possible. When it does, democratic quality has a verifiable floor.

That's why the moment the Political Donations Act was passed in 2004[^2], it wasn't about which party won — it was about Taiwan's democratic infrastructure growing a new organ.

---

## 2004: The Year of Rare Cross-Party Consensus

On March 26, 2004, the Legislative Yuan gave third reading to the Political Donations Act[^2].

The political atmosphere that year was actually quite hostile — the March 19 shooting incident was only seven days behind, the presidential election results had triggered a pan-blue vs. pan-green standoff, and the protest crowds on Ketagalan Boulevard had yet to disperse. But the Political Donations Act passed in this most tension-filled spring.

Why did the two parties reach consensus at this moment? The answer lies in the decade of history before it.

Since the 1990s, the term "money-powered politics" had been a pain point for both parties. The KMT was accused of allying with local factions and capitalists; the DPP was accused of accepting money from emerging corporate donors; independent candidates took money with no one overseeing them. After every election, sporadic money scandals surfaced, but because there was no dedicated law, no disclosure obligation, and no penalties — scandals broke and faded, public outrage flared and died.

It wasn't until after the first party turnover in 2000, when the Chen Shui-bian administration pushed for legislation, that the KMT — holding a Legislative Yuan majority and opposing the executive branch on many issues — recognized, on the question of "whether political donations should be transparent," that **both parties had suffered under the label of money-powered politics**. The need for a clean image outweighed the convenience of non-disclosure.

The Political Donations Act was born at this moment — not driven by any single hero, not forced by any particular movement, but emerging from the intersection of shared interests between the two parties.

---

## The Legal Framework: Who Can Receive, Who Can Give, Limits, and How to Report

The full text of the Political Donations Act is not long, but its framework is clear[^3].

**Article 5: Who can receive political donations.** The law defines three categories of "political donation recipients":

- Candidates (registered)
- Political parties
- Political groups (legally incorporated)

Anyone outside these three categories receiving political donations is in violation. A legislator's assistant receiving them, a campaign director receiving them on behalf of the candidate, a candidate's spouse receiving them — all prohibited. The law's design channels all money flows through "reportable entities," squeezing out gray areas.

**Article 7: Who can donate.** The law permits three categories of donors:

- Citizens of the Republic of China
- Domestic companies
- Domestic nonprofit organizations

**The following are prohibited**:

- Foreign companies, foreign governments, foreign individuals
- People, juridical persons, and groups from the People's Republic of China
- Government agencies and state-owned enterprises
- Juridical persons in which the government or state-owned enterprises hold more than 20% of shares
- Contractors currently under contract with the government[^4]

The last provision — government contractors cannot donate — is designed as the most basic firewall against "exchanging political donations for government contracts."

**Article 18: Contribution limits.** This is the most frequently discussed provision[^5]:

- Individual to a single candidate: NT$100,000 per year
- Company to a single candidate: NT$1,000,000 per year [NEEDS-VERIFY]
- Individual to a political party: NT$300,000 per year
- Company to a political party: NT$3,000,000 per year [NEEDS-VERIFY]

The logic behind the limits is to prevent any single donor from exerting excessive influence over a single candidate — but as we'll see later, this logic is structurally circumvented through "split donations."

**Article 20: Reporting obligation.** Within a specified period after the election, candidates must file a complete political donation income-and-expenditure statement with the Control Yuan — who gave how much, what it was spent on, and the balance remaining. All filed data is uploaded to the Control Yuan's political donation special account audit system as the source for future public searches.

**Article 26: Penalties.** Violators face fines of 1 to 5 times the amount involved; serious cases constitute criminal liability — with a maximum sentence of up to five years imprisonment[^6]. The penalty design makes "simply not reporting" an unreasonable option.

The law stops here — the skeleton is complete. But a skeleton is not an organ; an organ needs flesh and blood. The flesh and blood is the platform.

---

## 2008: The Control Yuan Platform Launches

The 2008 election for the 12th President of the Republic of China — Ma Ying-jeou vs. Hsieh Chang-ting — was Taiwan's first presidential election "fully subject to the Political Donations Act with mandatory reporting"[^7] [NEEDS-VERIFY].

That year, the Control Yuan's political donation public search platform officially went live. URL: `https://ardata.cy.gov.tw/`[^1].

The design goal of the platform's first version was simple: digitize candidates' paper filings, put them online, and make them publicly searchable. Anyone could enter a candidate's name / political party name / political group name and retrieve historical income-and-expenditure statements — including each donor's name, amount, and purpose category.

This was a rare design in Asia. **The US FEC (Federal Election Commission) data goes deeper — but historically was only released after the election**[^8]. Japan strengthened its Political Funds Control Act in 2007 and also established a disclosure mechanism, but the "political group" loophole allows major money flows to bypass it[^9]. South Korea's National Election Commission centralizes management, but its interface is less user-friendly than Taiwan's[^10] [NEEDS-VERIFY].

Taiwan was actually ahead in this regard — but the leading position couldn't block the next problem.

**The problem: the interface is difficult to use, the data is unstructured, and batch downloads aren't supported.**

Opening the first version of the platform, you had to click through PDFs one by one. To see which companies gave money to a candidate — click open PDF 1. To see the next one — click open PDF 2. To do cross-candidate comparisons — copy the tables yourself. To do time-series analysis — organize the timeline yourself. To check whether the same group split donations across dozens of straw donors — manually compare addresses and surnames.

This is the scene that greeted the g0v engineer when he opened the files in 2014.

---

## 2014: g0v's "Election Money Flow" Steps In

g0v is Taiwan's civic hacker community[^11]. The name comes from "changing gov.tw to g0v.tw" — when the government doesn't do open data work, the community does it themselves.

At a hackathon in 2014, several engineers decided to take on the "Election Money Flow" project[^12]. The goals were clear:

1. Scrape the Control Yuan's PDF reports
2. Parse them into structured data (CSV / JSON)
3. Build visualizations that make the data comprehensible
4. Open-source all scraping and parsing scripts

They hit a wall at step one — the PDFs were scanned, not true digital PDFs. Text couldn't be copied directly. They had to write an OCR pipeline, format correction, name matching, and company deduplication.

Months later, the first version of "Election Money Flow" went live[^12]. Opening the webpage, what you saw wasn't a report — it was a network graph.

- Nodes represented candidates or donors
- Lines represented the direction of money flows
- Line thickness represented the amount
- Related companies within the same group were clustered by color

Click any node and see the full details. Click any link and see the original filing source (annotated with the Control Yuan PDF page number).

**What this visualization did was make the Control Yuan's already-public data explorable.** Law + platform + visualization — stacked together, these three layers made it possible to "trace money flows by opening a browser."

It wasn't just the "Election Money Flow" project alone. g0v's political oversight ecosystem also includes:

- **councilor-voter-guide**[^13]: Integrates legislative candidates' political donations, attendance records, bill proposals, and interpellation records into a legislator profile card
- **Dark Political Donations**[^14] [NEEDS-VERIFY]: Flags suspicious or potentially illegal money flow patterns
- **Government Contracts × Political Donations Cross-Reference**: Matches Government Procurement Gazette data against political donation data to see which winning bidders were also political donors

The characteristic of all these projects: **all raw data comes from government open-data sources**. The community isn't "exposing secrets" — they're "making data that's already public but hard to use actually usable."

This is the healthy model of Taiwan's civic oversight infrastructure — the government provides raw data, the community fills in interfaces and analysis, media and scholars use community outputs for oversight. Three layers of division of labor, each doing what they do best.

---

## 2017: The Control Yuan–CEC Data Openness Agreement

2017 was a turning point.

That year, the Control Yuan and the Central Election Commission signed a data openness agreement [NEEDS-VERIFY], and some political donation data began to be released in structured formats (CSV / partial field APIs)[^15]. Although it wasn't a complete API and much data remained in PDF form — this was the first time a Taiwan government data platform formally acknowledged that "structured data is true openness."

g0v's "Election Money Flow" also received its second-generation version at this time[^12]. The new version no longer needed OCR to process large volumes of data and could directly consume official CSV — processing efficiency improved, error rates dropped, and coverage expanded.

But **a complete API has still not been realized**. As of 2026, if you want to conduct large-scale cross-district, cross-year, cross-candidate political donation analysis, you still have to partially rely on g0v-maintained scraping pipelines. The line of "government open data" in the domain of political donations has been walked for twenty-two years and still isn't finished.

---

## Structural Problems: The Law Is Written but Loopholes Remain

After twenty-two years of operation, the Political Donations Act has accumulated several structural problems. These are not design failures of the law itself — they are universal challenges faced by any transparency law.

### 1. Split Donations Circumventing Limits

The individual NT$100,000 and company limits set by Article 18 appear sufficient to prevent concentrated influence. But in practice, a corporate group **can split a large single donation into dozens of straw donor contributions**. Group directors, directors' spouses, subsidiary heads, employees — each donates NT$100,000 as an individual, and collectively the total exceeds the limit many times over[^16].

This pattern doesn't technically violate Article 18 — every individual stays within the limit. But it is substantively a circumvention. Proving that these are "split" portions of the same fund requires tracing the source of funds and interviewing the parties involved — the Control Yuan's audit capacity cannot conduct thorough investigations case by case.

### 2. The Gray Zone of Loan Provisions

The law allows candidates to "borrow from themselves" for campaigning — meaning the candidate or their family can provide large loans to campaign activities, to be repaid later from other income [NEEDS-VERIFY]. This design was originally intended to ensure that candidates wouldn't be unable to run for lack of initial funds, but in practice **loans often become the primary source of funding**. Loans don't count as "political donations" — they aren't subject to the Article 18 limits, and they don't appear on the same public disclosure form as "donors."

The result: a candidate's reported political donations may only be in the millions, but actual campaign expenditures may reach tens of millions, with the gap coming from "self-borrowing" — and the ultimate source of repayment for "self-borrowing" often falls outside the oversight scope of the Political Donations Act.

### 3. Political Donations ≠ Campaign Expenditures

This is the most easily confused point.

**Political donations** are "money received by the candidate" — subject to the Article 18 limits, reported to the Control Yuan.
**Campaign expenditures** are "money spent by the candidate" — subject to the spending limits under Article 41 of the Civil Servants Election and Recall Act[^17], reported to the Central Election Commission.

These are two different authorities (Control Yuan vs. CEC), two different filing systems, two different public interfaces, two different field definitions. **They should theoretically reconcile** — money received minus balance equals money spent — but in practice the two datasets frequently don't match up. The reasons are definitional differences, filing schedule differences, and differences in how remaining funds are used.

The g0v community has attempted "Political Donations × Campaign Expenditures cross-checks" — but the normalization workload required for cross-platform matching is enormous[^12].

### 4. Recall and Referendum Not Subject to Disclosure Requirements

The Political Donations Act regulates "candidate elections" — it does not cover recall petitioners or referendum petitioners.

During the 2025 Great Recall movement, the funding sources of petition groups did not carry equivalent disclosure obligations[^18]. Petition groups could accept donations and mobilize resources, but there was no corresponding Control Yuan filing system. This loophole became a discussed legislative reform direction after the large-scale recalls of 2025 — but the Political Donations Act hasn't been amended since 2018, and as of July 2026, the money flows of recall and referendum petitioners still fall outside any statutory filing obligation.

---

## International Comparison: Taiwan's Relative Position in Asia

Placing this in an Asian coordinate system:

| Country       | Authority                    | Disclosure Timing                                       | Interface Friendliness                       | Limit System                         |
| ------------- | ---------------------------- | ------------------------------------------------------- | -------------------------------------------- | ------------------------------------ |
| Taiwan        | Control Yuan                 | 3–6 months after election                               | Medium (partially structured)                | Individual NT$100K / company limited |
| United States | FEC                          | After election (some pre-election periodic filings)[^8] | High (complete API)                          | Individual / PAC tiered              |
| Japan         | Ministry of Internal Affairs | Annual reports                                          | Low (PDF-based)[^9]                          | Large "political group" loophole     |
| South Korea   | NEC                          | After election                                          | Low (outdated interface)[^10] [NEEDS-VERIFY] | Centralized management               |

Taiwan's relative position: **solid legal foundation, platform exists, reasonable limits, but interface still needs improvement, structural loopholes require legislative reform**.

Not the best — the US FEC remains the international benchmark in data depth and API completeness.
But not the worst — compared to some neighboring countries where disclosure exists in form but is practically unsearchable, the Control Yuan platform plus g0v's contributions constitute a functioning ecosystem.

---

## Observation Points for the 2026 Elections

The November 28, 2026 nine-in-one elections — 6 special municipality mayors, 380 councilors, 16 county and city mayors, 532 councilors, 198 township mayors, 2,148 representatives, 6 indigenous district chiefs, 50 district representatives, 7,748 village chiefs — totaling over 10,000 elected positions[^19].

Several observation points for political donation transparency in this election are worth tracking:

**1. Whether real-time reporting expands.** Currently, candidates report after the election and the data goes public months later. If periodic pre-election disclosure (even monthly updates) could be implemented, the significance for voter decision-making would be much higher. This would require either legislative reform or an administrative-level adjustment by the Control Yuan.

**2. Whether g0v real-time mirroring can achieve coverage.** g0v's "Election Money Flow" has produced complete visualizations after every major election, but "pre-election" coverage remains limited. Whether 2026 can see a closer-to-real-time civic data pipeline depends on community momentum.

**3. Concentration of large donations.** Observe the proportion of a candidate's total donations accounted for by a small number of donors — the higher the concentration, the deeper the candidate's dependence on specific funders. This is a proxy indicator for measuring the structure of money-powered politics.

**4. Government contractor cross-referencing.** Article 7 prohibits donations from government contractors — but cross-period enforcement has lags (the timing relationship between contract signing date and donation date is complex). After every election, sporadic cases trigger Control Yuan investigations. The depth of coverage of such cases in 2026 is also an observation point.

**5. Recall / referendum disclosure loopholes.** Whether the legislative reform discussions mentioned earlier materialize.

---

## Why This Infrastructure Deserves to Be Cherished

Return to the scene of that g0v engineer opening the PDFs.

If you asked him: "Why spend your weekend on this? Most people won't use it anyway." — he wouldn't answer "for democracy," wouldn't answer "for transparency," probably wouldn't even answer "for civic oversight."

He'd answer — "because this data **should** be usable this way, but right now it isn't."

This is the essence of Taiwan's civic engineering culture — **not revolution, not protest, filling in the gaps**. The government has done 80% of the work; the remaining 20% in usability, explorability, and analyzability — the community fills in.

The Control Yuan did the maximum the Political Donations Act enabled them to do — receive data, store data, provide a search interface. g0v did extensions beyond the Control Yuan's interface — visualization, cross-source matching, API-ification, community documentation. Media did investigative reporting on top of g0v's visualizations — digging out the stories behind the network graphs. Scholars did structural analysis on long-term accumulated data — writing trends from each election cycle into papers.

**These four layers of division of labor aren't each doing their own thing — they're different nodes in the same chain.** Each layer fills in what the previous layer couldn't do. Remove any one layer, and the next layer can't exist.

On election day for the 2026 nine-in-one elections, from 7,748 village chiefs to 6 special municipality mayors — voting ends, counting ends, winners and losers — everyone looks away. But this infrastructure doesn't stop. The Control Yuan's filing system will receive every candidate's accounting reports, g0v's scrapers will pull down a new round of data, and a new generation of visualizations will start being written over coffee at some hackathon.

**The most concrete shape of democratic infrastructure is this kind of hero-less, day-after-day engineering that makes data usable.**

Open a browser, enter the URL, search a candidate's name — behind this action lies the 2004 legislation, the 2008 platform, the 2014 hackathon, the 2017 agreement, the 2026 ongoing maintenance.

Twenty-two years, and an invisible money flow became traceable.

🧬

---

## Further Reading

- [Open Source Community and g0v](/en/technology/open-source-and-g0v) — How the civic hacker community operates and why Taiwan has this ecosystem
- [Politics Hub](/politics) — A panoramic view of democratic infrastructure
- [2026 Nine-in-One Elections](/politics/2026 九合一選舉) — Institutional framework and timeline of the 2026 elections
- [CEC System](/en/politics/central-election-commission) — Design and operation of the Central Election Commission
- [What Are the Nine-in-One Elections](/en/politics/nine-in-one-elections-explained) — Nine positions, nine histories

---

## References

[^1]: [Control Yuan Political Donation Public Search Platform](https://ardata.cy.gov.tw/) — The official Control Yuan portal for political donation data searches, providing historical filing data for candidates / political parties / political groups.

[^2]: [Legislative History of the Political Donations Act](https://lis.ly.gov.tw/lglawc/lawsingle?00396B05E12200000000000000014000000004000000^03083093032600^00133001001) — Legislative Yuan Legal Data Integrated Search System, third reading passed March 26, 2004. [NEEDS-VERIFY link]

[^3]: [Full Text of the Political Donations Act](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Ministry of Justice National Laws and Regulations Database.

[^4]: [Political Donations Act Article 7](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Official source for Political Donations Act Article 7.

[^5]: [Political Donations Act Article 18](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Political donation amount limits. Specific figures subject to the latest version in the regulations database.

[^6]: [Political Donations Act Articles 26–31](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Official source for Political Donations Act Articles 26–31.

[^7]: [Control Yuan Political Donation Platform Inauguration History](https://ardata.cy.gov.tw/) — The platform's about page records major adjustments over time. [NEEDS-VERIFY specific launch year]

[^8]: [FEC: Federal Election Commission](https://www.fec.gov/) — Official website of the US Federal Election Commission, providing complete candidate finance APIs.

[^9]: [Japan Political Funds Control Act](https://www.soumu.go.jp/senkyo/seiji_s/) — Japan Ministry of Internal Affairs political funds oversight page.

[^10]: [South Korea National Election Commission](https://www.nec.go.kr/) — South Korea's National Election Commission. [NEEDS-VERIFY interface friendliness assessment]

[^11]: [g0v](https://g0v.tw/) — Official website of Taiwan's civic hacker community.

[^12]: [g0v Election Money Flow Project](https://g0v-money-flow.github.io/elections/) — Political donation visualization project website.

[^13]: [g0v councilor-voter-guide](https://github.com/g0v/councilor-voter-guide) — Councilor voter guide GitHub repository.

[^14]: [g0v Election-Related Project Collection](https://g0v.tw/projects) — Open-source tools for civic oversight of political donations. Specific project names to be confirmed.

[^15]: [Control Yuan Political Donation Open Data Description](https://ardata.cy.gov.tw/) — Platform data download and open field descriptions. [NEEDS-VERIFY 2017 agreement signing date]

[^16]: [Taiwan Political Science Association Annual Conference Papers](http://www.tpsahome.org.tw/) — Academic discussions of split donations circumventing limits can be found among them. Specific cases are not cited here per the common principle of non-identification.

[^17]: [Civil Servants Election and Recall Act Article 41](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020010) — Method for calculating maximum campaign expenditure amounts.

[^18]: [Legislative Yuan Bill Integration System](https://misq.ly.gov.tw/) — Legislative reform discussions related to funding transparency issues during the 2025 Great Recall movement can be found among them; the Legislative Yuan has not yet placed them on the formal agenda.

[^19]: [Central Election Commission 2026 Nine-in-One Election Announcements](https://www.cec.gov.tw/) — Central Election Commission official website. [NEEDS-VERIFY exact position numbers subject to final CEC announcement]

---

_Last updated: 2026-05-27 — 2026 Nine-in-One Elections Politics Hub series NEW article._
_Author: Taiwan.md 🧬_
