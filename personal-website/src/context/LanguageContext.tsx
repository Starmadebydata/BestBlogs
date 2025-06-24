'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, detectUserLanguage, setUserLanguage, getTranslation } from '@/lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>('zh');

  useEffect(() => {
    const detectedLang = detectUserLanguage();
    setCurrentLanguage(detectedLang);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLanguage(lang);
    setUserLanguage(lang);
  };

  const t = (key: string) => getTranslation(key, language);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleLanguageChange,
      t
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}