import React, { useState } from 'react';
import { calculateRealEstateFinancials, DEFAULT_TAX_SETTINGS } from '../../utils/calculations';
import { ROITaxSettings } from '../../types';
import { useI18n } from '../../i18n';
import { useTheme } from '../../theme';
import { useCurrency } from '../../currency';
import { formatPercent } from '../../utils/formatters';
import { 
  Building, 
  Coins, 
  Receipt, 
  Percent, 
  FileText, 
  Sparkles, 
  Calendar,
  Layers,
  FileSpreadsheet,
  Calculator,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { FormalReportModal } from '../ReportExport/FormalReportModal';
import { ROIEquityCashflowChart } from '../Charts/ROIEquityCashflowChart';

interface Props {
  onSwitchToSimple?: () => void;
}

export const ROICalculator: React.FC<Props> = ({ onSwitchToSimple }) => {
  const { t } = useI18n();
  const { themeConfig } = useTheme();
  const { formatMoney } = useCurrency();

  // Primary User Inputs
  const [purchasePrice, setPurchasePrice] = useState<number>(120000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [renovationEur, setRenovationEur] = useState<number>(5000);
  
  // Rental Economics
  const [monthlyRentEur, setMonthlyRentEur] = useState<number>(650);
  const [vacancyPercent, setVacancyPercent] = useState<number>(5.0);
  const [managementPercent, setManagementPercent] = useState<number>(0);
  const [maintenancePercent, setMaintenancePercent] = useState<number>(1.0);
  const [includeShortTerm, setIncludeShortTerm] = useState<boolean>(false);

  // Custom Tax Regime Settings
  const [taxSettings, setTaxSettings] = useState<ROITaxSettings>(DEFAULT_TAX_SETTINGS);

  const calc = calculateRealEstateFinancials(
    {
      purchasePrice,
      downPaymentPercent,
      interestRatePercent,
      loanTermYears,
      monthlyRentEur,
      vacancyRatePercent: vacancyPercent,
      managementFeePercent: managementPercent,
      maintenanceReservePercent: maintenancePercent,
      customRenovationEur: renovationEur,
    },
    taxSettings
  );

  // Generate 10-year projection data table
  const projectionTable = Array.from({ length: 10 }, (_, i) => {
    const yr = i + 1;
    const projectedPropertyValue = purchasePrice * Math.pow(1.035, yr);
    const annualCashFlow = calc.annualCashFlowAfterDebtEur;
    const cumulativeCashFlow = annualCashFlow * yr;
    const principalPaidPerYear = (calc.loanAmountEur / loanTermYears) * 0.85;
    const equityBuilt = (calc.downPaymentEur) + (principalPaidPerYear * yr) + (projectedPropertyValue - purchasePrice);

    return {
      year: yr,
      propertyValue: projectedPropertyValue,
      annualCashFlow,
      cumulativeCash: cumulativeCashFlow,
      totalEquity: equityBuilt,
      totalNetEquity: equityBuilt,
    };
  });

  const pricePresets = [
    { label: t.roiCalculator.presets.studio, price: 75000, rent: 420 },
    { label: t.roiCalculator.presets.twoRoom, price: 120000, rent: 650 },
    { label: t.roiCalculator.presets.threeRoom, price: 185000, rent: 950 },
    { label: t.roiCalculator.presets.premium, price: 260000, rent: 1350 },
  ];

  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-brand-400" />
            <span>ROImob Engine • Law 227/2015 & OUG 115/2023</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {t.roiCalculator.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.roiCalculator.subtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full sm:w-auto">
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
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center justify-center gap-2 border border-brand-500 transition-colors shadow-lg shadow-brand-600/30 cursor-pointer"
          >
            <FileText className="w-4 h-4 text-white" />
            <span>{t.roiCalculator.exportPdfBtn}</span>
          </button>
        </div>
      </div>

      {/* Quick Price Preset Selectors */}
      <div className="bg-slate-900/80 p-3 sm:p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {t.roiCalculator.quickPresetsTitle}
        </span>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
          {pricePresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPurchasePrice(preset.price);
                setMonthlyRentEur(preset.rent);
              }}
              className={`px-3 py-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all border text-center cursor-pointer ${
                purchasePrice === preset.price
                  ? 'bg-brand-600 border-brand-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* TOP FULL-WIDTH KPI CARDS RIBBON */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1: Gross Yield */}
        <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl space-y-1">
          <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider block">
            {t.roiCalculator.kpi.grossYield}
          </span>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl sm:text-3xl font-black text-white font-mono">
              {formatPercent(calc.grossYieldPercent)}
            </strong>
          </div>
        </div>

        {/* KPI 2: Net Yield (Glowing Emerald Badge) */}
        <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-emerald-500/50 shadow-xl shadow-emerald-950/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-emerald-400 uppercase font-bold tracking-wider block">
              {t.roiCalculator.kpi.netYield}
            </span>
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {formatPercent(calc.netYieldPercent)}
            </strong>
          </div>
        </div>

        {/* KPI 3: Cash on Cash */}
        <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-teal-500/40 shadow-xl space-y-1">
          <span className="text-[11px] text-teal-300 uppercase font-bold tracking-wider block">
            {t.roiCalculator.kpi.cashOnCash}
          </span>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl sm:text-3xl font-black text-teal-300 font-mono">
              {formatPercent(calc.cashOnCashReturnPercent)}
            </strong>
          </div>
        </div>

        {/* KPI 4: Monthly Cash Flow */}
        <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl space-y-1">
          <span className="text-[11px] text-amber-300 uppercase font-bold tracking-wider block">
            {t.roiCalculator.kpi.monthlyCashFlow}
          </span>
          <div className="flex items-baseline justify-between">
            <strong className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}
              {formatMoney(calc.monthlyCashFlowAfterDebtEur)}
            </strong>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        
        {/* Left Column: Acquisition & Operating Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Acquisition & Financing */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Building className="w-4 h-4 text-brand-400" />
              <span>{t.roiCalculator.acquisitionTitle}</span>
            </h3>

            {/* Purchase Price */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{t.roiCalculator.purchasePrice}</span>
                <strong className="text-white font-mono text-sm bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                  {formatMoney(purchasePrice)}
                </strong>
              </div>
              <input
                type="range"
                min="30000"
                max="600000"
                step="5000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>

            {/* Down Payment Presets */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{t.roiCalculator.downPayment}</span>
                <strong className="text-brand-300 font-mono font-bold bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                  {downPaymentPercent}% ({formatMoney(calc.downPaymentEur)})
                </strong>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[15, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      downPaymentPercent === pct
                        ? 'bg-brand-600 border-brand-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {pct}% {pct === 15 ? t.roiCalculator.firstHomeLabel : pct === 25 ? t.roiCalculator.investLabel : ''}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>

            {/* Mortgage Terms */}
            {downPaymentPercent < 100 && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{t.roiCalculator.mortgageInterestRate}</span>
                    <strong className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{interestRatePercent}%</strong>
                  </div>
                  <input
                    type="range"
                    min="3.0"
                    max="11.0"
                    step="0.25"
                    value={interestRatePercent}
                    onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-purple-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{t.roiCalculator.loanTermYears}</span>
                    <strong className="text-white font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{loanTermYears} Yrs</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-purple-500"
                  />
                </div>
              </div>
            )}

            {/* Renovation & Furnishing */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.roiCalculator.renovationBudget}</span>
                <strong className="text-white font-mono bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">{formatMoney(renovationEur)}</strong>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={renovationEur}
                onChange={(e) => setRenovationEur(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
              />
            </div>
          </div>

          {/* 2. Rental Revenue & Operating Assumptions */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>{t.roiCalculator.revenueTitle}</span>
            </h3>

            {/* Monthly Rent */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{t.roiCalculator.monthlyRent}</span>
                <strong className="text-emerald-400 font-mono text-sm bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                  {formatMoney(monthlyRentEur)}/mo
                </strong>
              </div>
              <input
                type="range"
                min="200"
                max="3500"
                step="25"
                value={monthlyRentEur}
                onChange={(e) => setMonthlyRentEur(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Operating Sliders */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.roiCalculator.vacancyRate}</span>
                  <strong className="text-white font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">{vacancyPercent}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={vacancyPercent}
                  onChange={(e) => setVacancyPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.roiCalculator.maintenanceReserve}</span>
                  <strong className="text-white font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">{maintenancePercent}%</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.25"
                  value={maintenancePercent}
                  onChange={(e) => setMaintenancePercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
                />
              </div>
            </div>

            {/* Airbnb Short-Term Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-300 block">{t.roiCalculator.airbnbArbitrage}</span>
                <span className="text-[10px] text-slate-400">{t.roiCalculator.airbnbArbitrageDesc}</span>
              </div>
              <button
                type="button"
                onClick={() => setIncludeShortTerm(!includeShortTerm)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  includeShortTerm ? 'bg-indigo-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Financial Charts, Tax Schedules & 10-Yr Table (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Interactive ROI Equity & Net Income Growth Chart */}
          <ROIEquityCashflowChart
            tenYearProjection={projectionTable}
            totalAcquisitionCost={calc.totalAcquisitionCost}
            annualTaxesEur={calc.annualTaxesEur}
            annualOperatingExpenses={calc.annualOperatingExpenses}
            annualDebtServiceEur={calc.annualDebtServiceEur}
          />

          {/* Romanian 2024–2026 Fiscal Code Breakdown Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
                  {t.roiCalculator.taxScheduleTitle}
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {t.roiCalculator.taxScheduleBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.roiCalculator.incomeTaxTitle}</span>
                <strong className="text-sm font-bold text-white font-mono">
                  {formatMoney(calc.annualTaxesEur * 0.5)} / yr
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {t.roiCalculator.incomeTaxDesc}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.roiCalculator.cassHealthTitle}</span>
                <strong className="text-sm font-bold text-white font-mono">
                  {formatMoney(calc.annualTaxesEur * 0.35)} / yr
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {t.roiCalculator.cassHealthDesc}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.roiCalculator.localTaxTitle}</span>
                <strong className="text-sm font-bold text-white font-mono">
                  {formatMoney(calc.annualTaxesEur * 0.15)} / yr
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {t.roiCalculator.localTaxDesc}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">{t.roiCalculator.totalAnnualTaxes}</span>
              <strong className="text-rose-300 font-mono text-sm">
                {formatMoney(calc.annualTaxesEur)} / yr
              </strong>
            </div>
          </div>

          {/* Short-Term (Airbnb) Comparison Card */}
          {includeShortTerm && (
            <div className="bg-slate-900/90 rounded-2xl border border-indigo-500/40 p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-indigo-300">
                    {t.roiCalculator.airbnbCardTitle}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400">
                  {formatPercent(calc.shortTermYieldPercent)} Net Yield
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{t.roiCalculator.grossAnnualRevenue}</span>
                  <strong className="text-white font-mono text-sm">{formatMoney(calc.shortTermGrossAnnualEur)}/yr</strong>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{t.roiCalculator.netAnnualCashFlow}</span>
                  <strong className="text-indigo-300 font-mono text-sm">+{formatMoney(calc.shortTermNetAnnualEur)}/yr</strong>
                </div>
              </div>
            </div>
          )}

          {/* 10-Year Cumulative Cash Flow & Equity Schedule Table */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-brand-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
                  {t.roiCalculator.scheduleTitle}
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {t.roiCalculator.scheduleSubtitle}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-800 text-[11px] text-slate-400 uppercase font-bold">
                    <th className="pb-2">{t.roiCalculator.scheduleHeaders.year}</th>
                    <th className="pb-2">{t.roiCalculator.scheduleHeaders.propertyValue}</th>
                    <th className="pb-2">{t.roiCalculator.scheduleHeaders.annualCashFlow}</th>
                    <th className="pb-2">{t.roiCalculator.scheduleHeaders.cumulativeCash}</th>
                    <th className="pb-2">{t.roiCalculator.scheduleHeaders.totalNetEquity}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                  {projectionTable.filter((p) => [1, 2, 3, 5, 7, 10].includes(p.year)).map((pt) => (
                    <tr key={pt.year} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 text-slate-200 font-sans font-bold">
                        {t.sellVsRent.yearSingle} {pt.year}
                      </td>
                      <td className="py-2.5 text-slate-300">
                        {formatMoney(pt.propertyValue)}
                      </td>
                      <td className={`py-2.5 ${pt.annualCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pt.annualCashFlow >= 0 ? '+' : ''}{formatMoney(pt.annualCashFlow)}
                      </td>
                      <td className="py-2.5 text-brand-300">
                        {formatMoney(pt.cumulativeCash)}
                      </td>
                      <td className="py-2.5 text-emerald-300 font-bold">
                        {formatMoney(pt.totalEquity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Formal Audit Report Modal */}
      {showReportModal && (
        <FormalReportModal
          type="roiCalculator"
          mode="pro"
          roiData={{
            inputs: {
              purchasePrice,
              downPaymentPercent,
              interestRatePercent,
              loanTermYears,
              monthlyRentEur,
              vacancyRatePercent: vacancyPercent,
              managementFeePercent: managementPercent,
              maintenanceReservePercent: maintenancePercent,
              customRenovationEur: renovationEur,
            },
            calc,
            taxSettings,
          }}
          onClose={() => setShowReportModal(false)}
        />
      )}

    </div>
  );
};
