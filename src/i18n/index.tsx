import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { TranslationDictionary } from '../types/i18n';
import { en } from './en';
import { ro } from './ro';
import { fr } from './fr';
import { de } from './de';
import { uk } from './uk';
import { pt } from './pt';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
}

const translations: Record<Language, TranslationDictionary> = {
  en,
  ro,
  fr,
  de,
  uk,
  pt,
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('roimob_lang') as Language;
    if (saved && ['ro', 'en', 'fr', 'de', 'uk', 'pt'].includes(saved)) {
      return saved;
    }
    // Default to Romanian as primary
    return 'ro';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('roimob_lang', lang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
