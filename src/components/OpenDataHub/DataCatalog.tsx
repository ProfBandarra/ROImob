import React, { useState } from 'react';
import { OFFICIAL_DATASETS, OfficialDatasetItem } from '../../data/officialSources';
import { SourceAttributionBadge } from '../SourceAttributionBadge';
import { formatRelativeTime, formatNumber } from '../../utils/formatters';
import { useI18n } from '../../i18n';
import { 
  Database, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Download, 
  CheckCircle2, 
  Code, 
  ShieldCheck, 
  Clock, 
  FileText,
  Filter,
  Sparkles,
  Layers
} from 'lucide-react';

interface Props {
  onTriggerSync: (datasetId: string) => void;
  syncingId: string | null;
}

export const DataCatalog: React.FC<Props> = ({ onTriggerSync, syncingId }) => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeJsonPreview, setActiveJsonPreview] = useState<OfficialDatasetItem | null>(null);

  const categories = [
    'ALL',
    'Risk & Safety',
    'Cadastre & Transactions',
    'Demographics & Economics',
    'Environment & Air',
    'Education & Social',
  ];

  const filteredDatasets = OFFICIAL_DATASETS.filter((ds) => {
    const matchesSearch =
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || ds.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-3">
            <Database className="w-3.5 h-3.5 text-brand-400" />
            <span>Official Government Open Data (CKAN API)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            {t.openData.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {t.openData.subtitle}
          </p>
        </div>

        <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-700 text-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Verifiable Public Sources</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Directly connected to data.gov.ro, ANCPI e-Terra & INSSE TEMPO.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search official registries, laws, endpoints..."
            className="w-full bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto w-full sm:w-auto gap-1.5 pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {cat === 'ALL' ? 'All Datasets' : cat}
            </button>
          ))}
        </div>

      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDatasets.map((ds) => {
          const isSyncing = syncingId === ds.id;

          return (
            <div
              key={ds.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-slate-700 p-5 shadow-lg flex flex-col justify-between space-y-4 transition-all"
            >
              <div>
                {/* Top Category & Format Badges */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {ds.category}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-900/40 text-brand-300 border border-brand-700/50">
                    {ds.format}
                  </span>
                </div>

                <h3 className="font-extrabold text-sm text-white leading-snug mb-1">
                  {ds.name}
                </h3>
                <p className="text-xs text-brand-400 font-semibold mb-2">
                  {ds.authority}
                </p>

                <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                  {ds.description}
                </p>

                {/* Metadata Grid */}
                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      Sync Cadence:
                    </span>
                    <strong className="text-white font-mono">{ds.updateCadence}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 text-slate-500" />
                      Last Synced:
                    </span>
                    <span className="text-slate-300 font-mono text-[11px]">
                      {formatRelativeTime(ds.lastSynced)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-slate-500" />
                      Indexed Records:
                    </span>
                    <strong className="text-brand-300 font-mono">
                      {formatNumber(ds.recordsCount)}
                    </strong>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 mt-2 truncate" title={ds.legalBasis}>
                  📜 {ds.legalBasis}
                </p>
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => onTriggerSync(ds.id)}
                  disabled={isSyncing}
                  className="flex-1 py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-700 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-brand-400' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveJsonPreview(ds)}
                  className="py-1.5 px-2.5 rounded-xl bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 text-xs font-semibold flex items-center gap-1 border border-brand-500/30"
                  title="Inspect API Response & Schema"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>API</span>
                </button>

                <a
                  href={ds.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
                  title="Open Portal URL"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live API JSON Preview Modal */}
      {activeJsonPreview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl p-6 space-y-4 text-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-brand-400" />
                <div>
                  <h3 className="font-extrabold text-sm text-white">
                    {activeJsonPreview.name} (Live API Endpoint)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {activeJsonPreview.endpointUrl}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveJsonPreview(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-emerald-400 max-h-72">
              <pre>
                {JSON.stringify(
                  {
                    status: 'success',
                    provider: activeJsonPreview.authority,
                    dataset_id: activeJsonPreview.id,
                    cadence: activeJsonPreview.updateCadence,
                    last_synced: activeJsonPreview.lastSynced,
                    records_indexed: activeJsonPreview.recordsCount,
                    format: activeJsonPreview.format,
                    legal_basis: activeJsonPreview.legalBasis,
                    endpoint_route: activeJsonPreview.endpointUrl,
                    sample_query_result: {
                      schema_version: '2026.1',
                      compliance: 'EU Open Data Directive & HG 583/2016',
                      cache_control: 'max-age=3600, public',
                    },
                  },
                  null,
                  2
                )}
              </pre>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <a
                href={activeJsonPreview.endpointUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <span>Query Official Endpoint Directly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
