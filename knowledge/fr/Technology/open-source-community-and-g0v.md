---
title: 'La communauté open source et g0v'
description: 'En février 2020, alors que le monde entier se ruait sur les masques, un groupe de programmeurs taïwanais a mis 72 heures pour permettre à 13 000 supérettes de consulter leurs stocks de masques. Sans ordre gouvernemental, sans budget, avec une seule conviction : changer la société par le code. Voici g0v, le « gouvernement zéro », une étrange expérience de « fork du gouvernement ».'
date: 2026-03-23
category: Technology
subcategory: '開源社群'
tags: [Technology, 開源社群, g0v, 公民科技]
readingTime: 8
lastVerified: 2026-03-23
lastHumanReview: true
featured: false
translatedFrom: Technology/開源社群與g0v.md
sourceCommitSha: 528d1c04
sourceContentHash: sha256:af78147ce6c1c764
translatedAt: 2026-05-01T20:54:17+08:00
---

# La communauté open source et g0v

> **En 30 secondes :** En 2012, face à une campagne publicitaire gouvernementale coûteuse mais vide de contenu, un groupe d'ingénieurs a décidé de « forker le gouvernement » — remplaçant le « o » de gov.tw par un « 0 » pour créer g0v.tw, et réinventer ce que devrait être un gouvernement. Huit ans plus tard, lors de l'épidémie de COVID-19, ces programmeurs « amateurs » ont construit en 72 heures une carte des masques permettant à toute la population taïwanaise de consulter en temps réel les stocks de 13 000 pharmacies. Ce n'est pas un exploit gouvernemental : c'est une victoire citoyenne.

Un soir d'octobre 2012, Gao Jialiang (高嘉良) était assis devant son ordinateur, regardant la publicité gouvernementale pour le « Plan de dynamisation de l'économie ». Plus il regardait, plus il s'indignait. Le gouvernement avait dépensé plus de 40 millions de dollars taïwanais pour produire une vidéo promotionnelle dont le contenu était si creux qu'on se demandait si jeter cet argent directement dans le canaur n'aurait pas été plus utile.

Ce soir-là, il prit une décision qui allait changer Taïwan : **si le gouvernement ne fait pas bien, nous le ferons nous-mêmes.**

Il remplaça le « o » du nom de domaine gouvernemental gov.tw par un « 0 », créant ainsi g0v.tw. Ce simple jeu de mots symbolisait un concept entièrement nouveau : **forker le gouvernement**. Tout comme dans le logiciel open source, si la version originale pose problème, on crée une branche (fork) et on réécrit une meilleure version.

## Forker le gouvernement : une expérience citoyenne à l'ère numérique

g0v ne cherche pas à renverser le gouvernement, mais à créer un gouvernement « parallèle » — en utilisant la collaboration open source pour réinvisager à quoi devraient ressembler les services publics.

**En décembre 2012**, le tout premier hackathon g0v (appelé « hackath0n », le « zéro » étant dans le nom) s'est tenu à l'Academia Sinica, avec une quarantaine de participants. Le premier projet consistait à extraire le _Budget général du gouvernement central_ de l'enfer des PDF pour en faire un site web interactif et visuel.

À l'origine, le budget gouvernemental était un PDF de plus de 500 pages, rempli de chiffres et de tableaux si denses que personne ne pouvait les comprendre. Les bénévoles de g0v ont restructuré ces données pour créer des graphiques interactiques — **un seul clic permettait de voir où le gouvernement dépensait l'argent de vos impôts.**

> **📝 Note du conservateur**
> Le choix du premier projet de g0v — la visualisation du budget gouvernemental — n'était pas un hasard. Le budget est au cœur de la démocratie : les citoyens ont le droit de savoir comment le gouvernement dépense leur argent. Mais les documents budgétaires traditionnels étaient conçus pour être incompréhensibles. g0v a utilisé la technologie pour briser cette « opacité délibérée ».

Cette petite expérience a prouvé une chose : **le fait que le gouvernement ne fasse pas quelque chose ne signifie pas que c'est impossible. Cela signifie simplement que personne ne l'a encore fait.**

## Le mouvement du 18 mars : la vitrine de la technologie citoyenne

Dans la nuit du 18 mars 2014, des étudiants ont occupé le Parlement taïwanais (Legislative Yuan). Le lendemain matin, des bénévoles de g0v étaient déjà sur place — non pas pour manifester, mais pour « installer l'infrastructure ».

**Personne ne les avait organisés, personne ne leur avait donné d'ordre.** Les participants de la communauté g0v ont spontanément accompli les actions suivantes :

- **Diffusion en direct** : mise en place d'un système de streaming multi-caméras permettant au monde entier de voir ce qui se passait à l'intérieur de l'hémicycle
- **Centralisation de l'information** : création d'un dossier hackfoldr pour collecter, organiser et vérifier en temps réel les informations circulant sur Internet
- **Collaboration collective** : mise en place d'un système de notes collaboratives permettant aux citoyens absents de participer à la collecte de données et à la vérification des faits
- **Lien avec l'extérieur** : fourniture de traductions multilingues en temps réel pour que les médias internationaux puissent comprendre les revendications des manifestants

**Pendant les 24 jours d'occupation, le streaming en haute définition n'a jamais été interrompu.** En 2014, c'était un exploit technique remarquable. Facebook Live n'existait pas encore, le streaming sur YouTube n'était pas répandu, mais les bénévoles de g0v avaient construit avec des outils open source un système de diffusion plus stable que ceux des médias professionnels.

Plus important encore, ils ont prouvé la force de la « transparence ». Grâce au streaming en direct, tout le monde pouvait voir ce qui se passait à l'intérieur de l'hémicycle, rendant impossible pour le gouvernement de déformer les faits. Ce modèle de « surveillance du gouvernement par la technologie » a ensuite été étudié et imité par des mouvements citoyens à travers le monde.

## La carte des masques : un miracle en 72 heures

Début février 2020, l'épidémie de COVID-19 a frappé Taïwan. Le gouvernement a annoncé un système de rationnement des masques, permettant à chaque personne d'acheter deux masques par semaine. Le problème : où aller ? Quelles pharmacies avaient encore du stock ?

**Le 6 février**, la ministre numérique Audrey Tang (唐凤), elle-même membre fondatrice de g0v, a annoncé que le gouvernement ouvrirait les données de stock de masques des 13 000 pharmacies conventionnées à travers Taïwan, avec une mise à jour toutes les 30 minutes.

**Le 8 février**, la première carte des masques était en ligne.
**Le 9 février**, plus de 100 versions différentes de cartes des masques étaient apparues.

Ce n'était pas un projet confié par le gouvernement à une entreprise informatique : c'était le résultat des « heures supplémentaires volontaires » de programmeurs à travers tout Taïwan. **Chacun voulait contribuer à la lutte contre l'épidémie, et ce que les programmeurs pouvaient faire, c'était écrire du code.**

Parmi les versions les plus populaires :

- **Carte des masques de Taïwan** par Howard Wu : une interface cartographique claire et intuitive
- **Y a-t-il encore des masques ?** par l'internaute kiang : intégrant les avis sur les pharmacies et leurs horaires d'ouverture
- **Où acheter des masques** par Finjon Kiang : avec une fonction de recherche vocale

En 72 heures, Taïwan disposait du système de consultation des stocks de masques le plus sophistiqué au monde. **Pendant que les citoyens d'autres pays faisaient la queue pour acheter des masques, les Taïwanais pouvaient déjà consulter sur leur téléphone combien de masques il restait dans la pharmacie la plus proche.**

> **⚠️ Point de vue controversé**
> Certains ont critiqué le gouvernement pour avoir « externalisé sa responsabilité à des bénévoles », laissant le secteur privé développer gratuitement des systèmes pour l'État. Mais la réponse de la communauté g0v a été directe : nous n'avons pas été exploités par le gouvernement — nous avons choisi activement de rendre service à la société avec nos compétences. De plus, les cartes des masques open source étaient plus fonctionnelles, plus innovantes et plus adaptées aux besoins des utilisateurs que tout ce que le gouvernement aurait pu produire lui-même.

## La magie de la collaboration open source

Le mode de fonctionnement de g0v est simple : **pas de patron, pas d'employés, pas de budget, pas de bureau.** Juste un groupe de personnes prêtes à utiliser la technologie pour résoudre des problèmes sociaux, et une culture de collaboration open source.

### La culture du hackathon

Un grand hackathon (appelé « dathon ») a lieu tous les deux mois. Les participants proposent des idées, forment des équipes et développent des prototypes sur place. Le déroulement :

1. **Proposition en trois minutes** : n'importe qui peut monter sur scène pour présenter une idée
2. **Formation libre des équipes** : ceux qui sont intéressés peuvent rejoindre un projet
3. **Développement sur place** : on commence à coder le jour même
4. **Présentation des résultats** : en fin de journée, chacun partage ses progrès

**Personne n'est rejeté, aucune idée n'est refusée.** La seule exigence : le projet doit être open source, pour que d'autres puissent continuer à l'améliorer.

### Les outils de collaboration

- **Canal Slack** : discussions quotidiennes et partage d'informations
- **GitHub** : gestion du code et contrôle de version
- **HackMD** : documents collaboratifs et comptes rendus de réunions
- **Trello** : gestion de projet et suivi des progrès

### Trois principes fondamentaux

1. **Open source** : le code, les données et la documentation de tous les projets sont publics
2. **Décentralisation** : pas de hiérarchie, n'importe qui peut lancer un projet
3. **La prime à l'action** : « Talk is cheap, show me the code » (Les discours ne coûtent rien, montrez-moi le code)

> **💓 Le saviez-vous ?**
> La communauté g0v a une tradition : à chaque hackathon, des autocollants en forme de petit écureuil sont distribués. Si c'est votre première participation, vous recevez un autocollant de petit écureuil. Ce design suggère que même si vous êtes débutant, vous êtes le bienvenu pour apporter votre petite contribution — tout comme un écureuil qui ramasse des glands, chaque petite contribution compte.

## Projets majeurs et impact social

En huit ans, la communauté g0v a produit des centaines de projets, dont beaucoup ont directement influencé les politiques gouvernementales et le fonctionnement de la société.

### La transparence des débats parlementaires

Les comptes rendus des séances du _Legislative Yuan_ n'existaient autrefois qu'en version texte, rendant difficile pour les citoyens ordinaires de comprendre ce que les députés faisaient réellement au Parlement. Les bénévoles de g0v ont créé une plateforme de « transparence parlementaire » offrant :

- **Diffusion en direct** : streaming des sessions du Parlement
- **Registres d'interventions** : statistiques et recherche du contenu des interventions de chaque député
- **Registres de vote** : résultats des votes sur les projets de loi importants
- **Suivi des propositions** : parcours complet d'un projet de loi, de son dépôt à sa promulgation

Résultat : **les députés ont commencé à se soucier de leurs « données ».** Taux de présence, nombre de questions posées, nombre de propositions — ces chiffres que personne ne regardait auparavant étaient désormais compilés sur un site web. Les élus ont réalisé que chacun de leurs actes était surveillé, et leur comportement a commencé à changer.

### vTaiwan : une expérience de démocratie numérique

En 2014, g0v a collaboré avec le gouvernement pour lancer la plateforme vTaiwan, permettant aux citoyens de participer à l'élaboration des politiques. Le cas le plus célèbre est la controverse autour d'Uber :

**En 2015**, l'opération d'Uber à Taïwan a provoqué des protestations de la part des chauffeurs de taxi. La réponse traditionnelle aurait été une décision gouvernementale unilatérale, mais vTaiwan a offert une troisième voie : permettre à toutes les parties prenantes de dialoguer sur une plateforme en ligne pour trouver une solution gagnant-gagnant.

Après plusieurs mois de discussions en ligne et d'ateliers en présentiel, une politique de « taxis pluralistes » a été adoptée, protégeant les droits des chauffeurs de taxi traditionnels tout en autorisant l'existence de modèles de services innovants.

**C'était la première fois que Taïwan utilisait la « démocratie numérique » pour résoudre un conflit politique.**

### Favoriser l'ouverture gouvernementale

Le plaidoyer de g0v a directement influencé les politiques gouvernementales :

- **2012** : le projet de visualisation du budget a poussé le gouvernement à ouvrir ses données budgétaires
- **2013** : le projet de transparence parlementaire a conduit à la diffusion en direct des sessions du Parlement
- **2014** : après le mouvement du Tournesol, le gouvernement s'est engagé à réviser la _Loi sur l'accès aux informations gouvernementales_
- **2015** : la plateforme vTaiwan est devenue un canal officiel de participation aux politiques publiques
- **2016** : Audrey Tang est devenue ministre numérique, apportant l'expérience de g0v au sein du gouvernement

## Influence internationale et liens

L'expérience de g0v n'a pas seulement influencé Taïwan — elle a aussi inspiré les mouvements de technologie citoyenne à travers le monde.

### Le réseau Code for All

g0v est membre fondateur du réseau international **Code for All**, collaborant étroitement avec des organisations telles que Code for Japan, Code for Korea et Code for America.

**En 2019**, le sommet g0v s'est tenu à Taipei, rassemblant des communautés de technologie citoyenne de plus de 30 pays pour partager expériences et technologies.

### Coopération internationale pendant la pandémie

Pendant la pandémie de 2020, l'expérience de g0v en matière de carte des masques a été reprise par d'autres pays :

- **Italie** : version Rome de la carte des masques
- **Allemagne** : version Berlin de la carte des masques
- **États-Unis** : carte PPE (équipements de protection individuelle)
- **Corée du Sud** : 마스크맵 (mask map)

Les bénévoles de g0v ont également aidé activement d'autres pays à mettre en place des systèmes similaires, partageant l'expérience taïwanaise en matière de technologie sanitaire avec le monde entier.

## Défis et avenir

En tant qu'« organisation sans patron », g0v fait face aux mêmes défis que toutes les communautés open source.

### Pérennité des projets

Beaucoup de projets g0v sont nés d'un « élan du moment » et manquent de maintenance à long terme. La carte des masques a été très active pendant la pandémie, mais après la crise, plus personne ne l'a maintenue. **Comment assurer la continuité des bons projets est le plus grand défi de g0v.**

### Fatigue des participants

Huit ans de participation bénévole intensive ont épuisé certains des premiers contributeurs. Comment attirer de nouveaux membres et rendre la participation plus durable est une question à laquelle la communauté doit faire face.

### Relations avec le gouvernement

La relation entre g0v et le gouvernement est subtile : à la fois collaborative et critique. Lorsque le gouvernement embrasse activement l'open source et la démocratie numérique, le rôle « d'opposition » de g0v devient flou. Comment maintenir l'indépendance et l'esprit critique tout en collaborant est un défi permanent.

### Désinformation et guerre de l'information

À l'ère de la guerre informationnelle, le principe d'ouverture et de transparence peut aussi être détourné. Comment rester ouvert tout en évitant de devenir un vecteur de désinformation est un nouveau défi.

## Une expérience toujours en cours

En 2012, lorsque Gao Jialiang a transformé gov.tw en g0v.tw, il voulait simplement exprimer son mécontentement envers le gouvernement. Douze ans plus tard, g0v est devenu une partie intégrante de la démocratie taïwanaise et une force majeure dans le mouvement mondial de la technologie citoyenne.

Cette expérience a prouvé plusieurs choses :

1. **La technologie peut être un outil de participation citoyenne**, pas seulement un moyen de profit commercial
2. **La transparence est plus importante que l'efficacité gouvernementale**, car la transparence engendre l'efficacité
3. **Une petite colère peut changer le monde**, à condition d'être prêt à agir
4. **Forker le gouvernement, ce n'est pas le renverser**, mais prouver qu'il existe de meilleures possibilités

À une époque de recul démocratique, g0v nous rappelle que **les citoyens ne sont pas les utilisateurs du gouvernement, mais ses co-créateurs**. Ce que le gouvernement fait mal, nous pouvons le faire nous-mêmes. Ce qu'il fait bien, nous pouvons l'aider à faire mieux.

Ce n'est pas une révolution achevée, mais une expérience en cours. Chaque hackathon, chaque nouveau projet, chaque ligne de code répond à la même question : à quoi peut ressembler la démocratie à l'ère numérique ?

La réponse est encore en train de s'écrire, et chaque personne prête à contribuer en est l'auteure.

## Références

- [Site officiel de g0v](https://g0v.tw/)
- [Organisation GitHub de g0v](https://github.com/g0v)
- [Dossier collaboratif g0v hackfoldr](https://beta.hackfoldr.org/)
- [Réseau international Code for All](https://codeforall.org/)
- [Plateforme de démocratie numérique vTaiwan](https://vtaiwan.tw/)
- [《La participation démocratique à l'ère numérique : du mouvement du Tournesol à g0v》](https://www.books.com.tw/products/0010867342)
- [Conférence TED : Comment corriger le gouvernement sans permission](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy)
- [Entretien avec les développeurs de la carte des masques](https://www.ithome.com.tw/news/136038)

## Thèmes connexes

- [Industrie des semi-conducteurs](/technology/半導體產業) : les fondements de la puissance technologique de Taïwan
- [Mini Taiwan Pulse](/technology/mini-taiwan-pulse) : un projet open source personnel de technologie citoyenne en 2026 — utiliser les données ouvertes TDX + Three.js pour dessiner Taïwan en trajectoires lumineuses 3D
