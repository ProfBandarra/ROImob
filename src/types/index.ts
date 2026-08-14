export type Language = 'en' | 'ro' | 'fr' | 'de' | 'uk';

export type RentalTaxRegime = 'INDIVIDUAL_FLAT' | 'INDIVIDUAL_REAL' | 'SRL_MICRO' | 'INFORMAL_ZERO_TAX';

export interface ROITaxSettings {
  flatTaxRatePercent: number;
  flatDeductionPercent: number;
  cassMinWageThresholds: {
    sixSalaries: number;
    twelveSalaries: number;
    twentyFourSalaries: number;
  };
  minimumWageRon: number;
  eurToRonRate: number;
  localPropertyTaxPercent: number;
  padInsuranceAnnualEur: number;
  facultativeInsuranceAnnualEur: number;
  annualMaintenanceReservePercent: number;
  vacancyRatePercent: number;
}

export interface FinancialCalculationResult {
  purchasePrice: number;
  totalAcquisitionCost: number;
  grossAnnualRent: number;
  grossYieldPercent: number;
  annualOperatingExpenses: number;
  annualTaxesRon: {
    rentalIncomeTaxRon: number;
    cassHealthTaxRon: number;
    propertyTaxRon: number;
  };
  annualTaxesEur: number;
  netOperatingIncomeEur: number;
  netYieldPercent: number;
  
  downPaymentEur: number;
  loanAmountEur: number;
  monthlyMortgagePaymentEur: number;
  annualDebtServiceEur: number;
  annualCashFlowAfterDebtEur: number;
  monthlyCashFlowAfterDebtEur: number;
  cashOnCashReturnPercent: number;

  shortTermGrossAnnualEur: number;
  shortTermNetAnnualEur: number;
  shortTermYieldPercent: number;
}

export interface SellVsRentInputs {
  currentPropertyMarketValueEur: number;
  ownershipDurationYears: number;
  hasExistingMortgage: boolean;
  remainingMortgageBalanceEur: number;
  monthlyMortgagePaymentEur: number;
  remainingMortgageYears: number;
  mortgageInterestRatePercent: number;
  earlyMortgagePrepaymentFeePercent: number;
  
  // Transaction & Selling Costs
  realEstateAgentCommissionPercent: number;
  sellingPreparationCostEur: number;

  // Informal / Unreported sale under-declaration option
  simulateInformalSellingPriceUnderdeclaration: boolean;
  unreportedDeclaredPriceEur: number;

  // Renting Assumptions
  estimatedMonthlyRentEur: number;
  monthlyOperatingExpensesEur: number;
  propertyAppreciationRatePercent: number;
  
  // Tax Regime
  taxRegime: RentalTaxRegime;

  // Short-Term Rental Toggle & Assumptions
  includeShortTermOption: boolean;
  estimatedShortTermMonthlyNetEur: number;

  // Alternative Reinvestment for Sale Proceeds
  alternativeInvestmentReturnRatePercent: number;

  // Inflation & Real vs Nominal
  adjustForInflation: boolean;
  annualInflationRatePercent: number;

  // Accelerated Prepayment Toggle
  reinvestCashFlowToPrepayMortgage: boolean;

  // Projection Horizon
  projectionHorizonYears: number;
}

export interface YearlyWealthPoint {
  year: number;
  sellingWealth: number;
  rentingWealth: number;
  shortTermWealth?: number;
  propertyValue: number;
  remainingMortgage: number;
  cumulativeRentalCashFlow: number;
  realPurchasingPowerSelling?: number;
  realPurchasingPowerRenting?: number;
}

export interface StressScenarioResult {
  scenarioName: 'Bear (Pessimistic)' | 'Base (Realistic)' | 'Bull (Optimistic)';
  appreciationRate: number;
  vacancyMonths: number;
  sellingWealthHorizon: number;
  rentingWealthHorizon: number;
  recommendation: 'SELL' | 'RENT_LONG_TERM';
}

export interface TaxRegimeComparison {
  regime: RentalTaxRegime;
  label: string;
  annualTaxEur: number;
  effectiveTaxRatePercent: number;
  annualNetIncomeEur: number;
  legalRiskLevel: 'LEGAL_COMPLIANT' | 'HIGH_LEGAL_RISK_ANAF';
}

export interface LegalRiskAnalysis {
  hasInformalRenting: boolean;
  hasInformalSelling: boolean;
  anfePenaltiesEstimateEur: number;
  disclaimerNotice: string;
  penaltiesDescription: string;
}

export interface SellVsRentResult {
  grossSalePriceEur: number;
  transferTaxRatePercent: number;
  transferTaxEur: number;
  notaryAndAgentFeesEur: number;
  prepaymentPenaltyEur: number;
  sellingPreparationCostEur: number;
  mortgagePayoffEur: number;
  netCashProceedsFromSaleEur: number;
  
  annualReinvestmentIncomeEur: number;
  selectedHorizonReinvestmentWealthEur: number;
  fiveYearReinvestmentWealthEur: number;
  tenYearReinvestmentWealthEur: number;

  annualGrossRentEur: number;
  annualTaxesAndExpensesEur: number;
  annualMortgagePaymentsEur: number;
  annualNetRentalCashFlowEur: number;
  monthlyNetRentalCashFlowEur: number;
  selectedHorizonRentalWealthEur: number;
  fiveYearRentalWealthEur: number;
  tenYearRentalWealthEur: number;

  includeShortTermOption: boolean;
  annualShortTermNetCashFlowEur: number;
  selectedHorizonShortTermWealthEur: number;
  fiveYearShortTermWealthEur: number;

  yearlyBreakdown: YearlyWealthPoint[];
  taxRegimesComparison: TaxRegimeComparison[];
  stressScenarios: StressScenarioResult[];
  legalRisk: LegalRiskAnalysis;

  mortgageDebtFreeYear?: number;
  totalMortgageInterestSavedEur?: number;

  recommendedStrategy: 'SELL' | 'RENT_LONG_TERM' | 'RENT_SHORT_TERM';
  wealthDifferenceAtHorizonEur: number;
  breakEvenHorizonYears: number;
  verdictSummary: string;
  verdictHighlights: string[];
}
