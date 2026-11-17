---
title: "NVIDIA à Taïwan : l'entreprise la plus chère du monde ne fabrique elle-même aucune puce"
description: "En mai 2025, à Computex, Jensen Huang apparaît en blouson de cuir ; derrière lui, les logos de 55 entreprises taïwanaises s'allument d'un seul coup : une société américaine désigne publiquement toute l'industrie de l'île comme son propre corps. De la lettre adressée à Morris Chang en 1996 à une capitalisation boursière franchissant les cinq billions de dollars, jusqu'aux 4,434 milliards de dollars taïwanais déboursés par la municipalité de Taipei pour lui dégager un terrain, NVIDIA a déposé tout son corps à Taïwan. Taïwan tient ainsi l'interrupteur que le monde entier ne peut pas éteindre ; mais ses marges ne sont que de 5 %, son eau et son électricité sont aspirées, et le risque de guerre est placé sur l'île : être indispensable ne signifie pas que Taïwan décide."
date: 2026-06-22
category: 'Technology'
tags:
  [
    'NVIDIA',
    'NVIDIA',
    'Jensen Huang',
    'IA',
    'semi-conducteurs',
    'TSMC',
    'chaîne d’approvisionnement',
    'bouclier de silicium',
    'intelligence artificielle',
    'Computex',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-22
lastHumanReview: false
researchReport: 'reports/research/2026-06/NVIDIA在台灣.md'
relatedDiary: ['2026-06-22-143854-nvidia-taiwan']
image: '/article-images/technology/computex-jensen-huang-2016.webp'
translatedFrom: 'Technology/NVIDIA在台灣.md'
sourceCommitSha: '1ec0df23'
sourceContentHash: 'sha256:533b8db87f48f6de'
sourceBodyHash: 'sha256:8a6bcaa4a83cff70'
translatedAt: '2026-09-17T06:54:11.129244+00:00'
---

# NVIDIA à Taïwan : l'entreprise la plus chère du monde ne fabrique elle-même aucune puce

> **Aperçu en 30 secondes :** NVIDIA est l’entreprise la plus valorisée de la planète : le 29 octobre 2025, sa capitalisation boursière a franchi les cinq billions de dollars[^1]. Pourtant, elle ne possède pas une seule fonderie : chacune de ses puces d’IA est fabriquée par TSMC, chaque serveur d’IA est assemblé par Hon Hai, Quanta ou Wistron, et Taïwan assure 90 % de la sous-traitance mondiale des serveurs d’IA[^2]. Cette dépendance est si profonde que NVIDIA est déjà le premier client de TSMC, à hauteur de 19 % de son chiffre d’affaires[^3] ; elle est si profonde que l’architecture même de ses puces est désormais déterminée en retour par les rendements du packaging taïwanais[^4]. Le problème est que tenir la ligne vitale de quelqu’un et en tirer les bénéfices sont deux choses différentes : NVIDIA affiche 75 % de marge brute, tandis que les ODM taïwanais ne touchent que 5 % à 8 %[^5]. Cet article explique comment cette relation inégale en est arrivée là.

![Jensen Huang sur la scène de Computex Taipei, en train de prononcer un discours, vêtu de son haut sombre emblématique, devant un grand écran de projection et une salle remplie de spectateurs](/article-images/technology/computex-jensen-huang-2016.webp)
_Jensen Huang en 2016 lors d’un discours à Computex Taipei. Depuis 2023, il revient presque chaque année à ce salon pour annoncer les dernières puces d’IA de NVIDIA, devant toute la chaîne d’approvisionnement taïwanaise qui les fabrique pour lui. Photo : NVIDIA Taiwan, 2016._

Le 19 mai 2025, au Taipei Nangang Exhibition Center. Jensen Huang, vêtu de son blouson de cuir emblématique, monte sur la scène principale de Computex. Derrière lui, l’immense écran affiche un mur de logos : AAEON, Accton, Delta Electronics, Gigabyte, Quanta, Wistron, Wiwynn, Hon Hai, MediaTek, TSMC, UMC... Les noms s’enchaînent, jusqu’à figer l’image sur les logos de 55 entreprises taïwanaises[^6]. Avec la vidéo de remerciements projetée sur place, le total des entreprises taïwanaises citées atteint 122[^6].

C’est la première fois que les Taïwanais « voient » toute leur industrie ainsi nommée, d’un seul geste, par une entreprise américaine.

La fierté est réelle. Mais ce mur pose une question restée implicite : chaque logo affiché travaille pour cette entreprise américaine, tandis que le véritable pouvoir se trouve entre les mains de celui qui fait apparaître le mur, non sur le mur lui-même.

<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/TLzna9__DnI"
    title="Discours complet du CEO de NVIDIA Jensen Huang à COMPUTEX 2025 (vidéo officielle)"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>

_Version complète du discours principal de Jensen Huang à COMPUTEX, le 19 mai 2025, sur la chaîne officielle de NVIDIA. C’est pendant ce discours qu’a été dévoilé le mur des logos des 55 entreprises taïwanaises et que NVIDIA a annoncé vouloir installer son siège international à Taipei._

## Une entreprise qui ne fabrique rien est devenue la plus chère du monde

NVIDIA est l’aboutissement extrême du modèle des semi-conducteurs « sans usine » (_fabless_). Elle conçoit des puces, mais ne construit pas d’usines, n’achète pas de machines de photolithographie et ne produit pas la moindre tranche de silicium. Un empire de cinq billions de dollars ne possède à son nom aucune fonderie.

Il a externalisé toute la fabrication sur une île de l’autre côté du Pacifique.

![Vue microscopique agrandie du die de la puce GPU NVIDIA Ampere GA102, montrant une structure de circuits extrêmement dense](/article-images/technology/nvidia-ampere-ga102-die.webp)
_Micrographie du die de la puce NVIDIA Ampere GA102, produite par le procédé 8 nm de TSMC. NVIDIA l’a conçue, mais chacune des innombrables lignes qui la composent a été gravée dans des usines taïwanaises. Photo : Fritzchens Fritz, CC0._

Ses puces les plus rentables, les H200, Blackwell et bientôt Rubin, dépendent toutes des procédés 3 nm et 4 nm de TSMC[^7]. Dans son rapport annuel à la Securities and Exchange Commission des États-Unis, NVIDIA reconnaît noir sur blanc cette concentration : la chaîne d’approvisionnement de l’entreprise est principalement concentrée dans la région Asie-Pacifique, et elle utilise des fonderies comme TSMC pour produire ses tranches de semi-conducteurs[^8]. Cette phrase figure dans un document juridique remis par l’entreprise à la SEC. Autrement dit, c’est NVIDIA elle-même qui désigne Taïwan comme sa plus grande source de risque géopolitique.

Une fois la puce fabriquée, le travail n’est pas terminé. Pour qu’un GPU devienne une machine de calcul, il faut d’abord un packaging avancé, puis l’intégrer dans un serveur. Le packaging CoWoS de TSMC est aujourd’hui le goulet d’étranglement mondial, et NVIDIA consomme à elle seule environ 60 % de cette capacité CoWoS, voire 70 % selon des estimations de médias taïwanais[^9]. Les puces ainsi encapsulées passent ensuite aux assembleurs taïwanais : Ingrasys, filiale de Hon Hai, fabrique les systèmes de baies GB200 NVL72 ; E.SUN Securities Investment Consulting estime que sa part de marché dépasse 40 % dans l’assemblage des racks d’IA[^10]. Quanta fabrique des serveurs cloud et détient plus de la moitié du marché des 50 plus grands centres de données[^11]. La nouvelle usine d’IA de Wistron à Zhubei a été entièrement réservée par les commandes de NVIDIA[^12].

```tw-stat
75,0 % | Marge brute annuelle de NVIDIA FY2025 | Rapport annuel SEC
19 % | Part de NVIDIA dans le chiffre d'affaires 2025 de TSMC | NVIDIA a dépassé Apple et est devenu son premier client
~90 % | Part de Taïwan dans la sous-traitance mondiale des serveurs d'IA | 100 % si l'on inclut les fournisseurs de marques américaines
~60 % | Part de NVIDIA dans la capacité de packaging CoWoS de TSMC | Les médias taïwanais estiment jusqu'à 70 %
Sources : NVIDIA SEC 10-K, TrendForce, MIC, ministère de l'Économie
```

Taïwan représente 90 % de la sous-traitance mondiale des serveurs d’IA ; si l’on inclut les fournisseurs de marques américaines, on atteint 100 %[^2]. Cela signifie que presque chaque machine physique de calcul d’IA sur Terre est passée entre des mains taïwanaises.

En superposant ces chiffres, la contradiction centrale apparaît : **l’entreprise la plus valorisée au monde ne fabrique rien, parce que tout son corps physique est déposé à Taïwan**. Taïwan est l’interrupteur qu’elle ne peut pas éteindre.

Mais tenir la ligne vitale de quelqu’un et obtenir une part de son argent sont deux choses différentes. Le revers de ce mur de 55 logos cache un autre mur.

## Au revers du mur de logos se trouve le bas de la courbe du sourire

L’industrie manufacturière connaît une vieille « courbe du sourire » : les deux extrémités sont hautes, le milieu est bas. Les marges les plus élevées reviennent à ceux qui maîtrisent la marque, la conception et la technologie ; la partie centrale, l’« assemblage et la fabrication », est la moins rentable. Taïwan se trouve précisément dans cette partie centrale.

La marge brute annuelle de NVIDIA pour FY2025 est de 75,0 %, selon les chiffres qu’elle a elle-même déclarés à la SEC[^5]. Sur la même période, les marges brutes des fabricants taïwanais qui assemblent ses serveurs sont les suivantes : Hon Hai 6,18 %, Quanta 4,78 % (plus bas niveau depuis près de 15 trimestres), Wistron 5,21 %, Wiwynn 7,2 %[^13]. La marge brute de NVIDIA est à peu près douze fois celle de Hon Hai et seize fois celle de Quanta.

```tw-bars
Qui capte les profits : marges brutes de la chaîne d'approvisionnement de l'IA (%)
*NVIDIA | 75,0 | Conception, marque, écosystème CUDA
Delta Electronics | 37,0 | Alimentation, refroidissement (segment technologique)
Unimicron | 21,3 | Substrats ABF (segment technologique)
Wiwynn | 7,2 | Assemblage de serveurs
Hon Hai | 6,18 | Assemblage de systèmes en rack
Wistron | 5,21 | Assemblage de serveurs
Quanta | 4,78 | Assemblage de serveurs cloud
Sources : NVIDIA SEC 10-K, conférences investisseurs des entreprises (trimestres FY2025-FY2026)
```

Ce graphique contient une réalité contre-intuitive. Parmi les entreprises taïwanaises elles-mêmes, plus l’activité se rapproche du simple « assemblage », plus la marge est faible ; plus elle se rapproche de la « technologie », plus la marge augmente. Delta Electronics, qui fabrique des alimentations et des systèmes de refroidissement, atteint 37 % ; Unimicron, qui fabrique des substrats ABF, est estimé à 21,3 %[^14]. La différence ne tient pas au fait d’être ou non une entreprise taïwanaise, mais à l’endroit où l’on se situe sur la courbe. Dans l’assemblage, les marges restent faibles quel que soit l’acteur.

> 📝 **Note du curateur** : Morgan Stanley a calculé en mai 2026 un chiffre encore plus brutal : au niveau du système complet, la marge brute à valeur ajoutée des ODM dans l’assemblage des machines passe de 2,7 % pour les baies GB300 de génération précédente à 1,9 % pour les VR200 de génération suivante[^15]. Autrement dit, chaque nouvelle puce plus puissante de NVIDIA oblige les entreprises taïwanaises à avancer davantage de capital, tout en réduisant leur taux de marge. Plus cette chaîne d’approvisionnement avance, plus le bas de la courbe est aplati. Les logos peuvent briller sur le mur et les marges rester maigres au bas de la courbe : les deux choses peuvent être vraies en même temps.

La fierté et le coût s’affrontent dans la même chaîne. Grâce à l’explosion de l’IA en Bourse, la croissance économique de Taïwan en 2025 atteint environ 7,37 %, son rythme le plus rapide depuis quinze ans, parmi les meilleurs au monde[^16]. Mais Min-Hua Chiang, chercheuse spécialiste de l’économie taïwanaise, souligne un chiffre froid : la plupart des Taïwanais n’ont pas ressenti les bénéfices de cette prospérité économique[^16]. Les 10 % les plus riches captent 48 % des revenus du pays, tandis que les 50 % du bas de l’échelle ne reçoivent que 12 %[^16]. En moyenne, le revenu par personne des 10 % les plus aisés est vingt fois supérieur à celui des 50 % les moins favorisés.

Une tribune publiée par The Reporter en juin 2026 décrit plus concrètement cette divergence en K : les emplois directs situés sur la grande chaîne de croissance de l’IA, des semi-conducteurs et de l’électronique représentent « moins d’un dixième de l’emploi total »[^17]. Une personne travaillant dans la restauration touche un salaire mensuel total de 38 484 dollars taïwanais, soit seulement 34,6 % de celui de l’industrie des composants électroniques[^17]. Les dividendes de l’IA sont réels, mais ils se concentrent entre les mains du capital et d’une minorité d’ingénieurs, tandis que la majorité observe la vague depuis l’extérieur.

C’est le premier sens de « être indispensable ne signifie pas décider » : Taïwan tient l’interrupteur, mais ne reçoit que ces 5 %.

## Taïwan l’a autrefois soutenue, et a failli la faire tomber

Pour comprendre comment cette relation inégale a commencé, il faut revenir à la fin des années 1990, quand NVIDIA courait encore contre la mort.

NVIDIA est fondée en 1993 et frôle à plusieurs reprises la faillite au cours de ses premières années. En août 1997, lors du lancement de la puce graphique RIVA 128, l’entreprise n’a plus en caisse que « l’équivalent d’un mois de salaires »[^18]. À cette époque, Jensen Huang ouvre chaque réunion mensuelle par la même maxime anglaise : notre entreprise n’est qu’à trente jours de la faillite[^18]. Cette phrase est devenue plus tard une croyance interne de NVIDIA, mais elle n’a jamais été une phrase chinoise.

Ce qui a réellement sorti NVIDIA de cette crise, ce sont les 5 millions de dollars de SEGA, non Taïwan[^19]. Il faut le préciser d’emblée, car l’idée selon laquelle « Taïwan a sauvé NVIDIA » est souvent racontée de manière trop romantique.

Le rôle de Taïwan est autre : il touche à la ligne vitale de la fabrication. Vers 1996, Jensen Huang, alors âgé de 32 ans, écrit à Morris Chang, fondateur de TSMC, pour demander si TSMC pourrait fabriquer des puces pour NVIDIA[^20]. En 2025, Miin Wu de TSMC se souvient que cette « coopération profonde a commencé à un moment critique, en 1997 », lorsque « le fondateur de TSMC, Morris Chang, a personnellement contacté le fondateur de NVIDIA, Jensen Huang, afin de répondre à la demande de services de fonderie de NVIDIA »[^21]. En 1998, les deux parties signent officiellement un contrat, et TSMC devient la principale fonderie de NVIDIA[^20]. La division du travail « conception dans la Silicon Valley, fabrication chez TSMC » relie dès lors le corps physique de NVIDIA à cette île.

> 💡 **Saviez-vous que** : selon une version souvent rapportée, lorsque Jensen Huang reçoit l’appel de Morris Chang, il aurait crié aux personnes autour de lui de se taire parce que Morris Chang l’appelait[^22]. Cette scène est rapportée de seconde main et le ton exact est incertain, mais elle saisit une réalité : à l’époque, cette petite entreprise proche de la faillite a perçu l’appel de TSMC comme une corde de sauvetage.

Cette corde a pourtant failli devenir un nœud coulant. En 1998, une erreur dans un procédé chimique de TSMC provoque la mise au rebut d’un grand nombre de puces NVIDIA, manquant de faire à nouveau s’effondrer l’entreprise[^23]. Il est donc plus honnête de dire ceci : Taïwan n’a pas été le « sauveur financier » de NVIDIA ; Taïwan a été sa « ligne vitale manufacturière ». Cette ligne vitale lie les deux parties dans les deux sens : Taïwan l’a soutenue, mais a aussi failli la faire tomber. La symbiose n’a jamais été une faveur à sens unique.

La suite est plus connue. En 2006, NVIDIA lance CUDA, une décision que presque tout le monde juge alors folle. En 2012, l’étudiant Alex Krizhevsky utilise deux cartes NVIDIA GTX 580 pour entraîner AlexNet dans la chambre de ses parents, faisant passer le taux d’erreur de reconnaissance d’images ImageNet de 26 % à 15,3 %[^24]. Ce moment prouve que le GPU est le moteur de l’apprentissage profond. En 2022, ChatGPT déclenche dans le monde entier une soif de puissance de calcul, et la capitalisation de NVIDIA décolle comme une fusée.

```tw-timeline
1993 | NVIDIA est fondée dans la Silicon Valley | Jensen Huang et deux autres fondateurs développent des puces graphiques
1996 | Jensen Huang écrit à Morris Chang | Il demande à TSMC de produire ses puces ; le contrat est signé en 1998, le corps physique se branche sur Taïwan
2006 | Lancement de CUDA | Le GPU devient une plateforme de calcul généraliste, une décision alors jugée folle
2012 | AlexNet est entraîné avec deux GTX 580 | Preuve que GPU = moteur de l'apprentissage profond
2022 | Lancement de ChatGPT | Explosion mondiale de la demande en puissance de calcul, envolée de NVIDIA
2025 | Capitalisation supérieure à cinq billions de dollars | Première entreprise de l'histoire, annonce la même année d'un siège international à Taïwan
Sources : The Nvidia Way, podcast Acquired, Wikipédia, CNBC
```

D’une petite entreprise à trente jours de la faillite à la première société de l’histoire valorisée cinq billions de dollars, chaque puce de ce parcours a été fabriquée à Taïwan.

![Jensen Huang tenant un GPU RTX Blackwell lors du discours principal du CES 2025](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)
_Jensen Huang brandissant en 2025 au CES un GPU Blackwell de nouvelle génération. De l’entrepreneur qui répétait chaque mois « nous ne sommes qu’à trente jours de la faillite » à cette puce que le monde entier s’arrache, une chose n’a pas changé : elle doit toujours être fabriquée à Taïwan. Photo : Pronoia, CC0._

## L’irremplaçabilité a-t-elle une date limite ?

Cela conduit à une question qu’il faut affronter honnêtement : cette « irremplaçabilité » de Taïwan est-elle permanente, ou a-t-elle une limite temporelle ?

À court terme, la limite est presque sans fissure. Entre 2025 et 2027, les GPU d’IA les plus avancés de NVIDIA, de la fabrication au packaging final, sont bloqués à 100 % dans les lignes CoWoS-L de TSMC situées à Taïwan[^25]. TSMC détient environ 90 % à 92 % des procédés avancés mondiaux en dessous de 5 nm, et sa capacité de packaging avancé dépasse celle de tous ses concurrents réunis[^26]. Les travaux de Yuntsai Chou, professeur à la National Taiwan University of Science and Technology, sont explicites : à court terme, diversifier la production de TSMC n’est pas faisable ; construire une nouvelle fonderie de pointe prend trois à quatre ans et coûte plus de 10 milliards de dollars[^27].

La preuve d’ingénierie la plus forte ne se trouve pas dans un rapport, mais dans la conception même des produits NVIDIA. La prochaine génération Rubin Ultra devait initialement utiliser un packaging à « quatre dies », mais TrendForce indiquait en avril 2026 que cette configuration ferait gonfler la surface encapsulée jusqu’à 7,5 à 8 fois la limite du réticule, « dégradant gravement le rendement et les coûts » ; le design « s’oriente désormais vers une architecture à deux dies »[^4]. Cette phrase mérite d’être lue lentement : c’est la contrainte physique du rendement du packaging taïwanais qui détermine en retour la forme que doit prendre la puce NVIDIA. Même la plus puissante entreprise de conception de puces au monde doit modifier son design en fonction des rendements taïwanais. C’est un point de blocage d’ordre physique, trop dur pour être négocié.

Mais une « limite dure à court terme » ne veut pas dire « pour toujours ». Taïwan a déjà connu des précédents douloureux.

En 2002, Taïwan lance la politique industrielle des « deux billions, deux étoiles ». Les écrans plats et la DRAM, ou mémoire vive, sont alors considérés comme des lignes vitales nationales irremplaçables. Résultat ? Faute de technologies centrales, avec un investissement en R&D de seulement 6 %, bien inférieur aux 10 % à 21 % de la Corée du Sud, du Japon, des États-Unis et de l’Europe, ces deux industries sont progressivement vidées par la Corée du Sud et la Chine. Le retour rétrospectif de United Daily News est cinglant : « Les fabricants d’écrans et de mémoires semi-conductrices, glorieux pendant un temps, ont quelques années plus tard subi de lourdes pertes à cause de la surproduction internationale. Les internautes les ont surnommés les “prêtres taoïstes de Maoshan” (marge brute de trois à quatre), parce que les marges brutes de leurs produits n’étaient plus que de 3 % à 4 % ; les “industries des deux billions, deux étoiles” sont devenues les “industries des deux billions de chagrin”. »[^28]

> ⚠️ **En quoi cette fois diffère-t-elle des écrans et de la DRAM ?** À l’époque, les écrans et la DRAM ont été vidés parce que Taïwan ne maîtrisait pas les technologies centrales, et que tout le monde pouvait rattraper son retard. Le fossé de protection de l’IA paraît cette fois beaucoup plus profond : TSMC maîtrise bien la propriété intellectuelle des procédés, et les rendements du packaging CoWoS ainsi que l’adhérence de tout l’écosystème ne peuvent pas être reproduits simplement en y injectant de l’argent pendant trois à cinq ans. Mais ce n’est pas une raison pour que Taïwan se croie à l’abri. SMIC affirme déjà produire du 5 nm en volume ; ses rendements ne représentent qu’un tiers de ceux de TSMC et ses coûts sont encore 50 % plus élevés, soit un retard d’environ cinq ans[^29]. Mais cinq ans, dans la technologie, ce n’est pas l’éternité. Confondre « être profondément indispensable » avec « être durablement en sécurité » est précisément l’erreur commise par les acteurs de 2002.

Après 2028, des fissures commencent à apparaître. En décembre 2025, NVIDIA investit environ 5 milliards de dollars dans Intel. Son véritable objectif est de « garantir un accès prioritaire à la capacité de packaging avancé d’Intel aux États-Unis », en vue de l’architecture Feynman attendue en 2028[^30]. L’usine de packaging AP1 de TSMC en Arizona devrait entrer en production de masse en 2028[^31]. Powertech, entreprise taïwanaise, a développé le packaging PiFO, positionné comme une alternative au CoWoS-L, avec un coût de production inférieur d’environ 30 %, et « plusieurs concepteurs américains de puces d’IA » se sont déjà tournés vers elle[^32]. Ces desserrements sont réels, mais aucun n’est encore entré dans la chaîne principale des GPU les plus avancés de NVIDIA.

Un chiffre résume le mieux la subtilité de la situation actuelle : TrendForce estime que le déficit d’offre et de demande de CoWoS passera d’environ 20 % aujourd’hui à environ 10 % à la fin de 2026[^33]. Mais cette réduction se fait par l’expansion de TSMC elle-même, non par l’arrivée de fournisseurs de substitution[^33]. Autrement dit, jusqu’à aujourd’hui, seul Taïwan peut encore résoudre ce goulet d’étranglement.

L’irremplaçabilité est un fait d’ingénierie, mais elle porte une limite dure située autour de 2028. Les cartes de Taïwan ont une date de fraîcheur.

## 4,434 milliards : une ville dégage un terrain pour une entreprise de plusieurs billions

Si la marge brute est une balance abstraite du pouvoir, l’affaire survenue au second semestre 2025 dans le parc technologique Beitou-Shilin à Taipei en est une coupe particulièrement tranchante.

L’histoire commence en 2021. La municipalité de Taipei met alors aux enchères les droits de superficie de deux terrains du parc, T17 et T18, soit 3,89 hectares au total, pour une durée de 50 ans. Shin Kong Life remporte l’appel d’offres en tant qu’unique soumissionnaire, pour 4,4 milliards de dollars taïwanais[^34]. Pendant les trois années suivantes, le terrain reste vacant, envahi par les mauvaises herbes.

En mai 2025, à Computex, Jensen Huang annonce que NVIDIA souhaite installer son siège international « Constellation » dans le parc Beitou-Shilin[^35]. Problème : les droits de superficie du terrain appartiennent toujours à Shin Kong Life, et les droits de superficie publics ne peuvent pas être directement transférés. NVIDIA, Shin Kong Life et la municipalité de Taipei restent bloqués cinq mois sur cette parcelle[^36].

La solution finale consiste pour la municipalité de Taipei à payer Shin Kong Life pour qu’elle sorte du dossier. Le 12 novembre 2025, le conseil municipal de Taipei approuve sans objection une indemnité de résiliation de 4,434 milliards de dollars taïwanais, versée par la municipalité à Shin Kong Life pour récupérer le terrain[^37]. Le montant exact se lit ainsi : 4 434 064 085 dollars taïwanais[^37].

```tw-figure
NT$4 434 064 085
Indemnité de résiliation versée par la municipalité de Taipei à Shin Kong Life pour récupérer le terrain du parc Beitou-Shilin et le remettre à NVIDIA (adoptée par le conseil municipal le 12/11/2025)
Conseil municipal de Taipei, Central News Agency, Next Apple News
```

La facture de résiliation transmise par Shin Kong Life provoque une explosion au conseil municipal. La conseillère du Kuomintang Yu Shu-hui écrit après l’avoir reçue : « En voyant, dans la facture de huit pages de Shin Kong Life, que même le désherbage, l’entretien de l’environnement, l’ajustement du logo et les frais de notaire devaient être remboursés par la municipalité de Taipei, je n’ai pu qu’esquisser un sourire amer. L’entretien de l’environnement n’est-il pas ce que le locataire était censé faire ? Même les frais d’ajustement du logo liés à la fusion de Taishin et Shin Kong Life doivent être payés par la municipalité ? C’est à s’évanouir... trois soupirs d’impuissance. »[^38] Elle vote pourtant finalement pour, ajoutant une phrase qui résume l’atmosphère générale : « La facture de Shin Kong Life est incompréhensible, mais l’intérêt général prime »[^38].

Ce jour-là, le conseil municipal donne à voir une scène rare : les trois camps, bleu, vert et blanc, s’accordent exceptionnellement, et le groupe du Parti démocrate progressiste scande même « Soutenir NVIDIA, signer au plus vite »[^39]. Un terrain et une entreprise étrangère suffisent à faire parler d’une même voix des partis qui s’affrontent d’ordinaire.

> 📝 **Note du curateur** : Il vaut la peine de s’arrêter sur cette structure de pouvoir. Pour qu’une entreprise de plusieurs billions de dollars s’installe, le gouvernement et le conseil municipal d’une ville mobilisent des fonds publics, dépassent les clivages partisans et lèvent tous les obstacles pour nettoyer un terrain occupé par l’ancien locataire. NVIDIA n’a pas payé ces 4,434 milliards ; les contribuables de Taipei avancent d’abord cette somme, dont seuls 1,441 milliard correspondant aux coûts propres et taxes déjà acquittées par Shin Kong Life seront globalement repris par NVIDIA[^40]. Ici, « être indispensable ne signifie pas décider » prend une forme très concrète : lorsque vous avez trop besoin que quelqu’un reste, vous payez pour lui une facture qui n’aurait pas dû vous revenir.

## Le siège est-il une enseigne ou des racines ?

Qu’a donc donné NVIDIA à Taïwan ? Il faut distinguer deux choses pour éviter une mauvaise évaluation.

La première est l’« enseigne » : le siège Constellation reprend la forme de « vaisseau spatial » du siège américain, pourra accueillir environ 4 000 personnes, doit commencer sa construction en 2026 et n’entrer en service qu’en 2030. À ce jour, les travaux n’ont pas commencé[^41]. Vu sous cet angle, il n’est pas illégitime de se demander si ce siège ne relève pas surtout de la communication.

La seconde concerne des « racines » déjà anciennes. NVIDIA n’est pas arrivée à Taïwan en 2025. Elle dispose depuis longtemps de bureaux à Neihu, Taipei, avec environ 1 800 employés existants, selon des estimations de médias et non des chiffres officiels[^42]. En 2021, elle a obtenu l’approbation du ministère de l’Économie pour son « projet de centre de R&D et d’innovation en IA », avec un investissement total de 24,3 milliards de dollars taïwanais, dont 6,7 milliards de subventions publiques, et le recrutement de 1 000 personnes en R&D entre 2022 et 2027[^43]. En novembre 2025, elle crée « Taiwan Nvidia Classics Co., Ltd. », dont le capital passe de 1 milliard à 3,3 milliards de dollars taïwanais : une personne morale indépendante, capable de payer ses propres impôts et de détenir des actifs[^44].

La réalité de l’« implantation du siège » se situe donc au milieu : les racines substantielles en R&D sont réelles, et la filiale imposable existe ; mais le siège Constellation qui attire le plus l’attention en est encore au plan. Il ne faut raconter qu’une moitié ni de l’une ni de l’autre.

## Une île aspirée par cette chaîne d’approvisionnement

Au-delà de l’auréole et de la facture, il existe un autre coût, payé par chaque personne qui vit sur cette île : l’eau, l’électricité, l’air, et des logements devenus inaccessibles.

![Façade de l’usine TSMC à Taichung, bâtiment gris portant le logo TSMC](/article-images/technology/tsmc-taichung-factory.webp)
_Usine TSMC de Taichung. Le corps physique de chaque génération de GPU NVIDIA prend forme dans des usines comme celle-ci, et l’eau et l’électricité qu’elles aspirent constituent une autre facture que l’île est en train de payer. Photo : Briáxis F. Mendes（孟必思）, CC BY-SA 4.0._

Commençons par l’électricité. En 2023, TSMC a consommé 24,775 milliards de kWh, soit 8,96 % de l’électricité totale de Taïwan[^45]. Standard & Poor’s prévoit qu’en 2030, la consommation électrique de TSMC pourrait atteindre 23,7 % du total national[^45]. Autrement dit, à ce moment-là, près d’un kilowattheure sur quatre consommé à Taïwan pourrait l’être par une seule entreprise.

```tw-line
Part de TSMC dans la consommation électrique totale de Taïwan : une entreprise aspire près d'un quart de l'électricité d'une île (%)
Année | Part
2023 | 8,96
2030 | 23,7
Sources : Standard & Poor's, rapport RSE de TSMC
```

Les émissions de carbone suivent. Le rapport de Greenpeace d’avril 2025, « L’ombre derrière la prospérité des puces », calcule que la consommation électrique mondiale liée à la fabrication de puces d’IA passe de 218 GWh à 984 GWh, soit une hausse annuelle de plus de 3,5 fois. Pour Taïwan seulement, elle bondit à 375,8 GWh, « soit 38 % du total mondial »[^46]. En raison de la forte dépendance de TSMC aux énergies fossiles, les émissions de la fabrication de puces d’IA atteignent 185 700 tonnes d’équivalent CO2 ; Greenpeace la désigne directement comme « championne des émissions de carbone » dans la fabrication des puces d’IA[^46].

Et NVIDIA ? Greenpeace lui attribue la note F. Le rapport écrit que les émissions de sa chaîne d’approvisionnement ont « presque doublé ces trois dernières années, passant de 3,51 millions de tonnes en 2022 à 6,91 millions de tonnes en 2024 », tandis que l’entreprise « ne fait que transférer les émissions de carbone et la pollution de sa chaîne d’approvisionnement vers d’autres régions du monde »[^46]. Autrement dit, la valorisation et l’aura figurent au nom de NVIDIA ; les émissions et la pollution restent dans le ciel taïwanais.

L’eau aussi. TSMC consomme plus de 200 000 tonnes d’eau par jour ; les 81 000 tonnes fournies quotidiennement par les quatre usines de recyclage de l’eau de Tainan « vont presque entièrement à TSMC »[^47]. Le coût retombe sur les terres agricoles : en 2021 et 2023, les rizières de Chianan ont connu deux interruptions d’irrigation afin de réserver l’eau à l’industrie des semi-conducteurs[^48]. La fabrication d’une tranche de 12 pouces nécessite 8 327 litres d’eau[^49] ; sur cette île, des agriculteurs ont déjà laissé leurs champs au repos pour que les puces aient de l’eau.

Puis viennent les logements. Après l’annonce par NVIDIA de son projet de siège à Beitou-Shilin, les prix du secteur commencent à bouger. Le département du développement industriel de Taipei estime que la population active permanente du parc pourrait atteindre 60 000 personnes, mais selon les statistiques de 591, l’offre de logements disponibles n’est que d’environ 1 476 unités, les terrains résidentiels ne représentant que 13,8 % du secteur[^50]. Soixante mille personnes pour 1 476 logements : la direction des prix est facile à imaginer. Des transactions de nouveaux projets dans le cœur du parc Beitou-Shilin ont déjà été rapportées à plus de 1,5 million de dollars taïwanais par ping[^51].

Il faut ici distinguer deux choses afin de ne pas mal attribuer l’angoisse. Dans les registres des prix réels, la transaction la plus élevée en 2025 pour un immeuble résidentiel du district de Shilin atteint 570 400 dollars taïwanais par mètre carré, soit environ 1,88 million de dollars taïwanais par ping, au 39, route Jihe, pour un prix total de 447 millions[^52]. Mais ces prix records concernent des logements de luxe à Tianmu et dans le centre de Shilin, non le parc Beitou-Shilin lui-même. Le chiffre de plus de 1,5 million par ping dans les nouveaux projets du parc relève d’une autre série de données médiatiques. Les deux chiffres ne doivent pas être confondus. Mais tous deux pointent vers le même sentiment : la croissance arrive dans ma rue, et pourtant je ne peux pas acheter.

> ⚠️ **« L’entreprise n’a pas encore commencé les travaux, pourquoi les prix montent-ils ? »** La réaction des habitants est concrète. Un professionnel du secteur explique anonymement que, faute de services de proximité, « beaucoup d’employés ne veulent pas suivre l’entreprise dans le parc... et même après s’y être installés, un tiers des employés démissionnent à cause de l’incommodité des transports »[^53]. Sur PTT, l’opinion anonyme est plus directe : on a déjà usé jusqu’à la corde le thème TSMC, maintenant on le remplace simplement par le thème NVIDIA[^54]. Un siège qui n’a pas encore commencé à être construit a déjà poussé les prix locaux vers le haut : c’est la version la plus proche de la table familiale de la divergence en K. Il faut regarder l’espoir honnêtement : l’IA rend bien Taïwan visible au monde ; l’eau et l’électricité aspirées, les logements inaccessibles, sont tout aussi réels. Les deux doivent être écrits.

## Taïwan n’est pas la seule à être indispensable

En reculant la caméra, on voit quelque chose de plus vaste : dans la relation entre NVIDIA et Taïwan, la dépendance est bilatérale, voire multilatérale. Même l’autre rive du détroit est prise dans cette structure.

![Hall du Computex au Taipei Nangang Exhibition Center, larges allées bordées de stands d’entreprises informatiques et foule de visiteurs](/article-images/technology/computex-nangang-floor-2015.webp)
_Le salon Computex au Taipei Nangang Exhibition Center. Chaque mois de juin, les acheteurs du monde entier affluent vers ce hall pour les produits fabriqués par la chaîne d’approvisionnement taïwanaise. Taïwan n’a jamais été la seule à en dépendre. Photo : NVIDIA Taiwan, CC BY 2.0._

C’est le concept du « bouclier de silicium » : Taïwan maîtrise les puces dont le monde entier a besoin, et cette irremplaçabilité devient une couche de protection. Mais le bouclier de silicium a toujours deux faces. Il est à la fois talisman et poudrière attachée à l’île. Les chercheurs parlent de « Silicon Shield » et de « Silicon Trap » : une même concentration peut dissuader une agression, mais aussi devenir une incitation à l’agression ou un point de défaillance unique[^55].

Le débat le plus aigu est relancé en 2021 par un article de l’U.S. Army War College, qui défend une stratégie extrême de « terre brûlée » ou de « nid brisé » : en cas d’invasion chinoise, détruire l’industrie des semi-conducteurs pour que l’adversaire n’en retire aucun bénéfice. Les objections sont tout aussi fortes : même si une telle stratégie dissuade la Chine à court terme, cette automutilation économique pourrait ne faire que reporter l’agression jusqu’au jour où la Chine pourra produire elle-même ses semi-conducteurs ; et les citoyens taïwanais eux-mêmes auraient peu de raisons de considérer qu’un tel sabotage sert leurs intérêts[^56]. Ce n’est pas à cet article de trancher pour Taïwan, mais cette question plane réellement derrière toute discussion sur les « cartes » dont dispose Taïwan.

Le bouclier de silicium est même dilué par TSMC elle-même. Pour disperser le risque géopolitique, TSMC investit 165 milliards de dollars aux États-Unis dans l’expansion de ses usines[^57]. En août 2025, MIT Technology Review titre : « Le bouclier de silicium de Taïwan pourrait être en train de s’affaiblir »[^58]. La crainte est que le transfert de capacités hors de l’île dilue les cartes de Taïwan sur son propre territoire et conduise les États-Unis ou d’autres pays à juger que Taïwan vaut moins la peine d’être défendue[^58]. Mais Bonnie Glaser, du German Marshall Fund, rappelle aussi que cet écosystème n’est pas facile à déplacer : l’écosystème créé par Taïwan est véritablement unique, produit d’un vivier de talents, d’une culture et de lois propres à Taïwan, et il ne peut pas être facilement répliqué ailleurs[^59]. Paul Triolo, spécialiste des technologies chinoises, le dit encore plus directement : pour la fabrication de pointe, l’Arizona n’en est absolument pas là, et n’y arrivera jamais[^60].

Le moment politique suivant dit le mieux à quel point cette dépendance est asymétrique.

Le 29 mai 2024, Jensen Huang déclare publiquement à Taïwan : « Taiwan is one of the most important countries in the world. » (« Taïwan est l’un des pays les plus importants du monde »)[^61]. Quelques jours plus tard, le 2 juin, lors d’un discours à l’Université nationale de Taïwan, il décrit Taïwan comme « le héros anonyme, mais le pilier du monde »[^62].

```tw-quote
Taïwan est le héros anonyme, mais le pilier du monde
Jensen Huang | CEO de NVIDIA, discours Computex à l'Université nationale de Taïwan, 2024
```

Dix-huit jours plus tard, Chen Binhua, porte-parole du Bureau des affaires taïwanaises de Chine, répond : « Face à ce type de propos extrêmement erronés, les habitants du continent et les internautes ont déjà exprimé une vive indignation. Taïwan n’a jamais été un pays... Nous espérons qu’il révisera bien ses leçons. »[^63]

Mais un autre élément est plus révélateur. La Central News Agency observe alors que les médias financiers chinois ont beaucoup couvert la visite de Jensen Huang à Taïwan, mais qu’ils « n’ont pas mentionné la déclaration selon laquelle “Taïwan est un pays important”, semblant omettre une question sensible habituellement considérée comme “d’importance primordiale” »[^64]. Autrement dit, les autorités protestent durement en paroles, tandis que les médias financiers choisissent de couper le son.

> 📝 **Note du curateur** : Ce silence révèle où se situe réellement le pouvoir. La Chine a besoin des puces de NVIDIA ; ainsi, même lorsque Jensen Huang prononce la phrase la plus inacceptable pour Pékin, les médias continentaux choisissent de ne pas la rapporter ni l’amplifier, de peur de nuire à la relation avec ce « gourou de l’IA ». Une formule a beaucoup circulé : la Chine a besoin de NVIDIA, mais NVIDIA n’a pas besoin de la Chine[^65]. Dans cette relation, même le gigantesque marché de l’autre rive du détroit se trouve, dans une certaine mesure, saisi à la gorge par la chaîne d’approvisionnement d’une entreprise américaine. C’est là la position étrange de Taïwan : le monde entier, y compris l’acteur qui souhaite le plus modifier son statut, dépend des puces fabriquées ici. Mais « le monde entier dépend de vous » et « vous êtes donc en sécurité et décidez » restent deux choses différentes. L’auteur ne tire pas de conclusion politique pour Taïwan, mais cette tension mérite que chaque lecteur la pèse lui-même.

## Indispensable, ce n'est pas synonyme de contrôle

Revenons à cette muraille des logos comportant les 55 entreprises.

Chaque nom sur cette muraille est réel. Elles sont la chair de la révolution de l'IA terrestre ; sans elles, NVIDIA, avec ses cinq billions de dollars, ne pourrait livrer même une seule puce. Cette irremplaçabilité est un fait d'ingénierie, pas une rhétorique. Taïwan devrait en être fier.

Mais au cours de ce parcours, les halos, la valorisation et le pouvoir de décision reposent sur ceux qui ont construit cette muraille ; tandis que les marges de 5 %, l'énergie puisée, les prix immobiliers gonflés à des niveaux inabordables, et le risque de guerre pesant sur l'île, sont supportés par les noms inscrits dessus. Taïwan détient un interrupteur dont le monde ne peut pas se passer, mais cela ne lui confère pas la maîtrise absolue. Et cette pièce, elle a une date de péremption fixée autour de 2028.

Taïwan n'est pas inactif. Lai Ching-te a proposé en 2025 que Taïwan devienne un « centre de calcul mondial parmi les cinq premiers » et développe l'« IA souveraine »[^66] ; Foxconn construit actuellement dans le comté de Kaohsiung un supercalculateur national utilisant dix mille puces Blackwell[^67] ; le « Dixième Grand Projet en IA » du gouvernement est censé investir plus de 100 milliards, avec pour objectif une valeur de marché de 15 billions[^68]. C'est l'ambition de passer de la « sous-traitance pour autrui » à la « computation pour soi » : grimper d'un cran depuis le bas de la courbe du sourire.

Cependant, il y a encore un long chemin à parcourir. Le modèle linguistique propre à Taïwan, TAIDE, est décrit comme étant au niveau d'un « lycéen », alors que les grandes entreprises internationales sont déjà au niveau de « l'étudiant diplômé »[^69]. Le gouvernement sud-coréen a acheté en une seule fois 260 000 GPU, tandis qu'ici, Taïwan est encore engagé dans des marchandages concernant un terrain et une indemnité de résiliation[^70]. De la réception d'un appel de Morris Chang à la gestion de la puissance de calcul du monde entier, Taïwan a mis près de trente ans pour arriver sur cette muraille. Mais se tenir devant la muraille n'est pas la même chose que reprendre le stylo.

Cette muraille continuera de briller. Lors de la prochaine Computex, il y aura plus de logos sur l'arrière-plan de Jensen Huang. En 2026, il a révélé que NVIDIA dépensait environ 150 milliards de dollars par an à Taïwan, contre seulement 10 à 15 milliards il y a cinq ans[^71]. La question « Taïwan est-il important ? » a déjà une réponse. Ce qu'a à répondre Taïwan est plus difficile : lorsque le monde entier ne peut pas se passer de ce que vous faites, comment faire en sorte que l'« indispensable » devienne le « maître du jeu » ?

Les noms sur la muraille ne cessent de s'accumuler. Ceux qui tiennent le stylo réussiront-ils à devenir eux-mêmes — cette plume, Taïwan vient juste d'y toucher.

---

**Lectures complémentaires** :

- [Jensen Huang : de l'adolescent qui nettoyait les toilettes au gourou en cuir du milliardaire](/fr/people/jensen-huang) — Biographie personnelle du fondateur de NVIDIA ; cet article ne fait qu'effleurer, son histoire familiale à Tainan et sa croissance sont ici
- [L'industrie des semi-conducteurs](/fr/technology/taiwan-semiconductor-industry) — Pourquoi Taïwan est devenu le centre mondial de la fabrication de puces ; l'écosystème de la chaîne d'approvisionnement abordé dans cet article offre un contexte plus complet
- [Entreprise taïwanaise : TSMC](/fr/economy/tsmc) — La « montagne protectrice » qui fabrique chaque puce pour NVIDIA, et le revers de cette médaille
- [Morris Chang : la destinataire de cette lettre, et l'empire de la fabrication de wafers qu'il a bâti](/fr/people/tsmc-morris-chang) — Le fondateur de TSMC, celui qui a reçu la lettre de Jensen Huang en 1996
- [Computex : le salon informatique de Taipei, comment il est devenu l'ouverture mondiale de l'IA](/fr/technology/computex) — La scène où brille cette muraille des logos, le terrain annuel de la haute technologie taïwanaise
- [L'industrie de l'intelligence artificielle](/fr/technology/artificial-intelligence-industry) — De la fabrication des puces NVIDIA à la création de l'écosystème de l'IA, la place de Taïwan dans la vague de l'IA
- [Développement et stratégie de l'IA taïwanaise](/fr/technology/artificial-intelligence-development-strategy) — L'IA souveraine, TAIDE et l'ambition nationale de Taïwan pour passer de la sous-traitance à l'autonomie
- [Histoires de la technologie taïwanaise : 100 points pour la puce, 60 pour le micro](/fr/technology/taiwan-tech-storytelling) — Deux façons de raconter la même puce : la prime au récit de NVIDIA et ce que la technologie taïwanaise doit apprendre
- [Entreprise taïwanaise : Foxconn Precision Industry](/fr/economy/foxconn-precision-industry) — Le géant sous-traitant qui assemble 40 % des systèmes d'IA mondiaux, les plus grandes mains au bas de la courbe du sourire

## Sources des images

- [Jensen Huang at Computex Taipei](https://commons.wikimedia.org/wiki/File:Jensen_Huang_at_Computex_Taipei_20160531c.jpg) — Photo : NVIDIA Taiwan, 2016, CC BY 2.0 (image principale, Jensen Huang sur la scène de Computex)
- [NVIDIA Ampere GA102 GPU die](<https://commons.wikimedia.org/wiki/File:Nvidia@8nm@Ampere@GA102@GeForce_RTX_3090@S_TW_2032A1_SNNB9W.000_GA102-300-A1_DSC06025-DSC06107_(50740715646).jpg>) — Photo : Fritzchens Fritz, CC0 (micrographie du die)
- [Jensen Huang holding RTX Blackwell at CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Photo : Pronoia, CC0
- [TSMC factory in Taichung](https://commons.wikimedia.org/wiki/File:TSMC_logo_on_Taichung_factory_building.jpg) — Photo : Briáxis F. Mendes（孟必思）, CC BY-SA 4.0
- [Computex Taipei at Taipei Nangang Exhibition Center](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Photo : NVIDIA Taiwan, 2015, CC BY 2.0
- Vidéo : [NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025](https://www.youtube.com/watch?v=TLzna9__DnI) — chaîne YouTube officielle de NVIDIA

## Références

[^1]: [NVIDIA becomes first company to hit $5 trillion market cap](https://www.cnbc.com/2025/10/29/nvidia-5-trillion-market-cap.html) — Article de CNBC du 29 octobre 2025 indiquant que NVIDIA est devenue la première entreprise de l’histoire à dépasser cinq billions de dollars de capitalisation boursière, portée par la demande en puissance de calcul pour l’IA.

[^2]: [台灣占全球 AI 伺服器市場 90%](https://technews.tw/) — Données du ministère de l’Économie et du MIC : l’industrie taïwanaise des serveurs représentait déjà plus de 80 % des expéditions mondiales, et la sous-traitance de production et d’assemblage de serveurs d’IA atteint 90 % du marché mondial ; avec les fournisseurs de marques américaines, elle atteint 100 %. Le facteur moteur est la demande des clients américains de produire hors de Chine.

[^3]: [TrendForce：NVIDIA 成台積電最大客戶](https://www.trendforce.com/) — Données TrendForce du 1er juin 2026 : la contribution du « Customer A » (NVIDIA) au chiffre d’affaires de TSMC passe de 12 % en 2024 à 19 % en 2025, dépassant Apple (22 % → 17 %) et devenant le premier client. Source primaire : rapport annuel 2025 de TSMC (investor.tsmc.com).

[^4]: [TrendForce：Rubin Ultra 改採雙晶粒架構](https://www.trendforce.com/news/) — Analyse TrendForce du 1er avril 2026 : un packaging à quatre dies ferait gonfler la surface jusqu’à 7,5-8 fois la limite du réticule, « dégradant gravement le rendement et les coûts », d’où un passage du design vers une architecture à deux dies ; l’IA devrait occuper 36 % de la capacité 3 nm en 2026, contre seulement 5 % en 2025. Les contraintes physiques de rendement du packaging déterminent directement l’architecture de la puce.

[^5]: [NVIDIA FY2025 10-K（SEC）](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Rapport annuel FY2025 déposé par NVIDIA auprès de la Securities and Exchange Commission des États-Unis, indiquant une marge brute GAAP annuelle de 75,0 % (72,7 % en FY2024).

[^6]: [黃仁勳 Computex 2025 演講整理：55 家台廠 logo 牆](https://money.udn.com/money/story/5612/8750451) — Dossier d’Economic Daily News listant les 55 entreprises taïwanaises citées sur l’écran de la scène de Computex 2025 (AAEON, Accton, Delta Electronics... TSMC, UMC, Unimicron, Wistron, Wiwynn, Leadtek) ; un autre article indique que le total atteint 122 entreprises en incluant l’écran et la vidéo de remerciements.

[^7]: [NVIDIA 對台積電 3/4 奈米的依賴](https://www.ainvest.com/news/) — Analyse sectorielle : les puces H200, Blackwell et Rubin les plus rentables de NVIDIA dépendent toutes des procédés 3 nm et 4 nm de TSMC, créant un double goulet d’étranglement en fabrication et en packaging.

[^8]: [NVIDIA FY2025 10-K 供應鏈集中揭露（SEC）](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Texte du rapport annuel de NVIDIA : « Our supply chain is mainly concentrated in the Asia-Pacific region. We utilize foundries, such as Taiwan Semiconductor Manufacturing Company Limited, or TSMC... to produce our semiconductor wafers. » Les facteurs de risque listent la concentration géographique des fournisseurs, des fonderies et du packaging-test comme risque géopolitique.

[^9]: [TSMC CoWoS 產能與 NVIDIA 占比](https://www.financialcontent.com/article/tokenring-2025-12-26-tsmc-boosts-cowos-capacity) — Données FinancialContent et SiliconAnalysts : NVIDIA représente environ 60 % de la capacité CoWoS de TSMC (SiliconAnalysts évoque environ 595 000 tranches), tandis que des médias taïwanais parlent de 70 % en 2025 ; les trois premiers clients (NVIDIA, Broadcom, AMD) dépassent ensemble 85 %.

[^10]: [鴻海 AI 機架組裝市占超過四成](https://vocus.cc/) — Estimation d’E.SUN Securities Investment Consulting : Hon Hai (Ingrasys) est responsable des modules GPU, switch boards, compute boards et systèmes de baies GB200 NVL72, avec une part de marché supérieure à 40 %. L’usine de Nanching est la première usine phare de serveurs d’IA certifiée par le Forum économique mondial (décembre 2023).

[^11]: [廣達在前 50 大資料中心市占過半](https://www.artificialintelligence-news.com/news/ai-servers-transform-taiwan-manufacturing-giants/) — AI News rapporte que Quanta (QCT) est responsable de l’intégration L10 et L11, détient plus de 50 % de part de marché dans les 50 plus grands centres de données cloud, et est le deuxième assembleur mondial de serveurs.

[^12]: [緯創竹北 AI 新廠被 NVIDIA 訂單包下](https://vocus.cc/) — Article sectoriel indiquant que Wistron est responsable des plateformes HGX/DGX et que sa nouvelle usine du parc d’IA de Zhubei est « entièrement réservée par les fortes commandes de NVIDIA ».

[^13]: [台廠 AI 伺服器毛利率法說會數據](https://www.cnyes.com/) — Données issues des conférences investisseurs FY2025-FY2026 : marge brute de Hon Hai au T1 FY2026 de 6,18 % (les serveurs d’IA dépassant la moitié du chiffre d’affaires cloud et réseau), Quanta 4,78 % (baisse trimestrielle de 1,54 point, plus bas de près de 15 trimestres), Wistron 5,21 %, Wiwynn 7,2 % (9,4 % un an plus tôt).

[^14]: [次級供應鏈台廠毛利率（玉山投顧）](https://vocus.cc/) — Les entreprises taïwanaises proches du segment technologique affichent au contraire des marges plus élevées : Delta Electronics (alimentation/refroidissement) détient plus de 60 % du marché des alimentations de serveurs d’IA et affiche une marge brute de 37 % au T1 FY2026 ; Unimicron (substrats ABF) détient plus de 70 % des substrats d’ASIC IA, est l’unique fournisseur actuel de matériaux pour cartes NVIDIA CoWoP, avec une marge estimée à 21,3 %.

[^15]: [摩根士丹利：ODM 組裝增值毛利下滑](https://newtalk.tw/) — Newtalk cite un rapport de Morgan Stanley du 22 mai 2026 : la marge brute à valeur ajoutée de l’assemblage des systèmes complets par les ODM passe de 2,7 % pour GB300 à environ 1,9 % pour VR200 ; la valeur ajoutée par baie passe d’environ 108 000 dollars pour GB300 à 149 600 dollars pour VR200. Note : il s’agit de la marge brute de valeur ajoutée dans l’assemblage du système complet, différente de la marge brute globale d’entreprise (5-7 %).

[^16]: [Taiwan Insight：繁榮的台灣經濟，多數人沒感受到好處](https://taiwaninsight.org/) — Article de Min-Hua Chiang, Université de Nottingham, du 12 janvier 2026 : « most people in Taiwan did not feel the benefits of the thriving economy. » « The top 10% earners in Taiwan received 48% of total income, whereas the bottom 50% only received 12%. » La croissance estimée de 2025 atteint 7,37 %, parmi les meilleures au monde.

[^17]: [報導者：AI 榮景下的 K 型分化](https://www.twreporter.org/) — Tribune de Wang Ying-da dans The Reporter, 11 juin 2026 : « Les emplois directs sur la grande chaîne de croissance de l’IA, des semi-conducteurs et de l’électronique représentent moins d’un dixième de l’emploi total. » « Le salaire mensuel total par personne dans la restauration est de 38 484 dollars taïwanais ; comparé à l’industrie des composants électroniques, il n’en représente que 34,6 %. » La part des industries électroniques dans le chiffre d’affaires manufacturier passe de 58,0 % à 64,7 %.

[^18]: [《The Nvidia Way》：離倒閉只剩三十天](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Ouvrage de Tae Kim paru en 2024 et podcast Acquired/Sequoia : maxime interne de NVIDIA, « Our company is thirty days from going out of business », répétée à l’ouverture des réunions mensuelles ; lors de l’expédition du RIVA 128 en août 1997, l’entreprise n’avait plus qu’environ un mois de salaires en caisse. Cette maxime est en anglais, sans version chinoise mot à mot.

[^19]: [世嘉 500 萬美元救了 NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired et sources historiques sur les débuts de NVIDIA : ce qui a réellement sorti NVIDIA de sa crise financière à la fin des années 1990 est un versement de 5 millions de dollars de SEGA, non Taïwan ; cela nuance le récit romantique selon lequel « Taïwan a sauvé NVIDIA ».

[^20]: [黃仁勳寫信給張忠謀求代工](https://www.ettoday.net/) — ETtoday rapporte que Jensen Huang a écrit vers 1996 au fondateur de TSMC, Morris Chang, pour demander si « TSMC pourrait produire en sous-traitance la première puce de NVIDIA » ; en 1998, les deux parties signent officiellement un contrat de coopération et TSMC devient la principale fonderie.

[^21]: [台積電米玉傑：深遠合作始於 1997](https://technews.tw/) — TechNews, 19 mai 2025 : Miin Wu de TSMC rappelle que cette « coopération profonde a commencé à un moment critique, en 1997. Le fondateur de TSMC, Morris Chang, a personnellement contacté le fondateur de NVIDIA, Jensen Huang, afin de répondre à la demande de services de fonderie de NVIDIA. »

[^22]: [黃仁勳接張忠謀電話的場景（二手轉述）](https://www.businessweekly.com.tw/) — Version en bande dessinée d’un extrait de Business Weekly rapportant que, lorsque Jensen Huang reçoit l’appel de Morris Chang, il aurait crié aux personnes autour de lui : « Tout le monde, moins fort ! C’est Morris Chang qui appelle ! » Il s’agit d’un récit de seconde main, au ton incertain.

[^23]: [1998 台積電製程出錯幾乎毀了 NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired et sources historiques sur les débuts de NVIDIA : en 1998, une erreur dans un procédé chimique de TSMC conduit à la mise au rebut d’un grand nombre de puces NVIDIA, manquant presque de faire à nouveau tomber l’entreprise ; cela confirme le cadre d’une « ligne vitale manufacturière » taïwanaise, non d’un « sauveur financier », et d’une symbiose bilatérale.

[^24]: [AlexNet 用兩張 GTX 580 訓練](https://en.wikipedia.org/wiki/AlexNet) — Wikipédia et Tom’s Hardware : en 2012, Alex Krizhevsky entraîne AlexNet dans la chambre de ses parents avec deux cartes NVIDIA GTX 580, abaissant le taux d’erreur de reconnaissance d’images ImageNet de 26 % à 15,3 %, avec 10,8 points d’avance sur le deuxième, prouvant que le GPU est le moteur de l’apprentissage profond. CUDA est lancé en 2006.

[^25]: [Blackwell/Rubin 100% 依賴台灣境內 CoWoS-L](https://finance.biggo.com/news/) — Analyse sectorielle citant le Financial Times : entre 2025 et 2027, les GPU d’IA les plus avancés de NVIDIA, de la fabrication au packaging final, sont à 100 % bloqués sur les lignes CoWoS-L de TSMC à Taïwan.

[^26]: [台積電掌全球約 90–92% 先進製程](https://www.csis.org/analysis/countering-chinas-challenge-american-ai-leadership) — Analyse du CSIS : TSMC produit environ 92 % des semi-conducteurs les plus avancés au monde (moins de 5 nm), avec une capacité de packaging avancé supérieure à celle de tous ses concurrents réunis ; près de 90 % de ses clients dépendant de Taïwan incluent Apple, Amazon, Google, NVIDIA et Qualcomm.

[^27]: [台科大周雲蔡：短期無法分散台積電代工](https://www.sciencedirect.com/) — Étude de 2025 de Yuntsai Chou, National Taiwan University of Science and Technology : « Taiwan's supply chain would be particularly vulnerable to a quarantine initiated before 2027 » ; « Diversifying TSMC foundries is not feasible in the short term. Building a new leading-edge fab takes 3-4 years and costs $10B+. » La production de masse en 2 nm de TSMC Arizona vise 2030.

[^28]: [聯合報：兩兆雙星淪為兩兆傷心慘業](https://udn.com/) — Rétrospective de United Daily News sur la politique des « deux billions, deux étoiles » : « Les fabricants d’écrans et de mémoires semi-conductrices, glorieux pendant un temps, ont quelques années plus tard subi de lourdes pertes à cause de la surproduction internationale. Les internautes les ont surnommés les “prêtres taoïstes de Maoshan” (marge brute de trois à quatre), parce que les marges brutes de leurs produits n’étaient plus que de 3 % à 4 % ; les “industries des deux billions, deux étoiles” sont devenues les “industries des deux billions de chagrin”. » Les écrans et la DRAM ont été vidés faute de R&D, limitée à 6 %, contre 10-21 % en Corée, au Japon, aux États-Unis et en Europe.

[^29]: [中芯 5 奈米良率僅台積電三分之一](https://technews.tw/2025/03/28/) — TechNews, 28 mars 2025 : « Pour le même procédé de fabrication, les tranches 5 nm de SMIC coûtent 50 % plus cher que celles de TSMC, et leur rendement, en raison de l’utilisation exclusive d’équipements DUV, n’est que de 33 % de celui de TSMC » ; SMIC affirme avoir lancé la production de masse en décembre 2025, avec environ cinq ans de retard.

[^30]: [NVIDIA 50 億美元入股英特爾搶封裝產能](https://www.intel.com/) — En décembre 2025, NVIDIA acquiert environ 5 % d’Intel ; le véritable objectif est de « garantir un accès prioritaire à la capacité de packaging avancé d’Intel aux États-Unis », évaluée pour l’architecture Feynman de 2028, en réponse au goulet d’étranglement CoWoS de TSMC. Il s’agit d’une couverture de long terme, non d’un substitut à court terme.

[^31]: [台積電亞利桑那封裝廠 AP1 2028 量產](https://www.tomshardware.com/) — Article sectoriel : les usines de packaging AP1/AP2 de TSMC en Arizona commencent leur construction début 2026, et AP1 devrait entrer en production de masse en 2028 ; actuellement, 100 % des puces, y compris celles fabriquées à Phoenix, Arizona, doivent encore être renvoyées à Taïwan pour le packaging. L’usine Amkor Arizona doit entrer en production de masse début 2028.

[^32]: [力成 PiFO 封裝對標 CoWoS-L](https://www.trendforce.com/news/) — TrendForce, 10 novembre 2025 : « PiFO advanced packaging technology — benchmarked against TSMC's CoWoS-L — has emerged as the industry's top alternative » ; meilleur refroidissement par substrat de verre, coût de production inférieur d’environ 30 %, plusieurs concepteurs américains de puces d’IA se tournant vers elle, commandes remplies jusqu’en 2027. Les clients mentionnés sont « d’autres concepteurs américains de puces d’IA », pas clairement les GPU principaux de NVIDIA.

[^33]: [TrendForce：CoWoS 缺口縮窄靠台積電自己擴產](https://www.trendforce.com/news/) — TrendForce, 15 juin 2026 : « the CoWoS supply-demand gap is expected to narrow significantly from around 20% currently to about 10% by the end of 2026 » ; la capacité mensuelle pourrait atteindre un record de 120 000 à 140 000 tranches en 2026. La réduction du déficit vient de l’expansion de TSMC elle-même, non d’un fournisseur de substitution.

[^34]: [新光人壽 2021 標下北士科 T17/T18 地上權](https://www.cna.com.tw/news/afe/202510035002.aspx) — Central News Agency : en 2021, la municipalité de Taipei met aux enchères les droits de superficie T17 et T18 du parc Beitou-Shilin (3,89 hectares au total) pour 50 ans, sans obligation de plan d’investissement ; Shin Kong Life est l’unique soumissionnaire et remporte T17 pour 2,8 milliards et T18 pour 1,6 milliard de dollars taïwanais, soit 4,4 milliards au total, puis laisse le terrain vacant trois ans.

[^35]: [黃仁勳 Computex 2025 宣布 Constellation 總部落腳北士科](https://focustaiwan.tw/business/202505190009) — Focus Taiwan : lors de Computex en mai 2025, Jensen Huang annonce que le siège international de NVIDIA, « Constellation », est pressenti pour s’installer dans le parc technologique Beitou-Shilin, avec plus de 40 milliards de dollars taïwanais d’investissement, un démarrage des travaux en 2026, une ouverture en 2030 et plus de dix mille emplois.

[^36]: [NVIDIA、新壽、北市府三方卡關五個月](https://news.pts.org.tw/article/777650) — Public Television Service : les droits de superficie des terrains T17/T18 du parc Beitou-Shilin étant détenus par Shin Kong Life et les droits de superficie publics ne pouvant pas être directement transférés, les trois parties restent bloquées environ cinq mois sur l’acquisition du terrain.

[^37]: [台北市議會通過 44.34 億解約金](https://www.cna.com.tw/news/afe/202510035002.aspx) — Central News Agency : le 12 novembre 2025, le conseil municipal de Taipei approuve sans objection une indemnité de résiliation de 4 434 064 085 dollars taïwanais, versée par la municipalité à Shin Kong Life pour récupérer le terrain ; la radiation du droit de superficie intervient le 28 décembre.

[^38]: [游淑慧批新壽解約帳單](https://www.nextapple.com/) — Next Apple News, vérifié par WebFetch : la conseillère KMT Yu Shu-hui écrit textuellement : « En voyant, dans la facture de huit pages de Shin Kong Life, que même le désherbage, l’entretien de l’environnement, l’ajustement du logo et les frais de notaire devaient être remboursés par la municipalité de Taipei, je n’ai pu qu’esquisser un sourire amer... Même les frais d’ajustement du logo liés à la fusion de Taishin et Shin Kong Life doivent être payés par la municipalité ? C’est à s’évanouir... trois soupirs d’impuissance. » Puis : « La facture de Shin Kong Life est incompréhensible, mais l’intérêt général prime. »

[^39]: [法律白話文：議會各黨派和諧通過解約案](https://plainlaw.me/) — Plain Law Movement : « Le 12 novembre, le conseil municipal de Taipei examine et adopte l’indemnité de résiliation de 4,434 milliards ; les partis affichent une harmonie rare, et le groupe du DPP crie même “Soutenir NVIDIA, signer au plus vite”. » Le président du conseil Tai Hsi-chin déclare que le dossier est enregistré « sans objection », sous les applaudissements.

[^40]: [44.34 億解約金組成分析](https://www.nextapple.com/) — Next Apple News et calcul du cabinet comptable mandaté par la municipalité : Shin Kong Life avait initialement versé environ 3,3 milliards, sans démarrer les travaux pendant trois ans ; elle présente une facture de résiliation de 4,47 milliards, incluant désherbage, ajustement du logo et clôtures ; les comptables retirent environ 40 millions pour fixer le montant à 4,434 milliards, dont 1,441 milliard de coûts propres et taxes déjà payées par Shin Kong Life est globalement repris par NVIDIA.

[^41]: [都委會通過 Constellation 星艦造型總部設計](https://www.cna.com.tw/news/) — Central News Agency, 26 janvier 2026 : fusion de T17 (2,29 hectares) et T18 (1,6 hectare), taux d’emprise au sol de 50 % à 70 %, coefficient d’occupation des sols 300 %, hauteur 119,5 mètres, design inspiré du « vaisseau spatial » du siège américain, taux de couverture végétale 80 %, capacité d’environ 4 000 personnes, démarrage prévu fin 2026 et mise en service en 2030.

[^42]: [NVIDIA 台灣現有員工約 1,800 人](https://www.digitimes.com/news/a20250519PD231/) — Estimations de Digitimes et d’autres médias : les bureaux de NVIDIA à Neihu, Taipei (8, route Jihu) compteraient environ 1 800 employés et trois succursales ; il s’agit d’estimations médiatiques non officielles.

[^43]: [NVIDIA AI 創新研發中心計畫](https://focustaiwan.tw/business/202505190009) — Focus Taiwan et ministère de l’Économie : NVIDIA obtient en 2021 l’approbation de son « projet de centre de R&D et d’innovation en IA », pour un investissement total de 24,3 milliards de dollars taïwanais, 6,7 milliards de subventions publiques, et le recrutement de 1 000 personnes en R&D entre 2022 et 2027.

[^44]: [台灣輝達經典股份有限公司成立](https://www.cna.com.tw/news/afe/202510035002.aspx) — Central News Agency : NVIDIA crée en novembre 2025 « Taiwan Nvidia Classics Co., Ltd. », dont le capital passe de 1 milliard à 3,3 milliards de dollars taïwanais ; il s’agit d’une personne morale indépendante pouvant payer ses propres impôts et détenir des actifs.

[^45]: [標普：台積電 2030 用電可達全台 23.7%](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — Initium Media et Standard & Poor’s : en 2023, TSMC consomme 24,775 milliards de kWh, soit 8,96 % du total taïwanais et 16,2 % du secteur industriel ; en 2024, la consommation atteint 27,456 milliards de kWh, avec seulement 14,1 % d’énergies renouvelables ; S&P prévoit que la consommation pourrait atteindre 23,7 % du total national en 2030.

[^46]: [綠色和平《晶片榮景後的暗影》](https://www.greenpeace.org/taiwan/press/44037/) — Rapport de Greenpeace du 10 avril 2025 : la consommation électrique mondiale de la fabrication de puces d’IA passe de 218 GWh à 984 GWh (hausse annuelle de plus de 3,5 fois), celle de Taïwan bondit à 375,8 GWh, « soit 38 % du total mondial » ; les puces d’IA de TSMC émettent 185 700 tonnes de CO2e, en faisant la « championne des émissions » ; NVIDIA est notée F, ses émissions de chaîne d’approvisionnement passant de 3,51 à 6,91 millions de tonnes en trois ans, tandis qu’elle « ne fait que transférer les émissions de carbone et la pollution de sa chaîne d’approvisionnement vers d’autres régions du monde ».

[^47]: [台南再生水幾乎全給台積電](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — Initium Media : TSMC consomme plus de 200 000 tonnes d’eau par jour (56 000 tonnes à Hsinchu Science Park, 53 000 à Central Taiwan Science Park, 99 000 à Southern Taiwan Science Park) ; les quatre usines de recyclage de l’eau de Tainan fournissent 81 000 tonnes par jour, « presque entièrement à TSMC ».

[^48]: [嘉南農田 2021、2023 兩度停灌讓水給半導體](https://theinitium.com/) — Initium Media et autres articles : les terres agricoles de Chianan ont connu deux interruptions d’irrigation en 2021 et 2023, afin de transférer l’eau d’irrigation vers l’industrie des semi-conducteurs.

[^49]: [一片 12 吋晶圓需 8,327 公升水](https://www.greenpeace.org/taiwan/) — Greenpeace et données sectorielles : la fabrication d’une tranche de 12 pouces nécessite environ 8 327 litres d’eau.

[^50]: [北士科 6 萬就業人口搶 1,476 戶住宅](https://house.udn.com/house/story/123590/8769929) — Economic Daily News immobilier : le département du développement industriel de Taipei estime que la population active permanente du parc Beitou-Shilin pourrait atteindre 60 000 personnes ; selon 591, seuls environ 1 476 logements sont disponibles, les terrains résidentiels ne représentant que 13,8 % du secteur.

[^51]: [北士科核心地段新案破每坪 150 萬](https://www.ctee.com.tw/news/20260603701575-430601) — Commercial Times, juin 2026 : les transactions de nouveaux projets au cœur du parc Beitou-Shilin dépassent 1,5 million de dollars taïwanais par ping ; « 60 000 personnes pour 1 500 logements » ; les habitants craignent des embouteillages à la Neihu et demandent « pourquoi les prix montent alors que l’entreprise n’a pas encore commencé les travaux ».

[^52]: [實價登錄：士林區住宅最高成交每坪 188 萬](https://lvr.land.moi.gov.tw/) — Service d’information sur les prix réels des transactions immobilières du ministère de l’Intérieur : en 2025, la transaction résidentielle la plus élevée du district de Shilin atteint 570 400 dollars taïwanais par mètre carré, soit environ 1,88 million de dollars par ping, au 39, route Jihe, pour un prix total de 447 millions ; plusieurs transactions dépassent 1,5 million par ping. Note : il s’agit de logements de luxe à Tianmu et dans le centre de Shilin, non du parc Beitou-Shilin lui-même.

[^53]: [業者：園區生活機能差，三分之一員工離職](https://house.udn.com/house/story/123590/8769929) — United Daily News immobilier citant un professionnel anonyme : « en raison du manque de services de proximité, beaucoup d’employés ne veulent pas suivre l’entreprise dans le parc... et même après s’y être installés, un tiers des employés démissionnent à cause de l’incommodité des transports » ; le directeur des transports Hsieh Ming-hung indique que Beitou-Shilin évalue l’ajout de trois lignes.

[^54]: [PTT 匿名輿論：改換輝達題材](https://www.ptt.cc/) — Discussions anonymes sur PTT, non traçables individuellement : « On avait déjà usé jusqu’à la corde l’effet TSMC, maintenant on remplace simplement par le thème NVIDIA » ; « beaucoup d’ingénieurs de Neihu habitent dans d’autres comtés et villes, NVIDIA arrive à Beitou-Shilin et tout le monde va déménager ? La logique ne tient pas. »

[^55]: [矽盾與矽陷阱辯論](https://www.researchgate.net/) — Étude ResearchGate 2025, « Silicon Shield or Silicon Trap? », examinant comment la concentration des puces à Taïwan constitue simultanément une protection dissuasive (bouclier de silicium) et une incitation à l’agression ou un point de défaillance unique (piège de silicium).

[^56]: [破巢／焦土戰略的反論](https://thenewslens.com/) — The News Lens et Parameters, revue de l’U.S. Army War College (McKinney & Harris, 2021), sur la thèse du « Broken Nest » et ses objections : « Economic self-harm, even if successful in deterring China in the short-term, may only delay Chinese aggression until China can meet domestic semiconductor production goals » ; « it is unlikely that the Taiwanese public would view such a sabotage as in the country's own interests ».

[^57]: [台積電美國擴廠 1,650 億美元](https://www.foreignaffairs.com/) — TSMC annonce 165 milliards de dollars d’investissements aux États-Unis, en Arizona (65 milliards plus 100 milliards), afin de diversifier le risque géopolitique.

[^58]: [MIT 科技評論：台灣矽盾可能正在弱化](https://www.technologyreview.com/) — MIT Technology Review, 15 août 2025, « Taiwan's silicon shield could be weakening » : « Now some Taiwan specialists and some of the island's citizens are worried that this 'silicon shield,' if it ever existed, is cracking. » La crainte porte sur la dilution des cartes de Taïwan par le transfert de capacités hors de l’île.

[^59]: [葛來儀：台灣生態系難以複製](https://www.technologyreview.com/) — MIT Technology Review citant Bonnie Glaser, German Marshall Fund : « The ecosystem they created is truly unique. It's a function of the talent pipeline, the culture, and laws in Taiwan; you can't easily replicate it anywhere. »

[^60]: [Paul Triolo：亞利桑那永遠到不了那個程度](https://www.technologyreview.com/) — MIT Technology Review citant le spécialiste des politiques technologiques Paul Triolo à propos de l’usine TSMC en Arizona : « Arizona ain't that yet, and never will be. »

[^61]: [黃仁勳：台灣是世界上最重要的國家之一](https://www.cna.com.tw/) — Multiples articles de Central News Agency : le 29 mai 2024, Jensen Huang déclare publiquement à Taïwan : « Taiwan is one of the most important countries in the world. » (formulation originale en anglais).

[^62]: [Computex 2024 台大演講：臺灣是無名英雄世界支柱](https://www.tbotaiwan.com/) — Transcription complète du discours de Jensen Huang à l’Université nationale de Taïwan lors de Computex 2024 ; conclusion de la vidéo : « 臺灣是無名的英雄，卻是世界的支柱。 » « 謝謝你，臺灣！ » « 臺灣是我們非常珍貴夥伴的集中地，NVIDIA 的一切都從這裡開始。 »

[^63]: [國台辦陳斌華回應黃仁勳言論](https://zh.wikinews.org/) — Wikinews : Chen Binhua, porte-parole du Bureau chinois des affaires taïwanaises, dix-huit jours après les faits : « Face à ce type de propos extrêmement erronés, les habitants du continent et les internautes ont déjà exprimé une vive indignation. Taïwan n’a jamais été un pays... Nous espérons qu’il révisera bien ses leçons. »

[^64]: [中央社：陸媒消音黃仁勳「台灣是重要國家」](https://www.cna.com.tw/) — Central News Agency, 3 juin 2024 : « Les médias financiers d’ici ont produit de nombreux articles liés à cette visite, mais n’ont pas mentionné la déclaration de Jensen Huang selon laquelle “Taïwan est un pays important”, semblant omettre une question sensible habituellement considérée comme “d’importance primordiale”. »

[^65]: [專家：中國需要輝達，但輝達不需要中國](https://www.voacantonese.com/a/china-s-media-turned-a-blind-eye-to-jensen-huang-s-statement-20240607/7646642.html) — VOA Cantonese cite des experts analysant le silence des médias financiers chinois sur la déclaration de Jensen Huang selon laquelle « Taïwan est un pays important », reflet d’une relation asymétrique : « la Chine a besoin de NVIDIA, mais NVIDIA n’a pas besoin de la Chine ».

[^66]: [賴清德：全球前五大運算中心與主權 AI](https://www.bnext.com.tw/article/79391/sovereign-ai) — Business Next : en octobre 2025, Lai Ching-te propose de faire de Taïwan l’un des « cinq plus grands centres de calcul mondiaux » et de développer une « IA souveraine ».

[^67]: [鴻海建一萬顆 Blackwell 國家超級電腦](https://blogs.nvidia.com.tw/blog/foxconn-ai-factory-tsmc-taiwan-nvidia/) — Blog NVIDIA Taiwan : Hon Hai (Big Innovation Company) construit à Kaohsiung un superordinateur national utilisant 10 000 puces Blackwell, dépassant 90 exaflops, en coopération avec TSMC et le National Science and Technology Council pour créer la première usine d’IA de Taïwan.

[^68]: [行政院 AI 新十大建設](https://iknow.stpi.niar.org.tw/post/Read.aspx?PostID=21832) — STPI iKnow : les « dix nouveaux grands projets d’IA » du Yuan exécutif prévoient d’investir plus de 100 milliards de dollars taïwanais d’ici 2040, avec un objectif de 15 billions de valeur de production.

[^69]: [TAIDE 像高中生，國際大廠是研究生](https://www.cw.com.tw/article/5137534) — CommonWealth Magazine : le modèle de langue local taïwanais TAIDE est décrit comme « semblable à un lycéen, tandis que les grandes entreprises internationales sont déjà au niveau doctorant » ; le budget annuel de TAIDE est inférieur au coût d’un seul entraînement de modèle international, et TAIDE a débuté avec 9 machines, soit 72 H100.

[^70]: [南韓政府採購 26 萬顆 GPU](https://www.cw.com.tw/) — CommonWealth Magazine et articles sectoriels : le gouvernement sud-coréen achète directement 260 000 GPU, contraste avec l’hésitation relative de Taïwan dans ses décisions politiques.

[^71]: [黃仁勳 Computex 2026：每年在台支出約 1,500 億美元](https://cryptobriefing.com/nvidia-150b-taiwan-silicon-shield-ai/) — Cryptobriefing et Reuters : lors de Computex 2026, Jensen Huang révèle que NVIDIA dépense environ 150 milliards de dollars par an à Taïwan, contre seulement 10 à 15 milliards cinq ans plus tôt ; les partenaires de la chaîne Vera Rubin ont doublé et incluent 150 entreprises taïwanaises ; TSMC produit environ 90 % des procédés les plus avancés au monde.
