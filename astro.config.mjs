// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Netlify sets URL to the site's main address (e.g. https://bulowskvartett.se) during builds.
const site = process.env.URL || 'http://localhost:4321';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'sv', locales: { sv: 'sv-SE', en: 'en-GB' } },
    }),
  ],
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
