'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function ProjectsPage() {
  const { t } = useLanguage();
  
  // Helper function to get array translations
  const getArrayTranslation = (key: string): string[] => {
    const result = t(key);
    return Array.isArray(result) ? result : [];
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{t('projects.title')}</h1>
          <p className="text-xl text-gray-600">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* WindFlash AI Daily */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">WindFlash AI Daily</h3>
                  <p className="text-sm text-gray-500">windflash.us</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {t('projects.projectDetails.windflash.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {getArrayTranslation('projects.projectDetails.windflash.tags').map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{tag}</span>
                ))}
              </div>
              <a
                href="https://windflash.us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('projects.visitSite')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* XGo.ing */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">XGo.ing</h3>
                  <p className="text-sm text-gray-500">xgo.ing</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {t('projects.projectDetails.xgo.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {getArrayTranslation('projects.projectDetails.xgo.tags').map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">{tag}</span>
                ))}
              </div>
              <a
                href="https://xgo.ing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {t('projects.visitSite')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* BestBlogs.dev */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 011 1l4 4v9a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">BestBlogs.dev</h3>
                  <p className="text-sm text-gray-500">bestblogs.dev</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {t('projects.projectDetails.bestblogs.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {getArrayTranslation('projects.projectDetails.bestblogs.tags').map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">{tag}</span>
                ))}
              </div>
              <a
                href="https://bestblogs.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {t('projects.visitSite')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* InstantGames.top */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">InstantGames.top</h3>
                  <p className="text-sm text-gray-500">instantgames.top</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {t('projects.projectDetails.instantgames.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {getArrayTranslation('projects.projectDetails.instantgames.tags').map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">{tag}</span>
                ))}
              </div>
              <a
                href="https://instantgames.top"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('projects.visitSite')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Best-Games.io */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Best-Games.io</h3>
                  <p className="text-sm text-gray-500">best-games.io</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {t('projects.projectDetails.bestgamesio.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {getArrayTranslation('projects.projectDetails.bestgamesio.tags').map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">{tag}</span>
                ))}
              </div>
              <a
                href="https://best-games.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                {t('projects.visitSite')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* MoodJournal.life */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">MoodJournal.life</h3>
                  <p className="text-sm text-gray-500">moodjournal.life</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {t('projects.projectDetails.moodjournal.description')}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {getArrayTranslation('projects.projectDetails.moodjournal.tags').map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">{tag}</span>
                ))}
              </div>
              <a
                href="https://moodjournal.life"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                {t('projects.visitSite')}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('projects.techStack')}</h2>
            <p className="text-gray-600 mb-6">
              {t('projects.techStackDescription')}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('projects.modernTech.title')}</h3>
                <p className="text-sm text-gray-600">{t('projects.modernTech.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('projects.performance.title')}</h3>
                <p className="text-sm text-gray-600">{t('projects.performance.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{t('projects.aiIntegration.title')}</h3>
                <p className="text-sm text-gray-600">{t('projects.aiIntegration.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}