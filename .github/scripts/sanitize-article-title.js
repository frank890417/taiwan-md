import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

function sanitizeArticleTitle(rawTitle = '') {
  return (
    String(rawTitle)
      .replace(/[\r\n]+/g, ' ')
      .replace(/[\u0000-\u001F\u007F]/g, '')
      .replace(/\s+/g, ' ')
      .trim() || 'untitled'
  );
}

function setOutput(name, value) {
  const delimiter = `OUTPUT_${randomUUID()}`;
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    `${name}<<${delimiter}\n${value}\n${delimiter}\n`,
  );
}

function main() {
  setOutput('article_title', sanitizeArticleTitle(process.env.ARTICLE_TITLE));
}

export { sanitizeArticleTitle };

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
