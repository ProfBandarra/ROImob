import React, { useState } from 'react';
import { SellVsRentInputs, RentalTaxRegime } from '../../types';
import { calculateSellVsRent } from '../../utils/calculations';
import { formatEur, formatPercent } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { useCurrency } from '../../currency';
import { useTheme } from '../../theme';
import { WealthTrajectoryChart } from '../Charts/WealthTrajectoryChart';
import { 
  Scale, 
  BadgePercent, 
  Building, 
  Banknote, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Table as TableIcon, 
  Percent, 
  Compass, 
  Activity, 
  AlertOctagon, 
  ShieldAlert, 
  Gavel,
  FileText
} from 'lucide-react';
import { FormalReportModal } from '../ReportExport/FormalReportModal';

const HORIZON_OPTIONS = [1, 3, 5, 10, 15];

const CITY_PRICE_PER_SQM: Record<string, { base: number; rentRatio: number }> = {
  'Bucharest': { base: 1850, rentRatio: 0.0055 },
  'Cluj-Napoca': { base: 2750, rentRatio: 0.0050 },
  'Timișoara': { base: 1620, rentRatio: 0.0058 },
  'Brașov': { base: 1950, rentRatio: 0.0056 },
  'Iași': { base: 1580, rentRatio: 0.0060 },
  'Constanța': { base: 1680, rentRatio: 0.0058 },
  'Sibiu': { base: 1650, rentRatio: 0.0057 },
  'Oradea': { base: 1600, rentRatio: 0.0059 },
  'Ilfov': { base: 1450, rentRatio: 0.0062 },
};

interface Props {
  onSwitchToSimple?: () => void;
}

export const SellVsRentCalculator: React.FC<Props> = ({ onSwitchToSimple }) => {
  const { t } = useI18n();
  const { formatMoney } = useCurrency();
  const { themeConfig, theme } = useTheme();

  // Core Inputs
  const [propertyValueEur, setPropertyValueEur] = useState<number>(135000);
  const [ownershipDurationYears, setOwnershipDurationYears] = useState<number>(4);
  const [hasMortgage, setHasMortgage] = useState<boolean>(true);
  const [remainingMortgageBalanceEur, setRemainingMortgageBalanceEur] = useState<number>(65000);
  const [monthlyMortgagePaymentEur, setMonthlyMortgagePaymentEur] = useState<number>(430);
  const [remainingMortgageYears, setRemainingMortgageYears] = useState<number>(18);
  const [mortgageInterestRatePercent, setMortgageInterestRatePercent] = useState<number>(6.5);
  
  // Rental Inputs
  const [monthlyRentEur, setMonthlyRentEur] = useState<number>(650);
  const [monthlyOperatingExpensesEur, setMonthlyOperatingExpensesEur] = useState<number>(50);
  const [taxRegime, setTaxRegime] = useState<RentalTaxRegime>('INDIVIDUAL_FLAT');
  
  // Short-Term Rental Toggle
  const [includeShortTerm, setIncludeShortTerm] = useState<boolean>(false);
  const [shortTermMonthlyNetEur, setShortTermMonthlyNetEur] = useState<number>(920);
  
  // Reinvestment Benchmark
  const [alternativeReturnPercent, setAlternativeReturnPercent] = useState<number>(6.8);

  // Advanced & Strategy Options
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [propertyAppreciationPercent, setPropertyAppreciationPercent] = useState<number>(3.5);
  const [agentCommissionPercent, setAgentCommissionPercent] = useState<number>(0.0);
  const [prepaymentPenaltyPercent, setPrepaymentPenaltyPercent] = useState<number>(0.0);
  const [prepCostEur, setPrepCostEur] = useState<number>(0);
  
  // Inflation & Accelerated Prepayment
  const [adjustInflation, setAdjustInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number>(3.0);
  const [acceleratedPrepayment, setAcceleratedPrepayment] = useState<boolean>(false);
  
  // Dark Pattern / Informal Market Simulation
  const [showInformalToggles, setShowInformalToggles] = useState<boolean>(false);
  const [simulateUnderdeclaredSale, setSimulateUnderdeclaredSale] = useState<boolean>(false);
  const [unreportedDeclaredPriceEur, setUnreportedDeclaredPriceEur] = useState<number>(90000);

  // Projection Horizon
  const [horizonYears, setHorizonYears] = useState<number>(5);

  // Auto-Valuation Estimator State
  const [showAutoValuator, setShowAutoValuator] = useState<boolean>(false);
  const [valCity, setValCity] = useState<string>('Bucharest');
  const [valAreaSqm, setValAreaSqm] = useState<number>(65);
  const [valZoneMultiplier, setValZoneMultiplier] = useState<number>(1.0);
  const [valConditionMultiplier, setValConditionMultiplier] = useState<number>(1.0);

  // Report Modal State
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const handleApplyAutoValuation = () => {
    const cityData = CITY_PRICE_PER_SQM[valCity] || CITY_PRICE_PER_SQM['Bucharest'];
    const estimatedPricePerSqm = cityData.base * valZoneMultiplier * valConditionMultiplier;
    const computedPrice = Math.round((estimatedPricePerSqm * valAreaSqm) / 1000) * 1000;
    const computedRent = Math.round((computedPrice * cityData.rentRatio) / 10) * 10;

    setPropertyValueEur(computedPrice);
    setMonthlyRentEur(computedRent);
    setShowAutoValuator(false);
  };

  const inputs: SellVsRentInputs = {
    currentPropertyMarketValueEur: propertyValueEur,
    ownershipDurationYears,
    hasExistingMortgage: hasMortgage,
    remainingMortgageBalanceEur,
    monthlyMortgagePaymentEur,
    remainingMortgageYears,
    mortgageInterestRatePercent,
    earlyMortgagePrepaymentFeePercent: prepaymentPenaltyPercent,
    realEstateAgentCommissionPercent: agentCommissionPercent,
    sellingPreparationCostEur: prepCostEur,
    simulateInformalSellingPriceUnderdeclaration: simulateUnderdeclaredSale,
    unreportedDeclaredPriceEur: unreportedDeclaredPriceEur,
    estimatedMonthlyRentEur: monthlyRentEur,
    monthlyOperatingExpensesEur,
    propertyAppreciationRatePercent: propertyAppreciationPercent,
    taxRegime,
    includeShortTermOption: includeShortTerm,
    estimatedShortTermMonthlyNetEur: shortTermMonthlyNetEur,
    alternativeInvestmentReturnRatePercent: alternativeReturnPercent,
    adjustForInflation: adjustInflation,
    annualInflationRatePercent: inflationRate,
    reinvestCashFlowToPrepayMortgage: acceleratedPrepayment,
    projectionHorizonYears: horizonYears,
  };

  const result = calculateSellVsRent(inputs);

  const reinvestmentPresets = [
    { key: 'cash', rate: 0.0, ...t.sellVsRent.presets.cash },
    { key: 'bankDeposit', rate: 3.5, ...t.sellVsRent.presets.bankDeposit },
    { key: 'tezaurBonds', rate: 6.8, ...t.sellVsRent.presets.tezaurBonds },
    { key: 'globalEtf', rate: 8.5, ...t.sellVsRent.presets.globalEtf },
    { key: 'betIndex', rate: 10.5, ...t.sellVsRent.presets.betIndex },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Scale className="w-3.5 h-3.5 text-brand-400" />
            <span>ROImob Engine • Romanian Fiscal Code Art. 111 & OUG 115/2023</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {t.sellVsRent.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.sellVsRent.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          {onSwitchToSimple && (
            <button
              type="button"
              onClick={onSwitchToSimple}
              className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-amber-500/30 transition-all cursor-pointer shadow-md"
              title={t.mode.quickDesc}
            >
              <span>⚡</span>
              <span>{t.mode.quick}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowAutoValuator(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>{t.sellVsRent.autoEstimateBtn}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors shadow-md cursor-pointer"
          >
            <FileText className="w-4 h-4 text-brand-400" />
            <span>{t.sellVsRent.exportReportBtn}</span>
          </button>
        </div>
      </div>

      {/* Auto-Valuation Estimator Modal */}
      {showAutoValuator && (
        <div className="p-6 bg-slate-900 rounded-3xl border border-brand-500/50 shadow-2xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-400" />
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                {t.sellVsRent.autoValuator.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowAutoValuator(false)}
              className="text-slate-400 hover:text-white text-xs font-bold"
            >
              {t.sellVsRent.autoValuator.closeBtn}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1 font-bold">{t.sellVsRent.autoValuator.cityLabel}</label>
              <select
                value={valCity}
                onChange={(e) => setValCity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              >
                {Object.keys(CITY_PRICE_PER_SQM).map((city) => (
                  <option key={city} value={city}>{city} (Avg €{CITY_PRICE_PER_SQM[city].base}/m²)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-bold">{t.sellVsRent.autoValuator.usableAreaLabel}</label>
              <input
                type="number"
                value={valAreaSqm}
                onChange={(e) => setValAreaSqm(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-bold">{t.sellVsRent.autoValuator.zoneLabel}</label>
              <select
                value={valZoneMultiplier}
                onChange={(e) => setValZoneMultiplier(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value={1.30}>{t.sellVsRent.autoValuator.zones.ultraCentral}</option>
                <option value={1.10}>{t.sellVsRent.autoValuator.zones.central}</option>
                <option value={1.00}>{t.sellVsRent.autoValuator.zones.standard}</option>
                <option value={0.85}>{t.sellVsRent.autoValuator.zones.suburban}</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-bold">{t.sellVsRent.autoValuator.conditionLabel}</label>
              <select
                value={valConditionMultiplier}
                onChange={(e) => setValConditionMultiplier(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold"
              >
                <option value={1.15}>{t.sellVsRent.autoValuator.conditions.luxury}</option>
                <option value={1.00}>{t.sellVsRent.autoValuator.conditions.standard}</option>
                <option value={0.85}>{t.sellVsRent.autoValuator.conditions.needsReno}</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleApplyAutoValuation}
              className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.sellVsRent.autoValuator.applyBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Owner Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Property Valuation & Ownership */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Building className="w-4 h-4 text-brand-400" />
              <span>{t.sellVsRent.propertyValuation}</span>
            </h3>

            {/* Market Value */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.sellVsRent.propertyValuation}:</span>
                <strong className="text-white font-mono text-sm">{formatMoney(propertyValueEur)}</strong>
              </div>
              <input
                type="range"
                min="40000"
                max="500000"
                step="5000"
                value={propertyValueEur}
                onChange={(e) => setPropertyValueEur(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>

            {/* Ownership Duration (1% vs 3% transfer tax) */}
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                {t.sellVsRent.ownershipDuration}:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOwnershipDurationYears(4)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                    ownershipDurationYears > 3
                      ? 'bg-brand-600/20 border-brand-500 text-white shadow-sm ring-1 ring-brand-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">{t.sellVsRent.over3Years}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">{t.sellVsRent.transferTax1Pct}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOwnershipDurationYears(2)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left ${
                    ownershipDurationYears <= 3
                      ? 'bg-brand-600/20 border-brand-500 text-white shadow-sm ring-1 ring-brand-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">{t.sellVsRent.under3Years}</span>
                  <span className="text-[10px] text-amber-400 font-mono">{t.sellVsRent.transferTax3Pct}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Mortgage Status */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-purple-400" />
                <span>{t.sellVsRent.mortgageStatus}</span>
              </h3>
              <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setHasMortgage(true)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                    hasMortgage ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400'
                  }`}
                >
                  {t.sellVsRent.withDebt}
                </button>
                <button
                  type="button"
                  onClick={() => setHasMortgage(false)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                    !hasMortgage ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400'
                  }`}
                >
                  {t.sellVsRent.debtFree}
                </button>
              </div>
            </div>

            {hasMortgage ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{t.sellVsRent.remainingLoanBalance}:</span>
                    <strong className="text-rose-300 font-mono">{formatMoney(remainingMortgageBalanceEur)}</strong>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max={propertyValueEur * 0.9}
                    step="2500"
                    value={remainingMortgageBalanceEur}
                    onChange={(e) => setRemainingMortgageBalanceEur(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{t.sellVsRent.monthlyInstallment}:</span>
                      <strong className="text-white font-mono">{formatMoney(monthlyMortgagePaymentEur)}/mo</strong>
                    </div>
                    <input
                      type="range"
                      min="150"
                      max="2000"
                      step="10"
                      value={monthlyMortgagePaymentEur}
                      onChange={(e) => setMonthlyMortgagePaymentEur(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{t.sellVsRent.remainingYears}:</span>
                      <strong className="text-white font-mono">{remainingMortgageYears} {t.sellVsRent.yearsPlural}</strong>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      step="1"
                      value={remainingMortgageYears}
                      onChange={(e) => setRemainingMortgageYears(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                </div>

                {/* Accelerated Prepayment Toggle */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-purple-300 block">{t.sellVsRent.acceleratedDebtPayoff}</span>
                    <span className="text-[10px] text-slate-400">{t.sellVsRent.acceleratedDebtPayoffDesc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAcceleratedPrepayment(!acceleratedPrepayment)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                      acceleratedPrepayment ? 'bg-purple-600 justify-end' : 'bg-slate-800 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t.sellVsRent.debtFreeBanner}</span>
              </div>
            )}
          </div>

          {/* 3. Rental Expectations & Romanian Tax Regimes */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>{t.sellVsRent.rentalExpectations}</span>
            </h3>

            {/* Long-Term Rent */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.sellVsRent.rentalExpectation}:</span>
                <strong className="text-white font-mono text-sm">{formatMoney(monthlyRentEur)}/mo</strong>
              </div>
              <input
                type="range"
                min="200"
                max="2500"
                step="25"
                value={monthlyRentEur}
                onChange={(e) => setMonthlyRentEur(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Tax Regime Selector */}
            <div>
              <label className="text-xs text-slate-400 block mb-1 font-medium">
                {t.sellVsRent.taxRegimeLabel}
              </label>
              <select
                value={taxRegime}
                onChange={(e) => setTaxRegime(e.target.value as RentalTaxRegime)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold"
              >
                <option value="INDIVIDUAL_FLAT">{t.sellVsRent.regimePfFlat}</option>
                <option value="INDIVIDUAL_REAL">{t.sellVsRent.regimePfReal}</option>
                <option value="SRL_MICRO">{t.sellVsRent.regimeSrlMicro}</option>
                <option value="INFORMAL_ZERO_TAX">{t.sellVsRent.regimeInformal}</option>
              </select>
            </div>

            {/* Short-Term / Airbnb Option Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{t.sellVsRent.includeShortTerm}</span>
                  <span className="text-[10px] text-slate-400">{t.sellVsRent.includeShortTermDesc}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludeShortTerm(!includeShortTerm)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    includeShortTerm ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md" />
                </button>
              </div>

              {includeShortTerm && (
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{t.sellVsRent.airbnbMonthlyNet}:</span>
                    <strong className="text-indigo-300 font-mono">{formatMoney(shortTermMonthlyNetEur)}/mo</strong>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="3500"
                    step="25"
                    value={shortTermMonthlyNetEur}
                    onChange={(e) => setShortTermMonthlyNetEur(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* 4. Alternative Reinvestment Rate */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Percent className="w-4 h-4 text-brand-400" />
                <span>{t.sellVsRent.reinvestmentBenchmark}</span>
              </h3>
              <strong className="text-sm font-mono text-brand-300">
                {alternativeReturnPercent.toFixed(1)}% p.a.
              </strong>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                {t.sellVsRent.reinvestmentPresetsTitle}
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {reinvestmentPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAlternativeReturnPercent(preset.rate)}
                    className={`px-3 py-2 rounded-xl text-left text-xs transition-all border flex items-center justify-between ${
                      alternativeReturnPercent === preset.rate
                        ? 'bg-brand-600/20 border-brand-500 text-white font-bold'
                        : 'bg-slate-950/70 border-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <span className="block font-medium">{preset.label}</span>
                      <span className="text-[10px] text-slate-400">{preset.desc}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-400 shrink-0 ml-2">
                      {preset.rate}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Slider */}
            <div className="pt-2">
              <input
                type="range"
                min="0.0"
                max="15.0"
                step="0.5"
                value={alternativeReturnPercent}
                onChange={(e) => setAlternativeReturnPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>
          </div>

          {/* 5. Informal Practices Simulation */}
          <div className="bg-slate-900/60 rounded-2xl border border-rose-500/20 p-4 space-y-3">
            <button
              type="button"
              onClick={() => setShowInformalToggles(!showInformalToggles)}
              className="w-full flex items-center justify-between text-xs font-bold text-rose-300 hover:text-rose-200"
            >
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>{t.sellVsRent.informalFrictionTitle}</span>
              </div>
              {showInformalToggles ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showInformalToggles && (
              <div className="pt-3 border-t border-slate-800 space-y-3 text-xs">
                <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-rose-200 block">{t.sellVsRent.underdeclaredSaleTitle}</span>
                      <span className="text-[10px] text-slate-400">{t.sellVsRent.underdeclaredSaleDesc}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSimulateUnderdeclaredSale(!simulateUnderdeclaredSale)}
                      className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                        simulateUnderdeclaredSale ? 'bg-rose-600 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white shadow" />
                    </button>
                  </div>

                  {simulateUnderdeclaredSale && (
                    <div className="pt-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">{t.sellVsRent.declaredPriceInDeed}:</span>
                        <strong className="text-rose-300 font-mono">{formatEur(unreportedDeclaredPriceEur)}</strong>
                      </div>
                      <input
                        type="range"
                        min="30000"
                        max={propertyValueEur}
                        step="5000"
                        value={unreportedDeclaredPriceEur}
                        onChange={(e) => setUnreportedDeclaredPriceEur(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-rose-500"
                      />
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-rose-300/80 leading-relaxed italic bg-slate-950 p-2.5 rounded-xl border border-rose-500/20 flex items-start gap-2">
                  <Gavel className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{t.sellVsRent.informalComplianceFootnote}</span>
                </div>
              </div>
            )}
          </div>

          {/* 6. Advanced Settings */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 space-y-3">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-400" />
                <span>{t.sellVsRent.advancedSettingsTitle}</span>
              </div>
              {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAdvanced && (
              <div className="pt-3 border-t border-slate-800 space-y-4 text-xs">
                {/* Inflation Adjustment */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-200 block">{t.sellVsRent.inflationAdjustmentTitle}</span>
                      <span className="text-[10px] text-slate-400">{t.sellVsRent.inflationAdjustmentDesc}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAdjustInflation(!adjustInflation)}
                      className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                        adjustInflation ? 'bg-brand-600 justify-end' : 'bg-slate-800 justify-start'
                      }`}
                    >
                      <div className="w-3.5 h-3.5 rounded-full bg-white shadow" />
                    </button>
                  </div>
                  {adjustInflation && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">{t.sellVsRent.annualInflationRate}</span>
                        <strong className="text-white font-mono">{inflationRate.toFixed(1)}%</strong>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="8.0"
                        step="0.5"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
                      />
                    </div>
                  )}
                </div>

                {/* Property Appreciation */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">{t.sellVsRent.annualAppreciationRate}</span>
                    <strong className="text-white font-mono">{propertyAppreciationPercent.toFixed(1)}% p.a.</strong>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="8.0"
                    step="0.5"
                    value={propertyAppreciationPercent}
                    onChange={(e) => setPropertyAppreciationPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
                  />
                </div>

                {/* Real Estate Agent Commission */}
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-400">{t.sellVsRent.agentCommissionRate}</span>
                    <strong className="text-white font-mono">{agentCommissionPercent.toFixed(1)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="3.0"
                    step="0.5"
                    value={agentCommissionPercent}
                    onChange={(e) => setAgentCommissionPercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Interactive Wealth Chart, Horizon Selector, Summary Cards & Data (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Interactive Visual Wealth Trajectory Chart (Prominent Top Focus) */}
          <WealthTrajectoryChart
            data={result.yearlyBreakdown}
            selectedHorizonYears={horizonYears}
            mortgageDebtFreeYear={result.mortgageDebtFreeYear ?? null}
            hasExistingMortgage={hasMortgage}
          />

          {/* 2. Horizon Selector Bar */}
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-200 block">
                {t.sellVsRent.projectionHorizon}
              </span>
              <span className="text-[11px] text-slate-400">
                {t.sellVsRent.compareWealthAt}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {HORIZON_OPTIONS.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setHorizonYears(yr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    horizonYears === yr
                      ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {yr} {yr === 1 ? t.sellVsRent.yearSingle : t.sellVsRent.yearsPlural}
                </button>
              ))}
            </div>
          </div>

          {/* Legal Risk Alert */}
          {(result.legalRisk.hasInformalRenting || result.legalRisk.hasInformalSelling) && (
            <div className="p-5 bg-rose-950/70 rounded-3xl border-2 border-rose-500 shadow-2xl space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-extrabold text-sm uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <span>{t.sellVsRent.legalRiskBannerTitle}</span>
              </div>
              <p className="text-xs text-rose-100 font-semibold leading-relaxed">
                {t.sellVsRent.legalRiskNotice}
              </p>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-rose-500/30 text-xs text-rose-200 space-y-1">
                <div>{result.legalRisk.penaltiesDescription}</div>
                <div className="pt-1 text-rose-400 font-bold font-mono">
                  {t.sellVsRent.legalRiskPenaltyEstimate} €{result.legalRisk.anfePenaltiesEstimateEur.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Strategic Recommendation Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/60 p-6 rounded-3xl border border-brand-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <span className="text-xs font-black uppercase tracking-wider text-brand-300">
                  {t.sellVsRent.verdictTitle} ({horizonYears} {horizonYears === 1 ? t.sellVsRent.yearSingle : t.sellVsRent.yearsPlural})
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
                  result.recommendedStrategy === 'RENT_LONG_TERM'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : result.recommendedStrategy === 'RENT_SHORT_TERM'
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                }`}
              >
                {result.recommendedStrategy === 'RENT_LONG_TERM'
                  ? t.sellVsRent.keepAndRentLongTerm
                  : result.recommendedStrategy === 'RENT_SHORT_TERM'
                  ? t.sellVsRent.shortTermAirbnb
                  : t.sellVsRent.sellAndReinvest}
              </span>
            </div>

            <p className="text-sm font-bold text-white leading-relaxed">
              {result.verdictSummary}
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-700/60">
              {result.verdictHighlights.map((h, i) => (
                <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. COMPARATIVE FINANCIAL SUMMARY (3 Highlight Cards) */}
          <div className={`grid grid-cols-1 ${includeShortTerm ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
            
            {/* Hold & Rent (Emerald Highlight) */}
            <div
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                result.recommendedStrategy === 'RENT_LONG_TERM'
                  ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-white">Hold & Rent</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md font-bold">
                  Emerald Highlight
                </span>
              </div>

              <div>
                <span className="text-2xl font-black text-emerald-400 font-mono block">
                  {result.monthlyNetRentalCashFlowEur >= 0 ? '+' : ''}
                  {formatMoney(result.monthlyNetRentalCashFlowEur)} / mo
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">
                  Net Operating Cash Flow
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Gross Rent:</span>
                  <span className="text-slate-200 font-mono">{formatMoney(monthlyRentEur)}/mo</span>
                </div>
                {hasMortgage && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Bank Debt:</span>
                    <span className="text-rose-300 font-mono">-{formatMoney(monthlyMortgagePaymentEur)}/mo</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] pt-1.5 border-t border-slate-800 font-bold">
                  <span className="text-slate-300">{horizonYears}-Yr Wealth:</span>
                  <span className="text-emerald-400 font-mono">+{formatMoney(result.selectedHorizonRentalWealthEur)}</span>
                </div>
              </div>
            </div>

            {/* Sell & Reinvest (Purple Highlight) */}
            <div
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                result.recommendedStrategy === 'SELL'
                  ? 'bg-slate-900 border-purple-500 ring-2 ring-purple-500/30'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-white">Sell & Reinvest</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-md font-bold">
                  Purple Highlight
                </span>
              </div>

              <div>
                <span className="text-2xl font-black text-purple-300 font-mono block">
                  {formatMoney(result.netCashProceedsFromSaleEur)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">
                  Net Liquid Exit Today
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Art. 111 Tax ({result.transferTaxRatePercent}%):</span>
                  <span className="text-rose-300 font-mono">-{formatMoney(result.transferTaxEur)}</span>
                </div>
                {hasMortgage && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Mortgage Payoff:</span>
                    <span className="text-rose-300 font-mono">-{formatMoney(result.mortgagePayoffEur)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] pt-1.5 border-t border-slate-800 font-bold">
                  <span className="text-slate-300">{horizonYears}-Yr Reinvest Wealth:</span>
                  <span className="text-purple-300 font-mono">+{formatMoney(result.selectedHorizonReinvestmentWealthEur)}</span>
                </div>
              </div>
            </div>

            {/* Airbnb / Short Term (Amber Highlight) */}
            {includeShortTerm && (
              <div
                className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                  result.recommendedStrategy === 'RENT_SHORT_TERM'
                    ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-white">Airbnb</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-md font-bold">
                    Amber Highlight
                  </span>
                </div>

                <div>
                  <span className="text-2xl font-black text-amber-300 font-mono block">
                    +{formatMoney(result.annualShortTermNetCashFlowEur / 12)} / mo
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-bold">
                    Net Tourism Cash Flow
                  </span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Estimated Annual Net:</span>
                    <span className="text-slate-200 font-mono">+{formatMoney(result.annualShortTermNetCashFlowEur)}/yr</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-1.5 border-t border-slate-800 font-bold">
                    <span className="text-slate-300">{horizonYears}-Yr Wealth:</span>
                    <span className="text-amber-300 font-mono">+{formatMoney(result.selectedHorizonShortTermWealthEur)}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Year-by-Year Multi-Year Comparison Schedule Table */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <TableIcon className="w-4 h-4 text-brand-400" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                  {t.sellVsRent.scheduleTitle}
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {adjustInflation ? `${t.sellVsRent.realValTitle} (-${inflationRate}% Inflation)` : t.sellVsRent.nominalValTitle}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-bold">
                    <th className="pb-2">{t.sellVsRent.scheduleHeaders.year}</th>
                    <th className="pb-2">{t.sellVsRent.scheduleHeaders.sellAndReinvest} ({alternativeReturnPercent}%)</th>
                    <th className="pb-2">{t.sellVsRent.scheduleHeaders.holdAndRent} ({propertyAppreciationPercent}%)</th>
                    {includeShortTerm && <th className="pb-2">{t.sellVsRent.scheduleHeaders.shortTerm}</th>}
                    <th className="pb-2">{t.sellVsRent.scheduleHeaders.propertyValue}</th>
                    {hasMortgage && <th className="pb-2">{t.sellVsRent.scheduleHeaders.remainingDebt}</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {result.yearlyBreakdown.filter((p) => [1, 2, 3, 5, 10, 15].includes(p.year)).map((pt) => {
                    const isSelected = pt.year === horizonYears;
                    const sellVal = adjustInflation ? (pt.realPurchasingPowerSelling ?? pt.sellingWealth) : pt.sellingWealth;
                    const rentVal = adjustInflation ? (pt.realPurchasingPowerRenting ?? pt.rentingWealth) : pt.rentingWealth;

                    return (
                      <tr 
                        key={pt.year}
                        className={`transition-colors ${
                          isSelected ? 'bg-brand-500/10 font-bold' : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-2.5 text-slate-200">
                          {t.sellVsRent.yearSingle} {pt.year} {isSelected && <span className="text-brand-400 font-sans text-[10px]">{t.sellVsRent.activeLabel}</span>}
                        </td>
                        <td className="py-2.5 text-brand-300">
                          {formatMoney(sellVal)}
                        </td>
                        <td className="py-2.5 text-emerald-400">
                          {formatMoney(rentVal)}
                        </td>
                        {includeShortTerm && (
                          <td className="py-2.5 text-indigo-300">
                            {formatMoney(pt.shortTermWealth || 0)}
                          </td>
                        )}
                        <td className="py-2.5 text-slate-400">
                          {formatMoney(pt.propertyValue)}
                        </td>
                        {hasMortgage && (
                          <td className="py-2.5 text-rose-300">
                            {formatMoney(pt.remainingMortgage)}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Formal Audit Report Modal */}
      {showReportModal && (
        <FormalReportModal
          type="sellVsRent"
          mode="pro"
          sellVsRentData={{
            inputs,
            result
          }}
          onClose={() => setShowReportModal(false)}
        />
      )}

    </div>
  );
};
