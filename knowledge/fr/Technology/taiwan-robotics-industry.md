---
title: "L'industrie robotique à Taïwan"
description: "L'île qui domine la fabrication de semi-conducteurs doit-elle rattraper son retard à l'ère des robots ? Du lancement du NCAIR en 2026, un regard sur les miracles et les angles morts de la mécanique de précision taïwanaise."
date: 2026-04-11
category: 'Technology'
tags:
  [
    'robotique',
    'mécanique de précision',
    'semi-conducteurs',
    'IA',
    'transformation industrielle',
    'HIWIN',
    'NCAIR',
    '2026',
  ]
subcategory: '科技產業'
author: 'Taiwan.md'
difficulty: 'intermediate'
readingTime: 13
featured: true
lastVerified: 2026-04-11
lastHumanReview: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣機器人產業.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:4702dd502f640592'
sourceBodyHash: 'sha256:2025d0771f75493c'
translatedAt: '2026-11-18T12:53:15.946674+00:00'
---

# L'industrie robotique à Taïwan

## Un après-midi à Shalun

Le 10 avril 2026, dans la ville verte et intelligente de Shalun à Tainan, le président Lai Ching-te a personnellement inauguré une nouvelle institution gouvernementale : le **Centre national d'IA et de robotique**, connu sous l'acronyme NCAIR.[^1] Placé sous l'égide de l'Institut national de la recherche appliquée (NIAR), sa mission se veut claire : rechercher, tester et entraîner des robots.

Ce jour-là, dans son discours, Lai a cité un chiffre précis : de 2026 à 2029, le gouvernement investira **20 milliards de dollars taïwanais** dans l'industrie robotique.[^2] L'objectif est de faire émerger au moins trois nouvelles entreprises dans ce secteur. Quatre domaines d'application ont été identifiés en priorité : les métiers à risques élevés, la santé et les soins médicaux, la restauration et les services, et — comme l'a tout particulièrement souligné le directeur du NCAIR, Su Wen-yu — les **robots d'assistance à domicile pour les personnes âgées**.[^3]

Tout cela semble parfaitement logique. Taïwan vieillit, la main-d'œuvre pour les soins à domicile se raréfie, et les robots pourraient théoriquement combler ce manque. Le gouvernement alloue un budget, crée un centre, fixe des objectifs, et invite le président à couper le ruban — un schéma classique de politique industrielle.

Mais la vraie question n'est pas « Taïwan va-t-il faire des robots ? », c'est : **pourquoi Taïwan attend-il 2026 pour s'y mettre sérieusement ?**

Taïwan est le meilleur fabricant de puces du monde. Les lignes de production les plus avancées — 5 nm, 3 nm, 2 nm — sont toutes sur cette île. Les puces de capteurs, de calcul et de contrôle moteur dont les robots ont besoin, Taïwan sait tout faire, et mieux que quiconque.

Et pourtant, dans les articulations des robots humanoïdes les plus performants du monde, 80 % des réducteurs harmoniques viennent du japonais Harmonic Drive Systems.[^4]

> 📝 **En 30 secondes** : Le 10 avril 2026, Lai Ching-te inaugure à Shalun (Tainan) le Centre national d'IA et de robotique (NCAIR), marquant le tournant où le gouvernement taïwanais fait officiellement de la robotique une stratégie industrielle nationale. Avec 20 milliards NT$ investis de 2026 à 2029, l'objectif est de faire naître trois entreprises robotiques et de se concentrer sur les soins à domicile et les métiers à risques. En toile de fond : Taïwan possède une chaîne d'approvisionnement de classe mondiale en semi-conducteurs et en mécanique de précision (HIWIN, Apex Dynamics, Hiwin, Hiwin, Topcrown, Motech…), mais le marché des composants clés pour robots humanoïdes (réducteurs harmoniques, réducteurs planétaires) est depuis longtemps dominé par les Japonais. Le NCAIR n'est pas un départ — c'est un rattrapage. Une île qui s'est bâtie sur la sous-traitance doit réapprendre à marcher à l'étape suivante : l'intégration système.

## Une entreprise, une phrase : « Ce qu'on ne peut pas acheter, on le fabrique »

Pour comprendre la situation de l'industrie robotique taïwanaise, le plus rapide est de partir d'une entreprise : **HIWIN Technologies**.

Le siège de HIWIN est à Taichung. La spécialité de l'entreprise, c'est « ce qui bouge » : rails de guidage linéaire, vis à billes, réducteurs, systèmes de contrôle. Ces composants paraissent anodins, mais toute machine industrielle en mouvement en a besoin. Chaque machine-outil CNC, chaque bras robotique dans une usine de semi-conducteurs, chaque drone équipé d'un système de transmission — presque tous contiennent des pièces HIWIN.

Sa position sur le marché : **deuxième fabricant mondial de rails linéaires, numéro un sur le marché des transmissions en Italie**. Dans le classement 2025 de Morgan Stanley des « 100 entreprises mondiales de robots humanoïdes », quatre sociétés taïwanaises figuraient sur la liste — TSMC, Foxconn, Topcrown et HIWIN.[^5] Puces, assemblage, composants, transmission — quatre représentants, chacun sur un segment.

Le président de HIWIN, **Cho Wen-heng**, a rejoint l'entreprise en 1995 et en a pris la tête en 2019. Il a prononcé une phrase qui est devenue la philosophie centrale de l'entreprise :

> **« Ce qu'on ne peut pas acheter, on le fabrique. »**[^6]

Cela sonne comme un slogan inspirant, mais il y a derrière une frustration très concrète : HIWIN voulait produire des bras robotiques industriels à six axes, et la pièce la plus critique est le réducteur harmonique — un mécanisme de précision qui transforme la haute vitesse et le faible couple d'un moteur en la basse vitesse et le couple élevé dont un bras robot a besoin. Le principal fournisseur mondial est le japonais Harmonic Drive Systems (HDS), qui détient 80 % de part de marché dans les applications de robotique industrielle.[^7]

HDS ne joue pas les méchants — il fait simplement un travail que personne d'autre ne peut égaler. L'engrenage souple (flex spline) à l'intérieur d'un réducteur harmonique doit supporter des centaines de millions de cycles de torsion sans se briser — cela représente des décennies d'accumulation en science des matériaux, traitement thermique et usinage de précision. HIWIN pouvait acheter les produits HDS pour assembler ses propres robots, mais HDS ne lui fournirait jamais les dernières spécifications, et dicterait ses propres tarifs.

HIWIN a donc choisi de fabriquer lui-même. Ils ont développé une gamme baptisée **DATORKER** (« DT »), et après de nombreux essais et erreurs, ont produit un réducteur harmonique fonctionnel. Pas le meilleur du monde, mais suffisant pour équiper leurs propres bras à six axes.[^8]

Un détail important : le taux d'intégration verticale de HIWIN est de **95 %**.[^9] Autrement dit, ils fabriquent leurs propres équipements, polissent leurs propres billes, produisent leurs propres matières premières, testent et assemblent eux-mêmes. Cette intégration verticale n'est pas une question d'économies — elle coûte en réalité plus cher que l'externalisation — mais parce que **dans la mécanique de précision, chaque maillon de la chaîne d'approvisionnement peut devenir un goulot d'étranglement**. Externaliser une étape de fabrication, c'est soumettre les améliorations de la prochaine génération au calendrier du sous-traitant.

HIWIN a échangé l'intégration verticale et la R&D autonome contre la liberté de ne pas être à la merci des fournisseurs japonais. Mais le prix de cette liberté est élevé : **l'entreprise a dû reconstruire elle-même chaque couche de la chaîne industrielle**.

C'est le portrait miniature de l'industrie robotique taïwanaise : **pas un manque de compétences, mais un manque d'écosystème**.

## Pourquoi un géant des semi-conducteurs doit rattraper son retard en robotique

À regarder uniquement les composants, l'amont de l'industrie robotique taïwanaise n'est pas faible :

- **Composants de transmission** : HIWIN (rails/vis/réducteurs), Apex Dynamics (réducteurs planétaires), Topcrown (rails linéaires)
- **Contrôle moteur** : Delta Electronics, Teco Electric, Shihlin Electric
- **Puces et capteurs** : TSMC (fonderie de puces IA), Foxconn (assemblage), Novatek (traitement d'image), PixArt (capteurs 3D)
- **Fonderie de précision** : Topcrown (pièces de réducteurs, fournisseur de Tesla Optimus)
- **Intégration système** : Motech, Delta Electronics (robots industriels)

Mais si vous demandiez à un ingénieur étranger « quel est le robot humanoïde le plus attendu de 2026 ? », il dirait Tesla Optimus, Figure AI, Boston Dynamics, ou les chinois Unitree. Il ne citerait aucune marque taïwanaise.

C'est le **paradoxe** central de l'industrie robotique taïwanaise : **les composants sont forts, les produits finis sont faibles**.

Pourquoi ? Parce que la logique économique de Taïwan depuis un demi-siècle est d'occuper la position médiane à supérieure de la chaîne d'approvisionnement mondiale. « Donnez-moi les spécifications, je fabrique » — c'est ce que Taïwan fait mieux que quiconque. TSMC a poussé cette logique à l'extrême : le client dit à TSMC quelle puce produire, TSMC s'en charge, sans concevoir ses propres CPU, GPU ou marques grand public.

Cette logique fonctionne pour les semi-conducteurs, la sous-traitance PC, l'assemblage de smartphones, les écrans, les serveurs. **Mais la robotique n'obéit pas à cette logique.**

La robotique est un secteur où **le produit fini = le contexte d'application**. On ne peut pas gagner sur le marché des robots humanoïdes en faisant simplement « un bon réducteur ». Il faut définir les scénarios d'usage (aide à domicile pour les seniors ? opérations en usine ? service en restaurant ?), les besoins en mouvements (monter des escaliers ? porter une personne âgée ? apporter un café ?), la logique d'interface (voix ? geste ? tactile ?), puis remonter depuis ces besoins : quels capteurs, quels algorithmes de contrôle, quelle structure mécanique, quelle gestion de batterie.

C'est ce qu'on appelle « l'aval qui définit l'amont ». L'expérience de sous-traitance de Taïwan ne connaît pas bien cette logique — Taïwan est habitué à une chaîne d'approvisionnement tirée par les commandes clients. Inverser ce fonctionnement demande de reconstruire toute l'organisation industrielle, la formation des talents, et les systèmes de récompense.

C'est pourquoi le NCAIR existe. Ce n'est pas un centre de R&D, c'est un **centre de reconstruction industrielle**. Les 20 milliards de NT$ du gouvernement ne servent pas seulement à acheter des équipements, construire des laboratoires et recruter des chercheurs — ils achètent du temps, le droit à l'erreur, et un espace pour que les ingénieurs taïwanais commencent à penser « à quoi doit servir ce robot » plutôt que « comment fabriquer parfaitement ce composant ».

## De l'industrie à la maison : la prochaine bataille robotique

Des quatre domaines d'application identifiés par le NCAIR, le directeur Su Wen-yu en a tout particulièrement mis un en avant : les **robots d'assistance à domicile pour les personnes âgées**.

Ce choix n'est pas fortuit. En 2025, les personnes de 65 ans et plus représentent déjà plus de 20 % de la population taïwanaise — seuil de la « super société vieillissante ». Ce chiffre continue de se dégrader. Parallèlement, la pénurie structurelle d'aides-soignants étrangers, le vieillissement des prestataires locaux de soins, et les pressions financières du plan Long-term Care 2.0 — tout pointe vers la même conclusion : **d'ici vingt ans, Taïwan aura besoin de quelque chose pour compenser le manque de main-d'œuvre**.

Si un robot d'assistance à domicile peut aider une personne âgée à se retourner dans son lit, changer une protection, avoir une conversation, rappeler de prendre des médicaments, mesurer la tension artérielle et alerter en cas de chute, il résout 60 à 70 % de ce qu'un aide-soignant fait. Les 30 % restants nécessitent le jugement humain et la connexion affective — ce que les robots ne peuvent pas reproduire à court terme. Mais résoudre 60-70 % suffit à alléger suffisamment la charge des familles et des soignants pour que la vie reste supportable.

Ce calcul semble simple, mais trois problèmes structurels surgissent à l'exécution :

**Premier problème : le matériel reste trop cher.** Un robot humanoïde ou semi-humanoïde de soins correct coûte en 2026 entre 30 000 et 100 000 dollars américains (soit environ 900 000 à 3 millions de NT$). Ce sont les prix de la première génération en faible volume — même avec une production industrielle à 100 000 unités par an, le prix unitaire ne tomberait probablement pas sous 100 000 NT$. À titre de comparaison, un aide-soignant étranger coûte environ 20 000 NT$ par mois, soit 2,4 millions sur dix ans. L'« avantage économique » des robots n'est pas encore établi.

**Deuxième problème : le logiciel manque d'intelligence.** Les LLM d'aujourd'hui peuvent converser et reconnaître des images, mais intégrer ces capacités dans des actions physiques — faire comprendre à un robot « ce que la personne âgée veut maintenant », « si ce geste pourrait lui faire mal », « comment réagir si quelqu'un est de mauvaise humeur aujourd'hui » — en est encore aux premières phases de recherche. L'IA physique (Physical AI) et les modèles de langage purs représentent deux générations d'écart.

**Troisième problème : les environnements ne sont pas suffisamment maîtrisés.** Un foyer est chaotique. Un verre d'eau peut se renverser n'importe quand, des chaussons traînent par terre, un enfant voudra jouer avec le robot, une personne âgée pourrait lui raconter des histoires de l'époque coloniale japonaise. Les robots en usine évoluent dans un environnement prévisible ; les foyers, non. Passer du « robot industriel » au « robot domestique » ne se résume pas à ajuster des paramètres — c'est un saut qualitatif, d'un environnement structuré à un environnement non structuré.

Le choix du NCAIR de commencer par l'assistance à domicile pour les personnes âgées est à la fois pragmatique et risqué. Pragmatique, parce que la démographie taïwanaise en a réellement besoin. Risqué, parce qu'il s'agit du défi le plus difficile de l'industrie robotique mondiale — et même le Japon, l'Allemagne et les États-Unis n'ont pas encore de vrai gagnant dans ce domaine.

## Conclusion : Vingt ans pour rattraper une leçon

En 2030, l'objectif du « Plan de promotion de l'industrie des robots intelligents IA » du Yuan exécutif est de faire dépasser à la production nationale **1 000 milliards de dollars taïwanais**.[^10]

Ce chiffre est ambitieux. Partir du point de départ de 2026 pour atteindre 1 000 milliards en 2030 implique une croissance annuelle de plus de **40 %**. En comparaison, Morgan Stanley prévoit un chiffre d'affaires annuel du marché mondial des robots humanoïdes proche de **5 000 milliards de dollars** d'ici 2050, avec un parc cumulé dépassant **1 milliard d'unités** ; Goldman Sachs, quant à elle, anticipe une taille de marché de **30 à 38 milliards de dollars** pour 2035. Pour Taïwan, décrocher 1 000 milliards de dollars taïwanais sur ce créneau n'est pas impossible, mais cela ne se fera pas tout seul.

Le véritable défi ne réside pas dans le volume total, mais dans la structure.

**Si les 1 000 milliards de l'industrie taïwanaise de la robotique en 2030 proviennent :**

- **De la vente de composants à des marques étrangères** → c'est la prolongation de l'ancienne voie ; Taïwan ne fait que transposer le modèle de sous-traitance des semi-conducteurs à la sous-traitance de composants robotiques
- **De la vente de machines complètes aux marchés étrangers** → c'est la réussite de la nouvelle voie ; Taïwan dispose de ses propres marques et de capacités d'intégration de systèmes
- **De l'approvisionnement principal de la demande intérieure (médical, soins de longue durée, usines)** → c'est la réussite de la substitution aux importations ; Taïwan transforme sa dépendance externe en autonomie interne

Ces trois voies ont des implications politiques radicalement différentes. La première est la plus facile mais offre le plafond le plus bas ; la deuxième est la plus difficile mais promet le rendement potentiel le plus élevé ; la troisième est la plus pragmatique mais ne permet pas d'exporter.

Les 20 milliards du NCAIR et la vision d'« île technologique » de Lai Ching-te reposent sur un pari : **Taïwan parviendra-t-il, dans les vingt prochaines années, à passer du « milieu et de l'amont de la chaîne d'approvisionnement » au statut d'« intégrateur de systèmes » ?**

Cette montée en gamme n'est pas un problème technique, c'est un problème d'organisation, de culture, d'éducation, d'allocation du capital. Ce que Taïwan sait le mieux faire, c'est « mener une chose à la perfection » ; ce qu'il maîtrise le moins, c'est « décider quelle chose entreprendre ». L'industrie de la robotique exige précisément ce second savoir-faire.

Y aura-t-il 1 000 milliards en 2030 ? Peut-être. Mais la question plus importante est : dans ces 1 000 milliards, quelle part viendra de « nous avons enfin décidé ce que nous voulons faire », et quelle part viendra de « nous avons mieux exécuté les commandes d'un autre pays » ?

La différence entre ces deux réponses constitue le véritable bulletin de notes de l'industrie taïwanaise de la robotique.

---

**Lectures complémentaires** :

- [Industrie de l'intelligence artificielle](/fr/technology/artificial-intelligence-industry) — Vue d'ensemble des cinq piliers de l'IA à Taïwan ; la robotique est l'incarnation physique de l'IA, mais « l'intelligence » et « le corps » y restent deux lignes parallèles dans l'industrie
- [Industrie des semi-conducteurs à Taïwan](/fr/technology/taiwan-semiconductor-industry) — La base de toutes les puces pour la robotique, et pourquoi « puces fortes ≠ robotique forte » dans la logique industrielle
- [Industrie taïwanaise des drones](/fr/technology/taiwan-drone-industry) — Un autre cas « composants forts, machines complètes faibles », à mettre en parallèle avec la robotique
- [Crise de la natalité à Taïwan](/fr/society/taiwan-low-birth-rate-crisis) — Pourquoi le NCAIR place les « soins familiaux de longue durée » en priorité ? La réponse est dans la structure démographique
- [Transformation et montée en gamme de l'industrie taïwanaise](/fr/economy/industrial-transformation-from-manufacturing-to-innovation) — De la sous-traitance à la marque, des composants à l'intégration système, le défi structurel débattu depuis vingt ans
- [Industrie taïwanaise des machines-outils](/fr/economy/taiwan-machine-tool-industry) — Les 1 500 fabricants de machines de précision de la vallée dorée de Dadu Mountain, racine amont du matériel robotique
- [Computex : deux des trois grands salons informatiques internationaux ont fermé, il ne reste que celui de Taipei](/fr/technology/computex) — Computex 2026 mise sur l'« IA physique » et l'intelligence incarnée, vitrine annuelle où la chaîne d'approvisionnement taïwanaise passe de l'assemblage de serveurs IA à l'assemblage de robots

## Références

[^1]: [Lai inaugurates National Center for AI Robotics in Tainan - Taipei Times](https://www.taipeitimes.com/News/taiwan/archives/2026/04/11/2003855415) — Taipei Times英文報導，記錄 2026 年 4 月 10 日賴清德總統親赴台南沙崙智慧綠能科學城揭幕國家 AI 機器人中心（NCAIR）的完整過程、場地資訊與官方角色說明。

[^2]: [President Lai inaugurates National Center for AI Robotics in Tainan - Focus Taiwan](https://focustaiwan.tw/sci-tech/202604100020) — 中央社英文版 Focus Taiwan 記錄賴清德在揭幕式上宣布的具體投資數字（2026-2029 年 NT$200 億，約 US$6.29 億）與「技術島嶼」願景引言。

[^3]: [Lai inaugurates National Center for AI Robotics in Tainan - Taipei Times](https://www.taipeitimes.com/News/taiwan/archives/2026/04/11/2003855415) — Taipei Times 引述 NCAIR 主任蘇文鈺（Su Wen-yu）對中心優先方向的定義，強調家庭長照機器人是 NCAIR 的主要研究焦點，以及四大應用領域的具體規劃。

[^4]: [減速機扮人形機器人要角 全球大廠卡位台廠拚商機 - 工商時報](https://www.ctee.com.tw/news/20241130700314-430502) — 工商時報產業深度報導，整理全球諧波減速機市場的供應格局，記錄日本 Harmonic Drive Systems（HDS）在工業機器人應用達 80% 市占率的事實，以及其技術壁壘的來源。

[^5]: [入選全球「人形機器人百強」！上銀科技的致勝心法 - 經理人月刊](https://www.managertoday.com.tw/articles/view/71579) — 經理人月刊 2025 年對上銀科技的完整企業側寫，含摩根士丹利「Humanoid 100」名單中台灣入選四家企業（台積電、鴻海、和大工業、上銀）的背景資料。

[^6]: [入選全球「人形機器人百強」！上銀科技的致勝心法 - 經理人月刊](https://www.managertoday.com.tw/articles/view/71579) — 經理人月刊收錄上銀董事長卓文恒（Cho Wen-heng）的經營哲學原話「買不到的技術，就自己造」，以及他 1995 年進入公司、2019 年接任董事長的完整背景。

[^7]: [減速機扮人形機器人要角 全球大廠卡位台廠拚商機 - 工商時報](https://www.ctee.com.tw/news/20241130700314-430502) — 工商時報記錄全球諧波減速機市場結構：Harmonic Drive Systems 及其關聯企業占全球約 70% 市占率，在工業機器人應用上達 80%；而行星減速機則由日本與德國廠商主導。

[^8]: [AI 機器人｜全球滾珠螺桿巨頭 上銀有望掌握人形機器人商機嗎 - 優分析](https://uanalyze.com.tw/articles/9860012116) — 優分析深度財經評論，記錄上銀 DATORKER（DT）系列諧波減速機的開發背景，以及上銀「自研打破日本壟斷」的策略選擇。

[^9]: [入選全球「人形機器人百強」！上銀科技的致勝心法 - 經理人月刊](https://www.managertoday.com.tw/articles/view/71579) — 經理人月刊揭露上銀的 95% 垂直整合率，以及透過自製設備達成 3-4 倍生產效率提升的營運數字，解釋其為何選擇自主研發而非外包。

[^10]: [「AI 機器人大聯盟」啟動！2030 年拚兆元出口，台灣精密機械業轉型劇本改寫中？ - 遠見雜誌](https://www.gvm.com.tw/article/123262) — 遠見雜誌報導行政院 2025 年啟動的「AI 智慧機器人產業推動方案」，記錄 2030 年產值目標一兆元的政策目標與精密機械業的轉型方向。
