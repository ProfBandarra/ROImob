import React, { useState, useMemo } from 'react';
import { I18nProvider, useI18n } from './i18n';
import { SAMPLE_PROPERTIES } from './data/sampleProperties';
import { COUNTY_MACRO_STATS } from './data/insseCountyStats';
import { Property } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { InteractiveMap } from './components/MapView/InteractiveMap';
import { LayerControl, LayerState } from './components/MapView/LayerControl';
import { PropertyCard } from './components/PropertyDossier/PropertyCard';
import { PropertyDetailModal } from './components/PropertyDossier/PropertyDetailModal';
import { ROICalculator } from './components/FinancialEngine/ROICalculator';
import { DataCatalog } from './components/OpenDataHub/DataCatalog';
import { DataSyncManager } from './components/OpenDataHub/DataSyncManager';
import { PrintableDossier } from './components/ReportExport/PrintableDossier';
import { Footer } from './components/Footer';
import { 
  Building2, 
  MapPin, 
  Layers, 
  SlidersHorizontal, 
  Sparkles, 
  AlertCircle,
  BarChart2,
  TrendingUp,
  Map as MapIcon,
  ShieldAlert
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { t } = useI18n();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'map' | 'properties' | 'calculator' | 'openDataHub' | 'report'>('map');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');

  // Map GIS Layers
  const [layers, setLayers] = useState<LayerState>({
    seismic: true,
    flood: true,
    schools: true,
    hospitals: true,
    airQuality: true,
    heritage: false,
    transit: true,
  });

  const toggleLayer = (key: keyof LayerState) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Selected Property for Modal / Map Pan
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isPrintDossierOpen, setIsPrintDossierOpen] = useState(false);
  const [isSyncManagerOpen, setIsSyncManagerOpen] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  // Available cities list
  const availableCities = useMemo(() => {
    return Array.from(new Set(SAMPLE_PROPERTIES.map((p) => p.city)));
  }, []);

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return SAMPLE_PROPERTIES.filter((p) => {
      const matchesCity = selectedCity === 'ALL' || p.city === selectedCity;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.cadastralNumber && p.cadastralNumber.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCity && matchesSearch;
    });
  }, [searchQuery, selectedCity]);

  // City Center for Map Pan
  const currentCityCenter: [number, number] = useMemo(() => {
    if (selectedCity !== 'ALL' && COUNTY_MACRO_STATS[selectedCity]) {
      return COUNTY_MACRO_STATS[selectedCity].cityCenterCoords;
    }
    return [44.4323, 26.1063]; // Bucharest center
  }, [selectedCity]);

  // Handle Property Selection
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setIsDossierOpen(true);
  };

  const handleOpenCalculator = (property: Property) => {
    setSelectedProperty(property);
    setActiveTab('calculator');
  };

  const handlePrintDossier = (property: Property) => {
    setSelectedProperty(property);
    setIsPrintDossierOpen(true);
  };

  // Sync Triggers
  const handleTriggerSync = (datasetId: string) => {
    setSyncingId(datasetId);
    setTimeout(() => {
      setSyncingId(null);
    }, 1200);
  };

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      setIsSyncingAll(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSyncModal={() => setIsSyncManagerOpen(true)}
      />

      {/* Hero Header on Map / Properties view */}
      {(activeTab === 'map' || activeTab === 'properties') && (
        <HeroBanner
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          availableCities={availableCities}
        />
      )}

      {/* Main Content Areas */}
      <main className="flex-1">
        
        {/* VIEW 1: Interactive GIS Map & Quick Cards */}
        {activeTab === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Map Container (8 cols on lg) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-brand-400" />
                    <h2 className="text-base font-extrabold text-white">
                      {t.mapLayers.title}
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {filteredProperties.length} Properties Displayed
                  </span>
                </div>

                <InteractiveMap
                  properties={filteredProperties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={handleSelectProperty}
                  layers={layers}
                  cityCenter={currentCityCenter}
                />
              </div>

              {/* Map Layers & Macro Economic Card (4 cols on lg) */}
              <div className="lg:col-span-4 space-y-6">
                <LayerControl layers={layers} toggleLayer={toggleLayer} />

                {/* Macro Economic Snapshot Card */}
                {selectedCity !== 'ALL' && COUNTY_MACRO_STATS[selectedCity] && (
                  <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold text-slate-200">
                        {COUNTY_MACRO_STATS[selectedCity].countyName}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                        INSSE Validated
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-950 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-400 block">Avg Net Wage:</span>
                        <strong className="text-white font-mono">
                          €{COUNTY_MACRO_STATS[selectedCity].averageNetSalaryEur}/mo
                        </strong>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-400 block">5-Yr Population:</span>
                        <strong className="text-emerald-400 font-mono">
                          +{COUNTY_MACRO_STATS[selectedCity].population5YrGrowthPercent}%
                        </strong>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-400 block">Monthly ANCPI Sales:</span>
                        <strong className="text-brand-300 font-mono">
                          {COUNTY_MACRO_STATS[selectedCity].monthlyAncpiTransactions}
                        </strong>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-xl">
                        <span className="text-[10px] text-slate-400 block">Price-to-Income:</span>
                        <strong className="text-amber-300 font-mono">
                          {COUNTY_MACRO_STATS[selectedCity].priceToIncomeYears} yrs
                        </strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Featured Properties Row below Map */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-brand-400" />
                  <h2 className="text-base font-extrabold text-white">
                    Explore Properties & Diagnostics ({filteredProperties.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('properties')}
                  className="text-xs text-brand-400 hover:text-brand-300 font-bold"
                >
                  View All in Grid →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={handleSelectProperty}
                    onOpenCalculator={handleOpenCalculator}
                    isSelected={selectedProperty?.id === prop.id}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: Property Dossiers Grid */}
        {activeTab === 'properties' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">
                  {t.propertyDetails.diagnosticDossier}
                </h2>
                <p className="text-xs text-slate-400">
                  Select any property to view complete seismic, environmental, school, and ROI diagnostics.
                </p>
              </div>
              <span className="text-xs font-mono text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                {filteredProperties.length} Properties
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onSelect={handleSelectProperty}
                  onOpenCalculator={handleOpenCalculator}
                  isSelected={selectedProperty?.id === prop.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: Real Estate ROI & Romanian Tax Calculator */}
        {activeTab === 'calculator' && (
          <ROICalculator
            selectedProperty={selectedProperty}
            allProperties={SAMPLE_PROPERTIES}
            onSelectPropertyChange={(p) => setSelectedProperty(p)}
          />
        )}

        {/* VIEW 4: Official Open Data Hub & Live API Catalog */}
        {activeTab === 'openDataHub' && (
          <DataCatalog
            onTriggerSync={handleTriggerSync}
            syncingId={syncingId}
          />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Property Diagnostic Dossier Modal */}
      {isDossierOpen && selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={() => setIsDossierOpen(false)}
          onOpenCalculator={handleOpenCalculator}
          onPrintDossier={handlePrintDossier}
        />
      )}

      {/* Printable Audit Dossier Modal */}
      {isPrintDossierOpen && selectedProperty && (
        <PrintableDossier
          property={selectedProperty}
          onClose={() => setIsPrintDossierOpen(false)}
        />
      )}

      {/* Live Data Sync Manager Modal */}
      <DataSyncManager
        isOpen={isSyncManagerOpen}
        onClose={() => setIsSyncManagerOpen(false)}
        onSyncAll={handleSyncAll}
        isSyncingAll={isSyncingAll}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <I18nProvider>
      <MainAppContent />
    </I18nProvider>
  );
};
export default App;
