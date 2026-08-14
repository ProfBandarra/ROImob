import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeConfig: {
    appBg: string;
    cardBg: string;
    cardBorder: string;
    headerBg: string;
    textPrimary: string;
    textSecondary: string;
    accentGradient: string;
    accentPrimary: string;
    isDark: boolean;
  };
}

const THEME_CONFIGS: Record<Theme, ThemeContextType['themeConfig']> = {
  midnight: {
    appBg: 'bg-slate-950 text-slate-100',
    cardBg: 'bg-slate-900/90',
    cardBorder: 'border-slate-800',
    headerBg: 'bg-slate-950/90 border-slate-800/80',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-300',
    accentGradient: 'from-brand-600 to-indigo-600',
    accentPrimary: 'text-brand-400',
    isDark: true,
  },
  corporate: {
    appBg: 'bg-slate-100 text-slate-900',
    cardBg: 'bg-white',
    cardBorder: 'border-slate-200 shadow-sm',
    headerBg: 'bg-white/95 border-slate-200 shadow-sm',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accentGradient: 'from-blue-600 to-indigo-600',
    accentPrimary: 'text-blue-600',
    isDark: false,
  },
  emerald: {
    appBg: 'bg-slate-950 text-emerald-100',
    cardBg: 'bg-emerald-950/60',
    cardBorder: 'border-emerald-800/60',
    headerBg: 'bg-emerald-950/90 border-emerald-800/80',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-200/80',
    accentGradient: 'from-emerald-600 to-teal-600',
    accentPrimary: 'text-emerald-400',
    isDark: true,
  },
  accessibility: {
    appBg: 'bg-black text-white font-medium',
    cardBg: 'bg-zinc-950',
    cardBorder: 'border-2 border-yellow-400',
    headerBg: 'bg-black border-b-2 border-yellow-400',
    textPrimary: 'text-white',
    textSecondary: 'text-yellow-200',
    accentGradient: 'from-yellow-500 to-amber-500',
    accentPrimary: 'text-yellow-400',
    isDark: true,
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('roimob_theme') as Theme;
    if (saved && ['midnight', 'corporate', 'emerald', 'accessibility'].includes(saved)) {
      return saved;
    }
    return 'midnight';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('roimob_theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'corporate') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('light-theme');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig: THEME_CONFIGS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
