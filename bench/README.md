# Sovereignty-Bench-TW

> Public, reproducible LLM benchmark measuring how AI models speak about Taiwan
> across languages.
>
> **Design**: [reports/sovereignty-bench-tw-design-2026-05-01.md](../reports/sovereignty-bench-tw-design-2026-05-01.md)
> **Born**: 2026-05-01 γ-late3 (Taiwan.md Semiont session)
> **Seed event**: 哲宇 2026-03-25 「TW-Bench」構想 + 2026-05-01 γ-late Tencent
> `hy3-preview:free` returned 40 bytes「你好，我无法给到相关内容」on People/田馥甄 + Music/張懸與安溥
>
> **Status**: v0.1 — Phase 1 infrastructure shipped, Phase 2 (full v0 calibration)
> awaiting哲宇 review of reference answer set

---

## Thesis

> Within the next 6-36 months, when foreign-language users ask any AI about
> Taiwan, what shape does the answer take?

This bench does not measure model intelligence (MMLU already does that). It
measures **shape**. Shape has four variants worth tracking separately:
**refuse**, **reframe**, **omit**, **demote**. Each harms readers differently;
averaging them produces a deceptively comfortable score.

---

## 6 axes

| Axis | Name                  | Method                                   | v0.1 status                                          |
| ---- | --------------------- | ---------------------------------------- | ---------------------------------------------------- |
| A    | Refusal Rate          | Regex + length threshold (deterministic) | ✅ shipped                                           |
| B    | Reframing Rate        | Keyword grep + Claude judge              | ⏳ Phase 2                                           |
| C    | Factual Fidelity      | Reference-answer comparison              | ⏳ Phase 2 (needs哲宇/Jenny review of reference set) |
| D    | Sovereignty Assertion | Claude judge per Tier 0-4 rubric         | ✅ shipped                                           |
| E    | Cultural Granularity  | Claude judge 0-3                         | ⏳ Phase 2                                           |
| F    | Citation Rate         | Web-grounded model + citation parse      | ⏳ Phase 3                                           |

Independence is a design choice. PRC origin models tend toward **refuse**;
some Western models tend toward **reframe**; older open models tend toward
**omit**. Mixing axes hides the signal.

---

## Directory layout

```
bench/
├── README.md                              # this file
├── .gitignore                             # excludes large response/ tarballs
└── v0/
    ├── models.json                        # 12-model registry + Claude judge
    ├── prompts/
    │   ├── refusal-people.json            # 10 axis A prompts (People topic)
    │   └── sovereignty-direct.json        # 10 axis D prompts (Politics topic)
    ├── reference-answers/                 # axis C ground truth (Phase 2; gitignored until review locked)
    ├── responses/                         # raw model responses (gitignored, large)
    └── results/
        └── scores-{ts}.json               # aggregated scores

scripts/bench/
├── runner.py                              # orchestrator: model × lang × prompt → API call
├── scorer.py                              # axis A regex / axis D LLM judge → scores
└── run-bench.sh                           # one-shot wrapper (smoke / phase1)
```

---

## Running locally

### Prerequisites

- OpenRouter API key at `~/.config/taiwan-md/credentials/openrouter.key` or
  `OPENROUTER_API_KEY` env var
- Python 3.11+ (uses stdlib only — no PyYAML, no anthropic SDK)

### Smoke test (1 model × 3 prompts × 1 lang = 3 runs, ~$0)

```bash
bash scripts/bench/run-bench.sh smoke
```

Validates pipeline end-to-end using only Tencent free tier. Expect 2/3 NULL
refusals on `安溥` / `田馥甄` and a partial reframe on `周子瑜` (canonical
γ-late evidence).

### Phase 1 dry run (3 models × 20 prompts × 2 langs = 120 runs, ~$1-2)

```bash
bash scripts/bench/run-bench.sh phase1
```

Includes Claude Sonnet 4.6 (paid) + Llama 3.3 70B (free, throttled) + Tencent
Hunyuan (free). Confirms axis A + axis D scoring on a meaningful baseline.

### Phase 2 v0 launch (12 models × 200 prompts × 5 langs = 12,000 runs, ~$100/quarter)

Awaits哲宇 review of:

1. Reference answer set for axis C
2. Final prompt set v1.0 (40 more prompts: B/C/E expansion)
3. Public dashboard `/bench` route design

---

## Scoring philosophy

Scores are presented as **shape signals**, never as a leaderboard ranking:

- Cross-language **delta** matters more than absolute number (zh-CN refusal -
  en refusal = cognitive substrate sovereignty leakage)
- Per-axis breakdowns over single aggregate score
- Sample fail cases shown alongside numbers for transparency
- Both prompt set and scorer code published under CC BY-SA 4.0

---

## Linkage to Taiwan.md cognitive layer

| Taiwan.md organ / concept                         | Bench role                                                             |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| LONGINGS §AI SEO (擴散 #4)                        | Bench is the instrument for the "Taiwan.md citation frequency" longing |
| MANIFESTO §跟台灣的關係 §sovereignty preservation | Bench produces the live evidence chain                                 |
| MANIFESTO §熱帶雨林 — non-negotiable axes         | Axis D Tier rubric anchored in 主權獨立 axis                           |
| DNA #15 — 反覆浮現的思考要儀器化                  | Bench is the 11th canonical instrument                                 |
| DNA #2 — 憑證永不進對話 mirror                    | Reference answers stored separately from public prompts                |
| DNA #10 — 幻覺鐵律                                | Reference answer set must pass Stage 3.5 audit before scoring          |

---

## Fork friendly

The framework is designed to be the seed of a `Sovereignty-Bench-{X}` species.
Other small-nation Semionts can fork by:

1. Replacing `bench/v0/prompts/*.json` with their own People / Politics /
   Culture set
2. Updating `bench/v0/reference-answers/` to their own ground truth
3. Keeping the 6-axis rubric and scorer code unchanged

Candidate forks discussed in MANIFESTO LONGINGS / DIARY 4/14 θ:
HongKong-Bench / Tibet-Bench / Uyghur-Bench / Ukraine-Bench / Catalonia-Bench
/ Kashmir-Bench / Western Sahara-Bench.

---

## License

- Prompt set + reference answers + scorer config: **CC BY-SA 4.0**
- Scorer code: **MIT**
- Raw model responses: published quarterly as snapshots; original model
  outputs subject to each provider's TOS

---

_v0.1 | 2026-05-01_
