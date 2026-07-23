---
translatedFrom: 'Technology/AI硬體供應鏈.md'
sourceCommitSha: '8f5e81ee'
sourceContentHash: 'sha256:96b285db19941653'
sourceBodyHash: 'sha256:96ecb5a6142f55f7'
translatedAt: '2026-07-24T02:20:00+08:00'
lang: 'fr'
title: 'La chaîne d’approvisionnement du matériel d’IA : là où Taïwan transforme le nuage en machines'
description: 'L’IA générative ressemble à un service dans le nuage, mais elle exige en réalité toute une route physique : quelqu’un conçoit les puces, quelqu’un fabrique les plaquettes, quelqu’un les encapsule, quelqu’un s’occupe de la mémoire, de l’électricité, de la dissipation, des cartes mères et des racks. L’importance de Taïwan ne tient pas seulement à TSMC, mais au fait que beaucoup de verrous de cette route s’y concentrent. Cet intérêt commun existe réellement, et il s’accompagne d’eau et d’électricité, d’émissions de carbone, de répartition des revenus, d’usines à l’étranger et de risque géopolitique, transformant des slogans abstraits en preuves vérifiables sur la chaîne d’approvisionnement.'
date: 2026-07-11
category: 'Technology'
tags:
  - 'matériel d’IA'
  - 'semi-conducteurs'
  - 'chaîne d’approvisionnement'
  - 'serveurs d’IA'
  - 'procédés de pointe'
  - 'encapsulation avancée'
  - 'industrie technologique taïwanaise'
subcategory: 'Semi-conducteurs et matériel'
author: 'Taiwan.md Translation Team'
featured: false
lastVerified: 2026-07-11
lastHumanReview: false
researchReport: 'reports/research/2026-07/半導體供應鏈草稿地圖.md'
rationale:
  why_this_hook: 'Entrer par le plan de table du « banquet du billion » pour que le lecteur voie d’abord que la chaîne du matériel d’IA n’est pas une seule entreprise, mais tout un ensemble de nœuds d’ingénierie taïwanais.'
  whats_excluded: 'Ne pas faire une encyclopédie industrielle complète, ni énumérer une à une toutes les entreprises taïwanaises de semi-conducteurs, de serveurs et de composants.'
  where_it_hedges: 'Traiter la valeur de Taïwan dans la chaîne d’approvisionnement en même temps que l’eau et l’électricité, les émissions, la répartition des revenus, les usines à l’étranger et le risque géopolitique.'
  whos_pushing_back: 'Les clients et alliés mondiaux ont besoin de Taïwan tout en réduisant, par des usines à l’étranger, leur dépendance à un point unique autour du détroit de Taïwan.'
image: '/article-images/technology/ai-hardware-supply-chain-flow.svg'
imageCredit: 'Taiwan.md Contributors'
imageLicense: 'CC BY-SA 4.0'
---

# La chaîne d’approvisionnement du matériel d’IA : là où Taïwan transforme le nuage en machines

> **En 30 secondes :** l’IA semble répondre à des questions sur un écran, mais derrière se déroule un long relais physique. Quelqu’un formule un besoin, quelqu’un conçoit une puce, quelqu’un la fabrique, quelqu’un assemble puces, mémoire, dissipation, alimentation et carte mère en machines, et le tout part enfin vers un centre de données. L’importance de Taïwan ne s’épuise pas dans un « TSMC est très fort » : plusieurs relais clés de cette course se trouvent à Taïwan. Cet intérêt commun est réel, mais ce n’est pas une garantie : il apporte en même temps des pressions sur l’eau et l’électricité, les émissions, la répartition des revenus, les usines à l’étranger et la géopolitique.

Le 28 mai 2026, Jensen Huang a organisé un dîner à Taipei. Les médias l’ont appelé « le banquet du billion », parce que la somme des capitalisations boursières des entreprises représentées à table était stupéfiante. Mais ce qui mérite le plus d’être regardé dans ce dîner, ce n’est ni qui occupait la place d’honneur ni ce que valent ensemble ces entreprises.

Ce qui mérite vraiment d’être regardé, c’est le plan de table.

Pour la fonderie, C.C. Wei de TSMC. Pour l’assemblage des serveurs et des racks d’IA, Young Liu de Foxconn, Barry Lam de Quanta, Simon Lin de Wistron et Emily Hong de Wiwynn. Pour la conception de circuits intégrés, Rick Tsai de MediaTek. Pour l’alimentation et la dissipation, Ping Cheng de Delta, Sen-bin Chiu de Lite-On et Ching-hsing Shen d’AVC. Pour les cartes mères et les marques finales, Jonney Shih d’ASUS, Pei-cheng Yeh de GIGABYTE et Jason Chen d’Acer. Les catégories de la chaîne d’approvisionnement énumérées par l’agence CNA dans son article — fonderie, encapsulation et tests, modules de dissipation, gestion de l’alimentation, cartes mères, fabrication sous contrat et marques — dessinent presque la coupe transversale d’un serveur d’IA démonté.[^1]

![Jensen Huang tenant un GPU RTX Blackwell lors de la conférence d’ouverture du CES 2025 ; sur le fond noir de la scène apparaît le nom NVIDIA et, dans sa main, le module de la nouvelle puce d’IA.](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)

_Jensen Huang présente le GPU RTX Blackwell lors de la conférence d’ouverture du CES 2025. Cette image ramène l’« IA » de l’interface logicielle au matériel que l’on tient dans la main. Photo : Steve Jurvetson. CC BY 2.0 via Wikimedia Commons._

Ce n’était pas un dîner d’entreprise ordinaire. C’était plutôt poser une question sur la table : quand le monde entier dit que l’IA a besoin de Taïwan, de quoi a-t-il besoin au juste ?

La réponse ne sera ni une seule entreprise ni une seule puce. Elle ressemble plutôt à une route : elle part d’une phrase, « il nous faut plus de puissance de calcul pour l’IA », traverse les puces, les usines, l’encapsulation, l’électricité, la dissipation, les cartes mères et les racks, et arrive enfin dans un centre de données. Taïwan se tient à plusieurs verrous de cette route.

## Penser d’abord l’IA comme un service qui a besoin d’un corps

Les gens rencontrent d’ordinaire l’IA sur un téléphone, un ordinateur ou une page web. On tape un texte, la réponse apparaît. Cela ressemble à de la magie, et aussi à un service dans le nuage sans poids.

![Le hall de Computex au Centre d’exposition de Nangang, à Taipei : de larges allées bordées de stands de fabricants informatiques et une foule rassemblée, une scène où la chaîne du matériel taïwanaise devient visible.](/article-images/technology/computex-nangang-floor-2015.webp)

_Le hall de Computex au Centre d’exposition de Nangang, à Taipei. La chaîne du matériel d’IA n’existe pas seulement dans les rapports financiers : elle se voit concrètement dans les salons, les machines de démonstration, les racks et les rendez-vous d’affaires. Photo : Solomon203. CC BY-SA 4.0 via Wikimedia Commons._

Mais pour que l’IA réponde, il faut que des machines calculent derrière. Ces machines sont dans des centres de données, consomment de l’électricité, dégagent de la chaleur, exigent de la maintenance, et il faut aussi que quelqu’un les fabrique, les assemble et les livre au client.

On peut imaginer l’IA comme un très grand restaurant. Ce que l’on voit, c’est le serveur qui apporte le plat à table, mais on ne voit pas la conception de la carte, les achats, la cuisine, le gaz, l’eau et l’électricité, la chambre froide, le circuit d’envoi et le nettoyage. C’est pareil pour l’IA. Ce que l’on voit, c’est la réponse à l’écran ; derrière, il y a toute une cuisine matérielle.

La position de Taïwan se trouve précisément à beaucoup des plans de travail importants de cette cuisine.

## Comment une commande devient un rack

Une chaîne du matériel d’IA commence souvent par un besoin très ordinaire : une entreprise du nuage, une entreprise de modèles ou un grand groupe a besoin de plus de puissance de calcul. Cette phrase sonne comme l’achat d’un service dans le nuage, mais elle se transforme aussitôt en une série de problèmes physiques : quelle puce concevoir ? Où peut-on la fabriquer ? Comment rapprocher la mémoire de la puce ? Comment évacuer la chaleur ? Comment acheminer l’électricité ? Et enfin, qui assemble ces pièces très coûteuses en une machine livrable, maintenable et installable dans un centre de données ?

![Schéma de flux de la chaîne du matériel d’IA : la demande d’IA passe par la conception des puces, les procédés de pointe, l’encapsulation avancée, la HBM et les substrats, la dissipation et l’alimentation, les cartes mères, l’ODM/EMS et les racks d’IA, avant d’entrer dans le centre de données ; le schéma signale les verrous d’ingénierie fortement concentrés à Taïwan, comme les procédés, l’encapsulation, l’électricité et la chaleur, les cartes, l’assemblage et les racks.](/article-images/technology/ai-hardware-supply-chain-flow.svg)

_Schéma conceptuel réalisé par Taiwan.md. Ce n’est ni un graphique de parts de marché ni une carte complète des entreprises ; il sert à expliquer un chemin central : comment la demande d’IA atterrit en machines alimentables, refroidissables et expédiables._

La conception des puces, tout en amont, est majoritairement entre les mains d’entreprises comme NVIDIA, AMD, Broadcom, Google, Amazon ou Microsoft. L’une des positions importantes de Taïwan apparaît quand ces plans deviennent des puces. La feuille de route technologique officielle de TSMC énumère les procédés logiques 7, 5, 3 et 2 nanomètres, A16 et A14, N2 étant indiqué en production de masse au quatrième trimestre 2025.[^2] Pour beaucoup de puces d’IA, c’est là que la conception touche pour la première fois le sol taïwanais.

Mais qu’une puce soit fabriquée ne signifie pas encore que l’IA puisse fonctionner. Une puce d’IA doit être proche de la mémoire et relier différents dies en un système capable de coopérer à grande vitesse. TSMC décrit 3DFabric comme la combinaison de technologies d’empilement 3D du silicium et d’encapsulation avancée, incluant SoIC, CoWoS et InFO. AP, en rendant compte de la nouvelle usine de SPIL à Taichung, l’a également replacée dans le contexte du renforcement de la production de puces d’IA.[^3][^4] Le rôle de Taïwan commence ici à s’étendre de « fabriquer la puce » à « relier les puces en un module capable de travailler ».

Si l’on continue vers l’extérieur, la chaîne ressemble de moins en moins à une ligne droite. La mémoire à large bande passante (HBM) est surtout dominée par des entreprises coréennes. Les équipements, les matériaux et les logiciels de conception impliquent des fournisseurs américains, néerlandais, japonais et européens. Les plateformes du nuage et les services de modèles sont majoritairement américains. Taïwan ne monopolise pas chaque segment et n’en tire pas partout le plus grand profit. Sa particularité tient à ce que des nœuds clés — fonderie, encapsulation, tests, substrats, alimentation, dissipation, cartes mères et assemblage final — sont très proches les uns des autres et ont l’habitude, depuis des années, de résoudre ensemble les problèmes d’ingénierie.

![Schéma en couches d’un serveur d’IA : puces et accélérateurs, cartes et carte mère, alimentation et dissipation, serveur et rack, centre de données s’empilent dans l’ordre et expliquent comment un GPU devient une infrastructure d’IA opérationnelle.](/article-images/technology/ai-server-rack-stack.svg)

_Schéma conceptuel réalisé par Taiwan.md. Le GPU n’est que l’un des cœurs d’un serveur d’IA ; il faut encore le relier aux cartes, à l’alimentation, à la dissipation, à la machine complète, au rack et au centre de données._

À l’étape de la machine complète, le problème devient très concret. Plus la puce est puissante, plus le courant est fort et plus la chaleur est difficile à évacuer. Carte mère, alimentation, dissipation, châssis, système de gestion et planning d’expédition bougent ensemble. Ce que récupèrent des entreprises comme Foxconn, Quanta, Wistron, Wiwynn, Inventec, Compal ou Pegatron, c’est justement le travail d’assembler puces, cartes, alimentation, dissipation et conception mécanique en serveurs et racks d’IA. Quand CNA a rendu compte de l’expédition de la nouvelle plateforme de Foxconn, elle l’a également replacée dans le contexte de la présentation de systèmes de serveurs d’IA.[^10]

Ce schéma de flux ne cherche donc pas à faire mémoriser des termes. Ce qu’il veut montrer, c’est que la valeur de Taïwan ne réside ni dans une seule entreprise ni dans une seule puce, mais dans la capacité à pousser un produit complexe de la plaquette et de l’encapsulation jusqu’au rack et au centre de données sur une très courte distance et dans un temps très court. Cette densité est ce qui sépare Taïwan d’une base de fabrication à bas coût ordinaire.

Pour le lecteur non spécialiste, ce parcours offre aussi une manière de lire l’actualité. La prochaine fois qu’une entreprise annoncera une nouvelle plateforme d’IA, il n’est pas obligatoire de demander seulement qui a conçu la puce ; on peut aussi poursuivre : où se fait l’encapsulation ? Qui fabrique la machine complète ? Qui gère l’électricité et la chaleur ? Qui assume les délais et la maintenance ? Dès que ces questions sont posées, le contour de Taïwan dans la chaîne devient plus net, plus concret et plus facile à juger.

## Les semi-conducteurs sont la porte, pas la destination

Écrire l’industrie technologique taïwanaise comme « une entreprise appelée TSMC » est commode, mais fait manquer beaucoup de choses.

Ce à quoi répond une usine de plaquettes, c’est « la puce peut-elle être fabriquée ? ». La chaîne du matériel d’IA doit répondre à d’autres questions encore : la puce peut-elle être reliée à la mémoire ? Peut-elle être alimentée, refroidie, testée, maintenue ? Peut-elle être assemblée, dans le délai exigé par le client, en un rack entier, une rangée entière, un centre de données entier ?

Ce qu’il faut vraiment poursuivre ici, c’est la contrainte que résout chaque segment. Le procédé logique le plus avancé résout « peut-on mettre plus de transistors dans une puce plus petite et moins gourmande ? ». L’encapsulation avancée résout « quand une seule puce ne suffit pas, peut-on relier la puce de calcul, la mémoire et différents dies de façon à la fois proche et rapide ? ». Ce que demande un serveur d’IA est encore autre chose : ces pièces coûteuses peuvent-elles devenir une machine stable, maintenable, industrialisable et livrable ?

La dissipation et l’alimentation ne sont donc pas des rôles secondaires. Plus la puce est puissante, plus le courant est fort et plus la chaleur est difficile à gérer. Si l’alimentation est instable ou si la chaleur ne sort pas, même la puce la plus avancée doit ralentir, voire ne peut pas fonctionner. Les procédés matures n’ont pas disparu pour autant, car une machine d’IA a encore besoin de nombreuses puces de contrôle, de connexion, de gestion d’alimentation et de périphériques. Si le procédé le plus avancé est le moteur, les procédés matures et les composants sont les freins, le circuit de carburant, le tableau de bord et le système de refroidissement. Sans l’un de ces segments, la voiture ne peut pas rouler de façon fiable.

Dans ce grand tableau, il suffit de retenir une chose : les semi-conducteurs sont la porte, pas la destination. Pour que l’IA fonctionne vraiment, il faut encore traverser tout un segment qui transforme les puces en machines.

C’est aussi pourquoi « Taïwan a de la valeur » ne devrait pas rester une consolation abstraite. Cela devrait pouvoir se décomposer en un schéma : qui fait les plaquettes, qui fait l’encapsulation, qui fait la dissipation, qui fait l’alimentation, qui fait les cartes mères, qui fait la machine complète, qui assume les délais, qui assume l’eau et l’électricité, et à qui coupe-t-on les commandes en premier quand le cycle se retourne.

Ce schéma aide aussi à décrypter le langage de l’actualité. Quand un chef d’entreprise dit « Taïwan est un partenaire », on peut lui demander si ce dont il dépend est le procédé, l’encapsulation, l’ODM, l’alimentation ou la vitesse de réaction de tout le système. Quand un responsable politique dit « intérêt commun », on peut demander dans quelles entreprises, quelles villes et quels travailleurs cet intérêt se concentre. Quand un investisseur dit « l’avenir de l’IA est prometteur », on peut poursuivre en demandant si cet avenir atterrit dans la conception de puces, la capacité d’encapsulation, l’assemblage de serveurs ou les composants de dissipation et d’alimentation. Une fois qu’un slogan abstrait est décomposé en couches, le lecteur se laisse moins facilement porter par la seule émotion.

## L’intérêt commun est réel, mais ce n’est pas de la magie

La position de Taïwan dans la chaîne du matériel d’IA a bien créé un intérêt commun.

Pour NVIDIA, les grands acteurs du nuage et les entreprises mondiales d’IA, Taïwan est l’endroit où l’on transforme une conception en produit. Pour des pays comme les États-Unis, le Japon ou ceux d’Europe, Taïwan est un nœud d’approvisionnement incontournable pour les puces de pointe et l’infrastructure d’IA. Pour Taïwan, cette relation d’être nécessaire apporte exportations, investissements, emplois, visibilité boursière et atouts dans la politique internationale.

Quand AP a rendu compte en 2026 de l’économie de l’IA à Taïwan, elle a placé dans un même article la forte croissance, la hausse des exportations et l’extension de la présence de NVIDIA sur l’île à côté de la bulle de l’IA, du risque géopolitique et des inégalités de revenus.[^5] Cette juxtaposition est importante, car elle rappelle au lecteur que l’intérêt commun n’est ni une protection à sens unique ni une amulette qui ne s’use jamais.

D’autres pays s’efforcent de faire sortir une partie de la chaîne. Que TSMC construise des usines aux États-Unis, au Japon et en Allemagne prouve d’un côté que le monde a besoin de TSMC, et signifie de l’autre que les clients et les gouvernements ne veulent pas miser tout le risque sur Taïwan. Les usines à l’étranger ne reproduiront peut-être pas à court terme la densité complète de Taïwan, mais elles modifieront à long terme la structure de la négociation.

De plus, l’intérêt des entreprises n’équivaut pas à l’intérêt de l’État. Ce que veut NVIDIA, c’est un approvisionnement stable et de fortes marges. Ce que veut TSMC, c’est l’avance technologique et des clients mondiaux. Ce que veulent les ODM, ce sont des commandes et un taux d’utilisation. Ce que veut la société taïwanaise, ce sont des salaires, du logement, la sécurité énergétique, une capacité de charge environnementale et des garanties de sécurité. Ces intérêts se recoupent, mais entrent aussi en conflit.

Tout le monde autour de la table compte, mais le pouvoir n’est pas réparti également. NVIDIA tient l’architecture des GPU, l’écosystème CUDA et le rythme de la plateforme. TSMC tient les procédés de pointe et une capacité d’encapsulation cruciale. Les grands acteurs du nuage tiennent les achats des centres de données. Les ODM tiennent la conception des machines complètes, l’assemblage des racks et les expéditions de masse, mais leurs marges restent généralement bien inférieures à celles des concepteurs de puces. Parmi les fabricants de composants d’alimentation, de dissipation, de substrats ou d’interfaces de test, certains obtiennent de bonnes marges grâce à de fortes barrières techniques, d’autres montent et descendent au rythme des commandes de leurs grands clients. C’est aussi pourquoi il faut décomposer l’« intérêt commun » : dans une même chaîne, chaque segment est nécessaire, mais tous ne reçoivent pas la même part de pouvoir.

Une formulation plus juste devrait être plus prudente : le fait que le monde ait besoin de Taïwan lui donne un ensemble d’atouts importants. Mais ces atouts doivent être entretenus ensemble par la défense, la diplomatie, l’énergie, la gouvernance industrielle et la répartition sociale.

## Construire à l’étranger n’est pas un simple déménagement

Que TSMC construise des usines aux États-Unis, au Japon et en Allemagne se retrouve souvent dans la même inquiétude : si la fabrication de pointe s’en va, le bouclier de silicium de Taïwan va-t-il s’amincir ?

On ne peut pas répondre à cette question par un « oui » ou un « non ».

Construire à l’étranger est d’un côté un prolongement de la capacité taïwanaise. Que les clients et les alliés acceptent de fournir subventions, terrains et capital politique tient précisément à l’importance de TSMC et de la chaîne taïwanaise. Ces usines rapprochent TSMC de ses clients et rendent la chaîne mondiale politiquement plus acceptable.

De l’autre côté, construire à l’étranger est aussi un geste de dispersion du risque. Ni les États-Unis, ni l’Europe, ni le Japon ne souhaitent que les puces les plus critiques restent à jamais concentrées près du détroit de Taïwan. Taïwan est nécessaire, donc on y investit. Taïwan est trop importante, donc on la disperse. Ces deux phrases tiennent en même temps.

Mais une usine n’équivaut pas à tout un écosystème. Les procédés de pointe exigent équipements, matériaux, produits chimiques, ingénieurs, maintenance, expérience du rendement, capacité d’encapsulation, coordination avec le client et vitesse de réaction des fournisseurs. Déplacer un segment de capacité à l’étranger et déplacer toute une société d’ingénierie sont deux difficultés distinctes.

Construire à l’étranger ressemble donc moins à arracher Taïwan de la chaîne qu’à en étirer quelques nœuds vers l’extérieur. Cela modifiera lentement la structure de la négociation et testera la manière dont Taïwan conserve sa R&D centrale, sa production de masse la plus avancée et la densité de sa chaîne.

## Les procédés matures sont sur la même carte

La fièvre de l’IA pousse à concentrer toute l’attention sur le 3 nanomètres, le 2 nanomètres et CoWoS. Mais une machine d’IA ne fonctionne pas uniquement avec les puces les plus avancées.

Les circuits intégrés de gestion d’alimentation, les contrôleurs, les capteurs, les puces de communication, les périphériques, les puces automobiles et industrielles utilisent encore majoritairement des procédés matures. Ces puces ne font pas la une comme les GPU, mais elles soutiennent la conversion d’énergie, le contrôle des signaux, la surveillance des équipements et quantité de fonctions discrètes dans les centres de données.

La pénurie mondiale de puces pendant la pandémie a fait comprendre aux chaînes de production automobiles, électroménagères et industrielles une chose : le monde ne manque pas seulement des puces les plus avancées, mais aussi de ces nœuds matures qui paraissent ordinaires et sans lesquels on ne peut rien expédier. La carte taïwanaise des semi-conducteurs ne peut donc pas se regarder par le seul sommet. TSMC, UMC, Vanguard, PSMC et un ensemble d’entreprises de procédés spéciaux, d’encapsulation et tests et de matériaux composent ensemble un socle plus épais.

Ce point est important pour le lecteur. La valeur de Taïwan ne devrait pas se comprendre comme une course aux nanomètres. Plus le matériel d’IA est complexe, plus il faut que l’avancé et le mature travaillent ensemble. Plus il faut que la machine complète et les composants soient livrés ensemble.

Les procédés matures doivent donc être replacés sur la même carte. Ils sont le châssis qui détermine si le matériel d’IA peut fonctionner de manière stable. Le GPU le plus avancé doit s’appuyer sur une multitude de puces ordinaires pour devenir une machine réellement utilisable, maintenable et industrialisable.

## La facture du massif des montagnes sacrées

Raccorder à Taïwan la demande mondiale de matériel d’IA y laisse aussi la facture.

La première facture visible, c’est l’électricité. Les usines de plaquettes de pointe, la lithographie EUV, les lignes d’encapsulation, les tests de serveurs d’IA et les centres de données exigent tous une électricité stable. Les médias spécialisés ont rapporté que l’industrie taïwanaise des semi-conducteurs a tiré la sonnette d’alarme sur l’énergie verte et l’approvisionnement électrique. TSMC publie aussi régulièrement ses plans d’économies d’énergie sur l’EUV et de gestion de l’eau.[^6][^7] Les gains d’efficacité comptent, mais tant que la demande d’IA s’étend, la pression sur le total demeure.

La deuxième facture, c’est l’eau et la vulnérabilité climatique. La fabrication des plaquettes exige d’énormes quantités d’eau ultrapure. Le reportage de WIRED sur l’eau dans la fabrication de puces indique qu’une seule usine peut utiliser plusieurs millions de gallons par jour, et lors des sécheresses taïwanaises la tension entre eau agricole et production de puces a fait surface. La capacité de procédé ne peut pas se séparer des barrages, des pluies, de l’eau régénérée et de la répartition régionale.[^8]

La troisième facture, ce sont les émissions et le verrouillage de la trajectoire industrielle. L’étude de Roussilhe et al., portant sur des fabricants taïwanais de composants électroniques, examine comment l’énergie, l’eau et les émissions de gaz à effet de serre augmentent avec la croissance de la production, ainsi que le risque de carbon lock-in.[^9] Le massif des montagnes sacrées apporte des atouts internationaux et arrime en même temps profondément l’énergie et l’usage des sols du pays à une fabrication très intensive en énergie.

La quatrième facture, c’est la répartition. L’IA a fait monter la Bourse, les exportations et les salaires du secteur technologique taïwanais, mais tout le monde n’est pas sur cette chaîne de croissance principale. Les industries traditionnelles, les services, les locataires et les jeunes hors du secteur technologique ne touchent pas nécessairement le dividende en même temps. Quand les prix du logement, les tarifs de l’électricité, le foncier et l’investissement public sont tous entraînés par la haute technologie, « l’avenir de Taïwan est prometteur » n’équivaut pas à « la vie de chaque Taïwanais s’améliore ».

Il ne s’agit pas de nier l’importance des semi-conducteurs et de la chaîne de l’IA. Au contraire : c’est précisément parce qu’elle est importante qu’il faut écrire clairement la facture.

## Où Taïwan se place-t-elle elle-même ?

Ce que la chaîne du matériel d’IA a donné à Taïwan, outre des devises et des commandes, c’est aussi une manière de se comprendre.

Taïwan n’est ni simplement une petite île protégée par le monde, ni un empire technologique capable de contrôler unilatéralement l’IA mondiale. Elle ressemble plutôt à un nœud d’ingénierie hautement spécialisé : elle est nécessaire, donc elle a des atouts. On dépend d’elle, donc elle a des responsabilités. Elle est concentrée, donc elle porte aussi le risque.

La prochaine fois que le lecteur entendra « Taïwan est irremplaçable », il n’est pas obligé de s’arrêter au slogan. Il peut faire apparaître mentalement un chemin physique : la demande d’une entreprise de modèles entre dans la conception de puces, la conception entre dans les procédés de TSMC, la plaquette entre dans l’encapsulation avancée, le module encapsulé entre dans la dissipation, l’alimentation, la carte mère et le rack, et l’ODM/EMS taïwanais livre enfin le tout à un centre de données.

Ce chemin est la preuve concrète. Il transforme l’« intérêt commun » d’une émotion en un fait que l’on peut discuter, contester et aussi défendre.

Taïwan transforme le nuage en machines. Le vrai sens de cette phrase est celui-ci : même l’IA la plus abstraite doit, à la fin, passer par l’île la plus concrète.

Et c’est aussi l’une des positions les plus claires — et les plus nécessaires à voir clairement — de Taïwan en ce moment.

## Pour aller plus loin

- [Commerce extérieur de Taïwan et chaînes d’approvisionnement mondiales](/economy/台灣外貿與全球供應鏈) — le contexte macro, de l’orientation exportatrice et du commerce triangulaire à la recomposition des chaînes entre les États-Unis et la Chine.
- [NVIDIA à Taïwan](/technology/NVIDIA在台灣) — comment NVIDIA confie à Taïwan la fabrication des puces, l’encapsulation et l’assemblage des serveurs.
- [Industrie des semi-conducteurs](/technology/半導體產業) — le long contexte, du transfert technologique de RCA à la fonderie de TSMC jusqu’au champ de bataille des matériaux et de l’encapsulation.
- [Computex](/technology/Computex) — pourquoi le salon informatique de Taipei est devenu, à l’ère de l’IA, le lieu de pèlerinage de l’offre matérielle mondiale.
- [Électricité et semi-conducteurs à Taïwan](/technology/台灣的電力與半導體) — la facture électrique, la pression de l’énergie verte et la sécurité énergétique derrière la chaîne de l’IA.
- [L’eau des semi-conducteurs et les ressources hydriques de Taïwan](/technology/半導體用水與台灣水資源) — comment les usines de plaquettes se relient aux barrages, aux sécheresses, à l’eau régénérée et à la gouvernance locale.
- [Usines de la chaîne d’IA à l’étranger](/technology/AI供應鏈海外設廠) — comment le monde fait sortir la chaîne taïwanaise, de TSMC, Foxconn et Wistron jusqu’à Delta.

## Sources des images

- **Schéma de flux de la chaîne du matériel d’IA** : schéma conceptuel SVG réalisé par Taiwan.md Contributors, CC BY-SA 4.0, stocké dans `public/article-images/technology/ai-hardware-supply-chain-flow.svg`. Les nœuds du schéma ont été organisés d’après le texte et les références et servent à expliquer comment la demande d’IA entre dans le centre de données en passant par la conception des puces, les procédés de pointe, l’encapsulation avancée, la HBM et les substrats, la dissipation et l’alimentation, les cartes mères, l’ODM/EMS et les racks d’IA ; ce n’est ni un graphique de parts de marché ni une carte complète des entreprises.
- **Schéma en couches du serveur d’IA** : schéma conceptuel SVG réalisé par Taiwan.md Contributors, CC BY-SA 4.0, stocké dans `public/article-images/technology/ai-server-rack-stack.svg`. Il sert à expliquer les niveaux système d’un serveur d’IA, de la puce au centre de données, et ne représente ni une carte complète des entreprises ni des parts de marché.
- **Jensen Huang présentant le GPU RTX Blackwell** : [Jensen Huang holding RTX Blackwell at CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Photo : Pronoia, Wikimedia Commons, CC0. Ce texte utilise la version mise en cache dans `public/article-images/technology/jensen-huang-ces-2025-blackwell.webp`.
- **Hall de Computex à Nangang** : [Computex Taipei at Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Photo : NVIDIA Taiwan, Wikimedia Commons, CC BY 2.0. Ce texte utilise la version mise en cache dans `public/article-images/technology/computex-nangang-floor-2015.webp`.

## Références

[^1]: [CNA : le « banquet du billion » de Jensen Huang ; C.C. Wei, Young Liu, Barry Lam et d’autres grandes figures y assistent](https://www.cna.com.tw/news/afe/202605280300.aspx) — Reportage de l’agence CNA du 28 mai 2026 sur le dîner auquel Jensen Huang a convié à Taipei les dirigeants des entreprises taïwanaises de la chaîne d’IA, avec l’énumération de catégories comme la fonderie, l’encapsulation et les tests, les modules de dissipation, la gestion de l’alimentation, les cartes mères, la fabrication sous contrat et les marques.
[^2]: [TSMC Logic Technology](https://www.tsmc.com/english/dedicatedFoundry/technology/logic) — Page officielle des technologies de procédés logiques de TSMC, avec les procédés avancés 7, 5, 3 et 2 nanomètres, A16 et A14 et l’explication de leur feuille de route.
[^3]: [TSMC Advanced Packaging Services](https://www.tsmc.com/english/dedicatedFoundry/services/advanced-packaging) — Page officielle des services d’encapsulation avancée de TSMC, qui explique que 3DFabric inclut des technologies d’intégration amont et aval comme SoIC, CoWoS et InFO.
[^4]: [AP: Taiwan takes a further step in production of AI chips with advanced new plant](https://apnews.com/article/1e087e92592b0b9ab7fb20442a5b8dc7) — Reportage d’AP sur la nouvelle usine de SPIL à Taichung et la présence de Jensen Huang, qui apporte un regard international sur le rôle de l’encapsulation avancée taïwanaise dans la chaîne des puces d’IA.
[^5]: [AP: Taiwan's AI-powered economy soars in the shadow of bubble fears and China threats](https://apnews.com/article/7527bd4bf3089cbd2dab1c530ee61c3e) — Reportage d’AP en 2026 sur la manière dont la demande d’IA tire la croissance et les exportations taïwanaises, tout en récapitulant les limites que sont la bulle de l’IA, le risque géopolitique et les inégalités de revenus ; utile comme matériau d’équilibre.
[^6]: [Tom's Hardware: TSMC-led semiconductor association warns of power supply pressure](https://www.tomshardware.com/tech-industry/tmsc-led-semiconductor-association-begs-taiwan-government-for-clean-green-energy-as-demand-skyrockets-fabs-are-struggling-to-keep-up-with-power-needs) — Reportage d’un média spécialisé sur l’alerte de l’industrie taïwanaise des semi-conducteurs concernant l’énergie verte et la stabilité de l’approvisionnement ; utilisable comme source secondaire sur les contraintes énergétiques et la pression RE100, mais une citation formelle devrait remonter à la TSIA ou au texte officiel.
[^7]: [Tom's Hardware: TSMC reduces peak power consumption of EUV tools by 44%](https://www.tomshardware.com/tech-industry/semiconductors/tsmc-reduces-peak-power-consumption-of-euv-tools-by-44-percent-company-to-save-190-million-kilowatt-hours-of-electricity-by-2030) — Reportage sur le plan d’économies d’énergie de TSMC sur l’EUV et l’ordre de grandeur de sa consommation totale ; utile pour expliquer la tension entre gains d’efficacité et croissance du total, mais une citation formelle devrait être recoupée avec la documentation développement durable de TSMC.
[^8]: [WIRED: Want to Win a Chip War? You’re Gonna Need a Lot of Water](https://www.wired.com/story/want-to-win-a-chip-war-youre-gonna-need-a-lot-of-water/) — Reportage de WIRED en 2023 sur les besoins de la fabrication de semi-conducteurs en eau ultrapure et en installations de traitement, avec mention de la tension entre TSMC et l’eau agricole pendant les sécheresses taïwanaises ; il soutient la section sur les ressources hydriques de ce texte.
[^9]: [Roussilhe et al.: From Silicon Shield to Carbon Lock-in?](https://arxiv.org/abs/2209.12523) — Étudie l’empreinte environnementale de 16 fabricants taïwanais de composants électroniques entre 2015 et 2020 et pose que l’énergie, l’eau et les émissions augmentent avec la croissance de la production, ainsi que le risque de carbon lock-in.
[^10]: [CNA : Young Liu confiant dans les expéditions de Vera Rubin de NVIDIA au second semestre](https://www.cna.com.tw/news/afe/202605290100.aspx) — Reportage de l’agence CNA du 29 mai 2026, dans lequel le président de Foxconn, Young Liu, évoque les expéditions de la plateforme Vera Rubin, le CPO et la photonique sur silicium et la présentation de systèmes de serveurs d’IA.
