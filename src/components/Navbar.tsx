import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Calculator, 
  CheckCircle2, 
  ChevronDown, 
  Home,
  Palette,
  Sun,
  Moon,
  Eye,
  TreePine
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';
import { Language, Theme } from '../types';

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
  const { theme, setTheme, themeConfig } = useTheme();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: 'midnight', label: t.theme.midnight, icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'corporate', label: t.theme.corporate, icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { id: 'emerald', label: t.theme.emerald, icon: <TreePine className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'accessibility', label: t.theme.accessibility, icon: <Eye className="w-3.5 h-3.5 text-yellow-400" /> },
  ];

  const currentThemeObj = THEMES.find((th) => th.id === theme) || THEMES[0];

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 ${themeConfig.headerBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/20">
              <Building2 className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-sm animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-2xl tracking-tight font-sans">
                  ROI<span className="bg-gradient-to-r from-brand-400 to-indigo-400 bg-clip-text text-transparent">mob</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-brand-500/10 text-brand-400 rounded-full border border-brand-500/30">
                  Suite 2026
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
                {t.appTagline}
              </p>
            </div>
          </div>

          {/* Calculator Suite Navigation Tabs */}
          <nav className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-slate-800/60 bg-slate-900/60 shadow-inner">
            
            {/* Tab 0: Home / Overview */}
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 ring-1 ring-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4 text-brand-300" />
              <span className="hidden md:inline">{t.nav.home}</span>
            </button>

            {/* Tab 1: Sell vs Rent Optimizer */}
            <button
              type="button"
              onClick={() => setActiveTab('sellVsRent')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'sellVsRent'
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 ring-1 ring-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>{t.nav.sellVsRent}</span>
            </button>

            {/* Tab 2: ROI & Fiscal Engine */}
            <button
              type="button"
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 ring-1 ring-white/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>{t.nav.calculator}</span>
            </button>
          </nav>

          {/* Right Actions: Theme Selector & 6-Language Switcher */}
          <div className="flex items-center gap-2.5">
            
            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-label={t.theme.label}
                aria-haspopup="true"
                aria-expanded={themeDropdownOpen}
                onClick={() => {
                  setThemeDropdownOpen(!themeDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors shadow-sm cursor-pointer"
                title={t.theme.label}
              >
                {currentThemeObj.icon}
                <span className="hidden lg:inline text-[11px]">{currentThemeObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                    {t.theme.label}
                  </div>
                  {THEMES.map((th) => (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() => {
                        setTheme(th.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                        theme === th.id
                          ? 'bg-brand-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {th.icon}
                        <span>{th.label}</span>
                      </div>
                      {theme === th.id && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                aria-label="Language selection"
                aria-haspopup="true"
                aria-expanded={langDropdownOpen}
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setThemeDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors shadow-sm cursor-pointer"
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
                      type="button"
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
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
