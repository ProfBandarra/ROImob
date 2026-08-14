import React, { useState } from 'react';
import { I18nProvider } from './i18n';
import { SAMPLE_PROPERTIES } from './data/sampleProperties';
import { Property } from './types';
import { Navbar } from './components/Navbar';
import { ListingUrlImporter } from './components/ListingAnalyzer/ListingUrlImporter';
import { SellVsRentCalculator } from './components/SellVsRent/SellVsRentCalculator';
import { ROICalculator } from './components/FinancialEngine/ROICalculator';
import { DataSyncManager } from './components/OpenDataHub/DataSyncManager';
import { PropertyDetailModal } from './components/PropertyDossier/PropertyDetailModal';
import { PrintableDossier } from './components/ReportExport/PrintableDossier';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  // Focus exclusively on the Calculator Suite
  const [activeTab, setActiveTab] = useState<'sellVsRent' | 'listingAnalyzer' | 'calculator'>('sellVsRent');

  // Selected Property for inter-calculator sharing
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(SAMPLE_PROPERTIES[0]);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isPrintDossierOpen, setIsPrintDossierOpen] = useState(false);
  const [isSyncManagerOpen, setIsSyncManagerOpen] = useState(false);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

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

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      setIsSyncingAll(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      
      {/* Top Calculator Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSyncModal={() => setIsSyncManagerOpen(true)}
      />

      {/* Main Calculator Engine Stage */}
      <main className="flex-1 pb-16">
        
        {/* ENGINE 1: Sell vs. Rent Owner Strategy Optimizer */}
        {activeTab === 'sellVsRent' && (
          <SellVsRentCalculator />
        )}

        {/* ENGINE 2: Live Listing URL & Manual Announce Risk Evaluator */}
        {activeTab === 'listingAnalyzer' && (
          <ListingUrlImporter
            onAnalyzeListing={handleSelectProperty}
            onOpenCalculator={handleOpenCalculator}
          />
        )}

        {/* ENGINE 3: Romanian Real Estate ROI & Fiscal Engine */}
        {activeTab === 'calculator' && (
          <ROICalculator
            selectedProperty={selectedProperty}
            allProperties={SAMPLE_PROPERTIES}
            onSelectPropertyChange={(p) => setSelectedProperty(p)}
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
