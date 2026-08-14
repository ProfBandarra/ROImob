import React from 'react';
import { Building2, ShieldCheck, AlertCircle, ExternalLink, Github } from 'lucide-react';
import { useI18n } from '../i18n';
import { useTheme } from '../theme';

const ISSUES_URL = 'https://github.com/ProfBandarra/ROImob/issues/new';

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

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className={themeConfig.textPrimary}>{t.footer.fiscalCompliance}</span>
            </div>

            {/* Direct GitHub Issue Reporting Button */}
            <a
              href={ISSUES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-colors cursor-pointer"
            >
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.footer.reportIssueBtn}</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
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

        {/* AI Disclaimer Footnote & Direct GitHub Reporting */}
        <div className="text-[10px] text-center pt-4 border-t border-slate-800/40 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>{t.footer.aiDisclaimer}</span>
          <a
            href={ISSUES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-400 hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>{t.footer.reportIssueBtn} →</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
