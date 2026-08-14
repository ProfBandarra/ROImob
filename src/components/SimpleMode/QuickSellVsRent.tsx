import React, { useState } from 'react';
import { calculateSellVsRent } from '../../utils/calculations';
import { SellVsRentInputs } from '../../types';
import { useI18n } from '../../i18n';
import { useCurrency } from '../../currency';
import { 
  Zap, 
  Settings2, 
  Home, 
  Banknote, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  FileText,
  HelpCircle
} from 'lucide-react';
import { FormalReportModal } from '../ReportExport/FormalReportModal';

interface Props {
  onSwitchToPro: () => void;
}

export const QuickSellVsRent: React.FC<Props> = ({ onSwitchToPro }) => {
  const { t } = useI18n();
  const { formatMoney } = useCurrency();

  // Simple Inputs
  const [propertyValueEur, setPropertyValueEur] = useState<number>(150000);
  const [hasMortgage, setHasMortgage] = useState<boolean>(false);
  const [mortgageBalanceEur, setMortgageBalanceEur] = useState<number>(75000);
  const [monthlyRentEur, setMonthlyRentEur] = useState<number>(650);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Derive inputs for the calculation engine under standard parameters
  const calculationInputs: SellVsRentInputs = {
    currentPropertyMarketValueEur: propertyValueEur,
    ownershipDurationYears: 4, // >3 years (1% transfer tax)
    hasExistingMortgage: hasMortgage,
    remainingMortgageBalanceEur: hasMortgage ? mortgageBalanceEur : 0,
    monthlyMortgagePaymentEur: hasMortgage ? Math.round(mortgageBalanceEur * 0.007) : 0,
    remainingMortgageYears: 20,
    mortgageInterestRatePercent: 6.5,
    earlyMortgagePrepaymentFeePercent: 0,
    reinvestCashFlowToPrepayMortgage: false,

    realEstateAgentCommissionPercent: 1.5,
    sellingPreparationCostEur: 1000,
    simulateInformalSellingPriceUnderdeclaration: false,
    unreportedDeclaredPriceEur: propertyValueEur,

    estimatedMonthlyRentEur: monthlyRentEur,
    monthlyOperatingExpensesEur: Math.round(monthlyRentEur * 0.12),
    propertyAppreciationRatePercent: 3.5,
    taxRegime: 'INDIVIDUAL_FLAT',

    includeShortTermOption: false,
    estimatedShortTermMonthlyNetEur: Math.round(monthlyRentEur * 1.35),

    alternativeInvestmentReturnRatePercent: 6.8, // Tezaur Treasury Bonds
    adjustForInflation: false,
    annualInflationRatePercent: 3.5,
    projectionHorizonYears: 5,
  };

  const result = calculateSellVsRent(calculationInputs);

  const rentWealth5Yr = result.selectedHorizonRentalWealthEur;
  const sellWealth5Yr = result.selectedHorizonReinvestmentWealthEur;
  const isRentBetter = result.recommendedStrategy === 'RENT_LONG_TERM';
  const delta5Yr = Math.abs(rentWealth5Yr - sellWealth5Yr);

  const quickValues = [80000, 120000, 160000, 220000, 300000];
  const quickRents = [400, 550, 700, 900, 1200];

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
            {t.quickCheck.svrTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.quickCheck.svrSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onSwitchToPro}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5 text-brand-400" />
            <span>{t.quickCheck.switchToProSvr}</span>
          </button>
        </div>
      </div>

      {/* 3 Step Interactive Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Step 1: Property Value */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[11px] font-black">1</span>
            <span>{t.quickCheck.propertyValue}</span>
          </div>

          <div className="text-2xl font-black text-white font-mono">
            {formatMoney(propertyValueEur)}
          </div>

          <input
            type="range"
            min="40000"
            max="500000"
            step="5000"
            value={propertyValueEur}
            onChange={(e) => setPropertyValueEur(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg cursor-pointer accent-brand-500"
          />

          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickValues.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setPropertyValueEur(val)}
                className={`px-2 py-1 rounded-md text-[10px] font-bold border transition-colors cursor-pointer ${
                  propertyValueEur === val
                    ? 'bg-brand-600 border-brand-500 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                €{val / 1000}k
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Mortgage Status */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[11px] font-black">2</span>
            <span>{t.quickCheck.mortgageStatus}</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setHasMortgage(false)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                !hasMortgage
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.quickCheck.noDebt}
            </button>

            <button
              type="button"
              onClick={() => setHasMortgage(true)}
              className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                hasMortgage
                  ? 'bg-purple-600 border-purple-500 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t.quickCheck.haveMortgage}
            </button>
          </div>

          {hasMortgage ? (
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">{t.quickCheck.remainingLoan}</span>
                <span className="text-purple-300 font-mono font-bold">{formatMoney(mortgageBalanceEur)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max={propertyValueEur * 0.85}
                step="5000"
                value={mortgageBalanceEur}
                onChange={(e) => setMortgageBalanceEur(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          ) : (
            <div className="text-[11px] text-emerald-400 font-medium pt-2">
              {t.quickCheck.freeAndClear}
            </div>
          )}
        </div>

        {/* Step 3: Expected Monthly Rent */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-[11px] font-black">3</span>
            <span>{t.quickCheck.monthlyRentPotential}</span>
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

      {/* Instant Friendly Verdict Box */}
      <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl space-y-5 transition-all ${
        isRentBetter
          ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500'
          : 'bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border-purple-500'
      }`}>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              {t.quickCheck.decisionRecommendation}
            </span>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-base font-black uppercase tracking-wide text-white ${
                isRentBetter ? 'bg-emerald-600' : 'bg-purple-600'
              }`}>
                {isRentBetter ? t.quickCheck.keepAndRentVerdict : t.quickCheck.betterToSellVerdict}
              </span>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-slate-400 uppercase block font-bold">{t.quickCheck.extraWealth5Yr}</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
              +{formatMoney(delta5Yr)}
            </span>
          </div>
        </div>

        {/* 5-Year Comparative Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          {/* Strategy A: Keep & Rent */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isRentBetter ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className="flex justify-between items-center">
              <span className="font-black text-sm text-white">{t.quickCheck.optionA}</span>
              {isRentBetter && <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">{t.quickCheck.recommendedBadge}</span>}
            </div>

            <div className="text-xl font-black text-emerald-400 font-mono">
              {formatMoney(rentWealth5Yr)}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t.quickCheck.optionADesc}
            </p>
          </div>

          {/* Strategy B: Sell & Reinvest */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            !isRentBetter ? 'bg-purple-950/20 border-purple-500/40' : 'bg-slate-950/60 border-slate-800'
          }`}>
            <div className="flex justify-between items-center">
              <span className="font-black text-sm text-white">{t.quickCheck.optionB}</span>
              {!isRentBetter && <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded">{t.quickCheck.recommendedBadge}</span>}
            </div>

            <div className="text-xl font-black text-purple-300 font-mono">
              {formatMoney(sellWealth5Yr)}
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t.quickCheck.optionBDesc}
            </p>
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
            <span>{t.quickCheck.deepDiveProSvr}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Formal Audit Report Modal */}
      {showReportModal && (
        <FormalReportModal
          type="sellVsRent"
          sellVsRentData={{
            inputs: calculationInputs,
            result
          }}
          onClose={() => setShowReportModal(false)}
        />
      )}

    </div>
  );
};
