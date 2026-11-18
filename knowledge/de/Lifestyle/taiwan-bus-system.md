---
title: 'Taiwans Bussystem: Wer übernimmt für die Menschen ohne Lenkrad, wenn der Hsinchu Busbetrieb geht?'
description: 'Am Morgen des 15. September 2024 am Bahnhof Tonglu warteten über 30 Personen – von Kindergartenkindern bis hin zu 90-jährigen Senioren – auf die letzte Linie 5658 von Hsinchu Bus. Von der ersten Verbundlinie in Taipeh im Jahr 1977 bis hin zu ländlichen Gebieten, in denen nur noch zwei Fahrten pro Tag stattfinden, einem Durchschnittsalter der Fahrer von 51 Jahren und dem TPASS-Monatsticket, das die Nutzung in Hualien um fast 70 % steigerte: Busse transportieren stets diejenigen, die keine Wahl haben – Schüler, Senioren ohne Auto und Familien ohne Fahrzeug. Doch dieses System wird ihnen Stück für Stück entzogen.'
date: 2026-06-25
category: 'Lifestyle'
tags:
  [
    'Bus',
    'Busunternehmen',
    'Öffentlicher Nahverkehr',
    'TPASS',
    'Ländliche Gebiete',
    'Verkehrsgerechtigkeit',
    'Elektrobus',
    'Open Data',
    'Fahrermangel',
  ]
subcategory: '交通與移動'
author: 'Taiwan.md Contributors'
readingTime: 24
featured: false
lastVerified: 2026-06-25
lastHumanReview: false
researchReport: 'reports/research/2026-06/台灣的公車系統.md'
image: '/article-images/lifestyle/scooters-and-bus-taipei-1996.webp'
imageCredit: 'Holly Cheng'
imageLicense: 'CC BY-SA 3.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg'
datasets:
  - name: '台灣好行各路線搭乘人次'
    url: 'https://data.gov.tw/dataset/140008'
  - name: '機動車輛登記數'
    url: 'https://data.gov.tw/dataset/14208'
relatedDiary: ['2026-06-25-204254-公車系統']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Lifestyle/台灣的公車系統.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:7d3802fe03c60e03'
sourceBodyHash: 'sha256:24a950fc8509e96a'
translatedAt: '2026-10-14T00:03:43.324603+00:00'
---

Am Morgen des 15. September 2024 vor dem Bahnhof Tonglu in Miaoli standen mehr als 30 Menschen unter der Bushaltestelle; die Jüngsten waren noch im Kindergartenalter, die Ältesten 90 Jahre alt. Sie warteten nicht auf einen Bus zur Arbeit oder zur Schule. Sie warteten auf die letzte Fahrt der Linie 5658 von Hsinchu Bus.

Ab diesem Tag zog sich dieser über ein Jahrhundert alte Betrieb vollständig aus den Gebieten Taoyuan, Hsinchu und Miaoli zurück. In Miaoli wurden 12 Linien an reservierungspflichtige Taxis wie den „Xingfu Xiaohuang“ (Glückliche kleine Gelbe) übertragen[^1]. Als der große Bus von Hsinchu Bus langsam in den Bahnhof einfuhr, brach vor Ort Applaus aus. Xu Yu-feng, ein Gemeindevertreter aus Tonglu, hatte die Menschen dazu aufgerufen, diese letzte Fahrt gemeinsam als Erinnerung zu nutzen. Er sagte: „Das Fahren mit Hsinchu Bus ist für viele eine Erinnerung und hat die Jugend vieler begleitet.“[^1]

Der Applaus galt einem Bus, doch hinter dem Applaus verbirgt sich eine noch grausamere Realität. Die Menschen, die unter der Haltestelle standen und klatschten – Grundschüler, die noch nicht selbst fahren dürfen, Großväter, die nicht mehr fahren können, und Familien ohne ein zweites Auto –, sind genau jene Gruppe, die am wenigsten spontan mobil sein kann. Busse sind für sie da. Und der Zusammenbruch des Busverkehrs in Taiwan beginnt ausgerechnet unter ihren Füßen.

> **30-Sekunden-Überblick:** Taiwans Busse transportieren „Menschen ohne Lenkrad“: Schüler, Senioren, die nicht Auto fahren, und Haushalte ohne eigenes Fahrzeug. In Haushalten ohne Auto sind 53,3 % auf öffentliche Verkehrsmittel angewiesen, in Haushalten mit Auto nur 13,7 %[^2]. Doch dieses System stellt genau dort den Betrieb ein, wo es am dringendsten benötigt wird: Die Zahl der Fahrer im Fernbusverkehr sank innerhalb von sechs Jahren von 5.646 auf 3.551 – ein Rückgang um mehr als ein Drittel[^3]. In ländlichen Gebieten gibt es nur noch zwei Fahrten pro Tag, und die letzte Fahrt endet sehr früh. Dieselbe Handlung – „auf den Bus warten“ – bedeutet in Taipeh, dass er zu lange braucht, während sie auf dem Land in Changhua die Frage aufwirft: „Kann ich überhaupt noch selbst vor die Tür gehen?“. Hinter diesem System steht ein Satz offener Daten, den sogar Google nutzt, doch an der Front sieht man oft nur wartende Fahrgäste oder Busse, die zwei Fahrten gleichzeitig schicken. Die Qualität dieses Systems misst, ob eine Gesellschaft bereit ist, diejenigen mitzunehmen, die nicht selbst auf die Straße können.

## Diejenigen, die unter dem Haltestellenschild die Hand heben

Zuerst muss eine Sache geklärt werden: Wer fährt eigentlich Bus?

Die Verkehrserhebung des Verkehrsministeriums liefert eine kontraintuitive Antwort. Betrachtet man Haushalte nach der Frage „Besitz eines Fahrzeugs“, so nutzen 53,3 % der Haushalte ohne eigenes Auto öffentliche Verkehrsmittel für ihre Mobilität, während es bei Haushalten mit Fahrzeug nur 13,7 % sind[^2]. Das ist ein Unterschied von fast dem Vierfachen. Mit anderen Worten: Die Hauptnutzer des Busverkehrs (zusammen mit der MRT und der Taiwan Railways) sind diejenigen, die kein eigenes Auto besitzen oder nicht selbst fahren. Nach Altersgruppen betrachtet ist der Unterschied noch deutlicher: Schüler und Studenten stellen die Gruppe mit der höchsten Nutzungsrate unter allen Mobilitätszwecken dar; der Anteil der Schul- und Studienwege, die mit öffentlichen Verkehrsmitteln zurückgelegt werden, liegt bei über 40 %[^2].

```tw-bars
Wer nutzt öffentliche Verkehrsmittel: Menschen mit Fahrzeug nutzen sie kaum, Menschen ohne Fahrzeug sind darauf angewiesen (Marktanteil der Mobilität in %)
*Haushalte ohne Fahrzeug | 53,3 | Nutzen dies für Mobilität
Haushalte mit Fahrzeug | 13,7
Quelle: Verkehrserhebung des Statistikamtes des Verkehrsministeriums
```

Diese Gruppe hat eine Gemeinsamkeit: Sie haben kein Lenkrad in der Hand. Teenager im Alter von zehn Jahren dürfen noch nicht selbst fahren, Senioren in ihren Siebzigern oder Achtzigern können es nicht mehr, und Haushalte, die sich kein Auto leisten können oder wollen, haben keine Wahl. Für einen 78-jährigen Großvater in Changhua geht es beim Bus nie um die Frage der „Bequemlichkeit“; er muss die Frage beantworten: „Kann ich heute selbst zum Arzt fahren? Kann ich alleine nach Hause kommen?“ Es geht um seine Würde.

Hier muss ein populäres Gegenargument entkräftet werden. In regelmäßigen Abständen behaupten Leute, dass das wahre Rückgrat Taiwans nicht der Bus, sondern das Motorrad sei und die Berichterstattung über den Bus lediglich ein „Framing der städtischen Elite“ darstelle. Dass Taiwan eine „Motorradinsel“ ist, ist eine Tatsache: Es gibt 599 Motorräder pro tausend Einwohner, 83,7 % der Haushalte besitzen ein Motorrad, und nur etwa 12,5 % der Menschen verlassen sich primär auf den öffentlichen Nahverkehr[^4]. Doch diese Argumentation richtet den Vorwurf in die falsche Richtung. Der Bus ist gerade die Lebensader der Nicht-Elite: Er transportiert Haushalte ohne eigenes Fahrzeug, Schüler und Senioren in ländlichen Gebieten, die nicht mehr selbst fahren können. Menschen, die ein Motorrad fahren können, benötigen ihn ohnehin kaum. Diejenigen, die wirklich auf den Bus angewiesen sind, sind jene, die nicht einmal ein Motorrad führen können.

> 📝 **Anmerkung des Kurators**: Die gängige Meinung interpretiert „viele Motorräder“ direkt als „Busse sind unwichtig“. Dabei wird ein entscheidender Schritt übersprungen: Das Motorrad löst das Mobilitätsproblem derer, die „selbst auf die Straße gehen können“, während der Bus das Problem derer löst, die „nicht selbst auf die Straße gehen können“. Beide dienen grundlegend unterschiedlichen Menschen. Wenn eine Buslinie in einem ländlichen Gebiet eingestellt wird, sind nicht die jungen Erwachsenen mit Motorrad betroffen, sondern zuerst die Großmutter, die den Bus für ihre Nachuntersuchung genutzt hat. Den Bus als Nebencharakter zu betrachten bedeutet, diese gesamte Personengruppe als Nebencharaktere abzutun.

Zudem gilt es, ein weit verbreitetes Missverständnis aufzuklären: Viele glauben, dass Arbeitsmigranten die Hauptnutzer des Busses seien. Das stimmt nicht. Da die Mobilität von Arbeitsmigranten in Taiwan durch politische Vorgaben über Jahre hinweg beim Fahrzeugkauf eingeschränkt war, nutzen sie für den täglichen Pendelverkehr meist das Motorrad; nur an Wochenenden nutzen sie für längere Strecken Fernbusse[^5]. Arbeitsmigranten als Hauptpassagiere des Busses zu betrachten, ist die unkritische Annahme, dass „sozial Schwächere“ automatisch gleichbedeutend mit „Busfahrern“ sind.

## Einzeltarife, Zweitarrife und das „Piep“, wenn man beim Aussteigen erneut scannen muss

![Ein Niederflurbus von Xingnan Bus in Tainan fährt auf einer Hauptlinie; an der Tür befindet sich ein Barrierefrei-Symbol und ein Niederflurdesign](/article-images/lifestyle/low-floor-bus-tainan-2016.webp)
_Ein Niederflurbus von Xingnan Bus in Tainan, 2016. Das Niederflurdesign ermöglicht das Einsteigen mit Kinderwagen und Rollstühlen und ist ein entscheidender Indikator für die „Barrierefreiheit“ von Stadtbussen. Foto: Nutnse0008, CC BY-SA 4.0 (Quelle siehe Bildnachweis am Ende des Artikels)._

Es ist eine Abfolge von Handgriffen, die Taiwaner von klein auf beherrschen, die Ausländer jedoch oft ratlos zurücklässt: An der Haltestelle muss man das Handzeichen heben, sonst fährt der Fahrer ohne Halt vorbei. Beim Einsteigen macht es „Piep“, und manchmal muss man beim Aussteigen noch einmal „Piep“ machen. Hinter diesen Abläufen steckt ein weitaus präziseres Tarifsystem, als man vermuten würde.

Der Ursprung dieser Abläufe liegt im Jahr 1977. Davor betrieben die verschiedenen Busunternehmen in Taipeh ihre Dienste völlig eigenständig; Liniennummern, Fahrpreise und Fahrscheine waren nicht vereinheitlicht. 1976 wurde in Taipeh das „Vorbereitungskomitee für die Kooperation von öffentlichen und privaten Busunternehmen“ gegründet, um diese Strukturen zu vereinheitlichen. Am 1. Januar 1977 nahmen die kooperierenden Linien 202 und 202 den Betrieb auf. Am 30. April desselben Jahres wurde die erste Phase mit 33 kooperierenden Buslinien offiziell in Betrieb genommen[^6]. Das Konzept der „Kooperation“ bedeutete: Unabhängig davon, welches Unternehmen den Bus betrieb, die Fahrgäste nutzten dieselben Liniennummern, dieselben Tarife und dieselben Fahrscheine. Dies markierte den Beginn des modernen Stadtbus-Systems in Taiwan.

Auch das zonale Tarifsystem (Etappenabrechnung) entwickelte sich aus dieser Struktur. Mit der Ausdehnung der Städte bis nach Neu-Taipeh konnte eine einzelne Fahrt mehrere Tarifzonen durchqueren: Das alte Stadtgebiet galt als eine Etappe, die Erweiterung in die Außenbezirke als zwei oder drei Etappen. Die Übergangspunkte wurden meist an Verkehrsknotenpunkten wie der Taipei Bridge oder in Shilin sowie nahe der Stadtgrenzen festgelegt. Innerhalb von zwei Haltestellen vor oder nach diesen Punkten galt das Ein- und Aussteigen jedoch weiterhin nur als eine Etappe (dies wird als „Pufferzone“ bezeichnet). Das ist der Grund, warum man bei Linien, die verschiedene Zonen durchqueren, beim Einsteigen scannen muss und auch beim Aussteigen: Das System muss wissen, wie viele Etappen man zurückgelegt hat und wie viel Geld entsprechend abgebucht werden muss. Die Verwirrung ausländischer Freunde darüber, „warum man manchmal vorne und manchmal hinten einsteigt“, liegt ebenfalls darin begründet: Wo man ein- oder aussteigt und ob man einmal oder zweimal scannen muss, hängt ganz davon ab, wie die jeweilige Linie in Etappen unterteilt ist.

Auch die Fahrscheine selbst haben eine Evolution durchlaufen. Die EasyCard wurde Ende September 2002 flächendeckend im Busverkehr eingeführt[^7], während die iPASS in Kaohsiung im Jahr 2014 zusammen mit der Kaohsiung MRT auf den Markt kam[^7]. Das beidseitige Scannen (beim Einsteigen und beim Aussteigen) wurde in einer ersten Phase am 1. Juli 2019 eingeführt und in einer zweiten Phase im Februar 2020 vollständig umgesetzt. Ziel war es, die Etappengebühren präzise zu berechnen, Umsteigerrabatte zu gewähren und gleichzeitig Daten über das Ein- und Aussteigen der Fahrgäste zu sammeln[^8]. Hier ist eine häufige Fehlannahme zu korrigieren: Das beidseitige Scannen begann 2019, nicht 2012. Die Einführung von iPASS war 2014, ebenfalls nicht 2012.

Dieses System stößt jedoch an seine Grenzen. Das Fahrgastaufkommen der Stadtbusse in Taiwan ist extrem auf das Gebiet von Taipeh und Neu-Taipeh konzentriert: Im Jahr 2020 entfielen 73,7 % des gesamten Fahrgastaufkommens der Stadtbusse Taiwans auf diese beiden Gebiete[^9]. Eine Hauptlinie in Taipeh verkehrt zur Stoßzeit alle 4 bis 6 Minuten – die Menschen in Taipeh beschweren sich bereits, wenn sie 5 Minuten warten müssen. Zur gleichen Zeit fährt an einer Haltestelle im Zentrum oder Osten des Landes vielleicht nur einmal pro Stunde ein Bus, und der letzte Bus fährt bereits gegen 17:00 oder 18:00 Uhr. Das System ist dasselbe, doch je nach Ort bedeutet es zwei völlig unterschiedliche Lebensrealitäten.

## Google weiß, wie viele Minuten dein Bus noch braucht, weil Taiwan seine Daten offenlegt

Du öffnest dein Smartphone und siehst den Countdown: „Ankunft in 3 Minuten“. Was völlig selbstverständlich erscheint, ist in Wahrheit eine wenig bekannte Errungenschaft Taiwans.

Seit 2015 hat Taiwan damit begonnen, die Daten des landesweiten öffentlichen Nahverkehrs zu inventarisieren und einheitliche Standards festzulegen. 2016 wurde die PTX-Plattform errichtet, die im Dezember 2022 zur heutigen TDX (Transport Data Exchange) integriert und aufgewertet wurde[^10]. Ihr Umfang ist enorm: Tausende von Datensätzen, über 4,9 Millionen API-Aufrufe pro Tag, mehr als 540 Millionen kumulierte Datentransfers und über 3.000 Anbieter von Mehrwertdiensten nutzen das System[^11]. Entscheidender ist jedoch, dass die Ankunftsinformationen für Busse in Taiwan auf Google Maps tatsächlich durch lokale Partner bezogen werden, die auf die Daten der TDX/PTX zugreifen[^11]. Dies macht Taiwan zu einem der wenigen Orte weltweit, an denen Google Maps über „feingranulare Vorhersagen der Busankunft“ verfügt.

Man muss hier jedoch ehrlich bleiben und das Ganze nicht überbewerten. Taiwans Open Data ist „regional führend“, aber nicht „weltklasse“ im Sinne internationaler Zertifizierungen. Das System nutzt ein eigenes OData-Format mit „vier Sternen“ anstelle des international üblichen GTFS/GTFS-RT-Standards, was die direkte Integration in das globale Ökosystem erschwert. Zudem gibt es keine internationalen Organisationen, die Taiwan als Benchmark für Open Data führen[^12]. Die Stärke liegt in der Skalierung und Verbreitung, die Schwäche in der internationalen Standardisierung.

Zudem kann selbst das intelligenteste Backend das Nutzererlebnis an der Benutzeroberfläche nicht retten. Alle Bus-Apps (wie „Taipei Bus“, verschiedene „BusTracker“ oder „Cloud Bus“) greifen im Hintergrund eigentlich auf dieselbe TDX-Plattform zu; sie unterscheiden sich lediglich in der grafischen Oberfläche[^13]. Daher ist die Ankunftszeit, die du in App A siehst, exakt dieselbe wie in App B, da beide auf derselben Datenbasis operieren. Das eigentliche Problem liegt an der Quelle: In Städten mit hohen Gebäuden schwankt das GPS-Signal, wodurch auch die Vorhersage der Busankunft ungenau wird.

Ein anschauliches Beispiel für dieses Problem sind die Beschwerden von Netzbürgern aus Taichung auf PTT. Ein Nutzer namens LeiHide schrieb: „Letztes Mal habe ich in der App auf den Bus gewartet; die App zeigte an, dass zwei Busse einfahren würden, aber es kam kein einziger“ – „Das sind reine Geisterbusse“. Ein anderer Nutzer, teddykitty, sagte: „Es sollte eigentlich die Fahrt um 6:50 Uhr sein, aber weder ich noch zwei andere Frauen, die ich nicht kannte, haben den Bus bekommen; wir standen alle nur dumm da zu warten“[^14]. Während das Backend landesweit einheitliche Open Data bereitstellt, sieht die Realität an der Haltestelle so aus, dass drei Fremde gemeinsam auf einen Bus warten, der niemals kommt. Das ist das widersprüchlichste Gesicht des taiwanischen Busverkehrs.

(Ein oft missverstandener Punkt: Im Internet wird behauptet, „1968“ sei eine App für die Stadtbusse von Taipeh. Das stimmt nicht. 1968 ist ein Nummerierungssystem für Nationalstraßen und gehört zu einer App der Straßenverkehrsbehörde für Echtzeitinformationen auf Nationalstraßen; es hat nichts mit den Stadtbussen zu tun[^13].)

## Zwei Busse kommen gleichzeitig, gefolgt von langem Warten

![Bushaltestelle an der Zhengzhou Road bei Taipei Main Station, Haltestellenschild und wartende Fahrgäste](/article-images/lifestyle/taipei-bus-shelter-2020.webp)
_Bushaltestelle an der Zhengzhou Road bei Taipei Main Station, 2020. Für Menschen ohne eigenes Auto ist das Haltestellenschild der tägliche Ausgangspunkt und auch ein Ort des langen Wartens. Photo: T Gordon Cheng, CC BY-SA 4.0 (Quelle siehe Bildnachweis am Ende des Artikels)._

Jeder, der schon einmal mit dem Bus gefahren ist, kennt diese Absurdität: Man wartet 20 Minuten lang auf keinen einzigen Bus, und dann rollen zwei Busse mit derselben Liniennummer direkt hintereinander in die Haltestelle.

Dieses Phänomen nennt man „Bus Bunching“ (Bus-Clustering). Es ist eine physikalische Eigenschaft von Bussystemen und hat nichts damit zu tun, ob die Fahrer faul sind oder nicht. Wenn der erste Bus leicht Verspätung hat, sammeln sich unterwegs immer mehr Fahrgäste an, das Ein- und Aussteigen dauert länger, wodurch er immer langsamer wird. Der nachfolgende Bus hingegen fährt aufgrund des geringeren Fahrgastaufkommens – da der erste Bus bereits alle mitgenommen hat – reibungslos voran, holt auf und schließlich kleben beide Busse aneinander. Je größer die Taktzeiten auf einer Route sind, desto heftiger rollt dieser Schneeballeffekt.

Für die Menschen in Taipeh ist Bus Bunching nervig. Für Menschen in ländlichen Gebieten ist es schlichtweg Luxus – sie erleben nicht einmal das Szenario „zwei Busse kommen gleichzeitig“, da es pro Tag nur wenige Fahrten gibt. Dies führt zurück zu der unsichtbaren Kluft zwischen Stadt und Land: Die Menschen in Taipeh beschweren sich, wenn sie 5 Minuten warten müssen, weil sie die Wahl haben, sich zu beschweren. Wer auf dem Land in Changhua 40 Minuten wartet oder am Tag nur zwei Busse zur Verfügung hat, hat diese Wahlmöglichkeit nicht. Es ist derselbe Begriff, aber er beschreibt zwei völlig unterschiedliche Lebensrealitäten. Je weniger Optionen man hat, desto seltener bekommt man einen Bus – dieser Satz wird in diesem Artikel immer wiederkehren.

## Wie aus illegalen „Wildhühner-Bussen“ die United Bus wurde

![Ein Fernbus von Kuo-Kuang Motor Transport auf der Autobahn, Kennzeichen KKA-1897](/article-images/lifestyle/kuokuang-intercity-coach-2026.webp)
_Ein Fernbus von Kuo-Kuang Motor Transport im Jahr 2026. Sein Vorgänger war die Taiwan Motor Transport Company aus der Ära des staatlichen Monopols durch das Highway Bureau; im Jahr 2001 wurde das Unternehmen durch Kapitalbeteiligungen von tausenden Mitarbeitern übernommen. Foto: Wei Ting Hsu, CC BY-SA 4.0 (Bildquellen siehe Ende des Artikels)._

Um zu verstehen, warum der heutige Busverkehr so aussieht, muss man zurückblicken, wie er sich von einem staatlichen Monopol zu einer Branche entwickelte, in der Busse überall auf den Straßen zu finden sind.

Der Ursprung des Busverkehrs in Taiwan liegt beim 1946 gegründeten Highway Bureau der Provinz Taiwan. Im Jahr 1977 wurde der Busbetrieb des Highway Bureau ausgegliedert und die Taiwan Motor Transport Company (kurz: Tai-Qi) gegründet. Auf ihrem Höhepunkt betrieb sie über 500 Linien mit 3.600 Fahrzeugen und mehr als zehntausend Mitarbeitern[^15]. Dies war die Ära, in der das Highway Bureau den Fernbusverkehr monopolisierte – eine Zeit, an die sich die ältere Generation noch gut erinnert.

Der Wendepunkt kam um die Zeit der Aufhebung des Kriegsrechts herum. Ende der 1980er Jahre tauchten vermehrt illegale „Wildhühner-Busse“ (野雞車, _yějīchē_) auf – Fahrzeuge ohne Lizenz, die privat Fahrgäste beförderten. Anstatt zu versuchen, diese unaufhörlich zu unterbinden, entschied sich das Verkehrsministerium dafür, sie zu legalisieren. Am 6. September 1989 wurde die United Bus (統聯客運) offiziell gegründet. Der Name wurde von Chang Chia-chu, dem damaligen Direktor des Forschungsinstituts für Verkehr beim Verkehrsministerium, gewählt und sollte die Bedeutung „die vier Himmelsrichtungen anführen und gemeinsam operieren“ tragen. Damit wurde United Bus das erste legale private Unternehmen für den Fernbusverkehr auf Autobahnen in Taiwan[^16]. Sobald der Markt geöffnet war, traten nacheinander Unternehmen wie Ho-Shin, Kavalan, Aloha und Capital Bus bei, wodurch sich der Fernbusverkehr von einem Monopol zu einem wettbewerbsintensiven Markt mit zahlreichen Anbietern wandelte.

```tw-timeline
1946 | Gründung des Highway Bureau der Provinz Taiwan | Staatlich geführt, Monopol auf den Busverkehr in Taiwan
1977 | Ausgliederung der Tai-Qi Motor Transport Company | Busbetrieb des Highway Bureau wird ausgegliedert, zeitweise über 10.000 Mitarbeiter
1989 | Gründung der United Bus | Legalisierung illegaler Busse, erstes privates Unternehmen für Autobahn-Fernbusse
2001 | Übernahme durch Kuo-Kuang Motor Transport | Tai-Qi verzeichnete jährliche Verluste von 5 Mrd. NT$; tausende Mitarbeiter gründeten durch Kapitalbeteiligung Kuo-Kuang
Quelle: Historische Unterlagen zum Highway Bureau, Tai-Qi und Kuo-Kuang (Tai-Qi mit über 500 Linien, 3.600 Fahrzeugen und 1.090 Mitarbeitern im Jahr 2001, die durch Kapitalbeteiligung gründeten) sowie Berichte zur Gründung der United Bus im Jahr 1989[^15][^16]
```

Der staatliche Sektor erlebte hingegen keinen so glanzvollen Aufstieg. Tai-Qi machte über Jahre hinweg Verluste; in einem Jahr betrug der Verlust etwa 5 Milliarden NT$, die durch den Staatshaushalt subventioniert werden mussten. Nach der Marktöffnung schrumpften die Liniennetze und die Belegschaft drastisch[^15]. Im Juni 2001 gründeten 1.090 Mitarbeiter von Tai-Qi das Unternehmen Kuo-Kuang Motor Transport, indem jeder von ihnen 300.000 NT$ einbrachte. Im Juli übernahm das neue Unternehmen die 96 Linien, die zuvor zu Tai-Qi gehörten[^15]. Viele mittelalte Mitarbeiter in ihren Vierzigern oder Fünfzigern, die die Bedingungen für eine Pensionierung noch nicht erfüllt hatten, protestierten gegen diesen Schritt. Der Name „Kuo-Kuang-Hao“ (國光號) stammt eigentlich von einem Goldstandard-Busmodell der Tai-Qi aus dem Jahr 1967 – ein Imperium verabschiedete sich und hinterließ seinen Markennamen den Nachfolgern.

(Diese institutionelle Geschichte dient lediglich als Hintergrund. Die Nostalgie rund um die Linien „Jinma-Hao“ bis „Kuo-Kuang-Hao“ sowie die Details über die damalige Unkontrollierbarkeit der illegalen Busse sind Thema eines anderen Artikels über Reisebusse; hier dienen sie nur zur Orientierung.)

## Um 5:30 Uhr Arbeitsbeginn, um 20:00 Uhr Feierabend, nur vier freie Tage im Monat

Es gibt keine böswilligen Akteure, die Buslinien nach der anderen streichen. Der direkteste Grund ist simpel: Es mangelt an Fahrern.

Die Zahlen sind ernüchternd. Die Zahl der Fahrer im Stadtbusverkehr sank von 11.811 im Jahr 2015 auf 10.588 im Jahr 2023; das Durchschnittsalter stieg im gleichen Zeitraum von 45,2 auf 51,2 Jahre – ein Anstieg um sechs Jahre innerhalb eines Jahrzehnts[^17]. Im Fernbusverkehr sieht es noch schlimmer aus: Die Zahl der Fahrer fiel von 5.646 im Jahr 2019 auf 3.551 im Jahr 2024, was einem Rückgang von über einem Drittel in nur sechs Jahren entspricht[^3]. Betrachtet man die Lücken in ganz Taiwan, fehlen im Stadtverkehr 1.443 Fahrer und im Fernbusverkehr 772. Rechnet man die Reisebusfahrer hinzu, fehlen bei den Großraumomnibussen insgesamt über 5.000 Fahrer[^17][^3]. Der Anteil der jungen Fahrer unter 35 Jahren ist von 14 % vor zehn Jahren auf dramatische 5,6 % eingebrochen[^17]. Die Branche altert rasant und es fehlt an Nachwuchs.

```tw-line
Immer weniger Menschen fahren Busse, und sie werden immer älter (Stadtbusfahrer)
Jahr | Anzahl der Fahrer | Durchschnittsalter
2015 | 11811 | 45,2
2023 | 10588 | 51,2
Quelle: Verkehrsministerium, United Daily News Sunshine Action
```

Warum kommen junge Menschen nicht, und warum können erfahrene Fahrer nicht gehalten werden? Die Antwort liegt in der Lohnstruktur. Untersuchungen von _The Reporter_ bei Taoyuan Bus ergaben, dass das Monatsgehalt der Fahrer aus bis zu 14 verschiedenen Posten besteht. Das Grundgehalt beträgt lediglich NT$26.400; der Rest muss durch Überstundenvergütungen (35 % bis 40 %) sowie „Kilometerprämien“ und „Fahrgastprämien“ zusammengewürfelt werden[^18]. Das Problem ist, dass diese beiden Prämien nicht in das feste Monatsgehalt eingerechnet werden. Bei der Berechnung des durchschnittlichen Stundenlohns zur Ermittlung der Überstundenvergütung kam der Reporter lediglich auf NT$88[^18]. Auch die Arbeitszeiten sind extrem belastend: Die maximale reine Fahrzeit beträgt 10 Stunden pro Tag, aber die Wartezeiten („Bereitschaft“) zählen nicht als Arbeitszeit. Eine typische Schicht beginnt um 5:30 Uhr und endet um 20:00 Uhr – das bedeutet eine Bindung an den Betriebshof für 16 Stunden, bei nur 4 bis 5 freien Tagen im Monat[^18]. Über die Fahrerunterkünfte von Taoyuan Bus berichtete der Reporter: Auf weniger als 15 Quadratmetern (5 Ping) sind acht Etagenbetten aufgestellt, und 16 Fahrer müssen sich ein winziges Badezimmer teilen[^18].

Diese Struktur erzwingt individuelle Entscheidungen. Chen Wei-chen, ein aktiver Fahrer bei Taoyuan Bus, sagt es unverblümt: „Wir brauchen Geld. Die Leute sind nur bereit, sich so abzumühen, weil sie das Geld brauchen. Aber jetzt kürzt die Firma ständig die Arbeitsstunden, und das wird immer extremer.“ Er rechnet vor: „Das Gehalt reicht nicht mehr aus. Früher waren es 60.000 NT$ im Monat, jetzt sind es nur noch 45.000 bis 48.000 NT$. Obwohl ich noch sechs Jahre bis zur Rente habe, möchte ich nicht mehr weitermachen.“[^18]

Wo gehen die Leute hin, die kündigen? Die meisten wechseln in die Logistikbranche, zum Lieferdienst oder zu Uber. Xu Yong-fa, ein ehemaliger Fahrer bei Taoyuan Bus, arbeitet nach seinem Ausscheiden in der Logistik. Sein Monatsgehalt ist um mehr als 10.000 NT$ gesunken, aber er sagte einen Satz, der die Lage der Branche auf den Punkt bringt: „Menschen zu transportieren ist anders als Fracht. Der Druck ist nicht so groß, man muss nicht ständig in Angst leben, und das Gehalt, das einem zusteht, zahlt die Firma auch.“ Seit seinem Ausscheiden „weiß er endlich, was ein Wochenende mit zwei freien Tagen bedeutet“[^18]. Zhang Xian-de, stellvertretender Abteilungsleiter bei Sanchong Bus, verdeutlicht diesen Logikbruch durch einen direkten Vergleich: „Es ist beides das Fahren von Fahrzeugen... In der Logistik fällt die Ware runter, man macht einfach Verlust. Aber im Busverkehr fallen die Fahrgäste runter – und dann verliert man Zähne.“[^19]

Dies ist jedoch keine einseitige Geschichte von „schlechten Fahrern und unhöflichen Fahrgästen“. Auch auf der Seite der Fahrgäste gibt es Druckquellen: Eine einzige Beschwerde kann einen Fahrer tausende NT$ kosten. Daher entwickeln viele Fahrer eine defensive Haltung und vermeiden jegliche Interaktion, wann immer möglich[^18]. Das Klischee in der Öffentlichkeit, dass „Busfahrer zu schnell fahren und eine schlechte Einstellung haben“, basiert auf der realen Struktur aus extrem langen Arbeitszeiten und drohenden Lohnabzügen. Auf der anderen Seite steht der Druck durch die „Beschwerde-Experten“ aus Sicht der Fahrgäste. Beide Seiten werden von demselben unvernünftigen System eingezwängt.

Der Satz, der am meisten unter die Haut geht, stammt von Fan Guang-ming, einem Fahrer bei Taoyuan Bus und aktiven Gewerkschaftler. Wenn er über Überstunden spricht, ist er wütend: „11 Stunden oder 8 Stunden sind doch alles Lüge! Bei Taoyuan Bus schläft garantiert kein Fahrer mehr als 8 Stunden!“[^18]. Doch als er davon erzählt, wie er aufgrund eines Zeitdrucks beim Dienst seinen Vater im Sterben verpasste, schlägt die Wut in Reue um: „Als ich im Krankenhaus ankam, war der Leichentuch schon über ihn gelegt. Ich konnte nicht einmal mehr ‚Papa‘ sagen. Am Tag der Beerdigung habe ich mich 12-mal vor meinem Vater niedergestreckt. Ich bin ein unfilialer Sohn.“[^18]

> 📝 **Kuratorische Anmerkung**: Wenn wir an Haltestellen darüber klagen, dass der Bus „schon wieder nicht kommt“ oder „so schnell fährt“, steht hinter dieser Beschwerde ein Mensch, der in einem 15 m² großen Zimmer Schicht arbeitet und für einen Stundenlohn von NT$88 so hart kämpft, dass er seinen Vater nicht ein letztes Mal sehen konnte. Die Wurzel des Fahrermangels ist weitaus komplexer als nur „die Jugend will nicht hart arbeiten“: Eine Struktur, die mit dem niedrigsten Fixgehalt und den längsten Wartezeiten eine Arbeit stützen soll, bei der Fehler die höchsten Kosten verursachen (weil es Menschen sind, die „herunterfallen“), bricht schließlich zusammen. Die Busse fahren nicht mehr, weil immer weniger Menschen bereit sind, sich in diesem System aufreiben zu lassen.

## Nachdem Hsinchu Bus den Dienst eingestellt hat

![Ein kleiner Xingfu-Bus für ländliche Gebiete im Landkreis Hsinchu steht an der Startstation, die Karosserie ist mit dem Schriftzug „Xingfu Bus“ bedruckt](/article-images/lifestyle/happy-bus-hsinchu-rural-2025.webp)
_Ein kleiner Xingfu-Bus für ländliche Gebiete in den Gemeinden Hukou und Baoshan im Landkreis Hsinchu, 2025. Nachdem Hsinchu Bus aus der Region Tao-Chu-Miao ausgeschieden ist, haben diese auf Reservierung basierenden Minibusse Teile der eingestellten Linien übernommen. Foto: T Gordon Cheng, CC BY-SA 4.0 (Quellen siehe Bildnachweis am Ende des Artikels)._

Wo explodierte der Fahrermangel zuerst? Dort, wo es keine Alternativen gibt.

Zurück zu der Szene am Anfang. Dass Hsinchu Bus aus der Region Tao-Chu-Miao ausscheidet, ist nur ein Teil einer größeren Welle von Marktaustritten. Aloha Bus stellte 2022 den Betrieb ein. Hualien Bus beendete Ende 2023 Teile seines Betriebs; in Taichung traten die vier Unternehmen Renyou, Fengrong, Sifang und Jieshun aus dem Markt aus. Kuo-Kuang Motor Transport, das die Verbindung zu der staatlichen Busgesellschaft Taiwan Motor Transport herstellt, hat kumulierte Schulden von über 2 Milliarden NT$ angehäuft, verzögerte im ersten Halbjahr 2025 zweimal die Gehaltszahlungen und plante zeitweise sogar die Einstellung von 14 Linien[^20]. Chang Sheng-hsiung, Professor am Institut für Verkehrswesen der Tamkang University, benannte mit einem Satz die Ursache: „Obwohl die langfristig unterdrückten Fahrpreise die Belastung der Bürger verringern, schränken sie gleichzeitig die Qualität von Bussen und Fernbussen ein.“[^21] Durch die niedrigen Ticketpreise können die Unternehmen keine Gewinne erzielen und müssen sich mühsam durch Subventionen halten; wenn die Subventionen nicht ausreichen, werden Linien eine nach der anderen eingestellt.

Dies ist der von Wissenschaftlern beschriebene Teufelskreis aus Taktreduzierung, Fahrgastverlust und erneuter Taktreduzierung: Wenn die Frequenz sinkt, verlieren die Unternehmen Passagiere; wenn Passagiere wegfallen, vergrößern sich die Verluste; wenn die Verluste steigen, kürzen die Unternehmen erneut die Takte. Li Chien-wen, Generaldirektor der Capital Group, sprach über diese Linien, die mit jedem Betrieb mehr Verluste machen, zweimal von einer ausweglosen Situation: „Ausweglos, völlig ausweglos“, denn für defizitäre Linien gilt: „Je mehr man befördert, desto mehr verliert man“[^22]. Die Subventionen für ländliche Gebiete in Taiwan berechnen sich nach der Differenz zwischen den „Kosten pro Fahrzeugkilometer und den Einnahmen“; Linien mit durchschnittlich weniger als zwei Passagieren pro Fahrzeugkilometer können Subventionen beantragen[^23]. Doch die Subventionsmittel sind begrenzt, und die Zahl derer, die bereit sind, Bus zu fahren, ist noch begrenzter.

Werden also die älteren Menschen in ländlichen Gebieten, die am stärksten auf den Bus angewiesen sind, einfach zurückgelassen? Hier gibt es eine Wendung, die von pessimistischen Erzählungen leicht überdeckt wird. Taiwan begann 2016 mit Pilotprojekten für bedarfsorientierten Verkehr (Demand Responsive Transport, DRTS), der 2019 unter den Namen „Xingfu Bus“ oder „Xingfu Xiaohuang“ (Glücksbringer-Gelbe) bekannt wurde. Diese fahren keine festen Fahrpläne, sondern nutzen auf Reservierung basierende Minibusse oder Taxis; sie fahren dorthin, wo jemand eine Fahrt angefordert hat. Die Kosten pro Fahrzeugkilometer liegen bei 30 bis 40 NT$, was niedriger ist als die 45,85 NT$ des traditionellen Busverkehrs[^24]. Dank dieses Ersatzmechanismus stieg die Abdeckung des öffentlichen Nahverkehrs in ländlichen Gebieten von 70 % im Jahr 2016 auf 91,96 % im Jahr 2023 und erreichte im März 2025 einen Wert von 94,37 %. Das Ziel ist es, bis 2028 eine Abdeckung von 100 % zu erreichen[^25]. Die 12 Linien in Miaoli, die nach dem Ausscheiden von Hsinchu Bus wegfielen, wurden genau an die „Xingfu Xiaohuang“-Dienste übertragen[^1]. Hinter dem großen Bus, der wegfuhr, kamen einzelne reservierungsorientierte Taxis als Ersatz nach.

```tw-line
Abdeckung des öffentlichen Nahverkehrs in ländlichen Gebieten: Große Busse ziehen sich zurück, Minibusse und Taxis füllen die Lücken (%):
Jahr | Abdeckungsrate
2016 | 70
2023 | 91,96
2025 | 94,37
Quelle: Exekutiv-Yuan, Autobahnbehörde des Verkehrsministeriums, CNA
```

Es stimmt zwar, dass die Abdeckungsrate wieder über 90 % liegt, aber man sollte dies nicht als „Problem gelöst“ missverstehen. Die Anzahl der Menschen, die einen reservierungspflichtigen Minibus nutzen können, ist weit geringer als die Kapazität eines großen Busses; zudem schließt die Notwendigkeit einer Vorabreservierung einige ältere Menschen aus, die spontan unterwegs sein müssen oder nicht geübt im Umgang mit Mobiltelefonen sind. Es handelt sich um eine ehrliche Übergangslösung, nicht um einen triumphalen Sieg.

## Die HSR verdrängt die Fernbuspassagiere

Nicht nur der Fahrermangel, sondern auch der Hochgeschwindigkeitszug (HSR), der von oben herüberrollt, treibt den Bussektor an den Abgrund.

Nach der Inbetriebnahme des HSR im Jahr 2007 verlagerten sich die Fernreisenden im westlichen Korridor massiv. Die Anzahl der Fahrten mit Autobuslinien sank drastisch: Laut Daten der Autobahnbehörde, die vom Central Broadcasting System und der United Daily News zusammengestellt wurden, gingen die Fahrten mit Autobussen zwischen 2016 und 2024 um etwa 40 % zurück, während die Anzahl der Fahrgäste um 32,8 % sank[^26]. Ein weiterer Indikator ist die Anzahl der Linien: Die Zahl der regulären Buslinien sank von 2012 bis 2022 um 43,7 %[^27]. (Diese beiden Zahlen beziehen sich auf unterschiedliche Metriken – Fahrten gegenüber Linienanzahl – und haben verschiedene Basisjahre; sie sollten daher nicht als dasselbe betrachtet werden.) Langstreckenverbindungen im Westen, wie etwa von Taipeh nach Kaohsiung, haben bisher nur etwa 60 % des Niveaus vor der Pandemie erreicht; auf der Ostküste wurde die Linie von Taipeh nach Hualien so stark konsolidiert, dass an Wochenenden nur noch das Unternehmen Kavalan verkehrt[^26]. Auch die durchschnittliche Reisestrecke verkürzte sich von 93 km auf 67 km. Die Fernreisenden wurden vom HSR abgeworben, zurück bleiben nur Mittel- und Kurzstreckenpassagiere[^26].

Die unmittelbarste Folge ist, dass Umsteigestationen zu Geisterstädten werden. Gewerbetreibende in der zweiten Etage des Taipei Bus Station haben ihre Mietverträge gekündigt, wodurch die gesamte Etage zu einer leeren, zur Vermietung stehenden Fläche wurde[^28]. Es besteht die Sorge, dass auch einige der in Taichung errichteten Umsteigeknotenpunkte zu ungenutzten „Mückenstationen“ verkommen könnten. Angesichts dieses Lawinen-Effekts hat die Autobahnbehörde im Jahr 2025 einen Plan zur Anpassung des Straßennetzes gestartet, der als der „größte seit 30 Jahren“ bezeichnet wird[^20]. Dies ist sowohl ein Eingeständnis, dass das alte Verkehrsnetz nicht mehr tragfähig ist, als auch ein Versuch eines kompletten Neustarts.

## Der Fortschritt der Stadt und ihre Grenzen

Blickt man zurück auf die urbanen Zentren, zeigt sich ein völlig anderes Bild. Innerhalb desselben Systems macht die städtische Seite zwar große Fortschritte, doch jeder Schritt stößt an ihre eigenen Grenzen.

Der erste Fortschritt sind die Hauptlinien-Busse (幹線公車). Die Stadt Taipeh hat zwischen 2017 und 2018 ihr Busnetz neu klassifiziert; zu Stoßzeiten verkehren die Linien der Hauptverkehrsadern in einem engen Takt von 4 bis 6 Minuten, was sie so einfach zu verstehen und abzuwarten macht wie die MRT[^29]. Der zweite Fortschritt ist das TPASS-Pendler-Monatsticket. Es entsprang den Wahlversprechen von 2022 und wurde im Juli 2023 eingeführt. Für die ersten drei Jahre wurde ein Sonderbudget von NT$20 Milliarden bereitgestellt: Ein Monatsticket für NT$1.200 für die Region Keelung-Taipeh-New Taipei-Taoyuan, sowie Optionen für NT$699 oder NT$999 für die Gebiete Miaoli-Taichung-Changhua-Toufen, und NT$999 für den Süden (Kaohsiung-Pingtung), womit Busse und MRT unbegrenzt genutzt werden können[^30].

Die Bilanz von TPASS muss differenziert betrachtet werden. Positiv ist, dass es tatsächlich mehr Menschen in die Verkehrsmittel gebracht hat: Das Busaufkommen stieg um 19,6 %, das der MRT um 36,9 %[^31]. Doch die Wirkung, Autofahrer oder Zweiradfahrer zum Umstieg auf den ÖPNV zu bewegen, war begrenzt: Eine Befragung in Taipeh ergab, dass der Anteil derer, die tatsächlich von privaten Verkehrsmitteln auf den öffentlichen Nahverkehr umgestiegen sind, nur bei 7,33 % liegt[^32]. Mit anderen Worten: Die zusätzlichen Fahrgäste sind größtenteils jene, die „schon vorher gefahren sind und jetzt häufiger fahren“, statt jener, die „früher das Auto nahmen und nun auf den Bus umsteigen“.

Realistischer ist das finanzielle Problem: Das Sonderbudget von NT$20 Milliarden für TPASS läuft Ende 2025 aus. Ein Nachfolgeprojekt mit einem Volumen von NT$36,38 Milliarden droht aufgrund blockierter Haushaltspläne im Legislativ-Yuan mangels Mitteln zu scheitern. Davon sind 20 Landkreise und Städte in ganz Taiwan betroffen; viele Orte müssen darauf vertrauen, dass die Verkehrsunternehmen die Kosten vorab aus eigener Tasche stemmen[^32][^33]. Eine gute Politik, die Menschen in den öffentlichen Verkehr lockt, steckt in einer politischen Sackgasse fest.

![Ein BYD K9 Elektrobus von Taipei Bus im Vorbeifahren am Taipei Municipal Zoo](/article-images/lifestyle/electric-bus-byd-taipei-2026.webp)
_Ein BYD K9 Elektrobus von Taipei Bus fährt im Jahr 2026 vor dem Taipei Municipal Zoo vorbei. Bis 2030 sollen Stadtbusse vollständig elektrifiziert sein, doch im Jahr 2024 sind erst etwa 18 % auf der Straße. Foto: 厦门金龙永远的神, CC BY 4.0 (Bildquelle siehe Ende des Artikels)._

Die Elektrifizierung ist der dritte Fortschritt der Stadt, aber auch derjenige mit der auffälligsten Diskrepanz. Die Regierung hat angekündigt, den Stadtbusverkehr bis 2030 vollständig zu elektrifizieren. Dabei sollen fast zehntausend Verbrenner (ein Bestand von etwa 9.400 Fahrzeugen) ersetzt werden. Das Ziel für die geförderte Anschaffung liegt bei 11.700 Fahrzeugen; das gesamte Projekt wurde im Juni 2023 genehmigt und mit NT$64,3 Milliarden budgetiert[^34]. Die Ideale sind hoch, die Realität jedoch langsam: Bis 2024 sind tatsächlich nur etwa 1.926 Elektrobusse (ein Anteil von 18 %) im Einsatz, wobei in sieben Landkreisen noch kein einziger registriert ist[^35].

```tw-bars
Entfernung zur vollständigen Elektrifizierung bis 2030 (Fortschritt der Elektrifizierung von Stadtbussen)
Bereits im Einsatz 2024 | 1926 | Anteil 18%
Anschaffungsziel bis 2030 | 11700 | In sieben Landkreisen aktuell bei Null
Quelle: Exekutiv-Yuan, Verkehrsministerium, Ende 2024
```

Wo liegt das Problem? Von der Bewilligung der Subventionen über die Genehmigung auf lokaler Ebene bis hin zur tatsächlichen Vertragsunterzeichnung gibt es Verluste auf jeder Ebene (die verfügbaren Mittel sanken von 20,8 Milliarden auf 14,04 Milliarden und schließlich auf 7,44 Milliarden); zudem sind Ladeinfrastrukturen teuer, wobei eine Ladestation über NT$60 Millionen kosten kann[^35]. Bei einem angekündigten Preis von NT$11 Millionen pro Fahrzeug und einer Subvention von NT$6,8 Millionen müssen die Unternehmen noch NT$4,2 Millionen selbst aufbringen. Für eine Branche, die ohnehin mit Subventionen kämpft und kaum Fahrer findet, ist dies eine schwer zu fassende Entscheidung.

> 📝 **Anmerkung des Kurators**: Betrachtet man diese drei städtischen Entwicklungen (Hauptlinien-Busse, Monatstickets, Elektrifizierung), wirken sie wie eine Liste des Fortschritts. Doch sie teilen eine unsichtbare gemeinsame Voraussetzung: Es braucht Menschen, die die Fahrzeuge fahren. Wenn das Durchschnittsalter der Fahrer auf 51 Jahre steigt und ein Fachkräftemangel von über 5.000 Personen besteht, bleiben selbst das klügste Monatsticket und der umweltfreundlichste Elektrobus nur leere Hüllen in den Depots. Der Fortschritt auf städtischer Ebene ist real, aber er rast auf einem schnell alternden Fundament aus Arbeitskräften voran.

## Taiwan ist kein Einzelfall

Blickt man ins Ausland, stellt man fest, dass Taiwans Dilemma nicht einzigartig ist.

Der in Japan stets bewunderte öffentliche Nahverkehr bricht im ländlichen Raum bereits zusammen: 85 % der Busunternehmen in ländlichen Gebieten machen Verluste, das Durchschnittsalter der Taxifahrer in Hiroshima liegt bei 63 Jahren, und über 20 % der Bevölkerung leben zu weit entfernt von Bahnhöfen oder Bushaltestellen[^36]. In Seoul, Südkorea, wird ernsthaft über die Einführung ausländischer Fahrer diskutiert, da fast die Hälfte der derzeit tätigen Fahrer über 60 Jahre alt ist[^37]. In Europa leben 129 Millionen Menschen in Gebieten mit unzureichendem öffentlichem Nahverkehr; in Großbritannien decken die Ticketpreise für ländliche Busse nicht einmal 25 % der Kosten ab[^38]. „Abwanderung der Landbevölkerung, alternde Fahrer, schrumpfende Routen“ sind gemeinsame strukturelle Probleme in Ostasien und weltweit; der Unterschied in Taiwan liegt lediglich darin, dass die Abhängigkeit vom Motorrad tiefer ist, was dazu führt, dass Busse von Beginn an im Schatten des Motorrads existieren.

Interessanterweise gibt es in Taiwan etwas, das im Gegenzug als internationaler Maßstab gilt. Die kalifornische Verkehrsinitiative Seamless Bay Area betrachtet TPASS als ein Beispiel, von dem Kalifornien lernen kann, und hat dessen drei Erfolgsfaktoren zusammengefasst: ausreichende Subventionen, politischer Wille der Zentralregierung und flexible Umsetzung auf lokaler Ebene[^39]. Und die größten Profiteure von TPASS sind keineswegs die städtischen Eliten, sondern die ländlichen Gebiete. Seit der Einführung von TPASS ist die Nutzung der Busse in Hualien um 69,8 % gestiegen – das signifikanteste Beispiel für die Wirkung im ländlichen Raum in dieser Analyse[^39].

```tw-figure
+69,8 %
Wachstum der Busnutzung in Hualien nach Einführung von TPASS – ein günstiges Monatsticket hat dort die größte Wirkung, wo es kaum Alternativen gibt.
Analyse von Seamless Bay Area
```

Diese Zahl ist eine direkte Antwort auf das Vorurteil, „Busfahren sei ein Privileg der städtischen Elite“. Ein günstiges Monatsticket ist in Taipeh eine zusätzliche Annehmlichkeit, in Hualien hingegen senkt es die Kosten für Mobilität ganz real. Je weniger Alternativen es gibt, desto größer ist die Wirkung jeder noch so kleinen Verbesserung.

## Die letzte Fahrt, dorthin, wo sie am dringendsten gebraucht wird

Zurück zu jenem Morgen am Bahnhof von Tonglu.

Jene mehr als 30 Menschen – von Kindergartenkindern bis hin zu 90-jährigen Senioren – applaudierten, um die letzte Fahrt des Hsinchu Bus der Linie 5658 zu verabschieden. Von der ersten Kooperationslinie in Taipeh im Jahr 1977 über den Wandel von illegalen Sammeltaxis zu offiziellen Linien wie United Bus im Jahr 1989, bis hin zur Bereitstellung offener Daten, die Google-Countdown-Zählungen ermöglichten, und schließlich zu den Fahrern mit einem Durchschnittsalter von 51 Jahren sowie den zahlreichen eingestellten Routen in ländlichen Gebieten: Dieses System existiert so lange, und es transportiert seit jeher dieselbe Gruppe von Menschen: jene, die kein eigenes Lenkrad in der Hand halten können und nicht selbst auf die Straße gehen können. Das Grausamste daran ist, dass es genau dort stehen bleibt, wo es am dringendsten benötigt wird.

Doch die Geschichte endet nicht mit dem wegfahrenden Bus. Nachdem der Applaus verklungen war, wurden die 12 Routen in Miaoli durch die „Xingfu-Minibusse“ (Glücksbringer-Busse) ersetzt; die Fahrgäste rufen an, und der Wagen fährt bis vor die Haustür. Das ist kein Triumph: Die reservierbaren Minibusse haben eine geringere Kapazität, müssen im Voraus gebucht werden, und nicht jeder kann sie nutzen. Aber es ist ein Signal: Wenn die großen Busse es nicht mehr schaffen, versucht dieses System in einer anderen Form, jene Menschen wieder aufzufangen, für die es eigentlich da sein sollte. Die Abdeckung des ländlichen Raums kehrte auf 94 % zurück – nicht weil es mehr Busse gibt, sondern weil die Gesellschaft noch nicht bereit ist, diese Menschen einfach vom Wagen zu werfen.

Wenn Sie das nächste Mal an einer Haltestelle stehen – egal, ob Sie in Taipeh sich über die langen Wartezeiten beschweren oder in der ländlichen Gegend von Changhua auf eine der zwei täglichen Fahrten warten – denken Sie daran, dass Sie nicht nur auf ein Fahrzeug warten. Sie warten auf ein System, das für die „Menschen ohne Lenkrad“ hart kämpft und genau dort, wo es am nötigsten ist, als Erstes außer Atem gerät. Ob dieser Bus kommt oder nicht, wird nie allein an der Transporteffizienz gemessen. Es ist ein Maßstab für die Entscheidung einer Gesellschaft: ob sie bereit ist, diejenigen mitzunehmen, die nicht selbst fahren können.

Die letzte Linie 5658 ist weggefahren. Aber solange noch jemand am Fahrplan steht und die Hand hebt, gibt es immer noch einen Bus, der ihnen noch etwas schuldet – nämlich, für sie zu kommen.

**Weiterführende Literatur**: [Verkehrssystem in Taiwan](/de/lifestyle/transportation-system), [Motorradkultur in Taiwan](/de/lifestyle/taiwan-scooter-culture), [Geschichte der MRT in Taiwan](/de/lifestyle/history-of-taiwan-mrt-development), [Reisebusse](/de/lifestyle/tour-bus)

## Bildquellen

Dieser Artikel verwendet 6 Bilder unter Creative Commons-Lizenz, die alle in `public/article-images/lifestyle/` zwischengespeichert wurden, um Hotlinking auf den Quellservern zu vermeiden:

- [Holly Cheng](https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg) — Motorräder und Busse an einer Straßenkreuzung in Taipeh (Hero-Bild), 1996, CC BY-SA 3.0
- [Nutnse0008](https://commons.wikimedia.org/wiki/File:Shing_Nan_Bus_421-U9_20160423.jpg) — Niederflurbus von Xingnan Bus in Tainan, 2016, CC BY-SA 4.0
- [T Gordon Cheng](<https://commons.wikimedia.org/wiki/File:Taipei_Main_Station_(Zhengzhou)_bus_shelter_20201024.jpg>) — Bushaltestelle am Bahnhof Taipeh, 2020, CC BY-SA 4.0
- [Wei Ting Hsu](<https://commons.wikimedia.org/wiki/File:%E5%9C%8B%E5%85%89%E5%AE%A2%E9%81%8B_KKA-1897_(2026.3.11).jpg>) — Autobus von Kuo-Kuang Motor Transport, 2026, CC BY-SA 4.0
- [T Gordon Cheng](https://commons.wikimedia.org/wiki/File:%E6%B9%96%E5%8F%A3%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_1%E8%99%9F%E7%B7%9A_and_%E5%AF%B6%E5%B1%B1%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_%E4%B8%89%E5%B3%B0%E7%B7%9A_2025-09-30.jpg) — Xingfu Bus in einer ländlichen Gegend des Landkreises Hsinchu, 2025, CC BY-SA 4.0
- [厦门金龙永远的神](https://commons.wikimedia.org/wiki/File:Taipei_bus_BYD_K9.jpg) — Elektrobus BYD K9 von Taipei Bus, 2026, CC BY 4.0

## Referenzen

[^1]: [CNA: Einwohner von Tonglu nehmen Abschied mit der letzten Hsinchu Bus Fahrt](https://www.cna.com.tw/news/ahel/202409150184.aspx) — Bericht vom 15. September 2024, der das Ausscheiden von Hsinchu Bus aus den Regionen Taoyuan, Hsinchu und Miaoli dokumentiert sowie die Abschiedsszene der letzten Linie 5658 in Tonglu festhält; enthält wörtliche Aussagen des Gemeinderats Xu Yufeng, Zeit, Ort und Liniennummern sind verifizierbar.

[^2]: [Statistikamt des Verkehrsministeriums: Umfrage zum täglichen Gebrauch von Verkehrsmitteln](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202201270001&type=s) — Offizielle Verkehrsumfrage des Verkehrsministeriums mit Primärdaten zum Marktanteil des öffentlichen Nahverkehrs (53,3 % bei Haushalten ohne Auto vs. 13,7 % bei Haushalten mit Auto) sowie Nutzungsraten nach Altersgruppen und Schulwegen.

[^3]: [Tai Bao: Zusammenbruch des Bussektors, Anzahl der Fahrer im Linienverkehr in sechs Jahren um ein Drittel gesunken](https://www.taisounds.com/news/content/125/204965) — Bericht über den Rückgang der Fahrer im Linienbusverkehr von 5.646 Personen im Jahr 2019 auf 3.551 Personen im Jahr 2024; die Lücke und die Schulden von Kuo-Kuang Motor Transport von über NT$2 Milliarden werden unter Berufung auf Statistiken der Autobahnbehörde genannt.

[^4]: [ScienceDirect: Studie über Mobilität und Stadtentwicklung in Taiwans Roller-Stadt](https://www.sciencedirect.com/science/article/abs/pii/S0967070X25002446) — Akademische Arbeit zur Quantifizierung der Roller-Abhängigkeit in Taiwan: 599 Fahrzeuge pro tausend Einwohner, 83,7 % der Haushalte besitzen einen Roller, nur 12,5 % verlassen sich primär auf den öffentlichen Nahverkehr.

[^5]: [Vocus: Transportmittel und Alltag von Arbeitsmigranten in Taiwan](https://vocus.cc/article/63dcb90efd89780001509011) — Erläutert, dass Arbeitsmigranten in Taiwan aufgrund politischer Beschränkungen beim Fahrzeugkauf seit langem eingeschränkt sind und daher im Alltag primär Roller nutzen, während sie für Fernreisen am Wochenende auf Busse umsteigen; korrigiert das verbreitete Missverständnis, dass Migranten hauptsächlich den Bus nutzen.

[^6]: [Wikipedia: Stadtbusse in Taipeh](https://zh.wikipedia.org/zh-tw/臺北市市區公車) — Dokumentiert die Geschichte des Taipei Joint Bus Systems: Gründung des Vorbereitungskomitees für das Gemeinschaftsunternehmen 1976, Inbetriebnahme der Linien 202/202 am 1. Januar 1977 und Start der ersten Phase mit 33 Linien am 30. April.

[^7]: [Wikipedia: EasyCard](https://zh.wikipedia.org/zh-hk/悠遊卡) — Dokumentiert den Zeitstrahl der Digitalisierung von Fahrkarten, einschließlich der flächendeckenden Einführung der EasyCard im Busverkehr Ende September 2002 und der Einführung der iPASS im Jahr 2014 zusammen mit der Kaohsiung Metro.

[^8]: [Verkehrsabteilung der Stadt Taipeh: Pressemitteilung zur zweirichtigen kontaktlosen Abrechnung beim Ein- und Aussteigen](https://pto.gov.taipei/News_Content.aspx?n=6B4D38874E971F4B&sms=87415A8B9CE81B16&s=954214BF3AA2EA89) — Primärdaten der Verkehrsbehörde Taipeh über die Einführung des zweirichtigen Kartensystems (Phase 1 am 1. Juli 2019, Phase 2 im Februar 2020) sowie deren Zweck zur präzisen Berechnung von Teilstreckenpreisen und Umstiegsvergünstigungen.

[^9]: [Verkehrsministerium: Statistiken zum Fahrgastaufkommen im Stadtbusverkehr](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202112090001&type=s) — Offizielle Statistik des Verkehrsministeriums, die zeigt, dass das Gebiet von Neu-Taipeh im Jahr 2020 73,7 % des gesamten Stadtbus-Fahrgastaufkommens Taiwans ausmachte, was die Konzentration des Verkehrsaufkommens zwischen Stadt und Land verdeutlicht.

[^10]: [TDX Transportdaten-Dienst-Website](https://tdx.transportdata.tw/) — Offizielle Plattform des Verkehrsministeriums; dokumentiert die Entwicklung der Open-Data-Governance von der Erstellung des PTX im Jahr 2016 bis zur Integration und zum Upgrade zu TDX im Dezember 2022.

[^11]: [iThome: Umfang der TDX-Open-Data und Nutzung durch Google Maps](https://www.ithome.com.tw/news/142077) — Bericht über mehr als 4,9 Millionen tägliche API-Aufrufe bei TDX, den Umlauf von 540 Millionen Datensätzen und über 3.000 Mehrwertdienstleister; bestätigt zudem, dass Google Maps für die Ankunftsinformationen der Busse in Taiwan TDX-Daten nutzt.

[^12]: [Medium: TDX API Tutorial und Analyse der Datenstandards](https://medium.com/@ycpin/data-mining-transport-data-exchange-tdx-api-tutorial-and-demonstration-14bba4a58e9b) — Technische Analyse zur Erläuterung, dass TDX ein benutzerdefiniertes OData-"Vier-Sterne"-Format verwendet, GTFS Beta unterstützt, aber kein internationaler Standard ist, und dass keine internationale Organisation Taiwan als Benchmark gelistet hat.

[^13]: [PTT Bus Board: Diskussion über die gemeinsame TDX-Backend-Nutzung von Bus-Apps](https://www.ptt.cc/bbs/Bus/M.1613871840.A.47D.html) — Nutzerdiskussionen zeigen auf, dass verschiedene Bus-Apps das TDX-Backend nutzen und GPS zwischen Hochhäusern unzuverlässig sein kann; stellt zudem klar, dass „1968“ eine Nummer für Autobahnlinien und eine App für Echtzeit-Autobahninformationen ist, keine Stadtbus-App.

[^14]: [PTT Taichung Board: Beschwerdethema über Geisterbusse in Taichung](https://www.ptt.cc/bbs/TaichungBun/M.1691104386.A.D22.html) — Ein öffentlicher Diskussionsthread aus dem Jahr 2023, in dem die Nutzer LeiHide und teddykitty wörtlich ihre Erfahrungen mit „Geisterbussen“ beschreiben – Busse, die in der Taichung-Bus-App angezeigt werden, aber nicht erscheinen; verifizierbar via Ctrl-F.

[^15]: [Taiwan Guanghua Magazine: Von Tai-Qi zu Kuo-Kuang Motor Transport](https://www.taiwan-panorama.com/Articles/Details?Guid=593707a8-2be1-462d-aed7-73883b3e20f0) — Detaillierte Darstellung des Privatisierungsprozesses: Gründung der Autobahnbehörde 1946, Gründung von Tai-Qi 1977, jährliche Verluste von NT$5 Milliarden und die Übernahme von 96 Linien durch Kuo-Kuang Motor Transport im Jahr 2001, nachdem 1.090 Mitarbeiter jeweils NT$300.000 investiert hatten.

[^16]: [Wikipedia: United Bus (Tonglian)](https://zh.wikipedia.org/zh-tw/統聯客運) — Ein wörtlicher Eintrag über die Gründung der United Bus am 6. September 1989 durch Zhang Jia-zhu, ehemaligen Direktor des Forschungsinstituts für Verkehrswesen, wobei der Name aus den Begriffen „die vier Richtungen anführen“ und „gemeinsame Bewirtschaftung“ abgeleitet wurde; das Unternehmen war das erste legale private Fernbusunternehmen Taiwans.

[^17]: [United Daily News Sunshine Action: Untersuchung des Mangels an Busfahrern](https://udn.com/news/story/10098/8766101) — Unter Berufung auf Daten des Verkehrsministeriums: Die Zahl der Fahrer im Stadtbusverkehr sank von 11.811 im November 2015 auf 10.588 im Jahr 2023, das Durchschnittsalter stieg von 45,2 auf 51,2 Jahre, mit einem Defizit von 1.443 Fahrern im Stadtverkehr und 772 im Fernbusverkehr.

[^18]: [The Reporter: Stundenlohn von nur 88 NT$, die Überlastungsstätten der Taoyuan-Busfahrer](https://www.twreporter.org/a/tybus-driver-overwork) — Eine Tiefenuntersuchung der Arbeitsstruktur von Taoyuan Bus-Fahrern: 14 Gehaltskomponenten, ein Grundgehalt von NT$26.400, was zu einem durchschnittlichen Stundenlohn von nur 88 NT$ führt; 16 Personen teilen sich ein 16 m² großes Wohnheim, inklusive wörtlicher Aussagen von Fan Guang-ming, Chen Wei-chen und Xu Yong-fa.

[^19]: [The Reporter: Der Arbeitskräftemangel in der Busbranche (Teil 2)](https://www.twreporter.org/a/current-challenges-of-bus-industry-2) — Wörtliche Interviews mit Zhang Xian-de, stellvertretender Manager der Geschäftsabteilung von Sanchong Bus, und Wang Shuo-qian, Stationsleiter der Nankang-Station, über die Schwierigkeit, Busfahrer zu finden, sowie die Unterschiede in der Verantwortung zwischen Personen- und Gütertransport.

[^20]: [United Daily News: Autobahnbehörde leitet größte Anpassung des Straßennetzes seit 30 Jahren ein](https://udn.com/news/story/7266/9256802) — Bericht über die Reduzierung von Fernbusfrequenzen und -routen, Schulden von über NT$2 Milliarden bei Kung Kuo Bus sowie Gehaltsverzögerungen, den Rückzug von Anbietern und den Plan der Autobahnbehörde zur Anpassung des Straßennetzes im Jahr 2025.

[^21]: [The Reporter: Die Krise der Einweg-Leerfahrten der Linie 9005 und das Dilemma der Busbranche](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Wörtliches Zitat von Professor Zhang Sheng-xiong vom Institut für Transportmanagement der Tamkang Universität darüber, wie die langfristige Unterdrückung der Fahrpreise die Qualität des Busverkehrs einschränkt.

[^22]: [The Reporter: Die Krise der Einweg-Leerfahrten der Linie 9005 und das Dilemma der Busbranche](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — Wörtliche Aussagen von Li Jian-wen, General Manager der Capital Group: „Unlösbar, völlig unlösbar“ und „Je mehr man transportiert, desto mehr verliert man“, eine Analyse der strukturellen Krise von Routen mit Einweg-Leerfahrten, bei denen mehr Fahrten zu höheren Verlusten führen.

[^23]: [Regelung für Subventionen von Linien des öffentlichen Nahverkehrs in entlegenen Gebieten Taipeis](https://laws.gov.taipei/law/LawSearch/LawArticleContent/FL026380) — Ein Primärrechtstext, der die Subventionsformel für abgelegene Gebiete festlegt: (angemessene Kosten pro Fahrzeugkilometer minus Einnahmen) multipliziert mit der Anzahl der Fahrten und der Kilometerleistung; Anträge sind möglich, wenn weniger als 2 Passagiere pro Fahrzeugkilometer befördert werden.

[^24]: [Offizielle Website des Xingfu Bus: Was ist der Xingfu Bus?](https://www.happybus.com.tw/Whatisbus) — Offizielle Informationen der Autobahnbehörde zur Erläuterung des bedarfsorientierten Verkehrsdienstes (DRTS), Pilotprojekt 2016, Benennung als „Xingfu Bus“ und „Xingfu Taxi“ im Jahr 2019, mit Kosten von 30 bis 40 NT$ pro Fahrzeugkilometer.

[^25]: [Exekutiv-Yuan: Abdeckung des öffentlichen Verkehrs in ländlichen Gebieten und Verkehrsgerechtigkeit](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/25b3096e-90ec-42cf-bd2b-5a0b65d409eb) — Offizielle Daten zur Abdeckungsrate des öffentlichen Verkehrs in ländlichen Gebieten: 70 % im Jahr 2016, 91,96 % im Jahr 2023, prognostizierte 94,37 % im März 2025, mit dem Ziel, bis 2028 100 % zu erreichen.

[^26]: [Central Broadcasting System: Fernbusverkehr unter dem Einfluss des Hochgeschwindigkeitszugs](https://www.rti.org.tw/news?pid=186039&uid=3) — Bericht darüber, dass die Frequenz der Fernbusse nach der Inbetriebnahme des Hochgeschwindigkeitszugs von 2016 bis 2024 um etwa 40 % sank, die Passagierzahlen um 32,8 % zurückgingen, die durchschnittliche Fahrtdauer der Passagiere von 93 km auf 67 km schrumpfte und im Osten nur noch die Yilan-Linie an Wochenenden verkehrt.

[^27]: [Critical Watch: Reduzierung der Routen des allgemeinen Straßenbusverkehrs über Jahrzehnte](https://www.thenewslens.com/article/193854) — Unter Berufung auf Daten der Autobahnbehörde: Die Anzahl der Routen im allgemeinen Straßenbusverkehr sank von 2012 bis 2022 um 43,7 %, was einen Rückgang anzeigt, der sich von den Frequenzdaten unterscheidet.

[^28]: [ETtoday: Zweites Stockwerk des Taipei Transfer Station nach Mietkündigung eine Geisterstadt](https://www.ettoday.net/news/20241020/2838555.htm) — Bericht darüber, dass nach der Umleitung durch den Hochgeschwindigkeitszug Händler im zweiten Stock der Taipei Transfer Station gekündigt haben und die gesamte Etage leer steht, was die Auswirkungen des Rückgangs des Fernbusverkehrs auf die Transferinfrastruktur widerspiegelt.

[^29]: [Wikipedia: Hauptlinien-Busse der Stadt Taipeh](https://zh.wikipedia.org/wiki/臺北市幹線公車) — Dokumentation des vierstufigen Busnetz-Designs der Stadt Taipeh in den Jahren 2017 und 2018 sowie das System mit Frequenzen von 4 bis 6 Minuten während der Stoßzeiten auf den Hauptlinien.

[^30]: [The Reporter: Ein Jahr nach Einführung des TPASS Pendler-Monatstickets](https://www.twreporter.org/a/data-reporter-a-year-after-tpass-was-launched) — Tiefenbericht über die Ursprünge der TPASS-Politik, das NT$1.200 Monatsticket für die Region Kétai-Taipeh-New Taipeh-Taoyuan, ein Sonderbudget von NT$20 Milliarden über 3 Jahre und eine multidimensionale Analyse der Effekte nach einem Jahr.

[^31]: [Taipei Times: TPASS steigert das Fahrgastaufkommen bei Bussen und der MRT](https://www.taipeitimes.com/News/front/archives/2024/07/11/2003820639) — Englischsprachiger Bericht: Nach der Einführung von TPASS stieg das Busfahrgastaufkommen um 19,6 %, das der MRT um 36,9 %, mit über 700.000 Nutzern.

[^32]: [風傳媒 (風傳媒): Die Umstiegsrate von TPASS liegt bei nur 7,33 % und die Krise des Ausfallrisikos im Jahr 2026](https://www.storm.mg/lifestyle/11093047) — Bericht über eine Umstiegsrate von privaten Verkehrsmitteln von nur 7,33 %, das Risiko eines Finanzierungsstopps für das neue Projekt in Höhe von NT$ 36,38 Milliarden aufgrund blockierter Gesamtbudgets und die Auswirkungen auf 20 Landkreise.

[^33]: [公視新聞 (PTS News): TPASS-Sonderbudget läuft aus, Anschlusspläne stecken in der Sackgasse](https://news.pts.org.tw/article/801336) — Bericht darüber, dass das TPASS-Sonderbudget von NT$ 20 Milliarden Ende 2025 ausläuft, die Neuplanung von NT$ 36,38 Milliarden durch die Prüfung des Gesamtbudgets beeinträchtigt wird und Kommunen Schwierigkeiten haben, die Kosten durch Eigenmittel zu decken.

[^34]: [Exekutiv院 (行政院): Politik zur vollständigen Elektrifizierung des Busverkehrs bis 2030](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/fbaa04ca-a430-48e7-8ba1-0b35d1dc4879) — Offizielle Richtlinie: Vollständige Elektrifizierung der Stadtbusse bis 2030, fast 10.000 Verbrennungsbusse müssen ersetzt werden, Ziel für Kaufsubventionen sind 11.700 Fahrzeuge; das Projekt wurde im Juni 2023 mit einem Budget von NT$ 64,3 Milliarden genehmigt.

[^35]: [大紀元 (The Epoch Times): Bis Ende 2024 werden 1.926 Elektrobusse zugelassen](https://www.epochtimes.com/b5/25/1/8/n14409087.htm) — Unter Berufung auf Daten des Verkehrsministeriums: Bis Ende 2024 sind etwa 1.926 Elektrobusse tatsächlich im Einsatz (Anteil 18 %), während in 7 Landkreisen keine registriert sind; zudem werden die Diskrepanzen zwischen Subventionsbewilligung und Vertragsunterzeichnung sowie die Kosten für Ladeinfrastruktur erläutert.

[^36]: [Weltwirtschaftsforum: Die Probleme des ländlichen Nahverkehrs in Japan](https://www.weforum.org/stories/2020/01/japans-much-admired-public-transit-system-is-leaving-its-rural-areas-behind/) — Englischsprachiger Bericht: 85 % der Busunternehmen im ländlichen Japan machen Verluste, das Durchschnittsalter von Taxifahrern in Hiroshima liegt bei 63 Jahren und über 20 % der Bevölkerung wohnt zu weit entfernt von Haltestellen.

[^37]: [Korea Herald: Alterung der Busfahrer in Seoul und Diskussionen über ausländische Fahrer](https://www.koreaherald.com/article/10011103) — Englischsprachiger Bericht: Fast die Hälfte der Busfahrer in Seoul ist über 60 Jahre alt, es besteht ein Mangel von etwa 600 Fahrern; die Behörden diskutieren die Einführung ausländischer Fahrer, was den gemeinsamen Fahrermangel in Ostasien verdeutlicht.

[^38]: [Interreg Europe: Die Herausforderungen des ländlichen Verkehrs in Europa](https://www.interregeurope.eu/rural-mobility) — EU-Regionalkooperationsplattform: Weist darauf hin, dass 129 Millionen Menschen in Europa in Gebieten mit unzureichendem öffentlichem Nahverkehr leben und die Einnahmen aus ländlichen Busfahrten in Großbritannien nur 25 % der Kosten decken, was belegt, dass der ländliche Personenverkehr ein globales strukturelles Problem ist.

[^39]: [Seamless Bay Area: Lehren für Kalifornien aus der Integration von Verkehrstickets in Taiwan](https://www.seamlessbayarea.org/blog/2025/1/5/notes-from-taiwan-regional-transit-fare-integration-programs-fuel-taiwans-ridership-growth) — Analyse einer kalifornischen Verkehrsinitiative: Betrachtet TPASS als Benchmark für Kalifornien und identifiziert drei Schlüsselfaktoren: ausreichende Subventionen, politischer Wille auf zentraler Ebene und flexible Umsetzung auf lokaler Ebene.
