---
title: 'AI Hardware Supply Chain: Where Taiwan Turns the Cloud into Machines'
description: 'Generative AI looks like a cloud service, but it depends on a physical road: chip design, wafer fabrication, packaging, memory, power, cooling, motherboards, racks, and delivery. Taiwan matters not only because of TSMC, but because many checkpoints along that road are concentrated here; that shared interest is real, and so are the bills for water, power, carbon, inequality, overseas manufacturing, and geopolitical risk.'
date: 2026-07-11
category: 'Technology'
tags: ['AI hardware', 'semiconductors', 'supply chain', 'AI servers', 'advanced nodes', 'advanced packaging', 'Taiwan tech industry']
subcategory: '半導體與硬體'
author: 'Taiwan.md Translation Team'
featured: false
lastVerified: 2026-07-11
lastHumanReview: false
researchReport: 'reports/research/2026-07/半導體供應鏈草稿地圖.md'
rationale:
  why_this_hook: 'Start from the "trillion-dollar dinner" seating chart so readers first see the AI hardware supply chain as a group of Taiwanese engineering nodes, not one company.'
  whats_excluded: 'Does not attempt a complete industry encyclopedia or list every Taiwanese semiconductor, server, and component company.'
  where_it_hedges: 'Places Taiwan’s supply-chain value alongside power, water, carbon, income distribution, overseas manufacturing, and geopolitical risk.'
  whos_pushing_back: 'Global customers and allies need Taiwan, but they also use overseas manufacturing to reduce single-point dependence around the Taiwan Strait.'
image: '/article-images/technology/ai-hardware-supply-chain-flow-en.svg'
imageCredit: 'Taiwan.md Contributors'
imageLicense: 'CC BY-SA 4.0'
translatedFrom: 'Technology/AI硬體供應鏈.md'
sourceCommitSha: 'a8fade725'
sourceContentHash: 'sha256:d6e2165fe911134c'
translatedAt: '2026-07-12T00:02:05+08:00'
---

# AI Hardware Supply Chain: Where Taiwan Turns the Cloud into Machines

> **30-second overview:** AI looks as if it answers questions on a screen, but behind it is a long physical relay. Someone creates the demand, someone designs the chip, someone manufactures it, someone combines chips, memory, cooling, power, and motherboards into machines, and those machines finally enter data centers. Taiwan’s importance cannot be summed up as "TSMC is strong." Several key legs of this relay are in Taiwan. That shared interest is real, but it is not a guarantee; it also brings pressure over water, power, carbon emissions, income distribution, overseas manufacturing, and geopolitics.

On May 28, 2026, Jensen Huang hosted a dinner in Taipei. Taiwanese media called it the "trillion-dollar dinner" because of the combined market value behind the companies in the room. But the most important thing about that dinner was not who sat at the head table, or how much those companies were worth.

The most important thing was the seating chart.

Wafer foundry was represented by TSMC’s C.C. Wei. AI server and rack assembly were represented by Foxconn’s Young Liu, Quanta’s Barry Lam, Wistron’s Simon Lin, and Wiwynn’s Emily Hong. IC design was represented by MediaTek’s Rick Tsai. Power and cooling were represented by Delta Electronics’ Ping Cheng, Lite-On’s Anson Chiu, and AVC’s Chun Ching-Hsing. Motherboards and end brands were represented by ASUS’s Jonney Shih, Gigabyte’s Yeh Pei-Cheng, and Acer’s Jason Chen. The categories listed by CNA, from wafer foundry, packaging and testing, cooling modules, power management, motherboards, assembly outsourcing, and brands, almost formed a cutaway diagram of an AI server.[^1]

![Jensen Huang holding an RTX Blackwell GPU during his CES 2025 keynote, with the NVIDIA logo and the next-generation AI chip module visible against a dark stage backdrop](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)

_Jensen Huang showing an RTX Blackwell GPU at CES 2025. The image pulls "AI" back from software interface to hardware in hand. Photo: Steve Jurvetson. CC BY 2.0 via Wikimedia Commons._

That was not an ordinary corporate dinner. It placed a question on the table: when the world says AI needs Taiwan, what exactly does it need?

The answer is not only one company, or one chip. It is more like a road: from the sentence "we need more AI compute," through chips, fabs, packaging, electricity, cooling, motherboards, and racks, until it reaches the data center. Taiwan stands at several gates along that road.

## First, Think of AI as a Service That Needs a Body

Most people encounter AI on a phone, computer, or website. You type a sentence, and an answer appears. It looks like magic, or like a weightless cloud service.

![Computex exhibition floor at Taipei Nangang Exhibition Center, with wide aisles, IT company booths, and crowds, showing the Taiwanese hardware supply chain as a visible trade-show scene](/article-images/technology/computex-nangang-floor-2015.webp)

_Computex at Taipei Nangang Exhibition Center. The AI hardware supply chain does not exist only in financial statements; it is also seen in trade shows, demo units, racks, and business meetings. Photo: Solomon203. CC BY-SA 4.0 via Wikimedia Commons._

But for AI to answer a question, machines have to compute in the background. Those machines sit in data centers. They consume power, produce heat, need maintenance, and require people to manufacture them, assemble them, and deliver them to customers.

Think of AI as a very large restaurant. You see the server bring food to the table, but you do not see the menu design, procurement, kitchen, gas, water, electricity, refrigeration, service flow, or cleaning. AI works the same way. You see the answer on the screen; behind it is an entire hardware kitchen.

Taiwan’s place is at many of the important workstations in that kitchen.

## How an Order Becomes a Rack

An AI hardware supply chain often begins with a very ordinary demand: a cloud company, model company, or large enterprise needs more compute. That sounds like buying a cloud service, but it quickly becomes a string of physical questions: what chip should be designed? Where can it be manufactured? How does memory get close enough to it? How is heat removed? How is power delivered? And who turns those expensive parts into a machine that can be shipped, maintained, and placed in a data center?

![AI hardware supply-chain flowchart showing AI demand moving through chip design, advanced nodes, advanced packaging, HBM and substrates, cooling and power, motherboards, ODM / EMS, AI racks, and finally data centers; the chart highlights manufacturing, packaging, electrical and thermal, board, assembly, and rack-integration checkpoints highly concentrated in Taiwan](/article-images/technology/ai-hardware-supply-chain-flow-en.svg)

_A Taiwan.md self-made diagram. This is not a market-share chart or a complete company map; it shows one core path: how AI demand becomes machines that can be powered, cooled, and shipped._

At the front end, chip design is mostly in the hands of NVIDIA, AMD, Broadcom, Google, Amazon, Microsoft, and others. One of Taiwan’s important positions appears when the design has to become a chip. TSMC’s official logic-technology roadmap lists 7nm, 5nm, 3nm, 2nm, A16, A14, and other logic processes, and marks N2 as entering volume production in the fourth quarter of 2025.[^2] For many AI chips, this is the first point where the design touches Taiwanese soil.

But making the chip does not mean AI can go online. AI chips need to sit close to memory, and different dies have to be connected into systems that can cooperate at high speed. TSMC describes 3DFabric as a technology family combining 3D silicon stacking and advanced packaging, including SoIC, CoWoS, and InFO. AP’s report on Siliconware’s new Taichung plant also placed it in the context of strengthening AI chip production.[^3][^4] Here, Taiwan’s role extends from "making the chip" to "connecting the chip into a working module."

Further downstream, the supply chain looks less and less like a straight line. HBM, or high-bandwidth memory, is mainly led by Korean companies. Equipment, materials, and design software involve suppliers from the United States, the Netherlands, Japan, and Europe. Cloud platforms and model services are mostly in the United States. Taiwan does not monopolize every segment, and it does not capture the largest profit in every segment. Its special feature is that wafer foundry, packaging, testing, substrates, power, cooling, motherboards, and system assembly are close to one another and have long been used to solving engineering problems together.

![AI server stack diagram showing chips and accelerators, boards and motherboards, power and cooling, servers and racks, and data centers stacked in sequence, explaining how a GPU becomes deployable AI infrastructure](/article-images/technology/ai-server-rack-stack-en.svg)

_A Taiwan.md self-made diagram. The GPU is only one core of an AI server; it still has to connect to boards, power, cooling, systems, racks, and data centers._

By the system stage, the questions become very concrete. The stronger the chip, the larger the current and the harder the heat is to remove. Motherboards, power, cooling, enclosures, management systems, and shipping schedules all move together. Foxconn, Quanta, Wistron, Wiwynn, Inventec, Compal, Pegatron, and others take on the work of combining chips, boards, power, cooling, and mechanical design into AI servers and racks. CNA’s report on Foxconn’s new platform shipments also placed the company’s products in the context of AI server-system showcases.[^10]

So the flowchart is not asking readers to memorize terms. It is trying to show that Taiwan’s value is not one company, nor one chip, but the ability to push a complex product from wafer and packaging to racks and data centers across a short distance and within a short time. This density is what separates Taiwan from an ordinary low-cost manufacturing base.

For general readers, this path also offers a way to read the news. The next time a company announces a new AI platform, do not only ask who designed the chip. Ask: where is it packaged? Who builds the system? Who handles power and heat? Who bears delivery schedules and maintenance? Once those questions are asked, Taiwan’s outline in the supply chain becomes clearer, more concrete, and easier to judge.

## Semiconductors Are the Entrance, Not the End

It is convenient to write Taiwan’s tech industry as "TSMC alone," but that misses too much.

Wafer fabs answer one question: can the chip be made? The AI hardware supply chain has to answer several more: can the chip connect to memory? Can it be powered, cooled, tested, repaired? Can it be assembled into a full rack, a full row, or a full data center on the customer’s schedule?

The real question is what constraint each segment solves. Leading-edge logic processes answer whether more transistors can be packed into smaller, more efficient chips. Advanced packaging answers whether compute chips, memory, and different dies can be connected closely and quickly when a single chip is no longer enough. AI servers ask something else: can these expensive parts become stable, maintainable, mass-producible, deliverable machines?

That is why cooling and power are not supporting actors. The stronger the chip, the larger the current and the harder the heat problem. If power is unstable or heat cannot be removed, even the most advanced chip must slow down, or cannot go online at all. Mature nodes do not disappear either, because an AI machine still needs many control, connectivity, power-management, and peripheral chips. Leading-edge processes are like the engine; mature processes and components are like brakes, fuel lines, dashboards, and cooling systems. Without any one of them, the car cannot run reliably.

In this larger map, remember one thing first: semiconductors are the entrance, not the end. For AI to truly go online, it still has to pass through the road that turns chips into machines.

This is also why "Taiwan has value" should not remain an abstract comfort line. It should be decomposable into a map: who makes the wafer, who packages it, who cools it, who powers it, who builds the motherboard, who assembles the system, who bears delivery, who bears water and power, and who gets cut first when the cycle turns downward.

That map also helps readers identify the language of the news. When a business leader says "Taiwan is a partner," ask whether the dependence is on process technology, packaging, ODM, power, or the reaction speed of the whole system. When a politician says "shared interests," ask which companies, cities, and workers the interests concentrate around. When an investor says "AI has a bright future," ask whether that future lands in chip design, packaging capacity, server assembly, or cooling and power components. Once abstract slogans are broken into layers, readers are less likely to be led only by emotion.

## Shared Interest Is Real, But It Is Not Magic

Taiwan’s position in the AI hardware supply chain does create shared interests.

For NVIDIA, cloud providers, and global AI companies, Taiwan is where their designs become products. For the United States, Japan, Europe, and others, Taiwan is a supply node that cannot be routed around for advanced chips and AI infrastructure. For Taiwan, being needed brings exports, investment, jobs, stock-market visibility, and international political leverage.

In AP’s 2026 report on Taiwan’s AI-driven economy, strong growth, rising exports, and NVIDIA’s expanded presence in Taiwan appear in the same story as AI-bubble fears, geopolitical risk, and income inequality.[^5] That juxtaposition matters, because it reminds readers that shared interest is not one-way protection, nor a charm that never expires.

Other countries are working to move portions of the supply chain elsewhere. TSMC’s plants in the United States, Japan, and Germany prove, on one hand, that the world needs TSMC. On the other hand, they also show that customers and governments do not want to place all their risk in Taiwan. Overseas fabs may not reproduce Taiwan’s full density in the short term, but over the long term they will change the bargaining structure.

Corporate interests are not the same as national interests. NVIDIA wants stable supply and high margins. TSMC wants technological leadership and global customers. ODMs want orders and capacity utilization. Taiwanese society wants wages, housing, energy security, environmental capacity, and safety. These interests overlap, but they also conflict.

Everyone at the table matters, but power is not evenly distributed. NVIDIA controls GPU architecture, the CUDA ecosystem, and platform timing. TSMC controls advanced processes and key packaging capacity. Cloud giants control data-center procurement. ODMs control system design, rack assembly, and mass shipment, but their margins are usually far lower than those of chip-design companies. Power, cooling, substrate, and test-interface suppliers may gain better margins when technical barriers are high, while others rise and fall with large-customer orders. This is why "shared interest" has to be unpacked: in the same supply chain, every segment may be needed, but not every segment receives the same power.

A more accurate statement is cautious: the world needs Taiwan, and that gives Taiwan an important set of cards; but those cards must be maintained through defense, diplomacy, energy, industrial governance, and social distribution.

## Overseas Manufacturing Is Not as Simple as Moving House

TSMC’s plants in the United States, Japan, and Germany are often placed into the same anxiety: if advanced manufacturing moves out, will Taiwan’s silicon shield become thinner?

That question cannot be answered with a simple yes or no.

On one hand, overseas manufacturing extends Taiwan’s capabilities. Customers and allies are willing to offer subsidies, land, and political capital precisely because TSMC and the Taiwanese supply chain are so important. These facilities put TSMC closer to customers and make the global supply chain more politically acceptable.

On the other hand, overseas manufacturing is also a risk-distribution move. The United States, Europe, and Japan do not want the most critical chips to remain permanently concentrated beside the Taiwan Strait. Taiwan is needed, so it is invested in. Taiwan is too important, so it is also distributed. Both sentences are true.

But a factory is not the same as an entire industrial cluster. Advanced processes require equipment, materials, chemicals, engineers, maintenance, yield experience, packaging capability, customer collaboration, and supplier response speed. Moving one slice of capacity and moving an entire engineering society are two very different degrees of difficulty.

So overseas manufacturing is more like stretching several nodes of Taiwan’s supply chain outward than removing Taiwan from the chain. It will gradually change the bargaining structure, and it will test how Taiwan retains core R&D, leading-edge volume production, and supply-chain density.

## Mature Nodes Belong on the Same Map

The AI boom easily draws attention to 3nm, 2nm, and CoWoS. But an AI machine does not run only on the most advanced chips.

Power-management ICs, controllers, sensors, networking chips, peripheral chips, automotive chips, and industrial-control chips often still use mature nodes. These chips do not make headlines like GPUs, but they support power conversion, signal control, equipment monitoring, and countless inconspicuous functions inside data centers.

During the pandemic-era chip shortage, automakers, appliance makers, and industrial-control production lines learned one thing: the world can be short not only of the most advanced chips, but also of ordinary-looking chips without which products cannot ship. Taiwan’s semiconductor map therefore cannot look only at the top. TSMC, UMC, Vanguard International Semiconductor, Powerchip, and a group of specialty-process, packaging, testing, and materials companies together form a thicker base.

This matters to readers. Taiwan’s value should not be understood as a nanometer-number contest. The more complex AI hardware becomes, the more advanced and mature processes need to work together, and the more systems and components have to ship together.

Mature nodes should therefore be placed back onto the same map. They are the chassis that lets AI hardware operate reliably. The most advanced GPU has to stand on a large number of ordinary chips before it becomes a machine that can actually be used, maintained, and manufactured at scale.

## The Bills of the Sacred-Mountain Cluster

Connecting the world’s AI hardware demand to Taiwan also leaves the bills in Taiwan.

The first bill is power. Advanced fabs, EUV lithography, packaging lines, AI server testing, and data centers all require stable electricity. Technology media have reported that Taiwan’s semiconductor industry has warned about pressure over green power and electricity supply; TSMC also continues to publish EUV energy-saving and water-resource management plans.[^6][^7] Efficiency improvements matter, but as long as AI demand continues to expand, aggregate pressure remains.

The second bill is water and climate vulnerability. Wafer fabrication requires large amounts of ultrapure water. WIRED’s reporting on semiconductor water use notes that a single fab may use millions of gallons of water per day, and that Taiwan’s drought exposed tensions between agricultural water use and chip production. Process capability cannot be separated from reservoirs, rainfall, reclaimed water, and regional allocation.[^8]

The third bill is carbon emissions and industrial lock-in. A study by Roussilhe and coauthors, using 16 Taiwanese electronics-component manufacturers as a sample, discusses how energy use, water use, and greenhouse-gas emissions rose with output, and warns of carbon lock-in.[^9] The sacred-mountain cluster gives Taiwan international leverage, but it also binds national energy and land use tightly to energy-intensive manufacturing.

The fourth bill is distribution. AI raises Taiwan’s stock market, exports, and tech-sector salaries, but not everyone stands on this main growth line. Traditional industries, service workers, renters, and young people outside the tech sector do not necessarily share the gains at the same time. When housing prices, electricity prices, land, and public investment are all pulled by high-tech industry, "Taiwan’s outlook is bright" does not mean "every Taiwanese person’s life improves."

This is not an argument against semiconductors or the AI supply chain. On the contrary, because they are important, the bills need to be written clearly too.

## Where Taiwan Places Itself

The AI hardware supply chain gives Taiwan more than foreign exchange and orders. It also gives Taiwan a way to understand itself.

Taiwan is not simply a small island protected by the world, nor a technological empire that can unilaterally control global AI. It is more like a highly specialized engineering hub: needed, and therefore holding leverage; depended on, and therefore bearing responsibility; concentrated, and therefore carrying risk.

The next time readers hear "Taiwan is irreplaceable," they do not have to stop at the slogan. They can picture a physical path: a model company’s demand enters chip design; chip design enters TSMC’s process; the wafer enters advanced packaging; the packaged module enters cooling, power, motherboards, and racks; finally, Taiwan’s ODM / EMS companies deliver it to the data center.

That path is concrete evidence. It turns "shared interest" from emotion into a fact that can be discussed, questioned, and maintained.

Taiwan turns the cloud into machines. What that really means is that the most abstract AI still has to pass through a very concrete island.

That is one of Taiwan’s clearest positions right now, and one that needs to be seen clearly.

## Further Reading

- [Taiwan Foreign Trade and Global Supply Chain](/economy/taiwan-foreign-trade-and-global-supply-chain) — The macro background from export orientation and triangular trade to US-China supply-chain restructuring.
- [NVIDIA in Taiwan](/technology/nvidia-in-taiwan) — How NVIDIA has lodged chip manufacturing, packaging, and server assembly deeply inside Taiwan.
- [Taiwan Semiconductor Industry](/technology/taiwan-semiconductor-industry) — The long arc from RCA technology transfer and TSMC foundry manufacturing to materials and packaging battles.
- [Computex Taipei](/technology/computex-taipei) — Why Taipei’s computer show became a pilgrimage site for the global hardware supply side in the AI era.
- [Taiwan’s Electricity and Semiconductors](/technology/taiwan-electricity-and-semiconductors) — The power bill, green-power pressure, and energy security behind the AI supply chain.
- [Semiconductor Water Use and Taiwan’s Water Resources](/technology/semiconductor-water-use-and-taiwan-water-resources) — How fabs connect to reservoirs, drought, reclaimed water, and local governance.
- [AI Supply Chain Overseas Manufacturing](/technology/ai-supply-chain-overseas-manufacturing) — How Taiwan’s supply chain, from TSMC and Foxconn to Wistron and Delta, is being invited abroad.

## Image Sources

- **AI hardware supply-chain flowchart**: A Taiwan.md Contributors self-made SVG diagram, CC BY-SA 4.0, stored at `public/article-images/technology/ai-hardware-supply-chain-flow-en.svg`. The nodes are organized from this article and its references to explain how AI demand moves through chip design, advanced nodes, advanced packaging, HBM / substrates, cooling / power, motherboards, ODM / EMS, and AI racks before entering data centers. It is not a market-share chart and does not represent a complete company map.
- **AI server stack diagram**: A Taiwan.md Contributors self-made SVG diagram, CC BY-SA 4.0, stored at `public/article-images/technology/ai-server-rack-stack-en.svg`. It explains the system layers from chip to data center, and does not represent a complete company map or market share.
- **Jensen Huang showing an RTX Blackwell GPU**: [Jensen Huang holding RTX Blackwell at CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Photo: Pronoia, Wikimedia Commons, CC0. This article uses the cached version at `public/article-images/technology/jensen-huang-ces-2025-blackwell.webp`.
- **Computex Nangang exhibition floor**: [Computex Taipei at Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Photo: NVIDIA Taiwan, Wikimedia Commons, CC BY 2.0. This article uses the cached version at `public/article-images/technology/computex-nangang-floor-2015.webp`.

## References

[^1]: [CNA: Jensen Huang’s "trillion-dollar dinner" opens with C.C. Wei, Young Liu, Barry Lam, and other major figures in attendance](https://www.cna.com.tw/news/afe/202605280300.aspx) — CNA’s May 28, 2026 report on Jensen Huang’s Taipei dinner with senior Taiwanese AI supply-chain executives, listing categories such as wafer foundry, packaging and testing, cooling modules, power management, motherboards, assembly outsourcing, and brands.
[^2]: [TSMC Logic Technology](https://www.tsmc.com/english/dedicatedFoundry/technology/logic) — TSMC’s official logic-technology page, listing advanced logic processes and roadmap notes including 7nm, 5nm, 3nm, 2nm, A16, and A14.
[^3]: [TSMC Advanced Packaging Services](https://www.tsmc.com/english/dedicatedFoundry/services/advanced-packaging) — TSMC’s official advanced-packaging services page, explaining 3DFabric as an integrated front-end and back-end technology family including SoIC, CoWoS, and InFO.
[^4]: [AP: Taiwan takes a further step in production of AI chips with advanced new plant](https://apnews.com/article/1e087e92592b0b9ab7fb20442a5b8dc7) — AP’s report on Siliconware’s new Taichung plant and Jensen Huang’s attendance, providing an international view of Taiwan’s advanced packaging role in the AI chip supply chain.
[^5]: [AP: Taiwan's AI-powered economy soars in the shadow of bubble fears and China threats](https://apnews.com/article/7527bd4bf3089cbd2dab1c530ee61c3e) — AP’s 2026 report on AI demand driving Taiwan’s economic growth and exports, while also covering AI-bubble fears, geopolitical risk, and income inequality.
[^6]: [Tom's Hardware: TSMC-led semiconductor association warns of power supply pressure](https://www.tomshardware.com/tech-industry/tmsc-led-semiconductor-association-begs-taiwan-government-for-clean-green-energy-as-demand-skyrockets-fabs-are-struggling-to-keep-up-with-power-needs) — Technology-media reporting on Taiwan’s semiconductor sector warning about green power and stable electricity supply, useful as secondary background on energy constraints and RE100 pressure; formal citation should still be checked against TSIA or official sources.
[^7]: [Tom's Hardware: TSMC reduces peak power consumption of EUV tools by 44%](https://www.tomshardware.com/tech-industry/semiconductors/tsmc-reduces-peak-power-consumption-of-euv-tools-by-44-percent-company-to-save-190-million-kilowatt-hours-of-electricity-by-2030) — Reporting on TSMC’s EUV energy-saving plan and overall electricity-use scale, useful for the tension between efficiency improvements and aggregate growth; formal citation should be compared with TSMC sustainability data.
[^8]: [WIRED: Want to Win a Chip War? You’re Gonna Need a Lot of Water](https://www.wired.com/story/want-to-win-a-chip-war-youre-gonna-need-a-lot-of-water/) — WIRED’s 2023 reporting on semiconductor manufacturing’s demand for ultrapure water and water-treatment facilities, including tensions between TSMC and agricultural water use during Taiwan’s drought.
[^9]: [Roussilhe et al.: From Silicon Shield to Carbon Lock-in?](https://arxiv.org/abs/2209.12523) — A study of the environmental footprint of 16 Taiwanese electronics-component manufacturers from 2015 to 2020, discussing rising energy, water, and emissions with output growth and the risk of carbon lock-in.
[^10]: [CNA: Young Liu optimistic about NVIDIA Vera Rubin shipments in the second half](https://www.cna.com.tw/news/afe/202605290100.aspx) — CNA’s May 29, 2026 report on Foxconn chair Young Liu discussing Vera Rubin platform shipments, CPO / silicon photonics, and AI server-system showcases.
