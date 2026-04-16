---
title: 'Taiwan’s Labeling in International Standards'
description: 'From ISO codes to open‑source datasets—how Taiwan’s name is negotiated across global digital infrastructure'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'international standards',
    'open source',
    'g0v',
    'digital sovereignty',
    'Taiwan naming',
  ]
author: 'Taiwan.md Contributors'
difficulty: 'intermediate'
readingTime: 10
featured: false
lastVerified: 2026-03-19
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
---

# Taiwan’s Labeling in International Standards

In global digital infrastructure, a seemingly technical label can become a flashpoint of identity and politics. Taiwan’s name inside international standards and software systems—especially the label “Taiwan, Province of China”—has sparked years of debate, bug reports, and revisions across open‑source communities. The issue is not only about a string in a database; it is about how a place is recognized by the software that runs the world.

## The Core Issue: ISO 3166‑1

ISO 3166‑1 is the standard that assigns country and region codes used across government systems, business databases, shipping, and software localization. Taiwan’s two‑letter code is **TW**, yet the official ISO long name reads “Taiwan, Province of China.” That phrasing has appeared in the standard since 1974. For Taiwanese users and many international contributors, this is a politically loaded label that does not reflect Taiwan’s lived reality or governance.

Because ISO codes and names are widely embedded into software libraries (CLDR, ICU, locale datasets, analytics platforms), the label propagates across countless products. When a dropdown menu or location setting shows “Taiwan, Province of China,” it becomes a daily reminder that technical standards can carry political baggage.

## Open‑Source Communities Push Back

### Ubuntu Bug #1138121: Country Selection in Software Sources

Ubuntu’s software mirror selector once displayed “Taiwan, Province of China.” Taiwanese users filed a bug report (#1138121) arguing that the label was inappropriate. A widely cited comment explained that almost all Taiwanese users would be disturbed by such a label. The proposed fix was simple and practical: use ISO’s **common name** field—“Taiwan”—rather than the political long form.

### GitHub Issues: Local Data with Global Impact

Multiple GitHub repositories that track ISO codes or country lists have received similar requests. In Issue #43 of **ISO‑3166‑Countries‑with‑Regional‑Codes**, contributors argued that “Taiwan, Province of China” is unacceptable and that software should display “Taiwan.” These issues often include pull requests updating JSON or CSV datasets that thousands of developers rely upon.

### FreeBSD PR 138672

FreeBSD also received a formal problem report requesting that Taiwan be labeled simply “Taiwan” instead of the ISO long name. The title itself encapsulates the sentiment: ISO gives Taiwan an incorrect name, please restore “Taiwan” as it was before.

### Drupal Issue #1938892

The Drupal community discussed moving from ISO datasets to Unicode CLDR for country names. Contributors noted that “Taiwan, Province of China” was highly problematic, and CLDR offered a more neutral naming approach in many locales.

## Why It’s Hard: Standards vs. Sensitivity

Developers face a dilemma: respect international standards to keep systems interoperable, but avoid labels that alienate users or misrepresent political reality. The most common solutions include:

1. **Use Common Names**
   - Prefer “Taiwan” for UI display while keeping ISO codes for backend integrity.

2. **Adopt CLDR Locales**
   - Unicode CLDR provides localized names that are often more neutral and context‑sensitive.

3. **Localize by Region**
   - Names can vary by language or locale; Taiwan’s display label can be tuned per region.

4. **Provide Custom Overrides**
   - Allow administrators or users to override country labels in enterprise systems.

These approaches acknowledge the political reality without breaking technical compatibility.

## Beyond Software: International Naming Constraints

The same naming tension exists outside software:

- **WHO**: Taiwan is often excluded or listed under alternate designations.
- **Olympics**: Taiwan competes as “Chinese Taipei.”
- **Other Standards Bodies**: Many follow ISO 3166‑1 by default.

Software, however, is more flexible than diplomatic protocols. That makes open‑source communities a crucial site where labels can be debated and updated.

## Digital Sovereignty as a Lived Experience

For Taiwan, naming in software is part of a broader conversation about **digital sovereignty**—how a society is represented and recognized in the infrastructure of the internet. A label in a dropdown is small, but it touches on autonomy, dignity, and international visibility.

This is why Taiwanese civic‑tech communities (notably **g0v**) document these cases, file issues, and coordinate fixes. The work is incremental: a pull request here, a bug report there. But each change reduces friction for users and signals that local realities matter.

## Practical Guidance for Developers

If you build or maintain a system that includes country/region selection, consider these best practices:

1. **Avoid Politicized Labels**
   - Display “Taiwan” where possible; reserve ISO’s long form for internal references.

2. **Let Users Decide**
   - Offer an editable display name in admin settings for enterprise use cases.

3. **Document Your Choices**
   - Explain why your system uses common names or CLDR rather than ISO long names.

4. **Follow Precedents**
   - Check how major platforms (Google, Microsoft, Apple) handle Taiwan labels in UI.

5. **Separate Codes from Labels**
   - Keep **TW** as the stable code for data integrity, while using culturally sensitive labels for display.

## Closing Thoughts

The Taiwan labeling issue looks technical, but it exposes how political realities are encoded into the digital world. Open‑source communities have shown that standards are not immutable: if a label harms users or misrepresents a place, it can be challenged and updated.

Each small fix—choosing “Taiwan” in a UI, using CLDR names, updating a dataset—builds a more respectful digital environment. For Taiwan, these changes are not just cosmetic; they are part of how the island is seen and understood in the global digital public sphere.

## References

- [ISO‑3166‑Countries‑with‑Regional‑Codes Issue #43](https://github.com/lukes/ISO-3166-Countries-with-Regional-Codes/issues/43)
- [Ubuntu Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121)
- [FreeBSD PR 138672](https://bugs.freebsd.org/bugzilla/show_bug.cgi?id=138672)
- [Drupal Issue #1938892](https://www.drupal.org/project/drupal/issues/1938892)
- [Taiwan News: Taiwan urged to address mislabeling by ISO](https://www.taiwannews.com.tw/news/3812381)
- [Change.org Petition: Correct “Taiwan, Province of China” on ISO 3166](https://www.change.org/p/iso-international-organization-for-standardization-correct-taiwan-province-of-china-on-iso-3166-and-change-it-to-taiwan-let-tw-be-taiwan)
- [g0v community dossier](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — thanks to chewei’s long‑running collection

---

_With appreciation to g0v contributors and open‑source maintainers who keep Taiwan’s name accurate in global software systems._
