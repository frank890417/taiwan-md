---
title: 'Communautés open source et g0v'
description: "En février 2020, alors que le monde entier se ruait sur les masques, un groupe de programmeurs taïwanais a mis en place en 72 heures un système permettant de consulter les stocks de masques dans 13 000 pharmacies. Sans ordre gouvernemental, sans budget, seulement une conviction : changer la société par le code. C'est g0v, le « gouvernement zéro », une étrange expérience de « fork du gouvernement »."
date: 2026-03-23
category: 'Technology'
tags: ['Technologie', 'communautés open source', 'g0v', 'civic tech']
subcategory: '開源社群'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: true
readingTime: 8
translatedFrom: 'Technology/開源社群與g0v.md'
sourceCommitSha: 'ab9964d668'
sourceContentHash: 'sha256:49bc798dac7c0848'
sourceBodyHash: 'sha256:3eab141a44932c8b'
translatedAt: '2026-11-24T11:37:46+08:00'
---

# Communautés open source et g0v

> **Aperçu en 30 secondes :** En 2012, parce que le gouvernement a dépensé une fortune pour une publicité vide de sens, un groupe d'ingénieurs a décidé de « forker le gouvernement » — transformer gov.tw en g0v.tw, réinventer à quoi devraient ressembler les services publics. Huit ans plus tard, la pandémie de COVID-19 éclate, et ces programmeurs « amateurs » construisent en 72 heures une carte des masques permettant à toute la population de Taïwan de consulter en temps réel les stocks de 13 000 pharmacies. Ce n'est pas une réussite gouvernementale, c'est une victoire citoyenne.

En octobre 2012, par une certaine nuit, Kao Chia-liang (高嘉良) est assis devant son ordinateur, regardant la publicité du « programme de relance de la dynamique économique » du gouvernement, et sa colère monte. Le gouvernement a dépensé plus de 40 millions pour produire une vidéo promotionnelle, mais le contenu est si creux qu'on se demande : cet argent n'aurait-il pas mieux valu être jeté dans le caniveau ?

Cette nuit-là, il prend une décision qui va changer Taïwan : **si le gouvernement ne le fait pas bien, nous le ferons nous-mêmes.**

Il prend le nom de domaine gouvernemental gov.tw, remplace le « o » par un « 0 », et obtient g0v.tw[^1]. Ce simple jeu de mots symbolise un concept entièrement nouveau : **fork the government**. Comme pour un logiciel open source, si la version originale a des problèmes, on en crée une branche (fork), et on réécrit une meilleure version.

## Forker le gouvernement : une expérience citoyenne à l'ère numérique

g0v ne vise pas à renverser le gouvernement, mais à le « paralléliser » — utiliser la collaboration open source pour réimaginer à quoi devraient ressembler les services publics.

**Décembre 2012**, le tout premier hackathon g0v (le « zéroième ») se tient à l'Academia Sinica (中研院), avec une quarantaine de participants. Le premier projet : sortir le « Budget général du gouvernement central » de l'enfer des PDF, pour en faire un site de visualisation interactive.

À l'origine, le budget gouvernemental est un PDF de plus de 500 pages, bourré de chiffres et de tableaux incompréhensibles pour le commun des mortels. Les bénévoles de g0v restructurent ces données et créent des graphiques interactifs — **un clic suffit pour voir où partent vos impôts.**

> **📝 Note du curateur**
> Le choix de la visualisation budgétaire comme premier projet de g0v n'est pas un hasard. Le budget est le cœur de la politique démocratique — le gouvernement dépense l'argent du peuple, le peuple a le droit de savoir comment. Mais les documents budgétaires traditionnels sont conçus pour être illisibles. g0v a utilisé la technologie pour percer cette « opacité volontaire ».

Cette petite expérience prouve une chose : **le fait que le gouvernement ne le fasse pas ne signifie pas que c'est impossible. Simplement, personne ne s'en était chargé.**

## Le mouvement du 18 mars : démonstration de force du civic tech

Le 18 mars 2014 au soir, des étudiants occupent le Yuan législatif. Le lendemain matin, des bénévoles de g0v apparaissent sur place, non pour manifester, mais pour « installer l'infrastructure ».

**Personne ne les a organisés, personne ne les a dirigés.** Les participants de la communauté g0v ont spontanément accompli ceci :

- **Diffusion en direct** : mise en place d'un système multi-caméras, permettant au monde entier de voir la situation dans l'hémicycle
- **Centralisation de l'information** : création de dossiers hackfoldr[^2], collecte, tri et vérification en temps réel des informations circulant sur le net
- **Collaboration de masse** : mise en place d'un système d'écriture collaborative, permettant aux citoyens absents de participer à la collecte de données et au fact-checking
- **Liaison internationale** : traduction instantanée multilingue, pour que les médias internationaux comprennent immédiatement les revendications

**24 jours d'occupation, diffusion continue en haute qualité, sans coupure.** En 2014, c'était une prouesse technique inimaginable. Facebook Live n'existait pas encore, YouTube Live n'était pas répandu, mais les bénévoles de g0v ont construit avec des outils open source un système de streaming plus stable que ceux des médias professionnels.

Plus important encore, ils ont prouvé la puissance de la « transparence ». Grâce au direct, tout le monde voyait ce qui se passait dans l'hémicycle, rendant impossible toute manipulation des faits par le gouvernement. Ce modèle de « surveillance du gouvernement par la technologie » a ensuite été considéré à l'étranger comme un modèle possible ; la Corée du Sud, la Thaïlande, le Japon, l'Allemagne ont vu naître des communautés de civic tech similaires[^3].

## La carte des masques : le miracle des 72 heures

Début février 2020, la pandémie de COVID-19 frappe Taïwan. Le gouvernement instaure le rationnement nominatif des masques : deux masques par personne par semaine. Problème : où les acheter ? Quelle pharmacie en a encore en stock ?

**Le 6 février**, la ministre sans portefeuille Audrey Tang (唐鳳), elle-même membre fondatrice de g0v, annonce : le gouvernement ouvrira les données de stock des 13 000 pharmacies conventionnées, mises à jour toutes les 30 minutes[^4].

**Le 8 février**, la première carte des masques est en ligne.
**Le 9 février**, plus de 100 versions différentes apparaissent.

Ce n'est pas un projet commandité par le gouvernement à une entreprise IT, c'est le fruit du « bénévolat de nuit » de programmeurs de toute l'île. **Chacun voulait contribuer à la lutte anti-épidémique, et la contribution des programmeurs, c'est d'écrire du code.**

Les versions les plus populaires incluent :

- **Carte des masques de Taïwan** par Howard Wu : interface cartographique claire et concise
- **Y a-t-il des masques ?** par l'internaute kiang : intégration des avis sur les pharmacies et de leurs horaires
- **Où acheter des masques** par Finjon Kiang : prise en charge de la recherche vocale

En 72 heures, Taïwan disposait du système de consultation de stocks de masques le plus complet au monde[^5]. **Pendant que les citoyens d'autres pays faisaient la queue pour s'arracher les masques, les Taïwanais pouvaient déjà vérifier sur leur téléphone combien il en restait dans la pharmacie la plus proche.**

> **⚠️ Point de controverse**
> Certains critiquent le gouvernement pour avoir « externalisé sa responsabilité vers des bénévoles », laissant la société civile faire gratuitement le travail de l'État. La réponse de la communauté g0v est directe : nous ne sommes pas utilisés par le gouvernement, nous choisissons activement de mettre nos compétences au service de la société. Et les cartes open source sont plus utiles, plus innovantes, plus adaptées aux besoins des utilisateurs que le système que le gouvernement aurait lui-même développé.

## La magie de la collaboration open source

Le mode de fonctionnement de g0v est simple : **pas de patron, pas d'employés, pas de budget, pas de bureau.** Juste un groupe de gens prêts à utiliser la technologie pour résoudre des problèmes sociaux, et une culture de collaboration open source.

### La culture du hackathon

Tous les deux mois, un grand hackathon (大松) est organisé : les participants proposent des idées sur place, forment des équipes, réalisent un prototype. Le déroulement :

1. **Pitch de trois minutes** : n'importe qui peut monter sur scène pour présenter une idée
2. **Formation libre des équipes** : les intéressés rejoignent le projet
3. **Réalisation sur place** : on commence à coder immédiatement
4. **Présentation des résultats** : l'après-midi, partage de l'avancement de la journée

**Personne n'est refusé, aucune idée n'est rejetée.** La seule exigence : le projet doit être open source, pour que d'autres puissent le reprendre et l'améliorer.

### Outils de collaboration

- **Canaux Slack** : discussions quotidiennes et partage d'informations
- **GitHub** : gestion du code et contrôle de version[^6]
- **HackMD** : documents collaboratifs et comptes-rendus de réunion
- **Trello** : gestion de projet et suivi d'avancement

### Trois esprits fondamentaux

1. **Open source** : tout le code, les données, la documentation sont publics
2. **Décentralisé** : pas de hiérarchie, n'importe qui peut lancer un projet
3. **Primauté à la réalisation** : « Talk is cheap, show me the code »

> **💡 Le saviez-vous ?**
> La communauté g0v a une tradition : à chaque hackathon, on prépare des autocollants « petit écureuil ». Si c'est votre première participation, vous en recevez un. Ce design suggère : même si vous êtes débutant, vous êtes bienvenu pour apporter votre petite contribution, comme l'écureuil qui ramasse des glands, chaque minuscule apport compte.

## Projets majeurs et impact social

En huit ans, la communauté g0v a produit des centaines de projets, dont beaucoup ont directement influencé les politiques gouvernementales et le fonctionnement de la société.

### Transparence des travaux du Yuan législatif

Autrefois, les **procès-verbaux du Yuan législatif** n'existaient qu'en version texte, rendant quasi impossible pour le citoyen moyen de savoir ce que font réellement les députés. Les bénévoles de g0v ont créé la plateforme « Transparence des travaux du Yuan législatif », offrant :

- **Direct en temps réel** : streaming des séances
- **Archives des interventions** : statistiques et recherche dans les interventions de chaque député
- **Registres de vote** : résultats des votes sur les textes importants
- **Suivi des propositions** : parcours complet d'un texte, de sa dépôt à sa troisième lecture

Résultat : **les députés ont commencé à se soucier de leurs « données ».** Taux de présence, nombre d'interpellations, nombre de propositions — ces chiffres que personne ne suivait auparavant sont maintenant automatiquement compilés sur des sites web. Les élus découvrent que leurs moindres faits et gestes sont surveillés, et leur comportement commence à changer.

### vTaiwan : l'expérimentation de la démocratie numérique

En 2014, g0v et le gouvernement lancent conjointement la plateforme vTaiwan[^7], permettant aux citoyens de participer au processus d'élaboration des politiques. Le cas le plus célèbre est la controverse Uber :

**En 2015**, l'exploitation d'Uber à Taïwan provoque la colère des taxis. La méthode traditionnelle aurait été une décision unilatérale du gouvernement, mais vTaiwan ouvre une troisième voie : faire dialoguer toutes les parties prenantes sur une plateforme en ligne, pour trouver une solution gagnant-gagnant.

Après des mois de discussions en ligne et d'ateliers physiques, naît la politique des « taxis diversifiés », protégeant les droits des chauffeurs de taxi traditionnels tout en autorisant l'existence de modèles de service innovants.

**C'est la première fois que Taïwan utilise la « démocratie numérique » pour résoudre un conflit de politique publique.**

### Le moteur de l'open government

Les initiatives de g0v ont directement influencé les politiques gouvernementales :

- **2012** : le projet de visualisation budgétaire pousse le gouvernement à ouvrir les données budgétaires
- **2013** : le projet de transparence du Yuan législatif entraîne la diffusion en direct des séances
- **2014** : après le mouvement du Tournesol, le gouvernement s'engage à réviser la « Loi sur la publicité des informations gouvernementales »
- **2015** : la plateforme vTaiwan devient un canal officiel de participation aux politiques
- **2016** : Audrey Tang devient ministre sans portefeuille chargée du numérique, apportant l'expérience g0v au sein du gouvernement

## Influence et connexions internationales

L'expérience de g0v ne rayonne pas seulement sur Taïwan, elle inspire le mouvement civic tech mondial.

### Le réseau Code for All

g0v est membre fondateur du réseau international **Code for All**[^8], collaborant étroitement avec Code for Japan (Japon), Code for Korea (Corée du Sud), Code for America (États-Unis) et d'autres organisations.

**En 2019**, le g0v summit se tient à Taipei, rassemblant des communautés civic tech de plus de 30 pays pour partager expériences et technologies.

### Coopération internationale pendant la pandémie

En 2020, l'expérience de la carte des masques de g0v est reprise par d'autres pays :

- **Italie** : version Roma de la carte des masques
- **Allemagne** : version Berlin de la carte des masques
- **États-Unis** : carte PPE (équipements de protection individuelle)
- **Corée du Sud** : 마스크맵 (mask map)

Des bénévoles de g0v ont également activement aidé d'autres pays à mettre en place des systèmes similaires, partageant l'expérience taïwanaise de technologie anti-épidémique avec le monde entier.

## Défis et avenir

En tant qu'« organisation sans patron », g0v fait face aux défis communs à toutes les communautés open source.

### Pérennité des projets

Beaucoup de projets g0v naissent d'une « impulsion du moment », et manquent de maintenance à long terme. La carte des masques a été très active pendant la pandémie, mais s'est peu à peu abandonnée une fois la crise passée. **Comment faire durer les bons projets est le plus grand défi de g0v.**

### Épuisement des participants

Huit ans d'engagement bénévole intense ont fatigué certains contributeurs de la première heure. Comment attirer de nouveaux visages, comment rendre la participation plus durable, sont des questions que la communauté doit affronter.

### Relations avec le gouvernement

La relation entre g0v et le gouvernement est délicate : à la fois collaboration et surveillance. Lorsque le gouvernement adopte activement l'open source et la démocratie numérique, le rôle « d'opposition » de g0v devient flou. Comment préserver son indépendance et son esprit critique tout en collaborant est un défi permanent.

### Désinformation et guerre de l'information

À l'ère de la guerre informationnelle, le principe d'ouverture et de transparence peut être détourné. Comment rester ouvert tout en évitant de devenir un vecteur de fake news est un nouveau défi.

## Une expérience qui se poursuit

En 2012, quand Kao Chia-liang a transformé gov.tw en g0v.tw, il voulait juste exprimer son mécontentement envers le gouvernement. Douze ans plus tard, g0v est devenu une composante de la démocratie taïwanaise, et une force majeure du mouvement civic tech mondial.

Cette expérience a prouvé plusieurs choses :

1. **La technologie peut être un outil de participation citoyenne**, pas seulement un moyen de profit commercial
2. **L'ouverture et la transparence priment sur l'efficacité gouvernementale**, car la transparence engendre l'efficacité
3. **Une petite colère peut changer le monde**, pourvu qu'on accepte de retrousser ses manches
4. **Forker le gouvernement n'est pas le renverser**, mais prouver qu'une meilleure façon est possible

À une époque de recul démocratique, g0v nous rappelle : **les citoyens ne sont pas les utilisateurs du gouvernement, mais ses co-créateurs.** Ce que le gouvernement fait mal, nous pouvons le faire nous-mêmes. Ce qu'il fait bien, nous pouvons l'aider à le faire encore mieux.

Ce n'est pas une révolution achevée, mais une expérience continue. Chaque hackathon, chaque nouveau projet, chaque ligne de code répond à la même question : à l'ère numérique, à quoi peut ressembler la démocratie ?

La réponse s'écrit encore, et chaque personne prête à contribuer en est un auteur.

## Références

[^1]: [Site officiel de g0v, le gouvernement zéro](https://g0v.tw/) — Portail de la communauté g0v, présentant les activités de hackathon et le mode de fonctionnement des différents projets

[^2]: [Dossiers partagés hackfoldr de g0v](https://beta.hackfoldr.org/) — Plateforme de documents collaboratifs et de collaboration de données utilisée de longue date par la communauté g0v

[^3]: [A Guide to Win Democracy Back: Civic Tech Project and Community Handbook (Friedrich Naumann Foundation, 2025-06-09)](https://www.freiheit.org/fr/node/49973) — La fondation Friedrich Naumann présente le manuel de civic tech co-écrit par la communauté g0v, qualifiant g0v de l'une des forces les plus importantes de la démocratie numérique taïwanaise et de modèle potentiel pour le monde ; le manuel inclut des cas de Corée du Sud, Thaïlande, Japon, Allemagne

[^4]: [How digital innovation can fight pandemics and strengthen democracy (Audrey Tang, TED2020)](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy) — Audrey Tang explique à TED comment Taïwan a évité le confinement au début 2020 grâce aux outils numériques, dont la carte des masques

[^5]: [Entretiens avec les développeurs de la carte des masques](https://www.ithome.com.tw/news/136038) — iThome interviewe les développeurs de la carte des masques, retraçant leur engagement dans les projets anti-épidémiques

[^6]: [Organisation g0v sur GitHub](https://github.com/g0v) — Dépôts de code et historique de collaboration des projets open source de la communauté g0v

[^7]: [Plateforme de démocratie numérique vTaiwan](https://vtaiwan.tw/) — Plateforme en ligne de discussion politique et de construction de consensus, fruit de la collaboration entre g0v et le gouvernement

[^8]: [Réseau international Code for All](https://codeforall.org/) — Site officiel du réseau Code for All connectant les organisations civic tech du monde entier

## Sujets connexes

- [Fondation pour la culture open source](/fr/technology/open-culture-foundation) : Cette fondation qui, derrière g0v, gère la comptabilité, émet les factures, porte l'administratif pour la communauté, et qui, depuis l'arrière-scène, est devenue un chien de garde des droits numériques
- [Industrie des semi-conducteurs](/fr/technology/taiwan-semiconductor-industry) : La base de la puissance technologique de Taïwan
- [Mini Taiwan Pulse](/fr/technology/mini-taiwan-pulse-civic-tech) : Implémentation open source personnelle de civic tech 2026 — utiliser les données ouvertes TDX + Three.js pour dessiner Taïwan en trajectoires lumineuses 3D
