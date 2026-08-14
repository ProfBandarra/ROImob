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
  flatTaxRatePercent: number; // 10%
  flatDeductionPercent: number; // 20% deductible flat expense => 8% effective rate
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

// -------------------------------------------------------------
// ADVANCED SELL VS RENT OWNER OPTIMIZER TYPES
// -------------------------------------------------------------
export interface SellVsRentInputs {
  currentPropertyMarketValueEur: number;
  ownershipDurationYears: number; // >3 years = 1% RO tax, <=3 years = 3% RO tax
  hasExistingMortgage: boolean;
  remainingMortgageBalanceEur: number;
  monthlyMortgagePaymentEur: number;
  remainingMortgageYears: number;
  mortgageInterestRatePercent: number;
  earlyMortgagePrepaymentFeePercent: number; // 0% (standard variable) or up to 1% (fixed)
  
  // Transaction & Selling Costs
  realEstateAgentCommissionPercent: number; // 0% (Direct Owner) to 3%
  sellingPreparationCostEur: number; // Painting, staging, repairs

  // Renting Assumptions
  estimatedMonthlyRentEur: number;
  monthlyOperatingExpensesEur: number;
  propertyAppreciationRatePercent: number; // 0% to 8% p.a., default 3.5%
  
  // Short-Term Rental Toggle & Assumptions
  includeShortTermOption: boolean;
  estimatedShortTermMonthlyNetEur: number;

  // Alternative Reinvestment for Sale Proceeds (Supports 0% to 15%)
  alternativeInvestmentReturnRatePercent: number;

  // Projection Horizon
  projectionHorizonYears: number; // 1, 3, 5, 10, 15
}

export interface YearlyWealthPoint {
  year: number;
  sellingWealth: number;
  rentingWealth: number;
  shortTermWealth?: number;
  propertyValue: number;
  remainingMortgage: number;
  cumulativeRentalCashFlow: number;
}

export interface SellVsRentResult {
  // Selling Route Breakdown
  grossSalePriceEur: number;
  transferTaxRatePercent: number; // 1% or 3% (Cod Fiscal Art. 111)
  transferTaxEur: number;
  notaryAndAgentFeesEur: number;
  prepaymentPenaltyEur: number;
  sellingPreparationCostEur: number;
  mortgagePayoffEur: number;
  netCashProceedsFromSaleEur: number;
  
  // Reinvestment of Sale Proceeds
  annualReinvestmentIncomeEur: number;
  selectedHorizonReinvestmentWealthEur: number;
  fiveYearReinvestmentWealthEur: number;
  tenYearReinvestmentWealthEur: number;

  // Long-Term Renting Route Breakdown
  annualGrossRentEur: number;
  annualTaxesAndExpensesEur: number;
  annualMortgagePaymentsEur: number;
  annualNetRentalCashFlowEur: number;
  monthlyNetRentalCashFlowEur: number;
  selectedHorizonRentalWealthEur: number;
  fiveYearRentalWealthEur: number;
  tenYearRentalWealthEur: number;

  // Short-Term Renting Route Breakdown (if enabled)
  includeShortTermOption: boolean;
  annualShortTermNetCashFlowEur: number;
  selectedHorizonShortTermWealthEur: number;
  fiveYearShortTermWealthEur: number;

  // Multi-Year Amortization Schedule
  yearlyBreakdown: YearlyWealthPoint[];

  // Final Verdict & Recommendation
  recommendedStrategy: 'SELL' | 'RENT_LONG_TERM' | 'RENT_SHORT_TERM';
  wealthDifferenceAtHorizonEur: number;
  breakEvenHorizonYears: number;
  verdictSummary: string;
  verdictHighlights: string[];
}
