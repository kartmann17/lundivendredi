// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'https://lundivendredi.fr';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  adapter: cloudflare(),
  // Astro's CSRF check on action POSTs compares Origin to Host. Cloudflare's
  // proxy can rewrite/strip those headers and return 403 even on legitimate
  // submissions. We disable it because the form has honeypot + Zod + RGPD consent.
  security: { checkOrigin: false },
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/merci'),
      changefreq: 'weekly',
      priority: 1.0,
      lastmod: new Date(),
    }),
  ],
});
