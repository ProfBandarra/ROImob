import React from 'react';
import { 
  Building2, 
  Scale, 
  Calculator, 
  ShieldCheck, 
  Coins, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2,
  Landmark,
  Github,
  Code2,
  Bot
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';

interface Props {
  onNavigateToSellVsRent: () => void;
  onNavigateToRoiCalculator: () => void;
}

const OFFICIAL_REFERENCES = [
  {
    title: 'Codul Fiscal al României (Legea nr. 227/2015)',
    authority: 'Ministerul Finanțelor / ANAF',
    desc: 'Art. 111 (Impozitul pe transferul proprietăților imobiliare: 1% peste 3 ani, 3% sub 3 ani) și Art. 120 (Impunerea veniturilor din cedarea folosinței bunurilor).',
    url: 'https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2024.htm',
    tag: 'Legislație Fiscală'
  },
  {
    title: 'Ordonanța de Urgență OUG nr. 115/2023',
    authority: 'Guvernul României',
    desc: 'Cota forfetară de cheltuieli de 20% pentru veniturile din chirii (impozit efectiv 8%) și noile plafoane CASS (6, 12, 24 salarii minime).',
    url: 'https://legislatie.just.ro/Public/DetaliiDocument/277271',
    tag: 'Reforma Fiscală'
  },
  {
    title: 'Indicele de Referință pentru Creditele Consumatorilor (IRCC)',
    authority: 'Banca Națională a României (BNR)',
    desc: 'Rata medie a dobânzilor la tranzacțiile interbancare reglementată prin OUG 19/2019, aplicabilă creditelor ipotecare cu dobândă variabilă.',
    url: 'https://www.bnr.ro/Indicele-de-referin%C8%9Ba-pentru-creditele-acordate-consumatorilor-(IRCC)-21625.aspx',
    tag: 'Finanțare Bancară'
  },
  {
    title: 'Programul Titlurilor de Stat Tezaur & Fidelis',
    authority: 'Ministerul Finanțelor',
    desc: 'Emisiuni de obligațiuni suverane de stat denominate în RON și EUR destinate populației, cu dobândă 100% neimpozabilă conform Codului Fiscal.',
    url: 'https://mfinante.gov.ro/web/trezor/titluri-de-stat',
    tag: 'Benchmark Reinvestire'
  },
  {
    title: 'Legea nr. 241/2005 pentru prevenirea și combaterea evaziunii fiscale',
    authority: 'Parlamentul României',
    desc: 'Cadrul legal privind obligativitatea declarării veniturilor din patrimoniul imobiliar și sancțiunile aplicabile neconformării fiscale.',
    url: 'https://legislatie.just.ro/Public/DetaliiDocument/63897',
    tag: 'Conformitate & Risc'
  },
  {
    title: 'Directiva Europeană OUG nr. 52/2016 privind creditele imobiliare',
    authority: 'ANPC / Parlamentul României',
    desc: 'Plafonarea comisionului de rambursare anticipată a creditelor ipotecare (maxim 1% la dobândă fixă, 0% la dobândă variabilă).',
    url: 'https://legislatie.just.ro/Public/DetaliiDocument/181827',
    tag: 'Protecția Consumatorilor'
  }
];

const REPO_URL = 'https://github.com/ProfBandarra/ROImob';

export const HomePage: React.FC<Props> = ({
  onNavigateToSellVsRent,
  onNavigateToRoiCalculator
}) => {
  const { t } = useI18n();
  const { themeConfig, theme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. Main User Hero & Decision Hub */}
      <div className={`relative overflow-hidden rounded-3xl ${themeConfig.cardBg} border ${themeConfig.cardBorder} p-8 sm:p-14 shadow-2xl space-y-8 transition-colors duration-200`}>
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            <span>{t.home.heroBadge}</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-black ${themeConfig.textPrimary} tracking-tight leading-tight`}>
            {t.home.heroTitle}
          </h1>

          <p className={`text-sm sm:text-base ${themeConfig.textSecondary} leading-relaxed`}>
            {t.home.heroDesc}
          </p>
        </div>

        {/* Engine Launch Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          
          <button
            type="button"
            onClick={onNavigateToSellVsRent}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Scale className="w-5 h-5 text-emerald-300" />
            <span>{t.home.launchSvrBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onNavigateToRoiCalculator}
            className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 border border-slate-700 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Calculator className="w-5 h-5 text-amber-400" />
            <span>{t.home.launchRoiBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

        {/* User Benefits Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className={`${themeConfig.textPrimary} block`}>{t.home.pillar1Title}</strong>
              <span className={themeConfig.textSecondary}>{t.home.pillar1Desc}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <strong className={`${themeConfig.textPrimary} block`}>{t.home.pillar2Title}</strong>
              <span className={themeConfig.textSecondary}>{t.home.pillar2Desc}</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className={`${themeConfig.textPrimary} block`}>{t.home.pillar3Title}</strong>
              <span className={themeConfig.textSecondary}>{t.home.pillar3Desc}</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. The Decision Engines */}
      <div className="space-y-6">
        <div>
          <h2 className={`text-2xl font-black ${themeConfig.textPrimary} tracking-tight mb-1`}>
            {t.home.enginesTitle}
          </h2>
          <p className={`text-xs sm:text-sm ${themeConfig.textSecondary}`}>
            {t.home.enginesSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Sell vs Rent */}
          <div className={`${themeConfig.cardBg} rounded-3xl border ${themeConfig.cardBorder} p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-brand-500/50 transition-all`}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-black ${themeConfig.textPrimary}`}>
                {t.home.svrCardTitle}
              </h3>
              <p className={`text-xs ${themeConfig.textSecondary} leading-relaxed`}>
                {t.home.svrCardDesc}
              </p>
              
              <ul className="space-y-2 text-xs pt-2 border-t border-slate-800/80">
                <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{t.home.svrFeature1}</span>
                </li>
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>{t.home.svrOpenBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: ROI & Fiscal Engine */}
          <div className={`${themeConfig.cardBg} rounded-3xl border ${themeConfig.cardBorder} p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-brand-500/50 transition-all`}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-black ${themeConfig.textPrimary}`}>
                {t.home.roiCardTitle}
              </h3>
              <p className={`text-xs ${themeConfig.textSecondary} leading-relaxed`}>
                {t.home.roiCardDesc}
              </p>
              
              <ul className="space-y-2 text-xs pt-2 border-t border-slate-800/80">
                <li className={`flex items-center gap-2 ${themeConfig.textSecondary}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t.home.roiFeature1}</span>
                </li>
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
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <span>{t.home.roiOpenBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. Official References & Romanian Legal Basis */}
      <div className={`${themeConfig.cardBg} rounded-3xl border ${themeConfig.cardBorder} p-8 space-y-6 shadow-xl`}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-lg font-black ${themeConfig.textPrimary}`}>
                {t.home.referencesTitle}
              </h2>
              <p className={`text-xs ${themeConfig.textSecondary}`}>
                {t.home.referencesSubtitle}
              </p>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            {t.home.verifiedLawBadge}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OFFICIAL_REFERENCES.map((ref, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border ${themeConfig.cardBorder} space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors bg-slate-950/40`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-brand-300">
                    {ref.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate max-w-[140px]">{ref.authority}</span>
                </div>
                <h3 className={`text-xs font-bold ${themeConfig.textPrimary} leading-snug`}>
                  {ref.title}
                </h3>
                <p className={`text-[11px] ${themeConfig.textSecondary} leading-relaxed`}>
                  {ref.desc}
                </p>
              </div>

              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1.5 pt-2 border-t border-slate-900"
              >
                <span>{t.home.viewOfficialSource}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Open-Source & Developer Details */}
      <div className={`${themeConfig.cardBg} rounded-3xl border ${themeConfig.cardBorder} p-6 sm:p-8 space-y-4 shadow-lg text-xs`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-brand-400" />
            <h3 className={`text-sm font-bold ${themeConfig.textPrimary}`}>
              {t.home.devTitle}
            </h3>
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>{t.home.githubRepoBtn}</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        <p className={`${themeConfig.textSecondary} leading-relaxed`}>
          {t.home.devDesc}
        </p>
      </div>

      {/* 5. AI Assistance Footnote */}
      <div className={`p-4 ${themeConfig.cardBg} rounded-2xl border ${themeConfig.cardBorder} text-[11px] ${themeConfig.textSecondary} flex items-start gap-2.5`}>
        <Bot className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t.home.aiFootnote}
        </p>
      </div>

    </div>
  );
};
