---
title: 'Visuelle Modul-Referenz: 19 Wege, Taiwan-Daten zu visualisieren'
description: 'Live-Beispiele für Taiwans visuelle Artikel-Module — mit echten Taiwan-Daten zu Wohnsituation, Bevölkerung, Gesundheitsversorgung und Parlamentssitzen. Jedes tw-* Modul wird gerendert, zusammen mit den Syntax- und Designprinzipien aus graph.md.'
date: 2026-06-06
category: 'About'
tags:
  ['Datenvisualisierung', 'Wohngerechtigkeit', 'Wohnungspolitik', 'Open Data']
author: 'Taiwan.md'
readingTime: 11
featured: false
lastVerified: 2026-06-12
lastHumanReview: false
image: '/article-images/society/taipei-skyline-housing-2026.webp'
imageCredit: 'Heeheemalu'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg'
relatedDiary: ['2026-07-16-222859-viz-evolution']
translatedFrom: 'About/視覺化模組型錄.md'
sourceCommitSha: '21298a7ae'
sourceContentHash: 'sha256:6617087ac0d0a536'
sourceBodyHash: 'sha256:f6a2ecc9e1606c44'
translatedAt: '2026-09-25T13:10:50+08:00'
---

# Visuelle Modul-Referenz: 19 Wege, Taiwan-Daten zu visualisieren

> **30-Sekunden-Überblick:** Diese Seite ist eine „Live-Beispiel“-Sammlung des Taiwan.md Visualisierungssystems — 19 verschiedene Artikel-Innenvisualisierungen, alle basierend auf echten Taiwan-Daten (Mietpreis-Verhältnis, staatlicher Wohnbau, Alterung, Volksabstimmungen, Pflegekräfte-Belastung, Parlamentssitze). Sie ist die praktische Ergänzung zum Redaktionshandbuch [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md): _graph.md erklärt, wann welches Modul verwendet wird, wie es gestaltet wird und wie die Syntax aussieht — diese Seite zeigt, wie es konkret aussieht._ Jedes Modul wird rein mit HTML/SVG gerendert, sodass Menschen, Screenreader, Google und KI-Crawler dieselben Daten erfassen — genau das ist der Grund, warum wir statische Visualisierungen bevorzugen statt interaktiver Grafiken.

Wenn man einen Artikel über Zahlen schreibt, fürchtet man am meisten, dass die Daten wie eine Kette von Zahlenblöcken aussehen — der Leser schaltet ab, sobald er die dritte Prozentzahl sieht. Die Aufgabe der Visualisierung ist, „dichte Zahlentexte“ in „sofort lesbare Strukturen“ umzuwandeln.

Doch Taiwans Visualisierung hat eine Besonderheit, die andere nicht haben: **Wir erstellen nur Visualisierungen, die auch LLMs verständlich sind.** Ein interaktiver Chart mit D3 oder Canvas mag beeindruckend aussehen, aber GPTBot, PerplexityBot, ClaudeBot und andere KI-Crawler führen kein JavaScript aus — für sie ist ein solches Bild einfach leer. Unsere Grafiken aus semantischem HTML und Inline-SVG enthalten die Daten direkt im Quellcode, lesbar in sechs Sprachen — für Menschen, Screenreader und KI. **Eine Visualisierung, die LLMs versteht, ist eine Visualisierung der Souveränität.**

Die folgenden 19 Module zeigen alles von einfachen „Großzahlen“ bis zu „Stadt-Kacheln“ und „Sitzbögen“. Die vollständige Syntax und Designprinzipien sind in graph.md dokumentiert — hier nur kurz: „Was es ist, wann man es verwendet.“

## Großzahl tw-figure

Einfach und kraftvoll: Eine dramatische Zahl in großem Format, dazu ein Vorher-Nachher-Vergleich. Ideal als „Sledgehammer-Statistik“ am Anfang eines Artikels.

```tw-figure
67.000 → 870.000 / m²
Preis der staatlichen Wohnbautauschung in Taipeh 1985, vs. Durchschnittspreis 2026 — dieselbe Adresse, ca. 13-fach
Registrierte Immobilienverkäufe (staatlicher Wohnbau)
```

## Datenkarten tw-stat

Wenn ein Absatz drei bis vier nebeneinander stehende Schlüsselzahlen enthält, besser als Karten in einer Reihe anordnen — der Leser kann alles auf einen Blick erfassen.

```tw-stat
174.891 Haushalte | Staatlicher Wohnbau | 1976–1999
~390.000 Haushalte | Gesamtstaatswohnungen | bis 2015 stillgelegt
84,4 % | Eigenheimquote | 2024
Quelle: Pressemitteilung des Amt für Wohngeld der Regierung, Immobilieninformationsplattform des Innenministeriums
```

Redaktionsmodule mit Daten (Datenkarten, Vergleichskarten, Policy-Achsen) müssen genauso wie Grafikmodule eine `Quelle:`-Kennzeichnung tragen. Die Website-Überprüfung im Juli 2026 ergab: Alle Module mit automatischem Filter hatten eine 100%-ige Quellenkennzeichnung — die drei häufigsten Module ohne Filter hatten 40 % naked. Jetzt sind sie alle im viz-health-Filter integriert.

## Vergleichskarte tw-versus

Zwei Systeme, zwei Positionen oder vor/nach Zustände nebeneinander — Farbe links warm, rechts kalt, in der Mitte ein „vs“, die Unterschiede Zeile für Zeile lesbar.

```tw-versus
Taiwan staatlicher Wohnbau | Hongkong Wohngesellschaften
Staatliche Subvention, günstiger Verkauf an Mieter | Staatliche Subvention, günstiger Verkauf an Mieter
Nach einem Jahr Mietzeit kann zum vollen Marktpreis verkauft werden | Beim Verkauf am Markt muss zuerst „Ersatzbauherrenpreis“ abgeführt werden
Fast der gesamte Gewinn fällt auf die Privatperson | Gewinne nach ursprünglichem Rabattanteil an den Staatshaushalt abgeführt
Einmalige Abgabe öffentlicher Ressourcen | Öffentliche Erstattung der Subvention
Quelle: Parlamentsprotokolle, Hongkonger Wohngesellschaftsrat
```

## Balken tw-bars

Vergleich oder Ranking weniger Kategorien — horizontale Balken skalieren automatisch mit dem Wert, Maximum füllt die Breite. Denk an eine `Quelle:`-Zeile am Ende, die automatisch als Fußnote erscheint.

```tw-bars
Nationaldurchschnitt 2014 | 8,41-fach
Nationaldurchschnitt 2024 | 10,76-fältig
Taipeh 2024 | 16,60-fach | historisches Rekordhoch
Quelle: Immobilieninformationsplattform des Innenministeriums, Immobilienforschungszentrum der Nationalen Normaluniversität
```

## Waffle-Chart tw-waffle

Anteil eines Teils am Ganzen — 100 Kästchen entsprechen 100 %, intuitiver als Tortendiagramm. Du kannst die Kästchen wirklich zählen. Geeignet für Prozentangaben, die zusammen etwa 100 ergeben.

```tw-waffle
Wohnbestand in Wien (2023)
Städtische Wohneigentümergemeinschaften | 21,9
Gewerbliche Wohneigentümergemeinschaften | 21,4
Eigenheim | 20,4
Private Miete | 36,3
Quelle: Wien Stadt Wohnungsstatistik
```

## Zeitachse tw-timeline

Wichtige Meilensteine von Gesetzen oder Politiken in chronologischer Reihenfolge. Dies ist eine visuelle Unterstützung — es darf nicht mit den Überschriften im Haupttext verwechselt werden (z. B. „1975 …“ als Überschrift).

```tw-timeline
1975 | Einführung des Wohnbaugesetzes | Regierung baute und verkaufte, setzte „Käuferqualifikation“-Schleife, Subventionen flossen nicht zurück
2002 | Die Mauer fiel | Gesetzesänderung: Käuferqualifikation aufgehoben, Wohnbau nach einem Jahr an alle verkaufbar
2015 | Wohnbaugesetz stillgelegt | Offizielle Begründung: Eigenheimquote sei mit 85 % erreicht, jetzt nur noch zur Miete
2026 | Pfledingate wieder eingebaut | bezahlbare Wohnbauten: Wiederverkauf darf nicht über ursprünglicher Anschaffungspreis hinausgehen
Quelle: Parlamentsprotokolle, Pressemitteilung des Amt für Wohngeld der Regierung
```

## Zitatkarte tw-quote

Wenn ein Satz die ganze Kernthematik eines Artikels trifft — vergrößern zur Zitatkarte. Die Anführungszeichen werden vom Modul automatisch hinzugefügt. Zitate müssen wörtlich und nachprüfbar sein.

```tw-quote
Ein Haus für 30 Millionen, das jetzt 60–70 Millionen kostet … Reichtum für die Reichen, der Staat zahlt für diejenigen, die schon genug haben
Lin Chih-chun | Anwalt, 2025 gegen das Vorschlag „Staat finanziert Sanierung der Erfolgswohnungen“
```

## Quellenleiste tw-source

Eine Gruppe von Datenquellen in einem dezenten Chip, platzierbar neben einem Absatz. Glaubwürdigkeit ist Teil des Designs — taiwanesische digitale Medien vergessen oft die Quellenangabe, das ist ein Unterschied, den wir anders machen können.

```tw-source
Immobilieninformationsplattform des Innenministeriums, registrierte Immobilienverkäufe, Immobilienforschungszentrum der Nationalen Normaluniversität, Parlamentsprotokolle, Hongkonger Wohngesellschaftsrat
```

## Erläuterungsbox tw-note

Die Glaubwürdigkeit eines Datenartikels hängt zur Hälfte davon ab, „wie man die Zahlen berechnet hat“. Journalisten nutzen [Erläuterung]-Blöcke für Berechnungsmethoden und (Anmerkungen) für Korrekturen — wir haben dieses Prinzip als Modul umgesetzt. Die erste Zeile beginnt mit `Erläuterung` / `Methode` / `Anmerkung` / `Korrektur` / `Aktualisierung`, jede weitere Zeile ist ein Absatz.

```tw-note
Erläuterung
Der „Alterungsindex“ auf dieser Seite = Bevölkerung 65+ ÷ Bevölkerung 0–14 × 100. 100 bedeutet: so viele Senioren wie Kinder — je höher der Wert, desto „kopflastiger“ wird es.
Die Alterungsrate und der Alterungsindex stammen von der Bevölkerungsstatistik des Innenministeriums zum 31. Dezember 2025; die vollständige Analyse aller 22 Städte und Regionen siehe [Taiwan-Daten: 22 Städte im Vergleich].
```

## Liniendiagramm tw-line

Mindestens vier Zeitpunkte für Trends — gezeichnet mit Inline-SVG, y-Achse mit Min/Max-Werten sichtbar. Wichtig: **es wird automatisch eine versteckte Tabelle generiert**, die Screenreader und KI-Crawler lesen können. Das Bild ist für Menschen, die Text für Maschinen — beides aus derselben Quelle.

```tw-line
Zehnjähriger Anstieg des Immobilienpreis-Verhältnisses (fache)
Jahr | Nationaldurchschnitt
2014 | 8,41
2016 | 9,32
2018 | 8,57
2020 | 9,20
2022 | 9,61
2024 | 10,76
Basis: 2014 Startwert | 8,41
Quelle: Immobilienforschungszentrum der Nationalen Normaluniversität, Immobilieninformationsplattform des Innenministeriums
```

Liniendiagramme unterstützen auch **Referenzlinien**: eine Zeile `Referenz: Beschriftung | Wert` erzeugt eine gestrichelte Linie ohne Endpunkte, nur mit Beschriftung — visuell klar von den tatsächlichen Daten getrennt. Der Leser verwechselt keine feste Schwelle mit gemessenen Werten.

## Slope-Graph tw-slope

Bei nur zwei Zeitpunkten verschwendet ein Liniendiagramm den leeren Raum dazwischen. Der Slope-Graph verbindnet direkt die beiden Enden — die Steigung sagt alles: wer stärker angestiegen ist, wer eingeholt hat. Mit `*` am Zeilenanfang kann man eine Zeile hervorheben, der Rest wird grau zur Kontextualisierung.

```tw-slope
Immobilienpreis-Verhältnis: Wer ist in zehn Jahren am stärksten angestiegen (fache)
2014 | 2024
Nationaldurchschnitt | 8,41 | 10,76
*Taipeh | 12,0 | 16,60
Quelle: Immobilieninformationsplattform des Innenministeriums, Immobilienforschungszentrum der Nationalen Normaluniversität
```

## Heatmap tw-heatmap

Matrixvergleich: Region × Indikator oder Jahr × Kategorie. Jede Spalte wird normalisiert auf Farbskala — je höher der Wert, desto wärmer die Farbe. Da es selbst eine HTML-Tabelle ist, ist es von Natur aus KI-lesbar — genau deshalb ist das Heatmap-Modul in unserem System besser als „einfarbiges Bild“.

```tw-heatmap
Stadt | Immobilienpreis-Verhältnis (fach) | Hypothekenbelastungsquote (%)
Taipeh | 16,60 | 63,9
Xinbei | 13,03 | 56,9
Taichung | 11,11 | 48,0
Taoyuan | 9,0 | 40,0
Quelle: Immobilieninformationsplattform des Innenministeriums
```

## Punktdiagramm tw-dot

Balken zeigen „Menge“, Punktdiagramme zeigen „Verteilung“: Alle Punkte liegen auf derselben Skala — du siehst, wer dicht beieinander liegt, wer Ausreißer ist. Eine Zeile = Dot-Strip; zwei Werte zeichnen eine Linie von „hier nach dort“; drei Werte (`Schätzung | Untergrenze | Obergrenze`) ergeben ein Meinungsforschungsdiagramm mit Konfidenzband. ±3 % Stichprobenfehler darf nicht verschwinden — besonders in Wahlen. `*` funktioniert genauso zur Hervorhebung.

```tw-dot
Die beiden Pole der Alterung: Jüngste bis älteste Stadt (65+ Anteil an Bevölkerung, %)
Hsinchu County | 15,08 | jüngste Stadt Taiwans
Taoyuan | 16,72
Taichung | 17,40
Xinbei | 19,95
Tainan | 20,48
Kaohsiung | 20,79
*Chiayi County | 24,11 | älteste Stadt Taiwans
*Taipeh | 24,18 | älteste Großstadt
Quelle: Bevölkerungsstatistik des Innenministeriums, 31. Dezember 2025
```

## Stapeldiagramm tw-stack

Waffle eignet sich für „Gesamtheit einer Sache“; Stapeldiagramm eignet sich für **„Vergleich mehrerer Sätze“** — jede Zeile wird automatisch auf 100 % normalisiert, bei genügend Breite erscheinen die Werte direkt im farbigen Block.

```tw-stack
Drei Atomkraft-Wahlen: Ja vs. Nein (gültige Stimmenanteile %)
Volksabstimmung | Ja | Nein
2018 Atomstrom statt Atomstrom | 59 | 41
2021 Atomkraftwerk 4 wieder starten | 47 | 53
2025 Atomkraftwerk 3 weiterlaufen lassen | 74 | 26
Quelle: Offizielle Ergebnisse der drei Volksabstimmungen des Zentralwahlrats
```

## Bevölkerungspyramide tw-pyramid

Rückwärts aufgestellte Balken — zwei Gruppen gegenüber, gemeinsame Beschriftung in der Mitte. Klassisches Bevölkerungsdiagramm. Hier zeigt es die „Kopf-lastigen“ sechs Städte: Links Kinder, rechts Senioren — ein Blick vergleicht die Altersstruktur.

```tw-pyramid
Kopf-lastige sechs Städte: Anteil junger vs. alter Menschen (%)
Stadt | 0–14 Jahre | 65+ Jahre
Hsinchu County | 14,80 | 15,08
Taoyuan | 13,13 | 16,72
Taichung | 12,75 | 17,40
Taipeh | 11,97 | 24,18
Keelung | 9,28 | 22,28
Chiayi County | 8,27 | 24,11
Quelle: Bevölkerungsstatistik des Innenministeriums, 31. Dezember 2025; Anteil junger Menschen abgeleitet aus Alterungsrate ÷ Alterungsindex × 100
```

## Stadt-Kacheln tw-tiles

Zwei alte Probleme bei Taiwan-Karten: Hualien und Taitung sind so groß, dass sie visuell dominieren; KI-generierte Taiwan-Formen sehen oft wie „Oliven- oder Kartoffelform“ aus. Kacheln platzieren 22 Städte in gleich großen Kästern (Layout ist im System festcodiert, Positionen entsprechen der Realität), jede Kachel ist gleich schwer, Zahlen direkt darauf. Die Form ist immer korrekt — weil sie gar keine Form hat.

```tw-tiles
Alterungsrate aller 22 Städte (65+ Anteil, %)
Taibei | 24,18
Xinbei | 19,95
Taoyuan | 16,72
Taichung | 17,40
Tainan | 20,48
Kaohsiung | 20,79
Keelung | 22,28
Hsinchu | 16,16
Chiayi | 19,90
Hsinchu County | 15,08
Miaoli County | 20,23
Changhua County | 20,37
Nantou County | 22,66
Yunlin County | 21,76
Chiayi County | 24,11
Pingtung County | 21,84
Yilan County | 20,77
Hualien County | 21,52
Taitung County | 20,93
Penghu County | 21,03
Kinmen County | 19,69
Lienchiang County | 17,14
Quelle: Bevölkerungsstatistik des Innenministeriums, 31. Dezember 2025
```

## Symbol-Diagramm tw-iso

„174.891 Haushalte“ ist eine Zahl, die man vergisst — aber neun Kreise, die man mit den Fingern zählen kann, nicht. Symbol-Diagramme übersetzen große Zahlen in zählbare Einheiten: „Ein Symbol = Wie viele“. Dies ist die Philosophie, die Journalisten beim Schreiben über industrielle Fischerei entwickelt haben: Große, unverständliche Zahlen in verständliche Einheiten übersetzen. Symbole nur als ganze Zahlen (keine halben), genauer Wert daneben.

```tw-iso
Wie viele staatliche Wohnbauten hat die Regierung in 24 Jahren gebaut
Einheit: ● = 20.000 Haushalte
Staatlicher Wohnbau | 174.891 Haushalte | 1976–1999
Gesamtstaatswohnungen | ~390.000 Haushalte | bis 2015 stillgelegt
Quelle: Pressemitteilung des Amt für Wohngeld der Regierung
```

## Sitzbogen tw-arc

Parlamentarische Sitze haben ihr eigenes Diagramm: Halbkreis mit Punkten — eine Sitz = ein Punkt, Parteien in Reihenfolge angeordnet. Kreisdiagramme vergleichen Winkel (was Augen schlecht wahrnehmen); Sitzbögen lassen dich direkt zählen, die Mehrheitslinie ist genau dort, wo sie hingehört. Hier: 2024 Parlamentswahlen, 113 Sitze, drei Parteien ohne Mehrheit — die gestrichelte Linie ist der Startpunkt der späteren Massenentfernung. Hinweis: Es ist ein Parlamentsdiagramm — für „ein Kandidat pro Wahlkreis“-Wahlen wie Bürgermeister, nutze die Stadt-Kacheln unten.

```tw-arc
2024 Parlamentarier: Drei Parteien ohne Mehrheit (113 Sitze)
Mehrheit: 57
Kuomintang | 52
Demokratische Fortschrittspartei | 51
Taiwan Volkspartei | 8
Ohne Parteizugehörigkeit | 2 | leicht pro-blau
Quelle: Zentraler Wahlsrat
```

## Kleinskaliertes Raster tw-multiples

Ein Diagramm mit fünf Linien verpackt — die Linien verheddern wie Spaghetti. Kleinskaliges Raster packt jede Linie in ein eigenes Kästchen — **alle Kästchen teilen sich dieselbe Skala**, sodass Formen verglichen werden können. Hier: drei Schichten der Pflegekräftebelastung — das Heatmap oben gibt dir die genaue Matrix, das kleine Raster zeigt: „Jede Schicht steigt in die Nacht, die Grundschicht am stärksten.“ Dieselben Daten, andere Frage — anderes Diagramm.

```tw-multiples
Je tiefer die Nacht, desto mehr Pflegekraft-Belastung in Krankenhäusern (Anzahl der Betten pro Pflegekraft)
Spalte: Schicht | Pflegekräftebelastung
--- Medizinisches Zentrum
Tag | 6
Nachtdienst | 9
Schicht | 11
--- Regionales Krankenhaus
Tag | 7
Nachtdienst | 11
Schicht | 13
--- *Kleines Krankenhaus
Tag | 10
Nachtdienst | 13
Schicht | 15
Quelle: Ministerium für Gesundheit und Soziales, Standard für Pflegekräftebelastung 2024
```

## Wie man diese Module verwendet

Jedes Modul ist ein ` ```tw-* ` Block im Markdown des Artikels, Spalten durch `|` getrennt — beim Erstellen wird es automatisch in das oben gezeigte Format umgewandelt. Autoren müssen kein HTML oder JavaScript schreiben. Die vollständige Syntax, wann welches Modul verwendet wird, wie man Farben und Achsen richtig gestaltet (ohne irreführend zu sein) und die Checkliste vor Veröffentlichung — alles ist in [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md).

Unser System orientiert sich an der redaktionellen Philosophie von [The Pudding](https://pudding.cool/) — Fragen zuerst, klare Schlüsse, Quellen im Fokus — aber angepasst an Taiwan.md: statisch, mehrsprachig, KI-lesbar. Der vollständige Design-Kontext steht in [Bericht über das Visualisierungssystem](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md).

Um zu sehen, wie diese Module in einem echten Tiefenartikel eingesetzt werden, lies [Staatlicher Wohnbau und Wohngerechtigkeit](/society/國宅與居住正義) — die meisten Zahlen auf dieser Seite stammen aus dieser Analyse.

## Das System entwickelt sich weiter

Diese Seite ist das Ergebnis der dritten Iteration. Da es eine Seite über Zeitleisten ist, erzählen wir unsere eigene Geschichte mit dem Policy-Achsen-Modul:

```tw-timeline
2026-06-06 | Zehn Module geboren | Nach Studium der Theorie von The Pudding und FT, entstanden die ersten: Großzahl, Vergleichskarte, Balken, Liniendiagramm
2026-06-12 | Eine Woche später: 17 Module | Ergänzt: Slope, Punktdiagramm, Stapel, Pyramide, Stadt-Kacheln, Symbol-Diagramm; viz-shot Pixelprüfung gleichzeitig geboren, weil „Markup existiert“ und „optisch korrekt“ zwei verschiedene Dinge sind
2026-07-16 | 19 Module, jetzt in sechs Sprachen | Sitzbogen und kleines Raster hinzugefügt; Systemzeichenketten in sechs Sprachen gerendert, chinesische und japanische sowie koreanische Stadtkacheln verlieren nicht mehr an Balkenform
Quelle: Taiwan.md Bericht über Design und Entwicklung des Visualisierungssystems (Juni–Juli 2026, auf GitHub veröffentlicht)
```

Der Schwerpunkt der dritten Iteration ist nicht neue Diagramme, sondern eine ehrliche Selbstprüfung. Die Website-Überprüfung ergab: Alle Module mit automatischem Filter hatten 100 % Quellenkennzeichnung — die drei häufigsten Module ohne Filter hatten 40 % naked. Die Regeln standen zwei Monate im Redaktionshandbuch, das Verhalten folgte jedoch vollständig dem Aussehen der Instrumente — daher wurden die Instrumente erweitert, bis sie der Regel entsprachen. In derselben Runde wurde auch entdeckt, dass Systemzeichenketten auf englischen, japanischen und koreanischen Seiten immer als Chinesisch gerendert wurden — sogar ein vereinfachtes Chinesisch-Zeichen war in Barrierefreiheitsbeschriftungen unsichtbar geblieben. Für ein System, das behauptet, „Taiwan-Daten in sechs Sprachen für LLMs lesbar zu machen“, sind diese Ecken wichtiger als neue Funktionen.

Neuere Forschung hat diesen Ansatz bestätigt: Die Genauigkeit, mit der multimodale KI Diagrammzahlen aus Bildern rekonstruiert, ist begrenzt — Textknoten sind das, was Maschinen wirklich stabil lesen können. Genau deshalb stehen Zahlen direkt auf den Kacheln und jede Grafik hat eine versteckte Tabelle. Der vollständige Forschungsprozess und die Designentscheidungen sind in [Visuelle Systeme v3.0: Forschung und Implementierung](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md) dokumentiert.

**Weiterführende Literatur:**

- [Staatlicher Wohnbau und Wohngerechtigkeit](/society/國宅與居住正義) — Die vollständige Geschichte hinter diesen Wohndaten: Wie staatlicher Wohnbau von günstigen Wohnungen zu einer Rendite-Maschine wurde. Die meisten Zahlen auf dieser Seite stammen von dort.
- [Taiwan-Daten: 22 Städte im Vergleich](/de/geography/data-taiwan-22-cities) — Alle Alterungsdaten in Punktdiagrammen, Pyramiden und Stadtkacheln stammen aus der vollständigen Analyse dieser 22 Städte.
- [Taiwan und Atomenergie](/de/society/taiwan-nuclear-debate) — Die vollständige Geschichte der drei Atomkraft-Volksabstimmungen: Debatten gewonnen, System verloren.
- [Gesundheitsreform](/society/醫療法) — Die vollständige Geschichte der drei Schichten der Pflegekräftebelastung: Was das Gesetz schreiben kann, was es nicht schreiben kann.
- [Massenentfernung](/history/大罷免) — Was nach der gestrichelten Mehrheitslinie im Sitzbogen geschah: Wie das Parlament ohne Mehrheit zu 31 Entfernungsfällen kam.
- [Taiwan-Krise der Geburtenrate](/de/society/taiwan-low-birth-rate-crisis) — Wo man ein Haus nicht mehr kauft und kein Kind mehr bekommt: Die andere Seite der Generationengerechtigkeit.

## Bildnachweise

Dieser Artikel verwendet 1 Bild unter Creative Commons-Lizenz, im Cache unter `public/article-images/society/`:

- [Taipeher Wohnturm-Horizont (von Xiulin Berg)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Foto: Heeheemalu, 2026, CC BY-SA 4.0 (Hero-Bild)

## Quellenangaben

[^1]: [Immobilieninformationsplattform des Innenministeriums](https://pip.moi.gov.tw/Publicize/Info/E1050) — Offizielle Wohnungsstatistiken wie Immobilienpreis-Verhältnis, Hypothekenbelastungsquote, Eigenheimquote.

[^2]: [Immobilienforschungszentrum der Nationalen Normaluniversität](https://rer.nccu.edu.tw/article/detail/2210058908437) — Jahresindizes der Wohngeld- und Immobilienbelastung; die Liniendiagramme und Balken auf dieser Seite stammen von dort.

[^3]: [Pressemitteilung des Amt für Wohngeld der Regierung](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Offizielle Statistik der staatlichen Wohnbauten (ca. 390.000 Haushalte).

[^4]: [Bevölkerungsstatistik des Innenministeriums](https://www.ris.gov.tw/app/portal/346) — Alterungsrate und Alterungsindex aller 22 Städte zum 31. Dezember 2025; die Daten für Punktdiagramme, Pyramiden, Stadtkacheln und Erläuterungsboxen stammen von dort. Vollständige Quellenkette siehe [Taiwan-Daten: 22 Städte im Vergleich](/de/geography/data-taiwan-22-cities).

[^5]: [Zentraler Wahlsrat: Volksabstimmung 2018, Fall 16 (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — Offizielle Ergebnisse der drei Atomkraft-Volksabstimmungen (59 % / 47 % / 74 % Ja-Anteile). Vollständige Quellenkette siehe [Taiwan und Atomenergie](/de/society/taiwan-nuclear-debate).

[^6]: [Zentrales Nachrichteninstitut: 2024 Parlamentswahlen — Drei Parteien ohne Mehrheit](https://www.cna.com.tw/news/aipl/202401130361.aspx) — Die 113 Sitze (Kuomintang 52, DPP 51, TPP 8, unabhängig 2) sind offiziell vom Zentralen Wahlsrat bestätigt. Vollständige Quellenkette siehe [Massenentfernung](/history/大罷免).

[^7]: [Ministerium für Gesundheit und Soziales: Standard für Pflegekräftebelastung 2024](https://www.mohw.gov.tw/) — Die drei Schichten der Pflegekräftebelastung in drei Krankenhaus-Typen. Vollständige Quellenkette siehe [Gesundheitsreform](/society/醫療法).
