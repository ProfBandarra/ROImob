import React, { useState } from 'react';
import { useCurrency } from '../../currency';
import { useTheme } from '../../theme';
import { BarChart3, TrendingUp, Layers } from 'lucide-react';

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
  const height = 280;
  const padding = { top: 30, right: 30, bottom: 45, left: 75 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(
    ...tenYearProjection.map((p) => p.totalNetEquity),
    totalAcquisitionCost * 1.5,
    10000
  );

  const totalAnnualOutflow = annualOperatingExpenses + annualDebtServiceEur;
  const taxPct = totalAnnualOutflow > 0 ? (annualTaxesEur / totalAnnualOutflow) * 100 : 0;
  const debtPct = totalAnnualOutflow > 0 ? (annualDebtServiceEur / totalAnnualOutflow) * 100 : 0;
  const opexPct = Math.max(0, 100 - taxPct - debtPct);

  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal];

  const getX = (idx: number) => padding.left + idx * (chartWidth / tenYearProjection.length) + (chartWidth / tenYearProjection.length) / 2;
  const getY = (val: number) => padding.top + chartHeight - (Math.max(0, val) / maxVal) * chartHeight;

  // Generate line points for equity trajectory overlay
  const linePoints = tenYearProjection
    .map((p, idx) => `${getX(idx)},${getY(p.totalNetEquity)}`)
    .join(' ');

  const activeData = hoveredYear !== null ? tenYearProjection.find((p) => p.year === hoveredYear) : null;

  return (
    <div className={`${themeConfig.cardBg} rounded-2xl border ${themeConfig.cardBorder} p-5 space-y-4 shadow-xl transition-colors`}>
      
      {/* Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h4 className={`text-sm font-black ${themeConfig.textPrimary} uppercase tracking-wider`}>
              Annual Net Income & Equity Growth (10 Year Projection)
            </h4>
          </div>
          <p className={`text-[11px] ${themeConfig.textSecondary} mt-0.5`}>
            10-Year cumulative compounding equity & operational income
          </p>
        </div>

        {/* Legend Pills & Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
              Net Income
            </span>
            <span className="flex items-center gap-1 text-purple-400 font-bold">
              <span className="w-3 h-3 rounded bg-purple-500 inline-block" />
              Equity Build-up
            </span>
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('equity')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'equity'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Growth
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('expenseBreakdown')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'expenseBreakdown'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Outflow Mix
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'equity' ? (
        <div className="relative overflow-hidden w-full">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
            <defs>
              <linearGradient id="roiEquityLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {yTicks.map((yVal, idx) => {
              const yPos = getY(yVal);
              return (
                <g key={idx}>
                  <line
                    x1={padding.left}
                    y1={yPos}
                    x2={width - padding.right}
                    y2={yPos}
                    stroke="rgba(148, 163, 184, 0.12)"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding.left - 10}
                    y={yPos + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="#94a3b8"
                    fontFamily="monospace"
                  >
                    {formatMoney(Math.round(yVal))}
                  </text>
                </g>
              );
            })}

            {/* Bars: Net Income (Emerald) and Equity Build-up (Purple) */}
            {tenYearProjection.map((pt, idx) => {
              const colW = chartWidth / tenYearProjection.length;
              const barW = colW * 0.32;
              const xCenter = padding.left + idx * colW + colW / 2;

              const incomeH = (Math.max(0, pt.cumulativeCash) / maxVal) * chartHeight;
              const equityH = (Math.max(0, pt.totalNetEquity) / maxVal) * chartHeight;

              const isHovered = hoveredYear === pt.year;

              return (
                <g 
                  key={pt.year}
                  onMouseEnter={() => setHoveredYear(pt.year)}
                  onMouseLeave={() => setHoveredYear(null)}
                  className="cursor-pointer"
                >
                  {/* Hover background column */}
                  {isHovered && (
                    <rect
                      x={padding.left + idx * colW + 4}
                      y={padding.top}
                      width={colW - 8}
                      height={chartHeight}
                      fill="rgba(255, 255, 255, 0.04)"
                      rx="6"
                    />
                  )}

                  {/* Net Income Bar (Emerald) */}
                  <rect
                    x={xCenter - barW - 2}
                    y={padding.top + chartHeight - incomeH}
                    width={barW}
                    height={incomeH}
                    fill={isHovered ? '#34d399' : '#10b981'}
                    rx="3"
                  />

                  {/* Equity Build-up Bar (Purple) */}
                  <rect
                    x={xCenter + 2}
                    y={padding.top + chartHeight - equityH}
                    width={barW}
                    height={equityH}
                    fill={isHovered ? '#a78bfa' : '#8b5cf6'}
                    rx="3"
                  />

                  {/* Year Label */}
                  <text
                    x={xCenter}
                    y={padding.top + chartHeight + 20}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    fill={isHovered ? '#ffffff' : '#94a3b8'}
                  >
                    {pt.year}
                  </text>
                </g>
              );
            })}

            {/* Line Overlay for Equity Trajectory */}
            <polyline
              points={linePoints}
              fill="none"
              stroke="url(#roiEquityLineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Line Data Points */}
            {tenYearProjection.map((pt, idx) => (
              <circle
                key={pt.year}
                cx={getX(idx)}
                cy={getY(pt.totalNetEquity)}
                r={hoveredYear === pt.year ? '5' : '3.5'}
                fill="#38bdf8"
                stroke="#0f172a"
                strokeWidth="2"
              />
            ))}
          </svg>

          {/* Interactive Tooltip Card */}
          {activeData && (
            <div className="absolute top-2 right-4 bg-slate-950/95 border border-slate-700 p-3 rounded-xl shadow-2xl text-xs space-y-1 backdrop-blur-md animate-in fade-in duration-150">
              <span className="text-[11px] font-bold text-white uppercase block border-b border-slate-800 pb-1">
                Year {activeData.year} Projection
              </span>
              <div className="flex justify-between gap-4 text-emerald-400 font-mono font-bold">
                <span>Net Cash Cumulative:</span>
                <span>+{formatMoney(activeData.cumulativeCash)}</span>
              </div>
              <div className="flex justify-between gap-4 text-purple-400 font-mono font-bold">
                <span>Total Net Equity:</span>
                <span>{formatMoney(activeData.totalNetEquity)}</span>
              </div>
              <div className="flex justify-between gap-4 text-slate-300 font-mono">
                <span>Property Valuation:</span>
                <span>{formatMoney(activeData.propertyValue)}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* VIEW 2: Operational Outflow Mix */
        <div className="space-y-4 py-2">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300 uppercase tracking-wider">Annual Outflow Breakdown</span>
              <span className="text-white font-mono text-sm">{formatMoney(totalAnnualOutflow)} / yr</span>
            </div>

            <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-900 border border-slate-800">
              <div style={{ width: `${debtPct}%` }} className="bg-indigo-600 transition-all" title="Bank Debt Service" />
              <div style={{ width: `${taxPct}%` }} className="bg-rose-500 transition-all" title="Romanian Taxes" />
              <div style={{ width: `${opexPct}%` }} className="bg-slate-600 transition-all" title="Maintenance & Reserves" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Mortgage Debt Service</span>
                <strong className="text-indigo-400 font-mono text-sm">{formatMoney(annualDebtServiceEur)}/yr</strong>
                <span className="text-[10px] text-slate-500 block">{debtPct.toFixed(1)}% of total outflows</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Romanian Taxes (Income+CASS)</span>
                <strong className="text-rose-400 font-mono text-sm">{formatMoney(annualTaxesEur)}/yr</strong>
                <span className="text-[10px] text-slate-500 block">{taxPct.toFixed(1)}% of total outflows</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Maintenance & Reserves</span>
                <strong className="text-slate-200 font-mono text-sm">{formatMoney(annualOperatingExpenses - annualTaxesEur)}/yr</strong>
                <span className="text-[10px] text-slate-500 block">{opexPct.toFixed(1)}% of total outflows</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
