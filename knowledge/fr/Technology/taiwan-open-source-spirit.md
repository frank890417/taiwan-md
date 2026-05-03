---
title: "L'esprit open source à Taïwan — Ces ingénieurs qui codent par passion"
description: "Le projet open source le plus influent de Taïwan n'est pas un logiciel, c'est un groupe d'ingénieurs qui, lors d'un hackathon, ont dit au gouvernement : « Tu ne sais pas le faire, on s'en charge. »"
date: 2026-03-29
tags: ['open source', 'g0v', 'COSCUP', 'GitHub', 'civic tech', 'logiciel libre']
subcategory: '社群與數位文化'
author: 'p3nchan'
readingTime: 8
category: 'Technology'
lastVerified: 2026-03-29
featured: false
lastHumanReview: false
translatedFrom: Technology/台灣開源精神.md
sourceCommitSha: 0ed55e20
sourceContentHash: sha256:8cc121a9cccbf90a
translatedAt: 2026-05-01T22:19:06+08:00
---

> L'industrie du logiciel taïwanaise n'est pas mondialement dominante, mais plus de 44 000 utilisateurs sur GitHub indiquent Taïwan comme localisation, les hackathons communautaires dépassent les 70 éditions avec des milliers de contributeurs — presque tous des développeurs individuels qui financent de leur poche leurs contributions en dehors des heures de travail. Cet article ne parle pas seulement de g0v, mais dresse une carte complète de la culture open source taïwanaise à travers quatre axes : les personnes, les communautés, l'éducation et l'industrie.

---

## Une publicité qui déclencha un hackathon

En octobre 2012, le Yuan exécutif (行政院) a diffusé une publicité télévisée de 40 secondes pour promouvoir le « Plan de stimulation de la dynamique économique ». Le contenu de la publicité tenait en une phrase : « Ce plan est vraiment trop complexe pour être expliqué en quelques mots simples. »

Kao Chia-liang (高嘉良, clkao), diplômé du département d'informatique de l'Université nationale de Taïwan (台大資工系), a regardé cette publicité, puis a ouvert son ordinateur. Avec quelques amis, il a participé au Yahoo! Open Hack Day, a changé de sujet en cours de route et a développé en trois jours le projet « Visualisation du budget du gouvernement central », remportant un prix d'honneur. Deux mois plus tard, Kao a enregistré le domaine g0v.tw et a utilisé le prix pour organiser le « Hackathon de mobilisation anti-désordre zéro » (第零次動員戡亂黑客松).

Le nom g0v remplace le « o » de gov (gouvernement) par un 0. Le message est direct : vous ne savez pas le faire, on s'en charge.

Ce n'est pas une organisation. g0v n'a pas de bureau, pas de conseil d'administration, pas de salariés à temps plein. C'est une communauté décentralisée, maintenue par des hackathons bimensuels. Fin 2025, plus de 70 hackathons ont été organisés, le canal Slack compte plus de 8 000 membres et HackMD héberge plus de 4 500 notes collaboratives.

---

## 72 heures, 100 applications

Le moment où g0v a été le plus remarqué à l'international est 2020.

Au début de la pandémie de COVID-19, Taïwan a mis en place un système de rationnement des masques. Le ministère de la Santé (衛福部) a publié une API ouverte sur les stocks de masques en pharmacie, et Audrey Tang (唐鳳), alors ministre numérique (數位政委), a relayé l'information sur le canal de discussion de g0v. Dans les 72 heures qui ont suivi, la communauté de développeurs taïwanais a déployé une énergie de collaboration sans précédent : Chiang Ming-tsung (江明宗, kiang) a créé la carte des masques en pharmacie, Jarvis Lin a développé une application Android, et un chatbot LINE a été mis en ligne le même jour.

En une semaine, plus de 100 applications liées à la consultation des masques ont vu le jour. Les développeurs impliqués sont estimés à près d'un millier.

_Foreign Affairs_ a publié un article spécial intitulé _Civic Technology Can Help Stop a Pandemic_, décrivant Taïwan comme ayant démontré une troisième voie, distincte à la fois de la surveillance à la chinoise et des géants technologiques occidentaux : l'innovation démocratique portée par la civic tech (technologie citoyenne). Un rapport de la faculté de médecine de Stanford a documenté 124 interventions indépendantes mises en œuvre par Taïwan pendant la pandémie. NPR, MIT Technology Review et Harvard Business Review ont tous consacré des reportages spéciaux au sujet.

Ce n'est pas le mérite du gouvernement, ni seulement celui d'Audrey Tang. C'est le travail d'ingénieurs non rémunérés qui ont ouvert leur ordinateur portable le week-end.

---

## Avant Audrey Tang : les racines de l'open source à Taïwan

Si g0v a pu se structurer aussi rapidement en 2012, c'est parce que Taïwan disposait déjà de vingt ans de terreau open source.

Audrey Tang (唐鳳) a appris le Perl à 12 ans et a quitté l'école à 14 ans pour créer son entreprise. Avant d'entrer au gouvernement, elle a lancé plus de 100 projets sur CPAN (la plateforme de modules Perl), a dirigé Pugs — la première implémentation fonctionnelle de Perl 6 en Haskell — et a co-développé EtherCalc avec Dan Bricklin, le créateur du tableur. Elle est une figure reconnue des communautés Perl et Haskell, et son influence dans les cercles internationaux de l'open source précède largement sa carrière politique.

Hong Ren-yu (洪任諭, PCMan) est une autre figure emblématique. Médecin de formation, il a appris la programmation en autodidacte au lycée et développé PCMan, un logiciel de connexion BBS. En 2006, il a lancé le projet LXDE — un environnement de bureau Linux léger. LXDE fut un temps l'environnement de bureau grand public le plus économe en mémoire, adopté par des distributions comme Knoppix et Lubuntu. Un environnement de bureau écrit par un médecin taïwanais, exécuté sur des machines Linux à travers le monde. Hong a ensuite rejoint Google, mais l'histoire de LXDE illustre un trait caractéristique des contributeurs open source taïwanais : leur métier principal n'est pas le logiciel, et ils réalisent des projets de niveau international sur leur temps libre.

Huang Ching-chun (黃敬群, jserv) a suivi une autre voie. Il a participé au développement de logiciels système chez MediaTek (聯發科), Andes Technology (晶心科技) et d'autres entreprises, avant d'enseigner au département d'informatique de l'Université nationale de Cheng Kung (成功大學), où il a créé le cours « Conception du noyau Linux » — le seul cours universitaire à Taïwan décortiquant systématiquement le noyau Linux le plus récent. Ses étudiants soumettent directement des patchs à Linux, glibc, GCC et LLVM. Il intervient régulièrement à COSCUP et au FOSDEM en Europe. jserv ne représente pas le contributeur « génie solitaire », mais une tentative d'intégrer la pratique open source dans le système éducatif.

---

## L'écosystème communautaire : au-delà de COSCUP

La densité des communautés open source à Taïwan est remarquable en Asie.

**COSCUP** (Conference for Open Source Coders, Users and Promoters), lancé en 2006, est la plus grande conférence annuelle open source de Taïwan. En 2024, elle a rassemblé plus de 2 800 participants, avec plus de 40 salles communautaires (community rooms) couvrant des sujets tels que Kubernetes, PostgreSQL, Ruby, Python et Blockchain. Chaque salle communautaire dispose d'environ 6 heures de programmation, conçue de manière autonome par chaque communauté. COSCUP est gratuit. Les bénévoles sont plus d'une centaine, tous non rémunérés. 2025 marque la 20ᵉ édition de COSCUP.

**SITCON** (Students' Information Technology Conference), lancé en 2013, est entièrement initié et organisé par des étudiants. Son existence vise à montrer aux lycéens de 18 ans qu'il n'est pas nécessaire d'attendre le diplôme pour contribuer à l'open source. SITCON organise une conférence annuelle en mars, ainsi que HackGen pendant l'année scolaire, des camps d'été et des rencontres bimensuelles.

**PyCon TW** est la conférence annuelle de la communauté Python, rassemblant des utilisateurs de Python de divers horizons. **MozTW** est la communauté de bénévoles Mozilla à Taïwan, qui maintient la version en chinois traditionnel de Firefox depuis 2004 et gère un programme d'ambassadeurs sur les campus ainsi qu'un groupe de traduction de sous-titres. L'espace communautaire « Mozi Gongliao » (摩茲工寮) à Taipei a fonctionné de 2014 à 2023 ; après la fin du parrainage de Mozilla, il a été maintenu grâce à des dons locaux.

La participation croisée entre ces communautés est importante. Une même personne peut être conférencière à COSCUP, contributrice à g0v et bénévole à PyCon TW. Le cercle open source taïwanais n'est pas très grand, mais il est dense.

---

## L'héritage institutionnel et ses ruptures

Taïwan a connu des tentatives gouvernementales de promotion de l'open source.

En 2003, l'Institut des sciences de l'information de l'Academia Sinica (中研院資訊科學研究所), financé par le Bureau de l'industrie du ministère de l'Économie (經濟部工業局), a créé la « Fonderie du logiciel libre » (OSSF, Open Source Software Foundry). L'OSSF offrait l'hébergement de projets, des consultations juridiques et la promotion par newsletter, accompagnant les communautés open source locales pendant plus de dix ans. En 2015, le ministère des Sciences et Technologies (科技部) a décidé de cesser le financement, et l'OSSF a cessé ses activités, le site web restant en ligne jusqu'à fin 2021.

La disparition de l'OSSF n'a pas entraîné de déclin des activités open source à Taïwan — ce qui démontre précisément que l'énergie open source taïwanaise n'a jamais dépendu du gouvernement. Ce qui a réellement soutenu l'écosystème, c'est la « Fondation pour la culture ouverte » (OCF, Open Culture Foundation), créée en 2014. Fondée conjointement par plusieurs communautés open source, l'OCF est une fondation d'intérêt public à but non lucratif qui joue un rôle de gestion financière pour les communautés : émission de factures pour COSCUP, traitement des dons pour les projets, consultations juridiques sur les licences open source. L'OCF collabore également avec l'AIT, le Bureau britannique à Taïwan, la Banque mondiale et d'autres institutions internationales pour exporter l'expérience taïwanaise en civic tech.

Cette structure est révélatte : le programme gouvernemental a pris fin, et une fondation civile a pris le relais. L'institution s'est construite de bas en haut.

---

## Les raisons structurelles du « codage par passion »

Les contributeurs open source taïwanais sont, dans leur immense majorité, des individus. Il n'existe pas d'entreprise open source de calibre Red Hat, pas de programme de parrainage d'entreprise à l'échelle du Google Summer of Code, et l'engagement open source des entreprises technologiques se limite le plus souvent à « autoriser les employés à contribuer sur leur temps libre » plutôt qu'à « intégrer l'open source dans les KPI ».

Pourquoi ?

L'industrie technologique taïwanaise repose sur la sous-traitance matérielle (hardware) et la conception de circuits intégrés. Les modèles économiques de TSMC, MediaTek et Foxconn reposent sur la capacité de fabrication et les barrières de brevets, pas sur le code ouvert. Le logiciel dans cet écosystème est souvent un « accessoire accompagnant le matériel », et non une source de revenus autonome. Parmi les milliers d'entreprises de services logiciels, 90 % font de l'intégration de systèmes pour le marché intérieur.

Le résultat : beaucoup de gens savent coder, mais presque personne ne « vit de l'open source ». L'open source se pratique après le travail, lors de rassemblements communautaires, pendant les hackathons du samedi. Sur la liste des sponsors de COSCUP, on trouve davantage d'entreprises étrangères (Google, LINE, Trend Media) que d'entreprises locales.

Ce n'est pas entièrement un inconvénient. Précisément parce que l'open source n'est pas un KPI, les motivations des participants sont plus pures. Si la carte des masques de g0v a pu émerger en 72 heures, ce n'est pas parce qu'un ordre de mission a été donné, mais parce que mille ingénieurs ont estimé que « cela devait être fait ».

Mais ce modèle a un plafond. Sans investissement soutenu au niveau des entreprises, les projets risquent de stagner après l'épuisement de leurs mainteneurs principaux. Taïwan ne manque pas de hackers du week-end, mais de postes permettant de se consacrer à l'open source à temps plein.

---

## La force silencieuse de 44 000 personnes

44 408 utilisateurs sur GitHub indiquent Taïwan comme localisation (statistiques de mars 2026). Il faut au moins 67 abonnés pour figurer au classement de Taïwan sur committers.top. Compte tenu des 23 millions d'habitants de Taïwan, ce chiffre signifie qu'un Taïwanais sur 500 possède un compte GitHub actif. Comparé au Japon, à Singapour et à Hong Kong, l'activité moyenne par développeur sur GitHub place Taïwan dans le peloton de tête en Asie.

Plus que les chiffres, c'est le type de contribution qui est révélateur. Le rôle des développeurs taïwanais dans les projets internationaux relève souvent de « l'infrastructure invisible » : patchs au noyau, optimisation de compilateurs, traduction localisation, rédaction de documentation. Les étudiants de l'Université nationale de Cheng Kung soumettent directement du code au noyau Linux. MozTW maintient la version chinoise de Firefox depuis vingt ans. Ces contributions ne font pas la une des journaux, mais sans elles, les logiciels ne fonctionneraient pas.

La communauté open source taïwanaise présente une autre caractéristique rare en Asie : g0v a appliqué la méthodologie open source aux politiques publiques. La plateforme vTaiwan utilise la technologie Polis pour la délibération en ligne, traitant plus de 30 sujets incluant la réglementation d'Uber et la régulation de la fintech. _MIT Technology Review_ l'a qualifiée de « système simple mais ingénieux par lequel Taïwan externalise ses lois à la foule ». On ne parle plus seulement de programmation : il s'agit d'appliquer la logique collaborative de l'open source à la gouvernance démocratique.

À Taïwan, l'open source n'a jamais été l'affaire exclusive de la communauté technique. C'est une attitude : face à un problème, on ouvre son éditeur de code, et on commence à écrire.

---

## Références

1. [Manuel des projets et communautés de civic tech g0v](https://g0v.hackmd.io/@jothon/ctpbook) (source primaire)
2. [Une année de turbulences en 2020 : les contributions de g0v ne se limitent pas à la « carte des masques »](https://www.gvm.com.tw/article/76428) — 遠見雜誌
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs (source en anglais)
4. [Le pouvoir des hackers citoyens : g0v, le gouvernement zéro](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — 台灣光華雜誌
5. [Audrey Tang, leader de la communauté open source internationale : l'open source est le nouveau paradigme d'échange](https://www.ithome.com.tw/news/93603) — iThome
6. [洪任諭 — Wikipédia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [黃敬群 — Wikipédia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [自由軟體鑄造場 — Wikipédia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Pour aller plus loin

- [開源社群與g0v](/technology/開源社群與g0v) — Le récit collectif d'un fork du gouvernement
- [台灣網路社群遷徙史](/technology/台灣網路社群遷徙史) — L'histoire générationnelle de la migration des communautés en ligne, du BBS à Discord
- [Mini Taiwan Pulse](/technology/mini-taiwan-pulse) — L'open source personnel au service de la civic tech : 193 commits en six semaines pour transformer des données ouvertes en trajectoires lumineuses 3D
- [大宇雙劍](/technology/大宇雙劍) — Une autre histoire taïwanaise de « passion dépassant les moyens » (des RPG nés dans les marchés informatiques de Guanghua)
- [不入地窖焉能睡覺](/technology/不入地窖焉能睡覺) — Une communauté de joueurs de 6 millions de membres née dans les résidences universitaires de l'Université nationale centrale
