import React from 'react';
import { 
  SellVsRentInputs, 
  SellVsRentResult, 
  FinancialCalculationResult, 
  ROITaxSettings,
  YearlyWealthPoint
} from '../../types';
import { formatPercent, formatEur, formatRon } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { useCurrency } from '../../currency';
import { 
  Printer, 
  X, 
  FileText, 
  ShieldCheck, 
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Layers,
  ChevronDown
} from 'lucide-react';

interface Props {
  type: 'sellVsRent' | 'roiCalculator';
  mode?: 'quick' | 'pro';
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
  primaryConfig: { symbol: string; rateFromEur: number };
}> = ({ data, selectedHorizon, primaryConfig }) => {
  const width = 680;
  const height = 190;
  const padLeft = 65;
  const padRight = 30;
  const padTop = 20;
  const padBottom = 30;

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

  const yTicks = [0, maxVal * 0.5, maxVal];
  const xYears = [1, 3, 5, 7, 10, 12, 15];

  return (
    <div className="w-full bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-300 page-break-inside-avoid my-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800">
            15-Year Projected Capital Trajectory Chart
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[8.5px] sm:text-[9px] font-bold">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
            Hold & Rent
          </span>
          <span className="flex items-center gap-1 text-indigo-600">
            <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
            Sell & Reinvest
          </span>
          <span className="flex items-center gap-1 text-amber-600">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            Airbnb
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="dossierRentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="dossierSellGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Y Gridlines */}
        {yTicks.map((yVal, idx) => {
          const yPos = getY(yVal);
          const formattedVal = Math.round((yVal * primaryConfig.rateFromEur) / 1000);
          return (
            <g key={idx}>
              <line x1={padLeft} y1={yPos} x2={width - padRight} y2={yPos} stroke="#e2e8f0" strokeDasharray="2 2" />
              <text x={padLeft - 6} y={yPos + 3} textAnchor="end" fontSize="8.5" fill="#64748b" fontFamily="monospace">
                {primaryConfig.symbol}{formattedVal}k
              </text>
            </g>
          );
        })}

        {/* X Gridlines */}
        {xYears.map((yr) => {
          const xPos = getX(yr);
          return (
            <g key={yr}>
              <line x1={xPos} y1={padTop} x2={xPos} y2={padTop + chartH} stroke="#f1f5f9" />
              <text x={xPos} y={padTop + chartH + 12} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#64748b">
                Yr {yr}
              </text>
            </g>
          );
        })}

        {/* Area Fills */}
        <polygon points={rentArea} fill="url(#dossierRentGrad)" />
        <polygon points={sellArea} fill="url(#dossierSellGrad)" />

        {/* Lines */}
        <polyline points={sellPoints} fill="none" stroke="#4f46e5" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points={rentPoints} fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" />
        <polyline points={airbnbPoints} fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />

        {/* Horizon Marker */}
        {selectedHorizon && (
          <line
            x1={getX(selectedHorizon)}
            y1={padTop}
            x2={getX(selectedHorizon)}
            y2={padTop + chartH}
            stroke="#0f172a"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        )}
      </svg>
    </div>
  );
};

/**
 * High-Resolution Printable SVG Chart for 10-Year Equity & Outflow Structure
 */
const DossierROIChart: React.FC<{
  purchasePrice: number;
  downPayment: number;
  loanAmount: number;
  loanTerm: number;
  annualTaxes: number;
  annualDebt: number;
  annualOpex: number;
  primaryConfig: { symbol: string; rateFromEur: number };
}> = ({
  purchasePrice,
  downPayment,
  loanAmount,
  loanTerm,
  annualTaxes,
  annualDebt,
  annualOpex,
  primaryConfig,
}) => {
  const width = 680;
  const height = 180;
  const padLeft = 65;
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
    <div className="w-full bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-300 page-break-inside-avoid my-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 pb-2 border-b border-slate-200 mb-2">
        <div className="flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-800">
            10-Year Built Net Equity Progression
          </span>
        </div>
        <span className="text-[8.5px] sm:text-[9px] font-bold text-slate-500">
          +3.5% Compounding Appreciation
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {[0, maxEquity * 0.5, maxEquity].map((yVal, idx) => {
          const yPos = padTop + chartH - (yVal / maxEquity) * chartH;
          const formattedVal = Math.round((yVal * primaryConfig.rateFromEur) / 1000);
          return (
            <g key={idx}>
              <line x1={padLeft} y1={yPos} x2={width - padRight} y2={yPos} stroke="#e2e8f0" strokeDasharray="2 2" />
              <text x={padLeft - 6} y={yPos + 3} textAnchor="end" fontSize="8.5" fill="#64748b" fontFamily="monospace">
                {primaryConfig.symbol}{formattedVal}k
              </text>
            </g>
          );
        })}

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
                y={padTop + chartH + 12}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="bold"
                fill="#64748b"
              >
                Yr {yr}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-2 pt-1.5 border-t border-slate-200">
        <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-200">
          <div style={{ width: `${debtPct}%` }} className="bg-indigo-600" />
          <div style={{ width: `${taxPct}%` }} className="bg-rose-500" />
          <div style={{ width: `${opexPct}%` }} className="bg-slate-500" />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[8.5px] sm:text-[9px] pt-1.5 text-slate-600 font-bold gap-1">
          <span className="text-indigo-700">Bank Debt: {debtPct.toFixed(0)}%</span>
          <span className="text-rose-700">Romanian Taxes: {taxPct.toFixed(0)}%</span>
          <span className="text-slate-700">Opex & Reserves: {opexPct.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

export const FormalReportModal: React.FC<Props> = ({
  type,
  mode = 'pro',
  sellVsRentData,
  roiData,
  onClose
}) => {
  const { t, language } = useI18n();
  const { currency, currencies } = useCurrency();

  const primaryCode = currency;
  const secondaryCode = currency === 'RON' ? 'EUR' : 'RON';

  const primaryConfig = currencies.find((c) => c.code === primaryCode) || { symbol: '€', rateFromEur: 1, name: 'Euro' };
  const secondaryConfig = currencies.find((c) => c.code === secondaryCode) || { symbol: 'lei', rateFromEur: 4.975, name: 'Leu' };

  const formatPrimary = (amountInEur: number): string => {
    const val = Math.round(amountInEur * primaryConfig.rateFromEur);
    if (primaryCode === 'EUR') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amountInEur);
    }
    if (primaryCode === 'USD') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    }
    if (primaryCode === 'GBP') {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(val);
    }
    if (primaryCode === 'CHF') {
      return `${new Intl.NumberFormat('de-CH').format(val)} CHF`;
    }
    if (primaryCode === 'RON') {
      return `${new Intl.NumberFormat('ro-RO').format(val)} lei`;
    }
    return `${val} ${primaryCode}`;
  };

  const formatSecondary = (amountInEur: number): string => {
    const val = Math.round(amountInEur * secondaryConfig.rateFromEur);
    if (secondaryCode === 'EUR') {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amountInEur);
    }
    if (secondaryCode === 'RON') {
      return `${new Intl.NumberFormat('ro-RO').format(val)} lei`;
    }
    return `${val} ${secondaryCode}`;
  };

  const currentDate = new Date().toLocaleDateString(
    language === 'ro' ? 'ro-RO' : language === 'fr' ? 'fr-FR' : language === 'de' ? 'de-DE' : language === 'uk' ? 'uk-UA' : language === 'pt' ? 'pt-PT' : 'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }
  );

  const reportId = `ROIMOB-${type === 'sellVsRent' ? 'SVR' : 'ROI'}-${mode.toUpperCase()}-${Date.now().toString().slice(-5)}`;

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
          <title>${type === 'sellVsRent' ? t.report.titleSvr : t.report.titleRoi} - ROImob Dossier</title>
          <meta charset="utf-8" />
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              background: #ffffff !important;
              color: #0f172a !important;
              font-size: 11px;
              line-height: 1.4;
              padding: 0;
            }
            .page-break {
              page-break-after: always;
              break-after: page;
            }
            .page-break-inside-avoid {
              page-break-inside: avoid;
              break-inside: avoid;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 4px 0 8px 0;
              font-size: 10px;
            }
            th, td {
              border: 1px solid #cbd5e1;
              padding: 4px 6px;
              text-align: left;
            }
            th {
              background-color: #f1f5f9 !important;
              font-weight: 700;
              text-transform: uppercase;
              font-size: 8.5px;
              letter-spacing: 0.05em;
              color: #334155 !important;
            }
            .text-right { text-align: right; }
            .font-bold { font-weight: 700; }
            .font-black { font-weight: 900; }
            .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
            .font-sans { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            .text-emerald-700 { color: #047857 !important; }
            .text-emerald-800 { color: #065f46 !important; }
            .text-indigo-700 { color: #4338ca !important; }
            .text-indigo-600 { color: #4f46e5 !important; }
            .text-rose-600 { color: #e11d48 !important; }
            .text-slate-900 { color: #0f172a !important; }
            .text-slate-700 { color: #334155 !important; }
            .text-slate-600 { color: #475569 !important; }
            .text-slate-500 { color: #64748b !important; }
            .text-slate-400 { color: #94a3b8 !important; }
            .bg-slate-900 { background-color: #0f172a !important; color: #ffffff !important; }
            .bg-emerald-600 { background-color: #059669 !important; color: #ffffff !important; }
            .bg-slate-50 { background-color: #f8fafc !important; }
            .bg-slate-100 { background-color: #f1f5f9 !important; }
            .bg-indigo-50 { background-color: #eef2ff !important; }
            .border { border: 1px solid #cbd5e1; }
            .border-b { border-bottom: 1px solid #cbd5e1; }
            .border-t { border-top: 1px solid #cbd5e1; }
            .border-t-2 { border-top: 2px solid #0f172a; }
            .rounded-lg { border-radius: 6px; }
            .rounded-xl { border-radius: 8px; }
            .p-4 { padding: 12px; }
            .p-3 { padding: 10px; }
            .p-3\\.5 { padding: 10px; }
            .py-2 { padding-top: 6px; padding-bottom: 6px; }
            .px-3 { padding-left: 8px; padding-right: 8px; }
            .mb-2 { margin-bottom: 6px; }
            .mb-3 { margin-bottom: 8px; }
            .space-y-4 > * + * { margin-top: 10px; }
            .space-y-3 > * + * { margin-top: 8px; }
            .space-y-1 > * + * { margin-top: 3px; }
            .space-y-1\\.5 > * + * { margin-top: 4px; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .gap-2 { gap: 6px; }
            .gap-3 { gap: 8px; }
            .gap-4 { gap: 12px; }
            .uppercase { text-transform: uppercase; }
            .tracking-wider { letter-spacing: 0.05em; }
            .tracking-tight { letter-spacing: -0.02em; }
            .text-xs { font-size: 10px; }
            .text-sm { font-size: 11px; }
            .text-base { font-size: 12px; }
            .text-lg { font-size: 14px; }
            .text-xl { font-size: 16px; }
            .leading-relaxed { line-height: 1.45; }
            .w-full { width: 100%; }
            @page {
              size: A4 portrait;
              margin: 10mm 12mm 10mm 12mm;
            }
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-1 sm:p-4">
      
      {/* Modal Outer Container */}
      <div className="bg-slate-900 border border-slate-700 w-full max-w-5xl max-h-[96vh] sm:max-h-[94vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-900">
        
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 bg-slate-950 p-2.5 sm:p-4 border-b border-slate-800 flex items-center justify-between gap-2 shrink-0 shadow-lg">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <FileText className="w-5 h-5 text-brand-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider truncate block max-w-[180px] sm:max-w-md">
                  {type === 'sellVsRent' ? t.report.titleSvr : t.report.titleRoi}
                </span>
                <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase shrink-0 ${
                  mode === 'quick' 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                    : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
                }`}>
                  {mode === 'quick' ? '⚡ ' + t.mode.quick : '🔬 ' + t.mode.pro}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono block truncate">
                {reportId} • 2-Page Verified A4 • {primaryCode} + {secondaryCode}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 sm:px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">{t.report.printBtn}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Container */}
        <div className="p-2 sm:p-6 md:p-8 overflow-y-auto bg-slate-950/60 flex justify-center w-full">
          
          {/* Printable 2-Page Institutional Dossier Sheet (White Paper Background) */}
          <div 
            id="formal-report-print-sheet" 
            className="w-full max-w-[780px] bg-white text-slate-900 p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl space-y-6 sm:space-y-8 border border-slate-200"
            style={{ minHeight: '1100px' }}
          >

            {/* ========================================================================= */}
            {/* PAGE 1: STATUTORY EXECUTIVE SUMMARY & VALUATION MATRIX                    */}
            {/* ========================================================================= */}
            <div className="space-y-4 page-break">
              
              {/* Institutional Header Banner */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 pb-3 border-b-2 border-slate-900">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-900 inline-block shrink-0" />
                    <span className="font-black text-base sm:text-xl tracking-tight text-slate-900">
                      ROImob • {t.report.suiteTitle}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    {type === 'sellVsRent' ? t.report.titleSvr : t.report.titleRoi}
                  </span>
                  <p className="text-[9px] text-slate-400">
                    Statutory Romanian Fiscal Code (Law nr. 227/2015, OUG nr. 115/2023 & BNR IRCC)
                  </p>
                </div>

                <div className="text-left sm:text-right font-mono text-[9.5px] text-slate-600 space-y-0.5 shrink-0">
                  <div className="font-bold text-slate-900">Jurisdiction: Romania (ANAF)</div>
                  <div>Fiscal Ref: Law 227/2015 & OUG 115/2023</div>
                  <div className="text-slate-500">{t.report.auditRef} {reportId}</div>
                  <div className="text-emerald-700 font-bold">
                    {mode === 'quick' ? t.report.quickAuditBadge : t.report.proAuditBadge}
                  </div>
                </div>
              </div>

              {/* Methodology Scope Note */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[10px] text-slate-600 flex items-start gap-2">
                <span className="font-bold text-slate-800 uppercase shrink-0">
                  {mode === 'quick' ? '⚡ ' + t.mode.quick : '🔬 ' + t.mode.pro}:
                </span>
                <span className="leading-relaxed">{mode === 'quick' ? t.report.quickAuditDesc : t.report.proAuditDesc}</span>
              </div>

              {/* SELL VS RENT OPTIMIZER CONTENT (PAGE 1) */}
              {type === 'sellVsRent' && sellVsRentData && (
                <div className="space-y-4">
                  
                  {/* Executive Recommendation Banner */}
                  <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                        {t.report.execRecommendationLabel}
                      </span>
                      <span className="text-sm sm:text-lg font-black text-white block mt-0.5">
                        {sellVsRentData.result.recommendedStrategy === 'RENT_LONG_TERM' 
                          ? t.sellVsRent.keepAndRentLongTerm
                          : sellVsRentData.result.recommendedStrategy === 'RENT_SHORT_TERM'
                          ? t.sellVsRent.shortTermAirbnb
                          : t.sellVsRent.sellAndReinvest}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-xs uppercase shrink-0 self-start sm:self-auto">
                      {sellVsRentData.inputs.projectionHorizonYears} {t.sellVsRent.yearsPlural}
                    </span>
                  </div>

                  {/* 2-Column Side-by-Side Financial Valuation Table (Primary vs Secondary Currency) */}
                  <div className="overflow-x-auto w-full -mx-1 sm:mx-0">
                    <table className="w-full min-w-[340px] sm:min-w-full">
                      <thead>
                        <tr>
                          <th>{t.report.financialMetricHeader}</th>
                          <th className="text-right whitespace-nowrap">{primaryCode} ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">{secondaryCode} ({secondaryConfig.symbol})</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono">
                        <tr>
                          <td className="font-sans font-bold">{t.report.propertyValue}</td>
                          <td className="text-right font-bold text-slate-900 whitespace-nowrap">{formatPrimary(sellVsRentData.inputs.currentPropertyMarketValueEur)}</td>
                          <td className="text-right text-slate-700 whitespace-nowrap">{formatSecondary(sellVsRentData.inputs.currentPropertyMarketValueEur)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans">{t.report.annualRentalIncome}</td>
                          <td className="text-right text-emerald-700 font-bold whitespace-nowrap">{formatPrimary(sellVsRentData.inputs.estimatedMonthlyRentEur * 12)}</td>
                          <td className="text-right text-emerald-700 whitespace-nowrap">{formatSecondary(sellVsRentData.inputs.estimatedMonthlyRentEur * 12)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans">{t.report.operatingExpenses}</td>
                          <td className="text-right text-rose-600 whitespace-nowrap">-{formatPrimary(sellVsRentData.inputs.monthlyOperatingExpensesEur * 12)}</td>
                          <td className="text-right text-rose-600 whitespace-nowrap">-{formatSecondary(sellVsRentData.inputs.monthlyOperatingExpensesEur * 12)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans font-bold">{t.report.netOperatingIncome}</td>
                          <td className="text-right font-bold text-emerald-800 whitespace-nowrap">{formatPrimary(sellVsRentData.result.monthlyNetRentalCashFlowEur * 12)}</td>
                          <td className="text-right font-bold text-emerald-800 whitespace-nowrap">{formatSecondary(sellVsRentData.result.monthlyNetRentalCashFlowEur * 12)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans font-bold">{t.report.estimatedNetYield}</td>
                          <td className="text-right font-bold text-emerald-700 whitespace-nowrap">
                            {formatPercent((sellVsRentData.result.monthlyNetRentalCashFlowEur * 12 / sellVsRentData.inputs.currentPropertyMarketValueEur) * 100)}
                          </td>
                          <td className="text-right text-slate-600 whitespace-nowrap">
                            {formatPercent((sellVsRentData.result.monthlyNetRentalCashFlowEur * 12 / sellVsRentData.inputs.currentPropertyMarketValueEur) * 100)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Multi-Scenario Decision Breakdown Table */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      {t.report.multiScenarioTitle}
                    </h4>
                    
                    <div className="overflow-x-auto w-full -mx-1 sm:mx-0">
                      <table className="w-full min-w-[340px] sm:min-w-full">
                        <thead>
                          <tr>
                            <th>{t.report.horizonMetricHeader}</th>
                            <th className="text-right whitespace-nowrap">{t.report.holdAndRentHeader}</th>
                            <th className="text-right whitespace-nowrap">{t.report.sellAndReinvestHeader}</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-xs">
                          {/* 5 Years */}
                          <tr className="bg-slate-100 font-bold font-sans">
                            <td colSpan={3}>{t.report.fiveYearHorizon}</td>
                          </tr>
                          <tr>
                            <td className="font-sans">{t.report.cumulativeRent}</td>
                            <td className="text-right text-emerald-700 font-bold whitespace-nowrap">{formatPrimary(sellVsRentData.inputs.estimatedMonthlyRentEur * 12 * 5)}</td>
                            <td className="text-right text-slate-400 whitespace-nowrap">-</td>
                          </tr>
                          <tr>
                            <td className="font-sans">{t.report.projectedAppreciation}</td>
                            <td className="text-right text-emerald-700 font-bold whitespace-nowrap">{formatPercent(sellVsRentData.inputs.propertyAppreciationRatePercent * 5)}</td>
                            <td className="text-right text-indigo-600 font-bold whitespace-nowrap">{formatPercent(sellVsRentData.inputs.alternativeInvestmentReturnRatePercent * 5)}</td>
                          </tr>
                          <tr>
                            <td className="font-sans font-bold">{t.report.totalHorizonWealth}</td>
                            <td className="text-right text-emerald-800 font-black whitespace-nowrap">
                              {formatPrimary(sellVsRentData.result.yearlyBreakdown.find((p) => p.year === 5)?.rentingWealth ?? 0)}
                            </td>
                            <td className="text-right text-indigo-700 font-black whitespace-nowrap">
                              {formatPrimary(sellVsRentData.result.yearlyBreakdown.find((p) => p.year === 5)?.sellingWealth ?? 0)}
                            </td>
                          </tr>

                          {/* 10 Years */}
                          <tr className="bg-slate-100 font-bold font-sans">
                            <td colSpan={3}>{t.report.tenYearHorizon}</td>
                          </tr>
                          <tr>
                            <td className="font-sans">{t.report.cumulativeRent}</td>
                            <td className="text-right text-emerald-700 font-bold whitespace-nowrap">{formatPrimary(sellVsRentData.inputs.estimatedMonthlyRentEur * 12 * 10)}</td>
                            <td className="text-right text-slate-400 whitespace-nowrap">-</td>
                          </tr>
                          <tr>
                            <td className="font-sans">{t.report.projectedAppreciation}</td>
                            <td className="text-right text-emerald-700 font-bold whitespace-nowrap">{formatPercent(sellVsRentData.inputs.propertyAppreciationRatePercent * 10)}</td>
                            <td className="text-right text-indigo-600 font-bold whitespace-nowrap">{formatPercent(sellVsRentData.inputs.alternativeInvestmentReturnRatePercent * 10)}</td>
                          </tr>
                          <tr>
                            <td className="font-sans font-bold">{t.report.totalHorizonWealth}</td>
                            <td className="text-right text-emerald-800 font-black whitespace-nowrap">
                              {formatPrimary(sellVsRentData.result.yearlyBreakdown.find((p) => p.year === 10)?.rentingWealth ?? 0)}
                            </td>
                            <td className="text-right text-indigo-700 font-black whitespace-nowrap">
                              {formatPrimary(sellVsRentData.result.yearlyBreakdown.find((p) => p.year === 10)?.sellingWealth ?? 0)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* REAL ESTATE ROI CALCULATOR (PAGE 1) */}
              {type === 'roiCalculator' && roiData && (
                <div className="space-y-4">
                  <div className="bg-slate-900 text-white p-3.5 sm:p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div>
                      <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-slate-300 block">
                        {t.report.verdictUnderwritingLabel}
                      </span>
                      <span className="text-sm sm:text-lg font-black text-white block mt-0.5">
                        {roiData.calc.grossYieldPercent >= 7.0 ? t.report.highYieldAsset : t.report.stableAsset}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-xs uppercase shrink-0 self-start sm:self-auto">
                      {formatPercent(roiData.calc.netYieldPercent)} {t.report.estimatedNetYield}
                    </span>
                  </div>

                  <div className="overflow-x-auto w-full -mx-1 sm:mx-0">
                    <table className="w-full min-w-[340px] sm:min-w-full">
                      <thead>
                        <tr>
                          <th>{t.report.financialMetricHeader}</th>
                          <th className="text-right whitespace-nowrap">{primaryCode} ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">{secondaryCode} ({secondaryConfig.symbol})</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono">
                        <tr>
                          <td className="font-sans font-bold">{t.roiCalculator.purchasePrice}</td>
                          <td className="text-right font-bold text-slate-900 whitespace-nowrap">{formatPrimary(roiData.inputs.purchasePrice)}</td>
                          <td className="text-right text-slate-700 whitespace-nowrap">{formatSecondary(roiData.inputs.purchasePrice)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans">{t.roiCalculator.downPayment}</td>
                          <td className="text-right text-slate-900 whitespace-nowrap">{formatPrimary(roiData.calc.downPaymentEur)} ({roiData.inputs.downPaymentPercent}%)</td>
                          <td className="text-right text-slate-700 whitespace-nowrap">{formatSecondary(roiData.calc.downPaymentEur)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans">Mortgage Loan Balance</td>
                          <td className="text-right text-slate-900 whitespace-nowrap">{formatPrimary(roiData.calc.loanAmountEur)}</td>
                          <td className="text-right text-slate-700 whitespace-nowrap">{formatSecondary(roiData.calc.loanAmountEur)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans font-bold">{t.report.annualRentalIncome}</td>
                          <td className="text-right font-bold text-emerald-700 whitespace-nowrap">{formatPrimary(roiData.inputs.monthlyRentEur * 12)}</td>
                          <td className="text-right text-emerald-700 whitespace-nowrap">{formatSecondary(roiData.inputs.monthlyRentEur * 12)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans">{t.roiCalculator.totalAnnualTaxes}</td>
                          <td className="text-right text-rose-600 font-bold whitespace-nowrap">-{formatPrimary(roiData.calc.annualTaxesEur)}</td>
                          <td className="text-right text-rose-600 whitespace-nowrap">-{formatSecondary(roiData.calc.annualTaxesEur)}</td>
                        </tr>
                        <tr>
                          <td className="font-sans font-bold">{t.roiCalculator.kpi.monthlyCashFlow}</td>
                          <td className="text-right font-bold text-emerald-800 whitespace-nowrap">
                            {roiData.calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}{formatPrimary(roiData.calc.monthlyCashFlowAfterDebtEur)}/mo
                          </td>
                          <td className="text-right font-bold text-emerald-800 whitespace-nowrap">
                            {roiData.calc.monthlyCashFlowAfterDebtEur >= 0 ? '+' : ''}{formatSecondary(roiData.calc.monthlyCashFlowAfterDebtEur)}/mo
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Applicable Tax Itemization Table */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                      {t.report.applicableTaxesTitle}
                    </h4>

                    <div className="overflow-x-auto w-full -mx-1 sm:mx-0">
                      <table className="w-full min-w-[340px] sm:min-w-full">
                        <thead>
                          <tr>
                            <th>{t.report.taxRegimeItemHeader}</th>
                            <th>Statutory Base</th>
                            <th className="text-right whitespace-nowrap">Annual Liability ({primaryConfig.symbol})</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-xs">
                          <tr>
                            <td className="font-sans font-bold">{t.roiCalculator.incomeTaxTitle}</td>
                            <td className="font-sans text-slate-600">{t.roiCalculator.incomeTaxDesc}</td>
                            <td className="text-right font-bold text-rose-600 whitespace-nowrap">{formatPrimary(roiData.calc.annualTaxesEur * 0.5)}</td>
                          </tr>
                          <tr>
                            <td className="font-sans font-bold">{t.roiCalculator.cassHealthTitle}</td>
                            <td className="font-sans text-slate-600">{t.roiCalculator.cassHealthDesc}</td>
                            <td className="text-right font-bold text-rose-600 whitespace-nowrap">{formatPrimary(roiData.calc.annualTaxesEur * 0.35)}</td>
                          </tr>
                          <tr>
                            <td className="font-sans font-bold">{t.roiCalculator.localTaxTitle}</td>
                            <td className="font-sans text-slate-600">{t.roiCalculator.localTaxDesc}</td>
                            <td className="text-right font-bold text-slate-700 whitespace-nowrap">{formatPrimary(roiData.calc.annualTaxesEur * 0.15)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Page 1 Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 pt-3 text-[9px] sm:text-[9.5px] text-slate-400 border-t border-slate-200">
                <span>{currentDate}</span>
                <span>Ref: {reportId} • {t.report.stamp} • {t.report.bnrRate} • {t.report.page1Of2}</span>
              </div>

            </div>

            {/* ========================================================================= */}
            {/* PAGE 2: GRAPHICAL PROJECTION & STATUTORY COMMENTARY                       */}
            {/* ========================================================================= */}
            <div className="space-y-4 pt-4 border-t-2 border-dashed border-slate-300">
              
              {/* Page 2 Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-1.5 pb-2 border-b-2 border-slate-900">
                <div>
                  <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                    {t.report.page2Title}
                  </h3>
                  <p className="text-[9.5px] sm:text-[10px] text-slate-500 font-medium">
                    {t.report.page2Subtitle}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">{reportId}</span>
              </div>

              {/* Bulleted Strategic Analysis Commentary */}
              <div className="p-3 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">
                  {t.report.commentaryTitle}
                </span>
                <ul className="list-disc pl-4 space-y-1 text-[10.5px] sm:text-[11px] leading-relaxed">
                  <li>
                    <strong>{mode === 'quick' ? t.report.quickAuditBadge : t.report.proAuditBadge}:</strong>{' '}
                    {mode === 'quick' ? t.report.quickAuditDesc : t.report.proAuditDesc}
                  </li>
                  {type === 'sellVsRent' && sellVsRentData ? (
                    <>
                      <li>
                        <strong>{t.report.commentaryRentIncome}</strong> {formatPrimary(sellVsRentData.inputs.estimatedMonthlyRentEur * 12)} / yr ({formatSecondary(sellVsRentData.inputs.estimatedMonthlyRentEur * 12)}) {t.report.commentaryRentIncomeDesc}
                      </li>
                      <li>
                        <strong>{t.report.commentaryAppreciation}</strong> {sellVsRentData.inputs.propertyAppreciationRatePercent}% {t.report.commentaryAppreciationDesc}
                      </li>
                      <li>
                        <strong>{t.report.commentaryWealthAdvantage}</strong> {t.report.commentaryWealthAdvantageDesc} {formatPrimary(sellVsRentData.result.selectedHorizonRentalWealthEur)} (Yr {sellVsRentData.inputs.projectionHorizonYears}).
                      </li>
                      <li>
                        <strong>{t.report.commentaryTaxCompliance}</strong> {t.report.commentaryTaxComplianceDesc}
                      </li>
                    </>
                  ) : roiData ? (
                    <>
                      <li>
                        <strong>{t.report.commentaryCashOnCash}</strong> {formatPercent(roiData.calc.cashOnCashReturnPercent)} {t.report.commentaryCashOnCashDesc} ({formatPrimary(roiData.calc.downPaymentEur)}).
                      </li>
                      <li>
                        <strong>{t.report.commentaryMortgageDebt}</strong> {t.report.commentaryMortgageDebtDesc}
                      </li>
                      <li>
                        <strong>{t.report.commentaryTotalNetEquity}</strong> {formatPrimary(roiData.calc.downPaymentEur + (roiData.calc.loanAmountEur * 0.4) + (roiData.inputs.purchasePrice * 0.41))} {t.report.commentaryTotalNetEquityDesc}
                      </li>
                    </>
                  ) : null}
                </ul>
              </div>

              {/* Embedded Vector SVG Visual Graph */}
              {type === 'sellVsRent' && sellVsRentData && (
                <DossierWealthChart
                  data={sellVsRentData.result.yearlyBreakdown}
                  selectedHorizon={sellVsRentData.inputs.projectionHorizonYears}
                  primaryConfig={primaryConfig}
                />
              )}

              {type === 'roiCalculator' && roiData && (
                <DossierROIChart
                  purchasePrice={roiData.inputs.purchasePrice}
                  downPayment={roiData.calc.downPaymentEur}
                  loanAmount={roiData.calc.loanAmountEur}
                  loanTerm={roiData.inputs.loanTermYears || 30}
                  annualTaxes={roiData.calc.annualTaxesEur}
                  annualDebt={roiData.calc.annualDebtServiceEur}
                  annualOpex={roiData.calc.annualOperatingExpenses}
                  primaryConfig={primaryConfig}
                />
              )}

              {/* Detailed Multi-Year Progression Table */}
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                  {t.report.progressionScheduleTitle}
                </h4>

                {type === 'sellVsRent' && sellVsRentData && (
                  <div className="overflow-x-auto w-full -mx-1 sm:mx-0">
                    <table className="w-full min-w-[420px] sm:min-w-full">
                      <thead>
                        <tr>
                          <th>{t.sellVsRent.scheduleHeaders.year}</th>
                          <th className="text-right whitespace-nowrap">{t.sellVsRent.scheduleHeaders.holdAndRent} ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">{t.sellVsRent.scheduleHeaders.sellAndReinvest} ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">Airbnb ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">{t.sellVsRent.scheduleHeaders.propertyValue} ({primaryConfig.symbol})</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        {sellVsRentData.result.yearlyBreakdown.filter((p) => [1, 2, 3, 5, 7, 10, 15].includes(p.year)).map((r) => (
                          <tr key={r.year} className={r.year === sellVsRentData.inputs.projectionHorizonYears ? 'bg-indigo-50 font-bold' : ''}>
                            <td className="font-sans font-bold whitespace-nowrap">Year {r.year}</td>
                            <td className="text-right text-emerald-700 font-bold whitespace-nowrap">{formatPrimary(r.rentingWealth)}</td>
                            <td className="text-right text-indigo-700 whitespace-nowrap">{formatPrimary(r.sellingWealth)}</td>
                            <td className="text-right text-amber-700 whitespace-nowrap">{formatPrimary(r.shortTermWealth ?? 0)}</td>
                            <td className="text-right text-slate-600 whitespace-nowrap">{formatPrimary(r.propertyValue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {type === 'roiCalculator' && roiData && (
                  <div className="overflow-x-auto w-full -mx-1 sm:mx-0">
                    <table className="w-full min-w-[420px] sm:min-w-full">
                      <thead>
                        <tr>
                          <th>{t.roiCalculator.scheduleHeaders.year}</th>
                          <th className="text-right whitespace-nowrap">{t.roiCalculator.scheduleHeaders.propertyValue} ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">{t.roiCalculator.scheduleHeaders.annualCashFlow} ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">{t.roiCalculator.scheduleHeaders.cumulativeCash} ({primaryConfig.symbol})</th>
                          <th className="text-right whitespace-nowrap">{t.roiCalculator.scheduleHeaders.totalNetEquity} ({primaryConfig.symbol})</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        {[1, 2, 3, 4, 5, 7, 10].map((yr) => {
                          const propVal = roiData.inputs.purchasePrice * Math.pow(1.035, yr);
                          const annualCF = roiData.calc.annualCashFlowAfterDebtEur;
                          const cumCF = annualCF * yr;
                          const debtPayoffPerYear = (roiData.calc.loanAmountEur / (roiData.inputs.loanTermYears || 30)) * 0.85;
                          const equity = (roiData.calc.downPaymentEur) + (debtPayoffPerYear * yr) + (propVal - roiData.inputs.purchasePrice);

                          return (
                            <tr key={yr}>
                              <td className="font-sans font-bold whitespace-nowrap">Year {yr}</td>
                              <td className="text-right text-slate-700 whitespace-nowrap">{formatPrimary(propVal)}</td>
                              <td className={`text-right whitespace-nowrap ${annualCF >= 0 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}`}>
                                {annualCF >= 0 ? '+' : ''}{formatPrimary(annualCF)}
                              </td>
                              <td className="text-right text-indigo-700 font-bold whitespace-nowrap">{formatPrimary(cumCF)}</td>
                              <td className="text-right text-emerald-800 font-black whitespace-nowrap">{formatPrimary(equity)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Official Legal Disclaimer Footnote */}
              <div className="pt-3 border-t-2 border-slate-900 space-y-1 text-[9px] text-slate-500">
                <div className="font-bold text-slate-700 uppercase tracking-wider">
                  {t.report.disclaimerTitle}
                </div>
                <p className="leading-relaxed">
                  {t.report.disclaimerText}
                </p>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 pt-1 border-t border-slate-200 text-slate-400">
                  <span>{currentDate}</span>
                  <span>Ref: {reportId} • {t.report.stamp} • {primaryCode} + {secondaryCode} • {t.report.page2Of2}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
