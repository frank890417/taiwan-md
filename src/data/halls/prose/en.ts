/**
 * The four exhibition halls: English prose (final copy).
 *
 * ⚠️ Do not edit a word. Moved verbatim from HomeEnHalls.astro on 2026-11-19.
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
        text: "Just 36,000 square kilometers, yet the Philippine Sea Plate pushes into the Eurasian Plate at 8 cm a year, making Taiwan one of the most mountainous islands on Earth. [[🗺️ The geography here]] isn't a postcard — it's an island still growing taller. The Tropic of Cancer crosses Chiayi; on the same day you can drive from Kenting's tropical beach to Hehuan Mountain's frost.",
      },
      {
        category: 'nature',
        text: "On an island smaller than the Netherlands, over 60,000 species crowd together — 2.5% of global biodiversity. The Formosan landlocked salmon has survived 15,000 years in Dajia Creek; the Forestry and Nature Conservation Agency estimates about 1,200 Formosan black bears remain (early 2026). [[🌿 Taiwan's nature]] vertically compresses every ecosystem from the equator to the subarctic — coral reefs to cloud forests in 3,000 meters. A paradise for ecologists, a frontline for development pressure.",
      },
      {
        category: 'lifestyle',
        text: 'Over 14,000 convenience stores — roughly one for every 1,700 people. Pay bills, pick up packages, buy train tickets, photocopy your thesis, all at the same counter. [[🏠 Taiwanese life]] is wrapped in hyper-compressed infrastructure — but step into an alley after work, and grandma will still ask, "Have you eaten yet?"',
      },
    ],
  },
  {
    numeral: 'II',
    title: 'How this island came to be',
    paragraphs: [
      {
        category: 'history',
        text: "In 1624, the Dutch built Fort Zeelandia in Tainan. Eight regimes followed in four centuries — one every fifty years on average — each bringing new languages, laws, and time zones. [[📜 Taiwan's history]]'s most astonishing chapter came in 1996: 10.88 million people walked into polling stations and cast the first direct presidential vote in Chinese-speaking history. No bloodshed, no coup. An island under authoritarian rule for 38 years quietly turned itself into a democracy.",
      },
      {
        category: 'culture',
        text: "Seventeen indigenous peoples have lived here for 6,000 years. Hoklo brought Mazu, Hakka brought Yimin Ye, mainlanders brought Shandong mantou from military villages, Southeast Asian immigrants brought Eid al-Fitr. [[🎭 Taiwan's culture]] is not a melting pot — nobody got melted. The Dajia Mazu pilgrimage draws a million walkers over nine days; the Tsou Mayasvi war ritual is held in Alishan in spring. Both are Taiwan, and they don't contradict.",
      },
      {
        category: 'society',
        text: "On May 17, 2019, the legislature voted to legalize same-sex marriage — making Taiwan the first in Asia. Six months earlier, 7.65 million people had just voted against it in a referendum. [[⚖️ Taiwan's society]]'s most fascinating quality is right here: the referendum said no, the legislature said yes, and society kept functioning. People finished arguing, then stood in line together for breakfast.",
      },
    ],
  },
  {
    numeral: 'III',
    title: 'What the people are doing',
    paragraphs: [
      {
        category: 'people',
        text: "Yan Chang-shou delivered mail at American Express at 23, became general manager five years later. Jeremy Lin sat on the bench for two years, then rewrote the NBA's Asian narrative in one week. Chen Shu-chu sold vegetables at Taitung market for 48 years and donated over NT$10 million. [[👥 Taiwan's people]] didn't walk out of textbooks — their stories are worth reading because every turning point could have not happened.",
      },
      {
        category: 'art',
        text: "In 2009, Cai Guo-Qiang detonated nine gunpowder explosions at Taipei Fine Arts Museum. The year before, fire had gutted their Bali studio; this year Lin Hwai-min's Cloud Gate Dance Theatre rose from the ashes. [[🎨 Taiwan's art]] runs from temple Eight Generals face paint to the Venice Biennale, from Jiaozhi pottery to digital installations. The question Taiwan's creators ask most often isn't \"what is beauty\" — it's \"who are we.\"",
      },
      {
        category: 'music',
        text: "In 1933, Deng Yu-xian's \"Longing for Spring Wind\" appeared — ninety years later it's still a KTV regular. The Bunun's pasibutbut (eight-part polyphony) caught UNESCO's attention because Western music theory can't explain it. [[🎵 Taiwan's sound]] runs from tribal chants to Mayday filling an arena with 100,000 voices. Music on this island isn't just entertainment — it's how each generation recognizes itself.",
      },
    ],
  },
  {
    numeral: 'IV',
    title: 'Where this island is going',
    paragraphs: [
      {
        category: 'technology',
        text: "90% of the world's advanced chips are made in Taiwan. A single TSMC fab costs US$20 billion; its cleanrooms are 10,000 times cleaner than operating theaters. [[💻 This tech island]] started from tin-roof workshops in the 1980s Hsinchu Science Park and became, forty years later, a supply-chain node that no phone, laptop, or car on Earth can bypass. The trade-off: TSMC alone uses about a tenth of Taiwan's electricity — and rising.",
      },
      {
        category: 'economy',
        text: "In 1960, Taiwan's GDP per capita was US$154 — lower than the Democratic Republic of the Congo's. Sixty-odd years later it exceeds US$33,000, without oil, colonial dividends, or continental hinterland. [[📈 Taiwan's economy]] is the story of a resource-poor island turning itself into a global supply-chain hub. The method was singular: work harder and pivot faster than everyone else.",
      },
      {
        category: 'food',
        text: "A bowl of beef noodle soup: Sichuan red-braised base, Taiwanese soy sweetness, and a 1949 veteran's homesickness. Bubble tea left a Taichung tea house and landed on five continents. [[🍜 Taiwan's flavor]] is its immigration history — Hoklo oyster omelets, Hakka ginger intestines, indigenous millet wine, new immigrant fish sauce. Four centuries of homesickness, all simmering in the same night market.",
      },
    ],
  },
];

export default halls;
