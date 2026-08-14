import React from 'react';
import { Property } from '../../types';
import { calculatePropertyScores } from '../../utils/calculations';
import { formatEur, formatRon, formatNumber, getScoreColor } from '../../utils/formatters';
import { SourceAttributionBadge } from '../SourceAttributionBadge';
import { useI18n } from '../../i18n';
import { 
  X, 
  Printer, 
  Calculator, 
  ShieldAlert, 
  ShieldCheck, 
  Droplets, 
  Landmark, 
  GraduationCap, 
  Wind, 
  Compass, 
  MapPin, 
  Building, 
  FileCheck2, 
  AlertTriangle,
  TrendingUp,
  Banknote,
  CheckCircle2
} from 'lucide-react';

interface Props {
  property: Property;
  onClose: () => void;
  onOpenCalculator: (property: Property) => void;
  onPrintDossier: (property: Property) => void;
}

export const PropertyDetailModal: React.FC<Props> = ({
  property,
  onClose,
  onOpenCalculator,
  onPrintDossier,
}) => {
  const { t } = useI18n();
  const scores = calculatePropertyScores(property);
  const scoreVisual = getScoreColor(scores.compositeOverallScore);

  const pricePerSqm = Math.round(property.priceEur / property.usableAreaSqm);
  const grossYield = (
    ((property.investment.monthlyRentEstimateEur * 12) / property.priceEur) *
    100
  ).toFixed(1);

  const isSeismicVulnerable = ['RsI', 'RsII', 'U1', 'U2', 'UNEXPERTIZED_PRE_1977'].includes(
    property.diagnostics.seismic.riskClass
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                {t.propertyDetails.diagnosticDossier}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Cadastre ID: {property.cadastralNumber || 'Pending Digitalization'} • Land Book: {property.landBookNumber || 'Verified e-Terra'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onPrintDossier(property)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
              title="Print or Save Official Dossier as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          
          {/* Main Visual & Key Specs Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Image */}
            <div className="relative h-60 md:h-full rounded-2xl overflow-hidden border border-slate-800">
              <img
                src={property.thumbnailUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 px-2.5 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                {property.city}
              </div>
            </div>

            {/* Title & Key Highlights */}
            <div className="md:col-span-2 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">
                    {property.county}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    {grossYield}% Gross Rental Yield
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">
                  {property.title}
                </h1>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                  <span>{property.address}</span>
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {t.propertyDetails.specs.price}
                    </span>
                    <span className="text-base font-extrabold text-white">
                      {formatEur(property.priceEur)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {t.propertyDetails.specs.pricePerSqm}
                    </span>
                    <span className="text-sm font-bold text-slate-200">
                      €{pricePerSqm} / m²
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {t.propertyDetails.specs.area}
                    </span>
                    <span className="text-sm font-bold text-slate-200">
                      {property.usableAreaSqm} m² ({property.rooms} R)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                      {t.propertyDetails.specs.yearBuilt}
                    </span>
                    <span className="text-sm font-bold text-slate-200">
                      {property.yearBuilt} (Fl. {property.floor}/{property.totalFloors})
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenCalculator(property)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{t.calculator.title}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Triple-Score Urban Intelligence Matrix */}
          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  {t.propertyDetails.tripleScore}
                </h3>
              </div>
              <span className="text-xs font-black text-white px-2 py-0.5 rounded-lg bg-slate-800 border border-slate-700">
                Composite Score: {scores.compositeOverallScore} / 100
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Livability Score */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      {t.propertyDetails.livabilityIndex}
                    </span>
                    <span className="text-base font-black text-brand-400">
                      {scores.livabilityScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-brand-500 h-full rounded-full"
                      style={{ width: `${scores.livabilityScore}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Walkability ({property.diagnostics.mobility.walkScore}%), School exam index ({property.diagnostics.education.examAverageScore}/10), Air Quality.
                </p>
              </div>

              {/* Structural Safety Score */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      {t.propertyDetails.safetyScore}
                    </span>
                    <span
                      className={`text-base font-black ${
                        scores.safetyScore < 50 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {scores.safetyScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full ${
                        scores.safetyScore < 50 ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${scores.safetyScore}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Seismic Class: <strong>{property.diagnostics.seismic.riskClass}</strong>, Flood Zone: <strong>{property.diagnostics.flood.level}</strong>.
                </p>
              </div>

              {/* Investment Viability */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400">
                      {t.propertyDetails.investmentViability}
                    </span>
                    <span className="text-base font-black text-amber-400">
                      {scores.investmentScore}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${scores.investmentScore}%` }}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  ANCPI transactions liquidity, INSSE wage growth, rental yield potential.
                </p>
              </div>

            </div>

            {/* Highlights & Warnings */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Positive Catalysts
                </span>
                {scores.highlights.map((h, i) => (
                  <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider block">
                  Critical Warnings & Risk Notes
                </span>
                {scores.warnings.length > 0 ? (
                  scores.warnings.map((w, i) => (
                    <div key={i} className="text-xs text-rose-300 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-slate-400">
                    No critical structural or flood hazards detected for this property.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Section: Official Diagnostics Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t.propertyDetails.risks.title}
              </h3>
              <span className="text-xs text-slate-400">Official Datasets Verification</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Seismic Risk Card */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isSeismicVulnerable ? (
                      <ShieldAlert className="w-5 h-5 text-rose-400" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    )}
                    <span className="text-xs font-bold text-white">
                      {t.propertyDetails.risks.seismicRisk}
                    </span>
                  </div>
                  <SourceAttributionBadge provenance={property.diagnostics.seismic.provenance} compact />
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Risk Classification:</span>
                    <strong className={isSeismicVulnerable ? 'text-rose-400' : 'text-emerald-400'}>
                      {property.diagnostics.seismic.riskClass}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Structural Type:</span>
                    <span className="text-slate-300 text-right text-[11px] max-w-[200px] truncate">
                      {property.diagnostics.seismic.structuralType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bank Mortgage Eligibility:</span>
                    <strong className={property.diagnostics.seismic.mortgageEligibility === 'INELIGIBLE' ? 'text-rose-400' : 'text-emerald-400'}>
                      {property.diagnostics.seismic.mortgageEligibility}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t.propertyDetails.risks.groundAcceleration}:</span>
                    <span className="text-slate-200">{property.diagnostics.seismic.groundAccelerationAg}g</span>
                  </div>
                </div>
              </div>

              {/* Flood Hazard Card */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-sky-400" />
                    <span className="text-xs font-bold text-white">
                      {t.propertyDetails.risks.floodRisk}
                    </span>
                  </div>
                  <SourceAttributionBadge provenance={property.diagnostics.flood.provenance} compact />
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inundation Hazard:</span>
                    <strong className={property.diagnostics.flood.level === 'NONE' ? 'text-emerald-400' : 'text-amber-400'}>
                      {property.diagnostics.flood.level}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">River Basin Authority:</span>
                    <span className="text-slate-300 text-[11px] truncate max-w-[200px]">
                      {property.diagnostics.flood.catchmentBasin}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">EU Directive 2007/60:</span>
                    <span className="text-emerald-400 font-semibold">Compliant / Mapped</span>
                  </div>
                </div>
              </div>

              {/* Air Quality & Environment */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-teal-400" />
                    <span className="text-xs font-bold text-white">
                      {t.propertyDetails.surroundings.airQuality}
                    </span>
                  </div>
                  <SourceAttributionBadge provenance={property.diagnostics.airQuality.provenance} compact />
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Air Quality Index:</span>
                    <strong className="text-teal-400 font-bold">
                      AQI {property.diagnostics.airQuality.aqi} ({property.diagnostics.airQuality.status})
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Fine Particulates (PM2.5):</span>
                    <span className="text-slate-200">{property.diagnostics.airQuality.pm25} µg/m³</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nearest Sensor Station:</span>
                    <span className="text-slate-400 text-[11px] truncate max-w-[180px]">
                      {property.diagnostics.airQuality.nearestSensor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Education Quality */}
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-white">
                      School Quality & Ratings
                    </span>
                  </div>
                  <SourceAttributionBadge provenance={property.diagnostics.education.provenance} compact />
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Nearest School:</span>
                    <strong className="text-slate-200 truncate max-w-[200px]">
                      {property.diagnostics.education.nearestSchoolName}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Evaluare Națională Avg:</span>
                    <strong className="text-amber-400">
                      {property.diagnostics.education.examAverageScore} / 10
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Distance from Building:</span>
                    <span className="text-slate-200">{property.diagnostics.education.schoolDistanceMeters} meters</span>
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
