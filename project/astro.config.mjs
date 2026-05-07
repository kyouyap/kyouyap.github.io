// project/astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kyouyap.github.io',
  base: '/',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
