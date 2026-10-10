import { readFileSync, mkdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
let site;
try {
  site = new URL(process.argv[2]);
  if (site.protocol !== 'https:' || site.username || site.password || site.pathname !== '/' || site.search || site.hash) throw new Error('Use an HTTPS origin without a path, credentials, or query.');
} catch (error) {
  console.error('Usage: node build.mjs https://your-domain.com');
  console.error(error.message);
  process.exit(1);
}
const url = site.origin + '/';
const metadata = [
  '<link rel="canonical" href="' + url + '">',
  '<meta property="og:url" content="' + url + '">',
  '<meta property="og:image" content="' + site.origin + '/social-preview.png">',
  '<meta property="og:image:width" content="1200">',
  '<meta property="og:image:height" content="630">',
  '<meta property="og:image:alt" content="Yogeshwar CM — internal tools and AI automation for individuals, founders, and teams">',
  '<meta name="twitter:image" content="' + site.origin + '/social-preview.png">',
  '<meta name="twitter:image:alt" content="Yogeshwar CM — internal tools and AI automation">'
].join('\n');
let html = readFileSync(resolve(root, 'index.html'), 'utf8').replace('<!-- deployment-metadata -->', metadata);
html = html.replace('{"@context":"https://schema.org","@type":"ProfilePage",', '{"@context":"https://schema.org","@type":"ProfilePage","url":"' + url + '",');
const preview = readFileSync(resolve(root, 'social-preview.png'));
const output = resolve(root, 'dist');
mkdirSync(output, { recursive: true });
writeFileSync(resolve(output, 'index.html'), html);
copyFileSync(resolve(root, 'favicon.svg'), resolve(output, 'favicon.svg'));
writeFileSync(resolve(output, 'social-preview.png'), preview);
writeFileSync(resolve(output, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + site.origin + '/sitemap.xml\n');
writeFileSync(resolve(output, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + url + '</loc></url></urlset>\n');
console.log('Built dist/ for ' + site.origin);
