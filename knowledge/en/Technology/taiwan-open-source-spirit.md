---
title: "Taiwan's Open Source Spirit: The Engineers Powered by Love"
description: 'Taiwan''s most influential open source project isn''t software, but a group of engineers telling the government at hackathons: "If you can''t do it, we will."'
date: 2026-03-29
category: 'Technology'
tags: ['Open Source', 'g0v', 'COSCUP', 'GitHub', 'Civic Tech', 'Free Software']
subcategory: '社群與數位文化'
author: 'p3nchan'
featured: false
lastVerified: 2026-03-29
lastHumanReview: false
readingTime: 8
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣開源精神.md'
sourceCommitSha: '22286539e'
sourceContentHash: 'sha256:8cc121a9cccbf90a'
sourceBodyHash: 'sha256:98feb4bab36f053f'
translatedAt: '2026-11-05T01:16:53+08:00'
---

> Taiwan's software industry may not be globally top-tier in scale, but there are over 44,000 users on GitHub who tag themselves as "Taiwan," and community hackathons have totaled over 70 sessions with thousands of contributors—almost all of whom are individual developers working on their own dime after work. This article does not just discuss g0v; it pieces together a complete map of Taiwan's open source culture from four perspectives: people, community, education, and industry.

---

## A Hackathon Triggered by an Advertisement

In October 2012, the Executive Yuan aired a 40-second television advertisement promoting an "Economic Momentum Boost Program." The ad contained only one sentence: "This plan is truly complex and cannot be explained clearly in just a few simple words."

Kao Chia-liang (clkao), a graduate of National Taiwan University's Department of Computer Science, watched the ad and opened his computer. He and several friends participated in Yahoo! Open Hack Day, improvised a new topic, and within three days wrote a "Central Government Budget Visualization" project, which won an honorable mention. Two months later, Kao registered g0v.tw and used his prize money to host the "Zeroth Mobilization Counter-Attack Hackathon."

The name _g0v_ comes from replacing the 'o' in _gov_ (government) with a '0'. The meaning is direct: If you can't do it, we will.

This is not an organization. g0v has no office, no board of directors, and no full-time employees. It is a decentralized community maintained through biennial hackathons. By the end of 2025, more than 70 hackathons have been held, there are over 8,000 members on Slack, and over 4,500 collaborative notes have accumulated on HackMD.

---

## 72 Hours, 100 Apps

g0v's most internationally recognized moment was in 2020.

At the onset of the COVID-19 pandemic, Taiwan implemented a real-name mask procurement system. The Ministry of Health and Welfare released an open API for pharmacy mask inventory, and Audrey Tang, then the Digital Minister, posted the news in the g0v chat channels. In the following 72 hours, the Taiwanese developer community erupted with unprecedented collaborative energy: Chiang Ming-tsung (kiang) created a pharmacy mask map, Jarvis Lin developed an Android app, and a LINE chatbot also went live on the same day.

Within one week, there were over 100 applications related to mask inquiries. It is estimated that nearly a thousand engineers participated in the development.

_Foreign Affairs_ published a special feature titled _Civic Technology Can Help Stop a Pandemic_ because of this, stating that Taiwan demonstrated a "third way" that differs from Chinese-style surveillance and Western Big Tech: democratic innovation driven by civic tech. A report from the Stanford School of Medicine recorded 124 independent interventions implemented by Taiwan during the pandemic. NPR, _MIT Technology Review_, and _Harvard Business Review_ also produced special reports.

This was not the government's achievement, nor was it solely Audrey Tang's. It was created by a group of unpaid engineers opening their laptops over the weekend.

---

## Before Audrey Tang: The Roots of Taiwan's Open Source

The reason g0v was able to form so rapidly in 2012 is that Taiwan already had twenty years of open source soil.

Audrey Tang learned Perl at age 12 and dropped out of school to start a business at 14. Before entering government, she initiated over 100 projects on CPAN (the Perl module platform), led Pugs—the first runnable version of Perl 6 implemented in Haskell—and co-developed EtherCalc with the father of spreadsheets, Dan Bricklin. She was recognized as a leader in the Perl and Haskell communities, with her influence in the international open source circle predating her political career by far.

Hung Jen-yu (PCMan) is another representative figure. He is an internal medicine physician who taught himself programming in high school and wrote the BBS connection software PCMan. In 2006, he started the LXDE project—a lightweight Linux desktop environment. LXDE was once a mainstream desktop environment with the lowest memory footprint globally, adopted by distributions such as Knoppix and Lubuntu. A desktop environment written by a Taiwanese doctor ran on Linux machines all over the world. Hung later joined Google, but the story of LXDE illustrates a typical characteristic of Taiwanese open source contributors: their primary profession is not software, yet they create international-class projects in their spare time.

Huang Ching-chun (jserv) took a different path. He participated in system software development at companies like MediaTek and Andes Technology, later teaching at National Cheng Kung University's Department of Computer Science, where he opened the "Linux Kernel Design" course—the only university course in Taiwan that systematically deconstructs the latest Linux kernel. His students submit patches directly to Linux, glibc, GCC, and LLVM. He has spoken many times at COSCUP and FOSDEM in Europe. jserv does not represent a "genius-type" contributor, but rather an attempt to embed open source practice into the educational system.

---

## Community Ecosystem: More Than Just COSCUP

The density of Taiwan's open source community is exceptional for Asia.

**COSCUP** (Conference for Open Source Coders, Users and Promoters) has been running since 2006 and is Taiwan's largest annual open source conference. By 2024, participation exceeded 2,800 people, with over 40 community tracks covering topics such as Kubernetes, PostgreSQL, Ruby, Python, and Blockchain. Each community track has about six hours of agenda time, planned autonomously by each respective community. COSCUP does not charge for tickets. There are over a hundred volunteers, all working for free. 2025 marks the 20th anniversary of COSCUP.

**SITCON** (Students' Information Technology Conference) began in 2013 and is entirely student-initiated and organized. Its purpose is to show 18-year-old high school students that they do not need to wait until graduation to participate in open source. SITCON holds its annual conference every March, along with mid-semester HackGen events, summer camps, and bi-weekly meetups.

**PyCon TW** is the annual conference for the Python community, gathering cross-disciplinary Python users. **MozTW** is Taiwan's Mozilla volunteer community, which has maintained the Traditional Chinese version of Firefox since 2004 and operates campus ambassador programs and subtitle translation teams. The "Moz Workshop" community space in Taipei operated from 2014 to 2023; after Mozilla's sponsorship ended, it was maintained by local donations.

There is significant cross-participation among these communities. The same person might simultaneously be a COSCUP speaker, a g0v contributor, and a PyCon TW volunteer. Taiwan's open source circle is not large, but its density is high.

---

## Legacies and Fractures of Institutions

Taiwan has had attempts at government-led open source promotion.

In 2003, the Institute of Information Science at Academia Sinica received subsidies from the Industrial Development Bureau of the Ministry of Economic Affairs to establish the "Open Source Software Foundry" (OSSF). OSSF provided project hosting, legal consultation, and newsletter promotion, nurturing the local open source community for over a decade. In 2015, the Ministry of Science and Technology decided to cease subsidies; OSSF ceased operations, and its website maintenance continued until it closed at the end of 2021.

The disappearance of OSSF did not cause a decline in Taiwan's open source activities—this precisely demonstrates that Taiwan's open source energy has never relied on the government. What truly sustains the ecosystem is the "Open Culture Foundation" (OCF), established in 2014. Founded by multiple open source communities, OCF is a non-profit foundation that acts as the community's financial steward: issuing invoices for COSCUP, handling donations for projects, and providing legal consultation on open source licensing. OCF also collaborates with international organizations such as the AIT, the British Office Taipei, and the World Bank to export Taiwan's civic tech experience internationally.

This structure is quite interesting: when government programs ended, a grassroots foundation took over. The institution grew from the bottom up.

---

## Structural Reasons for "Powering with Love"

The vast majority of Taiwan's open source contributors are individuals. There are no open source enterprises on the level of Red Hat, nor are there corporate sponsorship programs on the scale of Google Summer of Code; most tech companies' involvement in open source is "allowing employees to do it in their spare time" rather than "including open source in KPIs."

Why?

Taiwan's technology industry is centered on hardware manufacturing and IC design. The business models of TSMC, MediaTek, and Hon Hai (Foxconn) are built on manufacturing capabilities and patent barriers, not open source code. In this ecosystem, software is often an "accessory to hardware" rather than an independent revenue source. Among thousands of software service companies, 90% perform system integration serving the domestic market.

The result is: there are many people writing code, but almost no one "makes a living through open source." Open source is something done after work, something done at community meetups, and something done at Saturday hackathons. On COSCUP's sponsor list, you will see more foreign companies (Google, LINE, Trend Micro) than local enterprises.

This is not entirely a bad thing. Precisely because open source is not a KPI, the participants' motivations are purer. The reason g0v's mask map could be "exploded" into existence within 72 hours was not because someone issued a work order, but because a thousand engineers felt "this is something that needs to be done."

However, this model has a ceiling. Without enterprise-level sustained investment, projects easily stagnate once core maintainers experience burnout. Taiwan does not lack weekend hackers; it lacks positions that allow for full-time commitment to open source.

---

## The Silent Power of 44,000 People

There are 44,408 users on GitHub who tag themselves as "Taiwan" (as of March 2026 statistics). At least 67 followers are required to enter the Taiwan ranking on committers.top. Considering Taiwan's population of 23 million, this number means there is one active GitHub account for every 500 Taiwanese people. Compared to Japan, Singapore, and Hong Kong, the per capita GitHub activity of Taiwanese developers is in the top tier of Asia.

What is even more worth looking at is not the numbers, but the types of contributions. The role of Taiwanese developers in international projects is often that of "invisible infrastructure": kernel patches, compiler optimizations, localization/translation, and documentation writing. Students from National Cheng Kung University submit code directly to the Linux kernel. MozTW has maintained the Chinese version of Firefox for twenty years. These contributions do not make the news, but without them, software would not work.

The Taiwanese open source community also possesses a characteristic rare in Asia: g0v applies open source methodologies to public policy. The vTaiwan platform uses Polis technology for online deliberation, having handled over 30 issues including Uber regulation and fintech regulations. _MIT Technology Review_ called it "a simple but ingenious system Taiwan uses to crowdsource its laws." This is no longer just a matter of writing code; it is the application of open source collaborative logic to democratic governance.

In Taiwan, open source has never been just about technical communities. It is an attitude: see a problem, open an editor, and start writing.

---

## References

1. [g0v Civic Tech Project and Community Manual](https://g0v.hackmd.io/@jothon/ctpbook) (Primary source)
2. [A turbulent year in 2020, g0v's contribution is more than just the "mask map"](https://www.gvm.com.tw/article/76428) — View Magazine
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs (English source)
4. [Civic Hackery: g0v Zero Government](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — Taiwan Guanghua Magazine
5. [International Open Source Leader Audrey Tang: Open Source is the New Paradigm Shift](https://www.ithome.com.tw/news/93603) — iThome
6. [Hung Jen-yu — Wikipedia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [Huang Ching-chun — Wikipedia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [Open Source Software Foundry — Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Further Reading

- [Open Source Communities and g0v](/en/technology/open-source-and-g0v) — The collective narrative of forking the government
- [History of Migration in Taiwan's Online Communities](/en/technology/taiwan-online-community-migration) — A generational history from BBS to Discord
- [Mini Taiwan Pulse](/en/technology/mini-taiwan-pulse-civic-tech) — Individual open source patterns of civic tech, turning open data into 3D light trails with 193 commits in six weeks
- [Da Yu Shuang Jian (Great Yu's Twin Swords)](/en/technology/softstar-twin-classics) — Another Taiwanese story of "doing things beyond scale through passion" (an RPG born from Guanghua Market)
- [How can one sleep without entering the cellar?](/en/technology/into-the-cellar-taiwan-game-podcast) — A 6-million-member player community emerging from National Central University dormitories
