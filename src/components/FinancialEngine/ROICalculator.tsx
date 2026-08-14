import React, { useState } from 'react';
import { ROITaxSettings } from '../../types';
import { calculateRealEstateFinancials, DEFAULT_TAX_SETTINGS } from '../../utils/calculations';
import { formatEur, formatRon, formatPercent } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { 
  Calculator, 
  Receipt, 
  Sparkles, 
  Building, 
  Coins, 
  FileSpreadsheet, 
  Printer,
  FileText
} from 'lucide-react';
import { FormalReportModal } from '../ReportExport/FormalReportModal';

export const ROICalculator: React.FC = () => {
  const { t } = useI18n();

  // Financial Input States
  const [purchasePrice, setPurchasePrice] = useState<number>(125000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [monthlyRentEur, setMonthlyRentEur] = useState<number>(680);
  const [vacancyRatePercent, setVacancyRatePercent] = useState<number>(5);
  const [managementFeePercent, setManagementFeePercent] = useState<number>(0);
  const [maintenanceReservePercent, setMaintenanceReservePercent] = useState<number>(1.0);
  const [renovationEur, setRenovationEur] = useState<number>(5000);

  // Short-Term Rental Inputs
  const [includeShortTerm, setIncludeShortTerm] = useState<boolean>(false);
  const [nightlyRateEur, setNightlyRateEur] = useState<number>(65);
  const [shortTermOccupancyPercent, setShortTermOccupancyPercent] = useState<number>(70);

  // Tax settings
  const [taxSettings, setTaxSettings] = useState<ROITaxSettings>(DEFAULT_TAX_SETTINGS);

  const calc = calculateRealEstateFinancials(
    {
      purchasePrice,
      downPaymentPercent,
      interestRatePercent,
      loanTermYears,
      monthlyRentEur,
      vacancyRatePercent,
      managementFeePercent,
      maintenanceReservePercent,
      customRenovationEur: renovationEur,
      shortTermNightlyRateEur: nightlyRateEur,
      shortTermOccupancyPercent,
    },
    taxSettings
  );

  // 10-Year Projection Model
  const appreciationRate = 0.035;
  const rentGrowthRate = 0.025;
  const years = Array.from({ length: 10 }, (_, i) => i + 1);

  let cumulativeCashFlow = 0;
  const projectionTable = years.map((yr) => {
    const projectedPropertyValue = purchasePrice * Math.pow(1 + appreciationRate, yr);
    const projectedAnnualRent = calc.grossAnnualRent * Math.pow(1 + rentGrowthRate, yr - 1);
    const projectedNOI = projectedAnnualRent * (calc.netOperatingIncomeEur / calc.grossAnnualRent);
    const annualCashFlow = projectedNOI - calc.annualDebtServiceEur;
    cumulativeCashFlow += annualCashFlow;
    const equityBuilt = (purchasePrice - (calc.loanAmountEur * Math.max(0, 1 - (yr / loanTermYears)))) + (projectedPropertyValue - purchasePrice);

    return {
      year: yr,
      propertyValue: projectedPropertyValue,
      annualCashFlow,
      cumulativeCash: cumulativeCashFlow,
      totalEquity: equityBuilt,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

        <button
          type="button"
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors shrink-0 shadow-lg"
        >
          <FileText className="w-4 h-4 text-brand-400" />
          <span>{t.roiCalculator.exportPdfBtn}</span>
        </button>
      </div>

      {/* Quick Price Preset Selectors */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
          {t.roiCalculator.quickPresetsTitle}
        </span>
        {pricePresets.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setPurchasePrice(preset.price);
              setMonthlyRentEur(preset.rent);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              purchasePrice === preset.price
                ? 'bg-brand-600 border-brand-500 text-white shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Acquisition & Operating Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Acquisition & Financing */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Building className="w-4 h-4 text-brand-400" />
              <span>{t.roiCalculator.acquisitionTitle}</span>
            </h3>

            {/* Purchase Price */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.roiCalculator.purchasePrice}</span>
                <strong className="text-white font-mono text-sm">{formatEur(purchasePrice)}</strong>
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
                <strong className="text-brand-300 font-mono font-bold">
                  {downPaymentPercent}% ({formatEur(calc.downPaymentEur)})
                </strong>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {[15, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownPaymentPercent(pct)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      downPaymentPercent === pct
                        ? 'bg-brand-600 border-brand-500 text-white'
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
                    <strong className="text-white font-mono">{interestRatePercent}%</strong>
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
                    <strong className="text-white font-mono">{loanTermYears} Yrs</strong>
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
                <strong className="text-white font-mono">{formatEur(renovationEur)}</strong>
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
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>{t.roiCalculator.revenueTitle}</span>
            </h3>

            {/* Monthly Rent */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.roiCalculator.monthlyRent}</span>
                <strong className="text-emerald-400 font-mono text-sm">{formatEur(monthlyRentEur)}/mo</strong>
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

            {/* Vacancy & Maintenance */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.roiCalculator.vacancyRate}</span>
                  <strong className="text-white font-mono">{vacancyRatePercent}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={vacancyRatePercent}
                  onChange={(e) => setVacancyRatePercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.roiCalculator.maintenanceReserve}</span>
                  <strong className="text-white font-mono">{maintenanceReservePercent}%</strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.25"
                  value={maintenanceReservePercent}
                  onChange={(e) => setMaintenanceReservePercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-brand-500"
                />
              </div>
            </div>

            {/* Short-Term / Airbnb Toggle */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{t.roiCalculator.airbnbArbitrage}</span>
                  <span className="text-[10px] text-slate-400">{t.roiCalculator.airbnbArbitrageDesc}</span>
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
                <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-indigo-500/30 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{t.roiCalculator.nightlyRate}</span>
                      <strong className="text-indigo-300 font-mono">€{nightlyRateEur}/night</strong>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="250"
                      step="5"
                      value={nightlyRateEur}
                      onChange={(e) => setNightlyRateEur(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-indigo-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{t.roiCalculator.occupancy}</span>
                      <strong className="text-indigo-300 font-mono">{shortTermOccupancyPercent}%</strong>
                    </div>
                    <input
                      type="range"
                      min="40"
                      max="90"
                      step="5"
                      value={shortTermOccupancyPercent}
                      onChange={(e) => setShortTermOccupancyPercent(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded appearance-none accent-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Financial Results & Schedules (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key Yield KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-md text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">{t.roiCalculator.kpi.grossYield}</span>
              <strong className="text-xl font-black text-white font-mono">{formatPercent(calc.grossYieldPercent)}</strong>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/40 shadow-md text-center">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">{t.roiCalculator.kpi.netYield}</span>
              <strong className="text-xl font-black text-emerald-400 font-mono">{formatPercent(calc.netYieldPercent)}</strong>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-md text-center">
              <span className="text-[10px] text-brand-300 uppercase font-bold block">{t.roiCalculator.kpi.cashOnCash}</span>
              <strong className="text-xl font-black text-brand-300 font-mono">{formatPercent(calc.cashOnCashReturnPercent)}</strong>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-md text-center">
              <span className="text-[10px] text-amber-300 uppercase font-bold block">{t.roiCalculator.kpi.monthlyCashFlow}</span>
              <strong className="text-xl font-black text-amber-300 font-mono">
                {calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}
                {formatEur(calc.monthlyCashFlowAfterDebtEur)}
              </strong>
            </div>
          </div>

          {/* Romanian 2024–2026 Fiscal Code Breakdown Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
                  {t.roiCalculator.taxScheduleTitle}
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                {t.roiCalculator.taxScheduleBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.roiCalculator.incomeTaxTitle}</span>
                <strong className="text-sm font-bold text-white font-mono">
                  {formatRon(calc.annualTaxesRon.rentalIncomeTaxRon)} / yr
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {t.roiCalculator.incomeTaxDesc}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.roiCalculator.cassHealthTitle}</span>
                <strong className="text-sm font-bold text-white font-mono">
                  {formatRon(calc.annualTaxesRon.cassHealthTaxRon)} / yr
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {t.roiCalculator.cassHealthDesc}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t.roiCalculator.localTaxTitle}</span>
                <strong className="text-sm font-bold text-white font-mono">
                  {formatRon(calc.annualTaxesRon.propertyTaxRon)} / yr
                </strong>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {t.roiCalculator.localTaxDesc}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">{t.roiCalculator.totalAnnualTaxes}</span>
              <strong className="text-rose-300 font-mono text-sm">
                {formatEur(calc.annualTaxesEur)} / yr ({formatRon(calc.annualTaxesEur * taxSettings.eurToRonRate)})
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
                  <strong className="text-white font-mono text-sm">{formatEur(calc.shortTermGrossAnnualEur)}/yr</strong>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">{t.roiCalculator.netAnnualCashFlow}</span>
                  <strong className="text-indigo-300 font-mono text-sm">+{formatEur(calc.shortTermNetAnnualEur)}/yr</strong>
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
                        {formatEur(pt.propertyValue)}
                      </td>
                      <td className={`py-2.5 ${pt.annualCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {pt.annualCashFlow >= 0 ? '+' : ''}{formatEur(pt.annualCashFlow)}
                      </td>
                      <td className="py-2.5 text-brand-300">
                        {formatEur(pt.cumulativeCash)}
                      </td>
                      <td className="py-2.5 text-emerald-300 font-bold">
                        {formatEur(pt.totalEquity)}
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
          roiData={{
            inputs: {
              purchasePrice,
              downPaymentPercent,
              interestRatePercent,
              loanTermYears,
              monthlyRentEur,
              vacancyRatePercent,
              managementFeePercent,
              maintenanceReservePercent,
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
