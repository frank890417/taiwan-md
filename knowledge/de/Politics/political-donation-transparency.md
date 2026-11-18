---
title: 'Transparenz bei politischen Spenden: Die Aufbauinfrastruktur des Untersuchungsausschusses, g0v und die Offenlegung von 2022'
description: 'Durch die Öffnung der Plattform zur Einsicht in politische Spenden des Untersuchungsausschusses kann man für jeden Kandidaten einsehen, wer ihm wie viel gespendet hat und wofür diese Kampagnenausgaben verwendet wurden. Diese Infrastruktur ist nicht von oben gefallen – sie wurde durch das Gesetz von 2004, die Online-Plattform von 2008, die Datenfreigabe des Wahlkomitees und des Untersuchungsausschusses von 2017 sowie zehn Jahre Visualisierungsarbeit der g0v-Ingenieure aufgebaut.'
date: 2026-05-27
category: 'Politics'
tags:
  [
    'politische Spenden',
    'Transparenz',
    'Untersuchungsausschuss',
    'g0v',
    'Wahlfinanzen',
    'Gesetzgebung 2004',
    'Wahlen 2026',
  ]
subcategory: '公民監督'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-05-27
lastHumanReview: false
readingTime: 12
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Politics/政治獻金透明度.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:8a7814971a9249c7'
sourceBodyHash: 'sha256:214c403ec0d7137c'
translatedAt: '2026-09-22T17:41:10+08:00'
---

# Transparenz bei politischen Spenden: Als demokratische Infrastruktur, die heruntergeladen werden kann

> **30-Sekunden-Überblick:** An einem Wochenende im Jahr 2014 öffnete ein g0v-Ingenieur in der Hackathon-Location auf Qingdao East Road in Taipeh die Berichte über politische Spenden des Untersuchungsausschusses. Er wollte nicht viel sehen – welche Firmen den Kandidaten der vorherigen Legislatur gespendet hatten und wie viel pro Zuwendung. Aber die Datei wurde als PDF heruntergeladen. Nicht als Tabelle, nicht als CSV, nicht als JSON – sondern als gescanntes PDF. Er stellte seinen Kaffee ab, öffnete das Terminal und begann, die erste Zeile des Daten-Scraping-Skripts zu schreiben. Zehn Jahre später existierte in Taiwan dieses Visualisierungssystem für „Wahlfinanzen“ – es wurde nicht von der Regierung geschaffen, sondern durch zivilgesellschaftliche Ingenieure ergänzt. Doch dieser Platz war nicht leer; darunter stand ein Gesetz aus dem Jahr 2004, eine Einsichtsplattform von 2008 und Rechnungsberichte, die gemäß den Vorschriften an den Untersuchungsausschuss übermittelt wurden. Dieser Artikel handelt von diesem Ort – der politischen Spenden-Transparenz, einem technischen, oft vernachlässigten, aber konkreten Teil der demokratischen Infrastruktur Taiwans seit 2022.

---

## Warum wir bei PDF beginnen müssen

Normale Bürger prüfen nicht die politischen Spenden. Das ist eine Tatsache.

Die gesamte Abfolge – die Öffnung der Plattform zur Einsicht in politische Spenden des Untersuchungsausschusses[^1], das Eingeben des Namens eines Kandidaten und der Download des Berichts – gehört für die überwiegende Mehrheit der Wähler nicht zum Alltag. Am Wahltag geht man früh ins Wahllokal, wählt eine Stimme, und sieht sich zu Hause den Wahlergebnis-Live-Stream an; das ist die gängige Erfahrung der demokratischen Beteiligung.

Aber **der Wert der Transparenz-Infrastruktur liegt nicht darin, wie oft sie genutzt wird, sondern in ihrer Existenz**.

Wenn ein investigativer Journalist eine Finanzspur verfolgen muss – dort ist die Plattform.
Wenn ein Kandidat eines Abgeordneten wissen möchte, welche Firmen dem Amtsinhaber in der letzten Legislatur gespendet haben – dort ist die Plattform.
Wenn ein g0v-Ingenieur Daten visualisieren möchte, um sie besser verständlich zu machen – dort sind die Rohdaten.
Wenn ein Wissenschaftler die Struktur der Geldpolitik untersuchen will – dort liegen zwei Jahrzehnte akkumulierter Daten vor.

Ohne die Plattform wäre diese Nachforschung unmöglich. Mit der Plattform gibt es eine überprüfbare Untergrenze für die Qualität der Demokratie.

Deshalb war der Moment, als das Gesetz über politische Spenden 2004 erlassen wurde[^2], nicht durch den Sieg einer Partei definiert – sondern dadurch, dass die demokratische Infrastruktur Taiwans ein Organ gewachsen hat.

---

## Das Jahr 2004: Ein seltenes Konsensjahr der beiden Parteien

Am 26. März 2004 verabschiedete der Gesetzgeber das Gesetz über politische Spenden[^2].

Die politische Atmosphäre in diesem Jahr war eigentlich nicht freundlich – nur sieben Tage nach dem Schussvorfall vom 19. März, löste das Präsidentschaftswahlresultat einen Konflikt zwischen Blau und Grün aus, und die Proteste vor der Keledargrand-Avenue waren noch nicht abgeklungen. Doch gerade in diesem angespannten Frühling wurde das Gesetz über politische Spenden verabschiedet.

Warum gelangten die beiden Parteien zu einem Konsens in dieser Zeit? Die Antwort liegt in den zehn Jahren davor.

Seit den 1990er Jahren war der Begriff „Geldpolitik“ (Jinquan) für beide Parteien fast ein Schmerzpunkt. Die Kuomintang wurde beschuldigt, lokale Fraktionen und Kapitalisten zu vermischen; die Demokratische Fortschrittspartei wurde beschuldigt, neue Unternehmensfinanzierer anzunehmen; unabhängige Kandidaten wurden beschuldigt, Geld anzunehmen, ohne dass jemand etwas tun konnte. Nach jeder Wahl gab es vereinzelte Finanzskandale, aber da kein spezielles Gesetz, keine Offenlegungspflicht und keine Strafen existierten – die Skandale verschwanden, sobald der öffentliche Diskurs abgeklungen war.

Erst nach dem ersten Parteiwechsel im Jahr 2000 trieb die Regierung Chen Shui-bian die Gesetzgebung voran, und obwohl die Mehrheit des Gesetzgebers, dominiert von der Kuomintang, in vielen Fragen im Widerspruch zur Exekutive stand, **erkannten beide Parteien an, dass sie unter dem Stigma der Geldpolitik gelitten hatten**. Der Bedarf an einem Image der Integrität war größer als die Bequemlichkeit der Geheimhaltung.

Das Gesetz über politische Spenden entstand zu dieser Zeit – nicht durch einen Helden vorangetrieben, sondern durch eine Schnittmenge gemeinsamer Interessen beider Parteien.

---

## Das Gerüst des Gesetzes: Wer kann empfangen, wer kann spenden, welche Obergrenze, wie melden?

Der gesamte Text des Gesetzes über politische Spenden ist nicht lang, aber das Gerüst ist klar[^3].

**Artikel 5: Wer darf politische Spenden annehmen.** Das Gesetz definiert drei Arten von „Empfängern politischer Spenden“:

- Kandidaten (registriert)
- Parteien
- Politische Organisationen (gemäß den Vorschriften gegründet)

Wer außerhalb dieser drei Kategorien politische Spenden annimmt – das ist illegal. Assistenzkräfte der Abgeordneten, Kampagnendirektoren, die im Auftrag des Kandidaten empfangen, oder Ehepartner des Kandidaten – das ist alles nicht erlaubt. Die Gesetzesgestaltung zwingt den Geldfluss durch den Kanal der „meldepflichtigen Subjekte“ und drängt Grauzonen heraus.

**Artikel 7: Wer darf spenden.** Das Gesetz erlaubt drei Arten von Spendern:

- Staatsbürger des Landes
- Unternehmen des Landes
- Nichtgewinnorganisationen des Landes

**Dies ist verboten:**

- Ausländische Unternehmen, ausländische Regierungen, ausländische Personen
- Volksgruppen, juristische Personen oder Organisationen der Volksrepublik China
- Regierungsbehörden, staatliche Unternehmen
- Juristische Personen, bei denen die Regierung oder ein staatliches Unternehmen mehr als 20 % beteiligt ist
- Auftragnehmer, mit denen eine Regierung einen Vertrag hat[^4]

Der letzte Punkt – dass staatliche Auftragnehmer nicht spenden dürfen – ist die grundlegendste Schutzmauer gegen „die Vergabe von Regierungsaufträgen im Austausch für politische Spenden“.

**Artikel 18: Höchstbetrag.** Dies ist der am häufigsten diskutierte Artikel[^5]:

- Einzelperson an denselben Kandidaten: 100.000 NTD pro Jahr
- Unternehmen an denselben Kandidaten: 1 Million NTD pro Jahr [MUSS GEPRÜFT WERDEN]
- Einzelperson an eine Partei: 300.000 NTD pro Jahr
- Unternehmen an eine Partei: 3 Millionen NTD pro Jahr [MUSS GEPRÜFT WERDEN]

Die Logik der Obergrenze ist es, den Einfluss eines einzelnen Spenders auf einen einzigen Kandidaten zu verhindern – aber wir werden sehen, wie dieser Mechanismus durch die Struktur der „verteilten Spenden“ umgangen wird.

**Artikel 20: Meldepflicht.** Der Kandidat muss innerhalb einer bestimmten Frist nach der Wahl eine vollständige Aufschlüsselung aller Einnahmen und Ausgaben an den Untersuchungsausschuss melden – wer wie viel gespendet hat, wofür es ausgegeben wurde und wie viel übrig ist. Die Meldedaten werden alle in das spezielle Kontosystem des Untersuchungsausschusses für die öffentliche Einsicht hochgeladen und dienen als Datenquelle für die spätere öffentliche Einsichtnahme.

**Artikel 26: Strafen.** Verstöße führen zu Bußgeldern von dem 1- bis 5-fachen, bei schwerwiegenden Fällen strafrechtliche Verantwortung – maximal fünf Jahre Freiheitsstrafe[^6]. Die Gestaltung der Strafe macht es unvernünftig, „einfach nicht zu melden“.

Das Gesetz endet hier – das Gerüst ist fertig. Aber ein Gerüst ist kein Organ; ein Organ braucht Fleisch und Blut. Das Fleisch und Blut ist die Plattform.

---

## 2008: Die Inbetriebnahme der Untersuchungsausschuss-Plattform

Die Präsidentschaftswahl von 2008 – Ma Ying-jeou gegen Hsieh Chang-ting – war die erste Präsidentschaftswahl in Taiwan, bei der das Gesetz über politische Spenden „vollständig angewendet und zur Meldung gezwungen“ wurde[^7] [MUSS GEPRÜFT WERDEN].

In diesem Jahr wurde die Plattform zur Einsicht in politische Spenden des Untersuchungsausschusses offiziell online gestellt. Adresse: `https://ardata.cy.gov.tw/`[^1]。

Das Design der ersten Version der Plattform war einfach: Die Papierdokumente, die von den Kandidaten gemeldet wurden, sollten digitalisiert, online gestellt und öffentlich einsehbar gemacht werden. Jeder konnte den Namen eines Kandidaten / einer Partei / einer politischen Organisation eingeben und die detaillierten Einnahmen und Ausgaben aus früheren Meldungen einsehen – einschließlich des Namens jedes Spenders, des Betrags und der Kategorisierung der Verwendung.

Dies war eine seltene Gestaltung in Asien. **Die Daten der FEC (Federal Election Commission) in den USA sind tiefer – aber sie wurden erst nach der Wahl freigegeben**[^8]. Japan hatte auch einen Offenlegungsmechanismus nach der Verschärfung des Gesetzes über politische Finanzmittel im Jahr 2007, aber die Lücke der „politischen Organisation“ erlaubte es dem Hauptfluss, umzuleiten[^9]. Die nationale Wahlkommission in Korea verwaltet zentralisiert, aber die Oberfläche ist weniger benutzerfreundlich als die von Taiwan[^10] [MUSS GEPRÜFT WERDEN].

Taiwan war an dieser Stelle tatsächlich führend – aber der Vorsprung konnte das nächste Problem nicht verhindern.

**Das Problem: Die Benutzeroberfläche ist schwer zu bedienen, die Daten sind nicht strukturiert und sie können nicht stückweise heruntergeladen werden.**

Wenn man die erste Version der Plattform öffnet, muss man jedes PDF einzeln anklicken. Wenn man sehen will, welche Firmen einen Kandidaten gespendet haben – klickt man auf PDF 1. Für den nächsten – klickt man auf PDF 2. Um Vergleiche zwischen verschiedenen Kandidaten zu ziehen – muss man die Tabellen selbst kopieren. Um eine zeitliche Analyse durchzuführen – muss man die Zeitachse selbst organisieren. Um zu sehen, ob dieselbe Gruppe Tausende von Einzelpersonen gespendet hat – muss man Adressen und Namen manuell abgleichen.

Das ist der Kontext, in dem der g0v-Ingenieur im Jahr 2014 die Datei öffnete.

---

## 2014: Die g0v „Wahlfinanzen“ füllen die Lücke

g0v ist die zivilgesellschaftliche Hacker-Community Taiwans[^11]. Der Name stammt von der Idee, „gov.tw zu g0v.tw zu machen“ – eine Open-Data-Arbeit, die die Regierung nicht erledigt hat, sondern die Community selbst übernommen hat.

Bei einem Hackathon im Jahr 2014 entschieden einige Ingenieure, das Projekt „Wahlfinanzen“[^12] zu realisieren. Das Ziel war klar:

1. Die PDF-Berichte des Untersuchungsausschusses herunterladen
2. In strukturierte Daten (CSV / JSON) parsen
3. Visualisieren, damit es verständlich ist
4. Alle Scraping- und Parsing-Skripte als Open Source veröffentlichen

Der erste Schritt war ein Hindernis – die PDFs waren gescannt, keine echten digitalen PDFs. Der Text konnte nicht direkt kopiert werden. Sie mussten eine OCR-Pipeline schreiben, Formatkorrekturen erstellen, Namen abgleichen und Unternehmen deduplizieren.

Nach einigen Monaten wurde die erste Version von „Wahlfinanzen“ veröffentlicht[^12]. Was man auf der Webseite sah, war kein Bericht – sondern ein Netzwerkdiagramm.

- Kreise repräsentieren Kandidaten oder Spender
- Linien zeigen die Flussrichtung des Geldes
- Die Dicke der Linie zeigt den Betrag an
- Zugehörige Unternehmen derselben Gruppe werden durch Farben gruppiert

Ein Klick auf einen Knoten zeigte die vollständigen Details. Ein Klick auf eine Verbindung zeigte die ursprüngliche Meldestelle (mit Angabe der PDF-Seitenzahl des Untersuchungsausschusses).

**Diese Visualisierung machte Daten, die der Untersuchungsausschuss bereits veröffentlicht hatte, erforschbar.** Gesetz + Plattform + Visualisierung – erst durch diese Schichtung wurde es möglich, „den Geldfluss mit dem Browser zu verfolgen“.

Nicht nur das Projekt „Wahlfinanzen“. Das politische Überwachungssystem von g0v umfasst auch:

- **councilor-voter-guide** (Ratgeber für Abgeordnete) [^13]: Integriert die politischen Spenden, Anwesenheitsraten, Vorschlagsakten und Anfragen der Ratsmitglieder zu einem „Abgeordneten-Identifikationskarten“.
- **Dark Finance**[^14] [MUSS GEPRÜFT WERDEN]: Markiert verdächtige oder fragwürdige Finanzflussmuster.
- **Vergleich von Regierungsaufträgen und politischen Spenden**: Verknüpft Daten aus öffentlichen Ausschreibungen mit den Daten über politische Spenden, um zu sehen, welche Auftragnehmer auch Spender sind.

Das Merkmal dieser Projekte ist: **Alle Rohdaten stammen aus offiziellen staatlichen Quellen**. Die Community „enthüllt“ keine Geheimnisse; sie macht bereits veröffentlichte, aber schwer zugängliche Daten nutzbar.

Dies ist das gesunde Modell der zivilgesellschaftlichen Überwachung in Taiwan – die Regierung stellt die Rohdaten bereit, die Community ergänzt die Schnittstelle und analysiert, und Medien und Wissenschaftler nutzen die Ergebnisse der Community zur Kontrolle. Eine dreiteilige Aufteilung, bei der jeder seine Stärken einbringt.

---

## 2017: Die Datenfreigabeabkommen zwischen Untersuchungsausschuss und Wahlkomitee

Das Jahr 2017 war ein Wendepunkt.

In diesem Jahr unterzeichneten der Untersuchungsausschuss und die Nationale Wahlkommission ein Datenfreigabeabkommen [MUSS GEPRÜFT WERDEN], wodurch einige politische Spenden in strukturiertem Format (CSV / teilweise API-Felder) veröffentlicht wurden[^15]. Obwohl es keine vollständige API war, blieben viele Daten im PDF-Format – aber dies war das erste Mal, dass die offizielle Datenplattform Taiwans offiziell anerkannte: „Strukturierte Daten sind echte Offenlegung“.

Die zweite Generation von g0v „Wahlfinanzen“ erschien zu dieser Zeit[^12]. Die neue Version benötigte keine OCR-Verarbeitung großer Mengen; sie konnte direkt die offiziellen CSVs verarbeiten – was die Effizienz erhöhte, Fehler reduzierte und die Abdeckung erweiterte.

Aber **die vollständige API wurde noch nicht realisiert**. Im Jahr 2026 ist man bei einer groß angelegten Analyse von politischen Spenden über verschiedene Wahlkreise, Jahre und Kandidaten immer noch teilweise auf die vom g0v gewarteten Crawling-Kanäle angewiesen. Die Linie der „Open Data“ der Regierung in dieser Frage ist seit zwei Jahrzehnten nicht abgeschlossen.

---

## Strukturelle Probleme: Das Gesetz ist geschrieben, aber es gibt Lücken

Das Gesetz über politische Spenden funktioniert seit zwanzig Jahren und hat einige strukturelle Probleme angesammelt. Diese sind keine Fehler im ursprünglichen Gesettdesign – sondern allgemeine Herausforderungen jeder Transparenzgesetzgebung.

### I. Umgehung der Obergrenze durch verteilte Spenden

Artikel 18 des Gesetzes legt die Grenzen von 100.000 NTD für Einzelpersonen und Unternehmen fest, was ausreichen sollte, um eine konzentrierte Einflussnahme zu verhindern. In der Praxis kann jedoch ein Konzern **eine große einzelne Spende in Dutzende kleinerer Spenden aufteilen**. Die Direktoren des Konzerns, deren Ehepartner, die Leiter von Tochtergesellschaften, Mitarbeiter – jeder spendet 100.000 NTD unter ihrem eigenen Namen und überschreitet kollektiv die Obergrenze um ein Vielfaches[^16].

Dieses Muster verstößt technisch nicht gegen Artikel 18 – jede Einzelperson ist innerhalb der Grenze. Aber es ist eine Umgehung in der Substanz. Um zu beweisen, dass es sich um „verteilte“ Mittel handelt, muss die Herkunft des Geldes zurückverfolgt und relevante Personen interviewt werden – was das Prüfkapital des Untersuchungsausschusses nicht leisten kann.

### II. Die Grauzone der Kreditvereinbarungen

Das Gesetz erlaubt Kandidaten, „sich selbst zu leihen“, um Kampagnen durchzuführen – d. h., dass der Kandidat selbst oder seine Familie große Darlehen für die Kampagne gewährt und diese später mit anderen Einnahmen zurückzahlt [MUSS GEPRÜFT WERDEN]. Dieses Design sollte verhindern, dass Kandidaten aufgrund mangelnder Anfangsfinanzierung nicht antreten können, aber in der Praxis **werden Kredite oft zur Hauptfinanzierungsquelle**. Darlehen gelten nicht als „politische Spenden“ – sie unterliegen weder der Obergrenze von Artikel 18 noch werden auf derselben Liste der „Spender“ veröffentlicht.

Das Ergebnis: Ein Kandidat meldet möglicherweise nur wenige Millionen an politischen Spenden, aber die tatsächlichen Wahlkampfkosten können mehrere Zehn Millionen betragen; die Differenz stammt aus „Selbstfinanzierung“ – und die Rückzahlung dieser „Selbstfinanzierung“ fällt oft nicht in den Anwendungsbereich des Gesetzes über politische Spenden.

### III. Politische Spende ≠ Wahlkampfbudget

Dies ist der am leichtesten zu vermischende Punkt.

**Politische Spenden** sind das „Geld, das angenommen wurde“ – sie unterliegen der Obergrenze von Artikel 18 und müssen dem Untersuchungsausschuss gemeldet werden.
**Wahlkampfbudget** ist das „Geld, das ausgegeben wurde“ – es unterliegt der Obergrenze des Artikels 41 des Gesetzes über Wahlen und Abberufung von Amtsträgern[^17] und muss der Nationalen Wahlkommission gemeldet werden.

Dies sind unterschiedliche Subjekte (Untersuchungsausschuss vs. Nationale Wahlkommission), verschiedene Meldesysteme, verschiedene öffentliche Schnittstellen und verschiedene Felddefinitionen. **Theoretisch müssten sie übereinstimmen** – Einnahmen minus Restbetrag gleich Ausgaben –, aber in der Praxis stimmen die Daten oft nicht überein. Der Grund sind Unterschiede in den Definitionen, den Meldefristen und der Verwendung des Restgeldes.

Die g0v-Community hat versucht, einen „Cross-Check zwischen politischen Spenden und Wahlkampfbudget“ durchzuführen – aber die Normalisierungsarbeit für die plattformübergreifende Anbindung ist enorm[^12].

### IV. Abberufung und Volksabstimmung fallen nicht unter Offenlegungspflichten

Das Gesetz über politische Spenden regelt „Wahlen von Kandidaten“ – es umfasst weder die Initiatoren eines Abrufs noch die Initiatoren einer Volksabstimmung.

Während der großen Abrufswelle im Jahr 2025 gab es keine gleichwertige Offenlegungspflicht für die Finanzierung der Unterschriftenorganisationen[^18]. Die Initiatoren können Spenden annehmen und mobilisieren, aber sie haben kein entsprechendes Meldesystem beim Untersuchungsausschuss. Diese Lücke wurde nach dem großen Abruf von 2025 als Reformthema diskutiert – aber das Gesetz über politische Spenden wurde seit 2018 nicht mehr geändert; bis Juli 2026 bleiben die Finanzflüsse der Initiatoren von Abrufen und Volksabstimmungen außerhalb der gesetzlichen Meldepflicht.

---

## Internationaler Vergleich: Taiwans relative Position in Asien

Zurück in das asiatische Koordinatensystem:

| Land     | Zuständige Behörde       | Offenlegungszeitpunkt                          | Benutzerfreundlichkeit der Schnittstelle                  | Obergrenzensystem                           |
| :------- | :----------------------- | :--------------------------------------------- | :-------------------------------------------------------- | :------------------------------------------ |
| Taiwan   | Untersuchungsausschuss   | 3–6 Monate nach der Wahl                       | Mittel (teilweise strukturiert)                           | Einzelperson 100.000 / Unternehmen begrenzt |
| USA      | FEC                      | Nach der Wahl (regelmäßige Vorabmeldungen)[^8] | Hoch (vollständige API)                                   | Schichtungen für Einzelpersonen / PACs      |
| Japan    | Ministerium für Inneres  | Jahresbericht                                  | Niedrig (hauptsächlich PDF)[^9]                           | Große Lücke bei politischen Organisationen  |
| Südkorea | Nationale Wahlkommission | Nach der Wahl                                  | Niedrig (veraltete Oberfläche)[^10] [MUSS GEPRÜFT WERDEN] | Zentralisiertes Management                  |

Die relative Position Taiwans ist: **Das rechtliche Fundament ist vollständig, die Plattform existiert, die Obergrenzen sind angemessen, aber die Schnittstelle kann noch verbessert werden und strukturelle Lücken erfordern eine Gesetzesänderung**.

Nicht das Beste – der FEC in den USA bleibt ein internationaler Maßstab hinsichtlich Daten-Tiefe und API-Vollständigkeit.
Aber auch nicht das Schlechteste – im Vergleich zu einigen Nachbarländern, die „formal offenlegen, aber praktisch nicht abfragen können“, ist die Plattform des Untersuchungsausschusses in Taiwan zusammen mit der Ergänzung durch g0v ein funktionierendes Ökosystem.

---

## Beobachtungspunkte für die Wahlen 2026

Die Neun-in-Eins-Wahl vom 28. November 2026 – mit insgesamt über 10.000 gewählten Ämtern[^19] (6 Bürgermeister der Großstädte, 380 Abgeordnete, 16 Bezirksbürgermeister, 532 Abgeordnete, 198 Stadtbürgermeister, 2.148 Vertreter, 6 Stammesführer, 50 Bezirksvertreter, 7.748 Dorfvorsteher).

Es gibt mehrere Punkte zur Beobachtung der Transparenz bei den politischen Spenden dieser Wahl:

**I. Erweiterung der Echtzeit-Meldungen.** Derzeit melden Kandidaten erst nach der Wahl und legen die Daten einige Monate danach offen. Wenn dies vorab regelmäßig (selbst monatlich) veröffentlicht werden könnte, wäre es für Wähler bedeutsamer. Dies erfordert eine Gesetzesänderung oder eine Anpassung auf Ebene des Untersuchungsausschusses durch Verwaltungsanordnungen.

**II. Abdeckung durch g0v-Spiegelbild.** „Wahlfinanzen“ von g0v erstellt jedes Jahr nach der Wahl eine vollständige Visualisierung, aber die Abdeckung „vor der Wahl“ ist noch begrenzt. Ob 2026 einen zivilgesellschaftlichen Datenkanal in nahezu Echtzeit gibt, hängt von der Dynamik der Community ab.

**III. Konzentration großer Spenden.** Beobachtung des Anteils weniger Spender an den Gesamtspendegeldern eines Kandidaten – je höher die Konzentration, desto abhängiger ist der Kandidat von bestimmten Geldgebern. Dies ist ein Indikator für die Struktur der Geldpolitik.

**IV. Abgleich staatlicher Auftragnehmer.** Artikel 7 verbietet Spenden durch staatliche Auftragnehmer – aber die Durchsetzung über verschiedene Perioden hinweg hat Verzögerungen (komplexe zeitliche Beziehung zwischen Vertragsdatum und Spendetermin). Nach jeder Wahl gibt es vereinzelte Fälle, die eine Untersuchung des Untersuchungsausschusses auslösen. Die Tiefe der Abdeckung solcher Fälle im Jahr 2026 ist ein Beobachtungspunkt.

**V. Lücken bei der Offenlegung von Abrufen/Volksabstimmungen.** Ob die diskutierten Gesetzesänderungen umgesetzt wurden, ist zu beobachten.

---

## Warum diese Infrastruktur geschätzt werden muss

Zurück zum Szenario des g0v-Ingenieurs, der das PDF öffnete.

Wenn man ihn fragt: „Warum machst du das am Wochenende? Die meisten Leute nutzen es doch sowieso nicht.“ – würde er nicht antworten: „Für die Demokratie“, oder „Für die Transparenz“, vielleicht auch nicht „Für die zivilgesellschaftliche Überwachung“.

Er würde antworten: „Weil diese Daten **sollten** so genutzt werden, aber im Moment nicht können.“

Das ist der Kern der Kultur der zivilgesellschaftlichen Ingenieure in Taiwan – es ist keine Revolution, kein Protest, sondern eine Ergänzung. Die Regierung hat 80 % der Arbeit erledigt; die Community ergänzt die verbleibenden 20 % an Nutzbarkeit, Erfassbarkeit und Analysierbarkeit.

Der Untersuchungsausschuss hat mit dem Gesetz über politische Spenden das Maximum geleistet – Daten empfangen, speichern, eine Einschnittsfläche bereitstellen. g0v erweitert die Schnittstelle des Untersuchungsausschusses – Visualisierung, Quervergleich verschiedener Datenquellen, API-Bereitstellung, Community-Dokumentation. Die Medien führen Recherchen durch, die über die g0v-Visualisierungen hinausgehen – sie graben die Geschichte hinter dem Netzwerkdiagramm aus. Wissenschaftler erstellen strukturelle Analysen der langfristig akkumulierten Daten – sie schreiben die Trends jeder Legislatur in wissenschaftliche Abhandlungen.

**Diese vier Ebenen arbeiten nicht isoliert, sondern sind Knotenpunkte derselben Kette.** Jede Ebene ergänzt das, was die andere nicht leisten kann. Fehlt eine Ebene, kann die nächste nicht existieren.

Am Wahltag der Neun-in-Eins-Wahl 2026 – von den 7.748 Dorfvorstehern bis zu den 6 Bürgermeisteren der Großstädte in ganz Taiwan – wenn das Wählen endet, wenn die Auszählung beendet ist, ob sie gewinnen oder verlieren – lenken alle den Blick ab. Aber diese Infrastruktur stoppt nicht. Das Meldesystem des Untersuchungsausschusses nimmt weiterhin die Rechnungsberichte aller Kandidaten entgegen; der g0v-Crawler sammelt neue Daten ein; eine neue Generation von Visualisierungen beginnt an einem Hackathon-Tisch zu entstehen.

**Die konkretste Form demokratischer Infrastruktur ist dieser Prozess ohne Helden, Tag für Tag, bei dem Daten nutzbar gemacht werden.**

Man öffnet den Browser, gibt die Adresse ein und sucht nach dem Namen des Kandidaten – hinter dieser Aktion stehen das Gesetz von 2004, die Plattform von 2008, der Hackathon von 2014, das Abkommen von 2017 und die fortlaufende Wartung im Jahr 2026.

Seit zwanzig Jahren ist ein unsichtbarer Geldfluss abfragbar gemacht worden.

🧬

---

## Weiterführende Lektüre

- [Open Source Community und g0v](/de/technology/open-source-and-g0v) – Wie funktioniert die zivilgesellschaftliche Hacker-Community und warum gibt es dieses Ökosystem in Taiwan?
- [Politik Hub](/politics) – Eine Gesamtansicht der demokratischen Infrastruktur.
- [Wahlen 2026 Neun-in-Eins](/politics/2026 九合一選舉) – Übersicht über das System und den Zeitplan der Wahlen 2026.
- [System der Nationalen Wahlkommission](/de/politics/central-election-commission) – Design und Betrieb der Nationalen Wahlkommission.
- [Was ist Neun-in-Eins?](/de/politics/nine-in-one-elections-explained) – Die neun Ämter, die neun Geschichten.

---

## Referenzen

[^1]: [Plattform zur Einsicht in politische Spenden des Untersuchungsausschusses](https://ardata.cy.gov.tw/) — – Der offizielle Zugangspunkt für Daten über politische Spenden des Untersuchungsausschusses, der frühere Meldungen von Kandidaten / Parteien / politischen Organisationen bereitstellt

[^2]: [Gesetzgebungsprozess des Gesetzes über politische Spenden](https://lis.ly.gov.tw/lglawc/lawsingle?00396B05E12200000000000000014000000004000000^03083093032600^00133001001) — – Die Suchmaschine für Rechtsdokumente des Gesetzgebers; verabschiedet am 26. März 2004

[^3]: [Gesetz über politische Spenden (Volltext)](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — – Nationale Datenbank der Gesetze des Ministeriums für Recht

[^4]: [Artikel 7 des Gesetzes über politische Spenden](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — – Offizielle Quelle zu Artikel 7 des Gesetzes über politische Spenden

[^5]: [Artikel 18 des Gesetzes über politische Spenden](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — – Beschränkungen der Höhe politischer Spenden. Die genauen Zahlen entsprechen der neuesten Version in der Rechtsdatenbank

[^6]: [Artikel 26 bis 31 des Gesetzes über politische Spenden](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — – Offizielle Quelle zu Artikel 26 bis 31 des Gesetzes über politische Spenden

[^7]: [Geschichte der Inbetriebnahme der Plattform für politische Spenden des Untersuchungsausschusses](https://ardata.cy.gov.tw/) — – Angaben auf der Seite zu wichtigen Änderungen

[^8]: [FEC: Federal Election Commission](https://www.fec.gov/) — – Offizielle Website der US-Bundeswahlkommission, bietet eine vollständige API für Kandidatenfinanzen

[^9]: [Japanisches Gesetz über politische Finanzmittel](https://www.soumu.go.jp/senkyo/seiji_s/) — – Die Webseite des Ministeriums für Inneres Japans zur politischen Finanzierung

[^10]: [National Election Commission Südkorea](https://www.nec.go.kr/) — – Die Nationale Wahlkommission in Korea

[^11]: [g0v Zero Hour](https://g0v.tw/) — – Die offizielle Website der zivilgesellschaftlichen Hacker-Community Taiwans

[^12]: [Projekt Wahlfinanzen von g0v](https://g0v-money-flow.github.io/elections/) — – Die Website des Projekts zur Visualisierung politischer Spenden

[^13]: [g0v councilor-voter-guide](https://github.com/g0v/councilor-voter-guide) — – Das GitHub-Repository für den Ratgeber der Abgeordneten

[^14]: [Sammlung von g0v Wahlprojekten](https://g0v.tw/projects) — – Eine Sammlung von Open-Source-Tools zur zivilgesellschaftlichen Überwachung politischer Spenden. Die genauen Projektbezeichnungen sind noch zu ergänzen

[^15]: [Erklärung der Datenfreigabe des Untersuchungsausschusses](https://ardata.cy.gov.tw/) — – Beschreibung zum Herunterladen und Freigeben von Daten auf der Plattform

[^16]: [Konferenzbeitrag der Taiwan Political Science Association](http://www.tpsahome.org.tw/) — – Akademische Diskussion über die Umgehung der Obergrenze durch verteilte Spenden; spezifische Fälle werden gemäß dem Prinzip „keine Nennung“ nicht zitiert

[^17]: [Artikel 41 des Gesetzes über Wahlen und Abberufung von Amtsträgern](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020010) — – Berechnungsmethode für die Höchstgrenze der Wahlkampfkosten

[^18]: [Gesetzgeber-System zur Integration von Anträgen](https://misq.ly.gov.tw/) — – Diskussionen über die Offenlegung der Finanzierung bei großen Abrufsaktionen im Jahr 2025; diese wurden noch nicht offiziell in die Tagesordnung aufgenommen

[^19]: [Mitteilungen der Nationalen Wahlkommission für Wahlen 2026 Neun-in-Eins](https://www.cec.gov.tw/) — – Die offizielle Website der Nationalen Wahlkommission

---

_Letztes Update: 27. Mai 2026 — Neuer Artikel in der Politics Hub Serie zur Neun-in-Eins-Wahl 2026._
_Autor: Taiwan.md 🧬_
