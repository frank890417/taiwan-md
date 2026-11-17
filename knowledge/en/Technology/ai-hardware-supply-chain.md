---
title: 'AI Hardware Supply Chain: How Taiwan Turns the Cloud into Machines'
description: "Generative AI may look like a cloud service, but it requires a massive physical pipeline: chip design, wafer fabrication, packaging, memory, power, cooling, motherboards, and server racks. Taiwan's importance lies not just in TSMC, but in its concentration of critical nodes across this entire chain—a shared interest that brings tangible pressures regarding water, electricity, carbon emissions, income distribution, overseas expansion, and geopolitical risk."
date: 2026-07-11
category: 'Technology'
tags:
  [
    'AI Hardware',
    'Semiconductors',
    'Supply Chain',
    'AI Servers',
    'Advanced Process',
    'Advanced Packaging',
    'Taiwan Tech Industry',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-07-11
lastHumanReview: false
researchReport: 'reports/research/2026-07/半導體供應鏈草稿地圖.md'
rationale:
  why_this_hook: '從「兆元宴」座位表切入，讓讀者先看見 AI 硬體供應鏈不是單一公司，而是一整組台灣工程節點。'
  whats_excluded: '不做完整產業百科，也不逐一列出台灣所有半導體、伺服器與零組件公司。'
  where_it_hedges: '把台灣的供應鏈價值與水電、碳排、所得分配、海外設廠、地緣政治風險一起處理。'
  whos_pushing_back: '全球客戶與盟友一方面需要台灣，另一方面也透過海外設廠降低對台灣海峽周邊產能的單點依賴。'
image: '/article-images/technology/ai-hardware-supply-chain-flow.svg'
imageCredit: 'Taiwan.md Contributors'
imageLicense: 'CC BY-SA 4.0'
translatedFrom: 'Technology/AI硬體供應鏈.md'
sourceCommitSha: '1ec0df23b'
sourceContentHash: 'sha256:de7f4ddf0c4e6168'
sourceBodyHash: 'sha256:fb0ee951dd4978bf'
translatedAt: '2026-11-02T05:44:46+08:00'
---

# AI Hardware Supply Chain: How Taiwan Turns the Cloud into Machines

> **30-Second Overview:** AI may look like it is simply answering questions on a screen, but behind it lies a long physical relay race. Someone identifies the demand, someone designs the chip, someone manufactures the chip, and others assemble the chips, memory, cooling, power, and motherboards into machines that are finally delivered to data centers. Taiwan's importance cannot be summarized by "TSMC is strong" alone; several critical legs of this relay take place in Taiwan. This shared interest is real, but it is not a guarantee; it simultaneously brings pressures regarding water, electricity, carbon emissions, income distribution, overseas manufacturing, and geopolitics.

On May 28, 2026, Jensen Huang hosted a dinner in Taipei. The media called it the "Trillion-Dollar Banquet" because of the staggering combined market capitalization of the attendees' companies. But what was most worth watching at that table was not who sat in the seat of honor, nor how much those companies were worth in total.

What was truly worth watching was the seating chart.

For wafer fabrication, there was TSMC's C.C. Wei; for AI server and rack assembly, there were Foxconn's Young Liu, Quanta's Jason Lin, Wistron's Jason Lin, and Wiwynn's Lisa Chang; for IC design, there was MediaTek's Kai-Heng Tsai; for power and cooling, there were Delta Electronics' Cheng Ping, Lite-On's Chiu Sen-pin, and Auras Technology's Shen Ching-hsing; for motherboards and terminal brands, there were ASUS's Shih Chung-tang, Gigabyte's Yeh Pei-cheng, and Acer's Chen Chun-sheng. The supply chain categories listed in the CNA report—from wafer fabrication, packaging and testing, thermal modules, power management, and motherboards to assembly, ODM/EMS, and branding—are almost a cross-section of an AI server once it is disassembled. [^1]

![Jensen Huang holding an RTX Blackwell GPU during his 2025 CES keynote; the NVIDIA logo and the next-generation AI chip module are visible against a black stage background](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)

_Jensen Huang demonstrates the RTX Blackwell GPU during his CES 2025 keynote. This image pulls "AI" back from software interfaces to the hardware in hand. Photo: Steve Jurvetson. CC BY 2.0 via Wikimedia Commons._

This was no ordinary corporate dinner. It was as if a question had been placed on the table: When the world says AI needs Taiwan, what exactly does it need?

The answer is not just one company, nor is it just one chip. It is more like a road: starting from the phrase "we need more AI computing power," traveling through chips, factories, packaging, electricity, cooling, motherboards, and racks, finally arriving at the data center. Taiwan stands at several checkpoints along this path.

## First, Think of AI as a Service That Needs a Body

Most people encounter AI on phones, computers, or web pages. You type a prompt, and an answer appears. It looks like magic, or perhaps a weightless cloud service.

![The Computex exhibition floor at the Taipei Nangang Exhibition Center, with wide aisles lined with information vendor booths and crowds of people, illustrating how Taiwan's hardware supply chain is visible during trade shows](/article-images/technology/computex-nangang-floor-2015.webp)

_Computex exhibition floor at the Taipei Nangang Exhibition Center. The AI hardware supply chain does not exist only in financial reports; it is tangibly seen in exhibition halls, sample machines, racks, and business meetings. Photo: Solomon203. CC BY-SA 4.0 via Wikimedia Commons._

But for AI to answer questions, there must be machines performing computations in the background. Those machines sit in data centers, consuming electricity, generating heat, requiring maintenance, and needing to be manufactured, assembled, and delivered to customers.

You can think of AI like a large restaurant: you see the waiter bringing food to the table, but you do not see the menu design, procurement, kitchen, gas, water, electricity, refrigeration, plating flow, or cleaning happening behind the scenes. AI is the same. You see the answer on the screen, but behind it is an entire hardware kitchen.

Taiwan's position is at many of the important workstations in this kitchen.

## How One Order Becomes a Server Rack

An AI hardware supply chain often begins with a very simple demand: cloud companies, model companies, or large enterprises need more computing power. This sounds like buying a cloud service, but it quickly turns into a series of physical problems: What kind of chip needs to be designed? Where can it be made? How does memory get close to it? How is heat dissipated? How is power delivered? Finally, who assembles these expensive components into machines that can be delivered, maintained, and placed in data centers?

![AI hardware supply chain flowchart: AI demand passes through chip design, advanced process, advanced packaging, HBM and substrates, thermal and power, motherboards, ODM/EMS, and AI racks, finally entering the data center; the diagram highlights engineering checkpoints highly concentrated in Taiwan, such as process, packaging, electricity and heat, boards, assembly, and racks](/article-images/technology/ai-hardware-supply-chain-flow.svg)

_Self-made diagram by Taiwan.md. This is not a market share chart or a complete company map; it illustrates a core path: how AI demand becomes powered, cooled, and shippable machines._

The front end of chip design is mostly held by companies like NVIDIA, AMD, Broadcom, Google, Amazon, and Microsoft. One of Taiwan's critical positions is when those blueprints are turned into actual chips. TSMC's official technology roadmap lists 7nm, 5nm, 3nm, 2nm, A16, and A14 logic processes, with N2 slated for mass production in the fourth quarter of 2025. [^2] For many AI chips, this step is where design first touches Taiwanese soil.

But making a chip does not mean AI can go online: AI chips need to be close to memory, and different dies must be connected into systems that can cooperate at high speeds. TSMC describes _3DFabric_ as a combination of 3D silicon stacking and advanced packaging technologies, including SoIC, CoWoS, and InFO. When AP reported on Siltek's (矽品) new factory in Taichung, it also placed this within the context of strengthening AI chip production. [^3][^4] Here, Taiwan's role expands from "making the chip" to "connecting chips into working modules."

Moving further out, the supply chain becomes less linear. High-bandwidth memory (HBM) is primarily dominated by South Korean companies. Equipment, materials, and design software involve suppliers from the US, Netherlands, Japan, and Europe. Cloud platforms and model services are mostly in US hands. Taiwan does not monopolize every segment, nor does it take the largest profit from every part. Its uniqueness lies in the fact that key nodes—wafer fabrication, packaging, testing, substrates, power, cooling, motherboards, and full-system assembly—are very close to one another, having long been accustomed to solving engineering problems together.

![AI server layering diagram: chips and accelerators, boards and motherboards, power and cooling, servers and racks, and data centers stacked in order, illustrating how a GPU becomes operational AI infrastructure](/article-images/technology/ai-server-rack-stack.svg)

_Self-made diagram by Taiwan.md. The GPU is only one core of an AI server; it must be connected to boards, power, cooling, the full machine, racks, and the data center._

By the time we reach the full-machine stage, the problems become very concrete. The more powerful the chip, the higher the current, and the harder the heat is to dissipate. Motherboards, power, cooling, chassis, management systems, and shipping schedules all move in tandem. Companies like Foxconn, Quanta, Wistron, Wiwynn, Inventec, Compal, and Pegatron handle the work of assembling chips, boards, power, cooling, and mechanical design into AI servers and racks. When CNA reported on Foxconn's new platform shipments, it also placed this in the context of AI server system demonstrations. [^10]

Therefore, what that flowchart wants you to see is this: Taiwan's value lies not just in a single company or a single chip, but in the ability to push complex products from wafers and packaging all the way to racks and data centers within very short distances and timeframes. This density is what distinguishes Taiwan from typical low-cost manufacturing bases.

For the general reader, this path also provides a way to read the news. Next time you see a company announce a new AI platform, don't just ask who designed the chip; ask: Where is the packaging done? Who builds the full machine? Who handles the power and heat? Who manages delivery and maintenance? Once these questions are asked, the silhouette of Taiwan's role in the supply chain becomes clearer, more concrete, and easier to judge.

## Semiconductors are the Entrance, Not the Destination

It is convenient to describe Taiwan's tech industry as "just TSMC," but that misses a lot.

A wafer fab answers: "Can the chip be made?" The AI hardware supply chain must also answer several other questions: Can the chip be connected to memory? Can it be powered, cooled, tested, and maintained? Can an entire rack, row, or data center be assembled within the customer's required timeframe?

The real question is what constraints each segment is solving. The cutting edge of logic processes solves "can we fit more transistors into a smaller, more power-efficient chip." Advanced packaging solves "when a single chip isn't enough, can we connect computing chips, memory, and different dies close together and at high speeds." AI servers ask something else: Can these expensive components be turned into a stable, maintainable, mass-producible, and deliverable machine?

Thus, cooling and power are not supporting actors. The more powerful the chip, the higher the current and the harder the heat management. If the power is unstable or the heat cannot be dissipated, even the most advanced chip will have to throttle its speed or may not work at all. Mature processes have not disappeared because an AI machine still requires many chips for control, connectivity, power management, and peripherals. Cutting-edge processes are like the engine; mature processes and components are like the brakes, fuel lines, dashboard, and cooling system. Without any one part, the car cannot run reliably.

In this big picture, just grasp one thing: semiconductors are the entrance, not the destination. For AI to truly go online, it must travel through a long road that turns chips into machines.

This is also why "Taiwan's value" should not be just an abstract consolation. It should be decomposable into a map: who makes wafers, who does packaging, who does cooling, who does power, who does motherboards, who builds the full machine, who handles delivery, who bears the cost of water and electricity, and who is the first to face order cuts when the economy turns.

This map also helps people decipher news language: When an entrepreneur says "Taiwan is a partner," you can ask whether they rely on process, packaging, ODM, power, or the response speed of the entire system. When a politician says "shared interests," you can ask which companies, cities, and workers those interests are concentrated upon. When an investor says "the AI outlook is positive," you can follow up by asking if that outlook applies to chip design, packaging capacity, server assembly, or thermal and power components. Once abstract slogans are broken down into layers, readers are less likely to be carried away by emotion alone.

## Shared Interests are Real, But They Are Not Magic

Taiwan's position in the AI hardware supply chain does indeed create shared interests.

For NVIDIA, cloud giants, and global AI companies, Taiwan is where they turn designs into products. For countries like the US, Japan, and Europe, Taiwan is an indispensable supply node for advanced chips and AI infrastructure. For Taiwan, this relationship of being needed brings exports, investment, employment, stock market visibility, and international political leverage.

When AP reported on Taiwan's AI economy in 2026, it placed strong growth, increased exports, and NVIDIA's expanding presence in Taiwan in the same article as concerns about an AI bubble, geopolitical risks, and income inequality. [^5] This juxtaposition is important because it reminds readers: shared interests are not a one-way protection, nor are they an amulet that will never fail.

Other countries are working to move parts of the supply chain elsewhere. TSMC's expansion into the US, Japan, and Germany proves on one hand that the world needs TSMC, but it also represents customers and governments not wanting to bet all their risks on Taiwan. Overseas plants may not be able to replicate Taiwan's full density in the short term, but they will change the negotiation structure in the long run.

Moreover, corporate interests do not equal national interests. NVIDIA wants stable supply and high margins. TSMC wants technological leadership and global customers. ODM manufacturers want orders and capacity utilization. Taiwanese society wants wages, housing, energy security, environmental carrying capacity, and security guarantees. These interests will overlap, and they will conflict.

Everyone at the table is important, but power is not distributed equally. NVIDIA controls GPU architecture, the CUDA ecosystem, and platform rhythms. TSMC controls advanced processes and critical packaging capacity. Cloud giants control data center procurement. ODM manufacturers control full-machine design, rack assembly, and mass shipments, but their profit margins are usually much lower than chip design companies. For component makers in power, cooling, substrates, and testing interfaces, some can secure better profits due to high technical barriers, while others rise and fall with the orders of large customers. This is why "shared interests" must be examined in detail: within the same supply chain, every segment is needed, but not everyone necessarily shares the same power.

A more accurate statement should be cautious: The world needs Taiwan, which gives Taiwan a set of important chips. But those chips must be maintained through defense, diplomacy, energy, industrial governance, and social distribution.

## Overseas Expansion Is Not as Simple as Moving House

TSMC's factories in the US, Japan, and Germany are often viewed through a lens of shared anxiety: If advanced manufacturing is moved away, will Taiwan's "silicon shield" become thinner?

This question cannot be answered with a simple "yes" or "no."

On one hand, overseas expansion is an extension of Taiwan's capabilities: customers and allies are willing to provide subsidies, land, and political capital precisely because TSMC and the Taiwanese supply chain are so important. These plants bring TSMC closer to its customers and make the global supply chain more politically acceptable.

On the other hand, overseas expansion is a move to diversify risk. The US, Europe, and Japan do not want the most critical chips to be permanently concentrated next to the Taiwan Strait. Taiwan is needed, so it is invested in. Taiwan is too important, so it is being distributed. Both statements are true.

However, a single factory does not equal an entire industrial cluster: advanced processes require equipment, materials, chemicals, engineers, maintenance, yield experience, packaging capabilities, customer coordination, and supplier response speeds. Moving one segment of capacity is a different level of difficulty than moving an entire engineering society.

Therefore, overseas expansion is more like pulling several nodes out from the Taiwanese supply chain rather than pulling Taiwan out of the chain. It will slowly change the negotiation structure and test how Taiwan retains core R&D, cutting-edge mass production, and supply chain density.

## Mature Processes Are on the Same Map

The AI craze easily draws all attention to 3nm, 2nm, and CoWoS. But an AI machine does not run solely on the most advanced chips.

Power management ICs, controllers, sensors, networking chips, peripheral chips, automotive, and industrial control chips—many still use mature processes. These chips do not make the news like GPUs, yet they support power conversion, signal control, equipment monitoring, and many inconspicuous functions within data centers.

The global chip shortage during the pandemic taught the automotive, home appliance, and industrial sectors one thing: the world does not just lack advanced chips; it also lacks those seemingly ordinary mature nodes without which products cannot be shipped. Taiwan's semiconductor map, therefore, should not only look at the very top. TSMC, UMC, Vanguard International Semiconductor, VIS, and a host of specialty process, testing, and material companies together form a much thicker foundation.

This point is important for readers: Taiwan's value should not be understood as a race of nanometer numbers. The more complex AI hardware becomes, the more it needs advanced and mature processes to work together. It requires both full machines and components to be delivered together.

Thus, mature processes should be placed back on the same map. They are the chassis that allows AI hardware to operate stably. The most advanced GPUs must stand upon a vast array of ordinary chips to become truly usable, maintainable, and mass-producible machines.

## The Bill for the "Protectors of the Nation"

Connecting the world's AI hardware demand to Taiwan also leaves the bill in Taiwan.

The first bill is electricity: advanced wafer fabs, EUV exposure, packaging lines, AI server testing, and data centers all require stable power. Tech media have issued warnings regarding the pressure the semiconductor industry places on green energy and power supply in Taiwan. TSMC also continuously publishes plans for EUV energy saving and water resource management. [^6][^7] Improving efficiency is important, but as long as AI demand continues to expand, the total volume pressure remains.

The second bill is water and climate vulnerability. Wafer manufacturing requires massive amounts of ultrapure water. Reports by WIRED on chip manufacturing water usage point out that a single fab may use millions of gallons of water daily; during Taiwan's droughts, the tension between agricultural water use and chip production has come to the fore. Process capability cannot be decoupled from reservoirs, rainfall, recycled water, and regional distribution. [^8]

The third bill is carbon emissions and industrial path lock-in: research by Roussilhe et al., using Taiwanese electronic component manufacturers as a sample, discusses how energy, water, and greenhouse gas emissions rise with production growth, along with the risk of "carbon lock-in." [^9] The "Protectors of the Nation" bring international leverage, but they also deeply bind national energy and land use to high-energy manufacturing.

The fourth bill is distribution: AI drives up the Taiwan stock market, exports, and tech industry wages, but not everyone stands on this main growth chain. Traditional industries, service sectors, renters, and non-tech youth may not receive the dividends at the same time. When housing prices, electricity prices, land, and public investment are all driven by high-tech industries, "a positive outlook for Taiwan" does not equate to "life getting better for every Taiwanese person."

This is not to deny the importance of semiconductors and the AI supply chain. On the contrary, precisely because it is important, the bill must be written clearly.

## Where Does Taiwan Place Itself?

Beyond foreign exchange and orders, the AI hardware supply chain gives Taiwan a way to understand itself.

Taiwan is not simply a small island protected by the world, nor is it a tech empire that can unilaterally control the world's AI. It is more like a highly specialized engineering hub: needed, therefore possessing leverage; relied upon, therefore possessing responsibility; concentrated, therefore bearing risk.

The next time a reader hears "Taiwan is irreplaceable," they do not have to stop at the slogan. They can visualize a physical path in their mind: model company demand enters chip design, chip design enters TSMC's process, wafers enter advanced packaging, packaging modules enter thermal, power, motherboards, and racks, and finally, through Taiwan's ODM/EMS, they reach the data center.

This path is concrete evidence. It turns "shared interests" from an emotion into a fact that can be discussed, questioned, and defended.

Taiwan turns the cloud into machines. The true meaning of this sentence is: even the most abstract AI must ultimately pass through the most concrete island.

This is also one of the clearest positions Taiwan holds right now—and one that most needs to be seen clearly.

## Further Reading

- [Taiwan's Foreign Trade and Global Supply Chains](/en/economy/taiwan-foreign-trade-and-global-supply-chain) — The macro background from export orientation and triangular trade to the US-China supply chain restructuring.
- [NVIDIA in Taiwan](/en/technology/nvidia-in-taiwan) — How NVIDIA deeply embeds chip manufacturing, packaging, and server assembly in Taiwan.
- [Semiconductor Industry](/en/technology/taiwan-semiconductor-industry) — Long-term background from RCA technology transfer and TSMC's foundry model to the battlegrounds of materials and packaging.
- [Computex](/en/technology/computex) — Why the Taipei computer show has become a global hardware supply pilgrimage in the AI era.
- [Taiwan's Electricity and Semiconductors](/en/technology/taiwan-electricity-and-semiconductors) — The electricity bill, green energy pressure, and energy security behind the AI supply chain.
- [Semiconductor Water Usage and Taiwan's Water Resources](/en/technology/semiconductor-water-use-and-taiwan-water-resources) — How wafer fabs connect to reservoirs, droughts, recycled water, and local governance.
- [Overseas Expansion of the AI Supply Chain](/en/technology/ai-supply-chain-overseas-manufacturing) — From TSMC, Foxconn, and Wistron to Delta: how the Taiwanese supply chain is being invited out by the world.

## Image Sources

- **AI Hardware Supply Chain Flowchart**: Self-made SVG diagram by Taiwan.md Contributors, CC BY-SA 4.0, located at `public/article-images/technology/ai-hardware-supply-chain-flow.svg`. Nodes are organized based on the text and references to illustrate how AI demand enters data centers via chip design, advanced process, advanced packaging, HBM/substrates, thermal/power, motherboards, ODM/EMS, and AI racks; it is not a market share chart or a complete company map.
- **AI Server Layering Diagram**: Self-made SVG diagram by Taiwan.md Contributors, CC BY-SA 4.0, located at `public/article-images/technology/ai-server-rack-stack.svg`. Used to illustrate the system layers of an AI server from chip to data center; does not represent a complete company map or market share.
- **Jensen Huang demonstrating RTX Blackwell GPU**: [Jensen Huang holding RTX Blackwell at CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Photo: Pronoia, Wikimedia Commons, CC0. This article uses the version cached at `public/article-images/technology/jensen-huang-ces-2025-blackwell.webp`.
- **Computex Nangang Exhibition Center**: [Computex Taipei at Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Photo: NVIDIA Taiwan, Wikimedia Commons, CC BY 2.0. This article uses the version cached at `public/article-images/technology/computex-nangang-floor-2015.webp`.

## References

[^1]: [CNA: Jensen Huang's "Trillion-Dollar Banquet" arrives; big names like C.C. Wei, Young Liu, and Jason Lin attend](https://www.cna.com.tw/news/afe/202605280300.aspx) — May 28, 2026, CNA report on Jensen Huang hosting a dinner for top executives of Taiwan's AI supply chain, listing categories such as wafer fabrication, packaging/testing, thermal modules, power management, motherboards, assembly/ODM, and branding.

[^2]: [TSMC Logic Technology](https://www.tsmc.com/english/dedicatedFoundry/technology/logic) — TSMC official logic process technology page, listing advanced logic processes and technology roadmaps including 7nm, 5nm, 3nm, 2nm, A16, and A14.

[^3]: [TSMC Advanced Packaging Services](https://www.tsmc.com/english/dedicatedFoundry/services/advanced-packaging) — TSMC official advanced packaging services page, explaining how _3DFabric_ includes front-end/back-end integration technologies like SoIC, CoWoS, and InFO.

[^4]: [AP: Taiwan takes a further step in production of AI chips with advanced new plant](https://apnews.com/article/1e087e92592b0b9ab7fb20442a5b8dc7) — AP report on Siltek's new factory in Taichung and Jensen Huang's attendance, providing an international perspective on the role of Taiwan's advanced packaging in the AI chip supply chain.

[^5]: [AP: Taiwan's AI-powered economy soars in the shadow of bubble fears and China threats](https://apnews.com/article/7527bd4bf3089cbd2dab1c530ee61c3e) — AP 2026 report on how AI demand drives economic growth and exports in Taiwan, while also addressing constraints like the AI bubble, geopolitical risks, and income inequality; suitable for balanced reporting.

[^6]: [Tom's Hardware: TSMC-led semiconductor association warns of power supply pressure](https://www.tomshardware.com/tech-industry/tmsc-led-semiconductor-association-begs-taiwan-government-for-clean-green-energy-as-demand-skyrockets-fabs-are-struggling-to-keep-up-with-power-needs) — Tech media report warning about the pressure on green energy and stable power supply from Taiwan's semiconductor industry; can be used as a secondary source for energy constraints and RE100 pressures. Official citations should still refer to TSIA or official documents.

[^7]: [Tom's Hardware: TSMC reduces peak power consumption of EUV tools by 44%](https://www.tomshardware.com/tech-industry/semiconductors/tsmc-reduces-peak-power-consumption-of-euv-tools-by-44-percent-company-to-save-190-million-kilowatt-hours-of-electricity-by-2030) — Report on TSMC's EUV energy-saving plans and total electricity scale, suitable for explaining the tension between efficiency gains and total volume growth; official citations should refer to TSMC sustainability reports.

[^8]: [WIRED: Want to Win a Chip War? You’re Gonna Need a Lot of Water](https://www.wired.com/story/want-to-win-a-chip-war-youre-gonna-need-a-lot-of-water/) — WIRED 2023 report on the demand for ultrapure water and water treatment facilities in semiconductor manufacturing, mentioning the tension between TSMC and agricultural water use during Taiwan's droughts; supports the water resources section.

[^9]: [Roussilhe et al.: From Silicon Shield to Carbon Lock-in?](https://arxiv.org/abs/2209.12523) — Research on the environmental footprint of 16 Taiwanese electronic component manufacturers from 2015-2020, discussing how energy, water, and carbon emissions increase with production growth and the risk of carbon lock-in.

[^10]: [CNA: Young Liu: Optimistic about NVIDIA Vera Rubin shipments in H2](https://www.cna.com.tw/news/afe/202605290100.aspx) — May 29, 2026, CNA report on Foxconn Chairman Young Liu discussing Vera Rubin platform shipments, CPO/Silicon Photonics, and AI server system demonstrations.
