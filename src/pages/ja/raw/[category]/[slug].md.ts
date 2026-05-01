import type { APIRoute } from 'astro';
import {
  getRawPaths,
  renderRawMarkdown,
  RAW_HEADERS,
} from '../../../../utils/rawArticle';

export async function getStaticPaths() {
  return getRawPaths('ja');
}

export const GET: APIRoute = async ({ props }) => {
  const { absPath, lang } = props as { absPath: string; lang: string };
  const body = await renderRawMarkdown(absPath, lang);
  return new Response(body, { headers: RAW_HEADERS });
};
