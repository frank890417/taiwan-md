---
title: "Taiwan's Robotics Industry"
description: "The island that leads the world in semiconductors — why is it 'making up for lost time' in the robotics era? From the 2026 unveiling of NCAIR, looking back at the miracle and blind spots of Taiwan's precision machinery."
date: 2026-04-11
tags:
  [
    'robotics',
    'precision machinery',
    'semiconductors',
    'AI',
    'industrial transformation',
    'HIWIN',
    'NCAIR',
    '2026',
  ]
subcategory: 'Technology Industry'
author: 'Taiwan.md'
difficulty: 'intermediate'
readingTime: 13
featured: true
lastVerified: 2026-04-11
lastHumanReview: false
translatedFrom: 'Technology/台灣機器人產業.md'
sourceCommitSha: 'fa95d5e0'
sourceContentHash: 'sha256:1474f16951c52f9b'
translatedAt: '2026-05-01T13:19:11+08:00'
---

# Taiwan's Robotics Industry

## That Afternoon in Shalun

April 10, 2026, Shalun Smart Green Energy Science City, Tainan. President Lai Ching-te personally unveiled a new government institution: the **National Center for AI Robotics**, abbreviated NCAIR.[^1] The new institution is under the National Applied Research Laboratories (NARL), with a straightforward mission: research, test, and train robots.

On the day of the unveiling, Lai Ching-te cited a specific number in his speech: from 2026 to 2029, the government would invest **NT$20 billion** in the robotics industry.[^2] The goal is to help at least three startups take root. Priority application areas are four: high-risk occupations, medical and healthcare, food and service industries, and — NCAIR Director Su Wen-yu specifically emphasized — **home eldercare robots**.[^3]

All of this sounds quite reasonable. Taiwan is aging, family caregiving is short-staffed, and robots could theoretically fill this gap. The government allocates a budget, establishes a center, sets targets, and invites the president to unveil — a typical industrial policy opening move.

But the real question worth asking is not "will Taiwan make robots?" — it is: **why is Taiwan only doing this in 2026?**

Taiwan is the world's best place to make chips. The world's most precise 5-nanometer, 3-nanometer, and 2-nanometer production lines are all on this island. The chip sensing, computation, and motor control that robots need most — Taiwan can do all of it, and does it better than anywhere else.

Yet 80% of the joints in the world's top humanoid robots use harmonic drive gears from Japan's Harmonic Drive Systems.[^4]

> **30-second overview**: On April 10, 2026, Lai Ching-te unveiled the National Center for AI Robotics (NCAIR) in Shalun, Tainan — the turning point at which the Taiwanese government officially listed robotics as a national industrial strategy. NT$20 billion invested from 2026 to 2029, aiming to cultivate three robotics startups, focusing on home eldercare and high-risk occupation applications. The backdrop: Taiwan has world-class semiconductor and precision machinery supply chains (HIWIN, Maxon Taiwan, TBI Motion, Hiwin Group), but the humanoid robot critical component market (harmonic drive gears, planetary gears) has long been dominated by Japanese manufacturers. NCAIR is not a starting point — it is making up for lost time. An island that rose through OEM supply chains is now relearning to walk in the next stage: "system integration."

## One Company's One Sentence: "Technology You Can't Buy, You Build Yourself"

To understand the situation of Taiwan's robotics industry, starting with a company called **HIWIN** is fastest.

HIWIN's headquarters are in Taichung, specializing in "things that move" — linear guideways, ball screws, reducers, control systems. These things sound ordinary, but any industrial machine that moves needs them. Any CNC machine tool, any robotic arm inside a semiconductor factory, any drone with a drive system — almost all of them have HIWIN components inside.

Their market position: **the world's second largest linear guideway manufacturer, number one in the Italian transmission market.** In Morgan Stanley's 2025 "Global Top 100 Humanoid Robot Companies" list, four Taiwanese enterprises were selected — TSMC, Foxconn, Hota Industrial, and HIWIN.[^5] Chips, assembly, components, transmission — four representatives, each taking one slice.

HIWIN's chairman, **Cho Wen-heng**, joined the company in 1995 and took on the chairmanship in 2019. He once said a sentence that became this company's core philosophy:

> **"Technology you can't buy, you build yourself."**[^6]

This sounds inspirational, but behind it is a very practical pain point: HIWIN wants to make the six-axis robotic arm used in industrial robots, and the most critical component is the harmonic drive gear — a precision mechanism that converts the high-speed, low-torque output of a motor into the low-speed, high-torque needed by a robot arm. The main global supplier of this component is Japan's Harmonic Drive Systems (HDS), whose market share in industrial robot applications reaches 80%.[^7]

HDS is not acting badly — it simply does things so well that others cannot catch up. The elastic outer gear (flex spline) inside a harmonic drive gear must withstand hundreds of millions of reciprocal torsions without breaking, backed by decades of accumulated materials science, heat treatment craftsmanship, and precision machining. HIWIN wanted to buy HDS products to assemble into its own robots — HDS could sell to them, but would not give the latest specifications; and the price was set by HDS.

HIWIN's choice was to build its own. They developed a series called **DATORKER** ("DT"), and after years of trial and error produced a usable harmonic drive gear. Not world-class, but functional enough for their own six-axis robotic arms.[^8]

This story has one important detail: HIWIN's vertical integration rate is **95%**.[^9] That is, they make their own equipment, grind their own balls, manufacture their own raw materials, do their own testing, and do their own assembly. This vertical integration is not about saving money — vertical integration is actually more expensive than outsourcing — but because **in the precision machinery industry, every link in the supply chain can bottleneck you.** If any process is outsourced, the improvement of the next generation of products becomes subject to that supplier's timeline.

HIWIN used vertical integration plus independent R&D to purchase the freedom from being held by the throat by Japanese manufacturers. But the price of this freedom is: **they had to build every layer of the entire industrial chain themselves.**

This is a microcosm of Taiwan's robotics industry: **not lacking ability, but lacking an ecosystem.**

## Why a Semiconductor Superpower is a Remedial Student in Robotics

If you look at components alone, Taiwan's robotics upstream is actually not weak:

- **Transmission components**: HIWIN (guideways/screws/reducers), Maxon Taiwan (planetary gears), TBI Motion (linear guideways)
- **Motor control**: Delta Electronics, TECO, Shihlin Electric
- **Chips and sensing**: TSMC (AI chip foundry), Foxconn (assembly), Novatek (image processing), PixArt (3D sensing)
- **Precision casting**: Hota Industrial (reducer castings, Tesla Optimus supplier)
- **System integration**: Hiwin Group, Delta Electronics (industrial robots)

But if you ask a foreign engineer "which humanoid robot is most anticipated in 2026?" they will say Tesla Optimus, Figure AI, Boston Dynamics, or China's Unitree. They will not name any Taiwanese brand.

This is the core **paradox** of Taiwan's robotics industry: **components strong, complete machines weak.**

Why? Because Taiwan's economic development logic for half a century has been to become the mid-to-upper layer of the global supply chain. "You give me the specifications, I make it" — Taiwan is very good at this. TSMC pushed this logic to the extreme: customers tell TSMC what chip to make, TSMC makes it, without making its own CPUs, GPUs, or consumer brands.

This logic holds in semiconductors, PC OEM, phone assembly, flat panels, and servers. **But robotics is not that kind of industry.**

Robotics is an industry where **complete machine = application scenario.** You cannot win in the humanoid robot market by just making "a good reducer." You must define the use scenario (home eldercare? factory operations? restaurant service?), define the movement requirements (climbing stairs? lifting elderly people? handing over coffee?), define the interface logic (voice? gesture? touch?), and then work backward from these requirements: what sensors do I need, what kind of control algorithms, what kind of mechanical structure, what kind of battery management.

This is a classic case of "downstream defining upstream." Taiwan's OEM experience is unfamiliar with this logic — Taiwan is accustomed to "upstream supply chains driven by customer needs." To do it in reverse, the entire industrial organization, talent training, and incentive systems all need to be restructured.

This is why NCAIR exists. It is not a research center — it is an **industrial restructuring center.** The government's NT$20 billion is not just buying equipment, building labs, and recruiting researchers — it is buying time, buying error costs, buying space for Taiwan's engineers to start thinking about "what should a robot do" instead of "how do I make this component well."

## From Industrial to Home: The Next War in the Robotics Industry

Of the four application areas NCAIR is targeting, Director Su Wen-yu especially emphasized one: **home eldercare robots**.

This choice is not random. By 2025, Taiwan's population aged 65 and above had already exceeded 20%, entering a "super-aged society." This number is still deteriorating. Simultaneously, the structural shortage of foreign care workers, the gap in domestic care service personnel, and the financial pressure of the Long-Term Care 2.0 policy — every factor points to the same conclusion: **twenty years from now, Taiwan will need something to fill the human labor gap.**

If home eldercare robots can "help elderly people turn over, change diapers, chat for company, remind them to take medication on schedule, measure blood pressure, and alert when they fall," they can handle 60–70% of what a care worker handles. The remaining 30% requires human judgment and emotional connection — this is what robots cannot do in the short term. But being able to handle 60–70% of things is enough to reduce the burden on families and caregivers to the point where life can continue.

This calculation sounds straightforward, but in practice it encounters three structural problems:

**First, hardware is not cheap enough.** A decent humanoid or semi-humanoid care robot in 2026 costs approximately $30,000 to $100,000 USD (approximately NT$900,000 to NT$3 million). This is the price when quantities are small and early; even if mass-produced at 100,000 units per year, the unit price would probably not fall below NT$100,000. By comparison, one foreign care worker costs approximately NT$20,000 per month — NT$2.4 million over ten years. The "cost advantage" of robots has not truly been established.

**Second, software is not smart enough.** LLMs today can hold conversations and recognize images, but integrating these capabilities into physical actions — letting a robot know "what the elderly person wants right now," "whether this movement will hurt them," "this person's emotional state is off today, how should I respond" — is still at a very early stage of research. Physical AI (Embodied AI) is an entire generation behind pure language models.

**Third, the deployment environment is not mature enough.** Homes are chaotic. The water glass on the table can spill at any moment; slippers on the floor can trip a robot at any time; children may want to play with the robot; elderly people might talk to the robot about stories from the Japanese colonial era. Factory robots have preset environments; homes do not. The leap from "factory robot" to "home robot" cannot be completed by an engineer adjusting parameters — it is a transition from "structured environments" to "unstructured environments."

NCAIR's choice to begin with home eldercare is both pragmatic and risky. Pragmatic because Taiwan's demographic structure genuinely needs it; risky because this is the hardest piece to crack in the entire robotics industry globally — even Japan, Germany, and the United States have no clear winners yet.

## Conclusion: Making Up Twenty Years in One Course

The Executive Yuan's "AI Smart Robotics Industry Promotion Program" for 2030 has a target of **domestic production value exceeding NT$1 trillion**.[^10]

This figure is ambitious. From the starting point of 2026 to NT$1 trillion in 2030, it means **annual growth exceeding 40%.** Compared to Morgan Stanley's prediction of near $5 trillion annual revenue for the global humanoid robot market by 2050, with cumulative installed units exceeding 1 billion; or Goldman Sachs' prediction of $30–38 billion in market scale by 2035 — Taiwan getting NT$1 trillion in share of this race is not impossible, but also not something that happens automatically.

The real challenge is not in the total, but in structure.

**If Taiwan's robotics industry NT$1 trillion in 2030 comes from:**

- Selling components to foreign brands → this is an extension of the old route; Taiwan is just moving the semiconductor OEM model to robotics component OEM
- Selling complete machines to foreign markets → this is the success of the new route; Taiwan has its own brands and system integration capability
- Primarily supplying domestic demand (medical, eldercare, factories) → this is the success of import substitution; Taiwan turns external dependence into internal autonomy

The policy implications of the three paths are completely different. The first path is easiest but has the lowest ceiling; the second path is hardest but has the highest potential return; the third path is most pragmatic but cannot be exported.

NCAIR's NT$20 billion and Lai Ching-te's vision of a "technology island" are betting on: **can Taiwan, in the next twenty years, upgrade from "mid-to-upper supply chain" to "system integrator"?**

This upgrade is not a technology problem — it is an organizational problem, a cultural problem, an education problem, a capital allocation problem. What Taiwan does best is "making one thing as good as it can be"; what Taiwan is least accustomed to is "deciding what thing to make." The robotics industry demands precisely the latter.

Will there be NT$1 trillion in 2030? Perhaps. But the more important question is: of that NT$1 trillion, how much comes from "we finally decided what we want to make," and how much from "we did an even better job filling another country's orders"?

The difference between those two answers is Taiwan's robotics industry's real report card.

---

**Further Reading**:

- [AI Artificial Intelligence Industry](/technology/ai人工智慧產業) — An overview of Taiwan's five AI articles; robotics is physical AI, but "intelligence" and "body" remain two parallel tracks in Taiwan's industry
- [Semiconductor Industry](/technology/半導體產業) — The entire chip foundation for robotics, and why "strong chips does not equal strong robots"
- [Taiwan's Drone Industry](/technology/台灣無人機產業) — Another case of "strong components, weak complete machines" that can be compared with the robotics industry
- [Taiwan's Declining Birthrate Crisis](/society/台灣少子化危機) — Why NCAIR places "home eldercare" in the top priority? The answer is in demographic structure
- [Taiwan's Industrial Transformation and Upgrading](/economy/台灣產業轉型升級) — From OEM to brand, from components to system integration — a structural challenge that has been discussed for the past twenty years without resolution
- [Taiwan's Machine Tool Industry](/economy/台灣機械工具產業) — The 1,500 precision machinery companies in the Taichung "Golden Valley" are the upstream foundation of robotics hardware

## References

[^1]: [Lai inaugurates National Center for AI Robotics in Tainan - Taipei Times](https://www.taipeitimes.com/News/taiwan/archives/2026/04/11/2003855415) — Taipei Times English report recording the complete process of President Lai Ching-te personally attending the unveiling of the National Center for AI Robotics (NCAIR) at Shalun Smart Green Energy Science City in Tainan on April 10, 2026, including location information and official roles.

[^2]: [President Lai inaugurates National Center for AI Robotics in Tainan - Focus Taiwan](https://focustaiwan.tw/sci-tech/202604100020) — Focus Taiwan (Central News Agency English service) records the specific investment figure Lai Ching-te announced at the unveiling (NT$20 billion from 2026 to 2029, approximately US$629 million) and the "technology island" vision statement.

[^3]: [Lai inaugurates National Center for AI Robotics in Tainan - Taipei Times](https://www.taipeitimes.com/News/taiwan/archives/2026/04/11/2003855415) — Taipei Times cites NCAIR Director Su Wen-yu's definition of the center's priority directions, emphasizing that home eldercare robots are the main research focus of NCAIR, and the specific plan for four priority application areas.

[^4]: [Reducers Play Key Role in Humanoid Robots — Global Giants Position Themselves, Taiwanese Companies Fight for Opportunities - Commercial Times](https://www.ctee.com.tw/news/20241130700314-430502) — Commercial Times industry in-depth report summarizing the supply landscape of the global harmonic drive gear market, recording the fact that Japan's Harmonic Drive Systems (HDS) holds an 80% market share in industrial robot applications, and the source of its technical barriers.

[^5]: [Selected for Global "Top 100 Humanoid Robot Companies"! HIWIN's Winning Formula - Manager Today](https://www.managertoday.com.tw/articles/view/71579) — Manager Today's 2025 complete company profile of HIWIN, including background data on the four Taiwanese enterprises selected for Morgan Stanley's "Humanoid 100" list (TSMC, Foxconn, Hota Industrial, HIWIN).

[^6]: [Selected for Global "Top 100 Humanoid Robot Companies"! HIWIN's Winning Formula - Manager Today](https://www.managertoday.com.tw/articles/view/71579) — Manager Today records HIWIN Chairman Cho Wen-heng's verbatim management philosophy "Technology you can't buy, you build yourself," and his complete background of joining the company in 1995 and taking over as chairman in 2019.

[^7]: [Reducers Play Key Role in Humanoid Robots — Global Giants Position Themselves, Taiwanese Companies Fight for Opportunities - Commercial Times](https://www.ctee.com.tw/news/20241130700314-430502) — Commercial Times records the structure of the global harmonic drive gear market: Harmonic Drive Systems and related companies account for approximately 70% of the global market share, reaching 80% in industrial robot applications; while planetary gears are dominated by Japanese and German manufacturers.

[^8]: [AI Robots | Global Ball Screw Giant HIWIN — Can It Capture Humanoid Robot Business Opportunities? - U-Analysis](https://uanalyze.com.tw/articles/9860012116) — U-Analysis in-depth financial commentary recording the development background of HIWIN's DATORKER (DT) series harmonic drive gears and HIWIN's strategic choice of "self-developed to break Japanese monopoly."

[^9]: [Selected for Global "Top 100 Humanoid Robot Companies"! HIWIN's Winning Formula - Manager Today](https://www.managertoday.com.tw/articles/view/71579) — Manager Today reveals HIWIN's 95% vertical integration rate and operational figures showing 3–4x production efficiency improvement through self-manufactured equipment, explaining why they chose independent R&D over outsourcing.

[^10]: ["AI Robot Grand Alliance" Launches! Aiming for NT$1 Trillion in Exports by 2030, Is Taiwan's Precision Machinery Industry Rewriting Its Transformation Script? - Global Views](https://www.gvm.com.tw/article/123262) — Global Views magazine report on the Executive Yuan's "AI Smart Robotics Industry Promotion Program" launched in 2025, recording the policy target of NT$1 trillion production value in 2030 and the transformation direction of the precision machinery industry.
