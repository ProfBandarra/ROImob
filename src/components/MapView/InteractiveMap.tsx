import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Property, SeismicRiskClass } from '../../types';
import { LayerState } from './LayerControl';
import { SEISMIC_BUILDINGS_DATASET } from '../../data/seismicData';
import { SCHOOLS_DATASET, HOSPITALS_DATASET, AIR_QUALITY_STATIONS } from '../../data/schoolsAndAmenities';
import { calculatePropertyScores } from '../../utils/calculations';
import { formatEur, formatRelativeTime } from '../../utils/formatters';
import { SourceAttributionBadge } from '../SourceAttributionBadge';
import { useI18n } from '../../i18n';
import { 
  Building2, 
  ShieldAlert, 
  GraduationCap, 
  Cross, 
  Wind, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

interface Props {
  properties: Property[];
  selectedProperty: Property | null;
  onSelectProperty: (property: Property) => void;
  layers: LayerState;
  cityCenter?: [number, number];
}

// Custom Leaflet DivIcon helpers
function createPropertyIcon(priceEur: number, isSelected: boolean) {
  const formattedPrice = `€${Math.round(priceEur / 1000)}k`;
  return L.divIcon({
    className: 'custom-property-pin',
    html: `
      <div class="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold shadow-xl cursor-pointer transition-transform transform ${
        isSelected 
          ? 'bg-amber-400 text-slate-950 scale-125 ring-4 ring-amber-400/40 z-50' 
          : 'bg-brand-600 hover:bg-brand-500 text-white ring-2 ring-white/80 hover:scale-110'
      }">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span>${formattedPrice}</span>
      </div>
    `,
    iconSize: [60, 26],
    iconAnchor: [30, 13],
  });
}

function createSeismicIcon(riskClass: SeismicRiskClass) {
  let color = 'bg-rose-600 text-white ring-rose-400/50';
  let badge = 'RsI';

  if (riskClass === 'RsI' || riskClass === 'U1') {
    color = 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/40';
    badge = 'RsI';
  } else if (riskClass === 'RsII' || riskClass === 'U2') {
    color = 'bg-amber-600 text-white ring-2 ring-amber-400/40';
    badge = 'RsII';
  } else if (riskClass === 'RsIII' || riskClass === 'U3') {
    color = 'bg-yellow-600 text-white ring-2 ring-yellow-400/40';
    badge = 'RsIII';
  }

  return L.divIcon({
    className: 'custom-seismic-pin',
    html: `
      <div class="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg cursor-pointer ${color}">
        ${badge}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function createSchoolIcon() {
  return L.divIcon({
    className: 'custom-school-pin',
    html: `
      <div class="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs shadow-md ring-2 ring-amber-300">
        🎓
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function createHospitalIcon() {
  return L.divIcon({
    className: 'custom-hospital-pin',
    html: `
      <div class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-md ring-2 ring-white">
        ✚
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

function createAirQualityIcon(aqi: number) {
  const isGood = aqi <= 50;
  return L.divIcon({
    className: 'custom-air-pin',
    html: `
      <div class="px-2 py-0.5 rounded-md text-[10px] font-bold shadow-md ${
        isGood ? 'bg-teal-600 text-white' : 'bg-orange-500 text-white'
      }">
        AQI ${aqi}
      </div>
    `,
    iconSize: [45, 20],
    iconAnchor: [22, 10],
  });
}

// Helper to pan map when property or city changes
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

export const InteractiveMap: React.FC<Props> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  layers,
  cityCenter = [44.4323, 26.1063], // Default Bucharest
}) => {
  const { t } = useI18n();

  const currentCenter: [number, number] = selectedProperty
    ? selectedProperty.coordinates
    : cityCenter;

  const currentZoom = selectedProperty ? 15 : 12;

  return (
    <div className="relative w-full h-[550px] lg:h-[680px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl z-10">
      <MapContainer
        center={currentCenter}
        zoom={currentZoom}
        scrollWheelZoom={true}
        className="w-full h-full bg-slate-950"
      >
        <MapController center={currentCenter} zoom={currentZoom} />

        {/* High-quality CartoDB Dark/Voyager Base Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* 1. Property Pins */}
        {properties.map((prop) => {
          const isSelected = selectedProperty?.id === prop.id;
          const scores = calculatePropertyScores(prop);

          return (
            <React.Fragment key={prop.id}>
              <Marker
                position={prop.coordinates}
                icon={createPropertyIcon(prop.priceEur, isSelected)}
                eventHandlers={{
                  click: () => onSelectProperty(prop),
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="w-64 p-1 text-slate-900">
                    <img
                      src={prop.thumbnailUrl}
                      alt={prop.title}
                      className="w-full h-28 object-cover rounded-lg mb-2"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-extrabold text-brand-700">
                        {formatEur(prop.priceEur)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {prop.usableAreaSqm} m² • {prop.rooms} {t.common.sqm}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                      {prop.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                      {prop.address}
                    </p>

                    {/* Scores & Seismic Badge */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>Score: {scores.compositeOverallScore}/100</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectProperty(prop)}
                        className="px-2 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded text-[10px] font-bold flex items-center gap-0.5"
                      >
                        <span>{t.common.details}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>

              {/* 15-min walk radius when property is selected */}
              {isSelected && (
                <Circle
                  center={prop.coordinates}
                  radius={1000} // 1 km radius (~12 min walk)
                  pathOptions={{
                    color: '#0271c5',
                    fillColor: '#0e8fe7',
                    fillOpacity: 0.12,
                    weight: 2,
                    dashArray: '4, 8',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* 2. Official Seismic Risk Layer (AMCCRS & Pre-1977) */}
        {layers.seismic &&
          SEISMIC_BUILDINGS_DATASET.map((sb) => (
            <Marker
              key={sb.id}
              position={sb.coordinates}
              icon={createSeismicIcon(sb.riskClass)}
            >
              <Popup>
                <div className="w-64 p-1 text-slate-900 text-xs">
                  <div className="flex items-center gap-1 text-rose-700 font-extrabold pb-1 border-b border-rose-100 mb-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Clădire Expertizată Tehnic Risc Seismic</span>
                  </div>
                  <p className="font-bold text-slate-900 mb-1">{sb.address}</p>
                  <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 mb-2">
                    <div>An Construcție: <strong>{sb.yearBuilt}</strong></div>
                    <div>Etaje: <strong>{sb.floors}</strong></div>
                    <div>Clasă: <strong className="text-rose-600">{sb.riskClass}</strong></div>
                    <div>Expertiză: <strong>{sb.expertizeYear}</strong></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mb-2">
                    Expert: {sb.expertName} {sb.amccrsId && `(${sb.amccrsId})`}
                  </p>
                  <SourceAttributionBadge provenance={sb.provenance} compact />
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 3. Official Schools & National Exam Quality */}
        {layers.schools &&
          SCHOOLS_DATASET.map((sch) => (
            <Marker key={sch.id} position={sch.coordinates} icon={createSchoolIcon()}>
              <Popup>
                <div className="w-60 p-1 text-slate-900 text-xs">
                  <div className="flex items-center gap-1 text-amber-700 font-bold pb-1 border-b border-amber-100 mb-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>{sch.type}</span>
                  </div>
                  <p className="font-bold text-slate-900 mb-1">{sch.name}</p>
                  <div className="bg-amber-50 p-1.5 rounded-lg border border-amber-200 mb-2">
                    <div className="flex justify-between text-[11px]">
                      <span>Medie Evaluare Națională:</span>
                      <strong className="text-amber-800">{sch.examAverageScore} / 10</strong>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Rang Național:</span>
                      <strong className="text-slate-800">Top #{sch.nationalRank}</strong>
                    </div>
                  </div>
                  <SourceAttributionBadge provenance={sch.provenance} compact />
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 4. Hospitals Layer */}
        {layers.hospitals &&
          HOSPITALS_DATASET.map((hosp) => (
            <Marker key={hosp.id} position={hosp.coordinates} icon={createHospitalIcon()}>
              <Popup>
                <div className="w-60 p-1 text-slate-900 text-xs">
                  <div className="flex items-center gap-1 text-emerald-700 font-bold pb-1 border-b border-emerald-100 mb-1.5">
                    <Cross className="w-4 h-4" />
                    <span>{hosp.type}</span>
                  </div>
                  <p className="font-bold text-slate-900 mb-1">{hosp.name}</p>
                  {hosp.hasEmergencyUnit && (
                    <span className="inline-block mb-2 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 font-semibold rounded text-[10px]">
                      Unitate Primiri Urgențe (UPU 24/7)
                    </span>
                  )}
                  <SourceAttributionBadge provenance={hosp.provenance} compact />
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 5. Air Quality Monitoring Stations */}
        {layers.airQuality &&
          AIR_QUALITY_STATIONS.map((aq) => (
            <Marker key={aq.id} position={aq.coordinates} icon={createAirQualityIcon(aq.aqi)}>
              <Popup>
                <div className="w-64 p-1 text-slate-900 text-xs">
                  <div className="flex items-center gap-1 text-teal-700 font-bold pb-1 border-b border-teal-100 mb-1.5">
                    <Wind className="w-4 h-4" />
                    <span>Stație RNMCA Calitatea Aerului</span>
                  </div>
                  <p className="font-bold text-slate-900 mb-1">{aq.name}</p>
                  <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1.5 rounded-lg mb-2 text-center text-[10px]">
                    <div>
                      <span className="text-slate-500 block">PM2.5</span>
                      <strong>{aq.pm25} µg/m³</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">PM10</span>
                      <strong>{aq.pm10} µg/m³</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">NO2</span>
                      <strong>{aq.no2} µg/m³</strong>
                    </div>
                  </div>
                  <SourceAttributionBadge provenance={aq.provenance} compact />
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};
