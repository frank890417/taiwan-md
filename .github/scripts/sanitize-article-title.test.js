import test from 'node:test';
import assert from 'node:assert/strict';

import { sanitizeArticleTitle } from './sanitize-article-title.js';

test('sanitizeArticleTitle collapses whitespace and strips control characters', () => {
  assert.equal(
    sanitizeArticleTitle('  Multi\nline\tTitle\u0000  '),
    'Multi lineTitle',
  );
  assert.equal(sanitizeArticleTitle(' \r\n '), 'untitled');
});
