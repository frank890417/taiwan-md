/**
 * The four exhibition halls: English prose.
 *
 * 2026-11-19: retranslated from the revised zh-TW.ts (the Chinese was polished
 * paragraph by paragraph with 哲宇's approval; unsupported or outdated claims
 * were dropped). Facts, numbers and years must match the Chinese version.
 * Until a language has its own file in this folder, its hall pages and its
 * home page show this English version (see ../index.ts).
 *
 * Format: ../types.ts. One string per paragraph; [[…]] marks the topic pill,
 * which links to that paragraph's category. Whitespace around the pill is
 * literal: `[[Taiwan's history]]'s most…` renders with no space after the pill.
 */
import type { HallProse } from '../types';

const halls: HallProse[] = [
  {
    numeral: 'I',
    title: 'What this island looks like',
    paragraphs: [
      {
        category: 'geography',
        text: 'Taiwan covers only about 36,000 square kilometers, yet it climbs from sea level to 3,952 meters. Its highest peak, Yushan, is Tongku Saveq to the Bunun and Patungkuonʉ to the Tsou, the shining mountain. The Philippine Sea Plate pushes into the Eurasian Plate at about 8 cm a year, heaving up more than two hundred peaks above 3,000 meters. [[🗺️ The geography here]] is still growing taller. The Tropic of Cancer crosses Chiayi, and on the same day you can drive from a tropical beach in Kenting to frost on Hehuan Mountain.',
      },
      {
        category: 'nature',
        text: "Taiwan's species list has passed 60,000. In 1995 only a couple of hundred Formosan landlocked salmon were left; after dams were removed and the fish restored, recent counts have held above 15,000. The Forestry and Nature Conservation Agency put the Formosan black bear population at about 1,200 in early 2026. [[🌿 Taiwan's nature]] runs from coral reefs on the seabed up through vegetation zones from the tropical to the subarctic. At the headwaters of the Daan River stands a Taiwania 84.1 meters tall, and it escaped the great logging precisely because it grew where people could not reach.",
      },
      {
        category: 'lifestyle',
        text: 'More than 14,000 convenience stores, roughly one for every 1,700 people. Pay your utility bills, pick up a package, buy a high-speed rail ticket, photocopy your thesis, all at the same counter. [[🏠 Taiwanese life]] also keeps to fixed moments: at dusk, "Für Elise" drifts into the alley and the whole street comes out carrying neatly sorted trash. Step into a lane, and grandma will still ask, "Have you eaten yet?"',
      },
    ],
  },
  {
    numeral: 'II',
    title: 'How this island came to be',
    paragraphs: [
      {
        category: 'history',
        text: 'In 1624, the Dutch began building Fort Zeelandia at Tayouan, in today\'s Tainan. Over the next four centuries the Dutch, Spanish, Ming-Zheng, Qing, Japanese and Republic of China governments came and went, each bringing new languages and laws. [[📜 Taiwan\'s history]] can also be read with a different subject. In 1990, Tsao Yung-ho proposed "Taiwan Island History," shifting the gaze from the regimes that came and went to the people who stayed. In 1996, 10.88 million people walked into polling stations and directly elected their own president for the first time, nine years after martial law was lifted.',
      },
      {
        category: 'culture',
        text: "Taiwan has 17 legally recognized Indigenous peoples, the newest being the Siraya, recognized in 2026. Hoklo settlers brought Mazu, Hakka settlers brought the Yimin deities, mainlanders brought Shandong mantou to the military villages, and new immigrants and migrant workers from Southeast Asia brought Eid al-Fitr. [[🎭 Taiwan's culture]] is layered one over another, and nobody got melted down. The Dajia Mazu pilgrimage lasts nine days and eight nights, with turnout estimated at anywhere from hundreds of thousands to over a million; the Tsou Mayasvi war ritual is held in Alishan in spring.",
      },
      {
        category: 'society',
        text: "On May 17, 2019, the Legislative Yuan, following Judicial Yuan Interpretation No. 748, passed the same-sex marriage act on its third reading, making Taiwan the first place in Asia to legalize same-sex marriage. The previous November, 7.66 million people had just voted in a referendum to keep marriage in the Civil Code as between one man and one woman. A week later, on May 24, 526 couples went to household registration offices across the country, the first in Annan District, Tainan. [[⚖️ Taiwan's society]] moves forward through exactly this kind of tug-of-war: people finish arguing, then keep standing in line together for breakfast.",
      },
    ],
  },
  {
    numeral: 'III',
    title: 'What the people are doing',
    paragraphs: [
      {
        category: 'people',
        text: "Yen Chang-shou finished high school, joined American Express at 23 as an errand boy, and at 28 became its general manager for Taiwan. Jeremy Lin was cut by two teams within 15 days, came off the bench in February 2012, and averaged 24.4 points over the next seven games. Chen Shu-chu took over her mother's vegetable stall at 13 and gave the money from it, bit by bit, to schools, orphanages and hospitals. [[👥 Taiwan's people]] often start from a position that looks like a dead end, and at every turning point, things could easily have gone the other way.",
      },
      {
        category: 'art',
        text: "In a Taiwanese movie theater in 1930, the people on the screen could not speak, but the benshi beside the screen could. Taiwanese benshi narrators improvised in Taiwanese over silent films, telling the plot and the times alike; some, like Lu Bing-ding, slipped political commentary into their narration in Chiayi and were stopped by the police on the spot. [[🎨 Taiwan's art]] keeps returning to one question: whose language to use, and where to speak of oneself. After the war Chen Chien-wu was forced to put Japanese down; only in 1958 did he publish his first Chinese-language poem, under the pen name Huan Fu, and in 1964 he and friends founded the Li Poetry Society. In 2008 Cloud Gate Dance Theatre's rehearsal studio in Bali burned down; the following year it signed for a new site in Tamsui, and in 2015 a new home opened there.",
      },
      {
        category: 'music',
        text: "In 1933, Teng Yu-hsien's \"Longing for the Spring Breeze\" appeared, singing a young woman's heart in Taiwanese. In 1943, Takanori Kurosawa recorded the Bunun Pasibutbut at Kanding village in Taitung; in 1952 the recording was sent to the International Folk Music Council (IFMC), and only then did Western scholars take notice. [[🎵 Taiwan's sound]] runs from old tribal songs, the 898 songs banned under martial law, and campus folk songs, all the way to Mandopop and the Golden Melody Awards. Sangpuy singing in Puyuma, ABAO in Paiwan and Lee Chu-hsin in Taiwanese have each won Album of the Year, an award open to every language.",
      },
    ],
  },
  {
    numeral: 'IV',
    title: 'Where this island is going',
    paragraphs: [
      {
        category: 'technology',
        text: "About 90% of the world's most advanced chips are made in Taiwan. In the winter of 1979, bulldozers turned over rice paddies at Jinshanmian in Hsinchu, and the next year Hsinchu Science Park was established. [[💻 This tech island]] started from those paddies. Four decades on, the Hsinchu, Southern and Central Taiwan science parks together posted NT$5.80 trillion in revenue in 2025, and many of the chips in phones, laptops and cars come out of them. The price: TSMC alone uses about a tenth of the island's electricity, and the share is still rising.",
      },
      {
        category: 'economy',
        text: "In 1960, Taiwan's GDP per capita was just over US$150, lower than that of the Democratic Republic of the Congo; in 2021 it passed US$30,000 for the first time. Along the way there was no oil and no great-power hinterland. [[📈 Taiwan's economy]] over those sixty years rested on one small or medium-sized business after another, and those who carried it were mostly bosses, factory women and machinists whose names never made the news.",
      },
      {
        category: 'food',
        text: "A bowl of beef noodle soup holds a Sichuan red-braised base, the sweetness of Taiwanese soy sauce, and the homesickness of the veterans of 1949. Two tea houses, one in Taichung and one in Tainan, still each claim to be the first to drop tapioca pearls into milk tea, and now people on five continents are chewing those chewy pearls. [[🍜 Taiwan's flavor]] holds Hoklo oyster omelets, Hakka ginger-and-intestine, Indigenous millet wine and new immigrants' fish sauce. One folding table at a night market seats those who lived here first, and those who have come ashore over the past four centuries.",
      },
    ],
  },
];

export default halls;
