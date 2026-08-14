import React, { useState } from 'react';
import { 
  Building2, 
  Map, 
  Layers, 
  Calculator, 
  Database, 
  Globe, 
  Activity, 
  CheckCircle2, 
  FileText,
  ChevronDown,
  Link2,
  Scale,
  Sparkles,
  Search
} from 'lucide-react';
import { useI18n } from '../i18n';
import { Language } from '../types';

interface Props {
  activeTab: 'listingAnalyzer' | 'sellVsRent' | 'calculator' | 'map' | 'properties' | 'openDataHub';
  setActiveTab: (tab: 'listingAnalyzer' | 'sellVsRent' | 'calculator' | 'map' | 'properties' | 'openDataHub') => void;
  openSyncModal: () => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
];

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab, openSyncModal }) => {
  const { language, setLanguage, t } = useI18n();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('listingAnalyzer')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                  ROI<span className="text-brand-400">mob</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider uppercase bg-brand-500/20 text-brand-300 rounded border border-brand-500/30">
                  OLX • Imobiliare • data.gov.ro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Real Estate Decision & Risk Intelligence Platform
              </p>
            </div>
          </div>

          {/* Core Pillar Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            
            {/* Pillar 1: Listing Analyzer */}
            <button
              onClick={() => setActiveTab('listingAnalyzer')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'listingAnalyzer'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 ring-1 ring-brand-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-brand-300" />
              <span>Listing Analyzer & Audit</span>
            </button>

            {/* Pillar 2: Sell vs Rent */}
            <button
              onClick={() => setActiveTab('sellVsRent')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'sellVsRent'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 ring-1 ring-brand-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-emerald-300" />
              <span>Sell vs. Rent Optimizer</span>
            </button>

            {/* Pillar 3: ROI & Tax Engine */}
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30 ring-1 ring-brand-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span>ROI & Tax Engine</span>
            </button>

            <div className="w-px h-5 bg-slate-800 mx-1" />

            {/* Supporting Tool: GIS Map */}
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'map'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Map className="w-3.5 h-3.5 text-slate-400" />
              <span>GIS Risk Map</span>
            </button>

            {/* Supporting Tool: Open Data Hub */}
            <button
              onClick={() => setActiveTab('openDataHub')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'openDataHub'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-slate-400" />
              <span>Open Data Hub</span>
            </button>
          </nav>

          {/* Right Actions: Data Freshness Badge & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Data Sync Button */}
            <button
              type="button"
              onClick={openSyncModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-xs font-medium transition-all group"
              title="Click to view live government data sync status"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden xl:inline text-[11px] font-bold">Live Data Active</span>
              <Activity className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline font-bold">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl py-1.5 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        language === lang.code
                          ? 'bg-brand-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </div>
                      {language === lang.code && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
      
      {/* Mobile / Tablet Sub-Nav */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-slate-800/80 gap-2 bg-slate-950 text-xs">
        <button
          onClick={() => setActiveTab('listingAnalyzer')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'listingAnalyzer' ? 'bg-brand-600 text-white' : 'text-slate-300 bg-slate-900'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-brand-300" />
          <span>Listing Analyzer</span>
        </button>
        <button
          onClick={() => setActiveTab('sellVsRent')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'sellVsRent' ? 'bg-brand-600 text-white' : 'text-slate-300 bg-slate-900'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-emerald-300" />
          <span>Sell vs. Rent</span>
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
            activeTab === 'calculator' ? 'bg-brand-600 text-white' : 'text-slate-300 bg-slate-900'
          }`}
        >
          <Calculator className="w-3.5 h-3.5 text-amber-300" />
          <span>ROI & Taxes</span>
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap ${
            activeTab === 'map' ? 'bg-slate-800 text-white' : 'text-slate-400 bg-slate-900'
          }`}
        >
          <Map className="w-3.5 h-3.5" />
          <span>GIS Map</span>
        </button>
      </div>
    </header>
  );
};
