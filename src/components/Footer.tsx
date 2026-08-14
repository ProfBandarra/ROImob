import React from 'react';
import { Building2, ShieldCheck, Database, Heart, ExternalLink } from 'lucide-react';
import { useI18n } from '../i18n';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                ROI<span className="text-brand-400">mob</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Open geospatial & investment intelligence portal for real estate buyers and small property investors in Romania. Powered by data.gov.ro, ANCPI, INSSE, and AMCCRS.
            </p>
          </div>

          {/* Integrated Government Data Sources */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Official Data Partners
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://data.gov.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-300 flex items-center gap-1 transition-colors"
                >
                  <span>data.gov.ro (CKAN Open Data)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://geoportal.ancpi.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-300 flex items-center gap-1 transition-colors"
                >
                  <span>ANCPI Geoportal & Cadastru</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://insse.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-300 flex items-center gap-1 transition-colors"
                >
                  <span>INSSE TEMPO Online</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://amccrs-pmb.ro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-300 flex items-center gap-1 transition-colors"
                >
                  <span>AMCCRS Risc Seismic</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Languages & Transparency */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Localization & Standards
            </h4>
            <div className="space-y-2 text-xs">
              <p>Primary: 🇬🇧 English</p>
              <p>Alternative: 🇷🇴 Română • 🇫🇷 Français • 🇩🇪 Deutsch • 🇺🇦 Українська</p>
              <p className="text-[11px] text-slate-500 pt-2">
                Compliant with EU Open Data Directive (EU 2019/1024) and Romanian Law 179/2022.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 ROImob. Built for transparent, data-driven real estate decisions.</p>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Public Data Integrity Protocol Active</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
