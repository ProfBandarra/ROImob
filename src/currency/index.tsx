import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'EUR' | 'RON';

const BNR_EUR_RON_RATE = 4.975;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
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
    if (saved === 'EUR' || saved === 'RON') return saved;
    return 'EUR';
  });

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('roimob_currency', newCurrency);
  };

  const formatMoney = (amountInEur: number): string => {
    if (isNaN(amountInEur) || !isFinite(amountInEur)) return currency === 'EUR' ? '€0' : '0 lei';
    
    if (currency === 'EUR') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(amountInEur);
    } else {
      const ronAmount = Math.round(amountInEur * BNR_EUR_RON_RATE);
      return `${new Intl.NumberFormat('ro-RO').format(ronAmount)} lei`;
    }
  };

  const formatMoneyDual = (amountInEur: number): string => {
    const primary = formatMoney(amountInEur);
    if (currency === 'EUR') {
      const ronAmount = Math.round(amountInEur * BNR_EUR_RON_RATE);
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
    if (currency === 'EUR') return amountInEur;
    return Math.round(amountInEur * BNR_EUR_RON_RATE);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        eurToRonRate: BNR_EUR_RON_RATE,
        symbol: currency === 'EUR' ? '€' : 'lei',
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
