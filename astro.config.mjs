// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { createHash } from 'node:crypto';

// Netlify sets URL to the site's main address (e.g. https://bulowskvartett.se) during builds.
const site = process.env.URL || 'http://localhost:4321';

// The one script Astro doesn't hash itself (is:inline in src/layouts/Base.astro).
// It must match that script exactly, or the browser will block it.
const jsFlagScript = "document.documentElement.classList.add('js');";
const jsFlagHash = `sha256-${createHash('sha256').update(jsFlagScript).digest('base64')}`;

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'sv', locales: { sv: 'sv-SE', en: 'en-GB' } },
    }),
  ],
  // Content-Security-Policy: Astro adds it to every page as a <meta> tag, with hashes
  // of the site's own inline scripts and styles. Anything else is blocked by the browser.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "media-src 'self'",
        "font-src 'self'",
        "frame-src https://open.spotify.com https://www.youtube-nocookie.com",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { hashes: [jsFlagHash] },
      // Pages set a few CSS variables in style="" attributes (harmless, they can't run code).
      styleDirective: { resources: [{ resource: "'unsafe-inline'", kind: 'attribute' }] },
    },
  },
  image: {
    responsiveStyles: true,
    // Cover images for Spotify/YouTube players are downloaded at build time and served from this site.
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: '**.spotifycdn.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
});
