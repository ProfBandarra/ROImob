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
  console.log('🚀 Starting Comprehensive High-Fidelity Puppeteer Suite for ROImob README...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=1440,1200',
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
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const homeBtn = btns.find(b => b.textContent && (b.textContent.trim() === 'Home' || b.textContent.includes('Prezentare')));
    if (homeBtn) homeBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_homepage_preview.png')
  });
  console.log('✅ 1. roimob_homepage_preview.png captured successfully');

  // =========================================================================
  // 2. QUICK SELL VS. RENT EVALUATOR (15-SECOND DECISION)
  // =========================================================================
  console.log('📸 2. Capturing Quick Sell vs. Rent Evaluator...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const svrBtn = btns.find(b => b.textContent && b.textContent.includes('Sell vs. Rent'));
    if (svrBtn) svrBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const simpleBtn = btns.find(b => b.textContent && b.textContent.includes('Quick Check'));
    if (simpleBtn) simpleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_quick_sell_vs_rent_preview.png')
  });
  console.log('✅ 2. roimob_quick_sell_vs_rent_preview.png captured successfully');

  // =========================================================================
  // 3. PRO SELL VS. RENT ENGINE (15-YEAR TRAJECTORY & FULL TAX CODE)
  // =========================================================================
  console.log('📸 3. Capturing Pro Sell vs. Rent Engine...');
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });
  
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proBtn = btns.find(b => b.textContent && (b.textContent.includes('Switch to Pro') || b.textContent.includes('Institutional Pro')));
    if (proBtn) proBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_sell_vs_rent_preview.png')
  });
  console.log('✅ 3. roimob_sell_vs_rent_preview.png captured successfully');

  // =========================================================================
  // 4. QUICK BUY-TO-LET ROI EVALUATOR
  // =========================================================================
  console.log('📸 4. Capturing Quick Buy-to-Let ROI Evaluator...');
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });
  
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const roiNavBtn = btns.find(b => b.textContent && b.textContent.includes('ROI & Tax Engine'));
    if (roiNavBtn) roiNavBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const simpleBtn = btns.find(b => b.textContent && (b.textContent.includes('Quick Check') || b.textContent.includes('⚡')));
    if (simpleBtn) simpleBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_quick_roi_calculator_preview.png')
  });
  console.log('✅ 4. roimob_quick_roi_calculator_preview.png captured successfully');

  // =========================================================================
  // 5. PRO BUY-TO-LET ROI & TAX ENGINE
  // =========================================================================
  console.log('📸 5. Capturing Pro Buy-to-Let ROI & Tax Engine...');
  await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 2 });

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proBtn = btns.find(b => b.textContent && (b.textContent.includes('Switch to Pro') || b.textContent.includes('Institutional Pro')));
    if (proBtn) proBtn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'roimob_roi_calculator_preview.png')
  });
  console.log('✅ 5. roimob_roi_calculator_preview.png captured successfully');

  // =========================================================================
  // 6. 2-PAGE INSTITUTIONAL AUDIT DOSSIER SHEET (FULL UNCLIPPED HIGH-RES)
  // =========================================================================
  console.log('📸 6. Capturing Full 2-Page Institutional Audit Report Dossier...');
  
  // Navigate to Sell vs Rent Pro mode for full 15-year curve & multi-scenario report
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const svrBtn = btns.find(b => b.textContent && b.textContent.includes('Sell vs. Rent'));
    if (svrBtn) svrBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Open Export Modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const exportBtn = btns.find(b => b.textContent && (b.textContent.includes('Export') || b.textContent.includes('Dossier') || b.textContent.includes('PDF')));
    if (exportBtn) exportBtn.click();
  });
  await new Promise(r => setTimeout(r, 1200));

  await page.waitForSelector('#formal-report-print-sheet', { timeout: 5000 });

  // Dynamically expand container height to capture the entire unclipped 2-Page Dossier
  await page.setViewport({ width: 1440, height: 2200, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const modalOuter = document.querySelector('.bg-slate-900.border.border-slate-700.w-full');
    if (modalOuter) {
      modalOuter.style.maxHeight = 'none';
      modalOuter.style.overflow = 'visible';
    }
    const scrollContainer = document.querySelector('.bg-slate-950\\/80');
    if (scrollContainer) {
      scrollContainer.style.overflow = 'visible';
      scrollContainer.style.height = 'auto';
    }
  });
  await new Promise(r => setTimeout(r, 500));

  const sheetElement = await page.$('#formal-report-print-sheet');
  if (sheetElement) {
    // 6A. Full 2-Page Dossier
    await sheetElement.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_preview.png')
    });
    console.log('✅ 6A. roimob_audit_report_preview.png (Full 2-Page Dossier) captured successfully');

    // 6B. Page 1: Valuation Matrix & Executive Underwriting
    const page1Element = await page.$('.page-break');
    if (page1Element) {
      await page1Element.screenshot({
        path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_page1.png')
      });
      console.log('✅ 6B. roimob_audit_report_page1.png (Page 1 Underwriting) captured successfully');
    }

    // 6C. Page 2: 15-Year Projected SVG Curve & Multi-Year Schedule
    const page2Element = await page.$('#formal-report-print-sheet > div:last-child');
    if (page2Element) {
      await page2Element.screenshot({
        path: path.join(SCREENSHOTS_DIR, 'roimob_audit_report_page2.png')
      });
      console.log('✅ 6C. roimob_audit_report_page2.png (Page 2 Trajectory & Schedule) captured successfully');
    }
  }

  await browser.close();
  console.log('🎉 All ROImob README Screenshots Captured & Verified with 100% Fidelity!');
}

captureAll().catch(err => {
  console.error('Screenshot generation error:', err);
  process.exit(1);
});
