import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { extractArticleFromIssue } from './extract-article.js';
import { sanitizeArticleTitle } from './sanitize-article-title.js';

function withTempKnowledgeRoot(callback) {
  const previousCwd = process.cwd();
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'taiwan-md-article-'));
  fs.mkdirSync(path.join(tempRoot, 'knowledge'), { recursive: true });

  try {
    process.chdir(tempRoot);
    return callback(tempRoot);
  } finally {
    process.chdir(previousCwd);
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

test('sanitizeArticleTitle collapses whitespace and strips control characters', () => {
  assert.equal(
    sanitizeArticleTitle('  Multi\nline\tTitle\u0000  '),
    'Multi lineTitle',
  );
  assert.equal(sanitizeArticleTitle(' \r\n '), 'untitled');
});

test('extractArticleFromIssue returns normalized article metadata for a valid issue', () => {
  withTempKnowledgeRoot(() => {
    const issue = {
      number: 42,
      body: `### 分類 / Category
Culture (文化)
### 文章內容 / Article Content
---
title: "A Fresh Title"
description: "Summary"
tags:
  - alpha
  - beta
category: Culture
customField: "custom value"
---

# Heading

Body

### 參考資料 / Sources
- https://example.com/source`,
    };

    const extracted = extractArticleFromIssue(issue);

    assert.equal(extracted.articleTitle, 'A Fresh Title');
    assert.equal(extracted.category, 'Culture');
    assert.equal(extracted.dir, 'knowledge/Culture');
    assert.equal(extracted.filename, 'a-fresh-title.md');
    assert.equal(extracted.filepath, 'knowledge/Culture/a-fresh-title.md');
    assert.equal(extracted.branch, 'content/issue-42-article');
    assert.match(extracted.content, /^---\n/);
    assert.match(extracted.content, /author: "Taiwan\.md Contributors"/);
    assert.match(extracted.content, /tags: \["alpha","beta"\]/);
    assert.match(extracted.content, /category: "Culture"/);
    assert.match(extracted.content, /featured: false/);
    assert.match(extracted.content, /customField: "custom value"/);
    assert.match(extracted.content, /\n# Heading\n\nBody$/);
  });
});

test('extractArticleFromIssue rejects mismatched categories between issue and frontmatter', () => {
  withTempKnowledgeRoot(() => {
    const issue = {
      number: 7,
      body: `### 分類 / Category
Art (藝術)
### 文章內容 / Article Content
---
title: "Mismatch"
description: "Summary"
category: Culture
---

Body`,
    };

    assert.throws(
      () => extractArticleFromIssue(issue),
      /issue 的分類 \(Art\) 與 frontmatter 的 category \(Culture\) 必須相同/,
    );
  });
});

test('extractArticleFromIssue rejects creating a file that already exists', () => {
  withTempKnowledgeRoot((tempRoot) => {
    const existingFile = path.join(
      tempRoot,
      'knowledge',
      'Technology',
      'existing-article.md',
    );
    fs.mkdirSync(path.dirname(existingFile), { recursive: true });
    fs.writeFileSync(existingFile, 'already here', 'utf8');

    const issue = {
      number: 9,
      body: `### 分類 / Category
Technology (科技)
### 文章內容 / Article Content
---
title: "Existing Article"
description: "Summary"
category: Technology
---

Body`,
    };

    assert.throws(
      () => extractArticleFromIssue(issue),
      /檔案已存在，無法建立：knowledge\/Technology\/existing-article\.md/,
    );
  });
});
