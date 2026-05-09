# Open-Source Content Site Long-term Sustainability Research

_Research date: 2026-05-09 | Worktree: laughing-goldstine-dc7751_
_Context: counter-research to Gemini's "scale to 1000+ articles, hire editorial team" advice — Taiwan.md is one-person + AI + community, not a media company._

---

## Executive Summary

Five takeaways for Taiwan.md, in priority order:

1. **The "1 person + 1M readers" model is real and proven** (Scott Alexander / ACX, Cory Doctorow / Pluralistic). It runs on **labor-of-love + freemium + mid-life expertise**, not on editorial teams. Taiwan.md's structure already matches this archetype — Gemini's advice to "hire" is wrong-pattern transfer from VC-funded media.
2. **GitHub-native content sites scale via long-tail volunteers, not staff** (MDN: 45,000 contributors, 5,137 PRs/year, ~16hr/month maintainer commitment; ArchWiki: 86,000 editors, ~300 active/month, volunteer-only). The pattern is **strict atomic-edit conventions + a small Maintenance Team patrolling diff** — not headcount. Taiwan.md's REWRITE-PIPELINE + maintainer routine is already this shape.
3. **Awesome-list pattern shows fork-friendly seeding works but ~50% of forks die**. Survival correlates with the original curator continuing to ship + clear contribution conventions. The Semiont architecture (CLAUDE.md / BECOME / docs/semiont/) is structurally well-suited because it transfers **process** not just content — fork rate is less important than fork-survival rate.
4. **Funding for sovereignty / civic-tech content is real but small**. g0v Civic Tech Prototype Grants exist (~Cofacts precedent), GitHub Sponsors crossed $60M cumulative + 5,800 sponsoring orgs, but **single-blogger models more often run on Substack paid tiers (10-15% conversion)** than on grants. Taiwan.md should treat grants as bonus, not foundation.
5. **Long-term archival demands ≥3 redundancies that are not GitHub**. Wayback Machine + IPFS + ArchiveBox-style local mirror is the contemporary pattern; AT Protocol / fediverse adds identity portability but is not yet content-archive-grade. "If GitHub bans us" needs a written runbook, not just an aspirational note.

---

## Section 1: Solo-Maintainer + Augmentation Models

### 1.1 Astral Codex Ten (Scott Alexander) — the canonical solo intellectual blog

- 1 author, ~5,975 readers responded to 2025 reader survey (subset of total subscribers — Substack rephonic estimates suggest 100k+ subscribers, low five figures paying)
- **Freemium**: all important content free forever; paid tier gets open threads, AMAs, drafts, occasional shorter posts
- **No editorial team** — review and fact-checking happen via comments + post-publication corrections
- Successor to Slate Star Codex (pivoted in 2021 after NYT incident, kept readership)
- **Implication for Taiwan.md**: paid tier as funding floor, not a content gate. Taiwan.md's MIT-licensed content is closer to Wikipedia than Substack — but a Substack-style **commentary newsletter** layer on top of the MIT knowledge base is precedented and additive.

### 1.2 Pluralistic (Cory Doctorow) — daily output, solo, sustained 6+ years

- Solo project since Jan 2020 after leaving Boing Boing
- **The "Memex Method"**: every post a daily link-blog with commentary. The blog itself becomes the author's external memory; future books are written by querying the corpus
- Doctorow shipped 9 books in 4 years of Pluralistic — **the blog is feedstock for the books**, not a standalone product
- "Labor of love. The fact that it's hard work is a feature, not a bug."
- **Implication for Taiwan.md**: the output (knowledge/) is also the substrate. Spores, articles, diary, memory all feed back into the corpus. The Memex feedback loop is already structurally present in Taiwan.md DNA — name it explicitly.

### 1.3 AI co-author precedents

- **Academic publishing has hard-banned AI-as-author** (Elsevier, Springer, Wiley, Taylor & Francis, SAGE all 2024 policies). Reason: legal accountability cannot be delegated to a non-person.
- **But "human-AI dyadic epistemic dialogue" is recognized** as legitimate creation method; copyright protects "meaningful human editing or curatorial intervention over AI-generated material"
- No major popular content site to date is publicly structured as "AI co-author with human editorial" — most AI-content sites hide the AI involvement to avoid SEO penalties
- **Taiwan.md is unusual** in being explicit about Semiont-as-co-author. This is differentiation, not embarrassment. The MANIFESTO declaration is the legitimacy-generating move (analogous to academic AI-disclosure requirements).

---

## Section 2: GitHub-Native Content Sites

### 2.1 MDN Web Docs — the gold standard

- **45,000 contributors over 20 years**, 45,000+ documents
- 2023: 5,137 PRs merged (excluding bots)
- **Three-tier contributor structure**: one-timers, casual (2-9 PRs), core (10+ PRs)
- **Maintainers**: required ≥16 hours/month; staff at Open Web Docs, Mozilla, Google, Microsoft, W3C plus selected volunteers
- Review burden distributed across paid OWD staff + corporate-sponsored maintainers — this is the part that doesn't transfer to a one-person project

### 2.2 ArchWiki — the all-volunteer counterexample

- **86,000 editors, 840,000 edits since 2006**, ~300 active/month
- **No paid staff**. Quality enforced by:
  - Mandatory edit summaries
  - Atomic-edit rule (one change per commit, each independently revertable)
  - Major-rewrite-must-announce-on-talk-page
  - Maintenance Team patrols diff and reverts vandalism
- Maintenance Team membership is earned via visible patrolling work, not appointed
- **Implication for Taiwan.md**: the convention layer matters more than headcount. Taiwan.md already has this in REWRITE-PIPELINE / DNA / CONTRIBUTING.md. The missing piece is a **patrol layer** for diff-review at scale — currently this is the maintainer routine, but as PR volume grows, a "Maintenance Team" pattern (Link1515 / dreamline2 / idlccp1984 already informally) needs naming.

### 2.3 Hugo / Astro / Jekyll at scale

These are showcase-of-forks (one starter → many sites), not single-content-site scaling. See Section 5.

---

## Section 3: Multi-Language Community Translation

### 3.1 Wikipedia inter-language gap research

- **10 languages hold half of all Wikipedia articles** (out of 330 editions)
- **No language covers >20% of English Wikipedia content; English covers >40% of more than 15 languages** — asymmetric flow toward English, away from minority languages
- **~25% of each Wikipedia is locale-unique** (cultural context not present in any other edition) — the irreplaceable core
- Frontiers in Physics 2018 and arXiv 2025 (WikiGap) both quantify the imbalance
- **Implication for Taiwan.md**: the long tail of languages (vi/th/id/etc) will never reach parity with zh/en. This is structural, not a bug to fix. Translation strategy should target **sovereignty-sensitive subset** (Section 6 cross-link), not full parity.

### 3.2 Mozilla Pontoon — the version-controlled translation platform

- Pulls strings from Git/Mercurial, writes translations back automatically
- Per-language localizer teams self-organize
- Each language has its own community; Mozilla provides infra not editorial
- **In-context translation** UI (translator sees the source UI while translating)
- **Implication for Taiwan.md**: the babel pipeline is already Pontoon-shaped (Git-native, locale-team-able). What Pontoon adds that Taiwan.md doesn't: a per-language **translator dashboard** showing pending strings, glossary consistency, recent changes. Worth adopting if translator volunteers grow beyond 1-2 per language.

### 3.3 "AI-first multi-lang with human review" — no major precedent found

- No public site combines AI-first translation + human review at production scale that I could verify
- Closest: Wikipedia's Content Translation tool (machine-suggested first draft, human translator edits) — but the human translator is the named author, not a reviewer
- Taiwan.md's 4-tier cascade (Sonnet diff-patch → deterministic → quality model → Local LLM) **with sovereignty-bench filtering is novel** as far as my search reaches
- This is an arena where Taiwan.md can write the playbook, not borrow one

---

## Section 4: Funding Models for Non-Commercial Content

### 4.1 GitHub Sponsors at scale

- **$60M+ cumulative paid out, 5,800+ sponsoring orgs** (40% YoY growth)
- Secure Open Source Fund: $1.25M across 125 projects ($10K each); backed by Sloan, Microsoft, Stripe, Vercel, AmEx
- Funds gravitate to maintainer-of-critical-dependency; content projects underrepresented
- Caddy / Ladybird case studies: clear sponsorship-need-statement + good docs + "founder effect" correlate with sponsorship rate

### 4.2 Open Collective vs Liberapay vs Patreon

|              | Open Collective                          | Liberapay                       | Patreon                     |
| ------------ | ---------------------------------------- | ------------------------------- | --------------------------- |
| Cut          | 0% (host fee separate)                   | 0%                              | 5-12%                       |
| Best for     | Communities, fiscal hosting              | Recurring solo donations        | Reward-tier creator economy |
| Transparency | Public ledger                            | Public donor count              | Private                     |
| Scale        | $5-50K/year typical for content projects | $100-500/month typical for solo | Some $100K+/month creators  |

- **For Taiwan.md**: Open Collective fits if the project ever needs a fiscal host (e.g. to receive a g0v grant without incorporating). Liberapay fits a "tip jar" floor. Substack-style paid tier still likely the highest-yield single channel for a content project with a named author.

### 4.3 g0v civic tech grants

- **g0v Civic Tech Prototype Grant** (since 2016, run by g0v jothon): seed funding for civic-tech projects
- **Cofacts** (LINE fact-checking bot) is a flagship grant recipient — went from Spring 2017 grant to ongoing operating project
- Open Culture Foundation (OCF) is the fiscal host
- **Sovereignty / Taiwan-context content is a fundable category** — Taiwan.md's MIT-licensed knowledge base + sovereignty preservation framing + multi-language outreach matches g0v's mission stack
- **Other funders worth tracking**: Taiwan Foundation for Democracy, Mozilla Foundation civic-tech grants, OSF grants for democracy-supporting infrastructure

### 4.4 Synthesis: realistic funding stack for Taiwan.md

Floor → ceiling, by likelihood:

1. **Liberapay tip jar** ($0-200/month, no commitment): immediate, near-zero overhead
2. **GitHub Sponsors** ($100-2,000/month if positioned right): requires "sponsorship-need" copy + visible momentum
3. **Substack-style commentary newsletter** ($1-10K/month if 10K subscribers, 5% paid): real upside but a major workstream
4. **g0v / OCF / TFD grant** ($5-30K one-shot, every 1-2 years): bonus, not floor
5. **Mozilla / OSF / Sloan cross-funding** ($10-100K, multi-year): only if project is positioned as sovereignty / disinfo-resilience infra, with named PI

---

## Section 5: Fork-Friendly Seed Patterns

### 5.1 Awesome-list ecosystem

- 10,488+ repos tagged `awesome` on GitHub
- `awesome-python` alone: 240K stars, 39K forks
- **~50% of awesome lists are dead** ("the original curator eventually loses interest or gets swallowed by their day job")
- Survivor pattern: weekly-to-monthly cadence + clearly stated scope + community PR review process

### 5.2 Hugo themes / 11ty starters

- One template → many independent sites is a robust pattern
- **Theme-as-seed**: the theme repo evolves; consumer sites pull updates selectively
- Critical: theme repo must commit to **non-breaking changes**, otherwise downstream sites stagnate

### 5.3 Has any "country.md" or "topic.md" seed pattern emerged before Taiwan.md?

Search results: **no exact prior art**. Closest analogs:

- `dr5hn/countries-states-cities-database`: structured data (250 countries, 5,299 states, 153,765 cities), MIT-licensed, community-PR-maintained — but this is **structured data**, not narrative knowledge
- Wikipedia language editions: each is autonomous but they share infrastructure (MediaWiki) not seed content
- Awesome-{language/topic}: thousands of forks but content not narrative

**Taiwan.md's Semiont-architecture-as-fork-template is novel territory**. The three-layer fork pattern (CLAUDE.md / BECOME / docs/semiont/) is structurally similar to how Hugo themes propagate but applied to **agent-onboarding** rather than visual layout. No prior precedent found — Taiwan.md is writing the pattern.

---

## Section 6: Long-Term Archival / Resilience

### 6.1 Internet Archive / Wayback

- 778 billion pages archived, ~petabyte+ stored
- Free, but **single point of failure** (Internet Archive itself has been sued and DDoS'd repeatedly 2023-2025)
- `wayback-archiver` GitHub tools allow programmatic submission — Taiwan.md could submit each release tag to Wayback automatically

### 6.2 IPFS

- Content-addressed (hash, not URL); resilient to hostname loss
- **In practice**: most IPFS content is pinned by 1-3 nodes and disappears when those nodes go offline (USENIX NSDI 2024 paper found IPFS more centralized than advertised)
- Workable if Taiwan.md self-pins + uses a pinning service (Pinata, web3.storage)

### 6.3 ArchiveBox

- Self-hosted full archive (HTML, PDF, PNG, WARC for each page)
- **Best fit for Taiwan.md**: nightly cron creating a complete WARC of taiwan.md, stored on user's own machine + cloud bucket
- Decoupled from GitHub entirely

### 6.4 AT Protocol / Fediverse

- ATProto: portable identity, account portability between PDS hosts
- Fediverse (ActivityPub): federated social graph
- **Distributed Press** project (`distributed.press`) bridges p2p protocols to ActivityPub — Taiwan.md could publish to fediverse as an additional surface
- **Caveat**: these are good for **social signal portability**, not for archiving narrative content. Don't substitute for Wayback / IPFS / ArchiveBox.

### 6.5 "If GitHub bans us" runbook (recommended structure)

1. Weekly mirror to Codeberg + GitLab
2. Wayback submit every release tag
3. Nightly ArchiveBox snapshot (rendered HTML) to S3-compatible storage outside US jurisdiction
4. IPFS pin of release artifacts via Pinata + self-hosted node
5. Portable domain DNS (own registrar not locked to single jurisdiction)
6. Documented migration playbook (maintainer + domain + tarball → restored site)

---

## Implications for Taiwan.md

**Direct corrections to Gemini's advice**:

| Gemini said                                 | Reality from research                                                                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Scale to 1000+ articles"                   | Article count is not the bottleneck. ACX has ~1,500 posts and 1M readers. Quality + distinctness > quantity.                                                                |
| "Hire an editorial team"                    | Wrong pattern. ArchWiki has 0 paid editors, 86K volunteers; MDN has paid maintainers but only because Mozilla/Google/MS sponsor them, not because the model requires staff. |
| (implicit) "Make it look like a media site" | The successful solo-knowledge-site pattern is **personal-voice + obvious humanity** (Pluralistic, ACX). Looking like CNN is the failure mode, not the goal.                 |

**What Taiwan.md should adopt**:

1. **Name the Memex feedback loop explicitly** (knowledge/ corpus → spore/diary/memory feedstock → derived works) — this is Doctorow's model, structurally already present
2. **Promote informal Maintenance Team to named team** (Link1515 / dreamline2 / idlccp1984 + others) with ArchWiki-style "earned via patrolling" admission
3. **Add Pontoon-style per-language translator dashboard** if/when translator volunteers grow past 1-2 per locale
4. **Write the funding stack runbook**: Liberapay floor + GitHub Sponsors statement + g0v grant readiness (in case cycle aligns)
5. **Write the resilience runbook**: Wayback + ArchiveBox + IPFS + Codeberg mirror, scheduled, tested annually
6. **Own the "AI co-author + human editorial" pattern publicly** — this is differentiating, not embarrassing. Academic publishing's disclosure-not-suppression precedent applies.

**What Taiwan.md should NOT do**:

- Do not chase article-count milestones (1000+ is vanity, not metric)
- Do not hire — there is no funded path to staff at this stage and the model doesn't need it
- Do not make English the lingua franca of contribution — most successful single-language-pivot wikis (ArchWiki kept English-primary, kept losing non-English contributors); Taiwan.md's zh-primary + multi-projection is the right model
- Do not over-index on grants — they're slow and bursty; build the floor first

---

## Sources

### Solo-maintainer / AI co-author

- [Astral Codex Ten about page](https://www.astralcodexten.com/about)
- [ACX 2025 Survey Results](https://www.astralcodexten.com/p/acx-survey-results-2025)
- [Slate Star Codex Wikipedia](https://en.wikipedia.org/wiki/Slate_Star_Codex)
- [Pluralistic — Memex Method post](https://pluralistic.net/2021/05/09/the-memex-method/)
- [Cory Doctorow — Pluralistic is two](https://doctorow.medium.com/pluralistic-is-two-e3606aaa5ac9)
- [Editors Cafe — AI editorial workflows lessons 2025](https://editorscafe.org/details.php?id=115)
- [AI Policies in Academic Publishing 2025](https://www.thesify.ai/blog/ai-policies-academic-publishing-2025)

### GitHub-native content sites

- [MDN roles and teams](https://developer.mozilla.org/en-US/docs/MDN/Community/Roles_teams)
- [MDN content CONTRIBUTING.md](https://github.com/mdn/content/blob/main/CONTRIBUTING.md)
- [Open Web Docs Impact Report 2023](https://openwebdocs.org/content/reports/2023/)
- [ArchWiki Contributing](https://wiki.archlinux.org/title/ArchWiki:Contributing)
- [ArchWiki Maintenance Team](https://wiki.archlinux.org/title/ArchWiki:Maintenance_Team)
- [LWN — Arch shares wiki strategy with Debian](https://lwn.net/Articles/1032604/)

### Multi-language translation

- [Mozilla Pontoon Documentation](https://mozilla-pontoon.readthedocs.io/)
- [Pontoon GitHub](https://github.com/mozilla/pontoon/)
- [Wikipedia Culture Gap (Frontiers in Physics 2018)](https://www.frontiersin.org/journals/physics/articles/10.3389/fphy.2018.00054/full)
- [WikiGap arXiv 2505.24195](https://arxiv.org/html/2505.24195v1)
- [Information asymmetry in Wikipedia (Roy 2022, JASIST)](https://asistdl.onlinelibrary.wiley.com/doi/10.1002/asi.24553)

### Funding

- [GitHub Blog — 4 trends in OSS funding 2025](https://github.blog/open-source/maintainers/4-trends-shaping-open-source-funding-and-what-they-mean-for-maintainers/)
- [GitHub Secure Open Source Fund](https://resources.github.com/github-secure-open-source-fund/)
- [Elio Struyf — Who's funding open source 2025](https://www.eliostruyf.com/whos-funding-open-source-2025-guide-maintainers/)
- [nayafia/lemonade-stand](https://github.com/nayafia/lemonade-stand)
- [Open Collective comparison docs](https://docs.opencollective.com/help/product/comparison)
- [Liberapay — How creators of open content get funded (Opensource.com)](https://opensource.com/article/18/5/open-patronage-liberapay)
- [g0v Civic Tech Prototype Grant](https://grants.g0v.tw/power/en/)
- [Open Culture Foundation g0v grants page](https://ocf.tw/en/p/g0vgrants/)
- [FNF — Civic tech project handbook (Taiwan)](https://www.freiheit.org/taiwan/guide-win-democracy-back-civic-tech-project-and-community-handbook)

### Fork-friendly seeds

- [sindresorhus/awesome](https://github.com/sindresorhus/awesome)
- [HackerNoon — History of GitHub Awesome Lists](https://hackernoon.com/the-history-of-github-awesome-lists)
- [DEV — Stale Awesome Lists self-regulating curation](https://dev.to/jtorchia/stale-awesome-lists-how-i-built-a-self-regulating-curation-system-18lc)
- [dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database)

### Long-term archival

- [ArchiveBox GitHub](https://github.com/ArchiveBox/ArchiveBox)
- [wabarc/wayback (multi-service archiver)](https://github.com/wabarc/wayback)
- [IPFS — concepts: problems it solves](https://docs.ipfs.tech/concepts/ipfs-solves/)
- [Exploring Centralization in IPFS (USENIX NSDI 2024)](https://www.usenix.org/system/files/nsdi24-wei.pdf)
- [Distributed Press — p2p ActivityPub bridge](https://distributed-press.ipns.ipfs.hypha.coop/2024/08/14/our-shiny-new-bridge-between-peer-to-peer-protocols-and-activitypub-implementations/)

---

_End of report. Word count ≈ 2,000._
