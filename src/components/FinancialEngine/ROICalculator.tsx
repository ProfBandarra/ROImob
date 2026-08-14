import React, { useState } from 'react';
import { Property, ROITaxSettings } from '../../types';
import { calculateRealEstateFinancials, DEFAULT_TAX_SETTINGS } from '../../utils/calculations';
import { formatEur, formatRon, formatPercent, formatNumber } from '../../utils/formatters';
import { SourceAttributionBadge } from '../SourceAttributionBadge';
import { useI18n } from '../../i18n';
import { 
  Calculator, 
  Banknote, 
  TrendingUp, 
  FileSpreadsheet, 
  Coins, 
  Receipt, 
  Percent, 
  HelpCircle, 
  Sparkles, 
  Building, 
  Calendar,
  Layers,
  ArrowRight,
  BadgePercent
} from 'lucide-react';

interface Props {
  selectedProperty?: Property | null;
  allProperties: Property[];
  onSelectPropertyChange: (property: Property) => void;
}

export const ROICalculator: React.FC<Props> = ({
  selectedProperty,
  allProperties,
  onSelectPropertyChange,
}) => {
  const { t } = useI18n();

  const property = selectedProperty || allProperties[0];

  // Financial Input States
  const [purchasePrice, setPurchasePrice] = useState<number>(property.priceEur);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRatePercent, setInterestRatePercent] = useState<number>(6.5); // Current Romanian IRCC + Margin
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [monthlyRentEur, setMonthlyRentEur] = useState<number>(property.investment.monthlyRentEstimateEur);
  const [vacancyRatePercent, setVacancyRatePercent] = useState<number>(5);
  const [managementFeePercent, setManagementFeePercent] = useState<number>(property.investment.managementFeePercent);
  const [maintenanceReservePercent, setMaintenanceReservePercent] = useState<number>(1.0);
  const [renovationEur, setRenovationEur] = useState<number>(property.investment.estimatedRenovationCostEur);

  // Sync inputs when selected property changes
  React.useEffect(() => {
    if (selectedProperty) {
      setPurchasePrice(selectedProperty.priceEur);
      setMonthlyRentEur(selectedProperty.investment.monthlyRentEstimateEur);
      setManagementFeePercent(selectedProperty.investment.managementFeePercent);
      setRenovationEur(selectedProperty.investment.estimatedRenovationCostEur);
    }
  }, [selectedProperty]);

  // Tax settings
  const [taxSettings, setTaxSettings] = useState<ROITaxSettings>(DEFAULT_TAX_SETTINGS);

  const calc = calculateRealEstateFinancials(
    property,
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
    },
    taxSettings
  );

  // 10-Year Projection Model
  const appreciationRate = 0.035; // 3.5% conservative annual property appreciation
  const rentGrowthRate = 0.025; // 2.5% annual rent growth
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
      cumulativeCashFlow,
      totalEquity: equityBuilt,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Coins className="w-3.5 h-3.5 text-brand-400" />
            <span>Romanian Fiscal Code 2024-2026 Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {t.calculator.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Property Selector Dropdown */}
        <div className="w-full md:w-80 bg-slate-950/80 p-3 rounded-2xl border border-slate-700">
          <label className="block text-[11px] text-slate-400 font-bold uppercase mb-1">
            Analyze Sample Property:
          </label>
          <select
            value={property.id}
            onChange={(e) => {
              const p = allProperties.find((item) => item.id === e.target.value);
              if (p) onSelectPropertyChange(p);
            }}
            className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold cursor-pointer"
          >
            {allProperties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.city} — {formatEur(p.priceEur)} ({p.usableAreaSqm}m²)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 2-Column Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Input Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Acquisition & Loan Settings */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Banknote className="w-4 h-4 text-brand-400" />
                <span>{t.calculator.purchaseSettings}</span>
              </h3>
              <span className="text-[11px] text-brand-400 font-bold font-mono">
                Total: {formatEur(calc.totalAcquisitionCost)}
              </span>
            </div>

            {/* Purchase Price */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.calculator.purchasePrice}</span>
                <strong className="text-white font-mono">{formatEur(purchasePrice)}</strong>
              </div>
              <input
                type="range"
                min="40000"
                max="500000"
                step="2500"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.calculator.downPayment}</span>
                <strong className="text-white font-mono">
                  {downPaymentPercent}% ({formatEur(calc.downPaymentEur)})
                </strong>
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
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>0% (Cash)</span>
                <span>15% (1st Home)</span>
                <span>25% (Investment)</span>
                <span>100%</span>
              </div>
            </div>

            {/* Mortgage Interest Rate (IRCC + Spread) */}
            {downPaymentPercent < 100 && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.calculator.mortgageInterestRate}</span>
                  <strong className="text-white font-mono">{interestRatePercent.toFixed(2)}%</strong>
                </div>
                <input
                  type="range"
                  min="3.5"
                  max="11.0"
                  step="0.1"
                  value={interestRatePercent}
                  onChange={(e) => setInterestRatePercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>
            )}

            {/* Loan Term */}
            {downPaymentPercent < 100 && (
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{t.calculator.loanTermYears}</span>
                  <strong className="text-white font-mono">{loanTermYears} {t.common.years}</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTermYears}
                  onChange={(e) => setLoanTermYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
              </div>
            )}
          </div>

          {/* 2. Rental Revenue & Operating Expenses */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" />
                <span>Rental Income & Expenses</span>
              </h3>
              <span className="text-[11px] text-emerald-400 font-bold font-mono">
                {formatEur(calc.grossAnnualRent)} / yr
              </span>
            </div>

            {/* Expected Rent */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.calculator.monthlyRent}</span>
                <strong className="text-white font-mono">{formatEur(monthlyRentEur)}/mo</strong>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="25"
                value={monthlyRentEur}
                onChange={(e) => setMonthlyRentEur(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Vacancy Rate */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.calculator.vacancyRate}</span>
                <strong className="text-white font-mono">{vacancyRatePercent}% (~{Math.round(vacancyRatePercent * 3.65)} days/yr)</strong>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={vacancyRatePercent}
                onChange={(e) => setVacancyRatePercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>

            {/* Property Management Fee */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.calculator.managementFee}</span>
                <strong className="text-white font-mono">{managementFeePercent}%</strong>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={managementFeePercent}
                onChange={(e) => setManagementFeePercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
              />
            </div>
          </div>

          {/* 3. Romanian Tax Engine Highlights */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Percent className="w-4 h-4 text-purple-400" />
                <span>{t.calculator.roTaxFramework}</span>
              </h3>
              <span className="text-[10px] text-purple-300 font-bold bg-purple-900/40 px-2 py-0.5 rounded border border-purple-700/50">
                Cod Fiscal RO
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">10% Impozit pe Venit Chirie (după deducere 20% forfetară):</span>
                <strong className="text-white font-mono">{formatRon(calc.annualTaxesRon.rentalIncomeTaxRon)}</strong>
              </div>

              <div className="flex justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-400 block">CASS Sănătate (Plafoane 6 / 12 / 24 salarii minime):</span>
                  <span className="text-[10px] text-slate-500">Bază minim brut: {taxSettings.minimumWageRon} RON</span>
                </div>
                <strong className="text-white font-mono">{formatRon(calc.annualTaxesRon.cassHealthTaxRon)}</strong>
              </div>

              <div className="flex justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400">Impozit Local pe Clădiri + PAD Asigurare:</span>
                <strong className="text-white font-mono">{formatRon(calc.annualTaxesRon.propertyTaxRon + (taxSettings.padInsuranceAnnualEur * taxSettings.eurToRonRate))}</strong>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Financial Results, Cash-Flow & Projections (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Key KPI Hero Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            {/* Gross Yield */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-lg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {t.calculator.results.grossYield}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-brand-400 font-mono">
                {calc.grossYieldPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                Gross rent / Purchase price
              </span>
            </div>

            {/* Net Yield (Cap Rate) */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-lg">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {t.calculator.results.netYield}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {calc.netYieldPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                NOI / Total acquisition cost
              </span>
            </div>

            {/* Cash on Cash */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 shadow-lg col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {t.calculator.results.cashOnCash}
              </span>
              <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">
                {calc.cashOnCashReturnPercent.toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">
                Leveraged return on equity
              </span>
            </div>

          </div>

          {/* Cash Flow Detailed Summary */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Monthly & Annual Cash Flow Breakdown</span>
              <span className="text-slate-400 font-normal font-mono text-[11px]">EUR (€)</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-300">Gross Monthly Rent:</span>
                <span className="text-white font-mono font-bold">+{formatEur(monthlyRentEur)} / mo</span>
              </div>

              {downPaymentPercent < 100 && (
                <div className="flex justify-between py-1 text-rose-300">
                  <span>Mortgage Installment (Principal + IRCC Interest):</span>
                  <span className="font-mono font-bold">-{formatEur(calc.monthlyMortgagePaymentEur)} / mo</span>
                </div>
              )}

              <div className="flex justify-between py-1 text-slate-400">
                <span>Operating Expenses & Vacancy:</span>
                <span className="font-mono">-{formatEur((calc.annualOperatingExpenses - calc.annualTaxesEur) / 12)} / mo</span>
              </div>

              <div className="flex justify-between py-1 text-purple-300">
                <span>Taxes & Insurance (Impozit, CASS, PAD, Local):</span>
                <span className="font-mono font-bold">-{formatEur(calc.annualTaxesEur / 12)} / mo</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-slate-800 text-sm">
                <strong className="text-white">Net Monthly Cash Flow:</strong>
                <strong
                  className={`font-mono font-black ${
                    calc.monthlyCashFlowAfterDebtEur >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}
                  {formatEur(calc.monthlyCashFlowAfterDebtEur)} / mo
                </strong>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Annual Net Cash Flow:</span>
                <span className="font-mono font-bold text-white">
                  {calc.annualCashFlowAfterDebtEur >= 0 ? '+' : ''}
                  {formatEur(calc.annualCashFlowAfterDebtEur)} / yr
                </span>
              </div>
            </div>
          </div>

          {/* Long Term vs Short Term (Airbnb) Arbitrage Box */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 p-5 rounded-2xl border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>{t.calculator.results.shortTermComparison}</span>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded font-mono">
                Airbnb / Booking
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Long-Term Rental Net Yield
                </span>
                <span className="text-xl font-black text-brand-400 font-mono">
                  {calc.netYieldPercent.toFixed(2)}%
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  NOI: {formatEur(calc.netOperatingIncomeEur)} / yr
                </span>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  Short-Term (Airbnb) Net Yield
                </span>
                <span className="text-xl font-black text-indigo-400 font-mono">
                  {calc.shortTermYieldPercent.toFixed(2)}%
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Est. Net: {formatEur(calc.shortTermNetAnnualEur)} / yr
                </span>
              </div>
            </div>
          </div>

          {/* 10-Year ROI Projection Table */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-400" />
                <span>{t.calculator.results.tenYearRoi}</span>
              </h3>
              <span className="text-[10px] text-slate-400">
                Assuming 3.5% property appreciation & 2.5% rent growth
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                    <th className="py-2">Year</th>
                    <th className="py-2">Property Value</th>
                    <th className="py-2">Annual Cash Flow</th>
                    <th className="py-2">Cumulative Cash</th>
                    <th className="py-2 text-right">Total Equity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {projectionTable.map((row) => (
                    <tr key={row.year} className="hover:bg-slate-800/40">
                      <td className="py-1.5 font-bold text-brand-300">Y{row.year}</td>
                      <td className="py-1.5 text-slate-200">{formatEur(row.propertyValue)}</td>
                      <td className="py-1.5 text-emerald-400">+{formatEur(row.annualCashFlow)}</td>
                      <td className="py-1.5 text-slate-300">+{formatEur(row.cumulativeCashFlow)}</td>
                      <td className="py-1.5 text-right font-bold text-purple-300">
                        {formatEur(row.totalEquity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
