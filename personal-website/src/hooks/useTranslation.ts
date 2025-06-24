'use client';

import { useState, useEffect } from 'react';
import { Language, getTranslation, detectUserLanguage } from '@/lib/i18n';

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    const lang = detectUserLanguage();
    setLanguage(lang);
  }, []);

  const t = (key: string) => getTranslation(key, language);

  return { t, language, setLanguage };
}