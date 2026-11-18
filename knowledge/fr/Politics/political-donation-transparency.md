---
title: "Transparence des dons politiques : plateforme du Yuan de contrôle, visualisation g0v, 22 ans d'infrastructure de publication"
description: "Ouvrez la plateforme publique de consultation des dons politiques du Yuan de contrôle, saisissez le nom de n'importe quel candidat, et vous pouvez voir de qui il a reçu combien d'argent et sur quelles activités de campagne il l'a dépensé. Cette infrastructure n'est pas tombée du ciel — elle a été construite article par article de loi, rapport par rapport comptable, ingénieur citoyen par ingénieur citoyen : la loi sur les dons politiques de 2004, la mise en ligne de la plateforme en 2008, l'accord de publication des données entre la Commission électorale centrale et le Yuan de contrôle en 2017, et dix ans de visualisation complémentaire par les ingénieurs de g0v."
date: 2026-05-27
author: 'Taiwan.md'
category: 'Politics'
subcategory: '公民監督'
tags:
  ['政治獻金', '透明度', '監察院', 'g0v', '選舉金流', '2004立法', '2026選舉']
readingTime: 12
lastVerified: 2026-05-27
lastHumanReview: false
featured: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Politics/政治獻金透明度.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:8a7814971a9249c7'
sourceBodyHash: 'sha256:214c403ec0d7137c'
translatedAt: '2026-07-11T00:35:00+08:00'
---

# Transparence des dons politiques : quand l'infrastructure démocratique devient un fichier CSV téléchargeable

> **En 30 secondes :** un week-end de 2014, un ingénieur de g0v, dans un espace de hackathon situé sur Qingdao East Road à Taipei, ouvrait les rapports sur les dons politiques du Yuan de contrôle. Il ne voulait pas grand-chose — savoir quelles entreprises avaient financé les candidats aux législatives précédentes et pour quels montants. Mais les fichiers téléchargés étaient des PDF. Pas des tableaux, pas des CSV, pas du JSON — des PDF scannés. Il posa son café, ouvrit son terminal et commença à écrire la première ligne du script d'extraction. Dix ans plus tard, Taïwan disposait du système de visualisation « flux financiers électoraux » — non pas créé par le gouvernement, mais complété par des ingénieurs citoyens. Mais la place qu'ils ont comblée n'était pas vide : en dessous se trouvaient une loi votée en 2004, une plateforme mise en ligne en 2008, des rapports comptables téléversés légalement au Yuan de contrôle. Cet article parle de cette place — la transparence des dons politiques, la pièce la plus technique, la plus souvent ignorée et pourtant la plus concrète de l'infrastructure démocratique taïwanaise depuis 22 ans.

---

## Pourquoi commencer par les PDF

Le citoyen ordinaire ne va pas consulter les dons politiques. C'est un fait.

Ouvrir la plateforme publique de consultation des dons politiques du Yuan de contrôle[^1], saisir le nom d'un candidat, télécharger les rapports — cette série d'actions ne fait pas partie du quotidien de la majorité des électeurs. Le jour de l'élection, aller voter le matin, rentrer chez soi et regarder les résultats en direct, voilà l'expérience dominante de la participation démocratique.

Mais **la valeur d'une infrastructure de transparence ne réside pas dans le nombre de personnes qui l'utilisent, mais dans son existence même**.

Lorsqu'un journaliste d'investigation veut suivre un flux financier — la plateforme est là.
Lorsqu'un candidat législatif veut savoir quelles entreprises ont financé le législateur sortant — la plateforme est là.
Lorsqu'un ingénieur de g0v veut créer une visualisation pour rendre les données plus lisibles — les données brutes sont là.
Lorsqu'un chercheur veut étudier la structure de la politique de l'argent — vingt ans de données cumulées sont là.

Quand la plateforme n'existait pas, toutes ces questions étaient impossibles. Quand elle existe, la qualité démocratique a un seuil vérifiable.

C'est pourquoi, au moment de l'adoption de la loi sur les dons politiques en 2004[^2], ce n'est pas un parti qui a gagné — c'est l'infrastructure démocratique taïwanaise qui a développé un organe supplémentaire.

---

## 2004 : l'année d'un consensus rare entre les deux partis

Le 26 mars 2004, le Yuan législatif a adopté en troisième lecture la loi sur les dons politiques[^2].

Le climat politique de cette année-là était en réalité très tendu — l'attentat du 19 mars n'avait eu lieu que sept jours plus tôt, les résultats de l'élection présidentielle avaient provoqué une confrontation entre le camp bleu et le camp vert, et les manifestants devant l'avenue Ketagalan ne s'étaient pas encore dispersés. Mais c'est dans ce printemps de haute tension que la loi sur les dons politiques a été adoptée.

Pourquoi les deux partis ont-ils trouvé un consensus à ce moment-là ? La réponse se trouve dans l'histoire des dix années précédentes.

Depuis les années 1990, le terme « politique de l'argent » était presque un point douloureux pour les deux partis. Le Kuomintang était accusé de s'allier avec les factions locales et les capitalistes, le Parti démocrate progressiste était accusé de recevoir des financements de nouveaux entrepreneurs, et les candidats indépendants recevaient de l'argent sans que personne ne les contrôle. Après chaque élection, des scandales financiers éclataient sporadiquement, mais sans loi dédiée, sans obligation de divulgation, sans sanctions — les scandales passaient, l'opinion publique s'éteignait.

Ce n'est qu'après la première alternance politique en 2000 que le gouvernement de Chen Shui-bian a poussé à la législation. Bien que la majorité du Kuomintang au Yuan législatif s'opposât sur de nombreux sujets à l'exécutif, sur la question de « la transparence des dons politiques », **les deux partis ont pris conscience qu'ils avaient souffert de l'étiquette de politique de l'argent**. Le besoin d'une image d'intégrité l'emportait sur la commodité de l'opacité.

C'est dans ce contexte que la loi sur les dons politiques est née — non pas portée par un héros, non pas arrachée par un mouvement, mais issue de l'intersection d'un intérêt commun aux deux partis.

---

## L'ossature de la loi : qui peut recevoir, qui peut donner, les plafonds, comment déclarer

La loi sur les dons politiques n'est pas longue, mais son ossature est claire[^3].

**Article 5 : qui peut recevoir des dons politiques.** La loi définit trois catégories de « bénéficiaires de dons politiques » :

- Les candidats (enregistrés)
- Les partis politiques
- Les groupements politiques (légalement constitués)

Toute personne en dehors de ces trois catégories qui reçoit des dons politiques — c'est illégal. Un assistant législatif qui reçoit, un directeur de campagne qui reçoit par procuration, le conjoint d'un candidat qui reçoit — tout cela est interdit. La conception de la loi vise à canaliser les flux financiers vers le conduit des « entités déclarables », en réduisant les zones grises.

**Article 7 : qui peut donner.** La loi autorise trois catégories de donateurs :

- Les citoyens nationaux
- Les entreprises nationales
- Les organisations à but non lucratif nationales

**Sont interdits les suivants** :

- Les entreprises étrangères, les gouvernements étrangers, les personnes physiques étrangères
- Les personnes physiques, les personnes morales et les groupements de la région de la République populaire de Chine
- Les organismes gouvernementaux, les entreprises publiques
- Les personnes morales dans lesquelles l'État ou une entreprise publique détient plus de 20 % des parts
- Les contractants ayant un contrat en cours avec le gouvernement[^4]

La dernière règle — les contractants gouvernementaux ne peuvent pas donner — est conçue pour être le pare-feu le plus fondamental contre « l'échange de dons politiques contre des marchés publics ».

**Article 18 : plafonds de montant.** C'est la disposition la plus souvent discutée[^5] :

- Personne physique pour un même candidat : 100 000 NT$ par an
- Entreprise pour un même candidat : 1 000 000 NT$ par an [NEEDS-VERIFY]
- Personne physique pour un parti politique : 300 000 NT$ par an
- Entreprise pour un parti politique : 3 000 000 NT$ par an [NEEDS-VERIFY]

La logique du plafond est d'empêcher un donateur unique d'avoir une influence excessive sur un seul candidat — mais nous verrons plus loin comment cette logique est structurellement contournée par les « dons dispersés ».

**Article 20 : obligation de déclaration.** Les candidats doivent, dans un délai fixé après l'élection, déclarer au Yuan de contrôle le détail complet des recettes et dépenses de dons politiques — qui a donné combien, pour quels postes de dépenses, et le solde restant. Les données déclarées sont systématiquement téléversées dans le système de vérification des comptes spéciaux de dons politiques du Yuan de contrôle, servant de source de données pour la consultation publique ultérieure.

**Article 26 : sanctions.** Les contrevenants encourent des amendes de 1 à 5 fois le montant, et les cas graves constituent une responsabilité pénale — pouvant aller jusqu'à cinq ans d'emprisonnement au maximum[^6]. La conception des sanctions rend l'option « ne pas déclarer du tout » déraisonnable.

La loi est écrite — l'ossature est complète. Mais une ossature n'est pas un organe, un organe a besoin de chair et de sang. La chair et le sang, c'est la plateforme.

---

## 2008 : mise en ligne de la plateforme du Yuan de contrôle

L'élection présidentielle de 2008 — Ma Ying-jeou contre Hsieh Chang-ting — fut la première élection présidentielle taïwanaise « pleinement soumise à la loi sur les dons politiques et à l'obligation de déclaration »[^7] [NEEDS-VERIFY].

Cette année-là, la plateforme publique de consultation des dons politiques du Yuan de contrôle a été officiellement mise en ligne. URL : `https://ardata.cy.gov.tw/`[^1].

L'objectif de conception de la première version de la plateforme était simple : numériser les données papier déclarées par les candidats, les mettre en ligne et permettre la consultation publique. N'importe qui pouvait saisir le nom d'un candidat / d'un parti politique / d'un groupement politique et consulter le détail des recettes et dépenses déclarées à chaque élection — y compris le nom de chaque donateur, le montant et la catégorie d'utilisation.

C'est une conception rare en Asie. **Les données de la FEC (Federal Election Commission) américaine sont plus profondes — mais historiquement ouvertes seulement après l'élection**[^8]. Le Japon a aussi un mécanisme de divulgation après le renforcement de la loi sur la régulation des fonds politiques en 2007, mais la faille des « groupements politiques » permet aux flux financiers principaux de contourner[^9]. La Commission électorale centrale de Corée du Sud gère de manière centralisée, mais son interface est moins conviviale que celle de Taïwan[^10] [NEEDS-VERIFY].

Taïwan est en réalité en avance sur ce point — mais cette position d'avance ne résout pas le problème suivant.

**Le problème : l'interface est difficile à utiliser, les données ne sont pas structurées, le téléchargement par lots est impossible**.

En ouvrant la première version de la plateforme, il fallait cliquer sur les PDF un par un. Pour voir quelles entreprises ont financé un candidat — ouvrir le PDF 1. Pour voir le suivant — ouvrir le PDF 2. Pour faire une comparaison entre candidats — recopier soi-même les tableaux. Pour faire une analyse chronologique — organiser soi-même la chronologie. Pour voir si le même groupe a divisé ses dons en dizaines de prête-noms — il fallait comparer manuellement les adresses et les noms de famille.

C'est la scène à laquelle l'ingénieur de g0v de 2014 a été confronté en ouvrant les fichiers.

---

## 2014 : g0v commence à combler les lacunes avec « flux financiers électoraux »

g0v est la communauté taïwanaise de hackers citoyens[^11]. Le nom vient de « remplacer gov.tw par g0v.tw » — le gouvernement ne fait pas le travail de données ouvertes, la communauté le fait elle-même.

Lors d'un hackathon en 2014, plusieurs ingénieurs ont décidé de travailler sur le projet « flux financiers électoraux »[^12]. L'objectif était clair :

1. Extraire les rapports PDF du Yuan de contrôle
2. Les analyser en données structurées (CSV / JSON)
3. Créer une visualisation compréhensible
4. Open-sourcer tous les scripts d'extraction et d'analyse

La première étape a été un blocage — les PDF étaient scannés, pas de vrais PDF numériques. Le texte ne pouvait pas être copié directement. Il a fallu écrire un pipeline OCR, écrire la correction de format, écrire la comparaison de noms, écrire la déduplication d'entreprises.

Quelques mois plus tard, la première version de « flux financiers électoraux » a été mise en ligne[^12]. En ouvrant la page web, ce que vous voyez n'est pas un rapport — c'est un graphe de réseau.

- Les nœuds représentent les candidats ou les donateurs
- Les lignes représentent la direction des flux financiers
- L'épaisseur des lignes représente le montant
- Les entreprises affiliées au même groupe sont regroupées par couleur

Cliquez sur n'importe quel nœud, vous voyez le détail complet. Cliquez sur n'importe quel lien, vous voyez la source de déclaration originale (avec référence de page PDF du Yuan de contrôle).

**Ce que fait cette visualisation, c'est rendre les données déjà publiques du Yuan de contrôle explorables**. Loi + plateforme + visualisation — les trois couches superposées créent la possibilité opérationnelle de « suivre les flux financiers en ouvrant un navigateur ».

Ce n'est pas seulement le projet « flux financiers électoraux ». L'écosystème de surveillance politique de g0v comprend aussi :

- **councilor-voter-guide** (guide de vote des conseillers)[^13] : intègre les dons politiques, le taux de présence, les propositions et les questions des candidats aux conseillers, sous forme de fiche d'identité du conseiller
- **Dons politiques obscurs**[^14] [NEEDS-VERIFY] : signale les schémas de flux financiers suspects ou potentiellement illégaux
- **Croisement marchés publics × dons politiques** : croise les données du bulletin des marchés publics avec les données des dons politiques pour voir quels adjudicataires sont aussi des donateurs politiques

La caractéristique de ces projets est que **toutes les données brutes proviennent de sources de données publiques gouvernementales**. La communauté ne fait pas « révéler des secrets », elle rend « des données déjà publiques mais difficiles à utiliser, utilisables ».

C'est le modèle sain de l'infrastructure de surveillance citoyenne taïwanaise — le gouvernement fournit les données brutes, la communauté complète l'interface et l'analyse, les médias et les chercheurs utilisent les résultats communautaires pour la surveillance. Chaque couche fait ce qu'elle fait de mieux.

---

## 2017 : l'accord de publication des données entre le Yuan de contrôle et la Commission électorale centrale

2017 a été un tournant.

Cette année-là, le Yuan de contrôle a signé un accord de publication des données avec la Commission électorale centrale [NEEDS-VERIFY], et une partie des données sur les dons politiques a commencé à être ouverte au public sous format structuré (CSV / API partielle)[^15]. Bien qu'il ne s'agisse pas d'une API complète et que de nombreuses données restent au format PDF — c'est la première fois qu'une plateforme de données officielle taïwanaise reconnaît formellement que « les données structurées sont la vraie ouverture ».

Le projet « flux financiers électoraux » de g0v a aussi connu sa deuxième génération à cette époque[^12]. La nouvelle version n'a plus besoin de traiter de grandes quantités de données par OCR, elle peut directement consommer les CSV officiels — l'efficacité de traitement augmente, les erreurs diminuent, la couverture s'élargit.

Mais **l'API complète n'a toujours pas été réalisée**. En 2026, si vous voulez faire une analyse à grande échelle des dons politiques entre circonscriptions, entre années et entre candidats, vous devez encore dépendre en partie des pipelines de scraping maintenus par g0v. La ligne des « données ouvertes gouvernementales » sur la question des dons politiques, après vingt-deux ans, n'a pas encore été parcourue jusqu'au bout.

---

## Problèmes structurels : la loi est écrite mais des failles existent

Après vingt-deux ans de fonctionnement, la loi sur les dons politiques a accumulé plusieurs problèmes structurels. Ces problèmes ne sont pas des échecs de conception de la loi elle-même — ce sont des défis universels pour toute loi de transparence.

### 1. Dons dispersés pour contourner les plafonds

Les plafonds fixés par l'article 18 de la loi — 100 000 NT$ pour les personnes physiques, plafond pour les entreprises — semblent suffisants pour empêcher une influence concentrée. Mais en pratique, un groupe peut **diviser un don unique important en dizaines de dons de prête-noms**. Les administrateurs du groupe, les conjoints d'administrateurs, les dirigeants de filiales, les employés — chacun donne 100 000 NT$ à titre personnel, et collectivement le total dépasse le plafond cent fois[^16].

Ce modèle ne viole techniquement pas l'article 18 — chaque personne physique est dans les limites. Mais c'est substantiellement un contournement. Prouver qu'il s'agit d'une « dispersion » du même fonds nécessite de tracer la source des fonds, d'interroger les personnes concernées — la capacité de vérification du Yuan de contrôle ne permet pas une enquête exhaustive au cas par cas.

### 2. La zone grise des clauses de prêt

La loi autorise les candidats à « s'emprunter de l'argent » pour leur campagne — c'est-à-dire que le candidat lui-même ou sa famille peut fournir un prêt important à la campagne, remboursé ultérieurement par d'autres revenus [NEEDS-VERIFY]. Cette conception visait à l'origine à garantir que les candidats ne soient pas incapables de se présenter par manque de fonds initiaux, mais en pratique, **les prêts deviennent souvent la principale source de financement**. Les prêts ne sont pas des « dons politiques » — ils ne sont pas soumis aux plafonds de l'article 18 et ne figurent pas sur le même formulaire de divulgation publique que les « donateurs ».

Le résultat : les dons politiques déclarés par un candidat ne s'élèvent peut-être qu'à quelques millions, mais les dépenses réelles de campagne peuvent atteindre des dizaines de millions, la différence provenant des « auto-prêts » — et la source de remboursement finale des « auto-prêts » échappe souvent au champ de surveillance de la loi sur les dons politiques.

### 3. Dons politiques ≠ dépenses de campagne

C'est le point le plus facilement confondu.

Les **dons politiques** sont « l'argent reçu » par le candidat — soumis aux plafonds de l'article 18, à déclarer au Yuan de contrôle.
Les **dépenses de campagne** sont « l'argent dépensé » par le candidat — soumis aux plafonds de dépenses de l'article 41 de la loi sur l'élection et la révocation des fonctionnaires[^17], à déclarer à la Commission électorale centrale.

Ce sont deux entités différentes (Yuan de contrôle vs Commission électorale centrale), deux systèmes de déclaration différents, deux interfaces publiques différentes, deux définitions de champs différentes. **Théoriquement, elles devraient correspondre** — l'argent reçu moins le solde est égal à l'argent dépensé — mais en pratique, les données des deux côtés ne correspondent souvent pas. Les raisons sont les différences de définition, les différences de calendrier de déclaration, les différences d'utilisation du solde.

La communauté g0v a tenté de faire un « croisement dons politiques × dépenses de campagne » — mais le travail de normalisation nécessaire pour l'interconnexion entre plateformes est énorme[^12].

### 4. Les révocations et référendums ne sont pas soumis à l'obligation de divulgation

La loi sur les dons politiques régule les « élections de candidats » — elle n'inclut pas les initiateurs de révocation, ni les initiateurs de référendum.

Pendant le mouvement de grande révocation de 2025, les sources de financement des groupes de pétition n'avaient pas la même obligation de divulgation[^18]. Les groupes initiateurs pouvaient recevoir des dons, pouvaient mobiliser, mais il n'y avait pas de système de déclaration correspondant au Yuan de contrôle. Cette faille est devenue une direction de réforme discutée après les révocations massives de 2025 — mais la loi sur les dons politiques n'a pas été révisée depuis 2018 ; à partir de juillet 2026, les flux financiers des initiateurs de révocation et de référendum demeurent en dehors de toute obligation légale de déclaration.

---

## Comparaison internationale : la position relative de Taïwan en Asie

Dans le système de coordonnées asiatique :

| Pays         | Autorité compétente            | Moment de la divulgation                                                    | Convivialité de l'interface                          | Système de plafonds                                  |
| ------------ | ------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------------- |
| Taïwan       | Yuan de contrôle               | 3-6 mois après l'élection                                                   | Moyenne (partiellement structuré)                    | 100 000 NT$ personne physique / entreprise plafonnée |
| États-Unis   | FEC                            | Après l'élection (déclarations périodiques partielles avant l'élection)[^8] | Élevée (API complète)                                | Personne physique / PAC stratifié                    |
| Japon        | Ministère de l'Intérieur       | Rapport annuel                                                              | Faible (principalement PDF)[^9]                      | Faille importante des groupements politiques         |
| Corée du Sud | Commission électorale centrale | Après l'élection                                                            | Faible (interface vieillissante)[^10] [NEEDS-VERIFY] | Gestion centralisée                                  |

La position relative de Taïwan est la suivante : **base juridique complète, plateforme existante, plafonds raisonnables, mais l'interface a encore de la marge d'amélioration, les failles structurelles nécessitent une réforme**.

Pas la meilleure — la FEC américaine reste la référence internationale en profondeur des données et complétude de l'API.
Mais pas la pire — comparé à certains pays voisins où « la divulgation existe formellement mais est impossible à rechercher », la plateforme du Yuan de contrôle taïwanaise complétée par g0v est un écosystème fonctionnel.

---

## Points d'observation pour l'élection de 2026

L'élection unifiée du 28 novembre 2026 — maires de municipalités directes : 6, conseillers : 380, chefs de comté/ville : 16, conseillers : 532, chefs de canton/ville : 198, représentants : 2 148, chefs de district autochtone : 6, représentants de district : 50, chefs de village/quartier : 7 748 — plus de 10 000 postes électifs au total[^19].

Les points d'observation sur la transparence des dons politiques pour cette élection méritent d'être suivis :

**1. La déclaration en temps réel sera-t-elle élargie ?** Actuellement, les candidats déclarent après l'élection, et les données sont rendues publiques quelques mois après. Si elles pouvaient être rendues publiques régulièrement avant l'élection (même mensuellement), la signification pour la prise de décision des électeurs serait plus grande. Cela nécessiterait une réforme ou un ajustement au niveau des règlements administratifs du Yuan de contrôle.

**2. Le miroir en temps réel de g0v pourra-t-il couvrir ?** Le projet « flux financiers électoraux » de g0v fait une visualisation complète après chaque élection majeure, mais la couverture « avant l'élection » reste limitée. En 2026, l'existence d'un canal de données citoyen plus proche du temps réel dépendra de l'énergie communautaire.

**3. Concentration des dons importants.** Observer la proportion des dons de quelques donateurs dans le total des dons d'un candidat — plus la concentration est élevée, plus la dépendance du candidat vis-à-vis de sponsors spécifiques est profonde. C'est un indicateur proxy pour mesurer la structure de la politique de l'argent.

**4. Croisement avec les contractants gouvernementaux.** L'article 7 interdit aux contractants gouvernementaux de faire des dons — mais l'exécution intertemporelle présente des décalages (la relation temporelle entre la date de signature du contrat et la date du don est complexe). Après chaque élection, des cas sporadiques déclenchent des enquêtes du Yuan de contrôle. La profondeur de couverture de ces cas en 2026 est aussi un point d'observation.

**5. Faille de divulgation pour les révocations / référendums.** La discussion de réforme mentionnée ci-dessus sera-t-elle concrétisée.

---

## Pourquoi cette infrastructure mérite d'être chérie

Revenons à la scène de l'ingénieur de g0v ouvrant le PDF au début.

Si vous lui demandez : « Pourquoi passer votre week-end à faire ça ? La plupart des gens ne l'utiliseront de toute façon pas. » — il ne répondra pas « pour la démocratie », ne répondra pas « pour la transparence », et ne répondra probablement pas non plus « pour la surveillance citoyenne ».

Il répondra — « parce que ces données **devraient** pouvoir être utilisées comme ça, mais ce n'est pas possible pour le moment ».

C'est l'essence de la culture des ingénieurs citoyens taïwanais — **pas de révolution, pas de contestation, mais combler les lacunes**. Le gouvernement a déjà fait un travail à 80 %, les 20 % restants en termes d'utilisabilité, d'explorabilité et d'analysabilité, la communauté les complète.

Le Yuan de contrôle a fait le maximum que la loi sur les dons politiques lui permettait de faire — recevoir les données, les stocker, fournir une interface de consultation. g0v a fait l'extension en dehors de l'interface du Yuan de contrôle — visualisation, croisement de sources de données, API, documentation communautaire. Les médias ont fait le reportage d'investigation au-dessus de la visualisation de g0v — creuser l'histoire derrière le graphe de réseau. Les chercheurs ont fait l'analyse structurelle des données accumulées à long terme — écrire les tendances de chaque élection en articles.

**Ces quatre couches de division du travail ne font pas chacune son propre travail, elles sont des nœuds différents de la même chaîne.** Chaque couche complète ce que la précédente ne peut pas faire. Sans l'une d'elles, la suivante ne pourrait pas exister.

Le jour du vote de l'élection unifiée de 2026, des 7 748 chefs de village/quartier aux 6 maires de municipalités directes — le vote se termine, le dépouillement se termine, les victoires et les défaites — tout le monde détourne le regard. Mais cette infrastructure ne s'arrête pas. Le système de déclaration du Yuan de contrôle recevra les rapports comptables de tous les candidats, les scrapers de g0v extrairont la nouvelle série de données, et une nouvelle génération de visualisation commencera à être écrite sur une table de café lors d'un hackathon.

**La forme la plus concrète de l'infrastructure démocratique, c'est cette ingénierie sans héros, jour après jour, qui rend les données utilisables.**

Ouvrez votre navigateur, saisissez l'URL, recherchez le nom d'un candidat — derrière cette action se trouvent la législation de 2004, la plateforme de 2008, le hackathon de 2014, l'accord de 2017, la maintenance continue de 2026.

Vingt-deux ans, un flux financier invisible devenu consultable.

🧬

---

## Pour aller plus loin

- [Communauté open source et g0v](/fr/technology/open-source-and-g0v) — comment fonctionne la communauté de hackers citoyens et pourquoi Taïwan a cet écosystème
- [Hub politique](/politics) — vue d'ensemble de l'infrastructure démocratique
- [Élection unifiée de 2026](/politics/2026 九合一選舉) — organisation institutionnelle et calendrier de l'élection de 2026
- [Système de la Commission électorale centrale](/fr/politics/central-election-commission) — conception et fonctionnement de la Commission électorale centrale
- [Qu'est-ce que l'élection unifiée](/fr/politics/nine-in-one-elections-explained) — neuf types de postes, neuf histoires

---

## Références

[^1]: [Plateforme publique de consultation des dons politiques du Yuan de contrôle](https://ardata.cy.gov.tw/) — portail officiel du Yuan de contrôle pour la consultation des données sur les dons politiques, fournissant les données déclarées des candidats / partis politiques / groupements politiques pour les élections passées.

[^2]: [Processus législatif de la loi sur les dons politiques](https://lis.ly.gov.tw/lglawc/lawsingle?00396B05E12200000000000000014000000004000000^03083093032600^00133001001) — Système intégré de recherche des données législatives du Yuan législatif, adopté en troisième lecture le 26 mars 2004. [NEEDS-VERIFY lien]

[^3]: [Texte intégral de la loi sur les dons politiques](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Base de données nationale des réglementations du ministère de la Justice.

[^4]: [Article 7 de la loi sur les dons politiques](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Source officielle de l'article 7 de la loi sur les dons politiques

[^5]: [Article 18 de la loi sur les dons politiques](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Limites de montant des dons politiques. Les chiffres exacts sont à vérifier dans la version la plus récente de la base de données réglementaire.

[^6]: [Articles 26 à 31 de la loi sur les dons politiques](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Source officielle des articles 26 à 31 de la loi sur les dons politiques

[^7]: [Historique de la mise en ligne de la plateforme des dons politiques du Yuan de contrôle](https://ardata.cy.gov.tw/) — La page « À propos » de la plateforme documente les ajustements majeurs successifs. [NEEDS-VERIFY année exacte de mise en ligne]

[^8]: [FEC : Federal Election Commission](https://www.fec.gov/) — Site officiel de la Commission électorale fédérale américaine, fournissant une API complète des finances des candidats.

[^9]: [Loi japonaise sur la régulation des fonds politiques](https://www.soumu.go.jp/senkyo/seiji_s/) — Page principale du ministère japonais de l'Intérieur sur les fonds politiques.

[^10]: [Commission électorale nationale de Corée du Sud](https://www.nec.go.kr/) — Commission électorale centrale de Corée du Sud. [NEEDS-VERIFY évaluation de la convivialité de l'interface]

[^11]: [g0v 零時政府](https://g0v.tw/) — Site officiel de la communauté taïwanaise de hackers citoyens.

[^12]: [Projet g0v flux financiers électoraux](https://g0v-money-flow.github.io/elections/) — Site du projet de visualisation des dons politiques.

[^13]: [g0v councilor-voter-guide](https://github.com/g0v/councilor-voter-guide) — Dépôt GitHub du guide de vote des conseillers.

[^14]: [Ensemble des projets électoraux de g0v](https://g0v.tw/projects) — Ensemble d'open tools pour la surveillance citoyenne des dons politiques. Noms de projets spécifiques à compléter.

[^15]: [Explication des données ouvertes sur les dons politiques du Yuan de contrôle](https://ardata.cy.gov.tw/) — Explication du téléchargement des données et des champs ouverts de la plateforme. [NEEDS-VERIFY date de signature de l'accord de 2017]

[^16]: [Actes de la conférence annuelle de l'Association taïwanaise de science politique](http://www.tpsahome.org.tw/) — Les discussions académiques sur le contournement des plafonds par les dons dispersés s'y trouvent dispersées. Conformément au principe commun de « non-nomination », cet article ne cite pas de cas spécifiques.

[^17]: [Article 41 de la loi sur l'élection et la révocation des fonctionnaires](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020010) — Méthode de calcul du montant maximum des dépenses de campagne.

[^18]: [Système intégré des propositions du Yuan législatif](https://misq.ly.gov.tw/) — Les discussions de réforme sur la divulgation des flux financiers liés au mouvement de grande révocation de 2025 s'y trouvent dispersées ; le Yuan législatif ne les a pas encore inscrites à l'ordre du jour formel.

[^19]: [Annonces relatives à l'élection unifiée de 2026 de la Commission électorale centrale](https://www.cec.gov.tw/) — Site officiel de la Commission électorale centrale. [NEEDS-VERIFY les chiffres exacts des postes sont à confirmer selon l'annonce finale de la Commission électorale centrale]

---

_Dernière mise à jour : 2026-05-27 — Série Hub Élection 2026 nouvel article._
_Auteur : Taiwan.md 🧬_
