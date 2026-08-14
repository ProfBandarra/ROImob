import React, { useState } from 'react';
import { useCurrency } from '../../currency';
import { useTheme } from '../../theme';
import { BarChart3, PieChart, Coins, ShieldCheck } from 'lucide-react';

interface Props {
  tenYearProjection: {
    year: number;
    propertyValue: number;
    annualCashFlow: number;
    cumulativeCash: number;
    totalNetEquity: number;
  }[];
  totalAcquisitionCost: number;
  annualTaxesEur: number;
  annualOperatingExpenses: number;
  annualDebtServiceEur: number;
}

export const ROIEquityCashflowChart: React.FC<Props> = ({
  tenYearProjection,
  totalAcquisitionCost,
  annualTaxesEur,
  annualOperatingExpenses,
  annualDebtServiceEur,
}) => {
  const { formatMoney } = useCurrency();
  const { themeConfig, theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'equity' | 'expenseBreakdown'>('equity');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  if (!tenYearProjection || tenYearProjection.length === 0) return null;

  const width = 800;
  const height = 260;
  const padding = { top: 25, right: 25, bottom: 40, left: 75 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxEquity = Math.max(...tenYearProjection.map((p) => p.totalNetEquity), totalAcquisitionCost * 1.5);
  const minVal = 0;

  const isAccessibility = theme === 'accessibility';
  const equityColor = isAccessibility ? '#38bdf8' : '#6366f1'; // Cyan or Indigo
  const cashColor = isAccessibility ? '#4ade80' : '#10b981'; // Green or Emerald

  const totalAnnualOutflow = annualOperatingExpenses + annualDebtServiceEur;
  const taxPct = totalAnnualOutflow > 0 ? (annualTaxesEur / totalAnnualOutflow) * 100 : 0;
  const debtPct = totalAnnualOutflow > 0 ? (annualDebtServiceEur / totalAnnualOutflow) * 100 : 0;
  const opexPct = Math.max(0, 100 - taxPct - debtPct);

  return (
    <div className={`${themeConfig.cardBg} rounded-2xl border ${themeConfig.cardBorder} p-5 space-y-4 shadow-xl transition-colors`}>
      
      {/* Tab Switcher & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-amber-400" />
          <div>
            <h4 className={`text-sm font-black ${themeConfig.textPrimary} uppercase tracking-wider`}>
              {activeTab === 'equity' ? '10-Year Capital & Equity Amortization' : 'Annual Outflow & Tax Distribution'}
            </h4>
            <p className={`text-[11px] ${themeConfig.textSecondary}`}>
              Visual forecast of net equity building and operational cash structure
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'equity'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Equity Amortization
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('expenseBreakdown')}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'expenseBreakdown'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Expense & Tax Mix
          </button>
        </div>
      </div>

      {/* VIEW 1: EQUITY AMORTIZATION BARS */}
      {activeTab === 'equity' && (
        <div className="space-y-3">
          <div className="relative overflow-hidden w-full">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto select-none overflow-visible"
            >
              {/* Grid lines */}
              {[0, 0.33, 0.66, 1].map((ratio, i) => {
                const y = padding.top + chartHeight * (1 - ratio);
                const val = minVal + ratio * (maxEquity - minVal);
                return (
                  <g key={i}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke={isAccessibility ? "#333333" : "rgba(148, 163, 184, 0.15)"}
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      fontSize="10"
                      fill="#94a3b8"
                      fontFamily="monospace"
                    >
                      {formatMoney(val)}
                    </text>
                  </g>
                );
              })}

              {/* Bar Columns */}
              {tenYearProjection.map((pt, i) => {
                const barWidth = (chartWidth / 10) * 0.65;
                const colWidth = chartWidth / 10;
                const x = padding.left + i * colWidth + (colWidth - barWidth) / 2;
                
                const equityBarHeight = Math.max(4, (pt.totalNetEquity / maxEquity) * chartHeight);
                const equityY = padding.top + chartHeight - equityBarHeight;

                const isHovered = hoveredYear === pt.year;

                return (
                  <g
                    key={pt.year}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredYear(pt.year)}
                    onMouseLeave={() => setHoveredYear(null)}
                  >
                    {/* Equity Bar */}
                    <rect
                      x={x}
                      y={equityY}
                      width={barWidth}
                      height={equityBarHeight}
                      rx="4"
                      fill={isHovered ? (isAccessibility ? "#facc15" : "#818cf8") : equityColor}
                      opacity={isHovered ? 1 : 0.85}
                    />

                    {/* Cumulative Cash Flow Line Accent */}
                    <circle
                      cx={x + barWidth / 2}
                      cy={padding.top + chartHeight - Math.max(4, (Math.max(0, pt.cumulativeCash) / maxEquity) * chartHeight)}
                      r={isHovered ? "5" : "3.5"}
                      fill={cashColor}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {/* X Label */}
                    <text
                      x={x + barWidth / 2}
                      y={height - 12}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight={isHovered ? "bold" : "normal"}
                      fill={isHovered ? (isAccessibility ? "#facc15" : "#ffffff") : "#64748b"}
                    >
                      Y{pt.year}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hover / Summary Box */}
          {hoveredYear && (
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-[11px] text-indigo-400 font-bold">Total Net Equity (Year {hoveredYear}):</span>
                <strong className="text-sm font-mono block text-white">
                  {formatMoney(tenYearProjection.find((p) => p.year === hoveredYear)?.totalNetEquity || 0)}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-emerald-400 font-bold">Cumulative Net Cash Flow:</span>
                <strong className="text-sm font-mono block text-emerald-400">
                  {formatMoney(tenYearProjection.find((p) => p.year === hoveredYear)?.cumulativeCash || 0)}
                </strong>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: EXPENSE & TAX MIX BREAKDOWN */}
      {activeTab === 'expenseBreakdown' && (
        <div className="space-y-4 pt-2">
          
          {/* Proportional Breakdown Bar */}
          <div className="space-y-1.5">
            <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner bg-slate-950">
              <div
                style={{ width: `${debtPct}%` }}
                className="bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white px-1"
                title={`Mortgage Debt Service: ${debtPct.toFixed(0)}%`}
              >
                {debtPct > 12 && `${debtPct.toFixed(0)}% Debt`}
              </div>
              <div
                style={{ width: `${taxPct}%` }}
                className="bg-rose-500 flex items-center justify-center text-[10px] font-black text-white px-1"
                title={`Romanian Taxes (Income, CASS, Property): ${taxPct.toFixed(0)}%`}
              >
                {taxPct > 10 && `${taxPct.toFixed(0)}% Tax`}
              </div>
              <div
                style={{ width: `${opexPct}%` }}
                className="bg-amber-500 flex items-center justify-center text-[10px] font-black text-white px-1"
                title={`Operating & Maintenance Reserves: ${opexPct.toFixed(0)}%`}
              >
                {opexPct > 10 && `${opexPct.toFixed(0)}% Opex`}
              </div>
            </div>
          </div>

          {/* Detailed Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl border border-indigo-500/30 bg-indigo-500/10 space-y-1">
              <span className="text-[11px] text-indigo-300 font-bold block">Mortgage Debt Service</span>
              <strong className="text-sm font-mono text-white block">{formatMoney(annualDebtServiceEur)} / yr</strong>
              <span className="text-[10px] text-slate-400">{debtPct.toFixed(1)}% of total annual cash outflow</span>
            </div>

            <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-1">
              <span className="text-[11px] text-rose-300 font-bold block">Romanian Taxes & Levies</span>
              <strong className="text-sm font-mono text-white block">{formatMoney(annualTaxesEur)} / yr</strong>
              <span className="text-[10px] text-slate-400">{taxPct.toFixed(1)}% (10% Income + CASS + Property Tax)</span>
            </div>

            <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 space-y-1">
              <span className="text-[11px] text-amber-300 font-bold block">Maintenance & Insurance</span>
              <strong className="text-sm font-mono text-white block">{formatMoney(annualOperatingExpenses - annualTaxesEur)} / yr</strong>
              <span className="text-[10px] text-slate-400">{opexPct.toFixed(1)}% (PAD, insurance, reserves)</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
