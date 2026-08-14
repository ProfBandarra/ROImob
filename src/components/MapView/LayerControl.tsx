import React from 'react';
import { 
  Layers, 
  ShieldAlert, 
  Droplets, 
  GraduationCap, 
  Cross, 
  Wind, 
  Landmark, 
  Bus, 
  Info,
  Check
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { SourceAttributionBadge } from '../SourceAttributionBadge';
import { DataProvenance } from '../../types';

export interface LayerState {
  seismic: boolean;
  flood: boolean;
  schools: boolean;
  hospitals: boolean;
  airQuality: boolean;
  heritage: boolean;
  transit: boolean;
}

interface Props {
  layers: LayerState;
  toggleLayer: (key: keyof LayerState) => void;
}

export const LayerControl: React.FC<Props> = ({ layers, toggleLayer }) => {
  const { t } = useI18n();

  const layerItems: {
    key: keyof LayerState;
    label: string;
    icon: React.ReactNode;
    color: string;
    provenance: DataProvenance;
  }[] = [
    {
      key: 'seismic',
      label: t.mapLayers.seismicRisk,
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
      color: 'bg-rose-500/20 border-rose-500/30 text-rose-300',
      provenance: {
        sourceName: 'AMCCRS Lista Imobile Risc',
        authority: 'PMB / AMCCRS',
        endpointUrl: 'https://amccrs-pmb.ro',
        updateCadence: 'Monthly',
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        reliability: 'Verified Official'
      }
    },
    {
      key: 'flood',
      label: t.mapLayers.floodHazard,
      icon: <Droplets className="w-4 h-4 text-sky-400" />,
      color: 'bg-sky-500/20 border-sky-500/30 text-sky-300',
      provenance: {
        sourceName: 'Directiva Inundații 2007/60/CE',
        authority: 'Apele Române',
        endpointUrl: 'https://rowater.ro',
        updateCadence: 'Static/Official Regs',
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
        reliability: 'Verified Official'
      }
    },
    {
      key: 'schools',
      label: t.mapLayers.schoolsEducation,
      icon: <GraduationCap className="w-4 h-4 text-amber-400" />,
      color: 'bg-amber-500/20 border-amber-500/30 text-amber-300',
      provenance: {
        sourceName: 'Registrul Școlar Național',
        authority: 'data.gov.ro / Min. Educației',
        endpointUrl: 'https://data.gov.ro/dataset/reteaua-unitatilor-de-invatamant-preuniversitar',
        updateCadence: 'Annually',
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        reliability: 'Verified Official'
      }
    },
    {
      key: 'hospitals',
      label: t.mapLayers.hospitalsHealthcare,
      icon: <Cross className="w-4 h-4 text-emerald-400" />,
      color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300',
      provenance: {
        sourceName: 'Registrul Unităților Sanitare',
        authority: 'data.gov.ro / Min. Sănătății',
        endpointUrl: 'https://data.gov.ro/dataset/lista-unitatilor-sanitare',
        updateCadence: 'Quarterly',
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        reliability: 'Verified Official'
      }
    },
    {
      key: 'airQuality',
      label: t.mapLayers.airQuality,
      icon: <Wind className="w-4 h-4 text-teal-400" />,
      color: 'bg-teal-500/20 border-teal-500/30 text-teal-300',
      provenance: {
        sourceName: 'RNMCA CalitateaAerului.ro',
        authority: 'Ministerul Mediului',
        endpointUrl: 'https://calitateaaerului.ro',
        updateCadence: 'Hourly',
        lastSynced: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        reliability: 'Live Stream'
      }
    },
    {
      key: 'heritage',
      label: t.mapLayers.historicalMonuments,
      icon: <Landmark className="w-4 h-4 text-purple-400" />,
      color: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
      provenance: {
        sourceName: 'Lista Monumentelor Istorice (LMI)',
        authority: 'INP / Min. Culturii',
        endpointUrl: 'https://patrimoniu.ro',
        updateCadence: 'Annually',
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 200).toISOString(),
        reliability: 'Verified Official'
      }
    },
    {
      key: 'transit',
      label: t.mapLayers.publicTransit,
      icon: <Bus className="w-4 h-4 text-indigo-400" />,
      color: 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300',
      provenance: {
        sourceName: 'Metrorex & TPBI GTFS',
        authority: 'Autoritățile de Transport Metropolitan',
        endpointUrl: 'https://metrorex.ro',
        updateCadence: 'Monthly',
        lastSynced: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        reliability: 'Verified Official'
      }
    }
  ];

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-700/80 p-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            {t.mapLayers.title}
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {Object.values(layers).filter(Boolean).length} / {Object.keys(layers).length} Active
        </span>
      </div>

      <div className="space-y-2">
        {layerItems.map((item) => {
          const isActive = layers[item.key];
          return (
            <div
              key={item.key}
              className={`p-2 rounded-xl border transition-all ${
                isActive
                  ? 'bg-slate-800/80 border-slate-600 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800/60 opacity-70 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleLayer(item.key)}
                  className="flex items-center gap-2 text-left flex-1"
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isActive
                        ? 'bg-brand-600 border-brand-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.icon}
                    <span className="text-xs font-medium text-slate-200">
                      {item.label}
                    </span>
                  </div>
                </button>

                <SourceAttributionBadge provenance={item.provenance} compact />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
