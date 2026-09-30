import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://naijoug.github.io',
  base: process.env.TIMELINE_BASE_PATH || '/',
  outDir: process.env.TIMELINE_OUT_DIR || './dist',
  integrations: [react()],
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
