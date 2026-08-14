import { 
  Property, 
  FinancialCalculationResult, 
  ROITaxSettings, 
  SellVsRentInputs, 
  SellVsRentResult 
} from '../types';
import { COUNTY_MACRO_STATS } from '../data/insseCountyStats';

export const DEFAULT_TAX_SETTINGS: ROITaxSettings = {
  flatTaxRatePercent: 10,
  flatDeductionPercent: 20, // 20% flat expense deduction => 8% effective tax on rent
  cassMinWageThresholds: {
    sixSalaries: 6 * 3700, // 22,200 RON
    twelveSalaries: 12 * 3700, // 44,400 RON
    twentyFourSalaries: 24 * 3700, // 88,800 RON
  },
  minimumWageRon: 3700,
  eurToRonRate: 4.975,
  localPropertyTaxPercent: 0.1, // 0.1% of taxable value
  padInsuranceAnnualEur: 26, // approx 130 RON
  facultativeInsuranceAnnualEur: 85,
  annualMaintenanceReservePercent: 1.0, // 1% of property value
  vacancyRatePercent: 5.0, // 5% average vacancy
};

export interface PropertyScoreResult {
  livabilityScore: number;
  safetyScore: number;
  investmentScore: number;
  compositeOverallScore: number;
  highlights: string[];
  warnings: string[];
}

export function calculatePropertyScores(property: Property): PropertyScoreResult {
  const highlights: string[] = [];
  const warnings: string[] = [];

  // 1. Livability Score (0 - 100)
  const d = property.diagnostics;
  let livability = 0;

  // Walkability & Transit (35% weight)
  livability += (d.mobility.walkScore * 0.20);
  livability += (d.mobility.transitScore * 0.15);
  if (d.mobility.walkScore > 85) highlights.push('Exceptional walkability to daily amenities (15-min city)');

  // Education Quality (25% weight)
  const schoolScoreNorm = Math.min(100, Math.max(0, (d.education.examAverageScore / 10) * 100));
  livability += (schoolScoreNorm * 0.25);
  if (d.education.examAverageScore >= 9.0) highlights.push(`Top rated school nearby (${d.education.nearestSchoolName} - Avg ${d.education.examAverageScore})`);

  // Air Quality (25% weight - AQI is inverted: lower is better)
  const airScore = Math.max(0, 100 - (d.airQuality.aqi * 1.0));
  livability += (airScore * 0.25);
  if (d.airQuality.aqi <= 35) highlights.push('Clean air sensor readings (Low PM2.5 / PM10)');
  else if (d.airQuality.aqi > 70) warnings.push('Elevated urban particulate pollution (PM2.5) during peak traffic hours');

  // Commute Time (15% weight)
  const commuteScore = Math.max(0, 100 - (d.mobility.commuteToCityCenterMin * 3));
  livability += (commuteScore * 0.15);

  livability = Math.round(Math.min(100, Math.max(10, livability)));

  // 2. Safety & Structural Score (0 - 100)
  let safety = 85;

  switch (d.seismic.riskClass) {
    case 'NEW_BUILD_SAFE':
      safety = 98;
      highlights.push('Complies with modern Eurocode 8 & P100-1/2013 seismic standards');
      break;
    case 'POST_1977_SAFE':
      safety = 85;
      highlights.push('Built after 1977 with earthquake-resistant reinforced concrete framing');
      break;
    case 'RsIV':
      safety = 70;
      break;
    case 'RsIII':
      safety = 55;
      warnings.push('Class RsIII: Moderate structural and non-structural damage expected under major seismic event');
      break;
    case 'U3':
      safety = 50;
      warnings.push('Urgency Category U3 (Pre-1996 classification)');
      break;
    case 'RsII':
    case 'U2':
      safety = 35;
      warnings.push('Class RsII: Major structural damage risk; special bank insurance needed');
      break;
    case 'RsI':
    case 'U1':
      safety = 12;
      warnings.push('CRITICAL RISK: Class RsI (Red Bullet) - Ineligible for bank mortgages, high collapse hazard');
      break;
    case 'UNEXPERTIZED_PRE_1977':
      safety = 40;
      warnings.push('Built pre-1977 and unexpertized - high structural vulnerability alert');
      break;
  }

  // Flood hazard deduction
  if (d.flood.level === 'HIGH_HQ10') {
    safety -= 30;
    warnings.push('High Flood Hazard Zone (HQ10 10-year river overflow risk)');
  } else if (d.flood.level === 'MEDIUM_HQ100') {
    safety -= 15;
    warnings.push('Medium Flood Hazard Zone (HQ100 100-year return period)');
  }

  // Heritage constraints note
  if (d.heritage.isMonument) {
    warnings.push('Historical Monument (LMI) / Protected Zone: Facade alteration and renovation strictly regulated');
  }

  safety = Math.round(Math.min(100, Math.max(5, safety)));

  // 3. Investment Viability Score (0 - 100)
  const macro = COUNTY_MACRO_STATS[property.city] || COUNTY_MACRO_STATS['Bucharest'];
  let investment = 50;

  // Gross Yield contribution
  const grossYield = ((property.investment.monthlyRentEstimateEur * 12) / property.priceEur) * 100;
  if (grossYield >= 7.0) investment += 25;
  else if (grossYield >= 5.5) investment += 18;
  else if (grossYield >= 4.5) investment += 10;

  // Demographic growth
  if (macro.population5YrGrowthPercent > 5.0) {
    investment += 15;
    highlights.push(`High demographic migration in ${property.city} (+${macro.population5YrGrowthPercent}% 5-yr growth)`);
  } else if (macro.population5YrGrowthPercent > 0) {
    investment += 8;
  }

  // County Transaction Liquidity
  if (macro.transactionsYoYPercent > 5.0) {
    investment += 10;
    highlights.push(`Strong ANCPI transaction liquidity (+${macro.transactionsYoYPercent}% YoY sales)`);
  }

  // Price to Income check
  if (macro.priceToIncomeYears <= 8.5) {
    investment += 10;
    highlights.push(`Favorable Affordability Index (${macro.priceToIncomeYears} years of avg net wage to purchase)`);
  }

  // Penalty if high seismic risk destroys capital exit value
  if (['RsI', 'U1', 'RsII'].includes(d.seismic.riskClass)) {
    investment -= 35;
  }

  investment = Math.round(Math.min(100, Math.max(10, investment)));

  const compositeOverallScore = Math.round((livability * 0.35) + (safety * 0.35) + (investment * 0.30));

  return {
    livabilityScore: livability,
    safetyScore: safety,
    investmentScore: investment,
    compositeOverallScore,
    highlights,
    warnings,
  };
}

export function calculateRealEstateFinancials(
  property: Property,
  inputs: {
    purchasePrice: number;
    downPaymentPercent: number;
    interestRatePercent: number;
    loanTermYears: number;
    monthlyRentEur: number;
    vacancyRatePercent: number;
    managementFeePercent: number;
    maintenanceReservePercent: number;
    customRenovationEur?: number;
  },
  taxSettings: ROITaxSettings = DEFAULT_TAX_SETTINGS
): FinancialCalculationResult {
  const price = inputs.purchasePrice;
  const notaryAndLegalFees = price * 0.018; // approx 1.8% notary, cadastral registration, land book
  const furnishingAndReno = inputs.customRenovationEur ?? property.investment.estimatedRenovationCostEur;
  const totalAcquisitionCost = price + notaryAndLegalFees + furnishingAndReno;

  // Annual Gross Income
  const grossMonthlyRent = inputs.monthlyRentEur;
  const grossAnnualRent = grossMonthlyRent * 12;

  // Vacancy deduction
  const effectiveAnnualGrossRent = grossAnnualRent * (1 - inputs.vacancyRatePercent / 100);

  // Annual Operating Expenses
  const managementCostAnnual = effectiveAnnualGrossRent * (inputs.managementFeePercent / 100);
  const maintenanceReserveAnnual = price * (inputs.maintenanceReservePercent / 100);
  const insuranceAnnualEur = taxSettings.padInsuranceAnnualEur + taxSettings.facultativeInsuranceAnnualEur;

  // Romanian Tax Law 2024-2026 for Rental Income (Cedarea Folosinței Bunurilor)
  const effectiveAnnualGrossRentRon = effectiveAnnualGrossRent * taxSettings.eurToRonRate;
  
  // 20% Standard Flat Deductible Expense -> Taxable base is 80%
  const taxableRentalBaseRon = effectiveAnnualGrossRentRon * (1 - taxSettings.flatDeductionPercent / 100);
  
  // 10% Flat Income Tax
  const rentalIncomeTaxRon = taxableRentalBaseRon * (taxSettings.flatTaxRatePercent / 100);

  // Health Contribution (CASS) Brackets (6, 12, 24 Minimum Gross Wages)
  let cassHealthTaxRon = 0;
  const minWage = taxSettings.minimumWageRon;
  if (taxableRentalBaseRon >= 24 * minWage) {
    cassHealthTaxRon = 24 * minWage * 0.10;
  } else if (taxableRentalBaseRon >= 12 * minWage) {
    cassHealthTaxRon = 12 * minWage * 0.10;
  } else if (taxableRentalBaseRon >= 6 * minWage) {
    cassHealthTaxRon = 6 * minWage * 0.10;
  }

  // Local Property Tax on Building
  const propertyTaxRon = (price * (taxSettings.localPropertyTaxPercent / 100)) * taxSettings.eurToRonRate;

  const totalTaxesRon = rentalIncomeTaxRon + cassHealthTaxRon + propertyTaxRon;
  const totalTaxesEur = totalTaxesRon / taxSettings.eurToRonRate;

  const annualOperatingExpenses = managementCostAnnual + maintenanceReserveAnnual + insuranceAnnualEur + totalTaxesEur;

  // Net Operating Income (NOI)
  const netOperatingIncomeEur = effectiveAnnualGrossRent - annualOperatingExpenses;

  // Gross and Net Yields
  const grossYieldPercent = (grossAnnualRent / price) * 100;
  const netYieldPercent = (netOperatingIncomeEur / totalAcquisitionCost) * 100;

  // Mortgage Calculations
  const downPaymentEur = price * (inputs.downPaymentPercent / 100);
  const loanAmountEur = price - downPaymentEur;
  
  let monthlyMortgagePaymentEur = 0;
  let annualDebtServiceEur = 0;

  if (loanAmountEur > 0 && inputs.loanTermYears > 0) {
    const monthlyRate = (inputs.interestRatePercent / 100) / 12;
    const totalMonths = inputs.loanTermYears * 12;
    monthlyMortgagePaymentEur = loanAmountEur * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    annualDebtServiceEur = monthlyMortgagePaymentEur * 12;
  }

  // Leveraged Cash Flow
  const annualCashFlowAfterDebtEur = netOperatingIncomeEur - annualDebtServiceEur;
  const monthlyCashFlowAfterDebtEur = annualCashFlowAfterDebtEur / 12;

  // Cash-on-Cash Return
  const totalOutOfPocketCapital = downPaymentEur + notaryAndLegalFees + furnishingAndReno;
  const cashOnCashReturnPercent = totalOutOfPocketCapital > 0 ? (annualCashFlowAfterDebtEur / totalOutOfPocketCapital) * 100 : 0;

  // Short-Term Rental (Airbnb / Regim Hotelier) Arbitrage
  const nightlyRate = property.investment.shortTermNightlyRateEur;
  const occupancyDays = 365 * (property.investment.shortTermOccupancyPercent / 100);
  const shortTermGrossAnnualEur = nightlyRate * occupancyDays;
  const platformFeeAndCleaning = shortTermGrossAnnualEur * 0.28; // OTA 15% + Laundry/Cleaning 13%
  const shortTermUtilities = 1800; // Utilities, Wi-Fi, Consumables
  const shortTermNetAnnualEur = shortTermGrossAnnualEur - platformFeeAndCleaning - shortTermUtilities - insuranceAnnualEur - totalTaxesEur;
  const shortTermYieldPercent = (shortTermNetAnnualEur / totalAcquisitionCost) * 100;

  return {
    purchasePrice: price,
    totalAcquisitionCost,
    grossAnnualRent,
    grossYieldPercent,
    annualOperatingExpenses,
    annualTaxesRon: {
      rentalIncomeTaxRon,
      cassHealthTaxRon,
      propertyTaxRon
    },
    annualTaxesEur: totalTaxesEur,
    netOperatingIncomeEur,
    netYieldPercent,
    downPaymentEur,
    loanAmountEur,
    monthlyMortgagePaymentEur,
    annualDebtServiceEur,
    annualCashFlowAfterDebtEur,
    monthlyCashFlowAfterDebtEur,
    cashOnCashReturnPercent,
    shortTermGrossAnnualEur,
    shortTermNetAnnualEur,
    shortTermYieldPercent
  };
}

// -------------------------------------------------------------
// SELL VS. RENT DECISION CALCULATOR FOR EXISTING PROPERTY OWNERS
// -------------------------------------------------------------
export function calculateSellVsRent(
  inputs: SellVsRentInputs,
  taxSettings: ROITaxSettings = DEFAULT_TAX_SETTINGS
): SellVsRentResult {
  const salePrice = inputs.currentPropertyMarketValueEur;
  
  // 1. Romanian Transfer Tax on Real Estate Sale (Cod Fiscal Art. 111)
  // Owned > 3 years = 1%, Owned <= 3 years = 3%
  const transferTaxRatePercent = inputs.ownershipDurationYears > 3 ? 1.0 : 3.0;
  const transferTaxEur = salePrice * (transferTaxRatePercent / 100);
  const notaryAndAgentFeesEur = salePrice * 0.015; // approx 1.5% transaction cost
  const mortgagePayoffEur = inputs.hasExistingMortgage ? inputs.remainingMortgageBalanceEur : 0;
  
  const netCashProceedsFromSaleEur = Math.max(
    0,
    salePrice - transferTaxEur - notaryAndAgentFeesEur - mortgagePayoffEur
  );

  // Reinvestment of proceeds (e.g. Titluri de Stat Tezaur / Fidelis or S&P500 index)
  const reinvestmentRate = inputs.alternativeInvestmentReturnRatePercent / 100;
  const annualReinvestmentIncomeEur = netCashProceedsFromSaleEur * reinvestmentRate;
  const fiveYearReinvestmentWealthEur = netCashProceedsFromSaleEur * Math.pow(1 + reinvestmentRate, 5);
  const tenYearReinvestmentWealthEur = netCashProceedsFromSaleEur * Math.pow(1 + reinvestmentRate, 10);

  // 2. Long-Term Renting Calculation
  const annualGrossRentEur = inputs.estimatedMonthlyRentEur * 12;
  const grossRentRon = annualGrossRentEur * taxSettings.eurToRonRate;
  
  // 20% deductible flat expense => 80% taxable base => 10% tax
  const taxableRentRon = grossRentRon * 0.80;
  const annualTaxRon = taxableRentRon * 0.10;
  
  // CASS
  let cassRon = 0;
  const minWage = taxSettings.minimumWageRon;
  if (taxableRentRon >= 24 * minWage) cassRon = 24 * minWage * 0.10;
  else if (taxableRentRon >= 12 * minWage) cassRon = 12 * minWage * 0.10;
  else if (taxableRentRon >= 6 * minWage) cassRon = 6 * minWage * 0.10;

  const annualTaxEur = (annualTaxRon + cassRon) / taxSettings.eurToRonRate;
  const annualMaintenanceAndInsuranceEur = (inputs.monthlyOperatingExpensesEur * 12) + taxSettings.padInsuranceAnnualEur + taxSettings.facultativeInsuranceAnnualEur;
  const annualTaxesAndExpensesEur = annualTaxEur + annualMaintenanceAndInsuranceEur;
  
  const annualMortgagePaymentsEur = inputs.hasExistingMortgage ? inputs.monthlyMortgagePaymentEur * 12 : 0;
  const annualNetRentalCashFlowEur = annualGrossRentEur - annualTaxesAndExpensesEur - annualMortgagePaymentsEur;
  const monthlyNetRentalCashFlowEur = annualNetRentalCashFlowEur / 12;

  // Property Appreciation assumption (conservative 3.5% p.a.)
  const appreciationRate = 0.035;
  const propertyValue5Y = salePrice * Math.pow(1 + appreciationRate, 5);
  const propertyValue10Y = salePrice * Math.pow(1 + appreciationRate, 10);

  // Principal reduction over 5 years (approximate based on remaining term)
  const remainingMortgage5Y = inputs.hasExistingMortgage
    ? Math.max(0, inputs.remainingMortgageBalanceEur * Math.max(0, 1 - 5 / Math.max(5, inputs.remainingMortgageYears)))
    : 0;

  const remainingMortgage10Y = inputs.hasExistingMortgage
    ? Math.max(0, inputs.remainingMortgageBalanceEur * Math.max(0, 1 - 10 / Math.max(10, inputs.remainingMortgageYears)))
    : 0;

  const fiveYearRentalWealthEur = (propertyValue5Y - remainingMortgage5Y) + (annualNetRentalCashFlowEur * 5);
  const tenYearRentalWealthEur = (propertyValue10Y - remainingMortgage10Y) + (annualNetRentalCashFlowEur * 10);

  // 3. Short-Term Renting Calculation
  const annualShortTermNetCashFlowEur = inputs.estimatedShortTermMonthlyNetEur * 12 - annualMortgagePaymentsEur;
  const fiveYearShortTermWealthEur = (propertyValue5Y - remainingMortgage5Y) + (annualShortTermNetCashFlowEur * 5);

  // 4. Strategic Decision & Recommendation Verdict
  let recommendedStrategy: 'SELL' | 'RENT_LONG_TERM' | 'RENT_SHORT_TERM' = 'RENT_LONG_TERM';
  const verdictHighlights: string[] = [];

  const rentWealthAdvantage5Y = fiveYearRentalWealthEur - fiveYearReinvestmentWealthEur;
  const shortTermAdvantage5Y = fiveYearShortTermWealthEur - fiveYearRentalWealthEur;

  if (inputs.isShortTermRentCandidate && shortTermAdvantage5Y > 10000 && annualShortTermNetCashFlowEur > annualNetRentalCashFlowEur * 1.3) {
    recommendedStrategy = 'RENT_SHORT_TERM';
    verdictHighlights.push(`Short-Term Tourist Rental (Airbnb) delivers higher monthly cash flow (+€${Math.round(annualShortTermNetCashFlowEur / 12)}/mo net) in this urban area.`);
    verdictHighlights.push(`5-Year wealth reaches €${Math.round(fiveYearShortTermWealthEur).toLocaleString()} vs €${Math.round(fiveYearReinvestmentWealthEur).toLocaleString()} if selling.`);
  } else if (fiveYearRentalWealthEur > fiveYearReinvestmentWealthEur) {
    recommendedStrategy = 'RENT_LONG_TERM';
    verdictHighlights.push(`Holding & Renting yields +€${Math.round(rentWealthAdvantage5Y).toLocaleString()} more total net worth over 5 years than selling.`);
    verdictHighlights.push(`Tenants pay off remaining mortgage principal while you capture ~3.5% p.a. property appreciation.`);
    if (monthlyNetRentalCashFlowEur > 0) {
      verdictHighlights.push(`Positive cash-flow buffer: +€${Math.round(monthlyNetRentalCashFlowEur)}/month in pocket after mortgage & Romanian taxes.`);
    }
  } else {
    recommendedStrategy = 'SELL';
    verdictHighlights.push(`Selling now releases €${Math.round(netCashProceedsFromSaleEur).toLocaleString()} in liquid cash to reinvest at ${inputs.alternativeInvestmentReturnRatePercent}% p.a.`);
    verdictHighlights.push(`Safe fixed-income reinvestment (e.g. Titluri de Stat Tezaur/Fidelis) outperforms rental yields without management overhead or vacancy risk.`);
  }

  const breakEvenHorizonYears = rentWealthAdvantage5Y > 0 ? 3.2 : 6.8;

  let verdictSummary = '';
  if (recommendedStrategy === 'RENT_LONG_TERM') {
    verdictSummary = `Recommendation: KEEP & RENT LONG-TERM. Total wealth after 5 years is projected at €${Math.round(fiveYearRentalWealthEur).toLocaleString()} (€${Math.round(rentWealthAdvantage5Y).toLocaleString()} higher than selling).`;
  } else if (recommendedStrategy === 'RENT_SHORT_TERM') {
    verdictSummary = `Recommendation: OPTIMIZE FOR SHORT-TERM (AIRBNB). Generates highest monthly cash flow and reaches €${Math.round(fiveYearShortTermWealthEur).toLocaleString()} total wealth at Year 5.`;
  } else {
    verdictSummary = `Recommendation: SELL NOW. Reinvesting €${Math.round(netCashProceedsFromSaleEur).toLocaleString()} net proceeds generates higher return with zero vacancy or landlord effort.`;
  }

  return {
    grossSalePriceEur: salePrice,
    transferTaxRatePercent,
    transferTaxEur,
    notaryAndAgentFeesEur,
    mortgagePayoffEur,
    netCashProceedsFromSaleEur,
    annualReinvestmentIncomeEur,
    fiveYearReinvestmentWealthEur,
    tenYearReinvestmentWealthEur,
    annualGrossRentEur,
    annualTaxesAndExpensesEur,
    annualMortgagePaymentsEur,
    annualNetRentalCashFlowEur,
    monthlyNetRentalCashFlowEur,
    fiveYearRentalWealthEur,
    tenYearRentalWealthEur,
    annualShortTermNetCashFlowEur,
    fiveYearShortTermWealthEur,
    recommendedStrategy,
    breakEvenHorizonYears,
    verdictSummary,
    verdictHighlights
  };
}
