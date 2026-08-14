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
  const { t, language } = useI18n();

  const currentDate = new Date().toLocaleDateString(
    language === 'ro' ? 'ro-RO' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'uk' ? 'uk-UA' : language === 'pt' ? 'pt-PT' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const reportId = `ROIMOB-${type === 'sellVsRent' ? 'SVR' : 'ROI'}-${Date.now().toString().slice(-6)}`;

  const handlePrint = () => {
    const printContent = document.getElementById('formal-report-print-sheet');
    if (!printContent) {
      window.print();
      return;
    }

    let printIframe = document.getElementById('roimob-print-frame') as HTMLIFrameElement;
    if (!printIframe) {
      printIframe = document.createElement('iframe');
      printIframe.id = 'roimob-print-frame';
      printIframe.style.position = 'fixed';
      printIframe.style.right = '0';
      printIframe.style.bottom = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.border = '0';
      document.body.appendChild(printIframe);
    }

    const doc = printIframe.contentWindow?.document;
    if (!doc) {
      window.print();
      return;
    }

    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${type === 'sellVsRent' ? t.report.titleSvr : t.report.titleRoi} - ROImob</title>
          <meta charset="utf-8" />
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background: #ffffff !important;
              color: #0f172a !important;
              padding: 24px;
              font-size: 11px;
              line-height: 1.45;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            .font-bold { font-weight: 700; }
            .font-black { font-weight: 900; }
            .uppercase { text-transform: uppercase; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-tight { letter-spacing: -0.025em; }
            
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .gap-3 { gap: 12px; }
            .gap-4 { gap: 16px; }
            
            .flex { display: flex; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .justify-between { justify-content: space-between; }
            
            .p-2 { padding: 8px; }
            .p-3 { padding: 12px; }
            .p-4 { padding: 16px; }
            .p-5 { padding: 20px; }
            .p-8 { padding: 24px; }
            .px-2 { padding-left: 8px; padding-right: 8px; }
            .py-0\\.5 { padding-top: 2px; padding-bottom: 2px; }
            .px-3 { padding-left: 12px; padding-right: 12px; }
            .py-1 { padding-top: 4px; padding-bottom: 4px; }
            .pb-1 { padding-bottom: 4px; }
            .pb-6 { padding-bottom: 20px; }
            .pt-1 { padding-top: 4px; }
            .pt-2 { padding-top: 8px; }
            .pt-6 { padding-top: 20px; }
            .mb-1 { margin-bottom: 4px; }
            .mb-2 { margin-bottom: 8px; }
            .ml-2 { margin-left: 8px; }
            
            .space-y-1 > * + * { margin-top: 4px; }
            .space-y-2 > * + * { margin-top: 8px; }
            .space-y-3 > * + * { margin-top: 12px; }
            .space-y-6 > * + * { margin-top: 20px; }
            .space-y-8 > * + * { margin-top: 24px; }
            
            .bg-white { background-color: #ffffff !important; }
            .bg-slate-50 { background-color: #f8fafc !important; }
            .bg-slate-100 { background-color: #f1f5f9 !important; }
            .bg-slate-900 { background-color: #0f172a !important; color: #ffffff !important; }
            .bg-indigo-50 { background-color: #eef2ff !important; }
            
            .text-slate-900 { color: #0f172a !important; }
            .text-slate-800 { color: #1e293b !important; }
            .text-slate-700 { color: #334155 !important; }
            .text-slate-600 { color: #475569 !important; }
            .text-slate-500 { color: #64748b !important; }
            .text-slate-400 { color: #94a3b8 !important; }
            .text-white { color: #ffffff !important; }
            .text-indigo-600 { color: #4f46e5 !important; }
            .text-emerald-600 { color: #059669 !important; }
            .text-rose-600 { color: #e11d48 !important; }
            
            .border { border: 1px solid #e2e8f0; }
            .border-2 { border: 2px solid #0f172a; }
            .border-b { border-bottom: 1px solid #cbd5e1; }
            .border-b-2 { border-bottom: 2px solid #0f172a; }
            .border-t { border-top: 1px solid #e2e8f0; }
            .border-slate-200 { border-color: #e2e8f0; }
            .border-slate-300 { border-color: #cbd5e1; }
            .border-slate-900 { border-color: #0f172a; }
            
            .rounded { border-radius: 4px; }
            .rounded-lg { border-radius: 8px; }
            .rounded-xl { border-radius: 12px; }
            .rounded-2xl { border-radius: 16px; }
            
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-xs { font-size: 11px; }
            .text-sm { font-size: 13px; }
            .text-lg { font-size: 16px; }
            .text-xl { font-size: 18px; }
            .text-2xl { font-size: 22px; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[11px\\] { font-size: 11px; }
            
            .w-8 { width: 32px; }
            .h-8 { height: 32px; }
            .w-full { width: 100%; }
            
            table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 10.5px; }
            th, td { padding: 6px 8px; text-align: left; }
            th { background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1; }
            td { border-bottom: 1px solid #e2e8f0; }
            
            @page { size: A4 portrait; margin: 8mm; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    doc.close();

    setTimeout(() => {
      printIframe.contentWindow?.focus();
      printIframe.contentWindow?.print();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      
      {/* Modal Container */}
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden text-slate-900">
        
        {/* Top Control Bar */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              {type === 'sellVsRent' ? t.report.titleSvr : t.report.titleRoi}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{t.report.printBtn}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Sheet */}
        <div id="formal-report-print-sheet" className="p-8 sm:p-12 space-y-8 bg-white text-slate-900">
          
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
                  {t.report.officialDossier}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {t.report.subtitle}
              </p>
            </div>

            <div className="text-right text-xs text-slate-600 space-y-1">
              <div><strong>{t.report.auditRef}</strong> <span className="font-mono">{reportId}</span></div>
              <div><strong>{t.report.dateOfIssue}</strong> {currentDate}</div>
              <div><strong>{t.report.fiscalFramework}</strong> Law 227/2015 & OUG 115/2023</div>
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
                    <span>{t.report.executiveRecommendation}</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-black uppercase tracking-wider">
                    {sellVsRentData.result.recommendedStrategy === 'RENT_LONG_TERM' 
                      ? t.sellVsRent.keepAndRentLongTerm
                      : sellVsRentData.result.recommendedStrategy === 'RENT_SHORT_TERM' 
                      ? t.sellVsRent.shortTermAirbnb
                      : t.sellVsRent.sellAndReinvest}
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
                  {t.report.section1Identity}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.estimatedValuation}</span>
                    <strong className="text-sm font-bold text-slate-900 font-mono">{formatEur(sellVsRentData.inputs.currentPropertyMarketValueEur)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.ownershipDuration}</span>
                    <strong className="text-sm font-bold text-slate-900">
                      {sellVsRentData.inputs.ownershipDurationYears > 3 ? `${t.sellVsRent.over3Years} (1%)` : `${t.sellVsRent.under3Years} (3%)`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.mortgageStatus}</span>
                    <strong className="text-sm font-bold text-slate-900">
                      {sellVsRentData.inputs.hasExistingMortgage ? `${t.sellVsRent.withDebt} (${formatEur(sellVsRentData.inputs.remainingMortgageBalanceEur)})` : t.sellVsRent.debtFree}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.expectedMonthlyRent}</span>
                    <strong className="text-sm font-bold text-slate-900 font-mono">{formatEur(sellVsRentData.inputs.estimatedMonthlyRentEur)}/mo</strong>
                  </div>
                </div>
              </div>

              {/* Core Financial Comparison Breakdown */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  {t.report.section2Comparison} ({sellVsRentData.inputs.projectionHorizonYears} {t.sellVsRent.yearsPlural})
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Sell Path */}
                  <div className="border border-slate-300 rounded-xl p-4 space-y-2 bg-slate-50">
                    <div className="font-bold text-xs text-slate-900 uppercase">{t.report.optionASell}</div>
                    <div className="text-xl font-black text-slate-900 font-mono">{formatEur(sellVsRentData.result.netCashProceedsFromSaleEur)}</div>
                    <div className="text-[11px] text-slate-500">{t.report.liquidProceedsToday}</div>
                    
                    <div className="pt-2 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>{t.report.transferTaxArt111}</span>
                        <span className="font-mono text-rose-600">-{formatEur(sellVsRentData.result.transferTaxEur)}</span>
                      </div>
                      {sellVsRentData.inputs.hasExistingMortgage && (
                        <div className="flex justify-between">
                          <span>{t.report.mortgagePayoff}</span>
                          <span className="font-mono text-rose-600">-{formatEur(sellVsRentData.result.mortgagePayoffEur)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                        <span>{t.report.horizonWealth}</span>
                        <span className="font-mono text-indigo-600">+{formatEur(sellVsRentData.result.selectedHorizonReinvestmentWealthEur)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rent Path */}
                  <div className="border border-slate-300 rounded-xl p-4 space-y-2 bg-slate-50">
                    <div className="font-bold text-xs text-slate-900 uppercase">{t.report.optionBHoldRent}</div>
                    <div className="text-xl font-black text-emerald-600 font-mono">
                      {sellVsRentData.result.monthlyNetRentalCashFlowEur >= 0 ? '+' : ''}{formatEur(sellVsRentData.result.monthlyNetRentalCashFlowEur)}/mo
                    </div>
                    <div className="text-[11px] text-slate-500">{t.report.netMonthlyCashFlow}</div>

                    <div className="pt-2 border-t border-slate-200 space-y-1 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>{t.report.grossAnnualRent}</span>
                        <span className="font-mono">{formatEur(sellVsRentData.result.annualGrossRentEur)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{t.report.annualTaxesExpenses}</span>
                        <span className="font-mono text-rose-600">-{formatEur(sellVsRentData.result.annualTaxesAndExpensesEur)}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-slate-900">
                        <span>{t.report.horizonWealth}</span>
                        <span className="font-mono text-emerald-600">+{formatEur(sellVsRentData.result.selectedHorizonRentalWealthEur)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Multi-Year Wealth Schedule Table */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  {t.report.section3Schedule}
                </h3>
                <table className="w-full text-xs text-left border border-slate-200">
                  <thead className="bg-slate-100 border-b border-slate-200 text-[11px] text-slate-700 uppercase">
                    <tr>
                      <th className="p-2">{t.report.tableHeaders.year}</th>
                      <th className="p-2">{t.report.tableHeaders.sellAndReinvest} ({sellVsRentData.inputs.alternativeInvestmentReturnRatePercent}%)</th>
                      <th className="p-2">{t.report.tableHeaders.holdAndRent} ({sellVsRentData.inputs.propertyAppreciationRatePercent}%)</th>
                      <th className="p-2">{t.report.tableHeaders.propertyValue}</th>
                      <th className="p-2">{t.report.tableHeaders.remainingDebt}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-slate-800">
                    {sellVsRentData.result.yearlyBreakdown.filter((p: YearlyWealthPoint) => [1, 2, 3, 5, 10, 15].includes(p.year)).map((pt: YearlyWealthPoint) => (
                      <tr key={pt.year} className={pt.year === sellVsRentData.inputs.projectionHorizonYears ? 'bg-indigo-50 font-bold' : ''}>
                        <td className="p-2 font-sans font-bold">{t.sellVsRent.yearSingle} {pt.year}</td>
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
                  {t.report.roiSection1Summary}
                </h3>
                <div className="grid grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">{t.report.roiGrossYield}</span>
                    <strong className="text-lg font-black text-slate-900 font-mono">{formatPercent(roiData.calc.grossYieldPercent)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">{t.report.roiNetYield}</span>
                    <strong className="text-lg font-black text-emerald-600 font-mono">{formatPercent(roiData.calc.netYieldPercent)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">{t.report.roiCashOnCash}</span>
                    <strong className="text-lg font-black text-indigo-600 font-mono">{formatPercent(roiData.calc.cashOnCashReturnPercent)}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">{t.report.roiMonthlyCash}</span>
                    <strong className="text-lg font-black text-slate-900 font-mono">
                      {roiData.calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}{formatEur(roiData.calc.monthlyCashFlowAfterDebtEur)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Acquisition & Capital Breakdown */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  {t.report.roiSection2Acquisition}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.roiPurchasePrice}</span>
                    <strong className="font-mono text-slate-900">{formatEur(roiData.inputs.purchasePrice)}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.roiDownPayment}</span>
                    <strong className="font-mono text-slate-900">{roiData.inputs.downPaymentPercent}% ({formatEur(roiData.calc.downPaymentEur)})</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.roiLoanTerms}</span>
                    <strong className="font-mono text-slate-900">{roiData.inputs.loanTermYears} Yrs @ {roiData.inputs.interestRatePercent}%</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.roiTotalAcquisition}</span>
                    <strong className="font-mono text-slate-900">{formatEur(roiData.calc.totalAcquisitionCost)}</strong>
                  </div>
                </div>
              </div>

              {/* Romanian Fiscal Breakdown Schedule */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 border-b border-slate-300 pb-1">
                  {t.report.roiSection3Taxes}
                </h3>
                <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.roiIncomeTaxTitle}</span>
                    <strong className="text-slate-900 font-mono">{formatRon(roiData.calc.annualTaxesRon.rentalIncomeTaxRon)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{t.report.roiIncomeTaxDesc}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.roiCassTitle}</span>
                    <strong className="text-slate-900 font-mono">{formatRon(roiData.calc.annualTaxesRon.cassHealthTaxRon)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{t.report.roiCassDesc}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">{t.report.roiLocalTaxTitle}</span>
                    <strong className="text-slate-900 font-mono">{formatRon(roiData.calc.annualTaxesRon.propertyTaxRon)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{t.report.roiLocalTaxDesc}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Legal Compliance Footnote */}
          <div className="pt-6 border-t border-slate-300 text-[10px] text-slate-500 leading-relaxed space-y-1">
            <p>
              <strong>{t.report.disclaimerTitle}</strong> {t.report.disclaimerText}
            </p>
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-2">
              <span>{t.report.generatedPlatform}</span>
              <span>{t.report.dateOfIssue} {currentDate}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
