// @ts-check
import { defineConfig } from 'astro/config';
import remarkObsidian from './plugins/obsidian.mjs';

// Đặt SITE_URL và BASE_PATH khi build cho host cụ thể, ví dụ GitHub Pages:
//   SITE_URL=https://zoom2408.github.io BASE_PATH=/Psy npm run build
// Domain riêng hoặc gốc domain: bỏ BASE_PATH.
const base = process.env.BASE_PATH || '/';
export default defineConfig({
  site: process.env.SITE_URL,
  base,
  trailingSlash: 'always',
  markdown: { remarkPlugins: [[remarkObsidian, { base: base === '/' ? '' : base }]] }
});
