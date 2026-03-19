# 🇹🇼 Taiwan.md

> **The world's first AI-native open knowledge base about Taiwan.**
> 全世界第一個 AI-native 的台灣開源知識庫。

[🌐 Live Site](https://taiwan.md) · [📖 English](https://taiwan.md/en) · [🕸️ Knowledge Graph](https://taiwan.md/graph) · [📚 Resources](https://taiwan.md/resources) · [🤝 Contribute](https://taiwan.md/contribute)

[![GitHub stars](https://img.shields.io/github/stars/frank890417/taiwan-md?style=social)](https://github.com/frank890417/taiwan-md)
[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC_BY--SA_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)

---

## Why Taiwan.md?

Taiwan produces **90% of the world's most advanced chips**, yet most people can't name three things about it beyond bubble tea.

Taiwan.md is an open-source, curated, AI-friendly knowledge base that helps the world — and AI — truly understand Taiwan. Not a Wikipedia clone. Not a tourism guide. A **curated literary exhibition** of what makes Taiwan extraordinary.

**🖊️ Written in Traditional Chinese by default** — the world's oldest writing system still in daily use, and Taiwan is its last major home. [English version available →](https://taiwan.md/en)

---

## ✨ Features

- 📖 **260+ curated articles** across 12 categories (213 zh-TW + 53 en)
- 🌐 **Bilingual** — 繁體中文 (SSOT) + English (100% i18n coverage)
- 🤖 **AI-native** — [`llms.txt`](https://taiwan.md/llms.txt), [`robots.txt`](https://taiwan.md/robots.txt), structured Markdown SSOT
- 🕸️ **Interactive knowledge graph** — D3.js force simulation with zoom, drag, cross-category bridges
- 🌳 **Resource mindmap** — D3.js bidirectional tidy tree with 146+ official Taiwan websites
- 🎭 **Curated, not encyclopedic** — every page answers "why this matters"
- 📐 **Three-layer depth** — 30-sec overview → 5-min read → full article
- 🎨 **Literary curatorial style** — Noto Serif TC, essay-driven, inspired by 報導者
- 🔍 **SEO optimized** — JSON-LD structured data, Open Graph, Twitter Cards, RSS feeds
- 💾 **Wikimedia Commons** — CC-licensed images with local caching
- 📝 **Zero-code contribution** — forms, AI prompts, or email
- 🔓 **CC BY-SA 4.0** — free to cite, remix, share
- 📚 **Source-cited** — every article includes references and data attribution

---

## 📊 Stats

| Metric                   | Count |
| ------------------------ | ----- |
| 📄 Total pages built     | 269   |
| 🇹🇼 Chinese articles      | 213   |
| 🇺🇸 English articles      | 53    |
| 📂 Categories            | 12    |
| 🏛️ Hub pages             | 12    |
| 🕸️ Knowledge graph nodes | 100+  |
| 🔗 Resource websites     | 146+  |
| 👥 Contributors          | 13    |

---

## 🗂️ 12 Categories

|     | Category                                        | Articles | Highlights                                |
| --- | ----------------------------------------------- | -------- | ----------------------------------------- |
| 📜  | [歷史 History](https://taiwan.md/history)       | 12       | 史前→荷西→清治→日治→戒嚴→民主化           |
| 🗺️  | [地理 Geography](https://taiwan.md/geography)   | 11       | 五大山脈、板塊運動、氣候帶、離島          |
| 🎭  | [文化 Culture](https://taiwan.md/culture)       | 19       | 閩南客家原住民外省新住民多元融合、花布    |
| 🧋  | [美食 Food](https://taiwan.md/food)             | 11       | 珍珠奶茶、牛肉麵、夜市、茶文化、客家菜    |
| 🎨  | [藝術 Art](https://taiwan.md/art)               | 22       | 當代藝術、新媒體藝術、電影、漫畫          |
| 🎵  | [音樂 Music](https://taiwan.md/music)           | 10       | 金曲獎、獨立音樂、聲音地景                |
| 💻  | [科技 Technology](https://taiwan.md/technology) | 17       | 台積電矽盾、g0v 公民科技、半導體          |
| 🌿  | [自然 Nature](https://taiwan.md/nature)         | 15       | 特有種、國家公園、步道文化                |
| 👤  | [人物 People](https://taiwan.md/people)         | 14       | 李安、張忠謀、鄧麗君、唐鳳、侯孝賢...     |
| 🏛️  | [社會 Society](https://taiwan.md/society)       | 17       | 民主制度、人權與性別平等、外交            |
| 💰  | [經濟 Economy](https://taiwan.md/economy)       | 16       | 經濟奇蹟、夜市經濟學、電商                |
| 🏙️  | [生活 Lifestyle](https://taiwan.md/lifestyle)   | 13       | 便利商店、健保、交通、溫泉、KTV、咖啡文化 |

---

## 🤝 How to Contribute

Four ways, from zero-code to full PR:

| Path               | For whom                                     |
| ------------------ | -------------------------------------------- |
| 🟢 **Fill a form** | Anyone — just write what you know            |
| 🤖 **Ask your AI** | Paste our prompt to ChatGPT/Claude/Gemini    |
| 📧 **Email us**    | Send articles/photos to cheyu.wu@monoame.com |
| 🔴 **Fork & PR**   | Developers — edit `knowledge/` directly      |

👉 **[taiwan.md/contribute](https://taiwan.md/contribute)**

---

## 🏗️ Architecture

```
knowledge/           ← SSOT (Single Source of Truth)
├── History/         ← 中文文章 + _Hub.md (literary curatorial essays)
├── en/History/      ← English translations
├── About/           ← Meta content (origin story, quotes, resources)
├── ...
scripts/sync.sh      ← One-command sync to src/content/
src/
├── pages/           ← Astro v5 pages with full SEO
├── layouts/         ← Glassmorphism nav, Noto Serif TC typography
└── content/         ← Build-time projection from knowledge/
public/
├── images/wiki/     ← Cached Wikimedia Commons images (MD5 hashed)
└── ...
docs/
├── d3-visualization-plan.md  ← D3.js upgrade roadmap
├── research-e-estonia-analysis.md  ← International benchmark study
└── ...
```

**Tech:** Astro v5 · GitHub Pages · marked.js · D3.js · Google Fonts (Noto Serif TC)  
**SSOT:** All content lives in `knowledge/`. Website is a projection.  
**SEO:** JSON-LD · Open Graph · Twitter Cards · RSS · Canonical URLs · `<meta ai-summary>`  
**i18n:** zh-TW (default SSOT) + en (100% coverage)  
**Quality:** All articles require source citations **with clickable URLs** — no plain-text references. AI-assisted content undergoes fact-checking before merge. See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 🌏 International Benchmarks

| Project                                      | Country        | Focus                          |
| -------------------------------------------- | -------------- | ------------------------------ |
| [e-Estonia](https://e-estonia.com/)          | 🇪🇪 Estonia     | Digital society brand          |
| [japan-guide.com](https://japan-guide.com)   | 🇯🇵 Japan       | Comprehensive travel knowledge |
| [About Singapore](https://www.sg101.gov.sg/) | 🇸🇬 Singapore   | National education portal      |
| [SwissInfo](https://www.swissinfo.ch/)       | 🇨🇭 Switzerland | Multilingual public media      |

**What makes us different:** Open source + AI-native + community-driven + literary curation

---

## 🗺️ Roadmap

- [x] 🚀 Launch with 12 categories + bilingual content
- [x] 🕸️ Interactive knowledge graph (D3.js)
- [x] 🌳 Resource mindmap (146+ websites, bidirectional tidy tree)
- [x] 🔍 Full SEO (JSON-LD, OG, RSS, sitemap)
- [x] 🌐 100% i18n coverage (zh-TW + en)
- [x] 📊 GA4 analytics integration
- [ ] 🗺️ Interactive Taiwan map (TopoJSON, multi-layer)
- [ ] 📅 Taiwan 400-year history timeline
- [ ] 🏭 Semiconductor supply chain Sankey diagram
- [ ] 🎯 Show HN launch
- [ ] 📰 Newsletter subscription
- [ ] 🤝 g0v collaboration

See [D3 Visualization Plan](docs/d3-visualization-plan.md) for the full roadmap.

---

## 📜 License

- **Content:** [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) — free to share and adapt
- **Code:** MIT

---

## 🖼️ Image Policy

All images sourced from [Wikimedia Commons](https://commons.wikimedia.org/) with verified CC licenses. Each image includes attribution, license type, and source link. Images are cached locally and optimized for performance.

---

## 👥 Contributors

Thanks to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://cheyuwu.com"><img src="https://avatars.githubusercontent.com/u/4727572?v=4" width="80px;" alt="frank890417"/><br /><sub><b>frank890417</b></sub></a><br />💻 🖋 🎨 🤔 📆 📖</td>
    <td align="center"><a href="https://github.com/bugnimusic"><img src="https://avatars.githubusercontent.com/u/260387338?v=4" width="80px;" alt="bugnimusic"/><br /><sub><b>bugnimusic</b></sub></a><br />🖋 🌍</td>
    <td align="center"><a href="https://github.com/Ray0907"><img src="https://avatars.githubusercontent.com/u/29456968?v=4" width="80px;" alt="Ray0907"/><br /><sub><b>Ray0907</b></sub></a><br />🖋 💻</td>
    <td align="center"><a href="https://github.com/number053"><img src="https://avatars.githubusercontent.com/u/269151044?v=4" width="80px;" alt="number053"/><br /><sub><b>number053</b></sub></a><br />🖋</td>
    <td align="center"><a href="https://github.com/jekyll530"><img src="https://avatars.githubusercontent.com/u/150101610?v=4" width="80px;" alt="jekyll530"/><br /><sub><b>jekyll530</b></sub></a><br />🖋 🌍</td>
    <td align="center"><a href="https://github.com/ro9er117911"><img src="https://avatars.githubusercontent.com/u/127029993?v=4" width="80px;" alt="ro9er117911"/><br /><sub><b>ro9er117911</b></sub></a><br />🖋</td>
    <td align="center"><a href="https://github.com/jacky1822"><img src="https://avatars.githubusercontent.com/u/94786796?v=4" width="80px;" alt="jacky1822"/><br /><sub><b>jacky1822</b></sub></a><br />🖋</td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/hansai-art"><img src="https://avatars.githubusercontent.com/u/132933660?v=4" width="80px;" alt="hansai-art"/><br /><sub><b>hansai-art</b></sub></a><br />🖋 💻 🔍</td>
    <td align="center"><a href="https://github.com/luofreddy"><img src="https://avatars.githubusercontent.com/u/85281073?v=4" width="80px;" alt="luofreddy"/><br /><sub><b>luofreddy</b></sub></a><br />💻</td>
    <td align="center"><a href="https://github.com/fredchu"><img src="https://avatars.githubusercontent.com/u/1243384?v=4" width="80px;" alt="fredchu"/><br /><sub><b>fredchu</b></sub></a><br />🔍 🐛 🖋 📖</td>
    <td align="center"><a href="https://github.com/Rushyuheng"><img src="https://avatars.githubusercontent.com/u/82425707?v=4" width="80px;" alt="Rushyuheng"/><br /><sub><b>Rushyuheng</b></sub></a><br />🖋</td>
    <td align="center"><a href="https://github.com/f312213213"><img src="https://avatars.githubusercontent.com/u/71749524?v=4" width="80px;" alt="f312213213"/><br /><sub><b>f312213213</b></sub></a><br />💻 🌍</td>
    <td align="center"><a href="https://github.com/siansiansu"><img src="https://avatars.githubusercontent.com/u/33390878?v=4" width="80px;" alt="siansiansu"/><br /><sub><b>siansiansu</b></sub></a><br />🖋</td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://allcontributors.org) specification. Contributions of any kind welcome!

---

## 💝 Sponsors

Help Taiwan's story reach the world. → [taiwan.md/about#sponsors](https://taiwan.md/about#sponsors)

---

## 🙏 Created by

**[Che-Yu Wu 吳哲宇](https://cheyuwu.com)** — New media artist, founder of [MonoLab](https://monolab.world), and builder of [Muse](https://muse.cheyuwu.com).

> _"If I could build a digital identity for myself, why not for Taiwan?"_

## 📢 Follow

- 𝕏 Twitter: [@taiwandotmd](https://x.com/taiwandotmd)
- Threads: [@taiwandotmd](https://www.threads.com/@taiwandotmd)
- Instagram: [@taiwandotmd](https://www.instagram.com/taiwandotmd)
- GitHub: [frank890417/taiwan-md](https://github.com/frank890417/taiwan-md)

---

_Built with ❤️ in Taiwan. 用愛與驕傲，從台灣出發。_
