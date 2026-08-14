import React, { useState } from 'react';
import { I18nProvider } from './i18n';
import { ThemeProvider, useTheme } from './theme';
import { CurrencyProvider } from './currency';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { SellVsRentCalculator } from './components/SellVsRent/SellVsRentCalculator';
import { ROICalculator } from './components/FinancialEngine/ROICalculator';
import { Footer } from './components/Footer';

const MainAppContent: React.FC = () => {
  // Navigation State: 'home' | 'sellVsRent' | 'calculator'
  const [activeTab, setActiveTab] = useState<'home' | 'sellVsRent' | 'calculator'>('home');
  const { themeConfig } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${themeConfig.appBg} selection:bg-brand-500 selection:text-white`}>
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Stage */}
      <main className="flex-1 pb-24 md:pb-16">
        
        {/* HOMEPAGE: Overview, Highlights & Legal Framework */}
        {activeTab === 'home' && (
          <HomePage
            onNavigateToSellVsRent={() => setActiveTab('sellVsRent')}
            onNavigateToRoiCalculator={() => setActiveTab('calculator')}
          />
        )}

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
    <ThemeProvider>
      <CurrencyProvider>
        <I18nProvider>
          <MainAppContent />
        </I18nProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
};

export default App;
