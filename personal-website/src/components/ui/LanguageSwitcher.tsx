'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/i18n';

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <button
        onClick={() => handleLanguageChange('zh')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          language === 'zh'
            ? 'bg-blue-100 text-blue-700 font-medium'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
      >
        中文
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          language === 'en'
            ? 'bg-blue-100 text-blue-700 font-medium'
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
        }`}
      >
        English
      </button>
    </div>
  );
}