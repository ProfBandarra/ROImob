import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOTS_DIR = path.join(__dirname, '..', 'public', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function captureAll() {
  console.log('🚀 Launching authentic Chrome browser for full platform capture...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,960']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

  const BASE_URL = 'http://localhost:3000';

  // 1. Homepage
  console.log('📸 1. Capturing Homepage with Decision Hub...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'roimob_homepage_preview.png') });
  console.log('✅ Captured roimob_homepage_preview.png');

  // 2. Quick Sell vs Rent
  console.log('📸 2. Capturing Quick Sell vs. Rent Evaluator...');
  await page.evaluate(() => {
    localStorage.setItem('roimob_mode', 'simple');
  });
  await page.goto(`${BASE_URL}`, { waitUntil: 'networkidle0' });
  
  // Click on Sell vs Rent nav button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const svrBtn = buttons.find(b => b.textContent && (b.textContent.includes('Sell vs. Rent') || b.textContent.includes('Vinde vs.')));
    if (svrBtn) svrBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'roimob_quick_sell_vs_rent_preview.png') });
  console.log('✅ Captured roimob_quick_sell_vs_rent_preview.png');

  // 3. Pro Sell vs Rent
  console.log('📸 3. Capturing Pro Sell vs. Rent Engine with 15-Yr Trajectory...');
  await page.evaluate(() => {
    localStorage.setItem('roimob_mode', 'pro');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'roimob_sell_vs_rent_preview.png') });
  console.log('✅ Captured roimob_sell_vs_rent_preview.png');

  // 4. Quick ROI Calculator
  console.log('📸 4. Capturing Quick Buy-to-Let ROI Evaluator...');
  await page.evaluate(() => {
    localStorage.setItem('roimob_mode', 'simple');
  });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const roiBtn = buttons.find(b => b.textContent && (b.textContent.includes('ROI') || b.textContent.includes('Calculator ROI')));
    if (roiBtn) roiBtn.click();
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'roimob_quick_roi_calculator_preview.png') });
  console.log('✅ Captured roimob_quick_roi_calculator_preview.png');

  // 5. Pro ROI & Romanian Tax Engine
  console.log('📸 5. Capturing Pro ROI & Tax Engine with Top KPI Ribbon & Amortization...');
  await page.evaluate(() => {
    localStorage.setItem('roimob_mode', 'pro');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'roimob_roi_calculator_preview.png') });
  console.log('✅ Captured roimob_roi_calculator_preview.png');

  // 6. 2-Page Institutional Editorial Report Dossier Modal
  console.log('📸 6. Capturing 2-Page Institutional Editorial Report Dossier Modal...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const reportBtn = buttons.find(b => b.textContent && (b.textContent.includes('Export') || b.textContent.includes('Exportă') || b.textContent.includes('PDF')));
    if (reportBtn) reportBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_preview.png') });
  console.log('✅ Captured roimob_audit_report_preview.png');

  await browser.close();
  console.log('🎉 All comprehensive authentic browser screenshots captured successfully!');
}

captureAll().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
