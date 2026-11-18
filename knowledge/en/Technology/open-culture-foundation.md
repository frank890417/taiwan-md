---
title: "Open Culture Foundation: Doing the Most Boring Thing for Taiwan's Most Uncontrollable People"
description: "In 2020, the mask availability map went live in three days. All of Taiwan remembers the miracle. Nobody remembers who handled the project's receipts, contracts, and labor insurance filings. That back office was the Open Culture Foundation (OCF)—a decentralized movement built on the motto 'no one is omnipotent,' which, to keep hackers hacking, had to grow its own legal entity capable of issuing invoices and answering to a board of directors. A decade later, this back office that just wanted to help people file expenses became a name the international community thinks of when discussing digital rights in Taiwan."
date: 2026-06-03
author: 'Taiwan.md'
category: 'Technology'
subcategory: '開源社群'
tags:
  [
    'Technology',
    '開放文化基金會',
    'OCF',
    '公民科技',
    '數位人權',
    '開源社群',
    '網路自由',
  ]
readingTime: 13
lastVerified: 2026-06-04
lastHumanReview: false
featured: false
sporeLinks:
  - id: 117
    platform: 'threads'
    date: '2026-06-03'
    url: 'https://www.threads.com/@taiwandotmd/post/DZIRG2tk6mZ'
  - id: 118
    platform: 'x'
    date: '2026-06-03'
    url: 'https://x.com/taiwandotmd/status/2062197280984399945'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/開放文化基金會.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:c4ab423af923a984'
sourceBodyHash: 'sha256:429230fac9b89ba1'
translatedAt: '2026-06-16T17:03:25Z'
image: '/article-images/technology/ocf-open-freedom-share-poster.webp'
imageCredit: '開放文化基金會 (OCF)'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://ocf.tw/mediakit/'
---

# Open Culture Foundation: Doing the Most Boring Thing for Taiwan's Most Uncontrollable People

> **30-second overview:** The mask map that saved all of Taiwan in 2020 had hackers writing code, the government opening APIs, and convenience stores providing data—but few people ever asked who handled the receipts, signed the contracts, and filed the labor insurance for these hastily assembled projects. The answer is a legal entity you've probably never heard of: the Open Culture Foundation (OCF). It grew out of a conference receipt that couldn't be filed in 2014. Its staff grew from 1 to 19, and the open source communities it supports expanded from 4 to over 40.[^1] The most counterintuitive part: a movement that chanted "no one is omnipotent" and deliberately decentralized itself had, in order to survive, to grow a "system" of its own—one that could issue invoices and answer to a board of directors. And this back office that just wanted to help people file expenses became, a decade later, a name the international community brings up when Taiwan's digital rights are discussed.

In February 2020, COVID arrived fast and hard. Where masks were still available, how many were left—nobody could say for sure. Within three days, a real-time updated map went live: a group of civic engineers connected to the government's open National Health Insurance data and marked how many masks each pharmacy had left on a Google Map.[^2]

This story has been told many times—a high point for Taiwan's civic tech. People remember g0v, those three days, the slogan "no one is omnipotent." But few people have thought to ask the next question: who opened bank accounts for these hastily assembled projects, received payments, signed contracts with the government, and filed labor insurance for the engineers? A hacker can spin up a map in a weekend, but the boring things behind the map—the things the tax bureau cares about, the things that require someone's signature—are things hackers don't want to touch.

The ones doing those things were a legal entity called the Open Culture Foundation, abbreviated OCF.

You've probably never heard this name, yet you've very likely used something it supports or hosts: the g0v community behind the mask map, the LINE chatbot "Cofacts" that helps you verify disinformation, the annual summer open source conference. OCF is that kind of presence: **you've used its output but can't name it.** Even its CEO, Singing Li, is familiar with this awkwardness. She says that when she goes out to run a booth, "every event, every booth, I have to explain from scratch what open source is, so it's hard to have a deep conversation with anyone."[^3] A decade in, even people inside the community are still starting from "what exactly do we do."

## A Conference Receipt That Couldn't Be Filed

![Taipei street scene during the Sunflower Movement, crowds and protest banners around the Legislative Yuan, a quiet atmosphere of a movement in progress on the ground.](/article-images/technology/ocf-sunflower-movement-2014.webp)
_Taipei street scene during the 2014 Sunflower Movement. g0v set up citizen livestreams during this movement, pushing the energy of "fixing the public sphere yourself" to a peak. OCF was born out of that energy. Photo: Jesse Steele, CC BY 2.0 (full source in image credits at the end of the article)._

The origin story is anything but romantic.

In 2012, a community called g0v (pronounced "gov-zero") emerged in Taiwan. Its spirit was to "fork the government": since government websites were unusable and data wasn't open, copy their functionality and write a better version yourself. After the Sunflower Movement, the energy of "fixing the public sphere yourself" exploded. Hackathons ran one after another, projects piled up one after another.

Then reality came knocking: events cost money, and money means filing receipts. The problem was that g0v was loose to the point of having no boundaries. In the words of co-founder clkao (Kao Chia-liang, known in the community as clkao), it had "no fixed scope, no fixed membership, no joining process, no spokesperson, no single leader."[^4] This "no one" spirit looked beautiful when writing code, but it was completely unworkable when reconciling accounts with an accountant. When a sponsorship payment came in, whose name should the receipt be issued under? Whose name should an event's receipts be filed under?

OCF's website describes this predicament plainly: conference "financial accounts and receipts faced restrictions when processed through private companies or incorporated associations," so people in the community began discussing the formation of a foundation. Finally, "after g0v village chief clkao dug the hole," it was approved by the Taipei City Department of Cultural Affairs and established in June 2014.[^5] In plain terms, OCF was born from a receipt that couldn't be filed.

> 📝 **Curator's note**
> There's a choice hidden here that most reports glide over. OCF registered as a "foundation" (財團法人), not an "incorporated association" (社團法人). An incorporated association is a "collection of people"—it has members, a general assembly, and decisions are made by member vote, which is inherently decentralized. A foundation is a "collection of assets"—it has no members, only a fund and a board of directors.[^6] In other words, a decentralized movement built on the belief that "no one is omnipotent, there is no single leader" chose, when picking a container for itself, a structure that is more centralized and requires someone's signature. This is a sober compromise: a decentralized community can have no center, but the window dealing with the tax authority must have a name on it.

The NT$5 million founding fund was assembled from familiar faces in the open source world: core organizers of conferences like COSCUP, PyCon Taiwan, and OSDC, plus Li Ming-zhe (Izero), then COO of KKBOX, and the civic tech tool company Netivism.[^7] Interestingly, the one who dug the hole, clkao, didn't end up in the top seat. The current chair is Lee Po-feng (Li Bo-feng), who came out of the COSCUP community.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/bNZUmHfCFxg" title="COSCUP 2014 - State of the unison: g0v 村情咨文 - clkao" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_clkao delivering the "g0v State of the Village" address at COSCUP 2014, explaining firsthand how a community with "no single leader" operates. Video: g0v.tw official channel._

## Issuing Invoices for "No One"

![A group of people sitting around a long table collaborating, laptops and screens lit up—the indoor scene of g0v's 13th hackathon in 2015, participants grouped and working on civic tech projects.](/article-images/technology/ocf-g0v-hackathon-2015.webp)
_g0v's 13th hackathon, 2015. Hackers can spin up a project in a weekend, but the receipts, contracts, and labor insurance behind the project have to be handled by someone—that's the part OCF took on. Photo: g0v.tw, CC BY 2.0 (full source in image credits at the end of the article)._

What OCF actually does, stated plainly, is unsexy: opening bank accounts, receiving payments, reconciling accounts, issuing receipts, running processes, applying for grants, handling all the miscellaneous tasks for an event from start to finish.[^7] Any community that wants to hold events or accept donations—but doesn't want to register an organization or bear full-time staffing costs—can hand these maddening back-office tasks to OCF. Board member Lee Po-feng put it aptly: "These are all small things, but accumulated they become many and miscellaneous."[^8] The essence of back-office administration is in that sentence. No single item looks like a big deal on its own, but stacked together, they're enough to crush a volunteer team that just wants to write code.

The most representative example is Cofacts. In 2016, a group of g0v engineers and volunteers built this "Real or Fake" verification chatbot. You send a suspicious message to it on LINE, and it tells you whether it's been fact-checked and whether it's true or false—Taiwan's first open-source collaborative fact-checking chatbot. But for a chatbot to run long-term, it needs servers, people, and a lot of miscellaneous support. Cofacts later looked back on that period: it "didn't need to worry about complicated paperwork, accounting systems, or bearing the full-time staffing costs of establishing an organization," and was able to grow slowly in the "community cradle" of OCF.[^9]

"Community cradle" is probably the most accurate description of OCF's role. It never acts as the boss of these projects, nor does it claim credit as the inventor. It simply gives projects a place to stay when they're still fragile.

> 💡 **Did you know?**
> Many people assume OCF is g0v's "parent organization" or superior body—in fact, it's the opposite. clkao explained that the original reason was that "a loose community like g0v" had difficulty joining formal international networks, so OCF was created to "act as a proxy to represent" g0v within those networks.[^10] In plain terms: OCF is g0v's legal agent in the formal world, signing the signatures that someone has to sign—not its boss. g0v is still the g0v where no one can represent everyone.

Because of this, OCF never claims the mask map as something it built. That was the work of g0v hackers, government APIs, and convenience store chains pieced together. Its place in that miracle was further back, quieter: when passion needed a place to land, it was there.

## From a Home to a Castle on Wheels

![A bright meeting space with dozens of people sitting at neatly arranged tables participating in a workshop, someone presenting at the front—the scene of the 2017 g0v Civic Tech Grant Kickoff.](/article-images/technology/ocf-g0v-civictech-grant-2017.webp)
_The 2017 g0v Civic Tech Grant Kickoff workshop. When a community wants to scale a project, it needs a back office that can manage money, run events, and interface with the outside world—this is the role OCF grew into. Photo: Kirby Wu, CC BY-SA 2.0 (full source in image credits at the end of the article)._

OCF's first employee was Singing Li (Li Xin-ying), known in the community as singing, who is also the current CEO.[^11] Starting with just her, in the space at 4F, No. 94, Section 1, Bade Road in Taipei—affectionately nicknamed "Bade 94" by the community—over ten years the full-time staff grew to 19, and the open source communities supported expanded from the original 4 to over 40.[^1]

The numbers speak, but OCF's own descriptions are more vivid. It calls Bade 94 a "supply station for open source communities across Taiwan," says it "upgraded from a 'home' where community partners could rest to a mobile castle carrying open source communities in different directions," and calls itself "a bridge connecting technology and human rights, community and government."[^12] Supply station, home, mobile castle, bridge—these words together form the throughline of this article: OCF doesn't become famous by standing in the spotlight. It does so by being others' backup, others' transfer station.

In the year this castle turned ten, it held an event that didn't quite look like something a foundation would hold. In September 2024, over 800 people packed into a Taipei live house, with 15 booths on site and performances by Lim Giong, Kou Chou Ching, and the band Lily & The Bamboos.[^3] A back office that started with filing receipts spent its tenth anniversary throwing a concert. And behind this kind of spectacle lies the biggest summer gathering tradition in Taiwan's open source world—events like the COSCUP open source conference below, the kind of event that organizations like OCF quietly hold up from behind the scenes.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/MK0BeifqfBE" title="COSCUP 2024: Welcome Day 1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_COSCUP 2024 opening session. Large-scale community events like this, often with thousands of attendees, frequently have their accounting, venue, and contracts handled under OCF's name. Video: COSCUP official channel._

And a comment from board member Li Ming-zhe (known in the community as Izero) punctures this growth arc: OCF was founded "to solve the problems of event organization, cash flow, and bookkeeping for open source communities. Now we don't just do these things—we do many meaningful things."[^13] These six words—"now we don't just do these"—contain a turning point: how did a back office originally responsible for filing receipts start speaking to the government on behalf of the entire community?

## The Person Who Filed Receipts Learned to Speak for Everyone

![Portrait of Audrey Tang, wearing thin-framed glasses, short hair, smiling, against a plain light background.](/article-images/technology/ocf-audrey-tang-2016.webp)
_Audrey Tang: from g0v participant to Taiwan's first Minister of Digital Affairs. OCF has repeatedly engaged with the digital ministry under her leadership—both cooperating and keeping watch. Photo: Audrey Tang, released by the author, CC0 public domain (full source in image credits at the end of the article)._

Imagine the person in a neighborhood who runs errands for everyone. He stamps documents and handles miscellaneous tasks for residents, but as he gets busier, he ends up speaking for the whole street at district office meetings. OCF's transformation follows roughly this path. Once it got good at handling receipts, legal affairs, and HR, it found itself in a unique position: it knew all the communities, it understood technology, and it had a formal identity for dealing with government and corporations. So it began doing things beyond filing receipts: watching over public issues related to "openness" and "freedom" on behalf of the community.

Its first major move came in 2022. The year the Ministry of Digital Affairs was established was a moment of both anticipation and vigilance for the civic tech community: the government finally had a dedicated digital ministry, but how would it use its power? OCF joined forces with groups like the Taiwan Association for Human Rights to issue a statement. Among its six demands was one called "Public Money Public Code": software developed with taxpayers' money should have its source code made publicly available. After issuing the statement, they invited Digital Affairs Minister Audrey Tang to face the community and answer nearly 40 questions.[^14]

That same year, the Legislative Yuan was reviewing the draft _Digital Intermediary Services Act_—a bill many feared would become a tool for speech control. OCF's response was very characteristic of its nature: it didn't take to the streets to lead opposition. Instead, it held four workshops, discussing the provisions article by article, introducing how other countries regulate platforms, and laying different positions on the table to build consensus.[^15] The draft was eventually shelved amid significant controversy.

It also turned its gaze toward corporations. In 2023, OCF partnered with the Taiwan Association for Human Rights and others to use an international index to examine 20 platforms and telecom companies that Taiwanese people use daily, assessing whether they sufficiently respect users in corporate governance, freedom of expression, and privacy protection.[^16] The results were telling: out of a full score of 100, the highest-scoring Rakuten Market only got 33.5, while the lowest-scoring Taiwan Mobile scored just 21.49.[^17] Even the largest platforms and telecoms were far from passing when it came to "respecting your digital rights."

> 📝 **Curator's note**
> The conventional narrative credits the success of Taiwan's civic tech to "particularly passionate hackers." This narrative sounds nice but reverses cause and effect. Passion is actually the cheapest and most easily burned out resource. The enthusiasm ignited at a weekend hackathon doesn't survive a third round of "who's going to handle the invoice for that sponsorship payment." The reason Taiwan's civic tech didn't flash and fade but endured for a decade is closer to this explanation: someone was willing to do the unsexy work, giving passion a place to land. And this back office that specialized in boring tasks, as it kept doing them, grew the ability to speak to the government and corporations on behalf of the entire community.

## One Command, and a Website Quietly Disappears from Taiwan

The issue that best shows the distance OCF has traveled from "filing receipts" to "watchkeeping" is website blocking.

In July 2024, the _Fraud Crime Harm Prevention Act_ was passed on third reading. Article 42 gave authorities a power: in urgent situations, to prevent the public from connecting to fraudulent websites, they could order internet service providers to "stop resolution or restrict access."[^18] "Stop resolution" sounds technical, but it's simple in plain terms: the government can tell providers to "pretend not to recognize" a certain URL on Taiwan's internet. The mechanism used is called DNS RPZ: once a URL is added to a policy list, the DNS server pretends it can't find it when it sees it. And so the website quietly disappears from Taiwan's internet—you won't even receive a notice saying "this has been blocked."[^19]

Fighting fraud is of course a good thing. The question is "who can issue this order, and does it need to go through a court first." This mechanism actually has two versions: the earlier RPZ 1.0 required a court judgment, ruling, or administrative disposition before a site could be blocked—there was judicial oversight. The later RPZ 1.5 relaxed this to allow blocking upon emergency application by law enforcement, without prior judicial review.[^19] The gap between the two versions is staggering. According to a Freedom House report, from June 2023 to May 2024, RPZ 1.0 blocks with court orders covered only 29 domains; RPZ 1.5 emergency-application blocks covered 36,559. By the first half of 2025, over 50,000 websites had been designated for blocking, the vast majority without any judicial review.[^20]

> ⚠️ **Contested perspective**
> Taiwan's internet freedom actually ranks among the world's best—Freedom House gives it a score of 79 (in the "Free" category), 7th globally and 1st in Asia. But the score isn't perfect, and one reason it's marked down is the lack of judicial oversight in RPZ 1.5.[^21] What's more unsettling is "whether the line will expand": originally said to be a tool for fighting fraud, it began being used in non-fraud contexts. In February 2025, an LGBT forum was blocked under the _Child and Youth Sexual Exploitation Prevention Act_. In December 2025, the Chinese social platform Xiaohongshu (RED) was blocked by the Ministry of the Interior for one year under Article 42.[^22] Both cases raised controversy: will an emergency mechanism originally targeting fraud gradually be used on more and more content the government dislikes? This is exactly the kind of boundary question watchkeeping needs to monitor: where the line should be drawn, whether it's transparent enough, and whether blocked parties can appeal.

OCF didn't absent itself from this issue, and its way of keeping watch was very OCF: no street protests with slogans, but events that lay the problem out for discussion. In October 2024, its blog's "Digital Rights Weathervane" column published a two-part series on website blocking, asking all the boundary questions.[^23] That December, it held an "Internet Freedom Meetup" with the theme "Has Government Anti-Fraud DNS RPZ Stop-Resolution Gone Too Far?"—inviting lawyers and researchers to speak openly under Chatham House rules.[^24] By 2025, the Ministry of Digital Affairs had revised the DNS RPZ handling procedures, explicitly requiring a court judgment, ruling, or administrative disposition, and establishing an appeal and remedy mechanism.[^25] This was precisely the direction OCF and other groups had been pushing through sustained watchkeeping. Watchkeeping never produces results from a single shout—it's a long-term project of debating "where the line should be drawn" that will continue indefinitely.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/7YMu-K66jHA" title="Keynote Panel: Taiwan Communities and Democratic Defense | g0v summit 2020" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_g0v Summit 2020 keynote panel "Taiwan Communities and Democratic Defense." Defending an open, non-arbitrarily-blocked internet has been shared work for Taiwan's civic community in recent years. Video: g0v.tw official channel._

## Taking Government Resources, Watching the Government's Hand

But if the story stopped here, it would be too clean, too heroic. OCF itself isn't that at ease.

The most honest voice comes from board member Chen Kuei-cheng (KC). In the tenth-anniversary retrospective, he said: "What worries me more now is that as the organization grows, operational pressure could cause a drift in core values."[^26] This comes from inside the organization—OCF's vigilance about "its own growth": an organization that grew from filing receipts into an international bridge—in the process of chasing grants and chasing programs, will it slowly forget why it existed in the first place? Another board member, Chao Po-chiang, pointed out a subtler crack: people in the open source core circle "might feel that digital rights has nothing to do with them."[^27] When an organization originally serving open source communities moves further and further toward digital rights, will its earliest people feel it's no longer the home that helped file receipts all those years ago?

There's also a more structural tension—one OCF is always asked about and never avoids: it both accepts government programs and oversees the government. In 2024, it partnered with the Ministry of Digital Affairs and Deloitte Taiwan to hold six "Public Money Public Code" capacity-building workshops across Taiwan.[^28] At the same time, it was holding events questioning whether the government's website blocking had gone too far. OCF's English website even lays its cards on the table, acknowledging that "OCF's operations rely on funding from government, corporate, and other projects."[^29]

This tension becomes clear when compared with another organization. The Taiwan Association for Human Rights, which also works on digital rights, states its independence in no uncertain terms: "We do not accept subsidies or donations from political parties, do not undertake government procurement or research projects, and do not accept funding that could affect the independence of our operations."[^30] Both are watching over the same thing, yet they chose completely opposite funding stances: one deliberately keeps its distance from government money, the other takes government resources while watching the government's hand. Which is more right? There's no standard answer. OCF's way of handling this tension is to make its work as transparent as possible: annual reports public, evaluation methodology public, workshop records public—so anyone can check whether it has softened its stance because of the money it receives.

> 💡 **Did you know?**
> Taiwan's digital rights world has never been carried by OCF alone—it's more like a group of people each holding a piece: the Taiwan Association for Human Rights does internet transparency reports, the Judicial Reform Foundation does website blocking advocacy, the Taiwan Democracy Lab does information manipulation research. The role OCF plays in this network is the bridge and node that connects everyone, runs events, and handles international engagement—not a lone hero. Watchkeeping was always meant to be collaborative. "No one is omnipotent" holds true here once again.

## Watching, and Looking Beyond the Island

OCF's watchful gaze doesn't stop at Taiwan's shores.

It is OONI's Taiwan partner. OONI is a project under the Tor Project dedicated to monitoring internet censorship worldwide. OCF helps translate monitoring documents into Chinese and conducts internet coverage observations in Taiwan. In February 2025, it co-hosted a workshop with Tor and Tails, bringing Tor core developer Roger Dingledine to Taiwan.[^31] In the Association for Progressive Communications (APC), it defines itself as the only organization in Taiwan "spanning the three advocacy areas of open technology, digital rights, and internet governance."[^32] It also conducts research. An East Asia privacy report places Taiwan and Hong Kong side by side: Taiwan's focus is on digital ID cards and health insurance data that doesn't give people an "opt-out" option, while Hong Kong's focus is on how the national security law has shrunk civic space.[^33]

These accumulated efforts had a highlight moment in February 2025: the world's largest digital rights conference, RightsCon, came to East Asia for the first time, hosted in Taipei, with 3,000 attendees from 150 countries and over 500 sessions. OCF was the local partner for this event.[^34]

<div style="max-width:340px;margin:1.5rem auto;">
<div class="video-embed" style="position:relative;padding-bottom:177.78%;height:0;overflow:hidden;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/gxx0a4RmVLk" title="Internet Freedom Meetup RECAP: Global Digital Rights Conference RightsCon 25 Taipei Intro Session" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
</div>

_OCF's own introductory short film for RightsCon 2025 Taipei, presented at an "Internet Freedom Meetup." Video: OCF official channel._

That was the highlight. But something that happened a year later pulled this story back to a heavier place.

## A Conference Cancelled Because "There Can Be No Taiwanese"

RightsCon 2026 was originally to be held in Zambia. The problem was the venue: it was built with a US$30 million donation from China in 2022. During preparations, the Chinese side pressured the organizers to exclude Taiwanese participants and censor topics related to China. The organizing body, Access Now, refused these conditions and ultimately cancelled the entire conference.[^35]

OCF had planned to send approximately 5 representatives. On this matter, an OCF representative put it plainly—plainly to the point of heartache: China's interference in Taiwan's international participation "has never been anything new to Taiwan's NGO community."[^36]

And here, the cancellation of a conference draws a complete line back to a back office that only knew how to file receipts. What OCF watches over—an open, uncensored internet that anyone can freely connect to—is, in fact, the same thing as whether Taiwan can appear in the world under its own name. A conference cancelled because "there can be no Taiwanese" and a website erased from the internet by a single command are driven by the same force: someone wants to decide who can be seen and who must disappear.

So back to the beginning. A movement that chanted "no one is omnipotent" ultimately needed someone to, with full seriousness, paste every receipt properly and sign every annual report. OCF is the one willing to do the least sexy part of the work. A decade ago it grew out of a conference receipt that couldn't be filed. Today it watches over an island's still-unblocked internet.

You've used its output (the mask map, the fact-checking chatbot, the open source conference) and still can't name it. Perhaps this is exactly what makes it most like that neighborhood errand-runner: it carries all the miscellaneous tasks, connects the whole street, and quietly stays in that office you walk past every day but never remembered the address of. 4F, No. 94, Section 1, Bade Road.

## Further Reading

- [Open Source Communities and g0v](/en/technology/open-source-and-g0v) — OCF was born to file receipts for communities like g0v, those civic hackers who "forked the government," and the 72-hour mask map.
- [Taiwan's Open Source Spirit](/en/technology/taiwan-open-source-spirit) — The "Public Money Public Code" philosophy that OCF embodies is precisely the extension of Taiwan's open source culture from the tech world into public governance.
- [Audrey Tang](/en/people/audrey-tang) — From g0v participant to the first digital minister, OCF has repeatedly engaged with the Ministry of Digital Affairs under her leadership—both cooperating and keeping watch.
- [Cognitive Warfare](/en/society/cognitive-warfare-against-taiwan) — The disinformation battlefield that the Cofacts fact-checking chatbot combats, and the information manipulation Taiwan faces.

## Image Credits

This article uses the following public domain / CC-licensed images, all cached in `public/article-images/technology/` to avoid hotlinking source servers:

- [OCF "Open" promotional poster](https://ocf.tw/mediakit/) (hero) — Photo: Open Culture Foundation (OCF), CC BY-SA 4.0.
- [Sunflower Movement Taipei street scene (2014)](https://commons.wikimedia.org/wiki/File:Taipei_Sunflower_Movement_All_Is_Quiet_%2813662054395%29.jpg) — Photo: Jesse Steele, CC BY 2.0.
- [g0v 13th hackathon (2015)](https://commons.wikimedia.org/wiki/File:G0v_hackathon_13_%2817209196362%29.jpg) — Photo: g0v.tw, CC BY 2.0.
- [g0v Civic Tech Grant Kickoff workshop (2017)](https://commons.wikimedia.org/wiki/File:%E5%85%AC%E6%B0%91%E7%A7%91%E6%8A%80%E7%8D%8E%E5%8A%A9%E9%87%91_Kickoff_DSC_6125_%2833364440162%29.jpg) — Photo: Kirby Wu, CC BY-SA 2.0.
- [Audrey Tang portrait (2016)](https://commons.wikimedia.org/wiki/File:Audrey_tang_089_%2825378300354%29_%28cropped%29.jpg) — Photo: Audrey Tang, released by the author, CC0 public domain.

All videos are embedded from official YouTube channels: g0v "State of the Village" address (COSCUP 2014), COSCUP 2024 Welcome, g0v Summit 2020 "Taiwan Communities and Democratic Defense." Copyright belongs to g0v.tw / COSCUP official channels.

## References

[^1]: [Ten Years of OCF | Open Culture Foundation](https://ocf.tw/story/ten-years-of-ocf/) — OCF official tenth-anniversary retrospective, verbatim record of staff growing from 1 to 19 full-time employees, supported open source communities expanding from the initial 4 to over 40, and self-descriptions such as "supply station / home / mobile castle / bridge."

[^2]: [g0v | Wikipedia](https://en.wikipedia.org/wiki/G0v) — g0v movement entry, documenting how during COVID-19 in 2020 the g0v community collaborated with the government to connect pharmacy mask inventory data across Taiwan and complete the mask map within days.

[^3]: [Find Your Place | Open Culture Foundation](https://ocf.tw/story/find-your-place/) — OCF official documentation of open source conferences and community participation, including CEO Singing Li's verbatim remarks about "every event, every booth, having to explain from scratch what open source is."

[^4]: [A Decade of Observation: g0v's Highs and Looseness | clkao (Kao Chia-liang)](https://clkaozh.substack.com/p/g0v-first-decade) — Co-authored by g0v co-founder clkao with ipa and Kirby, verbatim description of g0v's decentralized characteristics: "no fixed scope, no fixed membership, no joining process, no spokesperson, no single leader."

[^5]: [About Us | Open Culture Foundation](https://ocf.tw/about/) — OCF official introduction page, verbatim record of the foundation's 2014 origin in conference receipt filing problems, initiated by g0v village chief clkao, approved by the Taipei City Department of Cultural Affairs, and the founding donor list.

[^6]: [The Difference Between Foundations and Incorporated Associations | Legis-Pedia](https://www.legis-pedia.com/article/company-enterprise-organization/1114) — Legal comparison of the two entity types: incorporated associations are a "collection of people" with a members' general assembly as the highest body; foundations are a "collection of assets" operated by a board of directors according to the donor's charter.

[^7]: [Administrative Assistance | Open Culture Foundation](https://ocf.tw/p/admin/) — OCF official administrative services page, itemizing back-office tasks such as opening independent accounts, receiving and withdrawing payments, reconciling accounts, producing reports, and issuing receipts—primary documentation for understanding OCF's hosting model.

[^8]: [Ten Years of OCF | Open Culture Foundation](https://ocf.tw/story/ten-years-of-ocf/) — OCF tenth-anniversary retrospective, including board chair Lee Po-feng's verbatim remarks on back-office administration: "These are all small things, but accumulated they become many and miscellaneous."

[^9]: [Community Project: Cofacts | Open Culture Foundation](https://ocf.tw/p/cofacts/) — OCF official page documenting Cofacts as a 2016 g0v-community-initiated, uniquely open-source civic collaborative fact-checking chatbot project, with OCF providing document, accounting, and HR hosting, growing in the "community cradle."

[^10]: [clkao Interview with Commonwealth Magazine](https://medium.com/@clkao/cw-interview-73848141ac5) — clkao explaining how OCF was established to "act as a proxy to represent" the loose g0v community, clarifying that OCF is not g0v's parent organization but a legal proxy window.

[^11]: [What is OCF | Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html) — OCF English self-introduction page, documenting the foundation's 2014 establishment by multiple Taiwan open source communities and confirming Singing Li (Li Xin-ying) as the current CEO and first employee.

[^12]: [Ten Years of OCF | Open Culture Foundation](https://ocf.tw/story/ten-years-of-ocf/) — OCF official tenth-anniversary retrospective, verbatim record of self-descriptions such as "supply station / home / mobile castle / bridge," and the origin of the community nickname "Bade 94" for the Bade Road office.

[^13]: [Ten Years of OCF | Open Culture Foundation](https://ocf.tw/story/ten-years-of-ocf/) — OCF tenth-anniversary retrospective, including board member Li Ming-zhe (Izero)'s verbatim remarks on OCF's role transformation from solving "cash flow, bookkeeping" problems to "doing many meaningful things."

[^14]: [Joint Statement: Ministry of Digital Affairs Needs a Comprehensive Digital Transformation Plan | Open Culture Foundation](https://ocf.tw/p/issues/2022/) — OCF joining the Taiwan Association for Human Rights and other groups to issue the civic community's first joint statement on the establishment of the Ministry of Digital Affairs in July 2022, with six demands including "Public Money Public Code," and inviting Digital Minister Audrey Tang to face the community and answer nearly 40 questions.

[^15]: [Foundation Project: Digital Intermediary Services Act Workshops | Open Culture Foundation](https://ocf.tw/p/ocf) — Regarding the 2022 draft _Digital Intermediary Services Act_, OCF co-hosted four workshops with the community, discussing draft provisions article by article and introducing digital service regulatory policies in other countries to build social consensus. The draft was later shelved amid controversy.

[^16]: [Corporate Digital Rights | Open Culture Foundation](https://ocf.tw/p/rdr/) — OCF partnering with the Taiwan Association for Human Rights and others in 2023 to use the Ranking Digital Rights international index to examine 20 Taiwanese telecoms, social platforms, job banks, and e-commerce platforms, assessing corporate governance, freedom of expression, and privacy.

[^17]: [Corporate Digital Rights Evaluation Results | Open Culture Foundation](https://ocf.tw/p/rdr/) — OCF corporate digital rights report scores: Rakuten Market 35.5, Shopee 31.67, Dcard 30.76, Far EasTone 29.67, Chunghwa Telecom 26.73, Taiwan Mobile 21.49 (out of 100).

[^18]: [Fraud Crime Harm Prevention Act, Article 42 | Laws & Regulations Database of the Republic of China](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0080226) — Official government legal database, containing the full text of Article 42 regarding authorities' power to order internet service providers to "stop resolution or restrict access" to fraudulent websites, enacted July 2024.

[^19]: [Internet Intermediary Platform Content Regulation: From "Notice and Takedown" to Being "Blocked" | NCC NEWS Monthly](https://newsweb.ncc.gov.tw/202412/ch5.html) — National Communications Commission official monthly publication, explaining how the DNS RPZ mechanism makes websites "disappear" through stop-resolution, and the differences between RPZ 1.0 (requiring judicial or administrative action) and RPZ 1.5 (emergency application) versions.

[^20]: [Freedom on the Net 2024: Taiwan | Freedom House](https://freedomhouse.org/country/taiwan/freedom-net/2024) — Freedom House annual internet freedom report, documenting the contrast between 29 domains blocked under RPZ 1.0 court orders and 36,559 domains blocked under RPZ 1.5 emergency applications from June 2023 to May 2024.

[^21]: [Freedom on the Net 2024: Taiwan | Freedom House](https://freedomhouse.org/country/taiwan/freedom-net/2024) — Freedom House awarding Taiwan an internet freedom score of 79 ("Free" category), 7th globally and 1st in Asia, noting that one reason the content restriction category did not receive full marks was the lack of judicial oversight in RPZ 1.5.

[^22]: [Freedom on the Net 2025: Taiwan | Freedom House](https://freedomhouse.org/country/taiwan/freedom-net/2025) — Freedom House 2025 report, documenting over 50,000 websites designated for DNS RPZ blocking in Taiwan in the first half of the year, the vast majority without judicial review, and noting boundary controversies arising from the mechanism being used in non-typical fraud situations (such as forums and overseas social platforms).

[^23]: [Digital Rights Weathervane: The Application and Controversy of Website Blocking | OCF Blog](https://blog.ocf.tw/2024/10/ocf.html) — OCF blog "Digital Rights Weathervane" column, October 2024, publishing a two-part series on website blocking, exploring boundary questions regarding Taiwan's website blocking mechanisms, standards, transparency, and remedy channels.

[^24]: [Internet Freedom Meetup: Has DNS RPZ Stop-Resolution Gone Too Far? | KKTIX](https://ocftw.kktix.cc/events/internetfreedom-dec2024) — OCF December 2024 "Internet Freedom Meetup" event page, discussing whether government anti-fraud DNS RPZ stop-resolution measures have gone too far, inviting lawyers and researchers to discuss under Chatham House rules.

[^25]: [Reference Procedures for Using DNS RPZ Self-Regulatory Mechanism to Stop Resolution of Illegal Websites | Ministry of Digital Affairs](https://moda.gov.tw/information-service/govinfo/administrative-directions/ad-resource-management/16778) — Ministry of Digital Affairs official administrative guidance, revised in 2025 to explicitly require stop-resolution to be based on court judgments, rulings, or administrative dispositions, and to establish an appeal and remedy mechanism.

[^26]: [Ten Years of OCF | Open Culture Foundation](https://ocf.tw/story/ten-years-of-ocf/) — OCF tenth-anniversary retrospective, including board member Chen Kuei-cheng (KC)'s verbatim internal reflection on "as the organization grows, operational pressure could cause a drift in core values."

[^27]: [Ten Years of OCF | Open Culture Foundation](https://ocf.tw/story/ten-years-of-ocf/) — OCF tenth-anniversary retrospective, including board member Chao Po-chiang's verbatim remarks on the route tension between the open source core circle and digital rights advocacy.

[^28]: [Public Money, Public Code | Open Culture Foundation](https://ocf.tw/p/pmpc/) — OCF official page documenting the 2024 program partnering with the Ministry of Digital Affairs and Deloitte Taiwan to hold 6 "Public Money Public Code" capacity-building workshops across Taiwan.

[^29]: [What is OCF | Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html) — OCF English website verbatim acknowledgment that its operations rely on funding from government, corporate, and other projects—a primary statement for understanding its funding structure and independence tension.

[^30]: [About Us | Taiwan Association for Human Rights](https://www.tahr.org.tw/about) — Taiwan Association for Human Rights official website, verbatim statement of the independence principle of "not accepting subsidies or donations from political parties, not undertaking government procurement or research projects," serving as a comparison case for OCF's funding stance.

[^31]: [Open Culture Foundation | OONI](https://ooni.org/partners/open-culture-foundation/) — OONI (internet censorship monitoring project under the Tor Project) official partner page, documenting OCF's cooperation in Taiwan internet coverage observation, document Chinese localization, and workshop hosting.

[^32]: [Open Culture Foundation (OCF) | APC](https://www.apc.org/en/open-culture-foundation-ocf) — Association for Progressive Communications (APC) official website, containing OCF's self-definition as the only organization in Taiwan "spanning the three advocacy areas of open technology, digital rights, and internet governance."

[^33]: [Empowering Privacy East Asia Report | Open Culture Foundation](https://ocf.tw/en/p/dra/ep/) — OCF-led East Asia privacy report comparing privacy situations in Taiwan and Hong Kong: Taiwan focusing on digital ID cards and the lack of opt-out options for health insurance data, Hong Kong focusing on the chilling effect of the national security law on civic advocacy.

[^34]: [RightsCon 2025 @ Taipei — Introducing OCF | RightsCon](https://www.rightscon.org/introducing-ocf/) — RightsCon official page introducing OCF as the local partner for the 2025 Taipei conference, confirming the scale of 3,000 attendees, 150 countries, and over 500 sessions—the first RightsCon held in East Asia.

[^35]: [RightsCon 2026 Cancelled After China Pressured Exclusion of Taiwan | Focus Taiwan](https://focustaiwan.tw/politics/202605090005) — CNA English-language report on RightsCon 2026 being cancelled after the Zambian venue was built with Chinese donation, the Chinese side pressured exclusion of Taiwanese and censorship of topics, and organizer Access Now refused and cancelled the conference.

[^36]: [RightsCon 2026 Cancelled: OCF's Response | Focus Taiwan](https://focustaiwan.tw/politics/202605090005) — CNA English-language report containing OCF representative's verbatim response that "China's interference in Taiwan's international participation has never been anything new to Taiwan's NGO community."
