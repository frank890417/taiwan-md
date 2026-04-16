---
title: "L'esprit open source taïwanais — des ingénieurs qui codent par passion"
description: "Le projet open source le plus influent de Taïwan n'est pas un logiciel : c'est un groupe d'ingénieurs qui ont dit au gouvernement lors d'un hackathon : « Vous ne faites pas bien votre travail, on va le faire à votre place. »"
date: 2026-03-29
tags: ['open source', 'g0v', 'COSCUP', 'GitHub', 'technologie civique', 'logiciel libre']
subcategory: 'Communautés et culture numérique'
author: 'Taiwan.md Translation Team'
readingTime: 8
category: 'Technology'
lastVerified: 2026-03-29
featured: false
translatedFrom: 'Technology/台灣開源精神.md'
lastHumanReview: false
---

> L'industrie du logiciel à Taïwan n'est pas parmi les premières au monde, pourtant on y recense plus de 44 000 utilisateurs GitHub déclarant venir de l'île, des dizaines de hackathons communautaires et des milliers de contributeurs — presque tous des développeurs indépendants qui financent leur participation de leur poche, en dehors de leurs heures de travail. Cet article ne parle pas uniquement de g0v : il brosse un portrait complet de la culture open source taïwanaise à travers quatre prismes — les individus, les communautés, l'éducation et l'industrie.

---

## La pub télévisée qui a tout déclenché

En octobre 2012, le Conseil exécutif de Taïwan diffuse une publicité de 40 secondes pour promouvoir son « Plan de relance économique ». Le message se résume à une seule phrase : « Ce plan est vraiment complexe, il nous est impossible de l'expliquer en quelques mots. »

Kao Chia-liang (clkao), diplômé en informatique de l'Université nationale de Taïwan, regarde la publicité et ouvre son ordinateur. Avec quelques amis, il participe au Yahoo! Open Hack Day, change de sujet en cours de route et produit en trois jours un outil de visualisation du budget central du gouvernement. Ils remportent une mention honorable. Deux mois plus tard, Kao enregistre g0v.tw et utilise le prix pour organiser le « Zéroième hackathon de mobilisation d'urgence ».

Le nom g0v remplace le « o » de « gov » (gouvernement) par un zéro. Le message est limpide : vous ne faites pas bien votre travail, on va le faire à votre place.

Ce n'est pas une organisation. g0v n'a ni bureau, ni conseil d'administration, ni salarié à plein temps. C'est une communauté décentralisée qui se retrouve à travers des hackathons bimestriels. À la fin 2025, ces événements avaient déjà été organisés plus de 70 fois, le Slack comptait plus de 8 000 membres, et HackMD hébergeait plus de 4 500 notes collaboratives.

---

## 72 heures, 100 applications

Le moment où g0v a été le plus visible à l'international remonte à 2020.

Au début de la pandémie de COVID-19, Taïwan instaure un système de distribution de masques sous contrôle nominal. Le ministère de la Santé publie une API ouverte donnant accès aux stocks des pharmacies, et Audrey Tang, alors ministre du Numérique, annonce la nouvelle dans le canal de discussion g0v. Dans les 72 heures qui suivent, la communauté des développeurs taïwanais déploie une énergie collaborative sans précédent : Chiang Ming-tsung (kiang) crée une carte des masques en pharmacie, Jarvis Lin développe une application Android, et un chatbot LINE est mis en ligne le même jour.

En une semaine, plus de 100 applications dédiées à la recherche de masques voient le jour. Le nombre d'ingénieurs ayant contribué est estimé à près de mille.

Foreign Affairs publie un article intitulé _Civic Technology Can Help Stop a Pandemic_, qualifiant l'approche taïwanaise de troisième voie — ni la surveillance à la chinoise, ni les géants technologiques occidentaux — fondée sur l'innovation démocratique par la technologie civique. L'École de médecine de Stanford recense 124 mesures indépendantes prises par Taïwan pendant la pandémie. NPR, MIT Technology Review et Harvard Business Review y consacrent chacun un dossier.

Ce n'est pas le mérite du gouvernement, ni celui d'Audrey Tang seule. Ce sont des ingénieurs bénévoles qui ont ouvert leur ordinateur portable un week-end et ont construit quelque chose.

---

## Avant Audrey Tang : les racines de l'open source à Taïwan

Si g0v a pu prendre forme aussi rapidement en 2012, c'est parce que Taïwan cultive un terrain open source depuis vingt ans.

Audrey Tang apprend Perl à 12 ans et quitte l'école à 14 ans pour créer une entreprise. Avant d'entrer au gouvernement, elle lance plus de 100 projets sur CPAN (la plateforme de modules Perl), dirige Pugs — la première implémentation fonctionnelle de Perl 6 en Haskell — et co-développe EtherCalc avec Dan Bricklin, le père du tableur. Reconnue comme figure centrale des communautés Perl et Haskell, son influence dans la sphère internationale de l'open source précède de loin sa carrière politique.

Hung Jen-yee (PCMan) est un autre représentant de cette génération. Médecin interniste de formation, il apprend la programmation seul au lycée et développe PCMan, un logiciel de connexion à des BBS. En 2006, il lance le projet LXDE — un environnement de bureau Linux léger. LXDE a longtemps été l'environnement de bureau grand public le moins gourmand en mémoire au monde, adopté notamment par Knoppix et Lubuntu. Un médecin taïwanais a donc écrit un environnement de bureau qui tourne sur des machines Linux dans le monde entier. Hung a ensuite rejoint Google, mais l'histoire de LXDE illustre une caractéristique typique des contributeurs open source taïwanais : leur cœur de métier n'est pas le logiciel, mais ils produisent des projets de niveau international sur leur temps libre.

Huang Jing-qun (jserv) a suivi une autre voie. Après avoir travaillé sur des logiciels système chez MediaTek et Andes Technology, il rejoint le département d'informatique de l'Université nationale de Cheng Kung pour y donner un cours intitulé « Conception du noyau Linux » — la seule formation universitaire à Taïwan qui démonte systématiquement les dernières versions du noyau Linux. Ses étudiants soumettent directement des patches à Linux, glibc, GCC et LLVM. Il intervient régulièrement à COSCUP et au FOSDEM en Europe. jserv n'est pas un contributeur de type « génie isolé » : il représente une tentative d'intégrer la pratique open source dans le système éducatif.

---

## L'écosystème communautaire : bien plus que COSCUP

La densité des communautés open source à Taïwan est exceptionnelle à l'échelle asiatique.

**COSCUP** (Conference for Open Source Coders, Users and Promoters) existe depuis 2006. C'est la plus grande conférence open source de Taïwan. En 2024, elle rassemble plus de 2 800 participants, avec plus de 40 salles thématiques couvrant Kubernetes, PostgreSQL, Ruby, Python, la blockchain et bien d'autres sujets. Chaque salle dispose d'environ 6 heures de programme, entièrement défini par les communautés elles-mêmes. COSCUP est gratuit. Les bénévoles sont plus d'une centaine, tous non rémunérés. 2025 est son 20e anniversaire.

**SITCON** (Students' Information Technology Conference) est né en 2013, entièrement à l'initiative d'étudiants et organisé par eux. Sa raison d'être : montrer aux lycéens de 18 ans qu'ils n'ont pas besoin d'attendre d'être diplômés pour contribuer à l'open source. SITCON organise une conférence annuelle en mars, ainsi que des HackGen en cours d'année, des camps d'été et des rencontres bi-hebdomadaires.

**PyCon TW** est la conférence annuelle de la communauté Python, réunissant des utilisateurs Python de tous horizons. **MozTW** est la communauté bénévole taïwanaise de Mozilla, qui maintient la version chinoise traditionnelle de Firefox depuis 2004, avec un programme d'ambassadeurs dans les campus et un groupe de traduction de sous-titres. L'espace communautaire « Moztw House » à Taipei a fonctionné de 2014 à 2023, maintenu par des dons locaux après la fin du financement de Mozilla.

Ces communautés se croisent et s'entrecroisent en permanence. Une même personne peut être conférencière à COSCUP, contributrice g0v et bénévole à PyCon TW. La scène open source taïwanaise est petite, mais sa densité est remarquable.

---

## L'héritage institutionnel et ses ruptures

Taïwan a connu des initiatives gouvernementales en faveur de l'open source.

En 2003, l'Institut de sciences informatiques de l'Academia Sinica, avec le soutien du Bureau des industries du ministère de l'Économie, fonde l'OSSF (Open Source Software Foundry). L'OSSF propose hébergement de projets, conseils juridiques et bulletin de vulgarisation, et nourrit les communautés open source locales pendant plus d'une décennie. En 2015, le ministère des Sciences et Technologies décide de ne pas renouveler le financement. L'OSSF cesse ses activités, et son site ferme fin 2021.

La disparition de l'OSSF n'a pas provoqué de déclin de l'activité open source à Taïwan — ce qui prouve que cette énergie n'a jamais dépendu du gouvernement. Ce qui soutient véritablement l'écosystème, c'est l'Open Culture Foundation (OCF), fondée en 2014. Créée conjointement par plusieurs communautés open source, cette fondation à but non lucratif joue un rôle de gestionnaire financier pour les communautés : elle émet des factures pour COSCUP, gère les dons pour les projets et fournit des conseils juridiques sur les licences open source. L'OCF collabore également avec l'AIT, le Bureau britannique à Taïwan, la Banque mondiale et d'autres institutions internationales pour exporter l'expérience taïwanaise en matière de technologie civique.

Cette structure est révélatrice : quand les programmes gouvernementaux prennent fin, ce sont les fondations civiles qui prennent le relais. Le dispositif institutionnel s'est construit par le bas.

---

## Les raisons structurelles du « coder par amour »

La grande majorité des contributeurs open source à Taïwan sont des individus. Il n'existe pas d'entreprise open source de l'envergure de Red Hat, ni de programme de mécénat à l'échelle du Google Summer of Code. L'investissement des entreprises tech dans l'open source se limite souvent à « autoriser les employés à contribuer sur leur temps libre », sans en faire un indicateur de performance.

Pourquoi ?

L'industrie technologique taïwanaise est centrée sur la fabrication de matériel et la conception de circuits intégrés. Le modèle économique de TSMC, MediaTek ou Foxconn repose sur les capacités de fabrication et les barrières à l'entrée par les brevets, non sur le code source ouvert. Dans cet écosystème, le logiciel est souvent perçu comme un accessoire du matériel plutôt qu'une source de revenus indépendante. Parmi les milliers d'entreprises de services logiciels, neuf sur dix font de l'intégration de systèmes pour le marché local.

Résultat : il y a beaucoup de codeurs, mais presque personne ne « vit de l'open source ». L'open source est une activité du soir, du samedi, du hackathon du week-end. Sur la liste des sponsors de COSCUP, on trouve davantage de multinationales (Google, LINE, Trend Micro) que d'entreprises taïwanaises.

Ce n'est pas entièrement négatif. Précisément parce que l'open source n'est pas un KPI, les motivations des participants sont plus pures. Si la carte des masques a explosé en 72 heures, ce n'est pas parce qu'un ticket de projet a été émis : c'est parce que mille ingénieurs ont pensé « il faut faire ça ».

Mais ce modèle a ses limites. Sans investissement continu de niveau entreprise, les projets tendent à stagner quand leurs mainteneurs principaux s'épuisent. Taïwan ne manque pas de codeurs du week-end ; ce qui manque, ce sont des postes permettant de contribuer à l'open source à plein temps.

---

## La force silencieuse des 44 000

GitHub comptabilise 44 408 utilisateurs déclarant venir de Taïwan (statistiques de mars 2026). Il faut au moins 67 abonnés pour figurer dans le classement taïwanais de committers.top. Rapporté aux 23 millions d'habitants de l'île, ce chiffre signifie qu'un Taïwanais sur 500 possède un compte GitHub actif. Comparée au Japon, à Singapour ou à Hong Kong, la densité d'activité GitHub par habitant place Taïwan dans le peloton de tête en Asie.

Plus révélateur que les chiffres, c'est le type de contributions. Dans les projets internationaux, les développeurs taïwanais jouent souvent un rôle d'« infrastructure invisible » : patches du noyau, optimisations de compilateurs, traductions de localisation, rédaction de documentation. Les étudiants de l'Université nationale de Cheng Kung soumettent directement du code au noyau Linux. MozTW maintient la version chinoise de Firefox depuis vingt ans. Ces contributions ne font pas la une des journaux, mais sans elles, les logiciels ne fonctionneraient pas.

La communauté open source taïwanaise présente une autre particularité rare en Asie : g0v applique la méthodologie open source aux politiques publiques. La plateforme vTaiwan utilise la technologie Polis pour la délibération en ligne et a traité plus de 30 sujets — régulation d'Uber, législation fintech, entre autres. MIT Technology Review la décrit comme « le système simple mais ingénieux que Taïwan utilise pour externaliser ses lois à la foule ». Ce n'est plus simplement une question de code : c'est l'application de la logique collaborative de l'open source à la gouvernance démocratique.

À Taïwan, l'open source n'a jamais été l'affaire exclusive de la communauté technique. C'est une attitude : voir un problème, ouvrir son éditeur de code, commencer à écrire.

---

## Références

1. [g0v 公民科技專案與社群手冊](https://g0v.hackmd.io/@jothon/ctpbook) (source primaire)
2. [2020 動盪一年，g0v 的貢獻可不只「口罩地圖」](https://www.gvm.com.tw/article/76428) — 遠見雜誌
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs
4. [公民黑客力 g0v 零時政府](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — 台灣光華雜誌
5. [國際開源社群領導者唐鳳：開源是新時代交換典範](https://www.ithome.com.tw/news/93603) — iThome
6. [洪任諭 — 維基百科](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [黃敬群 — 維基百科](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [自由軟體鑄造場 — 維基百科](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [About OCF — Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Most active GitHub users in Taiwan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Pour aller plus loin
- Communautés open source et g0v
- Histoire des migrations des communautés en ligne à Taïwan
