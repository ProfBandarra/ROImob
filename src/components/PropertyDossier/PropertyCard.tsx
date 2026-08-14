import React from 'react';
import { Property } from '../../types';
import { calculatePropertyScores } from '../../utils/calculations';
import { formatEur, getScoreColor } from '../../utils/formatters';
import { SourceAttributionBadge } from '../SourceAttributionBadge';
import { useI18n } from '../../i18n';
import { 
  Building, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Compass, 
  Calculator, 
  ArrowUpRight 
} from 'lucide-react';

interface Props {
  property: Property;
  onSelect: (property: Property) => void;
  onOpenCalculator: (property: Property) => void;
  isSelected?: boolean;
}

export const PropertyCard: React.FC<Props> = ({
  property,
  onSelect,
  onOpenCalculator,
  isSelected = false,
}) => {
  const { t } = useI18n();
  const scores = calculatePropertyScores(property);
  const scoreVisual = getScoreColor(scores.compositeOverallScore);

  const grossYield = (
    ((property.investment.monthlyRentEstimateEur * 12) / property.priceEur) *
    100
  ).toFixed(1);

  const pricePerSqm = Math.round(property.priceEur / property.usableAreaSqm);

  const isSeismicRisk = ['RsI', 'RsII', 'U1', 'U2', 'UNEXPERTIZED_PRE_1977'].includes(
    property.diagnostics.seismic.riskClass
  );

  return (
    <div
      className={`group relative bg-slate-900/80 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-brand-500 ring-2 ring-brand-500/30 shadow-2xl bg-slate-800/90'
          : 'border-slate-800 hover:border-slate-700 hover:shadow-xl'
      }`}
    >
      {/* Top Image Banner */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={property.thumbnailUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-xs font-extrabold border border-white/10">
            {property.city}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-brand-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
            {grossYield}% Gross Yield
          </span>
        </div>

        {/* Overall Score Circle */}
        <div className="absolute top-3 right-3 z-10">
          <div
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl backdrop-blur-md border font-black shadow-lg ${scoreVisual.bg} ${scoreVisual.text} ${scoreVisual.border}`}
            title="ROImob Composite Score"
          >
            <span className="text-sm font-black leading-none">
              {scores.compositeOverallScore}
            </span>
            <span className="text-[9px] uppercase font-bold text-slate-400">Score</span>
          </div>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-2xl font-black text-white tracking-tight">
              {formatEur(property.priceEur)}
            </span>
            <span className="text-xs text-slate-300 font-medium ml-1.5">
              (€{pricePerSqm}/m²)
            </span>
          </div>
          <span className="text-xs text-slate-300 font-medium bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
            {property.usableAreaSqm} m² • {property.rooms} R
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-white line-clamp-1 group-hover:text-brand-300 transition-colors mb-1">
            {property.title}
          </h3>
          <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span className="truncate">{property.address}</span>
          </p>

          {/* Diagnostics Quick Indicators */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            
            {/* Seismic Status */}
            <div
              className={`p-2 rounded-xl border text-xs flex items-center gap-2 ${
                isSeismicRisk
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}
            >
              {isSeismicRisk ? (
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              ) : (
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              )}
              <div className="truncate">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                  Seismic Risk
                </span>
                <span className="font-bold">{property.diagnostics.seismic.riskClass}</span>
              </div>
            </div>

            {/* School Pass Rate */}
            <div className="p-2 rounded-xl border border-slate-800 bg-slate-800/40 text-xs flex items-center gap-2">
              <Compass className="w-4 h-4 shrink-0 text-amber-400" />
              <div className="truncate">
                <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                  Walk Score
                </span>
                <span className="font-bold text-white">
                  {property.diagnostics.mobility.walkScore} / 100
                </span>
              </div>
            </div>

          </div>

          {/* Subscores Triple Bar */}
          <div className="space-y-1.5 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80 mb-3">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Livability</span>
              <strong className="text-brand-300">{scores.livabilityScore}%</strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand-500 h-full rounded-full"
                style={{ width: `${scores.livabilityScore}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400">Structural Safety</span>
              <strong
                className={
                  scores.safetyScore < 50 ? 'text-rose-400' : 'text-emerald-400'
                }
              >
                {scores.safetyScore}%
              </strong>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  scores.safetyScore < 50 ? 'bg-rose-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${scores.safetyScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons & Source Tag */}
        <div>
          <div className="flex items-center justify-between py-2 border-t border-slate-800">
            <SourceAttributionBadge provenance={property.diagnostics.seismic.provenance} compact />
            <span className="text-[10px] text-slate-400 font-mono">
              Built {property.yearBuilt}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => onSelect(property)}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <span>{t.common.details}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onOpenCalculator(property)}
              className="py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-brand-600/30"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.common.calculateRoi}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
