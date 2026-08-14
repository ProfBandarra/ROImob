import React, { useState } from 'react';
import { YearlyWealthPoint } from '../../types';
import { useCurrency } from '../../currency';
import { useTheme } from '../../theme';
import { TrendingUp, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface Props {
  data: YearlyWealthPoint[];
  selectedHorizonYears: number;
  mortgageDebtFreeYear: number | null;
  hasExistingMortgage: boolean;
}

export const WealthTrajectoryChart: React.FC<Props> = ({
  data,
  selectedHorizonYears,
  mortgageDebtFreeYear,
  hasExistingMortgage,
}) => {
  const { formatMoney } = useCurrency();
  const { themeConfig, theme } = useTheme();
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const width = 800;
  const height = 280;
  const padding = { top: 25, right: 30, bottom: 40, left: 75 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Max value calculation for scaling
  const maxWealth = Math.max(
    ...data.map((d) => Math.max(d.sellingWealth, d.rentingWealth, d.shortTermWealth || 0)),
    10000
  );

  const minWealth = 0;

  const getX = (year: number) => {
    const minYear = 1;
    const maxYear = 15;
    return padding.left + ((year - minYear) / (maxYear - minYear)) * chartWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(minWealth, Math.min(val, maxWealth));
    return padding.top + chartHeight - ((clamped - minWealth) / (maxWealth - minWealth)) * chartHeight;
  };

  // Generate SVG path for a dataset
  const generatePath = (key: 'sellingWealth' | 'rentingWealth' | 'shortTermWealth') => {
    return data.reduce((acc, pt, idx) => {
      const x = getX(pt.year);
      const y = getY(pt[key] || 0);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  };

  // Generate SVG area path for filling below line
  const generateAreaPath = (key: 'sellingWealth' | 'rentingWealth') => {
    const linePath = generatePath(key);
    const firstX = getX(data[0].year);
    const lastX = getX(data[data.length - 1].year);
    const bottomY = padding.top + chartHeight;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  };

  const sellLine = generatePath('sellingWealth');
  const rentLine = generatePath('rentingWealth');
  const airbnbLine = generatePath('shortTermWealth');
  const rentArea = generateAreaPath('rentingWealth');

  const activePoint = hoveredYear !== null ? data.find((d) => d.year === hoveredYear) : data.find((d) => d.year === selectedHorizonYears);

  // Colors based on theme
  const isAccessibility = theme === 'accessibility';
  const sellColor = isAccessibility ? '#38bdf8' : '#818cf8'; // Cyan or Indigo
  const rentColor = isAccessibility ? '#4ade80' : '#10b981'; // Green or Emerald
  const airbnbColor = isAccessibility ? '#facc15' : '#f59e0b'; // Yellow or Amber
  const gridColor = isAccessibility ? '#333333' : 'rgba(148, 163, 184, 0.15)';

  return (
    <div className={`${themeConfig.cardBg} rounded-2xl border ${themeConfig.cardBorder} p-5 space-y-4 shadow-xl transition-colors`}>
      
      {/* Chart Header & Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-brand-400" />
          <div>
            <h4 className={`text-sm font-black ${themeConfig.textPrimary} uppercase tracking-wider`}>
              15-Year Cumulative Wealth Trajectory
            </h4>
            <p className={`text-[11px] ${themeConfig.textSecondary}`}>
              Visual comparison of compounding net worth over time
            </p>
          </div>
        </div>

        {/* Legend Pills */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: rentColor }} />
            <span className={themeConfig.textPrimary}>Hold & Rent</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: sellColor }} />
            <span className={themeConfig.textPrimary}>Sell & Reinvest</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: airbnbColor }} />
            <span className={themeConfig.textPrimary}>Airbnb</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Chart Stage */}
      <div className="relative overflow-hidden w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none overflow-visible"
        >
          <defs>
            <linearGradient id="rentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={rentColor} stopOpacity={isAccessibility ? "0.3" : "0.25"} />
              <stop offset="100%" stopColor={rentColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = padding.top + chartHeight * (1 - ratio);
            const val = minWealth + ratio * (maxWealth - minWealth);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke={gridColor}
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

          {/* X Axis Years */}
          {data.map((pt) => {
            const x = getX(pt.year);
            const isSelected = pt.year === (hoveredYear ?? selectedHorizonYears);
            return (
              <g key={pt.year} className="cursor-pointer" onClick={() => setHoveredYear(pt.year)}>
                <text
                  x={x}
                  y={height - 12}
                  textAnchor="middle"
                  fontSize={isSelected ? "11" : "10"}
                  fontWeight={isSelected ? "bold" : "normal"}
                  fill={isSelected ? (isAccessibility ? "#facc15" : "#ffffff") : "#64748b"}
                >
                  Y{pt.year}
                </text>
              </g>
            );
          })}

          {/* Rent Filled Area */}
          <path d={rentArea} fill="url(#rentGradient)" />

          {/* Lines */}
          <path
            d={sellLine}
            fill="none"
            stroke={sellColor}
            strokeWidth="3"
            strokeDasharray="6 4"
          />

          <path
            d={airbnbLine}
            fill="none"
            stroke={airbnbColor}
            strokeWidth="2.5"
            strokeDasharray="3 3"
          />

          <path
            d={rentLine}
            fill="none"
            stroke={rentColor}
            strokeWidth="3.5"
          />

          {/* Debt-Free Milestone Marker */}
          {mortgageDebtFreeYear && (
            <g transform={`translate(${getX(mortgageDebtFreeYear)}, ${padding.top})`}>
              <line
                x1="0"
                y1="0"
                x2="0"
                y2={chartHeight}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <circle cx="0" cy="0" r="4" fill="#10b981" />
            </g>
          )}

          {/* Data Points on Hover / Active Horizon */}
          {data.map((pt) => {
            const x = getX(pt.year);
            const isHovered = hoveredYear === pt.year || (hoveredYear === null && pt.year === selectedHorizonYears);
            
            return (
              <g key={pt.year} onMouseEnter={() => setHoveredYear(pt.year)}>
                {/* Invisible hover capture area */}
                <rect
                  x={x - 15}
                  y={padding.top}
                  width="30"
                  height={chartHeight}
                  fill="transparent"
                  className="cursor-pointer"
                />

                {isHovered && (
                  <>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + chartHeight}
                      stroke={isAccessibility ? "#facc15" : "rgba(255, 255, 255, 0.4)"}
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />

                    <circle cx={x} cy={getY(pt.rentingWealth)} r="5" fill={rentColor} stroke="#ffffff" strokeWidth="2" />
                    <circle cx={x} cy={getY(pt.sellingWealth)} r="5" fill={sellColor} stroke="#ffffff" strokeWidth="2" />
                    <circle cx={x} cy={getY(pt.shortTermWealth || 0)} r="4" fill={airbnbColor} stroke="#ffffff" strokeWidth="1.5" />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Horizon Live Metric Box */}
      {activePoint && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <span className="text-[11px] text-emerald-400 font-bold">Hold & Rent (Year {activePoint.year}):</span>
            <strong className="text-sm font-mono font-black text-emerald-400">
              {formatMoney(activePoint.rentingWealth)}
            </strong>
          </div>

          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <span className="text-[11px] text-indigo-400 font-bold">Sell & Reinvest (Year {activePoint.year}):</span>
            <strong className="text-sm font-mono font-black text-indigo-400">
              {formatMoney(activePoint.sellingWealth)}
            </strong>
          </div>

          <div className="flex items-center justify-between sm:flex-col sm:items-start">
            <span className="text-[11px] text-amber-400 font-bold">Airbnb Short-Term:</span>
            <strong className="text-sm font-mono font-black text-amber-400">
              {formatMoney(activePoint.shortTermWealth || 0)}
            </strong>
          </div>
        </div>
      )}

      {/* Mortgage Debt-Free Milestone Notification */}
      {mortgageDebtFreeYear && hasExistingMortgage && (
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-emerald-300">
          <Award className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Accelerated Payoff Milestone:</strong> Surplus rental income completely extinguishes bank loan in <strong>Year {mortgageDebtFreeYear}</strong>!
          </span>
        </div>
      )}

    </div>
  );
};
