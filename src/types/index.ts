export type Language = 'en' | 'ro' | 'fr' | 'de' | 'uk';

export type SeismicRiskClass = 'RsI' | 'RsII' | 'RsIII' | 'RsIV' | 'U1' | 'U2' | 'U3' | 'UNEXPERTIZED_PRE_1977' | 'POST_1977_SAFE' | 'NEW_BUILD_SAFE';

export type FloodHazardLevel = 'HIGH_HQ10' | 'MEDIUM_HQ100' | 'LOW_HQ1000' | 'NONE';

export interface DataProvenance {
  sourceName: string;
  authority: string;
  endpointUrl: string;
  updateCadence: 'Hourly' | 'Daily' | 'Monthly' | 'Quarterly' | 'Annually' | 'Static/Official Regs';
  lastSynced: string;
  reliability: 'Verified Official' | 'Live Stream' | 'INSSE Validated' | 'Cadastre Direct' | 'Marketplace Scraped';
  datasetId?: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  city: 'Bucharest' | 'Cluj-Napoca' | 'Timișoara' | 'Iași' | 'Brașov' | 'Constanța' | 'Sibiu' | 'Oradea' | 'Ilfov';
  county: string;
  coordinates: [number, number];
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
  sourcePlatform?: 'OLX.ro' | 'Imobiliare.ro' | 'Storia.ro' | 'Homezz.ro' | 'Direct Cadastre';
  sourceListingUrl?: string;
  
  isPartial?: boolean;
  missingFields?: string[];
  
  diagnostics: {
    seismic: {
      riskClass: SeismicRiskClass;
      amccrsCode?: string;
      expertizeYear?: number;
      structuralType: string;
      groundAccelerationAg: number;
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
      aqi: number;
      pm25: number;
      pm10: number;
      status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy';
      nearestSensor: string;
      provenance: DataProvenance;
    };
    education: {
      nearestSchoolName: string;
      schoolDistanceMeters: number;
      examAverageScore: number;
      provenance: DataProvenance;
    };
    mobility: {
      walkScore: number;
      transitScore: number;
      nearestMetroStation?: string;
      metroDistanceMeters?: number;
      commuteToCityCenterMin: number;
      provenance: DataProvenance;
    };
  };

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
  averageNetSalaryEur: number;
  salaryYoYGrowthPercent: number;
  monthlyAncpiTransactions: number;
  transactionsYoYPercent: number;
  buildingPermitsQuarterly: number;
  populationResident: number;
  population5YrGrowthPercent: number;
  priceToIncomeYears: number;
  provenance: DataProvenance;
}

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

// -------------------------------------------------------------
// ADVANCED SELL VS RENT OWNER OPTIMIZER TYPES
// -------------------------------------------------------------
export type RentalTaxRegime = 'INDIVIDUAL_FLAT' | 'INDIVIDUAL_REAL' | 'SRL_MICRO' | 'INFORMAL_ZERO_TAX';

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

  // Informal / Unreported sale under-declaration option (Market friction comparison)
  simulateInformalSellingPriceUnderdeclaration: boolean;
  unreportedDeclaredPriceEur: number; // e.g. lower value in notary deed

  // Renting Assumptions
  estimatedMonthlyRentEur: number;
  monthlyOperatingExpensesEur: number;
  propertyAppreciationRatePercent: number;
  
  // Tax Regime (including informal/unregistered lease option)
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
