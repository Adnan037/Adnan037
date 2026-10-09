import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = resolve(root, 'dist');
await mkdir(out, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'assets']) {
  await cp(resolve(root, file), resolve(out, file), { recursive: true });
}

// A portable edition works when downloaded and opened without a web server.
let html = await readFile(resolve(root, 'index.html'), 'utf8');
let css = await readFile(resolve(root, 'styles.css'), 'utf8');
const js = await readFile(resolve(root, 'app.js'), 'utf8');
const font = (await readFile(resolve(root, 'assets/manrope-latin-variable.woff2'))).toString('base64');
const resume = (await readFile(resolve(root, 'assets/Adnan_Khan_Resume.pdf'))).toString('base64');
const favicon = (await readFile(resolve(root, 'assets/favicon.svg'))).toString('base64');
css = css.replace('assets/manrope-latin-variable.woff2', `data:font/woff2;base64,${font}`);
html = html.replace('<link rel="stylesheet" href="styles.css">', () => `<style>${css}</style>`)
  .replace(/<script src="app\.js(?:\?v=[0-9]+)?" defer><\/script>/, () => `<script>${js}</script>`)
  .replace(/href="assets\/Adnan_Khan_Resume.pdf"/g, () => `href="data:application/pdf;base64,${resume}"`)
  .replace('href="assets/favicon.svg"', () => `href="data:image/svg+xml;base64,${favicon}"`)
  .replace(/\s*<link rel="preload" href="assets\/manrope-latin-variable.woff2"[^>]+>/, '');
await writeFile(resolve(out, 'Adnan_Khan_Portfolio.html'), html);
console.log('Built dist/ and the standalone Adnan_Khan_Portfolio.html');

