// Vercel Edge Runtime types (available at runtime on Vercel, no npm package needed)
interface NextRequestCookies {
  get(name: string): { value: string } | undefined;
}
interface NextRequest {
  url: string;
  headers: Headers;
  cookies: NextRequestCookies;
}
interface NextResponseInit {
  status?: number;
  headers?: Record<string, string>;
}
declare const Response: {
  redirect(url: string | URL, status?: number): Response;
  new (body?: BodyInit | null, init?: ResponseInit): Response;
};

const SUPPORTED_LOCALES = ['zh-TW', 'en', 'es'] as const;
const DEFAULT_LOCALE = 'zh-TW';
const COOKIE_NAME = 'preferred-locale';

// Paths that should never be redirected
const SKIP_PATTERNS = [
  /^\/(api|_astro|assets|images|favicon|robots|sitemap|llms)/,
  /\.\w+$/,  // static files
];

function getPreferredLocale(req: NextRequest): string {
  // 1. Check cookie for explicit preference
  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie && SUPPORTED_LOCALES.includes(cookie.value as typeof SUPPORTED_LOCALES[number])) {
    return cookie.value;
  }

  // 2. Parse Accept-Language header
  const acceptLang = req.headers.get('accept-language') || '';
  const languages = acceptLang
    .split(',')
    .map((part: string) => {
      const [lang, q] = part.trim().split(';q=');
      return { lang: lang.trim().toLowerCase(), q: q ? parseFloat(q) : 1.0 };
    })
    .sort((a: { lang: string; q: number }, b: { lang: string; q: number }) => b.q - a.q);

  for (const { lang } of languages) {
    if (lang.startsWith('zh')) return 'zh-TW';
    if (lang.startsWith('es')) return 'es';
    if (lang.startsWith('en')) return 'en';
  }

  return DEFAULT_LOCALE;
}

export default function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);

  // Skip static files and API routes
  if (SKIP_PATTERNS.some(p => p.test(pathname))) {
    return;
  }

  // Only redirect the root path "/" to the user's preferred locale
  if (pathname === '/') {
    const preferred = getPreferredLocale(req);

    // zh-TW is the default locale (unprefixed), so only redirect for en/es
    if (preferred !== DEFAULT_LOCALE) {
      const url = new URL(`/${preferred}`, req.url);
      return new Response(null, {
        status: 302,
        headers: {
          Location: url.toString(),
          'Set-Cookie': `${COOKIE_NAME}=${preferred}; Path=/; Max-Age=31536000; SameSite=Lax`,
        },
      });
    }
  }
}

export const config = {
  matcher: ['/'],
};
