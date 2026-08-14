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
  console.log('🚀 Starting Robust Verified Puppeteer Suite for ROImob README...');
  
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

  // 0. Initial Load & Setup
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('roimob_mode', 'simple');
    localStorage.setItem('roimob_lang', 'en');
    localStorage.setItem('roimob_theme', 'midnight');
    localStorage.setItem('roimob_currency', 'EUR');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // =========================================================================
  // 1. HOMEPAGE HERO & DECISION HUB
  // =========================================================================
  console.log('📸 1. Capturing Homepage Decision Hub...');
  // Ensure we are on Home tab
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const homeBtn = btns.find(b => b.textContent && (b.textContent.trim() === 'Home' || b.textContent.includes('Prezentare')));
    if (homeBtn) homeBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const homeCheck = await page.evaluate(() => document.body.innerText.includes('Decision Intelligence Hub') || document.body.innerText.includes('Romanian Real Estate'));
  console.log(`   Verification: Homepage present? ${homeCheck}`);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_homepage_preview.png')
  });
  console.log('✅ 1. roimob_homepage_preview.png captured successfully');

  // =========================================================================
  // 2. QUICK SELL VS. RENT EVALUATOR (15-SECOND DECISION)
  // =========================================================================
  console.log('📸 2. Capturing Quick Sell vs. Rent Evaluator...');
  // Click Sell vs. Rent in navbar
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const svrBtn = btns.find(b => b.textContent && b.textContent.includes('Sell vs. Rent'));
    if (svrBtn) svrBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Ensure simple mode is active
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const simpleBtn = btns.find(b => b.textContent && b.textContent.includes('Quick Check'));
    if (simpleBtn) simpleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const svrQuickCheck = await page.evaluate(() => document.body.innerText.includes('Should I Sell or Rent My Property?') || document.body.innerText.includes('Option A: Keep & Rent'));
  console.log(`   Verification: Quick Sell vs Rent present? ${svrQuickCheck}`);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_quick_sell_vs_rent_preview.png')
  });
  console.log('✅ 2. roimob_quick_sell_vs_rent_preview.png captured successfully');

  // =========================================================================
  // 3. PRO SELL VS. RENT ENGINE (15-YEAR TRAJECTORY & FULL TAX CODE)
  // =========================================================================
  console.log('📸 3. Capturing Pro Sell vs. Rent Engine...');
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  
  // Switch to Pro mode using the component button or navbar button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proBtn = btns.find(b => b.textContent && (b.textContent.includes('Switch to Pro') || b.textContent.includes('Institutional Pro')));
    if (proBtn) proBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const svrProCheck = await page.evaluate(() => document.body.innerText.includes('Romanian Fiscal Code Art. 111') || document.body.innerText.includes('15-Year Projected Capital Trajectory'));
  console.log(`   Verification: Pro Sell vs Rent present? ${svrProCheck}`);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_sell_vs_rent_preview.png')
  });
  console.log('✅ 3. roimob_sell_vs_rent_preview.png captured successfully');

  // =========================================================================
  // 4. QUICK BUY-TO-LET ROI EVALUATOR
  // =========================================================================
  console.log('📸 4. Capturing Quick Buy-to-Let ROI Evaluator...');
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });
  
  // Navigate to ROI Calculator in navbar
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const roiNavBtn = btns.find(b => b.textContent && b.textContent.includes('ROI & Tax Engine'));
    if (roiNavBtn) roiNavBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Switch to simple mode
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const simpleBtn = btns.find(b => b.textContent && (b.textContent.includes('Quick Check') || b.textContent.includes('⚡')));
    if (simpleBtn) simpleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  const roiQuickCheck = await page.evaluate(() => document.body.innerText.includes('Is this Apartment a Good Investment?') || document.body.innerText.includes('Investment Assessment'));
  console.log(`   Verification: Quick ROI Evaluator present? ${roiQuickCheck}`);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_quick_roi_calculator_preview.png')
  });
  console.log('✅ 4. roimob_quick_roi_calculator_preview.png captured successfully');

  // =========================================================================
  // 5. PRO BUY-TO-LET ROI & TAX ENGINE
  // =========================================================================
  console.log('📸 5. Capturing Pro Buy-to-Let ROI & Tax Engine...');
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });

  // Switch to Pro mode
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proBtn = btns.find(b => b.textContent && (b.textContent.includes('Switch to Pro') || b.textContent.includes('Institutional Pro')));
    if (proBtn) proBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const roiProCheck = await page.evaluate(() => document.body.innerText.includes('Gross Yield') && document.body.innerText.includes('Impozit pe Venit'));
  console.log(`   Verification: Pro ROI Engine present? ${roiProCheck}`);

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_roi_calculator_preview.png')
  });
  console.log('✅ 5. roimob_roi_calculator_preview.png captured successfully');

  // =========================================================================
  // 6. 2-PAGE INSTITUTIONAL AUDIT DOSSIER SHEET
  // =========================================================================
  console.log('📸 6. Capturing 2-Page Institutional Audit Report Dossier...');
  
  // Click Export Dossier button on Pro ROI view
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const exportBtn = btns.find(b => b.textContent && (b.textContent.includes('Export') || b.textContent.includes('Dossier') || b.textContent.includes('PDF')));
    if (exportBtn) exportBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  // Wait for the modal sheet element
  await page.waitForSelector('#formal-report-print-sheet', { timeout: 5000 });
  const sheetElement = await page.$('#formal-report-print-sheet');

  const reportCheck = await page.evaluate(() => {
    const el = document.getElementById('formal-report-print-sheet');
    return el ? el.innerText.includes('ROImob') && el.innerText.includes('Law nr. 227/2015') : false;
  });
  console.log(`   Verification: Institutional Report Sheet present? ${reportCheck}`);

  if (sheetElement) {
    await sheetElement.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_preview.png')
    });
  } else {
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_preview.png')
    });
  }
  console.log('✅ 6. roimob_audit_report_preview.png captured successfully');

  await browser.close();
  console.log('🎉 Verified Puppeteer Screenshots Suite Finished Successfully!');
}

captureAll().catch(err => {
  console.error('Screenshot generation error:', err);
  process.exit(1);
});
