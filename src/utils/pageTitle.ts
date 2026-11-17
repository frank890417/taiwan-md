/**
 * pageTitle.ts — the one place that decides how " | Taiwan.md" is appended.
 *
 * 2026-11-04 site-health: Layout.astro (<title>) and SEO.astro (og:title /
 * twitter:title) each appended " | Taiwan.md" unconditionally, while many
 * page-level titles already carry the brand ("歷史 - Taiwan.md", "Taiwan
 * Soundscape — Taiwan.md"). 378 built pages — every category hub in all 13
 * languages among them — shipped "… - Taiwan.md | Taiwan.md".
 *
 * Rule: a title that already names Taiwan.md is used as-is; anything else
 * gets the suffix.
 */
export function withBrand(title: string): string {
  return /taiwan\.md/i.test(title) ? title : `${title} | Taiwan.md`;
}
