---
title: 'Der Schrägstrich im Zeichen „Gong“: Zwei versteckte Steuern, die taiwanische Ingenieure täglich zahlen'
description: 'Auf Windows 11 (zh-TW) speichert das Skript alle 4000+ Pfade in `root`, Technology wird zu Null; unter Linux CI ist es grün. Das Skript nutzt den Schrägstrich zur Trennung, nicht den Rückwärtsstrich. Eine ältere Ebene steckt im Zeichen: Der zweite Byte von Big5 „Gong“ ist der ASCII-Rückwärtsstrich.'
date: 2026-08-13
category: 'Technology'
tags:
  [
    'Open Source',
    'Windows',
    'Big5',
    'UTF-8',
    'Zeichensatzkodierung',
    'traditionelles Chinesisch',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: 'Großes Zeichen „Gong“ mit seinen Big5-Bytes A5 und 5C; das Feld 5C zeigt mit einem Pfeil auf den ASCII-Rückwärtsstrich 0x5C; darunter die tatsächliche Python-Ausgabe, wobei der zweite Byte von „Xu Gong Gai“ ein Rückwärtsstrich ist'
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369eef'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-11-05T13:29:39.889591+00:00'
---

> **30-Sekunden-Zusammenfassung:** Ich führte das Statusskript aus und sah 4546 in `root`. Auf GitHub war der Linux CI grün. Später erkannte ich zwei Dinge: Der Rückwärtsstrich in Windows-Pfaden konnte vom Skript nicht getrennt werden; die zweite Hälfte des Big5-Zeichens „Gong“ ist selbst der ASCII-Rückwärtsstrich. Die Mechanismen sind unterschiedlich, treten aber oft auf demselben traditionell chinesischen Windows auf.

Ich pflege das Statusskript von Taiwan.md unter Windows 11 (zh-TW). An diesem Abend führte ich wie gewohnt `i18n-status.py` aus und wartete darauf, dass die Konsole eine Zahl ausgibt. Die Hauptkonsole war cp950. Es gab keine roten Zeichen in der Ausgabe.

Der Bildschirm blieb bei 4546 stehen. Alles befand sich in einer Kategorie namens `root`. Technology war 0.

In derselben Woche wurde auf GitHub gepusht, und der CI unter Linux zeigte grün an.

Die Skriptvariable hieß `zh_articles` und scannte Pfade unter `knowledge`, die nicht Englisch, About oder Unterverzeichnisse waren; auch Japanisch, Koreanisch und Arabisch wurden mitgezählt. An diesem Abend konnte es nicht einmal die Kategorien trennen, sodass 4000+ Pfade in dieselbe Zelle gepackt wurden. Keine Ausnahmen, keine Warnungen. Die Statistik sah aus wie ein kompletter Systemausfall; keine Dateien waren verloren gegangen. [^8]

Der Dateipfad auf der Festplatte war `knowledge\Technology\ein_Artikel.md`, wobei die Verzeichnisse durch den Rückwärtsstrich getrennt wurden. Das Skript verwendete `split('/')` zur Ermittlung des Kategorienamens. Dies funktionierte unter Linux, da der Pfad ursprünglich Schrägstriche enthielt. Unter Windows konnte es jedoch nicht am Rückwärtsstrich trennen; der gesamte Pfad kehrte unverändert zurück und der Artikel wurde in die Standardkategorie `root` geworfen. [^1]

Nachdem ich `pathlib` verwendet hatte, um mit den Verzeichnissen umzugehen, gab es 59 Einträge unter Technology, was mit dem Inhalt des Ordners übereinstimmte. Nur eine Annahme lag dazwischen: Welche Art von Trennzeichen nutzt dein Rechner zur Unterscheidung der Verzeichnisse?

![Tatsächliche Python-Ausgabe in der Konsole: Ein Windows-Pfad wird mit split('/') getrennt und gibt nur eine Liste mit einem Element zurück; an PureWindowsPath(p).parts wird die Aufteilung knowledge, Technology, Dateiname gezeigt](/article-images/technology/windows-path-split-vs-pathlib.svg)

_Ein Pfad, zwei Trennmethoden. `split('/')` findet keinen Schrägstrich und gibt den gesamten Pfad unverändert zurück; `PureWindowsPath` erkennt den Rückwärtsstrich und kann Technology liefern. Erstellt von Taiwan.md Contributors, CC BY-SA 4.0._

> **📝 Kuratorische Anmerkung:** Die Skriptsyntax war nicht falsch, und der CI hat tatsächlich Tests durchgeführt. Der Bruch liegt zwischen „dem Rechner des Autors“ und „dem Rechner, den das Werkzeug annimmt“. Diese Lücke gehört keinem Prozess, daher ist niemand verantwortlich.

## Der Strich in „Gong“

Die erste Ebene war der Pfad. Die zweite Ebene ist viel älter und steckt im Zeichen selbst.

Big5 wurde 1984 festgelegt; ein chinesisches Zeichen besteht aus zwei Bytes. Wenn das zweite Byte zwischen `0x40` und `0x7E` liegt, kollidiert es mit gängigen ASCII-Symbolen: `[` , `]` , `{` , `}` , `\` , `|`. Der damalige außerordentlicher Professor für Informatik an der Chaoyang University of Science and Technology (die im August 2023 in Rente ging) schrieb auf seiner Lehrseite: „Da die ASCII-Codes von 40–7E allgemeine Zeichen sind, kann dies manchmal Programmierern Probleme bereiten.“ [^2]

Der Code für „Gong“ ist `A5 5C`. Das hintere `0x5C` ist in ASCII der Rückwärtsstrich `\`. Ein Programm, das eine Zeichenkette Byte für Byte durchsucht und den `\` als Escape- oder Trennzeichen behandelt, würde beim Scannen des zweiten Bytes von „Gong“ denken, es hätte einen Pfad gefunden. Wenn ein Dateiname „Gong“ enthält oder der Pfad „Gong“ enthält, kann hier ein Fehler auftreten.

Die Entwicklerkreise in Taiwan und Hongkong nennen dies „Xu Gong Gai“: „Xu“ ist `B3 5C`, „Gong“ ist `A5 5C`, „Gai“ ist `BB 5C`. Drei gängige Zeichen, die zusammen einen Namen bilden. [^5] Hong Chaokuei listete auch „Jia Ye Cheng Zhen Gong“ auf, bei dem das zweite Byte mit `[` , `]` , `{` , `}` oder `\` kollidierte und ein Scan-Tool namens `b5tm` entwickelte. [^2] Ein Bug wurde nach einem Menschen benannt, weil er häufig genug auftrat, um eine Generation dazu zu zwingen, darüber sprechen zu müssen.

Im Jahr 2015 wechselte der Autor des Blogs „Dark Thread“ zu Visual Studio 2015. Die alte `.cs`-Datei war noch in BIG5 gespeichert. Nachdem der Compiler auf Roslyn umgestellt wurde, führte die Datei mit „Xu Gong Gai“ einen Kompilierungsfehler ein.

Zwei Tage später teilten Kollegen mit, dass sie auch lange feststeckten und schließlich seinen Artikel nachgetrackt hatten. Ein Netizen hatte Tausende von Dateien, konvertierte eine und hatte immer noch viele übrig; er musste sich daher „von VS2015 verabschieden“. [^7]

Dies ist nichts mit dem vorherigen `split('/')` zu tun. Das eine geht davon aus, wie ein moderner Pfad aussieht. Das andere beinhaltet Symbole im Zeichen selbst, da es vor vierzig Jahren zwei Bytes gewählt hat. Die Mechanismen sind unterschiedlich, aber die Rechnung kommt oft auf demselben cp950-Rechner an. Wie die Eingabe das Zeichen in den Computer bringt, siehe [Eingabemethoden für ostasiatische Schriftzeichen](/de/technology/east-asian-input-methods/). Hier geht es darum, ob die Werkzeugkette das Zeichen erkennt, nachdem es auf der Festplatte ist.

## Die Standardwerte haben keinen Zweig für diesen Rechner erstellt

Git aktiviert standardmäßig `core.quotePath`. Dateinamen mit Bytes größer als `0x80` werden von `git status` als Oktal-Escape wie `\344\270\255` ausgegeben. Die chinesischen Dateinamen sind noch da, Sie verstehen nur nicht jeden Tag, was Ihr Repository sagt. [^3] Es escape-t die hochrangigen Bytes von UTF-8. Das `0x5C` von Big5 ist eine andere Sache. Beide sehen wie ein Rückwärtsstrich aus, aber der Grund ist anders.

![Tatsächliche Konsole-Ausgabe: git status --short gibt den chinesischen Dateinamen als in Anführungszeichen gesetzte Oktal-Escape-Sequenz aus; mit -c core.quotePath=false wird derselbe Dateiname in Chinesisch angezeigt](/article-images/technology/git-quotepath-octal-cjk.svg)

_Dieselbe Datei, darunter eine Reihe von `\345\212\237`. Der hier verwendete Rückwärtsstrich ist ein Escape von Git und hat nichts mit dem `0x5C` im Zeichen „Gong“ zu tun. Erstellt von Taiwan.md Contributors, CC BY-SA 4.0._

Wenn Python 3 unter Windows ohne `encoding='utf-8'` die Funktion `open()` aufruft, kann es das System-Locale verwenden. Eine UTF-8-Datei wird von Linux gelesen, aber dieser Rechner dekodiert sie mit cp950, und Satzzeichen oder Tonzeichen gehen verloren. [^4] Ich selbst habe einmal bezahlt: Mit PowerShell 5.1 (`Get-Content | Set-Content`) wurde die Datei in UTF-8 konvertiert, wobei lange Gedankenstriche im Diff zu `??` wurden. Das war auch eine versteckte Steuer, aber nicht das zweite Thema.

Wenn Statusmeldungen Emojis enthalten, stürzt diese cp950-Konsole ab. Die Zeichen sind nicht im Zeichensatz vorhanden; Python kann sie nicht ausgeben, und die Ausnahme explodiert auf der obersten Ebene. Linux CI kann dies nicht testen, da es nicht auf diesem Rechner läuft.

Git, Python, das Beispielverzeichnis `$HOME/project/src` haben keinen eigenen Zweig für Windows (zh-TW) erstellt.

Hong Chaokuei wurde 2015 von iThome interviewt und sprach darüber, in welchem Format staatliche Dateien geöffnet werden sollten und wie lange sie halten. Der Bericht fasste seine Meinung zusammen: Wenn der Staat nur Microsoft-Produkte zur Dateibearbeitung verwendet, vertraut er im Wesentlichen auf die Lebensdauer von Microsoft anstelle der Republik China. [^6] Dieser Satz befasste sich mit dem Dateiformat und der Aufbewahrungsdauer. Die Bindung der Daten an ein bestimmtes Standardwerkzeug bestimmt, wer sie in der Zukunft noch lesen kann. Die Zusammenarbeit im Open-Source-Bereich ist an die Standardumgebung eines bestimmten Rechners gebunden. Der Konflikt zwischen Bürgertechnologie und staatlichen Dateiformaten wird in [Open Source und Regierung](/de/technology/open-source-and-g0v/) thematisiert. Die taiwanischen Entwickler haben diese Diskrepanz lange absorbiert, siehe [Taiwanischer Open-Source-Geist](/de/technology/taiwan-open-source-spirit/).

Der Pfadtrenner, die Konsolendekodierung, `$HOME` in den CI-Beispielen – keiner davon hat einen eigenen Zweig für diesen Rechner erstellt. Als 4546 Pfade zur Fehlerkategorie gehörten, gab es keine Zeile Code, die einen Fehler meldete. Die Statistik sah normal aus, bis man vor diesem Rechner saß.

## Weiterführende Lektüre

- [Taiwanischer Open-Source-Geist](/de/technology/taiwan-open-source-spirit): Die Kultur und der Kontext der Beteiligung taiwanischer Entwickler an Open Source.
- [Eingabemethoden für ostasiatische Schriftzeichen](/de/technology/east-asian-input-methods): Wie Zeichen getippt werden, vom Zeichensatz bis zur Tastatur.
- [Open Source und Regierung](/de/technology/open-source-and-g0v): Die Zusammenarbeit zwischen offenen Daten und staatlichen Formaten.

## Bildquellen

- **Big5-Code von „Gong“ und der Rückwärtsstrich (Hero)**: Erstellung von Taiwan.md Contributors, CC BY-SA 4.0, gespeichert unter `public/article-images/technology/big5-gong-5c-backslash.webp`. Die Zeile darunter ist die tatsächliche Ausgabe von `'Xu Gong Gai'.encode('big5')` in Python 3 und entspricht dem Big5-Eintrag im Wiki. [^5]
- **split('/') vs PureWindowsPath**: Erstellung von Taiwan.md Contributors, CC BY-SA 4.0, gespeichert unter `public/article-images/technology/windows-path-split-vs-pathlib.svg`. Der Inhalt ist das tatsächliche Ergebnis der Ausführung in Python 3; `PureWindowsPath` teilt Pfade nach Windows-Regeln auf jedem Betriebssystem, sodass es reproduzierbar ist, ohne ein Windows-Gerät zu benötigen.
- **Oktal-Ausgabe von Git core.quotePath**: Erstellung von Taiwan.md Contributors, CC BY-SA 4.0, gespeichert unter `public/article-images/technology/git-quotepath-octal-cjk.svg`. Der Inhalt ist die tatsächliche Ausgabe von `git status --short` nach Hinzufügen des Dateinamens zu einem temporären Repo; dieses Verhalten ist unabhängig vom Betriebssystem.

## Referenzen

[^1]: [Microsoft Learn: Dateipfadformate unter Windows](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — Die Dokumentation von .NET erklärt, dass traditionelle DOS-Pfade den Rückwärtsstrich als Trennzeichen verwenden und Schrägstriche in Rückwärtsstriche konvertiert werden.

[^2]: [Hong Chaokuei: Big5-Code-Probleme beim Programmieren](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — Die Lehrseite listet gängige Zeichen, deren zweites Byte in den gefährlichen ASCII-Bereich fällt (Jia Ye Cheng Zhen Gong), und stellt das Scan-Tool b5tm vor. Am Ende der Seite ist keine Berufsbezeichnung angegeben. iThome nannte ihn 2015 außerordentlicher Professor. Ich habe von 1997 bis 2023 an der Chaoyang University of Science and Technology gearbeitet und im August 2023 in Rente gegangen.

[^3]: [git-config: core.quotePath](https://git-scm.com/docs/git-config) — Die offizielle Dokumentation erklärt, dass Pfade mit Bytes größer als 0x80 standardmäßig als Oktal-Escape dargestellt werden.

[^4]: [Python 3: open()](https://docs.python.org/3/library/functions.html#open) — Die Funktionsbeschreibung gibt an, dass bei Nichtangabe der Kodierung das System-Locale verwendet werden kann.

[^5]: [Wikipedia: Big5](https://zh.wikipedia.org/zh-tw/大五碼) — Listet „Gong“ als `0xA55C`, „Xu“ als `0xB35C` und „Gai“ als `0xBB5C` auf und erklärt, dass dieses Problem der Spitzname Xu Gong Gai ist.

[^6]: [iThome: Interview mit Hong Chaokuei](https://www.ithome.com.tw/news/93606) — Ein Interview von 2015; die Lehrstelle wird in dem Artikel genannt. Der ursprüngliche Artikel gab oft 403 zurück; die Aussage über die Lebensdauer von Microsoft wurde nur aus Suchergebnissen zitiert und nicht als wörtliches Zitat verwendet.

[^7]: [Dark Thread: Schutzschild-Maschine – Lösung für BIG5-Kompatibilitätsprobleme in VS2015](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — Dokumentiert 2015, wie „Xu Gong Gai“ bei der Kompilierung von BIG5-Quellcode in Visual Studio 2015 zu einem Kompilierungsfehler führte. Der Artikel enthält den Satz „musste sich von VS2015 verabschieden“.

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — Gemergt am 26. Juli 2026. Vor der Korrektur gab es unter Windows nur `root: 4546` in den Kategorien; nach der Korrektur waren es 59 für Technology (zh). Die Emojis, die die cp950-Konsole zum Absturz bringen könnten, wurden entfernt.
