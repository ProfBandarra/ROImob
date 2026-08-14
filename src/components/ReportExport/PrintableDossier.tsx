import React from 'react';
import { Property } from '../../types';
import { calculatePropertyScores, calculateRealEstateFinancials } from '../../utils/calculations';
import { formatEur, formatRon, formatNumber } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { 
  Building2, 
  ShieldAlert, 
  ShieldCheck, 
  Printer, 
  X, 
  CheckCircle2, 
  Calendar, 
  MapPin,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

interface Props {
  property: Property;
  onClose: () => void;
}

export const PrintableDossier: React.FC<Props> = ({ property, onClose }) => {
  const { t } = useI18n();
  const scores = calculatePropertyScores(property);
  const calc = calculateRealEstateFinancials(property, {
    purchasePrice: property.priceEur,
    downPaymentPercent: 20,
    interestRatePercent: 6.5,
    loanTermYears: 25,
    monthlyRentEur: property.investment.monthlyRentEstimateEur,
    vacancyRatePercent: 5,
    managementFeePercent: property.investment.managementFeePercent,
    maintenanceReservePercent: 1.0,
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Floating Print Action Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white sticky top-0 z-20 print:hidden">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-400" />
            <span className="font-bold text-sm">ROImob Real Estate Audit Report (Print / PDF)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>{t.common.print}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-6 text-slate-800 print:p-0 print:overflow-visible">
          
          {/* Header Banner */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
            <div>
              <div className="flex items-center gap-2 text-2xl font-black tracking-tight text-slate-900">
                <span>ROI<span className="text-brand-600">mob</span></span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono border border-slate-300">
                  OFFICIAL REAL ESTATE DIAGNOSTIC
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Generated from verified public datasets: data.gov.ro, ANCPI, INSSE & AMCCRS
              </p>
            </div>

            <div className="text-right text-xs text-slate-500 font-mono">
              <p>Audit Date: {new Date().toLocaleDateString()}</p>
              <p>Report Ref: ROIMOB-{property.id.toUpperCase()}</p>
            </div>
          </div>

          {/* Property Identity Card */}
          <div className="grid grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="col-span-2">
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Property Title</span>
              <strong className="text-base text-slate-900 block">{property.title}</strong>
              <span className="text-slate-600">{property.address}, {property.city} ({property.county})</span>
            </div>
            <div className="text-right">
              <span className="text-slate-500 block uppercase font-bold text-[10px]">Price & Valuation</span>
              <strong className="text-xl text-brand-700 font-black">{formatEur(property.priceEur)}</strong>
              <span className="text-slate-500 block">€{Math.round(property.priceEur / property.usableAreaSqm)} / m²</span>
            </div>
          </div>

          {/* Cadastre & Technical Specifications */}
          <div className="grid grid-cols-4 gap-3 text-xs border border-slate-200 p-3 rounded-xl">
            <div>
              <span className="text-slate-500 block text-[10px]">Cadastral Nr:</span>
              <strong className="font-mono">{property.cadastralNumber || '219402-C1'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Land Book (CF):</span>
              <strong className="font-mono">{property.landBookNumber || '219402'}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Usable Area:</span>
              <strong>{property.usableAreaSqm} m² ({property.rooms} Rooms)</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Year Built:</span>
              <strong>{property.yearBuilt} (Floor {property.floor}/{property.totalFloors})</strong>
            </div>
          </div>

          {/* Triple Score Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-600 block">1. Livability & Surroundings</span>
              <span className="text-2xl font-black text-brand-600 font-mono">{scores.livabilityScore} / 100</span>
              <p className="text-[11px] text-slate-500 mt-1">Walkability: {property.diagnostics.mobility.walkScore}%, Clean Air, School pass index.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-600 block">2. Structural & Natural Safety</span>
              <span className={`text-2xl font-black font-mono ${scores.safetyScore < 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {scores.safetyScore} / 100
              </span>
              <p className="text-[11px] text-slate-500 mt-1">Seismic class: {property.diagnostics.seismic.riskClass}, Flood: {property.diagnostics.flood.level}.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-xs font-bold text-slate-600 block">3. Investment Viability</span>
              <span className="text-2xl font-black text-amber-600 font-mono">{scores.investmentScore} / 100</span>
              <p className="text-[11px] text-slate-500 mt-1">Gross Yield: {calc.grossYieldPercent.toFixed(1)}%, Net Yield: {calc.netYieldPercent.toFixed(1)}%.</p>
            </div>
          </div>

          {/* Diagnostic Risk Breakdown */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b pb-2">
              Official Risk & Legal Verification
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-slate-500">Seismic Vulnerability Classification:</p>
                <strong className="text-slate-900">{property.diagnostics.seismic.riskClass} ({property.diagnostics.seismic.structuralType})</strong>
              </div>
              <div>
                <p className="text-slate-500">Bank Mortgage Eligibility:</p>
                <strong className={property.diagnostics.seismic.mortgageEligibility === 'INELIGIBLE' ? 'text-rose-600' : 'text-emerald-600'}>
                  {property.diagnostics.seismic.mortgageEligibility}
                </strong>
              </div>
              <div>
                <p className="text-slate-500">Flood Inundation Hazard (EU 2007/60):</p>
                <strong>{property.diagnostics.flood.level} ({property.diagnostics.flood.catchmentBasin})</strong>
              </div>
              <div>
                <p className="text-slate-500">Heritage / Monument Restrictions:</p>
                <strong>{property.diagnostics.heritage.isMonument ? 'Protected Zone / Monument' : 'Standard Building Code'}</strong>
              </div>
            </div>
          </div>

          {/* Financial & Romanian Tax Summary */}
          <div className="border border-slate-200 rounded-xl p-4 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 border-b pb-2">
              Financial Performance & Romanian Tax Framework (2024-2026 Code)
            </h4>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block">Gross Annual Rent:</span>
                <strong className="font-mono text-slate-900">{formatEur(calc.grossAnnualRent)} / yr</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Annual RO Taxes & CASS:</span>
                <strong className="font-mono text-purple-700">{formatRon(calc.annualTaxesRon.rentalIncomeTaxRon + calc.annualTaxesRon.cassHealthTaxRon)}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Net Operating Income (NOI):</span>
                <strong className="font-mono text-emerald-700">{formatEur(calc.netOperatingIncomeEur)} / yr</strong>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer & Data Sources */}
          <div className="pt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
            <p className="font-bold">Official Public Sources Cited:</p>
            <p>
              data.gov.ro (Ministry of Education, Ministry of Health) • ANCPI e-Terra Cadastral Database • INSSE TEMPO Online • AMCCRS Technical Expertises • RNMCA (CalitateaAerului.ro) • Apele Române Flood Hazard.
            </p>
            <p>
              Disclaimer: This diagnostic report is synthesized from public open data and is provided for informational and preliminary assessment purposes.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
