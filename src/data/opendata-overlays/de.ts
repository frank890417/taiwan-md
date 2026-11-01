import type { DeepPartial, OpendataContent } from '../opendata-content';

export const de: DeepPartial<OpendataContent> = {
  meta: {
    title:
      'Open-Data-Kuratierung — Ein Wegweiser durch die Sinnebene der offenen Daten Taiwans × Twinkle Hub',
    description:
      'Fünfzigtausend staatliche Datensätze überfordern jeden. Diese Seite ist die Datenkuratierung von Taiwan.md: welche Datensätze sich lohnen, wie man sie für eine Analyse kombiniert und mit welchen Geschichten dieser Insel jede Zahlengruppe verbunden ist. Dazu eine Bewertung aus erster Hand, im praktischen Einsatz gewonnen, zu Vollständigkeit, Stabilität und Zugriffsvereinfachung des Twinkle Hub.',
  },
  hero: {
    eyebrow: 'OPEN-DATA-KURATIERUNG',
    title: 'Open-Data-Kuratierung',
    subtitle:
      'Ein Wegweiser durch die Sinnebene der offenen Daten Taiwans × Twinkle Hub',
    intro: [
      'Die Open-Data-Plattform der taiwanischen Regierung hält über zweiundfünfzigtausend Datensätze bereit. Diese Zahl überfordert jeden, der sie wirklich nutzen will: Man weiß nicht, welche wichtig sind, wie aktuell sie gehalten werden, welche zwei Tabellen sich verknüpfen lassen, geschweige denn, was das alles mit den eigenen Fragen zu tun hat.',
      'Taiwan.md hat über elfhundert Artikel über Taiwan geschrieben, und hinter jedem steckt eine Abwägung: Mit welchen Daten ließe sich das überprüfen? Diese Seite legt diese Ebene der Abwägung offen: wie wir die Dateninfrastruktur bewerten, welche Datensätze man bei einer Frage wie kombiniert und mit welchen Geschichten dieser Insel jeder Datenbereich zusammenhängt.',
    ],
    viz: {
      stats: [
        { label: 'staatliche Datensätze (2026-10-23)' },
        { label: 'Gerichtsurteile im Volltext' },
        { label: 'Aufgaben aus Staatsprüfungen' },
        { label: 'Nährwert-Analysezeilen' },
        { label: 'Vergabeeinträge' },
      ],
      graphHint:
        'Das Netz unten ist echt: links 20 Datenbereiche und fünf Fachkorpora (aus dem Twinkle-Hub-Crawl), rechts bereits geschriebene Taiwan.md-Artikel. Jede Linie ist eine Kuratierungsentscheidung dieser Seite. Ziehen und überfahren Sie die Knoten, um zu sehen, wie unübersichtliche Daten sich mit klaren Geschichten verbinden.',
      legend: {
        domain: 'Datenbereich',
        vertical: 'Fachkorpus',
        article: 'Taiwan.md-Artikel',
        center: 'Sinnebene von Taiwan.md',
      },
    },
  },
  ecosystem: {
    title: 'Die Ökosystemkarte: drei Ebenen, jede mit eigener Aufgabe',
    lead: 'Damit eine KI (oder ein Mensch) Fragen zu Taiwan wirklich beantworten kann, müssen drei Ebenen zusammenwirken: das Zuhause der Daten, der Weg der Abfragen und die Ebene des Sinns.',
    layers: [
      {
        name: 'data.gov.tw und die Fachsysteme der Behörden',
        role: 'Das Zuhause der Daten (maßgebliche Quelle)',
        desc: 'Die staatliche Open-Data-Plattform ist die dauerhafte Identität jedes Datensatzes: Datensatz-ID, Lizenzbedingungen, zuständige Behörde, Rohdaten-Downloads. Jede Quellenangabe sollte letztlich hierher zurückführen.',
        stat: 'über 52.000 Datensätze (2026-10-23)',
      },
      {
        name: 'Twinkle Hub',
        role: 'Der Weg der Abfragen (MCP-Gateway)',
        desc: 'Taiwans erster MCP-Hub bündelt Daten, die über Hunderte Behördenportale verstreut sind, in einem einzigen Abfragepunkt: semantische Suche, strukturierte Zeilenabfragen und Werkzeuge für fünf Fachbereiche. Eine KI erhält die Daten in einem Aufruf und spart sich den Marsch durch einzelne Portale.',
        stat: '21 Werkzeuge · 20 Bereiche',
      },
      {
        name: 'Taiwan.md',
        role: 'Die Ebene des Sinns (Kuratierung)',
        desc: 'Daten sprechen nicht von selbst. Auf welchen Datensatz man verweisen sollte, welche Aussage er prüft, mit welchem Stück Geschichte er zusammenhängt — das ist Kuratierungsarbeit. Seit Juni 2026 erhalten unsere Artikel nach und nach Abschnitte „Öffentliche Daten“, die Erzählung und Rohdaten verbinden.',
        stat: '1.100+ Artikel · 15 Datenverweise aktiv',
      },
    ],
  },
  assessment: {
    title: 'Bewertung in drei Dimensionen: was unsere Praxistests ergaben',
    lead: 'Es folgt die Bewertung von Taiwan.md aus erster Hand als Nutzer, durchgeführt mit unseren eigenen Prüfwerkzeugen (zwei Testrunden, Mai und Juni 2026) und entlang dreier Dimensionen dargestellt. Das ist keine Werbung, sondern ein Check-up.',
    gapsLabel: 'Ehrliche Lücken',
    dims: [
      {
        name: 'Vollständigkeit der Daten',
        verdict:
          'Die Abdeckung ist real und geht über ein bloßes Spiegeln hinaus',
      },
      {
        name: 'Stabilität',
        verdict: 'Typisch Alpha: läuft schnell und ändert sich schnell',
      },
      {
        name: 'Zugriffsvereinfachung',
        verdict: 'Das ist seine stärkste Seite',
      },
    ],
  },
  verticals: {
    title: 'Fünf Fachkorpora: der Teil jenseits des Spiegelns',
    lead: 'Datensätze in eine Suchoberfläche zu verpacken ist nichts Besonderes; diese fünf Fachbereiche ergänzen semantisches Retrieval und strukturierte Extraktion — der Teil des Twinkle Hub, der über einen „Spiegel von data.gov.tw“ hinausgeht.',
    logNote:
      'Die Größenbalken nutzen eine logarithmische Skala: Der Urteilskorpus ist 17-mal so groß wie die Arzneimittelzulassungen, und eine lineare Darstellung würde die übrigen vier Balken bis zur Unsichtbarkeit stauchen.',
    items: [
      {
        name: 'Patente',
        stat: 'Veröffentlichte Erfindungspatente des TIPO im Volltext',
        desc: 'Abfragen in natürlicher Sprache über den Patentkorpus, mit abrufbaren technischen Beschreibungen und Ansprüchen. Beim Schreiben über Taiwans Industrien lässt sich die Frage „besitzt dieses Unternehmen diese Technologie wirklich?“ erstmals per semantischer Suche überprüfen.',
      },
      {
        name: 'Staatsprüfungen',
        stat: '64.815 Prüfungen · 320.000 Aufgaben (2012–2025)',
        desc: 'Prüfungen des Prüfungsministeriums über die Jahre, bis auf Aufgabenebene durchsuchbar. Taiwans Kultur der Beamtenprüfungen — das Streben nach dem öffentlichen Dienst, die Straßen voller Paukschulen — ist eine Geschichte, die noch niemand mit Daten erzählt hat.',
      },
      {
        name: 'Gerichtsurteile',
        stat: 'rund 1,24 Millionen Datensätze (2024-05 bis 2026-03, Alpha)',
        desc: 'Retrieval über den Urteilskorpus in einfacher Sprache. Für Artikel über Justiz, Arbeitsstreitigkeiten und Mietkonflikte hat die Frage „wie Gerichte in der Praxis entscheiden“ nun einen überprüfbaren Einstieg.',
      },
      {
        name: 'Arzneimittel und Gesundheit',
        stat: '71.836 Arzneimittelzulassungen · 96.803 chinesische ICD-10-Codes',
        desc: 'Arzneimittelzulassungen, strukturierte Felder der Packungsbeilagen, Zertifizierungen für Gesundheitsprodukte und eine erste Wechselwirkungsprüfung. Die Faktenebene für Artikel über die Nationale Krankenversicherung und Medizin.',
      },
      {
        name: 'Lebensmittelnährwerte',
        stat: '226.825 Nährwert-Analysezeilen',
        desc: 'Die Nährwertdatenbank des Ministeriums für Gesundheit und Wohlfahrt: über zwanzig Nährstoffe pro Zutat, nach Nährstoff sortierbar und pro Mahlzeit summierbar. Die Zahlenbasis für Artikel über Nachtmärkte und Essen.',
      },
    ],
  },
  domains: {
    title: 'Zwanzig Datenbereiche × die Geschichtenkarte von Taiwan.md',
    lead: 'Links die Bereichskategorien des Twinkle Hub (aus dem Crawl), rechts unsere Kuratierungszuordnung: mit welchen Artikeln dieser Insel die Daten jedes Bereichs verbunden sind. Bei Bereichen mit dem Vermerk „Geschichte noch nicht geschrieben“ sind die zentralen Datensätze und Analysewege vollständig kuratiert, der Artikel aber fehlt noch: Das ist unsere Entwicklungskarte und zugleich eine offene Einladung an alle, die ihn schreiben möchten.',
    questionsLabel: 'Typische Fragen',
    articlesLabel: 'Verbundene Artikel',
    blankLabel: 'Geschichte noch nicht geschrieben',
    proposedStoryLabel: 'Die Geschichte, die daraus werden könnte',
    proposedHowLabel: 'So lässt es sich analysieren',
  },
  recipes: {
    title:
      'Analyse-Rezepte: welche Daten man nutzt und wie man sie kombiniert, um eine Sache zu verstehen',
    lead: 'Das ist das Herzstück der Seite. Jede Karte ist eine echte Analysefrage: welche Datensätze man nutzt, über welche Schlüssel man sie verbindet, mit welcher Methode man sie liest und welcher Artikel die Analyse bereits in eine Geschichte verwandelt hat.',
    combineLabel: 'So kombiniert man',
    methodLabel: 'So analysiert man am besten',
    articlesLabel: 'Bereits geschriebene Geschichten',
    items: [
      {
        question:
          'Wohngerechtigkeit: die billigen Wohnungen, die der Staat gebaut hat — wer hat am Ende daran verdient?',
      },
      {
        question:
          'Energiewende: Atomstrom fiel auf null und lief wieder an — was geschah in den Zahlen?',
      },
      {
        question:
          'Finanzen der Krankenversicherung: wer nutzt sie, wer zahlt ein, und wie viele Jahre trägt das System noch?',
      },
      {
        question:
          'Qualität der Demokratie: wie groß ist die Wählerschaft einer Wahl, und wie scharf wird verfolgt?',
      },
      {
        question:
          'Straßenökonomie: wie wurde die Wirtschaftsleistung von 230.000 Imbissständen tatsächlich berechnet?',
      },
      {
        question:
          'Verkehrssicherheit: was verbindet 14 Millionen Motorroller mit dreitausend Toten pro Jahr?',
      },
    ],
  },
  method: {
    title:
      'Verknüpfungsmethodik: die Schlüssel, die zwei Tabellen zusammenbringen',
    lead: 'Ein einzelner Datensatz ist ein Punkt; erst die Kombination ergibt ein Netz. Dies sind die nützlichsten Verknüpfungshinweise aus unseren Tests.',
    spectrum: {
      title:
        'Aktualisierungsfrequenz = Auflösung der Analyse: das Spektrum der fünfzehn Beispieldatensätze',
      left: '← Monatlich aktualisiert: Ereignisstudien möglich',
      right: 'Alle fünf Jahre: nur Vergleiche zwischen Zeiträumen →',
      note: 'Jeder Punkt ist ein auf dieser Seite zitierter Datensatz; fahren Sie darüber, um den Namen zu sehen. Prüfen Sie vor dem Entwurf einer Analyse, an welchem Ende des Spektrums Ihre Daten liegen.',
    },
    items: [
      { name: 'Verwaltungsgebietsschlüssel' },
      { name: 'Unternehmensnummern' },
      { name: 'Koordinaten und Stationscodes' },
      { name: 'Qualitätsstufen' },
      { name: 'Aktualisierungsfrequenz ist Analyseauflösung' },
      { name: 'Das Prinzip des doppelten Verweises' },
    ],
  },
  tools: {
    title: 'Werkzeugkatalog: die vollständige Liste der 21 Werkzeuge',
    lead: 'Direkt vom MCP-Endpunkt gelesen (der letzte erfolgreiche Crawl ist am Seitenende vermerkt). Die Gruppierung stammt von uns.',
    groups: [
      { label: 'Kern-Quartett für Datensätze + Bereichsindex' },
      { label: 'Patente' },
      { label: 'Staatsprüfungen' },
      { label: 'Gerichtsurteile' },
      { label: 'Arzneimittel und medizinische Codes' },
      { label: 'Lebensmittelnährwerte' },
    ],
  },
  footer: {
    crawledLabel:
      'Die Werkzeug- und Bereichslisten dieser Seite wurden zuletzt erfolgreich abgerufen am',
    note: 'Der Twinkle Hub befindet sich in der Alpha-Phase, und die Bewertung auf dieser Seite wird mit seiner Entwicklung aktualisiert. Taiwan.md unterhält derzeit keinerlei kommerzielle Beziehung zum Twinkle Hub; diese Seite ist der Check-up eines intensiven Nutzers aus erster Hand — und eine Einladung: Nur wenn Datenebene und Sinnebene zusammenarbeiten, wird Taiwan vollständig verstanden.',
    pilotTitle: 'Artikel, die bereits an die Datenebene angeschlossen sind',
    pilotLead:
      'Seit Juni 2026 ergänzen wir am Ende der Artikel einen Abschnitt „Öffentliche Daten“: Er listet die Datensätze auf, die die Aussagen des Artikels bestätigen (oder widerlegen) könnten, jeweils mit einer Zeile dazu, warum der Verweis dort steht. Die erste Gruppe umfasst sechs Artikel:',
  },
};
