import fs from 'fs';
import path from 'path';

const files = [
  'src/pages/[category]/[slug].astro',
  'src/pages/[category]/index.astro',
  'src/pages/en/[category]/[slug].astro',
  'src/pages/en/[category]/index.astro',
  'src/pages/ja/[category]/[slug].astro',
  'src/pages/ja/[category]/index.astro',
  'src/pages/ko/[category]/[slug].astro',
  'src/pages/ko/[category]/index.astro',
  'src/pages/fr/[category]/[slug].astro',
  'src/pages/fr/[category]/index.astro',
  'src/pages/es/[category]/[slug].astro',
  'src/pages/es/[category]/index.astro',
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // Replace for .prose
  const proseRegex =
    /\.prose :global\(img\) {\s*width: 100%;\s*max-height: 480px;\s*object-fit: cover;\s*border-radius: 12px;\s*margin: 2rem 0;\s*box-shadow: 0 4px 24px rgba\(26, 60, 52, 0\.1\);\s*}/g;

  const newProseStyle = `  /* Image wrapper */
  .prose :global(p:has(img)) {
    margin: 2.5rem 0;
    text-align: center;
  }
  .prose :global(img) {
    width: 100%;
    max-height: 480px;
    object-fit: cover;
    border-radius: 12px;
    margin: 0;
    box-shadow: 0 4px 24px rgba(26, 60, 52, 0.1);
  }
  /* Hide the <br> between img and em */
  .prose :global(p:has(img) br) {
    display: none;
  }
  /* Caption style */
  .prose :global(p:has(img) em) {
    display: block;
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: #6a7d72;
    font-style: italic;
  }`;

  // Replace for .hub-prose
  const hubProseRegex =
    /\.hub-prose :global\(img\) {\s*width: 100%;\s*border-radius: 12px;\s*margin: 2\.5rem 0;\s*box-shadow: 0 8px 30px rgba\(0, 0, 0, 0\.04\);\s*}/g;

  const newHubProseStyle = `  /* Image wrapper */
  .hub-prose :global(p:has(img)) {
    margin: 3rem 0;
    text-align: center;
  }
  .hub-prose :global(img) {
    width: 100%;
    border-radius: 12px;
    margin: 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  }
  .hub-prose :global(p:has(img) br) {
    display: none;
  }
  .hub-prose :global(p:has(img) em) {
    display: block;
    margin-top: 0.75rem;
    font-size: 0.85rem;
    color: #6a7d72;
    font-style: italic;
  }`;

  content = content.replace(proseRegex, newProseStyle);
  content = content.replace(hubProseRegex, newHubProseStyle);

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Updated image styles!');
