import React, { useState } from 'react';
import { Property } from '../../types';
import { calculatePropertyScores } from '../../utils/calculations';
import { formatEur, getScoreColor } from '../../utils/formatters';
import { SourceAttributionBadge } from '../SourceAttributionBadge';
import { useI18n } from '../../i18n';
import { evaluateLiveListingUrl, ScrapingProgress } from '../../services/listingScraper';
import { 
  Search, 
  Link2, 
  Sparkles, 
  Building2, 
  ShieldAlert, 
  ShieldCheck, 
  TrendingUp, 
  GraduationCap, 
  Wind, 
  Calculator, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  FileCheck2,
  Tag,
  Loader2,
  Globe2
} from 'lucide-react';

interface Props {
  onAnalyzeListing: (property: Property) => void;
  onOpenCalculator: (property: Property) => void;
}

const SAMPLE_REAL_URLS = [
  {
    name: 'București Floreasca (Imobiliare.ro)',
    url: 'https://www.imobiliare.ro/vanzare-apartamente/bucuresti/floreasca/apartament-de-vanzare-2-camere-XB7K1001',
    platform: 'Imobiliare.ro'
  },
  {
    name: 'Cluj-Napoca Mărăști (OLX.ro)',
    url: 'https://www.olx.ro/d/oferta/proprietar-vand-apartament-3-camere-marasti-iulius-mall-IDhQ94x.html',
    platform: 'OLX.ro'
  },
  {
    name: 'Brașov Centru Istoric (Storia.ro)',
    url: 'https://www.storia.ro/ro/oferta/garsoniera-moderna-centru-istoric-brasov-ID998k.html',
    platform: 'Storia.ro'
  }
];

export const ListingUrlImporter: React.FC<Props> = ({ onAnalyzeListing, onOpenCalculator }) => {
  const { t } = useI18n();
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProgress, setCurrentProgress] = useState<ScrapingProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analyzedProperty, setAnalyzedProperty] = useState<Property | null>(null);

  const handleStartRealtimeEvaluation = async (overrideUrl?: string) => {
    const targetUrl = overrideUrl || urlInput.trim();
    if (!targetUrl) {
      setErrorMessage('Please enter or paste a valid URL from OLX.ro, Imobiliare.ro, or Storia.ro.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setCurrentProgress({ step: 'FETCHING', message: 'Initiating live connection to listing server...' });

    try {
      const result = await evaluateLiveListingUrl(targetUrl, (prog) => {
        setCurrentProgress(prog);
      });
      setAnalyzedProperty(result);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to fetch or evaluate live listing. Please check the link and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const scores = analyzedProperty ? calculatePropertyScores(analyzedProperty) : null;
  const scoreVisual = scores ? getScoreColor(scores.compositeOverallScore) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Globe2 className="w-3.5 h-3.5 text-brand-400" />
            <span>100% Real-Time Live Scraper & Official Registry Validator</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {t.listingAnalyzer.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.listingAnalyzer.subtitle}
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-700 text-xs space-y-1.5 shrink-0">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Source-Verifiable Data Only</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Directly cross-checks AMCCRS, ANCPI, OpenStreetMap & Open-Meteo live streams.
          </p>
        </div>
      </div>

      {/* Input URL Bar */}
      <div className="bg-slate-900/90 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleStartRealtimeEvaluation();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Link2 className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="url"
              required
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder={t.listingAnalyzer.urlInputPlaceholder}
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-2xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono placeholder:font-sans placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all disabled:opacity-50 shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isLoading ? t.listingAnalyzer.analyzing : t.listingAnalyzer.analyzeButton}</span>
          </button>
        </form>

        {/* Live Execution Progress Bar */}
        {isLoading && currentProgress && (
          <div className="p-4 bg-slate-950 rounded-2xl border border-brand-500/40 space-y-2 animate-pulse">
            <div className="flex items-center justify-between text-xs">
              <span className="text-brand-300 font-bold flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-400" />
                <span>{currentProgress.message}</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                {currentProgress.step}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-brand-500 h-full rounded-full transition-all duration-300"
                style={{
                  width: currentProgress.step === 'FETCHING' ? '20%' :
                         currentProgress.step === 'PARSING_SPECS' ? '40%' :
                         currentProgress.step === 'GEOCODING' ? '65%' :
                         currentProgress.step === 'LIVE_AIR_QUALITY' ? '85%' :
                         currentProgress.step === 'SEISMIC_AUDIT' ? '95%' : '100%'
                }}
              />
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Quick Sample Real Links */}
        <div className="pt-2 border-t border-slate-800/80">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            {t.listingAnalyzer.quickSampleOffers}
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_REAL_URLS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUrlInput(sample.url);
                  handleStartRealtimeEvaluation(sample.url);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors"
              >
                <Tag className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-brand-300 font-bold">[{sample.platform}]</span>
                <span className="truncate max-w-[220px]">{sample.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Extracted Offer Diagnostic Dossier */}
      {analyzedProperty && scores && scoreVisual && (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6">
          
          {/* Top Banner: Marketplace Source + Verification Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Source: {analyzedProperty.sourcePlatform || 'Live Scraped URL'}
              </span>
              <span className="text-xs text-slate-400">
                Verified against <strong>data.gov.ro</strong> & <strong>ANCPI</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {analyzedProperty.sourceListingUrl && (
                <a
                  href={analyzedProperty.sourceListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <span>Open Original Announce</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <button
                type="button"
                onClick={() => onAnalyzeListing(analyzedProperty)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                <span>View Full Diagnostic Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenCalculator(analyzedProperty)}
                className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Simulate ROI</span>
              </button>
            </div>
          </div>

          {/* Property Identity Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Image */}
            <div className="lg:col-span-4 h-56 lg:h-auto rounded-2xl overflow-hidden border border-slate-800 relative">
              <img
                src={analyzedProperty.thumbnailUrl}
                alt={analyzedProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-950/90 px-2.5 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                {analyzedProperty.city}
              </div>
            </div>

            {/* Core Specs & Official Verification */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <h2 className="text-xl font-extrabold text-white mb-1">
                  {analyzedProperty.title}
                </h2>
                <p className="text-xs text-slate-400">
                  {analyzedProperty.address}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Asking Price</span>
                  <strong className="text-lg font-black text-white font-mono">{formatEur(analyzedProperty.priceEur)}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Price / m²</span>
                  <strong className="text-sm font-bold text-slate-200 font-mono">
                    €{Math.round(analyzedProperty.priceEur / analyzedProperty.usableAreaSqm)}/m²
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Usable Area</span>
                  <strong className="text-sm font-bold text-slate-200">{analyzedProperty.usableAreaSqm} m² ({analyzedProperty.rooms} R)</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Year Built</span>
                  <strong className="text-sm font-bold text-slate-200">{analyzedProperty.yearBuilt} (Fl. {analyzedProperty.floor}/{analyzedProperty.totalFloors})</strong>
                </div>
              </div>

              {/* Triple Score Preview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Livability</span>
                  <strong className="text-base font-black text-brand-400">{scores.livabilityScore}/100</strong>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Structural Safety</span>
                  <strong className={`text-base font-black ${scores.safetyScore < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {scores.safetyScore}/100
                  </strong>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Investment Yield</span>
                  <strong className="text-base font-black text-amber-400">{scores.investmentScore}/100</strong>
                </div>
              </div>

            </div>

          </div>

          {/* Official Registry Cross-Checks Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            
            {/* Seismic Verification */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  {analyzedProperty.diagnostics.seismic.riskClass.includes('Rs') || analyzedProperty.diagnostics.seismic.riskClass.includes('PRE_1977') ? (
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>AMCCRS Seismic Audit</span>
                </div>
                <SourceAttributionBadge provenance={analyzedProperty.diagnostics.seismic.provenance} compact />
              </div>
              <p className="text-xs">
                Classification: <strong className="text-white">{analyzedProperty.diagnostics.seismic.riskClass}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Structure: {analyzedProperty.diagnostics.seismic.structuralType}
              </p>
            </div>

            {/* School Quality */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>Education Rating</span>
                </div>
                <SourceAttributionBadge provenance={analyzedProperty.diagnostics.education.provenance} compact />
              </div>
              <p className="text-xs">
                School: <strong className="text-white truncate block">{analyzedProperty.diagnostics.education.nearestSchoolName}</strong>
              </p>
              <p className="text-[11px] text-amber-400 font-bold">
                Exam Average: {analyzedProperty.diagnostics.education.examAverageScore} / 10
              </p>
            </div>

            {/* Air Quality */}
            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                  <Wind className="w-4 h-4 text-teal-400" />
                  <span>RNMCA Air Quality</span>
                </div>
                <SourceAttributionBadge provenance={analyzedProperty.diagnostics.airQuality.provenance} compact />
              </div>
              <p className="text-xs">
                Sensor AQI: <strong className="text-teal-400 font-bold">{analyzedProperty.diagnostics.airQuality.aqi} ({analyzedProperty.diagnostics.airQuality.status})</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                PM2.5: {analyzedProperty.diagnostics.airQuality.pm25} µg/m³
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
