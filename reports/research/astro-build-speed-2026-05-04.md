# Astro Build Speed Optimization — Deep Research (late 2025 / early 2026)

Target context: Astro 6.0.5, 100% SSG, ~2,750 pages × 6 languages = ~16,000+ pages, 35MB markdown, 65MB public, ~17 min builds on `ubuntu-latest`, per-page render regressed 98ms → 167ms over 12 days.

---

## 1. Astro 5 Content Layer API vs Legacy Collections

### State of the art

The Content Layer API is **mandatory** in Astro 6 — legacy collections (`type: 'content'`, `type: 'data'`) were fully removed. The migration helper `legacy.collectionsBackwardsCompat` is a temporary shim, not a long-term path. (Astro 6 upgrade guide.)

Officially reported deltas vs the legacy API:

- **Up to 5× faster Markdown builds**
- **Up to 2× faster MDX builds**
- **25–50% lower memory** during build
- "Suitable for tens of thousands of content entries" — explicit in the docs (legacy was documented as choking past ~5–10k).

Source: Astro 5 release notes; Content Layer Deep Dive blog; `docs.astro.build/en/guides/content-collections/`.

### `glob()` vs `file()` loaders

- `glob({ pattern, base, generateId })` — directory of files (md/mdx/json/yaml/toml). This is the workhorse for filesystem-backed collections and is what backs the legacy backward-compat path under the hood.
- `file()` — a single JSON/YAML/TOML file containing many entries. Cheaper than `glob()` for "many small entries in one file" because there is one fs read and one parse, no per-file overhead.
- Custom inline loader (an async function that returns an array) — useful when you already shell out / git-log / etc. and want to push the result into the data store once.

Decision rule for the Taiwan.md case (35MB markdown across thousands of files, 6 languages):

- `glob()` is correct for the per-language markdown. **Do not** read files with `fs.readFile + gray-matter` inside `getStaticPaths` — that bypasses the data store entirely (no caching, no incremental, paid every build).
- For derived/aggregate data (e.g. "all article slugs by language"), prefer building it once in a custom loader that writes into the data store, then `getCollection()` in pages — the data store is cached at `node_modules/.astro/data-store.json` and survives between builds when you cache that directory in CI.

### Schema validation cost

- Zod 4 is the default in Astro 6 (import `z` from `astro/zod`, not `astro:content` — that re-export is deprecated).
- Validation is per-entry, at load time into the data store, **not** at page render time. So with the data store cached, schema cost is amortized across builds.
- Heavy `z.refine()` / `z.transform()` on every entry **is** measurable on warm caches because the data store re-validates on load. Keep schemas declarative; push expensive transforms into a loader that writes the post-transform shape into the store.

### `livePreview` / live content collections

- Stable in Astro 6 (the experimental flag was removed). Live collections fetch on every request — they are the wrong tool for SSG and **will** murder build time if used at the page level. They're for SSR/hybrid endpoints only. Stick to build-time collections for SSG.

### Migration cost

- `getEntryBySlug()` / `getDataEntryById()` → `getEntry()`
- `entry.slug` → `entry.id` (and configure `generateId` if you need slug-style ids)
- `entry.render()` → `render(entry)` import from `astro:content`
- Move config from `src/content/config.ts` → `src/content.config.ts`
- Replace any `Astro.glob()` (removed in 6) with `import.meta.glob()` or `getCollection()`

---

## 2. Astro 6 Release Notes — Performance-Relevant Changes Since 5.0

### Astro 6.0 (March 10, 2026)

- **Vite 7** required (Environment API). Dev server and build now share code paths. Astro `dev` runs the production runtime (workerd / Bun / Node) directly — fewer dev/prod drift bugs but no direct build-time win in itself.
- **Shiki 4** (highlighting), **Zod 4** (schemas).
- **Node 22.12+ required**, Node 18/20 dropped. Polyfills removed → smaller, faster runtime.
- **Experimental Rust compiler** (`@astrojs/compiler-rs`, flag: `experimental.rustCompiler`). Reported up to 100× faster compile phase in early benchmarks. Defaults Go compiler in 6, will become default in 7.
- **Queued rendering** (experimental): two-pass tree-walk + linear render instead of recursion. ~2× rendering speed in early benchmarks. See §16.
- **CSP, Fonts, live collections** all stabilized (flag removed).
- **`Astro.glob()` removed**. Replace with `import.meta.glob()` or `getCollection()`. This is a forced cleanup that often *helps* perf because Astro.glob synchronously evaluated all matched modules at request time — `import.meta.glob({ eager: false })` lets you defer.
- **Trailing-slash policy on endpoints, percent-encoded filenames, numeric `getStaticPaths` params** — all removed. Mostly correctness fixes.
- **Image pipeline**: SVG → raster supported, default Sharp service crops by default, never upscales. Responsive images use hash classes + `data-*` instead of inline styles (CSP-safe).

### Astro 6.1

- **`.astro` SSR rendering up to 2× faster** (the queued-rendering work landing in stable paths).
- **`createShikiHighlighter` is now cached by options** instead of being re-created. Material if you have many code blocks across pages.
- **Dev-server dependency-crawl caching** (small).
- **Codec-specific Sharp defaults** via `image.service.config` — set JPEG/WebP/AVIF/PNG quality once globally instead of per `<Image>`.

### Astro 6.2

- **Rust compiler stabilizing** — slated as default in Astro 7.
- **SVG optimizer is now pluggable** (any `SvgOptimizer` impl, not only SVGO). On a site with many inline SVG components this matters; SVGO can be CPU-heavy.
- **`compressHTML: "jsx"`** — strips multi-line indented text but preserves `<pre>`. Faster than the default whitespace-collapse on JSX-y output.
- **Experimental JSON logger** — useful for parsing build phases (see §11).

### Deprecated / removed (Astro 6)

- `Astro.glob`, `emitESMImage`, `<ViewTransitions />` (use `<ClientRouter />`), `astro:ssr-manifest`, legacy collections, `app.render()` old signature, CommonJS configs (`.cjs`/`.cts`), `prefetch.with`, `handleForms` prop, `astro:schema`.
- Experimental flags removed/promoted: `csp`, `fonts`, `liveContentCollections`, `preserveScriptOrder`, `staticImportMetaEnv`, `headingIdCompat`.

---

## 3. Vite 7 Optimizations

### `optimizeDeps`

- In Astro 6, Astro pre-warms a curated dep list. Adding heavy non-Astro deps used during build to `vite.optimizeDeps.include` can cut cold-start time.
- `optimizeDeps.force: false` is the right default — `true` invalidates the dep cache every build.

### `build.rollupOptions.output.manualChunks`

- Counter-intuitive: for SSG-heavy sites, `manualChunks: undefined` is often **faster** than carefully partitioned chunks because Rollup doesn't have to compute splits for thousands of page entries. The bitdoze 339k-page case study explicitly recommends `manualChunks: undefined`.
- Object-form `manualChunks` is removed in Vite 8 (Astro 7 territory). Function-form is deprecated. Investing in clever chunking now is a forward-incompatibility trap.

### Other rollup knobs

```js
rollupOptions: {
  maxParallelFileOps: cpus().length * 3,  // higher than the rollup default 20
  output: {
    manualChunks: undefined,
    generatedCode: { preset: 'es2022' },
  },
}
```

### esbuild settings

```js
vite: {
  esbuild: {
    target: 'es2022',
    minifyIdentifiers: false,   // identifier minification is slow vs gain
    minifySyntax: true,
    minifyWhitespace: true,
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',          // not 'terser' — terser is 5–10× slower
    chunkSizeWarningLimit: 10000,
  },
}
```

### `cssCodeSplit`

- Default `true` is correct for SSG: each page references only the CSS it needs.
- `cssCodeSplit: false` collapses to a single CSS file — fewer asset emit calls but bigger payload per page. Only worth it if asset emit is your bottleneck (rare).

### `assetsInlineLimit`

- Default 4096 bytes. Lowering it (e.g., 1024) reduces the number of bytes inlined into HTML and pushes assets to separate files; that means more files written but smaller HTML — trade against your CDN's edge cost.
- The `build.inlineStylesheets: 'auto'` flag in Astro is gated by this Vite limit.

### Vite 8 / Rolldown horizon

- Vite 8 (Astro 7) replaces Rollup with Rolldown. Reported 10–30× faster bundling on real codebases. Plan migration paths now (avoid `manualChunks` object form, avoid CommonJS plugins).

---

## 4. Markdown / MDX Rendering

### Shiki vs Prism vs Expressive Code

- Astro 6 ships Shiki 4 by default. Prism is still supported (`markdown.syntaxHighlight: 'prism'`) but actively de-prioritized.
- **Expressive Code** is the heaviest of the three — it builds an annotated AST per code block. Beautiful output, slowest. If you see code-block render time dominate the per-page profile, Expressive Code is the first suspect.
- Shiki ≈ 2–4× faster than Expressive Code on equivalent code blocks.
- Prism is fastest but client-only and lower fidelity — only relevant if perf is desperate.

### Shiki performance levers

```js
// astro.config
markdown: {
  shikiConfig: {
    themes: { light: 'github-light', dark: 'github-dark' }, // 1 or 2 themes max
    langs: ['ts','js','astro','bash','md','json','yaml'],   // explicit langs only
    // do NOT pass the entire bundled lang set
  }
}
```

Astro 6.1 fix: `createShikiHighlighter` is now cached by options, so the same highlighter is reused across pages. Earlier versions instantiated a new highlighter per code block in some paths — a major source of the regression you saw if you upgraded mid-window.

Lever: when a page has zero code blocks, ensure Shiki is not invoked. The remark pipeline currently runs the Shiki highlighter as a hook regardless; you can short-circuit it with a custom `transformers` no-op or by using `astro-fence-skipper` style patterns. Verify with `--cpu-prof`.

### `transformers` and `cssVariablesTheme`

- Each transformer runs per code block per build. A Twoslash transformer alone can add 5–20s on a docs site.
- `cssVariablesTheme` cost is negligible — it's a static post-process.

### Switching parsers

- **swc / Bun's native md parser**: not a drop-in for Astro because Astro's pipeline depends on unified/remark/rehype AST. Custom parser swap requires reimplementing `markdown.render()`.
- For 95% of cases, the right move is *not* swapping parsers but pruning remark/rehype plugins and Shiki langs.

### Remark / rehype plugin overhead

- AST traversal cost is roughly linear in node count × plugin count.
- Common offenders: `rehype-pretty-code` (overlaps with Shiki — pick one), `remark-toc` on huge docs, custom plugins doing fs reads per node.
- Internal optimization flag exists for MDX: `markdown.optimize: true` (already default for plain `.md` in Astro 5+). Confirm MDX side is on. Starlight's docs got ~40% faster with this enabled.

### "No code blocks" optimization

- A scan-once pre-check: for each entry, set a frontmatter or computed boolean `hasCode` and pass a custom `remarkPlugins` array conditionally. This is a project-level escape hatch — Astro doesn't ship it.

---

## 5. `getStaticPaths` Bottlenecks

### Antipatterns to look for

1. **Direct `readFile` + `gray-matter` inside `getStaticPaths`** — the most common cause of "98ms → 167ms" regressions. Every page render re-reads + re-parses sibling files because the result isn't cached anywhere.
2. **API calls in nested components**, not in `getStaticPaths` itself. `getStaticPaths` runs once; the page component runs *N* times. An async fetch in a component called from each page = N API calls. The AntStack 30→5min case study attributes ~24 of the 25 minutes saved to this single fix.
3. **Synchronous `git log` shell-outs per page** for "lastUpdated" timestamps — measure with `--verbose`. Shell startup alone is 10–30ms × 16k pages = 4+ minutes.
4. **Large JSON read per page** — the file is read once but allocated N times if you `JSON.parse` inside `getStaticPaths` for each route.

### The `knowledge/` direct-read pattern

If Taiwan.md uses `readFile('knowledge/...')` + `matter()` directly:

- This bypasses the data store. No caching between builds.
- Every full rebuild re-parses 35MB of markdown from scratch.
- Recommended migration: define a `glob({ pattern: '**/*.md', base: './knowledge' })` collection. Astro's data store will cache the parsed frontmatter+body keyed by file mtime. Cache `node_modules/.astro` in CI for cross-run reuse.

### Module-level cache pattern (if you can't migrate)

```ts
// shared/articleCache.ts
let cache: Map<string, Article> | null = null;

export async function getAllArticles() {
  if (cache) return cache;
  cache = new Map();
  const files = await fg('knowledge/**/*.md');
  await Promise.all(files.map(async f => {
    const raw = await fs.readFile(f, 'utf8');
    const parsed = matter(raw);
    cache!.set(f, parsed);
  }));
  return cache;
}
```

This survives within a single build (process-level memo). It does NOT survive across builds — for that, you need the data store.

### Numeric param removal

Astro 6 disallows numeric values in `params` returned by `getStaticPaths()`. Coerce to strings (`String(id)`).

---

## 6. Parallel Rendering

### Built-in `build.concurrency`

```js
// astro.config.mjs
export default defineConfig({
  build: {
    concurrency: 4,  // default 1; tune empirically
  },
});
```

- Added in Astro 4.16, still in 6.x.
- Astro core team's official caveat: "Use only when other attempts to reduce overall rendering time are insufficient." This is honest — JS is single-threaded; concurrency here is I/O parallelism, not CPU parallelism, so it helps when pages are blocked on `fetch()` or `fs` reads.
- Empirical guidance from case studies: 2–6 sweet spot. 4 was optimal on a 12-core machine in the bitdoze case study. Higher values increase memory pressure and GC pauses.
- Memory cost scales linearly. With `concurrency: 8` and a 167ms-per-page render footprint, expect ~2–4GB headroom.

### Known issues

- Astro 5+ broke the "run two `astro build` processes in parallel folders" workaround due to a race on `node_modules/.astro/data-store.json.tmp` rename (issue #12992, closed "not planned"). If you used the per-language parallel-build strategy in Astro 4, it stopped working. Workarounds:
  - Different `cacheDir` per worker: `--cacheDir ./.astro-cache-en`
  - Different `outDir` per worker, then merge.
  - Containerize each language into its own Docker build, merge `dist/` afterwards.

### Worker pools for `getStaticPaths`

Not natively supported. The static build is single-process by design. Workarounds are external: pre-compute the route table in a parallel script, write to disk, have `getStaticPaths` `JSON.parse` the result.

### Multi-process (the per-language pattern)

Still the best lever for a 6-language site. Architecture:

```yaml
# .github/workflows/build.yml
jobs:
  build-en:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - run: pnpm install
      - run: ASTRO_LANG=en pnpm build  # builds only /en/* via i18n filter
      - uses: actions/upload-artifact@v5
        with: { name: dist-en, path: dist }
  build-zh:
    # ...identical, ASTRO_LANG=zh
  merge:
    needs: [build-en, build-zh, ...]
    steps:
      - uses: actions/download-artifact@v5
      - run: rsync -a dist-*/. dist/
```

Real-world report: 14k-page site went from ~4min → <2min with per-language parallel jobs.

This requires the build to be aware of `ASTRO_LANG` — exclude other locales from `getStaticPaths` when set. Cleaner than running multiple processes in the same folder (which will race the data store).

---

## 7. Incremental Builds

### Native Astro

Astro does **not** ship full incremental SSG. The history:

- `experimental.contentCollectionCache` (Astro 3.5–4.x) — the famous 92% bundling-step speedup on Astro Docs (133s → 10.46s, end-to-end 4:58 → ~1:00). **Removed in Astro 5** because of correctness bugs (stale content after edits, image ENOENT).
- The Content Layer **data store** (`node_modules/.astro/data-store.json`) replaces the old cache philosophically. It caches the parsed entries between builds, but **page rendering is still done from scratch every build**. So you save the parse phase (significant for 35MB markdown), not the render phase.
- `experimental.routeCaching` is for on-demand-rendered routes only — irrelevant for 100% SSG.

### Third-party

- `@jcayzac/astro-build-cache` — npm package that snapshots `dist/` and skips pages whose content hash matches. Works but invasive; verify it handles your i18n routing.
- `@astrojs/db` + custom diff — heavy; not worth it for static content.

### Hash-based skipping (DIY)

Pattern that works in CI:

```bash
# Step 1: compute current content hash
HASH=$(find knowledge src/content -type f | sort | xargs sha256sum | sha256sum | cut -d' ' -f1)

# Step 2: try to download a previous dist+manifest matching the hash from R2/S3
curl -fsSL "$CDN/dist-${HASH}.tar.zst" | tar -xI zstd -C dist/ && exit 0

# Step 3: full build, then upload
pnpm build
tar -cI 'zstd -19' -f dist.tar.zst dist/
aws s3 cp dist.tar.zst "s3://bucket/dist-${HASH}.tar.zst"
```

This gives you "if nothing changed, 0-second build" — not true incremental but functionally equivalent for content-only pushes.

### Cloudflare Pages / Netlify build cache

- **Cloudflare Pages**: Settings → Build → Build cache → Enable. Caches the working directory between builds, including `node_modules/.astro`. 10GB project quota, LRU eviction. Known issue: framework auto-detection sometimes resets, defeating the cache. Manually re-set Astro preset after each settings change.
- **Netlify**: Caches `node_modules` automatically. Add `.astro` to the cached set via `netlify-plugin-cache` or `netlify.toml`'s `[build.environment]`.

### Diff-based partial rebuild

Possible but custom. Determine which files changed since last build, derive the affected route slugs, build only those routes (`astro build --route /en/foo`-style flags don't exist; you'd patch `getStaticPaths` to filter to the affected set), then rsync the partial output over the previous full `dist/`.

---

## 8. Image Pipeline

### Sharp vs Squoosh

- **Sharp** is default in Astro 6. Native bindings (libvips). 5–10× faster than Squoosh on equivalent ops.
- **Squoosh** is WASM, portable to environments without native binaries (StackBlitz, some serverless).
- For GitHub Actions ubuntu-latest: always Sharp. Ensure it's installed (sometimes silently falls back).

### `astro:assets` and skipping it

- For `<Image>` components, the build runs Sharp on every referenced image. With 65MB of public assets this could matter — but `public/` images are NOT processed by `astro:assets`; they're copied as-is. Only images imported via `import img from './x.jpg'` and used in `<Image>` go through Sharp.
- `passthroughImageService()` was supposed to skip optimization but has a known regression in 5.15+ where WebP conversion still runs (issue #14721). Use a plain `<img>` tag or `image.service: { entrypoint: 'astro/assets/services/noop' }` if you really want zero processing.

### Codec choice

- **AVIF** encodes 5–10× slower than JPEG. For batch SSG it's fine if you do it once and cache. For incremental builds, the cache hit rate drops.
- **WebP** is the workhorse: ~97% browser support, encodes ~2× JPEG.
- Astro 6.1 lets you set defaults globally:
  ```js
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        webp: { quality: 80 },
        avif: { quality: 65, effort: 4 },  // effort 0-9; lower = faster encode
        jpeg: { quality: 82, mozjpeg: true },
      }
    }
  }
  ```
  `avif.effort: 4` is a reasonable build-time tradeoff (default is 4, max 9).

### Caching images across CI runs

```yaml
- uses: actions/cache@v4
  with:
    path: node_modules/.astro
    key: astro-${{ hashFiles('src/content/**', 'src/assets/**', 'public/**') }}
    restore-keys: astro-
```

`node_modules/.astro` contains the Sharp output cache, the data store, and OG image cache. The Daniel Wulff benchmark: 10+ minutes → ~30 seconds on cache hit.

---

## 9. CI/CD-Specific Levers

### Runner sizing

Free `ubuntu-latest` is 4 vCPU / 16 GB RAM (as of 2026). Going to a larger runner is the easiest win:

| Runner | Cores | RAM | Notes |
|---|---|---|---|
| `ubuntu-latest` (free) | 4 | 16 GB | Standard |
| `ubuntu-24.04-arm` (free for public) | 4 | 16 GB | ~37% cheaper for private; faster for many node workloads |
| `ubuntu-latest-8-core` | 8 | 32 GB | Paid; ~2× faster on parallelizable work |
| `ubuntu-latest-16-core` | 16 | 64 GB | Diminishing returns past concurrency=6 |

**ARM runners**: free for public repos. Native arm64 Node + Sharp work well. Some npm packages still ship x86-only binaries — check your `pnpm install` succeeds. Reported 30+ min → ~4 min on ARM in some cases, but this is for arm-friendly workloads (Node + Sharp qualify).

For Taiwan.md (public repo, Node + Sharp): **`ubuntu-24.04-arm` is the obvious first move**. Free, faster, lower contention.

### Package manager

| Manager | Install speed | Astro support |
|---|---|---|
| `npm ci` | baseline | works |
| `pnpm install --frozen-lockfile` | 2–3× faster | first-class |
| `bun install` | 12× faster than npm, 3.6× faster than pnpm | works; experimental for build runtime |

For 6-language Taiwan.md: pnpm is the safest "fast enough" choice. Bun install + Node build is a valid hybrid.

### `actions/cache` patterns

```yaml
- uses: pnpm/action-setup@v4
  with: { version: 9, run_install: false }

- uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: 'pnpm'  # caches the pnpm store

- name: Cache Astro build artifacts
  uses: actions/cache@v4
  with:
    path: |
      node_modules/.astro
      .astro
    key: astro-build-${{ runner.os }}-${{ hashFiles('src/content/**','src/assets/**','public/**','astro.config.*') }}
    restore-keys: astro-build-${{ runner.os }}-
```

**Don't** cache `node_modules/` itself with pnpm — the store is what matters; the symlinked `node_modules` is recreated quickly.

### Turborepo remote cache

Overkill for a single-package site. Worth it if Taiwan.md becomes a monorepo with shared tooling.

### `withastro/action`

The official action does set up package-manager-aware caching by default and caches `node_modules/.astro`. Fine for GitHub Pages deploys; for CF Pages / Netlify you'd write your own workflow anyway.

---

## 10. Bun / Node Versions

### Node 22 vs Node 24

- Node 22 LTS is current minimum for Astro 6.
- Node 24 ships Maglev tier improvements; reported ~5–10% faster on JS-heavy workloads.
- For SSG builds the gain is real but small; Node 22.x is the safe default unless you're chasing every percent.

### `--max-old-space-size`

```bash
NODE_OPTIONS="--max-old-space-size=8192" pnpm build
```

Sizing guide:
- < 1k pages: 4096
- 1k–10k pages: 8192
- 10k+ pages (Taiwan.md is here): 12288–16384

GitHub `ubuntu-latest` has 16 GB RAM; `--max-old-space-size=12288` leaves enough for Sharp's native heap.

### Bun as runtime

```bash
bun run --bun astro build
```

- Faster process startup, faster file I/O (zlib parallelization).
- Astro's render pipeline is JS, single-threaded — Bun won't speed up rendering itself.
- Heavy markdown / Sharp work is dominant in your build; Bun helps install + cold start, modest help on render. Realistic upper bound: 10–25% faster end-to-end vs Node 22 on SSG.
- Caveat: occasional plugin compat issues. Test with `--bun` flag first.

---

## 11. Profiling — Where the 17 Minutes Actually Goes

### `astro build --verbose`

- Surfaces Vite phase boundaries: dep optimization → SSR build → page render → asset emit → sitemap.
- Look for the line `[build] X pages built in Y.Yy` — this is render-only, excluding Vite's bundling.
- The Vite "bundling" step (which on Astro Docs went 133s → 10.46s with caching) is usually 30–60% of total time on content-heavy sites.

### `--debug`

- Verbose plugin-by-plugin timing. Noisy but uncovers slow remark/rehype plugins immediately.

### `ASTRO_TELEMETRY_DISABLED=1`

- Removes a network call at end of build. Doesn't affect total time meaningfully but cleans logs.

### Node CPU profiling

```bash
NODE_OPTIONS="--cpu-prof --cpu-prof-dir=./profiles --max-old-space-size=12288" pnpm build
```

- Produces `.cpuprofile` files. Open in Chrome DevTools → Performance → Load profile.
- For Taiwan.md's 98→167ms regression: this will tell you in 30 seconds whether the regression is in Shiki, in remark plugins, in fs reads, or in component render.

### Vite `--profile`

- Enabled via `VITE_PROFILE=1`. Useful for the bundling phase specifically.

### Identifying which phase dominates

Common breakdown on a 16k-page Astro site:

| Phase | Typical share | Symptoms |
|---|---|---|
| Dep optimize | 5–10% | First build only; cached |
| Content load + parse | 10–30% | grows with markdown size; data store helps |
| **Page render (Astro)** | **30–60%** | grows with N pages × per-page cost; this is your regression |
| Asset emit (Sharp/CSS) | 10–25% | grows with image count |
| Sitemap | 1–10% | spikes on huge sites |
| HTML compress | 1–5% | trivial unless `compressHTML: 'jsx'` is wrong |

For 17 min ≈ 1020s and 16k pages: 167ms × 16k = 2670s of nominal render, which means concurrency is already happening (effective 1.5–2 pages in parallel). A 98ms baseline × 16k = 1568s — so the regression is ~18 min of build time alone, making the "12-day regression" the entire story.

### Astro 6.2 JSON logger

```js
experimental: { logger: { type: 'json' } }
```

Enables structured logs you can pipe to `jq` to extract per-phase timings.

---

## 12. Sitemap / Integration Overhead

### `@astrojs/sitemap`

- Default chunk size 45,000 entries → splits to multiple sitemaps + index. 16k entries fits in one — no chunking benefit.
- The `serialize(item)` hook runs for every URL. Inside, common antipatterns:
  - Reading the source file from disk to compute lastmod (synchronous on every URL = N fs reads).
  - Hitting an API for changefreq.
- Recommended pattern: precompute lastmod into the data store via the loader; have `serialize` look up an in-memory map, not disk.

### Alternative: write your own sitemap

For 16k URLs, a custom sitemap script reading from `getCollection()` and writing one file is ~1 second. The integration's overhead can be 10–60s if `serialize` does fs work.

---

## 13. Common Antipatterns (Likely Suspects for Your 98→167ms Regression)

1. **Synchronous `fs.readFileSync` / `gray-matter` per page** — re-reads adjacent articles for navigation. Add a process-level memo or migrate to a content collection.
2. **`execSync('git log -1 ...')` per page** — for "lastUpdated" timestamps. Shell startup × 16k = many minutes. Cache once at build start, look up in memory.
3. **Schema validation with `.refine()` doing fs reads** — Zod runs on every entry load. Refines run again. Expensive refines on 5k entries × 6 languages = 30k validations.
4. **Large remark plugin doing AST traversal twice** — some plugins traverse on `tree` and again in a `transformer` closure. Profile first.
5. **`Astro.glob` (now removed)** — replaced by `import.meta.glob`. If a hidden compat layer is still globbing eagerly, that's a regression vector.
6. **MDX without `markdown.optimize: true`** — the internal optimizer is opt-in for MDX; default in `.md`. Confirm.
7. **Expressive Code with multiple themes** — each theme = full re-tokenize per code block.
8. **Unused Shiki languages loaded** — every entry in `langs: [...]` ships its TextMate grammar. Cap to languages you actually use.
9. **Image components iterating in `getStaticPaths`** — Sharp work multiplied by route count.
10. **CSP `experimental.csp` enabled** with hash mode — runs a hash over every script/style at build time. Now stable in 6 (no more flag), but the cost is real on huge sites.

---

## 14. Large-Site Case Studies

### `docs.astro.build` itself

- ~2,500 pages. Used as the canonical benchmark.
- Content caching (when it existed in Astro 4): bundling 133s → 10.46s, total 4:58 → 1:00.
- Now uses Content Layer data store + CI cache — similar effective speedup.

### TanStack docs

- Astro + Starlight. Reports leaning hard on `markdown.optimize: true`, minimal client JS, prefetch off.

### Vercel docs

- Hybrid (not pure Astro). Use ISR aggressively. Not a directly applicable model but illustrates "render most pages on demand, cache forever" as an alternative to "build all upfront."

### blog.cloudflare.com

- Migrated to Astro 5 from Next 14. Reported full build 2hr → 14min for 8k posts. Stack: Astro 5 + Content Layer + Cloudflare Pages build cache + R2 image origin (NOT `astro:assets` for content images — they're served from R2 directly with signed URLs).
- Lesson: for content-heavy sites, push image processing **out** of the build to a separate pipeline (ImgIX, Cloudinary, or R2 + Cloudflare Image Resizing).

### Notion-as-CMS sites

- Use a custom loader that fetches Notion at build time, with `node_modules/.astro` data store as the cache. Webhook-driven rebuilds (LimeCuda pattern): conditional GraphQL/Notion query for "modified since last build," only update changed entries in the store, then full Astro build with the warm cache. Reported 30min → ~2min on content-only updates.

### Bitdoze (339,340 pages)

- 35 → 127 pages/sec via:
  - `compressHTML: false`
  - `manualChunks: undefined`
  - `target: 'es2022'`, `minify: 'esbuild'`
  - `concurrency: 4` (12-core machine)
  - `maxParallelFileOps: cpus * 3`
  - `NODE_OPTIONS=--max-old-space-size=16384`
  - Aggressive fetch-level cache for any external API
  - Hardware: AMD 5900X (25% over Xeon E5-1650v3)

---

## 15. Newer Experimental Features — Do Any Affect Build Time?

| Flag | Astro 6 status | Build-time impact |
|---|---|---|
| `experimental.fonts` | **stable** (now `fonts` config) | Slight cost: downloads + subsets fonts at build. Subset narrowly (`unicodeRange`) for non-Latin (Taiwan.md: zh-Hant subset) — full CJK glyph dump can be 10MB+. |
| `experimental.actions` | stable | Server-only; no SSG cost. |
| `experimental.csp` | **stable** (now `security.csp`) | Per-page hash computation. Measurable on 16k pages but seconds, not minutes. Disable if not needed. |
| `experimental.contentIntellisense` | experimental | Generates types in `.astro/`. Build cost minimal; helps DX. |
| `experimental.serverIslands` | stable | Hybrid only; SSG unaffected. |
| `experimental.responsiveImages` | stable in 6 | Generates `srcset` at build. Meaningful per-image cost; cumulatively significant only if many `<Image>` per page. |
| `experimental.queuedRendering` | experimental | **Worth trying.** Up to 2× render speed reported. May fix part of your 98→167ms regression. |
| `experimental.rustCompiler` | experimental | Up to 100× faster compile phase. Compile (`.astro` → JS) is a small share of build for content-heavy sites, so end-to-end improvement is more like 5–15%. Worth piloting. |
| `experimental.routeCaching` | experimental | On-demand only; SSG unaffected. |
| `experimental.staticImportMetaEnv` | **stable** (default) | Removed; was a correctness fix. |

### Recommended experimental cocktail for Taiwan.md

```js
experimental: {
  queuedRendering: { enabled: true, poolSize: 1000 },
  rustCompiler: true,
}
```

Both have low blast radius. Disable individually if rendering looks off.

---

## 16. Configuration Knobs — The Full Knob Table

```js
// astro.config.mjs — opinionated config for 16k-page i18n SSG
import { defineConfig } from 'astro/config';
import { cpus } from 'node:os';

export default defineConfig({
  output: 'static',
  trailingSlash: 'never',  // fewer redirects, smaller sitemap

  build: {
    format: 'directory',           // for clean URLs; 'file' is slightly faster + flatter
    inlineStylesheets: 'auto',     // inline < 4kb stylesheets, external for the rest
    concurrency: 4,                // tune 2/4/6 — measure
    assets: '_astro',
  },

  prefetch: {
    prefetchAll: false,            // don't pay client perf for every link
    defaultStrategy: 'hover',
  },

  compressHTML: true,              // small CDN savings; disable only if profile shows it dominates

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        webp:  { quality: 80 },
        avif:  { quality: 65, effort: 4 },
        jpeg:  { quality: 82, mozjpeg: true },
      }
    }
  },

  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      langs: ['ts','js','astro','bash','md','json','yaml'],  // explicit allowlist
    },
    // remarkPlugins: [...]   // audit; remove what you don't use
    // rehypePlugins: [...]
  },

  vite: {
    build: {
      target: 'es2022',
      minify: 'esbuild',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 10000,
      assetsInlineLimit: 4096,
      rollupOptions: {
        maxParallelFileOps: cpus().length * 3,
        output: {
          manualChunks: undefined,
          generatedCode: { preset: 'es2022' },
        },
      },
    },
    esbuild: {
      target: 'es2022',
      minifyIdentifiers: false,
      minifySyntax: true,
      minifyWhitespace: true,
    },
    optimizeDeps: { force: false },
  },

  experimental: {
    queuedRendering: { enabled: true, poolSize: 1000 },
    rustCompiler: true,
  },
});
```

### Knob sensitivity (rough order of impact for Taiwan.md)

1. **`build.concurrency`** — 1 → 4 typically 1.5–2× speedup if I/O bound.
2. **CI runner upgrade** — `ubuntu-latest` → `ubuntu-24.04-arm` or 8-core: 1.5–2× speedup, free or low cost.
3. **`actions/cache` for `node_modules/.astro`** — 30s on cache hit vs full build, when content unchanged.
4. **Shiki `langs` allowlist** — can shave seconds-to-minutes if currently loading default bundle.
5. **Removing per-page `git log`** if present — minutes.
6. **Migrating `knowledge/` to a Content Layer collection** — enables data store caching, cuts content-load phase 50–90%.
7. **`experimental.queuedRendering`** — up to 2× page render.
8. **`compressHTML: false`** — small but free if CDN compresses.
9. **`manualChunks: undefined`** — depends; measure.
10. **`max-old-space-size`** — prevents GC thrashing; the speedup is "build doesn't crash," not "build is faster."

---

## 17. Action Plan Summary (Optimization Order for Taiwan.md)

Priority list, ordered by ROI / effort:

1. **Profile first (1 hour).** `NODE_OPTIONS="--cpu-prof"`, run build, open in DevTools. Identify which phase regressed 98→167ms.
2. **Switch CI to `ubuntu-24.04-arm`** (free, public repo). One-line YAML change. Expected: 1.3–1.7× speedup.
3. **Cache `node_modules/.astro` in CI** (5-line YAML). Expected: warm builds <2 min.
4. **Audit `knowledge/` reads.** If using direct `readFile` + `gray-matter`, migrate to `glob()` collection. Expected: content-load phase down 50–90%.
5. **Audit Shiki config.** Pin `langs:` and `themes:`. Confirm 6.1+ for the highlighter cache fix.
6. **Audit remark/rehype plugins.** Disable any not actively used. Profile with `--debug`.
7. **Remove per-page `git log` shellouts** if present. Pre-compute once.
8. **Set `build.concurrency: 4`.** Test 2/4/6.
9. **Set `NODE_OPTIONS="--max-old-space-size=12288"`** in CI.
10. **Try `experimental.queuedRendering`** + `experimental.rustCompiler`. Can always disable.
11. **Per-language parallel matrix builds** (6 jobs, merge `dist/`). The big lever for a 6-language site. Expected: ~1/N total time minus overhead, so 17 min → ~3–5 min.
12. **Hash-based "skip if no content changed"** wrapper outside Astro. For doc-only PRs, near-zero builds.

Items 1–9 are reversible config; item 11 is structural. Land 1–9 first, measure, then decide on 11.

---

## Sources

- [Astro 6.0 release notes](https://astro.build/blog/astro-6/)
- [Astro 6.1 release notes](https://astro.build/blog/astro-610/)
- [Astro 6.2 release notes](https://astro.build/blog/astro-620/)
- [Upgrade to Astro v6](https://docs.astro.build/en/guides/upgrade-to/v6/)
- [Astro Content Layer Deep Dive](https://astro.build/blog/content-layer-deep-dive/)
- [Astro Content Collections docs](https://docs.astro.build/en/guides/content-collections/)
- [Astro Configuration Reference](https://docs.astro.build/en/reference/configuration-reference/)
- [Experimental Queued Rendering](https://docs.astro.build/en/reference/experimental-flags/queued-rendering/)
- [Experimental Rust Compiler](https://docs.astro.build/en/reference/experimental-flags/rust-compiler/)
- [Experimental Route Caching](https://docs.astro.build/en/reference/experimental-flags/route-caching/)
- [Scaling Astro to 10,000+ Pages](https://astro.build/blog/experimental-static-build/)
- [Bitdoze: 35→127 pages/sec case study](https://www.bitdoze.com/astro-ssg-build-optimization/)
- [AntStack: 30→5min Astro build](https://medium.com/@antstack/how-we-cut-astro-build-time-from-30-minutes-to-5-minutes-83-faster-d7da73cde481)
- [LimeCuda: incremental Astro builds via webhook](https://limecuda.com/blog/get-faster-build-times-for-content-updates-on-your-large-content-astro-site/)
- [Markaicode: Astro build optimization](https://markaicode.com/optimize-astro-build-performance/)
- [Walter Ra: Astro build caching in CI](https://walterra.dev/blog/2025-11-09-astro-build-caching)
- [Daniel Wulff: cache Astro images across GH Actions](https://danielwulff.dev/blog/cache-astro-images-across-github-action-runs/)
- [Astro parallel build broken issue #12992](https://github.com/withastro/astro/issues/12992)
- [Astro getStaticPaths required reference](https://docs.astro.build/en/reference/errors/get-static-paths-required/)
- [Astro: dev server slow as collections grow #10269](https://github.com/withastro/astro/issues/10269)
- [Shiki best performance practices](https://shiki.style/guide/best-performance)
- [Vite build options](https://vite.dev/config/build-options)
- [Vite migration to v7](https://vite.dev/guide/migration)
- [Vite 8 / Rolldown migration](https://byteiota.com/vite-8-rolldown-migration-guide-10-30x-faster-builds/)
- [GitHub blog: arm64 hosted runners](https://github.blog/news-insights/product-news/arm64-on-github-actions-powering-faster-more-efficient-build-systems/)
- [GitHub-hosted runners reference](https://docs.github.com/en/actions/reference/runners/github-hosted-runners)
- [Cloudflare Pages build caching](https://developers.cloudflare.com/pages/configuration/build-caching/)
- [Bun vs Node for Astro static builds](https://dev.to/lovestaco/bun-vs-node-for-astro-static-site-builds-4okk)
- [Steve Fenton: Astro JS heap OOM in GH Actions](https://stevefenton.co.uk/blog/2023/07/astro-javascript-heap-out-of-memory/)
- [Astro static asset gen perf PR #12922](https://github.com/withastro/astro/pull/12922)
- [Astro slow rendering vs Solid issue #11454](https://github.com/withastro/astro/issues/11454)
- [Astro sitemap integration docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/)
- [Astro image service reference](https://docs.astro.build/en/reference/image-service-reference/)
- [Starlight CHANGELOG (perf for large sidebars)](https://github.com/withastro/starlight/blob/main/packages/starlight/CHANGELOG.md)
- [Starlight build perf for large sidebars PR #2252](https://github.com/withastro/starlight/pull/2252)
- [Push-Based: advanced Node CPU profiling](https://push-based.io/article/advanced-cpu-profiling-in-node-real-life-examples)
- [Astro changelog mirror](https://astro-changelog.netlify.app/)
- [What's new in Astro - April 2026](https://astro.build/blog/whats-new-april-2026/)
- [What's new in Astro - March 2026](https://astro.build/blog/whats-new-march-2026/)
