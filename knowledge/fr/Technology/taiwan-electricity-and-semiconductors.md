---
translatedFrom: 'Technology/台灣的電力與半導體.md'
sourceCommitSha: '250410ea'
sourceContentHash: 'sha256:739eb8c857d7b377'
sourceBodyHash: 'sha256:814f9eb8b97792cf'
translatedAt: '2026-07-24T01:30:00+08:00'
lang: 'fr'
title: 'Électricité et semi-conducteurs à Taïwan : la facture électrique de la montagne sacrée qui protège le pays'
description: 'L’atout international des semi-conducteurs taïwanais repose sur un système électrique très concret. Les usines de plaquettes de pointe, la lithographie EUV, l’encapsulation avancée, les tests de serveurs d’IA et les centres de données exigent tous une alimentation stable, peu interrompue et extensible. Ce texte ne fait pas de la consommation électrique des semi-conducteurs une simple dénonciation écologiste : il la replace dans le rapport de force des chaînes d’approvisionnement — le monde a besoin que Taïwan fabrique les puces d’IA, et Taïwan doit aussi répondre à la question de savoir qui assume le coût électrique, la pression carbone et le risque pour la sécurité énergétique.'
date: 2026-07-11
category: 'Technology'
tags:
  - 'semi-conducteurs'
  - 'électricité'
  - 'énergie'
  - 'TSMC'
  - 'matériel d’IA'
  - 'chaîne d’approvisionnement'
subcategory: 'Semi-conducteurs et matériel'
author: 'Taiwan.md Translation Team'
featured: false
lastVerified: 2026-07-11
lastHumanReview: false
researchReport: 'reports/research/2026-07/半導體供應鏈草稿地圖.md'
rationale:
  why_this_hook: 'Relier vers le bas la « montagne sacrée qui protège le pays » au réseau électrique, pour que le lecteur voie la facture d’infrastructure qui se cache derrière l’atout des semi-conducteurs.'
  whats_excluded: 'Ne pas transformer l’article en plaidoyer à sens unique sur le nucléaire, l’énergie verte ou la politique tarifaire.'
  where_it_hedges: 'Traiter simultanément la stabilité de l’alimentation, l’électricité bas carbone, la compétitivité industrielle, le coût public et la sécurité énergétique.'
  whos_pushing_back: 'Les industries des semi-conducteurs et de l’IA ont besoin d’une électricité stable et bas carbone, mais la société interroge aussi les coûts, les risques, la charge environnementale et l’équité de la répartition.'
image: '/article-images/nature/maanshan-nuclear-plant-nan-wan-2014.webp'
imageCredit: 'M. Weitzel / Wikimedia Commons'
imageLicense: 'CC BY-SA 3.0'
---

# Électricité et semi-conducteurs à Taïwan : la facture électrique de la montagne sacrée qui protège le pays

> **En 30 secondes :** les semi-conducteurs ne se font pas seulement avec des ingénieurs, des usines de plaquettes et des équipements de pointe, mais aussi avec un réseau électrique stable. Plus les puces d’IA sont puissantes, plus la fabrication des plaquettes, l’encapsulation avancée, les tests de serveurs et les centres de données ont besoin d’électricité. C’est ainsi que Taïwan a obtenu un atout dans la chaîne d’approvisionnement mondiale, et c’est ainsi qu’elle a fait entrer dans une même facture les tarifs de l’électricité, l’importation de combustibles, les énergies renouvelables, les émissions de carbone et le risque de coupure.

25,55 milliards de kilowattheures.

C’est la consommation électrique de TSMC en 2024 selon le média spécialisé Tom's Hardware. Cet article traitait à l’origine de la manière dont TSMC réduit la consommation de pointe des machines de lithographie EUV, et mentionnait que ces économies pourraient représenter 190 millions de kilowattheures en moins d’ici 2030. Mais le même texte plaçait à côté l’ordre de grandeur de la consommation annuelle de TSMC : 25,55 milliards de kilowattheures.[^1]

Ces deux chiffres côte à côte changent l’image. Quand on parle de la « montagne sacrée qui protège le pays », on pense en général à TSMC, aux procédés de pointe, au cours de l’action, aux exportations et à l’atout diplomatique. Les 25,55 milliards de kilowattheures ramènent cette même montagne au sol, au réseau, au combustible, aux centrales, aux contrats d’énergie renouvelable et à chacune des factures.

Une usine de plaquettes de pointe ne peut pas tomber en panne de courant. Les machines EUV, la climatisation des salles blanches, l’approvisionnement en produits chimiques, le traitement des gaz d’échappement, les systèmes d’eau ultrapure, les équipements de mesure, les centres de données et les systèmes de secours doivent tous fonctionner de façon stable. Que les puces puissent être produites en série dépend au bout du compte de la stabilité de l’alimentation.

C’est aussi pourquoi la consommation électrique des semi-conducteurs ne devrait pas s’écrire seulement comme « TSMC consomme énormément ».

La question la plus juste est celle-ci : quand Taïwan accueille la demande mondiale de puces d’IA et de fabrication de pointe, qui fournit cette électricité stable ? Qui assume l’importation de combustibles et la pression carbone ? Qui paie le coût quand les tarifs sont ajustés ? Qui assume le risque en cas de coupure ou d’instabilité du réseau ?

![Vue extérieure de la troisième centrale nucléaire près de Nanwan, à Hengchun (comté de Pingtung) : les bâtiments, la cheminée et le trait de côte dans un même cadre, une scène où se croisent les choix électriques de Taïwan et l’environnement local.](/article-images/nature/maanshan-nuclear-plant-nan-wan-2014.webp)

_La troisième centrale nucléaire (centrale de Maanshan) à Hengchun, comté de Pingtung. La demande électrique de l’IA et des semi-conducteurs a ramené dans l’espace public le débat sur le nucléaire, le gaz, les renouvelables et la résilience du réseau. Photo : M. Weitzel. CC BY-SA 3.0 via Wikimedia Commons._

## La demande d’IA finit par revenir au compteur

L’IA générative ressemble à un service dans le nuage, mais ce sont en réalité des machines qui calculent.

Une puce d’IA, de la conception à la mise en service, traverse la fabrication des plaquettes, l’encapsulation avancée, les tests, la carte mère, l’alimentation, la dissipation, le rack et le centre de données. Chaque étape consomme de l’électricité. La fabrication amont en consomme parce que les équipements de procédé et l’environnement propre ne peuvent pas être interrompus. L’encapsulation aval en consomme parce que l’intégration des puces et de la mémoire devient de plus en plus complexe. Les serveurs d’IA en consomment parce que les GPU et les accélérateurs transforment de grandes quantités d’électricité en calcul, et aussi en chaleur.

La chaîne d’approvisionnement de l’IA n’est donc pas seulement ce mot abstrait, « puissance de calcul ». Le calcul a des factures d’électricité, un réseau, des groupes au gaz, des achats d’énergie renouvelable, et aussi des émissions de carbone.

Le sens de ces 25,55 milliards de kilowattheures du début n’est pas d’impressionner, mais de rappeler au lecteur que l’avantage des procédés de pointe repose sur un apport énergétique énorme et continu. Les machines EUV peuvent économiser de l’énergie, les salles blanches peuvent être optimisées, les systèmes d’usine peuvent être réglés. Mais tant que la demande d’IA continue de pousser les capacités vers le haut, la pression sur le total ne disparaîtra pas d’elle-même parce qu’un équipement consomme moins.

C’est aussi ce qui distingue l’ère de l’IA de l’électronique d’autrefois. Autrefois, parler de la fabrication taïwanaise revenait à parler d’efficacité industrielle, de densité de fournisseurs, de culture des ingénieurs et de délais. Il faut désormais ajouter une question : Taïwan peut-elle raccorder de façon stable la demande mondiale de calcul à son propre réseau électrique ?

Si la réponse est oui, l’électricité fait partie du crédit de Taïwan dans la chaîne d’approvisionnement. Si la réponse commence à vaciller, les clients étrangers feront entrer dans le même tableur la localisation de la fabrication, l’accès aux renouvelables, le risque de coupure et la géopolitique.

## La stabilité compte plus que le prix bas

Quand on parle d’électricité, on pense d’abord au prix. Mais pour une usine de plaquettes, la stabilité peut compter davantage que le seul tarif.

De nombreuses étapes de la fabrication doivent se dérouler en continu dans un environnement hautement contrôlé. Fluctuations de tension, microcoupures ou qualité d’alimentation instable peuvent provoquer des arrêts d’équipement, des produits mis au rebut ou des ruptures de planning. Pour un foyer, quelques minutes sans courant sont une gêne ; pour une usine de pointe, quelques minutes peuvent représenter un lot de plaquettes, un pan de rendement, voire la confiance d’un client.

C’est aussi l’un des points les plus négligés du rapport de force des chaînes d’approvisionnement. Les clients étrangers ont besoin de Taïwan parce que Taïwan sait livrer des puces de manière durable, stable et ponctuelle. Une alimentation électrique stable devient donc une partie du crédit taïwanais.

Inversement, quand les clients internationaux et les gouvernements évaluent l’idée de déplacer une partie de la fabrication vers les États-Unis, le Japon ou l’Europe, l’électricité entre aussi en ligne de compte. Ce n’est pas seulement le risque géopolitique qui pousse à construire des usines à l’étranger : l’approvisionnement énergétique, la structure tarifaire, l’accès aux renouvelables et la résilience du réseau entrent également dans le calcul.

Il y a là une subtilité. Une partie de la compétitivité passée de Taïwan venait d’une électricité stable et relativement abordable. Mais lorsque la transition énergétique, les prix des combustibles, les finances de Taipower, les tarifs industriels et la pression de décarbonation montent en même temps, cette base ne peut plus aller de soi.

Ce que veut l’industrie des semi-conducteurs, c’est une électricité « bon marché, stable, bas carbone et extensible ». Le problème, c’est qu’il est très difficile de satisfaire ces quatre conditions à la fois. Une électricité bon marché peut réduire les coûts des entreprises mais faire porter davantage à Taipower ou à la population ; une électricité stable peut exiger des capacités de réserve, des groupes au gaz ou du stockage ; une électricité bas carbone exige des renouvelables, du nucléaire ou d’autres solutions ; et l’extensibilité touche au foncier, au réseau, aux ports, aux terminaux méthaniers et à l’acceptation locale.

Le problème électrique des semi-conducteurs est donc à la fois technique, financier et politique.

## L’énergie verte devient peu à peu une condition des commandes

La consommation électrique des semi-conducteurs subit encore une autre pression : les engagements de décarbonation des clients.

Apple, NVIDIA, les grands acteurs du nuage et les marques mondiales affrontent la pression carbone de leur chaîne d’approvisionnement. Ils ne regardent pas seulement si TSMC sait fabriquer la puce, mais aussi d’où vient l’électricité du processus de production. Quand un client s’engage sur le net zéro ou sur RE100, la consommation du fournisseur cesse d’être un coût interne pour devenir une partie de l’empreinte carbone du produit du client.

Les semi-conducteurs taïwanais font donc face à une double exigence : augmenter la production d’un côté, obtenir davantage d’électricité bas carbone de l’autre. Augmenter la production accroît la consommation, et décarboner exige de transformer la structure électrique. Lorsque les deux surviennent en même temps, la difficulté ne se résout plus par les seules économies d’énergie d’une entreprise.

Tom's Hardware, reprenant un article de DigiTimes, indique que l’Association taïwanaise de l’industrie des semi-conducteurs a alerté le gouvernement sur l’urgence de la stabilité électrique et de l’approvisionnement en renouvelables ; l’article mentionne aussi qu’en 2024 la part des renouvelables dans la consommation des usines de plaquettes taïwanaises restait inférieure à ce qu’exige la trajectoire RE100.[^2] De tels articles ne devraient pas se lire comme une simple plainte contre le gouvernement, mais être replacés dans le contexte de la chaîne d’approvisionnement : si les clients veulent des puces bas carbone, Taïwan doit disposer d’assez d’électricité bas carbone.

C’est pourquoi l’« énergie verte » n’est pas un joli slogan dans les semi-conducteurs. Elle devient peu à peu une condition des commandes, une condition financière et une condition diplomatique.

![Parc éolien en mer au large de Miaoli, avec les éoliennes blanches alignées sur la mer, une scène représentative de l’expansion des renouvelables à Taïwan.](/article-images/nature/hai-neng-offshore-wind-farm-2024.webp)

_Parc éolien en mer au large de Miaoli. Quand les clients des semi-conducteurs exigent une chaîne bas carbone, la consommation des usines de plaquettes se raccorde jusqu’aux parcs éoliens, au raccordement réseau, au stockage et à la concertation locale. Image : ministère des Affaires économiques de la République de Chine, CC BY-SA 4.0 via Wikimedia Commons._

Si Taïwan parvient à offrir un environnement de fabrication bas carbone et stable, son caractère irremplaçable n’en sera que renforcé. Si Taïwan ne peut offrir qu’une fabrication à haute densité sans suivre les exigences carbone de ses clients, une partie des commandes pourrait être poussée vers d’autres régions, ou l’on demandera aux entreprises taïwanaises de construire à l’étranger pour y obtenir de l’électricité bas carbone.

## Les gains d’efficacité ne compensent pas automatiquement la croissance du total

Les entreprises économisent bien sûr de l’énergie. Les machines EUV, la climatisation des salles blanches, les systèmes d’usine, les équipements de procédé et les centres de données ont tous une marge d’amélioration.

Mais les gains d’efficacité et la pression sur le total sont deux choses différentes.

Si chaque équipement consomme moins, mais que le nombre d’équipements, la capacité de production de plaquettes, la capacité d’encapsulation avancée, les tests de serveurs d’IA et la demande des centres de données augmentent plus vite, la consommation totale continuera de monter. C’est le dilemme de la chaîne de l’IA : le progrès technique améliore souvent l’efficacité tout en créant une demande plus grande.

L’étude de Roussilhe et al., portant sur 16 fabricants taïwanais de composants électroniques, indique qu’entre 2015 et 2020 les émissions de gaz à effet de serre, l’énergie finale, la consommation électrique et l’usage de l’eau des entreprises de l’échantillon ont augmenté avec la croissance de la production, et pose le risque du carbon lock-in.[^3] Cet avertissement est important : la montée en gamme industrielle n’entraîne pas automatiquement une baisse de la charge environnementale.

Autrement dit, Taïwan ne peut pas se demander seulement « chaque plaquette consomme-t-elle moins ? ». Il faut aussi demander : « une fois l’ensemble de l’industrie agrandi, comment gère-t-on la consommation totale, les émissions totales, les importations totales de combustibles et la charge sur le réseau ? ».

Cette question ne disparaîtra pas parce que Taïwan est importante. C’est justement parce que Taïwan est importante qu’il faut l’affronter de face.

## De qui est cette facture électrique ?

Les semi-conducteurs apportent exportations, salaires, recettes fiscales, Bourse et visibilité internationale. Ces bénéfices sont réels.

Mais la facture électrique l’est aussi.

Une partie est payée par les entreprises et se reflète dans les tarifs, l’investissement en équipements, l’achat de renouvelables et la gestion de l’énergie. Une autre partie est assumée par la société dans son ensemble et se reflète dans la construction du réseau, la politique tarifaire, l’importation de combustibles, la pollution de l’air et les émissions, l’implantation des centrales, les lignes de transport et l’acceptation locale des installations énergétiques.

Il n’y a pas de réponse simple. Si les tarifs sont trop bas, on peut reporter le coût industriel sur la population ou sur les finances de Taipower ; s’ils montent trop vite, cela peut affecter la compétitivité industrielle et le budget des ménages. Si les renouvelables s’étendent trop lentement, la pression carbone sur les entreprises augmente ; si elles s’étendent trop vite, on peut se heurter au foncier, à la pêche, au paysage et à la politique locale.

« La facture électrique de la montagne sacrée » est donc un problème public : avec quel mélange énergétique Taïwan veut-elle soutenir sa position dans la chaîne d’approvisionnement mondiale ?

Ce que voit le gouvernement, c’est la sécurité énergétique et la compétitivité industrielle. Ce que voient les entreprises, ce sont les coûts, les délais, les exigences des clients et les options d’usines à l’étranger. Ce que voit la population, ce sont les tarifs, la pollution, les coupures, les aménagements locaux et la qualité de vie. Et ce que voient les clients étrangers, c’est ceci : Taïwan pourra-t-elle continuer à livrer de façon stable durant la prochaine décennie, tout en respectant les exigences d’une chaîne bas carbone ?

Un même kilowattheure est une chose différente selon celui qui le regarde. Pour l’usine, c’est de la capacité ; pour le foyer, une facture ; pour le gouvernement, une politique énergétique ; pour le client étranger, un risque de chaîne d’approvisionnement.

## Les entreprises achètent du vert, la société doit encore bâtir le système

Les grandes entreprises de semi-conducteurs peuvent signer des contrats d’achat d’électricité, acheter des certificats d’énergie renouvelable, investir dans des équipements sobres et exiger de leurs fournisseurs qu’ils réduisent aussi leurs émissions. Toutes ces démarches sont nécessaires, car les clients internationaux remontent la chaîne pour traquer les émissions.

Mais que les entreprises achètent du vert n’équivaut pas à résoudre automatiquement le problème social.

Premièrement, l’énergie verte doit pouvoir être réellement produite. L’éolien en mer, le photovoltaïque, la géothermie, la biomasse ou d’autres sources bas carbone exigent du foncier, des espaces maritimes, un raccordement, du stockage, de la maintenance et une coordination locale. Les entreprises peuvent signer des contrats d’achat, mais les installations de production et le réseau doivent toujours être portés par la société entière.

![Grands panneaux solaires installés sur le toit de l’aire de service de Xihu, sur l’autoroute nationale, avec les voies et les bâtiments de l’aire en contrebas, montrant comment le photovoltaïque entre dans l’infrastructure du quotidien.](/article-images/nature/xihu-service-area-solar-2014.webp)

_Panneaux solaires sur le toit de l’aire de service de Xihu. Avant que les entreprises n’achètent du vert, la société doit d’abord avoir bâti les systèmes de production, de foncier, de raccordement et de maintenance. Photo : lienyuan lee. CC BY 3.0 via Wikimedia Commons._

Deuxièmement, l’énergie verte pose un problème de temps. Le jour, le solaire est abondant, mais l’usine de plaquettes tourne aussi la nuit ; quand il y a du vent, l’éolien est abondant, mais quand il n’y en a pas il faut compenser par d’autres sources ou par du stockage. Ce dont les semi-conducteurs ont besoin, c’est d’une électricité stable à chaque instant, et pas seulement d’avoir acheté assez d’énergie verte sur le total annuel.

Troisièmement, l’énergie verte pose aussi un problème de répartition. Si les entreprises les plus riches et les mieux placées pour négocier accèdent en priorité à l’électricité bas carbone, que deviennent les autres industries, les PME et les foyers ? Si les exportations technologiques peuvent répercuter le coût sur les clients mondiaux tandis que les habitants assument le réseau, les postes électriques, les parcs éoliens, les centrales solaires et les ajustements tarifaires, la confiance sociale devient fragile.

Le problème de l’énergie verte dans les semi-conducteurs taïwanais ne peut donc pas être résolu par le seul département développement durable d’une entreprise. Il exige que la politique énergétique, le marché de l’électricité, la gouvernance locale et la transformation industrielle suivent ensemble. La capacité d’achat des entreprises peut pousser le marché, mais derrière le marché il faut toujours une infrastructure publique.

## La polémique nucléaire est elle aussi ramenée par l’IA

Le débat électrique taïwanais peut difficilement éviter le nucléaire.

En 2025, après l’arrêt du dernier réacteur nucléaire en service à Taïwan, la question de la prolongation est revenue dans le débat public par référendum. AP rapporte que, lors du référendum de 2025 sur la prolongation de la troisième centrale, les voix favorables l’ont nettement emporté sur les voix défavorables, sans atteindre toutefois le seuil requis ; les partisans du nucléaire soutiennent qu’il aide à faire baisser les tarifs et à absorber la croissance de la consommation liée aux applications d’IA.[^4]

La polémique nucléaire n’a pas besoin d’être réduite ici à une prise de position. Ce qui mérite vraiment l’attention, c’est ceci : l’IA et les semi-conducteurs ont de nouveau fait de l’énergie une question de capacité nationale.

Les partisans du nucléaire diront que Taïwan a besoin d’une électricité stable et bas carbone et ne peut pas dépendre seulement du gaz importé et de renouvelables en croissance. Ses opposants diront que les déchets nucléaires, le risque sismique, le coût du démantèlement et la sécurité locale ne peuvent pas être écrasés par la fièvre de l’IA. Derrière la dispute, les deux camps répondent en réalité à la même question : avec quel type de risque Taïwan veut-elle payer sa position dans la chaîne d’approvisionnement mondiale ?

Cette question ne peut pas être confiée aux seuls TSMC ou Taipower. C’est un choix de toute la société.

## Les atouts d’une chaîne d’approvisionnement exigent des infrastructures

La valeur de Taïwan dans la chaîne des semi-conducteurs ne vient pas seulement de TSMC, mais de toute une société d’ingénierie : parcs scientifiques, fournisseurs, ingénieurs, encapsulation et tests, produits chimiques, logistique, eau et électricité, et coordination gouvernementale.

L’électricité est l’infrastructure la plus fondamentale de cette société d’ingénierie.

Quand le monde dit « Taïwan est irremplaçable », il dépend aussi du réseau électrique taïwanais. Quand des gouvernements étrangers poussent TSMC à construire aux États-Unis, au Japon ou en Allemagne, ils tentent aussi de déplacer une partie de la facture électrique sur leur propre territoire. Cela montre plutôt que la valeur de Taïwan est si élevée qu’aucun pays ne veut miser tout le risque sur une même île.

Ce que Taïwan doit vraiment affronter ensuite, c’est un problème institutionnel plus difficile : si les semi-conducteurs sont l’atout international de Taïwan, avec quel système énergétique Taïwan est-elle prête à le maintenir ?

Une bonne réponse ne se limitera pas à « construire plus de centrales » ou « acheter plus de vert ». Elle inclut aussi la résilience du réseau, le stockage, l’effacement de la demande, les tarifs industriels, la sécurité des importations énergétiques, la concertation locale, le raccordement des renouvelables, et la manière dont les industries très consommatrices expliquent à la société leurs coûts et leurs apports.

Les semi-conducteurs ont rendu Taïwan nécessaire au monde. L’électricité lui rappelle qu’être nécessaire n’est pas gratuit.

## Pour aller plus loin

- [Chaîne d’approvisionnement du matériel d’IA](/technology/AI硬體供應鏈) — comment Taïwan transforme la demande du nuage en machines prêtes à être expédiées.
- [L’eau des semi-conducteurs et les ressources hydriques de Taïwan](/technology/半導體用水與台灣水資源) — comment la fabrication des plaquettes entre dans les barrages, les sécheresses et la gestion de l’eau régénérée.
- [Usines de la chaîne d’IA à l’étranger](/technology/AI供應鏈海外設廠) — comment la construction d’usines à l’étranger lie chaîne d’approvisionnement, électricité et infrastructures locales.
- [Entreprises taïwanaises : TSMC](/economy/台灣企業：台積電) — comment le modèle de fonderie pure est devenu le goulot d’étranglement mondial des puces de pointe.

## Sources des images

- **Vue extérieure de la troisième centrale nucléaire (Maanshan, Hengchun, Pingtung ; hero / intérieur)** : [Maanshan Nuclear Power Plant, Nan Wan](https://commons.wikimedia.org/wiki/File:Maanshan_Nuclear_Power_Plant,_Nan_Wan.jpg) — Photo : M. Weitzel, Wikimedia Commons, CC BY-SA 3.0. Ce texte utilise la version mise en cache dans `public/article-images/nature/maanshan-nuclear-plant-nan-wan-2014.webp`.
- **Parc éolien en mer au large de Miaoli** : [Hai Long offshore wind farm](https://commons.wikimedia.org/wiki/File:Hai_Long_offshore_wind_farm.jpg) — Wikimedia Commons, CC BY-SA 4.0. Ce texte utilise la version mise en cache dans `public/article-images/nature/hai-neng-offshore-wind-farm-2024.webp`.
- **Panneaux solaires sur le toit de l’aire de service de Xihu** : [Xihu Service Area solar panels](https://commons.wikimedia.org/wiki/File:Xihu_Service_Area_solar_panels.jpg) — Photo : lienyuan lee, Wikimedia Commons, CC BY 3.0. Ce texte utilise la version mise en cache dans `public/article-images/nature/xihu-service-area-solar-2014.webp`.

## Références

[^1]: [Tom's Hardware: TSMC reduces peak power consumption of EUV tools by 44%](https://www.tomshardware.com/tech-industry/semiconductors/tsmc-reduces-peak-power-consumption-of-euv-tools-by-44-percent-company-to-save-190-million-kilowatt-hours-of-electricity-by-2030) — Rend compte du plan d’économies d’énergie de TSMC sur l’EUV, de l’ordre de grandeur de sa consommation totale et de la proportion d’économies des outils ; utile pour expliquer la coexistence des gains d’efficacité et de la pression sur le total.
[^2]: [Tom's Hardware: TSMC-led semiconductor association warns of power supply pressure](https://www.tomshardware.com/tech-industry/tmsc-led-semiconductor-association-begs-taiwan-government-for-clean-green-energy-as-demand-skyrockets-fabs-are-struggling-to-keep-up-with-power-needs) — Rend compte de l’alerte de l’Association taïwanaise de l’industrie des semi-conducteurs sur la stabilité électrique et l’approvisionnement en renouvelables, et récapitule RE100, la demande d’énergie verte des usines de plaquettes et le risque de transfert à l’étranger.
[^3]: [Roussilhe et al.: From Silicon Shield to Carbon Lock-in?](https://arxiv.org/abs/2209.12523) — Étudie l’empreinte environnementale de 16 fabricants taïwanais de composants électroniques entre 2015 et 2020 et pose que l’énergie, l’eau et les émissions augmentent avec la croissance de la production, ainsi que le risque de carbon lock-in.
[^4]: [AP: Taiwan lawmakers survive recall vote; nuclear power referendum fails](https://apnews.com/article/taiwan-recall-vote-nuclear-referendum-2efa596845858a7e4bd89e0c23af39b8) — Reportage d’AP sur le résultat du référendum de 2025 concernant la prolongation de la troisième centrale nucléaire de Taïwan, qui explique aussi comment les partisans du nucléaire intègrent les tarifs et la demande électrique de l’IA à leur argumentaire.
