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
  console.log('🚀 Starting Brand New Authentic Puppeteer Suite for ROImob README...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1440,1100',
      '--font-render-hinting=medium',
      '--force-color-profile=srgb'
    ]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });

  const BASE_URL = 'http://localhost:3000';

  // Helper to configure app state in localStorage
  const configureAppState = async (mode = 'simple', lang = 'en', theme = 'midnight', currency = 'EUR') => {
    await page.evaluate((m, l, t, c) => {
      localStorage.setItem('roimob_mode', m);
      localStorage.setItem('roimob_lang', l);
      localStorage.setItem('roimob_theme', t);
      localStorage.setItem('roimob_currency', c);
    }, mode, lang, theme, currency);
  };

  // =========================================================================
  // 1. HOMEPAGE HERO & DECISION HUB
  // =========================================================================
  console.log('📸 1. Capturing Homepage Decision Hub...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await configureAppState('simple', 'en', 'midnight', 'EUR');
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_homepage_preview.png')
  });
  console.log('✅ 1. roimob_homepage_preview.png captured');

  // =========================================================================
  // 2. QUICK SELL VS. RENT EVALUATOR (15-SECOND DECISION)
  // =========================================================================
  console.log('📸 2. Capturing Quick Sell vs. Rent Evaluator...');
  await configureAppState('simple', 'en', 'midnight', 'EUR');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('Sell vs. Rent'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_quick_sell_vs_rent_preview.png')
  });
  console.log('✅ 2. roimob_quick_sell_vs_rent_preview.png captured');

  // =========================================================================
  // 3. PRO SELL VS. RENT ENGINE (15-YEAR TRAJECTORY & COMPREHENSIVE FISCAL CODE)
  // =========================================================================
  console.log('📸 3. Capturing Pro Sell vs. Rent Engine...');
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  await configureAppState('pro', 'en', 'midnight', 'EUR');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('Sell vs. Rent'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_sell_vs_rent_preview.png')
  });
  console.log('✅ 3. roimob_sell_vs_rent_preview.png captured');

  // =========================================================================
  // 4. QUICK BUY-TO-LET ROI EVALUATOR
  // =========================================================================
  console.log('📸 4. Capturing Quick Buy-to-Let ROI Evaluator...');
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });
  await configureAppState('simple', 'en', 'midnight', 'EUR');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('ROI Calculator'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_quick_roi_calculator_preview.png')
  });
  console.log('✅ 4. roimob_quick_roi_calculator_preview.png captured');

  // =========================================================================
  // 5. PRO BUY-TO-LET ROI & TAX ENGINE
  // =========================================================================
  console.log('📸 5. Capturing Pro Buy-to-Let ROI & Tax Engine...');
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  await configureAppState('pro', 'en', 'midnight', 'EUR');
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('ROI Calculator'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_roi_calculator_preview.png')
  });
  console.log('✅ 5. roimob_roi_calculator_preview.png captured');

  // =========================================================================
  // 6. 2-PAGE INSTITUTIONAL AUDIT DOSSIER SHEET
  // =========================================================================
  console.log('📸 6. Capturing 2-Page Institutional Audit Report Dossier...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const exportBtn = buttons.find(b => b.textContent && (b.textContent.includes('Export') || b.textContent.includes('Dossier') || b.textContent.includes('PDF')));
    if (exportBtn) exportBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  const sheetElement = await page.$('#formal-report-print-sheet');
  if (sheetElement) {
    await sheetElement.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_preview.png')
    });
  } else {
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_preview.png')
    });
  }
  console.log('✅ 6. roimob_audit_report_preview.png captured');

  await browser.close();
  console.log('🎉 Brand New README Screenshots Generated Successfully!');
}

captureAll().catch(err => {
  console.error('Error during screenshot generation:', err);
  process.exit(1);
});
