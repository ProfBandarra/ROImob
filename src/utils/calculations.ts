import { 
  Property, 
  FinancialCalculationResult, 
  ROITaxSettings, 
  SellVsRentInputs, 
  SellVsRentResult,
  YearlyWealthPoint,
  TaxRegimeComparison,
  StressScenarioResult
} from '../types';
import { COUNTY_MACRO_STATS } from '../data/insseCountyStats';

export const DEFAULT_TAX_SETTINGS: ROITaxSettings = {
  flatTaxRatePercent: 10,
  flatDeductionPercent: 20,
  cassMinWageThresholds: {
    sixSalaries: 6 * 3700,
    twelveSalaries: 12 * 3700,
    twentyFourSalaries: 24 * 3700,
  },
  minimumWageRon: 3700,
  eurToRonRate: 4.975,
  localPropertyTaxPercent: 0.1,
  padInsuranceAnnualEur: 26,
  facultativeInsuranceAnnualEur: 85,
  annualMaintenanceReservePercent: 1.0,
  vacancyRatePercent: 5.0,
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

  livability += (d.mobility.walkScore * 0.20);
  livability += (d.mobility.transitScore * 0.15);
  if (d.mobility.walkScore > 85) highlights.push('Exceptional walkability to daily amenities (15-min city)');

  const schoolScoreNorm = Math.min(100, Math.max(0, (d.education.examAverageScore / 10) * 100));
  livability += (schoolScoreNorm * 0.25);
  if (d.education.examAverageScore >= 9.0) highlights.push(`Top rated school nearby (${d.education.nearestSchoolName} - Avg ${d.education.examAverageScore})`);

  const airScore = Math.max(0, 100 - (d.airQuality.aqi * 1.0));
  livability += (airScore * 0.25);
  if (d.airQuality.aqi <= 35) highlights.push('Clean air sensor readings (Low PM2.5 / PM10)');
  else if (d.airQuality.aqi > 70) warnings.push('Elevated urban particulate pollution (PM2.5) during peak traffic hours');

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

  if (d.flood.level === 'HIGH_HQ10') {
    safety -= 30;
    warnings.push('High Flood Hazard Zone (HQ10 10-year river overflow risk)');
  } else if (d.flood.level === 'MEDIUM_HQ100') {
    safety -= 15;
    warnings.push('Medium Flood Hazard Zone (HQ100 100-year return period)');
  }

  if (d.heritage.isMonument) {
    warnings.push('Historical Monument (LMI) / Protected Zone: Facade alteration and renovation strictly regulated');
  }

  safety = Math.round(Math.min(100, Math.max(5, safety)));

  // 3. Investment Viability Score (0 - 100)
  const macro = COUNTY_MACRO_STATS[property.city] || COUNTY_MACRO_STATS['Bucharest'];
  let investment = 50;

  const grossYield = ((property.investment.monthlyRentEstimateEur * 12) / property.priceEur) * 100;
  if (grossYield >= 7.0) investment += 25;
  else if (grossYield >= 5.5) investment += 18;
  else if (grossYield >= 4.5) investment += 10;

  if (macro.population5YrGrowthPercent > 5.0) {
    investment += 15;
    highlights.push(`High demographic migration in ${property.city} (+${macro.population5YrGrowthPercent}% 5-yr growth)`);
  } else if (macro.population5YrGrowthPercent > 0) {
    investment += 8;
  }

  if (macro.transactionsYoYPercent > 5.0) {
    investment += 10;
    highlights.push(`Strong ANCPI transaction liquidity (+${macro.transactionsYoYPercent}% YoY sales)`);
  }

  if (macro.priceToIncomeYears <= 8.5) {
    investment += 10;
    highlights.push(`Favorable Affordability Index (${macro.priceToIncomeYears} years of avg net wage to purchase)`);
  }

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
  const notaryAndLegalFees = price * 0.018;
  const furnishingAndReno = inputs.customRenovationEur ?? property.investment.estimatedRenovationCostEur;
  const totalAcquisitionCost = price + notaryAndLegalFees + furnishingAndReno;

  const grossMonthlyRent = inputs.monthlyRentEur;
  const grossAnnualRent = grossMonthlyRent * 12;
  const effectiveAnnualGrossRent = grossAnnualRent * (1 - inputs.vacancyRatePercent / 100);

  const managementCostAnnual = effectiveAnnualGrossRent * (inputs.managementFeePercent / 100);
  const maintenanceReserveAnnual = price * (inputs.maintenanceReservePercent / 100);
  const insuranceAnnualEur = taxSettings.padInsuranceAnnualEur + taxSettings.facultativeInsuranceAnnualEur;

  const effectiveAnnualGrossRentRon = effectiveAnnualGrossRent * taxSettings.eurToRonRate;
  const taxableRentalBaseRon = effectiveAnnualGrossRentRon * (1 - taxSettings.flatDeductionPercent / 100);
  const rentalIncomeTaxRon = taxableRentalBaseRon * (taxSettings.flatTaxRatePercent / 100);

  let cassHealthTaxRon = 0;
  const minWage = taxSettings.minimumWageRon;
  if (taxableRentalBaseRon >= 24 * minWage) {
    cassHealthTaxRon = 24 * minWage * 0.10;
  } else if (taxableRentalBaseRon >= 12 * minWage) {
    cassHealthTaxRon = 12 * minWage * 0.10;
  } else if (taxableRentalBaseRon >= 6 * minWage) {
    cassHealthTaxRon = 6 * minWage * 0.10;
  }

  const propertyTaxRon = (price * (taxSettings.localPropertyTaxPercent / 100)) * taxSettings.eurToRonRate;
  const totalTaxesRon = rentalIncomeTaxRon + cassHealthTaxRon + propertyTaxRon;
  const totalTaxesEur = totalTaxesRon / taxSettings.eurToRonRate;

  const annualOperatingExpenses = managementCostAnnual + maintenanceReserveAnnual + insuranceAnnualEur + totalTaxesEur;
  const netOperatingIncomeEur = effectiveAnnualGrossRent - annualOperatingExpenses;

  const grossYieldPercent = (grossAnnualRent / price) * 100;
  const netYieldPercent = (netOperatingIncomeEur / totalAcquisitionCost) * 100;

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

  const annualCashFlowAfterDebtEur = netOperatingIncomeEur - annualDebtServiceEur;
  const monthlyCashFlowAfterDebtEur = annualCashFlowAfterDebtEur / 12;

  const totalOutOfPocketCapital = downPaymentEur + notaryAndLegalFees + furnishingAndReno;
  const cashOnCashReturnPercent = totalOutOfPocketCapital > 0 ? (annualCashFlowAfterDebtEur / totalOutOfPocketCapital) * 100 : 0;

  const nightlyRate = property.investment.shortTermNightlyRateEur;
  const occupancyDays = 365 * (property.investment.shortTermOccupancyPercent / 100);
  const shortTermGrossAnnualEur = nightlyRate * occupancyDays;
  const platformFeeAndCleaning = shortTermGrossAnnualEur * 0.28;
  const shortTermUtilities = 1800;
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
// ADVANCED SELL VS. RENT DECISION CALCULATOR
// -------------------------------------------------------------
export function calculateSellVsRent(
  inputs: SellVsRentInputs,
  taxSettings: ROITaxSettings = DEFAULT_TAX_SETTINGS
): SellVsRentResult {
  const salePrice = inputs.currentPropertyMarketValueEur;
  
  // 1. Romanian Real Estate Transfer Tax (Cod Fiscal Art. 111)
  const transferTaxRatePercent = inputs.ownershipDurationYears > 3 ? 1.0 : 3.0;
  const transferTaxEur = salePrice * (transferTaxRatePercent / 100);
  
  // Agency / Marketing commission + Notary seller fee
  const agentCommissionRate = (inputs.realEstateAgentCommissionPercent ?? 0) / 100;
  const notaryAndAgentFeesEur = (salePrice * agentCommissionRate) + (salePrice * 0.005);
  const sellingPreparationCostEur = inputs.sellingPreparationCostEur ?? 0;

  // Early Prepayment Penalty on Mortgage
  const remainingMortgage = inputs.hasExistingMortgage ? inputs.remainingMortgageBalanceEur : 0;
  const prepaymentPenaltyRate = (inputs.earlyMortgagePrepaymentFeePercent ?? 0) / 100;
  const prepaymentPenaltyEur = remainingMortgage * prepaymentPenaltyRate;
  const mortgagePayoffEur = remainingMortgage + prepaymentPenaltyEur;
  
  // Net cash proceeds from immediate sale
  const netCashProceedsFromSaleEur = Math.max(
    0,
    salePrice - transferTaxEur - notaryAndAgentFeesEur - sellingPreparationCostEur - mortgagePayoffEur
  );

  // 2. Reinvestment of Sale Proceeds (Handles 0% up to 15%+)
  const reinvestmentRate = Math.max(0, inputs.alternativeInvestmentReturnRatePercent / 100);
  const annualReinvestmentIncomeEur = netCashProceedsFromSaleEur * reinvestmentRate;

  // 3. Tax Regime Comparison
  const annualGrossRentEur = inputs.estimatedMonthlyRentEur * 12;
  const grossRentRon = annualGrossRentEur * taxSettings.eurToRonRate;
  const annualMaintenanceAndInsuranceEur = (inputs.monthlyOperatingExpensesEur * 12) + taxSettings.padInsuranceAnnualEur + taxSettings.facultativeInsuranceAnnualEur;
  
  // A. PF Forfetar (Standard)
  const taxableRentRonFlat = grossRentRon * 0.80;
  const taxRonFlat = taxableRentRonFlat * 0.10;
  let cassRonFlat = 0;
  const minWage = taxSettings.minimumWageRon;
  if (taxableRentRonFlat >= 24 * minWage) cassRonFlat = 24 * minWage * 0.10;
  else if (taxableRentRonFlat >= 12 * minWage) cassRonFlat = 12 * minWage * 0.10;
  else if (taxableRentRonFlat >= 6 * minWage) cassRonFlat = 6 * minWage * 0.10;
  const annualTaxEurFlat = (taxRonFlat + cassRonFlat) / taxSettings.eurToRonRate;

  // B. PF Sistem Real (Actual Expenses)
  const deductibleExpensesRon = annualMaintenanceAndInsuranceEur * taxSettings.eurToRonRate;
  const netIncomeRealRon = Math.max(0, grossRentRon - deductibleExpensesRon);
  const taxRonReal = netIncomeRealRon * 0.10;
  let cassRonReal = 0;
  if (netIncomeRealRon >= 24 * minWage) cassRonReal = 24 * minWage * 0.10;
  else if (netIncomeRealRon >= 12 * minWage) cassRonReal = 12 * minWage * 0.10;
  else if (netIncomeRealRon >= 6 * minWage) cassRonReal = 6 * minWage * 0.10;
  const annualTaxEurReal = (taxRonReal + cassRonReal) / taxSettings.eurToRonRate;

  // C. SRL Micro (1% or 3% micro + 8% dividend tax on net profit)
  const microTurnoverTaxRon = grossRentRon * 0.01;
  const srlAccountingCostEur = 600;
  const srlNetProfitEur = Math.max(0, annualGrossRentEur - (microTurnoverTaxRon / taxSettings.eurToRonRate) - annualMaintenanceAndInsuranceEur - srlAccountingCostEur);
  const srlDividendTaxEur = srlNetProfitEur * 0.08;
  const annualTaxEurSRL = (microTurnoverTaxRon / taxSettings.eurToRonRate) + srlDividendTaxEur + srlAccountingCostEur;

  const taxRegimesComparison: TaxRegimeComparison[] = [
    {
      regime: 'INDIVIDUAL_FLAT',
      label: 'Persoană Fizică (Normă Forfetară 20% Deducere)',
      annualTaxEur: Math.round(annualTaxEurFlat),
      effectiveTaxRatePercent: parseFloat(((annualTaxEurFlat / annualGrossRentEur) * 100).toFixed(1)),
      annualNetIncomeEur: Math.round(annualGrossRentEur - annualTaxEurFlat - annualMaintenanceAndInsuranceEur)
    },
    {
      regime: 'INDIVIDUAL_REAL',
      label: 'Persoană Fizică (Sistem Real pe Bază de Facturi)',
      annualTaxEur: Math.round(annualTaxEurReal),
      effectiveTaxRatePercent: parseFloat(((annualTaxEurReal / annualGrossRentEur) * 100).toFixed(1)),
      annualNetIncomeEur: Math.round(annualGrossRentEur - annualTaxEurReal - annualMaintenanceAndInsuranceEur)
    },
    {
      regime: 'SRL_MICRO',
      label: 'Microîntreprindere SRL (1% Cifră Afaceri + 8% Dividende)',
      annualTaxEur: Math.round(annualTaxEurSRL),
      effectiveTaxRatePercent: parseFloat(((annualTaxEurSRL / annualGrossRentEur) * 100).toFixed(1)),
      annualNetIncomeEur: Math.round(annualGrossRentEur - annualTaxEurSRL - annualMaintenanceAndInsuranceEur)
    }
  ];

  // Selected regime tax
  let selectedAnnualTaxEur = annualTaxEurFlat;
  if (inputs.taxRegime === 'INDIVIDUAL_REAL') selectedAnnualTaxEur = annualTaxEurReal;
  else if (inputs.taxRegime === 'SRL_MICRO') selectedAnnualTaxEur = annualTaxEurSRL;

  const annualTaxesAndExpensesEur = selectedAnnualTaxEur + annualMaintenanceAndInsuranceEur;
  const annualMortgagePaymentsEur = inputs.hasExistingMortgage ? inputs.monthlyMortgagePaymentEur * 12 : 0;
  const annualNetRentalCashFlowEur = annualGrossRentEur - annualTaxesAndExpensesEur - annualMortgagePaymentsEur;
  const monthlyNetRentalCashFlowEur = annualNetRentalCashFlowEur / 12;

  // Property Appreciation Rate
  const appreciationRate = Math.max(0, (inputs.propertyAppreciationRatePercent ?? 3.5) / 100);
  const inflationRate = inputs.adjustForInflation ? (inputs.annualInflationRatePercent ?? 3.0) / 100 : 0;

  // Short-Term Renting Calculation
  const annualShortTermNetCashFlowEur = inputs.includeShortTermOption
    ? inputs.estimatedShortTermMonthlyNetEur * 12 - annualMortgagePaymentsEur
    : 0;

  // 4. Multi-Year Projection (Year 1 to 15) with Accelerated Prepayment support
  const maxYears = 15;
  const yearlyBreakdown: YearlyWealthPoint[] = [];
  let mortgageDebtFreeYear: number | undefined = undefined;
  let remainingMortgageTracker = inputs.hasExistingMortgage ? inputs.remainingMortgageBalanceEur : 0;
  let cumulativeCashFlowTracker = 0;

  for (let yr = 1; yr <= maxYears; yr++) {
    // Selling Route
    let sellingWealth = reinvestmentRate > 0 
      ? netCashProceedsFromSaleEur * Math.pow(1 + reinvestmentRate, yr)
      : netCashProceedsFromSaleEur;

    // Property Value
    const propertyValue = salePrice * Math.pow(1 + appreciationRate, yr);

    // Mortgage Amortization (Standard vs Accelerated Prepayment)
    if (inputs.hasExistingMortgage && remainingMortgageTracker > 0) {
      if (inputs.reinvestCashFlowToPrepayMortgage && annualNetRentalCashFlowEur > 0) {
        // Apply surplus cash to accelerate principal payoff
        const regularPrincipalPayment = inputs.remainingMortgageBalanceEur / Math.max(1, inputs.remainingMortgageYears);
        const totalPrincipalPaidThisYear = regularPrincipalPayment + annualNetRentalCashFlowEur;
        remainingMortgageTracker = Math.max(0, remainingMortgageTracker - totalPrincipalPaidThisYear);
        if (remainingMortgageTracker === 0 && !mortgageDebtFreeYear) {
          mortgageDebtFreeYear = yr;
        }
      } else {
        const remainingFraction = Math.max(0, 1 - (yr / Math.max(1, inputs.remainingMortgageYears)));
        remainingMortgageTracker = inputs.remainingMortgageBalanceEur * remainingFraction;
      }
    }

    if (!inputs.reinvestCashFlowToPrepayMortgage) {
      cumulativeCashFlowTracker += annualNetRentalCashFlowEur;
    }

    // Renting Wealth
    const rentingWealth = (propertyValue - remainingMortgageTracker) + cumulativeCashFlowTracker;

    // Short-Term Wealth
    let shortTermWealth: number | undefined = undefined;
    if (inputs.includeShortTermOption) {
      const cumulativeShortTerm = annualShortTermNetCashFlowEur * yr;
      shortTermWealth = (propertyValue - remainingMortgageTracker) + cumulativeShortTerm;
    }

    // Inflation adjustments
    const inflationFactor = Math.pow(1 + inflationRate, yr);
    const realPurchasingPowerSelling = inputs.adjustForInflation ? sellingWealth / inflationFactor : undefined;
    const realPurchasingPowerRenting = inputs.adjustForInflation ? rentingWealth / inflationFactor : undefined;

    yearlyBreakdown.push({
      year: yr,
      sellingWealth,
      rentingWealth,
      shortTermWealth,
      propertyValue,
      remainingMortgage: remainingMortgageTracker,
      cumulativeRentalCashFlow: cumulativeCashFlowTracker,
      realPurchasingPowerSelling,
      realPurchasingPowerRenting
    });
  }

  // Horizon metrics
  const horizon = Math.min(15, Math.max(1, inputs.projectionHorizonYears || 5));
  const horizonPoint = yearlyBreakdown.find((p) => p.year === horizon) || yearlyBreakdown[4];
  const point5Y = yearlyBreakdown[4];
  const point10Y = yearlyBreakdown[9];

  const selectedHorizonReinvestmentWealthEur = inputs.adjustForInflation 
    ? (horizonPoint.realPurchasingPowerSelling ?? horizonPoint.sellingWealth)
    : horizonPoint.sellingWealth;

  const selectedHorizonRentalWealthEur = inputs.adjustForInflation
    ? (horizonPoint.realPurchasingPowerRenting ?? horizonPoint.rentingWealth)
    : horizonPoint.rentingWealth;

  const selectedHorizonShortTermWealthEur = horizonPoint.shortTermWealth ?? 0;

  const fiveYearReinvestmentWealthEur = point5Y.sellingWealth;
  const fiveYearRentalWealthEur = point5Y.rentingWealth;
  const fiveYearShortTermWealthEur = point5Y.shortTermWealth ?? 0;

  const tenYearReinvestmentWealthEur = point10Y.sellingWealth;
  const tenYearRentalWealthEur = point10Y.rentingWealth;

  // 5. Stress-Test Scenarios (Bear, Base, Bull)
  const stressScenarios: StressScenarioResult[] = [
    {
      scenarioName: 'Bear (Pessimistic)',
      appreciationRate: 0.0,
      vacancyMonths: 2,
      sellingWealthHorizon: Math.round(selectedHorizonReinvestmentWealthEur),
      rentingWealthHorizon: Math.round((salePrice * 1.0) - (inputs.hasExistingMortgage ? inputs.remainingMortgageBalanceEur * 0.7 : 0) + (annualNetRentalCashFlowEur * 0.7 * horizon)),
      recommendation: (salePrice * 1.0 + annualNetRentalCashFlowEur * 0.7 * horizon) > selectedHorizonReinvestmentWealthEur ? 'RENT_LONG_TERM' : 'SELL'
    },
    {
      scenarioName: 'Base (Realistic)',
      appreciationRate: inputs.propertyAppreciationRatePercent,
      vacancyMonths: 0.6,
      sellingWealthHorizon: Math.round(selectedHorizonReinvestmentWealthEur),
      rentingWealthHorizon: Math.round(selectedHorizonRentalWealthEur),
      recommendation: selectedHorizonRentalWealthEur >= selectedHorizonReinvestmentWealthEur ? 'RENT_LONG_TERM' : 'SELL'
    },
    {
      scenarioName: 'Bull (Optimistic)',
      appreciationRate: inputs.propertyAppreciationRatePercent + 2.5,
      vacancyMonths: 0.0,
      sellingWealthHorizon: Math.round(selectedHorizonReinvestmentWealthEur),
      rentingWealthHorizon: Math.round((salePrice * Math.pow(1 + (appreciationRate + 0.025), horizon)) - (inputs.hasExistingMortgage ? inputs.remainingMortgageBalanceEur * 0.6 : 0) + (annualNetRentalCashFlowEur * 1.15 * horizon)),
      recommendation: 'RENT_LONG_TERM'
    }
  ];

  // 6. Strategic Verdict
  let recommendedStrategy: 'SELL' | 'RENT_LONG_TERM' | 'RENT_SHORT_TERM' = 'RENT_LONG_TERM';
  const verdictHighlights: string[] = [];

  const rentAdvantageAtHorizon = selectedHorizonRentalWealthEur - selectedHorizonReinvestmentWealthEur;
  const shortTermAdvantageAtHorizon = selectedHorizonShortTermWealthEur - selectedHorizonRentalWealthEur;

  if (inputs.includeShortTermOption && shortTermAdvantageAtHorizon > 8000 && annualShortTermNetCashFlowEur > annualNetRentalCashFlowEur * 1.25) {
    recommendedStrategy = 'RENT_SHORT_TERM';
    verdictHighlights.push(`Short-Term Rental (Airbnb) maximizes monthly cash flow (+€${Math.round(annualShortTermNetCashFlowEur / 12)}/mo net).`);
    verdictHighlights.push(`Reaches €${Math.round(selectedHorizonShortTermWealthEur).toLocaleString()} net wealth at Year ${horizon} (+€${Math.round(selectedHorizonShortTermWealthEur - selectedHorizonReinvestmentWealthEur).toLocaleString()} more than selling).`);
  } else if (selectedHorizonRentalWealthEur >= selectedHorizonReinvestmentWealthEur) {
    recommendedStrategy = 'RENT_LONG_TERM';
    verdictHighlights.push(`Holding & Renting delivers +€${Math.round(rentAdvantageAtHorizon).toLocaleString()} more net worth at Year ${horizon} compared to selling.`);
    verdictHighlights.push(`Captures ${inputs.propertyAppreciationRatePercent}% p.a. property appreciation while tenants fund mortgage debt principal.`);
    if (monthlyNetRentalCashFlowEur > 0) {
      verdictHighlights.push(`Positive monthly net cash flow: +€${Math.round(monthlyNetRentalCashFlowEur)}/month in your pocket.`);
    }
    if (inputs.reinvestCashFlowToPrepayMortgage && mortgageDebtFreeYear) {
      verdictHighlights.push(`Accelerated prepayment makes the property 100% DEBT-FREE in Year ${mortgageDebtFreeYear} (saving thousands in bank interest).`);
    }
  } else {
    recommendedStrategy = 'SELL';
    verdictHighlights.push(`Selling now unlocks €${Math.round(netCashProceedsFromSaleEur).toLocaleString()} in liquid cash.`);
    if (reinvestmentRate > 0) {
      verdictHighlights.push(`Reinvesting at ${inputs.alternativeInvestmentReturnRatePercent}% p.a. (e.g. Titluri Tezaur / ETF) beats property returns by €${Math.round(-rentAdvantageAtHorizon).toLocaleString()} over ${horizon} years.`);
    } else {
      verdictHighlights.push(`Gives you €${Math.round(netCashProceedsFromSaleEur).toLocaleString()} immediate liquidity without tenant management or vacancy obligations.`);
    }
  }

  let breakEvenHorizonYears = 3;
  for (const pt of yearlyBreakdown) {
    if (pt.rentingWealth >= pt.sellingWealth) {
      breakEvenHorizonYears = pt.year;
      break;
    }
  }

  const wealthDifferenceAtHorizonEur = Math.abs(rentAdvantageAtHorizon);

  let verdictSummary = '';
  if (recommendedStrategy === 'RENT_LONG_TERM') {
    verdictSummary = `Recommendation: KEEP & RENT LONG-TERM. Total wealth at Year ${horizon} is projected at €${Math.round(selectedHorizonRentalWealthEur).toLocaleString()} (+€${Math.round(rentAdvantageAtHorizon).toLocaleString()} higher than selling).`;
  } else if (recommendedStrategy === 'RENT_SHORT_TERM') {
    verdictSummary = `Recommendation: SHORT-TERM (AIRBNB) STRATEGY. Generates highest monthly cash flow with €${Math.round(selectedHorizonShortTermWealthEur).toLocaleString()} total wealth at Year ${horizon}.`;
  } else {
    verdictSummary = `Recommendation: SELL NOW. Net proceeds of €${Math.round(netCashProceedsFromSaleEur).toLocaleString()} provide superior liquidity and financial return.`;
  }

  return {
    grossSalePriceEur: salePrice,
    transferTaxRatePercent,
    transferTaxEur,
    notaryAndAgentFeesEur,
    prepaymentPenaltyEur,
    sellingPreparationCostEur,
    mortgagePayoffEur,
    netCashProceedsFromSaleEur,
    annualReinvestmentIncomeEur,
    selectedHorizonReinvestmentWealthEur,
    fiveYearReinvestmentWealthEur,
    tenYearReinvestmentWealthEur,
    annualGrossRentEur,
    annualTaxesAndExpensesEur,
    annualMortgagePaymentsEur,
    annualNetRentalCashFlowEur,
    monthlyNetRentalCashFlowEur,
    selectedHorizonRentalWealthEur,
    fiveYearRentalWealthEur,
    tenYearRentalWealthEur,
    includeShortTermOption: inputs.includeShortTermOption,
    annualShortTermNetCashFlowEur,
    selectedHorizonShortTermWealthEur,
    fiveYearShortTermWealthEur,
    yearlyBreakdown,
    taxRegimesComparison,
    stressScenarios,
    mortgageDebtFreeYear,
    recommendedStrategy,
    wealthDifferenceAtHorizonEur,
    breakEvenHorizonYears,
    verdictSummary,
    verdictHighlights
  };
}
