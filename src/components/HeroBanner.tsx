import React from 'react';
import { Search, MapPin, Sparkles, Building, BarChart3, ShieldAlert } from 'lucide-react';
import { useI18n } from '../i18n';

interface Props {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  availableCities: string[];
}

export const HeroBanner: React.FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  availableCities,
}) => {
  const { t } = useI18n();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-b border-slate-800 py-8 sm:py-12">
      {/* Decorative gradient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-brand-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {t.hero.title}{' '}
            <span className="bg-gradient-to-r from-brand-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Search & Filter Bar */}
          <div className="bg-slate-800/90 p-2 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            
            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full bg-slate-900/80 border border-slate-700 text-slate-100 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-500"
              />
            </div>

            {/* City Selector */}
            <div className="relative sm:w-56">
              <MapPin className="w-4 h-4 text-brand-400 absolute left-3 top-3.5 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-slate-900/80 border border-slate-700 text-slate-100 text-sm rounded-xl pl-9 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="ALL">{t.hero.allCities}</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-4xl mx-auto text-left">
            
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{t.hero.quickStats.sourcesIndexed}</p>
                <p className="text-sm font-bold text-white">data.gov.ro / ANCPI</p>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{t.hero.quickStats.seismicBuildings}</p>
                <p className="text-sm font-bold text-white">AMCCRS & MDLPA</p>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">{t.hero.quickStats.cadastralRecords}</p>
                <p className="text-sm font-bold text-white">42 Counties Synced</p>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Romanian Fiscal Engine</p>
                <p className="text-sm font-bold text-emerald-400">2024-2026 CASS & Yield</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
