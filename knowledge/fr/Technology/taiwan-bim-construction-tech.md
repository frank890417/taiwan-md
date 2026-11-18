---
title: 'BIM et technologie de construction à Taïwan : douze ans de politique gouvernementale au cas par cas, réécrits par un protocole de dix-huit mois'
description: 'Le 23 mai 2014, le Comité des marchés publics du Yuan exécutif a lancé la « Plateforme de promotion du BIM dans les projets publics », adoptant le principe directeur « au cas par cas, progression graduelle ». Onze ans et sept mois plus tard, un développeur taïwanais travaillant à Tokyo a publié sur GitHub un dépôt nommé REVIT_MCP_study, qui a récolté plus de soixante-dix étoiles et plus de quatre-vingts fork. Entre ces deux dates, le secteur de la construction taïwanais a parcouru un long chemin, du tracé manuel et tirage de plans au bleu aux modèles 3D, des expérimentations individuelles aux normes nationales, de la modernisation des outils à la redéfinition des professions.'
date: 2026-05-22
category: 'Technology'
tags:
  [
    'Technology',
    'BIM',
    'Modélisation des informations du bâtiment',
    'Technologie de la construction',
    'Architecture',
    'Transformation numérique',
    'Revit',
    'MCP',
    'IA',
    'CTCI',
    'Sinotech Engineering Consultants',
    'Shuotao',
  ]
subcategory: '建築科技'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-22
lastHumanReview: false
readingTime: 22
researchReport: 'reports/research/2026-05/台灣BIM與營建科技.md'
image: '/article-images/technology/freecad-bim-example-2024.webp'
imageCredit: 'Maxwxyz via Wikimedia Commons'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣BIM與營建科技.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:85f9d09627902abf'
sourceBodyHash: 'sha256:c4a7f62bbc68876d'
translatedAt: '2026-11-18T01:50:38.532023+00:00'
---

# BIM et technologie de construction à Taïwan : douze ans de politique gouvernementale au cas par cas, réécrits par un protocole de dix-huit mois

![Capture d'écran du workbench BIM en thème sombre de FreeCAD 1.0, montrant un modèle 3D de bâtiment démonstratif au centre, avec un panneau latéral listant les calques par spécialité (structure, CVC, enveloppe) et une barre d'outils inférieure dédiée au workbench BIM, illustrant la nature de la transformation numérique de l'ingénierie que représente le BIM en systématisant l'information du bâtiment](/article-images/technology/freecad-bim-example-2024.webp)
_Fichier de démonstration du workbench BIM en thème sombre de FreeCAD 1.0. Photo : Maxwxyz, 2024-10-07. [Licence via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png)._

> **En 30 secondes :** Le 23 mai 2014, le Comité des marchés publics du Yuan exécutif a lancé la « Plateforme de promotion de la modélisation des informations du bâtiment (BIM) dans les projets publics »[^1], en appliquant un principe de promotion en trois phases « au cas par cas, progression graduelle », sans jamais rendre le BIM obligatoire à ce jour[^2]. Durant la même période, le Centre de recherche BIM de l'Université nationale de Taïwan a donné son premier cours, l'Association taïwanaise du BIM (TBIMA) a été officiellement enregistrée[^3], le gouvernement de la ville de Nouveau Taipei a délivré le premier permis de construire validé par un modèle BIM, la Direction du développement urbain de Taipei a publié les spécifications pour les modèles as-built BIM[^4], et le BSI a signé un protocole d'accord avec le Taiwan BIM Task Group[^5]. Onze ans et sept mois plus tard, le 10 décembre 2025, un développeur nommé CHIANG SHUOTAO a publié sur GitHub un dépôt nommé `REVIT_MCP_study`, avec soixante-treize étoiles et quatre-vingt-cinq fork[^6]. Quatre mois plus tard, en avril 2026, Autodesk a annoncé l'intégration d'un serveur Model Context Protocol (MCP) natif dans Revit 2027[^7]. Entre les douze ans de promotion gouvernementale et les dix-huit mois d'un protocole d'Anthropic se trouve la lente redéfinition des métiers de la construction taïwanaise, du dessin à l'intégration de systèmes.

---

## Le principe « au cas par cas » du Comité des marchés publics

Le 23 mai 2014, le Comité des marchés publics du Yuan exécutif a mis en place ce qu'il a appelé la « Plateforme de promotion de la modélisation des informations du bâtiment (BIM) dans les projets publics »[^1]. Le principe directeur affiché ce jour-là était « **au cas par cas, progression graduelle** ».

Ces huit caractères ont été cités pendant de nombreuses années.

Le Comité a structuré sa stratégie de promotion en trois phases : première phase (année 103 du calendrier républicain, soit 2014) — « encouragement et projets pilotes », ciblant les organismes maîtres d'ouvrage de travaux non building pour des projets pilotes, en donnant la priorité aux marchés en contrat clé appelés « forfait global » ; deuxième phase (années 104-105, soit 2015-2016) — « mise en œuvre et évaluation des projets pilotes » ; troisième phase — « **à partir de l'année 106 (2017), promotion du recours à la technologie BIM pour les projets publics dépassant un certain montant** »[^1].

Mais ce seuil de « certain montant » n'est jamais devenu une obligation générale en 2026. Le Comité n'a cessé de répéter que « **il appartient à chaque organisme maître d'ouvrage, pour les travaux complexes ou de grande envergure, d'évaluer lui-même s'il convient d'adopter la technologie BIM en fonction des besoins du projet et de sa capacité contractuelle à gérer l'exécution, et non d'imposer une règle générale et obligatoire** »[^2].

Le point de référence est Hong Kong. Le Bureau du développement de Hong Kong impose depuis longtemps le BIM pour les projets dont l'estimation des coûts dépasse 30 millions de dollars HK[^8]. À Taïwan, les trois verbes « encourager », « expérimenter » et « évaluer au cas par cas » apparaissent en rotation dans chaque livre blanc.

Les données publiques disponibles à la date de recherche indiquent que la plateforme BIM du Comité a « plus de 60 organismes de passation de marchés publics utilisant la technologie BIM, pour plus de 120 projets »[^2]. Ce chiffre, rapporté aux plus de dix mille projets publics annuels à Taïwan, est dérisoire.

> **📝 Note du conservateur**
> L'explication courante est que « le gouvernement n'arrive pas à promouvoir le BIM car l'industrie ne suit pas ». Ce récit est commode, mais il inverse la causalité. **La séquence réelle est plus proche de ceci : dès 2014, le gouvernement a décidé de ne pas rendre le BIM obligatoire, car l'obligation aurait mis en faillite la moitié des cabinets d'architectes.** « Au cas par cas » est un calcul politique : laisser le choix aux quelques organismes « ayant la capacité contractuelle de gestion de l'exécution », tandis que les autres continuent avec AutoCAD, sans que personne ne dérange personne.

---

## Ministère de l'Intérieur, Taipei et Nouveau Taipei : trois axes de promotion désynchronisés

Le Comité des marchés publics fait sa promotion, l'Institut de recherche en architecture et bâtiment du Ministère de l'Intérieur (ABRI) fait la sienne.

L'ABRI a lancé en 2015 (année 104) un plan quadriennal intitulé « Plan de promotion de la recherche, du partage et de l'application de l'information du bâtiment », suivi en 2019 (année 108) d'un deuxième plan quadriennal[^9]. Les deux grands objectifs du deuxième plan sont formulés en termes ambitieux : « **modernisation numérique des techniques de construction** » + « **environnement d'habitation numérique** », ce dernier visant à intégrer BIM, SIG et IoT pour créer des villes numériques[^10].

Mais l'ABRI n'est pas l'organisme d'exécution de la réglementation de la construction. Celle-ci relève des gouvernements municipaux et départementaux.

En 2014, **le gouvernement de la ville de Nouveau Taipei a délivré le premier permis de construire validé par un modèle BIM**[^11]. La même année, Nouveau Taipei a publié les « Directives pour la remise des informations du modèle as-built BIM des bâtiments publics de Nouveau Taipei ». En 2026, le « Système d'assistance informatisée à l'examen des permis de construire » du gouvernement de Nouveau Taipei (bim.ntpc.gov.tw) a accumulé plus de 20 modèles BIM achevés[^11].

Quatre ans plus tard, le 6 novembre 2018, **la Direction du développement urbain de la ville de Taipei a publié les « Spécifications pour les données attributaires des modèles as-built BIM des projets de construction relevant de la Direction du développement urbain de la ville de Taipei »**[^4]. Les spécifications de Taipei font référence au format international COBie (Construction Operations Building Information Exchange) et intègrent les normes pertinentes de l'Institut de recherche en architecture du Ministère de l'Intérieur de 2015 et du Royaume-Uni[^4]. Elles exigent que, lors de l'utilisation de différents logiciels de modélisation BIM, les données standard **IFC** (Industry Foundation Classes, classes de fondation industrielle, norme internationale ouverte établie par buildingSMART International, ISO 16739-1:2024) et COBie soient exportées[^4][^12].

> **💡 Le saviez-vous ?**
> Les IFC appartiennent à une norme internationale ouverte établie par l'organisation à but non lucratif buildingSMART International[^12], indépendante d'Autodesk ou de tout autre fournisseur unique. Sa logique d'existence est analogue à celle du PDF : permettre l'échange fluide de modèles créés par différents logiciels (Revit, ArchiCAD, Tekla, Navisworks). **Le gouvernement danois impose l'utilisation du format IFC pour les projets de construction publics depuis 2010, suivi par la Norvège, la Finlande et Singapour**[^12]. Taïwan n'a intégré les IFC dans ses spécifications qu'en 2018, au niveau municipal de Taipei. La norme internationale avait dix ans d'avance ; Taïwan a rattrapé progressivement son retard.

Les trois axes de promotion — central, Taipei et Nouveau Taipei — sont tous désynchronisés. Une même station de métro peut, en phase de conception, relever des spécifications BIM du Bureau de l'ingénierie du métro de Taipei (intégrées dans le contrat forfait global), en phase de permis de construire des spécifications de modèle as-built de la Direction du développement urbain de Taipei (format COBie), et en phase d'exploitation et maintenance tomber dans un autre outil de gestion d'installations.

« **Actuellement, la plupart des applications BIM dans le secteur public se concentrent sur les phases de conception et de construction. Les situations diffient entre les projets traditionnels et les projets en forfait global. Les modes de gestion opérationnelle ultérieurs restent traditionnels** »[^13] — c'est ce que rapporte le propre rapport de résultats de l'ABRI.

---

## Wan-Ta Line, gare de Miaoli, T3 de l'aéroport de Taoyuan : le BIM fait son entrée dans les travaux publics

En 2011, **la ligne Wan-Ta du métro de Taipei intègre pour la première fois le BIM dans un contrat de conception d'ingénierie**[^14].

C'est l'un des événements « first » les plus souvent cités dans la promotion du BIM à Taïwan. Les différents tronçons de la ligne Wan-Ta ont adopté le mode BIM pour la conception des stations de métro conformément aux exigences contractuelles, intégrant simultanément les spécialités architecture, structure et électricité/mécanique (CVC), avec une coordination interspécialités qui a **réduit les conflits d'interfaces de conception**[^14].

Sur les traces de la ligne Wan-Ta, les travaux publics se succèdent. La station aérienne Y19 de la ligne circulaire du métro de Taipei, plusieurs centres sportifs de Nouveau Taipei, la nouvelle gare de Miaoli du [TGV de Taïwan](/fr/lifestyle/taiwan-high-speed-rail/), le [troisième terminal de l'aéroport de Taoyuan](/fr/lifestyle/taoyuan-airport/), le tramway circulaire de Kaohsiung : chaque projet fait l'objet d'une étude de cas publiée dans les revues internes de l'ABRI, du centre NTUBIM de l'Université nationale de Taïwan ou des bureaux du métro.

La **« victoire numérique »** la plus citée est la gare de Miaoli du TGV : le BIM a été introduit trois mois avant le début des travaux, l'équipe de surveillance a détecté de nombreux points de conflit depuis le modèle 3D, **économisant 20 % des coûts de modifications de conception ultérieures et permettant de commencer le piquetage de chantier deux mois plus tôt que prévu**[^15].

Le troisième terminal de l'aéroport de Taoyuan est un autre cas d'une tout autre envergure. En mars 2021, **le consortium formé par Samsung C&T et Rong Gong Engineering remporte l'appel d'offres pour les travaux de génie civil du corps principal du terminal T3 pour 44,5 milliards de dollars taïwanais**[^16]. L'ensemble du T3 est conçu sous la direction de Evergreen Consulting Engineering (conjointement avec Rogers Stirk Harbour + Partners et Ove Arup and Partners Hong Kong) ; la collaboration transnationale a dû s'appuyer sur la circulation des modèles BIM entre les différents cabinets : c'est le cas phare que Evergreen utilise en boucle dans ses supports de formation interne[^17].

> **✦** Le moment où la ligne Wan-Ta a inscrit le BIM dans un contrat pour la première fois, en 2011, marque un partage des eaux silencieux dans l'histoire des travaux publics à Taïwan. Depuis ce jour, aucun grand travail public — métro, aéroport, TGV, tramway — ne se conçoit sans se demander « comment fait-on le BIM ? ».

Mais ce ne sont que des « projets phares ». Tous les projets phares à Taïwan partagent un même défaut : **ils sont minoritaires**.

## Cinq grands bureaux d'études + deux organisations : les personnes derrière

Les personnes qui ont fait avancer le BIM dans les projets publics ont des noms et des visages.

**Sinotech Engineering Consultants, Inc.** : fondé en 2007 par investissement conjoint de la fondation CECI (China Engineering Consultants International, fondée en 1969)[^18]. **En 2010, Sinotech a été l'un des premiers du secteur à créer un centre d'intégration BIM**[^19], l'un des plus précoces de l'industrie taïwanaise. Près de 2 000 employés, dont 90 % possèdent des compétences en routes, chemins de fer, ports, aéroports, ponts, structures, tunnels, métros, architecture, mécanique, électricité et contrôle de systèmes, BIM, ITS, PPP, entre autres[^19].

**Sinotech Engineering Consultants (Zhongxing)** : fondé en 1970, transformé en organisation à but non lucratif en 1994, puis investi dans Sinotech Engineering Consultants Inc.[^20]. Zhongxing a développé le BIM dans un système appelé « **Système d'information de gestion de projet (PMIS)** » : basé sur l'esprit de l'environnement de données commun (CDE) de l'ISO 19650, il comprend sept modules principaux pour faciliter l'intégration de l'information entre spécialités et entre projets[^21].

**Evergreen Consulting Engineering (EGC)** : fondé en 1974. La conception structurelle de Taipei 101 et de la T&C Tower du 85e étage à Kaohsienne lui est attribuée[^22]. **Le CTBUH (Council on Tall Buildings and Urban Habitat) classe EGC parmi les dix plus grands bureaux d'études en structure de gratte-ciel au monde**[^22].

Du côté académique, deux moments clés :

**Centre de simulation et gestion de l'information en génie civil de l'Université nationale de Taïwan (NTUBIM)** : fondé en 2011, dirigé par le professeur **Shang-Hsien Hsieh** du département de génie civil. Le professeur associé **Jung-Chin Kuo**, cofondateur, a publié en décembre 2011 un article intitulé « **Le développement du BIM bouleverse le système architectural actuel** »[^23], qui reste l'un des textes fondateurs de la littérature académique sur le BIM à Taïwan. NTUBIM a ensuite pris en charge de nombreux projets de recherche mandatés par l'ABRI et le Comité des marchés publics, et a dirigé la rédaction des directives de travail collaboratif BIM et de la traduction en chinois de l'ISO 19650 à Taïwan.

**Association taïwanaise du BIM (TBIMA)** : issue des rencontres de passionnés de technologie BIM à Taïwan en 2009, préparée à partir de 2011, **officiellement enregistrée le 10 mars 2012** en tant qu'association auprès du Ministère de l'Intérieur[^3]. Les principaux membres de l'association provenaient des formateurs certifiés Autodesk Taiwan en 2008 : la lignée des organisations BIM non gouvernementales taïwanaises est directement issue du cercle des formateurs certifiés Autodesk.

> **📝 Note du conservateur**
> Lors de la cérémonie de signature du protocole d'accord du 3 octobre 2018[^5], cinq visages étaient assis autour de la table : BSI (British Standards Institution) Taïwan, NTUBIM de l'Université nationale de Taïwan, l'Institut taïwanais de recherche en construction, le Centre de construction de Taïwan et TBIMA. **L'Institut de recherche en architecture du Ministère de l'Intérieur était « organisme directeur » et non « signataire »**, un arrangement hiérarchique révélateur. Cela signifie que le gouvernement reconnaît qu'en matière de normes internationales BIM, il vaut mieux laisser les milieux académiques et les organisations non gouvernementales prendre la tête, et se retirer en second plan. La publication l'année suivante de la **version chinoise de l'ISO 19650** par le BSI[^24] était une petite affirmation de souveraineté douce : Taïwan disposait enfin de sa propre traduction officielle en chinois des normes internationales BIM.

---

## Revit, ArchiCAD, Tekla : les courants souterrains de la domination logicielle

![Capture d'écran d'Autodesk Revit 2024, montrant un mur de cloison simple avec portes et fenêtres dans un espace tridimensionnel, avec un panneau de propriétés d'éléments à gauche et des vues en plan, élévation et coupe synchronisées en temps réel en bas à droite, illustrant la nature de la modélisation orientée objet des logiciels BIM](/article-images/technology/autodesk-revit-2024-bim-objects.webp)
_Démonstration d'éléments BIM dans Autodesk Revit 2024. Photo : DanielDefault, 2024. [Licence via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Revit_2024.png)._

En entrant dans n'importe quel cabinet ayant adopté le BIM à Taïwan, l'écran de démarrage est à 90 % celui de Revit.

« **À Taïwan, 90 % des architectes (ayant des capacités de conception BIM) utilisent Revit Architecture** » — c'est le chiffre publié par un distributeur d'ArchiCAD sur son propre site web[^25]. Bien qu'il s'agisse d'une source unique, il correspond à la perception du secteur : Revit est en situation de quasi-monopole dans le domaine de la conception architecturale à Taïwan.

ArchiCAD, développé par la société hongroise Graphisoft, fonctionne sur Mac et Windows. Son intuition de conception et sa courbe d'apprentissage sont plus conviviales que celles de Revit, mais le nombre d'utilisateurs à Taïwan est nettement plus faible[^26]. Le distributeur Lung Ting Information a organisé de nombreuses démonstrations dans l'est de Taipei, et à chaque fois les designers disent : « Je sais utiliser Revit, le cabinet n'a que des licences Revit. » C'est l'effet de verrouillage par les économies d'échelle.

Le domaine des structures métalliques suit un autre axe. **Tekla Structures (produit de Trimble, anciennement XSteel) est actuellement le logiciel dominant pour la conception de structures métalliques à Taïwan**[^27]. Les capacités de Tekla en matière de structures métalliques sont reconnues par l'industrie pour les gratte-ciel, les ponts, les stades et les usines à Taïwan.

Les infrastructures (chemins de fer, routes, tunnels) se tournent vers le système MicroStation de Bentley Systems[^28]. CTCI, Zhongxing et Sinotech utilisent MicroStation avec OpenRoads / OpenBridge de Bentley pour les grands projets EPC en forfait global et les projets ferroviaires transnationaux.

Fonctionnant sur ces logiciels dominants, on trouve Dynamo d'Autodesk (programmation visuelle) et pyRevit (framework d'extension Python) en open source. **Début 2016, Autodesk Taiwan a fait venir spécialement de Singapour les instructeurs de l'équipe de R&D de Dynamo pour donner des cours à Taïwan**[^29], et depuis, Dynamo a attiré l'attention des ingénieurs BIM taïwanais. Un scénario typique : un ingénieur CVC écrit un script Dynamo pour trier automatiquement les coordonnées de tous les conduits de ventilation, vérifier les hauteurs libres et générer des vues en coupe — ce qui prenait une journée entière avec la CAO se fait maintenant en quelques minutes[^30].

La scène de la détection de conflits (clash detection) appartient à Autodesk Navisworks. Navisworks Manage intègre la navigation 3D, la détection de conflits, l'exportation de rapports, la simulation de planning 4D et les fonctions d'estimation 5D[^31]. Dans les projets de métro taïwanais, il existe un terme technique spécifique : **CSD / SEM** — CSD (Combined Service Drawing) est le plan combiné des services techniques, SEM (Structure / Electric / Mechanic) est le plan intégré structure/électricité/mécanique. La pratique traditionnelle utilisait la superposition de plans CAO et la vérification sur papier ; à l'ère du BIM, la détection de collisions se fait dans Navisworks, identifiant les points de conflit en 3D[^32].

L'expression « **intégration des plans CSD/SEM** » est désormais un service incontournable sur les sites web des cabinets de conseil BIM taïwanais.

---

## CTCI, Futsu, Daxin, Obayashi : ceux qui construisent Taïwan

![Scène de rue sur le chantier du Taipei Dome le 21 juin 2020 au matin, avec la coque en acier du Taipei Dome en construction au loin et un camion Hino 300 passant sur un passage piétons de la route Zhongxiao Est à proximité de la sortie 5 de la station de métro Sun Yat-sen Memorial Hall, illustrant la réalité de plus de dix ans de travaux du plus grand stade de Taïwan et le rôle de gestion de chantier d'Obayashi dans ce dôme en tubes d'acier circulaires de 65 000 tonnes](/article-images/technology/taipei-dome-construction-cheng-2020.webp)
_Chantier du Taipei Dome, 2020-08-16, sortie 5 de la station Sun Yat-sen Memorial Hall, route Zhongxiao Est. Photo : Cheng-en Cheng, 2020-08-16. [Licence via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg).\_

Les acteurs principaux du marché de la construction de grande envergure à Taïwan sont des entreprises de travaux en forfait global — qui ont touché au BIM plus tôt que les cabinets d'architectes et l'ont adopté comme outil de production.

En tête se trouve **CTCI Corporation (code boursier 9933)**. CTCI a été fondé en 1979 par investissement conjoint de la fondation CTCI (China Technical Service Corporation) avec la China Development Industrial Bank et la Central Investment Company[^33] — un contexte de création particulier : la fondation CTCI (China Technical Service Corporation), fondée en 1959, était un organisme de transfert de technologie au service du développement industriel taïwanais, qui a pris en charge de nombreux travaux de conseil technique pour des entreprises publiques comme CPC (Taiwan) durant l'essor de l'industrie pétrochimique dans les années 1970. En 1979, la fondation CTCI a scindé ses activités de conseil en ingénierie, donnant naissance à CTCI.

Les activités de CTCI couvrent l'**EPC** (Engineering, Procurement, Construction, conception/approvisionnement/construction en forfait global) : raffinage, pétrochimie, chimie, électricité, acier, stockage et transport, incinération, projets publics et ingénierie environnementale[^33]. En 2021, l'entreprise comptait 7 500 employés et avait établi des bureaux dans 15 pays[^33][^34]. Projet Amine en Arabie saoudite, projet de four de craquage d'éthylène de Saudi Kayan, projet MMA et PMMA de SAMAC — ces noms tracent la présence des entreprises EPC taïwanaises au Moyen-Orient au cours des 20 dernières années[^33].

En 2011, un événement a modifié la structure de l'actionnariat de CTCI : **la société japonaise Chiyoda Corporation a acquis des actions de CTCI, devenant son plus grand actionnaire**[^33]. La plus grande entreprise de travaux en forfait global de Taïwan a pour plus grand actionnaire un groupe japonais de construction chimique. Cette information est peu connue du grand public.

> **⚠️ Point de vue controversé**
> Les projets à l'étranger de grandes entreprises EPC comme CTCI ne sont pas sans controverse. En 2017, un projet EPC de CTCI pour une usine de traitement de gaz naturel en Inde a subi des retards importants et des créances douteuses, le groupe reconnaissant une « **faille fatale dans le contrôle des risques internationaux** »[^35]. La même année, l'abandon du projet de raffinerie de Guodang et les controverses persistantes sur la santé des résidents de la sixième raffinerie de Mailiao ont mis en lumière plusieurs projets pétrochimiques auxquels CTCI a participé. Le BIM a contribué à la précision technique de ces grands projets, mais la précision ne résout pas les problèmes politiques liés à la terre, au travail et à l'environnement.

Le marché des promoteurs privés comporte d'autres noms : **Futsu Construction** « ayant accumulé la plus grande surface de planchers de bâtiments de haute technologie, la plus grande expérience nationale en construction d'usines »[^36] ; **Daxin Engineering (2535)**, considéré comme « **l'entrepreneur attitré de TSMC** », ayant remporté l'ordre de travaux pour la structure supérieure de l'usine FAB 18P3 de TSMC à Tainan[^37]. Le département BIM de Daxin écrit dans ses présentations internes : « **Utiliser le BIM comme plateforme d'outil de base pour le développement, la planification, la conception et la coordination de l'intégration des projets de construction** »[^37] — mais cela ne représente qu'une petite partie des projets pris en charge par Daxin.

Deux entreprises étrangères ont une présence structurelle à Taïwan. **Obayashi Corporation Taïwan** est la filiale établie en 1989 à Taïwan par la société japonaise Obayashi Corporation (celle qui a construit la Tokyo Skytree), ayant réalisé l'intégralité de Taipei 101, la ligne Xinyi du métro de Taipei, le Terminal 3 de l'aéroport de Taoyuan et le **Taipei Dome**, entre autres[^38]. **La page « Profil de l'entreprise » du site web de la filiale taïwanaise d'Obayashi liste explicitement la « gestion des plans d'exécution et l'utilisation du BIM » comme éléments principaux de la gestion de chantier**[^38].

> **💡 Le saviez-vous ?**
> La structure métallique entière du Taipei Dome pèse 65 000 tonnes, ce qui en fait le seul dôme au monde entièrement construit en tubes d'acier circulaires[^39]. La conception de la structure métallique a été réalisée principalement dans Tekla Structures, puis le modèle a été importé dans Navisworks pour la détection de conflits avec les autres spécialités (CVC, incendie). **Sans BIM, un projet de structure métallique de cette envergure aurait été presque impossible à achever sans erreurs majeures** — c'est aussi pourquoi Obayashi a inscrit le BIM dans la liste des « éléments principaux de gestion de chantier » du profil de son entreprise.

---

## Pénurie de main-d'œuvre, vieillissement, travailleurs migrants : pourquoi la transformation numérique est inévitable

Transportons-nous sur un chantier ordinaire un matin : six heures et demie, les ouvriers arrivent progressivement. Plus de la moitié sont des « maîtres » de plus de 40 ans.

**Les statistiques sur les décès dus au travail du gouvernement de Nouveau Taipei montrent que, sur plus de 100 cas de décès, plus de 77 % concernent des personnes de plus de 40 ans**[^40]. Ce chiffre est déjà une évidence dans le milieu des ingénieurs civils. Le vieillissement de la main-d'œuvre dans le secteur de la construction taïwanaise est une réalité, pas une tendance en cours.

Le faible taux de natalité éloigne les jeunes de la construction. Les conditions de travail difficiles sur les chantiers, les salaires non compétitifs et le taux élevé d'accidents du travail — ces trois facteurs combinés rendent le recrutement de plus en plus difficile dans le secteur de la construction[^40]. En 2024, le Ministère du Travail a approuvé l'ouverture de 15 000 quotas de travailleurs migrants pour le secteur de la construction, et début 2026, ces quotas étaient « **presque entièrement attribués** »[^41].

C'est pourquoi la transformation numérique est devenue une nécessité incontournable pour le secteur de la construction.

**Les postes d'ingénieur BIM sont très demandés, le salaire de départ pour un débutant est de 35 000 à 45 000 dollars taïwanais, et les postes à plus de 50 000 dollars taïwanais par mois représentent 104 offres sur le site 1111 Job Bank**[^42]. Mais « forte demande » et « compétence » sont deux choses différentes — « **apprendre le BIM ne garantit pas nécessairement une augmentation significative de salaire, la plupart des gens choisissent des parcours d'apprentissage plus économiques** »[^43]. Le plafond de carrière pour les ingénieurs BIM n'est pas encore un consensus dans l'industrie.

Le problème structurel plus profond est que le BIM fait passer les architectes de la catégorie professionnelle du « **dessin** » à celle de « **l'intégrateur de systèmes** ». La modernisation des outils n'est que la surface.

Un architecte qui dessine avec AutoCAD dessine un ensemble de lignes bidimensionnelles. Il dessine des plans, des éléments et des coupes — chaque dessin est indépendant, et oublier de modifier la coupe après avoir modifié le plan est courant. Un ingénieur qui utilise Revit / BIM construit un modèle d'information : chaque ligne est liée à des matériaux, des spécifications, des fabricants, des prix, des séquences de construction et des cycles de maintenance[^44]. Quand le plan est modifié, les coupes et éléments se mettent à jour automatiquement.

Les architectes plus âgés regardent les jeunes ingénieurs BIM et disent « c'est l'affaire de la nouvelle génération », mais la raison réelle derrière cela est simple — **cette profession appartient désormais à un métier différent de celui d'« architecte » tel qu'ils l'ont connu en entrant dans l'industrie**.

> **✦** « **Les modèles BIM deviennent souvent un travail externalisé, déconnecté de la réalité du chantier, et de nombreux centres ou équipes BIM sont dissous** »[^45] — c'est l'observation du Centre de recherche BIM de l'Université nationale de Taïwan sur l'état actuel de la promotion du BIM à Taïwan.

---

## Un protocole comme l'USB-C : la clé par laquelle Anthropic a connecté l'IA à Revit

Le 25 novembre 2024, Anthropic a open-sourcé un protocole appelé **Model Context Protocol (MCP)**[^46].

L'annonce originale était formulée en termes scientifiques : « **MCP is an open standard, open-source framework introduced by Anthropic to standardize the way artificial intelligence (AI) systems like large language models (LLMs) integrate and share data with external tools, systems, and data sources** »[^47]. L'explication d'Anthropic était plus accessible : « **Think of MCP like a USB-C port for AI applications** »[^46] — tout comme l'USB-C a unifié la connexion des appareils, MCP vise à unifier le protocole de connexion entre l'IA et les sources de données et outils.

Parallèlement à l'annonce de MCP, des SDK Python, TypeScript, C# et Java ont été publiés, ainsi que des serveurs MCP préconstruits pour Google Drive, Slack, GitHub, Git, Postgres et Puppeteer[^46].

Ce qui s'est passé ensuite, personne ne l'avait prévu en termes de vitesse.

Le 10 décembre 2025, un développeur nommé **CHIANG SHUOTAO** a publié sur GitHub un dépôt nommé `REVIT_MCP_study`[^48]. La description du dépôt ne comptait que huit mots en anglais : « LEARN HOW TO BUILD UP YOUR REVIT MCP ». Répartition linguistique : **C# 54,2 %, JavaScript 18,7 %, PowerShell 14,3 %, TypeScript 7,0 %, HTML 3,3 %, Shell 1,2 %**[^48]. En mai 2026, ce dépôt personnel avait accumulé **73 étoiles et 85 fork**[^6].

La page GitHub personnelle de Shuotao indique « Tokyo » comme localisation, mais le README et tous les documents pédagogiques sont en chinois traditionnel, avec un contenu qui fait largement écho aux flux de travail de l'industrie de la construction taïwanaise. Ses dépôts connexes — `CAD_MCP_study`, `NAVISWORK_MCP`, `IFCSH` — constituent une série d'expérimentations open source personnelles à l'intersection de BIM × MCP × IA[^49].

Comment interpréter ce cas ?

Ce n'est pas « Taïwan a son propre BIM_MCP » — le dépôt de Shuotao fait partie du même écosystème que les projets internationaux `mcp-servers-for-revit/revit-mcp` et le serveur MCP natif de Revit 2027 d'Autodesk[^7][^50]. Sa signification est la suivante : **un développeur taïwanais, moins de 13 mois après l'annonce de MCP par Anthropic, a créé un projet pédagogique open source de plus de soixante-dix étoiles, ramenant la pratique internationale de Revit MCP vers la communauté sinophone**.

Quatre mois plus tard, **en avril 2026, Autodesk a annoncé l'intégration d'un serveur MCP natif et d'Autodesk Assistant dans Revit 2027**[^7]. Le nouvel Autodesk Assistant peut faire des choses comme : « **trouver toutes les pièces sans étiquette CVC** », « **définir la résistance au feu de toutes les portes de la Phase 2 à 90 minutes** », « **générer toutes les vues de plomberie de cet étage** »[^7] — manipuler Revit en langage naturel.

Ce qui nécessitait un ou deux ans d'apprentissage de Revit peut maintenant être accompli en prononçant une phrase en chinois (ou en anglais).

> **📝 Note du conservateur**
> En alignant les chronologies : du lancement de la plateforme BIM du Comité des marchés publics le 23 mai 2014 à l'open-sourcing de MCP par Anthropic le 25 novembre 2024, **10 ans et 6 mois se sont écoulés**. Pendant ces 10 ans de promotion gouvernementale du BIM, Taïwan est passé de « encourager les projets pilotes » à « au cas par cas », sans jamais atteindre l'obligation. Entre l'open-sourcing de MCP par Anthropic et l'annonce du serveur MCP natif dans Autodesk Revit 2027, **seuls 17 mois se sont écoulés**. La vitesse à laquelle une plateforme technologique réécrit l'adoption industrielle dépasse de loin celle de la promotion politique. **La vraie différence réside dans la structure des deux modes de promotion** — la promotion obligatoire nécessite de coordonner des centaines de parties prenantes, d'équilibrer des dizaines de lobbying industriels et d'ajuster plusieurs lois ; la promotion par plateforme ne nécessite que d'open-sourcer le SDK et de rédiger une bonne documentation. Voir cette structure clairement est plus important que de se plaindre du gouvernement ou de vénérer l'IA.

---

## Du dessin à l'intégration de systèmes : une redéfinition professionnelle inachevée

Ramenons la caméra aux cabinets d'architectes des années 1990.

À cette époque, les murs des cabinets étaient couverts de tables à dessin, de règles T, de stylos techniques et de tireuses de plans au bleu. Pour dessiner un plan, l'architecte traçait des lignes au stylo technique sur un grand format A1, puis envoyait le plan à la tireuse pour faire des copies — la machine bourdonnait, et les tirages au bleu à fond bleu et lignes blanches sortaient lentement de l'autre côté. Modifier un détail nécessitait de redessiner l'ensemble du plan.

AutoCAD a publié sa version Classic Mac OS en 1992 et sa version Microsoft Windows en 1993[^51], et les cabinets d'architectes taïwanais ont massivement adopté la CAO à partir du milieu des années 1990. La douleur de la transition a duré environ dix ans — les architectes plus âgés résistaient, les jeunes designers adhéraient, et le cabinet se divisait en deux camps : ceux qui dessinaient « sur CAO » et ceux qui dessinaient « sur la table ».

Le passage d'AutoCAD à Revit a été la deuxième transition. **Autodesk n'a associé Revit au terme « Building Information Modeling » qu'en 2002**[^52] — autrement dit, l'intervalle entre le passage du dessin manuel à la CAO et le passage de la CAO au BIM est d'environ vingt ans. Mais la douleur de la transition BIM est plus profonde que celle de la transition CAO, car cette fois le niveau d'exigence passe du remplacement d'outil à la **restructuration du mode de pensée**.

La CAO numérise vos lignes. Le BIM exige que vous systématisiez l'ensemble des informations du bâtiment. Un mur devient un objet de données : « mur de cloison de l'espace de bureau de la zone A du 2e étage, matériau : double plaque de plâtre de 12 mm sur ossature métallique légère de 75 mm, résistance au feu 1 heure, fabricant XX, coût YY, séquence de construction après le passage des gaines CVC », et non plus deux lignes parallèles.

L'intégration inter-spécialités change également. Dans le processus traditionnel, l'architecte dessine ses plans, l'ingénieur structure dessine ses plans, l'ingénieur CVC dessine ses plans, et les trois jeux de plans sont superposés sur le chantier où les conflits sont découverts — un conduit de ventilation traversant une poutre, un tuyau de drainage heurtant un poteau de structure. Dans le processus BIM, la superposition des plans se fait dans le même modèle tridimensionnel dès la phase de conception, et la détection de collisions et l'examen des conflits sont réalisés sur ordinateur[^32].

L'expression « **réduire les conflits d'interfaces de conception** » apparaît dans les rapports de résultats de toutes les études de cas BIM taïwanaises[^14][^15]. Mais le changement professionnel derrière ces six mots est le suivant : la structure de pouvoir entre architectes, ingénieurs structure, ingénieurs CVC et entreprises de construction est en train de se redistribuer. **Autrefois, l'architecte était l'auteur unique de la phase de conception ; à l'ère du BIM, la conception est une intégration de systèmes collaborative multipartite**.

Cette redéfinition professionnelle n'est pas achevée.

> **✦** « **Les maîtres d'ouvrage manquent souvent de connaissance suffisante de l'application du BIM et travaillent fréquemment selon les processus de construction traditionnels, limitant ainsi l'efficacité de la technologie BIM** »[^53] — c'est l'observation la plus directe du BSI concernant le côté maître d'ouvrage à Taïwan. Le goulot d'étranglement de la promotion du BIM se situe du côté du maître d'ouvrage ; que l'ingénieur sache ou non utiliser le BIM est secondaire.

---

## Ce qui vient ensuite

En mai 2026, la situation du BIM à Taïwan est la suivante :

- Le gouvernement central a promu le BIM pendant 12 ans, toujours « au cas par cas », sans obligation générale[^2]
- Taipei et Nouveau Taipei exigent des modèles BIM au niveau du permis de construire depuis 2014 / 2018, mais les normes départementales et municipales diffient[^4][^11]
- Les grands bureaux d'études (Sinotech, Zhongxing, EGC) et les grandes entreprises de construction (CTCI, Futsu, Daxin, Obayashi) utilisent tous le BIM, et les postes d'ingénieur BIM sont très demandés[^17][^19][^33][^42]
- La plupart des cabinets d'architectes de petite et moyenne taille utilisent encore principalement AutoCAD, le taux de pénétration du BIM est estimé à un chiffre pourcentage[^43][^45]
- 17 mois après l'open-sourcing de MCP par Anthropic en novembre 2024, Autodesk a annoncé l'intégration d'un serveur MCP natif dans Revit 2027[^7][^46]
- Un développeur taïwanais a créé un dépôt pédagogique Revit MCP de 73 étoiles, ramenant l'écosystème international vers la communauté sinophone[^6][^48]

En reliant ces six points, **le BIM à Taïwan est l'histoire d'une profession en train d'être redéfinie de l'extérieur par une plateforme technologique**, encore loin de la maturité d'une industrie. La vitesse de promotion gouvernementale ne suit pas l'itération technologique, la vitesse d'adoption par le secteur privé ne suit pas le vieillissement démographique, et l'industrie de la construction taïwanaise est simultanément tirée par trois forces : les praticiens traditionnels vieillissants, les chantiers en pénurie de main-d'œuvre et les outils de nouvelle génération IA × BIM.

Dans la prochaine décennie, le métier d'« architecte » à Taïwan pourrait ne plus ressembler à ce qu'il est aujourd'hui. La partie dessin sera confiée à l'IA — une phrase comme « **définir la résistance au feu de toutes les portes de la Phase 2 à 90 minutes** »[^7] suffira pour modifier l'ensemble des portes d'un projet. Le travail de l'architecte se rapprochera davantage de celui d'« **intégrateur de systèmes** », de « **traducteur entre le maître d'ouvrage et la technologie** », de « **curateur de collaborations multipartites** ».

Le 23 mai 2014, lors de la première réunion de la plateforme BIM du Comité des marchés publics, la gare de Miaoli du TGV taïwanais n'était pas encore construite. Le 26 avril 2026, le jour où Autodesk a annoncé l'intégration d'un serveur MCP natif dans Revit 2027, la prochaine usine de TSMC à Kaohsienne était déjà en préparation avec des plans entièrement en BIM. Douze ans de « au cas par cas » ont mené à un endroit que personne n'avait prévu — un protocole open-sourcé depuis les bureaux d'Anthropic en Californie a réécrit la courbe d'adoption de l'ensemble de l'industrie depuis le côté plateforme, contournant la voie principale de l'obligation gouvernementale.

Le jour où Shuotao a publié `REVIT_MCP_study` sur GitHub en décembre 2025[^48], exactement 11 ans et 7 mois s'étaient écoulés depuis le lancement de la plateforme BIM du Comité des marchés publics. Pendant ces douze années intermédiaires, l'industrie de la construction taïwanaise a parcouru un long chemin, du tracé manuel et tirage de plans au bleu aux modèles 3D, des expérimentations individuelles aux normes nationales, de la modernisation des outils à la redéfinition des professions. **Ce chemin n'est pas terminé — mais la direction de la prochaine étape ne dépend plus entièrement du gouvernement taïwanais**.

---

**Pour aller plus loin** :

- [Architecture taïwanaise](/fr/art/taiwanese-architecture) — récit culturel de l'architecture, des maisons en pierre aux gratte-ciel, cet article est le volet jumeau de la numérisation technique du présent texte
- [Logement social et justice du logement](/fr/society/social-housing-and-housing-justice) — l'application du BIM à la gestion de la maintenance du logement social est un axe prioritaire des récents plans de l'Institut de recherche en architecture du Ministère de l'Intérieur
- [Entreprise taïwanaise : TSMC](/fr/economy/tsmc) — l'application du BIM dans les usines de TSMC est le principal champ d'application concret pour des entreprises de construction comme Futsu et Daxin
- [Développement de l'IA à Taïwan](/fr/technology/ai-development-in-taiwan) — MCP d'Anthropic et serveur MCP natif dans Revit 2027 sont un cas concret d'IA × industrie
- [Industrie des semi-conducteurs](/fr/technology/taiwan-semiconductor-industry) — solutions d'ingénierie globale pour les usines de fabrication de semi-conducteurs + construction intelligente BIM constituent la base technique de l'expansion des pôles de semi-conducteurs

## Sources des images

Cet article utilise 3 images sous licence CC de Wikimedia Commons, toutes mises en cache dans `public/article-images/technology/` pour éviter les liens directs vers les serveurs sources :

- [FreeCAD 1.0 Dark BIM Example](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png) — Photo : Maxwxyz, 2024-10-07, CC BY 4.0 (image d'en-tête : présentation du modèle 3D d'un outil BIM open source)
- [Autodesk Revit 2024 物件示範](https://commons.wikimedia.org/wiki/File:Revit_2024.png) — Photo : DanielDefault, 2024, CC BY-SA 4.0 (image intégrée : écran de modélisation orientée objet dans Revit)
- [Taipei Dome and Hino 300 BEM-5593](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg) — Photo : Cheng-en Cheng, 2020-08-16, CC BY-SA 2.0 (image intégrée : chantier du Taipei Dome avec 65 000 tonnes de structure métallique en cours de montage)

La matrice complète des licences médiatiques est documentée dans [`reports/research/2026-05/台灣BIM與營建科技.md`](../../reports/research/2026-05/台灣BIM與營建科技.md) § trois tableaux de la matrice des licences médiatiques.

## Références

[^1]: [Comité des marchés publics du Yuan exécutif de la République de Chine : Section spéciale sur la modélisation des informations du bâtiment (BIM) dans les projets publics](https://www.pcc.gov.tw/content/index?eid=1345&type=C) — Page officielle de la plateforme de promotion du BIM du Comité des marchés publics, documentant la fondation du 23 mai 2014 et la stratégie de promotion en trois phases « projets pilotes encouragés / mise en œuvre pilote / promotion des projets publics dépassant un certain montant à partir de l'année 106 ».

[^2]: [Plateforme de participation politique publique du Bureau de l'audit : Consultation sur la stratégie de promotion du BIM par le Comité des marchés publics](https://cy.join.gov.tw/policies/detail/8e95c8d6-ce87-4e05-afce-c46a33eb6f89) — Page de consultation ouverte du Bureau de l'audit, documentant le principe de promotion « au cas par cas, progression graduelle », non obligatoire de manière générale ; statistiques officielles de plus de 60 organismes de passation de marchés publics utilisant le BIM et plus de 120 projets.

[^3]: [Site officiel de l'Association taïwanaise du BIM (TBIMA)](https://sites.google.com/view/tbima) — Site officiel de l'association enregistrée auprès du Ministère de l'Intérieur, documentant l'origine en 2009, la préparation en 2011, l'enregistrement officiel le 10 mars 2012 et la provenance des principaux membres du cercle des formateurs certifiés Autodesk Taiwan en 2008.

[^4]: [Direction du développement urbain de la ville de Taipei : Spécifications pour les données attributaires des modèles as-built BIM des projets de construction v2.0](https://udd.gov.taipei/assets/50-10660/Documents/竣工模型屬性資料作業規範v2.0_20181109_new.pdf) — Spécifications officielles publiées par la Direction du développement urbain de Taipei le 9 novembre 2018, faisant référence au format international COBie et exigeant l'exportation de données standard IFC.

[^5]: [BSI signe un protocole d'accord avec le « Taiwan BIM Task Group » avec les secteurs industriel, gouvernemental, académique et de la recherche](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2018-/october/bsitaiwan-bim-task-group/) — Communiqué de presse du BSI Taïwan du 3 octobre 2018, documentant les cinq signataires (BSI, NTUBIM de l'Université nationale de Taïwan, Institut taïwanais de recherche en construction, Centre de construction de Taïwan, TBIMA) et le rôle directeur de l'Institut de recherche en architecture du Ministère de l'Intérieur.

[^6]: [Dépôt GitHub shuotao/REVIT_MCP_study](https://github.com/shuotao/REVIT_MCP_study) — Projet pédagogique open source personnel de CHIANG SHUOTAO (Shuotao) sur Revit MCP, créé en décembre 2025, ayant accumulé 73 étoiles et 85 fork en mai 2026, avec une répartition linguistique de C# 54,2 % + JavaScript 18,7 % + PowerShell 14,3 %.

[^7]: [Blog des développeurs Autodesk : Agents API Revit, MCP, Copilot et Codex](https://blog.autodesk.io/revit-api-agents-mcp-copilot-and-codex/) — Annonce du blog officiel des développeurs Autodesk d'avril 2026, documentant l'intégration d'un serveur MCP natif + Autodesk Assistant dans Revit 2027 prenant en charge la manipulation du modèle Revit en langage naturel.

[^8]: [ONC Lawyers : Adoption du BIM et ses implications juridiques pour l'industrie de la construction](https://www.onc.hk/zh_HK/publication/adoption-of-bim-and-its-legal-complications-for-the-construction-industry) — Article d'un cabinet d'avocats de Hong Kong, documentant la politique du Bureau du développement de Hong Kong imposant le BIM pour les projets dont l'estimation des coûts dépasse 30 millions de dollars HK.

[^9]: [Institut de recherche en architecture et bâtiment du Ministère de l'Intérieur de la République de Chine : Plan de promotion de l'application du BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=315634) — Page officielle du plan de l'ABRI, documentant le plan quadriennal de 2015 (année 104) et le deuxième plan quadriennal de 2019 (année 108) avec leurs objectifs et périmètres.

[^10]: [Institut de recherche en architecture du Ministère de l'Intérieur : Étude sur les résultats du développement et de l'application du BIM et plan de promotion](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39612) — Rapport de recherche mandaté par l'ABRI, documentant les deux grands objectifs du deuxième plan « modernisation numérique des techniques de construction » + « environnement d'habitation numérique » et la direction de l'intégration BIM × SIG × IoT pour les villes numériques.

[^11]: [Bureau des travaux publics du gouvernement de Nouveau Taipei : Système d'assistance informatisée à l'examen des permis de construire](https://www.bim.ntpc.gov.tw/) — Site officiel du système d'examen des permis de construire BIM du gouvernement de Nouveau Taipei, documentant le premier permis de construire validé par un modèle BIM en 2014, plus de 20 modèles BIM achevés accumulés et les « Directives pour la remise des informations du modèle as-built BIM des bâtiments publics de Nouveau Taipei ».

[^12]: [buildingSMART International : Industry Foundation Classes (IFC)](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) — Page de la norme IFC sur le site officiel de buildingSMART International, documentant la norme internationale ISO 16739-1:2024 et les cas d'adoption internationale comme l'obligation danoise d'utiliser l'IFC pour les projets de construction publics depuis 2010.

[^13]: [Institut de recherche en architecture du Ministère de l'Intérieur : Rapport de résultats du plan de promotion de l'application du BIM (année 112)](https://ws.moi.gov.tw/001/Upload/404/relfile/9489/315634/0cccc6e2-2dc6-496f-a45f-69b60e2811b1.pdf) — Rapport de résultats 2023 (année 112) de l'ABRI, reconnaissant que « la plupart des applications BIM dans le secteur public se concentrent sur les phases de conception et de construction, et que la gestion opérationnelle reste traditionnelle ».

[^14]: [Bureau de l'ingénierie du métro du gouvernement de Nouveau Taipei : Application du BIM sur la ligne Wan-Ta du métro](https://www.dorts.ntpc.gov.tw/documentary/articleInfo/P9z2zp0nZrDp?page=216) — Article de la collection d'ingénierie du Bureau du métro de Nouveau Taipei, documentant que la ligne Wan-Ta du métro de Taipei est « le premier projet public à inclure le BIM dans le contrat » et la réduction des conflits d'interfaces de conception.

[^15]: [Flow BIM Service : Partage de cas de bâtiments commerciaux intelligents](https://bim.flow.tw/smartoffice-globalshowcase/) — Partage de cas par le cabinet de conseil BIM Flow (Ruoshui International), citant les données spécifiques de l'application du BIM à la gare de Miaoli du TGV taïwanais : « économie de 20 % des coûts de modifications de conception, début des travaux deux mois plus tôt ».

[^16]: [Liberty Times Finance : Terminal 3 de l'aéroport de Taoyuan attribué — consortium Samsung C&T et Rong Gong Engineering remporte l'appel d'offres pour 44,5 milliards de dollars taïwanais](https://ec.ltn.com.tw/article/breakingnews/3414669) — Communiqué de presse du Liberty Times de mars 2021, documentant l'attribution des travaux de génie civil du bâtiment principal du Terminal 3 de l'aéroport de Taoyuan au consortium formé par Samsung C&T et Rong Gong Engineering.

[^17]: [iThome : L'industrie de la construction utilise le BIM pour réaliser des jumeaux numériques de bâtiments — cas de Sinotech Engineering Consultants](https://www.ithome.com.tw/people/137308) — Reportage approfondi d'iThome de 2021, interviewant l'ingénieur en chef Lin Yao-tsang de Sinotech, documentant les cas de cycle de vie complet BIM de Sinotech (gare de Fengshan, tunnel de Bagua Mountain, etc.) et le processus BIM de collaboration transnationale pour le Terminal 3 de l'aéroport de Taoyuan.

[^18]: [Fondation China Engineering Consultants International (CECI) : 50 événements marquants](https://www.ceci.org.tw/modules/article-content.aspx?s=13&i=226) — Chronologie du 50e anniversaire sur le site officiel de CECI, documentant la fondation en 1969 et l'investissement dans la création de Sinotech Engineering Consultants, Inc. en 2007.

[^19]: [Sinotech Engineering Consultants, Inc. : Profil de l'entreprise](https://www.104.com.tw/company/d1w3jw0) — Page d'emploi 104 de Sinotech, documentant près de 2 000 employés dont 90 % possèdent des compétences professionnelles en routes, chemins de fer, aéroports, ponts, BIM, ITS, PPP, et la création précoce d'un centre d'intégration BIM en 2010.

[^20]: [Fondation Sinotech Engineering Consultants : Vers le 50e anniversaire de Sinotech Engineering](https://50th-anniversary.sinotech.org.tw/about_ltd.html) — Site officiel du 50e anniversaire de la Fondation Sinotech Engineering Consultants, documentant la fondation en 1970, la transformation en OBNL en 1994 et l'investissement dans Sinotech Engineering Consultants Inc.

[^21]: [Autodesk University : Conception et application de la plateforme de travail collaboratif BIM de Sinotech Engineering](https://www.autodesk.com/autodesk-university/class/zhongxinggongchengBIMxietongzuoyepingtaizhishejiyuyingyong-2020) — Présentation technique Autodesk University 2020, documentant l'architecture technique du module de suivi des problèmes BIM et des sept modules principaux du PMIS construits par Sinotech Engineering sur la base de l'environnement CDE de l'ISO 19650.

[^22]: [Site officiel d'Evergreen Consulting Engineering (EGC)](https://www.egc.com.tw/) — Site officiel d'EGC, documentant la fondation en 1974, plus de 80 professionnels, la conception structurelle de Taipei 101 et de la T&C Tower du 85e étage à Kaohsienne, et le classement parmi les dix plus grands bureaux d'études en structure de gratte-ciel au monde par le CTBUH.

[^23]: [Centre de recherche BIM de l'Université nationale de Taïwan : Le développement du BIM bouleverse le système architectural actuel (Kuo Jung-chin, décembre 2011)](https://www.ntubim.net/bim2356027396/bim-201112) — Texte académique fondateur de la littérature académique BIM à Taïwan, l'un des représentants de la littérature académique BIM taïwanaise publiée par le professeur associé Kuo Jung-chin en 2011.

[^24]: [BSI : Contribution à la digitalisation de l'industrie de la construction — le Taiwan BIM Task Group publie la norme internationale BIM « ISO 19650 version chinoise »](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2019/20197/iso-19650-tw-standard-launch/) — Communiqué de presse du BSI de 2019, documentant la publication de la version chinoise de l'ISO 19650, la supervision par le directeur Wang Jung-chin de l'Institut de recherche en architecture du Ministère de l'Intérieur et l'assistance à la traduction par le NTUBIM de l'Université nationale de Taïwan.

[^25]: [BIM-API : Scripts PyRevit + Dynamo](https://www.bim-api.com/en/blog/pyrevit-dynamo-scripts/) — Article de blog BIM-API, documentant le chiffre de l'observation industrielle selon lequel « à Taïwan, 90 % des architectes (ayant des capacités de conception BIM) utilisent Revit Architecture ».

[^26]: [Site officiel du distributeur Graphisoft ArchiCAD Lung Ting Information](https://www.academicd.com/) — Site officiel du distributeur Graphisoft Taïwan Lung Ting Information, documentant les ressources de support commercial et de formation pour ArchiCAD à Taïwan, positionné comme « un logiciel BIM plus convivial que Revit ».

[^27]: [BIM Explorer : Partage d'expérience avec Tekla Structures](https://tpuaup.blogspot.com/2013/05/tekla-structures.html) — Article de blog BIM, documentant que Tekla Structures est le logiciel dominant pour la conception de structures métalliques à Taïwan et son utilisation pour les structures métalliques complexes (stades, ponts, usines).

[^28]: [OITC Technology : Conception d'infrastructures avec MicroStation](https://www.oitc.com.tw/products-detail/MicroStation/79) — Site officiel du distributeur Bentley MicroStation à Taïwan, documentant le champ d'application de MicroStation dans les projets d'infrastructures taïwanais (chemins de fer, routes, tunnels, ponts).

[^29]: [BIM+ Studio de l'Académie de l'architecture numérique : Cours de base Dynamo pour l'architecture](https://bimstudio.tabc.org.tw/blogs/bim%E7%9F%A5%E8%AD%98%E5%BA%AB/49627) — Présentation de cours du BIM+ Studio du Centre de construction de Taïwan, documentant le moment clé du début 2016 où Autodesk Taiwan a fait venir de Singapour les instructeurs de l'équipe de R&D de Dynamo pour donner des cours à Taïwan.

[^30]: [WeBIM Services : Comment Dynamo transforme le monde de Revit](https://webim.com.tw/en/tech-en/dynamo-application-webim-3/) — Article technique de WeBIM, documentant des cas d'application concrets de Dynamo parmi les ingénieurs BIM taïwanais (tri des coordonnées des conduits de ventilation, vérification des hauteurs libres, génération automatique de vues en coupe).

[^31]: [Vue d'ensemble du produit Autodesk Navisworks](https://www.quickly.com.tw/autodesk/navisworks.php) — Site officiel du distributeur Autodesk Taiwan Quickly, documentant les fonctions complètes de Navisworks Manage intégrant la navigation 3D, la détection de conflits, l'exportation de rapports, la simulation de planning 4D et l'estimation 5D.

[^32]: [airitiLibrary : Développement et application de l'automatisation de la conception CSD/SEM pour le métro assistée par BIM](https://www.airitilibrary.com/Article/Detail/0257554X-202107-202107290004-202107290004-77-85) — Article de revue académique sur airitiLibrary, documentant la méthodologie d'intégration BIM pour les CSD (Combined Service Drawing) et SEM (Structure / Electric / Mechanic) dans les projets de métro taïwanais.

[^33]: [Groupe CTCI — Wikipédia](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E9%BC%8E%E9%9B%86%E5%9C%98) — Entrée Wikipédia du Groupe CTCI, documentant la fondation en 1979 par investissement conjoint de la fondation CTCI avec la China Development Industrial Bank et la Central Investment Company, l'acquisition par la société japonaise Chiyoda Corporation du statut de plus grand actionnaire en 2011, 7 500 employés (2021), et les grands projets EPC à l'étranger (Amine en Arabie saoudite, Saudi Kayan, SAMAC MMA).

[^34]: [Site officiel du Groupe CTCI](https://www.ctci.com/www/ctci2022/page.aspx?L=CH) — Site officiel de CTCI Engineering, documentant les activités d'ingénierie en forfait global, le modèle EPC et la présence dans 15 pays.

[^35]: [Crossing : La crise des créances douteuses massives de CTCI à l'étranger révèle une faille fatale dans le « contrôle des risques internationaux » des entrepreneurs généraux taïwanais](https://crossing.cw.com.tw/article/19832) — Reportage approfondi de Crossing (CommonWealth), documentant l'événement controversé du projet EPC de CTCI pour une usine de traitement de gaz naturel en Inde ayant subi des retards importants et des créances douteuses en 2017.

[^36]: [Futsu Construction Co., Ltd. : Réalisations en bâtiments de haute technologie](https://www.futsu.com.tw/p_hitech.html) — Page des bâtiments de haute technologie du site officiel de Futsu Construction, documentant l'affirmation officielle « ayant accumulé la plus grande surface de planchers de bâtiments de haute technologie, la plus grande expérience nationale en construction d'usines ».

[^37]: [Daxin Engineering : Expérience BIM](https://www.dacin.com.tw/bim/) — Page d'expérience BIM du site officiel de Daxin Engineering, documentant l'affirmation officielle « utiliser le BIM comme plateforme d'outil de base pour le développement, la planification, la conception et la coordination de l'intégration des projets de construction ».

[^38]: [Obayashi Taïwan : Profil de l'entreprise](https://www.obayashi.com.tw/topic/about/preview/3250113421819124234) — Site officiel d'Obayashi Corporation Taïwan, documentant la fondation en 1989, la société mère Obayashi Corporation (constructeur de la Tokyo Skytree), et l'inscription de la « gestion des plans d'exécution et l'utilisation du BIM » comme éléments principaux de la gestion de chantier.

[^39]: [Taipei Dome — Wikipédia](https://zh.wikipedia.org/zh-tw/%E8%87%BA%E5%8C%97%E5%A4%A7%E5%B7%A8%E8%9B%8B) — Entrée Wikipédia du Taipei Dome, documentant la surface de planchers totale de 120 000 mètres carrés, le poids total de la structure métallique de 65 000 tonnes et la spécification technique du seul dôme au monde entièrement construit en tubes d'acier circulaires.

[^40]: [United Daily News : Des ouvriers « de grand-père » soutiennent le secteur — les techniques de la construction font face à une rupture générationnelle](https://udn.com/news/story/124689/9220106) — Reportage d'investigation de United Daily News, documentant la réalité du vieillissement de l'industrie de la construction avec plus de 77 % des plus de 100 décès dus au travail à Nouveau Taipei concernant des personnes de plus de 40 ans.

[^41]: [Liberty Times : Pénurie de main-d'œuvre à l'échelle nationale ! Les 15 000 quotas de travailleurs migrants pour la construction sont presque épuisés](https://estate.ltn.com.tw/article/21452) — Reportage économique du Liberty Times, documentant la crise structurelle de la main-d'œuvre avec les 15 000 quotas de travailleurs migrants pour la construction approuvés par le Ministère du Travail en 2024-2026, presque entièrement attribués.

[^42]: [1111 Job Bank : Résultats de recherche pour les postes d'ingénieur BIM à plus de 50 000 $/mois](https://www.1111.com.tw/search/job?page=1&col=ab&sort=desc&ks=bim,%E7%B9%AA%E5%9C%96&st=1&sa0=50000*) — Page de recherche d'emplois d'ingénieur BIM sur 1111 Job Bank, documentant 104 postes à plus de 50 000 $/mois et les salaires de départ de 35 000 à 45 000 $ pour les débutants.

[^43]: [Pourquoi le BIM a-t-il du mal à s'implanter à Taïwan ? Quatre phases révèlent la vérité et les opportunités](https://engineeringlifetw.com/whynotbim/) — Article d'analyse approfondie du blog工地人生 (Vie de chantier), documentant les résistances culturelles à la promotion du BIM à Taïwan : « la réglementation gouvernementale de la construction était basée sur la CAO, les processus industriels suivaient la CAO, les modèles BIM sont devenus un travail externalisé, de nombreux centres ou équipes BIM ont été dissous ».

[^44]: [Verakey Engineering : Qu'est-ce que le BIM ? Analyse complète des 5 principaux avantages du BIM](https://veracityconsultant.com.tw/what-is-bim/) — Site officiel du cabinet de conseil BIM Verakey, expliquant la nature de la transformation numérique de l'ingénierie que représente le BIM en systématisant l'information du bâtiment (matériaux, spécifications, fabricants, prix, séquences de construction, cycles de maintenance).

[^45]: [Institut de recherche en architecture du Ministère de l'Intérieur de la République de Chine : Plan de promotion de l'application du BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39506) — Page du plan de l'ABRI, documentant l'autodiagnostic de l'état actuel de la promotion du BIM à Taïwan : « les modèles BIM sont devenus un travail externalisé, déconnecté de la réalité du chantier, de nombreux centres ou équipes BIM ont été dissous ».

[^46]: [Anthropic : Présentation du Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Annonce officielle d'Anthropic du 25 novembre 2024 open-sourçant le Model Context Protocol (MCP), décrivant « Think of MCP like a USB-C port for AI applications » et les SDK Python / TypeScript / C# / Java publiés simultanément.

[^47]: [Wikipedia : Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol) — Entrée Wikipédia en anglais sur le MCP, documentant l'open-sourcing par Anthropic le 25 novembre 2024 et le don du MCP par Anthropic à l'Agentic AI Foundation (sous la Linux Foundation) en décembre 2025.

[^48]: [Page personnelle GitHub de shuotao](https://github.com/shuotao) — Page personnelle GitHub de CHIANG SHUOTAO, documentant la localisation Tokyo et les dépôts de la série d'expérimentations open source BIM × MCP × IA (CAD_MCP_study, NAVISWORK_MCP, IFCSH, etc.).

[^49]: [Dépôt GitHub shuotao/CAD_MCP_study](https://github.com/shuotao/CAD_MCP_study) — Projet pédagogique open source CAD × MCP de Shuotao, faisant partie de la série d'expérimentations open source personnelles BIM × MCP × IA avec REVIT_MCP_study et NAVISWORK_MCP.

[^50]: [Architosh : Autodesk Revit 2027 — Grandes nouveautés en IA et graphismes](https://architosh.com/2026/04/autodesk-revit-2027-big-new-ai-and-graphics-changes/) — Reportage d'avril 2026 du média spécialisé en logiciels d'architecture Architosh, documentant en détail les fonctions et l'architecture spécifiques du serveur MCP natif + Autodesk Assistant dans Autodesk Revit 2027.

[^51]: [AutoCAD — Wikipédia](https://en.wikipedia.org/wiki/AutoCAD) — Entrée Wikipédia en anglais sur AutoCAD, documentant la chronologie historique du premier lancement sur les plateformes CP/M et IBM PC en décembre 1982, la version Classic Mac OS en 1992 et la version Microsoft Windows en 1993.

[^52]: [Modélisation des informations du bâtiment — Wikipédia](https://zh.wikipedia.org/zh-tw/%E5%BB%BA%E7%AF%89%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9E%8B) — Entrée Wikipédia en chinois traditionnel sur le BIM, documentant l'historique du développement académique : première proposition en 1975, recherches de chercheurs finlandais et américains dans les années 1980, introduction du terme « Building Information Modeling » par Autodesk en 2002.

[^53]: [BSI Taïwan : La valeur commerciale de la modélisation des informations du bâtiment (BIM)](https://www.bsigroup.com/zh-TW/insights-and-media/insights/blogs/business-value-of-building-information-modelling-bim/) — Blog officiel du BSI Taïwan, documentant l'observation du problème structurel côté maître d'ouvrage : « les maîtres d'ouvrage manquent souvent de connaissance suffisante de l'application du BIM et travaillent fréquemment selon les processus de construction traditionnels, limitant ainsi l'efficacité de la technologie BIM ».
