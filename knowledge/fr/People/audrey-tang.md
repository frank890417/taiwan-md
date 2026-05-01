---
title: 'Audrey Tang'
description: "Déscolarisée à 8 ans pour apprendre la programmation en autodidacte, première ministre transgenre au monde, elle redéfinit la démocratie numérique par l'esprit du logiciel libre"
date: 2026-03-21
tags:
  [
    Personnalité,
    Audrey Tang,
    Ministère du Développement numérique,
    g0v,
    Transgenre,
    Programmation,
    Gouvernement ouvert,
    vTaiwan,
  ]
subcategory: '教育與社會'
lastVerified: 2026-03-21
lastHumanReview: true
featured: true
lifeTree:
  protagonist: 'Audrey Tang (唐鳳)'
  birthYear: 1981
  span: '1981–2024'
  source:
    article: 'knowledge/People/唐鳳.md'
    commit: 'bd58e088'
    commitDate: '2026-03-21'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: '原文 references = 臺灣女人 / 維基 / 數位發展部官網。多數重大轉折由本人公開談過，counterfactual 主要為結構性對比。'
  intro: "Déscolarisée à 8 ans, elle refuse l'admission au lycée Jianzhong à 14 ans, devient ingénieure à la Silicon Valley à 19 ans, fait son coming out transgenre à 24 ans et devient la première ministre transgenre au monde à 35 ans. Chaque fois qu'elle « quitte la voie principale », ce n'est pas par rébellion mais par choix. Cet arbre retrace les chemins qu'elle a empruntés, mais aussi ceux qu'elle n'a pas pris — chaque alternative est accompagnée d'un contraste structurel avec ses contemporains."
  themes:
    - id: education
      label: 'Système scolaire vs autodidaxie'
      color: '#8B5CF6'
    - id: identity
      label: 'Invisibilité vs coming out'
      color: '#EC4899'
    - id: tech-policy
      label: 'Technique pure vs engagement politique'
      color: '#10B981'
    - id: tools
      label: 'Individu vs collaboration communautaire'
      color: '#F59E0B'
  nodes:
    - id: birth
      year: 1981
      age: 0
      type: given
      theme: education
      label: "Née à Taipei (nom d'origine : Tang Zonghan)"
      scene: "QI supérieur à 180, surnommée « le génie informatique de Taïwan ». Sa mère, Li Yaqing, est une réformatrice de l'éducation."
    - id: drop-out-8
      year: 1989
      age: 8
      type: choice
      theme: education
      scene: "En 9 ans, elle change 3 fois de maternelle et 6 fois d'école primaire, avec de grandes difficultés d'adaptation"
      chose:
        label: "Arrêt officiel de la scolarité pour l'éducation à domicile"
        consequence: "Sa mère Li Yaqing l'emmène en Allemagne découvrir des pédagogies alternatives et étudier en profondeur les méthodes d'éducation expérimentale. La famille paie un lourd tribut pour ce choix."
      alternatives:
        - label: "Continuer à s'adapter au système scolaire"
          plausibility: structural
          note: "La plupart des enfants à haut QI mais en difficulté sociale de sa génération sont diagnostiqués Asperger/TDAH et continuent de lutter dans le système. Si elle était restée à l'école, elle aurait peut-être suivi une voie éditoriale ou académique (ou aurait pu s'épuiser plus tôt)."
        - label: 'Intégrer un programme pour élèves à haut potentiel'
          plausibility: structural
          note: "À la fin des années 1980, Taïwan disposait déjà de classes pour élèves à haut potentiel. Si elle avait suivi cette voie, elle aurait été façonnée par le système avec d'autres enfants à haut QI, perdant le temps d'exploration totalement libre."
    - id: refuse-jianzhong
      year: 1995
      age: 14
      type: choice
      theme: education
      scene: 'Obtient une admission directe au lycée Jianzhong'
      chose:
        label: 'Renonce au lycée Jianzhong + apprend entièrement la programmation en autodidacte'
        consequence: "Cela fait sensation dans la taïwanaise des années 1990 — quitter volontairement le système scolaire d'élite. Sans professeur ni programme, elle apprend en lisant des documents techniques et en participant à des communautés en ligne. Cette expérience pose les bases philosophiques de son engagement ultérieur pour l'éducation ouverte et le partage des savoirs."
      alternatives:
        - label: "Faire Jianzhong puis suivre le parcours taïwanais d'élite"
          plausibility: structural
          note: "Le parcours classique : Jianzhong → université nationale de Taïwan → université prestigieuse à l'étranger. Si elle l'avait suivi, elle aurait eu des diplômes officiels, mais aurait perdu la période formatrice où, « à 14 ans, elle dialoguait déjà avec des ingénieurs du monde entier sur Internet »."
        - label: "Partir étudier au lycée à l'étranger"
          plausibility: structural
          note: "Certaines familles de petits génies de sa génération choisissent un départ précoce à l'étranger (par ex. admission précoce au MIT). Si elle avait suivi cette voie, elle aurait pu accéder plus tôt à l'informatique de classe mondiale, mais la branche technologie civique g0v n'aurait probablement pas vu le jour à Taïwan."
    - id: silicon-valley
      year: 2000
      age: 19
      type: choice
      theme: tech-policy
      scene: 'À 19 ans, elle est déjà ingénieure dans une entreprise de logiciels à la Silicon Valley en Californie'
      chose:
        label: 'Se spécialise dans la théorie des langages de programmation (Perl/Haskell) + lance le projet Pugs'
        consequence: "Pugs est une tentative majeure d'implémenter Perl 6 en Haskell. Elle apporte une contribution fondamentale à la communauté Perl. « Implémenter un langage dans un autre langage » développe sa pensée méta — elle regardera plus tard le gouvernement comme un système à refactoriser."
      alternatives:
        - label: 'Rejoindre Google / une grande entreprise technologique'
          plausibility: structural
          note: "Le parcours dominant à la Silicon Valley dans les années 2000. Si elle l'avait suivi, elle aurait eu un salaire plus élevé et des stock-options, mais aurait perdu le temps d'immersion dans la communauté open source. L'ADN « pas des employés, une communauté » de g0v n'aurait pas existé."
        - label: 'Créer une start-up'
          plausibility: structural
          note: "Beaucoup d'ingénieurs de la Silicon Valley de sa génération choisissent l'entrepreneuriat (première promotion de YC en 2005). Si elle avait suivi cette voie, elle serait peut-être devenue une serial entrepreneur, mais la tendance à « coder pour l'intérêt public » aurait été recouverte par « coder pour les actionnaires »."
    - id: gender-transition
      year: 2005
      age: 24
      type: choice
      theme: identity
      scene: "L'une des décisions les plus importantes de sa vie"
      chose:
        label: 'Subit une chirurgie de réassignation sexuelle + coming out public + change de nom pour « Audrey Tang »'
        consequence: "Elle choisit le prénom anglais Audrey. « Je suis certaine d'être une femme » (CommonWealth Magazine). Sa famille lui accorde compréhension et soutien. Elle apporte une contribution majeure au mouvement pour les droits LGBTQ+ à Taïwan. Condition préalable à devenir la première ministre transgenre au monde."
      alternatives:
        - label: 'Transitionner en privé sans se dévoiler publiquement'
          plausibility: structural
          note: "Certaines personnes transgenres choisissent une transition discrète pour éviter la pression sociale. Si elle avait suivi cette voie, sa carrière aurait peut-être été plus fluide, mais la place historique de « première ministre transgenre publiquement identifiée au monde » n'existerait pas."
        - label: 'Ne pas transitionner'
          plausibility: speculative
          note: "[Spéculation] Certaines personnes transgenres de sa génération choisissent de reporter ou d'abandonner leur transition en raison de la pression sociale. Si elle avait suivi cette voie, la tension intérieure aurait pu affecter sa créativité et sa visibilité publique ultérieures."
    - id: g0v-2012
      year: 2012
      age: 31
      type: choice
      theme: tools
      scene: 'Elle est déjà une ingénieure open source reconnue à la Silicon Valley'
      chose:
        label: 'Fonde g0v (gouvernement zéro) avec des partenaires'
        consequence: "La communauté de technologie civique la plus importante de Taïwan. « Hack don't attack » — ne pas attaquer les institutions existantes, mais les améliorer par la technologie. Visualisation du budget central, IVOD, MoeDict, etc. Le modèle sera ensuite reproduit dans le monde entier."
      alternatives:
        - label: 'Rester à la Silicon Valley en tant que pure technicienne'
          plausibility: structural
          note: "À cette époque, la Silicon Valley lui ouvre déjà divers postes seniors. Si elle était restée, elle serait « une autre ingénieure taïwanaise à succès », sans l'influence politique qui a suivi."
        - label: 'Revenir à Taïwan pour rejoindre un parti politique/un think tank existant'
          plausibility: structural
          note: "Suivre le chemin traditionnel de participation politique. Si elle l'avait suivi, elle aurait été absorbée par la machine partisane, et la possibilité d'être « ministre sans étiquette politique » aurait disparu."
    - id: vtaiwan
      year: 2014
      age: 33
      type: choice
      theme: tech-policy
      scene: "Occasion de conseillère pour le projet d'adaptation réglementaire du monde virtuel du Yuan exécutif"
      chose:
        label: 'Collabore avec le gouvernement sur vTaiwan + le moteur de consensus Pol.is'
        consequence: "La discussion sur la réglementation d'Uber en devient le cas le plus célèbre. Grâce à la visualisation massive des opinions, le système identifie consensus et divergences. Fournit une référence importante pour l'élaboration de la réglementation de l'économie du partage à Taïwan. Reconnu internationalement comme un modèle de démocratie numérique."
      alternatives:
        - label: 'Refuser de collaborer avec le gouvernement'
          plausibility: structural
          note: "Certains acteurs de la technologie civique maintiennent une distance volontaire avec le gouvernement (approche EFF). Si cela avait été le cas, g0v serait resté une initiative purement civile, sans être « récupéré » par l'institution, mais aurait aussi perdu sa capacité de mise en œuvre concrète des politiques."
    - id: digital-minister
      year: 2016
      age: 35
      type: choice
      theme: tech-policy
      scene: 'Lin Chuan la nomme ministre à 35 ans'
      chose:
        label: 'Entre au gouvernement en tant que « ministre du numérique »'
        consequence: "La plus jeune ministre de l'histoire de Taïwan + la première personnalité ministérielle transgenre publiquement identifiée au monde + la première « ministre du numérique » de Taïwan. Propose des innovations dans les méthodes de travail : télétravail, procès-verbaux publics des réunions, collaboration plutôt que commandement."
      alternatives:
        - label: "Décliner l'entrée au gouvernement"
          plausibility: structural
          note: "D'autres techniciens outsiders du même type ont décliné (crainte d'être absorbés par le système). Si elle avait décliné, le travail de transformation numérique aurait perdu un lien crucial, et les cartes de masques ou d'autres outils pendant la pandémie auraient pu être retardés de plusieurs mois ou ne pas voir le jour."
    - id: covid-mask-map
      year: 2020
      age: 39
      type: choice
      theme: tools
      scene: 'Début de la pandémie de COVID-19'
      chose:
        label: 'Dirige le développement de la carte des masques + le système de rendez-vous vaccinal'
        consequence: "La carte des masques atteint 1 million de consultations en 24 heures. Le système vaccinal passe de 100 000 à 1 million de rendez-vous traités par jour. L'expérience taïwanaise de lutte numérique contre la pandémie est hautement saluée à l'international."
      alternatives:
        - label: 'Se limiter à la politique sans développer les outils'
          plausibility: structural
          note: "Le parcours normal d'un chef de ministère : réunions, définition des politiques, sous-traitance. Si cela avait été le cas, la carte des masques aurait pu devenir une application officielle livrée en 6 semaines (la réalité dans de nombreux pays). Son implication directe avec la communauté g0v pour un déploiement en deux jours a été déterminante."
    - id: moda-minister
      year: 2022
      month: 8
      age: 41
      type: choice
      theme: tech-policy
      scene: 'Création officielle du Ministère du Développement numérique'
      chose:
        label: 'Devient la première ministre'
        consequence: "Passage d'une ministre coordinatrice interministérielle à une ministre à part entière avec budget et effectifs fixes. Intègre télécommunications, cybersécurité, économie numérique. Pousse la résilience numérique, la transformation numérique et les droits numériques. Mandat jusqu'au 20 mai 2024."
      alternatives:
        - label: 'Rester ministre coordinatrice sans devenir ministre de plein exercice'
          plausibility: structural
          note: "Conserver la flexibilité de la « liberté interministérielle », éviter d'être une cible fixe aux questions parlementaires. Mais perdre la capacité d'exécution d'un « ministère officiel + budget + effectifs »."
        - label: 'Revenir dans la société civile pour continuer g0v'
          plausibility: structural
          note: "Une autre voie : continuer à influencer les politiques en tant qu'ONG. Si elle l'avait suivie, la première ministre du Ministère du Développement numérique aurait été quelqu'un d'autre, probablement avec une gestion plus bureaucratique traditionnelle."
translatedFrom: 'People/唐鳳.md'
---

# Audrey Tang

> **En 30 secondes :** Née en 1981, Audrey Tang commence à apprendre la programmation en autodidacte à 8 ans, subit une chirurgie de réassignation sexuelle à 24 ans en 2005, fonde g0v (gouvernement zéro) en 2012, et devient en 2016, à 35 ans, la première personnalité ministérielle transgenre au monde. Avec l'esprit du logiciel libre « hack don't attack », elle introduit les outils numériques au sein du gouvernement, faisant de Taïwan un modèle mondial de gouvernement ouvert.

Le 1er octobre 2016, Audrey Tang, 35 ans, entre au Yuan exécutif et devient la plus jeune ministre de l'histoire de Taïwan, ainsi que la première personnalité ministérielle transgenre publiquement identifiée au monde. Mais sa véritable percée ne réside pas dans son identité — elle réside dans sa pensée : repenser la participation démocratique avec la logique du code informatique.

De l'enfant prodige déscolarisée à 8 ans pour apprendre la programmation en autodidacte, à la ministre qui a piloté la transformation numérique de Taïwan, le parcours d'Audrey Tang illustre la capacité d'inclusion de la taïwanaise et préfigure de nouvelles formes de participation politique à l'ère numérique.

## Déscolarisée à 8 ans, déscolarisée à 14 ans : le parcours autodidacte

Née le **18 avril 1981** (nom d'origine : Tang Zonghan), Audrey Tang manifeste dès son plus jeune âge des traits distinctifs par rapport aux enfants de son âge. Selon un reportage de la chaîne EBC, son QI dépasse 180 et elle est surnommée « le génie informatique de Taïwan », mais un haut QI ne rend pas son parcours scolaire plus facile.

**Une vie scolaire difficile** la conduit à changer 3 fois de maternelle et 6 fois d'école primaire en 9 ans. À 8 ans, elle cesse officiellement d'aller à l'école pour être éduquée à domicile. Sa mère, Li Yaqing, est une réformatrice de l'éducation qui emmène même son enfant en Allemagne découvrir des pédagogies alternatives et étudier en profondeur les méthodes d'éducation expérimentale.

À 14 ans, Audrey Tang obtient une admission directe au lycée Jianzhong, mais prend une décision surprenante : renoncer à l'éducation scolaire traditionnelle pour choisir l'autodidaxie complète. Cela fait sensation dans la taïwanaise des années 1990 — un petit génie quittant volontairement le système scolaire d'élite.

**L'initiation à la programmation** commence aussi à 14 ans. Sans professeur ni programme, elle apprend entièrement en lisant des documents techniques et en participant à des communautés en ligne. Cette expérience d'appautodidacte pose les bases philosophiques de son engagement ultérieur pour l'éducation ouverte et le partage des savoirs.

## Ingénieure à la Silicon Valley à 19 ans, coming out transgenre à 24 ans

En **2000**, Tang Zonghan, 19 ans, est déjà ingénieure dans une entreprise de logiciels à la Silicon Valley en Californie. Elle fait preuve d'un talent remarquable dans le domaine des langages de programmation, notamment pour Perl et Haskell.

Elle lance le **projet Pugs** — une tentative majeure d'implémenter Perl 6 en langage Haskell. Bien que ce projet ait stagné en 2006, il apporte une contribution fondamentale à la communauté Perl. Ce défi technique, « implémenter un langage dans un autre langage », révèle sa maîtrise approfondie de la théorie des langages de programmation.

À la **fin de l'année 2005**, à 24 ans, elle prend l'une des décisions les plus importantes de sa vie : subir une chirurgie de réassignation sexuelle, annoncer publiquement son identité transgenre et changer son nom de « Tang Zonghan » à « Audrey Tang », choisissant le prénom anglais Audrey. Dans une interview accordée au magazine CommonWealth, elle déclare : « Je suis certaine d'être une femme. »

Cette décision a une valeur exemplaire importante dans la taïwanaise de l'époque. Par son action, elle prouve que les personnes transgenres peuvent aussi jouer un rôle important dans le domaine professionnel, apportant une contribution majeure au mouvement pour les droits LGBTQ+ à Taïwan. Sa famille lui accorde heureusement compréhension et soutien.

## g0v — Gouvernement zéro : hack don't attack

En **2012**, Audrey Tang fonde g0v (prononcé « gov zero ») avec quelques amis partageant les mêmes idées — la communauté de technologie civique la plus importante de Taïwan. Ce nom provient de la modification du domaine gouvernemental « gov » en « g0v », symbolisant la réimagination du gouvernement dans le langage numérique de 0 et 1.

Le concept central de g0v est **« hack don't attack »** — ne pas attaquer les institutions existantes, mais les améliorer par la technologie. Ce concept reflète un esprit d'engagement civique constructif : promouvoir le progrès social par la pratique, et non par la simple critique.

**Les projets importants incluent :**

- **Visualisation du budget central** : transformation d'épais budgets incompréhensibles en graphiques interactifs
- **Cinéma du Yuan législatif (IVOD)** : organisation des vidéos des sessions parlementaires pour permettre au public de trouver rapidement les discussions sur des sujets spécifiques
- **MoeDict** : plateforme de dictionnaire chinois ouvert, à laquelle Audrey Tang participe personnellement au développement

Le succès de g0v attire l'attention internationale et en fait un cas majeur du mouvement mondial de technologie civique. Des communautés de technologie civique du monde entier viennent à Taïwan pour apprendre l'expérience de g0v, et le modèle est reproduit dans d'autres pays.

## vTaiwan : une expérience innovante de démocratie numérique

Entre **2014 et 2015**, Audrey Tang est conseillère pour le projet d'adaptation réglementaire du monde virtuel du Yuan exécutif (plateforme vTaiwan), marquant le début de sa collaboration avec le gouvernement.

La plateforme vTaiwan traite les questions réglementaires liées à l'économie numérique, en utilisant des mécanismes innovants de participation numérique. La plateforme utilise la technologie d'agrégation d'opinions Pol.is, capable d'analyser et de visualiser de grandes quantités d'opinions pour identifier consensus et divergences.

**Le cas de succès le plus célèbre est la discussion sur la réglementation d'Uber.** Grâce au mécanisme de dialogue de la plateforme, le gouvernement, les opérateurs, les chauffeurs, les passagers et les autres parties atteignent un certain degré de consensus, fournissant une référence importante pour l'élaboration de la réglementation de l'économie du partage à Taïwan.

L'approche innovante de vTaiwan est reconnue internationalement comme un modèle de démocratie numérique, et de nombreux pays envoient des représentants à Taïwan pour en apprendre l'expérience.

## Entrée au gouvernement à 35 ans : première ministre transgenre au monde

Le **1er octobre 2016**, le Premier ministre Lin Chuan nomme Audrey Tang, 35 ans, ministre. Elle devient :

- La plus jeune ministre de l'histoire de Taïwan
- La première personnalité ministérielle transgenre publiquement identifiée au monde
- La première « ministre du numérique » de Taïwan

Contrairement aux politiciens traditionnels, Audrey Tang n'a aucune affiliation politique et entre au gouvernement grâce à son expertise technique et son expérience d'engagement social. Sa nomination témoigne de l'importance accordée par le gouvernement Tsai Ing-wen à la diversité des talents.

**Les innovations dans ses méthodes de travail incluent :**

- **Le télétravail** : pas de bureau fixe, travail en mobilité (mis en œuvre avant la pandémie de COVID-19)
- **La transparence** : procès-verbaux publics de toutes les réunions de travail (sauf secrets d'État ou vie privée)
- **La culture collaborative** : accent sur la collaboration plutôt que le commandement, partenariats avec les différents ministères

## Performance exceptionnelle dans la lutte numérique contre la COVID-19

**Pendant la pandémie**, Audrey Tang fait preuve d'une remarquable capacité de gestion de crise, pilotant le développement de plusieurs outils numériques de lutte contre l'épidémie :

La **carte des masques** est l'outil numérique le plus populaire au début de la pandémie. Ce système permet au public de consulter en temps réel les stocks de masques dans les pharmacies, améliorant considérablement l'efficacité de la distribution. Le système enregistre plus d'un million de consultations dans les 24 heures suivant sa mise en ligne.

Le **système de rendez-vous vaccinal** permet au public de prendre facilement rendez-vous pour la vaccination et est hautement salué. La capacité de traitement du système passe de 100 000 à 1 million de rendez-vous par jour, plaçant l'efficacité de la vaccination à Taïwan en tête au monde.

L'expérience taïwanaise de lutte numérique contre la pandémie est hautement saluée à l'international, et Audrey Tang gagne en visibilité sur la scène internationale.

## Première ministre du Ministère du Développement numérique

Le **27 août 2022**, le Ministère du Développement numérique est officiellement créé, et Audrey Tang est nommée première ministre, avec un mandat jusqu'au 20 mai 2024. C'est une étape historique dans l'organisation gouvernementale de Taïwan, marquant le passage de la gouvernance numérique de la phase expérimentale à la phase institutionnelle.

Le Ministère du Développement numérique intègre les fonctions numériques auparavant dispersées entre plusieurs ministères, couvrant les télécommunications, la cybersécurité, l'économie numérique, etc., établissant ainsi une architecture de gouvernance numérique plus complète.

**Les politiques importantes promues sous sa direction :**

- **Construction de la résilience numérique** : renforcement de la sécurité de l'information et de la protection des infrastructures critiques
- **Accélération de la transformation numérique** : aide aux entreprises et organisations pour renforcer leurs capacités numériques
- **Protection des droits numériques** : promotion de la protection de la vie privée et de l'égalité numérique

## Une philosophie politique : l'anarchisme conservateur

Audrey Tang se décrit elle-même comme « anarchiste conservateur ». Ce concept apparemment contradictoire reflète sa philosophie politique unique : croire que le meilleur gouvernement est celui qui intervient le moins, tout en maintenant de manière conservatrice les bonnes institutions existantes.

Elle est profondément influencée par le concept **« Code is Law »** (le code est la loi), estimant qu'à l'ère numérique, le code informatique régule le comportement des gens comme la loi. Par conséquent, le processus d'écriture du code devrait aussi être démocratique et transparent.

**Ses convictions fondamentales :**

- **Neutralité technologique** : la technologie elle-même doit rester neutre et servir tout le monde
- **Conception participative** : toute politique affectant le public devrait être conçue avec la participation du public
- **Gouvernance décentralisée** : le pouvoir devrait être dispersé autant que possible pour permettre à davantage de personnes de participer aux décisions

## Influence internationale et reconnaissance mondiale

Le modèle de gouvernance innovant d'Audrey Tang est hautement salué à l'international :

- En **2019**, elle est sélectionnée parmi les « 100 penseurs mondiaux » du magazine _Foreign Policy_
- Choisie par le magazine _Time_ comme innovatrice numérique
- Ancienne Jeune Leader mondiale du Forum économique mondial

Sa conférence TED _How digital innovation can fight pandemics and strengthening democracy_ présente l'expérience de gouvernance numérique de Taïwan au monde entier. De nombreux gouvernements envoient des représentants à Taïwan pour étudier le modèle de gouvernance numérique qu'elle a promu.

## Impact profond sur la taïwanaise

**Changement de la culture politique :** Les méthodes de travail ouvertes et transparentes d'Audrey Tang ont établi de nouvelles normes pour la culture politique taïwanaise, poussant l'ensemble du système gouvernemental vers plus de transparence.

**Construction d'une société numérique :** En promouvant l'ouverture des données et le développement de la technologie civique, elle a contribué à élever le niveau global de littératie numérique de la taïwanaise.

**Pratiquation des valeurs de diversité :** Son identité transgenre et son parcours non conventionnel ont établi un exemple important pour la pratique des valeurs de diversité dans la taïwanaise.

**Influence sur la philosophie éducative :** Son cas de succès en autodidaxie soutient le développement d'éducations alternatives, encourageant davantage de parents et d'élèves à oser choisir des parcours éducatifs non conventionnels.

---

L'histoire d'Audrey Tang est une légende moderne de courage, d'innovation et d'inclusion. De l'enfant prodige déscolarisée à 8 ans à la pionnière mondiale de la gouvernance numérique, elle montre par son expérience les possibilités d'une société pluraliste.

Elle n'a pas seulement transformé la culture politique et l'environnement numérique de Taïwan, elle a aussi montré au monde entier comment utiliser la technologie pour promouvoir la démocratie et faire avancer le progrès social. Dans le grand courant de l'ère numérique, les idées et les pratiques d'Audrey Tang continueront de montrer la voie, inspirant davantage de personnes à construire ensemble une meilleure société numérique avec une pensée innovante et un esprit d'inclusion.

---

**Pour aller plus loin :**

- [Wu Ta-You](/people/吳大猷) — De la science à la technologie, l'héritage de l'élite intellectuelle taïwanaise ; Wu Ta-You a posé les fondations du système de recherche scientifique de Taïwan en tant que président de l'Académie sinique
- [Shang Shang-Nong](/people/蕭上農) — Cofondateur d'INSIDE et de iCook, défini lui-même par sa capacité à « traverser plusieurs domaines » dans l'écosystème technologique taïwan

## Références

- [Femmes de Taïwan — Première ministre transgenre de Taïwan, première ministre du numérique — Audrey Tang](https://women.nmth.gov.tw/?p=20105)
- [Wikipédia — Audrey Tang](https://zh.wikipedia.org/zh-hant/%E5%94%90%E9%B3%B3)
- [Ministère du Développement numérique — Ministres successifs](https://moda.gov.tw/aboutus/ministers-since-2022/1527)
