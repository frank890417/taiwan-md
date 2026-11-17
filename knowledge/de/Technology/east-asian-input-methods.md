---
title: 'Tastaturzivilisationskonflikt: Hundert Jahre Entwicklung ostasiatischer Eingabemethoden'
description: 'Da alle Tastaturen weltweit gleich aussehen: Wie pressen verschiedene Zivilisationen ihre Schriften in 26 lateinische Buchstaben? Von Taiwans Zhuyin bis Koreas Dubeolsik – Eingabemethoden sind ein stiller Kulturverteidigungskampf.'
date: 2026-03-19
category: 'Technology'
tags:
  [
    'Eingabemethoden',
    'Technologie',
    'Kultur',
    'Zhuyin',
    'Cangjie',
    'Tastatur',
    'Digitalisierung',
    'Ostasien',
    'Schrift',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-03-19
lastHumanReview: false
readingTime: 15
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/東亞文字輸入法.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:90551a3865db4ef0'
sourceBodyHash: 'sha256:2cf976c21e3add32'
translatedAt: '2026-11-17T17:53:31.113514+00:00'
---

# Tastaturzivilisationskonflikt: Hundert Jahre Entwicklung ostasiatischer Eingabemethoden

## 30-Sekunden-Überblick

Alle Computertastaturen der Welt nutzen das QWERTY-Layout, ein Design aus den 1870er Jahren für englische Schreibmaschinen. Doch über zwei Milliarden Menschen in Asien verwenden Schriftsysteme (chinesische Schriftzeichen, Kana, koreanische Schrift, Thai, Birmanisch), die sich nicht direkt auf 26 lateinische Buchstaben abbilden lassen: Chinesische Schriftzeichen umfassen Zehntausende von Glyphen; Koreanisch, Thai und Birmanisch sind zwar Lautschriften, doch ihre Buchstabenzahlen und Kombinationsregeln unterscheiden sich grundlegend vom Englischen. Wie lösen sie das? Jede Zivilisation erfand ihre eigene „Übersetzungsschicht“ – die Eingabemethode. Diese sind nicht nur technische Werkzeuge, sondern Schlachtfelder kultureller Identität. Taiwan nutzt Zhuyin, China Pinyin, Japan Romaji, Korea zerlegt die Buchstaben direkt – hinter jeder Wahl steht eine andere Philosophie einer Zivilisation im Umgang mit der Digitalisierung.

---

## Das Kernproblem: 26 Buchstaben gegen Zehntausende Zeichen

Englischsprachige benötigen nie eine „Eingabemethode“ – die Tastatur hat 26 Buchstaben, man tippt, was man sieht. Chinesische Schriftzeichen hingegen zählen über 50.000, davon 3.000–5.000 im täglichen Gebrauch. Eine Tastatur mit 5.000 Tasten ist unmöglich.

Das bedeutet, ostasiatische Zivilisationen müssen ein fundamentales Problem lösen: **Wie drückt man unendliche Schrift mit begrenzten Tasten aus?**

Jede Zivilisation gab eine radikal unterschiedliche Antwort, und diese Antworten spiegeln tiefgreifend ihre Sprachstrukturen, Bildungssysteme, ja sogar politische Entscheidungen wider.

---

## 🇹🇼 Taiwan: Zhuyin-Fuhao (Zeichen über „Aussprache“ finden)

### Historische Wurzeln von Zhuyin

Taiwans Hauptmethode ist die **Zhuyin-Eingabe**, die 37 Zhuyin-Symbole (ㄅㄆㄇㄈ⋯) zur Lautnotation verwendet. Will man „Taiwan“ eingeben, drückt man `ㄊㄞˊ ㄨㄢ`, das System listet Homophone zur Auswahl auf.

Zhuyin hieß ursprünglich „Zhuyin Zimu“, 1913 berief das Bildungsministerium die „Konferenz zur Vereinheitlichung der Aussprache“, basierend auf Zhang Taiyans aus alten chinesischen Radikalen vereinfachten „Niǔwén“ und „Yùnwén“; 1918 wurde sie offiziell verkündet[^7]. Es ist ein **vollständig vom lateinischen Alphabet unabhängiges Lautsystem** – das ist entscheidend.

### Warum Taiwan an Zhuyin festhält

Taiwans Festhalten an Zhuyin hat vier sich gegenseitig verstärkende Gründe. Das Bildungssystem ist die Basis: In den ersten zehn Wochen der Grundschule wird Zhuyin intensiv gelehrt; es ist das tiefste Verwurzelungswerkzeug jedes Taiwaners, die Umstellungskosten wären zu hoch. Kulturelle Identität ist der Antrieb: Zhuyin-Symbole sind ein dem traditionellen Chinesisch eigenes Notationssystem, sie nutzen keine lateinischen Buchstaben und gelten als Fortführung der chinesischen Kulturtradition. Technisch kann Zhuyin die vier Töne und den Neutralton des Mandarin präzise notieren. Schließlich sind Taiwans Tastaturen an jedem lateinischen Buchstaben mit dem entsprechenden Zhuyin-Symbol bedruckt – eine doppelte Beschriftung, die das System auch auf Hardware-Ebene verankert.

### Zhuyins Limitationen

Zhuyins größtes Problem sind **zu viele Homophone**. Mandarin hat nur etwa 1.300 verschiedene Silben, muss aber Zehntausende Zeichen abdecken. Tippt man `ㄕˋ`, erscheinen „是、事、式、室、市、試、視、適、勢、世⋯⋯“ Dutzende Zeichen. Der Nutzer muss aus der Kandidatenliste wählen, was die Eingabe verlangsamt.

In jüngster Zeit haben intelligente Zhuyin-Methoden (wie Microsoft New Zhuyin, RIME) durch KI-Kontextvorhersage die Trefferquote stark erhöht, doch das grundlegende Auswahlproblem bleibt.

### Cangjie: Ein anderer Weg

1976 erfand **Zhu Bangfu** (朱邦復), der als „Vater der chinesischen Computertechnik“ gilt, die **Cangjie-Eingabemethode**, die völlig ohne Aussprache auskommt und stattdessen **Zeichenformen zerlegt**. Jedes chinesische Zeichen wird in 1–5 „Wurzelelemente“ zerlegt, die auf 25 Tasten (A bis Y, ohne Z[^2]) abgebildet sind.

Beispiel: „明“ = 日 + 月 = `A` + `B`.

Cangjies Vorteil ist die niedrigste Homophonrate unter chinesischen Eingabemethoden[^2]; Geübte müssen kaum noch Zeichen auswählen. Erfahrene Cangjie-Nutzer sind schneller als Zhuyin-Nutzer. 1984 veröffentlichte Zhu Bangfu eine Zeitungsanzeige, in der er auf die Patentrechte an Cangjie verzichtete[^2], sodass jedermann sie frei nutzen und einbauen konnte – mehr als ein Jahrzehnt bevor der Begriff „Open Source“ (1998) aufkam.

In Hongkong ist Cangjie extrem verbreitet (über die Hälfte der Computernutzer), in Taiwan blieb es jedoch eine Minderheitenmethode, Hauptgrund: steile Lernkurve.

### Hanglie-Eingabemethode

Die von **Liao Mingde** (廖明德) erfundene **Hanglie-Eingabemethode** ist eine weitere taiwanische Eigenentwicklung; sie zerlegt Zeichen nach der „Zeile“ und „Spalte“ der Wurzelelemente auf der Tastatur. Frühere Versionen nutzten die oberste Ziffernreihe, insgesamt 40 Codes, genannt „Hanglie 40“; die heutige „Hanglie 30“ verwendet nur die drei Buchstabenreihen[^8]. Sie steht für Taiwans kontinuierliche Innovation im Eingabemethodenbereich.

---

## 🇨🇳 China: Hanyu Pinyin (Chinesisch mit lateinischen Buchstaben buchstabieren)

### Die Wahl von Pinyin

Chinas Hauptmethode ist die **Hanyu-Pinyin-Eingabe**, die direkt die 26 englischen Buchstaben nutzt, um die Aussprache chinesischer Zeichen zu buchstabieren. Für „Taiwan“ tippt man `taiwan`, das System wandelt in vereinfachte Zeichen um.

Diese Wahl hat tiefen historischen Hintergrund:

1. **1958 Verkündung des Hanyu-Pinyin-Schemas**: Ersetzte das vorherige Zhuyin Zimu (in China „Zhuyin Fuhao“ genannt) und die Wade-Giles-Umschrift.
2. **Vereinfachte-Schrift-Reform**: Ab 1956 Förderung vereinfachter Zeichen, die mit Pinyin-Eingabe eine Symbiose bilden – Pinyin lernen → mit Pinyin tippen → vereinfachte Zeichen erhalten.
3. **Internationalisierungsüberlegungen**: Pinyin nutzt lateinische Buchstaben, erleichtert Ausländern das Chinesischlernen und Chinesen die Eingabe auf jeder Standardtastatur.

### Pinyin vs. Zhuyin: Ein kultureller Graben, den man vielleicht übersehen hat

Oberflächlich nutzen beide „Aussprache zum Zeichenfinden“. Die tiefere Kluft ist jedoch enorm:

|                        | Taiwan Zhuyin                         | China Pinyin                         |
| ---------------------- | ------------------------------------- | ------------------------------------ |
| Zeichensystem          | Unabhängige Symbole (ㄅㄆㄇ)          | Lateinische Buchstaben (bpmf)        |
| Kultureller Ursprung   | Aus chinesischen Radikalen abgeleitet | Aus Latinisierungsbewegung           |
| Lernvoraussetzung      | Kein Englisch nötig                   | Lateinische Buchstabenkenntnis nötig |
| Tastaturanforderung    | Tastatur mit Zhuyin-Beschriftung      | Jede englische Tastatur              |
| Verhältnis zur Schrift | „Beschreibt Aussprache“               | „Übersetzt in Lateinbuchstaben“      |

Dieser Unterschied ist nicht nur technisch, er spiegelt den fundamentalen Dissens beider Seiten wider, wie Chinesisch sich international verknüpfen soll. Taiwan bewahrt ein vom Westen unabhängiges Symbolsystem, China umarmt die Latinisierung.

### Wubi: Chinas „Cangjie“

Erwähnenswert: China hat auch eine formenbasierte Methode, das **Wubi Zixing** (Wang Yongmin, 1983). Die Logik ähnelt Cangjie: Zeichen werden in Striche zerlegt und auf Tasten abgebildet. In den 1990er Jahren war Wubi in chinesischen Büros allgegenwärtig, doch mit der Intelligenterwerdung der Pinyin-Eingabe und der Smartphone-Verbreitung stürzte die Nutzungsrate ab. Heute nutzt die große Mehrheit in China Pinyin.

---

## 🇯🇵 Japan: Romaji → Kana → Kanji – Dreistufige Metamorphose

### Japans einzigartige Herausforderung

Japanisch gehört zu den komplexesten Schriftsystemen der Welt und nutzt gleichzeitig drei Schriften:

- **Hiragana** (ひらがな): 46 grundlegende Silbensymbole
- **Katakana** (カタカナ): 46 Symbole, hauptsächlich für Lehnwörter
- **Kanji** (漢字): ca. 2.000–3.000 im täglichen Gebrauch

Der Standard japanischer Eingabe ist die **„Romaji-Eingabe“** (ローマ字入力):

1. Lateinische Buchstaben tippen → automatische Umwandlung in Hiragana: `ka` → `か`, `n` → `ん`
2. Weiter tippen, System fügt zu Wörtern zusammen: `kanji` → `かんじ`
3. Leertaste drücken → Umwandlung in Kanji: `かんじ` → `漢字`

Das ist ein **dreischichtiger Konvertierungsprozess**: Lateinbuchstaben → Kana → Kanji, jede Stufe erfordert Nutzerentscheidungen.

### Warum Japan Romaji statt direkter Kana-Eingabe nutzt?

Japan hat tatsächlich die **direkte Kana-Eingabe** (かな入力) als Option; jede Taste entspricht einem Kana. Doch man muss 50+ Tastenpositionen auswendig kennen, und da Japans Englischunterricht bereits Romaji lehrt, empfinden die meisten die lateinische Eingabe als bequemer.

Am Computer nutzen die allermeisten Japaner Romaji-Eingabe, direkte Kana-Eingabe ist zur Minderheit geworden. Auf Smartphones ist es umgekehrt: Direkte Kana-Auswahl wird weit verbreitet genutzt[^6].

### Kulturelle Bedeutung japanischer Eingabe

Die Kanji-Konvertierung hat einen interessanten kulturellen Effekt: Junge Japaner **vergessen, wie man Kanji von Hand schreibt**. Da die Eingabemethode automatisch das richtige Kanji anzeigt, muss man nur wissen, „wie es ausgesprochen wird“, nicht „wie es geschrieben wird“. Japaner machen oft selbstironisch: Nach langem Tippen kann man Kanji noch lesen, aber beim Schreiben mit dem Stift ist das Gedächtnis weg.

---

## 🇰🇷 Korea: Dubeolsik (Das eleganteste Tastaturdesign)

### Koreas Genie: Buchstaben lassen sich direkt auf Tasten abbilden

Koreanisch (한글, Hangul) ist ein 1443 von König Sejong (世宗大王) in Auftrag gegebenes Alphabetsystem und eine der weltweit wenigen Schriften mit **klarem Erfinder**. Es besteht aus 14 Konsonanten (ㄱㄴㄷㄹ⋯) und 10 Vokalen (ㅏㅓㅗㅜ⋯), die sich zu Silbenblöcken kombinieren.

Koreanische Konsonanten + Vokale = insgesamt 24 Grundbuchstaben – sie passen **exakt in die 26 Tasten einer QWERTY-Tastatur**!

### Dubeolsik (두벌식, Zweisatz-Methode): Linke Hand Konsonanten, rechte Hand Vokale

Koreas Standard **Dubeolsik** (두벌식, „Zweisatz“: ein Satz Konsonanten, ein Satz Vokale) ist extrem intuitiv[^3] gestaltet:

- **Linke Hand** tippt Konsonanten: ㄱ(r) ㄴ(s) ㄷ(e) ㄹ(f) ㅁ(a)⋯
- **Rechte Hand** tippt Vokale: ㅏ(k) ㅓ(j) ㅗ(h) ㅜ(n) ㅡ(m)⋯

Beim Tippen wechseln sich die Hände ab, der Rhythmus ist hervorragend, und **keine Zeichenauswahl nötig** – was getippt wird, erscheint sofort.

Unter den Eingabemethoden des Sinosphären-Kulturkreises ist dies eine der wenigen, die **keine Kandidatenliste benötigen** (koreanische Tastaturen haben zwar eine Hanja-Taste zur Umwandlung in chinesische Zeichen, im Alltag ungenutzt). Koreanische Silbenblöcke werden in Echtzeit kombiniert: `ㅎ` + `ㅏ` + `ㄴ` = 한, `ㄱ` + `ㅡ` + `ㄹ` = 글. Der gesamte Prozess: null Verzögerung, null Auswahl.

### Warum koreanische Eingabe am elegantesten ist?

Weil Koreanisch selbst für „leichtes Lernen“ entworfen wurde. Das 1446 verkündete „Hunminjeongeum“ lobt in dem von Minister Jeong Inji (鄭麟趾) verfassten Vorwort die 28 von König Sejong geschaffenen Buchstaben: „Weise lernen sie in einem Morgen, Toren in zehn Tagen“ (智者不終朝而會，愚者可浹旬而學)[^9]. 600 Jahre später passt dieses Design perfekt ins digitale Zeitalter: 24 Buchstaben füllen die Tastatur exakt aus, Konsonanten links, Vokale rechts, keine Konvertierung, keine Auswahl.

---

## 🇹🇭 Thailand: Kedmanee (Ein Layout aus der Schreibmaschinenära)

### Thais Herausforderung: 44 Konsonanten + Tonzeichen

Thai hat 44 Konsonantensymbole, 16 Vokalsymbole (kombinierbar zu mindestens 32 Vokalformen), 4 Tonzeichen – zusammen über 60 Zeichen, weit mehr als Standardtasten[^10].

Die Lösung ist das **Kedmanee-Layout** (เกษมณี), das auf thailändische Schreibmaschinen der 1920er Jahre zurückgeht, lange „traditionelles Layout“ genannt, erst in den 1970ern nach dem legendären Designer Suwanprasert Ketmanee benannt[^4]. Es platziert die häufigsten Zeichen auf der unshifteten Ebene, seltenere auf der Shift-Ebene.

### Besonderheiten thailändischer Eingabe

Thai ist eine **Lautschrift**, doch ihre Schreibregeln sind extrem komplex: Vokale können vor, nach, über oder unter dem Konsonanten stehen. Beispiel: เ (e) wird vor dem Konsonanten geschrieben, aber nach ihm ausgesprochen. Das bedeutet: Tipp-Reihenfolge und Lesereihenfolge stimmen nicht immer überein; Nutzer müssen sich an „erst Vokal, dann Konsonant“ in manchen Fällen gewöhnen.

Thai-Eingabe braucht keine Zeichenauswahl (wie Koreanisch), aber man muss zwei Ebenen (Normal + Shift) beherrschen.

---

## 🇲🇲 Myanmar: Der Unicode-Krieg

### Zawgyi vs. Myanmar Unicode: Ein digitaler Bürgerkrieg

Myanmars Eingabemethodengeschichte ist die dramatischste Ostasiens. Die birmanische Schrift hat 33 Konsonanten und komplexe Kombinationsregeln, doch das eigentliche Problem liegt nicht in der Eingabemethode, sondern in der **Schriftkodierung**.

Der 2007 veröffentlichte **Zawgyi-Font** entsprach nicht dem Unicode-Standard, verbreitete sich aber durch Benutzerfreundlichkeit rasant und war bis 2019 der auf myanmarischen Websites dominierende Font[^5].

Problem: Zawgyi und Unicode sind inkompatibel. Derselbe Text erscheint in beiden Systemen völlig anders, was massive Kommunikationschaos verursachte.

Die myanmarische Regierung setzte den **1. Oktober 2019** als „U-Day“ fest, an dem vollständig auf **Myanmar Unicode** umgestellt wurde[^5]. Facebook führte automatische Konvertierung ein, um Zawgyi-Texte in Unicode umzuwandeln. Diese Migration betraf das gesamte nationale Mobilfunk- und Web-Ökosystem – vergleichbar mit einem landesweiten digitalen Infrastrukturumzug.

---

## Vergleich: Sechs Zivilisationen, sechs Tastaturphilosophien

| Zivilisation | Hauptmethode    | Prinzip                     | Auswahl nötig?          | Kulturelle Positionierung    |
| ------------ | --------------- | --------------------------- | ----------------------- | ---------------------------- |
| 🇹🇼 Taiwan    | Zhuyin          | Unabhängige Lautsymbole     | ✅ Viele Homophone      | Kulturelle Unabhängigkeit    |
| 🇨🇳 China     | Hanyu Pinyin    | Lateinische Buchstabierung  | ✅ Viele Homophone      | Internationale Anbindung     |
| 🇯🇵 Japan     | Romaji          | Latein → Kana → Kanji       | ✅ Kanji-Konvertierung  | Mehrschichtige Konvertierung |
| 🇰🇷 Korea     | Dubeolsik       | Direkte Buchstabenabbildung | ❌ Echtzeit-Kombination | Perfekte Anpassung           |
| 🇹🇭 Thailand  | Kedmanee        | Direkte Zeichenabbildung    | ❌ Direkte Ausgabe      | Schreibmaschinenerbe         |
| 🇲🇲 Myanmar   | Myanmar Unicode | Zeichenkombination          | ❌ Direkte Ausgabe      | Standardisierungskampf       |

---

## Smartphone-Ära: Neues Schlachtfeld

Smartphones veränderten das Eingabemethoden-Ökosystem radikal. Taiwans Zhuyin-Tastaturen (Neun-Gitter oder Volltastatur) bleiben auf Mobilgeräten dominant, doch Handschrifteingabe und Spracheingabe gewinnen rasant an Nutzung. China setzt auf KI-getriebene Lösungen: Sogou Pinyin, Baidu Input werden Mainstream, „Wisch-Eingabe“ (Swipe) steigert Pinyin-Effizienz massiv. Japan entwickelte **Flick-Eingabe** (フリック入力): Finger wischen auf dem Neun-Gitter in Kana-Richtung, ganz ohne lateinische Buchstaben. Korea hat **Cheonjiin** (천지인, Himmel-Erde-Mensch), das mit den drei Grundstrichen ㆍ (Himmel), ㅡ (Erde), ㅣ (Mensch) alle Vokale kombiniert – ideal für kleine Bildschirme.

Die Smartphone-Ära macht ein Phänomen deutlicher: **Jüngere Generationen verlieren die Handschreibfähigkeit**. Im Sinosphären-Kreis besonders gravierend: Wenn die Eingabemethode alle Zeichen für einen merkt, vergisst die Hand sie.

---

## KI-Ära: Das Ende der Eingabemethoden?

Mit Fortschritten bei Spracherkennung und KI-Dialogtechnik stellt sich eine fundamentale Frage: **Brauchen wir noch Eingabemethoden?** Spracheingabe hat in vielen Szenarien das Tippen ersetzt, Chinas WeChat-Sprachnachrichten-Nutzung ist besonders hoch. KI-Vorhersage macht Eingabemethoden immer „schlauer“ – wenige Zeichen genügen für ganze Sätze. Fortschritte bei Handschrifterkennung machen „mit dem Finger auf dem Bildschirm schreiben“ praktikabel.

Doch Eingabemethoden werden nicht verschwinden. Denn sie sind nicht nur Werkzeuge – sie sind **Träger kulturellen Gedächtnisses**. Die zehn Wochen, in denen taiwanische Kinder Zhuyin lernen, der Moment, in dem Japaner auf der Tastatur Romaji in Kanji verwandeln, der Rhythmus koreanischer linker Hand Konsonanten, rechter Hand Vokale – das sind intime Dialoge jeder Zivilisation mit ihrer eigenen Schrift im digitalen Zeitalter.

---

## Weiterführende Literatur

- [Halbleiterindustrie](/de/technology/taiwan-semiconductor-industry) — Die Industrie, die die Chips hinter den Tastaturen produziert

## Quellen

[^1]: [Die Identität der Tastatur entschlüsseln (Teil 2): Kulturgeschichte von Cangjie und Zhuyin](https://www.thenewslens.com/article/12229) — Critical Review Network, historischer und kultureller Kontext der Cangjie-Eingabe

[^2]: [Cangjie-Eingabemethode](https://zh.wikipedia.org/zh-tw/倉頡輸入法) — Wikipedia; 1976 von Zhu Bangfu erfunden, 1984 Patentverzicht per Zeitungsanzeige, niedrigste Homophonrate unter chinesischen Eingabemethoden

[^3]: [Korean Keyboard Layout Guide](https://www.90daykorean.com/korean-keyboard/) — 90 Day Korean; Erklärung der Dubeolsik (2-Set) koreanischen Tastaturbelegung

[^4]: [Thai Kedmanee keyboard layout](https://en.wikipedia.org/wiki/Thai_Kedmanee_keyboard_layout) — Wikipedia; Ursprung in thailändischen Schreibmaschinen der 1920er, erst 1970er nach dem legendären Designer Suwanprasert Ketmanee benannt

[^5]: [Zawgyi font](https://en.wikipedia.org/wiki/Zawgyi_font) — Wikipedia; 2007 veröffentlicht, am 1. Oktober 2019 erklärte die myanmarische Regierung den U-Day zur Umstellung auf Unicode

[^6]: [Kana-Eingabe](https://ja.wikipedia.org/wiki/かな入力) — Japanische Wikipedia; § Nutzung der Kana-Eingabe: Smartphones nutzen weit verbreitet direkte Kana-Eingabe, PCs überwiegend Romaji-Eingabe

[^7]: [Zhuyin Fuhao](https://zh.wikipedia.org/zh-tw/注音符號) — Wikipedia; basierend auf Zhang Taiyans Niǔwén und Yùnwén, 1913 auf der Konferenz zur Vereinheitlichung der Aussprache beschlossen, 1918 offiziell verkündet

[^8]: [Hanglie-Eingabemethode](https://zh.wikipedia.org/zh-tw/行列輸入法) — Wikipedia; von Liao Mingde erfunden, frühes „Hanglie 40“ nutzte Zifferntasten, heutiges „Hanglie 30“ nur drei Buchstabenreihen

[^9]: [Hunminjeongeum](https://zh.wikisource.org/wiki/訓民正音) — Wikisource Originaltext; Jeong Injis Vorwort „Weise lernen sie in einem Morgen, Toren in zehn Tagen“, datiert auf 11. Jahr von Jeongtong, 9. Monat

[^10]: [Thai-Schrift](https://en.wikipedia.org/wiki/Thai_script) — Wikipedia; 44 Konsonantensymbole, 16 Vokalsymbole kombinierbar zu mindestens 32 Vokalformen, 4 Tonzeichen
