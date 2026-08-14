import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Calculator, 
  CheckCircle2, 
  ChevronDown, 
  Sparkles,
  Home
} from 'lucide-react';
import { useI18n } from '../i18n';
import { Language } from '../types';

interface Props {
  activeTab: 'home' | 'sellVsRent' | 'calculator';
  setActiveTab: (tab: 'home' | 'sellVsRent' | 'calculator') => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t } = useI18n();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/20">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight text-white font-sans">
                  ROI<span className="bg-gradient-to-r from-brand-400 to-indigo-300 bg-clip-text text-transparent">mob</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-brand-500/10 text-brand-300 rounded-full border border-brand-500/30">
                  Calculators Suite
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Calculator Suite Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            
            {/* Tab 0: Home / Overview */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/30 ring-1 ring-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Home className="w-4 h-4 text-brand-300" />
              <span>{t.nav.home}</span>
            </button>

            {/* Tab 1: Sell vs Rent Optimizer */}
            <button
              onClick={() => setActiveTab('sellVsRent')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 ${
                activeTab === 'sellVsRent'
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/30 ring-1 ring-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.sellVsRent}</span>
            </button>

            {/* Tab 2: ROI & Fiscal Engine */}
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/30 ring-1 ring-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{t.nav.calculator}</span>
            </button>
          </nav>

          {/* Right Actions: 5-Language Switcher */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors shadow-sm"
              >
                <span>{currentLang.flag}</span>
                <span className="font-mono">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
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
    </header>
  );
};
