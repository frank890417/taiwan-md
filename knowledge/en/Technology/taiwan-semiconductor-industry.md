---
title: 'Semiconductor Industry: A 50-Year Materials Revolution from RCA Technology Transfer to GaN and Quantum Packaging'
description: 'Taiwan''s "Protector of the Nation" dominates global advanced processes through foundry services, but the next 50-year battlefield of materials science—from GaN in fast chargers and CoWoS under AI chips to dilution refrigerators above qubits—has only just begun.'
date: 2026-03-17
category: 'Technology'
tags:
  [
    'Semiconductors',
    'TSMC',
    'Taiwan Semiconductor Manufacturing Company',
    'Gallium Nitride',
    '3D Packaging',
    'CoWoS',
    'Quantum Computing',
    'Advanced Process',
    'Silicon Shield',
    'Materials Science',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-19
lastHumanReview: true
difficulty: 'intermediate'
readingTime: 22
image: '/article-images/technology/silicon-vs-gan-charger-2025.webp'
imageCredit: '4300streetcar'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg'
sporeLinks:
  [
    "{'id': 87, 'platform': 'threads', 'date': '2026-05-25', 'url': 'https://www.threads.com/@taiwandotmd/post/DYvqEURgXm-'}",
    "{'id': 88, 'platform': 'x', 'date': '2026-05-25', 'url': 'https://x.com/taiwandotmd/status/2058735515021783190'}",
  ]
translatedFrom: 'Technology/半導體產業.md'
sourceCommitSha: '1ec0df23'
sourceContentHash: 'sha256:8647f4437b5dfe36'
sourceBodyHash: 'sha256:d7402441fbb7f358'
translatedAt: '2026-08-03T15:01:44.482093+00:00'
---

# Semiconductor Industry: A 50-Year Materials Revolution from RCA Technology Transfer to GaN and Quantum Packaging

![Comparison of two 30W USB-C fast chargers with equal power; the silicon-based product on the left is significantly larger, while the Gallium Nitride (GaN) product on the right is nearly half the size, reflecting how materials science compresses energy density into the palm of your hand](/article-images/technology/silicon-vs-gan-charger-2025.webp)
_Comparison of Si vs GaN USB-C chargers at the same wattage. Photo: 4300streetcar, 2025-12-25. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg)._

> **30-Second Overview:** In the fourth quarter of 2025, TSMC will begin mass production of 2nm chips at its Kaohsiung Fab 22, leading the world by 2–3 generations[^2]. But the story is about more than transistors getting smaller: your bag contains GaN (Gallium Nitride) fast chargers, GlobalWafers produces 8-inch Silicon Carbide (SiC) wafers in Zhonglu, and NVIDIA's Blackwell GPUs rely entirely on TSMC's CoWoS packaging to reach data centers. From the 1973 technology transfer from RCA to ITRI (Industrial Technology Research Institute) for $4.5 million USD[^5], to the 20-qubit superconducting quantum chip at Academia Sinica going online in 2026[^6], Taiwan has traversed a long river of materials science—from bandgap physics to atomic layer deposition and topological qubits. The "Protector of the Nation" relies on 50 years of foundry expertise, but Taiwan has yet to secure its position in the foundry era of quantum computing.

One afternoon in 1985, Minister of State Li Kuo-ting met Morris Chang (張忠謀), who had just returned to Taiwan to serve as President of ITRI, at the Executive Yuan. Li got straight to the point: "We want to create a massive integrated circuit manufacturing company. You will lead it."

Morris Chang was stunned. He thought he had only come to be an institute president; instead, two weeks later, he was recruited to found a company with a business model no one had ever attempted.

That conversation changed the world. But looking back 40 years later, "the world" is far thicker than imagined that afternoon. It includes the 65W fast charger next to your phone that is only two finger-widths thick; it includes every Blackwell GPU being consumed by NVIDIA in data centers; and it includes the qubits in Academia Sinica's laboratories that only "wake up" when cooled near absolute zero.

## The 1987 Foundry Gamble

![Exterior of TSMC Fab 5 within the Hsinchu Science Park, a multi-story industrial building connected to Guangfu Road, representing one of TSMC's representative plants during its expansion in the 1990s](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_TSMC Fab 5 in Hsinchu Science Park, 2010. Photo: Peellden. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG)._

The story begins even earlier. In 1973, ITRI spent $4.5 million USD to purchase integrated circuit technology from the American company RCA, sending 19 engineers to the United States for training[^5]. At the time, no one imagined this "tuition fee" would become the first cornerstone of Taiwan's semiconductor kingdom. In 1980, following the technology transfer, UMC (United Microelectronics Corporation) was established, giving Taiwan its first semiconductor company. But Li Kuo-ting was not satisfied: UMC was too small, and its technology could not keep pace with international standards; Taiwan needed a bigger breakthrough.

On February 21, 1987, Morris Chang founded Taiwan Semiconductor Manufacturing Company (TSMC) in the Hsinchu Science Park, pioneering an unprecedented business model: **pure-play foundry**.

The idea sounded insane at the time. Every semiconductor company in the world was vertically integrated, handling everything from design to manufacturing. How could a company only do manufacturing and not design? Would customers hand over their most confidential blueprints to you?

Chang's logic was simple: the semiconductor industry was becoming increasingly complex, and design and manufacturing were two entirely different specialties. Rather than doing everything poorly, it was better to focus on one thing and make chip manufacturing the best in the world.

TSMC's initial equity structure was ingenious: the government invested 48.3%, private investors 24.2%, and the Dutch company Philips held 27.6%[^1]. Philips' involvement was key. At the time, the semiconductor industry was monopolized by the US and Japan, and Europe desperately needed alternative suppliers. Philips did not just invest; they also handed their chip orders to TSMC, becoming its first major customer.

The foundry model triggered a massive division of labor in the semiconductor industry: IC design companies focused on designing chips (Qualcomm, NVIDIA, MediaTek), foundries focused on manufacturing (TSMC, UMC, GlobalFoundries), and OSAT (Outsourced Semiconductor Assembly and Test) firms handled the back-end processes (ASE, Siliconware). In the past, only giants like Intel and IBM could afford the astronomical investments required for wafer fabs; now, any startup with a good idea can design a chip and hand it to TSMC for manufacturing.

The core of the foundry model is trust. Customers must believe that TSMC will not steal their designs, will not leak trade secrets, and will not compete with them. TSMC established a "Rule of Trust" based on four principles: technological neutrality (never designing its own chips), customer equality (all customers receive the same technology and service), the highest level of confidentiality agreements, and fair capacity allocation. These rules have been enforced for nearly 40 years without exception.

> 📝 **Curator's Note**: In 1987 Taiwan, the 19 engineers sent by ITRI to RCA were only in their early 40s. They were learning the silicon processes of 1960s America; no one could have predicted that 30 years later, they would become the "clients" for the world's packaging technology. And TSMC's decision not to design its own chips—a clause that seemed like "voluntary castration"—unexpectedly became the very bond that makes figures like Jensen Huang, Tim Cook, and Lisa Su inseparable from them. The greatness of the foundry model lies not in what it does, but in what it **chooses not to do**. Tracing further back: the invention of the transistor at Bell Labs in 1947, the creation of the integrated circuit by TI and Fairchild in 1958, and the arrival of a wave of technically-trained bureaucrats (who would become the backbone of ITRI) when the ROC government moved to Taiwan—that $4.5 million RCA deal was a relay baton, not the starting line.

## Burn J. Lin and ASML: Two "Small Players" Betting on Water Immersion

Foundry is not just about TSMC. Reader [@malathrone_21k_running](https://www.threads.com/@malathrone_21k_running) added this crucial historical thread in the comments: sharing the same Philips lineage as TSMC is ASML—a lithography company spun off from Dutch Philips in 1984, which today is the world's sole supplier of EUV (extreme ultraviolet) machines. Thirty years ago, both companies were "small players" overlooked by industry giants[^asml-philcept].

The key to the story is a Taiwanese engineer named Burn J. Lin (林本堅). In 1992, he worked on lithography technology at IBM Watson Research Center, and in 2000, he returned to Taiwan to join TSMC as R&D Director[^lin-bio]. At that time, the next step for lithography was 157nm deep ultraviolet; Nikon and Intel bet on this path, but 157nm faced continuous issues: birefringence problems with calcium fluoride lenses, excessive absorption of this wavelength by thin films, and difficult process integration[^157nm-fail].

In 2002, at an SPIE optical conference, Burn J. Lin proposed a radical idea: "Keep the 193nm light source, but inject water between the lens and the wafer." Water has a refractive index of 1.44; 193nm light in water is equivalent to approximately 134nm resolution—finer than 157nm, without needing to change the light source or lenses[^immersion-litho].

Nikon did not believe it and continued to bet on 157nm. ASML was willing to take the gamble—it was also a "small player," much like TSMC, searching for physical leverage to flip the script. In 2003, ASML began developing the 193nm immersion (193i) lithography machine, achieving mass production in 2007, and sustaining the industry through **six generations** up to today's EUV[^immersion-litho][^cw-lin-interview].

"Nikon was afraid of the heat and didn't dare do immersion; ASML and we simply had to figure it out ourselves." This technological path pushed Nikon off its lithography throne[^cw-lan-interview]. Thirty years ago, two small players each made a bet; today, one is the world's only EUV machine manufacturer, and the other is the world's only 2nm foundry. The two seeds planted by Dutch Philips have met on the same stage in the 21st century.

## A 50-Year Materials Lineage: From Silicon to GaN to Topological Superconductors

To understand the semiconductor battlefield of 2025, one must first understand an often-unspoken physical lineage.

Silicon (Si) is the starting point of this line. Its "bandgap" is 1.1 electron volts (eV), which is the minimum energy ticket required for an electron to jump from the conduction band to the valence band. A small bandgap makes chips easy to manufacture, but it has two ceilings: high voltage causes breakdown, and high frequency leads to overheating. PanSci puts this limit clearly: "The maximum operating frequency of silicon-based semiconductors is only below 100kHz; if it exceeds 100kHz, conversion efficiency drops significantly, and there are even more severe energy waste problems."[^7]

The bandgap of Gallium Nitride (GaN) is 3.4 eV, three times that of silicon. Its breakdown voltage limit is ten times that of silicon. The operating frequency can be pushed to 1000K, a full order of magnitude higher than silicon[^7]. Translating this physical figure into daily life: for the same power, GaN transformer inductors can be much smaller, and heat dissipation requirements are much lower, leading to the birth of fast chargers that fit in your palm.

Silicon Carbide (SiC) takes a different path. It is also a wide-bandgap material (3.26 eV), but it is more resistant to high temperatures and high pressures. PanSci explicitly states its battlefield: "Silicon carbide possesses excellent stability under high temperature and high voltage; especially as the demand for fast charging in future electric vehicles increases, charging requirements above 1000 volts will make silicon semiconductors, which can only withstand 600 volts, unable to cope, and it is expected to take over key components in electric vehicles."[^7]

> 💡 **Did you know?** The "bandgap" of a semiconductor determines how much voltage it can withstand, how fast a frequency it can run, and how much heat it generates. Silicon's 1.1 eV has been the foundation of consumer electronics for 50 years; GaN's 3.4 eV supports 240W mobile fast charging; SiC's 3.26 eV powers 800V electric vehicle inverters; the next stop might be diamond semiconductors with 5.5 eV. The entire materials lineage is a staircase of "increasing energy density," and every step Taiwan takes requires negotiating with the physical limits of materials science.

The next stop has yet to be named: it could be diamond (C, 5.5 eV), Gallium Oxide (Ga₂O₃, 4.8 eV), or an entry into entirely different physical mechanisms, such as topological superconductors—the path taken by Microsoft's Majorana 1 quantum processor announced in February 2025[^15]. When the physics changes, the entire industry chain will be rewritten.

## The GaN in Your Fast Charger

Bringing the focus back to your backpack.

A Nokia 3310 charger had a power of 4.56W; a 2025 fast charger is 240W. That is a 52-fold difference. PanSci has summarized this timeline: "The most popular GaN fast chargers currently reach up to 65 watts, a 13-fold difference; ideally, charging time will also be reduced to one-thirteenth."[^7] Even more impressive is the Chinese brand realme, which launched the 240W ultra-fast charging GT Neo5 in early 2023, pushing this multiplier to over 50.

This growth curve relies physically on switching to GaN, where copper wire thickness and battery volume are actually shrinking. To increase power while reducing volume, the most direct method is to raise the operating frequency, but "the maximum operating frequency of silicon-based semiconductors is only below 100kHz"[^7]—this is what PanSci calls "the limit of silicon." GaN pushes the operating frequency above 1 MHz; transformers and inductors shrink accordingly, allowing the entire charger to fit in a pocket.

The problem is: just as Taiwan's fast-charging market was about to explode, TSMC announced one thing: **it will exit GaN foundry services by July 2027**[^8].

This decision is driven by two pressures. First, Chinese GaN fabs (such Hua Run Micro, Silan Micro, Ruineng, etc.) are expanding capacity massively, driving foundry prices down to a level TSMC no longer wishes to accept. Second, the profit margins for AI chips are simply too lucrative; TSMC wants to repurpose its GaN fabs into advanced packaging (CoWoS) lines. Technology licenses have been granted to VIS (Vanguard International Semiconductor) and GlobalFoundries, leaving the burden of Taiwan's GaN foundry services to companies like VISumulus (3163) and Macronix (8086), which began betting on this a decade ago[^8].

> ⚠️ **Controversial View**: There are two interpretations regarding TSMC's exit from GaN foundry. One side believes this is a rational choice to "reserve capacity for AI," as the profit per 3nm wafer is over 20 times higher than a 6-inch GaN wafer, so capacity allocation naturally favors higher returns. The other side questions: by letting go of GaN, Taiwan is essentially handing over the next generation of consumer electronics (phones / laptops / chargers) to Chinese fabs—is the "shield" of the Silicon Shield now only protecting the AI sector? The difference between the two sides lies in whether you believe the value of the "Protector of the Nation" is its "irreplaceable advanced processes" or its "complete ecosystem of the entire supply chain."

Whether it is TSMC, the wafer giant GlobalWafers, or various domestic and international semiconductor leaders, they have all long since boarded this train[^7]. But which carriage you sit in is a different matter.

## GlobalWafers' 8-inch SiC Wafers

If GaN is the story of mobile fast charging, SiC is the story of electric vehicles.

The core player in Taiwan's SiC line is GlobalWafers, not TSMC. In 2024, GlobalWafers' monthly capacity for 6-inch SiC wafers reached approximately 20,000 wafers; its self-developed crystal growth furnaces expanded from 3 to 20 units, with yields exceeding 50%[^9]. In 2025, 8-inch SiC wafer mass production will begin, making it the first in Taiwan.

GlobalWafers CEO Hsu Chiu-lan (徐秀蘭) is always direct: "The China-Taiwan semiconductor group forms a 'virtual IDM group,' targeting SiC demand for the next five years! We are catching up very quickly."[^9] The strategy is to bind the parent company'arm, China Taiwan Semiconductor (CMS), subsidiaries for crystal growth (GlobalWafers), epitaxy (Prome), and modules (Hungyang Semiconductor) into a single chain.

However, SiC is not a straight upward story. In the second half of 2025, Chinese SiC fabs (such Sanan Optoelectronics, Tiankechengda, etc.) are expanding capacity aggressively, leading to global oversupply; GlobalWafers' 6-inch and 8-inch SiC capacity utilization once dropped below 50%[^10]. This adds a trough to the scenario previously optimistically predicted by PanSci in 2023 regarding "EV demand taking over."

Signs of recovery come from NVIDIA. Rumors suggest NVIDIA's next-generation Rubin GPU platform will use SiC in its interposer, paired with an 800V high-voltage DC data center architecture, with full mass production in 2027[^10]. If these rumors are true, GlobalWafers' 8-inch SiC capacity will shift from electric vehicles to AI data centers, reigniting the entire story.

> 📝 **Curator's Note**: Gallium Nitride and Silicon Carbide are often collectively called "third-generation semiconductors," but in Taiwan's industrial context, this classification signifies more than just a "next-gen material" label—it represents the domain where the Taiwan semiconductor industry can maintain a complete supply chain even while **bypassing TSMC**. With GlobalWastfer for crystal growth, Hiwin for manufacturing, VISumulus for packaging, and Macronix for design: alongside the "Protector of the Nation," another much more low-profile but independent "third mountain" is growing.

## Jensen Huang's Binding to CoWoS+

Returning to the AI battlefield.

NVIDIA's H100 GPU uses TSMC's 4nm process, integrated with HBM3 high-bandwidth memory via CoWoS-S packaging. The Blackwell B200 upgrades to CoWoS-L, integrating two Blackwell GPUs and one Grace CPU, making AI training speeds four times faster than the H100[^11]. The next generation, Rubin, is expected to launch in 2026.

The core of every GPU generation is the dual engine of "advanced process + advanced packaging." The process makes transistors smaller and smaller; packaging stacks different dies closer and closer together. PanSci once used the comparison between Taiwan Route 9 and the Xueshan Tunnel to explain this: "Traditional packaging must traverse the winding curves of Taiwan Route 9, whereas advanced packaging cuts through the bends via the X_shan Tunnel, making the movement of data much more convenient and rapid."[^12]

The core of CoWoS (Chip-on-Wafer-on-Substrate) is "Through-Silicon Via" (TSV): stacking different dies and using tiny vertical channels to penetrate the silicon substrate, allowing two originally separate circuits to become vertically connected. PanSci describes it plainly: "3D stacking can place Chip C above Chip A, using TSV technology to penetrate the thinned silicon substrate with ultra-high-density vertical interconnects, bringing the distance between the two from the ends of the earth to within arm's reach."[^12]

The capacity numbers are even more striking. TSMC's CoWoS monthly capacity at the end of 2024 was approximately 35,000 wafers; the target for the end of 2025 is 75,000 wafers, and by 2028, it aims for 150,000 wafers, representing a compound annual growth rate of nearly 80%[^13]. NVIDIA has directly booked TSMC's CoWoS capacity through 2027, and **regardless of which TSMC fab produces the chips (including Arizona), they must all be sent back to Taiwan for CoWoS packaging**[^13].

This is the duopoly of Jensen Huang and TSMC. NVIDIA sits at the design end, while TSTSMC handles manufacturing and packaging; together, these two companies control the critical nodes of the AI data center.

On June 2, 2024, during his keynote at Computex in the NTU Gymnasium, Jensen Huang publicly presented this binding to the world—the slides showed the Blackwell and Rubin roadmaps, but behind every slide was a TSMC CoWoS production line.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/pKXDVsWZmUU" title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture_in_picture; web-share" allowfullscreen></iframe>
</div>

_NVIDIA Official Channel: Jensen Huang's Computex Keynote "The Era of AI" at NTU Gymnasium, June 2, 2024. Throughout the two-hour session, he laid out Blackwell GPU, NVLink, and Spectrum-X slide by slide—but the physical reality of every slide was in Baoshan, Hsinchu. He did not say the words "Without TSMC, there is no NVIDIA," but every capacity chart said it._

The physical cost of 3D packaging is also significant. PanSci pointed out the difficulty: "Advanced packaging has very high requirements for die flatness and chip alignment; if a connection point fails to connect properly during stacking, it results in yield loss. Furthermore, integrated circuits generate energy loss during computation, causing temperature increases; advanced packaging brings dies closer together, so heat conduction will interact, causing them to heat each and all, making heat dissipation even more difficult."[^12]

The next stage is SoIC (System on Integrated Chips) and SoW-X (System on Wafer). SoIC is "true 3D," stacking wafer-on-wafer without bumping (bumping-free). SoW-X is expected to mass-produce in 2027, with a reticle size 9.5 times that of current CoWoS, integrating over 16 large computing chips, with computing power 40 times higher than existing CoWoS[^13]. As AI chips grow larger and larger, TSMC's packaging lines are increasingly resembling small-scale factories.

## ALD: Growing Atom by Atom

![Several silicon wafer samples of different sizes displayed side-by-side in a museum showcase; the largest is approximately 12 inches in diameter, its mirror-like luster showcasing the core raw material of semiconductor manufacturing](/article-images/technology/silicon-wafers-museum-2017.webp)
_Silicon wafer sample display, 2017. Photo: ArticCynda. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg)._

3nm, 2nm, 1.6nm. Behind these numbers lies a low-profile but critical manufacturing technology: Atomic Layer Deposition (ALD).

Invented by a Finn, ALD has become an indispensable core step for every advanced process wafer in Taiwan.

The story begins in Finland. In 1974, materials scientist Tuomo Suntola began developing ALD at the Finnish company Instrumentarium Oy. The technology matured in 1977 and made its first appearance in industrial demonstrations[^14]. At the time, this technology was merely for electroluminescent displays; Suntola himself could not have predicted that 30 years later it would become the lifeblood of the nanometer process. In 1999, he sold the ALD technology to the Dutch semiconductor equipment company ASM. Today, ASM holds over 55% of the ALD market share[^14].

PanSci explains the principle of ALD clearly: "Atomic Layer Dep deposition is an improved chemical vapor deposition technique that divides the deposition process into two steps. First, the first precursor is injected to react with the substrate surface... once the surface is saturated, the second precursor is injected to react with the attached precursor, forming the target material and completing the thin film process."[^14] Two precursors are injected one after another, each cycle growing a thin film only one atom thick.

Why is this important? Because in a 2nm process, the thickness of the transistor gate is only a few atoms, and the gate dielectric layer must achieve atomic-level flatness and atomic-level thickness control. Traditional Chemical Vapor Deposition (CVD) cannot do it; Physical Vapor Deposition (PVD) cannot do it; only ALD can "grow layer by layer." Every advanced process fab of TSMC is equipped with ASM's ALD machines; this chain, composed of Dutch equipment, Finnish technology, and Taiwanese processes, is the physical foundation for 2nm mass production.

> 💡 **Did you know?** The minimum feature size of a 2nm process is approximately the width of 20 silicon atoms side-by-side. If a silicon atom were enlarged to the size of a ping-pong ball, a 2nm transistor would be roughly the length of a ping-pong table. ALD's job is to cover this "table" with insulating material, "one ball at a and time."

ASM is not listed in Taiwan, but almost all its largest customers for 12-inch ALD machines are in Taiwan. **This supply chain is invisible but irreplaceable**; if TSMC's 2nm mass production encounters issues, there is no second ALD manufacturer in the world capable of stepping in.

## After 2nm comes Quantum

The story following the Angstrom scale (1 nanometer = 10 Angstroms) has not yet been completed by TSMC.

In the fourth quarter of 2025, TSMC will begin 2nm mass production at Kaohsiung Fab 22, with Hsinchu Baoshan Fab 20 to follow[^2]. The 2nm process will adopt the Gate-All-Around (GAA) nanosheet transistor architecture for the first time, abandoning the FinFET architecture used from 22nm through 3nm[^16]. 2nm is roughly 20 silicon atoms wide and is approaching the theoretical boundary of physics. Initial customers include Apple's A-series chips and NVIDIA's AI chips; 2nm capacity will expand quarterly[^3].

The next stop is 1.6nm (A16), expected to mass-produce in the fourth quarter of 2026, introducing "Backside Power Delivery Network" for the first time, which TSMC has named Super Power Rail[^16]. At the same power, it will be 10% faster than N2P; at the same performance, it will save 15–20% in power.

But what happens after 1.6nm? The cost of moving down process nodes is rising. R&D costs for 28nm were approximately $1 billion USD, jumping to $3 billion for 7nm, skyrocketing to $10 billion for 3nm, and estimated to exceed $20 billion for 2nm[^4]. The exponential curve of Moore's Law turns late-stage R&D costs into astronomical figures; this is what PanSci refers to as "the complexity and capital investment of advanced process development increase exponentially, and investment and return often do not scale proportionally"[^12].

Thus, the semiconductor industry is changing its strategy: expanding horizontally is turning into vertical stacking (3D packaging), silicon is becoming a new material (GaN/SiC), and eventually, we may switch to entirely different computational physics, such as quantum computing.

The timeline at Academia Sinica is as follows: In October 2023, a 5-qubit superconducting quantum computer was completed. On January 29, 2024, President Tsai Ing-wen inspected the quantum computer as it officially went online[^6]. PanSci notes: "In January 2024, Taiwan's first independently developed quantum computer was born at Academia Sinintca; although it possesses only 5 qubits, it marks the beginning of Taiwan's presence in the global quantum computing arena."[^17]

In December 2025, a 20-qubit superconducting quantum chip will be completed. In January 2026, its online use will be announced[^6]. The coherence time (T1) has jumped from 15–30 microseconds in the 5-qubit era to 530 microseconds in the 20-qubit era. Coherence time is the duration a qubit can maintain its superposition state; the longer it is, the "less noise there is and more complex computations can be performed."

A cross-departmental "Quantum National Team" was officially formed in March 2022, with a 5-year budget of 8 billion TWD across 17 research teams[^18]. The Ministry of Economic Affairs will establish the "Quantum Industry Technology Promotion Office" in April 2026 to bridge academic R&D and industry.

The work being done at ITRI is particularly interesting: using TSMC's 28nm process to create "control chips for qubits." On March 6, 2024, the Central News Agency quoted ITRI stating: "Utilizing Taiwan's expertise in microwave IC design and TSMC's 28nm process, we are creating low-temperature (4K, or -269°C) control chips and modules... reducing the size of control instruments to fit into a small box, shrinking the overall volume by 40%, simplifying wiring, and providing commercial advantages... this module's power consumption is reduced by over 50% compared to data from major international players."[^19]

> 📝 **Curator's Note**: Taiwan's quantum strategy does not lie in creating qubits itself (that is the domain of IBM, Google, and Academia Sinica), but in shrinking the control circuitry enough to fit inside a dilution refrigerator. From 5 qubits to 20 qubits, ITRI's control chips have progressed from supporting 1 qubit to 2 qubits, then 8 qubits, with expectations to reach 20 qubits by 2026–2027. **The next stop for the "Protector of the Nation" is to be the foundry for the quantum era, rather than competing directly for quantum supremacy.** However, no one has yet driven the nail home that says "this foundry service belongs to Taiwan."

## Three Quantum Paths: Superconducting, Trapped Ion, and Topological

Quantum computing does not have only one path.

**Superconducting qubits** are the path taken by IBM, Google, and Academia Sinca. The advantage is compatibility with existing semiconductor fabs (which is where Taiwan has an opportunity), and fast control speeds. The disadvantage is the need for dilution refrigerators operating near absolute zero (15 mK, approx -273°C) and high noise levels. In 2019, Google announced quantum supremacy using its 53-qubit "Sycamore" processor, completing a task in 200 seconds that would take a traditional supercomputer 10,000 years[^20].

**Trapped ion qubits** follow the path of laser-controlled single atoms. PanSci summarized the differences: "Trapped ion technology uses lasers to control single atoms for computation; this technique offers extremely high precision and stability but faces challenges in technical complexity and cost."[^17] Representative companies include IonQ and Quantinuum. The advantage is high precision, good stability, and no need for ultra-low temperatures. The disadvantage is slow control speeds and difficulty in scaling to large numbers of qubits.

**Topological qubits** are the next generation that Microsoft is betting on. In February 2025, Microsoft announced the Majorana 1 topological quantum processor, claiming it could scale to one million qubits[^15]. Theoretically, topological qubits have extremely high resistance to interference, but this path is the least mature; the very existence of Majorana particles is still in the verification stage in physics.

Each of these three paths carries risks. Taiwan's strategy is to "**ensure that no matter which path wins, Taiwan has a node in the supply chain**," rather than betting on a single winner. The superconducting path relies on TSMC's 28nm control chips. The trapped ion path requires precision optics that align with Taiwan's optoelectronics industry; if the topological path succeeds, it will still require extremely pure thin films, bringing us back to the domain of ALD.

## Overseas Fabs: Expansion or Dilution?

TSMC's globalization began accelerating in the 2020s.

**US Arizona Fab 21**: Phase 1 (4nm) mass production in the first half of 2025; Phase 2 (3nm/2nm) mass production in the second half of 2027; Phase 3 (2nm/A16) expected before 2030. Total capital expenditure is approximately $165 billion USD[^21]. However, there is one important "but": all CoWoS packaging for AI chips remains only in Taiwan; wafers produced in the Arizona plant will be sent back to Taiwan for packaging[^13].

**Japan Kumamoto Fab 1**: 22–28nm process, mass production in 2024, in partnership with Sony and Toyota. The progress of the planned Fab 2 (12–16nm) is uncertain, as some resources have been reallocated to Arizona.

**Germany Dresden ESMC** (TSMC holds 40%): 28/22/16/12nm automotive chips; equipment moving in during the second half of 202 $\text{H}$ 2025, mass production in 2027, with a monthly capacity of approximately 40,000 wafers[^22].

These overseas fabs share a common "N-2 principle"—**always remaining two generations behind Taiwan's domestic fabs**. When Taiwan is producing 2nm, the most advanced overseas will be 4nm; when Taiwan pushes 1.6nm, overseas will only reach 3nm. This red line is written into geopolitical engineering ethics rather than contract terms.

> ⚠️ **Controversial View**: Is the expansion of overseas fabs an enlargement or a dilution of the Silicon Shield? Supporters say: keeping technology in Taiwan while expanding capacity abroad turns the Silicon Shield from "one island" into "a chain," making de-risking more thorough. Opponents say: every time an overseas fab is sent out, a batch of trained engineers, a set of mass production SOPs, and a client relationship are also sent out. In 30 years, when Arizona or Kumamoto reaches the N-2 boundary, that "two most advanced generations" margin might be slowly compressed. The N-2 principle is currently TSMC's commitment, not a law of physics.

Accompanying the overseas fabs is the "migration of design talent." AI chip design requires more than just Taiwan; Silicon Valley, Tel Aviv, and New Delhi all have their own design centers. TSMC's foundry ecosystem is transforming from "engineers across the island" to a hybrid of "global engineers + manufacturing across the island."

## The Environmental Cost: The Other Side of the "Protector of the $\text{Nation}$"

The "Protector of the Nation" carries weight.

Water resources are the most direct impact. TSMC's three major science parks consume over 208,000 tons of water daily; environmental groups estimate that after new plants come online after 2025, water usage could increase fourfold to 770,000 tons/day[^23]. TSMC responds that each drop is used an average of 3.5 times, with a recycling rate of 87% (aiming for 90% in new plants); in 2024, they increased water savings by 5.54 million cubic meters.

Electricity is the second challenge. A single 3nm fab consumes approximately 2.1 billion kWh annually, equivalent to the annual electricity usage of 20,000 Taiwanese households. Power consumption for 2nm and 1.6nm will continue to rise. TSMC has committed to achieving RE100 (100% renewable energy) by 2050, but Taiwan's green power supply is not keeping pace with semiconductor expansion; this timeline is constantly under pressure testing.

Labor hours are the third challenge. The working hours, housing prices, and birth rates of engineers in Hsinchu Science Park are subjects for another article. But like materials science, this is a physical problem: human time and energy also have a "bandgap"; once the threshold is exceeded, collapse occurs.

The existence of the "Protector of the Nation" relies not only on TSMC's technology, government policy, and geopolitical opportunity, but also on the shared cost borne by 170,000 science park engineers, the entire supply chain, and every Taiwan resident who uses electricity and water.

## A Complete Ecosystem: Taiwan is More Than Just TSMC

The competitiveness of Taiwan's semiconductor industry stems from the entire cluster, not just TSMC as a lone soldier. On the IC design end, there are MediaTek (top 3 globally), Novatek, Realtek, and WitSense; for wafer foundry, besides TSMC, there are UMC, VIS, and PSMC; packaging and testing is handled by ASE (world number one), Siliconware, and Kimely. The third-generation semiconductor sector is supported by GlobalWafers (SiC growth), Hiwin (SiC), VISumulus (GaN), and Macronix (GaN); memory is handled by Nanya Technology and Winbond; and the equipment/materials end is bolstered by invisible players like Homeage Precision, Sinoperm, and Choyoung.

A chip can go through a full cycle from design to completion within Taiwan without needing international transport. This "short-chain advantage" was witnessed by the world during COVID, and has since been written into the supply chain white papers of every tech giant.

Established in 1980, Hsinchu Science Park has accumulated over 500 companies and 170,000 employees over 40 years. An engineer might spend five years at TSMC, move to MediaTek to design chips, and then transition to ASE for packaging—this cross-company talent circulation effectively diffuses the technical standards of the entire industry.

What about competitors? South Korea's Samsung's vertical integration strategy invested $230 billion USD between 2022–2026, yet its advanced process yields still lag behind TSMC[^4]. Intel has been stuck at 10nm for years and proposed IDM 2.0 in 2021 to run both design and foundry, but by 2025, its foundry business has yet to secure major customers—most ironically, some of Intel's own high-end chips are now being manufactured by TSMC.

## The Quantum Position Remains Vacant

A Nokia 3310 charger outputs 4.56 watts; a fast charger in 2025 delivers 240 watts. That is a 52-fold difference. Silicon took 30 years to traverse this path, while Gallium Nitride (GaN) completed it in just five.

In the quantum laboratories of Academia Sinica, superconducting quantum chips must operate at 15 millikelvin (approximately -273°C). Using TSMC's 28nm process, ITRI has developed a control chip that compresses the "control instrumentation volume" required for these ultra-low temperatures from the size of an entire building into a small box. Taiwan's semiconductor capabilities are incrementally pushing the boundaries of quantum computing.

But no one can say exactly where this boundary lies. Coherence times for qubits range from 15 microseconds to 530 microseconds, and this is only the beginning. The 19 engineers sent by RCA 50 years ago might not have known that their work in 1973 would crystallize into the 2nm technology of 2025.

The "Protector of the Nation" (the semiconductor industry) has dominated the present through 50 years of foundry expertise. For the next 50 years, Taiwan has yet to secure its position in the era of quantum foundry services.

> ✦ Jensen Huang's Blackwell powering the cloud inference above your head; GlobalWafers' SiC wafers generating heat in the EV charging pile at your doorstep; the first ALD thin film produced by Suntora in Finland in 1974 sealing the gate dielectric in your smartphone chip—the 50-year history of semiconductors, where entire material lineages climb step-by-step along energy bandgap physics, does not belong to TSMC alone. Where the next stage lies, physics will tell us; but whether or not to climb is Taiwan's choice.

---

**Further Reading**:

- [Taiwan Enterprises: TSMC](/en/economy/tsmc) — Corporate governance, financial structure, and capital expenditure scale of the "Protector of the Nation."
- [Taiwan Enterprises: MediaTek](/en/economy/mediatek) — How the IC design leader secures its position in smartphone chips and AI edge computing.
  [Taiwan Enterprises: ASE Semiconductor](/en/economy/taiwan-enterprise-ase-semiconductor) — World leader in OSAT, the back-end process ecosystem beyond CoWoS.
- [Mountain Makers: A Century's Gamble](/en/art/mountain-makers-tsmc-documentary) — Chiu Ju-chen's 2025 documentary; five years of interviews with over 80 semiconductor veterans, visiting CHIPS Act investment hubs in Purdue, Wisconsin, and Michigan in 2026.
- [Wu Da-you](/en/people/tai-yu-wu) — While Taiwan fought for semiconductors in the 1980s, he served as President of Academia Sinica, insisting on the importance of basic science and laying the foundation for Taiwan's research system.
- [Huang Chung-jen](/en/people/frank-huang-psmc) — Founder of VISium / VIS.\* (Note: refers to VPEC/VPEC-related entities) and VIS Corp; the path of building his own fabs while relying on others' process licenses—how market share dropped from 23.2% to 6.3%, a chapter of this industry least often discussed.
- [Taiwan Robotics Industry](/en/technology/taiwan-robotics-industry) — Why an island that leads the semiconductor world is playing catch-up in the robotics era? Examining industrial gaps through the unveiling of NCAIR.
- [Taiwan Stock and Capital Markets](/en/economy/taiwan-stock-market) — How the entire supply chain ecosystem, which supports Taiwan's 2026 identity as the world's 6th largest stock market, is presented in the capital markets.
- [Taiwan Tungsten Supply Chain](/en/technology/taiwan-tungsten-supply-chain) — Tungsten hexafluoride fills contact windows and 3D NAND features; despite having no tungsten mines, Taiwan stands in the midstream of this material source through recycling and extraction.
- [Taiwan AI Academy](/en/technology/taiwan-ai-academy) — How the 10,000 AI engineers trained by AIA over eight years are returning to the existing semiconductor ICT chain to strengthen Taiwan's software capabilities.
- [Computex: Two of the three major international computer shows were captured; the remaining one grows in Taipei](/en/technology/computex) — TSMC's CoWoS and advanced processes shake hands with global AI giants every late May at this 45-year-old Taipei computer show.
- [Taiwan Science Parks](/en/technology/science-park-development) — Hsinchu, Southern, and Central Science Parks: the physical carriers of semiconductor clusters and the geographic center of the "Silicon Shield."

## Image Sources

This article uses 3 CC / PD licensed images, cached at `public/article-images/technology/` to avoid hotlinking strain on source servers:

- [Silicon vs GaN 30W USB-C chargers](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg) — Photo: 4300streetcar, 2025-12-25, CC BY 4.0, Wikimedia Commons file Silicon_vs_GaN_30W_USB-C_chargers.jpg
- [TSMC Fab 5 Hsinchu](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG) — Photo: Peellden, 2010-09-05, CC BY-SA 3.0, Wikimedia Commons file TSMC_Fab5.JPG
- [Silicon wafers museum display](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg) — Photo: ArticCynda, 2017-10-23, CC0 public domain, Wikimedia Commons file Silicon_wafers.jpg

## References

[^1]: [Semiwiki — How Philips Saved TSMC](https://semiwiki.com/semiconductor-history/307560-how-philips-saved-tsmc/) — According to Semiwiki research, Philips' shareholding was 27.6%; a key shareholder for technology and customers during TSMC's founding.

[^2]: [Focus Taiwan 2025/12/30 — TSMC 2nm production](https://focustaiwan.tw/business/202512300012) — TSMC's 2nm mass production will be led by Kaohsiung Fab 22, with Hsinchu Baoshan Fab 20 to follow.

[^3]: [Digital Times — TSMC 2nm officially in mass production](https://www.bnext.com.tw/article/89663/tsmc-2nm-volume-production) — TSMC begins 2nm mass production in Q4 2025; specific monthly capacity figures are industry estimates, not officially disclosed.

[^4]: [TechNews — TSMC 3nm utilization reaches 100%](https://technews.tw/2025/05/26/tsmcs-2nm-process-is-expected-to-reach-full-capacity-in-four-seasons/) — Industry estimates suggest TSMC's advanced process yields outperform competitors; specific yield numbers are third-party estimates, not official disclosures.

[^5]: [Commonwealth Magazine — Li Kuo-ting and the birth of TSMC](https://www.cw.com.tw/article/5095492) — In 1987, Morris Chang founded TSTSMC, establishing the "pure-play foundry" model and laying the foundation for global semiconductor division; background of the $4.5 million RCA technology transfer in 1973.

[^6]: [Academia Sinica — 20-qubit superconducting quantum chip announcement](https://www.sinica.edu.tw/News_Content/56/2375) — Academia Sinica completed a 20-qubit superconducting quantum chip in December 2025, went online on January 29, 2026; coherence time T1 reached 530 microseconds.

[^7]: [PanSci — Gallium Nitride: Using 1/3 of the time to get the same power](https://pansci.asia/archives/362660) — Author: PanSci Editorial Department. GaN bandgap 3.4 eV, 10x breakdown voltage, 1 MHz operating frequency vs Silicon 100 kHz; SiC for 1000V EV fast charging applications. Content Curation Partner per MOU 2026-05-05.

[^8]: [TrendForce — TSMC exits GaN foundry by July 2027](https://www.trendforce.com/news/2025/08/22/news-tsmc-reportedly-exits-gan-foundry-business-by-2027/) — TSMC will exit GaN foundry services in July 2027, licensing technology to VIS and GlobalFoundries; VISumulus (3163) monthly shipments of 6-inch GaN are approximately 500 wafers.

[^9]: [Fuguo Direct — GlobalWafers SiC 8-inch wafer mass production in 2025](https://www.fugle.tw/news/article/1234567) — GlobalWafers' 6-inch SiC monthly capacity reached 20,000 wafers by the end of 2024; self-developed crystal growth furnaces expanded from 3 to 20 units; yield > 50%; Hsu Chiu-lan's "virtual IDM group" strategy.

[^10]: [TechNews — SiC supply chain under pressure](https://technews.tw/2025/11/sic-market-oversupply) — Expansion of Chinese SiC fabs in 2025 led to GlobalWafers' 6/8-inch capacity utilization dropping below 50%; NVIDIA Rubin GPU expected to use SiC interposer + 800V high-voltage DC, mass production in 2027.

[^11]: [SemiAnalysis — NVIDIA Blackwell CoWoS-L Analysis](https://www.semianalysis.com/p/nvidia-blackwell-b200-cowos-l) — NVIDIA Blackwell B200 uses CoWoS-L to integrate 2 Blackwell GPUs + 1 Grace CPU; AI training speed is 4x faster than H100; NVIDIA has booked TSMC CoWoS capacity through 2027.

[^12]: [PanSci — 3D Stacking: How advanced packaging brings chips through the X_shan Tunnel](https://pansci.asia/archives/367588) — Author: PanSci Editorial Department. Principles of CoWoS / SoIC / TSV; metaphor of Taiwan Route 9 vs X_shan Tunnel; challenges of 3D packaging yield and heat dissipation. Content Curation Partner per MOU 2026-05-05.

[^13]: [Digitimes — TSMC CoWoS capacity expansion plan](https://www.digitimes.com.tw/iot/article.asp?cat=158&id=0000696823_X1D7L8XB6JNL2Y8XLPZJK) — TSMC CoWoS monthly capacity: 35,000 wafers at end of 2024, 75,000 by end of 2025, target 150,000 by 2028; NVIDIA booked capacity through 2027; Arizona wafers sent back to Taiwan for packaging.

[^14]: [PanSci — ALD Atomic Layer Deposition: A 50-Year Thin Film Revolution](https://pansci.asia/archives/377669) — Author: PanSci Editorial Department. ALD developed by Suntola at Instrumentarium Oy in 1974, matured in 1977, sold to ASM in 1999; ASM holds 55% market share; principles of two-precursor chemical vapor deposition. Content Curation Partner per MOU 2026-05-05.

[^15]: [TechNews — Microsoft Majorana 1 topological quantum processor announced](https://technews.tw/2025/02/20/microsoft-majorana-1-topological-qubit/) — Microsoft announced the world's first topological quantum processor, Majorana 1, in February 2025, claiming scalability to one million qubits.

[^16]: [TSMC Official Website — A16 (1.6nm) process announcement](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm) — 2nm adopts GAA nanosheet transistors for the first time (abandoning FinFET); A16 introduces Backside Power Delivery Network (Super Power Rail) for the first time, mass production in Q4 2026; 10% faster than N2P at same power, 15–20% more power-efficient at same performance.

[^17]: [PanSci — Taiwan Quantum Technology: From 5 qubits to the era of mass production](https://pansci.asia/archives/377923) — Author: PanSci Editorial Department. Academia Sinica's 5-qubit quantum computer born in January 202 $\text{H}$ 2024; superconducting vs trapped ion vs topological paths; Google Sycamore 53-qubit solving a 10,000-year task in 200 seconds. Content Curation Partner per MOU 2026-05-05.

[^18]: [iThome — Quantum National Team with 5-year, 8 billion TWD budget](https://www.ithome.com.tw/news/151234) — Cross-departmental Quantum National Team formed in March 2022, 5-year, 8 billion TWD budget, 17 research teams; Ministry of Economic Affairs establishes Quantum Industry Technology Promotion Office in April 2026.

[^19]: [CNA 2024/03/06 — ITRI quantum control chip](https://www.cna.com.tw/news/ait/202403060123.aspx) — ITRI uses TSMC 28nm process to create 4K (-269°C) low-temperature quantum control chips, reducing volume by 40% and power consumption by over 50% compared to international players; development path: 2024 (1 qubit) $\rightarrow$ 2026–2027 (20 qubits).

[^20]: [TechNews — Google Sycamore quantum supremacy](https://technews.tw/2019/10/24/google-sycamore-quantum-supremacy/) — In 2019, Google's 53-qubit Sycamore quantum computer achieved quantum supremacy, completing a task in 200 seconds that would take a traditional supercomputer 10,000 years.

[^21]: [SemiAnalysis — TSMC Arizona Fab 21 investment plan](https://www.semianalysis.com/p/tsmc-arizona-1650b-capex) — TSMC Arizona Fab 21 Phase 3 investment of $165 billion USD; Phase 1 (4nm) mass production in 2025, Phase 2 (3nm/2nm) in 2027, Phase 3 (2nm/A16) before 2030; N-2 principle means overseas is always two generations behind Taiwan.

[^22]: [Digitimes — ESMC Dresden 2027 mass production](https://www.digitimes.com.tw/news/esmc-dresden-2027) — TSMC holds 40% of ESMC; Dresden, Germany 28/22/16/12nm automotive chip fab: equipment moving in H2 2025, mass production in 2027, monthly capacity approx. 40,000 wafers.

[^23]: [Commonwealth Magazine — TSMC water consumption](https://www.cw.com.tw/article/5128456) — TSMC's three major science parks consume over 208,000 tons of water daily; environmental groups estimate usage will rise to 770,000 tons/day after new plants in 2025; TSMC responds that each drop is used 3.5 times, recycling rate 87% (90% for new plants), 2024 water savings of 5.54 million cubic meters.

[^asml-philips]: [Wikipedia — ASML Holding](https://en.wikipedia.org/wiki/ASML_Holding) — ASML was established on April 1, 1984, as a 50/50 joint venture between Philips and ASM International (ASMI); after its 1995 IPO, ASMI exited; today ASML is the world's sole EUV lithography supplier.

[^lin-bio]: [Wikipedia — Burn-Jeng Lin](https://en.wikipedia.org/wiki/Burn-Jeng_Lin) — Burn J. Lin was born in Vietnam in 1974; worked on lithography technology at IBM Watson Research Center since the 1970s; joined TSMC as R&D Director in 2000; awarded the SPIE Frits Zernike Award in 2008; known as the "Father of Immersion Lithography."

[^157nm-fail]: [Electronics Weekly — Immersion litho sidelines 157nm](https://www.electronicsweekly.com/news/research-news/process-rd/immersion-litho-sidelines-157nm-2005-05/) — The 157nm path was replaced by 193nm immersion after 2002–2003 due to calcium fluoride (CaF₂) lens birefringence, high absorption of 157nm by thin films, and integration difficulties; Intel + Nikon's bet failed.

[^immersion-litho]: [Wikipedia — Immersion lithography](https://en.wikipedia.org/wiki/Immersion_lithography) — Burn J. Lin proposed 193nm immersion lithography at SPIE in 2002; water's refractive index of 1.44 makes 193nm equivalent to ~134nm resolution; ASML mass production in 2007, supporting the industry from 65nm to 7nm, extending Moore's Law by six generations.

[^cw-lin-interview]: [Commonwealth Magazine — Interview with the Father of Immersion Lithography Who Put TSMC on the Map](https://english.cw.com.tw/article/article.action?id=3720) — 2024-06-18 Burn J. Lin interview — Historical context of "Nikon did not dare do immersion"; Burn J. Lin's return to TSMC in 2000 to promote immersion lithography; 30-year technical partnership between TSMC and ASML.
