export interface TranslationDictionary {
  appName: string;
  appTagline: string;
  nav: {
    map: string;
    properties: string;
    listingAnalyzer: string;
    sellVsRent: string;
    calculator: string;
    openDataHub: string;
    report: string;
    dataFreshness: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    searchPlaceholder: string;
    selectCity: string;
    allCities: string;
    quickStats: {
      sourcesIndexed: string;
      seismicBuildings: string;
      cadastralRecords: string;
      lastSync: string;
    };
  };
  listingAnalyzer: {
    title: string;
    subtitle: string;
    urlInputPlaceholder: string;
    analyzeButton: string;
    analyzing: string;
    supportedPlatforms: string;
    quickSampleOffers: string;
    trySample: string;
    dossierReady: string;
    extractedSpecs: string;
    officialCrossCheck: string;
    valuationComparison: string;
  };
  sellVsRent: {
    title: string;
    subtitle: string;
    propertyValuation: string;
    ownershipDuration: string;
    moreThan3Years: string;
    lessThan3Years: string;
    mortgageStatus: string;
    hasMortgage: string;
    noMortgage: string;
    remainingLoanBalance: string;
    monthlyInstallment: string;
    alternativeReinvestmentRate: string;
    rentalExpectation: string;
    verdictTitle: string;
    sellScenario: {
      title: string;
      netProceeds: string;
      transferTax: string;
      reinvestmentGain5Y: string;
    };
    rentScenario: {
      title: string;
      monthlyCashFlow: string;
      equityBuilt5Y: string;
      totalWealth5Y: string;
    };
    shortTermScenario: {
      title: string;
      airbnbMonthlyNet: string;
      totalWealth5Y: string;
    };
    recommendationLabel: string;
  };
  mapLayers: {
    title: string;
    subtitle: string;
    seismicRisk: string;
    floodHazard: string;
    schoolsEducation: string;
    hospitalsHealthcare: string;
    airQuality: string;
    historicalMonuments: string;
    publicTransit: string;
    legend: string;
    updated: string;
    source: string;
  };
  propertyDetails: {
    diagnosticDossier: string;
    tripleScore: string;
    livabilityIndex: string;
    safetyScore: string;
    investmentViability: string;
    specs: {
      price: string;
      area: string;
      pricePerSqm: string;
      rooms: string;
      floor: string;
      yearBuilt: string;
      cadastralNr: string;
      landBook: string;
    };
    risks: {
      title: string;
      seismicRisk: string;
      floodRisk: string;
      heritageProtection: string;
      mortgageStatus: string;
      groundAcceleration: string;
    };
    surroundings: {
      title: string;
      airQuality: string;
      nearestSchool: string;
      schoolExamAverage: string;
      walkScore: string;
      transitScore: string;
      metroDistance: string;
      centerCommute: string;
    };
    exportDossier: string;
  };
  calculator: {
    title: string;
    subtitle: string;
    purchaseSettings: string;
    purchasePrice: string;
    downPayment: string;
    mortgageInterestRate: string;
    loanTermYears: string;
    monthlyRent: string;
    vacancyRate: string;
    managementFee: string;
    maintenanceReserve: string;
    roTaxFramework: string;
    flatTaxNote: string;
    cassHealthTax: string;
    results: {
      grossYield: string;
      netYield: string;
      cashOnCash: string;
      annualCashFlow: string;
      monthlyCashFlow: string;
      monthlyMortgage: string;
      totalTaxes: string;
      shortTermComparison: string;
      tenYearRoi: string;
    };
  };
  openData: {
    title: string;
    subtitle: string;
    allEntities: string;
    syncCadence: string;
    lastUpdated: string;
    status: string;
    liveApi: string;
    syncNow: string;
    downloadDataset: string;
    authority: string;
    endpoint: string;
    dataHealthSummary: string;
    officialGuarantee: string;
  };
  dataTimings: {
    hourly: string;
    daily: string;
    monthly: string;
    quarterly: string;
    annually: string;
    staticGov: string;
    verifiedOfficial: string;
    liveStream: string;
    lastSyncedAgo: string;
  };
  seismicBadges: {
    RsI: string;
    RsII: string;
    RsIII: string;
    RsIV: string;
    U1: string;
    U2: string;
    U3: string;
    UNEXPERTIZED_PRE_1977: string;
    POST_1977_SAFE: string;
    NEW_BUILD_SAFE: string;
  };
  common: {
    viewOnMap: string;
    details: string;
    calculateRoi: string;
    currencyEur: string;
    currencyRon: string;
    sqm: string;
    months: string;
    years: string;
    close: string;
    print: string;
    search: string;
    filter: string;
    noResults: string;
  };
}
