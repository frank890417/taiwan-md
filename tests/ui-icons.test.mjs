import test from 'node:test';
import assert from 'node:assert/strict';
import {
  renderUiIcons,
  renderUiIconsReference,
  scanUiIcons,
} from '../src/icons/render-ui-icons.mjs';
import { icons, emojiIcons, iconSvg } from '../src/icons/taiwan-icons.mjs';
test('icon aliases resolve and unknown names fail', () => {
  for (const name of Object.values(emojiIcons)) assert.ok(icons[name]);
  assert.throws(() => iconSvg('missing'));
  assert.match(iconSvg('book', '<script>'), /&lt;script&gt;/);
});
test('UI replacement preserves content, attributes, scripts, flags and signature', () => {
  const preserved =
    '<div class="prose"><p>📚 原文</p></div><blockquote>🌱 引用</blockquote><script>let x="📚";</script>';
  const html =
    '<html><head><title>📚 題名</title></head><body><h2 title="📚">📚 書架</h2>' +
    preserved +
    '🇹🇼 🫧<p data-preserve-emoji>🌱</p><h3>🧬 生命體</h3></body></html>';
  const out = renderUiIcons(html);
  assert.ok(out.includes(preserved));
  assert.ok(out.includes('<title>📚 題名</title>'));
  assert.ok(out.includes('title="📚"'));
  assert.ok(out.includes('🇹🇼 🫧'));
  // 🧬 is the dna line icon in interface chrome, but stays a character inside prose
  assert.match(out, /<use href="\/icons\/taiwan.svg#dna"/);
  assert.ok(
    renderUiIcons('<div class="prose"><p>🧬 簽名</p></div>').includes(
      '🧬 簽名',
    ),
  );
  assert.match(out, /<use href="\/icons\/taiwan.svg#book"/);
  assert.equal(renderUiIcons(out), out);
});
test('icon-only controls preserve accessible labels', () => {
  assert.match(renderUiIcons('<button>🔍</button>'), /aria-label="🔍"/);
  assert.match(
    renderUiIcons('<button aria-label="搜尋">🔍</button>'),
    /aria-hidden="true"/,
  );
});

// The fast scan must reproduce the parse5 reference byte for byte. `fast: true`
// cases are markup the scan models (it must not fall back); the others are
// repairs it hands to parse5. scripts/tools/verify-ui-icons.mjs runs the same
// comparison over every page of a build.
const doc = (body, head = '<title>t</title>') =>
  `<!DOCTYPE html><html lang="zh-TW"><head>${head}</head><body>${body}</body></html>`;
const cases = [
  [
    'plain UI text',
    doc('<nav><a href="/">🏠 首頁</a> <button>🔍</button></nav>'),
    true,
  ],
  [
    'protected regions',
    doc(
      '<div class="x prose"><p>📚</p></div><pre>🔥</pre><code>🔥</code><blockquote>🔥</blockquote><p data-preserve-emoji>🔥</p>',
    ),
    true,
  ],
  [
    'entity in class',
    doc(
      '<div class="[&amp;&gt;a]:underline prose">📚</div><div class="[&amp;_a]:x">📚</div>',
    ),
    true,
  ],
  [
    'entity in sibling text',
    doc('<span>🔥&amp;</span><span>🔥&nbsp;</span><span>🔥&#32;</span>'),
    true,
  ],
  [
    'non-ASCII character reference beside an icon',
    doc('<span>🔥&#x1F525;</span>'),
    false,
  ],
  [
    'comments split text',
    doc(
      '<span>🔥<!-- x -->熱門</span><span>🔥<!---->x</span><span><!--->🔥</span>',
    ),
    true,
  ],
  [
    'raw text and RCDATA',
    doc(
      '<noscript><div>🔥</div></noscript><iframe>🔥</iframe><textarea>🔥</textarea><script>"</p>🔥"</script><style>a{}</style><title>🔥 &amp;</title>',
    ),
    true,
  ],
  [
    'template content is skipped',
    doc(
      '<template><tr><td>🔥</td></tr><template>🔥</template></template><span>🔥</span>',
    ),
    true,
  ],
  [
    'inline svg',
    doc(
      '<svg viewBox="0 0 1 1"><title>🔥</title><path d="M0 0"/><g><text>🔥</text></g></svg><span>🔥 x</span>',
    ),
    true,
  ],
  [
    'tables',
    doc(
      '<table><thead><tr><th>🔥</th></tr></thead><tr><td>🔥 x</td></tr></table>',
    ),
    true,
  ],
  [
    'nested lists',
    doc('<ul><li>🔥<ul><li>📚</li></ul></li><li>x</li></ul>'),
    true,
  ],
  [
    'p closed by a block start',
    doc('<p class="a"> <p class="b">🔥 共 9 筆</p></p><p>x<div>📚</div></p>'),
    true,
  ],
  [
    'content after </body>',
    `<!DOCTYPE html><html><head></head><body><span>a</span>🔥</body> </html> <!-- 🔥 --> <script>let a=1</script>📚\n`,
    true,
  ],
  [
    'p closing through inline element',
    doc('<p><span>x<div>🔥</div></span></p>'),
    false,
  ],
  ['misnested formatting', doc('<b><i>🔥</b> x</i>'), false],
  [
    'foster-parented table text',
    doc('<table>🔥<tr><td>x</td></tr></table>'),
    false,
  ],
  [
    'head closed early',
    '<!DOCTYPE html><html><head><div>🔥</div></head><body>x</body></html>',
    false,
  ],
  [
    'missing doctype',
    '<html><head></head><body><span>🔥</span></body></html>',
    false,
  ],
];
for (const [name, html, fast] of cases) {
  test(`fast scan matches parse5: ${name}`, () => {
    assert.equal(renderUiIcons(html), renderUiIconsReference(html));
    assert.equal(scanUiIcons(html) !== null, fast);
  });
}
