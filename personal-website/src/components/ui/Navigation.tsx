'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import React from 'react';

interface NavigationProps {
  currentPage?: 'home' | 'daily-report' | 'news' | 'articles' | 'projects' | 'about';
}

export default function Navigation({ currentPage = 'home' }: NavigationProps) {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              {t('site.title')}
            </Link>
            <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {t('site.subtitle')}
            </span>
          </div>
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/" 
                className={`hover:text-blue-600 ${
                  currentPage === 'home' ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {t('nav.home')}
              </Link>
              <Link 
                href="/daily-report" 
                className={`hover:text-blue-600 ${
                  currentPage === 'daily-report' ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {t('nav.dailyReport')}
              </Link>
              <Link 
                href="/news" 
                className={`hover:text-blue-600 ${
                  currentPage === 'news' ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {t('nav.news')}
              </Link>
              <Link 
                href="/articles" 
                className={`hover:text-blue-600 ${
                  currentPage === 'articles' ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {t('nav.articles')}
              </Link>
              <Link 
                href="/projects" 
                className={`hover:text-blue-600 ${
                  currentPage === 'projects' ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {t('nav.myProject')}
              </Link>
              
              <Link 
                href="/about" 
                className={`hover:text-blue-600 ${
                  currentPage === 'about' ? 'text-blue-600 font-medium' : 'text-gray-700'
                }`}
              >
                {t('nav.about')}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}