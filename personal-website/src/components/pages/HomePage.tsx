'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import DateDisplay from '@/components/ui/DateDisplay';
import { Article } from '@/types';

interface HomePageProps {
  stats: {
    totalFeeds: number;
    totalArticles: number;
    analyzedArticles: number;
    featuredArticles: number;
    todayArticles: number;
    totalReports: number;
    activeFeeds: number;
    lastUpdated: string;
  };
  featuredArticles: Article[];
  recentArticles: Article[];
}

export default function HomePage({ stats, featuredArticles, recentArticles }: HomePageProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('home.heroTitle')}
            <span className="text-blue-600">{t('home.heroTitleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('home.heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/daily-report"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('home.viewTodayReport')}
            </Link>
            <Link
              href="/projects"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              {t('blog.viewProjects')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats.totalFeeds}</div>
              <div className="text-gray-600">{t('home.rssFeeds')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.totalArticles}</div>
              <div className="text-gray-600">{t('home.totalArticles')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{stats.analyzedArticles}</div>
              <div className="text-gray-600">{t('home.aiAnalysis')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">{stats.featuredArticles}</div>
              <div className="text-gray-600">{t('home.featuredArticles')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('home.featuredSection')}</h3>
            <p className="text-gray-600">{t('home.featuredDescription')}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                    {article.category || 'Tech'}
                  </span>
                  {article.score && (
                    <span className="text-sm text-gray-500">{article.score}分</span>
                  )}
                  {article.isTranslated && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {t('home.translatedArticles')}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                    {article.title}
                  </a>
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.summary || article.description}
                </p>
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span>{t('home.source')}：{article.feedTitle}</span>
                  <DateDisplay date={article.publishedAt} />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/articles?featured=true"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('home.featuredSection')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('home.latestSection')}</h3>
            <p className="text-gray-600">{t('home.latestDescription')}</p>
          </div>
          <div className="space-y-6">
            {recentArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                      {article.category || 'Tech'}
                    </span>
                    <span className="text-sm text-gray-500">
                      {article.isTranslated ? '中译' : (article.language === 'zh' ? '中文' : 'EN')}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      {article.title}
                    </a>
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {article.summary || article.description?.slice(0, 200) + '...'}
                  </p>
                  <div className="text-sm text-gray-500">
                    {t('home.source')}：{article.feedTitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {t('home.browseArticles')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('site.title')}</h4>
              <p className="text-gray-400">{t('footer.description')}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.features')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>{t('footer.feature1')}</li>
                <li>{t('footer.feature2')}</li>
                <li>{t('footer.feature3')}</li>
                <li>{t('footer.feature4')}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('footer.links')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/daily-report" className="hover:text-white">{t('nav.dailyReport')}</Link></li>
                <li><Link href="/articles" className="hover:text-white">{t('nav.articles')}</Link></li>
                <li><Link href="/about" className="hover:text-white">{t('nav.about')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}