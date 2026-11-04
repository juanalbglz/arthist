import { defineConfig } from 'astro/config';

// Se publica en GitHub Pages con dominio propio: arthist.juanalbglz.eu (ver public/CNAME).
export default defineConfig({
  site: 'https://arthist.juanalbglz.eu',
  trailingSlash: 'always',
});
