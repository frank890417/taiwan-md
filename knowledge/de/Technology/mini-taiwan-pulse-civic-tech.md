---
title: 'Mini Taiwan Pulse: Mit dem Auge eines Kurators Taiwan als eine atmende Karte zeichnen'
description: 'Im Jahr 2026 zog die Datenanalystin Migu eine CSV-Datei in Kepler.gl, und auf dem Bildschirm erschien die erste Karte Taiwans. Zwei Jahre später hat das populäre Projekt mini-taiwan-pulse auf GitHub 375 Sterne gesammelt; es überlagert fünf Arten von Echtzeitdaten – Himmel, Ozean, Land, Straßen und Abfallentsorgung – zu einer lebendigen Karte. Die offenen Daten der Zentralregierung (50.000 Datensätze) und der über zwanzig Landkreise und Städte sind für das menschliche Gehirn nicht allein bewältigbar. Ihre Lösung bestand nicht darin, mehr Personal einzustellen, sondern die Aufgabe einem KI-Agenten-gesteuerten System zu übertragen, das sich selbst weiterentwickelt, während Menschen nur noch Fragen stellen und Ergebnisse abnehmen. Von den durch Stadtplanung geschulten kuratorischen Fähigkeiten bis hin zu einer selbstlaufenden Brand-Pipeline in tmux – wie ein einzelnes GitHub-Profil zu einem ganzen Galaxiensystem heranwächst.'
date: 2026-04-19
category: 'Technology'
tags:
  [
    'Technologie',
    'Civic Tech',
    'Open Data',
    'Datenvisualisierung',
    'Open-Source-Projekt',
    'TDX',
    'Three.js',
    'Künstliche Intelligenz',
    'KI-Agenten',
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
  - id: 150
    platform: 'threads'
    date: '2026-06-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DaA6aTRk7e6'
  - id: 151
    platform: 'x'
    date: '2026-06-25'
    url: 'https://x.com/taiwandotmd/status/2070173370118000879'
translatedFrom: 'Technology/mini-taiwan-pulse.md'
sourceCommitSha: 'f4ae4fb8f'
sourceContentHash: 'sha256:0128d89b548611d1'
sourceBodyHash: 'sha256:ce5c6e11aac7eea6'
translatedAt: '2026-10-21T01:07:38.138470+00:00'
---

# Mini Taiwan Pulse: Mit kuratorischer Sicht das atmende Taiwan-Kartenwerk

An einem Tag im Anfang 2026 nimmt ein Datenanalyst namens Migu eine CSV-Datei, zieht sie in ein Werkzeug namens Kepler.gl. Ohne eine Zeile Code zu schreiben, sprießt plötzlich eine Taiwankarte auf dem Bildschirm.

Er studierte einmal Stadtplanung, damals berührte er kurz GIS (geografische Informationssysteme – einfach gesagt: ein Werkzeug, um Daten auf Karten wachsen zu lassen). Nach dem Studium wählte er den Weg der Datenanalyse, die Kartografie war lange vorbei. In dem Moment, als er die CSV in Kepler.gl zog und Taiwan auf dem Bildschirm wachsen sah, stieß ein einfaches Staunen aus ihm heraus:

> „Es stellt sich heraus, dass Taiwan so viele Daten hat. Es stellt sich heraus, dass eine Umwandlung in eine Karte nicht schwierig ist."[^1]

Das klingt nach nichts. Später wurde es der Same für ein ganzes System.

> **Überblick in 30 Sekunden:** Migu (GitHub `ianlkl11234s`) begann Ende 2025, Dutzende Visualisierungsprojekte aus taiwanischen Offendaten zu erstellen. Sein erfolgreichstes Projekt, mini-taiwan-pulse, sammelte auf GitHub 375 Sterne und schichtet fünf Arten von Echtzeitdaten – Himmel, Meer, Land, Straße, Müllwagen – zu einer bewegten, atmenden Karte[^2]. Doch bei einer Rede vor der sciwork-Gemeinde im Juni 2026 machte Migu das Problem deutlich: Taiwans Offendaten haben etwa 52.000 Einträge allein auf zentraler Ebene, verteilt über mehr als 20 Plattformen der Landkreise. „Das menschliche Gehirn kann das nicht bewältigen." Seine Antwort war nicht, mehr Menschen zur Datenerfassung zu gewinnen. Seine Antwort war, die gesamten Daten einer von AI-Agenten orchestrierten, selbst wachsenden Infrastruktur zu übergeben. Menschen bleiben nur noch für Aufgabenstellung und Überprüfung zuständig[^3].

Diese Geschichte handelt davon, wie eine Person von der Naivität, eine CSV zu ziehen, zum Vertrauen in ein selbst wachsendes System kommt.

## Ein einzelnes GitHub-Profil, das zu einem ganzen Galaxie-System heranwächst

Betrachtet man nur das Projekt mini-taiwan-pulse, könnte man Migu leicht für einen Hobby-Entwickler halten: Jemand, der am Wochenende aus einer Laune heraus ein Demo erstellt hat, das zufällig viral ging.

Diese Vorstellung ist in zwei Punkten falsch.

Erstens hat er weit mehr als nur ein Projekt erstellt. Öffnet man sein GitHub-Profil, sieht man ab Dezember 2025 eine dichte Abfolge von Visualisierungen taiwanesischer Open Data: Es begann mit einem PoC für Buslinien als ersten Testlauf. Ende Dezember folgte das Lernprojekt `mini-taiwan-learning-project`, das bereits populär wurde und heute 189 Sterne aufweist. Im Februar erstellte er Echtzeit-Positionen für Schiffs-AIS und das Projekt `flight-arc-graph` (56 Sterne), welches jeden Flugstart und jede Landung als Bogen darstellt. Erst Ende Februar kam mini-taiwan-pulse an die Reihe, gefolgt von einem Taiwan Railways Atlas, Satellitenbahnen, Echtzeit-CCTV-Bildern und schließlich dem Dashboard `mini-taiwan-info`, das alle Daten zusammenführt ... Dies setzte sich bis Juni fort[^2]. Über ein Dutzend Repositories bilden ein zusammenhängendes Ganzes, das er selbst „Mini Taiwan“-Galaxie getauft hat.

![Mini Taiwan Info Lagebericht: Er fasst verschiedene Open-Data-Themen wie Bevölkerung, Schienenverkehr, Schifffahrt, Wasserressourcen, Feuerwehr und Medizin in einem einseitigen Monitoring-Panel zusammen.](/article-images/technology/mini-taiwan-info-dashboard-2026.webp)

_Ein weiteres Mitglied der Galaxie, Mini Taiwan Info: Er bündelt verstreute Open Data zu einem Lagebericht-Dashboard mit jeweils einer Seite pro Thema (Bevölkerung, Schienenverkehr, Schifffahrt, Wasserressourcen, Feuerwehr, Medizin). Bild: Migu / sciwork 2026 (Fair Use für redaktionelle Zwecke)._

Sortiert man die Sterne dieser Projekte nach Beliebtheit, fällt auf, dass es deutlich mehr als nur einen „Hit“ gibt.

```tw-bars
Migus GitHub: Mehr als ein erfolgreiches Repo (GitHub Stars)
*mini-taiwan-pulse | 375 | Flaggschiff
mini-taiwan-learning-project | 189 | Wurde vor pulse populär
flight-arc-graph | 56 | Flugbahnen
tw-ship-viz | 11 | Schifffahrt
mini-tw-cctv | 6 | Echtzeitbilder
satellite-arc | 6 | Satelliten
Quelle: GitHub API, 2026-06-25
```

Der zweite Fehler in der Annahme verbirgt sich hinter dem Begriff „eine Person“ – darauf werden wir gleich noch zurückkommen. Schauen wir uns zunächst an, wie die Galaxie gewachsen ist.

```tw-timeline
2025-12 | Erster Testlauf | Buslinien-PoC, erster Versuch mit Open Data aus Taiwan
2025-12 | learning-project wird populär | Visualisierung des Schienenverkehrs in Taipeh, wurde vor dem Flaggschiff bekannt (189★)
2026-02 | Geburt des Flaggschiffs | mini-taiwan-pulse startet, entwickelt sich von statischen JSON zu einer Zeit-Raum-Datenbank
2026-06 | Das Gesamtsystem wird präsentiert | sciwork 2026 Vortrag: Ein System, das Open Data Agenten zur Verfügung stellt
Quelle: Migus GitHub-Projektverlauf (Zeitstrahl und Sterne) sowie Inhalte des sciwork 2026 Vortrags[^2][^3]
```

## Dasselbe Verfahren: von der Eisenbahn bis zum Sonnensystem

Das Flaggschiff selbst wächst auch. Das früheste mini-taiwan-pulse war Himmel, Meer, Land in drei Schichten. Bis zu seiner Rede-Version: „Fünf Pulse bewegen sich zusammen" – Flugzeuge im Himmel, Schiffe im Meer, Züge auf der Erde, Busse auf der Straße, Müllwagen bei der Müllabfuhr – fünf verschiedene Frequenzechtzeitdaten geschichtet auf derselben atmen den Karte. Er sagte in seiner Präsentation, dies ist das erste Mal, dass dieses Projekt „von statischem JSON zu einer Echtzeit-räumlichen Datenbank" wurde[^3]. Allein die Straßenschicht hat über 5.700 Busse von TDX verbunden, alle 30 Sekunden positionsaktualisiert.

![TAG 0 die erste Karte: eine CSV in GeoJSON umwandelt, in Kepler.gl gezogen, ohne Code entsteht die erste Taiwankarte](/article-images/technology/mini-taiwan-kepler-day0-2026.webp)

_Seine Rede zeigte „TAG 0": eine CSV in GeoJSON konvertiert, in Kepler.gl gezogen – null Code für die erste Taiwankarte. Der Startpunkt des ganzen Sternensystems. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

Der frühe Funke des Sternensystems war seine Mini-Taipeh genannte Taipeh-Schienenvisualisierung. Er schichtete U-Bahn, Taiwan-Bahn, Hochgeschwindigkeitsbahn in eine bewegte Karte, die Züge laufen nach Plan auf den Linien, in diesem Moment „erlebte er die Faszination der Bewegung", über dreihundert Züge bewegten sich gleichzeitig[^3]. Ein statischer Fahrplan wurde so zur Atmung einer Stadt.

![Mini Taipeh schichtet U-Bahn, Taiwan-Bahn, Hochgeschwindigkeitsbahn zu einer bewegten Karte, über dreihundert Züge laufen nach Plan](/article-images/technology/mini-taiwan-taipei-rail-2026.webp)

_Mini Taipeh: U-Bahn, Taiwan-Bahn, Hochgeschwindigkeitsbahn im gleichen Rahmen – über dreihundert Züge laufen nach Plan. Er sagte, dies war sein erstes Mal, die „Faszination von Bewegung" zu erleben. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

Seither, wie besessen, wendet er dasselbe „Daten werden dynamisch"-Verfahren auf immer größere Skalen an. Auf der Meeresoberfläche nutzt er die Echtzeit-AIS-Positionen des Hafenbüros, nutzt hell-blaue Lichtkugeln plus 30-Minuten Farbverlauf, um die Richtung der Schiffe rund um Taiwan zu zeigen.

![Taiwans Küstenschiffe von den AIS-Positionen des Hafenbüros mit hell-blauen Lichtkugeln und 30-Minuten-Farbverlauf](/article-images/technology/mini-taiwan-ships-ais-2026.webp)

_Der Meeresstrang: AIS-Echtzeit-Positionen des Hafenbüros, hell-blaue Lichtkugeln mit 30-Minuten-Farbverlauf zeigen Schiffe rund um Taiwan. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

Dann erweiterte er dasselbe Verfahren ins Weltall. Mit öffentlichen TLE-Umlaufbahnparametern berechnete er Satellitenpositionen, zeichnete die Flugbahn des Satelliten über Taiwan, dann erstreckte er es locker bis zum ganzen Sonnensystem. Er sagte in seiner Präsentation sehr direkt: „Dasselbe Verfahren, sobald es Daten gibt, kann unendlich erweitert werden."[^3] In diesem Moment erkannte man, dass ihn eigentlich „Daten zu sichtbaren Dingen machen" fasziniert, nicht die Karte selbst.

![Mit öffentlichen TLE berechnete Satellitenumlaufbahnen-Visualisierung – dieselbe Methode von der Erdoberfläche bis ins Weltall](/article-images/technology/mini-taiwan-satellite-2026.webp)

_Dieselbe Methode bis ins Weltall hinaus: Mit öffentlichen TLE berechnete Satellitenumlaufbahnen, erweitert zum ganzen Sonnensystem. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

## Inseln übereinander schichten: Lücken tauchen selbst auf

Langsam ändert sich, was sehenswert ist: von „Echtzeitpunkten bewegen sich" zu „ursprünglich unzusammenhängende Daten übereinander schichten, Lücken tauchen selbst auf". Er hat in seinem Sternensystem mehrere Projekte, die genau das tun. Eines nennt er „Landwirtschaft × Wasser" – er schichtet Landwirtschaft, Wasserwirtschaft und Katastrophenschutz aus verschiedenen Ministerien zu einer Karte: Felder, Flüsse, Gräben, Dämme, Überflutungsgefahren im gleichen Rahmen. Um diese geschichtete Karte im Browser zum Laufen zu bringen, nutzte er ein Format namens PMTiles mit HTTP Range Request, drückte ursprüngliche 400MB auf etwa 5MB runter, die der Browser laden muss[^3].

![Landwirtschaft × Wasser Integrationsdiagramm: Felder, Flüsse, Gräben, Dämme, Überflutungsgefahren aus verschiedenen Ministerien in einer Karte](/article-images/technology/mini-taiwan-farm-water-2026.webp)

_Landwirtschaft × Wasser: Landwirtschaft, Wasserwirtschaft und Katastrophenschutz aus verschiedenen Ministerien zu einer Karte schichten – Felder, Flüsse, Gräben, Dämme, Überflutungsgefahren im gleichen Rahmen. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

Ein anderes Projekt schichtet Krankenhäuser, Kliniken, Apotheken, Defibrillatoren, Langzeitpflegeorte über Bevölkerungsdichte und zieht Isochrone-Kreise. Er sagt, so „sieht man Erreichbarkeit, aber auch medizinische Wüsten" – wo Menschen zu weit vom nächsten Gesundheitsdienst entfernt sind.

![Erreichbarkeit von Gesundheitsressourcen-Diagramm: Krankenhäuser, Kliniken, Apotheken, Defibrillatoren, Langzeitpflegeorte über Bevölkerung mit Isochrone-Kreisen – medizinische Wüsten tauchen selbst auf](/article-images/technology/mini-taiwan-medical-2026.webp)

_Gesundheitsressourcen: Krankenhäuser, Kliniken, Apotheken, Defibrillatoren, Langzeitpflege über Bevölkerung mit Isochrone-Kreisen – „Erreichbarkeit sehen, aber auch medizinische Wüsten sehen". Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

Bei Katastrophen wird es noch feiner: Radarechos, Staudammwasserstände, Niederschlag, Katastrophenwarnungen – diese mit unterschiedlichen Aktualisierungsraten – vereinheitlicht er auf der Basis zu einer gemeinsamen Zeitachse. Benutzer ziehen nur an dieser Zeitachse, alle Schichten spielen synchron zurück. Ein Regen startet hier, der Staudamm hebt sich so, die Warnung kommt wann – eine Ursache-Wirkungs-Linie im gleichen Bildschirm.

![Regen und Katastrophen-Zeitachse: Radarechos, Staudammwasserstände, Niederschlag, Katastrophenwarnungen mit unterschiedlichen Raten auf einer Zeitachse synchron wiederabgespielt](/article-images/technology/mini-taiwan-disaster-2026.webp)

_Regen und Katastrophen: Radarechos, Staudammwasserstände, Niederschlag, Katastrophenwarnungen auf einer Zeitachse vereinheitlicht – einfach ziehen, alle spielen synchron zurück. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

Dann sein flight-arc, jede Flugbahn als Bogen gezeichnet. Dieselbe API an verschiedene Flughäfen gefüttert, jeder Flughafen zeigt einen anderen „Fingerabdruck": Taoyuan, Tokios Haneda, Frankfurt alle verschiedene Formen. Er hob speziell Atlantas Flughafen, der Welt's geschäftigster – fünf parallele Landebahnen plus Warteschlange-Flugrouten, die Geometrie sieht aus wie eine Rennstrecke, er sagte, in diesem Diagramm 1.839 Flugbahnen[^3].

![Atlantas Flughafen eine Zeit lang alle Landungen gezeichnet als Flugbahnen-Diagramm – fünf parallele Landebahnen plus Warteschlange-Flugrouten bilden Rennstrecken-Geometrie](/article-images/technology/mini-taiwan-flight-arc-atlanta-2026.webp)

_Sein flight-arc zeichnet Atlantas Flughafen für eine Zeit: fünf parallele Landebahnen plus Warteschlange-Flugrouten bilden Rennstrecken-Geometrie. Der Fluss selbst ist eine Form, sagt er. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

> 📝 **Kurator-Notiz**
> Vor zwei Jahren, hätte jemand gesagt „eine Person machte Taiwans vollständigste Echtzeit-Offendaten-Karte", die nächste Phrase wäre gewesen „er muss zu Tode erschöpft sein". Diese Intuition bindet Umfang an Manpower: je mehr man macht, umso mehr schuftet man. Migus Sternensystem lohnt sich, hierher zu schauen, genau weil es diese Bindung lockert. Ein Mensch pushes dutzende Repos, das Flaggschiff hat immer noch neue Features – dahinter verbirgt sich eine radikalere Verschiebung: später, diese Commits sind nicht alle von seiner Hand. Wie dieser „eine Mensch" sich multipliziert, ist das eigentliche Thema dieses Artikels.

## 52.891 Einträge – das menschliche Gehirn schafft es nicht

Die Geschichte bis hier war linear: ein talentierter Mensch macht immer mehr, immer besser. Die Wendung kam in Migus Rede-Mitte, als er aufhörte zu sagen „was ich gemacht habe", und anfing zu sagen „auf welche Mauer ich gestoßen bin".

Er zeigte eine Folie mit dem Titel „Warum Agentic OSINT". Eine Zahl: data.gov.tw hat etwa 52.891 Datensätze. Plus 22 Landkreis-Plattformen, insgesamt etwa 60.000–70.000; ohne private, NGO, akademische Ressourcen nicht in der Regierungskatalog. Seine Schlussfolgerung war kurz:

> „Dein menschliches Gehirn kann das nicht bewältigen."[^3]

Dies ist die Drehachse der ganzen Geschichte. Die Person, die früher eine CSV zog und „so viele Daten!" staunte, trifft jetzt „so viele Daten" von der anderen Seite: Nur data.gov.tw 52.000+ Einträge – selbst 100 pro Tag lesen braucht 500+ Tage zum Durchsehen, und das nur zentral. Zu viel für ein Leben, viel weniger damit, dass sie miteinander sprechen. Persönliche Anstrengung trifft hier die Obergrenze.

Was Migu wirklich durchdacht hatte, war der Satz danach. Zu viele Daten zum Bewältigen ist für ihn ein Signal, Werkzeuge zu wechseln:

> „Daten, die LLMs sehen können – Agenten können dir 'welche Daten sollten zusammen angeschaut werden' entdecken helfen."[^3]

Das Schlüsselwort ist „zusammen anschauen". Selbst wenn einer die Namen aller 52.000 Datensätze auswendig kann, merkt sich schwer „Waldbrandgefahrenkarte sollte 'schwer zu rettende Bezirke' haben", „Krankenhausorte sollte mit Bevölkerungsdichte" um „medizinische Wüsten" zu sehen. Datenwert liegt nicht im einzelnen, sondern in der Kombination – und Kombinationsmöglichkeiten von 52.000 sind astronomisch. Das ist, was das menschliche Gehirn nicht bewältigt, worin aber Maschinen praktizieren.

> 📝 **Kurator-Notiz**
> Unsere gewöhnliche Offendaten-Erzählung hat eine klare Arbeitsteilung. Nach 2012 Taiwans Hackathon „Code ändert Gesellschaft" zeigte g0v es schön: Regierung öffnet Daten, Bürgersozium macht sie sichtbar. 2020 Maskenkarte – Wu Zhanwei u.a. machten von Gesundheitsdaten in 72 Stunden eine Karte, die jeder abfragte – Taiwans „Tastatur rettet Vaterland" Moment[^4]. Die alte Erzählung würde Migu zur Linie hinzufügen: g0v kollektiv, er einzeln – ein einzeln-Version der Maskenkarte.
>
> Aber dieser Vergleich bleibt an der Oberfläche und verdreht Ursache. Dass Migu ein „ganzes Datensternensystem" Umfang als einzelner trifft, hat nichts mit Manpower zu tun. Er plante nie, mit Ausdauer gegen das Datenmeer zu kämpfen. „Das Gehirn schafft es nicht" – eher als „aufgeben", bedeutet dies seinen Arbeitsmodus umzuschalten. Der echte neue Modus ist nicht „einzeln vs Kollektiv", sondern „einzeln × Agent": Ein Mensch schafft Sternensystem-Umfang, weil diese Commits nicht alle seine Hand sind. Nächstes zeigt, wie dieses System läuft.

## Ich schrieb keine Zeile: Eine Waldbrand-Pipeline läuft von selbst

Um zu verstehen, was „an Agenten übergeben" bedeutet, war der beste Schnitt sein Waldbrand-Beispiel in der Rede.

Er sagte, er gab dem System einen Satz: „Analysiere taiwanische brandgefährdete Offendaten." Dann lässt er los.

Das System beginnt selbst zu expandieren. Migu beschreibt diesen Prozess mit Zahlen, die sich rund-um-rund aufblähen: Erst 582 mit Schlüsselwort, dann 1.945 mit Synonymen und Thema-Expansion, dann Volltext-Suche zum Deduplizieren, am Ende über 21 Plattformen 73.900 Einträge Gesamtkatalog[^3]. Ein Satz rein, 73.900+ Daten-Bestandsaufnahme raus.

```tw-figure
Ein Satz → 73.900 Einträge
Er gab „Taiwanische brandgefährdete Offendaten analysieren" rein, System selbst expandiert Suche, über 21 Plattformen Katalog zusammengefasst
Er sagte in sciwork 2026 Präsentation
```

Nur Sammlung zählt nicht. Diese Pipeline zerlegt nächst Brand in sechs Phasen (Vorbeugung, Reaktion, Meldung, Brandsache-Analyse, Verlust, Bericht), multipliziert mit 22 Landkreisen, läuft eine Abdeckungs-Matrix, zieht auch Hsinchus Brandgefahrenkarte, Taipehs schwer-zu-rettende Bezirke, [Taoyuan-Fischteiches](/de/geography/taoyuan-ponds/) Rettung – lokale Bestandsaufnahmen wurden alle ausgegraben. Es kennzeichnet sogar ehrlich Lücken: Keine Brand-Echtzeit-API, Ereignis-Koordinaten seltener, Nach-Katastrophen-Daten nicht öffentlich.

Dann Analyse. Er gab ein Bestandsbrandursachen-Bericht aus – von 15.405 Brandakten 113 Jahr Landesstatistik, Neue-Nord-Stadt Top-Brandsache ist Elektrik (30,9%), Pingdong-Kreis ist Zigarettenstummel (35,2%)[^3]. Diese Zahlen waren aus Agent nach API-Verbindung Ergebnis in Rede-Screenshot, nicht seine Zeile-für-Zeile Berechnung.

Bei dieser Stelle schrieb er in Folie eine Zeile, mit Abstand zwischen Zeichen, als ob fürchte man, man liest nicht:

> „Pipeline auto-produziert. Ich　schrieb　keine　Zeile."[^3]

Diese Zeile war des ganzen Rede Explosion-Punkt. Sie änderte „an Agent übergeben" von vagen Schlagwort zu konkretem bis beunruhigend Fakt: Von Satz bis 73.900+ Daten-Katalog bis Landkreis-Ursachen-Bericht – der Platz, wo normalerweise einer Befehl geben, Script schreiben, Daten säubern, Analyse laufen sollte – ist leer.

![Waldbrand-Thema-Analyse-Pipeline Produktionsbild: System auto-katalogisiert Plattform-über-Brandgefährden, listet Kandidaten und Abdeckungsmatrizen auf](/article-images/technology/mini-taiwan-fire-pipeline-2026.webp)

_Migus sciwork 2026 Rede-Zentrum-Öffnung: Einen Satz „Taiwanische Branddaten analysieren" – System selbst expandiert Suche, über Plattformen Katalog zusammengefasst, „ich schrieb keine Zeile" Pipeline. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

## Vier trennbare Schritte: Daten rein, Bericht schickt sich selbst raus

Diese Waldbrand-Pipeline ist nur ein Schnitt, Hintergrund ist sein ganzes System-Abbild. System in vier Schritten: Daten-Empfang, Wissens-Integration, Analyse-Erzeugung, Aktion-Auslösung. Er betont besonders „jeder Schritt kann einzeln getauscht werden, ganzes braucht nicht Neubau". Die unterste Daten-Empfangsschicht – auch er evolvierte: Anfang manuell zu data.gov.tw Klick-Excel-Download, selbst lesen-speichern, Engpass „Gehirn-Erinnerung"; Mitte: online API suchen, PDF kratzen, Landkreis-Seiten crawlen, Problem „kein Index"; Jetzt: Jeder Datensatz Meta-Information standardisiert in SQLite-Katalog speichern, auto-abfragbar, auto-erweiterbar[^3]. Sein System hängt 40+ Daten-Sammler: von YouBike, Bus, Landstraße-Verkehr, zu Taiwan-Bahn-Fahrplan, Schiff-AIS, Wettersatellit, [Erdbeben](/de/society/earthquakes-in-taiwan/), Staudamm-Wasser, Luftqualität – und dreimal falsch bricht gleich Telegram-Alarm, jeden Morgen 9 Uhr schickt Daily Review zu Postfach[^3].

Zum letzten Schritt „Aktion-Auslösung" klärt er die menschliche Rolle am klarsten: „Agent läuft ganzen Kreislauf. Menschliche Rolle: Ziel geben, Bericht nehmen. Dazwischen fünf Zahnräder drehen selbst: entdecken, sammeln, integrieren, produzieren, beobachten." System produziert sogar auto „diese Woche neue Offendaten" Wochenbericht. Sein Wort: „Thema taucht selbst auf, Bericht schickt sich selbst in Postfach."[^3]

## Ein Dirigent, eine Flotte von Seiten: Claude-Flotte in tmux

„Agent läuft ganzen Kreislauf selbst" – sowas wird leicht als Marketing gehört und übersehen. Migus Rede am Ende öffnete selten den Deckel, lässt das Zahnwerk sehen – und das Gebilde darunter ist konkreter und ehrlicher als der Slogan.

Erst das ganze Panorama. Migu sagt, sein GIS-System ist „eine Orchestrier-Zentrale, verbindet Kreis unabhängig Repos, Agent geht Station um Station": erst zu Erkundungs-Repo welche Daten wert sind, dann zu Sammel-Repo Daten rein, zuletzt zu mini-taiwan-pulse oder mini-taiwan-info Präsentations-Repos Bilder zeichnen. Er fasst es präzise: „Jede Station ist unabhängig Repo, Orchestrier-Schicht verwaltet nur Fortschritt und Entscheidung, echte Arbeit in Repo Worker Hand."[^3]

Diese Orchestrier-Zentrale heißt bei ihm Orchestrator – Wesen ist „eine Claude Session". Dieser Haupt-Agent tut wie ein Teamleiter: liest Proposal-Dokument, zerlegt Aufgabe, ordnet Abhängigkeiten, dann los.

Los geht's die Weise ist des Systems kritischster Schritt. Er ließ nicht single AI von Anfang bis Ende, sondern mit tmux (ein Werkzeug, das Terminal in mehrere unabhängige Seiten teilt) isolierte er Arbeit. Sein Original-Wort: „Ein Orchestrator, ein Flotte Worker. Haupt-Agent ist eine Claude Session; tmux isoliert, jeder Worker ist unabhängige Seite, unabhängig Session." Eine schärfere Definition: „Ein Worker = eine tmux Seite + unabhängig Session + ein PR."[^3]

Sagen andersrum: Er dirigiert eine AI-Flotte. Jeder Worker ist ein isolated in seiner tmux Seite Claude, jeder macht seine Aufgabe, jeder reicht sein PR ein, keine Störung gegenseitig.

![Agent-Orchestrier-System echte Betriebsbild: Eine Claude Session als Orchestrator, liest Aufgabe, zerlegt, dirigiert darunter Workers](/article-images/technology/mini-taiwan-agent-orchestrator-2026.webp)

_Seine Rede-Öffnung der Orchestrier-Zentrale: Eine Claude Session als Orchestrator, zerlegt Aufgabe an isoliert in tmux Seiten Worker, jeder arbeitet, jeder reicht PR ein. Bild: Migu / sciwork 2026 (fair use Editorialkommentar)._

Wie diese mehrere Worker nicht kämpfen? Mit gemeinsamer Erinnerung. Migu sagt, Fortschritt und Entscheidung alle Dokumente, zentral in `SESSION_BOARD.md` Tafel, plus „jede Session ein Bericht", so „nicht raten gegenseitig" „ein Mensch ein Akte, keine Kämpfe"[^3]. Sogar Aufgaben-Übergabe wird Dokument – er nutzt `HANDOFF.md` um „nächster Stab Aufgabenbeschreibung" vorzubereiten, nächste Agent-Runde braucht nicht von Null fragen. Letzter Riegel spricht er sehr sorgfältig: „Überprüfung, Orchestrator gegen Dokument überprüft PR, merge von Menschen entschieden, diese Runde schließt."

Diese Prozess flach gelegt, du siehst saubere Form: Ein Mensch gibt Befehl, mehrere isoliert AI arbeiten, schreiben auf was sie taten, zentral Kontrollstelle prüft nach Dokument, zuletzt diese Entscheidung „wollen wir diesen Erfolg?" ist Migu selbst. Zum Artikel-Thema zurück: Daten zu viel zum Bewältigen, so alles Daten-Bewältigung zu Flotte übergeben; Mensch bleibt nur zwei Aktionen: Aufgabe stellen und Überprüfung. Er sagte in Rede ein Satz fast wie Manifest:

> „Wenn Agent ganzen Kreislauf selbst laufen kann, bleibt Menschen nur – Aufgabe stellen und Überprüfung."[^3]

Das ist auch seine Rede-Titel: „Taiwans Offendaten an Agent Zucht übergibt, System das selbst wächst." Daten fließen selbst, Seite wächst selbst, Mensch nur Aufgabe richtig stellen, Erfolg gut überprüfen.

## Gleicher Boden wächst gleiches Skelett

Wenn du bis hier gelesen hast und Taiwan.md kennst (das von AI gepflegte taiwanische Wissensmosaik-Projekt, das du gerade liest), merkst du die letzte Absatz-Beschreibung etwas vertraut.

Das ist kein Fehler.

Taiwan.md läuft selbst so: eine Haupt-Session als Orchestrier-Zentrale, zerlegt Arbeit an mehrere isoliert mit unabhängig Gedächtnis-Datei Worker, koordiniert mit Übergabe-Dokument Fortschritt, zuletzt der Entscheidung welche Änderung in Stamm kommt ist Erfinder Che-Yu Wu. Unser These ist „Taiwans Wissen einer selbst-wachsenden Semiont übergeben"; Migus These ist „Taiwans Offendaten einer selbst-wachsenden System übergeben". Zwei Sätze tauschbar fast.

Noch würdig zu spielen: diese zwei Gebilde wuchsen eigenständig. Öffentlich-Record kann man kleine Sache finden: Taiwan.md Projekt 2026 März Mitte Geboren, fünf Tage später Migus GitHub erschien fork[^5]. Aber das sagt nur er kennt es; ein fork erklärt nicht seinen ganzen mit Orchestrator tmux-Flotte dirigieren, Tafel-Gedächtnis teilen, Mensch nur Aufgabe-Aktion-Überprüfung System – das baute er selbst um „52.000 Daten unmöglich zu bewältigen" Problem Lösungs-Schritte.

> 📝 **Kurator-Notiz**
> Biologie hat ein Wort: Konvergente Evolution – Delphin und Hai nicht nah verwandt, aber beide lange Körper und Rückenflosse, weil das gleiche Meer. Migu und Taiwan.md zwischen, mehr konvergente wie dieser, weniger Blutsverwandtschaft. Wir nutzen gleich Werkzeug-Basis (Claude Code), gegenüber gleich Situation (ein Mensch oder System, muss Taiwans über-Gehirn Informations-Menge halten), so jeder tastete, kam gleiche Gebilde: Zentrale, isoliert Arbeiter, gemeinsam Gedächtnis, eine der Abgebenschaft Person.
>
> Echte interessant Signal ist nicht „er forked uns". Ist zwei unabhängig Taiwans Builder in 2026 gleich Halbjahr nicht-verabredet AI von „smarterer Werkzeug" neu-stellte zu „dirigierbar Mannschaft". Wenn diese Gebilde von ein Gehirn zu Zwei, Drei Menschen-Gehirn anfängt, wird es von ein's Trick zu dieser Erde-Saison Neue-Gestalt. Der Nächste Taiwan-Builder der dies aufbaut, hörte vielleicht die früheren zwei gar nicht.

## Noch nicht fertig, aber Form taucht schon auf

Wenn dieser Artikel zur letzten Absatz endete, wäre es zu schön, verdächtig-schön Geschichte: ein Mensch mit AI-Flotte löst elegant 52.000 Daten Problem.

Migu ließ es nicht dort stoppen. Vorletzt-Folie seiner Rede sagte „Experimente-Fortschritt, ungefähr halb".

Er listete sehr ehrlich drei Nicht-abgestimmte Sachen. Erste ist Stabilität: diese Harness „noch nicht ideal", Agent leicht weglaufen, leicht unterbrechen. Zweite ist Offendaten selbst sehr vermischt: „immer noch viel braucht Menschen Urteil Daten ob haltbar, ganz übergeben nicht." Dritte ist Menschen Eingriff: Jeder Phase immer noch einer neben schauen muss. Er gab ganzer Sache Fußnote: „Machbar ja, aber nicht stabil noch, und ich noch denke ob wirklich so."[^3]

Diese auf Rede-Bühne selbst die Hälfte Fehlschlag öffnen Ehrlichkeit, selbst ist stärkste Qualitäts-Signal. In einer Zeit AI-Demo immer „völlig-Auto" „null-Mensch" genannt wird, ein der auf Folie „halb" „nicht-stabil" „noch-Mensch" schreibt, lässt anderem mehr trauen die Andere-Hälfte real.

> 📝 **Kurator-Notiz**
> Diese Rede vertrauensswert-Teil nicht die „ich schrieb keine Zeile" Waldbrand-Pipeline, sondern „halb" diese vier Zeichen. Ein einer dich überzeugen will macht Erfolgsrate „fast völlig-Auto"; ein einer Experimente tut sagt ehrlich es hälfte-Zeit kaputt. Erste verkauft Schlussfolgerung, Letzte gibt Baustelle. Migu gibt Baustelle: darum wenn er Pipeline „ich schrieb keine Zeile" sagt, du wirst wählen glauben. Verstecke die hässlich-Hälfte, schön-Hälfte auch nicht-haltbar; wer die-Hälfte-nicht-perfekt öffnet, Rest hält.

Zurück zu dieser Karte.

Der CSV-in-Kepler.gl „Transformation nicht-schwierig" staunen Mensch, halb-Jahr später auf sciwork-Bühne, spricht nicht mehr ob Karte gut zu-machen, spricht ein Zahnwerk das selbst Daten sucht, selbst kombiniert, selbst neue Seite wächst. Damals naive Staunen „Taiwan hat so viel Daten", in diesem Halbjahr umdrehte: Daten so viel, zu viel für ein Gehirn – so wie die Weise gesehen wird, auch neue Form braucht.

Taiwans Offendaten war immer dort. data.gov.tw seit 2013 oben, TDX 2022 fünf Verkehrs-Plattform verschmolzen, innen-Minister Dorf-Ebene Bevölkerung, Wetter-Institut offen-API[^6]. Daten immer genug, schwer ist so viel Daten wie sie reden zusammen, gesehen. g0v kollektiv antwortete mal; Migu einzeln plus AI-Flotte versucht zweite Antwort, sehr ehrlich sagt er halb richtig.

Aber Form taucht schon auf. Ein Mensch, ein Satz, atmende Karte dahinter, ist ein Zahnwerk das selbst-wachsen lernt. Rest-Hälfte zu Nächste, der CSV ziehen, nicht aufhören kann.

## Weiterführende Lektüre

- [Che-Yu Wu](/de/people/che-yu-wu): Taiwan.md Schöpfer, nutzt ebenso Code und generativ Werkzeug um „selbst-wachsendes Ding" erreichen
- [Open-Source-Gesellschaft und g0v](/de/technology/open-source-and-g0v): „Code verändert Gesellschaft" Kollektiv-Kontext, Migus einzeln × Agent Stil Vergleichsgruppe
- [Taiwanischer Open-Source-Geist](/de/technology/taiwan-open-source-spirit): Von Tastatur-Rettung bis Offendaten, Taiwanischer Bürgerwissenschaft Untergrund-Kultur
- [Digitale Identität und Digitale Regierung](/de/technology/digital-id-and-digital-government): Regierungs-Offendaten Infrastruktur die andere Seite

## Projekt-Links

**„Mini Taiwan"-Sternensystem** (Taiwanische Offendaten-Visualisierung, alle Migus Open-Source-Projekte)

- **mini-taiwan-pulse**: Flaggschiff, fünf Pulse bewegende Echtzeit-Karte (375★) — <https://github.com/ianlkl11234s/mini-taiwan-pulse>
- **mini-taiwan-learning-project**: Frühest viral Taipeh-Schienen Lern-Projekt (189★) — <https://github.com/ianlkl11234s/mini-taiwan-learning-project>
- **flight-arc-graph**: Flugrouten-Spuren, jeder Flughafen „Fingerabdruck" (56★) — <https://github.com/ianlkl11234s/flight-arc-graph>
- **mini-taiwan-info**: Sieben Thema Taiwans Lage-Überwachung Pult — <https://github.com/ianlkl11234s/mini-taiwan-info>
- **tw-ship-viz**: Schiff AIS Echtzeit-Punkt Visualisierung (11★) — <https://github.com/ianlkl11234s/tw-ship-viz>
- **satellite-arc**: Satelliten Umlaufbahn und Überflug Visualisierung — <https://github.com/ianlkl11234s/satellite-arc>
- **mini-tw-cctv**: Ganzes Taiwan Echtzeit Bilder — <https://github.com/ianlkl11234s/mini-tw-cctv>
- **mini-tw-tra-atlas**: Taiwan-Bahn Netz atlas — <https://github.com/ianlkl11234s/mini-tw-tra-atlas>
- **taiwan-weather-timelapse**: Wetter Zeitraffer — <https://github.com/ianlkl11234s/taiwan-weather-timelapse>
- **gis-data-collectors**: Dahinter 40+ Daten-Sammler Rückgrat — <https://github.com/ianlkl11234s/gis-data-collectors>

**Rede und Mensch**

- **sciwork 2026 Rede Online-Präsentation**: <https://sciwork-showcase.zeabur.app>
- **sciwork 2026 Rede Quellcode**: <https://github.com/ianlkl11234s/0613-sci-work-share>
- **Entwickler GitHub (Migu)**: <https://github.com/ianlkl11234s>
- **Threads**: [@ianlkl1314](https://www.threads.net/@ianlkl1314)

## Referenzen

- Migu，《Mini Taiwan! Taiwans Offendaten von Agenten Zucht eine selbst-wachsende Zahnwerk》，sciwork 2026 / SCIWORK SEMINAR，2026 Juni 13.
- Regierungs-Daten-Offen-Plattform data.gov.tw (Nationale Entwicklungs-Kommission Betrieb, 2013 oben).
- Verkehrs-Daten-Fluss-Dienst Plattform TDX (Verkehrs-Minister, 2022 fünf Verkehrs-Plattform zusammengefasst).
- g0v Null-Zeit-Regierung Gesellschaft und diverses Hackathon Aufnahmen.

## Bild-Quellen

Alle Artikel-Bilder cached in `public/article-images/technology/`, nicht Hot-Link Quelle-Server.

**Fair use Editorial-Kommentar Zweck**: Alle Artikel-Bilder aus Migus sciwork 2026 öffentlich Rede-Präsentation (Quellcode und Online-Präsentation siehe oben Projekt-Links), nach Urheberrecht Gesetz Abschnitt 65 und 17 U.S.C. § 107 fair use vier-Punkte (Nicht-Handels-Bildung Art, bereits öffentlich, Zitat klein, keine Markt Ersatz), als Editorial-Kommentar Zitierung seiner Offendaten-Visualisierung Arbeit. © Migu / sciwork 2026.

Umfasst: Mini Taiwan Pulse 3D Karte (Titel-Bild), Kepler.gl Startpunkt, Taipeh Schiene (Mini Taipeh), Schiff AIS, Satelliten Umlaufbahn, Landwirtschaft×Wasser und Gesundheit Ressourcen Integration, Regen und Katastrophe Zeit-Achse, Atlanta Flughafen Spur Fingerabdruck, Waldbrand Thema Pipeline Produktion, Mini Taiwan Info Pult, Agent Orchestrier System Betrieb-Bild.

---

[^1]: Entwickler Migu Cheng, GitHub-Konto `ianlkl11234s` (Konto erstellt März 2020). Sein GitHub Personal-Bio wurde Juni 2026 von ursprünglichen „Senior Data Analyst, Erkundung AI Automatisierung im alltägliche Arbeit" zu „Gebilde GIS Visualisierungen von Taiwan Offendaten · Erforschen AI Automatisierung im alltägliche Arbeit" umgeschrieben. Diese Phrase „stellt sich raus Taiwan hat so viel Daten, stellt sich raus Umwandlung in Karte nicht schwierig" ist sein sciwork 2026 Rede „TAG 0 erste Karte" Folie wörtlich-Text. Quellen: GitHub API gezogen, 2026-06-25; Rede Präsentation Quellcode `ianlkl11234s/0613-sci-work-share`.

[^2]: mini-taiwan-pulse und „Mini Taiwan" Sternensystem verschiedene Projekt Stern-Zahlen, forks, Letzt-Aktualisierung Zeit, fork Herkunft etc., alles Taiwan.md über GitHub API Juni 25, 2026 gezogen. mini-taiwan-pulse damals 375 stars / 26 forks, June 25, 2026 immer noch pushing; mini-taiwan-learning-project 189 stars; flight-arc-graph 56 stars. Sternensystem umfasst poc-bus-range, gis-data-collectors, tw-ship-viz, satellite-arc, mini-tw-cctv, mini-taiwan-info etc. dutzend Taiwan Offendaten verwandt repo.

[^3]: Migu，《Mini Taiwan! Taiwans Offendaten von Agenten Zucht übernehmen eines selbst-wachsenden Zahnwerk》，sciwork 2026 / SCIWORK SEMINAR，2026 Juni 13. Rede Quellcode: <https://github.com/ianlkl11234s/0613-sci-work-share>; Online Präsentation: <https://sciwork-showcase.zeabur.app>. Dieser Artikel alle Rede Zahlen (data.gov.tw etwa 52.891 Datensätze, Waldbrand Pipeline die 582 → 1.945 → 2.404 → 73.900 Einträge, 21 Plattformen, 113 Jahr ganzes Land Feuer 15.405 Einträge, Neue-Nord-Stadt Elektrisch 30,9%, Pingdong Grafschaft Stummel 35,2%, 5.700+ Busse, 40+ Sammler, über dreihundert Züge, Atlanta Flughafen 1.839 Spuren, Landwirtschaft×Wasser 400MB → etwa 5MB etc.) und alle Zitate („Gehirn schafft Nicht", „Daten LLM sehen, Agent entdecken welche zusammen schauen", „Pipeline selbst-produziert. Ich schrieb keine Zeile", „Ziel geben, Bericht nehmen", „Wenn Agent ganzen Kreislauf selbst läuft bleibt Menschen nur – Aufgabe stellen und Überprüfung", „Ein Worker = eine tmux Seite + unabhängig Session + ein PR", „Jede Station unabhängig Repo, Orchestrier-Schicht nur Fortschritt und Entscheidung", „Experimente-Fortschritt ungefähr halb" etc.), sind alles Migu in diesem Präsentation Aussage und Folie wörtlich-Text, gehörig Rede-Person persönlich These und sein System Produktion, nicht Taiwan.md unabhängig-überprüft Regierungs Statistik.

[^4]: g0v Null-Zeit-Regierung Gesellschaft, 2012 von Mittel-Forschungs-Institut Hackathon „Code verändert Gesellschaft" Geist entsprang; 2020 Wuhan Lungen-Krankheit Zeit Wuhan-Ausbruch Woo-Zhang-Wei etc. von Gesundheitsdienst-Büro frei Masken-Lager Daten in dutzend Stunden machte „Masken Angebot-Nachfrage Echtzeit-Karte", ist Taiwan Bürgerwissenschaft „Tastatur Rettung Vaterland" Bild Fall.

[^5]: Nach GitHub API (2026-06-25 gezogen), `ianlkl11234s/taiwan-md` ist `frank890417/taiwan-md` (Taiwan.md Selbst) fork, aufgebaut 2026 März 22. Taiwan.md Projekt geboren 2026 März Mitte. Migus Zusammenarbeit System Claude Code als Werkzeug-Basis nutzt (sein Rede Quellcode enthält CLAUDE.md, Orchestrator ist „eine Claude Session"), Taiwan.md gleich.

[^6]: Regierungs-Daten-Offen-Plattform data.gov.tw von Nationale-Entwicklungs-Kommission Betrieb, 2013 oben; Verkehrs-Daten-Fluss-Dienst-Plattform TDX von Verkehrs-Minister 2026 Juni fünf Verkehrs-Plattform (Straße, Bahn, Luft, Schiff, Fahrrad) verschmolz; Innen-Minister Gesellschaft-Ökonomie-Daten-Dienst-Plattform (SEGIS) liefert Dorf-Ebene Bevölkerung Daten; Verkehrs-Minister Zentral-Wetter-Institut liefert offen-API. data.gov.tw je Echtzeit Datensatz-Summen Zahlen dieser Runde unabhängig-API-überprüft nicht; dieser Artikel nutze „ungefähr 52.000" Migus Rede Präsentation gezeigt Zahlen.

_Letzt-Überprüfung: 2026-06-25_
