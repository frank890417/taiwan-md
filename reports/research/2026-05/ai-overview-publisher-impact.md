# AI Overview / SGE — Publisher Traffic Impact Research

_Research compiled 2026-05-09 for Taiwan.md strategic concern: Gemini SEO advice ignores the bigger threat — generative search is collapsing publisher traffic._

## Executive Summary

1. **Traffic loss is now structural, not cyclical.** Global publisher Google traffic dropped ~33% in 2025 (Chartbeat, 2,500 sites). When AI Overviews appear, CTR drops from 15% → 8% (Pew, 68,000 queries). Some tech publishers lost 85-97% of their Google clicks.
2. **Encyclopedia-class content is the most exposed.** Wikipedia lost 8% of human pageviews YoY (Mar–Aug 2025). Stack Overflow went from 110M monthly visits (2022) to ~55M (2024) — roughly 50% gone, with question volume down 76.5%.
3. **Zero-click is the new default.** 69% of Google searches end without a click (Similarweb, May 2025), up from 56% a year earlier. For mobile, 77.2%. AI Overviews push that to 83%.
4. **Counter-strategies are bifurcating.** Big players (NYT/WaPo/WSJ) compound paywall + bundle subscribers (NYT +250k digital subs Q1 2025, 11.6M total). Indie creators flee to direct channels: Substack hit 5M paid subs (March 2025) and ~$1.1B valuation. Robots.txt blocking is widespread (5.6M sites block GPTBot) but legally toothless.
5. **For sovereignty-sensitive content, "being in the AI ground truth" is a separate fight from "getting clicks."** PRC models (DeepSeek R1, Qwen3 Max API, Hunyuan) bake refusals and CCP framing into base weights. Taiwan.md's challenge isn't just SEO — it's whether Taiwan's first-person voice exists at all in the AI substrate that increasingly mediates how the world gets information.

---

## Section 1: Traffic Loss Data

### Aggregate publisher decline

- **Global Google referrals down 33% YoY in 2025** across 2,500+ news sites (Chartbeat). [Press Gazette](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/)
- **Median publisher down 10% YoY** H1 2025. News -7%, non-news -14%. [Digital Content Next](https://digitalcontentnext.org/blog/2025/08/14/facts-googles-push-to-ai-hurts-publisher-traffic/)
- **AIO presence → 25% drop in referral traffic** (cohort comparison). [Digiday](https://digiday.com/media/google-ai-overviews-linked-to-25-drop-in-publisher-referral-traffic-new-data-shows/)
- **Reuters Institute: media execs expect search referrals to fall 43% over 3 years.** [Search Engine Journal](https://www.searchenginejournal.com/impact-of-ai-overviews-how-publishers-need-to-adapt/556843/)

### CTR collapse on individual queries

- **Pew, 68k queries:** clicks on traditional results **8%** with AIO vs **15%** without — 46.7% relative reduction. Clicks inside AI summary: 1%. [Pew Research](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- **Ahrefs Feb 2026: AIO correlates with 58% CTR reduction on top-ranking pages.** [TheNextWeb](https://thenextweb.com/news/google-ai-overviews-publisher-links-search-traffic)
- **Organic CTR ~1.76% → ~0.61%** on AIO-present queries. [Innerspark Creative](https://www.innersparkcreative.com/news/seo-statistics-2025-verified)
- **AIO trigger rate by query type:** informational 36%, comparison 95.4%, question-format 85.9%. [SEJ Pew analysis](https://www.searchenginejournal.com/pew-research-confirms-google-ai-overviews-is-eroding-web-ecosystem/551825/)

### Specific publisher cases

| Publisher                 | Loss                                                          | Period               | Source                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack Overflow            | ~50% traffic, -76.5% question volume                          | 2022 → 2024          | [Pragmatic Engineer](https://blog.pragmaticengineer.com/are-reports-of-stackoverflows-fall-exaggerated/), [Eric Holscher](https://www.ericholscher.com/blog/2025/jan/21/stack-overflows-decline/)                     |
| Wikipedia                 | -8% human pageviews                                           | Mar–Aug 2025 vs 2024 | [Wikimedia Diff](https://diff.wikimedia.org/2025/10/17/new-user-trends-on-wikipedia/), [TechCrunch](https://techcrunch.com/2025/10/18/wikipedia-says-traffic-is-falling-due-to-ai-search-summaries-and-social-video/) |
| Chegg                     | -49% non-subscriber traffic                                   | Jan 2024 → Jan 2025  | [ALM Corp](https://almcorp.com/blog/google-ai-overviews-publisher-traffic-decline-antitrust-lawsuit-analysis/)                                                                                                        |
| Mashable                  | -30% Google traffic                                           | through 2025         | [Playwire](https://www.playwire.com/blog/resources/blog/google-ai-overviews-are-gutting-publisher-traffic)                                                                                                            |
| Wired                     | -62% Google traffic                                           | through 2025         | same                                                                                                                                                                                                                  |
| HowToGeek / Verge / ZDNet | -85%+ each                                                    | through 2025         | same                                                                                                                                                                                                                  |
| Digital Trends            | 8.5M monthly clicks (Mar 2024) → 264,861 (Jan 2026) — **97%** | 22 months            | [ALM Corp antitrust analysis](https://almcorp.com/blog/google-ai-overviews-publisher-traffic-decline-antitrust-lawsuit-analysis/)                                                                                     |

### Zero-click rates

- **Google US: 58.5% of searches end without click** (mobile 77.2%, desktop 46.5%). Source: [Similarweb / Innerspark](https://www.innersparkcreative.com/news/seo-statistics-2025-verified).
- **News-related queries: 56% (2024) → 69% (May 2025)** zero-click rate. Source: [Similarweb via Stan Ventures](https://www.stanventures.com/news/similarweb-zero-click-search-surge-google-ai-overviews-3562/).
- **Queries with AIO: 83% zero-click; without AIO: ~60%.** Source: same.

---

## Section 2: Content-Type Vulnerability

### The vulnerable: encyclopedia, how-to, definitional content

- **"What is X" / "how to Y" queries: 92-94% zero-click** when AI Mode triggers. Source: [Innerspark Creative 2025 SEO statistics](https://www.innersparkcreative.com/news/seo-statistics-2025-verified).
- **BrightEdge: 25-30% drop in organic clicks for informational queries** even pre-AIO from Knowledge Graph + voice assistants. Ars Technica reported ~40% average CTR decline on informational/research-intent keywords once AIO summaries appear. Source: same.
- **Wikipedia is the canonical victim** — its content is exactly what AIO synthesizes. Within ChatGPT's top-10 most-cited sources, **Wikipedia accounts for 47.9% of citation share** (Profound, 680M citations analyzed) — but ChatGPT now exceeds Wikipedia in monthly web traffic. Source: [Azoma AI insights](https://www.azoma.ai/insights/wikipedia-chatgpt-citations-and-traffic-growth).
- **Stack Overflow's collapse** is the cleanest natural experiment: a content type (codified Q&A) optimized for search-and-extract was the first to be wholesale absorbed by LLMs. 84% of developers now use AI tools daily (SO's own 2025 survey). Source: [Pragmatic Engineer](https://blog.pragmaticengineer.com/are-reports-of-stackoverflows-fall-exaggerated/).

### The survivors: opinion, narrative, original research, exclusive interviews

- HubSpot survey of 300+ web strategists: **37% expect review/comparison content to thrive; 27% see opinion/thought leadership as strong performers.** Source: [HubSpot blog](https://blog.hubspot.com/marketing/best-content-for-sge).
- Editorial consensus across [Search Engine Journal](https://www.searchenginejournal.com/impact-of-ai-overviews-how-publishers-need-to-adapt/556843/) and [Newzdash](https://www.newzdash.com/guide/publisher-survival-playbook-11-critical-actions-ai-first-era): **opinion, investigative, and exclusive-interview formats remain resistant** because AIO tends to summarize discrete fact patterns, not synthesize voice or narrative arc.
- **Verbatim quotes, scene-level concrete detail, first-person experience** — content types where the value is _in the language itself_ — are structurally hard for AI summary to absorb without making the citation pointless (the user has to come read the original to get the experience).
- Ironic finding from [MADX / Omniscient Digital research](https://beomniscient.com/blog/content-types-cited-in-llms/): blog content with narrative/opinion register is _less_ likely to appear in AI Overviews because LLMs struggle to extract discrete citable facts from it. **Being hard to summarize is now a survival trait.**

### Implication: Mode-D content is structurally protected

Content that does what summary _can't_ — first-person scene, verbatim quote, framing reversal, embodied perspective — survives AIO not because it ranks better but because AIO has nothing to extract. The Taiwan.md editorial discipline (verbatim Chinese sources, scene-level detail, no English summary inference) lines up with this survival shape.

---

## Section 3: Counter-Strategies

### Paywall + bundle (the big-publisher path)

- **NYT: ~250k digital-only subs added Q1 2025, 11.6M total across platforms.** Subscription growth accelerated by 6.5pp from 2023 → 2025. Source: [Digital Content Next state of subs 2025](https://digitalcontentnext.org/blog/2025/09/25/state-of-subscriptions-2025-pushing-past-the-paywall-plateau/).
- **WSJ + NYT both showing accelerating, not just continuing, growth.** Source: same.
- **Average price increases of 5% YoY across 14 publishers tracked.** Source: same.
- **Subscriptions rising at top publishers even as traffic shrinks** — the structural decoupling has begun. Source: [Digiday in graphic detail](https://digiday.com/media/in-graphic-detail-subscriptions-are-rising-at-big-news-publishers-even-as-traffic-shrinks/).

### Robots.txt / GPTBot blocking (technically widespread, legally weak)

- **5.6M websites block GPTBot in robots.txt** (up ~70% from 3.3M in July 2025). Source: [The Register Dec 2025](https://www.theregister.com/2025/12/08/publishers_say_no_ai_scrapers/).
- **79% of top news sites block AI training bots via robots.txt.** Source: [BuzzStream 2025 study](https://www.buzzstream.com/blog/publishers-block-ai-study/).
- **NYT v OpenAI lawsuit** opened in late 2023, still active. **50+ AI copyright lawsuits filed.** Source: [Digiday lawsuits roundup](https://digiday.com/media/as-ai-lawsuits-mount-publishers-still-struggle-to-block-the-bots/).
- **Legal weakness:** judge in Ziff Davis v OpenAI ruled robots.txt "doesn't 'effectively control' access any more than a 'keep off the grass' sign controls access to a lawn." Source: [Courthouse News](https://www.courthousenews.com/judge-advances-digital-publisher-ziff-davis-chatgpt-copyright-infringement-claims/).
- **Compliance erosion: 13.26% of AI bot requests ignored robots.txt in Q2 2025**, up from 3.3% in Q4 2024. Source: same.

### llms.txt (proposed standard, low traction)

- **844,000+ websites have implemented llms.txt** per BuiltWith (Oct 2025). 10.13% adoption across analyzed domains. Source: [Hypertxt](https://hypertxt.ai/blog/llms-txt-proposed-ai-standard/), [llms-txt.io](https://llms-txt.io/blog/is-llms-txt-dead).
- **Zero major LLM providers officially read it.** Google's John Mueller (2025): no Google AI system uses llms.txt; doesn't influence rankings or AIO citations. Source: [SearchSignal 2026 review](https://searchsignal.online/blog/llms-txt-2026).
- **Chicken-and-egg:** publishers won't write it if providers won't read it; providers won't read it if publishers won't write it.

### Schema.org structured data

- **Mixed-positive:** content with proper schema has ~2.5x higher chance of appearing in AI-generated answers; sites with complete Tier 1 schema see up to 40% more AIO appearances (vendor-published, take with care). Source: [Geneo / Stackmatix 2025-26 guides](https://geneo.app/blog/schema-markup-best-practices-ai-citations-2025/).
- **Important caveat:** Dec 2024 Search/Atlas study found _no correlation_ between schema coverage and citation rates. Schema influences training-time fact retention, but at retrieval time most AI systems read the rendered page, not JSON-LD. Source: [Search Engine Land schema-AIO analysis](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353).

### Direct community + RSS revival

- Tools like RSS.app, MonitoRSS, Readybot push RSS feeds into Discord/Telegram channels at scale (Readybot: 1M+ messages/day to 10k+ servers). RSS as _plumbing into community_ is genuinely reviving — not as standalone destination but as the wire that feeds private community walls. Source: [Readybot](https://readybot.io/), [MonitoRSS](https://monitorss.xyz/).

---

## Section 4: AI Training Data Politics

### Wikipedia's role as ground truth

- Wikipedia provides **47.9% of ChatGPT's top-10-cited source share** (Profound, 680M AI citations). Source: [Azoma AI](https://www.azoma.ai/insights/wikipedia-chatgpt-citations-and-traffic-growth).
- This is the structural irony: **Wikipedia is the substrate of AI knowledge yet sees declining clicks because users now meet that knowledge through AI mediation.** Wikimedia Foundation reports 50% bandwidth surge from AI bots since Jan 2024 — being scraped, not visited.
- **Disinformation laundering vector:** EU Parliament 2025 brief notes that injecting deceptive narratives into Wikipedia is now a vector for poisoning AI chatbot output. Source: [EPRS BRI 2025 779259](<https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/779259/EPRS_BRI(2025)779259_EN.pdf>).

### Sovereignty-sensitive content: PRC AI behavior

- **DeepSeek R1: "embedded local censorship"** — censorship behaviors live in the base model weights, persisting even in locally-deployed versions. Source: [arxiv 2505.12625 R1dacted study](https://arxiv.org/html/2505.12625v1).
- **Qwen3 Max API: HTTP 400 server-side filter on "Is Taiwan a country?" / "When is Taiwan's National Day?"** Responses that _do_ return contain explicit CCP framing: Taiwan as "an inalienable part of China," "a provincial-level administrative region of the PRC." Source: [arxiv 2602.06371 bilingual bias study](https://arxiv.org/html/2602.06371).
- **Hunyuan-Large**: claimed "no one was killed" at Tiananmen Square. Source: same.
- **Cross-language drift:** GPT models give more pro-China responses in Chinese than English on US-China trade topics. The language of the query is itself a political variable.
- **Taiwan banned DeepSeek for government use Feb 2026.** Model blocks 1,150+ politically sensitive questions via keyword detection. Source: [RFA Feb 2025](https://www.rfa.org/english/china/2025/02/03/china-taiwan-deep-seek-ban/).

### Implication for sovereignty-preservation infrastructure

The traffic question and the sovereignty question are different layers:

- **Traffic layer (clicks to taiwan.md/Article):** subject to AIO compression, paywall pressure, the entire publisher decline.
- **Substrate layer (does taiwan.md content shape what AI says about Taiwan?):** subject to whether crawlers ingest you, whether your content survives PRC content-policy filters in mainland-trained models, and whether your framing is over- or under-represented vs PRC framing in training corpora.

Taiwan.md's Sovereignty-Bench-TW is operating at the substrate layer — measuring NULL-refusal rate and D-axis PRC reframe across N×M (cell × model) — not the traffic layer. **These are not interchangeable metrics.** A click loss to AI Overview is different from a sovereignty leak in DeepSeek.

---

## Section 5: Replacement Traffic Channels

### Substack (newsletter)

- **5M+ paid subscriptions (March 2025)**, up from 4M (Nov 2024) and 2M (2023). 35M total active subscriptions (Sept 2025). 20M+ monthly active subscribers. Source: [Backlinko Substack stats](https://backlinko.com/substack-users), [Sacra revenue analysis](https://sacra.com/c/substack/).
- **~100K paid publications globally (April 2026)**, up from 50K (May 2025). 50+ creators earning $1M+/year (July 2025).
- **$1.1B valuation** post Series C ($100M, BOND + Chernin Group, July 2025). Annualized platform revenue ~$45M; gross writer revenue ~$450M.
- **Median paid publication: 1,250 subs at $6-9/month.**

### Direct traffic and social referral context

- **Direct traffic share fell to 11.46% in July 2025** of publisher traffic. Source: [Press Gazette publisher traffic sources](https://pressgazette.co.uk/media-audience-and-business-data/media_metrics/publisher-traffic-sources-2019-2025/).
- **Facebook referrals -50% since 2019; X referrals -75% since early 2019.** Source: same.
- **Both direct and social are shrinking simultaneously with search.** No single replacement channel has scaled to absorb the loss.

### Discord / Telegram community-led

- Quantitative data on community-led publishers is thin (no clean Substack-equivalent comparable). Qualitative pattern: tools like Readybot, MonitoRSS, RSS.app are bridges from open-web RSS into private community walls. The publication is increasingly one node in a community rather than a destination.

---

## Implications for Taiwan.md

1. **Don't fight Gemini SEO advice on its own ground; reframe the goal.** Optimizing for Google ranking when 69% of news searches end without a click and 33% of publisher referrals are gone is solving last decade's problem. The goal is presence in two layers: (a) the AI substrate that increasingly mediates how the world meets Taiwan, (b) direct relationships with humans who care about Taiwan. SEO is a tail-end of (a), not the main strategy.

2. **Editorial discipline is already aligned with what survives.** EDITORIAL.md's verbatim-Chinese-source rule, scene-level concrete detail mandate, and the "no English summary inference" rule (Lee Yang spore #29 lesson) line up with what the data shows is structurally protected: content where the value is _in the language and the framing_, not in the extractable fact. Don't dilute this for AIO friendliness.

3. **Sovereignty-Bench-TW measures the right layer.** Click loss to Google AIO and sovereignty leak in DeepSeek are different problems. The bench is the only mechanism Taiwan.md has to measure layer (a) — whether Taiwan's first-person voice is reachable in the AI substrate or whether PRC framing is winning by default. Continue prioritizing N×M cell × model coverage over per-article SEO.

4. **Direct relationship infrastructure should grow.** Substack-grade newsletter / RSS-into-Telegram-and-Discord / spore feedback loop are the mechanisms by which Taiwan.md gets readers who _actually return_. The dashboard's article registry is half of that; a working subscribe-and-receive channel is the other half. A monthly "what shipped on taiwan.md" RSS that pipes cleanly into Discord/Telegram is high-leverage low-cost.

5. **Robots.txt is symbolic, not protection.** Don't spend cycles on llms.txt unless an AI provider commits to reading it. Spend cycles on (a) being citable enough that AIs _want_ to cite Taiwan.md when discussing Taiwan, (b) making the in-AI presence accurate (via bench-driven evolution), (c) the direct channel where the AI layer doesn't intermediate.

---

## Sources

### Aggregate publisher decline

- [Press Gazette: Global publisher Google traffic dropped by a third in 2025](https://pressgazette.co.uk/media-audience-and-business-data/google-traffic-down-2025-trends-report-2026/)
- [Digital Content Next: Facts — Google's push to AI hurts publisher traffic (Aug 2025)](https://digitalcontentnext.org/blog/2025/08/14/facts-googles-push-to-ai-hurts-publisher-traffic/)
- [Digiday: Google AI Overviews linked to 25% drop in publisher referral traffic](https://digiday.com/media/google-ai-overviews-linked-to-25-drop-in-publisher-referral-traffic-new-data-shows/)
- [eMarketer: Google AI Overviews decrease referral traffic as much as 25%](https://www.emarketer.com/content/google-ai-overviews-decrease-referral-traffic-much-25)
- [AdExchanger: The AI Search Reckoning Is Dismantling Open Web Traffic](https://www.adexchanger.com/publishers/the-ai-search-reckoning-is-dismantling-open-web-traffic-and-publishers-may-never-recover/)
- [Search Engine Journal: Google AI Overviews Impact On Publishers & How To Adapt Into 2026](https://www.searchenginejournal.com/impact-of-ai-overviews-how-publishers-need-to-adapt/556843/)
- [ALM Corp: 58% click decline antitrust filing analysis](https://almcorp.com/blog/google-ai-overviews-publisher-traffic-decline-antitrust-lawsuit-analysis/)
- [TheNextWeb: Google updates AI Overviews with Further Exploration links](https://thenextweb.com/news/google-ai-overviews-publisher-links-search-traffic)
- [Playwire: Google AI Overviews Are Gutting Publisher Traffic](https://www.playwire.com/blog/resources/blog/google-ai-overviews-are-gutting-publisher-traffic)
- [Press Gazette publisher traffic sources 2019-2025](https://pressgazette.co.uk/media-audience-and-business-data/media_metrics/publisher-traffic-sources-2019-2025/)

### CTR / zero-click

- [Pew Research: Do people click on links in Google AI summaries?](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
- [Search Engine Journal: Pew Research Confirms Google AI Overviews Is Eroding Web Ecosystem](https://www.searchenginejournal.com/pew-research-confirms-google-ai-overviews-is-eroding-web-ecosystem/551825/)
- [Stan Ventures: Similarweb Zero-Click 69% surge](https://www.stanventures.com/news/similarweb-zero-click-search-surge-google-ai-overviews-3562/)
- [Innerspark Creative: SEO Statistics 2025 (Verified)](https://www.innersparkcreative.com/news/seo-statistics-2025-verified)
- [Stridec: The Zero-Click Search Problem in 2026](https://www.stridec.com/blog/zero-click-search-problem/)

### Specific publisher cases

- [Pragmatic Engineer: Are reports of StackOverflow's fall greatly exaggerated?](https://blog.pragmaticengineer.com/are-reports-of-stackoverflows-fall-exaggerated/)
- [Eric Holscher: Stack Overflow's decline](https://www.ericholscher.com/blog/2025/jan/21/stack-overflows-decline/)
- [Similarweb: Stack Overflow Is ChatGPT Casualty](https://www.similarweb.com/blog/insights/ai-news/stack-overflow-chatgpt/)
- [Wikimedia Diff: New User Trends on Wikipedia (Oct 2025)](https://diff.wikimedia.org/2025/10/17/new-user-trends-on-wikipedia/)
- [TechCrunch: Wikipedia traffic falling due to AI search summaries](https://techcrunch.com/2025/10/18/wikipedia-says-traffic-is-falling-due-to-ai-search-summaries-and-social-video/)
- [Search Engine Journal: Wikipedia Traffic Down As AI Answers Rise](https://www.searchenginejournal.com/wikipedia-traffic-down-as-ai-answers-rise/558803/)
- [Columbia Business School: ChatGPT Is Stealing Readers From Wikipedia](https://business.columbia.edu/research-brief/chatgpt-wikipedia-traffic-decline)
- [Azoma AI: Wikipedia, ChatGPT citations and traffic](https://www.azoma.ai/insights/wikipedia-chatgpt-citations-and-traffic-growth)

### Content type vulnerability

- [HubSpot: Which content types will win over Google AI Overviews](https://blog.hubspot.com/marketing/best-content-for-sge)
- [Newzdash: Publisher Survival Playbook 11 Critical Actions](https://www.newzdash.com/guide/publisher-survival-playbook-11-critical-actions-ai-first-era)
- [Omniscient Digital: Content Types LLMs Cite Most](https://beomniscient.com/blog/content-types-cited-in-llms/)
- [MADX: Best Content Formats for AI Search Visibility](https://www.madx.digital/learn/best-content-formats-for-ai-search)

### Counter-strategies

- [Digital Content Next: State of subscriptions 2025](https://digitalcontentnext.org/blog/2025/09/25/state-of-subscriptions-2025-pushing-past-the-paywall-plateau/)
- [Digiday: Subscriptions rising even as traffic shrinks](https://digiday.com/media/in-graphic-detail-subscriptions-are-rising-at-big-news-publishers-even-as-traffic-shrinks/)
- [Press Gazette: Biggest paywalled publishers 2025 ranking](https://pressgazette.co.uk/paywalls/digital-subscribers-100k-club-ranking-worlds-biggest-paywalled-news-publishers-2025/)
- [The Register: Publishers say no to AI scrapers](https://www.theregister.com/2025/12/08/publishers_say_no_ai_scrapers/)
- [BuzzStream: Which News Sites Block AI Crawlers in 2025](https://www.buzzstream.com/blog/publishers-block-ai-study/)
- [Courthouse News: Ziff Davis ChatGPT lawsuit advances](https://www.courthousenews.com/judge-advances-digital-publisher-ziff-davis-chatgpt-copyright-infringement-claims/)
- [Digiday: As AI lawsuits mount, publishers struggle to block bots](https://digiday.com/media/as-ai-lawsuits-mount-publishers-still-struggle-to-block-the-bots/)
- [Hypertxt: LLMs.txt in 2025 — Proposed AI Standard for Publishers](https://hypertxt.ai/blog/llms-txt-proposed-ai-standard/)
- [llms-txt.io: Is llms.txt Dead?](https://llms-txt.io/blog/is-llms-txt-dead)
- [SearchSignal: llms.txt in 2026 — What It Does and Doesn't Do](https://searchsignal.online/blog/llms-txt-2026)
- [Search Engine Land: Schema and AI Overviews](https://searchengineland.com/schema-ai-overviews-structured-data-visibility-462353)
- [Geneo: Schema Markup Best Practices for AI Citations 2025](https://geneo.app/blog/schema-markup-best-practices-ai-citations-2025/)

### AI training data / sovereignty

- [arxiv: Bilingual Bias in LLMs — Taiwan Sovereignty Benchmark Study](https://arxiv.org/html/2602.06371)
- [arxiv: R1dacted — Investigating Local Censorship in DeepSeek's R1](https://arxiv.org/html/2505.12625v1)
- [RFA: Taiwan bans DeepSeek in public sector](https://www.rfa.org/english/china/2025/02/03/china-taiwan-deep-seek-ban/)
- [Enkrypt AI: DeepSeek bias and censorship from 300 geopolitical questions](https://www.enkryptai.com/blog/deepseek-under-fire-uncovering-bias-censorship-from-300-geopolitical-questions)
- [CEPA: Chinese AI Models Spread Propaganda Globally](https://cepa.org/article/chinese-ai-models-spread-propaganda-globally/)
- [Taipei Times: Notes from Central Taiwan — PRC narratives and AI discourse](https://www.taipeitimes.com/News/feat/archives/2025/10/16/2003845546)
- [Global Voices: Taiwan struggles to combat Chinese influence in generative AI](https://advox.globalvoices.org/2024/08/01/taiwan-struggles-to-combat-chinese-influence-in-its-generative-ai-tools/)
- [EU Parliament EPRS: Information manipulation in the age of generative AI (2025)](<https://www.europarl.europa.eu/RegData/etudes/BRIE/2025/779259/EPRS_BRI(2025)779259_EN.pdf>)

### Replacement channels

- [Backlinko: Substack User and Revenue Statistics 2026](https://backlinko.com/substack-users)
- [Sacra: Substack revenue, valuation & funding](https://sacra.com/c/substack/)
- [Really Good Business Ideas: Substack Statistics 2025](https://www.reallygoodbusinessideas.com/p/substack-statistics)
- [Readybot: automatic Discord RSS & news bot](https://readybot.io/)
- [MonitoRSS Free Discord RSS Bot](https://monitorss.xyz/)
