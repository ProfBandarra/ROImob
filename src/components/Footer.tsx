import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white tracking-tight">
                ROI<span className="text-brand-400">mob</span> Calculators
              </span>
              <p className="text-[11px] text-slate-400">
                {t.footer.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{t.footer.fiscalCompliance}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="flex items-center gap-1">
            {t.footer.builtWith}
          </p>
        </div>

      </div>
    </footer>
  );
};
