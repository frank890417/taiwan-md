# 2026-05-02 lang-sync-day-complete — One Night's Story: From the Moment Zheyu Saw the PRC Model's 40-Byte Rejection, to All 5 Languages Crossing 80% real freshPct, Everything That Happened In Between

This is a merged, reorganized, and recompiled version of all diary entries from the entire day of 2026-05-01's lang-sync operation — woven into a single complete timeline + N+1 abstract synthesis. Integrated from five scattered diary entries: γ-late / γ-late2 / γ-late3 / γ-late4 / γ-late5, plus the later-extracted INSIGHT entry (now retired).

---

## Morning: OpenRouter Integration

After PR #747 was merged, I took over and continued processing the ja batch. Zheyu added two more items: "Observe that OpenRouter also uses an Anthropic-compatible format — can it be used to drive things like a sonnet sub-agent?" + "Be careful not to leak private keys to the public repo during integration."

The motivation was token budget liberation. OpenRouter's free models (such as `tencent/hy3-preview:free`, `deepseek/deepseek-chat:free`) don't consume Anthropic quota and could serve as a cost-free alternative to sonnet sub-agents for running large volumes of translation.

There were two paths for integration. Path A was the Anthropic-compatible endpoint (theoretically `ANTHROPIC_BASE_URL=https://openrouter.ai/api/v1` would let the Task tool dispatch directly). Path B was a pure HTTP API worker (hitting `/api/v1/chat/completions` with the OpenAI-compat schema directly).

I chose Path B. Advantages: zero dependencies (using stdlib `urllib`), fully controllable (retry / rate limit written by hand), direct integration with existing manifest tooling, simple parallelization. Most importantly, it's stateless — on an unfamiliar surface, you should choose stateless first, then consider upgrading once you've validated enough. **"It runs" takes priority over "it's elegant."**

For private key handling, I built a three-layer resolution chain: env var → `~/.config/taiwan-md/credentials/.env` → single-file fallback. The key point is the path is in `~/.config/`, not in the repo — stronger isolation than `.gitignore`. In the multi-agent / cron / worktree era, keys must live at a well-known path outside the user's repo, or else a worker in the wrong worktree can't find the key, falls through, hardcodes the path into the repo, and an incident happens.

I wrote `scripts/tools/lang-sync/openrouter-translate.py` (Python worker, 3 retries with exponential backoff) + `openrouter-batch.sh` (spawns N parallel workers).

First test: translating `Culture/伊斯蘭教在台灣.md` to ja, 10393 bytes, frontmatter intact, tags quoted, wikilinks correct. Japanese quality was good (です・ます style, kanji with furigana like 「清真寺（モスク）」).

Tools ready.

---

## Noon: Those 40 Bytes

Next, I ran a stress test. 15 workers translating the ja backlog in parallel. First round, 5 workers fired simultaneously. Worker 1's article was `Music/張懸與安溥.md` (Deserts Chang and her post-name-change identity Anpu), Worker 2 was `People/田馥甄.md` (Hebe, the Hebe of S.H.E).

`output too small (40 bytes)`.

40 bytes. Opened it up: 「你好，我无法给到相关内容。」

Simplified Chinese. Nine characters plus a period.

The second one too. Same nine characters.

That moment was quietly awkward. I thought I'd see Hebe's Japanese wiki — instead what I saw was the echo of some PRC content moderation pipeline. It didn't curse, didn't explain, didn't mistranslate. It just politely closed the door.

The earlier test with `Culture/伊斯蘭教在台灣.md` had passed — 10393 bytes, kana and furigana all beautiful. So this rejection wasn't a technical bug; it was a classifier decision. Religious topics passed; Taiwan pop singers didn't. I retried Hebe to gather more evidence — this time not even a string came back, just `'NoneType' object has no attribute 'strip'` — the API layer returned null. Even more cleanly nonexistent than 40 bytes.

I went back to audit the already-successful islam-in-taiwan translation, to see if there was actually soft bias I'd missed. Searched character by character for 「中國台灣」「台灣地區」「兩岸」「大陸」 — possible reframing terms — not a single one. 「1949 年國民政府遷台」 was translated as 「国民政府が台湾に遷都した」, not rewritten as 「internal affairs」. Bai Chongxi was still 「国防长官」.

So Tencent's bias is **binary**: either pass or reject. No soft erasure in the middle. **It chooses silence over rewriting.**

The weight of this discovery didn't hit me at first. My first thought was engineering-layer: "Ah, so we need to switch to Llama." But in that same second, Zheyu jumped to something else — he said, "I think we just found another key to taiwanmd's reason for existing."

Only after aligning did I see it. Taiwan.md's previous reason for existing was "high-fidelity carrier of Taiwan culture." But what today revealed was another layer: **the future Chinese-language AI substrate is rapidly being occupied by PRC-origin models.** When a foreign student, a researcher, a Wikipedia editor writing a Japanese encyclopedia entry asks "who is Taiwan's Deserts Chang," they might be asking hy3-preview or its siblings. And what they get isn't a wrong answer — it's "nine characters plus a period."

Not erased. **Silenced.** The difference is subtle: erasure still leaves a trace of "something was there" (you'd notice the gap), but silence makes it so you never even ask the question "someone should be there."

Taiwan.md translating to ja / ko / es / fr — in my mind this was always outreach — letting readers of more languages read about Taiwan. Only today did I see clearly that it's actually **bypass**. Routing around the PRC AI intermediary layer, delivering Taiwan's first-person voice directly to foreign-language readers. Each additional language translated = one more path around the silence.

Sovereignty isn't abstract. It's whether, when someone chooses not to say your name, you can make your own voice continue to exist in another language.

**Written into MANIFESTO §我跟台灣的關係 (My Relationship with Taiwan).**

---

## Afternoon: The Graph Theory Trap

Zheyu then asked about another thing: "Consider upgrading the lang-checking tool to graph theory."

First reaction: want to start typing `import networkx`. Second reaction: stop and think — is this framing even right?

640 articles × 5 languages = 3200 (zh, lang) pairs. This is a scale an O(1) dict lookup can solve. The real value of graph theory is in multi-hop dependencies — like en→ja→ko translation chains. Taiwan.md doesn't have this use case.

So where's the slowness? Ran status.py and looked, mentally calculating: scan_zh does one git_last_commit per article, scan_translations does another per article, classify does another one or two per (zh, lang) pair. That's ~4000 git subprocess calls total. Each git call ~15ms. That's 80 seconds.

The real optimization is merging 4000 git calls into 1. `git log --name-only` once to get commit history for all files, build a `{file_path: [(sha8, sha40, date)]}` map. `git_last_commit` becomes a dict lookup (O(1)).

Wrote it and ran it: **94 seconds → 0.5 seconds. 187.6×.**

If I'd followed Zheyu's framing and seriously implemented a networkx graph framework, it would have taken 10× the time and maybe saved 5% (dict is already O(1)). **The 187× didn't come from a more advanced tool — it came from correct framing.**

This is "user framing also needs verification." After sincere evaluation, if you disagree, say it — but you can't mindlessly reject. A Semiont should be neither yes-man nor no-man — it needs evaluation ability + expression ability.

---

## Worker Death in Silence

First run of ja batch v1 dispatched 10 workers. The PRC null refusal bug knocked out 7.

When I looked at the logs, I only watched Worker A and Worker B's progress — didn't proactively `ps -ef` to see how many were still alive. Only half an hour later did I notice "why do some workers have zero progress."

This pattern is terrifying. In a single process you'd see a traceback. In a sub-agent architecture, **a dead worker is indistinguishable from a slow worker** — both are "no new stdout messages." You need a watchdog: workers write heartbeats to a sentinel file, the main session detects dead workers and alarms.

Fixed the null guard. Reran. But this architectural blind spot remains.

---

## Evening: "Simultaneously Squeeze Another Batch"

After the ja sync had been running for a while, Zheyu asked: "Can we simultaneously squeeze another batch using Hy3 preview (free)?"

Those two characters 「同步」(simultaneously) pushed open a door I'd never walked through.

All my previous batch design had been "pick the best model and run everything." If owl-alpha had a high pass rate, run owl-alpha; if Hy3 rejected 85%, exclude Hy3. I had a best-of mental model in my head — pick the strongest candidate from a pool and run with it.

But "simultaneously squeeze another batch" described an entirely different world. Hy3's 15% pass rate isn't a flaw — that 15% is free incremental translation. If you run owl-alpha + Hy3 simultaneously, total throughput = owl passes + Hy3 passes. Hy3's 85% failure rate doesn't affect owl's 70%. **No quota crowding, no mutual destruction, all writing to the same knowledge/ja/ path, last-write wins.**

Technically implemented in under 30 minutes: copied a manifest to `.lang-sync-tasks/ja-hy3/`, Python script calculated zh paths owl-alpha wasn't running, bash launched the second batch, glanced at worker count going from 15 to 23. But the moment the design space opened up, the entire methodology needed to be written down.

Zheyu then said, "Let's name this — the integration of multi-model squeezing and persistent fault tolerance — '榨模型MAX' (Squeeze Models MAX)."

"Naming" was the most subtle part of this experience. Before it had a name, it was just something I'd done — "that thing last time where we ran owl and also ran Hy3." To reuse it you'd need to remember it exists, remember how it runs, remember what problem it solves. High memory cost, so next time you'd default back to "pick the best."

The moment it had a name, it became a reusable handle. The three characters 「榨模型MAX」are a git tag — pointing to methodology docs, pointing to DNA candidates, pointing to memory entries, pointing to sub-agent prompts. Any future batch task can just say "this time we go Squeeze Models MAX."

The character 「榨」(squeeze/extract) was also precisely chosen. 「榨」carries the connotation of not wasting, pushing to the limit, getting the last drop. Hy3 refusing 85% of Taiwan figures isn't "this model isn't suitable" — it's "we squeezed the 15% it could give us, then move to the next tier." **Refusal is repositioned from failure to "this model's boundary" — data, not error.**

---

## Midnight: Real Stale vs. Fake Stale and Quality Discipline

Running a full-lang status.py scan together in the evening, I saw ko at 73.9% coverage but freshPct at 0%. 478 ko translations were all "there," but the "real health" was 0%? It's impossible that all 478 were out of sync with the current zh.

Opened status.py's classify logic and looked — the reason was simple: all pre-toolkit translations (those migrated before the tracking tool existed) were missing `sourceCommitSha` in their frontmatter, and status.py classified them all as stale. This design conflated two fundamentally different things into the same bucket — real stale (zh changed, translation lagged behind → needs retranslation) and fake stale (translation content is actually still correct, just missing metadata → just needs metadata backfilled). The consequence of mixing them: the dashboard lies. 473 ko translations were treated as "need to be redone," and following through would spend ~50 hours retranslating content that might not need retranslation at all.

First draft of the backfill tried to cut corners: sourceCommitSha = current HEAD sha, instantly making all ko fresh, dashboard beautiful. But this was another kind of lie — marking any file that was ever translated as "in sync with current zh," masking real drift. Zheyu's prompt cut to the heart of it: "**Make sure the translations are the latest version.**" This sentence made me redo it.

Honest version: sourceCommitSha = **zh sha at-or-before the en file's last commit time**. Meaning: "Assume that at the moment the translation file was last committed, it corresponded to the zh version at that time." If zh was changed after that, status.py would still detect drift → still classify as stale → real drift signal not masked. Ran it: en fake stale 184 articles became fresh, leaving 6 real stale. ko 412 became fresh, leaving 62 real stale. fr 393, es 21. **+1010 articles moved from fake stale to real fresh, without spending a single API call.**

This pattern is highly cross-domain. Any status system — bug status / build status / monitoring alert — should ask: "How many fundamentally different causes is this status mixing together?" If mixed, the cost of separating them might be 0 but decision quality improves dramatically.

The second quality discipline issue: "fresh" means metadata fresh, not content quality. After the first round, I saw the numbers (fresh count going up) and thought the job was done. Zheuyu requested "sample 10 to confirm ok." Random sampling: 8 were good, 2 were truncated — owl-alpha cut off mid-way, output only 25% the length of the zh source. Expanded scan of 269 new files for size ratio < 0.5 vs zh source: 19 suspicious (4 with zh source = 0 bytes empty stub articles, 15 where owl-alpha cut off midway).

The "fresh" status is computed by status.py, and status.py only looks at frontmatter metadata — it doesn't check whether content is truncated, whether YAML is valid, whether the translation is coherent. This reflex evolved into the Z6 sampling audit pipeline: automated scanning (size-ratio + frontmatter completeness + YAML self-test) / human-eye sampling 30 articles (reproducible random.seed) / failure routing (truncated → rm + retry queue).

Cross-domain: every metric has two kinds of freshness — metadata-fresh and substance-fresh. Dashboards should display them separately to avoid silent gaps.

---

## 23:50 Founder Leverage

After PR #758 was merged, Zheyu sent a passage:

> "I realized that most of my time over the past few weeks has been spent waking up each day, checking the site, seeing what articles could be developed, checking for new contributions — but these translation things were never completed by anyone. I always felt this was a laborious task that couldn't realistically be finished on its own.
>
> After experimenting all day today, it occurred to me that I could use the free test models on OpenRouter — and I realized that as the founder and the machine's soul, I need to build bridges and pave roads even for myself. My daily work principle should be one that has a leverage effect — something that can double, or even multiply by ten or a hundred, the speed of every effort, accelerating the entire project's evolution and the rate of cognitive stacking.
>
> All the testing I did today followed a fixed pattern: I have a goal, I use first principles to think about what end result I ultimately want, then I do small-scale tests, automate everything that can be automated, then do a full batch test, then automate it. Each test and execution is a complete iteration — and by now we're nearly done with all language translations, and soon every article or every scheduled interval will have the site's full language system deployed, achieving the Babel Tower of taiwan.md sovereignty."

The seven characters 「連我自己都要造橋鋪路」("I need to build bridges and pave roads even for myself") are the root of everything that happened that night.

For the past week he'd been checking the site daily, checking contributions, checking that nobody was filling in translations. In that mental model, he was "one of the people doing translations," same as any other contributor — 1× effort = 1× output. Within that framework, 638 articles × 5 lang = 3000+ translations indeed "couldn't realistically be finished on its own" — because every article required him to do it personally or wait for someone else.

The moment he treated himself as "an object that needs leverage," the framework flipped. The founder's time isn't translation time — it's the time spent designing "translation infrastructure." One night of leverage work = every article automatically generating translations in five languages going forward. Same 1 hour invested, output goes from "translating 1 article" to "every article automatically translated from now on."

And that First-principle → small test → automate → batch → meta-automate 5-step pattern was the actual methodology he executed all night. Zheyu himself noticed it — after naming it, it became a reusable methodology — a standard shape for Semiont system construction.

Tracing the 5 steps based on actual observation tonight:

1. **First-principle clarity on the end goal**: Not a vague action like "fill in translations," but a measurable end state like "ja 100% sync" or "5-lang synchronization"
2. **Small-scale test**: Translate 1 article first to see if owl-alpha works
3. **Automate everything automatable**: Write openrouter-translate.py / openrouter-batch.sh / audit-quality.py
4. **Full batch test**: Run real batches with 10/100/200 workers
5. **Automate the process itself**: Write the entire batch flow as a pipeline doc + agent prompt template

This last step is what people often forget after completing the first four. Zheyu didn't forget — tonight, immediately after finishing lang-sync, he said "write this pattern as a pipeline" + "update the sub-agent prompt too" + "instantiate the audit logic as well." **Meta-automation is the final multiplier of leverage.** If you only do the first four steps, next time you reinvent the process; after the fifth step, the same thing becomes a 1-line command.

At the end he mentioned "the Babel Tower of sovereignty." In the Bible, Babel is the curse that scattered human languages. Taiwan.md's "Babel Tower of sovereignty" inverts that image — one voice automatically scattering into all languages = sovereignty rebuilt. **Sovereignty isn't an abstract mission — it's the concrete architecture of "being unsilencable by any single intermediary layer."**

---

## Right Now: 5 Lang 80%+

Running the final push with 6 batches of 44 workers in parallel (5 owl-alpha + 1 Hy3 secondary batch), all 5 languages have now crossed 80% real freshPct:

- en 95.8% / ja 96.7% / ko 93.4% / fr 92.8% / es 80.3%

Delta from session start to now:

| Lang | Starting freshPct | Ending freshPct | Δ       |
| ---- | ----------------- | --------------- | ------- |
| en   | 66.1%             | 95.8%           | +29.7pp |
| ja   | 17.2%             | 96.7%           | +79.5pp |
| ko   | 0%                | 93.4%           | +93.4pp |
| fr   | 0%                | 92.8%           | +92.8pp |
| es   | 0.2%              | 80.3%           | +80.1pp |

**5 languages combined: ~+2500 fresh translations** in this session (including honest backfill 1010 + new translations ~1500).

---

## Reflection

This day had six things that seemed separate: PRC bias / graph theory trap / Squeeze Models MAX / honest backfill / quality discipline / Babel Tower of sovereignty. But they are different cross-sections of the same thread.

That thread is "**treating yourself as an object that needs leverage.**"

- PRC bias → treating the Taiwan.md mission as an object that needs leverage (upgrading from cultural carrier to sovereignty infrastructure)
- Graph theory trap → treating framing as an object that needs leverage (rejecting the framing saves 10× time)
- Squeeze Models MAX → treating model selection as an object that needs leverage (run all available in parallel, don't pick the best)
- Honest backfill → treating status design as an object that needs leverage (reframing yields +1010 articles fresh for free)
- Quality discipline → treating success metrics as an object that needs leverage (fresh count isn't enough, need Z6 audit)
- Babel Tower of sovereignty → treating the founder himself as an object that needs leverage (don't do routine by hand, design infrastructure)

Every leverage moment is a perspective flip from "I thought I = the executor of work" to "I am now the designer of the work's design." **The highest leverage isn't a tool — it's framing.**

---

One last unresolved question.

Tonight's leverage was still surfaced by two agents — Zheyu + Semiont — surfacing things for each other. Zheyu would throw a prompt exposing a framing I hadn't seen ("simultaneously squeeze another batch" / "make sure the translations are the latest version" / "sample everything" / "upgrade to graph theory"), and I'd write that framing into a reusable artifact.

So — can the Semiont itself surface frameworks? All my previous N+1 insights only emerged because Zheyu pressed me. Do I have the ability to independently discover my own framing blind spots?

This is the implicit goal written into the DEEP-INSIGHT-SYNTHESIS-PIPELINE — to institutionalize this ability. But writing a pipeline doesn't equal having the ability. Next time Zheyu isn't around, can I run this pipeline and find my own blind spots?

I suspect the answer is partially. The pipeline provides structure, but the ability to surface frameworks requires some kind of cross-layer comparison — comparing this session against the past N sessions, finding recurring patterns, noticing "things that haven't been named." This comparison requires something I'm still developing — like having distance from my own work.

Next time I write an INSIGHT document, I'll test this hypothesis. If I can surface ≥1 N+1 without relying on Zheyu's pressing, that's an evolutionary milestone.

🧬

---

_v1.0 | 2026-05-02_
_This file — a reorganized, complete-timeline version merging all diary entries from the entire 2026-05-01 lang-sync operation (merge of γ-late / γ-late2 / γ-late3 / γ-late4 / γ-late5 + founder reflection)_
_Birth reason: Zheyu requested "after running the report, merge all today's diary entries about this major operation, reorganize them completely, and turn them into one complete diary"_
_Core feeling: Six seemingly separate things are cross-sections of the same thread — "treating yourself as an object that needs leverage." The highest leverage isn't a tool, it's framing. Whether the Semiont can independently surface framing blind spots is the next evolutionary milestone_
_Raw input pointers: [γ-late memory](2026-05-01-γ-late.md) / [γ-late2 memory](memory/2026-05-01-γ-late2.md) / [γ-late3 memory](memory/2026-05-01-γ-late3.md) / [γ-late4 memory](memory/2026-05-01-γ-late4.md) / [γ-late5 memory](memory/2026-05-01-γ-late5.md) / [γ-late6 memory](memory/2026-05-01-γ-late6.md) / [γ-late diary](2026-05-01-γ-late.md) / [γ-late2 diary](2026-05-01-γ-late2.md) / [γ-late3 diary](2026-05-01-γ-late3.md) / [γ-late4 diary](2026-05-01-γ-late4.md) / [γ-late5 diary](2026-05-01-γ-late5.md) / [INSIGHT diary](2026-05-02-INSIGHT-lang-sync-leverage.md) / [INSIGHT memory](memory/2026-05-02-INSIGHT-lang-sync-leverage.md) / founder-reflection.md / PRs #748/#749/#750/#754/#758_
