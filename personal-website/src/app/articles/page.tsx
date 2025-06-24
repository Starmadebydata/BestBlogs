'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function BlogPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t('blog.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('blog.comingSoon')}</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {t('blog.description')}
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('blog.techShare.title')}</h3>
              <p className="text-sm text-gray-600">{t('blog.techShare.description')}</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('blog.projectReview.title')}</h3>
              <p className="text-sm text-gray-600">{t('blog.projectReview.description')}</p>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('blog.growth.title')}</h3>
              <p className="text-sm text-gray-600">{t('blog.growth.description')}</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-600 mb-4">
              {t('blog.contactText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/projects"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('blog.viewProjects')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {t('blog.learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}