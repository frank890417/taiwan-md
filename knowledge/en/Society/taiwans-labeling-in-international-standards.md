---
title: "Taiwan's Labeling in International Standards"
description: "From ISO Codes to Open-Source Software — How Taiwan's Name Is Written, Contested, and Corrected in Global Digital Infrastructure"
date: 2026-03-18
author: 'Taiwan.md Contributors'
category: 'Society'
subcategory: '國際關係'
tags: ['ISO 3166', '國際標準', '開源軟體', 'g0v', '數位主權', '台灣標示']
lastVerified: 2026-03-19
lastHumanReview: false
featured: false
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: '18157ab5d'
sourceContentHash: 'sha256:474db7988470495f'
sourceBodyHash: 'sha256:288ae1e41983889d'
translatedAt: '2026-05-15T15:39:39+08:00'
---

# Taiwan's Labeling in International Standards

> **30-second overview:** In global digital infrastructure, Taiwan is frequently labeled as "Taiwan, Province of China." This designation stems from the international political landscape following UN General Assembly Resolution 2758 in 1971, affecting international standards such as ISO 3166 and extending to global open-source software and internet services. The open-source community has continuously pushed for more neutral labeling through bug reports and pull requests.

In global digital infrastructure, the way Taiwan is labeled reflects over half a century of international political divergence. From ISO 3166 to Ubuntu's mirror site selection interface, behind a single technical detail lies the unresolved controversy over Taiwan's identity within the international system.

## Historical Context: UN 2758 to ISO 3166

In 1971, UN General Assembly Resolution 2758 was adopted, deciding that the representation of "China in the United Nations" would be held by the People's Republic of China, and the Republic of China consequently lost its UN seat. The resolution originally concerned only UN representation, but it was subsequently widely invoked as the basis for Taiwan's exclusion from or specific labeling in various international organizations and standards bodies.[^1]

In 1974, the entry name for Taiwan in the ISO 3166 international standard was changed from "Taiwan" to "Taiwan, Province of China," formally establishing the designation that persists to this day. ISO 3166-1 simultaneously assigned Taiwan the two-letter code `TW`, but the dispute over the official name has continued unresolved ever since.

ISO's position is to follow the UN Statistics Division (UNSD) geonames database, whose designations in turn trace back to the political landscape after UN 2758. This creates an interdependent system: international standards cite UN data, open-source software cites international standards, and ultimately "Taiwan, Province of China" appears in the dropdown menus of developers worldwide.[^2]

## Corrective Actions in the Open-Source Community

Ubuntu Bug #1138121 (filed in 2013) is one of the most widely cited cases. When Taiwanese users selected a software mirror site and saw "Taiwan, Province of China" displayed in the interface, many found it troubling. The reporter suggested using the common name field from ISO 3166 — simply "Taiwan" — rather than the full official designation.

Similar issues have recurred across other open-source projects. ISO-3166-Countries-with-Regional-Codes Issue #43, FreeBSD PR 138672, and Drupal Issue #1938892 all document community objections to this labeling. The typical resolution has been to switch to CLDR (Unicode Common Locale Data Repository) data, which uses a more neutral designation for Taiwan.[^3]

These corrective actions in the open-source community reflect the intersection of technology and politics: developers generally prefer more neutral labeling, but constrained by considerations of "following international standards," changes often require extended community discussion, and some maintainers choose to avoid the issue altogether. g0v community member chewei has long compiled related cases, documenting the breadth of Taiwan's labeling problem across the global software ecosystem.

## Broader Naming Implications

In formal international settings, Taiwan's naming issue extends even further. At the World Health Assembly (WHA), Taiwan was invited to attend as an observer under the name "Chinese Taipei" from 2009 to 2016 (eight sessions in total); from 2017 onward, China opposed Taiwan's continued attendance, and the invitation was suspended, with Taiwan never formally invited again.[^6] At the International Civil Aviation Organization (ICAO), Taiwan similarly has not been able to participate in decision-making as a formal member, relying for years on informal channels to obtain aviation technical standards information, creating a potential gap in the flow of aviation safety data. At the Olympic Games, Taiwan has competed under the name "Chinese Taipei" (中華台北) since 1981 — a name derived from the 1981 Lausanne Agreement between the International Olympic Committee and the Chinese Taipei Olympic Committee. This compromise has been adopted by many non-governmental international organizations and extended to settings such as APEC.

The naming issue has taken on new dimensions in the digital age. Beyond ISO 3166, SWIFT banking codes, ICAO airport codes, and national governments' geographic databases each have their own way of labeling Taiwan, with no unified standard.

Since 2023, some international technology companies (such as Apple and Google Maps) have adjusted Taiwan's display name following user reports, but the official ISO 3166-1 designation itself has not changed, indicating a growing disconnect between corporate implementation and international standards.

## 2020 Passport Cover Redesign

**September 2, 2020** — The Ministry of Foreign Affairs of the Republic of China unveiled a new passport design: the "REPUBLIC OF CHINA" text on the cover was significantly reduced in size (while retaining the national emblem), while the "TAIWAN" text was greatly enlarged to appear alongside "REPUBLIC OF CHINA." This change responded to incidents during the COVID-19 pandemic in which Taiwanese travelers were mistaken for Chinese nationals and denied entry at borders in multiple countries. It was the first time the Taiwanese government addressed the concrete issue of "sovereignty label confusion" through passport design. The new passport was issued starting **January 2021**.[^4]

## 2024 Paris Olympics: The Chinese Taipei Controversy

During the **July–August 2024 Paris Olympics**, Taiwan competed under the name "Chinese Taipei," but Chinese netizens on multiple social media platforms translated the name as "中國台北" (Zhongguo Taibei), a clear deviation from the Olympic-mandated Chinese rendering of "Chinese Taipei" as "中華台北" (Zhonghua Taibei). Incidents during the Games — including Chinese spectators snagging Taiwanese flags and Chinese delegation leaders disrupting Taiwanese cheer squads — prompted renewed reflection in Taiwanese society on the 1981 Lausanne Agreement.[^5]

## Multinational Corporate Pressure Cases

China's extended pressure over the "One China Principle" expanded significantly into the multinational corporate sphere in the late 2010s. **China Airlines** (華航), long operating internationally under that English name, sparked domestic controversy over Taiwanese national identity (the 2018 "Rename China Airlines" petition). Companies including **Delta Air Lines**, **Marriott International**, **United Airlines**, **Zara**, **Starbucks**, and **Marriott** were pressured by the Civil Aviation Administration of China or the Cyberspace Administration of China after their websites listed "Taiwan" as a country, and were forced to change the designation to "中國台灣" (China Taiwan) or "中國台灣地區" (Taiwan Region, China). These cases demonstrate that "the political force of ISO standards" has expanded from the technical domain into a tool of geopolitical pressure.

## Perspective: The Chinese Position

From the official standpoint of the People's Republic of China, the "One China Principle" is the political foundation of cross-strait relations, asserting that the People's Republic of China is the sole legitimate government of China and that Taiwan is a province of the People's Republic of China (at the administrative level of "Taiwan Province"). This position directly influenced ISO 3166's "Taiwan, Province of China" designation for Taiwan from 1974 onward. Understanding the Taiwan question in international standards requires simultaneously recognizing the opposing position of the Republic of China government, the claims of the People's Republic of China, and the diverse spectrum of identity in Taiwanese society — these three are neither consistent with one another nor reducible to a single narrative.

## The Babel Tower of Sovereignty: Sovereignty Preservation

The question of Taiwan's labeling in international standards is, at its core, a matter of **sovereignty preservation infrastructure**. Ensuring that Taiwan's first-person voice exists in every language, every system, and every database is a way of maintaining Taiwan's visibility as an independent political subject in the information age. Every bug report, every pull request, every passport redesign update is a brick in this infrastructure.

## References

[^1]: [UN General Assembly Resolution 2758 (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Full text of the resolution deciding that China's UN representation would be held by the People's Republic of China.

[^2]: [ISO 3166 Maintenance Agency — Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — ISO 3166-1 Taiwan entry, including code TW and official name.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Original report of the Taiwan labeling issue in the Ubuntu software sources interface, 2013.

[^4]: [Ministry of Foreign Affairs, Republic of China — New Passport Announcement](https://www.mofa.gov.tw/) — New passport design announced September 2, 2020, with "TAIWAN" text enlarged; issued from January 2021.

[^5]: [International Olympic Committee — Chinese Taipei Olympic Committee Agreement](https://www.olympic.org/) — The 1981 Lausanne Agreement established the "Chinese Taipei" name; during the 2024 Paris Olympics, China's mistranslation as "中國台北" sparked controversy.

[^6]: [Ministry of Health and Welfare, Republic of China — Taiwan's Participation in the WHO](https://www.mohw.gov.tw/) — Taiwan attended the WHA as an observer from 2009 to 2016; not invited again from 2017 onward; for the ICAO exclusion context, see related MOFA statements.

## Further Reading

- [g0v Community — Taiwan Labeling Issue Compilation](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — chewei's database of open-source software cases involving Taiwan's labeling
- [ISO 3166 Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Look up Taiwan's current designation in ISO 3166-1
