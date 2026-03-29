---
title: "Taiwan's Open Source Spirit — The Engineers Powered by Love"
description: "Taiwan's most influential open source project isn't a piece of software. It's a group of engineers who showed up at a hackathon and told their government: 'You're doing it wrong. We'll do it ourselves.'"
date: 2026-03-29
tags: ['open source', 'g0v', 'COSCUP', 'GitHub', 'civic tech', 'free software']
subcategory: 'Community & Digital Culture'
author: 'p3nchan'
readingTime: 8
category: 'Technology'
lastVerified: 2026-03-29
lastHumanReview: false
---

> Taiwan's software industry isn't exactly a global heavyweight. But there are over 44,000 GitHub users listing Taiwan as their location, a community hackathon count exceeding 70 events, and thousands of contributors — nearly all of them individual developers hacking on their own time and their own dime. This article goes beyond g0v. It maps Taiwan's open source culture from four angles: the people, the communities, the education system, and the industry structure that explains why it all runs on volunteer energy.

---

## A TV Ad That Sparked a Hackathon

In October 2012, Taiwan's Executive Yuan aired a 40-second TV commercial promoting its "Economic Power-Up Plan." The ad's entire pitch was a single sentence: "This plan is really complicated — it can't be explained in just a few words."

高嘉良 (Kao Chia-liang, known as clkao), a National Taiwan University computer science graduate, watched the ad and opened his laptop. He and a few friends were attending Yahoo! Open Hack Day. They scrapped their original project, and in three days built a budget visualization tool for the central government — winning an honorable mention. Two months later, clkao registered g0v.tw and used the prize money to host the "0th Hackathon for Mobilization and Suppression of Chaos" — a tongue-in-cheek reference to Taiwan's martial law era.

The name g0v replaces the "o" in "gov" (government) with a zero. The message is blunt: if you won't do it right, we will.

This is not an organization. g0v has no office, no board of directors, no full-time staff. It's a decentralized community held together by bimonthly hackathons. By the end of 2025, they had run over 70 hackathons, accumulated more than 8,000 members on Slack, and built up over 4,500 collaborative documents on HackMD.

---

## 72 Hours, 100 Apps

g0v's biggest moment in the international spotlight came in 2020.

In the early days of the COVID-19 pandemic, Taiwan implemented a real-name mask rationing system. The Ministry of Health and Welfare released an open API showing real-time mask inventory at every pharmacy. Audrey Tang, then the Digital Minister, posted the announcement in g0v's chat channel. What happened next was an eruption of collaborative energy unlike anything Taiwan had seen: 江明宗 (Chiang Ming-tsung, known as kiang) built a pharmacy mask map, Jarvis Lin built an Android app, and a LINE chatbot went live the same day.

Within a week, there were over 100 mask-lookup applications. An estimated thousand engineers contributed.

*Foreign Affairs* ran a feature — *Civic Technology Can Help Stop a Pandemic* — arguing that Taiwan demonstrated a third path, distinct from China's surveillance model and the Western Big Tech approach: democratic innovation driven by civic technology. Stanford Medical School documented 124 independent interventions Taiwan implemented during the pandemic. NPR, *MIT Technology Review*, and *Harvard Business Review* all published dedicated coverage.

This wasn't the government's achievement. It wasn't even just Audrey Tang's achievement. It was a swarm of unpaid engineers who opened their laptops on a weekend and built something that worked.

---

## Before Audrey Tang: The Root System

g0v didn't materialize out of thin air in 2012. It was possible because Taiwan had been cultivating open source soil for two decades.

唐鳳 (Audrey Tang) learned Perl at 12 and dropped out of school at 14 to start a company. Before entering government, she had launched over 100 projects on CPAN (Perl's module repository), led Pugs — the first working implementation of Perl 6, written in Haskell — and co-developed EtherCalc with Dan Bricklin, the inventor of the electronic spreadsheet. She was a recognized leader in the Perl and Haskell communities, with international open source credibility that long predated her political career.

洪任諭 (Hong Jen-yu, known as PCMan) is another emblematic figure. He's an internal medicine physician who taught himself to code in high school and wrote PCMan, a BBS terminal client that became wildly popular in Taiwan. In 2006, he launched LXDE — a lightweight Linux desktop environment. LXDE was, at the time, the lowest-memory-footprint mainstream desktop environment in the world, adopted by distributions like Knoppix and Lubuntu. A Taiwanese doctor's desktop environment, running on Linux machines worldwide. Hong later joined Google, but LXDE's story illustrates a defining trait of Taiwan's open source contributors: their day job isn't software, yet they produce internationally significant projects in their spare time.

黃敬群 (Huang Jing-chun, known as jserv) took a different path. He worked in systems software at MediaTek and Andes Technology, then moved to National Cheng Kung University's computer science department. There he created "Linux Kernel Internals" — the only university course in Taiwan that systematically dissects the latest Linux kernel. His students submit patches directly to Linux, glibc, GCC, and LLVM. He has presented at COSCUP and at Europe's FOSDEM. jserv doesn't represent the "lone genius" archetype — he represents a deliberate attempt to embed open source practice into the education system.

---

## The Community Ecosystem: Far More Than COSCUP

Taiwan's density of open source communities is, by Asian standards, abnormal.

**COSCUP** (Conference for Open Source Coders, Users and Promoters) has been running since 2006 and is Taiwan's largest open source conference. By 2024, attendance exceeded 2,800 people, with over 40 community rooms covering Kubernetes, PostgreSQL, Ruby, Python, Blockchain, and more. Each community room gets about six hours of programming time, curated independently by its own community. COSCUP charges no admission. Over a hundred volunteers run the entire event, all unpaid. 2025 marked COSCUP's 20th edition.

**SITCON** (Students' Information Technology Conference) launched in 2013, entirely organized by and for students. Its purpose is simple but powerful: show an 18-year-old high schooler that you don't have to wait until graduation to contribute to open source. SITCON holds an annual conference each March, plus mid-semester HackGen events, summer camps, and biweekly meetups.

**PyCon TW** is the annual Python conference, drawing cross-disciplinary Python users. **MozTW** is Taiwan's Mozilla volunteer community, maintaining the Traditional Chinese version of Firefox since 2004, running campus ambassador programs and subtitle translation teams. The "MozTW Space" community hub in Taipei operated from 2014 to 2023 — after Mozilla's sponsorship ended, it ran on local donations until it finally closed.

These communities overlap heavily. The same person might be a COSCUP speaker, a g0v contributor, and a PyCon TW volunteer. Taiwan's open source circle is small, but it is dense.

---

## Institutional Legacy and Rupture

Taiwan once had a government-backed effort to promote open source.

In 2003, the Institute of Information Science at Academia Sinica, funded by the Ministry of Economic Affairs' Industrial Development Bureau, established the Open Source Software Foundry (OSSF). OSSF provided project hosting, legal consultation, and newsletter outreach, nurturing the local open source community for over a decade. In 2015, the Ministry of Science and Technology decided to discontinue funding. OSSF shut down, and its website stayed online until the end of 2021.

The disappearance of OSSF didn't cause Taiwan's open source activity to decline — which tells you something important: Taiwan's open source energy was never dependent on the government. What actually holds the ecosystem together is the Open Culture Foundation (OCF), established in 2014. OCF was co-founded by multiple open source communities as a non-profit foundation. It serves as the communities' fiscal sponsor: issuing invoices for COSCUP, handling donations for projects, providing legal consultation on open source licensing. OCF also collaborates with the American Institute in Taiwan, the British Office Taipei, the World Bank, and other international bodies to export Taiwan's civic tech experience globally.

The structure here is revealing: the government program ended, and a grassroots foundation picked up the slack. The institution grew from the bottom up.

---

## "Powered by Love": The Structural Reasons

In Taiwan, the phrase 用愛發電 (yòng ài fā diàn — literally "generating electricity with love") has become a sardonic meme for volunteer-driven work done without pay. It perfectly describes Taiwan's open source scene.

The vast majority of Taiwan's open source contributors are individuals. There is no Red Hat-scale open source company. There is no corporate sponsorship program on the order of Google Summer of Code. Most tech companies' approach to open source is "we'll let employees do it in their spare time," not "we'll put it in their KPIs."

Why?

Taiwan's tech industry is built around hardware OEM manufacturing and IC design. The business models of TSMC, MediaTek, and Foxconn rest on manufacturing capability and patent moats — not open source code. Software in this ecosystem is often treated as "an accessory that ships with hardware," not an independent revenue stream. Of the thousands of software service companies in Taiwan, roughly 90% do systems integration for the domestic market.

The result: plenty of people write code, but almost nobody makes a living from open source. Open source happens after work, at community meetups, at Saturday hackathons. Look at COSCUP's sponsor list and you'll notice foreign companies (Google, LINE, Trend Micro) outnumber local ones.

This isn't entirely bad. Precisely because open source isn't a KPI, participants' motivations are purer. The mask map explosion of 2020 didn't happen because someone filed a ticket — it happened because a thousand engineers felt "this needs to be done."

But this model has a ceiling. Without sustained corporate investment, projects tend to stall once the core maintainer burns out. Taiwan doesn't lack weekend hackers. What it lacks are full-time open source positions.

---

## The Quiet Force of 44,000

There are 44,408 GitHub users listing Taiwan as their location (as of March 2026). You need at least 67 followers to make it onto the committers.top Taiwan leaderboard. Given Taiwan's population of 23 million, that means roughly one in every 500 Taiwanese has an active GitHub account. Compared to Japan, Singapore, and Hong Kong, Taiwan's per-capita GitHub activity ranks among the top tier in Asia.

But the numbers matter less than the type of contributions. Taiwanese developers in international projects often play the role of "invisible infrastructure": kernel patches, compiler optimizations, localization translations, documentation. Students from National Cheng Kung University submit code directly to the Linux kernel. MozTW has maintained the Traditional Chinese Firefox for twenty years. These contributions don't make the news, but without them, the software doesn't work.

Taiwan's open source community has another trait that's rare in Asia: g0v applies open source methodology to public policy. The vTaiwan platform uses Polis technology for online deliberation and has tackled over 30 issues, including Uber regulation and fintech legislation. *MIT Technology Review* called it "the simple but ingenious system Taiwan uses to crowdsource its laws." This goes beyond writing code. This is applying the collaborative logic of open source to democratic governance.

Open source in Taiwan has never been just a tech-community affair. It's an attitude: see a problem, open your editor, start writing.

---

## References

1. [g0v Civic Tech Project & Community Handbook](https://g0v.hackmd.io/@jothon/ctpbook) (primary source)
2. [2020 動盪一年，g0v 的貢獻可不只「口罩地圖」](https://www.gvm.com.tw/article/76428) — Global Views Monthly
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs
4. [公民黑客力 g0v 零時政府](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — Taiwan Panorama
5. [國際開源社群領導者唐鳳：開源是新時代交換典範](https://www.ithome.com.tw/news/93603) — iThome
6. [洪任諭 — Wikipedia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [黃敬群 — Wikipedia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [自由軟體鑄造場 — Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review
