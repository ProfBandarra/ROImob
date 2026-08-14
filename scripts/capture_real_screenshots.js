import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function capture() {
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Launching real Chrome browser...');
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1440,
      height: 960,
      deviceScaleFactor: 2 // Crisp Retina quality
    }
  });

  const page = await browser.newPage();

  console.log('📸 1. Navigating to Homepage...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({
    path: path.join(screenshotsDir, 'roimob_homepage_preview.png'),
    fullPage: false
  });
  console.log('✅ Captured roimob_homepage_preview.png');

  console.log('📸 2. Navigating to Sell vs. Rent Optimizer...');
  // Click on the Sell vs Rent tab
  const svrButtons = await page.$$('button');
  for (const btn of svrButtons) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text && text.includes('Sell vs. Rent')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(screenshotsDir, 'roimob_sell_vs_rent_preview.png'),
    fullPage: false
  });
  console.log('✅ Captured roimob_sell_vs_rent_preview.png');

  console.log('📸 3. Navigating to ROI & Tax Engine...');
  // Click on the ROI Calculator tab
  const roiButtons = await page.$$('button');
  for (const btn of roiButtons) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text && text.includes('ROI & Romanian Tax')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({
    path: path.join(screenshotsDir, 'roimob_roi_calculator_preview.png'),
    fullPage: false
  });
  console.log('✅ Captured roimob_roi_calculator_preview.png');

  console.log('📸 4. Opening Audit Report Modal...');
  // Click on Export PDF Audit Report button
  const exportButtons = await page.$$('button');
  for (const btn of exportButtons) {
    const text = await (await btn.getProperty('textContent')).jsonValue();
    if (text && text.includes('Export PDF Audit')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({
    path: path.join(screenshotsDir, 'roimob_audit_report_preview.png'),
    fullPage: false
  });
  console.log('✅ Captured roimob_audit_report_preview.png');

  await browser.close();
  console.log('🎉 All 4 genuine browser screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
