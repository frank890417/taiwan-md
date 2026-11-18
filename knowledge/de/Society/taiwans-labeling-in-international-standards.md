---
title: 'Die Namensgebung Taiwans in internationalen Standards'
description: 'Von ISO-Codes bis Open-Source-Software – wie der Name Taiwans in der globalen digitalen Infrastruktur geschrieben, kontrovers diskutiert und korrigiert wird'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'internationale Standards',
    'Open Source Software',
    'g0v',
    'digitale Souveränität',
    'Taiwan Kennzeichnung',
  ]
subcategory: '國際關係'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:c6d4e2074d20efa4'
sourceBodyHash: 'sha256:234ae4c6ee15c7e0'
translatedAt: '2026-09-26T19:13:21+08:00'
---

# Die Namensgebung Taiwans in internationalen Standards

> **Kurzfassung:** In der globalen digitalen Infrastruktur wird Taiwan oft als „Taiwan, Province of China“ bezeichnet. Diese Bezeichnung stammt aus dem internationalen politischen Kontext nach der Resolution 2758 der UN im Jahr 1971 und beeinflusst internationale Standards wie ISO 3166 sowie globale Open-Source-Software und Online-Dienste. Die Open-Source-Community arbeitet kontinuierlich an einer neutraleren Kennzeichnung durch Bug-Reports und Pull Requests.

Die Art und Weise, wie Taiwan in der globalen digitalen Infrastruktur bezeichnet wird, spiegelt jahrzehntelange internationale politische Differenzen wider. Hinter einem technischen Detail – von ISO 3166 bis zur Auswahl des Spiegelservers bei Ubuntu – steht die ungelöste Frage nach Taiwans Status im internationalen System.

## Historischer Kontext: UN 2758 und ISO 3166

Im Jahr 1971 wurde die Resolution 2758 der Generalversammlung der Vereinten Nationen angenommen, welche festlegte, dass die Volksrepublik China den Sitz in den Vereinten Nationen innehatte, wodurch die Republik China (Taiwan) ihren UN-Sitz verlor. Diese Resolution betraf ursprünglich nur die Vertretungssitze bei den Vereinten Nationen, wurde aber später weithin als Grundlage herangezogen, um Taiwan in verschiedenen internationalen Organisationen und Standardisierungsgremien auszuschließen oder auf bestimmte Weise zu kennzeichnen.[^1]

Im Dezember 1974 veröffentlichte ISO 3166 erstmals. Seitdem lautet der Eintrag für Taiwan „Taiwan, Province of China“, was bis heute beibehalten wird. ISO 3166-1 weist Taiwan gleichzeitig den zweibuchstabigen Code `TW` zu, doch die Debatte um den offiziellen Namen ist seither ungelöst.

Die Position von ISO basiert auf der Geodatenbank des UN Statistics Division (UNSD), deren Kennzeichnung wiederum auf dem politischen Kontext nach UN 2758 zurückgeht. Dies ergibt ein sich gegenseitig bedingendes System: Internationale Standards zitieren UN-Daten, Open-Source-Software zitiert internationale Standards, und schließlich erscheint „Taiwan, Province of China“ in den Dropdown-Menüs globaler Entwickler.[^2]

## Korrekturmaßnahmen der Open-Source-Community

Der Bug #1138121 von Ubuntu (gemeldet 2013) ist einer der am häufigsten zitierten Fälle. Als Nutzer in Taiwan beim Auswählen eines Software-Spiegelservers „Taiwan, Province of China“ im Interface sahen, waren viele irritiert. Der Reporter schlug vor, die Common Name-Spalte von ISO 3166 zu verwenden, also nur „Taiwan“, anstatt des vollständigen offiziellen Namens.

Ähnliche Probleme traten wiederholt in anderen Open-Source-Projekten auf. Issues #43 bei ISO-3166-Countries-with-Regional-Codes, PR 138672 bei FreeBSD und Issue #1938892 bei Drupal dokumentierten den Widerspruch der Community gegen diese Kennzeichnung. Die Lösung bestand meist in der Verwendung von CLDR (Unicode Common Locale Data Repository)-Daten, die eine neutralere Darstellung für Taiwan bieten.[^3]

Die Korrekturmaßnahmen der Open-Source-Community spiegeln die Schnittstelle zwischen Technik und Politik wider: Entwickler bevorzugen oft eine neutralere Kennzeichnung, sind aber durch die Notwendigkeit „der Einhaltung internationaler Standards“ eingeschränkt. Änderungen erfordern daher oft lange Community-Diskussionen, und einige Maintainer vermeiden das Thema ganz. Die Mitglieder der g0v-Community haben den Umfang des Namensproblems in der globalen Software-Ökosystem langfristig dokumentiert.[U7⟧

## Breitere Namensauswirkungen

Auf formellen Ebenen internationaler Organisationen ist die Namensfrage Taiwans noch breiter gefasst. Bei der Weltgesundheitsversammlung (WHA) wurde Taiwan von 2009 bis 2016 als „Chinese Taipei“ eingeladen und nahm als Beobachter teil (insgesamt acht Versammlungen); ab 2017 beendete China die Einladungen, und Taiwan erhielt keine formelle Einladung mehr.[^6] Bei der Internationalen Zivilluftfahrtorganisation (ICAO) konnte Taiwan ebenfalls nicht als volles Mitglied an Entscheidungen teilnehmen und war langfristig auf informelle Kanäle angewiesen, um Luftfahrtstandards zu erhalten, was eine potenzielle Lücke im Informationsfluss für die Flugsicherheit darstellt. Bei den Olympischen Spielen nahm Taiwan ab 1981 unter dem Namen „Chinese Taipei“ teil – dieser Name stammt aus dem Lausanner Abkommen zwischen dem IOC und dem ROC von 1981. Dieses Kompromissmodell wurde auch von vielen Nichtregierungsorganisationen übernommen und auf Veranstaltungen wie APEC ausgeweitet.

Die Namensfrage hat in der digitalen Ära neue Dimensionen angenommen. Neben ISO 3166 gibt es bei SWIFT-Bankcodes, ICAO-Flughafen-Codes und den Geodatenbanken verschiedener Regierungen unterschiedliche Kennzeichnungen für Taiwan, was auf einen Mangel an einheitlichen Standards hindeutet.

Die offizielle Bezeichnung von ISO 3166-1 hat sich bis heute nicht geändert; wie jedes Unternehmen oder Projekt Taiwan darstellt, wird weiterhin individuell entschieden.

## Änderung des Reisepasses im Jahr 2020

Am **2. September 2020** kündigte das Außenministerium der Republik China (Taiwan) ein neues Passdesign an: Der Schriftzug „REPUBLIC OF CHINA“ auf der Vorderseite wurde deutlich verkleinert (das Staatswappen blieb erhalten), während der Schriftzug „TAIWAN“ stark vergrößert und neben „REPUBLIC OF CHINA“ platziert wurde. Diese Änderung war eine direkte Reaktion auf Vorfälle, bei denen taiwanische Reisende während der COVID-19-Pandemie in verschiedenen Ländern fälschlicherweise als chinesischer Staatsbürger eingestuft und der Einreise verweigert wurden; es handelte sich um die erste konkrete Antwort der taiwanesischen Regierung auf die „Verwechslung des Souveränitätsstatus“ durch das Passdesign. Der neue Reisepass wurde ab **Januar 2021** ausgegeben.[^4]

## Die Kontroverse um Chinese Taipei bei den Olympischen Spielen 2024 in Paris

Während der **Olympischen Spiele 2024 in Paris im Juli und August 2024** nahm Taiwan unter dem Namen „Chinese Taipei“ teil. Allerdings übersetzten einige chinesische Privatpersonen auf verschiedenen Social-Media-Plattformen diesen Namen als „China Taipei“, was eine klare Abweichung von der offiziellen Übersetzung „Chinese Taipei = 中華台北“ darstellte. Vorfälle wie das Stehlen der Flagge durch chinesische Zuschauer oder die Störung des Cheerleading-Teams aus Taiwan durch chinesische Begleiter während der Spiele führten zu einer erneuten Reflexion in taiwanischer Gesellschaft über das Lausanner Abkommen von 1981.[^5]

## Fallbeispiele mit Druck durch multinationale Unternehmen

Der erweiterte Druck Chinas bezüglich des „Ein-China-Prinzips“ verbreitete sich ab Ende der 2010er Jahre stark auf den Bereich multinationaler Unternehmen. **China Airlines** löste lange Zeit interne Debatten über die nationale Identität in Taiwan aus, da es international unter dem Namen „China Airlines“ operierte (etwa 40.000 Unterschriften wurden während der Maskendiplomatie der Pandemie bei Change.org gesammelt). Unternehmen wie **Delta Air Lines**, **Marriott** und **American Airlines** sowie **Zara** wurden von der chinesischen Luftfahrtbehörde oder dem Ministerium für Cyberspace unter Druck gesetzt, da sie „Taiwan“ als Land in ihren Websites aufführten, woraufhin sie gezwungen waren, auf „China Taiwan“ oder „Chinese Taipei Region“ umzusteigen. Diese Fälle zeigen, dass die „politische Wirkung der ISO-Standards“ von einem technischen Bereich zu einem geopolitischen Druckinstrument expandiert ist.

## Perspektive: Die chinesische Position

Aus Sicht der offiziellen Haltung der Volksrepublik China bildet das „Ein-China-Prinzip“ die politische Grundlage der Beziehungen zwischen den beiden Seiten der Taiwanstraße. Es wird behauptet, dass die Volksrepublik China die einzige legitime Regierung Chinas sei und Taiwan eine Provinz dieser Republik (auf administrativer Ebene als „Taiwan Provinz“) darstelle. Diese Position beeinflusst direkt die Kennzeichnung von ISO 3166 für Taiwan als „Taiwan, Province of China“ seit 1974. Um das Problem Taiwans in den internationalen Standards zu verstehen, muss man gleichzeitig die ablehnende Haltung der Regierung der Republik China (Taiwan), die Behauptung der Volksrepublik China und das vielfältige Identitätsspektrum der taiwanesischen Gesellschaft betrachten – diese drei sind nicht vereinbar und reduzierbar.

## Die Babeltur der Souveränität: Sovereignty Preservation

Die Frage der Kennzeichnung Taiwans in internationalen Standards ist im Wesentlichen eine Frage der **Infrastruktur zur Bewahrung der Souveränität**. Es ist die Art und Weise, wie Taiwan als unabhängiges politisches Subjekt in der Informationsgesellschaft sichtbar bleibt – indem seine Ich-Perspektive in jeder Sprache, jedem System, jeder Datenbank existiert. Jeder Bug-Report, jeder Pull Request, jede Aktualisierung des Passdesigns ist ein Ziegelstein dieser Infrastruktur.

## Referenzen

[^1]: [Resolution 2758 der Generalversammlung der Vereinten Nationen (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Der vollständige Text der Resolution, die festlegte, dass die Volksrepublik China den Sitz in den Vereinten Nationen innehatte.

[^2]: [ISO 3166 Maintenance Agency — Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Der Eintrag für Taiwan in ISO 3166-1, einschließlich des Codes TW und des offiziellen Namens.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Der ursprüngliche Bericht über die Kennzeichnung von Taiwan im Ubuntu-Softwarequelleninterface aus dem Jahr 2013.

[^4]: [Neues Passdesign mit vergrößertem TAIWAN-Schriftzug, Ausgabe Januar 2021](https://www.cna.com.tw/news/firstnews/202009020019.aspx) — Berichterstattung der Central News Agency vom 2. September 2020 über die Veröffentlichung des neuen Passdesigns durch das Außenministerium; Ausgabedatum ab Januar 2021.

[^5]: [Internationales Olympisches Komitee — Chinese Taipei Abkommen](https://www.olympic.org/) — Das Lausanner Abkommen von 1981 etablierte den Namen „Chinese Taipei“; die Kontroverse durch die falsche Übersetzung „China Taipei“ während der Spiele in Paris 2024.

[^6]: [Ministerium für Gesundheit und Wohlfahrt der Republik China (Taiwan) — Erklärung zu Taiwans Teilnahme an der WHO](https://www.mohw.gov.tw/) — Taiwan nahm von 2009 bis 2016 als Beobachter bei der WHA teil; ab 2017 keine erneute Einladung. Der Hintergrund des ICAO-Ausschlusses ist in separaten Erklärungen des Außenministeriums dargelegt.

## Weiterführende Lektüre

- [g0v Community — Sammlung von Kennzeichnungsfällen Taiwans](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Datenbank der Open-Source-Kennzeichnungsfälle, zusammengestellt von chewei.
- [Online-Abfrageplattform ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Abfrage der aktuellen Kennzeichnung von Taiwan in ISO 3166-1.
