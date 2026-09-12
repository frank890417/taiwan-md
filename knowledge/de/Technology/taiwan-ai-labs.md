---
title: 'Taiwan AI Labs: Ein nichtkommerzielles KI-Forschungsinstitut mit Fokus auf Gesundheitswesen und Informationskriegsführung'
description: 'Das von „PTT-Vater“ Du Yijin im März 2017 gegründete, gemeinnützige KI-Forschungszentrum entwickelt Open-Source-Modelle wie TAIDE (Mandarin-LLM) und setzt sich für intelligente Medizin sowie die Abwehr kognitiver Kriegsführung ein.'
date: 2026-03-19
category: 'Technology'
tags:
  [
    'Künstliche Intelligenz',
    'Smart Healthcare',
    'Du Yijin',
    'Technologieinnovation',
    'Informationskriegsabwehr',
    'TAIDE',
    'PTT',
  ]
subcategory: '人工智慧'
author: 'idlccp02'
featured: true
lastVerified: 2026-05-07
lastHumanReview: true
readingTime: 8
translatedFrom: 'Technology/台灣人工智慧實驗室.md'
sourceCommitSha: 'c8e5ac9ea'
sourceContentHash: 'sha256:905a736099878754'
sourceBodyHash: 'sha256:f134440a7453a1a5'
translatedAt: '2026-09-12T04:55:06+08:00'
---

# Taiwan AI Labs

> **30-Sekunden-Überblick:** Taiwan AI Labs wurde von „PTT-Vater“ Du Yijin im März 2017 gegründet und ist das erste gemeinnützige KI-Forschungsinstitut in Asien.[^1] Hintergrund Du Yijins: Er gründete PTT als Student mit einem 486er Computer im Wohnheim im Jahr 1995, arbeitete ab 2006 bei Microsoft und trat 2012 der KI-Abteilung von Microsoft (siehe Stellenbeschreibung APAC in P0⚠️) bei.[^2] Open-Source-Sprachmodelle: **TAIDE** (Großes Sprachmodell für traditionelles Chinesisch), **TAME**, das auf Allianzebene entwickelte **FedGPT**, mit einem Korpus von über 60 Milliarden traditionellen chinesischen Token.[^3] Kernbereiche: Smart Healthcare, Abwehr kognitiver Kriegsführung und die COVID-19 Social-Distancing App (dezentrales Bluetooth).[^4]

---

## Gründungshintergrund und Kernphilosophie

Taiwan AI Labs wurde im März 2017 von Du Yijin gegründet.[^1] Damals dominierten große internationale Technologiekonzerne die globale KI-Entwicklung. Du Yijin erkannte in Taiwan einzigartige Vorteile – insbesondere in den Bereichen Halbleiterhardware, Softwaretalente und die nationale Krankenaktenbank – und beschloss daher, das Labor zurück nach Taiwan zu gründen.

Die Berufsbezeichnung von Du Yijin: In Pressemitteilungen von TSMC und einigen Medien wird er als „ehemaliger Forschungsdirektor für KI in APAC bei Microsoft“ genannt; Wikipedia führt ihn lediglich als Mitarbeiter der KI-Abteilung von Microsoft auf. Die genaue Stellenbeschreibung P0⚠️ weist Unterschiede auf, weshalb die offizielle LinkedIn-Seite oder die Website von Taiwan AI Labs als maßgeblich gelten sollten.[^2]

Kernphilosophie: „Tech for Good“ (Technologie zum Wohle) und der „Open-Source-Geist“ – das Ziel ist nicht primär der kommerzielle Gewinn, sondern die Bewältigung gesellschaftlicher Probleme. Die Forschungsergebnisse werden in Open-Source- oder Kooperationsform mit Wissenschaft, Industrie und Regierung geteilt.

---

## Drei Kernforschungsbereiche

### Smart Healthcare (Intelligentes Gesundheitswesen)

Es werden KI-Anwendungen entwickelt, die auf den nationalen Krankenakten und klinischen Daten Taiwans basieren – beispielsweise Bilderkennung (Gehirntumore, Lungenläsionen) oder KI-Genomsequenzierungsanalysen.

Um Datenschutzprobleme im Gesundheitswesen zu lösen, wird „Föderales Lernen“ eingesetzt: Die KI-Modelle werden lokal auf den Servern der einzelnen Krankenhäuser trainiert; es werden nur die Modellparameter zurückgegeben. Die ursprünglichen Patientendaten verlassen niemals das Krankenhaus und durchbrechen somit die Dateninseln zwischen medizinischen Einrichtungen.

### Smart City und Mensch-Maschine-Schnittstelle

Dies umfasst Drohneninspektionssysteme, intelligente Verkehrsanalysen sowie die Sprach- und Musik-KI „Yating“ – sie ist in der Lage, präzise lokalisierte chinesische Sprache (einschließlich Taiwan-Mandarin und Mischformen aus Chinesisch/Englisch) zu erkennen und kann auch Musik kreieren.

### Informationskriegsführung und kognitive Abwehr

Taiwan gilt als eine der Regionen weltweit, die am stärksten von Desinformationsangriffen betroffen ist. Das Projekt „Infodemic“ nutzt KI, um anomales koordiniertes Verhalten in sozialen Medien zu analysieren und veröffentlicht regelmäßig Berichte zur Informationsumgebung.

---

## Open-Source-Sprachmodelle: TAIDE, TAME, FedGPT

Taiwan AI Labs hat drei Open-Source-Modelle im Zusammenhang mit traditionellem Chinesisch vorgestellt[^3]: **TAIDE** (Trustworthy AI Dialogue Engine) ist ein Großes Sprachmodell für traditionelles Chinesisch, das mit über 60 Milliarden traditionellen chinesischen Token trainiert wurde; **TAME** ist ein weiteres Open-Source-Modell (Details siehe offizielle Dokumentation); **FedGPT** ist ein auf föderaler Lernarchitektur basierendes Sprachmodell. Die drei Modelle adressieren gemeinsam die strukturelle Herausforderung, dass der Anteil traditioneller chinesischer Daten in globalen KI-Trainingsdatensätzen extrem gering ist und man nicht vermeiden kann, vorgefasste Ansichten aus vereinfachtem Chinesisch zu übernehmen.

---

## COVID-19 Präventionspraktiken

Während der Pandemie ab 2020 entwickelte Taiwan AI Labs in Zusammenarbeit mit der Regierung die „Taiwan Social Distancing App“: Sie nutzt dezentrales Bluetooth und sammelt keine persönlichen GPS-Standorte, um bei der Infektionsverfolgung zu helfen und den Datenschutz zu gewährleisten. Dies wurde zu einem internationalen Vorbild für technologische Prävention[^4]. Dieses Produkt ist ein konkretes Beispiel dafür, wie die Forschungslinie „Föderales Lernen“ und „Datenschutz zuerst“ von einer Idee in eine groß angelegte öffentliche Implementierung überführt wurde.

---

## Weiterführende Lektüre

- [Miin: Du Yijin lehrt KI, Windrichtungskonten zu erkennen, wird aber selbst wegen Diebstahls beschuldigt](/technology/迷音Miin) — Das Flaggschiffprodukt des Labs für die Öffentlichkeit; es nutzt KI zur Erkennung koordinierten Verhaltens und geriet Ende 2025 in einen Urheberrechtsstreit aufgrund der Aggregation von Nachrichten.
- [Taiwanische KI-Entwicklung und zukünftige Strategie: Von den zwei Nobelpreisen 2024 zum Nachtmarkt von Ningxia](/technology/台灣人工智慧發展與未來策略) — Setzt Taiwan AI Labs in das Gesamtbild aus Hardware-Hegemonie und den zwei Nobelpreisen von 2024, um die Distanz zwischen TAIDE und der Grundlagenforschung der globalen KI zu beleuchten.
- [Warum Taiwan seine eigenen Wissensdatenbanken braucht](/about/為什麼台灣需要自己的知識庫) — Die andere Seite der selbstgebauten KI-Fähigkeiten in der Zivilgesellschaft: Der Mangel an Trainingskorpora für Modelle und die messbare Ablehnung von Themen durch KI bezüglich Taiwans.
- [Offizielle Website von Taiwan AI Labs](https://ailabs.tw/)
- [Du Yijin – Wikipedia](https://zh.wikipedia.org/zh-tw/杜奕瑾)
- [BNext: Du Yijin gründet KI-Lab in Taiwan](https://www.bnext.com.tw/article/44267/founder-of-ptt-ethan-tu-back-to-taiwan-to-establish-an-ai-lab)
- [IORG Taiwan Information Environment Research Center](https://iorg.tw/)

---

## Referenzen

[^1]: [Taiwan AI Labs: Über uns](https://ailabs.tw/zh/關於我們/) — Bestätigt die Gründung durch Du Yijin im März 2017 als das erste gemeinnützige KI-Forschungsinstitut in Asien.

[^2]: [Wikipedia: Du Yijin](https://zh.wikipedia.org/zh-tw/杜奕瑾) — Bestätigt die Gründung von PTT im Wohnheim mit einem 486er Computer im Jahr 1995; den Eintritt bei Microsoft im Jahr 2006 und der Zugehörigkeit zur KI-Abteilung von Microsoft im Jahr 2012 (die genaue Stellenbeschreibung „APAC Research Director“ weist Unterschiede auf).

[^3]: [Verse: Interview mit Du Yijin (TAIDE/TAME/FedGPT)](https://www.verse.com.tw/article/my-way-ethan-tu) — Bestätigt die Namen der Open-Source-Modelle TAIDE/TAME/FedGPT; bestätigt den Korpus von über 60 Milliarden traditionellen chinesischen Token für TAIDE.

[^4]: [CDC des Gesundheitsministeriums: Erklärung zur Taiwan Social Distancing App](https://www.cdc.gov.tw/) — Bestätigt, dass die COVID-19 Social Distancing App dezentrales Bluetooth verwendet und keine GPS-Standorte sammelt.

[^5]: [BNext: Du Yijin gründet KI-Lab in Taiwan](https://www.bnext.com.tw/article/44267/founder-of-ptt-ethan-tu-back-to-taiwan-to-establish-an-ai-lab) — Berichtet über den Hintergrund und die Motivation von Du Yijins Gründung von Taiwan AI Labs in Taiwan.

---

_Dieser Text wurde von Community-Beitragender @idlccp02 verfasst, aktualisiert am 07.05.2026 mit Faktenprüfungsergebnissen (TAIDE/TAME/FedGPT/60 Milliarden Token; Hedge bezüglich der Microsoft-Stelle von Du Yijin)._
