---
title: 'Taiwans Darstellungsprobleme in internationalen Standards'
description: 'Vom ISO-Code bis zur Open-Source-Software — wie Taiwans Name in der globalen digitalen Infrastruktur geschrieben, umstritten und korrigiert wird'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'Internationale Standards',
    'Open-Source-Software',
    'g0v',
    'Digitale Souveränität',
    'Taiwan-Bezeichnung',
  ]
subcategory: 'Internationale Beziehungen'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: '18157ab5d'
sourceContentHash: 'sha256:5aa5d3ad7e4d012f'
translatedAt: '2026-09-11T11:13:08.858041+00:00'
---

# Taiwans Bezeichnung in internationalen Standards

> **30-Sekunden-Überblick:** In der globalen digitalen Infrastruktur wird Taiwan häufig als „Taiwan, Province of China“ geführt. Diese Bezeichnung geht auf die internationale politische Lage nach der UN-Generalversammlungsresolution 2758 von 1971 zurück, beeinflusste internationale Standards wie ISO 3166 und erstreckt sich auf globale Open-Source-Software und Internetdienste. Die Open-Source-Community setzt sich kontinuierlich über Bug Reports und Pull Requests für eine neutralere Bezeichnung ein.

In der globalen digitalen Infrastruktur spiegelt Taiwans Art der Bezeichnung einen seit einem halben Jahrhundert andauernden internationalen politischen Dissens wider. Von ISO 3166 bis zum Mirror-Server-Auswahl-Interface von Ubuntu – hinter einem technischen Detail verbirgt sich der ungelöste Streit um Taiwans Statusbestimmung im internationalen System.

## Historischer Kontext: UN 2758 bis ISO 3166

1971 wurde die Resolution 2758 der UN-Generalversammlung angenommen, die entschied, dass der „Sitz Chinas in den Vereinten Nationen“ von der Volksrepublik China vertreten wird; die Republik China verlor dadurch ihren UN-Sitz. Diese Resolution betraf ursprünglich nur den UN-Vertretungssitz, wurde jedoch seither breit als Grundlage dafür herangezogen, dass Taiwan in verschiedenen internationalen Organisationen und Standardisierungsgremien ausgeschlossen oder auf eine bestimmte Weise bezeichnet wird.[^1]

1974 wurde im internationalen Standard ISO 3166 der Eintragsname für Taiwan von „Taiwan“ in „Taiwan, Province of China“ geändert, womit die bis heute verwendete Bezeichnung offiziell festgelegt wurde. ISO 3166-1 vergab Taiwan gleichzeitig den Zweibuchstabencode `TW`, doch der Streit um den offiziellen Namen hält seither an.

Die ISO orientiert sich an der geographischen Namensdatenbank der UN-Statistikabteilung (UNSD), deren Bezeichnung wiederum auf die politische Lage nach UN-Resolution 2758 zurückgeht. Dies schafft ein sich gegenseitig verstärkendes System: Internationale Standards verweisen auf UN-Daten, Open-Source-Software verweist auf internationale Standards, und schließlich taucht „Taiwan, Province of China“ in den Dropdown-Menüs von Entwicklern weltweit auf.[^2]

## Korrekturmaßnahmen der Open-Source-Software-Community

Ubuntus Bug #1138121 (gemeldet 2013) ist eines der am häufigsten zitierten Beispiele. Als taiwanesische Nutzer bei der Auswahl von Software-Quell-Spiegelstandorten „Taiwan, Province of China“ in der Benutzeroberfläche sahen, empfanden viele dies als störend. Der Meldende schlug vor, das common-name-Feld aus ISO 3166 zu verwenden, also schlicht „Taiwan“, statt der vollständigen offiziellen Bezeichnung.

Ähnliche Probleme traten in anderen Open-Source-Projekten wiederholt auf. Issue #43 von ISO-3166-Countries-with-Regional-Codes, FreeBSD PR 138672 und Drupal Issue #1938892 dokumentieren alle den Widerspruch der Community gegen diese Kennzeichnung. Die Lösung besteht meist darin, auf CLDR-Daten (Unicode Common Locale Data Repository) umzusteigen, da CLDR für Taiwan eine neutralere Bezeichnung verwendet.[^3]

Die Korrekturmaßnahmen der Open-Source-Community spiegeln die Schnittstelle von Technik und Politik wider: Entwickler bevorzugen in der Regel neutralere Kennzeichnungen, sind aber durch die Überlegung „internationale Standards einzuhalten“ eingeschränkt, weshalb Änderungen oft längere Community-Diskussionen erfordern und einige Maintainer das Thema ganz meiden. Das g0v-Community-Mitglied chewei sammelt seit Langem entsprechende Fälle und dokumentiert die globale Reichweite des Taiwan-Kennzeichnungsproblems in der Software-Ökologie.

## Weitere Auswirkungen der Benennung

Bei offiziellen Anlässen internationaler Organisationen ist das Benennungsproblem Taiwans noch weitreichender. Bei der Weltgesundheitsversammlung (WHA) wurde Taiwan unter der Bezeichnung „Chinese Taipei“ eingeladen, als Beobachter teilzunehmen, und zwar von 2009 bis 2016 (insgesamt acht Versammlungen); ab 2017 verhinderte China eine weitere Teilnahme Taiwans, die Einladungen blieben aus, und Taiwan erhielt seither keine formelle Einladung mehr.[^6] Bei der Internationalen Zivilluftfahrtorganisation (ICAO) kann Taiwan ebenfalls nicht als Vollmitglied an Entscheidungen teilnehmen; es ist langfristig auf inoffizielle Kanäle angewiesen, um Informationen zu luftfahrttechnischen Standards zu erhalten, was eine potenzielle Lücke im Informationsfluss zur Flugsicherheit schafft. Bei den Olympischen Spielen nimmt Taiwan seit 1981 unter dem Namen „Chinese Taipei“ (Chinesisch Taipeh) teil – dieser Name stammt aus dem Lausanner Abkommen, das 1981 zwischen dem IOC und dem Chinesischen Olympischen Komitee unterzeichnet wurde. Dieser Kompromiss wird auch von vielen nichtstaatlichen internationalen Organisationen übernommen und auf Foren wie APEC ausgedehnt.

Das Benennungsproblem hat im digitalen Zeitalter neue Dimensionen erhalten. Neben ISO 3166 weisen SWIFT-Bankencodes, ICAO-Flughafencodes und die Geodatenbanken verschiedener Regierungen jeweils unterschiedliche Bezeichnungen für Taiwan auf; ein einheitlicher Standard fehlt.

Seit 2023 haben einige internationale Technologieunternehmen (wie Apple, Google Maps) nach Nutzerfeedback die Anzeigenamen für Taiwan angepasst, doch die offizielle Bezeichnung in ISO 3166-1 selbst hat sich nicht geändert, was zeigt, dass die Entkopplung zwischen Unternehmensimplementierungen und internationalen Standards weiter zunimmt.

## Änderung des Passcovers 2020

**Am 2. September 2020** veröffentlichte das Außenministerium der Republik China (Taiwan) ein neues Passdesign: Die Aufschrift „REPUBLIC OF CHINA“ auf dem Cover wurde deutlich verkleinert (das Nationalwappen bleibt erhalten), während „TAIWAN“ stark vergrößert und neben „REPUBLIC OF CHINA“ platziert wurde. Diese Änderung reagierte auf Vorfälle während der COVID-19-Pandemie, bei denen Reisende aus Taiwan in mehreren Ländern für chinesische Staatsangehörige gehalten und die Einreise verweigert wurde; es war das erste Mal, dass die taiwanesische Regierung mit einem Passdesign auf das konkrete Problem der „Verwechslung der Souveränitätskennzeichnung“ reagierte. Der neue Pass wird seit **Januar 2021** ausgegeben.[^4]

## Streit um „Chinesisch Taipeh“ bei den Olympischen Spielen 2024 in Paris

Während der **Olympischen Spiele 2024 in Paris (Juli–August)** trat Taiwan unter dem Namen „Chinese Taipei“ an, doch chinesische Internetnutzer übersetzten diesen Namen auf mehreren Social-Media-Plattformen als „China-Taipeh“, was eine klare Diskrepanz zur vom IOC festgelegten chinesischen Übersetzung „Chinese Taipei = Chinesisch Taipeh“ aufweist. Vorfälle wie das Entreißen von Flaggen taiwanesischer Athleten durch chinesische Zuschauer und Störungen taiwanesischer Diaspora-Fangruppen durch die chinesische Delegationsleitung lösten in der taiwanesischen Gesellschaft eine erneute Reflexion über das Lausanner Abkommen von 1981 aus.[^5]

## Fallbeispiele für Druck auf multinationale Unternehmen

Chinas erweiterter Druck im Namen des „Ein-China-Prinzips“ breitete sich in der zweiten Hälfte der 2010er-Jahre massiv auf den Bereich multinationaler Unternehmen aus. **China Airlines (華航)** verwendet seit Langem den Namen „China Airlines“ auf internationalen Strecken, was interne Kontroversen über Taiwans nationale Identität auslöste (die 2018er Petition zur Umbenennung von China Airlines). Unternehmen wie **Delta Air Lines**, **Marriott International**, **United Airlines**, **Zara**, **Starbucks** und **Marriott** gerieten unter Druck der chinesischen Zivilluftfahrtbehörde (CAAC) oder der Cyberspace Administration of China (CAC), weil sie auf ihren Websites „Taiwan“ als Land aufführten, und wurden gezwungen, die Bezeichnung in „China Taiwan“ oder „China Taiwan Region“ zu ändern. Diese Fälle zeigen, dass die „politische Wirksamkeit von ISO-Standards“ vom technischen Bereich auf ein geopolitisches Druckinstrument ausgeweitet wurde.

## Perspektive: Chinas Standpunkt

Aus der offiziellen Perspektive der Volksrepublik China ist das „Ein-China-Prinzip“ die politische Grundlage der Beziehungen über die Taiwanstraße. Es wird vertreten, dass die Volksrepublik China die einzige legitime Regierung Chinas sei und Taiwan eine Provinz der Volksrepublik China sei (Verwaltungsebene: „Provinz Taiwan“). Dieser Standpunkt beeinflusste direkt die ISO-3166-Bezeichnung Taiwans als „Taiwan, Province of China“ seit 1974. Um das Taiwan-Problem in internationalen Standards zu verstehen, muss man gleichzeitig die ablehnende Haltung der Regierung der Republik China, den Anspruch der Volksrepublik China sowie das vielfältige Identitätsspektrum der taiwanesischen Gesellschaft wahrnehmen – diese drei Positionen sind nicht konsistent und lassen sich nicht aufeinander reduzieren.

## Der Turmbau zu Babel der Souveränität: sovereignty preservation

Die Frage der Taiwan-Bezeichnung in internationalen Standards ist im Kern ein Problem der **Infrastruktur zur Souveränitätswahrung (sovereignty preservation infrastructure)**. Dass Taiwans **first-person voice** in jeder Sprache, in jedem System und in jeder Datenbank existiert, ist der Weg, um Taiwan als unabhängiges politisches Subjekt im Informationszeitalter sichtbar zu erhalten. Jeder Bug-Report, jeder Pull Request, jede Aktualisierung des Passdesigns ist ein Stein in diesem Fundament.

## Quellen

## Weiterführende Literatur

- [g0v-Community — Zusammenfassung des Taiwan-Bezeichnungsproblems](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — von chewei zusammengestellte Datenbank zu Taiwan-Bezeichnungsfällen in Open-Source-Software
- [ISO 3166 Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Abfrage der aktuellen Taiwan-Bezeichnung in ISO 3166-1

[^1]: [UN-Generalversammlungsresolution 2758 (1971)](https://undocs.org/zh/A/RES/2758(XXVI) — ) — Volltext der Resolution, die entschied, dass der chinesische Sitz in den Vereinten Nationen von der Volksrepublik China vertreten wird.

[^2]: [ISO 3166 Maintenance Agency — Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — ISO 3166-1-Eintrag für Taiwan, enthält Code TW und offizielle Bezeichnung.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Ursprünglicher Fehlerbericht zum Taiwan-Bezeichnungsproblem in der Ubuntu-Software-Quellen-Oberfläche, 2013.

[^4]: [Außenministerium der Republik China (Taiwan) — Erläuterung zum neuen Reisepass](https://www.mofa.gov.tw/) — Am 2. September 2020 wurde das neue Reisepassdesign vorgestellt, mit vergrößerter Aufschrift TAIWAN, Ausgabe ab Januar 2021.

[^5]: [Internationales Olympisches Komitee — Abkommen mit dem Chinesisch-Taipeh-Olympischen Komitee](https://www.olympic.org/) — Die Lausanner Vereinbarung von 1981 legte den Namen „Chinese Taipei“ fest; bei den Olympischen Spielen 2024 in Paris sorgte Chinas Übersetzung als „China Taipeh“ für Kontroversen.

[^6]: [Gesundheits- und Wohlfahrtsministerium der Republik China (Taiwan) — Erläuterung zur Teilnahme Taiwans an der WHO](https://www.mohw.gov.tw/) — Taiwan nahm von 2009 bis 2016 als Beobachter an der WHA teil, seit 2017 keine Einladung mehr; zum Ausschluss aus der ICAO siehe entsprechende Erläuterungen des Außenministeriums.
