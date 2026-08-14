import React, { useState } from 'react';
import { I18nProvider } from './i18n';
import { Navbar } from './components/Navbar';
import { SellVsRentCalculator } from './components/SellVsRent/SellVsRentCalculator';
import { ROICalculator } from './components/FinancialEngine/ROICalculator';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  // Standalone 2-Calculator Engine
  const [activeTab, setActiveTab] = useState<'sellVsRent' | 'calculator'>('sellVsRent');

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Calculator Engine Stage */}
      <main className="flex-1 pb-16">
        
        {/* ENGINE 1: Owner Strategy - Sell vs. Rent Optimizer */}
        {activeTab === 'sellVsRent' && (
          <SellVsRentCalculator />
        )}

        {/* ENGINE 2: Romanian Real Estate ROI & Fiscal Engine */}
        {activeTab === 'calculator' && (
          <ROICalculator />
        )}

      </main>

      {/* Footer */}
      <Footer />

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
