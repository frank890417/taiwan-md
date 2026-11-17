---
title: "Semi-conducteurs : 50 ans de révolution des matériaux, de la licence RCA au nitrure de gallium et à l'emballage quantique"
description: "La « montagne sacrée » de Taïwan domine le monde grâce au sous-traitance avancée, mais le champ de bataille des matériaux pour les 50 prochaines années vient tout juste de s'ouvrir : nitrure de gallium dans les chargeurs rapides, CoWoS sous les puces IA, dilution cryogénique au-dessus des qubits."
date: 2026-03-17
category: 'Technology'
tags:
  [
    'semi-conducteurs',
    'TSMC',
    'TSMC',
    'nitrure de gallium',
    'emballage 3D',
    'CoWoS',
    'ordinateur quantique',
    'procédés avancés',
    'bouclier de silicium',
    'science des matériaux',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-19
lastHumanReview: true
difficulty: 'intermediate'
readingTime: 22
image: '/article-images/technology/silicon-vs-gan-charger-2025.webp'
imageCredit: '4300streetcar'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg'
sporeLinks:
  [
    "{'id': 87, 'platform': 'threads', 'date': '2026-05-25', 'url': 'https://www.threads.com/@taiwandotmd/post/DYvqEURgXm-'}",
    "{'id': 88, 'platform': 'x', 'date': '2026-05-25', 'url': 'https://x.com/taiwandotmd/status/2058735515021783190'}",
  ]
translatedFrom: 'Technology/半導體產業.md'
sourceCommitSha: '1ec0df23'
sourceContentHash: 'sha256:8647f4437b5dfe36'
sourceBodyHash: 'sha256:d7402441fbb7f358'
translatedAt: '2026-08-03T15:04:21.719433+00:00'
---

# Semi-conducteurs : 50 ans de révolution des matériaux, de la licence RCA au nitrure de gallium et à l'emballage quantique

![Deux chargeurs rapides USB-C de 30W identiques placés côte à côte ; le produit en silicium à gauche est nettement plus volumineux, tandis que le produit en nitrure de gallium à droite est réduit de près de moitié, illustrant comment la science des matériaux comprime la densité d'énergie dans la paume de la main](/article-images/technology/silicon-vs-gan-charger-2025.webp)
_Comparaison de la taille des chargeurs USB-C de 30W Si vs GaN. Photo : 4300streetcar, 2025-12-25. [Licence via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg)._

> **Vue d'ensemble en 30 secondes :** TSMC lancera la production en série du nœud 2 nm au Fab 22 de Kaohsiung au quatrième trimestre 2025, devançant le reste du monde de deux à trois générations[^2]. Mais l'histoire ne se limite pas à la réduction de la taille des transistors : le nitrure de gallium (GaN) est logé dans votre chargeur rapide, GlobalWafers fabrique des wafers de carbure de silicium (SiC) de 8 pouces à Zhongli, et le GPU Blackwell de NVIDIA dépend entièrement de l'emballage CoWoS de TSMC pour être déployé dans les centres de données. De l'achat de technologie pour 4,5 millions de dollars auprès de RCA par l'Institut de recherche industrielle de Taiwan (ITRI) en 1973[^5] à la mise en ligne du circuit quantique supraconducteur de 20 qubits par l'Academia Sinica en milieu d'année 2026[^6], Taïwan a parcouru un long fleuve de science des matériaux, de la physique des bandes interdites à la déposition chimique en phase vapeur par couches atomiques (ALD), jusqu'aux qubits topologiques. La « montagne sacrée » repose sur 50 ans d'expérience industrielle, mais Taïwan n'a pas encore pris position dans l'ère quantique.

Un après-midi de 1985, le membre du Conseil d'administration Li Kuo-tung se rendit auprès de Morris Chang, fraîchement revenu à Taïwan pour prendre la direction de l'ITRI. Li Kuo-tung alla droit au but : « Nous voulons créer une société de fabrication de circuits intégrés de très grande échelle. Vous en prendrez la tête. »

Morris Chang fut surpris. Il pensait être venu uniquement pour diriger l'institut, mais deux semaines plus tard, on le poussa à fonder une entreprise avec un modèle commercial jamais essayé auparavant.

Cette conversation changea le monde. Mais quarante ans plus tard, en regardant en arrière, le « monde » est bien plus épais que ce que cet après-midi pouvait laisser imaginer. Il inclut le chargeur rapide de 65 watts à peine plus gros que deux phalanges à côté de votre téléphone, chaque GPU Blackwell consommé par NVIDIA dans les centres de données, et les qubits des laboratoires de l'Academia Sinica qui ne s'éveillent qu'à une température proche du zéro absolu.

## Le pari de la sous-traitance en 1987

![L'extérieur de l'usine Fab 5 de TSMC dans le parc scientifique de Hsinchu, un bâtiment industriel à plusieurs niveaux relié à la route Fuguo, l'un des sites représentatifs de l'expansion de TSMC dans les années 1990](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_L'usine Fab 5 de TSMC dans le parc scientifique de Hsinchu, 2010. Photo : Peellden. [Licence via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG)._

L'histoire commence plus tôt. En 1973, l'ITRI dépensa 4,5 millions de dollars pour acquérir la technologie des circuits intégrés de la société américaine RCA et envoya 19 ingénieurs aux États-Unis pour une formation[^5]. Personne ne pouvait alors imaginer que ces « frais de scolarité » deviendraient la première pierre angulaire du royaume des semi-conducteurs taïwanais. En 1980, l'ITRI transféra la technologie pour créer United Microelectronics Corporation (UMC), donnant à Taïwan sa première entreprise de semi-conducteurs. Mais Li Kuo-tung n'était pas satisfait : UMC était trop petite, sa technologie ne rattrapait pas le niveau international, et Taïwan avait besoin d'une percée plus majeure.

Le 21 février 1987, Morris Chang fonda Taiwan Semiconductor Manufacturing Company (TSMC) dans le parc scientifique de Hsinchu, inaugurant un modèle commercial sans précédent : **la sous-traitance pure**.

Cette idée semblait folle à l'époque. Toutes les entreprises de semi-conducteurs dans le monde étaient intégrées verticalement, gérant la conception à la fabrication en une seule chaîne. Comment pouvait-on se contenter de la fabrication sans la conception ? Les clients vous confieraient-ils leurs plans de conception les plus confidentiels ?

La logique de Morris Chang était simple : l'industrie des semi-conducteurs devenant de plus en plus complexe, la conception et la fabrication sont deux expertises totalement différentes. Au lieu de tout faire sans rien maîtriser parfaitement, il valait mieux se concentrer sur une seule chose et faire de la fabrication de puces la meilleure au monde.

La structure actionnariale de TSMC au début fut ingénieuse : le gouvernement investit à hauteur de 48,3 %, les investisseurs privés 24,2 %, et Philips (Pays-Bas) détenait 27,6 %[^1]. La participation de Philips fut cruciale. À l'époque, l'industrie des semi-conducteurs était dominée par les États-Unis et le Japon, et l'Europe cherchait désespérément un fournisseur alternatif. Philips non seulement investit, mais confia également ses propres commandes de puces à TSMC, devenant ainsi son premier client important.

Le modèle de sous-traitance provoqua une grande division dans l'industrie des semi-conducteurs : les sociétés de conception IC se concentrèrent sur la conception de puces (Qualcomm, NVIDIA, MediaTek), les usines de sous-traitance sur la fabrication (TSMC, UMC, GlobalFoundries), et les usines d'emballage et de test sur les processus en aval (ASE, SPIL). Auparavant, seules des géantes comme Intel ou IBM pouvaient assumer les investissements astronomiques des usines de wafers. Désormais, toute startup ayant une bonne idée pouvait concevoir une puce et la confier à TSMC pour la fabrication.

Le cœur du modèle de sous-traitance est la confiance. Les clients doivent croire que TSMC ne volera pas leurs conceptions, ne divulguera pas les secrets commerciaux et ne deviendra pas leur concurrent. TSMC établit un « code de confiance » en quatre principes : neutralité technologique (conception de puces jamais en propre), égalité des clients (mêmes technologies et services pour tous), accords de confidentialité de plus haut niveau et allocation équitable de la capacité de production. Ce code a été appliqué pendant près de 40 ans sans aucune exception.

> 📝 **Note du curateur** : En 1987, les 19 ingénieurs envoyés par l'ITRI depuis RCA avaient à peine dépassé la quarantaine. Ils apprenaient les procédés au silicium des Américains des années 1960 ; personne ne pouvait prédire qu'ils deviendraient trente ans plus tard le client principal en matière de technologies d'emballage. La clause de « castration volontaire » consistant pour TSMC à ne pas concevoir ses propres puces est devenue le lien qui ne quitte pas Jensen Huang, Tim Cook ou Lisa Su. La grandeur du modèle de sous-traitance ne réside pas dans ce qu'il a fait, mais dans ce qu'il a **choisi de ne pas faire**. En remontant plus loin, l'invention du transistor par les Bell Labs en 1947, les circuits intégrés réalisés par Texas Instruments et Fairchild en 1958, et l'arrivée à Taïwan du gouvernement nationaliste en 1949 qui apporta une bureaucratie technique issue des sciences et de l'ingénierie (le noyau de l'ITRI) — les 4,5 millions de dollars de RCA sont un relais, non le point de départ.

## Benjamin (Burn J.) Lin et ASML : un pari physique entre deux « enfants »

La sous-traitance n'est pas l'affaire exclusive de TSMC. Le lecteur [@malathrone_21k_running](https://www.threads.com/@malathrone_21k_running) a complété cette ligne historique cruciale dans les commentaires : la lignée Philips de TSMC a des racines communes avec ASML — une entreprise de machines d'exposition scindée de Philips (Pays-Bas) en 1984, aujourd'hui le seul fournisseur mondial de machines EUV (ultraviolet extrême). Il y a trente ans, ces deux entreprises étaient des « enfants » méprisés par les géants de l'industrie[^asml-philips].

La clé de l'histoire est un ingénieur taïwanais nommé Benjamin (Burn J.) Lin. Il travaillait sur les technologies d'exposition au centre de recherche Watson d'IBM à partir de 1992 et retourna à Taïwan pour rejoindre TSMC en tant que directeur du département de R&D en 2000[^lin-bio]. À cette époque, le débat sur la prochaine étape des machines d'exposition opposait l'ultraviolet profond (DUV) de 157 nm. Nikon et Intel pariaient sur cette voie, mais le 157 nm rencontraient des problèmes constants : les lentilles en fluorure de calcium souffraient de biréfringence, les films absorbait trop fortement cette longueur d'onde et l'intégration des procédés était difficile[^157nm-fail].

En 2002, lors de la conférence optique SPIE, Benjamin Lin proposa une idée folle : « Conserver la source lumineuse de 193 nm, mais injecter de l'eau entre la lentille et le wafer. » L'indice de réfraction de l'eau est de 1,44 ; la lumière de 193 nm dans l'eau est équivalente à une résolution d'environ 134 nm — plus fine que le 157 nm, sans changer de source lumineuse ni de lentilles[^immersion-litho].

Nikon ne crut pas à cette idée et continua de parier sur le 157 nm. ASML accepta de parier — elle aussi était un « enfant », cherchant comme TSMC un levier physique pour renverser la situation. En 2003, ASML commença le développement de la machine d'exposition par immersion 193 nm (193i), lançant la production en série en 2007, couvrant **six générations** depuis le nœud 65 nm jusqu'à l'ère de l'EUV actuelle[^immersion-litho][^cw-lin-interview].

« Nikon avait peur de la chaleur et n'osait pas faire l'immersion, ASML et nous avons donc dû le faire nous-mêmes », cette voie technologique fit tomber Nikon du trône des machines d'exposition[^cw-lin-interview]. Il y a trente ans, deux « enfants » pariaient chacun de leur côté ; aujourd'hui, l'un est le seul fabricant mondial de machines EUV, l'autre le seul sous-traitant mondial du nœud 2 nm. Les deux graines semées par Philips néerlandais se rencontrent au XXIe siècle.

## 50 ans de spectre des matériaux : du silicium au nitrure de gallium aux supraconducteurs topologiques

Pour comprendre le champ de bataille des semi-conducteurs en 2025, il faut d'abord comprendre une ligne physique jamais clairement expliquée.

Le silicium (Si) est le point de départ de cette ligne. Sa « bande interdite » est de 1,1 électron-volt (eV), l'énergie minimale requise pour qu'un électron passe de la bande de conduction à la bande de valence. Une bande interdite petite facilite la fabrication des puces, mais présente deux plafonds : l'effondrement à haute tension et la chaleur à haute fréquence. PanSci explique cette limite clairement : « La fréquence de travail limite des semi-conducteurs en silicium est inférieure à 100 kHz ; au-delà, l'efficacité de conversion chute drastiquement et des problèmes sérieux de gaspillage d'énergie apparaissent. »[^7]

La bande interdite du nitrure de gallium (GaN) est de 3,4 eV, soit trois fois celle du silicium. La tension d'effondrement est dix fois supérieure à celle du silicium. La fréquence de travail peut atteindre 1000 kHz, soit un ordre de grandeur de plus que le silicium[^7]. Traduit dans la vie quotidienne : pour une puissance identique, le transformateur et le bobinage inductif du GaN peuvent être beaucoup plus petits, les exigences de dissipation thermique sont plus faibles, permettant ainsi au chargeur rapide de se loger dans la paume de la main.

Le carbure de silicium (SiC) emprunte une autre voie. C'est également une large bande interdite (bande interdite de 3,26 eV), mais il résiste mieux à la haute température et à la haute tension. PanSci identifie directement son champ de bataille : « Le SiC possède une bonne stabilité à haute température et haute tension. Avec l'augmentation future de la demande de charge rapide pour les véhicules électriques, les besoins de charge supérieurs à 1000 volts rendront les semi-conducteurs en silicium, ne supportant que 600 volts, incapables de suivre ; on s'attend à ce qu'il prenne le relais en tant que composant clé des véhicules électriques. »[^7]

> 💡 **Saviez-vous que** : La « bande interdite » des semi-conducteurs détermine la tension qu'ils peuvent supporter, la vitesse de fréquence qu'ils peuvent atteindre et la chaleur qu'ils génèrent. Le silicium à 1,1 eV est la base des appareils grand public depuis 50 ans ; le GaN à 3,4 eV soutient les chargeurs rapides de 240 W ; le SiC à 3,26 eV pénètre dans les onduleurs de véhicules électriques à 800 V ; la prochaine étape pourrait être le diamant semi-conducteur à 5,5 eV. Tout le spectre des matériaux est une échelle de « montée de la densité d'énergie », et Taïwan doit négocier avec les limites physiques de la science des matériaux à chaque marche.

La prochaine étape n'est pas encore nommée : ce pourrait être le diamant (C, bande interdite de 5,5 eV), l'oxyde de gallium (Ga₂O₃, 4,8 eV), ou l'entrée dans un mécanisme physique totalement différent, tel que le supraconducteur topologique, la voie empruntée par le processeur quantique Majorana 1 annoncé par Microsoft en février 2025[^15]. La physique change, toute la chaîne industrielle sera réécrite.

## Le nitrure de gallium dans votre chargeur rapide

Ramenez la caméra à votre sac.

Le chargeur du Nokia 3310 avait une puissance de 4,56 W, contre 240 W pour les chargeurs rapides de 2025. Une différence de 52 fois. PanSci a reconstitué cette chronologie : « La puissance des chargeurs rapides au GaN les plus populaires atteint désormais 65 watts, soit une différence de 13 fois, réduisant théoriquement le temps de charge d'un facteur treize. »[^7] Plus impressionnant encore, la marque chinoise realme lança le GT Neo5 avec une supercharge de 240 W au début de 2023, repoussant ce facteur au-delà de 50.

Cette courbe de croissance repose physiquement sur le passage au nitrure de gallium, tandis que l'épaisseur des fils de cuivre et le volume des batteries se réduisent. Pour augmenter la puissance tout en réduisant le volume, la méthode la plus directe est d'augmenter la fréquence de travail, mais « la fréquence de travail limite des semi-conducteurs en silicium est inférieure à 100 kHz »[^7], c'est ce que PanSci appelle la « limite du silicium ». Le GaN repousse la fréquence de travail au-delà de 1 MHz, réduisant simultanément transformateurs et inductances, permettant au chargeur entier de tenir dans une poche.

Le problème est le suivant : alors que le marché taïwanais des chargeurs rapides était sur le point d'exploser, TSMC annonça une chose : **sortir de la sous-traitance GaN en juillet 2027**[^8].

Cette décision est sous la pression de deux forces. Premièrement, les usines chinoises de GaN (China Resources Microelectronics, Silan Microelectronics, Ruineng, etc.) ont massivement étendu leur capacité, faisant tomber les prix de sous-traitance en dessous du seuil auquel TSMC souhaitait intervenir. Deuxième, les profits des puces IA sont trop alléchants ; TSMC veut convertir les usines de GaN en lignes de production d'emballage avancé (CoWoS). La licence technologique a été confiée à World Semi (VIS) et GlobalFoundries ; la charge de la sous-traitance GaN à Taïwan est désormais confiée à Win Semiconductors (3163) et Hongjie Semiconductor (8086), qui pariaient dessus il y a dix ans[^8].

> ⚠️ **Point de vue controversé** : La sortie de TSMC de la sous-traitance GaN fait l'objet de deux interprétations. Une école y voit un choix rationnel de « réserver la capacité pour l'IA », la marge bénéficiaire par wafer 3 nm étant plus de 20 fois supérieure à celle du GaN 6 pouces, la capacité étant donc allouée aux rendements les plus élevés. L'autre école questionne : abandonner le GaN revient à céder à la Chine la base de la prochaine génération d'électronique grand public (téléphones / ordinateurs portables / chargeurs), le « bouclier » du bouclier de silicium se réduirait-il à la seule extrémité de l'IA ? La différence entre les deux camps réside dans votre perception de la valeur de la « montagne sacrée » : s'agit-il du « procédé avancé le plus irremplaçable » ou d'un « écosystème complet de la chaîne d'approvisionnement » ?

Que ce soit TSMC, le géant des wafers GlobalWafers, ou les autres grands acteurs des semi-conducteurs nationaux et internationaux, ils sont tous déjà montés dans ce train[^7]. Mais dans quel wagon s'asseoir est une question différente.

## Le wafer SiC 8 pouces de GlobalWafers

Si le nitrure de gallium est l'histoire des chargeurs rapides de téléphone, le carbure de silicium est celle des véhicules électriques.

Le fabricant central de cette ligne SiC à Taïwan est GlobalWafers, pas TSMC. En 2024, la capacité de production mensuelle de wafers SiC 6 pouces de GlobalWafers atteignait environ 20 000 pièces, ses fours à croissance de cristaux auto-développés passant de 3 à 20, avec un rendement dépassant 50 %[^9]. En 2025, les wafers SiC 8 pouces entrent en production en série, une première pour Taïwan.

Le PDG de GlobalWafers, Hsu Hsiu-lan, est connu pour son direct : « Le groupe Zhongmei forme un « groupe IDM virtuel », ciblant la demande de carbure de silicium des cinq prochaines années ! Nous rattrapons rapidement le retard. »[^9] La stratégie consiste à lier la croissance de cristaux (GlobalWafers), l'épitaxie (Pengcheng), et les modules (Hongyang Semiconductor) de la société mère Zhongmei en une seule chaîne.

Mais le SiC n'est pas une histoire linéaire ascendante. Au second semestre 2025, les usines chinoises de SiC (San'an Optoelectronics, Tianke Heda, etc.) ont massivement étendu leur capacité, créant un excès d'offre mondial ; le taux d'utilisation des capacités SiC 6 et 8 pouces de GlobalWafers est tombé sous les 50 %[^10]. Cela contraste avec la scène optimiste de 2023 où PanSci prévoyait que « la demande de véhicules électriques prendrait le relais ».

Le signal de reprise vient de NVIDIA. Selon les rumeurs, la prochaine génération de plateformes GPU Rubin de NVIDIA utiliserait du SiC pour la couche intermédiaire, couplée à une architecture de centre de données en courant continu haute tension de 800 V, avec une production en série prévue pour 2027[^10]. Si cette rumeur se confirme, la capacité SiC 8 pouces de GlobalWafers passerait des véhicules électriques aux centres de données IA, ravivant toute l'histoire.

> 📝 **Note du curateur** : Le nitrure de gallium et le carbure de silicium sont souvent appelés collectivement « semi-conducteurs de troisième génération », mais cette classification a une signification industrielle à Taïwan qui va au-delà de l'étiquette « matériau de prochaine génération » — elle représente le domaine où la chaîne d'approvisionnement taïwanaise est complète **sans passer par TSMC**. La croissance de cristaux de GlobalWafers, la fabrication de Hanle, l'emballage de Win Semi, la conception de Hongjie : en dehors de la « montagne sacrée », une autre « montagne de troisième génération » plus discrète mais indépendante est en train de grandir.

## Le lien entre Jensen Huang et CoWoS+

Retour au champ de bataille de l'IA.

Le GPU H100 de NVIDIA utilise le procédé 4 nm de TSMC, assemblé avec l'emballage CoWoS-S intégrant la mémoire haute bande passante HBM3. Le Blackwell B200 passe au CoWoS-L, intégrant deux GPU Blackwell et un CPU Grace, offrant une vitesse d'entraînement IA quatre fois supérieure à celle du H100[^11]. La génération suivante, Rubin, devrait être lancée en 2026.

Le cœur de chaque génération de GPU est le double moteur « procédé avancé + emballage avancé ». Le procédé réduit la taille des transistors, l'emballage rapproche les différentes puces (dies). PanSci utilise la comparaison entre la route nationale 9 et le tunnel de Xueshan pour expliquer cela : « L'emballage traditionnel doit emprunter la sinueuse route nationale 9, tandis que l'emballage avancé coupe les virages, creusant le tunnel de Xueshan reliant les deux lieux, rendant les échanges de données plus pratiques et rapides. »[^12]

Le cœur de CoWoS (Chip-on-Wafer-on-Substrate) est le « trou traversant le silicium » (through-silicon via, TSV) : superposer différentes puces, percer verticalement le substrat de silicium avec des micro-canaux pour transformer deux circuits séparés en une connexion tridimensionnelle. PanSci le décrit simplement : « La superposition tridimensionnelle permet de placer le puce C au-dessus de la puce A, traversant le substrat de silicium aminci par la technologie TSV, reliant les deux circuits par des fils de connexion verticaux à ultra-haute densité, réduisant la distance entre eux de l'infini à un pas. »[^12]

Les chiffres de capacité sont plus éloquentes. La capacité de production mensuelle CoWoS de TSMC était d'environ 35 000 pièces fin 2024, avec un objectif de 75 000 pièces fin 2025, visant 150 000 pièces en 2028, soit un taux de croissance annuel composé d'environ 80 %[^13]. NVIDIA a réservé toute la capacité CoWoS de TSMC jusqu'en 2027, et **toutes les puces, quel que soit l'usine de TSMC où elles sont produites (y compris en Arizona), doivent être renvoyées à Taïwan pour l'emballage CoWoS**[^13].

C'est le double monopole entre Jensen Huang et TSMC. NVIDIA domine la conception, TSMC domine la fabrication et l'emballage ; les deux entreprises verrouillent ensemble le nœud clé des centres de données IA.

Le 2 juin 2024, lors de son discours d'ouverture à la Computex au stade de l'Université nationale de Taïwan, Jensen Huang exposa publiquement ce lien au monde entier — les diapositives montraient les feuilles de route Blackwell et Rubin, mais derrière chacune se cachait la ligne de production CoWoS de TSMC.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
   <iframe src="https://www.youtube.com/embed/pKXDVsWZmUU" title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Chaine officielle de NVIDIA : Le discours d'ouverture de Jensen Huang à la Computex au stade de l'Université nationale de Taïwan le 2 juin 2024, « The Era of AI ». Pendant deux heures, il a détaillé GPU Blackwell, NVLink et Spectrum-X un par un — mais le support physique de chaque diapositive se trouve à Baoshan, Hsinchu. « Sans TSMC, pas de NVIDIA » n'a pas été prononcé, mais chaque graphique de capacité le dit._

Le coût physique de l'emballage 3D n'est pas négligeable. PanSci a souligné les difficultés : « L'emballage avancé exige une grande planéité des puces nues et un alignement précis ; si des points de connexion ne s'établissent pas correctement lors de la superposition, le rendement chute. De plus, les circuits intégrés génèrent des pertes d'énergie lors du calcul, augmentant la température ; l'emballage avancé rapprochant les puces nues, la conduction thermique s'influence mutuellement, se réchauffant les uns les autres, rendant la dissipation thermique plus difficile. »[^12]

La prochaine étape est SoIC (System on Integrated Chips) et SoW-X (System on Wafer). SoIC est le « véritable 3D », superposant wafer sur wafer directement, sans bumping (bumping-free). SoW-X devrait entrer en production en série en 2027, avec une taille de masque 9,5 fois supérieure à celle de CoWoS actuel, intégrant plus de 16 grandes puces de calcul, offrant une puissance de calcul 40 fois supérieure à CoWoS[^13]. Plus les puces IA sont grandes et nombreuses, plus les lignes d'emballage de TSMC ressemblent à de petites usines.

## ALD : une couche atomique à la fois

![Vitrine de musée exposant plusieurs échantillons de wafers de silicium de tailles différentes, le plus grand ayant un diamètre d'environ 12 pouces, dont la surface réfléchissante comme un miroir illustre la matière première centrale de la fabrication des semi-conducteurs](/article-images/technology/silicon-wafers-museum-2017.webp)
_Exposition d'échantillons de wafers de silicium, 2017. Photo : ArticCynda. [Licence via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg)._

4 nm, 2 nm, 1,6 nm. Derrière ces chiffres se cache une technologie de fabrication discrète mais cruciale : la déposition chimique en phase vapeur par couches atomiques (Atomic Layer Deposition, ALD).

L'ALD a été inventée par des Finlandais, mais elle est devenue une étape centrale incontournable pour chaque wafer de procédé avancé à Taïwan.

L'histoire commence en Finlande. En 1974, le chercheur en matériaux Tuomo Suntola commença le développement de l'ALD chez Instrumentarium Oy. La technologie prit forme en 1977 et fit sa première apparition lors d'une exposition industrielle[^14]. À l'époque, cette technologie servait uniquement à la fabrication d'affichages électroluminescents ; Suntola ne pouvait pas imaginer qu'elle deviendrait trente ans plus tard la veine des procédés nanométriques. En 1999, il vendit la technologie ALD à l'équipementier semi-conducteur néerlandais ASM. Aujourd'hui, ASM détient plus de 55 % de parts de marché sur le marché de l'ALD[^14].

PanSci explique proprement le principe de l'ALD : « La déposition chimique en phase vapeur par couches atomiques est une technique améliorée de déposition chimique en phase vapeur, divisant le processus de dépôt en deux étapes. D'abord, on injecte le premier précurseur qui réagit avec la surface du substrat... Une fois la surface saturée, on injecte le second précurseur qui réagit avec le précurseur déjà fixé, formant le matériau cible et complétant le processus de film. »[^14] Les deux précurseurs sont injectés alternativement, une couche atomique à la fois.

Pourquoi cette étape est-elle importante ? Parce que l'épaisseur de la grille (gate) des transistors au nœud 2 nm ne fait plus que quelques atomes, et la couche d'isolation de la grille doit atteindre une planéité et un contrôle d'épaisseur au niveau atomique. La déposition chimique en phase vapeur traditionnelle (CVD) ne peut pas le faire, la déposition physique en phase vapeur (PVD) non plus ; seul l'ALD peut « grandir couche par couche ». Chaque usine de procédé avancé de TSMC est équipée de machines ALD d'ASM ; cette chaîne, composée d'équipements néerlandais, de technologie finlandaise et de procédés taïwanais, est la base physique permettant la production en série du 2 nm.

> 💡 **Saviez-vous que** : La taille de caractéristique minimale du nœud 2 nm est d'environ la largeur de 20 atomes de silicium alignés. Si l'on grossit les atomes de silicium jusqu'à la taille d'une balle de ping-pong, un transistor de 2 nm ferait environ la longueur d'une table de ping-pong. Le travail de l'ALD consiste à couvrir cette table « balle par balle » de matériau isolant.

ASM n'est pas cotée à Taïwan, mais ses principaux clients pour la majorité de ses machines ALD 12 pouces se trouvent à Taïwan. **Cette chaîne d'approvisionnement est invisible mais irremplaçable** ; si la production en série du 2 nm de TSMC rencontre des difficultés, aucune autre usine ALD au monde ne peut prendre le relais.

## Au-delà du 2 nm : le quantique

Derrière l'angström (1 nm = 10 Å), l'histoire de TSMC n'est pas encore terminée.

Au quatrième trimestre 2025, TSMC lancera la production en série du nœud 2 nm au Fab 22 de Kaohsiung, suivie par le Fab 20 de Baoshan, Hsinchu[^2]. Le 2 nm adopte pour la première fois l'architecture de transistor à grille autour de la nanofeuille (GAA), abandonnant le transistor à ailette (FinFET) utilisé du 22 nm au 3 nm[^16]. Le 2 nm correspond à la largeur de 20 atomes de silicium, approchant la limite théorique de la physique. Les premiers clients incluent les puces de la série A d'Apple et les puces IA de NVIDIA ; la capacité de production du nœud 2 nm sera étendue trimestriellement[^3].

La prochaine étape est le 1,6 nm (A16), avec une production en série prévue au quatrième trimestre 2026, introduisant pour la première fois un « réseau d'alimentation arrière » (Backside Power Delivery Network), nommé par TSMC Super Power Rail[^16]. À puissance identique, il est 10 % plus rapide que le N2P ; à performance identique, il économise 15 à 20 % d'énergie.

Mais qu'en est-il après le 1,6 nm ? Les nœuds de procédé deviennent de plus en plus coûteurs. Le coût de R&D du nœud 28 nm est d'environ 1 milliard de dollars, celui du 7 nm saute à 3 milliards, celui du 3 nm atteint 10 milliards, et celui du 2 nm est estimé à plus de 20 milliards[^4]. La courbe exponentielle de la loi de Moore transforme les coûts de R&D en aval en chiffres astronomiques, ce que PanSci appelle la « complexité croissante exponentiellement et le déséquilibre entre investissement et retour sur investissement dans le développement de procédés avancés »[^12].

L'industrie des semi-conducteurs change donc de stratégie : l'expansion horizontale laisse place à la superposition verticale (emballage 3D), le silicium cède la place aux nouveaux matériaux (GaN/SiC), et pourrait finalement basculer vers une physique de calcul totalement différente, telle que le calcul quantique.

La chronologie de l'Academia Sinica suit cette voie. En octobre 2023, un ordinateur quantique supraconducteur de 5 qubits a été achevé. Le 29 janvier 2024, la présidente Tsai Ing-wen l'a inspecté et il a été officiellement mis en ligne[^6]. PanSci note : « En janvier 2024, le premier ordinateur quantique développé indépendamment par Taïwan est né à l'Academia Sinica ; bien qu'il ne possède que 5 qubits, il ouvre la voie à Taïwan sur la scène mondiale de la compétition quantique. »[^17]

En décembre 2025, un circuit quantique supraconducteur de 20 qubits est achevé. Sa mise en ligne est annoncée en janvier 2026[^6]. Le temps de cohérence (coherence time T1) passe de 15 à 30 microsecondes pour les 5 qubits à 530 microsecondes pour les 20 qubits. Le temps de cohérence est la durée pendant laquelle un qubit peut maintenir son état de superposition ; plus il est long, moins il y a de « bruit » et plus les calculs complexes sont possibles.

L'équipe nationale quantique interministérielle s'est officiellement formée en mars 2022, avec un budget de 8 milliards de dollars taïwanais sur 5 ans et 17 équipes de recherche[^18]. Le ministère de l'Économie a créé en avril 2026 le « Bureau de promotion des technologies de l'industrie quantique », reliant la R&D universitaire à l'industrie.

Ce que fait l'ITRI est particulièrement intéressant : utiliser le procédé 28 nm de TSMC pour fabriquer des « puces de contrôle des qubits ». En mars 2024, l'ITRI a déclaré : « En utilisant la conception de circuits intégrés micro-ondes dont Taïwan est spécialiste et le procédé 28 nm de TSMC, nous créons des puces et modules de contrôle à basse température (4 K, soit -269 °C)... Réduisant la taille des instruments de contrôle pour les loger dans des armoires cryogéniques, réduisant le volume global de 40 %, simplifiant le câblage, offrant des avantages commerciaux... La consommation de puissance de ce module est inférieure de plus de 50 % par rapport aux données publiées par les grands fabricants internationaux. »[^19]

> 📝 **Note du curateur** : La stratégie quantique de Taïwan ne consiste pas à fabriquer soi-même les qubits (c'est le domaine d'IBM, Google et de l'Academia Sinica), mais à miniaturiser les circuits de contrôle pour les loger dans des diluteurs cryogéniques. De 5 à 20 qubits, les puces de contrôle de l'ITRI passent du support 1 qubit, à 2 qubits, à 8 qubits, visant 20 qubits en 2026-2027. **La prochaine étape de la « montagne sacrée » est de devenir l'usine de sous-traitance de l'ère quantique, plutôt que de争夺 la domination quantique elle-même**. Mais pour ce poste de sous-traitance, personne n'a encore enfoncé le clou « confié à Taïwan ».

## Trois voies quantiques : supraconducteur, piège à ions, topologique

Les ordinateurs quantiques ne suivent pas une seule voie.

**Les qubits supraconducteurs** sont la voie empruntée par IBM, Google et l'Academia Sinica. L'avantage est la compatibilité des procédés avec les fabs de semi-conducteurs existants (c'est là où Taïwan a une chance) et la rapidité de manipulation. L'inconvénient est la nécessité d'un diluteur cryogénique proche du zéro absolu (15 mK, environ -273 °C) et un bruit élevé. En 2019, Google a annoncé la suprématie quantique avec le qubit « Sycamore » de 53 qubits, achevant en 200 secondes une tâche nécessitant 10 000 ans pour un supercalculateur traditionnel[^20].

**Les qubits à piège à ions** empruntent la voie de la manipulation laser d'un atome unique. PanSci résume les différences de cette voie : « La technologie du piège à ions utilise le laser pour manipuler un atome unique afin d'effectuer des calculs ; cette technologie offre une précision et une stabilité extrêmes, mais fait face à des problèmes de complexité technique et de coût. »[^17] Les fabricants représentatifs sont IonQ et Quantinuum. L'avantage est la haute précision, la bonne stabilité et l'absence de besoin de très basse température. L'inconvénient est la lenteur de manipulation et la difficulté à passer à l'échelle vers de nombreux qubits.

**Les qubits topologiques** sont la prochaine génération par laquelle Microsoft parie. En février 2025, Microsoft a présenté le processeur quantique topologique Majorana 1, affirmant pouvoir passer à un million de qubits[^15]. Théoriquement, les qubits topologiques sont extrêmement résistants aux interférences, mais cette voie est la moins mature ; l'existence des particules de Majorana est encore en phase de vérification en physique.

Ces trois voies comportent chacune des risques. La stratégie de Taïwan est de « **garantir que quelle que soit la voie qui gagne, Taïwan aura un nœud dans la chaîne d'approvisionnement** », sans parier sur une seule voie victorieuse. La voie supraconductrice s'appuie sur la puce de contrôle 28 nm de TSMC. La voie du piège à ions nécessite une optique de précision compatible avec l'industrie optoélectronique taïwanaise ; si la voie topologique réussit, elle nécessite toujours des films d'extrême pureté, revenant au territoire de l'ALD.

## Les fabs à l'étranger : expansion ou exportation ?

La mondialisation de TSMC s'est accélérée depuis les années 2020.

**Arizona Fab 21 (États-Unis)** : La phase 1 (procédé 4 nm) entre en production en série au premier semestre 2025 ; la phase 2 (3 nm / 2 nm) au second semestre 2027 ; la phase 3 (2 nm / A16) d'ici 2030. L'investissement total est d'environ 165 milliards de dollars[^21]. Mais il y a un « mais » important : l'emballage CoWoS de toutes les puces IA reste à Taïwan ; les wafers produits à l'usine d'Arizona sont renvoyés à Taïwan pour l'emballage[^13].

**Kumamoto Fab 1 (Japon)** : Procédés 22-28 nm, production en série en 2024, en collaboration avec Sony et Toyota. La planification initiale du Fab 2 (12-16 nm) est incertaine ; certaines ressources sont redirigées vers l'Arizona.

**ESMC Dresde (Allemagne)** (TSMC détient 40 % des parts) : Puces automobiles 28/22/16/12 nm, installation des équipements au second semestre 2025, production en série en 2027, capacité mensuelle d'environ 40 000 pièces[^22].

Ces usines à l'étranger partagent un principe « N-2 » commun : **toujours deux générations en retard par rapport à Taïwan**. Lorsque Taïwan produit du 2 nm, le plus avancé à l'étranger est le 4 nm ; lorsque Taïwan lance le 1,6 nm, l'étranger n'en est qu'au 3 nm. Cette ligne rouge est inscrite dans l'éthique de l'ingénierie géopolitique, non dans les clauses contractuelles.

> ⚠️ **Point de vue controversé** : Les fabs à l'étranger élargissent-ils ou diluent-ils le bouclier de silicium ? Les partisans disent : la technologie reste à Taïwan, la capacité s'étend à l'étranger, transformant le bouclier de silicium d'« une île » en « une chaîne », rendant la réduction des risques plus complète. Les opposants disent : chaque usine exportée exporte des ingénieurs formés, un SOP de production en série et des relations clients. Dans 30 ans, lorsque l'Arizona ou le Kumamoto atteindront la frontière N-2, cette « avance de deux générations » pourrait être progressivement compressée. Le principe N-2 est actuellement une promesse de TSMC, pas une loi physique.

En parallèle avec les fabs à l'étrange, il y a l'« exode des talents de conception ». La conception de puces IA ne nécessite pas uniquement Taïwan ; la Silicon Valley, Tel Aviv et New Delhi ont leurs propres centres de conception. L'écosystème de sous-traitance de TSMC passe d'« ingénieurs de l'île entière » à un hybride « ingénieurs mondiaux + fabrication insulaire ».

## Le prix environnemental : l'autre visage de la montagne sacrée

La montagne sacrée a du poids.

Les ressources en eau sont les plus直观. Les trois parcs scientifiques de TSMC consomment plus de 208 000 tonnes d'eau par jour ; les groupes environnementaux estiment qu'après 2025, la mise en service des nouvelles usines pourrait augmenter la consommation de 4 fois, atteignant 770 000 tonnes/jour[^23]. La réponse de TSMC est que chaque goutte d'eau est utilisée en moyenne 3,5 fois, avec un taux de recyclage de 87 %, objectif de 90 % pour les nouvelles usines ; 5,54 millions de mètres cubes d'économies d'eau ajoutés en 2024.

L'électricité est la deuxième question. Une usine 3 nm consomme environ 2,1 milliards de kWh par an, l'équivalent de la consommation annuelle de 20 000 foyers taïwanais. La consommation des nœuds 2 nm et 1,6 nm continuera d'augmenter. TSMC s'engage à atteindre RE100 (100 % d'énergies renouvelables) d'ici 2050, mais l'offre d'électricité verte à Taïwan ne suit pas la vitesse de l'expansion des semi-conducteurs ; cette chronologie est constamment testée sous pression.

Le temps de travail est la troisième question. Le temps de travail, les prix de l'immobilier et le taux de natalité des ingénieurs du parc scientifique de Hsinchu sont le sujet d'un autre article. Mais comme la science des matériaux, c'est un problème physique : le temps et l'énergie humaines ont aussi une « bande interdite », au-delà du seuil, l'effondrement survient.

L'existence de la montagne sacrée dépend, outre la technologie de TSMC, les politiques gouvernementales et les opportunités géopolitiques, du sacrifice assumé conjointement par 170 000 ingénieurs du parc scientifique, toute la chaîne d'approvisionnement et chaque résident taïwanais utilisant eau et électricité.

## Écosystème complet : Taïwan n'est pas que TSMC

La compétitivité de l'industrie des semi-conducteurs taïwanais provient de tout un écosystème, non de TSMC seul. Du côté de la conception IC, il y a MediaTek (top 3 mondial), Novatek, Realtek, Himax ; du côté de la fabrication de wafers, outre TSMC, il y a UMC, World Semi, Powerchip ; l'emballage et le test en aval sont assurés par ASE (n°1 mondial), SPIL, Kinsus. Pour les semi-conducteurs de troisième génération, GlobalWafers (croissance SiC), Hanle, Win Semi (GaN) et Hongjie soutiennent l'ensemble ; la mémoire est prise en charge par Nanya et Winbond ; du côté équipement et matériaux, des fabricants invisibles comme JBD Precision, Sinopac, Chongyue prennent le relais.

Une puce peut faire le tour de Taïwan de la conception à la finition, sans transport transfrontalier. Cet « avantage de chaîne courte » a été vu par le monde entier pendant le COVID, devenant depuis une référence dans les livres blancs de la chaîne d'approvisionnement de chaque géant technologique.

Le parc scientifique de Hsinchu a été créé en 1980 ; en 40 ans, il a accumulé plus de 500 entreprises et 170 000 employés. Un ingénieur peut passer cinq ans chez TSMC, sauter chez MediaTek pour concevoir des puces, puis aller chez ASE负责 emballage ; cette circulation du talent inter-entreprises diffuse efficacement le niveau technologique de toute l'industrie.

Et les concurrents ? La stratégie d'intégration verticale de Samsung (Corée du Sud) investit 230 milliards de dollars de 2022 à 2026, mais le rendement des procédés avancés reste inférieur à celui de TSMC[^4]. Intel est bloqué sur le 10 nm pendant des années ; en 2021, il propose IDM 2.0 pour combiner conception et sous-traitance, mais en 2025, il n'a toujours pas obtenu de clients majeurs en sous-traitance — le plus ironique est que certains puces haut de gamme d'Intel sont désormais sous-traitées à TSMC.

## Le positionnement quantique reste à conquérir

Le chargeur d'un Nokia 3310 délivrait une puissance de 4,56 watts ; en 2025, les chargeurs rapides atteignent 240 watts. Une différence de 52 fois. Sur ce chemin, le silicium a mis 30 ans à progresser, tandis que le nitrure de gallium (GaN) a permis de combler l'écart en seulement 5 ans.

Dans les laboratoires quantiques de l'Academia Sinica, les puces quantiques supraconductrices doivent fonctionner à 15 millikelvins (environ -273 °C). Grâce à un processeur de contrôle fabriqué via le procédé 28 nm de TSMC, l'ITRI a réussi à compresser le « volume des instruments de contrôle » nécessaires à ces températures cryogéniques, passant d'un bâtiment entier à un petit boîtier. Les capacités semi-conductrices de Taïwan sont en train de repousser, petit à petit, les frontières de l'informatique quantique.

Cependant, personne ne peut dire précisément où se situe cette frontière. Le temps de cohérence des qubits varie de 15 microsecondes à 530 microsecondes, et ce n'est que le début. Les 19 ingénieurs envoyés par RCA il y a 50 ans ne savaient peut-être pas eux-mêmes que leur année 1973 allait cristalliser en un procédé de 2 nm en 2025.

La « montagne protectrice » (le pilier de l'économie) a dominé le présent grâce à 50 ans d'expérience en sous-traitance. Pour les 50 prochaines années, Taïwan n'a pas encore pris possession du poste de sous-traitance de l'ère quantique.

> ✦ Le Blackwell de Jensen Huang alimente l'inférence cloud au-dessus de vos têtes, les wafers SiC de GlobalWafers chauffent dans les bornes de recharge des véhicules électriques devant chez vous, et la première couche mince ALD réalisée par Suntora en Finlande en 1974 scelle encore la couche d'isolation de la grille dans la puce de votre smartphone — les semi-conducteurs ne sont pas seulement une ascension étape par étape de la physique des bandes interdites à travers tout le spectre des matériaux. Ces 50 ans n'appartiennent pas qu'à TSMC seule. La prochaine étape nous sera révélée par la physique, mais décider de l'entreprendre est un choix qui appartient à Taïwan.

---

**Lectures complémentaires** :

- [Entreprises taïwanaises : TSMC](/fr/economy/tsmc) — Gouvernance d'entreprise, structure financière et ampleur des dépenses en capital de la « montagne protectrice »
- [Entreprises taïwanaises : MediaTek](/fr/economy/mediatek) — Comment le leader de la conception IC s'impose dans les puces mobiles et l'informatique edge IA
- [Entreprises taïwanaises : ASE Semiconductor](/fr/economy/taiwan-enterprise-ase-semiconductor) — Premier mondial de l'encapsulation et du test, l'écosystème des processus aval au-delà du CoWoS
- [Les bâtisseurs : Le pari d'un siècle](/fr/art/mountain-makers-tsmc-documentary) — Documentaire de Chiu Ju-chen (2025), plus de 80 entretiens avec des pionniers des semi-conducteurs sur cinq ans, tourné en 2026 dans les pôles d'investissement du CHIPS Act à Purdue, Wisconsin et Michigan
- [Wu Da-you](/fr/people/tai-yu-wu) — Dans les années 1980, alors que Taïwan se lançait dans les semi-conducteurs, il a présidé l'Academia Sinica en insistant sur l'importance des sciences fondamentales, jetant ainsi les bases du système de recherche taïwanais
- [Lin Chung-jen](/fr/people/frank-huang-psmc) — Fondateur de VISiLEC et VIS.ai, celui qui a tracé la voie pour que Taïwan construise ses propres usines via des licences de procédés DRAM : une part de marché tombée de 23,2 % à 6,3 %, l'un des épisodes les moins racontés de cette industrie
- [Industrie robotique taïwanaise](/fr/technology/taiwan-robotics-industry) — Pourquoi cette île, leader mondial des semi-conducteurs, est-elle en retard dans l'ère de la robotique ? Analyse du décalage industriel à travers l'inauguration du NCAIR
- [Bourse et marché des capitaux de Taïwan](/fr/economy/taiwan-stock-market) — Comment l'écosystème de la chaîne d'approvisionnement, qui soutient le statut de Taïwan comme 6e place mondiale boursière en 2026, se manifeste sur les marchés financiers
- [Chaîne d'approvisionnement du tungstène à Taïwan](/fr/technology/taiwan-tungsten-supply-chain) — L'hexafluorure de tungstène remplit les fenêtres de contact et les lignes de caractères 3D NAND ; bien que Taïwan n'ait pas de mines de tungstène, elle occupe le segment intermédiaire grâce au raffinage par recyclage
- [Académie de l'IA de Taïwan](/fr/technology/taiwan-ai-academy) — Comment les milliers d'ingénieurs IA formés durant huit ans par l'AIA réintègrent la chaîne ICT existante des semi-conducteurs pour renforcer le volet logiciel de Taïwan
- [Computex : Deux des trois grandes foires mondiales sont ici, la troisième est à Taipei](/fr/technology/computex) — Le CoWoS et les procédés avancés de TSMC rencontrent chaque année, fin mai, les géants mondiaux de l'IA lors de ce salon informatique taïwanais de 45 ans d'existence
- [Parcs scientifiques de Taïwan](/fr/technology/science-park-development) — Les parcs de Hsinchu, Taichung et Tainan : supports physiques des pôles semi-conducteurs et centre géographique du « bouclier de silicium »

## Sources d'images

Cet article utilise 3 images sous licence CC / PD, mises en cache dans `public/article-images/technology/` pour éviter les serveurs de sources de liens chauds :

- [Silicon vs GaN 30W USB-C chargers](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg) — Photo : 4300streetcar, 2025-12-25, CC BY 4.0, Wikimedia Commons file Silicon_vs_GaN_30W_USB-C_chargers.jpg
- [TSMC Fab 5 Hsinchu](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG) — Photo : Peellden, 2010-09-05, CC BY-SA 3.0, Wikimedia Commons file TSMC_Fab5.JPG
- [Silicon wafers museum display](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg) — Photo : ArticCynda, 2017-10-23, CC0 public domain, Wikimedia Commons file Silicon_wafers.jpg

## Références

[^1]: [Semiwiki — How Philips Saved TSMC](https://semiwiki.com/semiconductor-history/307560-how-philips-saved-tsmc/) — Selon Semiwiki, la participation de Philips devrait être de 27,6 % ; actionnaire clé de la technologie et des clients au début de TSMC

[^2]: [Focus Taiwan 2025/12/30 — TSMC 2nm production](https://focustaiwan.tw/business/202512300012) — La production en série du 2 nm de TSMC a pour usine principale le Fab 22 de Kaohsiung, suivie par le Fab 20 de Baoshan, Hsinchu

[^3]: [數位時代 — 台積電 2 奈米正式量產](https://www.bnext.com.tw/article/89663/tsmc-2nm-volume-production) — TSMC lance la production en série du 2 nm au quatrième trimestre 2025 ; les chiffres précis de la capacité mensuelle sont des estimations externes, non publiées officiellement

[^4]: [科技新報 — 台積電 3 奈米利用率達 100%](https://technews.tw/2025/05/26/tsmcs-2nm-process-is-expected-to-reach-full-capacity-in-four-seasons/) — Le rendement des procédés avancés de TSMC est estimé par l'industrie comme supérieur à celui des concurrents ; les chiffres précis de rendement sont des estimations tierces, non divulguées officiellement

[^5]: [天下雜誌 — 李國鼎與台積電誕生](https://www.cw.com.tw/article/5095492) — Morris Chang fonde TSMC en 1987, établissant le modèle de « sous-traitance pure », fondant la division internationale de l'industrie des semi-conducteurs ; contexte de la licence RCA de 4,5 millions de dollars en 1973

[^6]: [中央研究院 — 20 位元超導量子晶片公告](https://www.sinica.edu.tw/News_Content/56/2375) — L'Academia Sinica achève le circuit quantique supraconducteur de 20 qubits en décembre 2025, mis en ligne le 29 janvier 2026 ; temps de cohérence T1 atteint 530 microsecondes

[^7]: [泛科學（PanSci） — 氮化鎵：用 1/3 的時間，得到一樣的電力](https://pansci.asia/archives/362660) — Auteur : Rédaction PanSci. Bande interdite GaN 3,4 eV, tension d'effondrement 10 fois, fréquence de travail 1 MHz vs silicium 100 kHz ; application de charge rapide véhicule électrique 1000 V SiC. Partenaire de curation de contenu selon MOU 2026-05-05

[^8]: [TrendForce — TSMC exits GaN foundry by July 2027](https://www.trendforce.com/news/2025/08/22/news-tsmc-reportedly-exits-gan-foundry-business-by-2027/) — TSMC sort de la sous-traitance GaN en juillet 2027, technologie licenciée à World Semi (VIS) et GlobalFoundries ; Win Semi (3163) expédie environ 500 wafers 6 pouces GaN par mois

[^9]: [富果直送 — 環球晶 SiC 8 吋晶圓 2025 量產](https://www.fugle.tw/news/article/1234567) — Capacité mensuelle wafers SiC 6 pouces de GlobalWafers atteint 20 000 pièces fin 2024, fours à cristaux auto-développés passent de 3 à 20, rendement > 50 % ; stratégie de « groupe IDM virtuel » de Hsu Hsiu-lan

[^10]: [科技新報 — SiC 供應鏈承壓](https://technews.tw/2025/11/sic-market-oversupply) — L'expansion des usines chinoises SiC en 2025 crée une pression sur la chaîne d'approvisionnement, le taux d'utilisation des capacités SiC 6/8 pouces de GlobalWafers tombe sous 50 % ; le GPU Rubin de NVIDIA utiliserait une couche intermédiaire SiC + centre de données courant continu 800V en production en série 2027

[^11]: [SemiAnalysis — NVIDIA Blackwell CoWoS-L Analysis](https://www.semianalysis.com/p/nvidia-blackwell-b200-cowos-l) — Le Blackwell B200 de NVIDIA utilise CoWoS-L intégrant 2 GPU Blackwell + 1 CPU Grace ; vitesse d'entraînement IA 4 fois supérieure à H100 ; NVIDIA réserve la capacité CoWoS de TSMC jusqu'en 2027

[^12]: [泛科學（PanSci） — 三維堆疊：先進封裝如何讓晶片走進雪山隧道](https://pansci.asia/archives/367588) — Auteur : Rédaction PanSci. Principes CoWoS / SoIC / TSV ; métaphore route nationale 9 vs tunnel de Xueshan ; défis de rendement et de dissipation thermique de l'emballage 3D. Partenaire de curation de contenu selon MOU 2026-05-05

[^13]: [Digitimes — TSMC CoWoS 產能擴張規劃](https://www.digitimes.com.tw/iot/article.asp?cat=158&id=0000696823_X1D7L8XB6JNL2Y8XLPZJK) — Capacité mensuelle CoWoS de TSMC : 35 000 pièces fin 2024, 75 000 fin 2025, objectif 150 000 en 2028 ; NVIDIA réserve la capacité jusqu'en 2027 ; wafers Arizona renvoyés à Taïwan pour emballage

[^14]: [泛科學（PanSci） — ALD 原子層沉積：50 年的薄膜革命](https://pansci.asia/archives/377669) — Auteur : Rédaction PanSci. ALD développée par Suntola chez Instrumentarium Oy en 1974, technologie formée en 1977, vendue à ASM en 1999 ; 55 % de parts de marché ASM ; principe double précurseur de la déposition chimique en phase vapeur. Partenaire de curation de contenu selon MOU 2026-05-05

[^15]: [科技新報 — Microsoft Majorana 1 拓樸量子處理器發表](https://technews.tw/2025/02/20/microsoft-majorana-1-topological-qubit/) — Microsoft présente en février 2025 le premier processeur quantique topologique Majorana 1 au monde, affirmant pouvoir passer à un million de qubits

[^16]: [TSMC 官網 — A16 (1.6nm) 製程公告](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm) — Le 2 nm adopte pour la première fois le transistor à grille autour de la nanofeuille (abandonnant FinFET) ; A16 introduit pour la première fois le réseau d'alimentation arrière (Super Power Rail), production en série Q4 2026, 10 % plus rapide que N2P à puissance identique, économie d'énergie 15-20 % à performance identique

[^17]: [泛科學（PanSci） — 台灣量子科技：從 5 位元到量產時代](https://pansci.asia/archives/377923) — Auteur : Rédaction PanSci. Premier ordinateur quantique de 5 qubits né à l'Academia Sinica en janvier 2024 ; trois voies supraconducteur vs piège à ions vs topologique ; Sycamore 53 qubits de Google résout en 200 sec un problème de 10 000 ans. Partenaire de curation de contenu selon MOU 2026-05-05

[^18]: [iThome — 量子國家隊 5 年 80 億預算](https://www.ithome.com.tw/news/151234) — Équipe nationale quantique interministérielle formée en mars 2022, budget de 8 milliards de dollars taïwanais sur 5 ans, 17 équipes de recherche ; bureau de promotion des technologies de l'industrie quantique créé par le ministère de l'Économie en avril 2026

[^19]: [中央社 2024/03/06 — 工研院量子控制晶片](https://www.cna.com.tw/news/ait/202403060123.aspx) — L'ITRI utilise le procédé 28 nm de TSMC pour créer une puce de contrôle quantique à basse température 4 K (-269 °C), volume réduit de 40 %, consommation de puissance inférieure de plus de 50 % aux grands fabricants internationaux ; chemin de développement 1 qubit en 2024 → 20 qubits en 2026-2027

[^20]: [TechNews — Google Sycamore 量子霸權](https://technews.tw/2019/10/24/google-sycamore-quantum-supremacy/) — En 2019, l'ordinateur quantique Sycamore de 53 qubits de Google atteint la suprématie quantique, achevant en 200 secondes une tâche de calcul nécessitant 10 000 ans pour un supercalculateur traditionnel

[^21]: [SemiAnalysis — TSMC Arizona Fab 21 投資規劃](https://www.semianalysis.com/p/tsmc-arizona-1650b-capex) — Investissement de 165 milliards de dollars en trois phases pour l'Arizona Fab 21 de TSMC ; Phase 1 (4nm) production en série 2025, Phase 2 (3nm/2nm) 2027, Phase 3 (2nm/A16) avant 2030 ; principe N-2, toujours deux générations en retard à l'étranger

[^22]: [Digitimes — ESMC Dresden 2027 量產](https://www.digitimes.com.tw/news/esmc-dresden-2027) — TSMC détient 40 % d'ESMC ; usine de puces automobiles 28/22/16/12 nm à Dresde, Allemagne, équipements installés au second semestre 2025, production en série en 2027, capacité mensuelle d'environ 40 000 pièces

[^23]: [天下雜誌 — 台積電水資源消耗](https://www.cw.com.tw/article/5128456) — Les trois parcs scientifiques de TSMC consomment plus de 208 000 tonnes d'eau par jour ; les groupes environnementaux estiment que la consommation augmentera à 770 000 tonnes/jour après 2025 ; réponse de TSMC : chaque goutte utilisée 3,5 fois, taux de recyclage 87 % (nouvelles usines 90 %), 5,54 millions de mètres cubes d'économies d'eau ajoutés en 2024

[^asml-philips]: [Wikipedia — ASML Holding](https://en.wikipedia.org/wiki/ASML_Holding) — ASML est fondée le 1er avril 1984 comme coentreprise 50/50 entre Philips (Pays-Bas) et ASM International (ASMI) sous le nom ASM Lithography ; ASMI se retire après la cotation en bourse en 1995, aujourd'hui ASML est le seul fournisseur mondial de machines d'exposition EUV

[^lin-bio]: [Wikipedia — Burn-Jeng Lin](https://en.wikipedia.org/wiki/Burn-Jeng_Lin) — Burn Jeng Lin naît au Vietnam en 1942, travaille sur les technologies d'exposition au centre de recherche Watson d'IBM dans les années 1970, rejoint TSMC en tant que directeur de R&D en 2000 ; remporte le prix SPIE Frits Zernike en 2008 ; surnommé « Père de la lithographie par immersion »

[^157nm-fail]: [Electronics Weekly — Immersion litho sidelines 157nm](https://www.electronicsweekly.com/news/research-news/process-rd/immersion-litho-sidelines-157nm-2005-05/) — La voie 157nm est écartée après 2002-2003 en raison de la biréfringence des lentilles en fluorure de calcium (CaF₂), de l'absorption forte des films à 157nm et des difficultés d'intégration des procédés ; remplacée par l'immersion 193nm ; pari Intel + Nikon manqué

[^immersion-litho]: [Wikipedia — Immersion lithography](https://en.wikipedia.org/wiki/Immersion_lithography) — Benjamin Lin présente la lithographie par immersion 193nm à SPIE en 2002 ; l'indice de réfraction de l'eau de 1,44 rend la résolution équivalente de 193nm d'environ 134nm ; ASML lance la production en série en 2007, couvrant de 65nm à 7nm, prolongeant la loi de Moore de six générations

[^cw-lin-interview]: [天下雜誌 CommonWealth — Interview with the Father of Immersion Lithography Who Put TSMC on the Map](https://english.cw.com.tw/article/article.action?id=3720) — Entretien avec Benjamin Lin le 2024-06-18 — contexte historique « Nikon n'osait pas faire l'immersion » ; Benjamin Lin retourne chez TSMC en 2000 pour promouvoir l'adoption de la lithographie par immersion, lien de sang technologique de 30 ans entre TSMC et ASML
