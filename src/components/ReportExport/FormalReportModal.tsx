import React from 'react';
import { 
  SellVsRentInputs, 
  SellVsRentResult, 
  FinancialCalculationResult, 
  ROITaxSettings,
  YearlyWealthPoint
} from '../../types';
import { formatPercent } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { useCurrency } from '../../currency';
import { 
  Building2, 
  Printer, 
  X, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Award,
  Scale,
  Calculator,
  Landmark,
  AlertTriangle,
  TrendingUp,
  PieChart,
  BarChart3,
  Calendar
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

/**
 * High-Resolution Printable SVG Chart for Sell vs. Rent Wealth Trajectory
 */
const DossierWealthChart: React.FC<{
  data: YearlyWealthPoint[];
  selectedHorizon: number;
  formatMoney: (v: number) => string;
}> = ({ data, selectedHorizon, formatMoney }) => {
  const width = 680;
  const height = 210;
  const padLeft = 65;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxVal = Math.max(
    ...data.map((d) => Math.max(d.sellingWealth, d.rentingWealth, d.shortTermWealth || 0, d.propertyValue)),
    100000
  );

  const getX = (year: number) => padLeft + (year / 15) * chartW;
  const getY = (val: number) => padTop + chartH - (val / maxVal) * chartH;

  const rentPoints = data.map((d) => `${getX(d.year)},${getY(d.rentingWealth)}`).join(' ');
  const sellPoints = data.map((d) => `${getX(d.year)},${getY(d.sellingWealth)}`).join(' ');
  const airbnbPoints = data.map((d) => `${getX(d.year)},${getY(d.shortTermWealth || 0)}`).join(' ');

  const rentArea = `${getX(0)},${padTop + chartH} ${rentPoints} ${getX(15)},${padTop + chartH}`;
  const sellArea = `${getX(0)},${padTop + chartH} ${sellPoints} ${getX(15)},${padTop + chartH}`;

  const yTicks = [0, maxVal * 0.33, maxVal * 0.66, maxVal];
  const xYears = [1, 3, 5, 7, 10, 12, 15];

  return (
    <div className="w-full bg-slate-50 p-3.5 rounded-2xl border border-slate-300 page-break-inside-avoid my-2">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
            15-Year Projected Capital Trajectory Graph
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
            Hold & Rent
          </span>
          <span className="flex items-center gap-1 text-indigo-600">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
            Sell & Reinvest
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            Airbnb Short-Term
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="dossierRentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="dossierSellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Horizontal Gridlines */}
        {yTicks.map((yVal, idx) => {
          const yPos = getY(yVal);
          return (
            <g key={idx}>
              <line x1={padLeft} y1={yPos} x2={width - padRight} y2={yPos} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x={padLeft - 8} y={yPos + 3} textAnchor="end" fontSize="9" fill="#64748b" fontFamily="monospace">
                {formatMoney(Math.round(yVal))}
              </text>
            </g>
          );
        })}

        {/* Vertical Gridlines & X Labels */}
        {xYears.map((yr) => {
          const xPos = getX(yr);
          return (
            <g key={yr}>
              <line x1={xPos} y1={padTop} x2={xPos} y2={padTop + chartH} stroke="#f1f5f9" />
              <text x={xPos} y={padTop + chartH + 15} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748b">
                Yr {yr}
              </text>
            </g>
          );
        })}

        {/* Area Fills */}
        <polygon points={rentArea} fill="url(#dossierRentGrad)" />
        <polygon points={sellArea} fill="url(#dossierSellGrad)" />

        {/* Lines */}
        <polyline points={sellPoints} fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
        <polyline points={rentPoints} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        <polyline points={airbnbPoints} fill="none" stroke="#d97706" strokeWidth="1.8" strokeDasharray="4 2" strokeLinecap="round" />

        {/* Horizon Marker Line */}
        {selectedHorizon && (
          <line
            x1={getX(selectedHorizon)}
            y1={padTop}
            x2={getX(selectedHorizon)}
            y2={padTop + chartH}
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        )}
      </svg>
    </div>
  );
};

/**
 * High-Resolution Printable SVG Chart for 10-Year Equity & Outflow Breakdown
 */
const DossierROIChart: React.FC<{
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  loanTerm: number;
  annualTaxes: number;
  annualDebt: number;
  annualOpex: number;
  formatMoney: (v: number) => string;
}> = ({
  purchasePrice,
  downPayment,
  loanAmount,
  loanTerm,
  annualTaxes,
  annualDebt,
  annualOpex,
  formatMoney
}) => {
  const width = 680;
  const height = 180;
  const padLeft = 60;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 30;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const maxEquity = purchasePrice * Math.pow(1.035, 10);

  const totalOutflows = annualDebt + annualTaxes + annualOpex;
  const debtPct = totalOutflows > 0 ? (annualDebt / totalOutflows) * 100 : 0;
  const taxPct = totalOutflows > 0 ? (annualTaxes / totalOutflows) * 100 : 0;
  const opexPct = totalOutflows > 0 ? (annualOpex / totalOutflows) * 100 : 0;

  return (
    <div className="w-full bg-slate-50 p-3.5 rounded-2xl border border-slate-300 page-break-inside-avoid my-2">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
            10-Year Net Built Equity Progression & Outflow Structure
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-500">
          +3.5% Compounding Appreciation
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Y Gridlines */}
        {[0, maxEquity * 0.5, maxEquity].map((yVal, idx) => {
          const yPos = padTop + chartH - (yVal / maxEquity) * chartH;
          return (
            <g key={idx}>
              <line x1={padLeft} y1={yPos} x2={width - padRight} y2={yPos} stroke="#e2e8f0" strokeDasharray="3 3" />
              <text x={padLeft - 6} y={yPos + 3} textAnchor="end" fontSize="9" fill="#64748b" fontFamily="monospace">
                {formatMoney(Math.round(yVal))}
              </text>
            </g>
          );
        })}

        {/* Equity Column Bars */}
        {years.map((yr, idx) => {
          const propVal = purchasePrice * Math.pow(1.035, yr);
          const principalPaid = (loanAmount / loanTerm) * yr * 0.85;
          const equity = downPayment + principalPaid + (propVal - purchasePrice);

          const barW = (chartW / years.length) * 0.55;
          const xPos = padLeft + idx * (chartW / years.length) + 12;
          const barH = (equity / maxEquity) * chartH;
          const yPos = padTop + chartH - barH;

          return (
            <g key={yr}>
              <rect
                x={xPos}
                y={yPos}
                width={barW}
                height={barH}
                fill="#059669"
                rx="3"
              />
              <text
                x={xPos + barW / 2}
                y={padTop + chartH + 15}
                textAnchor="middle"
                fontSize="9"
                fontWeight="bold"
                fill="#64748b"
              >
                Yr {yr}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Proportional Outflow Distribution Bar */}
      <div className="mt-3 pt-2 border-t border-slate-200 text-xs">
        <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-600 uppercase">
          <span>Annual Operational Outflow Allocation:</span>
          <span>Total: {formatMoney(totalOutflows)} / yr</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-200">
          <div style={{ width: `${debtPct}%` }} className="bg-indigo-600" title="Debt Service" />
          <div style={{ width: `${taxPct}%` }} className="bg-rose-500" title="Romanian Taxes" />
          <div style={{ width: `${opexPct}%` }} className="bg-slate-500" title="Maintenance & Insurance" />
        </div>
        <div className="flex items-center justify-between text-[10px] pt-1 text-slate-500 font-bold">
          <span className="flex items-center gap-1 text-indigo-700">
            <span className="w-2 h-2 rounded bg-indigo-600 inline-block" />
            Bank Debt Service ({debtPct.toFixed(0)}% • {formatMoney(annualDebt)})
          </span>
          <span className="flex items-center gap-1 text-rose-700">
            <span className="w-2 h-2 rounded bg-rose-500 inline-block" />
            Romanian Taxes ({taxPct.toFixed(0)}% • {formatMoney(annualTaxes)})
          </span>
          <span className="flex items-center gap-1 text-slate-700">
            <span className="w-2 h-2 rounded bg-slate-500 inline-block" />
            Opex & Reserves ({opexPct.toFixed(0)}% • {formatMoney(annualOpex)})
          </span>
        </div>
      </div>
    </div>
  );
};

export const FormalReportModal: React.FC<Props> = ({
  type,
  sellVsRentData,
  roiData,
  onClose
}) => {
  const { t, language } = useI18n();
  const { formatMoney, formatMoneyDual, currency } = useCurrency();

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
              font-size: 11px;
              line-height: 1.45;
              padding: 24px;
            }
            .font-bold { font-weight: 700; }
            .font-black { font-weight: 900; }
            .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .uppercase { text-transform: uppercase; }
            .tracking-wider { letter-spacing: 0.05em; }
            
            .flex { display: flex; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            .justify-between { justify-content: space-between; }
            .justify-center { justify-content: center; }
            .gap-1 { gap: 4px; }
            .gap-1\\.5 { gap: 6px; }
            .gap-2 { gap: 8px; }
            .gap-3 { gap: 12px; }
            .gap-4 { gap: 16px; }
            .gap-6 { gap: 24px; }
            
            .grid { display: grid; }
            .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            
            .p-2 { padding: 8px; }
            .p-2\\.5 { padding: 10px; }
            .p-3 { padding: 12px; }
            .p-3\\.5 { padding: 14px; }
            .p-4 { padding: 16px; }
            .p-5 { padding: 20px; }
            .p-6 { padding: 24px; }
            .px-2 { padding-left: 8px; padding-right: 8px; }
            .px-2\\.5 { padding-left: 10px; padding-right: 10px; }
            .px-3 { padding-left: 12px; padding-right: 12px; }
            .py-0\\.5 { padding-top: 2px; padding-bottom: 2px; }
            .py-1 { padding-top: 4px; padding-bottom: 4px; }
            .py-2 { padding-top: 8px; padding-bottom: 8px; }
            .pb-1 { padding-bottom: 4px; }
            .pb-2 { padding-bottom: 8px; }
            .pb-4 { padding-bottom: 16px; }
            .pb-6 { padding-bottom: 24px; }
            .pt-1 { padding-top: 4px; }
            .pt-2 { padding-top: 8px; }
            .pt-4 { padding-top: 16px; }
            .pt-6 { padding-top: 24px; }
            .mb-1 { margin-bottom: 4px; }
            .mb-2 { margin-bottom: 8px; }
            .my-2 { margin-top: 8px; margin-bottom: 8px; }
            
            .space-y-1 > * + * { margin-top: 4px; }
            .space-y-1\\.5 > * + * { margin-top: 6px; }
            .space-y-2 > * + * { margin-top: 8px; }
            .space-y-3 > * + * { margin-top: 12px; }
            .space-y-4 > * + * { margin-top: 16px; }
            .space-y-6 > * + * { margin-top: 24px; }
            
            .bg-white { background-color: #ffffff !important; }
            .bg-slate-50 { background-color: #f8fafc !important; }
            .bg-slate-100 { background-color: #f1f5f9 !important; }
            .bg-slate-200 { background-color: #e2e8f0 !important; }
            .bg-slate-900 { background-color: #0f172a !important; color: #ffffff !important; }
            .bg-emerald-50 { background-color: #ecfdf5 !important; }
            .bg-emerald-100 { background-color: #d1fae5 !important; }
            .bg-emerald-600 { background-color: #059669 !important; color: #ffffff !important; }
            .bg-indigo-50 { background-color: #eef2ff !important; }
            .bg-indigo-100 { background-color: #e0e7ff !important; }
            .bg-indigo-600 { background-color: #4f46e5 !important; color: #ffffff !important; }
            .bg-amber-50 { background-color: #fffbeb !important; }
            .bg-rose-50 { background-color: #fff1f2 !important; }
            
            .text-slate-900 { color: #0f172a !important; }
            .text-slate-800 { color: #1e293b !important; }
            .text-slate-700 { color: #334155 !important; }
            .text-slate-600 { color: #475569 !important; }
            .text-slate-500 { color: #64748b !important; }
            .text-slate-400 { color: #94a3b8 !important; }
            .text-white { color: #ffffff !important; }
            .text-indigo-600 { color: #4f46e5 !important; }
            .text-indigo-700 { color: #4338ca !important; }
            .text-emerald-600 { color: #059669 !important; }
            .text-emerald-700 { color: #047857 !important; }
            .text-emerald-800 { color: #065f46 !important; }
            .text-amber-600 { color: #d97706 !important; }
            .text-amber-700 { color: #b45309 !important; }
            .text-rose-600 { color: #e11d48 !important; }
            .text-rose-700 { color: #be123c !important; }
            
            .border { border: 1px solid #e2e8f0; }
            .border-2 { border: 2px solid #0f172a; }
            .border-l-4 { border-left-width: 4px; }
            .border-b { border-bottom: 1px solid #cbd5e1; }
            .border-b-2 { border-bottom: 2px solid #0f172a; }
            .border-t { border-top: 1px solid #e2e8f0; }
            .border-slate-200 { border-color: #e2e8f0; }
            .border-slate-300 { border-color: #cbd5e1; }
            .border-slate-900 { border-color: #0f172a; }
            .border-emerald-300 { border-color: #a7f3d0; }
            .border-indigo-600 { border-color: #4f46e5; }
            
            .rounded { border-radius: 4px; }
            .rounded-lg { border-radius: 8px; }
            .rounded-xl { border-radius: 12px; }
            .rounded-2xl { border-radius: 16px; }
            .rounded-3xl { border-radius: 24px; }
            .rounded-full { border-radius: 9999px; }
            
            .text-center { text-align: center; }
            .text-right { text-align: right; }
            .text-xs { font-size: 11px; }
            .text-sm { font-size: 12.5px; }
            .text-base { font-size: 14px; }
            .text-lg { font-size: 16px; }
            .text-xl { font-size: 18px; }
            .text-2xl { font-size: 22px; }
            .text-\\[9px\\] { font-size: 9px; }
            .text-\\[10px\\] { font-size: 10px; }
            .text-\\[11px\\] { font-size: 11px; }
            
            .w-full { width: 100%; }
            .h-auto { height: auto; }
            .w-2 { width: 8px; }
            .h-2 { height: 8px; }
            .w-2\\.5 { width: 10px; }
            .h-2\\.5 { height: 10px; }
            .w-3 { width: 12px; }
            .h-3 { height: 12px; }
            .w-4 { width: 16px; }
            .h-4 { height: 16px; }
            .w-5 { width: 20px; }
            .h-5 { height: 20px; }
            .w-8 { width: 32px; }
            .h-8 { height: 32px; }
            .h-3 { height: 12px; }
            .inline-block { display: inline-block; }
            .overflow-hidden { overflow: hidden; }
            
            table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 10px; }
            th, td { padding: 5px 8px; text-align: left; }
            th { background-color: #f1f5f9; border-bottom: 2px solid #cbd5e1; color: #1e293b; font-weight: 700; }
            td { border-bottom: 1px solid #e2e8f0; }
            tr:nth-child(even) { background-color: #f8fafc; }
            
            .page-break-inside-avoid { page-break-inside: avoid; }
            
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
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden text-slate-900">
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 bg-slate-950 p-3 sm:p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-brand-400 shrink-0" />
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate max-w-[180px] sm:max-w-none">
              {type === 'sellVsRent' ? t.report.titleSvr : t.report.titleRoi}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 sm:px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t.report.printBtn}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formal Printable Document Sheet */}
        <div id="formal-report-print-sheet" className="p-4 sm:p-8 sm:p-12 space-y-6 bg-white text-slate-900 overflow-y-auto flex-1 font-sans">
          
          {/* 1. Formal Dossier Letterhead & Security Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 pb-4 sm:pb-6 border-b-2 border-slate-900">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-sm">
                  ROI
                </div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  ROImob <span className="text-indigo-600">Institutional Intelligence</span>
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.report.officialDossier} • Real Estate Financial Audit & Valuation
              </p>
              <p className="text-[11px] text-slate-400">
                Statutory Romanian Fiscal Code (Law nr. 227/2015, OUG nr. 115/2023 & BNR IRCC)
              </p>
            </div>

            <div className="text-right sm:text-right space-y-1 text-xs">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-300 text-emerald-700 font-bold rounded-lg text-[10px] uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                <span>Verified Compliance • Law 227/2015</span>
              </div>
              <div className="text-slate-500 font-mono text-[11px] pt-1">
                <strong>{t.report.auditRef}</strong> {reportId}
              </div>
              <div className="text-slate-500 text-[11px]">
                <strong>{t.report.dateOfIssue}</strong> {currentDate}
              </div>
              <div className="text-slate-500 text-[11px]">
                <strong>Reporting Currency:</strong> {currency} (BNR Reference 1 EUR = 4.975 RON)
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SELL VS RENT OPTIMIZER DOSSIER */}
          {/* ========================================================================= */}
          {type === 'sellVsRent' && sellVsRentData && (
            <div className="space-y-5">
              
              {/* Executive Strategic Recommendation Banner */}
              <div className="p-4 rounded-2xl border-l-4 border-indigo-600 bg-indigo-50/70 space-y-2 page-break-inside-avoid shadow-sm border-t border-r border-b border-indigo-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-700">
                      {t.report.executiveRecommendation} ({sellVsRentData.inputs.projectionHorizonYears} {t.sellVsRent.yearsPlural} Horizon)
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-indigo-600 text-white tracking-wide">
                    {sellVsRentData.result.recommendedStrategy === 'RENT_LONG_TERM' 
                      ? t.sellVsRent.keepAndRentLongTerm
                      : sellVsRentData.result.recommendedStrategy === 'RENT_SHORT_TERM'
                      ? t.sellVsRent.shortTermAirbnb
                      : t.sellVsRent.sellAndReinvest}
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-800 leading-snug">
                  {sellVsRentData.result.verdictSummary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-indigo-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Recommended Horizon Wealth:</span>
                    <strong className="text-indigo-700 font-mono text-sm">
                      {formatMoney(
                        sellVsRentData.result.recommendedStrategy === 'RENT_LONG_TERM'
                          ? sellVsRentData.result.selectedHorizonRentalWealthEur
                          : sellVsRentData.result.recommendedStrategy === 'RENT_SHORT_TERM'
                          ? (sellVsRentData.result.yearlyBreakdown.find((p) => p.year === sellVsRentData.inputs.projectionHorizonYears)?.shortTermWealth ?? 0)
                          : sellVsRentData.result.selectedHorizonReinvestmentWealthEur
                      )}
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Alternative Liquid Exit:</span>
                    <strong className="text-slate-700 font-mono text-sm">
                      {formatMoney(sellVsRentData.result.selectedHorizonReinvestmentWealthEur)}
                    </strong>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Net Horizon Capital Delta:</span>
                    <strong className="text-emerald-700 font-mono text-sm">
                      +{formatMoney(Math.abs(sellVsRentData.result.wealthDifferenceAtHorizonEur))}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Section 1: Property Identity & Parameters */}
              <div className="space-y-1.5 page-break-inside-avoid">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.report.section1Identity} & Initial Asset Profile</span>
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.estimatedValuation}</span>
                    <strong className="text-slate-900 text-sm font-mono">{formatMoneyDual(sellVsRentData.inputs.currentPropertyMarketValueEur)}</strong>
                    <span className="text-[10px] text-slate-400 block">{formatPercent(sellVsRentData.inputs.propertyAppreciationRatePercent)} appreciation</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.ownershipDuration}</span>
                    <strong className="text-slate-900 text-sm font-mono">
                      {sellVsRentData.inputs.ownershipDurationYears > 3 ? t.sellVsRent.over3Years : t.sellVsRent.under3Years}
                    </strong>
                    <span className="text-[10px] text-slate-500 block">Art. 111: {sellVsRentData.result.transferTaxRatePercent}% tax</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.mortgageStatus}</span>
                    <strong className="text-slate-900 text-sm font-mono">
                      {sellVsRentData.inputs.hasExistingMortgage ? formatMoney(sellVsRentData.inputs.remainingMortgageBalanceEur) : t.sellVsRent.debtFree}
                    </strong>
                    {sellVsRentData.inputs.hasExistingMortgage && (
                      <span className="text-[10px] text-slate-500 block">{formatMoney(sellVsRentData.inputs.monthlyMortgagePaymentEur)}/mo</span>
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.expectedMonthlyRent}</span>
                    <strong className="text-slate-900 text-sm font-mono">{formatMoney(sellVsRentData.inputs.estimatedMonthlyRentEur)}/mo</strong>
                    <span className="text-[10px] text-emerald-600 block">Gross Yield: {((sellVsRentData.inputs.estimatedMonthlyRentEur * 12 / sellVsRentData.inputs.currentPropertyMarketValueEur) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* EMBEDDED VISUAL GRAPH 1: 15-Year Wealth Trajectory */}
              <DossierWealthChart
                data={sellVsRentData.result.yearlyBreakdown}
                selectedHorizon={sellVsRentData.inputs.projectionHorizonYears}
                formatMoney={formatMoney}
              />

              {/* Section 2: Comparative Decision Matrix */}
              <div className="space-y-1.5 page-break-inside-avoid">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.report.section2Comparison} & Transaction Breakdown</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  
                  {/* Strategy A */}
                  <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50/70 space-y-2">
                    <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                      <span className="font-black text-slate-800 uppercase">{t.report.optionASell}</span>
                      <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded font-bold">Liquid Exit</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Gross Sale Market Price:</span>
                        <span className="font-mono text-slate-900 font-bold">{formatMoney(sellVsRentData.inputs.currentPropertyMarketValueEur)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.report.transferTaxArt111}:</span>
                        <span className="font-mono text-rose-600 font-bold">-{formatMoney(sellVsRentData.result.transferTaxEur)} ({sellVsRentData.result.transferTaxRatePercent}%)</span>
                      </div>
                      {sellVsRentData.inputs.hasExistingMortgage && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">{t.report.mortgagePayoff}:</span>
                          <span className="font-mono text-rose-600 font-bold">-{formatMoney(sellVsRentData.result.mortgagePayoffEur)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-slate-500">Brokerage & Staging:</span>
                        <span className="font-mono text-rose-600 font-bold">-{formatMoney((sellVsRentData.inputs.currentPropertyMarketValueEur * sellVsRentData.inputs.realEstateAgentCommissionPercent / 100) + sellVsRentData.inputs.sellingPreparationCostEur)}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                        <span className="text-slate-800">{t.report.liquidProceedsToday}:</span>
                        <span className="font-mono text-slate-900 text-sm">{formatMoneyDual(sellVsRentData.result.netCashProceedsFromSaleEur)}</span>
                      </div>
                      <div className="flex justify-between pt-1 text-slate-600">
                        <span>{sellVsRentData.inputs.projectionHorizonYears}-Yr Wealth ({sellVsRentData.inputs.alternativeInvestmentReturnRatePercent}% Benchmark):</span>
                        <span className="font-mono font-bold text-indigo-600">{formatMoney(sellVsRentData.result.selectedHorizonReinvestmentWealthEur)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Strategy B */}
                  <div className="p-3.5 rounded-xl border border-slate-300 bg-slate-50/70 space-y-2">
                    <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                      <span className="font-black text-slate-800 uppercase">{t.report.optionBHoldRent}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Cash Flowing</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.report.grossAnnualRent}:</span>
                        <span className="font-mono text-slate-900 font-bold">{formatMoney(sellVsRentData.inputs.estimatedMonthlyRentEur * 12)}/yr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Romanian Tax (8% eff.):</span>
                        <span className="font-mono text-rose-600 font-bold">-{formatMoney(sellVsRentData.inputs.estimatedMonthlyRentEur * 12 * 0.08)}/yr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Operating Expenses:</span>
                        <span className="font-mono text-rose-600 font-bold">-{formatMoney(sellVsRentData.inputs.monthlyOperatingExpensesEur * 12)}/yr</span>
                      </div>
                      {sellVsRentData.inputs.hasExistingMortgage && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Annual Debt Service:</span>
                          <span className="font-mono text-rose-600 font-bold">-{formatMoney(sellVsRentData.inputs.monthlyMortgagePaymentEur * 12)}/yr</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                        <span className="text-slate-800">{t.report.netMonthlyCashFlow}:</span>
                        <span className="font-mono text-emerald-700 text-sm">+{formatMoney(sellVsRentData.result.monthlyNetRentalCashFlowEur)}/mo</span>
                      </div>
                      <div className="flex justify-between pt-1 text-slate-600">
                        <span>{sellVsRentData.inputs.projectionHorizonYears}-Yr Cumulative Wealth ({sellVsRentData.inputs.propertyAppreciationRatePercent}% app.):</span>
                        <span className="font-mono font-bold text-emerald-700">{formatMoney(sellVsRentData.result.selectedHorizonRentalWealthEur)}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Section 3: Tax Regime Comparison Grid */}
              <div className="space-y-1.5 page-break-inside-avoid">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-slate-600" />
                  <span>Romanian Fiscal Code Tax Regime Benchmarking</span>
                </h3>

                <table>
                  <thead>
                    <tr>
                      <th>Fiscal Regime</th>
                      <th>Statutory Base</th>
                      <th>Effective Rate</th>
                      <th>CASS Health Tier</th>
                      <th>ANAF Compliance Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-bold">Persoană Fizică (Cota Forfetară)</td>
                      <td>20% Deductible Quota (OUG 115/2023)</td>
                      <td className="font-mono text-indigo-600 font-bold">8.0% Net</td>
                      <td>6 / 12 / 24 gross minimum wages</td>
                      <td className="text-emerald-700 font-bold">100% Compliant (Declarația Unică)</td>
                    </tr>
                    <tr>
                      <td className="font-bold">Persoană Fizică (Sistem Real)</td>
                      <td>Actual Documented Expenses</td>
                      <td className="font-mono text-slate-700">10.0% on Net Profit</td>
                      <td>Subject to annual net profit</td>
                      <td className="text-slate-700">Compliant with bookkeeping</td>
                    </tr>
                    <tr>
                      <td className="font-bold">SRL Microîntreprindere</td>
                      <td>1% Turnover + 8% Dividend Tax</td>
                      <td className="font-mono text-slate-700">~8.9% Effective</td>
                      <td>CASS on dividend distributions</td>
                      <td className="text-slate-700">Commercial entity setup required</td>
                    </tr>
                    <tr className="bg-rose-50">
                      <td className="font-bold text-rose-700">Informal / Nedeclarat</td>
                      <td>Zero official declaration</td>
                      <td className="font-mono text-rose-600 font-bold">0.0% Initial</td>
                      <td>0 RON (Non-declared)</td>
                      <td className="text-rose-700 font-bold">Severe Risk (Law 241/2005 penalties)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Section 4: 15-Year Wealth Trajectory Schedule Table */}
              <div className="space-y-1.5 page-break-inside-avoid">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  {t.report.section3Schedule} (15-Year Multi-Scenario Progression)
                </h3>

                <table>
                  <thead>
                    <tr>
                      <th>{t.report.tableHeaders.year}</th>
                      <th>{t.report.tableHeaders.sellAndReinvest} ({sellVsRentData.inputs.alternativeInvestmentReturnRatePercent}%)</th>
                      <th>{t.report.tableHeaders.holdAndRent} ({sellVsRentData.inputs.propertyAppreciationRatePercent}%)</th>
                      <th>Airbnb / Short-Term</th>
                      <th>{t.report.tableHeaders.propertyValue}</th>
                      {sellVsRentData.inputs.hasExistingMortgage && <th>{t.report.tableHeaders.remainingDebt}</th>}
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {sellVsRentData.result.yearlyBreakdown.filter((p) => [1, 2, 3, 5, 7, 10, 12, 15].includes(p.year)).map((row) => (
                      <tr key={row.year} className={row.year === sellVsRentData.inputs.projectionHorizonYears ? 'bg-indigo-50 font-bold' : ''}>
                        <td className="font-sans font-bold">Year {row.year}</td>
                        <td className="text-indigo-600 font-bold">{formatMoney(row.sellingWealth)}</td>
                        <td className="text-emerald-700 font-bold">{formatMoney(row.rentingWealth)}</td>
                        <td className="text-amber-700">{formatMoney(row.shortTermWealth ?? 0)}</td>
                        <td className="text-slate-600">{formatMoney(row.propertyValue)}</td>
                        {sellVsRentData.inputs.hasExistingMortgage && <td className="text-rose-600">{formatMoney(row.remainingMortgage)}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* REAL ESTATE ROI & TAX ENGINE DOSSIER */}
          {/* ========================================================================= */}
          {type === 'roiCalculator' && roiData && (
            <div className="space-y-5">
              
              {/* Executive KPI Performance Scorecard */}
              <div className="p-4 rounded-2xl border-l-4 border-emerald-600 bg-emerald-50/60 space-y-3 page-break-inside-avoid shadow-sm border-t border-r border-b border-emerald-200">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
                    {t.report.roiSection1Summary} • Institutional Metric Scorecard
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">
                    10-Year Horizon Analysis
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-xs">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">{t.report.roiGrossYield}</span>
                    <strong className="text-lg font-black text-slate-900 font-mono">{formatPercent(roiData.calc.grossYieldPercent)}</strong>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-xs">
                    <span className="text-[10px] text-emerald-700 font-bold uppercase block">{t.report.roiNetYield}</span>
                    <strong className="text-lg font-black text-emerald-700 font-mono">{formatPercent(roiData.calc.netYieldPercent)}</strong>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-xs">
                    <span className="text-[10px] text-indigo-600 font-bold uppercase block">{t.report.roiCashOnCash}</span>
                    <strong className="text-lg font-black text-indigo-600 font-mono">{formatPercent(roiData.calc.cashOnCashReturnPercent)}</strong>
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-emerald-200 shadow-xs">
                    <span className="text-[10px] text-amber-700 font-bold uppercase block">{t.report.roiMonthlyCash}</span>
                    <strong className="text-lg font-black text-amber-700 font-mono">
                      {roiData.calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}
                      {formatMoney(roiData.calc.monthlyCashFlowAfterDebtEur)}/mo
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Annual Debt Service:</span>
                    <strong className="text-slate-900 font-mono">{formatMoney(roiData.calc.annualDebtServiceEur)}/yr</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Annual Operating Taxes:</span>
                    <strong className="text-rose-600 font-mono">{formatMoney(roiData.calc.annualTaxesEur)}/yr</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">Net Operating Income (NOI):</span>
                    <strong className="text-emerald-700 font-mono">{formatMoney(roiData.calc.netOperatingIncomeEur)}/yr</strong>
                  </div>
                </div>
              </div>

              {/* Section 2: Acquisition Structure & Financing */}
              <div className="space-y-1.5 page-break-inside-avoid">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.report.roiSection2Acquisition} & Capital Outlay</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.roiPurchasePrice}</span>
                    <strong className="text-slate-900 font-mono text-sm">{formatMoneyDual(roiData.inputs.purchasePrice)}</strong>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.roiDownPayment}</span>
                    <strong className="text-slate-900 font-mono text-sm">{formatMoney(roiData.calc.downPaymentEur)} ({roiData.inputs.downPaymentPercent}%)</strong>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.roiLoanTerms}</span>
                    <strong className="text-slate-900 font-mono text-sm">{roiData.inputs.interestRatePercent}% IRCC • {roiData.inputs.loanTermYears} Yrs</strong>
                    <span className="text-[10px] text-slate-500 block">{formatMoney(roiData.calc.monthlyMortgagePaymentEur)}/mo</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[10px] block uppercase font-bold">{t.report.roiTotalAcquisition}</span>
                    <strong className="text-slate-900 font-mono text-sm">{formatMoney(roiData.calc.totalAcquisitionCost)}</strong>
                  </div>
                </div>
              </div>

              {/* EMBEDDED VISUAL GRAPH 2: 10-Year Equity & Outflow Breakdown */}
              <DossierROIChart
                purchasePrice={roiData.inputs.purchasePrice}
                downPayment={roiData.calc.downPaymentEur}
                loanAmount={roiData.calc.loanAmountEur}
                loanTerm={roiData.inputs.loanTermYears || 30}
                annualTaxes={roiData.calc.annualTaxesEur}
                annualDebt={roiData.calc.annualDebtServiceEur}
                annualOpex={roiData.calc.annualOperatingExpenses}
                formatMoney={formatMoney}
              />

              {/* Section 3: Romanian Fiscal Tax Schedule Breakdown */}
              <div className="space-y-1.5 page-break-inside-avoid">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t.report.roiSection3Taxes} (Fiscal Code 2024–2026 Itemization)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">{t.report.roiIncomeTaxTitle}</span>
                    <strong className="text-slate-900 font-mono text-sm block">{formatMoney(roiData.calc.annualTaxesEur * 0.5)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-1">{t.report.roiIncomeTaxDesc}</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">{t.report.roiCassTitle}</span>
                    <strong className="text-slate-900 font-mono text-sm block">{formatMoney(roiData.calc.annualTaxesEur * 0.35)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-1">{t.report.roiCassDesc}</span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">{t.report.roiLocalTaxTitle}</span>
                    <strong className="text-slate-900 font-mono text-sm block">{formatMoney(roiData.calc.annualTaxesEur * 0.15)} / yr</strong>
                    <span className="text-[10px] text-slate-500 block mt-1">{t.report.roiLocalTaxDesc}</span>
                  </div>
                </div>
              </div>

              {/* Section 4: 10-Year Cumulative Cash Flow & Equity Schedule Table */}
              <div className="space-y-1.5 page-break-inside-avoid">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                  10-Year Cumulative Cash Flow & Equity Amortization Schedule
                </h3>

                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Property Value (+3.5%)</th>
                      <th>Annual Cash Flow</th>
                      <th>Cumulative Cash Flow</th>
                      <th>Total Built Equity</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {[1, 2, 3, 4, 5, 7, 10].map((yr) => {
                      const propVal = roiData.inputs.purchasePrice * Math.pow(1.035, yr);
                      const annualCF = roiData.calc.annualCashFlowAfterDebtEur;
                      const cumCF = annualCF * yr;
                      const debtPayoffPerYear = (roiData.calc.loanAmountEur / (roiData.inputs.loanTermYears || 30)) * 0.85;
                      const equity = (roiData.calc.downPaymentEur) + (debtPayoffPerYear * yr) + (propVal - roiData.inputs.purchasePrice);

                      return (
                        <tr key={yr}>
                          <td className="font-sans font-bold">Year {yr}</td>
                          <td className="text-slate-700">{formatMoney(propVal)}</td>
                          <td className={annualCF >= 0 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                            {annualCF >= 0 ? '+' : ''}{formatMoney(annualCF)}
                          </td>
                          <td className="text-indigo-600 font-bold">{formatMoney(cumCF)}</td>
                          <td className="text-emerald-800 font-bold">{formatMoney(equity)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* Statutory Citations & Formal Disclaimer Footnote */}
          <div className="pt-4 border-t-2 border-slate-900 space-y-1.5 text-[10px] text-slate-500 page-break-inside-avoid">
            <div className="font-bold text-slate-700 uppercase tracking-wider">
              {t.report.disclaimerTitle}
            </div>
            <p className="leading-relaxed">
              {t.report.disclaimerText}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t border-slate-200 text-slate-400 gap-2">
              <span>{t.report.generatedPlatform}</span>
              <span>Ref: {reportId} • Stamp: AUTHENTICATED FISCAL DOSSIER • BNR RATE {currency === 'RON' ? '4.975' : '1.000'}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
