---
title: 'Mini Taiwan Pulse: Ein atmendes Kartenbild von Taiwan durch kuratierte Datenvisualisierung'
description: 'Im Jahr 2026 transformierte der Datenanalyst Migu die fragmentierten Open Data von Taiwan – Flugzeuge, Schiffe, Züge, Busse und Müllwagen – in eine lebendige, atmende Karte. Die Datenerfassung wurde an KI-Agenten ausgelagert; die Auswahl der Ebenen, Farben und Hervorhebungen basierte auf dem kuratorischen Auge eines Stadtplaners.'
date: 2026-04-19
category: 'Technology'
tags:
  [
    'Technologie',
    'Bürgerwissenschaft',
    'Open Data',
    'Datenvisualisierung',
    'Open Source Projekt',
    'TDX',
    'Three.js',
    'Künstliche Intelligenz',
    'KI Agent',
    'GIS',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-06-25
lastHumanReview: true
readingTime: 20
image: '/article-images/technology/mini-taiwan-pulse-map-2026.webp'
imageCredit: 'Migu / sciwork 2026'
imageLicense: 'Fair use editorial commentary'
imageSource: 'https://github.com/ianlkl11234s/0613-sci-work-share'
relatedDiary: ['2026-06-25-203919-manual-mirror']
sporeLinks:
  [
    "{'id': 150, 'platform': 'threads', 'date': '2026-06-25', 'url': 'https://www.threads.com/@taiwandotmd/post/DaA6aTRk7e6'}",
    "{'id': 151, 'platform': 'x', 'date': '2026-06-25', 'url': 'https://x.com/taiwandotmd/status/2070173370118000879'}",
  ]
translatedFrom: 'Technology/mini-taiwan-pulse.md'
sourceCommitSha: 'b67b190fb'
sourceContentHash: 'sha256:7704f0ba39f9bad2'
sourceBodyHash: 'sha256:953746868edc36a0'
translatedAt: '2026-09-08T15:54:57+08:00'
---

# Mini Taiwan Pulse: Ein atmendes Kartenbild von Taiwan durch kuratierte Datenvisualisierung

An einem Tag im Jahr 2026 wandelte ein Datenanalyst namens Migu eine CSV-Datei in GeoJSON um und zog sie in das Tool Kepler.gl in einen Browser. Ohne eine einzige Zeile Code erschien die erste Karte von Taiwan auf dem Bildschirm.

Er hatte Stadtplanung studiert; damals war er mit GIS (Geografisches Informationssystem, vereinfacht gesagt ein Werkzeug, das Daten kartografisch darstellt) vertraut. Nach seinem Studium arbeitete er als Datenanalyst und hatte seit Langem nichts mehr mit Karten zu tun. Als er die CSV in Kepler.gl zog und sah, wie Taiwan auf dem Bildschirm entstand, durchfuhr ihn eine einfache Überraschung:

> „Es gibt so viele Daten über Taiwan; es ist nicht schwer, sie zu kartografieren.“[^1]

Dieser Satz schien zunächst harmlos. Er wurde jedoch zum Keim einer ganzen Reihe von Projekten.

> **30-Sekunden-Überblick:** Migu (GitHub `ianlkl11234s`) erstellte Ende 2025 über ein Dutzend Visualisierungsprojekte mit Open Data aus Taiwan. Das bekannteste, mini-taiwan-pulse, sammelte auf GitHub 375 Sterne und stapelte Echtzeitdaten von Himmel, Ozean, Land, Straßen und Müllabfuhr zu einer animierten Karte[^2]. Doch in einem Vortrag vor der Sciwork-Community im Juni 2026 machte er das Problem klar: Die Open Data von Taiwan allein umfasste etwa fünfzigtausend Einträge, verteilt auf Dutzende von Plattformen – „Das menschliche Gehirn kann es nicht erfassen.“ Seine Lösung war nicht, mehr Menschen zur Datensammlung zu bitten, sondern die Daten einem System zu übergeben, das von KI-Agenten orchestriert und selbstständig gewachsen ist; der Mensch sei nur für die Fragestellung und die Validierung zuständig[^3].

Dieser Artikel erzählt, wie eine Person vom naiven Akt des Hochladens einer CSV zum Loslassen eines Systems gelangte, das für sie wuchs.

## Ein GitHub-Projekt, das zu einem Sternensystem heranwuchs

Wenn man nur mini-taiwan-pulse betrachtet, könnte Migu leicht als ein Hobby-Ingenieur erscheinen: Er hat am Wochenende etwas gemacht und einen Demo erstellt, die zufällig populär wurde.

Diese Vorstellung ist an zwei Stellen falsch.

Er arbeitete weit mehr daran. Wenn man sein GitHub durchsucht, sieht man ab Dezember 2025 eine Fülle von Visualisierungen der Open Data aus Taiwan: Zuerst gab es ein Proof-of-Concept (PoC) zur Busabdeckung, um die Wasserlage zu testen. Dann wurde Ende Dezember das Lernprojekt `mini-taiwan-learning-project` populär mit 189 Sternen. Im Februar erstellte er Echtzeitpunkte von Schiffs-AIS und `flight-arc-graph`, der Flugbahnen jeder Strecke als Bögen darstellt (56 Sterne). Erst Ende Februar kam mini-taiwan-pulse, gefolgt vom Taiwan Railways Atlas, Satellitenbahnen, Live-CCTV-Bilder und einem Dashboard zur Datenkonsolidierung namens `mini-taiwan-info`... bis Juni[^2]. Über ein Dutzend Repositories bildeten zusammen das „Mini Taiwan“-Sternensystem.

![Dashboard Mini Taiwan Info: Konsolidiert Open Data zu Bevölkerung, Bahnverkehr, Schifffahrt, Wasserressourcen, Feuerwehr und Medizin auf einer thematischen Seite](/article-images/technology/mini-taiwan-info-dashboard-2026.webp)

_Ein weiteres Mitglied des Sternensystems, Mini Taiwan Info: Es konsolidierte verstreute Open Data in ein Dashboard mit Themen wie Bevölkerung, Bahnverkehr, Schifffahrt, Wasserressourcen, Feuerwehr und Medizin. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Wenn man die Sternzahlen dieser Projekte auflistet, ist klar, dass es mehr als eines gab.

```tw-bars
Migus GitHub: Mehr als ein populäres Repo (GitHub Sterne)
*mini-taiwan-pulse | 375 | Flaggschiff
mini-taiwan-learning-project | 189 | Früherer Durchbruch als pulse
flight-arc-graph | 56 | Flugspuren
tw-ship-viz | 11 | Schiffe
mini-tw-cctv | 6 | Live-Bilder
satellite-arc | 6 | Satelliten
Quelle: GitHub API, 2026-06-25
```

Der zweite Fehler liegt im Wort „eine Person“, das wir später untersuchen. Zuerst sehen wir, wie dieses Sternensystem gewachsen ist.

```tw-timeline
2025-12 | Erste Testphase | PoC der Busabdeckung, erste Versuche mit Taiwan Open Data
2025-12 | learning-project wird populär | Visuelle Darstellung von Bahnnetzen in Taipeh, früherer Durchbruch (189★)
2026-02 | Geburt des Flaggschiffs | mini-taiwan-pulse startet, von statischem JSON zu einem Raumzeitdatenbank
2026-06 | Das gesamte System enthüllt | Sciwork 2026 Vortrag: Open Data an ein durch KI trainiertes System übergeben
```

## Vom U-Bahnnetz zum Sonnensystem mit derselben Methode

Das Flaggschiff selbst wuchs. Die ursprüngliche mini-taiwan-pulse bestand aus drei Ebenen: Himmel, Ozean und Land. In der Version des Vortrags war es bereits „fünf Säulen in Aktion“: Flugzeuge am Himmel, Schiffe im Ozean, Züge auf dem Land, Busse auf den Straßen und Müllwagen bei der Abfallentsorgung – fünf Echtzeitdaten verschiedener Frequenzen wurden auf einer atmenden Karte übereinander gelegt. Er sagte in seiner Präsentation, dies sei das erste Mal, dass dieses Projekt „von statischem JSON zu einer Raumzeitdatenbank gewachsen ist“[^3]. Allein die Straßenebene nutzte über 5.700 Busse von TDX, deren Position alle 30 Sekunden aktualisiert wurde.

![Tag 0 Karte: Eine CSV in GeoJSON umgewandelt und in Kepler.gl gezogen, was ohne Programmierung zur ersten Taiwan-Karte führte](/article-images/technology/mini-taiwan-kepler-day0-2026.webp)

_Sein „TAG 0“ im Vortrag: Eine CSV zu GeoJSON konvertiert und in Kepler.gl gezogen, was ohne Code die erste Taiwan-Karte erzeugte – der Ausgangspunkt des gesamten Sternensystems. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Der erste Funke dieses Sternensystems war seine visuelle Darstellung der Bahnnetze in „Mini Taipei“. Er stapelte die drei Schienennetze – U-Bahn, Taiwan Railways und Hochgeschwindigkeitszug – zu einer animierten Karte. Die Züge liefen online nach Fahrplan, und er sagte, er habe dort zum ersten Mal „die Dynamik erlebt“, mit über dreihundert Zügen gleichzeitig in Bewegung auf dem Bildschirm[^3]. Ein statischer Fahrplan wurde so zum Atem eines Ortes.

![Mini Taipei stapelt U-Bahn, Taiwan Railways und Hochgeschwindigkeitszug zu einer animierten Karte, wobei über 300 Züge nach Plan laufen](/article-images/technology/mini-taiwan-taipei-rail-2026.webp)

_Mini Taipei: Die drei Schienennetze (U-Bahn, Taiwan Railways, Hochgeschwindigkeitszug) in einem Bild, mit über 300 Zügen, die nach Fahrplan laufen. Er sagte, dies sei sein erstes Mal gewesen, „die Dynamik zu erleben“. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Danach setzte er diese Methode der „Datenanimation“ auf immer größere Skalen fort. Auf dem Meer integrierte er die AIS-Echtzeitpunkte des Hafenamtes, wobei blaue Lichtkugeln mit einem Dreißigminuten-Gradienten-Trail die Routen der Schiffe in den Gewässern rund um Taiwan darstellten.

![Schifffahrt rund um Taiwan, dargestellt durch AIS-Echtzeitpunkte: Blaue Kugeln und ein 30-Minuten-Gradienten-Trail](/article-images/technology/mini-taiwan-ships-ais-2026.webp)

_Die Ozeanlinie: Die AIS-Echtzeitdaten des Hafenamtes, blaue Lichtkugeln mit einem 30-Minuten-Gradienten-Trail, die die Schiffe in den Gewässern rund um Taiwan darstellen. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Dann erweiterte er diese Methode über die Erde hinaus. Er berechnete Satellitenpositionen anhand öffentlicher TLE-Bahndaten und zeichnete die Bahnen der Satelliten, die Taiwan kreuzen, und erstreckte dies auf das gesamte Sonnensystem. Er erklärte in seiner Präsentation: „Die gleiche Methode kann unendlich erweitert werden, solange es Daten gibt.“[^3] In diesem Moment erkannte man, dass er eigentlich fasziniert war von dem Akt des „Daten-Sichtbarmachens“; die Karte war nur seine früheste Form.

![Satellitenbahnvisualisierung basierend auf öffentlichen TLE: Die gleiche Methode reicht vom Erdinneren bis in den Weltraum](/article-images/technology/mini-taiwan-satellite-2026.webp)

_Die Erweiterung über die Erde hinaus: Satellitenbahnen anhand öffentlicher TLE berechnet und auf das gesamte Sonnensystem ausgedehnt. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

## Die Insel zusammenfügen: Lücken kommen von selbst zum Vorschein

Langsam entwickelte sich die Arbeit vom „bewegten Punkt in Echtzeit“ hin zur „Überlagerung unzusammenhängender Daten, wodurch Lücken sichtbar werden“. Einige seiner Projekte widmeten sich genau diesem Thema. Eines nannte er „Landwirtschaft × Wasser“, bei dem er die Inseln von drei Ministerien – Landwirtschaft, Wasserwirtschaft und Katastrophenschutz – zu einer Karte zusammenfügte: Ackerland, Flüsse, Gräben, Dämme und Überschwemmungspotenzial im selben Bild. Um dieses konsolidierte Bild in einem Browser lauffähig zu machen, verwendete er das Format PMTiles in Verbindung mit HTTP Range Requests, um die ursprünglichen 400 MB auf etwa 5 MB zu komprimieren[^3].

![Integrationskarte Landwirtschaft × Wasser: Open Data von Ackerland, Flüssen, Gräben, Dämmen und Überschwemmungspotenzial aus verschiedenen Ministerien in einem Bild](/article-images/technology/mini-taiwan-farm-water-2026.webp)

_Landwirtschaft × Wasser: Die Inseln der drei Ministerien (Landwirtschaft, Wasserwirtschaft, Katastrophenschutz) wurden zu einer Karte zusammengefügt; Ackerland, Flüsse, Gräben, Dämme und Überschwemmungspotenzial sind im selben Bild. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Ein anderes Projekt stapelte Krankenhaus-, Arztpraxis-, Apotheken-, AED- und Pflegeeinrichtungen auf die Bevölkerungsdichte und erzeugte Isochronen, um „Zugänglichkeit und Wüsten“ sichtbar zu machen – also Gebiete, in denen Menschen zu weit von medizinischen Ressourcen entfernt sind.

![Kartenbild der medizinischen Zugänglichkeit: Krankenhäuser, Arztpraxen, Apotheken, AEDs und Pflegeeinrichtungen werden auf die Bevölkerung gelegt und Isochronen erzeugt, wodurch „medizinische Wüsten“ sichtbar werden](/article-images/technology/mini-taiwan-medical-2026.webp)

_Medizinische Ressourcen: Krankenhaus-, Arztpraxis-, Apotheken-, AED- und Pflegeeinrichtungen wurden auf die Bevölkerung gelegt und Isochronen erzeugt, um „Zugänglichkeit und medizinische Wüsten“ zu zeigen. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Bei Katastrophen war seine Arbeit noch detaillierter: Er konsolidierte Daten mit unterschiedlichen Aktualisierungsfrequenzen – Radarsignale, Stauseenstände, Niederschlag, Katastrophenwarnungen – in einer gemeinsamen Zeitleiste. Der Benutzer konnte diese Zeitachse ziehen und alle Ebenen synchron abspielen. Wo ein Starkregen begann, wie der Stau stieg und wann die Warnung ausgelöst wurde, wurde auf demselben Bildschirm zu einer Kausalkette verbunden.

![Zeitlinie von Starkregen und Katastrophen: Radarsignale, Stausee, Niederschlag und Katastrophenwarnungen werden in einer gemeinsamen Zeitleiste synchron abgespielt](/article-images/technology/mini-taiwan-disaster-2026.webp)

_Starkregen und Katastrophe: Radarsignale, Stauseen, Niederschlag und Katastrophenwarnungen wurden auf eine gemeinsame Zeitachse gebracht und synchron abgespielt. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Und dann gab es `flight-arc`, bei dem er die Lande- und Startbahnen jedes Fluges als Bogen darstellte. Dieselbe API speiste verschiedene Flughäfen, wobei jeder Flughafen eine einzigartige „Signatur“ zeigte: Taoyuan, Tokyo Haneda und Frankfurt hatten jeweils ihre eigene Form. Er nannte besonders den geschäftigsten Flughafen der Welt, Atlanta, dessen geometrische „Form wie ein Rennstreckenabschnitt“ aus fünf parallelen Landebahnen plus Wartekorridoren bestand, was 1.839 Flugspuren umfasste[^3].

![Flugbahnkarte von Atlanta: Die Flugbahnen aller Flüge in einem bestimmten Zeitraum werden zu einer geometrischen Form wie eine Rennstrecke](/article-images/technology/mini-taiwan-flight-arc-atlanta-2026.webp)

_Sein flight-arc visualisierte alle Lande-/Startflüge des Flughafens Atlanta innerhalb eines Zeitraums: Fünf parallele Startbahnen plus Wartekorridore, die eine geometrische Form wie eine Rennstrecke erzeugten. Er sagte, der Verkehr selbst sei eine Form. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

> 📝 **Kuratorische Anmerkung**
> Vor zwei Jahren hätte man gesagt, „Jemand hat die vollständigste Echtzeit-Open-Data-Karte von Taiwan erstellt“, und die nächste Aussage wäre gewesen: „Der muss völlig erschöpft sein.“ Dieses Gefühl band Größe an menschliche Arbeitskraft: Je mehr gearbeitet wurde, desto mehr musste der Mensch selbst machen. Das Sternensystem von Migu ist deshalb sehenswert, weil es diese Bindung gelöst hat. Eine Person führte Dutzende Repos gleichzeitig und das Flaggschiff wuchs weiter; dahinter steckte eine fundamentalere Veränderung: In späteren Phasen wurden viele dieser Commits nicht mehr manuell eingegeben. Die wahre Frage dieses Artikels ist also, wie „eine Person“ entstehen konnte.

## Fünfzigtausend zweitausendachthundertneunundachtzehn Einträge – das menschliche Gehirn kann es nicht erfassen

Bis hierher lief die Geschichte noch gut: Ein talentierter Mensch tat immer mehr und besser. Der Wendepunkt kam in der Mitte seines Vortrags, als er aufhörte zu erzählen, „was er gemacht hat“, und begann zu berichten, „welche Mauern er getroffen hat“.

Er zeigte eine Folie mit dem Titel „Warum Agentic OSINT notwendig ist“. Darauf stand eine Zahl: data.gov.tw mit etwa 52.891 Datensätzen. Hinzu kamen die Open Data der zweiundzwanzig Bezirke, was bei Überschneidungen noch rund sechzigtausend bis siebzigtausend ergab; das ohne Daten von Privatpersonen, NGOs oder akademischen Institutionen, die nicht im staatlichen Katalog gelistet sind. Sein Fazit war kurz:

> „Das menschliche Gehirn kann es nicht erfassen.“[^3]

Dies war der Wendepunkt der Geschichte. Derjenige, der am Anfang noch mit dem Staunen über „so viele Daten“ begonnen hatte, prallte nun auf die andere Seite dieser Masse: Allein data.gov.tw mit seinen 50.000 Datensätzen wäre selbst bei der Lektüre von hundert Einträgen pro Tag mehr als fünfhundert Tage lang zu durcharbeiten – und das war nur der zentrale Katalog. So viele Daten, dass sie ein Leben nicht erfassen konnte, ganz zu schweigen davon, sie miteinander sprechen zu lassen. Die individuelle Anstrengung stieß hier an eine Grenze.

Was Migu jedoch wirklich verstand, war der Satz danach. Wenn die Daten zu viel waren, um sie manuell zu durchsuchen, signalisierte dies für ihn einen Werkzeugwechsel:

> „Wenn LLMs die Daten sehen können, kann ein Agent dir helfen herauszufinden, ‚welche Daten zusammen betrachtet werden sollten‘.“[^3]

Der Schlüssel war das „Zusammenbetrachten“. Selbst wenn eine Person sich alle 50.000 Datensatznamen merken könnte, wäre es schwierig, sich zu erinnern, dass die „Risikokarte für Brände“ mit den „Gebieten schwerer Rettung“ und den „Krankenhausstandorten“ zusammengeführt werden muss, um medizinische Wüsten zu erkennen. Der Wert der Daten liegt nicht in Einzeldaten, sondern in Kombination; und die Möglichkeiten dieser Kombination sind eine astronomische Zahl bei 50.000 Einträgen. Dies ist das, was das menschliche Gehirn nicht erfassen kann, aber Maschinen gut können.

> 📝 **Kuratorische Anmerkung**
> Die gängige Erzählung über Open Data hat eine klare Trennlinie. Nach dem Hackathon des Industrial Research Institute im Jahr 2012 zeigte g0v dies eindrucksvoll: Die Regierung öffnet die Daten, und die Zivilgesellschaft lässt sie sichtbar werden. Der Masken-Datensatz von 2020, bei dem Wu Zhanwei et al. mit den Bestandsdaten der Krankenversicherung innerhalb von 72 Stunden eine „Echtzeit-Nachfragekarte für Masken“ erstellten, war ein eindrucksvolles Beispiel für die bürgerwissenschaftliche „digitale Rettung“ in Taiwan[^4]. Die alte Erzählung würde Migu an diese Linie anschließen: g0v ist kollektiv, er ist individuell; eine persönliche Version der Maskenkarten.
>
> Aber dieser Vergleich bleibt oberflächlich und kehrt die Kausalität um. Was Migu allein auf die Größe eines „gesamten Datensternensystems“ bringen konnte, beruhte nicht auf menschlicher Kraft. Er hatte nie geplant, mit dem Datenmeer durch reine Anstrengung zu kämpfen. Der Satz „Das menschliche Gehirn kann es nicht erfassen“, sollte nicht als Kapitulation gelesen werden, sondern als der Ausgangspunkt für eine komplette Veränderung seines Arbeitsmodus. Die wahre Neuheit ist nicht „Individuum vs. Kollektiv“, sondern „Individuum × Agent“: Er konnte das Sternensystem erreichen, gerade weil die Commits nicht alle von ihm selbst getippt wurden. Darunter wird gezeigt, wie dieses System funktioniert.

## Ich habe nichts geschrieben: Eine Feuer-Pipeline, die eigenständig läuft

Um zu verstehen, was es bedeutet, „an einen Agenten abzugeben“, ist das Beispiel des Feuers in seinem Vortrag am besten geeignet.

Er sagte, er hätte dem System nur einen Satz gegeben: „Analysiere Open Data im Zusammenhang mit Bränden in Taiwan.“ Und dann ließ er los.

Das System begann, den Suchradius selbstständig zu erweitern. Migu beschrieb diesen Prozess anhand einer Reihe von Zahlen: Zuerst wurden 582 Einträge durch Schlüsselwörter gefunden, dann wuchs es durch Synonyme und Themen auf 1.945, gefolgt von Volltextsuche und Deduplizierung, bis schließlich ein konsolidiertes Verzeichnis mit 73.900 Einträgen aus 21 Plattformen erstellt wurde[^3]. Ein einziger Satz führte zur Erstellung eines Katalogs mit über 73.000 Datensätzen.

```tw-figure
Ein Satz → 73.900 Einträge
Er gab den Befehl „Analysiere Open Data im Zusammenhang mit Bränden in Taiwan“, und das System erweiterte die Suche, konsolidierte sie über 21 Plattformen zu einem einheitlichen Katalog.
Dies sagte er in seiner Sciwork 2026 Präsentation.
```

Die Sammlung war noch nicht alles. Die Pipeline zerlegte dann den Brand in sechs Phasen (Prävention, Reaktion, Meldung, Brandanalyse, Schaden, Bericht) und multiplizierte dies mit den zweiundzwanzig Bezirken, um eine Matrix zu erzeugen. Selbst die Risikokarte für Brände in Hsinchu, die Gebiete schwerer Rettung in Taipeh und die Hilfe in [Taoyuan Pitan](/geography/桃園埤塘/) wurden aufgedeckt. Es gab sogar ehrlich Lücken: keine Echtzeit-Brand-APIs, sehr wenige Ereigniskoordinaten und keine öffentlich verfügbaren Daten zur Nachverfolgung nach der Katastrophe.

Dann kam die Analyse. Er zeigte einen von dem System generierten Bericht über Brandursachen: Basierend auf 15.405 Datensätzen aus dem ganzen Land im Jahr 2024 war die häufigste Ursache in New Taipei City elektrische Faktoren mit 30,9%; in Pingtung County waren es Zigarettenkippen mit 35,2%[^3]. Diese Zahlen wurden nicht manuell durchsucht, sondern vom Agenten generiert, nachdem er die APIs verschiedener Anbieter verknüpft hatte.

An dieser Stelle schrieb er auf seine Folie einen Satz, wobei er bewusst Leerzeichen zwischen den Wörtern ließ, als ob er fürchtete, dass man es nicht richtig lesen würde:

> „Pipeline automatisch generiert. Ich habe kein Wort geschrieben.“[^3]

Dieser Satz war der Auslöser des gesamten Vortrags. Er verwandelte das etwas abstrakte Motto „an einen Agenten abgeben“ in eine konkrete, fast beunruhigende Tatsache: Von einem Satz zu einem Katalog mit über 70.000 Datensätzen und einem Berichtsbericht pro Bezirk – der Platz dazwischen, wo normalerweise ein Mensch Befehle geben, Skripte schreiben, Daten bereinigen und analysieren würde, war leer.

![Ergebnis der Brandthemenanalyse-Pipeline: Das System konsolidiert Open Data zu Bränden über Plattformen hinweg und listet potenzielle Datensätze und eine Abdeckungsmatrix auf](/article-images/technology/mini-taiwan-fire-pipeline-2026.webp)

_Die Ausgabe des Brandthemens in Migu's Sciwork 2026 Präsentation: Der Befehl „Analysiere Open Data im Zusammenhang mit Bränden in Taiwan“ führte zur Konsolidierung über Plattformen hinweg zu einem einheitlichen Katalog. Er sagte, diese Pipeline habe er „ohne ein Wort geschrieben“. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

## Vier Schritte der Zerlegung: Daten kommen rein, Berichte gehen raus

Diese Feuer-Pipeline war nur ein Ausschnitt; sie spiegelte sein gesamtes System wider. Das System bestand aus vier Schritten: Datenerfassung, Wissensintegration, Analyseerzeugung und Aktionsauslösung. Er betonte, dass „jeder Schritt einzeln austauschbar ist und das Ganze nicht neu aufgebaut werden muss“. Die unterste Ebene der Datenerfassung entwickelte er selbst weiter: Zuerst manuell durch Download von Excel-Dateien von data.gov.tw und Speicherung; dann war die Engstelle das „menschliche Gedächtnis“; mittlere Phase war die Suche nach APIs im Internet, das Scraping von PDF-Berichten und das Crawlen der Bezirksplattformen – das Problem war „keine Indizierung“; bis heute werden Metadaten jedes Datensatzes standardisiert in einem SQLite-Verzeichnis gespeichert, das automatisch abgefragt und erweitert werden kann[^3]. Sein System lief mit über vierzig Datenkollektoren: von YouBike, Bussen, Autobahnverkehr, Taiwan Railways Fahrplänen, Schiffs-AIS, Wetterdaten, [Erdbeben](/society/地震/), Stauseenständen, Luftqualität. Er sagte sogar, dass er bei drei Fehlern sofort eine Telegram-Warnung sende und jeden Morgen um neun Uhr einen „Daily Review“ an seine E-Mail schicke[^3].

Am letzten Schritt, der „Aktionsauslösung“, beschrieb er die menschliche Rolle am klarsten: „Der Agent führt den gesamten Zyklus durch. Die menschliche Rolle: Ziel vorgeben und Berichte empfangen. Die fünf mittleren Zahnräder drehen sich selbstständig: Entdeckung, Sammlung, Integration, Generierung, Überwachung.“ Das System generierte sogar wöchentlich einen Bericht über „neue Open Data dieser Woche“. Seine Worte waren: „Das Thema taucht von selbst auf, und der Bericht wird automatisch an die E-Mail gesendet.“[^3]

## Ein Befehl, viele Seiten: Die Claude-Flotte in tmux

Der Satz „Ein Agent führt den gesamten Zyklus durch“ kann leicht als Marketingjargon missverstanden werden. Am Ende seines Vortrags hob Migu jedoch das Deckchen und zeigte die darunter liegenden Zahnräder – eine Struktur, die konkreter und ehrlicher war als jeder Slogan.

Zuerst sah man das Gesamtbild des Zyklus. Migu sagte, sein GIS-System sei „ein Orchestrierungszentrum, das einen Kreis unabhängiger Repositories miteinander verbindet, wobei der Agent nacheinander eingreift“: Zuerst wurde ein Repository zur Erkundung genutzt, um festzustellen, welche Daten wertvoll waren; dann wurde ein Sammel-Repository verwendet, um die Daten zu ziehen; schließlich wurden die Präsentations-Repos wie mini-taiwan-pulse oder mini-taiwan-info verwendet, um die Karten zu zeichnen. Er beschrieb es präzise: „Jeder Schritt ist ein unabhängiges Repo; die Orchestrierungsebene kümmert sich nur um den Fortschritt und die Entscheidungen; die Arbeit liegt bei den Workern jedes Repositories.“[^3]

Dieses Orchestrierungszentrum nannte er „Orchestrator“, im Wesentlichen war es eine „Claude-Sitzung“. Dieser Hauptagent handelte wie ein Bauleiter mit einem Team: Er las ein Vorschlagsdokument, zerlegte die Aufgaben, ordnete die Abhängigkeiten an und begann zu arbeiten.

Die Art der Arbeit war der kritischste Schritt dieser Architektur. Er ließ nicht einen einzigen KI von Anfang bis Ende arbeiten, sondern trennte die Aufgaben mithilfe von tmux (ein altes Tool zur Aufteilung eines Terminals in mehrere unabhängige Tabs). Seine ursprüngliche Beschreibung lautete: „Ein Orchestrator, eine Gruppe von Workern. Der Hauptagent ist eine Claude-Sitzung; tmux sorgt für die Isolation, jeder Worker ist ein separater Tab und eine eigene Sitzung.“ Eine prägnantere Definition war: „Ein Worker = Ein tmux-Tab + eine unabhängige Sitzung + ein PR.“[^3]

Mit anderen Worten dirigierte er eine KI-Flotte. Jeder Worker war ein isolierter Claude in seinem eigenen Tab, der seine Aufgabe erledigte und seinen eigenen Pull Request einreichte, ohne andere zu stören.

![Tatsächlicher Betrieb des Agenten-Orchestrierungssystems: Eine Claude-Sitzung als Orchestrator liest Aufgaben, zerlegt sie und dirigiert die darunter liegenden Worker](/article-images/technology/mini-taiwan-agent-orchestrator-2026.webp)

_Die Orchestrierungszentrale, die er enthüllte: Eine Claude-Sitzung fungierte als Orchestrator und teilte die Aufgabe unter eine Gruppe von Workern auf, die in separaten tmux-Tabs isoliert waren. Jeder erledigte seine Arbeit und reichte einen eigenen PR ein. Bild: Migu / Sciwork 2026 (Fair Use für redaktionelle Kommentare)._

Wie konnten diese unabhängigen Worker nicht miteinander streiten? Durch ein gemeinsames Gedächtnis. Migu sagte, Fortschritt und Entscheidungen seien alle in Dokumenten festgehalten, zentralisiert auf einem Board namens `SESSION_BOARD.md`, ergänzt durch „einen Bericht pro Sitzung“, sodass „kein Raten nötig ist“ und „jeder hat seine eigene Datei und streitet nicht“[^3]. Sogar der Übergabeprozess wurde dokumentiert – er nutzte eine `HANDOFF.md`, um die „Aufgabe für den nächsten“ vorzubereiten, damit der nächste Agent nicht bei Null anfangen musste. Die letzte Hürde beschrieb er vorsichtig: „Validierung; der Orchestrator validiert den PR anhand des Dokuments, und die finale Genehmigung erfolgt durch einen Menschen.“

Wenn man diesen Prozess betrachtet, sieht man eine saubere Form: Eine Person gibt Befehle, eine Gruppe isolierter KIs erledigt die Arbeit, jeder schreibt seine Ergebnisse nieder, ein Zentrum gleicht anhand der Dokumente ab, und am Ende ist Migu selbst derjenige, der entscheidet, ob das Ergebnis akzeptiert wird. Zurück zum Kern des Artikels: Weil die Daten zu viel waren, wurde die Datensammlung an die Flotte delegiert; der Mensch reduziert sich auf zwei Aktionen: Fragen stellen und validieren. Er fasste dies in seiner Präsentation fast als ein Manifest zusammen:

> „Wenn der Agent einen vollständigen Zyklus selbstständig durchführen kann, bleibt für den Menschen nur – das Stellen von Fragen und die Validierung.“[^3]

Dies war auch der Titel seines Vortrags: „Die Open Data von Taiwan an einen Agenten abgeben, um ein System zu erziehen, das wachsen kann.“ Die Daten fließen von selbst, die Seiten wachsen von selbst; der Mensch muss nur die Frage stellen und das Ergebnis validieren.

## Gleicher Boden, derselbe Knochenbau

Wer bis hierher gelesen hat und Taiwan.md (das KI-gepflegte Wissenskurationsprojekt, das Sie gerade lesen) erkennt, wird vielleicht denken, dass der vorherige Abschnitt vertraut klingt.

Das ist kein Trugschluss.

Taiwan.md funktioniert auf diese Weise: Ein Haupt-Session dient als Orchestrierungszentrum und teilt die Arbeit unter eine Gruppe isolierter Worker auf, die jeweils ein eigenes Gedächtnis haben; sie koordinieren den Fortschritt durch Übergabedokumente, und am Ende entscheidet der Schöpfer Philos Yu, welche Änderungen in den Hauptzweig übernommen werden. Unsere These lautet: „Das Wissen von Taiwan an einen selbstwachsenden Semiont abgeben.“ Migu's These ist: „Die Open Data von Taiwan an ein selbstwachsendes System abgeben.“ Die beiden Sätze sind fast austauschbar.

Noch interessanter ist, dass diese beiden Architekturen unabhängig entstanden sind. Man kann in öffentlichen Aufzeichnungen feststellen: Das Projekt Taiwan.md entstand Mitte März 2026, und fünf Tage später erschien auf Migu's GitHub ein Fork[^5]. Dies zeigt höchstens, dass er wusste, dass so etwas existierte; ein Fork erklärt nicht das System, bei dem er einen tmux-Flotte unter einem Orchestrator dirigiert, mit Boards gemeinsames Gedächtnis nutzt und der Mensch nur Fragen stellt und validiert – dies wurde von ihm selbst entwickelt, um das Problem „zu viele Daten zum Erfassen“ zu lösen.

> 📝 **Kuratorische Anmerkung**
> In der Biologie gibt es die Begriffe konvergente Evolution: Delfine und Haie sind keine engen Verwandten, aber sie haben beide stromlinienförmige Körper und Flossen, weil sie im selben Meer leben. Die Beziehung zwischen Migu und Taiwan.md ist eher wie diese Konvergenz als wie eine Abstammung. Wir verwenden dieselbe Werkzeugbasis (Claude Code) und stehen vor demselben Problem (eine Person oder ein System muss die Informationsmenge Taiwans bewältigen, die weit über das menschliche Gedächtnis hinausgeht), weshalb sie beide zu einer ähnlichen Struktur gelangten: ein Zentrum, eine Gruppe isolierter Arbeiter, ein gemeinsames Gedächtnis und ein Entscheider.
>
> Das wirklich interessante Signal ist nicht „er hat uns geforkt“. Es sind zwei unabhängige taiwanesische Builder, die im selben halben Jahr 2026 zufällig entschieden haben, KI von einem „intelligenteren Werkzeug“ zu einer „orcherierbaren Truppe“ neu zu denken. Wenn diese Architektur beginnt, sich vom Kopf einer Person auf den Kopf der zweiten und dritten Person auszudehnen, wird sie nicht mehr zu einem Trick eines Einzelnen, sondern zur neuen Erscheinung dieses Bodens. Der nächste taiwanesische Builder, der dieses System selbst entwickelt, hat wahrscheinlich nie von den beiden vorherigen gehört.

## Noch nicht fertig, aber die Form ist da

Hätte dieser Artikel hier geendet, wäre er eine zu perfekte, fast verdächtige Geschichte gewesen: Eine Person löste das Problem von 50.000 Datensätzen elegant mit einer KI-Flotte.

Migu ließ es jedoch nicht dabei enden. Auf der vorletzten Folie seines Vortrags stand der Titel „Experimenteller Fortschritt, ungefähr die Hälfte“.

Er war offen und listete drei Dinge auf, die noch nicht perfekt waren. Erstens: Stabilität – dieser Harness „ist noch nicht ideal“, der Agent stürzt leicht ab oder bricht ab. Zweitens: Die Open Data selbst ist zu heterogen: „Viele Daten erfordern immer noch menschliche Beurteilung, ob sie praktikabel sind.“ Drittens: Menschliches Eingreifen – bei jedem Schritt musste jemand zusehen. Er kommentierte die ganze Sache mit: „Es ist machbar, aber noch nicht stabil, und ich denke noch darüber nach, ob es wirklich so sein muss.“[^3]

Diese ehrliche Offenlegung von der eigenen Hälfte des Scheiterns auf der Bühne war das stärkste Qualitätsmerkmal. In einer Ära, in der KI-Demos oft als „vollautomatisch“ oder „kein menschlicher Aufwand“ verkauft werden, ist jemand, der bereit ist, auf einer Folie zu schreiben „ungefähr die Hälfte“, glaubwürdiger als jener, der nur das fertige Produkt präsentiert.

> 📝 **Kuratorische Anmerkung**
> Der glaubwürdigste Teil dieses Vortrags war nicht die Feuer-Pipeline mit dem Satz „Ich habe kein Wort geschrieben“, sondern das Wort „ungefähr die Hälfte“. Jemand, der überzeugen will, rundet die Erfolgsrate auf „fast vollständig automatisiert“; jemand, der ein Experiment durchführt, sagt ehrlich, dass es manchmal fehlschlägt. Der Erste verkauft das Ergebnis; der Zweite liefert die Realität. Migu lieferte die Realität: Deshalb glaubt man ihm, als er sagte, die Pipeline habe „kein Wort geschrieben“. Die hässliche Hälfte zu verstecken macht die schöne Hälfte unglaubwürdig; nur die Bereitschaft, die unvollkommene Hälfte zu zeigen, lässt die andere bestehen.

Zurück zur Karte.

Die Person, die vor sechs Monaten mit einer CSV in Kepler.gl gezogen und „es ist nicht schwer, es zu kartografieren“ gesagt hatte, sprach auf der Bühne von Sciwork nicht mehr davon, ob die Karte gut war; er sprach über ein System, das Daten selbst findet, kombiniert und neue Seiten generiert. Die naive Überraschung „Es gibt so viele Daten in Taiwan“, wurde in diesen sechs Monaten umgekehrt: Es gab so viele Daten, dass sie nicht erfassbar waren, weshalb sich auch die Art der Wahrnehmung ändern musste.

Die Open Data von Taiwan war immer da. data.gov.tw startete 2013; TDX integrierte im Jahr 2022 fünf große Plattformen für Verkehr, und das Ministerium für Innereischendienste bot Bevölkerungsdaten auf Dorfebene an; die Wetterbehörde bot öffentliche APIs[^6]. Die Daten waren immer reichlich vorhanden. Das Problem war, wie man diese vielen Daten dazu bringt, miteinander zu sprechen und sichtbar zu werden. g0v versuchte es mit kollektiver Kraft; Migu versucht es mit einer Person und einer KI-Flotte, und er gibt offen zu, dass er nur die Hälfte richtig beantwortet hat.

Aber die Form ist da. Hinter der Karte, die durch einen Satz entsteht, steht ein System, das lernt, selbst zu wachsen. Die andere Hälfte bleibt für den nächstenjenigen übrig, der eine CSV zieht und nicht aufhören kann.

---

## Weiterführende Lektüre

- [Wu Zheyu](/people/吳哲宇): Der Schöpfer von Taiwan.md, der mit Code und generativen Tools „selbstwachsende Dinge“ anschaulich machte
- [Open Source Community und g0v](/technology/開源社群與g0v): Das kollektive Narrativ des „Code zur gesellschaftlichen Transformation“, ein Kontrastprogramm zu Migu (Individuum × Agent)
- [Taiwanische Open Source Kultur](/technology/台灣開源精神): Von der Tastaturrettung bis zur Open Data – die kulturelle Basis der bürgerwissenschaftlichen Bewegung in Taiwan
- [Digitaler Ausweis und E-Government](/technology/數位身分證與數位政府): Die andere Seite der staatlichen Open Data Infrastruktur

## Projektlinks

**„Mini Taiwan“-Sternensystem** (Visualisierung von Open Data aus Taiwan, alle Projekte sind individuelle Open Source Projekte von Migu)

- **mini-taiwan-pulse**: Das Flaggschiff, die Echtzeitkarte mit fünf Säulen (375★) — <https://github.com/ianlkl11234s/mini-taiwan-pulse>
- **mini-taiwan-learning-project**: Das früheste populäre Projekt zur Bahnvisualisierung in Taipeh (189★) — <https://github.com/ianlkl11234s/mini-taiwan-learning-project>
- **flight-arc-graph**: Flugspuren, die die „Signatur“ jedes Flughafens darstellen (56★) — <https://github.com/ianlkl11234s/flight-arc-graph>
- **mini-taiwan-info**: Das Dashboard zur Überwachung von sieben Themen in Taiwan — <https://github.com/ianlkl11234s/mini-taiwan-info>
- **tw-ship-viz**: Echtzeit-AIS-Punktvisualisierung für Schiffe (11★) — <https://github.com/ianlkl11234s/tw-ship-viz>
- **satellite-arc**: Satellitenbahn- und Durchflugvisualisierung — <https://github.com/ianlkl11234s/satellite-arc>
- **mini-tw-cctv**: Live-Bilder von ganz Taiwan — <https://github.com/ianlkl11234s/mini-tw-cctv>
- **mini-tw-tra-atlas**: Atlas des Taiwan Railways Netzes — <https://github.com/ianlkl11234s/mini-tw-tra-atlas>
- **taiwan-weather-timelapse**: Wetterzeitraffer — <https://github.com/ianlkl11234s/taiwan-weather-timelapse>
- **gis-data-collectors**: Das Rückgrat der über vierzig Datenkollektoren — <https://github.com/ianlkl11234s/gis-data-collectors>

**Vortrag und Autor**

- **Sciwork 2026 Vortragspräsentation online**: <https://sciwork-showcase.zeabur.app>
- **Sciwork 2026 Quellcode**: <https://github.com/ianlkl11234s/0613-sci-work-share>
- **Entwickler GitHub (Migu)**: <https://github.com/ianlkl11234s>
- **Threads**: [@ianlkl1314](https://www.threads.net/@ianlkl1314)

## Referenzen

- Migu, „Mini Taiwan! Open Data von Taiwan an einen Agenten abgeben, um ein selbstwachsendes System zu erziehen“, Sciwork 2026 / SCIWORK SEMINAR, 13. Juni 2026.
- Staatliche Datenplattform data.gov.tw (betrieben vom National Development Council, gestartet 2013).
- Transportdatenverteilungsdienst TDX (Ministerium für Verkehr, integriert fünf große Verkehrsplattformen im Jahr 2022).
- g0v Zero Hour Government Community und Berichte früherer Hackathons.

## Bildquellen

Alle Bilder in diesem Artikel sind zwischengespeichert unter `public/article-images/technology/` und verlinken nicht auf die Quelldienste.

**Fair Use für redaktionelle Kommentare**: Alle Bilder in diesem Artikel stammen aus der Präsentation, die Migu bei Sciwork 2026 veröffentlicht hat (Quellcode und Online-Präsentation siehe oben unter „Projektlinks“). Sie werden gemäß § 65 des Urheberrechtsgesetzes und den vier Faktoren des Fair Use nach 17 U.S.C. § 107 verwendet (nicht kommerzieller Bildungszweck, bereits veröffentlicht, geringer Zitierungsanteil, keine wesentliche Marktersatzfunktion) als redaktionelle Kommentierung seiner Open Data Visualisierungsarbeit. © Migu / Sciwork 2026.

Umfasst: Mini Taiwan Pulse 3D-Karte (Titelbild), Kepler.gl Startpunkt, Mini Taipei Bahnnetz, Schiffs-AIS, Satellitenbahnen, Landwirtschaft × Wasser und Medizinische Ressourcen-Integrationskarte, Starkregen-Katastrophen-Zeitleiste, Atlanta Flugspuren-Signatur, Brandthemen-Pipeline-Ausgabe, Mini Taiwan Info Dashboard, Agenten-Orchestrierungssystem-Betrieb.

---

[^1]: Entwickler Migu Cheng, GitHub-Konto `ianlkl11234s` (erstellt im März 2020). Sein GitHub-Profil wurde am 25. Juni 2026 aktualisiert auf „Building GIS visualizations from Taiwan open data · Exploring AI automation in daily work“, wobei der ursprüngliche Text „Senior Data Analyst, exploring AI automation in daily work“ geändert wurde. Der Satz „Es gibt so viele Daten über Taiwan; es ist nicht schwer, sie zu kartografieren“ stammt wörtlich aus der Folie „TAG 0 Karte“ seines Sciwork 2026 Vortrags. Datenquelle: GitHub API-Abruf, 25.06.2026; Quellcode des Vortrags `ianlkl11234s/0613-sci-work-share`.

[^2]: Sterne, Forks und letzte Aktualisierungszeiten der Projekte mini-taiwan-pulse und des „Mini Taiwan“-Sternensystems wurden am 25. Juni 2026 von Taiwan.md über die GitHub API abgerufen. Zu diesem Zeitpunkt hatte mini-taiwan-pulse 375 Sterne / 26 Forks, war noch in Bearbeitung; mini-taiwan-learning-project hatte 189 Sterne; flight-arc-graph hatte 56 Sterne. Das Sternensystem umfasst mehr als ein Dutzend Repositories zu Taiwan Open Data wie poc-bus-range, gis-data-collectors, tw-ship-viz, satellite-arc, mini-tw-cctv und mini-taiwan-info.

[^3]: Migu, „Mini Taiwan! Open Data von Taiwan an einen Agenten abgeben, um ein selbstwachsendes System zu erziehen“, Sciwork 2026 / SCIWORK SEMINAR, 13. Juni 2026. Quellcode des Vortrags: <https://github.com/ianlkl11234s/0613-sci-work-share>; Online-Präsentation: <https://sciwork-showcase.zeabur.app>. Alle Zahlen (ca. 52.891 Datensätze von data.gov.tw, die Feuer-Pipeline mit 582 → 1.945 → 2.404 → 73.900 Einträgen, 21 Plattformen, 15.405 nationale Brände im Jahr 2024, elektrische Faktoren in New Taipei City mit 30,9%, Zigarettenkippen in Pingtung County mit 35,2%, über 5.700 Busse, 40+ Kollektoren, über dreihundert Züge, Atlanta Flughafen mit 1.839 Flugspuren, Landwirtschaft × Wasser von 400 MB → ca. 5 MB usw.) und alle Zitate („Das menschliche Gehirn kann es nicht erfassen“, „Wenn LLMs die Daten sehen können, kann ein Agent dir helfen herauszufinden, welche Daten zusammen betrachtet werden sollten“, „Pipeline automatisch generiert. Ich habe kein Wort geschrieben“, „Ziel vorgeben und Berichte empfangen“, „Wenn der Agent einen vollständigen Zyklus selbstständig durchführen kann, bleibt für den Menschen nur – das Stellen von Fragen und die Validierung“, „Ein Worker = Ein tmux-Tab + eine unabhängige Sitzung + ein PR“, „Jeder Schritt ist ein unabhängiges Repo; die Orchestrierungsebene kümmert sich nur um den Fortschritt und die Entscheidungen“, „Experimenteller Fortschritt ungefähr die Hälfte“ sind Aussagen und wörtliche Texte aus der Präsentation von Migu, stellen persönliche Behauptungen des Vortragenden und nicht staatliche Statistiken, die von Taiwan.md unabhängig überprüft wurden.

[^4]: g0v Zero Hour Government Community, inspiriert durch den Hackathon „Code zur gesellschaftlichen Transformation“ des Industrial Research Institute im Jahr 2012; während der COVID-19-Pandemie erstellten Wu Zhanwei et al. innerhalb von Dutzenden von Stunden eine „Echtzeit-Nachfragekarte für Masken“ mit Bestandsdaten, die vom Krankenversicherungsamt veröffentlicht wurden und ein repräsentatives Beispiel für die bürgerwissenschaftliche „digitale Rettung“ in Taiwan sind.

[^5]: Laut GitHub API (Abruf am 25.06.2026) ist `ianlkl11234s/taiwan-md` ein Fork von `frank890417/taiwan-md` (dem Original Taiwan.md), erstellt am 22. März 2026. Das Projekt Taiwan.md entstand Mitte März 2026. Migu's Kooperationssystem basiert auf Claude Code (sein Vortrag enthält CLAUDE.md, der Orchestrator ist „eine Claude-Sitzung“), genau wie Taiwan.md.

[^6]: Die staatliche Datenplattform data.gov.tw wird vom National Development Council betrieben und seit 2013 aktiv; die Transportdatenverteilungsdienst TDX wurde im Jahr 2022 vom Ministerium für Verkehr entwickelt, um fünf große Verkehrsplattformen zu integrieren; das Ministerium für Innereischendienste bietet Bevölkerungsdaten auf Dorfebene (SEGIS); die Wetterbehörde stellt öffentliche APIs bereit. Die Gesamtzahl der Echtzeit-Datensätze von data.gov.tw konnte nicht unabhängig verifiziert werden; die in diesem Artikel genannte Zahl „etwa fünfzigtausend“ basiert auf den Zahlen aus Migu's Präsentation.

_Letzte Verifizierung: 25.06.2026_
