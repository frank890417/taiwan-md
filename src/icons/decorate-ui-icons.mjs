import { emojiIcons, iconSvg } from './taiwan-icons.mjs';
/** Dynamic dashboard only: called after its existing render lifecycle, no observer. */
export function decorateUiIcons(root) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const parent = node.parentElement;
    if (
      !parent ||
      parent.closest(
        'svg,script,style,pre,code,textarea,blockquote,.prose,.article-content,.diary-content,[data-preserve-emoji]',
      )
    )
      continue;
    const parts = Array.from(
      new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(
        node.textContent,
      ),
      (s) => s.segment,
    );
    if (!parts.some((s) => emojiIcons[s])) continue;
    const paired = parts.some((s) => !emojiIcons[s] && s.trim());
    const fragment = document.createDocumentFragment();
    for (const part of parts) {
      if (!emojiIcons[part]) {
        fragment.append(document.createTextNode(part));
        continue;
      }
      const template = document.createElement('template');
      template.innerHTML = iconSvg(
        emojiIcons[part],
        paired || parent.hasAttribute('aria-label') ? '' : part,
      );
      fragment.append(template.content);
    }
    node.replaceWith(fragment);
  }
}
