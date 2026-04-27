---
name: taiwanmd-fortify-footnotes
description: |
  Fortify Taiwan.md articles with scholarly footnotes and ensure 
  cross-language consistency. Use when the user asks to "add footnotes", 
  "increase verifiability", or "fortify content". This skill handles 
  footnote research, syntax injection, and multi-lingual slug syncing.
  TRIGGER when: user says "add footnotes", "increase facts", "fortify", 
  or when editing historical articles that lack scholarly references.
allowed-tools:
  - Bash
  - Read
  - Grep
  - Browser
  - Replace
---

# taiwanmd-fortify-footnotes: Scholarly Verifiability & Sync

Increase the academic rigor of articles by injecting verifiable footnotes and ensuring they render correctly across all languages.

## Workflow

### 1. Research & Fact-Checking

Use the `browser` tool to find 3-9 specific, high-authority references for:

- Key historical figures (full names, birth/death years).
- Specific dates/years for major events.
- Canonical sources (official archives, academic papers, primary news).

### 2. Footnote Injection

Apply GFM-style footnote syntax:

- **Marker**: `[^n]` (where `n` is 1, 2, 3...).
- **Definition**: `[^n]: [Source Title](URL) - Brief context` (placed at the bottom of the file).

### 3. Rendering Pipeline Check

Ensure the `[category]/[slug].astro` template for the target language (e.g., `src/pages/ko/...`) implements the `resolveFootnotes` parser:

```javascript
function resolveFootnotes(md) {
  // Regex for definitions: [^1]: content
  // Regex for markers: [^1]
}
```

### 4. Cross-Language Synchronization

When a slug is renamed or a new article is fortified:

1. **Sync Slugs**: Ensure `knowledge/`, `src/content/`, and the English canonical name match.
2. **Update Translations**: Modify `knowledge/_translations.json` to map all languages to the same English slug.
3. **Delete Residuals**: Remove old Chinese-named files to prevent 404s or stale content.

## Standards (VERIFY v1)

- [ ] **Density**: Minimum 5 footnotes for short articles, 9+ for long-form historical articles.
- [ ] **Styling**: Must use blue superscripts with hover effects and back-reference arrows (↩).
- [ ] **Consistency**: The same footnote must exist in all translated versions if the content allows.
- [ ] **No Placeholders**: Never use `[Source needed]`; always research and provide a real URL.

## When to use

- When the user mentions "verifiability" or "scholarly references".
- After a "quality-scan" identifies hollow content or missing dates.
- When expanding the "Taiwan Campus Folk Song Movement" or similar historical topics.
- To resolve rendering issues where `[^n]` shows as plain text.
