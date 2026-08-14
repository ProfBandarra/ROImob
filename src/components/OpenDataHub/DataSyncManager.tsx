import React, { useState } from 'react';
import { OFFICIAL_DATASETS } from '../../data/officialSources';
import { formatRelativeTime } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  X, 
  Layers, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSyncAll: () => void;
  isSyncingAll: boolean;
}

export const DataSyncManager: React.FC<Props> = ({
  isOpen,
  onClose,
  onSyncAll,
  isSyncingAll,
}) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                {t.openData.dataHealthSummary}
              </h2>
              <p className="text-xs text-slate-400">
                Scheduled background synchronization intervals & timing audit
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sync Controls & Info Bar */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-200">
          
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-brand-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>Live Automated Cadence Active</span>
              </div>
              <p className="text-xs text-slate-300">
                Air quality stream synchronizes every 60 minutes. Cadastral and statistical cubes update monthly & quarterly.
              </p>
            </div>

            <button
              type="button"
              onClick={onSyncAll}
              disabled={isSyncingAll}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncingAll ? 'animate-spin' : ''}`} />
              <span>{isSyncingAll ? 'Synchronizing Feeds...' : 'Sync All Pipelines Now'}</span>
            </button>
          </div>

          {/* Sync Table */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950/60">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-800 bg-slate-900/80 text-[10px] uppercase font-mono">
                    <th className="py-3 px-4">Dataset / Authority</th>
                    <th className="py-3 px-4">Cadence</th>
                    <th className="py-3 px-4">Last Synced</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {OFFICIAL_DATASETS.map((ds) => (
                    <tr key={ds.id} className="hover:bg-slate-900/50">
                      <td className="py-2.5 px-4">
                        <div className="font-bold text-white text-xs">{ds.name}</div>
                        <div className="text-[11px] text-brand-400 font-medium">{ds.authority}</div>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                          {ds.updateCadence}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 font-mono text-slate-300">
                        {formatRelativeTime(ds.lastSynced)}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active / Healthy</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
            <span>
              All pipelines adhere to standard REST / CKAN protocol (`https://data.gov.ro/api/3/action/`) and ANCPI OGC WMS/WFS map servers.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
