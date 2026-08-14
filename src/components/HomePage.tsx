import React, { useState } from 'react';
import { 
  Building2, 
  Scale, 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Landmark, 
  ChevronDown, 
  ChevronUp, 
  Github, 
  Code2, 
  Bot, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';

import { CalculatorMode } from '../types';
import { Zap, Settings2 } from 'lucide-react';

interface Props {
  onNavigateToSellVsRent: () => void;
  onNavigateToRoiCalculator: () => void;
  calculatorMode?: CalculatorMode;
  setCalculatorMode?: (mode: CalculatorMode) => void;
}

const OFFICIAL_REFERENCES = [
  {
    title: 'Codul Fiscal (Legea 227/2015)',
    authority: 'ANAF',
    desc: 'Art. 111 (Impozit transfer 1% / 3%) & Art. 120 (Chirii).',
    url: 'https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2024.htm',
    tag: 'Art. 111'
  },
  {
    title: 'Ordonanța OUG 115/2023',
    authority: 'Guvernul României',
    desc: 'Cota forfetară 20% (impozit efectiv 8%) & plafoane CASS (6, 12, 24 salarii).',
    url: 'https://legislatie.just.ro/Public/DetaliiDocument/277271',
    tag: 'OUG 115'
  },
  {
    title: 'Indicele IRCC & Dobânzi',
    authority: 'BNR',
    desc: 'Rata de referință a creditelor ipotecare conform OUG 19/2019.',
    url: 'https://www.bnr.ro/Indicele-de-referin%C8%9Ba-pentru-creditele-acordate-consumatorilor-(IRCC)-21625.aspx',
    tag: 'IRCC'
  },
  {
    title: 'Titluri Tezaur & Fidelis',
    authority: 'Min. Finanțelor',
    desc: 'Obligațiuni de stat 100% neimpozabile ca benchmark de reinvestire.',
    url: 'https://mfinante.gov.ro/web/trezor/titluri-de-stat',
    tag: 'Tezaur'
  },
  {
    title: 'Legea 241/2005 (Anti-Evaziune)',
    authority: 'Parlamentul României',
    desc: 'Obligativitatea declarării veniturilor din patrimoniu și sancțiuni.',
    url: 'https://legislatie.just.ro/Public/DetaliiDocument/63897',
    tag: 'Conformitate'
  },
  {
    title: 'Directiva OUG 52/2016',
    authority: 'ANPC',
    desc: 'Plafonare comision rambursare anticipată (0% variabilă, max 1% fixă).',
    url: 'https://legislatie.just.ro/Public/DetaliiDocument/181827',
    tag: 'OUG 52'
  }
];

const REPO_URL = 'https://github.com/ProfBandarra/ROImob';
const ISSUES_URL = 'https://github.com/ProfBandarra/ROImob/issues/new';

export const HomePage: React.FC<Props> = ({
  onNavigateToSellVsRent,
  onNavigateToRoiCalculator,
  calculatorMode = 'simple',
  setCalculatorMode
}) => {
  const { t } = useI18n();
  const { themeConfig } = useTheme();
  const [showAllRefs, setShowAllRefs] = useState<boolean>(false);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-6 sm:space-y-10">
      
      {/* 1. Compact Header / Hero Intro */}
      <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${themeConfig.cardBg} border ${themeConfig.cardBorder} p-5 sm:p-8 shadow-xl space-y-4 transition-colors`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>{t.home.heroBadge}</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Law 227/2015 & OUG 115/2023 Compliant</span>
            </span>
          </div>

          {/* Mode Switcher Chips */}
          {setCalculatorMode && (
            <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-sm text-xs font-bold">
              <button
                type="button"
                onClick={() => setCalculatorMode('simple')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  calculatorMode === 'simple'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.mode.quick}</span>
              </button>

              <button
                type="button"
                onClick={() => setCalculatorMode('pro')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  calculatorMode === 'pro'
                    ? 'bg-brand-600 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Settings2 className="w-3.5 h-3.5 text-brand-300" />
                <span>{t.mode.pro}</span>
              </button>
            </div>
          )}
        </div>

        <h1 className={`text-2xl sm:text-4xl font-black ${themeConfig.textPrimary} tracking-tight leading-tight`}>
          {t.home.heroTitle}
        </h1>

        <p className={`text-xs sm:text-sm ${themeConfig.textSecondary} max-w-3xl leading-relaxed`}>
          {t.home.heroDesc}
        </p>
      </div>

      {/* 2. Direct 2-Card Interactive Decision Hub (Front & Center) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        
        {/* Engine 1: Sell vs Rent */}
        <div className={`${themeConfig.cardBg} rounded-2xl sm:rounded-3xl border ${themeConfig.cardBorder} p-5 sm:p-7 flex flex-col justify-between space-y-4 sm:space-y-5 shadow-xl hover:border-brand-500/50 transition-all`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                Owner Strategy
              </span>
            </div>

            <div>
              <h2 className={`text-lg sm:text-xl font-black ${themeConfig.textPrimary}`}>
                {t.home.svrCardTitle}
              </h2>
              <p className={`text-xs ${themeConfig.textSecondary} mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none`}>
                {t.home.svrCardDesc}
              </p>
            </div>

            <ul className="space-y-1.5 text-xs pt-2 border-t border-slate-800/80">
              <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.home.svrFeature2}</span>
              </li>
              <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.home.svrFeature3}</span>
              </li>
              <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{t.home.svrFeature4}</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onNavigateToSellVsRent}
            className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>{t.home.svrOpenBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Engine 2: ROI & Fiscal Engine */}
        <div className={`${themeConfig.cardBg} rounded-2xl sm:rounded-3xl border ${themeConfig.cardBorder} p-5 sm:p-7 flex flex-col justify-between space-y-4 sm:space-y-5 shadow-xl hover:border-brand-500/50 transition-all`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Buy-to-Let ROI
              </span>
            </div>

            <div>
              <h2 className={`text-lg sm:text-xl font-black ${themeConfig.textPrimary}`}>
                {t.home.roiCardTitle}
              </h2>
              <p className={`text-xs ${themeConfig.textSecondary} mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none`}>
                {t.home.roiCardDesc}
              </p>
            </div>

            <ul className="space-y-1.5 text-xs pt-2 border-t border-slate-800/80">
              <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.home.roiFeature2}</span>
              </li>
              <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.home.roiFeature3}</span>
              </li>
              <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t.home.roiFeature4}</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onNavigateToRoiCalculator}
            className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>{t.home.roiOpenBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3. Compact Legislative Accordion */}
      <div className={`${themeConfig.cardBg} rounded-2xl sm:rounded-3xl border ${themeConfig.cardBorder} p-4 sm:p-6 space-y-3 shadow-lg`}>
        <div 
          onClick={() => setShowAllRefs(!showAllRefs)}
          className="flex items-center justify-between cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5">
            <Landmark className="w-4 h-4 text-indigo-400 shrink-0" />
            <h3 className={`text-xs sm:text-sm font-black ${themeConfig.textPrimary}`}>
              {t.home.referencesTitle}
            </h3>
            <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 hidden sm:inline-block">
              {t.home.verifiedLawBadge}
            </span>
          </div>

          <button
            type="button"
            className="text-xs text-brand-400 font-bold flex items-center gap-1"
          >
            <span>{showAllRefs ? 'Less' : 'View Laws (6)'}</span>
            {showAllRefs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Compact grid of references */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800/60 ${showAllRefs ? 'block' : 'hidden sm:grid'}`}>
          {OFFICIAL_REFERENCES.map((ref, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-xl border border-slate-800/80 bg-slate-950/40 text-xs flex flex-col justify-between gap-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-slate-800 text-brand-300">
                    {ref.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">{ref.authority}</span>
                </div>
                <strong className={`text-[11px] ${themeConfig.textPrimary} block truncate`}>
                  {ref.title}
                </strong>
                <p className={`text-[10px] ${themeConfig.textSecondary} line-clamp-1`}>
                  {ref.desc}
                </p>
              </div>

              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 pt-1 border-t border-slate-900"
              >
                <span>{t.home.viewOfficialSource}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Compact Open-Source & AI Footnote Bar */}
      <div className={`p-3.5 sm:p-4 ${themeConfig.cardBg} rounded-xl sm:rounded-2xl border ${themeConfig.cardBorder} text-[11px] ${themeConfig.textSecondary} flex flex-col sm:flex-row items-center justify-between gap-3`}>
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-center sm:text-left">{t.home.aiFootnote}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[10px] font-bold inline-flex items-center gap-1 border border-amber-500/30 transition-colors"
          >
            <AlertCircle className="w-3 h-3" />
            <span>{t.home.reportIssueBtn}</span>
          </a>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold inline-flex items-center gap-1 border border-slate-700 transition-colors"
          >
            <Github className="w-3 h-3" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

    </div>
  );
};
