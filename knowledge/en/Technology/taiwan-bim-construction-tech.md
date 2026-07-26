---
title: 'Taiwan BIM Case Study: One Protocol vs 12 Years of Policy'
description: 'In 2014 Taiwan chose case-by-case BIM adoption. Twelve years on, a Taiwanese developer shipped REVIT_MCP_study. Policy no longer sets the pace alone.'
date: 2026-05-22
author: 'Taiwan.md'
category: 'Technology'
subcategory: '建築科技'
tags:
  [
    'Technology',
    'BIM',
    'Building Information Modeling',
    'Construction Technology',
    'Architecture',
    'Digital Transformation',
    'Revit',
    'MCP',
    'AI',
    'CTCI',
    'CECI Engineering Consultants',
    'Shuotao',
  ]
readingTime: 22
lastVerified: 2026-05-22
lastHumanReview: false
featured: true
translatedFrom: 'Technology/台灣BIM與營建科技.md'
sourceCommitSha: '31a05c44'
sourceContentHash: 'sha256:5500ed1d9d4e0f85'
sourceBodyHash: 'sha256:6207b1decb9dcfc4'
translatedAt: '2026-06-16T16:59:03Z'
image: '/article-images/technology/freecad-bim-example-2024.webp'
imageCredit: 'Maxwxyz via Wikimedia Commons'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png'
---

# Taiwan BIM and Construction Technology: Twelve Years of Government Case-by-Case Gradualism Rewritten by an Eighteen-Month Protocol

![Screenshot of the FreeCAD 1.0 open-source BIM work platform in dark theme, with a 3D model of a demonstration building at center, discipline layers such as structure, MEP, and envelope listed in the left panel, and BIM workbench commands in the bottom toolbar, reflecting BIM’s essential role in systematizing building information as part of engineering digital transformation](/article-images/technology/freecad-bim-example-2024.webp)
_FreeCAD 1.0 Dark Theme BIM workbench demonstration file. Photo: Maxwxyz, 2024-10-07. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png)._

> **30-Second Overview:** On May 23, 2014, the Public Construction Commission of the Executive Yuan launched the “Platform for Promoting BIM in Public Works”[^1], adopting the principle of “case-by-case application and gradual progress” across three phases. It still has not made BIM mandatory[^2]. During the same period, National Taiwan University’s BIM Research Center opened its first course, the Taiwan Building Information Modeling Association was formally established[^3], New Taipei City issued the first building permit reviewed through a BIM model, Taipei City’s Department of Urban Development announced its as-built model operating guidelines[^4], and BSI signed an MOU with the Taiwan BIM Task Group[^5]. Eleven years and seven months later, on December 10, 2025, a developer named CHIANG SHUOTAO pushed a repository called `REVIT_MCP_study` to GitHub, where it drew seventy-three stars and eighty-five forks[^6]. Four months after that, in April 2026, Autodesk announced that Revit 2027 would include a built-in Model Context Protocol server[^7]. Between the government’s unmoved twelve years and Anthropic’s eighteen-month protocol lies the slow occupational redefinition of Taiwan’s construction industry, from drafting to systems integration.

---

## The Public Construction Commission’s “Case-by-Case Application”

On May 23, 2014, the Public Construction Commission of the Executive Yuan built something called the “Platform for Promoting Building Information Modeling (BIM) in Public Works”[^1]. The eight-character policy announced that day was: “**case-by-case application and gradual progress**.”

Those eight characters would be cited for many years afterward.

The PCC divided its promotion strategy into three phases: Phase 1 (2014, ROC year 103), “encouragement and pilot project selection,” bringing in sponsoring agencies for non-building works to conduct pilot cases, with turnkey most-advantageous-tender projects prioritized; Phase 2 (2015-2016), “pilot implementation and evaluation”; and Phase 3, “**from 2017 onward, promote the use of BIM technology in public works above a certain contract value**”[^1].

But that “certain contract value” threshold had still not become a comprehensive mandate by 2026. The wording the PCC repeatedly emphasized was: “**engineering sponsoring agencies may independently assess whether to adopt BIM technology for relatively complex or larger-scale projects, according to project-specific needs and the agency’s contract management capacity; this is not a comprehensive or mandatory requirement**”[^2].

The comparison case is Hong Kong. Hong Kong’s Development Bureau has long required the use of BIM for works projects with estimated costs above HK$30 million[^8]. On Taiwan’s side, the three verbs “encourage,” “pilot,” and “independently assess” take turns appearing in every white paper.

Publicly available information as of the search date shows that the PCC BIM platform has cumulatively had “more than 60 engineering procurement agencies use BIM technology, with more than 120 tendered projects applying it”[^2]. Set against Taiwan’s more than ten thousand public works cases each year, that figure does not even count as a rounding error.

> **📝 Curator’s Note**
> The common account says, “The government could not push BIM because industry could not keep up.” That explanation is narratively convenient, but it reverses cause and effect. **The real sequence is closer to this: from 2014 onward, the government decided not to mandate BIM because a mandate would have broken the rice bowls of half the architecture firms.** Case-by-case application is a political calculation: leave the choice to the small number of agencies with “contract management capacity,” while everyone else continues using AutoCAD, with nobody disturbing anybody else.

---

## The Ministry of the Interior, Taipei, and New Taipei: Three Unsynchronized Axes

The Public Construction Commission pushed its agenda; the Architecture and Building Research Institute under the Ministry of the Interior pushed its own.

ABRI began the four-year mid-term “**Building Information Integration, Sharing, Application, R&D, and Promotion Program**” in 2015 (ROC year 104), then connected it in 2019 (ROC year 108) to a second four-year program[^9]. The two major goals of the second phase were written in large terms: “**digital upgrading of building technology**” plus “**digital built living environment**,” with the latter aiming to integrate BIM with GIS and IoT for digital cities[^10].

But ABRI is not the executive authority for building administration. Building administration sits with city and county governments.

In 2014, **the New Taipei City Government issued the first building permit approved through BIM model review**[^11]. That same year, New Taipei City announced the “**New Taipei City Public Building BIM As-Built Model Information Delivery Guidelines**.” By 2026, the city government’s “Building Permit Computer-Aided Review System” (bim.ntpc.gov.tw) had accumulated more than 20 completed BIM models[^11].

Four years later, on November 6, 2018, **the Taipei City Government Department of Urban Development announced the “Taipei City Government Department of Urban Development Building Works Building Information Modeling (BIM) As-Built Model Attribute Data Operating Guidelines”**[^4]. Taipei’s guidelines referenced the international COBie (Construction Operations Building Information Exchange) format and incorporated relevant 2015 ABRI and United Kingdom specifications[^4]. The guidelines require that when different BIM modeling software is used, project teams must export and submit **IFC** (Industry Foundation Classes, an open international standard developed by buildingSMART International, ISO 16739-1:2024) and COBie standard data[^4][^12].

> **💡 Did You Know**
> IFC is an open international standard created by a nonprofit organization called buildingSMART International[^12], unrelated to Autodesk or any single vendor. Its logic is similar to PDF: it lets models produced in different software packages (Revit, ArchiCAD, Tekla, Navisworks) be exchanged without friction. **Since 2010, the Danish government has required public construction projects to use the IFC format; Norway, Finland, and Singapore have followed**[^12]. Taiwan did not write IFC into a specification until 2018, and only at the local-government level through Taipei City. The international standard had already been moving for a decade; Taiwan was slowly catching up.

The timelines of the central government, Taipei City, and New Taipei City were all unsynchronized. For the same metro station, the design phase might use the Taipei Department of Rapid Transit Systems’ BIM requirements (written into a turnkey contract), the building permit phase might use Taipei’s Department of Urban Development as-built model operating guidelines (in COBie format), and the operations and maintenance phase might fall into yet another facility management tool.

“**Most current public-sector BIM applications remain in the design and construction stages; application also differs between traditional and turnkey works, while subsequent operations management still uses traditional methods**”[^13] — that is what ABRI wrote in its own results report.

---

## Wanda Line, Miaoli Station, Taoyuan Airport T3: BIM Appears in Public Works

In 2011, **the Taipei Metro Wanda Line became the first project to incorporate BIM into an engineering design contract**[^14].

This is a frequently cited “first” in Taiwan’s BIM promotion. Under contract requirements, each Wanda Line section used BIM for metro station design, introducing architecture, structure, and MEP disciplines into cross-disciplinary integration, thereby **reducing design interface conflicts**[^14].

Following the Wanda Line, one public works project after another came in: Taipei Metro Circular Line Y19 elevated station, multiple sports centers in New Taipei, Taiwan High Speed Rail’s new Miaoli Station, Taoyuan International Airport Terminal 3, Kaohsiung Circular Light Rail. Each case has a case study written up in ABRI, NTU BIM, or metro bureau internal journals.

The most frequently cited “**numeric victory**” is Taiwan High Speed Rail’s Miaoli Station: BIM was introduced three months before construction began; the supervision team found multiple conflicts through the 3D model; **20% of subsequent design change costs were saved, and site layout work began two months ahead of schedule**[^15].

Taoyuan Airport Terminal 3 is another case at a different scale. In March 2021, **a team formed by Samsung C&T and RSEA Engineering won the T3 main terminal civil works contract for NT$44.5 billion**[^16]. The overall T3 design was led by CECI Engineering Consultants (together with Rogers Stirk Harbour + Partners and Ove Arup and Partners Hong Kong), and cross-border collaboration had to rely on BIM models flowing between different firms. This is the flagship case CECI repeatedly uses in internal training materials[^17].

> **✦** The moment the Wanda Line wrote BIM into a contract for the first time in 2011 was a quiet watershed in the history of Taiwan’s public works. From that day on, no major public work in Taiwan’s metros, airports, high-speed rail, or light rail could avoid asking: “How will BIM be done?”

But these are “indicator cases.” All indicator cases in Taiwan share one flaw: **they are few in number**.

---

## Five Major Engineering Consultants and Two Major Organizations: The People Behind It

The people who pushed BIM into public works have names and faces.

**CECI Engineering Consultants, Inc., Taiwan**: established in 2007 as an invested company of the China Engineering Consultants, Inc. foundation (CECI, founded in 1969)[^18]. **It established a BIM Integration Center ahead of others in 2010**[^19], making it one of the earliest integration centers in Taiwan’s industry. Nearly 90% of its almost 2,000 employees have backgrounds in highways, railways, harbors, airports, bridges, structures, tunnels, metros, architecture, machinery, electrical engineering and systems control, BIM, ITS, PPP, and related fields[^19].

**Sinotech Engineering Consultants**: founded in 1970, transformed into an NPO in 1994, and then invested in Sinotech Engineering Consultants, Ltd.[^20]. Sinotech later developed BIM into something called a “**Project Management Information System (PMIS)**”: based on the spirit of the ISO 19650 common data environment (CDE), it contains seven major modules to support information integration across disciplines and projects[^21].

**Evergreen Consulting Engineering, Inc. (EGC)**: founded in 1974. It handled the structural designs of Taipei 101 and Kaohsiung’s 85-story T&C Tower[^22]. **The Council on Tall Buildings and Urban Habitat (CTBUH) lists EGC as one of the world’s top ten structural consultants for supertall buildings**[^22].

On the academic side, there are two key nodes:

**National Taiwan University Civil Engineering Information Simulation and Management Research Center (NTUBIM)**: established in 2011 and directed by Professor **Hsieh Shang-hsien** of the Department of Civil Engineering. Co-founding scholar Associate Professor **Kuo Jung-chin** wrote an article in December 2011 titled “**BIM Development Impacts the Existing Architecture System**”[^23], which remains one of the landmark early texts in Taiwan’s academic discourse on BIM. NTUBIM later undertook years of commissioned projects from ABRI and the Public Construction Commission, leading Taiwan’s BIM collaboration guidelines and the Traditional Chinese translation of ISO 19650.

**Taiwan Building Information Modeling Association (TBIMA)**: its predecessor was a 2009 gathering of Taiwan BIM technology enthusiasts. Preparations began in 2011, and on **March 10, 2012**, it was formally established as a Ministry of the Interior-registered association[^3]. Its principal members came from the 2008 Autodesk Taiwan official instructor training cohort: the lineage of Taiwan’s private-sector BIM organization grew directly out of the Autodesk-certified instructor circle.

> **📝 Curator’s Note**
> At the Taiwan BIM Task Group MOU signing ceremony on October 3, 2018[^5], five parties sat at the table: BSI Taiwan, NTU NTUBIM, the Taiwan Construction Research Institute, the Taiwan Architecture & Building Center, and TBIMA. **ABRI was the “supervising body,” not a “signatory.”** That level arrangement is worth pondering. It means the government recognized that, on international BIM standards, it was better to let academia and private-sector organizations lead while the state stepped back to the second line. The following year, BSI released the **Traditional Chinese version of ISO 19650**[^24], a small act of soft sovereignty: Taiwan finally had its own official Chinese translation of the international BIM standard.

---

## Revit, ArchiCAD, Tekla: The Undercurrent of Software Hegemony

![Screenshot of Autodesk Revit 2024 showing a simple partition wall with doors and windows represented as objects in three-dimensional space, with the component properties panel on the left and synchronized plan, elevation, and section previews at lower right, reflecting the object-oriented modeling essence of BIM software](/article-images/technology/autodesk-revit-2024-bim-objects.webp)
_Autodesk Revit 2024 BIM component demonstration. Photo: DanielDefault, 2024. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Revit_2024.png)._

Walk into any Taiwan firm that has adopted BIM, and 90% of the launch screens are Revit.

“**In Taiwan, 90% of architects (with BIM design capability) use Revit Architecture**” — this is a figure written on the website of an ArchiCAD reseller[^25]. Although it is a single-source citation, it matches industry understanding: Revit is close to a monopoly in Taiwan’s architectural design field.

ArchiCAD is developed by the Hungarian company Graphisoft and runs on both Mac and Windows. It is more intuitive for design and has a gentler learning curve than Revit, but its user base in Taiwan is clearly smaller[^26]. Its agent, AcademicD, has held many demos in Taipei’s East District, and each time designers can be heard saying, “I know Revit; the firm only has Revit licenses.” That is the lock-in of scale effects.

Steel structure is another axis. **Tekla Structures (a Trimble product, formerly XSteel) is currently the mainstream software for steel structure design in Taiwan**[^27]. Tekla’s ability to handle steel is widely recognized in Taiwan’s high-rise, bridge, stadium, and factory sectors.

Infrastructure (railways, highways, tunnels) tends to lean toward Bentley Systems’ MicroStation system[^28]. CTCI, Sinotech, and CECI use MicroStation plus Bentley’s OpenRoads / OpenBridge in large EPC turnkey projects and cross-border rail projects.

Running atop these mainstream software packages are Autodesk’s own Dynamo (visual programming) and the open-source pyRevit (Python extension framework). **In early 2016, Autodesk Taiwan specially invited instructors from the Dynamo R&D team in Singapore to teach in Taiwan**[^29]. From that point on, Dynamo gained attention in Taiwan’s BIM engineer circles. A typical scene: an MEP engineer writes a Dynamo script that automatically sorts all air duct coordinates, checks clear heights, and generates section drawings — work that used to take a full day in CAD can now be completed in minutes[^30].

The stage for clash detection belongs to Autodesk Navisworks. Navisworks Manage integrates 3D navigation, clash detection, report export, 4D schedule simulation, and 5D cost estimating functions[^31]. In Taiwan metro MEP engineering, there is a specialized term: **CSD / SEM**. CSD (Combined Service Drawing) refers to integrated MEP drawings; SEM (Structure / Electric / Mechanic) refers to integrated structure and MEP drawings. The traditional approach used CAD overlays and paper checks; in the BIM era, Navisworks runs clash checks and identifies conflict points from 3D angles[^32].

“**CSD/SEM drawing integration**” is now a required service phrase on the websites of Taiwan BIM consulting firms.

---

## CTCI, Fu Tsu, Dacin, Obayashi: Who Builds Taiwan

![Street view of the Taipei Dome construction site on the morning of June 21, 2020, with the Dome’s steel shell still under construction in the distance and a Hino 300 truck passing a crosswalk on Zhongxiao East Road near Exit 5 of Sun Yat-Sen Memorial Hall MRT Station in the foreground, reflecting the more than decade-long construction reality of Taipei’s largest sports venue and Obayashi’s construction management role in this 65,000-ton round steel-pipe dome](/article-images/technology/taipei-dome-construction-cheng-2020.webp)
_Taipei Dome construction site, 2020-08-16, Zhongxiao East Road, Exit 5 of Sun Yat-Sen Memorial Hall Station. Photo: Cheng-en Cheng, 2020-08-16. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg).\_

The main force supporting Taiwan’s large-scale construction market is a group of turnkey engineering companies — firms that encountered BIM earlier than architecture offices and earlier treated it as a production tool.

First is **CTCI Corporation (stock code 9933)**. CTCI was established in 1979 through joint investment by the CTCI Foundation, China Development Industrial Bank, and Central Investment Company[^33]. This founding background is unusual: the CTCI Foundation (China Technical Consultants, Inc.) was established in 1959 as a technology transfer institution serving Taiwan’s industrial development. When the petrochemical industry flourished in the 1970s, it took on a large volume of technical consulting work from state-owned enterprises such as CPC. In 1979, CTCI spun off its engineering consulting business, and that became CTCI Corporation.

CTCI’s business is **EPC** (Engineering, Procurement, Construction, an integrated turnkey model covering engineering design, procurement, and construction): refining, petrochemicals, chemicals, power, steel, storage and transportation, transportation, incinerators, public works, and environmental engineering[^33]. As of 2021 it had 7,500 employees and had established branches and offices in 15 countries[^33][^34]. The Saudi Arabia Amine project, Saudi Kayan ethylene cracker turnkey project, and SAMAC MMA and PMMA turnkey project — strung together, these names form the Middle East footprint of Taiwan’s EPC contractors over the past 20 years[^33].

In 2011, something happened that rewrote CTCI’s shareholder structure: **Japan’s Chiyoda Corporation acquired equity in CTCI and became its largest shareholder**[^33]. Taiwan’s largest local turnkey engineering company now has a Japanese chemical engineering and construction group as its largest shareholder. Most people do not know this piece of trivia.

> **⚠️ Contested View**
> The overseas projects of large EPC companies such as CTCI are not free of controversy. In 2017, CTCI suffered major delays and bad debts on an EPC natural gas processing plant project in India, and the group admitted a “**fatal break in international risk control**”[^35]. That same year, the Kuokuang Petrochemical project had already been canceled, while health controversies affecting residents near the Sixth Naphtha Cracker in Mailiao continued to intensify; multiple petrochemical projects involving CTCI have been named in environmental narratives. BIM helped with engineering precision in these major projects, but precision does not solve the politics of land, labor, and the environment.

The private developer market has another set of names: **Fu Tsu Construction** has “accumulated the largest completed total floor area of high-tech plants, with the most domestic plant construction experience”[^36]; **Dacin Construction (2535)** is seen externally as “**TSMC’s designated construction contractor**,” having won orders for the superstructure of TSMC’s Southern Taiwan Science Park 18P3 FAB plant[^37]. Dacin’s BIM department writes in internal presentations: “**Using BIM as the foundational tool platform to carry out integration and coordination related to building project development, planning, design, and construction**”[^37] — but this accounts for only a small portion of Dacin’s contracted projects.

Two foreign firms have structural presences in Taiwan. **Taiwan Obayashi Corporation** is the Taiwan branch of Japan’s Obayashi Corporation (the company that built Tokyo Skytree), established in 1989. It built Taipei 101 throughout its full process, Taipei Metro’s Xinyi Line, Taoyuan Airport T3, and **Taipei Dome**, among other projects[^38]. **The “Company Profile” page on Taiwan Obayashi’s official website explicitly lists “construction drawing management and BIM utilization” as a major construction management item**[^38].

> **💡 Did You Know**
> Taipei Dome’s entire steel structure weighs 65,000 tons, and it is the only dome in the world built entirely with round steel pipes[^39]. The steel structure design was mostly made in Tekla Structures, then the model was imported into Navisworks and coordinated with other disciplines (MEP, fire protection) for clash detection. **Without BIM, a steel structure project on the scale of Taipei Dome would have been almost impossible to complete without major errors** — which is also why Obayashi writes BIM into the “major construction management items” list in its company profile.

---

## Labor Shortages, Aging, Migrant Workers: Why Digital Transformation Is No Longer Optional

Shift the scene to an ordinary construction-site morning: 6:30 a.m., workers arrive one after another. More than half are “grandfather-level” masters over 40.

**New Taipei City Government statistics on fatal occupational accidents show that among more than 100 death cases, over 77% involved workers older than 40**[^40]. This figure has long been common knowledge in civil engineering circles. The aging of Taiwan’s construction labor force is already a reality, not a trend still unfolding.

Low birth rates mean young people are not entering construction. Harsh site conditions, uncompetitive pay, and high injury and fatality rates — stacked together, these three factors are putting increasing pressure on construction recruitment[^40]. In 2024, the Ministry of Labor agreed to open 15,000 migrant-worker slots for the construction industry; by early 2026 those slots were “**about to be fully allocated**”[^41].

This is why digital transformation has become something the construction industry cannot avoid.

**Demand for BIM engineer positions is high; beginner salaries start at NT$35,000-45,000, and 1111 Job Bank lists 104 openings with monthly pay above NT$50,000**[^42]. But “high demand” and “usable talent” are different things — “**learning BIM does not necessarily bring significant salary growth, and most people choose more economical learning paths**”[^43]. The industry still has no consensus on where the career ceiling for BIM engineers lies.

The deeper structural issue is that BIM pulls architects from the occupational category of “**drawing**” into the new category of “**systems integrator**.” Tool upgrading is only the surface.

Architects using AutoCAD draw collections of two-dimensional lines. Plans, elevations, sections — each drawing is independent, and changing the plan while forgetting to change the elevation is routine. Engineers using Revit / BIM build an information model: behind each line are material, specification, vendor, price, construction sequence, and maintenance cycle[^44]. Change the plan, and elevations and sections synchronize automatically.

Older architects look at young BIM engineers and say, “This is for the next generation.” The real reason behind that sentence is simple: **the occupation has already become a different trade from the “architect” they entered the industry as**.

> **✦** “BIM models often become outsourced work, disconnected from actual engineering, and many BIM centers or teams have dissolved”[^45] — this is NTU’s BIM Research Center’s own observation on the current state of BIM promotion in Taiwan.

---

## A USB-C-Like Protocol: Anthropic’s Key for Connecting AI to Revit

On November 25, 2024, Anthropic open-sourced something called the **Model Context Protocol (MCP)**[^46].

The announcement described it in scientific terms: “**MCP is an open standard, open-source framework introduced by Anthropic to standardize the way artificial intelligence (AI) systems like large language models (LLMs) integrate and share data with external tools, systems, and data sources**”[^47]. Anthropic’s own explanation was plainer: “**Think of MCP like a USB-C port for AI applications**”[^46] — just as USB-C unified device connections, MCP aims to unify the protocol by which AI connects to data sources and tools.

Released alongside the MCP announcement were Python, TypeScript, C#, and Java SDKs, plus prebuilt MCP servers connecting to Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer[^46].

What happened next moved faster than anyone expected.

On December 10, 2025, a developer named **CHIANG SHUOTAO** pushed a repository called `REVIT_MCP_study` to GitHub[^48]. The repository description contained only eight English words: “LEARN HOW TO BUILD UP YOUR REVIT MCP.” Its language distribution: **C# 54.2%, JavaScript 18.7%, PowerShell 14.3%, TypeScript 7.0%, HTML 3.3%, Shell 1.2%**[^48]. By May 2026, this personal repository had accumulated **73 stars and 85 forks**[^6].

Shuotao’s GitHub profile lists his location as “Tokyo,” but the README and all tutorial documents are in Traditional Chinese, and the content heavily echoes Taiwan’s architecture and construction workflows. His surrounding repositories — `CAD_MCP_study`, `NAVISWORK_MCP`, `IFCSH` — form a personal open-source experimental series around BIM × MCP × AI[^49].

How should this case be read?

Not as “Taiwan has its own BIM_MCP” — Shuotao’s repository is part of the same ecosystem as the international `mcp-servers-for-revit/revit-mcp` and Autodesk’s own built-in Revit 2027 MCP server[^7][^50]. Its significance lies elsewhere: **less than 13 months after Anthropic announced MCP, a Taiwan developer produced an open-source teaching project with more than seventy stars, bringing international Revit MCP engineering practice back into the Chinese-language community**.

Four months later, **in April 2026, Autodesk announced that Revit 2027 would include a built-in MCP server and Autodesk Assistant**[^7]. The new Autodesk Assistant can do things like: “**find all rooms missing MEP tags**,” “**set the fire rating of all Phase 2 doors to 90 minutes**,” and “**generate all plumbing views for this floor**”[^7] — operating Revit through natural language.

Tasks that used to require one or two years of Revit learning can now be done by saying one sentence in Chinese or English.

> **📝 Curator’s Note**
> Align the timeline: from May 23, 2014, when the PCC BIM platform was launched, to November 25, 2024, when Anthropic open-sourced MCP, **10 years and 6 months elapsed**. During the 10 years Taiwan’s government promoted BIM, it moved from “encouraged pilots” to “case-by-case application” and never reached a mandate. From Anthropic open-sourcing MCP to Autodesk announcing that Revit 2027 would include built-in MCP, **only 17 months elapsed**. The speed at which a technology platform rewrites industry onboarding far exceeds the speed of policy promotion. **The real gap lies in the structure of the two promotion models**: mandatory promotion requires coordinating hundreds of stakeholders, balancing dozens of industry lobbies, and adjusting several laws; platform promotion only requires open-sourcing the SDK and writing good documentation. Seeing that structure clearly matters more than complaining about government or worshiping AI.

---

## From Drawing to Systems Integration: An Unfinished Occupational Redefinition

Pull the camera back to an architecture office in the 1990s.

Back then, offices had drafting tables, T-squares, technical pens, and blueprint machines against the walls. Architects drew floor plans on A1 sheets with technical pens. After finishing a drawing, they sent it to a blueprint machine for copies — the machine hummed, and blue paper with white lines slowly rolled out from the other end. Change one part, and the whole sheet had to be redrawn.

AutoCAD released its Classic Mac OS version in 1992 and its Microsoft Windows version in 1993[^51]. Taiwan’s architecture firms began shifting to CAD at scale in the mid-1990s. The pain of transition lasted roughly a decade — older architects resisted, younger designers embraced it, and offices split internally between those who “drew on CAD” and those who “drew at the table.”

The shift from AutoCAD to Revit was the second transition. **Autodesk did not launch Revit together with the term “Building Information Modeling” until 2002**[^52] — which means about twenty years separated the move from hand drawing to CAD and the move from CAD to BIM. But the pain of BIM transition is deeper than the pain of CAD transition, because this time the required level of change rose from tool replacement to **reorganization of the mode of thinking**.

CAD digitizes your lines. BIM requires you to systematize the information of the entire building. A wall becomes a data object such as: “partition wall in Office Area A on the second floor; material: 12 mm gypsum board on both sides plus 75 mm light-gauge steel framing; fire rating: 1 hour; vendor: XX; cost: YY; construction sequence: after MEP piping.” It is no longer just two parallel lines.

Cross-disciplinary integration changed with it. The traditional workflow was: the architect finished drawings, the structural engineer finished drawings, the MEP engineer finished drawings, and the three sets of drawings finally collided at the construction site — an air duct cutting through a beam, a drainage pipe position hitting a structural column. In the BIM workflow, overlays happen during design inside the same 3D model, and clash detection and conflict review are completed on the computer[^32].

“**Reducing design interface conflicts**” appears in the effectiveness reports of every Taiwan BIM case study[^14][^15]. But the occupational change behind those six Chinese characters is this: the power structure among architects, structural engineers, MEP engineers, and contractors is being reshuffled. **In the past, the architect was the single author in the design phase; in the BIM era, design is systems integration through multi-party collaboration**.

This occupational redefinition is not yet complete.

> **✦** “**Owners lack sufficient understanding of BIM applications and often operate through traditional engineering workflows, limiting the effectiveness of BIM technology**”[^53] — this is BSI’s bluntest observation of Taiwan’s owner side. The bottleneck preventing BIM from moving forward lies with owners; whether engineers know how to use it is secondary.

---

## What Comes Next

In May 2026, BIM’s situation in Taiwan looks like this:

- The central government has promoted it for 12 years and still applies it “case by case,” without a comprehensive mandate[^2]
- Taipei City and New Taipei City have required BIM models at the building permit level since 2014 / 2018, but city and county specifications differ from one another[^4][^11]
- Large engineering consultants (CECI, Sinotech, EGC) and large constructors (CTCI, Fu Tsu, Dacin, Obayashi) all use it, and demand for BIM engineer positions is high[^17][^19][^33][^42]
- Most small and medium-sized architecture firms still mainly use AutoCAD, and BIM penetration is estimated to remain in the single-digit percentage range[^43][^45]
- Seventeen months after Anthropic open-sourced MCP in November 2024, Autodesk announced that Revit 2027 would include a built-in MCP server[^7][^46]
- A Taiwan developer wrote a 73-star Revit MCP tutorial repository, bringing the international ecosystem back into the Chinese-language community[^6][^48]

Read these six points together, and **Taiwan BIM is the story of an occupation being redefined externally by a technology platform**, still some distance from the shape of a mature industry. Government promotion speed cannot keep up with technological iteration; private-sector adoption speed cannot keep up with population aging. Taiwan’s construction industry is being pulled simultaneously by three forces: aging traditional practitioners, labor shortages on construction sites, and a new generation of AI × BIM tools.

Over the next decade, the occupation called “architect” in Taiwan may no longer look the way it does now. The drawing part will be handed to AI — a single sentence, “**set the fire rating of all Phase 2 doors to 90 minutes**”[^7], can modify every door in the entire project. The architect’s work will be closer to that of a “**systems integrator**,” a “**translator between owner and technology**,” and a “**curator of multi-party collaboration**.”

When the Public Construction Commission’s BIM platform held its first meeting on May 23, 2014, Taiwan High Speed Rail’s Miaoli Station had not yet been built. On the day Autodesk announced in April 2026 that Revit 2027 would include built-in MCP, TSMC’s next fab in Kaohsiung was already being prepared with full BIM drawings. Twelve years of “case-by-case application” arrived somewhere it had not expected — a protocol open-sourced from Anthropic’s office in California rewrote the onboarding curve of an entire industry from the platform side, bypassing the original main road of government mandate.

On the day Shuotao pushed `REVIT_MCP_study` to GitHub in December 2025[^48], exactly 11 years and 7 months had passed since the PCC BIM platform was launched. In those twelve years, Taiwan’s architecture and construction industry traveled a long road from hand-drawn blueprints to 3D models, from individual experiments to national standards, and from tool upgrades to occupational redefinition. **That road is not finished — but the next section of it is no longer entirely in the hands of Taiwan’s government**.

---

**Further Reading**:

- [Taiwan Architecture](/art/台灣建築) — an architectural cultural narrative from slate houses to skyscrapers; this article is its sister piece on the engineering digitalization layer
- [Social Housing and Housing Justice](/society/社會住宅與居住正義) — BIM applications in social housing operations and maintenance management have been a recent focus of ABRI
- [Taiwanese Enterprise: TSMC](/economy/台灣企業：台積電) — BIM applications in TSMC fabs are a major practical field for contractors such as Dacin and Fu Tsu
- [Taiwan’s AI Development](/technology/AI發展) — Anthropic MCP and Revit 2027’s built-in MCP are a concrete case of AI × industry
- [Semiconductor Industry](/technology/半導體產業) — fab plant engineering total solutions + BIM-enabled smart factory construction are the engineering base for semiconductor cluster expansion

## Image Sources

This article uses 3 Wikimedia Commons CC-licensed images, all cached under `public/article-images/technology/` to avoid hotlinking source servers:

- [FreeCAD 1.0 Dark BIM Example](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png) — Photo: Maxwxyz, 2024-10-07, CC BY 4.0 (hero image: 3D model presentation in an open-source BIM tool)
- [Autodesk Revit 2024 object demonstration](https://commons.wikimedia.org/wiki/File:Revit_2024.png) — Photo: DanielDefault, 2024, CC BY-SA 4.0 (inline image: Revit object-based modeling screen)
- [Taipei Dome and Hino 300 BEM-5593](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg) — Photo: Cheng-en Cheng, 2020-08-16, CC BY-SA 2.0 (inline image: Taipei Dome construction site with its 65,000-ton steel structure under assembly)

The complete media licensing matrix is recorded in [`reports/research/2026-05/台灣BIM與營建科技.md`](../../reports/research/2026-05/台灣BIM與營建科技.md), §Media Licensing Matrix, Tables 3.

## References

[^1]: [Public Construction Commission, Executive Yuan, Republic of China: Building Information Modeling (BIM) in Public Works Section](https://www.pcc.gov.tw/content/index?eid=1345&type=C) — Official PCC BIM promotion platform page, recording its establishment on May 23, 2014 and the official policy documents for the three-phase promotion strategy: encouragement and pilot projects / pilot implementation / from 2017 onward, promotion in public works above a certain contract value.

[^2]: [National Audit Office Public Policy Online Participation Platform: PCC BIM Promotion Strategy Opinion Collection](https://cy.join.gov.tw/policies/detail/8e95c8d6-ce87-4e05-afce-c46a33eb6f89) — National Audit Office open discussion page recording the PCC promotion principles of “case-by-case application and gradual progress,” not a comprehensive mandate; also records official statistics that more than 60 engineering procurement agencies have used BIM and more than 120 tendered projects have applied it.

[^3]: [Taiwan Building Information Modeling Association (TBIMA) official website](https://sites.google.com/view/tbima) — Official website of the Ministry of the Interior-registered association, recording its origin in 2009 gatherings, 2011 preparation, formal establishment on March 10, 2012, and the historical context that its main members came from the 2008 Autodesk Taiwan official instructor training circle.

[^4]: [Taipei City Government Department of Urban Development: Building Works BIM As-Built Model Attribute Data Operating Guidelines v2.0](https://udd.gov.taipei/assets/50-10660/Documents/竣工模型屬性資料作業規範v2.0_20181109_new.pdf) — Official Taipei DUD guidelines announced on November 9, 2018, specifying reference to the international COBie format and the requirement to export IFC standard data.

[^5]: [BSI joins industry, government, academia, and research partners to sign “Taiwan BIM Task Group” MOU](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2018-/october/bsitaiwan-bim-task-group/) — BSI Taiwan press release from the October 3, 2018 MOU signing, recording the five signatories (BSI, NTU NTUBIM, Taiwan Construction Research Institute, Taiwan Architecture & Building Center, TBIMA) and ABRI’s supervisory role.

[^6]: [shuotao/REVIT_MCP_study GitHub repository](https://github.com/shuotao/REVIT_MCP_study) — CHIANG SHUOTAO’s personal open-source Revit MCP tutorial project, created in December 2025, accumulating 73 stars and 85 forks by May 2026, with a language distribution including C# 54.2% + JavaScript 18.7% + PowerShell 14.3%.

[^7]: [Autodesk Developer Blog: Revit API Agents, MCP, Copilot and Codex](https://blog.autodesk.io/revit-api-agents-mcp-copilot-and-codex/) — Official Autodesk developer blog announcement in April 2026, stating that Revit 2027 includes a built-in MCP server and Autodesk Assistant supporting natural-language operation of Revit models.

[^8]: [ONC Lawyers: Adoption of BIM and its legal complications for the construction industry](https://www.onc.hk/zh_HK/publication/adoption-of-bim-and-its-legal-complications-for-the-construction-industry) — Hong Kong law firm article recording the Hong Kong Development Bureau’s policy requiring BIM for works projects with estimated costs above HK$30 million, as a point of comparison.

[^9]: [Architecture and Building Research Institute, Ministry of the Interior: BIM Application Promotion Program](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=315634) — ABRI official program page recording the goals and scope of the four-year mid-term program beginning in 2015 (ROC year 104) and the second-phase program beginning in 2019 (ROC year 108).

[^10]: [ABRI: Study on the Survey and Promotion Plan for the Application of Taiwan’s Building Information Modeling (BIM) Development Results](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39612) — ABRI commissioned research report recording the two major goals of the second-phase plan, “digital upgrading of building technology” and “digital built living environment,” as well as the direction of BIM × GIS × IoT digital city integration.

[^11]: [New Taipei City Government Public Works Department: Building Permit Computer-Aided Review System](https://www.bim.ntpc.gov.tw/) — New Taipei City Government BIM building permit review system official site, recording the first BIM model building permit in 2014, more than 20 completed BIM models, and the “New Taipei City Public Building BIM As-Built Model Information Delivery Guidelines.”

[^12]: [buildingSMART International: Industry Foundation Classes (IFC)](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) — buildingSMART International official IFC standards page, recording the ISO 16739-1:2024 international standard and international adoption including Denmark’s mandatory use of IFC in public construction since 2010.

[^13]: [ABRI: Building Information Modeling BIM Application Promotion Program Results Report (2023)](https://ws.moi.gov.tw/001/Upload/404/relfile/9489/315634/0cccc6e2-2dc6-496f-a45f-69b60e2811b1.pdf) — ABRI 2023 (ROC year 112) results report, acknowledging the official diagnosis that “most public-sector BIM applications are in the design and construction stages, while operations management still uses traditional methods.”

[^14]: [New Taipei City Government Department of Rapid Transit Systems: BIM Application on the Wanda Metro Line](https://www.dorts.ntpc.gov.tw/documentary/articleInfo/P9z2zp0nZrDp?page=216) — New Taipei metro bureau engineering collection recording the Taipei Metro Wanda Line as the “first public work to include BIM in a contract” and its official record of reducing design interface conflicts.

[^15]: [Flow BIM Service: Smart Office Case Sharing](https://bim.flow.tw/smartoffice-globalshowcase/) — Flow BIM consulting case sharing citing specific figures from the Taiwan High Speed Rail Miaoli Station BIM application: “saving 20% of design change costs and starting construction two months early.”

[^16]: [Liberty Times Finance: Taoyuan Airport Terminal 3 tender awarded; Samsung C&T and RSEA Engineering team wins with NT$44.5 billion bid](https://ec.ltn.com.tw/article/breakingnews/3414669) — Liberty Times 2021 March news report recording the tender award for Taoyuan Airport T3 main terminal civil works and the concrete details of the Samsung C&T and RSEA Engineering team.

[^17]: [iThome: Construction industry realizes building digital twins through BIM, CECI case](https://www.ithome.com.tw/people/137308) — iThome 2021 in-depth report interviewing CECI chief engineer Lin Yao-tsang, recording CECI’s full life-cycle BIM cases including Fengshan Station and Bagua Mountain Tunnel, as well as the Taoyuan Airport T3 cross-border collaboration BIM workflow.

[^18]: [China Engineering Consultants, Inc. (CECI): Classic 50 Milestones](https://www.ceci.org.tw/modules/article-content.aspx?s=13&i=226) — CECI official 50th anniversary milestones, recording its 1969 establishment and 2007 investment in CECI Engineering Consultants, Inc., Taiwan.

[^19]: [CECI Engineering Consultants, Inc., Taiwan: Company Profile](https://www.104.com.tw/company/d1w3jw0) — CECI 104 job listing page recording that nearly 90% of its almost 2,000 employees have professional backgrounds in highways, railways, airports, bridges, BIM, ITS, PPP, and other fields, and that it established a BIM Integration Center ahead of others in 2010.

[^20]: [Sinotech Engineering Consultants, Inc.: Toward Sinotech Engineering’s 50th Anniversary](https://50th-anniversary.sinotech.org.tw/about_ltd.html) — Sinotech 50th anniversary website recording its 1970 establishment, 1994 transformation into an NPO, and subsequent investment in Sinotech Engineering Consultants, Ltd.

[^21]: [Autodesk University: Design and Application of Sinotech Engineering’s BIM Collaboration Platform](https://www.autodesk.com/autodesk-university/class/zhongxinggongchengBIMxietongzuoyepingtaizhishejiyuyingyong-2020) — Autodesk University 2020 technical presentation recording Sinotech Engineering’s BIM issue-tracking module based on an ISO 19650 CDE environment and the technical architecture of seven main PMIS modules.

[^22]: [Evergreen Consulting Engineering, Inc. (EGC) official website](https://www.egc.com.tw/) — EGC official website recording its 1974 founding, more than 80 professionals, structural design of Taipei 101 and Kaohsiung’s 85-story T&C Tower, and status as one of CTBUH’s global top ten structural consultants for tall buildings.

[^23]: [NTU BIM Research Center: BIM Development Impacts the Existing Architecture System (Kuo Jung-chin, 2011.12)](https://www.ntubim.net/bim2356027396/bim-201112) — A landmark early academic text from NTU NTUBIM; Associate Professor Kuo Jung-chin’s 2011 representative work in Taiwan BIM academic discourse.

[^24]: [BSI: Supporting the digitalization of construction, Taiwan BIM Task Group releases the Traditional Chinese version of the BIM international standard ISO 19650](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2019/20197/iso-19650-tw-standard-launch/) — BSI 2019 press release recording the release of the Traditional Chinese version of ISO 19650, supervision by ABRI Director Wang Jung-chin, and NTU NTUBIM’s translation assistance.

[^25]: [BIM-API: PyRevit + Dynamo Scripts](https://www.bim-api.com/en/blog/pyrevit-dynamo-scripts/) — BIM-API blog article recording the industry observation that “in Taiwan, 90% of architects (with BIM design capability) use Revit Architecture.”

[^26]: [AcademicD Graphisoft Archicad agent official website](https://www.academicd.com/) — Graphisoft Taiwan agent AcademicD’s official site, recording ArchiCAD’s sales support and training resources in Taiwan and its market positioning as a BIM software package more user-friendly than Revit.

[^27]: [BIM Explorer: Tekla Structures usage experience sharing](https://tpuaup.blogspot.com/2013/05/tekla-structures.html) — BIM blog article recording Tekla Structures as the mainstream software for steel structure design in Taiwan and the industry situation for handling complex steel structures such as stadiums, bridges, and factories.

[^28]: [Otsuka Information Technology: MicroStation Infrastructure Design](https://www.oitc.com.tw/products-detail/MicroStation/79) — Taiwan Bentley MicroStation agent website recording MicroStation’s scope of application in Taiwan’s railway, highway, tunnel, bridge, and other infrastructure engineering.

[^29]: [Taiwan Architecture & Building Center BIM+ Studio: Dynamo Architecture Basics Course](https://bimstudio.tabc.org.tw/blogs/bim%E7%9F%A5%E8%AD%98%E5%BA%AB/49627) — TABC BIM+ Studio course introduction recording the key moment in early 2016 when Autodesk Taiwan invited Dynamo R&D team instructors from Singapore to teach in Taiwan.

[^30]: [WeBIM Services: How Dynamo transforms the world of Revit](https://webim.com.tw/en/tech-en/dynamo-application-webim-3/) — WeBIM technical article recording concrete Dynamo application cases in Taiwan BIM engineer circles, including air duct coordinate sorting, clear height judgment, and automatic section drawing generation.

[^31]: [Autodesk Navisworks Product Overview](https://www.quickly.com.tw/autodesk/navisworks.php) — Autodesk Taiwan reseller Quickly official website recording Navisworks Manage’s integrated functions, including 3D navigation, clash detection, report export, 4D schedule simulation, and 5D cost estimating.

[^32]: [airitiLibrary: Development and Application of BIM-Assisted Automation for Metro CSD/SEM Design](https://www.airitilibrary.com/Article/Detail/0257554X-202107-202107290004-202107290004-77-85) — Airiti Library academic journal article recording BIM integration methodology for Taiwan metro MEP engineering CSD (Combined Service Drawing) and SEM (Structure / Electric / Mechanic).

[^33]: [CTCI Group - Wikipedia](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E9%BC%8E%E9%9B%86%E5%9C%98) — Wikipedia entry on CTCI Group recording its 1979 establishment through joint investment by CTCI Foundation, China Development Industrial Bank, and Central Investment Company; Chiyoda Corporation becoming its largest shareholder in 2011; 7,500 employees (2021); and major overseas EPC cases including Saudi Arabia Amine / Saudi Kayan / SAMAC MMA.

[^34]: [CTCI Group official website](https://www.ctci.com/www/ctci2022/page.aspx?L=CH) — CTCI official website recording turnkey engineering business, EPC model, and scope of operations across branches and offices in 15 countries.

[^35]: [Crossing: From CTCI’s major overseas bad-debt crisis, Taiwan turnkey contractors’ fatal break in “international risk control”](https://crossing.cw.com.tw/article/19832) — Crossing in-depth report recording the controversial 2017 case of major delay and bad debt in CTCI’s EPC natural gas processing plant project in India.

[^36]: [Fu Tsu Construction Co., Ltd.: High-Tech Plant Track Record](https://www.futsu.com.tw/p_hitech.html) — Fu Tsu Construction official high-tech plant page recording its official statement: “accumulated the largest completed total floor area of high-tech plants, with the most domestic plant construction experience.”

[^37]: [Dacin Construction: BIM Experience](https://www.dacin.com.tw/bim/) — Dacin Construction official BIM experience page recording the official statement: “using BIM as the foundational tool platform to carry out integration and coordination related to building project development, planning, design, and construction.”

[^38]: [Taiwan Obayashi Corporation: Company Profile](https://www.obayashi.com.tw/topic/about/preview/3250113421819124234) — Taiwan Obayashi Corporation official website recording its 1989 founding, headquarters Obayashi Corporation (builder of Tokyo Skytree), and “construction drawing management and BIM utilization” as a major construction management item.

[^39]: [Taipei Dome - Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%BA%E5%8C%97%E5%A4%A7%E5%B7%A8%E8%9B%8B) — Wikipedia entry on Taipei Dome recording its total floor area of 120,000 square meters, 65,000-ton steel structure, and status as the world’s only dome built entirely with round steel pipes.

[^40]: [United Daily News: Grandfather-level workers holding the field; construction technology faces a generational break](https://udn.com/news/story/124689/9220106) — UDN investigative report recording the aging reality of the construction industry, with workers over 40 accounting for 77% of 100+ New Taipei occupational accident deaths.

[^41]: [Liberty Times Net: Severe labor shortage across Taiwan; 15,000 migrant-worker slots for construction industry about to run out](https://estate.ltn.com.tw/article/21452) — Liberty Times finance report recording the 2024-2026 structural labor crisis in which the Ministry of Labor agreed to open 15,000 migrant-worker slots for construction and allocation was about to be completed.

[^42]: [1111 Job Bank: BIM engineer openings with monthly salary 50,000+ search results](https://www.1111.com.tw/search/job?page=1&col=ab&sort=desc&ks=bim,%E7%B9%AA%E5%9C%96&st=1&sa0=50000*) — 1111 Job Bank BIM engineer job search page recording 104 openings with monthly salary above NT$50,000 and beginner salaries of NT$35,000-45,000, showing the current pay situation for Taiwan BIM engineers.

[^43]: [Why is BIM so difficult to land in Taiwan? Four stages reveal the truth and turning point](https://engineeringlifetw.com/whynotbim/) — Engineering Life Taiwan in-depth blog analysis recording cultural resistance in Taiwan’s BIM promotion: “past government building administration was based on CAD, industry processes followed CAD, BIM models became outsourced work, and many BIM centers or teams dissolved.”

[^44]: [Verakey Engineering: What is BIM? Complete analysis of five major BIM advantages](https://veracityconsultant.com.tw/what-is-bim/) — Verakey BIM consulting company official site explaining BIM’s engineering digital transformation essence: systematizing building information including materials, specifications, vendors, prices, construction sequence, and maintenance cycles.

[^45]: [Architecture and Building Research Institute, Ministry of the Interior: BIM Application Promotion Program](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39506) — ABRI program page recording Taiwan BIM promotion’s self-diagnosis: “BIM models become outsourced work, are disconnected from actual engineering, and many BIM centers or teams have dissolved.”

[^46]: [Anthropic: Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Anthropic official announcement on November 25, 2024 open-sourcing the Model Context Protocol (MCP), describing “Think of MCP like a USB-C port for AI applications” and the release of Python / TypeScript / C# / Java SDKs.

[^47]: [Wikipedia: Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol) — English Wikipedia entry on MCP recording Anthropic’s November 25, 2024 open-source release and the complete timeline including Anthropic’s December 2025 donation of MCP to the Agentic AI Foundation under the Linux Foundation.

[^48]: [shuotao GitHub profile](https://github.com/shuotao) — CHIANG SHUOTAO’s GitHub profile page recording location Tokyo and surrounding BIM × MCP × AI open-source experimental repositories including CAD_MCP_study, NAVISWORK_MCP, and IFCSH.

[^49]: [shuotao/CAD_MCP_study GitHub repository](https://github.com/shuotao/CAD_MCP_study) — Shuotao’s CAD × MCP open-source teaching project, part of the personal BIM × MCP × AI open-source experimental series together with REVIT_MCP_study and NAVISWORK_MCP.

[^50]: [Architosh: Autodesk Revit 2027—Big New AI and Graphics Changes](https://architosh.com/2026/04/autodesk-revit-2027-big-new-ai-and-graphics-changes/) — Architosh architectural software professional media report from April 2026 detailing Autodesk Revit 2027’s built-in MCP server and Autodesk Assistant functions and architecture.

[^51]: [AutoCAD - Wikipedia](https://en.wikipedia.org/wiki/AutoCAD) — English Wikipedia entry on AutoCAD recording its initial December 1982 release for CP/M and IBM PC platforms, 1992 Classic Mac OS version, and 1993 Microsoft Windows version.

[^52]: [Building Information Modeling - Wikipedia](https://zh.wikipedia.org/zh-tw/%E5%BB%BA%E7%AF%89%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9E%8B) — Traditional Chinese Wikipedia entry on BIM recording BIM’s first proposal in 1975, research by Finnish and U.S. scholars in the 1980s, and Autodesk’s 2002 launch of the term “Building Information Modeling.”

[^53]: [BSI Taiwan: The Business Value of Building Information Modeling (BIM)](https://www.bsigroup.com/zh-TW/insights-and-media/insights/blogs/business-value-of-building-information-modelling-bim/) — BSI Taiwan official blog recording the observation on structural owner-side issues: “owners lack sufficient understanding of BIM applications and often operate through traditional engineering workflows, causing BIM technology effectiveness to be limited.”
