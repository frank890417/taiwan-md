---
title: "NVIDIA in Taiwan: The World's Most Valuable Company Does Not Make a Single Chip Itself"
description: "At Computex in May 2025, Jensen Huang walked onstage in a leather jacket as the backdrop lit up with the logos of 55 Taiwanese companies: an American company publicly named an entire island's industries as its own physical body. From the 1996 letter to Morris Chang, to a market value breaking US$5 trillion, to the Taipei City Government spending NT$4.434 billion to clear a parcel of land for it, NVIDIA has lodged its entire body in Taiwan. Taiwan therefore holds the switch the world cannot turn off. Yet its gross margin is only 5%, its water and electricity are drained, and war risk is placed on the island: being indispensable to NVIDIA does not mean Taiwan calls the shots."
date: 2026-06-22
category: 'Technology'
tags:
  [
    'NVIDIA',
    'NVIDIA',
    'Jensen Huang',
    'AI',
    'Semiconductors',
    'TSMC',
    'Supply Chain',
    'Silicon Shield',
    'Artificial Intelligence',
    'Computex',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-22
lastHumanReview: false
researchReport: 'reports/research/2026-06/NVIDIA在台灣.md'
relatedDiary: ['2026-06-22-143854-nvidia-taiwan']
image: '/article-images/technology/computex-jensen-huang-2016.webp'
translatedFrom: 'Technology/NVIDIA在台灣.md'
sourceCommitSha: '1ec0df23'
sourceContentHash: 'sha256:533b8db87f48f6de'
sourceBodyHash: 'sha256:8a6bcaa4a83cff70'
translatedAt: '2026-09-16T11:40:00.516433+00:00'
---

# NVIDIA in Taiwan: The World's Most Valuable Company Does Not Make a Single Chip Itself

> **30-second overview:** NVIDIA is the most valuable company on earth. On October 29, 2025, its market value broke US$5 trillion[^1]. Yet it does not own a single wafer fab. Every AI chip is manufactured at TSMC; every AI server is assembled by Foxconn, Quanta, and Wistron; Taiwan handles 90% of the world's outsourced AI server manufacturing[^2]. This dependence runs so deep that NVIDIA is already TSMC's largest customer, accounting for 19% of revenue[^3], and so deep that NVIDIA's chip architecture is now being determined in reverse by Taiwan's packaging yield[^4]. The problem is that holding someone else's lifeline and sharing in the gains from it are two different things: NVIDIA's gross margin is 75%, while Taiwanese ODMs have only 5% to 8%[^5]. This article is about how this unequal relationship grew into what it is today.

![Jensen Huang speaking onstage at Computex Taipei, wearing his signature dark top, with a large projection screen behind him and a packed audience in front](/article-images/technology/computex-jensen-huang-2016.webp)
_Jensen Huang speaking at Computex Taipei in 2016. Since 2023, he has returned to this trade show almost every year to announce NVIDIA's latest AI chips, while seated below him is the entire Taiwanese supply chain that makes those chips for him. Photo: NVIDIA Taiwan, 2016._

May 19, 2025, Taipei Nangang Exhibition Center. Jensen Huang, wearing his signature leather jacket, stepped onto the Computex main stage. Behind him, a huge backdrop lit up into a wall of logos: AAEON, Accton, Delta Electronics, Gigabyte, Quanta, Wistron, Wiwynn, Foxconn, MediaTek, TSMC, UMC... one after another, finally freezing into the marks of 55 Taiwanese companies[^6]. Including the thank-you video shown at the venue, the Taiwanese companies named totaled 122[^6].

That was the first time Taiwanese people "saw" their entire industry publicly named, all at once, by an American company.

The pride was real. But that wall carried an unspoken question: every logo on it was working for this American company, while the real power lay in the hands of the person projecting the wall, not on the wall itself.

<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/TLzna9__DnI"
    title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025 (official full video)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>

_The full COMPUTEX keynote delivered by Jensen Huang on May 19, 2025, from NVIDIA's official channel. This was the speech that revealed the wall of logos from 55 Taiwanese companies and announced that NVIDIA would locate its overseas headquarters in Taipei._

## A Company That Manufactures Nothing Became the Most Valuable on Earth

NVIDIA is the fabless semiconductor model taken to its extreme. It designs chips, but it does not build fabs, buy lithography machines, or produce a single wafer. An empire worth US$5 trillion has no wafer fab of its own.

It has outsourced manufacturing wholesale to an island across the Pacific.

![Microscopic enlarged image of the NVIDIA Ampere GA102 GPU die, showing dense circuit structures](/article-images/technology/nvidia-ampere-ga102-die.webp)
_Micrograph of the NVIDIA Ampere GA102 die, produced on TSMC's 8-nanometer process. NVIDIA designed it, but every dense line etched across this surface was carved inside Taiwanese fabs. Photo: Fritzchens Fritz, CC0._

Its most profitable chips, including H200, Blackwell, and the forthcoming Rubin, all depend on TSMC's 3-nanometer and 4-nanometer processes[^7]. In its own annual report to the U.S. Securities and Exchange Commission, NVIDIA acknowledged this concentration in black and white: the company's supply chain is mainly concentrated in the Asia-Pacific region, and it uses foundries such as TSMC to produce its semiconductor wafers[^8]. This sentence appears in the company's legal filing to the SEC. In other words, NVIDIA itself identifies Taiwan as its largest source of geopolitical risk.

Making the chip is not enough. For a GPU to become something that can compute, it must first undergo advanced packaging and then be installed in a server. TSMC's CoWoS packaging is now a global bottleneck. NVIDIA alone consumes roughly 60% of CoWoS capacity, with Taiwanese media estimates even higher, at 70%[^9]. Packaged chips are then handed to Taiwanese manufacturers for assembly: Foxconn's Ingrasys makes GB200 NVL72 rack systems, with E.Sun Securities Investment Consulting estimating that it holds more than 40% of AI rack assembly market share[^10]; Quanta makes cloud servers and has more than half the share among the top 50 data centers[^11]; Wistron's new AI plant in Zhubei has been entirely booked by NVIDIA orders[^12].

```tw-stat
75.0% | NVIDIA FY2025 full-year gross margin | SEC annual report
19% | NVIDIA's share of TSMC's 2025 revenue | Surpassed Apple to become the largest customer
~90% | Taiwan's share of global outsourced AI server manufacturing | Reaches 100% when U.S.-brand suppliers are included
~60% | NVIDIA's share of TSMC CoWoS packaging capacity | Taiwanese media estimates reach 70%
Sources: NVIDIA SEC 10-K, TrendForce, MIC, Ministry of Economic Affairs
```

Taiwan accounts for 90% of global outsourced AI server manufacturing; if U.S.-brand suppliers are included, the figure is 100%[^2]. This means that virtually every physical machine used for AI computation on earth has passed through Taiwanese hands.

Stack these numbers together and the central contradiction emerges: **the most valuable company manufactures nothing because its entire physical body is lodged in Taiwan**. Taiwan is the switch it cannot turn off.

But holding someone's lifeline and taking money from that person are two different things. The next wall is hidden behind those 55 logos.

## Behind the Logo Wall Is the Bottom of the Smile Curve

Manufacturing has an old "smile curve": high at both ends, low in the middle. The two ends that control brands, design, and technology earn thick profits; the middle segment, responsible for assembly and manufacturing, earns the thinnest margins. Taiwan stands precisely in that middle segment.

NVIDIA's full-year FY2025 gross margin was 75.0%, a figure it reported to the SEC itself[^5]. During the same period, the Taiwanese companies assembling servers for it had gross margins like these: Foxconn 6.18%, Quanta 4.78% (the lowest in nearly 15 quarters), Wistron 5.21%, and Wiwynn 7.2%[^13]. NVIDIA's gross margin is roughly twelve times Foxconn's and sixteen times Quanta's.

```tw-bars
Who takes the profit: gross margins in the AI supply chain (%)
*NVIDIA | 75.0 | Design, brand, CUDA ecosystem
Delta Electronics | 37.0 | Power, thermal management (technology end)
Unimicron | 21.3 | ABF substrates (technology end)
Wiwynn | 7.2 | Server assembly
Foxconn | 6.18 | Rack system assembly
Wistron | 5.21 | Server assembly
Quanta | 4.78 | Cloud server assembly
Sources: NVIDIA SEC 10-K, company investor conferences (FY2025-FY2026 quarters)
```

This chart contains a counterintuitive fact. Among Taiwanese companies, those closer to pure "assembly" have thinner margins; those closer to "technology" have higher margins. Delta Electronics, which makes power and cooling systems, has 37%. Unimicron, which makes ABF substrates, is estimated at 21.3%[^14]. The difference is not "whether it is a Taiwanese company," but "where it stands on the curve." The assembly segment is thin no matter who does it.

> 📝 **Curator's note:** Morgan Stanley calculated an even sharper figure in May 2026: ODMs' assembly value-added gross margin at the complete-system level falls from 2.7% for the previous-generation GB300 rack to 1.9% for the next-generation VR200[^15]. In other words, every time NVIDIA releases a stronger new chip, Taiwanese manufacturers must front more capital while earning a lower margin. The further this supply chain advances, the flatter the bottom of the curve is pressed. The logos can look glorious on the wall while gross margins remain thin at the bottom of the curve; both can be true at the same time.

Pride and cost tear at each other along the same chain. Because of the AI boom in Taiwanese stocks, Taiwan's economic growth in 2025 was about 7.37%, its fastest in 15 years and among the world's leading performers[^16]. Yet Min-Hua Chiang, a scholar of Taiwan's economy, points to a cold number: most Taiwanese people did not feel the benefits of this thriving economy[^16]. The highest-earning 10% took 48% of Taiwan's total income, while the bottom 50% received only 12%[^16]. On a per-capita basis, the top 10% earned twenty times as much as the bottom 50%.

A June 2026 commentary in The Reporter made this K-shaped divergence more concrete: the "directly employed population" along the main growth chain of AI, semiconductors, and electronics supply chains accounts for less than 10% of total employment[^17]. A person working in food service has total monthly pay of NT$38,484, only 34.6% of the figure in electronic components manufacturing[^17]. The AI dividend is real. It is simply concentrated in capital and a small group of engineers, while most people watch the wave from outside it.

This is the first meaning of "being indispensable does not mean calling the shots": Taiwan holds the switch, yet receives that 5%.

## Taiwan Once Caught It, and Nearly Sank It

To understand how this unequal relationship began, we need to return to the late 1990s, when NVIDIA was still racing against death.

NVIDIA was founded in 1993 and came close to collapse several times in its early years. When it launched the RIVA 128 graphics chip in August 1997, the company had "only one month of payroll left"[^18]. In those days, Jensen Huang opened every monthly company meeting with the same English maxim: our company is thirty days from going out of business[^18]. The sentence later became part of NVIDIA's internal creed, but it was never a Chinese sentence.

What truly pulled NVIDIA out of that crisis was a US$5 million payment from SEGA, not Taiwan[^19]. This must be made clear first, because the claim that "Taiwan saved NVIDIA" is often told too romantically.

Taiwan's role was something else: the manufacturing lifeline. Around 1996, 32-year-old Jensen Huang wrote a letter to TSMC founder Morris Chang, asking whether TSMC could manufacture chips for NVIDIA[^20]. TSMC's Y.J. Mii later recalled in 2025 that this "far-reaching collaboration began at a critical moment, in 1997," when "TSMC founder Morris Chang personally contacted NVIDIA founder Jensen Huang in response to NVIDIA's request for foundry services"[^21]. In 1998, the two sides formally signed an agreement, and TSMC became NVIDIA's main wafer foundry[^20]. The division of labor, "design in Silicon Valley, manufacture through TSMC," attached NVIDIA's physical body to this island from then on.

> 💡 **Did you know:** One widely circulated version says that when Jensen Huang received Morris Chang's phone call, he excitedly shouted to the people around him to quiet down because Morris Chang was calling[^22]. This scene is second-hand retelling, and the tone may not be precise, but it captures something real: that small company on the verge of failure saw a phone call from TSMC as a lifeline.

But that rope almost became a noose. In 1998, an error in one of TSMC's chemical processes caused a large batch of NVIDIA chips to be scrapped, nearly dragging the company down again[^23]. So the more honest formulation is this: Taiwan was not NVIDIA's "bankruptcy savior"; Taiwan was its "manufacturing lifeline." That lifeline bound both sides. Taiwan once caught it, and Taiwan once nearly sank it. Symbiosis was never a one-way favor.

The next part of the story is more familiar. In 2006, NVIDIA launched CUDA, a decision almost everyone considered irrational at the time. In 2012, graduate student Alex Krizhevsky used two NVIDIA GTX 580 graphics cards in a bedroom at his parents' house to train AlexNet, cutting the ImageNet image-recognition error rate from 26% to 15.3%[^24]. That moment proved that the GPU was the engine of deep learning. In 2022, ChatGPT detonated global hunger for computing power, and NVIDIA's market value began rising like a rocket.

```tw-timeline
1993 | NVIDIA founded in Silicon Valley | Jensen Huang and two co-founders make graphics chips
1996 | Jensen Huang writes to Morris Chang | Seeking TSMC foundry support; formal agreement in 1998; the physical body connects to Taiwan
2006 | CUDA launched | Turns the GPU into a general-purpose computing platform; seen as a wild decision at the time
2012 | AlexNet trained on two GTX 580s | Proves GPU = deep learning engine
2022 | ChatGPT released | Global demand for compute explodes; NVIDIA's market value takes off
2025 | Market value breaks US$5 trillion | First company in history to do so; announces overseas headquarters in Taiwan the same year
Sources: The Nvidia Way, Acquired podcast, Wikipedia, CNBC
```

From a small company thirty days from collapse to history's first US$5 trillion company, every chip along the way was made in Taiwan.

![Jensen Huang holding an RTX Blackwell GPU during his 2025 CES keynote](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)
_Jensen Huang holding up the next-generation Blackwell GPU at CES in 2025. From a founder who had to say every month that "we are thirty days from going out of business" to the person holding the most sought-after chip in the world, that chip still has to be made in Taiwan. Photo: Pronoia, CC0._

## Does Irreplaceability Have an Expiration Date

This leads to a question that must be faced honestly: is Taiwan's "irreplaceability" permanent, or does it have a time boundary?

In the short term, the boundary is so hard that there is almost no opening. From 2025 to 2027, NVIDIA's most advanced AI GPUs, from fabrication to final packaging, are 100% pinned to TSMC's CoWoS-L lines inside Taiwan[^25]. TSMC controls roughly 90% to 92% of the world's advanced processes below 5 nanometers, and its advanced packaging capacity exceeds that of all competitors combined[^26]. Research by National Taiwan University of Science and Technology professor Yuntsai Chou states it plainly: diversifying TSMC foundry production is not feasible in the short term; building a new leading-edge fab takes three to four years and more than US$10 billion[^27].

The strongest engineering evidence is not in any report, but in NVIDIA's own product design. The next-generation Rubin Ultra was originally planned to use a "four-die" package. But in April 2026, TrendForce noted that the four-die package would expand the package area to 7.5 to 8 times the reticle limit, "severely dragging down yield and cost," so the design "is now shifting to a dual-die architecture"[^4]. This sentence deserves to be read slowly: the physical limit of Taiwan's packaging yield is determining, in reverse, what NVIDIA's chips should look like. Even the world's strongest chip-design company has to redesign around Taiwan's yield. This is already a bottleneck at the physical layer, hard enough to leave no room for negotiation.

But a "hard short-term boundary" is not the same as "forever." Taiwan has painful precedents.

In 2002, Taiwan promoted the "Two Trillion, Twin Star" industrial policy. Flat panels and DRAM memory were also once treated as irreplaceable national lifelines. What happened? Because Taiwan lacked core technologies and R&D spending was only 6%, far below the 10% to 21% levels in South Korea, Japan, the United States, and Europe, the two industries were hollowed out by South Korea and China. A later United Daily News retrospective was cutting: "The once-glorious flat-panel makers and semiconductor memory makers suffered heavy losses a few years later because of oversupply in the international market, and netizens mocked them as 'Maoshan priests' (a pun on gross margins of three to four), meaning their product gross margins were only 3% to 4%; the 'Two Trillion, Twin Star industries' became the 'Two Trillion, Heartbreak industries.'"[^28]

> ⚠️ **How this time differs from flat panels and DRAM:** Flat panels and DRAM were hollowed out because Taiwan did not control core technologies and anyone could catch up. The moat around AI this time appears much deeper: TSMC does control process IP, and CoWoS packaging yield and the stickiness of the entire ecosystem cannot be replicated in three to five years by throwing money at them. But this is not a reason for Taiwan to rest easy. SMIC has claimed mass production at 5 nanometers; although its yield is only one-third of TSMC's and its cost is 50% higher, leaving it roughly five years behind[^29]. But five years is not forever in the technology industry. Treating "being deeply depended upon" as "being forever safe" is exactly the mistake made by the people of 2002.

After 2028, cracks begin to appear. In December 2025, NVIDIA spent about US$5 billion to take a stake in Intel. Its real purpose was to "ensure priority access to Intel's advanced packaging capacity in the United States," expected for use in the 2028 Feynman architecture[^30]. TSMC's Arizona packaging facility AP1 is expected to enter mass production in 2028[^31]. Taiwan's Powertech has developed PiFO packaging as a counterpart to CoWoS-L, with production costs about 30% lower, and "multiple U.S. AI chipmakers" have rushed to seek its help[^32]. These are all real signs of loosening, but none has yet entered the main supply chain for NVIDIA's most advanced GPUs.

One figure best captures the subtlety of the current situation: TrendForce forecasts that the CoWoS supply-demand gap will shrink from about 20% now to around 10% by the end of 2026[^33]. But the gap is shrinking because TSMC itself is expanding capacity, not because substitute suppliers are filling it[^33]. In other words, up to today, this bottleneck can still be solved only by Taiwan itself.

Irreplaceability is an engineering fact, but it has a hard boundary written somewhere near 2028. Taiwan's bargaining chip has a shelf life.

## NT$4.434 Billion: A City Clears Land for a Trillion-Dollar Company

If gross margin is an abstract scale of power, what happened in the Beitou-Shilin Technology Park in Taipei in the second half of 2025 is one of its sharpest slices.

The story begins in 2021. The Taipei City Government put two Beitou-Shilin Technology Park plots, T17 and T18, totaling 3.89 hectares, up for sale as 50-year superficies rights. Shin Kong Life was the only bidder and won with NT$4.4 billion[^34]. For the next three years, the land sat idle and overgrown.

In May 2025, Jensen Huang announced at Computex that NVIDIA's overseas headquarters, "Constellation," was intended for the Beitou-Shilin Technology Park[^35]. But a problem emerged: the superficies rights were still held by Shin Kong Life, and publicly tendered superficies rights could not be directly transferred. NVIDIA, Shin Kong Life, and the Taipei City Government were stuck for five months over this land[^36].

The final solution was for the Taipei City Government to pay Shin Kong Life to leave. On November 12, 2025, the Taipei City Council unanimously approved a termination payment of NT$4.434 billion, to be paid by the city government to Shin Kong Life in order to take back the land[^37]. The full figure was NT$4,434,064,085[^37].

```tw-figure
NT$4,434,064,085
The termination payment made by the Taipei City Government to Shin Kong Life to take back the Beitou-Shilin Technology Park site and hand it to NVIDIA (approved by the city council on 2025/11/12)
Taipei City Council, CNA, Next Apple News
```

The termination bill submitted by Shin Kong Life set off an uproar in the council. Kuomintang councilor Yu Shu-hui wrote after receiving the bill: "When I saw that in Shin Kong Life's eight-page bill, even weed removal, environmental maintenance, logo adjustment, and scrivener fees were all being charged back to the Taipei City Government, I could only force a bitter smile. Isn't environmental maintenance something the tenant was supposed to do in the first place? Even the logo adjustment cost for the Taishin-Shin Kong Life merger has to be paid by the Taipei City Government? I nearly fainted... sigh, three helpless sighs."[^38] But she still voted in favor, adding a line that captured the mood in the chamber: "Shin Kong Life's bill is unfathomable, but the greater good comes first"[^38].

That day, the council witnessed a rare scene: the blue, green, and white parties were unusually harmonious, and the Democratic Progressive Party caucus even shouted, "Support NVIDIA, sign the contract as soon as possible"[^39]. One parcel of land and one foreign company made parties that usually bite at one another speak with one voice.

> 📝 **Curator's note:** It is worth pausing to look at this power structure. To let a trillion-dollar company land in Taipei, a city's government and council used public funds, crossed party lines, overcame every obstacle, and cleared a parcel of land still occupied by the previous tenant. NVIDIA did not pay this NT$4.434 billion; Taipei taxpayers fronted the money, with only Shin Kong Life's own costs and already paid taxes, totaling NT$1.441 billion, to be assumed in aggregate by NVIDIA[^40]. "Being indispensable does not mean calling the shots" takes its most concrete form here: when you need someone too badly to stay, you will pay bills for them that were never yours to pay.

## Is the Headquarters a Signboard or a Root

So what has NVIDIA given Taiwan? This has to be viewed in two parts, otherwise it is easy to misjudge.

One part is the "signboard": the Constellation headquarters, modeled after the "starship" form of NVIDIA's U.S. headquarters, will accommodate about 4,000 people, begin construction in 2026, and open only in 2030. As of today, construction has not begun[^41]. Looking only at this, questioning whether the headquarters is merely a PR operation is not unreasonable.

The other part is the "root that had already been planted." NVIDIA did not come to Taiwan only in 2025. It already had an office in Taipei's Neihu District, with about 1,800 existing employees, according to media estimates rather than official figures[^42]. In 2021, it received Ministry of Economic Affairs approval for its "AI Innovation R&D Center Project," with total investment of NT$24.3 billion and government subsidies of NT$6.7 billion, and a plan to hire 1,000 new R&D staff from 2022 to 2027[^43]. In November 2025, it established "Taiwan NVIDIA Classic Co., Ltd.," increasing capital from NT$1 billion to NT$3.3 billion. This is an independent legal entity that can pay taxes and hold assets on its own[^44].

So the truth of the "headquarters landing" lies in between: the substantive R&D roots are real, and the tax-paying subsidiary has been established; but the most visible Constellation headquarters remains a blueprint. Neither half should be told alone.

## The Island Drained by This Supply Chain

Beyond the halo and the bill lies another account, paid by everyone living on this island: water, electricity, air, and housing they cannot afford.

![Exterior view of TSMC's Taichung fab, a gray building facade bearing the TSMC logo](/article-images/technology/tsmc-taichung-factory.webp)
_TSMC's Taichung fab. The physical bodies of each NVIDIA GPU generation take shape inside fabs like this, and the water and electricity these fabs draw away are another bill this island is paying. Photo: Briáxis F. Mendes, CC BY-SA 4.0._

Start with electricity. In 2023, TSMC used 24.775 billion kWh of electricity, accounting for 8.96% of Taiwan's total electricity consumption[^45]. S&P predicts that by 2030, TSMC's electricity use may reach 23.7% of Taiwan's total[^45]. In other words, by then, nearly one in every four kWh of electricity in Taiwan may be consumed by this one company.

```tw-line
TSMC electricity use as a share of Taiwan's total: one company drawing nearly 1/4 of an island's power (%)
Year | Share
2023 | 8.96
2030 | 23.7
Sources: S&P, TSMC CSR report
```

Carbon emissions rise with it. Greenpeace's April 2025 report, The Dark Side of the Chip Boom, calculated that electricity use for global AI chip manufacturing surged from 218 GWh to 984 GWh, an annual increase of more than 3.5 times; Taiwan alone saw electricity use soar to 375.8 GWh, "as high as 38% of the global total"[^46]. Because TSMC relies heavily on fossil fuels, its AI chip manufacturing produced 185,700 metric tons of CO2 equivalent, and Greenpeace directly named it the "carbon emissions champion" of AI chip manufacturing[^46].

What about NVIDIA itself? Greenpeace gave it an F. The report wrote that NVIDIA's "supply chain emissions nearly doubled over the past three years, rising from 3.51 million metric tons in 2022 to 6.91 million metric tons in 2024," while what it was doing was "merely shifting the supply chain's carbon emissions and pollution onto other parts of the world"[^46]. In other words, the valuation and halo sit under NVIDIA's name, while the carbon emissions and pollution remain in Taiwan's sky.

Water, too. TSMC uses more than 200,000 metric tons of water per day; the 81,000 metric tons supplied each day by four reclaimed-water plants in Tainan go "almost entirely to TSMC"[^47]. The cost falls on farmland: farmland in Chianan was twice left unirrigated, in 2021 and 2023, to divert water to the semiconductor industry[^48]. Making one 12-inch wafer requires 8,327 liters of water[^49], and on this island, some farmers' fields once stopped cultivation so chips could have water.

Then there is housing. After NVIDIA announced that it would establish its headquarters in the Beitou-Shilin Technology Park, home prices in the area moved first. Taipei's Department of Economic Development estimates that the park's resident working population may eventually reach 60,000, but 591 statistics show only about 1,476 homes available for sale, with residential land accounting for only 13.8% of the district[^50]. When 60,000 people compete for 1,476 homes, the direction of prices is easy to imagine: reports say new projects in the core Beitou-Shilin Technology Park area have already broken NT$1.5 million per ping[^51].

Two things must be separated here to avoid misplacing the anxiety. According to actual-price registration, the highest 2025 residential building transaction in Shilin District was NT$570,400 per square meter, equivalent to about NT$1.88 million per ping, at No. 39 Jihe Road, with a total price of NT$447 million[^52]. But those sky-high transactions were luxury homes in Tianmu and urban Shilin, which are different from the Beitou-Shilin Technology Park itself; the figure of new projects breaking NT$1.5 million per ping in Beitou-Shilin Technology Park is another number reported by the media. The two figures should not be conflated. But both point to the same feeling: growth is happening on my street, yet I cannot afford to buy there.

> ⚠️ **"The company has not even broken ground, so why are prices rising?"** Local residents' backlash is real. One industry source said privately that because the park's everyday amenities are poor, "many employees are unwilling to move here with the company... and even after moving here, one-third of employees leave because transportation is inconvenient"[^53]. Anonymous opinion on PTT was blunter: the TSMC theme had been used to exhaustion, and now it was simply being swapped out for the NVIDIA theme[^54]. A headquarters that has not broken ground has already pushed up local housing prices. This is the version of K-shaped divergence closest to the dinner table. Hope must be honest: AI has indeed made Taiwan visible to the world, and the drained water and electricity and unaffordable housing are also real. Both have to be written down.

## Taiwan Is Not the Only One That Cannot Leave It

Pull the camera back, and a larger fact appears: in the relationship between NVIDIA and Taiwan, "cannot leave" is mutual, even multidirectional. Even the other side of the Taiwan Strait is caught in this structure.

![Computex exhibition floor at Taipei Nangang Exhibition Center, with broad aisles lined by information-technology booths and gathered crowds](/article-images/technology/computex-nangang-floor-2015.webp)
_The Computex floor at Taipei Nangang Exhibition Center. Every June, buyers from around the world pour into this hall for things made by Taiwan's supply chain. Taiwan has never been the only one unable to leave it. Photo: NVIDIA Taiwan, CC BY 2.0._

This is the idea of the "silicon shield": Taiwan controls chips the whole world needs, and this irreplaceability becomes a layer of protection. But the silicon shield has always been two-sided. It is both a talisman and a powder keg tied to the island. Scholars call these two sides the "Silicon Shield" and the "Silicon Trap": the same concentration can deter aggression, and it can also become an incentive for aggression or a single point of failure[^55].

An even sharper debate was stirred in 2021 by an article from the U.S. Army War College that proposed an extreme "scorched earth" or "broken nest" strategy: if China invades Taiwan, Taiwan should not hesitate to destroy its own semiconductor industry to make the island profitless to the aggressor. The counterarguments were equally forceful: even if such a move successfully deterred China in the short term, the economic self-harm might merely delay aggression until China can produce semiconductors domestically; and Taiwanese people themselves are unlikely to see such industrial sabotage as being in their own interest[^56]. This is not a judgment this article will make for Taiwan, but it truly hangs behind every discussion of whether Taiwan has leverage.

The silicon shield is even being diluted by TSMC itself. To diversify geopolitical risk, TSMC is investing US$165 billion in U.S. expansion[^57]. The August 2025 headline in MIT Technology Review was "Taiwan's silicon shield could be weakening"[^58]. The concern is that moving capacity overseas will dilute Taiwan's domestic leverage and make countries such as the United States feel that Taiwan is no longer so worth defending[^58]. But Bonnie Glaser of the German Marshall Fund also reminds us that this ecosystem is not so easy to move: the ecosystem Taiwan created is truly unique, the result of its talent pipeline, culture, and laws, and cannot easily be replicated anywhere[^59]. China technology researcher Paul Triolo put it more directly: when it comes to leading-edge manufacturing, Arizona is nowhere near that level, and never will be[^60].

The clearest illustration of how asymmetrical this dependence is came in one political moment.

On May 29, 2024, Jensen Huang publicly said in Taiwan: "Taiwan is one of the most important countries in the world."[^61] A few days later, on June 2, he spoke at National Taiwan University, describing Taiwan as "an unsung hero, yet a pillar of the world"[^62].

```tw-quote
Taiwan is an unsung hero, yet a pillar of the world
Jensen Huang | NVIDIA CEO, National Taiwan University Computex speech, 2024
```

Eighteen days later, Chen Binhua, spokesperson for China's Taiwan Affairs Office, responded: "Regarding this extremely erroneous statement, people and netizens in China have already expressed strong dissatisfaction. Taiwan has never been a country... I hope he catches up on his lessons."[^63]

But what is more intriguing is something else. CNA noted at the time that Chinese financial media had published many reports on Huang's Taiwan visit, yet "did not appear to mention Huang's statement that 'Taiwan is an important country,' seeming to omit a sensitive issue usually regarded as 'the most important of the important'"[^64]. In other words, officials protested sternly, while financial media chose to mute the matter.

> 📝 **Curator's note:** This muting reveals where power really sits. China needs NVIDIA's chips, so even after Jensen Huang said the thing Beijing finds most unacceptable, Chinese media chose not to report it or amplify it, fearing damage to the relationship with this "AI godfather." A widely circulated line says: China needs NVIDIA, but NVIDIA does not need China[^65]. In this relationship, even the vast market across the Taiwan Strait has, to some degree, had its neck caught by an American company's supply chain. This is the island of Taiwan's strange position: the entire world, including the side that most wants to change its status, cannot do without the chips made here. But "the whole world cannot leave you" and "you are therefore safe and get to decide" remain two different things. This article does not draw a political conclusion for Taiwan, but the tension itself is worth every reader weighing for themselves.

## Indispensable, Not Necessarily Decisive

Returning to the wall of logos featuring 55 companies.

Every name on that wall is real. They are the flesh and blood of the global AI revolution; without them, NVIDIA could not deliver even a single chip worth five billion dollars. This irreplaceable nature is an engineering fact, not rhetoric. Taiwan ought to be proud of this.

However, looking at the journey so far, the halo, the valuation, and the decision-making power rest with those who built this wall; while the 5% gross margin, the drawn-down utilities, the housing prices pushed beyond reach, and the geopolitical risk tied to the island fall upon the names on the wall. Taiwan holds a global switch that cannot be turned off, yet it has not been able to dictate terms because of it. Furthermore, this bargaining chip has an expiration date around 2028.

Taiwan is not static. Lai Ching-te proposed in 2025 to make Taiwan one of the "top five global computing centers" and develop "sovereign AI" [^66]; Foxconn is building a national supercomputer in Kaohsiung using ten thousand Blackwell chips [^67]; and the Executive Yuan's "AI New Ten Great Projects" aims to invest over NT$100 billion, targeting an output value of 15 trillion [^68]. This is an ambition to grow "own computing" from "contract manufacturing" for others: climbing one step up the smile curve.

Yet, this path is still long. Taiwan's own language model, TAIDE, has been described as being at a "high school student" level, while international giants are already at the "graduate student" level [^69]. The South Korean government purchased 260,000 GPUs in one go, while Taiwan is still haggling over land and severance pay [^70]. From receiving a call from Morris Chang to handling the computing power of the entire world, Taiwan spent nearly thirty years to reach this wall. But standing on the wall and taking the pen are two different things.

That wall will continue to shine. At the next Computex, Jensen Huang's backboard will feature more logos. In 2026, he revealed that NVIDIA's annual expenditure in Taiwan was about $150 billion, up from only $10–$15 billion five years ago [^71]. The question of "how important is Taiwan?" has long had an answer. What Taiwan must answer is the harder one: when the whole world cannot do without what you produce, how do you make "indispensable" slowly turn into "decisive"?

The names on the wall are growing more numerous. Will the person holding the pen eventually be Taiwan itself—this pen, Taiwan has only just begun to grasp.

---

**Further Reading**:

- [Jensen Huang: From Young Man Cleaning Toilets to CEO of a Trillion-Dollar Empire](/en/people/jensen-huang) — The personal life story of NVIDIA's founder; this article touches lightly on his Tainan roots and growth story.
- [Semiconductor Industry](/en/technology/taiwan-semiconductor-industry) — Why Taiwan became the global center for chip manufacturing; this article discusses the supply chain in more detail.
- [Taiwanese Company: TSMC](/en/economy/tsmc) — The "national treasure" that manufactures every chip for NVIDIA, and the other side of it being drained.
- [Morris Chang: The Recipient of That Letter and the Foundry Empire He Built](/en/people/tsmc-morris-chang) — The founder of TSMC who received a letter from Jensen Huang in 1996.
- [Computex: Taipei's Computer Show Becomes Global AI Opening Ceremony](/en/technology/computex) — The stage where the wall of logos shines, Taiwan technology industry's annual main event.
- [Artificial Intelligence Industry](/en/technology/artificial-intelligence-industry) — From manufacturing NVIDIA chips to building an AI ecosystem, Taiwan's position in the AI wave.
- [Taiwan's AI Development and Future Strategy](/en/technology/artificial-intelligence-development-strategy) — Sovereign AI, TAIDE, and Taiwan's national ambition to climb up from contract manufacturing.
- [Taiwan Tech Stories: 100-Point Chips, 60-Point Microphones](/en/technology/taiwan-tech-storytelling) — Two ways of telling the story of the same chip: the premium earned by NVIDIA, and what Taiwan's technology needs to learn.
- [Taiwanese Company: Foxconn Precision Industry](/en/economy/foxconn-precision-industry) — The manufacturing giant assembling 40% of global AI racks, the biggest hands at the bottom of the smile curve.

## Image Sources

- [Jensen Huang at Computex Taipei](https://commons.wikimedia.org/wiki/File:Jensen_Huang_at_Computex_Taipei_20160531c.jpg) — Photo: NVIDIA Taiwan, 2016, CC BY 2.0 (hero, Jensen Huang speaking on the Computex stage)
- [NVIDIA Ampere GA102 GPU die](<https://commons.wikimedia.org/wiki/File:Nvidia@8nm@Ampere@GA102@GeForce_RTX_3090@S_TW_2032A1_SNNB9W.000_GA102-300-A1_DSC06025-DSC06107_(50740715646).jpg>) — Photo: Fritzchens Fritz, CC0 (micrograph of chip die)
- [Jensen Huang holding RTX Blackwell at CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Photo: Pronoia, CC0
- [TSMC factory in Taichung](https://commons.wikimedia.org/wiki/File:TSMC_logo_on_Taichung_factory_building.jpg) — Photo: Briáxis F. Mendes, CC BY-SA 4.0
- [Computex Taipei at Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Photo: NVIDIA Taiwan, 2015, CC BY 2.0
- Video: [NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025](https://www.youtube.com/watch?v=TLzna9__DnI) — NVIDIA official YouTube channel

## References

[^1]: [NVIDIA becomes first company to hit $5 trillion market cap](https://www.cnbc.com/2025/10/29/nvidia-5-trillion-market-cap.html) — CNBC reported on October 29, 2025, that NVIDIA became the first company in history to surpass US$5 trillion in market value, driven by demand for AI compute.

[^2]: [Taiwan accounts for 90% of the global AI server market](https://technews.tw/) — Data from Taiwan's Ministry of Economic Affairs and MIC: Taiwan's server industry originally shipped more than 80% of the global total, while outsourced AI server production and assembly now account for 90% of the world total, reaching 100% when U.S.-brand suppliers are included; the driver is U.S. customers' demand for production outside China.

[^3]: [TrendForce: NVIDIA becomes TSMC's largest customer](https://www.trendforce.com/) — TrendForce data from June 1, 2026: "Customer A" (NVIDIA) increased its revenue contribution to TSMC from 12% in 2024 to 19% in 2025, surpassing Apple (22% to 17%) to become the largest customer. Primary source: TSMC 2025 annual report (investor.tsmc.com).

[^4]: [TrendForce: Rubin Ultra shifts to dual-die architecture](https://www.trendforce.com/news/) — TrendForce analysis from April 1, 2026: four-die packaging would expand area to 7.5-8 times the reticle limit, "severely dragging down yield and cost," so the design shifted to dual-die architecture; AI will occupy 36% of 3-nanometer capacity in 2026, compared with only 5% in 2025. Physical limits in packaging yield directly determine chip architecture.

[^5]: [NVIDIA FY2025 10-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — NVIDIA's FY2025 annual report filed with the U.S. Securities and Exchange Commission, reporting a full-year GAAP gross margin of 75.0% (72.7% in FY2024).

[^6]: [Jensen Huang Computex 2025 speech roundup: logo wall of 55 Taiwanese companies](https://money.udn.com/money/story/5612/8750451) — Economic Daily News roundup listing the 55 Taiwanese companies named on the Computex 2025 stage backdrop (AAEON, Accton, Delta Electronics... TSMC, UMC, Unimicron, Wistron, Wiwynn, Supermicro); another report said the stage backdrop plus thank-you video totaled 122 companies.

[^7]: [NVIDIA's dependence on TSMC 3/4 nanometer processes](https://www.ainvest.com/news/) — Industry analysis: NVIDIA's most profitable H200, Blackwell, and Rubin chips all rely on TSMC 3-nanometer and 4-nanometer processes, forming a dual bottleneck in manufacturing and packaging.

[^8]: [NVIDIA FY2025 10-K supply-chain concentration disclosure (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — NVIDIA annual report text: "Our supply chain is mainly concentrated in the Asia-Pacific region. We utilize foundries, such as Taiwan Semiconductor Manufacturing Company Limited, or TSMC... to produce our semiconductor wafers." Risk Factors list geographic concentration of suppliers, wafer foundries, packaging, and testing as geopolitical risk.

[^9]: [TSMC CoWoS capacity and NVIDIA share](https://www.financialcontent.com/article/tokenring-2025-12-26-tsmc-boosts-cowos-capacity) — FinancialContent and SiliconAnalysts data: NVIDIA accounts for about 60% of TSMC's CoWoS capacity (SiliconAnalysts says about 595,000 wafers), while Taiwanese media say it reached 70% in 2025; the top three customers (NVIDIA, Broadcom, AMD) account for more than 85%.

[^10]: [Foxconn's AI rack assembly market share exceeds 40%](https://vocus.cc/) — E.Sun Securities Investment Consulting estimates that Foxconn (Ingrasys) is responsible for GB200 NVL72 GPU modules, switch boards, compute boards, and rack systems, with more than 40% market share. Its Southern Ching plant was certified by the World Economic Forum as the world's first AI server lighthouse factory in December 2023.

[^11]: [Quanta's share exceeds half among the top 50 data centers](https://www.artificialintelligence-news.com/news/ai-servers-transform-taiwan-manufacturing-giants/) — AI News reported that Quanta (QCT) handles L10 and L11 integration, has more than 50% share among the top 50 cloud data centers, and is the world's second-largest server assembler.

[^12]: [Wistron's new Zhubei AI plant fully booked by NVIDIA orders](https://vocus.cc/) — Industry report: Wistron is responsible for HGX/DGX, and its new Zhubei AI park plant has been "fully booked by NVIDIA's strong orders."

[^13]: [Taiwanese AI server gross margin figures from investor conferences](https://www.cnyes.com/) — FY2025-FY2026 quarterly investor conferences: Foxconn Q1 FY2026 gross margin 6.18% (AI servers exceed half of cloud networking revenue), Quanta 4.78% (down 1.54 percentage points quarter-on-quarter, a nearly 15-quarter low), Wistron 5.21%, Wiwynn 7.2% (9.4% in the same period last year).

[^14]: [Secondary-supply-chain Taiwanese company gross margins (E.Sun Securities Investment Consulting)](https://vocus.cc/) — Taiwanese firms closer to the technology end have higher margins: Delta Electronics (power/thermal management) has more than 60% share in AI server power supplies and Q1 FY2026 gross margin of 37%; Unimicron (ABF substrates) has more than 70% share in AI ASIC substrates, is currently the sole supplier of NVIDIA CoWoP boards, and has an estimated gross margin of 21.3%.

[^15]: [Morgan Stanley: ODM assembly value-added gross margin declines](https://newtalk.tw/) — Newtalk cited a Morgan Stanley report dated May 22, 2026: ODM complete-system assembly value-added gross margin falls from 2.7% for GB300 to about 1.9% for VR200; ODM value-added amount per rack rises from about US$108,000 for GB300 to US$149,600 for VR200. Note: this is value-added gross margin for complete-system assembly, a different dimension from overall company gross margin (5-7%).

[^16]: [Taiwan Insight: Most people have not felt the benefits of Taiwan's thriving economy](https://taiwaninsight.org/) — Min-Hua Chiang of the University of Nottingham wrote on January 12, 2026: "most people in Taiwan did not feel the benefits of the thriving economy." "The top 10% earners in Taiwan received 48% of total income, whereas the bottom 50% only received 12%." Estimated economic growth in 2025 was 7.37%, among the world's leaders.

[^17]: [The Reporter: K-shaped divergence under the AI boom](https://www.twreporter.org/) — Commentary by Wang Ying-ta in The Reporter on June 11, 2026: "The directly employed population along the main growth chain of AI, semiconductors, and electronics supply chains accounts for less than 10% of total employment." "The total monthly salary per person in food service is NT$38,484, only 34.6% of that in electronic components manufacturing." The share of electronics-related industries in manufacturing revenue rose from 58.0% to 64.7%.

[^18]: [The Nvidia Way: thirty days from going out of business](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Tae Kim's 2024 book and the Acquired/Sequoia podcast: NVIDIA's internal maxim, "Our company is thirty days from going out of business," used to open each monthly company meeting; when the RIVA 128 shipped in August 1997, the company had roughly one month of payroll left. This was an English maxim, with no Chinese verbatim version.

[^19]: [SEGA's US$5 million saved NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Acquired podcast and NVIDIA early history: what actually pulled NVIDIA out of its late-1990s financial crisis was a US$5 million payment from SEGA, not Taiwan; this clarifies the romanticized claim that "Taiwan saved NVIDIA."

[^20]: [Jensen Huang wrote to Morris Chang seeking foundry manufacturing](https://www.ettoday.net/) — ETtoday cited that around 1996, Jensen Huang wrote to TSMC founder Morris Chang asking whether "TSMC could manufacture NVIDIA's first chip." In 1998, the two sides formally signed a cooperation agreement, and TSMC became the main wafer foundry.

[^21]: [TSMC's Y.J. Mii: far-reaching cooperation began in 1997](https://technews.tw/) — TechNews report on May 19, 2025: TSMC's Y.J. Mii recalled, "The far-reaching cooperation began at a critical moment, in 1997. TSMC founder Morris Chang personally contacted NVIDIA founder Jensen Huang in response to NVIDIA's request for foundry services."

[^22]: [The scene of Jensen Huang receiving Morris Chang's phone call (second-hand retelling)](https://www.businessweekly.com.tw/) — Business Weekly book-excerpt comic retold that when Jensen Huang received Morris Chang's call, he shouted to those around him, "Everyone! Keep it down! It's Morris Chang calling!" This is second-hand retelling, and the tone may not be precise.

[^23]: [A 1998 TSMC process error nearly destroyed NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Acquired podcast and NVIDIA early history: in 1998, an error in one of TSMC's chemical processes caused a large batch of NVIDIA chips to be scrapped, nearly dragging the company down again, supporting the two-way symbiosis framing of "Taiwan as manufacturing lifeline, not bankruptcy savior."

[^24]: [AlexNet trained on two GTX 580s](https://en.wikipedia.org/wiki/AlexNet) — Wikipedia and Tom's Hardware: in 2012, Alex Krizhevsky trained AlexNet in a bedroom at his parents' house using two NVIDIA GTX 580 graphics cards, reducing the ImageNet image-recognition error rate from 26% to 15.3%, 10.8 percentage points ahead of second place, proving the GPU as the deep learning engine. CUDA was launched in 2006.

[^25]: [Blackwell/Rubin 100% dependent on Taiwan-based CoWoS-L](https://finance.biggo.com/news/) — Industry analysis citing the Financial Times: from 2025 to 2027, NVIDIA's most advanced AI GPUs, from manufacturing to final packaging, are 100% pinned to TSMC CoWoS-L lines inside Taiwan.

[^26]: [TSMC controls about 90-92% of global advanced processes](https://www.csis.org/analysis/countering-chinas-challenge-american-ai-leadership) — CSIS analysis: TSMC produces about 92% of the world's most advanced semiconductors below 5 nanometers, and its advanced packaging capacity exceeds that of all competitors combined; customers almost 90% dependent on Taiwan include Apple, Amazon, Google, NVIDIA, and Qualcomm.

[^27]: [NTUST's Yuntsai Chou: TSMC foundry production cannot be diversified in the short term](https://www.sciencedirect.com/) — 2025 study by Yuntsai Chou of National Taiwan University of Science and Technology: "Taiwan's supply chain would be particularly vulnerable to a quarantine initiated before 2027." "Diversifying TSMC foundries is not feasible in the short term. Building a new leading-edge fab takes 3-4 years and costs $10B+." TSMC Arizona's 2-nanometer mass production target is 2030.

[^28]: [United Daily News: "Two Trillion, Twin Star" became "Two Trillion, Heartbreak Industries"](https://udn.com/) — United Daily News retrospective on the Two Trillion, Twin Star policy: "The once-glorious flat-panel makers and semiconductor memory makers suffered heavy losses a few years later because of oversupply in the international market, and netizens mocked them as 'Maoshan priests' (a pun on gross margins of three to four), meaning their product gross margins were only 3% to 4%; the 'Two Trillion, Twin Star industries' became the 'Two Trillion, Heartbreak industries.'" Flat panels and DRAM were hollowed out because R&D spending was only 6%, far below South Korea, Japan, the United States, and Europe at 10-21%.

[^29]: [SMIC 5-nanometer yield only one-third of TSMC's](https://technews.tw/2025/03/28/) — TechNews report on March 28, 2025: "SMIC 5-nanometer wafers using the same manufacturing process are priced 50% higher than TSMC's, and because SMIC has only DUV equipment, yield is only 33% of TSMC's"; by December 2025, it had claimed mass production, lagging by about five years.

[^30]: [NVIDIA takes US$5 billion Intel stake to secure packaging capacity](https://www.intel.com/) — In December 2025, NVIDIA acquired about 5% of Intel. Its real purpose was to "ensure priority access to Intel's advanced packaging capacity in the United States," evaluated for use in the 2028 Feynman architecture in response to TSMC's CoWoS bottleneck. This is a long-term hedge, not a short-term substitute.

[^31]: [TSMC Arizona packaging facility AP1 to begin mass production in 2028](https://www.tomshardware.com/) — Industry report: TSMC Arizona AP1/AP2 packaging facilities will begin construction in early 2026, with AP1 expected to enter mass production in 2028; currently, 100% of chips, including those made in Phoenix, Arizona, still have to be shipped back to Taiwan for packaging. Amkor's Arizona plant is expected to begin mass production in early 2028.

[^32]: [Powertech PiFO packaging benchmarks against CoWoS-L](https://www.trendforce.com/news/) — TrendForce, November 10, 2025: "PiFO advanced packaging technology-benchmarked against TSMC's CoWoS-L-has emerged as the industry's top alternative." Glass substrates offer better heat dissipation, production costs are about 30% lower, and multiple U.S. AI chipmakers have sought help, with orders booked through 2027. But the customers are "other U.S. AI chipmakers," not explicitly NVIDIA's main GPUs.

[^33]: [TrendForce: CoWoS gap narrows through TSMC's own expansion](https://www.trendforce.com/news/) — TrendForce, June 15, 2026: "the CoWoS supply-demand gap is expected to narrow significantly from around 20% currently to about 10% by the end of 2026"; monthly capacity may reach a record 120,000 to 140,000 wafers in 2026. The gap is narrowing because TSMC itself is expanding capacity, not because substitute suppliers are filling in.

[^34]: [Shin Kong Life won superficies rights for Beitou-Shilin Technology Park T17/T18 in 2021](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: in 2021, the Taipei City Government tendered Beitou-Shilin Technology Park T17 and T18, totaling 3.89 hectares, as 50-year superficies rights, with the investment plan requirement removed. Shin Kong Life was the only bidder, winning T17 for NT$2.8 billion and T18 for NT$1.6 billion, totaling NT$4.4 billion; the land sat idle for three years.

[^35]: [Jensen Huang announces at Computex 2025 that Constellation headquarters will locate in Beitou-Shilin Technology Park](https://focustaiwan.tw/business/202505190009) — Focus Taiwan: at Computex in May 2025, Jensen Huang announced that NVIDIA's overseas headquarters, "Constellation," was planned for Beitou-Shilin Technology Park, with investment exceeding NT$40 billion, construction beginning in 2026, opening in 2030, and more than 10,000 jobs.

[^36]: [NVIDIA, Shin Kong Life, and Taipei City Government stuck for five months](https://news.pts.org.tw/article/777650) — PTS: because the Beitou-Shilin Technology Park T17/T18 superficies rights were held by Shin Kong Life and publicly tendered superficies rights could not be directly transferred, the three parties were stuck for about five months over land acquisition.

[^37]: [Taipei City Council approves NT$4.434 billion termination payment](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: on November 12, 2025, Taipei City Council unanimously approved a termination payment of NT$4,434,064,085, to be paid by the city government to Shin Kong Life to take back the land; the superficies rights were canceled on December 28.

[^38]: [Yu Shu-hui criticizes Shin Kong Life termination bill](https://www.nextapple.com/) — Next Apple News, verified via WebFetch: Kuomintang councilor Yu Shu-hui said verbatim: "When I saw that in Shin Kong Life's eight-page bill, even weed removal, environmental maintenance, logo adjustment, and scrivener fees were all being charged back to the Taipei City Government, I could only force a bitter smile... Even the logo adjustment cost for the Taishin-Shin Kong Life merger has to be paid by the Taipei City Government? I nearly fainted... sigh, three helpless sighs." Later: "Shin Kong Life's bill is unfathomable, but the greater good comes first."

[^39]: [Plain Law: council parties harmoniously approve termination case](https://plainlaw.me/) — Plain Law Movement: "On November 12, Taipei City Council reviewed and passed the NT$4.434 billion termination payment case. The parties were harmonious throughout the process, and the Democratic Progressive Party caucus even shouted, 'Support NVIDIA, sign the contract as soon as possible.'" Council speaker Tai Hsi-chin said there was "no objection, filed for reference," and applause sounded in the chamber.

[^40]: [Analysis of the NT$4.434 billion termination payment composition](https://www.nextapple.com/) — Next Apple News and Taipei City Government contracted accountants: Shin Kong Life had originally paid about NT$3.3 billion, with no construction for three years, and submitted a NT$4.47 billion termination bill including weed removal, logo adjustment, and fencing costs. Accountants removed about NT$40 million, setting the figure at NT$4.434 billion; of this, Shin Kong Life's own costs and taxes already paid, totaling NT$1.441 billion, are to be assumed in aggregate by NVIDIA.

[^41]: [Urban Planning Commission approves Constellation starship-shaped headquarters design](https://www.cna.com.tw/news/) — CNA, January 26, 2026: T17 (2.29 hectares) and T18 (1.6 hectares) will be combined; building coverage ratio increases from 50% to 70%, floor area ratio 300%, height 119.5 meters, modeled after the "starship" form of NVIDIA's U.S. headquarters, 80% green coverage, capacity of about 4,000 people, construction beginning at the end of 2026, opening in 2030.

[^42]: [NVIDIA has about 1,800 existing employees in Taiwan](https://www.digitimes.com/news/a20250519PD231/) — Digitimes and other media estimates: NVIDIA's Taipei Neihu office at No. 8 Jihu Road has about 1,800 existing employees and three branch companies; this is a media estimate, not an official figure.

[^43]: [NVIDIA AI Innovation R&D Center Project](https://focustaiwan.tw/business/202505190009) — Focus Taiwan and Ministry of Economic Affairs: NVIDIA's "AI Innovation R&D Center Project" was approved in 2021, with total investment of NT$24.3 billion and government subsidies of NT$6.7 billion, and the hiring of 1,000 new R&D staff from 2022 to 2027.

[^44]: [Taiwan NVIDIA Classic Co., Ltd. established](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: NVIDIA established "Taiwan NVIDIA Classic Co., Ltd." in November 2025, increasing capital from NT$1 billion to NT$3.3 billion. It is an independent legal entity that can pay taxes and hold assets on its own.

[^45]: [S&P: TSMC electricity use may reach 23.7% of Taiwan's total by 2030](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — Initium Media and S&P: TSMC's 2023 electricity use was 24.775 billion kWh, accounting for 8.96% of Taiwan's total and 16.2% of the industrial sector; 2024 electricity use was 27.456 billion kWh, with renewable energy only 14.1%; S&P forecasts electricity use may reach 23.7% of Taiwan's total by 2030.

[^46]: [Greenpeace, The Dark Side of the Chip Boom](https://www.greenpeace.org/taiwan/press/44037/) — Greenpeace report, April 10, 2025, with verifiable text: global AI chip manufacturing electricity use rose from 218 GWh to 984 GWh, an annual increase of more than 3.5 times; Taiwan's electricity use surged to 375.8 GWh, "as high as 38% of the global total"; TSMC's AI chip carbon emissions reached 185,700 metric tons, making it the "carbon emissions champion"; NVIDIA received an F rating, with supply-chain emissions rising over three years from 3.51 million metric tons to 6.91 million metric tons, "merely shifting the supply chain's carbon emissions and pollution onto other parts of the world."

[^47]: [Tainan reclaimed water goes almost entirely to TSMC](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — Initium Media: TSMC uses more than 200,000 metric tons of water per day (56,000 in Hsinchu Science Park, 53,000 in Central Taiwan Science Park, and 99,000 in Southern Taiwan Science Park); the 81,000 metric tons per day supplied by four reclaimed-water plants in Tainan go "almost entirely to TSMC."

[^48]: [Chianan farmland was left unirrigated in 2021 and 2023 to divert water to semiconductors](https://theinitium.com/) — Initium Media and other reports: farmland in the Chianan area was twice left unirrigated, in 2021 and 2023, so irrigation water could be diverted for semiconductor industry use.

[^49]: [One 12-inch wafer requires 8,327 liters of water](https://www.greenpeace.org/taiwan/) — Greenpeace and industry data: manufacturing one 12-inch wafer requires about 8,327 liters of water.

[^50]: [60,000 Beitou-Shilin Technology Park workers competing for 1,476 homes](https://house.udn.com/house/story/123590/8769929) — Economic Daily News real estate: Taipei's Department of Economic Development estimates that Beitou-Shilin Technology Park's resident working population may reach 60,000; 591 statistics show only about 1,476 homes available for sale, with residential land only 13.8% of the district.

[^51]: [New projects in core Beitou-Shilin Technology Park area break NT$1.5 million per ping](https://www.ctee.com.tw/news/20260603701575-430601) — Commercial Times, June 2026: new projects in the core Beitou-Shilin Technology Park area transacted above NT$1.5 million per ping; "60,000 people competing for 1,500 homes"; locals worry about Neihu-style traffic congestion and question, "The company has not even broken ground, so why are prices rising?"

[^52]: [Actual-price registration: Shilin District's highest residential transaction reached NT$1.88 million per ping](https://lvr.land.moi.gov.tw/) — Ministry of the Interior real estate actual-price inquiry service: the highest 2025 residential building transaction in Shilin District was NT$570,400 per square meter, about NT$1.88 million per ping, at No. 39 Jihe Road, with a total price of NT$447 million; multiple transactions exceeded NT$1.5 million per ping. Note: these were luxury homes in Tianmu and urban Shilin, not Beitou-Shilin Technology Park itself.

[^53]: [Industry source: poor amenities in the park, one-third of employees leave](https://house.udn.com/house/story/123590/8769929) — United Daily News real estate citing an anonymous industry source: "because everyday amenities are poor, many employees are unwilling to move here with the company... and even after moving here, one-third of employees leave because transportation is inconvenient"; Transportation Commissioner Hsieh Ming-hung said Beitou-Shilin Technology Park is evaluating adding three operating bus routes.

[^54]: [Anonymous PTT opinion: swapping in the NVIDIA theme](https://www.ptt.cc/) — Anonymous PTT discussion, not individually traceable and treated as anonymous public opinion: "The TSMC effect had been used to exhaustion, now they have just swapped in the NVIDIA theme." "A lot of engineers in Neihu live in other counties and cities; once NVIDIA comes to Beitou-Shilin Technology Park, everyone will move in? The logic doesn't hold, right?"

[^55]: [Silicon shield and silicon trap debate](https://www.researchgate.net/) — 2025 ResearchGate study, "Silicon Shield or Silicon Trap?", examining the dual nature of Taiwan's chip concentration as both deterrent protection (silicon shield) and an incentive for aggression or single point of failure (silicon trap).

[^56]: [Counterargument to broken nest/scorched earth strategy](https://thenewslens.com/) — The News Lens and the U.S. Army War College Parameters article by McKinney & Harris, 2021, on the "Broken Nest" argument and counterarguments: "Economic self-harm, even if successful in deterring China in the short-term, may only delay Chinese aggression until China can meet domestic semiconductor production goals"; "it is unlikely that the Taiwanese public would view such a sabotage as in the country's own interests."

[^57]: [TSMC invests US$165 billion in U.S. expansion](https://www.foreignaffairs.com/) — TSMC announced total investment of US$165 billion in Arizona, comprising US$65 billion plus US$100 billion, to diversify geopolitical risk.

[^58]: [MIT Technology Review: Taiwan's silicon shield could be weakening](https://www.technologyreview.com/) — MIT Technology Review, August 15, 2025, "Taiwan's silicon shield could be weakening": "Now some Taiwan specialists and some of the island's citizens are worried that this 'silicon shield,' if it ever existed, is cracking." The concern is that moving capacity overseas dilutes Taiwan's domestic leverage.

[^59]: [Bonnie Glaser: Taiwan's ecosystem is difficult to replicate](https://www.technologyreview.com/) — MIT Technology Review quoting Bonnie Glaser of the German Marshall Fund: "The ecosystem they created is truly unique. It's a function of the talent pipeline, the culture, and laws in Taiwan; you can't easily replicate it anywhere."

[^60]: [Paul Triolo: Arizona will never reach that level](https://www.technologyreview.com/) — MIT Technology Review quoting technology policy expert Paul Triolo on TSMC's Arizona fab: "Arizona ain't that yet, and never will be."

[^61]: [Jensen Huang: Taiwan is one of the most important countries in the world](https://www.cna.com.tw/) — Multiple CNA reports: on May 29, 2024, Jensen Huang publicly said in Taiwan, "Taiwan is one of the most important countries in the world."

[^62]: [Computex 2024 National Taiwan University speech: Taiwan is an unsung hero and pillar of the world](https://www.tbotaiwan.com/) — Full transcript of Jensen Huang's 2024 Computex speech at NTU. Closing video text: "Taiwan is an unsung hero, yet a pillar of the world." "Thank you, Taiwan!" "Taiwan is home to our very precious partners. Everything NVIDIA does starts here."

[^63]: [China's Taiwan Affairs Office spokesperson Chen Binhua responds to Jensen Huang's statement](https://zh.wikinews.org/) — Wikinews: Chen Binhua, spokesperson for China's Taiwan Affairs Office, 18 days after the incident: "Regarding this extremely erroneous statement, people and netizens in China have already expressed strong dissatisfaction. Taiwan has never been a country... I hope he catches up on his lessons."

[^64]: [CNA: Chinese media mute Huang's "Taiwan is an important country" statement](https://www.cna.com.tw/) — CNA, June 3, 2024: "Financial media here have published many related reports, but did not appear to mention Huang's statement that 'Taiwan is an important country,' seeming to omit a sensitive issue usually regarded as 'the most important of the important.'"

[^65]: [Expert: China needs NVIDIA, but NVIDIA does not need China](https://www.voacantonese.com/a/china-s-media-turned-a-blind-eye-to-jensen-huang-s-statement-20240607/7646642.html) — Voice of America Cantonese quoted expert commentary analyzing how Chinese financial media's muting of Huang's "Taiwan is an important country" remark reflects the asymmetric relationship that "China needs NVIDIA, but NVIDIA does not need China."

[^66]: [Lai Ching-te: global top five computing center and sovereign AI](https://www.bnext.com.tw/article/79391/sovereign-ai) — Business Next: in October 2025, Lai Ching-te proposed making Taiwan one of the "world's top five computing centers" and developing "sovereign AI."

[^67]: [Foxconn building national supercomputer with 10,000 Blackwell chips](https://blogs.nvidia.com.tw/blog/foxconn-ai-factory-tsmc-taiwan-nvidia/) — NVIDIA Taiwan blog: Foxconn (Big Innovation Company) is building a national supercomputer in Kaohsiung using 10,000 Blackwell chips and delivering more than 90 exaflops, working with TSMC and the National Science and Technology Council to build Taiwan's first AI factory.

[^68]: [Executive Yuan AI New Ten Major Construction Projects](https://iknow.stpi.niar.org.tw/post/Read.aspx?PostID=21832) — STPI iKnow: the Executive Yuan's "AI New Ten Major Construction Projects" plan to invest more than NT$100 billion before 2040, targeting NT$15 trillion in output value.

[^69]: [TAIDE is like a high school student, while international giants are at graduate-student level](https://www.cw.com.tw/article/5137534) — CommonWealth Magazine: Taiwan's local language model TAIDE was described as being "like a high school student, while international giants are already at graduate-student level"; TAIDE's entire annual budget was less than the cost of a single training run for international models; TAIDE began with nine machines, or 72 H100 chips.

[^70]: [South Korean government purchases 260,000 GPUs](https://www.cw.com.tw/) — CommonWealth Magazine and industry reports: the South Korean government directly purchased 260,000 GPUs, contrasting with Taiwan's relative hesitation in policy decision-making.

[^71]: [Jensen Huang Computex 2026: annual NVIDIA spending in Taiwan about US$150 billion](https://cryptobriefing.com/nvidia-150b-taiwan-silicon-shield-ai/) — Cryptobriefing and Reuters: at Computex 2026, Jensen Huang disclosed that NVIDIA's annual spending in Taiwan was about US$150 billion, compared with only US$10 billion to US$15 billion five years earlier; Vera Rubin supply-chain partners doubled, including 150 Taiwanese companies; TSMC produces about 90% of the world's most advanced processes.
