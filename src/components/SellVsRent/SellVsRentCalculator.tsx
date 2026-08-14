import React, { useState } from 'react';
import { SellVsRentInputs } from '../../types';
import { calculateSellVsRent } from '../../utils/calculations';
import { formatEur, formatRon, formatPercent } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { 
  Scale, 
  BadgePercent, 
  Building, 
  Banknote, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  PieChart,
  HelpCircle
} from 'lucide-react';

export const SellVsRentCalculator: React.FC = () => {
  const { t } = useI18n();

  // Inputs State
  const [propertyValueEur, setPropertyValueEur] = useState<number>(135000);
  const [ownershipDurationYears, setOwnershipDurationYears] = useState<number>(4); // >3 years
  const [hasMortgage, setHasMortgage] = useState<boolean>(true);
  const [remainingMortgageBalanceEur, setRemainingMortgageBalanceEur] = useState<number>(65000);
  const [monthlyMortgagePaymentEur, setMonthlyMortgagePaymentEur] = useState<number>(430);
  const [remainingMortgageYears, setRemainingMortgageYears] = useState<number>(18);
  const [mortgageInterestRatePercent, setMortgageInterestRatePercent] = useState<number>(6.5);
  
  const [monthlyRentEur, setMonthlyRentEur] = useState<number>(650);
  const [monthlyOperatingExpensesEur, setMonthlyOperatingExpensesEur] = useState<number>(50);
  const [isShortTermCandidate, setIsShortTermCandidate] = useState<boolean>(true);
  const [shortTermMonthlyNetEur, setShortTermMonthlyNetEur] = useState<number>(920);
  
  const [alternativeReturnPercent, setAlternativeReturnPercent] = useState<number>(7.0); // e.g. Titluri Tezaur/Fidelis

  const inputs: SellVsRentInputs = {
    currentPropertyMarketValueEur: propertyValueEur,
    ownershipDurationYears,
    hasExistingMortgage: hasMortgage,
    remainingMortgageBalanceEur,
    monthlyMortgagePaymentEur,
    remainingMortgageYears,
    mortgageInterestRatePercent,
    estimatedMonthlyRentEur: monthlyRentEur,
    monthlyOperatingExpensesEur,
    isShortTermRentCandidate: isShortTermCandidate,
    estimatedShortTermMonthlyNetEur: shortTermMonthlyNetEur,
    alternativeInvestmentReturnRatePercent: alternativeReturnPercent,
  };

  const result = calculateSellVsRent(inputs);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Scale className="w-3.5 h-3.5 text-brand-400" />
            <span>Property Owner Decision Engine (Romanian Fiscal Law Art. 111)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {t.sellVsRent.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.sellVsRent.subtitle}
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-700 text-xs space-y-1 shrink-0">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Net Present Value & Wealth Horizon</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Factors in transfer taxes (1% vs 3%), mortgage amortization & Titluri Tezaur.
          </p>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Owner Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Property Valuation & Ownership */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Building className="w-4 h-4 text-brand-400" />
              <span>Property Valuation & Tax Basis</span>
            </h3>

            {/* Market Value */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.sellVsRent.propertyValuation}</span>
                <strong className="text-white font-mono">{formatEur(propertyValueEur)}</strong>
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
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                    ownershipDurationYears > 3
                      ? 'bg-brand-600/20 border-brand-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">Over 3 Years</span>
                  <span className="text-[10px] text-emerald-400 font-mono">1% Impozit Transfer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOwnershipDurationYears(2)}
                  className={`p-2 rounded-xl text-xs font-semibold border transition-all text-left ${
                    ownershipDurationYears <= 3
                      ? 'bg-brand-600/20 border-brand-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="block font-bold">Under 3 Years</span>
                  <span className="text-[10px] text-amber-400 font-mono">3% Impozit Transfer</span>
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
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    hasMortgage ? 'bg-purple-600 text-white' : 'text-slate-400'
                  }`}
                >
                  With Debt
                </button>
                <button
                  type="button"
                  onClick={() => setHasMortgage(false)}
                  className={`px-2 py-1 rounded text-[11px] font-bold ${
                    !hasMortgage ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Debt-Free
                </button>
              </div>
            </div>

            {hasMortgage ? (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{t.sellVsRent.remainingLoanBalance}</span>
                    <strong className="text-rose-300 font-mono">{formatEur(remainingMortgageBalanceEur)}</strong>
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

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{t.sellVsRent.monthlyInstallment}</span>
                    <strong className="text-white font-mono">{formatEur(monthlyMortgagePaymentEur)}/mo</strong>
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
              </div>
            ) : (
              <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Property is 100% owned without bank encumbrances. All rental income goes directly to you.</span>
              </div>
            )}
          </div>

          {/* 3. Rental & Reinvestment Projections */}
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Rental Expectations & Reinvestment</span>
            </h3>

            {/* Expected Rent */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">{t.sellVsRent.rentalExpectation}</span>
                <strong className="text-white font-mono">{formatEur(monthlyRentEur)}/mo</strong>
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

            {/* Alternative Reinvestment Rate */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Alternative Return (Tezaur / ETF):</span>
                <strong className="text-brand-300 font-mono">{alternativeReturnPercent.toFixed(1)}% p.a.</strong>
              </div>
              <input
                type="range"
                min="4.0"
                max="12.0"
                step="0.5"
                value={alternativeReturnPercent}
                onChange={(e) => setAlternativeReturnPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                Romanian Titluri de Stat Tezaur/Fidelis are ~6.5-7.0% tax-free.
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: 3-Way Comparison Matrix & Verdict (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Algorithmic Verdict Card */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950/60 p-6 rounded-3xl border border-brand-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-400" />
                <span className="text-xs font-black uppercase tracking-wider text-brand-300">
                  {t.sellVsRent.verdictTitle}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
                  result.recommendedStrategy === 'RENT_LONG_TERM'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : result.recommendedStrategy === 'RENT_SHORT_TERM'
                    ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                {result.recommendedStrategy === 'RENT_LONG_TERM'
                  ? 'KEEP & RENT LONG-TERM'
                  : result.recommendedStrategy === 'RENT_SHORT_TERM'
                  ? 'SHORT-TERM (AIRBNB)'
                  : 'SELL & REINVEST'}
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

          {/* Side-by-Side 3 Strategy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Strategy 1: Sell Now */}
            <div
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                result.recommendedStrategy === 'SELL'
                  ? 'bg-slate-900 border-brand-500 ring-2 ring-brand-500/30'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                  {t.sellVsRent.sellScenario.title}
                </span>
                <span className="text-xl font-black text-white font-mono block">
                  {formatEur(result.netCashProceedsFromSaleEur)}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Immediate Liquid Cash in Hand
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Tax ({result.transferTaxRatePercent}%):</span>
                  <span className="text-rose-300 font-mono">-{formatEur(result.transferTaxEur)}</span>
                </div>
                {hasMortgage && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Loan Payoff:</span>
                    <span className="text-rose-300 font-mono">-{formatEur(result.mortgagePayoffEur)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800 font-bold">
                  <span className="text-slate-300">5-Yr Wealth:</span>
                  <span className="text-brand-400 font-mono">+{formatEur(result.fiveYearReinvestmentWealthEur)}</span>
                </div>
              </div>
            </div>

            {/* Strategy 2: Rent Long-Term */}
            <div
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                result.recommendedStrategy === 'RENT_LONG_TERM'
                  ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">
                  {t.sellVsRent.rentScenario.title}
                </span>
                <span className="text-xl font-black text-emerald-400 font-mono block">
                  {result.monthlyNetRentalCashFlowEur >= 0 ? '+' : ''}
                  {formatEur(result.monthlyNetRentalCashFlowEur)} / mo
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Monthly Cash Flow in Pocket
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Gross Rent:</span>
                  <span className="text-slate-200 font-mono">{formatEur(monthlyRentEur)}/mo</span>
                </div>
                {hasMortgage && (
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Bank Rate:</span>
                    <span className="text-rose-300 font-mono">-{formatEur(monthlyMortgagePaymentEur)}/mo</span>
                  </div>
                )}
                <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800 font-bold">
                  <span className="text-slate-300">5-Yr Wealth:</span>
                  <span className="text-emerald-400 font-mono">+{formatEur(result.fiveYearRentalWealthEur)}</span>
                </div>
              </div>
            </div>

            {/* Strategy 3: Airbnb / Short Term */}
            <div
              className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                result.recommendedStrategy === 'RENT_SHORT_TERM'
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-400 block mb-1">
                  {t.sellVsRent.shortTermScenario.title}
                </span>
                <span className="text-xl font-black text-indigo-400 font-mono block">
                  +{formatEur(result.annualShortTermNetCashFlowEur / 12)} / mo
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Estimated Airbnb Net Cash
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Annual Net:</span>
                  <span className="text-slate-200 font-mono">+{formatEur(result.annualShortTermNetCashFlowEur)}/yr</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800 font-bold">
                  <span className="text-slate-300">5-Yr Wealth:</span>
                  <span className="text-indigo-400 font-mono">+{formatEur(result.fiveYearShortTermWealthEur)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* 5-Year & 10-Year Cumulative Wealth Bar Chart */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Cumulative Net Worth Comparison (5-Year & 10-Year Horizons)</span>
              <span className="text-[10px] text-slate-400 font-mono">Equity + Cash</span>
            </h3>

            <div className="space-y-4">
              
              {/* 5-Year Horizon */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-bold">
                  <span className="text-slate-300">5-Year Net Wealth Projection</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">If You Sell Now & Reinvest at {alternativeReturnPercent}%:</span>
                      <strong className="text-brand-300 font-mono">{formatEur(result.fiveYearReinvestmentWealthEur)}</strong>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">If You Hold & Rent Long-Term:</span>
                      <strong className="text-emerald-400 font-mono">{formatEur(result.fiveYearRentalWealthEur)}</strong>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{
                          width: `${Math.min(100, (result.fiveYearRentalWealthEur / Math.max(result.fiveYearRentalWealthEur, result.fiveYearReinvestmentWealthEur)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 10-Year Horizon */}
              <div className="pt-3 border-t border-slate-800">
                <div className="flex justify-between text-xs mb-1.5 font-bold">
                  <span className="text-slate-300">10-Year Long-Range Wealth Projection</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">10-Yr Reinvestment</span>
                    <strong className="text-lg font-black text-brand-400 font-mono">
                      {formatEur(result.tenYearReinvestmentWealthEur)}
                    </strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase">10-Yr Rent & Property</span>
                    <strong className="text-lg font-black text-emerald-400 font-mono">
                      {formatEur(result.tenYearRentalWealthEur)}
                    </strong>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
