---
title: 'Open-Source-Community und g0v'
description: 'Im Februar 2020, als die Welt noch Masken hortete, ermöglichten taiwanesische Programmierer in 72 Stunden die Bestandsabfrage für 13.000 Convenience Stores. Ohne Regierungsauftrag oder Budget, nur getrieben von der Überzeugung: Gesellschaft durch Code verändern. Das ist g0v (Zero Government), ein faszinierendes Experiment eines „Fork der Regierung“.'
date: 2026-03-23
category: 'Technology'
tags: ['Technologie', 'Open-Source-Community', 'g0v', 'Civic Tech']
subcategory: '開源社群'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: true
readingTime: 8
translatedFrom: 'Technology/開源社群與g0v.md'
sourceCommitSha: 'ab9964d668'
sourceContentHash: 'sha256:49bc798dac7c0848'
sourceBodyHash: 'sha256:3eab141a44932c8b'
translatedAt: '2026-11-24T11:38:05+08:00'
---

# Open-Source-Community und g0v

> **30-Sekunden-Überblick:** Im Jahr 2012 beschlossen eine Gruppe von Ingenieuren, die Regierung zu „forken“ – sie änderten gov.tw in g0v.tw um, um neu zu gestalten, wie eine Regierung aussehen sollte, nachdem der Staat viel Geld für einen inhaltsleeren Werbespot ausgegeben hatte. Acht Jahre später, beim Ausbruch der COVID-19-Pandemie, erstellten diese „Hobby“-Programmierer innerhalb von 72 Stunden eine Masken-Karte, die es allen Menschen in Taiwan ermöglichte, den Bestand in 13.000 Apotheken in Echtzeit abzufragen. Dies war kein Erfolg der Regierung, sondern ein Sieg der Bürger.

In einer Nacht im Oktober 2012 saß Kao Chia-liang vor seinem Computer und sah sich die Werbung für das „Wirtschaftliche Dynamik-Förderprogramm“ der Regierung an; je länger er zusah, desto wütender wurde er. Die Regierung hatte über 40 Millionen NT$ für Werbevideos ausgegeben, doch der Inhalt war so hohl, dass man sich fragte: Wäre es nicht sinnvoller gewesen, das Geld einfach direkt in den Abfluss zu werfen?

In jener Nacht traf er eine Entscheidung, die Taiwan verändern sollte: **Wenn die Regierung es nicht richtig macht, machen wir es selbst.**

Er änderte das „o“ in der Regierungsdomain gov.tw in eine „0“, wodurch g0v.tw entstand[^1]. Dieses einfache Wortspiel symbolisierte ein völlig neues Konzept: **fork the government**. Genau wie bei Open-Source-Software: Wenn die Originalversion Probleme hat, erstellt man einen „Fork“ (einen Abzweig) und schreibt selbst eine bessere Version.

## Fork der Regierung: Ein bürgerschaftliches Experiment im digitalen Zeitalter

g0v will die Regierung nicht stürzen, sondern eine „parallele“ Regierung schaffen – mit Open-Source-Kollaboration neu zu denken, wie Regierungsdienstleistungen aussehen sollten.

**Im Dezember 2012** fand der erste g0v-Hackathon im Academia Sinica statt, an dem über 40 Personen teilnahmen. Das erste Projekt bestand darin, den „Gesamtbudgetplan der Zentralregierung“ aus der „PDF-Hölle“ zu befreien und in eine interaktive Visualisierungs-Website zu verwandeln.

Ursprünglich war das Budgetdokument der Regierung ein über 500 Seiten starkes PDF voller dichter Zahlen und Tabellen, die für Laien unlesbar waren. g0v-Freiwillige bereiteten diese Daten neu auf und erstellten interaktive Diagramme – **mit einem Klick konnte man sehen, wohin die Steuergelder flossen.**

> **📝 Notiz der Kuratoren**
> Dass das erste Projekt von g0v die Visualisierung des Regierungsbudgets war, war kein Zufall. Das Budget ist der Kern der demokratischen Politik – die Bürger haben das Recht zu wissen, wofür die Regierung ihr Geld ausgibt. Doch traditionelle Budgetdokumente sind oft so gestaltet, dass man sie nicht versteht. g0v nutzte Technologie, um diese „beabsichtigte Intransparenz“ zu durchbrechen.

Dieses kleine Experiment bewies eines: **Nur weil die Regierung etwas nicht tut, heißt das nicht, dass es nicht machbar ist. Es wurde lediglich niemand beauftragt, es zu tun.**

## Die 318-Bewegung: Eine Machtdemonstration von Civic Tech

Am Abend des 18. März 2014 besetzten Studenten das Parlament (Legislativ Yuan). Am nächsten Morgen erschienen g0v-Freiwillige vor Ort – nicht um zu protestieren, sondern um „Infrastruktur aufzubauen“.

**Ohne Organisation, ohne Befehl.** Die Teilnehmer der g0v-Community taten dies spontan:

- **Echtzeit-Übertragung**: Aufbau von Multi-Kamera-Live-Streaming-Systemen, damit die Welt die Situation im Parlamentssaal verfolgen konnte.
- **Informationsintegration**: Erstellung des „hackfoldr“-Ordners[^2], um verschiedene Online-Informationen in Echtzeit zu sammeln, zu ordnen und zu verifizieren.
- **Crowdsourcing**: Aufbau eines kollaborativen Schreibsystems, damit Bürger, die nicht vor Ort waren, an der Datenerhebung und Faktenprüfung teilnehmen konnten.
- **Externe Vernetzung**: Bereitstellung von Echtzeit-Übersetzungen in mehreren Sprachen, damit internationale Medien die Forderungen der Protestierenden sofort verstehen konnten.

**24 Tage Besetzung, durchgehend in HD live übertragen, ohne Verbindungsabbruch.** Dies war im Jahr 2014 eine unglaubliche technische Leistung. Damals gab es noch kein Facebook Live und YouTube-Livestreams waren nicht verbreitet, aber g0v-Freiwillige bauten mit Open-Source-Tools ein System auf, das stabiler war als das professioneller Medien.

Noch wichtiger war, dass sie die Macht der „Transparenz“ bewiesen. Durch das Live-Streaming konnte jeder sehen, was im Parlamentssaal geschah; es wurde unmöglich für die Regierung, Fakten zu verdrehen. Dieses Modell des „Technologie-basierten Monitorings der Regierung“ wurde später im Ausland als mögliches Vorbild betrachtet; in Südkorea, Thailand, Japan und Deutschland entstanden ähnliche Civic-Tech-Communities[^3].

## Die Masken-Karte: Ein Wunder in 72 Stunden

Anfang Februar 2020 brach die COVID-19-Pandemie in Taiwan aus. Die Regierung kündigte eine Masken-Registrierungspolitik an, bei der jeder Bürger pro Woche zwei Masken kaufen konnte. Das Problem war: Wo kann man sie kaufen? Welche Apotheke hat noch Vorrat?

**Am 6. Februar** verkündete die digitale Kommissarin Audrey Tang (sie selbst ein Gründungsmitglied von g0v): Die Regierung wird die Bestandsdaten von 13.000 Vertragspotheken in ganz Taiwan öffnen, mit Aktualisierungen alle 30 Minuten[^4].

**Am 8. Februar** ging die erste Masken-Karte online.
**Am 9. Februar** gab es bereits über 100 verschiedene Versionen der Masken-Karte.

Dies war kein Projekt, das die Regierung an eine IT-Firma vergeben hatte, sondern das Ergebnis von „freiwilligen Überstunden“ taiwanesischer Programmierer. **Jeder wollte einen Beitrag zur Pandemiebekämpfung leisten, und das, was Programmierer tun konnten, war Code zu schreiben.**

Zu den beliebtesten Versionen gehörten:

- **Taiwan Mask Map** von Howard Wu: Eine schlichte und klare Kartenoberfläche.
- **Gibt es noch Masken? (還有口罩嗎)** vom Nutzer kiang: Integrierte Apothekenbewertungen und Öffnungszeiten.
- **Wo kaufen? (口罩哪裡買)** von Finjon Kiang: Unterstützte Sprachabfragefunktionen.

Innerhalb von 72 Stunden verfügte Taiwan über das weltweit am besten ausgearbeitete System zur Abfrage von Maskenbeständen[^5]. **Während die Bürger in anderen Ländern noch in Schlangen standen, um Masken zu ergattern, konnten die Menschen in Taiwan bereits auf ihrem Handy prüfen, wie viele Masken die nächste Apotheke noch vorrätig hatte.**

> **⚠️ Kontroverser Standpunkt**
> Kritiker warfen der Regierung vor, „die Verantwortung an Freiwillige auszulagern“ und die Zivilgesellschaft kostenlos Systeme für den Staat bauen zu lassen. Die Antwort der g0v-Community war direkt: Wir werden nicht von der Regierung ausgenutzt; wir entscheiden uns aktiv dazu, unsere Expertise der Gesellschaft zurückzugeben. Zudem waren die Open-Source-Masken-Karten benutzerfreundlicher, innovativer und bedarfsgerechter als die Systeme, die die Regierung selbst entwickelt hätte.

## Die Magie der Open-Source-Kollaboration

Das Betriebsmodell von g0v ist simpel: **Keine Chefs, keine Angestellten, kein Budget, kein Büro.** Es gibt nur eine Gruppe von Menschen, die bereit sind, soziale Probleme mit Technologie zu lösen, und eine Kultur der Open-Source-Zusammenarbeit.

### Hackathon-Kultur

Alle zwei Monate findet ein „Großer Hackathon“ statt, bei dem Teilnehmer vor Ort Ideen vorschlagen, Teams bilden und umsetzen. Der Ablauf ist:

1. **Drei-Minuten-Pitch**: Jeder kann auf die Bühne gehen und eine Idee vorstellen.
2. **Freie Teambildung**: Interessierte können sich Projekten anschließen.
3. **Live-Umsetzung**: Die Arbeit beginnt noch am selben Tag.
4. **Ergebnispräsentation**: Am Nachmittag wird der Fortschritt des Tages geteilt.

**Niemand wird abgelehnt, keine Idee wird verworfen.** Die einzige Bedingung: Das Projekt muss Open Source sein, damit andere daran weiterarbeiten können.

### Kollaborations-Tools

- **Slack-Kanäle**: Für tägliche Diskussionen und Informationsaustausch.
- **GitHub**: Code-Management und Versionskontrolle[^6].
- **HackMD**: Gemeinsame Dokumentation und Protokolle.
- **Trello**: Projektmanagement und Fortschrittsverfolgung.

### Drei Kernprinzipien

1. **Open Source**: Der Code, die Daten und die Dokumentation aller Projekte sind öffentlich zugänglich.
2. **Dezentralisierung**: Es gibt keine Hierarchie; jeder kann ein Projekt initiieren.
3. **Umsetzung zählt**: „Talk is cheap, show me the code“.

> **💡 Wussten Sie schon?**
> In der g0v-Community gibt es eine Tradition: Zu jedem Hackathon werden „Eichhörnchen“-Sticker vorbereitet. Wenn man zum ersten Mal teilnimmt, erhält man einen solchen Sticker. Das Design impliziert: Auch wenn du ein Neuling bist, bist du willkommen, ein kleines bisschen Kraft beizusteuern – so wie Eichhörnchen Eicheln sammeln, ist jeder kleine Beitrag wichtig.

## Wichtige Projekte und gesellschaftliche Auswirkungen

In den letzten acht Jahren hat die g0v-Community hunderte Projekte hervorgebracht, von denen viele direkten Einfluss auf die Regierungspolitik und das gesellschaftliche Funktionieren hatten.

### Transparenz der Parlamentsarbeit

Früher gab es die **Protokolle des Legislativ Yuan** nur in Textform, was es für normale Bürger schwierig machte zu verstehen, was Abgeordnete tatsächlich im Parlament taten. g0v-Freiwillige errichteten eine Plattform zur „Transparenz der Parlamentsarbeit“, die Folgendes bietet:

- **Live-Übertragung**: Live-Streaming von Parlamentssitzungen.
- **Rede-Protokolle**: Statistiken und Suchfunktionen für die Reden jedes Abgeordneten.
- **Abstimmungsergebnisse**: Die Ergebnisse wichtiger Gesetzesvorlagen.
- **Verfolgung von Entwürfen**: Der vollständige Prozess eines Gesetzes vom Vorschlag bis zur dritten Lesung.

Das Ergebnis: **Die Abgeordneten begannen, auf ihre „Daten“ zu achten.** Anwesenheitsraten, Anzahl der Anfragen, Anzahl der eingereichten Entwürfe – Zahlen, die früher niemanden interessierten, werden nun durch Websites statistisch erfasst. Volksvertreter stellten fest, dass jede ihrer Bewegungen überwacht wurde, und ihr Verhalten begann sich zu ändern.

### vTaiwan: Ein Experiment für digitale Demokratie

Im Jahr 2014 startete g0v in Zusammenarbeit mit der Regierung die Plattform vTaiwan[^7], um Bürger an politischen Entscheidungsprozessen teilhaben zu lassen. Der bekannteste Fall war die Uber-Kontroverse:

**Im Jahr 2015** löste der Betrieb von Uber in Taiwan Proteste des Taxigewerbes aus. Traditionell würde die Regierung eine einseitige Entscheidung treffen, aber vTaiwan bot einen dritten Weg: Alle Stakeholder auf einer Online-Plattform diskutieren zu lassen, um eine Win-Win-Lösung zu finden.

Nach monatelangen Online-Diskussionen und physischen Workshops entstand schließlich die „Diversifizierte Taxi-Politik“, die sowohl die Rechte der traditionellen Taxifahrer schützte als auch innovative Servicemodelle zuließ.

**Dies war das erste Mal in Taiwan, dass ein politischer Konflikt mittels „digitaler Demokratie“ gelöst wurde.**

### Wegbereiter für eine offene Regierung

Die Advocacy-Arbeit von g0v beeinflusste die Regierungspolitik direkt:

- **2012**: Das Projekt zur Budget-Visualisierung drängte die Regierung dazu, Budgetdaten offenzulegen.
- **2013**: Das Transparenzprojekt für das Parlament förderte das Live-Streaming der Parlamentssitzungen.
- **2014**: Nach den Sonnenblumen-Protesten versprach die Regierung eine Reform des Gesetzes über die Offenlegung von Regierungsinformationen.
- **2015**: Die vTaiwan-Plattform wurde zu einem offiziellen Kanal für politische Beteiligung der Regierung.
- **2016**: Audrey Tang wurde digitale Kommissarin und brachte die g0v-Erfahrung in die Regierung ein.

## Internationale Auswirkungen und Verbindungen

Die Erfahrungen von g0v beeinflussen nicht nur Taiwan, sondern inspirieren die weltweite Civic-Tech-Bewegung.

### Das Code for All Netzwerk

g0v ist Gründungsmitglied des internationalen **Code for All** Netzwerks[^8] und arbeitet eng mit Organisationen wie Code for Japan, Code for Korea und Code for America zusammen.

**Im Jahr 2019** fand der g0v Summit in Taipeh statt, bei dem Civic-Tech-Communities aus über 30 Ländern zusammenkamen, um Erfahrungen und Technologien auszutauschen.

### Internationale Zusammenarbeit während der Pandemie

Während der Pandemie im Jahr 2020 lernten andere Länder von der Erfahrung der taiwanesischen Masken-Karte:

- **Italien**: Eine römische Version der Masken-Karte.
- **Deutschland**: Eine Berliner Version der Masken-Karte.
- **USA**: Eine PPE-Karte (Persönliche Schutzausrüstung).
- **Südkorea**: 마스크맵 (Mask Map).

g0v-Freiwillige halfen auch proaktiv anderen Ländern beim Aufbau ähnlicher Systeme und teilten die Erfahrungen Taiwans in der Pandemiebekämpfung mit der Welt.

## Herausforderungen und Zukunft

Als „Organisation ohne Chef“ steht g0v vor den Herausforderungen, denen jede Open-Source-Community gegenübersteht.

### Nachhaltigkeit von Projekten

Viele g0v-Projekte sind Produkte eines „kurzfristigen Impulses“ und es mangelt an langfristiger Wartung. Die Masken-Karte war während der Pandemie sehr aktiv, wurde aber nach dem Ende der Pandemie allmählich nicht mehr gepflegt. **Wie man gute Projekte am Laufen hält, ist die größte Herausforderung für g0v.**

### Teilnehmer-Müdigkeit

Die intensive Freiwilligenarbeit über acht Jahre hinweg hat bei einigen frühen Mitwirkenden zu Erschöpfung geführt. Wie man neues Blut anzieht und wie man die Beteiligung nachhaltiger gestaltet, sind Probleme, mit denen die Community konfrontiert ist.

### Verhältnis zur Regierung

Das Verhältnis zwischen g0v und der Regierung ist subtil: Es ist sowohl kollaborativ als auch kontrollierend. Wenn die Regierung Open Source und digitale Demokratie aktiv annimmt, wird die „konfrontative“ Rolle von g0v unklar. Wie man Unabhängigkeit und kritischen Geist in der Zusammenarbeit bewahrt, bleibt eine ständige Herausforderung.

### Desinformation und Informationskrieg

Im Zeitalter des Informationskriegs können auch die Prinzipien von Offenheit und Transparenz missbraucht werden. Die neue Herausforderung besteht darin, offen zu bleiben, ohne zum Verbreitungsweg für Desinformation zu werden.

## Ein Experiment, das noch andauert

Als Kao Chia-liang 2012 gov.tw in g0v.tw änderte, wollte er lediglich seinen Unmut über die Regierung ausdrücken. Zwölf Jahre später ist g0v zu einem Teil der taiwanischen Demokratie geworden und eine wichtige Kraft in der weltweiten Civic-Tech-Bewegung.

Dieses Experiment hat einige Dinge bewiesen:

1. **Technologie kann ein Werkzeug für Bürgerbeteiligung sein**, nicht nur ein Mittel zur kommerziellen Gewinnmaximierung.
2. **Offenheit und Transparenz sind wichtiger als die Effizienz der Regierung**, denn Transparenz bringt Effizienz mit sich.
3. **Kleiner Zorn kann die Welt verändern**, sofern man bereit ist, selbst anzupacken.
4. **Den „Fork der Regierung“ zu machen bedeutet nicht, die Regierung zu stürzen**, sondern zu beweisen, dass es bessere Möglichkeiten gibt.

In einer Zeit des demokratischen Rückschritts erinnert uns g0v daran: **Bürger sind nicht nur Nutzer der Regierung, sondern Mitgestalter.** Dinge, die die Regierung nicht gut macht, können wir selbst tun. Dinge, die die Regierung gut macht, können wir helfen, noch besser zu machen.

Dies ist keine abgeschlossene Revolution, sondern ein fortlaufendes Experiment. Jeder Hackathon, jedes neue Projekt und jede Zeile Code beantwortet dieselbe Frage: Wie kann Demokratie im digitalen Zeitalter aussehen?

Die Antwort wird gerade erst geschrieben, und jeder, der bereit ist, einen Beitrag zu leisten, ist ein Autor dieser Antwort.

## Referenzen

[^1]: [g0v Zero Government offizielle Website](https://g0v.tw/) — Das Portal der g0v-Community, das Hackathons und die Arbeitsweise verschiedener Projekte vorstellt.

[^2]: [g0v hackfoldr Kollaborationsordner](https://beta.hackfoldr.org/) — Die von der g0v-Community langfristig genutzte Plattform für gemeinsame Dokumente und Datenkollaboration.

[^3]: [A Guide to Win Democracy Back: Civic Tech Project and Community Handbook (Friedrich Naumann Foundation, 2025-06-09)](https://www.freiheit.org/fr/node/49973) — Ein Handbuch der Friedrich Naumann Stiftung über die g0v-Community, das sie als eine der wichtigsten Kräfte der digitalen Demokratie in Taiwan beschreibt und als mögliches weltweites Vorbild bezeichnet; enthält Fallstudien aus Südkorea, Thailand, Japan und Deutschland.

[^4]: [How digital innovation can fight pandemics and strengthen democracy (Audrey Tang, TED2020)](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy) — Audrey Tang spricht bei TED darüber, wie Taiwan Anfang 2020 durch digitale Werkzeuge Lockdowns vermied, einschließlich der Masken-Karte.

[^5]: [Interview mit den Entwicklern der Masken-Karte](https://www.ithome.com.tw/news/136038) — Ein Interview von iThome mit den Entwicklern der Masken-Karte über ihren Einsatz im Pandemieprojekt.

[^6]: [g0v GitHub Organisation](https://github.com/g0v) — Die Code-Repositorys und Kollaborationsprotokolle der Open-Source-Projekte der g0v-Community.

[^7]: [vTaiwan digitale Demokratie-Plattform](https://vtaiwan.tw/) — Eine Plattform für Online-Politikdiskussionen und Konsensbildung, die in Zusammenarbeit mit der Regierung betrieben wird.

[^8]: [Code for All internationales Netzwerk](https://codeforall.org/) — Die offizielle Website des Code for All Netzwerks, das globale Civic-Tech-Organisationen verbindet.

## Verwandte Themen

- [Open Culture Foundation](/de/technology/open-culture-foundation): Die gemeinnützige Stiftung hinter g0v, die Verwaltung und Abrechnung übernimmt, sowie ihre Geschichte vom Hintergrund zum digitalen Menschenrechtswächter.
- [Halbleiterindustrie](/de/technology/taiwan-semiconductor-industry): Das technologische Fundament der Stärke Taiwans.
- [Mini Taiwan Pulse](/de/technology/mini-taiwan-pulse-civic-tech): Ein persönliches Open-Source-Projekt für Civic Tech im Jahr 2026 – die Visualisierung Taiwans als 3D-Lichtspur mittels TDX-Open-Data und Three.js.
