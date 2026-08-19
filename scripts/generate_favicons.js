import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicons() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  const html = `<!DOCTYPE html>
<html>
  <head>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: transparent; overflow: hidden; }
      svg { width: 100%; height: 100%; display: block; }
    </style>
  </head>
  <body>
    ${svgContent}
  </body>
</html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });

  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon.ico', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'logo.png', size: 512 }
  ];

  for (const { name, size } of sizes) {
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    const targetPath = path.join(__dirname, '..', 'public', name);
    await page.screenshot({ path: targetPath, omitBackground: true });
    console.log(`✅ Generated public/${name} (${size}x${size})`);
  }

  await browser.close();
  console.log('🎉 All Favicon assets generated for Google Search Console & Browsers!');
}

generateFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
