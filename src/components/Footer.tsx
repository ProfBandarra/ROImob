import React from 'react';
import { Building2, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';

export const Footer: React.FC = () => {
  const { t } = useI18n();
  const { themeConfig } = useTheme();

  return (
    <footer className={`border-t transition-colors duration-200 ${themeConfig.headerBg} py-12 ${themeConfig.textSecondary} text-xs`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-extrabold text-base ${themeConfig.textPrimary} tracking-tight`}>
                ROI<span className="text-brand-400">mob</span> Calculators
              </span>
              <p className={`text-[11px] ${themeConfig.textSecondary}`}>
                {t.footer.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className={themeConfig.textPrimary}>{t.footer.fiscalCompliance}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="flex items-center gap-1">
            {t.footer.builtWith}
          </p>
        </div>

        <div className="text-[10px] text-center pt-4 border-t border-slate-800/40">
          {t.footer.aiDisclaimer}
        </div>

      </div>
    </footer>
  );
};
