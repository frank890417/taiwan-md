/**
 * Les quatre salles : prose en français.
 *
 * Traduite le 2026-11-19 directement de la version chinoise (zh-TW.ts, texte
 * révisé avec l'accord de 哲宇). Format dans ../types.ts : [[…]] marque la
 * pastille thématique, qui renvoie à la catégorie du paragraphe.
 */
import type { HallProse } from '../types';

const halls: HallProse[] = [
  {
    numeral: 'I',
    title: 'À quoi ressemble cette île',
    paragraphs: [
      {
        category: 'geography',
        text: "Taïwan ne couvre qu'environ 36 000 kilomètres carrés, et pourtant elle s'élève du niveau de la mer jusqu'à 3 952 mètres. La plus haute montagne, le Yushan, les Bunun l'appellent Tongku Saveq, les Tsou Patungkuonʉ, « la montagne qui brille ». La plaque de la mer des Philippines pousse contre la plaque eurasienne d'environ 8 centimètres par an et a soulevé ici plus de deux cents sommets de plus de trois mille mètres. [[🗺️ La géographie d'ici]] continue de grandir. Le tropique du Cancer traverse Chiayi : le même jour, on peut aller en voiture des plages tropicales de Kenting jusqu'au givre et à la neige de Hehuanshan.",
      },
      {
        category: 'nature',
        text: "Le catalogue des espèces de Taïwan dépasse déjà les soixante mille. En 1995, il ne restait qu'un peu plus de deux cents saumons de Formose ; après la démolition de barrages et les opérations de repeuplement, leur nombre se maintient ces dernières années au-dessus de quinze mille. Quant à l'ours noir de Taïwan, l'Agence des forêts et de la conservation de la nature en estimait environ mille deux cents début 2026. [[🌿 La nature de Taïwan]] va des récifs coralliens du fond de la mer jusqu'à la végétation des hauteurs, en traversant toutes les ceintures, de la tropicale à la subalpine. Aux sources de la rivière Da'an se dresse encore un Taiwania de 84,1 mètres, qui a échappé à la grande période d'abattage justement parce qu'il pousse là où l'on n'arrive pas.",
      },
      {
        category: 'lifestyle',
        text: "Plus de 14 000 supérettes, soit environ une pour 1 700 habitants. On y paie ses factures d'eau et d'électricité, on y retire ses colis, on y achète son billet de train à grande vitesse et on y photocopie sa thèse, le tout au même comptoir. [[🏠 La vie des Taïwanais]] se règle aussi sur des moments fixes : au crépuscule, « Für Elise » retentit au coin de la ruelle et toute la rue sort avec ses déchets déjà triés. Et dans les ruelles, les grands-mères demandent toujours : « Tu as mangé ? »",
      },
    ],
  },
  {
    numeral: 'II',
    title: "Comment cette île est devenue ce qu'elle est",
    paragraphs: [
      {
        category: 'history',
        text: "En 1624, les Néerlandais commencent à bâtir le fort Zeelandia à Tayouan, à Tainan. Pendant les quatre siècles qui suivent, Néerlandais, Espagnols, royaume de Koxinga, dynastie Qing, Japon et République de Chine vont et viennent, chacun apportant de nouvelles langues et de nouvelles lois. [[📜 L'histoire de Taïwan]] peut aussi se lire en changeant de sujet. En 1990, Tsao Yung-ho propose l'« histoire de l'île de Taïwan », qui déplace le regard des pouvoirs qui passent vers ceux qui n'ont jamais cessé d'habiter ici. En 1996, 10,88 millions de personnes entrent dans les bureaux de vote pour élire pour la première fois directement leur président, neuf ans après la levée de la loi martiale.",
      },
      {
        category: 'culture',
        text: "Taïwan compte 17 peuples autochtones reconnus par la loi, et le plus récent est celui des Siraya, reconnu en 2026. Les Hoklo ont apporté Mazu, les Hakka le Yimin Ye, les gens venus du continent le mantou du Shandong dans les villages de militaires, et les nouveaux résidents et travailleurs migrants d'Asie du Sud-Est l'Aïd el-Fitr. [[🎭 La culture de Taïwan]] se superpose couche après couche, sans que personne ait été fondu dans l'autre. Le pèlerinage de Mazu à Dajia dure neuf jours et huit nuits, et réunit de plusieurs centaines de milliers à plus d'un million de participants ; le rituel guerrier des Tsou a lui aussi lieu au printemps, à Alishan.",
      },
      {
        category: 'society',
        text: "Le 17 mai 2019, en application de l'interprétation n° 748 de la Cour constitutionnelle, le Yuan législatif adopte en troisième lecture la loi spéciale sur le mariage pour tous, et Taïwan devient le premier pays d'Asie à légaliser le mariage entre personnes de même sexe. Lors du référendum de novembre de l'année précédente, 7,66 millions de personnes venaient de voter pour que le mariage du Code civil reste réservé à un homme et une femme. Une semaine plus tard, le 24 mai, 526 couples se présentent dans les bureaux d'état civil du pays ; le premier à Annan, à Tainan. [[⚖️ La société taïwanaise]] avance ainsi, dans le tiraillement, et la dispute terminée, on refait la queue ensemble pour acheter le petit-déjeuner.",
      },
    ],
  },
  {
    numeral: 'III',
    title: 'Ce que font les gens de cette île',
    paragraphs: [
      {
        category: 'people',
        text: "Yen Chang-shou sort du lycée, entre à American Express à 23 ans comme garçon de courses et, à 28 ans, il est directeur général pour Taïwan. Jeremy Lin est remercié par deux équipes en 15 jours ; en février 2012, il entre en jeu comme remplaçant et, sur les sept matchs suivants, tourne à 24,4 points de moyenne. Chen Shu-chu reprend à 13 ans l'étal de légumes de sa mère et fait don, petit à petit, de l'argent des légumes à des écoles, des orphelinats et des hôpitaux. [[👥 Les gens de Taïwan]] partent souvent d'un endroit qui semblait ne mener nulle part, et chaque tournant, sur le moment, aurait pu ne pas avoir lieu.",
      },
      {
        category: 'art',
        text: "Dans les cinémas de Taïwan en 1930, les personnages de l'écran ne parlent pas, mais à côté de l'écran, le benshi, lui, parle. Les benshi taïwanais improvisaient en taïwanais la voix des films muets, racontant l'intrigue comme l'actualité ; certains, comme Lu Bing-ding à Chiayi, glissaient en plein récit des commentaires politiques et se faisaient interrompre sur place par la police. [[🎨 L'art de Taïwan]] revient sans cesse à la même question : dans quelle langue, et depuis quel lieu, parler de soi. Après la guerre, Chen Chien-wu doit renoncer au japonais ; en 1958 il publie son premier poème en chinois sous le pseudonyme de Huan Fu, et en 1964 il fonde avec des amis la Société de poésie Li. En 2008, le centre de répétition de Cloud Gate Dance Theatre à Bali brûle ; l'année suivante, la compagnie signe pour un nouveau terrain à Tamsui, où elle inaugure son nouveau foyer en 2015.",
      },
      {
        category: 'music',
        text: "En 1933 paraît « Aspirant au vent du printemps » de Teng Yu-hsien, qui chante en taïwanais les rêveries d'une jeune fille. En 1943, Kurosawa Takatomo enregistre le Pasibutbut des Bunun dans le village de Kanding, à Taitung ; en 1952, l'enregistrement est envoyé au Conseil international de la musique folklorique, et c'est alors seulement que le monde universitaire occidental le remarque. [[🎵 Le son de Taïwan]] va des chants anciens des villages, des 898 chansons interdites sous la loi martiale et des chansons folk des campus jusqu'à la pop en mandarin et aux Golden Melody Awards. Sangpuy en puyuma, Abao en paiwan et Li Zhuxin en taïwanais ont tour à tour remporté l'album de l'année, une catégorie qui ne distingue pas les langues.",
      },
    ],
  },
  {
    numeral: 'IV',
    title: 'Où va cette île',
    paragraphs: [
      {
        category: 'technology',
        text: "Environ quatre-vingt-dix pour cent des puces les plus avancées du monde sont fabriquées à Taïwan. À l'hiver 1979, les bulldozers retournent les rizières de Jinshanmian, à Hsinchu, et l'année suivante le parc scientifique de Hsinchu est fondé. [[💻 Cette île technologique]] est partie de ces rizières ; plus de quarante ans plus tard, les parcs de Hsinchu, du Sud et du Centre ont réalisé en 2025 un chiffre d'affaires cumulé de 5,80 billions de nouveaux dollars taïwanais, et bien des puces des téléphones, des ordinateurs portables et des voitures en sortent. Le prix à payer : TSMC seule consomme environ un dixième de l'électricité du pays, et ce chiffre continue de monter.",
      },
      {
        category: 'economy',
        text: "En 1960, le PIB par habitant de Taïwan n'était que d'environ 150 dollars américains, moins que celui de la République démocratique du Congo ; en 2021, il a dépassé pour la première fois les 30 000. Entre-temps, il n'y a eu ni pétrole ni arrière-pays de grande puissance. [[📈 L'économie de Taïwan]] a tenu pendant ces soixante ans grâce à une petite entreprise après l'autre, et ceux qui ont porté ce chemin sont pour la plupart des patrons dont le nom n'est jamais passé aux informations, des ouvrières d'usine et des maîtres mécaniciens.",
      },
      {
        category: 'food',
        text: "Dans un bol de nouilles au bœuf, il y a un bouillon braisé du Sichuan, la douceur de la sauce soja taïwanaise et la nostalgie des vétérans de 1949. Deux maisons de thé, l'une à Taichung et l'autre à Tainan, soutiennent encore chacune avoir été la première à mettre des perles de tapioca dans le thé au lait, et aujourd'hui, sur les cinq continents, on mâche ces perles élastiques. [[🍜 La saveur de Taïwan]] comprend l'omelette aux huîtres des Hoklo, les intestins au gingembre des Hakka, le vin de millet des peuples autochtones et la sauce de poisson des nouveaux résidents. À une table pliante de marché de nuit, il y a de la place pour ceux qui vivaient ici avant, et aussi pour ceux qui ont débarqué au fil de quatre siècles.",
      },
    ],
  },
];

export default halls;
