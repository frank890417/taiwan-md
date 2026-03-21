import { defineMiddleware } from 'astro:middleware';

/**
 * Astro middleware — sets security headers during dev/preview.
 * Production headers are served by vercel.json and public/_headers.
 */
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();

  // CSP mirrors vercel.json — kept in sync manually
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://unpkg.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' https://images.unsplash.com https://*.pexels.com https://commons.wikimedia.org https://upload.wikimedia.org https://*.tile.openstreetmap.org data:",
      "connect-src 'self' https://www.google-analytics.com https://api.exchangerate-api.com",
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  return response;
});
