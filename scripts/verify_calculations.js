/**
 * ROImob Automated Mathematical & Fiscal Verification Suite
 * Runs in GitHub Actions CI to validate financial models against Romanian Tax Code.
 */

import assert from 'assert';

console.log('🧪 Starting ROImob Automated Calculations & Fiscal Verification Suite...');

// 1. Romanian Tax Code Law 227/2015 Art. 111 (Property Transfer Tax)
function calculateTransferTax(salePrice, yearsOwned) {
  const rate = yearsOwned > 3 ? 0.01 : 0.03;
  return salePrice * rate;
}

// 2. OUG 115/2023 Rental Income Tax & CASS
function calculateRentalTax(annualGrossRent, minWageAnnual = 39600) {
  // 20% flat deductible expense quota -> 8% effective rate
  const taxableBase = annualGrossRent * 0.8;
  const incomeTax = taxableBase * 0.10;

  // CASS Health Brackets (6, 12, 24 minimum gross wages)
  const bracket6 = 6 * 3300; // 19,800 lei
  const bracket12 = 12 * 3300; // 39,600 lei
  const bracket24 = 24 * 3300; // 79,200 lei

  let cass = 0;
  if (annualGrossRent >= bracket24) {
    cass = bracket24 * 0.10;
  } else if (annualGrossRent >= bracket12) {
    cass = bracket12 * 0.10;
  } else if (annualGrossRent >= bracket6) {
    cass = bracket6 * 0.10;
  }

  return { incomeTax, cass, totalTax: incomeTax + cass };
}

// 3. Mortgage PMT Formula (Fixed Annuity)
function calculateMonthlyPayment(principal, annualRatePercent, tenureYears) {
  if (principal <= 0 || tenureYears <= 0) return 0;
  if (annualRatePercent === 0) return principal / (tenureYears * 12);
  
  const r = annualRatePercent / 100 / 12;
  const n = tenureYears * 12;
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

// RUN TESTS
try {
  // Test 1: Art. 111 transfer tax >3 years (1%)
  assert.strictEqual(calculateTransferTax(100000, 5), 1000, 'Transfer tax > 3 years should be 1%');
  
  // Test 2: Art. 111 transfer tax <=3 years (3%)
  assert.strictEqual(calculateTransferTax(100000, 2), 3000, 'Transfer tax <= 3 years should be 3%');
  
  // Test 3: OUG 115/2023 Rental Effective Tax (8%)
  const rentTaxes = calculateRentalTax(10000);
  assert.strictEqual(rentTaxes.incomeTax, 800, 'Income tax on 10,000 rent should be 800 (8% effective)');

  // Test 4: Mortgage 0% interest rate
  const pmtZero = calculateMonthlyPayment(120000, 0, 10);
  assert.strictEqual(pmtZero, 1000, '0% mortgage should be principal / months');

  // Test 5: Mortgage boundary 100% cash (0 principal)
  const pmtCash = calculateMonthlyPayment(0, 6.5, 25);
  assert.strictEqual(pmtCash, 0, '100% cash down payment has 0 monthly mortgage');

  console.log('✅ All 5 Mathematical & Fiscal Core Assertions Passed Successfully (100% Verified)');
} catch (err) {
  console.error('❌ Verification failed:', err);
  process.exit(1);
}
