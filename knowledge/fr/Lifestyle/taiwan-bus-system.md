---
title: 'Le système de bus de Taïwan : quand Hsinchu Bus s’en va, qui vient chercher celles et ceux qui n’ont pas de volant'
description: 'Le matin du 15 septembre 2024, devant la gare ferroviaire de Tongluo, plus de 30 personnes, des enfants de maternelle à des aînés de 90 ans, sont montées dans le dernier bus 5658 de Hsinchu Bus. De la première ligne exploitée en réseau à Taipei en 1977 aux zones rurales qui ne gardent plus que deux services par jour, de l’âge moyen des conducteurs, 51 ans, au pass mensuel TPASS qui a fait bondir la fréquentation à Hualien de près de 70 %, les bus ont toujours transporté celles et ceux qui n’ont pas le choix : les adolescents qui vont à l’école, les personnes âgées qui ne conduisent pas, les familles sans voiture. Et c’est précisément sous leurs pieds que ces lignes sont en train d’être retirées, une par une.'
date: 2026-06-25
category: 'Lifestyle'
tags:
  [
    'bus',
    'autocar',
    'transports publics',
    'TPASS',
    'zones rurales isolées',
    'équité des transports',
    'bus électrique',
    'données ouvertes',
    'pénurie de conducteurs',
  ]
subcategory: '交通與移動'
author: 'Taiwan.md Contributors'
readingTime: 24
featured: false
lastVerified: 2026-06-25
lastHumanReview: false
researchReport: 'reports/research/2026-06/台灣的公車系統.md'
image: '/article-images/lifestyle/scooters-and-bus-taipei-1996.webp'
imageCredit: 'Holly Cheng'
imageLicense: 'CC BY-SA 3.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg'
datasets:
  - name: '台灣好行各路線搭乘人次'
    url: 'https://data.gov.tw/dataset/140008'
  - name: '機動車輛登記數'
    url: 'https://data.gov.tw/dataset/14208'
relatedDiary: ['2026-06-25-204254-公車系統']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Lifestyle/台灣的公車系統.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:7d3802fe03c60e03'
sourceBodyHash: 'sha256:24a950fc8509e96a'
translatedAt: '2026-10-13T05:54:09.916621+00:00'
---

Le matin du 15 septembre 2024, devant la gare ferroviaire de Tongluo, dans le comté de Miaoli. Plus de 30 personnes se tenaient sous l’arrêt, des enfants encore à l’école maternelle jusqu’à une personne de 90 ans. Elles n’attendaient ni le bus du travail ni celui de l’école. Elles attendaient le dernier service du 5658 de Hsinchu Bus.

À partir de ce jour-là, cet ancien opérateur, actif depuis un siècle, s’est entièrement retiré de Taoyuan, Hsinchu et Miaoli ; à Miaoli, 12 lignes ont été reprises par des « taxis du bonheur », un service de taxi sur réservation[^1]. Au moment où le grand bus de Hsinchu Bus est lentement entré en gare, les applaudissements ont retenti. Hsu Yu-feng, représentant local du canton de Tongluo, avait invité les habitants à monter dans ce dernier bus en souvenir. Il a déclaré : « Prendre les bus de Hsinchu Bus fait partie des souvenirs de beaucoup de gens ; ils ont accompagné la jeunesse de nombreuses personnes. »[^1]

Les applaudissements s’adressaient à un bus, mais sous ces applaudissements se cachait une réalité plus cruelle. Celles et ceux qui applaudissaient sous l’arrêt étaient des écoliers trop jeunes pour conduire un scooter, des grands-pères qui ne pouvaient plus en conduire, des familles sans deuxième voiture : précisément le groupe qui peut le moins décider de partir quand il le veut. Le bus est fait pour eux. Et l’effondrement des bus à Taïwan commence justement sous leurs pieds.

> **Vue d’ensemble en 30 secondes :** les bus de Taïwan transportent les « personnes sans volant » : les adolescents qui vont à l’école, les personnes âgées qui ne conduisent pas, les familles sans voiture. Dans les ménages sans voiture, 53,3 % des déplacements reposent sur les transports publics, contre seulement 13,7 % dans les ménages motorisés[^2]. Mais ce système s’arrête d’abord là où l’on en a le plus besoin : en six ans, les conducteurs d’autocars interurbains sont passés de 5 646 à 3 551, soit une baisse de plus d’un tiers[^3] ; dans les zones rurales isolées, il ne reste parfois que deux services par jour, et le dernier bus part très tôt. Un même geste s’appelle « attendre le bus » : à Taipei, cela signifie se plaindre qu’il tarde ; dans la campagne de Changhua, cela signifie « pourrai-je encore sortir seul ? ». En coulisses, il s’appuie sur un système de données ouvertes utilisé jusqu’à Google ; en façade, c’est souvent un bus qui n’arrive jamais, ou deux bus qui arrivent ensemble. Sa qualité mesure la volonté d’une société d’embarquer celles et ceux qui ne peuvent pas prendre la route par eux-mêmes.

## Les personnes qui lèvent la main sous l’arrêt

Commençons par clarifier une chose : qui prend réellement le bus ?

L’enquête du ministère des Transports sur les modes de déplacement donne une réponse contre-intuitive. Si l’on distingue les ménages selon qu’ils possèdent ou non une voiture, 53,3 % des déplacements des ménages sans voiture dépendent des transports publics, contre seulement 13,7 % pour les ménages motorisés[^2]. L’écart est de près de quatre fois. Autrement dit, les bus, avec le métro et les trains de la TRA, transportent principalement les personnes qui n’ont pas de voiture à la maison, ou qui ne conduisent pas. La différence est encore plus nette par âge : les élèves et étudiants sont, parmi tous les motifs de déplacement, le groupe dont le taux d’usage est le plus élevé ; plus de 40 % des trajets scolaires se font en transports publics[^2].

```tw-bars
Qui prend les transports publics : ceux qui ont une voiture les utilisent peu, ceux qui n’en ont pas en dépendent pour sortir (part modale des déplacements, %)
*Ménages sans voiture | 53.3 | En dépendent pour sortir
Ménages motorisés | 13.7
Source : enquête du Département des statistiques du ministère des Transports sur l’usage des modes de déplacement
```

Ces personnes ont un point commun : elles n’ont pas de volant entre les mains. Les adolescents d’une quinzaine d’années ne peuvent pas encore conduire de scooter ; les personnes de 70 ou 80 ans ne peuvent plus en conduire ; les familles qui ne peuvent pas ou ne veulent pas acheter de voiture n’ont pas le choix. Pour un grand-père de 78 ans à Changhua, le bus n’a jamais relevé de la simple « commodité ». Il doit répondre à une question : « Puis-je aujourd’hui aller seul chez le médecin, puis rentrer chez moi ? » Ce qui est en jeu, c’est la dignité.

Il faut ici écarter un argument opposé devenu courant. Régulièrement, certains affirment que le véritable sujet à Taïwan, c’est le scooter, non le bus, et qu’écrire sur les bus relève d’un « framing d’élite urbaine ». Il est exact que Taïwan est une île de scooters : on compte 599 scooters pour 1 000 habitants, 83,7 % des ménages possèdent un scooter, et seulement environ 12,5 % des personnes dépendent principalement des transports publics[^4]. Mais cet argument se trompe de cible. Le bus est précisément une ligne de vie pour les non-élites : il transporte les ménages sans voiture, les adolescents scolarisés, les personnes âgées rurales qui ne peuvent pas conduire de scooter. Celles et ceux qui peuvent conduire un scooter n’en ont déjà pas vraiment besoin. Les véritables dépendants du bus sont ceux qui ne peuvent même pas conduire de scooter.

> 📝 **Note de curation** : le discours courant lit directement « il y a beaucoup de scooters » comme « les bus ne sont pas importants ». Un maillon manque dans ce raisonnement : le scooter résout la mobilité des « personnes capables de prendre la route elles-mêmes » ; le bus résout celle des « personnes incapables de prendre la route elles-mêmes ». Les deux ne servent pas fondamentalement les mêmes personnes. Quand une ligne rurale isolée cesse de circuler, les jeunes adultes qui conduisent un scooter ne sont pas touchés ; la première personne privée de transport est cette grand-mère qui prenait le bus pour son suivi médical. Faire du bus un second rôle revient à reléguer ces personnes au second plan.

Clarifions aussi une idée reçue : beaucoup pensent que les travailleurs migrants forment le gros des usagers du bus. Ce n’est pas le cas. À Taïwan, parce que les politiques publiques ont longtemps limité leur accès à l’achat de véhicules, les travailleurs migrants utilisent le plus souvent le scooter pour leurs trajets quotidiens ; ils ne prennent les autocars que pour de longs déplacements le week-end[^5]. Imaginer les travailleurs migrants comme les principaux passagers des bus revient à assimiler mécaniquement « vulnérabilité » et « usage du bus ».

## Un trajet, deux trajets, et ce « bip » à valider en descendant

![Bus à plancher bas de la compagnie Xingnan Motor Transport circulant sur une ligne principale rouge à Tainan ; des symboles d'accessibilité sont visibles près des portes et le châssis est bas](/article-images/lifestyle/low-floor-bus-tainan-2016.webp)
_Un bus à plancher bas de la compagnie Xingnan Motor Transport à Tainan, en 2016. Le châssis bas permet l'accès aux poussettes et aux fauteuils roulants, constituant un indicateur clé de l'« accessibilité » des bus urbains. Photo : Nutnse0008, CC BY-SA 4.0 (voir les sources d'images à la fin de l'article)._

Il existe une série de gestes que les Taïwanais maîtrisent depuis l'enfance, mais qui laissent souvent les étrangers perplexes : il faut lever la main à l'arrêt de bus, sinon le chauffeur ne s'arrête pas. On valide son titre de transport avec un « bip » en montant, et parfois, il faut valider une seconde fois en descendant. Derrière ces gestes se cache un système de tarification bien plus complexe qu'il n'y paraît.

L'origine de ce système remonte à 1977. Avant cela, les différents opérateurs de bus à Taipei fonctionnaient de manière indépendante : les numéros de lignes, les tarifs et les titres de transport n'étaient pas uniformisés. En 1976, la ville de Taipei a créé un « Comité préparatoire pour l'exploitation conjointe des bus publics et privés » afin d'unifier tout cela. Le 1er janvier 1977, les lignes conjointes 202 et 202 ont été les premières à circuler. Le 30 avril de la même année, la première phase de 33 lignes de bus conjointes est officiellement entrée en service[^6]. Ce concept de « gestion conjointe » signifie que, quel que soit l'opérateur du véhicule, les passagers utilisent le même numéro de ligne, le même tarif et le même titre de transport. C'est ainsi qu'est né le système actuel des bus urbains à Taïwan.

C'est également de ce système qu'est née la tarification par segments. Avec l'expansion urbaine vers New Taipei, un trajet peut traverser plusieurs zones tarifaires : l'ancien centre-ville compte pour un segment, tandis que l'extension vers la périphérie peut compter pour deux ou trois segments. Les points de segmentation sont généralement situés près des nœuds de transport comme le pont de Taipei ou Shilin, ou à proximité des limites municipales. Si vous montez et descendez dans l'intervalle de deux arrêts autour de ces points, cela ne compte que pour un seul segment (ce qu'on appelle une « zone tampon »). C'est la raison pour laquelle, sur les lignes traversant plusieurs segments, il faut valider en montant ET en descendant : le système doit savoir combien de segments vous avez parcourus pour prélever le montant exact. La confusion fréquente des étrangers concernant le fait de monter parfois par l'avant et parfois par l'arrière trouve aussi sa réponse ici : l'endroit où l'on monte ou descend, et si l'on valide une ou deux fois, dépend entièrement de la segmentation de la ligne concernée.

Les titres de transport ont également évolué. L'EasyCard a été généralisée dans les bus fin septembre 2002[^7], tandis que l'iPASS de Kaohsiung a été lancée en 2014 avec le métro de Kaohsiung[^7]. La validation bidirectionnelle (valider en montant et en descendant) a été introduite par étapes : une première phase le 1er juillet 2019, suivie d'une mise en œuvre complète en février 2020. L'objectif était de calculer précisément les frais par segment, d'offrir des réductions pour les correspondances et de collecter des données sur les flux de passagers[^8]. Notez une erreur courante à rectifier : la validation bidirectionnelle date de 2019, pas de 2012. L'iPASS date de 2014, et non de 2012 non plus.

Cependant, ce système rencontre ses limites. Le volume de passagers des bus urbains à Taïwan est extrêmement concentré dans la région de Taipei et New Taipei : en 2020, ces deux zones représentaient 73,7 % du volume total des bus urbains de Taïwan[^9]. Sur une ligne principale de Taipei, un bus passe toutes les 4 à 6 minutes en période de pointe, ce que les Taipei-ci jugent parfois trop long. Au même moment, à un arrêt quelconque dans le centre, le sud ou l'est du pays, il se peut qu'un seul bus passe par heure, et que le dernier service s'arrête dès 17h ou 18h. Le système est le même, mais selon l'endroit où l'on se trouve, les réalités de vie sont radicalement différentes.

## Google sait dans combien de minutes arrive votre bus parce que Taïwan a ouvert ses données

Vous ouvrez votre téléphone et voyez le compte à rebours : « arrivée dans 3 minutes ». Cette chose semble aller de soi. En réalité, c’est l’une des réussites peu connues de Taïwan.

À partir de 2015, Taïwan a commencé à inventorier les données nationales de transports publics et à définir des normes communes ; en 2016, la plateforme PTX a été créée ; en décembre 2022, elle a été intégrée et mise à niveau pour devenir l’actuelle TDX, le Transport Data eXchange[^10]. Son ampleur est considérable : plus d’un millier de jeux de données, plus de 4,9 millions d’appels API par jour, plus de 540 millions de données diffusées au total, et plus de 3 000 entreprises de services à valeur ajoutée qui l’utilisent[^11]. Plus important encore, les informations d’arrivée des bus taïwanais sur Google Maps proviennent effectivement, via des partenaires locaux, des données TDX/PTX[^11]. Cela fait de Taïwan l’un des rares endroits au monde où Google Maps offre des prédictions fines d’arrivée des bus.

Il faut cependant rester honnête et éviter de surestimer cet acquis. Les données ouvertes de Taïwan sont « en tête dans la région », mais elles ne sont pas « de niveau mondial » au sens où une évaluation internationale le confirmerait. Elles utilisent un format OData personnalisé dit « quatre étoiles », et non les standards internationaux GTFS/GTFS-RT, ce qui rend leur intégration directe dans les écosystèmes internationaux plus difficile ; on ne trouve pas non plus d’organisation internationale citant Taïwan comme référence en matière de données ouvertes[^12]. Sa force réside dans l’ampleur et la diffusion ; sa faiblesse, dans l’alignement international des standards.

Et même les coulisses les plus intelligentes ne sauvent pas toujours l’expérience en façade. Toutes ces applications de bus, Taipei Bus, divers BusTracker, Cloud Bus, se branchent en réalité sur le même TDX ; seule l’interface change[^13]. Le temps d’arrivée que vous voyez dans l’application A est donc identique à celui de l’application B, parce qu’elles copient le même devoir. Le vrai problème se situe à la source des données : dans les quartiers denses en immeubles, le GPS dérive, et la prédiction d’arrivée du bus dérive avec lui.

L’image la plus parlante vient de plaintes d’internautes de Taichung sur PTT. Un utilisateur nommé LeiHide a écrit : « La dernière fois, j’ai regardé l’appli en attendant le bus ; l’appli indiquait 2 bus à l’arrêt, en réalité il n’y en avait pas un seul », « carrément des services fantômes » ; un autre, teddykitty, a dit : « Il y avait clairement le bus de 6 h 50, et pourtant moi et deux autres dames que je ne connaissais pas avons attendu stupidement ensemble »[^14]. En coulisses, des données ouvertes unifiées à l’échelle nationale ; en façade, trois inconnus sous un arrêt qui attendent ensemble un bus qui ne viendra jamais. Voilà l’un des visages les plus fracturés des bus taïwanais.

(Ajoutons un point souvent mal relayé : certains disent en ligne que « 1968 » serait l’application des bus de Taipei. Ce n’est pas le cas. 1968 est le système de numérotation des autoroutes nationales et l’application d’informations en temps réel des services routiers pour les autoroutes ; cela n’a rien à voir avec les bus urbains[^13].)

## Deux bus arrivent ensemble, puis une longue attente vide

![Abribus du côté de la rue Zhengzhou, à la gare principale de Taipei, avec panneau d’arrêt et usagers en attente](/article-images/lifestyle/taipei-bus-shelter-2020.webp)
_Abribus du côté de la rue Zhengzhou, à la gare principale de Taipei, 2020. Pour les personnes sans volant, l’arrêt est le point de départ quotidien, mais aussi le lieu d’une longue attente. Photo : T Gordon Cheng, CC BY-SA 4.0 (source indiquée à la fin de l’article)._

Quiconque a déjà pris le bus connaît cette absurdité : on attend 20 minutes sans voir un seul bus, puis deux véhicules de la même ligne arrivent l’un derrière l’autre.

Ce phénomène s’appelle le « bunching », ou formation de convois. C’est une propriété physique des systèmes de bus, sans rapport avec la paresse supposée des conducteurs. Si le premier bus prend un peu de retard, les passagers s’accumulent le long du trajet ; les montées et descentes prennent plus de temps, et il ralentit encore. Le bus suivant, au contraire, trouve moins de passagers parce que le premier les a déjà pris ; il avance plus facilement, se rapproche, et les deux finissent par se coller. Plus l’intervalle entre deux services est long, plus cette boule de neige grossit.

Pour les habitants de Taipei, le bunching est agaçant ; pour les habitants des zones rurales isolées, c’est même un luxe : ils ne rencontrent même pas « deux bus qui arrivent ensemble », puisqu’il n’y a que quelques services par jour. On retrouve ici cette fracture invisible entre ville et campagne : les Taipeïens trouvent que 5 minutes, c’est trop long, parce qu’ils peuvent se permettre de s’en plaindre ; dans la campagne de Changhua, celles et ceux qui attendent 40 minutes, ou qui n’ont plus que deux bus par jour, n’ont pas ce choix. Un même mot mesure deux situations totalement différentes. Plus les gens n’ont pas d’option, moins le bus arrive : cette phrase reviendra sans cesse dans cet article.

## Comment les « bus sauvages » sont devenus United Bus

![Autocar de longue distance sur autoroute de Kuo-Kuang Motor Transport, immatriculation KKA-1897](/article-images/lifestyle/kuokuang-intercity-coach-2026.webp)
_Autocar de longue distance de Kuo-Kuang Motor Transport, 2026. Son prédécesseur est Taiwan Motor Transport, qui détenait le monopole à l'époque de la direction des routes ; en 2001, plus de mille employés ont fait une collecte de fonds pour reprendre l'entreprise. Photo : Wei Ting Hsu, CC BY-SA 4.0 (voir les sources des images à la fin de l'article)._

Pour comprendre pourquoi le réseau de bus ressemble à cela aujourd'hui, il faut revenir sur la manière dont il est passé d'un monopole étatique à une multitude d'opérateurs circulant dans toutes les rues.

L'origine du transport routier à Taïwan remonte à la création de la Direction des routes de la province de Taïwan en 1946. En 1977, l'activité de transport de passagers de la Direction des routes a été séparée pour créer la Taiwan Motor Transport Company (communément appelée _Taiqi_). À son apogée, elle exploitait plus de 500 lignes avec 3 600 véhicules et des dizaines de milliers d'employés[^15]. C'était l'époque où la Direction des routes détenait le monopole du transport longue distance, un souvenir encore vif chez les anciennes générations.

Le tournant s'est produit autour de la levée de la loi martiale. À la fin des années 1980, de nombreux « bus sauvages » (_yejiche_), dépourvus de licence et effectuant des trajets privés, ont commencé à envahir les routes. Plutôt que de tenter une répression sans fin, le ministère des Transports a choisi de les accompagner vers la légalisation. Le 6 septembre 1989, United Bus (統聯客運, _Tonglian Ke-yun_) a été officiellement fondé par Zhang Jia-zhu, alors directeur de l'Institut de recherche sur les transports du ministère des Transports. Son nom a été choisi pour signifier « diriger les quatre directions et exploiter conjointement ». Elle est ainsi devenue la première société privée de transport d'autocars sur autoroute légale à Taïwan[^16]. Une fois le marché ouvert, des compagnies comme Hesin, Kavalan, Aloha et Capital Bus ont rejoint le secteur, transformant le monopole en une scène où de nombreux acteurs se disputent désormais le marché.

```tw-timeline
1946 | Création de la Direction des routes de la province de Taïwan | Exploitation directe par l'État, monopole du transport routier à Taïwan
1977 | Création indépendante de Taiwan Motor Transport | Séparation de l'activité de transport de la Direction des routes, plus de 10 000 employés au sommet
1989 | Fondation d'United Bus | Légalisation des « bus sauvages », première société privée de transport sur autoroute
2001 | Reprise par Kuo-Kuang Motor Transport | Taiwan Motor Transport perd 5 milliards NT$ par an ; mille employés collectent des fonds pour créer Kuo-Kuang
Source : Archives historiques de la Direction des routes, de Taiwan Motor Transport et de Kuo-Kuang Motor Transport (Taiwan Motor Transport : plus de 500 lignes, 3 600 véhicules, 1 090 employés ayant cotisé en 2001) et rapports sur la création d'United Bus en 1989[^15][^16]
```

Le secteur public, quant à lui, n'a pas connu une telle réussite. Taiwan Motor Transport a accumulé des pertes chroniques, perdant environ 5 milliards NT$ par an qui étaient compensés par le Trésor public ; après l'ouverture à la concurrence, ses lignes et ses effectifs ont considérablement diminué[^15]. En juin 2001, 1 090 employés de Taiwan Motor Transport ont chacun investi 300 000 NT$ pour fonder Kuo-Kuang Motor Transport. En juillet, cette nouvelle entité a repris les 96 lignes initialement exploitées par Taiwan Motor Transport[^15]. De nombreux employés d'âge mûr (entre 40 et 50 ans) n'ayant pas encore l'âge de la retraite ont manifesté pour protester contre ce changement. Le nom « Kuo-Kuang » (國光, signifiant _lumière nationale_) provient en réalité du modèle de bus prestigieux de Taiwan Motor Transport de 1967 ; c'est l'histoire d'un empire qui tire sa révérence en laissant son enseigne à ceux qui reprennent le flambeau.

(Cette partie sur l'histoire institutionnelle n'est qu'un contexte. La nostalgie liée aux modèles _Jinma_ ou _Guoguang_, ainsi que les détails sur la prolifération des « bus sauvages » de l'époque, font l'objet d'un autre article consacré aux autocars de tourisme ; ce passage ne sert ici que de point de repère.)

## Départ à 5 h 30, fin de service à 20 h, quatre jours de repos par mois

Ce qui retire les bus ligne après ligne n’est pas l’œuvre d’un méchant. La raison directe est simple : il n’y a plus assez de personnes pour conduire.

Les chiffres, mis à plat, sont froids. Les conducteurs de bus urbains sont passés de 11 811 en 2015 à 10 588 en 2023 ; sur la même période, leur âge moyen est passé de 45,2 à 51,2 ans, soit six ans de plus en moins d’une décennie[^17]. Les autocars routiers vont encore plus mal : les conducteurs sont passés de 5 646 en 2019 à 3 551 en 2024, soit une baisse de plus d’un tiers en six ans[^3]. À l’échelle nationale, il manque 1 443 conducteurs pour les bus urbains et 772 pour les autocars routiers ; en incluant les autocars de tourisme, la pénurie globale de conducteurs de grands bus dépasse 5 000 personnes[^17][^3]. La part des jeunes conducteurs de moins de 35 ans s’est effondrée de 14 % il y a dix ans à 5,6 %[^17]. Ce métier vieillit rapidement, sans relève.

```tw-line
Les conducteurs de bus sont moins nombreux et plus âgés (bus urbains)
Année | Nombre de conducteurs | Âge moyen
2015 | 11811 | 45.2
2023 | 10588 | 51.2
Source : ministère des Transports, action « Sunshine » de United Daily News
```

Pourquoi les jeunes ne viennent-ils pas, et pourquoi les anciens ne restent-ils pas ? La réponse se trouve dans la structure salariale. Une enquête de The Reporter sur le terrain du travail chez Taoyuan Bus a montré que le salaire mensuel d’un conducteur se compose de jusqu’à 14 éléments ; le salaire de base n’est que de 26 400 NT$, et le reste dépend des heures supplémentaires, qui représentent 35 à 40 %, ainsi que de « primes kilométriques » et de « primes de passagers »[^18]. Le problème est que ces deux dernières primes ne sont pas incluses dans le salaire mensuel fixe ; le salaire horaire moyen utilisé pour calculer les heures supplémentaires, selon le calcul des journalistes, tombe ainsi à seulement 88 NT$[^18]. Les horaires, eux, dévorent les personnes : la conduite quotidienne est plafonnée à 10 heures, mais le temps d’attente entre deux services n’est pas compté comme du temps de travail. Un service typique commence à 5 h 30 et se termine à 20 h ; le conducteur reste attaché au dépôt 16 heures et ne dispose que de 4 à 5 jours de repos par mois[^18]. Dans le dortoir des conducteurs de Taoyuan Bus, les journalistes décrivent un espace de moins de 5 ping avec 8 lits superposés, où 16 conducteurs partagent une petite salle d’eau[^18].

Cette structure produit des choix humains très concrets. Chen Wei-chen, conducteur en poste chez Taoyuan Bus, l’a dit franchement : « Ce dont nous avons besoin, c’est d’argent ; tout le monde accepte de se battre comme ça pour l’argent. Mais maintenant, l’entreprise réduit sans cesse nos heures, et cela devient de plus en plus excessif. » Il fait le calcul : « Le salaire ne suffit déjà plus. Avant, je gagnais 60 000 NT$ par mois ; maintenant seulement 45 000 à 48 000. Il me reste encore 6 ans avant la retraite, mais je n’ai plus envie de continuer. »[^18]

Où vont celles et ceux qui partent ? Le plus souvent vers la logistique, la livraison ou Uber. Après avoir quitté Taoyuan Bus, l’ancien conducteur Hsu Yung-fa est passé à la logistique ; il gagne plus de 10 000 NT$ de moins par mois, mais sa phrase résume la situation du métier : « Transporter des gens et transporter des marchandises, ce n’est pas pareil. La pression est moindre, on n’a pas à être constamment sur le qui-vive, et l’entreprise paie ce qu’elle doit. » Après son départ, il a « enfin compris ce qu’était un week-end de deux jours »[^18]. Chang Hsien-te, assistant manager du département commercial de Sanchung Bus, complète cette logique par une comparaison plus directe : « Dans les deux cas, on conduit… Mais en logistique, ce qui tombe, ce sont des marchandises ; il suffit d’indemniser. Dans le transport de passagers, ce sont des passagers qui tombent, avec deux dents de devant cassées. »[^19]

Mais ce n’est pas une histoire à sens unique où « les conducteurs souffrent et les passagers sont mauvais ». Du côté des passagers aussi naissent des sources de pression : une plainte peut coûter plusieurs milliers de dollars taïwanais au conducteur, si bien que beaucoup développent une attitude défensive et évitent toute interaction quand ils le peuvent[^18]. Le stéréotype courant du « conducteur de bus qui roule vite et se montre désagréable » repose sur une structure réelle faite de longues heures et de sanctions salariales fréquentes ; la pression des « experts du signalement », vue par les passagers, en est l’autre face. Les deux côtés sont pris dans le même système déraisonnable.

La phrase la plus étouffante vient de Fan Kuang-ming, conducteur chez Taoyuan Bus et militant syndical actif. Quand il parle du travail au-delà des horaires, sa colère éclate : « 11 heures, 8 heures, c’est du vent ! Chez Taoyuan Bus, aucun conducteur ne dort plus de 8 heures ! »[^18] Et quand il évoque le moment où, pressé par son service, il n’a pas pu arriver à temps avant la mort de son père, la colère devient remords : « Quand je suis arrivé à l’hôpital, le drap blanc était déjà posé. Je n’ai même pas pu l’appeler papa une fois. Le jour des funérailles, je me suis prosterné 12 fois devant mon père. Je suis un fils indigne. »[^18]

> 📝 **Note de curation** : lorsque nous nous plaignons sous l’arrêt que le bus « n’arrive encore pas » ou « roule trop vite », derrière cette plainte se tient quelqu’un qui alterne les services dans un dortoir de 5 ping et s’épuise pour un salaire horaire moyen de 88 NT$, au point de ne pas avoir pu voir son père une dernière fois. Les racines de la pénurie de conducteurs sont bien plus complexes que « les jeunes ne veulent plus souffrir » : une structure qui soutient un métier où le coût d’une erreur est maximal, puisqu’en cas d’accident ce sont des passagers qui tombent, avec le salaire fixe le plus bas et les temps d’attente les plus longs, a fini par céder. Les bus ne sortent plus parce que de moins en moins de personnes acceptent d’être prises ainsi en étau.

## Après le départ de Hsinchu Bus

![Petit bus rural du service Happy Bus dans le comté de Hsinchu, stationné au terminus, avec les caractères « Happy Bus » sur la carrosserie](/article-images/lifestyle/happy-bus-hsinchu-rural-2025.webp)
_Happy Bus rural dans les cantons de Hukou et Baoshan, comté de Hsinchu, 2025. Après le retrait de Hsinchu Bus de Taoyuan, Hsinchu et Miaoli, ce type de minibus sur réservation a repris une partie des lignes supprimées. Photo : T Gordon Cheng, CC BY-SA 4.0 (source indiquée à la fin de l’article)._

Où la pénurie de conducteurs explose-t-elle d’abord ? Là où les habitants ont le moins de choix.

Revenons à la scène du début. Le retrait de Hsinchu Bus de Taoyuan, Hsinchu et Miaoli n’est qu’un épisode d’une vague plus large de départs d’opérateurs. Aloha Bus a cessé ses activités en 2022 ; Hualien Bus a mis fin à une partie de ses services fin 2023 ; à Taichung, Renyou, Fengyuan, Sifang et Jieshun se sont retirés ; même Kuo-Kuang Motor Transport, qui avait repris Taiqi, cumule plus de 2 milliards de NT$ de dettes, a retardé deux fois le paiement des salaires en six mois en 2025, et a un temps prévu d’arrêter 14 lignes[^20]. Chang Sheng-hsiung, professeur au département de gestion des transports de l’Université Tamkang, a résumé la racine du problème en une phrase : « La compression durable des tarifs a allégé la charge du public, mais elle a aussi limité la qualité des bus et autocars. »[^21] Les tarifs sont maintenus bas, les opérateurs ne gagnent pas d’argent et survivent grâce aux subventions ; quand celles-ci ne suivent plus, les lignes ferment une par une.

C’est le cercle vicieux que décrivent les chercheurs : réduction des services, perte de passagers, nouvelle réduction. Dès que la fréquence diminue, les passagers disparaissent ; dès que les passagers disparaissent, les pertes augmentent ; dès que les pertes augmentent, les opérateurs coupent encore des services. En parlant de ces lignes qui perdent de plus en plus d’argent, Lee Chien-wen, directeur général du groupe Capital, a répété deux fois qu’il n’y avait « pas de solution, absolument pas de solution », car sur les lignes déficitaires, « plus on transporte, plus on perd »[^22]. Les subventions rurales à Taïwan calculent l’écart entre le coût par véhicule-kilomètre et les recettes ; les lignes transportant en moyenne moins de 2 passagers par véhicule-kilomètre peuvent demander une aide[^23]. Mais l’argent des subventions est limité, et les personnes prêtes à conduire le sont encore plus.

Alors, les personnes âgées des zones rurales, celles qui dépendent le plus du bus, sont-elles simplement abandonnées ? Il existe ici un tournant que les récits pessimistes recouvrent facilement. Depuis 2016, Taïwan expérimente le transport à la demande, ou DRTS. En 2019, il a reçu les noms de « Happy Bus » et « Happy Taxi » : au lieu de services fixes, de petits bus ou taxis sur réservation circulent là où des passagers en ont besoin ; leur coût par véhicule-kilomètre est de 30 à 40 NT$, contre 45,85 NT$ pour les autocars traditionnels[^24]. Grâce à ce mécanisme de remplacement, le taux de couverture des transports publics dans les zones rurales isolées est passé de 70 % en 2016 à 91,96 % en 2023, puis à 94,37 % en mars 2025, avec un objectif de 100 % en 2028[^25]. Les 12 lignes de Miaoli abandonnées après le retrait de Hsinchu Bus ont précisément été transférées aux Happy Taxi[^1]. Derrière le grand bus qui s’en va, une série de taxis sur réservation est venue combler le vide.

```tw-line
Couverture des transports publics dans les zones rurales isolées : les grands bus se retirent, petits bus et taxis prennent le relais (%)
Année | Couverture
2016 | 70
2023 | 91.96
2025 | 94.37
Source : Yuan exécutif, Bureau des routes du ministère des Transports, CNA
```

Il est vrai que la couverture est revenue au-dessus de 90 %, mais il ne faut pas lire cela comme « le problème est résolu ». Un minibus sur réservation transporte beaucoup moins de personnes qu’un grand bus ; l’obligation de réserver à l’avance exclut aussi certaines personnes âgées qui doivent sortir à l’improviste ou maîtrisent mal le téléphone. C’est un compromis honnête, pas un triomphe.

## Le train à grande vitesse a emporté les passagers des autocars longue distance

Ce qui pousse les bus vers le bord du précipice, ce n’est pas seulement la pénurie de conducteurs. C’est aussi le train à grande vitesse qui les a écrasés par le haut.

Après l’ouverture du THSR en 2007, une grande partie des voyageurs longue distance du corridor ouest a basculé vers le train à grande vitesse. Les services d’autocars autoroutiers ont été fortement réduits : selon les données du Bureau des routes compilées par Radio Taiwan International et United Daily News, le nombre de services d’autocars autoroutiers a baissé d’environ 40 % entre 2016 et 2024, et la fréquentation de 32,8 %[^26] ; un autre indicateur, le nombre de lignes, montre que les lignes générales d’autocars routiers ont diminué de 43,7 % entre 2012 et 2022[^27]. (Ces deux chiffres ne mesurent pas la même chose : l’un compte les services, l’autre les lignes, et les années de référence diffèrent.) Les longues distances de l’ouest, comme Taipei-Kaohsiung, n’ont retrouvé aujourd’hui qu’un peu plus de 60 % du niveau d’avant la pandémie ; à l’est, la ligne Taipei-Hualien a été consolidée au point qu’il ne reste plus que Kamalan les jours fériés et week-ends[^26]. La distance moyenne parcourue par les passagers est passée de 93 à 67 kilomètres : les voyageurs longue distance ont été emportés par le THSR, et il reste les trajets de moyenne et courte distance[^26].

La conséquence la plus visible est la transformation des gares routières en villes vides. Les opérateurs ont quitté le deuxième étage de la gare routière de Taipei, laissant tout l’étage en attente de nouveaux locataires[^28] ; plusieurs centres de correspondance construits à Taichung suscitent la crainte de devenir des « bâtiments à moustiques », infrastructures vides ou sous-utilisées. Face à cet effondrement, le Bureau des routes a lancé en 2025 ce qu’il présente comme le plus grand plan d’ajustement du réseau depuis 30 ans[^20]. C’est à la fois la reconnaissance que l’ancien réseau ne tient plus et une tentative de redistribution des cartes.

## Le progrès urbain et ses limites

Si l'on ramène l'objectif vers les métropoles, on découvre un visage totalement différent. Pour un même système, le volet urbain fait de grands pas en avant, mais chaque étape se heurte à ses propres limites.

Le premier progrès concerne les bus de ligne (_gànxiàn gōngchē_). Entre 2017 et 2018, la ville de Taipei a reclassifié son réseau de bus ; aux heures de pointe, la fréquence des lignes principales atteint une cadence de 4 à 6 minutes, les rendant aussi simples et prévisibles que le métro[^29]. Le deuxième progrès est le pass mensuel TPASS. Issu d'une promesse électorale de 2022, il a été lancé en juillet 2023 avec un budget spécial de 20 milliards de NT$ pour les trois premières années : des abonnements de 1 200 NT$ pour la zone Keelung-Taipei-New Taipei-Taoyuan, et de 699 ou 999 NT$ pour les zones Miaoli-Taichung-Changhua-Toufen, permettant un usage illimité des bus et du métro[^30].

Le bilan du TPASS doit être lu avec nuance. Du côté positif, il a effectivement incité les gens à utiliser les transports : le volume de passagers dans les bus a augmenté de 19,6 % et celui du métro de 36,9 %[^31]. Cependant, en ce qui concerne la conversion des automobilistes et des conducteurs de deux-roues en usagers des transports en commun, l'effet reste limité : des enquêtes de terrain à Taipei montrent que la proportion réelle de transfert des véhicules privés vers les transports publics n'est que de 7,33 %[^32]. En d'autres termes, la majorité des nouveaux passagers sont des personnes qui « utilisaient déjà les transports et en utilisent désormais davantage », plutôt que des conducteurs ayant « abandonné leur voiture pour le transport en commun ».

Plus concrètement, la question financière se pose : le budget spécial de 20 milliards de NT$ du TPASS expirera fin 2025. Le nouveau plan prévu s'élève à 36,38 milliards de NT$, mais il fait face à une rupture de financement car le budget global est bloqué au Yuan législatif. Vingt comtés et municipalités de Taïwan sont touchés, et de nombreux opérateurs locaux tentent de tenir bon en avançant les fonds eux-mêmes[^32][^33]. Une politique efficace pour attirer les usagers se retrouve ainsi coincée dans une impasse politique.

![Bus électrique BYD K9 de Taipei City Bus devant le zoo de Taipei](/article-images/lifestyle/electric-bus-byd-taipei-2026.webp)
_Un bus électrique BYD K9 de Taipei City Bus circulant devant le zoo de Taipei, en 2026. L'objectif est l'électrification complète des bus urbains d'ici 2030, mais en 2024, seuls environ 18 % sont déjà en service. Photo : 厦门金龙永远的神, CC BY 4.0 (voir les sources des images à la fin de l'article)._

L'électrification constitue le troisième progrès urbain, mais aussi celui où l'écart est le plus frappant. Le gouvernement a annoncé l'électrification complète des bus urbains d'ici 2030, visant à remplacer près de 10 000 bus thermiques (un parc existant d'environ 9 400 véhicules) avec un objectif d'achat subventionné de 11 700 unités. Ce projet, approuvé en juin 2023, dispose d'un budget de 64,3 milliards de NT$[^34]. L'idéal est élevé, mais la réalité est lente : en 2024, seuls environ 1 926 bus électriques sont réellement en service, soit 18 % de l'objectif, et sept comtés affichent un score nul[^35].

```tw-bars
Distance vers l'électrification complète en 2030 (progression de l'électrification des bus urbains)
Bus électriques en service en 2024 | 1926 | Part : 18%
Objectif d'achat subventionné pour 2030 | 11700 | Sept comtés sont actuellement à zéro
Source : Yuan exécutif, Ministère des Transports, fin 2024
```

Où se situe le blocage ? Entre l'octroi des subventions, l'approbation locale et la signature effective des contrats, les montants s'évaporent par étapes (les crédits chutant de 20,8 milliards à 14,04 milliards, puis à 7,44 milliards) ; de plus, les équipements de recharge sont coûteux, une station de recharge coûtant plus de 60 millions de NT$[^35]. Pour un véhicule affiché à 11 millions de NT$ avec une subvention de 6,8 millions, l'opérateur doit encore mobiliser 4,2 millions de NT$. Pour un secteur qui survit déjà grâce aux subventions et peine à recruter des chauffeurs, c'est un investissement difficile à assumer.

> 📝 **Note du commissaire** : Ces trois avancées urbaines (lignes principales, pass mensuel, électrification) ressemblent, de prime abord, à une liste de progrès. Mais elles partagent toutes un postulat invisible : il faut quelqu'un pour conduire ces véhicules. Lorsque l'âge moyen des conducteurs atteint 51 ans et que la pénurie dépasse les 5 000 personnes, le pass mensuel le plus intelligent ou le bus électrique le plus écologique ne resteront que des carcasses de métal immobilisées dans les dépôts. Le progrès urbain est réel, mais il fonce vers l'avant en s'appuyant sur une base de travailleurs qui vieillit rapidement.

## Taïwan n’est pas un cas isolé

Si l’on regarde à l’étranger, on constate que les difficultés de Taïwan ne sont pas uniques.

Au Japon, dont les transports publics sont souvent admirés, le versant rural s’effondre depuis longtemps : 85 % des opérateurs de bus ruraux sont déficitaires, l’âge moyen des chauffeurs de taxi à Hiroshima est de 63 ans, et plus de 20 % de la population vit trop loin d’une gare ou d’un arrêt de bus[^36]. En Corée du Sud, Séoul discute sérieusement l’introduction de conducteurs étrangers, car près de la moitié des conducteurs en poste ont plus de 60 ans[^37]. En Europe, 129 millions de personnes vivent dans des zones où les transports publics sont insuffisants, et au Royaume-Uni les recettes des bus ruraux couvrent moins de 25 % des coûts[^38]. Dépeuplement rural, vieillissement des conducteurs, contraction des lignes : c’est un problème structurel partagé en Asie de l’Est et dans le monde. La différence de Taïwan tient surtout à sa dépendance plus profonde au scooter, qui place dès le départ le bus dans l’ombre de celui-ci.

Fait intéressant, un élément taïwanais est au contraire traité comme une référence internationale. L’organisation californienne de défense des transports Seamless Bay Area présente le TPASS comme un exemple dont la Californie pourrait s’inspirer, et identifie trois facteurs de réussite : des subventions suffisantes, une volonté politique centrale et une exécution locale flexible[^39]. Or les plus grands bénéficiaires du TPASS ne sont justement pas les élites urbaines, mais les zones rurales isolées. Après le lancement du TPASS, la fréquentation des bus à Hualien a augmenté de 69,8 %, l’exemple rural le plus marqué dans cette analyse[^39].

```tw-figure
+69.8%
Croissance de la fréquentation des bus à Hualien après le lancement du TPASS : un pass mensuel bon marché produit l’effet le plus fort là où les gens ont le moins de choix
Analyse de Seamless Bay Area
```

Ce chiffre répond directement à l’idée selon laquelle le bus serait un jouet d’élite urbaine. À Taipei, un pass mensuel bon marché est un avantage supplémentaire ; à Hualien, il réduit réellement le coût de sortie du domicile. Plus un territoire a peu de choix, plus une petite amélioration produit un effet important.

## Le dernier bus, vers celles et ceux qui en ont le plus besoin

Revenons à ce matin-là, devant la gare ferroviaire de Tongluo.

Ces plus de 30 personnes, des enfants de maternelle à une personne de 90 ans, ont applaudi le dernier service 5658 de Hsinchu Bus. De la première ligne de bus exploitée en réseau à Taipei en 1977, aux cars clandestins devenus UBus en 1989, des données ouvertes qui alimentent les comptes à rebours de Google aux conducteurs âgés en moyenne de 51 ans et aux lignes rurales supprimées une par une, ce système, arrivé jusqu’ici, a toujours transporté le même groupe : les personnes sans volant, incapables de prendre la route seules. Sa cruauté la plus grande est de s’arrêter d’abord sous les pieds de celles et ceux qui en ont le plus besoin.

Mais l’histoire ne s’arrête pas au départ de ce grand bus. Une fois les applaudissements dissipés, les 12 lignes de Miaoli ont été remplacées par des Happy Taxi ; les passagers passent un appel, et le véhicule vient jusqu’à leur porte. Ce n’est pas un triomphe : un minibus sur réservation transporte peu, il faut réserver à l’avance, et tout le monde ne peut pas y accéder. Mais c’est un signal : quand les grands bus ne tiennent plus, le système essaie de prendre une autre forme pour rattraper les personnes qu’il devait de toute façon soutenir. Si la couverture rurale revient à 94 %, ce n’est pas parce que les bus sont plus nombreux ; c’est parce qu’une société n’a pas encore décidé de faire descendre ces personnes du véhicule.

La prochaine fois que vous attendrez sous un arrêt, que ce soit à Taipei en trouvant le bus trop long ou dans la campagne de Changhua en attendant l’un des deux services de la journée, souvenez-vous que vous n’attendez pas seulement un véhicule. Vous attendez un système qui s’efforce de tenir pour les « personnes sans volant », et qui s’essouffle d’abord là où l’on en a le plus besoin. Le fait qu’il arrive ou non n’a jamais mesuré seulement l’efficacité des transports. Il mesure un choix social : la volonté, ou non, d’embarquer celles et ceux qui ne peuvent pas prendre la route par eux-mêmes.

Le dernier 5658 est parti. Mais tant qu’il restera quelqu’un pour lever la main sous un arrêt, il restera un véhicule tenu de venir pour lui.

**Pour aller plus loin** : [Système de transport de Taïwan](/fr/lifestyle/transportation-system), [Culture du scooter à Taïwan](/fr/lifestyle/taiwan-scooter-culture), [Histoire du développement du métro à Taïwan](/fr/lifestyle/history-of-taiwan-mrt-development), [Autocar de tourisme](/fr/lifestyle/tour-bus)

## Sources des images

Cet article utilise 6 images sous licence Creative Commons, toutes mises en cache dans `public/article-images/lifestyle/` afin d’éviter les liens directs vers les serveurs sources :

- [Holly Cheng](https://commons.wikimedia.org/wiki/File:Taipei_street_scene.jpg) — scooters et bus à un carrefour de Taipei (hero), 1996, CC BY-SA 3.0
- [Nutnse0008](https://commons.wikimedia.org/wiki/File:Shing_Nan_Bus_421-U9_20160423.jpg) — bus à plancher bas de Shing Nan Bus à Tainan, 2016, CC BY-SA 4.0
- [T Gordon Cheng](<https://commons.wikimedia.org/wiki/File:Taipei_Main_Station_(Zhengzhou)_bus_shelter_20201024.jpg>) — abribus de la gare principale de Taipei, 2020, CC BY-SA 4.0
- [Wei Ting Hsu](<https://commons.wikimedia.org/wiki/File:%E5%9C%8B%E5%85%89%E5%AE%A2%E9%81%8B_KKA-1897_(2026.3.11).jpg>) — autocar autoroutier de Kuo-Kuang Motor Transport, 2026, CC BY-SA 4.0
- [T Gordon Cheng](https://commons.wikimedia.org/wiki/File:%E6%B9%96%E5%8F%A3%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_1%E8%99%9F%E7%B7%9A_and_%E5%AF%B6%E5%B1%B1%E9%84%89%E5%B9%B8%E7%A6%8F%E5%B7%B4%E5%A3%AB_%E4%B8%89%E5%B3%B0%E7%B7%9A_2025-09-30.jpg) — Happy Bus rural du comté de Hsinchu, 2025, CC BY-SA 4.0
- [厦门金龙永远的神](https://commons.wikimedia.org/wiki/File:Taipei_bus_BYD_K9.jpg) — bus électrique BYD K9 de Taipei Bus, 2026, CC BY 4.0

## Références

[^1]: [CNA : des habitants de Tongluo montent dans le dernier bus de Hsinchu Bus en souvenir](https://www.cna.com.tw/news/ahel/202409150184.aspx) — reportage du 15 septembre 2024 documentant le retrait de Hsinchu Bus de Taoyuan, Hsinchu et Miaoli, la scène d’adieu au dernier service 5658 à Tongluo, avec citation verbatim du représentant local Hsu Yu-feng ; l’heure, le lieu et le numéro de ligne sont vérifiables.

[^2]: [Département des statistiques du ministère des Transports : enquête sur l’usage quotidien des modes de déplacement](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202201270001&type=s) — enquête officielle du ministère des Transports fournissant les données de première main sur la part modale des transports publics, 53,3 % pour les ménages sans voiture contre 13,7 % pour les ménages motorisés, ainsi que les taux d’usage par âge et pour les trajets scolaires.

[^3]: [Taisounds : effondrement des autocars, les conducteurs d’autocars routiers diminuent d’un tiers en six ans](https://www.taisounds.com/news/content/125/204965) — reportage indiquant que les conducteurs d’autocars routiers sont passés de 5 646 en 2019 à 3 551 en 2024, avec les déficits de main-d’œuvre et plus de 2 milliards de NT$ de dettes pour Kuo-Kuang Motor Transport, d’après les statistiques du Bureau des routes.

[^4]: [ScienceDirect : étude sur les déplacements et le développement urbain dans les villes de scooters à Taïwan](https://www.sciencedirect.com/science/article/abs/pii/S0967070X25002446) — article académique quantifiant la dépendance de Taïwan au scooter : 599 scooters pour 1 000 habitants, 83,7 % des ménages possèdent un scooter, et seulement 12,5 % dépendent principalement des transports publics.

[^5]: [Vocus : les moyens de transport et la vie des travailleurs migrants à Taïwan](https://vocus.cc/article/63dcb90efd89780001509011) — explique que les travailleurs migrants à Taïwan, en raison de restrictions anciennes à l’achat de véhicules, utilisent surtout le scooter au quotidien et ne prennent les autocars que pour les longs trajets de week-end, corrigeant l’idée reçue selon laquelle ils dépendraient des bus.

[^6]: [Wikipédia : bus urbains de Taipei](https://zh.wikipedia.org/zh-tw/臺北市市區公車) — retrace l’histoire du système de bus exploités conjointement à Taipei : création du comité préparatoire en 1976, mise en service initiale des lignes 201/202 le 1er janvier 1977, puis exploitation des 33 lignes de première phase le 30 avril.

[^7]: [Wikipédia : EasyCard](https://zh.wikipedia.org/zh-hk/悠遊卡) — enregistre la chronologie de l’électronisation des titres de transport, dont la généralisation de l’EasyCard aux bus fin septembre 2002 et le lancement de l’iPass en 2014 avec le métro de Kaohsiung.

[^8]: [Département des transports publics de Taipei : communiqué sur la validation à double sens dans les bus](https://pto.gov.taipei/News_Content.aspx?n=6B4D38874E971F4B&sms=87415A8B9CE81B16&s=954214BF3AA2EA89) — source primaire de Taipei expliquant la première phase de la validation à double sens le 1er juillet 2019, la deuxième phase en février 2020, et ses objectifs de calcul précis des tarifs par sections et des réductions de correspondance.

[^9]: [Ministère des Transports : statistiques de fréquentation des bus urbains](https://www.motc.gov.tw/ch/app/data/doc?id=55&module=topics&detailNo=1&serno=202112090001&type=s) — statistiques officielles du ministère des Transports : en 2020, Taipei et Nouveau Taipei représentaient 73,7 % de la fréquentation nationale des bus urbains, donnée robuste sur la concentration urbaine-rurale de la demande.

[^10]: [Site officiel TDX, service de circulation des données de transport](https://tdx.transportdata.tw/) — plateforme officielle du ministère des Transports retraçant la gouvernance des données ouvertes : création de PTX en 2016 et intégration-mise à niveau vers TDX en décembre 2022.

[^11]: [iThome : ampleur des données ouvertes TDX et usage par Google Maps](https://www.ithome.com.tw/news/142077) — reportage indiquant plus de 4,9 millions d’appels API quotidiens, 540 millions de données diffusées, plus de 3 000 opérateurs de services à valeur ajoutée, et confirmant que Google Maps utilise les données TDX pour les arrivées de bus à Taïwan.

[^12]: [Medium : tutoriel API TDX et analyse des standards de données](https://medium.com/@ycpin/data-mining-transport-data-exchange-tdx-api-tutorial-and-demonstration-14bba4a58e9b) — analyse technique expliquant que TDX utilise un format OData personnalisé « quatre étoiles », dispose d’un GTFS Beta mais non d’un standard international pleinement diffusé, et qu’aucune organisation internationale ne semble citer Taïwan comme référence.

[^13]: [PTT, forum Bus : discussion sur la source TDX commune des applications de bus](https://www.ptt.cc/bbs/Bus/M.1613871840.A.47D.html) — discussion d’internautes révélant que les applications de bus se branchent sur le même backend TDX, que le GPS est instable dans les zones de hauts immeubles, et clarifiant que « 1968 » est une numérotation et application d’informations autoroutières, non une application de bus urbains.

[^14]: [PTT, forum Taichung : fil de plaintes sur les services fantômes des bus de Taichung](https://www.ptt.cc/bbs/TaichungBun/M.1691104386.A.D22.html) — discussion publique de 2023 où les utilisateurs LeiHide et teddykitty décrivent textuellement l’expérience de « services fantômes », l’application indiquant un bus qui n’arrive pas ; vérifiable par recherche Ctrl-F.

[^15]: [Taiwan Panorama : de Taiwan Motor Transport à Kuo-Kuang Motor Transport](https://www.taiwan-panorama.com/Articles/Details?Guid=593707a8-2be1-462d-aed7-73883b3e20f0) — détaille la création du Bureau des routes en 1946, celle de Taiqi en 1977, les pertes annuelles de 5 milliards de NT$, puis en 2001 les 1 090 employés investissant chacun 300 000 NT$ pour fonder Kuo-Kuang et reprendre 96 lignes.

[^16]: [Wikipédia : UBus](https://zh.wikipedia.org/zh-tw/統聯客運) — consigne que le nom de Tonglian vient de Chang Chia-juch, directeur de l’Institut des transports, avec le sens de « diriger dans toutes les directions et exploiter conjointement », et que l’entreprise a été fondée le 6 septembre 1989 comme première compagnie privée légale d’autocars autoroutiers à Taïwan.

[^17]: [United Daily News, action Sunshine : enquête sur la pénurie de conducteurs d’autocars](https://udn.com/news/story/10098/8766101) — d’après les données du ministère des Transports, les conducteurs de bus urbains passent de 11 811 en 2015 à 10 588 en 2023, l’âge moyen de 45,2 à 51,2 ans, avec un déficit de 1 443 en urbain et 772 en routier.

[^18]: [The Reporter : seulement 88 NT$ de l’heure, le terrain du surmenage des conducteurs de Taoyuan Bus](https://www.twreporter.org/a/tybus-driver-overwork) — enquête approfondie sur la structure de travail chez Taoyuan Bus : 14 éléments de rémunération, salaire de base de 26 400 NT$, salaire horaire moyen calculé à 88 NT$, dortoir de 5 ping partagé par 16 personnes, avec citations nominatives de Fan Kuang-ming, Chen Wei-chen et Hsu Yung-fa.

[^19]: [The Reporter : vague de pénurie de main-d’œuvre dans le secteur des autocars (partie 2)](https://www.twreporter.org/a/current-challenges-of-bus-industry-2) — entretiens avec Chang Hsien-te, assistant manager commercial de Sanchung Bus, et Wang Shuo-chien, chef de station à Nangang, avec citations sur la difficulté à trouver des conducteurs et la différence de responsabilité entre transporter des personnes et des marchandises.

[^20]: [United Daily News : le Bureau des routes lance la plus grande restructuration du réseau depuis 30 ans](https://udn.com/news/story/7266/9256802) — reportage sur la contraction des services et des lignes d’autocars autoroutiers, les dettes de plus de 2 milliards de NT$ et les retards de salaire chez Kuo-Kuang, la vague de retraits d’opérateurs, et le plan 2025 d’ajustement du réseau du Bureau des routes.

[^21]: [The Reporter : la crise des voyages à vide en sens unique de la ligne 9005 et les difficultés du secteur](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — cite Chang Sheng-hsiung, professeur au département de gestion des transports de l’Université Tamkang, sur la manière dont la compression durable des tarifs limite la qualité des bus et autocars.

[^22]: [The Reporter : la crise des voyages à vide en sens unique de la ligne 9005 et les difficultés du secteur](https://www.twreporter.org/a/current-challenges-of-bus-industry-1) — entretien avec Lee Chien-wen, directeur général du groupe Capital, et ses citations « pas de solution, absolument pas de solution » et « plus on transporte, plus on perd », analysant la structure déficitaire des lignes à retours à vide.

[^23]: [Règlement de subvention des lignes de bus de service en zones éloignées de Taipei](https://laws.gov.taipei/law/LawSearch/LawArticleContent/FL026380) — source réglementaire primaire précisant que la formule de subvention rurale est le coût raisonnable par véhicule-kilomètre moins les recettes, multiplié par les services et la distance, et que les lignes transportant moins de 2 passagers par véhicule-kilomètre peuvent demander l’aide.

[^24]: [Site officiel Happy Bus : qu’est-ce que le Happy Bus](https://www.happybus.com.tw/Whatisbus) — site officiel du Bureau des routes expliquant l’expérimentation du transport à la demande (DRTS) en 2016, la dénomination « Happy Bus » et « Happy Taxi » en 2019, et le coût de 30 à 40 NT$ par véhicule-kilomètre.

[^25]: [Yuan exécutif : couverture des transports publics en zones rurales isolées et équité des transports](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/25b3096e-90ec-42cf-bd2b-5a0b65d409eb) — données officielles : couverture des transports publics ruraux de 70 % en 2016, 91,96 % en 2023, 94,37 % en mars 2025, avec un objectif de 100 % en 2028.

[^26]: [Radio Taiwan International : les autocars autoroutiers sous l’impact du train à grande vitesse](https://www.rti.org.tw/news?pid=186039&uid=3) — reportage indiquant qu’après l’ouverture du THSR, les services d’autocars autoroutiers ont chuté d’environ 40 % entre 2016 et 2024, la fréquentation de 32,8 %, la distance moyenne de 93 à 67 km, et qu’à l’est seule Kamalan circule les jours fériés et week-ends.

[^27]: [The News Lens : réduction décennale du nombre de lignes générales d’autocars routiers](https://www.thenewslens.com/article/193854) — d’après les données du Bureau des routes, le nombre de lignes générales d’autocars routiers a diminué de 43,7 % entre 2012 et 2022, un indicateur de déclin distinct de la baisse des services.

[^28]: [ETtoday : le deuxième étage de la gare routière de Taipei vidé par les départs de locataires](https://www.ettoday.net/news/20241020/2838555.htm) — reportage sur le départ des opérateurs du deuxième étage de la gare routière de Taipei et l’étage en attente de location, reflet de l’impact en chaîne du déclin des autocars autoroutiers sur les infrastructures de correspondance.

[^29]: [Wikipédia : lignes principales de bus de Taipei](https://zh.wikipedia.org/wiki/臺北市幹線公車) — enregistre la restructuration du réseau de bus de Taipei en quatre niveaux en 2017 et 2018, et le principe de lignes principales passant toutes les 4 à 6 minutes aux heures de pointe.

[^30]: [The Reporter : un an après le lancement du pass mensuel TPASS](https://www.twreporter.org/a/data-reporter-a-year-after-tpass-was-launched) — reportage approfondi sur l’origine politique du TPASS, le pass mensuel à 1 200 NT$ pour Keelung-Taipei-Nouveau Taipei-Taoyuan, le budget spécial de 20 milliards de NT$ sur trois ans, et le bilan multidimensionnel après un an.

[^31]: [Taipei Times : le TPASS augmente la fréquentation des bus et du métro](https://www.taipeitimes.com/News/front/archives/2024/07/11/2003820639) — reportage en anglais indiquant qu’après le lancement du TPASS, la fréquentation des bus a augmenté de 19,6 %, celle du métro de 36,9 %, avec plus de 700 000 usagers.

[^32]: [Storm Media : taux de transfert TPASS limité à 7,33 % et risque de rupture de financement en 2026](https://www.storm.mg/lifestyle/11093047) — reportage indiquant un taux de transfert depuis les véhicules privés de seulement 7,33 %, et le risque de rupture du nouveau plan à 36,38 milliards de NT$ en raison du blocage du budget général, touchant 20 villes et comtés.

[^33]: [PTS News : expiration du budget spécial TPASS et blocage du plan de relais](https://news.pts.org.tw/article/801336) — reportage sur l’expiration fin 2025 du budget spécial TPASS de 20 milliards de NT$, le nouveau budget de 36,38 milliards affecté par l’examen du budget général, et les avances de fonds par les collectivités locales.

[^34]: [Yuan exécutif : politique d’électrification complète des bus d’ici 2030](https://www.ey.gov.tw/Page/5A8A0CB5B41DA11E/fbaa04ca-a430-48e7-8ba1-0b35d1dc4879) — politique officielle : électrification complète des bus urbains d’ici 2030, près de 10 000 bus diesel à remplacer, objectif d’achats subventionnés de 11 700 véhicules, plan approuvé en juin 2023 avec 64,3 milliards de NT$.

[^35]: [Epoch Times : 1 926 bus électriques immatriculés fin 2024](https://www.epochtimes.com/b5/25/1/8/n14409087.htm) — d’après les données du ministère des Transports, environ 1 926 bus électriques effectivement en service fin 2024, soit 18 %, avec 7 villes et comtés à zéro, et explication des écarts entre subventions, contrats et coûts des infrastructures de recharge.

[^36]: [Forum économique mondial : les difficultés des transports publics ruraux au Japon](https://www.weforum.org/stories/2020/01/japans-much-admired-public-transit-system-is-leaving-its-rural-areas-behind/) — reportage en anglais : 85 % des opérateurs de bus ruraux japonais sont déficitaires, les chauffeurs de taxi d’Hiroshima ont 63 ans en moyenne, et plus de 20 % de la population vit trop loin d’une gare ou d’un arrêt.

[^37]: [Korea Herald : vieillissement des conducteurs de bus à Séoul et débat sur les conducteurs étrangers](https://www.koreaherald.com/article/10011103) — reportage en anglais : près de la moitié des conducteurs de bus de Séoul ont plus de 60 ans, le déficit est d’environ 600 personnes, et les autorités discutent l’introduction de conducteurs étrangers, illustrant une pénurie commune en Asie de l’Est.

[^38]: [Interreg Europe : défis de la mobilité rurale en Europe](https://www.interregeurope.eu/rural-mobility) — plateforme européenne de coopération régionale indiquant que 129 millions de personnes en Europe vivent dans des zones insuffisamment desservies par les transports publics, et qu’au Royaume-Uni les recettes des bus ruraux couvrent moins de 25 % des coûts, confirmant le caractère structurel mondial du problème.

[^39]: [Seamless Bay Area : enseignements de l’intégration tarifaire taïwanaise pour la Californie](https://www.seamlessbayarea.org/blog/2025/1/5/notes-from-taiwan-regional-transit-fare-integration-programs-fuel-taiwans-ridership-growth) — analyse d’une organisation californienne de défense des transports présentant le TPASS comme une référence dont la Californie pourrait s’inspirer, avec trois facteurs : subventions suffisantes, volonté politique centrale et exécution locale flexible.
