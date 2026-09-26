---
title: Taiwan's Labeling in International Standards
description: From ISO codes to open-source software — how Taiwan's name is written, disputed, and corrected in global digital infrastructure
date: 2026-03-18
category: Society
tags:
  [
    'ISO 3166',
    'International Standards',
    'Open Source Software',
    'g0v',
    'Digital Sovereignty',
    'Taiwan Labeling',
  ]
subcategory: 國際關係
author: Taiwan.md Contributors
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
translatedFrom: Society/台灣在國際標準中的標示問題.md
sourceCommitSha: d7b843fbf
sourceContentHash: sha256:c6d4e2074d20efa4
sourceBodyHash: sha256:234ae4c6ee15c7e0
translatedAt: 2026-09-26T11:10:11+08:00
---

# Taiwan's Labeling in International Standards

> **30-second overview:** In global digital infrastructure, Taiwan is often labeled as "Taiwan, Province of China." This designation stems from the international political landscape following the UN General Assembly Resolution 2758 in 1971, which shaped ISO 3166 and other international standards, extending into global open-source software and internet services. Open-source communities continue to push for more neutral designations through bug reports and pull requests.

In global digital infrastructure, how Taiwan is labeled reflects a half-century of international political disagreement. From ISO 3166 to Ubuntu's mirror-site selection interface, behind each technical detail lies the unresolved question of Taiwan's identity within the international system.

## Historical Context: UN 2758 to ISO 3166

In 1971, UN General Assembly Resolution 2758 was passed, determining that China's seat at the United Nations would be represented by the People's Republic of China, causing the Republic of China to lose its UN seat. While the resolution originally concerned only the UN representative seat, it was subsequently cited widely as the basis for Taiwan's exclusion from or specific designation within various international organizations and standards-setting bodies.[^1]

ISO 3166 was first published in December 1974, and Taiwan's entry name has been "Taiwan, Province of China" since then, continuing to the present day. ISO 3166-1 simultaneously assigned Taiwan the two-letter code `TW`, but the controversy over the official name has remained unresolved.

ISO's position is that it follows the United Nations Statistics Division (UNSD) geographical database, which in turn traces back to the political landscape after UN 2758. This creates an interdependent system: international standards cite UN data, open-source software cites international standards, and ultimately "Taiwan, Province of China" appears in the dropdown menus of developers worldwide.[^2]

## Open Source Software Community's Corrective Actions

Ubuntu's Bug #1138121 (reported in 2013) is one of the most widely cited cases. When Taiwanese users were selecting software repository mirror sites, seeing "Taiwan, Province of China" appear on the interface troubled many. The reporter suggested using the common name field from ISO 3166—simply "Taiwan" rather than the full official name.

Similar issues have appeared repeatedly in other open-source projects. Issue #43 in ISO-3166-Countries-with-Regional-Codes, FreeBSD PR 138672, and Drupal Issue #1938892 all document community objections to this designation. The typical solution is to adopt CLDR (Unicode Common Locale Data Repository) data, which uses more neutral terminology for Taiwan.[^3]

The open-source community's corrective efforts reflect the intersection of technology and politics: developers typically prefer more neutral designations, but are constrained by considerations of "adhering to international standards," making changes often require extended community discussion, and some maintainers choose to avoid the issue altogether. Chewei, a member of the g0v community, has long documented related cases, recording the breadth of Taiwan's labeling problem across the global software ecosystem.

## Broader Naming Impact

In formal settings within international organizations, the scope of Taiwan's naming problem is broader still. At the World Health Assembly (WHA), Taiwan was invited to sit as an observer under the designation "Chinese Taipei" from 2009 to 2016 (eight sessions in total); beginning in 2017, China objected to Taiwan's continued attendance, and invitations have ceased, with Taiwan receiving no further formal invitations.[^6] At the International Civil Aviation Organization (ICAO), Taiwan similarly lacks formal membership and decision-making participation, long depending on informal channels to obtain aviation technical standards, creating a potential gap in aviation safety information distribution. At the Olympic Games, Taiwan has competed under the designation "Chinese Taipei" since 1981—a name that originated from the Lausanne Agreement signed in 1981 between the International Olympic Committee and the Chinese Olympic Committee. This compromise designation has been adopted by many non-governmental international organizations and extended to venues such as APEC.

The naming problem has taken on new dimensions in the digital age. Beyond ISO 3166, SWIFT bank codes, ICAO airport codes, and geographical databases from various national governments each employ different designations for Taiwan, with no unified standard.

ISO 3166-1's official designation itself has not changed to this day, and how various enterprises and software projects display Taiwan remains a case-by-case determination.

## 2020 Passport Cover Change

**On September 2, 2020**, the Republic of China's Ministry of Foreign Affairs unveiled a new passport design: the "REPUBLIC OF CHINA" text on the cover was noticeably reduced (while the national emblem was retained), while "TAIWAN" was enlarged to be displayed alongside "REPUBLIC OF CHINA." This change responded to incidents during the COVID-19 pandemic in which Taiwanese travelers were mistaken for Chinese nationals and denied entry in multiple countries, representing the Taiwan government's first use of passport design to directly address "sovereignty labeling confusion." The new passport began issuance on **January 2021**.[^4]

## 2024 Paris Olympics Chinese Taipei Controversy

During the **2024 Paris Olympics (July-August)**, Taiwan competed under the designation "Chinese Taipei," but Chinese netizens translated the name as “中國台北” (China Taipei) across multiple social platforms, creating a clear discrepancy with the IOC's established translation “Chinese Taipei = 中華台北” (Chinese Taipei). Incidents during the Olympics—such as Taiwan athletes having flags seized by Chinese spectators and Taiwan expatriate cheering squads being disrupted by Chinese team leaders—sparked Taiwanese society to reconsider the 1981 Lausanne Agreement.[^5]

## Transnational Corporate Pressure Cases

China's extension of pressure on the "One China Principle" has expanded significantly into the transnational corporate sphere in the late 2010s. **China Airlines** long used the name "China Airlines" on international routes, sparking internal Taiwanese disputes over national identity (in 2020 during the pandemic's mask diplomacy, a Change.org petition to rename China Airlines attracted approximately 40,000 supporters). **Delta Air Lines, Marriott Hotels, United Airlines, and Zara** have all faced pressure from China's Civil Aviation Administration or Cyberspace Administration when their websites listed "Taiwan" as a country, forcing them to change it to "China Taiwan" or "Taiwan Region, China." These cases demonstrate that "the political power of ISO standards" has expanded from the technical domain into a tool of geopolitical pressure.

## Perspective: China's Position

From the People's Republic of China's official perspective, the "One China Principle" is the political foundation of cross-Strait relations, asserting that the People's Republic of China is the sole legitimate government of China and that Taiwan is a province of the People's Republic of China (administratively designated as "Taiwan Province"). This position has directly shaped ISO 3166's designation of Taiwan as "Taiwan, Province of China" since 1974. Understanding Taiwan's issue within international standards requires simultaneously recognizing the Republic of China government's opposing position, the People's Republic of China's claims, and Taiwan society's diverse spectrum of identities—these three are neither consistent with each other nor reducible to a single view.

## The Tower of Babel of Sovereignty: Sovereignty Preservation

Taiwan's labeling issue within international standards is fundamentally a question of **sovereignty preservation infrastructure**. Ensuring Taiwan's first-person voice exists in every language, every system, every database is the way Taiwan maintains its visibility as an independent political entity in the information age. Each bug report, each pull request, each passport design update is a brick in this infrastructure.

## References

[^1]: [United Nations General Assembly Resolution 2758 (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Full text of the resolution determining that China's UN representative seat would be held by the People's Republic of China.

[^2]: [ISO 3166 Maintenance Agency — Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — ISO 3166-1 entry for Taiwan, including the TW code and official name.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Original report of Taiwan's labeling issue in Ubuntu's software repository interface, 2013.

[^4]: [New Passport Cover Enlarges Taiwan Text, to Be Issued in January Year 110](https://www.cna.com.tw/news/firstnews/202009020019.aspx) — Central News Agency report from September 2, 2020, announcing the Ministry of Foreign Affairs' new passport cover design with enlarged Taiwan text, to be issued beginning January 2021.

[^5]: [International Olympic Committee — Chinese Taipei Olympic Committee Agreement](https://www.olympic.org/) — The 1981 Lausanne Agreement established the name "Chinese Taipei"; during the 2024 Paris Olympics, China's mistranslation as “中國台北” (China Taipei) sparked controversy.

[^6]: [Republic of China Ministry of Health and Welfare — Taiwan's Participation in the WHO](https://www.mohw.gov.tw/) — Taiwan served as an observer at the WHA from 2009 to 2016, with invitations ceasing from 2017 onwards; for ICAO exclusion background, see related Ministry of Foreign Affairs statements.

## Further Reading

- [g0v Community — Taiwan Labeling Issue Documentation](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Chewei's curated database of Taiwan labeling cases in open-source software
- [ISO 3166 Online Query Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Check Taiwan's current designation in ISO 3166-1
