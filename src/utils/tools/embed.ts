/**
 * embed.ts — 「嵌入這個工具」的 iframe 程式碼（純函式）。
 *
 * 使用者：src/components/tools/EmbedSnippet.astro。
 * 內嵌板（EmbedLayout）高度變化時會對外層送
 *   { type: 'twmd-embed-height', height: <px> }
 * 這段程式碼裡的小段 script 收到後把對應的 iframe 調成同高。
 */

export const EMBED_MESSAGE_TYPE = 'twmd-embed-height';
export const EMBED_ORIGIN = 'https://taiwan.md';

function escapeAttr(value: string): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export interface EmbedSnippetInput {
  /** 內嵌板完整網址（https://taiwan.md/embed/<topic>/<tool-slug>/）。 */
  src: string;
  /** iframe 的 title（無障礙名稱）。 */
  title: string;
  /** 還沒收到高度訊息前的初始高度，px。 */
  height?: number;
}

export function buildEmbedSnippet(input: EmbedSnippetInput): string {
  const height = Math.max(120, Math.round(input.height ?? 640));
  let origin = EMBED_ORIGIN;
  try {
    origin = new URL(input.src).origin;
  } catch {
    /* 相對路徑：維持預設 origin */
  }
  return [
    `<iframe src="${escapeAttr(input.src)}" title="${escapeAttr(input.title)}" loading="lazy" style="width:100%;border:0;" height="${height}"></iframe>`,
    '<script>',
    "window.addEventListener('message', function (e) {",
    `  if (e.origin !== '${origin}' || !e.data || e.data.type !== '${EMBED_MESSAGE_TYPE}') return;`,
    "  var frames = document.getElementsByTagName('iframe');",
    '  for (var i = 0; i < frames.length; i++) {',
    "    if (frames[i].contentWindow === e.source) frames[i].style.height = e.data.height + 'px';",
    '  }',
    '});',
    '</script>',
  ].join('\n');
}
