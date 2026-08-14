import React, { useState } from 'react';
import { calculateRealEstateFinancials, DEFAULT_TAX_SETTINGS } from '../../utils/calculations';
import { useI18n } from '../../i18n';
import { useCurrency } from '../../currency';
import { 
  Zap, 
  Settings2, 
  Coins, 
  ArrowRight, 
  TrendingUp, 
  FileText,
  Clock,
  Sparkles,
  DollarSign,
  Percent
} from 'lucide-react';
import { FormalReportModal } from '../ReportExport/FormalReportModal';
import { formatPercent } from '../../utils/formatters';

interface Props {
  onSwitchToPro: () => void;
}

export const QuickROICalculator: React.FC<Props> = ({ onSwitchToPro }) => {
  const { t } = useI18n();
  const { formatMoney } = useCurrency();

  // Simple Inputs
  const [purchasePriceEur, setPurchasePriceEur] = useState<number>(110000);
  const [isMortgage, setIsMortgage] = useState<boolean>(true);
  const [monthlyRentEur, setMonthlyRentEur] = useState<number>(600);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Derive inputs for the calculation engine under standard Romanian statutory parameters
  const calculationInputs = {
    purchasePrice: purchasePriceEur,
    downPaymentPercent: isMortgage ? 20 : 100,
    interestRatePercent: 6.5,
    loanTermYears: 25,
    monthlyRentEur: monthlyRentEur,
    vacancyRatePercent: 5,
    managementFeePercent: 0,
    maintenanceReservePercent: 5,
    customRenovationEur: 0,
  };

  const calc = calculateRealEstateFinancials(calculationInputs, DEFAULT_TAX_SETTINGS);

  const quickPrices = [65000, 95000, 130000, 180000, 250000];
  const quickRents = [350, 500, 650, 850, 1100];

  // Rating badge
  const getYieldRating = (netYield: number) => {
    if (netYield >= 7.0) return { label: t.quickCheck.ratingOutstanding, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
    if (netYield >= 5.5) return { label: t.quickCheck.ratingSolid, color: 'text-brand-400 bg-brand-500/10 border-brand-500/30' };
    if (netYield >= 4.0) return { label: t.quickCheck.ratingBalanced, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
    return { label: t.quickCheck.ratingModerate, color: 'text-slate-400 bg-slate-800 border-slate-700' };
  };

  const rating = getYieldRating(calc.netYieldPercent);
  const paybackYears = calc.annualCashFlowAfterDebtEur > 0 
    ? (calc.downPaymentEur / calc.annualCashFlowAfterDebtEur).toFixed(1) 
    : 'N/A';

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in duration-200">
      
      {/* Header with Mode Switcher */}
      <div className="bg-slate-900/90 p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.quickCheck.badge}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t.quickCheck.roiTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.quickCheck.roiSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onSwitchToPro}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5 text-brand-400" />
            <span>{t.quickCheck.switchToProRoi}</span>
          </button>
        </div>
      </div>

      {/* 3 Step Interactive Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Step 1: Purchase Price */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[11px] font-black">1</span>
            <span>{t.quickCheck.purchasePrice}</span>
          </div>

          <div className="text-2xl font-black text-white font-mono">
            {formatMoney(purchasePriceEur)}
          </div>

          <input
            type="range"
            min="30000"
            max="400000"
            step="5000"
            value={purchasePriceEur}
            onChange={(e) => setPurchasePriceEur(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-brand-500"
          />

          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickPrices.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setPurchasePriceEur(val)}
                className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                  purchasePriceEur === val
                    ? 'bg-brand-600 border-brand-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                €{val / 1000}k
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Financing Strategy */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[11px] font-black">2</span>
            <span>{t.quickCheck.financingMethod}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsMortgage(true)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isMortgage
                  ? 'bg-brand-600 border-brand-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.quickCheck.loan20}
            </button>

            <button
              type="button"
              onClick={() => setIsMortgage(false)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                !isMortgage
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.quickCheck.cash100}
            </button>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 space-y-1">
            <div className="flex justify-between">
              <span>{t.quickCheck.downPaymentLabel}</span>
              <strong className="text-white font-mono">{formatMoney(calc.downPaymentEur)}</strong>
            </div>
            {isMortgage && (
              <div className="flex justify-between">
                <span>{t.quickCheck.bankInstallmentLabel}</span>
                <strong className="text-purple-300 font-mono">-{formatMoney(calc.monthlyMortgagePaymentEur)}/mo</strong>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: Expected Monthly Rent */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[11px] font-black">3</span>
            <span>{t.quickCheck.expectedMonthlyRent}</span>
          </div>

          <div className="text-2xl font-black text-emerald-400 font-mono">
            {formatMoney(monthlyRentEur)}/mo
          </div>

          <input
            type="range"
            min="200"
            max="2500"
            step="25"
            value={monthlyRentEur}
            onChange={(e) => setMonthlyRentEur(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-emerald-500"
          />

          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickRents.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setMonthlyRentEur(r)}
                className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                  monthlyRentEur === r
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                €{r}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Result Dashboard Ribbon */}
      <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
        
        {/* Rating Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.quickCheck.investmentAssessment}
            </span>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold ${rating.color}`}>
              <span>{rating.label}</span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-slate-400 uppercase block font-bold">{t.quickCheck.grossAnnualYield}</span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">
              {formatPercent(calc.grossYieldPercent)}
            </span>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Card 1: Net Yield */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.quickCheck.netYieldCard}</span>
            <div className="text-xl font-black text-emerald-400 font-mono">
              {formatPercent(calc.netYieldPercent)}
            </div>
            <span className="text-[10px] text-slate-500">{t.quickCheck.afterTaxesOpex}</span>
          </div>

          {/* Card 2: Cash in Pocket */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.quickCheck.monthlyInPocketCard}</span>
            <div className={`text-xl font-black font-mono ${calc.monthlyCashFlowAfterDebtEur >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}{formatMoney(calc.monthlyCashFlowAfterDebtEur)}
            </div>
            <span className="text-[10px] text-slate-500">{t.quickCheck.netTakeHomeCash}</span>
          </div>

          {/* Card 3: Cash-on-Cash */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.quickCheck.cashOnCashCard}</span>
            <div className="text-xl font-black text-indigo-400 font-mono">
              {formatPercent(calc.cashOnCashReturnPercent)}
            </div>
            <span className="text-[10px] text-slate-500">{t.quickCheck.returnOnCapital}</span>
          </div>

          {/* Card 4: Payback Period */}
          <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{t.quickCheck.capitalPaybackCard}</span>
            <div className="text-xl font-black text-purple-300 font-mono">
              {paybackYears} {paybackYears !== 'N/A' ? t.quickCheck.yearsUnit : ''}
            </div>
            <span className="text-[10px] text-slate-500">{t.quickCheck.toRecoverCash}</span>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setShowReportModal(true)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-brand-400" />
            <span>{t.quickCheck.exportPdfBtn}</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToPro}
            className="text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>{t.quickCheck.deepDiveProRoi}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Formal Audit Report Modal */}
      {showReportModal && (
        <FormalReportModal
          type="roiCalculator"
          mode="quick"
          roiData={{
            inputs: calculationInputs,
            calc,
            taxSettings: DEFAULT_TAX_SETTINGS
          }}
          onClose={() => setShowReportModal(false)}
        />
      )}

    </div>
  );
};
