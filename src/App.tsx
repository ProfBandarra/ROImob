import React, { useState, useEffect } from 'react';
import { I18nProvider, useI18n } from './i18n';
import { ThemeProvider, useTheme } from './theme';
import { CurrencyProvider } from './currency';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { SellVsRentCalculator } from './components/SellVsRent/SellVsRentCalculator';
import { ROICalculator } from './components/FinancialEngine/ROICalculator';
import { Footer } from './components/Footer';

import { CalculatorMode } from './types';
import { QuickSellVsRent } from './components/SimpleMode/QuickSellVsRent';
import { QuickROICalculator } from './components/SimpleMode/QuickROICalculator';

const HASH_MAP: Record<string, 'home' | 'sellVsRent' | 'calculator'> = {
  '#/acasa': 'home',
  '#/home': 'home',
  '#/vinde-vs-inchiriere': 'sellVsRent',
  '#/sell-vs-rent': 'sellVsRent',
  '#/calculator-roi': 'calculator',
  '#/roi-calculator': 'calculator',
};

const TAB_HASH_MAP: Record<'home' | 'sellVsRent' | 'calculator', string> = {
  home: '#/acasa',
  sellVsRent: '#/vinde-vs-inchiriere',
  calculator: '#/calculator-roi',
};

const getInitialTab = (): 'home' | 'sellVsRent' | 'calculator' => {
  const hash = window.location.hash.toLowerCase();
  return HASH_MAP[hash] || 'home';
};

const MainAppContent: React.FC = () => {
  // Navigation State with URL Hash Sync
  const [activeTab, setActiveTabState] = useState<'home' | 'sellVsRent' | 'calculator'>(getInitialTab);
  const [calculatorMode, setCalculatorModeState] = useState<CalculatorMode>(() => {
    const saved = localStorage.getItem('roimob_mode') as CalculatorMode;
    return saved && ['simple', 'pro'].includes(saved) ? saved : 'simple';
  });
  const { themeConfig } = useTheme();
  const { language } = useI18n();

  const setActiveTab = (tab: 'home' | 'sellVsRent' | 'calculator') => {
    setActiveTabState(tab);
    if (window.location.hash !== TAB_HASH_MAP[tab]) {
      window.history.replaceState(null, '', TAB_HASH_MAP[tab]);
    }
  };

  // Sync back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const targetTab = getInitialTab();
      setActiveTabState(targetTab);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic SEO Title & Meta Description Manager
  useEffect(() => {
    let pageTitle = 'ROImob — Calculator Imobiliar România: Vânzare vs Închiriere & Randament ROI 2026';
    let metaDesc = 'Calculator financiar și fiscal gratuit pentru imobiliare în România. Compară Vânzare vs Închiriere pe 15 ani, calculează randamentul net (ROI, Cap Rate) și impozitul pe chirii conform Codului Fiscal (Legea 227/2015 & OUG 115/2023).';

    if (language === 'ro') {
      if (activeTab === 'sellVsRent') {
        pageTitle = 'Calculator Vânzare vs Închiriere Apartament | Simulare 15 Ani | ROImob';
        metaDesc = 'Evaluează dacă este mai profitabil să vinzi sau să închiriezi un apartament în România. Simulare financiară pe 15 ani cu reinvestire în Titluri de Stat Tezaur și taxe notariale.';
      } else if (activeTab === 'calculator') {
        pageTitle = 'Calculator Randament ROI & Impozite Chirii ANAF România 2026 | ROImob';
        metaDesc = 'Calculează Randamentul Brut și Net (ROI, Cap Rate, Cash-on-Cash) pentru investiții imobiliare în România. Include impozit pe venit 8% și plafoane CASS sănătate conform OUG 115/2023.';
      }
    } else {
      if (activeTab === 'sellVsRent') {
        pageTitle = 'Sell vs. Rent Real Estate Calculator Romania | 15-Year Horizon | ROImob';
        metaDesc = 'Compare selling vs renting residential property in Romania. 15-year net worth projection, notary transfer tax (Law 227/2015), and sovereign bond reinvestment modeling.';
      } else if (activeTab === 'calculator') {
        pageTitle = 'Romanian Real Estate ROI & Buy-to-Let Tax Engine 2026 | ROImob';
        metaDesc = 'Institutional ROI, Cap Rate, and Cash-on-Cash yield calculator for Romanian real estate. Full Romanian Fiscal Code (Law 227/2015 & OUG 115/2023) modeling.';
      } else {
        pageTitle = 'ROImob — Romanian Real Estate Financial & Tax Intelligence Platform';
        metaDesc = 'Free, open-source real estate decision intelligence suite for Romanian property owners, buyers, and investors. Dual Quick & Pro modes with institutional audit reports.';
      }
    }

    document.title = pageTitle;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute('content', metaDesc);
    }
  }, [activeTab, language]);

  const setCalculatorMode = (mode: CalculatorMode) => {
    setCalculatorModeState(mode);
    localStorage.setItem('roimob_mode', mode);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${themeConfig.appBg} selection:bg-brand-500 selection:text-white`}>
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        calculatorMode={calculatorMode}
        setCalculatorMode={setCalculatorMode}
      />

      {/* Main Content Stage */}
      <main className="flex-1 pb-24 md:pb-16">
        
        {/* HOMEPAGE: Overview, Highlights & Legal Framework */}
        {activeTab === 'home' && (
          <HomePage
            onNavigateToSellVsRent={() => setActiveTab('sellVsRent')}
            onNavigateToRoiCalculator={() => setActiveTab('calculator')}
            calculatorMode={calculatorMode}
            setCalculatorMode={setCalculatorMode}
          />
        )}

        {/* ENGINE 1: Owner Strategy - Sell vs. Rent Optimizer */}
        {activeTab === 'sellVsRent' && (
          calculatorMode === 'simple' ? (
            <QuickSellVsRent onSwitchToPro={() => setCalculatorMode('pro')} />
          ) : (
            <SellVsRentCalculator onSwitchToSimple={() => setCalculatorMode('simple')} />
          )
        )}

        {/* ENGINE 2: Romanian Real Estate ROI & Fiscal Engine */}
        {activeTab === 'calculator' && (
          calculatorMode === 'simple' ? (
            <QuickROICalculator onSwitchToPro={() => setCalculatorMode('pro')} />
          ) : (
            <ROICalculator onSwitchToSimple={() => setCalculatorMode('simple')} />
          )
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
