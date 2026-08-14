import React from 'react';
import { 
  Building2, 
  Scale, 
  Calculator, 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  FileText, 
  ArrowRight, 
  ExternalLink, 
  BookOpen, 
  Award, 
  Globe2, 
  Sparkles, 
  CheckCircle2,
  Lock,
  Landmark,
  FileSpreadsheet,
  GitBranch,
  Github,
  Code2,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import { useI18n } from '../i18n';

interface Props {
  onNavigateToSellVsRent: () => void;
  onNavigateToRoiCalculator: () => void;
}

const OFFICIAL_REFERENCES = [
  {
    title: 'Codul Fiscal al României (Legea nr. 227/2015)',
    authority: 'Ministerul Finanțelor / ANAF',
    desc: 'Art. 111 (Impozitul pe transferul proprietăților imobiliare din patrimoniul personal: 1% peste 3 ani, 3% sub 3 ani) și Art. 120 (Impunerea veniturilor din cedarea folosinței bunurilor).',
    url: 'https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2024.htm',
    tag: 'Legislație Fiscală'
  },
  {
    title: 'Ordonanța de Urgență OUG nr. 115/2023',
    authority: 'Guvernul României',
    desc: 'Reintroducerea cotei forfetare de cheltuieli de 20% pentru veniturile din chirii (impozit efectiv 8%) și noile plafoane CASS (6, 12, 24 salarii minime).',
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. Academic & Open-Source Project Manifesto Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 border border-slate-800 p-8 sm:p-14 shadow-2xl space-y-8">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5 text-brand-400" />
            <span>ROImob Project • Open-Source Real Estate Decision Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Institutional Financial & Tax Modeling for Romanian Real Estate
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            ROImob is an open-source, non-commercial analytical suite created to deliver rigorous mathematical modeling and strict legal compliance for real estate transactions in Romania. Built on first-principles financial engineering and the latest provisions of Romanian Fiscal Code (Law 227/2015 & OUG 115/2023).
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
            <span>Launch Sell vs. Rent Optimizer</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onNavigateToRoiCalculator}
            className="px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 border border-slate-700 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Calculator className="w-5 h-5 text-amber-400" />
            <span>Launch ROI & Tax Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-4 rounded-2xl bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-800 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub Repository</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>

        </div>

        {/* Fundamental Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">Romanian Fiscal Code 2024–2026</strong>
              <span>Art. 111 (1% vs 3% transfer tax), 20% deductible flat expense & CASS health brackets.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">15-Year Wealth Amortization</strong>
              <span>Inflation adjustment, accelerated debt payoff, and Bear/Base/Bull sensitivity matrix.</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block">6 Native Languages & PDF Export</strong>
              <span>English, Română, Français, Deutsch, Ukrainian, and Portuguese (PT) with formal audit reports.</span>
            </div>
          </div>
        </div>

      </div>

      {/* 2. Open-Source Architecture & Engineering Details */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                Open-Source Architecture & Engineering Principles
              </h2>
              <p className="text-xs text-slate-400">
                Transparent codebase built for high performance, zero data-lockin, and reproducible math:
              </p>
            </div>
          </div>

          <span className="text-xs text-brand-300 font-mono font-bold bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            MIT Open-Source License
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-brand-400 font-bold">
              <Cpu className="w-4 h-4" />
              <span>Core Stack</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              React 18.3, TypeScript 5.7, Vite 6.4, and Tailwind CSS 3.4. Compiled to a lightweight 300 kB production bundle.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>Self-Contained Engine</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Zero telemetry, zero external tracking, and zero third-party dependencies. All math runs 100% client-side.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold">
              <Globe2 className="w-4 h-4" />
              <span>Type-Safe i18n</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Strict TypeScript key parity across EN, RO, FR, DE, UK, and PT with real-time reactive locale switching.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Audit Export</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Print isolation subsystem generating formal A4 audit dossiers for banking, legal, and accounting reviews.
            </p>
          </div>

        </div>
      </div>

      {/* 3. Mathematical Foundations of the Engines */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight mb-1">
            Mathematical Foundations & Fiscal Modeling
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            How ROImob transforms Romanian fiscal legislation into reproducible financial formulas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Sell vs Rent Math */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-brand-500/50 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">
                Engine 1: Owner Strategy — Sell vs. Rent Optimizer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Solves the homeowner's capital allocation dilemma: selling today and deploying liquid cash into benchmark assets vs. retaining the property under Romanian residential rental tax law.
              </p>
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px] text-slate-300">
                <div className="text-emerald-400 font-bold font-sans">Key Formulations:</div>
                <div>• Transfer Tax: <span className="text-slate-100">Art. 111 (1% if &gt;3 yrs, 3% if ≤3 yrs)</span></div>
                <div>• Prepayment Cap: <span className="text-slate-100">OUG 52/2016 (max 1% fixed, 0% variable)</span></div>
                <div>• Reinvestment: <span className="text-slate-100">Compound FV = Proceeds × (1 + r)^n</span></div>
                <div>• Payoff Model: <span className="text-slate-100">Surplus rent amortizes mortgage principal</span></div>
              </div>
            </div>

            <button
              type="button"
              onClick={onNavigateToSellVsRent}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Open Sell vs. Rent Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: ROI & Fiscal Engine Math */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-brand-500/50 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">
                Engine 2: Romanian Real Estate ROI & Fiscal Engine
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                An institutional underwriting tool for buy-to-let property investments. Models acquisition structuring, IRCC mortgage leverage, statutory CASS health tax tiers, and 10-year cash flow forecasts.
              </p>
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 font-mono text-[11px] text-slate-300">
                <div className="text-amber-400 font-bold font-sans">Key Formulations:</div>
                <div>• Tax Base: <span className="text-slate-100">Gross Rent × 80% (20% flat expense)</span></div>
                <div>• Income Tax: <span className="text-slate-100">10% on Net Base = 8% effective rate</span></div>
                <div>• CASS Tiers: <span className="text-slate-100">6, 12, 24 minimum wages (2,220–8,880 RON)</span></div>
                <div>• Annuity: <span className="text-slate-100">P = L × [r(1+r)^n] / [(1+r)^n - 1]</span></div>
              </div>
            </div>

            <button
              type="button"
              onClick={onNavigateToRoiCalculator}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Open ROI & Tax Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* 4. Useful References & Romanian Legal Framework Hub */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">
                Official Statutory References & Regulatory Library
              </h2>
              <p className="text-xs text-slate-400">
                Statutory legislation, gazettes, and benchmark indices governing the ROImob calculation models:
              </p>
            </div>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Verified Legal Basis
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {OFFICIAL_REFERENCES.map((ref, idx) => (
            <div 
              key={idx}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80 space-y-3 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-brand-300">
                    {ref.tag}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate max-w-[140px]">{ref.authority}</span>
                </div>
                <h3 className="text-xs font-bold text-white leading-snug">
                  {ref.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {ref.desc}
                </p>
              </div>

              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-400 hover:text-brand-300 inline-flex items-center gap-1.5 pt-2 border-t border-slate-900"
              >
                <span>Consulter la Source Officielle</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
