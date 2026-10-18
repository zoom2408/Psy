// @ts-check
import { defineConfig } from 'astro/config';

// Đặt SITE_URL và BASE_PATH khi build cho host cụ thể, ví dụ GitHub Pages:
//   SITE_URL=https://zoom2408.github.io BASE_PATH=/Psy npm run build
// Domain riêng hoặc gốc domain: bỏ BASE_PATH.
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always'
});
