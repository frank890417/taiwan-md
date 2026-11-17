---
title: 'NVIDIA in Taiwan: Das wertvollste Unternehmen der Welt, ohne einen einzigen selbst hergestellten Chip'
description: 'Auf der Computex im Mai 2025 erschien Jensen Huang in seiner ikonischen Lederjacke, während im Hintergrund die Logos von 55 taiwanischen Unternehmen aufleuchteten – ein US-Unternehmen, das öffentlich die gesamte Industrie der Insel als seinen eigenen Körper deklarierte. Von dem Brief an Morris Chang im Jahr 1996 bis hin zu einer Marktkapitalisierung von über fünf Billionen US-Dollar und den NT$4,434 Milliarden, die die Stadtverwaltung Taipeh aufwandte, um ihm ein Grundstück freizumachen: NVIDIA hat seinen gesamten Organismus in Taiwan deponiert. Taiwan hält dadurch den Schalter in der Hand, den die Welt nicht umlegen kann, doch die Bruttomarge liegt nur bei 5 %, Wasser- und Stromressourcen werden aufgezehrt und das Kriegsrisiko ist auf der Insel konzentriert: Unverzichtbar zu sein bedeutet nicht gleichbedeutend, dass Taiwan das Sagen hat.'
date: 2026-06-22
category: 'Technology'
tags:
  [
    'NVIDIA',
    'Nvidia',
    'Jensen Huang',
    'KI',
    'Halbleiter',
    'TSMC',
    'Lieferkette',
    'Silicon Shield',
    'Künstliche Intelligenz',
    'Computex',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-22
lastHumanReview: false
researchReport: 'reports/research/2026-06/NVIDIA在台灣.md'
relatedDiary: ['2026-06-22-143854-nvidia-taiwan']
image: '/article-images/technology/computex-jensen-huang-2016.webp'
translatedFrom: 'Technology/NVIDIA在台灣.md'
sourceCommitSha: '1ec0df23b'
sourceContentHash: 'sha256:533b8db87f48f6de'
sourceBodyHash: 'sha256:8a6bcaa4a83cff70'
translatedAt: '2026-11-02T02:12:40.468018+00:00'
---

# NVIDIA in Taiwan: Das wertvollste Unternehmen der Welt, ohne einen einzigen selbst hergestellten Chip

> **30-Sekunden-Überblick:** NVIDIA ist das wertvollste Unternehmen der Erde; am 29. Oktober 2025 durchbrach die Marktkapitalisierung die Marke von fünf Billionen US-Dollar[^1]. Dennoch besitzt es keine einzige eigene Waferfabrik. Jeder KI-Chip wird von TSMC gefertigt, und jeder KI-Server wird von Hon Hai, Quanta oder Wistron montiert – Taiwan übernimmt etwa 90 % der weltweiten Auftragsfertigung für KI-Server[^2]. Diese Abhängigkeit ist so tiefgreifend, dass NVIDIA bereits der größte Kunde von TSMC ist (19 % des Umsatzes)[^3] und die Chiparchitektur des Unternehmens letztlich durch die Packaging-Ausbeute in Taiwan beeinflusst wird[^4]. Das Problem dabei: Die Kontrolle über die Lebensader anderer zu halten, und selbst am Erfolg teilzuhaben, sind zwei verschiedene Dinge. Während NVIDIA eine Bruttomarge von 75 % erzielt, liegt sie bei den taiwanischen ODM-Herstellern nur bei 5 % bis 8 %[^5]. Dieser Artikel beleuchtet, wie diese ungleiche Beziehung zu ihrer heutigen Form gewachsen ist.

![Jensen Huang hält eine Rede auf der Computex Taipei Bühne, trägt sein Markenzeichen-Oberteil in dunkler Farbe, hinter ihm befindet sich eine große Projektionswand, das Publikum ist voll besetzt](/article-images/technology/computex-jensen-huang-2016.webp)
_Jensen Huang bei einer Rede auf der Computex Taipei im Jahr 2016. Seit 2023 kehrt er fast jedes Jahr zu dieser Messe zurück, um die neuesten KI-Chips von NVIDIA vorzustellen – vor einem Publikum, in dem die gesamte taiwanische Lieferkette sitzt, die diese Chips für ihn fertigt. Foto: NVIDIA Taiwan, 2016._

Am 19. Mai 2025, im Taipei Nangang Exhibition Center: Jensen Huang betritt in seiner charakteristischen Lederjacke die Hauptbühne der Computex. Hinter ihm leuchtet eine riesige Rückwand auf, die eine Logo-Wand zeigt: Advantech, Accton, Delta Electronics, Gigabyte, Quanta, Wistron, Wiwynn, Hon Hai, MediaTek, TSMC, UMC ... eines nach dem anderen, bis schließlich die Logos von 55 taiwanischen Unternehmen fixiert sind[^6]. Zusammen mit dem Danksagungsvideo der Veranstaltung wurden insgesamt 122 taiwanische Firmen namentlich erwähnt[^6].

Es war das erste Mal, dass die Menschen in Taiwan ihre gesamte Industrie durch das „Abrufen“ eines einzigen US-Unternehmens als Ganzes „sahen“.

Der Stolz ist real, doch diese Wand wirft eine unausgesprochene Frage auf: Jedes Logo an dieser Wand arbeitet für dieses eine US-Unternehmen, während die wahre Macht bei der Person liegt, die diese Wand präsentiert hat – und nicht an der Wand selbst.

<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/TLzna9__DnI"
    title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025 (Offizielles vollständiges Video)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>

_Die vollständige Version der COMPUTEX-Keynote von Jensen Huang am 19. Mai 2025 (offizieller NVIDIA-Kanal). In dieser Rede wurde die Logo-Wand mit den 55 taiwanischen Unternehmen präsentiert und angekündigt, dass NVIDIA sein Auslands-Hauptquartier in Taipeh ansiedeln wird._

## Ein Unternehmen, das nichts herstellt, ist zum wertvollsten der Welt geworden

NVIDIA ist das Paradebeispiel für das „Fabless“-Modell (ohne eigene Fabriken) in seiner extremsten Form. Das Unternehmen entwirft Chips, baut aber keine Fabriken, kauft keine Lithografiemaschinen und produziert keinen einzigen Wafer selbst. Ein Imperium mit einer Marktkapitalisierung von fünf Billionen US-Dollar besitzt nicht eine einzige eigene Halbleiterfabrik.

Es lagert den gesamten Herstellungsprozess an eine Insel am anderen Ende des Pazifiks aus.

![Mikroskopische Aufnahme eines NVIDIA Ampere GA102 GPU-Chips, die dichte Schaltkreisstrukturen zeigt](/article-images/technology/nvidia-ampere-ga102-die.webp)
_Mikroskopische Aufnahme des Die eines NVIDIA Ampere GA102-Chips, hergestellt im 8-nm-Prozess von TSMC. NVIDIA hat ihn entworfen, aber jede einzelne der unzähligen Linien darauf wurde in Fabriken in Taiwan geätzt. Foto: Fritzchens Fritz, CC0._

Die profitabelsten Chips (H200, Blackwell und der kommende Rubin) sind vollständig auf die 3-nm- und 4-nm-Prozesse von TSMC angewiesen[^7]. In seinem Geschäftsbericht an die US-Börsenaufsichtsbehörde SEC räumt NVIDIA diese Konzentration schwarz auf weiß ein: Die Lieferkette des Unternehmens konzentriert sich hauptsächlich auf die Region Asien-Pazifik und nutzt Auftragsfertiger wie TSMC zur Produktion von Halbleiterwafern[^8]. Dieser Satz steht in den offiziellen Rechtsdokumenten des Unternehmens gegenüber der SEC. Mit anderen Worten: NVIDIA selbst stuft Taiwan als seine größte geopolitische Risikoquelle ein.

Die Fertigung der Chips allein reicht nicht aus. Damit eine GPU zu einem Rechenwerk wird, muss sie erst durch fortschrittliches Packaging (Verkapselung) und anschließend in einen Server eingebaut werden. Das CoWoS-Packaging von TSMC ist derzeit der globale Flaschenhals; NVIDIA beansprucht allein etwa 60 % der weltweiten CoWoS-Kapazität (taiwanesische Medien schätzen den Anteil sogar auf bis zu 70 %) [^9]. Die verpackten Chips werden dann an taiwanesische Unternehmen zur Montage übergeben: Ingrasys von Hon Hai fertigt das GB200 NVL72 Rack-System; laut Schätzungen von E.SUN Securities hält das Unternehmen einen Marktanteil von über 40 % bei der Montage von KI-Racks[^10]. Quanta fertigt Cloud-Server und hält mehr als die Hälfte des Marktanteils bei den Top-50-Rechenzentren[^11]; Wistron hat seine neue KI-Fabrik in Zhubei fast vollständig durch Aufträge von NVIDIA ausgelastet[^12].

```tw-stat
75,0 % | NVIDIAs Bruttomarge für das Geschäftsjahr 2025 | SEC-Jahresbericht
19 %   | NVIDIAs Anteil am Umsatz von TSMC 2025 | Hat Apple als größten Kunden überholt
~90 %  | Taiwans Anteil an der weltweiten KI-Server-Lohnfertigung | Inklusive US-Markenlieferanten 100 %
~60 %  | NVIDIAs Anteil an der TSMC CoWoS-Packaging-Kapazität | Taiwanische Medien schätzen auf 70 %
Quelle: NVIDIA SEC 10-K, TrendForce, MIC (Institute for Information Industry), Wirtschaftsministerium
```

Taiwan hält 90 % des weltweiten Marktes für die Lohnfertigung von KI-Servern; rechnet man die Zulieferer US-amerikanischer Marken hinzu, sind es 100 %[^2]. Das bedeutet, dass fast jede physische Maschine auf der Welt, die KI-Berechnungen durchführt, die Hände von Menschen aus Taiwan passiert hat.

Legt man diese Zahlen übereinander, tritt der zentrale Widerspruch zutage: **Das wertvollste Unternehmen der Welt stellt nichts selbst her, weil sein gesamter „Körper“ in Taiwan verwahrt wird**. Taiwan ist der Schalter, den NVIDIA nicht umlegen kann.

Doch die Lebensader eines Menschen zu halten und von diesem Menschen Geld zu verdienen, sind zwei verschiedene Dinge. Hinter den 55 Logos auf der nächsten Wand verbirgt sich die Antwort.

## Hinter der Logo-Wand liegt das Tal der „Smiley Curve“

In der Fertigungsindustrie gibt es die altbekannte „Smiley Curve“: Die Enden sind hoch, die Mitte ist niedrig. Wer die beiden Enden – Markenführung, Design und Technologie – kontrolliert, erzielt hohe Gewinne; wer für den mittleren Teil, die „Montage und Fertigung“, zuständig ist, arbeitet mit den geringsten Margen. Genau in diesem mittleren Abschnitt befindet sich der Standort Taiwan.

NVIDIAs Bruttomarge für das gesamte Geschäftsjahr 2025 betrug 75,0 %, eine Zahl, die das Unternehmen so bei der SEC gemeldet hat[^5]. Im gleichen Zeitraum sahen die Bruttomargen der taiwanischen Unternehmen, die die Server für NVIDIA montieren, wie folgt aus: Hon Hai 6,18 %, Quanta 4,78 % (der niedrigste Wert seit fast 15 Quartalen), Wistron 5,21 % und Wiwynn 7,2 %[^13]. NVIDIAs Marge ist etwa zwölfmal so hoch wie die von Hon Hai und sechzehnmal so hoch wie die von Quanta.

```tw-bars
Wer nimmt den Gewinn mit: Bruttomargen in der KI-Lieferkette (%)
*NVIDIA | 75,0 | Design, Marke, CUDA-Ökosystem
Delta Electronics | 37,0 | Stromversorgung, Kühlung (Technologie-Ende)
Unimicron | 21,3 | ABF-Substrate (Technologie-Ende)
Wiwynn | 7,2 | Servermontage
Hon Hai | 6,18 | Rack-Systemmontage
Wistron | 5,21 | Servermontage
Quanta | 4,78 | Cloud-Servermontage
Quelle: NVIDIA SEC 10-K, Geschäftsberichte der jeweiligen Unternehmen (Quartale FY2025–FY2026)
```

In dieser Grafik verbirgt sich eine kontraintuitive Tatsache: Bei taiwanischen Unternehmen gilt: Je näher man an der reinen „Montage“ ist, desto geringer ist die Marge; je näher man an der „Technologie“ ist, desto höher ist sie. Delta Electronics, das Stromversorgung und Kühlung herstellt, liegt bei 37 %, während Unimicron, das ABF-Substrate fertigt, auf geschätzte 21,3 % kommt[^14]. Der Unterschied liegt nicht darin, ob es sich um ein taiwanisches Unternehmen handelt, sondern darin, „an welcher Stelle der Kurve man steht“. In der Phase der Montage ist die Marge für jeden gleichermaßen gering.

> 📝 **Anmerkung des Kurators**: Morgan Stanley hat im Mai 2026 eine noch schärfere Rechnung aufgemacht – die wertschöpfende Bruttomarge der ODM-Hersteller bei der Montage ganzer Systemlösungen sank von 2,7 % bei der vorherigen GB300-Rack-Generation auf nur noch 1,9 % bei der nächsten VR200-Generation[^15]. Das bedeutet: Jedes Mal, wenn NVIDIA einen stärkeren neuen Chip auf den Markt bringt, müssen die taiwanischen Unternehmen mehr Kapital vorstrecken, während ihre Gewinnmarge sinkt. Je weiter diese Lieferkette voranschreitet, desto flacher wird der Boden dieser Kurve gedrückt. Das Logo an der Wand wirkt glanzvoll, doch die Marge am Boden der Kurve ist karg – beides kann gleichzeitig wahr sein.

Stolz und Preis werden entlang derselben Kette auseinandergerissen. Aufgrund des KI-Booms lag das Wirtschaftswachstum Taiwans im Jahr 2025 bei etwa 7,37 %, was das schnellste Wachstum seit fünfzehn Jahren bedeutet und Taiwan in die Weltspitze katapultiert[^16]. Doch der Wirtschaftswissenschaftler Jiang Min-hua weist auf eine ernüchternde Zahl hin: Die meisten Taiwaner spüren die Vorteile dieses wirtschaftlichen Aufschwungs nicht[^16]. Die obersten 10 % der Einkommensbezieher entnehmen 48 % des gesamten Einkommens in Taiwan, während die untersten 50 % nur 12 % erhalten[^16]. Umgerechnet ist das Pro-Kopf-Einkommen der oberen 10 % zwanzigmal so hoch wie das der unteren 50 %.

Ein Gastbeitrag eines Reporters vom Juni 2026 beschreibt diese K-förmige Divergenz noch konkreter: Die „direkten Beschäftigten in der Hauptwachstumskette aus KI, Halbleitern und Elektroniklieferketten machen weniger als 10 % der gesamten Erwerbstätigen aus“[^17]. Jemand, der in der Gastronomie arbeitet und ein monatliches Gesamtgehalt von NT$38.484 bezieht, verdient nur 34,6 % dessen, was in der Herstellung elektronischer Komponenten gezahlt wird[^17]. Die KI-Dividende ist real, aber sie konzentriert sich in den Händen des Kapitals und einer kleinen Gruppe von Ingenieuren; die meisten Menschen stehen außerhalb der Welle und schauen nur zu.

Dies ist die erste Ebene der Bedeutung von „unverzichtbar zu sein bedeutet nicht, das Sagen zu haben“: Taiwan hält zwar den Schalter in der Hand, bekommt aber nur die 5 % ab.

## Taiwan hat es einst aufgefangen, hätte es aber auch fast ruiniert

Um zu verstehen, wie diese ungleiche Beziehung begann, muss man zurück in die späten 1990er Jahre gehen, als NVIDIA noch gegen den Tod rannte.

NVIDIA wurde 1993 gegründet und stand in den ersten Jahren mehrfach kurz vor dem Bankrott. Als im August 1997 der RIVA 128-Grafikchip auf den Markt kam, reichte das Geld auf dem Firmenkonto „nur noch für einen Monatslohn“ [^18]. In jener Zeit begann Jensen Huang jede monatliche Betriebsversammlung mit demselben englischen Leitspruch: Unser Unternehmen ist nur noch dreißig Tage vom Bankrott entfernt [^18]. Dieser Satz wurde später zum internen Glaubensbekenntnis von NVIDIA, aber er war nie ein chinesischer Spruch.

Was NVIDIA damals wirklich aus dieser Krise rettete, waren 5 Millionen US-Dollar von SEGA, nicht Taiwan [^19]. Dies muss klargestellt werden, da die Aussage „Taiwan hat NVIDIA gerettet“ oft zu romantisiert wird.

Die Rolle, die Taiwan spielte, war eine andere: die Lebensader der Fertigung. Etwa im Jahr 1996 schrieb der damals 32-jährige Jensen Huang einen Brief an den TSMC-Gründer Morris Chang mit der Frage, ob TSMC die Chips für NVIDIA im Auftrag produzieren könne [^20]. Mi Yu-jie von TSMC erinnerte sich später im Jahr 2025 daran, dass diese „tiefgreifende Zusammenarbeit in einem entscheidenden Moment begann, nämlich 1997“, als „Morris Chang persönlich den NVIDIA-Gründer Jensen Huang kontaktierte, um auf die Anfrage nach Auftragsfertigungsdiensten von NVIDIA zu reagieren“ [^21]. Im Jahr 1998 unterzeichneten beide Seiten offiziell den Vertrag, womit TSMC zum Haupt-Foundry-Partner von NVIDIA wurde [^20]. Mit dieser Arbeitsteilung – „Design im Silicon Valley, Fertigung durch TSMC“ – wurde der physische Kern von NVIDIA fortan an diese Insel gebunden.

> 💡 **Wussten Sie schon?**: Einer verbreiteten Version nach rief Jensen Huang aufgeregt die Leute um sich an, sie sollten leise sein, weil Morris Chang am Telefon sei [^22]. Diese Szene ist eine Sekundärüberlieferung und der Tonfall mag nicht exakt sein, aber sie fängt eine Wahrheit ein: Das damals kleine Unternehmen kurz vor dem Aus sah in einem einzigen Anruf von TSMC einen rettenden Strick.

Doch dieser Strick hätte fast zur Schlinge werden können: 1998 trat ein Fehler in einem chemischen Prozess bei TSMC auf, der dazu führte, dass eine große Menge an NVIDIA-Chips unbrauchbar wurde, was das Unternehmen fast erneut in den Ruin trieb [^23]. Eine ehrlichere Formulierung wäre daher: Taiwan war nicht der „Retter vor dem Bankrott“ für NVIDIA, sondern dessen „Fertigungslinie“ – eine Lebensader, die beidseitig verknüpft ist. Taiwan hat sie aufgefangen, hätte sie aber auch fast ruiniert. Symbiose ist niemals ein einseitiger Gefallen.

Die folgende Geschichte ist den meisten besser bekannt. Im Jahr 2006 führte NVIDIA CUDA ein, was damals von fast allen als eine wahnsinnige Entscheidung angesehen wurde. Im Jahr 2012 trainierte der Doktorand Alex Krizhevsky in seinem Elternhaus mit zwei NVIDIA GTX 580-Grafikkarten das AlexNet und senkte die Fehlerrate bei der ImageNet-Bilderkennung von 26 % auf 15,3 % [^24]. Dieser Moment bewies, dass die GPU der Motor für Deep Learning ist. Als ChatGPT im Jahr 2022 die weltweite Gier nach Rechenleistung entfachte, schoss der Marktwert von NVIDIA wie eine Rakete in die Höhe.

```tw-timeline
1993 | NVIDIA wird im Silicon Valley gegründet | Jensen Huang und zwei weitere Personen entwickeln Grafikchips
1996 | Jensen Huang schreibt Morris Chang | Bittet um Auftragsfertigung durch TSMC; 1998 offizieller Vertrag, physische Anbindung an Taiwan
2006 | Einführung von CUDA | Wandelt die GPU in eine Plattform für allgemeine Berechnungen um; damals als wahnsinnige Entscheidung abgetan
2012 | AlexNet wird mit zwei GTX 580 trainiert | Beweis: GPU = Motor für Deep Learning
2022 | ChatGPT erscheint | Weltweiter Bedarf an Rechenleistung explodiert, Marktwert von NVIDIA schießt hoch
2025 | Marktkapitalisierung über 5 Billionen US-Dollar | Erstes Unternehmen der Geschichte; im selben Jahr Ankündigung eines Übersee-Hauptsitzes in Taiwan
Quelle: „The Nvidia Way“, Acquired Podcast, Wikipedia, CNBC
```

Von einem kleinen Unternehmen, das nur noch dreißig Tage vom Bankrott entfernt war, bis hin zum ersten 5-Billionen-Dollar-Unternehmen der Geschichte – jeder einzelne Chip dazwischen wurde in Taiwan gefertigt.

![Jensen Huang hält während seiner Keynote auf der CES 2025 einen RTX Blackwell GPU in der Hand](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)
_Jensen Huang präsentiert auf der CES 2025 die neue Generation des Blackwell-GPUs. Vom Gründer, der auf jeder monatlichen Versammlung sagen musste: „Wir sind nur noch dreißig Tage vom Bankrott entfernt“, bis hin zu diesem Chip, um den sich weltweit alle reißen – und der dennoch nur in Taiwan hergestellt werden kann. Photo: Pronoia, CC0._

## Hat die Unersetzbarkeit ein Verfallsdatum?

Dies führt zu einer Frage, der man sich ehrlich stellen muss: Ist diese „Unersetzlichkeit“ Taiwans von Dauer oder gibt es eine zeitliche Grenze?

Kurzfristig betrachtet ist die Grenze so hart, dass sie kaum Spielraum lässt: In den Jahren 2025 bis 2027 hängen NVIDIAs fortschrittlichste KI-GPUs – von der Fertigung bis zum finalen Packaging – zu einhundert Prozent an den CoWoS-L-Produktionslinien von TSMC in Taiwan ab[^25]. TSMC kontrolliert etwa 90 % bis 92 % des weltweiten Marktes für fortschrittliche Prozesse unter 5 Nanometern, und die Kapazität für Advanced Packaging übersteigt die Summe aller Wettbewerber[^26]. Die Forschung von Professor Chou Yun-tsai von der NTUST bringt es auf den Punkt: Es sei kurzfristig nicht machbar, die Auftragsfertigung von TSMC zu diversifizieren; der Bau einer neuen hochmodernen Wafer-Fabrik koste drei bis vier Jahre und mehr als 10 Milliarden US-Dollar[^27].

Das stärkste technische Indiz findet sich nicht in irgendeinem Bericht, sondern im Produktdesign von NVIDIA selbst. Die nächste Generation, Rubin Ultra, war ursprünglich mit einem „Four-Die“-Packaging geplant. Doch laut TrendForce im April 2026 würde ein Four-Die-Design die Packaging-Fläche auf das 7,5- bis 8-fache des Maskenlimits anwachsen lassen, was „die Ausbeute und die Kosten massiv beeinträchtigen“ würde. Daher „wechselt das Design nun zu einer Dual-Die-Architektur“[^4]. Diesen Satz sollte man langsam lesen: Die physikalische Grenze der Packaging-Ausbeute in Taiwan bestimmt im Umkehrschluss, wie NVIDIAs Chips beschaffen sein müssen. Selbst das weltweit führende Chipdesign-Unternehmen muss seine Entwürfe um die Ausbeuteraten Taiwans herum anpassen. Dies ist ein Engpass auf physikalischer Ebene, der so starr ist, dass es keinen Verhandlungsspielraum gibt.

Doch eine „kurzfristige harte Grenze“ bedeutet nicht „ewig“. Taiwan hat bereits schmerzhafte Lehren aus der Vergangenheit gezogen.

Im Jahr 2002 trieb Taiwan die „Two Trillion Dual Stars“-Industriepolitik voran; Panel-Technologie und DRAM (Speicher) wurden damals als unersetzliche Lebensadern der nationalen Verteidigung betrachtet. Das Ergebnis? Da es an Kerntechnologien mangelte und die Investitionen in Forschung und Entwicklung nur bei 6 % lagen – weit unter den 10 % bis 21 % in Korea, Japan, den USA und Europa –, wurden diese beiden Branchen von Südkorea und China systematisch ausgehöhlt. Ein späterer Rückblick der United Daily News war erschütternd: „Die einst glanzvollen Panel-Hersteller und die DRAM-Produzenten der Halbleiterindustrie erlitten wenige Jahre später aufgrund des Überangebots auf dem internationalen Markt massive Verluste. Im Netz wurden sie spöttisch als ‚Mao San Dao Si‘ (ein Wortspiel für eine sehr geringe Marge) bezeichnet, da ihre Bruttomargen nur bei drei bis vier Prozent lagen; die ‚Two Trillion Dual Stars‘-Industrie wurde zu einer ‚Two Trillion Traumatic Industry‘.“[^28]

> ⚠️ **Was ist diesmal anders als bei Panels und DRAM?**: Die Panel- und DRAM-Branchen wurden damals ausgehöhlt, weil Taiwan die Kerntechnologien nicht beherrschte und jeder sie aufholen konnte. Der Burggraben der KI scheint diesmal viel tiefer zu sein – TSMC kontrolliert tatsächlich die Prozess-IP, und die Ausbeute beim CoWoS-Packaging sowie die Bindung des gesamten Ökosystems lassen sich nicht durch bloßes Geld in drei bis fünf Jahren kopieren. Aber das ist kein Grund für Taiwan, unbesorgt zu sein. SMIC behauptet bereits die Massenproduktion von 5-nm-Prozessen, auch wenn die Ausbeute nur ein Drittel der von TSMC beträgt und die Kosten um 50 % höher liegen, was einem Rückstand von etwa fünf Jahren entspricht[^29]. Doch fünf Jahre sind in der Technologiebranche nicht ewig. „Tiefgreifende Abhängigkeit“ mit „ewiger Sicherheit“ zu verwechseln, war genau der Fehler, den die Akteure im Jahr 2002 begingen.

Nach 2028 werden Risse sichtbar. Im Dezember 2025 investiert NVIDIA etwa 5 Milliarden US-Dollar in eine Beteiligung an Intel mit dem eigentlichen Ziel, „den vorrangigen Zugang zu Intels Advanced-Packaging-Kapazitäten in den USA sicherzustellen“, die voraussichtlich für die Feynman-Architektur im Jahr 2028 genutzt werden sollen[^30]. TSMCs Packaging-Werk AP1 in Arizona soll voraussichtlich 2028 in die Massenproduktion gehen[^31]. Das taiwanische Unternehmen Powertech hat ein PiFO-Packaging entwickelt, das mit CoWoS-L konkurrieren kann und dessen Produktionskosten um etwa 30 % niedriger liegen; bereits „mehrere US-KI-Chiphersteller“ drängen auf den Markt[^32]. Dies sind reale Anzeichen einer Lockerung, auch wenn sie derzeit noch nicht die Hauptlieferkette für NVIDIAs fortschrittlichste GPUs erreichen.

Eine Zahl verdeutlicht die Subtilität der aktuellen Lage am besten: TrendForce prognostiziert, dass sich das Angebot-Nachfrage-Defizit bei CoWoS von derzeit etwa 20 % auf etwa 10 % bis Ende 2026 verringern wird[^33]. Die Art und Weise, wie sich das Defizit verringert, ist jedoch durch die Kapazitätserweiterung von TSMC selbst und nicht durch das Aufkommen alternativer Lieferanten[^33]. Das bedeutet: Bis zum heutigen Tag kann dieser Engpass nur durch Taiwan selbst gelöst werden.

Die Unersetzlichkeit ist eine technische Tatsache, aber sie hat eine harte Grenze, die in der Nähe des Jahres 2028 liegt. Taiwans Trumpfkarte hat ein Verfallsdatum.

## 4,434 Millionen NT$: Eine Stadt räumt ein Grundstück für ein Multi-Billionen-Unternehmen

Wenn die Bruttomarge eine abstrakte Waage der Macht ist, dann stellt das Ereignis im Beitou-Shihlin Science Park in Taipeh in der zweiten Jahreshälfte 2025 den schärfsten Schnitt auf dieser Waage dar.

Die Geschichte beginnt im Jahr 2021: Damals ver auctioned die Stadtverwaltung von Taipeh zwei Grundstücke im Beitou-Shihlin Science Park, T17 und T18 (insgesamt 3,89 Hektar), als 50-jährige Erbpacht. Shin Kong Life war der einzige Bieter und erhielt den Zuschlag für NT$4,4 Milliarden[^34]. In den folgenden drei Jahren lag das Grundstück brach und war mit Unkraut bewachsen.

Im Mai 2025 kündigte Jensen Huang auf der Computex an, dass das ausländische Hauptquartier von NVIDIA, die „Constellation-Zentrale“, im Beitou-Shihlin Science Park angesiedelt werden soll[^35]. Doch dann trat ein Problem auf: Die Erbpacht für dieses Grundstück lag noch bei Shin Kong Life, und eine öffentlich verwaltete Erbpacht kann nicht direkt übertragen werden. NVIDIA, Shin Kong Life und die Stadtverwaltung von Taipeh steckten wegen dieses Grundstücks fünf Monate lang fest[^36].

Die endgültige Lösung bestand darin, dass die Stadtverwaltung von Taipeh Geld ausgab, um Shin Kong Life zum Ausstieg zu bewegen. Am 12. November 2025 verabschiedete der Stadtrat von Taipeh ohne Einwände eine Vertragsauflösungsgebühr in Höhe von NT$4,434 Milliarden, die die Stadtverwaltung an Shin Kong Life zahlt, um das Land zurückzufordern[^37]. Die genaue Summe lautet: NT$4.434.064.085[^37].

```tw-figure
NT$4.434.064.085
Die von der Stadtverwaltung Taipeh an Shin Kong Life gezahlte Vertragsauflösungsgebühr, um das Grundstück im Beitou-Shihlin Science Park zurückzufordern und an NVIDIA zu übergeben (vom Stadtrat am 12.11.2025 verabschiedet).
Taipeh Stadtrat, CNA, iNews
```

Die von Shin Kong Life eingereichte Abrechnung löste im Stadtrat einen Sturm aus. Als die KMT-Abgeordnete You Shu-hui die Rechnung erhielt, schrieb sie: „Als ich sah, dass in der achtseitigen Rechnung von Shin Kong Life sogar Kosten für Unkrautjäten, Umweltpflege, Logo-Anpassungen und Notargebühren von der Stadtverwaltung Taipeh erstattet werden sollen, konnte ich nur bitter lächeln. Die Umweltpflege sollte doch eigentlich Aufgabe des Mieters sein, oder? Sogar die Kosten für die Logo-Anpassung nach der Fusion von Taishin und Shin Kong sollen von der Stadt getragen werden? Das ist wirklich unfassbar... _seufz, seufz, seufz_.“[^38] Letztlich stimmte sie jedoch dafür und fügte einen Satz hinzu, der die Stimmung im Saal gut zusammenfasste: „Die Rechnung von Shin Kong Life ist unbegreiflich, aber das große Ganze hat Vorrang“[^38].

An jenem Tag bot sich im Stadtrat ein seltener Anblick: Die Parteien Blau (KMT), Grün (DPP) und Weiß (TPP) zeigten sich ungewöhnlich harmonisch; die Fraktion der DPP rief sogar lautstark „Unterstützung für NVIDIA, rasche Vertragsunterzeichnung“[^39]. Ein Stück Land und ein ausländisches Unternehmen brachten die sonst so zerstrittenen Parteien dazu, mit einer Stimme zu sprechen.

> 📝 **Kuratorische Notiz**: Es lohnt sich, einen Blick auf diese Machtstruktur zu werfen. Um einem Multi-Billionen-Dollar-Unternehmen eine Ansiedlung zu ermöglichen, setzt die Stadtverwaltung und der Stadtrat einer Metropole öffentliche Gelder ein, überwindet Parteigrenzen und räumt alle Hindernisse aus dem Weg, um ein Grundstück für es „sauber zu machen“, das noch von einem vorherigen Mieter besetzt war. NVIDIA hat diese NT$4,434 Milliarden nicht direkt gezahlt; die Steuerzahler von Taipeh leisten hier die Vorleistung (wobei Shin Kong Lifes eigene Kosten und bereits gezahlte Steuern insgesamt NT$1,441 Milliarden ausmachen, die dann im weiteren Verlauf von NVIDIA indirekt getragen werden)[^40]. „Man kann nicht darauf verzichten, bedeutet nicht, dass man das Sagen hat“ – dieser Satz bekommt hier eine sehr konkrete Form: Wenn man jemanden unbedingt halten will, bezahlt man für ihn die Rechnungen, die er eigentlich nicht hätte bezahlen müssen.

## Das Hauptquartier als Aushängeschild oder als tief verwurzelte Basis

Was hat NVIDIA Taiwan eigentlich gebracht? Man muss hier zwischen zwei Aspekten unterscheiden, um keine Fehlbeurteilung vorzunehmen.

Der erste Aspekt ist das „Aushängeschild“: Das Constellation-Hauptquartier soll dem Design des US-Hauptquartiers nachempfunden sein – eine Art „Sternenschiff“-Optik –, Platz für etwa 4.000 Menschen bieten, mit Baubeginn im Jahr 2026 und Inbetriebnahme erst im Jahr 2030. Bis heute wurde noch nicht einmal mit dem Bau begonnen[^41]. Allein betrachtet ist die Skepsis, ob das Hauptquartier lediglich eine PR-Maßnahme sei, durchaus nachvollziehbar.

Der zweite Aspekt sind die „schon längst geschlagenen Wurzeln“. NVIDIA ist nicht erst im Jahr 2025 nach Taiwan gekommen. Das Unternehmen unterhält bereits seit langem ein Büro in Neihu, Taipeh, mit einer aktuellen Mitarbeiterzahl von etwa 1.800 Personen (dies ist eine Medienrechnung, keine offizielle Zahl)[^42]. Bereits im Jahr 2021 wurde das Projekt „KI-Innovations- und Forschungszentrum“ vom Wirtschaftsministerium genehmigt: Bei einem Gesamtinvestitionsvolumen von NT$24,3 Milliarden und staatlichen Zuschüssen in Höhe von NT$6,7 Milliarden sollen zwischen 2022 und 2027 1.000 neue Stellen in einem Forschungs- und Entwicklungsteam geschaffen werden[^43]. Im November 2025 gründete das Unternehmen die „NVIDIA Taiwan Classic Co., Ltd.“, wobei das Stammkapital von NT$1 Milliarde auf NT$3,3 Milliarden erhöht wurde – dabei handelt es sich um eine eigenständige juristische Person, die Steuern selbstständig abführen und Vermögenswerte halten kann[^44].

Die Wahrheit über die „Ansiedlung des Hauptquartiers“ liegt also dazwischen: Die substanzielle Verwurzelung der Forschung und Entwicklung ist real, und auch die steuerpflichtige Tochtergesellschaft wurde bereits gegründet; doch das meistbeachtete Constellation-Hauptquartier existiert bislang nur auf dem Papier. Man darf beide Aspekte nicht nur halbherzig betrachten.

## Die Insel, die von dieser Lieferkette ausgesaugt wird

Abseits des Glanzes und der Rechnungen gibt es noch eine weitere Rechnung, die jeder Einzelne auf dieser Insel bezahlen muss: Wasser, Strom, Luft und unbezahlbarer Wohnraum.

![Außenansicht der TSMC-Fabrik in Taichung, graue Gebäudefassade mit TSMC-Logo](/article-images/technology/tsmc-taichung-factory.webp)
_TSMC-Fabrik in Taichung. Der physische Körper jeder NVIDIA-GPU-Generation entsteht in solchen Fabriken, doch das Wasser und der Strom, den diese Fabriken verbrauchen, sind eine weitere Rechnung, die diese Insel gerade bezahlt. Foto: Briáxis F. Mendes, CC BY-SA 4.0._

Schauen wir zuerst auf den Strom. TSMC verbrauchte im Jahr 2023 24,775 Milliarden kWh Strom, was 8,96 % des gesamten Stromverbrauchs Taiwans entspricht[^45]. S&P Global prognostiziert, dass der Stromverbrauch von TSMC bis zum Jahr 2030 etwa 23,7 % des gesamten taiwanesischen Stromverbrauchs erreichen könnte[^45]. Das bedeutet, dass bis zu diesem Zeitpunkt fast jede vierte Kilowattstunde in ganz Taiwan von diesem einen Unternehmen verbraucht werden könnte.

```tw-line
Anteil des TSMC-Stromverbrauchs am Gesamtverbrauch Taiwans: Ein Unternehmen saugt fast 1/4 des Stroms einer Insel ab (%)
Jahr | Anteil
2023 | 8,96
2030 | 23,7
Quelle: S&P Global, TSMC CSR-Bericht
```

Die CO₂-Emissionen steigen im gleichen Maße: Der Bericht von Greenpeace vom April 2025 mit dem Titel 《Im Schatten des Chip-Booms》 berechnet, dass der Stromverbrauch für die weltweite KI-Chip-Produktion von 218 GWh auf 984 GWh explodiert ist – ein Anstieg um mehr als das 3,5-Fache. Allein in Taiwan stieg der Stromverbrauch auf 375,8 GWh an, was „bis zu 38 % des weltweiten Gesamtvolumens ausmacht“[^46]. Da TSMC stark von fossilen Brennstoffen abhängig ist, belaufen sich die CO₂-Emissionen seiner KI-Chip-Produktion auf bis zu 185.700 Tonnen CO₂-Äquivalent; Greenpeace bezeichnet das Unternehmen direkt als „Emissionschampion der KI-Chip-Produktion“[^46].

Und was ist mit NVIDIA selbst? Greenpeace vergibt dafür die Note F. Im Bericht heißt es, dass NVIDIAs „Lieferkettenemissionen in den letzten drei Jahren fast verdoppelt wurden, von 3,51 Millionen Tonnen im Jahr 2022 auf 6,91 Millionen Tonnen im Jahr 2024“, und das Unternehmen „lediglich die Kohlenstoffemissionen und die Verschmutzung der Lieferkette in andere Teile der Welt auslagert“[^46]. Mit anderen Worten: Die Bewertung und der Glanz stehen im Namen von NVIDIA, während die CO₂-Emissionen und die Verschmutzung am Himmel über Taiwan verbleiben.

Das Gleiche gilt für das Wasser: TSMC verbraucht täglich mehr als 200.000 Tonnen Wasser; die 81.000 Tonnen Wasser, die täglich von den vier Wasserrecycling-Anlagen in Tainan geliefert werden, „gehen fast vollständig an TSMC“[^47]. Der Preis dafür zahlen die Ackerflächen: Die Felder in der Region Jianan mussten in den Jahren 2021 und 2023 zweimal die Bewässerung einstellen, um das Wasser der Halbleiterindustrie zu überlassen[^48]. Die Herstellung eines einzigen 12-Zoll-Wafers benötigt 8.327 Liter Wasser[^49]. Auf dieser Insel mussten die Felder von Bauern brachliegen, damit die Chips mit Wasser versorgt werden konnten.

Dann ist da noch der Wohnraum. Nachdem NVIDIA angekündigt hatte, seinen Hauptsitz im Beitou-Shihlin Science Park zu errichten, begannen in dieser Gegend bereits die Immobilienpreise zu steigen. Das Wirtschaftsministerium der Stadt Taipeh schätzt, dass die Zahl der dort ansässigen Arbeitnehmer in Zukunft 60.000 erreichen könnte, aber laut Statistiken des 591-Portals gibt es nur etwa 1.476 zum Verkauf stehende Wohnungen (Wohnbauflächen machen nur 13,8 % des gesamten Gebiets aus)[^50]. Wenn 60.000 Menschen um 1.476 Wohnungen konkurrieren, ist die Preisentwicklung vorhersehbar: Medienberichten zufolge haben Neuprojekte in den Kernlagen des Beitou-Shihlin Science Parks bereits Preise von über NT$1,5 Millionen pro Ping (ca. 3,3 m²) durchbrochen[^51].

Hier muss man zwei Dinge klar unterscheiden, um die Ängste nicht falsch zu berechnen. Laut dem offiziellen Immobilienregister war der höchste Verkauf eines Wohngebäudes im Bezirk Shilin im Jahr 2025 ein Preis von 570.400 NT$ pro Quadratmeter, was etwa 1,88 Millionen NT$ pro Ping entspricht (Jihe Road Nr. 39, Gesamtpreis 447 Millionen NT$)[^52]. Diese extrem hohen Preise beziehen sich jedoch auf Luxusimmobilien in Tianmu und im Stadtzentrum von Shilin, was etwas anderes ist als der Beitou-Shihlin Science Park selbst; die Meldung über Neuprojekte im Beitou-Shihlin Science Park mit über 1,5 Millionen NT$ pro Ping ist eine separate Zahl aus den Medienberichten. Diese beiden Zahlen sollten nicht vermischt werden. Doch egal welche man betrachtet, sie weisen auf dasselbe Gefühl hin: Das Wachstum findet direkt vor meiner Haustür statt, aber ich kann es mir nicht leisten.

> ⚠️ **„Warum steigen die Preise, wenn die Firma noch gar nicht gebaut hat?“**: Der Widerstand der Anwohner ist real. Branchenvertreter sagten privat, dass aufgrund der schlechten Infrastruktur im Park „viele Mitarbeiter nicht mitziehen wollen... sogar nach dem Umzug kündigen ein Drittel der Mitarbeiter wegen der schwierigen Verkehrssituation“[^53]. Die anonyme Meinung auf PTT ist noch direkter: Man habe die TSMC-Thematik bereits satt, jetzt werde lediglich das Thema NVIDIA als neuer Trend genutzt[^54]. Ein Hauptsitz, der noch nicht einmal gebaut wurde, treibt bereits die Immobilienpreise der Anwohner in die Höhe – dies ist die unmittelbarste Form der K-förmigen Divergenz. Man muss ehrlich sein: Es ist wahr, dass KI Taiwan weltweit sichtbar macht, aber es ist ebenso wahr, dass das Wasser und der Strom ausgesaugt werden und der Wohnraum unbezahlbar wird. Beides muss festgehalten werden.

## Es nicht nur Taiwan, das darauf angewiesen ist

Betrachtet man das Gesamtbild, erkennt man ein größeres Phänomen: In der Beziehung zwischen NVIDIA und Taiwan ist die gegenseitige Abhängigkeit bidirektional, wenn nicht sogar multidirektional. Sogar die andere Seite der Taiwanstraße ist in diese Struktur eingebunden.

![Computex-Messegelände im Nangang Exhibition Center, Taipeh; breite Gänge gesäumt von Ständen der IT-Hersteller und Menschenmengen](/article-images/technology/computex-nangang-floor-2015.webp)
_Das Computex-Messegelände im Nangang Exhibition Center, Taipeh. Jeden Juni strömen Käufer aus der ganzen Welt in diese Halle, um die Produkte der taiwanischen Lieferkette zu erwerben – Taiwan ist dabei nicht der einzige Akteur, auf den die Welt angewiesen ist. Foto: NVIDIA Taiwan, CC BY 2.0._

Dies beschreibt das Konzept des „Silicon Shield“ (Silizium-Schild): Da Taiwan die Chips kontrolliert, die die ganze Welt benötigt, wird diese Unverzichtbarkeit zu einer Schutzschicht. Doch der Silicon Shield ist immer zweischneidig. Er fungiert sowohl als Talisman als auch als Pulverfass, das an der Insel gebunden ist. Die Wissenschaft bezeichnet diese zwei Seiten als „Silicon Shield“ und „Silicon Trap“ (Silizium-Falle): Dieselbe Konzentration kann Aggressionen abschrecken, kann aber im Umkehrschluss auch einen Anreiz für eine Invasion oder einen Single Point of Failure darstellen[^55].

Eine schärfere Debatte wurde 2021 durch einen Artikel des US Army War College entfacht, der eine extreme „Verbrannte Erde“-Strategie vertrat: Im Falle einer chinesischen Invasion Taiwans sollte die Halbleiterindustrie zerstört werden, um dem Gegner jeglichen Nutzen zu nehmen. Doch die Gegenstimmen waren ebenso gewichtig: Selbst wenn dies China kurzfristig abschrecken würde, könnte dieser wirtschaftliche Selbstschaden die Aggression lediglich bis zu dem Tag verschieben, an dem China in der Lage ist, eigene Halbleiter zu produzieren; zudem wäre es für die taiwanische Bevölkerung unwahrscheinlich, eine solche Selbstzerstörung ihrer Industrie als im eigenen Interesse liegend zu betrachten[^56]. Dies ist keine Entscheidung, die Taiwan treffen muss, aber sie schwebt real hinter jeder Diskussion darüber, ob „Taiwan über ausreichend Druckmittel verfügt“.

Der Silicon Shield wird sogar durch TSMC selbst aufgeweicht. Um geopolitische Risiken zu streuen, investiert TSMC 165 Milliarden US-Dollar in den Ausbau von Kapazitäten in den USA[^57]. Eine Schlagzeile des MIT Technology Review vom August 2025 lautete: „Taiwans Silicon Shield könnte geschwächt werden“[^58]. Die Sorge besteht darin, dass die Verlagerung von Produktionskapazitäten die Verhandlungsposition Taiwans im Inland schwächt und dazu führen könnte, dass Länder wie die USA Taiwan nicht mehr als verteidigungswürdig erachten[^58]. Bonnie Glaser von der German Marshall Fund wies jedoch darauf hin, dass sich dieses Ökosystem nicht so einfach verlagern lässt: Das in Taiwan geschaffene Ökosystem ist einzigartig; es ist das Ergebnis des Zusammenspiels von Talentpools, Kultur und taiwanischem Recht, was sich nicht ohne Weiteres an anderen Orten replizieren lässt[^59]. Paul Triolo, der chinesische Technologie erforscht, drückte es noch direkter aus: Was die modernste Fertigung betrifft, so sei Arizona weit davon entfernt und werde es auch niemals sein[^60].

Am deutlichsten wird diese asymmetrische Abhängigkeit in einem politischen Moment.

Am 29. Mai 2024 sagte Jensen Huang in Taiwan öffentlich: „Taiwan is one of the most important countries in the world.“ (Taiwan ist eines der wichtigsten Länder der Welt)[^61]. Wenige Tage später, am 2. Juni, hielt er eine Rede an der National Taiwan University (NTU), in der er beschrieb: „Taiwan ist ein unbesungener Held, aber die Stütze der Welt“[^62].

```tw-quote
Taiwan ist ein unbesungener Held, aber die Stütze der Welt
Jensen Huang | CEO von NVIDIA, Rede auf der Computex an der NTU, 2024
```

Achtzehn Tage später reagierte Chen Bin-hua, Sprecher des chinesischen Büros für Taiwanangelegenheiten: „Gegen diese äußerst fehlerhaften Äußerungen haben die Menschen und Internetnutzer in Festlandchina bereits ihren starken Unmut geäußert. Taiwan ist niemals ein Staat gewesen... man hoffe, er würde seine Hausaufgaben ordentlich nachholen.“[^63]

Interessant ist jedoch eine andere Beobachtung: Die Nachrichtenagentur Central News Agency (CNA) stellte damals fest, dass chinesische Wirtschaftsmedien zwar viele Berichte über Jensen Huangs Besuch in Taiwan veröffentlichten, jedoch „keine Erwähnung der Aussage fanden, wonach Huang Taiwan als ‚wichtiges Land‘ bezeichnete – ein sensibles Thema, das normalerweise als ‚höchste Priorität‘ gilt“[^64]. Das bedeutet: Während die offizielle Seite scharf protestierte, wählten die Wirtschaftsmedien den Weg des Schweigens.

> 📝 **Anmerkung der Kuratoren**: Dieses Verstummen offenbart die wahre Machtverteilung. China benötigt die Chips von NVIDIA. Selbst wenn Jensen Huang Worte wählte, die Peking am wenigsten akzeptieren kann, entscheiden sich die Festlandmedien dazu, nicht darüber zu berichten oder das Thema nicht aufzugreifen, um die Beziehung zu diesem „KI-Guru“ nicht zu gefährden. Ein weit verbreiteter Satz lautet: China braucht NVIDIA, aber NVIDIA braucht China nicht[^65]. In dieser Beziehung wird sogar der riesige Markt auf der anderen Seite der Taiwanstraße in gewisser Weise von der Lieferkette eines US-Unternehmens in die Zange genommen. Dies ist die seltsame Position der Insel Taiwan: Die ganze Welt, einschließlich derjenigen, die ihren Status verändern wollen, ist auf die hier produzierten Chips angewiesen. Doch „die Welt ist auf dich angewiesen“ und „du bist deshalb sicher und bestimmst die Regeln“ sind zwei völlig verschiedene Dinge. Der Autor zieht keine politischen Schlüsse für Taiwan, aber diese Spannung allein verdient es, dass jeder Leser sie selbst abwägt.

## Unverzichtbar bedeutet nicht, das Sagen zu haben

Zurück zu jener Logo-Wand mit 55 Unternehmen.

Jeder Name an dieser Wand ist echt: Sie sind das Fleisch und Blut der globalen KI-Revolution; ohne sie könnte selbst das 5-Billionen-Dollar-Unternehmen NVIDIA keinen einzigen Chip ausliefern. Diese Unverzichtbarkeit ist eine ingenieurtechnische Tatsache, keine rhetorische Figur. Taiwan sollte darauf stolz sein.

Doch wenn man den bisherigen Weg betrachtet, fallen der Glanz, die Bewertung und die Entscheidungsgewalt auf die Personen, die diese Wand errichtet haben; während die 5 % Bruttomarge, der erschöpfte Strom- und Wasserverbrauch, die in unerschwingliche Höhe getriebenen Immobilienpreise und das auf der Insel lastende Kriegsrisiko auf die Namen an der Wand fallen. Taiwan hält den Schalter in der Hand, den die ganze Welt nicht ausschalten kann, doch das bedeutet noch lange nicht, dass es auch das Sagen hat. Zudem hat dieser Trumpf ein Verfallsdatum nahe dem Jahr 2028.

Taiwan ist nicht untätig: Lai Ching-te schlug 2025 vor, Taiwan zu einem der „fünf weltweit führenden Rechenzentren“ zu machen und eine „souveräne KI“ zu entwickeln [^66]; Hon Hai baut in Kaohsiung einen nationalen Supercomputer, der mit 10.000 Blackwell-Chips betrieben wird [^67]; die „neuen zehn großen KI-Infrastrukturprojekte“ des Exekutiviums sehen Investitionen von über 100 Milliarden NT$ vor, mit dem Ziel eines Produktionswertes von 15 Billionen NT$ [^68]. Dies ist der Versuch, innerhalb der Rolle des „Lohnfertigers für andere“ eine eigene „Rechenkapazität für sich selbst“ aufzubauen: ein Schritt nach oben vom Boden der Smile-Kurve.

Doch dieser Weg ist noch weit: Taiwans eigenes Sprachmodell TAIDE wird mit dem Niveau eines „Oberstufenschülers“ verglichen, während internationale Branchenriesen bereits das Niveau von „Postgraduierten“ erreicht haben [^69]. Während die südkoreanische Regierung auf einen Schlag 260.000 GPUs beschafft, ringt man in Taiwan noch um Grundstücksfragen und Vertragsstrafen [^70]. Vom Entgegennehmen eines Telefonats von Morris Chang bis zum Auffangen der Rechenleistung der ganzen Welt hat Taiwan fast dreißig Jahre gebraucht, um an dieser Wand zu stehen. Aber an der Wand zu stehen und den Stift selbst in der Hand zu halten, sind zwei verschiedene Dinge.

Diese Wand wird weiterhin leuchten: Bei der nächsten Computex werden auf Jensen Huangs Hintergrund noch mehr Logos zu sehen sein. Im Jahr 2026 enthüllte er, dass NVIDIAs jährliche Ausgaben in Taiwan bereits etwa 150 Milliarden US-Dollar betragen, verglichen mit nur 10 bis 15 Milliarden US-Dollar vor fünf Jahren [^71]. Die Frage „Wie wichtig ist Taiwan?“ wurde längst beantwortet. Taiwan muss die schwierigere Frage beantworten: Wenn die ganze Welt nicht ohne das, was du herstellst, auskommen kann – wie schaffst du es, dass aus „unverzichtbar“ allmählich „das Sagen haben“ wird?

Die Namen an der Wand werden immer mehr. Ob die Person, die den Stift hält, bald selbst sein wird – danach greift Taiwan gerade erst.

---

**Weiterführende Literatur**:

- [Jensen Huang: Vom Schülern, der Toiletten fegte, zum Lederjacken-Guru eines 5-Billionen-Imperiums](/de/people/jensen-huang) — Die Lebensgeschichte des NVIDIA-Gründers; dieser Artikel streift sie nur kurz, seine Heimat Tainan und seine Wachstumsgeschichte finden Sie hier.
- [Halbleiterindustrie](/de/technology/taiwan-semiconductor-industry) — Warum Taiwan zum globalen Zentrum der Chipproduktion werden konnte; dieser Artikel bietet den vollständigen Kontext zur Lieferkette.
- [Taiwanische Unternehmen: TSMC](/de/economy/tsmc) — Jener „Schutzberg der Nation“, der jeden Chip für NVIDIA fertigt, und die Kehrseite seiner Ressourcenerschöpfung.
- [Morris Chang: Der Empfänger jenes Briefes und das von ihm geschaffene Foundry-Imperium](/de/people/tsmc-morris-chang) — Die Person, die 1996 jenen Brief von Jensen Huang erhielt: der Gründer von TSMC.
- [Computex: Wie die Computermesse in Taipeh zur Eröffnungszeremonie der weltweiten KI wurde](/de/technology/computex) — Die Bühne, auf der diese Logo-Wand leuchtet; das jährliche Heimspiel der taiwanischen Tech-Industrie.
- [KI-Industrie (Künstliche Intelligenz)](/de/technology/artificial-intelligence-industry) — Von der Fertigung von NVIDIA-Chips bis zum Aufbau eines KI-Ökosystems: Taiwans Position in der KI-Welle.
- [Taiwans KI-Entwicklung und zukünftige Strategien](/de/technology/artificial-intelligence-development-strategy) — Souveräne KI, TAIDE und das nationale Bestreben Taiwans, sich von der Lohnfertigung nach oben zu arbeiten.
- [Taiwan Tech Storytelling: Ein 100-Punkte-Chip, ein 60-Punkte-Mikrofon](/de/technology/taiwan-tech-storytelling) — Zwei Erzählungen über denselben Chip: Wie Taiwan lernen kann, die Wertschöpfung der Geschichten (Story Premium) zu nutzen, die NVIDIA abschöpft.
- [Taiwanische Unternehmen: Hon Hai Precision](/de/economy/foxconn-precision-industry) — Der Lohnfertigungsriese, der 40 % der weltweiten KI-Racks montiert; die größte Hand am Boden der Smile-Kurve.

## Bildquellen

- [Jensen Huang auf der Computex in Taipeh](https://commons.wikimedia.org/wiki/File:Jensen_Huang_at_Computex_Taipei_20160531c.jpg) — Foto: NVIDIA Taiwan, 2016, CC BY 2.0 (Hero-Bild, Jensen Huang hält eine Rede auf der Computex-Bühne)
- [NVIDIA Ampere GA102 GPU Die](<https://commons.wikimedia.org/wiki/File:Nvidia@8nm@Ampere@GA102@GeForce_RTX_3090@S_TW_2032A1_SNNB9W.000_GA102-300-A1_DSC06025-DSC06107_(50740715646).jpg>) — Foto: Fritzchens Fritz, CC0 (Mikroskopische Aufnahme eines Chip-Dies)
- [Jensen Huang hält RTX Blackwell auf der CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Foto: Pronoia, CC0
- [TSMC-Fabrik in Taichung](https://commons.wikimedia.org/wiki/File:TSMC_logo_on_Taichung_factory_building.jpg) — Foto: Briáxis F. Mendes, CC BY-SA 4.0
- [Computex Taipeh im Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Foto: NVIDIA Taiwan, 2015, CC BY 2.0
- Video: [NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025](https://www.youtube.com/watch?v=TLzna9__DnI) — Offizieller NVIDIA YouTube-Kanal

## Referenzen

[^1]: [NVIDIA wird das erste Unternehmen mit einer Marktkapitalisierung von 5 Billionen US-Dollar](https://www.cnbc.com/2025/10/29/nvidia-5-trillion-market-cap.html) — Bericht von CNBC am 29. Oktober 2025: NVIDIA wurde als erstes Unternehmen der Geschichte zu einem Unternehmen mit einer Marktkapitalisierung von über fünf Billionen US-Dollar, angetrieben durch die Nachfrage nach KI-Rechenleistung.

[^2]: [Taiwan hält 90 % des weltweiten KI-Servermarktes](https://technews.tw/) — Daten des Wirtschaftsministeriums und des MIC: Der Versand der taiwanesischen Serverindustrie machte ursprünglich über 80 % des Weltmarktes aus, während die Produktion, Montage und Auftragsfertigung von KI-Servern bereits 90 % weltweit ausmacht; unter Einbeziehung US-amerikanischer Markenlieferanten liegt der Anteil bei 100 %. Der treibende Faktor ist die Forderung US-amerikanischer Kunden nach einer Produktion außerhalb Chinas.

[^3]: [TrendForce: NVIDIA wird zum größten Kunden von TSMC](https://www.trendforce.com/) — Daten von TrendForce vom 1. Juni 2026: Der Umsatzbeitrag von „Kunde A“ (NVIDIA) an TSMC stieg von 12 % im Jahr 2024 auf 19 % im Jahr 2025 und überholte damit Apple (von 22 % auf 17 %), um der größte Kunde zu werden. Primärquelle: TSMC-Jahresbericht 2025 (investor.tsmc.com).

[^4]: [TrendForce: Rubin Ultra wechselt zu Dual-Die-Architektur](https://www.trendforce.com/news/) — Analyse von TrendForce vom 1. April 2026: Eine Four-Die-Verpackung würde die Fläche auf das 7,5- bis 8-fache des Maskenlimits ausdehnen, was „die Ausbeute und Kosten massiv belastet“, weshalb das Design auf Dual-Die umgestellt wurde. KI wird im Jahr 2026 voraussichtlich 36 % der 3-nm-Kapazität beanspruchen, verglichen mit nur 5 % im Jahr 2025. Die physikalischen Grenzen der Verpackungsausbeute bestimmen direkt die Chiparchitektur.

[^5]: [NVIDIA FY2025 10-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Der bei der US-Börsenaufsichtsbehörde SEC eingereichte Jahresbericht von NVIDIA für das Geschäftsjahr 2025 weist eine jährliche GAAP-Bruttomarge von 75,0 % auf (im Geschäftsjahr 2024 waren es 72,7 %).

[^6]: [Zusammenfassung von Jensen Huangs Computex 2025 Rede: Logo-Wand mit 55 taiwanesischen Unternehmen](https://money.udn.com/money/story/5612/8750451) — Eine Zusammenstellung der Economic Daily News listet wortwörtlich die 55 taiwanesischen Unternehmen auf, die auf der Rückwand der Computex 2025-Bühne genannt wurden (u. a. Advantech, Mitie, Delta Electronics ... TSMC, UMC, Unimicron, Wistron, Wiwynn, Chung Tai), während andere Berichte angeben, dass die Kombination aus Bühnenrückwand und Danksagungsvideo insgesamt 122 Unternehmen umfasst.

[^7]: [NVIDIAs Abhängigkeit von TSMCs 3/4-nm-Prozessen](https://www.ainvest.com/news/) — Branchenanalyse: NVIDIAs profitabelste Chips, H200, Blackwell und Rubin, hängen vollständig von den 3-nm- und 4-nm-Prozessen von TSMC ab, was sowohl in der Fertigung als auch in der Verpackung einen Engpass darstellt.

[^8]: [NVIDIA FY2025 10-K Offenlegung der Lieferkettenkonzentration (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Originaltext aus dem NVIDIA-Jahresbericht: „Unsere Lieferkette ist hauptsächlich in der Region Asien-Pazifik konzentriert. Wir nutzen Foundries wie die Taiwan Semiconductor Manufacturing Company Limited oder TSMC ..., um unsere Halbleiterwafer herzustellen.“ Die Risikofaktoren führen die geografische Konzentration von Lieferanten, Wafer-Foundries sowie Test- und Verpackungsdiensten als geopolitisches Risiko auf.

[^9]: [TSMC CoWoS-Kapazität und NVIDIA-Anteil](https://www.financialcontent.com/article/tokenring-2025-12-26-tsmc-boosts-cowos-capacity) — Daten von FinancialContent und SiliconAnalysts: NVIDIA macht etwa 60 % der CoWoS-Kapazität von TSMC aus (SiliconAnalysts gibt ca. 595.000 Wafer an), während taiwanesische Medien für 2025 von 70 % sprechen; die drei größten Kunden (NVIDIA, Broadcom, AMD) machen zusammen über 85 % aus.

[^10]: [Hon Hai hält über 40 % Marktanteil bei der Montage von KI-Racks](https://vocus.cc/) — Schätzungen von E.SUN Securities: Hon Hai (Ingrasys) ist für die GPU-Module, Switchboards, Compute Boards und Rack-Systeme des GB200 NVL72 verantwortlich und hält einen Marktanteil von über 40 %. Das Werk in Nanjing wurde vom Weltwirtschaftsforum als weltweit erste „Lighthouse Factory“ für KI-Server zertifiziert (Dezember 2023).

[^11]: [Quanta hält mehr als die Hälfte des Marktanteils bei den Top 50 Rechenzentren](https://www.artificialintelligence-news.com/news/ai-servers-transform-taiwan-manufacturing-giants/) — Bericht von AI News: Quanta (QCT) ist für die L10- und L11-Integration verantwortlich und hält einen Marktanteil von über 50 % bei den 50 größten Cloud-Rechenzentren, womit es der weltweit zweitgrößte Server-Assemblierer ist.

[^12]: [NVIDIAs Aufträge füllen Quanta's neue KI-Fabrik in Zhubei aus](https://vocus.cc/) — Branchenbericht: Quanta ist für HGX/DGX verantwortlich; die neue KI-Park-Fabrik in Zhubei ist „vollständig durch die starke Nachfrage von NVIDIA ausgelastet“.

[^13]: [Daten der Quartalskonferenzen zu den Bruttomargen taiwanesischer KI-Serverhersteller](https://www.cnyes.com/) — Quartalsberichte der Unternehmen für FY2025–FY2026: Hon Hai Q1 FY2026 Bruttomarge 6,18 % (KI-Server machen über 50 % des Cloud-Networking-Umsatzes aus), Quanta 4,78 % (Rückgang um 1,54 Prozentpunkte, das niedrigste Niveau seit fast 15 Quartalen), Wistron 5,21 %, Wiwynn 7,2 % (gegenüber 9,4 % im Vorjahreszeitraum).

[^14]: [Bruttomargen taiwanesischer Unternehmen in der Sekundärlieferkette (E.SUN Securities)](https://vocus.cc/) — Taiwanesische Unternehmen, die technologisch näher am Kern stehen, weisen höhere Margen auf: Delta Electronics (Netzteil/Kühlung) hält über 60 % Marktanteil bei KI-Server-Netzteilen mit einer Bruttomarge von 37 % in Q1 FY2026; Unimicron (ABF-Substrate) hält über 70 % Marktanteil bei KI-ASIC-Substraten und ist derzeit der einzige Lieferant für NVIDIA CoWoS-Platinen, mit einer geschätzten Bruttomarge von 21,3 %.

[^15]: [Morgan Stanley: ODM-Montage-Wertschöpfungsmarge sinkt](https://newtalk.tw/) — Newtalk zitiert einen Bericht von Morgan Stanley vom 22. Mai 2026, wonach die Wertschöpfungsmarge der ODM-Systemmontage von 2,7 % bei GB300 auf etwa 1,9 % bei VR200 gesunken ist; der Wertschöpfungsbetrag pro ODM-Rack stieg hingegen von ca. 108.000 US-Dollar bei GB300 auf 149.600 US-Dollar bei VR200. Hinweis: Dies bezieht sich auf die Wertschöpfungsmarge der Systemmontage und ist nicht mit der gesamten Unternehmensmarge (5–7 %) gleichzusetzen.

[^16]: [Taiwan Insight: Die florierende taiwanische Wirtschaft – die meisten spüren die Vorteile nicht](https://taiwaninsight.org/) — Min-Hua Chiang von der University of Nottingham schrieb am 12. Januar 2026: „most people in Taiwan did not feel the benefits of the thriving economy.“ und „The top 10% earners in Taiwan received 48% of total income, whereas the bottom 50% only received 12%.“ Die geschätzte Wirtschaftswachstumsrate für 2025 liegt bei 7,37 %, womit Taiwan zur Weltspitze gehört.

[^17]: [Reporter: K-förmige Divergenz unter dem KI-Glanz](https://www.twreporter.org/) — Ein Gastbeitrag von Wang Ying-da im Reporter vom 11. Juni 2026 besagt: „Die direkt Beschäftigten in den Hauptwachstumsketten der KI-, Halbleiter- und Elektroniklieferketten machen weniger als 10 % der gesamten Erwerbstätigen aus.“ „Das monatliche Gesamteinkommen pro Person in der Gastronomie beträgt NT$38.484, was im Vergleich zur Elektronikkomponentenfertigung nur 34,6 % entspricht.“ Der Anteil der Elektronikbranche am Umsatz des verarbeitenden Gewerbes stieg von 58,0 % auf 64,7 %.

[^18]: [„The Nvidia Way“: Nur noch dreißig Tage bis zur Insolvenz](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Basierend auf Tae Kims Werk aus dem Jahr 2024 und dem Acquired/Sequoia-Podcast: Das interne Motto von NVIDIA lautete „Our company is thirty days from going out of business.“ (eröffnette jeden monatlichen Mitarbeiterabend). Als die RIVA 128 im August 1997 ausgeliefert wurde, reichte das Firmenkapital nur noch für etwa einen Monatslohn. Dies ist ein englisches Motto ohne wörtliche chinesische Version.

[^19]: [SEGA rettete NVIDIA mit 5 Millionen US-Dollar](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Acquired-Podcast und frühe NVIDIA-Historie: Es war eine Zahlung von 5 Millionen US-Dollar durch SEGA Ende der 1990er Jahre, die NVIDIA aus der Finanzkrise holte, nicht Taiwan; dies stellt die romantisierte Darstellung „Taiwan rettete NVIDIA“ richtig.

[^20]: [Jensen Huang schrieb einen Brief an Morris Chang um Auftragsfertigung](https://www.ettoday.net/) — ETtoday zitiert, dass Jensen Huang um 1996 einen Brief an TSMC-Gründer Morris Chang schrieb und fragte, „ob TSMC den ersten Chip für NVIDIA fertigen könne“. 1998 unterzeichneten beide Parteien offiziell einen Kooperationsvertrag, wodurch TSMC zum wichtigsten Foundry-Partner wurde.

[^21]: [TSMC-Mi Yu-jie: Die tiefgreifende Zusammenarbeit begann 1997](https://technews.tw/) — TechNews berichtete am 19. Mai 2025, dass Mi Yu-jie von TSMC rückblickend sagte: „Die tiefgreifende Zusammenarbeit begann in einem entscheidenden Moment, nämlich 1997. TSMC-Gründer Morris Chang kontaktierte NVIDIA-Gründer Jensen Huang persönlich, um auf die Anfrage nach Fertigungsdienstleistungen von NVIDIA zu reagieren.“

[^22]: [Szene, als Jensen Huang den Anruf von Morris Chang entgegennahm (Sekundärüberlieferung)](https://www.businessweekly.com.tw/) — Ein Auszug aus einer Comic-Version der Business Weekly beschreibt eine Sekundärüberlieferung, wonach Jensen Huang beim Telefonat mit Morris Chang zu seinen Mitarbeitern rief: „Leute! Seid leise! Das ist Morris Chang am Telefon!“ Dies ist eine indirekte Erzählung, der Tonfall ist möglicherweise nicht exakt.

[^23]: [Ein Fehler im TSMC-Prozess von 1998 hätte NVIDIA fast ruiniert](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Acquired-Podcast und frühe NVIDIA-Historie: Ein Fehler in einem chemischen Prozess bei TSMC im Jahr 1998 führte zur Vernichtung einer großen Charge von NVIDIA-Chips, was das Unternehmen fast erneut in den Ruin getrieben hätte – dies bestätigt den wechselseitigen Symbiose-Rahmen „Taiwan ist die lebenswichtige Fertigung, nicht der Retter vor dem Bankrott“.

[^24]: [AlexNet wurde mit zwei GTX 580 trainiert](https://en.wikipedia.org/wiki/AlexNet) — Wikipedia und Tom's Hardware: Im Jahr 2012 trainierte Alex Krizhevsky AlexNet im Schlafzimmer seiner Eltern mit zwei NVIDIA GTX 580 Grafikkarten. Dabei sank die Fehlerrate der ImageNet-Bilderkennung von 26 % auf 15,3 %, was den zweitplatzierten Konkurrenten um 10,8 Prozentpunkte übertraf und bewies, dass GPUs die Motoren des Deep Learning sind. CUDA wurde 2006 eingeführt.

[^25]: [Blackwell/Rubin hängen zu 100 % von CoWoS-L in Taiwan ab](https://finance.biggo.com/news/) — Branchenanalyse (unter Berufung auf das Financial Times): Von 2025 bis 2027 hängen NVIDIAs fortschrittlichste KI-GPUs von der Fertigung bis zum finalen Packaging zu einhundert Prozent von den CoWoS-L-Produktionslinien der TSMC in Taiwan ab.

[^26]: [TSMC kontrolliert etwa 90–92 % der fortschrittlichen Prozesse weltweit](https://www.csis.org/analysis/countering-chinas-challenge-american-ai-leadership) — CSIS-Analyse: TSMC produziert etwa 92 % der weltweit fortschrittlichsten Halbleiter (unter 5 Nanometer), und die Kapazität für Advanced Packaging übersteigt die Summe aller Wettbewerber; fast 90 % der Kunden, die von Taiwan abhängig sind, umfassen Apple, Amazon, Google, NVIDIA und Qualcomm.

[^27]: [Yuntsai Chou (NTUST): Kurzfristig ist eine Diversifizierung der TSMC-Auftragsfertigung nicht möglich](https://www.sciencedirect.com/) — ScienceDirect 2025 Forschung von Yuntsai Chou (National Taiwan University of Science and Technology): „Taiwan's supply chain would be particularly vulnerable to a quarantine initiated before 2027“ „Diversifying TSMC foundries is not feasible in the short term. Building a new leading-edge fab takes 3–4 years and costs $10B+.“ Das Ziel für die Massenproduktion von TSMC in Arizona mit 2-nm-Technologie ist das Jahr 2030.

[^28]: [United Daily News: Die „Zwei-Billionen-Doppelsterne“ wurden zu einem „Zwei-Billionen-Trauergeschäft“](https://udn.com/) — United Daily News blickt auf die Politik der „Zwei-Billionen-Doppelsterne“ zurück: „Die einst florierenden Panel-Hersteller und Speicherchip-Hersteller der Halbleiterindustrie erlitten einige Jahre später aufgrund des Überangebots auf dem internationalen Markt massive Verluste. Sie werden von Internetnutzern spöttisch als ‚Maoshan-Daoisten‘ (Mao San Dao Si) bezeichnet, was bedeutet, dass ihre Bruttomarge nur bei drei bis vier Prozent liegt; die ‚Zwei-Billionen-Doppelsterne-Industrie‘ wurde zu einem ‚Zwei-Billionen-Trauergeschäft‘.“ Panel- und DRAM-Produktion wurden ausgehöhlt, da die Forschungs- und Entwicklungsinvestitionen nur 6 % betrugen (weit unter den 10–21 % in Korea, Japan, den USA und Europa).

[^29]: [SMIC 5-nm-Ausbeute nur ein Drittel von TSMC](https://technews.tw/2025/03/28/) — TechNews Bericht vom 28. März 2025: „Bei identischem Herstellungsprozess sind die Preise für SMIC 5-nm-Wafer um 50 % höher als bei TSMC, und die Ausbeute ist aufgrund der Verwendung von DUV-Equipment nur 33 % von der von TSMC“; die Massenproduktion wurde für Dezember 2025 angekündigt, was einem Rückstand von etwa fünf Jahren entspricht.

[^30]: [NVIDIA investiert 5 Milliarden US-Dollar in Intel, um sich Kapazitäten für das Packaging zu sichern](https://www.intel.com/) — Im Dezember 2025 erwarb NVIDIA einen Anteil von etwa 5 % an Intel. Das eigentliche Ziel ist es, „die vorrangige Nutzung der fortschrittlichen Packaging-Kapazitäten von Intel in den USA sicherzustellen“, um die Feynman-Architektur für das Jahr 2028 zu bewerten und auf die CoWoS-Engpässe von TSMC zu reagieren. Dies dient als langfristige Absicherung, nicht als kurzfristiger Ersatz.

[^31]: [TSMC Packaging-Werk AP1 in Arizona geht 2028 in Massenproduktion](https://www.tomshardware.com/) — Branchenbericht: Die TSMC Arizona AP1/AP2 Packaging-Werke werden Anfang 2026 gebaut; die Massenproduktion von AP1 wird für 2028 erwartet. Derzeit müssen 100 % der Chips (einschließlich der in Phoenix, Arizona, hergestellten) zur Verpackung nach Taiwan zurücktransportiert werden. Amkor plant die Massenproduktion im Werk Arizona für Anfang 2028.

[^32]: [PTI PiFO-Packaging als Alternative zu CoWoS-L](https://www.trendforce.com/news/) — TrendForce am 10. November 2025: „PiFO advanced packaging technology—benchmarked against TSMC's CoWoS-L—has emerged as the industry's top alternative“, bietet eine bessere Wärmeableitung durch Glassubstrate und ist etwa 30 % kostengünstiger in der Produktion. Mehrere US-KI-Chiphersteller suchen händeringend nach Unterstützung, die Aufträge sind bereits bis 2027 ausgebucht. Die Abnehmer sind jedoch „andere US-KI-Chiphersteller“ und nicht explizit die Haupt-GPUs von NVIDIA.

[^33]: [TrendForce: CoWoS-Lücke schließt sich durch Eigenkapazitätserweiterung von TSMC](https://www.trendforce.com/news/) — TrendForce am 15. Juni 2026: „the CoWoS supply-demand gap is expected to narrow significantly from around 20% currently to about 10% by the end of 2026“, die monatliche Kapazität könnte 2026 mit 120.000 bis 140.000 Einheiten einen neuen Höchststand erreichen; die Lücke schließt sich durch die Kapazitätserweiterung von TSMC selbst und nicht durch alternative Anbieter.

[^34]: [Shin Kong Life sicherte sich 2021 die Erbrechte für T17/T18 im Beitou-Shihlin Science Park](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: Im Jahr 2021 verkaufte die Stadtverwaltung von Taipeh die Erbrechte für T17 und T18 im Beitou-Shihlin Science Park (insgesamt 3,89 Hektar) für eine Laufzeit von 50 Jahren (die Anforderung eines Investitionsplans wurde aufgehoben). Shin Kong Life war der einzige Bieter und gewann mit NT$2,8 Milliarden für T17 und NT$1,6 Milliarden für T18 (insgesamt NT$4,4 Milliarden); das Land lag drei Jahre lang brach.

[^35]: [Jensen Huang kündigt auf Computex 2025 an, dass Constellation-Hauptsitz im Beitou-Shihlin Science Park angesiedelt wird](https://focustaiwan.tw/business/202505190009) — Focus Taiwan: Jensen Huang gab auf der Computex im Mai 2025 bekannt, dass das ausländische Hauptquartier von NVIDIA, „Constellation“, für den Beitou-Shihlin Science Park vorgesehen ist. Mit einer Investition von über NT$40 Milliarden soll der Bau 2026 beginnen, die Inbetriebnahme 2030 erfolgen und über zehntausend Arbeitsplätze geschaffen werden.

[^36]: [NVIDIA, Shin Kong Life und Stadtverwaltung von Taipeh in fünfmonatiger Sackgasse](https://news.pts.org.tw/article/777650) — PTS: Da sich die Erbrechte für T17/T18 im Beitou-Shihlin Science Park in den Händen von Shin Kong Life befinden und öffentliche Erbrechte nicht direkt übertragen werden können, steckten die drei Parteien bei der Landbeschaffung etwa fünf Monate lang fest.

[^37]: [Taipeh Stadtrat genehmigt 4,434 Milliarden für Vertragsauflösung](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: Am 12. November 2025 genehmigte der Stadtrat von Taipeh ohne Einwände eine Auflösungsgebühr in Höhe von NT$4.434.064.085, die von der Stadtverwaltung an Shin Kong Life gezahlt wird, um das Land zurückzufordern; die Löschung des Erbrechts erfolgt am 28. Dezember.

[^38]: [You Shu-hui kritisiert die Abrechnung zur Vertragsauflösung von Shin Kong Life](https://www.nextapple.com/) — ETtoday (verifiziert durch WebFetch): Die KMT-Abgeordnete You Shu-hui sagte wortwörtlich: „Wenn ich sehe, dass in der 8-seitigen Rechnung von Shin Kong Life sogar Kosten für Rasenmähen, Umweltpflege, Logo-Anpassungen und Notariatsgebühren von der Stadtverwaltung von Taipeh erstattet werden sollen, möchte ich nur bitter lachen... Sogar die Kosten für die Logo-Anpassung nach der Fusion von Taishin und Shin Kong Life sollen von der Stadt bezahlt werden? Das ist wirklich unglaublich... (dreimal Seufzen).“ Später: „Die Rechnung von Shin Kong Life ist unvorstellbar, aber das große Ganze hat Vorrang.“

[^39]: [Recht in einfacher Sprache: Alle Fraktionen im Rat verabschieden Vertragsauflösung harmonisch](https://plainlaw.me/) — Bewegung 'Recht in einfacher Sprache': „Am 12. November hat der Stadtrat von Taipeh die Zahlung einer Auflösungsgebühr in Höhe von NT$4,434 Milliarden genehmigt; während des Prozesses arbeiteten alle Fraktionen harmonisch zusammen, wobei die Fraktion der DPP sogar rief: ‚Unterstützt NVIDIA, unterzeichnet den Vertrag so schnell wie möglich‘“; Ratspräsident Tai Shih-chin „äußerte keine Einwände und nahm den Vorgang zur Kenntnis“, woraufhin im Saal Applaus aufkam.

[^40]: [Analyse der Zusammensetzung der Auflösungsgebühr von NT$4,434 Milliarden](https://www.nextapple.com/) — Eine Berechnung von Eslite News und den extern beauftragten Buchhaltern der Stadtverwaltung Taipeh ergab: Shinju hatte ursprünglich etwa NT$3 Milliarden gezahlt (da 3 Jahre lang nicht gebaut wurde) und stellte eine Rechnung über NT$4,7 Milliarden für die Vertragsauflösung (einschließlich Unkrautbekämpfung, Logo-Anpassung und Umzäunung). Die Buchhalter kürzten den Betrag um NT$40 Millionen auf NT$4,434 Milliarden, wobei die Eigenkosten von Shinju sowie die bereits gezahlten Steuern in Höhe von insgesamt NT$1,441 Milliarden von NVIDIA übernommen werden.

[^41]: [Stadtentwicklungsrat genehmigt Design des Hauptsitzes im 'Constellation'-Stil](https://www.cna.com.tw/news/) — CNA, 26. Januar 2026: Die Zusammenlegung von T17 (2,29 Hektar) und T18 (1,6 Hektar) führt zu einer Grundflächenbebauung von 50 % auf 70 %, einer Geschossflächenzahl von 300 % und einer Höhe von 119,5 Metern. Das Gebäude wird dem Design des US-Hauptsitzes („Starship“) nachempfunden, weist eine Grünflächenquote von 80 % auf, bietet Platz für etwa 4.000 Personen und soll Ende 2026 gebaut sowie 2030 in Betrieb genommen werden.

[^42]: [NVIDIA hat derzeit etwa 1.800 Mitarbeiter in Taiwan](https://www.digitimes.com/news/a20250519PD231/) — Medien wie Digitimes schätzen, dass NVIDIA im Büro in Neihu, Taipeh (No. 8 Jihu Road), derzeit etwa 1.800 Mitarbeiter beschäftigt und drei Tochtergesellschaften unterhält; dies ist eine Medienrechnung und keine offizielle Zahl.

[^43]: [Projekt für das NVIDIA AI Innovation Research Center](https://focustaiwan.tw/business/202505190009) — Focus Taiwan und das Wirtschaftsministerium: NVIDIA erhielt 2021 die Genehmigung für das „AI Innovation Research Center Project“ mit einer Gesamtinvestition von NT$24,3 Milliarden und staatlichen Zuschüssen von NT$6,7 Milliarden. Zwischen 2022 und 2027 sollen 1.000 neue Mitarbeiter für das Forschungsteam eingestellt werden.

[^44]: [Gründung der NVIDIA Taiwan Classic Co., Ltd.](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA: NVIDIA gründete im November 2025 die „NVIDIA Taiwan Classic Co., Ltd.“. Das Stammkapital wurde von NT$1 Milliarde auf NT$3,3 Milliarden erhöht; das Unternehmen ist eine unabhängige juristische Person, die Steuern selbstständig abführen und Vermögenswerte halten kann.

[^45]: [S&P: TSMC-Stromverbrauch könnte 2030 bei 23,7 % des taiwanesischen Gesamtverbrauchs liegen](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — The Initium und S&P Global: Der Stromverbrauch von TSMC betrug 2023 genau 24,775 Milliarden kWh, was 8,96 % des taiwanesischen Gesamtverbrauchs entspricht (16,2 % im Industriesektor). Im Jahr 2024 lag der Verbrauch bei 27,456 Milliarden kWh, wobei erneuerbare Energien nur 14,1 % ausmachten; S&P prognostiziert, dass der Stromverbrauch bis 2030 auf 23,7 % des taiwanesischen Gesamtverbrauchs ansteigen könnte.

[^46]: [Greenpeace: „Schatten nach dem Chip-Glanz“](https://www.greenpeace.org/taiwan/press/44037/) — Greenpeace-Bericht vom 10. April 2025 (Wortlaut verfügbar): Der weltweite Stromverbrauch für die Herstellung von KI-Chips stieg von 218 GWh auf 984 GWh (mehr als das 3,5-fache), wobei der Stromverbrauch in Taiwan massiv auf 375,8 GWh anstieg und damit „38 % des weltweiten Gesamtvolumens ausmacht“. Die CO2-Emissionen von TSMC-KI-Chips erreichten 185.700 Tonnen und machten das Unternehmen zum „Emissionsführer“; NVIDIA wurde mit der Note F bewertet, da die Emissionen in der Lieferkette innerhalb von drei Jahren von 3,51 Millionen auf 6,91 Millionen Tonnen stiegen – dies sei „nur eine Verlagerung der Kohlenstoffemissionen und Verschmutzung der Lieferkette in andere Teile der Welt“.

[^47]: [Aufbereitetes Wasser in Tainan geht fast vollständig an TSMC](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — The Initium: Der tägliche Wasserverbrauch von TSMC liegt bei über 200.000 Tonnen (56.000 Tonnen im Hsinchu Science Park, 53.000 Tonnen im Central Taiwan Science Park und 99.000 Tonnen im Southern Taiwan Science Park). Die vier Wasseraufbereitungsanlagen in Tainan liefern täglich 81.000 Tonnen, die „fast vollständig an TSMC gehen“.

[^48]: [Landwirtschaftliche Flächen in Jianan wurden 2021 und 2023 zweimal zur Bewässerungspause für Halbleiter genutzt](https://theinitium.com/) — Berichte von The Initium u. a.: In der Region Jianan wurde die Bewässerung in den Jahren 2021 und 2023 zweimal eingestellt, um das Bewässerungswasser der Halbleiterindustrie zuzuführen.

[^49]: [Ein 12-Zoll-Wafer benötigt 8.327 Liter Wasser](https://www.greenpeace.org/taiwan/) — Greenpeace und Brancheninformationen: Die Herstellung eines einzigen 12-Zoll-Wafers erfordert etwa 8.327 Liter Wasser.

[^50]: [60.000 Arbeitsplätze in Beishi Science Park konkurrieren um 1.476 Wohneinheiten](https://house.udn.com/house/story/123590/8769929) — Economic Daily News Real Estate: Das Wirtschaftsministerium der Stadt Taipeh schätzt, dass die ständige Erwerbsbevölkerung im Beishi Science Park 60.000 Personen erreichen könnte, während laut 591-Statistiken nur etwa 1.476 verkaufbare Wohneinheiten zur Verfügung stehen und Wohnbauflächen nur 13,8 % des Gesamtgebiets ausmachen.

[^51]: [Neue Projekte in Kernlage von Beishi Science Park überschreiten NT$1,5 Millionen pro Ping](https://www.ctee.com.tw/news/20260603701575-430601) — Commercial Times Bericht vom Juni 2026: Die Preise für Neuprojekte in der Kernlage des Beishi Science Park überstiegen NT$1,5 Millionen pro Ping („60.000 Menschen konkurrieren um 1.500 Einheiten“). Anwohner befürchten Staus wie in Neihu und hinterfragen, „warum die Preise steigen, obwohl das Unternehmen noch nicht einmal mit dem Bau begonnen hat“.

[^52]: [Echtzeit-Immobilienpreise: Höchster Verkauf im Bezirk Shilin bei NT$1,88 Millionen pro Ping](https://lvr.land.moi.gov.tw/) — Immobilientransaktions-Service des Innenministeriums: Der höchste Verkaufspreis für ein Wohngebäude im Bezirk Shilin im Jahr 2025 lag bei NT$570.400 pro Quadratmeter (ca. NT$1,88 Millionen pro Ping; Jihu Road Nr. 39, Gesamtpreis NT$447 Millionen), wobei viele Einträge über NT$1,5 Millionen pro Ping liegen. Hinweis: Dies betrifft Luxusimmobilien in Tianmu und im Stadtgebiet von Shilin, nicht den Beishi Science Park selbst.

[^53]: [Branchenvertreter: Mangelnde Infrastruktur führt dazu, dass ein Drittel der Mitarbeiter kündigt](https://house.udn.com/house/story/123590/8769929) — United Daily News Real Estate zitiert Branchenvertreter (anonym): „Aufgrund der schlechten Lebensqualität und Infrastruktur sind viele Mitarbeiter nicht bereit, in das Industriegebiet umzuziehen... sogar nach dem Umzug kündigten ein Drittel der Mitarbeiter aufgrund des schwierigen Verkehrs“; Verkehrsminister Hsieh Ming-hung gab an, dass für den Beishi Science Park die Prüfung von drei zusätzlichen Buslinien erfolgt.

[^54]: [PTT Anonyme Meinungen: Wechsel zum Thema Nvidia](https://www.ptt.cc/) — Anonyme Diskussionen auf PTT (nicht persönlich rückverfolgbar, dienen als anonyme öffentliche Meinung): „Der Effekt von TSMC wurde zuvor satt, jetzt wird einfach das Thema Nvidia gewechselt.“ „Viele Ingenieure in Neihu wohnen in anderen Landkreisen; wenn Nvidia zum Taipei Science Park kommt, werden sie dann alle dorthin ziehen? Das ergibt logisch keinen Sinn.“

[^55]: [Debatte über Silizium-Schild und Silizium-Falle](https://www.researchgate.net/) — ResearchGate untersucht im Jahr 2025 das Thema „Silicon Shield or Silicon Trap?“ und erörtert die Doppelnatur der Konzentration der Chipindustrie in Taiwan, die sowohl als abschreckender Schutz (Silizium-Schild) als auch als Anreiz für Aggressionen bzw. Single Point of Failure (Silizium-Falle) fungiert.

[^56]: [Gegenargumente zur „Broken Nest“- oder „Verbrannte Erde“-Strategie](https://thenewslens.com/) — The News Lens und die US Army War College Publikation Parameters (McKinney & Harris, 2021) zum „Broken Nest“-Diskurs und dessen Gegenargumenten: „Ökonomische Selbstschädigung mag China kurzfristig zwar abschrecken, könnte die chinesische Aggression jedoch nur so lange verzögern, bis China seine heimischen Halbleiterproduktionsziele erreicht.“ sowie „Es ist unwahrscheinlich, dass die taiwanesische Öffentlichkeit eine solche Sabotage als im eigenen Interesse liegend betrachten würde.“

[^57]: [TSMC erweitert US-Produktion mit 165 Milliarden US-Dollar](https://www.foreignaffairs.com/) — TSMC kündigte an, insgesamt 165 Milliarden US-Dollar (65 Milliarden plus 100 Milliarden) in Arizona, USA, zu investieren, um die Kapazitäten zu erweitern und geopolitische Risiken zu streuen.

[^58]: [MIT Technology Review: Taiwans Silizium-Schild könnte geschwächt werden](https://www.technologyreview.com/) — MIT Technology Review vom 15. August 2025, „Taiwan's silicon shield could be weakening“: „Einige Taiwan-Experten und Bürger der Insel sind nun besorgt, dass dieser ‚Silizium-Schild‘, sofern er jemals existiert hat, Risse bekommt.“ Es besteht die Sorge, dass die Verlagerung von Produktionskapazitäten die strategischen Vorteile Taiwans verwässert.

[^59]: [Bonnie Glaser: Das Ökosystem in Taiwan ist schwer zu replizieren](https://www.technologyreview.com/) — MIT Technology Review zitiert Bonnie Glaser von der German Marshall Fund: „Das Ökosystem, das sie geschaffen haben, ist wirklich einzigartig. Es ist ein Ergebnis des Talentpools, der Kultur und der Gesetze in Taiwan; man kann es nirgendwo sonst so einfach replizieren.“

[^60]: [Paul Triolo: Arizona wird niemals dieses Niveau erreichen](https://www.technologyreview.com/) — MIT Technology Review zitiert den Technologiepolitik-Experten Paul Triolo zur TSMC-Fabrik in Arizona: „Arizona ist noch nicht so weit und wird es auch nie sein.“

[^61]: [Jensen Huang: Taiwan ist eines der wichtigsten Länder der Welt](https://www.cna.com.tw/) — Mehrere Berichte der Central News Agency (CNA) über die öffentliche Aussage von Jensen Huang am 29. Mai 2024 in Taiwan: „Taiwan is one of the most important countries in the world.“ (Originalzitat auf Englisch).

[^62]: [Computex 2024 Rede an der NTU: Taiwan ist ein unbesungener Held und eine Säule der Welt](https://www.tbotaiwan.com/) — Vollständiges Transkript von Jensen Huangs Rede an der National Taiwan University während der Computex 2024, inklusive des Schlussvideos: „Taiwan ist ein unbesungener Held, aber eine Säule der Welt.“ „Danke, Taiwan!“ „Taiwan ist der Knotenpunkt unserer sehr geschätzten Partner; alles bei NVIDIA beginnt hier.“

[^63]: [Chen Bin-hua vom TAO reagiert auf Aussagen von Jensen Huang](https://zh.wikinews.org/) — Wiki News: Der Sprecher des chinesischen Büros für Taiwanangelegenheiten (TAO), Chen Bin-hua, äußerte sich 18 Tage nach dem Vorfall: „Gegen diese äußerst fehlerhaften Äußerungen haben die Menschen und Internetnutzer in Festlandchina bereits massiven Unmut geäußert. Taiwan ist niemals ein Land gewesen... ich hoffe, er holt hier ordentlich Nachhilfe nach.“

[^64]: [CNA: Chinesische Medien unterdrücken Huangs Aussage „Taiwan ist ein wichtiges Land“](https://www.cna.com.tw/) — Central News Agency vom 3. Juni 2024: „Die hiesigen Wirtschaftsmedien haben viele verwandte Berichte veröffentlicht, jedoch wurde die Aussage von Jensen Huang, ‚Taiwan sei ein wichtiges Land‘, nicht erwähnt; dies scheint ein sensibles Thema zu sein, das normalerweise als höchst relevant gilt.“

[^65]: [Experten: China braucht Nvidia, aber Nvidia braucht China nicht](https://www.voacantonese.com/a/china-s-media-turned-a-blind-eye-to-jensen-huang-s-statement-20240607/7646642.html) — Voice of America (Kantonesisch) zitiert Expertenkommentare, die analysieren, dass die Zensur der Aussagen von Jensen Huang („Taiwan ist ein wichtiges Land“) in chinesischen Wirtschaftsmedien das asymmetrische Verhältnis widerspiegelt: „China braucht Nvidia, aber Nvidia braucht China nicht.“

[^66]: [Lai Ching-te: Top 5 globale Rechenzentren und souveräne KI](https://www.bnext.com.tw/article/79391/sovereign-ai) — Digital Times: Lai Ching-te formulierte im Oktober 2025 das Ziel, Taiwan zu einem der „fünf weltweit führenden Rechenzentren“ zu machen und die Entwicklung von „souveräner KI“ voranzutreiben.

[^67]: [Foxconn baut nationalen Supercomputer mit 10.000 Blackwell-Chips](https://blogs.nvidia.com.tw/blog/foxconn-ai-factory-tsmc-taiwan-nvidia/) — NVIDIA Taiwan Blog: Foxconn (Big Innovation Company) baut in Kaohsiung einen nationalen Supercomputer mit 10.000 Blackwell-Chips und über 90 Exaflops, in Zusammenarbeit mit TSMC und der National Science and Technology Council, um Taiwans erste KI-Fabrik zu schaffen.

[^68]: [Exekutiv-Yuan: Die neuen zehn großen KI-Infrastrukturprojekte](https://iknow.stpi.niar.org.tw/post/Read.aspx?PostID=21832) — STPI iKnow: Der Exekutiv-Yuan plant für die „neuen zehn großen KI-Infrastrukturprojekte“, bis 2040 über NT$ 100 Milliarden zu investieren, mit dem Ziel eines Produktionswertes von 15 Billionen NT$.

[^69]: [TAIDE wie ein Highschooler, internationale Giganten sind auf Postgraduierten-Niveau](https://www.cw.com.tw/article/5137534) — Die Zeitschrift Common Wealth beschreibt das lokale taiwanische Sprachmodell TAIDE als „wie einen Highschooler, während die internationalen Giganten bereits das Niveau von Postgraduierten erreicht haben“. Das Budget für das gesamte Jahr des TAIDE-Projekts reicht nicht einmal aus, um die Kosten für ein einzelnes Training eines internationalen Modells zu decken; TAIDE startet mit 9 H100-GPUs (72 Chips).

[^70]: [Südkoreanische Regierung beschafft 260.000 GPUs](https://www.cw.com.tw/) — Berichte von Common Wealth und Branchenmedien zeigen, dass die südkoreanische Regierung direkt 260.000 GPUs beschafft hat, was im Gegensatz zur relativen Zögerlichkeit bei politischen Entscheidungen in Taiwan steht.

[^71]: [Jensen Huang auf der Computex 2026: Jährliche Ausgaben in Taiwan betragen etwa NT$ 150 Milliarden](https://cryptobriefing.com/nvidia-150b-taiwan-silicon-shield-ai/) — Laut Cryptobriefing und Reuters enthüllte Jensen Huang auf der Computex 2026, dass NVIDIA jährlich etwa NT$ 150 Milliarden in Taiwan ausgibt (vor fünf Jahren waren es nur NT$ 10 bis 15 Milliarden). Die Anzahl der Lieferkettenpartner für Vera Rubin hat sich verdoppelt und umfasst 150 Unternehmen aus Taiwan; TSMC produziert etwa 90 % der weltweit fortschrittlichsten Prozesse.
