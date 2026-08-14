import React, { useState } from 'react';
import { ShieldCheck, Clock, ExternalLink, RefreshCw, Database } from 'lucide-react';
import { DataProvenance } from '../types';
import { formatRelativeTime } from '../utils/formatters';
import { useI18n } from '../i18n';

interface Props {
  provenance: DataProvenance;
  compact?: boolean;
}

export const SourceAttributionBadge: React.FC<Props> = ({ provenance, compact = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useI18n();

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium transition-all ${
          provenance.reliability === 'Live Stream'
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
            : 'bg-brand-500/10 text-brand-300 border border-brand-500/20 hover:bg-brand-500/20'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
        <span className="truncate max-w-[140px]">{provenance.authority}</span>
        {!compact && (
          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
            • <Clock className="w-2.5 h-2.5" />
            {formatRelativeTime(provenance.lastSynced)}
          </span>
        )}
      </button>

      {/* Popover Tooltip */}
      {showTooltip && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-72 p-3 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl text-left text-xs text-slate-200 pointer-events-auto">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-1 text-brand-400 font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>Official Public Data Source</span>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-brand-900/50 text-[10px] text-brand-300 font-mono border border-brand-700/40">
              {provenance.reliability}
            </span>
          </div>

          <div className="space-y-1.5">
            <div>
              <span className="text-slate-400 block text-[10px]">Dataset / Registry:</span>
              <span className="font-medium text-white">{provenance.sourceName}</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px]">Authoritative Entity:</span>
              <span className="text-slate-300">{provenance.authority}</span>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-slate-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-brand-400" />
                Cadence: <strong className="text-slate-200">{provenance.updateCadence}</strong>
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {formatRelativeTime(provenance.lastSynced)}
              </span>
            </div>

            {provenance.endpointUrl && (
              <a
                href={provenance.endpointUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-1 w-full py-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-brand-300 hover:text-white transition-colors text-[11px] font-medium"
              >
                <span>View Official Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
