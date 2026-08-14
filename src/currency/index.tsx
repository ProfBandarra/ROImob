import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'EUR' | 'RON' | 'USD' | 'GBP' | 'CHF';

export interface CurrencyConfig {
  code: Currency;
  name: string;
  symbol: string;
  rateFromEur: number; // e.g. 1 EUR = 4.975 RON, 1.085 USD, 0.855 GBP, 0.955 CHF
  locale: string;
}

export const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rateFromEur: 1.0, locale: 'de-DE' },
  RON: { code: 'RON', name: 'Leu Românesc', symbol: 'lei', rateFromEur: 4.975, locale: 'ro-RO' },
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rateFromEur: 1.085, locale: 'en-US' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rateFromEur: 0.855, locale: 'en-GB' },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rateFromEur: 0.955, locale: 'de-CH' },
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  currencies: CurrencyConfig[];
  currentConfig: CurrencyConfig;
  eurToRonRate: number;
  symbol: string;
  formatMoney: (amountInEur: number) => string;
  formatMoneyDual: (amountInEur: number) => string;
  convertFromEur: (amountInEur: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('roimob_currency') as Currency;
    if (saved && Object.keys(CURRENCY_CONFIGS).includes(saved)) return saved;
    return 'EUR';
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('roimob_currency', newCurrency);
  };

  const currentConfig = CURRENCY_CONFIGS[currency];

  const formatMoney = (amountInEur: number): string => {
    if (isNaN(amountInEur) || !isFinite(amountInEur)) return `${currentConfig.symbol}0`;

    const converted = Math.round(amountInEur * currentConfig.rateFromEur);

    if (currency === 'EUR') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(amountInEur);
    } else if (currency === 'RON') {
      return `${new Intl.NumberFormat('ro-RO').format(converted)} lei`;
    } else if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(converted);
    } else if (currency === 'GBP') {
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        maximumFractionDigits: 0,
      }).format(converted);
    } else if (currency === 'CHF') {
      return `${new Intl.NumberFormat('de-CH').format(converted)} CHF`;
    }

    return `${converted} ${currency}`;
  };

  const formatMoneyDual = (amountInEur: number): string => {
    const primary = formatMoney(amountInEur);
    if (currency === 'EUR') {
      const ronAmount = Math.round(amountInEur * CURRENCY_CONFIGS.RON.rateFromEur);
      return `${primary} (${new Intl.NumberFormat('ro-RO').format(ronAmount)} lei)`;
    } else {
      const eurFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(amountInEur);
      return `${primary} (${eurFormatted})`;
    }
  };

  const convertFromEur = (amountInEur: number): number => {
    return Math.round(amountInEur * currentConfig.rateFromEur);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencies: Object.values(CURRENCY_CONFIGS),
        currentConfig,
        eurToRonRate: CURRENCY_CONFIGS.RON.rateFromEur,
        symbol: currentConfig.symbol,
        formatMoney,
        formatMoneyDual,
        convertFromEur,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
