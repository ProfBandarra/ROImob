import React from 'react';
import { 
  SellVsRentInputs, 
  SellVsRentResult, 
  FinancialCalculationResult, 
  ROITaxSettings,
  YearlyWealthPoint
} from '../../types';
import { formatEur, formatRon, formatPercent } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { 
  Building2, 
  Printer, 
  X, 
  CheckCircle2,
  FileText,
  BadgeCheck
} from 'lucide-react';

interface Props {
  type: 'sellVsRent' | 'roiCalculator';
  sellVsRentData?: {
    inputs: SellVsRentInputs;
    result: SellVsRentResult;
  };
  roiData?: {
    inputs: {
      purchasePrice: number;
      downPaymentPercent: number;
      interestRatePercent: number;
      loanTermYears: number;
      monthlyRentEur: number;
      vacancyRatePercent: number;
      managementFeePercent: number;
      maintenanceReservePercent: number;
      customRenovationEur?: number;
    };
    calc: FinancialCalculationResult;
    taxSettings: ROITaxSettings;
  };
  onClose: () => void;
}

export const FormalReportModal: React.FC<Props> = ({
  type,
  sellVsRentData,
  roiData,
  onClose
}) => {
  const { language } = useI18n();

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString(
    language === 'ro' ? 'ro-RO' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'uk' ? 'uk-UA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const reportId = `ROIMOB-${type === 'sellVsRent' ? 'SVR' : 'ROI'}-${Date.now().toString().slice(-6)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static print:inset-auto">
      
      {/* Modal Container */}
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white print:text-slate-900 print:w-full print:max-w-none print:rounded-none">
        
        {/* Top Control Bar (Hidden when Printing) */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              {type === 'sellVsRent' ? 'Owner Strategy Dossier' : 'Institutional ROI & Fiscal Audit'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Sheet */}
        <div id="formal-report-print-sheet" className="p-8 sm:p-12 space-y-8 bg-white text-slate-900 print:p-0">
          
          {/* Formal Letterhead */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-slate-900">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                  ROI<span className="text-indigo-600">mob</span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-300 ml-2">
                  Official Audit Dossier
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Romanian Real Estate Financial Evaluation & Fiscal Compliance Audit
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 space-y-1">
              <div><strong>Audit Ref:</strong> <span className="font-mono">{reportId}</span></div>
              <div><strong>Date of Issue:</strong> {currentDate}</div>
              <div><strong>Fiscal Framework:</strong> Law 227/2015 & OUG 115/2023</div>
            </div>
          </div>

          {/* REPORT TYPE 1: SELL VS RENT OPTIMIZER */}
          {type === 'sellVsRent' && sellVsRentData && (
            <div className="space-y-6">
              
              {/* Executive Summary Box */}
              <div className="bg-slate-50 border-2 border-slate-900 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 font-black text-sm uppercase tracking-wider">
                    <BadgeCheck className="w-5 h-5 text-indigo-600" />
                    <span>Executive Strategic Recommendation</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-wider">
                    {sellVsRentData.result.recommendedStrategy === 'RENT_LONG_TERM' 
                      ? 'KEEP & RENT LONG-TERM' 
                      : sellVsRentData.result.recommendedStrategy === 'RENT_SHORT_TERM' 
                      ? 'SHORT-TERM (AIRBNB)' 
                      : 'SELL NOW & REINVEST'}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 leading-relaxed">
                  {sellVsRentData.result.verdictSummary}
                </p>
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  {sellVsRentData.result.verdictHighlights.map((h: string, i: number) => (
                    <div key={i} className="text-xs text-slate-700 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property & Ownership Parameters Table */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  1. Property Identity & Baseline Parameters
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Estimated Valuation</span>
                    <strong className="text-sm font-bold text-slate-900 font-mono">{formatEur(sellVsRentData.inputs.currentPropertyMarketValueEur)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Ownership Duration</span>
                    <strong className="text-sm font-bold text-slate-900">
                      {sellVsRentData.inputs.ownershipDurationYears > 3 ? '> 3 Years (1% Tax)' : '≤ 3 Years (3% Tax)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Mortgage Status</span>
                    <strong className="text-sm font-bold text-slate-900">
                      {sellVsRentData.inputs.hasExistingMortgage ? `Active Debt (${formatEur(sellVsRentData.inputs.remainingMortgageBalanceEur)})` : 'Debt-Free (100% Owned)'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Expected Monthly Rent</span>
                    <strong className="text-sm font-bold text-slate-900 font-mono">{formatEur(sellVsRentData.inputs.estimatedMonthlyRentEur)}/mo</strong>
                  </div>
                </div>
              </div>

              {/* Core Financial Comparison Breakdown */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  2. Side-by-Side Financial Comparison ({sellVsRentData.inputs.projectionHorizonYears}-Year Horizon)
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Sell Path */}
                  <div className="border border-slate-300 rounded-xl p-4 space-y-2 bg-slate-50">
                    <div className="font-bold text-xs text-slate-900 uppercase">Option A: Sell Now</div>
                    <div className="text-xl font-black text-slate-900 font-mono">{formatEur(sellVsRentData.result.netCashProceedsFromSaleEur)}</div>
                    <div className="text-[11px] text-slate-500">Liquid Cash Proceeds Today</div>
                    
                    <div className="pt-2 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Transfer Tax (Art. 111):</span>
                        <span className="font-mono text-rose-600">-{formatEur(sellVsRentData.result.transferTaxEur)}</span>
                      </div>
                      {sellVsRentData.inputs.hasExistingMortgage && (
                        <div className="flex justify-between">
                          <span>Mortgage Payoff:</span>
                          <span className="font-mono text-rose-600">-{formatEur(sellVsRentData.result.mortgagePayoffEur)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                        <span>{sellVsRentData.inputs.projectionHorizonYears}-Yr Reinvested Wealth:</span>
                        <span className="font-mono text-indigo-600">+{formatEur(sellVsRentData.result.selectedHorizonReinvestmentWealthEur)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rent Path */}
                  <div className="border border-slate-300 rounded-xl p-4 space-y-2 bg-slate-50">
                    <div className="font-bold text-xs text-slate-900 uppercase">Option B: Hold & Rent Long-Term</div>
                    <div className="text-xl font-black text-emerald-600 font-mono">
                      {sellVsRentData.result.monthlyNetRentalCashFlowEur >= 0 ? '+' : ''}{formatEur(sellVsRentData.result.monthlyNetRentalCashFlowEur)}/mo
                    </div>
                    <div className="text-[11px] text-slate-500">Net Monthly In-Pocket Cash Flow</div>

                    <div className="pt-2 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Gross Annual Rent:</span>
                        <span className="font-mono">{formatEur(sellVsRentData.result.annualGrossRentEur)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Taxes & Levies:</span>
                        <span className="font-mono text-rose-600">-{formatEur(sellVsRentData.result.annualTaxesAndExpensesEur)}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                        <span>{sellVsRentData.inputs.projectionHorizonYears}-Yr Cumulative Wealth:</span>
                        <span className="font-mono text-emerald-600">+{formatEur(sellVsRentData.result.selectedHorizonRentalWealthEur)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Multi-Year Wealth Schedule Table */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  3. Multi-Year Wealth Schedule
                </h3>
                <table className="w-full text-xs text-left border border-slate-200">
                  <thead className="bg-slate-100 border-b border-slate-200 text-[11px] text-slate-700 uppercase">
                    <tr>
                      <th className="p-2">Year</th>
                      <th className="p-2">Sell & Reinvest ({sellVsRentData.inputs.alternativeInvestmentReturnRatePercent}%)</th>
                      <th className="p-2">Hold & Rent ({sellVsRentData.inputs.propertyAppreciationRatePercent}% Apprec.)</th>
                      <th className="p-2">Property Value</th>
                      <th className="p-2">Remaining Debt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-slate-800">
                    {sellVsRentData.result.yearlyBreakdown.filter((p: YearlyWealthPoint) => [1, 2, 3, 5, 10, 15].includes(p.year)).map((pt: YearlyWealthPoint) => (
                      <tr key={pt.year} className={pt.year === sellVsRentData.inputs.projectionHorizonYears ? 'bg-indigo-50 font-bold' : ''}>
                        <td className="p-2 font-sans font-bold">Year {pt.year}</td>
                        <td className="p-2 text-indigo-600">{formatEur(pt.sellingWealth)}</td>
                        <td className="p-2 text-emerald-600">{formatEur(pt.rentingWealth)}</td>
                        <td className="p-2">{formatEur(pt.propertyValue)}</td>
                        <td className="p-2 text-slate-500">{formatEur(pt.remainingMortgage)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* REPORT TYPE 2: ROI & TAX ENGINE */}
          {type === 'roiCalculator' && roiData && (
            <div className="space-y-6">
              
              {/* Key Investment KPI Grid */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  1. Executive Investment Underwriting Summary
                </h3>
                <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Gross Yield</span>
                    <strong className="text-lg font-black text-slate-900 font-mono">{formatPercent(roiData.calc.grossYieldPercent)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Net Yield</span>
                    <strong className="text-lg font-black text-emerald-600 font-mono">{formatPercent(roiData.calc.netYieldPercent)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Cash-on-Cash</span>
                    <strong className="text-lg font-black text-indigo-600 font-mono">{formatPercent(roiData.calc.cashOnCashReturnPercent)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Monthly Cash Flow</span>
                    <strong className="text-lg font-black text-slate-900 font-mono">
                      {roiData.calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}{formatEur(roiData.calc.monthlyCashFlowAfterDebtEur)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Acquisition & Capital Breakdown */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  2. Acquisition & Financing Structure
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Purchase Price</span>
                    <strong className="font-mono text-slate-900">{formatEur(roiData.inputs.purchasePrice)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Down Payment</span>
                    <strong className="font-mono text-slate-900">{roiData.inputs.downPaymentPercent}% ({formatEur(roiData.calc.downPaymentEur)})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Loan Terms</span>
                    <strong className="font-mono text-slate-900">{roiData.inputs.loanTermYears} Yrs @ {roiData.inputs.interestRatePercent}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Acquisition Cost</span>
                    <strong className="font-mono text-slate-900">{formatEur(roiData.calc.totalAcquisitionCost)}</strong>
                  </div>
                </div>
              </div>

              {/* Romanian Fiscal Breakdown Schedule */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  3. Romanian Statutory Rental Tax Schedule (Law 227/2015 & OUG 115/2023)
                </h3>
                <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">10% Impozit pe Venit</span>
                    <strong className="text-slate-900 font-mono">{formatRon(roiData.calc.annualTaxesRon.rentalIncomeTaxRon)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Applied to 80% net rental base</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">CASS Sănătate (Tiers)</span>
                    <strong className="text-slate-900 font-mono">{formatRon(roiData.calc.annualTaxesRon.cassHealthTaxRon)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Statutory minimum wage tier</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Impozit Clădire Local</span>
                    <strong className="text-slate-900 font-mono">{formatRon(roiData.calc.annualTaxesRon.propertyTaxRon)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">0.1% local municipal rate</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Legal Compliance Footnote */}
          <div className="pt-6 border-t border-slate-300 text-[10px] text-slate-500 leading-relaxed space-y-1">
            <p>
              <strong>Disclaimer & Legal Basis:</strong> This audit report was generated automatically by ROImob based on user inputs and the provisions of the Romanian Fiscal Code (Law 227/2015 as amended by OUG 115/2023 and Law 296/2023). Values are modeled for institutional planning and decision support. Actual notary and cadastral registration fees may vary based on territorial chamber tariffs.
            </p>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2">
              <span>ROImob Intelligence Platform</span>
              <span>Generated on {currentDate}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
