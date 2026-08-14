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
  TreePine,
  Menu,
  X,
  Globe,
  Coins,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';
import { useCurrency } from '../currency';
import { Language, Theme, CalculatorMode } from '../types';

interface Props {
  activeTab: 'home' | 'sellVsRent' | 'calculator';
  setActiveTab: (tab: 'home' | 'sellVsRent' | 'calculator') => void;
  calculatorMode: CalculatorMode;
  setCalculatorMode: (mode: CalculatorMode) => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
];

export const Navbar: React.FC<Props> = ({ 
  activeTab, 
  setActiveTab,
  calculatorMode,
  setCalculatorMode
}) => {
  const { language, setLanguage, t } = useI18n();
  const { theme, setTheme, themeConfig } = useTheme();
  const { currency, setCurrency, currencies, currentConfig } = useCurrency();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
    { id: 'midnight', label: t.theme.midnight, icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { id: 'corporate', label: t.theme.corporate, icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { id: 'emerald', label: t.theme.emerald, icon: <TreePine className="w-4 h-4 text-emerald-400" /> },
    { id: 'accessibility', label: t.theme.accessibility, icon: <Eye className="w-4 h-4 text-yellow-400" /> },
  ];

  const currentThemeObj = THEMES.find((th) => th.id === theme) || THEMES[0];

  const handleNavClick = (tab: 'home' | 'sellVsRent' | 'calculator') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-200 ${themeConfig.headerBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-all duration-300 ring-1 ring-white/20 shrink-0">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 rounded-full border-2 border-slate-900 shadow-sm animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className={`font-black text-xl sm:text-2xl tracking-tight font-sans ${themeConfig.textPrimary}`}>
                    ROI<span className="bg-gradient-to-r from-brand-400 to-indigo-400 bg-clip-text text-transparent">mob</span>
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black tracking-wider uppercase bg-brand-500/10 text-brand-400 rounded-full border border-brand-500/30">
                    2026
                  </span>
                </div>
                <p className={`text-[10px] sm:text-[11px] font-medium ${themeConfig.textSecondary} hidden lg:block`}>
                  {t.appTagline}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden xl:flex items-center gap-1.5 p-1.5 rounded-2xl border border-slate-800/60 bg-slate-900/60 shadow-inner shrink-0">
              
              {/* Tab 0: Home / Overview */}
              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'home'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 ring-1 ring-white/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                <span>{t.nav.home}</span>
              </button>

              {/* Tab 1: Sell vs Rent Optimizer */}
              <button
                type="button"
                onClick={() => handleNavClick('sellVsRent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'sellVsRent'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 ring-1 ring-white/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.nav.sellVsRent}</span>
              </button>

              {/* Tab 2: ROI & Fiscal Engine */}
              <button
                type="button"
                onClick={() => handleNavClick('calculator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  activeTab === 'calculator'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/30 ring-1 ring-white/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.nav.calculator}</span>
              </button>
            </nav>

            {/* Desktop Actions: Mode Switcher, Currency, Theme & Language */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
              
              {/* Mode Toggle (Quick ⚡ vs Pro 🔬) */}
              <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-sm text-xs font-bold shrink-0">
                <button
                  type="button"
                  onClick={() => setCalculatorMode('simple')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    calculatorMode === 'simple'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={t.mode.quickDesc}
                >
                  <span>⚡</span>
                  <span>{t.mode.quick}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCalculatorMode('pro')}
                  className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                    calculatorMode === 'pro'
                      ? 'bg-brand-600 text-white shadow-sm font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={t.mode.proDesc}
                >
                  <span>🔬</span>
                  <span>{t.mode.pro}</span>
                </button>
              </div>

              {/* Multi-Currency Dropdown (EUR, RON, USD, GBP, CHF) */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  aria-label={t.currencyLabel}
                  aria-haspopup="true"
                  aria-expanded={currencyDropdownOpen}
                  onClick={() => {
                    setCurrencyDropdownOpen(!currencyDropdownOpen);
                    setThemeDropdownOpen(false);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono font-bold text-slate-200 transition-colors shadow-sm cursor-pointer"
                  title={`${t.currencyLabel}: ${currentConfig.name} (${currentConfig.symbol})`}
                >
                  <span className="text-brand-400 font-bold">{currentConfig.symbol}</span>
                  <span className="font-mono">{currency}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {currencyDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-1.5 text-[10px] font-black text-brand-300 uppercase tracking-wider border-b border-slate-800 mb-1 flex items-center justify-between">
                      <span>{t.currencyLabel}</span>
                      <span className="text-slate-400 text-[9px] font-normal">BNR Ref</span>
                    </div>
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setCurrency(c.code);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors cursor-pointer ${
                          currency === c.code
                            ? 'bg-brand-600 text-white font-bold'
                            : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-brand-400 w-5 text-center">{c.symbol}</span>
                          <span className="font-mono font-bold">{c.code}</span>
                          <span className="text-[11px] text-slate-400">({c.name})</span>
                        </div>
                        {currency === c.code && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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
                    setCurrencyDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border-2 border-brand-500/40 hover:border-brand-400 text-xs font-bold text-white transition-all shadow-md cursor-pointer"
                  title={`${t.theme.label}: ${currentThemeObj.label}`}
                >
                  <Palette className="w-4 h-4 text-brand-400 shrink-0" />
                  <span className="hidden lg:inline text-xs font-semibold">{currentThemeObj.label}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {themeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-1.5 text-[10px] font-black text-brand-300 uppercase tracking-wider border-b border-slate-800 mb-1 flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" />
                      <span>{t.theme.label}</span>
                    </div>
                    {THEMES.map((th) => (
                      <button
                        key={th.id}
                        type="button"
                        onClick={() => {
                          setTheme(th.id);
                          setThemeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                          theme === th.id
                            ? 'bg-brand-600 text-white font-bold'
                            : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1 rounded-lg bg-slate-800 border border-slate-700">
                            {th.icon}
                          </div>
                          <span>{th.label}</span>
                        </div>
                        {theme === th.id && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
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
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors shadow-sm cursor-pointer"
                >
                  <span>{currentLang.flag}</span>
                  <span className="font-mono">{currentLang.code.toUpperCase()}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3.5 py-1.5 text-[10px] font-black text-brand-300 uppercase tracking-wider border-b border-slate-800 mb-1">
                      Language / Limbă
                    </div>
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
                            : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </div>
                        {language === lang.code && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Support / Donate Dropdown (Buy Me a Coffee & Revolut) */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  aria-label="Support Project"
                  aria-haspopup="true"
                  aria-expanded={supportDropdownOpen}
                  onClick={() => {
                    setSupportDropdownOpen(!supportDropdownOpen);
                    setCurrencyDropdownOpen(false);
                    setThemeDropdownOpen(false);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 hover:text-white transition-colors shadow-sm cursor-pointer"
                  title="Support ROImob Development"
                >
                  <span className="text-amber-400">☕</span>
                  <span className="hidden xl:inline">{t.nav.supportBtn}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {supportDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1.5">
                    <div className="px-2 py-1 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-800 mb-1">
                      {t.footer.donateBtn}
                    </div>
                    
                    {/* Buy Me a Coffee */}
                    <a
                      href="https://buymeacoffee.com/nbandarra"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSupportDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-colors text-xs font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <span>☕</span>
                        <span>Buy Me a Coffee</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    </a>

                    {/* Revolut */}
                    <a
                      href="https://revolut.me/nbandarra"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setSupportDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 transition-colors text-xs font-bold"
                    >
                      <div className="flex items-center gap-2">
                        <span>💳</span>
                        <span>Revolut Pay</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                    </a>
                  </div>
                )}
              </div>

            </div>

            {/* Mobile Header Quick Actions: Currency + Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              
              {/* Currency quick toggle on mobile */}
              <button
                type="button"
                onClick={() => {
                  const codes = currencies.map(c => c.code);
                  const nextIdx = (codes.indexOf(currency) + 1) % codes.length;
                  setCurrency(codes[nextIdx]);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-brand-400 flex items-center gap-1 shadow-sm cursor-pointer"
                title={`${t.currencyLabel}: ${currentConfig.name} (${currentConfig.symbol})`}
              >
                <span>{currentConfig.symbol}</span>
                <span>{currency}</span>
              </button>

              {/* Hamburger Button */}
              <button
                type="button"
                aria-label="Open mobile menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>

        {/* Mobile Fullscreen Drawer / Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-800 bg-slate-950/98 px-4 py-6 space-y-6 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            
            {/* Mode Selection Row on Mobile */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                {t.mode.switchMode}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalculatorMode('simple')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    calculatorMode === 'simple'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md font-black'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span>⚡</span>
                  <span>{t.mode.quick}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCalculatorMode('pro')}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    calculatorMode === 'pro'
                      ? 'bg-brand-600 text-white border-brand-500 shadow-md font-black'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span>🔬</span>
                  <span>{t.mode.pro}</span>
                </button>
              </div>
            </div>

            {/* 1. Mobile Navigation Links */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                Decision Engines
              </span>

              <button
                type="button"
                onClick={() => handleNavClick('home')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-black shadow-lg shadow-brand-500/25'
                    : 'bg-slate-900/80 text-slate-200 border border-slate-800'
                }`}
              >
                <Home className="w-4 h-4 text-brand-300" />
                <span>{t.nav.home}</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('sellVsRent')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer ${
                  activeTab === 'sellVsRent'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-black shadow-lg shadow-brand-500/25'
                    : 'bg-slate-900/80 text-slate-200 border border-slate-800'
                }`}
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>{t.nav.sellVsRent}</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('calculator')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-left transition-all cursor-pointer ${
                  activeTab === 'calculator'
                    ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-black shadow-lg shadow-brand-500/25'
                    : 'bg-slate-900/80 text-slate-200 border border-slate-800'
                }`}
              >
                <Calculator className="w-4 h-4 text-amber-400" />
                <span>{t.nav.calculator}</span>
              </button>
            </div>

            {/* 2. Theme Selection Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                {t.theme.label}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {THEMES.map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setTheme(th.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      theme === th.id
                        ? 'bg-brand-600 text-white border-brand-500 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    {th.icon}
                    <span className="truncate">{th.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Language Selection Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                Language / Limbă
              </span>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      language === lang.code
                        ? 'bg-brand-600 text-white border-brand-500 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-mono">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Currency Switcher */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                {t.currencyLabel}
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setCurrency(c.code)}
                    className={`p-2.5 rounded-xl border text-xs font-bold font-mono transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
                      currency === c.code
                        ? 'bg-brand-600 text-white border-brand-500 shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="text-sm font-black text-brand-300">{c.symbol}</span>
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Support / Donate Options on Mobile */}
            <div className="pt-2 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2 block">
                {t.footer.donateBtn}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://buymeacoffee.com/nbandarra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all"
                >
                  <span>☕</span>
                  <span>Buy Me a Coffee</span>
                </a>
                <a
                  href="https://revolut.me/nbandarra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-bold transition-all"
                >
                  <span>💳</span>
                  <span>Revolut Pay</span>
                </a>
              </div>
            </div>

            {/* 6. Report Issue Link */}
            <div className="pt-2 border-t border-slate-800 text-center">
              <a
                href="https://github.com/ProfBandarra/ROImob/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{t.footer.reportIssueBtn}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}
      </header>

      {/* Persistent Mobile Bottom Navigation Bar (Ultra-responsive 1-tap thumb navigation) */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t ${themeConfig.headerBg} backdrop-blur-lg px-2 py-2 flex items-center justify-around shadow-2xl safe-area-bottom`}>
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl text-[10.5px] font-bold transition-all ${
            activeTab === 'home'
              ? 'text-brand-400 font-black scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="truncate max-w-[72px]">{t.nav.home}</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('sellVsRent')}
          className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl text-[10.5px] font-bold transition-all ${
            activeTab === 'sellVsRent'
              ? 'text-emerald-400 font-black scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span className="truncate max-w-[85px]">{t.nav.sellVsRent}</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('calculator')}
          className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl text-[10.5px] font-bold transition-all ${
            activeTab === 'calculator'
              ? 'text-amber-400 font-black scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span className="truncate max-w-[85px]">{t.nav.calculator}</span>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl text-[10.5px] font-bold transition-all ${
            mobileMenuOpen
              ? 'text-brand-400 font-black scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span className="truncate max-w-[72px]">{t.theme.label}</span>
        </button>
      </div>
    </>
  );
};
