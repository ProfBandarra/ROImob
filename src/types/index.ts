export type Language = 'en' | 'ro' | 'fr' | 'de' | 'uk';

export type SeismicRiskClass = 'RsI' | 'RsII' | 'RsIII' | 'RsIV' | 'U1' | 'U2' | 'U3' | 'UNEXPERTIZED_PRE_1977' | 'POST_1977_SAFE' | 'NEW_BUILD_SAFE';

export type FloodHazardLevel = 'HIGH_HQ10' | 'MEDIUM_HQ100' | 'LOW_HQ1000' | 'NONE';

export interface DataProvenance {
  sourceName: string;
  authority: string;
  endpointUrl: string;
  updateCadence: 'Hourly' | 'Daily' | 'Monthly' | 'Quarterly' | 'Annually' | 'Static/Official Regs';
  lastSynced: string; // ISO String
  reliability: 'Verified Official' | 'Live Stream' | 'INSSE Validated' | 'Cadastre Direct' | 'Marketplace Scraped';
  datasetId?: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: 'Bucharest' | 'Cluj-Napoca' | 'Timișoara' | 'Iași' | 'Brașov' | 'Constanța' | 'Sibiu' | 'Oradea' | 'Ilfov';
  county: string;
  coordinates: [number, number]; // [lat, lng]
  priceEur: number;
  usableAreaSqm: number;
  rooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  cadastralNumber?: string;
  landBookNumber?: string;
  thumbnailUrl: string;
  description: string;
  features: string[];
  sourcePlatform?: 'OLX.ro' | 'Imobiliare.ro' | 'Storia.ro' | 'Direct Cadastre';
  sourceListingUrl?: string;
  
  // Real Estate Diagnostics & Official Risk Metadata
  diagnostics: {
    seismic: {
      riskClass: SeismicRiskClass;
      amccrsCode?: string;
      expertizeYear?: number;
      structuralType: string;
      groundAccelerationAg: number; // e.g. 0.30g in Bucharest, 0.20g in Brasov
      mortgageEligibility: 'FULL' | 'CONDITIONAL' | 'INELIGIBLE';
      provenance: DataProvenance;
    };
    flood: {
      level: FloodHazardLevel;
      catchmentBasin: string;
      provenance: DataProvenance;
    };
    heritage: {
      isMonument: boolean;
      lmiCode?: string;
      protectedZoneName?: string;
      renovationConstraints: string;
      provenance: DataProvenance;
    };
    airQuality: {
      aqi: number; // 0 - 500 (lower is better, <50 is Good)
      pm25: number; // ug/m3
      pm10: number;
      status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy';
      nearestSensor: string;
      provenance: DataProvenance;
    };
    education: {
      nearestSchoolName: string;
      schoolDistanceMeters: number;
      examAverageScore: number; // out of 10 (Evaluarea Nationala)
      provenance: DataProvenance;
    };
    mobility: {
      walkScore: number; // 0-100
      transitScore: number; // 0-100
      nearestMetroStation?: string;
      metroDistanceMeters?: number;
      commuteToCityCenterMin: number;
      provenance: DataProvenance;
    };
  };

  // Investment Financial Baseline
  investment: {
    monthlyRentEstimateEur: number;
    shortTermNightlyRateEur: number;
    shortTermOccupancyPercent: number;
    managementFeePercent: number;
    estimatedRenovationCostEur: number;
  };
}

export interface MapLayerConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  color: string;
  icon: string;
  provenance: DataProvenance;
}

export interface CountyMacroStats {
  countyCode: string;
  countyName: string;
  cityCenterCoords: [number, number];
  averageNetSalaryEur: number; // INSSE FOM107D
  salaryYoYGrowthPercent: number;
  monthlyAncpiTransactions: number; // ANCPI Sales
  transactionsYoYPercent: number;
  buildingPermitsQuarterly: number; // INSSE LOC101A
  populationResident: number; // INSSE POP105A
  population5YrGrowthPercent: number;
  priceToIncomeYears: number; // Years of avg local salary to buy 60sqm apt
  provenance: DataProvenance;
}

export interface ROITaxSettings {
  // Romanian Tax Law specifics (2024-2026)
  flatTaxRatePercent: number; // 10%
  flatDeductionPercent: number; // 20% deductible flat expense => 8% effective rate
  cassMinWageThresholds: {
    sixSalaries: number; // 6 x 3700 RON (or updated min wage)
    twelveSalaries: number;
    twentyFourSalaries: number;
  };
  minimumWageRon: number;
  eurToRonRate: number;
  localPropertyTaxPercent: number; // e.g. 0.1% of taxable value
  padInsuranceAnnualEur: number; // e.g. 20 EUR or 130 RON
  facultativeInsuranceAnnualEur: number;
  annualMaintenanceReservePercent: number; // e.g. 1%
  vacancyRatePercent: number; // e.g. 5%
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
  
  // Mortgage specific
  downPaymentEur: number;
  loanAmountEur: number;
  monthlyMortgagePaymentEur: number;
  annualDebtServiceEur: number;
  annualCashFlowAfterDebtEur: number;
  monthlyCashFlowAfterDebtEur: number;
  cashOnCashReturnPercent: number;

  // Comparison with Short Term (Airbnb)
  shortTermGrossAnnualEur: number;
  shortTermNetAnnualEur: number;
  shortTermYieldPercent: number;
}

// Sell vs Rent Owner Analysis Models
export interface SellVsRentInputs {
  currentPropertyMarketValueEur: number;
  ownershipDurationYears: number; // >3 years = 1% RO tax, <3 years = 3% RO tax
  hasExistingMortgage: boolean;
  remainingMortgageBalanceEur: number;
  monthlyMortgagePaymentEur: number;
  remainingMortgageYears: number;
  mortgageInterestRatePercent: number;
  
  // Renting Assumptions
  estimatedMonthlyRentEur: number;
  monthlyOperatingExpensesEur: number;
  isShortTermRentCandidate: boolean;
  estimatedShortTermMonthlyNetEur: number;

  // Alternative Reinvestment for Sale Proceeds
  alternativeInvestmentReturnRatePercent: number; // e.g. 7% Romanian Treasury Bonds (Titluri Tezaur/Fidelis) or S&P500
}

export interface SellVsRentResult {
  // Selling Route
  grossSalePriceEur: number;
  transferTaxRatePercent: number; // 1% or 3% under Romanian Fiscal Code Art. 111
  transferTaxEur: number;
  notaryAndAgentFeesEur: number;
  mortgagePayoffEur: number;
  netCashProceedsFromSaleEur: number;
  
  // Reinvestment of Sale Proceeds
  annualReinvestmentIncomeEur: number;
  fiveYearReinvestmentWealthEur: number;
  tenYearReinvestmentWealthEur: number;

  // Long-Term Renting Route
  annualGrossRentEur: number;
  annualTaxesAndExpensesEur: number;
  annualMortgagePaymentsEur: number;
  annualNetRentalCashFlowEur: number;
  monthlyNetRentalCashFlowEur: number;
  fiveYearRentalWealthEur: number; // Cumulative cash flow + property appreciation + equity build-up
  tenYearRentalWealthEur: number;

  // Short-Term Renting Route
  annualShortTermNetCashFlowEur: number;
  fiveYearShortTermWealthEur: number;

  // Final Verdict & Recommendation
  recommendedStrategy: 'SELL' | 'RENT_LONG_TERM' | 'RENT_SHORT_TERM';
  breakEvenHorizonYears: number;
  verdictSummary: string;
  verdictHighlights: string[];
}
