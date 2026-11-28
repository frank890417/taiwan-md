import { defineMiddleware } from 'astro:middleware';
import { createUiIconPool, renderInline } from './icons/ui-icons-pool.mjs';
import { DEPS_ENABLED, runInPage } from './utils/build-deps';

// A large page on the parse5 fallback costs seconds per language (the 11.7 MB
// changelog took ~20s each before the fast scan modelled it). Say so in the build log.
const FALLBACK_WARN_CHARS = 1_000_000;

// `astro build` runs the icon pass on worker threads; dev stays inline.
const pool = import.meta.env.PROD ? createUiIconPool() : null;

// Runs during static generation and development; readers receive static SVG.
export const onRequest = defineMiddleware((context, next) => {
  // 頁面輸入帳（src/utils/build-deps.ts）：沒設 TWMD_DEPS_OUT 時直接走原本的處理，
  // 連 AsyncLocalStorage 都不建。要整段（含下面讀 body）都包在「這一頁」的情境裡，
  // 因為 Astro 的頁面是在讀 body 時才真正渲染。
  if (!DEPS_ENABLED) return handle(context, next);
  let page = context.url.pathname;
  try {
    page = decodeURIComponent(page);
  } catch {}
  return runInPage(page, () => handle(context, next), context.routePattern);
});

async function handle(
  context: Parameters<Parameters<typeof defineMiddleware>[0]>[0],
  next: Parameters<Parameters<typeof defineMiddleware>[0]>[1],
): Promise<Response> {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html'))
    return response;
  const source = await response.text();
  const { html, fallback } = pool
    ? await pool.render(source)
    : renderInline(source);
  if (fallback && source.length > FALLBACK_WARN_CHARS)
    console.warn(
      `[ui-icons] parse5 fallback on ${context.url.pathname} (${(source.length / 1e6).toFixed(1)} MB) — markup the fast scan does not model; see src/icons/render-ui-icons.mjs`,
    );
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
