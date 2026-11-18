---
title: "Taiwan's Bus System: After Hsinchu Bus Drives Away, Who Will Pick Up the People Without Steering Wheels?"
description: "On the morning of September 15, 2024, at Tongluo Railway Station, more than 30 people, from kindergarten children to a 90-year-old elder, boarded the last Hsinchu Bus 5658 service. From Taipei's first joint-operation route in 1977, to rural areas left with only two services a day, drivers averaging 51 years old, and TPASS monthly passes driving Hualien ridership up by nearly 70 percent, buses have always carried people with no other choice: students commuting to school, older adults who do not drive, families without cars. And this system is being pulled out from under them, route by route."
date: 2026-06-25
category: 'Lifestyle'
tags:
  [
    'Bus',
    'Intercity Bus',
    'Public Transportation',
    'TPASS',
    'Rural Areas',
    'Transportation Equity',
    'Electric Bus',
    'Open Data',
    'Driver Shortage',
  ]
subcategory: '交通與移動'
author: 'Taiwan.md Contributors'
readingTime: 24
featured: false
lastVerified: 2026-06-25
lastHumanReview: false
researchReport: 'reports/research/2026-06/台灣的公車系統.md'
image: '/article-images/lifestyle/scooters-and-bus-taipei-1996.webp'
imageCredit: 'Holly Cheng'
imageLicense: 'CC BY-SA 3.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg'
datasets:
  - name: '台灣好行各路線搭乘人次'
    url: 'https://data.gov.tw/dataset/140008'
  - name: '機動車輛登記數'
    url: 'https://data.gov.tw/dataset/14208'
relatedDiary: ['2026-06-25-204254-公車系統']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Lifestyle/台灣的公車系統.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:7d3802fe03c60e03'
sourceBodyHash: 'sha256:24a950fc8509e96a'
translatedAt: '2026-10-13T05:46:15.399498+00:00'
---

On the morning of September 15, 2024, in front of Tongluo Railway Station in Miaoli. More than 30 people stood beneath the bus stop sign; the youngest were still in kindergarten, the oldest was 90. They were not waiting for a bus to work, nor for a bus to school. They were waiting for the last Hsinchu Bus 5658 service.

From that day, the century-old operator withdrew entirely from Taoyuan, Hsinchu, and Miaoli. Twelve Miaoli routes were handed over to “Happy Taxi,” a reservation-based taxi service[^1]. When the Hsinchu Bus coach slowly pulled into the railway station, applause broke out. Tongluo Township representative Hsu Yu-feng had called on people to ride this final service as a keepsake. He said: “Riding Hsinchu Bus is a memory for many people; it accompanied many people through their youth.”[^1]

The applause was for a bus. But beneath it was something more brutal. The people applauding under the bus stop sign were elementary-school children not yet allowed to ride scooters, grandfathers no longer able to ride scooters, and people whose households did not have a second car. They were precisely the group least able to leave whenever they wanted. Buses are for them. And the collapse of Taiwan’s bus system has begun, perversely, from right under their feet.

> **30-Second Overview:** Taiwan’s buses carry “people without steering wheels”: students commuting to school, older adults who do not drive, and families without cars. Among carless households, 53.3% of outings rely on public transportation; among households with cars, the figure is only 13.7%[^2]. Yet this system is stopping first in the places that need it most: highway bus drivers fell from 5,646 to 3,551 in six years, a drop of more than one-third[^3]; rural areas are left with only two buses a day, and the last bus ends very early. The same act is called “waiting for the bus,” but in Taipei it means complaining that it takes too long, while in rural Changhua it means “Can I still leave home by myself?” Behind it is an open-data system even Google uses; at the front end, however, the experience is often a bus that never arrives, or two buses arriving together. Its quality measures whether a society is willing to carry those who cannot take to the road on their own.

## The People Raising Their Hands at the Bus Stop

First, one thing needs to be made clear: who actually rides buses?

The Ministry of Transportation and Communications’ travel-mode survey gives a counterintuitive answer. When households are divided by whether they own a car, 53.3% of outings by carless households rely on public transportation, while the figure for households with cars is only 13.7%[^2]. The gap is nearly fourfold. In other words, the core ridership of buses, together with the MRT and Taiwan Railways, is people whose households do not have cars, or who do not drive. The age profile is even clearer: students commuting to school have the highest public-transportation use among all trip purposes, with more than 40% of school-commuting trips made by public transport[^2].

```tw-bars
Who rides public transportation: people with cars rarely use it; people without cars rely on it to go out (trip share %)
*Carless households | 53.3 | rely on it to go out
Households with cars | 13.7
Source: Ministry of Transportation and Communications, Travel Mode Survey
```

This group has one thing in common: they do not have steering wheels in their hands. Teenagers cannot yet ride scooters; people in their seventies and eighties can no longer ride scooters; families that cannot afford or do not want to buy a car have no choice. For a 78-year-old grandfather in Changhua, the bus has never been about whether it is “convenient.” It has to answer a more basic question: “Can I go to the doctor by myself today, and can I get home by myself?” What is at stake is dignity.

A popular counterargument should be blocked here. Every so often, someone says Taiwan’s real protagonist is the scooter, not the bus, and that writing about buses is “urban-elite framing.” Taiwan as a scooter island is indeed a fact: Taiwan has 599 scooters per 1,000 people, 83.7% of households own scooters, and only about 12.5% of people primarily rely on public transportation[^4]. But this argument aims at the wrong target. Buses are precisely the lifeline of the non-elite: they carry carless households, students commuting to school, and rural older adults who cannot ride scooters. People who can ride scooters do not need buses very much to begin with. Those who truly depend on buses are the people who cannot even ride scooters.

> 📝 **Curator’s Note:** A common reading turns “there are many scooters” directly into “buses do not matter.” But one step is skipped: scooters solve mobility for “people who can take to the road on their own,” while buses solve mobility for “people who cannot take to the road on their own.” They fundamentally serve different people. When a rural route is suspended, the young and middle-aged adults who ride scooters are not the ones affected; the first person left without a ride is the grandmother who used to take the bus to a follow-up medical appointment. Treating buses as a supporting role means treating this entire group as supporting characters too.

A common misconception should also be cleared up in passing: many people think migrant workers are the main bus riders. They are not. Because Taiwan’s policies have long restricted migrant workers from purchasing vehicles, their daily commutes are mostly by scooter; they usually take intercity buses only for long-distance weekend trips[^5]. Imagining migrant workers as the main bus passengers is an assumption that directly equates “disadvantaged” with “bus rider.”

## Single-stage, Two-stage, and the "Beep" Required When Getting Off

![A low-floor Xingnan Bus in Tainan City driving on a main red line; accessibility symbols and low-floor design are visible near the door.](/article-images/lifestyle/low-floor-bus-tainan-2016.webp)
_A low-floor bus from Tainan City's Xingnan Bus, 2016. Low floors allow strollers and wheelchairs to board easily, serving as a key indicator of "accessibility" for urban buses. Photo: Nutnse0008, CC BY-SA 4.0 (see image credits at the end of article)._

There is a set of movements that Taiwanese people learn from childhood, which often leaves foreigners completely bewildered: you must raise your hand at the bus stop, or the driver will pass without stopping. You "beep" when boarding, and sometimes you have to "beep" again when getting off. Behind these actions lies a fare system far more sophisticated than one might imagine.

This system traces its origins back to 1977. Before then, different bus operators in Taipei operated independently, with no standardization in route numbers, fares, or ticketing. In 1976, the Taipei City Government established the "Preparatory Committee for Public-Private Bus Joint Venture" to unify these elements. On January 1, 1977, the joint venture routes 202 and 202 were the first to begin service. On April 30 of the same year, the first phase consisting of 33 joint venture bus routes officially commenced operations[^6]. The concept of "joint venture" (聯營, _liányíng_) meant that regardless of which operator was driving the bus, passengers used the same route numbers, the same fare structure, and the same ticketing system. This was the starting point for Taiwan's urban bus system.

Segmented fare collection grew out of this foundation. As urban areas expanded into New Taipei City, a single trip might cross several fare zones: the old city center counts as one stage, while extending to the outskirts counts as two or three stages. Segment boundaries are typically set near transportation hubs like Taipei Bridge and Shilin, or near municipal borders. Boarding and exiting within two stops of these boundaries is still counted as a single stage (known as a "buffer zone"). This is why, when taking a multi-stage route, you must tap when boarding and tap again when getting off: the system needs to know how many stages you traveled to charge the correct amount. The answer to what confuses foreign friends most—"Why do I sometimes board through the front door and sometimes through the back?"—is also hidden here: where you board/exit and whether you tap once or twice depends entirely on how that specific route is segmented.

The ticketing media itself has also evolved. _EasyCard_ (悠遊卡) was rolled out across all buses in late September 2002[^7], while Kaohsiung's _iPASS_ (一卡通) was launched alongside the Kaohsiung MRT in 2014[^7]. Two-way tapping (tapping when boarding and tapping when exiting) was introduced in two phases: the first phase began on July 1, 2019, and the second phase was fully implemented in February 2020. The goal was to precisely calculate segmented fares, provide transfer discounts, and collect passenger boarding and alighting data[^8]. It is worth correcting a common misconception here: two-way tapping started in 2019, not 2012. Similarly, _iPASS_ arrived in 2014, not 2012.

However, this system has its limits. The ridership of Taiwan's urban buses is extremely concentrated in the Taipei-New Taipei area: in 2020, the Taipei-New Taipei region accounted for 73.7% of the total urban bus ridership in Taiwan[^9]. A trunk bus route in Taipei might run every 4 to 6 minutes during peak hours, and Taipei residents complain if they have to wait 5 minutes. At that same moment, a bus stop in central or southern Taiwan, or in the east, might only see one bus per hour, with the last bus running as early as 5:00 or 6:00 PM. The system is the same, but depending on where you are, it represents two very different lives.

## Google Knows How Many Minutes Until Your Bus Arrives Because Taiwan Opened the Data

You open your phone and see a countdown: “arriving in 3 minutes.” This now seems natural, but it is in fact one of Taiwan’s little-known achievements.

Taiwan began inventorying nationwide public-transportation data and setting unified standards in 2015. In 2016, it built the PTX platform, and in December 2022 it integrated and upgraded the platform into today’s TDX, the Transport Data eXchange service[^10]. Its scale is large: thousands of datasets, more than 4.9 million API calls per day, over 540 million data records circulated in total, and more than 3,000 value-added service providers using it[^11]. More crucially, Taiwan’s bus-arrival information on Google Maps does indeed come from TDX/PTX data accessed through local partners[^11]. This makes Taiwan one of the few places in the world where Google Maps has fine-grained bus-arrival predictions.

Still, honesty is needed here: this should not be overpraised. Taiwan’s open data is “regionally leading,” not “world-class” with the endorsement of international assessments. It uses a custom OData “four-star” format rather than the internationally common GTFS/GTFS-RT standard, which makes it harder to integrate directly into the international ecosystem. Nor can one find any international organization naming Taiwan as a benchmark for open transit data[^12]. Its strength lies in scale and prevalence; its weakness lies in alignment with international standards.

And however smart the back end is, it cannot rescue the front-end experience. All those bus apps, including Taipei Bus Tracker, various BusTracker apps, and cloud-based bus apps, are actually connected to the same TDX back end; only the interfaces differ[^13]. So the arrival time you see in App A is identical to the one in App B, because they are copying the same homework. The real problem lies at the data source: GPS signals drift in dense urban areas full of tall buildings, and the bus-arrival predictions drift with them.

The most vivid example comes from complaints by Taichung users on PTT. A user named LeiHide wrote: “Last time I was waiting for a bus and the app showed 2 buses entering the stop, but in reality not one came,” and “basically ghost buses”; another user, teddykitty, said: “There clearly was a 6:50 service, but even I and two other women I didn’t know just waited there stupidly together”[^14]. The back end is nationwide unified open data; the front end is three strangers waiting together under a bus stop sign for a bus that will never come. This is one of the most divided faces of Taiwan’s bus system.

(One frequently misreported point should be added: some people online say “1968” is Taipei City’s bus app. It is not. 1968 is the numbering system for national freeway routes and also the highway authority’s real-time freeway information app; it has nothing to do with urban buses[^13].)

## Two Buses Arrive Together, Then Comes the Long Empty Wait

![A bus shelter on Zhengzhou Road by Taipei Main Station, with bus stop signs and waiting passengers](/article-images/lifestyle/taipei-bus-shelter-2020.webp)
_A bus shelter on Zhengzhou Road by Taipei Main Station, 2020. For people without steering wheels, the bus stop is the starting point of daily travel, and also the place of long waits. Photo: T Gordon Cheng, CC BY-SA 4.0 (see image sources at the end)._

Everyone who has ridden a bus understands that absurdity: no bus comes for 20 minutes, and then two buses with the same route number pull in back to back.

This phenomenon is called bunching. It is a physical property of bus systems and has nothing to do with whether drivers are lazy. When the first bus is slightly delayed, more passengers accumulate along the route, boarding and alighting takes longer, and the bus becomes slower and slower. The bus behind it, by contrast, has a smoother trip because the bus in front has already picked up the passengers, so it catches up until the two buses stick together. The longer the headway on a route, the more violently this snowball rolls.

For people in Taipei, bunching is an annoyance. For people in rural areas, bunching is a luxury: they do not even encounter “two buses arriving together,” because there are only a few buses a day. This returns us to the invisible urban-rural fracture: Taipei residents complain that waiting five minutes is too long because they have room to complain; people in rural Changhua who wait 40 minutes, or even have only two buses a day, do not. The same phrase measures two completely different situations. The fewer choices people have, the less likely the bus is to arrive. That sentence will return again and again in this article.

## How "Wild Chicken" Buses Became United Bus

![Kuo-Kuang Motor Transport long-distance highway bus, license plate KKA-1897](/article-images/lifestyle/kuokuang-intercity-coach-2026.webp)
_Kuo-Kuang Motor Transport's long-distance highway bus, 2026. Its predecessor was Taiwan Motor Transport Company during the era of the Highway Bureau's monopoly; in 2001, it was taken over by thousands of employees through collective fundraising. Photo: Wei Ting Hsu, CC BY-SA 4.0 (see image credits at end of article)._

To understand why bus services look the way they do today, one must look back at how the industry evolved from a single monopoly into the crowded streets we see now.

The starting point for Taiwan's highway passenger transport was the Taiwan Provincial Highway Bureau, established in 1946. In 1977, the bureau's passenger transport business was spun off to form the Taiwan Motor Transport Company (commonly known as _Taiqi_). At its peak, it operated over 500 routes with 3,600 vehicles and tens of thousands of employees[^15]. The older generation still remembers that era when the Highway Bureau held a monopoly on long-distance transport.

The turning point occurred around the time of martial law lifting. In the late 1980s, large numbers of "wild chicken" buses (_yeji che_)—unlicensed vehicles picking up passengers privately—began appearing on the roads. Rather than attempting an endless crackdown, the Ministry of Transportation and Communications chose to guide them toward legalization. On September 6, 1989, United Bus (Tonglian), named by then-Director of the Transport Research Institute Chang Chia-chu to mean "leading in all directions through joint operations," was officially established. It became Taiwan's first legal private long-distance highway bus company[^16]. Once the market opened, companies like Hezheng, Kavalan, Aloha, and Capital Bus joined in succession, transforming long-distance transport from a single monopoly into a competitive landscape of many players.

```tw-timeline
1946 | Taiwan Provincial Highway Bureau established | Government-run; monopoly on Taiwan's highway passenger transport
1977 | Taiwan Motor Transport Company (Taiqi) spun off | Passenger business split from the Highway Bureau; reached peak with tens of thousands of employees
1989 | United Bus (Tonglian) established | "Wild chicken" buses legalized; first private long-distance highway bus company
2001 | Kuo-Kuang Motor Transport takes over | Taiqi losing NT$5 billion annually; 1,090 employees fund the creation of Kuo-Kuang
Sources: Historical records of the Highway Bureau, Taiqi, and Kuo-Kuang (Taiqi's 500+ routes, 3,600 vehicles, and 1,090 employees fundraising in 2001) and reports on United Bus's establishment in 1989[^15][^16]
```

The state-owned side of the business did not fare as well. Taiqi suffered long-term losses, losing approximately NT$5 billion annually which required subsidies from the national treasury; following the opening of competition, its routes and workforce shrank significantly[^15]. In June 2001, 1,090 Taiqi employees each contributed NT$300,000 to establish Kuo-Kuang Motor Transport, which in July took over Taiqi's original 96 routes[^15]. Many middle-aged employees in their 40s and 50s who did not yet meet retirement criteria protested the move. The name "Kuo-Kuang" actually comes from Taiqi's gold-medal bus model from 1967; it was the curtain call of one dynasty, leaving its brand name to those who took over.

(This institutional history is merely background. The nostalgic tourism aspect of the lineage from _Jinma_ to _Kuo-Kuang_, and the specific details regarding the rampant "wild chicken" buses of that era, belong to another article about tour buses; this serves only as a brief reference point.)

## Pulling Out at 5:30 A.M., Ending Service at 8 P.M., Four Days Off a Month

There is no villain pulling buses away route by route. The most direct reason is simple: there is no one to drive them.

The numbers are cold when laid out. Urban bus drivers fell from 11,811 in 2015 to 10,588 in 2023, while their average age rose from 45.2 to 51.2 over the same period, aging six years in less than a decade[^17]. Highway buses are worse: drivers fell from 5,646 in 2019 to 3,551 in 2024, a drop of more than one-third in six years[^3]. Across Taiwan, the shortage is 1,443 urban bus drivers and 772 highway bus drivers; including tour buses, the total shortage of large-bus drivers exceeds 5,000[^17][^3]. Young drivers under 35 have collapsed from 14% a decade ago to 5.6%[^17]. This industry is aging rapidly and has no successors.

```tw-line
Bus drivers are fewer and older (urban bus drivers)
Year | Drivers | Average age
2015 | 11811 | 45.2
2023 | 10588 | 51.2
Source: Ministry of Transportation and Communications; United Daily News Sunshine Action
```

Why are young people not entering, and why can experienced drivers not be retained? The answer lies in the wage structure. An investigation by The Reporter into the Taoyuan Bus workplace found that a driver’s monthly pay consists of as many as 14 items. The base salary is only NT$26,400, while the rest is cobbled together through overtime pay, which accounts for 35% to 40%, and “kilometer bonuses” and “passenger bonuses”[^18]. The problem is that the latter two bonuses are not counted as fixed monthly wages, so the average hourly wage used to calculate overtime pay, as the reporter calculated it, fell to only NT$88[^18]. Working hours are even more consuming: drivers may drive up to 10 hours a day, but standby time “waiting for assignments” does not count as working time. A typical shift pulls out at 5:30 a.m. and ends at 8 p.m., tying the driver to the depot for 16 hours, with only four to five days off a month[^18]. The Reporter described a Taoyuan Bus driver dormitory this way: in a space of less than five ping, eight bunk beds were set up, and 16 drivers shared a small bathroom[^18].

What this structure produces is the concrete choices of individual people. Taoyuan Bus driver Chen Wei-chen put it bluntly: “What we need is money. Everyone is willing to push this hard because of money. But now the company keeps cutting your working hours, and the cuts are getting more and more outrageous.” He did the math: “The pay is already not enough. It used to be NT$60,000 a month; now it’s only NT$45,000 to NT$48,000. I still have six years until retirement, but I don’t want to do this anymore.”[^18]

Where did those who left go? Mostly to logistics, food delivery, and Uber. Former Taoyuan Bus driver Hsu Yung-fa switched to logistics after resigning. His monthly pay fell by more than NT$10,000, but one sentence captured the condition of the industry: “Carrying people is different from carrying goods. The pressure is not as great; you don’t have to be on edge, and the company pays what it should pay.” After leaving, he “finally knew what a two-day weekend was”[^18]. Chang Hsien-te, assistant manager of the business department at San Chung Bus, completed the logic with an even more direct comparison: “It’s all driving... if something falls in logistics, it’s cargo, and you just compensate for the money. But if something falls in passenger transport, it’s passengers, and two front teeth get knocked out.”[^19]

But this is not a one-sided story of “drivers are miserable, passengers are bad.” There is pressure from the passenger side too: one complaint can cost a driver thousands of dollars, so many drivers develop defensive attitudes and avoid interaction whenever possible[^18]. The street-level stereotype that “bus drivers drive fast and have bad attitudes” sits atop the real structure of long hours and pay deductions at the slightest complaint. The pressure of passengers seen by drivers as “complaint experts” is the other side of the same structure. Both ends are caught in the same unreasonable system.

The most suffocating line comes from Taoyuan Bus driver Fan Kuang-ming, who has also been active in the union movement. When he spoke about overtime work, his anger was: “Eleven hours, eight hours, it’s all bullshit! There is absolutely no Taoyuan Bus driver who sleeps more than eight hours!”[^18] And when he described missing his father’s final moments because he was rushing to complete his shift, that anger turned entirely into regret: “When I got to the hospital, the white sheet had already been pulled over him. I didn’t even get to call him Dad once. On the day of the funeral, I kowtowed 12 times to my father. I am an unfilial son.”[^18]

> 📝 **Curator’s Note:** When we complain at the bus stop, “Why hasn’t the bus come again?” or “Why is it driving so fast?” behind that complaint stands a person rotating shifts in a five-ping dormitory, pushing himself for an average hourly wage of NT$88 until he could not see his father one last time. The roots of the driver shortage are far more complicated than “young people are unwilling to endure hardship.” A structure that uses the lowest fixed wages and the longest standby hours to support work with the highest cost of failure, because what falls is passengers, has finally become unsustainable. The buses cannot be sent out because fewer and fewer people are willing to be squeezed this way.

## After Hsinchu Bus Drives Away

![A Happy Bus minibus in rural Hsinchu County stopped at its starting point, with the words Happy Bus printed on the body](/article-images/lifestyle/happy-bus-hsinchu-rural-2025.webp)
_A rural Happy Bus in Hukou and Baoshan Townships, Hsinchu County, 2025. After Hsinchu Bus withdrew from Taoyuan, Hsinchu, and Miaoli, reservation-based minibuses of this kind took over some suspended routes. Photo: T Gordon Cheng, CC BY-SA 4.0 (see image sources at the end)._

Where did the driver shortage explode first? In the places with the fewest choices.

Return to the opening scene. Hsinchu Bus’s withdrawal from Taoyuan, Hsinchu, and Miaoli was only one part of an entire wave of operators leaving the market. Aloha Bus ceased operations in 2022; Hualien Bus ended part of its operations at the end of 2023; four Taichung operators, Renyou, Fengyuan, Sifang, and Jieshun, exited; even Kuo-Kuang Motor Transport, which took over from Taiqi, had accumulated debts exceeding NT$2 billion, delayed salary payments twice within half a year in 2025, and at one point planned to suspend 14 routes[^20]. Chang Sheng-hsiung, a professor in Tamkang University’s Department of Transportation Management, identified the root in one sentence: “Long-suppressed fares may have reduced the burden on the public, but they have also limited the quality of buses and passenger transport.”[^21] Fares are held down, operators cannot make money, and they can only struggle on subsidies; when subsidies fail to keep up, routes are cut one by one.

This is the vicious cycle scholars describe: service reductions, ridership loss, and further service reductions. Once headways become sparse, passengers leave; once passengers leave, losses expand; once losses expand, operators cut more services. When Capital Bus Group general manager Lee Chien-wen discussed routes that lose more money the more they run, he repeated “no solution” twice: “No solution, absolutely no solution,” because for loss-making routes, “the more passengers you carry, the more money you lose”[^22]. Taiwan’s rural subsidy system calculates the difference between “reasonable cost per vehicle-kilometer minus revenue.” Routes with fewer than two passengers per vehicle-kilometer on average can apply for subsidies[^23]. But subsidy funds are limited, and people willing to drive are even more limited.

So, have the rural older adults who most rely on buses simply been abandoned? Here there is a turn easily covered over by pessimistic narratives. Taiwan began piloting demand-responsive transit services (DRTS) in 2016. In 2019, these services were named “Happy Bus” and “Happy Taxi.” Instead of running fixed schedules, they use reservation-based minibuses or taxis, going wherever there are passengers to carry. Their cost per vehicle-kilometer is NT$30 to NT$40, lower than the NT$45.85 of traditional buses[^24]. Relying on this replacement mechanism, rural public-transportation coverage rose from 70% in 2016 to 91.96% in 2023, and then to 94.37% in March 2025, with a target of 100% in 2028[^25]. After Hsinchu Bus withdrew, those 12 Miaoli routes were precisely handed over to Happy Taxi[^1]. Behind the large coach that drove away came reservation-based yellow taxis to fill the gap.

```tw-line
Rural public-transportation coverage: large buses exit, minibuses and taxis fill in (%)
Year | Coverage
2016 | 70
2023 | 91.96
2025 | 94.37
Source: Executive Yuan, Directorate General of Highways, CNA
```

It is true that coverage returned to above 90%, but do not read that as “the problem has been solved.” A reservation-based minibus carries far fewer people than a large coach; advance booking also filters out older adults who need to go out suddenly or are unfamiliar with phones. It is an honest expedient, not a triumph.

## High-Speed Rail Took Away Long-Distance Coach Passengers

The bus system is being pushed toward a cliff not only by the driver shortage, but also by high-speed rail bearing down from above.

After Taiwan High Speed Rail opened in 2007, large numbers of long-distance passengers along the western corridor shifted to it. National highway bus services were sharply reduced: according to Directorate General of Highways data compiled by Radio Taiwan International and United Daily News, national highway bus services fell by about 40% from 2016 to 2024, and passenger trips fell by 32.8%[^26]. Another indicator, route counts, shows ordinary highway bus routes falling 43.7% from 2012 to 2022[^27]. (These two figures measure different things, one services and one routes, and use different base years, so do not treat them as the same.) Western long-distance routes such as Taipei to Kaohsiung have recovered only to a little over 60% of pre-pandemic levels; in the east, the Taipei-Hualien route has been consolidated until only Kamalan operates it on holidays[^26]. The average passenger trip also shrank from 93 kilometers to 67 kilometers. Long-distance passengers were taken by high-speed rail, leaving medium- and short-distance trips behind[^26].

The most direct result is that transfer stations become empty shells. Operators moved out of the second floor of Taipei Bus Station, turning the entire floor into vacant space for lease[^28]. Several transfer centers built in Taichung are feared to become underused “mosquito halls.” Facing this avalanche, the Directorate General of Highways launched in 2025 what it called the largest route-network adjustment plan in 30 years[^20]. This was both an acknowledgment that the old network could no longer hold, and an attempt to reshuffle the system.

## Urban Progress and Its Limits

Shifting the lens back to the cities reveals a completely different face. Within the same system, the urban side is making great strides forward, but every step is pushing against its own limits.

The first sign of progress is trunk bus services. Between 2017 and 2018, Taipei City reclassified its bus network; during peak hours, trunk routes are now so frequent that buses arrive every 4 to 6 minutes, making them as easy to understand and wait for as the MRT[^29]. The second is the TPASS commuter monthly pass. Originating from 2022 election pledges, it launched in July 2023 with a special budget of NT$20 billion allocated for its first three years: an NT$1,200 monthly pass for the Keelung-Taipei-New Taipei-Taoyuan area, NT$699 or NT$999 for Miaoli-Taichung-Changhua-Changhua-Yilan, and NT$999 for the Tainan-Kaohsiung-Pingtung area, allowing unlimited travel on buses and the MRT[^30].

TPASS's report card must be read with both its successes and failures in mind. On the positive side, it has indeed brought more people onto public transit: bus ridership increased by 19.6%, and MRT ridership rose by 36.9%[^31]. However, its effectiveness in converting drivers and scooter riders into transit users is limited: face-to-face interviews in Taipei show that the actual proportion of private vehicle users shifting to public transportation is only 7.33%[^32]. In other words, most of the additional passengers are those who "already used transit and are now using it more," rather than those who "used to drive but have now switched to transit."

More pressing is the issue of money: the NT$20 billion special budget for TPASS expires at the end of 2025. A follow-up plan scaled to NT$36.38 billion faces a funding crisis because the total budget is stuck in the Legislative Yuan, affecting 20 counties and cities across Taiwan; many local operators are struggling by using their own funds to cover costs in advance[^32][^33]. A policy that successfully brings people onto buses is currently stalled in a political deadlock.

![Taipei Bus BYD K9 electric bus driving in front of Taipei Zoo](/article-images/lifestyle/electric-bus-byd-taipei-2026.webp)
_A Taipei Bus BYD K9 electric bus drives past the Taipei Municipal Zoo, 2026. While the city aims for full electrification of urban buses by 2030, only about 18% were on the road in 2024. Photo: 厦门金龙永远的神, CC BY 4.0 (see image credits at the end of the article)._

Electrification is the third sign of urban progress, and also where the gap is most glaring. The government has declared a goal of full electrification for urban buses by 2030, aiming to replace nearly 10,000 fuel-powered buses (an existing stock of approximately 9,400 vehicles) with a subsidized procurement target of 11,700 vehicles. The entire plan was approved in June 2023 with an allocated budget of NT$64.3 billion[^34]. The ideal is high, but the reality is slow: by 2024, only about 1,926 electric buses—roughly 18%—were actually in service, and seven counties and cities had zero[^35].

```tw-bars
Distance to Full Electrification by 2030 (Urban Bus Electrification Progress)
Electric buses on the road in 2024 | 1926 | 18% share
2030 subsidized procurement target | 11700 | Seven counties/cities currently at zero
Source: Executive Yuan, Ministry of Transportation and Communications, end of 2024
```

Where is the bottleneck? There are leaks at every level, from subsidy issuance to local approval and finally to actual contract signing (the allocated amount dropped from 2,080 to 1,404, then down to 744); furthermore, charging equipment is expensive, with a single charging station costing over NT$60 million[^35]. While a bus is declared to cost NT$11 million with a subsidy of NT$6.8 million, operators must still raise the remaining NT$4.2 million themselves. For an industry that already survives on subsidies and struggles even to hire drivers, this is a difficult commitment to make.

> 📝 **Curator's Note**: When laid out, these three urban developments (trunk buses, monthly passes, and electrification) look like a list of progress. However, they share a common invisible prerequisite: someone has to drive the vehicles. When the average age of drivers climbs to 51 and the labor shortage exceeds 5,000 people, even the smartest monthly pass or the most eco-friendly electric bus is just an empty metal shell sitting in a depot. Urban progress is real, but it is charging forward while sitting on a rapidly aging labor foundation.

## Taiwan Is Not an Isolated Case

Looking abroad shows that Taiwan’s difficulties are not unique.

Japan’s much-admired public transportation has long been collapsing at the rural end: 85% of rural bus operators are losing money, taxi drivers in Hiroshima average 63 years old, and more than 20% of the population lives too far from a railway station or bus stop[^36]. Seoul, South Korea, is seriously discussing introducing foreign drivers because nearly half of current drivers are over 60[^37]. In Europe, 129 million people live in areas with inadequate public transportation, and rural bus fares in the United Kingdom cover less than 25% of costs[^38]. “Rural population loss, aging drivers, and shrinking routes” is a shared structural problem across East Asia and the world. Taiwan’s difference is only that its dependence on scooters is deeper, leaving buses in the scooter’s shadow from the beginning.

Interestingly, one thing from Taiwan is being treated internationally as a benchmark. Seamless Bay Area, a California transportation advocacy organization, has used TPASS as an example California could learn from, summarizing three factors behind its success: sufficient subsidies, central political will, and flexible local implementation[^39]. And the largest beneficiaries of TPASS are not urban elites, but rural areas. After TPASS launched, bus ridership in Hualien grew by 69.8%, the most pronounced rural effect in that analysis[^39].

```tw-figure
+69.8%
Growth in Hualien bus ridership after TPASS launched: a cheap monthly pass has the greatest effect where people have the fewest choices
Seamless Bay Area analysis
```

That figure directly slaps back at the claim that buses are an urban-elite plaything. In Taipei, a cheap monthly pass is icing on the cake; in Hualien, it concretely lowers the cost of leaving home. The fewer choices a place has, the greater the force of even a small improvement.

## The Last Bus, Bound for Those Who Need It Most

Return to that morning at Tongluo Railway Station.

Those more than 30 people, from kindergarten children to a 90-year-old elder, applauded as they saw off the last Hsinchu Bus 5658 service. From Taipei’s first jointly operated bus route in 1977, to illegal coaches becoming UBus in 1989, to the open data supporting Google countdowns, and then to drivers averaging 51 years old and rural routes suspended one after another, this system has grown to where it is today while always carrying the same group of people: those without steering wheels in their hands, who cannot take to the road on their own. Its cruelest feature is that it stops first precisely under the feet of those who need it most.

But the story did not stop with that large coach driving away. After the applause dispersed, those 12 Miaoli routes were replaced by Happy Taxis. Passengers make a phone call, and a vehicle drives to their door. This is not a triumph: reservation-based minibuses carry fewer people, require advance booking, and cannot serve enough people. But it is a signal. When large buses can no longer hold up, the system is trying, in another shape, to catch again the people it was supposed to catch all along. Rural coverage returning to 94% is not because there are more buses; it is because a society has not yet decided to throw these people off.

The next time you stand under a bus stop sign, whether in Taipei complaining that the wait is too long or in rural Changhua waiting for one of the two buses that day, remember that you are not waiting only for a vehicle. You are waiting for a system struggling to sustain itself for “people without steering wheels,” and running out of breath first in the places that need it most. Whether it can arrive has never measured only transportation efficiency. It measures a society’s choice: whether it is willing to carry those who cannot take to the road on their own.

That final 5658 has driven away. But as long as someone is still raising a hand under a bus stop sign, there is still a vehicle that owes them a ride.

**Further Reading:** [Taiwan’s Transportation System](/en/lifestyle/transportation-system), [Taiwan’s Scooter Culture](/en/lifestyle/taiwan-scooter-culture), [History of Taiwan’s MRT Development](/en/lifestyle/history-of-taiwan-mrt-development), [Tour Buses](/en/lifestyle/tour-bus)

## Image Sources

This article uses six Creative Commons licensed images, all cached in `public/article-images/lifestyle/` to avoid hotlinking source servers:

- [Holly Cheng](https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg) — scooters and bus at a Taipei street corner (hero), 1996, CC BY-SA 3.0
- [Nutnse0008](https://commons.wikimedia.org/wiki/File:Shing_Nan_Bus_421-U9_20160423.jpg) — Hsing Nan Bus low-floor bus in Tainan, 2016, CC BY-SA 4.0
- [T Gordon Cheng](<https://commons.wikimedia.org/wiki/File:Taipei_Main_Station_(Zhengzhou)_bus_shelter_20201024.jpg>) — Taipei Main Station bus shelter, 2020, CC BY-SA 4.0
- [Wei Ting Hsu](<https://commons.wikimedia.org/wiki/File:%E5%9C%8B%E5%85%89%E5%AE%A2%E9%81%8B_KKA-1897_(2026.3.11).jpg>) — Kuo-Kuang Motor Transport highway coach, 2026, CC BY-SA 4.0
- [T Gordon Cheng](https://commons.wikimedia.org/wiki/File:%E6%B9%96%E5%8F%A3%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_1%E8%99%9F%E7%B7%9A_and_%E5%AF%B6%E5%B1%B1%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_%E4%B8%89%E5%B3%B0%E7%B7%9A_2025-09-30.jpg) — rural Happy Bus in Hsinchu County, 2025, CC BY-SA 4.0
- [厦门金龙永远的神](https://commons.wikimedia.org/wiki/File:Taipei_bus_BYD_K9.jpg) — Taipei Bus BYD K9 electric bus, 2026, CC BY 4.0

## References

[^1]: [CNA: Tongluo residents ride Hsinchu Bus’s final service as a keepsake](https://www.cna.com.tw/news/ahel/202409150184.aspx) — Report published on September 15, 2024, documenting Hsinchu Bus’s withdrawal from Taoyuan, Hsinchu, and Miaoli and the farewell scene for the final Tongluo 5658 service, including verbatim remarks by township representative Hsu Yu-feng; the time, place, and route can all be verified.

[^2]: [Ministry of Transportation and Communications, Department of Statistics: Survey on Public Daily Travel Modes](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202201270001&type=s) — Official MOTC travel-mode survey providing primary data including public-transportation trip share of 53.3% for carless households versus 13.7% for households with cars, as well as ridership rates by age group and for school-commuting trips.

[^3]: [Taisounds: Passenger transport avalanche; highway bus drivers fall by one-third in six years](https://www.taisounds.com/news/content/125/204965) — Reports Directorate General of Highways statistics showing highway bus drivers falling from 5,646 in 2019 to 3,551 in 2024, the shortage, and Kuo-Kuang Motor Transport debt exceeding NT$2 billion.

[^4]: [ScienceDirect: Study on travel and urban development in Taiwan’s scooter cities](https://www.sciencedirect.com/science/article/abs/pii/S0967070X25002446) — Academic paper quantifying Taiwan’s scooter dependence: 599 scooters per 1,000 people, 83.7% of households owning scooters, and only 12.5% primarily relying on public transportation.

[^5]: [Vocus: Migrant workers’ transportation and life in Taiwan](https://vocus.cc/article/63dcb90efd89780001509011) — Explains that because Taiwan’s policies have long restricted migrant workers from purchasing vehicles, they primarily use scooters for daily transportation and take intercity buses only for long-distance weekend trips, correcting the common misconception that migrant workers rely on buses.

[^6]: [Wikipedia: Taipei City Bus](https://zh.wikipedia.org/zh-tw/臺北市市區公車) — Records the history of Taipei’s joint bus operation system: the Joint Operation Preparatory Committee was established in 1976; routes 201 and 202 began service on January 1, 1977; and the first phase of 33 routes began operations on April 30.

[^7]: [Wikipedia: EasyCard](https://zh.wikipedia.org/zh-hk/悠遊卡) — Records the ticketing electrification timeline, including EasyCard’s full introduction on buses at the end of September 2002 and iPASS’s launch with the Kaohsiung MRT in 2014.

[^8]: [Taipei Public Transportation Office: Press release on two-way bus tap fare collection](https://pto.gov.taipei/News_Content.aspx?n=6B4D38874E971F4B&sms=87415A8B9CE81B16&s=954214BF3AA2EA89) — Primary information from Taipei’s Public Transportation Office explaining the first phase of two-way card tapping on July 1, 2019, the second phase in February 2020, and its purposes of precise section-fare calculation and transfer discounts.

[^9]: [Ministry of Transportation and Communications: Urban bus ridership statistics](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202112090001&type=s) — Official MOTC statistics showing that Taipei and New Taipei accounted for 73.7% of Taiwan’s urban bus ridership in 2020, hard data on urban-rural ridership concentration.

[^10]: [TDX Transport Data eXchange official website](https://tdx.transportdata.tw/) — Official MOTC platform recording the open-data governance history of PTX’s establishment in 2016 and its integration and upgrade into TDX in December 2022.

[^11]: [iThome: TDX open-data scale and Google Maps usage](https://www.ithome.com.tw/news/142077) — Reports more than 4.9 million TDX API calls per day, 540 million records circulated, 3,000+ value-added operators, and confirms that Google Maps Taiwan bus-arrival information uses TDX data.

[^12]: [Medium: TDX API tutorial and data-standard analysis](https://medium.com/@ycpin/data-mining-transport-data-exchange-tdx-api-tutorial-and-demonstration-14bba4a58e9b) — Technical analysis explaining that TDX uses a custom OData “four-star” format, has GTFS Beta but not the internationally common standard, and that no international organization can be found naming Taiwan as a benchmark.

[^13]: [PTT Bus board: Discussion of bus apps sharing the same TDX back end](https://www.ptt.cc/bbs/Bus/M.1613871840.A.47D.html) — Online discussion showing that various bus apps all connect to TDX, that GPS is unstable among tall buildings, and clarifying that “1968” is a national freeway route number and real-time freeway information app, not an urban bus app.

[^14]: [PTT Taichung board: Complaint thread on Taichung bus ghost services](https://www.ptt.cc/bbs/TaichungBun/M.1691104386.A.D22.html) — Public 2023 discussion thread in which users LeiHide and teddykitty describe verbatim the experience of Taichung bus apps showing buses that never arrive; verifiable with Ctrl-F.

[^15]: [Taiwan Panorama: From Taiwan Motor Transport to Kuo-Kuang Motor Transport](https://www.taiwan-panorama.com/Articles/Details?Guid=593707a8-2be1-462d-aed7-73883b3e20f0) — Details the privatization process: Highway Bureau in 1946, Taiwan Motor Transport established in 1977, annual losses of NT$5 billion, and 1,090 employees each contributing NT$300,000 in 2001 to establish Kuo-Kuang Motor Transport and take over 96 routes.

[^16]: [Wikipedia: UBus](https://zh.wikipedia.org/zh-tw/統聯客運) — Records that UBus was named by Institute of Transportation director Chang Chia-juch with the meaning “commanding the four directions, operating jointly,” was established on September 6, 1989, and was Taiwan’s first legal private national highway bus company.

[^17]: [United Daily News Sunshine Action: Bus driver shortage investigation](https://udn.com/news/story/10098/8766101) — Cites MOTC data showing urban bus drivers falling from 11,811 in 2015 to 10,588 in 2023, average age rising from 45.2 to 51.2, and shortages of 1,443 urban bus drivers and 772 highway bus drivers.

[^18]: [The Reporter: Only NT$88 per hour: the overwork scene among Taoyuan Bus drivers](https://www.twreporter.org/a/tybus-driver-overwork) — In-depth investigation of Taoyuan Bus driver labor structure: 14 pay items, NT$26,400 base salary, calculated average hourly wage falling to only NT$88, a five-ping dormitory shared by 16 people, with named verbatim accounts from Fan Kuang-ming, Chen Wei-chen, and Hsu Yung-fa.

[^19]: [The Reporter: The bus industry labor shortage, part two](https://www.twreporter.org/a/current-challenges-of-bus-industry-2) — Interviews San Chung Bus business department assistant manager Chang Hsien-te and Nangang station chief Wang Shuo-chien, with verbatim discussion of the difficulty of finding bus drivers and the difference in responsibility between carrying people and carrying cargo.

[^20]: [United Daily News: Directorate General of Highways launches largest route-network adjustment in 30 years](https://udn.com/news/story/7266/9256802) — Reports reductions in national highway bus services and routes, Kuo-Kuang Motor Transport debt exceeding NT$2 billion and delayed wages, the wave of operator exits, and the Directorate General of Highways’ 2025 route-network adjustment plan.

[^21]: [The Reporter: Route 9005’s one-way empty-bus crisis and the passenger-transport dilemma](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Quotes Tamkang University Department of Transportation Management professor Chang Sheng-hsiung verbatim on how long-suppressed fares limit bus and passenger-transport quality.

[^22]: [The Reporter: Route 9005’s one-way empty-bus crisis and the passenger-transport dilemma](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Interviews Capital Bus Group general manager Lee Chien-wen, quoting “No solution, absolutely no solution” and “the more passengers you carry, the more money you lose,” analyzing the structural dilemma of loss-making routes with one-way empty buses.

[^23]: [Taipei City Subsidy Regulations for Remote Service Bus Routes](https://laws.gov.taipei/law/LawSearch/LawArticleContent/FL026380) — Primary regulation specifying that rural subsidies are calculated as reasonable cost per vehicle-kilometer minus revenue, multiplied by services and mileage, and that routes with fewer than two passengers per vehicle-kilometer may apply.

[^24]: [Happy Bus official website: What is Happy Bus?](https://www.happybus.com.tw/Whatisbus) — Directorate General of Highways official source explaining the 2016 pilot of demand-responsive transit services (DRTS), the 2019 naming of “Happy Bus” and “Happy Taxi,” and costs of NT$30 to NT$40 per vehicle-kilometer.

[^25]: [Executive Yuan: Rural public-transportation coverage and transportation equity](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/25b3096e-90ec-42cf-bd2b-5a0b65d409eb) — Official data showing rural public-transportation coverage at a 2016 baseline of 70%, 91.96% in 2023, and 94.37% in March 2025, with a target of 100% in 2028.

[^26]: [Radio Taiwan International: National highway buses under the impact of high-speed rail](https://www.rti.org.tw/news?pid=186039&uid=3) — Reports that after high-speed rail opened, national highway bus services fell by about 40% from 2016 to 2024, passenger trips fell by 32.8%, average passenger trip length shrank from 93 kilometers to 67 kilometers, and eastern routes are served only by Kamalan on holidays.

[^27]: [The News Lens: Ordinary highway bus route counts shrink over a decade](https://www.thenewslens.com/article/193854) — Cites Directorate General of Highways data showing ordinary highway bus routes falling 43.7% from 2012 to 2022, a decline indicator using a different measure from service counts.

[^28]: [ETtoday: Taipei Bus Station’s second floor becomes empty after tenants leave](https://www.ettoday.net/news/20241020/2838555.htm) — Reports that after high-speed rail diverted passengers, operators moved out of Taipei Bus Station’s second floor, leaving the entire floor for lease and reflecting the knock-on impact of national highway bus decline on transfer facilities.

[^29]: [Wikipedia: Taipei City Trunk Bus](https://zh.wikipedia.org/wiki/臺北市幹線公車) — Records Taipei City’s 2017 and 2018 four-tier bus-network reclassification and the trunk-route design of four- to six-minute peak headways.

[^30]: [The Reporter: One year after TPASS commuter monthly pass launch](https://www.twreporter.org/a/data-reporter-a-year-after-tpass-was-launched) — In-depth report on TPASS policy origins, the NT$1,200 Keelung-Taipei-New Taipei-Taoyuan monthly pass, the three-year NT$20 billion special budget, and the first-year results from multiple perspectives.

[^31]: [Taipei Times: TPASS boosts bus and MRT ridership](https://www.taipeitimes.com/News/front/archives/2024/07/11/2003820639) — English-language report stating that after TPASS launched, bus ridership rose 19.6%, MRT ridership rose 36.9%, and users exceeded 700,000.

[^32]: [Storm Media: TPASS mode shift rate only 7.33% and 2026 funding-break crisis](https://www.storm.mg/lifestyle/11093047) — Reports that the private-vehicle shift rate was only 7.33%, the new NT$36.38 billion plan faces a funding break because the overall budget is stalled, and 20 cities and counties are affected.

[^33]: [PTS News: TPASS special budget expires and follow-up plan stalls](https://news.pts.org.tw/article/801336) — Reports that TPASS’s NT$20 billion special budget expires at the end of 2025, the newly budgeted NT$36.38 billion is affected by overall budget review, and localities are struggling by raising and advancing funds themselves.

[^34]: [Executive Yuan: 2030 full bus electrification policy](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/fbaa04ca-a430-48e7-8ba1-0b35d1dc4879) — Official policy: full electrification of urban buses by 2030, nearly 10,000 diesel buses to be replaced, a subsidized procurement target of 11,700 vehicles, and a plan approved in June 2023 with a NT$64.3 billion budget.

[^35]: [Epoch Times: 1,926 electric buses registered by the end of 2024](https://www.epochtimes.com/b5/25/1/8/n14409087.htm) — Cites MOTC data showing about 1,926 electric buses actually on the road by the end of 2024, an 18% share, seven cities and counties with none, and the layered gap from subsidy allocation to contracts as well as charging-equipment costs.

[^36]: [World Economic Forum: Japan’s rural public-transportation dilemma](https://www.weforum.org/stories/2020/01/japans-much-admired-public-transit-system-is-leaving-its-rural-areas-behind/) — English-language report noting that 85% of Japan’s rural bus operators lose money, Hiroshima taxi drivers average 63 years old, and more than 20% of the population lives too far from stations.

[^37]: [Korea Herald: Aging Seoul bus drivers and discussion of foreign drivers](https://www.koreaherald.com/article/10011103) — English-language report stating that nearly half of Seoul bus drivers are over 60, the shortage is about 600 drivers, and authorities are discussing introducing foreign drivers, showing a shared East Asian driver-shortage problem.

[^38]: [Interreg Europe: Challenges of rural transport in Europe](https://www.interregeurope.eu/rural-mobility) — EU regional cooperation platform stating that 129 million Europeans live in areas with inadequate public transportation and that UK rural bus fares cover less than 25% of costs, supporting the point that rural buses are a global structural problem.

[^39]: [Seamless Bay Area: Lessons from Taiwan’s fare integration for California](https://www.seamlessbayarea.org/blog/2025/1/5/notes-from-taiwan-regional-transit-fare-integration-programs-fuel-taiwans-ridership-growth) — California transportation advocacy organization analysis treating TPASS as a benchmark California can learn from, summarizing three factors: sufficient subsidies, central political will, and flexible local implementation.
